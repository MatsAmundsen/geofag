import { lazy, Suspense, type ReactNode } from "react";
import { lastMarkdownHeading, Markdown } from "@/components/markdown";
import { TsunamiPlass } from "@/components/tsunami-plass";
import { cn } from "@/lib/utils";
import { posterHeadingAnchorIds } from "@/lib/chapter-scan";
import type { HeadingIdCursor } from "@/lib/poster-heading";
import { GEO_MARIA_CHANNEL, GEO_MARIA_VIDEOS } from "@/lib/youtube-geo-maria";
import {
  EARTH_LAYERS_PHOTO_SRC,
  injectPosterWidgets,
  parsePosterMarkdown,
  stripChapterEditorNotice,
  type PosterPart,
} from "@/lib/poster-markdown";

// Text and the chapter fetch must not depend on the entire curriculum's widgets.
// A boundary per figure keeps every prose section visible while figures load.
const PosterWidget = lazy(() =>
  import("@/components/poster-widget-renderer").then((module) => ({
    default: module.PosterWidget,
  })),
);

/** The earth-layer photo and the EarthLayers widget render the same figure. Keep the photo. */
function withoutDuplicateEarthFigure(parts: PosterPart[]): PosterPart[] {
  const hasPhoto = parts.some(
    (part) => part.type === "markdown" && part.value.includes(EARTH_LAYERS_PHOTO_SRC),
  );
  if (!hasPhoto) return parts;
  return parts.filter((part) => !(part.type === "widget" && part.id === "EarthLayers"));
}

function tsunamiModell(id: string): string | null {
  const match = /^TsunamiM([1-7])$/.exec(id);
  return match ? `m${match[1]}` : null;
}

const CALLOUT_WIDGETS = new Set(["HyposenterForklaring", "IntraplateForklaring"]);
const DIAGRAM_WIDGETS = new Set([
  "ElasticRebound",
  "BoundaryQuakes",
  "Partikkelbolger",
  "Bolgegenerering",
  "Seismogram",
  "JordasBolger",
  "NorwayEarthquakes",
]);

function WidgetFallback({ id }: { id: string }) {
  const modell = tsunamiModell(id);
  if (modell) return <TsunamiPlass modell={modell} />;
  if (id.startsWith("YtMaria")) {
    const video = GEO_MARIA_VIDEOS.find((item) => item.widgetId === id);
    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-card" aria-busy="true">
        <figcaption className="border-b border-border px-4 py-3 sm:px-5">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Video · {GEO_MARIA_CHANNEL}
          </p>
          <p className="mt-1 font-display text-lg font-medium tracking-tight">{video?.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <span>{video?.duration}</span>
            <span aria-hidden="true"> · </span>
            Åpne på YouTube
          </p>
        </figcaption>
        <div className="aspect-video w-full bg-black" />
        <p className="sr-only">Laster figuren…</p>
      </figure>
    );
  }
  if (id.startsWith("SjekkTsunami") || id === "QuizTsunami") {
    return (
      <div className="quiz-plass my-10 w-full rounded-xl border border-border bg-card" data-quiz={id} aria-busy="true">
        <p className="sr-only">Laster figuren…</p>
      </div>
    );
  }
  if (id.startsWith("Sjekk") || id.startsWith("Quiz")) {
    return (
      <div
        className="kapittel-plass my-10 w-full rounded-xl border border-border bg-card"
        data-widget={id}
        aria-busy="true"
      >
        <p className="sr-only">Laster figuren…</p>
      </div>
    );
  }
  if (CALLOUT_WIDGETS.has(id)) {
    return (
      <aside className="kapittel-plass my-6 rounded-xl border border-border bg-muted" data-widget={id} aria-busy="true">
        <p className="sr-only">Laster figuren…</p>
      </aside>
    );
  }
  if (DIAGRAM_WIDGETS.has(id)) {
    return (
      <figure
        className="kapittel-plass my-8 max-w-full overflow-hidden rounded-xl border border-border bg-card"
        data-widget={id}
        aria-busy="true"
      >
        <p className="sr-only">Laster figuren…</p>
      </figure>
    );
  }
  return (
    <div className="my-6 min-h-32 rounded-xl bg-muted/30 p-4" aria-busy="true">
      <p className="text-sm text-muted-foreground" role="status">
        Laster figuren…
      </p>
    </div>
  );
}

/** Geografi kap. 1–2: figurene har målte høyder i styles.css (`.geo-plass`). */
const GEO_PLASS = /^Geo(?:Verktoy|Felt)/;

/**
 * Rammen står både mens registeret og figurmodulen lastes og etter at figuren er
 * på plass, så min-høyden holder teksten under i ro (CLS). Andre widgeter får
 * ingen ekstra omslutning.
 */
function ReservertRamme({ id, children }: { id: string; children: ReactNode }) {
  if (!GEO_PLASS.test(id)) return <>{children}</>;
  return (
    <div className="geo-plass" data-widget={id}>
      {children}
    </div>
  );
}

/**
 * Published post + editor preview. Diagrams, quizzes, map and the plate model
 * are injected from chapter headings when the stored markdown has none.
 */
export function PosterBody({
  children,
  className,
  cleanChapter,
  scrollTables = false,
  wrapTables = false,
  headingAnchors = false,
}: {
  children: string;
  className?: string;
  cleanChapter?: boolean;
  scrollTables?: boolean;
  wrapTables?: boolean;
  /** Stabile overskrifts-id-er, samme slug som scan-modus. Av som standard. */
  headingAnchors?: boolean;
}) {
  const content = cleanChapter ? stripChapterEditorNotice(children) : children;
  const prepared = injectPosterWidgets(content);
  const headingIds: HeadingIdCursor | undefined = headingAnchors
    ? { ids: posterHeadingAnchorIds(prepared), index: 0 }
    : undefined;
  const parts = withoutDuplicateEarthFigure(parsePosterMarkdown(prepared));
  let runningHeading = "";
  return (
    <div className={cn("space-y-4", className)}>
      {parts.map((part, index) => {
        if (part.type === "widget") {
          return (
            <ReservertRamme key={`w-${part.id}-${index}`} id={part.id}>
              <Suspense fallback={<WidgetFallback id={part.id} />}>
                <PosterWidget id={part.id} />
              </Suspense>
            </ReservertRamme>
          );
        }
        const captionFallback = runningHeading;
        const heading = lastMarkdownHeading(part.value);
        if (heading) runningHeading = heading;
        return (
          <Markdown
            key={`m-${index}`}
            scrollTables={scrollTables}
            wrapTables={wrapTables}
            captionFallback={captionFallback}
            searchable
            headingIds={headingIds}
          >
            {part.value}
          </Markdown>
        );
      })}
    </div>
  );
}
