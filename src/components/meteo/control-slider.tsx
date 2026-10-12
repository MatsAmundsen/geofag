import * as Slider from "@radix-ui/react-slider";

/** Hav-anomali: kald (La Niña / negativ IOD) og varm (El Niño / positiv IOD). Samme som IOD-figurene. */
export const COOL = "#4fa3d8";
export const WARM = "#e8823f";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  low?: string;
  high?: string;
  onChange: (value: number) => void;
  /** Divergerende spor (kald ← nøytral → varm), fylt fra midten. */
  diverging?: boolean;
  /** Etiketter under sporet, jevnt fordelt (f.eks. tre: lav, midt, høy). */
  ticks?: string[];
  /** Tekst for skjermleser (aria-valuetext). */
  valueText?: (value: number) => string;
  /** id til en kort tekst som beskriver valgt verdi. */
  describedBy?: string;
  /** Tilgjengelig navn for selve håndtaket. Standard er `label`. */
  ariaLabel?: string;
};

export function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  low,
  high,
  onChange,
  diverging = false,
  ticks,
  valueText,
  describedBy,
  ariaLabel,
}: Props) {
  const span = max - min || 1;
  const mid = (min + max) / 2;
  const pos = ((value - min) / span) * 100;
  const tone = !diverging || value === mid ? "var(--color-primary)" : value < mid ? COOL : WARM;
  const labels = ticks ?? (low && high ? [low, high] : undefined);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums text-primary">{display}</span>
      </div>
      <Slider.Root
        className="relative flex h-11 w-full touch-none items-center select-none"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(next) => onChange(next[0] ?? value)}
      >
        <Slider.Track
          className="relative h-1.5 w-full grow rounded-full bg-border"
          style={
            diverging
              ? { background: `linear-gradient(90deg, ${COOL} 0%, var(--color-border) 50%, ${WARM} 100%)` }
              : undefined
          }
        >
          <Slider.Range className={diverging ? "absolute h-full opacity-0" : "absolute h-full rounded-full bg-primary"} />
          {diverging ? (
            <>
              <span
                aria-hidden="true"
                className="absolute top-0 h-full rounded-full"
                style={{
                  left: `${Math.min(50, pos)}%`,
                  width: `${Math.abs(pos - 50)}%`,
                  background: tone,
                }}
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-muted-foreground"
              />
            </>
          ) : null}
        </Slider.Track>
        <Slider.Thumb
          aria-label={ariaLabel ?? label}
          aria-valuetext={valueText ? valueText(value) : undefined}
          aria-describedby={describedBy}
          className="relative block size-6 rounded-full border-2 border-primary bg-foreground before:absolute before:-inset-2.5 before:content-[''] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          style={diverging ? { borderColor: tone } : undefined}
        />
      </Slider.Root>
      {labels ? (
        <div
          className="grid text-sm text-muted-foreground sm:text-xs"
          style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
          aria-hidden="true"
        >
          {labels.map((tick, i) => (
            <span
              key={tick}
              className={i === 0 ? "text-left" : i === labels.length - 1 ? "text-right" : "text-center"}
            >
              {tick}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
