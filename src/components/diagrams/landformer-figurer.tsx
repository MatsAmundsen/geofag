/**
 * Figurene i Geofag 1: Landformer (forvitring, Hjulstrøm, elva, meander, delta og landskapet).
 *
 * Bygger på samme ramme som isbrefigurene (IsbreFigur, StegVelger, Skyver og isbre-kit), så de
 * to kapitlene får samme stil: nummermerker og liste på mobil, Start/Pause og steg.
 *
 * Alle tall og påstander i figurene kommer fra kapitteltekstene (src/routes/geofag-1/landformer.tsx).
 * Hjulstrøm-kurvene er tegnet omtrentlig etter Hjulström (1935): kapitlet gir bare to fastpunkter
 * (ca. 20 cm/s for sand 0,2–0,5 mm og over 100 cm/s for leire), resten er en skjematisk kurveform.
 */
import { useMemo, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle, font } from "./svg-kit";
import { IsbreFigur, Polys, Skyver, StegVelger, type Key, type Lab } from "./isbre-figur";
import {
  P,
  clamp,
  heightfield,
  hexToRgb,
  lerp,
  obliqueProj,
  pts,
  smooth,
  smoothPath,
  pickStep,
  useInView,
  useStepClock,
  useTicker,
} from "./isbre-kit";

export type LandformFigurProps = {
  /** Overskrift over figuren. */
  heading?: string;
  /** Bildetekst under figuren. */
  caption?: ReactNode;
  /** Steg som vises først (1-basert). */
  initialStep?: number;
};

