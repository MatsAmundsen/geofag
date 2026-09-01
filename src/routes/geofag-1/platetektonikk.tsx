import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  BoundaryOverviewDiagram,
  CollisionDiagram,
  ContinentalRiftDiagram,
  ConvectionDiagram,
  DecompressionMeltingDiagram,
  EarthLayersDiagram,
  OceanOceanSubductionDiagram,
  PlatesMapDiagram,
  SolidusDiagram,
  SpreadingDiagram,
  SubductionDiagram,
  TransformDiagram,
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
      lead="Jordas ytre skall er delt i plater. Hver plate er litosfære: skorpe pluss den øvre, stive delen av mantelen. Platene glir på astenosfæren. Der de går fra hverandre, møtes eller gnir sidelengs, endres både skorpa og overflaten. Ny havbunn, fjellkjeder, vulkaner og jordskjelv er konsekvenser av den bevegelsen — og av at mantelberg kan smelte når trykket faller."
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
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Jordas lag og hva en plate egentlig er
      </h2>
      <p>
        En plate er ikke «et stykke skorpe». Den er litosfære: skorpe pluss den øvre, kalde og
        stive mantelen under. Under litosfæren ligger astenosfæren. Den er fast silikatberg, ikke
        et magmaha, men så varm at den flyter seigt over geologisk tid. Platene glir der.
      </p>
      <OrdBoks ord="Litosfære" barn="Skorpe pluss øvre stive mantel. Det platene er laget av." />
      <OrdBoks
        ord="Astenosfære"
        barn="Mykere sone i øvre mantel. Fast berg som deformeres seigt. Platene glir her."
      />
      <EarthLayersDiagram />
      <p>
        Kontinental skorpe er vanligvis 30–50 km tykk og har lav tetthet (granittisk).
        Havbunnsskorpe er 5–7 km tykk, basaltisk og tettere. Ingen havbunn er eldre enn om lag 175
        millioner år: den rekker å avkjøles, bli tyngre og synke. Jorda har ikke endret størrelse
        vesentlig. Ny skorpe ved ryggene krever at skorpe ødelegges ved subduksjon.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Manteldynamikk: varme, strøm og hva som trekker platene
      </h2>
      <p>
        Mantelen har langsomme strømmer drevet av varme fra kjernen og radioaktivitet. Varmt
        materiale har lavere tetthet og stiger. Kaldt synker. Det er konveksjon, men platene er
        ikke bare «flåter på et samlebånd». Den viktigste trekkraften ved konvergens er at kald,
        tett havbunn synker og tar resten av platen med seg: slab pull. Ved ryggen ligger
        litosfæren høyt. Tyngdekraften får den til å gli utover: ryggtrykk (ridge push).
      </p>
      <OrdBoks ord="Konveksjon" barn="Langsomme mantelstrømmer drevet av indre varme." />
      <OrdBoks
        ord="Slab pull"
        barn="Kald, tett havbunn synker og trekker platen med seg. Ofte den største kraften ved konvergens."
      />
      <OrdBoks
        ord="Ryggtrykk"
        barn="Litosfæren ved ryggen ligger høyt. Den sklir utover under egen vekt."
      />
      <ConvectionDiagram />
      <p>
        Farten er noen centimeter i året. Den midtatlantiske ryggen sprer i gjennomsnitt om lag
        2,5 cm per år. Øst-Stillehavsryggen over 15 cm per år (NOAA, u.å.). GPS viser at dagens
        retning og fart stemmer med mønsteret over millioner av år.
      </p>
      <PlatesMapDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hvorfor mantelberg smelter når trykket faller
      </h2>
      <p>
        Nesten all magma starter som delvis smelte av peridotitt i øvre mantel — ikke som et
        ferdig «lavahav» under skorpen. Berg smelter når temperaturen kommer over solidus,
        smeltepunktet. Solidus stiger med trykk: jo dypere, desto høyere T trengs. En mantelpakke
        som ligger i ro under tykk litosfære, er vanligvis under solidus. Den er varm, men fast.
      </p>
      <p>
        Når skorpen og litosfæren tynnes — ved rift eller midthavsrygg — får mantelen under
        lov til å stige. To ting skjer samtidig. Overliggende vekt minker, så det litostatiske
        trykket faller. Og pakken følger nesten en adiabat: temperaturen synker bare svakt mens
        den stiger. Solidus faller brattere med minkende trykk enn adiabaten gjør. Banen krysser
        derfor solidus. Bergarten smelter delvis uten at noe har varmet den opp.
      </p>
      <OrdBoks
        ord="Solidus"
        barn="Temperaturen der et berg begynner å smelte. Stiger med trykk."
      />
      <OrdBoks
        ord="Dekompresjonssmelting"
        barn="Mantel stiger, trykket faller, og berg krysser solidus. Smelte uten ekstra varme."
      />
      <SolidusDiagram />
      <DecompressionMeltingDiagram />
      <p>
        Det er derfor tykkelsesendring i skorpen er avgjørende. Tykk kontinentalskorpe holder
        mantelen nede på høyt trykk. Tynn skorpe — spredt havbunn eller en riftdal — lar mantelen
        komme grunt nok. Typisk smelter bare en andel av bergarten (ofte rundt 10–20 % ved
        rygger). Smelten er basaltisk og lettere enn resten, så den stiger.
      </p>
      <p>
        To andre veier til magma finnes, og de skal ikke blandes sammen. Ved subduksjon er det
        vann fra den synkende platen som senker solidus i mantelkilen over: flukssmelting. Ved
        hotspot er det ekstra varme som løfter geotermien over solidus. Samme mantelberg, tre
        ulike grunner til at den krysser smeltepunktet.
      </p>
      <OrdBoks
        ord="Flukssmelting"
        barn="Vann fra en synkende plate senker smeltepunktet i mantelen over. Typisk ved subduksjon."
      />

      <Quiz
        questions={[
          {
            prompt: "Hvorfor smelter mantelberg når litosfæren tynnes, uten at noe varmes opp?",
            options: [
              "Fordi tynn skorpe er varmere enn tykk skorpe.",
              "Fordi trykket faller når overliggende vekt minker. Solidus synker, og adiabaten krysser den.",
              "Fordi astenosfæren allerede er flytende magma.",
              "Fordi platene gnir og lager friksjonsvarme nok til full smelte.",
            ],
            answer: 1,
            explain:
              "Dekompresjonssmelting. Vann ved subduksjon og ekstra varme ved hotspot er andre mekanismer.",
          },
          {
            prompt: "Hva er slab pull?",
            options: [
              "At ryggen skyver platene fra hverandre med magma.",
              "At kald, tett havbunn synker og trekker platen med seg.",
              "At kontinentene flyter og støter bort havbunn.",
              "At jordskjelv dytter platene.",
            ],
            answer: 1,
            explain: "Slab pull er vanligvis den største kraften der havbunn synker.",
          },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Tre hovedtyper plategrenser
      </h2>
      <p>
        Alt som skjer ved en plategrense, følger av én ting: hvordan to plater beveger seg
        relativt til hverandre. Fra hverandre, mot hverandre, eller sidelengs. Om det er havbunn
        eller kontinent som møtes, styrer landform, skjelvdybde og om det blir vulkaner.
      </p>
      <BoundaryOverviewDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Divergerende: havbunnsspredning
      </h2>
      <p>
        Platene glir fra hverandre. Litosfæren er tynnest i aksen. Astenosfære stiger, trykket
        faller, dekompresjonssmelting leverer basalt. Ny havbunn avkjøles og blir eldre og tykkere
        vekk fra ryggen. Island ligger på Den midtatlantiske ryggen: sprekker, lava og rifting.
        Jan Mayen sitter i samme ryggsystem.
      </p>
      <OrdBoks
        ord="Divergerende grense"
        barn="Platene glir fra hverandre. Magma stiger og blir ny skorpe. Island og Jan Mayen sitter her."
      />
      <SpreadingDiagram />
      <PhotoFigure
        src="/images/fig-spredring.jpg"
        alt="Sprekk i basalt med lava og damp, platene glir fra hverandre"
        heading="Divergerende grense, sett i landskapet"
        caption="Platene glir fra hverandre. Magma stiger i sprekken og blir ny havbunn. Island og Jan Mayen sitter på samme type grense."
        marks={[{ x: 28, y: 42, n: "1", text: "Ny skorpe i sprekken", tone: "warm" }]}
        points={[{ n: "1", label: "Sprekking + dekompresjonssmelting. Skorpe lages her." }]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Divergerende: kontinental rift
      </h2>
      <p>
        Samme bevegelse, annen start. Kontinentet strekkes. Skorpen tynnes og midten synker som
        en graben. Mantelen under får lov til å stige, trykket faller, og basaltiske vulkaner kan
        komme. Hvis riften fortsetter, kan kontinentet sprekke helt og bli til et nytt hav.
        Atlanteren startet slik da Pangea revnet. Øst-Afrika er en aktiv rift i dag.
      </p>
      <ContinentalRiftDiagram />
      <p>
        Oslofeltet er en død rift — en paleorift. For om lag 310 millioner år siden sprakk skorpa
        opp fra Skagerrak til Østerdalen (NGU, u.å.). I perm: riftdal, strekk, store
        forkastninger og vulkaner. I dag ser vi graben, lava og dypbergart. Det er konsekvens av
        gammel indre bevegelse, ikke en aktiv plategrense.
      </p>
      <OrdBoks
        ord="Rift"
        barn="Skorpa strekkes og tynnes. Mantel stiger. Oslofeltet er en død rift fra perm."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Konvergerende: hav mot kontinent
      </h2>
      <p>
        Havbunnen er tettere og synker inn under kontinentet. Det kalles subduksjon. I rennen
        forsvinner havbunnen. Vann og andre flyktige stoffer presses ut av den synkende platen og
        senker solidus i mantelkilen over platen. Det er flukssmelting, ikke dekompresjon.
        Magmaen stiger til en vulkanbue et stykke inne på kontinentet. Andes er typeeksempelet.
        Dype jordskjelv følger den synkende platen nedover.
      </p>
      <OrdBoks ord="Subduksjon" barn="Tettere havbunn synker under en annen plate." />
      <SubductionDiagram />
      <PhotoFigure
        src="/images/fig-subduksjon-vulkan.jpg"
        alt="Stratovulkan i utbrudd over kyst og dyp havrenne"
        heading="Hav mot kontinent"
        caption="Havbunnen er tettere og synker. Vann senker smeltepunktet i mantelen over. Vulkanbuen sitter over den synkende platen, ikke i selve rennen."
        marks={[
          { x: 8, y: 62, n: "1", text: "Renna · synk", tone: "cold" },
          { x: 48, y: 10, n: "2", text: "Vulkanbue", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Subduksjon: tettere havbunn under kontinentet." },
          { n: "2", label: "Flukssmelting og stigning. Dype skjelv i den synkende platen." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Konvergerende: hav mot hav
      </h2>
      <p>
        To havbunnsplater kan også møtes. Den eldre er kaldere og dermed tettere, og det er den
        som synker. Over den synkende platen vokser en øybue av vulkanøyer. Japan, Marianene og
        Aleutene er slike buer. Mekanismen er den samme som ved Andes — flukssmelting over en slab
        — men buen står i havet, ikke på et kontinent. Havrennen kan bli svært dyp.
      </p>
      <OceanOceanSubductionDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Konvergerende: kontinent mot kontinent
      </h2>
      <p>
        Ingen av platene vil synke. Kontinental skorpe er for lett. I stedet tykkes skorpa til mer
        enn 70 km, som i Himalaya der India møter Asia. Fjell, foldning og skyvedekker. Lite
        magma sammenlignet med subduksjon, fordi det ikke kommer en vannrik slab ned i mantelen
        under fjellkjeden. Kaledonidene er Norges fossile versjon: kollisjon for 400–500 millioner
        år siden, da landområder i dagens Europa møtte Amerika og Grønland (NGU, u.å.).
      </p>
      <CollisionDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Transformgrense</h2>
      <p>
        Platene glir sidelengs. Det lages ikke ny skorpe, og det ødelegges heller ikke skorpe.
        San Andreas beveger seg om lag 5 cm per år (USGS, u.å.). På havbunn forskyver transformene
        ryggen i sikksakk, slik at spredningsaksen ikke er én lang linje. Jordskjelv, lite
        vulkanisme — det er ingen dekompresjon og ingen vannrik slab.
      </p>
      <OrdBoks
        ord="Transformgrense"
        barn="Platene glir sidelengs. Ingen ny skorpe, ingen subduksjon. Jordskjelv, lite vulkanisme."
      />
      <TransformDiagram />

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
        Kaledonidene ble til i den kontinent–kontinent-kollisjonen. Store bergflak ble skjøvet som
        skyvedekker. Fjellene du går i, er erodert rot. Is og elv har skåret i kaledonsk
        struktur. De har ikke bygd den.
      </p>
      <p>
        Jan Mayen ligger på ryggsystemet i Norskehavet. Ny havbunn, jordskjelv langs ryggen,
        vulkaner. Beerenberg er Norges eneste aktive vulkan over havet, 2277 meter. Siste utbrudd
        i 1985 (Norsk Polarinstitutt, u.å.).
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
        Etter istiden reiste litosfæren seg. Det kalles isostasi. Marine avsetninger som ble lagt
        i fjord, ligger nå over havnivå. Marin grense er 0–220 m (NGU, u.å.).
      </p>
      <OrdBoks
        ord="Isostasi"
        barn="Litosfæren flyter på mantelen. Når innlandsisen forsvinner, reiser landet seg. Marin leire kan da ligge på tørt land."
      />

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="litosfære" def="skorpe + øvre stive mantel, delt i plater" />
        <Term name="astenosfære" def="mykere, fast sone platene glir på — ikke et magmaha" />
        <Term name="konveksjon" def="langsomme mantelstrømmer drevet av indre varme" />
        <Term name="slab pull" def="kald, tett havbunn synker og trekker platen" />
        <Term
          name="dekompresjonssmelting"
          def="mantel stiger, trykket faller, berg krysser solidus"
        />
        <Term name="flukssmelting" def="vann fra slab senker solidus i mantelkilen over" />
        <Term name="subduksjon" def="tettere havbunn synker under en annen plate" />
        <Term name="transformgrense" def="platene glir sidelengs; skorpe verken lages eller ødelegges" />
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
            explain: "Platene glir på astenosfæren, en mykere men fast sone under.",
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
            prompt: "Hvilken smeltemekanisme hører til midthavsrygg og kontinental rift?",
            options: [
              "Flukssmelting fra vann i en slab.",
              "Dekompresjonssmelting: tynn skorpe, stigende mantel, fallende trykk.",
              "Fullstendig smelting av astenosfæren.",
              "Friksjon langs transformgrensen.",
            ],
            answer: 1,
            explain: "Subduksjon bruker fluks. Hotspot bruker ekstra varme. Rygg og rift bruker trykkfall.",
          },
          {
            prompt: "Hva skjer når to kontinenter møtes?",
            options: [
              "Det ene synker som ved Andes.",
              "Ingen av dem vil synke. Skorpa tykkes, og det blir fjellkjede med dyp rot.",
              "Det blir alltid en øybue.",
              "Det lages ny havbunn mellom dem.",
            ],
            answer: 1,
            explain: "Himalaya nå, Kaledonidene i Norges fortid.",
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
