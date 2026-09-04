import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  ModelGridDiagram,
  ModelParametrizationDiagram,
  EnsembleRibbonDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/numeriske-modeller")!;

export const Route = createFileRoute("/tema/numeriske-modeller")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/numeriske-modeller",
    }),
  component: NumeriskeModellerPage,
});

function NumeriskeModellerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Modeller"
      title="Numeriske modeller"
      lead="En numerisk modell i geofag er ikke et værkart på en datamaskin. Den er fysikk regnet på et rutenett. Bevegelse, masse, energi og fuktighet løses i celler, steg for steg. Cellene har en størrelse. Prosessene inne i cellen må forenkles. Starttilstanden er aldri perfekt kjent. Likevel gir modellene nyttig informasjon — til ulike formål på ulike tidsskalaer."
      banner="/images/fig-klimasystem.jpg"
      bannerAlt="Jorda fra verdensrommet med tynn atmosfære, hav og is — det modellene beskriver"
      prev={{ to: "/tema/kryosfare", label: "Forrige: Kryosfæren" }}
      next={{ to: "/tema/paleoklima", label: "Neste: Paleoklima" }}
      kilder={KILDER.modeller}
    >
      <ModelGridDiagram />

      <h2 className="font-display text-2xl font-medium tracking-tight">Tre bruk</h2>
      <p>
        Værvarsling er et startverdiproblem. Tidsskalaen er timer til om lag to uker. Små feil i
        starttilstanden vokser raskt. Det kalles kaos (Lorenz, 1963). Derfor investerer
        varslingssentre mer i observasjoner og assimilering enn i å bare kjøre modellen lenger.
      </p>
      <OrdBoks
        ord="Kaos"
        barn="Små feil i starttilstanden vokser fort. Derfor kan du ikke varsle været 12. juni 2087, selv om fysikken er den samme."
      />
      <p>
        Havmodellering styres sterkt av randen fra atmosfæren, og av tetthet: temperatur og
        saltholdighet. Tidsskalaen er timer til uker, men også sesong og klima. Vann er tregere enn
        luft. Et feilaktig blandelag kan sitte i uker.
      </p>
      <p>
        Klimaforskning er et randverdiproblem. Tidsskalaen er tiår til århundrer. Pådriv styrer:
        drivhusgasser, aerosoler, sol, vulkaner. Prediksjonen er statistikken: middel, varians,
        ekstremfordelinger. Ikke været 12. juni 2087.
      </p>
      <OrdBoks
        ord="Startverdi og randverdi"
        barn="Værvarsel: starttilstanden avgjør de neste dagene. Klima: pådrivet og randen avgjør statistikken over tiår."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Grid og parametrisering</h2>
      <p>
        Atmosfæren og havet deles i et tredimensjonalt rutenett. Avstanden mellom punktene er
        oppløsningen. En prosess som er mindre enn et par gridceller, kan ikke løses eksplisitt. Den
        må parametriseres.
      </p>
      <ModelParametrizationDiagram />
      <OrdBoks ord="Grid" barn="Avstand mellom beregningspunktene. Finere gir mer detalj, koster mer regnekraft." />
      <OrdBoks
        ord="Parametrisering"
        barn="Forenklet beskrivelse av prosesser som er for små eller for komplekse til å løses eksplisitt."
      />
      <p>
        Operasjonell oppløsning: ECMWF globalt på rundt 9 km (ECMWF, u.å.). MEPS og AROME-Arctic 2,5
        km. Norkyst 800 m. En halvering av gridavstand gir omtrent åtte ganger mer regning i 3D,
        pluss kortere tidssteg.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Dataassimilering og ensemble</h2>
      <p>
        Observasjoner er ujevnt fordelt. Dataassimilering blander dem inn i modellen, vektet etter
        hvor mye vi stoler på hver av dem. Uten assimilering ville et værvarsel glemme virkeligheten
        i løpet av dager.
      </p>
      <OrdBoks ord="Dataassimilering" barn="Observasjoner blandes inn for en bedre starttilstand." />
      <p>
        Et ensemble er mange nesten like kjøringer. Spredningen kartlegger usikkerheten. «30 % sjanse
        for mer enn 20 mm» er andelen ensemblemedlemmer over en terskel.
      </p>
      <EnsembleRibbonDiagram />
      <OrdBoks ord="Ensemble" barn="Mange nesten like kjøringer som kartlegger usikkerhet." />
      <p>
        Den praktiske prediksjonsgrensen for synoptisk vær er typisk 7–10 døgn. Når yr hopper mellom
        sol og 20 mm på dag 8, er det ensemblets spredning du ser — ikke at klimaet endret seg over natten.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Norge</h2>
      <p>
        MEPS er den regionale modellen for Norden, 2,5 km, 30 medlemmer, ut til ca. 66 timer (MET,
        u.å.). AROME-Arctic er 2,5 km over Arktis. ECMWF er det globale systemet, ca. 9 km, ut til 15
        døgn. Norkyst er kysthavmodellen, 800 m.
      </p>
      <p>Tall og vurderinger bygger på IPCC AR6 (IPCC, 2021). Syvende hovedrapport er ikke publisert.</p>

      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for hvordan numeriske modeller i geofag bygges opp og videreutvikles, og
          beskrive hvordan modellene brukes innenfor værvarsling, havmodellering og klimaforskning.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Grid" def="Avstand mellom beregningspunktene. Finere gir mer detalj, koster mer regnekraft." />
        <Term name="Parametrisering" def="Forenklet beskrivelse av prosesser som er for små eller for komplekse til å løses eksplisitt." />
        <Term name="Dataassimilering" def="Observasjoner blandes inn for en bedre starttilstand." />
        <Term name="Ensemble" def="Mange nesten like kjøringer som kartlegger usikkerhet." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er forskjellen på et værvarsel og en klimafremskrivning?",
            options: [
              "Klima er bare vær om 100 år.",
              "Værvarsel er starttilstanden de neste dagene. Klima er statistikken over tiår, styrt av pådriv.",
              "Klimamodeller bruker ikke rutenett.",
              "Værvarsel kan ikke bruke observasjoner.",
            ],
            answer: 1,
            explain: "Derfor kan vi si noe om 2080-klima uten å varsle 3. mars 2080.",
          },
          {
            prompt: "Hvorfor parametriseres skyer i mange modeller?",
            options: [
              "Fordi skyer ikke påvirker stråling.",
              "Fordi de ofte er mindre enn et par gridceller og for komplekse til å løses eksplisitt.",
              "Fordi ECMWF forbyr skyer.",
              "Fordi skyer bare finnes over land.",
            ],
            answer: 1,
            explain: "Finere grid kan løse mer konveksjon eksplisitt, som i MEPS — da endres fysikken.",
          },
          {
            prompt: "Hva viser spredningen i et ensemble?",
            options: [
              "Hvor mange superdatamaskiner som kjører.",
              "Usikkerheten: tett = høy tillit, sprik = lav tillit.",
              "At modellen er ødelagt.",
              "Bare temperatur, aldri nedbør.",
            ],
            answer: 1,
            explain: "«30 % sjanse for mer enn 20 mm» er andelen medlemmer over en terskel.",
          },
          {
            prompt: "På yr ser du at varselet for dag 8 hopper mellom sol og 20 mm fra en dag til den neste. Hva leser du?",
            options: [
              "At MET har slått av modellen.",
              "At ensemblet spriker: lav tillit. Bruk sannsynlighet, ikke ett tall.",
              "At klimaet har endret seg over natten.",
              "At isobarene er slettet.",
            ],
            answer: 1,
            explain: "Det er prediksjonsgrensen du ser. Ensemblets spredning er varselet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
