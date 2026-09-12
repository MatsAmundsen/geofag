import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  DataAssimilationCycleDiagram,
  LorenzChaosEnsembleDiagram,
  ModelGrid3DDiagram,
  ModelHierarchyNorwayDiagram,
  PrimitiveEquationsDiagram,
  SubgridParametrizationDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/numeriske-modeller")!;

export const Route = createFileRoute("/tema/numeriske-modeller")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/numeriske-modeller",
    }),
  component: NumeriskeModellerPage,
});

function NumeriskeModellerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Numeriske beregninger"
      title="Numeriske modeller: Fra fysiske lover til superdatamaskiner"
      lead="Hvordan kan en datamaskin forutse morgendagens regnvær på Vestlandet, eller beregne klodens klima mot år 2100? Svaret er verken gjetting eller enkel statistikk. En numerisk modell er naturens egne bevaringslover – Newtons bevegelsesligninger, termodynamikk og massebevaring – skrevet om til differensialligninger og løst på et tredimensjonalt rutenett av milliarder av tallpunkter. Fra Vilhelm Bjerknes' banebrytende visjon i 1904 til dagens petaflops-superdatamaskiner og nevrale AI-nettverk, utgjør numeriske modeller fundamentet for moderne værvarsling, havstrømssimulering og klimaforskning."
      banner="/images/fig-klimasystem.jpg"
      bannerAlt="Jorda fra verdensrommet med tynn atmosfære, hav og is — det modellene beskriver"
      prev={{ to: "/tema/kryosfare", label: "Forrige: Kryosfæren" }}
      next={{ to: "/tema/paleoklima", label: "Neste: Paleoklima" }}
      kilder={KILDER.modeller}
    >
      {/* 1. HVA ER EN NUMERISK MODELL? */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er en numerisk modell? Fra visjon til superdatamaskiner
      </h2>
      <p>
        I naturvitenskapen skiller vi fundamentalt mellom to ulike modellbegreper. En{" "}
        <strong>konseptuell modell</strong> er en forenklet mental skisse eller figur som forklarer
        sammenhenger i ord og piler – slik som Hadleycellen eller vannets kretsløp. En{" "}
        <strong>numerisk modell</strong> er derimot en ren matematisk-fysisk simulering utført på en
        datamaskin. Atmosfæren, verdenshavene og biosfæren deles inn i milliarder av små
        beregningsvolumer, og superdatamaskinen regner ut hvordan luft- og vannmassene beveger seg,
        sekund for sekund, basert på klassisk mekanikk og termodynamikk (ECMWF, u.å.).
      </p>
      <p>
        Idéen om å beregne været ved hjelp av matematikk ble unnfanget av den norske fysikeren og
        meteorologen <strong>Vilhelm Bjerknes i 1904</strong> (Bjerknes, 1904). Bjerknes formulerte
        det som senere er blitt stående som meteorologiens hellige gral:
      </p>
      <blockquote className="my-3 rounded-lg border-l-4 border-sky-500 bg-sky-950/30 p-4 italic text-foreground/90">
        «Hvis vi kjenner atmosfærens nøyaktige starttilstand på et gitt tidspunkt, og vi kjenner de
        fysiske lovene som styrer luftmassene, er fremtidig vær et deterministisk matematisk problem
        som kan løses entydig.»
      </blockquote>
      <p>
        Bjerknes innså imidlertid at ligningene var altfor kompliserte til å kunne løses med penn og
        papir i sanntid. Under første verdenskrig tok den britiske matematikeren{" "}
        <strong>Lewis Fry Richardson (1922)</strong> utfordringen videre mens han kjørte ambulanse
        ved vestfronten. Richardson delte Sentral-Europa inn i et rutenett og regnet for hånd ut et
        sekstimers værvarsel. Beregningen tok ham hele to år å gjennomføre, og varselet spådde et
        katastrofalt feilaktig trykkfall på 145 hPa – et trykkfall som aldri fant sted! Feilen
        skyldtes manglende filtrering av støy i startobservasjonene (Richardson, 1922).
      </p>
      <p>
        Richardson drømte om en «værfabrikk»: et gigantisk sirkelrundt teater fylt med{" "}
        <strong>64 000 menneskelige regnere</strong>, dirigert av en leder i midten med fargede
        lyssignaler for å holde tritt med det faktiske været. Først med oppfinnelsen av den
        elektroniske datamaskinen <em>ENIAC</em> i 1950, ledet av Jule Charney, Ragnar Fjørtoft og John
        von Neumann, ble Richardsons visjon realisert. I dag kjører Meteorologisk institutt og det
        europeiske værsenteret ECMWF enorme superdatamaskiner med hundretusenvis av prosessorkjerner
        som utfører titalls billiarder regneoperasjoner per sekund (petaflops).
      </p>

      <OrdBoks
        ord="Numerisk modell"
        barn="En datamodell som simulerer atmosfæren, havet eller klimasystemet ved å løse de fysiske bevaringsligningene trinnvis i tid over et tredimensjonalt rutenett."
      />

      {/* 2. PRIMITIVLIGNINGENE OG TIDSINTEGRASJON */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Byggeklossene: De fysiske primitivligningene og tidssteg
      </h2>
      <p>
        En utbredt misforståelse blant elever er troen på at værvarsler lages ved at en datamaskin
        leter etter «lignende historiske værkart» i et arkiv. Slik fungerer ikke fysikkbaserte
        modeller. En numerisk modell løser et sett med eksakte, universelle fysiske bevaringslover,
        kjent som <strong>primitivligningene</strong> (ECMWF, u.å.; MET, u.å.-a):
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Bevegelsesligningen (Navier-Stokes / Newtons 2. lov):</strong> Beskriver
          akselerasjonen til luft- og vannpakker ($F = m \cdot a$). Summen av kreftene per
          masseenhet – trykkgradientkraften, Corioliskraften, gravitasjonen og molekylær/turbulent
          bakkefriksjon – bestemmer hvordan vindens fart og retning ($u, v, w$) endrer seg.
        </li>
        <li>
          <strong>Kontinuitetsligningen (Massebevaring):</strong> Masse kan verken oppstå fra
          ingenting eller forsvinne i luften. Hvis luft strømmer sammen horisontalt i et lavtrykk
          (konvergens), <em>må</em> luften presses vertikalt oppover for at den totale massen skal
          bevares.
        </li>
        <li>
          <strong>Termodynamikkens 1. lov (Energibevaring):</strong> Endring i en luftpakkes
          temperatur styres av to prosesser: <em>adiabatiske prosesser</em> (oppvarming ved
          nedsynking og kompresjon, avkjøling ved heving og ekspansjon) og <em>diabatiske prosesser</em>{" "}
          (opptak eller tap av varmeenergi fra solstråling, langbølget stråling eller latent varme
          frigjort når vanndamp kondenserer til skydråper).
        </li>
        <li>
          <strong>Tilstandsligningen (Ideell gasslov):</strong> Knytter lufttrykk ($p$), tetthet
          ($\rho$) og absolutt temperatur ($T$) sammen gjennom formelen $p = \rho R T$, der $R$ er den
          spesifikke gasskonstanten for luft.
        </li>
        <li>
          <strong>Den hydrostatiske ligningen:</strong> I storskala vær er det tilnærmet balanse
          mellom den oppoverrettede vertikale trykkgradientkraften og den nedoverrettede
          tyngdekraften ($\partial p / \partial z = -\rho g$). Dette betyr at lufttrykket i enhver
          høyde nøyaktig tilsvarer vekten av den overliggende luftsøylen.
        </li>
        <li>
          <strong>Fuktighetsligningen (Massebevaring for vann):</strong> Sporer mengden vanndamp ($q$),
          flytende skydråper ($q_c$), iskrystaller ($q_i$) og nedbørspartikler (regn, snø, hagl), samt
          faseskiftene mellom dem.
        </li>
      </ol>

      <PrimitiveEquationsDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Tidsstegintegrasjon og CFL-stabilitetskriteriet
      </h3>
      <p>
        Fordi disse ligningene er <em>ikke-lineære</em> (vinden frakter luftmasser som selv har en
        hastighet som påvirker vinden videre), finnes det ingen matematisk formel som gir en eksakt,
        analytisk løsning for fremtiden. Løsningen må <strong>integreres numerisk fremover i tid</strong>{" "}
        ved hjelp av små tidssteg ($\Delta t$):
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Ved starttidspunktet $t_0$ kjenner modellen tilstanden i alle rutenettpunkter ($u, v, w, T,
          p, q$).
        </li>
        <li>
          Superdatamaskinen setter disse verdiene inn i primitivligningene og regner ut den momentane
          endringsraten – tendensen – for hver variabel ($\partial u / \partial t$, $\partial T /
          \partial t$, osv.).
        </li>
        <li>
          Ny tilstand etter ett tidssteg regnes ut ved enkel fremskrivning:{" "}
          <em>ny tilstand = gammel tilstand + (tendens · $\Delta t$)</em>.
        </li>
        <li>
          Prosessen gjentas hundretusenvis av ganger: fra 1 minutt til 2 minutter, videre til 3
          minutter, helt til et fullt 10-dagers varsel er fullført.
        </li>
      </ul>
      <p>
        Hvorfor kan vi ikke bare ta kjempeskritt i tid, for eksempel 12 timer per tidssteg, for å spare
        regnekraft? Svaret ligger i <strong>Courant-Friedrichs-Lewy (CFL)-kriteriet</strong>: For at
        beregningene skal være numerisk stabile, kan ikke informasjonen (vindhastigheten $u$ eller
        akustiske/gravitasjonsbølger) forflytte seg lenger enn én enkelt rutenettcelle ($\Delta x$) i
        løpet av ett tidssteg ($C = u \cdot \Delta t / \Delta x \le 1$). Hvis tidssteget er for langt,
        rekker informasjonen å «hoppe over» en hel celle uten å bli beregnet. Da oppstår vill numerisk
        resonans, feilene eksploderer mot uendelig på sekunder, og superdatamaskinens modell krasjer!
      </p>

      <OrdBoks
        ord="CFL-kriteriet (Courant-Friedrichs-Lewy)"
        barn="Et matematisk krav til numerisk stabilitet: Tidssteget Δt må være kortere enn tiden det tar for en luftpakke eller bølge å krysse én rutenettcelle Δx (u·Δt/Δx ≤ 1)."
      />

      {/* 3. RUTENETT OG OPPLØSNING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Rutenett (Grid) og oppløsning i 3D
      </h2>
      <p>
        For å regne på en kontinuerlig atmosfære, må rommet diskretiseres. Superdatamaskinen spenner et
        tredimensjonalt rutenett over jorden. <strong>Oppløsningen</strong> er definert som den
        horisontale avstanden mellom to beregningspunkter ($\Delta x$ og $\Delta y$):
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-sky-300">Global modell (ECMWF)</h3>
          <p className="mt-1 text-xs text-muted-foreground">Oppløsning: ~9 km grid</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Dekker hele kloden fra ekvator til polene. Fanger opp de store stormbanene, jetstrømmene og
            Rossby-bølgene, men er for grov til å skille norske fjorder og individuelle bygeskyer.
          </p>
        </div>
        <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-teal-300">Regional modell (MEPS)</h3>
          <p className="mt-1 text-xs text-muted-foreground">Oppløsning: 2,5 km grid</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Dekker Norden og Østersjøen. Kalles <em>konveksjonsløsende</em>: 2,5 km er fint nok til at
            modellen løser store tordenskyer og dalvinder direkte via bevegelsesligningene.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-amber-300">Kysthavmodell (Norkyst)</h3>
          <p className="mt-1 text-xs text-muted-foreground">Oppløsning: 800 m grid</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Fokusert langs norskekysten. Løser havstrømmer, tidevann og stormflo i trange sund og
            fjorder, drevet av vindstress fra MEPS-atmosfæren.
          </p>
        </div>
      </div>

      <p>
        Vertikalt kan ikke modellen bare bruke faste geometriske høyder ($z$), for da ville de
        nederste lagene kollidere rett inn i fjellveggene i Jotunheimen! I stedet bruker moderne
        modeller <strong>terrengfølgende hybridkoordinater ($\sigma$-flater)</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Nær bakken:</strong> De vertikale flatene tilpasser seg terrenget fullstendig og buer
          seg smidig over fjellrygger og ned i dype fjorder. Dette gjør det mulig å simulere
          orografisk heving, katabatiske fallvinder og lokale dalinversjoner med stor nøyaktighet.
        </li>
        <li>
          <strong>Høyt i troposfæren og stratosfæren:</strong> Terrengbøyningen flates gradvis ut, og
          koordinatene går over til å bli rene, glatte isobarflater (konstant trykk) helt opp til
          modellranden (typisk 0,01 hPa / ca. 65 km høyde).
        </li>
      </ul>

      <ModelGrid3DDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hvorfor er en dobling av oppløsningen 16 ganger så dyr?
      </h3>
      <p>
        Mange spør hvorfor meteorologene ikke bare kjører 100 meters oppløsning over hele kloden med én
        gang. Årsaken er den brutale <strong>skaleringsloven for 3D-modeller</strong>. Tenk deg at du
        halverer rutenettavstanden fra 10 km til 5 km:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>Du må ha 2 ganger så mange celler i nord-sør-retning (y).</li>
        <li>Du må ha 2 ganger så mange celler i øst-vest-retning (x).</li>
        <li>Du må ha 2 ganger så mange celler i vertikal retning for å beholde sideforholdet (z).</li>
        <li>Dette gir $2 \times 2 \times 2 = 8$ ganger flere 3D-celler i beregningen.</li>
        <li>
          <strong>I tillegg krever CFL-kriteriet</strong> at tidssteget $\Delta t$ må halveres fordi
          cellene er blitt smalere! Dermed må superdatamaskinen ta dobbelt så mange tidssteg for å
          nå samme prognoselengde.
        </li>
      </ul>
      <p className="font-semibold text-sky-400">
        Resultat: $8 \times 2 = 16$ ganger mer datakraft per døgn! En økning i oppløsning krever
        dermed eksponentielt mer kostbar superdatamaskininfrastruktur.
      </p>

      {/* 4. PARAMETRISERING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Parametrisering: Fysikken som gjemmer seg under rutenettet
      </h2>
      <p>
        Uansett hvor kraftig superdatamaskin vi bygger, vil rutenettet alltid ha en nedre grense.
        Prosesser som foregår på en romlig skala som er mindre enn noen få rutenettceller, kalles{" "}
        <strong>sub-grid prosesser</strong> (inquiry-prosesser). Disse prosessene er fullstendig
        usynlige for de primære bevegelsesligningene.
      </p>
      <p>
        Ta en typisk tordensky (<em>Cumulonimbus</em>). Den kan være bare 2–4 km i tverrsnitt. I en
        global modell med 9 km oppløsning finnes det ikke et eneste punkt som kan «se» skyen. For
        modellen er rutenettcellen bare én enkelt homogen luftkube med ett gjennomsnittlig tall for
        temperatur og trykk. Likevel kan denne lille skyen transportere millioner av tonn med vanndamp
        fra bakken til 11 kilometers høyde, frigjøre gigantiske mengder latent varme og utløse lokalt
        styrtregn og lynnedslag!
      </p>
      <p>
        Løsningen er <strong>parametrisering</strong>: I stedet for å beregne skyen direkte,
        programmeres statistiske og fysiske hjelpeligninger som estimerer skyens samlede nettoeffekt på
        cellens gjennomsnittstilstand basert på storskala fuktighet og stabilitet.
      </p>

      <SubgridParametrizationDiagram />

      <p>I moderne værmodeller finnes det fire sentrale parametriseringsskjemaer:</p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-sky-300">1. Konveksjonsskjema</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Beregner oppdrift i ustabil luft, vertikal omrøring av varme og fuktighet, og frigjøring av
            latent varme (~2,5 MJ per kg kondensert vann). Hindrer at modellen bygger opp kunstig
            ekstrem ustabilitet. I konveksjonsløsende modeller (som MEPS 2,5 km) skrus dyp konveksjon
            av fordi gridet er fint nok til å løse skyene eksplisitt.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-amber-300">2. Strålingsskjema</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Beregner hvordan innkommende kortbølget solstråling reflekteres fra skytopper (albedo) eller
            absorberes i bakken, samt hvordan langbølget infrarød stråling sendes ut og fanges opp av
            drivhusgasser (CO₂, H₂O, metan) og skybunn. Kjøres ofte hvert 15.–60. minutt for å spare
            regnekraft.
          </p>
        </div>
        <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-teal-300">3. Sky-mikrofysikk</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Beskriver de mikroskopiske prosessene inni skyen: hvordan vanndamp fester seg på
            aerosolkjerner (skydråpedannelse), dråpevekst ved koalesens (kollisjon), frysning til
            iskrystaller og vekst via Bergeron-prosessen i underkjølt luft, samt dannelse og smelting
            av snø og hagl på vei ned mot bakken.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-emerald-300">
            4. Grenselag og overflateprosesser
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Det nederste luftlaget (planetært grenselag / PBL, 0–2 km) er fylt med mekanisk og termisk
            turbulens. Her beregnes friksjonen mot ulikt terreng (skog, byer, åker, havbølger),
            fordampning fra vegetasjon og fuktig jord, samt varmeutveksling med snødekke og sjøis.
          </p>
        </div>
      </div>

      <OrdBoks
        ord="Parametrisering"
        barn="Forenklet matematisk representasjon av fysiske prosesser som foregår på en skala som er mindre enn rutenettets oppløsning (sub-grid prosesser)."
      />

      {/* 5. DATAASSIMILERING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Dataassimilering: Å forankre modellen i observasjoner
      </h2>
      <p>
        Selv den mest perfekte superdatamaskin med feilfrie ligninger vil feile dersom starttilstanden
        er gal. Men hvordan skaffer vi starttilstanden?
      </p>
      <p>
        Virkeligheten er kaotisk: Værobservasjoner er ujevnt fordelt over kloden. Vi har titusenvis av
        målinger fra tett befolkede områder i Europa og USA, men nesten ingen målinger i det sørlige
        Stillehavet, over Arktis eller i Sahara. Dessuten har alle måleinstrumenter unøyaktigheter og
        støy.
      </p>
      <p>
        Hvorfor kan vi ikke bare overskrive rutenettpunktene direkte med de ferske målingene der vi har
        dem? Fordi atmosfæren er i en finstemt hydrostatisk og geostrofisk balanse. Hvis du brått dytter
        inn en måling på 1008 hPa i et punkt omgitt av modellpunkter på 1015 hPa, skaper du en enorm,
        kunstig trykkgradient over null avstand. Modellen reagerer med å sende ut voldsomme, kunstige
        sjokkbølger (akustiske gravitasjonsbølger) som «blåser opp» hele prognosen.
      </p>
      <p>
        Løsningen kalles <strong>dataassimilering</strong> (spesifikt <em>4D-Var</em> –
        firedimensjonal variasjonell assimilering):
      </p>

      <DataAssimilationCycleDiagram />

      <p>Analysesyklusen foregår i en kontinuerlig seks-timers sløyfe døgnet rundt:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Bakgrunnstilstanden («First Guess»):</strong> Modellen har en forrige sekstimers
          prognose ($x_b$) som allerede er i fullstendig fysisk balanse i alle celler.
        </li>
        <li>
          <strong>Observasjonsflommen:</strong> Hvert sjette time strømmer millioner av ferske målinger
          inn til superdatamaskinen: Over 90 % kommer fra værsatellitter (infrarød og
          mikrobølgeradianse), supplert av radiosonder (værballonger), automatiske vindmålinger fra
          sivile rutefly (AMDAR), bakkestasjoner, havbøyer og værradarer.
        </li>
        <li>
          <strong>Optimal vekting (Kostnadsfunksjon):</strong> Datamaskinen veier modellens bakgrunnsgjetning
          opp mot observasjonene ved hjelp av avansert feilkovarians-matriseregning ($B$- og
          $R$-matriser). Målinger med lav usikkerhet gis stor vekt; støy filtreres bort.
        </li>
        <li>
          <strong>Analysen (Starttilstanden):</strong> Resultatet er en ny, fullstendig og fysisk
          konsistent starttilstand ($x_a$). Fra denne analysen starter et nytt 66-timers MEPS-varsel og
          et 15-dagers globalt ECMWF-ensemble. Uten denne kontinuerlige justeringen ville modellen
          drevet ut i sin egen fantasiverden på bare 3–4 døgn.
        </li>
      </ol>

      <OrdBoks
        ord="Dataassimilering (4D-Var)"
        barn="En avansert statistisk-matematisk metode som kombinerer nye observasjoner fra satellitter og bakkestasjoner med modellens forrige prognose for å skape en optimal, fysisk balansert starttilstand."
      />

      {/* 6. KAOS OG LORENZ-TEORI */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Kaos, Lorenz-teori og atmosfærens prediksjonsgrense
      </h2>
      <p>
        I 1961 gjorde den amerikanske meteorologen og matematikeren <strong>Edward Lorenz</strong> en
        oppdagelse som snudde opp ned på hele naturvitenskapens syn på forutsigbarhet (Lorenz, 1963).
      </p>
      <p>
        Lorenz kjørte en enkel computermodell av atmosfæren med bare 12 ligninger. En dag ville han
        kjøre en simulering på nytt. For å spare tid tastet han ikke inn tallene med alle seks desimaler
        (f.eks. 0,506127), men rundet av til tre desimaler (0,506). Han antok at et avvik på under én
        tusensteldel ville være fullstendig ubetydelig. Da han kom tilbake etter en kaffepause, viste det
        seg at den nye kurven var blitt fullstendig ulik den første: Den simulerte stormen hadde
        erstattet solskinnet!
      </p>
      <p>
        Dette fenomenet kalles <strong>deterministisk kaos</strong>, populært døpt til{" "}
        <em>«sommerfugleffekten»</em>: Vingeslagene til en sommerfugl i Brasil kan i teorien utløse en
        tornado i Texas uker senere. Årsaken er at atmosfærens dynamikk er <em>ikke-lineær</em>: Små
        feil forblir ikke små; de vokser eksponensielt over tid.
      </p>

      <LorenzChaosEnsembleDiagram />

      <p>
        Siden det er fysisk umulig å måle atmosfæren med uendelig mange desimaler i hvert eneste punkt
        over Atlanterhavet, vil starttilstanden alltid inneholde en ørliten usikkerhet. Dette setter en{" "}
        <strong>absolutt, teoretisk prediksjonsgrense</strong> for atmosfæren:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Døgn 0–3:</strong> Høy forutsigbarhet. Småfeil i starttilstanden er fortsatt små. Store
          lavtrykk, vindfelt og fronter varsles med millimeterpresisjon.
        </li>
        <li>
          <strong>Døgn 4–7:</strong> Moderat forutsigbarhet. Feilene har vokst til regional skala.
          Modellen fanger vanligvis opp at et lavtrykk kommer, men banen eller ankomsttidspunktet kan
          forskyves med flere hundre kilometer eller 12 timer.
        </li>
        <li>
          <strong>Døgn 8–14:</strong> Kaotisk metning. Den opprinnelige informasjonen fra starttilstanden
          er nesten fullstendig visket ut. Modellen kan si om storskalastrømmen er mild vestavind eller
          kald blokkering, men det gir ingen mening å spå været på et bestemt punkt i Bergen eller Oslo.
        </li>
      </ul>
      <p className="font-semibold text-amber-300">
        Uansett hvor store superdatamaskiner vi bygger i fremtiden, vil det aldri være mulig å gi et
        deterministisk, nøyaktig værvarsel for en bestemt dag 30 dager fram i tid. Kaoset setter en
        ugjennomtrengelig grense.
      </p>

      <OrdBoks
        ord="Deterministisk kaos"
        barn="Egenskapen ved ikke-lineære dynamiske systemer der utviklingen er fullstendig styrt av fysiske lover, men hvor ørsmå avvik i starttilstanden vokser eksponensielt og gjør langtidsprediksjon umulig (Lorenz, 1963)."
      />

      {/* 7. ENSEMBLEVARSLING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Fra determinisme til ensemblevarsling (EPS)
      </h2>
      <p>
        Når atmosfæren er kaotisk, kan vi ikke stole på én enkelt modellkjøring. Løsningen på kaoset er{" "}
        <strong>ensemblevarsling (Ensemble Prediction System / EPS)</strong>.
      </p>
      <p>
        I stedet for å kjøre modellen én gang, kjører superdatamaskinen en hel sverm av nesten like
        simuleringer – typisk <strong>30 medlemmer i MEPS</strong> og <strong>51 medlemmer i ECMWF</strong>{" "}
        (MET, u.å.-b):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Én kontrollkjøring:</strong> Kjøres med den antatt beste, uforstyrrede
          starttilstanden fra dataassimileringen.
        </li>
        <li>
          <strong>Mange perturberte medlemmer:</strong> Starttilstanden manipuleres med mikroskopiske,
          fysisk plausible forstyrrelser (perturbasjoner) som gjenspeiler usikkerheten i målingene. I
          tillegg legges det inn små stokastiske variasjoner i parametriseringsskjemaene.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hvordan tolker du et ensemblevarsel på Yr?
      </h3>
      <p>
        Når meteorologene ser på resultatene fra de 51 medlemmene, ser de etter{" "}
        <strong>spredningen (spread)</strong> i ensemblet:
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <h4 className="font-display text-base font-semibold text-emerald-300">
            🟢 Lav spredning = Høy varslingstillit
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Alle de 51 kurvene ligger tett samlet som en stram trådbunt. Uansett hvilke småfeil som
            fantes i starttilstanden, lander alle simuleringene på samme resultat (f.eks. et mektig
            blokkerende høytrykk med tørt klarvær). Varselet har svært høy pålitelighet!
          </p>
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
          <h4 className="font-display text-base font-semibold text-red-300">
            🔴 Stor spredning = Lav varslingstillit
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Kurvene spriker som en åpen vifte («spagettikart»). 20 medlemmer sender lavtrykket inn over
            Trøndelag med storm og regn, mens 30 medlemmer sender det sør for Lindesnes og gir sol i
            Midt-Norge. Atmosfæren er i en ustabil bifurkasjonstilstand, og et enkelt deterministisk
            tall er meningsløst.
          </p>
        </div>
      </div>
      <p>
        Når du på Yr ser teksten <em>«40 % sjanse for mer enn 20 mm regn»</em>, betyr det at nøyaktig
        20 av de 50 ensemblemedlemmene har beregnet at det vil falle mer enn 20 mm i den aktuelle
        gridcellen. Ensemblet erstatter falsk skråsikkerhet med ekte naturvitenskapelig sannsynlighet.
      </p>

      <OrdBoks
        ord="Ensemblevarsling (EPS)"
        barn="En varslingsmetode der en numerisk modell kjøres parallelt mange ganger med mikroskopiske variasjoner i starttilstanden for å tallfeste varslingens usikkerhet og sannsynlighet."
      />

      {/* 8. TRE GEOFAGLIGE ANVENDELSER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Tre bruksområder i geofag: Værvarsling, havmodellering og klimaforskning
      </h2>
      <p>
        I læreplanen for Geofag 2 trekkes det fram tre sentrale anvendelser for numeriske modeller. De
        bygger på de samme grunnleggende bevaringslovene, men har vidt forskjellig tidsskala, oppløsning
        og matematisk karakter:
      </p>

      <div className="my-5 space-y-4">
        {/* Værvarsling */}
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sky-300">
            <span>🌦️</span> 1. Værvarsling: Et startverdiproblem
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Tidsskala:</strong> Fra noen timer (nowcasting) ut til 10–15 døgn.
            </li>
            <li>
              <strong>Fysisk karakter:</strong> <em>Startverdiproblem</em>. Hva som skjer de neste
              dagene er nesten utelukkende bestemt av den nøyaktige starttilstanden i øyeblikket
              varselet skytes ut.
            </li>
            <li>
              <strong>Fokus:</strong> Høyest mulig oppløsning (2,5 km i MEPS) for å løse norske
              fjorder, lokale vindkast og konvektive byger. Kontinuerlig dataassimilering hvert sjette
              time er helt avgjørende.
            </li>
          </ul>
        </div>

        {/* Havmodellering */}
        <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-teal-300">
            <span>🌊</span> 2. Havmodellering: Drevet av atmosfærerand og tetthet
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Tidsskala:</strong> Dager til uker (bølger og stormflo), sesonger og århundrer
              (havstrømmer og varmelagring).
            </li>
            <li>
              <strong>Fysisk karakter:</strong> Havet er om lag 800 ganger tettere enn luft og har en
              enorm varmekapasitet. Vann beveger seg saktere enn luft, og et feilaktig blandelag kan
              vedvare i uker.
            </li>
            <li>
              <strong>Styrende mekanismer:</strong> Havmodellene (som ROMS i Norkyst-800) styres
              sterkt av <em>randbetingelsene fra atmosfæren</em>: mekanisk vindstress som trekker i
              overflaten, varmeveksling (oppvarming/avkjøling) og ferskvannstilførsel (nedbør og
              elveavrenning). Indre strømmer styres av tetthetsforskjeller drevet av temperatur og
              saltholdighet (termohalin sirkulasjon).
            </li>
            <li>
              <strong>Samfunnsnytte:</strong> Varsling av stormflo og ekstremt tidevann for kystvern,
              bølgevarsler for skipstrafikk og oljeplattformer, spredning av oljesøl og lakselus i
              oppdrettsnæringen, samt søk- og redningsaksjoner ved skipbrudd.
            </li>
          </ul>
        </div>

        {/* Klimaforskning */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-amber-300">
            <span>🌍</span> 3. Klimaforskning: Et randverdiproblem
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Tidsskala:</strong> Tiår til århundrer (f.eks. frem mot år 2100 og 2300).
            </li>
            <li>
              <strong>Fysisk karakter:</strong> <em>Randverdiproblem</em>. Klimaforskning forsøker aldri
              å varsle det konkrete været på en bestemt dato, som for eksempel 12. juni 2087. Været på en
              gitt dag om 60 år er teoretisk umulig å spå på grunn av Lorenz' kaosgrense.
            </li>
            <li>
              <strong>Styrende mekanismer:</strong> På tiårsskala er det ikke starttilstanden som
              betyr noe, men <strong>det eksterne pådrivet (forcing)</strong>: konsentrasjonen av
              drivhusgasser (CO₂, metan), utslipp av aerosoler (svovelpartikler), variasjoner i solens
              utstråling, samt vulkanutbrudd.
            </li>
            <li>
              <strong>Målet for prediksjonen:</strong> Klima er definert som <em>værets statistikk</em>{" "}
              over minst 30 år (middeltemperatur, årsnedbør, sannsynlighetsfordeling for ekstremvarme
              eller hundreårsflommer). Klimamodellene beregner hvordan denne statistiske fordelingen
              forskyver seg når klodens energibalanse endres (IPCC, 2021).
            </li>
            <li>
              <strong>Jordsystemmodeller (ESM):</strong> Moderne klimamodeller kobler atmosfære,
              dyphav, havis, innlandsisbreer, vegetasjon og det biogeokjemiske karbonkretsløpet i én
              helhetlig simulering.
            </li>
          </ul>
        </div>
      </div>

      <OrdBoks
        ord="Startverdi- vs. randverdiproblem"
        barn="Værvarsling er et startverdiproblem: Hva som skjer neste uke styres av den nøyaktige starttilstanden nå. Klimaforskning er et randverdiproblem: Statistikken over 100 år styres av ytre pådriv (klimagasser og sol), uavhengig av dagens vær."
      />

      {/* 9. DET NORSKE MODELLHIERARKIET */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Norges operative modellhierarki: Fra global ECMWF til MEPS og Norkyst
      </h2>
      <p>
        I et lite land som Norge, preget av stupbratte vestlandsfjorder, ville fjellplatåer og et
        enormt kystområde mot Norskehavet og Barentshavet, er det umulig å dekke alle behov med én
        enkelt modell. Meteorologisk institutt og Yr benytter derfor en elegant teknikk kalt{" "}
        <strong>nesting</strong> (arving av randbetingelser):
      </p>

      <ModelHierarchyNorwayDiagram />

      <p>Hierarkiet fungerer som en stafett fra global til lokal skala:</p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. ECMWF IFS (Global modell, ~9 km, 51 medlemmer):</strong> Kjøres ved det europeiske
          værsenteret i Bologna. Modellen dekker hele planeten og regner ut stormbaner, jetstrømmer og
          storskala høytrykk ut til 15 dager fram i tid.
        </li>
        <li>
          <strong>2. MEPS (Regional værmodell for Norden, 2,5 km, 30 medlemmer):</strong> Drives i et
          nordisk samarbeid (MetCoOp) mellom Norge, Sverige, Finland og Estland. MEPS kutter ut resten
          av kloden og fokuserer all regnekraft på Norden. Modellen henter storskala værdata langs sine
          yttergrenser (randbetingelser) fra ECMWF, men beregner det lokale været med 2,5 km
          oppløsning ut til 66 timer (Yr time-for-time). Med 2,5 km fanger MEPS opp fjordkanalisering
          av vind og konvektive byger eksplisitt (MET, u.å.-a).
        </li>
        <li>
          <strong>3. AROME-Arctic (Arktisk spesialmodell, 2,5 km):</strong> Dekker Svalbard,
          Barentshavet og havområdene opp mot Nordpolen. Modellen er spesialprogrammert for å håndtere
          grenselag over sjøis, ekstrem kulde og utviklingen av livsfarlige <em>polare lavtrykk</em>.
        </li>
        <li>
          <strong>4. Norkyst-800 (Kyst- og fjordhavmodell, 800 m):</strong> Henter time-for-time vind
          og lufttrykk fra MEPS og elvevannføring fra NVE. Simulerer strøm, overflatetemperatur,
          bølger og tidevann langs hele norskekysten med 800 meters oppløsning.
        </li>
      </ul>

      <OrdBoks
        ord="Nesting"
        barn="En modellteknikk der en finoppløst regional modell legges inni en grovere global modell og kontinuerlig mates med storskala vær langs yttergrensene (randbetingelser)."
      />

      {/* 10. AI OG MASKINLÆRING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Den nye æraen: Kunstig intelligens og nevrale værmodeller
      </h2>
      <p>
        Mellom 2022 og 2026 har meteorologien opplevd sin største revolusjon på et halvt århundre:{" "}
        <strong>datadrevne AI-værmodeller</strong>. Modeller som <em>GraphCast</em> (Google DeepMind),{" "}
        <em>Pangu-Weather</em> (Huawei) og ECMWFs egen <em>AIFS</em> (Artificial Intelligence
        Forecasting System) har vist at dype nevrale nettverk kan forutse det globale været med en
        treffsikkerhet som er fullt på høyde med – og på noen områder overgår – de tradisjonelle
        fysikkbaserte modellene.
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-sky-300">
            Klassisk numerisk modell (IFS / MEPS)
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <li>
              <strong>Metode:</strong> Løser eksakte fysiske differensialligninger (Navier-Stokes) trinn
              for trinn med tidssteg $\Delta t$.
            </li>
            <li>
              <strong>Datakraft:</strong> Krever gigantiske superdatamaskiner med hundretusenvis av
              CPU-er og timer med regnetid per prognose.
            </li>
            <li>
              <strong>Styrke:</strong> Fysisk konsistent, universell og strengt bevarende (masse og
              energi går aldri tapt).
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-purple-300">
            AI-værmodell (ECMWF AIFS / GraphCast)
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <li>
              <strong>Metode:</strong> Løser ingen differensialligninger. Et dypt nevralt nettverk har
              trent på 40 år med historiske reanalysedata (ERA5) og lært mønstrene direkte.
            </li>
            <li>
              <strong>Datakraft:</strong> Ekstremt rask! Kan regne et fullt 10-dagers globalt varsel på
              under ett minutt på én enkelt kommersiell databrikke (GPU/TPU).
            </li>
            <li>
              <strong>Styrke:</strong> Svært nøyaktig sporing av tropiske orkaner og store atlantiske
              lavtrykk med en brøkdel av strømforbruket.
            </li>
          </ul>
        </div>
      </div>
      <p>
        Betyr dette at de klassiske fysiske modellene er blitt overflødige? Absolutt ikke. AI-modellene
        er helt avhengige av fysikkmodellene:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          AI-modellene kan bare trenes fordi vi har 40 år med perfekte <em>reanalyser</em> produsert av
          fysikkmodeller og dataassimilering.
        </li>
        <li>
          Uten fysikkbasert dataassimilering ville ikke AI-modellen hatt noen fersk starttilstand å
          starte fra i dag.
        </li>
        <li>
          AI-modeller kan slite med å forutsi ekstreme værrekorder som aldri før har funnet sted i
          historien (f.eks. som følge av akselererende global oppvarming), fordi mønsteret mangler i
          treningsdataene.
        </li>
      </ul>
      <p className="font-semibold text-teal-400">
        Fremtiden tilhører hybride systemer: Fysikkbaserte modeller sikrer strenge bevaringslover og
        assimilering av nye målinger, mens AI-modeller akselererer ensemblekjøringer og gir raskere
        farevarsler til befolkningen.
      </p>

      {/* 11. EKSAMENSFELLER */}
      <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            <strong>Felle 1: Å tro at klimamodeller skal spå været på en gitt dag i fremtiden.</strong>{" "}
            En klassisk eksamensfeil er å si at «klimamodeller er upålitelige fordi de ikke kan vite om
            det regner 17. mai 2080». Klimamodeller er randverdiproblemer som beregner{" "}
            <em>værets statistikk</em> (gjennomsnitt, varians og ekstremfrekvens) drevet av ytre
            klimagasspådriv, ikke det spesifikke været på en bestemt enkeltdag.
          </li>
          <li>
            <strong>Felle 2: Å tro at et ensemble betyr at superdatamaskinen «gjør feil».</strong> Noen
            elever tror at stor spredning i et ensemble betyr at datamaskinen er ødelagt. Sannheten er
            den motsatte: Spredningen kartlegger atmosfærens reelle fysiske uforutsigbarhet. Når
            ensemblet spriker på dag 8, er det vitenskapelig ærlig å si at været er usikkert, snarere
            enn å gi et villedende, skråsikkert deterministisk tall.
          </li>
          <li>
            <strong>Felle 3: Å forveksle rutenettoppløsning med parametrisering.</strong> En modell
            med 2,5 km oppløsning ser ikke hvert tre, hvert hus eller hver bekk. Prosesser som er mindre
            enn cellestørrelsen må fortsatt parametriseres. Forskjellen er at med 2,5 km grid kan dype
            bygeskyer og store fjelltopper løses direkte, mens sky-mikrofysikk og turbulens fortsatt må
            parametriseres.
          </li>
          <li>
            <strong>Felle 4: Å tro at modeller bare er statistisk kurvetilpasning.</strong> Numeriske
            modeller er ikke statistiske kurver tegnet etter gårsdagens temperatur. De bygger på eksakt,
            deterministisk fysikk (Newtons lover, massebevaring og termodynamikk) som har vært kjent og
            testet i laboratorier i over tre hundre år.
          </li>
        </ul>
      </Callout>

      {/* 12. DEFINISJONER / TERMGRID */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Viktige begreper i numerisk modellering
      </h2>
      <TermGrid>
        <Term
          name="Numerisk modell"
          def="Dataprogram som simulerer naturprosesser ved å løse matematiske bevaringsligninger trinnvis over et 3D-rutenett."
        />
        <Term
          name="Rutenett (Grid)"
          def="Det tredimensjonale nettverket av beregningspunkter som deler inn atmosfæren og havet horisontalt (Δx) og vertikalt (Δz)."
        />
        <Term
          name="Primitivligninger"
          def="Settet av fysiske bevaringslover (Navier-Stokes, kontinuitet, termodynamikk, tilstandsligning og fuktighet) som styrer modellene."
        />
        <Term
          name="Parametrisering"
          def="Forenklet matematisk representasjon av sub-grid prosesser som er for små til å løses direkte (f.eks. skyer og turbulens)."
        />
        <Term
          name="CFL-kriteriet"
          def="Krav til numerisk stabilitet (u·Δt/Δx ≤ 1) som bestemmer hvor kort tidssteget må være i forhold til rutenettets oppløsning."
        />
        <Term
          name="Dataassimilering"
          def="Matematisk metode (f.eks. 4D-Var) som kontinuerlig kombinerer ferske observasjoner med modellens prognose til en optimal starttilstand."
        />
        <Term
          name="Deterministisk kaos"
          def="Egenskap ved ikke-lineære systemer der ørsmå avvik i starttilstanden vokser eksponensielt og setter en grense for langtidsvarsling."
        />
        <Term
          name="Ensemble (EPS)"
          def="Sverm av 30–50 parallelle modellkjøringer med mikroskopisk ulike startbetingelser for å tallfeste usikkerhet og sannsynligheter."
        />
        <Term
          name="Startverdiproblem"
          def="Matematisk formulering der fremtiden primært styres av den nøyaktige starttilstanden, typisk for værvarsling (dager til to uker)."
        />
        <Term
          name="Randverdiproblem"
          def="Matematisk formulering der den langsiktige statistikken styres av ytre pådriv og grensebetingelser, typisk for klimaforskning."
        />
        <Term
          name="Nesting"
          def="Teknikk der en høyoppløst regional modell (som MEPS) legges inni en grovere global modell (som ECMWF) og mates langs grensene."
        />
        <Term
          name="Jordsystemmodell (ESM)"
          def="Avansert klimamodell som kobler sammen atmosfære, verdenshav, kryosfære, biosfære og det globale karbonkretsløpet."
        />
      </TermGrid>

      {/* 13. TEST DEG SELV / QUIZ */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Numeriske modeller
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hva er den fundamentale forskjellen mellom et værvarsel og en klimafremskrivning i Geofag 2?",
            options: [
              "Klimafremskrivninger bruker aldri fysiske bevaringslover, men bare historisk statistikk.",
              "Værvarsling er et startverdiproblem der de neste dagene styres av nøyaktig starttilstand. Klimafremskrivning er et randverdiproblem der statistikken over tiår styres av ytre pådriv (klimagasser og sol).",
              "Værvarsler bruker rutenett, mens klimamodeller regner uten rutenett.",
              "Klimamodeller har som mål å varsle det nøyaktige været på en bestemt dato, som 17. mai 2085.",
            ],
            answer: 1,
            explain:
              "Været neste uke er ekstremt følsomt for dagens starttilstand (startverdiproblem). På tiårsskala har starttilstanden 'glemt seg selv' på grunn av kaos; her er det ytre pådriv som endrer jordens energibalanse (randverdiproblem) som bestemmer den statistiske fordelingen.",
          },
          {
            prompt:
              "Hvorfor må en numerisk modell parametrisere prosesser som skydannelse og turbulens?",
            options: [
              "Fordi skyer og turbulens ikke har noen innvirkning på atmosfærens temperatur eller trykk.",
              "Fordi disse prosessene foregår på en romlig skala som er mindre enn rutenettets cellestørrelse (sub-grid), og derfor ikke kan løses direkte av primærligningene.",
              "Fordi superdatamaskinene ikke har lov til å bruke Newtons lover i troposfæren.",
              "Fordi parametrisering bare gjøres over land, aldri over hav.",
            ],
            answer: 1,
            explain:
              "En modell kan kun beregne ett gjennomsnittlig tall per celle. En cumulus-bygesky kan være 2 km bred. I en modell med 9 km rutenett er hele skyen mindre enn cellen (sub-grid). Dens oppdrift, fukttilførsel og nedbør må derfor representeres gjennom statistisk-fysiske parametriseringer.",
          },
          {
            prompt:
              "Hva krever Courant-Friedrichs-Lewy (CFL)-kriteriet av en modell som halverer rutenettavstanden sin (f.eks. fra 10 km til 5 km)?",
            options: [
              "At modellen må doble vindhastigheten for å holde luften i bevegelse.",
              "At tidssteget Δt også må halveres for at luften eller bølgene ikke skal blåse gjennom mer enn én celle per tidssteg, noe som gjør beregningen 16 ganger mer krevende i 3D.",
              "At Corioliskraften må settes til null i stratosfæren.",
              "At dataassimileringen må avsluttes.",
            ],
            answer: 1,
            explain:
              "CFL-kriteriet krever at u·Δt / Δx ≤ 1. Halveres cellebredden Δx, må tidssteget Δt også halveres for å hindre numerisk instabilitet og modellkrasj. Sammen med dobling i tre romlige dimensjoner (2³ = 8) gir dette 8 × 2 = 16 ganger mer regnekraft.",
          },
          {
            prompt:
              "Hva er hensikten med dataassimilering (f.eks. 4D-Var) i forkant av en ny modellkjøring?",
            options: [
              "Å slette alle observasjoner som ikke stemmer med gårsdagens værmelding.",
              "Å kombinere nye observasjoner fra satellitter, radiosonder og stasjoner med modellens forrige prognose på en fysisk balansert måte, slik at det dannes en optimal starttilstand uten trykksjokk.",
              "Å erstatte superdatamaskinen med et nevralt nettverk.",
              "Å regne ut hvor mye drivhusgasser som slippes ut neste år.",
            ],
            answer: 1,
            explain:
              "Uten dataassimilering ville modellen raskt drive bort fra virkeligheten. 4D-Var veier målingenes usikkerhet mot modellens forrige gjetning (First Guess) og skaper en optimal, balansert analyse som fungerer som starttilstand for neste prognose.",
          },
          {
            prompt:
              "Hva forteller det deg når de 50 medlemmene i et ensemblevarsel (EPS) på Yr spriker voldsomt fra dag 7 og utover?",
            options: [
              "At superdatamaskinen har tekniske problemer og må restartes.",
              "At atmosfæren har lav forutsigbarhet på grunn av kaotisk vekst av småfeil, og at varselet må tolkes som sannsynligheter (f.eks. boksplot eller prosent sjanse) fremfor et bestemt tall.",
              "At det garantert blir sol i hele landet.",
              "At klimaet har endret seg over natten.",
            ],
            answer: 1,
            explain:
              "Ensemblets spredning måler atmosfærens forutsigbarhet. Når banene spriker, betyr det at små forstyrrelser i starttilstanden gir helt ulike utfall (kaos). Da er det vitenskapelig korrekt å bruke sannsynlighetsvarsling, ikke et enkelt tall.",
          },
          {
            prompt:
              "Hva kjennetegner det operative modellhierarkiet og nesting i Norge (MEPS og ECMWF)?",
            options: [
              "Norge bruker kun én global modell som løser alle daler og fjorder med 10 meters oppløsning.",
              "Den regionale modellen MEPS (2,5 km over Norden) henter storskala randbetingelser fra den globale modellen ECMWF (9 km), og kan med sitt fine rutenett løse bygeskyer og fjordtopografi direkte.",
              "Havmodellen Norkyst styrer været i atmosfæren over hele Europa.",
              "AROME-Arctic brukes bare over Sahara.",
            ],
            answer: 1,
            explain:
              "Nesting er stafetten der den globale modellen ECMWF beregner de store stormbanene og leverer randbetingelser til den finoppløste regionale modellen MEPS over Norden. Med 2,5 km oppløsning er MEPS konveksjonsløsende og fanger opp norsk terreng på en overlegen måte.",
          },
        ]}
      />
    </TopicLayout>
  );
}

