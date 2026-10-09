/**
 * Felles komponenter for isbre-figurene: figurramme med etiketter/nummermerker, steg-velger,
 * skyver og felles fyll (berg, is, snø, vann, morene, breelvmateriale, leire, litosfære, astenosfære).
 * Hjelpefunksjoner og hooks ligger i isbre-kit.ts.
 */
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { FigureFrame } from "@/components/figure-frame";
import { C, PlayPauseToggle, font } from "./svg-kit";
import { FigureScale, P, clamp, figureFont, useBoxWidth, useNarrow, type Poly } from "./isbre-kit";

/* ---------- kontroller ---------- */

/** Navnet på figuren rundt kontrollene, så knapper og skyvere får unike, forståelige navn. */
const FigurNavn = createContext("");

export function StegVelger({
  labels,
  step,
  onStep,
  label,
}: {
  labels: string[];
  step: number;
  onStep: (step: number) => void;
  label: string;
}) {
  const navn = useContext(FigurNavn);
  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="group"
      aria-label={navn ? `${label}: ${navn}` : label}
    >
      {labels.map((item, index) => {
        const n = index + 1;
        const active = step === n;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => onStep(n)}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-muted/60 text-foreground hover:bg-muted"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function Skyver({
  label,
  min,
  max,
  step,
  value,
  onChange,
  valueLabel,
  valueText,
  ends,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  valueLabel: string;
  /** Fyldigere verditekst for skjermleser (standard: valueLabel). */
  valueText?: string;
  ends?: [string, string];
}) {
  const navn = useContext(FigurNavn);
  return (
    <label className="flex w-full min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-foreground sm:w-auto">
      <span className="whitespace-nowrap">{label}</span>
      <span className="flex min-w-0 flex-1 items-center gap-1.5">
        {ends ? (
          <span className="text-muted-foreground" aria-hidden="true">
            {ends[0]}
          </span>
        ) : null}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={navn ? `${label}: ${navn}` : label}
          aria-valuetext={valueText ?? valueLabel}
          onChange={(event) => onChange(Number(event.target.value))}
          className="figur-skyver min-w-24 flex-1 cursor-pointer sm:w-40 sm:flex-none"
        />
        {ends ? (
          <span className="text-muted-foreground" aria-hidden="true">
            {ends[1]}
          </span>
        ) : null}
      </span>
      <span className="shrink-0 font-mono text-primary" aria-hidden="true">
        {valueLabel}
      </span>
    </label>
  );
}

/* ---------- etiketter ---------- */

export type Lab = {
  text: string;
  /** Tekstens plassering på bred skjerm. */
  x: number;
  y: number;
  /** Punktet etiketten peker på: strek på bred skjerm, nummermerke med kort strek på smal. */
  at?: [number, number];
  /** Egen plass for nummermerket på smal skjerm (utenfor objektet). */
  badge?: [number, number];
  color?: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  weight?: number;
  /** Farge på konturen rundt teksten, f.eks. lys kontur for mørk tekst på is. */
  halo?: string;
  /** Skjules på smal skjerm (f.eks. når utsnittet ikke viser det etiketten peker på). */
  narrowHide?: boolean;
};

type Box = { x: number; y: number; w: number; h: number };
type Seg = [number, number, number, number];

function segDist(a: Seg, b: Seg) {
  const cross = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number) =>
    (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  const d1 = cross(b[0], b[1], b[2], b[3], a[0], a[1]);
  const d2 = cross(b[0], b[1], b[2], b[3], a[2], a[3]);
  const d3 = cross(a[0], a[1], a[2], a[3], b[0], b[1]);
  const d4 = cross(a[0], a[1], a[2], a[3], b[2], b[3]);
  if (d1 * d2 < 0 && d3 * d4 < 0) return 0;
  const pd = (px: number, py: number, s: Seg) => {
    const vx = s[2] - s[0];
    const vy = s[3] - s[1];
    const l2 = vx * vx + vy * vy || 1;
    const t = clamp(((px - s[0]) * vx + (py - s[1]) * vy) / l2);
    return Math.hypot(px - (s[0] + t * vx), py - (s[1] + t * vy));
  };
  return Math.min(pd(a[0], a[1], b), pd(a[2], a[3], b), pd(b[0], b[1], a), pd(b[2], b[3], a));
}
/** Går streken gjennom boksen (ikke bare innom kanten)? */
function segHitsBox(s: Seg, b: Box, pad = 0) {
  const x0 = b.x - pad;
  const y0 = b.y - pad;
  const x1 = b.x + b.w + pad;
  const y1 = b.y + b.h + pad;
  for (let k = 1; k < 24; k++) {
    const t = k / 24;
    const x = s[0] + (s[2] - s[0]) * t;
    const y = s[1] + (s[3] - s[1]) * t;
    if (x > x0 && x < x1 && y > y0 && y < y1) return true;
  }
  return false;
}

/**
 * Velger startpunkt for hver strek i kanten av den målte tekstboksen, slik at streken
 * verken går gjennom egen eller andres tekst, og ikke ligger oppå eller krysser andre streker.
 */
function placeLeaders(labels: Lab[], boxes: Box[]) {
  const placed: (Seg | null)[] = [];
  const order = labels
    .map((l, i) => i)
    .sort((i, j) => {
      const li = labels[i].at;
      const lj = labels[j].at;
      const di = li ? Math.hypot(li[0] - labels[i].x, li[1] - labels[i].y) : 0;
      const dj = lj ? Math.hypot(lj[0] - labels[j].x, lj[1] - labels[j].y) : 0;
      return di - dj;
    });
  const result: (Seg | null)[] = labels.map(() => null);
  for (const i of order) {
    const l = labels[i];
    const b = boxes[i];
    if (!l.at || !b) continue;
    const [ax, ay] = l.at;
    const pad = 3;
    const x0 = b.x - pad;
    const y0 = b.y - pad;
    const x1 = b.x + b.w + pad;
    const y1 = b.y + b.h + pad;
    if (ax >= x0 && ax <= x1 && ay >= y0 && ay <= y1) continue;
    const near: [number, number] = [clamp(ax, x0, x1), clamp(ay, y0, y1)];
    const cands: [number, number][] = [
      near,
      [x0, (y0 + y1) / 2],
      [x1, (y0 + y1) / 2],
      [(x0 + x1) / 2, y0],
      [(x0 + x1) / 2, y1],
      [x0, y0],
      [x1, y0],
      [x0, y1],
      [x1, y1],
      [clamp(ax, x0, x1), y0],
      [clamp(ax, x0, x1), y1],
      [x0, clamp(ay, y0, y1)],
      [x1, clamp(ay, y0, y1)],
    ];
    let best: Seg | null = null;
    let bestCost = Infinity;
    for (const [cx, cy] of cands) {
      const seg: Seg = [cx, cy, ax, ay];
      let cost = Math.hypot(ax - cx, ay - cy);
      if (segHitsBox(seg, b, -1)) cost += 1e5;
      boxes.forEach((o, j) => {
        if (j !== i && o && segHitsBox(seg, o, 2)) cost += 1e4;
      });
      for (const q of placed) if (q && segDist(seg, q) < 5) cost += 1e4;
      if (cost < bestCost) {
        bestCost = cost;
        best = seg;
      }
    }
    result[i] = best;
    placed.push(best);
  }
  return result;
}

function estimateBox(l: Lab, size: number): Box {
  const w = l.text.length * size * 0.56;
  const x = l.anchor === "end" ? l.x - w : l.anchor === "middle" ? l.x - w / 2 : l.x;
  return { x, y: l.y - size * 0.95, w, h: size * 1.25 };
}

function sameBoxes(a: Box[], b: Box[]) {
  if (a.length !== b.length) return false;
  return a.every(
    (box, i) =>
      Math.abs(box.x - b[i].x) < 0.6 &&
      Math.abs(box.y - b[i].y) < 0.6 &&
      Math.abs(box.w - b[i].w) < 0.6 &&
      Math.abs(box.h - b[i].h) < 0.6,
  );
}

/** Nummermerker på smal skjerm: utenfor objektet, kort strek til punktet, ingen overlapp. */
function placeBadges(labels: Lab[], vb: number[], r: number) {
  const [vbX, vbY, vbW, vbH] = vb;
  const lo = (v: number, a: number, b: number) => clamp(v, a + r + 3, b - r - 3);
  const pos = labels.map((l) => {
    if (l.badge) return [l.badge[0], l.badge[1]];
    if (l.at) return [l.at[0], l.at[1] - r * 1.9];
    return [l.x, l.y];
  });
  const targets = labels.map((l) => l.at ?? l.badge ?? [l.x, l.y]);
  const gap = 2 * r + 4;
  for (let it = 0; it < 60; it++) {
    let moved = false;
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const dx = pos[j][0] - pos[i][0];
        const dy = pos[j][1] - pos[i][1];
        const dist = Math.hypot(dx, dy);
        if (dist < gap) {
          const ux = dist > 0.01 ? dx / dist : 1;
          const uy = dist > 0.01 ? dy / dist : 0;
          const push = (gap - dist) / 2 + 0.5;
          pos[i][0] -= ux * push;
          pos[i][1] -= uy * push;
          pos[j][0] += ux * push;
          pos[j][1] += uy * push;
          moved = true;
        }
      }
      // merket skal ikke dekke punktet en annen etikett peker på
      targets.forEach((t, j) => {
        if (j === i || !labels[j].at) return;
        const dx = pos[i][0] - t[0];
        const dy = pos[i][1] - t[1];
        const dist = Math.hypot(dx, dy);
        if (dist < r + 5) {
          const ux = dist > 0.01 ? dx / dist : 0;
          const uy = dist > 0.01 ? dy / dist : -1;
          pos[i][0] += ux * (r + 5.5 - dist);
          pos[i][1] += uy * (r + 5.5 - dist);
          moved = true;
        }
      });
      pos[i][0] = lo(pos[i][0], vbX, vbX + vbW);
      pos[i][1] = lo(pos[i][1], vbY, vbY + vbH);
    }
    if (!moved) break;
  }
  // står to merker fortsatt oppå hverandre (f.eks. klemt i et hjørne), flyttes det siste
  // til nærmeste ledige plass rundt punktet det viser til
  const free = (i: number, x: number, y: number) =>
    pos.every((q, j) => j === i || Math.hypot(q[0] - x, q[1] - y) >= gap) &&
    targets.every((t, j) => j === i || !labels[j].at || Math.hypot(t[0] - x, t[1] - y) >= r + 5);
  for (let i = 0; i < pos.length; i++) {
    if (free(i, pos[i][0], pos[i][1])) continue;
    const [tx, ty] = targets[i];
    let done = false;
    for (const dist of [2.2, 3.2, 4.4, 5.6]) {
      for (let k = 0; k < 16 && !done; k++) {
        const ang = -Math.PI / 2 + (k * Math.PI) / 8;
        const x = lo(tx + Math.cos(ang) * r * dist, vbX, vbX + vbW);
        const y = lo(ty + Math.sin(ang) * r * dist, vbY, vbY + vbH);
        if (free(i, x, y)) {
          pos[i] = [x, y];
          done = true;
        }
      }
      if (done) break;
    }
  }
  return pos.map((p) => [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10] as const);
}

