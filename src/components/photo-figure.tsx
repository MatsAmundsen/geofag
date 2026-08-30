import { useId } from "react";

const TONE = {
  teal: "#6fb3b8",
  warm: "#e0b48a",
  cold: "#8eb4d4",
  low: "#e08a8a",
  fg: "#f4f7f8",
} as const;

export type FigTone = keyof typeof TONE;

export type FigArrow = {
  d: string;
  tone?: FigTone;
  width?: number;
  dash?: boolean;
};

export type FigMark = {
  x: number;
  y: number;
  text: string;
  n?: string;
  tone?: FigTone;
  align?: "left" | "center" | "right";
};

function Overlay({ arrows, marks }: { arrows?: FigArrow[]; marks?: FigMark[] }) {
  const uid = useId().replace(/:/g, "");
  if (!arrows?.length && !marks?.length) return null;

  return (
    <>
      {arrows?.length ? (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 56.25"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {(Object.keys(TONE) as FigTone[]).map((k) => (
              <marker
                key={k}
                id={`${uid}-${k}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4.5"
                markerHeight="4.5"
                orient="auto"
              >
                <path d="M0 1 L9 5 L0 9 z" fill={TONE[k]} />
              </marker>
            ))}
          </defs>
          {arrows.map((a, i) => {
            const tone = a.tone ?? "fg";
            return (
              <path
                key={i}
                d={a.d}
                fill="none"
                stroke={TONE[tone]}
                strokeWidth={a.width ?? 1.15}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={a.dash ? "2.2 1.6" : undefined}
                markerEnd={`url(#${uid}-${tone})`}
              />
            );
          })}
        </svg>
      ) : null}
      {marks?.map((m, i) => {
        const tone = m.tone ?? "fg";
        // Anchor from the side the label grows away from, so the containing block
        // leaves room for the text instead of squeezing it against the edge.
        const side =
          m.align === "right"
            ? { right: `${100 - m.x}%` }
            : m.align === "center"
              ? { left: `${m.x}%`, translateX: "-50%" }
              : { left: `${m.x}%` };
        return (
          <span
            key={`${m.text}-${i}`}
            className="pointer-events-none absolute max-w-[46%] rounded-md bg-background/78 px-2 py-1 text-[11px] font-medium leading-tight text-foreground shadow-sm backdrop-blur-sm sm:text-xs"
            style={{
              left: side.left,
              right: side.right,
              top: `${m.y}%`,
              transform: `translate(${side.translateX ?? "0%"}, -50%)`,
              color: TONE[tone],
            }}
          >
            {m.n ? (
              <span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {m.n}
              </span>
            ) : null}
            {m.text}
          </span>
        );
      })}
    </>
  );
}

export function PhotoFigure({
  src,
  alt,
  heading,
  caption,
  points = [],
  arrows,
  marks,
  fit = "cover",
}: {
  src: string;
  alt: string;
  heading: string;
  caption: string;
  points?: { n: string; label: string }[];
  arrows?: FigArrow[];
  marks?: FigMark[];
  fit?: "cover" | "contain";
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
        {heading}
      </p>
      <div className="relative aspect-video bg-muted">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={
            fit === "contain"
              ? "absolute inset-0 h-full w-full object-contain"
              : "absolute inset-0 h-full w-full object-cover"
          }
        />
        <Overlay arrows={arrows} marks={marks} />
      </div>
      {points.length > 0 ? (
        <ol className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6">
          {points.map((p) => (
            <li key={p.n} className="flex gap-3 text-sm leading-snug">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {p.n}
              </span>
              <span>{p.label}</span>
            </li>
          ))}
        </ol>
      ) : null}
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}

export function FigurePlaceholder({
  heading,
  caption,
  label,
}: {
  heading: string;
  caption: string;
  label: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
        {heading}
      </p>
      <div role="img" aria-label={label} className="min-h-48 bg-muted" />
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}

export function PhotoPair({
  heading,
  caption,
  left,
  right,
}: {
  heading: string;
  caption: string;
  left: {
    src: string;
    alt: string;
    title: string;
    arrows?: FigArrow[];
    marks?: FigMark[];
  };
  right: {
    src: string;
    alt: string;
    title: string;
    arrows?: FigArrow[];
    marks?: FigMark[];
  };
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
        {heading}
      </p>
      <div className="grid sm:grid-cols-2">
        {[left, right].map((side) => (
          <div
            key={side.title}
            className="border-b border-border sm:border-b-0 sm:border-r sm:last:border-r-0"
          >
            <div className="relative aspect-video bg-muted">
              <img
                src={side.src}
                alt={side.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <Overlay arrows={side.arrows} marks={side.marks} />
            </div>
            <p className="px-4 py-2 text-xs font-medium text-foreground">{side.title}</p>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
