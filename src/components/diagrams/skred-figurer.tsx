/**
 * Figurene i Geofag 1: Skred.
 *
 * Samme ramme som Isbreer, Landformer, Norges geologi, Bergarter og Vann og flom (IsbreFigur, StegVelger,
 * Skyver og isbre-kit): nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og
 * redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten (src/lib/posts/skred.md) og kildene der (NVE, NGU). Figurene har
 * ingen tall som ikke står i teksten. Snitt og kraftmodell er skjematiske og uten målestokk.
 */
import { useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, Skyver, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, lerp, pickStep, smooth, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";

type Pt = [number, number];
const n1 = (v: number) => Math.round(v * 10) / 10;
const poly = (list: readonly Pt[]) => list.map(([x, y], i) => `${i ? "L" : "M"}${n1(x)} ${n1(y)}`).join(" ");

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

function Hus({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`rotate(${n1(rot)} ${n1(x)} ${n1(y)})`}>
      <rect x={n1(x - 16)} y={n1(y - 22)} width="32" height="22" fill="#c9b9a6" />
      <path d={`M${n1(x - 20)} ${n1(y - 21)} L${n1(x)} ${n1(y - 38)} L${n1(x + 20)} ${n1(y - 21)} Z`} fill="#8f3f35" />
      <rect x={n1(x - 4)} y={n1(y - 12)} width="8" height="12" fill="#5b4a3a" />
    </g>
  );
}

/* =====================================================================
 * 1. Kvikkleireskred som sprer seg bakover (retrogressivt)
 * ===================================================================== */

const KV_STEPS = ["Bekken graver", "Første utglidning", "Kanten mister støtten", "Sprer seg bakover", "Likevekt"];
const KV_STATUS = [
  "Bekken graver: Erosjon i bekken gjør foten av skråningen brattere, år etter år. Under tørrskorpa ligger en lomme med kvikkleire.",
  "Første utglidning: Foten svikter. Kvikkleira kollapser, blir omrørt og flyter unna som en væske.",
  "Kanten mister støtten: Leira bak har ikke lenger noe som holder den. Den svikter også, og mer omrørt leire renner ut.",
  "Sprer seg bakover: Skredet sprer seg bakover og sideveis. Derfor kan det ta med seg et nesten flatt jorde bak skråningen.",
  "Likevekt: Skredet stopper når lommen er tømt, eller når skredmassene fyller gropa og det blir likevekt.",
];
/** Bakkanten av skredgropa (x) i hvert steg. */
const KV_EDGE = [842, 724, 590, 352, 352];
const KV_TOP = 210;
const KV_FLOOR = 352;
const KV_HOUSES: Pt[] = [
  [200, KV_TOP],
  [430, KV_TOP],
];

