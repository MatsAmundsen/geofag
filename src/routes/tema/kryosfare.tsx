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
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/kryosfare")!;

export const Route = createFileRoute("/tema/kryosfare")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/kryosfare",
    }),
  component: KryosfarePage,
});

function KryosfarePage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Kryosfæren"
      title="Kryosfæren"
      lead="Is og snø er ikke bare istid. Kryosfæren er breer, permafrost, havis og snødekke — nå. Istidene ligger i paleoklima og Milankovitch. Denne siden er isen som jobber i år."
      banner="/images/tema-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/klima", label: "Forrige: Klima" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KILDER_G2.kryosfare}
    >
      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for vekselvirkninger mellom jordsystemene og hvordan de kan påvirke havet,
          atmosfæren og kryosfæren. Vurdere risiko ved naturfarer som følge av fenomener i kryosfæren.
        </p>
      </Callout>
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva kryosfæren er</h2>
      <p>
        Kryosfæren er alt frosset vann på jordoverflaten. Den er den mest reflekterende av sfærene.
        Istidssyklusene ligger i{" "}
        <Link to="/tema/milankovitch" className="text-primary underline-offset-2 hover:underline">Milankovitch</Link>
        {" "}og{" "}
        <Link to="/tema/paleoklima" className="text-primary underline-offset-2 hover:underline">paleoklima</Link>.
      </p>
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Massebalanse</h2>
      <p>
        Inn: snø som overlever sommeren. Ut: smelting, sublimasjon, kalving. Likevektslinjen skiller
        overskudd fra underskudd.
      </p>
      <GlacierMassBalanceDiagram />
      <OrdBoks ord="Massebalanse" barn="Akkumulasjon minus ablasjon over et hydrologisk år." />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Permafrost</h2>
      <p>Grunn under 0 °C i minst to år. Aktivt lag tiner om sommeren. Norge: høyfjellet og Svalbard.</p>
      <PermafrostDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Havis</h2>
      <p>Hvit is reflekterer. Åpent hav absorberer. Mindre sommeris gir mer smelting — positiv tilbakekobling.</p>
      <SeaIceAlbedoFeedbackDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Snøskred</h2>
      <p>
        G1 tar steinskred og kvikkleire. Snøskred hører i G2. De fleste alvorlige ulykker i Norge er
        flakskred. Varsom 1–5. Grad 3 tar flest folk fordi fjellet fortsatt brukes.
      </p>
      <SlabAvalancheDiagram />
      <OrdBoks ord="Faregrad" barn="Varsom 1–5. Hvor lett og hvor stort et skred kan bli." />
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Massebalanse" def="Akkumulasjon minus ablasjon. Fortegn over år avgjør breens helse." />
        <Term name="Permafrost" def="Grunn under 0 °C i minst to år. Aktivt lag tiner om sommeren." />
        <Term name="Albedo-tilbakekobling" def="Mindre is → mørkere flate → mer absorbert sol → mer smelting." />
        <Term name="Flakskred" def="Sammenhengende snøflak som glir på et svakt lag." />
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
            explain: "Høyere likevektslinje = mindre område der snø overlever sommeren.",
          },
          {
            prompt: "Hvorfor er havis viktigere for strålingsbalansen enn tykkelsen alene skulle tilsi?",
            options: [
              "Fordi isen er salt.",
              "Fordi den dekker store flater med høy albedo.",
              "Fordi den veier mer enn Grønland.",
              "Fordi den blokkerer AMOC fysisk.",
            ],
            answer: 1,
            explain: "Areal ganger albedo.",
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
            explain: "Eksponering ganger sannsynlighet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
