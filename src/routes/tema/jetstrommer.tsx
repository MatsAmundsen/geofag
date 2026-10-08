import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  JetBlockingDiagram,
  JetFormsDiagram,
  JetProfileDiagram,
  JetSeasonDiagram,
  JetStreakDiagram,
  NaoDiagram,
  ThermalWindDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/jetstrommer")!;

export const Route = createFileRoute("/tema/jetstrommer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/jetstrommer",
    }),
  component: JetstrommerPage,
});

function JetstrommerPage() {
  return (
    <TopicLayout
      kicker="Den globale atmosfæren"
      title="Jetstrømmer og stormbaner"
      lead="I grenselandet mellom troposfæren og stratosfæren, 8 til 12 kilometer over oss, raser mektige elver av vind i over 300 kilometer i timen. Jetstrømmene er atmosfærens motorveier. De oppstår i kollisjonssonene mellom klodens varme og kalde luftmasser, og de fungerer som et overordnet styringsorgan for alt vær på våre breddegrader: De suger luft opp fra bakken, puster liv i lavtrykkene, og styrer stormbanene rett inn mot norskekysten. Forstår du jetstrømmen, forstår du hvorfor været i Norge kan skifte fra mildt pøsregn til bitende arktisk kulde i løpet av få dager."
      banner="/images/fig-jet.jpg"
      bannerAlt="Tynn, rask skyelv høyt over havet mot jordas krumning"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
      kilder={KILDER.jetstrommer}
    >
      {/* 1. HVA EN JETSTRØM ER */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er en jetstrøm? Atmosfærens høyhastighetselver
      </h2>
      <p>
        Mens de store vindbeltene ved bakken (som passatene og vestavindsbeltet) strekker seg over
        flere tusen kilometer i bredden, er en <strong>jetstrøm</strong> et konsentrert, relativt
        smalt og flattrykt bånd av ekstrem vestavind like under tropopausen (NOAA, u.å.-a).
      </p>
      <p>
        Tenk deg en brusende elv i luften: Tverrsnittet er typisk 200 til 500 kilometer bredt og bare
        2 til 4 kilometer tykt, men elven kan strekke seg sammenhengende over mange tusen kilometer
        rundt hele kloden. Vindhastigheten er aller størst i en trang kjerne i midten, og avtar
        raskt ut mot sidene og i vertikal retning:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Typisk marsjhastighet:</strong> Vinden i kjernen ligger vanligvis mellom{" "}
          <strong>150 og 250 km/t</strong> (40–70 m/s).
        </li>
        <li>
          <strong>Ekstreme vinterkjerner:</strong> Når temperaturkontrasten mellom polisen og
          tropene er på sitt skarpeste midtvinters, kan vindfarten over Japan og Nord-Atlanteren
          passere <strong>400–450 km/t</strong> (&gt;120 m/s) – raskere enn et japansk Shinkansen-lyntog!
        </li>
        <li>
          <strong>Vestavindsretning:</strong> På begge halvkuler blåser jetstrømmene nesten alltid{" "}
          <strong>fra vest mot øst</strong>. Dette skyldes at trykkgradienten i høyden peker mot
          polene, mens Corioliskraften avbøyer luftstrømmen mot øst.
        </li>
      </ul>

      <OrdBoks
        ord="Jetstrøm"
        barn="Et smalt, rørformet belte med ekstrem vestavind i øvre troposfære (typisk 8–16 km høyde). Dannes over kollisjonssoner mellom luftmasser med ulik temperatur."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Oppdagelsen og moderne luftfart
      </h3>
      <p>
        Jetstrømmene ble først systematisk kartlagt på 1920-tallet av den japanske meteorologen
        Wasaburo Oishi, som slapp opp pilotballonger nær Fuji-fjellet. Men fenomenet ble verdenskjent
        under andre verdenskrig: Da amerikanske B-29 bombefly skulle fly vestover mot Japan i 10
        kilometers høyde, opplevde pilotene at flyene nærmest sto stille i forhold til bakken. De
        hadde fløyet rett inn i en motvind på over 250 km/t som ingen inntil da visste eksisterte.
      </p>
      <p>
        I dag er internasjonal luftfart helt avhengig av å navigere etter jetstrømmen:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Flytid og drivstoff:</strong> Et rutefly fra New York til Oslo flyr med
          polarfrontjeten i ryggen. Medvinden kan kutte flytiden med over én time sammenlignet med
          turen vestover mot New York, og flyselskapene sparer tusenvis av liter flybensin. Ruteplanleggere
          oppdaterer flyrutene daglig for å legge kursen midt i jetkjernen østover, og svinge utenom
          den vestover.
        </li>
        <li>
          <strong>Klarværsturbulens (CAT):</strong> I randsonene til jetstrømmen endrer vindhastigheten
          seg voldsomt over bare noen få meters avstand (kraftig <em>vindskjæring</em>). Dette skaper
          kaotiske, usynlige virvler i luften. Siden luften her oppe er knusktørr, finnes det ingen
          skyer som advarer pilotene. Dette kalles <strong>klarværsturbulens</strong> (Clear Air
          Turbulence) og er den vanligste årsaken til uventede risting og skader på passasjerer i
          marsjhøyde.
        </li>
        <li>
          <strong>Cirrusstriper – jetens fingeravtrykk på himmelen:</strong> Selv om luften i
          jetstrømmen er usynlig, kan du ofte observere den fra bakken. Når fuktighet kastes opp i
          jeten, trekkes iskrystallene i fjærsyene (<em>Cirrus</em>) ut i lange, snorrette parallelle
          striper over himmelen. Ser du slike striper fare over himmelen mens det er vindstille nede
          på bakken, ser du jetstrømmen i aksjon 10 kilometer over deg.
        </li>
      </ul>

      <OrdBoks
        ord="Klarværsturbulens (CAT)"
        barn="Plutselig, kraftig turbulens i skyfri luft forårsaket av ekstrem horisontal eller vertikal vindskjæring i randsonen til en jetstrøm."
      />

      {/* 2. TO JETBELTER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Klodens to jetbelter: Polarfrontjeten og Den subtropiske jetstrømmen
      </h2>
      <p>
        I dagligtale snakker vi ofte om «jetstrømmen» i entall, men på hver halvkule finnes det{" "}
        <strong>to permanente jetbelter</strong> i troposfæren. De oppstår i helt ulike soner og
        drives av forskjellige mekanismer:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-300">
            <span>🌊</span> 1. Polarfrontjeten (PFJ)
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Posisjon:</strong> Ca. 50°–65°N, rett over <em>polarfronten</em>.
            </li>
            <li>
              <strong>Høyde:</strong> Typisk <strong>9–11 km</strong> (polar tropopause).
            </li>
            <li>
              <strong>Drivkraft:</strong> Den voldsomme horisontale temperaturkontrasten mellom
              iskald arktisk polarluft og mild subtropisk luft.
            </li>
            <li>
              <strong>Karakter:</strong> Ekstremt meandrerende og dynamisk. Det er denne jetstrømmen
              som <strong>styrer lavtrykkene, stormene og ruskeværet inn mot Norge</strong>!
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-300">
            <span>☀️</span> 2. Den subtropiske jetstrømmen (STJ)
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Posisjon:</strong> Ca. 30°N/S, ved polgrensen til Hadleycellen.
            </li>
            <li>
              <strong>Høyde:</strong> Typisk <strong>13–16 km</strong> (tropisk tropopause).
            </li>
            <li>
              <strong>Drivkraft:</strong> Bevaring av vinkelmoment (spinn) fra luften som stiger ved
              ekvator og strømmer mot polene i høyden.
            </li>
            <li>
              <strong>Karakter:</strong> Betydelig mer stabil og rettlinjet. Ligger over jordens store
              ørkenbelter og hestebreddegrader; styrer monsuner og subtropisk vær.
            </li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Hvorfor ligger de i forskjellig høyde? Tropopausens trappetrinn!</strong>
        Dette er en klassisk geofaglig observasjon: Fordi luften i tropene er gjennomvarm, utvider
        den seg og løfter den tropiske tropopausen helt opp til <strong>16–17 kilometers høyde</strong>.
        I Arktis er luften derimot iskald og sammentrykt, slik at den polare tropopausen bare ligger{" "}
        <strong>8–9 kilometer over bakken</strong>.
      </p>
      <p>
        I overgangssonene mellom sirkulasjonscellene oppstår det brå trappetrinn i tropopausen:
        Både polarfrontjeten og den subtropiske jeten sitter nøyaktig i disse «tropopausebruddene»!
      </p>

      <JetProfileDiagram />

      <p className="text-sm text-muted-foreground">
        <em>Merk skillet til polar natt-jet:</em> I stratosfæren over Arktis og Antarktis finnes det
        om vinteren en tredje jetstrøm, <em>polar natt-jeten</em> (Polar Night Jet). Den oppholder
        seg i 25–40 kilometers høyde over mørkelagte polare stratosfærelag og er koblet til
        polarvirvelen og ozonkjemi. Den må ikke forveksles med troposfærens jetstrømmer som styrer
        norsk vær.
      </p>

      {/* 3. TERMISK VIND */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Fysikken bak jetstrømmen: Termisk vind og trykkflaters helling
      </h2>
      <p>
        Hvordan kan en temperaturforskjell langs bakken forvandle seg til en vanvittig vestavind
        ti kilometer oppe i luften? Forklaringen er en av meteorologiens mest elegante fysiske lover:{" "}
        <strong>termisk vind</strong>.
      </p>
      <p>
        La oss bygge mekanismen trinn for trinn fra termodynamiske prinsipper:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Hypsometrisk søyletykkelse:</strong> Luft er en gass som adlyder ideell gasslov.
          Varm luft har lavere tetthet og tar større plass; en varm luftsøyle er derfor{" "}
          <strong>høy og romslig</strong>. Kald luft trekker seg sammen og er tung; en kald luftsøyle
          er <strong>komprimert og lav</strong>.
        </li>
        <li>
          <strong>Trykkfall med høyden:</strong> Tenk deg at lufttrykket ved bakken er helt likt
          (1013 hPa) både i subtropene og over Arktis. I den kalde, tette luften faller trykket
          ekstremt raskt med høyden. I den varme, tynne luften faller trykket adskillig saktere.
        </li>
        <li>
          <strong>Trykkflatene heller brattere og brattere:</strong> Hvis vi tegner opp flaten der
          trykket er 500 hPa, ligger denne flaten rundt 5 700 meter over havet i subtropene, men bare
          5 200 meter over havet i Arktis. Fortsetter vi opp til 250 hPa (tropopausen), er
          høydeforskjellen blitt over 1 200 meter! Trykkflatene heller altså kraftigere og kraftigere
          nedover mot polen for hvert trinn vi stiger.
        </li>
        <li>
          <strong>Eksplosiv trykkgradientkraft i høyden:</strong> Hellingen på trykkflatene betyr at
          det oppstår et kolossalt overtrykk i høyden over tropene, og et tilsvarende undertrykk i
          høyden over Arktis. <strong>Trykkgradientkraften (F_pg) peker rett mot polen</strong>, og
          den blir sterkere jo høyere opp vi kommer.
        </li>
        <li>
          <strong>Coriolis fullfører verket:</strong> Idet luften akselererer mot polen i 10
          kilometers høyde, finnes det ingen bakkefriksjon som bremser farten. Corioliskraften
          avbøyer luftstrømmen 90° til høyre (på nordlig halvkule). Når trykkgradientkraften og
          Corioliskraften er i balanse (geostrofisk vind), blåser vinden nøyaktig parallelt med
          isobarene – <strong>rett fra vest mot øst som en jetstrøm!</strong>
        </li>
      </ol>

      <OrdBoks
        ord="Termisk vind"
        barn="Den vertikale endringen i geostrofisk vindhastighet som skyldes en horisontal temperaturgradient. Sterkere temperaturforskjell mellom pol og ekvator gir raskere jetstrøm i høyden."
      />

      <p>
        <strong>Hvorfor er vinden sterkest akkurat ved tropopausen?</strong>
        Så lenge vi befinner oss i troposfæren, er det varmest i sør og kaldest i nord. Dermed
        blir gradienten brattere og vinden sterkere for hver meter vi klatrer. Men over
        tropopausen – inne i stratosfæren – snur dette! Der absorberer ozonlaget solstråling, og den
        tropiske tropopausen er faktisk mye kaldere (-75 °C) enn den polare (-50 °C). Den horisontale
        temperaturgradienten snur, trykkflatenes helling flater ut, og vindhastigheten avtar igjen.
        Toppunktet for hastighet inntreffer dermed nøyaktig i overgangssonen: <strong>i jetkjernen</strong>.
      </p>

      <ThermalWindDiagram />

      {/* 4. ZONAL VS MERIDIONAL */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Zonal og meridional form: Rossbybølger og virvling
      </h2>
      <p>
        Jetstrømmen flyter aldri i en snorrett linje rundt jorden. Den bukter og slynger seg i enorme,
        kontinentstore bølger kalt <strong>Rossby-bølger</strong> (oppkalt etter den svensk-amerikanske
        meteorologen Carl-Gustaf Rossby). Det er formen på disse bølgene som avgjør om du må pakke
        paraply, solkrem eller dunjakke den neste uken.
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-400">
            <span>➡️</span> Zonal strøm: Raskt vestavær
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jetstrømmen blåser nesten snorrett fra vest mot øst, parallelt med breddegradene.
            Temperaturkontrasten er jevnt fordelt, og vestavindsbeltet er sterkt. Lavtrykkene langs
            polarfronten feier raskt over Atlanteren og inn mot Norge. Været er preget av hyppige
            skifter: regnvær etterfølges raskt av opphold, temperaturene er milde, og ingen værtype
            rekker å «låse seg fast».
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-400">
            <span>〰️</span> Meridional strøm: Store bølger og værlås
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jetstrømmen meandrerer i dype svinger nord–sør. Vinden frakter enorme luftmasser på
            tvers av breddegradene:
            <br />
            • <strong>Rygg (bølgetopp mot nord):</strong> Pumper varm subtropisk luft mot Arktis. Luften
            synker (subsidens), skyer fordamper og gir hetebølge og tørke.
            <br />
            • <strong>Tråg (bølgedal mot sør):</strong> Dumper iskald polarluft langt sørover. Luften
            stiger, skaper bygeskyer og gir ukelange kuldebølger.
          </p>
        </div>
      </div>

      <p>
        <strong>Hvorfor begynner jetstrømmen å svinge?</strong>
        Rossby-bølger drives av jordens krumning og rotasjon gjennom en fysisk lov som kalles{" "}
        <strong>bevaring av potensiell virvling (vorticity)</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Jordrotasjonens breddegradseffekt (Beta-effekten):</strong> Corioliskraften øker fra
          null ved ekvator til maksimum ved polene. Når en luftpakke beveger seg nordover, får den
          mer «spinn» fra jordkloden under seg. For å bevare sitt totale spinn må luften begynne å
          rotere motsatt vei (med klokken, antisyklonalt). Den tvinges derfor til å svinge mot høyre
          og sørover igjen – en rygg er født. Når den beveger seg sørover, skjer det motsatte: Den
          avbøyes mot venstre og nordover – et tråg dannes. Dette skaper en permanent bølgedynamikk!
        </li>
        <li>
          <strong>Fjellkjeder som bølgeutløsere:</strong> Når jetstrømmen treffer mektige fjellkjeder
          som Rocky Mountains i Nord-Amerika eller Andesfjellene i Sør-Amerika, presses luften opp og
          klemmes sammen. Dette tvinger frem et stående tråg på lesiden av fjellet, som forplanter
          seg som en bølgebevegelse hele veien over Atlanteren mot Norge.
        </li>
      </ul>

      <OrdBoks
        ord="Rossby-bølger"
        barn="Gigantiske planetære meandrerende bølger på jetstrømmen med bølgelengder på 4000–8000 km. Skapes av variasjon i Corioliskraft med breddegrad og store fjellbarrierer."
      />

      <JetFormsDiagram />

      {/* 5. JETKJERNER OG 4-KVADRANT-MODELLEN */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Jetkjernen (Jet streak) og syklonenes fødsel: 4-kvadrant-modellen
      </h2>
      <p>
        I lærebøker heter det ofte at «jetstrømmen styrer lavtrykkene». Men jetstrømmen gjør mye mer
        enn å bare være en passiv reisevei: <strong>Jetstrømmen skaper og forsterker lavtrykkene aktivt!</strong>
      </p>
      <p>
        Inne i jetstrømmen finnes det soner der vinden er lokalt mye sterkere enn i områdene rundt.
        En slik lomme med topphastighet kalles en <strong>jetkjerne</strong> (engelsk: <em>jet streak</em>).
        Når luftmolekylene strømmer gjennom denne kjernen, utsettes de for voldsom akselerasjon og
        bremsing:
      </p>

      <ol className="list-decimal space-y-2.5 pl-6 text-foreground/90">
        <li>
          <strong>Innløpet (Entrance region):</strong> Luften strømmer inn i kjernen og må{" "}
          <strong>akselerere</strong> fra f.eks. 150 km/t til 300 km/t. I akselerasjonsfasen henger
          Corioliskraften litt etter trykkgradientkraften. Luften tvinges på tvers av jeten mot lavt
          trykk (mot nord).
        </li>
        <li>
          <strong>Utløpet (Exit region):</strong> Luften forlater kjernen og må{" "}
          <strong>bremse ned</strong> igjen. Nå er farten høyere enn den lokale trykkgradienten
          tilsier, og Corioliskraften «vinner» drakampen. Luften kastes på tvers av jeten mot høyre
          (mot sør).
        </li>
      </ol>

      <p>
        Denne tverrgående bevegelsen deler jetkjernen inn i <strong>fire distinkte kvadranter</strong>:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-red-400">
            <span>🌀</span> Venstre utløp (Left exit): Lavtrykksmotoren!
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I den venstre delen av utløpet sprer luften seg vifteformet fra hverandre. Her oppstår det{" "}
            <strong>maksimal divergens i høyden</strong>. Det fjernes bokstavelig talt luftmasse fra
            toppen av atmosfæren! Tyngden av luftsøylen minker, og barometeret på bakken stuper. For
            å tette masseunderskuddet suges luft opp fra bakken i en kraftig oppdrift. Luften avkjøles
            adiabatisk, danner tette skyer, og et <strong>dypgående lavtrykk (syklon)</strong> fødes
            med voldsomt regnvær og kuling!
          </p>
        </div>
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-400">
            <span>☀️</span> Høyre utløp (Right exit): Nedsynking og høytrykk
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I den høyre delen av utløpet hoper luftmassene seg opp. Her oppstår det{" "}
            <strong>konvergens i høyden</strong>. Vekten av luftsøylen øker, og overskuddsmassen
            presses nedover mot bakken i en storskala subsidens. Luften komprimeres og varmes
            adiabatisk, skydråpene fordamper, og på bakken dannes det et stabilt{" "}
            <strong>høytrykk</strong> med klar himmel og rolige vinder.
          </p>
        </div>
      </div>

      <OrdBoks
        ord="Divergens i høyden"
        barn="Horisontal spredning av luftmasser i øvre troposfære (særlig i venstre utløp av en jetkjerne). Fjerner luftmasse fra søylen slik at bakketrykket faller og lavtrykk dypner."
      />

      <p>
        I tillegg gir den horisontale temperaturkontrasten langs polarfronten næring til en prosess
        som kalles <strong>baroklin ustabilitet</strong>: Bølgen på bakken kan hente potensiell energi
        fra temperaturforskjellen og omdanne den til rotasjonsenergi i syklonen. Hvert nytt lavtrykk
        dannes, forsterkes og feier østover like under jetkjernene. Dette sporet kalles{" "}
        <strong>stormbanen</strong>.
      </p>

      <JetStreakDiagram />

      {/* 6. BLOKKERING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Atmosfærisk blokkering: Omega-blokk og Rex-blokk
      </h2>
      <p>
        Noen ganger forsterkes en høytrykksrygg i en Rossby-bølge så kraftig at den stanser opp og
        nekter å vike. Dette kalles <strong>atmosfærisk blokkering</strong> (blocking high).
      </p>
      <p>
        Det mest kjente blokkeringsmønsteret over Europa kalles en <strong>Omega-blokk</strong>, fordi
        jetstrømmen tvinges til å splitte seg og bøye seg rundt høytrykket i en bue som ligner på den
        greske bokstaven Omega (<strong>Ω</strong>):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Sentralt høytrykk:</strong> En mektig, varm antisyklon etablerer seg over
          Skandinavia og Nordsjøen. Luften synker uavbrutt (subsidens), og skyene holdes unna.
        </li>
        <li>
          <strong>Splittet jetstrøm:</strong> Jetstrømmen deles i to adskilte grener: Én gren
          ledes langt nord over Svalbard og Barentshavet, mens den andre presses langt sør inn over
          Middelhavet.
        </li>
        <li>
          <strong>Avsnørte lavtrykk (Cut-off lows):</strong> På begge flanker av høytrykket blir
          lavtrykk avskåret fra hovedstrømmen. De blir liggende og spinne på samme sted i dagevis
          eller uker.
        </li>
      </ul>

      <p>
        Konsekvensene for norsk vær er enorme:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Sommerblokkering (Hetebølger og tørke):</strong> Den skyfrie himmelen slipper
          solstrålene uhindret ned i 18–24 timer i døgnet. Sammen med subsidensvarmen gir dette
          ekstreme hetebølger, tørke og skogbrannfare. Rekordsomrene i Sør-Norge i 2018 og 2021 var
          klassiske eksempler på en ukelang Omega-blokk!
        </li>
        <li>
          <strong>Vinterblokkering (Sprengkulde og inversjon):</strong> Om vinteren er nettene lange.
          Den skyfrie himmelen gir katastrofalt stort varmetap ved langbølget stråling. Iskald luft
          fra Sibir og Arktis samler seg i dalbunnene som dype <strong>temperaturinversjoner</strong>{" "}
          (-25 °C til -40 °C på Røros, Tynset og Finnmarksvidda), mens vedrøyk og svevestøv stenges inne.
        </li>
        <li>
          <strong>Flomkatastrofer i Sør-Europa:</strong> Mens Norge bader i sol under blokka,
          fanges de avsnørte lavtrykkene over Middelhavet eller Sentral-Europa og dumper hundrevis av
          millimeter regn med katastrofale flommer som følge (som flomkatastrofene i Tyskland og Spania).
        </li>
      </ul>

      <OrdBoks
        ord="Omega-blokk (Ω)"
        barn="En kvasistasjonær blokkeringssituasjon der en høytrykksrygg deler jetstrømmen i to som bokstaven Ω. Låser været i ukesvis og gir tørke/hete om sommeren eller sprengkulde om vinteren."
      />

      <JetBlockingDiagram />

      {/* 7. ÅRSTIDER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Årstidsvariasjon: Vinterjet vs. Sommerjet
      </h2>
      <p>
        Bruk regelen om termisk vind: Jetstrømmens styrke er direkte proporsjonal med
        temperaturkontrasten mellom ekvator og pol. Fordi solinnstrålingen forskyver seg med
        årstidene, gjennomgår jetstrømmen en dramatisk årlig syklus:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-300">
            ❄️ Vinter: Maksimal temperaturkontrast
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I vinterhalvåret er Arktis svøpt i mørke under polarnatten, og isen stråler ut varme til
            temperaturen faller under -40 °C. Samtidig mottar tropene rikelig med solvarme (+30 °C).
            Temperaturforskjellen er kolossal: <strong>ΔT ≈ 70 °C!</strong>
            <br />
            Polarfrontjeten blir sylskarp, akselererer til over <strong>350–400 km/t</strong>, og
            trekker sørover til ca. <strong>45°–55°N</strong>. Stormbanen peker rett mot Norskehavet,
            og Norge bombarderes av voldsomme vinterorkaner.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-300">
            ☀️ Sommer: Minimal temperaturkontrast
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om sommeren skinner midnattssolen døgnet rundt i Arktis. Snø og sjøis smelter, og
            landmassene varmes opp til plussgrader (+5 til +15 °C). Temperaturforskjellen mot
            tropene krymper til under <strong>ΔT ≈ 30 °C</strong>.
            <br />
            Jetstrømmen svekkes drastisk til <strong>100–160 km/t</strong> og forskyver seg nordover
            til <strong>65°–70°N</strong>. Lavtrykkene blir vesentlig svakere, stormbanene passerer
            nord for fastlandet mot Barentshavet, og Norge opplever roligere sommervær.
          </p>
        </div>
      </div>

      <JetSeasonDiagram />

      {/* 8. KLIMASVINGNINGER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Klimasvingninger og stormbaner: NAO og arktisk forsterkning
      </h2>
      <p>
        Hvorfor er noen norske vintre milde, stormfulle og klissvåte, mens andre er knusktørre og
        iskalde fra desember til mars? Svaret ligger i hvordan storskala klimasvingninger flytter
        jetstrømmen over Nord-Atlanteren.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        NAO: Sjefen for det norske vinterværet
      </h3>
      <p>
        Den viktigste klimaindeksen for Norge er <strong>Den nordatlantiske oscillasjon (NAO)</strong>{" "}
        (NOAA, u.å.-b). NAO måler trykkforskjellen mellom det subtropiske <strong>Azorhøytrykket</strong>{" "}
        og det subpolare <strong>Islandslavtrykket</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Positiv NAO-fase (+NAO):</strong> Både Azorhøytrykket og Islandslavtrykket er
          uvanlig kraftige. Trykkgradienten over Nord-Atlanteren er bratt, og polarfrontjeten blir
          ekstremt sterk og rettlinjet (zonal). Stormbanen legges i en rett motorvei rett inn mot
          Vestlandet og Midt-Norge. Resultatet er en klassisk <strong>mild, våt og stormfull norsk vinter</strong>,
          mens Middelhavet opplever tørke.
        </li>
        <li>
          <strong>Negativ NAO-fase (-NAO):</strong> Både Azorhøytrykket og Islandslavtrykket er
          svake. Trykkgradienten flater ut, og polarfrontjeten svekkes og begynner å meandrere i store
          Rossby-bølger eller blokkeres fullstendig. Stormbanen forskyves sørover mot Storbritannia og
          Middelhavet. Norge og Skandinavia havner i le eller under et polart tråg, noe som gir en{" "}
          <strong>bitende kald, tørr og stabil vinter</strong> med lite snø i lavlandet.
        </li>
      </ul>

      <NaoDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Endrer jetstrømmen seg med global oppvarming?
      </h3>
      <p>
        Et av de heteste forskningstemaene i moderne meteorologi er koblingen mellom global
        oppvarming og jetstrømmens oppførsel. Her må du som geofagelev være faglig nyansert og
        skille mellom hypoteser og etablert vitenskap:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Hypotesen om arktisk forsterkning (Francis &amp; Vavrus):</strong> Arktis varmes opp
          tre til fire ganger raskere enn det globale gjennomsnittet (blant annet fordi hvit sjøis
          smelter og erstattes av mørkt hav med lavere albedo). Hypotesen sier at når Arktis varmes mest,
          krymper temperaturgradienten mot tropene nær bakken. Ifølge loven om termisk vind skal da
          polarfrontjeten svekkes. En slappere jetstrøm meandrerer lettere i dype Rossby-bølger, noe
          som skulle gi flere fastlåste blokkeringer, lengre tørkeperioder og flere arktiske kuldeutbrudd.
        </li>
        <li>
          <strong>Hva sier FNs klimapanel (IPCC AR6)?</strong> IPCCs sjette hovedrapport vurderer
          denne hypotesen med <strong>lav konfidens</strong> for Nord-Atlanteren om vinteren (IPCC, 2021).
          Hvorfor? Fordi atmosfæren har to motstridende krefter: Samtidig som Arktis varmes ved bakken,
          varmes den tropiske <em>øvre troposfæren</em> opp kraftig som følge av økt fuktkonveksjon.
          Dermed <em>øker</em> temperaturgradienten i høyden! Disse to effektene drar jetstrømmen hver
          sin vei.
        </li>
        <li>
          <strong>Mindre blocking over Grønland i modellene:</strong> Klimamodellene viser faktisk at
          atmosfærisk blokkering over Grønland og Nord-Stillehavet forventes å <em>avta</em> i frekvens
          i scenarier med høye utslipp (middels konfidens). Det er derfor faglig feilaktig å påstå
          skråsikkert at «klimaendringene gir mer blokkering overalt».
        </li>
      </ul>

      {/* 9. EKSAMENSFELLER */}
      <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>
            <strong>1. Jetstrømmen regner ikke:</strong> En av de vanligste feilene er å tro at
            jetstrømmen selv er en regnsky fordi det «regner under den». Jetstrømmen befinner seg 9–11
            km oppe i iskald, knusktørr luft. Nedbøren produseres ved bakken, i de dynamiske lavtrykkene
            som suges i gang av jetens øvre divergenssone (venstre utløp).
          </li>
          <li>
            <strong>2. To jetbelter, ikke ett:</strong> Husk at det er to permanente jetbelter på hver
            halvkule. Polarfrontjeten (55°–65°N, 9–11 km) drives av temperaturgradienten over
            polarfronten. Den subtropiske jeten (30°N, 13–16 km) drives av bevaring av vinkelmoment i
            Hadleycellen. Polar natt-jeten er noe helt annet – den ligger i stratosfæren.
          </li>
          <li>
            <strong>3. Termisk vind er ikke vind fra varm bakke:</strong> Ordet «termisk vind» betyr
            ikke at varm luft blåser bortover bakken. Det er et matematisk/fysisk begrep for den{" "}
            <em>vertikale vindskjæringen</em> (vindøkningen med høyden) som tvinges frem fordi en varm
            luftsøyle er tykkere enn en kald luftsøyle.
          </li>
          <li>
            <strong>4. Venstre utløp dypner lavtrykk – ikke innløpet:</strong> Til eksamen må du
            presisere hvilken del av jetkjernen som skaper storm: Det er <strong>venstre utløp (left exit)</strong>{" "}
            og høyre innløp som har divergens i høyden og suger opp luft fra bakken. Høyre utløp gir
            konvergens, nedsynking og høytrykk.
          </li>
        </ul>
      </Callout>

      {/* 10. VIKTIGE BEGREPER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Jetstrøm"
          def="Smalt, rørformet belte med ekstrem vestavind i øvre troposfære (150–400 km/t), dannet over store temperaturkontraster."
        />
        <Term
          name="Polarfrontjeten (PFJ)"
          def="Meandrerende jetstrøm over polarfronten (9–11 km høyde, 50°–65°N) som styrer lavtrykkene og stormbanene mot Norge."
        />
        <Term
          name="Subtropisk jet (STJ)"
          def="Stabil jetstrøm nær 30° bredde ved Hadleycellens polgrense (13–16 km høyde), drevet av vinkelmoment fra ekvator."
        />
        <Term
          name="Termisk vind"
          def="Loven om at geostrofisk vind øker oppover så lenge det er en horisontal temperaturkontrast. Brattere trykkflater gir sterkere vind."
        />
        <Term
          name="Rossby-bølger"
          def="Planetære bølger på jetstrømmen skapt av variasjon i Corioliskraft med breddegrad og topografiske barrierer."
        />
        <Term
          name="Zonal strøm"
          def="Rettlinjet vest-øst-strøm langs breddegradene som gir raske lavtrykkspassasjer og mildt, skiftende atlantisk vestavær."
        />
        <Term
          name="Meridional strøm"
          def="Kraftig bølgende jetstrøm nord-sør med dype tråg (polare kuldeutbrudd) og rygger (subtropiske hetebølger)."
        />
        <Term
          name="Jetkjerne (Jet streak)"
          def="Lokalt segment inne i jetstrømmen med maksimal vindhastighet, der aldersofisk vind skaper divergens og konvergens."
        />
        <Term
          name="Venstre utløp (Left exit)"
          def="Kvadranten foran jetkjernen på nordsiden der divergens i høyden suger opp luft og dypner eksplosive lavtrykk ved bakken."
        />
        <Term
          name="Omega-blokk (Ω)"
          def="Atmosfærisk blokkering der et mektig høytrykk deler jetstrømmen i to som en Ω, og låser været i ukevis (tørke eller kulde)."
        />
        <Term
          name="Stormbane"
          def="Hovedsporet som vandrende lavtrykk følger over Nord-Atlanteren, styrt av polarfrontjetens posisjon."
        />
        <Term
          name="NAO (Nordatlantisk oscillasjon)"
          def="Trykksvingning mellom Azorene og Island som bestemmer jetstrømmens styrke og bane over Norge."
        />
      </TermGrid>

      {/* 11. QUIZ */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Jetstrømmer og stormbaner
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor blåser jetstrømmene nesten utelukkende fra vest mot øst på begge halvkuler?",
            options: [
              "Fordi solen står opp i øst og trekker luften med seg.",
              "Fordi varm luft over tropene utvider seg og skaper en trykkgradient i høyden mot polene, som Corioliskraften avbøyer 90° mot øst.",
              "Fordi friksjonen mot jordoverflaten dytter luften østover i stratosfæren.",
              "Fordi passatvindene ved bakken snur brått retning ved 1000 meters høyde.",
            ],
            answer: 1,
            explain:
              "Tropene er varme, så luftsøylen er tykk. Det skaper et overtrykk i høyden over tropene, og trykkgradientkraften peker mot polen på begge halvkuler. I fri atmosfære avbøyer Corioliskraften luften til høyre på nordlig halvkule og til venstre på sørlig halvkule – i begge tilfeller blir resultatet en ren vestavind!",
          },
          {
            prompt:
              "Hva er den fysiske forklaringen på begrepet «termisk vind» i Geofag 2?",
            options: [
              "At varm luft stiger opp fra asfalten i byene om sommeren.",
              "At vindhastigheten i fri atmosfære øker med høyden fordi isobarflatene heller brattere og brattere over en horisontal temperaturkontrast.",
              "At solgangsbrisen snur med solens gang på himmelen.",
              "At friksjonen mot bakken forsvinner når luften varmes opp over 20 °C.",
            ],
            answer: 1,
            explain:
              "Termisk vind er den teoretiske vinddifferansen mellom to høydenivåer. Fordi en varm luftsøyle er tykkere enn en kald, ligger trykkflatene høyere i sør enn i nord. Høydeforskjellen øker med høyden, trykkflatene blir brattere, gradienten øker, og den geostrofiske vinden akselererer oppover.",
          },
          {
            prompt:
              "I hvilken del av en jetkjerne (jet streak) er sjansen aller størst for at et nytt lavtrykk dannes og dypner eksplosivt?",
            options: [
              "I høyre utløp, der luften synker ned mot bakken.",
              "I venstre innløp, der vinden bremser opp.",
              "I venstre utløp (left exit), der divergens i høyden suger opp luftmasse fra bakkenivå.",
              "Nøyaktig i midten av kjernen, der trykket er høyest.",
            ],
            answer: 2,
            explain:
              "I venstre utløp bremser luften opp, og Corioliskraften kaster luften mot høyre. Dette skaper kraftig divergens i høyden på nordsiden (venstre side). Luft fjernes fra toppen av søylen, trykket ved bakken faller, og luft tvinges oppover i en kraftig syklon.",
          },
          {
            prompt:
              "Hvorfor er polarfrontjeten vesentlig sterkere om vinteren enn om sommeren?",
            options: [
              "Fordi jorden roterer med høyere hastighet i januar.",
              "Fordi polarnatten gjør Arktis iskald (-40 °C) mens tropene forblir varme, slik at temperaturkontrasten (ΔT) er på sitt maksimale.",
              "Fordi ozonlaget forsvinner helt over Norge hver vinter.",
              "Fordi snødekket på bakken fjerner all friksjon mot luften i 10 km høyde.",
            ],
            answer: 1,
            explain:
              "Ifølge termisk vind-ligningen styres jetens styrke av temperaturgradienten under den. Om vinteren er polen bekmørk og iskald mens tropene bader i sol (ΔT ≈ 70 °C). Om sommeren varmer midnattssolen Arktis, og kontrasten krymper til under 30 °C.",
          },
          {
            prompt:
              "Hva kjennetegner en situasjon med atmosfærisk «Omega-blokkering» over Skandinavia om sommeren?",
            options: [
              "Ekstremt mange lavtrykk som passerer over Østlandet hver eneste dag.",
              "Et stabilt høytrykk som deler jetstrømmen i to, gir uker med subsidens, sol og hetebølge i Norge, mens lavtrykk tvinges utenom.",
              "At jetstrømmen forsvinner fullstendig fra den nordlige halvkule.",
              "At havstrømmene snur og renner sørover langs kysten.",
            ],
            answer: 1,
            explain:
              "En Omega-blokk er en kvasistasjonær høytrykksrygg formet som den greske bokstaven Ω. Den tvinger jetstrømmen i to grener rundt Skandinavia. Under høytrykket synker luften (subsidens), skyer oppløses, og sommerværet låser seg i ukesvis med tørke, hete og skogbrannfare (som i 2018).",
          },
          {
            prompt:
              "Hva er den vitenskapelig korrekte vurderingen av hypotesen om at arktisk forsterkning gir mer meandrerende jetstrøm og flere blokkeringer?",
            options: [
              "Det er et uomtvistelig faktum som alle klimaforskere og IPCC er 100 % enige om.",
              "Det er en hypotese med lav konfidens i IPCC AR6, fordi oppvarming i den tropiske øvre troposfæren motvirker effekten av arktisk bakkeoppvarming.",
              "Hypotesen gjelder bare for den sørlige halvkule over Antarktis.",
              "Hypotesen er motbevist fordi jetstrømmen har sluttet å eksistere.",
            ],
            answer: 1,
            explain:
              "Selv om hypotesen til Francis & Vavrus er intuitiv (redusert bakkekontrast svekker jeten), viser klimamodeller og observasjoner at tropisk øvre troposfære også varmes kraftig, noe som styrker gradienten i høyden. IPCC AR6 konkluderer derfor med lav konfidens for robuste endringer i meandring over Nord-Atlanteren.",
          },
        ]}
      />
    </TopicLayout>
  );
}
