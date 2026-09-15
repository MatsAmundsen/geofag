import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  MetamorphicFaciesDiagram,
  RockCycleDiagram,
  SilicateStructureDiagram,
} from "@/components/diagrams/bergarter";
import {
  BowenReactionSeriesDiagram,
  RelativeDatingDiagram,
} from "@/components/diagrams/geology-extra";
import { RockPetrologyModel } from "@/components/models/rock-petrology-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("bergarter")!;

export const Route = createFileRoute("/geofag-1/bergarter")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/bergarter",
    }),
  component: BergarterPage,
});

function BergarterPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Et mineral har en velordnet krystallstruktur og en bestemt kjemisk formel — kvarts er ren SiO₂, mens kalsitt er CaCO₃. En bergart er et aggregat av ett eller flere mineraler: granitt er sammenvokste korn av kvarts, feltspat og glimmer. Gjennom det geologiske kretsløpet nydannes, brytes ned og forvandles jordskorpens bergarter kontinuerlig av magmatiske, sedimentære og metamorfe prosesser."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/jordskjelv",
        label: "Forrige: Jordskjelv og tsunamier",
      }}
      next={{
        to: "/geofag-1/landformer",
        label: "Neste: Landformer og geomorfologi",
      }}
      kilder={KILDER.bergarter}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. MINERALER OG KRYSTALLKJEMI                                      */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Mineraler — geosfærens kjemiske byggesteiner
      </h2>
      <p>
        Alt fast fjell på jorda er bygget opp av mineraler. I geologisk forstand er et mineral definert
        som et <strong>naturlig forekommende, uorganisk fast stoff med en veldefinert kjemisk
        sammensetning og en ordnet, tredimensjonal krystallstruktur</strong> (NGU, u.å.-a).
      </p>
      <p>
        Kunstig fremstilte laboratoriediamanter, flytende vann og organisk trevirke er derfor per
        definisjon ikke mineraler, mens naturlig dannet bre-is oppfyller alle kriterier. Krystallstrukturen
        betyr at atomene er bundet sammen i et repetitivt geometrisk gitter. Dersom en silikatsmelte
        avkjøles så lynraskt at atomene ikke rekker å organisere seg i et krystallgitter, dannes et
        amorft vulkansk glass (obsidian), som regnes som en bergart, men ikke et mineral.
      </p>

      <OrdBoks
        ord="Mineral"
        barn="Naturlig, uorganisk fast stoff med en bestemt kjemisk formel og et regelmessig, indre krystallgitter. Byggestein i bergarter."
      />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Silikatene — jordskorpens dominerende mineralgruppe
      </h3>
      <p>
        Selv om jorden inneholder 92 naturlige grunnstoffer, utgjør bare to av dem nesten tre fjerdedeler
        av kontinentalskorpens masse: <strong>oksygen (46,6 %)</strong> og <strong>silisium (27,7 %)</strong>,
        etterfulgt av aluminium, jern, kalsium, natrium, kalium og magnesium. Derfor består over 90 prosent
        av alle bergarter i jordskorpa av <strong>silikatmineraler</strong>.
      </p>
      <p>
        Den fundamentale kjemiske byggesteinen i alle silikater er <strong>silisium-oksygen-tetraederet
        ([SiO₄]⁴⁻)</strong>: Ett lite, fireverdig silisiumion (Si⁴⁺) er kovalent bundet til fire
        større oksygenioner (O²⁻). Fordi tetraederet har en netto negativ ladning på -4, må det enten
        bindes til positive metallkationer (Fe²⁺, Mg²⁺, Ca²⁺, Na⁺, K⁺) eller dele oksygenatomer
        med nabotetraedre. Graden av oksygendeling bestemmer silikatenes struktur og fysiske egenskaper:
      </p>

      <SilicateStructureDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Fysiske identifikasjonsegenskaper i felt og håndstykke
      </h3>
      <p>
        For å identifisere et mineral i felt undersøker geologen et sett diagnostiske egenskaper:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <li>
          <strong className="text-foreground">Hardhet (Mohs skala 1–10):</strong> Mineralets relative
          evne til å ripe et annet. Skalaen ble utarbeidet av Friedrich Mohs i 1812: Talk (1), gips (2),
          kalsitt (3), fluoritt (4), apatitt (5), ortoklas feltspat (6), kvarts (7), topas (8), korund (9)
          og diamant (10). Mohs er en mineralskala, ikke en bergartsskala. En gneis kan inneholde både myk
          glimmer (Mohs 2,5) og hard kvarts (Mohs 7).
        </li>
        <li>
          <strong className="text-foreground">Kløv og brudd:</strong> Kløv er tendensen et mineral har
          til å spalte langs svake krystallografiske plan der atomvbindingene er svakest. Glimmer har én
          ekstremt perfekt kløvretning (spalter i tynne elastiske flak), feltspat har to retninger i nær 90°
          vinkel, mens kalsitt kløver i romboedre. Kvarts har ingen kløvplan, men brekker med glassaktig,
          skjellformet <em>musklete brudd</em>.
        </li>
        <li>
          <strong className="text-foreground">Strekfarge:</strong> Fargen på mineralets pulver når det
          skrapes mot en uglassert porselensplate. Mens overflatefargen kan variere voldsomt på grunn av
          små urenheter (kvarts kan være hvit, lilla, gul eller røyksort), er strekfargen konstant:
          Hematitt (Fe₂O₃) er metallisk stålgrå i klump, men gir alltid en karakteristisk rødbrun strek.
        </li>
        <li>
          <strong className="text-foreground">Kjemisk syretest:</strong> Karbonatmineralet kalsitt (CaCO₃)
          reagerer umiddelbart og bruser kraftig med fortynnet saltsyre (10 % HCl) under utvikling av
          karbondioksidgass: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. Dette er den sikreste testen
          for å skille kalkstein og marmor fra kvartsitt.
        </li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      {/* 2. BERGARTSSYKLUSEN OG TRE HOVEDGRUPPER                            */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Det geologiske kretsløpet — naturens store resirkulering
      </h2>
      <p>
        En bergart er et fast aggregat sammensatt av ett eller flere mineraler, eller i noen tilfeller
        mineraloid masse som vulkansk glass eller organisk kull (Ramberg et al., 2013). Norges geologiske
        undersøkelse (NGU) og internasjonal geovitenskap klassifiserer alle bergarter i tre hovedgrupper
        etter dannelsesmåte:
      </p>

      <PhotoFigure
        src="/images/fig-tre-bergarter.jpg"
        alt="Tre håndstykker: grovkornet magmatisk bergart, lagdelt sedimentær kalkstein og stripet metamorf gneis"
        heading="Geosfærens tre bergartsgrupper"
        caption="Fra venstre: Magmatisk bergart (størknet fra glødende smelte, sammenvokste krystaller), sedimentær bergart (avsatt i lag av fragmenter eller kjemisk/biologisk utfelling, ofte fossilbærende), og metamorf bergart (omdannet i fast tilstand under trykk og varme, markert med foliasjon/bånding)."
        marks={[
          { x: 12, y: 14, n: "1", text: "Magmatisk", tone: "warm" },
          { x: 45, y: 14, n: "2", text: "Sedimentær", tone: "teal" },
          { x: 80, y: 14, n: "3", text: "Metamorf", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "Størknet fra magma på dypet eller lava på overflaten. Sammenvokste mineralkorn." },
          { n: "2", label: "Avsatt lagvis som løsmasser og herdet ved diagenese. Inneholder fossiler og lagdeling." },
          { n: "3", label: "Rekrystallisert under høy temperatur og trykk i fast form. Viser ofte foliasjon." },
        ]}
      />

      <p>
        <strong>Bergartssyklusen</strong> er den overordnede modellen for hvordan materialet i jordskorpa
        og øvre mantel sirkulerer (USGS, u.å.). Det er ingen fast start og ingen fast slutt: Enhver bergart
        kan omdannes direkte til enhver annen bergartstype avhengig av de tektoniske kreftene:
      </p>

      <PhotoFigure
        src="/images/geo-geologisk-kretslop-3d.jpg"
        alt="3D-blokksnitt av det geologiske kretsløpet med magmakammer, overflatevulkan, elveerosjon, sedimentasjonsbasseng og regionalmetamorf sone"
        heading="Det geologiske kretsløpet i 3D-perspektiv"
        caption="Fra dyp magmadannelse i mantelen til overflatevulkanisme, fluvial forvitring og erosjon, bassengsedimentasjon og dyp tektonisk metamorfose i en kollisjonssone. Ingen bergart må innom alle stasjoner; kretsløpet har utallige snarveier drevet av jordas indre konveksjon og ytre solenergi."
        marks={[
          { x: 16, y: 82, n: "1", text: "Magmakammer", tone: "warm" },
          { x: 12, y: 35, n: "2", text: "Vulkan / Lava", tone: "warm" },
          { x: 58, y: 40, n: "3", text: "Sedimentbasseng", tone: "teal" },
          { x: 74, y: 64, n: "4", text: "Metamorf sone", tone: "low" },
          { x: 88, y: 45, n: "5", text: "Subduksjonssone", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Partiell smelting på dypet genererer magma som stiger opp i magmakamre." },
          { n: "2", label: "Dagbergarter (basalt/rombeporfyr) størkner brått på jordoverflaten." },
          { n: "3", label: "Eroderte mineralkorn avsettes i innsjøer og havbassenger som sand og leire." },
          { n: "4", label: "Tektonisk orogenese utsetter bergartene for trykk og temperatur: dannelse av gneis." },
          { n: "5", label: "Synkende havbunnsplate resirkulerer sedimenter og skorpe tilbake i mantelen." },
        ]}
      />

      <RockCycleDiagram />

      <OrdBoks
        ord="Diagenese"
        barn="De fysiske og kjemiske prosessene som forvandler et løst sediment til fast sedimentær bergart ved lav temperatur (<200 °C) og moderat trykk: kompaksjon og sementering."
      />

      {/* ------------------------------------------------------------------ */}
      {/* 3. MAGMATISKE BERGARTER OG BOWEN                                   */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Magmatiske bergarter og magmadifferensiasjon
      </h2>
      <p>
        Magmatiske bergarter (eruptiver) dannes når smeltet steinmasse (magma i dypet, lava på overflaten)
        avkjøles og krystalliserer. De klassifiseres etter to uavhengige kriterier: <strong>dannelsesdyp
        (tekstur)</strong> og <strong>kjemisk sammensetning (silikainnhold)</strong>.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 my-4">
        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-primary">Dypbergart</span>
          <h4 className="font-display text-lg font-bold">Plutonisk</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Størkner kilometerlangt nede i jordskorpa, isolert av tykke overliggende bergmasser. Avkjølingen
            tar hundretusener av år. Atomene rekker å vokse til store, synlige mineralkorn (fanerittisk
            tekstur, &gt;1–5 mm).
          </p>
          <p className="text-xs font-semibold text-foreground">Eksempler: Granitt, gabbro, dioritt, larvikitt.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-sand">Gangbergart</span>
          <h4 className="font-display text-lg font-bold">Hypabyssal</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Størkner i tilførselsganger, sprekker og magmasprekker (diker og siller) på vei mot overflaten.
            Middels rask avkjøling gir ofte porfyrisk tekstur: store krystaller (fenokrystaller) omgitt av
            en finkornet grunnmasse.
          </p>
          <p className="text-xs font-semibold text-foreground">Eksempler: Diabas, pegmatitt, porfyritt.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-warm">Dagbergart</span>
          <h4 className="font-display text-lg font-bold">Vulkansk</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kastes ut eller flyter over bakken som lava i vulkanske utbrudd. Den brå temperaturforskjellen
            mot luft eller sjøvann gjør at krystallisasjonen skjer i løpet av dager eller uker. Finkornet
            (afanittisk) eller glassaktig.
          </p>
          <p className="text-xs font-semibold text-foreground">Eksempler: Basalt, rombeporfyr, ryolitt, pimpstein.</p>
        </div>
      </div>

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Bowens reaksjonsserie — krystallisasjonens termodynamikk
      </h3>
      <p>
        I 1928 publiserte den canadiske geologen Norman L. Bowen sitt banebrytende verk <em>The Evolution
        of the Igneous Rocks</em> (Bowen, 1928). Gjennom laboratorieeksperimenter påviste han at mineraler
        ikke krystalliserer samtidig når en silikatsmelte kjøles ned, men i en strengt definert termodynamisk
        rekkefølge:
      </p>

      <PhotoFigure
        src="/images/geo-bowens-reaksjonsserie-3d.jpg"
        alt="3D-fremstilling av Bowens reaksjonsserie fra 1200 til 600 grader celsius"
        heading="Bowens reaksjonsserie og krystallisasjonssekvens"
        caption="Venstre gren viser den diskontinuerlige serien av Fe-Mg-silikater (olivin → pyroksen → amfibol → biotitt), der mineralene reagerer med smelten og omdannes til en ny krystallstruktur. Høyre gren viser den kontinuerlige plagioklasserien, der kalsium gradvis byttes ut med natrium i samme krystallgitter. Ved lav temperatur møtes grenene i kalifeltspat, muskovitt og til slutt ren kvarts."
        marks={[
          { x: 12, y: 18, n: "1", text: "Olivin (1200 °C)", tone: "warm" },
          { x: 88, y: 18, n: "2", text: "Ca-plagioklas", tone: "teal" },
          { x: 38, y: 64, n: "3", text: "Biotitt (800 °C)", tone: "warm" },
          { x: 84, y: 78, n: "4", text: "Kvarts (600 °C)", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Isolerte [SiO₄]-tetraedre. Krystalliserer først fra mafisk smelte ved høyest temperatur." },
          { n: "2", label: "Anortitt (CaAl₂Si₂O₈) felles ut tidlig i kontinuerlig serie." },
          { n: "3", label: "Sjiktsilikat med jern og magnesium. Siste mørke mineral før felles bunn." },
          { n: "4", label: "Tektosilikat av ren SiO₂. Krystalliserer sist når nesten alt jern/magnesium er brukt opp." },
        ]}
      />

      <BowenReactionSeriesDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Norske nasjonalskatter: Larvikitt og Rombeporfyr
      </h3>
      <p>
        Norge har to verdenskjente magmatiske bergarter som ble dannet da det oppsto en massiv riftdal
        gjennom det som i dag kalles <strong>Oslofeltet</strong> for cirka 300–280 millioner år siden
        i perm-tiden (Ramberg et al., 2013):
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <li>
          <strong className="text-foreground">Larvikitt (Norges nasjonalbergart):</strong> En monzonittisk
          dypbergart sammensatt nesten utelukkende av feltspater. Det særegne blåfiolette eller sølvblå
          fargespillet kalles <em>labradorescens</em> og skyldes mikroskopiske lameller av kalifeltspat
          og natriumrik plagioklas som avblandes under langsom avkjøling (kryptoperthitt). Larvikitt brytes
          i Larvik og eksporteres over hele verden som eksklusiv fasade- og monumentstein (NGU, u.å.-b).
        </li>
        <li>
          <strong className="text-foreground">Rombeporfyr:</strong> En vulkansk dagbergart (lava) med
          karakteristiske båt- eller rombeformede fenokrystaller av feltspat liggende i en finkornet rødbrun
          eller grå grunnmasse. Rombeporfyrlavaer dekket store deler av Oslofeltet (Krokskogen, Vestfold)
          og er ekstremt sjeldne i verden: Utenom Oslofeltet finnes de bare på Mount Erebus i Antarktis
          og i Riftdalen i Øst-Afrika!
        </li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      {/* 4. SEDIMENTÆRE BERGARTER OG DIAGENESE                              */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Sedimentære bergarter — jordoverflatens historiebok
      </h2>
      <p>
        Mens magmatiske og metamorfe bergarter utgjør over 90 prosent av jordskorpas samlede volum, dekker
        sedimentære bergarter og løsmasser over <strong>75 prosent av jordas kontinentoverside</strong>.
        Det er i de sedimentære bergartene vi finner fossiler, kull, olje, gass og grunnvannsmagasiner.
      </p>
      <p>
        Sedimentære bergarter dannes gjennom en femtrinns prosess:
        <br />
        <span className="font-semibold text-foreground">
          Forvitring → Erosjon → Transport → Avsetning (sedimentasjon) → Diagenese (litifisering).
        </span>
      </p>

      <div className="grid gap-4 sm:grid-cols-3 my-4">
        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-sand">1. Klastiske</span>
          <h4 className="font-display text-lg font-bold">Fragmentbergarter</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bygget opp av mekaniske bruddstykker (klaster) av eldre bergarter. Klassifiseres etter kornstørrelse:
            Leirskifer (&lt;0,002 mm), sandstein (0,063–2 mm), konglomerat (avrundede steiner &gt;2 mm) og breksje
            (skarpkantede steiner &gt;2 mm).
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal">2. Kjemiske</span>
          <h4 className="font-display text-lg font-bold">Utfelte salter</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Dannes ved direkte kjemisk eller uorganisk utfelling av ioner oppløst i vann når vannet fordamper
            eller mettes. Eksempler er evaporitter som steinsalt (halitt, NaCl), gips (CaSO₄ · 2H₂O)
            og uorganisk kalktuff.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-warm">3. Biogene</span>
          <h4 className="font-display text-lg font-bold">Organiske bergarter</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Opphopning av biologiske rester fra levende organismer. Kalkstein dannes av skjell, koraller og
            mikroskopiske kalkalger (foraminiferer/kokkolitter). Kull dannes av sammenpressede planterester fra
            myrområder i oksygenfattige sumper.
          </p>
        </div>
      </div>

      <p>
        <strong>Diagenese (litifisering)</strong> omfatter alle kjemiske, fysiske og biologiske endringer
        som omdanner løst sediment til fast bergart etter avsetning, ved temperaturer under ca. 200 °C:
      </p>
      <ol className="list-decimal pl-6 space-y-1.5 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Kompaksjon:</strong> Når nye sedimentlag legger seg oppå,
          øker vekten. Porerommet presses sammen, og vann presses ut. For leire kan volumet reduseres med
          opptil 60–80 %, slik at leirmineralene legger seg parallelt i tynne lag.
        </li>
        <li>
          <strong className="text-foreground">Sementering:</strong> Grunnvann som sirkulerer gjennom de
          gjenværende porene er mettet på oppløste stoffer. Silika (SiO₂), kalsitt (CaCO₃) eller
          jernoksider felles ut og danner en kjemisk «sement» som kitter mineralkornene uløselig sammen.
        </li>
      </ol>

      {/* ------------------------------------------------------------------ */}
      {/* 5. METAMORFE BERGARTER OG METAMORFOSEFACIES                        */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Metamorfe bergarter og metamorfosefacies
      </h2>
      <p>
        Metamorfose betyr «formforandring». En metamorf bergart oppstår når en opprinnelig bergart
        (magmatisk, sedimentær eller eldre metamorf) utsettes for et trykk (P), en temperatur (T) eller
        kjemisk aktive fluider som er vesentlig annerledes enn forholdene der den ble dannet. Det avgjørende
        premisset er at <strong>omdanningen skjer i fast tilstand</strong> — bergarten smelter ikke. Dersom
        bergarten smelter, overskrides granittisk solidus, og smelten vil ved avkjøling danne en ny magmatisk
        bergart.
      </p>

      <OrdBoks
        ord="Metamorf bergart"
        barn="Bergart omdannet i fast tilstand ved endret trykk, temperatur og fluidpåvirkning, uten full smelting. Rekrystallisering og nydanning av likevektsmineraler."
      />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Foliasjon — beviset for rettet trykk
      </h3>
      <p>
        Når bergarter utsettes for rettet tektonisk trykk (differensialtrykk) under en fjellkjedefolding,
        vil flakformede mineraler som glimmer og stavformede mineraler som amfibol rotere og vokse vinkelrett
        på den største trykkspenningen (σ₁). Dette skaper en planstruktur som kalles <strong>foliasjon</strong>.
        Økende metamorfosegrad av en opprinnelig leirskifer gir følgende metamorfe sekvens:
      </p>
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 my-3 rounded-xl border border-border bg-card/60 text-xs font-semibold">
        <span className="p-2 rounded bg-muted/60 text-foreground">Leirskifer (sediment)</span>
        <span>→</span>
        <span className="p-2 rounded bg-teal-950/40 text-teal-300 border border-teal-500/30">Fyllitt (silkeaktig)</span>
        <span>→</span>
        <span className="p-2 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">Glimmerskifer (synlig glimmer)</span>
        <span>→</span>
        <span className="p-2 rounded bg-rose-950/40 text-rose-300 border border-rose-500/30">Båndgneis (bånddelt foliasjon)</span>
      </div>

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Metamorfe facies i platetektoniske miljøer
      </h3>
      <p>
        Et <strong>metamorf facies</strong> er en mineralsamling som opptrer i likevekt under et bestemt
        intervall av trykk og temperatur. Ved å kartlegge hvilke metamorfe mineraler som finnes i fjellet,
        kan geologen rekonstruere den eksakte dybden og temperaturhistorien til bergarten:
      </p>

      <PhotoFigure
        src="/images/geo-metamorfose-facies-3d.jpg"
        alt="3D-blokkdiagram av metamorfe facies i subduksjonssoner og fjellkjedekollisjoner"
        heading="Metamorfe facies og platetektoniske P-T-gradienter"
        caption="Subduksjon av en kald oseanbunnplate genererer høyt trykk under lave temperaturer: Dette gir blåskifer- og eklogittfacies. Kontinental kollisjon og fjellkjedefolding (orogenese) gir regionalmetamorfose med grønnskifer-, amfibolitt- og granulittfacies. Varm magma som trenger opp i overflateskorpen skaper kontaktmetamorfose (hornfels) ved lavt trykk og høy temperatur."
        marks={[
          { x: 32, y: 44, n: "1", text: "Blåskifer", tone: "cold" },
          { x: 48, y: 72, n: "2", text: "Eklogitt", tone: "teal" },
          { x: 82, y: 52, n: "3", text: "Grønnskifer", tone: "teal" },
          { x: 80, y: 68, n: "4", text: "Amfibolitt", tone: "warm" },
          { x: 56, y: 56, n: "5", text: "Magma/Hornfels", tone: "low" },
        ]}
        points={[
          { n: "1", label: "Høyt trykk, lav temperatur i subduksjonssoner. Diagnostisk mineral: blått glaukofan." },
          { n: "2", label: "Ultrahøyt trykk på >40–100 km dyp. Grønn omfasitt-pyroksen og rød pyrop-granat (Vestlandet!)." },
          { n: "3", label: "Moderat regionalmetamorfose (300–450 °C). Rik på grønne mineraler: kloritt og epidot." },
          { n: "4", label: "Høygradig regionalmetamorfose (450–700 °C). Hornblende, plagioklas og kvarts (typisk gneis)." },
          { n: "5", label: "Kontaktmetamorfose rundt varme plutoner. Bakt og herdet stein uten rettet trykk." },
        ]}
      />

      <MetamorphicFaciesDiagram />

      {/* ------------------------------------------------------------------ */}
      {/* 6. PETROGRAFI OG TYNNSNITT                                         */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Petrografi og tynnsnitt — bergartene under mikroskopet
      </h2>
      <p>
        I håndstykke er det ofte umulig å skille mineraler som er mindre enn en halv millimeter. Det
        viktigste verktøyet i moderne petrologi er derfor <strong>polarisasjonsmikroskopet</strong>.
        Geologen sager ut en millimeter-tykk skive av bergarten, limer den på et objektglass og sliper
        den ned til en nøyaktig standardtykkelse på <strong>30 mikrometer (0,030 mm)</strong>. Ved denne
        tykkelsen er nesten alle silikater gjennomsiktige for lys.
      </p>

      <PhotoFigure
        src="/images/geo-bergartstyper-tynnsnitt-3d.jpg"
        alt="Sammenligning av makroskopisk håndstykke og polarisasjonsmikroskopisk tynnsnitt under kryssede nicoler for larvikitt, sandstein og gneis"
        heading="Tynnsnittanalyse under kryssede nicoler (XPL)"
        caption="Fra makroskopisk stein til mikroskopisk optikk. 1) Magmatisk larvikitt med karakteristiske tvillingstriper og perthittiske avblandingslameller i feltspat. 2) Klastisk sandstein med avrundede kvartskorn og sekundær silikasement. 3) Metamorf båndgneis med bølgende foliasjonslag, granater og høye interferensfarger i biotitt."
        marks={[
          { x: 16, y: 38, n: "1", text: "Larvikitt XPL", tone: "warm" },
          { x: 50, y: 38, n: "2", text: "Sandstein XPL", tone: "warm" },
          { x: 84, y: 38, n: "3", text: "Båndgneis XPL", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Tvillinglameller og perthitt i ternære feltspater gir labradorescens i håndstykke." },
          { n: "2", label: "Avrundede kvartskorn med 1. ordens grå/hvite farger og kvartssement i porerommene." },
          { n: "3", label: "Skarp foliasjon med fargerik biotitt og isotrope, mørke granatporfyroblaster." },
        ]}
      />

      <p>
        Mikroskopet bruker to polarisasjonsfiltre: En <em>polarisator</em> under prøven som slipper gjennom
        lys som svinger i ett plan, og en <em>analysator</em> over prøven som er vridd 90° i forhold til
        polarisatoren (kryssede nicoler, XPL). Når anisotrope mineralkrystaller roteres mellom filtrene,
        spaltes lyset i to stråler med ulik hastighet (dobbeltbrytning). Dette skaper praktfulle
        <strong>interferensfarger</strong> og karakteristiske <strong>utslukningsvinkler</strong> som gjør det
        mulig å identifisere mineraler med mikroskopisk presisjon.
      </p>

      {/* ------------------------------------------------------------------ */}
      {/* 7. INTERAKTIV LABORATORIEMODELL                                    */}
      {/* ------------------------------------------------------------------ */}
      <RockPetrologyModel />

      {/* ------------------------------------------------------------------ */}
      {/* 8. ALDERSDATERING: RELATIV OG RADIOMETRISK                         */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Geologisk tid og datering — relativ rekkefølge og absolutte årstall
      </h2>
      <p>
        Geologien opererer med to fundamentalt forskjellige måter å bestemme alder på:
        <strong>relativ alder</strong> (hva skjedde før hva?) og <strong>absolutt alder</strong> (hvor mange
        millioner år siden skjedde det?).
      </p>

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        De relative dateringsprinsippene
      </h3>
      <p>
        De grunnleggende prinsippene for relativ datering ble først formulert av den danske naturforskeren
        Niels Stensen (Nicolaus Steno) i 1669:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Superposisjonsprinsippet:</strong> I en uforstyrret sedimentær
          lagrekke er det nederste laget alltid eldst, og lagene oppover blir suksessivt yngre.
        </li>
        <li>
          <strong className="text-foreground">Krysskjæringsprinsippet:</strong> En geologisk struktur
          (som en magmatisk gang, en forkastning eller en pluton) er alltid <em>yngre</em> enn de bergartene
          eller strukturene den skjærer gjennom.
        </li>
        <li>
          <strong className="text-foreground">Inklusjonsprinsippet:</strong> Fragmenter av bergarter
          (xenolitter i magma eller rullestein i konglomerat) er alltid <em>eldre</em> enn bergarten de
          er innesluttet i.
        </li>
      </ul>

      <RelativeDatingDiagram />

      <p>
        En <strong>diskordans</strong> representerer et tidshull i den geologiske lagrekken. Det oppstår når
        sedimentasjon stopper opp, landskapet heves over havnivå og eroderes, før overflaten synker på nytt
        og nye sedimenter avsettes oppå den gamle erosjonsflaten.
      </p>

      <OrdBoks
        ord="Diskordans"
        barn="Erosjonsflate eller opphold i sedimentasjonen som representerer et betydelig tidshull mellom to lagrekker."
      />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Radiometrisk datering — isotopenes atomur
      </h3>
      <p>
        Absolutt datering bygger på radioaktivt henfall av ustabile isotoper. Henfallet er upåvirket av
        trykk, temperatur og kjemiske bindinger. Hastigheten uttrykkes ved isotopens <strong>halveringstid
        (T½)</strong> — tiden det tar før halvparten av de opprinnelige mor-atomene har henfalt
        til stabile datteratomer:
      </p>
      <p className="font-mono text-sm text-center my-3 text-primary">
        {"N(t) = N₀ · (1/2)^(t / T½) = N₀ · e^(-λt)"}
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Uran-Bly (²³⁸U → ²⁰⁶Pb) i zirkon:</strong> Halveringstid
          4,47 milliarder år (Schoene, 2014). Mineralet zirkon (ZrSiO₄) er uhyre robust og tåler både
          forvitring og metamorfose. Når zirkonkrystallen vokser i magma, slipper U⁴⁺ inn i gitteret,
          mens bly (Pb²⁺) avvises på grunn av ioneradius og ladning. Alt bly i zirkon er dermed
          dannet etter krystallisasjonen. Dette systemet har datert Norges eldste grunnfjell i Lofoten
          og Finnmark til <strong>2,8 milliarder år</strong>.
        </li>
        <li>
          <strong className="text-foreground">Karbon-14 (¹⁴C → ¹⁴N):</strong> Halveringstid 5730 år
          (Godwin, 1962; Reimer et al., 2020). Dannes i atmosfæren ved kosmisk stråling og tas opp i levende
          organismer via fotosyntese og næringskjeder. Når organismen dør, opphører opptaket. Rekkevidden er
          maksimalt 50 000 år. <em>Karbon-14 kan aldri brukes til å datere gneis, granitt eller dinosaurer!</em>
        </li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      {/* 9. KOMPETANSEMÅL, BEGREPER OG QUIZ                                 */}
      {/* ------------------------------------------------------------------ */}
      <Callout title="Kompetansemål (LK20 Geofag 1)">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Mineral"
          def="Naturlig, uorganisk fast stoff med definert kjemisk formel og velordnet krystallgitter."
        />
        <Term
          name="Bergart"
          def="Et naturlig aggregat sammensatt av ett eller flere mineraler, glass eller organisk materiale."
        />
        <Term
          name="Silikat"
          def="Mineralgruppe basert på [SiO₄]⁴⁻-tetraedre; utgjør over 90 prosent av jordskorpen."
        />
        <Term
          name="Bowens reaksjonsserie"
          def="Modell for rekkefølgen mineraler krystalliserer fra en silikatsmelte ved synkende temperatur."
        />
        <Term
          name="Diagenese"
          def="Fysiske og kjemiske prosesser (kompaksjon og sementering) som forvandler løsmasser til fast bergart."
        />
        <Term
          name="Foliasjon"
          def="Planstruktur i metamorfe bergarter dannet ved at flakmineraler orienterer seg vinkelrett på trykket."
        />
        <Term
          name="Metamorfosefacies"
          def="Mineralsamling i kjemisk likevekt som gjenspeiler spesifikke trykk- og temperaturforhold."
        />
        <Term
          name="Larvikitt"
          def="Norges nasjonalbergart; monzonittisk dypbergart i Oslofeltet med karakteristisk labradorescens."
        />
        <Term
          name="Rombeporfyr"
          def="Sjelden lavabergart med rombeformede feltspatkrystaller, karakteristisk for Oslofeltet."
        />
        <Term
          name="Superposisjon"
          def="Prinsippet om at det dypeste laget i en uforstyrret sedimentær lagrekke er eldst."
        />
        <Term
          name="Krysskjæring"
          def="En gang, forkastning eller intrusjon er alltid yngre enn bergartene den skjærer gjennom."
        />
        <Term
          name="Halveringstid"
          def="Tiden det tar før halvparten av en radioaktiv morisotop har henfalt til stabile datteratomer."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor kan Mohs hardhetsskala kun brukes på mineraler og ikke på bergarter?",
            options: [
              "Fordi bergarter alltid er mykere enn mineraler.",
              "Fordi en bergart er et aggregat av ulike mineraler med hver sin hardhet (f.eks. myk glimmer og hard kvarts i samme gneis).",
              "Fordi Mohs skala bare gjelder for kalsitt og diamant.",
              "Fordi bergarter smelter hvis man prøver å ripe dem.",
            ],
            answer: 1,
            explain:
              "Mohs måler ripehardheten til et bestemt krystallgitter. I en granitt vil kvartskornene ha hardhet 7, mens feltspat har 6 og biotitt har 2,5.",
          },
          {
            prompt: "Hva er den fundamentale kjemiske forskjellen mellom mineralene i Bowens diskontinuerlige og kontinuerlige serie?",
            options: [
              "Diskontinuerlig serie består av jern- og magnesiumsilikater som endrer krystallgitter trinnvis, mens kontinuerlig serie er plagioklas der Ca og Na byttes ut i samme gitter.",
              "Diskontinuerlig serie har ingen silisium, mens kontinuerlig serie er ren kvarts.",
              "Kontinuerlig serie krystalliserer bare på overflaten, mens diskontinuerlig krystalliserer i rombeporfyr.",
              "Det er ingen kjemisk forskjell; begge serier danner utelukkende ortoklas kalifeltspat.",
            ],
            answer: 0,
            explain:
              "Venstre gren endrer mineraltype og struktur trinnvis (olivin → pyroksen → amfibol → biotitt), mens høyre gren opprettholder plagioklasens feltspatgitter mens kalsium kontinuerlig erstattes av natrium.",
          },
          {
            prompt: "Hvorfor kan Karbon-14 (¹⁴C) ikke brukes til å datere en båndgneis eller en rombeporfyr?",
            options: [
              "Fordi Karbon-14 kun finnes på den sørlige halvkule.",
              "Fordi ¹⁴C har for kort halveringstid (5730 år) og kun tas opp i organisk materiale; gammelt grunnfjell dateres med U-Pb i zirkon.",
              "Fordi gneis inneholder for mye kalsitt.",
              "Fordi rombeporfyr har for høy tetthet til at radioaktivitet slipper ut.",
            ],
            answer: 1,
            explain:
              "¹⁴C har en rekkevidde på ca. 50 000 år og forutsetter biologisk karbonopptak. Norsk grunnfjell er hundrevis til milliarder av år gammelt og måles med langlivede radioaktive ur som ²³⁸U → ²⁰⁶Pb.",
          },
          {
            prompt: "Hva er en diskordans i en geologisk lagrekke?",
            options: [
              "Et lag som bruser med saltsyre.",
              "En intrusjon av flytende basaltlava.",
              "Et tidshull der erosjon eller manglende avsetning har fjernet deler av den geologiske historien før nye lag ble avsatt.",
              "En overgang der sedimentær bergart smelter direkte til magma.",
            ],
            answer: 2,
            explain:
              "En diskordans representerer en gammel erosjonsflate og et betydelig tidsintervall som mangler i steinens lagdelte arkiv.",
          },
        ]}
      />
    </TopicLayout>
  );
}
