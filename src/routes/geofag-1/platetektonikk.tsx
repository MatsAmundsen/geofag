import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  PlatesMapDiagram,
  SpreadingDiagram,
  SubductionDiagram,
} from "@/components/diagrams/plates";
import { GeoMap } from "@/components/geo-map";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("platetektonikk")!;

export const Route = createFileRoute("/geofag-1/platetektonikk")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/platetektonikk",
    }),
  component: PlatetektonikkPage,
});

function PlatetektonikkPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jordas ytre skall er delt i plater. Hver plate er litosfære: skorpe pluss den øvre, stive delen av mantelen. Platene glir på astenosfæren, en mykere sone i øvre mantel. Der platene går fra hverandre, møtes eller gnir sidelengs, endres både skorpa og overflaten. Ny havbunn, fjellkjeder, vulkaner og jordskjelv er konsekvenser av den bevegelsen."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/jordsystemene",
        label: "Forrige: Jordsystemene",
      }}
      next={{
        to: "/geofag-1/vulkaner-og-jordskjelv",
        label: "Neste: Vulkaner og jordskjelv",
      }}
      kilder={KILDER.platetektonikk}
    >
      <OrdBoks ord="Litosfære" barn="Skorpe pluss øvre stive mantel, delt i plater." />
      <OrdBoks ord="Astenosfære" barn="Mykere sone platene glir på." />

      <p>
        Platene beveger seg fordi mantelen har langsomme strømmer. De kalles konveksjon og drives av
        varme fra jordas indre. Den viktigste trekkraften ved konvergens er likevel at kald, tett
        havbunn synker: slab pull. Farten er noen centimeter i året. Den midtatlantiske ryggen sprer
        i gjennomsnitt om lag 2,5 cm per år. Øst-Stillehavsryggen over 15 cm per år (NOAA, u.å.). GPS
        viser at dagens retning og fart stemmer med mønsteret over millioner av år.
      </p>
      <OrdBoks ord="Konveksjon" barn="Langsomme mantelstrømmer drevet av indre varme." />
      <OrdBoks
        ord="Slab pull"
        barn="Kald, tett havbunn synker og trekker platen med seg. Ofte den viktigste trekkraften ved konvergens."
      />

      <p>
        Kontinental skorpe er vanligvis 30–50 km tykk og har lav tetthet. Havbunnsskorpe er 5–7 km
        tykk, tettere, og ingen er eldre enn 175 millioner år. Jorda har ikke endret størrelse
        vesentlig. Ny skorpe ved ryggene krever at skorpe ødelegges ved subduksjon.
      </p>
      <OrdBoks ord="Subduksjon" barn="Tettere havbunn synker under en annen plate." />

      <PlatesMapDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fire typer plategrenser
      </h2>
      <p>
        Divergerende grense: platene glir fra hverandre. Magma stiger, avkjøles og blir basaltisk
        havbunn. Island ligger på Den midtatlantiske ryggen: sprekker, lava og rifting. Jan Mayen
        ligger i samme ryggsystem.
      </p>
      <OrdBoks
        ord="Divergerende grense"
        barn="Platene glir fra hverandre. Magma stiger og blir ny havbunn. Island og Jan Mayen sitter her."
      />
      <SpreadingDiagram />
      <PhotoFigure
        src="/images/fig-spredring.jpg"
        alt="Sprekk i basalt med lava og damp, platene glir fra hverandre"
        heading="Divergerende grense, sett i landskapet"
        caption="Platene glir fra hverandre. Magma stiger i sprekken og blir ny havbunn. Island og Jan Mayen sitter på samme type grense."
        marks={[{ x: 28, y: 42, n: "1", text: "Ny skorpe i sprekken", tone: "warm" }]}
        points={[{ n: "1", label: "Sprekking + magma. Skorpe lages, den ødelegges ikke her." }]}
      />
      <p>
        Konvergerende grense, hav mot kontinent: havbunnen er tettere og synker inn under
        kontinentet. Det kalles subduksjon. Trykk og temperatur øker. Berg kan smelte, og magma
        stiger. Vulkaner og dype jordskjelv. Andes er typeeksempelet.
      </p>
      <SubductionDiagram />
      <PhotoFigure
        src="/images/fig-subduksjon-vulkan.jpg"
        alt="Stratovulkan i utbrudd over kyst og dyp havrenne"
        heading="Hav mot kontinent"
        caption="Havbunnen er tettere og synker. Magma stiger. Vulkanbuen sitter over den synkende platen, ikke i selve rennen."
        marks={[
          { x: 8, y: 62, n: "1", text: "Renna · synk", tone: "cold" },
          { x: 48, y: 10, n: "2", text: "Vulkanbue", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Subduksjon: tettere havbunn under kontinentet." },
          { n: "2", label: "Smelting og stigning. Dype skjelv i den synkende platen." },
        ]}
      />
      <p>
        Konvergerende grense, kontinent mot kontinent: ingen av platene vil synke. Skorpa tykkes til
        mer enn 70 km, som i Himalaya der India møter Asia. Fjell, foldning og skyvedekker.
        Kaledonidene er Norges fossile versjon.
      </p>
      <p>
        Transformgrense: platene glir sidelengs. Det lages ikke ny skorpe, og det ødelegges heller
        ikke skorpe. San Andreas beveger seg om lag 5 cm per år (USGS, u.å.). På havbunn forskyver
        transformene ryggen i sikksakk. Jordskjelv, lite vulkanisme.
      </p>
      <OrdBoks
        ord="Transformgrense"
        barn="Platene glir sidelengs. Ingen ny skorpe, ingen subduksjon. Jordskjelv, lite vulkanisme. San Andreas er typeeksempelet."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva det har gjort med Norge
      </h2>
      <p>
        Norge ligger inne på den eurasiske platen, ikke på en aktiv plategrense. Grensen er
        midthavsryggen vest for oss. Norge er likevel blant de mest skjelvaktive områdene i
        Nord-Europa. Bare et fåtall skjelv har gitt bygningsskade (NORSAR, u.å.). Det er
        intraplate-skjelv: gamle forkastninger som reaktiveres, landheving etter istiden, og
        spredning i Norskehavet som setter platen under strekk.
      </p>
      <p>
        Oslofeltet er en død rift, en paleorift. For om lag 310 millioner år siden sprakk skorpa opp
        fra Skagerrak til Østerdalen (NGU, u.å.). I perm: riftdal, strekk, store forkastninger og
        vulkaner. I dag ser vi graben, lava og dypbergart, og forkastningskanter mot grunnfjellet.
        Det er konsekvens av gammel indre bevegelse, ikke en aktiv plategrense.
      </p>
      <OrdBoks
        ord="Rift"
        barn="Skorpa strekkes og sprekker. Oslofeltet er en død rift fra perm — ikke en aktiv plategrense i dag."
      />
      <p>
        Kaledonidene ble til for 400–500 millioner år siden, da landområder i dagens Europa
        kolliderte med Amerika og Grønland (NGU, u.å.). Store bergflak ble skjøvet som skyvedekker.
        Fjellene du går i, er erodert rot. Is og elv har skåret i kaledonsk struktur. De har ikke
        bygd den.
      </p>
      <p>
        Jan Mayen ligger på ryggsystemet i Norskehavet. Ny havbunn, jordskjelv langs ryggen,
        vulkaner. Beerenberg er Norges eneste aktive vulkan over havet, 2277 meter. Siste utbrudd i
        1985 (Norsk Polarinstitutt, u.å.).
      </p>
      <GeoMap
        center={[65, -3]}
        zoom={4}
        markers={[
          { lat: 64.2558, lng: -21.131, label: "Þingvellir – synlig rift i Den midtatlantiske ryggen" },
          { lat: 71.0, lng: -8.5, label: "Jan Mayen – vulkanøy på ryggsystemet (Beerenberg)" },
          { lat: 60.39, lng: 5.32, label: "Bergen – Norge, på den eurasiske platen" },
        ]}
        heading="Ryggsystemet: Island, Jan Mayen og Norge"
        caption="Den midtatlantiske ryggen strekker seg forbi Island og Jan Mayen. Norge ligger inne på den eurasiske platen, ikke på selve plategrensen."
      />
      <p>
        Etter istiden reiste litosfæren seg. Det kalles isostasi. Marine avsetninger som ble lagt i
        fjord, ligger nå over havnivå. Marin grense er 0–220 m (NGU, u.å.).
      </p>
      <OrdBoks
        ord="Isostasi"
        barn="Litosfæren flyter på mantelen. Når innlandsisen forsvinner, reiser landet seg. Marin leire kan da ligge på tørt land."
      />

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="litosfære" def="skorpe + øvre stive mantel, delt i plater" />
        <Term name="astenosfære" def="mykere sone platene glir på" />
        <Term name="konveksjon" def="langsomme mantelstrømmer drevet av indre varme" />
        <Term name="subduksjon" def="tettere havbunn synker under en annen plate" />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er litosfæren?",
            options: [
              "Bare jordskorpa.",
              "Skorpe pluss den øvre, stive delen av mantelen — det platene er laget av.",
              "Den flytende ytre kjernen.",
              "Bare havbunn.",
            ],
            answer: 1,
            explain: "Platene glir på astenosfæren, en mykere sone under.",
          },
          {
            prompt: "Hvorfor må det være subduksjon hvis det lages ny havbunn ved ryggene?",
            options: [
              "Fordi jorda vokser.",
              "Fordi jorda ikke har endret størrelse vesentlig. Ny skorpe krever at skorpe ødelegges.",
              "Fordi magma bare finnes ved ryggene.",
              "Fordi kontinentene synker.",
            ],
            answer: 1,
            explain:
              "Havbunn er tettere og synker. Kontinent mot kontinent gir fjell, ikke subduksjon.",
          },
          {
            prompt: "Hvor ligger Norge i platetektonikken i dag?",
            options: [
              "På en aktiv subduksjonssone.",
              "Inne på den eurasiske platen. Grensen er midthavsryggen vest for oss.",
              "På Den midtatlantiske ryggen, som Oslo.",
              "På Stillehavsplaten.",
            ],
            answer: 1,
            explain: "Jan Mayen ligger på ryggsystemet. Fastlands-Norge er intraplate.",
          },
        ]}
      />
    </TopicLayout>
  );
}
