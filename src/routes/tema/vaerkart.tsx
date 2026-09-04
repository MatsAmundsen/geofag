import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { SynopticMapDiagram, TwentyFourHourDiagram } from "@/components/diagrams/weather";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/vaerkart")!;

export const Route = createFileRoute("/tema/vaerkart")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vaerkart",
    }),
  component: VaerkartPage,
});

function VaerkartPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Værkart og værutvikling"
      lead="Kompetansemålet er konkret: tolke ulike værkart og værutvikling. Et kart er et øyeblikksbilde av trykk, fronter og vind. Utvikling er å flytte det bildet 12–24 timer fram med vestavinden, og si hvor nedbøren da ligger."
      banner="/images/fig-jet.jpg"
      bannerAlt="Tynn, rask skyelv høyt over havet mot jordas krumning"
      prev={{ to: "/tema/jetstrommer", label: "Forrige: Jetstrømmer" }}
      next={{ to: "/tema/lokale-vaersystemer", label: "Neste: Lokale værsystemer" }}
      kilder={KILDER_G2.vaerkart}
    >
      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og
          lokal skala, og tolke ulike værkart og værutvikling.
        </p>
      </Callout>
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva et synoptisk kart viser</h2>
      <p>
        Et synoptisk kart er et øyeblikksbilde nær bakken: lufttrykk, vind, fronter og ofte sky og
        nedbør. Tallene på isobarene er hPa. 1013 hPa er omtrent middel. Et lavtrykk er ikke «under
        1013» — det er lavere enn naboen.
      </p>
      <OrdBoks
        ord="Isobar"
        barn="Linje gjennom punkter med samme lufttrykk. Tette isobarer betyr sterk trykkgradient og sterk vind."
      />
      <p>
        På nordlig halvkule blåser vinden mot klokka inn mot lavtrykk og med klokka ut fra høytrykk.
        Nær bakken krysser vinden isobarene litt inn mot L, fordi friksjon bremser coriolis. Den
        innstrømmingen tvinger luft opp i lavtrykket.
      </p>
      <SynopticMapDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Fronter</h2>
      <p>
        En front er skillet mellom to luftmasser. Varmfront: varm luft klatrer over kald. Skydekket
        kommer først som cirrus, så fortetting og jevn nedbør over et bredt belte. Kaldfront: kald
        luft graver under varm. Stigningen er brattere, bygene kortere og hardere. Okklusjon:
        kaldfronten har tatt igjen varmfronten. Den varme sektoren løftes av bakken.
      </p>
      <OrdBoks ord="Varm sektor" barn="Den milde luften mellom varmfront og kaldfront i en ung polarfrontsyklon." />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">24 timer fram</h2>
      <p>
        Norske lavtrykk kommer som regel fra vest. Et lavtrykk vest for Stad i dag ligger ofte mot
        Nordland eller inn i Bottenviken i morgen. Frontene følger.
      </p>
      <TwentyFourHourDiagram />
      <p>
        Leserekkefølge: finn L og H. Finn tette isobarer. Finn frontene. Bestem luftmassen. Flytt
        systemet med vestavinden. Si hvor nedbørsbeltet er om 24 timer. Øv på ekte kart hos MET og yr.no.
      </p>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Isobar" def="Linje med samme lufttrykk. Tette linjer = sterk vind." />
        <Term name="Varmfront" def="Varm luft klatrer over kald. Bredt belte med jevn nedbør." />
        <Term name="Kaldfront" def="Kald luft graver under varm. Brattere, kortere byger." />
        <Term name="Okklusjon" def="Kaldfronten har tatt igjen varmfronten. Varm sektor løftes." />
      </TermGrid>
      <Quiz
        questions={[
          {
            prompt: "Isobarene ligger tett sør for et lavtrykk inn mot Vestlandet. Hva venter du?",
            options: [
              "Vindstille og tåke, fordi L alltid gir stille vær.",
              "Sterk vind. Tette isobarer er sterk trykkgradient.",
              "Bare høy temperatur, ikke vind.",
              "At høytrykket suger luften rett opp.",
            ],
            answer: 1,
            explain: "Trykkgradientkraften setter luften i gang. Avstand mellom isobarer er styrken.",
          },
          {
            prompt: "Du står foran en varmfront som nærmer seg fra vest. Hva kommer først?",
            options: [
              "Brå byger og så klarvær på fem minutter.",
              "Høye cirrus, så fortetting og jevn nedbør over flere timer.",
              "Tørr føn fra øst.",
              "At isobarene forsvinner.",
            ],
            answer: 1,
            explain: "Varm luft klatrer slakt. Skysekvensen er cirrus → altostratus → jevn nedbør.",
          },
          {
            prompt: "Et lavtrykk ligger vest for Stad i dag. Rimelig +24 t?",
            options: [
              "Lavtrykket står stille over Stad.",
              "Lavtrykket har typisk flyttet seg mot nordøst, og frontene med det.",
              "Lavtrykket går rett sør, fordi coriolis peker sørover.",
              "Hele kartet speilvendes.",
            ],
            answer: 1,
            explain: "Utvikling = adveksjon av systemet. Familiærlavtrykk driver med vestavinden.",
          },
        ]}
      />
      <p>
        Neste steg er kretsløpene som ikke synes på et atlanterhavskart. De sitter i{" "}
        <Link to="/tema/lokale-vaersystemer" className="text-primary underline-offset-2 hover:underline">
          lokale værsystemer
        </Link>
        .
      </p>
    </TopicLayout>
  );
}
