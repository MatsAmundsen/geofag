/**
 * Figurene i Geofag 1: Bergarter og det geologiske kretsløpet.
 *
 * Bygger på samme ramme som Isbreer, Landformer og Norges geologi (IsbreFigur, StegVelger og isbre-kit):
 * nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten (src/lib/posts/bergarter.md) og kildene der (NGU, USGS, Udir).
 * Figurene har ingen tall som ikke står i teksten. Alt er skjematisk og uten målestokk.
 * All geometri (korn, lag, stier) er konstanter på modulnivå, så serverrenderingen gjør nesten ingenting.
 */
import { useId, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key, type Lab } from "./isbre-figur";
import {
  P,
  clamp,
  figureFont,
  lerp,
  pickStep,
  smooth,
  useBoxWidth,
  useInView,
  useNarrow,
  useStepClock,
} from "./isbre-kit";

export type BergartFigurProps = {
  heading?: string;
  caption?: ReactNode;
  initialStep?: number;
};

/* ---------- små verktøy ---------- */

const n1 = (v: number) => Math.round(v * 10) / 10;
const fx = (v: number) => n1(v).toString();

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

/** Fast pseudotilfeldig rekke, så server og nettleser tegner de samme kornene. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function curve(f: (x: number) => number, x0: number, x1: number, dx = 8) {
  const out: string[] = [];
  for (let x = x0; x < x1; x += dx) out.push(`${fx(x)} ${fx(f(x))}`);
  out.push(`${fx(x1)} ${fx(f(x1))}`);
  return `M${out.join(" L")}`;
}
function band(top: (x: number) => number, bot: (x: number) => number, x0: number, x1: number, dx = 8) {
  const xs: number[] = [];
  for (let x = x0; x < x1; x += dx) xs.push(x);
  xs.push(x1);
  const a = xs.map((x) => `${fx(x)} ${fx(top(x))}`);
  const b = [...xs].reverse().map((x) => `${fx(x)} ${fx(bot(x))}`);
  return `M${a.join(" L")} L${b.join(" L")} Z`;
}

/** Krystaller (uregelmessige mangekanter) i en sirkel, sortert fra midten og ut så de kan «vokse fram». */
type Krystall = { d: string; fill: string; r: number };
function krystaller(seed: number, n: number, rMin: number, rMax: number, colors: string[], R: number, rhomb = false) {
  const rand = rng(seed);
  const out: Krystall[] = [];
  for (let i = 0; i < n; i++) {
    const rr = Math.sqrt(rand()) * R;
    const a = rand() * Math.PI * 2;
    const cx = Math.cos(a) * rr;
    const cy = Math.sin(a) * rr;
    const r = lerp(rMin, rMax, rand());
    const rot = rand() * Math.PI;
    const k = rhomb ? 4 : 5 + Math.floor(rand() * 3);
    const ptsList: string[] = [];
    for (let j = 0; j < k; j++) {
      const t = rot + (j / k) * Math.PI * 2;
      const s = rhomb ? (j % 2 ? 0.55 : 1) : 0.75 + rand() * 0.35;
      ptsList.push(`${fx(cx + Math.cos(t) * r * s)} ${fx(cy + Math.sin(t) * r * s)}`);
    }
    out.push({ d: `M${ptsList.join(" L")} Z`, fill: colors[Math.floor(rand() * colors.length)], r: rr });
  }
  return out.sort((p, q) => p.r - q.r);
}

/** Linse med krystaller. `grow` 0–1 viser hvor mange krystaller som har vokst fram. */
function Linse({
  x,
  y,
  R,
  base,
  korn,
  grow,
  uid,
  ring,
}: {
  x: number;
  y: number;
  R: number;
  base: string;
  korn: Krystall[];
  grow: number;
  uid: string;
  ring: string;
}) {
  const shown = Math.round(korn.length * clamp(grow));
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id={uid}>
          <circle r={R} />
        </clipPath>
      </defs>
      <circle r={R + 5} fill="#0b1318" />
      <g clipPath={`url(#${uid})`} data-nocheck="">
        <circle r={R} fill={base} />
        {korn.slice(0, shown).map((k, i) => (
          <path key={i} d={k.d} fill={k.fill} stroke="#1a1414" strokeOpacity="0.35" strokeWidth="0.6" />
        ))}
        <ellipse cx={-R * 0.35} cy={-R * 0.45} rx={R * 0.45} ry={R * 0.22} fill="#fff" opacity="0.08" />
      </g>
      <circle r={R + 2} fill="none" stroke={ring} strokeWidth="3" />
    </g>
  );
}

function keyframe<T extends Record<string, number>>(frames: T[], step: number, phase: number): T {
  const to = frames[step - 1];
  const from = step > 1 ? frames[step - 2] : frames[frames.length - 1];
  const t = smooth(phase);
  const out = {} as Record<string, number>;
  for (const k of Object.keys(to)) out[k] = lerp(from[k], to[k], t);
  return out as T;
}

/* ---------- farger ---------- */

const K = {
  magma: "#e0743d",
  magmaDeep: "#9c3a1f",
  dyp: "#7d7489",
  dag: "#4b3d3e",
  sed: "#c8b386",
  sedRock1: "#b49b70",
  sedRock2: "#8f8778",
  sedRock3: "#c9bc9a",
  meta: "#6a5a70",
  metaBand: "#9b8aa0",
  crust: "#5b6458",
};

/* =====================================================================
 * 1. Bergartssyklusen i et snitt
 * ===================================================================== */

