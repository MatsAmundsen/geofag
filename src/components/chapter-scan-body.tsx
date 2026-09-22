import { useEffect, useMemo, useState } from "react";
import { PosterBody } from "@/components/poster-body";
import { Button } from "@/components/ui/button";
import { prepareChapterScan, type ChapterScanSection } from "@/lib/chapter-scan";
import { cn } from "@/lib/utils";

function closedMap(sections: ChapterScanSection[]): Record<string, boolean> {
  return Object.fromEntries(sections.map((section) => [section.id, false]));
}

function SectionText({ section }: { section: ChapterScanSection }) {
  return (
    <article
      id={section.id}
      role="region"
      aria-labelledby={`kapittel-knapp-${section.id}`}
      className="scroll-mt-44 space-y-4 rounded-xl border border-primary/30 bg-card/60 px-5 py-6 sm:px-7"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{section.label}</p>
        <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-foreground">
          {section.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{section.subtitle}</p>
      </div>
      {section.markdown.trim() ? <PosterBody>{section.markdown}</PosterBody> : null}
    </article>
  );
}

export function ChapterScanBody({ markdown }: { markdown: string }) {
  const doc = useMemo(() => prepareChapterScan(markdown), [markdown]);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => closedMap(doc.sections));
  const [focusId, setFocusId] = useState<string | null>(null);

  useEffect(() => {
    setOpenMap((prev) => {
      const next = { ...prev };
      for (const section of doc.sections) {
        if (next[section.id] === undefined) next[section.id] = false;
      }
      return next;
    });
  }, [doc.sections]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !doc.sections.some((section) => section.id === hash)) return;
    setOpenMap((prev) => ({ ...prev, [hash]: true }));
    setFocusId(hash);
  }, [doc.sections]);

  useEffect(() => {
    if (!focusId || !openMap[focusId]) return;
    const timer = window.setTimeout(() => {
      document.getElementById(focusId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [focusId, openMap]);

  const openSections = doc.sections.filter((section) => openMap[section.id]);

  function setAll(open: boolean) {
    setOpenMap(Object.fromEntries(doc.sections.map((section) => [section.id, open])));
    if (!open) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.setTimeout(() => {
        document
          .querySelector("[data-chapter-scan-toc]")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 30);
    }
  }

  function toggleSection(id: string) {
    const willOpen = !openMap[id];
    setOpenMap((prev) => ({ ...prev, [id]: willOpen }));
    if (willOpen) {
      setFocusId(id);
      window.history.replaceState(null, "", `#${id}`);
      return;
    }
    setFocusId(null);
    if (window.location.hash.slice(1) === id) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <div className="space-y-5">
      {doc.preamble ? <PosterBody>{doc.preamble}</PosterBody> : null}

      {doc.sections.length > 0 ? (
        <div className="space-y-4">
          <nav
            data-chapter-scan-toc
            aria-label="Kapittelinnhold"
            className="sticky top-16 z-30 -mx-4 border-y border-border/80 bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Innhold i kapittelet
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Trykk på en knapp for å vise teksten. Trykk en gang til for å skjule den.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={() => setAll(true)}>
                  Utvid alle
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setAll(false)}
                  disabled={openSections.length === 0}
                >
                  Skjul alle
                </Button>
              </div>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {doc.sections.map((section) => {
                const isOpen = Boolean(openMap[section.id]);
                return (
                  <button
                    key={section.id}
                    id={`kapittel-knapp-${section.id}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      isOpen
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {openSections.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
              Ingen del er åpen. Trykk på en av knappene over for å lese fagteksten.
            </p>
          ) : (
            openSections.map((section) => <SectionText key={section.id} section={section} />)
          )}
        </div>
      ) : null}
    </div>
  );
}
