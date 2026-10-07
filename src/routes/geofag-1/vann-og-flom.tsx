import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import { HydrographDiagram, KretslopDiagram } from "@/components/diagrams/hydrology";
import { GeoMap } from "@/components/geo-map";
import { HydrographCatchmentModel } from "@/components/models/hydrograph-catchment-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("vann-og-flom")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/vann-og-flom")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/vann-og-flom",
    }),
  component: VannOgFlomPage,
});

function VannOgFlomPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Hydrologi er vitenskapen om vannets kretsløp og oppførsel på landjorden. Hvordan omdannes en regnbyge til en ødeleggende flombølge i elva? Hvorfor reagerer bratte vestlandsbekker på minutter, mens Glomma og Mjøsa bruker dager på å kulminere? Her utforsker vi vannbalansen i nedbørsfeltet, hydrogramanalyse, de norske flomregimene, ekstremværet Hans i 2023 og hvordan NVE beregner flomsoner for samfunnssikkerhet."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/isbreer-og-landformer",
        label: "Forrige: Isbreer og landformer",
      }}
      next={{
        to: "/geofag-1/skred",
        label: "Neste: Skred",
      }}
      kilder={KILDER.vannFlom}
      posterSlug="vann-og-flom"
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            gjøre rede for det hydrologiske kretsløpet og ferskvannets bevegelser, analysere hydrogrammer for ulike nedbørsfelt,
            og vurdere flomfare, flomrisiko og forebyggende tiltak i et endret klima.
          </em>
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Vannbalansen og feltmagasiner:</em> Nedbørsfelt, vannbalanseligningen (P = Q + E ± ΔS), infiltrasjon og grunnvann.</p>
          <p>• <em>Avrenningsdynamikk og hydrogrammer:</em> Retardasjonstid (lag time), flomtopp (Q_max), formfaktor, innsjøprosent og urbanisering.</p>
          <p>• <em>Flomtyper og naturfarer:</em> Regnflom, snøsmelteflom, kombinasjonsflom, Hans 2023, NVE-faresonekart og TEK17.</p>
        </div>
      </Callout>

      {/* 1. DET HYDROLOGISKE KRETSLØPET OG VANNBALANSEN */}
      <CollapsibleSection
        title="Det hydrologiske kretsløpet og vannbalansen i nedbørsfeltet"
        subtitle="Magasiner, strømningsveier og vannbalanseligningen"
        badge="Kretsløp & Balanse"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          Det hydrologiske kretsløpet på landjorden er et kontinuerlig masseoverføringssystem drevet av solens innstråling
          og tyngdekraften. Den grunnleggende fysiske analyse-enheten i hydrologien er <strong>nedbørsfeltet (nedslagsfeltet)</strong>:
          det geografiske landarealet som drenerer alt overflate- og grunnvann mot ett felles utløpspunkt i et vassdrag.
          Grensen for feltet kalles et <strong>vannskille</strong> (topografisk eller hydrogeologisk).
        </p>

        <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-xs font-mono space-y-2 my-4">
          <p className="font-semibold text-primary font-sans text-sm">Vannbalanseligningen for et nedbørsfelt:</p>
          <p className="text-foreground text-sm font-bold">P = Q + E ± ΔS</p>
          <div className="text-muted-foreground font-sans text-xs space-y-1 pt-1">
            <p>• <strong>P (Precipitation / Nedbør):</strong> Total tilførsel som regn, snø, sludd eller hagl [mm eller m³].</p>
            <p>• <strong>Q (Runoff / Avrenning):</strong> Total vannføring ut av feltet i elveløpet og som dyp grunnvannsutstrømning [mm eller m³].</p>
            <p>• <strong>E (Evapotranspirasjon):</strong> Summen av direkte fordampning fra vann, snø og jord (evaporasjon) pluss plantenes væsketap via spalteåpninger (transpirasjon) [mm eller m³].</p>
            <p>• <strong>ΔS (Change in Storage / Magasinendring):</strong> Netto endring i feltets vannlager i snø, isbreer, markvannssonen, grunnvannet, innsjøer, myrer og elveleier [mm eller m³].</p>
          </div>
        </div>

        <div className="my-6">
          <KretslopDiagram />
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Feltets magasiner: Fra markvann til dype akviferer
        </h3>
        <p>
          Når regn eller smeltevann treffer bakken, avgjøres vannets videre vei av underlagets egenskaper:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Infiltrasjon:</strong> Vannets inntrengning gjennom jordoverflaten. Infiltrasjonskapasiteten
            er høy i grov sand, grus og porøs skogsjord, men lav i tett leirjord, frossen mark (tele) og på bart fjell.
            Når nedbørsintensiteten overstiger infiltrasjonskapasiteten (Hortonsk overflateavrenning), dannes overflatevann umiddelbart.
          </li>
          <li>
            <strong>Umettet sone (Markvannssonen):</strong> Det øverste jordlaget der porene mellom jordpartiklene inneholder
            både luft og vann bundet med kapillærkrefter. Planter henter sitt vann herfra. Når markvannet når sin
            <em> feltkapasitet</em>, kan ikke mer vann holdes tilbake mot tyngdekraften, og overskuddsvann perkolerer
            videre nedover.
          </li>
          <li>
            <strong>Grunnvannsspeilet og mettet sone:</strong> Dybdenivået der alle porer i sedimentene og sprekker i fjellet
            er 100 % fylt med vann under hydrostatisk trykk. Grunnvannet beveger seg langsomt (centimeter til meter per døgn)
            gjennom geologiske formasjoner mot elver og innsjøer (grunnvannstilførsel / basisflyt).
          </li>
          <li>
            <strong>Akviferer:</strong> Geologiske lag med høy porøsitet og permeabilitet som kan lagre og lede store mengder
            grunnvann. I Norge utgjør glasifluviale breelvdeltaer og eskere (sand og grus) våre beste grunnvannsmagasiner.
            Marin leire under marin grense fungerer derimot som en tett <em>akvitard</em> som hindrer vanngjennomstrømning.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 2. HYDROGRAMANALYSE */}
      <CollapsibleSection
        title="Hydrogramanalyse: Matematikken og fysikken bak en flombølge"
        subtitle="Enhetshydrogram, flomtopp (Q_max), retardasjonstid og resesjonskurve"
        badge="Hydrogram"
        badgeVariant="sky"
      >
        <p>
          Et <strong>hydrogram</strong> er en grafisk fremstilling av vannføring (m³/s) eller vannstand mot tid ved et bestemt tverrsnitt i et vassdrag. Hydrogrammet er vassdragets
          «EKG»: Det avslører hvordan nedbørsfeltet omdanner en meterologisk nedbørshendelse (vist som et <em>hyetogram</em>)
          til en hydraulisk flombølge nedstrøms.
        </p>

        <div className="my-6">
          <HydrographDiagram />
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Hydrogrammets fire hoveddeler
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-foreground/90">
          <li>
            <strong>Basisflyt (Baseflow):</strong> Den jevne, stabile grunnvannsdrenerte vannføringen i elva før nedbøren starter.
          </li>
          <li>
            <strong>Stigende kurve (Rising limb):</strong> Den bratte delen av kurven der overflateavrenning og rask
            grunnvannsrespons fra nærliggende dalsider når elveleiet.
          </li>
          <li>
            <strong>Flomtopp (Peak discharge, Q_max):</strong> Det høyeste registrerte vannføringsnivået under flommen.
            Dette er det dimensjonerende tallet for flomsikring, flomvoller og dimensjonering av kulverter og bruspenn.
          </li>
          <li>
            <strong>Retardasjonstid (Lag time, t_L):</strong> Tidsdifferansen mellom <em>tyngdepunktet i nedbøren</em> og
            <em> flomtoppen i elva</em>. Kort lag time betyr at flommen kommer som en brå «flash flood» nesten uten forvarsel.
            Lang lag time gir god tid til beredskap og evakuering.
          </li>
          <li>
            <strong>Synkende kurve (Recession limb):</strong> Kurven etter flomtoppen der elva faller tilbake. Resesjonskurven
            er nesten alltid slakere enn stigningen og styres av langsom tømming av feltmagasiner (innsjøer, myrer og dypere grunnvann).
          </li>
        </ol>

        <PhotoFigure
          src="/images/fig-ekstremnedbor.jpg"
          alt="Mørke bygeskyer og intens styrtregn over et norsk dalføre med bratte fjellsider"
          heading="Når nedbørsfeltet fylles fortere enn det kan lagre"
          caption="Intens konvektiv nedbør over bratte, sedimentfattige fjellsider gir ekstremt rask overflateavrenning, minimal retardasjonstid og en spiss, eksplosiv flomtopp på hydrogrammet. I flate innlandsfelt med store innsjøer flates toppen derimot ut og forsinkes i dager til uker."
          marks={[
            { x: 35, y: 28, n: "1", text: "Bygesky (Cumulonimbus)", tone: "cold" },
            { x: 62, y: 72, n: "2", text: "Bratte dalsider", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Skybrudd: Konvektiv nedbør kan overskride 30–50 mm/t lokalt, noe som sprenger infiltrasjonsevnen til all naturlig vegetasjon." },
            { n: "2", label: "Relieff og konsentrasjonstid: I bratte V-daler samles vannet i hovedelva på under 1–2 timer, noe som utløser erosjon i elveløpet og transport av grov bunnlast." },
          ]}
        />

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Hvilke faktorer styrer hydrogrammets form?
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-2 font-semibold">Feltfaktor</th>
                <th className="pb-2 font-semibold">Egenskap som gir spiss, bratt topp (høy Q_max, kort t_L)</th>
                <th className="pb-2 font-semibold">Egenskap som gir bred, lav topp (demping, lang t_L)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              <tr>
                <td className="py-2.5 font-medium text-foreground">Nedbørsfeltets form</td>
                <td className="py-2.5 text-rose-400">Sirkulært eller vifteformet (vann fra alle deler ankommer samtidig)</td>
                <td className="py-2.5 text-emerald-400">Avlangt, smalt felt (avrenningen fra øvre del ankommer lenge etter nedre del)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-foreground">Relieff / Terrenghelning</td>
                <td className="py-2.5 text-rose-400">Bratt fjellterreng (høy vannhastighet på overflaten)</td>
                <td className="py-2.5 text-emerald-400">Slakt lavland / sletter (lav vannhastighet)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-foreground">Innsjø- og myrprosent (A_SE)</td>
                <td className="py-2.5 text-rose-400">0–1 % (ingen naturlige buffere; alt vann renner uhindret)</td>
                <td className="py-2.5 text-emerald-400">&gt;5–10 % (innsjøer fordrøyer flombølgen enormt og kutter toppen)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-foreground">Jordsmonn og geologi</td>
                <td className="py-2.5 text-rose-400">Bart fjell, tett leirjord eller tele/frossen mark</td>
                <td className="py-2.5 text-emerald-400">Dype sand- og grusavsetninger med høy infiltrasjonskapasitet</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-foreground">Menneskelige inngrep</td>
                <td className="py-2.5 text-rose-400">Urbanisering, asfaltering, takflater og bekkelukking i rør</td>
                <td className="py-2.5 text-emerald-400">Vannkraftmagasiner med reguleringskapasitet (kutter flomtoppen) og våtmarker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 3. INTERAKTIV HYDROGRAM-SIMULATOR */}
      <CollapsibleSection
        title="Interaktiv simulator: Hydrogram og nedbørsfeltmodell"
        subtitle="Eksperimenter med nedbørsintensitet, feltareal, innsjømagasinering og urbanisering"
        badge="Interaktiv modell"
        badgeVariant="positive"
      >
        <p className="text-sm text-muted-foreground">
          Juster feltets parametere under for å observere hvordan matematiske hydrologiske modeller
          beregner flomtopp, spesifikk avrenning, retardasjonstid og flomkategori.
          Bytt til fanen «Urbanisering» for å sammenligne urørt natur med en tettbygd by,
          eller utforsk casestudien av ekstremværet Hans.
        </p>

        <HydrographCatchmentModel />
      </CollapsibleSection>

      {/* 4. FLOMREGIMER I NORGE */}
      <CollapsibleSection
        title="Flomregimer i Norge: Regn-, snøsmelte- og kombinasjonsflom"
        subtitle="Geografiske ulikheter mellom kyst og innland"
        badge="Flomtyper"
        badgeVariant="amber"
      >
        <p>
          I Norge er flomdynamikken sterkt differensiert etter landets varierte geografi, topografi og klimasoner.
          Vi deler flommene inn i tre hovedtyper:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="rounded-xl border border-sky-500/30 bg-card p-4 space-y-2">
            <span className="rounded bg-sky-500/20 px-2 py-0.5 text-xs font-semibold text-sky-300">
              1. Regnflom
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Utløses av kraftig frontnedbør eller intense byger. Typisk for <strong>Vestlandet, Trøndelag og Nord-Norge</strong> om
              høsten og vinteren. Kjennetegnes av bratte nedbørsfelt, kort retardasjonstid og rask kulminasjon.
            </p>
          </div>

          <div className="rounded-xl border border-teal-500/30 bg-card p-4 space-y-2">
            <span className="rounded bg-teal-500/20 px-2 py-0.5 text-xs font-semibold text-teal-300">
              2. Snøsmelteflom (Vårflom)
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Utløses av vedvarende høye døgngrader om våren/forsommeren (mai–juni) som smelter snømagasinet i fjellet.
              Typisk for <strong>de store innlandsvassdragene på Østlandet og i Finnmark</strong> (Glomma, Trysilelva, Tana).
              Kurven er bred og varer i uker.
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-card p-4 space-y-2">
            <span className="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
              3. Kombinasjonsflom
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Den farligste flomtypen: <strong>Regn på snø (rain-on-snow)</strong> kombinert med høye temperaturer og tele.
              Kondensasjonsvarme og regn akselererer snøsmeltingen dramatisk, samtidig som frossen mark hindrer all infiltrasjon.
            </p>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Hva er IKKE flom i geofag 1?
        </h3>
        <p>
          I dagligtale blandes ofte ulike fenomener sammen. På eksamen er det avgjørende å ha presise faglige definisjoner:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Flom:</strong> Unormalt høy vannføring i et <em>naturlig vassdrag</em> (bekk, elv eller innsjø)
            som går over sine vanlige bredder og oversvømmer tilgrensende landområder (elvesletter/flommark).
          </li>
          <li>
            <strong>Overvann i kjeller:</strong> Skyldes at det kommunale overvannsnettet (rør og sluk i gaten)
            blir overbelastet av lokal styrtregn, eller at vann trenger inn gjennom grunnmur fordi dreneringen svikter.
            Dette er et teknisk/infrastrukturelt overvannsproblem, ikke en vassdragsflom.
          </li>
          <li>
            <strong>Stormflo:</strong> Ekstremt høy <em>havvannstand</em> langs kysten forårsaket av lavt atmosfærisk lufttrykk
            og kraftig pålandsvind som stuver sjøvann inn mot land, ofte sammenfallende med astronomisk springflo.
            Stormflo tilhører kyst- og havoceanografien, ikke ferskvannshydrologien.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 5. CASESTUDIE: EKSTREMVÆRET HANS 2023 */}
      <CollapsibleSection
        title="Ekstremværet Hans (2023): Forløp, metning og geofysiske skademekanismer"
        subtitle="Norgeshistoriens mest kostbare naturkatastrofe"
        badge="Casestudie"
        badgeVariant="warning"
      >
        <p>
          Ekstremværet «Hans» rammet Sør-Norge 7.–9. august 2023 og demonstrerte med all tydelighet hvorfor
          samspillet mellom geosfæren og hydrosfæren kan bli katastrofalt når terskelverdier overskrides.
        </p>

        <Callout title="De hydrologiske faktaene om Hans (NVE & MET, 2023)">
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>
              <strong>Atmosfærisk tilførsel:</strong> Et lavtrykk fra øst/sørøst transporterte uvanlig varme og fuktige
              luftmasser fra kontinentet. Meteorologisk institutt registrerte nedbørrekord ved 12 målestasjoner på Østlandet.
            </li>
            <li>
              <strong>Ekstrem forutgående markfuktighet:</strong> Juli 2023 var den våteste julimåneden på over 100 år i Innlandet.
              Grunnvannsnivået og markfuktigheten var rekordhøy før Hans i det hele tatt startet. Jordens porevolum var
              fullstendig vannmettet ($\Delta S \approx 0$).
            </li>
            <li>
              <strong>Historisk flomrespons:</strong> NVE registrerte over 50-årsflom på hele 52 målestasjoner, og 45 av dem
              målte sin høyeste vannføring noensinne siden målestart (forbi storflommene i 1995 og 1967).
            </li>
            <li>
              <strong>Tidsforskjell i kulminasjon:</strong> Mens sideelvene i Gudbrandsdalen og Valdres kulminerte 8.–9. august,
              brukte flombølgen dager på å fylle de store innsjøene: Mjøsa og Øyeren kulminerte 13. august, mens Tyrifjorden
              først nådde toppen 16. august.
            </li>
            <li>
              <strong>Samfunnsmessige konsekvenser:</strong> Tusenvis ble evakuert, jernbanebroen ved Randklev kollapset på grunn
              av undergraving (erosjon rundt brupilarer), riksvei 3 og E6 ble stengt, og demningen ved Braskereidfoss kraftverk
              ble delvis oversvømmet og brøt sammen. Skadeomfanget ble anslått til over 5 milliarder kroner (DSB, 2024).
            </li>
          </ul>
        </Callout>

        <div className="my-6">
          <GeoMap
            center={[60.85, 11.5]}
            zoom={7}
            markers={[
              { lat: 60.8833, lng: 11.5667, label: "Elverum (Glomma): 50-årsflom og oversvømte flomvoller" },
              { lat: 61.56, lng: 10.15, label: "Ringebu: Randklev bro kollapset i Lågen etter undergraving" },
              { lat: 60.79, lng: 10.69, label: "Gjøvik / Mjøsa: Innsjøen kulminerte 13. august med over 2 meters stigning" },
              { lat: 60.05, lng: 10.05, label: "Tyrifjorden / Vikersund: Ekstrem innsjøflom kulminerte først 16. august" },
            ]}
            heading="Ekstremværet Hans 2023 i Glommavassdraget"
            caption="Georeferert oversiktskart over kjerneområdet for ekstremværet Hans i august 2023. Merk hvordan flommen forflyttet seg nedover vassdraget fra bratte sideelver til de store innsjømagasinene."
          />
        </div>
      </CollapsibleSection>

      {/* 6. FLOMRISIKOHÅNDTERING OG FARESONEKART */}
      <CollapsibleSection
        title="Flomrisikohåndtering, NVE-faresonekart og arealplanlegging"
        subtitle="Gjentaksintervaller, TEK17, klimapåslag og sikringstiltak"
        badge="Samfunnssikkerhet"
        badgeVariant="primary"
      >
        <p>
          Flom er en naturlig prosess som skaper fruktbare elvesletter og våtmarker. Flom blir først en <strong>naturfare</strong>
          når samfunnet bygger boliger, skoler, sykehus og infrastruktur i flomutsatte dalbunner.
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Gjentaksintervall og statistisk flomberegning
        </h3>
        <p>
          Flomstørrelser angis statistisk med et <strong>gjentaksintervall (returperiode, T)</strong>:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            En <strong>20-årsflom (Q₂₀)</strong> er en flomstørrelse som i gjennomsnitt inntreffer én gang hvert 20. år.
            I ethvert gitt år er sannsynligheten for at den inntreffer $1/20 = 5\,\%$.
          </li>
          <li>
            En <strong>100-årsflom (Q₁₀₀)</strong> har en årlig sannsynlighet på $1/100 = 1\,\%$.
          </li>
          <li>
            En <strong>200-årsflom (Q₂₀₀)</strong> har en årlig sannsynlighet på 1/200 = 0,5 %.
          </li>
          <li>
            En <strong>1000-årsflom (Q₁₀₀₀)</strong> har en årlig sannsynlighet på 1/1000 = 0,1 %.
          </li>
        </ul>

        <div className="rounded-xl border border-border bg-card p-4 my-4 space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Klimapåslag i NVEs flomberegninger</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            I et varmere klima fordamper mer vann fra havet (Clausius-Clapeyron-ligningen tilsier ~7 % mer fuktighet per grad oppvarming).
            Dette gir mer intense byger og økt flomfrekvens. Norges vassdrags- og energidirektorat (NVE) krever derfor at det
            legges inn et <strong>klimapåslag på mellom 20 % og 40 %</strong> på fremtidige 200-årsflommer når nye boligfelt,
            veier og flomverk prosjekteres frem mot år 2100.
          </p>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Byggteknisk forskrift (TEK17) og sikkerhetsklasser for flom
        </h3>
        <p>
          Kommunene er lovpålagt å legge NVEs flomfaresonekart til grunn i sine arealplaner etter plan- og bygningsloven.
          Byggteknisk forskrift (TEK17 § 7-2) deler byggverk inn i tre sikkerhetsklasser mot flom:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
          <div className="rounded-lg border border-border bg-background/50 p-3">
            <span className="font-bold text-sky-400">Sikkerhetsklasse F1 (Q₂₀)</span>
            <p className="mt-1 text-muted-foreground">
              Byggverk med liten konsekvens: Garasjer, naust, lagerbygg, mindre landbruksbygg.
              Maks tillatt årlig sannsynlighet for oversvømmelse er 1/20.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background/50 p-3">
            <span className="font-bold text-amber-400">Sikkerhetsklasse F2 (Q₂₀₀)</span>
            <p className="mt-1 text-muted-foreground">
              Byggverk med middels konsekvens: <strong>Bolighus, hytter, kontorbygg, barnehager og skoler.</strong>
              Må sikres mot 200-årsflom inkludert klimapåslag.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background/50 p-3">
            <span className="font-bold text-rose-400">Sikkerhetsklasse F3 (Q₁₀₀₀)</span>
            <p className="mt-1 text-muted-foreground">
              Byggverk med stor konsekvens for liv og helse: <strong>Sykehus, beredskapssentre, brannstasjoner og transformatorstasjoner.</strong>
              Må tåle 1000-årsflom uten funksjonssvikt.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-erosjonssikring.jpg"
          alt="Erosjonssikring og flomvoll med store steinblokker (plastring) langs et norsk vassdrag"
          heading="Fysisk flom- og erosjonssikring i vassdrag"
          caption="For å beskytte eksisterende bebyggelse langs elveløp bygges flomvoller og erosjonssikring med grov sprengstein (steinsetting / plastring). Plastringen hindrer at flomelvas høye skjærspenning graver ut elvebredden og utløser utglidninger."
          marks={[
            { x: 45, y: 55, n: "1", text: "Steinplastring", tone: "cold" },
            { x: 80, y: 35, n: "2", text: "Flomvoll", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Plastring med blokkstein: Steinene må dimensjoneres slik at de tåler vannhastigheten under dimensjonerende flom uten å vaskes ut (Hjulstrøms kurve)." },
            { n: "2", label: "Flomvoll med frisone: Vollen må ha tilstrekkelig fribord (vanligvis 0,5 meter over beregnet 200-årsflomvannstand) for å hindre overtopping ved bølgeslag." },
          ]}
        />
      </CollapsibleSection>

      {/* 7. NØKKELBEGREPER OG QUIZ */}
      <CollapsibleSection
        title="Nøkkelbegreper og eksamensrettet quiz"
        subtitle="Kvalitetssikring for privatister og VG3 Geofag 1"
        badge="Begreper & Test"
        badgeVariant="neutral"
      >
        <h3 className="font-display text-xl font-medium tracking-tight">Viktige faglige begreper</h3>
        <TermGrid>
          <Term name="hydrogram" def="graf som viser elvens vannføring (m³/s) mot tid ved et bestemt tverrsnitt" />
          <Term name="nedbørsfelt" def="landarealet som drenerer alt overflate- og grunnvann til ett felles punkt i vassdraget" />
          <Term name="retardasjonstid (t_L)" def="tidsdifferansen mellom nedbørens tyngdepunkt og flomtoppen (Q_max)" />
          <Term name="magasin (lager)" def="der vann lagres i feltet: snø, markvann, grunnvann, innsjøer, myrer og elveløp" />
          <Term name="innsjøprosent (A_SE)" def="andel av nedbørsfeltet dekket av innsjøer; demper flomtoppen og forlenger retardasjonstiden" />
          <Term name="kombinasjonsflom" def="flom utløst av kraftig regn på snødekke (rain-on-snow) kombinert med tele i bakken" />
          <Term name="gjentaksintervall" def="statistisk beregnet gjennomsnittlig tid mellom flommer av en gitt størrelse (f.eks. Q200)" />
          <Term name="LOD" def="lokal overvannsdisponering; tretrinnsstrategi for å infiltrere, fordrøye og trygge overvann lokalt" />
        </TermGrid>

        <div className="mt-8 border-t border-border/60 pt-6">
          <h3 className="font-display text-xl font-medium tracking-tight mb-2">
            Eksamensrettet flervalgsquiz (LK20 Geofag 1)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Test dine kunnskaper om hydrologi, hydrogramanalyse og flomrisiko:
          </p>

          <Quiz
            questions={[
              {
                prompt: "Hva kjennetegner et hydrogram fra et lite, bratt nedbørsfelt på Vestlandet med tynt jordsmonn og lav innsjøprosent?",
                options: [
                  "En lav, bred flomtopp med flere dagers forsinkelse (lang retardasjonstid).",
                  "En bratt stigende kurve, svært høy og spiss flomtopp (Q_max) og kort retardasjonstid (lag time).",
                  "Vannføringen holder seg fullstendig uendret uansett nedbørmengde.",
                  "Basisflyten fra grunnvannet overstiger overflateavrenningen gjennom hele flomforløpet.",
                ],
                answer: 1,
                explain:
                  "I et bratt felt med bart fjell og uten innsjøer eller myrer finnes det nesten ingen magasinering. Regnvannet renner momentant på overflaten ned til elva og gir en spiss flomtopp nesten uten forsinkelse.",
              },
              {
                prompt: "Hvorfor utløste ekstremværet Hans (august 2023) 50- til over 100-årsflom på over 50 målestasjoner på Østlandet?",
                options: [
                  "Fordi det falt over 1000 mm nedbør på 24 timer.",
                  "Fordi en uvanlig våt juli hadde mettet all markfuktighet på forhånd, slik at bakken hadde null infiltrasjonskapasitet og nesten 100 % av nedbøren ble til direkte overflateavrenning.",
                  "Fordi alle reguleringsdammene i Glomma ble åpnet med vilje for å tømme magasinene.",
                  "Fordi flommen utelukkende skyldtes ekstrem snøsmelting i høyfjellet midt på sommeren.",
                ],
                answer: 1,
                explain:
                  "Selv om nedbøren var rekordhøy, var den avgjørende geofaglige årsaken at markvannssonen allerede var fullstendig vannmettet. Da fantes det ingen magasinbuffer i jorda, og vannet strømmet rett ut i elvene.",
              },
              {
                prompt: "Hva er den fundamentale hydrologiske forskjellen mellom en reguleringsdam og asfaltering av et nedbørsfelt?",
                options: [
                  "Begge tiltak øker flomtoppen nedstrøms i vassdraget.",
                  "En reguleringsdam kutter flomtoppen og fordrøyer vannet, mens asfaltering fjerner infiltrasjonen, mangedobler overflateavrenningen og gjør flomtoppen høyere og tidligere.",
                  "Asfalt forsinker vannet, mens demningen gjør flommen spissere.",
                  "Ingen av inngrepene har noen målbar effekt på hydrogrammet.",
                ],
                answer: 1,
                explain:
                  "Asfaltering (tette flater) øker avrenningskoeffisienten mot 0,9 og forkorter reisetiden dramatisk, noe som hever flomtoppen. Et reguleringsmagasin kan derimot holde tilbake flomvann og slippe det kontrollert ut.",
              },
              {
                prompt: "Ifølge byggteknisk forskrift (TEK17), hvilken flomstørrelse må et nytt bolighus (sikkerhetsklasse F2) dimensjoneres og sikres mot?",
                options: [
                  "En 20-årsflom (Q₂₀).",
                  "En 200-årsflom (Q₂₀₀) inkludert klimapåslag.",
                  "En 1000-årsflom (Q₁₀₀₀) uten klimapåslag.",
                  "Kun den største flommen som er registrert i kommunen de siste 5 årene.",
                ],
                answer: 1,
                explain:
                  "TEK17 krever at boligbygg (klasse F2) skal tåle 200-årsflom. For nye tiltak skal det i tillegg legges til et klimapåslag (typisk 20–40 %) som tar høyde for fremtidig klimaendring frem mot 2100.",
              },
              {
                prompt: "Hvorfor kaller vi en 'kombinasjonsflom' (rain-on-snow) for den farligste flomtypen i Norge?",
                options: [
                  "Fordi snøen suger opp alt regnet og hindrer vannet i å renne vekk.",
                  "Fordi varmt regn og kondensasjon smelter store mengder snø samtidig som tele/is i bakken blokkerer infiltrasjon, slik at smeltevann og regn summeres til enorm overflateavrenning.",
                  "Fordi den bare skjer langs kysten om sommeren.",
                  "Fordi elva fryser til is og demmer opp vannet til det eksploderer.",
                ],
                answer: 1,
                explain:
                  "Ved mildvær og regn på et snødekke tilføres energi både fra regndråpene og latent varme fra fuktig luft. Sammen med vanntett tele i jorda skapes en dobbel flomrespons som historisk har forårsaket noen av Norges mest katastrofale flommer (f.eks. Vesleofsen i 1995).",
              },
            ]}
          />
        </div>
      </CollapsibleSection>
    </TopicLayout>
  );
}
