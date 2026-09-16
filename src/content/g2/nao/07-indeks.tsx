import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoTimeSeriesDiagram,
  NaoIndexStationsDiagram,
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
          For å kvantifisere NAO og spore tiårssvingninger brukes to hovedmåter å beregne indeksen på.
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">1. Den stasjonsbaserte NAO-indeksen</h4>
            <p className="mt-1 text-sm sm:text-base">
              Differansen i normalisert lufttrykk ved havnivå mellom en sørlig og en nordlig stasjon:
            </p>
            <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
              NAO-indeks = P_norm(Sør) − P_norm(Nord)
            </div>
            <p className="text-sm sm:text-base">
              Nord: <strong>Reykjavík</strong> eller Stykkishólmur. Sør: <strong>Ponta Delgada</strong> på Azorene, eller <strong>Lisboa</strong> (serie tilbake til 1821).
            </p>
          </div>
          <NaoIndexStationsDiagram />
          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">2. PC-basert indeks (EOF)</h4>
            <p className="mt-1 text-sm sm:text-base">
              Moderne forskning bruker <strong>hovedkomponentanalyse</strong> av trykkfeltet over hele Nord-Atlanteren (20°–80°N, 90°V–40°Ø). EOF1 fanger at trykksentrene kan flytte seg fra år til år.
            </p>
          </div>
          <NaoTimeSeriesDiagram />
          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Koblingen til AO (Arctic Oscillation)</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li><strong>AO:</strong> Halvkuledekkende annular modus. Trykkforskjell mellom polkalotten (~70–90°N) og midlere bredde (~45°N) rundt hele den nordlige halvkule.</li>
              <li><strong>NAO:</strong> Det atlantiske uttrykket for samme dynamikk. Korrelasjon med AO over <strong>0,9 om vinteren</strong>.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