const BS_STEPS = ["Størkning", "Heving og forvitring", "Erosjon gir sediment", "Forsteining", "Omdanning", "Smelting"];
const BS_STATUS = [
  "Størkning: Magma stiger opp. Det som størkner på dypet, blir dypbergart. Det som når overflaten som lava, blir dagbergart.",
  "Heving og forvitring: Fjellet heves, og berget brytes ned på stedet, mekanisk eller kjemisk. Fragmentene blir liggende.",
  "Erosjon gir sediment: Vann, is og tyngdekraft flytter materialet. Løst sediment (grus, sand og leire) samles i havet. Det er ikke bergart ennå.",
  "Forsteining: Nye lag legger seg oppå. Sedimentet presses sammen og kittes, og blir sedimentær bergart.",
  "Omdanning: Dypt i jordskorpa omdanner høyt trykk og høy temperatur berget i fast tilstand. Det blir metamorf bergart med striper og folder.",
  "Smelting: Blir det varmt nok, smelter berget. Ny magma kan starte syklusen igjen, men ingen bergart må innom alle stasjonene.",
];
type BsFrame = { uplift: number; sed: number; lith: number; meta: number; melt: number; lava: number };
const BS_FRAMES: BsFrame[] = [
  { uplift: 0, sed: 0.15, lith: 0.3, meta: 0.4, melt: 0, lava: 1 },
  { uplift: 1, sed: 0.15, lith: 0.3, meta: 0.4, melt: 0, lava: 1 },
  { uplift: 1, sed: 1, lith: 0.3, meta: 0.4, melt: 0, lava: 1 },
  { uplift: 1, sed: 0.45, lith: 1, meta: 0.4, melt: 0, lava: 1 },
  { uplift: 1, sed: 0.45, lith: 1, meta: 1, melt: 0, lava: 1 },
  { uplift: 1, sed: 0.45, lith: 1, meta: 1, melt: 1, lava: 1 },
];

const BS_SEA = 268;
/** Landoverflaten. Fjellet til venstre heves i steg 2. */
const bsMountain = (x: number) => 150 * Math.exp(-(((x - 210) / 150) ** 2)) + 22 * Math.exp(-(((x - 120) / 40) ** 2));
const bsBase = (x: number) => {
  if (x < 470) return 250 - 0.03 * x;
  if (x < 560) return lerp(236, 300, (x - 470) / 90);
  if (x < 770) return 300 + 6 * Math.sin(x / 30);
  if (x < 830) return lerp(300, 250, (x - 770) / 60);
  // vulkanen
  return 250 - 120 * Math.exp(-(((x - 890) / 46) ** 2));
};
const BS_RIVER = [
  [250, 150],
  [330, 196],
  [400, 228],
  [470, 236],
  [530, 262],
  [600, 290],
  [690, 296],
] as const;
function along(pts: readonly (readonly [number, number])[], t: number): [number, number] {
  const seg = clamp(t) * (pts.length - 1);
  const i = Math.min(pts.length - 2, Math.floor(seg));
  const f = seg - i;
  return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)];
}
const BS_GRAINS = (() => {
  const r = rng(7);
  return Array.from({ length: 16 }, (_, i) => ({ o: i / 16, s: 2 + r() * 3.5, dy: (r() - 0.5) * 6 }));
})();
const BS_DYP = krystaller(11, 70, 6, 13, ["#9c8fa6", "#6c6278", "#c2b6c4", "#57506a"], 46);
const BS_DAG = krystaller(12, 260, 1.4, 3, ["#5c4a4a", "#3c3132", "#776262"], 46);

