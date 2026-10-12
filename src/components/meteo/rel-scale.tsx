import type { RelLevel } from "@/lib/meteo/fagtekst";

const TONES: Record<RelLevel["tone"], string> = {
  cold: "#4fa3d8",
  warm: "#e8823f",
  neutral: "#8b9aa6",
  wet: "#5fa8f0",
  dry: "#d0a76a",
  wind: "#7eb6cc",
};

/** Relativ skala: segmentstolpe + pil + tekst. Ingen tall. */
export function RelScale({ kind, level, compact = false }: { kind: string; level: RelLevel; compact?: boolean }) {
  const color = TONES[level.tone];
  const mid = (level.steps - 1) / 2;
  const arrow = level.tone === "wind" ? "" : level.step > mid ? "↑" : level.step < mid ? "↓" : "→";
  return (
    <span
      role="img"
      aria-label={`${kind}: ${level.label}`}
      className={compact ? "inline-flex items-center gap-1.5 text-xs text-foreground" : "inline-flex items-center gap-2 text-sm text-foreground"}
      data-rel={kind}
    >
      <span aria-hidden="true" className="inline-flex gap-0.5">
        {Array.from({ length: level.steps }, (_, i) => (
          <span
            key={i}
            className={compact ? "h-2 w-2.5 rounded-sm" : "h-2.5 w-3.5 rounded-sm"}
            style={{ background: i === level.step ? color : "var(--color-border)" }}
          />
        ))}
      </span>
      <span aria-hidden="true">
        {arrow ? <span style={{ color }}>{arrow} </span> : null}
        {level.label}
      </span>
    </span>
  );
}
