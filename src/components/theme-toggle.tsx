import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const LAGRINGSNOKKEL = "geofag-tema";

function lesMork(): boolean {
  return document.documentElement.getAttribute("data-tema") === "mork";
}

/**
 * Bytter mellom lyst (standard) og mørkt tema på kapittelsidene.
 * Valget lagres i localStorage og settes på <html data-tema="mork"> av et script i <head> før første maling.
 * Ikon og tekst følger data-tema i CSS (.tema-knapp), så de er riktige selv før hydrering.
 */
export function ThemeToggle() {
  const [mork, setMork] = useState(false);

  useEffect(() => {
    setMork(lesMork());
    const iSync = (e: StorageEvent) => {
      if (e.key !== LAGRINGSNOKKEL) return;
      if (e.newValue === "mork") document.documentElement.setAttribute("data-tema", "mork");
      else document.documentElement.removeAttribute("data-tema");
      setMork(lesMork());
    };
    window.addEventListener("storage", iSync);
    return () => window.removeEventListener("storage", iSync);
  }, []);

  function bytt() {
    const neste = !lesMork();
    if (neste) document.documentElement.setAttribute("data-tema", "mork");
    else document.documentElement.removeAttribute("data-tema");
    setMork(neste);
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
      aria-label={mork ? "Bytt til lyst tema" : "Bytt til mørkt tema"}
      className="tema-knapp inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-border bg-background/90 px-4 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="tema-til-mork inline-flex items-center gap-2" aria-hidden="true">
        <Moon className="size-4" />
        Mørkt tema
      </span>
      <span className="tema-til-lys inline-flex items-center gap-2" aria-hidden="true">
        <Sun className="size-4" />
        Lyst tema
      </span>
    </button>
  );
}
