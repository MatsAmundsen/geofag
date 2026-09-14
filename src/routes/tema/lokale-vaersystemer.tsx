import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  PolarFrontCycloneSteps,
  ValleyWindDiagram,
  SeaBreezeLandBreezeDiagram,
  FoehnAdiabaticDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/lokale-vaersystemer")!;

export const Route = createFileRoute("/tema/lokale-vaersystemer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/lokale-vaersystemer",
    }),
  component: LokalePage,
});

function LokalePage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Lokale og regionale værsystemer"
      lead="Samme fysikk i tre målestokker. Globalt: cellene og jetstrømmen. Regionalt: polarfrontsyklonen som fødes sørvest for Island og styrer været over Norge. Lokalt: sjøbris, dalvind og føn, der land, hav og fjellside varmes ulikt."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      prev={{ to: "/tema/vaerkart", label: "Forrige: Værkart" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.lokale}
    >
      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og
          lokal skala, og tolke ulike værkart og værutvikling (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Tre skalaer, samme trykk</h2>
      <p>
        Luft går fra høyere mot lavere trykk. Det gjelder en sjøbris over ti kilometer, en
        polarfrontsyklon over tusen kilometer, og Hadley-cellen rundt hele tropene. Det som endrer
        seg, er om jordrotasjonen rekker å dreie strømmen.
      </p>
      <p>
        Corioliseffekten trenger tid og strekning. Over en kyststripe på en ettermiddag merker du
        den knapt. Over Nord-Atlanteren på et døgn bygger den rotasjonen som gjør at lavtrykket
        spinner. Derfor er polarfrontsyklonen et regionalt system, mens sjøbrisen er et lokalt
        kretsløp.
      </p>
      <p>
        Den globale skalaen eier{" "}
        <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">
          vindsystemet
        </Link>{" "}
        og{" "}
        <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">
          jetstrømmen
        </Link>
        . Å lese systemet på et kart eier{" "}
        <Link to="/tema/vaerkart" className="text-primary underline-offset-2 hover:underline">
          værkart
        </Link>
        . Denne siden eier hvordan syklonen blir til — og hvordan samme logikk ser ut i en fjord
        og i en dal.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Polarfrontsyklonen: fem stadier
      </h2>
      <p>
        Polarfronten er skillet mellom kald polarluft og milde luftmasser sør for den. Den ligger
        ikke i ro. En bølge på fronten blir til et lavtrykk. Modellen kommer fra Bjerknes og
        Solberg (1922). Den er forenklet, men den forklarer det norske været bedre enn de fleste
        andre bilder (Store norske leksikon, u.å.-a).
      </p>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          <strong>Uforstyrret front.</strong> En slak grense. Kald luft i nord, varmere luft i sør.
          Lite vær ennå.
        </li>
        <li>
          <strong>Bølge.</strong> En forstyrrelse — ofte under en jetstreak — får fronten til å bøye
          seg. Trykket faller i bølgetoppen. Et lite L tegnes på kartet.
        </li>
        <li>
          <strong>Varm sektor.</strong> Varmfronten går foran mot nordøst. Kaldfronten jager bakfra
          mot sørøst. Mellom dem ligger den varme sektoren: mild, fuktig luft fra sørvest. Det er
          her det «bare regner og er +8 °C i januar».
        </li>
        <li>
          <strong>Okklusjon.</strong> Kaldfronten er brattere og går fortere. Den tar igjen
          varmfronten. Den varme luften løftes fra bakken. Lavtrykket er ofte sterkest like før
          eller like etter okklusjonen.
        </li>
        <li>
          <strong>Utfylling.</strong> Temperaturkontrasten ved bakken er brukt opp. Luften strømmer
          inn. L-et slites ut. Systemet dør over land eller langt mot nord.
        </li>
      </ol>
      <PolarFrontCycloneSteps />
      <OrdBoks
        ord="Varm sektor"
        barn="Lufta mellom varmfront og kaldfront. Mild, fuktig, ofte sørvest. Det er ikke «bare overskyet» — det er en annen luftmasse."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva du faktisk opplever
      </h2>
      <p>
        En modell uten vær er en tegning. Foran en varmfront kommer skyene i rekkefølge fordi
        glideflaten er slak, ofte rundt 1:150. Først cirrus (Ci), så cirrostratus (Cs), altostratus
        (As) og nimbostratus (Ns) med jevnt, langvarig nedbør. Bakkenfronten kan ligge 1000–1500 km
        bak de første cirrusskyene (Sivle, 2009; Store norske leksikon, u.å.-a).
      </p>
      <p>
        I varm sektor letter nedbøren ofte. Det blir mildt. Vinden ligger på sørvest. Bak
        kaldfronten snur vinden mot vest og nordvest. Byene blir korte og harde. Temperaturen faller
        fordi du nå står i polarlufta.
      </p>
      <p>
        Okklusjonen blander de to frontene. Da kan det komme både jevnt regn og byger i samme
        system. På et værkart er okklusjonen den lilla linjen med både halvsirkler og trekanter.
      </p>
      <Callout title="Til eksamen">
        <p>
          Si alltid to ting: hvilket stadium syklonen er i, og hvilken luftmasse observatøren står
          i. «Lavtrykk vest for Stad» er ikke et svar. «Okkludert lavtrykk, vi står i kald luft bak
          kaldfronten» er et svar.
        </p>
      </Callout>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Et norsk løp: fra Island til kysten
      </h2>
      <p>
        De fleste lavtrykk som treffer Norge, fødes i den barokline sonen sørvest for Island, der
        Golfstrømmens varme møter polarluft. Polarjeten styrer banen. På 24–36 timer kan et L flytte
        seg fra sør for Island til Vestlandet eller videre mot Nordland — omtrent 1000 km i døgnet
        når styrestrømmen er vestlig.
      </p>
      <p>
        Vestlandet får da ofte den varme sektoren først: milde, våte sørvesten. Østlandet kan ligge
        i le bak Langfjella og få mindre nedbør, eller det kan ligge i kald luft foran en okklusjon
        som kommer inn sørfra. Samme syklon, to vær. Forskjellen er hvor frontene står, og hvor
        fjellet tvinger lufta opp.
      </p>
      <p>
        Når du skal flytte systemet 24 timer fram, er det banen til L-et og frontene du flytter —
        ikke «været over din kommune». Det sitter i{" "}
        <Link to="/tema/vaerkart" className="text-primary underline-offset-2 hover:underline">
          værkart
        </Link>
        .
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Sjøbris og landbris</h2>
      <p>
        Om dagen varmes land fortere enn hav. Luften over land blir lettere og stiger. Da synker
        trykket svakt inne over land. Luft fra sjøen strømmer inn nede: sjøbris. Returstrømmen går
        tilbake mot havet i høyden. Om natten speilvendes kretsløpet. Landbrisen er svakere fordi
        temperaturforskjellen land–hav er mindre om natten enn om ettermiddagen (NOAA, u.å.; Store
        norske leksikon, u.å.-b).
      </p>
      <p>
        Coriolis rekker ikke å spinne en sjøbris over en norsk fjord. Du får et sluttet kretsløp,
        ikke et lavtrykk med fronter. Det er derfor «sjøbris er et lavtrykk» er en fristende, men
        gal eksamenssetning.
      </p>
      <SeaBreezeLandBreezeDiagram />
      <OrdBoks
        ord="Sjøbris"
        barn="Pålandsvind om dagen, drevet av at land varmes fortere enn hav. Landbris er nattens, svakere motsats."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Dalvind og fjellvind</h2>
      <p>
        Samme motor, annen geometri. Om dagen varmes dalsidene. Luften stiger langs fjellet og
        trekkes opp dalen: dalvind. Om natten avkjøles sidene. Kald, tett luft renner ned: fjellvind.
        I en dyp vestlandsdal kan nattens drenasje lage inversjon i bunnen — kald luft ligger under
        mildere luft, og røyken blir liggende.
      </p>
      <ValleyWindDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Føn: hvor den ligger, ikke hele adiabaten
      </h2>
      <p>
        Føn er varm, tørr vind på lesiden. Luften mister vannet som orografisk nedbør på losiden.
        Den tørre luften synker og varmes på lesiden (Store norske leksikon, u.å.-c; Store norske
        leksikon, u.å.-d). Vestavind mot Vestlandet gir derfor regn på lo og føn øst for Langfjella
        — ikke omvendt.
      </p>
      <p>
        Selve tallene i adiabaten, og hvorfor den tørre synkingen er brattere enn den fuktige
        stigningen, eier{" "}
        <Link
          to="/tema/hoytrykk-lavtrykk"
          className="text-primary underline-offset-2 hover:underline"
        >
          høytrykk og lavtrykk
        </Link>
        . Her er poenget skala og sted: føn er et lokalt svar på en regional strøm over et fjell.
      </p>
      <FoehnAdiabaticDiagram />

      <Callout title="Vanlige misforståelser">
        <p>Sjøbris er ikke en polarfrontsyklon i miniatyr. Den spinner nesten ikke.</p>
        <p>Føn ligger på lesiden. Losiden får regnet.</p>
        <p>
          Et lavtrykk «over Norge» er sjelden ferdig utvokst der. De fleste er født over havet og
          kommer inn med jetstrømmen.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Polarfront" def="Skillet mellom kald polarluft og mildere luft sør for den." />
        <Term
          name="Varm sektor"
          def="Luftmassen mellom varmfront og kaldfront. Mild, fuktig, ofte sørvest."
        />
        <Term
          name="Okklusjon"
          def="Kaldfronten tar igjen varmfronten. Den varme lufta løftes fra bakken."
        />
        <Term name="Sjøbris" def="Pålandsvind om dagen. Land varmes fortere enn hav." />
        <Term name="Dalvind" def="Opp-dal om dagen. Fjellvind er nattens kaldluftsrenning." />
        <Term name="Føn" def="Varm, tørr lesidevind. Vannet falt som regn på lo. Varmen ble igjen." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Du står i varm sektor på Vestlandet. Hva er det mest sannsynlige været?",
            options: [
              "Kald nordavind og byger.",
              "Mild sørvest, fuktig luft, ofte jevn overskyet — regnet fra varmfronten har gjerne sluttet.",
              "Tørr føn og skyfritt, fordi du er på losiden.",
              "Okklusjon og snø, uansett årstid.",
            ],
            answer: 1,
            explain:
              "Varm sektor er den milde luftmassen mellom frontene. Fønen kommer først når den samme lufta har krysset fjellet.",
          },
          {
            prompt: "Hvorfor er landbris vanligvis svakere enn sjøbris?",
            options: [
              "Fordi coriolis slår av om natten.",
              "Fordi temperaturforskjellen land–hav er mindre om natten enn om ettermiddagen.",
              "Fordi havet forsvinner om natten.",
              "Fordi isobarer bare tegnes om dagen.",
            ],
            answer: 1,
            explain:
              "Drivkraften er temperaturkontrasten. Den er størst når landet har tatt imot sol hele dagen.",
          },
          {
            prompt: "Hva skiller en polarfrontsyklon fra en sjøbris?",
            options: [
              "Ingenting, begge er lavtrykk med fronter.",
              "Skala og coriolis: syklonen er hundrevis av kilometer og roterer. Sjøbrisen er lokal og roterer knapt.",
              "Sjøbris finnes bare i tropene.",
              "Polarfrontsyklonen har ikke fronter.",
            ],
            answer: 1,
            explain: "Samme trykklogikk. Ulik skala. Ulik rotasjon.",
          },
          {
            prompt: "Vestavind mot Vestlandet. Hvor ligger fønen?",
            options: [
              "På losiden, altså Vestlandet.",
              "På lesiden, øst for Langfjella.",
              "Bare over Svalbard.",
              "Der isobarene står tettest, uansett fjell.",
            ],
            answer: 1,
            explain: "Lo får orografisk nedbør. Le får den tørre, varme luften.",
          },
          {
            prompt:
              "Et lavtrykk ligger sørvest for Island mandag. Jetstrømmen er vestlig. Hva er det mest holdbare 24-timersbildet for Norge?",
            options: [
              "Systemet står stille. Været over Bergen i går er været i morgen.",
              "Hele systemet — L og fronter — forskyves østover mot kysten. Vestlandet kan møte varm sektor eller kaldfront.",
              "Lavtrykket hopper til Middelhavet fordi coriolis peker dit.",
              "Det blir føn på Vestlandet og regn på Østlandet.",
            ],
            answer: 1,
            explain:
              "Utvikling er adveksjon av hele systemet med styrestrømmen, typisk rundt 1000 km i døgnet i vestavindsbeltet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
