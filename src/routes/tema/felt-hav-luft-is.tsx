import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  FieldworkInquiryChainDiagram,
  RadiosondeAscentDiagram,
  MeteorologicalStationDiagram,
} from "@/components/diagrams";
import { SnowProfileModel } from "@/components/models/snow-profile-model";
import { CtdProfileModel } from "@/components/models/ctd-profile-model";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/felt-hav-luft-is")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/tema/felt-hav-luft-is")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/felt-hav-luft-is",
    }),
  component: FeltG2Page,
});

function FeltG2Page() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Metode"
      title="Feltarbeid i hav, luft og is"
      lead="Geofaglig feltarbeid er vitenskapelig metode i praksis. I Geofag 2 forlater vi den faste berggrunnen og undersøker jordas dynamiske fluider: atmosfæren, havet og kryosfæren. Fra CTD-sonder som kartlegger fjordens usynlige sprangsjikt, til radiosonder som sonderer troposfæren, meteorologiske bakkestasjoner og snøprofiler i skredterreng: Dette er instrumentene, metodene og sikkerhetskravene som gjør observasjoner til etterprøvbar vitenskap."
      banner="/images/gf1-bergarter.jpg"
      bannerAlt="Lagdelt sedimentær klippe og isskurt fjordlandskap"
      prev={{ to: "/tema/energi-hav-luft", label: "Forrige: Energi fra hav og luft" }}
      next={{ to: "/eksamen", label: "Neste: Eksamen" }}
      kilder={KILDER_G2.feltG2}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 2)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            gjennomføre geofaglig feltarbeid knyttet til havet, atmosfæren eller kryosfæren,
            bearbeide og tolke de innsamlede dataene og presentere resultatene
          </em>{" "}
          (Utdanningsdirektoratet, 2020).
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer og faglige metoder som dekkes:</strong></p>
          <p>• <em>Den vitenskapelige undersøkelseskjeden:</em> Problemstilling, hypotese, forskningsdesign, metadata, tolkning og usikkerhetsdrøfting.</p>
          <p>• <em>Atmosfæriske målinger:</em> Automatiske meteorologiske stasjoner (AWS, WMO-standarder: 10 m vind, 2 m ventilert lamellskjerm, Nipher-skjerm) og radiosonder (aerologiske diagrammer, Skew-T, inversjoner, tropopause).</p>
          <p>• <em>Oseanografiske målinger:</em> CTD-sonder (ledningsevne, temperatur, trykk/dyp), CTD-rosett med Niskin-flasker, sprangsjikt (haloklin, termoklin, pyknoklin) og brakkvannslinser i fjorder.</p>
          <p>• <em>Kryosfæriske målinger:</em> Snøgrop, temperaturgradient (dT/dz), likevekts- vs. kinetisk metamorfose (begerkrystaller/dybderim), håndhardhet og Extended Column Test (ECTP vs. ECTN).</p>
          <p>• <em>Felt-HMS og etikk:</em> Farevurdering (Varsom.no, skredfaregrader 1–5), risikomatrise, og hvorfor avlysningskompetanse er faglig styrke.</p>
        </div>
      </Callout>

      {/* ── 1. DEN VITENSKAPELIGE UNDERSØKELSESKJEDEN ───────────────────── */}
      <CollapsibleSection
        title="1. Den geofaglige undersøkelseskjeden: Fra hypotese til usikkerhet"
        subtitle="De fem ufravikelige trinnene fra problemstilling til etterprøvbar rapport"
        badge="Vitenskapelig metode"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          Et feltarbeid i geofag er ikke en hyggelig utflukt der man samler tilfeldige inntrykk; det er
          en <strong>streng vitenskapelig datainnsamlingsprosess</strong>. Målet er å besvare et
          forhåndsdefinert faglig spørsmål ved hjelp av kvantitative målinger som kan etterprøves av
          andre forskere.
        </p>
        <p>
          I Geofag 1 undersøkte du landformer og bergarter som ligger i ro i millioner av år. I Geofag 2
          er studieobjektene <strong>atmosfæren, havet og snødekket</strong>: Fluider og dynamiske lag som
          endrer seg fra minutt til minutt. Her er været både det du skal måle — og den største risikoen
          som kan velte hele feltdagen!
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          De fem leddene i undersøkelseskjeden
        </h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>1. Problemstilling og testbar hypotese:</strong> Før du pakker sekken, må du ha en
            tydelig hypotese som kan bekreftes eller avkreftes. En setning som <em>«vi skal måle været»</em>{" "}
            er verdiløs. En holdbar hypotese er: <em>«På en solrik sommerdag vil sjøbrisen utløse et
            temperaturfall på minst 2 °C ved kaia mellom kl. 12 og 15, mens en stasjon 3 km inn i landet
            ikke vil merke dette før tidligst kl. 17.»</em>
          </li>
          <li>
            <strong>2. Forskningsdesign og HMS:</strong> Hvilke parametere må måles for å teste
            hypotesen? Hvilke instrumenter trengs? Hvor tette må målingene være i tid og rom? Og hva er
            risikoen (glatte svaberg, hypotermi, skredterreng)?
          </li>
          <li>
            <strong>3. Datainnsamling og metadata:</strong> Gjennomføring i felt. Hver eneste måling
            skrives inn i en strukturert feltlogg sammen med <strong>metadata</strong> (nøyaktig tidspunkt
            i UTC, GPS-koordinater, instrumenttype, kalibreringsstatus og observatør). Uten metadata er
            et tall bare støy.
          </li>
          <li>
            <strong>4. Bearbeiding og visualisering:</strong> Rådata overføres til tabeller, regneark
            eller kode (f.eks. Python/R). Dataene plottes som tidsrekker, vertikalprofiler eller kartlag
            for å synliggjøre mønstre.
          </li>
          <li>
            <strong>5. Tolkning og usikkerhetsdrøfting:</strong> Samsvarer kurvene med hypotesen din?
            Hva er måleinstrumentenes usikkerhet (f.eks. termometer ±0,2 °C)? Var det feilkilder
            (f.eks. at termometeret sto i direkte sollys)? Hva kan dataene bære av bastante konklusjoner?
          </li>
        </ol>

        <FieldworkInquiryChainDiagram />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <OrdBoks
            ord="Hypotese"
            barn="En presis, testbar faglig påstand som kan bekreftes eller forkastes gjennom målinger. Uten en hypotese har feltarbeidet ingen styring."
          />
          <OrdBoks
            ord="Metadata"
            barn="Data om dataene: Nøyaktig posisjon (GPS), tid (UTC), instrumentmodell, sensorusikkerhet og hvem som målte. Gjør målingen etterprøvbar."
          />
          <OrdBoks
            ord="Måleusikkerhet"
            barn="Den iboende unøyaktigheten i ethvert instrument. Dersom termometeret har en feilmargin på ±0,5 °C, kan man ikke påstå en signifikant gradient på 0,3 °C."
          />
        </div>
      </CollapsibleSection>

      {/* ── 2. MÅLINGER I ATMOSFÆREN ───────────────────────────────────── */}
      <CollapsibleSection
        title="2. Målinger i atmosfæren: Meteorologiske bakkestasjoner og radiosonder"
        subtitle="WMO-standarder for sensorplassering, automatstasjoner (AWS) og værballonger"
        badge="Atmosfære"
        badgeVariant="sky"
      >
        <p>
          For at meteorologiske data skal kunne mates inn i globale{" "}
          <Link to="/tema/numeriske-modeller" className={lenke}>
            numeriske værvarslingsmodeller
          </Link>{" "}
          og brukes til klimaforskning, har Verdens meteorologiorganisasjon (WMO) fastsatt strenge,
          internasjonale standarder for hvordan målinger skal gjennomføres.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Den automatiske meteorologiske stasjonen (AWS)
        </h3>
        <p>
          En profesjonell bakkestasjon måler været under strengt kontrollerte betingelser:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Vindmåling i 10 meters standardhøyde:</strong> Vinden bremses kraftig ned av
            friksjon mot bakken, trær og bygninger (det atmosfæriske grensesjiktet). For å måle den sanne,
            synoptiske vinden monteres ultralyd- eller koppanemometre og vindfløyer i toppen av en{" "}
            <strong>10 meter høy mast</strong> plassert i åpent lende.
          </li>
          <li>
            <strong>Temperatur og fuktighet i 2 meters høyde:</strong> Termistorer (f.eks. PT100
            platinamotstandstermometer med nøyaktighet ±0,1 °C) og kapasitive hygrometre måles nøyaktig{" "}
            <strong>2,0 meter over bakken</strong>.
          </li>
          <li>
            <strong>Hvorfor er lamellskjermen (Stevenson-skjermen) hvit og ventilert?</strong> Dersom et
            termometer utsettes for direkte sollys, absorberer det stråling og viser 10–20 °C for mye!
            Sensorene plasseres derfor inne i en hvitmalt kasse med skråstilte tre- eller plastlameller.
            Hvitfargen reflekterer solstrålene (høy albedo), mens lamellene slipper luften fritt gjennom
            uten at regn eller sol slipper inn.
          </li>
          <li>
            <strong>Nedbørsmåler med Nipher-vindskjerm:</strong> Når det blåser kuling, danner målebøtta
            en oppadgående luftstrøm som feier lette snøkorn og fine regndråper rett over åpningen. En
            traktformet <strong>Nipher-vindskjerm</strong> bryter turbulensen og sikrer at nedbøren fanges
            i den kalibrerte veiecellen.
          </li>
        </ul>

        <MeteorologicalStationDiagram />

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Radiosonder: Å lodde atmosfærens tredje dimensjon
        </h3>
        <p>
          Bakkestasjoner dekker bare en tynn hinne ved jordoverflaten. Men været skapes i hele troposfærens
          10–12 kilometers dybde. For å kartlegge den vertikale strukturen slipper meteorologiske
          institutter over hele verden <strong>radiosonder</strong> to ganger i døgnet (nøyaktig kl. 00:00
          og 12:00 UTC).
        </p>
        <p>
          En radiosonde består av en 200–500 grams latexballong fylt med helium eller hydrogen, en liten
          fallskjerm og en instrumentkapsel på størrelse med en matboks:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>Ballongen stiger med en jevn fart på <strong>ca. 5 meter per sekund</strong> (300 m/min).</li>
          <li>
            Sensorene måler kontinuerlig <strong>temperatur</strong> (fin trådtermistor),{" "}
            <strong>lufttrykk</strong> (silisiumsensor) og <strong>relativ fuktighet</strong>.
          </li>
          <li>
            En integrert GPS-mottaker sporer sondens nøyaktige 3D-posisjon hvert sekund. Ved å beregne
            hvor raskt sonden driver horisontalt med vinden, får man eksakt{" "}
            <strong>vindstyrke og vindretning</strong> i alle høydelag!
          </li>
          <li>
            Dataene overføres i sanntid via en 403 MHz radiosender ned til bakkestasjonen.
          </li>
          <li>
            I 30 000–35 000 meters høyde (i stratosfæren) er det omgivende lufttrykket så lavt at
            ballongen har ekspandert til størrelsen på et hus. Den sprekker, og instrumentet daler ned i
            fallskjerm.
          </li>
        </ol>

        <RadiosondeAscentDiagram />

        <OrdBoks
          ord="Radiosonde"
          barn="En værballongbåren instrumentpakke som måler temperatur, fuktighet, trykk og GPS-vindavdrift fra bakken opp til 35 km høyde. Dataene plottes i aerologiske diagrammer for å analysere inversjoner, skyer og stabilitet."
        />
      </CollapsibleSection>

      {/* ── 3. MÅLINGER I HAVET ────────────────────────────────────────── */}
      <CollapsibleSection
        title="3. Målinger i havet: CTD-sonder, vannprøvetakere og vertikal lagdeling"
        subtitle="Conductivity, Temperature, Depth: Slik avsløres fjordens hemmelige vannmasser"
        badge="Oseanografi"
        badgeVariant="primary"
      >
        <p>
          Havet ser ensartet blått ut fra overflaten, men under vannspeilet er vannsøylen lagdelt i
          forskjellige vannmasser med ulik tetthet, salinitet og temperatur. I norske fjorder møter
          ferskvann fra elver og snøsmelting det tunge, salte atlantiske vannet som strømmer inn over
          fjordskiftet.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          CTD-sonden: Oseanografens arbeidshest
        </h3>
        <p>
          Akronymet <strong>CTD</strong> står for de tre fundamentale egenskapene instrumentet måler:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>C - Conductivity (Elektrisk ledningsevne):</strong> Rent vann leder nesten ikke
            strøm. Men sjøvann er en elektrolytt full av oppløste ioner (klorid, natrium, sulfat,
            magnesium). Ved å måle hvor lett vekselstrøm ledes gjennom en induktiv spole eller en
            platinaelektrode, beregnes vannets nøyaktige <strong>saltholdighet (salinitet)</strong> i
            promille (‰) eller PSU (Practical Salinity Units).
          </li>
          <li>
            <strong>T - Temperature (Temperatur):</strong> Måles med en ultrahurtig, ekstremt nøyaktig
            termistor som reagerer på tusendels grader (±0,001 °C) i løpet av brøkdeler av et sekund mens
            sonden fires nedover.
          </li>
          <li>
            <strong>D - Depth (Dybde via hydrostatisk trykk):</strong> Dybden måles aldri med et tau,
            men med en piezoresistiv krystalltrykksensor. Siden trykket i vann øker med nøyaktig 1 desibar
            (dbar) for hver meter vannsøyle (<em>P = ρ · g · z</em>), gir trykkmålingen sondens nøyaktige
            posisjon.
          </li>
        </ul>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          CTD-rosett og Niskin-flasker
        </h3>
        <p>
          I profesjonell forskning monteres CTD-sonden i bunnen av en sirkulær stålramme kalt en{" "}
          <strong>CTD-rosett</strong>. Rundt sonden henger 12–24 grå sylindere kalt{" "}
          <strong>Niskin-flasker</strong>.
        </p>
        <p>
          Når sonden fires ned til 200 eller 2000 meters dyp, strømmer vannet fritt gjennom de åpne
          flaskene. På vei opp igjen kan forskeren sitte i laboratoriet på forskningsskipet, studere
          sanntidsgrafene på skjermen, og sende et elektronisk signal som smekker igjen ventilene på en
          bestemt Niskin-flaske. Slik henter man opp uforstyrrede vannprøver fra nøyaktig ønsket dyp for
          kjemiske analyser av oppløst oksygen (O₂), næringssalter (nitrat, fosfat), mikroplast eller
          miljøgifter.
        </p>

        {/* Interaktiv CTD-modell */}
        <div className="my-6">
          <CtdProfileModel />
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Sprangsjiktene: Termoklin, haloklin og pyknoklin
        </h3>
        <p>
          Når du analyserer en CTD-profil fra en norsk fjord om sommeren, vil du oppdage tre parallelle
          sprangsjikt:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3 space-y-1">
            <span className="font-semibold text-sky-300 text-sm">Haloklin</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sjiktet der saltholdigheten øker bratt med dybden (fra ferskvannslinsens 15–20 ‰ i
              overflaten til 34–35 ‰ i dypet).
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 space-y-1">
            <span className="font-semibold text-amber-300 text-sm">Termoklin</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sjiktet der temperaturen faller markant (fra 15–18 °C i sommeroverflaten ned til 6–8 °C i
              mellomlaget).
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 space-y-1">
            <span className="font-semibold text-primary text-sm">Pyknoklin</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Det resulterende <strong>tetthetsspranglaget</strong>. Fordi salt vann er tyngre enn ferskt,
              og kaldt vann er tyngre enn varmt, danner pyknoklinen en knivskarp fysisk barriere som
              hindrer blanding!
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 4. MÅLINGER I KRYOSFÆREN ───────────────────────────────────── */}
      <CollapsibleSection
        title="4. Målinger i kryosfæren: Snøgrop, metamorfose og stabilitetstester"
        subtitle="Slik graver du en profesjonell snøprofil og tester bruddforplantning i felt"
        badge="Kryosfære"
        badgeVariant="warning"
      >
        <p>
          I kryosfærisk feltarbeid holder det ikke å måle snødybden med en tommestokk. For å forstå
          skredfare, vannressurser i snømagasinene og snøens varmeisolerende effekt på permafrost, må vi
          undersøke <strong>snøpakkens indre anatomi</strong>.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Metodikk for graving av snøgrop (Snow Pit)
        </h3>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Lokalisering:</strong> Velg et flatt eller moderat hellende område (25–30°) som er
            representativt for snødekket i regionen. Unngå konveksiteter, rygger med vindavblåsing eller
            spor etter skiløpere. Grav <em>aldri</em> i eller rett under et skredfarlig heng!
          </li>
          <li>
            <strong>Graving:</strong> Grav en grop på minst 1,5 × 1,5 meter helt ned til fast bakke
            eller dyp gammel skare.
          </li>
          <li>
            <strong>Prepping av observasjonsveggen:</strong> Den vertikale veggen som skal undersøkes, må
            skjæres snorrett med en snøspade og børstes forsiktig med en snøbørste eller baksiden av en
            vott. Dette fremhever de ulike lagene fordi myke lag børstes bort raskere enn harde skarelag.
            Veggen må ligge i skyggen slik at ikke direkte sollys smelter krystallene!
          </li>
        </ol>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Temperaturprofil og de to metamorfoseformene
        </h3>
        <p>
          Stikk kalibrerte termometre horisontalt inn i snøveggen for hver 10. centimeter fra overflaten
          ned til bunnen. Bunntemperaturen ved bakken er nesten alltid <strong>nøyaktig 0 °C</strong>{" "}
          fordi jordvarmen fra jordskorpen kontinuerlig varmer snødekket nedenfra, mens snøen fungerer
          som en isolerende dundyne.
        </p>
        <p>
          Beregn deretter <strong>temperaturgradienten</strong> i snøpakken (<em>ΔT / Δz</em> i °C per meter):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <h4 className="font-semibold text-emerald-300 text-sm">
              Likevektsmetamorfose (Svak gradient, &lt; 10 °C/m)
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Når snøen er dyp eller overflatetemperaturen er mild, er temperaturgradienten slak.
              Vanndamptransporten er langsom. Snøkrystallenes spisser fordamper, og vannet kondenserer i
              hulrommene. Krystallene blir <strong>små og avrundede</strong>, og det dannes sterke
              isbroer (sintring). Snøpakken styrkes og stabiliseres over tid!
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <h4 className="font-semibold text-amber-300 text-sm">
              Kinetisk metamorfose (Bratt gradient, ≥ 10 °C/m)
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ved tynn snøpakke og sterk sprengkulde i luften oppstår en brutal temperaturforskjell.
              Varm vanndamp stiger oppover fra den 0-gradige bunnen med voldsom kraft. Krystallene vokser
              eksplosivt til <strong>store, kantete fasetter og hule begerkrystaller (dybderim)</strong>.
              Disse kornene har nesten ingen mekaniske bindinger og fungerer som kulerunder. Dette skaper
              et <strong>permanent svakt lag</strong> som kan utløse dødelige flakskred!
            </p>
          </div>
        </div>

        {/* Interaktiv Snøprofilmodell */}
        <div className="my-6">
          <SnowProfileModel />
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Håndhardhet og Extended Column Test (ECT)
        </h3>
        <p>
          For å bestemme hardheten til hvert enkelt lag presses ulike gjenstander inn i snøveggen med en
          kraft på ca. 5 kg (<strong>håndhardhetsskalaen</strong>):
        </p>
        <ul className="list-disc space-y-1 pl-5 text-xs sm:text-sm text-foreground/90">
          <li><strong>F (Fist / Knyttneve):</strong> Veldig myk nysnø eller løs begersnø.</li>
          <li><strong>4F (Four fingers / Fire fingre):</strong> Myk snø.</li>
          <li><strong>1F (One finger / Én finger):</strong> Moderat fast snø (typisk vindflak).</li>
          <li><strong>P (Pencil / Blyant):</strong> Hard, tettpakket snø eller vindskare.</li>
          <li><strong>K (Knife / Knivblad):</strong> Svært hard isskare eller gjenfrosset såle.</li>
        </ul>

        <p className="mt-3">
          <strong>Extended Column Test (ECT):</strong> Er den internasjonale gullstandarden for å teste
          skredfare i felt. En snøblokk på nøyaktig <strong>90 cm bredde og 30 cm dybde</strong> skjæres fri
          fra snødekket med en snøsag. En spade legges oppå den ene enden (30 × 30 cm), og observatøren
          slår 30 ganger med gradvis økende kraft:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-xs sm:text-sm text-foreground/90">
          <li>Slag 1–10: Lette slag fra håndleddet.</li>
          <li>Slag 11–20: Moderate slag fra albuen.</li>
          <li>Slag 21–30: Kraftige slag fra skulderen.</li>
        </ul>
        <div className="my-3 rounded-lg border border-border bg-card p-3 text-xs leading-relaxed">
          <p className="font-semibold text-rose-400">
            ECTP (Propagation): Bruddet forplanter seg tvers over hele den 90 cm brede blokka!
          </p>
          <p className="text-muted-foreground mt-0.5">
            Dette beviser at snødekket ikke bare kan sprekke under skien, men at sprekken vil spre seg
            lynraskt gjennom det svake laget over hele fjellsiden og utløse et flakskred. Dette er et
            ubetinget faresignal!
          </p>
        </div>

      </CollapsibleSection>

      {/* ── 5. FORSKNINGSDESIGN, TRANSEKT, METADATA OG HMS ──────────────── */}
      <CollapsibleSection
        title="5. Forskningsdesign, transekt, metadata og felt-HMS"
        subtitle="Hvorfor én måling aldri er nok, og hvorfor en velbegrunnet avlysning gir toppkarakter"
        badge="Feltmetodikk & HMS"
        badgeVariant="amber"
      >
        <p>
          En av de vanligste feilene elever gjør i feltarbeid, er å samle noen tilfeldige enkeltverdier
          (for eksempel én temperaturmåling på kaien kl. 12:00) og tro at dette beviser et værsystem.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Transektmetoden: Fange gradienter i rom og tid
        </h3>
        <p>
          I geofag må målinger alltid designes for å fange <strong>kontraster i rom og tid</strong>:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Transekt:</strong> En rett linje av målepunkter lagt på tvers av et forventet
            gradientfelt. For å påvise sjøbris må du opprette en transekt fra havkanten og 5–10 km innover
            i landet. For å påvise en ferskvannslinse i en fjord må du legge en transekt fra elvemunningen
            og utover mot åpent hav.
          </li>
          <li>
            <strong>Tidssynkronisering:</strong> Målinger må gjøres med faste tidsintervaller (f.eks. hver
            time gjennom et døgn). Uten tidsangivelse blander du sammen soloppvarming og storskala
            frontpasseringer.
          </li>
        </ul>

        <OrdBoks
          ord="Transekt"
          barn="En systematisk linje av målepunkter lagt gjennom et landskap eller en vannmasse for å kartlegge hvordan fysiske parametere (temperatur, salinitet, snødybde) endrer seg romlig langs en gradient."
        />

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Felt-HMS og avlysningskompetanse: Sikkerhet trumfer data
        </h3>
        <p>
          I Geofag 2 arbeider vi ved kaldt vann, på svaberg, ved bratte klipper og i snødekt vinterfjell.
          Risikovurderingen må gjøres skriftlig før feltarbeidet starter:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
          <div className="rounded-xl border border-border bg-card/60 p-3 space-y-1">
            <span className="font-semibold text-foreground">Sjø &amp; Kyst</span>
            <p className="text-muted-foreground">
              Redningsvest er påbudt ved kai, svaberg og båt. Bølgeslag og glatte tangsoner er den
              hyppigste ulykkesårsaken. Sjekk alltid tidevannstabell!
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3 space-y-1">
            <span className="font-semibold text-foreground">Fjell &amp; Vinter</span>
            <p className="text-muted-foreground">
              Sende/mottaker (skredsøker), søkestang og spade er personlig verneutstyr for samtlige
              deltakere. Vindtett tøy, fjellduk og førstehjelpsutstyr.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3 space-y-1">
            <span className="font-semibold text-foreground">Varsom &amp; Yr</span>
            <p className="text-muted-foreground">
              Konsulter alltid <strong>Varsom.no</strong> og <strong>Yr.no</strong> dagen før og morgenen
              før avreise. Dokumenter varslet i feltrapporten!
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 my-4">
          <h4 className="font-semibold text-amber-300 text-sm">
            Avlysningskompetanse som toppkarakter!
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Mange elever tror at dersom en felttur blir avlyst på grunn av faregrad 3 (betydelig skredfare)
            eller stormvarsel, så har prosjektet mislykkes. <strong>Dette er helt feil!</strong>
          </p>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            En feltrapport som dokumenterer at gruppen sjekket Varsom.no, vurderte snødekkeoppbyggingen og
            værvarselet, konkluderte med at risikoen var uakseptabel, og la om til en alternativ trygg
            lokalitet eller avlyste turen med faglig begrunnelse, demonstrerer <strong>fremragende
            geofaglig modenhet og profesjonell HMS-kompetanse</strong>. En gruppe som trosser faregrad 3 og
            går inn i skredterreng for å «få data», stryker på sikkerhetskompetansen!
          </p>
        </div>
      </CollapsibleSection>

      {/* ── SAMMENFATNING & BEGREPER ─────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight pt-4">
        Viktige fagbegreper
      </h2>
      <TermGrid>
        <Term
          name="CTD-sonde"
          def="Oseanografisk instrument som måler Conductivity (salinitet), Temperature og Depth (trykk) kontinuerlig nedover i vannsøylen."
        />
        <Term
          name="Radiosonde"
          def="Værballong med sensorer for temperatur, trykk, fuktighet og GPS-vind som sonderer atmosfæren opp til 35 km."
        />
        <Term
          name="Lamellskjerm"
          def="Hvit, ventilert kasse (Stevenson-skjerm) som skjermer termometre 2 m over bakken mot direkte solstråling."
        />
        <Term
          name="Temperaturgradient (dT/dz)"
          def="Temperaturforskjell per høydemeter. I snødekket utløser gradienter ≥ 10 °C/m farlig kinetisk metamorfose (begerkrystaller)."
        />
        <Term
          name="Extended Column Test (ECT)"
          def="Stabilitetstest i snøgrop der en 90 cm bred blokk sages fri og belastes for å teste bruddforplantning (ECTP)."
        />
        <Term
          name="Transekt & Metadata"
          def="Systematisk målerekkefølge i rom og tid sammen med tidspunkt, koordinater og usikkerhet som gjør data etterprøvbare."
        />
      </TermGrid>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <Callout title="Til eksamen">
          <p>
            På eksamen i Geofag 2: Hvis du blir bedt om å designe et feltarbeid, må du alltid inkludere{" "}
            <strong>en testbar hypotese</strong>, <strong>et transekt-design</strong> som fanger
            romlige kontraster, <strong>metadata</strong> og <strong>en eksplisitt vurdering av
            måleusikkerhet</strong>.
          </p>
          <p className="mt-1">
            Husk også å referere til WMO-standarder (f.eks. 10 m vindhøyde, 2 m temperaturhøyde i
            strålingsskjerm) og HMS-vurderinger fra Varsom.no.
          </p>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            • Enkeltmålinger uten klokkeslett eller GPS-posisjon er <strong>ikke</strong> vitenskapelige
            data.
          </p>
          <p className="mt-1">
            • CTD måler <strong>ikke</strong> saltet direkte som en kjemisk analyse; den måler
            elektrisk ledningsevne og regner om til PSU/‰.
          </p>
          <p className="mt-1">
            • Å avlyse en felttur på grunn av skredfaregrad 3 er <strong>ikke</strong> et nederlag, men
            et bevis på faglig kompetanse.
          </p>
        </Callout>
      </div>

      {/* ── EKSAMENSQUIZ (LK20) ────────────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight pt-2">
        Test deg selv: Feltarbeid i hav, luft og is
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Disse spørsmålene tester din forståelse av feltmetodikk, instrumentering, oseanografiske og
        kryosfæriske prosesser samt felt-HMS i Geofag 2.
      </p>

      <Quiz
        heading={null}
        questions={[
          {
            prompt:
              "Hvorfor må lufttemperatur på en meteorologisk bakkestasjon alltid måles i en hvit, dobbeltsjalusiert lamellskjerm nøyaktig 2 meter over bakken?",
            options: [
              "Fordi WMO krever at termometeret skal være synlig for satellitter i bane.",
              "For å skjerme sensoren mot direkte og reflektert solstråling som ellers ville varmet termometeret til langt over lufttemperaturen, samtidig som lamellene sikrer naturlig luftsirkulasjon og 2 meters høyde unngår ekstrem mikroklimatisk bakkepåvirkning.",
              "Fordi termometre slutter å fungere dersom de utsettes for regndråper.",
              "Fordi 2 meter er den gjennomsnittlige høyden på en voksen meteorolog.",
            ],
            answer: 1,
            explain:
              "Dersom et termometer står i solen, absorberer det stråling og viser sin egen oppvarmede temperatur, ikke luftens temperatur. Hvitfargen reflekterer sollys, lamellene ventilerer luften, og 2 meters høyde er standardisert for å unngå bakkens ekstreme strålingstap og oppvarming.",
          },
          {
            prompt:
              "Hva er den fundamentale fysiske sammenhengen som gjør at en CTD-sonde kan bestemme både salinitet og nøyaktig dyp i en fjord?",
            options: [
              "Salinitet bestemmes ved å veie vannet, og dypet måles med ekkolodd mot bunnen.",
              "Salinitet beregnes fra vannets elektriske ledningsevne (oppløste salt-ioner leder strøm), og dypet beregnes fra det hydrostatiske trykket som øker med ca. 1 dbar per meter vannsøyle (P = ρ·g·z).",
              "Sonden lyser med laser gjennom vannet og måler lysbrytningen for både dyp og salt.",
              "Sonden suger opp vann og koker det i et internt kammer for å måle saltkrystaller.",
            ],
            answer: 1,
            explain:
              "Conductivity (elektrisk ledningsevne) er direkte proporsjonal med konsentrasjonen av frie ioner (Na⁺, Cl⁻ osv.) ved gitt temperatur. Depth (dyp) bestemmes via en piezoresistiv trykksensor som måler hydrostatisk trykk (1 dbar ≈ 1 meter).",
          },
          {
            prompt:
              "I en 1,2 meter dyp snøprofil måles overflatetemperaturen til -18 °C, mens bunnen ved bakken holder 0 °C. Hvilken omdanningsprosess (metamorfose) vil dominere i snødekket, og hvilken skredfare medfører dette?",
            options: [
              "Likevektsmetamorfose (avrunding): Snøen stabiliseres raskt fordi temperaturgradienten er under 5 °C/m.",
              "Smelte-fryse-metamorfose: Det dannes massive skarelag som umuliggjør skred.",
              "Kinetisk metamorfose (fasettering og begersnø): Den bratte temperaturgradienten (15 °C/m, som er over terskelen på 10 °C/m) driver kraftig vanndampfluks oppover og bygger løse begerkrystaller (dybderim) som danner vedvarende svake lag for flakskred.",
              "Snøen sublimerer fullstendig bort og etterlater fjellet bart.",
            ],
            answer: 2,
            explain:
              "Gradienten er ΔT / Δz = 18 °C / 1,2 m = 15,0 °C/m. Når gradienten overskrider 10 °C/m, oppstår kinetisk metamorfose. Vanndamp subsidierer raskt oppover og bygger fasetterte kantkorn og hule begerkrystaller (dybderim) med nesten null bindestyrke.",
          },
          {
            prompt:
              "Du gjennomfører en Extended Column Test (ECT) i felt. På slag 12 (moderat slag fra albuen) sprekker det svake laget, og bruddet forplanter seg momentant tvers over hele den 90 cm brede blokka (ECTP12). Hva forteller dette resultatet?",
            options: [
              "Snødekket er trygt og stabilt, fordi det krevde hele 12 slag å få en sprekk.",
              "Det foreligger akutt fare for flakskred: 'P' står for Propagation (bruddforplantning), noe som betyr at en bruddinitiering fra en skiløper vil forplante seg over store avstander i henget.",
              "Testen er ugyldig og må gjøres på nytt i over 45 graders helning.",
              "Søylen inneholder for mye fuktighet og må tørkes i solen.",
            ],
            answer: 1,
            explain:
              "ECTP (Extended Column Test Propagation) betyr at et initiert brudd forplanter seg gjennom hele søylen på samme eller påfølgende slag. Dette er det sikreste tegnet på at snødekket har egenskapen til å spre brudd og utløse flakskred.",
          },
          {
            prompt:
              "Hvorfor er en enkeltmåling av vanntemperatur og salinitet ved en brygge i en fjord nesten verdiløs dersom målingen mangler dyp og klokkeslett?",
            options: [
              "Fordi saltholdighet i norske fjorder aldri varierer over tid.",
              "Fordi en fjord har vertikale sprangsjikt (haloklin/pyknoklin) og en tynn brakkvannslinse i overflaten som forskyver seg med tidevann og elveføring; uten dyp og tid vet man ikke hvilken vannmasse eller fase man har målt.",
              "Fordi CTD-sonder bare er gyldige dersom målingen tas fra en båt eid av Havforskningsinstituttet.",
              "Fordi salt fordamper fra vannprøven på under fem minutter.",
            ],
            answer: 1,
            explain:
              "Fjorder er ekstremt dynamiske: Ferskvannslinsen kan være 2 meter dyp ved fjære sjø og presses bort ved flod. Uten eksakt dyp (desibar) og klokkeslett (UTC) har man bare et tilfeldig tall som ikke kan sammenlignes eller tolkes vitenskapelig.",
          },
          {
            prompt:
              "Skoleklassen din har planlagt snøprofilering i fjellet, men morgenens oppdatering på Varsom.no viser faregrad 3 (betydelig skredfare) med nysnøflak på vedvarende svake lag. Hva er den faglig korrekte geofaglige handlingen?",
            options: [
              "Gjennomføre turen som planlagt, men be elevene gå med 10 meters avstand i 35-gradershenget.",
              "Avlyse turen eller flytte den til trygt øvingsterreng under 30 graders helning uten utløpssoner ovenfor, og dokumentere vurderingen og varselet i feltrapporten som en demonstrasjon av profesjonell risikovurdering.",
              "Slå av skredsøkerne for å spare batteri og gå raskt gjennom terrenget.",
              "Slette prosjektet og ta prøve i klasserommet i stedet, da avlysning gir strykkarakter.",
            ],
            answer: 1,
            explain:
              "I geofaglig feltarbeid går sikkerhet alltid foran data. Faregrad 3 betyr at skred lett kan utløses av én enkelt person. Å dokumentere varselet, vurdere risikoen og ta en velbegrunnet beslutning om avlysning eller omlegging til sikkert terreng (< 30°) viser høy geofaglig kompetanse og gir topp uttelling.",
          },
        ]}
      />
    </TopicLayout>
  );
}
