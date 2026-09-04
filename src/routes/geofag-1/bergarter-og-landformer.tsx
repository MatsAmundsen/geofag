import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { RockCycleDiagram, ValleyCrossSectionDiagram } from "@/components/diagrams/bergarter";
import {
  BowenReactionSeriesDiagram,
  GrainSizeDistributionDiagram,
  HjulstromDiagram,
  RelativeDatingDiagram,
} from "@/components/diagrams/geology-extra";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("bergarter-og-landformer")!;

export const Route = createFileRoute("/geofag-1/bergarter-og-landformer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/bergarter-og-landformer",
    }),
  component: BergarterOgLandformerPage,
});

function BergarterOgLandformerPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Et mineral har krystallgitter og kjemisk formel. Kvarts er SiO₂, kalsitt er CaCO₃. En bergart er et aggregat av ett eller flere mineraler. Granitt er kvarts, feltspat og glimmer, ikke et mineral som heter granitt. Sediment er løst. Først når kornene kittes eller presses sammen, har du en sedimentær bergart."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/vulkaner-og-jordskjelv",
        label: "Forrige: Vulkaner og jordskjelv",
      }}
      next={{
        to: "/geofag-1/vann-og-flom",
        label: "Neste: Vann og flom",
      }}
      kilder={KILDER.bergarter}
    >
      <OrdBoks
        ord="Mineral"
        barn="Naturlig, uorganisk fast stoff med definert kjemi og krystallstruktur. Byggestein i bergarter."
      />

      <p>
        NGU skiller tre hovedtyper etter opprinnelse: magmatiske, sedimentære og metamorfe (NGU,
        u.å.). Magmatiske og metamorfe utgjør 90–95 prosent av jordskorpa. På overflaten er det
        likevel sediment og sedimentære lag du oftest går på.
      </p>
      <p>
        Mohs er relativ riperhardhet. Kvarts er 7, diamant er 10. Mohs gjelder mineraler, ikke
        bergarter. En gneis kan ha myk glimmer og hard kvarts i samme håndstykke. Rip ett korn, ikke
        hele steinen.
      </p>

      <PhotoFigure
        src="/images/fig-tre-bergarter.jpg"
        alt="Tre håndstykker: grovkornet magmatisk bergart, lagdelt kalkstein, stripet gneis"
        heading="Tre grupper, tre utseender"
        caption="Venstre: størknet magma, synlige korn. Midten: lag og fossiler. Høyre: omdannet i fast tilstand, foliasjon."
        marks={[
          { x: 4, y: 14, n: "1", text: "Magmatisk", tone: "warm" },
          { x: 36, y: 14, n: "2", text: "Sedimentær", tone: "teal" },
          { x: 68, y: 14, n: "3", text: "Metamorf", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "Størknet magma eller lava. Dyp nede, dag oppe." },
          { n: "2", label: "Fragmenter, utfelling eller organismer. Lagning." },
          { n: "3", label: "Omdannet i fast tilstand. Foliasjon er evidens." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Tre grupper</h2>
      <p>
        Magmatisk bergart er størknet magma eller lava. Sakte avkjøling nede gir store, synlige
        korn: dypbergart. Rask avkjøling oppe gir finkornet grunnmasse: dagbergart. Larvikitt er
        dypbergart, dannet for cirka 290 millioner år siden (NGU, u.å.). Rombeporfyr er dagbergart,
        Oslofeltets signatur.
      </p>
      <OrdBoks ord="Magmatisk" barn="Størknet magma eller lava. Dyp nede, dag oppe." />

      <BowenReactionSeriesDiagram />
      <p>
        Sedimentær bergart kommer av fragmenter, utfelling eller organismer. Kambrosilur i
        Oslofeltet veksler mellom leirskifer og kalkstein. Kalkstein bruser med fortynnet saltsyre.
      </p>
      <OrdBoks
        ord="Sedimentær"
        barn="Bergart av fragmenter, utfelling eller organismer. Lagning og fossiler peker hit. Kalkstein bruser med saltsyre."
      />
      <p>
        Metamorf bergart er omdannet i fast tilstand, av trykk, temperatur eller fluider, uten full
        smelting. Gneis er en av Norges vanligste bergarter. Foliasjon er evidens, ikke pynt.
        Metamorfose er ikke smelting. Smelting gir ny magmatisk bergart.
      </p>
      <OrdBoks
        ord="Metamorf"
        barn="Omdannet i fast tilstand, uten full smelting. Foliasjon — striper og bølger — er evidens."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Bergartssyklusen</h2>
      <p>
        Syklusen er en modell. Piler i flere retninger, ingen fast start. Enhver bergart kan bli en
        annen. Ingen bergart må besøke alle stasjoner (USGS, u.å.). Diagenese lukker sediment til bergart.
      </p>
      <OrdBoks
        ord="Diagenese"
        barn="Når løst sediment blir til fast bergart: kompaksjon og mineraler som binder kornene."
      />
      <RockCycleDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Relativ alder</h2>
      <p>
        Relativ alder er rekkefølge uten tall. Superposisjon: i uforstyrret lagrekke er det nederste
        eldst. Krysskjæring: en gang, en pluton eller en forkastning er yngre enn det den skjærer.
        Inklusjon: et fragment i en bergart er eldre enn bergarten det sitter i — xenolitt i lava,
        rullestein i konglomerat.
      </p>
      <OrdBoks
        ord="Superposisjon"
        barn="I uforstyrret lagrekke er det nederste eldst. Relativ alder: rekkefølge uten årstall."
      />
      <OrdBoks
        ord="Inklusjon"
        barn="Fragmentet er eldre enn bergarten det er innleiret i. Motsatt av krysskjæring i retning, samme logikk: det som ble tatt inn, fantes først."
      />
      <RelativeDatingDiagram />
      <p>
        Diskordans er et tidshull. Avsetning stoppet, erosjon tok bort, ny avsetning la seg oppå.
        I skyvedekker kan eldre ligge over yngre. Da har tektonikk brutt premisset.
      </p>
      <OrdBoks ord="Diskordans" barn="Tidshull: avsetning stoppet og/eller erosjon tok bort lag." />
      <p>
        C-14 daterer organisk materiale, ikke kambrosilur, gneis eller larvikitt. Halveringstid 5730
        år (Godwin, 1962). Rekkevidde cirka 50 000 år (Reimer et al., 2020). Gammel skorpe dateres
        med U–Pb i zirkon.
      </p>
      <OrdBoks
        ord="C-14"
        barn="Daterer organisk materiale. Halveringstid 5730 år, rekkevidde ca. 50 000 år. Gneis og larvikitt dateres med U–Pb i zirkon."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Korn og jordart</h2>
      <p>
        Kornstørrelse og sortering peker på agenten. Morene er usortert. Elvegrus er sortert.
        Leir under marin grense er en annen historie enn sand på et nes. Nøkkelen er leir — silt —
        sand — grus, ikke «jord» som sekk.
      </p>
      <GrainSizeDistributionDiagram />
      <HjulstromDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">U-dal og V-dal</h2>
      <p>
        V-dal er elveerosjon: spisst tverrsnitt. U-dal er breerosjon: bratte sider og flat bunn.
        Fjord er U-dal under havnivå.
      </p>
      <ValleyCrossSectionDiagram />
      <p>
        Mange norske daler er U med en liten V i bunnen. To generasjoner: isen bygde den store
        formen, elva graver nå.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="mineral" def="naturlig, uorganisk fast stoff med definert kjemi og krystallstruktur; byggestein i bergarter" />
        <Term name="magmatisk" def="størknet magma eller lava; dyp nede, dag oppe" />
        <Term name="metamorf" def="omdannet i fast tilstand, uten full smelting" />
        <Term name="diskordans" def="tidshull: avsetning stoppet og/eller erosjon tok bort lag" />
        <Term name="inklusjon" def="fragmentet er eldre enn bergarten det sitter i" />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er forskjellen på et mineral og en bergart?",
            options: [
              "Granitt er et mineral.",
              "Mineral har definert kjemi og krystallstruktur. Bergart er et aggregat av ett eller flere mineraler.",
              "Bergart har alltid fossil.",
              "Mineraler finnes bare i magma.",
            ],
            answer: 1,
            explain: "Kvarts er SiO₂. Granitt er kvarts, feltspat og glimmer.",
          },
          {
            prompt: "Hva er metamorfose — og hva er den ikke?",
            options: [
              "Full smelting til ny magma.",
              "Omdanning i fast tilstand. Smelting gir magmatisk bergart, ikke metamorf.",
              "At sediment løsner.",
              "Bare foliasjon i Oslofeltet.",
            ],
            answer: 1,
            explain: "Gneis er omdannet uten å smelte. Smelter den, får du magmatisk bergart.",
          },
          {
            prompt: "Hvorfor kan C-14 ikke datere gneis eller larvikitt?",
            options: [
              "Fordi C-14 ikke finnes i Norge.",
              "C-14 daterer organisk materiale og rekker ca. 50 000 år. Gammel skorpe dateres med U–Pb i zirkon.",
              "Fordi gneis er for myk.",
              "Fordi Mohs er 10.",
            ],
            answer: 1,
            explain: "Halveringstid 5730 år. Etter mange halveringer er det for lite C-14 igjen.",
          },
        ]}
      />
    </TopicLayout>
  );
}