const frac = (v: number) => v - Math.floor(v);
/** Avrunder til én desimal, så server og nettleser skriver like tall i SVG-en. */
const n1 = (v: number) => Math.round(v * 10) / 10;
const p1 = ([x, y]: [number, number]): [number, number] => [n1(x), n1(y)];
/** Deterministisk «tilfeldig» tall i [0, 1) (heltallshash, så server og nettleser gir samme verdi). */
function hash(i: number, k = 0) {
  let h = (Math.imul(Math.round(i) | 0, 374761393) + Math.imul(Math.round(k) | 0, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return Math.round(((h >>> 0) / 4294967296) * 1000) / 1000;
}
/** Norsk tallformat med to gjeldende siffer: 0,001 · 0,32 · 20 · 150. */
function fmt(v: number) {
  const n = Number(v.toPrecision(2));
  return String(n).replace(".", ",");
}

function T({
  x,
  y,
  children,
  size = 15,
  color = C.fg,
  anchor = "start",
  weight = 600,
  rotate,
  avoid,
}: {
  x: number;
  y: number;
  children: ReactNode;
  /** Punkt [x, y, r] som teksten viker for: teksten tones ned når punktet ligger oppå den. */
  avoid?: [number, number, number];
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  rotate?: number;
}) {
  let opacity: number | undefined;
  if (avoid) {
    const w = String(children).length * size * 0.56;
    const x0 = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
    const [px, py, r] = avoid;
    const nx = clamp(px, x0, x0 + w);
    const ny = clamp(py, y - size, y + size * 0.3);
    if (Math.hypot(px - nx, py - ny) < r + 4) opacity = 0.2;
  }
  return (
    <text
      opacity={opacity}
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      fontFamily={font}
      stroke={P.halo}
      strokeWidth={size * 0.26}
      strokeLinejoin="round"
      paintOrder="stroke"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

/* =====================================================================
 * 1. Hjulstrøms diagram (interaktivt)
 * ===================================================================== */

/** Kritisk strømfart for erosjon (cm/s) mot kornstørrelse (mm). Skjematisk etter Hjulström (1935). */
const HJ_E: [number, number][] = [
  [0.001, 150],
  [0.002, 112],
  [0.005, 64],
  [0.01, 43],
  [0.02, 31],
  [0.05, 23.5],
  [0.1, 21],
  [0.2, 20],
  [0.3, 19.8],
  [0.5, 20.2],
  [1, 24],
  [2, 32],
  [5, 52],
  [10, 78],
  [20, 115],
  [50, 190],
  [100, 270],
];
/** Strømfart (cm/s) der kornene avsettes. Skjematisk; under ca. 0,006 mm holdes kornene svevende. */
const HJ_D: [number, number][] = [
  [0.006, 0.1],
  [0.01, 0.16],
  [0.02, 0.3],
  [0.05, 0.62],
  [0.1, 1],
  [0.2, 1.9],
  [0.5, 4.5],
  [1, 8.5],
  [2, 15],
  [5, 32],
  [10, 55],
  [20, 88],
  [50, 150],
  [100, 215],
];
function logInterp(tab: [number, number][], d: number) {
  const x = Math.log10(d);
  for (let i = 0; i < tab.length - 1; i++) {
    const a = Math.log10(tab[i][0]);
    const b = Math.log10(tab[i + 1][0]);
    if (x <= b || i === tab.length - 2) {
      const t = clamp((x - a) / (b - a));
      return 10 ** lerp(Math.log10(tab[i][1]), Math.log10(tab[i + 1][1]), t);
    }
  }
  return tab[tab.length - 1][1];
}
const hjErosion = (d: number) => logInterp(HJ_E, d);
const hjDeposition = (d: number) => (d < HJ_D[0][0] ? 0 : logInterp(HJ_D, d));
type HjZone = "erosjon" | "transport" | "avsetning";
function hjZone(d: number, v: number): HjZone {
  if (v >= hjErosion(d)) return "erosjon";
  if (v >= hjDeposition(d)) return "transport";
  return "avsetning";
}
function grainClass(d: number) {
  if (d < 0.002) return "Leire";
  if (d < 0.063) return "Silt";
  if (d < 2) return "Sand";
  return "Grus og stein";
}
const ZONE_COLOR: Record<HjZone, string> = {
  erosjon: C.warm,
  transport: "#e6cf8a",
  avsetning: C.teal,
};
const ZONE_WORD: Record<HjZone, string> = {
  erosjon: "eroderes",
  transport: "transporteres",
  avsetning: "avsettes",
};
const ZONE_EXPLAIN: Record<HjZone, string> = {
  erosjon: "Vannet river løs korn fra bunnen.",
  transport:
    "Korn som allerede er i bevegelse, holdes i bevegelse, men vannet river ikke løs nye korn fra bunnen.",
  avsetning: "Vannet går for sakte til å holde kornene i bevegelse, så de synker til bunnen.",
};
const HJ_PRESETS: { name: string; g: number }[] = [
  { name: "Leire", g: -3 },
  { name: "Silt", g: -1.7 },
  { name: "Sand", g: -0.5 },
  { name: "Grus", g: 1 },
];
const GRAIN_COLOR: Record<string, string> = {
  Leire: "#a9a08a",
  Silt: "#bcae8a",
  Sand: "#d8c07a",
  "Grus og stein": "#9b917e",
};

export function HjulstromInteraktiv({
  heading = "Hjulstrøms diagram: erodere, transportere eller avsette?",
  caption,
}: LandformFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const t = useTicker(running);
  const [g, setG] = useState(-0.5);
  const [s, setS] = useState(0.7);
  const d = 10 ** g;
  const v = 10 ** s;
  const zone = hjZone(d, v);
  const cls = grainClass(d);
  const preset = HJ_PRESETS.findIndex((p) => Math.abs(p.g - g) < 0.001) + 1;
  const status = (
    <>
      {cls} ({fmt(d)} mm) ved {fmt(v)} cm/s:{" "}
      <strong style={{ color: ZONE_COLOR[zone] }}>{ZONE_WORD[zone]}</strong>. {ZONE_EXPLAIN[zone]}
    </>
  );
  return (
    <IsbreFigur
      svgRef={ref}
      title="Hjulstrøms diagram med skyvere for kornstørrelse og strømfart. Punktet viser om kornet eroderes, transporteres eller avsettes."
      heading={heading}
      caption={
        caption ??
        "Velg kornstørrelse og strømfart. Over den heltrukne kurven river vannet løs korn (erosjon). Mellom kurvene holdes kornene i bevegelse (transport). Under den stiplede kurven synker de til bunnen (avsetning). Sand (0,2–0,5 mm) eroderes lettest, ved ca. 20 cm/s. Leire krever over 100 cm/s fordi kornene henger sammen (kohesjon)."
      }
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StegVelger
            labels={HJ_PRESETS.map((p) => p.name)}
            step={preset}
            onStep={(n) => setG(HJ_PRESETS[n - 1].g)}
            label="Velg kornstørrelse"
          />
          <Skyver
            label="Kornstørrelse"
            min={-3}
            max={2}
            step={0.05}
            value={g}
            onChange={setG}
            valueLabel={`${fmt(d)} mm`}
          />
          <Skyver
            label="Strømfart"
            min={-1}
            max={3}
            step={0.05}
            value={s}
            onChange={setS}
            valueLabel={`${fmt(v)} cm/s`}
          />
        </>
      }
      status={status}
      keys={[
        { text: "Grense for erosjon", color: C.warm, kind: "line" },
        { text: "Grense for avsetning", color: C.teal, kind: "dash" },
      ]}
      notes={[
        "Begge aksene er logaritmiske",
        "Kurvene er forenklet etter Hjulström (1935)",
        "Kornene i elvebunnen er ikke i målestokk",
      ]}
      viewBox="0 0 960 520"
      narrowViewBox="0 0 600 860"
    >
      {({ m, narrow }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="hjulstrom"
          data-step={preset}
          data-zone={zone}
        >
          <HjPlot narrow={narrow} d={d} v={v} zone={zone} />
          <HjBed narrow={narrow} d={d} v={v} zone={zone} t={running ? t : 1.6} m={m.fg} cls={cls} />
        </g>
      )}
    </IsbreFigur>
  );
}

const HJ_LAY = {
  wide: { x0: 104, x1: 604, y0: 36, y1: 416, fs: 15, inset: { x: 640, y: 36, w: 300, h: 380 } },
  narrow: { x0: 92, x1: 580, y0: 30, y1: 430, fs: 22, inset: { x: 16, y: 560, w: 568, h: 284 } },
};

function HjPlot({ narrow, d, v, zone }: { narrow: boolean; d: number; v: number; zone: HjZone }) {
  const L = narrow ? HJ_LAY.narrow : HJ_LAY.wide;
  const X = (dd: number) => n1(L.x0 + ((Math.log10(dd) + 3) / 5) * (L.x1 - L.x0));
  const Y = (vv: number) => n1(L.y1 - ((Math.log10(vv) + 1) / 4) * (L.y1 - L.y0));
  const ds = Array.from({ length: 81 }, (_, i) => 10 ** (-3 + (i / 80) * 5));
  const eroPts: [number, number][] = ds.map((dd) => [X(dd), Y(hjErosion(dd))]);
  const depDs = ds.filter((dd) => dd >= HJ_D[0][0]);
  const depPts: [number, number][] = [
    [X(HJ_D[0][0]), Y(HJ_D[0][1])],
    ...depDs.map((dd): [number, number] => [X(dd), Y(hjDeposition(dd))]),
  ];
  const sandPts = eroPts.filter((_, i) => ds[i] >= 0.2 && ds[i] <= 0.5);
  const fs = L.fs;
  const px = X(d);
  const py = Y(v);
  const pr = narrow ? 10 : 8;
  const cur: [number, number, number] = [px, py, pr];
  const minX = X(0.3);
  const minY = Y(hjErosion(0.3));
  return (
    <g>
      <rect
        x={L.x0}
        y={L.y0}
        width={L.x1 - L.x0}
        height={L.y1 - L.y0}
        fill="#121a22"
        stroke={C.dim}
        strokeWidth="1.5"
      />
      <g data-nocheck="">
        <path
          d={`M${L.x0} ${L.y0} L${L.x1} ${L.y0} L${pts([...eroPts].reverse())} Z`}
          fill="#46231d"
          opacity={zone === "erosjon" ? 0.95 : 0.65}
        />
        <path
          d={`M${pts(eroPts)} L${pts([...depPts].reverse())} L${L.x0 + ((Math.log10(HJ_D[0][0]) + 3) / 5) * (L.x1 - L.x0)} ${L.y1} L${L.x0} ${L.y1} Z`}
          fill="#3a3420"
          opacity={zone === "transport" ? 0.95 : 0.6}
        />
        <path
          d={`M${pts(depPts)} L${L.x1} ${L.y1} L${X(HJ_D[0][0])} ${L.y1} Z`}
          fill="#163a33"
          opacity={zone === "avsetning" ? 0.95 : 0.65}
        />
        {[-2, -1, 0, 1].map((k) => (
          <line
            key={`x${k}`}
            x1={X(10 ** k)}
            x2={X(10 ** k)}
            y1={L.y0}
            y2={L.y1}
            stroke="#ffffff"
            strokeOpacity="0.08"
          />
        ))}
        {[0, 1, 2].map((k) => (
          <line
            key={`y${k}`}
            x1={L.x0}
            x2={L.x1}
            y1={Y(10 ** k)}
            y2={Y(10 ** k)}
            stroke="#ffffff"
            strokeOpacity="0.08"
          />
        ))}
        {/* hjelpelinjer fra punktet til aksene */}
        <line
          x1={px}
          x2={px}
          y1={py}
          y2={L.y1}
          stroke={C.fg}
          strokeOpacity="0.45"
          strokeDasharray="4 4"
        />
        <line
          x1={L.x0}
          x2={px}
          y1={py}
          y2={py}
          stroke={C.fg}
          strokeOpacity="0.45"
          strokeDasharray="4 4"
        />
      </g>
      <path d={smoothPath(eroPts)} fill="none" stroke={C.warm} strokeWidth="3.2" />
      <path
        d={smoothPath(sandPts)}
        fill="none"
        stroke={C.sand}
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d={smoothPath(depPts)}
        fill="none"
        stroke={C.teal}
        strokeWidth="2.8"
        strokeDasharray="7 5"
      />
      {/* sonenavn */}
      <T
        avoid={cur}
        x={X(1)}
        y={Y(narrow ? 330 : 420)}
        size={fs + 8}
        weight={800}
        color={C.warm}
        anchor="middle"
      >
        Erosjon
      </T>
      {narrow ? null : (
        <T avoid={cur} x={X(1)} y={Y(420) + 27} size={fs - 1} color={C.fg} anchor="middle">
          Vannet river løs korn
        </T>
      )}
      <T
        avoid={cur}
        x={X(narrow ? 0.012 : 0.008)}
        y={Y(narrow ? 1.6 : 1.2)}
        size={fs + 6}
        weight={800}
        color="#e6cf8a"
        anchor="middle"
      >
        Transport
      </T>
      {narrow ? null : (
        <T avoid={cur} x={X(0.008)} y={Y(1.2) + 26} size={fs - 1} color={C.fg} anchor="middle">
          Holdes i bevegelse
        </T>
      )}
      <T
        avoid={cur}
        x={X(narrow ? 12 : 10)}
        y={Y(narrow ? 0.9 : 1.5)}
        size={fs + 6}
        weight={800}
        color={C.teal}
        anchor="middle"
      >
        Avsetning
      </T>
      {narrow ? null : (
        <T avoid={cur} x={X(10)} y={Y(1.5) + 26} size={fs - 1} color={C.fg} anchor="middle">
          Kornene synker til bunnen
        </T>
      )}
      {/* fastpunktene fra teksten */}
      <circle cx={minX} cy={minY} r="5" fill={C.sand} stroke={P.halo} strokeWidth="2" />
      <T avoid={cur} x={minX - 14} y={minY + fs + 12} size={fs} color={C.sand} anchor="end">
        Sand: ca. 20 cm/s
      </T>
      <circle
        cx={X(0.001)}
        cy={Y(hjErosion(0.001))}
        r="5"
        fill={C.warm}
        stroke={P.halo}
        strokeWidth="2"
      />
      <T avoid={cur} x={L.x0 + 10} y={L.y0 + fs + 8} size={fs} color={C.warm}>
        Leire: over 100 cm/s
      </T>
      <T avoid={cur} x={L.x0 + 10} y={L.y0 + 2 * fs + 16} size={fs - 1} color={C.fg}>
        {narrow ? "(kohesjon)" : "(kohesjon: kornene henger sammen)"}
      </T>
      {/* valgt punkt */}
      <circle cx={px} cy={py} r={pr} fill={ZONE_COLOR[zone]} stroke={P.halo} strokeWidth="3" />
      {/* akser */}
      {[-3, -2, -1, 0, 1, 2].map((k) => (
        <T key={k} x={X(10 ** k)} y={L.y1 + fs + 16} size={fs - 1} color={C.muted} anchor="middle">
          {fmt(10 ** k)}
        </T>
      ))}
      {[-1, 0, 1, 2, 3].map((k) => (
        <T
          key={k}
          x={L.x0 - 14}
          y={Y(10 ** k) + fs * 0.35}
          size={fs - 1}
          color={C.muted}
          anchor="end"
        >
          {fmt(10 ** k)}
        </T>
      ))}
      {[0.002, 0.063, 2].map((b) => (
        <line
          key={b}
          x1={X(b)}
          x2={X(b)}
          y1={L.y1 + fs + 22}
          y2={L.y1 + 2 * fs + 34}
          stroke={C.muted}
          strokeWidth="1.2"
        />
      ))}
      {(
        [
          ["Leire", X(0.002) - 5, "end"],
          ["Silt", (X(0.002) + X(0.063)) / 2, "middle"],
          ["Sand", (X(0.063) + X(2)) / 2, "middle"],
          [narrow ? "Grus, stein" : "Grus og stein", (X(2) + L.x1) / 2, "middle"],
        ] as const
      ).map(([n, x, a]) => (
        <T key={n} x={x} y={L.y1 + 2 * fs + 30} size={fs} color={C.fg} anchor={a}>
          {n}
        </T>
      ))}
      <T x={(L.x0 + L.x1) / 2} y={L.y1 + 3 * fs + 44} size={fs} color={C.muted} anchor="middle">
        Kornstørrelse (mm)
      </T>
      <T
        x={narrow ? 22 : 26}
        y={(L.y0 + L.y1) / 2}
        size={fs}
        color={C.muted}
        anchor="middle"
        rotate={-90}
      >
        Strømfart (cm/s)
      </T>
    </g>
  );
}

function HjBed({
  narrow,
  d,
  v,
  zone,
  t,
  m,
  cls,
}: {
  narrow: boolean;
  d: number;
  v: number;
  zone: HjZone;
  t: number;
  m: string;
  cls: string;
}) {
  const { x, y, w, h } = (narrow ? HJ_LAY.narrow : HJ_LAY.wide).inset;
  const fs = narrow ? 22 : 15;
  const top = y + (narrow ? 64 : 58);
  const bed = y + h - (narrow ? 46 : 56);
  const r = n1(3 + 3.2 * (Math.log10(d) + 3) * (narrow ? 1.25 : 1));
  const col = GRAIN_COLOR[cls];
  const speed = 18 + 26 * (Math.log10(v) + 1);
  const n = narrow ? 8 : 6;
  const span = w - 2 * r - 16;
  const grains = Array.from({ length: n }, (_, i) => {
    const u = frac(t * speed * 0.004 + i / n);
    let gx = x + 8 + r + u * span;
    let gy = bed - r;
    if (zone === "erosjon") {
      // løftes fra bunnen og føres med strømmen
      const lift = Math.sin(Math.min(1, u * 1.6) * Math.PI * 0.5);
      gy = bed - r - lift * (bed - top) * (0.35 + 0.4 * hash(i, 1)) * (d < 0.06 ? 1.3 : 1);
    } else if (zone === "transport") {
      const hgt = d < 0.06 ? 0.25 + 0.6 * hash(i, 2) : d < 2 ? 0.08 + 0.25 * hash(i, 2) : 0;
      gy = bed - r - hgt * (bed - top) - (d >= 2 ? 0 : 3 * Math.sin(t * 3 + i));
    } else {
      // synker og blir liggende
      const k = clamp(u / 0.7);
      gx = x + 8 + r + (hash(i, 3) * 0.75 + 0.1 * k) * span;
      gy = lerp(top + 10 + r, bed - r, k);
    }
    const rot = zone === "avsetning" ? 0 : t * speed * 0.6 + i * 40;
    return { gx: n1(gx), gy: n1(gy), rot: n1(rot) };
  });
  const restN = Math.max(3, Math.min(14, Math.floor(w / (2.4 * r + 4))));
  const streaks = Array.from({ length: 7 }, (_, i) => {
    const u = frac(t * speed * 0.006 + hash(i, 4));
    const sx = x + 10 + u * (w - 80);
    const sy = top + 12 + ((bed - top - 30) * (i + 0.5)) / 7;
    return { sx: n1(sx), sy: n1(sy), len: n1(12 + speed * 0.5) };
  });
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#132430" stroke={C.dim} />
      <T x={x + 14} y={y + fs + 10} size={fs} color={C.muted}>
        Elvebunnen:
      </T>
      <T x={x + 14 + fs * 5.6} y={y + fs + 10} size={fs + 4} weight={800} color={ZONE_COLOR[zone]}>
        {ZONE_WORD[zone]}
      </T>
      <rect x={x + 6} y={top} width={w - 12} height={bed - top} fill={P.water} opacity="0.55" />
      <g data-nocheck="">
        {streaks.map((st, i) => (
          <line
            key={i}
            x1={st.sx}
            x2={st.sx + st.len}
            y1={st.sy}
            y2={st.sy}
            stroke="#bfe6f5"
            strokeOpacity="0.45"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        ))}
      </g>
      <path
        d={`M${x + w - 70} ${top + 18} l46 0`}
        stroke={C.fg}
        strokeWidth="3"
        markerEnd={`url(#${m})`}
      />
      <rect x={x + 6} y={bed} width={w - 12} height={y + h - bed - 6} fill="#5b513f" />
      <g data-nocheck="">
        {Array.from({ length: restN }, (_, i) => {
          const cx = x + 10 + r + ((w - 20 - 2 * r) * (i + 0.5)) / restN;
          return (
            <circle
              key={i}
              cx={cx}
              cy={bed + r * 0.35}
              r={r}
              fill={col}
              stroke="#3b3326"
              strokeWidth="1"
              opacity={zone === "erosjon" ? 0.55 : 0.9}
            />
          );
        })}
        {grains.map((gr, i) => (
          <g key={i} transform={`rotate(${gr.rot % 360} ${gr.gx} ${gr.gy})`}>
            <circle cx={gr.gx} cy={gr.gy} r={r} fill={col} stroke="#2a241a" strokeWidth="1.2" />
            {r > 5 ? (
              <circle
                cx={gr.gx - r * 0.35}
                cy={gr.gy - r * 0.35}
                r={r * 0.25}
                fill="#fff"
                opacity="0.35"
              />
            ) : null}
          </g>
        ))}
      </g>
    </g>
  );
}

/* =====================================================================
 * 2. Forvitring: trykkavlastning, rotsprengning, karbonsyre og hydrolyse
 * ===================================================================== */

const FV_STEPS = ["1 Trykkavlastning", "2 Rotsprengning", "3 Kalk løses", "4 Hydrolyse"];
const FV_STATUS: ReactNode[] = [
  "Mekanisk: Erosjon fjerner berglagene over granitten. Trykket avtar, granitten utvider seg mot overflaten og sprekker opp i parallelle, bueformede flak (eksfoliering).",
  "Mekanisk (biologisk): Røtter kiler seg inn i sprekker i berget. Når de vokser, presser de sprekkene fra hverandre.",
  <>
    Kjemisk: Regnvann tar opp CO₂ og blir en svak karbonsyre som løser kalkstein: CaCO₃ + H₂O + CO₂
    ⇌ Ca²⁺ + 2 HCO₃⁻. Det gir doliner, underjordiske elveløp og dryppsteinshuler.
  </>,
  "Kjemisk: Feltspat i granitten brytes ned til leirmineralet kaolinitt, og kalium og kiselsyre vaskes ut. Berget smuldrer, men kvartskornene blir igjen og kan bli sand.",
];
const FV_KIND = [
  "Mekanisk forvitring",
  "Mekanisk forvitring",
  "Kjemisk forvitring",
  "Kjemisk forvitring",
];

const fvDome = (x: number) => 168 + 170 * ((x - 480) / 320) ** 2;
const FV_SIDE = 338;
const fvFinal = (x: number) => (x > 160 && x < 800 ? Math.min(fvDome(x), FV_SIDE) : FV_SIDE);

export function Forvitringsformer({
  heading = "Forvitring: fire måter berget brytes ned på stedet",
  caption,
  initialStep,
}: LandformFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const clock = useStepClock(4, running, 3600, 1600, initialStep);
  const t = useTicker(running);
  const { step, phase } = clock;
  const labels: Lab[] = [];
  if (step === 1) {
    labels.push(
      {
        text: "Berglag over er erodert bort",
        x: 40,
        y: 72,
        at: [250, 96],
        color: C.muted,
        badge: [180, 104],
      },
      {
        text: "Granitt (dypbergart)",
        x: 560,
        y: 450,
        at: [560, 400],
        color: C.fg,
        anchor: "middle",
        badge: [560, 420],
      },
      {
        text: "Trykket avtar: granitten utvider seg",
        x: 940,
        y: 120,
        at: [612, 170],
        color: C.warm,
        anchor: "end",
        badge: [640, 150],
      },
      {
        text: "Bueformede flak (eksfoliering)",
        x: 40,
        y: 200,
        at: [338, 226],
        color: C.fg,
        badge: [300, 262],
      },
    );
  } else if (step === 2) {
    labels.push(
      {
        text: "Røttene kiler seg inn i sprekken",
        x: 80,
        y: 300,
        at: [462, 300],
        color: C.fg,
        badge: [430, 300],
      },
      {
        text: "Roten vokser og presser sprekken fra hverandre",
        x: 940,
        y: 400,
        at: [520, 330],
        color: C.warm,
        anchor: "end",
        badge: [560, 348],
      },
      {
        text: "Sprekk i berget",
        x: 940,
        y: 300,
        at: [506, 300],
        color: C.muted,
        anchor: "end",
        badge: [540, 290],
      },
    );
  } else if (step === 3) {
    labels.push(
      {
        text: "Regnvann + CO₂ blir svak karbonsyre",
        x: 420,
        y: 92,
        at: [372, 100],
        color: C.rain,
        badge: [400, 100],
      },
      { text: "Dolin (synkehull)", x: 40, y: 230, at: [262, 190], color: C.fg, badge: [262, 222] },
      {
        text: "Stalaktitt (i taket)",
        x: 940,
        y: 262,
        at: [690, 312],
        color: C.fg,
        anchor: "end",
        badge: [700, 290],
      },
      {
        text: "Stalagmitt (på gulvet)",
        x: 940,
        y: 470,
        at: [700, 400],
        color: C.fg,
        anchor: "end",
        badge: [745, 392],
      },
      {
        text: "Underjordisk elveløp",
        x: 40,
        y: 470,
        at: [520, 408],
        color: C.rain,
        badge: [480, 440],
      },
      { text: "Kalkstein", x: 40, y: 380, color: C.muted, badge: [70, 360] },
    );
  } else {
    labels.push(
      {
        text: "Feltspat blir til kaolinitt (leirmineral)",
        x: 40,
        y: 72,
        at: [200, 150],
        color: "#e9d9b8",
        badge: [182, 128],
      },
      {
        text: "Kvarts forblir intakt",
        x: 40,
        y: 474,
        at: [266, 420],
        color: C.fg,
        badge: [266, 446],
      },
      {
        text: "Kalium og kiselsyre vaskes ut",
        x: 940,
        y: 150,
        color: C.rain,
        anchor: "end",
        badge: [760, 180],
      },
      {
        text: "Kvartskornene blir sand",
        x: 940,
        y: 486,
        at: [800, 410],
        color: C.sand,
        anchor: "end",
        badge: [740, 420],
      },
    );
  }
  return (
    <IsbreFigur
      svgRef={ref}
      title="Forvitring i fire steg: trykkavlastning, rotsprengning, karbonsyre som løser kalkstein, og hydrolyse av feltspat"
      heading={heading}
      caption={
        caption ??
        "Forvitring bryter ned berget der det ligger, uten transport. Trykkavlastning og rotsprengning sprenger berget mekanisk. Karbonsyre og hydrolyse endrer mineralene kjemisk. Frostsprengning har en egen figur nedenfor."
      }
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={FV_STEPS}
          step={step}
          onStep={pickStep(clock, motion)}
          label="Velg forvitringsform"
        />
      }
      status={FV_STATUS[step - 1]}
      labels={labels}
      notes={[
        "Skjematisk, ikke i målestokk",
        step === 4 ? "Nærbilde av mineralkorn" : "Tverrsnitt",
      ]}
      viewBox="0 0 960 500"
    >
      {({ d, m, narrow }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="forvitring"
          data-step={step}
        >
          <rect width="960" height="500" fill={d.url.sky} rx="10" />
          {step === 1 ? <FvTrykk phase={phase} d={d} m={m.warm} /> : null}
          {step === 2 ? <FvRot phase={phase} d={d} m={m.warm} /> : null}
          {step === 3 ? <FvKarst phase={phase} t={t} d={d} /> : null}
          {step === 4 ? <FvHydrolyse phase={phase} t={t} m={m.cold} /> : null}
          {narrow ? null : (
            <g transform="translate(940 26)">
              <rect
                x={-176}
                y={-18}
                width={176}
                height={26}
                rx={13}
                fill={step <= 2 ? "#3a3127" : "#1f3440"}
              />
              <text
                x={-88}
                y={0}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fontFamily={font}
                fill={step <= 2 ? C.warm : C.rain}
              >
                {FV_KIND[step - 1]}
              </text>
            </g>
          )}
        </g>
      )}
    </IsbreFigur>
  );
}

type DefsArg = Parameters<Parameters<typeof IsbreFigur>[0]["children"]>[0]["d"];

const GRANITE = "#a48d84";
function GraniteDots({ clip }: { clip: string }) {
  return (
    <g clipPath={clip} data-nocheck="">
      {Array.from({ length: 260 }, (_, i) => (
        <circle
          key={i}
          cx={150 + hash(i, 1) * 660}
          cy={150 + hash(i, 2) * 340}
          r={1 + hash(i, 3) * 2.2}
          fill={hash(i, 4) < 0.35 ? "#3d3633" : hash(i, 4) < 0.7 ? "#d8cfc8" : "#c79a8a"}
          opacity="0.8"
        />
      ))}
    </g>
  );
}

function FvTrykk({ phase, d, m }: { phase: number; d: DefsArg; m: string }) {
  const e = smooth(phase / 0.6);
  const xs = Array.from({ length: 49 }, (_, i) => 20 + i * 19.17);
  const surf = xs.map((x): [number, number] => [x, lerp(92, fvFinal(x), e)]);
  const groundTop = xs.map((x): [number, number] => [x, fvFinal(x)]);
  const domeXs = xs.filter((x) => x >= 160 && x <= 800);
  const granite = `M160 ${FV_SIDE} L${pts(domeXs.map((x): [number, number] => [x, fvDome(x)]))} L800 ${FV_SIDE} L780 488 L180 488 Z`;
  const country = `M${pts(groundTop)} L940 488 L20 488 Z`;
  const over = `M20 92 L940 92 L${pts([...surf].reverse())} Z`;
  const sheet = smooth((phase - 0.5) / 0.4);
  const joints = [16, 38, 64].map((o, k) => {
    const half = 250 - k * 40;
    const jx = domeXs.filter((x) => Math.abs(x - 480) < half);
    return `M${pts(jx.map((x): [number, number] => [x, fvDome(x) + o + 0.04 * o * Math.sin(x / 30)]))}`;
  });
  const clipId = "fv-granite-clip";
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path d={granite} />
        </clipPath>
      </defs>
      <path d={country} fill={d.url.rock} />
      <path d={country} fill={d.url.strata} />
      <path d={granite} fill={GRANITE} />
      <GraniteDots clip={`url(#${clipId})`} />
      {/* tidligere overflate */}
      <path d="M20 92 L940 92" stroke={C.muted} strokeWidth="1.6" strokeDasharray="7 6" />
      {e < 1 ? (
        <g>
          <path d={over} fill="#7f7a68" />
          <path d={over} fill={d.url.strata} />
        </g>
      ) : null}
      {e < 0.9
        ? [330, 480, 630].map((x) => (
            <path
              key={x}
              d={`M${x} 40 L${x} ${40 + 40 * (1 - e)}`}
              stroke={C.fg}
              strokeWidth="3"
              opacity={1 - e}
              markerEnd={`url(#${m})`}
            />
          ))
        : null}
      <g opacity={sheet}>
        {joints.map((j, i) => (
          <path key={i} d={j} fill="none" stroke="#2b2420" strokeWidth={2.4 - i * 0.4} />
        ))}
        {[360, 480, 600].map((x) => {
          const y = fvDome(x);
          const slope = (340 * (x - 480)) / 320 ** 2;
          const len = Math.hypot(1, slope);
          const nx = slope / len;
          const ny = -1 / len;
          return (
            <path
              key={x}
              d={`M${n1(x + nx * 8)} ${n1(y + ny * 8)} l${n1(nx * 34)} ${n1(ny * 34)}`}
              stroke={C.warm}
              strokeWidth="3.2"
              markerEnd={`url(#${m})`}
            />
          );
        })}
      </g>
    </g>
  );
}

