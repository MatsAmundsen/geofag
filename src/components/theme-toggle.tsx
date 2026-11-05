import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const LAGRINGSNOKKEL = "geofag-tema";

function lesMork(): boolean {
  return document.documentElement.getAttribute("data-tema") === "mork";
}

/**
 * Bytter mellom lyst (standard) og mørkt tema på kapittelsidene.
 * Valget lagres i localStorage og settes på <html data-tema="mork"> av et script i <head> før første maling.
 * Synlig tekst, ikon og tilgjengelig navn følger data-tema i CSS (.tema-knapp), så de er riktige fra første maling uten hydreringsfeil.
 */
export function ThemeToggle() {
  useEffect(() => {
    const iSync = (e: StorageEvent) => {
      if (e.key !== LAGRINGSNOKKEL) return;
      if (e.newValue === "mork") document.documentElement.setAttribute("data-tema", "mork");
      else document.documentElement.removeAttribute("data-tema");
    };
    window.addEventListener("storage", iSync);
    return () => window.removeEventListener("storage", iSync);
  }, []);

  function bytt() {
    const neste = !lesMork();
    if (neste) document.documentElement.setAttribute("data-tema", "mork");
    else document.documentElement.removeAttribute("data-tema");
    try {
      localStorage.setItem(LAGRINGSNOKKEL, neste ? "mork" : "lys");
    } catch {
      /* lagring er ikke tilgjengelig (privat modus); valget gjelder til siden lastes på nytt */
    }
  }

  return (
    <button
      type="button"
      onClick={bytt}
      className="tema-knapp inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-border bg-background/90 px-4 text-sm font-medium text-foreground shadow-sm hover:bg-accent"
    >
      <span className="tema-til-mork inline-flex items-center gap-2">
        <Moon className="size-4 shrink-0" aria-hidden="true" />
        <span className="sr-only">Bytt til mørkt tema</span>
        <span aria-hidden="true">Mørkt tema</span>
      </span>
      <span className="tema-til-lys inline-flex items-center gap-2">
        <Sun className="size-4 shrink-0" aria-hidden="true" />
        <span className="sr-only">Bytt til lyst tema</span>
        <span aria-hidden="true">Lyst tema</span>
      </span>
    </button>
  );
}
