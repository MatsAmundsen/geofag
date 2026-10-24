/**
 * Ekman (widget «Ekman», havstrommer.md l. 67): ekmanspiralen sett ovenfra, nordlig halvkule, nord opp.
 * Følger l. 62: vinden drar i det øverste laget, overflaten går 45° til høyre i Ekmans enkle teori, hvert lag
 * lenger ned går litt saktere og litt mer til høyre, og summen går 90° til høyre for vinden.
 * Ingen gradtall på lagene under overflaten, ingen dybdetall, og spiralen stopper før 180°.
 * Ny komponent for kapittelsiden. Eksamen beholder EkmanDiagram (ocean.tsx).
 */
import { useId } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { clamp, lerp, useBoxWidth, useInView } from "./isbre-kit";
import { NARROW_FIGURE_PX } from "./isbre-figur";
import { TidslinjeKontroller } from "./prosess-figur";
import { tidslinjeVerdi, useTidslinje } from "./prosess-kit";
import { PlayPauseToggle } from "./svg-kit";
import { EKMAN_TEKST } from "./hav-tekst";
import { EKMAN_BILDER, EKMAN_FASER, EKMAN_VINKLER, ekmanStatus } from "./hav-ekman-felles";

const C = { hav: "#14405a", ring: "#2e5a72", vind: "#e8eef2", lag: "#6fd0c4", netto: "#f2c94c", tekst: "#e8eef2", halo: "#0f171c" };

const STATUS = ekmanStatus("høyre");

function Pil({ x1, y1, x2, y2, farge, marker, b }: { x1: number; y1: number; x2: number; y2: number; farge: string; marker: string; b: number }) {
  if (Math.hypot(x2 - x1, y2 - y1) < 2) return null;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.halo} strokeOpacity="0.5" strokeWidth={b + 3} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={farge} strokeWidth={b} strokeLinecap="round" markerEnd={`url(#${marker})`} />
    </g>
  );
}

function T({ x, y, children, farge, anchor = "start", vekt = 600, opacity }: { x: number; y: number; children: string; farge: string; anchor?: "start" | "end" | "middle"; vekt?: number; opacity: number }) {
  if (opacity <= 0.01) return null;
  return (
    <text x={x} y={y} fill={farge} fontSize="18" fontWeight={vekt} textAnchor={anchor} paintOrder="stroke" stroke={C.halo} strokeWidth="4" strokeLinejoin="round" opacity={opacity < 0.99 ? opacity : undefined}>
      {children}
    </text>
  );
}

