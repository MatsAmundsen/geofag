import { Search } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { lastSokIndeks } from "@/lib/sok/klient";
import { cn } from "@/lib/utils";

const lastDialog = () => import("./sok-dialog");
const SokDialog = lazy(lastDialog);

function erSkrivefelt(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
}

/** Henter dialogkoden og søkeindeksen på forhånd (pekeren eller fokus på knappen, / eller Ctrl+K). */
function forvarm() {
  void lastDialog().catch(() => {});
  void lastSokIndeks().catch(() => {});
}

/**
 * Søkeknapp i toppmenyen. Åpner søket som en dialog (også med / eller
 * Ctrl/⌘ + K). Dialogen lastes lat første gang den trengs.
 */
export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const knappRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const ctrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      const slash =
        e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey && !erSkrivefelt(e.target);
      if (ctrlK || slash) {
        e.preventDefault();
        forvarm();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        ref={knappRef}
        type="button"
        onPointerEnter={forvarm}
        onFocus={forvarm}
        onClick={() => {
          forvarm();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
          className,
        )}
        aria-label="Søk i Geofag 1 og Geofag 2"
        aria-keyshortcuts="/ Control+K Meta+K"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Søk</span>
      </button>
      {open ? (
        <Suspense fallback={null}>
          <SokDialog onClose={() => setOpen(false)} knappRef={knappRef} />
        </Suspense>
      ) : null}
    </>
  );
}
