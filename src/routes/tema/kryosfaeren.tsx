import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  GlacierMassBalanceDiagram,
  PermafrostDiagram,
  SeaIceAlbedoFeedbackDiagram,
  SlabAvalancheDiagram,
} from "@/components/diagrams";
import { GlacierMassBalanceModel } from "@/components/models/glacier-mass-balance-model";
import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/kryosfaeren")!;

export const Route = createFileRoute("/tema/kryosfaeren")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/kryosfaeren",
    }),
  component: KryosfaerenPage,
});

function KryosfaerenPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Kryosfæren"
      title="Kryosfæren: Massebalanse, permafrost og havis"
      lead="Kryosfæren er alt frosset vann på jordkloden: breer, havis, permafrost og sesongsnø. Med sin høye albedo er isen planetens hvite speil. Når temperaturen stiger, utløses selvforsterkende tilbakekoblinger som endrer havstrømmer, truer infrastruktur og former naturfarer i Norge og Arktis."
      banner="/images/fig-albedo.jpg"
      bannerAlt="Is og snø mot mørkt hav — albedoen som styrer jordas strålingsbalanse"
      prev={{ to: "/tema/klima/amoc", label: "Forrige: AMOC" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KILDER.kryosfaeren}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i Geofag 2 (LK20)">
        <p>
          Målet er at du skal kunne <em>gjøre rede for vekselvirkninger mellom jordsystemene og hvordan de påvirker
          kryosfæren, atmosfæren og havet</em>, forklare <em>bremassebalanse, permafrostens dynamikk og havisens albedoeffekt</em>,
          samt <em>vurdere risiko ved naturfarer knyttet til kryosfæren</em> (snøskred og fjellskred utløst av tining) (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      {/* ── 1. KRYOSFÆREN I JORDSYSTEMET ────────────────────────────── */}
      <CollapsibleSection
        title="1. Kryosfæren i jordsystemet: Areal mot tykkelse"
        subtitle="De frosne komponentene · Hvorfor areal slår tykkelse i energibudsjettet"
        badge="Jordsystemet"
        badgeVariant="primary"
        defaultOpen={true}
      >
        <p>
          <strong>Kryosfæren</strong> omfatter alle deler av jordsystemet der vann befinner seg i frossen form:
          innlandsis, iskapper, dalbreer, havis, snødekke, permafrost og tele i bakken (IPCC, 2021).
          Sammen med atmosfæren, hydrosfæren, biosfæren og litosfæren utgjør den et tett sammenvevd system.
        </p>

        <p>
          Når vi analyserer kryosfærens rolle i klimasystemet, er det avgjørende å skille mellom to ulike egenskaper:
          <strong>areal</strong> og <strong>volum (tykkelse)</strong>:
        </p>

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
            <h4 className="font-semibold text-sky-300 text-sm">
              ☀️ Arealet styrer strålingsbalansen (Albedo)
            </h4>
            <p className="mt-2 text-muted-foreground">
              Havis og sesongsnø er tynne lag (fra noen centimeter til få meter tykke), men dekker enorme flater
              — opptil <strong>flere titalls millioner kvadratkilometer</strong>.
            </p>
            <p className="mt-2 text-muted-foreground">
              Fordi hvit snø og is reflekterer opptil 80–90 % av sollyset (høy albedo), fungerer overflaten som
              et gigantisk speil. En liten endring i <em>arealet</em> har umiddelbar og massiv effekt på hvor mye
              solenergi planeten absorberer.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
            <h4 className="font-semibold text-indigo-300 text-sm">
              🌊 Volumet styrer havnivå og treghet
            </h4>
            <p className="mt-2 text-muted-foreground">
              Innlandsisen på Grønland og i Antarktis er opptil <strong>3–4 kilometer tykk</strong> og lagrer over
              68 % av verdens ferskvann.
            </p>
            <p className="mt-2 text-muted-foreground">
              Dersom hele Grønlandsisen smelter, vil det globale havnivået stige med ca. <strong>7,4 meter</strong> (IPCC, 2021).
              Hvis Antarktis smelter helt, stiger havet med formidable <strong>58 meter</strong>.
              På grunn av den enorme massen har disse iskappene enorm termisk treghet og reagerer over århundrer.
            </p>
          </div>
        </div>

      </CollapsibleSection>

      {/* ── 2. BREMASSEBALANSE OG ELA ───────────────────────────────── */}
      <CollapsibleSection
        title="2. Bremassebalanse: ELA, gradient og NVEs måleserier"
        subtitle="Matematisk balanseformel · Hvorfor ett plussår ikke snur en negativ trend"
        badge="Brefysikk"
        badgeVariant="teal"
      >
        <p>
          En <strong>isbre</strong> er en dynamisk masse av is og snø som beveger seg langsomt nedover under sin
          egen vekt og tyngdekraftens påvirkning (Benn & Evans, 2010). Breens helse overvåkes ved å måle dens{" "}
          <strong>massebalanse</strong> over et hydrologisk år (fra 1. oktober til 30. september i Norge) (NVE, 2023).
        </p>

        <GlacierMassBalanceDiagram />

        <div className="my-4 rounded-xl border border-border/70 bg-card p-4 space-y-3">
          <h4 className="font-display font-semibold text-base text-foreground">
            Bremassebalansens matematiske formel
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Massebalansen på et gitt punkt (eller høydenivå $z$) måles i <strong>meter vannekvivalenter (m v.e.)</strong>,
            som angir tykkelsen på vannlaget hvis all snø og is smeltet. Den spesifikke nettobalansen ($b_n$) er summen av
            tilførsel og tap:
          </p>

          <div className="my-2 rounded-lg bg-slate-900/90 p-3 text-center font-mono text-xs sm:text-sm font-semibold text-sky-400">
            b_n = b_w + b_s = c - a
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-2.5">
              <strong className="text-sky-300 block">Vinterbalanse (b_w eller c - Akkumulasjon):</strong>
              <p className="mt-0.5 text-muted-foreground">
                All masse som tilføres breen om vinteren, primært som vintersnø, påriming og snøskred fra
                omkringliggende fjellsider. Alltid et positivt tall ($b_w &gt; 0$).
              </p>
            </div>
            <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-2.5">
              <strong className="text-rose-300 block">Sommerbalanse (b_s eller a - Ablasjon):</strong>
              <p className="mt-0.5 text-muted-foreground">
                All masse som tapes om sommeren, primært ved smelting (overflateavrenning), sublimasjon
                og eventuell kalving i bredammer. Alltid et negativt tall ($b_s &lt; 0$).
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <h4 className="font-semibold text-primary text-sm">
              Likevektslinjen (ELA - Equilibrium Line Altitude)
            </h4>
            <p className="mt-2 text-muted-foreground">
              <strong>ELA</strong> er høydenivået der akkumulasjon og ablasjon er nøyaktig like store over året ($b_n = 0$).
              Det er grensen mellom:
            </p>
            <ul className="mt-1.5 list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong>Akkumulasjonsområdet (øverst):</strong> Netto overskudd av snø ($b_n &gt; 0$). Vintersnøen overlever
                sommeren og omdannes gradvis til firn og deretter breis.
              </li>
              <li>
                <strong>Ablasjonsområdet (nederst):</strong> Netto underskudd ($b_n &lt; 0$). All vintersnø og et lag av
                gammel breis smelter bort i løpet av sommeren.
              </li>
            </ul>
            <p className="mt-2 text-primary font-medium">
              Når somrene blir varmere, kryper ELA oppover fjellet. Akkumulasjonsarealet skrumper inn, og breen
              mister masse!
            </p>
          </div>

          <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
            <h4 className="font-semibold text-teal-300 text-sm">
              Balansegradient (db/dz) og AAR
            </h4>
            <p className="mt-2 text-muted-foreground">
              <strong>Balansegradienten (db/dz):</strong> Beskriver hvor raskt massebalansen endrer seg med
              høyden. Maritime kystbreer (f.eks. Ålfotbreen og Nigardsbreen) har bratt gradient med enorme snødybder
              og voldsom smelting. Kontinentale breer (f.eks. Storbreen i Jotunheimen eller breer på Svalbard) har
              slakere gradient.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong>AAR (Accumulation Area Ratio):</strong> Forholdet mellom akkumulasjonsarealet og det totale
              brearealet. For at en temperert norsk bre skal være i balanse ($B_n = 0$), må normalt{" "}
              <strong>AAR ligge mellom 0,55 og 0,65</strong> (55–65 % av breen må ligge over ELA).
            </p>
          </div>
        </div>

        {/* Vår nye interaktive modell */}
        <GlacierMassBalanceModel />

        <div className="rounded-xl border border-border/70 bg-card p-4 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">NVEs måleserier og klimatrenden:</strong>
          <p className="mt-1">
            Norges vassdrags- og energidirektorat (NVE) har målt massebalanse på norske referansebreer siden 1949
            (Storbreen har en av verdens lengste kontinuerlige måleserier). Etter år 2000 har nesten samtlige norske
            breer hatt markant negativ kumulativ massebalanse.
          </p>
          <p className="mt-1.5">
            Et enkelt år med snørik vinter kan gi positiv massebalanse ($B_n &gt; 0$), men det snur ikke den langsiktige
            trenden. Breen er et lavpassfilter for klimaet: Den reagerer på det akkumulerte underskuddet over tiår.
            Når bretungen trekker seg tilbake, er det et resultat av mange påfølgende år med ELA liggende for høyt.
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 3. PERMAFROST OG DET AKTIVE LAGET ───────────────────────── */}
      <CollapsibleSection
        title="3. Permafrost og det aktive laget: Tining og geofarer"
        subtitle="Termisk definisjon · Tap av bæreevne, fjellskred og klimapermafrost-tilbakekobling"
        badge="Geofarer"
        badgeVariant="amber"
      >
        <p>
          I geofag er definisjonen av <strong>permafrost</strong> strengt termisk (ikke materialbasert):
          Grunn (fjell, stein, sedimenter eller organisk materiale) som har en temperatur på{" "}
          <strong>0 °C eller lavere i minst to sammenhengende år</strong> (Gisnås et al., 2017).
        </p>

        <PermafrostDiagram />

        <div className="my-4 rounded-xl border border-border/70 bg-card p-4 space-y-3">
          <h4 className="font-display font-semibold text-base text-foreground">
            Det aktive laget og permafrostens vertikale struktur
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Permafrosten deles vertikalt i to soner:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-3">
              <strong className="text-amber-300 block">Det aktive laget (Active Layer)</strong>
              <p className="mt-1 text-muted-foreground">
                Det øverste overflatelaget som tiner hver sommer og fryser igjen hver vinter. Tykkelsen varierer
                fra <strong>30 cm til 2–3 meter</strong>, avhengig av sommerlufttemperatur, vegetasjon, snødekke
                og jordens varmeledningsevne. Alt biologisk liv og all menneskelig infrastruktur står i dette laget.
              </p>
            </div>
            <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-3">
              <strong className="text-sky-300 block">Selve permafrosten</strong>
              <p className="mt-1 text-muted-foreground">
                Ligger under det aktive laget og forblir frossent året rundt. På Svalbard kan permafrosten være
                opptil <strong>400–500 meter dyp</strong> i høyfjellet og ca. 100 meter i dalbunnen. I fastlands-Norge
                finnes permafrost i høyfjellet (typisk over 1200–1500 m o.h. i Sør-Norge og 600–900 m o.h. i Nord-Norge),
                samt i palsmyrer i Finnmark.
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 rounded-xl border border-rose-500/30 bg-rose-950/15 p-4 text-xs space-y-3">
          <h4 className="font-semibold text-rose-300 text-sm">
            Kritiske geofarer og konsekvenser av at permafrosten tiner:
          </h4>
          <ol className="list-decimal pl-5 space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <strong>Tap av mekanisk bæreevne og setningsskader:</strong> Når is i løsmasser tiner, mettes jorden
              av vann og mister sin indre friksjon. Bygninger, rullebanen på Svalbard lufthavn og vei- og rørnett
              som ble fundamentert i antatt stabil telegrunn, opplever dramatiske setningsskader og deformasjon.
            </li>
            <li>
              <strong>Fjellskred i høyfjellet:</strong> I bratte alpine fjellsider fungerer is i sprekker (isfylte
              sprekker) som en naturlig sementering som holder ustabile fjellblokker på plass. Når sommervarmen
              trenger dypere inn i fjellet og tiner permafrosten, smelter isarmeringen. Vanntrykket i sprekkene
              stiger, friksjonen forsvinner, og enorme steinmassiver raser ut (som observert i ustabile fjellpartier
              i Troms, Møre og Romsdal og Jotunheimen).
            </li>
            <li>
              <strong>Klimapermafrost-tilbakekoblingen:</strong> Permafrosten i Arktis inneholder anslagsvis
              1400–1600 milliarder tonn organisk karbon — dobbelt så mye som hele atmosfærens nåværende karboninnhold!
              Når grunnen tiner, våkner mikrober til liv og bryter ned det eldgamle plantematerialet.
              Under aerobe forhold frigjøres <strong>CO₂</strong>, og under oksygenfattige forhold i nydannede
              termokarst-innsjøer dannes den kraftige drivhusgassen <strong>CH₄ (metan)</strong>.
            </li>
          </ol>
        </div>
      </CollapsibleSection>

      {/* ── 4. HAVIS OG IS-ALBEDO-TILBAKEKOBLINGEN ───────────────────── */}
      <CollapsibleSection
        title="4. Havis og is-albedo-tilbakekoblingen"
        subtitle="Klodens hvite speil · Positiv tilbakekobling og arktisk forsterkning"
        badge="Klimatilbakekobling"
        badgeVariant="sky"
      >
        <p>
          <strong>Havis</strong> er frosset sjøvann som flyter på havoverflaten (NSIDC, u.å.).
          I motsetning til breer på land bidrar ikke havis direkte til havnivåstigning når den smelter
          (i henhold til Arkimedes' lov har den allerede fortrengt sitt eget volum i vann).
          Havisen har likevel en kolossal betydning for jordens klima på grunn av sin{" "}
          <strong>albedo-effekt</strong> og sin rolle som termisk isolator mellom havet og atmosfæren.
        </p>

        <SeaIceAlbedoFeedbackDiagram />

        <div className="my-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-3">
          <h4 className="font-semibold text-primary text-sm">
            Fysikken i albedo-kontrasten:
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Andelen reflektert solstråling kalles overflatens <strong>albedo ($\alpha$)</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
            <div className="rounded-lg bg-background/80 p-3 border border-border">
              <span className="text-sky-300 font-bold block">Snødekket havis: α ≈ 0,80 – 0,90</span>
              <p className="text-[11px] text-muted-foreground font-sans mt-1">
                Reflekterer 80–90 % av solenergien direkte tilbake til verdensrommet. Kun 10–20 % absorberes.
              </p>
            </div>
            <div className="rounded-lg bg-background/80 p-3 border border-border">
              <span className="text-amber-400 font-bold block">Åpent polarhav: α ≈ 0,06 – 0,08</span>
              <p className="text-[11px] text-muted-foreground font-sans mt-1">
                Reflekterer kun 6–8 %! Hele 92–94 % av den innkommende solenergien absorberes i havets øverste lag.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Dette betyr at når ett kvadratkilometer hvit havis erstattes av mørkt, åpent hav, absorberer havoverflaten{" "}
            <strong>over 6 ganger mer solvarme</strong>!
          </p>
        </div>

        <div className="my-4 rounded-xl border border-border/70 bg-card p-4 space-y-2 text-xs leading-relaxed">
          <h4 className="font-display font-semibold text-sm text-foreground">
            Den positive tilbakekoblingssløyfen (Ice-Albedo Feedback)
          </h4>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
            <li>Drivhusgasser varmer atmosfæren og havet.</li>
            <li>Sommerhavisen i Arktis smelter og trekker seg tilbake.</li>
            <li>Den mørke havoverflaten blottlegges, og albedoen faller dramatisk fra 0,85 til 0,07.</li>
            <li>Havet absorberer enorme mengder solenergi gjennom de lyse polardøgnene om sommeren.</li>
            <li>Det oppvarmede havvannet forsinker ny isdannelse om høsten og gjør vinterisen tynnere.</li>
            <li>Neste vår smelter den tynne isen enda raskere, og syklusen forsterker seg selv!</li>
          </ol>
          <p className="mt-2 text-primary font-medium">
            Dette er hovedårsaken til <strong>arktisk forsterkning (Arctic amplification)</strong>: Arktis har de siste
            tiårene blitt varmet opp tre til fire ganger raskere enn det globale gjennomsnittet!
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 5. SNØSKRED OG NATURFARER ───────────────────────────────── */}
      <CollapsibleSection
        title="5. Snøskred: Fysikk, svake lag og Varsom-faregrader"
        subtitle="Flakskredets mekanikk · Hvorfor faregrad 3 tar flest liv"
        badge="Naturfarer"
        badgeVariant="warning"
      >
        <p>
          Snø er et porøst, viskoelastisk materiale som kontinuerlig gjennomgår metamorfose (omkrystallisering)
          avhengig av temperaturgradienter og fuktighet i snødekket (Schweizer et al., 2003).
          De aller fleste fatale snøskredulykker i Norge forårsakes av <strong>flakskred (slab avalanches)</strong>.
        </p>

        <SlabAvalancheDiagram />

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-border/70 bg-card p-4">
            <h4 className="font-semibold text-foreground text-sm">
              Flakskredets tre forutsetninger:
            </h4>
            <ul className="mt-2 list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>
                <strong>1. Et bundet flak i overflaten:</strong> Et sammenhengende snølag (vindpakket snø eller
                hardt skarelag) med stor strekkfasthet.
              </li>
              <li>
                <strong>2. Et svakt lag under:</strong> Består ofte av ufestede krystaller med svak bindingsstyrke,
                slik som kantkorn, nedsnødd overflaterim eller begersnø (dyphoppesnø) dannet ved store
                temperaturforskjeller i snødekket.
              </li>
              <li>
                <strong>3. En hard skare/glideflate under:</strong> En glatt overflate som flaket kan gli uhindret på.
              </li>
              <li>
                <strong>4. Helningsvinkel:</strong> Nesten alle flakskred utløses i terreng som er brattere enn{" "}
                <strong>30 grader</strong> (mest frekvent mellom 35° og 45°).
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
            <h4 className="font-semibold text-amber-300 text-sm">
              Faregrad 1–5 på Varsom.no: Hvorfor tar faregrad 3 flest liv?
            </h4>
            <p className="mt-2 text-muted-foreground">
              Den offisielle europeiske skredfareskalaen har fem nivåer:
            </p>
            <div className="mt-1 space-y-1 font-mono text-[11px]">
              <div>1 - Liten (Grønn)</div>
              <div>2 - Moderat (Gul)</div>
              <div className="text-amber-300 font-bold">3 - Betydelig (Oransje) ← 80 % av dødsulykker!</div>
              <div>4 - Stor (Rød)</div>
              <div>5 - Meget stor (Svart)</div>
            </div>
            <p className="mt-2 text-muted-foreground">
              <strong>Fysisk og psykologisk forklaring:</strong> Risiko er definert som{" "}
              <em>Fare × Eksponering</em>. Ved faregrad 4 og 5 er skredfaren åpenbar for alle: Skred går av seg selv,
              fjelloverganger stenges og folk holder seg innendørs (lav eksponering).
            </p>
            <p className="mt-1.5 text-amber-200">
              Ved <strong>faregrad 3</strong> er været ofte fint, snøen innbydende og heisene åpne. Men det svake laget
              ligger skjult og krever kun vekten av én skiløper for å kollapse. Fordi mange ferdes i fjellet, blir
              eksponeringen maksimal!
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 6. EKSAMEN, BEGREPER OG QUIZ ────────────────────────────── */}
      <CollapsibleSection
        title="6. Eksamensrelevans, vanlige feil og begrepsapparat"
        subtitle="Nøkkelpoenger for Geofag 2 · Fagtermer og flervalgsoppgaver"
        badge="Eksamen"
        badgeVariant="default"
      >
        <Callout title="Viktig til eksamen om kryosfæren">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Massebalanse:</strong> $B_n = b_w + b_s$. En bre er i likevekt når $B_n = 0$. ELA er høyden der
              $b_n = 0$.
            </li>
            <li>
              <strong>Havis:</strong> Påvirker klimaet gjennom sitt enorme <em>areal og høye albedo</em>, ikke fordi den
              øker havnivået direkte ved smelting.
            </li>
            <li>
              <strong>Permafrost:</strong> Defineres termisk (&le; 0 °C i minst to år), ikke av hvorvidt det er synlig is i jorda.
              Det er det <em>aktive laget</em> som tiner om sommeren.
            </li>
            <li>
              <strong>Albedo-tilbakekobling:</strong> Smelting $\to$ lavere albedo $\to$ mer absorbert solstråling $\to$ mer smelting.
              En klassisk positiv tilbakekoblingsmekanisme.
            </li>
          </ul>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            ❌ <em>«Når havisen på Nordpolen smelter, stiger havet med flere meter.»</em><br />
            Nei! Havisen flyter allerede i vannet og har fortrengt en vannmasse tilsvarende sin egen vekt. Det er
            smelting av <em>isbreer på land</em> (f.eks. Grønland og Antarktis) som hever det globale havnivået.
          </p>
          <p className="mt-2">
            ❌ <em>«En snørik vinter beviser at breene ikke smelter.»</em><br />
            Feil! Vinterbalansen ($b_w$) er bare halve ligningen. Hvis sommeren er unormalt varm eller lang, vil
            ablasjonen ($b_s$) spise opp all vintersnøen og mer til, slik at nettobalansen ($b_n$) likevel blir sterkt negativ.
          </p>
        </Callout>

        <h3 className="font-display text-xl font-medium tracking-tight pt-2">Faglige nøkkelbegreper</h3>
        <TermGrid>
          <Term name="Massebalanse" def="Differansen mellom akkumulasjon (tilførsel av snø om vinteren) og ablasjon (tap av is og snø om sommeren) over et hydrologisk år." />
          <Term name="ELA (Likevektslinje)" def="Equilibrium Line Altitude; høydenivået på en bre der årlig akkumulasjon og ablasjon er nøyaktig like store (b_n = 0)." />
          <Term name="Balansegradient" def="Endringen i massebalanse per 100 meters høydeforskjell (db/dz). Bratt i maritime breer, slak i kontinentale breer." />
          <Term name="AAR" def="Accumulation Area Ratio; andelen av breens totale areal som ligger over likevektslinjen (ELA)." />
          <Term name="Permafrost" def="Litosfære (fjell eller løsmasser) som har en temperatur under 0 °C i minst to påfølgende år." />
          <Term name="Aktivt lag" def="Det øverste jordlaget over permafrosten som tiner hver sommer og fryser hver vinter." />
          <Term name="Albedo (α)" def="Forholdet mellom reflektert og innkommende solstråling, fra 0 (helt sort) til 1 (perfekt speil)." />
          <Term name="Is-albedo-tilbakekobling" def="Positiv klimamekanisme der smelting av is reduserer refleksjon, øker varmeopptak i havet og forsterker oppvarmingen." />
          <Term name="Flakskred" def="Snøskred der et sammenhengende, hardt snøflak over et svakt lag løsner og raser ned en fjellside brattere enn 30°." />
          <Term name="Arktisk forsterkning" def="Observasjonen av at Arktis varmes opp 3–4 ganger raskere enn det globale gjennomsnittet, primært drevet av havisens albedotap." />
        </TermGrid>

        <Quiz
          questions={[
            {
              prompt: "Hva skjer med Likevektslinjen (ELA) på en bre dersom somrene blir 2 °C varmere uten at vinternedbøren øker?",
              options: [
                "ELA synker nedover mot bretungen.",
                "ELA forblir uendret.",
                "ELA forskyves oppover fjellet, og akkumulasjonsarealet krymper.",
                "Breen slutter umiddelbart å bevege seg.",
              ],
              answer: 2,
              explain:
                "Varmere somre øker ablasjonen i alle høyder. Snøen må ligge høyere i terrenget for å overleve sommeren, så ELA heves og ablasjonssonen spiser opp breen.",
            },
            {
              prompt: "Hva kreves ifølge AAR-regelen for at en temperert norsk bre skal være i likevekt (Bn = 0)?",
              options: [
                "At 100 % av breen er dekket av nysnø året rundt.",
                "At akkumulasjonsområdet utgjør ca. 55–65 % av breens totale areal.",
                "At bretungen når helt ned til havnivå.",
                "At ELA ligger nøyaktig midt på bretungen.",
              ],
              answer: 1,
              explain:
                "Fordi ablasjonsgradienten nederst ofte er bratt og intens, må akkumulasjonsområdet normalt utgjøre 55–65 % av arealet for å balansere istapet i ablasjonssonen.",
            },
            {
              prompt: "Hva er den vitenskapelige definisjonen på permafrost?",
              options: [
                "Bakke som består av minst 80 % ren is.",
                "Grunn som holder temperatur på 0 °C eller lavere i minst to sammenhengende år.",
                "All mark som er dekket av snø i mer enn seks måneder.",
                "Isbreer som ikke smelter om sommeren.",
              ],
              answer: 1,
              explain:
                "Definisjonen er strengt termisk og uavhengig av materiale: Jord eller fast fjell som holder under 0 °C i minst to år på rad.",
            },
            {
              prompt: "Hvorfor er tining av permafrost i bratte fjellsider i Norge en alvorlig geofare?",
              options: [
                "Fordi fjellet smelter og blir til flytende lava.",
                "Fordi is i sprekker fungerer som armering; når isen tiner, oppstår vanntrykk og tap av friksjon som kan utløse katastrofale fjellskred.",
                "Fordi permafrosttining fører til jordskjelv med magnitude over 8.",
                "Fordi fjellene synker ned i mantelen.",
              ],
              answer: 1,
              explain:
                "I bratte fjellsider sementerer isen sprekkene. Tining svekker fjellmassens stabilitet og kan utløse store fjellskred som truer bebyggelse og kan skape flodbølger i fjorder.",
            },
            {
              prompt: "Hva er den viktigste klimamessige konsekvensen av at havisen i Polhavet erstattes av åpent hav om sommeren?",
              options: [
                "Havet blir ferskere og fordamper bort.",
                "Overflatens albedo faller fra ca. 0,85 til 0,07, slik at havet absorberer over 6 ganger mer solvarme og forsterker oppvarmingen (positiv tilbakekobling).",
                "Havnivået i Oslofjorden stiger med 5 meter umiddelbart.",
                "Passatvindene snur og blir til polare østavinder.",
              ],
              answer: 1,
              explain:
                "Albedo-kontrasten mellom hvit is og mørkt hav er enorm. Åpent hav suger til seg solvarme i stedet for å reflektere den, noe som driver arktisk forsterkning.",
            },
            {
              prompt: "Hvorfor inntreffer over 80 % av fatale snøskredulykker ved faregrad 3 (Betydelig), og ikke ved faregrad 4 eller 5?",
              options: [
                "Fordi faregrad 4 og 5 aldri forekommer i Norge.",
                "Fordi flakskred fysisk bare kan dannes ved faregrad 3.",
                "Fordi faregrad 4 og 5 holder folk unna fjellet, mens faregrad 3 kombinerer innbydende forhold med skjulte svake lag som kan utløses av én skiløper (høy eksponering).",
                "Fordi Varsom kun varsler opp til grad 3.",
              ],
              answer: 2,
              explain:
                "Risiko er fare ganget med eksponering. Ved faregrad 3 virker fjellet ofte trygt, men det kreves liten tilleggsbelastning for å utløse et flakskred, noe som gjør at mange ferdes der og tas.",
            },
          ]}
        />
      </CollapsibleSection>
    </TopicLayout>
  );
}