export function BergartssyklusSnittFigur({
  heading = "Bergartssyklusen i et snitt gjennom jordskorpa",
  caption,
  initialStep,
}: BergartFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(6, motion.playing && visible, 3600, 1600, initialStep);
  const { step, phase } = clock;
  const s = keyframe(BS_FRAMES, step, phase);
  const uid = useId().replace(/:/g, "");
  const surf = (x: number) => bsBase(x) - (x < 470 ? bsMountain(x) * lerp(0.55, 1, s.uplift) : 0);
  const sedTop = (x: number) => bsBase(x) - (x > 560 && x < 770 ? 14 * s.sed : 0);
  const ground = band(surf, () => 560, 0, 960, 6);
  const active = (i: number) => step === i;
  const labels: Lab[] = [
    { text: "Magma", x: 930, y: 520, at: [850, 486], color: "#ffc59a", anchor: "end", weight: 700, badge: [800, 506] },
    { text: "Dypbergart (magmatisk)", x: 930, y: 360, at: [760, 400], color: "#d4c8e0", anchor: "end", badge: [742, 380] },
    { text: "Dagbergart (lava)", x: 930, y: 110, at: [866, 168], color: "#e6c9c0", anchor: "end", badge: [906, 140] },
    { text: "Havet", x: 664, y: BS_SEA + 22, color: "#bfe0ef", anchor: "middle", size: 14, badge: [640, BS_SEA + 12] },
  ];
  if (step >= 2)
    labels.push({ text: "Forvitring på stedet", x: 40, y: 60, at: [200, surf(200) + 8], color: C.warm, badge: [150, surf(150) - 12] });
  if (step >= 3)
    labels.push({ text: "Sediment (løst)", x: 600, y: 210, at: [660, sedTop(660) + 4], color: "#f1e2bf", anchor: "middle", badge: [700, sedTop(700) - 8] });
  if (step >= 4)
    labels.push({ text: "Sedimentær bergart", x: 600, y: 410, at: [640, 336], color: "#efdcb3", anchor: "middle", badge: [600, 340] });
  if (step >= 5)
    labels.push({ text: "Metamorf bergart (striper og folder)", x: 40, y: 500, at: [190, 420], color: "#d9c8e2", badge: [120, 420] });
  if (step === 6)
    labels.push({ text: "Berget smelter", x: 470, y: 540, at: [330, 520], color: "#ffc59a", anchor: "middle", badge: [300, 530] });
  const keys: Key[] = [
    { text: "Magma", color: K.magma, kind: "fill" },
    { text: "Magmatisk bergart", color: K.dyp, kind: "fill" },
    { text: "Sediment", color: K.sed, kind: "fill" },
    { text: "Sedimentær bergart", color: K.sedRock1, kind: "fill" },
    { text: "Metamorf bergart", color: K.meta, kind: "fill" },
    { text: "Prosess i dette steget", color: C.warm, kind: "line" },
  ];
  const p = smooth(phase);
  const tick = motion.playing ? phase : 1;
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt fra fjell til hav og vulkan: magma størkner, fjellet heves og forvitrer, sediment samles i havet og forsteines, berget omdannes på dypet og kan smelte til ny magma"
        heading={heading}
        caption={
          caption ??
          "Syklusen er en modell med flere veier. Steg for steg: størkning, heving og forvitring, erosjon til løst sediment, forsteining, omdanning i fast tilstand og smelting. Ingen bergart må innom alle stasjonene. Forenklet: snittet er skjematisk uten målestokk, og prosesser som tar millioner av år, vises i korte steg."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={BS_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg prosess" />
          </StegRamme>
        }
        status={BS_STATUS[step - 1]}
        labels={labels}
        keys={keys}
        notes={["Snitt fra fjell (vest) til hav og vulkan", "Skjematisk, uten målestokk"]}
        viewBox="0 0 960 560"
      >
        {({ d, m, scale }) => (
          <g className={motion.motionClass} data-figur="bergartssyklus" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id={`${uid}-g`}>
                <path d={ground} />
              </clipPath>
              <pattern id={`${uid}-band`} width="60" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
                <path d="M0 4 C15 0 30 9 60 4" stroke={K.metaBand} strokeWidth="3" fill="none" />
                <path d="M0 10 C20 14 40 6 60 10" stroke="#4a3e50" strokeWidth="2" fill="none" />
              </pattern>
              <radialGradient id={`${uid}-mg`}>
                <stop offset="0" stopColor="#ffd08a" />
                <stop offset="0.55" stopColor={K.magma} />
                <stop offset="1" stopColor={K.magmaDeep} />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="960" height="560" fill={d.url.sky} />
            {/* hav */}
            <path d={`M520 ${BS_SEA} L830 ${BS_SEA} L830 320 L520 320 Z`} fill={d.url.water} opacity="0.9" />
            <g clipPath={`url(#${uid}-g)`} data-nocheck="">
              <rect x="0" y="0" width="960" height="560" fill={K.crust} />
              <rect x="0" y="0" width="960" height="560" fill={d.url.rock} opacity="0.55" />
              {/* metamorf rot under fjellet */}
              <path
                d={band((x) => 330 + 30 * Math.sin(x / 70), () => 520, 0, 470, 10)}
                fill={K.meta}
                opacity={lerp(0.35, 1, s.meta)}
              />
              <path
                d={band((x) => 330 + 30 * Math.sin(x / 70), () => 520, 0, 470, 10)}
                fill={`url(#${uid}-band)`}
                opacity={s.meta}
              />
              {/* sedimentære lag i bassenget */}
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={band(
                    (x) => 302 + i * 18 + 3 * Math.sin(x / 40 + i),
                    (x) => 320 + i * 18 + 3 * Math.sin(x / 40 + i + 1),
                    470,
                    830,
                    10,
                  )}
                  fill={[K.sedRock3, K.sedRock1, K.sedRock2][i]}
                  opacity={lerp(0.25, 1, s.lith)}
                />
              ))}
              {/* løst sediment øverst */}
              <path d={band(sedTop, (x) => bsBase(x) + 2, 556, 774, 6)} fill={d.url.outwash} opacity={clamp(s.sed * 1.5)} />
              {/* dypbergart (størknet pluton) */}
              <ellipse cx="730" cy="410" rx="62" ry="34" fill={K.dyp} />
              <ellipse cx="730" cy="410" rx="62" ry="34" fill="none" stroke="#b9aec6" strokeWidth="1.5" />
              {/* tilførselskanal og magmakammer */}
              <path d="M872 470 C868 400 884 320 888 140" stroke={K.magma} strokeWidth={active(1) ? 9 : 6} fill="none" />
              <ellipse cx="860" cy="492" rx="80" ry="40" fill={`url(#${uid}-mg)`} />
              {/* lava (dagbergart) på vulkansiden */}
              <path d={band((x) => surf(x) - 1, (x) => surf(x) + 10, 846, 940, 4)} fill={K.dag} opacity={s.lava} />
              {/* smelting nederst */}
              <rect x="0" y="500" width="600" height="60" fill={K.magma} opacity={0.18 + 0.6 * s.melt} />
              {s.melt > 0.05 ? (
                <path
                  d={band((x) => 520 - 26 * s.melt * Math.exp(-(((x - 330) / 120) ** 2)), () => 560, 120, 560, 8)}
                  fill={`url(#${uid}-mg)`}
                  opacity={s.melt}
                />
              ) : null}
            </g>
            {/* overflatekontur */}
            <path d={curve(surf, 0, 960, 6)} stroke="#1c241c" strokeWidth="2" fill="none" />
            {/* elva */}
            {step >= 2 ? (
              <path
                d={`M${BS_RIVER.slice(0, 5).map(([x]) => `${x} ${fx(surf(x) - 2)}`).join(" L")}`}
                stroke="#5fa6c8"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            ) : null}
            {/* prosesspiler */}
            {active(1) ? (
              <g>
                <path d="M872 450 L884 200" stroke={C.warm} strokeWidth="3" fill="none" markerEnd={`url(#${m.warm})`} strokeDasharray={`${fx(250 * p)} 400`} />
                <path d="M808 470 L770 432" stroke={C.warm} strokeWidth="3" fill="none" markerEnd={`url(#${m.warm})`} />
              </g>
            ) : null}
            {active(2) ? (
              <g>
                <path d="M210 470 L210 380" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} />
                <path d="M120 470 L120 400" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} />
                {[160, 205, 250, 290].map((x, i) => {
                  const y0 = surf(x);
                  return (
                    <g key={x} transform={`translate(${x} ${fx(y0 + 4)})`}>
                      <path d={`M0 0 l${i % 2 ? 4 : -4} 14 l${i % 2 ? -3 : 3} 10`} stroke="#1a1a1a" strokeWidth="2" fill="none" />
                      <path d={`M-4 ${fx(-6 - 10 * tick)} l6 -4 l5 5 l-6 4 z`} fill="#a9a597" opacity={0.9} />
                    </g>
                  );
                })}
              </g>
            ) : null}
            {active(3)
              ? BS_GRAINS.map((g, i) => {
                  const [x, y] = along(BS_RIVER, (g.o + tick) % 1);
                  const yy = x < 470 ? surf(x) - 4 : y - 4 + g.dy * 0.3;
                  return <circle key={i} cx={fx(x)} cy={fx(yy)} r={fx(g.s)} fill="#d8c79c" stroke="#5b4c30" strokeWidth="0.8" />;
                })
              : null}
            {active(4) ? (
              <g>
                {[600, 660, 720].map((x) => (
                  <path key={x} d={`M${x} 250 L${x} ${fx(276 + 10 * p)}`} stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} />
                ))}
              </g>
            ) : null}
            {active(5) ? (
              <g>
                <path d="M300 300 L300 360" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} />
                <path d="M520 420 L440 420" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} />
                <path d="M300 520 L300 470" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} />
              </g>
            ) : null}
            {active(6) ? (
              <path
                d="M430 520 C560 540 680 530 784 500"
                stroke={C.warm}
                strokeWidth="3"
                fill="none"
                markerEnd={`url(#${m.warm})`}
                strokeDasharray={`${fx(380 * p)} 600`}
              />
            ) : null}
            {/* krystall-linser: dypbergart grovkornet, dagbergart finkornet */}
            {!small ? (
              <g>
                {step === 1 ? (
                  <g>
                    <Linse x={610} y={120} R={46} base="#4a4256" korn={BS_DYP} grow={motion.playing ? p : 1} uid={`${uid}-l1`} ring="#b9aec6" />
                    <Linse x={740} y={120} R={46} base="#3a2e2f" korn={BS_DAG} grow={motion.playing ? p : 1} uid={`${uid}-l2`} ring="#e6c9c0" />
                    <text x={610} y={188} textAnchor="middle" fill="#d4c8e0" fontSize={figureFont(14, scale)} fontWeight="600" stroke={P.halo} strokeWidth="3" paintOrder="stroke">Grovkornet</text>
                    <text x={740} y={188} textAnchor="middle" fill="#e6c9c0" fontSize={figureFont(14, scale)} fontWeight="600" stroke={P.halo} strokeWidth="3" paintOrder="stroke">Finkornet</text>
                  </g>
                ) : null}
              </g>
            ) : null}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 2. Følg en norsk bergart gjennom stasjonene
 * ===================================================================== */

