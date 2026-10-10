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
    { text: "Dypbergart, f.eks. granitt eller gabbro", x: 360, y: 482, at: [700, 440], color: "#d4c8e0", badge: [742, 366] },
    { text: "Dagbergart, f.eks. basalt", x: 930, y: 52, at: [866, 168], color: "#e6c9c0", anchor: "end", badge: [906, 140] },
    { text: "Havet", x: 700, y: 246, at: [700, BS_SEA + 8], color: "#bfe0ef", anchor: "middle", size: 14, badge: [800, BS_SEA + 14] },
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
    labels.push({ text: "Berget smelter", x: 150, y: 548, at: [300, 526], color: "#ffc59a", anchor: "middle", badge: [260, 530] });
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
              {s.melt > 0.02 ? <rect x="0" y="500" width="600" height="60" fill={K.magma} opacity={0.5 * s.melt} /> : null}
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
  /** Navn på en stasjonsboks mens denne veien er valgt. */
  boks?: Partial<Record<StId, string>>;
  tekst: string;
};
const RUTER: Rute[] = [
  {
    navn: "Larvikitt",
    start: "magma",
    kanter: ["storkning"],
    tekst:
      "Larvikitt: magma størknet på dypet til en dypbergart for cirka 295 millioner år siden, og har vært magmatisk bergart siden (NGU, u.å.-i). Veier den ikke har tatt: omdanning og smelting.",
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
      "Kalkstein: karbonat fra organismer er forsteinet. De fleste norske kalksteiner er omdannet til marmor. Stiplet vei: omdanning. I Oslo-området kan kalksteinen være bare svakt omdannet (NGU, u.å.-f).",
  },
  {
    navn: "Fyllitt",
    start: "sedi",
    kanter: ["forsteining", "sedb-meta"],
    boks: { sedb: "Leirskifer" },
    tekst:
      "Leire → leirskifer (sedimentær) → fyllitt (metamorf). Svak regional metamorfose gjør at glimmerkornene ordnes, og berget får skifrighet.",
  },
  {
    navn: "Gneis",
    start: "meta",
    kanter: ["magm-meta", "sedb-meta"],
    tekst:
      "Gneis kan dannes både av magmatiske bergarter (f.eks. granitt) og av sedimentære bergarter (f.eks. leirskifer eller sandstein) ved høyt trykk og høy temperatur. Hvilken vei en bestemt gneis har tatt, kan ofte ikke avgjøres fra en håndprøve alene.",
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
  meta: [392, 560],
  magma: [128, 560],
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
  // etiketten flyttes ut fra kurven, til den siden kurven bøyer mot (eller venstre ved rett linje)
  const side = k.bend >= 0 ? 1 : -1;
  const mid = at(0.5);
  const lab: Pt = [mid[0] - uy * 30 * side, mid[1] + ux * 30 * side];
  return { d, at, mid, lab };
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
    : "Alle veier: Pilene viser prosessene mellom stasjonene: størkning, forvitring og erosjon, forsteining, omdanning og smelting. Velg en bergart for å se hvilken vei den har tatt, og hvilke veier den ikke har tatt.";
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
              {(Object.keys(ST_NAVN) as StId[]).map((id) => {
                const [x, y] = pos[id];
                const on = besokt.has(id);
                const dim = rute && !on;
                return (
                  <g key={id} opacity={dim ? 0.5 : 1} filter="url(#bf-soft)" data-stasjon={id === slutt && rute ? "her" : undefined}>
                    {rute && id === slutt ? (
                      <rect x={x - bw / 2 - 7} y={y - bh / 2 - 7} width={bw + 14} height={bh + 14} rx="19" fill="none" stroke={C.warm} strokeWidth="2.5" strokeDasharray="4 5" />
                    ) : null}
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
                      {rute?.boks?.[id] ?? ST_NAVN[id]}
                    </text>
                  </g>
                );
              })}
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
  "Rombekrystallene vokste sakte i magmakammeret. Resten av smelten størknet raskt til finkornet grunnmasse da lavaen nådde overflaten.",
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
    labels.push({ text: "Kjøles langsomt", x: 160, y: 380, at: [380, 410], color: "#b9d3ee", badge: [520, 390] });
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
              <text x={lens[0]} y={fx(lens[1] + R + 30 + figureFont(15, scale) * 1.6)} textAnchor="middle" fontSize={figureFont(15, scale)} fontWeight="700" fill={AK_RING[i]} stroke={P.halo} strokeWidth="4" paintOrder="stroke">
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
  "Inosilikat: Tetraedrene danner kjeder. Pyroksen (enkle kjeder), amfibol (doble kjeder). Eksempler: pyroksen i gabbro og amfibol i grønnstein.",
  "Fyllosilikat: Tetraedrene danner sjikt. Derfor spalter mineralet i flak. Eksempler: glimmer i fyllitt og kloritt i grønnstein.",
  "Tektosilikat: Tetraedrene danner et rammeverk der alle hjørnene deles. Eksempler: kvarts og feltspat. De er harde og blir ofte korn i sand.",
];
const SI_DESK = ["Isolert", "Kjeder", "Sjikt", "Rammeverk"];
const SI_EKS = [["Olivin"], ["Pyroksen (enkle kjeder),", "amfibol (doble kjeder)"], ["Glimmer, kloritt"], ["Kvarts, feltspat"]];

/** Silisium: samme farge i tegningen og i fargeforklaringen. */
const SI_FARGE = "#5b78e6";

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
      <circle cx={fx(x)} cy={fx(y)} r={fx(s * 0.3)} fill={SI_FARGE} stroke="#e8eef2" strokeWidth="1" />
    </g>
  );
}

