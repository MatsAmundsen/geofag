import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { RockCycleDiagram, ValleyCrossSectionDiagram } from "@/components/diagrams/bergarter";
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
        NGU skiller tre hovedtyper etter opprinnelse: magmatiske, sedimentære og metamorfe.
        Magmatiske og metamorfe utgjør 90–95 prosent av jordskorpa. På overflaten er det likevel
        sediment og sedimentære lag du oftest går på.
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
          { n: "3", label: "Omdannet uten full smelting. Foliasjon er evidens." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Tre grupper</h2>
      <p>
        Magmatisk bergart er størknet magma eller lava. Sakte avkjøling nede gir store, synlige
        korn: dypbergart. Rask avkjøling oppe gir finkornet grunnmasse: dagbergart. Larvikitt er
        dypbergart, dannet for cirka 290 millioner år siden. Rombeporfyr er dagbergart, Oslofeltets
        signatur: store rombeformede feltspatkrystaller i finkornet grunnmasse. NGU kaller dem
        tvillingbergarter. Forskjellen er avkjølingssted, ikke to ulike magmaer.
      </p>
      <OrdBoks ord="Magmatisk" barn="Størknet magma eller lava. Dyp nede, dag oppe." />
      <p>
        Sedimentær bergart kommer av fragmenter, utfelling eller organismer. Kambrosilur i
        Oslofeltet veksler mellom leirskifer og kalkstein. Kalkstein bruser med fortynnet saltsyre.
        Fossiler og lagning peker sedimentært.
      </p>
      <OrdBoks
        ord="Sedimentær"
        barn="Bergart av fragmenter, utfelling eller organismer. Lagning og fossiler peker hit. Kalkstein bruser med saltsyre."
      />
      <p>
        Metamorf bergart er omdannet i fast tilstand, av trykk, temperatur eller fluider, uten full
        smelting. Gneis er en av Norges vanligste bergarter: stripet eller bølget, kornene synlige.
        I Sør-Norge er grunnfjellet eldre enn 900 millioner år. Foliasjon er evidens, ikke pynt.
        Metamorfose er ikke smelting. Smelting gir ny magmatisk bergart.
      </p>
      <OrdBoks
        ord="Metamorf"
        barn="Omdannet i fast tilstand, uten full smelting. Foliasjon — striper og bølger — er evidens."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Bergartssyklusen</h2>
      <p>
        Syklusen er en modell. Piler i flere retninger, ingen fast start. Enhver bergart kan bli en
        annen. Ingen bergart må besøke alle stasjoner. Indre varme driver smelting, magma og
        metamorfose. Forvitring, erosjon og avsetning driver overflateleddet. Diagenese lukker
        sediment til bergart.
      </p>
      <OrdBoks
        ord="Diagenese"
        barn="Når løst sediment blir til fast bergart: kompaksjon og mineraler som binder kornene."
      />
      <RockCycleDiagram />
      <p>
        Gneis i Østmarka har vært metamorf i mer enn 900 millioner år uten å bli magma. Larvikitt
        har vært dypbergart siden perm. Kambrosilur-kalk i Oslofeltet er svakt omdannet, ikke
        marmor. Å tolke inn i syklusen er å peke på stasjon, og på hvilken pil som er aktiv.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Relativ alder</h2>
      <p>
        Relativ alder er rekkefølge uten tall. Superposisjon: i uforstyrret lagrekke er det nederste
        eldst. Tverrsnitt: en gang, en pluton eller en forkastning er yngre enn det den skjærer.
        Oslofeltets permiske dypbergarter gjennomsetter kambrosilur. Riften er yngre enn
        havsedimentene.
      </p>
      <OrdBoks
        ord="Superposisjon"
        barn="I uforstyrret lagrekke er det nederste eldst. Relativ alder: rekkefølge uten årstall."
      />
      <p>
        Diskordans er et tidshull. Avsetning stoppet, erosjon tok bort, ny avsetning la seg oppå.
        Grunnfjell mot overliggende kambrosilur er en fundamental diskordans. Permisk lava over
        foldet kambrosilur i Oslofeltet er en annen. I skyvedekker kan eldre ligge over yngre. Da
        har tektonikk brutt premisset.
      </p>
      <OrdBoks ord="Diskordans" barn="Tidshull: avsetning stoppet og/eller erosjon tok bort lag." />
      <p>
        C-14 daterer organisk materiale, ikke kambrosilur, gneis eller larvikitt. Halveringstid 5730
        år. Rekkevidde cirka 50 000 år. Etter mange halveringer er det for lite C-14 igjen. Gammel
        skorpe dateres med U–Pb i zirkon.
      </p>
      <OrdBoks
        ord="C-14"
        barn="Daterer organisk materiale. Halveringstid 5730 år, rekkevidde ca. 50 000 år. Gneis og larvikitt dateres med U–Pb i zirkon."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">U-dal og V-dal</h2>
      <p>
        V-dal er elveerosjon: spisst tverrsnitt, elva graver i bunnen. U-dal er breerosjon: bratte
        sider og flat bunn. Isen plukker og skurer i hele tverrsnittet. Fjord er U-dal under
        havnivå. Sognefjorden er dyp U under hav. Gudbrandsdalen er U over hav, med elv i bunnen.
      </p>
      <ValleyCrossSectionDiagram />
      <p>
        Mange norske daler er U med en liten V i bunnen. To generasjoner: isen bygde den store
        formen, elva graver nå. De fleste norske U-dalene er fossil form fra innlandsisen. Elva i
        bunnen er aktiv.
      </p>
      <p>
        Hard gneis gir dyp og trang U-dal. Svakere berg gir bredere dal. Samme agent, ulik bergart.
        Samme bergart, ulik agent: elv gir V, is gir U.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="mineral"
          def="naturlig, uorganisk fast stoff med definert kjemi og krystallstruktur; byggestein i bergarter"
        />
        <Term name="magmatisk" def="størknet magma eller lava; dyp nede, dag oppe" />
        <Term name="metamorf" def="omdannet i fast tilstand, uten full smelting" />
        <Term name="diskordans" def="tidshull: avsetning stoppet og/eller erosjon tok bort lag" />
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
