import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("ressurser-og-felt")!;

export const Route = createFileRoute("/geofag-1/ressurser-og-felt")({
  component: RessurserOgFeltPage,
});

function RessurserOgFeltPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Geosfæren og hydrosfæren er lager. Vi tar ut pukk, metall, olje og grunnvann. Feltarbeid er hvordan du vet hva som ligger der — og hva uttaket gjør med landskapet etterpå."
      banner={tema.image}
      bannerAlt={tema.alt}
      videoTopic="ressurser-og-felt"
      prev={{
        to: "/geofag-1/vann-flom-og-skred",
        label: "Forrige: Vann, flom og skred",
      }}
      next={{
        to: "/geofag-1",
        label: "Tilbake til Geofag 1",
      }}
    >
      <p>
        En geologisk ressurs er noe i berg eller løsmasser som samfunnet kan bruke. I Norge er det
        største volumet ikke gull. Det er pukk, grus og sand — stein til vei, betong og fylling. Så
        kommer metall, industrimineraler, petroleum og grunnvann. Ferskvann er en hydrosfære-ressurs
        som geosfæren lagrer og filtrerer.
      </p>
      <OrdBoks
        ord="Geologisk ressurs"
        barn="Stein, mineral, olje eller grunnvann som kan tas ut og brukes. Verdi sitter i geologien, i etterspørselen — og i hva uttaket koster landskapet."
      />

      <PhotoFigure
        src="/images/fig-dagbrudd.jpg"
        alt="Åpent steinbrudd i gneis med knust stein og fjord i bakgrunnen"
        heading="Pukk er også geologi"
        caption="Dagbrudd i norsk grunnfjell. Volumet her veier tyngre i samfunnet enn de fleste metallfunn. Etterbruken — vannspeil, fylling, natur — må planlegges før siste lass."
        marks={[
          { x: 8, y: 16, n: "1", text: "Uttak i gneis", tone: "warm" },
          { x: 62, y: 52, n: "2", text: "Landskap etterpå", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Pukk og grus er Norges største mineraluttak i volum." },
          { n: "2", label: "Bærekraft er hva som står igjen når bruddet er tomt." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fire lager, ulike spor
      </h2>
      <p>
        Byggeråstoff sitter i løsmasser og i fast fjell. Elvegrus er sortert av vann. Morene er
        usortert. Fast fjell knuses til pukk. Kvalitet er kornform, styrke og avstand til bygget.
        Kort transport slår ofte «bedre» stein langt unna.
      </p>
      <OrdBoks
        ord="Pukk"
        barn="Knust fast fjell til vei, betong og fylling. Norges største geologiske uttak i volum. Avstand til bygget teller ofte mer enn «bedre» stein langt unna."
      />
      <p>
        Metall sitter i malm: mineraler med høy nok konsentrasjon til at uttak lønner seg. Det er
        geologi pluss økonomi. En rik malm i feil landskap kan likevel ligge. En fattigere malm nær
        infrastruktur kan tas ut.
      </p>
      <OrdBoks
        ord="Malm"
        barn="Berg med høy nok konsentrasjon av nyttige mineraler til at uttak kan lønne seg. Geologi pluss økonomi."
      />
      <p>
        Petroleum sitter i porøs bergart under takbergart, i et felle-geometri. Nordsjøen er
        sedimentbasseng. Det er ikke «olje i fjorden». Det er porer i sandstein, fylt over
        millioner av år.
      </p>
      <OrdBoks
        ord="Petroleumfelle"
        barn="Porøs bergart under takbergart, i en geometri som holder olje og gass. Ikke «olje i fjorden» — porer i sandstein."
      />
      <p>
        Grunnvann sitter i porer og sprekker. Løsmasser langs elv kan gi store uttak. Fast fjell gir
        mindre, men kan forsyne en gård. Overuttak senker speilet og kan saltvannsinntrenging ved
        kysten. Forurensning i infiltrasjonsområdet er forurensning i kranen — med forsinkelse.
      </p>
      <OrdBoks
        ord="Grunnvann"
        barn="Vann i porer og sprekker under bakken. Geosfæren er lager og filter. Hydrosfæren er innholdet."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Bærekraft er geofag</h2>
      <p>
        Uttak flytter masse, vann og landskap. Et dagbrudd tar areal, støy og støv så lenge det går.
        Etterpå kan det bli innsjø, deponi eller natur. Petroleum tar karbon ut av geosfæren og
        slipper det i atmosfæren — det er vekselvirkning mot{" "}
        <Link to="/tema/klima" className="text-primary underline-offset-2 hover:underline">
          klima
        </Link>
        , ikke bare energiøkonomi.
      </p>
      <p>
        Ferskvann er fornybart på års-skala, men magasinene er det ikke hvis du tømmer raskere enn
        infiltrasjonen. Gruver kan syre og tungmetaller i avrenning i tiår etter stans. Bærekraft
        er derfor tidsskala: hva skjer i drift, og hva skjer når driften er slutt.
      </p>
      <OrdBoks
        ord="Bærekraftig uttak"
        barn="At ressursen og landskapet tåler bruken over tid. Volum, areal, vann, utslipp og etterbruk i samme regnestykke."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Feltarbeid</h2>
      <p>
        Felt er ikke en ekskursjon. Det er datainnsamling. Du observerer, måler, samler og noterer
        slik at en annen kan gjenta det. Kart, GPS, kompass, kornstørrelse, vannføring, foto med
        skala. Tolking kommer etterpå — ikke i notatboka som om den var fasit.
      </p>
      <p>
        Geosfære-felt: bergart, strøk og fall, forkastning, korn, fossil. Hydrosfære-felt:
        vannføring, turbiditet, grunnvannsspeil, korn i elvebredd. Samme logikk som i{" "}
        <Link
          to="/geofag-1/bergarter-og-landformer"
          className="text-primary underline-offset-2 hover:underline"
        >
          bergarter
        </Link>{" "}
        og{" "}
        <Link
          to="/geofag-1/vann-flom-og-skred"
          className="text-primary underline-offset-2 hover:underline"
        >
          vann
        </Link>
        : evidens først, modell etterpå.
      </p>
      <OrdBoks
        ord="Feltarbeid"
        barn="Observasjon og måling ute, slik at data kan tolkes inne. Skille det du så, fra det du tror."
      />
      <p>
        Risiko i felt er geofag: ustabil skråning, flom, trafikk i brudd, gass i gruve. Du leser
        landskapet før du går inn i det.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="Geologisk ressurs"
          def="Stein, mineral, olje eller grunnvann som kan tas ut og brukes."
        />
        <Term
          name="Grunnvann"
          def="Vann i porer og sprekker. Geosfæren lagrer, hydrosfæren er innholdet."
        />
        <Term
          name="Bærekraftig uttak"
          def="Volum, areal, vann, utslipp og etterbruk i samme regnestykke."
        />
        <Term
          name="Feltarbeid"
          def="Observasjon og måling ute. Skille det du så, fra det du tror."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er Norges største geologiske uttak i volum?",
            options: [
              "Gull.",
              "Pukk, grus og sand — byggeråstoff.",
              "Grunnvann i fast fjell.",
              "Diamant.",
            ],
            answer: 1,
            explain: "Kort transport og kornkvalitet slår ofte «bedre» stein langt unna.",
          },
          {
            prompt: "Hvorfor er grunnvann både geosfære og hydrosfære?",
            options: [
              "Fordi det bare finnes i havet.",
              "Vannet er hydrosfære. Porene og sprekkene det sitter i, er geosfære.",
              "Fordi grunnvann er magma.",
              "Fordi det ikke kan forurenses.",
            ],
            answer: 1,
            explain: "Overuttak og forurensning i infiltrasjonsområdet treffer kranen — med forsinkelse.",
          },
          {
            prompt: "Hva skiller feltnotat fra tolking?",
            options: [
              "Ingenting. Du skriver fasit i felt.",
              "Notatet er det du så og målte. Tolking er modellen du lager etterpå.",
              "Felt er bare foto.",
              "Tolking skjer bare på universitetet.",
            ],
            answer: 1,
            explain: "En annen skal kunne gjenta målingen. Fasiten sitter ikke i notatboka.",
          },
        ]}
      />
    </TopicLayout>
  );
}