function FvRot({ phase, d, m }: { phase: number; d: DefsArg; m: string }) {
  const g = smooth(phase);
  const top = 214;
  const depth = lerp(150, 250, g);
  const w0 = lerp(14, 34, g);
  const S = Array.from({ length: 16 }, (_, i) => i / 15);
  const at = (s: number, side: number): [number, number] =>
    p1([486 + s * 20 + side * w0 * 0.5 * (1 - s) ** 0.7 + 5 * Math.sin(s * 9), top + s * depth]);
  const crack = `M${pts([...S.map((s) => at(s, -1)), ...[...S].reverse().map((s) => at(s, 1))])} Z`;
  const rootLen = lerp(0.35, 0.92, g);
  const root = smoothPath(S.filter((s) => s <= rootLen).map((s) => at(s, 0)));
  const rock = `M20 ${top} L940 ${top} L940 488 L20 488 Z`;
  const sc = lerp(0.85, 1.05, g);
  return (
    <g>
      <path d={rock} fill={d.url.rock} />
      <path d={rock} fill={d.url.strata} />
      <path
        d={`M20 ${top - 10} Q300 ${top - 18} 480 ${top - 12} T940 ${top - 8} L940 ${top} L20 ${top} Z`}
        fill="#4b3d2c"
      />
      <path
        d={`M20 ${top - 10} Q300 ${top - 18} 480 ${top - 12} T940 ${top - 8}`}
        stroke={P.grass}
        strokeWidth="4"
        fill="none"
      />
      <path d={crack} fill="#0b1217" />
      <path
        d="M150 400 L190 470 M800 330 L840 380 M690 420 L760 450"
        stroke="#2f362d"
        strokeWidth="1.6"
      />
      {/* tre */}
      <g transform={`translate(470 ${top - 10}) scale(${sc}) translate(-470 ${-(top - 10)})`}>
        <rect x="462" y={top - 120} width="14" height="112" fill="#5a4330" />
        {[0, 1, 2, 3].map((k) => (
          <path
            key={k}
            d={`M${469 - 62 + k * 12} ${top - 52 - k * 38} L469 ${top - 140 - k * 38} L${469 + 62 - k * 12} ${top - 52 - k * 38} Z`}
            fill={k % 2 ? "#3f5a3a" : "#4a6a42"}
          />
        ))}
      </g>
      {/* røtter i jorda */}
      <path
        d={`M470 ${top - 10} Q420 ${top - 4} 380 ${top + 2} M472 ${top - 10} Q540 ${top - 2} 590 ${top + 4}`}
        stroke="#7a5a3c"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M470 ${top - 12} L486 ${top + 2} ${root.replace(/^M[^C]*/, "")}`}
        stroke="#8a6644"
        strokeWidth={lerp(4, 8, g)}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={root}
        stroke="#a37b52"
        strokeWidth={lerp(2, 5, g)}
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      {g > 0.3
        ? [0.4, 0.62].flatMap((s) =>
            [-1, 1].map((side) => {
              const [x, y] = at(s, side * 1.4);
              return (
                <path
                  key={`${s}-${side}`}
                  d={`M${x} ${y} l${side * 30 * g} 0`}
                  stroke={C.warm}
                  strokeWidth="3.4"
                  markerEnd={`url(#${m})`}
                  opacity={smooth((g - 0.3) / 0.4)}
                />
              );
            }),
          )
        : null}
    </g>
  );
}

