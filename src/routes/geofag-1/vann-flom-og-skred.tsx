import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { HydrographDiagram, MarineLimitDiagram } from "@/components/diagrams/hydrology";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("vann-flom-og-skred")!;

export const Route = createFileRoute("/geofag-1/vann-flom-og-skred")({
  component: VannFlomOgSkredPage,
});

function VannFlomOgSkredPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Hydrologi er vannets kretsløp på landjorden. Du skal følge ferskvannssporet: nedbør inn, snø og grunnvann som lager, elv ut. Energi styrer fase. Tyngdekraft styrer strøm. Snø lagrer vinterens nedbør og slipper den som vårflom."
      banner={tema.image}
      bannerAlt={tema.alt}
      videoTopic="vann-flom-og-skred"
      prev={{
        to: "/geofag-1/bergarter-og-landformer",
        label: "Forrige: Bergarter og landformer",
      }}
      next={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Neste: Geologiske ressurser",
      }}
    >
      <p>
        Tilførsel er nedbør. Lagre er snø, markvann, grunnvann, innsjø, myr og elveløp. Tap mot
        atmosfæren er evapotranspirasjon. Tap mot havet er avrenning. Vegetasjon og jord styrer
        fordelingen mellom infiltrasjon og flomtopp. Geosfæren er røret og filteret.
      </p>
      <OrdBoks
        ord="Evapotranspirasjon"
        barn="Vann som går tilbake til lufta: fordamping fra bakke og vannflater, pluss det plantene puster ut."
      />
      <OrdBoks
        ord="Infiltrasjon"
        barn="Vann som siver ned i jorda i stedet for å renne av. Vegetasjon og jord styrer hvor mye som blir flomtopp."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Hydrogram</h2>
      <p>
        Et hydrogram er vannføring mot tid. Formen er feltets respons. Bratt, spiss topp: lite
        magasin, bratt felt, tette flater, intens regn. Bred, sen topp: stor sjøprosent, slakt felt,
        snøsmelting over uker.
      </p>
      <OrdBoks ord="Hydrogram" barn="Vannføring mot tid. Formen er feltets respons." />
      <HydrographDiagram />
      <p>
        Regnflom treffer Vestlandet, kyst og små bratte felt, særlig høst og vinter. Tidsskala:
        timer. Snøsmelteflom treffer innland og fjell om våren. Tidsskala: dager til uker. NVE:
        flere og større regnflommer framover der årets største flom allerede er en regnflom.
        Snøsmelteflommene ventes mindre og tidligere. Flom i elv er ikke overvann, og ikke stormflo.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Marin grense og kvikkleire
      </h2>
      <p>
        Marin grense er høyeste havnivå etter siste istid. I Norge 0–220 m over havet, stedavhengig.
        Under den linja kan det ligge marin leire, avsatt i salt fjord. Over den linja ble leira
        ikke avsatt i hav. Aktsomhet for kvikkleire gjelder overalt under marin grense, også utenfor
        tegnede faresoner. Kartene friskmelder ikke omlandet.
      </p>
      <OrdBoks ord="Marin grense" barn="Høyeste havnivå etter siste istid. I Norge 0–220 m, stedavhengig." />
      <p>
        Vanlig sjøvann har ca. 35 g salt per liter. Saltet binder leirflakene. Når landet hevet seg,
        ble porevannet ferskere. Når saltet kommer under ca. 2 g/L, kan kvikkleire dannes.
        Utvaskingen tar hundreder til tusener av år. Ikke all marin leire er kvikk. Uforstyrret er
        leira fast. Omrøres den, kollapser strukturen og massen flyter. Skredet blir ofte
        retrogressivt: kanten mister støtte og spiser seg bakover.
      </p>
      <OrdBoks
        ord="Kvikkleire"
        barn="Marin leire der saltet i porevannet er vasket ut. Uforstyrret er den fast. Omrøres den, kan den flyte."
      />
      <MarineLimitDiagram />
      <PhotoFigure
        src="/images/fig-ravine.jpg"
        alt="Leirravine med flomelv og gårder på platået over"
        heading="Marin leire, gravd av elv"
        caption="Under marin grense kan leira ligge. Elva graver ravine. Saltet vaskes. Da kan kvikkleire dannes — ikke overalt, og ikke uten omrøring."
        marks={[
          { x: 8, y: 18, n: "1", text: "Platå · bebyggelse", tone: "fg" },
          { x: 38, y: 52, n: "2", text: "Ravine · erosjon", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Eksponering sitter her: folk og hus over skråningen." },
          { n: "2", label: "Erosjon i bunnen øker fare. Kartene friskmelder ikke omlandet." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Gjerdrum 2020</h2>
      <p>
        Gjerdrum 30. desember 2020, rett før kl. 04: 10 omkomne, et ufødt barn, mer enn
        1600 evakuert, volum omtrent 1,35 mill. m³. Start i skråningen vest for Holmen mot
        Tistilbekken. Årsak: erosjon over år, forsterket av ødelagt bekkelukking, urbanisering og
        terrenginngrep. Utløser: den våte, milde høsten 2020, høyt poretrykk. Hovedårsaken er
        erosjon og kvikkleire. Våt høst var utløser. Ikke et klimaskred som eneste forklaring, og
        ikke uforutsigbart. Kommunen hadde fått varsler om erosjon.
      </p>
      <p>
        Rissa 1978 var større, 5–6 mill. m³. Risikoen i Gjerdrum ble katastrofal fordi boliger lå i
        utløpet. Et ustabilt fjell uten folk nedenfor er høy fare og lav risiko. Risiko er fare
        ganger eksponering ganger sårbarhet.
      </p>
      <OrdBoks
        ord="Risiko"
        barn="Fare × eksponering × sårbarhet. Et ustabilt fjell uten folk nedenfor er høy fare og lav risiko."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Hans 2023</h2>
      <p>
        Ekstremværet Hans 7.–9. august 2023: værsystem inn fra øst og sørøst. Ny nedbørrekord ved 12
        stasjoner på Østlandet. Grunnvannet var allerede høyt etter våt juli. NVE dokumenterte over
        700 skred. Over 50-årsflom på 52 målestasjoner, 45 av dem høyeste verdi siden målestart.
        Drammensvassdraget og Glomma. Flommen kulminerte i Mjøsa og Øyeren 13. august, i Tyrifjorden
        16. august.
      </p>
      <p>
        Hans er compound: ekstremnedbør pluss mettet mark gir flom og løsmasseskred. Risikoen ble
        stor fordi dalene er eksponert: E6, jernbane, Nesbyen, boliger. Varsel reduserer sårbarhet
        hvis folk flytter biler og åpner kulverter. Det reduserer ikke faren i elva. Når 45
        stasjoner setter rekord, er det eksponeringen i dalbunnen som bestemmer skaden.
      </p>
      <p>
        Forebygging er kart, arealplan og erosjonssikring årene før. Tilpasning er varsling og
        evakuering. Tiltaket skal matche faren.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="hydrogram" def="vannføring mot tid; formen er feltets respons" />
        <Term name="marin grense" def="høyeste havnivå etter siste istid; i Norge 0–220 m" />
        <Term
          name="kvikkleire"
          def="marin leire der saltet i porevannet er vasket ut, under ca. 2 g/L; kan flyte ved omrøring"
        />
        <Term name="risiko" def="fare × eksponering × sårbarhet" />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva viser et hydrogram?",
            options: [
              "Bare årsnedbør.",
              "Vannføring mot tid. Formen er feltets respons.",
              "Saltinnhold i leire.",
              "Havnivå etter istiden.",
            ],
            answer: 1,
            explain: "Bratt topp: lite magasin og intens regn. Bred topp: sjø og snøsmelting over uker.",
          },
          {
            prompt: "Hvor kan kvikkleire ligge?",
            options: [
              "Overalt i Norge, også på Hardangervidda.",
              "Bare under marin grense, og bare der saltet er vasket ut.",
              "Bare i tegnede faresoner.",
              "Bare i fjell.",
            ],
            answer: 1,
            explain: "Kartene friskmelder ikke omlandet. Aktsomhet gjelder under hele marin grense.",
          },
          {
            prompt: "Hva er forskjellen på fare og risiko i Gjerdrum?",
            options: [
              "De er samme ting.",
              "Fare er kvikkleire og erosjon. Risiko ble katastrofal fordi boliger lå i utløpet.",
              "Risiko er bare været.",
              "Fare er bare klimaskred.",
            ],
            answer: 1,
            explain: "Risiko er fare × eksponering × sårbarhet. Våt høst var utløser, ikke eneste årsak.",
          },
        ]}
      />
    </TopicLayout>
  );
}
