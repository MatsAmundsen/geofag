import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure, PhotoPair } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/vaerkatastrofer")({
  component: KatastroferPage,
});

function KatastroferPage() {
  return (
    <TopicLayout
      kicker="Naturfarer"
      title="Værkatastrofer"
      lead="Orkaner, ekstremnedbør og stormflo er ikke egne fysikklover. De er værsystemer drevet av varme, fukt og rotasjon — de samme mekanismene du allerede kan. En katastrofe oppstår når systemet treffer samfunn som ikke tåler det."
      banner="/images/banner-katastrofer.jpg"
      bannerAlt="Atlantisk orkan sett fra verdensrommet, med tydelig øye"
      videoTopic="værkatastrofer og naturfarer"
      prev={{ to: "/tema/paleoklima", label: "Forrige: Paleoklima" }}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Samme fysikk. Høyere innsats.
      </h2>
      <p>
        En værkatastrofe er et værsystem med nok energi, fukt eller vind til å ødelegge. Fysikken
        er den du har: lavtrykk, stigende luft, coriolis, varmt hav, fjell som tvinger luft opp.
        Forskjellen er skalaen — og at mennesker bor i veien.
      </p>
      <p>
        Derfor hører kapitlet hjemme til slutt. Uten trykk, vind, coriolis og hav blir orkanen et
        bilde. Med dem blir den et system.
      </p>
      <OrdBoks
        ord="Naturfare og risiko"
        barn="Naturfare er hendelsen: storm, flom, skred. Risiko er fare ganger sårbarhet. Samme storm er katastrofe i en tett kystby og en hard dag på et øde nes."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Tropisk syklon: varmt hav og en bøy
      </h2>
      <p>
        En tropisk syklon er et lavtrykk som lever av varmt hav. Vannet må være varmt et godt
        stykke ned, ikke bare i en tynn hinne. Når vannet fordamper og kondenserer i tårnskyene,
        slippes varme løs i lufta. Luften stiger. Trykket i midten synker. Mer luft strømmer inn
        nede.
      </p>
      <p>
        Coriolis bøyer innstrømningen. I nord spinner systemet mot klokken. I sør med klokken. På
        ekvator er coriolis for svak. Derfor fødes ikke orkaner der — selv om havet er varmt.
      </p>
      <OrdBoks
        ord="Tropisk syklon"
        barn="Fellesnavn for orkan, tyfon og syklon: et varmkjerne-lavtrykk over tropisk hav, drevet av kondensasjonsvarme og formet av coriolis. Øyet er det stille senteret."
      />

      <PhotoPair
        heading="Orkanen og brenselet"
        caption="Venstre: systemet sett ovenfra — øye, spiral, coriolis. Høyre: det varme havet det lever av. Uten varme i de øverste titalls meterne dør den."
        left={{
          src: "/images/fig-syklon.jpg",
          alt: "Tropisk syklon med tydelig øye sett fra verdensrommet",
          title: "Systemet",
          marks: [
            { x: 42, y: 38, n: "1", text: "Øye", tone: "fg" },
            { x: 8, y: 14, n: "2", text: "Spiral mot klokken", tone: "teal" },
          ],
        }}
        right={{
          src: "/images/fig-orkan-brensel.jpg",
          alt: "Varmt tropisk hav med en regnband i det fjerne",
          title: "Brenselet",
          marks: [{ x: 6, y: 58, n: "3", text: "Varmt hav", tone: "warm" }],
        }}
      />

      <p>
        Coriolis bøyer innstrømningen. I nord spinner systemet mot klokken. På ekvator er coriolis
        for svak — derfor fødes ikke orkaner der, selv om havet er varmt. Øyet er det stille
        senteret med synkende luft.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Norges stormer er noe annet
      </h2>
      <p>
        Vi får sjelden tropiske orkaner. Det vi får, er ekstratropiske lavtrykk: polarfrontens
        bølger. Her møtes varm luft sørfra og kald luft nordfra. Fronten kveiles. Et lavtrykk
        dypes. Vinden kan bli orkan styrke langs kysten uten at det er en tropisk syklon.
      </p>
      <p>
        Det er vestavindsbeltet du allerede kjenner, sett som vær, ikke som klimasone. Høst og
        vinter er sesongen. Nordsjøen og Norskehavet er løypa.
      </p>
      <OrdBoks
        ord="Ekstratropisk lavtrykk"
        barn="Et lavtrykk på midlere bredder, drevet av temperaturforskjell langs polarfronten — ikke av tropisk hav. Det er Norges typiske stormmaskin."
      />

      <PhotoFigure
        src="/images/fig-polarfront.jpg"
        alt="Kommaformet ekstratropisk syklon over Nord-Atlanteren mot norskekysten"
        heading="Polarfronten som komma"
        caption="Skybåndet er fronten. Varm luft på den ene siden, kald på den andre. Lavtrykket sitter i kveilens kjerne og trekker mot Norge."
        arrows={[{ d: "M 28 36 Q 48 22 72 28", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 8, y: 18, n: "1", text: "Kald luft", tone: "cold" },
          { x: 48, y: 52, n: "2", text: "Varm luft", tone: "warm" },
          { x: 70, y: 14, n: "3", text: "Mot kysten", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "Polar luft. Tørrere, tettere." },
          { n: "2", label: "Mildere luft sørfra. Fukt fra Atlanteren." },
          { n: "3", label: "Frontbåndet og vinden treffer kysten." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Når fjellet tvinger luften opp
      </h2>
      <p>
        Vestlandet er bygget for ekstremnedbør. Vestavinden kommer inn over varmt hav, lastet med
        fukt. Fjellet tvinger lufta opp. Den avkjøles. Vanndampen blir til regn. Bak fjellet, i
        øst, synker lufta og tørker. Samme celle, to utfall — du har sett det i vindkapitlet.
      </p>
      <p>
        I et varmere klima holder lufta mer fukt. Samme fjell, mer vann i skyene, mer intens
        nedbør. Det er derfor «ekstremnedbør» er en klimarisiko i Norge, ikke bare et vestlandsvær.
      </p>
      <OrdBoks
        ord="Orografisk nedbør"
        barn="Nedbør som oppstår fordi luft tvinges opp av fjell. Opp = avkjøling = kondensasjon. Les = mer nedbør mot vinden, tørrere i le."
      />

      <PhotoFigure
        src="/images/fig-ekstremnedbor.jpg"
        alt="Vestnorske fjell i styrtregn med skyer stablet mot toppene"
        heading="Havet, vinden og veggen"
        caption="Fukt fra Atlanteren. Vestavind. En fjellvegg. Det er oppskriften, ikke «tilfeldig dårlig vær»."
        arrows={[
          { d: "M 12 40 L 48 28", tone: "teal", width: 1.3 },
          { d: "M 52 26 L 52 12", tone: "cold", width: 1.2 },
        ]}
        marks={[
          { x: 6, y: 52, n: "1", text: "Fukt fra hav", tone: "teal" },
          { x: 40, y: 10, n: "2", text: "Tvinges opp", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "Varmt hav mater lufta med vanndamp." },
          { n: "2", label: "Fjellet løfter. Kondensasjon. Intens nedbør mot lo-siden." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Stormflo</h2>
      <p>
        Vind kan stable vann mot kysten. Lavtrykk kan løfte havoverflaten fordi lufta over veier
        mindre. Treffer det springflo, blir det stormflo. Da er det ikke bare bølger — det er selve
        vannstanden som kommer inn over kaia.
      </p>
      <p>
        Havnivået stiger i et varmere klima. Da trenger stormen mindre hjelp for å nå samme
        terskel. Risikoen kryper innover, selv om stormen er «den samme».
      </p>
      <OrdBoks
        ord="Stormflo"
        barn="Unormalt høy vannstand når storm og lavtrykk faller sammen med flo. Vinden presser vann inn. Det lave trykket løfter. Springflo forsterker."
      />

      <PhotoFigure
        src="/images/fig-stormflo.jpg"
        alt="Vinterbølger som går over molo og oversvømmer kai"
        heading="Når havet kommer oppå land"
        caption="Dette er ikke bare en stor bølge. Vinden har stablet vann. Lavtrykket har løftet. Kaien er under den nye vannstanden."
        arrows={[{ d: "M 18 28 L 48 40", tone: "cold", width: 1.3 }]}
        marks={[
          { x: 6, y: 16, n: "1", text: "Vind driver vann inn", tone: "cold" },
          { x: 52, y: 48, n: "2", text: "Kai under vann", tone: "low" },
        ]}
        points={[
          { n: "1", label: "Pålandsvind stabler vann mot kysten." },
          { n: "2", label: "Flo + storm = vannstand, ikke bare skum." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Når klimaet forskyver risikoen
      </h2>
      <p>
        Klimaendring lager ikke en ny fysikk. Den endrer rammene. Varmere hav gir tropiske sykloner
        mer energi å tære på. Varmere luft bærer mer fukt, så ekstremnedbør kan bli mer intens.
        Høyere hav gjør stormflo farligere.
      </p>
      <p>
        Det betyr ikke at «hver storm er menneskeskapt». Det betyr at terningen er blitt tyngre på
        én side. Frekvens og intensitet er to ulike spørsmål. Noen stormtyper kan bli sjeldnere og
        likevel sterkere når de kommer.
      </p>
      <OrdBoks
        ord="Tilskriving"
        barn="Forskning som spør hvor mye mer sannsynlig eller intens en konkret hendelse ble på grunn av klimaendring. Den sier sjelden «denne stormen ville ikke skjedd»."
      />

      <Callout title="Til eksamen og Norge">
        <p>
          Skill tropisk syklon og ekstratropisk lavtrykk. Orkaner trenger varmt hav og coriolis —
          derfor ikke på ekvator. Norges farer er polarfront, orografisk ekstremnedbør og stormflo.
          Klimaendring forskyver risiko, den oppfinner ikke nye lover.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Orkaner «suges ikke opp av coriolis som et vaskesluk i badekaret» — vasken er for liten.
          De fødes ikke på ekvator. Og «vi har alltid hatt storm» er sant. Spørsmålet er om
          rammene, og dermed halen av de verste hendelsene, er forskjøvet.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Tropisk syklon" def="Varmkjerne-lavtrykk over tropisk hav. Orkan, tyfon, syklon." />
        <Term name="Ekstratropisk lavtrykk" def="Polarfrontens storm. Norges typiske maskin." />
        <Term name="Orografisk nedbør" def="Fjell tvinger luft opp. Vestlandet." />
        <Term name="Stormflo" def="Storm + flo + lavtrykk. Vannstand, ikke bare bølger." />
        <Term name="Risiko" def="Fare ganger sårbarhet. Samme storm, ulikt utfall." />
        <Term name="Tilskriving" def="Hvor mye klimaendring endret sannsynlighet eller intensitet." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor dannes ikke tropiske orkaner på ekvator?",
            options: [
              "Havet er for grunt der.",
              "Coriolis er for svak til å kveile innstrømningen til et varig lavtrykk.",
              "Det regner aldri på ekvator.",
              "Sola står for høyt.",
            ],
            answer: 1,
            explain: "Varmt hav er nødvendig, men ikke nok. Uten coriolis blir det ikke et spinnende system.",
          },
          {
            prompt: "Hva driver Norges typiske høst- og vinterstormer?",
            options: [
              "Tropisk hav utenfor Vestlandet.",
              "Temperaturforskjell langs polarfronten — ekstratropiske lavtrykk.",
              "Jordskjelv i Nordsjøen.",
              "At AMOC snur hver høst.",
            ],
            answer: 1,
            explain: "Vestavindsbeltet og polarfronten. Det er ikke tropiske orkaner.",
          },
          {
            prompt: "Hvorfor kan stormflo bli farligere i et varmere klima selv om stormen er «den samme»?",
            options: [
              "Fordi vinden alltid blir dobbelt så sterk.",
              "Fordi høyere havnivå gjør at den samme stormen når lenger inn over land.",
              "Fordi månen kommer nærmere.",
              "Fordi lavtrykk slutter å virke.",
            ],
            answer: 1,
            explain: "Utgangspunktet for vannstanden er høyere. Terskelen er lavere.",
          },
        ]}
      />
    </TopicLayout>
  );
}