/** Posisjonene til tetraedrene i hvert panel, relativt til panelets midtpunkt. Nabotetraeder deler hjørner. */
const SI_S = 17;
const SI_LAYOUT: { x: number; y: number; rot: number; lag?: number }[][] = (() => {
  const s = SI_S;
  const a = s * Math.sqrt(3);
  const neso = [
    [-48, -46],
    [46, -38],
    [-34, 42],
    [50, 50],
  ].map(([x, y]) => ({ x, y, rot: 0 }));
  // enkeltkjeder: like tetraeder side om side, hvert deler to hjørner med naboene
  const ino: { x: number; y: number; rot: number }[] = [];
  for (let k = -3; k <= 3; k++) ino.push({ x: k * a, y: -52, rot: 0 });
  for (let k = -3; k <= 3; k++) ino.push({ x: k * a, y: 22, rot: 0 });
  for (let k = -3; k <= 2; k++) ino.push({ x: k * a + a / 2, y: 22 + 1.5 * s, rot: 0 });
  // sjikt: hvert tetraeder deler tre hjørner, og det blir sekskantede hull
  const sjikt = (dx: number, dy: number, rows: number[], cols: number[], rot: number, lag?: number) => {
    const out: { x: number; y: number; rot: number; lag?: number }[] = [];
    for (const r of rows)
      for (const c of cols) out.push({ x: dx + c * a + (Math.abs(r) % 2 ? a / 2 : 0), y: dy + r * 1.5 * s, rot, lag });
    return out;
  };
  const fyl = sjikt(0, 0, [-2, -1, 0, 1, 2], [-3, -2, -1, 0, 1, 2, 3], 0);
  // rammeverk: to sjikt oppå hverandre, det øverste snudd og koblet til det nederste
  const tek = [
    ...sjikt(0, 0, [-2, -1, 0, 1, 2], [-3, -2, -1, 0, 1, 2, 3], 0, 0),
    ...sjikt(a / 2, s * 0.5, [-2, -1, 0, 1], [-3, -2, -1, 0, 1, 2], Math.PI, 1),
  ];
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
          { text: "Silisium", color: SI_FARGE, kind: "fill" },
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
                        <Tetra key={j} x={cx + t.x} y={cy + t.y} s={SI_S} rot={t.rot} dim={!on || t.lag === 0} />
                      ))}
                    </g>
                  </g>
                  {SI_EKS[k].map((line, li) => (
                    <text
                      key={line}
                      x={cx}
                      y={fx(cy + ph / 2 - 22 - (SI_EKS[k].length - 1 - li) * figureFont(15, scale) * 1.6)}
                      textAnchor="middle"
                      fontSize={figureFont(15, scale)}
                      fill={on ? "#ffd9b0" : C.muted}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 5. Metamorfose: fra leirskifer til gneis
 * ===================================================================== */

const ME_STEPS = ["Leirskifer", "Fyllitt", "Glimmerskifer", "Gneis"];
const ME_STATUS = [
  "Leirskifer: sedimentær utgangsbergart, før omdanning.",
  "Fyllitt: Lavgrads regional metamorfose. Glimmerkornene ordnes, og berget får tydelig skifrighet og silkeglans på kløvflatene. Kornene er små. Stasjonen er lav metamorfose.",
  "Omdanningen har gått lenger enn i fyllitt. Glimmerkornene er store nok til å sees med det blotte øye, og skifrigheten er tydelig.",
  "Gneis: Mellom- til grovkornet, stripet eller bølget. Kornene er synlige, og båndene er grovere enn i fyllitt. Høyt trykk og høy temperatur.",
];
/** Prøven tegnes i en fast boks (540 × 360) og skaleres på smal skjerm. */
const ME_W = 540;
const ME_H = 360;
type Flak = { x: number; y: number; l: number; w: number; a: number; c: string };
function flak(seed: number, n: number, lMin: number, lMax: number, w: number, a0: number, wave: number, colors: string[]): Flak[] {
  const r = rng(seed);
  return Array.from({ length: n }, () => {
    const x = r() * ME_W;
    const y = r() * ME_H;
    return {
      x: n1(x),
      y: n1(y),
      l: n1(lerp(lMin, lMax, r())),
      w: n1(w * (0.7 + r() * 0.6)),
      a: n1(a0 + wave * Math.sin(x / 60 + y / 90) + (r() - 0.5) * 6),
      c: colors[Math.floor(r() * colors.length)],
    };
  });
}
const ME_LEIR_DOTS = flak(31, 900, 1.2, 2.4, 1, 0, 0, ["#4c4a4f", "#5d5b60", "#3c3a3f"]);
const ME_FYLL = flak(32, 1100, 4, 9, 1.4, 0, 2, ["#8f95a3", "#a7adba", "#6b7180", "#c3c8d2"]);
const ME_GLIM = flak(33, 380, 12, 26, 3.2, 0, 10, ["#b7b39a", "#d9d3b8", "#8c8a78", "#2d2b28"]);
/** Gneisbånd: bølgete lyse og mørke bånd. */
const ME_BAND = (() => {
  const out: { d: string; c: string }[] = [];
  const top = (k: number) => (x: number) => -30 + k * 34 + 14 * Math.sin(x / 70 + k * 0.6) + 8 * Math.sin(x / 23);
  for (let k = 0; k < 14; k++)
    out.push({ d: band(top(k), top(k + 1), -10, ME_W + 10, 10), c: k % 2 ? "#2f2c33" : k % 4 === 0 ? "#d8d0c4" : "#c9b7a6" });
  return out;
})();
const ME_GNEIS_KORN = krystaller(34, 160, 7, 14, ["#e8e0d2", "#bfa996", "#f2ebe0", "#1f1d22", "#3a3640"], 330);

export function MetamorfoseFigur({
  heading = "Metamorfose: fra leirskifer til gneis",
  caption,
  initialStep,
}: BergartFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3000, 1800, initialStep);
  const { step, phase } = clock;
  const uid = useId().replace(/:/g, "");
  const t = motion.playing ? smooth(phase) : 1;
  const vb = small ? "0 0 520 560" : "0 0 960 490";
  // dybdesøyle og prøve
  const col = small ? { x: 24, y: 40, w: 70, h: 470 } : { x: 60, y: 50, w: 110, h: 360 };
  const box = small ? { x: 130, y: 150, s: 370 / ME_W } : { x: 380, y: 64, s: 1 };
  const depthY = (k: number) => col.y + col.h * (0.14 + 0.24 * k);
  const markY = lerp(depthY(Math.max(0, step - 2)), depthY(step - 1), step === 1 ? 1 : t);
  const op = (k: number) => (k === step - 1 ? (step === 1 ? 1 : t) : k === step - 2 ? 1 - t : 0);
  const labels: Lab[] = [
    { text: "Overflaten", x: col.x + col.w + 14, y: col.y + 6, color: C.fg, size: 14, badge: [col.x + col.w / 2, col.y - 14] },
    {
      text: small ? "Dypere: høyere trykk og temperatur" : "Dypere: høyere trykk",
      x: col.x + col.w + 14,
      y: col.y + col.h - 30,
      color: "#ffc59a",
      badge: [col.x + col.w / 2, col.y + col.h + 18],
    },
  ];
  if (!small) labels.push({ text: "og høyere temperatur", x: col.x + col.w + 14, y: col.y + col.h - 8, color: "#ffc59a" });
  if (step === 1) labels.push({ text: "Sedimentære lag", x: box.x + 12, y: box.y + 26, color: "#e8eef2", halo: undefined, badge: [box.x + 20, box.y + 20] });
  if (step >= 2) labels.push({ text: step === 4 ? "Striper (bånd)" : "Skifrighet", x: box.x + 12, y: box.y + 26, color: "#ffe2c2", badge: [box.x + 20, box.y + 20] });
  if (step === 2) labels.push({ text: "Lav metamorfose", x: col.x + col.w + 40, y: depthY(1) - 14, color: C.warm, badge: [col.x + col.w + 18, depthY(1)] });
  const keys: Key[] = [
    { text: "Temperatur øker nedover", color: K.magma, kind: "fill" },
    { text: "Rettet trykk (sammenpressing)", color: C.fg, kind: "line" },
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Dybdesøyle der trykk og temperatur øker nedover, og en forstørret prøve som går fra leirskifer til fyllitt, glimmerskifer og gneis mens skifrighet og striper vokser fram"
        heading={heading}
        caption={
          caption ??
          "En metamorf bergart har vært sedimentær eller magmatisk. Høyt trykk, høy temperatur og/eller kjemisk påvirkning omdanner den i fast tilstand, uten at den smelter. Fra leirskifer til gneis blir kornene større, og skifrigheten (foliasjon) går over i striper eller bånd. Forenklet: søylen har ingen målestokk, og prøven er skjematisk forstørret."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={ME_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg bergart" />
          </StegRamme>
        }
        status={ME_STATUS[step - 1]}
        labels={labels}
        keys={keys}
        notes={["Skifrighet dannes vinkelrett på retningen med størst trykk.", "Skjematisk, uten målestokk"]}
        viewBox={vb}
        forceNarrow={small}
      >
        {({ m }) => (
          <g className={motion.motionClass} data-figur="metamorfose" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <linearGradient id={`${uid}-t`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5b6458" />
                <stop offset="0.55" stopColor="#8a5a3c" />
                <stop offset="1" stopColor="#c7542a" />
              </linearGradient>
              <clipPath id={`${uid}-p`}>
                <rect x="0" y="0" width={ME_W} height={ME_H} rx="12" />
              </clipPath>
              <linearGradient id={`${uid}-glans`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.16" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* dybdesøyle */}
            <rect x={col.x} y={col.y} width={col.w} height={col.h} rx="10" fill={`url(#${uid}-t)`} />
            {ME_STEPS.map((navn, k) => (
              <circle key={navn} cx={col.x + col.w / 2} cy={fx(depthY(k))} r="5" fill={k === step - 1 ? "#ffe2c2" : "#1b2328"} stroke="#ffe2c2" strokeWidth="1.5" />
            ))}
            <path
              d={`M${col.x + col.w + 2} ${fx(markY)} L${box.x - 8} ${fx(box.y + (ME_H * box.s) / 2)}`}
              stroke={C.warm}
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity={small ? 0 : 1}
            />
            <circle cx={col.x + col.w / 2} cy={fx(markY)} r="11" fill="none" stroke={C.warm} strokeWidth="3" />
            {/* prøven */}
            <g transform={`translate(${box.x} ${box.y}) scale(${box.s})`}>
              <rect x="-5" y="-5" width={ME_W + 10} height={ME_H + 10} rx="15" fill="#0b1318" />
              <g clipPath={`url(#${uid}-p)`} data-nocheck="">
                <g opacity={op(0)}>
                  <rect width={ME_W} height={ME_H} fill="#56535a" />
                  {Array.from({ length: 16 }, (_, k) => (
                    <path key={k} d={`M0 ${k * 23 + 6} C180 ${k * 23 + 3} 360 ${k * 23 + 9} ${ME_W} ${k * 23 + 5}`} stroke={k % 2 ? "#6a676e" : "#46434a"} strokeWidth={k % 3 ? 4 : 7} fill="none" />
                  ))}
                  {ME_LEIR_DOTS.map((f, i) => (
                    <rect key={i} x={f.x} y={f.y} width={f.l} height={f.w} fill={f.c} />
                  ))}
                </g>
                <g opacity={op(1)}>
                  <rect width={ME_W} height={ME_H} fill="#4d525d" />
                  <g>
                    {Array.from({ length: 44 }, (_, k) => (
                      <path
                        key={k}
                        d={`M-220 ${k * 14 - 130} C40 ${k * 14 - 133} 400 ${k * 14 - 126} 760 ${k * 14 - 130}`}
                        stroke={k % 3 === 0 ? "#b9bfcc" : "#7d8391"}
                        strokeWidth={k % 3 === 0 ? 2.2 : 1.2}
                        fill="none"
                      />
                    ))}
                  </g>
                  {ME_FYLL.map((f, i) => (
                    <rect key={i} x={f.x} y={f.y} width={f.l} height={f.w} fill={f.c} transform={`rotate(${f.a} ${f.x} ${f.y})`} />
                  ))}
                  <rect width={ME_W} height={ME_H} fill={`url(#${uid}-glans)`} />
                </g>
                <g opacity={op(2)}>
                  <rect width={ME_W} height={ME_H} fill="#6f6c60" />
                  {ME_GLIM.map((f, i) => (
                    <ellipse key={i} cx={f.x} cy={f.y} rx={f.l / 2} ry={f.w / 2} fill={f.c} transform={`rotate(${f.a} ${f.x} ${f.y})`} />
                  ))}
                  <rect width={ME_W} height={ME_H} fill={`url(#${uid}-glans)`} opacity="0.7" />
                </g>
                <g opacity={op(3)}>
                  {ME_BAND.map((b, i) => (
                    <path key={i} d={b.d} fill={b.c} />
                  ))}
                  <g transform={`translate(${ME_W / 2} ${ME_H / 2})`} opacity="0.55">
                    {ME_GNEIS_KORN.map((k, i) => (
                      <path key={i} d={k.d} fill={k.fill} />
                    ))}
                  </g>
                  {ME_BAND.map((b, i) => (i % 2 ? <path key={`o${i}`} d={b.d} fill="#2f2c33" opacity="0.55" /> : null))}
                </g>
              </g>
              <rect x="-2" y="-2" width={ME_W + 4} height={ME_H + 4} rx="13" fill="none" stroke={C.warm} strokeWidth={3 / box.s} />
            </g>
            {[0.25, 0.5, 0.75].map((f) => {
              const x = box.x + ME_W * box.s * f;
              const top = box.y - 8;
              const bot = box.y + ME_H * box.s + 8;
              const len = small ? 30 : 34;
              return (
                <g key={f} data-trykk="">
                  <path d={`M${fx(x)} ${fx(top - len)} L${fx(x)} ${fx(top)}`} stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
                  <path d={`M${fx(x)} ${fx(bot + len)} L${fx(x)} ${fx(bot)}`} stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
                </g>
              );
            })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/** Statustekster for Oslograben-figuren når den vises i Bergarter, med kapittelets ordlyd og tall. */
export const OSLO_STATUS_BERGARTER = [
  "Skorpa strekkes: For cirka 310 millioner år siden, mot slutten av karbon, sprakk skorpen opp (NGU, u.å.-c). På land strekker Oslofeltet seg fra Langesund til Mjøsa. Riftsystemet fortsetter ut i Skagerrak.",
  "Graben synker inn: Blokker synker ned langs forkastninger, og det dannes en riftdal (NGU, u.å.-c).",
  "Lava og magma: Vulkanismen fortsatte inn i perm. Rombeporfyr størknet på overflaten, og rombene viser at smelten ikke var ferdig krystallisert (NGU, u.å.-l). Dypt nede størknet larvikitt, dannet for cirka 295 millioner år siden (NGU, u.å.-i).",
  "I dag: Erosjon har blottlagt bergartene. Larvikitt finnes i Vestfold og Telemark og er Norges nasjonalbergart (NGU, u.å.-i). NGU kaller rombeporfyr tvillingbroren til larvikitt (NGU, u.å.-l).",
] as const;

/* =====================================================================
 * 7. Steinlab: lupe, ripetest og syretest på håndprøver
 * ===================================================================== */

type Prove = {
  navn: string;
  farge: string;
  /** Tekstur i lupen. */
  korn: Krystall[];
  base: string;
  band?: boolean;
  lupe: string;
  /** Kornet som ripes, og resultatet for negl, kniv, glass og kvarts. */
  kornNavn: string;
  ripe: [string, string, string, string];
  /** Riper verktøyet kornet (true), eller ingen tydelig test (null). */
  riper: [boolean | null, boolean | null, boolean | null, boolean | null];
  syre: "bruser" | "nei" | "kitt";
};

const KALSITT_RIPE: [string, string, string, string] = [
  "Neglen riper ikke kalsittkornet.",
  "Kniven riper kalsittkornet.",
  "Kalsittkornet riper ikke glass.",
  "Kvarts riper kalsittkornet. Kvarts er 7 og kalsitt 3 på Mohs-skalaen.",
];
const KVARTS_RIPE: [string, string, string, string] = [
  "Neglen riper ikke kvartskornet.",
  "Kniven riper ikke kvartskornet.",
  "Kvartskornet riper glass. Kvarts er 7 på Mohs-skalaen.",
  "Kvarts mot kvarts: like harde, ingen tydelig ripe.",
];
const BAS_RIPE: [string, string, string, string] = [
  "Kornene er for små til å teste ett og ett korn. Se heller på farge, tetthet og eventuelle gassbobler med lupe.",
  "Kornene er for små til å teste ett og ett korn. Se heller på farge, tetthet og eventuelle gassbobler med lupe.",
  "Kornene er for små til å teste ett og ett korn. Se heller på farge, tetthet og eventuelle gassbobler med lupe.",
  "Kornene er for små til å teste ett og ett korn. Se heller på farge, tetthet og eventuelle gassbobler med lupe.",
];
const KV_RIPER: Prove["riper"] = [false, false, true, null];
const KA_RIPER: Prove["riper"] = [false, true, false, true];

const PROVER: Prove[] = [
  {
    navn: "Granitt",
    farge: "#b9a49a",
    korn: krystaller(41, 60, 12, 22, ["#e3b9a6", "#f1e8de", "#9aa0a6", "#1f1d22", "#d49b84"], 92),
    base: "#8d8580",
    lupe: "Granitt: grovkornet med synlige korn av kvarts, feltspat og glimmer. Korn og prikker peker på magmatisk bergart, her en dypbergart.",
    kornNavn: "kvarts",
    ripe: KVARTS_RIPE,
    riper: KV_RIPER,
    syre: "nei",
  },
  {
    navn: "Basalt",
    farge: "#3d3a3c",
    korn: krystaller(42, 420, 1.6, 3.2, ["#3a3638", "#4f4a4c", "#2a2729", "#5d5759"], 92),
    base: "#343133",
    lupe: "Basalt: finkornet. Krystallene er svært små fordi magmaen ble kjølt raskt ved overflaten. Dagbergart med samme sammensetning som gabbro.",
    kornNavn: "grunnmasse",
    ripe: BAS_RIPE,
    riper: [null, null, null, null],
    syre: "nei",
  },
  {
    navn: "Sandstein",
    farge: "#c9a77c",
    korn: krystaller(43, 140, 5, 8, ["#e6d2ae", "#d4b88c", "#f0e3c8", "#b9945f"], 92),
    base: "#a07a4d",
    lupe: "Sandstein: sandkorn av kvarts og feltspat, kittet av kvarts, kalkspat eller jernforbindelser. Korn og lagdeling peker på sedimentær bergart.",
    kornNavn: "kvarts",
    ripe: KVARTS_RIPE,
    riper: KV_RIPER,
    syre: "kitt",
  },
  {
    navn: "Kalkstein",
    farge: "#a9a69c",
    korn: krystaller(44, 300, 1.8, 3.4, ["#b9b6ab", "#9c998f", "#c7c4b9"], 92),
    base: "#a3a095",
    lupe: "Kalkstein: finkornet, ofte med fossiler. Den består av mer enn 50 prosent karbonater.",
    kornNavn: "kalsitt",
    ripe: KALSITT_RIPE,
    riper: KA_RIPER,
    syre: "bruser",
  },
  {
    navn: "Marmor",
    farge: "#e4e2dc",
    korn: krystaller(45, 110, 7, 13, ["#f4f2ec", "#e2dfd6", "#cfcbc0", "#faf8f3"], 92),
    base: "#d6d2c8",
    lupe: "Marmor: omdannet kalkstein. Kornene er krystaller av kalsitt. De fleste norske kalksteiner er omdannet til marmor.",
    kornNavn: "kalsitt",
    ripe: KALSITT_RIPE,
    riper: KA_RIPER,
    syre: "bruser",
  },
  {
    navn: "Kvartsitt",
    farge: "#d8cfc4",
    korn: krystaller(46, 120, 7, 12, ["#ece6dc", "#d9d0c4", "#f6f1ea", "#c7bcae"], 92),
    base: "#c2b8aa",
    lupe: "Kvartsitt: tettpakkede kvartskorn som er vokst sammen. Den er omdannet sandstein.",
    kornNavn: "kvarts",
    ripe: KVARTS_RIPE,
    riper: KV_RIPER,
    syre: "nei",
  },
  {
    navn: "Gneis",
    farge: "#8f8790",
    korn: krystaller(47, 90, 8, 14, ["#efe8dc", "#c9b7a6", "#2a2730", "#3a3640"], 92),
    base: "#5c5560",
    band: true,
    lupe: "Gneis: mellom- til grovkornet, stripet eller bølget, med lyse og mørke bånd. Striper og folder peker på metamorf bergart.",
    kornNavn: "kvarts (lyst korn)",
    ripe: KVARTS_RIPE,
    riper: KV_RIPER,
    syre: "nei",
  },
];
const VERKTOY = ["Lupe", "Ripetest", "Syretest"];
const RIPEVERKTOY = ["Negl", "Kniv", "Glass", "Kvarts"];

/** Omriss av en håndprøve (fast form, skaleres). */
const PROVE_OMRISS = "M-120 10 C-128 -40 -86 -82 -30 -88 C30 -96 96 -76 118 -34 C134 -2 124 48 86 70 C40 94 -40 92 -84 70 C-112 56 -116 36 -120 10 Z";
const BOBLER = (() => {
  const r = rng(51);
  return Array.from({ length: 26 }, () => ({ x: (r() - 0.5) * 70, o: r(), s: 2 + r() * 4 }));
})();

export function SteinlabFigur({ heading = "Steinlab: test en håndprøve" }: { heading?: string }) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const [prove, setProve] = useState(1);
  const [verktoy, setVerktoy] = useState(1);
  const [ripe, setRipe] = useState(1);
  const clock = useStepClock(1, motion.playing && visible, 2400, 0);
  const uid = useId().replace(/:/g, "");
  const p = PROVER[prove - 1];
  const tick = motion.playing ? clock.phase : 0.6;
  const ri = ripe - 1;
  const riper = p.riper[ri];
  const syreTekst =
    p.syre === "bruser"
      ? `${p.navn}: Fortynnet saltsyre bruser. Kalsitt reagerer, så prøven hører til karbonatbergartene.`
      : p.syre === "kitt"
        ? `${p.navn}: Bruser vanligvis ikke. Er kittet kalkspat, kan det bruse svakt der syren treffer kittet.`
        : `${p.navn}: Bruser ikke. Prøven er ikke kalkstein eller marmor.`;
  const status =
    verktoy === 1
      ? p.lupe
      : verktoy === 2
        ? `${RIPEVERKTOY[ri]} mot ${p.kornNavn} i ${p.navn.toLowerCase()}: ${p.ripe[ri]}${riper === null ? "" : " Rip ett korn, ikke hele steinen."}`
        : syreTekst;
  const vb = small ? "0 0 520 630" : "0 0 960 420";
  const S = small ? { x: 260, y: 150, k: 1.35 } : { x: 250, y: 200, k: 1.45 };
  const L = small ? { x: 260, y: 460, R: 120 } : { x: 690, y: 200, R: 150 };
  const bruser = verktoy === 3 && (p.syre === "bruser" || p.syre === "kitt");
  const sterk = p.syre === "bruser";
  const valg = (fn: (n: number) => void) => (n: number) => {
    fn(n);
    if (motion.playing) motion.toggle();
  };
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Steinlab: velg en håndprøve og test den med lupe, ripetest etter Mohs eller fortynnet saltsyre. Resultatet står i teksten over figuren"
        heading={heading}
        caption="Utforsk som en geolog: velg en test, noter det du ser, og tolk hvilken stasjon i syklusen prøven sitter på. Mohs-skalaen gjelder mineralet, ikke hele bergarten, så rip ett korn. Forenklet: prøvene og kornene er skjematiske."
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <div className="flex w-full flex-col gap-2">
              <StegVelger labels={PROVER.map((x) => x.navn)} step={prove} onStep={valg(setProve)} label="Velg håndprøve" />
              <StegVelger labels={VERKTOY} step={verktoy} onStep={valg(setVerktoy)} label="Velg test" />
              {verktoy === 2 ? (
                <StegVelger labels={RIPEVERKTOY} step={ripe} onStep={valg(setRipe)} label="Rip med" />
              ) : null}
            </div>
          </StegRamme>
        }
        status={status}
        notes={["Skjematisk, uten målestokk"]}
        viewBox={vb}
        forceNarrow={small}
      >
        {({ scale }) => {
          const f = (sz: number) => figureFont(sz, scale);
          return (
            <g className={motion.motionClass} data-figur="steinlab" data-step={`${prove}-${verktoy}-${ripe}`} data-playing={motion.playing ? "yes" : "no"}>
              <defs>
                <clipPath id={`${uid}-s`}>
                  <path d={PROVE_OMRISS} />
                </clipPath>
                <radialGradient id={`${uid}-lys`} cx="0.35" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#000" stopOpacity="0.35" />
                </radialGradient>
              </defs>
              {/* bordplate */}
              <rect x="0" y={small ? 250 : 330} width={small ? 520 : 480} height={small ? 20 : 90} fill="#1d2a31" />
              {/* håndprøven */}
              <g transform={`translate(${S.x} ${S.y}) scale(${S.k})`}>
                <ellipse cx="0" cy="84" rx="118" ry="12" fill="#000" opacity="0.4" />
                <g clipPath={`url(#${uid}-s)`} data-nocheck="">
                  <path d={PROVE_OMRISS} fill={p.farge} />
                  {p.band
                    ? [-70, -40, -10, 20, 50].map((y) => (
                        <path key={y} d={`M-140 ${y} C-60 ${y - 14} 40 ${y + 16} 140 ${y - 4}`} stroke="#2f2b33" strokeWidth="11" fill="none" opacity="0.8" />
                      ))
                    : null}
                  <g transform="scale(1.25)" opacity="0.75">
                    {p.korn.map((k, i) => (
                      <path key={i} d={k.d} fill={k.fill} />
                    ))}
                  </g>
                  {p.navn === "Kalkstein" ? (
                    <g stroke="#6f6c63" strokeWidth="2.2" fill="none">
                      <path d="M-40 -20 a12 12 0 1 1 14 6" />
                      <path d="M30 20 a10 10 0 1 0 -12 -4" />
                    </g>
                  ) : null}
                  <path d={PROVE_OMRISS} fill={`url(#${uid}-lys)`} />
                  {/* ripe */}
                  {verktoy === 2 && riper === true ? (
                    <path d="M-50 -10 L40 -30" stroke="#f6f2ea" strokeWidth="3" strokeDasharray={`${fx(100 * (motion.playing ? clock.phase : 1))} 200`} />
                  ) : null}
                  {/* syre: fukt og bobler */}
                  {verktoy === 3 ? <ellipse cx="0" cy="-20" rx="40" ry="14" fill="#9fd3e6" opacity="0.35" /> : null}
                  {bruser
                    ? BOBLER.slice(0, sterk ? 26 : 6).map((b, i) => {
                        const t = (b.o + tick) % 1;
                        return <circle key={i} cx={fx(b.x * 0.6)} cy={fx(-20 - t * 40)} r={fx(b.s * (sterk ? 1 : 0.7))} fill="none" stroke="#e8f6fb" strokeWidth="1.4" opacity={fx(1 - t)} />;
                      })
                    : null}
                </g>
                <path d={PROVE_OMRISS} fill="none" stroke="#11181c" strokeWidth="2" />
              </g>
              {/* verktøyet over prøven */}
              {verktoy === 2 ? (
                <g transform={`translate(${fx(S.x + 54 * S.k)} ${fx(S.y - 40 * S.k - 46)})`}>
                  {ri === 0 ? <path d="M0 0 C18 -6 30 4 26 22 L16 46 L-6 40 Z" fill="#e8c4b0" stroke="#7a5a4a" strokeWidth="2" /> : null}
                  {ri === 1 ? <path d="M-10 -30 L6 -30 L6 30 L-2 52 L-10 30 Z" fill="#c9d1d8" stroke="#56606a" strokeWidth="2" /> : null}
                  {ri === 2 ? <rect x="-30" y="-10" width="60" height="44" rx="4" fill="#bfe3ef" fillOpacity="0.35" stroke="#9ccbe0" strokeWidth="2" /> : null}
                  {ri === 3 ? <path d="M0 -36 L14 -18 L12 34 L-12 34 L-14 -18 Z" fill="#eef3f6" fillOpacity="0.8" stroke="#9fb0bb" strokeWidth="2" /> : null}
                </g>
              ) : null}
              {verktoy === 3 ? (
                <g transform={`translate(${S.x} ${S.y - 140})`}>
                  <rect x="-8" y="-40" width="16" height="44" rx="5" fill="#9fb0bb" />
                  <path d="M-4 4 L4 4 L1 22 L-1 22 Z" fill="#cfe6ee" />
                  <circle cx="0" cy={fx(30 + 30 * tick)} r="4" fill="#9fd3e6" opacity={motion.playing ? 1 : 0} />
                </g>
              ) : null}
              {/* lupe / nærbilde */}
              <Linse
                x={L.x}
                y={L.y}
                R={L.R}
                base={verktoy === 1 ? p.base : "#16222a"}
                korn={verktoy === 1 ? p.korn : []}
                grow={1}
                uid={`${uid}-l`}
                ring={verktoy === 1 ? C.warm : "#3a4852"}
              />
              {verktoy === 1 && p.band ? (
                <g data-nocheck="" style={{ clipPath: `circle(${L.R}px at ${L.x}px ${L.y}px)` }} opacity="0.55">
                  {[-60, -10, 40, 90].map((y) => (
                    <path key={y} d={`M${L.x - L.R} ${L.y + y - 40} C${L.x - 40} ${L.y + y - 60} ${L.x + 40} ${L.y + y - 20} ${L.x + L.R} ${L.y + y - 40}`} stroke="#1f1c24" strokeWidth="18" fill="none" />
                  ))}
                </g>
              ) : null}
              {verktoy !== 1 ? (
                <text x={L.x} y={L.y + 6} textAnchor="middle" fontSize={f(20)} fontWeight="700" fill={(verktoy === 2 && riper === true) || (verktoy === 3 && bruser) ? "#ffd9b0" : C.fg}>
                  {verktoy === 2 ? (riper === true ? "Ripe" : riper === false ? "Ingen ripe" : "Ikke testbart") : bruser ? (sterk ? "Bruser" : "Kan bruse svakt") : "Ingen reaksjon"}
                </text>
              ) : null}
              <text x={L.x} y={L.y + L.R + 34} textAnchor="middle" fontSize={f(16)} fontWeight="700" fill={verktoy === 1 ? C.warm : C.muted}>
                {verktoy === 1 ? "Lupe, 6–10 ganger" : verktoy === 2 ? `Ripetest: ${RIPEVERKTOY[ri].toLowerCase()}` : "Fortynnet saltsyre"}
              </text>
              <text x={S.x} y={small ? 304 : 380} textAnchor="middle" fontSize={f(18)} fontWeight="700" fill={C.fg}>
                {p.navn}
              </text>
            </g>
          );
        }}
      </IsbreFigur>
    </div>
  );
}