function FvKarst({ phase, t, d }: { phase: number; t: number; d: DefsArg }) {
  const k = smooth(phase);
  const top = 150;
  const dolX = 262;
  const dolD = lerp(14, 44, k);
  const surface = `M20 ${top} L${dolX - 70} ${top} Q${dolX - 34} ${top + 2} ${dolX - 18} ${top + dolD} Q${dolX} ${top + dolD + 10} ${dolX + 18} ${top + dolD} Q${dolX + 34} ${top + 2} ${dolX + 70} ${top} L940 ${top}`;
  const ground = `${surface} L940 488 L20 488 Z`;
  // hulen vokser
  const cx = 600;
  const cy = 360;
  const rx = lerp(150, 230, k);
  const ry = lerp(42, 64, k);
  const cave = `M${cx - rx} ${cy + 10} Q${cx - rx + 10} ${cy - ry} ${cx - 60} ${cy - ry - 4} Q${cx + 40} ${cy - ry + 6} ${cx + rx - 30} ${cy - ry + 10} Q${cx + rx + 10} ${cy - 10} ${cx + rx} ${cy + 22} Q${cx + 60} ${cy + ry + 10} ${cx - 40} ${cy + ry} Q${cx - rx + 20} ${cy + ry - 4} ${cx - rx} ${cy + 10} Z`;
  const floorY = (x: number) => n1(cy + ry - 6 - 10 * Math.cos((x - cx) / 90));
  const roofY = (x: number) => n1(cy - ry + 2 + 8 * Math.sin((x - cx) / 70));
  const tites = [520, 560, 640, 690, 730].map((x, i) => ({
    x,
    len: lerp(10, 30 + 10 * (i % 2), k),
  }));
  const mites = [540, 640, 700].map((x, i) => ({ x, len: lerp(6, 22 + 8 * (i % 2), k) }));
  const drops = Array.from({ length: 24 }, (_, i) => {
    const u = frac(t * 0.8 + hash(i, 1));
    return { x: 50 + hash(i, 2) * 330, y: 56 + u * 86 };
  });
  const flow = Array.from({ length: 8 }, (_, i) => {
    const u = frac(t * 0.18 + i / 8);
    const x = cx - rx + 40 + u * (2 * rx - 60);
    return { x, y: floorY(x) - 1 };
  });
  const seep = Array.from({ length: 5 }, (_, i) => {
    const u = frac(t * 0.5 + i / 5);
    return { x: dolX + 4 + u * 40, y: top + dolD + u * (cy - ry - top - dolD) };
  });
  return (
    <g>
      <path d={ground} fill="#a7a596" />
      <path d={ground} fill={d.url.strata} />
      <path
        d={`M${dolX + 2} ${top + dolD} L${dolX + 30} ${top + 110} L${dolX + 44} ${cy - ry + 10}`}
        stroke="#59584d"
        strokeWidth="3"
        fill="none"
      />
      <path d={surface} stroke="#4b3d2c" strokeWidth="9" fill="none" />
      <path d={surface} stroke={P.grass} strokeWidth="3" fill="none" transform="translate(0 -4)" />
      {/* skyer og regn */}
      <path
        d="M40 54 q20 -26 50 -12 q18 -24 46 -6 q30 -6 34 18 Z M300 50 q22 -24 52 -10 q20 -20 46 -4 q28 -4 30 16 Z"
        fill="#5f7280"
      />
      <g data-nocheck="">
        {drops.map((p, i) => (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={p.x - 3}
            y2={p.y + 9}
            stroke="#8fd0ef"
            strokeWidth="1.6"
          />
        ))}
      </g>
      <defs>
        <clipPath id="fv-cave-clip">
          <path d={cave} />
        </clipPath>
      </defs>
      <path d={cave} fill="#141b20" />
      <path
        d={`M${cx - rx} ${floorY(cx - rx + 30) - 2} Q${cx} ${floorY(cx) + 2} ${cx + rx} ${floorY(cx + rx - 20) - 4}`}
        stroke={P.water}
        strokeWidth="10"
        fill="none"
        clipPath="url(#fv-cave-clip)"
      />
      <g data-nocheck="">
        {flow.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="#bfe6f5" />
        ))}
        {seep.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.4" fill="#8fd0ef" />
        ))}
      </g>
      {tites.map((s) => (
        <path
          key={s.x}
          d={`M${s.x - 7} ${roofY(s.x) - 2} L${s.x} ${roofY(s.x) + s.len} L${s.x + 7} ${roofY(s.x) - 2} Z`}
          fill="#d9d3c2"
        />
      ))}
      {mites.map((s) => (
        <path
          key={s.x}
          d={`M${s.x - 9} ${floorY(s.x) - 4} L${s.x} ${floorY(s.x) - 4 - s.len} L${s.x + 9} ${floorY(s.x) - 4} Z`}
          fill="#d9d3c2"
        />
      ))}
    </g>
  );
}

function FvHydrolyse({ phase, t, m }: { phase: number; t: number; m: string }) {
  const k = smooth(phase);
  const X0 = 40;
  const Y0 = 96;
  const W = 520;
  const H = 360;
  const nx = 8;
  const ny = 6;
  const V: [number, number][][] = [];
  for (let j = 0; j <= ny; j++) {
    const row: [number, number][] = [];
    for (let i = 0; i <= nx; i++) {
      const edgeX = i === 0 || i === nx;
      const edgeY = j === 0 || j === ny;
      row.push([
        X0 + (i / nx) * W + (edgeX ? 0 : (hash(i * 13 + j, 1) - 0.5) * 34),
        Y0 + (j / ny) * H + (edgeY ? 0 : (hash(i * 7 + j, 2) - 0.5) * 30),
      ]);
    }
    V.push(row);
  }
  const cells: { poly: [number, number][]; quartz: boolean; c: [number, number] }[] = [];
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      const poly = [V[j][i], V[j][i + 1], V[j + 1][i + 1], V[j + 1][i]];
      const c: [number, number] = [
        poly.reduce((a, p) => a + p[0], 0) / 4,
        poly.reduce((a, p) => a + p[1], 0) / 4,
      ];
      cells.push({ poly, quartz: hash(i * 31 + j * 17, 5) < 0.36, c });
    }
  const fresh = hexToRgb("#c98f80");
  const kaol = hexToRgb("#e9dcc0");
  const kc = `rgb(${fresh.map((v, i) => Math.round(lerp(v, kaol[i], k))).join(",")})`;
  const ions = Array.from({ length: 8 }, (_, i) => {
    const u = frac(t * 0.25 + i / 8);
    return { x: n1(580 + u * 180), y: n1(196 + 20 * Math.sin(i * 2 + u * 6)) };
  });
  return (
    <g>
      <rect x={X0 - 8} y={Y0 - 8} width={W + 16} height={H + 16} rx="8" fill="#3b3025" />
      {cells.map((c, i) => {
        const shrink = c.quartz ? 0.97 : lerp(0.97, 0.78, k);
        const poly = c.poly.map(([x, y]): [number, number] => [
          c.c[0] + (x - c.c[0]) * shrink,
          c.c[1] + (y - c.c[1]) * shrink,
        ]);
        return (
          <g key={i}>
            <path
              d={`M${pts(poly)} Z`}
              fill={c.quartz ? "#d6dde2" : kc}
              stroke={c.quartz ? "#9fb0bb" : "#8e6a5c"}
              strokeWidth="1.2"
            />
            {c.quartz ? (
              <path
                d={`M${c.c[0] - 14} ${c.c[1] - 8} l10 -6`}
                stroke="#ffffff"
                strokeOpacity="0.8"
                strokeWidth="2"
              />
            ) : k > 0.3 ? (
              <g opacity={k} data-nocheck="">
                {[0, 1, 2, 3].map((q) => (
                  <circle
                    key={q}
                    cx={c.c[0] + (hash(i, q) - 0.5) * 30}
                    cy={c.c[1] + (hash(i, q + 9) - 0.5) * 26}
                    r="1.6"
                    fill="#b8a787"
                  />
                ))}
              </g>
            ) : null}
          </g>
        );
      })}
      {/* vann i korngrensene */}
      <g opacity={0.25 + 0.6 * k} data-nocheck="">
        {V.slice(1, -1).map((row, j) => (
          <path key={j} d={`M${pts(row)}`} stroke={P.water} strokeWidth="2" fill="none" />
        ))}
      </g>
      {/* utvasking */}
      <path
        d="M572 220 L770 220"
        stroke={C.rain}
        strokeWidth="3"
        markerEnd={`url(#${m})`}
        opacity={k}
      />
      <g data-nocheck="" opacity={k}>
        {ions.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.4" fill={C.rain} />
        ))}
      </g>
      {/* sand */}
      <path d="M640 456 Q760 386 900 456 Z" fill="#c9b88a" opacity={k} />
      <g opacity={k} data-nocheck="">
        {Array.from({ length: 22 }, (_, i) => {
          const u = hash(i, 7);
          const x = 664 + u * 214;
          const yTop = 456 - 60 * Math.sin(((x - 640) / 260) * Math.PI) * 0.95;
          return (
            <circle
              key={i}
              cx={n1(x)}
              cy={n1(yTop + 6 + hash(i, 8) * (456 - yTop - 8))}
              r={3 + hash(i, 9) * 2}
              fill="#e3e8eb"
              stroke="#9fb0bb"
            />
          );
        })}
      </g>
    </g>
  );
}

