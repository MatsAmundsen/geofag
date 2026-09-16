import { DataAssimilationCycleDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function DataassimileringAForankreModellen() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Dataassimilering: Å forankre modellen i observasjoner
      </h2>
      <p>
        Selv den mest perfekte superdatamaskin med feilfrie ligninger vil feile dersom starttilstanden
        er gal. Men hvordan skaffer vi starttilstanden?
      </p>
      <p>
        Virkeligheten er kaotisk: Værobservasjoner er ujevnt fordelt over kloden. Vi har titusenvis av
        målinger fra tett befolkede områder i Europa og USA, men nesten ingen målinger i det sørlige
        Stillehavet, over Arktis eller i Sahara. Dessuten har alle måleinstrumenter unøyaktigheter og
        støy.
      </p>
      <p>
        Hvorfor kan vi ikke bare overskrive rutenettpunktene direkte med de ferske målingene der vi har
        dem? Fordi atmosfæren er i en finstemt hydrostatisk og geostrofisk balanse. Hvis du brått dytter
        inn en måling på 1008 hPa i et punkt omgitt av modellpunkter på 1015 hPa, skaper du en enorm,
        kunstig trykkgradient over null avstand. Modellen reagerer med å sende ut voldsomme, kunstige
        sjokkbølger (akustiske gravitasjonsbølger) som «blåser opp» hele prognosen.
      </p>
      <p>
        Løsningen kalles <strong>dataassimilering</strong> (spesifikt <em>4D-Var</em> –
        firedimensjonal variasjonell assimilering):
      </p>

      <DataAssimilationCycleDiagram />

      <p>Analysesyklusen foregår i en kontinuerlig seks-timers sløyfe døgnet rundt:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Bakgrunnstilstanden («First Guess»):</strong> Modellen har en forrige sekstimers
          prognose (x_b) som allerede er i fullstendig fysisk balanse i alle celler.
        </li>
        <li>
          <strong>Observasjonsflommen:</strong> Hvert sjette time strømmer millioner av ferske målinger
          inn til superdatamaskinen: Over 90 % kommer fra værsatellitter (infrarød og
          mikrobølgestråling som gir temperatur- og fuktprofiler), radiosonder fra værballonger,
          sivile rutefly (AMDAR), bakkestasjoner, havbøyer og værradarer.
        </li>
        <li>
          <strong>Optimal vekting (Kostnadsfunksjon):</strong> Datamaskinen veier modellens bakgrunnsgjetning
          opp mot observasjonene ved hjelp av avansert feilkovarians-matriseregning (B- og
          R-matriser). Målinger med lav usikkerhet gis stor vekt; støy filtreres bort.
        </li>
        <li>
          <strong>Analysen (Starttilstanden):</strong> Resultatet er en ny, fullstendig og fysisk
          konsistent starttilstand (x_a). Fra denne analysen starter et nytt 66-timers MEPS-varsel og
          et 15-dagers globalt ECMWF-ensemble. Uten denne kontinuerlige justeringen ville modellen
          drevet ut i sin egen fantasiverden på bare 3–4 døgn.
        </li>
      </ol>

      <OrdBoks
        ord="Dataassimilering (4D-Var)"
        barn="En avansert statistisk-matematisk metode som kombinerer nye observasjoner fra satellitter og bakkestasjoner med modellens forrige prognose for å skape en optimal, fysisk balansert starttilstand."
      />
    </>
  );
}
