import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { GeminiFigure } from "@/components/gemini-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/tilpasning")!;

export const Route = createFileRoute("/tema/tilpasning")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/tilpasning",
    }),
  component: TilpasningPage,
});

function TilpasningPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Samfunn"
      title="Konsekvenser og tilpasning"
      lead="Klimaendring er fysikk. Konsekvens er det fysikken gjør med folk, mat, byer og økosystem. Tilpasning er å leve med været som kommer. Utslippskutt er å bremse pådrivet. Kompetansemålet ber om å drøfte begge."
      banner="/images/tema-katastrofer.jpg"
      bannerAlt="En atlantisk orkan sett fra verdensrommet, med tydelig øye"
      prev={{ to: "/tema/vaerkatastrofer", label: "Forrige: Værkatastrofer" }}
      next={{ to: "/tema/energi-hav-luft", label: "Neste: Energi fra hav og luft" }}
      kilder={KILDER_G2.tilpasning}
    >
      <Callout title="Kompetansemål">
        <p>
          Drøfte konsekvenser av klimaendringer for enkeltmennesker, samfunn og økosystem, og
          vurdere bærekraftige løsninger for hvordan enkeltmennesker og samfunn kan redusere og
          tilpasse seg klimaendringer i nåtid og framtid.
        </p>
      </Callout>
      <h2 className="font-display text-2xl font-medium tracking-tight">Tre nivåer</h2>
      <p>
        Enkeltmenneske: helse i hetebølge, bolig i flomsonen. Samfunn: strømnett, vei, sykehus.
        Økosystem: korallbleking, torskens utbredelse. En tekst som bare tar ett nivå, treffer halve målet.
      </p>
      <GeminiFigure
        id="tilpasning-nivaer"
        heading="Person, samfunn, økosystem"
        caption="Samme fysikk, tre slags skade. Skriv alle tre, ellers er drøftingen for tynn."
        prompt="Tre felt i mørk geofag-stil: person i hetebølge i en norsk by, oversvømt gate og beredskap, bleket kystøkosystem. Ingen katastrofe-klisjé. Liggende format. Minimal tekst."
      />
      <p>
        Fysikken bak ekstremene ligger i{" "}
        <Link to="/tema/vaerkatastrofer" className="text-primary underline-offset-2 hover:underline">værkatastrofer</Link>
        {" "}og{" "}
        <Link to="/tema/klima" className="text-primary underline-offset-2 hover:underline">klima</Link>.
      </p>
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Norge som eksempel</h2>
      <p>
        Mildere vintre, mer ekstremnedbør, mer våte skred, høyere stormflo. Norsk klimaservicesenter.
        Oslo må tenke overvann. Nordland må tenke skred og vei. Vestlandet må tenke flom i bratte felt.
      </p>
      <OrdBoks ord="Tilpasning" barn="Å redusere skade av det været og klimaet som faktisk kommer." />
      <OrdBoks ord="Utslippskutt" barn="Å redusere pådrivet. Uten kutt vokser tilpasningsbehovet uten tak." />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Mal for en drøfting</h2>
      <GeminiFigure
        id="tilpasning-mal"
        heading="Fem steg som tåler eksamen"
        caption="Fenomen → fysikk → tre nivåer → ett kutt og ett tilpasningstiltak → én begrensning."
        prompt="Fem nummererte steg i mørk geofag-stil: 1 fenomen, 2 fysikk, 3 tre nivåer, 4 to tiltak, 5 maltilpasning. Lite tekst."
      />
      <ol className="list-decimal space-y-2 pl-5">
        <li>Velg ett fenomen (for eksempel styrtregn over en by).</li>
        <li>Si fysikken i én setning (varmere luft holder mer vanndamp).</li>
        <li>Konsekvens på tre nivåer: person, kommune, økosystem.</li>
        <li>Ett tiltak som kutter pådriv, ett som tilpasser. Si hvem som betaler.</li>
        <li>En begrensning: tiltak som flytter risiko (voll som gir falsk trygghet bakom).</li>
      </ol>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Tilpasning" def="Redusere skade av klimaet som kommer. Varsling, plan, bygg." />
        <Term name="Utslippskutt" def="Redusere pådrivet. Virkningen er treg, men uten tak på skaden." />
        <Term name="Sårbarhet" def="Hvor hardt et system rammes, gitt eksponering og evne til å tåle." />
        <Term name="Maltilpasning" def="Tiltak som øker risikoen senere eller flytter den til andre." />
      </TermGrid>
      <Quiz
        questions={[
          {
            prompt: "Hvorfor er flomvoll alene et ufullstendig svar på mer styrtregn?",
            options: [
              "Fordi voller er forbudt.",
              "Fordi den tilpasser, men ikke kutter pådriv, og kan gi maltilpasning bak vollen.",
              "Fordi styrtregn ikke gir flom.",
              "Fordi IPCC forbyr voller.",
            ],
            answer: 1,
            explain: "Målet ber om både redusere og tilpasse.",
          },
          {
            prompt: "Hvilken setning treffer økosystem-nivået?",
            options: [
              "Folk blir slitne i varmen.",
              "Kommunen må rense sluk.",
              "Høyere sjøtemperatur bleker korall og flytter fiskebestander.",
              "Strømprisen stiger.",
            ],
            answer: 2,
            explain: "De tre andre er person eller samfunn.",
          },
          {
            prompt: "Hva er forskjellen på sårbarhet og fare?",
            options: [
              "Ingenting.",
              "Fare er hendelsen. Sårbarhet er hvor hardt systemet rammes av den.",
              "Sårbarhet er bare økonomi.",
              "Fare finnes bare i tropene.",
            ],
            answer: 1,
            explain: "Samme storm, ulik skade avhengig av bygg, varsling og fattigdom.",
          },
        ]}
      />
    </TopicLayout>
  );
}
