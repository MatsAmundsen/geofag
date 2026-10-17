/**
 * Felles byggeklosser for figurene i «Lokale og regionale værsystemer».
 *
 * - `useLokaleTidslinje`: prosess-kit-tidslinjen (felles avspilling, én figur om gangen, pause stopper alt).
 * - `LokaleRamme`: IsbreFigur med stegknapper, tidslinje, avspillingsknapp og statusfelt med fast høyde.
 * - Statiske lag (terreng, stjerner, skyformer) er memo-komponenter med faste stier, så de ikke tegnes
 *   på nytt for hvert bilde. Det som beveger seg (strømlinjer, regn, bølger), endrer bare
 *   stroke-dashoffset eller transform. Ingen {__html}-objekter.
 * - Terrengprofiler lages med støyen i terreng-kit (`lagStoy`), regnet ut én gang (lat).
 */
import { memo, type CSSProperties, type ReactNode, type RefObject } from "react";
import { IsbreFigur, StegVelger, type Key, type Lab, type Markers } from "./isbre-figur";
import { clamp, lerp, mixHex, smoothPath, useInView } from "./isbre-kit";
import { TidslinjeKontroller } from "./prosess-figur";
import { useTidslinje, type Tidslinje } from "./prosess-kit";
import { PlayPauseToggle } from "./svg-kit";
import { lagStoy } from "./terreng-kit";
import { Flytstrok } from "./terreng-figur";

export { StegVelger };
export type { Key, Lab, Markers, Tidslinje };

/** Felles viewBox for alle figurene i kapitlet. */
export const VB = { w: 960, h: 540 };

export const F = {
  himmelDagTopp: "#3d7fb0",
  himmelDagBunn: "#a9d0e6",
  himmelKveldTopp: "#2f4a72",
  himmelKveldBunn: "#d99a70",
  himmelNattTopp: "#071020",
  himmelNattBunn: "#1a2c44",
  himmelMorgenTopp: "#5f87ad",
  himmelMorgenBunn: "#e8cfa6",
  havTopp: "#24607f",
  havBunn: "#0e3145",
  land: "#5f6e45",
  landMork: "#384329",
  fjell: "#6f6a5f",
  sno: "#eef3f6",
  varm: "#f0a35e",
  varmSterk: "#ef7d4f",
  kald: "#8ec5e8",
  kaldSterk: "#5aa0e6",
  sjobris: "#6fd0c4",
  retur: "#c6d2da",
  regn: "#8ec5f0",
  sky: "#f3f6f8",
  skyMork: "#9aa7b2",
  tekst: "#e8eef2",
  halo: "#0f171c",
  kaldfront: "#4f8fe0",
  varmfront: "#e0574f",
  okkludert: "#b07ad8",
};

/** Himmelfarger gjennom døgnet: 0 morgen, 1 dag, 2 kveld, 3 natt (interpoleres). */
const HIMMEL: [string, string][] = [
  [F.himmelMorgenTopp, F.himmelMorgenBunn],
  [F.himmelDagTopp, F.himmelDagBunn],
  [F.himmelKveldTopp, F.himmelKveldBunn],
  [F.himmelNattTopp, F.himmelNattBunn],
];
export function himmelFarger(t: number): [string, string] {
  const k = clamp(t, 0, 3);
  const i = Math.min(2, Math.floor(k));
  const f = k - i;
  return [mixHex(HIMMEL[i][0], HIMMEL[i + 1][0], f), mixHex(HIMMEL[i][1], HIMMEL[i + 1][1], f)];
}

/* ---------- ramme ---------- */

export function useLokaleTidslinje(antall: number, faseMs = 3400, holdMs = 1600) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall, synlig: visible, faseMs, holdMs, element: ref });
  return { ref, tl };
}

/** Statustekst med kilde i parentes (dempet). */
export function medKilde(tekst: string, kilde: string): ReactNode {
  return (
    <>
      {tekst} <span className="text-muted-foreground">({kilde})</span>
    </>
  );
}

/**
 * Figurramme. Statusfeltet har fast minstehøyde (målt mot lengste status), så innholdet under
 * ikke hopper mellom stegene.
 */
