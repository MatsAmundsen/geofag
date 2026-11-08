import type { ReactNode } from "react";
import { nb } from "./util";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--tl-sea)]";

export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  note,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  note?: string;
  format?: (v: number) => string;
}) {
  const digits = Number.isInteger(step) ? 0 : step < 0.1 ? 2 : 1;
  const shown = format ? format(value) : nb(value, digits);
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-medium tabular-nums text-sea">
          {shown} {unit}
        </span>
      </span>
      <input
        className={"lab-range " + focusRing}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${shown} ${unit}`}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {note ? <span className="text-sm text-muted">{note}</span> : null}
    </label>
  );
}

export function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-ink">{label}</span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.id)}
              className={
                "min-h-11 rounded-full border px-3 text-sm transition-colors motion-reduce:transition-none " +
                focusRing +
                " " +
                (on ? "border-sea bg-sea text-card" : "border-line bg-card text-ink hover:border-sea")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Transport({
  playing,
  onToggle,
  onReset,
  time,
  onStep,
  stepLabel = "Fram ett steg",
  playLabel = "Start",
}: {
  playing: boolean;
  onToggle: () => void;
  onReset: () => void;
  time: string;
  /** Trinnvis betjening, også for dem som har slått av bevegelse. */
  onStep?: () => void;
  stepLabel?: string;
  playLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={playing}
        className={"min-h-11 rounded-full bg-sea px-4 text-sm font-medium text-card " + focusRing}
      >
        {playing ? "Pause" : playLabel}
      </button>
      {onStep ? (
        <button
          type="button"
          onClick={onStep}
          className={"min-h-11 rounded-full border border-line bg-card px-4 text-sm text-ink " + focusRing}
        >
          {stepLabel}
        </button>
      ) : null}
      <button
        type="button"
        onClick={onReset}
        className={"min-h-11 rounded-full border border-line bg-card px-4 text-sm text-ink " + focusRing}
      >
        Nullstill
      </button>
      <span className="ml-auto text-sm tabular-nums text-muted" aria-live="polite">
        {time}
      </span>
    </div>
  );
}

export function Readouts({ items }: { items: { k: string; v: string; hint?: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.k} className="rounded-xl border border-line bg-paper px-3 py-2">
          <dt className="text-sm text-muted">{it.k}</dt>
          <dd className="mt-0.5 text-base font-medium tabular-nums text-ink">{it.v}</dd>
          {it.hint ? <p className="mt-0.5 text-sm text-muted">{it.hint}</p> : null}
        </div>
      ))}
    </dl>
  );
}

/** Kort, synlig merknad rett under figuren: målestokk, forstørrelse og hva som er forenklet. */
export function FigureNote({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted">{children}</p>;
}

export function Lab({
  id,
  index,
  title,
  question,
  children,
  assume,
  conclusion,
}: {
  id: string;
  index: string;
  title: string;
  /** Intern merknad om hvilken eldre modell som erstattes. Vises ikke for elevene. */
  replaces?: string;
  question: string;
  children: ReactNode;
  assume: string;
  conclusion: string;
}) {
  const headingId = `${id}-tittel`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="tsunami-pakke scroll-mt-24 border-t border-line py-8"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-display text-sm tracking-wide text-sea">Modell {index}</p>
        <h3 id={headingId} className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {title}
        </h3>
      </div>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink">{question}</p>
      <div className="mt-5 flex flex-col gap-4">{children}</div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <p className="rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Forenklinger. </span>
          {assume}
        </p>
        <p className="rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-relaxed text-ink" aria-live="polite">
          <span className="font-medium text-sea">Hva modellen viser nå. </span>
          {conclusion}
        </p>
      </div>
    </section>
  );
}
