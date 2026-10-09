/**
 * Figurene i Geofag 1: Norges geologiske historie (Kaledonidene, Oslograben, åpningen av Norskehavet).
 *
 * Bygger på samme ramme som Isbreer og Landformer (IsbreFigur, StegVelger, Skyver og isbre-kit), så
 * kapitlene får samme stil: nummermerker og liste på mobil, Start/Pause, steg og redusert bevegelse.
 *
 * Alle tall og navn i figurene står i kapittelteksten (src/routes/geofag-1/norges-geologi.tsx) eller i
 * Geofag 1-biblioteket (NGU-tall). Alt annet er tegnet skjematisk uten tall. Geometrien er enkel
 * (noen hundre punkter per bilde), og kystlinjene til kartinnfeltene er ferdig projisert i norgesgeo-kart.ts,
 * så ingenting tungt beregnes under serverrendering.
 */
import { useEffect, useId, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, Skyver, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, clamp, lerp, pickStep, smooth, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";
import {
  KART_BELTGR,
  KART_BELTNO,
  KART_BRITAIN,
  KART_EURASIA,
  KART_ICELAND,
  KART_LAURENTIA,
  KART_STED,
} from "./norgesgeo-kart";

export type NorgesGeoFigurProps = {
  /** Overskrift over figuren. */
  heading?: string;
  /** Bildetekst under figuren. */
  caption?: ReactNode;
  /** Steg som vises først (1-basert). */
  initialStep?: number;
};

/* ---------- små verktøy ---------- */

/** Avrunder til én desimal, så server og nettleser skriver like tall i SVG-en. */
const n1 = (v: number) => Math.round(v * 10) / 10;
const fx = (v: number) => n1(v).toString();

/** Polygon mellom to kurver top(x) og bot(x) fra x0 til x1. */
function band(top: (x: number) => number, bot: (x: number) => number, x0: number, x1: number, dx = 8) {
  const xs: number[] = [];
  for (let x = x0; x < x1; x += dx) xs.push(x);
  xs.push(x1);
  const a = xs.map((x) => `${fx(x)} ${fx(top(x))}`);
  const b = xs.reverse().map((x) => `${fx(x)} ${fx(bot(x))}`);
  return `M${a.join(" L")} L${b.join(" L")} Z`;
}
/** Åpen sti langs en kurve. */
function curve(f: (x: number) => number, x0: number, x1: number, dx = 8) {
  const out: string[] = [];
  for (let x = x0; x < x1; x += dx) out.push(`${fx(x)} ${fx(f(x))}`);
  out.push(`${fx(x1)} ${fx(f(x1))}`);
  return `M${out.join(" L")}`;
}
const gauss = (x: number, c: number, w: number) => Math.exp(-(((x - c) / w) ** 2));

/**
 * Er figuren smal (nummermerker og liste)? Samme regel som IsbreFigur: figurens indre bredde
 * under NARROW_FIGURE_PX. Indre bredde = ytre bredde minus ramme og innrykk i FigureFrame
 * (2 × 1 px kant + 2 × 8 px under sm, 2 × 20 px fra sm). Trengs for å legge kartinnfeltet og
 * etikettene om på smal skjerm (se kit-behov i rapporten).
 */
function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

/** Steg-tilstand: interpolerer fra forrige til dette stegets nøkkelbilde mens steget spilles. */
function keyframe<T extends Record<string, number>>(frames: T[], step: number, phase: number): T {
  const to = frames[step - 1];
  const from = step > 1 ? frames[step - 2] : to;
  const t = smooth(phase);
  const out = {} as Record<string, number>;
  for (const k of Object.keys(to)) out[k] = lerp(from[k], to[k], t);
  return out as T;
}

/* ---------- kartinnfelt (Nord-Atlanteren) ---------- */

type KartTilstand = {
  /** Flytting og dreiing av Laurentia/Grønland (kartenheter og grader). 0, 0, 0 = dagens plass. */
  dx: number;
  dy: number;
  rot: number;
  /** Synlighet 0–1 for Island, De britiske øyer, Kaledonide-beltene og spredningsryggen. */
  island: number;
  britain: number;
  belt: number;
  ridge: number;
};
/** Dreiepunkt for Grønland i kartkoordinater. */
const KART_PIVOT = [-150, -60] as const;
/** Kontinentene samlet (før Atlanterhavet åpnet seg). Skjematisk tilpasning, ikke en rekonstruksjon. */
export const KART_SAMLET = { dx: 165, dy: 55, rot: -24 };

/** Punkt i Laurentia-koordinater flyttet slik kartet viser det. */
function laurentiaPunkt(p: readonly [number, number], k: KartTilstand): [number, number] {
  const a = (k.rot * Math.PI) / 180;
  const x = p[0] - KART_PIVOT[0];
  const y = p[1] - KART_PIVOT[1];
  return [
    KART_PIVOT[0] + x * Math.cos(a) - y * Math.sin(a) + k.dx,
    KART_PIVOT[1] + x * Math.sin(a) + y * Math.cos(a) + k.dy,
  ];
}

function KartInnfelt({
  x,
  y,
  w,
  win,
  k,
  ridgePath,
  children,
}: {
  x: number;
  y: number;
  w: number;
  /** Kartutsnitt [x0, y0, bredde, høyde] i kartkoordinater. */
  win: [number, number, number, number];
  k: KartTilstand;
  ridgePath?: string;
  children?: ReactNode;
}) {
  const clip = `${useId().replace(/:/g, "")}-kart`;
  const s = w / win[2];
  const h = win[3] * s;
  const lt = `translate(${fx(k.dx)} ${fx(k.dy)}) rotate(${fx(k.rot)} ${KART_PIVOT[0]} ${KART_PIVOT[1]})`;
  return (
    <g data-nocheck="" data-kart="">
      <defs>
        <clipPath id={clip}>
          <rect x={x} y={y} width={w} height={h} rx="8" />
        </clipPath>
      </defs>
      <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="10" fill={P.halo} opacity="0.85" />
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={w} height={h} fill="#16384d" />
        <g transform={`translate(${fx(x)} ${fx(y)}) scale(${s.toFixed(4)}) translate(${-win[0]} ${-win[1]})`}>
          <path d={KART_EURASIA} fill="#8c8a72" stroke="#c9c3a4" strokeWidth={1.2 / s} />
          {k.britain > 0.01 ? (
            <path d={KART_BRITAIN} fill="#8c8a72" stroke="#c9c3a4" strokeWidth={1.2 / s} opacity={k.britain} />
          ) : null}
          {k.belt > 0.01 ? (
            <path d={KART_BELTNO} fill="#b9705a" opacity={0.85 * k.belt} />
          ) : null}
          <g transform={lt}>
            <path d={KART_LAURENTIA} fill="#9a8466" stroke="#d3c19f" strokeWidth={1.2 / s} />
            {k.belt > 0.01 ? (
              <path d={KART_BELTGR} fill="#b9705a" opacity={0.85 * k.belt} />
            ) : null}
          </g>
          {k.island > 0.01 ? (
            <path d={KART_ICELAND} fill="#8c8a72" stroke="#c9c3a4" strokeWidth={1.2 / s} opacity={k.island} />
          ) : null}
          {ridgePath && k.ridge > 0.01 ? (
            <path
              d={ridgePath}
              fill="none"
              stroke="#f08a5d"
              strokeWidth={4 / s}
              strokeDasharray={`${10 / s} ${5 / s}`}
              opacity={k.ridge}
            />
          ) : null}
          {children}
        </g>
      </g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="none" stroke="#9fb4c2" strokeWidth="1.5" />
    </g>
  );
}
/** Kartpunkt → figurkoordinater for et innfelt. */
function kartTilFigur(p: readonly [number, number], x: number, y: number, w: number, win: number[]) {
  const s = w / win[2];
  return [n1(x + (p[0] - win[0]) * s), n1(y + (p[1] - win[1]) * s)] as [number, number];
}

/* =====================================================================
 * 1. Kaledonidene: Iapetushavet lukkes, kollisjon og skyvedekker
 * ===================================================================== */

const KA_STEPS = ["1 Iapetushavet", "2 Havet lukkes", "3 Kollisjon", "4 I dag"];
const KA_STATUS = [
  "Mellom Baltika og Laurentia lå Iapetushavet. Havbunnen sank ned i mantelen langs kanten av havet. Leka-ofiolitten er en bit av denne havbunnen, dannet for ca. 497 millioner år siden.",
  "Havet lukkes, og Baltika og Laurentia nærmer seg. Noen biter av havbunnen ble skjøvet opp på kanten av et kontinent i stedet for å synke ned (obduksjon). Leka ble trolig skjøvet opp for ca. 470 millioner år siden.",
  "Kontinentene kolliderer (400–500 millioner år siden). Kontinental skorpe er for lett til å synke ned i mantelen, så skorpa presses sammen. Bergflak fra havbunn, øybuer og kontinentalrender skyves østover inn over det baltiske grunnfjellet som skyvedekker, og Kaledonidene reiser seg.",
  "I dag er fjellkjeden erodert ned til røttene. Restene av skyvedekkene ligger oppå grunnfjellet, for eksempel Jotundekket i Jotunheimen. Atlanterhavet åpnet seg mye senere, så Grønland (Laurentia) ligger nå langt mot vest.",
];
const KA_SEA = 300;
/** Toppen av det baltiske grunnfjellet under fjellkjeden (heller vestover inn under Laurentia). */
const kaG = (x: number) => 305 + Math.max(0, 780 - x) * 0.36;
/** Overflaten i fjellkjeden (Kaledonidene) og i dag (erodert). */
const kaMountain = (x: number) => KA_SEA - 175 * gauss(x, 440, 190);
const kaToday = (x: number) =>
  x < 336 ? lerp(430, 304, smooth((x - 180) / 156)) : 292 - 72 * gauss(x, 560, 105) - 6 * Math.sin(x / 19) * gauss(x, 560, 160);
/** Skyvedekkenes fronter (lengst øst) i kollisjonen. */
const KA_FRONT = [845, 745, 645];
const kaFault = (k: number, x: number, fronts: number[]) => {
  // underkanten av dekke k (0 = nederst): grunnfjellet minus tykkelsen av dekkene under
  let y = kaG(x);
  if (k >= 1) y -= 34 * clamp((fronts[1] - x) / 70);
  if (k >= 2) y -= 50 * clamp((fronts[2] - x) / 70);
  return y;
};
const KA_NAPPE_FILL = ["#a39a6a", "#4f7d61", "#6f7396"];

type KaState = {
  /** Vestkanten av Baltika i havbildet (steg 1–2). */
  bx: number;
  /** 0 = hav mellom kontinentene, 1 = kollisjon. */
  coll: number;
  /** Hvor langt skyvedekkene har kommet (0–1). */
  thrust: number;
  /** Fjellkjedens høyde (0–1) og erosjon i dag (0–1). */
  rise: number;
  erode: number;
  /** Havbunn skjøvet opp på land (0–1). */
  obd: number;
};
const KA_FRAMES: KaState[] = [
  { bx: 650, coll: 0, thrust: 0, rise: 0, erode: 0, obd: 0 },
  { bx: 470, coll: 0, thrust: 0, rise: 0, erode: 0, obd: 1 },
  { bx: 340, coll: 1, thrust: 1, rise: 1, erode: 0, obd: 1 },
  { bx: 340, coll: 1, thrust: 1, rise: 1, erode: 1, obd: 1 },
];
const KA_KART: KartTilstand[] = [
  { dx: KART_SAMLET.dx - 250, dy: KART_SAMLET.dy + 70, rot: KART_SAMLET.rot, island: 0, britain: 0, belt: 0, ridge: 0 },
  { dx: KART_SAMLET.dx - 120, dy: KART_SAMLET.dy + 35, rot: KART_SAMLET.rot, island: 0, britain: 0, belt: 0, ridge: 0 },
  { ...KART_SAMLET, island: 0, britain: 0, belt: 1, ridge: 0 },
  { dx: 0, dy: 0, rot: 0, island: 1, britain: 1, belt: 1, ridge: 0 },
];
const KA_WIN: [number, number, number, number] = [-410, -290, 820, 560];

function kaState(step: number, phase: number): KaState {
  if (step === 3) {
    // havet lukkes ferdig i første del av steget, så kommer kollisjonen
    const p = clamp(phase / 0.3);
    if (phase < 0.3) return { bx: lerp(470, 340, smooth(p)), coll: 0, thrust: 0, rise: 0, erode: 0, obd: 1 };
    const q = smooth((phase - 0.3) / 0.7);
    return { bx: 340, coll: 1, thrust: q, rise: q, erode: 0, obd: 1 };
  }
  return keyframe(KA_FRAMES, step, phase);
}

/** Havbildet (steg 1–2): Laurentia, subduksjon, øybue, Iapetushavet og Baltika. */
function KaHav({ s, d, m }: { s: KaState; d: { url: Record<string, string> }; m: { fg: string; warm: string } }) {
  const bx = s.bx;
  const trench = 352;
  const floor = 352;
  const lauTop = (x: number) => (x < 300 ? 286 - 4 * Math.sin(x / 40) : lerp(286, floor + 8, smooth((x - 300) / 50)));
  const balTop = (x: number) => (x > bx + 40 ? 296 : lerp(floor, 296, smooth((x - bx) / 40)));
  // havbunnsplaten (litosfære) som bøyer ned under Laurentia: midtlinje med fast tykkelse
  const slabMid: [number, number][] = [];
  for (let x = bx + 20; x > trench; x -= 10) slabMid.push([x, floor + 24]);
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const a = t * 1.05;
    slabMid.push([trench - 230 * Math.sin(a) * 0.95, floor + 24 + 260 * (1 - Math.cos(a))]);
  }
  const offset = (k: number) =>
    slabMid.map((p, i) => {
      const a = slabMid[Math.max(0, i - 1)];
      const b = slabMid[Math.min(slabMid.length - 1, i + 1)];
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const n = Math.hypot(dx, dy) || 1;
      // normal som peker opp/ut fra platen
      return `${fx(p[0] - (dy / n) * k)} ${fx(p[1] + (dx / n) * k)}`;
    });
  const slabD = `M${offset(-24).join(" L")} L${offset(24).reverse().join(" L")} Z`;
  const crust = `M${offset(-24).join(" L")} L${offset(-11).reverse().join(" L")} Z`;
  const slab = slabD;
  const ocean = band(() => KA_SEA, (x) => (x < 350 ? lauTop(x) : x > bx ? balTop(x) : floor), 300, bx + 40, 4);
  const lau = band(lauTop, () => 410, 0, 350, 6);
  const bal = band(balTop, () => 410, bx, 960, 6);
  const sedWedge = band(
    balTop,
    (x) => balTop(x) + 14 * clamp((x - bx) / 30) * (1 - clamp((x - bx - 90) / 60)) + 2,
    bx,
    bx + 150,
    4,
  );
  const obdX = 300;
  return (
    <g data-scene="hav">
      <rect x="0" y="0" width="960" height="600" fill={d.url.sky} />
      <rect x="0" y="410" width="960" height="190" fill={d.url.astheno} />
      <path d={slab} fill={P.litho} opacity="0.95" />
      <path d={crust} fill="#35574a" />
      <path d={lau} fill="#8a7563" />
      <path d={lau} fill={d.url.strata} />
      <path d={bal} fill="#8c6d68" />
      <path d={bal} fill={d.url.strata} />
      <path d={sedWedge} fill="#a39a6a" />
      <path d={ocean} fill={d.url.water} opacity="0.9" />
      <line x1="300" y1={KA_SEA} x2={bx + 40} y2={KA_SEA} stroke={C.rain} strokeWidth="2" />
      {/* øybue: vulkaner over der havbunnen synker ned */}
      <path d="M232 290 L252 258 L262 252 L272 258 L292 290 Z" fill="#6a5c50" stroke={P.halo} strokeWidth="1" />
      <path d="M180 288 L196 266 L204 262 L212 266 L228 288 Z" fill="#6a5c50" stroke={P.halo} strokeWidth="1" />
      {/* havbunn skjøvet opp på kanten av kontinentet (obduksjon) */}
      {s.obd > 0.01 ? (
        <path
          d={`M${obdX - 40} ${284 - 0} L${obdX + 10} ${278 - 10 * s.obd} L${obdX + 38} ${296} L${obdX - 30} ${292} Z`}
          fill="#4f7d61"
          stroke={P.halo}
          strokeWidth="1"
          opacity={s.obd}
        />
      ) : null}
      {/* bevegelse */}
      <line x1={bx + 150} y1="250" x2={bx + 70} y2="250" stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
      <line x1="140" y1="250" x2="170" y2="250" stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
      <path
        d={`M${Math.min(bx - 30, 520)} ${floor + 30} L${trench + 10} ${floor + 30} Q${trench - 30} ${floor + 34} ${trench - 70} ${floor + 75}`}
        fill="none"
        stroke={C.warm}
        strokeWidth="2.6"
        markerEnd={`url(#${m.warm})`}
      />
    </g>
  );
}

