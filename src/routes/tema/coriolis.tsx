import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  CarouselFrameDiagram,
  CoriolisLatitudeDiagram,
  EkmanSpiralDiagram,
  GeostrophicAdjustmentDiagram,
  GlobalDeflectionDiagram,
  PressureSpinDiagram,
  RossbyScaleDiagram,
  ZonalCentrifugalDiagram,
} from "@/components/diagrams";
import { CoriolisModel } from "@/components/models/coriolis-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/coriolis")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/tema/coriolis")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/coriolis",
    }),
  component: CoriolisPage,
});

function CoriolisPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren og havets dynamikk"
      title="Corioliseffekten"
      lead="Corioliseffekten er ikke en mystisk kraft som setter luften i gang. Den er et uunngåelig geometrisk resultat av at vi observerer vær, vind og havstrømmer fra en jordklode som snurrer under føttene våre. Uten Corioliseffekten ville vindene blåst i snorrette linjer fra høytrykk til lavtrykk, og tropiske orkaner ville aldri kunnet rotere. Sammen med trykkgradientkraften og friksjon danner den fundamentet for alt storskala vær på jorden."
      banner="/images/banner-coriolis.jpg"
      bannerAlt="Jorda med spiralformede syklonskyer"
      prev={{ to: "/tema/jetstrommer", label: "Forrige: Jetstrømmer" }}
      next={{ to: "/tema/havstrommer", label: "Neste: Havstrømmer" }}
      kilder={KILDER.coriolis}
    >
      {/* 1. HVA ER CORIOLISEFFEKTEN */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er egentlig Corioliseffekten? Fysikken bak jordens avbøyningskraft
      </h2>
      <p>
        Hver eneste dag roterer jorden en hel runde rundt sin egen akse fra vest mot øst. Vi som bor
        på planeten, merker ingenting til denne vanvittige farten; for oss virker bakken bunnsolid og
        urokkelig. Men fysikkens lover bryr seg ikke om våre sanser: Fordi jorden roterer, befinner vi
        oss i et <strong>akselerert, ikke-inertielt referansesystem</strong> (Store norske leksikon,
        u.å.).
      </p>
      <p>
        I klassisk fysikk sier Newtons første lov at et legeme som settes i bevegelse, vil fortsette
        i en <strong>snorrett linje med konstant hastighet</strong> med mindre det påvirkes av en ytre
        kraft. Når en luftpakke eller en havstrøm settes i bevegelse, fortsetter den derfor rett fram
        i forhold til stjernene og verdensrommet. Men mens luftpakken svever over overflaten,{" "}
        <strong>roterer jorden under den</strong> (NOAA, u.å.-a).
      </p>
      <p>
        Når vi tegner luftens bane på et kart eller ser den fra bakken, ser det derfor ut som om
        luften gradvis krummer av og svinger til siden:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          På <strong>nordlig halvkule</strong> avbøyes all horisontal bevegelse mot{" "}
          <strong>høyre</strong> i forhold til bevegelsesretningen.
        </li>
        <li>
          På <strong>sørlig halvkule</strong> avbøyes all horisontal bevegelse mot{" "}
          <strong>venstre</strong> i forhold til bevegelsesretningen.
        </li>
        <li>
          Ved <strong>ekvator (0°)</strong> er den horisontale avbøyningen nøyaktig <strong>null</strong>.
        </li>
      </ul>
      <p>
        Fordi denne avbøyningen utelukkende skyldes vårt eget roterende ståsted, kaller fysikere og
        meteorologer Corioliskraften for en <strong>treghetskraft</strong> eller en{" "}
        <strong>fiktiv kraft</strong> (pseudo-kraft). Det finnes ingen fysisk gjenstand som dytter på
        luften; effekten oppstår utelukkende fordi koordinatsystemet vårt spinner (Met Office, u.å.).
      </p>

      <OrdBoks
        ord="Corioliskraften"
        barn="En fiktiv avbøyningskraft (treghetskraft) som virker på alle legemer i bevegelse sett fra et roterende referansesystem. Avbøyer mot høyre på nordlig halvkule, mot venstre på sørlig, og er null ved ekvator."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Karusell-analogien: Se det for deg i praksis
      </h3>
      <p>
        Den enkleste måten å forstå Corioliseffekten intuitivt på, er å forestille seg en stor
        lekeplasskarusell som roterer <strong>mot klokken</strong> (nøyaktig slik jordens nordlige
        halvkule roterer sett ovenfra fra Nordstjernen):
      </p>

      <PhotoFigure
        src="/images/fig-karusell.jpg"
        alt="En roterende karusell på en lekeplass som demonstrerer treghetskrefter og roterende referanserammer"
        heading="Karusell-eksperimentet: Forskjellen på rommet og den roterende observatøren"
        caption="Står du på en roterende karusell og kaster en ball mot en venn på motsatt side, ser du ballen krumme til høyre og bomme på målet. Sett fra luften ovenfor går ballen i en snorrett linje; det er vennen din som har rotert vekk mens ballen var i luften!"
        marks={[
          { x: 50, y: 50, n: "A", text: "Sentrum (Kaster)", tone: "warm" },
          { x: 80, y: 30, n: "B", text: "Mål på kanten", tone: "cold" },
        ]}
        points={[
          { n: "A", label: "Kaster i sentrum: Kaster ballen i en rett linje i rommet." },
          { n: "B", label: "Mottaker på kanten: Roterer mot venstre mens ballen er underveis." },
        ]}
      />

      <p>
        Tenk deg at du sitter i sentrum av karusellen og kaster en ball rett mot en venn som sitter på
        ytterkanten:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Sett ovenfra fra et tre (treghetssystemet):</strong> Ballen forlater hånden din og
          flyr i en fullstendig <em>snorrett linje</em> mot det punktet der vennen din opprinnelig
          satt. Men mens ballen bruker ett sekund på flyturen, har karusellen rotert videre. Vennen
          din har flyttet seg mot venstre, og ballen lander uskyldig bak ryggen hennes.
        </li>
        <li>
          <strong>Sett fra ditt ståsted på karusellen (det roterende referansesystemet):</strong> Du
          merker ikke at karusellen snurrer, for du følger med rundt. For deg ser det ut som om ballen
          på mystisk vis krummer til høyre underveis og svinger vekk fra målet!
        </li>
      </ol>

      <CarouselFrameDiagram />

      {/* 2. HVORFOR AVBØYES BEVEGELSE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hvorfor avbøyes all bevegelse? Både nord–sør og øst–vest!
      </h2>
      <p>
        I mange elementære lærebøker forklares Corioliseffekten utelukkende ved at ekvator roterer
        raskere enn polene. Selv om dette er helt sant for luft som beveger seg nordover eller
        sørover, forklarer det ikke hvorfor vind som blåser <strong>rett mot øst eller vest</strong>{" "}
        også bøyes av! I atmosfæren er Corioliseffekten fullstendig uavhengig av kompasskursen. La oss
        se på de to fysiske mekanismene:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-300">
            <span>🌐</span> 1. Nord–sør-bevegelse: Forskjell i omkretsfart
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jorden er en kule med en omkrets på ca. 40 000 km ved ekvator. Alle punkter på kloden bruker
            nøyaktig 24 timer på en omdreining. Dette betyr at bakken ved ekvator suser mot øst med en
            periferihastighet på hele <strong>1670 km/t</strong> (465 m/s). Ved 60°N (Oslo/Bergen) er
            omkretsen halvert, og farten er bare <strong>ca. 840 km/t</strong>. På selve Nordpolen er
            farten <strong>0 km/t</strong>!
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>
              • <strong>Luft som går nordover fra ekvator:</strong> Beholder sin østlige startfart på
              1670 km/t. Lenger nord roterer bakken saktere (f.eks. 1200 km/t). Luftpakken «tar igjen»
              jorden og sklir <em>østover</em> — altså mot <strong>høyre</strong>!
            </li>
            <li>
              • <strong>Luft som går sørover mot ekvator:</strong> Kommer fra et område med lav
              rotasjonsfart til et område der bakken raser unna mot øst. Luftpakken «blir hengende
              etter» mot <em>vest</em> — som også er mot <strong>høyre</strong> når du ser i fartsretningen
              sørover!
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-300">
            <span>⚖️</span> 2. Øst–vest-bevegelse: Sentrifugalkraft (Eötvös-effekten)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Hva skjer når en luftpakke blåser nøyaktig langs en breddegrad (øst eller vest)? Her endres
            ikke avstanden til polen med det første. Årsaken til avbøyningen er i stedet endringen i{" "}
            <strong>sentrifugalkraft rundt jordens rotasjonsakse</strong>:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>
              • <strong>Vind mot ØST (med jordrotasjonen):</strong> Luftpakken roterer raskere enn
              planeten. Vinkelhastigheten øker (Ω + Δω). Den utadrettede sentrifugalkraften øker
              (F_cf = m·ω²·r). På en kuleflate har denne utoverslyngingen en komponent som peker mot{" "}
              <strong>ekvator</strong>. For en vind som blåser østover på nordlig halvkule, er ekvator
              til <strong>høyre</strong>!
            </li>
            <li>
              • <strong>Vind mot VEST (mot jordrotasjonen):</strong> Luftpakken roterer saktere enn
              planeten. Sentrifugalkraften minker. Nå dominerer jordens gravitasjon og trekker pakken
              nærmere jordaksen. Dette gir en overflatekomponent rettet mot <strong>polen</strong>. For en
              vind som blåser vestover i nord, er polen også til <strong>høyre</strong>!
            </li>
          </ul>
        </div>
      </div>

      <ZonalCentrifugalDiagram />

      <p>
        Konklusjonen er universell: Enten luften blåser mot nord, sør, øst, vest eller i en skrå
        kompasskurs, tvinger Newtons lover og jordrotasjonen bevegelsen til å bøye av{" "}
        <strong>mot høyre på nordlig halvkule</strong> og <strong>mot venstre på sørlig halvkule</strong>!
      </p>

      <GlobalDeflectionDiagram />

      {/* 3. CORIOLISPARAMETEREN */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Coriolisparameteren og breddegrad: f = 2Ω sin φ
      </h2>
      <p>
        Hvor kraftig er denne avbøyningen? Styrken til Corioliskraften på en enhetsmasse luft regnes
        ut ved hjelp av en matematisk formel som alle geofag-elever må kjenne til (American
        Meteorological Society [AMS], u.å.):
      </p>
      <div className="my-4 rounded-xl border border-primary/30 bg-card p-5 text-center">
        <p className="font-mono text-xl font-bold tracking-wide text-primary sm:text-2xl">
          F_c = 2 · m · v · Ω · sin(φ)
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          der <strong>m</strong> er massen, <strong>v</strong> er vindhastigheten, <strong>Ω</strong> er
          jordens vinkelhastighet, og <strong>φ</strong> er breddegraden.
        </p>
      </div>

      <p>
        I meteorologi samler vi konstantene og breddegraden i én felles faktor som kalles{" "}
        <strong>Coriolisparameteren (f)</strong>:
      </p>
      <div className="my-3 rounded-lg bg-slate-900/80 p-3 text-center font-mono text-base font-semibold text-sky-400">
        f = 2 · Ω · sin(φ)
      </div>

      <p>
        Jordens vinkelhastighet er konstant: Jorden roterer 2π radianer (360°) på ett stjernedøgn
        (86 164 sekunder):
      </p>
      <div className="my-2 text-center font-mono text-sm text-muted-foreground">
        Ω = 2π / 86 164 s ≈ 7,2921 × 10⁻⁵ rad/s
      </div>

      <p>
        Siden Ω er et fast tall, er det utelukkende <strong>sinus til breddegraden (sin φ)</strong> som
        bestemmer hvor sterk Corioliseffekten er på et gitt sted på kloden:
      </p>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 font-display text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-3">Sted / Sone</th>
              <th className="p-3">Breddegrad (φ)</th>
              <th className="p-3">sin(φ)</th>
              <th className="p-3">Coriolisparameter (f)</th>
              <th className="p-3">Effekt på atmosfæren</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3 font-medium text-foreground">Ekvator</td>
              <td className="p-3 font-mono">0°</td>
              <td className="p-3 font-mono">0,000</td>
              <td className="p-3 font-mono font-bold text-emerald-400">0,00 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Ingen horisontal avbøyning. Orkaner kan aldri dannes her.</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground">Subtropene (Sahara/Florida)</td>
              <td className="p-3 font-mono">30°N</td>
              <td className="p-3 font-mono">0,500</td>
              <td className="p-3 font-mono font-bold text-sky-400">0,73 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Moderat avbøyning. Driver passatvindene og orkanbaner.</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground">Sør-Norge (Oslo/Bergen)</td>
              <td className="p-3 font-mono">60°N</td>
              <td className="p-3 font-mono">0,866</td>
              <td className="p-3 font-mono font-bold text-sky-300">1,26 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Svært sterk avbøyning (87 % av polarmaks). Kraftig lavtrykksrotasjon.</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground">Nordpolen / Sørpolen</td>
              <td className="p-3 font-mono">90°</td>
              <td className="p-3 font-mono">1,000</td>
              <td className="p-3 font-mono font-bold text-amber-400">1,46 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Maksimal avbøyningskraft. Vertikal rotasjonsakse er loddrett på bakken.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CoriolisLatitudeDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hvorfor dannes det aldri tropiske orkaner på ekvator?
      </h3>
      <p>
        For at en tropisk storm skal kunne vokse til en monsterorkan, kreves det enorme mengder varmt
        havvann (over 26,5 °C). Havet ved ekvator er det varmeste på planeten (ofte 29–30 °C). Likevel
        har meteorologer aldri observert en orkan som oppstår mellom 0° og 5° breddegrad!
      </p>
      <p>
        Forklaringen er ren Coriolis-fysikk: Ved ekvator er <strong>f ≈ 0</strong>. Når fuktig luft
        stiger i kraftige tordenbyger og skaper et lokalt lavtrykk ved havflaten, raser luften rundt
        rett inn mot sentrum i en snorrett linje for å tette trykkgapet. Uten Corioliskraften finnes det
        ingen sideveis avbøyning som kan sette luftmassene i rotasjon. Trykket fylles opp og utlignes
        umiddelbart, og stormen kveler seg selv før den rekker å organisere en virvel!
      </p>
      <p>
        Først når vi beveger oss minst <strong>500 kilometer (5 grader) vekk fra ekvator</strong>, er
        Coriolisparameteren sterk nok til å vri luftstrømmene til side og spinne i gang den
        fryktinngytende orkanvirvelen (NOAA, u.å.-a).
      </p>

      <PhotoFigure
        src="/images/fig-syklon.jpg"
        alt="Satellittbilde av en fullt utviklet tropisk orkan med spiralbånd og øye"
        heading="Orkanens motor: Avhengig av Coriolis for å rotere"
        caption="En orkan er et konsentrert roterende lavtrykk. Luften som suges inn mot det ekstremt lave trykket i øyet, bøyes kontinuerlig mot høyre av Corioliskraften, slik at hele systemet spinner mot klokken på nordlig halvkule."
        arrows={[
          { d: "M 38 16 Q 22 28 30 46", tone: "low", width: 1.5 },
          { d: "M 30 46 Q 48 58 70 46", tone: "low", width: 1.5 },
          { d: "M 70 46 Q 78 28 58 16", tone: "low", width: 1.5 },
        ]}
        marks={[
          { x: 48, y: 36, n: "L", text: "Orkanens øye (Lavt trykk)", tone: "low" },
          { x: 12, y: 15, n: "1", text: "Syklonal spiral innover", tone: "warm" },
        ]}
        points={[
          { n: "L", label: "Orkanens øye: Ekstremt lavt lufttrykk (ofte under 920 hPa)." },
          { n: "1", label: "Rotasjonsretning: Innstrømmende luft bøyes mot høyre, og danner spiral mot klokken i nord." },
        ]}
      />

      <p className="pt-2 text-sm text-muted-foreground">
        <em>Merk koblingen til Rossby-bølger:</em> Fordi Coriolisparameteren endrer seg med breddegraden
        (en effekt som kalles <strong>Beta-effekten</strong>, $\beta = \partial f / \partial y$), oppstår
        det en naturlig gjenopprettende kraft når jetstrømmen bukter seg nord–sør. Dette skaper de
        gigantiske planetære meandrene som styrer stormbanene over Atlanteren, og som vi behandler i
        kapittelet om{" "}
        <Link to="/tema/jetstrommer" className={lenke}>
          jetstrømmer
        </Link>
        .
      </p>

      {/* 4. KRAFTBALANSER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Klassiske kraftbalanser i atmosfæren: Fra ro til geostrofisk vind
      </h2>
      <p>
        I kapittelet om{" "}
        <Link to="/tema/hoytrykk-lavtrykk" className={lenke}>
          høytrykk og lavtrykk
        </Link>{" "}
        lærte du at lufttrykkforskjeller skaper en <strong>trykkgradientkraft (F_pg)</strong> som peker
        vinkelrett fra høyt mot lavt trykk. Hvorfor blåser da ikke vinden bare rett fra høytrykk til
        lavtrykk på værkartet?
      </p>
      <p>
        Svaret skyldes samspillet mellom tre krefter: trykkgradientkraften, Corioliskraften og
        friksjon. La oss følge en luftpakke fra den starter fra ro i fri atmosfære:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Trinn 1 (Start fra ro):</strong> En luftpakke ligger stille i et område med høyere
          trykk i sør enn i nord. Trykkgradientkraften (F_pg) trekker luften rett mot nord. Siden farten
          er null (v = 0), er Corioliskraften nøyaktig null (F_c = 0).
        </li>
        <li>
          <strong>Trinn 2 (Akselerasjon og avbøyning):</strong> F_pg akselererer luftpakken mot nord.
          Idet luften får fart, våkner Corioliskraften til liv! Den virker alltid 90° til høyre for
          fartsretningen (mot øst). Luftens bane krummer mot høyre.
        </li>
        <li>
          <strong>Trinn 3 (Vekst i Coriolis):</strong> Jo lenger luftpakken akselererer, desto større
          blir farten. Fordi Corioliskraften er proporsjonal med fart (F_c = f·v), blir avbøyningskraften
          stadig sterkere og svinger banen enda mer mot øst.
        </li>
        <li>
          <strong>Trinn 4 (Geostrofisk likevekt):</strong> Til slutt har luftpakken svingt hele 90°! Nå
          blåser vinden rett fra vest mot øst. Corioliskraften peker rett sørover mot høytrykket, og
          balanserer trykkgradientkraften som peker rett nordover:{" "}
          <strong>F_pg + F_c = 0</strong>.
        </li>
      </ol>
      <p>
        Når disse to kreftene er i perfekt balanse, kalles vinden <strong>geostrofisk vind</strong>.
        Den blåser nøyaktig <strong>parallelt med isobarene</strong>!
      </p>

      <OrdBoks
        ord="Geostrofisk vind"
        barn="Teoretisk horisontal vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt likevekt. Vinden blåser nøyaktig parallelt med isobarene med lavtrykket til venstre på nordlig halvkule."
      />

      <GeostrophicAdjustmentDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Buys Ballots lov: Den gylne regelen for sjøfolk og geofag-elever
      </h3>
      <p>
        I 1857 formulerte den nederlandske meteorologen Christoph Buys Ballot en berømt empirisk regel
        som er et direkte resultat av geostrofisk balanse:
      </p>
      <div className="my-3 rounded-xl border border-border/80 bg-surface/50 p-4 text-center">
        <p className="font-display text-base font-semibold text-primary sm:text-lg">
          «Står du med vinden i ryggen på nordlig halvkule, har du lavtrykket til venstre for deg!»
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          På sørlig halvkule er regelen speilvendt: Står du med vinden i ryggen, har du lavtrykket til høyre.
        </p>
      </div>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hva gjør bakkefriksjonen? Hvorfor blåser vinden på skrå nær bakken?
      </h3>
      <p>
        Geostrofisk vind gjelder i den frie atmosfæren – fra om lag 1000 meters høyde og oppover, der det
        ikke finnes trær, fjell eller havbølger som bremser farten. Men hva skjer nede ved bakken der vi
        bor?
      </p>
      <p>
        Nær bakken bremser <strong>friksjonskraften (F_f)</strong> vindhastigheten. Men legg merke til
        hva som skjer med balansen:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Fordi vindhastigheten reduseres av friksjon, blir også <strong>Corioliskraften svakere</strong>{" "}
          (F_c er direkte proporsjonal med fart).
        </li>
        <li>
          <strong>Trykkgradientkraften (F_pg) påvirkes derimot ikke av friksjon</strong> — den styres bare
          av avstanden mellom isobarene på kartet!
        </li>
        <li>
          Dermed «vinner» trykkgradientkraften drakampen: Vinden klarer ikke å svinge hele veien til
          parallell kurs, men trekkes <strong>på skrå over isobarene inn mot det laveste trykket</strong>!
        </li>
      </ul>
      <p>
        Over åpent hav er vinkelen typisk 10°–15°, mens over kupert terreng og skog på land er friksjonen
        større, og vinkelen øker til 25°–35°.
      </p>

      <PressureSpinDiagram />

      <p>
        Dette forklarer de to fundamentale værmønstrene på nordlig halvkule:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Rundt et lavtrykk (L):</strong> Vinden blåser i en spiral{" "}
          <strong>mot klokken (syklonalt)</strong> og <em>inn mot sentrum</em> (bakkekonvergens).
          Fordi bakken sperrer under, må luften presses <strong>oppover</strong>. Luften avkjøles
          adiabatisk, vanndamp kondenserer, og det dannes skyer og nedbør.
        </li>
        <li>
          <strong>Rundt et høytrykk (H):</strong> Vinden blåser i en spiral{" "}
          <strong>med klokken (antisyklonalt)</strong> og <em>utover fra sentrum</em> (bakkedivergens).
          For å erstatte luften som rømmer, suges luft ned fra høyden (subsidens). Luften varmes
          adiabatisk, skydråpene fordamper, og himmelen blir krystallklar!
        </li>
      </ul>

      {/* 5. SKALA OG ROSSBY-TALLET */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Skala og Rossby-tallet (Ro): Det endelige oppgjøret med vaskemyten
      </h2>
      <p>
        Du har garantert hørt myten: <em>«Vannet i toalettet eller badekaret renner ut mot klokken i
        Norge og med klokken i Australia på grunn av Corioliseffekten.»</em> Turister i Kenya og Ecuador
        blir til og med lurt av gateselgere som flytter en bøtte over en malt ekvatorlinje for å vise
        at vannet snur retning.
      </p>
      <p>
        <strong>Dette er 100 % fysisk umulig og en ren myte!</strong>
      </p>
      <p>
        Hvordan kan vi som geofag-elever bevise dette vitenskapelig? Meteorologer og oseanografer
        bruker et berømt dimensjonsløst tall oppkalt etter Carl-Gustaf Rossby:{" "}
        <strong>Rossby-tallet (Ro)</strong>:
      </p>
      <div className="my-4 rounded-xl border border-border bg-card p-4 text-center">
        <p className="font-mono text-xl font-bold text-primary">
          Ro = U / (f · L)
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          der <strong>U</strong> er hastigheten, <strong>f</strong> er Coriolisparameteren (~1,26 × 10⁻⁴ s⁻¹ i Norge),
          og <strong>L</strong> er fenomenets karakteristiske lengdeskala (størrelse).
        </p>
      </div>

      <p>
        Rossby-tallet sammenligner treghetskreftene (akselerasjon og sentrifugalkraft, U/L) med
        Corioliskraften (f):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Når Ro &gt;&gt; 1 (mye større enn 1):</strong> Corioliseffekten er forsvinnende liten
          og fullstendig neglisjerbar sammenlignet med andre krefter.
        </li>
        <li>
          <strong>Når Ro &lt;&lt; 1 (mye mindre enn 1):</strong> Corioliseffekten er kolossalt dominerende
          og tvinger væsken eller luften inn i geostrofisk balanse.
        </li>
      </ul>

      <RossbyScaleDiagram />

      <p>
        La oss sette inn tallene for en typisk baderomsvask:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>Vaskens diameter: <strong>L ≈ 0,3 meter</strong>.</li>
        <li>Vannets tappehastighet: <strong>U ≈ 0,5 m/s</strong>.</li>
        <li>Coriolisparameter i Norge: <strong>f ≈ 1,26 × 10⁻⁴ s⁻¹</strong>.</li>
      </ul>
      <div className="my-3 rounded-lg bg-slate-900/80 p-3 text-center font-mono text-sm text-red-400">
        Ro = 0,5 / (1,26 × 10⁻⁴ · 0,3) ≈ 13 200
      </div>
      <p>
        Rossby-tallet i vasken er over <strong>13 000</strong>! Det betyr at treghetskreftene, kummens
        form, asymmetri i sluket, kranens vinkel og restvirvler fra da du vasket hendene er over{" "}
        <strong>ti tusen ganger sterkere enn Corioliskraften</strong>. Hvilken vei vannet roterer i en
        vanlig vask, er fullstendig tilfeldig og har ingenting med jordrotasjonen å gjøre.
      </p>
      <p>
        I en atlantisk storm er derimot <strong>L ≈ 1 500 000 meter (1500 km)</strong> og farten 20 m/s:
      </p>
      <div className="my-3 rounded-lg bg-slate-900/80 p-3 text-center font-mono text-sm text-emerald-400">
        Ro = 20 / (1,26 × 10⁻⁴ · 1 500 000) ≈ 0,10
      </div>
      <p>
        Her er Rossby-tallet bare 0,10! Nå er Corioliskraften ti ganger sterkere enn akselerasjonen, og
        systemet <em>må</em> rotere mot klokken. Corioliseffekten krever store avstander og lang tid for å
        virke.
      </p>

      {/* 6. HAVET OG EKMAN */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Coriolis i verdenshavene: Ekman-spiral, kystoppvelling og havvirvler
      </h2>
      <p>
        Corioliseffekten virker med nøyaktig samme fysiske kraft på flytende vannmasser i havet som på
        gassmolekylene i luften. Faktisk er det i havet at noen av de mest spektakulære og livsviktige
        konsekvensene av Corioliseffekten utspiller seg (NOAA, u.å.-b):
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Ekman-spiralen: Vinden drar i overflaten, Coriolis vrir i dypet
      </h3>
      <p>
        I 1902 publiserte den svenske oseanografen Vagn Walfrid Ekman en matematisk modell som forklarte
        hvorfor isfjell i Polhavet ikke drev i samme retning som vinden blåste, men systematisk drev 20–40°
        til høyre for vindretningen (en observasjon opprinnelig gjort av Fridtjof Nansen under Fram-ferden).
      </p>
      <p>
        Mekanismen kalles <strong>Ekman-spiralen</strong>:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Vindstress på overflaten:</strong> Vinden blåser over havoverflaten og overfører
          bevegelsesenergi ved friksjon. Corioliskraften avbøyer det øverste millimetertynne vannlaget{" "}
          <strong>45° til høyre</strong> for vindretningen (på nordlig halvkule).
        </li>
        <li>
          <strong>Friksjon nedover i vannsøylen:</strong> Det øverste vannlaget drar med seg laget under
          ved molekylær og turbulent friksjon (viskositet). Dette dypere laget beveger seg saktere, og
          avbøyes enda litt lenger mot høyre.
        </li>
        <li>
          <strong>Spiralen i dypet:</strong> For hvert dypere lag vi måler, blir strømningshastigheten
          svakere og vinkelen mer avbøyd. På bunnen av Ekman-laget (typisk 50–100 meters dyp) beveger
          vannet seg faktisk i <em>motsatt retning</em> av overflatevinden!
        </li>
      </ol>
      <p>
        Det mest oppsiktsvekkende resultatet oppstår når vi summerer opp all vanntransporten gjennom
        hele denne spiralen: <strong>Netto Ekman-transport går nøyaktig 90° til høyre for vindretningen</strong>{" "}
        på nordlig halvkule (og 90° til venstre på sørlig halvkule)!
      </p>

      <OrdBoks
        ord="Ekman-transport"
        barn="Den integrerte nettotransporten av vannmasser i det øvre havlaget forårsaket av vindstress og Corioliseffekten. Retningen er nøyaktig 90° til høyre for vindretningen på nordlig halvkule, og 90° til venstre på sørlig halvkule."
      />

      <EkmanSpiralDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Kystoppvelling (Upwelling): Næringskilden til verdens rikeste fiskerier
      </h3>
      <p>
        Hva skjer når en vind blåser parallelt med kystlinjen? På Vestlandet hender det ofte om våren og
        sommeren at et stabilt høytrykk over Norskehavet sender en vedvarende{" "}
        <strong>nordavind sørover langs norskekysten</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          Vinden blåser mot sør. Corioliseffekten tvinger netto Ekman-transport 90° til høyre — altså{" "}
          <strong>rett vestover og vekk fra kysten</strong>!
        </li>
        <li>
          Det varme, solfylte overflatevannet skyves bokstavelig talt ut i Nordsjøen.
        </li>
        <li>
          Dette etterlater et masseunderskudd ved svabergene. For å tette tomrommet må vann erstattes
          nedenfra: <strong>Iskaldt, næringsrikt dypvann suges opp mot overflaten langs kysten</strong>.
        </li>
      </ul>
      <p>
        Dette fenomenet kalles <strong>kystoppvelling (upwelling)</strong>. Dypvannet har ligget i mørket
        og samlet opp enorme konsentrasjoner av nitrat, fosfat og silikat fra døde organismer som har
        sunket til bunns. Når dette næringsrike vannet pumpes opp i sollyset i overflaten, eksploderer
        produksjonen av planteplankton. Dette danner festmåltid for raudåte, sild, torsk og sjøfugl!
      </p>
      <p>
        Det samme prinsippet forklarer hvorfor kysten av Peru og Chile (Humboldtstrømmen) og
        Nordvest-Afrika (Kanaristrømmen) har verdens rikeste sardin- og ansjosfiskerier: Passatvindene
        skyver overflatevannet vekk fra kontinentet, og permanent oppvelling forer marine økosystemer
        med næringssalter.
      </p>

      {/* 7. INTERAKTIV SIMULATOR */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Utforsk selv: Interaktivt Coriolis-laboratorium
      </h2>
      <p>
        Bruk simulatoren under til å eksperimentere med utskytning på ulike breddegrader, observere
        overgangen fra ren geostrofisk vind til friksjonsbremset bakkevind, og beregne Rossby-tallet
        for alt fra badekaret til Golfstrømmen:
      </p>

      <CoriolisModel />

      {/* 8. EKSAMENSFELLER */}
      <div className="mt-8 space-y-4">
        <Callout title="De 4 vanligste eksamensfellene om Corioliseffekten">
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>
              <strong>1. Coriolis starter aldri vinden:</strong> Corioliskraften kan aldri sette en
              luftpakke i bevegelse eller øke farten dens! Den virker alltid 90° vinkelrett på
              bevegelsesretningen, og gjør dermed <em>null mekanisk arbeid</em> (W = F · s · cos 90° = 0).
              Det er utelukkende trykkgradientkraften som setter luften i bevegelse og tilfører kinetisk
              energi. Coriolis bare svinger kursen.
            </li>
            <li>
              <strong>2. Coriolis virker like sterkt øst–vest som nord–sør:</strong> En klassisk feil til
              eksamen er å tro at bare luft som reiser mot polene bøyes av. Bevegelse mot øst eller vest
              bøyes like kraftig til høyre på nordlig halvkule på grunn av endringen i sentrifugalkraft
              rundt jordaksen (Eötvös-effekten).
            </li>
            <li>
              <strong>3. Vasken og badekaret styres IKKE av Coriolis:</strong> Hvis sensor spør om vannet
              i vasken spinner mot klokken i Norge, må du svare kontant nei. Henvis til Rossby-tallet
              (Ro ≈ 13 000 &gt;&gt; 1): Kummens geometri, asymmetri i røret og restvirvler er titusenvis av
              ganger sterkere enn jordens rotasjonsavbøyning på en så mikroskopisk skala.
            </li>
            <li>
              <strong>4. Geostrofisk vind blåser ikke ved bakken:</strong> Geostrofisk likevekt (vinden
              parallelt med isobarene) forutsetter null friksjon og oppstår bare i fri atmosfære over ca.
              1000 moh. Ved bakken bremser friksjonen farten, svekker Corioliskraften, og gjør at
              trykkgradientkraften trekker vinden på skrå (15°–30°) inn mot lavtrykk og ut av høytrykk.
            </li>
          </ul>
        </Callout>
      </div>

      {/* 9. VIKTIGE BEGREPER */}
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Corioliseffekten"
          def="Fiktiv treghetskraft som oppstår fordi vi observerer bevegelse fra en roterende jordklode. Avbøyer mot høyre på NH, mot venstre på SH, og er null ved ekvator."
        />
        <Term
          name="Coriolisparameteren (f)"
          def="f = 2Ω sin φ. Matematisk faktor for jordrotasjonens styrke ved en gitt breddegrad φ. Er 0 ved ekvator og 1,26 × 10⁻⁴ s⁻¹ i Norge."
        />
        <Term
          name="Treghetssystem (Inertialramme)"
          def="Referansesystem i ro eller med konstant rettlinjet hastighet (f.eks. stjernene/rommet), der Newtons bevegelseslover gjelder uten fiktive krefter."
        />
        <Term
          name="Geostrofisk vind"
          def="Vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt balanse. Vinden blåser parallelt med isobarene."
        />
        <Term
          name="Buys Ballots lov"
          def="Regel: Står du med ryggen mot vinden på nordlig halvkule, har du lavtrykket til venstre for deg."
        />
        <Term
          name="Atmosfærisk grenselag"
          def="De nederste 1000 meterne av atmosfæren der bakkefriksjon bremser farten, svekker Coriolis og vrir vinden på skrå inn mot lavtrykk."
        />
        <Term
          name="Bakkekonvergens"
          def="Innstrømming av luft mot sentrum av et lavtrykk nær bakken, som tvinger luften til å stige og danner skyer og nedbør."
        />
        <Term
          name="Bakkedivergens"
          def="Utstrømming av luft fra sentrum av et høytrykk nær bakken, som suger tørr luft ned fra høyden (subsidens) og gir klarvær."
        />
        <Term
          name="Rossby-tallet (Ro)"
          def="Dimensjonsløst tall Ro = U / (f·L). Viser om et fenomen styres av Coriolis (Ro << 1, f.eks. stormer) eller treghet (Ro >> 1, f.eks. vasker)."
        />
        <Term
          name="Ekman-spiral"
          def="Strukturen i havets overflatelag der strømretningen dreier dypere nedover i en spiral som følge av vindstress og Corioliskraften."
        />
        <Term
          name="Ekman-transport"
          def="Netto vanntransport gjennom hele Ekman-laget, rettet 90° til høyre for vinden på nordlig halvkule."
        />
        <Term
          name="Kystoppvelling (Upwelling)"
          def="Oppstigning av kaldt, ekstremt næringsrikt dypvann langs kysten når vind og Ekman-transport skyver overflatevannet vekk fra land."
        />
      </TermGrid>

      {/* 10. TEST DEG SELV QUIZ */}
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Corioliseffekten
      </h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den fundamentale fysiske årsaken til at Corioliseffekten oppstår?",
            options: [
              "Jordens magnetfelt trekker på ladede ioner i luften.",
              "Vi observerer bevegelse fra et roterende referansesystem (jorden), mens legemet beveger seg rett fram i rommet.",
              "Månens gravitasjon bremser atmosfærens rotasjon.",
              "Solen varmer opp den østlige siden av jorden før den vestlige.",
            ],
            answer: 1,
            explain:
              "Corioliskraften er en fiktiv kraft (treghetskraft). En luftpakke beveger seg i en rett linje i forhold til rommet (Newtons 1. lov), men fordi jorden roterer under den, ser banen krummet ut sett fra bakken.",
          },
          {
            prompt:
              "Hvorfor avbøyes også en vind som blåser rett mot ØST mot høyre (sørover mot ekvator) på nordlig halvkule?",
            options: [
              "Fordi luften treffer fjellkjeder som dytter den sørover.",
              "Fordi vind mot øst øker rotasjonsfarten rundt jordaksen; den økte sentrifugalkraften kaster luften ut fra aksen, noe som gir en overflatekomponent mot ekvator.",
              "Fordi ekvator har sterkere gravitasjon enn polene.",
              "Det er feil; bare nord-sør-vinder avbøyes av Coriolis.",
            ],
            answer: 1,
            explain:
              "Når luften beveger seg mot øst, roterer den raskere enn jorden rundt jordaksen (Ω + Δω). Dette øker sentrifugalkraften (m·ω²·r). På en kuleflate peker den økte sentrifugalkraften vekk fra aksen, noe som gir en kraftkomponent rettet mot ekvator — altså mot høyre i nord (Eötvös-effekten)!",
          },
          {
            prompt: "Hvorfor kan det aldri dannes tropiske orkaner på selve ekvatorlinjen (0°)?",
            options: [
              "Fordi havvannet ved ekvator er for kaldt til å fordampe.",
              "Fordi passatvindene kolliderer og kveler all vind.",
              "Fordi Coriolisparameteren f = 2Ω sin(φ) er nøyaktig null ved ekvator, slik at luften ikke kan settes i rotasjon.",
              "Fordi lufttrykket ved ekvator alltid er over 1030 hPa.",
            ],
            answer: 2,
            explain:
              "Ved ekvator er breddegraden 0°, og sin(0°) = 0. Uten Coriolis finnes det ingen sideveis kraft som kan avbøye den innstrømmende luften til en roterende virvel; luften fyller lavtrykket direkte opp uten rotasjon. Orkaner må ha minst f > 0 (over 5° bredde) for å rotere.",
          },
          {
            prompt:
              "Hva er geostrofisk vind, og hvorfor blåser den parallelt med isobarene?",
            options: [
              "Det er en lokal kastevind som raser nedover fjellsider.",
              "Det er vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt likevekt og opphever hverandre.",
              "Det er vind som blåser 90° rett inn i lavtrykket ved bakken.",
              "Det er en havstrøm som følger kontinentalsokkelen.",
            ],
            answer: 1,
            explain:
              "I fri atmosfære (uten friksjon) akselererer luften inntil Corioliskraften er nøyaktig like stor som trykkgradientkraften, men motsatt rettet (F_pg = F_c). Da slutter luften å bevege seg mot lavere trykk og blåser parallelt med isobarene.",
          },
          {
            prompt:
              "Hvorfor er påstanden om at vannet i vasken spinner pga. Corioliseffekten vitenskapelig feilaktig?",
            options: [
              "Fordi vann ikke er påvirket av tyngdekraften.",
              "Fordi Rossby-tallet for en vask er over 10 000, noe som betyr at kummens form og restvirvler er titusenvis av ganger sterkere enn Coriolis.",
              "Fordi Coriolis bare virker på saltvann, ikke på ferskvann.",
              "Fordi Corioliskraften bare eksisterer om natten.",
            ],
            answer: 1,
            explain:
              "Rossby-tallet Ro = U / (f·L) måler forholdet mellom treghetskrefter og Coriolis. I en vask er L bare noen desimeter, så Ro ≈ 13 000 >> 1. Coriolis er mikroskopisk svak på denne skalaen; kranens vinkel, kummens asymmetri og håndbevegelser bestemmer rotasjonen 100 %.",
          },
          {
            prompt:
              "Hva skjer med havvannet når det blåser en vedvarende nordavind sørover langs norskekysten?",
            options: [
              "Vannet presses rett inn i fjordene og skaper oversvømmelse.",
              "Ekman-transporten skyver overflatevannet 90° til høyre (vekk fra kysten), og kaldt, næringsrikt dypvann suges opp til overflaten (kystoppvelling).",
              "Golfstrømmen stopper fullstendig opp og snur sørover.",
              "Havoverflaten varmes opp til over 25 °C på få timer.",
            ],
            answer: 1,
            explain:
              "På nordlig halvkule fører vindstress og Coriolis til at netto Ekman-transport går 90° til høyre for vinden. Med nordavind sørover skyves overflatevannet vestover og ut i havet. Tomrommet ved kysten erstattes av oppvelling av kaldt, næringsrikt dypvann!",
          },
        ]}
      />
    </TopicLayout>
  );
}
