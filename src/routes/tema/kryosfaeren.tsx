import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  GlacierMassBalanceDiagram,
  PermafrostDiagram,
  SeaIceAlbedoFeedbackDiagram,
  SlabAvalancheDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/kryosfaeren")!;

export const Route = createFileRoute("/tema/kryosfaeren")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/kryosfaeren",
    }),
  component: KryosfaerenPage,
});

function KryosfaerenPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Kryosfæren"
      title="Kryosfæren"
      lead="Is og snø er ikke bare istid. Kryosfæren er breer, permafrost, havis og snødekke — nå. Hvordan vi leser de lange syklusene, ligger i paleoklima. Hvorfor istidene kommer, ligger i istider. Denne siden er isen som jobber i år."
      banner="/images/tema-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/klima", label: "Forrige: Klima" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KILDER_G2.kryosfare}
    >
      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for vekselvirkninger mellom jordsystemene og hvordan de kan påvirke havet,
          atmosfæren og kryosfæren. Vurdere risiko ved naturfarer som følge av fenomener i
          kryosfæren (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Hva kryosfæren er</h2>
      <p>
        Kryosfæren er alt frosset vann på jordoverflaten: innlandsis, dalbreer, havis, snødekke,
        permafrost og sesongfrost. Den er den mest reflekterende av sfærene. Et hvitt lokk kaster
        sol tilbake. Åpent hav og bar jord tar den opp.
      </p>
      <p>
        Det er derfor <em>areal</em> slår <em>tykkelse</em> når du skal forklare stråling. En tynn
        havishinne over millioner av kvadratkilometer betyr mer for jordas energibudsjett enn noen
        ekstra meter is på en dalbre. Tykkelsen styrer hvor fort isen kan smelte vekk. Arealet
        styrer hvor mye sol som kommer inn.
      </p>
      <p>
        Istidene — hvorfor de kommer, og hvilke spor de la i Norge — eier{" "}
        <Link to="/tema/paleoklima" className="text-primary underline-offset-2 hover:underline">
          paleoklima
        </Link>{" "}
        og{" "}
        <Link to="/tema/milankovitch" className="text-primary underline-offset-2 hover:underline">
          istider
        </Link>
        . Her holder vi oss til isen som måles i år, ikke i årtusener.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Massebalanse og likevektslinjen
      </h2>
      <p>
        Inn: snø som overlever sommeren (akkumulasjon). Ut: smelting, sublimasjon og kalving
        (ablasjon). Differansen over et hydrologisk år er massebalansen. Likevektslinjen, ELA, er
        høyden der inn og ut går i null. Flytter ELA oppover, krymper akkumulasjonsområdet. Da går
        fortegnet mot minus (NVE, u.å.-a).
      </p>
      <p>
        NVE følger referansebreer i Norge. Etter 2000 har de fleste måleårene vært negative. Det
        betyr ikke at «alle breer dør i år». Det betyr at likevektslinjen har ligget for høyt, for
        ofte. En kald, snørik vinter kan gi pluss ett år. Trenden sitter i rekken av år, ikke i ett
        år.
      </p>
      <GlacierMassBalanceDiagram />
      <OrdBoks
        ord="Massebalanse"
        barn="Akkumulasjon minus ablasjon over et hydrologisk år. Fortegnet over mange år avgjør om breen vokser eller trekker seg tilbake."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Permafrost og det aktive laget
      </h2>
      <p>
        Permafrost er grunn som holder under 0 °C i minst to år på rad. Det er definisjonen, ikke
        «det er is i bakken». Over permafrosten ligger det aktive laget: det tiner om sommeren og
        fryser om vinteren. Det er her røtter, rør, vei og fundament jobber.
      </p>
      <p>
        På fastlandet i Norge sitter permafrosten i høyfjellet. På Svalbard er den utbredt i
        lavlandet også. Når det aktive laget blir dypere, mister bakken bæreevne. Hus, flyplass og
        rørledninger som var dimensjonert for frossen grunn, møter teleskader og setning. I bratt
        terreng kan tiningen også løsne løsmasse — en kryosfære-fare som ligner G1-skred, men
        driveren er temperatur i bakken, ikke bare vanninnhold (Store norske leksikon, u.å.).
      </p>
      <PermafrostDiagram />
      <OrdBoks
        ord="Aktivt lag"
        barn="Det øverste bakkelaget over permafrost. Tiner om sommeren, fryser om vinteren. Tykkelsen styrer hva som tåler å stå der."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Havis: speil, ikke vekt
      </h2>
      <p>
        Havis dekker store flater med høy albedo. Åpent polarhav er mørkt og tar opp sol. Mindre
        sommeris gir mer absorbert energi, varmere overflate og enda mindre is neste september —
        en positiv tilbakekobling (NSIDC, u.å.; IPCC, 2021).
      </p>
      <p>
        Tykkelsen betyr noe for hvor sårbar isen er, og for skip. Strålingsargumentet er likevel
        arealet. «Havisen veier mer enn Grønland» er derfor et dårlig svar. Grønlandsisen er
        kilometer-tykk innlandsis på land. Havisen er et tynt lokk på havet. De gjør ulike jobber i
        klimasystemet.
      </p>
      <SeaIceAlbedoFeedbackDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Snøskred: flak, svakt lag, Varsom
      </h2>
      <p>
        Steinskred, fjellskred og kvikkleire eier Geofag 1. Snøskred hører her. De fleste alvorlige
        ulykkene i norsk fjell er flakskred: et sammenhengende flak glir på et svakt lag. Utløseren
        kan være nysnø, sol, føn — eller en skiløper.
      </p>
      <p>
        Varsom graderer faren fra 1 til 5. Grad 5 er sjelden og holder folk unna. Grad 3 tar flest
        liv fordi fjellet fortsatt brukes: hytta er åpen, løypen er fristende, og skredene er store
        nok (NVE, u.å.-b). Risiko er fare ganger eksponering, ikke bare «hvor høyt varslet står».
      </p>
      <SlabAvalancheDiagram />
      <p>
        Felt i snø er G2-felt, men bare der skolen har avtale og HMS. Faregrad 3 og opp er ikke
        skolefelt uten profesjonell skredkompetanse. Avlys er en del av kompetansen. Opplegget
        ligger i{" "}
        <Link to="/tema/felt-hav-luft-is" className="text-primary underline-offset-2 hover:underline">
          feltarbeid i hav, luft og is
        </Link>
        .
      </p>
      <OrdBoks
        ord="Faregrad"
        barn="Varsom 1–5. Hvor lett og hvor stort et skred kan bli. Grad 3 tar flest folk fordi fjellet fortsatt brukes."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Vekselvirkning: is, hav og luft
      </h2>
      <p>
        Kryosfæren er ikke et rom ved siden av de andre sfærene. Smeltevann fra Grønland og mer
        ferskvann ut i de nordiske hav gjør overflaten lettere. Lettere vann synker dårligere. Det
        er én av mekanismene som kan svekke{" "}
        <Link to="/tema/klima/amoc" className="text-primary underline-offset-2 hover:underline">
          AMOC
        </Link>
        . Fysikken i synkingen eier{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          havstrømmer
        </Link>
        . Her er poenget bare koblingen: isen endrer tettheten i havet, og havet endrer varmen som
        når kysten.
      </p>
      <p>
        Den andre veien: et varmere Atlanterhav og mer fuktig luft gir mer vinternedbør i Norge —
        men også høyere ELA om somrene blir varme. Samme klimaendring kan altså gi mer snø i
        høyfjellet ett år og likevel minus på breen når året summeres.
      </p>

      <Callout title="Vanlige misforståelser">
        <p>Havis er viktig fordi den dekker store flater med høy albedo — ikke fordi den veier.</p>
        <p>Ett plussår på en bre motbeviser ikke en negativ trend. Massebalanse leses over år.</p>
        <p>Faregrad 5 er ikke «der ulykkene skjer». Grad 3 er der folk fortsatt går.</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Massebalanse"
          def="Akkumulasjon minus ablasjon. Fortegn over år avgjør breens helse."
        />
        <Term
          name="ELA"
          def="Likevektslinjen. Høyden der vintersnøen akkurat overlever sommeren."
        />
        <Term
          name="Permafrost"
          def="Grunn under 0 °C i minst to år. Det aktive laget tiner om sommeren."
        />
        <Term
          name="Albedo-tilbakekobling"
          def="Mindre is → mørkere flate → mer absorbert sol → mer smelting."
        />
        <Term name="Flakskred" def="Sammenhengende snøflak som glir på et svakt lag." />
        <Term
          name="Faregrad"
          def="Varsom 1–5. Hvor lett og hvor stort. Risikoen er også hvem som er i fjellet."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Likevektslinjen på en bre flytter seg oppover tre år på rad. Hva betyr det?",
            options: [
              "Breen får mer akkumulasjonsareal.",
              "Ablasjonssonen vokser. Massebalansen går mot minus.",
              "Permafrosten tiner under breen med en gang.",
              "At tidevannet har økt.",
            ],
            answer: 1,
            explain: "Høyere ELA = mindre område der snø overlever sommeren.",
          },
          {
            prompt: "Hvorfor er havis viktigere for strålingsbalansen enn tykkelsen alene skulle tilsi?",
            options: [
              "Fordi isen er salt.",
              "Fordi den dekker store flater med høy albedo.",
              "Fordi den veier mer enn Grønland.",
              "Fordi den blokkerer AMOC fysisk som en propp.",
            ],
            answer: 1,
            explain: "Areal ganger albedo. Tykkelsen styrer sårbarhet, ikke speilet.",
          },
          {
            prompt: "Hvorfor tas flest skredoffer ved faregrad 3, ikke 5?",
            options: [
              "Fordi grad 5 ikke finnes i Norge.",
              "Fordi fjellet fortsatt brukes ved 3, mens 5 holder folk unna.",
              "Fordi Varsom bare varsler til 3.",
              "Fordi flakskred bare går ved 3.",
            ],
            answer: 1,
            explain: "Risiko er fare ganger eksponering. Grad 5 senker eksponeringen.",
          },
          {
            prompt: "Hva er det aktive laget?",
            options: [
              "Selve permafrosten, som aldri tiner.",
              "Det øverste bakkelaget over permafrost. Det tiner om sommeren og fryser om vinteren.",
              "Havisen som smelter i september.",
              "Akkumulasjonsområdet på en bre.",
            ],
            answer: 1,
            explain: "Permafrost defineres over år. Det aktive laget er sesongens tine- og fryseflate.",
          },
        ]}
      />
    </TopicLayout>
  );
}
