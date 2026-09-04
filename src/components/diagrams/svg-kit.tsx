import { useId, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";

export const C = {
  bg: "#0f171c",
  fg: "#e8eef2",
  muted: "#8b9aa6",
  dim: "#2a3943",
  teal: "#6fb3b8",
  warm: "#e0b48a",
  cold: "#8eb4d4",
  low: "#d07a7a",
  rain: "#7eb8c9",
  sand: "#c9b896",
  white: "#f3f6f8",
};

export const font = "Source Sans 3, ui-sans-serif, system-ui, sans-serif";

function Marker({ id, color }: { id: string; color: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 12 12"
      refX="10"
      refY="6"
      markerWidth="8"
      markerHeight="8"
      orient="auto"
    >
      <path d="M0 1.5 L11 6 L0 10.5 z" fill={color} />
    </marker>
  );
}

export function Diagram({
  title,
  heading,
  caption,
  viewBox,
  children,
  wide,
}: {
  title: string;
  heading: string;
  caption: string;
  viewBox: string;
  wide?: boolean;
  children: (m: {
    teal: string;
    warm: string;
    cold: string;
    muted: string;
    low: string;
    fg: string;
    sand: string;
    rain: string;
  }) => ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const m = {
    teal: `${uid}-teal`,
    warm: `${uid}-warm`,
    cold: `${uid}-cold`,
    muted: `${uid}-muted`,
    low: `${uid}-low`,
    fg: `${uid}-fg`,
    sand: `${uid}-sand`,
    rain: `${uid}-rain`,
  };
  return (
    <FigureFrame heading={heading} caption={caption}>
      <svg
        viewBox={viewBox}
        className={wide ? "mx-auto h-auto w-full max-w-5xl" : "mx-auto h-auto w-full max-w-3xl"}
        role="img"
        aria-labelledby={`${uid}-title`}
      >
        <title id={`${uid}-title`}>{title}</title>
        <defs>
          <Marker id={m.teal} color={C.teal} />
          <Marker id={m.warm} color={C.warm} />
          <Marker id={m.cold} color={C.cold} />
          <Marker id={m.muted} color={C.muted} />
          <Marker id={m.low} color={C.low} />
          <Marker id={m.fg} color={C.fg} />
          <Marker id={m.sand} color={C.sand} />
          <Marker id={m.rain} color={C.rain} />
        </defs>
        <rect width="100%" height="100%" fill={C.bg} rx="10" />
        {children(m)}
      </svg>
    </FigureFrame>
  );
}

export function L({
  x,
  y,
  children,
  fill = C.fg,
  size = 15,
  anchor = "start",
  weight = 500,
  opacity,
}: {
  x: number | string;
  y: number | string;
  children: ReactNode;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  opacity?: number | string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      textAnchor={anchor}
      fontFamily={font}
      fontWeight={weight}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

export function Arrow({
  d,
  marker,
  color,
  width = 2.4,
  dash,
}: {
  d: string;
  marker: string;
  color: string;
  width?: number;
  dash?: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
      markerEnd={`url(#${marker})`}
    />
  );
}
