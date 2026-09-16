import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";

export function Indekser() {
  return (
    <>
      <CollapsibleSection
        title="5. ENSO-indekser: SOI og ONI"
        subtitle="SOI (atmosfæretrykk Tahiti vs. Darwin) og ONI (SST-anomali i Niño 3.4)"
        badge="Måling & Indekser"
        badgeVariant="neutral"
      >
        <p>
          For å kvantifisere ENSO-styrken og definere om vi er i en El Niño-
          eller La Niña-episode, bruker forskere standardiserte indekser:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              SOI — Southern Oscillation Index
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              <strong>SOI</strong> måler den normaliserte trykkforskjellen
              mellom Tahiti (øst i Stillehavet) og Darwin (vest i Australia).
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>
                <strong>Negativ SOI:</strong> lavt trykk over Tahiti, høyt over
                Darwin → El Niño (svake passater).
              </li>
              <li>
                <strong>Positiv SOI:</strong> høyt trykk over Tahiti, lavt over
                Darwin → La Niña (sterke passater).
              </li>
            </ul>
          </div>

          <PhotoFigure
            src="/images/fig-enso-soi-seesaw.jpg"
            alt="Infografikk som viser den atmosfæriske trykkvippen (SOI) mellom Darwin og Tahiti under El Niño og La Niña"
            heading="Figur 5. Den atmosfæriske SOI-vippen (Tahiti vs. Darwin)"
            caption="Southern Oscillation Index (SOI) fungerer som en barometrisk vippe over Stillehavet. Under El Niño er det unormalt lavt trykk over Tahiti og høyt trykk over Darwin (negativ SOI). Under La Niña er trykkgradienten bratt med høytrykk over Tahiti og lavtrykk over Darwin (positiv SOI)."
            fit="contain"
            points={[
              { n: "1", label: "El Niño (negativ SOI): Høytrykk over Darwin, lavtrykk over Tahiti. Svake passater." },
              { n: "2", label: "La Niña (positiv SOI): Lavtrykk over Darwin, høytrykk over Tahiti. Ekstremt sterke passater." },
              { n: "3", label: "Trykkvippen måler den atmosfæriske delen av ENSO-sirkulasjonen direkte." },
            ]}
          />

          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              ONI — Oceanic Niño Index
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              <strong>ONI</strong> er NOAAs offisielle operasjonelle definisjon.
              Den beregnes som det 3-månedlige glidende gjennomsnittet av
              havoverflatetemperaturavviket (SST-anomalien) i Niño 3.4-regionen
              (5°N–5°S, 120°–170°V).
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>
                <strong>ONI ≥ +0,5 °C</strong> i fem påfølgende 3-måneders
                perioder: El Niño.
              </li>
              <li>
                <strong>ONI ≤ −0,5 °C</strong> i fem påfølgende perioder: La
                Niña.
              </li>
            </ul>
          </div>

          <PhotoFigure
            src="/images/fig-enso-oni-tidsserie.jpg"
            alt="Graf som viser ONI-indeksen fra 1950 til i dag med El Niño-episoder i rødt og La Niña i blått"
            heading="Figur 6. ONI-tidsserie 1950 – i dag"
            caption="ONI-indeksen viser hvordan ENSO har svingt siden 1950. Kraftige El Niño-episoder inkluderer 1972/73, 1982/83, 1997/98, 2015/16 og 2023/24. Kraftige La Niña inkluderer 1973/74, 1988/89, 1999/2000 og 2010/11. Kilde: NOAA."
            fit="contain"
            points={[
              { n: "1", label: "Rekord-El Niño 1997/98: ONI nådde +2,3 °C. Global lufttemperaturrekord." },
              { n: "2", label: "El Niño 2015/16: blant de sterkeste målt. Bidro til rekordvarm 2016." },
              { n: "3", label: "La Niña 2010/11: sterk negativ fase etter El Niño 2009/10." },
            ]}
          />
        </div>
      </CollapsibleSection>
    </>
  );
}
