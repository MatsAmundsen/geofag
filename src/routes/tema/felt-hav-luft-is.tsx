import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { FieldworkInquiryChainDiagram } from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/felt-hav-luft-is")!;

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
          bearbeide og tolke de innsamlede dataene og presentere resultatene.
        </p>
      </Callout>
      <h2 className="font-display text-2xl font-medium tracking-tight">Velg sfære</h2>
      <p>Ett feltopplegg, én sfære. Tre holdbare G2-oppdrag:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Atmosfære: temperatur, trykk, vind og sky langs en kyst–innland-transekt gjennom en dag.
          Hypotese: sjøbris bygger seg etter lunsj.
        </li>
        <li>
          Hav: temperatur og saltholdighet i et sund eller en fjordarm. Hypotese: ferskere linse innerst.
        </li>
        <li>
          Kryosfære: snødybde, lagdeling og temperatur i trygt øvingsterreng — bare der skolen har
          avtale og HMS.
        </li>
      </ul>
      <p>
        G1-feltboka gjelder. Mal og HMS-logikk ligger i{" "}
        <Link to="/geofag-1/feltarbeid" className="text-primary underline-offset-2 hover:underline">
          Geofag 1 feltarbeid
        </Link>
        .
      </p>
      <FieldworkInquiryChainDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Data som tåler eksamen</h2>
      <p>
        Skriv tid, sted (koordinat), instrument og usikkerhet i feltboka før du går. En temperatur
        uten klokkeslett er verdiløs i en sjøbris-undersøkelse.
      </p>
      <OrdBoks
        ord="Metadata"
        barn="Tid, sted, instrument, usikkerhet, observatør. Uten dem kan ingen gjenskape målingen."
      />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">HMS i G2</h2>
      <p>
        Kyst: bølger, glatt svaberg, flod. Fjell vinter: skred. Faregrad 3 og opp er ikke skolefelt
        uten profesjonell skredkompetanse. Bruk Varsom, og avlys.
      </p>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Transekt" def="Rekke av målepunkt langs en linje, for eksempel kyst til innland." />
        <Term name="Metadata" def="Tid, sted, instrument, usikkerhet. Det som gjør data gjenbrukbare." />
        <Term name="Usikkerhet" def="Hva målingen ikke kan skille. Oppgi den, ikke gjem den." />
        <Term name="HMS" def="Vær og skred er både objekt og risiko. Avlys når varslet sier det." />
      </TermGrid>
      <Quiz
        questions={[
          {
            prompt: "Du skal teste sjøbris. Hvilket design er sterkest?",
            options: [
              "Én temperatur på skolen kl. 12.",
              "Temperatur og vind på kai og 5 km innland, hver time fra formiddag til kveld.",
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
        ]}
      />
    </TopicLayout>
  );
}
