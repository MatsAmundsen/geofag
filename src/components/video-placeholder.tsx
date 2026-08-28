import { Play } from "lucide-react";

export function VideoPlaceholder({ topic }: { topic: string }) {
  return (
    <section
      aria-label={`Læringsvideo for ${topic} — kommer`}
      className="my-10 overflow-hidden rounded-xl border border-dashed border-border bg-card"
    >
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
        <span className="grid size-14 place-items-center rounded-full border border-border bg-muted text-primary">
          <Play className="size-6 translate-x-0.5" fill="currentColor" />
        </span>
        <h2 className="font-display text-xl font-medium tracking-tight">Læringsvideo</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Her setter vi senere inn en visuell forklaring av {topic}. Plassen er
          reservert — innholdet på siden kan leses uten filmen.
        </p>
      </div>
    </section>
  );
}
