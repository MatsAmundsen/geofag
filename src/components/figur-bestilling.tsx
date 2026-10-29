import type { JSX } from "react";
import { isLocalDev } from "@/lib/editing";

/**
 * Plassholder for en figur som er bestilt, men ikke tegnet ennå (Pakke B).
 * Vises bare på lokal utviklingsserver. På geofag.com gir den ingenting, så elevene ser ikke noe tomt felt.
 * Bestillingene ligger i figurbestillinger-B.md. Bytt ut oppføringen i FIGUR_BESTILLINGER med den ferdige figuren.
 */
export function FigurBestilling({ id, title }: { id: string; title: string }): JSX.Element | null {
  if (!isLocalDev) return null;
  return (
    <aside className="my-6 rounded-xl border-2 border-dashed border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Figur bestilt: {id}</strong>
      <br />
      {title}
    </aside>
  );
}

/** id → tittel. Widgetene registreres i poster-body.tsx via POSTER_WIDGETS_B. */
export const FIGUR_BESTILLINGER: Record<string, string> = {
  FigSkyerNivaaer: "Skytyper i tre høydenivåer (WMO), med typiske høyder",
  FigKlimadiagramKystInnland: "Klimadiagram: Bergen–Florida mot Oslo–Blindern, normal 1991–2020",
  FigKoppenNorge: "Köppen-klimasoner i Norge, normalperiodene 1961–90 og 1991–2020",
  FigNedborTyper: "Tre typer nedbør: orografisk, konvektiv og frontal",
};