export function KvikkleireBakoverFigur({
  heading = "Kvikkleireskred som sprer seg bakover",
  caption,
  initialStep,
}: {
  heading?: string;
  caption?: ReactNode;
  initialStep?: number;
}) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(5, motion.playing && visible, 3600, 1600, initialStep);
  const { step, phase } = clock;
  const i = step - 1;
  const p = motion.playing ? smooth(phase) : 1;
  const edge = lerp(i === 0 ? KV_EDGE[0] : KV_EDGE[i - 1], KV_EDGE[i], p);
  const fill = i === 4 ? lerp(0, 1, p) : 0;
  const debris = [0, 0.3, 0.55, 0.9, 1][i] * (i === 0 ? 0 : 1);
  const opened = edge < 830;
  // terreng: flatt jorde, skråning ned mot bekken, bekk og dalbunn
  const ground: Pt[] = opened
    ? [
        [0, KV_TOP],
        [edge, KV_TOP],
        [edge + 26, KV_FLOOR],
        [826, KV_FLOOR - 16],
        [846, 346],
        [960, 344],
      ]
    : [
        [0, KV_TOP],
        [640, KV_TOP],
        [700, 236],
        [790, 312],
        [818, 340 + (step === 1 ? p * 8 : 0)],
        [846, 346],
        [960, 344],
      ];
  const groundPath = `${poly(ground)} L960 520 L0 520 Z`;
  const pitTop = KV_FLOOR - 26 - fill * 46;
  const debrisPath = opened
    ? `M${n1(edge + 26)} ${KV_FLOOR} L${n1(edge + 26)} ${n1(KV_FLOOR - 6 - debris * 14 - fill * 60)} C${n1(edge + 120)} ${n1(pitTop)} 760 ${n1(KV_FLOOR - 28 - debris * 6)} 846 ${n1(340 - debris * 10)} L960 ${n1(338 - debris * 8)} L960 346 L846 346 L826 ${KV_FLOOR - 16} Z`
    : "";
  const houseIn = edge < KV_HOUSES[1][0] + 20;
  const labels: Lab[] = [
    { text: "Nesten flatt jorde", x: 40, y: 60, at: [140, KV_TOP - 4], color: C.fg, badge: [110, 180] },
  ];
  if (step === 1) {
    labels.push(
      { text: "Bekken graver i foten", x: 920, y: 60, at: [826, 336], color: C.rain, anchor: "end", badge: [880, 300] },
      { text: "Lomme med kvikkleire", x: 520, y: 110, at: [540, 330], color: "#d7c38f", badge: [560, 300] },
      { text: "Tørrskorpe", x: 300, y: 110, at: [300, 222], color: "#d9c39a", badge: [300, 250] },
    );
  } else if (step === 2 || step === 3) {
    labels.push(
      { text: "Omrørt leire flyter unna", x: 920, y: 60, at: [900, 334], color: "#e4d6b0", anchor: "end", badge: [910, 300] },
      { text: step === 2 ? "Foten svikter" : "Kanten mister støtten", x: 560, y: 110, at: [edge + 10, KV_TOP + 20], color: C.low, badge: [edge - 20, 180] },
    );
  } else if (step === 4) {
    labels.push(
      { text: "Sprer seg bakover", x: 560, y: 110, at: [edge + 10, KV_TOP + 20], color: C.low, badge: [edge - 20, 180] },
      { text: "Huset følger med", x: 920, y: 60, at: [470, 330], color: C.fg, anchor: "end", badge: [500, 290] },
    );
  } else {
    labels.push(
      { text: "Skredmassene fyller gropa", x: 560, y: 110, at: [560, n1(pitTop + 20)], color: "#e4d6b0", badge: [600, 290] },
      { text: "Lommen er tømt", x: 920, y: 60, at: [edge + 18, KV_FLOOR - 40], color: C.low, anchor: "end", badge: [edge + 50, 250] },
    );
  }
  const keys: Key[] = [
    { text: "Marin leire", color: "#6d6a5e", kind: "fill" },
    { text: "Kvikkleire", color: "#a8935a", kind: "fill" },
    { text: "Omrørt leire", color: "#c9b98e", kind: "fill" },
    { text: "Tørrskorpe", color: "#7d6a4f", kind: "fill" },
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt gjennom et nesten flatt jorde, en skråning og en bekk. Under tørrskorpa ligger marin leire med en lomme kvikkleire. I fem steg graver bekken i foten, foten svikter, leira flyter unna, kanten bak mister støtten, og skredet sprer seg bakover til lommen er tømt og massene fyller gropa"
        heading={heading}
        caption={
          caption ??
          "Bekken graver i foten, leira flyter unna, og kanten bak mister støtten. Skredet sprer seg bakover og sideveis til lommen er tømt, eller til skredmassene fyller gropa og det blir likevekt. Forenklet: snittet er skjematisk og uten målestokk (NVE, 2021b; NGU, u.å.-b)."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={KV_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg steg i skredet" />
          </StegRamme>
        }
        status={KV_STATUS[i]}
        labels={labels}
        keys={keys}
        notes={["Skjematisk, uten målestokk", "Høyden er overdrevet"]}
        remark="Eksempel fra teksten: Kvikkleireskredet på Ask i Gjerdrum 30. desember 2020 målte 240 × 700 meter, og 1,35 millioner kubikkmeter raste ut (NVE, 2023a)."
        viewBox="0 0 960 520"
      >
        {({ d }) => (
          <g className={motion.motionClass} data-figur="kvikkleire" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id="kv-lomme">
                <rect x="0" y="0" width={n1(edge + 26)} height="520" />
              </clipPath>
              <clipPath id="kv-ground">
                <path d={groundPath} />
              </clipPath>
            </defs>
            <rect x="0" y="0" width="960" height="520" fill={d.url.sky} />
            <g clipPath="url(#kv-ground)">
              <rect x="0" y="0" width="960" height="520" fill="#6d6a5e" />
              <rect x="0" y="0" width="960" height="520" fill={d.url.strata} opacity="0.4" data-nocheck="" />
              {/* kvikkleirelommen: bare den delen som ikke har rast ut */}
              <path clipPath="url(#kv-lomme)" d={`M780 262 L250 262 C236 290 250 340 300 350 L760 350 C790 340 800 320 780 300 L780 262 Z`} fill={opened && i === 4 ? "#6d6a5e" : "#a8935a"} />
              <path d={`M0 ${KV_TOP} L960 ${KV_TOP} L960 ${KV_TOP + 30} L0 ${KV_TOP + 30} Z`} fill="#7d6a4f" />
              <path d="M0 440 C160 430 300 452 480 436 C640 422 800 446 960 432 L960 520 L0 520 Z" fill={d.url.rock} />
            </g>
            <path d={poly(ground)} stroke="#2e3a26" strokeWidth="2" fill="none" data-nocheck="" />
            {/* bekken */}
            <path d="M806 340 L846 340 L846 348 L806 348 Z" fill={P.water} />
            {debrisPath ? <path d={debrisPath} fill="#c9b98e" opacity="0.95" /> : null}
            {/* gress på jordet */}
            <path d={`M0 ${KV_TOP} L${n1(opened ? edge : 640)} ${KV_TOP}`} stroke={P.grass} strokeWidth="4" data-nocheck="" />
            {KV_HOUSES.map(([x, y], k) =>
              k === 1 && houseIn ? (
                <Hus key={k} x={n1(Math.max(edge + 60, 420))} y={n1(pitTop + 4)} rot={-24} />
              ) : (
                <Hus key={k} x={x} y={y} />
              ),
            )}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 2. Krefter i en skråning: helning og vanninnhold
 * ===================================================================== */

const KR_ANGLES = [15, 22, 30, 37, 44];
const KR_ANGLE_TXT = ["Slak", "Middels", "Bratt", "Svært bratt", "Brattest"];
const KR_WATER_TXT = ["Tørr", "Fuktig", "Vannmettet"];
const KR_PIVOT: Pt = [90, 440];
const KR_LEN = 560;

export function SkredKrefterFigur({ heading = "Krefter i en skråning: helning og vann", caption }: { heading?: string; caption?: ReactNode }) {
  const [a, setA] = useState(2);
  const [w, setW] = useState(0);
  const th = (KR_ANGLES[a] * Math.PI) / 180;
  const ux = Math.cos(th);
  const uy = -Math.sin(th);
  const top: Pt = [KR_PIVOT[0] + KR_LEN * ux, KR_PIVOT[1] + KR_LEN * uy];
  // normal ut av skråningen
  const nx = Math.sin(th);
  const ny = Math.cos(th);
  const nrm: Pt = [-nx, -ny];
  const band = 46;
  const along = (s: number, h: number): Pt => [KR_PIVOT[0] + s * ux + h * nrm[0], KR_PIVOT[1] + s * uy + h * nrm[1]];
  const soil = [along(0, 0), along(KR_LEN, 0), along(KR_LEN, band), along(0, band)];
  const gwH = [band * 0.12, band * 0.55, band * 0.98][w];
  const water = [along(0, 0), along(KR_LEN, 0), along(KR_LEN, gwH), along(0, gwH)];
  const c = along(KR_LEN * 0.5, band * 0.5);
  const drive = Math.sin(th);
  const hold = Math.cos(th) * (1 - 0.4 * [0, 0.5, 1][w]) * 0.72 + 0.06;
  const slides = drive > hold;
  const L = 150;
  const g: Pt = [c[0], c[1] + L];
  const dr: Pt = [c[0] - ux * L * drive, c[1] - uy * L * drive];
  const hd: Pt = [c[0] + ux * L * hold, c[1] + uy * L * hold];
  const block = [along(KR_LEN * 0.5 - 34, 0), along(KR_LEN * 0.5 + 34, 0), along(KR_LEN * 0.5 + 34, band), along(KR_LEN * 0.5 - 34, band)];
  const shift = slides ? 0 : 0;
  const labels: Lab[] = [
    { text: "Tyngdekraft", x: 40, y: 484, at: [g[0] - 2, g[1] - 10], color: C.fg, badge: [g[0] - 24, g[1] - 10] },
    { text: "Drivende kraft", x: 40, y: 132, at: [dr[0] + ux * 10, dr[1] + uy * 10], color: C.low, badge: [dr[0] - 18, dr[1] + 18] },
    { text: "Holdende: friksjon og kohesjon", x: 40, y: 60, at: [hd[0] - ux * 10, hd[1] - uy * 10], color: C.teal, badge: [hd[0] + 4, hd[1] - 26] },
  ];
  if (w > 0)
    labels.push({ text: "Vann i porene", x: 920, y: 470, at: along(KR_LEN * 0.82, gwH * 0.5), color: "#9fe3ea", anchor: "end", badge: along(KR_LEN * 0.82, -22) });
  const keys: Key[] = [
    { text: "Drivende kraft", color: C.low, kind: "line" },
    { text: "Holdende kraft", color: C.teal, kind: "line" },
    { text: "Grunnvann i løsmassen", color: "#3d7f98", kind: "fill" },
  ];
  const status = `${KR_ANGLE_TXT[a]} skråning, ${KR_WATER_TXT[w].toLowerCase()} løsmasse: ${
    slides
      ? "De drivende kreftene er større enn de holdende. Massen glir ut."
      : "De holdende kreftene er større enn de drivende. Skråningen står."
  }${w === 2 ? " Vann i porene presser kornene fra hverandre, så friksjonen blir mindre." : ""}`;
  return (
    <IsbreFigur
      title="Skråning med et lag løsmasse og en blokk. Tyngdekraften er delt i en drivende del langs skråningen og en del inn i skråningen. Den holdende kraften er friksjon og kohesjon. Skyverne endrer helningen og vanninnholdet, og søylene viser om de drivende eller holdende kreftene er størst"
      heading={heading}
      caption={
        caption ??
        "Bare den delen av tyngdekraften som peker langs skråningen, driver massen nedover. Jo brattere skråningen er, jo større blir den delen. Mot den står friksjon og kohesjon. Mer vann i løsmassene gjør friksjonen mindre. Jordskred kan utløses av kraftig eller vedvarende regn, snøsmelting og høyt vanninnhold i løsmassene (NVE, 2020a). Forenklet modell uten tall og uten målestokk."
      }
      toolbar={
        <>
          <Skyver label="Helning" min={0} max={4} step={1} value={a} onChange={setA} valueLabel={KR_ANGLE_TXT[a]} valueText={`${KR_ANGLE_TXT[a]} skråning`} />
          <Skyver label="Vanninnhold" min={0} max={2} step={1} value={w} onChange={setW} valueLabel={KR_WATER_TXT[w]} valueText={`${KR_WATER_TXT[w]} løsmasse`} />
        </>
      }
      status={status}
      labels={labels}
      keys={keys}
      notes={["Forenklet modell", "Skjematisk, uten målestokk"]}
      viewBox="0 0 960 500"
    >
      {({ d, m }) => (
        <g data-figur="krefter" data-step={`${a}-${w}`} data-glir={slides ? "ja" : "nei"}>
          <rect x="0" y="0" width="960" height="500" fill={d.url.sky} />
          <path d={`${poly([KR_PIVOT, top])} L${n1(top[0])} 500 L0 500 L0 ${KR_PIVOT[1]} Z`} fill={d.url.rock} />
          <path d={`${poly(soil)} Z`} fill="#8d7d66" />
          <path d={`${poly(water)} Z`} fill="#3d7f98" opacity="0.85" />
          <path d={`${poly(block)} Z`} fill={slides ? "#b0745e" : "#a3927a"} stroke={slides ? C.low : "#2e3a26"} strokeWidth="2" transform={`translate(${shift} 0)`} />
          {w > 0
            ? Array.from({ length: 9 }, (_, k) => {
                const x = 640 + (k % 3) * 90 + (k > 2 ? 30 : 0);
                const y = 170 + Math.floor(k / 3) * 50;
                return <path key={k} d={`M${x} ${y} L${x - 6} ${y + 16}`} stroke={C.rain} strokeWidth="2" data-nocheck="" opacity={w === 2 ? 1 : 0.55} />;
              })
            : null}
          {/* kraftpiler */}
          <path d={poly([c, g])} stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
          <path d={poly([c, dr])} stroke={C.low} strokeWidth="4" markerEnd={`url(#${m.warm})`} />
          <path d={poly([c, hd])} stroke={C.teal} strokeWidth="4" markerEnd={`url(#${m.teal})`} />
          {/* søyler: drivende mot holdende */}
          <g>
            <rect x="600" y="380" width="340" height="104" rx="8" fill="#0b1318" opacity="0.88" />
            <text x="616" y="410" fontSize="15" fontWeight="700" fill={C.low}>Drivende</text>
            <rect x="716" y="397" width={n1(200 * drive)} height="16" fill={C.low} />
            <text x="616" y="446" fontSize="15" fontWeight="700" fill={C.teal}>Holdende</text>
            <rect x="716" y="433" width={n1(200 * hold)} height="16" fill={C.teal} />
            <text x="616" y="474" fontSize="15" fontWeight="800" fill={slides ? C.low : C.teal}>{slides ? "Massen glir" : "Skråningen står"}</text>
          </g>
        </g>
      )}
    </IsbreFigur>
  );
}
