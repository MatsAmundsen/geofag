/**
 * Felles komponenter for isbre-figurene: figurramme med etiketter/nummermerker, steg-velger,
 * skyver og felles fyll (berg, is, snø, vann, morene, breelvmateriale, leire, litosfære, astenosfære).
 * Hjelpefunksjoner og hooks ligger i isbre-kit.ts.
 */
import { useId, type ReactNode, type RefObject } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { C, font } from "./svg-kit";
import { P, clamp, useNarrow, type Poly } from "./isbre-kit";

/* ---------- kontroller ---------- */

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
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
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
  ends,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  valueLabel: string;
  ends?: [string, string];
}) {
  return (
    <label className="flex w-full min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-foreground sm:w-auto">
      <span className="whitespace-nowrap">{label}</span>
      <span className="flex min-w-0 flex-1 items-center gap-1.5">
        {ends ? <span className="text-muted-foreground">{ends[0]}</span> : null}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuetext={valueLabel}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-24 flex-1 cursor-pointer accent-primary sm:w-40 sm:flex-none"
        />
        {ends ? <span className="text-muted-foreground">{ends[1]}</span> : null}
      </span>
      <span className="shrink-0 font-mono text-primary">{valueLabel}</span>
    </label>
  );
}

/* ---------- etiketter ---------- */

export type Lab = {
  text: string;
  /** Tekstens plassering på bred skjerm. */
  x: number;
  y: number;
  /** Punktet etiketten peker på: tynn strek på bred skjerm, nummermerke på smal. */
  at?: [number, number];
  /** Egen plass for nummermerket på smal skjerm. */
  badge?: [number, number];
  color?: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  weight?: number;
  /** Farge på konturen rundt teksten, f.eks. lys kontur for mørk tekst på is. */
  halo?: string;
};

function LabelLayer({ labels, narrow, vb }: { labels: Lab[]; narrow: boolean; vb: number[] }) {
  const [vbX, vbY, vbW, vbH] = vb;
  if (narrow) {
    const r = vbW * 0.028;
    return (
      <g aria-hidden="true" data-nocheck="">
        {labels.map((l, i) => {
          const [bx, by] = l.badge ?? l.at ?? [l.x, l.y];
          const x = clamp(bx, vbX + r + 3, vbX + vbW - r - 3);
          const y = clamp(by, vbY + r + 3, vbY + vbH - r - 3);
          return (
            <g key={`${l.text}-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={l.halo ?? l.color ?? C.fg}
                stroke={P.halo}
                strokeWidth={r * 0.22}
              />
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
  return (
    <g>
      {labels.map((l, i) => {
        const size = l.size ?? 16;
        // streken starter i kanten av en anslått tekstboks, så den aldri går gjennom teksten
        const tw = l.text.length * size * 0.56;
        const bx0 = l.anchor === "end" ? l.x - tw : l.anchor === "middle" ? l.x - tw / 2 : l.x;
        const sx = l.at ? clamp(l.at[0], bx0 - 5, bx0 + tw + 5) : 0;
        const sy = l.at ? clamp(l.at[1], l.y - size * 0.95, l.y + size * 0.35) : 0;
        return (
          <g key={`${l.text}-${i}`}>
            {l.at ? (
              <g data-leader="">
                <line
                  x1={sx}
                  y1={sy}
                  x2={l.at[0]}
                  y2={l.at[1]}
                  stroke={l.color ?? C.fg}
                  strokeWidth={1.1}
                  opacity={0.75}
                />
                <circle cx={l.at[0]} cy={l.at[1]} r={2.6} fill={l.color ?? C.fg} />
              </g>
            ) : null}
            <text
              x={l.x}
              y={l.y}
              fill={l.color ?? C.fg}
              fontSize={size}
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
          </g>
        );
      })}
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

export function IsbreFigur({
  title,
  heading,
  caption,
  viewBox,
  action,
  toolbar,
  status,
  labels = [],
  notes = [],
  keys = [],
  remark,
  narrowViewBox,
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
  labels?: Lab[];
  /** Målestokk/orientering, f.eks. «Skjematisk, høyden er overdrevet». Vises som lesbar linje under figuren. */
  notes?: string[];
  /** Tegnforklaring for linjer og felt (vises som HTML under figuren). */
  keys?: Key[];
  /** Merknad som skal være godt synlig under figuren. */
  remark?: ReactNode;
  /** Eget utsnitt på smal skjerm (samme koordinater, bare beskåret). */
  narrowViewBox?: string;
  svgRef?: RefObject<SVGSVGElement | null>;
  children: (ctx: { d: Defs; m: Markers; narrow: boolean }) => ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const d = defIds(uid);
  const narrow = useNarrow();
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
  return (
    <FigureFrame heading={heading} caption={caption} action={action}>
      {toolbar ? (
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">{toolbar}</div>
      ) : null}
      {status ? (
        <p className="mb-2 min-h-[1.25rem] text-sm font-medium text-foreground" aria-live="polite">
          {status}
        </p>
      ) : null}
      <svg
        ref={svgRef}
        viewBox={vbStr}
        className="mx-auto h-auto w-full max-w-5xl"
        role="img"
        aria-labelledby={`${uid}-title`}
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
        {children({ d, m, narrow })}
        <LabelLayer labels={labels} narrow={narrow} vb={vb} />
      </svg>
      {narrow && labels.length ? (
        <ol
          className="mt-3 grid gap-1.5 text-sm leading-snug text-foreground"
          aria-label="Forklaring til tallene i figuren"
        >
          {labels.map((l, i) => (
            <li key={`${l.text}-${i}`} className="flex items-start gap-2">
              <span
                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold"
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
