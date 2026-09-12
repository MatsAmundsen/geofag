import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  GlobalClimateZonesDiagram,
  HadleyCloseupDiagram,
  InsolationDiagram,
  JetStreamDiagram,
  OneVsThreeCellsDiagram,
  PolarFrontNorwayDiagram,
  RossbyWavesDiagram,
  SurfaceWindsDiagram,
  WindCellsDiagram,
} from "@/components/diagrams";
import { WindSystemModel } from "@/components/models/wind-system-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vindsystemet")!;

export const Route = createFileRoute("/tema/vindsystemet")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vindsystemet",
    }),
  component: VindsystemetPage,
});

function VindsystemetPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren og storskala sirkulasjon"
      title="Det globale vindsystemet"
      lead="Sola varmer opp tropene langt mer enn polene. For at jorda ikke skal overopphetes ved ekvator og bunnfryse ved polene, må atmosfæren og havet frakte overskuddsvarmen mot nord og sør. Jordas rotasjon og Coriolis-effekten tvinger denne lufttransporten inn i tre store sirkulasjonsceller på hver halvkule. Sammen med jetstrømmer og vandrende lavtrykk former dette jordas ørkener, regnskoger og det skiftende været over Norge."
      banner="/images/banner-vind.jpg"
      bannerAlt="Jordas atmosfære sett fra bane med skyformasjoner over kontinenter og hav"
      prev={{ to: "/tema/hoytrykk-lavtrykk", label: "Forrige: Høytrykk og lavtrykk" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER.vindsystemet}
    >
      {/* SEKSJON 1: STRÅLINGSUBALANSEN */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Motoren: Klodens ujevne strålingsbalanse
      </h2>
      <p>
        I forrige kapittel lærte du at temperaturforskjeller skaper trykkforskjeller, og at
        trykkforskjeller setter lufta i bevegelse som vind. Nå skal vi heve blikket og se på hele
        planeten under ett: Hva er den overordnede kraften som holder hele lufthavet i konstant
        bevegelse?
      </p>
      <p>
        Svaret er <strong>solas innstråling</strong> og jordas kuleform. Ved ekvator står sola høyt
        på himmelen året rundt. Solstrålene treffer jordoverflaten nesten vinkelrett (90°
        innfallsvinkel), og den innkommende solenergien konsentreres over et lite areal. I tillegg
        passerer strålene gjennom et relativt tynt lag av atmosfæren, slik at lite energi spres
        eller reflekteres bort underveis.
      </p>
      <p>
        Når vi beveger oss mot polene, blir innfallsvinkelen stadig slakere. Nær polpunktene treffer
        solstrålene overflaten i en svært spiss vinkel. Den samme energimengden må derfor smøres
        utover et areal som er mer enn to til tre ganger så stort som ved ekvator. Dessuten må
        strålene passere en mye lengre vei gjennom atmosfæren, og store deler av overflaten er
        dekket av snø og is med høy refleksjonsevne (høy albedo).
      </p>
      <p>
        Dette skaper en fundamental <strong>strålingsubalanse</strong> på jorda:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Mellom 0° og ca. 38° breddegrad:</strong> Området mottar mer kortbølget solenergi
          enn det taper ved langbølget varmestråling ut i verdensrommet. Dette gir et{" "}
          <em>permanent energioverskudd</em>.
        </li>
        <li>
          <strong>Mellom ca. 38° og 90° breddegrad:</strong> Områdene taper mer energi til
          verdensrommet enn de mottar fra sola gjennom året. Dette gir et{" "}
          <em>permanent energiunderskudd</em>.
        </li>
      </ul>
      <p>
        Uten en kontinuerlig varmetransport ville tropene blitt ubeboelig varme og polene ubeboelig
        kalde. For å opprettholde likevekten fungerer atmosfæren og havene som en gigantisk
        varmekraftmaskin: Omtrent <strong>60 % av overskuddsvarmen</strong> fraktes mot polene via
        det globale vindsystemet, mens <strong>40 %</strong> fraktes med de store overflate- og
        dyphavsstrømmene.
      </p>

      <OrdBoks
        ord="Strålingsbalanse og netto stråling"
        barn="Forskjellen mellom innkommende solstråling (kortbølget) og utgående varmestråling (langbølget). Globalt over et helt år er strålingsbalansen i tilnærmet likevekt (netto 0). Regionalt er det et stort energioverskudd i tropene og et markant energiunderskudd i polarområdene. Det er denne ubalansen som driver atmosfærens sirkulasjon."
      />

      <InsolationDiagram />

      {/* SEKSJON 2: TRE SIRKULASJONSCELLER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Fra én til tre sirkulasjonsceller
      </h2>
      <p>
        I 1735 foreslo den britiske advokaten og meteorologen George Hadley en besnærende enkel
        modell: Hvis varm luft stiger ved ekvator og kald luft synker ved polene, burde lufta stige
        til værs i tropene, blåse i stor høyde hele veien til Nordpolen, synke ned i kulden der, og
        deretter blåse langs bakken sørover igjen som en sammenhengende nordavind.
      </p>
      <p>
        En slik enkel éncelle-modell ville ha fungert dersom jorda hadde stått helt stille i rommet.
        Men <strong>jorda roterer</strong> rundt sin egen akse fra vest mot øst en gang i døgnet.
        Denne rotasjonen gir opphav til <em>Coriolis-effekten</em>.
      </p>
      <p>
        Når den varme lufta stiger ved ekvator og begynner sin ferd mot nord i den øvre troposfæren,
        beveger den seg fra et område med enorm rotasjonshastighet (ca. 1670 km/t ved ekvator) mot
        områder hvor jordoverflaten roterer saktere. Coriolis-kraften avbøyer lufta mot høyre på den
        nordlige halvkule (og mot venstre på den sørlige).
      </p>
      <p>
        Allerede rundt 30° nordlig breddegrad er den nordgående luftstrømmen avbøyd så kraftig mot
        høyre at den ikke lenger blåser nordover, men nesten rett mot øst! Lufta samles opp i en
        kraftig vestlig strøm i høyden (den subtropiske jetstrømmen). Her «stanger» lufta mot en
        dynamisk barriere, avkjøles ved utstråling til rommet, blir tettere og tvinges ned mot
        overflaten.
      </p>
      <p>
        Dermed kan ikke lufta nå polen i én enkelt sløyfe. I stedet brytes sirkulasjonen på hver
        halvkule opp i <strong>tre distinkte sirkulasjonsceller</strong>:
      </p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          <strong>Hadley-cellen (0° til 30°):</strong> Et termisk direkte kretsløp drevet av solens
          intense oppvarming ved ekvator. Lufta stiger ved ekvator, strømmer mot polene i høyden,
          synker rundt 30° breddegrad, og returnerer mot ekvator som passatvinder.
        </li>
        <li>
          <strong>Polarcellen (60° til 90°):</strong> Likeledes et termisk direkte kretsløp drevet
          av intens kulde ved polene. Tung, iskald luft synker over polpunktene, presses sørover
          langs bakken som polare østavinder, og tvinges opp når den kolliderer med mildere
          luftmasser langs polarfronten rundt 60° breddegrad.
        </li>
        <li>
          <strong>Ferrel-cellen (30° til 60°):</strong> Ligger klemt mellom Hadley- og polarcellen.
          Denne cellen er
          <em>termisk indirekte</em>. Det betyr at den ikke drives av oppvarming fra bakken under,
          men tvinges rundt mekanisk som et tannhjul drevet av friksjon og storskala virvler
          (vandrende lavtrykk) mellom de to andre cellene. Lufta synker ved 30° og stiger ved 60°.
        </li>
      </ol>

      <OrdBoks
        ord="Termisk direkte vs. termisk indirekte kretsløp"
        barn="Et termisk direkte kretsløp (Hadley- og polarcellen) fungerer som en klassisk varmekraftmaskin: Varm luft stiger, og kald luft synker. Et termisk indirekte kretsløp (Ferrel-cellen) går motsatt vei av det lokale temperaturmønsteret: Her tvinges kjøligere luft opp ved 60° og varmere luft ned ved 30°, drevet av energioverføring fra vandrende stormsystemer."
      />

      <OneVsThreeCellsDiagram />
      <WindCellsDiagram />

      {/* SEKSJON 3: DYPDYKK I HADLEY OG ITCZ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hadley-cellen og ITCZ: Klodens mektigste regnmotor
      </h2>
      <p>
        For å forstå det globale vindsystemet må vi starte der motoren yter mest: i det tropiske
        lavtrykksbeltet. Her finner vi et fenomen som er helt avgjørende for jordas klima:{" "}
        <strong>ITCZ</strong>.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        Hva er ITCZ, og hvorfor oppstår den?
      </h3>
      <p>
        Navnet <strong>ITCZ</strong> står for <em>Intertropical Convergence Zone</em>, på norsk kalt
        den <strong>intertropiske konvergenssonen</strong>. Begrepet kan deles opp for å forstå
        fysikken:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Intertropisk («mellom tropene»):</strong> Sonen ligger i det varme beltet rundt
          ekvator, mellom Krepsens vendekrets i nord og Steinbukkens vendekrets i sør.
        </li>
        <li>
          <strong>Konvergens («å strømme sammen»):</strong> Passatvindene fra den nordlige halvkule
          (nordøstpassaten) og den sørlige halvkule (sørøstpassaten) blåser mot hverandre og
          kolliderer i dette beltet.
        </li>
        <li>
          <strong>Sone:</strong> Det er ikke en enkelt rett linje, men et bredt, belteformet bånd
          med intens sky- og nedbørsaktivitet som kveiler seg rundt hele kloden.
        </li>
      </ul>
      <p>
        Når de to fuktige passatvindene møtes, har lufta ingen andre steder å gjøre av seg enn{" "}
        <strong>oppover</strong>. Samtidig varmer den nådeløse ekvatorsolen opp havoverflaten og
        bakken til høye temperaturer (ofte over 28–30 °C). Vann fordamper i enorme mengder, og lufta
        blir ekstremt varm og mettet med vanndamp.
      </p>
      <p>
        Varm og fuktig luft har lav tetthet, og i møte med konvergensen oppstår en voldsom vertikal
        oppdrift kalt <em>dyp konveksjon</em>. Lufta presses oppover som i en gigantisk pipe.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        Latent varme: Drivstoffet i atmosfærens gigantmotor
      </h3>
      <p>
        Når den fuktige lufta stiger, faller lufttrykket, og lufta utvider seg og avkjøles
        adiabatisk. Når duggpunktstemperaturen nås, begynner vanndampen å kondensere til ørsmå
        vanndråper og iskrystaller.
      </p>
      <p>
        Her skjer det avgjørende: Kondensasjon er en faseovergang som frigjør{" "}
        <strong>latent varme</strong> (omlag 2,5 millioner joule per kilo vann som kondenserer!).
        Denne varmen tilføres den stigende lufta inne i skyen. Dermed forblir lufta i skyen varmere
        og lettere enn lufta omkring, og oppdriften akselererer ytterligere.
      </p>
      <p>
        Resultatet er dannelsen av gigantiske <strong>kumulonimbusskyer</strong> (tordenskyer) som
        skyter opp som enorme søyler («hot towers»). I tropene kan disse skytoppene nå helt opp til
        tropopausen i 16–18 kilometers høyde, der de flater ut i karakteristiske ambolter av
        cirrusskyer.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        Doldrums – seilskutenes fryktede stillebelte
      </h3>
      <p>
        Nede ved havoverflaten i selve konvergenssonen skjer det noe overraskende: Fordi
        luftbevegelsen her nesten utelukkende er <em>vertikal</em> (rett oppover), finnes det svært
        lite horisontal vind ved overflaten.
      </p>
      <p>
        I seilskutetiden ble dette beltet kalt <strong>doldrums</strong> (det ekvatorielle
        stillebeltet). Seilskip som seilte inn i ITCZ kunne bli liggende fullstendig værfast på et
        blikkstille hav i uker av gangen, omgitt av trykkende fuktighet, lammende hete og
        plutselige, voldsomme tropiske tordenskrall.
      </p>

      <OrdBoks
        ord="ITCZ og Doldrums"
        barn="ITCZ (den intertropiske konvergenssonen) er lavtrykksbeltet rundt ekvator der passatvindene møtes og tvinges til værs. Doldrums er sjøfolkenes navn på havområdene i ITCZ der horisontal vind dør ut fordi lufta suges rett til værs, preget av lammende vindstille og kraftige ettermiddagsbyger."
      />

      <HadleyCloseupDiagram />

      {/* HISTORISK BEGREP: HESTEBREDDEGRADENE -> DERETTER 30 GRADER */}
      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Fra fuktig oppdrift til ørkentørke: Hestebreddegradene og 30° breddegrad
      </h3>
      <p>
        Hva skjer med lufta etter at den har nådd toppen av troposfæren over ITCZ? Når lufta når
        tropopausen i 16–18 km høyde, stanger den mot stratosfæren, der temperaturen slutter å
        falle. Lufta må spre seg horisontalt mot nord og sør. Under den lange reisen i stor høyde
        har lufta mistet nesten all sin fuktighet gjennom de voldsomme regnskyllene ved ekvator. I
        tillegg taper den kontinuerlig varme gjennom infrarød stråling ut i verdensrommet.
      </p>
      <p>
        Lufta blir kald, tørr og tung. Rundt <strong>30° breddegrad</strong> (både nord og sør for
        ekvator) orker ikke lufta lenger å holde seg oppe. Den tvinges ned mot jordoverflaten i en
        bred, langsom bevegelse kalt <strong>subsidens</strong> (nedsynking).
      </p>
      <p>
        Når lufta synker, øker det omkringliggende lufttrykket. Lufta blir presset sammen og varmes
        opp adiabatisk (omlag 1 °C per 100 meter den synker). Varm luft kan holde på mye mer
        vanndamp enn kald luft. Dermed fordamper alle eventuelle skydråper momentant. Himmelen blir
        knallblå, skyfri og tørr, og ved bakken dannes det permanente, kraftige{" "}
        <strong>subtropiske høytrykk</strong>.
      </p>
      <p>
        Historisk ble dette rolige høytrykksbeltet i Atlanterhavet og Stillehavet beryktet under
        navnet <strong>«hestebreddegradene»</strong> (<em>horse latitudes</em>). Spanske seilskip
        lastet med hester på vei til koloniene i Karibia og Amerika ble ofte liggende ukesvis i
        blikkstille vann under den stekende subtropiske solen. Når drikkevannet og rasjonene tok
        slutt, ble mannskapet tvunget til å kaste hestene over bord for å spare vann, eller hestene
        døde av tørst.
      </p>
      <p>
        I moderne geofag og meteorologi bruker vi tallfestingen: <strong>30° breddegrad</strong>.
        Det er nemlig rundt 30° breddegrad at vi finner jordas store, sammenhengende ørkenbelter:
        Sahara, Den arabiske halvøy og Sonora i nord, og Kalahari, Atacama og de store australske
        ørkenene i sør.
      </p>
      <p>
        Legg merke til den dype faglige sammenhengen:{" "}
        <strong>
          Sahara er ikke en ørken fordi det tilfeldigvis mangler elver. Sahara er en ørken fordi
          atmosfæredynamikken tvinger lufta til å synke rundt 30° breddegrad!
        </strong>
      </p>

      <OrdBoks
        ord="Subsidens og subtropiske høytrykk"
        barn="Subsidens betyr storskala nedsynking av luft i atmosfæren. Når lufta synker, komprimeres den og varmes opp adiabatisk. Relativ fuktighet faller kraftig, skyer fordamper, og det etableres tørre, stabile høytrykk, slik vi ser i beltet rundt 30° breddegrad."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        ITCZs årstidsvandring og monsunens opprinnelse
      </h3>
      <p>
        ITCZ ligger ikke fastboltet over den geografiske ekvatorlinjen. Fordi jorda har en
        aksehelning på ca. 23,5°, forflytter punktet for maksimal solinnstråling (senitpunktet) seg
        nordover mot Krepsens vendekrets i juli, og sørover mot Steinbukkens vendekrets i januar.
      </p>
      <p>
        ITCZ følger denne «termiske ekvator» med noen ukers forsinkelse. Dessuten har fastland mye
        lavere varmekapasitet enn hav; kontinentene varmes opp og avkjøles mye raskere enn
        havvannet. Om sommeren på den nordlige halvkule varmes de veldige landmassene i Asia og
        Nord-Afrika ekstremt kraftig opp. Det fører til at ITCZ gjør et enormt byks langt nord for
        ekvator – over India og inn i Himalaya.
      </p>
      <p>
        Når ITCZ trekker langt nordover kontinentet om sommeren, suges fuktig maritim luft fra Det
        indiske hav inn over India og Sørøst-Asia. Dette er <strong>sommermonsunen</strong>. Den
        fuktige sørvestlige vinden presses opp mot landmassene og fjellkjedene, og slipper fra seg
        enorme mengder nedbør som er livsnerven for jordbruket og milliarder av mennesker.
      </p>

      {/* SEKSJON 4: OVERFLATEVINDENE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Bakkevindene: Passater, vestavinder og polare øster
      </h2>
      <p>
        Lufta som sank ned i høytrykkene rundt 30° breddegrad må strømme bort langs jordoverflaten.
        Noe strømmer mot ekvator, og noe strømmer mot polene. På ferden langs overflaten blir vinden
        avbøyd av Coriolis-kraften, og dette skaper de tre permanente overflatevindbeltene:
      </p>

      <div className="my-6 space-y-4 rounded-xl border border-border/80 bg-surface/50 p-5">
        <div>
          <h4 className="font-display font-medium text-amber-300">1. Passatvindene (0° til 30°)</h4>
          <p className="mt-1 text-sm text-foreground/90">
            Lufta strømmer fra høytrykksområdene rundt 30° breddegrad inn mot lavtrykket i ITCZ ved
            ekvator. På den nordlige halvkule avbøyes denne sørgående luftstrømmen mot høyre av
            Coriolis-effekten. Dermed blir vinden til en stødig <strong>nordøstpassat</strong>. På
            den sørlige halvkule avbøyes nordgående luft mot venstre, og blir til{" "}
            <strong>sørøstpassaten</strong>. Passatene er historiens mest pålitelige seilvind
            («trade winds»).
          </p>
        </div>
        <div className="border-t border-border/60 pt-3">
          <h4 className="font-display font-medium text-teal-300">
            2. Vestavindsbeltet (30° til 60°)
          </h4>
          <p className="mt-1 text-sm text-foreground/90">
            Fra høytrykksområdene rundt 30° strømmer også luftmasser nordover mot det subpolare
            lavtrykksbeltet ved 60°. Når denne nordgående lufta avbøyes mot høyre av
            Coriolis-kraften, dreies den mot øst. Vinden kommer altså
            <em>fra vest</em> og blåser <em>mot øst</em>. Dette er <strong>vestavindsbeltet</strong>{" "}
            (Westerlies). Norge, Storbritannia og store deler av Europa ligger midt i denne sonen.
          </p>
        </div>
        <div className="border-t border-border/60 pt-3">
          <h4 className="font-display font-medium text-sky-300">
            3. De polare østavindene (60° til 90°)
          </h4>
          <p className="mt-1 text-sm text-foreground/90">
            Over polpunktene synker iskald, tung luft ned og danner et termisk høytrykk. Når denne
            overskuddslufta presses sørover langs bakken mot 60° breddegrad, avbøyes den kraftig mot
            høyre av Coriolis-effekten (som har sin maksimale styrke ved polene). Den sørlige vinden
            dreies til en kald, tørr <strong>polar østavind</strong>.
          </p>
        </div>
      </div>

      <SurfaceWindsDiagram />

      {/* SEKSJON 5: KLIMABELTENE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Klimabeltene: Atmosfærens sirkulasjon skrevet på jordoverflaten
      </h2>
      <p>
        Hvis du reiser fra ekvator og rett nordover til Nordpolen, vil du observere et
        karakteristisk mønster i vegetasjon og landskap: frodig tropisk regnskog, knusktørr ørken,
        frodig temperert løv- og barskog, og til slutt frossen arktisk tundra og isørken.
      </p>
      <p>
        Dette er ikke tilfeldige naturfenomener.{" "}
        <strong>
          Jordas biomer og klimasoner er en direkte avspeiling av lufthavets vertikale bevegelser:
        </strong>
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>0° (ITCZ):</strong> Lufta stiger kontinuerlig → adiabatisk avkjøling → enorm
          kondensasjon og daglige ettermiddagsbyger → <em>Tropisk regnskog</em> (Amazonas, Kongo,
          Indonesia).
        </li>
        <li>
          <strong>Rundt 30° breddegrad:</strong> Lufta synker kontinuerlig (subsidens) → adiabatisk
          oppvarming → skyfritt, intens fordamping og tørke → <em>Subtropiske ørkener</em> (Sahara,
          Kalahari, Den arabiske ørken).
        </li>
        <li>
          <strong>45°–60° (Polarfronten og vestavindsbeltet):</strong> Varm subtropisk luft møter
          kald polarluft og tvinges til værs → ustabilt lavtrykksvær, hyppige nedbørsfronter og
          milde vintre mot vestkystene →<em>Temperert løvskog, regnskog og taiga (barskog)</em>.
        </li>
        <li>
          <strong>90° (Polene):</strong> Iskald luft synker over polene → svært lav absolutt
          fuktighet og stabilt høytrykk → <em>Polar isørken og tundra</em>. Faktisk mottar Antarktis
          så lite nedbør at innlandet er verdens tørreste ørken!
        </li>
      </ul>

      <GlobalClimateZonesDiagram />

      <PhotoFigure
        src="/images/fig-belter-globus.jpg"
        alt="Jorda fra bane med grønt ekvatorbelte, ørkenbelte, stormer mot Skandinavia og polaris"
        heading="Klimabeltene sett fra rommet"
        caption="Satellittbildet viser hvordan de vertikale kretsløpene manifesterer seg som distinkte ringer rundt planeten. Norge ligger i det stormfulle og dynamiske vestavindsbeltet mot nord."
        marks={[
          { x: 6, y: 48, n: "1", text: "Tropisk regnskog (ITCZ)", tone: "teal" },
          { x: 4, y: 32, n: "2", text: "Ørkenbelte (30° subsidens)", tone: "warm" },
          { x: 52, y: 22, n: "3", text: "Vestavindsbeltet · Norge", tone: "cold" },
          { x: 58, y: 8, n: "4", text: "Polarcellen og isen", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "ITCZ ved ekvator: Intens skyproduksjon og frodig tropisk regnskog." },
          {
            n: "2",
            label:
              "Subtropene rundt 30°: Subsidens og skyfrihet skaper Sahara og de globale ørkenene.",
          },
          {
            n: "3",
            label:
              "Mellombreddegradene (45–60°): Lavtrykkene fra polarfronten treffer Vest-Europa.",
          },
          {
            n: "4",
            label: "Polarområdet (90°): Kald, synkende luft danner tørr polaris og tundra.",
          },
        ]}
      />

      {/* SEKSJON 6: POLARFRONTEN, ROSSBYBØLGER OG JETSTRØMMER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Polarfronten, Rossbybølger og jetstrømmen
      </h2>
      <p>
        Rundt 60° nordlig breddegrad oppstår det en fundamental termisk kollisjon: Den milde,
        fuktige lufta som strømmer nordover med vestavindsbeltet, møter den isnende kalde, tørre
        lufta som strømmer sørover fra polområdene.
      </p>
      <p>
        Fordi de to luftmassene har svært ulik tetthet, blander de seg ikke umiddelbart. I stedet
        oppstår det en skarp grenseflate som kalles <strong>polarfronten</strong>.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        Polarfrontjetstrømmen: Atmosfærens ekspresstog i høyden
      </h3>
      <p>
        I overgangssonen mellom den varme lufta i sør og den kalde lufta i nord oppstår det en
        voldsom horisontal trykkgradient oppe i troposfæren. Jo høyere vi kommer i atmosfæren over
        et varmt område, desto saktere faller trykket sammenlignet med et kaldt område (fordi varm
        luft er lettere og tar mer plass).
      </p>
      <p>
        Dette skaper en kraftig horisontal trykkgradient i 9–11 kilometers høyde rett over
        polarfronten. Når lufta akselererer mot nord og avbøyes av Coriolis-kraften, etableres en
        smal, rørformet elv av ekstremt sterk vind fra vest mot øst:{" "}
        <strong>polarfrontjetstrømmen</strong>. I kjernen av jetstrømmen kan vindhastigheten
        overstige 300–400 km/t om vinteren.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        Rossbybølger: Traug, rygger og blokkerende høytrykk
      </h3>
      <p>
        Jetstrømmen og polarfronten blåser ikke i en snorrett linje rundt kloden. På grunn av
        friksjon mot store fjellkjeder (som Rocky Mountains og Himalaya) og temperaturforskjeller
        mellom hav og kontinenter, begynner jetstrømmen å bukte på seg.
      </p>
      <p>
        Disse storskala buktningene kalles <strong>Rossbybølger</strong> (eller planetariske
        bølger). De har typisk en bølgelengde på flere tusen kilometer, og det er vanligvis mellom
        tre og fem slike bølger rundt den nordlige halvkule til enhver tid:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Bølgedaler (traug / troughs):</strong> Når jetstrømmen bukter seg sørover, bringes
          iskald arktisk luft langt sørover. På østsiden av trauget oppstår det divergens (utsuging)
          i høyden, noe som føder intense lavtrykk ved bakken. Dette gir regn, storm og ustabilt
          vær.
        </li>
        <li>
          <strong>Bølgetopper (rygger / ridges):</strong> Når jetstrømmen bukter seg nordover,
          bringes varm, subtropisk luft langt nordover. Her synker lufta, og det etableres varme,
          stabile høytrykk med sol og tørke.
        </li>
        <li>
          <strong>Blokkerende høytrykk (f.eks. Omega-blokkering):</strong> Noen ganger blir
          buktningene så dype at en høytrykksrygg snøres helt av og blir liggende fastlåst over
          Skandinavia i uker eller måneder. Dette kalles en blokkering. Lavtrykkene tvinges til å gå
          i en bue rundt Skandinavia. Dette skjedde for eksempel under den ekstreme tørkesommeren i
          Sør-Norge i 2018.
        </li>
      </ul>

      <OrdBoks
        ord="Rossbybølger og blokkering"
        barn="Rossbybølger er meandrerende planetariske buktninger i polarfrontjetstrømmen. De styrer hvor lavtrykkene og høytrykkene vandrer. Dersom en kraftig høytrykksrygg blir stående stille over uker (blokkering), blokkeres lavtrykkene, og vi får langvarig tørke og hetebølger om sommeren eller streng kulde om vinteren."
      />

      <RossbyWavesDiagram />
      <JetStreamDiagram />

      {/* SEKSJON 7: VÆRET OVER NORGE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Været over Norge: Vestavind, polarfront og fjell
      </h2>
      <p>
        Norge strekker seg fra 58° til 71° nordlig breddegrad. Det plasserer landet vårt midt i
        skuddlinjen for det som skjer langs polarfronten i vestavindsbeltet.
      </p>
      <p>
        Lavtrykkene som dannes over Atlanterhavet (ofte nær Newfoundland eller Island) fanges opp av
        jetstrømmen og slynges inn mot norskekysten på rekke og rad. På sin vei over det varme
        Atlanterhavet har lufta sugd opp kolossale mengder vanndamp.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-teal-400">
        Orografisk nedbør over Langfjella: Brekke vs. Skjåk
      </h3>
      <p>
        Når den fuktige vestavinden treffer Norskekysten, møter den Norges mektige fjellrygg –{" "}
        <strong>Langfjella</strong>. Lufta har ingen annen mulighet enn å presses oppover
        fjellsidene:
      </p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          <strong>På losiden (Vestlandet):</strong> Lufta tvinges til værs. Den avkjøles adiabatisk
          med ca. 0,6 °C per 100 meter etter metning, vanndampen kondenserer i en rasende fart, og
          det bøtter ned som <strong>orografisk nedbør</strong>. Steder som <em>Brekke i Gulen</em>{" "}
          mottar i gjennomsnitt over 3500 mm nedbør i året (og har målt over 5000 mm i rekordår!),
          og Bergen får omlag 2250 mm.
        </li>
        <li>
          <strong>Over fjelltoppene:</strong> Lufta har nå tømt fra seg mesteparten av sin fuktighet
          som regn og snø.
        </li>
        <li>
          <strong>På lesiden (Østlandet og innlandsdalene):</strong> Når lufta strømmer nedover på
          østsiden av fjellet, synker den og komprimeres. Siden lufta nå er tørr, varmes den opp med
          den tørradiabatiske temperaturendringen på hele <strong>1,0 °C per 100 meter</strong> den
          synker. Lufta blir varmere og ekstremt tørr (fønvindeffekt).
        </li>
      </ol>
      <p>
        Dette skaper en av verdens mest dramatiske nedbørsgradienter: Mens Brekke på Vestlandet
        drukner i over 3500 mm nedbør, ligger <em>Skjåk i Ottadalen</em> like øst for Jotunheimen i
        dyp regnskygge og mottar i underkant av <strong>300 mm nedbør i året</strong>. Skjåk er
        faktisk tørrere enn deler av Sahara-ørkenen!
      </p>

      <PolarFrontNorwayDiagram />

      {/* INTERAKTIV MODELL */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Utforsk: Interaktiv modell av det globale vindsystemet
      </h2>
      <p>
        Bruk modellen under til å utforske hvordan breddegrader, lufttrykk, vindretninger og
        vertikale luftstrømmer henger sammen i et helhetlig tre-cellers system.
      </p>

      <WindSystemModel />

      {/* CALLOUTS FOR EKSAMEN OG MISFORSTÅELSER */}
      <div className="mt-8 space-y-4">
        <Callout title="Eksamensfokus: Den røde tråden i klimapensum">
          <p>
            Når du skal forklare det globale vindsystemet på eksamen i Geofag 2, bygg svaret logisk
            opp i fire trinn:
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            <li>
              <strong>Energikilden:</strong> Ujevn solinnstråling skaper energioverskudd i tropene
              og underskudd ved polene.
            </li>
            <li>
              <strong>Coriolis-oppsplittingen:</strong> Jordrotasjonen gjør at éncelle-modellen
              bryter sammen; vi får tre celler per halvkule.
            </li>
            <li>
              <strong>Klimabeltene:</strong> Stigende luft gir lavtrykk og regn (ITCZ ved 0°,
              polarfronten ved 60°); synkende luft gir høytrykk og ørkener (rundt 30° breddegrad og
              ved polene).
            </li>
            <li>
              <strong>Norges plassering:</strong> Vestavindsbeltet og polarfronten sender fuktige
              lavtrykk mot kysten, og Langfjella forsterker nedbøren orografisk på Vestlandet mens
              Østlandet havner i regnskygge.
            </li>
          </ol>
        </Callout>

        <Callout title="Vanlige misforståelser du må unngå">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>
              <strong>Misforståelse 1:</strong>{" "}
              <em>
                «Hadley-, Ferrel- og polarcellene er tre lukkede rør der lufta sirkulerer perfekt
                hver eneste dag.»
              </em>
              <br />
              <strong>Faktum:</strong> Cellene er et <em>statistisk gjennomsnitt</em> over tid.
              Særlig i Ferrel-cellen over Norge ser du sjelden en jevn sirkulasjon; her dominerer
              kaotiske, vandrende lavtrykk og varierende vindretninger.
            </li>
            <li>
              <strong>Misforståelse 2:</strong>{" "}
              <em>«Sahara og andre ørkener finnes fordi det ikke er noe vann i bakken.»</em>
              <br />
              <strong>Faktum:</strong> Ørkenene skyldes atmosfærisk subsidens (nedsynking) rundt 30°
              breddegrad, som fordamper skyene og gir permanent tørke.
            </li>
            <li>
              <strong>Misforståelse 3:</strong>{" "}
              <em>«ITCZ ligger alltid nøyaktig over ekvatorlinjen.»</em>
              <br />
              <strong>Faktum:</strong> ITCZ vandrer med solas senitpunkt mot nord i juli og mot sør
              i januar, og trekker ekstra langt inn over oppvarmede kontinenter om sommeren
              (monsunsirkulasjonen).
            </li>
          </ul>
        </Callout>
      </div>

      {/* NØKKELBEGREPER */}
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">
        Nøkkelbegreper til repetisjon
      </h2>
      <TermGrid>
        <Term
          name="Strålingsbalanse"
          def="Forskjellen mellom absorbert solinnstråling og utgående varmestråling. Overskudd i tropene, underskudd ved polene."
        />
        <Term
          name="ITCZ (Intertropisk konvergenssone)"
          def="Lavtrykksbelte rundt ekvator der passatene møtes, og fuktig luft tvinges til værs i voldsomme konveksjonsbyger."
        />
        <Term
          name="Subsidens ved 30°"
          def="Storskala nedsynking av luft i subtropene. Luften varmes adiabatisk, skyer fordamper og gir opphav til jordas store ørkener."
        />
        <Term
          name="Passatvinder"
          def="Stødige overflatevinder mot ITCZ: Nordøstpassat på nordlige halvkule og sørøstpassat på sørlige halvkule."
        />
        <Term
          name="Vestavindsbeltet"
          def="Vindbeltet mellom 30° og 60° der luftstrømmen avbøyes av Coriolis til å blåse fra vest mot øst."
        />
        <Term
          name="Polarfronten"
          def="Kollisjonssonen rundt 60° breddegrad mellom varm subtropisk luft og kald arktisk polarluft, der lavtrykk dannes."
        />
        <Term
          name="Rossbybølger"
          def="Meandrerende planetariske bølger i polarfrontjetstrømmen som styrer vandringen til lavtrykk og høytrykk."
        />
        <Term
          name="Orografisk nedbør"
          def="Nedbør som utløses når fuktig vind tvinges opp av fjell (loside), etterfulgt av regnskygge og fønvind på lesiden."
        />
      </TermGrid>

      {/* INTERAKTIV QUIZ MED 6 SPØRSMÅL */}
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor brytes atmosfærens sirkulasjon opp i tre celler i stedet for én stor celle på hver halvkule?",
            options: [
              "Fordi jordoverflaten har ulik fordeling av hav og kontinenter.",
              "Fordi Jordas rotasjon og Coriolis-effekten avbøyer luftstrømmene og etablerer jetstrømmer som hindrer direkte lufttransport til polene.",
              "Fordi ozonlaget absorberer UV-stråling i stratosfæren og stopper oppdriften.",
              "Fordi gravitasjonskraften avtar kraftig fra ekvator mot polpunktene.",
            ],
            answer: 1,
            explain:
              "På en ikke-roterende jord ville Hadleys éncelle-modell fungert. Men jordas rotasjon avbøyer lufta via Coriolis-effekten slik at den subtropiske jetstrømmen dannes rundt 30° breddegrad, noe som tvinger lufta ned og deler sirkulasjonen inn i tre celler.",
          },
          {
            prompt: "Hva kjennetegner ITCZ (den intertropiske konvergenssonen)?",
            options: [
              "Høyt lufttrykk, skyfri himmel og konstante nordavinder.",
              "Konvergens mellom passatvindene, intens oppdrift (konveksjon), frigjøring av latent varme og kraftige tordenbyger.",
              "Permanent vestavind og kraftig subsidens over landmassene.",
              "Kaldluft som synker ned fra stratosfæren og gir ekstrem kulde.",
            ],
            answer: 1,
            explain:
              "ITCZ er lavtrykksbeltet ved ekvator der passatene fra nord og sør møtes (konvergerer). Intens solvarme og fordampning gir dyp konveksjon og dannelse av massive kumulonimbusskyer der latent varme frigjøres.",
          },
          {
            prompt:
              "Hva er den fysiske hovedårsaken til at jordas store ørkener ligger i beltet rundt 30° breddegrad?",
            options: [
              "Området mottar mer kosmisk stråling enn noen annen breddegrad.",
              "Luft som har steget ved ITCZ avkjøles i høyden og tvinges ned (subsidens); den synkende lufta komprimeres og varmes adiabatisk, slik at all fuktighet fordamper.",
              "Det finnes ingen fjellkjeder i disse områdene som kan stoppe vinden.",
              "Havstrømmene rundt 30° breddegrad koker og tørker ut landmassene.",
            ],
            answer: 1,
            explain:
              "Subsidens (nedsynking) rundt 30° breddegrad komprimerer lufta, øker temperaturen adiabatisk og senker den relative fuktigheten drastisk. Dette skaper permanente, skyfrie høytrykk (f.eks. over Sahara).",
          },
          {
            prompt:
              "Hvorfor kalles Ferrel-cellen mellom 30° og 60° breddegrad for et «termisk indirekte» kretsløp?",
            options: [
              "Fordi den bare eksisterer i sommerhalvåret.",
              "Fordi den ikke drives av lokal soloppvarming fra bakken, men tvinges rundt mekanisk av friksjon og virvler mellom Hadley- og polarcellen.",
              "Fordi den transporterer kulde fra ekvator mot polene.",
              "Fordi den styres helt og holdent av månens tidevannskrefter.",
            ],
            answer: 1,
            explain:
              "I motsetning til Hadley- og polarcellen, der varm luft stiger og kald luft synker (termisk direkte), tvinges lufta i Ferrel-cellen ned der det er relativt varmt (30°) og opp langs den kaldere polarfronten (60°), drevet som et tannhjul av stormer og lavtrykk.",
          },
          {
            prompt:
              "Hva skjer når en Rossbybølge danner en såkalt «omega-blokkering» over Skandinavia om sommeren?",
            options: [
              "Det fører til uavbrutt regn og storm over hele Norden i flere måneder.",
              "En kraftig høytrykksrygg blir liggende fastlåst; lavtrykkene presses i en bue utenom, og vi får langvarig tørke og høye temperaturer.",
              "Golfstrømmen stopper opp og snur sørover igjen mot Spania.",
              "Jetstrømmen forsvinner fullstendig fra den nordlige halvkule.",
            ],
            answer: 1,
            explain:
              "En omega-blokkering er et stabilt, mektig høytrykk som har form som den greske bokstaven Ω. Det fungerer som en massiv mur mot Atlanterhavets lavtrykk, og leder dem nord eller sør for Skandinavia, noe som gir langvarig tørke og hete (slik som sommeren 2018).",
          },
          {
            prompt:
              "Hvorfor mottar Brekke i Gulen over 3500 mm nedbør i året, mens Skjåk i Ottadalen bare mottar under 300 mm?",
            options: [
              "Brekke ligger i polarcellen, mens Skjåk ligger i Hadley-cellen.",
              "Fuktig vestavind presses opp over Langfjella og gir voldsom orografisk nedbør på losiden (Brekke), mens lufta synker, varmes og tørker ut på lesiden (Skjåk i regnskyggen).",
              "Skjåk ligger på en så høy høyde at skyene ikke når opp til dalbunnen.",
              "Det regner bare om natten i Brekke og bare om vinteren i Skjåk.",
            ],
            answer: 1,
            explain:
              "Dette er lærebokeksempelet på orografisk nedbør og regnskygge i Norge: Vestavinden tvinges til værs over Langfjella og dumper fuktigheten på Vestlandet. På lesiden synker den tørre lufta og varmes adiabatisk med 1 °C per 100 m, noe som gir ekstrem tørke i skjermede innlandsdaler som Skjåk.",
          },
        ]}
      />
    </TopicLayout>
  );
}
