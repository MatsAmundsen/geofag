/**
 * Figurene i Geofag 1: Vann og flom.
 *
 * Bygger på samme ramme som Isbreer, Landformer, Norges geologi og Bergarter (IsbreFigur, StegVelger,
 * Skyver og isbre-kit): nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og
 * redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten (src/lib/posts/vann-og-flom.md) og kildene der (NGU, NVE, Varsom,
 * MET). Figurene har ingen tall som ikke står i teksten. Kretsløp, akvifer og hydrogram er skjematiske
 * og uten målestokk. Bare Hans-søylene har tall, og de er hentet ordrett fra teksten (MET, 2023).
 */
import { useId, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, Skyver, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, clamp, figureFont, lerp, pickStep, smooth, useBoxWidth, useInView, useNarrow, useStepClock, useTicker } from "./isbre-kit";

export type VannFigurProps = {
  heading?: string;
  caption?: ReactNode;
  initialStep?: number;
};

/* ---------- små verktøy ---------- */

type Pt = [number, number];
const n1 = (v: number) => Math.round(v * 10) / 10;

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

function polyPath(list: readonly Pt[]) {
  return list.map(([x, y], i) => `${i ? "L" : "M"}${n1(x)} ${n1(y)}`).join(" ");
}

/** Glatt linje gjennom punktene (Catmull-Rom som kubiske Bézier-kurver). */
function smoothLine(list: readonly Pt[]) {
  if (list.length < 3) return polyPath(list);
  let d = `M${n1(list[0][0])} ${n1(list[0][1])}`;
  for (let i = 0; i < list.length - 1; i++) {
    const p0 = list[Math.max(0, i - 1)];
    const p1 = list[i];
    const p2 = list[i + 1];
    const p3 = list[Math.min(list.length - 1, i + 2)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${n1(c1[0])} ${n1(c1[1])} ${n1(c2[0])} ${n1(c2[1])} ${n1(p2[0])} ${n1(p2[1])}`;
  }
  return d;
}

/** Punkt en andel t langs en polylinje. */
function along(list: readonly Pt[], t: number): Pt {
  const seg: number[] = [];
  let total = 0;
  for (let i = 0; i < list.length - 1; i++) {
    const l = Math.hypot(list[i + 1][0] - list[i][0], list[i + 1][1] - list[i][1]);
    seg.push(l);
    total += l;
  }
  let rest = clamp(t) * total;
  for (let i = 0; i < seg.length; i++) {
    if (rest <= seg[i] || i === seg.length - 1) {
      const f = seg[i] > 0 ? clamp(rest / seg[i]) : 0;
      return [lerp(list[i][0], list[i + 1][0], f), lerp(list[i][1], list[i + 1][1], f)];
    }
    rest -= seg[i];
  }
  return list[list.length - 1];
}

/** Høyden til en profil (punktliste sortert på x) ved x. */
function profileY(list: readonly Pt[], x: number) {
  if (x <= list[0][0]) return list[0][1];
  for (let i = 0; i < list.length - 1; i++) {
    if (x <= list[i + 1][0]) {
      const f = (x - list[i][0]) / (list[i + 1][0] - list[i][0]);
      return lerp(list[i][1], list[i + 1][1], smooth(f));
    }
  }
  return list[list.length - 1][1];
}

function profilePts(list: readonly Pt[], x0: number, x1: number, dx = 8): Pt[] {
  const out: Pt[] = [];
  for (let x = x0; x < x1; x += dx) out.push([x, profileY(list, x)]);
  out.push([x1, profileY(list, x1)]);
  return out;
}

/** Fluks: pil med vannpartikler som vandrer langs streken mens animasjonen spiller. */
function Fluks({
  pts,
  color,
  marker,
  width = 3,
  on,
  t,
  moving,
  dash,
  dots = 4,
  speed = 0.35,
  id,
}: {
  pts: readonly Pt[];
  color: string;
  marker: string;
  width?: number;
  on: boolean;
  t: number;
  moving: boolean;
  dash?: string;
  dots?: number;
  speed?: number;
  id: string;
}) {
  return (
    <g opacity={on ? 1 : 0.14} data-fluks={id}>
      <path
        d={smoothLine(pts)}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dash}
        markerEnd={`url(#${marker})`}
      />
      {on
        ? Array.from({ length: dots }, (_, k) => {
            const f = moving ? (t * speed + k / dots) % 1 : (k + 0.5) / dots;
            const [x, y] = along(pts, f * 0.88);
            return <circle key={k} cx={n1(x)} cy={n1(y)} r={Math.max(2.4, width * 0.9)} fill="#e9f6ff" stroke="none" data-nocheck="" />;
          })
        : null}
    </g>
  );
}

/* =====================================================================
 * 1. Det hydrologiske kretsløpet som landskapssnitt
 * ===================================================================== */

const KR_STEPS = ["Fordampning", "Nedbør", "Snø og smelting", "Infiltrasjon og avrenning", "Grunnvann", "Elv til havet"];
const KR_STATUS = [
  "Fordampning: Sola driver kretsløpet. Mest vann fordamper fra havet, men også fra bakken, elver og innsjøer. Planter avgir vanndamp gjennom bladene. Samlet kalles det evapotranspirasjon.",
  "Nedbør: Vanndampen blir skyer, og nedbøren treffer bakken som regn eller snø.",
  "Snø og smelting: Noe nedbør lagres en stund som snø. Når snøen smelter, renner vannet videre.",
  "Infiltrasjon og avrenning: Vannet på bakken renner av på overflaten eller siger ned i bakken (infiltrasjon). Vann som infiltrerer, tas opp av røtter eller lagres som grunnvann.",
  "Grunnvann: Under grunnvannsspeilet er alle hulrom fylt med vann. Grunnvannet strømmer sakte mot innsjøer, elver og havet.",
  "Elv til havet: Overflatevannet renner i bekker og elver ut i havet. Noe grunnvann renner rett ut i havet. Så kan vannet fordampe igjen.",
];

const KR_SURF: Pt[] = [
  [244, 333],
  [330, 320],
  [430, 304],
  [498, 295],
  [612, 295],
  [700, 252],
  [780, 192],
  [850, 152],
  [910, 166],
  [960, 190],
];
const KR_GW: Pt[] = [
  [244, 334],
  [330, 324],
  [430, 309],
  [500, 296],
  [612, 297],
  [700, 284],
  [800, 256],
  [960, 244],
];
/** Smal visning: det meste av havet er skåret bort, så landskapet og teksten blir større. */
const KR_NARROW_VB = "150 24 810 496";
const KR_SEA = 333;
const KR_BED = 432;
const KR_LAKE: Pt[] = [
  [500, 295],
  [520, 306],
  [556, 313],
  [592, 306],
  [612, 295],
];
const KR_TREES: Pt[] = [
  [292, 323],
  [318, 320],
  [346, 316],
  [372, 312],
  [400, 308],
  [428, 304],
];
const KR_CRACKS: Pt[][] = [
  [
    [270, 452],
    [292, 482],
    [282, 520],
  ],
  [
    [700, 446],
    [724, 474],
    [714, 520],
  ],
  [
    [880, 440],
    [864, 470],
    [886, 512],
  ],
];
const KR_FLUX = {
  evapSea: [
    [196, 318],
    [202, 250],
    [218, 178],
  ] as Pt[],
  evapLand: [
    [350, 296],
    [342, 240],
    [330, 186],
  ] as Pt[],
  evapLake: [
    [560, 288],
    [566, 236],
    [578, 182],
  ] as Pt[],
  rain: [
    [
      [400, 132],
      [394, 290],
    ],
    [
      [440, 134],
      [436, 286],
    ],
    [
      [480, 132],
      [478, 282],
    ],
  ] as Pt[][],
  snow: [
    [
      [790, 92],
      [784, 168],
    ],
    [
      [836, 92],
      [834, 140],
    ],
    [
      [882, 92],
      [884, 150],
    ],
  ] as Pt[][],
  melt: [
    [772, 204],
    [722, 236],
    [664, 274],
    [622, 290],
  ] as Pt[],
  runoff: [
    [690, 256],
    [652, 280],
    [618, 291],
  ] as Pt[],
  urbanRunoff: [
    [300, 316],
    [276, 324],
    [256, 330],
  ] as Pt[],
  infil: [
    [
      [440, 308],
      [440, 360],
    ],
    [
      [470, 302],
      [470, 352],
    ],
  ] as Pt[][],
  gwLake: [
    [760, 300],
    [690, 304],
    [622, 304],
  ] as Pt[],
  gwRiver: [
    [480, 344],
    [400, 350],
    [320, 346],
    [262, 342],
  ] as Pt[],
  gwSea: [
    [330, 386],
    [270, 392],
    [210, 392],
  ] as Pt[],
  river: [
    [498, 291],
    [430, 300],
    [330, 316],
    [258, 330],
  ] as Pt[],
};

export function KretslopFigur({
  heading = "Det hydrologiske kretsløpet: fra hav til fjell og tilbake",
  caption,
  initialStep,
}: VannFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(6, motion.playing && visible, 3600, 1400, initialStep);
  const t = useTicker(motion.playing && visible);
  const [tett, setTett] = useState(0);
  const { step } = clock;
  const i = step - 1;
  const uid = useId().replace(/:/g, "");
  const moving = motion.playing;
  const tettLabel = ["Ingen", "Noe", "Mye"][tett];
  const surfPts = profilePts(KR_SURF, 244, 960);
  const gwPts = profilePts(KR_GW, 244, 960);
  const land = `${polyPath(surfPts)} L960 540 L244 540 Z`;
  const unsat = `${polyPath(surfPts)} ${polyPath([...gwPts].reverse()).replace("M", "L")} Z`;
  const sat = `${polyPath(gwPts)} L960 ${KR_BED} L244 ${KR_BED} Z`;
  const bed = `M200 ${KR_BED} L960 ${KR_BED} L960 540 L0 540 L0 476 C80 470 150 456 200 ${KR_BED} Z`;
  const seabed = `M0 476 C80 470 150 456 200 ${KR_BED} C222 400 236 360 244 ${KR_SEA} L244 540 L0 540 Z`;
  const snowTop = profilePts(KR_SURF, 756, 960, 6);
  const snowCap = `${polyPath(snowTop.map(([x, y]) => [x, y - 3] as Pt))} ${polyPath(
    [...snowTop].reverse().map(([x, y]) => [x, y + 9 + 5 * Math.sin(x / 13)] as Pt),
  ).replace("M", "L")} Z`;
  const houses = tett > 0 ? KR_TREES.slice(0, tett === 2 ? 4 : 2) : [];
  const trees = KR_TREES.slice(houses.length);
  const infilW = [3.2, 2.2, 1.4][tett];
  const runW = [2.4, 3.4, 4.6][tett];

  const labels: Lab[] = [];
  if (step === 1) {
    labels.push(
      { text: "Fordampning fra havet", x: 30, y: 52, at: [210, 222], color: C.warm, badge: [236, 236] },
      { text: "Evapotranspirasjon fra planter og innsjø", x: 236, y: 52, at: [334, 200], color: C.warm, badge: [306, 214] },
      { text: "Sola driver kretsløpet", x: 944, y: 122, at: [900, 70], color: "#ffd77a", anchor: "end", badge: [930, 96] },
    );
  } else if (step === 2) {
    labels.push(
      { text: "Vanndamp blir skyer", x: 30, y: 52, at: [404, 98], color: C.fg, badge: [360, 74] },
      { text: "Regn", x: 300, y: 152, at: [396, 196], color: C.rain, anchor: "end", badge: [370, 178] },
      { text: "Snø på fjellet", x: 730, y: 128, at: [786, 150], color: P.snow, anchor: "end", badge: [752, 154] },
    );
  } else if (step === 3) {
    labels.push(
      { text: "Snø lagres en stund", x: 730, y: 128, at: [800, 182], color: P.snow, anchor: "end", badge: [760, 168] },
      { text: "Smeltevann renner til innsjøen", x: 944, y: 330, at: [700, 252], color: "#cfe6f5", anchor: "end", badge: [720, 226] },
    );
  } else if (step === 4) {
    labels.push(
      { text: "Infiltrasjon ned i bakken", x: 380, y: 494, at: [446, 352], color: C.teal, badge: [496, 372] },
      { text: "Overflateavrenning", x: 944, y: 400, at: [656, 278], color: C.sand, anchor: "end", badge: [664, 252] },
    );
    if (tett > 0)
      labels.push({ text: "Tette flater: mer overvann", x: 30, y: 52, at: [292, 312], color: "#d7dde2", badge: [272, 296] });
  } else if (step === 5) {
    labels.push(
      { text: "Markvannssone: hulrom delvis fylt", x: 700, y: 150, at: [830, 214], color: "#d9c39a", anchor: "end", badge: [856, 236] },
      { text: "Grunnvannsspeil", x: 944, y: 492, at: [880, 252], color: "#9fe3ea", anchor: "end", badge: [906, 272] },
      { text: "Mettet sone: grunnvann", x: 380, y: 494, at: [540, 380], color: C.teal, badge: [560, 404] },
    );
  } else {
    labels.push(
      { text: "Elva renner ut i havet", x: 30, y: 52, at: [262, 328], color: C.rain, badge: [270, 300] },
      { text: "Noe grunnvann renner rett ut i havet", x: 330, y: 520, at: [214, 392], color: C.teal, badge: [200, 420] },
    );
  }
  const keys: Key[] = [
    { text: "Fordampning", color: C.warm, kind: "line" },
    { text: "Nedbør", color: C.rain, kind: "dash" },
    { text: "Overflatevann", color: C.sand, kind: "line" },
    { text: "Grunnvann", color: C.teal, kind: "line" },
    { text: "Grunnvannsspeil", color: "#9fe3ea", kind: "dash" },
  ];
  const status =
    KR_STATUS[i] +
    (tett > 0 ? " Tette flater som asfalt og tak slipper lite vann ned i bakken. Vannet renner raskere av, så flomtoppen kommer tidligere og blir høyere, og mindre vann går til grunnvannet. (NVE, u.å.-i)" : "");
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Landskapssnitt fra hav via kyst, skog og innsjø til fjell med snø. Pilene viser fordampning fra hav, planter og innsjø, nedbør som regn og snø, smelting, infiltrasjon, overflateavrenning, grunnvann under grunnvannsspeilet og elva tilbake til havet"
        heading={heading}
        caption={
          caption ??
          "Kretsløpet som et landskap: hav, kyst, skog, innsjø og fjell med snø. Pilene viser hvor vannet går mellom lagrene snø, mark, grunnvann, innsjø, elv og hav. Skyveren viser hva tette flater gjør med fordelingen mellom infiltrasjon og avrenning. Forenklet: snittet er skjematisk og uten målestokk (NGU, u.å.-g)."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <>
            <StegRamme small={small}>
              <StegVelger labels={KR_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg del av kretsløpet" />
            </StegRamme>
            <Skyver
              label="Tette flater"
              min={0}
              max={2}
              step={1}
              value={tett}
              onChange={setTett}
              valueLabel={tettLabel}
              valueText={`${tettLabel} tette flater`}
            />
          </>
        }
        status={status}
        labels={labels}
        keys={keys}
        notes={["Skjematisk, uten målestokk", "Høyden er overdrevet"]}
        viewBox="0 0 960 540"
        narrowViewBox={KR_NARROW_VB}
      >
        {({ d, m }) => (
          <g className={motion.motionClass} data-figur="kretslop" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={P.water} />
                <stop offset="1" stopColor={P.waterDeep} />
              </linearGradient>
              <radialGradient id={`${uid}-sun`}>
                <stop offset="0" stopColor="#fff2b8" />
                <stop offset="0.6" stopColor="#ffd77a" />
                <stop offset="1" stopColor="#ffd77a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="960" height="540" fill={d.url.sky} />
            <circle cx="900" cy="52" r="34" fill={`url(#${uid}-sun)`} />
            <circle cx="900" cy="52" r="16" fill="#ffe08f" />
            {/* hav */}
            <rect x="0" y={KR_SEA} width="250" height={540 - KR_SEA} fill={`url(#${uid}-sea)`} />
            <path d={seabed} fill="#5a5446" />
            {/* land: umettet sone, mettet sone og fjell */}
            <path d={land} fill="#6b5b45" />
            <path d={unsat} fill="#7d6a4f" />
            <path d={sat} fill="#2c5866" />
            <path d={sat} fill={d.url.strata} opacity="0.35" data-nocheck="" />
            <path d={bed} fill={d.url.rock} />
            {KR_CRACKS.map((c, k) => (
              <path key={k} d={polyPath(c)} stroke="#2b3129" strokeWidth="1.6" fill="none" data-nocheck="" />
            ))}
            <path d={smoothLine(surfPts)} stroke="#2e3a26" strokeWidth="2" fill="none" data-nocheck="" />
            <path d={snowCap} fill={P.snow} opacity={step === 3 ? 1 : 0.85} />
            {/* innsjø */}
            <path d={`${smoothLine(KR_LAKE)} Z`} fill={P.water} />
            {/* grunnvannsspeil */}
            <path
              d={smoothLine(gwPts)}
              stroke="#9fe3ea"
              strokeWidth={step === 5 ? 2.6 : 1.6}
              strokeDasharray="7 6"
              fill="none"
              opacity={step === 5 ? 1 : 0.6}
              data-nocheck=""
            />
            {/* skog */}
            {trees.map(([x, y]) => (
              <g key={x}>
                <rect x={x - 2} y={y - 8} width="4" height="9" fill="#4a3b2a" />
                <path d={`M${x - 11} ${y - 6} L${x} ${y - 34} L${x + 11} ${y - 6} Z`} fill="#3f6b43" />
              </g>
            ))}
            {/* tette flater: tak og asfalt */}
            {houses.map(([x, y]) => (
              <g key={x}>
                <rect x={x - 13} y={y - 4} width="26" height="5" fill="#3a3f44" />
                <rect x={x - 10} y={y - 20} width="20" height="16" fill="#b9a99a" />
                <path d={`M${x - 13} ${y - 19} L${x} ${y - 30} L${x + 13} ${y - 19} Z`} fill="#8f3f35" />
              </g>
            ))}
            {/* elv langs dalbunnen */}
            <path d={smoothLine(KR_FLUX.river)} stroke={P.water} strokeWidth="6" fill="none" strokeLinecap="round" data-nocheck="" />
            {/* skyer */}
            <g fill="#c9d6de" opacity="0.9">
              <path d="M360 120 C352 100 376 86 394 94 C402 72 436 70 448 90 C468 80 494 92 490 112 C506 116 504 134 486 134 L372 134 C356 134 350 124 360 120 Z" />
              <path d="M752 82 C744 62 768 48 786 56 C796 34 830 32 842 52 C864 42 892 54 888 74 C906 78 904 94 884 94 L764 94 C748 94 742 86 752 82 Z" />
            </g>
            {/* flukser */}
            <Fluks id="fordampning-hav" pts={KR_FLUX.evapSea} color={C.warm} marker={m.warm} width={3.4} on={step === 1} t={t} moving={moving} />
            <Fluks id="fordampning-planter" pts={KR_FLUX.evapLand} color={C.warm} marker={m.warm} width={2.4} on={step === 1} t={t} moving={moving} dots={3} />
            <Fluks id="fordampning-innsjo" pts={KR_FLUX.evapLake} color={C.warm} marker={m.warm} width={2.4} on={step === 1} t={t} moving={moving} dots={3} />
            {KR_FLUX.rain.map((p, k) => (
              <Fluks key={`r${k}`} id={`regn-${k}`} pts={p} color={C.rain} marker={m.cold} width={2.2} dash="6 5" on={step === 2} t={t + k * 0.3} moving={moving} dots={3} speed={0.6} />
            ))}
            {KR_FLUX.snow.map((p, k) => (
              <Fluks key={`s${k}`} id={`sno-${k}`} pts={p} color={P.snow} marker={m.fg} width={2} dash="2 6" on={step === 2 || step === 3} t={t + k * 0.4} moving={moving} dots={2} speed={0.3} />
            ))}
            <Fluks id="smelting" pts={KR_FLUX.melt} color="#cfe6f5" marker={m.ice} width={3} on={step === 3} t={t} moving={moving} />
            <Fluks id="avrenning" pts={KR_FLUX.runoff} color={C.sand} marker={m.warm} width={runW} on={step === 4} t={t} moving={moving} dots={3} />
            {tett > 0 ? (
              <Fluks id="overvann" pts={KR_FLUX.urbanRunoff} color={C.sand} marker={m.warm} width={runW} on={step === 4} t={t} moving={moving} dots={2} />
            ) : null}
            {KR_FLUX.infil.map((p, k) => (
              <Fluks key={`i${k}`} id={`infiltrasjon-${k}`} pts={p} color={C.teal} marker={m.teal} width={infilW} on={step === 4} t={t + k * 0.5} moving={moving} dots={2} speed={0.25} />
            ))}
            <Fluks id="grunnvann-innsjo" pts={KR_FLUX.gwLake} color={C.teal} marker={m.teal} width={2.6} on={step === 5} t={t} moving={moving} dots={3} speed={0.15} />
            <Fluks id="grunnvann-elv" pts={KR_FLUX.gwRiver} color={C.teal} marker={m.teal} width={2.6} on={step === 5} t={t} moving={moving} dots={4} speed={0.15} />
            <Fluks id="grunnvann-hav" pts={KR_FLUX.gwSea} color={C.teal} marker={m.teal} width={2.2} dash="6 4" on={step === 6} t={t} moving={moving} dots={3} speed={0.15} />
            <Fluks id="elv" pts={KR_FLUX.river} color="#8fd0ff" marker={m.cold} width={2.4} on={step === 6} t={t} moving={moving} dots={5} speed={0.4} />
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 2. Akvifer: grunnvannsspeil, mettet og umettet sone, porøsitet og permeabilitet
 * ===================================================================== */

const AQ_STEPS = ["Sand og grus", "Leire", "Usortert morene", "Oppsprukket fjell"];
const AQ_STATUS = [
  "Sand og grus: Løst pakket, godt sortert grus og sand har store, sammenhengende hulrom og høy permeabilitet. Vannet strømmer lett. Derfor er slike løsmasser gode akviferer.",
  "Leire: Silt og leire har små korn og er tett pakket. Leire har høy total porøsitet, men lav permeabilitet. Vannet kommer nesten ikke gjennom.",
  "Usortert morene: De små kornene fyller hulrommene mellom de store. Derfor har usortert materiale lav permeabilitet.",
  "Oppsprukket fjell: I krystallint fjell er porøsiteten nærmest null. Vannet strømmer i sprekkene, så sprekkene styrer permeabiliteten.",
];
const AQ_SURF: Pt[] = [
  [0, 262],
  [60, 262],
  [78, 278],
  [104, 278],
  [122, 262],
  [220, 240],
  [420, 226],
  [620, 214],
  [800, 205],
  [960, 200],
];
const AQ_GW: Pt[] = [
  [104, 274],
  [200, 284],
  [300, 294],
  [322, 304],
  [336, 318],
  [350, 304],
  [372, 296],
  [520, 300],
  [700, 298],
  [960, 292],
];
const AQ_CLAY_TOP = 400;
const AQ_BED_TOP = 430;
const AQ_AT: Pt[] = [
  [420, 350],
  [300, 415],
  [720, 268],
  [800, 410],
];
const AQ_FRACTURES: Pt[][] = [
  [
    [640, 352],
    [668, 392],
    [660, 450],
    [690, 488],
  ],
  [
    [760, 350],
    [740, 396],
    [770, 440],
    [756, 488],
  ],
  [
    [900, 346],
    [870, 390],
    [886, 436],
    [860, 488],
  ],
  [
    [690, 410],
    [760, 418],
    [880, 410],
  ],
];

function grainsFor(kind: number, seed: number) {
  let a = seed >>> 0;
  const r = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = a;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  const out: { x: number; y: number; rx: number; ry: number; a: number; c: string }[] = [];
  const add = (n: number, rMin: number, rMax: number, flat: number, colors: string[]) => {
    for (let k = 0; k < n; k++) {
      const rr = lerp(rMin, rMax, r());
      out.push({
        x: lerp(-80, 80, r()),
        y: lerp(-80, 80, r()),
        rx: rr,
        ry: rr * flat,
        a: kind === 1 ? lerp(-12, 12, r()) : lerp(0, 180, r()),
        c: colors[Math.floor(r() * colors.length)],
      });
    }
  };
  if (kind === 0) add(26, 13, 16, 0.85, ["#c8b386", "#b39d6e", "#d8c69a", "#9e8a62"]);
  if (kind === 1) add(520, 3.4, 5.2, 0.32, ["#8f8775", "#a39b88", "#7a7362"]);
  if (kind === 2) {
    add(7, 16, 24, 0.8, ["#8d7d66", "#a3927a", "#6e6250"]);
    add(260, 2.2, 4.4, 0.85, ["#8d7d66", "#b4a387", "#7b6d58"]);
  }
  return out;
}
const AQ_GRAINS = [grainsFor(0, 41), grainsFor(1, 42), grainsFor(2, 43), []];

export function AkviferFigur({
  heading = "Akvifer: grunnvann i porer og sprekker",
  caption,
  initialStep,
}: VannFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3600, 1600, initialStep);
  const t = useTicker(motion.playing && visible);
  const { step } = clock;
  const i = step - 1;
  const uid = useId().replace(/:/g, "");
  const moving = motion.playing;
  const surfPts = profilePts(AQ_SURF, 0, 960);
  const gwPts = profilePts(AQ_GW, 104, 960);
  const lens: Pt = small ? [800, 110] : [820, 104];
  const R = small ? 92 : 84;
  const ring = ["#e7d29f", "#c9c1ae", "#d3c09d", "#9fe3ea"][i];
  const speed = [0.5, 0.06, 0.12, 0.35][i];
  const labels: Lab[] = [
    { text: "Markvannssone: hulrom delvis fylt", x: 24, y: 48, at: [240, 262], color: "#d9c39a", badge: [250, 210] },
    { text: "Grunnvannsspeil", x: 24, y: 84, at: [190, 283], color: "#9fe3ea", badge: [168, 316] },
    { text: "Brønn", x: 380, y: 160, at: [341, 214], color: C.fg, badge: [372, 196] },
    { text: "Grunnvann renner ut i elva", x: 24, y: 466, at: [94, 280], color: C.teal, badge: [60, 236] },
  ];
  labels.push(
    [
      { text: "Sand og grus: akvifer", x: 24, y: 512, at: AQ_AT[0], color: "#e7d29f", badge: [470, 372] },
      { text: "Leire: tett lag", x: 330, y: 512, at: AQ_AT[1], color: "#d3cbb6", badge: [262, 446] },
      { text: "Usortert morene", x: 944, y: 254, at: AQ_AT[2], color: "#e0cfaa", anchor: "end", badge: [690, 250] },
      { text: "Vann i sprekker i fjellet", x: 560, y: 528, at: [744, 400], color: "#9fe3ea", badge: [720, 470] },
    ][i] as Lab,
  );
  const keys: Key[] = [
    { text: "Grunnvannsspeil", color: "#9fe3ea", kind: "dash" },
    { text: "Grunnvannsstrøm", color: C.teal, kind: "line" },
    { text: "Mettet sone", color: "#2c5866", kind: "fill" },
  ];
  const sat = `${polyPath(gwPts)} L960 ${AQ_BED_TOP} L104 ${AQ_BED_TOP} Z`;
  const flowSand: Pt[] = [
    [500, 346],
    [380, 348],
    [240, 322],
    [120, 290],
  ];
  const flowRock: Pt[] = [
    [886, 436],
    [870, 390],
    [900, 352],
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt gjennom bakken ved en elv: markvannssone over grunnvannsspeilet, mettet sone under. Sand og grus er en akvifer med en brønn, under ligger et tett leirlag og fjell. Til høyre usortert morene over oppsprukket fjell. En linse viser porene i den valgte løsmassen eller fjellet"
        heading={heading}
        caption={
          caption ??
          "Grunnvann fyller porer og sprekker. Det er ingen underjordiske elver. Over grunnvannsspeilet er hulrommene bare delvis fylt (markvannssonen), under er alt fylt (mettet sone). Linsen viser hvorfor sand og grus slipper vannet lett, mens leire og usortert morene holder igjen. Forenklet: snittet er skjematisk og uten målestokk (NGU, u.å.-c; NGU, u.å.-d)."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={AQ_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg løsmasse eller fjell" />
          </StegRamme>
        }
        status={AQ_STATUS[i]}
        labels={labels}
        keys={keys}
        notes={["Linsen viser kornene forstørret", "Skjematisk, uten målestokk"]}
        remark="Breelvdelta og esker er ofte gode akviferer. Gardermoen-akviferen er et typeeksempel."
        viewBox="0 0 960 560"
      >
        {({ d, m }) => (
          <g className={motion.motionClass} data-figur="akvifer" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id={`${uid}-lens`}>
                <circle cx={lens[0]} cy={lens[1]} r={R} />
              </clipPath>
              <clipPath id={`${uid}-ground`}>
                <path d={`${polyPath(surfPts)} L960 560 L0 560 Z`} />
              </clipPath>
            </defs>
            <rect x="0" y="0" width="960" height="560" fill={d.url.sky} />
            <g clipPath={`url(#${uid}-ground)`}>
              <rect x="0" y="0" width="960" height="560" fill={i === 2 ? "#8d7d66" : "#7a6c57"} />
              {/* sand og grus (venstre), morene (høyre) */}
              <path d={`M0 0 L580 0 L540 ${AQ_CLAY_TOP} L0 ${AQ_CLAY_TOP} Z`} fill={i === 0 ? "#b39d6e" : "#9c8962"} />
              <path d={`M580 0 L960 0 L960 340 L556 340 Z`} fill={i === 2 ? "#8d7d66" : "#7a6c57"} />
              <path d={`M0 ${AQ_CLAY_TOP} L540 ${AQ_CLAY_TOP} L548 ${AQ_BED_TOP} L0 ${AQ_BED_TOP} Z`} fill={i === 1 ? "#958d7a" : "#7f7868"} />
              <path d={`M0 ${AQ_BED_TOP} L548 ${AQ_BED_TOP} L556 340 L960 340 L960 560 L0 560 Z`} fill={d.url.rock} />
              {/* mettet sone som blått slør over løsmassene */}
              <path d={sat} fill="#2c6a80" opacity="0.5" />
              <path d={`M556 340 L548 ${AQ_BED_TOP}`} stroke="#3b4239" strokeWidth="1" data-nocheck="" />
              {AQ_FRACTURES.map((f, k) => (
                <path key={k} d={polyPath(f)} stroke={i === 3 ? "#9fe3ea" : "#2b3129"} strokeWidth={i === 3 ? 2.4 : 1.6} fill="none" data-nocheck="" />
              ))}
            </g>
            <path d={smoothLine(surfPts)} stroke="#2e3a26" strokeWidth="2" fill="none" data-nocheck="" />
            {/* elv */}
            <path d="M78 276 L104 276 L104 278 L78 278 Z" fill={P.water} />
            <rect x="74" y="270" width="34" height="8" fill={P.water} />
            {/* grunnvannsspeil med senkningstrakt rundt brønnen */}
            <path d={smoothLine(gwPts)} stroke="#9fe3ea" strokeWidth="2.2" strokeDasharray="8 6" fill="none" data-nocheck="" />
            {/* brønn */}
            <rect x="335" y="218" width="12" height="150" fill="#5d6770" />
            <rect x="337" y="320" width="8" height="46" fill="#2c6a80" />
            <rect x="327" y="204" width="28" height="14" rx="3" fill="#8b9aa6" />
            {/* strøm i akviferen og i sprekkene */}
            <Fluks id="grunnvann-akvifer" pts={flowSand} color={C.teal} marker={m.teal} width={i === 0 ? 3.2 : 2} on={i !== 3} t={t} moving={moving} dots={5} speed={i === 0 ? 0.2 : 0.06} />
            <Fluks id="grunnvann-sprekk" pts={flowRock} color="#9fe3ea" marker={m.teal} width={2.4} on={i === 3} t={t} moving={moving} dots={3} speed={0.2} />
            {/* linse */}
            <path
              d={`M${n1(lens[0] - R * 0.92)} ${n1(lens[1] + R * 0.4)} L${AQ_AT[i][0]} ${AQ_AT[i][1]}`}
              stroke={ring}
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity={small ? 0 : 0.9}
              data-nocheck=""
            />
            <g clipPath={`url(#${uid}-lens)`}>
              <rect x={lens[0] - R} y={lens[1] - R} width={R * 2} height={R * 2} fill={i === 3 ? "#5d635a" : "#3d7f98"} />
              {i === 3 ? (
                <>
                  <path d={`M${lens[0] - R} ${lens[1] - 20} L${lens[0] - 20} ${lens[1] - 6} L${lens[0] + 30} ${lens[1] + 14} L${lens[0] + R} ${lens[1] + 4}`} stroke="#3d7f98" strokeWidth="10" fill="none" />
                  <path d={`M${lens[0] + 10} ${lens[1] - R} L${lens[0] + 2} ${lens[1] - 30} L${lens[0] + 30} ${lens[1] + 14}`} stroke="#3d7f98" strokeWidth="7" fill="none" />
                </>
              ) : (
                AQ_GRAINS[i].map((g, k) => (
                  <ellipse
                    key={k}
                    cx={n1(lens[0] + g.x * (R / 80))}
                    cy={n1(lens[1] + g.y * (R / 80))}
                    rx={n1(g.rx * (R / 80))}
                    ry={n1(g.ry * (R / 80))}
                    transform={`rotate(${n1(g.a)} ${n1(lens[0] + g.x * (R / 80))} ${n1(lens[1] + g.y * (R / 80))})`}
                    fill={g.c}
                  />
                ))
              )}
              {/* vannpartikler i porene: farten viser permeabiliteten */}
              {Array.from({ length: 6 }, (_, k) => {
                const f = moving ? (t * speed + k / 6) % 1 : (k + 0.5) / 6;
                const y = i === 3 ? lens[1] - 10 + (k % 2) * 16 : lens[1] - R * 0.6 + (k % 3) * R * 0.6;
                const x = lens[0] - R + f * 2 * R;
                return <circle key={k} cx={n1(x)} cy={n1(i === 3 ? y + (x - lens[0]) * 0.18 : y)} r="3.4" fill="#e9f6ff" data-nocheck="" />;
              })}
            </g>
            <circle cx={lens[0]} cy={lens[1]} r={R} fill="none" stroke={ring} strokeWidth="4" data-nocheck="" />
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 3. To hydrogram ved siden av hverandre: regnflom og snøsmelteflom
 * ===================================================================== */

const HY_STEPS = ["Nedbør og smelting", "Vannføringen stiger", "Flomtopp", "Tilbake til grunnvannstilsig"];
const HY_STATUS = [
  "Nedbør og smelting: Regnflommen får mye vann på kort tid. Snøsmelteflommen får vann jevnt over lang tid. Elva har grunnvannstilsig hele tiden, så vannføringen er aldri null.",
  "Vannføringen stiger: Vannet trenger tid på å renne fra feltet til elva. Kurven stiger etter at nedbøren har startet.",
  "Flomtopp: Regnflommen får en spiss topp. Snøsmelteflommen får en bred topp. I en vårflom kan vannføringen øke til det mangedobbelte på få dager (Varsom, u.å.-b).",
  "Tilbake til grunnvannstilsig: Når tilførselen stopper, synker vannføringen mot grunnvannstilsiget igjen.",
];
const HY = { top: 70, base: 380, w: 380 };
const HY_X = [70, 540];
/** Loddrett avstand mellom panelene når de stables på mobil. */
const HY_STACK_DY = 470;
const HY_N = 60;
const yq = (q: number) => HY.base - q;
type Hy = { base: number; amp: number; tp: number; sr: number; sf: number };
const hyQ = (h: Hy, tt: number) => h.base + h.amp * Math.exp(-(((tt - h.tp) / (tt < h.tp ? h.sr : h.sf)) ** 2));
const HY_RAIN_BARS = [0.12, 0.15, 0.18, 0.21, 0.24].map((tt, k) => ({ tt, h: [18, 52, 62, 40, 14][k] }));
const HY_MELT_BARS = Array.from({ length: 14 }, (_, k) => ({ tt: 0.12 + k * 0.045, h: 10 + 14 * Math.sin((k / 13) * Math.PI) }));
const HY_REVEAL = [0.26, 0.62, 0.72, 1];

function hyRain(tett: number): Hy {
  return { base: 30 - 6 * tett, amp: 120 + 40 * tett, tp: 0.31 - 0.03 * tett, sr: 0.06 - 0.012 * tett, sf: 0.13 - 0.025 * tett };
}
const HY_SNOW: Hy = { base: 30, amp: 170, tp: 0.5, sr: 0.2, sf: 0.24 };

function HyPanel({
  x0,
  h,
  bars,
  barW,
  reveal,
  color,
  barColor,
  title,
  hi,
  centroid,
  scale,
}: {
  scale: number;
  x0: number;
  h: Hy;
  bars: { tt: number; h: number }[];
  barW: number;
  reveal: number;
  color: string;
  barColor: string;
  title: string;
  hi: number;
  centroid: number;
}) {
  const X = (tt: number) => x0 + tt * HY.w;
  const pts: Pt[] = [];
  for (let k = 0; k <= HY_N; k++) {
    const tt = (k / HY_N) * reveal;
    pts.push([X(tt), yq(hyQ(h, tt))]);
  }
  const area = `${polyPath(pts)} L${n1(X(reveal))} ${HY.base} L${x0} ${HY.base} Z`;
  return (
    <g>
      <text x={x0} y={42} fontSize={figureFont(20, scale)} fontWeight="800" fill={C.fg}>
        {title}
      </text>
      {/* tid- og vannføringsakse */}
      <path d={`M${x0} ${HY.base} L${x0 + HY.w + 6} ${HY.base}`} stroke={C.muted} strokeWidth="1.6" data-nocheck="" />
      <path d={`M${x0} 150 L${x0} ${HY.base}`} stroke={C.muted} strokeWidth="1.6" data-nocheck="" />
      {/* nedbør eller smelting som søyler fra toppen */}
      <path d={`M${x0} ${HY.top} L${x0 + HY.w} ${HY.top}`} stroke={C.dim} strokeWidth="1.2" data-nocheck="" />
      {bars.map((b) => (
        <rect key={b.tt} x={n1(X(b.tt) - barW / 2)} y={HY.top} width={barW} height={n1(b.h)} fill={barColor} opacity={hi >= 1 ? 1 : 0.4} />
      ))}
      {/* grunnvannstilsig */}
      <rect x={x0} y={yq(h.base)} width={HY.w} height={h.base} fill={C.teal} opacity="0.32" />
      <path d={`M${x0} ${yq(h.base)} L${x0 + HY.w} ${yq(h.base)}`} stroke={C.teal} strokeWidth="1.6" strokeDasharray="6 5" data-nocheck="" />
      {/* hydrogrammet */}
      <path d={area} fill={color} opacity="0.18" />
      <path d={polyPath(pts)} stroke={color} strokeWidth="3.4" fill="none" strokeLinejoin="round" />
      {/* forsinkelse fra nedbørens tyngdepunkt til flomtoppen */}
      {hi >= 3 ? (
        <g data-nocheck="">
          <path d={`M${n1(X(centroid))} 142 L${n1(X(h.tp))} 142`} stroke="#ffd77a" strokeWidth="2" />
          <path d={`M${n1(X(centroid))} 136 L${n1(X(centroid))} 148 M${n1(X(h.tp))} 136 L${n1(X(h.tp))} 148`} stroke="#ffd77a" strokeWidth="2" />
          <path d={`M${n1(X(h.tp))} 148 L${n1(X(h.tp))} ${n1(yq(h.base + h.amp) - 6)}`} stroke="#ffd77a" strokeWidth="1.2" strokeDasharray="3 4" />
        </g>
      ) : null}
    </g>
  );
}

export function HydrogramFigur({
  heading = "To hydrogram ved siden av hverandre: regnflom og snøsmelteflom",
  caption,
  initialStep,
}: VannFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3000, 1500, initialStep);
  const [tett, setTett] = useState(0);
  const { step, phase } = clock;
  const i = step - 1;
  const p = motion.playing ? smooth(phase) : 1;
  const reveal = lerp(i === 0 ? 0 : HY_REVEAL[i - 1], HY_REVEAL[i], p);
  const rain = hyRain(tett);
  const tettLabel = ["Ingen", "Noe", "Mye"][tett];
  // Smal visning (mobil): panelene stables loddrett, så hvert panel får hele bredden.
  const x1 = small ? HY_X[0] - 20 : HY_X[0];
  const x2 = small ? HY_X[0] - 20 : HY_X[1];
  const oy = small ? HY_STACK_DY : 0;
  const rx = (tt: number) => x1 + tt * HY.w;
  const sx = (tt: number) => x2 + tt * HY.w;
  const Y = (y: number) => y + oy;
  const labels: Lab[] = [
    { text: "Nedbør", x: rx(0.4), y: 104, at: [rx(0.2), 100], color: C.rain, badge: [rx(0.3), 104] },
    { text: "Snøsmelting", x: sx(0.78), y: Y(104), at: [sx(0.7), Y(86)], color: P.snow, badge: [sx(0.82), Y(100)] },
    { text: "Grunnvannstilsig", x: rx(0.98), y: 404, at: [rx(0.9), yq(rain.base) + 10], color: C.teal, anchor: "end", badge: [rx(0.9), yq(rain.base) - 18] },
    { text: "Grunnvannstilsig", x: sx(0.98), y: Y(404), at: [sx(0.9), Y(yq(HY_SNOW.base) + 10)], color: C.teal, anchor: "end", badge: [sx(0.92), Y(yq(HY_SNOW.base) - 18)] },
  ];
  labels.push(
    { text: "Regnflom: timer til døgn", x: x1, y: 444, at: [rx(0.5), HY.base + 2], color: C.muted, size: 15, badge: [rx(0.5), HY.base + 22] },
    { text: "Snøsmelteflom: dager til uker", x: x2, y: Y(444), at: [sx(0.5), Y(HY.base + 2)], color: C.muted, size: 15, badge: [sx(0.5), Y(HY.base + 22)] },
  );
  if (step >= 3) {
    labels.push(
      { text: "Spiss flomtopp", x: rx(0.48), y: Math.max(n1(yq(rain.base + rain.amp) + 6), 190), at: [rx(rain.tp) + 4, yq(rain.base + rain.amp) + 4], color: C.warm, badge: [rx(rain.tp) + 26, yq(rain.base + rain.amp) + 6] },
      { text: "Bred flomtopp", x: sx(0.8), y: Y(n1(yq(HY_SNOW.base + HY_SNOW.amp) + 10)), at: [sx(0.66), Y(yq(hyQ(HY_SNOW, 0.66)))], color: "#b9d3ee", badge: [sx(0.74), Y(yq(hyQ(HY_SNOW, 0.66)) - 16)] },
      { text: "Forsinkelse", x: rx(0.38), y: 148, at: [rx(0.3), 142], color: "#ffd77a", badge: [rx(0.08), 200] },
    );
  }
  const keys: Key[] = [
    { text: "Vannføring", color: C.warm, kind: "line" },
    { text: "Grunnvannstilsig", color: C.teal, kind: "fill" },
    { text: "Nedbør eller smelting", color: C.rain, kind: "fill" },
  ];
  const status =
    HY_STATUS[i] +
    (tett > 0 ? " Tette flater som asfalt og tak slipper lite vann ned i bakken. Vannet renner raskere av, så flomtoppen kommer tidligere og blir høyere, og mindre vann går til grunnvannet. (NVE, u.å.-i)" : "");
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="To hydrogram ved siden av hverandre med samme akse for vannføring. Til venstre en regnflom med kort, kraftig nedbør og spiss, tidlig flomtopp. Til høyre en snøsmelteflom med lang smelting og bred flomtopp. Begge ligger over grunnvannstilsiget"
        heading={heading}
        caption={
          caption ??
          "Vannføringen tegnet mot tid. Søylene øverst viser vannet som kommer inn, kurven viser vannføringen i elva. Begge panelene har samme akse for vannføring og ligger over grunnvannstilsiget. Skyveren viser hva tette flater gjør med regnflommen. Forenklet: kurvene er skjematiske og uten tall (Varsom, u.å.-a; Varsom, u.å.-b)."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <>
            <StegRamme small={small}>
              <StegVelger labels={HY_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg del av flommen" />
            </StegRamme>
            <Skyver
              label="Tette flater (regnflom)"
              min={0}
              max={2}
              step={1}
              value={tett}
              onChange={setTett}
              valueLabel={tettLabel}
              valueText={`${tettLabel} tette flater i nedbørfeltet`}
            />
          </>
        }
        status={status}
        labels={labels}
        keys={keys}
        notes={["Samme akse for vannføring i begge panelene", "Tiden går mot høyre", "Skjematisk, uten målestokk."]}
        viewBox={small ? `0 0 ${HY.w + 90} ${HY_STACK_DY + 456}` : "0 0 960 456"}
        forceNarrow={small}
      >
        {({ scale }) => (
          <g className={motion.motionClass} data-figur="hydrogram" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <HyPanel x0={x1} h={rain} bars={HY_RAIN_BARS} barW={10} reveal={reveal} color={C.warm} barColor={C.rain} title="Regnflom" hi={step} centroid={0.18} scale={scale} />
            <g transform={`translate(0 ${oy})`}>
              <HyPanel x0={x2} h={HY_SNOW} bars={HY_MELT_BARS} barW={13} reveal={reveal} color="#b9d3ee" barColor={P.snow} title="Snøsmelteflom" hi={step} centroid={0.41} scale={scale} />
            </g>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 4. Hans 2023: tre døgns nedbør mot rekorden fra 1938
 * ===================================================================== */

const HANS = [
  { sted: "Geilo", gammel: 107, ny: 111 },
  { sted: "Vang i Valdres", gammel: 128, ny: 139 },
];
const HANS_Y0 = 330;
const HANS_K = 1.4;

export function HansNedborFigur({ heading = "Hans 2023: tre døgn med rekordnedbør", caption }: { heading?: string; caption?: ReactNode }) {
  const [vis, setVis] = useState(3);
  const labels: Lab[] = [];
  return (
    <IsbreFigur
      title="Søylediagram: nedbør over tre døgn under Hans 8.–10. august 2023 mot rekorden fra 1938. Geilo 111 mm mot 107 mm. Vang i Valdres 139 mm mot 128 mm"
      heading={heading}
      caption={
        caption ??
        "Nedbør over tre døgn ved to stasjoner med mer enn 100 års målinger. Begge satte ny rekord under Hans, og slo rekorden fra 1938 (MET, 2023)."
      }
      toolbar={
        <StegVelger labels={["1938", "2023", "Begge"]} step={vis} onStep={setVis} label="Vis år" />
      }
      status={
        vis === 1
          ? "1938: Geilo 107 mm og Vang i Valdres 128 mm på tre døgn."
          : vis === 2
            ? "Hans, 8.–10. august 2023: Geilo 111 mm og Vang i Valdres 139 mm på tre døgn."
            : "Begge stasjonene fikk mer nedbør under Hans enn i 1938: Geilo 111 mot 107 mm, Vang i Valdres 139 mot 128 mm."
      }
      labels={labels}
      keys={[
        { text: "1938", color: "#8b9aa6", kind: "fill" },
        { text: "Hans 2023", color: C.warm, kind: "fill" },
      ]}
      notes={["Nedbør i millimeter over tre døgn", "Kilde: MET (2023)"]}
      remark="Uværet varte 7.–9. august. METs tredagersmålinger er registrert 8.–10. august."
      viewBox="0 0 640 400"
    >
      {({ scale }) => {
        const fs = scale > 0 ? Math.max(15, 12.5 / scale) : 15;
        return (
          <g data-figur="hans" data-step={vis}>
            {[50, 100].map((v) => (
              <g key={v}>
                <path d={`M20 ${HANS_Y0 - v * HANS_K} L620 ${HANS_Y0 - v * HANS_K}`} stroke={C.dim} strokeWidth="1.2" />
                <text x="20" y={HANS_Y0 - v * HANS_K - 6} fontSize={n1(fs)} fill={C.muted}>
                  {v} mm
                </text>
              </g>
            ))}
            <path d={`M20 ${HANS_Y0} L620 ${HANS_Y0}`} stroke={C.muted} strokeWidth="1.6" />
            {HANS.map((s, k) => {
              const gx = 150 + k * 250;
              const bars = [
                { v: s.gammel, x: gx, c: "#8b9aa6", on: vis !== 2 },
                { v: s.ny, x: gx + 96, c: C.warm, on: vis !== 1 },
              ];
              return (
                <g key={s.sted}>
                  {bars.map((b) => (
                    <g key={b.x} opacity={b.on ? 1 : 0.18}>
                      <rect x={b.x} y={n1(HANS_Y0 - b.v * HANS_K)} width="80" height={n1(b.v * HANS_K)} rx="3" fill={b.c} />
                      {b.on ? (
                        <text x={b.x + 40} y={n1(HANS_Y0 - b.v * HANS_K - 9)} textAnchor="middle" fontSize={n1(fs * 1.1)} fontWeight="800" fill={C.fg}>
                          {b.v} mm
                        </text>
                      ) : null}
                    </g>
                  ))}
                  <text x={gx + 88} y={HANS_Y0 + 32} textAnchor="middle" fontSize={n1(fs * 1.1)} fontWeight="700" fill={C.fg}>
                    {s.sted}
                  </text>
                </g>
              );
            })}
          </g>
        );
      }}
    </IsbreFigur>
  );
}
