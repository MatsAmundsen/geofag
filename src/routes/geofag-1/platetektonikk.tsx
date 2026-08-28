import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PlatesMapDiagram, SpreadingDiagram, SubductionDiagram } from "@/components/diagrams/plates";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("platetektonikk")!;

export const Route = createFileRoute("/geofag-1/platetektonikk")({
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
      videoTopic="platetektonikk"
      prev={{
        to: "/geofag-1/jordsystemene",
        label: "Forrige: Jordsystemene",
      }}
      next={{
        to: "/geofag-1/vulkaner-og-jordskjelv",
        label: "Neste: Vulkaner og jordskjelv",
      }}
    >
      <OrdBoks ord="litosfære" barn="skorpe + øvre stive mantel, delt i plater" />
      <OrdBoks ord="astenosfære" barn="mykere sone platene glir på" />

      <p>
        Platene beveger seg fordi mantelen har langsomme strømmer. De kalles konveksjon og drives av
        varme fra jordas indre. Farten er noen centimeter i året, langsommere enn neglene vokser. Den
        midtatlantiske ryggen sprer i gjennomsnitt om lag 2,5 cm per år. Øst-Stillehavsryggen over 15
        cm per år. GPS viser at dagens retning og fart stemmer med mønsteret over millioner av år.
      </p>
      <OrdBoks ord="konveksjon" barn="langsomme mantelstrømmer drevet av indre varme" />

      <p>
        Kontinental skorpe er vanligvis 30–50 km tykk og har lav tetthet. Havbunnsskorpe er 5–7 km
        tykk, tettere, og ingen er eldre enn 175 millioner år. Jorda har ikke endret størrelse
        vesentlig. Ny skorpe ved ryggene krever at skorpe ødelegges ved subduksjon.
      </p>
      <OrdBoks ord="subduksjon" barn="tettere havbunn synker under en annen plate" />

      <PlatesMapDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fire typer plategrenser
      </h2>
      <p>
        Divergerende grense: platene glir fra hverandre. Magma stiger, avkjøles og blir basaltisk
        havbunn. Island ligger på Den midtatlantiske ryggen: sprekker, lava og rifting. Jan Mayen
        ligger i samme ryggsystem.
      </p>
      <SpreadingDiagram />
      <p>
        Konvergerende grense, hav mot kontinent: havbunnen er tettere og synker inn under
        kontinentet. Det kalles subduksjon. Trykk og temperatur øker. Berg kan smelte, og magma
        stiger. Vulkaner og dype jordskjelv. Andes er typeeksempelet.
      </p>
      <SubductionDiagram />
      <p>
        Konvergerende grense, kontinent mot kontinent: ingen av platene vil synke. Skorpa tykkes til
        mer enn 70 km, som i Himalaya der India møter Asia. Fjell, foldning og skyvedekker.
        Kaledonidene er Norges fossile versjon.
      </p>
      <p>
        Transformgrense: platene glir sidelengs. Det lages ikke ny skorpe, og det ødelegges heller
        ikke skorpe. San Andreas beveger seg om lag 5 cm per år. På havbunn forskyver transformene
        ryggen i sikksakk. Jordskjelv, lite vulkanisme.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva det har gjort med Norge
      </h2>
      <p>
        Norge ligger inne på den eurasiske platen, ikke på en aktiv plategrense. Grensen er
        midthavsryggen vest for oss. Norge er likevel blant de mest skjelvaktive områdene i
        Nord-Europa. Bare et fåtall skjelv har gitt bygningsskade. Det er intraplate-skjelv: gamle
        forkastninger som reaktiveres, landheving etter istiden, og spredning i Norskehavet som
        setter platen under strekk.
      </p>
      <p>
        Oslofeltet er en død rift, en paleorift. For om lag 310 millioner år siden sprakk skorpa opp
        fra Skagerrak til Østerdalen. I perm: riftdal, strekk, store forkastninger og vulkaner. I
        dag ser vi graben, lava og dypbergart, og forkastningskanter mot grunnfjellet. Det er
        konsekvens av gammel indre bevegelse, ikke en aktiv plategrense.
      </p>
      <p>
        Kaledonidene ble til for 400–500 millioner år siden, da landområder i dagens Europa
        kolliderte med Amerika og Grønland. Store bergflak ble skjøvet som skyvedekker. Fjellene du
        går i, er erodert rot. Is og elv har skåret i kaledonsk struktur. De har ikke bygd den.
      </p>
      <p>
        Jan Mayen ligger på ryggsystemet i Norskehavet. Ny havbunn, jordskjelv langs ryggen,
        vulkaner. Beerenberg er Norges eneste aktive vulkan over havet, 2272 meter. Siste utbrudd i
        1985.
      </p>
      <p>
        Etter istiden reiste litosfæren seg. Det kalles isostasi. Marine avsetninger som ble lagt i
        fjord, ligger nå over havnivå. Marin grense er 0–220 m.
      </p>

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
    </TopicLayout>
  );
}
