/**
 * Aksentfarge per Geografi-kapittel, hentet fra fargene i kapittelbanneret.
 * `lys` er en mørk tone for lyst tema, `mork` en lys tone for mørkt tema.
 * Begge skal gi minst 4,5:1 mot bakgrunn og kort i sitt tema (se geografi-aksent.test.ts),
 * så de kan brukes på tekst. Fargen settes som CSS-variabler (--kap-lys / --kap-mork)
 * på .geo-aksent, og styles.css velger riktig tone som --kap-aksent.
 */
import type { CSSProperties } from "react";

export type GeografiAksent = {
  /** Kort navn på fargen, for kommentarer og tester. */
  readonly navn: string;
  readonly lys: string;
  readonly mork: string;
};

export const GEOGRAFI_AKSENT = {
  verktoy: { navn: "nattblå (byene langs Nilen om natten)", lys: "#2f4fb0", mork: "#9db4ff" },
  feltarbeid: { navn: "mosegrønn (bekk og lyng)", lys: "#4a6516", mork: "#b6d27a" },
  "indre-krefter": { navn: "lavarød (utbrudd)", lys: "#b3261e", mork: "#ff9a8b" },
  landskap: { navn: "fjordturkis (Lysefjorden)", lys: "#0b6b6b", mork: "#6fd6d0" },
  klima: { navn: "himmelblå (skyer fra bane)", lys: "#0a5f8a", mork: "#86ccf5" },
  naturfare: { navn: "stormoransje (orkan)", lys: "#9a4600", mork: "#ffb066" },
  ressurser: { navn: "kobberbrun (gruvelandskap)", lys: "#7c4a26", mork: "#e2ad85" },
  baerekraft: { navn: "skoggrønn (regnskog og hogst)", lys: "#2e6b1a", mork: "#94dc7e" },
  naering: { navn: "oker (tømmer og sagbruk)", lys: "#765600", mork: "#e5c35c" },
  befolkning: { navn: "plomme (bylys)", lys: "#8e2a72", mork: "#f0a3dc" },
  migrasjon: { navn: "fiolett (bro mellom land)", lys: "#6142a8", mork: "#c4b0ff" },
} as const satisfies Record<string, GeografiAksent>;

export function aksentFor(path: string): GeografiAksent {
  return (
    (GEOGRAFI_AKSENT as Record<string, GeografiAksent>)[path] ?? {
      navn: "primær",
      lys: "#17684a",
      mork: "#6fb3b8",
    }
  );
}

/** Inline-stil for et element med klassen `geo-aksent`. */
export function aksentStil(path: string): CSSProperties {
  const a = aksentFor(path);
  return { "--kap-lys": a.lys, "--kap-mork": a.mork } as CSSProperties;
}
