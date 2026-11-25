import { useId } from "react";
import { ScrollFrame } from "@/components/scroll-frame";
import { PlateKartForklaring, PlateKartSvg } from "./platekart";
import { SkjelvVerdenskart } from "./skjelv-verdenskart";
import vulk from "@/lib/geografi-vulkaner-2000-2025.json";

export function GeografiVarmeflekker() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border border-border bg-card p-4 text-card-foreground sm:p-5">
      <h3 id={id} className="text-xl font-semibold">
        Figur 3.9 – Plategrenser og utvalgte varmeflekker
      </h3>
      <ScrollFrame label="Figur 3.9 – Plategrenser og utvalgte varmeflekker" fade="var(--color-card)">
        <PlateKartSvg
          visVarmeflekker
          ariaLabel="Verdenskart sentrert på Stillehavet med plategrenser og oransje prikker for utvalgte varmeflekker. Hawaii, Yellowstone, Island, Azorene, Galápagos og Afar er navngitt. Flere prikker ligger midt på platene, mens Island, Azorene og Galápagos ligger ved eller nær spredningsrygger."
        />
      </ScrollFrame>
      <PlateKartForklaring visVarmeflekker />
      <figcaption className="text-sm text-muted-foreground">
        Egen tegning. Varmeflekkene er avlest fra kartet over utvalgte varmeflekker i Kious og
        Tilling (1996), This Dynamic Earth, nettutgave 1.20, fra U.S. Geological Survey (Public
        Domain), og har omtrentlig plassering. Plategrenser: USGS-karttjenesten Tectonic Plate
        Boundaries, bygd på Bird (2003). Land: Natural Earth 5.1.1. Alle er offentlige data
        (Public Domain). Originalkartet er fra 1996 og viser utvalgte varmeflekker. Forfatterne
        skriver selv at det siden har vært faglig debatt om hvor dype og hvor faste varmeflekkene
        er. Bruk kartet til å se mønsteret, ikke som en oppdatert liste eller nøyaktige posisjoner.
        Brede, uklare grensesoner, som originalen viser som skraverte felt, er ikke tegnet her
        (Kious & Tilling, 1996; USGS, u.å.-c, u.å.-k; Bird, 2003; Natural Earth, u.å.).
      </figcaption>
    </figure>
  );
}

export function GeografiSkjelvVulkan() {
  return (
    <SkjelvVerdenskart
      heading="Figur 3.0b – Jordskjelv og vulkanutbrudd langs plategrensene"
      ekstra={vulk.vulkaner.map((v) => (
        <path
          key={v.navn}
          d={`M${v.x} ${v.y - 6} L${v.x + 5.5} ${v.y + 4} L${v.x - 5.5} ${v.y + 4}Z`}
          fill="#dc2626"
          stroke="#fff"
          strokeWidth="0.8"
        >
          <title>{`${v.navn}: betydelig utbrudd ${v.ar.join(", ")}`}</title>
        </path>
      ))}
      ekstraForklaring={
        <li className="flex items-center gap-2">
          <svg width="14" height="14" aria-hidden="true">
            <path d="M7 1 L13 12 L1 12Z" fill="#dc2626" />
          </svg>
          Vulkan med minst ett betydelig utbrudd 2000–2025 ({vulk.vulkaner.length} vulkaner,{" "}
          {vulk.utbrudd} utbrudd)
        </li>
      }
      caption={`Jordskjelv: USGS ComCat, alle 147 med magnitude 6 eller mer i 2023. Vulkaner: NOAA NCEI Global Significant Volcanic Eruptions Database, ${vulk.utbrudd} utbrudd fra 2000 til 2025 ved ${vulk.vulkaner.length} vulkaner. Databasen tar bare med utbrudd som ga dødsfall eller skade, var svært store eller utløste tsunami eller større jordskjelv. Den viser ikke alle aktive vulkaner. Plategrenser: USGS etter Bird (2003). Land: Natural Earth 5.1.1. Alle er offentlige data (Public Domain eller CC0). Egen tegning (USGS, u.å.-j, u.å.-k; NCEI, u.å.; Bird, 2003).`}
    />
  );
}