type StId = "magma" | "magm" | "sedi" | "sedb" | "meta";
const ST_NAVN: Record<StId, string> = {
  magma: "Magma",
  magm: "Magmatisk bergart",
  sedi: "Sediment",
  sedb: "Sedimentær bergart",
  meta: "Metamorf bergart",
};
const ST_FARGE: Record<StId, string> = {
  magma: K.magma,
  magm: "#a99bb8",
  sedi: "#d9c38f",
  sedb: "#c6a774",
  meta: "#a68fb0",
};
type Kant = { id: string; from: StId; to: StId; navn: string; bend: number };
const KANTER: Kant[] = [
  { id: "storkning", from: "magma", to: "magm", navn: "Størkning", bend: 0.18 },
  { id: "magm-sedi", from: "magm", to: "sedi", navn: "Forvitring og erosjon", bend: 0.14 },
  { id: "sedb-sedi", from: "sedb", to: "sedi", navn: "Forvitring og erosjon", bend: 0.22 },
  { id: "meta-sedi", from: "meta", to: "sedi", navn: "Forvitring og erosjon", bend: 0 },
  { id: "forsteining", from: "sedi", to: "sedb", navn: "Forsteining", bend: 0.22 },
  { id: "sedb-meta", from: "sedb", to: "meta", navn: "Omdanning", bend: -0.16 },
  { id: "magm-meta", from: "magm", to: "meta", navn: "Omdanning", bend: 0.1 },
  { id: "meta-magma", from: "meta", to: "magma", navn: "Smelting", bend: -0.18 },
  { id: "magm-magma", from: "magm", to: "magma", navn: "Smelting", bend: 0.18 },
];

type Rute = {
  navn: string;
  start: StId;
  kanter: string[];
  /** Mulig vei videre som teksten nevner (stiplet). */
  mulig?: string[];
  tekst: string;
};
const RUTER: Rute[] = [
  {
    navn: "Larvikitt",
    start: "magma",
    kanter: ["storkning"],
    tekst:
      "Larvikitt: magma størknet på dypet til en dypbergart for cirka 290 millioner år siden, og har vært magmatisk bergart siden (NGU, u.å.-i). Veier den ikke har tatt: omdanning og smelting.",
  },
  {
    navn: "Rombeporfyr",
    start: "magma",
    kanter: ["storkning"],
    tekst:
      "Rombeporfyr: samme smeltefamilie som larvikitt, men størknet på overflaten som dagbergart. Rombene viser at smelten ikke var ferdig krystallisert da den nådde overflaten (NGU, u.å.-l).",
  },
  {
    navn: "Grønnstein",
    start: "magma",
    kanter: ["storkning", "magm-meta"],
    tekst:
      "Grønnstein: gabbro eller basalt (magmatisk) som er omdannet, med kloritt, epidot og amfibol. Den magmatiske bergarten har flyttet seg til metamorf stasjon (NGU, u.å.-e).",
  },
  {
    navn: "Sandstein",
    start: "sedi",
    kanter: ["forsteining"],
    tekst:
      "Sandstein: sand av kvarts og feltspat (sediment) er kittet av kvarts, kalkspat eller jernforbindelser og har blitt sedimentær bergart (NGU, u.å.-m).",
  },
  {
    navn: "Kalkstein",
    start: "sedi",
    kanter: ["forsteining"],
    mulig: ["sedb-meta"],
    tekst:
      "Kalkstein: karbonat fra organismer er forsteinet. De fleste kalksteiner i Norge er omdannet til marmor (stiplet vei), men i Oslo-området kan kalksteinen være bare svakt omdannet (NGU, u.å.-f).",
  },
  {
    navn: "Fyllitt",
    start: "sedi",
    kanter: ["forsteining", "sedb-meta"],
    tekst:
      "Fyllitt: protolitten er leire. Lavgrads regional omdanning gir tydelig skifrighet og silkeglans. Stasjonen er lav metamorfose (NGU, u.å.-a).",
  },
  {
    navn: "Gneis",
    start: "meta",
    kanter: ["magm-meta", "sedb-meta"],
    tekst:
      "Gneis: har opprinnelig vært magmatisk eller sedimentær bergart (to mulige veier). Gneisen i grunnfjellet i Sør-Norge ble dannet for mer enn 900 millioner år siden og er fortsatt metamorf (NGU, u.å.-d).",
  },
];

