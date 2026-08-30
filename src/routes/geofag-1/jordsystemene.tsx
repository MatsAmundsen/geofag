import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { SpheresDiagram } from "@/components/diagrams/spheres";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordsystemene")!;

export const Route = createFileRoute("/geofag-1/jordsystemene")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordsystemene",
    }),
  component: JordsystemenePage,
});

function JordsystemenePage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jorda er fem delsystemer som utveksler masse og energi: geosfæren, hydrosfæren, atmosfæren, kryosfæren og biosfæren. De er ikke vanntette rom. Vann finnes i elver, i is og som porevann i fjellet. Poenget er å følge hvor masse og energi flytter seg."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1",
        label: "Tilbake til Geofag 1",
      }}
      next={{
        to: "/geofag-1/platetektonikk",
        label: "Neste: Platetektonikk",
      }}
      kilder={KILDER.jordsystemene}
    >
      <p>
        I geofag 1 er mottakerne geosfæren og hydrosfæren. Geosfæren er den faste jorda: berggrunn,
        løsmasser og jord. Hydrosfæren er her ferskvann: elver, innsjøer, grunnvann og porevann.
        Atmosfære, kryosfære og biosfære er med som drivere. De graver, løser og avsetter. Vær og
        havstrøm er ikke kjernen.
      </p>
      <OrdBoks ord="Geosfære" barn="Den faste jorda: berggrunn, løsmasser, jord." />
      <OrdBoks
        ord="Hydrosfære"
        barn="Her: elver, innsjøer, grunnvann og porevann. Havet hører med, men sporet i geofag 1 er ferskvann."
      />
      <p>
        Havet hører også til hydrosfæren. I geofag 1 følger du ferskvannssporet. Havstrømmer og AMOC
        ligger i geofag 2.
      </p>

      <p>
        En vekselvirkning er en endring i ett delsystem som utløser respons i ett eller flere andre.
        Spørsmålet er hvilken sfære som endres først, på hvilken tidsskala, og hvordan berg, jord,
        elv og grunnvann svarer.
      </p>
      <OrdBoks
        ord="Vekselvirkning"
        barn="Endring i ett delsystem som utløser respons i ett eller flere andre."
      />

      <p>
        Elva er hydrosfære som former geosfæren. I bratt fjell: blokk og grus, V-dal. På elveslette:
        sand og silt, meander. Munner elva i innsjø eller fjord, faller hastigheten, og det bygges
        delta. Geosfæren styrer elva tilbake, gjennom fall, bergart og løsmassetype.
      </p>
      <p>
        Grunnvann fyller porer i sand og grus og sprekker i fjell. Gode akviferer er ofte
        breelvdelta og eskere. Marin leire er tett. Den leder vann dårlig og kan gi salt påvirkning
        under marin grense.
      </p>

      <SpheresDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Forvitring</h2>
      <p>
        Forvitring er nedbrytning av berg på stedet. Det er den mest lokale vekselvirkningen du kan
        peke på i felt.
      </p>
      <OrdBoks
        ord="Forvitring"
        barn="Nedbrytning av berg på stedet. Mekanisk (frost, røtter) eller kjemisk (syrer som løser mineraler). Bergarten flyttes ikke."
      />
      <p>
        Mekanisk forvitring: vann i sprekker fryser, utvider seg og kiler fjellet. Det krever
        hydrosfære, fryse–tine og sprekker i geosfæren. Når isen forsvinner, kan trykkavlastning gi
        avskalling. Røtter som sprenger er biosfære.
      </p>
      <p>
        Kjemisk forvitring: regn tar opp CO₂ og blir svak karbonsyre. Kalkspat løses raskt. Derfor
        gir kambrosilurisk kalkstein i Oslofeltet hardt vann og annen jord enn gneis. Silikater
        hydrolyseres langsommere til leirmineraler og oppløste ioner. Ionene følger elv og
        grunnvann. Kvarts er kjemisk seig. Gneis og granitt etterlater sandig, næringsfattig jord.
      </p>
      <p>
        Forvitring er ikke det samme som erosjon. Erosjon er nedsliting pluss transport med vann, is
        eller tyngdekraft. Uten forvitring ingen sedimenter.
      </p>
      <OrdBoks
        ord="Erosjon"
        barn="Nedsliting pluss transport. Vann, is eller tyngdekraft flytter det forvitringen har løsnet."
      />

      <PhotoFigure
        src="/images/fig-forvitring.jpg"
        alt="Sprekk i stripet gneis fylt med is, stein som kiles fra hverandre"
        heading="Mekanisk forvitring på stedet"
        caption="Vann i sprekken fryser, utvider seg og kiler fjellet. Bergarten er den samme. Den er bare mer oppsprukket."
        marks={[{ x: 6, y: 16, n: "1", text: "Is i sprekk", tone: "cold" }]}
        points={[{ n: "1", label: "Fryse–tine. Hydrosfære som jobber i geosfæren." }]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Isbreen som agent</h2>
      <p>
        Kryosfæren hører hjemme her fordi is graver i geosfæren og mater hydrosfæren. Ikke som
        klimasystem.
      </p>
      <p>
        For om lag 2,6 millioner år siden ble det dannet isbreer som fortsatte erosjonen. Breisen
        grov ut botner, dype daler og fjorder. Stein i sålen sliper. Det gir skuringsstriper.
        Materialet avsettes som usortert morene, eller sorteres av breelver til sand og grus. Når
        isen sto ut i fjorden, ble leire og silt avsatt i saltvann.
      </p>
      <p>
        Da isen smeltet, reiste litosfæren seg. Det kalles isostasi. Marin leire ligger nå på land.
        Elver graver raviner. Grunnvann vasker salt. Resultatet kan bli kvikkleire — det tar vi
        under{" "}
        <Link
          to="/geofag-1/skred"
          className="text-primary underline-offset-2 hover:underline"
        >
          skred
        </Link>
        .
      </p>
      <OrdBoks
        ord="Isostasi"
        barn="Litosfæren flyter på mantelen. Når isen forsvinner, reiser landet seg. Marin leire kan da ligge på tørt land."
      />
      <p>
        Jostedalsbreen, Folgefonna og småbotnbreer i Nord-Norge er levende agenter. De fleste norske
        U-dalene er fossil form fra innlandsisen. Fjordene på Vestlandet er druknede U-daler: is
        formet fjellet, vann fylte det.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Vulkanaske og gass på kort sikt
      </h2>
      <p>
        Vulkaner er geosfære som puster til atmosfæren, og som treffer vann og overflate i løpet av
        dager til noen år.
      </p>
      <p>
        Aske faller ut av stratosfæren i løpet av dager til uker og har liten klimaeffekt. SO₂ som
        når stratosfæren, omdannes til sulfataerosoler som reflekterer sollys og kan kjøle
        troposfæren. Pinatubo 15. juni 1991 injiserte om lag 20 millioner tonn SO₂ og kjølte
        jordoverflaten i et par år.
      </p>
      <p>
        Vulkaner slipper også CO₂, men dagens vulkanske utslipp er noen tiendedels gigatonn per år
        mot antropogene utslipp på over 35 Gt. Kort sikt er SO₂ og aske, ikke at vulkanene varmer
        klimaet.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Karbonat–silikat på lang sikt
      </h2>
      <p>
        På hundre tusen til millioner av år styrer kjemisk forvitring av silikatbergarter en negativ
        tilbakekobling mellom atmosfære, hydrosfære og geosfære.
      </p>
      <OrdBoks
        ord="Tilbakekobling"
        barn="Negativ: en endring utløser en respons som demper den. Silikatforvitring trekker CO₂ ut når CO₂ stiger."
      />
      <p>
        Regn med karbonsyre løser berg og frisetter ioner. Elvene fører dem til havet. Der felles
        kalsiumkarbonat. Karbon lagres i kalkstein i millioner av år. Vulkaner og subduksjon gir CO₂
        tilbake. Karbon bruker 100–200 millioner år gjennom den trege sløyfen. Rebalansering via
        forvitring tar i størrelsesorden noen hundre tusen år.
      </p>
      <p>
        Mer CO₂ gir varmere klima, mer nedbør og raskere silikatforvitring. Da bindes mer karbon i
        karbonatbergarter, og CO₂ faller. Det er negativ tilbakekobling. Fjellkjededannelse leverer
        ferskt silikatberg til overflaten og kan øke forvitringen.
      </p>
      <p>
        Kalksteinforvitring pumper også HCO₃⁻ til elvene, men netto trekker den ikke CO₂ ut av
        atmosfæren på samme måte som silikatforvitring. Oslofeltets ordoviciske og siluriske
        kalksteiner er havbunn som nå forvitrer på land.
      </p>
      <p>
        Pinatubo-kjøling er år. Silikatforvitring er geologisk tid. Det er ikke samme vulkan–klima.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="geosfære" def="den faste jorda: berggrunn, løsmasser, jord" />
        <Term name="hydrosfære" def="her: elver, innsjøer, grunnvann og porevann" />
        <Term
          name="vekselvirkning"
          def="endring i ett delsystem som utløser respons i ett eller flere andre"
        />
        <Term
          name="tilbakekobling"
          def="negativ: en endring utløser en respons som demper den; silikatforvitring trekker CO₂ ut når CO₂ stiger"
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er forskjellen på forvitring og erosjon?",
            options: [
              "Det er samme prosess.",
              "Forvitring er nedbrytning på stedet. Erosjon er nedsliting pluss transport.",
              "Forvitring skjer bare i tropene.",
              "Erosjon skjer bare i geosfæren, aldri med vann.",
            ],
            answer: 1,
            explain: "Uten forvitring ingen sedimenter. Erosjon flytter det som allerede er løst.",
          },
          {
            prompt: "Hvilken sfære følger du primært i geofag 1 når vi sier hydrosfære?",
            options: [
              "Golfstrømmen og AMOC.",
              "Ferskvann: elver, innsjøer, grunnvann og porevann. Havet er med, men sporet her er på land.",
              "Bare skyer.",
              "Bare isbreer.",
            ],
            answer: 1,
            explain:
              "Havet hører til hydrosfæren, men kompetansemålet her peker mot ferskvannssporet.",
          },
          {
            prompt: "Hvorfor varmer ikke dagens vulkaner klimaet mer enn mennesket?",
            options: [
              "Fordi vulkaner ikke slipper CO₂.",
              "Fordi de vulkanske CO₂-utslippene er langt mindre enn de antropogene. Kort sikt er SO₂ som kjøler.",
              "Fordi Pinatubo varmet i tre år.",
              "Fordi aske holder på varmen.",
            ],
            answer: 1,
            explain:
              "Pinatubo er et kjøleeksempel på årsskala. Silikatforvitring er millioner av år.",
          },
        ]}
      />
    </TopicLayout>
  );
}
