import { useId, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { C, font, PlayPauseToggle } from "./svg-kit";
import { useBoxWidth, useInView } from "./isbre-kit";
import { useAnimationPlaying } from "./use-motion";

/**
 * Felles verktøy for figurene i Geofag 2 pakke A.
 * - To layouter (smal og bred). Bred brukes når figurboksen er minst 680 px.
 * - Tittel og beskrivelse (<title>/<desc>) for skjermlesere.
 * - Animasjon med pause. Bildet står i et godt utgangsbilde når animasjonen er av
 *   (prefers-reduced-motion eller pause).
 * - Minste skrift er 14 enheter i viewBox. Smal viewBox er 300 enheter bred, så
 *   skriften blir minst ca. 12 px på en 320 px bred skjerm.
 */

// eslint-disable-next-line react-refresh/only-export-components -- delte konstanter og hjelpefunksjoner ligger i samme kitfil som figurrammen
export const G = {
  green: "#8fc79a",
  violet: "#b8a6e0",
  amber: "#e8c36a",
  panel: "#16222b",
  panel2: "#1b2a34",
  line: "#3a4c58",
  ink: "#0f171c",
  water: "#4f8fb3",
  waterDeep: "#1f4a63",
  grid: "#22313b",
};

export const BREDDE_TERSKEL = 680;

const MARKS = {
  teal: C.teal,
  warm: C.warm,
  cold: C.cold,
  muted: C.muted,
  low: C.low,
  fg: C.fg,
  sand: C.sand,
  rain: C.rain,
  green: G.green,
  amber: G.amber,
  violet: G.violet,
} as const;
export type MarkNavn = keyof typeof MARKS;
export type Marks = Record<MarkNavn, string>;

const CSS = `
.g2a .a { animation-play-state: paused; transform-box: fill-box; transform-origin: center; }
.g2a.g2a-play .a { animation-play-state: running; }
.g2a .a-flow { stroke-dasharray: 7 7; animation: g2a-flow 1.1s linear infinite; }
.g2a .a-flowr { stroke-dasharray: 7 7; animation: g2a-flowr 1.1s linear infinite; }
.g2a .a-flow-s { stroke-dasharray: 7 7; animation: g2a-flow 2.4s linear infinite; }
.g2a .a-spin { animation: g2a-spin 6s linear infinite; }
.g2a .a-spin-s { animation: g2a-spin 12s linear infinite; }
.g2a .a-pulse { animation: g2a-pulse 2.4s ease-in-out infinite; }
.g2a .a-pulse2 { animation: g2a-pulse 2.4s ease-in-out -1.2s infinite; }
.g2a .a-drift { animation: g2a-drift 3.2s ease-in-out infinite; }
.g2a .a-drift2 { animation: g2a-drift 3.2s ease-in-out -1.6s infinite; }
.g2a .a-sway { animation: g2a-sway 4s ease-in-out infinite; }
.g2a .a-rise { animation: g2a-rise 3.4s ease-in-out infinite; }
@keyframes g2a-flow { to { stroke-dashoffset: -14; } }
@keyframes g2a-flowr { to { stroke-dashoffset: 14; } }
@keyframes g2a-spin { to { transform: rotate(360deg); } }
@keyframes g2a-pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes g2a-drift { 0%,100% { transform: translate(0,0); opacity: 1; } 50% { transform: translate(var(--dx,0px), var(--dy,0px)); opacity: .55; } }
@keyframes g2a-sway { 0%,100% { transform: translateX(0); } 50% { transform: translateX(var(--dx,6px)); } }
@keyframes g2a-rise { 0%,100% { transform: translateY(0); } 50% { transform: translateY(var(--dy,-6px)); } }
`;

export type Variant = { w: number; h: number };

export function G2Figur({
  title,
  desc,
  heading,
  caption,
  narrow,
  wide,
  animated,
  name,
  toolbar,
  children,
}: {
  title: string;
  desc: string;
  heading: string;
  caption: ReactNode;
  narrow: Variant;
  wide: Variant;
  animated?: boolean;
  name?: string;
  toolbar?: ReactNode;
  children: (c: { bred: boolean; mk: Marks; w: number; h: number }) => ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const [boxRef, bw] = useBoxWidth<HTMLDivElement>();
  const [viewRef, inView] = useInView<HTMLDivElement>();
  const { playing, toggle, motionClass } = useAnimationPlaying();
  const bred = bw >= BREDDE_TERSKEL;
  const v = bred ? wide : narrow;
  const run = animated && playing && inView;
  const mk = Object.fromEntries(
    (Object.keys(MARKS) as MarkNavn[]).map((k) => [k, `${uid}-${k}`]),
  ) as Marks;
  return (
    <FigureFrame
      heading={heading}
      caption={caption}
      action={
        animated ? (
          <PlayPauseToggle isPlaying={playing} onToggle={toggle} name={name ?? heading} />
        ) : undefined
      }
    >
      {toolbar ? <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">{toolbar}</div> : null}
      <div ref={boxRef} className="w-full">
        <div ref={viewRef}>
          <svg
            viewBox={`0 0 ${v.w} ${v.h}`}
            className={`g2a ${run ? "g2a-play" : ""} ${motionClass} mx-auto block h-auto w-full ${
              bred ? "max-w-4xl" : "max-w-[30rem]"
            }`}
            role="img"
            aria-labelledby={`${uid}-t ${uid}-d`}
          >
            <title id={`${uid}-t`}>{title}</title>
            <desc id={`${uid}-d`}>{desc}</desc>
            <style>{CSS}</style>
            <defs>
              {(Object.keys(MARKS) as MarkNavn[]).map((k) => (
                <marker
                  key={k}
                  id={mk[k]}
                  viewBox="0 0 12 12"
                  refX="10"
                  refY="6"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M0 1.5 L11 6 L0 10.5 z" fill={MARKS[k]} />
                </marker>
              ))}
            </defs>
            <rect width={v.w} height={v.h} fill={C.bg} rx="10" />
            {children({ bred, mk, w: v.w, h: v.h })}
          </svg>
        </div>
      </div>
    </FigureFrame>
  );
}

/** Tekst med flere linjer. `lines` er allerede brutt, så teksten kan måles og ikke overlappe. */
export function T({
  x,
  y,
  lines,
  size = 14,
  fill = C.fg,
  anchor = "start",
  weight = 500,
  lh,
  opacity,
}: {
  x: number;
  y: number;
  lines: string[] | string;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  lh?: number;
  opacity?: number;
}) {
  const arr = Array.isArray(lines) ? lines : [lines];
  const step = lh ?? size * 1.3;
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      fontFamily={font}
      fontWeight={weight}
      textAnchor={anchor}
      opacity={opacity}
    >
      {arr.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : step}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/** Rektangel med kant, brukt som kort/boks. */
export function Box({
  x,
  y,
  w,
  h,
  stroke = G.line,
  fill = G.panel,
  r = 8,
  sw = 1.4,
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  stroke?: string;
  fill?: string;
  r?: number;
  sw?: number;
  dash?: string;
}) {
  return (
    <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
  );
}

/** Norsk tall med komma. Hard mellomrom som tusenskille fra fem sifre. */
// eslint-disable-next-line react-refresh/only-export-components -- delte konstanter og hjelpefunksjoner ligger i samme kitfil som figurrammen
export function nb(n: number, d = 0) {
  const s = n.toFixed(d);
  const [h, f] = s.split(".");
  // Som i kapitteltekstene: tusenskille bare fra fem sifre (3217, men 20 000).
  const h2 = h.length >= 5 ? h.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") : h;
  return f ? `${h2},${f}` : h2;
}

/** Pil med animert strek (a-flow). Utgangsbildet er en stiplet pil. */
export function Flow({
  d,
  color,
  marker,
  w = 2.2,
  cls = "a a-flow",
  dash,
}: {
  d: string;
  color: string;
  marker?: string;
  w?: number;
  cls?: string;
  dash?: string;
}) {
  return (
    <path
      d={d}
      className={cls}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
      markerEnd={marker ? `url(#${marker})` : undefined}
    />
  );
}
