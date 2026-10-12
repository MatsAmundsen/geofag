import * as Slider from "@radix-ui/react-slider";

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
};

export function ControlSlider({ label, value, min, max, step, display, low, high, onChange }: Props) {
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
        <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-border">
          <Slider.Range className="absolute h-full rounded-full bg-primary" />
        </Slider.Track>
        <Slider.Thumb
          aria-label={label}
          className="block size-6 rounded-full border-2 border-primary bg-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        />
      </Slider.Root>
      {low && high ? (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{low}</span>
          <span>{high}</span>
        </div>
      ) : null}
    </div>
  );
}
