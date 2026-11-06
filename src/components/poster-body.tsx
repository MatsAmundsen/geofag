import { lazy, Suspense } from "react";
import { lastMarkdownHeading, Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";
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
}: {
  children: string;
  className?: string;
  cleanChapter?: boolean;
  scrollTables?: boolean;
  wrapTables?: boolean;
}) {
  const content = cleanChapter ? stripChapterEditorNotice(children) : children;
  const parts = withoutDuplicateEarthFigure(parsePosterMarkdown(injectPosterWidgets(content)));
  let runningHeading = "";
  return (
    <div className={cn("space-y-4", className)}>
      {parts.map((part, index) => {
        if (part.type === "widget") {
          return (
            <div key={`w-${part.id}-${index}`} data-widget={part.id}>
              <Suspense
                fallback={
                  <div className="my-6 min-h-32 p-4 text-sm text-muted-foreground" aria-busy="true" role="status">
                    Laster figuren…
                  </div>
                }
              >
                <PosterWidget id={part.id} />
              </Suspense>
            </div>
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
          >
            {part.value}
          </Markdown>
        );
      })}
    </div>
  );
}
