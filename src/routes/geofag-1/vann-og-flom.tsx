import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { HydrographDiagram, KretslopDiagram } from "@/components/diagrams/hydrology";
import { GeoMap } from "@/components/geo-map";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("vann-og-flom")!;

export const Route = createFileRoute("/geofag-1/vann-og-flom")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/vann-og-flom",
    }),
  component: VannOgFlomPage,
});

function VannOgFlomPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Hydrologi er vannet på landjorden. Kretsløpet har tilførsel, lager og tap. Du skal følge ferskvannssporet."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/bergarter-og-landformer",
        label: "Forrige: Bergarter og landformer",
      }}
      next={{
        to: "/geofag-1/skred",
        label: "Neste: Skred",
      }}
      kilder={KILDER.vannFlom}
    >
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Hva det er</h2>
      <p>
        Hydrologi er vannet på landjorden. Kretsløpet har tilførsel, lager og tap. Nedbør treffer
        feltet. Vannet lagres i snø, mark, grunnvann, innsjø, myr og elveløp. En del går tilbake til
        lufta som evapotranspirasjon. Resten renner til havet i elv og som grunnvann. Havet er
        magasin og mottaker. Du skal følge ferskvannssporet.
      </p>
      <OrdBoks
        ord="Magasin"
        barn="Der vannet lagres i feltet: snø, mark, grunnvann, innsjø, myr og elveløp. Lite magasin gir spiss hydrogramtopp."
      />
      <p>
        Energi styrer fase: snø eller regn, smelting, fordamping. Tyngdekraft styrer strøm.
        Vegetasjon og jord styrer hvor mye som infiltrerer, og hvor mye som blir flomtopp. Berg,
        løsmasse og relieff er røret og filteret.
      </p>
      <p>
        Når jorda er mettet, kan ny nedbør ikke tas opp. Da blir avrenningen rask, på overflaten.
        Snø er den faktoren som sterkest forsinker avrenningen i mange norske felt. Den lagrer
        vinterens nedbør og slipper den som vårflom.
      </p>
      <p>
        Vannføring er volum per tid i et tverrsnitt. Hydrogrammet er vannføring mot tid. Bratt,
        spiss topp betyr lite magasin, bratt felt, tette flater eller intens regn. Bred, sen topp
        betyr stor sjøprosent, slakt felt, eller snøsmelting over uker.
      </p>
      <OrdBoks
        ord="Hydrogram"
        barn="Vannføring mot tid. Bratt, spiss topp: lite magasin, bratt felt, tette flater eller intens regn. Bred, sen topp: stor sjøprosent, slakt felt, eller snøsmelting over uker."
      />
      <p>
        Flom er unormalt høy vannføring i vassdrag. Det er ikke overvann i kjelleren, og det er ikke
        stormflo (NVE, u.å.). Regnflom treffer Vestlandet, kyst og små bratte felt, særlig høst og
        vinter.
        Snøsmelteflom treffer innland og fjell om våren. I 2018 kom stor vårflom i øvre Glomma,
        Gudbrandsdalslågen og Drammensvassdraget av smelting alene. Kombinasjonsflom er regn på
        snø, eller regn og smelting samtidig. Isgang er is som demmer, så brudd og flombølge.
      </p>
      <OrdBoks
        ord="Flom"
        barn="Unormalt høy vannføring i vassdrag. Ikke overvann i kjelleren, og ikke stormflo."
      />
      <KretslopDiagram />
      <HydrographDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Utløsningsmekanismer
      </h2>
      <p>
        Intens nedbør fyller feltet fortere enn det kan lagre. Mettet mark etter våt periode gir
        rask overflateavrenning. Tele stenger infiltrasjonen, så vannet renner oppå. Bekkelukking
        tar vannet ut av dagen. Magasin og kantvegetasjon forsvinner. Kulminasjonen kommer fortere.
        Tette flater i tettsted gjør det samme: tak og vei, urban flom, ofte utenfor det naturlige
        elveløpet.
      </p>
      <p>
        Grøfting av myr senker markvann og hever flomtoppen nedstrøms. En demning kutter topp og
        flytter vann til vinteren. En asfaltert flate hever toppen og flytter den fram. Bland ikke
        virkningene.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Utfordringer i Norge i dag
      </h2>
      <p>
        Dalbunnene er eksponert. E6, jernbane, boliger og tettsteder ligger der elva alltid har
        gått. Varsel reduserer sårbarhet hvis folk flytter biler og åpner kulverter. Det reduserer
        ikke faren i elva.
      </p>
      <p>
        NVE lager faresonekart for flom, vannstand ved gitt returperiode (NVE, u.å.). Kommunen skal
        bruke dem i arealplan. Varsom viser gult, oransje og rødt for flom. Kartene er oversikt, ikke
        fasit.
      </p>
      <Callout title="Hans 2023">
        <p>
          Ekstremværet Hans 7.–9. august 2023 kom inn fra øst og sørøst. Grunnvannet var allerede
          høyt etter våt juli. MET satte nedbørrekord ved 12 stasjoner på Østlandet (MET, 2023). NVE
          registrerte over 50-årsflom på 52 målestasjoner. 45 av dem fikk høyeste verdi siden
          målestart. Drammensvassdraget og Glomma. Innlandet og daværende Viken hardest. Flommen
          kulminerte i Mjøsa og Øyeren 13. august, i Tyrifjorden 16. august. NVE kalte 2023 den
          dyreste naturkatastrofen som har rammet Norge (DSB, 2024). Risikoen ble stor fordi dalene
          er eksponert.
        </p>
      </Callout>
      <GeoMap
        center={[60.7, 11.3]}
        zoom={7}
        markers={[
          { lat: 60.8833, lng: 11.5667, label: "Elverum – hardt rammet av ekstremværet «Hans», august 2023" },
        ]}
        heading="Hans 2023 i Innlandet"
        caption="Kartet viser ett av områdene som ble hardest rammet av ekstremværet «Hans» i august 2023. Det er et stedsreferansekart, ikke NVEs faresonekart eller en faregrad."
      />
      <p>
        Mer intens nedbør øker utløsningsfaren for flom i mange felt. NVE legger klimapåslag inn i
        flomberegninger. Samfunnet planlegger allerede med et våtere kretsløp. Forebygging er kart,
        plan og sikring årene før. Sandsekker når elva stiger, er akutt tilpasning.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="hydrogram"
          def="Vannføring mot tid. Bratt, spiss topp: lite magasin, bratt felt, tette flater eller intens regn. Bred, sen topp: stor sjøprosent, slakt felt, eller snøsmelting over uker."
        />
        <Term
          name="magasin"
          def="Der vannet lagres i feltet: snø, mark, grunnvann, innsjø, myr og elveløp. Lite magasin gir spiss hydrogramtopp."
        />
        <Term
          name="flom"
          def="Unormalt høy vannføring i vassdrag. Ikke overvann i kjelleren, og ikke stormflo."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva betyr en bratt, spiss topp på hydrogrammet?",
            options: [
              "Stor sjøprosent og slakt felt.",
              "Lite magasin, bratt felt, tette flater eller intens regn.",
              "At flommen er stormflo.",
              "At vannet står i kjelleren.",
            ],
            answer: 1,
            explain:
              "Bred, sen topp betyr stor sjøprosent, slakt felt, eller snøsmelting over uker.",
          },
          {
            prompt: "Hva er flom i geofag 1?",
            options: [
              "Overvann i kjelleren.",
              "Unormalt høy vannføring i vassdrag. Ikke overvann i kjelleren, og ikke stormflo.",
              "Stormflo.",
              "Evapotranspirasjon.",
            ],
            answer: 1,
            explain: "Flom er unormalt høy vannføring i vassdrag. Det er ikke stormflo.",
          },
          {
            prompt: "Hva registrerte NVE under ekstremværet Hans 7.–9. august 2023?",
            options: [
              "Stormflo i Oslofjorden.",
              "Over 50-årsflom på 52 målestasjoner. 45 av dem fikk høyeste verdi siden målestart.",
              "Snøsmelteflom i øvre Glomma av smelting alene.",
              "Nedbørrekord ved 52 stasjoner på Vestlandet.",
            ],
            answer: 1,
            explain:
              "MET satte nedbørrekord ved 12 stasjoner på Østlandet. Flommen kulminerte i Mjøsa og Øyeren 13. august, i Tyrifjorden 16. august.",
          },
          {
            prompt: "Hva skiller virkningen av en demning og en asfaltert flate?",
            options: [
              "De gjør det samme med flomtoppen.",
              "En demning kutter topp og flytter vann til vinteren. En asfaltert flate hever toppen og flytter den fram.",
              "Asfalt kutter toppen. Demningen hever den.",
              "Begge senker markvann og hever flomtoppen nedstrøms.",
            ],
            answer: 1,
            explain: "Bland ikke virkningene. Grøfting av myr senker markvann og hever flomtoppen nedstrøms.",
          },
        ]}
      />
    </TopicLayout>
  );
}