type Pt = [number, number];
const ST_POS_BRED: Record<StId, Pt> = {
  sedi: [480, 78],
  magm: [170, 260],
  sedb: [790, 260],
  meta: [640, 450],
  magma: [320, 450],
};
const ST_POS_SMAL: Record<StId, Pt> = {
  sedi: [260, 70],
  magm: [118, 300],
  sedb: [402, 300],
  meta: [370, 560],
  magma: [150, 560],
};

function kantGeo(k: Kant, pos: Record<StId, Pt>, w: number, h: number) {
  const [x0, y0] = pos[k.from];
  const [x1, y1] = pos[k.to];
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // kant av boksen langs retningen
  const cut = (ux2: number, uy2: number) => Math.min(Math.abs(w / 2 / (ux2 || 1e-6)), Math.abs(h / 2 / (uy2 || 1e-6))) + 8;
  const c0 = cut(ux, uy);
  const ax = x0 + ux * c0;
  const ay = y0 + uy * c0;
  const bx = x1 - ux * (c0 + 4);
  const by = y1 - uy * (c0 + 4);
  const mx = (ax + bx) / 2 - uy * len * k.bend;
  const my = (ay + by) / 2 + ux * len * k.bend;
  const d = `M${fx(ax)} ${fx(ay)} Q${fx(mx)} ${fx(my)} ${fx(bx)} ${fx(by)}`;
  const at = (t: number): Pt => [
    (1 - t) ** 2 * ax + 2 * (1 - t) * t * mx + t * t * bx,
    (1 - t) ** 2 * ay + 2 * (1 - t) * t * my + t * t * by,
  ];
  return { d, at, mid: at(0.5) };
}

