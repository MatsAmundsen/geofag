import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  BoundaryQuakesDiagram,
  CalderaFormationDiagram,
  EarthquakeWavePhysicsDiagram,
  ElasticReboundDiagram,
  NorwayEarthquakesDiagram,
  SeismogramDiagram,
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

const tema = gf1Theme("vulkaner-og-jordskjelv")!;

export const Route = createFileRoute("/geofag-1/vulkaner-og-jordskjelv")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/vulkaner-og-jordskjelv",
    }),
  component: VulkanerOgJordskjelvPage,
});

function VulkanerOgJordskjelvPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Vulkanutbrudd og jordskjelv er de mest dramatiske overflateuttrykkene for jordens indre dynamikk. Gjennom magmakjemisk viskositet, gasseksolusjon, elastisk spenningsoppbygging og seismisk bølgeforplantning frigjør jorden varme og bevegelsesenergi som former kontinenter, havbassenger og menneskers levekår."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/platetektonikk",
        label: "Forrige: Platetektonikk",
      }}
      next={{
        to: "/geofag-1/bergarter-og-landformer",
        label: "Neste: Bergarter og landformer",
      }}
      kilder={KILDER.vulkaner}
    >
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
          skjærer forbi hverandre, konsentreres mekanisk deformasjon og smelting. To geologiske fenomener dominerer disse
          plategrensene:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">Vulkanisme:</strong> Oppstigning og utbrudd av smeltet stein (magma)
            og oppløste gasser fra mantelen eller skorpen til overflaten.
          </li>
          <li>
            <strong className="text-foreground">Seismisitet (jordskjelv):</strong> Brå frigjøring av elastisk oppbygd
            spenningsenergi langs forkastninger, der energien stråler ut som elastiske seismiske bølger i alle retninger.
          </li>
        </ul>
        <p>
          For å forstå hvorfor enkelte vulkaner spyr ut fredelige lavabekker mens andre eksploderer med global slagkraft,
          må vi dykke ned i magmaens underliggende fysikk og kjemiske oppbygning.
        </p>
      </section>

      {/* SEKSJON 2: MAGMAKJEEMI OG VISKOSITET */}
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
                <td className="py-2.5">Midthavsrygg, Hawaiiske hotspoter</td>
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
              <strong>Eksempler:</strong> Mount Fuji i Japan, Vesuv i Italia, Mount St. Helens og Mount Rainier i USA,
              samt Pinatubo på Filippinene.
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
          src="/images/fig-subduksjon-vulkan.jpg"
          alt="Stratovulkan i utbrudd over kyst"
          heading="Eksplosiv subduksjonsvulkanisme"
          caption="Når en oseanisk litosfæreplate dykker ned i mantelen, frigis overkritisk vann som senker mantelens smeltepunkt. Den resulterende magmaen reagerer med kontinentalskorpen og blir beriket på SiO₂ og oppløst vann, noe som skaper voldsomme plinianske utbrudd med stratosfæriske askesøyler."
          marks={[{ x: 48, y: 15, n: "1", text: "Pliniansk askesøyle", tone: "warm" }]}
          points={[
            {
              n: "1",
              label:
                "Askesøylen kan stige 30 km opp i stratosfæren og føre aske og aerosoler jorden rundt.",
            },
          ]}
        />
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

      {/* SEKSJON 7: JORDSKJELV OG ELASTISK TILBAKEFJÆRING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordskjelvfysikk: Harry Fielding Reids elastiske tilbakefjæring
        </h2>
        <p>
          Frem til begynnelsen av 1900-tallet trodde mange forskere at forkastninger i jordskorpen var et sekundært resultat
          av mystiske eksplosjoner dypt nede i jorden. Den sanne fysiske forklaringen ble først avdekket etter det store
          jordskjelvet i San Francisco 18. april 1906.
        </p>
        <p>
          Den amerikanske geofysikeren Harry Fielding Reid (1910) analyserte nitidige landmålinger av vei- og gjerdelinjer
          som krysset San Andreas-forkastningen før og etter skjelvet. Han la merke til at gjerder som opprinnelig var snorrette,
          hadde blitt gradvis bøyd til en svak S-kurve i tiårene forut for katastrofen, før de plutselig ble kuttet tvert av med
          en permanent forskyvning på opptil 6 meter under selve skjelvet.
        </p>

        <ElasticReboundDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Den seismiske syklusen trinn for trinn
        </h3>
        <div className="space-y-2 text-muted-foreground">
          <p>
            Reids teori om <strong>elastisk tilbakefjæring (elastic rebound theory)</strong> danner i dag fundamentet for all
            moderne jordskjelvforskning og forklarer den periodiske <em>seismiske syklusen</em>:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>
              <strong className="text-foreground">Tektonisk spenningsoppbygging:</strong> Platetektoniske krefter driver to jordskorpeblokker
              i motsatte retninger med en hastighet på noen centimeter per år. Langs forkastningsflaten hindrer imidlertid
              enorm friksjon og rugositeter (asperiteter) blokkene i å gli jevnt forbi hverandre. Forkastningen er <em>låst</em>.
            </li>
            <li>
              <strong className="text-foreground">Elastisk deformasjon:</strong> Fordi bergartene ikke kan gli, begynner fjellmassene
              på hver side av forkastningen å bøyes og tøyes elastisk, akkurat som en stålfjær eller en spent pil og bue.
              Mekanisk potensiell energi akkumuleres over tiår, århundrer eller årtusener.
            </li>
            <li>
              <strong className="text-foreground">Spenningsbrudd:</strong> Når den oppbygde skjærspenningen (τ) til slutt overstiger
              bergartens skjærfasthet eller friksjonslåsens motstand, svikter asperitetene brått.
            </li>
            <li>
              <strong className="text-foreground">Tilbakefjæring og bølgeutstråling:</strong> I løpet av brøkdeler av et sekund spretter
              de elastisk deformerte bergartene tilbake til sin opprinnelige, ubelastede form. Den frigjorte elastiske energien omdannes
              til varme og <strong>seismiske sjokkbølger</strong> som stråler ut i alle retninger fra bruddstedet (hyposenteret).
            </li>
          </ol>
        </div>

        <OrdBoks
          ord="Elastisk tilbakefjæring"
          barn="Prinsippet der bergarter spennes opp som en fjær langs en låst forkastning. Når friksjonen ryker, spretter fjellet tilbake og utløser jordskjelv."
        />
        <OrdBoks
          ord="Hyposenter (fokus)"
          barn="Det nøyaktige punktet dypt nede i jordskorpen der forkastningsbruddet starter og den seismiske energien utløses."
        />
        <OrdBoks
          ord="Episenter"
          barn="Punktet på jordoverflaten som ligger loddrett over hyposenteret."
        />
      </section>

      {/* SEKSJON 8: SEISMISKE BØLGER OG JORDENS INDRE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Seismiske bølger og oppdagelsen av jordens flytende kjerne
        </h2>
        <p>
          Når en forkastning brister, forplanter energien seg gjennom jorden i form av elastiske deformasjonsbølger.
          Vi deler dem inn i to hovedgrupper: <strong>romlige bølger (body waves)</strong>, som reiser gjennom jordens indre,
          og <strong>overflatebølger (surface waves)</strong>, som er bundet til jordens overflate.
        </p>

        <EarthquakeWavePhysicsDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Bølgefysikk og elastisitetsmoduler
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">P-bølger (primære kompresjonsbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              P-bølger er <em>longitudinelle bølger</em>: Partiklene i bergarten svinger frem og tilbake parallelt med
              bølgens utbredelsesretning (vekslende trykk og strekk, akkurat som lydbølger i luft).
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Bølgehastigheten bestemmes av bergartens kompresjonsmodul (K), skjærmodul (μ) og densitet (ρ):
            </p>
            <p className="mt-1 font-mono text-xs text-teal">
              v_p = √((K + 4/3 μ) / ρ) ≈ 6,0–8,0 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Fordi kompresjonsmodulen K aldri er null, kan P-bølger forplante seg gjennom <strong>både faste bergarter,
              væsker og gasser</strong>. De er de raskeste bølgene og ankommer alltid først til en seismisk stasjon.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-warm text-sm">S-bølger (sekundære skjærbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              S-bølger er <em>transversale bølger</em>: Partiklene svinger vinkelrett (opp/ned eller sideveis) på bølgens
              forplantningsretning.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Bølgehastigheten avhenger utelukkende av skjærmodulen (stivheten) og densiteten:
            </p>
            <p className="mt-1 font-mono text-xs text-warm">
              v_s = √(μ / ρ) ≈ 3,5–4,5 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Væsker og gasser har ingen skjærstivhet (de motsetter seg ikke formendring; μ = 0). Derfor er
              <strong> v_s = 0 i væsker</strong> — S-bølger kan overhodet ikke forplante seg gjennom flytende medier!
            </p>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Overflatebølger: Rayleigh og Love
        </h3>
        <p>
          Når P- og S-bølgene treffer jordoverflaten, reflekteres og interfererer de med grenseflaten mot atmosfæren.
          Dette genererer to typer <strong>overflatebølger</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Rayleigh-bølger:</strong> Rullende bølgebevegelse i vertikalplanet (retrograd elliptisk),
            tilsvarende dønninger på havet. Bakken beveger seg både opp/ned og frem/tilbake.
          </li>
          <li>
            <strong className="text-foreground">Love-bølger:</strong> Rent horisontal skjærbevegelse på tvers av bølgeretningen.
            Fordi menneskeskapte byggverk (særlig murhus og betongstrukturer) tåler vertikal kompresjon mye bedre enn horisontal
            skjærvridning, er det Love- og Rayleigh-bølgene som forårsaker de suverent største ødeleggelsene på bygninger og infrastruktur!
          </li>
        </ul>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Oldhams oppdagelse (1906): S-bølgenes skyggesone
        </h3>
        <p>
          I 1906 publiserte den britiske geologen Richard Dixon Oldham en banebrytende oppdagelse: Seismografer plassert i en
          vinkelavstand på mellom <strong>103° og 180°</strong> fra et jordskjelvs episenter registrerte aldri direkte S-bølger
          (Oldham, 1906).
        </p>
        <p>
          Hvor ble S-bølgene av? Fordi S-bølger ikke kan gå gjennom væske, innså Oldham at jordens sentrum måtte bestå av en
          gigantisk flytende kjerne! P-bølgene ble dessuten kraftig avbøyd (refraktert) innover på grunn av en brå nedgang i
          lydhastigheten, noe som også skapte en P-bølge-skyggesone mellom 103° og 142°. I 1936 viste den danske seismologen
          Inge Lehmann at svake P-bølger likevel dukket opp i skyggesonen, og beviste dermed eksistensen av en fast, indre kjerne.
        </p>
      </section>

      {/* SEKSJON 9: SEISMOGRAM OG TRIANGULERING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Måling av jordskjelv: Seismogram, tidsdifferanse og magnitude
        </h2>
        <p>
          Et <em>seismometer</em> registrerer bakkebevegelse i tre ortogonale dimensjoner (nord-sør, øst-vest og vertikalt)
          ved hjelp av en opphengt treghetsmasse som forblir i ro mens jorden ryster rundt den. Den digitale utskriften kalles
          et <strong>seismogram</strong>.
        </p>

        <SeismogramDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Lokalisering via sirkeltriangulering
        </h3>
        <p>
          Fordi P-bølgene beveger seg omtrent 1,7 ganger raskere enn S-bølgene, vil avstanden mellom de to bølgetogene øke
          jo lenger de reiser. Tidsdifferansen mellom første P-bølgeankomst og første S-bølgeankomst kalles
          <strong className="text-foreground"> Δt = t_S - t_P</strong>.
        </p>
        <p>
          Avstanden (d) fra målestasjonen til skjelvets hyposenter kan tilnærmes matematisk:
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-primary">
          d = Δt · (v_p · v_s) / (v_p - v_s) ≈ Δt · 8,0 km/s (i typisk kontinentalskorpe)
        </div>
        <p className="text-sm text-muted-foreground">
          Én stasjon gir oss avstanden (d) som radien i en kuleflate — på et kart blir dette en sirkel der skjelvet kan ligge
          hvor som helst langs omkretsen. To stasjoner gir to sirkler som skjærer hverandre i to punkter. Først med en
          <strong> tredje uavhengig seismisk stasjon</strong> krysser sirklene i et unikt, felles punkt:
          <strong> jordskjelvets episenter</strong>!
        </p>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Magnitude: Hvor mye energi slapp skjelvet?
        </h3>
        <p>
          Historisk ble jordskjelv målt med Charles Richters <em>lokalmagnitude (M_L)</em> fra 1935, basert på den maksimale
          bølgeamplituden målt på et Wood-Anderson-seismometer 100 km unna. Richters skala har imidlertid en alvorlig fysisk
          begrensning: Ved svært store jordskjelv blir bruddflaten så langstrakt at seismometeret «mettes» (saturation), slik at
          et skjelv på magnitude 8 og et på magnitude 9,5 kan gi tilnærmet samme utslag.
        </p>
        <p>
          I moderne geofag brukes derfor utelukkende <strong className="text-foreground">momentmagnitude (M_w)</strong>,
          introdusert av Hiroo Kanamori og Thomas Hanks. Momentmagnituden er direkte forankret i skjelvets fundamentale
          fysiske parametere via det <em>seismiske momentet (M₀)</em>:
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-primary">
          M₀ = μ · A · D
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Hvor:</p>
          <p>• <strong>μ</strong> = bergartens skjærstivhet (typisk ~30 GPa i jordskorpen)</p>
          <p>• <strong>A</strong> = arealet av forkastningsflaten som brast (lengde × bredde i m²)</p>
          <p>• <strong>D</strong> = gjennomsnittlig forskyvning langs bruddflaten (i meter)</p>
        </div>
        <p>
          Momentmagnituden beregnes deretter logaritmisk: M_w = ⅔ log₁₀(M₀) - 6,07.
        </p>
        <Callout title="Viktig eksamenspoeng: Den logaritmiske energiskalaen">
          <p>
            Fordi magnituden er logaritmisk proporsjonal med ⅔ log₁₀(M₀), betyr en økning på <strong>1 enhet i magnitude</strong>
            at den frigjorte seismiske energien øker med en faktor på 10^(1,5) ≈ <strong>31,6 ganger</strong>!
          </p>
          <p className="mt-1">
            En økning på <strong>2 enheter</strong> (f.eks. fra M 5 til M 7) betyr at skjelvet frigjør nøyaktig
            31,6 × 31,6 = <strong>1000 ganger mer energi</strong>! Det kraftigste skjelvet som noensinne er målt,
            Valdivia-skjelvet i Chile i 1960 (M_w 9,5), frigjorde mer seismisk energi enn titusenvis av Hiroshima-atombomber til sammen.
          </p>
        </Callout>
      </section>

      {/* SEKSJON 10: PLATEGRENSER OG DYPE SKJELV */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Plategrenser og dype skjelv: Wadati-Benioff-sonen
        </h2>
        <p>
          Jordskjelv forekommer ikke tilfeldig fordelt utover kloden. De tegner opp de globale plategrensene med
          forbløffende presisjon. Men fokal-dybden (hvor dypt hyposenteret befinner seg) varierer dramatisk med tektonisk regime.
        </p>

        <BoundaryQuakesDiagram />

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">Spredningsrygger og transformforkastninger</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Her er litosfæren tynn og astenosfæren varm og duktil nær overflaten. Bergarter under høyt trykk og temperatur
              deformeres plastisk (duktilt) uten sprøe brudd. Derfor er jordskjelv ved midthavsrygger og transformgrenser
              (som San Andreas) <strong>utelukkende grunne (&lt; 20–25 km dype)</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">Subduksjonssoner (Wadati-Benioff-sonen)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Her tvinges en kald, stiv oseanisk litosfæreplate dypt ned i den varme astenosfæren. Fordi platen er så kald
              og tykk, forblir kjernen sprø helt ned til <strong>670–700 kilometers dyp</strong>! Skjelvene danner et skrått
              bånd av fokuspunkter som dykker ned under overliggende plate. Under 700 km opphører skjelvene helt fordi
              mineralene rekrystalliserer til tette faser (perovskitt/bridgmanitt) som deformeres plastisk.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Wadati-Benioff-sone"
          barn="En skrå sone av dype jordskjelv (helt ned til 700 km) som oppstår inne i en kald havbunnsplate idet den subdueres ned i mantelen under en annen plate."
        />
      </section>

      {/* SEKSJON 11: NORSK SEISMISITET OG GEOFARER */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norsk seismisitet og geofarer: Hvorfor skjelver Norge?
        </h2>
        <p>
          Mange tror at Norge er fullstendig skjermet mot jordskjelv fordi vi ligger langt inne på den eurasiske kontinentalplaten.
          Det stemmer at Norge er et <em>intraplate-område</em> uten aktive subduksjonssoner. Likevel er Norge blant de
          <strong> mest seismisk aktive områdene i hele Nord-Europa</strong>!
        </p>

        <NorwayEarthquakesDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          To dominerende spenningskilder i norsk jordskorpe
        </h3>
        <p>
          Hvorfor utløses det jordskjelv inne på en stabil plate? Geofysiske målinger fra NORSAR viser to hoveddrivkrefter
          (Bungum et al., 2009):
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Ryggtrykk («Ridge push»):</strong> Den midtatlantiske ryggen i vest utvider seg
            kontinuerlig med 2–2,5 cm per år. Varm, oppstigende mantel danner ny havbunn som hever ryggen 2–3 km over omliggende
            dyphavssletter. Den gravitasjonelle tyngden av ryggen presser havbunnsskorpen og det eurasiske kontinentet østover.
            Dette setter den norske kontinentalskorpen under et regionalt, nordvest–sørøst-rettet kompresjonstrykk.
          </li>
          <li>
            <strong className="text-foreground">Postglasial landheving (isostasi):</strong> Under siste istid (Weichsel) var
            Skandinavia tynget ned av en opptil 3 kilometer tykk iskappe. Da isen smeltet for 10 000 år siden, begynte jordskorpen
            å heve seg elastisk og viskøst tilbake mot isostatisk likevekt. Innlandet hever seg fortsatt med opptil 8–9 mm per år
            rundt Bottenviken, mens kysten hever seg langsommere. Denne skjeve hevingen skaper lokale spenningsforskjeller og
            reaktiverer eldgamle svakhetssoner i fjellet.
          </li>
        </ol>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Historiske kjempeskjelv i Norge
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Selv om hverdagsseismisiteten i Norge domineres av mikroskjelv (magnitude 1 til 3 som kun registreres av NORSARs
            følsomme seismometernettverk), har Norge opplevd betydelige skjelv i historisk tid:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong className="text-foreground">Lurøyskjelvet 31. august 1819 (M ≈ 5,8):</strong> Det største kjente jordskjelvet
              i Nord-Europa i historisk tid. Episenteret lå på Helgelandskysten i Nordland. Rystelsene var så voldsomme at store
              fjellskred og steinsprang raste ut langs fjordene, store sand- og vannfontener (jordlikvifaksjon) sprutet opp av bakken,
              og skorsteiner raste over et område på titusenvis av kvadratkilometer. Skjelvet ble merket helt til Stockholm og Kola.
            </li>
            <li>
              <strong className="text-foreground">Oslofjordskjelvet 23. oktober 1904 (M 5,4):</strong> Det største skjelvet i moderne
              tid på Østlandet. Episenteret lå i Skagerrak/Kattegat, ca. 25 km sør for Hvaler, i forlengelsen av den permiske
              Oslo-grabenen (Bungum et al., 2009). Rystelsene skapte panikk i kirkene i Kristiania under søndagsgudstjenesten,
              og Johanneskirken fikk så store sprekker i murverket at den senere måtte rives. Skjelvet ble følt over et areal på
              800 000 km², fra Nidaros til Warszawa og Helsingfors.
            </li>
            <li>
              <strong className="text-foreground">Storfjordskjelvet på Svalbard 21. februar 2008 (M_w 6,0):</strong> Det kraftigste
              instrumentelt registrerte jordskjelvet på norsk territorium i moderne tid, utløst langs en forkastning øst for Spitsbergen.
            </li>
          </ul>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Norges eneste aktive vulkan: Beerenberg på Jan Mayen
        </h3>
        <p>
          Det norske fastlandet har ingen aktive vulkaner; magmatismen i Oslofeltet (rombeporfyr, larvikitt og basalt) er en
          utdødd paleorift fra permtiden for nær 300 millioner år siden.
        </p>
        <p>
          Kongeriket Norge har imidlertid én aktiv vulkan over havoverflaten: <strong className="text-foreground">Beerenberg på Jan Mayen</strong>
          (2277 moh.). Jan Mayen ligger på en mikro-kontinentalflik like ved Den midtatlantiske spredningsryggen og
          Jan Mayen-bruddsonen i Norskehavet. Beerenberg er en massiv, isbredekket stratovulkan som sist hadde store utbrudd i
          september 1970 og januar 1985, der basaltisk lava strømmet ut i havet og utvidet øyas landareal.
        </p>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Tsunamirisiko i Norge: Fjellskred fremfor subduksjon
        </h3>
        <p>
          I Stillehavet og Det indiske hav utløses katastrofale tsunamier (som i 2004 og 2011) av gigantiske megathrust-jordskjelv
          i subduksjonssoner, der titusener av kvadratkilometer havbunn heves flere meter vertikalt.
        </p>
        <p>
          I Norge er situasjonen en helt annen: Norske tsunamier forårsakes nesten utelukkende av
          <strong className="text-foreground"> gravitasjonelle skred</strong>!
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Fjellskred i trange fjorder:</strong> Historiske ulykker som Tafjord (1934, 40 døde,
            opptil 62 m flodbølgehøyde) og Loen (1905 og 1936, 135 døde) skyldtes ustabile fjellpartier som raste rett i fjorden
            eller innsjøen. I dag overvåker NVE det ustabile partiet <em>Åknes</em> i Storfjorden døgnkontinuerlig med radarmålinger,
            strekkstag og seismiske sensorer for å varsle befolkningen i tide.
          </li>
          <li>
            <strong className="text-foreground">Ubåt-skred på sokkelskråningen:</strong> Det gigantiske <em>Storeggaskredet</em> for
            om lag 8150 år siden var et enormt undersjøisk sedimentras på 3000 km³ sedimenter utenfor Møre. Skredet utløste en
            tsunami med opptil 10–12 meters oppskyllingshøyde langs norskekysten og over 20 meter på Shetland.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Les mer om skredmekanismer, stabilitetsberegninger og overvåking i vårt dedikerte{" "}
          <Link to="/geofag-1/skred" className="text-primary font-semibold underline-offset-2 hover:underline">
            kapittel om skred og massesukksessjon
          </Link>
          .
        </p>
      </section>

      {/* SEKSJON 12: KOMPETANSEMÅL OG DIDAKTIKK */}
      <section className="pt-6 space-y-4">
        <Callout title="Kompetansemål i Geofag 1 (LK20)">
          <p>{tema.maal}</p>
          <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
            <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
            <p>• <em>Jordens oppbygning og indre prosesser:</em> Magmakjemi, platebevegelser og seismisk bølgeforplantning.</p>
            <p>• <em>Geofarer og samfunnssikkerhet:</em> Vulkanske farer (PDC, lahar, aske), jordskjelvrisiko, Eurokode 8 og tsunamier i Norge.</p>
            <p>• <em>Naturvitenskapelige metoder:</em> Seismogramanalyse, triangulering av episenter og bruk av seismiske skyggesoner til å avbilde jordens indre lag.</p>
          </div>
        </Callout>

        <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
        <TermGrid>
          <Term
            name="viskositet"
            def="en væskes indre friksjon og motstand mot å flyte; øker dramatisk med silikatinnhold (SiO₂) og synker med temperatur"
          />
          <Term
            name="stratovulkan"
            def="bratt, lagdelt vulkankjegle bygd opp av vekslende lag av viskøs andesittisk lava og tefra fra eksplosive utbrudd"
          />
          <Term
            name="skjoldvulkan"
            def="stor, slak vulkanbygning dannet av tyntflytende basaltisk lava som flyter over store avstander før den størkner"
          />
          <Term
            name="kaldera"
            def="kolossal sirkulær innsynkningsstruktur i jordskorpen dannet ved at taket over et delvis tømt magmakammer raser sammen"
          />
          <Term
            name="pyroklastisk strøm (PDC)"
            def="overopphetet lavine av gass, aske og stein (300–800 °C) som raser nedover vulkansider med hastigheter opptil 700 km/t"
          />
          <Term
            name="lahar"
            def="vulkansk slamstrøm dannet når fersk tefra blandes med smeltevann fra isbreer eller kraftig nedbør; flyter som våt betong"
          />
          <Term
            name="elastisk tilbakefjæring"
            def="Reids teori for jordskjelv der bergarter bøyes elastisk langs en låst forkastning inntil friksjonslåsen brister og fjellet spretter tilbake"
          />
          <Term
            name="hyposenter (fokus)"
            def="det eksakte bruddpunktet i jordskorpen der jordskjelvets seismiske energi først utløses"
          />
          <Term
            name="episenter"
            def="punktet på jordoverflaten som ligger loddrett over jordskjelvets hyposenter"
          />
          <Term
            name="P-bølge"
            def="primær kompresjonsbølge (lengdebølge); raskeste seismiske bølge (~6–8 km/s) som kan gå gjennom både fast stoff og væske"
          />
          <Term
            name="S-bølge"
            def="sekundær skjærbølge (tverrbølge); krever skjærstivhet (μ > 0) og kan derfor IKKE forplante seg gjennom væsker"
          />
          <Term
            name="momentmagnitude (Mw)"
            def="det moderne fysiske målet på jordskjelvenergi, beregnet direkte fra forkastningsareal, forskyvning og bergartens stivhet"
          />
          <Term
            name="Wadati-Benioff-sone"
            def="en skrå sone av dype jordskjelv (helt ned til 700 km dyp) i en subduksjonssone der en kald havbunnsplate presses ned i mantelen"
          />
          <Term
            name="intraplate-jordskjelv"
            def="jordskjelv som oppstår inne på en litosfæreplate langt unna aktive plategrenser (som jordskjelv i Norge)"
          />
        </TermGrid>

        {/* UTVIDET FLERVALGSQUIZ */}
        <div className="pt-4">
          <Quiz
            questions={[
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
                  "Riktig! Når SiO₂-innholdet overstiger 60 %, danner silikat-tetraedrene sterke kovalente polymerkjeder som øker viskositeten med opptil en million ganger sammenlignet med basalt. De oppløste gassboblene kan ikke unnslippe, trykket bygger seg opp, og når overtrykket overstiger bergartens strekkfasthet rives smelten i stykker i et eksplosivt pliniansk utbrudd.",
              },
              {
                prompt:
                  "Hva var Richard Dixon Oldhams (1906) avgjørende bevis for at jordens ytre kjerne er flytende?",
                options: [
                  "P-bølger reflekteres ikke fra jordens overflate.",
                  "S-bølger (transversale skjærbølger) mangler fullstendig på seismiske målestasjoner i vinkelavstanden mellom 103° og 180° fra episenteret.",
                  "Borehull i Russland nådde flytende magma på 12 kilometers dyp.",
                  "Rayleigh-bølger forplanter seg raskere gjennom havet enn gjennom kontinenter.",
                ],
                answer: 1,
                explain:
                  "Riktig! S-bølger er transversale skjærbølger med hastighet Vs = √(μ/ρ). Fordi væsker mangler skjærstivhet (μ = 0), kan ikke S-bølger eksistere eller forplante seg i en væske. Oldhams påvisning av S-bølgenes skyggesone mellom 103° og 180° beviste ugjendrivelig at jordens kjerne har et flytende ytre lag.",
              },
              {
                prompt:
                  "Dersom et jordskjelv øker fra magnitude 5,0 til magnitude 7,0 på momentmagnitudeskalaen (Mw), hvor mange ganger mer seismisk energi frigjøres?",
                options: [
                  "2 ganger mer energi.",
                  "20 ganger mer energi.",
                  "Omtrent 100 ganger mer energi.",
                  "Nøyaktig 1000 ganger mer energi (31,6² ≈ 1000).",
                ],
                answer: 3,
                explain:
                  "Riktig! Magnitudeskalaen er logaritmisk med grunntall 10^(1,5) for energi. Én enhet opp tilsvarer ca. 31,6 ganger mer frigjort seismisk energi. To enheter opp tilsvarer 10^(1,5 × 2) = 10³ = 1000 ganger mer energi!",
              },
              {
                prompt:
                  "Hva er de to viktigste geofysiske drivkreftene bak jordskjelv i Norge, til tross for at landet er et intraplate-område?",
                options: [
                  "Subduksjon av Nordsjøen under Vestlandet og vulkanisme i Oslofeltet.",
                  "Ryggtrykk («ridge push») fra Den midtatlantiske ryggen i vest og postglasial landheving (isostasi) etter istiden.",
                  "Tidevannskrefter fra månen og sentrifugalkraft fra jordrotasjonen.",
                  "Oljeboring i Nordsjøen og smelting av permafrost i Finnmark.",
                ],
                answer: 1,
                explain:
                  "Riktig! Norge utsettes for kompresjonsspenninger rettet mot øst-sørøst på grunn av ryggtrykk fra den ekspanderende Midtatlantiske ryggen, kombinert med differensiell heving (opptil 8–9 mm/år) etter at den 3 km tykke iskappen smeltet. Dette reaktiverer gamle forkastningssoner som Oslo-grabenen og kystforkastningene.",
              },
              {
                prompt:
                  "Hva er den fundamentale forskjellen på opprinnelsen til tsunamier i Stillehavet sammenlignet med historiske tsunamier i Norge?",
                options: [
                  "I Stillehavet skyldes tsunamier store megathrust-jordskjelv ved subduksjonssoner; i Norge skyldes de nesten utelukkende skred i fjorder eller på sokkelskråningen (f.eks. Tafjord og Storegga).",
                  "Norske tsunamier skapes av tropiske orkaner i Nordsjøen.",
                  "Stillehavstsunamier er forårsaket av tidevann, mens norske tsunamier er forårsaket av Beerenberg på Jan Mayen.",
                  "Det er ingen forskjell; begge typer dannes ved at litosfæreplater kolliderer langs kystlinjen.",
                ],
                answer: 0,
                explain:
                  "Riktig! Norge har ingen aktive subduksjonssoner som kan heve havbunnen over store områder. Norske tsunamier oppstår når store stein- og sedimentvolumer raser ned i vannmassene — enten som fjellskred i trange vestlandsfjorder (Tafjord 1934, Loen, Åknes) eller som massive undervannsskred på kontinentalskråningen (Storeggaskredet for 8150 år siden).",
              },
            ]}
          />
        </div>
      </section>
    </TopicLayout>
  );
}
