import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { FieldworkInquiryChainDiagram } from "@/components/diagrams";
import { GeoMap } from "@/components/geo-map";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/felt-hav-luft-is")!;

export const Route = createFileRoute("/tema/felt-hav-luft-is")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/felt-hav-luft-is",
    }),
  component: FeltG2Page,
});

function FeltG2Page() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Metode"
      title="Feltarbeid i hav, luft og is"
      lead="G1-felt er berg og vann på land. G2-felt er hav, atmosfære eller kryosfære. Målet er det samme: planlegge, samle, bearbeide, tolke, presentere. Forskjellen er hva du måler, og at været selv er både objekt og risiko."
      banner="/images/gf1-bergarter.jpg"
      bannerAlt="Lagdelt sedimentær klippe og isskurt fjordlandskap"
      prev={{ to: "/tema/energi-hav-luft", label: "Forrige: Energi fra hav og luft" }}
      kilder={KILDER_G2.feltG2}
    >
      <Callout title="Kompetansemål">
        <p>
          Gjennomføre geofaglig feltarbeid knyttet til havet, atmosfæren eller kryosfæren,
          bearbeide og tolke de innsamlede dataene og presentere resultatene
          (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">
        Samme kjede, annen sfære
      </h2>
      <p>
        Planlegg, samle, bearbeid, tolk, presenter. Det er G1-kjeden. Den gjelder. Det som
        skifter, er objektet: luft, sjø eller snø — og at været kan avlyse dagen. Mal og
        HMS-logikk ligger i{" "}
        <Link to="/geofag-1/feltarbeid" className="text-primary underline-offset-2 hover:underline">
          Geofag 1 feltarbeid
        </Link>
        . Ikke skriv den om. Bruk den, og bytt det du måler.
      </p>
      <FieldworkInquiryChainDiagram />
      <p>
        Ett feltopplegg, én sfære. Et opplegg som «måler alt» måler ingenting godt nok til å
        tåle en tolkning.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Tre holdbare oppdrag
      </h2>
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong>Atmosfære — sjøbris.</strong> Temperatur, vindretning og sky langs en
          kyst–innland-transekt gjennom en dag. Hypotese: pålandsvind og temperaturfall ved
          kai bygger seg etter lunsj, mens innlandet henger etter. Fysikken eier{" "}
          <Link
            to="/tema/lokale-vaersystemer"
            className="text-primary underline-offset-2 hover:underline"
          >
            lokale værsystemer
          </Link>
          .
        </li>
        <li>
          <strong>Hav — ferskvannslinse.</strong> Temperatur og saltholdighet i et sund eller
          en fjordarm, overflate mot et par meters dyp. Hypotese: ferskere og kanskje kaldere
          linse innerst, saltere mot munningen. Tetthet eier{" "}
          <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
            havstrømmer
          </Link>
          .
        </li>
        <li>
          <strong>Kryosfære — snølag.</strong> Dybde, lagdeling og temperatur i trygt
          øvingsterreng. Bare der skolen har avtale og HMS. Hypotese: et svakt lag under
          nysnø, eller hard skare etter føn. Faregrad og flak eier{" "}
          <Link to="/tema/kryosfaeren" className="text-primary underline-offset-2 hover:underline">
            kryosfæren
          </Link>
          . Faregrad 3 og opp er ikke skolefelt uten profesjonell skredkompetanse (NVE, u.å.).
        </li>
      </ul>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Et design som tåler tolkning
      </h2>
      <p>
        Ta sjøbrisen. Én temperatur på skoleplassen kl. 12 kan ikke vise et kretsløp. Du
        trenger kontrast i rom og tid: kai og et punkt noen kilometer innland, hver time fra
        formiddag til kveld, med vindretning og skydekke i samme slå. Da kan du si om
        pålandsvinden kom, når den kom, og om innlandet ble hengende etter.
      </p>
      <GeoMap
        center={[59.91, 10.73]}
        zoom={11}
        markers={[
          { lat: 59.908, lng: 10.73, label: "Kai / sjø (eksempelpunkt)" },
          { lat: 59.94, lng: 10.77, label: "Innland ~3 km (eksempelpunkt)" },
        ]}
        heading="Eksempel: to punkter i en sjøbris-transekt"
        caption="To georefererte punkt er minstekravet for å vise en gradient. Koordinatene er et eksempel ved Oslofjorden — ikke din feltlokalitet."
      />
      <p>
        I fjorden: mål ikke «saltholdighet et sted». Mål overflate og dyp, innerst og ytterst,
        og skriv tid. En linse flytter seg med tidevann og elv. Uten klokkeslett blander du
        to tilstander.
      </p>
      <OrdBoks
        ord="Transekt"
        barn="Rekke av målepunkt langs en linje. Kyst til innland. Innerst til munning. Uten linjen har du bare enkeltverdier."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Metadata eller det er ikke data
      </h2>
      <p>
        Skriv tid, sted (koordinat, ikke bare «ved kaia»), instrument, usikkerhet og
        observatør i feltboka før du går. En temperatur uten klokkeslett er verdiløs i en
        sjøbris-undersøkelse. En saltholdighet uten dyp er en blanding av to vannmasser.
      </p>
      <p>
        Usikkerhet er det målingen ikke kan skille. Et skoletermometer på ±0,5 °C kan ikke
        bevise en gradient på 0,3 °C. Si det. Det er tolkning, ikke nederlag.
      </p>
      <OrdBoks
        ord="Metadata"
        barn="Tid, sted, instrument, usikkerhet, observatør. Uten dem kan ingen gjenskape målingen."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Bearbeid, tolk, presenter
      </h2>
      <p>
        Målet slutter ikke i feltboka. Bearbeid: tabell, enkel figur, tid mot temperatur på
        kai og innland. Tolk: matcher kurven hypotesen, eller blåste det fra land hele dagen?
        Presenter: problemstilling, metode, data, det du kan si, og det du ikke kan si.
      </p>
      <p>
        «Vi målte vær» er ikke en konklusjon. «Pålandsvind og 2 °C lavere temperatur ved kai
        fra kl. 14, innlandet uendret — forenlig med sjøbris den dagen, men én dag er ikke
        en sesong» er en konklusjon.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">HMS i G2</h2>
      <p>
        Kyst: bølger, glatt svaberg, flod. Fjord: båt og kaldt vann. Fjell vinter: skred.
        Været er objektet du måler, og risikoen som kan avlyse. Bruk Yr og Varsom. Avlys er
        en del av kompetansen, ikke et avvik fra den (NVE, u.å.).
      </p>
      <p>
        G1-regelen gjelder: sikkerhet går foran data. En rapport som dokumenterer avlysning
        med varsel og begrunnelse, er feltkompetanse. En rapport fra faregrad 3 uten plan er
        det ikke.
      </p>

      <Callout title="Til eksamen">
        <p>
          Vis kjeden. Vis at du valgte én sfære. Vis metadata. Si usikkerheten. En figur
          med to kurver slår en side med stemning.
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>Ett tall kl. 12 er ikke et kretsløp. Du trenger rom og tid.</p>
        <p>Foto erstatter ikke feltbok. GPS erstatter ikke koordinat skrevet ned.</p>
        <p>Avlys er ikke stryk. Udokumentert tur i faregrad 3 er det.</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Transekt" def="Rekke av målepunkt langs en linje, for eksempel kyst til innland." />
        <Term name="Metadata" def="Tid, sted, instrument, usikkerhet. Det som gjør data gjenbrukbare." />
        <Term name="Usikkerhet" def="Hva målingen ikke kan skille. Oppgi den, ikke gjem den." />
        <Term name="HMS" def="Vær og skred er både objekt og risiko. Avlys når varslet sier det." />
        <Term name="Hypotese" def="En testbar setning. «Sjøbris etter lunsj» kan falles. «Vær» kan ikke." />
        <Term name="Tolkning" def="Hva dataene kan bære. Én dag er ikke en sesong." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Du skal teste sjøbris. Hvilket design er sterkest?",
            options: [
              "Én temperatur på skolen kl. 12.",
              "Temperatur og vind på kai og noen kilometer innland, hver time fra formiddag til kveld.",
              "Bare et bilde av havet.",
              "Snødybde på fjellet.",
            ],
            answer: 1,
            explain: "Du trenger kontrast i rom og tid. Én verdi kan ikke vise et kretsløp.",
          },
          {
            prompt: "Varsom sier faregrad 3 i feltområdet. Hva gjør du?",
            options: [
              "Går likevel, det er bare midt på skalaen.",
              "Avlyser eller flytter til trygt terreng. Dokumenterer begrunnelsen.",
              "Går hvis sola skinner.",
              "Bytter til kvikkleire uten plan.",
            ],
            answer: 1,
            explain: "Feltkompetanse er også å droppe felt.",
          },
          {
            prompt: "Hva skiller G2-felt fra G1-felt i læreplanen?",
            options: [
              "G2 skal ikke presentere.",
              "G2 skal knyttes til hav, atmosfære eller kryosfære.",
              "G2 forbyr feltbok.",
              "G2 krever satellitt.",
            ],
            answer: 1,
            explain: "Samme metodekjede. Annen sfære.",
          },
          {
            prompt: "Hvorfor er en saltholdighet uten dyp og klokkeslett nesten verdiløs i en fjord?",
            options: [
              "Fordi salt ikke varierer i norske fjorder.",
              "Fordi en ferskvannslinse flytter seg med tidevann og elv, og ligger i overflaten. Uten dyp og tid blander du to tilstander.",
              "Fordi NVE forbyr saltmåling.",
              "Fordi saltholdighet bare måles i Atlanteren.",
            ],
            answer: 1,
            explain: "Metadata er det som skiller en linse fra et tilfeldig tall.",
          },
        ]}
      />
    </TopicLayout>
  );
}
