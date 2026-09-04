import { Play } from "lucide-react";

export interface VideoPlaceholderProps {
  topic: string;
  src?: string;
  title?: string;
  description?: string;
  poster?: string;
}

export function VideoPlaceholder({
  topic,
  src,
  title,
  description,
  poster,
}: VideoPlaceholderProps) {
  if (src) {
    return (
      <section
        aria-label={`Læringsvideo: ${title || topic}`}
        className="my-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="p-4 sm:p-6 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Play className="size-3.5 fill-current" />
            Læringsvideo
          </div>
          <h2 className="mt-1 font-display text-xl font-medium tracking-tight">
            {title || `Læringsvideo: ${topic}`}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="aspect-video w-full bg-black overflow-hidden">
          <video
            controls
            playsInline
            preload="metadata"
            poster={poster}
            className="h-full w-full object-contain"
          >
            <source src={src} type="video/mp4" />
            Nettleseren din støtter ikke videospilleren.
          </video>
        </div>
      </section>
    );
  }

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
