import { useId } from "react";
import { SkjelvVerdenskart } from "./skjelv-verdenskart";
import vulk from "@/lib/geografi-vulkaner-2000-2025.json";

export function GeografiVarmeflekker() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 3.9 – Plategrenser og utvalgte varmeflekker
      </h3>
      <div className="overflow-x-auto">
        <img
          src="/images/geografi/usgs-varmeflekker-1996.png"
          width="692"
          height="259"
          loading="lazy"
          className="min-w-[640px] w-full bg-white"
          alt="Verdenskart fra USGS med plategrenser og oransje prikker for utvalgte varmeflekker. Hawaii, Yellowstone, Island, Azorene, Galápagos og Afar er navngitt. Flere prikker ligger midt på platene, mens Island, Azorene og Galápagos ligger ved eller nær spredningsrygger."
        />
      </div>
      <dl className="grid gap-1 text-sm sm:grid-cols-2">
        <div>
          <dt className="inline font-semibold">Tynn strek: </dt>
          <dd className="inline">spredningsgrense (divergent)</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Strek med trekanter: </dt>
          <dd className="inline">subduksjonsgrense (konvergent)</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Strek med prikker: </dt>
          <dd className="inline">transformgrense</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Rødskravert felt: </dt>
          <dd className="inline">brede soner der grensen er uklar</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Oransje prikk: </dt>
          <dd className="inline">utvalgt varmeflekk, ikke en fullstendig liste</dd>
        </div>
      </dl>
      <figcaption className="text-sm text-muted-foreground">
        Kart fra U.S. Geological Survey i Kious og Tilling (1996), This Dynamic Earth, nettutgave
        1.20. Offentlig verk (Public Domain). Gjengitt uendret med norsk lesenøkkel. Kartet er fra
        1996 og viser utvalgte varmeflekker med omtrentlig plassering. Forfatterne skriver selv at
        det siden har vært faglig debatt om hvor dype og hvor faste varmeflekkene er. Bruk kartet
        til å se mønsteret, ikke som en oppdatert liste eller nøyaktige posisjoner (Kious & Tilling,
        1996; USGS, u.å.-c).
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
