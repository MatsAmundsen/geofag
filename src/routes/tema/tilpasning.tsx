import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  ImpactLevelsDiagram,
  AdaptationExamFrameworkDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/tilpasning")!;

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
      lead="Klimaendring er fysikk. Konsekvens er det fysikken gjør med folk, mat, byer og økosystem. Tilpasning er å leve med været som kommer. Utslippskutt er å bremse pådrivet. Kompetansemålet ber om å drøfte begge — og si hvem som betaler."
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
          tilpasse seg klimaendringer i nåtid og framtid (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">
        To verb i samme mål
      </h2>
      <p>
        Målet har to verb som ikke er det samme. <em>Redusere</em> betyr å kutte pådrivet:
        mindre CO₂ og metan, slik at jorda holder igjen mindre langbølge. <em>Tilpasse</em> betyr
        å senke skaden av været som allerede kommer — og som vil komme mens kuttet virker.
      </p>
      <p>
        Kutt uten tilpasning etterlater folk i flomsonen i tiårene som allerede er «bestilt» av
        gassene i lufta. Tilpasning uten kutt gir et tiltak som må bygges om igjen når
        ekstremene vokser. En tekst som bare tar det ene, treffer halve målet.
      </p>
      <p>
        Fysikken bak pådrivet eier{" "}
        <Link to="/tema/klima" className="text-primary underline-offset-2 hover:underline">
          klima
        </Link>
        . Fysikken bak ekstremene eier{" "}
        <Link
          to="/tema/vaerkatastrofer"
          className="text-primary underline-offset-2 hover:underline"
        >
          værkatastrofer
        </Link>
        . Denne siden eier det som skjer når fysikken treffer et hus, en kommune og et rev.
      </p>
      <OrdBoks
        ord="Tilpasning"
        barn="Å redusere skade av det været og klimaet som faktisk kommer. Varsling, plan, bygg, forsikring."
      />
      <OrdBoks
        ord="Utslippskutt"
        barn="Å redusere pådrivet. Virkningen er treg. Uten kutt vokser tilpasningsbehovet uten tak."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Tre nivåer — ellers er svaret halvt
      </h2>
      <p>
        Kompetansemålet lister tre nivåer med vilje. Samme hetebølge er tre ulike historier.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Enkeltmenneske:</strong> helse, bolig, jobb. Eldre i en loftsetasje uten
          nattkjøling. En gårdbruker som mister avling. En familie i kjelleren når sluket går
          fullt.
        </li>
        <li>
          <strong>Samfunn:</strong> vei, strøm, sykehus, vann og avløp, forsikring, kommunebudsjett.
          Når E6 stenges av skred, er det ikke bare «vær». Det er varer som ikke kommer fram.
        </li>
        <li>
          <strong>Økosystem:</strong> korall som blekes, torsk som flytter nordover, myr som tørker
          og slipper karbon, fjellrev som presses oppover til det ikke er mer fjell.
        </li>
      </ul>
      <ImpactLevelsDiagram />
      <p>
        En eksamenstekst som bare beskriver personen i kjelleren, har ikke truffet økosystemet. En
        tekst som bare nevner korall, har ikke truffet kommunen. Tre nivåer er ikke pynt. Det er
        målet.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fare, eksponering, sårbarhet
      </h2>
      <p>
        Samme storm gir ulik skade. IPCC skiller mellom faren (hendelsen), eksponeringen (hvem
        og hva som står i veien) og sårbarheten (hvor hardt systemet rammes gitt evne til å tåle
        og komme seg) (IPCC, 2022). Risiko er produktet, ikke varslet alene.
      </p>
      <p>
        Derfor kan to kystbyer møte samme stormflo og få to utfall. Den ene har voll, varsling og
        evakueringsvei. Den andre har kjellerboliger i gammel sjøbunn og et sluknett bygd for
        1980-tallets regn. Faren er lik. Sårbarheten er det ikke.
      </p>
      <OrdBoks
        ord="Sårbarhet"
        barn="Hvor hardt et system rammes, gitt eksponering og evne til å tåle. Ikke det samme som faren."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Norge: mer vann, mer skred, høyere sjø
      </h2>
      <p>
        Norsk klimaservicesenter tegner et land som blir våtere og mildere, med flere korte,
        intense regnskyll. Det er ikke «det blir varmere, slutt». Det er hvor vannet lander, og
        hvor bakken allerede er mettet (Store norske leksikon, u.å.; IPCC, 2022).
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Oslo og andre byer:</strong> overvann. Tette flater, gamle rør, kjellere. Styrtregn
          på en time kan fylle det sluknettet brukte et døgn på.
        </li>
        <li>
          <strong>Vestlandet:</strong> flom i bratte felt. Kort vei fra sky til elv. Samme fysikk
          som i{" "}
          <Link to="/geofag-1/vann-og-flom" className="text-primary underline-offset-2 hover:underline">
            Geofag 1 flom
          </Link>
          , men drivkraften her er et varmere, fuktigere vestavindsbelte.
        </li>
        <li>
          <strong>Nordland og fjellfylker:</strong> våte skred og svekket permafrost i høyfjellet.
          Snøskred eier{" "}
          <Link to="/tema/kryosfaeren" className="text-primary underline-offset-2 hover:underline">
            kryosfæren
          </Link>
          . Poenget her er samfunnet: vei, tunellmunning, hyttefelt.
        </li>
        <li>
          <strong>Kysten:</strong> stormflo oppå et høyere middelvann. Vollen som holdt i 1990, er
          lavere i 2050 uten at noen har flyttet den.
        </li>
      </ul>
      <p>
        Mildere vintre er ikke gratis. Mindre frost kan gi mer flått og mer råte i trehus. Mer
        vinternedbør som regn i stedet for snø gir flom når bakken ikke er frossen. Konsekvens er
        mer enn «det blir ubehagelig varmt i juli».
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Globalt: mat, rev, lavt land
      </h2>
      <p>
        Tre nivåer gjelder også utenfor Norge. En tørke i Sahel er person (sult), samfunn
        (flytting, stat) og økosystem (beite som ikke kommer tilbake). Korallbleking er økosystem
        først, men fiskeri og turisme gjør den til samfunn. Små øystater møter stormflo som
        eksistensiell fare, ikke som kommunal overvannssak.
      </p>
      <p>
        Fordelingen er skjev. De som har sluppet ut minst, rammes ofte hardest, og har minst
        kapital til å bygge voll eller flytte by. En drøfting som later som tilpasning bare er
        teknikk, hopper over det målet kaller «bærekraftige løsninger».
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Maltilpasning: tiltaket som flytter skaden
      </h2>
      <p>
        Et tiltak kan senke risikoen her og øke den der — eller senere. Voll bakom et nytt
        boligfelt gir falsk trygghet: folk bygger tettere, og når vollen overtoppes, er skaden
        større. Aircondition uten kuttet strøm øker pådrivet mens den redder liv i heten. Å
        pumpe grunnvann i tørke senker speilet til naboen.
      </p>
      <p>
        Det heter maltilpasning. Det er ikke argument mot å gjøre noe. Det er argument for å si
        hvem som vinner, hvem som taper, og hva som skjer om 30 år.
      </p>
      <OrdBoks
        ord="Maltilpasning"
        barn="Tiltak som øker risikoen senere, flytter den til andre, eller låser samfunnet til en løsning som ikke tåler neste steg."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Mal for en drøfting
      </h2>
      <AdaptationExamFrameworkDiagram />
      <ol className="list-decimal space-y-2 pl-5">
        <li>Velg ett fenomen (for eksempel styrtregn over en by, eller stormflo på kysten).</li>
        <li>Si fysikken i én setning (varmere luft holder mer vanndamp; høyere middelvann løfter floen).</li>
        <li>Konsekvens på tre nivåer: person, kommune, økosystem.</li>
        <li>Ett tiltak som kutter pådriv, ett som tilpasser. Si hvem som betaler.</li>
        <li>En begrensning: maltilpasning, treghet, eller at kuttet virker for sent alene.</li>
      </ol>
      <Callout title="Til eksamen">
        <p>
          «Vi må tilpasse oss» er ikke et svar. Si <em>hva</em>, <em>for hvem</em>, og{" "}
          <em>hva som gjenstår hvis ingen kutter</em>. Tre nivåer. To verb.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>Tilpasning erstatter ikke kutt. Kuttet senker taket på skaden. Tilpasning senker skaden under taket.</p>
        <p>Ett varmt år er ikke hele konsekvensen. Risiko leses i trenden og i hvem som står i veien.</p>
        <p>En voll er et tiltak. Den er ikke bærekraft alene.</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Tilpasning" def="Redusere skade av klimaet som kommer. Varsling, plan, bygg." />
        <Term name="Utslippskutt" def="Redusere pådrivet. Virkningen er treg, men uten tak på skaden." />
        <Term name="Sårbarhet" def="Hvor hardt et system rammes, gitt eksponering og evne til å tåle." />
        <Term name="Eksponering" def="Hvem og hva som står i veien for faren." />
        <Term name="Maltilpasning" def="Tiltak som øker risikoen senere eller flytter den til andre." />
        <Term name="Overvann" def="Regn som ikke får plass i sluk og grunn. Byens flom." />
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
            explain: "Målet ber om både redusere og tilpasse. Voll uten kutt og uten plan bakom er halvt.",
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
          {
            prompt: "Hvorfor er «Norge blir mildere, det er bra» et tynt svar?",
            options: [
              "Fordi Norge ikke blir mildere.",
              "Fordi mildere vintre også gir mer regnflom, skred, overvann og arter som flytter — og fordi målet krever tre nivåer.",
              "Fordi IPCC forbyr å nevne Norge.",
              "Fordi mildere vær ikke er klima.",
            ],
            answer: 1,
            explain: "Konsekvens er mer enn gjennomsnittstemperatur. Det er vann, skred, helse og økosystem.",
          },
        ]}
      />
    </TopicLayout>
  );
}
