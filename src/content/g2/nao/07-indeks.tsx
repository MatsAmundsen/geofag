import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoIndexStationsDiagram,
  NaoTimeSeriesDiagram,
} from "@/components/diagrams";

export function Indeks() {
  return (
    <>
      <CollapsibleSection
        title="5. NAO-indeksen: Måling, stasjoner og koblingen til AO"
        subtitle="Stasjonsbasert trykkdifferanse (Reykjavík vs. Azorene/Lisboa) og Arctic Oscillation"
        badge="Måling & Indeks"
        badgeVariant="neutral"
      >
        <p>
          For å kvantifisere NAO-tilstanden og spore hvordan Atlanteren svinger over tiår, har
          meteorologer etablert standardiserte matematiske indekser. Det finnes to hovedmåter å
          beregne NAO-indeksen på:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              1. Den stasjonsbaserte NAO-indeksen
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Historisk beregnes indeksen som differansen i normalisert lufttrykk ved havnivå mellom
              en sørlig og en nordlig stasjon:
            </p>
            <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
              NAO-indeks = P_norm(Sør) − P_norm(Nord)
            </div>
            <p className="text-sm sm:text-base">
              Som nordlig stasjon brukes vanligvis <strong>Reykjavík</strong> eller Stykkishólmur på
              Island. Som sørlig stasjon brukes oftest <strong>Ponta Delgada</strong> på Azorene
              (for å fange det marine høytrykket) eller <strong>Lisboa</strong> i Portugal (fordi
              måleseriene der strekker seg helt tilbake til 1821).
            </p>
          </div>

          <NaoIndexStationsDiagram />

          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              2. PC-basert indeks (Empirical Orthogonal Function — EOF)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              I moderne klimaforskning bruker man ofte en <strong>PC-basert indeks</strong> (
              <em>Principal Component analysis</em>). I stedet for bare to stasjoner, analyserer man
              trykkfeltet over hele Nord-Atlanteren (20°–80°N, 90°V–40°Ø) ved hjelp av matematisk
              mønstergjenkjenning (EOF1). Denne metoden fanger opp at trykksentrene kan flytte litt på
              seg fra år til år.
            </p>
          </div>

          <NaoTimeSeriesDiagram />

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Koblingen til AO (Arctic Oscillation / Den arktiske oscillasjon)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Du vil ofte se at meteorologer snakker om <strong>AO</strong> i samme åndedrag som NAO.
              Hva er forskjellen?
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>AO (Den arktiske oscillasjon):</strong> Er en <em>halvkuledekkende</em>{" "}
                ringformet modus (<em>Annular Mode</em>) som måler trykkforskjellen mellom hele
                polkalotten over Arktis (ca. 70°–90°N) og midlere breddegrader (ca. 45°N) rundt hele
                den nordlige halvkule.
              </li>
              <li>
                <strong>NAO:</strong> Er det <em>atlantiske uttrykket</em> for den samme dynamikken.
                Fordi Atlanterhavet er den mest dynamiske delen av denne sirkulasjonen, har NAO og AO
                en korrelasjon på over <strong>0,9 om vinteren</strong>. Når AO er positiv, er nesten
                alltid NAO også positiv.
              </li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
