/**
 * Prosess-kit (komponenter): kontroller, zoomlinse, kornlag og målere. Logikken ligger i prosess-kit.ts.
 */
import { memo, useId, useMemo, type ReactNode } from "react";
import { StegVelger } from "./isbre-figur";
import { clamp } from "./isbre-kit";
import { kornSti, nivaa, type Korn, type Maaler, type Tidslinje } from "./prosess-kit";

/* ---------- kontroller ---------- */

export function TidslinjeKontroller({
  tl,
  faser,
  verdiTekst,
}: {
  tl: Tidslinje;
  /** Kort navn per fase (stegknapper og stegmerker). */
  faser: string[];
  /** Fyldigere verditekst for skjermleser, f.eks. «Steg 3 av 5: Kompaksjon». */
  verdiTekst?: string;
}) {
  const id = useId();
  const valueText = verdiTekst ?? `Steg ${tl.fase} av ${tl.antall}: ${faser[tl.fase - 1]}`;
  return (
    <div className="flex w-full flex-col gap-2">
      <StegVelger labels={faser} step={tl.fase} onStep={tl.velgFase} label="Velg steg" />
      <div className="flex w-full items-center gap-2 text-xs font-medium text-foreground">
        <label htmlFor={id} className="whitespace-nowrap">
          Tidslinje
        </label>
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            type="range"
            min={0}
            max={tl.antall}
            step="any"
            value={tl.p}
            aria-valuetext={valueText}
            onChange={(event) => tl.settP(Number(event.target.value))}
            onKeyDown={(event) => {
              // piltaster og Page Up/Down går til forrige/neste steg (sluttbildet), Home/End til første/siste
              const eps = 1e-6;
              let mal: number | null = null;
              if (event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "PageUp") mal = Math.floor(tl.p + eps) + 1;
              else if (event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "PageDown") mal = Math.ceil(tl.p - eps) - 1;
              else if (event.key === "Home") mal = 1;
              else if (event.key === "End") mal = tl.antall;
              if (mal === null) return;
              event.preventDefault();
              tl.velgFase(clamp(mal, 1, tl.antall));
            }}
            className="figur-skyver w-full cursor-pointer"
          />
          <div className="pointer-events-none relative h-2" aria-hidden="true">
            {Array.from({ length: tl.antall + 1 }, (_, k) => (
              <span
                key={k}
                className={`absolute top-0 h-2 w-px ${k <= tl.p ? "bg-primary" : "bg-muted-foreground/60"}`}
                style={{ left: `${(k / tl.antall) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- zoomlinse ---------- */

export function Zoomlinse({
  cx,
  cy,
  r,
  fra,
  bakgrunn,
  children,
}: {
  cx: number;
  cy: number;
  r: number;
  /** Utsnittet linsen forstørrer: [x, y, halv høyde]. Det tegnes ramme og to koblingslinjer. */
  fra?: [number, number, number];
  bakgrunn: string;
  children: ReactNode;
}) {
  const clip = `${useId().replace(/:/g, "")}-linse`;
  return (
    <g>
      {fra ? (
        <g data-nocheck="" opacity="0.8">
          <rect x={fra[0] - 6} y={fra[1] - fra[2]} width="12" height={fra[2] * 2} fill="none" stroke="#e8eef2" strokeWidth="1.5" rx="2" />
          <line x1={fra[0] + 6} y1={fra[1] - fra[2]} x2={cx} y2={cy - r} stroke="#e8eef2" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={fra[0] + 6} y1={fra[1] + fra[2]} x2={cx} y2={cy + r} stroke="#e8eef2" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      ) : null}
      <defs>
        <clipPath id={clip}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill={bakgrunn} />
        {children}
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8eef2" strokeWidth="3" />
    </g>
  );
}

/** Tegner kornene ved gitte posisjoner. Stiene regnes ut én gang; bare transform endres. */
export const KornLag = memo(KornLagInnhold, (a, b) =>
  // Med `noekkel` hoppes ny tegning over så lenge nøkkelen (og formen) er uendret,
  // selv om pos/fyll er nye funksjoner hver bilderute.
  a.noekkel !== undefined &&
  a.noekkel === b.noekkel &&
  a.korn === b.korn &&
  a.skala === b.skala &&
  a.strek === b.strek &&
  a.forstorr === b.forstorr,
);

function KornLagInnhold({
  korn,
  skala,
  pos,
  fyll,
  strek = "rgba(15,23,28,0.55)",
  forstorr = 1,
}: {
  korn: Korn[];
  skala: number;
  /** Posisjon i SVG-koordinater for korn i. */
  pos: (k: Korn, i: number) => [number, number, number?];
  fyll: (k: Korn) => string;
  strek?: string;
  /** Skalerer omrisset, f.eks. for kitt-kant rundt kornet. */
  forstorr?: number;
  /** Alt pos og fyll avhenger av, samlet i én verdi. Uendret nøkkel = ingen ny tegning. */
  noekkel?: string | number;
}) {
  const stier = useMemo(() => korn.map((k) => kornSti(k, skala)), [korn, skala]);
  return (
    <g data-nocheck="">
      {korn.map((k, i) => {
        const [x, y, opacity = 1] = pos(k, i);
        if (opacity <= 0.01) return null;
        return (
          <path
            key={i}
            d={stier[i]}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})${forstorr !== 1 ? ` scale(${forstorr.toFixed(3)})` : ""}`}
            fill={fyll(k)}
            stroke={strek}
            strokeWidth="1"
            opacity={opacity < 1 ? opacity : undefined}
          />
        );
      })}
    </g>
  );
}

/**
 * Relative målere i HTML (leselige på mobil). role="meter" med aria-valuetext i ord.
 * De oppdateres ikke som live-region; statusteksten bærer forklaringen.
 */
export function Maalere({ maalere, merknad }: { maalere: Maaler[]; merknad?: string }) {
  return (
    <div className="mt-3">
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4" aria-label="Målere">
        {maalere.map((m) => {
          const ord = m.tekst ?? nivaa(m.verdi, m.ender);
          return (
            <li key={m.navn} className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-1 text-[13px] leading-tight text-foreground">
                <span className="font-semibold">{m.navn}</span>
                <span className="text-muted-foreground">{ord}</span>
              </div>
              <div
                role="meter"
                aria-label={m.navn}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(m.verdi * 100)}
                aria-valuetext={`${m.navn}: ${ord}`}
                className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-muted"
              >
                <div className="h-full rounded-full" style={{ width: `${Math.round(clamp(m.verdi) * 100)}%`, background: m.farge }} />
              </div>
              <div className="mt-0.5 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                <span>{m.ender[0]}</span>
                <span>{m.ender[1]}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {merknad ? <p className="mt-1 text-xs text-muted-foreground">{merknad}</p> : null}
    </div>
  );
}