/* =====================================================================
 * 3. Elva fra kilde til munning (lengdeprofil med tverrsnitt)
 * ===================================================================== */

const EL_STEPS = ["1 Øvre løp", "2 Nedre løp", "3 Munning"];
const EL_STATUS = [
  "Øvre løp: Terrenget er bratt og fallet stort. Elva graver seg rett nedover (bunnerosjon), og løsmasser raser ned fra dalsidene. Det gir en V-dal.",
  "Nedre løp: Nær havnivå avtar fallet. Elva slutter å grave nedover og eroderer sideveis: Den eroderer i yttersvingen og avsetter sand og grus i innersvingen.",
  "Munning: Strømmen stanser brått opp i innsjøen eller havet, og transportevnen forsvinner. Kornene avsettes og bygger et delta. Havnivået er elvas erosjonsbasis.",
];
const EL_SEA = 400;
const elProf = (x: number) => {
  const u = clamp((x - 60) / 700);
  return n1(EL_SEA - 306 * (1 - u) ** 2.2);
};
const elSeabed = (x: number) => EL_SEA + 6 + (x - 760) * 0.36;
const EL_SEG: [number, number][] = [
  [60, 270],
  [330, 750],
  [720, 870],
];
const EL_BOX = { x: 400, y: 30, w: 540, h: 250 };

export function ElvaFraKildeTilMunning({
  heading = "Elva fra kilde til munning",
  caption,
  initialStep,
}: LandformFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const clock = useStepClock(3, running, 3400, 1600, initialStep);
  const t = useTicker(running);
  const { step, phase } = clock;
  const k = smooth(phase);
  const xs = Array.from({ length: 71 }, (_, i) => 20 + i * 10.86);
  const land = xs.map((x): [number, number] => [
    x,
    x < 60 ? elProf(60) : x <= 760 ? elProf(x) : elSeabed(x),
  ]);
  const ground = `M${pts(land)} L940 ${elSeabed(940)} L940 492 L20 492 Z`;
  const river = smoothPath(
    xs.filter((x) => x >= 60 && x <= 762).map((x): [number, number] => [x, elProf(x) - 3]),
  );
  const front = step === 3 ? lerp(800, 836, k) : 800;
  const delta = `M716 ${elProf(716) - 1} L${front - 14} ${EL_SEA - 2} L${front} ${EL_SEA + 2} L${front + 44} ${elSeabed(front + 44)} L716 ${elSeabed(716) + 30} Z`;
  const [s0, s1] = EL_SEG[step - 1];
  const seg = smoothPath(
    xs
      .filter((x) => x >= s0 && x <= Math.min(s1, 760))
      .map((x): [number, number] => [x, elProf(x) - 3]),
  );
  const flow = Array.from({ length: 24 }, (_, i) => {
    const u = frac(t * 0.07 + i / 24);
    const x = n1(60 + 700 * u ** 0.6);
    return [x, elProf(x) - 4] as [number, number];
  });
  const B = EL_BOX;
  const title = {
    x: B.x + 16,
    y: B.y + 28,
    color: C.muted,
    badge: [B.x + 26, B.y + 24] as [number, number],
  };
  const labels: Lab[] = [
    { text: "Kilde", x: 40, y: 70, at: [62, elProf(62) - 4], color: C.fg, badge: [40, 70] },
    { text: "Havnivå", x: 934, y: 422, color: C.fg, anchor: "end", badge: [912, 424] },
  ];
  if (step === 1)
    labels.push(
      {
        text: "Bratt fall: elva graver nedover",
        x: 100,
        y: 70,
        at: [150, elProf(150) - 4],
        color: C.warm,
        badge: [170, elProf(170) - 34],
      },
      { text: "Tverrsnitt: V-dal", ...title },
      { text: "Bunnerosjon", x: 690, y: 262, at: [672, 250], color: C.warm, badge: [700, 256] },
      {
        text: "Løsmasser raser ned fra dalsidene",
        x: 924,
        y: 92,
        at: [748, 156],
        color: C.sand,
        anchor: "end",
        badge: [790, 150],
      },
    );
  if (step === 2)
    labels.push(
      {
        text: "Slakt fall: elva eroderer sideveis",
        x: 440,
        y: 318,
        at: [420, elProf(420) - 4],
        color: C.warm,
        badge: [430, elProf(430) - 34],
      },
      { text: "Tverrsnitt: meandersving", ...title },
      {
        text: "Yttersving: erosjon",
        x: 924,
        y: 120,
        at: [858, 196],
        color: C.warm,
        anchor: "end",
        badge: [880, 180],
      },
      {
        text: "Innersving: avsetning (sandør)",
        x: 416,
        y: 262,
        at: [640, 186],
        color: C.sand,
        badge: [610, 214],
      },
    );
  if (step === 3)
    labels.push(
      {
        text: "Strømmen stanser, deltaet bygges",
        x: 700,
        y: 330,
        at: [front - 20, EL_SEA - 4],
        color: C.sand,
        anchor: "end",
        badge: [front - 20, EL_SEA - 30],
      },
      { text: "Kornene avsettes etter størrelse", ...title },
      { text: "Grus", x: 500, y: 262, color: C.fg, anchor: "middle", badge: [500, 258] },
      { text: "Sand", x: 620, y: 262, color: C.fg, anchor: "middle", badge: [620, 258] },
      { text: "Silt", x: 740, y: 262, color: C.fg, anchor: "middle", badge: [740, 258] },
      { text: "Leire", x: 860, y: 262, color: C.fg, anchor: "middle", badge: [860, 258] },
    );
  return (
    <IsbreFigur
      svgRef={ref}
      title="Elva fra kilde til munning: bratt øvre løp med V-dal, slakt nedre løp med meandere og munning med delta"
      heading={heading}
      caption={
        caption ??
        "Fra kilden til havet blir fallet stadig mindre. Øverst graver elva seg ned og lager V-dal. Lenger ned eroderer den sideveis og lager meandere. Ved munningen stanser strømmen, og kornene avsettes i et delta."
      }
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={EL_STEPS}
          step={step}
          onStep={pickStep(clock, motion)}
          label="Velg del av elva"
        />
      }
      status={EL_STATUS[step - 1]}
      labels={labels}
      notes={["Lengdeprofil med tverrsnitt i ruta", "Skjematisk, høyden er sterkt overdrevet"]}
      viewBox="0 0 960 500"
    >
      {({ d, m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="elv"
          data-step={step}
        >
          <rect width="960" height="500" fill={d.url.sky} rx="10" />
          <path
            d={`M760 ${EL_SEA} L940 ${EL_SEA} L940 ${elSeabed(940)} L760 ${elSeabed(760)} Z`}
            fill={d.url.water}
          />
          <path d={ground} fill={d.url.rock} />
          <path d={ground} fill={d.url.strata} />
          <path
            d={`M${pts(land.filter(([x]) => x <= 760))}`}
            stroke={P.grass}
            strokeWidth="4"
            fill="none"
          />
          <path d={delta} fill={P.outwash} />
          <path
            d={`M760 ${EL_SEA} L940 ${EL_SEA}`}
            stroke={C.rain}
            strokeWidth="2"
            strokeDasharray="8 5"
          />
          <path d={river} stroke={P.water} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path
            d={seg}
            stroke={C.warm}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          <g data-nocheck="">
            {flow.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.4" fill="#bfe6f5" />
            ))}
          </g>
          <rect
            x={B.x}
            y={B.y}
            width={B.w}
            height={B.h}
            rx="10"
            fill="#132430"
            stroke={C.warm}
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          {step === 1 ? <ElV k={k} t={t} m={m.warm} d={d} /> : null}
          {step === 2 ? <ElMeanderSnitt k={k} t={t} m={m} /> : null}
          {step === 3 ? <ElSort k={k} t={t} /> : null}
        </g>
      )}
    </IsbreFigur>
  );
}

function ElV({ k, t, m, d }: { k: number; t: number; m: string; d: DefsArg }) {
  const top = 112;
  const bottom = lerp(222, 236, k);
  const bot = EL_BOX.y + EL_BOX.h - 6;
  const rock = `M406 ${top} L560 ${top} L664 ${bottom} L680 ${bottom} L784 ${top} L934 ${top} L934 ${bot} L406 ${bot} Z`;
  const stones = [0, 1, 2, 3].map((i) => {
    const u = frac(t * 0.3 + i / 4);
    const left = i % 2 === 0;
    const x = left ? lerp(586, 656, u) : lerp(758, 690, u);
    const y = lerp(top + 22, bottom - 10, u) - 6;
    return { x, y };
  });
  return (
    <g>
      <path d={rock} fill={d.url.rock} />
      <path d={rock} fill={d.url.strata} />
      <path
        d={`M406 ${top} L560 ${top} L664 ${bottom} M680 ${bottom} L784 ${top} L934 ${top}`}
        fill="none"
        stroke={P.grass}
        strokeWidth="3.5"
      />
      <path
        d={`M658 ${bottom - 7} L686 ${bottom - 7} L680 ${bottom} L664 ${bottom} Z`}
        fill={P.water}
      />
      <path
        d={`M672 ${bottom + 4} l0 ${244 - bottom}`}
        stroke={C.warm}
        strokeWidth="3.4"
        markerEnd={`url(#${m})`}
      />
      <g data-nocheck="">
        {stones.map((s, i) => (
          <path
            key={i}
            d={`M${s.x - 6} ${s.y} L${s.x - 2} ${s.y - 6} L${s.x + 6} ${s.y - 4} L${s.x + 6} ${s.y + 3} L${s.x} ${s.y + 6} Z`}
            fill="#a19b89"
            stroke="#4c483f"
          />
        ))}
      </g>
    </g>
  );
}

