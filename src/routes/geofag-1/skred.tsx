import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { MarineLimitDiagram } from "@/components/diagrams/hydrology";
import {
  FjellskredBolgeDiagram,
  KvikkleireDiagram,
  SkredKrefterDiagram,
  SkredSonerDiagram,
  SkredTyperDiagram,
} from "@/components/diagrams/skred";
import { GeoMap } from "@/components/geo-map";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("skred")!;

export const Route = createFileRoute("/geofag-1/skred")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/skred",
    }),
  component: SkredPage,
});

function SkredPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Alt som ligger i en skråning, ligger der på lånt tid. Spørsmålet er bare om kreftene som holder massen på plass, er større enn de som trekker den nedover — og hva som skal til for å tippe regnestykket."
      banner="/images/fig-ravine.jpg"
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/vann-og-flom",
        label: "Forrige: Vann og flom",
      }}
      next={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Neste: Geologiske ressurser",
      }}
      kilder={KILDER.skred}
    >
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        To krefter som konkurrerer
      </h2>
      <p>
        Skred er masse som løsner og beveger seg nedover. I geofag 1 holder vi oss til fjell og
        løsmasse. Snøskred er kryosfære og hører i geofag 2.
      </p>
      <p>
        Bak alle skredtypene ligger det samme regnestykket. Tyngdekraften trekker rett ned, men bare
        den delen av kraften som peker langs skråningen, driver massen nedover. Jo brattere
        skråningen er, desto større blir den delen. Mot den står de holdende kreftene: friksjon
        mellom kornene, og kohesjon, altså at massen henger sammen.
      </p>
      <p>
        Så lenge de holdende kreftene er størst, står skråningen. Skredet kommer i det øyeblikket
        forholdet snur. Da har enten de drivende kreftene økt, eller de holdende har blitt svekket.
      </p>
      <OrdBoks
        ord="Skjærstyrke"
        barn="De holdende kreftene i massen: friksjon mellom kornene pluss kohesjon. Skred skjer når de drivende kreftene blir større enn skjærstyrken."
      />
      <p>
        Vann er den vanligste måten å svekke de holdende kreftene. Når porene mellom kornene fylles
        med vann, stiger poretrykket. Vanntrykket presser kornene fra hverandre, de klemmes ikke
        lenger like hardt sammen, og friksjonen faller. Massen er like tung som før, men den holder
        dårligere. Det er hele forklaringen på hvorfor de fleste løsmasseskred kommer i eller rett
        etter kraftig nedbør og snøsmelting.
      </p>
      <OrdBoks
        ord="Poretrykk"
        barn="Trykket i vannet mellom kornene. Stiger det, presses kornene fra hverandre, friksjonen faller, og skråningen blir svakere."
      />

      <SkredKrefterDiagram />

      <p>
        Skill mellom to slags årsaker, for det er den skillelinjen sensor leter etter.{" "}
        <strong>Predisposisjonen</strong> er det som ligger der fra før og gjør stedet skredutsatt:
        bratt terreng, sprekker i fjellet, kvikkleire i grunnen, tykke løsmasser.{" "}
        <strong>Utløseren</strong> er det som tipper regnestykket på et gitt tidspunkt: et døgn med
        ekstremnedbør, snøsmelting, et gravearbeid, erosjon i en bekk. Predisposisjonen forklarer
        <em> hvor</em> skredet går. Utløseren forklarer <em>når</em>.
      </p>
      <OrdBoks
        ord="Predisposisjon og utløser"
        barn="Predisposisjon: det som ligger der fra før — bratthet, sprekker, kvikkleire. Utløser: det som tipper det over — nedbør, snøsmelting, graving, erosjon."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Tre soner: løsne, transport, utløp
      </h2>
      <p>
        Et skred har tre deler, og de ligger på ulike steder i terrenget. Løsneområdet er der massen
        bryter løs, høyest i skråningen. Transportsonen er sporet nedover, ofte en renne eller et
        bekkeløp. Utløpsområdet er der massen legger seg, som regel der terrenget flater ut.
      </p>
      <p>
        Legg merke til konsekvensen: faren sitter oppe i skråningen, men skaden skjer nede i
        utløpet. Og det er nettopp i utløpet folk bygger, fordi det er der terrenget er flatt. Et
        faresonekart må derfor vise hvor langt massen kan rekke, ikke bare hvor den kan løsne.
      </p>
      <OrdBoks
        ord="Utløpsområde"
        barn="Der massen legger seg, som regel der terrenget flater ut. Faren sitter oppe i skråningen, men skaden skjer i utløpet."
      />

      <SkredSonerDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fem skredtyper, sortert på to spørsmål
      </h2>
      <p>
        Skredtypene virker mange og like. Still to spørsmål, og de faller på plass. Er materialet
        fast fjell eller løsmasse? Og faller, glir eller flyter massen?
      </p>

      <SkredTyperDiagram />

      <p>
        <strong>Steinsprang og steinskred</strong> er blokker som løsner fra sprekker i fjell.
        Volumet er ofte lite, men fallet er fritt og farten høy — en blokk i fritt fall passerer 100
        km/t etter noen titalls meter. De krever bratt terreng, i praksis brattere enn om lag 45°,
        og de er hyppige langs vei og jernbane fordi vi har sprengt oss inn under fjellsider.
        Utløsere er frostsprengning i sprekker, rotvekst og undergraving i foten. Sikring er bolter,
        nett, rasoverbygg og arealplan.
      </p>

      <PhotoFigure
        src="/images/fig-steinsprang.jpg"
        alt="Blokker på våt asfalt under bratt fjellside med oppsatt steinsprangnett"
        heading="Steinsprang mot vei"
        caption="Lite volum, men høy fart og hyppige hendelser. Det lyse feltet i veggen er såret der blokkene løsnet. Nettet oppe er sikring: det stopper ikke bevegelsen i fjellet, men det holder blokkene fra å nå veien."
        marks={[
          { x: 4, y: 10, n: "1", text: "Nett og bolter", tone: "teal" },
          { x: 42, y: 30, n: "2", text: "Ferskt sår i veggen", tone: "low" },
          { x: 96, y: 82, n: "3", text: "Blokker i utløpet", tone: "fg", align: "right" },
        ]}
        points={[
          { n: "1", label: "Sikring: nett, bolter og rasoverbygg langs utsatte strekninger." },
          { n: "2", label: "Blokkene løsnet langs sprekker. Frost og røtter utvider dem." },
          { n: "3", label: "Veien ligger i utløpet. Derfor er småskred her et stort problem." },
        ]}
      />

      <p>
        <strong>Fjellskred</strong> er stort volum fast fjell som løsner, og de hører til de
        sjeldne, men mest alvorlige hendelsene vi har. Fjellet kan sige langsomt i årevis, noen
        centimeter i året, før det akselererer. Grunnvann i sprekkene, frost og langsom svekkelse
        gjør jobben over lang tid. Fordi bevegelsen begynner lenge før skredet, kan fjellskred
        overvåkes — og det er hele grunnlaget for norsk fjellskredberedskap.
      </p>
      <p>
        Treffer massen en fjord eller innsjø, blir det flodbølge. Norske tsunamier kommer nesten
        alltid fra skred, ikke fra jordskjelv ved plategrenser. Det tar vi nærmere under{" "}
        <Link
          to="/geofag-1/vulkaner-og-jordskjelv"
          className="text-primary underline-offset-2 hover:underline"
        >
          vulkaner og jordskjelv
        </Link>
        .
      </p>

      <PhotoFigure
        src="/images/fig-fjellskred-fjord.jpg"
        alt="Bratt fjellside over norsk fjord med lang åpen sprekk og lyst utrasingssår under"
        heading="Ustabilt fjellparti over fjord"
        caption="Den mørke, vannrette linjen høyt i fjellsiden er en åpen sprekk. Under den ligger et lyst sår der masse allerede har gått. Husene ved vannkanten er skalaen: et skred her treffer ikke bare bygda under, men lager en bølge som rammer hele fjorden."
        arrows={[{ d: "M 34 26 L 42 40", tone: "low", width: 0.8 }]}
        marks={[
          { x: 6, y: 18, n: "1", text: "Åpen sprekk", tone: "low" },
          { x: 40, y: 52, n: "2", text: "Utrasingssår", tone: "warm" },
          { x: 96, y: 78, n: "3", text: "Bygd i utløpet", tone: "fg", align: "right" },
        ]}
        points={[
          { n: "1", label: "Sprekken viser at fjellpartiet allerede er i bevegelse." },
          { n: "2", label: "Sår fra tidligere utrasinger nedenfor bruddsonen." },
          { n: "3", label: "Bebyggelse ved vannkanten, i utløpet og i bølgens vei." },
        ]}
      />

      <FjellskredBolgeDiagram />

      <Callout title="Åknes, Tafjord og Veslemannen">
        <p>
          Åknes ligger på vestsiden av Sunnylvsfjorden i Stranda. Fjellet har vært kjent som
          ustabilt siden 1960-tallet, og NVE overvåker det kontinuerlig med GPS, ekstensometer,
          laser, borehull og satellittradar. Et skred kan gi flodbølge i hele Storfjord-systemet.
          Sikring av et helt fjell er urealistisk, så tiltaket er instrumentering, varsling og
          evakuering.
        </p>
        <p>
          Tafjord 7. april 1934 viser hvorfor det tas alvorlig. Om lag 3 millioner m³ fjell falt fra
          Langhammaren i Tafjorden. Bølgen nådde 61 høydemeter, og 40 mennesker mistet livet.
          Sprekken hadde vært kjent i tiår. Båtene ble dratt opp på land i forkant, men folkene ble
          ikke flyttet. Det er argumentet for dagens beredskap.
        </p>
        <p>
          Veslemannen i Romsdalen er eksempelet på at beredskapen virker. Fjellpartiet ble varslet
          og evakuert 16 ganger før det raste delvis ut 5. september 2019. Ingen ble skadet.
          Overvåking stoppet ikke skredet — den ga tid.
        </p>
      </Callout>

      <p>
        <strong>Jordskred</strong> går i morene og forvitringsjord, ikke i fast fjell. De utløses av
        intens nedbør eller snøsmelting på mark som allerede er mettet, og de krever gjerne dalsider
        brattere enn 25–30°. Farten er lavere enn ved steinsprang, typisk noen meter i sekundet, men
        massen river med seg trær, jord og stein på vei ned og blir mer og mer flytende. Bratte
        dalsider, hogstfelt og bekkeløp er de typiske stedene, fordi røttene som armerte jorda er
        borte eller vannet er samlet i en renne.
      </p>
      <p>
        Ekstremværet Hans i august 2023 er typeeksempelet: over 700 jord- og flomskred på noen døgn.
        Grunnvannet var alt høyt etter en våt juli, så da nedbøren kom, hadde marka ingen kapasitet
        igjen. Sammenhengen med flom er tett, og den står under{" "}
        <Link
          to="/geofag-1/vann-og-flom"
          className="text-primary underline-offset-2 hover:underline"
        >
          vann og flom
        </Link>
        .
      </p>

      <PhotoFigure
        src="/images/fig-jordskred.jpg"
        alt="Ferskt jordskredspor ned bratt skogkledd dalside med vifte av brun masse over vei og elv"
        heading="Jordskred i dalside"
        caption="Her ser du alle tre sonene i ett bilde. Øverst løsneområdet der jorda brøt løs i den bratte dalsiden. Midt i bildet transportsonen, en rett renne der massen har barbert bort skogen. Nederst utløpsområdet: en vifte av jord, stein og trestammer som har lagt seg over vei og elv der terrenget flater ut."
        marks={[
          { x: 56, y: 12, n: "1", text: "Løsneområde", tone: "low" },
          { x: 58, y: 40, n: "2", text: "Transportsone", tone: "warm" },
          { x: 96, y: 76, n: "3", text: "Utløp over vei", tone: "fg", align: "right" },
        ]}
        points={[
          { n: "1", label: "Mettet jord brøt løs høyt i den bratte dalsiden." },
          { n: "2", label: "Rennen er barbert for skog. Massen vokser på vei ned." },
          { n: "3", label: "Vifta legger seg der det flater ut — over vei og elv." },
        ]}
      />

      <p>
        <strong>Leirskred</strong> går i leire som ikke nødvendigvis er kvikk. Skråningen svikter,
        og massen glir ut. <strong>Kvikkleireskred</strong> er noe kvalitativt annet: strukturen i
        leira kollapser, og massen flyter av gårde som en væske. Den typen har Norge et helt eget
        problem med, og den fortjener sin egen seksjon.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Kvikkleire: arven fra istiden
      </h2>
      <p>
        For å forstå kvikkleire må du tilbake til slutten av siste istid. Isen presset landet ned,
        så havet sto langt høyere enn i dag, og finkornet leire ble avsatt på bunnen av salte
        fjorder. Da isen smeltet, hevet landet seg, og de gamle sjøbunnene ble tørt land.
      </p>
      <p>
        Marin grense er det høyeste nivået havet nådde etter istiden. I Norge ligger den mellom 0 og
        220 meter over dagens havnivå, høyest rundt Oslo og i Trøndelag. Under marin grense kan det
        ligge marin leire. Over den kan det ikke — og derfor finnes det ingen kvikkleire over marin
        grense.
      </p>
      <OrdBoks
        ord="Marin grense"
        barn="Høyeste havnivå etter siste istid, i Norge 0–220 m. Marin leire, og dermed kvikkleire, kan bare finnes under den."
      />

      <MarineLimitDiagram />

      <p>
        Saltet er nøkkelen. I salt sjøvann la leirpartiklene seg i en åpen, kortstokk-lignende
        struktur der saltionene virket som lim. Vanlig sjøvann har om lag 35 gram salt per liter.
        Etter at landet hevet seg, har ferskt grunnvann sivet gjennom leira i tusenvis av år og
        vasket saltet ut. Kommer porevannet under om lag 2 gram per liter, mister strukturen limet
        sitt — men den står fortsatt.
      </p>
      <p>
        Det er dette som gjør kvikkleire lumsk. Uforstyrret er leira fast; du kan bygge på den og gå
        på den. Men strukturen er et korthus. Blir den omrørt av rystelser, graving eller en
        utglidning, kollapser den, vannet som lå i hulrommene blir fritt, og den faste leira blir
        flytende på sekunder.
      </p>
      <OrdBoks
        ord="Kvikkleire"
        barn="Marin leire der saltet er vasket ut, under om lag 2 g/L. Uforstyrret er den fast. Omrøres den, kollapser strukturen og massen flyter som en væske."
      />
      <p>
        Og fordi massen flyter, trenger den ikke bratt terreng. Kvikkleireskred kan gå i skråninger
        slakere enn 5°, i landskap som ser trygt og flatt ut. Det er den viktigste forskjellen fra
        alle de andre skredtypene på denne siden.
      </p>
      <p>
        Skredet utvikler seg vanligvis retrogressivt, altså bakover. Når den første massen har rent
        ut, mister kanten bak den støtten sin, og den svikter også. Slik kan skredgropa spise seg
        innover i flatt terreng, langt fra der det startet.
      </p>
      <OrdBoks
        ord="Retrogressivt skred"
        barn="Et skred som spiser seg bakover. Hver ny utglidning fjerner støtten til kanten bak, som så svikter i sin tur."
      />

      <KvikkleireDiagram />

      <PhotoFigure
        src="/images/fig-kvikkleire.jpg"
        alt="Kvikkleireskredgrop i flatt jordbrukslandskap med skarp bakkant og hus tett ved kanten"
        heading="Skredgropa etter et kvikkleireskred"
        caption="Se på terrenget rundt gropa: det er flatt jordbruksland. Ingenting her ser bratt eller farlig ut. Den skarpe, loddrette bakkanten er der siste utglidning stoppet, og husene står rett ved den. Massen inni er omrørt leire som har flytt ut og lagt seg igjen i tiltede flak."
        marks={[
          { x: 4, y: 14, n: "1", text: "Flatt land rundt", tone: "teal" },
          { x: 56, y: 22, n: "2", text: "Skarp bakkant", tone: "low" },
          { x: 96, y: 74, n: "3", text: "Omrørt leire", tone: "fg", align: "right" },
        ]}
        points={[
          { n: "1", label: "Terrenget rundt er flatt. Bratthet er ikke kjennetegnet her." },
          { n: "2", label: "Bakkanten er der retrogressjonen stoppet — tett på husene." },
          { n: "3", label: "Leira ble flytende og rant ut, og ligger nå i tiltede flak." },
        ]}
      />

      <Callout title="Rissa 1978 og Gjerdrum 2020">
        <p>
          Rissa i Trøndelag 29. april 1978 er den klassiske norske hendelsen, filmet mens den gikk.
          Skredet startet med at om lag 700 m³ utgravd masse ble lagt i strandkanten ved Botn. Den
          lille tilleggslasten var nok. Skredet utviklet seg retrogressivt i omtrent 40 minutter,
          tok med seg 5–6 millioner m³ og 33 hektar dyrket mark, og én person mistet livet. Det er
          det største kvikkleireskredet i Norge i moderne tid.
        </p>
        <p>
          Gjerdrum 30. desember 2020 viser den samme mekanismen med en annen utløser. Her var det
          erosjon i Tistilbekken over mange år, forsterket av en ødelagt bekkelukking, utbygging og
          terrenginngrep, som gradvis gravde vekk foten av skråningen. Utløseren var en våt, mild
          høst. Skredet tok om lag 1,35 millioner m³, 11 mennesker mistet livet og mer enn 1600 ble
          evakuert.
        </p>
        <p>
          Merk sammenligningen: Gjerdrum var langt mindre enn Rissa i volum, men langt dødeligere.
          Forskjellen er ikke geologi, men at boligfeltet lå i utløpet. Det er forskjellen mellom
          fare og risiko, i én setning.
        </p>
      </Callout>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Havbunnsskred: Storegga
      </h2>
      <p>
        Skred går også under vann, på kontinentalskråningen utenfor kysten. Storeggaskredet gikk for
        om lag 8150 år siden og er et av de største kjente skredene på jorda: 2400–3200 km³ masse,
        en bakvegg på 310 km og et utløp på 810 km.
      </p>
      <p>
        Mekanismen er verdt å merke seg, for du har møtt den før. Massene var morene i veksling med
        bløt leire, og skredet utviklet seg retrogressivt på en helling ned mot 0,3° — altså som et
        kvikkleireskred under vann. Et jordskjelv kan ha vært den første impulsen. Flodbølgen la
        igjen tsunamiavsetninger fra Bømlo til Nordkapp, og også i Skottland, på Shetland og
        Færøyene.
      </p>
      <p>
        Gassfeltet Ormen Lange ligger i kanten av skredgropa. Undersøkelsene konkluderte med at
        skredkanten er stabil, og feltet har vært i produksjon siden 2007.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fare er ikke det samme som risiko
      </h2>
      <p>
        Dette skillet er kjernen i hele kompetansemålet. Fare er sannsynligheten for at et skred
        går. Risiko er fare ganget med konsekvens — altså hva og hvem som befinner seg i utløpet.
      </p>
      <p>
        Et ustabilt fjellparti langt fra folk er høy fare og lav risiko. Gjerdrum var det motsatte:
        en moderat skråning i flatt terreng, men med et boligfelt i utløpet, og dermed katastrofal
        risiko. Det betyr også at risiko kan reduseres på to helt ulike måter: ved å gjøre skredet
        mindre sannsynlig, eller ved å flytte folk og bygg ut av utløpet.
      </p>
      <OrdBoks
        ord="Fare og risiko"
        barn="Fare: sannsynligheten for at skredet går. Risiko: fare ganger konsekvens. Et ustabilt fjell uten folk nedenfor er høy fare og lav risiko."
      />
      <p>
        I Norge er dette et arealproblem. Boliger, vei og jernbane ligger i dalbunner og utløp,
        fordi det er der det er flatt nok å bygge. Til sammenligning: skred og flom tar langt flere
        liv i Norge enn jordskjelv gjør.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Kart, varsling og sikring
      </h2>
      <p>
        NVE lager faresonekart og aktsomhetskart. Forskjellen er viktig. Et faresonekart er en
        detaljert utredning av et avgrenset område. Et aktsomhetskart er en grov, modellbasert
        oversikt over hvor det kan være grunn til å undersøke nærmere.
      </p>
      <GeoMap
        center={[61.2, 8.5]}
        zoom={5}
        markers={[
          { lat: 62.283, lng: 6.983, label: "Åknes – overvåket ustabilt fjellparti" },
          { lat: 62.233, lng: 7.233, label: "Tafjord – fjellskred 1934" },
          { lat: 60.05, lng: 11.03, label: "Gjerdrum (Ask) – kvikkleireskred 2020" },
        ]}
        heading="Skredsteder nevnt på denne siden"
        caption="Åknes, Tafjord og Gjerdrum ligger langt fra hverandre og skyldes ulike skredtyper — felles er at konsekvensen avhenger av hva som står i utløpet."
      />
      <p>
        Og her er fellen: et blankt kart er ikke det samme som trygt. NVE har kartlagt de områdene
        der store kvikkleireskred kan gå — ikke all kvikkleire i landet. Aktsomhet gjelder overalt
        under marin grense, også utenfor de tegnede sonene. Skal du bygge i et aktsomhetsområde, må
        det gjøres en detaljert grunnundersøkelse. Kommunen eier arealplanen og har ansvaret for å
        bruke kartene.
      </p>
      <p>
        Varsom viser jordskredvarsler med gult, oransje og rødt nivå, og status for de overvåkede
        fjellpartiene. Varsling reduserer sårbarheten hvis folk faktisk flytter seg. Den reduserer
        ikke faren i skråningen.
      </p>
      <p>Tiltaket skal matche skredtypen, og det er en god sjekkliste å kunne:</p>
      <p>
        Mot <strong>steinsprang</strong>: bolter, nett, rasoverbygg og sikringsvoller. Mot{" "}
        <strong>jordskred</strong>: ledevoller, fangdammer, bedre bekkeløp og bevaring av skog og
        røtter i bratte dalsider. Mot <strong>kvikkleire</strong>: erosjonssikring i bekker og
        elver, motfylling i skråningsfoten, avlastning ved å fjerne masse fra toppen, og forbud mot
        å legge ny last på kanten. Mot <strong>fjellskred</strong>, der sikring er umulig:
        overvåking, varsling og evakuering.
      </p>

      <PhotoFigure
        src="/images/fig-erosjonssikring.jpg"
        alt="Bekk med steinsatte sider i slak ravine, med boliger på toppen av skråningen"
        heading="Erosjonssikring: å beskytte foten"
        caption="Dette er svaret på Gjerdrum-mekanismen. Steinene langs bunnen og de nedre sidene hindrer bekken i å grave seg videre inn i skråningsfoten. Poenget er ikke å gjøre bakken sterkere, men å stoppe prosessen som over år fjerner det som holder massen over oppe. Husene på toppen er grunnen til at det gjøres."
        marks={[
          { x: 4, y: 14, n: "1", text: "Boliger på toppen", tone: "fg" },
          { x: 62, y: 60, n: "2", text: "Steinsatt bunn og fot", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Bebyggelsen på kanten er det som skal beskyttes." },
          { n: "2", label: "Steinen stopper erosjonen i foten — der skredet ellers starter." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Klima og skredfare</h2>
      <p>
        Her må du være presis, for det er lett å svare for bredt. Mer intens nedbør øker
        utløsningsfaren for løsmasseskred i mange felt. Det er den delen av bildet det er god grunn
        til å si tydelig.
      </p>
      <p>
        Store fjellskred er en annen sak. De styres av sprekker, frost og grunnvann over hundrevis
        av år, og NVE er mer forbeholden når det gjelder klimaeffekten der. Tidsskalaene er rett og
        slett ulike.
      </p>
      <p>
        Gjerdrum er en god test på om du har forstått skillet. Det var ikke «et klimaskred» med
        klimaendringer som eneste forklaring. Hovedårsaken var erosjon og kvikkleire, altså
        predisposisjon bygget opp over lang tid. En våt og mild høst var utløseren. Begge deler er
        med i svaret, i riktig rekkefølge.
      </p>
      <p>
        Skill også mellom forebygging og tilpasning. Forebygging er arbeidet som gjøres i årene før:
        kartlegge, ikke bygge i utløpet, sikre erosjon. Tilpasning er å håndtere faren som allerede
        er der: varsel, beredskap og evakuering.
      </p>

      <Callout title="Vanlige misforståelser">
        <p>
          Et blankt faresonekart betyr ikke trygt. NVE har kartlagt der store skred kan gå, ikke all
          kvikkleire. Aktsomhet gjelder overalt under marin grense.
        </p>
        <p>
          Kvikkleireskred krever ikke bratt terreng. De går i skråninger slakere enn 5°, i landskap
          som ser flatt ut. Storegga gikk på 0,3°.
        </p>
        <p>
          Overvåking er ikke sikring. Den fanger bevegelsen og gir tid til å evakuere. Den stopper
          ikke fjellet.
        </p>
        <p>
          Fare og risiko er ikke samme sak. Et ustabilt fjell uten folk nedenfor er høy fare og lav
          risiko.
        </p>
        <p>Snøskred hører ikke hjemme her. Det er kryosfære, og det tas i geofag 2.</p>
      </Callout>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="skjærstyrke"
          def="De holdende kreftene: friksjon pluss kohesjon. Skred skjer når de drivende kreftene blir større."
        />
        <Term
          name="poretrykk"
          def="Trykket i vannet mellom kornene. Stiger det, faller friksjonen, og skråningen svekkes."
        />
        <Term
          name="predisposisjon og utløser"
          def="Predisposisjon: bratthet, sprekker, kvikkleire. Utløser: nedbør, snøsmelting, graving, erosjon."
        />
        <Term
          name="utløpsområde"
          def="Der massen legger seg. Faren sitter i skråningen, skaden skjer i utløpet."
        />
        <Term
          name="kvikkleire"
          def="Marin leire der saltet er vasket ut, under om lag 2 g/L. Fast uforstyrret, flytende omrørt."
        />
        <Term
          name="marin grense"
          def="Høyeste havnivå etter istiden, i Norge 0–220 m. Kvikkleire finnes bare under den."
        />
        <Term
          name="retrogressivt skred"
          def="Et skred som spiser seg bakover fordi hver utglidning fjerner støtten til kanten bak."
        />
        <Term
          name="fare og risiko"
          def="Fare: sannsynlighet for skred. Risiko: fare ganger konsekvens — hva som står i utløpet."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor utløser kraftig nedbør løsmasseskred?",
            options: [
              "Fordi regnet gjør massen så mye tyngre at tyngdekraften vinner.",
              "Fordi vann i porene hever poretrykket, presser kornene fra hverandre og senker friksjonen. De holdende kreftene svekkes.",
              "Fordi vann smører skråningen på overflaten.",
              "Fordi nedbør gjør terrenget brattere.",
            ],
            answer: 1,
            explain:
              "Massen er omtrent like tung som før. Det som endrer seg, er skjærstyrken: høyt poretrykk gjør at kornene ikke klemmes sammen, og friksjonen faller.",
          },
          {
            prompt: "Hva er forskjellen på predisposisjon og utløser?",
            options: [
              "De betyr det samme.",
              "Predisposisjon er været. Utløseren er geologien.",
              "Predisposisjon er det som ligger der fra før og forklarer hvor skredet går. Utløseren tipper det over og forklarer når.",
              "Predisposisjon gjelder bare kvikkleire.",
            ],
            answer: 2,
            explain:
              "Bratthet, sprekker og kvikkleire er predisposisjon. Ekstremnedbør, snøsmelting, graving og erosjon er utløsere.",
          },
          {
            prompt: "Hvorfor kan kvikkleireskred gå i terreng som ser flatt ut?",
            options: [
              "Fordi kvikkleire bare finnes i fjellsider.",
              "Fordi den omrørte leira flyter som en væske, og da trengs det ikke bratt terreng. Skred går i skråninger slakere enn 5°.",
              "Fordi marin grense ligger over 220 m.",
              "Fordi poretrykket alltid er null i leire.",
            ],
            answer: 1,
            explain:
              "Når strukturen kollapser, blir leira flytende. Storegga utviklet seg på en helling ned mot 0,3°, altså praktisk talt flatt.",
          },
          {
            prompt: "Hvorfor spiser et kvikkleireskred seg bakover?",
            options: [
              "Fordi vinden drar massen oppover skråningen.",
              "Fordi den første massen renner ut, og kanten bak mister støtten sin og svikter i sin tur. Det kalles retrogressivt.",
              "Fordi leira fryser og utvider seg bakover.",
              "Fordi bekken graver oppover.",
            ],
            answer: 1,
            explain:
              "Hver ny utglidning fjerner motholdet til kanten bak. Slik kan gropa vokse innover i flatt terreng, som i Rissa og Gjerdrum.",
          },
          {
            prompt:
              "Gjerdrum var mindre enn Rissa i volum, men langt dødeligere. Hva er forklaringen?",
            options: [
              "Leira i Gjerdrum var av en annen type.",
              "Rissa var ikke et kvikkleireskred.",
              "Boligfeltet i Gjerdrum lå i utløpsområdet. Fare ganger konsekvens gir risiko.",
              "Gjerdrum gikk om vinteren, og det gjør alle skred farligere.",
            ],
            answer: 2,
            explain:
              "Rissa tok 5–6 millioner m³, Gjerdrum om lag 1,35 millioner m³. Forskjellen i konsekvens var hva som sto i utløpet.",
          },
          {
            prompt: "Hva betyr et blankt faresonekart under marin grense?",
            options: [
              "At området er friskmeldt.",
              "At blankt kart ikke er trygt. NVE har kartlagt der store skred kan gå, ikke all kvikkleire. Aktsomhet gjelder overalt under marin grense.",
              "At NVE har kartlagt all kvikkleire i området.",
              "At det ikke kan gå skred der.",
            ],
            answer: 1,
            explain:
              "Aktsomhetskart er grov oversikt, faresonekart er detaljert utredning av avgrensede områder. Bygging i aktsomhetsområde krever grunnundersøkelse.",
          },
        ]}
      />
    </TopicLayout>
  );
}
