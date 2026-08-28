import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { BoundaryQuakesDiagram } from "@/components/diagrams/quakes";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("vulkaner-og-jordskjelv")!;

export const Route = createFileRoute("/geofag-1/vulkaner-og-jordskjelv")({
  component: VulkanerOgJordskjelvPage,
});

function VulkanerOgJordskjelvPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jordskjelv oppstår der oppbygde spenninger utløses ved plutselig brudd. De fleste skjer langs plategrenser. Energien spres som seismiske bølger. Grunne skjelv kan lage synlig forkastning. Dype skjelv ryster likevel overflaten."
      banner={tema.image}
      bannerAlt={tema.alt}
      videoTopic="vulkaner-og-jordskjelv"
      prev={{
        to: "/geofag-1/platetektonikk",
        label: "Forrige: Platetektonikk",
      }}
      next={{
        to: "/geofag-1/$slug",
        params: { slug: "bergarter-og-landformer" },
        label: "Neste: Bergarter og landformer",
      }}
    >
      <p>
        Ved midthavsrygg og transformgrense er skjelvene grunne. Ved subduksjon går havbunnen ned,
        og skjelvene kan sitte dypt. Der kombineres ofte vulkan, store jordskjelv og tsunami fra
        havbunnsløft. Indonesia og Japan har et annet risikobilde enn Norge.
      </p>

      <BoundaryQuakesDiagram />

      <p>
        Norge ligger inne på den eurasiske platen. Skjelvene våre er intraplate: gamle svakhetssoner
        som slipper spenning sjelden, men ikke aldri. Oslo-graben, kyst-Norge, Nordland, og ryggen
        ved Jan Mayen og Svalbard. Dette er ikke Stillehavets subduksjon. Norge er likevel blant de
        mest skjelvaktive områdene i Nord-Europa. Bare et fåtall skjelv har gitt bygningsskade.
      </p>
      <OrdBoks
        ord="intraplate"
        barn="skjelv inne på en plate, ikke ved aktiv grense; Norge er slikt"
      />

      <p>
        Oslofjordskjelvet 23. oktober 1904 er det største kjente i Oslo-området, magnitude 5,4.
        Episenteret er lagt til Kattegat, ca. 25 km sør for Hvaler. Ingen omkom i Oslo. Lurøy i
        Nordland 1819, ca. magnitude 5,8, viser at Nordlandskysten også har potensial. I Norge
        dreper skred og flom langt flere enn skjelv. Det er et risikoargument, ikke at vi er uten
        jordskjelv.
      </p>
      <OrdBoks
        ord="episenter"
        barn="punktet på overflaten rett over bruddet; energien spres som seismiske bølger."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Vulkaner</h2>
      <p>
        Magma dannes der mantelberg delvis smelter: ved rygger (dekompresjon), ved subduksjon (vann
        senker smeltepunktet), og ved hotspot (ekstra varme). Ved spredning: basalt, ofte effusiv.
        Ved subduksjon: andesitt og ryolitt, ofte eksplosiv, med pyroklastisk strøm. Farer: lava,
        pyroklastisk strøm, aske, lahar og gass.
      </p>
      <p>
        De fleste vulkaner sitter på plategrenser. Unntaket er hotspot. En langvarig, varm sone
        under platen leverer magma mens platen glir over. Hawaii-kjeden blir eldre og mer erodert
        mot nordvest: Kauai ca. 5,5 millioner år, Big Island yngre enn 0,7 millioner år og fortsatt
        aktiv. Øykjeden er platens kjølvann. Senere forskning diskuterer om hotspoter er dype og
        faste.
      </p>
      <OrdBoks
        ord="hotspot"
        barn="langvarig magmakilde under platen; platen glir over og kan lage øykjede"
      />
      <p>
        Norsk fastland har ingen aktive vulkaner. Oslofeltets magmatisme er perm, ikke en
        varslingsrelevant vulkan. Jan Mayen og Island ligger på Den midtatlantiske ryggen.
        Beerenberg er Norges eneste aktive vulkan over havet, 2272 m. Siste utbrudd i 1985. Island
        og Azorene ligger nær ryggen og har hotspot-preg.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Åknes og varsling</h2>
      <p>
        Åknes ligger på vestsiden av Sunnylvsfjorden i Stranda. Fjellet har vært kjent som ustabilt
        siden 1960-tallet. NVE definerer fire scenarioer: D ca. 2,4 mill. m³ (årlig sannsynlighet
        1/200), C ca. 7,4 mill. m³ (1/100), B ca. 9,7 mill. m³ (om lag 1/600), A totalt 31 mill. m³
        (om lag 1/12 000, inngår ikke i beredskap). Samlet årlig sannsynlighet om lag 1/60.
      </p>
      <p>
        Overvåking: GPS, totalstasjon, ekstensometer, laser, borehull, satellitt-radar og
        meteorologi. Et skred kan gi flodbølge i Storfjord-systemet. Sikring av hele fjellet er
        urealistisk. Tiltaket er overvåking, varsling og evakuering.
      </p>
      <p>
        Tafjord 7. april 1934 viser hvorfor. Ca. 3 mill. m³ fjell, 40 omkomne, bølger inntil 61
        høydemeter. Sprekken var kjent i tiår. Båter ble dratt opp, men ikke folkene. Overvåking
        stopper ikke skredet. Den gir tid til å flytte folk.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Storegga er skred, ikke plategrense
      </h2>
      <p>
        Norske tsunamier er nesten alltid skred i fjord, innsjø eller kontinentalskråning, ikke
        subduksjon. Globale katastrofetsunamier ved Chile, Japan og Indonesia kommer fra
        havbunnsløft ved plategrense.
      </p>
      <OrdBoks
        ord="tsunami"
        barn="i Norge nesten alltid fra skred i fjord, innsjø eller skråning, ikke fra subduksjon"
      />
      <p>
        Storeggaskredet gikk for ca. 8150 år siden. Volum 2400–3200 km³, bakvegg 310 km, utløp 810
        km. Massene er morene i veksling med myk leire på kontinentalskråningen. Skredet utviklet
        seg retrogressivt på slak helling, ned mot 0,3°, som et kvikkleireskred under vann. Et
        jordskjelv kan ha vært første impuls. Selve hendelsen er skråningssvikt i sediment, ikke en
        plategrense som røk.
      </p>
      <p>
        Ormen Lange ligger i kanten av skredgropa. Undersøkelsene konkluderte med stabil skredkant.
        Feltet har vært i produksjon fra 2007. Storegga forklarer tsunami og skred i hydrosfæren.
        Den forklarer ikke hvor platene møtes.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="episenter"
          def="punktet på overflaten rett over bruddet; energien spres som seismiske bølger."
        />
        <Term
          name="hotspot"
          def="langvarig magmakilde under platen; platen glir over og kan lage øykjede"
        />
        <Term
          name="intraplate"
          def="skjelv inne på en plate, ikke ved aktiv grense; Norge er slikt"
        />
        <Term
          name="tsunami"
          def="i Norge nesten alltid fra skred i fjord, innsjø eller skråning, ikke fra subduksjon"
        />
      </TermGrid>
    </TopicLayout>
  );
}