function ElMeanderSnitt({ k, t, m }: { k: number; t: number; m: { warm: string; cold: string } }) {
  const y0 = 150;
  const sh = lerp(0, 14, k);
  const bot = EL_BOX.y + EL_BOX.h - 6;
  const ground = `M406 ${y0} L${520 + sh} ${y0} Q${680 + sh} ${y0 + 10} ${790 + sh} ${y0 + 76} L${812 + sh} ${y0 + 80} L${826 + sh} ${y0} L934 ${y0} L934 ${bot} L406 ${bot} Z`;
  const water = `M${600 + sh} ${y0 + 5} L${826 + sh} ${y0 + 5} L${812 + sh} ${y0 + 78} L${790 + sh} ${y0 + 74} Q${700 + sh} ${y0 + 18} ${600 + sh} ${y0 + 5} Z`;
  const bar = `M${520 + sh} ${y0} Q${680 + sh} ${y0 + 10} ${770 + sh} ${y0 + 62} Q${660 + sh} ${y0 + 36} ${520 + sh} ${y0 + 12} Z`;
  return (
    <g>
      <path d={ground} fill="#6a5c48" />
      <path
        d={`M406 ${y0} L${520 + sh} ${y0} M${826 + sh} ${y0} L934 ${y0}`}
        stroke={P.grass}
        strokeWidth="3.5"
      />
      <path d={water} fill={P.water} />
      <path d={bar} fill={P.outwash} />
      <path
        d={`M${832 + sh} ${y0 + 46} l24 0`}
        stroke={C.warm}
        strokeWidth="3.4"
        markerEnd={`url(#${m.warm})`}
      />
      <g data-nocheck="">
        <ellipse
          cx={772 + sh}
          cy={y0 + 34}
          rx="22"
          ry="14"
          fill="none"
          stroke="#cfeaf6"
          strokeWidth="1.8"
          strokeDasharray="6 4"
          strokeDashoffset={-t * 22}
        />
      </g>
    </g>
  );
}

function ElSort({ k, t }: { k: number; t: number }) {
  const y0 = 92;
  const bed = 226;
  const groups = [
    { x: 500, r: 10, n: 5, c: "#9b917e" },
    { x: 620, r: 5.5, n: 8, c: "#d8c07a" },
    { x: 740, r: 3.2, n: 12, c: "#bcae8a" },
    { x: 860, r: 2, n: 16, c: "#a9a08a" },
  ];
  return (
    <g>
      <rect x="420" y={y0} width="500" height={bed - y0} fill={P.water} opacity="0.5" />
      <path d={`M420 ${y0} L920 ${y0}`} stroke={C.rain} strokeWidth="2" strokeDasharray="8 5" />
      <rect x="420" y={bed} width="500" height="16" fill="#5b513f" />
      <g data-nocheck="">
        {groups.flatMap((g, gi) =>
          Array.from({ length: g.n }, (_, i) => {
            const u = frac(t * (0.5 - gi * 0.09) + i / g.n);
            const fall = gi * 0.2 + 0.3;
            const x = g.x - 44 + (88 * (i + 0.5)) / g.n;
            const yy = lerp(y0 + 4, bed - g.r, clamp(u / fall));
            const settled = k >= 0.999 || u > fall;
            return (
              <circle
                key={`${gi}-${i}`}
                cx={x}
                cy={settled ? bed - g.r : yy}
                r={g.r}
                fill={g.c}
                stroke="#2a241a"
                strokeWidth="0.8"
              />
            );
          }),
        )}
      </g>
    </g>
  );
}

/* =====================================================================
 * 4. Meander og kroksjø (planvisning)
 * ===================================================================== */

const ME_STEPS = ["1 Svinger", "2 Svingene vokser", "3 Flom", "4 Kroksjø"];
const ME_STATUS = [
  "Elva renner i svinger over en flat elveslette. Vannet går raskest i yttersvingen og eroderer der. I innersvingen går det sakte, og sand og grus avsettes som sandører.",
  "Yttersvingen eroderes videre og innersvingen bygges ut. Svingene blir stadig mer buktende, og meanderhalsen blir smal.",
  "Under en storflom tar elva den korteste veien og bryter tvers gjennom den smale meanderhalsen.",
  "Den avsnørte elvesvingen blir liggende igjen som en hesteskoformet innsjø: en kroksjø. Elva renner videre i det nye, kortere løpet.",
];
const ME_SCALE = 700;
const ME_N = 1400;
const ME_L = 4;
/** Vinkel langs elva: sinusgenerert kurve der den midtre svingen er mest utviklet. */
function meTheta(s: number, th0: number) {
  const env = 0.62 + 0.38 * Math.cos(Math.PI * clamp(s / 1.6, -1, 1));
  return th0 * env * Math.sin(2 * Math.PI * s);
}
function meanderLine(th0: number) {
  const ds = (2 * ME_L) / ME_N;
  const half = ME_N / 2;
  const f: [number, number, number][] = [[0, 0, 0]];
  let x = 0;
  let y = 0;
  for (let i = 1; i <= half; i++) {
    const s = (i - 0.5) * ds;
    const a = meTheta(s, th0);
    x += Math.cos(a) * ds;
    y += Math.sin(a) * ds;
    f.push([x, y, i * ds]);
  }
  x = 0;
  y = 0;
  const b: [number, number, number][] = [];
  for (let i = 1; i <= half; i++) {
    const s = -(i - 0.5) * ds;
    const a = meTheta(s, th0);
    x -= Math.cos(a) * ds;
    y -= Math.sin(a) * ds;
    b.push([x, y, -i * ds]);
  }
  const all = [...b.reverse(), ...f];
  // midtre sving har toppen i (480, 150)
  return all.map(([px, py, s]) => ({
    x: n1(480 + px * ME_SCALE),
    y: n1(96 + py * ME_SCALE),
    s,
    th: meTheta(s, th0),
  }));
}
type MePt = ReturnType<typeof meanderLine>[number];
function neckOf(line: MePt[]) {
  const c = ME_N / 2;
  let best = { i: 0, j: 0, dist: 1e9 };
  const per = ME_N / (2 * ME_L);
  for (let i = Math.round(c - 0.7 * per); i < c - 0.1 * per; i += 2)
    for (let j = Math.round(c + 0.1 * per); j < c + 0.7 * per; j += 2) {
      const dd = Math.hypot(line[i].x - line[j].x, line[i].y - line[j].y);
      if (dd < best.dist) best = { i, j, dist: dd };
    }
  return best;
}
const ME_W = 22;

