import { useEffect, useMemo, useState } from "react";
import { PosterBody } from "@/components/poster-body";
import { CollapsibleSection } from "@/components/collapsible-section";
import { Button } from "@/components/ui/button";
import { prepareChapterScan, type ChapterScanSection } from "@/lib/chapter-scan";
import { cn } from "@/lib/utils";

function initialOpenMap(sections: ChapterScanSection[], hash: string): Record<string, boolean> {
  const first = sections[0]?.id;
  const fromHash = sections.some((section) => section.id === hash) ? hash : "";
  const openId = fromHash || first;
  return Object.fromEntries(sections.map((section) => [section.id, section.id === openId]));
}

export function ChapterScanBody({ markdown }: { markdown: string }) {
  const doc = useMemo(() => prepareChapterScan(markdown), [markdown]);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    initialOpenMap(doc.sections, typeof window === "undefined" ? "" : window.location.hash.slice(1)),
  );

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
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [doc.sections]);

  const allOpen = doc.sections.length > 0 && doc.sections.every((section) => openMap[section.id]);

  function setAll(open: boolean) {
    setOpenMap(Object.fromEntries(doc.sections.map((section) => [section.id, open])));
    if (!open) {
      window.setTimeout(() => {
        document.getElementById("innhold")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 30);
    }
  }

  function openAndScroll(id: string) {
    setOpenMap((prev) => ({ ...prev, [id]: true }));
    window.history.replaceState(null, "", `#${id}`);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="space-y-5">
      {doc.preamble ? <PosterBody>{doc.preamble}</PosterBody> : null}

      {doc.sections.length > 0 ? (
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
                All fagtekst er her. Åpne én del om gangen, eller utvid alle.
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
                disabled={!doc.sections.some((section) => openMap[section.id])}
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
                  type="button"
                  onClick={() => openAndScroll(section.id)}
                  aria-current={isOpen && !allOpen ? "true" : undefined}
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
      ) : null}

      {doc.sections.map((section) => (
        <CollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          badge={section.label}
          badgeVariant={openMap[section.id] ? "primary" : "default"}
          open={Boolean(openMap[section.id])}
          onOpenChange={(open) =>
            setOpenMap((prev) => ({
              ...prev,
              [section.id]: open,
            }))
          }
        >
          {section.subsections.length > 0 ? (
            <div className="space-y-4">
              {section.lead.trim() ? <PosterBody>{section.lead}</PosterBody> : null}
              {section.subsections.map((sub, index) => (
                <CollapsibleSection
                  key={sub.id}
                  id={sub.id}
                  title={sub.title}
                  defaultOpen={index === 0}
                  className="my-0"
                >
                  {sub.markdown.trim() ? <PosterBody>{sub.markdown}</PosterBody> : null}
                </CollapsibleSection>
              ))}
            </div>
          ) : section.markdown.trim() ? (
            <PosterBody>{section.markdown}</PosterBody>
          ) : null}
        </CollapsibleSection>
      ))}
    </div>
  );
}
