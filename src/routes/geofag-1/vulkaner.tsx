import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  CalderaFormationDiagram,
  HotspotPlumeDiagram,
  VolcanicHazardsDiagram,
  VolcanoEruptionAnatomyDiagram,
  VolcanoTypesDiagram,
} from "@/components/diagrams";
import { VolcanoModel } from "@/components/models/volcano-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("vulkaner")!;

export const Route = createFileRoute("/geofag-1/vulkaner")({
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  shouldReload: true,
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("vulkaner") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/vulkaner",
    }),
  component: VulkanerPage,
});

function VulkanerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Vulkanutbrudd er jordens mest spektakulære og energirike overflateprosess. Hvorfor flyter lavaen rolig som rødglødende elver på Hawaii og Island, mens Pinatubo og Vesuv eksploderer med ufattelig kraft og mørklegger himmelen? Svaret ligger i magmaens kjemiske oppbygning: silikatinnhold, viskositet og innestengt gass. Her utforsker vi magmafysikken, de fire vulkantypene, pliniansk erupsjonsdynamikk, overvåkingsteknologi og Norges egen aktive vulkan — Beerenberg på Jan Mayen."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/platetektonikk",
        label: "Forrige: Platetektonikk",
      }}
      next={{
        to: "/geofag-1/jordskjelv",
        label: "Neste: Jordskjelv og tsunamier",
      }}
      kilder={KILDER.vulkaner}
      posterSlug="vulkaner"
      post={post}
      bodyMode="scan"
    >
      <Callout title="Kompetansemål i Geofag 1 (LK20)">
        <p>{tema.maal}</p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Jordens indre prosesser:</em> Magmadannelse, silikatkjemi, viskositet og gassoppløsning (Henrys lov).</p>
          <p>• <em>Landformer og geomorfologi:</em> Skjoldvulkaner, stratovulkaner, sinderkjegler og kalderakollaps.</p>
          <p>• <em>Geofarer og samfunnssikkerhet:</em> Pyroklastiske strømmer (PDC), laharer, vulkansk aske i luftfart, vulkansk vinter og tidlig varsling.</p>
        </div>
      </Callout>

      {/* SEKSJON 1: INTRODUKSJON */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordens indre termiske motor og dynamiske overflate
        </h2>
        <p>
          Vår planet er en termisk varmemaskin. Dypt inne i mantelen og kjernen opprettholdes temperaturer på flere
          tusen grader celsius gjennom to fundamentale kilder: primordial varme (restvarme fra jordens akkresjon og
          differensiering for 4,54 milliarder år siden) og radiogen varme fra radioaktiv spalting av ustabile isotoper
          (særlig uran-238, uran-235, thorium-232 og kalium-40). Denne enorme varmen kan ikke overføres til verdensrommet
          gjennom ren varmeledning alene; i stedet drives langsomme konveksjonsstrømmer i astenosfæren og den dype mantelen.
        </p>
        <p>
          På overflaten flyter litosfæreplatene oppå denne seige mantelen. Der platene glir fra hverandre, kolliderer eller
          skjærer forbi hverandre, konsentreres smelting og magmatisme. Vulkanisme er selve ventilasjonssystemet:
          oppstigning og utbrudd av smeltet stein (magma), faste krystaller og oppløste flyktige gasser fra mantelen eller
          skorpen til jordoverflaten.
        </p>
        <p>
          For å forstå hvorfor enkelte vulkaner spyr ut fredelige lavabekker mens andre eksploderer med global slagkraft,
          må vi dykke ned i magmaens underliggende fysikk og kjemiske oppbygning.
        </p>
      </section>

      {/* SEKSJON 2: MAGMAKJEMI OG VISKOSITET */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Magmakjemi, silikatinnhold (SiO₂) og viskositet: Nøkkelen til eksplosivitet
        </h2>
        <p>
          Hva avgjør om et vulkanutbrudd blir en rolig strøm av flytende stein (effusivt) eller en altødeleggende
          eksplosjon som mørklegger himmelen i månedsvis? Svaret ligger i to sammenkoblede faktorer:
          <strong className="text-foreground"> magmaens viskositet</strong> og dens
          <strong className="text-foreground"> innhold av oppløste gasser</strong>.
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Silikatpolymerisering og væskens indre friksjon
        </h3>
        <p>
          Viskositet er et mål på en væskes motstand mot å flyte. I en silikatsmelte er det grunnleggende byggeelementet
          silikat-tetraederet [SiO₄]⁴⁻, der et sentralt silisiumatom er kovalent bundet til fire oksygenatomer.
          Når silisiuminnholdet i magmaen øker, begynner tetraedrene å dele oksygenatomer i hjørnene og danner lange,
          forgrenede polymerkjeder og tredimensjonale nettverk. Dette øker væskens indre friksjon kolossalt:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-2 font-semibold">Magmatype</th>
                <th className="pb-2 font-semibold">SiO₂-innhold</th>
                <th className="pb-2 font-semibold">Temperatur</th>
                <th className="pb-2 font-semibold">Viskositet (Pa·s)</th>
                <th className="pb-2 font-semibold">Utbruddsstil</th>
                <th className="pb-2 font-semibold">Typisk miljø</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              <tr>
                <td className="py-2.5 font-medium text-emerald-400">Basaltisk (mafisk)</td>
                <td className="py-2.5">45–52 %</td>
                <td className="py-2.5">1050–1200 °C</td>
                <td className="py-2.5 font-mono">10¹–10² (tyntflytende)</td>
                <td className="py-2.5">Effusiv (lavastrømmer, fontener)</td>
                <td className="py-2.5">Midthavsrygg, Island, Hawaiiske hotspoter</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-teal-400">Andesittisk (intermediær)</td>
                <td className="py-2.5">52–63 %</td>
                <td className="py-2.5">850–1050 °C</td>
                <td className="py-2.5 font-mono">10³–10⁵ (moderat seig)</td>
                <td className="py-2.5">Eksplosiv til sammensatt</td>
                <td className="py-2.5">Subduksjonssoner (vulkanbuer)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-rose-400">Ryolittisk / Dasittisk (felsisk)</td>
                <td className="py-2.5">&gt;63 % (opptil 75 %)</td>
                <td className="py-2.5">700–850 °C</td>
                <td className="py-2.5 font-mono">10⁷–10¹¹ (ekstremt seig)</td>
                <td className="py-2.5">Svært eksplosiv (pliniansk, kaldera)</td>
                <td className="py-2.5">Kontinental skorpesmelting, supervulkaner</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Henrys lov og gassutskilling (eksolusjon)
        </h3>
        <p>
          Dypt nede i jordskorpen står magmakammeret under et enormt lithostatisk overlagstrykk. Ifølge
          <strong className="text-foreground"> Henrys lov</strong> er løseligheten av en gass i en væske direkte
          proporsjonal med partielt trykk. I dypet kan magmaen derfor holde mange vektprosent flyktige stoffer
          (særlig H₂O-damp, CO₂, SO₂, H₂S og HCl) fullstendig oppløst i smelten.
        </p>
        <p>
          Når magmaen stiger oppover i tilførselskanalen, synker omgivelsestrykket. Løselighetsgrensen overskrides,
          og gassene begynner å felle seg ut som bittesmå gassbobler (en prosess kalt <em>vesikulasjon</em> eller
          <em> eksolusjon</em>; Sparks, 1978).
        </p>
        <p>
          Her inntreffer det avgjørende kjemiske veiskillet:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-emerald-400 text-sm">I basaltisk magma (lav viskositet)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              De oppløste gassboblene stiger raskt til toppen og unnslipper lett gjennom den tyntflytende smelten.
              Gassen forlater vulkanen kontinuerlig i form av damp og rolige gassoppstøt. Utbruddet blir
              <strong> effusivt</strong>: rødglødende lavastrømmer flyter rolig nedover fjellsiden, eller danner
              spektakulære, men ufarlige lavafontener.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">I ryolittisk magma (høy viskositet)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Den ekstreme viskositeten og de stive silikatnettverkene hindrer boblene i å migrere. Boblene fanges
              i smelten mens trykket inni dem øker voldsomt under dekompresjon. Smelten omdannes til et skum med
              ekstremt innestengt gasspotensial. Når gassvolumet overstiger om lag 75 %, sprenges smelten i stykker
              ved fragmenteringsnivået — resultatet er en katastrofal <strong>eksplosjon</strong>.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Viskositet"
          barn="Et mål på hvor seig eller tyntflytende en væske er. Basaltisk lava er tyntflytende som varm sirup; ryolittisk lava er så seig at den knapt kan bevege seg uten å sprekke opp."
        />
        <OrdBoks
          ord="Eksolusjon"
          barn="Utskilling av oppløst gass som bobler (vesikler) fra en væske når trykket faller, tilsvarende det som skjer når du åpner en ristet brusflaske."
        />
      </section>

      {/* SEKSJON 3: VULKANTYPER OG GEOMORFOLOGI */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Vulkantyper og geomorfologi: Hvordan magmakjemien bygger landformer
        </h2>
        <p>
          Magmaens egenskaper bestemmer ikke bare utbruddenes voldsomhet, men setter et uutslettelig preg på selve
          vulkanbygningens form og geometri. Vi skiller mellom tre hovedkategorier av vulkaner, i tillegg til de enorme
          innsynkningsstrukturene kalt kalderaer.
        </p>

        <VolcanoTypesDiagram />

        <PhotoFigure
          src="/images/geo-vulkantyper-3d.jpg"
          alt="3D-sammenligning av de fire vulkantypene: skjoldvulkan, stratovulkan, sinderkjegle og kaldera"
          heading="3D-geometri og dimensjoner: De fire vulkantypene"
          caption="Vulkanbygningens form gjenspeiler direkte magmaens kjemiske viskositet og gassinnhold. Skjoldvulkaner (slak helling 2–10°, basalt) dekker enorme arealer. Stratovulkaner (bratt helling 25–35°, andesitt/dasitt) er høyreiste og lagdelte. Sinderkjegler (scoria cones) er små kjegler av slagg og pimpstein. Kalderaer er gigantiske innsynkningskratere etter magmakammertak som kollapser."
          marks={[
            { x: 18, y: 55, n: "1", text: "Skjoldvulkan", tone: "cold" },
            { x: 44, y: 38, n: "2", text: "Stratovulkan", tone: "warm" },
            { x: 70, y: 55, n: "3", text: "Sinderkjegle", tone: "cold" },
            { x: 88, y: 48, n: "4", text: "Kaldera", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Skjoldvulkan (f.eks. Mauna Loa): Ekstremt bred fot og slak profil bygd opp av titusenvis av tynne basaltiske lavastrømmer." },
            { n: "2", label: "Stratovulkan (f.eks. Fuji, St. Helens og Beerenberg): Bratt, symmetrisk kjegle oppbygd av vekslende lag av seig lava og tefra." },
            { n: "3", label: "Sinderkjegle (scoria cone): Sjelden over 300 m høy; dannet ved eksplosiv utblåsing av basaltiske gassfontener." },
            { n: "4", label: "Kaldera (f.eks. Yellowstone og Toba): Enorm innsynkning der jordskorpetaket har rast sammen ned i magmakammeret." },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-3 pt-2">
          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-warm text-sm">1. Skjoldvulkaner</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Enorme, flate og hvelvede fjellmasser som minner om et liggende krigerskjold.
              Skråningsvinkelen er meget slak, typisk bare 2° til 10°.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Mates av basaltisk lava med lav viskositet som strømmer titalls kilometer
              før den størkner. Bygges opp lag for lag av tusenvis av tynne lavadekker.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempler:</strong> Mauna Loa og Kilauea på Hawaii. Mauna Loa rager over 9000 meter fra
              havbunnen og er jordens mest voluminøse aktive fjell!
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-rose-400 text-sm">2. Stratovulkaner (sammensatte)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Klassiske, symmetriske og bratte kjegler med skråningsvinkel på 25° til 35°.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Bygges opp av vekslende lag (strata) av herdet seig lava, vulkansk aske,
              pimpstein og tefra fra eksplosive utbrudd. Den seige andesittiske magmaen flyter sjelden langt, men danner
              propper og kupler nær toppen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempler:</strong> Mount Fuji i Japan, Vesuv i Italia, Mount St. Helens i USA,
              Pinatubo på Filippinene, og Norges Beerenberg på Jan Mayen.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-sand text-sm">3. Sinderkjegler (scoria cones)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Mindre, bratte kjegleformede hauger (sjelden over 300–400 meter høye) med en markert
              kraterfordypning i toppen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Dannet ved korte, gassdrevne utbrudd der basaltiske lavafontener slynger
              glødende slagg og sinder opp i luften. Fragmentene størkner i flukten og danner en rasvinkel-stabil haug
              rundt krateråpningen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempel:</strong> Parícutin i Mexico, som vokste opp midt på en kornåker i 1943.
            </p>
          </div>
        </div>

        <h3 className="pt-4 font-display text-xl font-medium tracking-tight text-primary">
          Kalderaer og supervulkaner: Takkollaps i gigantskala
        </h3>
        <p>
          Mange forveksler et vulkankrater med en <em>kaldera</em>. Et krater er en utblåsningsåpning dannet ved erosjon
          og eksplosiv utslynging fra tilførselsrøret. En kaldera, derimot, er en kolossal innsynkningsgryte som oppstår
          når et gigantisk magmakammer tømmes så raskt under et katastrofalt utbrudd at taket i jordskorpen mister all
          mekanisk understøttelse og raser loddrett ned.
        </p>

        <CalderaFormationDiagram />

        <p>
          Kalderaer spenner fra få kilometer i diameter (som Crater Lake i Oregon etter Mazamas utbrudd for 7700 år siden,
          eller Santorini i Hellas ca. 1600 f.Kr.) til titalls kilometer brede strukturer (som Toba på Sumatra og
          Yellowstone i USA). Slike gigantiske utbrudd klassifiseres ofte som supervulkaner (VEI 8) og har potensial til
          å endre jordens biosfære og klima fundamentalt.
        </p>

        <OrdBoks
          ord="Kaldera"
          barn="En stor, sirkulær innsynkningsfordypning i jordskorpen (ofte 5–50 km bred) som oppstår når taket over et delvis tømt magmakammer kollapser."
        />
      </section>

      {/* SEKSJON: INTRAPLATEVULKANISME OG HOTSPOTS */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Intraplatevulkanisme: Hotspots og dype mantelplymer
        </h2>
        <p>
          Ikke all vulkansk aktivitet kan forklares av plategrenser. Noen av planetens mest massive vulkanske strukturer –
          som Hawaii og Yellowstone – oppstår midt inne på litosfæreplater, tusenvis av kilometer fra nærmeste midthavsrygg
          eller subduksjonssone.
        </p>
        <p>
          I 1963 foreslo den kanadiske geofysikeren J. Tuzo Wilson at disse vulkanene skyldes stasjonære{" "}
          <strong>«hotspots»</strong> (varmeflekker) dypt i mantelen. Senere påviste Jason Morgan at hotspots er
          overflateuttrykket for <strong>mantelplymer</strong>: smale søyler av overopphetet bergart som stiger helt fra{" "}
          <strong>D&apos;&apos;-laget (kjerne-mantel-grensen på 2900 km dyp)</strong>.
        </p>
        <p>
          Fordi mantelplymen er forankret så dypt nede ved jordkjernen, står den tilnærmet i ro over titalls millioner år.
          Mens litosfæreplaten glir sakte forbi over plymen, brenner den en perlerad av vulkanske øyer inn i havbunnen:
        </p>

        <HotspotPlumeDiagram />

        <ul className="list-disc space-y-2 pl-6 text-foreground/90 text-sm">
          <li>
            <strong>Hawaii-Emperor-ryggen:</strong> Den aktive vulkanismen (Kilauea og Mauna Loa) ligger rett over
            hotspoten i dag (0 Ma). Jo lenger nordvestover langs øykjeden du reiser, desto eldre og mer eroderte er øyene:
            Maui (1 Ma), Oahu (3 Ma), Kauai (5 Ma) og Midway (28 Ma).
          </li>
          <li>
            <strong>Den berømte 47 Ma-knekken:</strong> For ca. 47 millioner år siden gjør vulkankjeden en skarp 60-graders
            knekk fra nord-nordvest til vest-nordvest. Dette er et direkte geologisk bevis på at Stillehavsplaten brått
            endret bevegelsesretning!
          </li>
          <li>
            <strong>Island – en unik kombinasjon:</strong> Island er spesiell fordi en kraftig mantelplym ligger nøyaktig
            under Den midtatlantiske ryggen. Kombinasjonen av dekompresjonssmelting fra ryggspredningen og ekstraordinær
            termisk oppvarming fra plymen har produsert så enorme mengder basalt at skorpen her er over 35–40 km tykk,
            og rager høyt over havoverflaten.
          </li>
        </ul>

        <OrdBoks
          ord="Hotspot (varmeflekk)"
          barn="Et vulkansk område på jordoverflaten som mates av en oppstigende mantelplym fra jordens dype mantel (D''-laget). Hotspoten står tilnærmet i ro mens litosfæreplaten glir forbi, noe som danner en rekke av vulkanske øyer med økende alder."
        />
      </section>

      {/* SEKSJON 4: ANATOMI AV ET PLINIANSK UTBRUDD */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Anatomi av et pliniansk utbrudd: Fra fragmentering til paraplysky
        </h2>
        <p>
          Begrepet <em>pliniansk utbrudd</em> er oppkalt etter den romerske forfatteren Plinius den yngre, som i to berømte
          brev til historikeren Tacitus beskrev Vesuvs ødeleggelse av Pompeii og Herculaneum i år 79 e.Kr. Plinius sammenlignet
          askesøylen med en pinje (italiensk furu): en loddrett, tynn stamme som forgrener seg høyt oppe på himmelen.
        </p>

        <VolcanoEruptionAnatomyDiagram />

        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          De fire fasene i en pliniansk utbruddssøyle
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Fragmenteringsnivået (z_f):</strong> Dypt i tilførselsrøret (ofte 1–4 km under overflaten)
            overskrider gassblærenes ekspansjonstrykk smeltenes elastiske strekkfasthet. Den sammenhengende væsken rives
            i stykker og forvandles i en brøkdel av et sekund til en turbulent gass-partikkel-suspensjon bestående av gass,
            pimpstein og glassaktig mikroaske (Sparks, 1978).
          </li>
          <li>
            <strong className="text-foreground">Gass-skyvesonen (gas-thrust region):</strong> I de laveste hundre meterne over
            krateret drives blandingen utelukkende av det enorme overtrykket i tilførselsrøret. Aske og blokker slynges ut
            i overlydshastighet (opptil 200–600 m/s).
          </li>
          <li>
            <strong className="text-foreground">Konvektiv oppdriftssone (convective thrust):</strong> Når utbruddsstrålen suger
            inn kald omgivelsesluft, varmes luften brått opp til flere hundre grader. Luften ekspanderer, tettheten til blandingen
            blir lavere enn den omkringliggende atmosfæren, og søylen stiger oppover som en gigantisk termisk varmluftsballong.
            Konveksjonen kan løfte asken opp i en høyde på 20 til 45 kilometer — tvers gjennom troposfæren og dypt inn i stratosfæren!
          </li>
          <li>
            <strong className="text-foreground">Paraplyskyen (umbrella cloud):</strong> Når søylen når en høyde der dens tetthet
            tilsvarer atmosfærens egen tetthet (nøytralt oppdriftsnivå), stanser den vertikale stigningen. Askeskyen brer seg
            ut horisontalt i form av en gigantisk paraply og transporteres over kontinentale avstander av stratosfæriske vinder.
          </li>
        </ol>

        <PhotoFigure
          src="/images/geo-pliniansk-anatomi.jpg"
          alt="3D-tverrsnitt av pliniansk erupsjon med fragmenteringsnivå, konvektiv søyle, paraplysky, PDC og lahar"
          heading="Pliniansk utbruddsdynamikk: Den eksplosive gass- og askemotoren"
          caption="Når seig, gassmettet magma stiger mot overflaten, når den fragmenteringsnivået (zf) der overtrykket i vesiklene river smelten i stykker. Blandingen skytes ut som en overlydsstråle, suger inn luft og stiger konvektivt som en 15–35 km høy søyle som brer seg ut som en paraplysky i stratosfæren. Dersom tettheten blir for høy, kollapser søylen og sender dødelige pyroklastiske tetthetsstrømmer (PDC) nedover sidene, mens smeltevann utløser laharer."
          marks={[
            { x: 50, y: 15, n: "1", text: "Paraplysky (stratosfæren)", tone: "cold" },
            { x: 50, y: 42, n: "2", text: "Konvektiv askesøyle", tone: "warm" },
            { x: 28, y: 72, n: "3", text: "Pyroklastisk strøm (PDC)", tone: "warm" },
            { x: 74, y: 76, n: "4", text: "Lahar (slamstrøm)", tone: "cold" },
            { x: 50, y: 92, n: "5", text: "Magmakammer & zf", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Paraplysky: Asken sprer seg sideveis ved det nøytrale oppdriftsnivået i stratosfæren og føres jorden rundt med jetstrømmene." },
            { n: "2", label: "Konvektiv søyle: Oppvarmet luft gjør gass-aske-blandingen lettere enn atmosfæren, og løfter den titalls kilometer opp." },
            { n: "3", label: "PDC (Pyroklastisk tetthetsstrøm): Delvis kollaps av søylen genererer en glohet askelavine i 200–700 km/t." },
            { n: "4", label: "Lahar: Vulkansk slamstrøm utløst ved smelting av snø og is eller regnvær; flyter som våt betong i dalbunnene." },
            { n: "5", label: "Fragmenteringsnivå: Overgang fra sammenhengende magma til opprevet gass-partikkel-suspensjon." },
          ]}
        />

        {/* KASUSSTUDIE 1: EYJAFJALLAJÖKULL 2010 */}
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            Kasusstudie: Eyjafjallajökull 2010 og europeisk flystans (freatomagmatisme)
          </h3>
          <p>
            Våren 2010 ble et relativt moderat vulkanutbrudd (VEI 4) på Island til den mest kostbare naturkatastrofen for
            sivil luftfart i historien. Over 100 000 flyvninger ble kansellert, og 10 millioner reisende ble strandet over hele kloden
            (Gíslason et al., 2011). Hvorfor fikk et mellomstort utbrudd så enorme konsekvenser?
          </p>

          <PhotoFigure
            src="/images/geo-eyjafjallajokull-aske.jpg"
            alt="Eyjafjallajökulls subglasiale utbrudd i 2010 med freatomagmatisk askesky og jökulhlaup"
            heading="Eyjafjallajökull 2010: Freatomagmatisme og kontinental flystans"
            caption="Da intermediær trakyandesittisk magma (SiO₂ ~58 %) brøt gjennom den 200 meter tykke isbreen på Eyjafjallajökull, eksploderte blandingen i kontakt med smeltevann (freatomagmatisme, Gíslason et al., 2011). Termisk sjokk knuste smelten til ekstremt finkornet, glassaktig aske (< 10 µm). En stabil høytrykksrygg førte askeskyen rett mot Sør-Norge og Nord-Europa, der partiklene truet med å smelte og stanse flyenes jetmotorer."
            marks={[
              { x: 48, y: 22, n: "1", text: "Freatomagmatisk fane", tone: "cold" },
              { x: 32, y: 72, n: "2", text: "Subglasialt krater", tone: "warm" },
              { x: 68, y: 78, n: "3", text: "Jökulhlaup (flom)", tone: "cold" },
            ]}
            points={[
              { n: "1", label: "Freatomagmatisk askesky: Ekstremt finkornede silikat-glasspartikler med skarpe kanter som holdt seg svevende over tusenvis av kilometer." },
              { n: "2", label: "Subglasialt krater: Smelting av 200 meter isbre forårsaket kontinuerlig dampeksplosjoner og termisk sjokkoppsprekking." },
              { n: "3", label: "Jökulhlaup: Voldsom flom av brevann, slam og isblokker som feide over islandske sandsletter mot Atlanterhavet." },
            ]}
          />

          <p>
            Tre geofysiske faktorer sammenfalt:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">1. Freatomagmatisme (vann-magma-interaksjon):</strong> Magmaen trengte opp
              gjennom en 200 meter tykk kaldeisbre. Det overopphetede smeltevannet fungerte som en termisk sjokk-katalysator:
              Smelten ble bråkjølt og sprengt i ufattelig mange ørsmå, skarpe glasspartikler (&lt; 10 mikrometer).
            </li>
            <li>
              <strong className="text-foreground">2. Høy svevetid og jetmotor-fare:</strong> Partiklene var så lette at de
              ikke falt ut lokalt, men svevde over kontinentale avstander. Silikatglass har et smeltepunkt på ~1100 °C, mens
              forbrenningskamrene i moderne jetmotorer opererer ved over 1400–1700 °C! Når jetmotorer suger inn vulkansk aske,
              smelter glasset momentant i brennkammeret og størkner igjen som en glassglasur på turbinbladene, noe som kveler
              luftstrømmen og fører til full motorstans.
            </li>
            <li>
              <strong className="text-foreground">3. Meteorologiske jetstrømmer:</strong> Et vedvarende blokkerende høytrykk
              over Nord-Atlanteren styrte luftstrømmene i en uavbrutt korridor fra Island, over Nordsjøen, inn over Norge og
              tvers over det sentraleuropeiske luftrommet.
            </li>
          </ul>
        </div>

        {/* KASUSSTUDIE 2: FAGRADALSFJALL OG REYKJANES */}
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            Kontrast: Fagradalsfjall og Reykjanes — Effusiv sprekkevulkanisme
          </h3>
          <p className="text-sm text-muted-foreground">
            Som en dramatisk kontrast til Eyjafjallajökulls eksplosive askesky står de nyere utbruddene på Reykjanessk полуøya
            (Fagradalsfjall 2021–2023 og Sundhnúkur 2023–2024). Her stiger primitiv basaltisk mantelmagma (SiO₂ ~48 %)
            opp langs kilometerlange strekkforkastninger (sprekker) uten kontakt med isbreer.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 pt-1">
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-emerald-400 text-sm">Fagradalsfjall (VEI 0–1)</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Tyntflytende basaltisk magma avgasser rolig i fontener og lavastrømmer. Null aske i stratosfæren,
                ingen fare for sivil luftfart, men lokal trussel mot infrastruktur og bebyggelse (som Grindavík).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-rose-400 text-sm">Hovedforskjellen</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Magmakjemien og miljøet: Eyjafjallajökull hadde seig andesitt under en isbre (freatomagmatisme = eksplosjon),
                mens Fagradalsfjall har lavviskøs basalt på tørt land (effusiv lavaflod = lav eksplosivitet).
              </p>
            </div>
          </div>
        </div>

        {/* VEI-TABELL */}
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            VEI: Vulkansk eksplosivitetsindeks (0 til 8)
          </h3>
          <p className="text-sm text-muted-foreground">
            For å kvantifisere styrken på vulkanutbrudd innførte Chris Newhall og Steve Self i 1982 den logaritmiske
            <strong> Volcanic Explosivity Index (VEI)</strong>. Hvert trinn over VEI 1 representerer en tidobling i volumet av
            utkastet tefra (Newhall &amp; Self, 1982):
          </p>

          <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 font-semibold">VEI</th>
                  <th className="pb-2 font-semibold">Tefravolum</th>
                  <th className="pb-2 font-semibold">Søylehøyde</th>
                  <th className="pb-2 font-semibold">Klassifisering</th>
                  <th className="pb-2 font-semibold">Frekvens globalt</th>
                  <th className="pb-2 font-semibold">Kjente eksempler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                <tr>
                  <td className="py-2 font-bold text-emerald-400">0</td>
                  <td>&lt; 10 000 m³</td>
                  <td>&lt; 100 m</td>
                  <td>Hawaiisk (effusiv)</td>
                  <td>Konstant</td>
                  <td>Kilauea, Fagradalsfjall (Island)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-emerald-400">1</td>
                  <td>&gt; 10 000 m³</td>
                  <td>0,1–1 km</td>
                  <td>Hawaiisk / Strombolsk</td>
                  <td>Daglig</td>
                  <td>Stromboli (Italia)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-teal-400">2</td>
                  <td>&gt; 1 mill. m³</td>
                  <td>1–5 km</td>
                  <td>Strombolsk / Vulkansk</td>
                  <td>Ukentlig</td>
                  <td>Galeras (Colombia)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-teal-400">3</td>
                  <td>&gt; 10 mill. m³</td>
                  <td>3–15 km</td>
                  <td>Vulkansk / Sub-pliniansk</td>
                  <td>Månedlig</td>
                  <td>Nevado del Ruiz (1985)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-amber-400">4</td>
                  <td>&gt; 0,1 km³</td>
                  <td>10–25 km</td>
                  <td>Sub-pliniansk / Pliniansk</td>
                  <td>~1 per år</td>
                  <td>Eyjafjallajökull (2010)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-orange-400">5</td>
                  <td>&gt; 1 km³</td>
                  <td>20–35 km</td>
                  <td>Pliniansk</td>
                  <td>~1 per 12 år</td>
                  <td>Mount St. Helens (1980), Vesuv (79)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-rose-400">6</td>
                  <td>&gt; 10 km³</td>
                  <td>&gt; 30 km</td>
                  <td>Ultra-pliniansk / Kaldera</td>
                  <td>~1 per 100 år</td>
                  <td>Pinatubo (1991), Krakatau (1883)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-rose-500">7</td>
                  <td>&gt; 100 km³</td>
                  <td>&gt; 35 km</td>
                  <td>Super-kolossal / Kaldera</td>
                  <td>~1 per 1000 år</td>
                  <td>Tambora (1815), Santorini (~1600 f.Kr.)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-purple-400">8</td>
                  <td>&gt; 1000 km³</td>
                  <td>&gt; 45 km</td>
                  <td>Mega-kolossal (Supervulkan)</td>
                  <td>~1 per 50 000 år</td>
                  <td>Toba (74 000 år siden), Yellowstone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* VULKANOVERVÅKING */}
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            Vulkanovervåking og tidlig varsling (Early Warning Systems)
          </h3>
          <p className="text-sm text-muted-foreground">
            I motsetning til jordskjelv – som opptrer plutselig uten sikre forvarsler – gir vulkaner nesten alltid
            tydelige fysiske og kjemiske signaler uker eller måneder før et utbrudd (Sigurdsson et al., 2015).
            Moderne vulkanobservatorier overvåker fire uavhengige parametere:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-sky-400 text-sm">1. Seismisk tremor og jordskjelvsvermer</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Når magma bryter seg oppover gjennom skorpen, sprekker fjellet opp i tusenvis av små skjelv (vulkano-tektoniske
                skjelv). Når magma og gasser strømmer turbulent gjennom sprekker, oppstår en kontinuerlig, lavfrekvent resonanslyd
                kalt <strong>harmonisk tremor (1–5 Hz)</strong>. Tremor er det sikreste akustiske tegnet på magma i bevegelse.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-emerald-400 text-sm">2. GNSS, InSAR og bakkedeformasjon</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Når magmakammeret fylles, utvider det seg som en ballong (Mogi-modell). Fjellflankene buler utover og hever seg
                med millimeter til titalls centimeter. Dette måles i sanntid med høypresisjons-GNSS på bakken, elektroniske tiltmetere
                og satellitt-radarinterferometri (InSAR).
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-amber-400 text-sm">3. Gassfluks (SO₂ og CO₂ spektrometri)</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Oppstigende magma avgasser flyktige stoffer ved trykkfall. Optiske spektrometere (DOAS) og mobile Multi-GAS-instrumenter
                måler tonnasjen av svoveldioksid (SO₂) og karbondioksid (CO₂). En brå økning i SO₂-fluks betyr at magmaen har nådd
                overflatenære dyp (&lt; 2–3 km).
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-rose-400 text-sm">4. Termografi og satellittovervåking</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Infrarøde satellittkameraer (MODIS, Sentinel) og bakkebaserte varmekameraer oppdager termiske anomalier
                (oppvarming av kraterbunner, sprekker og fumaroler) før synlig magma når dagslys.
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Dataene integreres i det internasjonale <strong>Aviation Colour Code-systemet</strong> (Grønn, Gul, Oransje, Rød)
            som administreres av ICAO, og utløser formelle VONA-varsler (Volcano Observatory Notice for Aviation) som lar flyselskap
            omdirigere flygninger før askeskyen treffer luftkorridorene.
          </p>
        </div>
      </section>

      {/* SEKSJON 5: VULKANSKE FARER OG KLIMAPÅVIRKNING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Vulkanske farer og global klimapåvirkning
        </h2>
        <p>
          I populærkulturen framstilles glødende lavastrømmer ofte som den fremste trusselen mot mennesker. I virkeligheten
          forårsaker lavastrømmer under 2 % av alle historiske vulkandødsfall, ettersom lava beveger seg langsomt nok
          (typisk få km/t) til at sivilbefolkningen kan evakueres til fots. De virkelige katastrofene skyldes helt andre mekanismer.
        </p>

        <VolcanicHazardsDiagram />

        <div className="space-y-3 pt-2">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            1. Pyroklastiske tetthetsstrømmer (PDC) — Naturens dødeligste storm
          </h3>
          <p>
            Dersom utbruddsraten øker så kraftig at askesøylen blir for tung og kald til å opprettholde konvektiv oppdrift,
            kollapser deler av søylen loddrett ned mot vulkanflanken. Dette genererer en
            <strong className="text-foreground"> pyroklastisk tetthetsstrøm</strong> (PDC, ofte kalt glødende askeskyer
            eller <em>nuée ardente</em>).
          </p>
          <p>
            En PDC er en fluidisert, turbulent lavine av overopphetet gass, pimpstein og pulverisert stein som suser nedover
            fjellsiden i hastigheter mellom <strong>200 og 700 km/t</strong> med temperaturer på <strong>300 til 800 °C</strong>.
            Ingen bil eller person kan rømme fra en slik strøm. Ved utbruddet på Mont Pelée på Martinique i 1902 utslettet en PDC
            byen Saint-Pierre på under to minutter; samtlige av byens 29 000 innbyggere (bortsett fra to overlevende) omkom av
            termisk sjokk og kvelning. Det var også en PDC som forseglet Pompeii i år 79 e.Kr.
          </p>

          <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
            2. Laharer — Vulkanske slamstrømmer med betongkraft
          </h3>
          <p>
            En <em>lahar</em> er en hurtigflytende blanding av vulkansk aske, stein og vann som følger elvedaler bort fra
            vulkanen. De utløses når glohet tefra brått smelter snø og isbreer på toppen av høye vulkaner, eller når tropisk
            styrtregn vasker løs ferske askelag.
          </p>
          <p>
            Med en densitet på opptil 2,0 g/cm³ har en lahar konsistens og destruktiv kraft som flytende våt betong. Den river
            med seg broer, skog og betongbygninger. Tragedien i Armero i Colombia (1985) er det grelleste eksempelet: Et beskjedent
            utbrudd på den snødekte vulkanen Nevado del Ruiz smeltet bare 10 % av isbreen på toppen, men dannet fire enorme laharer
            som raste 50 km nedover dalen og begravde byen Armero. Over 23 000 mennesker mistet livet på under to timer.
          </p>

          <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
            3. Vulkansk vinter: SO₂-aerosoler og global nedkjøling
          </h3>
          <p>
            Eksplosive vulkaner har evnen til å endre jordens globale energibalanse (Robock, 2000). Mens grovkornet aske faller
            ut av atmosfæren på dager og uker, forblir svoveldioksid (SO₂) i stratosfæren. Der reagerer SO₂ med vanndamp og danner
            mikroskopiske aerosoldråper av svovelsyre (H₂SO₄). Disse aerosolene sprer og reflekterer innkommende solstråling
            tilbake til verdensrommet, noe som fører til en markant reduksjon i solinnstrålingen ved jordoverflaten.
          </p>
          <p>
            Da vulkanen Tambora i Indonesia eksploderte i april 1815 (det største utbruddet i dokumentert historie, VEI 7;
            Oppenheimer, 2003), ble 100 millioner tonn svovelaerosoler pumpet inn i stratosfæren. Året etter, 1816, ble kjent
            over hele den nordlige halvkule som <em>«året uten sommer»</em>. Frost og snøvær i juli og august ødela kornavlingene
            i Europa og Nord-Amerika, og utløste den siste store hungersnøden i vestverdenen. Da Pinatubo på Filippinene hadde utbrudd
            i 1991, falt den globale gjennomsnittstemperaturen med om lag 0,5 °C i to sammenhengende år.
          </p>
        </div>

        <OrdBoks
          ord="Pyroklastisk strøm (PDC)"
          barn="En rasende sky av glohet gass (300–800 °C), aske og steinblokker som raser nedover vulkansidene i opptil 700 km/t. Umulig å rømme fra."
        />
        <OrdBoks
          ord="Lahar"
          barn="Vulkansk slamstrøm som oppstår når aske blandes med smeltevann fra breer eller kraftig regn. Har tyngde som våt betong og begraver dalbunner."
        />
        <OrdBoks
          ord="Vulkansk vinter"
          barn="Global nedkjøling forårsaket av mikroskopiske svovelsyreaerosoler i stratosfæren som reflekterer solstråling etter store, eksplosive utbrudd."
        />
      </section>

      {/* SEKSJON 6: INTERAKTIV MODELL */}
      <section className="pt-6">
        <VolcanoModel />
      </section>

      {/* SEKSJON 7: NORSK VULKANISME */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norsk vulkanisme: Jan Mayen og Beerenberg
        </h2>
        <p>
          Det norske fastlandet har ingen aktive vulkaner i dag. Den berømte magmatismen i Oslofeltet — med rombeporfyr,
          larvikitt og basaltiske lavadekker — er en utdødd paleorift fra permtiden for nær 300 millioner år siden.
        </p>
        <p>
          Kongeriket Norge har imidlertid én aktiv vulkan over havoverflaten:{" "}
          <strong className="text-foreground">Beerenberg på Jan Mayen</strong>{" "}
          (2277 moh.). Jan Mayen ligger på en mikrokontinentalflik like ved Den midtatlantiske spredningsryggen og
          Jan Mayen-bruddsonen i Norskehavet. Beerenberg er en massiv, isbredekket{" "}
          <strong>stratovulkan</strong> som sist hadde store utbrudd i september 1970 og januar 1985, der basaltisk lava
          strømmet ut i havet og utvidet øyas landareal.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-sky-400 text-sm">Beerenberg — fakta</h4>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-4">
              <li>Høyde: 2 277 moh. — Nordeuropas høyeste aktive vulkan</li>
              <li>Type: Stratovulkan (basaltisk-hawaiisk til strombolsk utbruddsstil)</li>
              <li>Siste utbrudd: September 1970 og januar 1985</li>
              <li>Dekket av flere aktive isbreer (Weyprechtbreen, Kronprins Olavs bre)</li>
              <li>Ligger på Jan Mayen-bruddsonen ved Den midtatlantiske ryggen</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-amber-400 text-sm">Tektonisk sammenheng</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Jan Mayen befinner seg på en isolert mikroplate fanget mellom Den midtatlantiske ryggen (Kolbeinsey-ryggen
              i sør og Mohnsryggen i nord) og Jan Mayen-transformbruddsonen. Den tektoniske settingen gir en unik kombinasjon
              av havbunnsspredning og en lokal manteldiapir (hotspot) som ennå debatteres blant geofysikere
              (Norsk Polarinstitutt, u.å.).
            </p>
          </div>
        </div>
      </section>

      {/* BEGREPSREGISTER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
      <TermGrid>
        <Term name="viskositet" def="en væskes indre friksjon og motstand mot å flyte; øker dramatisk med silikatinnhold (SiO₂) og synker med temperatur" />
        <Term name="stratovulkan" def="bratt, lagdelt vulkankjegle bygd opp av vekslende lag av viskøs andesittisk lava og tefra fra eksplosive utbrudd" />
        <Term name="skjoldvulkan" def="stor, slak vulkanbygning dannet av tyntflytende basaltisk lava som flyter over store avstander før den størkner" />
        <Term name="kaldera" def="kolossal sirkulær innsynkningsstruktur i jordskorpen dannet ved at taket over et delvis tømt magmakammer raser sammen" />
        <Term name="pyroklastisk strøm (PDC)" def="overopphetet lavine av gass, aske og stein (300–800 °C) som raser nedover vulkansider med hastigheter opptil 700 km/t" />
        <Term name="lahar" def="vulkansk slamstrøm dannet når fersk tefra blandes med smeltevann fra isbreer eller kraftig nedbør; flyter som våt betong" />
        <Term name="freatomagmatisme" def="eksplosivt utbrudd forårsaket av direkte kontakt mellom stigende magma og vann eller is (f.eks. Eyjafjallajökull)" />
        <Term name="VEI" def="Volcanic Explosivity Index (0–8); logaritmisk skala for utbruddsstyrke basert på utkastet tefravolum og søylehøyde" />
        <Term name="harmonisk tremor" def="kontinuerlig lavfrekvent seismisk resonans (1–5 Hz) skapt av turbulent strømning av magma og gass i sprekker" />
        <Term name="eksolusjon" def="utskilling av oppløst gass fra magma som bittesmå bobler (vesikler) når trykket synker under oppstigning" />
        <Term name="hotspot" def="vulkansk område på jordoverflaten matet av en dyp mantelplym (f.eks. Hawaii, Yellowstone, Island)" />
        <Term name="mantelplym" def="smal søyle av overopphetet bergart som stiger fra kjerne-mantel-grensen (D'' på 2900 km dyp)" />
      </TermGrid>

      {/* QUIZ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hva er en hotspot (varmeflekk), og hva beviser Hawaii-Emperor-øykjeden med sin 47 Ma-knekk?",
            options: [
              "En hotspot er et meteorittkrater; knekken skyldes at en ny meteoritt traff 47 millioner år senere.",
              "En hotspot er en stasjonær mantelplym fra 2900 km dyp; knekken er et direkte bevis på at litosfæreplaten (Stillehavsplaten) brått endret bevegelsesretning over den stasjonære plymen.",
              "En hotspot oppstår bare langs subduksjonssoner når en plate brekker i to.",
              "Knekken på 47 Ma skyldes at jordens magnetfelt byttet polaritet.",
            ],
            answer: 1,
            explain:
              "Riktig! J. Tuzo Wilson og Jason Morgan viste at dype mantelplymer står tilnærmet i ro. Når Stillehavsplaten gled over Hawaii-hotspoten, ble en perlerad av øyer brent inn i havbunnen, og den 60-graders knekken for 47 Ma siden beviser at platens bevegelsesretning brått endret seg.",
          },
          {
            prompt:
              "Hvorfor er et utbrudd fra en ryolittisk stratovulkan dramatisk mye mer eksplosivt enn et utbrudd fra en basaltisk skjoldvulkan på Hawaii?",
            options: [
              "Ryolittisk magma er mye varmere enn basaltisk magma, noe som skaper høyere damptrykk.",
              "Ryolittisk magma har høyt SiO₂-innhold som danner silikatnettverk med ekstrem viskositet; dette fanger oppløste gasser under kolossalt trykk inntil fragmenteringsnivået nås.",
              "Basaltisk magma inneholder mer uran og thorium, som forhindrer gassdannelse.",
              "Hawaii har ingen magmakammer under overflaten, og lavaen presses ut av gravitasjonsbølger.",
            ],
            answer: 1,
            explain:
              "Riktig! Når SiO₂-innholdet overstiger 60 %, danner silikat-tetraedrene sterke kovalente polymerkjeder som øker viskositeten med opptil en million ganger sammenlignet med basalt. Gassboblene kan ikke unnslippe, og resultatet er et eksplosivt pliniansk utbrudd.",
          },
          {
            prompt:
              "Hvorfor forårsaket Eyjafjallajökull-utbruddet i 2010 en så omfattende flystans i hele Europa, til tross for at utbruddet bare var VEI 4?",
            options: [
              "Fordi utbruddet slynget ut radioaktiv lava som ødela satellittnavigasjonen.",
              "Fordi magmaen eksploderte i kontakt med smeltevann fra isbreen (freatomagmatisme) og dannet ekstremt finkornet silikatglassaske som smelter inne i varme jetmotorer.",
              "Fordi røyken fra vulkanen reagerte med ozonlaget og dannet kvelende giftgasser.",
              "Fordi flyselskapenes radarer ble blendet av lyset fra lavafontenene.",
            ],
            answer: 1,
            explain:
              "Riktig! Freatomagmatisme: Magmaens møte med isbreen knuste smelten i ørsmå, mikroskopiske glasskår som smelter ved 1100 °C inne i jetmotorers forbrenningskamre og forårsaker motorstans.",
          },
          {
            prompt:
              "Hva er den viktigste årsaken til at vulkaner på subduksjonssoner er mer eksplosive enn vulkaner på midthavsrygger?",
            options: [
              "Subduksjonssoner er nærmere jordens kjerne og har høyere temperatur.",
              "Vann frigjort fra den synkende oseaniske platen senker magmaens solidustemperatur og øker SiO₂-innholdet, noe som gir høyere viskositet og gasstrykk.",
              "Midthavsrygg-vulkaner har ingen magmakammer og kan ikke eksplodere.",
              "Subduksjonsvulkaner bruker kald havbunnsskorpe som drivstoff, noe som gir mer energi.",
            ],
            answer: 1,
            explain:
              "Riktig! Flukssmelting i mantelkilen over den synkende platen produserer intermediær til felsisk magma med høyere SiO₂ og mer oppløste gasser enn den enkle dekompresjonssmeltingen under midthavsrygger.",
          },
          {
            prompt:
              "Hva er 'vulkansk vinter', og hvilket historisk utbrudd forårsaket det tydeligste eksempelet?",
            options: [
              "En lokalt kald periode rundt en vulkan etter lavastrømmer — Kilauea på Hawaii 2018.",
              "En global nedkjøling forårsaket av svovelsyreaerosoler i stratosfæren etter store eksplosive utbrudd — tydeligst etter Tambora 1815, som skapte 'året uten sommer' i 1816.",
              "En flerårig nedbørsøkning i tropene etter kaldera-utbrudd.",
              "En regional vinter der askefallet blokkerer solstrålingen lokalt i opptil én uke.",
            ],
            answer: 1,
            explain:
              "Riktig! Tamboras stratosfæriske SO₂-injeksjon på 100 millioner tonn i 1815 dannet et globalt aerosolslør av svovelsyre som kuttet solinnstrålingen nok til at avlingene sviktet globalt i 1816.",
          },
          {
            prompt: "Hva er en kaldera, og hva skiller den fra et vanlig vulkankrater?",
            options: [
              "En kaldera er et vanlig eksplosjonskrater i toppen av en vulkan.",
              "En kaldera er en kolossal innsynkningsstruktur (5–50 km bred) som oppstår når taket over et delvis tømt magmakammer raser loddrett ned under et katastrofalt utbrudd.",
              "En kaldera er et underjordisk magmakammer under en skjoldvulkan.",
              "En kaldera er et lahar-fyllt dalstrøk etter et vulkanutbrudd.",
            ],
            answer: 1,
            explain:
              "Riktig! Et vulkankrater er en utblåsningsåpning fra tilførselsrøret. En kaldera oppstår ved kollapsen av hele magmakammertaket — en gigantisk senkningsstruktur som kan være titalls kilometer bred.",
          },
          {
            prompt: "Hvorfor er Beerenberg på Jan Mayen klassifisert som stratovulkan til tross for basaltisk magma?",
            options: [
              "Fordi all vulkan over 2000 moh. kalles stratovulkan.",
              "Fordi Jan Mayen ligger på en rift der magmaen er ryolittisk.",
              "Fordi utbruddsstilen veksler mellom strombolsk og hawaiisk, noe som over tid har bygd opp lagdelte avsettinger av lava og tefra til en klassisk kjegleform.",
              "Fordi Beerenberg aldri har hatt ekte lavastrømmer.",
            ],
            answer: 2,
            explain:
              "Riktig! Selv basaltisk magma kan danne stratovulkaner dersom utbruddene veksler mellom lavastrømmer og tefrafall. Beerenbergs lagdelte oppbygning, bratte flanker og isbrekledde topp er karakteristisk for denne vulkantypen (Norsk Polarinstitutt, u.å.).",
          },
        ]}
      />
    </TopicLayout>
  );
}
