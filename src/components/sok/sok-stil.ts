/**
 * Klassene til søkedialogen, delt mellom den ekte dialogen (sok-dialog.tsx,
 * lastes lat) og skallet som vises mens den lastes (site-search.tsx). Da ser
 * skallet helt likt ut, og feltet flytter seg ikke når dialogen tar over.
 */
export const SOK_OVERLAY = "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm";
export const SOK_INNHOLD =
  "fixed inset-x-0 top-0 z-50 flex h-dvh flex-col overflow-y-auto overscroll-contain border-border bg-card text-card-foreground shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-[8vh] sm:h-auto sm:max-h-[84vh] sm:w-[min(42rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:rounded-xl sm:border";
export const SOK_TOPP =
  "border-b border-border px-4 pb-3 pt-4 sm:px-5 [@media(max-height:34rem)]:pb-2 [@media(max-height:34rem)]:pt-2";
export const SOK_TITTEL = "font-display text-lg font-medium tracking-tight";
export const SOK_LUKK =
  "inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground";
export const SOK_IKON =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
export const SOK_FELT =
  "flex h-12 w-full rounded-md border border-border bg-background pl-9 pr-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
export const SOK_PLASSHOLDER = "Skriv et ord, for eksempel isbre";
export const SOK_STATUS = "mt-2 min-h-5 text-sm text-muted-foreground";
export const SOK_RESULTATER =
  "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-5 [@media(max-height:34rem)]:flex-none [@media(max-height:34rem)]:overflow-visible";
export const SOK_INTRO = "Søket går gjennom teksten i alle kapitlene i Geofag 1 og Geofag 2.";

/** Det som er skrevet i skallet før dialogen var klar. */
export type SokUtkast = { verdi: string; start: number | null; slutt: number | null };