/** Kollisjonsbildet (steg 3–4): skyvedekker over grunnfjellet, fjellkjede og erosjon. */
function KaKollisjon({
  s,
  d,
  m,
  clipId,
}: {
  s: KaState;
  d: { url: Record<string, string> };
  m: { fg: string; warm: string };
  clipId: string;
}) {
  const fronts = KA_FRONT.map((f) => lerp(370, f, s.thrust));
  const surf = (x: number) => {
    const flat = x < 340 ? 286 : 296;
    const up = lerp(flat, kaMountain(x), s.rise);
    return lerp(up, Math.max(up, kaToday(x)), s.erode);
  };
  const ground = band(surf, () => 600, 0, 960, 6);
  const moho = (x: number) => kaG(x) + 112 + 60 * s.rise * (1 - 0.6 * s.erode) * gauss(x, 470, 160);
  const balt = band(kaG, moho, 0, 960, 6);
  const mantle = band(moho, () => 600, 0, 960, 6);
  const nappe = (k: number) => {
    const f = fronts[k];
    const top = 0;
    const lower = (x: number) => kaFault(k, x, fronts);
    return `${curve(lower, 0, f, 6)} L${fx(f - 90)} ${top} L0 ${top} Z`;
  };
  // Laurentias kant: forkastning som heller vestover
  const lau = "M0 0 L480 0 L420 120 L372 230 L300 340 L200 420 L0 452 Z";
  const lauFade = 1 - s.erode;
  const seaToday = s.erode;
  const glow = 0.85 * s.rise * (1 - s.erode);
  const lostTop = curve(kaMountain, 330, 900, 8);
  return (
    <g data-scene="kollisjon">
      <rect x="0" y="0" width="960" height="600" fill={d.url.sky} />
      <defs>
        <clipPath id={clipId}>
          <path d={ground} />
        </clipPath>
      </defs>
      <path d={mantle} fill={d.url.astheno} />
      {/* klippet av overflaten: konturene over overflaten er usynlige (data-nocheck) */}
      <g clipPath={`url(#${clipId})`} data-nocheck="">
        <path d={balt} fill="#8c6d68" />
        <path d={balt} fill={d.url.strata} />
        {[0, 1, 2].map((k) => (
          <path key={k} d={nappe(k)} fill={KA_NAPPE_FILL[k]} stroke={P.halo} strokeWidth="1.6" opacity={s.thrust > 0.02 ? 1 : 0} />
        ))}
        <path d={lau} fill="#8a7563" opacity={lauFade} />
        <path d={lau} fill={d.url.strata} opacity={lauFade} />
      </g>
      {/* Moho under fjellkjeden */}
      <path d={curve(moho, 120, 960, 8)} fill="none" stroke="#c9b18f" strokeWidth="1.6" strokeDasharray="7 5" />
      {/* metamorfose dypt i kollisjonssonen */}
      {glow > 0.02 ? (
        <ellipse cx="420" cy="468" rx="95" ry="38" fill="#f08a5d" opacity={0.45 * glow} filter={d.url.glow} data-nocheck="" />
      ) : null}
      {/* havet i vest i dag */}
      {seaToday > 0.01 ? (
        <g opacity={seaToday}>
          <path d={band(() => KA_SEA, (x) => Math.max(KA_SEA, surf(x)), 0, 336, 6)} fill={d.url.water} />
          <line x1="0" y1={KA_SEA} x2="336" y2={KA_SEA} stroke={C.rain} strokeWidth="2" />
        </g>
      ) : null}
      {/* den eroderte fjellkjeden */}
      {s.erode > 0.02 ? (
        <path d={lostTop} fill="none" stroke={C.fg} strokeWidth="2" strokeDasharray="6 6" opacity={0.75 * s.erode} />
      ) : null}
      {/* skyveretning */}
      {s.thrust > 0.05 && s.erode < 0.98 ? (
        <g opacity={1 - s.erode}>
          <line x1="560" y1="356" x2="640" y2="338" stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
          <line x1="680" y1="318" x2="760" y2="306" stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
        </g>
      ) : null}
    </g>
  );
}