function LabelLayer({
  labels,
  narrow,
  vb,
  scale,
}: {
  labels: Lab[];
  narrow: boolean;
  vb: number[];
  /** CSS-piksler per viewBox-enhet (0 = ukjent ennå). */
  scale: number;
}) {
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const [measured, setMeasured] = useState<{ key: string; boxes: Box[] } | null>(null);
  // minst 12 CSS-piksler, uansett hvor smal figuren er
  const sizeOf = useCallback((l: Lab) => figureFont(l.size ?? 16, scale), [scale]);
  const key = `${narrow ? "n" : "w"}|${labels
    .map((l) => `${l.text}@${l.x},${l.y},${sizeOf(l)},${l.anchor ?? ""}`)
    .join(";")}`;
  // Måles når etikettene eller skriftstørrelsen endres, og en gang til når skriftene er lastet.
  // Avhengighetene må være med: uten dem kjørte effekten etter hver tegning og kunne gå i ring
  // («Maximum update depth exceeded» på Landformer). setState hopper over når boksene er like,
  // så nye label-arrayer med samme innhold ikke starter en ny runde.
  const [fontTick, setFontTick] = useState(0);
  useEffect(() => {
    let live = true;
    document.fonts?.ready.then(() => live && setFontTick((t) => t + 1));
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    if (narrow) return;
    const boxes = labels.map((l, i) => {
      const el = textRefs.current[i];
      if (!el) return estimateBox(l, sizeOf(l));
      const bb = el.getBBox();
      return {
        x: Math.round(bb.x * 10) / 10,
        y: Math.round(bb.y * 10) / 10,
        w: Math.round(bb.width * 10) / 10,
        h: Math.round(bb.height * 10) / 10,
      };
    });
    setMeasured((prev) =>
      prev && prev.key === key && sameBoxes(prev.boxes, boxes) ? prev : { key, boxes },
    );
  }, [key, narrow, fontTick, labels, sizeOf]);
  const [vbX, vbY, vbW] = vb;
  if (narrow) {
    // minst ca. 23 CSS-piksler i diameter, så tallet blir minst 12 px
    const r = scale > 0 ? Math.max(11.5 / scale, vbW * 0.02) : vbW * 0.03;
    const pos = placeBadges(labels, vb, r);
    return (
      <g aria-hidden="true" data-nocheck="">
        {labels.map((l, i) => {
          const [x, y] = pos[i];
          const fill = l.halo ?? l.color ?? C.fg;
          const at = l.at;
          const far = at ? Math.hypot(at[0] - x, at[1] - y) : 0;
          const ux = at && far > 0 ? (at[0] - x) / far : 0;
          const uy = at && far > 0 ? (at[1] - y) / far : 0;
          return (
            <g key={`${l.text}-${i}`} data-badge={i + 1}>
              {at && far > r + 4 ? (
                <g data-badge-leader="">
                  <line
                    x1={x + ux * r}
                    y1={y + uy * r}
                    x2={at[0]}
                    y2={at[1]}
                    stroke={P.halo}
                    strokeWidth={r * 0.32}
                    strokeLinecap="round"
                  />
                  <line
                    x1={x + ux * r}
                    y1={y + uy * r}
                    x2={at[0]}
                    y2={at[1]}
                    stroke={fill}
                    strokeWidth={r * 0.14}
                    strokeLinecap="round"
                  />
                  <circle cx={at[0]} cy={at[1]} r={r * 0.22} fill={fill} stroke={P.halo} />
                </g>
              ) : null}
              <circle cx={x} cy={y} r={r} fill={fill} stroke={P.halo} strokeWidth={r * 0.22} />
              <text
                x={x}
                y={y + r * 0.42}
                textAnchor="middle"
                fontSize={r * 1.22}
                fontWeight={800}
                fontFamily={font}
                fill={l.halo ? (l.color ?? P.halo) : P.halo}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>
    );
  }
  void vbX;
  void vbY;
  const boxes =
    measured && measured.key === key
      ? measured.boxes
      : labels.map((l) => estimateBox(l, sizeOf(l)));
  const leaders = placeLeaders(labels, boxes);
  return (
    <g aria-hidden="true">
      {labels.map((l, i) => {
        const seg = leaders[i];
        const color = l.color ?? C.fg;
        return seg && l.at ? (
          <g key={`leader-${l.text}-${i}`} data-leader="" data-for={l.text}>
            <line
              x1={seg[0]}
              y1={seg[1]}
              x2={seg[2]}
              y2={seg[3]}
              stroke={P.halo}
              strokeWidth={4.2}
              strokeLinecap="round"
            />
            <line
              x1={seg[0]}
              y1={seg[1]}
              x2={seg[2]}
              y2={seg[3]}
              stroke={color}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
            <circle
              cx={l.at[0]}
              cy={l.at[1]}
              r={3}
              fill={color}
              stroke={P.halo}
              strokeWidth={1.2}
            />
          </g>
        ) : null;
      })}
      {labels.map((l, i) => (
        <text
          key={`${l.text}-${i}`}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          x={l.x}
          y={l.y}
          fill={l.color ?? C.fg}
          fontSize={sizeOf(l)}
          fontWeight={l.weight ?? 600}
          textAnchor={l.anchor ?? "start"}
          fontFamily={font}
          stroke={l.halo ?? P.halo}
          strokeWidth={4}
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {l.text}
        </text>
      ))}
    </g>
  );
}

/* ---------- tegnforklaring ---------- */

export type Key = {
  text: string;
  color: string;
  kind: "dash" | "line" | "fill" | "symbol" | "crevasse";
  symbol?: string;
  /** Vises ikke i dette steget (raden beholder høyden, så figuren ikke hopper). */
  off?: boolean;
};

function KeySample({ k }: { k: Key }) {
  return (
    <svg width="30" height="14" viewBox="0 0 30 14" aria-hidden="true" className="shrink-0">
      {k.kind === "dash" ? (
        <line
          x1="1"
          y1="7"
          x2="29"
          y2="7"
          stroke={k.color}
          strokeWidth="2.4"
          strokeDasharray="5 4"
        />
      ) : k.kind === "line" ? (
        <line x1="1" y1="7" x2="29" y2="7" stroke={k.color} strokeWidth="3" />
      ) : k.kind === "crevasse" ? (
        <path d="M6 3 L9 12 L12 3 Z M17 3 L20 10 L23 3 Z" fill={k.color} />
      ) : k.kind === "fill" ? (
        <rect x="3" y="1" width="24" height="12" rx="2" fill={k.color} />
      ) : (
        <g stroke={k.color} strokeWidth="1.8" fill="none">
          <circle cx="15" cy="7" r="5.5" />
          <path d="M11.2 3.2 L18.8 10.8 M18.8 3.2 L11.2 10.8" />
        </g>
      )}
    </svg>
  );
}

/* ---------- felles fyll ---------- */

type Defs = ReturnType<typeof defIds>;
function defIds(u: string) {
  const ids = {
    sky: `${u}-sky`,
    rock: `${u}-rock`,
    strata: `${u}-strata`,
    ice: `${u}-ice`,
    iceBands: `${u}-iceBands`,
    snow: `${u}-snow`,
    firn: `${u}-firn`,
    water: `${u}-water`,
    moraine: `${u}-moraine`,
    outwash: `${u}-outwash`,
    clay: `${u}-clay`,
    litho: `${u}-litho`,
    astheno: `${u}-astheno`,
    shadow: `${u}-shadow`,
    glow: `${u}-glow`,
  };
  const url = Object.fromEntries(Object.entries(ids).map(([k, v]) => [k, `url(#${v})`])) as Record<
    keyof typeof ids,
    string
  >;
  return { id: ids, url };
}

function SceneDefs({ d }: { d: Defs }) {
  const { id } = d;
  return (
    <>
      <linearGradient id={id.sky} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={P.skyTop} />
        <stop offset="1" stopColor={P.skyLow} />
      </linearGradient>
      <linearGradient id={id.rock} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stopColor={P.rockLight} />
        <stop offset="0.45" stopColor={P.rock} />
        <stop offset="1" stopColor={P.rockDark} />
      </linearGradient>
      <pattern
        id={id.strata}
        width="120"
        height="46"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-8)"
      >
        <path
          d="M0 12 C30 9 60 15 120 11"
          stroke="#000"
          strokeOpacity="0.18"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M0 31 C40 34 80 28 120 32"
          stroke="#000"
          strokeOpacity="0.13"
          strokeWidth="1"
          fill="none"
        />
        <path d="M44 12 L40 31 M98 32 L101 46" stroke="#000" strokeOpacity="0.16" strokeWidth="1" />
      </pattern>
      <linearGradient id={id.ice} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#eef6fb" />
        <stop offset="0.5" stopColor={P.ice} />
        <stop offset="1" stopColor={P.iceDeep} />
      </linearGradient>
      <pattern
        id={id.iceBands}
        width="90"
        height="14"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(6)"
      >
        <path
          d="M0 4 C25 2 55 6 90 4"
          stroke={P.iceLine}
          strokeOpacity="0.45"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0 10 C30 12 60 8 90 10"
          stroke={P.iceLine}
          strokeOpacity="0.25"
          strokeWidth="0.8"
          fill="none"
        />
      </pattern>
      <linearGradient id={id.snow} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e3eef5" />
      </linearGradient>
      <pattern id={id.firn} width="16" height="8" patternUnits="userSpaceOnUse">
        <rect width="16" height="8" fill="#eef5f9" />
        <circle cx="3" cy="3" r="1" fill="#b9d2e2" />
        <circle cx="11" cy="6" r="0.9" fill="#c6dbe8" />
      </pattern>
      <linearGradient id={id.water} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={P.water} />
        <stop offset="1" stopColor={P.waterDeep} />
      </linearGradient>
      <pattern id={id.moraine} width="34" height="26" patternUnits="userSpaceOnUse">
        <rect width="34" height="26" fill={P.moraine} />
        <ellipse cx="7" cy="7" rx="5" ry="3.6" fill="#6f614e" />
        <circle cx="22" cy="5" r="1.6" fill="#a8977c" />
        <circle cx="27" cy="16" r="3" fill="#75674f" />
        <circle cx="12" cy="18" r="1.2" fill="#b4a386" />
        <circle cx="17" cy="12" r="0.9" fill="#a8977c" />
        <circle cx="4" cy="21" r="2.1" fill="#6f614e" />
        <circle cx="31" cy="24" r="1" fill="#b4a386" />
      </pattern>
      <pattern id={id.outwash} width="40" height="18" patternUnits="userSpaceOnUse">
        <rect width="40" height="18" fill={P.outwash} />
        <rect y="0" width="40" height="5" fill="#b9a273" />
        <rect y="9" width="40" height="3" fill="#d5c39b" />
        <circle cx="6" cy="2.5" r="1.4" fill="#a08a5e" />
        <circle cx="18" cy="2.4" r="1.2" fill="#a08a5e" />
        <circle cx="31" cy="2.6" r="1.4" fill="#a08a5e" />
        <circle cx="12" cy="15" r="0.6" fill="#a08a5e" />
        <circle cx="26" cy="15" r="0.6" fill="#a08a5e" />
      </pattern>
      <pattern id={id.clay} width="30" height="8" patternUnits="userSpaceOnUse">
        <rect width="30" height="8" fill={P.clay} />
        <path d="M0 3 H30" stroke="#a39b88" strokeWidth="0.7" />
        <path d="M0 6.5 H30" stroke="#7a7262" strokeWidth="0.5" />
      </pattern>
      <linearGradient id={id.litho} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6e7a6a" />
        <stop offset="1" stopColor="#4a5548" />
      </linearGradient>
      <linearGradient id={id.astheno} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={P.astheno} />
        <stop offset="1" stopColor={P.asthenoDeep} />
      </linearGradient>
      <filter id={id.shadow} x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
      </filter>
      <filter id={id.glow} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </>
  );
}

function Marker({ id, color }: { id: string; color: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 12 12"
      refX="10"
      refY="6"
      markerWidth="7"
      markerHeight="7"
      orient="auto"
    >
      <path d="M0 1.5 L11 6 L0 10.5 z" fill={color} />
    </marker>
  );
}

export type Markers = {
  fg: string;
  cold: string;
  warm: string;
  teal: string;
  ice: string;
  dark: string;
};

/* ---------- figurramme ---------- */

/** Under denne figurbredden (CSS-piksler) brukes nummermerker og liste i stedet for etiketter. */
export const NARROW_FIGURE_PX = 760;

/**
 * På smal skjerm skal en strek på 3 viewBox-enheter bli minst så mange CSS-piksler.
 * Pilspisser følger strekbredden (markerUnits = strokeWidth), så de vokser med.
 */
const NARROW_STROKE_PX = 1.8;

/**
 * Samler streker som kan tyknes. Hopper over defs, tekst, markører og data-nocheck
 * (høydefelt og skjøter), så tusenvis av polygoner ikke går gjennom løkken.
 */
function collectBoostableStrokes(el: Element, out: SVGElement[]) {
  const tag = el.tagName.toLowerCase();
  if (tag === "defs" || tag === "marker" || tag === "text" || tag === "title") return;
  if (el.hasAttribute("data-nocheck")) return;
  if (el instanceof SVGElement && el.hasAttribute("stroke-width")) out.push(el);
  for (const child of el.children) collectBoostableStrokes(child, out);
}

export function IsbreFigur({
  title,
  heading,
  caption,
  viewBox,
  action,
  toolbar,
  status,
  playing = false,
  labels: allLabels = [],
  notes = [],
  keys = [],
  remark,
  narrowViewBox,
  forceNarrow,
  svgRef,
  children,
}: {
  title: string;
  heading: string;
  caption: ReactNode;
  viewBox: string;
  action?: ReactNode;
  toolbar?: ReactNode;
  /** Kort tekst om hva som skjer nå (vises over figuren, leses opp av skjermleser). */
  status?: ReactNode;
  /** Spiller animasjonen? Da leses ikke statuslinjen opp ved hvert steg (aria-live av). */
  playing?: boolean;
  labels?: Lab[];
  /** Målestokk/orientering, f.eks. «Skjematisk, høyden er overdrevet». Vises som lesbar linje under figuren. */
  notes?: string[];
  /** Tegnforklaring for linjer og felt (vises som HTML under figuren). */
  keys?: Key[];
  /** Merknad som skal være godt synlig under figuren. */
  remark?: ReactNode;
  /** Eget utsnitt når figuren er smal (samme koordinater, bare beskåret). */
  narrowViewBox?: string;
  /**
   * Overstyrer smal/bred når figuren selv må vite det før den tegnes (frost stables).
   * Uten denne brukes figurens egen bredde, og vindusbredden før første måling.
   */
  forceNarrow?: boolean;
  svgRef?: RefObject<SVGSVGElement | null>;
  children: (ctx: { d: Defs; m: Markers; narrow: boolean; scale: number }) => ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const d = defIds(uid);
  // smal/bred etter figurens egen bredde; vindusbredden brukes bare før første måling
  const [boxRef, boxWidth] = useBoxWidth<HTMLDivElement>();
  const narrowWindow = useNarrow();
  const narrow =
    forceNarrow !== undefined
      ? forceNarrow
      : boxWidth > 0
        ? boxWidth < NARROW_FIGURE_PX
        : narrowWindow;
  const svgNode = useRef<SVGSVGElement | null>(null);
  const strokeMemo = useRef(new WeakMap<SVGElement, { base: number; boost: number }>());
  const strokesBoosted = useRef(false);
  const setSvgRef = useCallback(
    (node: SVGSVGElement | null) => {
      svgNode.current = node;
      if (svgRef) svgRef.current = node;
    },
    [svgRef],
  );
  const labels = narrow ? allLabels.filter((l) => !l.narrowHide) : allLabels;
  const m: Markers = {
    fg: `${uid}-mfg`,
    cold: `${uid}-mcold`,
    warm: `${uid}-mwarm`,
    teal: `${uid}-mteal`,
    ice: `${uid}-mice`,
    dark: `${uid}-mdark`,
  };
  const vbStr = narrow && narrowViewBox ? narrowViewBox : viewBox;
  const vb = vbStr.split(/\s+/).map(Number);
  const [vbX, vbY, vbW, vbH] = vb;
  const svgWidth = boxWidth > 0 ? Math.min(boxWidth, 1024) : 0;
  const scale = svgWidth > 0 ? svgWidth / vbW : 0;
  // Tykkere streker bare når figuren er smal og skalaen gjør 3 enheter tynnere enn 1,8 px.
  // Basen huskes, så React kan sette attributtet tilbake til JSX-verdien uten at vi tykner dobbelt.
  // Tykkere enn 8 enheter (elveleie, morene) får være som de er, ellers blir pilene enorme.
  useLayoutEffect(() => {
    const svg = svgNode.current;
    if (!svg) return;
    const factor = narrow && scale > 0 ? Math.max(1, NARROW_STROKE_PX / (3 * scale)) : 1;
    if (factor === 1 && !strokesBoosted.current) return;
    const nodes: SVGElement[] = [];
    collectBoostableStrokes(svg, nodes);
    const memo = strokeMemo.current;
    let any = false;
    for (const el of nodes) {
      const raw = el.getAttribute("stroke-width");
      if (raw == null || raw === "") continue;
      const current = Number(raw);
      if (!Number.isFinite(current)) continue;
      const prev = memo.get(el);
      const base = prev && Math.abs(current - prev.base * prev.boost) < 0.08 ? prev.base : current;
      const boost = base <= 8 ? factor : 1;
      const next = Math.round(base * boost * 100) / 100;
      if (Math.abs(current - next) > 0.02) el.setAttribute("stroke-width", String(next));
      memo.set(el, { base, boost });
      if (boost !== 1) any = true;
    }
    strokesBoosted.current = any;
  });
  const actionNode =
    isValidElement<{ name?: string }>(action) && action.type === PlayPauseToggle
      ? cloneElement(action, { name: heading })
      : action;
  const describedBy = [status ? `${uid}-status` : "", labels.length ? `${uid}-labels` : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <FigurNavn.Provider value={heading}>
      <FigureFrame heading={heading} caption={caption} action={actionNode}>
        {toolbar ? (
          <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">{toolbar}</div>
        ) : null}
        {status ? (
          <p
            id={`${uid}-status`}
            className="mb-2 min-h-[1.25rem] text-sm font-medium text-foreground"
            aria-live={playing ? "off" : "polite"}
          >
            {status}
          </p>
        ) : null}
        <div ref={boxRef}>
          <svg
            ref={setSvgRef}
            viewBox={vbStr}
            className="mx-auto h-auto w-full max-w-5xl"
            role="img"
            aria-labelledby={`${uid}-title`}
            aria-describedby={describedBy || undefined}
          >
            <title id={`${uid}-title`}>{title}</title>
            <defs>
              <SceneDefs d={d} />
              <Marker id={m.fg} color={C.fg} />
              <Marker id={m.cold} color={C.cold} />
              <Marker id={m.warm} color={C.warm} />
              <Marker id={m.teal} color={C.teal} />
              <Marker id={m.ice} color="#2f5f80" />
              <Marker id={m.dark} color={P.halo} />
            </defs>
            <rect x={vbX} y={vbY} width={vbW} height={vbH} fill={C.bg} rx="10" />
            <FigureScale.Provider value={scale}>
              {children({ d, m, narrow, scale })}
              <LabelLayer labels={labels} narrow={narrow} vb={vb} scale={scale} />
            </FigureScale.Provider>
          </svg>
        </div>
        {narrow && labels.length ? (
          <ol
            id={`${uid}-labels`}
            className="mt-3 grid gap-1.5 text-sm leading-snug text-foreground"
            aria-label="Forklaring til tallene i figuren"
          >
            {labels.map((l, i) => (
              <li key={`${l.text}-${i}`} className="flex items-start gap-2">
                <span
                  className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
                  style={{
                    background: l.halo ?? l.color ?? C.fg,
                    color: l.halo ? (l.color ?? P.halo) : P.halo,
                  }}
                >
                  {i + 1}
                </span>
                <span>{l.text}</span>
              </li>
            ))}
          </ol>
        ) : labels.length ? (
          <ul id={`${uid}-labels`} className="sr-only" aria-label="Etiketter i figuren">
            {labels.map((l, i) => (
              <li key={`${l.text}-${i}`}>{l.text}</li>
            ))}
          </ul>
        ) : null}
        {keys.length ? (
          <ul
            className="mt-3 flex min-h-5 flex-wrap gap-x-5 gap-y-1.5 text-sm text-foreground"
            aria-label="Tegnforklaring"
          >
            {keys
              .filter((k) => !k.off)
              .map((k) => (
                <li key={k.text} className="inline-flex items-center gap-2">
                  <KeySample k={k} />
                  <span>{k.text}</span>
                </li>
              ))}
          </ul>
        ) : null}
        {notes.length ? (
          <p className="mt-2 text-[13px] leading-snug text-muted-foreground">{notes.join(" · ")}</p>
        ) : null}
        {remark ? (
          <p className="mt-2 rounded-md border border-border/80 bg-muted/40 px-3 py-2 text-sm leading-snug text-foreground">
            {remark}
          </p>
        ) : null}
      </FigureFrame>
    </FigurNavn.Provider>
  );
}

export function Polys({ polys, opacity }: { polys: Poly[]; opacity?: number }) {
  return (
    <g opacity={opacity} data-nocheck="">
      {polys.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={p.fill}
          stroke={p.fill}
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}
