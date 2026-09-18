import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { EnergySourcesDiagram, WindPowerTradeoffDiagram } from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/energi-hav-luft")!;

export const Route = createFileRoute("/tema/energi-hav-luft")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/energi-hav-luft",
    }),
  component: EnergiPage,
});

function EnergiPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Ressurser"
      title="Energi fra hav og atmosfære"
      lead="Vind, havvind, bølger og tidevann er fornybare fordi sola og månen fortsetter å drive dem. Bærekraft er likevel ikke gitt. Kompetansemålet ber om å drøfte utnyttelse nasjonalt og globalt — ikke bare å prise kilowatten."
      banner="/images/tema-strommer.jpg"
      bannerAlt="Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm"
      prev={{ to: "/tema/tilpasning", label: "Forrige: Konsekvenser og tilpasning" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid" }}
      kilder={KILDER_G2.energi}
    >
      <Callout title="Kompetansemål">
        <p>
          Drøfte hvordan energiressurser fra hav og atmosfære kan utnyttes på en bærekraftig måte,
          både nasjonalt og globalt (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hvor energien kommer fra
      </h2>
      <p>
        Nesten all fornybar energi i atmosfæren og i bølgene er omdannet solenergi. Ujevn
        oppvarming gir trykkforskjeller. Trykkforskjeller blir vind. Vind over hav blir bølger.
        Tidevann er unntaket: gravitasjon fra måne og sol, styrt av jordas rotasjon og
        bassengenes form.
      </p>
      <p>
        Derfor eier denne siden det{" "}
        <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">
          globale vindsystemet
        </Link>{" "}
        allerede har forklart — men nå som ressurs, ikke som vær. Vestavindsbeltet over Nordsjøen
        er det samme beltet som styrer lavtrykkene inn mot Vestlandet.
      </p>
      <EnergySourcesDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Effekt, kubikk og kapasitetsfaktor
      </h2>
      <p>
        Effekten i en vindturbin vokser med tettheten i lufta, arealet rotoren sveiper, og{" "}
        <em>kubikken</em> av vindhastigheten. Dobbelt så mye vind er ikke dobbelt så mye
        strøm. Det er omtrent åtte ganger, før virkningsgrad og kapping ved storm tas med.
        Derfor slår plassering antall master. Et anlegg i jevn 9 m/s slår et anlegg i ujevn 6
        m/s, selv med færre tårn.
      </p>
      <p>
        Kapasitetsfaktor er det tallet som skiller brosjyre fra år. Den er faktisk
        årsproduksjon delt på det anlegget ville levert om det gikk for fullt hver time. Landvind
        i Norge ligger typisk under havvind fordi havet har jevnere og sterkere vind, og fordi
        terreng og naboer tvinger landanlegg inn i kompromiss (NVE, u.å.-b).
      </p>
      <OrdBoks
        ord="Kapasitetsfaktor"
        barn="Faktisk årsproduksjon delt på teoretisk maks. Den forteller hvor mye ressursen og plasseringen faktisk leverer."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Vind på land</h2>
      <p>
        Landvind er billigst per kilowattime der vinden er god og nettet finnes. Konfliktene er
        like faste: støy, skyggekast, reindrift, friluftsliv, rovfugl og et landskap noen eier
        som utsikt. Bærekraft her er ikke «fornybart, derfor ferdig». Det er avveining mellom
        kutt, areal og den som bor under rotoren.
      </p>
      <p>
        En drøfting som bare teller tonn CO₂, har hoppet over nasjonalt nivå i målet. En
        drøfting som bare teller naboer, har hoppet over det globale pådrivet.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Havvind: dypet bestemmer teknologien
      </h2>
      <p>
        Over hav er vinden jevnere. Det er geografi, ikke politikk. Det som <em>er</em> politikk
        og geologi, er bunnen. Danmark og Nederland har grunn sokkel. Bunnfaste turbiner står
        der. Norge har dyp sokkel utenfor det meste av kysten. Flytende matcher den bunnen
        (NVE, u.å.-a).
      </p>
      <p>
        Derfor er «hvorfor ikke bare gjøre som Danmark?» et dårlig svar. Samme ressurs, annen
        hylle. Flytende er dyrere og yngre. Bunnfast er utprøvd der det er grunt nok. Valget
        følger kontinentalsokkelen, ikke ønsket om å kopiere naboen.
      </p>
      <p>
        Konfliktene skifter medium, de forsvinner ikke: fiskeri, skipstrafikk, sjøfugl, radar,
        kabler til land og hvem som eier strømmen når den kommer i land. Et felt i Nordsjøen
        er ikke tomt hav. Det er et arbeidsfelt.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Bølger og tidevann
      </h2>
      <p>
        Bølgeenergi er vindenergi flyttet over i vannoverflaten. Potensialet er stort der
        vestavinden har hatt lang strekning. Problemet er 100-årshavet: innretningen må tåle
        den bølgen som kommer sjelden, ikke bare middelbølgen som ser pen ut i en modell.
      </p>
      <p>
        Tidevann er predikerbart. Det er den store fordelen mot vind. Ulempen er geografi: få
        steder har både amplitude og et inngrep i fjære som samfunnet godtar. En tidevannsbarriere
        tvers over et estuar endrer sediment, gyting og landskap. Ressursen er der. Prisen er
        ikke bare turbinen (Store norske leksikon, u.å.).
      </p>
      <p>
        Vannkraft i elv eier Geofag 1 og norsk energihistorie. Den er ikke «energi fra hav og
        atmosfære» i dette målet. Hold deg til vind, bølge og tidevann — og si hvorfor vannkraft
        likevel er bakteppet for norsk forsyning.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Nasjonalt og globalt
      </h2>
      <p>
        Målet ber om begge skalaer. Nasjonalt: Norges dype sokkel, eksisterende vannkraft som
        buffer, og kyst som allerede er i bruk. Globalt: vestavindsbeltene på midlere bredde,
        passatene, og kyststater uten vannmagasin. Et land uten fjell og uten sokkel må velge
        annerledes enn Norge. Bærekraft er da også fordeling: hvem får strømmen, og hvem får
        inngrepet.
      </p>
      <WindPowerTradeoffDiagram />
      <p>
        Sammenlign med{" "}
        <Link to="/tema/tilpasning" className="text-primary underline-offset-2 hover:underline">
          tilpasning
        </Link>
        : havvind kutter pådriv. Tilpasning lever med været som kommer. Begge kan være
        bærekraftige. Ingen av dem er det automatisk.
      </p>

      <Callout title="Til eksamen">
        <p>
          Drøft minst tre hensyn: klima (kutt), areal/arter, og forsyning. Si hvorfor Norges
          sokkel peker mot flytende. Skill tidevann (gravitasjon, predikerbart) fra bølger
          (vær, variabelt).
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>Fornybart er ikke det samme som bærekraftig. Areal og arter teller i målet.</p>
        <p>Havvind er ikke «gratis vind». Kabel, bunn og konflikt er del av regnestykket.</p>
        <p>Tidevann kommer ikke fra sola på samme måte som bølger. Gravitasjon er en annen motor.</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Kapasitetsfaktor" def="Faktisk årsproduksjon delt på teoretisk maks." />
        <Term name="Havvind" def="Samme ressurs som landvind, jevnere over hav. Bunnfast eller flytende." />
        <Term name="Bølgeenergi" def="Vindenergi flyttet over i vannoverflaten. Høyt potensial, hardt miljø." />
        <Term name="Tidevann" def="Gravitasjonsdrevet, predikerbart. Få egnede steder." />
        <Term name="Kubikkloven" def="Effekt i vindturbin vokser omtrent med v³. Plassering slår antall master." />
        <Term
          name="Bærekraft"
          def="Kutt, areal, arter, forsyning og fordeling. Ett hensyn er et innlegg."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor er flytende havvind mer relevant for Norge enn for Danmark?",
            options: [
              "Fordi Norge ikke har vind.",
              "Fordi norsk sokkel er dypere. Bunnfast krever grunnere hav.",
              "Fordi Danmark har forbudt flytende turbiner.",
              "Fordi tidevannet er sterkere i Skagerrak.",
            ],
            answer: 1,
            explain: "Dyp er geografi. Teknologivalget følger bunnen.",
          },
          {
            prompt: "Hva skiller tidevann fra bølger som energikilde?",
            options: [
              "Ingenting.",
              "Tidevann er gravitasjon og predikerbart. Bølger er vær og variabelt.",
              "Bølger kommer fra månen.",
              "Tidevann krever solstormer.",
            ],
            answer: 1,
            explain: "Tidevann kan planlegges. Bølger må buffers som vind.",
          },
          {
            prompt: "En drøfting av bærekraftig havvind som bare nevner CO₂-kutt er for tynn fordi:",
            options: [
              "CO₂ ikke påvirker klima.",
              "Målet ber om bærekraft — areal, arter, fiske, forsyning og fordeling teller også.",
              "Havvind ikke kutter utslipp.",
              "Udir forbyr å nevne CO₂.",
            ],
            answer: 1,
            explain: "Drøfte = flere hensyn. Ett hensyn er et innlegg.",
          },
          {
            prompt: "Hvorfor slår plassering antall master i vindkraft?",
            options: [
              "Fordi master er forbudt over et visst tall.",
              "Fordi effekten vokser med kubikken av vindhastigheten. Jevn, sterk vind slår flere tårn i svak vind.",
              "Fordi kapasitetsfaktor bare gjelder havvind.",
              "Fordi coriolis stanser turbiner på land.",
            ],
            answer: 1,
            explain: "v³. Et stedskifte på noen meter per sekund endrer årsproduksjonen mer enn én ekstra rotor.",
          },
        ]}
      />
    </TopicLayout>
  );
}
