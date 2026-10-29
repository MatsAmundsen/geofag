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
  FigKoppenNorge: "Köppen-klimasoner i Norge, normalperioden 1991–2020 (MET sitt originalkart, CC BY 3.0, Svalbard ikke vist)",
  FigNedborTyper: "Tre typer nedbør: orografisk, konvektiv og frontal",
  FigNaturligTidsskalaer: "Naturlige klimapådriv på tidsskalaer fra 1 år til milliarder av år (logaritmisk akse)",
  FigSolflekker: "Skjematisk, idealisert solsyklus på ca. 11 år (8–14 år), uten ekte dataserie, med Maunder-minimum 1645–1715 markert",
  FigTektonikkKarbon: "Hypotesen om Himalaya, forvitring og CO₂ som kjede, med tilbakekoblinger",
  FigHavbunnenProfil: "Havbunnens landskap: sokkel, skråning, kontinentalfot, dyphavsslette, midthavsrygg og dyphavsgrav, med dyp",
  FigVannmasserAtlanterhavet: "Skjematisk dybdesnitt av vannmasser i Atlanterhavet (Talley, 2019)",
  FigSaffirSimpsonSkala: "Saffir–Simpson-skalaen: fem kategorier med middelvind i km/t og mph (NHC)",
  FigBlokkering: "Blokkerende høytrykk: omegablokkering og Rex-blokkering, skjematisk",
  FigEkstremerOppvarming: "IPCC SPM.6: hyppighet og intensitet av 10-årshendelser ved 1, 1,5, 2 og 4 °C oppvarming",
  FigNorgeFramskrivninger: "Klima i Norge 2025: observert og framskrevet endring i temperatur, nedbør, avrenning, fordampning og havnivå i Norge",
  FigTilpasningsgrenser: "IPCC AR6 WGII SPM C.3.4: harde og myke tilpasningsgrenser ved 1,5, 2 og 3 °C global oppvarming",
  FigNaturligVsMenneskelig: "IPCC AR6: bidrag til global overflatetemperatur 1850–1900 til 2010–2019, menneskeskapt mot naturlig",
};