export function LokaleRamme({
  tekst,
  heading,
  caption,
  tl,
  faser,
  status,
  svgRef,
  labels,
  keys,
  notes,
  ekstra,
  below,
  data,
  etikettRader,
  children,
}: {
  tekst: { heading: string; title: string; caption: string };
  heading?: string;
  caption?: ReactNode;
  tl: Tidslinje;
  faser: string[];
  status: ReactNode;
  svgRef: RefObject<SVGSVGElement | null>;
  labels: Lab[];
  keys?: Key[];
  notes?: string[];
  ekstra?: ReactNode;
  below?: ReactNode;
  /** data-figur-navnet på tegnegruppen (til tester og skjermbilder). */
  data: string;
  /** Flest etiketter i noe steg. Holder nummerlista på smal skjerm like høy i alle steg. */
  etikettRader: number;
  children: (ctx: { m: Markers; narrow: boolean }) => ReactNode;
}) {
  const h = heading ?? tekst.heading;
  return (
    <div
      style={{ "--lok-ol": `${etikettRader * 28 - 6}px` } as CSSProperties}
      className="[&_ol[aria-label^=Forklaring]]:min-h-[var(--lok-ol)] [&_ol[aria-label^=Forklaring]]:content-start [&_p[aria-live]]:min-h-[7.5rem] min-[420px]:[&_p[aria-live]]:min-h-[6.25rem] sm:[&_p[aria-live]]:min-h-[3.75rem] lg:[&_p[aria-live]]:min-h-[2.5rem]"
    >
      <IsbreFigur
        svgRef={svgRef}
        title={tekst.title}
        heading={h}
        caption={caption ?? tekst.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={h} />}
        toolbar={
          <div className="flex w-full flex-col gap-2">
            <TidslinjeKontroller tl={tl} faser={faser} />
            {ekstra}
          </div>
        }
        status={status}
        labels={labels}
        keys={keys}
        notes={notes ?? ["Skjematisk, høyden er overdrevet"]}
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        below={below}
      >
        {({ m, narrow }) => (
          <g data-figur={data} data-step={tl.fase} data-p={tl.p.toFixed(2)}>
            {children({ m, narrow })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* ---------- himmel, hav, sol og måne ---------- */

export function Himmel({ id, t, w = VB.w, h = VB.h }: { id: string; t: number; w?: number; h?: number }) {
  const [a, b] = himmelFarger(t);
  return (
    <g data-nocheck="">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill={`url(#${id})`} />
    </g>
  );
}

const STJERNER = Array.from({ length: 40 }, (_, i) => [((i * 197 + 31) % 950) + 5, ((i * 83 + 17) % 230) + 8, i % 3 ? 1 : 1.6]);
export const Stjerner = memo(function Stjerner({ opacity }: { opacity: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity} data-nocheck="" aria-hidden="true">
      {STJERNER.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#e4ecf2" />
      ))}
    </g>
  );
});

export function Sol({ x, y, r = 24, opacity = 1 }: { x: number; y: number; r?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity} data-nocheck="" aria-hidden="true">
      <circle cx={x} cy={y} r={r * 1.9} fill="#ffe08a" opacity="0.22" />
      <circle cx={x} cy={y} r={r} fill="#ffd25e" />
    </g>
  );
}

export function Maane({ x, y, r = 16, opacity = 1, bak = F.himmelNattTopp }: { x: number; y: number; r?: number; opacity?: number; bak?: string }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity} data-nocheck="" aria-hidden="true">
      <circle cx={x} cy={y} r={r} fill="#e3ecf2" />
      <circle cx={x + r * 0.45} cy={y - r * 0.2} r={r * 0.85} fill={bak} />
    </g>
  );
}

/** Hav med bølgestriper som glir sakte (bare stroke-dashoffset endres). */
export function Hav({ x0, x1, y, bunn = VB.h, sek, id }: { x0: number; x1: number; y: number; bunn?: number; sek: number; id: string }) {
  const baner: [number, number][][] = [];
  for (let k = 0; k < 4; k++) {
    const yy = y + 12 + k * 18;
    baner.push([
      [x0 + 4, yy],
      [x1 - 4, yy],
    ]);
  }
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={F.havTopp} />
          <stop offset="1" stopColor={F.havBunn} />
        </linearGradient>
      </defs>
      <rect x={x0} y={y} width={x1 - x0} height={bunn - y} fill={`url(#${id})`} data-nocheck="" />
      <Flytstrok baner={baner} sek={sek} fart={8} farge="#bfe3f5" bredde={1.4} opasitet={0.25} />
    </g>
  );
}