/** Nummerskilt for smal skjerm: ca. 25 px i diameter og sifre på ca. 12,5 px ved 320 px vindu. */
function Skilt({ x, y, n, opacity }: { x: number; y: number; n: number; opacity: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity < 0.99 ? opacity : undefined} aria-hidden="true" data-badge={n}>
      <circle cx={x} cy={y} r="17" fill="#1e3a4a" stroke={C.tekst} strokeWidth="1.5" />
      <text x={x} y={y + 6} fill={C.tekst} fontSize="17" fontWeight="700" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

export function EkmanSpiralFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const [boksRef, bredde] = useBoxWidth<HTMLDivElement>();
  const smal = bredde > 0 ? bredde < NARROW_FIGURE_PX : true;
  const [svgRef, synlig] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall: EKMAN_FASER.length, synlig, element: svgRef });
  const s = tidslinjeVerdi(EKMAN_BILDER, tl.p);

  const W = smal ? 360 : 960;
  const H = smal ? 360 : 540;
  const ox = smal ? 160 : 420;
  const oy = smal ? 200 : 330;
  const L0 = smal ? 100 : 190;
  const tips = EKMAN_VINKLER.map((a, k) => {
    const r = (a * Math.PI) / 180;
    const l = L0 * 0.8 ** k;
    return [ox + l * Math.sin(r), oy - l * Math.cos(r)] as [number, number];
  });
  const lagSynlig = (k: number) => (k === 0 ? s.flate : clamp(s.lag * (EKMAN_VINKLER.length - 1) - (k - 1)));
  const spiral = tips
    .filter((_, k) => lagSynlig(k) > 0.5)
    .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" L");
  const vindTopp = oy - L0 * 1.15 * s.vind;
  const nettoX = ox + L0 * 0.95 * s.netto;
  const [fx, fy] = tips[0];

  const punkter = [
    { tekst: "Vinden", farge: C.vind, vis: s.vind > 0.3 },
    { tekst: "Overflaten: 45° (Ekmans enkle teori)", farge: C.lag, vis: s.flate > 0.3 },
    { tekst: "Hvert lag lenger ned: litt saktere og litt mer til høyre", farge: C.lag, vis: s.lag > 0.3 },
    { tekst: "Ekmantransporten: 90° til høyre for vinden", farge: C.netto, vis: s.netto > 0.3 },
  ];
  const piler: [string, string][] = [
    ["vind", C.vind],
    ["lag", C.lag],
    ["netto", C.netto],
  ];

  return (
    <FigureFrame
      heading={heading ?? EKMAN_TEKST.heading}
      caption={caption ?? EKMAN_TEKST.caption}
      action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name="Ekmanspiralen" />}
    >
      <div ref={boksRef} className="space-y-3">
        <TidslinjeKontroller tl={tl} faser={EKMAN_FASER} />
        <p aria-live="polite" className="min-h-[7.5rem] text-sm leading-relaxed text-foreground min-[420px]:min-h-[6.25rem] sm:min-h-[4.5rem] lg:min-h-[3rem]">
          {STATUS[tl.fase - 1]}
        </p>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto w-full max-w-5xl rounded-[10px]"
          role="img"
          aria-label={EKMAN_TEKST.title}
          data-figur="ekman"
          data-step={tl.fase}
        >
          <defs>
            {piler.map(([n, f]) => (
              <marker key={n} id={`${uid}-${n}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill={f} />
              </marker>
            ))}
          </defs>
          <rect width={W} height={H} fill={C.hav} rx="10" />
          <circle cx={ox} cy={oy} r={L0 * 1.05} fill="none" stroke={C.ring} strokeDasharray="4 6" />
          {s.vind > 0.02 ? <Pil x1={ox} y1={oy} x2={ox} y2={vindTopp} farge={C.vind} marker={`${uid}-vind`} b={smal ? 5 : 6} /> : null}
          {tips.map(([x, y], k) => {
            const v = lagSynlig(k);
            if (v <= 0.02) return null;
            return <Pil key={k} x1={ox} y1={oy} x2={lerp(ox, x, v)} y2={lerp(oy, y, v)} farge={C.lag} marker={`${uid}-lag`} b={Math.max(2, (smal ? 4.5 : 5.5) - k * 0.55)} />;
          })}
          {spiral.includes("L") ? <path d={`M${spiral}`} fill="none" stroke={C.lag} strokeWidth="2" strokeDasharray="5 5" opacity="0.8" /> : null}
          {s.netto > 0.02 ? <Pil x1={ox} y1={oy} x2={nettoX} y2={oy} farge={C.netto} marker={`${uid}-netto`} b={smal ? 6 : 7} /> : null}
          <text x={W - 16} y={30} fill="#a9b8c2" fontSize={smal ? 16 : 18} fontWeight="600" textAnchor="end" paintOrder="stroke" stroke={C.halo} strokeWidth="4">
            nord ↑
          </text>
          {smal ? (
            <>
              <Skilt x={ox - 30} y={oy - L0 * 1.08} n={1} opacity={s.vind} />
              <Skilt x={fx + 26} y={fy - 18} n={2} opacity={s.flate} />
              <Skilt x={ox + 25} y={oy + 72} n={3} opacity={s.lag} />
              <Skilt x={ox + L0 * 0.95 + 38} y={oy} n={4} opacity={s.netto} />
            </>
          ) : (
            <>
              <T x={ox + 14} y={oy - L0 * 1.15 + 16} farge={C.vind} opacity={s.vind}>vind</T>
              <T x={fx + 16} y={fy - 12} farge={C.lag} opacity={s.flate}>overflaten: 45° (Ekmans enkle teori)</T>
              <T x={ox - 30} y={oy + L0 * 0.62} anchor="end" farge={C.lag} opacity={s.lag}>hvert lag lenger ned:</T>
              <T x={ox - 30} y={oy + L0 * 0.62 + 25} anchor="end" farge={C.lag} vekt={400} opacity={s.lag}>litt saktere og litt mer til høyre</T>
              <T x={ox + L0 * 0.95 + 20} y={oy + 6} farge={C.netto} opacity={s.netto}>ekmantransporten:</T>
              <T x={ox + L0 * 0.95 + 20} y={oy + 31} farge={C.netto} vekt={400} opacity={s.netto}>90° til høyre for vinden</T>
            </>
          )}
        </svg>
        {smal ? (
          <ol aria-label="Forklaring til figuren" className="space-y-1.5 text-sm">
            {punkter.map((p, i) => (
              <li key={i} className="flex items-start gap-2" style={{ visibility: p.vis ? undefined : "hidden" }}>
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-foreground/60 bg-[#1e3a4a] text-xs font-bold text-foreground">{i + 1}</span>
                <span style={{ color: p.farge }}>{p.tekst}</span>
              </li>
            ))}
          </ol>
        ) : null}
        <p className="text-xs text-muted-foreground">Sett ovenfra, nord opp. Nordlig halvkule. Skjematisk.</p>
      </div>
    </FigureFrame>
  );
}
