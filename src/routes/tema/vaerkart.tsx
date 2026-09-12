import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  RealisticSynopticChartDiagram,
  StationModelExplainedDiagram,
  FrontVerticalProfileDiagram,
  UpperAir500hPaMapDiagram,
  WeatherProgression24hDiagram,
  RadarSatelliteNowcastingDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/vaerkart")!;

export const Route = createFileRoute("/tema/vaerkart")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vaerkart",
    }),
  component: VaerkartPage,
});

function VaerkartPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Værkart og værutvikling"
      lead="Et værkart er ikke bare en meteorologisk rapport; det er et øyeblikksbilde av atmosfærens termodynamiske og mekaniske tilstand. Ved å kombinere bakketrykk, frontsystemer, WMO-stasjonsplott og 500 hPa styrestrømmer kan vi avkode luftmassenes dynamikk og forutsi værutviklingen de neste 12 til 24 timene med stor presisjon."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Synoptisk værkart over Nord-Atlanteren og Skandinavia med isobarer, lavtrykkssentre og fronter"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.vaerkart}
    >
      {/* KOMPETANSEMÅL CALLOUT */}
      <Callout title="Kompetansemål i Geofag 2">
        <p>
          Målet i læreplanen (LK20) krever at eleven skal kunne:{" "}
          <strong>
            «gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og
            lokal skala, og tolke ulike værkart og værutvikling»
          </strong>{" "}
          (Utdanningsdirektoratet, 2020).
        </p>
        <p className="mt-2 text-sm text-foreground/80">
          Dette kapittelet gir deg den faglige verktøykassen som kreves for å lese profesjonelle
          analyser fra Meteorologisk institutt (MET Norway) og Yr, tolke WMO-stasjonsmodeller,
          forstå styrestrømmer i høyden og gjennomføre en fullverdig 24-timers prognose på
          eksamensnivå.
        </p>
      </Callout>

      {/* 1. HVA ET SYNOPTISK BAKKEKART VISER */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        1. Det synoptiske bakkekartet – Atmosfærens trykkfelt
      </h2>
      <p>
        Ordet <em>synoptisk</em> stammer fra det greske <em>syn-opsis</em>, som betyr «å se alt under
        ett» eller «felles overblikk». I meteorologien er et synoptisk værkart en geografisk
        fremstilling av atmosfærens tilstand på et nøyaktig synkronisert tidspunkt over et stort
        kontinentalt eller oseanisk område (WMO, 2021).
      </p>
      <p>
        Jordens meteorologiske institutter samler inn milliarder av måledata samtidig ved de fire
        internasjonale hovedterminene: <strong>00:00, 06:00, 12:00 og 18:00 UTC</strong> (Coordinated
        Universal Time). Uansett om målingen gjøres på en værstasjon på Svalbard, en oljeplattform i
        Nordsjøen eller en værballong over Frankrike, fanges dataene i nøyaktig samme sekund. Dette
        synoptiske prinsippet er avgjørende: Hvis målingene ikke var samtidige, ville værsystemenes
        egen bevegelse (ofte 40–80 km/t) forvrenge trykkgradientene og gjøre analysen ubrukelig.
      </p>

      <OrdBoks
        ord="Synoptisk kart"
        barn="Et værkart som viser meteorologiske observasjoner utført samtidig over et stort område (ved standardiserte UTC-tidspunkter), med isobarer, frontlinjer og stasjonsmodeller."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Reduksjon til havnivå (MSLP)
      </h3>
      <p>
        Som vi lærte i kapittelet om trykk, faller lufttrykket med høyden – om lag 1 hPa for hver 8.
        meter nær bakken. Dersom vi tegnet råtrykket direkte på kartet, ville fjellbygda Geilo
        (ca. 800 moh.) alltid framstå som et ekstremt kraftig orkanlavtrykk på rundt 920 hPa, mens
        Bergen ved kysten ville ha 1013 hPa.
      </p>
      <p>
        For å isolere de horisontale trykkforskjellene som driver vinden, må alle bakketrykkmålinger
        korrigeres matematisk til hva trykket ville vært dersom stasjonen lå ved havnivå. Dette kalles{" "}
        <strong>Mean Sea Level Pressure (MSLP)</strong>. Korreksjonen beregnes ved hjelp av den
        hydrostatiske trykkligningen og hypsometriske formelen, der man regner inn vekten av en tenkt
        luftsøyle fra stasjonens faktiske høyde ned til havnivå basert på den lokale temperaturen.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Isobarer og trykkgradientkraften
      </h3>
      <p>
        Når havnivåtrykkene er plottet ut, trekkes linjer gjennom punkter med nøyaktig samme trykk.
        Disse linjene kalles <strong>isobarer</strong> (fra gresk <em>isos</em> = lik, og <em>baros</em> =
        vekt). Meteorologisk institutt og Yr trekker standardmessig isobarer med et intervall på{" "}
        <strong>4 eller 5 hPa</strong> (for eksempel 990, 995, 1000, 1005, 1010 hPa).
      </p>
      <p>
        Isobarene fungerer som koter på et topografisk kart. Jo tettere isobarene ligger sammen, desto
        større er trykkforskjellen over en gitt horisontal distanse. Dette definerer{" "}
        <strong>trykkgradientkraften</strong>:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Tette isobarer:</strong> Svært bratt trykkgradient. Stor trykkforskjell over kort
          avstand $\rightarrow$ sterk akselerasjon og kraftig vind (kuling, storm eller orkan).
        </li>
        <li>
          <strong>Gisne isobarer:</strong> Slak trykkgradient. Liten trykkforskjell over store
          avstander $\rightarrow$ svak vind, bris eller vindstille.
        </li>
      </ul>

      <OrdBoks
        ord="Trykkgradientkraft"
        barn="Den drivende kraften bak all vind. Virker vinkelrett på isobarene, rettet fra høyt mot lavt trykk. Styrken er proporsjonal med hvor tett isobarene ligger."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Bakkefriksjon og vindens innkryssing
      </h3>
      <p>
        I den frie troposfæren (over ca. 1 000 meters høyde) oppstår det en tilnærmet perfekt balanse
        mellom trykkgradientkraften og Corioliskraften. Her blåser vinden helt parallelt med isobarene –
        dette kalles <em>geostrofisk vind</em>.
      </p>
      <p>
        Nær bakken endrer imidlertid <strong>friksjonen</strong> mot jordoverflaten, skog, fjell og
        havbølger dette regnestykket. Friksjonen bremser vindhastigheten. Fordi Corioliskraften er
        direkte proporsjonal med vindhastigheten (F_c = 2 · m · v · Ω · sin φ), svekkes Corioliskraften
        når luften bremses ned. Trykkgradientkraften, som bare er avhengig av trykkfeltet, forblir like
        sterk!
      </p>
      <p>
        Resultatet er at trykkgradientkraften «vinner» over Corioliskraften nær bakken: Vinden bøyes av
        og <strong>krysser isobarene på skrå inn mot lavtrykkssenteret</strong> (konvergens) og på skrå
        ut av høytrykket (divergens). Over åpent hav er innkryssingsvinkelen typisk 10–20°, mens den
        over kupert norsk terreng kan være 25–40°. Denne innstrømmingen mot lavtrykket tvinger luften
        til å stige i sentrum, noe som fører til avkjøling, kondensasjon, skydannelse og nedbør!
      </p>

      {/* DIAGRAM 1: REALISTIC SYNOPTIC CHART */}
      <div className="my-6">
        <RealisticSynopticChartDiagram />
      </div>

      {/* 2. BERGENSSKOLEN OG FRONTSYSTEMENE */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        2. Bergensskolen og polarfrontens anatomi
      </h2>
      <p>
        Den moderne forståelsen av værkart og lavtrykk ble unnfanget i Norge. Under første verdenskrig
        ble Norge avskåret fra internasjonale værtelegrammer. Fysikeren <strong>Vilhelm Bjerknes</strong>{" "}
        opprettet et tett nettverk av observasjonsstasjoner på Vestlandet, ledet fra Geofysisk
        institutt i Bergen. Sammen med sønnen <strong>Jacob Bjerknes</strong> og kollegaen{" "}
        <strong>Halvor Solberg</strong> formulerte de i 1918–1922 den banebrytende{" "}
        <em>polarfrontteorien</em> (Bjerknes & Solberg, 1922).
      </p>
      <p>
        De oppdaget at atmosfæren ikke har jevne temperaturoverganger, men består av store, distinkte{" "}
        <strong>luftmasser</strong> med ulik temperatur og fuktighet. Grenseflatene mellom disse
        luftmassene kalte de <em>fronter</em> – et begrep lånt fra krigens skyttergravslinjer, fordi det
        bokstavelig talt raste et voldsomt energislag langs denne grensen.
      </p>

      <OrdBoks
        ord="Luftmasse"
        barn="Et enormt volum av luft (ofte tusenvis av kilometer i utstrekning) som har tilnærmet ensartede egenskaper for temperatur og fuktighet i horisontal retning, formet over et homogent kildeområde."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Frontenes symboler og dynamikk
      </h3>
      <p>
        På internasjonale værkart fra Meteorologisk institutt, Yr og WMO representeres frontene med
        standardiserte farger og geometriske figurer:
      </p>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border font-medium text-foreground">
              <th className="py-2 pr-3">Fronttype</th>
              <th className="py-2 pr-3">Kartsymbol</th>
              <th className="py-2 pr-3">Fysisk mekanisme</th>
              <th className="py-2 pr-3">Helning</th>
              <th className="py-2">Typisk vær & nedbør</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground/90">
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-rose-500">Varmfront</td>
              <td className="py-2.5 pr-3">Rød linje med halvsirkler</td>
              <td className="py-2.5 pr-3">
                Lett, varm luft rykker fram og glir slakt oppover den tilbaketrekkende kaldluften.
              </td>
              <td className="py-2.5 pr-3">Slak (1:150 til 1:200)</td>
              <td className="py-2.5">
                Bredt belte (300–600 km) med jevnt, vedvarende silregn eller snø (nimbostratus).
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-sky-500">Kaldfront</td>
              <td className="py-2.5 pr-3">Blå linje med spisse tagger</td>
              <td className="py-2.5 pr-3">
                Tung, kald luft brøyter seg fram under varmluften og løfter den brutalt opp.
              </td>
              <td className="py-2.5 pr-3">Bratt (1:50 til 1:80)</td>
              <td className="py-2.5">
                Smal frontsone (50–100 km) med voldsomme byger, torden, hagl og vindkast
                (cumulonimbus).
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-purple-500">Okkludert front</td>
              <td className="py-2.5 pr-3">Lilla linje med vekslende tagger og sirkler</td>
              <td className="py-2.5 pr-3">
                Den raske kaldfronten tar igjen varmfronten og klemmer varmsektoren opp i høyden.
              </td>
              <td className="py-2.5 pr-3">Kompleks vertikalt</td>
              <td className="py-2.5">
                Kombinert nedbørsbelte med både sammenhengende regn og innleirede byger.
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-amber-500">Stasjonær front</td>
              <td className="py-2.5 pr-3">Vekslende blå tagger og røde sirkler på hver side</td>
              <td className="py-2.5 pr-3">
                Grensen mellom kald og varm luft står tilnærmet stille (under 5 knops drift).
              </td>
              <td className="py-2.5 pr-3">Moderat</td>
              <td className="py-2.5">
                Langvarig skydekke og vedvarende nedbør over samme geografiske område i flere dager.
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-orange-500">Tråg / Trough</td>
              <td className="py-2.5 pr-3">Tykke stiplede eller brune linjer</td>
              <td className="py-2.5 pr-3">
                U-formet utbuling i isobarene med markant syklonal krumning og konvergens, uten full
                luftmassekontrast.
              </td>
              <td className="py-2.5 pr-3">Vertikal akse</td>
              <td className="py-2.5">
                Intensive bygelinjer (squall lines), vindøkning og raske væromslag i bakkant av
                lavtrykk.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <OrdBoks
        ord="Varm sektor"
        barn="Området mellom varmfronten foran og kaldfronten bak i en moden polarfrontsyklon. Kjennetegnes av mild, fuktig luft, flatt eller svakt fallende trykk, og ofte yr eller tåkeskyer."
      />

      {/* 3. VERTIKALT TVERRSNITT OG SKYSEKVENS */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        3. Vertikalstruktur og skysekvens over 1500 km
      </h2>
      <p>
        For å virkelig mestre værkarttolking i Geofag 2 holder det ikke å se frontene i fugleperspektiv.
        Du må visualisere atmosfærens <strong>tredimensjonale tverrsnitt</strong>.
      </p>
      <p>
        Når et lavtrykkssystem nærmer seg kysten fra vest, følger en karakteristisk og universell
        sekvens av skyer og nedbør som strekker seg over mer enn 1 500 kilometer (Sivle, 2009; NOAA,
        u.å.):
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Varmfrontens forvarsel (1000–1500 km foran lavtrykkssenteret)
      </h3>
      <p>
        Fordi varmfrontens glideflate er svært slak (1:150, som betyr at flaten bare stiger 1 km per
        150 km horisontal avstand), klatrer varmluften i høyden lenge før selve frontlinjen når
        bakken:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Cirrus (Ci) i 8–10 km høyde:</strong> Det aller første tegnet på et innkommende
          lavtrykk er tynne, fjæraktige skyer av rene iskrystaller («kattelabber» på folkemunne). De
          dannes der den øverste spissen av varmluften glir over kaldluften. Været på bakken er ennå
          klart og pent, men barometeret begynner å falle svakt.
        </li>
        <li>
          <strong>Cirrostratus (Cs) i 6–8 km høyde:</strong> I løpet av 6–12 timer tetner cirrusskyene
          til et melkehvitt slør over hele himmelen. Iskrystallene i cirrostratus bryter sol- og
          månelyset og skaper en lysende ring med en radius på 22° rundt solen – en såkalt{" "}
          <strong>halo</strong>. I geofaglig værvarsling er en halo et sikkert tegn på at varmfronten
          er i anmarsj.
        </li>
        <li>
          <strong>Altostratus (As) i 3–6 km høyde:</strong> Skylaget synker og blir tykkere. Sola
          viskes ut til en diffus, matt lysflekk («som sett gjennom et matt glassvindu»). Lufttrykket
          faller nå markant.
        </li>
        <li>
          <strong>Nimbostratus (Ns) og jevn nedbør (0–3 km høyde):</strong> 100–300 km foran fronten
          på bakken har skylaget blitt mørkegrått, lavt og formløst. Den jevne, vedvarende nedbøren
          starter (landregn eller snøvær). Dette regnet kan vare sammenhengende i 6–18 timer avhengig
          av systemets hastighet.
        </li>
      </ol>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Den varme sektoren og kaldfrontens brå overgang
      </h3>
      <p>
        Når selve varmfronten passerer bakken, opphører den sammenhengende nedbøren. Temperaturen
        hopper opp, luftfuktigheten er høy, og himmelen er ofte dekket av lave tåkeskyer eller yr{" "}
        <em>(Stratocumulus / Stratus)</em>. Barometeret flater ut. Du befinner deg nå i{" "}
        <strong>varmsektoren</strong>.
      </p>
      <p>
        Varmsektorens oppholdsvær er imidlertid kortvarig. Bak lurer den aggressive kaldfronten:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Fordi kaldluften er tung og tettere, pløyer den seg under varmluften med stor fart.
          Helningen er bratt (1:50).
        </li>
        <li>
          Den fuktige luften kastes oppover med voldsom kraft, noe som trigger eksplosiv konvektiv
          skydannelse: <strong>Cumulonimbus (Cb)</strong>, tordenskyer med ambolter av is i 10–12 km
          høyde.
        </li>
        <li>
          Under kaldfrontpassasjen oppstår <strong>squalls</strong> (plutselige, harde vindkast),
          styrtregn, hagl og torden. På bare 15–30 minutter kan temperaturen rase med 5–10 °C!
        </li>
        <li>
          Straks fronten har passert, sprekker skydekket opp i krystallklar, dypblå polarluft
          avbrutt av kraftige, spredte ustabilitetsbyger <em>(Cumulus congestus)</em>. Barometeret
          skyter i været igjen.
        </li>
      </ul>

      {/* DIAGRAM 2: FRONT VERTICAL PROFILE */}
      <div className="my-6">
        <FrontVerticalProfileDiagram />
      </div>

      {/* 4. STASJONSMODELLEN (WMO PLOTTING MODEL) */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        4. WMO-stasjonsmodellen – Slik avkoder du observasjonene
      </h2>
      <p>
        På profesjonelle værkart fra MET Norway og WMO plasseres det en kompakt, standardisert
        figur over hver observasjonsstasjon. Denne kalles en <strong>stasjonsmodell</strong>{" "}
        (station plot). Figuren pakker en enorm mengde meteorologiske målinger inn på bare noen få
        kvadratmillimeter (WMO, 2021; NOAA, u.å.).
      </p>

      <OrdBoks
        ord="WMO-stasjonsmodell"
        barn="Et internasjonalt grafisk mønster av tall og symboler sentrert rundt en stasjonssirkel, som angir skydekke, vind, temperatur, duggpunkt, lufttrykk, trykktendens og nåværende værforhold."
      />

      {/* DIAGRAM 3: STATION MODEL EXPLAINED */}
      <div className="my-6">
        <StationModelExplainedDiagram />
      </div>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Nøkkelen til å avkode stasjonsmodellen trinn for trinn
      </h3>
      <div className="space-y-3 text-foreground/90">
        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">1. Stasjonssirkelen (Skydekke i oktas)</h4>
          <p className="text-sm">
            Sirkelen i midten representerer selve stasjonen. Fyllingsgraden angir hvor stor andel av
            himmelen som er dekket av skyer, målt i <strong>oktas (åttendeler)</strong>:
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <span className="rounded bg-muted/40 p-1.5 text-center">○ Helt åpen: 0/8 (Klarvær)</span>
            <span className="rounded bg-muted/40 p-1.5 text-center">◔ Kvart fylt: 2/8 (Lettskyet)</span>
            <span className="rounded bg-muted/40 p-1.5 text-center">◑ Halvfylt: 4/8 (Halvskyet)</span>
            <span className="rounded bg-muted/40 p-1.5 text-center">● Helt fylt: 8/8 (Overskyet)</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">2. Vindpil og vindflagg (Retning og styrke)</h4>
          <p className="text-sm">
            Linjen som stikker ut fra stasjonssirkelen er selve vindpilen. Den peker i retningen luften
            kommer <strong>fra</strong> (for eksempel peker en sørvestlig vind mot sørvest). Fjærene
            og vimplene i enden angir vindhastigheten i <strong>knop</strong> (1 knop ≈ 0,514 m/s):
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-foreground/80">
            <li><strong>Halv strek:</strong> 5 knop (ca. 2,5 m/s)</li>
            <li><strong>Hel strek:</strong> 10 knop (ca. 5,1 m/s)</li>
            <li><strong>Trekant / Vimpel:</strong> 50 knop (ca. 25,7 m/s – full storm)</li>
            <li>Eksempel: Én vimpel + to hele streker + én halv strek = 50 + 10 + 10 + 5 = <strong>75 knop (orkan)</strong>.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">3. Temperatur og Duggpunkt (T og Td)</h4>
          <p className="text-sm">
            <strong>Øverst til venstre:</strong> Lufttemperatur i °C (f.eks. 14).<br />
            <strong>Nederst til venstre:</strong> Duggpunktstemperatur i °C (f.eks. 12).<br />
            Differansen mellom temperatur og duggpunkt kalles <em>duggpunktsdepresjonen</em>. Når
            differansen er 0 til 2 °C, er den relative fuktigheten over 90–95 %. Dette varsler tåke,
            lavt skydekke eller pågående kondensasjon.
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-rose-500 dark:text-rose-400">
            4. Den 3-sifrede trykkoden (Eksamensklassiker!)
          </h4>
          <p className="text-sm">
            Øverst til høyre på stasjonen står et tresifret tall, for eksempel <strong>138</strong>{" "}
            eller <strong>984</strong>. For å spare plass dropper meteorologer det innledende 9- eller
            10-tallet og desimalkommat.
          </p>
          <div className="mt-2 rounded bg-background/80 p-2.5 text-xs">
            <p className="font-mono font-bold text-primary">DEKODINGSREGELEN:</p>
            <p className="mt-1">
              • Hvis tallet er <strong>under 500</strong>: Sett et <strong>10</strong> foran, og sett
              komma foran siste siffer.
              <br />
              <em>Eksempel:</em> <strong>138</strong> $\rightarrow$ 10 + 13,8 = <strong>1013,8 hPa</strong>.{" "}
              <strong>024</strong> $\rightarrow$ 10 + 02,4 = <strong>1002,4 hPa</strong>.
            </p>
            <p className="mt-1">
              • Hvis tallet er <strong>500 eller høyere</strong>: Sett et <strong>9</strong> foran, og
              sett komma foran siste siffer.
              <br />
              <em>Eksempel:</em> <strong>984</strong> $\rightarrow$ 9 + 98,4 = <strong>998,4 hPa</strong>.{" "}
              <strong>862</strong> $\rightarrow$ 9 + 86,2 = <strong>986,2 hPa</strong>.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">5. Trykktendens (pp og symbol)</h4>
          <p className="text-sm">
            Nederst til høyre står trykkendringen de siste <strong>3 timene</strong> i tiendedels hPa,
            etterfulgt av en liten kurve.
            <br />
            <em>Eksempel:</em> <strong>-32 \</strong> betyr at trykket har falt med 3,2 hPa de siste 3
            timene med en jevnt fallende kurve. Et trykkfall på over 3 hPa på 3 timer regnes som et
            sikkert tegn på en nært forestående front eller et hissig lavtrykk.
          </p>
        </div>
      </div>

      {/* 5. HØYDEKART OG STYRESTRØMMER (500 HPA) */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        5. Høydekart og styrestrøm – Atmosfæren i 500 hPa
      </h2>
      <p>
        Meteorologer analyserer aldri et bakkekart isolert. Overflateværet er bare det nederste
        grenselaget i et enormt tre-dimensjonalt maskineri. For å vite hvor lavtrykkene og frontene vil
        bevege seg, må vi opp i den midtre troposfæren: til <strong>500 hPa-nivået</strong>.
      </p>

      <OrdBoks
        ord="Geopotensiell høyde (gpm)"
        barn="Høyden over havnivå der lufttrykket har falt til en bestemt verdi (f.eks. 500 hPa), justert for jordens tyngdefeltvariasjon. Måles i geopotensielle meter (gpm)."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Isohypser, tråg og rygger
      </h3>
      <p>
        Mens bakkekart viser trykkvariasjon ved en konstant geometrisk høyde (havnivå), viser
        høydekart variasjon i <strong>geopotensiell høyde</strong> for en konstant trykkflate. På et
        500 hPa-kart kalles linjene <strong>isohypser</strong> (høydekoter). Typisk høyde for 500
        hPa-flaten er <strong>5 500 gpm</strong>:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          I kald, tung polarluft trekker atmosfæren seg sammen. Her må du bare opp til 5 100–5 300 gpm
          før trykket er nede i 500 hPa. På kartet danner dette U-formede søroverrettede bulker kalt{" "}
          <strong>tråg (troughs)</strong>.
        </li>
        <li>
          I varm, lett subtropisk luft utvider atmosfæren seg. Her må du helt opp til 5 700–5 900 gpm
          før 500 hPa nås. Dette danner nordoverrettede buer kalt <strong>rygger (ridges)</strong>.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Styrestrømmens regel (50 % av 500 hPa-vinden)
      </h3>
      <p>
        Vinden i 500 hPa-nivået blåser parallelt med isohypsene. Fordi dette nivået ligger midt i
        troposfærens masse, fungerer denne storskala luftstrømmen som en <strong>styrestrøm</strong>{" "}
        for bakkens lavtrykk og fronter.
      </p>
      <div className="my-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
        <p className="font-semibold text-primary">Meteorologisk tommelfingerregel for styrestrøm:</p>
        <p className="mt-1 text-foreground/90">
          Et overflatelavtrykk beveger seg i hovedsak <strong>parallelt med isohypsene</strong> på 500
          hPa-kartet, med en forflytningshastighet som tilsvarer om lag{" "}
          <strong>50 % av vindhastigheten</strong> i 500 hPa.
        </p>
      </div>

      <p>
        I tillegg er sammenhengen mellom 500 hPa og bakken en drivende motor for selve trykkutviklingen:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>På østsiden (forsiden) av et tråg:</strong> Isohypsene sprer seg ut (divergens i
          høyden). Dette suger luft opp fra bakken, noe som gjør at overflatelavtrykket under forsterkes
          kraftig (syklogenese).
        </li>
        <li>
          <strong>På østsiden (forsiden) av en rygg:</strong> Isohypsene smalner inn (konvergens i
          høyden). Luft tvinges nedover mot bakken, noe som bygger opp et stabilt høytrykk med
          tørkende og synkende luft.
        </li>
      </ul>

      {/* DIAGRAM 4: UPPER AIR 500 HPA MAP */}
      <div className="my-6">
        <UpperAir500hPaMapDiagram />
      </div>

      {/* 6. NOWCASTING, RADAR OG MET FAREVARSLER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        6. Nowcasting, værradar, satellitt og farevarsler
      </h2>
      <p>
        De synoptiske kartene fanger det store bildet hver 6. time. Men hva når en intens bygelinje
        eller en plutselig atmosfærisk elv truer et lokalsamfunn akkurat nå? Her trer{" "}
        <strong>nowcasting (korttidsvarsling 0–2 timer)</strong> inn, basert på sanntids fjernerkjenning
        fra værradarer og satellitter.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Værradar – Reflektivitet i dBZ
      </h3>
      <p>
        Meteorologisk institutt drifter et nasjonalt nettverk av bakkebaserte værradarer (for eksempel
        på Bømlo, Hurum, Rissa og Hasvik). Radaren sender ut mikrobølgepulser som reflekteres tilbake
        av vanndråper, hagl og snøkrystaller i skyene.
      </p>
      <p>
        Styrken på det returnerte signalet måles i <strong>desibel reflektivitet (dBZ)</strong>, som er
        proporsjonal med dråpediameteren i sjette potens (Z proporsjonal med D^6). En dobling i
        dråpestørrelse gir 64 ganger kraftigere ekko!
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li><strong>10–20 dBZ (blått/lysegrønt):</strong> Lett yr eller lett snøfall.</li>
        <li><strong>30–40 dBZ (gult/oransje):</strong> Moderat til kraftig regn (5–15 mm/t).</li>
        <li><strong>50–65 dBZ (mørkerødt/fiolett):</strong> Ekstrem nedbørsintensitet, tordenvær og hagl.</li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Meteosat satellittbilder (VIS og IR)
      </h3>
      <p>
        Geostasjonære satellitter (Meteosat) 36 000 km over ekvator tar bilder hvert 10.–15. minutt:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Synlige bilder (VIS):</strong> Viser sollys reflektert fra skytoppene (albedo). Tykke
          skyer med høyt vanninnhold fremstår blendende hvite, mens bakke og åpent hav er mørkt.
          Fungerer kun i dagslys.
        </li>
        <li>
          <strong>Infrarøde bilder (IR):</strong> Måler den termiske strålingen fra skytoppene. Fordi
          temperaturen faller med høyden i troposfæren, har skytopper i 10–12 km høyde ekstremt lave
          temperaturer (-50 til -70 °C). På fargelagte IR-bilder vises disse sylkalde
          cumulonimbus-skyene i grelle røde og fiolette fargetoner, noe som umiddelbart avslører aktive
          tordensentre og intense frontbånd natt og dag.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        MET Norways farevarsler (Gult, oransje og rødt nivå)
      </h3>
      <p>
        Når radar, satellitt og numeriske modeller indikerer at været vil medføre samfunnsrisiko,
        utsteder Meteorologisk institutt offisielle farevarsler på Yr og Varsom.no i henhold til
        europeisk standard (Meteoalarm):
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
          <p className="font-semibold text-amber-600 dark:text-amber-400">Gult nivå – Moderat fare</p>
          <p className="mt-1 text-xs text-foreground/80">
            Uvanlige værforhold. Kan føre til lokale forstyrrelser i trafikk og transport. Vær
            oppmerksom.
          </p>
        </div>
        <div className="rounded-lg border border-orange-500/40 bg-orange-500/10 p-3">
          <p className="font-semibold text-orange-600 dark:text-orange-400">Oransje nivå – Stor fare</p>
          <p className="mt-1 text-xs text-foreground/80">
            Sjeldne og alvorlige værforhold. Fare for skader på infrastruktur og eiendom. Vær forberedt.
          </p>
        </div>
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3">
          <p className="font-semibold text-rose-600 dark:text-rose-400">Rødt nivå – Ekstrem fare</p>
          <p className="mt-1 text-xs text-foreground/80">
            Ekstremvær (f.eks. stormen «Ingunn» eller «Hans»). Omfattende ødeleggelser og fare for liv og
            helse. Følg myndighetenes råd.
          </p>
        </div>
      </div>

      {/* DIAGRAM 5: RADAR & SATELLITE NOWCASTING */}
      <div className="my-6">
        <RadarSatelliteNowcastingDiagram />
      </div>

      {/* 7. 5-TRINNS METODE FOR EKSAMEN */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        7. 5-trinns metode for å analysere et værkart på eksamen
      </h2>
      <p>
        På eksamen i Geofag 2 får elevene ofte utlevert et synoptisk kart med isobarer, fronter og
        stasjonsplott, og blir bedt om å beskrive nåværende vær på et bestemt sted og vurdere
        værutviklingen det neste døgnet.
      </p>
      <p>
        Følger du denne 5-trinns oppskriften slavisk, unngår du panikk og sikrer en fullstendig,
        faglig forankret besvarelse:
      </p>

      <div className="my-4 space-y-3">
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 1: Lokaliser trykksentrene (L og H)
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Finn de lukkede isobarsirklingene. Hvor ligger lavtrykkene, og hva er sentertrykket
            (f.eks. et dypt høstlavtrykk på 968 hPa vest for Lofoten)? Hvor ligger høytrykket (f.eks.
            et blokkerende 1028 hPa høytrykk over Russland)?
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 2: Evaluer trykkgradienten og bestem vindfeltet
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Sjekk avstanden mellom isobarene. Ligger de tett over Nordsjøen og Vestlandet? Da blir det
            sterk vind! Bruk <strong>Buys Ballots lov</strong>: Still deg med ryggen mot vinden på
            nordlig halvkule, og du har lavtrykket skrått foran deg til venstre. Husk at vinden blåser
            mot klokka rundt L, og krysser isobarene 15–30° inn mot sentrum nær bakken.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 3: Kartlegg frontene og identifiser luftmassene
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Hvor ligger varmfronten, varmsektoren, kaldfronten og okklusjonen i forhold til studiestedet?
            Ligger Norge i kald arktisk luftmasse, i den milde atlantiske varmsektoren, eller midt i en
            aktiv frontsone?
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 4: Verifiser med stasjonsplottene
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Les av nærmeste stasjoner. Dekod det tre-sifrede trykket (f.eks. 024 = 1002,4 hPa). Se på
            trykktendensen (faller barometeret med mer enn 3 hPa på 3 timer, er fronten like rundt
            hjørnet). Sjekk skydekket (oktas), værtypen (prikker for regn, trekanter for byger) og
            duggpunktsdepresjonen.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 5: Ekstrapoler værutviklingen 12–24 timer fram
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Lavtrykk i våre bredder driver mot øst-nordøst med vestavindsbeltet og 500 hPa
            styrestrømmen (typisk 30–60 km/t). Flytt hele systemet framover på kartet: Hvis en
            varmfront ligger over Nordsjøen kl. 00, vil den treffe Vestlandet ved lunsjtider (+12t) og
            være etterfulgt av en kaldfront med vinddreining og byger innen neste morgen (+24t).
          </p>
        </div>
      </div>

      {/* 8. CASESTUDIE: EN KLASSISK ATLANTERHAVSSTORM */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        8. Casestudie – En klassisk atlantisk høststorm mot Norge
      </h2>
      <p>
        La oss anvende teorien på en realistisk værsituasjon: Et modent, intenst atlanterhavslavtrykk
        (968 hPa i sentrum) beveger seg inn fra Norskehavet mot kysten av Vestlandet og Trøndelag.
      </p>
      <p>
        Hva opplever en observatør som står stasjonert på kysten ved Stad gjennom et helt døgn?
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        T = 0 timer: Varmfrontens forfeste (Klarvær til melkehvitt slør)
      </h3>
      <p>
        Lavtrykket ligger 800 km vest i havet. Barometeret på Stad viser 1012 hPa, men stasjonsplottet
        avslører en fallende trykktendens (<code>-25 /</code>). Vinden er svak til frisk bris fra
        sør-sørøst. På himmelen seiler tynne cirrusfjær som gradvis tetner til et melkehvitt
        cirrostratusslør med tydelig halo rundt solen.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        T = +12 timer: Varmfrontpassasje og varmsektor (Silregn og vinddreining)
      </h3>
      <p>
        Ved middagstider når selve varmfronten kysten. Skylaget har senket seg til blygrå nimbostratus,
        og et vedvarende, tungt landregn har pågått i fire timer. Barometeret har stupt til 992 hPa.
      </p>
      <p>
        Når varmfronten passerer, skjer et markant fenomen: <strong>Vinden dreier med klokka (veering)</strong>{" "}
        fra sørøst mot sørvest, og øker til stiv kuling. Samtidig stiger temperaturen brått fra 6 °C
        til 13 °C. Nedbøren går over fra silregn til lett yr og tåkedis. Vi befinner oss midt i den
        lunkne, fuktige varmsektoren.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        T = +24 timer: Kaldfrontpassasje og arktisk luftutbrudd (Squalls og klarning)
      </h3>
      <p>
        På ettermiddagen treffer den hissigste delen av systemet: Kaldfronten og okklusjonsbåndet.
        Himmelen formørkes av massive cumulonimbus-tårn. Vinden gjør nok et brutalt hopp med klokka:
        den raser fra sørvest til <strong>nordvest, og øker til full storm</strong> med vindkast over
        35 m/s. Regnet høljer ned i form av intense byger blandet med hagl og torden.
      </p>
      <p>
        Få timer senere skyter barometeret oppover igjen (<code>+45 /</code>). Kald, krystallklar
        polarluft skyller inn over det lunkne kystvannet. Luften er ustabil, noe som skaper klassiske
        «vestlandsbyger» med solgløtt innimellom kraftige hagl- og regnbyger.
      </p>

      <OrdBoks
        ord="Vinddreining (Veering)"
        barn="At vinden skifter retning med urviseren (f.eks. fra sørøst via sør til sørvest og nordvest). På den nordlige halvkule skjer dette når et lavtrykk passerer nord for observatøren."
      />

      {/* DIAGRAM 6: WEATHER PROGRESSION 24H */}
      <div className="my-6">
        <WeatherProgression24hDiagram />
      </div>

      {/* 9. DE 4 VANLIGSTE EKSAMENSFELLENE */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        9. Eksamensfeller ved værkart i Geofag 2
      </h2>
      <Callout title="De 4 vanligste eksamensfellene – Dette trekker sensor for!">
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 1: Å tro at et lavtrykk per definisjon må være under 1013 hPa.
            </strong>
            <p className="text-foreground/80">
              Sensorer ser ofte elever som skriver at «dette er et høytrykk fordi trykket er 1016 hPa».
              Dette er feil! Lufttrykk er <em>relativt</em>. Hvis et trykksenter på 1016 hPa er omgitt
              av isobarer på 1024 og 1028 hPa, er senteret et <strong>lavtrykk</strong>. Det er
              trykkforskjellen til omgivelsene, ikke det absolutte tallet, som avgjør om luft konvergerer
              eller divergerer.
            </p>
          </div>
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 2: Å tro at vinden blåser vinkelrett rett inn i lavtrykket.
            </strong>
            <p className="text-foreground/80">
              Mange glemmer Corioliseffekten og tegner piler som går rett inn i L som eiker i et hjul.
              Husk: Vinden blåser <em>nesten parallelt</em> med isobarene! Bakkefriksjon gjør bare at
              vinden krysser isobarene med en beskjeden vinkel på 15–30° mot lavtrykket.
            </p>
          </div>
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 3: Å blande sammen varmfrontens og kaldfrontens nedbørskarakter.
            </strong>
            <p className="text-foreground/80">
              En varmfront gir <em>aldri</em> korte tordenbyger. Den slake helningen (1:150) gir dagesvis
              med stratiformt, jevnt silregn fra nimbostratus. Det er kaldfronten med sin bratte
              brøytekant (1:50) som kaster luften opp og skaper eksplosiv konveksjon, hagl og torden
              fra cumulonimbus.
            </p>
          </div>
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 4: Feillesing av det 3-sifrede trykktallet på stasjonsmodellen.
            </strong>
            <p className="text-foreground/80">
              Dersom koden viser <code>042</code>, må du ikke skrive 42 hPa eller 1042 hPa! Tallet er
              under 500, og betyr derfor <strong>1004,2 hPa</strong>. Viser koden <code>978</code>, betyr
              det <strong>997,8 hPa</strong>. Å mestre denne regelen viser sensor at du behersker ekte
              meteorologisk kodespråk.
            </p>
          </div>
        </div>
      </Callout>

      {/* 10. VIKTIGE BEGREPER (TERMGRID) */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        10. Nøkkelbegreper
      </h2>
      <p>
        Disse tolv begrepene utgjør kjernen i læreplanens krav til tolkning av værkart og
        værsystemer i Geofag 2:
      </p>
      <TermGrid>
        <Term
          name="Synoptisk kart"
          def="Værkart som viser samtidige meteorologiske observasjoner ved standardiserte UTC-terminer over et stort geografisk område."
        />
        <Term
          name="Isobar"
          def="Linje gjennom punkter med samme lufttrykk redusert til havnivå (MSLP). Tette isobarer indikerer sterk vind."
        />
        <Term
          name="Trykkgradient"
          def="Endring i lufttrykk per horisontale distanseenhet. Den fundamentale drivkraften bak all horisontal vindbevegelse."
        />
        <Term
          name="Varmfront"
          def="Front der lett varmluft glir slakt (1:150) opp over tilbaketrekkende kaldluft, kjennetegnet av Ci→Cs→As→Ns og jevn nedbør."
        />
        <Term
          name="Kaldfront"
          def="Front der tung kaldluft brøyter seg aggressivt (1:50) under varmluft, med cumulonimbus-skyer, kraftige byger og brått temperaturfall."
        />
        <Term
          name="Okklusjon"
          def="Frontstadium der den raskere kaldfronten tar igjen varmfronten og løfter den varme sektoren helt bort fra bakken."
        />
        <Term
          name="Varm sektor"
          def="Området med mild og fuktig luft mellom varmfronten og kaldfronten i en moden polarfrontsyklon."
        />
        <Term
          name="WMO-stasjonsmodell"
          def="Internasjonal koding av lokale observasjoner (oktas, vindpiler, temperatur, duggpunkt, trykk og tendens) i en samlet figur."
        />
        <Term
          name="Isohypse"
          def="Høydekote på et konstanttrykk-kart (f.eks. 500 hPa) som angir geopotensiell høyde i gpm."
        />
        <Term
          name="Styrestrøm"
          def="Den storskala vindstrømmen i midtre troposfære (500 hPa) som styrer forflytningen av bakkens lavtrykk med om lag halv hastighet."
        />
        <Term
          name="Reflektivitet (dBZ)"
          def="Logaritmisk måleenhet for radarsignal reflektert fra nedbørspartikler. Høy dBZ indikerer styrtregn, torden eller hagl."
        />
        <Term
          name="Veering (vinddreining)"
          def="Skifte av vindretning med urviseren (f.eks. fra sør til sørvest og nordvest), typisk på nordlig halvkule når lavtrykk passerer nord for stasjonen."
        />
      </TermGrid>

      {/* 11. QUIZ */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        11. Test deg selv: Værkart og værutvikling
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "På et synoptisk værkart over Nordsjøen ligger isobarene ekstremt tett sør for et lavtrykkssenter. Hva forteller dette om værforholdene?",
            options: [
              "Vindstille og tett strålingståke, fordi trykket er synkende.",
              "Meget sterk trykkgradientkraft som vil gi kraftig vind (kuling eller storm).",
              "At luften er helt fri for Corioliskraft.",
              "At lavtrykket har sluttet å utvikle seg og er stasjonært.",
            ],
            answer: 1,
            explain:
              "Trykkgradientkraften er omvendt proporsjonal med avstanden mellom isobarene. Tette isobarer betyr stor trykkforskjell over kort avstand, noe som akselererer luften kraftig og genererer sterk vind.",
          },
          {
            prompt:
              "På en WMO-stasjonsmodell viser det tresifrede trykktallet øverst til høyre «028». Hva er stasjonens faktiske havnivåtrykk?",
            options: [
              "28,0 hPa",
              "928,0 hPa",
              "1002,8 hPa",
              "1028,0 hPa",
            ],
            answer: 2,
            explain:
              "Dekodingsregelen sier at tall under 500 skal ha et 10-tall foran og komma før siste siffer: 028 blir 10 + 02,8 = 1002,8 hPa. (Dersom det hadde stått f.eks. 984, ville det vært 998,4 hPa).",
          },
          {
            prompt:
              "Du observerer følgende skysekvens over et døgn: Først tynne fjærskyer (cirrus), så et melkehvitt slør med ring rundt sola (halo/cirrostratus), etterfulgt av et grått lag der sola viskes ut (altostratus), og til slutt sammenhengende silregn (nimbostratus). Hvilket værsystem nærmer seg?",
            options: [
              "En klassisk varmfront på glid over kaldluft.",
              "En aggressiv kaldfront med cumulonimbus.",
              "En høytrykksrygg med subsidens.",
              "En lokal sjøbris.",
            ],
            answer: 0,
            explain:
              "Fordi varmfrontens glideflate er svært slak (1:150), ankommer de høyeste cirrusskyene 1000–1500 km foran selve bakkefronten. Sekvensen Ci → Cs (med halo) → As → Ns er det klassiske kjennetegnet på en ankommende varmfront.",
          },
          {
            prompt:
              "Hvorfor er et 500 hPa høydekart så avgjørende for å forutsi lavtrykkenes bane på bakkekartet?",
            options: [
              "Fordi vinden i 500 hPa blåser rett ned i havet og danner bølger.",
              "Fordi storskala-strømmen i 500 hPa fungerer som styrestrøm for overflatelavtrykkene, som typisk beveger seg parallelt med isohypsene i halv fart.",
              "Fordi 500 hPa representerer jordoverflaten ved polene.",
              "Fordi trykket ved bakken alltid er nøyaktig det dobbelte av 500 hPa.",
            ],
            answer: 1,
            explain:
              "500 hPa-nivået deler atmosfæren i to etter masse. Vinden her blåser parallelt med isohypsene og fungerer som en 'elv' som styrer de underliggende lavtrykkene, normalt i samme retning og med ca. 50 % av 500 hPa-vindens hastighet.",
          },
          {
            prompt:
              "Hvorfor blåser vinden nær bakken på skrå inn mot et lavtrykk (15–30° vinkel på isobarene) i stedet for å blåse helt parallelt med isobarene?",
            options: [
              "Corioliskraften er mye sterkere ved bakken enn i høyden.",
              "Friksjonen mot overflaten bremser vinden, noe som svekker Corioliskraften slik at trykkgradientkraften delvis trekker luften inn mot lavtrykket.",
              "Fordi gravitasjonskraften trekker luften sidelengs mot ekvator.",
              "Luftmolekylene blir lettere nær bakken på grunn av fuktighet.",
            ],
            answer: 1,
            explain:
              "I fri troposfære balanserer Corioliskraft og trykkgradientkraft (geostrofisk vind). Ved bakken bremser friksjonen vindhastigheten. Siden Corioliskraften er proporsjonal med hastigheten, svekkes den, og trykkgradientkraften trekker luften skrått inn mot lavtrykket.",
          },
          {
            prompt:
              "Et lavtrykk passerer like nord for Vestlandet. Hvilken vinddreining vil en observatør på bakken oppleve etter hvert som varmfront, varmsektor og til slutt kaldfront passerer?",
            options: [
              "Vinden blåser uforandret fra nordøst under hele passasjen.",
              "Vinden dreier mot urviseren (backing): fra nordvest via vest til sørøst.",
              "Vinden dreier med urviseren (veering): fra sørøst foran varmfronten, via sørvest i varmsektoren, til nordvest bak kaldfronten.",
              "Vinden stopper helt opp i varmsektoren og snur 180 grader momentant.",
            ],
            answer: 2,
            explain:
              "Når lavtrykkssenteret går nord for observatøren på nordlig halvkule, dreier vinden 'med klokka' (veering): Sørøstlig vind foran varmfronten, dreier til sørvest i varmsektoren, og snur kraftig til nordvest når kaldfronten raser inn.",
          },
        ]}
      />

      {/* AVSLUTNING OG VEIEN VIDERE */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-display text-lg font-medium text-primary">Veien videre i Geofag 2</h3>
        <p className="mt-2 text-sm text-foreground/90">
          Nå som du mestrer tolkningen av bakkekart, frontenes vertikale struktur, WMO-koder og 500 hPa
          styrestrømmer, er neste naturlige steg å undersøke de aller kraftigste motorene i det
          øvre sirkulasjonssystemet:{" "}
          <Link
            to="/tema/jetstrommer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Jetstrømmene
          </Link>
          . For regional og lokal værdynamikk som sjøbris, dalvind og føneffekt, kan du gå videre til{" "}
          <Link
            to="/tema/lokale-vaersystemer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Lokale værsystemer
          </Link>
          .
        </p>
      </div>
    </TopicLayout>
  );
}
