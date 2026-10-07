/**
 * Reservert figurfelt. Gemini Flash fyller inn bildet.
 * Ikke erstatt denne komponenten med SVG før prompten er kjørt.
 */
export function GeminiFigure({
  id,
  heading,
  caption,
  prompt,
  neutral = false,
}: {
  id: string;
  heading: string;
  caption: string;
  prompt: string;
  /** Geofag 1 viser en tom figurplass. Prompt og modellnavn blir liggende i koden. */
  neutral?: boolean;
}) {
  return (
    <figure
      data-gemini-id={id}
      {...(neutral
        ? {}
        : { "data-gemini-model": "gemini-flash", "data-gemini-prompt": prompt })}
      className="my-8 overflow-hidden rounded-xl border border-dashed border-border bg-card"
    >
      <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
        {heading}
      </p>
      <div className="flex min-h-56 flex-col justify-center gap-2 px-4 py-10 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {neutral ? "Figur" : "Figur · Gemini Flash"}
        </p>
        {neutral ? null : (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{prompt}</p>
        )}
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
