import type { ReactNode } from "react";

export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  note,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  note?: string;
}) {
  const shown = Number.isInteger(step) ? String(Math.round(value)) : value.toFixed(step < 0.1 ? 1 : 0);
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-medium tabular-nums text-sea">
          {shown} {unit}
        </span>
      </span>
      <input
        className="lab-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${shown} ${unit}`}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {note ? <span className="text-xs text-muted">{note}</span> : null}
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
                "min-h-11 rounded-full border px-3 text-sm transition-colors " +
                (on
                  ? "border-sea bg-sea text-card"
                  : "border-line bg-card text-ink hover:border-sea")
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
}: {
  playing: boolean;
  onToggle: () => void;
  onReset: () => void;
  time: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="min-h-11 rounded-full bg-sea px-4 text-sm font-medium text-card"
      >
        {playing ? "Pause" : "Start"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="min-h-11 rounded-full border border-line bg-card px-4 text-sm text-ink"
      >
        Nullstill
      </button>
      <span className="ml-auto text-sm tabular-nums text-muted">{time}</span>
    </div>
  );
}

export function Readouts({ items }: { items: { k: string; v: string; hint?: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.k} className="rounded-xl border border-line bg-paper px-3 py-2">
          <dt className="text-xs text-muted">{it.k}</dt>
          <dd className="mt-0.5 text-base font-medium tabular-nums text-ink">{it.v}</dd>
          {it.hint ? <p className="mt-0.5 text-xs text-muted">{it.hint}</p> : null}
        </div>
      ))}
    </dl>
  );
}

export function Lab({
  id,
  index,
  title,
  replaces,
  question,
  children,
  assume,
  conclusion,
}: {
  id: string;
  index: string;
  title: string;
  replaces: string;
  question: string;
  children: ReactNode;
  assume: string;
  conclusion: string;
}) {
  return (
    <section id={id} className="tsunami-pakke scroll-mt-24 border-t border-line py-8">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-display text-sm tracking-wide text-sea">{index}</p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-ink">{title}</h2>
      </div>
      <p className="mt-1 text-sm text-muted">{replaces}</p>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink">{question}</p>
      <div className="mt-5 flex flex-col gap-4">{children}</div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <p className="rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Antakelser. </span>
          {assume}
        </p>
        <p className="rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-relaxed text-ink">
          <span className="font-medium text-sea">Konklusjon. </span>
          {conclusion}
        </p>
      </div>
    </section>
  );
}