export function MeanderOgKroksjo({
  heading = "Meander og kroksjø",
  caption,
  initialStep,
}: LandformFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const clock = useStepClock(4, running, 3400, 1600, initialStep);
  const t = useTicker(running);
  const { step, phase } = clock;
  const q = Math.round(phase * 24) / 24;
  const deg = step === 1 ? lerp(40, 66, smooth(q)) : step === 2 ? lerp(66, 114, smooth(q)) : 114;
  const line = useMemo(() => meanderLine((deg * Math.PI) / 180), [deg]);
  const neck = useMemo(() => neckOf(line), [line]);
  const cut = step === 3 ? smooth((q - 0.35) / 0.55) : step === 4 ? 1 : 0;
  const lakeK = step === 4 ? smooth(q / 0.6) : 0;
  const vis = line.filter((p) => p.x > -60 && p.x < 1020);
  const pathOf = (list: MePt[]) => `M${pts(list.map((p): [number, number] => [p.x, p.y]))}`;
  const before = line.slice(0, neck.i + 1).filter((p) => p.x > -60);
  const loop = line.slice(neck.i, neck.j + 1);
  const after = line.slice(neck.j).filter((p) => p.x < 1020);
  const A = line[neck.i];
  const B = line[neck.j];
  const per = ME_N / (2 * ME_L);
  // sandører i innersvingene og erosjon i yttersvingene (toppen av hver sving: θ = 0)
  const apexes = Array.from({ length: 9 }, (_, n) =>
    Math.round(ME_N / 2 + (n - 4) * per * 0.5),
  ).filter(
    (i) =>
      i > 0 && i < ME_N && line[i].x > 30 && line[i].x < 930 && line[i].y > 20 && line[i].y < 460,
  );
  const amp = (deg - 40) / 74;
  const bars = apexes.map((ai) => {
    const sgn = Math.cos(2 * Math.PI * line[ai].s) > 0 ? 1 : -1; // krumning > 0: sentrum til venstre (+n)
    const span = Math.round(per * 0.16);
    const seg = line.slice(Math.max(0, ai - span), Math.min(ME_N, ai + span) + 1);
    const outer = seg.map((p): [number, number] => {
      const nx = -Math.sin(p.th) * sgn;
      const ny = Math.cos(p.th) * sgn;
      return [p.x + nx * (ME_W / 2 + 1), p.y + ny * (ME_W / 2 + 1)];
    });
    const inner = seg.map((p, k): [number, number] => {
      const nx = -Math.sin(p.th) * sgn;
      const ny = Math.cos(p.th) * sgn;
      const b = Math.sin((Math.PI * k) / (seg.length - 1)) * (10 + 26 * amp);
      return [p.x + nx * (ME_W / 2 + 1 + b), p.y + ny * (ME_W / 2 + 1 + b)];
    });
    const a = line[ai];
    const ox = Math.round(Math.sin(a.th) * sgn * 1000) / 1000;
    const oy = Math.round(-Math.cos(a.th) * sgn * 1000) / 1000;
    return { ai, bar: `M${pts([...outer, ...[...inner].reverse()])} Z`, ox, oy, a, sgn };
  });
  const mid = bars.find((b) => b.ai === ME_N / 2) ?? bars[0];
  const midOuter = p1([mid.a.x + mid.ox * (ME_W / 2 + 4), mid.a.y + mid.oy * (ME_W / 2 + 4)]);
  const midInner = p1([mid.a.x - mid.ox * (ME_W / 2 + 14), mid.a.y - mid.oy * (ME_W / 2 + 14)]);
  const flowDash = -t * 40;
  const labels: Lab[] = [];
  if (step <= 2) {
    labels.push(
      {
        text: "Yttersving: erosjon",
        x: 480,
        y: 40,
        at: [midOuter[0], midOuter[1] - 18],
        color: C.warm,
        anchor: "middle",
        badge: [midOuter[0] + 40, midOuter[1] - 14],
      },
      {
        text: "Innersving: sandør (avsetning)",
        x: 480,
        y: 470,
        at: midInner,
        color: C.sand,
        anchor: "middle",
        badge: [midInner[0], midInner[1] + 24],
      },
    );
  }
  if (step === 2 || step === 3)
    labels.push({
      text: "Meanderhals",
      x: 940,
      y: 470,
      at: [(A.x + B.x) / 2, (A.y + B.y) / 2],
      color: C.fg,
      anchor: "end",
      badge: [(A.x + B.x) / 2, (A.y + B.y) / 2 + 26],
    });
  if (step === 3)
    labels.push({
      text: "Flommen bryter gjennom halsen",
      x: 480,
      y: 40,
      color: C.rain,
      anchor: "middle",
      badge: [480, 40],
    });
  if (step === 4)
    labels.push(
      {
        text: "Kroksjø",
        x: 480,
        y: 40,
        at: [line[ME_N / 2].x, line[ME_N / 2].y - 4],
        color: C.cold,
        anchor: "middle",
        badge: [line[ME_N / 2].x, line[ME_N / 2].y - 30],
      },
      {
        text: "Nytt, kortere løp",
        x: 940,
        y: 470,
        at: [(A.x + B.x) / 2, (A.y + B.y) / 2 + 4],
        color: C.fg,
        anchor: "end",
        badge: [(A.x + B.x) / 2 + 30, (A.y + B.y) / 2 + 26],
      },
    );
  const keys: Key[] = [
    { text: "Sandør (avsetning)", color: P.outwash, kind: "fill" },
    { text: "Erosjon i yttersvingen", color: C.warm, kind: "line" },
    { text: "Flomvann", color: "#7fb6cf", kind: "fill", off: step !== 3 },
  ];
  return (
    <IsbreFigur
      svgRef={ref}
      title="Meander sett ovenfra: svingene vokser, en flom bryter gjennom meanderhalsen, og den avsnørte svingen blir en kroksjø"
      heading={heading}
      caption={
        caption ??
        "Elva eroderer i yttersvingen og avsetter sand og grus i innersvingen, så svingene vandrer og blir stadig mer buktende. Under en storflom kan elva bryte gjennom den smale meanderhalsen. Svingen som blir liggende igjen, er en kroksjø."
      }
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={ME_STEPS}
          step={step}
          onStep={pickStep(clock, motion)}
          label="Velg steg i meanderen"
        />
      }
      status={ME_STATUS[step - 1]}
      labels={labels}
      keys={keys}
      notes={["Sett ovenfra", "Skjematisk"]}
      viewBox="0 0 960 500"
    >
      {({ m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="meander"
          data-step={step}
        >
          <rect width="960" height="500" fill="#3c4a33" rx="10" />
          <g data-nocheck="">
            {Array.from({ length: 70 }, (_, i) => (
              <circle
                key={i}
                cx={hash(i, 1) * 960}
                cy={hash(i, 2) * 500}
                r={6 + hash(i, 3) * 10}
                fill="#34422c"
              />
            ))}
          </g>
          <g data-nocheck="">
            {step === 3 ? (
              <path
                d={pathOf(vis)}
                stroke="#7fb6cf"
                strokeOpacity={0.35 * smooth(q / 0.4)}
                strokeWidth={ME_W + 70}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ) : null}
            {step === 4 ? (
              <>
                <path
                  d={pathOf([...before, ...after.slice(0, 1)])}
                  stroke="#25301f"
                  strokeWidth={ME_W + 8}
                  fill="none"
                  strokeLinejoin="round"
                />
                <path d={`M${A.x} ${A.y} L${B.x} ${B.y}`} stroke="#25301f" strokeWidth={ME_W + 8} />
                <path
                  d={pathOf(after)}
                  stroke="#25301f"
                  strokeWidth={ME_W + 8}
                  fill="none"
                  strokeLinejoin="round"
                />
                <path
                  d={pathOf(loop.slice(6, -6))}
                  stroke="#25301f"
                  strokeWidth={ME_W + 6}
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <path
                d={pathOf(vis)}
                stroke="#25301f"
                strokeWidth={ME_W + 8}
                fill="none"
                strokeLinejoin="round"
              />
            )}
          </g>
          {step <= 3
            ? bars.map((b) => <path key={b.ai} d={b.bar} fill={P.outwash} />)
            : bars
                .filter((b) => b.ai !== ME_N / 2)
                .map((b) => <path key={b.ai} d={b.bar} fill={P.outwash} />)}
          {step === 4 ? (
            <g>
              <path
                d={pathOf(loop.slice(6, -6))}
                stroke={lakeK > 0.5 ? "#4f8f86" : P.water}
                strokeWidth={ME_W - 2}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <circle cx={A.x} cy={A.y} r={ME_W * 0.75} fill={P.outwash} />
              <circle cx={B.x} cy={B.y} r={ME_W * 0.75} fill={P.outwash} />
              <path
                d={pathOf(before)}
                stroke={P.water}
                strokeWidth={ME_W}
                fill="none"
                strokeLinejoin="round"
              />
              <path
                d={`M${A.x} ${A.y} L${B.x} ${B.y}`}
                stroke={P.water}
                strokeWidth={ME_W}
                strokeLinecap="round"
              />
              <path
                d={pathOf(after)}
                stroke={P.water}
                strokeWidth={ME_W}
                fill="none"
                strokeLinejoin="round"
              />
            </g>
          ) : (
            <path
              d={pathOf(vis)}
              stroke={P.water}
              strokeWidth={ME_W}
              fill="none"
              strokeLinejoin="round"
            />
          )}
          {cut > 0 && step === 3 ? (
            <path
              d={`M${A.x} ${A.y} L${lerp(A.x, B.x, cut)} ${lerp(A.y, B.y, cut)}`}
              stroke={P.water}
              strokeWidth={ME_W * 0.8}
              strokeLinecap="round"
            />
          ) : null}
          <g data-nocheck="">
            <path
              d={
                step === 4
                  ? `${pathOf(before)} L${B.x} ${B.y} ${pathOf(after).replace(/^M/, "L")}`
                  : pathOf(vis)
              }
              stroke="#cfeaf6"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeDasharray="10 26"
              strokeDashoffset={flowDash}
              fill="none"
            />
          </g>
          {step <= 2
            ? bars.map((b) => {
                const sx = n1(b.a.x + b.ox * (ME_W / 2 + 3));
                const sy = n1(b.a.y + b.oy * (ME_W / 2 + 3));
                return (
                  <g key={b.ai}>
                    <path
                      d={smoothPath(
                        line
                          .slice(b.ai - Math.round(per * 0.12), b.ai + Math.round(per * 0.12))
                          .map((p): [number, number] => [
                            p.x - Math.sin(p.th) * -b.sgn * (ME_W / 2 + 3),
                            p.y + Math.cos(p.th) * -b.sgn * (ME_W / 2 + 3),
                          ]),
                      )}
                      stroke={C.warm}
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d={`M${sx} ${sy} l${n1(b.ox * 18)} ${n1(b.oy * 18)}`}
                      stroke={C.warm}
                      strokeWidth="2.6"
                      markerEnd={`url(#${m.warm})`}
                    />
                  </g>
                );
              })
            : null}
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * 5. Gilbert-delta (tverrsnitt)
 * ===================================================================== */

const DE_STEPS = ["1 Elva når vannet", "2 Forlag bygges", "3 Deltaet vokser utover"];
const DE_STATUS = [
  "Elva munner ut i en innsjø eller fjord. Strømmen stanser brått opp, og transportevnen forsvinner.",
  "Sand raser ned deltafronten og legger seg i skråstilte lag (forlag). Det fineste materialet, silt og leire, svever lengst ut før det legger seg på bunnen (bunnlag).",
  "Deltaet bygges trinnvis utover i vannbassenget. På deltaflaten over vannspeilet legger elva igjen grov sand og grus i horisontale lag (topplag).",
];
const DE_WY = 200;
const DE_FY = 420;
const DE_R = 170;
function deFront(step: number, k: number) {
  if (step === 1) return lerp(300, 340, k);
  if (step === 2) return lerp(340, 470, k);
  return lerp(470, 620, k);
}

export function GilbertDelta({
  heading = "Gilbert-delta: topplag, forlag og bunnlag",
  caption,
  initialStep,
}: LandformFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const clock = useStepClock(3, running, 3600, 1600, initialStep);
  const t = useTicker(running);
  const { step, phase } = clock;
  const F = deFront(step, smooth(phase));
  const toe: [number, number] = [F + DE_R, DE_FY - 16];
  const bsEnd = Math.min(950, toe[0] + 280);
  const deposit = `M250 ${DE_WY - 8} L${F - 8} ${DE_WY - 8} L${F} ${DE_WY} L${toe[0]} ${toe[1]} Q${toe[0] + 120} ${DE_FY - 6} ${bsEnd} ${DE_FY} L330 ${DE_FY} L300 ${DE_WY + 40} Z`;
  const bedrock = `M0 ${DE_WY - 8} L250 ${DE_WY - 8} L300 ${DE_WY + 40} L330 ${DE_FY} L960 ${DE_FY} L960 492 L0 492 Z`;
  const topset = `M250 ${DE_WY - 8} L${F - 8} ${DE_WY - 8} L${F} ${DE_WY} L${F - 6} ${DE_WY + 12} L262 ${DE_WY + 12} Z`;
  const bottomset = `M330 ${DE_FY} L330 ${DE_FY - 14} L${toe[0]} ${toe[1]} Q${toe[0] + 120} ${DE_FY - 6} ${bsEnd} ${DE_FY} Z`;
  const foresets: string[] = [];
  for (let x = 320; x < F - 8; x += 26) {
    const y1 = DE_WY + 12;
    const x1 = x + (DE_R * (y1 - DE_WY)) / (DE_FY - 16 - DE_WY);
    foresets.push(`M${x1} ${y1} L${x + DE_R} ${DE_FY - 16}`);
  }
  const clip = "de-clip";
  // partikler: grus stopper på deltaflaten, sand ruller ned fronten, fint stoff svever langt ut
  const gravel = Array.from({ length: 5 }, (_, i) => {
    const u = frac(t * 0.22 + i / 5);
    return { x: lerp(40, F - 30 - i * 14, u), y: DE_WY - 13, r: 4.5 };
  });
  const sand = Array.from({ length: 6 }, (_, i) => {
    const u = frac(t * 0.26 + i / 6);
    const k = clamp((u - 0.35) / 0.65);
    const x = u < 0.35 ? lerp(60, F, u / 0.35) : lerp(F, toe[0] - 10, k);
    const y = u < 0.35 ? DE_WY - 11 : lerp(DE_WY, toe[1] - 4, k) - 4;
    return { x, y, r: 2.6 };
  });
  const fines = Array.from({ length: 12 }, (_, i) => {
    const u = frac(t * 0.12 + i / 12);
    const x = lerp(F, Math.min(940, F + 200 + 260 * hash(i, 1)), u);
    const y = DE_WY + 6 + u * u * (DE_FY - DE_WY - 18) * (0.6 + 0.4 * hash(i, 2));
    return { x, y };
  });
  const labels: Lab[] = [
    { text: "Elv", x: 40, y: 170, color: C.rain, badge: [40, 170] },
    {
      text: "Vannspeil",
      x: 940,
      y: DE_WY - 10,
      color: C.rain,
      anchor: "end",
      badge: [920, DE_WY - 18],
    },
    {
      text: "Topplag: grov sand og grus",
      x: 40,
      y: 64,
      at: [Math.max(280, F - 70), DE_WY - 4],
      color: C.sand,
      badge: [Math.max(280, F - 70), DE_WY - 30],
    },
  ];
  if (step >= 2)
    labels.push({
      text: "Forlag: skråstilte sandlag",
      x: 470,
      y: 112,
      at: [F + DE_R * 0.45, DE_WY + (DE_FY - DE_WY) * 0.42],
      color: "#e6cf8a",
      anchor: "middle",
      badge: [F + DE_R * 0.45 + 26, DE_WY + (DE_FY - DE_WY) * 0.42],
    });
  labels.push({
    text: "Bunnlag: silt og leire",
    x: 940,
    y: 330,
    at: [Math.min(900, toe[0] + 90), DE_FY - 10],
    color: "#d6cdb8",
    anchor: "end",
    badge: [Math.min(900, toe[0] + 90), DE_FY - 34],
  });
  return (
    <IsbreFigur
      svgRef={ref}
      title="Et Gilbert-delta i tverrsnitt som bygges utover: topplag, forlag og bunnlag"
      heading={heading}
      caption={
        caption ??
        "Der elva møter stille vann, sorteres kornene: grus og grov sand blir liggende på deltaflaten (topplag), sand raser ned fronten i skrå lag (forlag), og silt og leire legger seg lengst ute (bunnlag). Slik bygges deltaet utover."
      }
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={DE_STEPS}
          step={step}
          onStep={pickStep(clock, motion)}
          label="Velg steg i deltaet"
        />
      }
      status={DE_STATUS[step - 1]}
      labels={labels}
      notes={["Tverrsnitt", "Skjematisk, høyden er overdrevet"]}
      viewBox="0 0 960 500"
    >
      {({ d }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="delta"
          data-step={step}
        >
          <rect width="960" height="500" fill={d.url.sky} rx="10" />
          <defs>
            <clipPath id={clip}>
              <path d={deposit} />
            </clipPath>
          </defs>
          <rect x="250" y={DE_WY} width="710" height={DE_FY - DE_WY} fill={d.url.water} />
          <path d={bedrock} fill={d.url.rock} />
          <path d={bedrock} fill={d.url.strata} />
          <path d={deposit} fill="#cdb46f" />
          <g clipPath={`url(#${clip})`}>
            <path d={topset} fill={d.url.outwash} />
            <path d={bottomset} fill={d.url.clay} />
            <g data-nocheck="">
              {foresets.map((f, i) => (
                <path key={i} d={f} stroke="#8d7643" strokeWidth="1.6" />
              ))}
            </g>
          </g>
          <path d={`M0 ${DE_WY - 8} L${F - 8} ${DE_WY - 8}`} stroke={P.water} strokeWidth="5" />
          <path
            d={`M${F} ${DE_WY} L960 ${DE_WY}`}
            stroke={C.rain}
            strokeWidth="2"
            strokeDasharray="8 5"
          />
          <g data-nocheck="">
            {fines.map((p, i) => (
              <circle key={`f${i}`} cx={p.x} cy={p.y} r="1.6" fill="#d8d0bf" opacity="0.85" />
            ))}
            {sand.map((p, i) => (
              <circle
                key={`s${i}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill="#e6cf8a"
                stroke="#6b5a33"
                strokeWidth="0.6"
              />
            ))}
            {gravel.map((p, i) => (
              <circle
                key={`g${i}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill="#9b917e"
                stroke="#3b3326"
                strokeWidth="0.8"
              />
            ))}
          </g>
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * 6. Landskapet: vidde, fjord og strandflate (terrengblokk)
 * ===================================================================== */

const LS_STEPS = ["1 Vidda", "2 Fjorden graves ut", "3 Strandflaten"];
const LS_STATUS = [
  "Vidda er en stor, rolig og nesten flat overflate, den eldste delen av landskapet. Før istidene rant elvene i V-formede daler.",
  "Under istidene fulgte breene dalene og gravde dem ut til dype U-daler. Der bunnen ligger under havnivå, er dalen en fjord.",
  "Langs kysten ligger strandflaten: en lav, flat brem av tusenvis av øyer, holmer og skjær (0–50 moh), formet av frostforvitring, brenninger og kystbreer. Nøyaktig hvordan den ble dannet, er omdiskutert.",
];
const LS_W = 780;
const LS_D = 300;
const LS_BASE = -130;
const LS_PROJ0 = obliqueProj(40, 430, 1, 0.42, 0.9, 0.36);
const LS_PROJ = (x: number, y: number, z: number) => p1(LS_PROJ0(x, y, z));
const lsFjordY = (x: number) => 160 + 30 * Math.sin(x / 110 + 0.6);
function lsHeight(x: number, y: number, pU: number, pS: number) {
  // vest (x = 0) er havet, øst er vidda
  const noise =
    Math.sin(x / 13 + Math.sin(y / 17) * 2) * Math.sin(y / 11 + x / 29) +
    0.6 * Math.sin(x / 7.3 + y / 9.1);
  const coastOld = 40 + 60 * smooth((x - 120) / 180) + 26 * noise;
  const coastNew = -14 + 22 * Math.max(0, noise - 0.15) + 8 * noise;
  const hills = lerp(coastOld, coastNew, pS);
  let base: number;
  if (x < 110) base = lerp(-100, -50, x / 110) + 8 * noise;
  else if (x < 300) base = lerp(lerp(-50, -40, (x - 110) / 190), hills, smooth((x - 110) / 40));
  else if (x < 410) base = lerp(hills, 240, smooth((x - 300) / 110));
  else base = 240 + 12 * Math.sin(x / 90) * Math.cos(y / 70) + 2.5 * noise;
  // dal/fjord fra x ≈ 200 til 740
  if (x > 180) {
    const dd = Math.abs(y - lsFjordY(x));
    const into = smooth((x - 180) / 120);
    const head = 1 - smooth((x - 680) / 90);
    // V-dal: elva graver ned i vidda
    const vFloor = lerp(10, 120, smooth((x - 200) / 560));
    const zV = vFloor + dd * 3.2;
    // U-dal/fjord: bred bunn, bratte sider, terskel ved munningen
    const sill = 1 - smooth((x - 230) / 70);
    const uFloor = lerp(lerp(-110, -40, sill), 90, smooth((x - 640) / 140));
    const zU = uFloor + (dd < 62 ? 0 : (dd - 62) ** 1.8 * 0.75);
    const cut = lerp(zV, zU, pU);
    const w = into * Math.max(head, 0.25);
    base = Math.min(base, lerp(base, cut, w));
  }
  return base;
}

export function LandskapBlokk({
  heading = "Gamle vidder, unge fjorder og strandflaten",
  caption,
  initialStep,
}: LandformFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const clock = useStepClock(3, running, 3600, 1800, initialStep);
  const t = useTicker(running);
  const { step } = clock;
  const q = Math.round(clock.phase * 10) / 10;
  const pU = step === 1 ? 0 : step === 2 ? smooth(q) : 1;
  const pS = step === 3 ? smooth(q) : 0;
  const polys = useMemo(() => {
    const rock = hexToRgb("#7b7d72");
    const heath = hexToRgb("#7f7f63");
    const green = hexToRgb("#5d6e4a");
    const sea = hexToRgb("#2c6e8e");
    const shallow = hexToRgb("#3f8aa6");
    const h = (x: number, y: number) => Math.max(0, lsHeight(x, y, pU, pS));
    return heightfield({
      nx: 104,
      ny: 40,
      W: LS_W,
      D: LS_D,
      h,
      proj: LS_PROJ,
      light: [-0.45, -0.5, 0.75],
      ambient: 0.5,
      colorAt: (x, y, z, slope) => {
        const raw = lsHeight(x, y, pU, pS);
        if (raw < 0) return raw > -30 ? shallow : sea;
        if (slope > 1.1) return rock;
        if (z > 170) return heath;
        return green;
      },
    });
  }, [pU, pS]);
  const xs = Array.from({ length: 105 }, (_, i) => (i / 104) * LS_W);
  const face = xs.map((x): [number, number] =>
    LS_PROJ(x, 0, Math.max(LS_BASE, lsHeight(x, 0, pU, pS))),
  );
  const faceRock = `M${pts(face)} L${pts([LS_PROJ(LS_W, 0, LS_BASE), LS_PROJ(0, 0, LS_BASE)])} Z`;
  const faceWater = `M${pts(xs.map((x) => LS_PROJ(x, 0, 0)))} L${pts([...xs].reverse().map((x) => LS_PROJ(x, 0, Math.min(0, lsHeight(x, 0, pU, pS)))))} Z`;
  const side = Array.from({ length: 41 }, (_, j): [number, number] =>
    LS_PROJ(LS_W, (j / 40) * LS_D, Math.max(0, lsHeight(LS_W, (j / 40) * LS_D, pU, pS))),
  );
  const sideFace = `M${pts(side)} L${pts([LS_PROJ(LS_W, LS_D, LS_BASE), LS_PROJ(LS_W, 0, LS_BASE)])} Z`;
  const waves = Array.from({ length: 3 }, (_, k) => {
    const x = 100 - 80 * frac(t * 0.25 + k / 3);
    return `M${pts([LS_PROJ(x, 12, 0), LS_PROJ(x - 6, LS_D * 0.5, 0), LS_PROJ(x, LS_D - 12, 0)])}`;
  });
  const fx = 480;
  const labels: Lab[] = [
    {
      text: "Vidda: gammel, nesten flat overflate",
      x: 940,
      y: 52,
      at: LS_PROJ(640, 250, 240),
      color: C.sand,
      anchor: "end",
      badge: LS_PROJ(640, 250, 270),
    },
    {
      text: "Havnivå",
      x: 20,
      y: 494,
      at: LS_PROJ(30, 0, 0),
      color: C.rain,
      badge: LS_PROJ(50, 0, -40),
    },
  ];
  if (step === 1)
    labels.push({
      text: "Elv i V-dal",
      x: 480,
      y: 52,
      at: LS_PROJ(fx, lsFjordY(fx), lsHeight(fx, lsFjordY(fx), 0, 0) + 2),
      color: C.rain,
      anchor: "middle",
      badge: LS_PROJ(fx, lsFjordY(fx) - 40, 200),
    });
  if (step >= 2)
    labels.push({
      text: "Fjord: U-dal under havnivå",
      x: 480,
      y: 52,
      at: LS_PROJ(fx, lsFjordY(fx) + 40, 0),
      color: C.cold,
      anchor: "middle",
      badge: LS_PROJ(fx, lsFjordY(fx) - 46, 200),
    });
  if (step === 3)
    labels.push({
      text: "Strandflate: øyer, holmer og skjær",
      x: 40,
      y: 52,
      at: LS_PROJ(200, 220, 10),
      color: C.fg,
      badge: LS_PROJ(200, 250, 40),
    });
  else
    labels.push({
      text: "Kystland",
      x: 40,
      y: 52,
      at: LS_PROJ(210, 230, 90),
      color: C.muted,
      badge: LS_PROJ(210, 250, 120),
    });
  return (
    <IsbreFigur
      svgRef={ref}
      title="Terrengblokk fra havet i vest til vidda i øst: vidda, en fjord gravd ut av isbreer og strandflaten langs kysten"
      heading={heading}
      caption={
        caption ??
        "Vidda er den gamle delen av landskapet. Fjordene og U-dalene ble gravd ut av breer under istidene, og strandflaten ligger som en lav brem av øyer og skjær langs kysten."
      }
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={LS_STEPS}
          step={step}
          onStep={pickStep(clock, motion)}
          label="Velg steg i landskapet"
        />
      }
      status={LS_STATUS[step - 1]}
      labels={labels}
      notes={["Skjematisk, høyden er sterkt overdrevet", "Vest til venstre, øst til høyre"]}
      viewBox="0 0 960 500"
    >
      {({ d }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="landskap"
          data-step={step}
        >
          <rect width="960" height="500" fill={d.url.sky} rx="10" />
          <Polys polys={polys} />
          {pU < 0.5 ? (
            <path
              d={smoothPath(
                Array.from({ length: 40 }, (_, i) => {
                  const x = 190 + i * 14;
                  const y = lsFjordY(x);
                  return LS_PROJ(x, y, Math.max(0, lsHeight(x, y, pU, pS)) + 1);
                }),
              )}
              stroke="#6fc3e6"
              strokeWidth="3"
              fill="none"
              opacity={1 - pU * 2}
            />
          ) : null}
          <path d={sideFace} fill="#4a4f45" />
          <path d={faceRock} fill={d.url.rock} />
          <path d={faceRock} fill={d.url.strata} />
          <path d={faceWater} fill={d.url.water} opacity="0.92" />
          <path
            d={`M${pts([LS_PROJ(0, 0, 0), LS_PROJ(LS_W * 0.4, 0, 0)])}`}
            stroke={C.rain}
            strokeWidth="1.6"
            strokeDasharray="6 5"
          />
          {step === 3 ? (
            <g data-nocheck="">
              {waves.map((w, i) => (
                <path
                  key={i}
                  d={w}
                  stroke="#e8f4fa"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </g>
          ) : null}
        </g>
      )}
    </IsbreFigur>
  );
}
