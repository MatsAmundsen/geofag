import { memo, useId, useRef, type KeyboardEvent } from "react";
import { COOL, ControlSlider, WARM } from "@/components/meteo/control-slider";
import { PATTERN_TEXT, PATTERNS, SLIDER_TEXT, type Pattern } from "@/lib/meteo/fagtekst";
import { DMI_MAX, DMI_MIN, DMI_THRESHOLD, ONI_MAX, ONI_MIN, ONI_THRESHOLD, isDjf } from "@/lib/meteo/physics";
import { useJetStore } from "@/lib/meteo/store";

const fmt = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(1).replace(".", ",")}`;

function ensoName(oni: number): string {
  if (oni >= ONI_THRESHOLD) return "El Niño";
  if (oni <= -ONI_THRESHOLD) return "La Niña";
  return "nøytral";
}
function iodName(dmi: number): string {
  if (dmi >= DMI_THRESHOLD) return "positiv IOD";
  if (dmi <= -DMI_THRESHOLD) return "negativ IOD";
  return "nøytral";
}

export function patternMatch(oni: number, dmi: number): Pattern | undefined {
  return PATTERNS.find((p) => Math.abs(p.oni - oni) < 0.05 && Math.abs(p.dmi - dmi) < 0.05);
}

const DOT: Record<Pattern["tone"], string> = { warm: WARM, cool: COOL, neutral: "var(--color-muted-foreground)" };

export const ClimateControls = memo(function ClimateControls() {
  const oni = useJetStore((s) => s.oni);
  const dmi = useJetStore((s) => s.dmi);
  const month = useJetStore((s) => s.month);
  const playing = useJetStore((s) => s.playing);
  const setOni = useJetStore((s) => s.setOni);
  const setDmi = useJetStore((s) => s.setDmi);
  const setClimate = useJetStore((s) => s.setClimate);
  const ensoId = useId();
  const iodId = useId();
  const textId = useId();
  const djf = isDjf(month);
  const active = patternMatch(oni, dmi);
  const text = PATTERN_TEXT[active ? active.id : "custom"];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + PATTERNS.length) % PATTERNS.length;
    const p = PATTERNS[next]!;
    setClimate(p.oni, p.dmi, p.month);
    refs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-4 border-b border-border px-4 py-4" aria-labelledby={`${ensoId}-h`}>
        <h2 id={`${ensoId}-h`} className="font-display text-xl text-foreground">
          ENSO og IOD
        </h2>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-4">
          <div className="flex flex-col gap-1" data-testid="enso-slider">
            <ControlSlider
              label={SLIDER_TEXT.ensoLabel}
              ariaLabel={SLIDER_TEXT.ensoAria}
              min={ONI_MIN}
              max={ONI_MAX}
              step={0.1}
              value={oni}
              display={`${ensoName(oni)} (${fmt(oni)})`}
              ticks={[...SLIDER_TEXT.ensoTicks]}
              diverging
              valueText={(v) => `${ensoName(v)}, ONI ${fmt(v)}`}
              describedBy={`${ensoId}-d`}
              onChange={setOni}
            />
            <p id={`${ensoId}-d`} className="text-xs text-pretty text-muted-foreground">
              {SLIDER_TEXT.ensoScale}
            </p>
          </div>
          <div className={djf ? "flex flex-col gap-1 opacity-60" : "flex flex-col gap-1"} data-testid="iod-slider">
            <ControlSlider
              label={SLIDER_TEXT.iodLabel}
              ariaLabel={SLIDER_TEXT.iodAria}
              min={DMI_MIN}
              max={DMI_MAX}
              step={0.1}
              value={dmi}
              display={`${iodName(dmi)} (${fmt(dmi)})`}
              ticks={[...SLIDER_TEXT.iodTicks]}
              diverging
              valueText={(v) => `${iodName(v)}, DMI ${fmt(v)}${djf ? ". Lite effekt i desember–februar" : ""}`}
              describedBy={`${iodId}-d`}
              onChange={setDmi}
            />
            <p id={`${iodId}-d`} className="text-xs text-pretty text-muted-foreground">
              {djf ? <strong className="font-medium text-foreground">{SLIDER_TEXT.iodDjfNote} </strong> : null}
              {SLIDER_TEXT.iodScale}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">Kjente mønstre</h2>
        <div role="radiogroup" aria-label="Kjente mønstre" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {PATTERNS.map((p, index) => {
            const on = active?.id === p.id;
            const focusable = active ? on : index === 0;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={focusable ? 0 : -1}
                data-pattern={p.id}
                className={
                  (on
                    ? "h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
                    : "h-11 rounded-full border border-border bg-card px-4 text-sm text-foreground") +
                  " inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" +
                  (p.id === "neutral" ? " col-span-2 sm:col-span-1" : "")
                }
                onClick={() => setClimate(p.oni, p.dmi, p.month)}
                onKeyDown={(e) => onKey(e, index)}
              >
                <span aria-hidden="true" className="inline-block size-2 rounded-full" style={{ background: DOT[p.tone] }} />
                {p.label}
              </button>
            );
          })}
        </div>
        <div
          id={textId}
          className="rounded-lg border border-border bg-card px-3 py-3 text-sm"
          aria-live={playing ? "off" : "polite"}
          data-testid="pattern-text"
        >
          <p className="font-medium text-foreground">{text.title}</p>
          <p className="mt-1 text-pretty text-foreground">{text.body}</p>
        </div>
      </section>
    </div>
  );
});
