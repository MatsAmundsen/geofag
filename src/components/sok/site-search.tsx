import { Search, X } from "lucide-react";
import { lazy, Suspense, useEffect, useId, useRef, useState, type RefObject } from "react";
import { lastSokIndeks } from "@/lib/sok/klient";
import { cn } from "@/lib/utils";
import {
  SOK_FELT,
  SOK_IKON,
  SOK_INNHOLD,
  SOK_INTRO,
  SOK_LUKK,
  SOK_OVERLAY,
  SOK_PLASSHOLDER,
  SOK_RESULTATER,
  SOK_STATUS,
  SOK_TITTEL,
  SOK_TOPP,
  type SokUtkast,
} from "./sok-stil";

const lastDialog = () => import("./sok-dialog");
/** ms etter load-hendelsen før dialogkoden forhåndslastes (når nettleseren er ledig). */
const FORHANDSLAST_ETTER_MS = 2500;
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
  const inputId = useId();
  /** det som skrives i skallet mens dialogkoden lastes */
  const utkastRef = useRef<SokUtkast>({ verdi: "", start: null, slutt: null });

  // Hent dialogkoden når nettleseren er ledig en stund etter at siden er
  // lastet (etter at kapitteltekst og figurer er tegnet), så vinduet der
  // skallet trengs blir lite uten å konkurrere med første tegning.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id = 0;
    let t = 0;
    const hent = () => void lastDialog().catch(() => {});
    const planlegg = () => {
      t = window.setTimeout(() => {
        if (w.requestIdleCallback) id = w.requestIdleCallback(hent, { timeout: 5000 });
        else hent();
      }, FORHANDSLAST_ETTER_MS);
    };
    if (document.readyState === "complete") planlegg();
    else window.addEventListener("load", planlegg, { once: true });
    return () => {
      window.removeEventListener("load", planlegg);
      if (id) w.cancelIdleCallback?.(id);
      window.clearTimeout(t);
    };
  }, []);

  const aapne = () => {
    forvarm();
    utkastRef.current = { verdi: "", start: null, slutt: null };
    setOpen(true);
  };

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const ctrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      const slash =
        e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey && !erSkrivefelt(e.target);
      if (ctrlK || slash) {
        e.preventDefault();
        aapne();
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
        onClick={aapne}
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
        <Suspense
          fallback={
            <SokSkall
              inputId={inputId}
              utkastRef={utkastRef}
              onClose={() => setOpen(false)}
              knappRef={knappRef}
            />
          }
        >
          <SokDialog
            onClose={() => setOpen(false)}
            knappRef={knappRef}
            inputId={inputId}
            utkastRef={utkastRef}
          />
        </Suspense>
      ) : null}
    </>
  );
}

/**
 * Vises bare første gang, mens dialogkoden lastes. Ser ut som dialogen og har
 * et vanlig felt med fokus, så tastetrykk etter / eller Ctrl+K ikke går tapt.
 * Teksten og markøren tas med inn i dialogen når den er klar.
 */
function SokSkall({
  inputId,
  utkastRef,
  onClose,
  knappRef,
}: {
  inputId: string;
  utkastRef: RefObject<SokUtkast>;
  onClose: () => void;
  knappRef: RefObject<HTMLButtonElement | null>;
}) {
  const titelId = `${inputId}-skall-tittel`;
  const lagre = (el: HTMLInputElement) => {
    utkastRef.current = { verdi: el.value, start: el.selectionStart, slutt: el.selectionEnd };
  };
  const lukk = () => {
    onClose();
    knappRef.current?.focus();
  };
  return (
    <>
      <div className={SOK_OVERLAY} onClick={lukk} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titelId}
        aria-busy="true"
        className={SOK_INNHOLD}
        onKeyDown={(e) => {
          if (e.key === "Escape") lukk();
        }}
      >
        <div className={SOK_TOPP}>
          <div className="flex items-center justify-between gap-3">
            <h2 id={titelId} className={SOK_TITTEL}>
              Søk i Geofag 1 og 2
            </h2>
            <button type="button" className={SOK_LUKK} aria-label="Lukk søket" onClick={lukk}>
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="relative mt-2">
            <Search className={SOK_IKON} aria-hidden="true" />
            <label htmlFor={inputId} className="sr-only">
              Søkeord
            </label>
            <input
              id={inputId}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              defaultValue={utkastRef.current.verdi}
              onInput={(e) => lagre(e.currentTarget)}
              onSelect={(e) => lagre(e.currentTarget)}
              onKeyUp={(e) => lagre(e.currentTarget)}
              placeholder={SOK_PLASSHOLDER}
              className={SOK_FELT}
            />
          </div>
          <p className={SOK_STATUS} />
        </div>
        <div className={SOK_RESULTATER}>
          <p className="py-2 text-sm text-muted-foreground">{SOK_INTRO}</p>
        </div>
      </div>
    </>
  );
}