/* ---------- skyer og nedbør ---------- */

const SKY_STI = smoothPath(
  [
    [-60, 18],
    [-62, 2],
    [-44, -10],
    [-30, -26],
    [-6, -34],
    [16, -26],
    [30, -14],
    [52, -12],
    [64, 4],
    [60, 18],
  ],
  true,
);
const BYGE_STI = smoothPath(
  [
    [-56, 24],
    [-58, 6],
    [-40, -10],
    [-34, -40],
    [-14, -64],
    [10, -66],
    [28, -48],
    [32, -18],
    [50, -10],
    [60, 8],
    [56, 24],
  ],
  true,
);

/** Sky med flat underside. `byge` gir en høy bygesky. Skalering og plass via transform. */
export const Sky = memo(function Sky({
  x,
  y,
  s = 1,
  opacity = 1,
  mork = false,
  byge = false,
}: {
  x: number;
  y: number;
  s?: number;
  opacity?: number;
  mork?: boolean;
  byge?: boolean;
}) {
  if (opacity <= 0.01) return null;
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`} opacity={opacity < 0.99 ? opacity : undefined} data-nocheck="" aria-hidden="true">
      <path d={byge ? BYGE_STI : SKY_STI} fill={mork ? F.skyMork : F.sky} />
      <path d={byge ? "M-52 22 L52 22 L46 28 L-46 28 Z" : "M-56 16 L56 16 L50 21 L-50 21 Z"} fill={mork ? "#7c8893" : "#cfd8df"} />
    </g>
  );
});

/** Regn: skrå streker som faller (dashoffset). */
export function Regn({ x, y, w, h, sek, opacity = 1, n = 9 }: { x: number; y: number; w: number; h: number; sek: number; opacity?: number; n?: number }) {
  if (opacity <= 0.01) return null;
  const baner: [number, number][][] = [];
  for (let i = 0; i < n; i++) {
    const xx = x + (w / n) * (i + 0.5);
    baner.push([
      [xx, y],
      [xx - 10, y + h],
    ]);
  }
  return <Flytstrok baner={baner} sek={-sek * 4} fart={14} farge={F.regn} bredde={2} opasitet={opacity * 0.9} />;
}

/* ---------- piler og strømmer ---------- */

/** Strømlinje: glidende strøk langs banen og en fast pil på slutten. */
export function Strom({
  punkter,
  sek,
  farge,
  marker,
  bredde = 4,
  opacity = 1,
  fart = 24,
}: {
  punkter: [number, number][];
  sek: number;
  farge: string;
  marker: string;
  bredde?: number;
  opacity?: number;
  fart?: number;
}) {
  if (opacity <= 0.01 || punkter.length < 2) return null;
  const d = smoothPath(punkter);
  return (
    <g opacity={opacity < 0.99 ? opacity : undefined}>
      <path d={d} fill="none" stroke="#0b1418" strokeWidth={bredde + 3} strokeOpacity="0.45" strokeLinecap="round" data-nocheck="" />
      <path d={d} fill="none" stroke={farge} strokeWidth={bredde} strokeOpacity="0.75" strokeLinecap="round" markerEnd={`url(#${marker})`} />
      <Flytstrok baner={[punkter]} sek={sek} fart={fart} farge={farge} bredde={bredde} />
    </g>
  );
}

/* ---------- termometer ---------- */

export function Termometer({ x, y, h = 90, verdi, farge }: { x: number; y: number; h?: number; verdi: number; farge: string }) {
  const v = clamp(verdi);
  return (
    <g aria-hidden="true">
      <rect x={x - 7} y={y} width="14" height={h} rx="7" fill="#0d151b" stroke="#c9d4dc" strokeWidth="1.5" />
      <rect x={x - 4} y={y + 4 + (h - 8) * (1 - v)} width="8" height={(h - 8) * v} rx="4" fill={farge} />
      <circle cx={x} cy={y + h + 9} r="12" fill={farge} stroke="#c9d4dc" strokeWidth="1.5" />
    </g>
  );
}

/* ---------- terreng ---------- */

/**
 * Terrengprofil (snitt) fra støy: `grunn(x)` gir grunnformen i viewBox-høyde (y nedover), støyen gir
 * små ujevnheter. Returnerer punkter fra x0 til x1.
 */
export function lagProfil({
  seed,
  x0,
  x1,
  n = 120,
  grunn,
  ruhet = 8,
  skala = 0.012,
}: {
  seed: number;
  x0: number;
  x1: number;
  n?: number;
  grunn: (x: number) => number;
  ruhet?: number | ((x: number) => number);
  skala?: number;
}): [number, number][] {
  const { fbm } = lagStoy(seed);
  const ut: [number, number][] = [];
  for (let k = 0; k <= n; k++) {
    const x = lerp(x0, x1, k / n);
    const r = typeof ruhet === "number" ? ruhet : ruhet(x);
    ut.push([x, grunn(x) + r * fbm(x * skala, 0.37, 4)]);
  }
  return ut;
}

/** Lukket sti under en profil, ned til `bunn`. */
export function fyltProfil(p: [number, number][], bunn = VB.h) {
  const topp = p.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return `${topp} L${p[p.length - 1][0].toFixed(1)} ${bunn} L${p[0][0].toFixed(1)} ${bunn} Z`;
}

/** Høyden til profilen ved x (lineær mellom punktene). */
export function hoydeVed(p: [number, number][], x: number) {
  if (x <= p[0][0]) return p[0][1];
  for (let i = 1; i < p.length; i++) {
    if (x <= p[i][0]) {
      const [ax, ay] = p[i - 1];
      const [bx, by] = p[i];
      return lerp(ay, by, (x - ax) / (bx - ax || 1));
    }
  }
  return p[p.length - 1][1];
}

/** Statisk terreng: fyll, lys kant og snø over en grense. Tegnes én gang (memo, faste stier). */
export const Terreng = memo(function Terreng({
  id,
  profil,
  snoUnder,
  fyll = [F.land, F.landMork],
}: {
  id: string;
  profil: [number, number][];
  /** y-verdi (viewBox): snø der profilen ligger høyere (mindre y). */
  snoUnder?: number;
  fyll?: [string, string];
}) {
  const d = fyltProfil(profil);
  const sno = snoUnder !== undefined ? snoBiter(profil, snoUnder) : [];
  return (
    <g data-nocheck="">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={fyll[0]} />
          <stop offset="1" stopColor={fyll[1]} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
      {sno.map((s, i) => (
        <path key={i} d={s} fill={F.sno} opacity="0.92" />
      ))}
      <path d={profil.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")} fill="none" stroke="#dfe7d6" strokeOpacity="0.35" strokeWidth="1.5" />
    </g>
  );
});

/** Snøflekker: tynn hette over toppene der profilen er over grensen. */
function snoBiter(p: [number, number][], grense: number) {
  const biter: string[] = [];
  let cur: [number, number][] = [];
  const flush = () => {
    if (cur.length > 1) {
      const over = cur.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`);
      const under = [...cur].reverse().map(([x, y]) => `${x.toFixed(1)} ${(y + Math.max(3, (grense - y) * 0.35)).toFixed(1)}`);
      biter.push(`M${over.join(" L")} L${under.join(" L")} Z`);
    }
    cur = [];
  };
  for (const pt of p) {
    if (pt[1] < grense) cur.push(pt);
    else flush();
  }
  flush();
  return biter;
}

/** Små hus (statisk). */
export const Hus = memo(function Hus({ punkter, farge = "#b3523f" }: { punkter: [number, number][]; farge?: string }) {
  return (
    <g data-nocheck="" aria-hidden="true">
      {punkter.map(([x, y], i) => (
        <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
          <rect x="-8" y="-12" width="16" height="12" fill={farge} />
          <path d="M-10 -12 L0 -21 L10 -12 Z" fill="#6d2a20" />
        </g>
      ))}
    </g>
  );
});

/** Trær langs en profil (statisk). */
export const Traer = memo(function Traer({ punkter }: { punkter: [number, number][] }) {
  return (
    <g data-nocheck="" aria-hidden="true">
      {punkter.map(([x, y], i) => (
        <path key={i} d={`M${(x - 6).toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y - 18).toFixed(1)} L${(x + 6).toFixed(1)} ${y.toFixed(1)} Z`} fill="#2e4129" />
      ))}
    </g>
  );
});
