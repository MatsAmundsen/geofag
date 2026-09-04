import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  PolarFrontCycloneSteps,
  ValleyWindDiagram,
  SeaBreezeLandBreezeDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/lokale-vaersystemer")!;

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
      lead="Globalt: Hadley og jet. Regionalt: polarfrontsyklonen over Atlanteren. Lokalt: sjøbris, dalvind og føn. Samme fysikk i tre målestokker."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      prev={{ to: "/tema/vaerkart", label: "Forrige: Værkart" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
      kilder={KILDER_G2.lokale}
    >
      <Callout title="Kompetansemål">
        <p>Gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og lokal skala.</p>
      </Callout>
      <h2 className="font-display text-2xl font-medium tracking-tight">Tre skalaer</h2>
      <p>
        Global skala er cellene og jetstrømmen. Regional skala er polarfrontsyklonen. Lokal skala er
        kretsløp drevet av at land, hav og fjellside varmes ulikt. Coriolis betyr lite i en sjøbris
        over ti kilometer.
      </p>
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Polarfrontsyklon, steg for steg</h2>
      <p>
        En bølge på polarfronten blir til et lavtrykk. Mellom varmfront og kaldfront ligger varm sektor.
        Kaldfronten tar igjen varmfronten: okklusjon. Til slutt fylles lavtrykket.
      </p>
      <PolarFrontCycloneSteps />
      <p>
        Lesingen sitter i{" "}
        <Link to="/tema/vaerkart" className="text-primary underline-offset-2 hover:underline">værkart</Link>. Fødselen sitter her.
      </p>
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Sjøbris og landbris</h2>
      <p>
        Om dagen varmes land fortere enn hav. Luften over land stiger. Luft fra sjøen strømmer inn.
        Returstrømmen går tilbake i høyden. Om natten speilvendes kretsløpet. Landbrisen er svakere.
      </p>
      <SeaBreezeLandBreezeDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Dalvind og fjellvind</h2>
      <p>Om dagen varmes dalsidene: dalvind opp dalen. Om natten renner kald luft ned: fjellvind.</p>
      <ValleyWindDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Føn</h2>
      <p>
        Føn er varm, tørr vind på lesiden. Luften mister vannet som regn på losiden, men beholder
        varmen. Full gjennomgang ligger under{" "}
        <Link to="/tema/hoytrykk-lavtrykk" className="text-primary underline-offset-2 hover:underline">høytrykk og lavtrykk</Link>.
      </p>
      <OrdBoks ord="Føn" barn="Varm, tørr lesidevind. Vannet forlot luften som regn. Varmen ble igjen." />
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Polarfront" def="Skillet mellom kald polarluft og mildere luft sør for den." />
        <Term name="Sjøbris" def="Pålandsvind om dagen, drevet av at land varmes fortere enn hav." />
        <Term name="Dalvind" def="Opp-dal om dagen når sidene varmes. Fjellvind er nattens motsats." />
        <Term name="Føn" def="Varm, tørr lesidevind etter at luften har mistet vann på lo." />
      </TermGrid>
      <Quiz
        questions={[
          {
            prompt: "Hvorfor er landbris vanligvis svakere enn sjøbris?",
            options: [
              "Fordi coriolis slår av om natten.",
              "Fordi temperaturforskjellen land–hav er mindre om natten.",
              "Fordi havet forsvinner om natten.",
              "Fordi isobarer bare tegnes om dagen.",
            ],
            answer: 1,
            explain: "Drivkraften er temperaturkontrasten. Den er størst om ettermiddagen.",
          },
          {
            prompt: "Hva skiller en polarfrontsyklon fra en sjøbris?",
            options: [
              "Ingenting, begge er lavtrykk.",
              "Skala og coriolis: syklonen er hundrevis av kilometer og roterer. Sjøbrisen er lokal og roterer knapt.",
              "Sjøbris finnes bare i tropene.",
              "Polarfrontsyklonen har ikke fronter.",
            ],
            answer: 1,
            explain: "Samme trykklogikk, ulik skala.",
          },
          {
            prompt: "Vestavind mot Vestlandet. Hvor ligger fønen?",
            options: [
              "På losiden, altså Vestlandet.",
              "På lesiden, øst for Langfjella.",
              "Bare over Svalbard.",
              "I stratosfæren.",
            ],
            answer: 1,
            explain: "Lo får regnet. Le får den tørre, varme luften.",
          },
        ]}
      />
    </TopicLayout>
  );
}