export function FolgBergartFigur({
  heading = "Følg en norsk bergart gjennom syklusen",
  caption,
}: Omit<BergartFigurProps, "initialStep">) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const [valg, setValg] = useState(0);
  const clock = useStepClock(2, motion.playing && visible, 2600, 400);
  const rute = valg > 0 ? RUTER[valg - 1] : null;
  const pos = small ? ST_POS_SMAL : ST_POS_BRED;
  const bw = small ? 224 : 210;
  const bh = small ? 70 : 64;
  const vb = small ? "0 0 520 640" : "0 0 960 520";
  const aktiv = new Set(rute?.kanter ?? []);
  const mulig = new Set(rute?.mulig ?? []);
  const besokt = new Set<StId>();
  if (rute) {
    besokt.add(rute.start);
    for (const k of KANTER) if (aktiv.has(k.id)) {
      besokt.add(k.from);
      besokt.add(k.to);
    }
  }
  const t = motion.playing ? clock.phase : 1;
  const slutt: StId = rute
    ? (KANTER.filter((k) => aktiv.has(k.id)).pop()?.to ?? rute.start)
    : "magma";
  const velg = (i: number) => {
    setValg(i);
  };
  const knapper = ["Alle veier", ...RUTER.map((r) => r.navn)];
  const status = rute
    ? rute.tekst
    : "Alle veier: Pilene viser prosessene mellom stasjonene. Velg en bergart for å se hvilken vei den har tatt, og hvilke veier den ikke har tatt.";
  const keys: Key[] = [
    { text: "Veien bergarten har tatt", color: C.warm, kind: "line", off: !rute },
    { text: "Mulig vei videre", color: C.warm, kind: "dash", off: !rute?.mulig },
    { text: "Vei som ikke er tatt", color: "#566570", kind: "line", off: !rute },
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Bergartssyklusen med fem stasjoner: magma, magmatisk bergart, sediment, sedimentær bergart og metamorf bergart, og prosessene mellom dem. Velg en norsk bergart for å se veien den har tatt"
        heading={heading}
        caption={
          caption ??
          "Å tolke inn i syklusen er å peke på stasjonen og på hvilken vei som er tatt, og hvilken som ikke er det. Sediment er en egen stasjon: løst materiale som ennå ikke er bergart. Forenklet: pilene viser hovedveiene, ikke alle mulige overganger."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={knapper} step={valg + 1} onStep={(n) => velg(n - 1)} label="Velg bergart" />
          </StegRamme>
        }
        status={status}
        keys={keys}
        viewBox={vb}
        forceNarrow={small}
      >
        {({ m, scale }) => {
          const f = (sz: number) => figureFont(sz, scale);
          return (
            <g className={motion.motionClass} data-figur="folg-bergart" data-step={valg} data-playing={motion.playing ? "yes" : "no"}>
              <defs>
                <filter id="bf-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
                </filter>
              </defs>
              {KANTER.map((k) => {
                const g = kantGeo(k, pos, bw, bh);
                const on = aktiv.has(k.id);
                const maybe = mulig.has(k.id);
                const dimmed = rute && !on && !maybe;
                return (
                  <g key={k.id}>
                    <path
                      d={g.d}
                      fill="none"
                      stroke={on || maybe ? C.warm : dimmed ? "#3a4852" : "#7d93a3"}
                      strokeWidth={on ? 4.5 : 2.6}
                      strokeDasharray={maybe ? "8 7" : undefined}
                      markerEnd={`url(#${on || maybe ? m.warm : m.fg})`}
                      opacity={dimmed ? 0.7 : 1}
                    />
                    {on ? (
                      <circle cx={fx(g.at(t)[0])} cy={fx(g.at(t)[1])} r="7" fill="#ffe2c2" stroke={C.warm} strokeWidth="2" />
                    ) : null}
                  </g>
                );
              })}
              {!small
                ? KANTER.map((k) => {
                    const g = kantGeo(k, pos, bw, bh);
                    const on = aktiv.has(k.id) || mulig.has(k.id);
                    if (rute && !on) return null;
                    return (
                      <text
                        key={`t-${k.id}`}
                        x={fx(g.mid[0])}
                        y={fx(g.mid[1] + 5)}
                        textAnchor="middle"
                        fontSize={f(14)}
                        fontWeight={on ? 700 : 500}
                        fill={on ? "#ffd9b0" : "#c9d6df"}
                        stroke={P.halo}
                        strokeWidth="5"
                        paintOrder="stroke"
                        data-label=""
                      >
                        {k.navn}
                      </text>
                    );
                  })
                : null}
              {(Object.keys(ST_NAVN) as StId[]).map((id) => {
                const [x, y] = pos[id];
                const on = besokt.has(id);
                const dim = rute && !on;
                return (
                  <g key={id} opacity={dim ? 0.5 : 1} filter="url(#bf-soft)">
                    <rect
                      x={x - bw / 2}
                      y={y - bh / 2}
                      width={bw}
                      height={bh}
                      rx="14"
                      fill="#16222a"
                      stroke={ST_FARGE[id]}
                      strokeWidth={on ? 4 : 2}
                    />
                    <rect x={x - bw / 2 + 10} y={y - bh / 2 + 10} width="14" height={bh - 20} rx="4" fill={ST_FARGE[id]} />
                    <text x={x + 8} y={y + 6} textAnchor="middle" fontSize={f(small ? 19 : 18)} fontWeight="700" fill={C.fg} data-label="">
                      {ST_NAVN[id]}
                    </text>
                  </g>
                );
              })}
              {rute ? (
                <text
                  x={fx(pos[slutt][0])}
                  y={fx(pos[slutt][1] + bh / 2 + 24)}
                  textAnchor="middle"
                  fontSize={f(15)}
                  fontWeight="700"
                  fill="#ffd9b0"
                  stroke={P.halo}
                  strokeWidth="4"
                  paintOrder="stroke"
                  data-label=""
                >
                  {`Her er ${rute.navn.toLowerCase()}`}
                </text>
              ) : null}
            </g>
          );
        }}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 3. Avkjøling og kornstørrelse
 * ===================================================================== */

const AK_STEPS = ["Dagbergart", "Dypbergart", "Rombeporfyr", "Obsidian"];
const AK_STATUS = [
  "Dagbergart: Lava kjøles raskt ved overflaten. Krystallene rekker ikke å vokse, og bergarten blir finkornet. Eksempel: basalt.",
  "Dypbergart: Magma kjøles langsomt på dypet. Krystallene vokser, og bergarten blir grovkornet. Eksempler: gabbro og larvikitt.",
  "Rombeporfyr: Store rombeformede feltspatkrystaller ligger i en finkornet grunnmasse. Rombene viser at smelten ikke var ferdig krystallisert da magmaen nådde overflaten.",
  "Obsidian: Vulkansk glass. Her ble det ingen krystaller.",
];
const AK_FIN = krystaller(21, 420, 1.6, 3.4, ["#4a3b3c", "#5f4d4c", "#2f2627", "#776463"], 92);
const AK_GROV = krystaller(22, 70, 13, 24, ["#5d6f86", "#8193a8", "#3e4a5c", "#b8c4d1", "#2a3240"], 92);
const AK_ROMBE = [
  ...krystaller(23, 360, 1.6, 3.2, ["#6a3f3a", "#7e4d46", "#512e2b"], 92),
  ...krystaller(24, 9, 14, 20, ["#e8d6c2", "#d9c2a8"], 80, true),
];
const AK_KORN = [AK_FIN, AK_GROV, AK_ROMBE, [] as Krystall[]];
const AK_BASE = ["#3a2e2f", "#33405a", "#5a3532", "#121417"];
const AK_RING = ["#e6c9c0", "#b9d3ee", "#e4b7a6", "#9fb0bb"];
/** Hvor i snittet linsen hører hjemme. */
const AK_AT: Pt[] = [
  [700, 160],
  [420, 420],
  [600, 170],
  [760, 150],
];
const akSurf = (x: number) => 200 - 110 * Math.exp(-(((x - 690) / 70) ** 2));

export function AvkjolingKornFigur({
  heading = "Avkjøling styrer kornstørrelsen",
  caption,
  initialStep,
}: BergartFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3200, 1600, initialStep);
  const { step, phase } = clock;
  const i = step - 1;
  const uid = useId().replace(/:/g, "");
  const grow = motion.playing ? smooth(phase) : 1;
  const lens: Pt = small ? [480, 100] : [150, 150];
  const R = small ? 86 : 100;
  const labels: Lab[] = [
    { text: "Magmakammer på dypet", x: 920, y: 500, at: [430, 470], color: "#ffc59a", anchor: "end", badge: [560, 470] },
    { text: "Overflaten", x: 920, y: 230, at: [880, 201], color: C.fg, anchor: "end", size: 14, badge: [900, 214] },
  ];
  if (step === 1 || step === 3)
    labels.push({ text: step === 1 ? "Lava kjøles raskt" : "Lava med ferdige rombekrystaller", x: 920, y: 70, at: [AK_AT[i][0] + 20, AK_AT[i][1] - 10], color: "#e6c9c0", anchor: "end", badge: [AK_AT[i][0] + 40, AK_AT[i][1] - 40] });
  if (step === 2)
    labels.push({ text: "Kjøles langsomt", x: 600, y: 360, at: [470, 410], color: "#b9d3ee", badge: [520, 390] });
  if (step === 4)
    labels.push({ text: "Glass, ingen krystaller", x: 920, y: 70, at: [AK_AT[i][0] + 10, AK_AT[i][1] - 6], color: "#c6d2da", anchor: "end", badge: [AK_AT[i][0] + 40, AK_AT[i][1] - 40] });
  const lensText = ["Finkornet", "Grovkornet", "Store krystaller i finkornet grunnmasse", "Vulkansk glass"][i];
  const keys: Key[] = [
    { text: "Magma og lava", color: K.magma, kind: "fill" },
    { text: "Dypbergart", color: "#4f6378", kind: "fill" },
    { text: "Dagbergart", color: K.dag, kind: "fill" },
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt gjennom en vulkan og et magmakammer, med forstørrelseslinse: rask avkjøling gir finkornet dagbergart, langsom avkjøling gir grovkornet dypbergart, rombeporfyr har store krystaller i finkornet grunnmasse, og obsidian er glass"
        heading={heading}
        caption={
          caption ??
          "Samme smelte kan gi ulike bergarter. Langsom avkjøling på dypet gir store krystaller, rask avkjøling ved overflaten gir svært små. Gabbro og basalt har samme sammensetning, larvikitt og rombeporfyr er tvillingbrødre. Forenklet: snitt og linse er skjematiske og uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={AK_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg bergart" />
          </StegRamme>
        }
        status={AK_STATUS[i]}
        labels={labels}
        keys={keys}
        notes={["Linsen viser kornene forstørret", "Skjematisk, uten målestokk"]}
        viewBox="0 0 960 540"
      >
        {({ d, scale }) => (
          <g className={motion.motionClass} data-figur="avkjoling" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <radialGradient id={`${uid}-mg`}>
                <stop offset="0" stopColor="#ffd08a" />
                <stop offset="0.6" stopColor={K.magma} />
                <stop offset="1" stopColor={K.magmaDeep} />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="960" height="540" fill={d.url.sky} />
            <path d={band(akSurf, () => 540, 0, 960, 6)} fill={K.crust} />
            <path d={band(akSurf, () => 540, 0, 960, 6)} fill={d.url.strata} opacity="0.7" data-nocheck="" />
            <path d={curve(akSurf, 0, 960, 6)} stroke="#1c241c" strokeWidth="2" fill="none" />
            {/* dypbergart: størknet pluton */}
            <path
              d="M330 470 C320 420 360 380 420 384 C480 388 520 420 512 470 Z"
              fill={step === 2 ? "#4f6378" : "#435265"}
              stroke={step === 2 ? "#b9d3ee" : "#6c7f95"}
              strokeWidth={step === 2 ? 3 : 1.5}
            />
            {/* magmakammer og kanal */}
            <ellipse cx="560" cy="490" rx="150" ry="44" fill={`url(#${uid}-mg)`} />
            <path d="M650 470 C660 380 684 220 690 96" stroke={K.magma} strokeWidth="9" fill="none" strokeLinecap="round" />
            {/* lava på flanken */}
            <path
              d={band((x) => akSurf(x) - 1, (x) => akSurf(x) + 12, 700, 820, 4)}
              fill={step === 4 ? "#15181b" : step === 3 ? "#6a3f3a" : K.dag}
              stroke={step !== 2 ? AK_RING[i] : "none"}
              strokeWidth="1.5"
            />
            {/* linjen fra linsen til stedet i snittet */}
            <path
              d={`M${fx(lens[0] + (AK_AT[i][0] > lens[0] ? R : -R) * 0.9)} ${fx(lens[1] + R * 0.35)} L${AK_AT[i][0]} ${AK_AT[i][1]}`}
              stroke={AK_RING[i]}
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity={small ? 0 : 1}
            />
            <Linse x={lens[0]} y={lens[1]} R={R} base={AK_BASE[i]} korn={AK_KORN[i]} grow={grow} uid={`${uid}-l`} ring={AK_RING[i]} />
            {step === 4 ? (
              <path
                d={`M${lens[0] - R * 0.6} ${lens[1] + R * 0.1} C${lens[0] - R * 0.2} ${lens[1] - R * 0.5} ${lens[0] + R * 0.3} ${lens[1] - R * 0.4} ${lens[0] + R * 0.6} ${lens[1] + R * 0.3}`}
                stroke="#9fb0bb"
                strokeOpacity="0.35"
                strokeWidth="6"
                fill="none"
                data-nocheck=""
              />
            ) : null}
            {!small ? (
              <text
                x={lens[0]}
                y={lens[1] + R + 30}
                textAnchor="middle"
                fontSize={figureFont(15, scale)}
                fontWeight="700"
                fill={AK_RING[i]}
                stroke={P.halo}
                strokeWidth="4"
                paintOrder="stroke"
              >
                {lensText.length > 24 ? lensText.split(" i ")[0] : lensText}
              </text>
            ) : null}
            {!small && step === 3 ? (
              <text x={lens[0]} y={lens[1] + R + 50} textAnchor="middle" fontSize={figureFont(15, scale)} fontWeight="700" fill={AK_RING[i]} stroke={P.halo} strokeWidth="4" paintOrder="stroke">
                i finkornet grunnmasse
              </text>
            ) : null}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 4. Silikatgruppene: hvordan tetraedrene deler oksygen
 * ===================================================================== */

const SI_STEPS = ["Nesosilikat", "Inosilikat", "Fyllosilikat", "Tektosilikat"];
const SI_STATUS = [
  "Nesosilikat: Tetraedrene står isolert og deler ikke oksygen. Eksempel: olivin i mafisk magma.",
  "Inosilikat: Tetraedrene danner kjeder. Eksempler: pyroksen i gabbro og amfibol i grønnstein.",
  "Fyllosilikat: Tetraedrene danner sjikt. Derfor spalter mineralet i flak. Eksempler: glimmer i fyllitt og kloritt i grønnstein.",
  "Tektosilikat: Tetraedrene danner et rammeverk der alle hjørnene deles. Eksempler: kvarts og feltspat. De er harde og blir ofte korn i sand.",
];
const SI_DESK = ["Isolert", "Kjeder", "Sjikt", "Rammeverk"];
const SI_EKS = ["Olivin", "Pyroksen, amfibol", "Glimmer, kloritt", "Kvarts, feltspat"];

/** Tetraeder sett ovenfra: tre oksygen i hjørnene, silisium i midten (det fjerde oksygenet ligger over). */
function Tetra({ x, y, s, dim, rot = 0 }: { x: number; y: number; s: number; dim?: boolean; rot?: number }) {
  const c = [0, 1, 2].map((k) => {
    const a = rot + (-90 + k * 120) * (Math.PI / 180);
    return [x + Math.cos(a) * s, y + Math.sin(a) * s] as Pt;
  });
  return (
    <g opacity={dim ? 0.45 : 1}>
      <path d={`M${c.map((q) => `${fx(q[0])} ${fx(q[1])}`).join(" L")} Z`} fill="#3f6b80" fillOpacity="0.55" stroke="#9cc7da" strokeWidth="1.6" />
      {c.map((q, i) => (
        <path key={`l${i}`} d={`M${fx(x)} ${fx(y)} L${fx(q[0])} ${fx(q[1])}`} stroke="#9cc7da" strokeOpacity="0.6" strokeWidth="1" />
      ))}
      {c.map((q, i) => (
        <circle key={i} cx={fx(q[0])} cy={fx(q[1])} r={fx(s * 0.28)} fill="#e86a5a" stroke="#5a1f18" strokeWidth="0.8" />
      ))}
      <circle cx={fx(x)} cy={fx(y)} r={fx(s * 0.32)} fill="#f2f0e6" stroke="#5a1f18" strokeWidth="0.8" />
      <circle cx={fx(x)} cy={fx(y)} r={fx(s * 0.16)} fill="#2c3b8f" />
    </g>
  );
}

/** Posisjonene til tetraedrene i hvert panel, relativt til panelets midtpunkt. */
const SI_LAYOUT: { x: number; y: number; rot: number }[][] = (() => {
  const s = 22;
  const h = s * 1.5;
  const neso = [
    [-50, -50],
    [45, -40],
    [-30, 40],
    [55, 55],
  ].map(([x, y]) => ({ x, y, rot: 0 }));
  const ino: { x: number; y: number; rot: number }[] = [];
  for (let k = -3; k <= 3; k++) ino.push({ x: k * s * 0.87 * 1.0 * 1.15, y: (k % 2 === 0 ? -8 : 8) - 40, rot: k % 2 === 0 ? 0 : Math.PI / 3 });
  for (let k = -3; k <= 3; k++) ino.push({ x: k * s * 1.0, y: (k % 2 === 0 ? -8 : 8) + 40, rot: k % 2 === 0 ? 0 : Math.PI / 3 });
  const fyl: { x: number; y: number; rot: number }[] = [];
  for (let r = -2; r <= 2; r++)
    for (let c = -3; c <= 3; c++) fyl.push({ x: c * s * 1.73 * 0.58 + (r % 2 ? s * 0.5 : 0), y: r * h * 0.85, rot: (r + c) % 2 ? Math.PI / 3 : 0 });
  const tek: { x: number; y: number; rot: number }[] = [];
  for (let r = -2; r <= 2; r++)
    for (let c = -2; c <= 2; c++) tek.push({ x: c * 30 + r * 12, y: r * 26 - c * 6, rot: (r * 2 + c) * 0.5 });
  return [neso, ino, fyl, tek];
})();

export function SilikatgrupperFigur({
  heading = "Silikatgruppene: hvordan tetraedrene deler oksygen",
  caption,
  initialStep = 1,
}: BergartFigurProps) {
  const [wrapRef, small] = useFigurSmal();
  const [step, setStep] = useState(clamp(initialStep, 1, 4));
  const cols = small ? 2 : 4;
  const pw = small ? 250 : 230;
  const ph = small ? 270 : 300;
  const vb = small ? "0 0 520 580" : "0 0 960 340";
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        title="Fire silikatgrupper sett ovenfra: isolerte tetraeder (nesosilikat), kjeder (inosilikat), sjikt (fyllosilikat) og rammeverk (tektosilikat), med eksempler"
        heading={heading}
        caption={
          caption ??
          "Hvert tetraeder er ett silisiumatom med fire oksygen rundt. Gruppene skilles etter hvordan tetraedrene deler oksygen. Forenklet: tetraedrene er tegnet ovenfra, så det fjerde oksygenet (over silisium) vises ikke, og rammeverket er bare antydet i to dimensjoner."
        }
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={SI_STEPS} step={step} onStep={setStep} label="Velg gruppe" />
          </StegRamme>
        }
        status={SI_STATUS[step - 1]}
        keys={[
          { text: "Oksygen", color: "#e86a5a", kind: "fill" },
          { text: "Silisium", color: "#2c3b8f", kind: "fill" },
        ]}
        viewBox={vb}
        forceNarrow={small}
      >
        {({ scale }) => (
          <g data-figur="silikater" data-step={step}>
            {SI_LAYOUT.map((lay, k) => {
              const cx = (k % cols) * (small ? 260 : 240) + (small ? 130 : 120);
              const cy = Math.floor(k / cols) * (small ? 290 : 0) + (small ? 140 : 160);
              const on = step === k + 1;
              return (
                <g key={k}>
                  <rect
                    x={cx - pw / 2}
                    y={cy - ph / 2 + (small ? 0 : -5)}
                    width={pw}
                    height={ph}
                    rx="14"
                    fill={on ? "#1b2b35" : "#141e24"}
                    stroke={on ? C.warm : "#33444f"}
                    strokeWidth={on ? 3 : 1.4}
                  />
                  <text x={cx} y={cy - ph / 2 + 30} textAnchor="middle" fontSize={figureFont(18, scale)} fontWeight="700" fill={on ? "#ffd9b0" : C.fg}>
                    {SI_DESK[k]}
                  </text>
                  <g>
                    <clipPath id={`si-${k}`}>
                      <rect x={cx - pw / 2 + 8} y={cy - 92} width={pw - 16} height={176} />
                    </clipPath>
                    <g clipPath={`url(#si-${k})`} data-nocheck="">
                      {lay.map((t, j) => (
                        <Tetra key={j} x={cx + t.x} y={cy + t.y} s={22} rot={t.rot} dim={!on} />
                      ))}
                    </g>
                  </g>
                  <text x={cx} y={cy + ph / 2 - 22} textAnchor="middle" fontSize={figureFont(15, scale)} fill={on ? "#ffd9b0" : C.muted}>
                    {SI_EKS[k]}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