export function KaledonideneFigur({
  heading = "Kaledonidene: Iapetushavet lukkes, og skyvedekker legges over grunnfjellet",
  caption,
  initialStep,
}: NorgesGeoFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 4200, 1800, initialStep);
  const { step, phase } = clock;
  const s = kaState(step, phase);
  const k = keyframe(KA_KART, step, step === 3 ? clamp(phase / 0.3) : phase);
  const clipId = `${useId().replace(/:/g, "")}-ka`;
  // kartinnfeltet: øverst til høyre (bred) / øverst til høyre i utsnittet (smal)
  const inset = small ? { x: 604, y: 12, w: 266 } : { x: 650, y: 14, w: 296 };
  const kp = (p: readonly [number, number]) => kartTilFigur(p, inset.x, inset.y, inset.w, KA_WIN);
  const lauP = kp(laurentiaPunkt(KART_STED.gronland, k));
  const balP = kp(KART_STED.skandinavia);
  const labels: Lab[] = [];
  if (!s.coll) {
    labels.push(
      { text: "Laurentia", x: 36, y: 232, color: "#e3cfae", badge: [60, 240] },
      { text: "Baltika", x: Math.min(924, s.bx + 190), y: 232, color: "#e8c0b8", anchor: "middle", badge: [Math.min(900, s.bx + 190), 240] },
      { text: "Iapetushavet", x: lerp(330, s.bx, 0.55), y: 336, color: "#bfe0ef", anchor: "middle", size: 15, badge: [lerp(330, s.bx, 0.55), 330] },
      { text: "Øybue", x: 236, y: 214, at: [250, 262], color: C.fg, anchor: "middle", badge: [236, 226] },
      { text: "Havbunnen synker ned i mantelen", x: 300, y: 560, at: [221, 426], color: C.warm, badge: [262, 450] },
      { text: "Grunnfjell", x: 900, y: 380, color: "#f0d6d0", anchor: "end", badge: [900, 372] },
    );
    if (s.obd > 0.4)
      labels.push({
        text: "Havbunn skjøvet opp på land (obduksjon)",
        x: 300,
        y: 162,
        at: [300, 280],
        color: "#a9dcb9",
        anchor: "middle",
        badge: [330, 250],
      });
  } else {
    labels.push(
      { text: "Baltisk grunnfjell", x: 920, y: 404, color: "#f0d6d0", anchor: "end", badge: [900, 396] },
      { text: "Moho", x: 940, y: 448, at: [905, kaG(905) + 112], color: "#e6d3b4", anchor: "end", size: 14, badge: [940, 452] },
    );
    if (s.erode < 0.5) {
      labels.push(
        { text: "Laurentia", x: 36, y: 232, color: "#e3cfae", badge: [60, 240] },
        { text: "Kaledonidene", x: 452, y: 104, at: [452, kaMountain(452) + 6], color: C.fg, anchor: "middle", size: 17, weight: 700, badge: [452, 112] },
        { text: "Skyvedekker skyves østover", x: 920, y: 254, at: [760, 306], color: C.fg, anchor: "end", badge: [790, 286] },
        { text: "Metamorfose: gneis, glimmerskifer, amfibolitt", x: 940, y: 588, at: [420, 476], color: "#f4b08f", anchor: "end", badge: [360, 520] },
      );
      if (s.thrust > 0.6)
        labels.push({
          text: "Havbunn og øybuer (bl.a. ofiolitter)",
          x: 920,
          y: 520,
          at: [700, kaFault(1, 700, KA_FRONT) - 10],
          color: "#a9dcb9",
          anchor: "end",
          badge: [700, 334],
        });
    } else {
      labels.push(
        { text: "Atlanterhavet", x: 150, y: 336, color: "#bfe0ef", anchor: "middle", badge: [150, 330] },
        { text: "Erodert bort", x: 452, y: 104, at: [452, kaMountain(452)], color: C.fg, anchor: "middle", badge: [452, 112] },
        { text: "Jotundekket (gabbro, anortositt, granulitt)", x: 940, y: 588, at: [560, 240], color: "#c8cbef", anchor: "end", badge: [560, 200] },
        { text: "Rester av skyvedekker", x: 920, y: 250, at: [745, 284], color: C.fg, anchor: "end", badge: [760, 262] },
      );
    }
  }
  // kartetiketter
  labels.push(
    {
      text: k.dx === 0 ? "Grønland" : "Laurentia",
      x: lauP[0],
      y: lauP[1] + 5,
      color: "#f2e3c6",
      anchor: "middle",
      size: 14,
      narrowHide: true,
    },
    { text: step === 4 ? "Norge" : "Baltika", x: balP[0] + 6, y: balP[1] + 5, color: "#f2e3c6", anchor: "middle", size: 14, narrowHide: true },
  );
  const keys: Key[] = [
    { text: "Grunnfjell", color: "#8c6d68", kind: "fill" },
    { text: "Kontinentalrand og sedimenter", color: KA_NAPPE_FILL[0], kind: "fill" },
    { text: "Havbunn og øybuer", color: KA_NAPPE_FILL[1], kind: "fill" },
    { text: "Øvre skyvedekker", color: KA_NAPPE_FILL[2], kind: "fill", off: !s.coll },
    { text: "Kaledonidene på kartet", color: "#b9705a", kind: "fill", off: step < 3 },
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt og kart: Iapetushavet lukkes, Baltika og Laurentia kolliderer, og skyvedekker legges over det baltiske grunnfjellet"
        heading={heading}
        caption={
          caption ??
          "Snittet viser hvordan Iapetushavet ble lukket og Kaledonidene ble bygd, og kartet viser hvor kontinentene lå. Forenklet: Snittet er skjematisk med overdrevet høyde, og kartet bruker dagens kystlinjer og retning for Grønland og Skandinavia. Det viser ikke den virkelige plasseringen på kloden for 400–500 millioner år siden."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={<StegVelger labels={KA_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />}
        status={KA_STATUS[step - 1]}
        labels={labels}
        keys={keys}
        notes={["Snitt vest–øst", "Skjematisk, høyden er overdrevet", "Kart: dagens kystlinjer (Natural Earth)"]}
        viewBox="0 0 960 600"
        narrowViewBox="190 0 690 600"
      >
        {({ d, m }) => (
          <g
            className={motion.motionClass}
            data-playing={motion.playing ? "yes" : "no"}
            data-figur="kaledonidene"
            data-step={step}
          >
            {s.coll ? <KaKollisjon s={s} d={d} m={m} clipId={clipId} /> : <KaHav s={s} d={d} m={m} />}
            <KartInnfelt x={inset.x} y={inset.y} w={inset.w} win={KA_WIN} k={k} />
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 2. Oslograben: strekk, innsynkning, rombeporfyr og larvikitt
 * ===================================================================== */

const OG_STEPS = ["1 Skorpa strekkes", "2 Graben synker inn", "3 Lava og magma", "4 I dag"];
const OG_STATUS = [
  "Skorpa strekkes. Mot slutten av karbon, for ca. 310 millioner år siden, begynte jordskorpen i det sørøstlige Norge å sprekke opp, fra Langesund i sør til Mjøsa i nord.",
  "Skorpa blir tynnere, og store forkastningsblokker synker inn langs normalforkastninger. Slik oppstår riftdalen Oslo-graben. Lagene fra kambrosilur blir liggende bevart nede i graben.",
  "Vulkanisme i perm (250–300 millioner år siden): Sprekkevulkaner sender ut tykke lavadekker av rombeporfyr. Dypt nede størkner magmakamre langsomt til larvikitt (ca. 290 millioner år siden). Rombeporfyr og larvikitt er tvillingbergarter med ulik avkjøling.",
  "Riften stoppet før kontinentet delte seg, så Oslofeltet er en fossil rift. Erosjon har tatt bort toppen, og larvikitt, rombeporfyr og kambrosilur ligger i dagen. Forkastningene styrer fortsatt landskapet på Østlandet, også Oslofjordens forløp.",
];
const OG_TOP = 200;
const OG_CS = 40; // tykkelse på de kambrosiluriske lagene
const OG_MOHO = 430;
type OgState = { stretch: number; drop: number; lava: number; magma: number; erode: number };
const OG_FRAMES: OgState[] = [
  { stretch: 1, drop: 0.12, lava: 0, magma: 0, erode: 0 },
  { stretch: 1, drop: 1, lava: 0, magma: 0, erode: 0 },
  { stretch: 0.6, drop: 1, lava: 1, magma: 1, erode: 0 },
  { stretch: 0, drop: 1, lava: 1, magma: 1, erode: 1 },
];
/** Blokkene (overkant x0–x1, underkant x2–x3 ved Moho) og hvor mye de synker (ved drop = 1). */
const OG_BLOCKS: { top: [number, number]; bot: [number, number]; drop: number }[] = [
  { top: [-40, 330], bot: [-40, 385], drop: -10 },
  { top: [330, 410], bot: [385, 430], drop: 32 },
  { top: [410, 550], bot: [430, 530], drop: 72 },
  { top: [550, 630], bot: [530, 575], drop: 32 },
  { top: [630, 1000], bot: [575, 1000], drop: -10 },
];
/** Forkastningene (topp og bunn) mellom blokkene. */
const OG_FAULTS = OG_BLOCKS.slice(1).map((b) => [b.top[0], b.bot[0]] as const);
const OG_ERODE = 238;
const OG_PLUTON = "M420 330 C418 290 440 246 482 238 C524 232 548 268 552 300 C556 336 532 352 488 356 C450 358 422 352 420 330 Z";

/** Rombeporfyr: store rombeformede feltspatkrystaller i finkornet grunnmasse (deterministisk mønster, enhetssirkel r = 60). */
const OG_RHOMBS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 10 + 44 * Math.sqrt((i + 0.5) / 12);
  const cx = Math.cos(a) * r;
  const cy = Math.sin(a) * r;
  const rot = ((i * 47) % 180) * (Math.PI / 180);
  const L = 9 + (i % 3) * 2.5;
  const H = L * 0.5;
  // rombe: lang diagonal L, kort diagonal H
  const pt = (u: number, v: number) => `${fx(cx + u * Math.cos(rot) - v * Math.sin(rot))} ${fx(cy + u * Math.sin(rot) + v * Math.cos(rot))}`;
  return `M${pt(-L, 0)} L${pt(0, -H)} L${pt(L, 0)} L${pt(0, H)} Z`;
});
const OG_MATRIX = Array.from({ length: 46 }, (_, i) => [((i * 37) % 120) - 60, ((i * 53) % 120) - 60] as const);
/** Larvikitt: grove, tettpakkede korn (enkelt mønster av femkanter). */
const OG_GRAINS = Array.from({ length: 22 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 6 + 50 * Math.sqrt(i / 22);
  const cx = Math.cos(a) * r;
  const cy = Math.sin(a) * r;
  const pts5 = Array.from({ length: 5 }, (_, k) => {
    const b = a + (k * 2 * Math.PI) / 5;
    const rr = 11 + ((i + k) % 3) * 2;
    return `${fx(cx + Math.cos(b) * rr)} ${fx(cy + Math.sin(b) * rr)}`;
  });
  return { d: `M${pts5.join(" L")} Z`, sheen: i % 4 === 1 };
});

function Krystallinnfelt({ x, y, r, kind }: { x: number; y: number; r: number; kind: "rp" | "lv" }) {
  const clip = `${useId().replace(/:/g, "")}-kr`;
  const k = r / 60;
  return (
    <g data-nocheck="" data-innfelt={kind}>
      <defs>
        <clipPath id={clip}>
          <circle cx={x} cy={y} r={r} />
        </clipPath>
      </defs>
      <circle cx={x} cy={y} r={r + 4} fill={P.halo} />
      <g clipPath={`url(#${clip})`}>
        {kind === "rp" ? (
          <>
            <circle cx={x} cy={y} r={r} fill="#6e4440" />
            <g transform={`translate(${x} ${y}) scale(${k.toFixed(3)})`}>
              {OG_MATRIX.map(([u, v], i) => (
                <circle key={i} cx={u} cy={v} r={1.4} fill="#8a5a52" />
              ))}
              {OG_RHOMBS.map((d, i) => (
                <path key={i} d={d} fill="#eadfca" stroke="#a8916f" strokeWidth={1} />
              ))}
            </g>
          </>
        ) : (
          <>
            <circle cx={x} cy={y} r={r} fill="#3e4b57" />
            {OG_GRAINS.map((g, i) => (
              <path
                key={i}
                d={g.d}
                transform={`translate(${x} ${y}) scale(${k.toFixed(3)})`}
                fill={g.sheen ? "#5f86b0" : i % 3 === 0 ? "#7d8a96" : "#5d6b78"}
                stroke="#2a333b"
                strokeWidth={1.2}
              />
            ))}
          </>
        )}
      </g>
      <circle cx={x} cy={y} r={r} fill="none" stroke="#d9e3ea" strokeWidth="2" />
    </g>
  );
}

const OG_WIN: [number, number, number, number] = [50, 70, 230, 160];
/** Oslofeltet på kartet: skjematisk omriss fra Langesund til Mjøsa. */
const OG_FELT =
  "M150 177 L160 174 L168 166 L172 152 L170 138 L166 126 L158 122 L151 127 L150 140 L152 152 L149 165 Z";

export function OslograbenFigur({
  heading = "Oslograben: riftdal, rombeporfyr og larvikitt",
  caption,
  initialStep,
}: NorgesGeoFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3800, 1700, initialStep);
  const { step, phase } = clock;
  const s = keyframe(OG_FRAMES, step, phase);
  const uid = useId().replace(/:/g, "");
  const blockTop = (i: number) => OG_TOP + OG_BLOCKS[i].drop * s.drop;
  const moho = (x: number) => OG_MOHO - 48 * s.drop * gauss(x, 480, 190);
  const lavaTop = OG_TOP + 4;
  const surfToday = (x: number) => OG_ERODE + 4 * Math.sin(x / 31) - 6 * gauss(x, 480, 40);
  // landoverflaten (klipper alt): før erosjon høyt oppe, i dag den eroderte flaten
  const surf = (x: number) => lerp(0, surfToday(x), s.erode);
  const ground = band(surf, () => 560, 0, 960, 6);
  const lavaBand = band(
    (x) => lavaTop - 2 * Math.sin(x / 23),
    (x) => {
      const i = OG_BLOCKS.findIndex((b) => x >= b.top[0] && x < b.top[1]);
      return blockTop(Math.max(0, i));
    },
    318,
    642,
    3,
  );
  const insetW = small ? 168 : 176;
  const inset = { x: small ? 396 : 392, y: 12, w: insetW };
  const c1 = small ? { x: 232, y: 82, r: 56 } : { x: 92, y: 96, r: 62 };
  const c2 = small ? { x: 728, y: 82, r: 56 } : { x: 868, y: 96, r: 62 };
  const showRocks = s.lava > 0.5;
  const labels: Lab[] = [
    { text: "Grunnfjell", x: 40, y: 330, color: "#f0d6d0", badge: [200, 320] },
    { text: "Moho", x: 920, y: OG_MOHO + 28, at: [880, moho(880)], color: "#e6d3b4", anchor: "end", size: 14, badge: [900, OG_MOHO + 26] },
  ];
  if (step <= 2)
    labels.push({
      text: "Kambrosiluriske lag (kalkstein, skifer)",
      x: 40,
      y: small ? 190 : 186,
      at: [250, blockTop(0) + 18],
      color: "#d7e1e6",
      badge: [250, blockTop(0) - 14],
    });
  if (step === 1)
    labels.push({ text: "Strekk", x: 480, y: 470, color: C.fg, anchor: "middle", weight: 700, badge: [480, 470] });
  if (step >= 2)
    labels.push({
      text: "Normalforkastning",
      x: 150,
      y: 470,
      at: [OG_FAULTS[0][0] + 30, 330],
      color: C.warm,
      badge: [OG_FAULTS[0][0] + 50, 400],
    });
  if (step === 2)
    labels.push({ text: "Graben (Oslo-graben)", x: 480, y: 180, at: [480, blockTop(2) + 10], color: C.fg, anchor: "middle", weight: 700, badge: [480, 240] });
  if (step === 3)
    labels.push(
      { text: "Sprekkevulkaner", x: 480, y: 172, at: [345, 170], color: C.warm, anchor: "middle", badge: [300, 150] },
      { text: "Lavadekker av rombeporfyr", x: 920, y: 268, at: [600, 220], color: "#e4b7a6", anchor: "end", badge: [600, 248] },
      { text: "Magmakammer", x: 920, y: 318, at: [550, 300], color: "#ffc59a", anchor: "end", badge: [580, 318] },
    );
  if (step === 4)
    labels.push(
      { text: "Larvikitt i dagen", x: 480, y: 186, at: [482, surfToday(482) + 6], color: "#b9d3ee", anchor: "middle", weight: 700, badge: [482, 210] },
      { text: "Rombeporfyr", x: 300, y: 186, at: [380, surfToday(380) + 10], color: "#e4b7a6", anchor: "middle", badge: [372, 214] },
      { text: "Kambrosilur", x: 40, y: 296, at: [372, 262], color: "#d7e1e6", badge: [372, 284] },
      { text: "Forkastningskant mot grunnfjellet", x: 920, y: 336, at: [632, surfToday(632) + 4], color: C.fg, anchor: "end", badge: [690, 224] },
    );
  if (showRocks)
    labels.push(
      { text: "Rombeporfyr", x: c1.x, y: c1.y + c1.r + 22, color: "#e4b7a6", anchor: "middle", size: 14, badge: [c1.x + c1.r, c1.y + c1.r] },
      { text: "Larvikitt", x: c2.x, y: c2.y + c2.r + 22, color: "#b9d3ee", anchor: "middle", size: 14, badge: [c2.x - c2.r, c2.y + c2.r] },
    );
  const keys: Key[] = [
    { text: "Grunnfjell", color: "#8c6d68", kind: "fill" },
    { text: "Kambrosilur", color: "#8e9ba3", kind: "fill" },
    { text: "Rombeporfyr", color: "#7b4b45", kind: "fill", off: s.lava < 0.5 },
    { text: "Larvikitt", color: "#4f6378", kind: "fill", off: s.magma < 0.5 },
    { text: "Normalforkastning", color: C.warm, kind: "line", off: step < 2 },
  ];
  const kp = (p: readonly [number, number]) => kartTilFigur(p, inset.x, inset.y, inset.w, OG_WIN);
  const oslo = kp(KART_STED.oslo);
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt gjennom Oslograben: skorpa strekkes, blokker synker inn langs forkastninger, rombeporfyr-lava og larvikitt dannes, og erosjon blottlegger dem i dag"
        heading={heading}
        caption={
          caption ??
          "Oslofeltet er en riftdal fra karbon og perm som stoppet før kontinentet delte seg. Krystallbildene viser forskjellen: rombeporfyr har store rombeformede feltspatkrystaller i en finkornet grunnmasse, larvikitt er grovkornet fordi den størknet langsomt på dypet. Forenklet: Snittet er skjematisk uten målestokk, og vulkanismen og magmakamrene vises i ett steg, selv om de var aktive i mange millioner år."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={<StegVelger labels={OG_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />}
        status={OG_STATUS[step - 1]}
        labels={labels}
        keys={keys}
        notes={["Snitt vest–øst gjennom Oslofeltet", "Skjematisk, uten målestokk", "Kart: dagens kystlinjer (Natural Earth), Oslofeltet skjematisk"]}
        viewBox="0 0 960 560"
        narrowViewBox="160 0 640 560"
      >
        {({ d, m }) => (
          <g
            className={motion.motionClass}
            data-playing={motion.playing ? "yes" : "no"}
            data-figur="oslograben"
            data-step={step}
          >
            <rect x="0" y="0" width="960" height="560" fill={d.url.sky} />
            <defs>
              <clipPath id={`${uid}-g`}>
                <path d={ground} />
              </clipPath>
              {OG_BLOCKS.map((b, i) => (
                <clipPath key={i} id={`${uid}-b${i}`}>
                  <path d={`M${b.top[0]} 0 L${b.top[1]} 0 L${b.top[1]} ${OG_TOP} L${b.bot[1]} 600 L${b.bot[0]} 600 L${b.top[0]} ${OG_TOP} Z`} />
                </clipPath>
              ))}
            </defs>
            <path d={band(moho, () => 560, 0, 960, 8)} fill={P.litho} />
            {/* klippet av blokkene og overflaten: konturene utenfor er usynlige (data-nocheck) */}
            <g clipPath={`url(#${uid}-g)`} data-nocheck="">
              {OG_BLOCKS.map((b, i) => (
                <g key={i} clipPath={`url(#${uid}-b${i})`}>
                  <g transform={`translate(0 ${fx(b.drop * s.drop)})`}>
                    <rect x="-40" y={OG_TOP + OG_CS} width="1040" height="400" fill="#8c6d68" />
                    <rect x="-40" y={OG_TOP + OG_CS} width="1040" height="400" fill={d.url.strata} />
                    <rect x="-40" y={OG_TOP} width="1040" height={OG_CS} fill="#8e9ba3" />
                    <path d="M-40 213 H1000 M-40 226 H1000" stroke="#5f6c74" strokeWidth="1.4" />
                  </g>
                </g>
              ))}
              {s.lava > 0.01 ? (
                <g opacity={clamp(s.lava * 1.4)}>
                  <path d={lavaBand} fill="#7b4b45" />
                  <path d="M318 222 H642 M318 240 H642 M318 258 H642" stroke="#5a3430" strokeWidth="1.2" />
                </g>
              ) : null}
              {s.magma > 0.01 ? (
                <path d={OG_PLUTON} fill={s.erode > 0.5 ? "#4f6378" : mix("#e0743d", "#4f6378", s.erode)} opacity={clamp(s.magma * 1.3)} />
              ) : null}
            </g>
            {/* Moho */}
            <path d={curve(moho, 0, 960, 8)} fill="none" stroke="#c9b18f" strokeWidth="1.6" strokeDasharray="7 5" />
            {/* forkastninger */}
            {s.drop > 0.3
              ? OG_FAULTS.map(([t, b], i) => (
                  <line
                    key={i}
                    x1={t}
                    y1={s.erode > 0.5 ? surfToday(t) : OG_TOP - 8}
                    x2={lerp(t, b, 0.55)}
                    y2={lerp(OG_TOP, 600, 0.55) - 20}
                    stroke={C.warm}
                    strokeWidth="2.4"
                    opacity={clamp((s.drop - 0.3) * 2)}
                  />
                ))
              : null}
            {/* vulkaner og tilførselsganger (steg 3) */}
            {s.lava > 0.01 && s.erode < 0.99 ? (
              <g opacity={(1 - s.erode) * clamp(s.lava * 1.4)}>
                <path d={`M345 ${lavaTop} L333 ${lavaTop} L345 168 L357 ${lavaTop} Z`} fill="#5a3430" />
                <path d={`M612 ${lavaTop} L600 ${lavaTop} L612 172 L624 ${lavaTop} Z`} fill="#5a3430" />
                <path d="M345 210 L360 260 L440 280 M612 210 L600 262 L540 284" stroke="#e0743d" strokeWidth="4" fill="none" />
                <ellipse cx="345" cy="164" rx="10" ry="6" fill="#f08a5d" filter={d.url.glow} />
                <ellipse cx="612" cy="168" rx="10" ry="6" fill="#f08a5d" filter={d.url.glow} />
              </g>
            ) : null}
            {/* strekk */}
            {s.stretch > 0.02 ? (
              <g opacity={s.stretch}>
                <line x1="380" y1="500" x2="210" y2="500" stroke={C.fg} strokeWidth="3.5" markerEnd={`url(#${m.fg})`} />
                <line x1="580" y1="500" x2="750" y2="500" stroke={C.fg} strokeWidth="3.5" markerEnd={`url(#${m.fg})`} />
              </g>
            ) : null}
            {showRocks ? (
              <>
                <line x1={c1.x} y1={c1.y + c1.r} x2="380" y2="226" stroke="#e4b7a6" strokeWidth="1.6" strokeDasharray="5 4" />
                <line x1={c2.x} y1={c2.y + c2.r} x2="520" y2="262" stroke="#b9d3ee" strokeWidth="1.6" strokeDasharray="5 4" />
                <Krystallinnfelt {...c1} kind="rp" />
                <Krystallinnfelt {...c2} kind="lv" />
              </>
            ) : null}
            <KartInnfelt x={inset.x} y={inset.y} w={inset.w} win={OG_WIN} k={{ dx: 0, dy: 0, rot: 0, island: 0, britain: 0, belt: 0, ridge: 0 }}>
              <path d={OG_FELT} fill="#e0743d" opacity="0.8" stroke="#ffd2b8" strokeWidth="1" />
            </KartInnfelt>
            <circle cx={oslo[0]} cy={oslo[1]} r="2.5" fill={C.fg} data-nocheck="" />
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

function mix(a: string, b: string, t: number) {
  const h = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const x = h(a);
  const y = h(b);
  return `rgb(${x.map((v, i) => Math.round(lerp(v, y[i], clamp(t)))).join(",")})`;
}

/* =====================================================================
 * 3. Åpningen av Norskehavet: riftfase, brudd, havbunnsspredning, i dag
 * ===================================================================== */

const NH_STAGES = ["Riftfase", "Bruddet", "Havbunnsspredning", "I dag"];
const NH_STATUS = [
  "Riftfase: Lenge før havet åpnet seg, ble skorpa mellom Norge og Grønland strukket og tynnet ut. Mange fjorder og daler følger i dag forkastningssoner fra denne tiden (trias–kritt, ca. 200 millioner år siden).",
  "Bruddet: I tidlig tertiær (eocen, for ca. 55 millioner år siden) revnet litosfæren mellom Norge og Grønland helt. Smelte fra mantelen steg opp og begynte å danne ny havbunn.",
  "Havbunnsspredning: Langs midthavsryggen lages ny havbunn, og Norge og Grønland skilles. Norge får en passiv kontinentalmargin uten subduksjon. Elver og senere isbreer fører sand og leire ut på sokkelen.",
  "I dag: Spredningen fortsetter. Jan Mayen ligger på spredningsryggen nord for Island, med Beerenberg (2272 m o.h.), Norges eneste aktive vulkan over havnivå. Lagene på sokkelen er kilde-, reservoar- og takbergarter for olje og gass.",
];
/** Punkter på norsk side av riften (kartkoordinater) og de samme punktene på grønlandsk side når kontinentene er samlet. */
const NH_NORGE: [number, number][] = [
  [91, 140],
  [91, 96],
  [108, 38],
  [123, -21],
  [123, -68],
  [98, -115],
  [59, -166],
];
function inverseSamlet(p: [number, number]): [number, number] {
  const a = (-KART_SAMLET.rot * Math.PI) / 180;
  const x = p[0] - KART_SAMLET.dx - KART_PIVOT[0];
  const y = p[1] - KART_SAMLET.dy - KART_PIVOT[1];
  return [KART_PIVOT[0] + x * Math.cos(a) - y * Math.sin(a), KART_PIVOT[1] + x * Math.sin(a) + y * Math.cos(a)];
}
void inverseSamlet;
/** Spredningsryggen i dag (skjematisk: Kolbeinseyryggen, ved Jan Mayen, Mohnsryggen og Knipovichryggen). */
const NH_RYGG: [number, number][] = [
  [-68, 50],
  [-44, 18],
  [-6, -14],
  [27, -39],
  [60, -64],
  [67, -105],
  [55, -156],
];
const NH_WIN: [number, number, number, number] = [-330, -260, 560, 470];

function nhStage(t: number) {
  return t < 0.98 ? 0 : t < 1.6 ? 1 : t < 2.55 ? 2 : 3;
}
function nhKart(t: number): KartTilstand {
  const open = smooth(clamp((t - 1) / 2));
  return {
    dx: lerp(KART_SAMLET.dx, 0, open),
    dy: lerp(KART_SAMLET.dy, 0, open),
    rot: lerp(KART_SAMLET.rot, 0, open),
    island: clamp((t - 2.6) / 0.35),
    britain: 1,
    belt: 0,
    ridge: clamp((t - 0.95) / 0.2),
  };
}

/** Snittet (lokale koordinater 0–520 × 0–420): Grønland til venstre, Norge til høyre. */
function NhSnitt({ t, d, m }: { t: number; d: { url: Record<string, string> }; m: { fg: string; warm: string } }) {
  const SEA = 120;
  const cx = 260;
  const thin = lerp(0.35, 1, smooth(clamp(t)));
  const half = 170 * smooth(clamp((t - 1) / 2));
  const sedT = 6 + 30 * smooth(clamp((t - 1.2) / 1.8));
  // avstand fra bruddet (eller midten før bruddet) inn i hvert kontinent
  const left = cx - half;
  const right = cx + half;
  const uOf = (x: number) => (x <= left ? left - x : x >= right ? x - right : -1);
  const k = (u: number) => thin * Math.exp(-u / 85);
  const crustTop = (x: number) => {
    const u = uOf(x);
    return u < 0 ? 0 : 108 + 62 * k(u);
  };
  const moho = (x: number) => {
    const u = uOf(x);
    return u < 0 ? 0 : 238 - 92 * k(u);
  };
  const lab = (x: number) => {
    const u = uOf(x);
    const base = u < 0 ? 175 : 330 - 120 * k(u);
    return base;
  };
  const broken = t >= 1;
  const oceanFloor = (x: number) => 176 - 16 * gauss(x, cx, 30);
  const xsL = Math.max(0, left);
  const contL = band(crustTop, moho, 0, broken ? left : cx, 4);
  const contR = band(crustTop, moho, broken ? right : cx, 520, 4);
  const mantleL = band(moho, lab, 0, broken ? left : cx, 4);
  const mantleR = band(moho, lab, broken ? right : cx, 520, 4);
  const oceanLith = broken && half > 1 ? band(oceanFloor, (x) => 190 + Math.min(120, Math.abs(x - cx) * 0.9), left, right, 3) : "";
  const oceanCrust = broken && half > 1 ? band(oceanFloor, (x) => oceanFloor(x) + 12, left, right, 3) : "";
  // havbunnsstriper (like gamle på hver side av ryggen)
  const stripes: string[] = [];
  if (broken && half > 8)
    for (let i = 1; i * 34 < half; i++) {
      for (const sgn of [-1, 1]) {
        const x0 = cx + sgn * i * 34;
        const x1 = cx + sgn * Math.min(half, i * 34 + 17);
        stripes.push(`M${fx(Math.min(x0, x1))} ${fx(oceanFloor(x0))} L${fx(Math.max(x0, x1))} ${fx(oceanFloor(x1))} L${fx(Math.max(x0, x1))} ${fx(oceanFloor(x1) + 12)} L${fx(Math.min(x0, x1))} ${fx(oceanFloor(x0) + 12)} Z`);
      }
    }
  const water = band(
    () => SEA,
    (x) => {
      if (broken && x > left && x < right) return oceanFloor(x);
      return Math.max(SEA, crustTop(x));
    },
    Math.max(0, xsL - 160),
    Math.min(520, right + 160),
    3,
  );
  const sedL = band(
    (x) => Math.max(SEA + 4, crustTop(x) - sedT * clamp((left - x) / 40) * clamp((x - (left - 170)) / 60)),
    crustTop,
    Math.max(0, left - 180),
    broken ? left : cx,
    3,
  );
  const sedR = band(
    (x) => Math.max(SEA + 4, crustTop(x) - sedT * clamp((x - right) / 40) * clamp((right + 170 - x) / 60)),
    crustTop,
    broken ? right : cx,
    Math.min(520, right + 180),
    3,
  );
  // forkastninger i riftfasen
  const faults = [-120, -70, -30, 30, 70, 120].map((o) => {
    const x = (broken ? (o < 0 ? left : right) : cx) + o;
    return `M${fx(x)} ${fx(crustTop(x) - 2)} L${fx(x + (o < 0 ? 14 : -14))} ${fx(crustTop(x) + 44)}`;
  });
  const upwell = 0.3 + 0.7 * clamp(t);
  return (
    <g>
      <rect x="0" y="0" width="520" height="420" fill={d.url.sky} rx="8" />
      <rect x="0" y="180" width="520" height="240" fill={d.url.astheno} />
      <ellipse cx={cx} cy="300" rx="70" ry="120" fill="#f08a5d" opacity={0.35 * upwell} filter={d.url.glow} data-nocheck="" />
      <path d={mantleL} fill={P.litho} />
      <path d={mantleR} fill={P.litho} />
      {oceanLith ? <path d={oceanLith} fill={P.litho} /> : null}
      <path d={water} fill={d.url.water} />
      <path d={contL} fill="#8a7563" />
      <path d={contL} fill={d.url.strata} />
      <path d={contR} fill="#8c6d68" />
      <path d={contR} fill={d.url.strata} />
      <path d={sedL} fill="#c8b386" />
      <path d={sedR} fill="#c8b386" />
      {oceanCrust ? <path d={oceanCrust} fill="#35574a" /> : null}
      <g data-nocheck="">
        {stripes.map((p, i) => (
          <path key={i} d={p} fill="#5d8a72" />
        ))}
      </g>
      <line x1="0" y1={SEA} x2="520" y2={SEA} stroke={C.rain} strokeWidth="1.6" opacity="0.8" />
      <g data-nocheck="" opacity={1 - clamp((t - 1.6) / 0.6)}>
        {faults.map((f, i) => (
          <path key={i} d={f} stroke={C.warm} strokeWidth="2" />
        ))}
      </g>
      {broken ? (
        <path d={`M${cx} 330 L${cx} ${fx(oceanFloor(cx) + 4)}`} stroke="#f08a5d" strokeWidth="5" opacity="0.9" />
      ) : null}
      {/* bevegelse */}
      <line x1="150" y1="64" x2="70" y2="64" stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
      <line x1="370" y1="64" x2="450" y2="64" stroke={C.fg} strokeWidth="3" markerEnd={`url(#${m.fg})`} />
    </g>
  );
}

export function NorskehavetFigur({
  heading = "Norskehavet åpner seg: Norge og Grønland skilles",
  caption,
}: Omit<NorgesGeoFigurProps, "initialStep">) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const [t, setT] = useState(0);
  const running = motion.playing && visible;
  useNhClock(running, setT);
  const stage = nhStage(t);
  const k = nhKart(t);
  const set = (v: number) => {
    setT(v);
    if (motion.playing) motion.toggle();
  };
  // oppsett: bred = kart til venstre, snitt til høyre; smal = kart over snitt
  const map = small ? { x: 10, y: 10, w: 540 } : { x: 14, y: 14, w: 400 };
  const sec = small ? { x: 20, y: 480 } : { x: 426, y: 40 };
  const kp = (p: readonly [number, number]) => kartTilFigur(p, map.x, map.y, map.w, NH_WIN);
  const open = smooth(clamp((t - 1) / 2));
  const ridgePts = NH_NORGE.map(
    (p, i) => [lerp(p[0], NH_RYGG[i][0], open), lerp(p[1], NH_RYGG[i][1], open)] as [number, number],
  );
  const ridgePath = `M${ridgePts.map((p) => `${fx(p[0])} ${fx(p[1])}`).join(" L")}`;
  const gr = kp(laurentiaPunkt(KART_STED.gronland, k));
  const no = kp([150, 80]);
  const rMid = kp(ridgePts[3]);
  const jm = kp(KART_STED.janMayen);
  const isl = kp(KART_STED.island);
  const S = (x: number, y: number): [number, number] => [sec.x + x, sec.y + y];
  const labels: Lab[] = [
    { text: "Grønland", x: gr[0], y: gr[1] + 5, color: "#f2e3c6", anchor: "middle", badge: [gr[0], gr[1]] },
    { text: "Norge", x: no[0], y: no[1] + 5, color: "#f2e3c6", anchor: "middle", badge: [no[0], no[1]] },
    { text: "Grønland", x: S(40, 96)[0], y: S(40, 96)[1], color: "#e3cfae", badge: S(40, 90), narrowHide: false },
    { text: "Norge", x: S(480, 96)[0], y: S(480, 96)[1], color: "#e8c0b8", anchor: "end", badge: S(480, 90) },
  ];
  if (t > 1.8) {
    const sb = kp([NH_NORGE[2][0] - 6, NH_NORGE[2][1] + 30]);
    labels.push({ text: "Sedimentbassenger", x: map.x + map.w - 8, y: map.y + (NH_WIN[3] * map.w) / NH_WIN[2] - 12, at: sb, color: "#e6d3a8", anchor: "end", size: 14, badge: [sb[0] + 14, sb[1] + 18] });
  }
  if (t > 1.1)
    labels.push({ text: "Spredningsrygg", x: rMid[0] - 16, y: rMid[1] + 4, at: rMid, color: "#ffb08a", anchor: "end", badge: [rMid[0] + 22, rMid[1]] });
  if (t > 2.6)
    labels.push({ text: "Jan Mayen", x: jm[0] - 12, y: jm[1] + 5, at: jm, color: C.fg, anchor: "end", size: 14, badge: [jm[0] - 18, jm[1] + 10] });
  if (t > 2.9)
    labels.push({ text: "Island", x: isl[0], y: isl[1] + 32, at: [isl[0], isl[1] + 8], color: C.fg, anchor: "middle", size: 14, badge: [isl[0], isl[1] + 30] });
  if (stage === 0)
    labels.push(
      { text: "Skorpa strekkes og tynnes ut", x: S(260, 395)[0], y: S(260, 395)[1], at: S(260, 200), color: C.fg, anchor: "middle", badge: S(260, 380) },
      { text: "Forkastninger", x: S(130, 40)[0], y: S(130, 40)[1] + 0, at: S(150, 150), color: C.warm, anchor: "middle", badge: S(150, 104) },
    );
  else {
    labels.push(
      { text: "Ny havbunn", x: S(300, 348)[0], y: S(300, 348)[1], at: S(260 + Math.min(60, 170 * smooth(clamp((t - 1) / 2)) * 0.6), 178), color: "#a9dcb9", badge: S(300, 222) },
      { text: "Smelte stiger opp", x: S(260, 395)[0], y: S(260, 395)[1], at: S(260, 300), color: "#ffb08a", anchor: "middle", badge: S(260, 382) },
    );
    if (t > 1.7)
      labels.push({
        text: "Passiv margin med sedimenter",
        x: S(510, 30)[0],
        y: S(510, 30)[1],
        at: S(Math.min(505, 260 + 170 * smooth(clamp((t - 1) / 2)) + 60), 128),
        color: "#e6d3a8",
        anchor: "end",
        badge: S(450, 150),
      });
  }
  const keys: Key[] = [
    { text: "Kontinental skorpe", color: "#8c6d68", kind: "fill" },
    { text: "Ny havbunnsskorpe", color: "#35574a", kind: "fill", off: t < 1 },
    { text: "Sedimenter på sokkelen", color: "#c8b386", kind: "fill" },
    { text: "Spredningsrygg", color: "#f08a5d", kind: "dash", off: t < 1 },
  ];
  const valueLabel = NH_STAGES[stage];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Kart og snitt: Norskehavet åpner seg. Skorpa mellom Norge og Grønland strekkes, revner, og ny havbunn dannes langs spredningsryggen"
        heading={heading}
        caption={
          caption ??
          "Dra i tidsskyveren for å se hvordan Norge og Grønland skilles. Kartet viser dagens kystlinjer, og snittet viser skorpa på tvers av havet. Forenklet: Grønland flyttes og dreies som én stiv blokk, spredningsryggen er tegnet midt mellom kontinentene, og tidsskyveren er ikke i målestokk. Island og Jan Mayen kom til mye senere enn bruddet og vises først mot slutten."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <>
            <StegVelger labels={NH_STAGES} step={stage + 1} onStep={(n) => set(n - 1)} label="Velg tid" />
            <Skyver
              label="Tid"
              min={0}
              max={3}
              step={0.01}
              value={n1(t)}
              onChange={set}
              valueLabel={valueLabel}
              valueText={`${valueLabel}: ${NH_STATUS[stage].split(":")[0]}`}
              ends={["Riftfase", "I dag"]}
            />
          </>
        }
        status={NH_STATUS[stage]}
        labels={labels}
        keys={keys}
        notes={["Kart: dagens kystlinjer (Natural Earth)", "Snitt: skjematisk, høyden er overdrevet"]}
        viewBox={small ? "0 0 560 920" : "0 0 960 500"}
        narrowViewBox="0 0 560 920"
      >
        {({ d, m }) => (
          <g
            className={motion.motionClass}
            data-playing={motion.playing ? "yes" : "no"}
            data-figur="norskehavet"
            data-step={stage + 1}
          >
            <rect x="0" y="0" width={small ? 560 : 960} height={small ? 920 : 500} fill={d.url.sky} />
            <KartInnfelt x={map.x} y={map.y} w={map.w} win={NH_WIN} k={k} ridgePath={ridgePath}>
              {t > 1.6 ? (
                <path
                  d={`M${NH_NORGE.slice(0, 6).map((p) => `${p[0] - 6} ${p[1]}`).join(" L")}`}
                  stroke="#c8b386"
                  strokeWidth="22"
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.7 * clamp((t - 1.6) / 0.6)}
                />
              ) : null}
              {t > 2.6 ? (
                <circle cx={KART_STED.janMayen[0]} cy={KART_STED.janMayen[1]} r="7" fill="#f08a5d" stroke={P.halo} strokeWidth="2" />
              ) : null}
            </KartInnfelt>
            <g transform={`translate(${sec.x} ${sec.y})`}>
              <NhSnitt t={t} d={d} m={m} />
            </g>
            <rect x={sec.x} y={sec.y} width="520" height="420" rx="8" fill="none" stroke="#9fb4c2" strokeWidth="1.5" data-nocheck="" />
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/** Spiller tiden fram (ca. 12 s fra riftfase til i dag, så en pause) mens animasjonen går. */
function useNhClock(running: boolean, setT: (f: (t: number) => number) => void) {
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let hold = 0;
    const loop = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      acc += dt;
      if (acc >= 33) {
        const add = acc;
        acc = 0;
        setT((t) => {
          if (t >= 3) {
            hold += add;
            if (hold < 2200) return 3;
            hold = 0;
            return 0;
          }
          return Math.min(3, t + (add / 12000) * 3);
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, setT]);
}
