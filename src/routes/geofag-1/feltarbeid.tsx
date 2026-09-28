import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import { FieldworkIllustrationDiagram } from "@/components/diagrams/geology-extra";
import { FeltbokDiagram } from "@/components/diagrams/ressurser";
import { GeoMap } from "@/components/geo-map";
import { FieldworkObservationModel } from "@/components/models/fieldwork-observation-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("feltarbeid")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/feltarbeid")({
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  shouldReload: true,
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("feltarbeid") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/feltarbeid",
    }),
  component: FeltarbeidPage,
});

function FeltarbeidPage() {
  const { post } = Route.useLoaderData();

  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Feltarbeid er ikke en tilfeldig skoletur der klassen beundrer naturen. Det er en streng vitenskapelig datainnsamlingsprosess. Uten nøyaktig tids- og stedsreferanse, kalibrerte måleverktøy, faglige HMS-vurderinger og objektiv skille mellom observasjon og tolkning, er dataene verdiløse. Her lærer du feltdesign fra bunnen av: strukturgeologisk kompassmåling (strøk og fall), sedimentologiske logger, hydrologisk vannføring og oppbyggingen av en fullverdig feltrapport."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Forrige: Geologiske ressurser",
      }}
      next={{
        to: "/geofag-1",
        label: "Fullført: Geofag 1 oversikt",
      }}
      kilder={KILDER.feltarbeid}
      posterSlug="feltarbeid"
      post={post}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            planlegge og gjennomføre geofaglig feltarbeid i geosfæren eller hydrosfæren, samle inn, bearbeide og tolke georefererte data,
            ivareta helse, miljø og sikkerhet (HMS), og presentere resultatene i en vitenskapelig feltrapport.
          </em>
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Den naturvitenskapelige metoden:</em> Hypotese, presis problemstilling, observasjon kontra tolkning og feilkilder.</p>
          <p>• <em>Georefererte primærdata:</em> UTM-koordinater (ETRS89), z (moh.), feltboka som juridisk dokument, skisser og målestokk.</p>
          <p>• <em>Fysiske målemetoder:</em> Strøk og fall med geologkompass, Wentworth kornfordeling, hastighets-areal-metoden i elv (Ott-flygel).</p>
          <p>• <em>HMS og eksamenskrav:</em> Risikomatrise (P × C), barrierer, og fylkesvise privatistkrav (f.eks. papirrapport i Vestland).</p>
        </div>
      </Callout>

      <div className="my-6">
        <FieldworkIllustrationDiagram />
      </div>

      {/* 1. DEN VITENSKAPELIGE FELTMETODEN */}
      <CollapsibleSection
        title="Den vitenskapelige undersøkelsen: Fra problemstilling til feltdesign"
        subtitle="Hypoteser, avgrensning og skillet mellom observasjon og tolkning"
        badge="Feltmetodikk"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          Alt vellykket feltarbeid starter lenge før man tar på seg fjellstøvlene. Forskjellen mellom en hyggelig
          tur og en vitenskapelig undersøkelse ligger i <strong>problemstillingen</strong> og <strong>feltdesignet</strong>.
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Hva er en geofaglig problemstilling?
        </h3>
        <p>
          En god problemstilling må være presis, avgrenset og testbar i felt mot geosfæren eller hydrosfæren.
          Å si at man skal «undersøke geologien i nærområdet» er ikke en problemstilling, det er et vagt tema.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-rose-500/30 bg-card p-4 space-y-2">
            <span className="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
              Uegnet problemstilling
            </span>
            <ul className="text-xs text-muted-foreground space-y-1 pt-1">
              <li>• «Vi skal se på steinene langs stien.»</li>
              <li>• «Hvordan er naturen i dalføret?»</li>
              <li>• «Er været fint nok til å bade i elva?»</li>
            </ul>
            <p className="text-[11px] text-muted-foreground pt-1">
              <em>Feil:</em> Mangler hypotese, avgrensing og målbare parametere. Kan verken bekreftes eller avkreftes.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-card p-4 space-y-2">
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
              Presis geofaglig problemstilling
            </span>
            <ul className="text-xs text-foreground/90 space-y-1 pt-1">
              <li>• «Hvordan varierer kornstørrelse og sorteringsgrad fra endemorenen til ravinedalen?»</li>
              <li>• «Viser strøk- og fallmålinger langs skjæringen tegn til kaledonsk foldning eller permisk forkastning?»</li>
              <li>• «Hvor stor andel av elvas vannføring skyldes overflateavrenning kontra grunnvannstilførsel under en regnbyge?»</li>
            </ul>
            <p className="text-[11px] text-emerald-400 pt-1">
              <em>Riktig:</em> Knyttet til konkrete målinger, hypotese og geofaglige prosesser.
            </p>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Den gylne regelen: Skille mellom observasjon og tolkning
        </h3>
        <p>
          I feltnotatene må du aldri blande det du faktisk <em>ser og måler</em> (observasjon) med det du <em>tror
          prosessene bak har vært</em> (tolkning):
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Observasjon (Fakta som ikke forandrer seg):</strong> «Mørk grå bergart med kornstørrelse 1–2 mm,
            tydelig bånding/foliasjon av vekslende lyse feltspatbånd og mørke biotittbånd, med strøk 045° og fall 32° SØ.»
          </li>
          <li>
            <strong>Tolkning (Hypotese og konklusjon):</strong> «Dette er en båndgneis metamorfosert under regional
            amfibolittfacies under den kaledonske kollisjonen.»
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Hvis du bare skriver «vi fant gneis», kan ingen etterprøve arbeidet ditt dersom det senere viser seg å være en dioritt.
          Observasjonen skal stå på egne ben uavhengig av om tolkningen revideres.
        </p>
      </CollapsibleSection>

      {/* 2. GEOREFERERING OG FELTBOKA */}
      <CollapsibleSection
        title="Georeferering og feltbokas strenge vitenskapelige anatomi"
        subtitle="UTM-koordinater, GPS-presisjon og feltboka som juridisk dokument"
        badge="Data & GPS"
        badgeVariant="sky"
      >
        <p>
          Geovitenskap er romlig. Uten stedfesting er en steinprøve eller vannmåling vitenskapelig verdiløs.
          Å <strong>georeferere</strong> vil si å knytte en observasjon til et entydig koordinatfestet punkt i et
          definert kartprojeksjonssystem, supplert med høyde over havet og tidspunkt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold text-primary">Koordinatsystemer i Norge</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I Norge brukes standardreferansen <strong>EUREF89 UTM sone 32V / 33V</strong> (eller WGS84 for bredde/lengdegrad).
              UTM (Universal Transverse Mercator) oppgir posisjonen i meter nord (Nordkoordinat, N) og meter øst (Østkoordinat, E).
              Eksempel: <code className="text-foreground font-mono">UTM 32V E: 598210, N: 6645320, z: 142 moh</code>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold text-amber-400">GPS-usikkerhet: Mobil vs. dGPS</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              En vanlig smarttelefon eller håndholdt GPS har en typisk feilmargin på <strong>±3–5 meter</strong> under åpen himmel,
              og kan være langt dårligere i trange raviner eller tett skog. For skolefelt er dette tilstrekkelig for å finne tilbake
              til en blotning, men det holder IKKE til millimeterovervåking av fjellsprekker (som Åkneset) der det kreves
              differensiell GPS (RTK-dGPS) eller laserinterferometri.
            </p>
          </div>
        </div>

        <div className="my-6">
          <FeltbokDiagram />
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Feltboka: Den uerstattelige primærkilden
        </h3>
        <p>
          Smarttelefoner og nettbrett kan gå tomme for batteri, knuses mot svaberg eller slutte å virke i øsende regn.
          En fysisk feltbok med <em>vannfast papir («Rite in the Rain»)</em> og blyant er feltgeologens fremste verktøy.
          Hvert eneste stasjonspunkt skal føres med standard struktur:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-xs text-foreground/90">
          <li><strong>Stasjonsnummer / ID:</strong> Unik kode (f.eks. GEO-2026-ST01).</li>
          <li><strong>Dato, klokkeslett og vær:</strong> Viktig for hydrologiske målinger og lysforhold ved foto.</li>
          <li><strong>Georeferanse:</strong> UTM-sone, øst/nord og høyde over havet (z).</li>
          <li><strong>Lokalitetsbeskrivelse:</strong> Veggskjæring, bekkefar, grustak, åkerkant eller naturlig blotning.</li>
          <li><strong>Måleverdier:</strong> Kvantitative data med enhet og målefeil (strøk/fall, vannføring, kornstørrelse).</li>
          <li><strong>Felttegning / Skisse:</strong> Profilskisse med målestokk (skalamåler eller hammer) og nordpil.</li>
          <li><strong>Prøve-ID:</strong> Hvis det tas med en bergartstuffer (stuffprøve) eller sedimentpose hjem.</li>
        </ol>

        <div className="my-6">
          <GeoMap
            center={[61.0, 8.5]}
            zoom={6}
            markers={[
              { lat: 61.0, lng: 8.5, label: "Feltpunkt Eksempel: 61.000° N, 8.500° Ø (UTM 32V 598210, 6645320)" },
            ]}
            heading="Georeferert feltlokalitet i kart"
            caption="Et feltpunkt må alltid kunne gjenoppsøkes av andre forskere 50 år senere basert på koordinater og feltbokskisser. Koordinatfesting sikrer vitenskapelig etterprøvbarhet."
          />
        </div>
      </CollapsibleSection>

      {/* 3. STRUKTURGEOLOGISKE MÅLINGER */}
      <CollapsibleSection
        title="Strukturgeologi i felt: Strøk, fall og geologkompass"
        subtitle="Høyrehåndsregelen, romlig orientering og foldningsgeometri"
        badge="Strukturgeologi"
        badgeVariant="amber"
      >
        <p>
          Lagdelte sedimentære bergarter og folierte metamorfe bergarter danner flater i rommet.
          Når tektoniske krefter bøyer og folder disse lagene, må vi kartlegge flatenes romlige stilling
          ved hjelp av et <strong>geologkompass</strong> (Clar-kompass, Freiberg eller Silva med klinometer/loddlodd).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-primary/40 bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold text-primary">Strøk (Strike)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Kompassretningen til en tenkt <strong>horisontal linje</strong> på det skråstilte bergartslaget.
              Angis som en asimutvinkel mellom <strong>000° og 360°</strong> i forhold til geografisk nord.
              Tilsvarer skjæringslinjen mellom bergartslaget og en tenkt vannflate.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/40 bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold text-amber-400">Fall (Dip) og fallretning</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Den maksimale helningsvinkelen til bergartslaget, målt <strong>vinkelrett på strøklinjen</strong> ned fra
              horisontalplanet. Angis i grader mellom <strong>0° (vannrett) og 90° (loddrett)</strong>, etterfulgt av
              himmelretningen laget tipper mot (f.eks. 32° SØ).
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-forvitring.jpg"
          alt="Oppsprukket blotning av foliert bergart med målestokk og kompassorientering"
          heading="Måling av sprekkemønstre og foliasjon i blotning"
          caption="En geolog legger kompasskanten langs bergartens lagflate for å lese av strøkretning, og vipper klinometret for å registrere fallvinkelen. Ved kartering av skredfare eller berghallstabilitet måles både lagdelingens orientering og skjærende sprekksett (diskontinuiteter) for å beregne utglidningsfare."
          marks={[
            { x: 30, y: 40, n: "1", text: "Lagflate (Foliasjon)", tone: "warm" },
            { x: 70, y: 60, n: "2", text: "Skjærende sprekksett", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Foliasjonsflate: Måles med strøk og fall for å avdekke regionale folder (antiklinaler og synklinaler)." },
            { n: "2", label: "Spresett (Diskontinuitet): Dersom sprekkesettene heller ut mot dalføret med brattere vinkel enn skråningen, oppstår ekstrem ras- og blokkutglidningsfare." },
          ]}
        />

        <div className="rounded-xl border border-border bg-card p-4 my-4 space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Høyrehåndsregelen (Right-Hand Rule - RHR)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For å unngå tvetydighet i internasjonale geologiske databaser bruker vi <em>høyrehåndsregelen</em>:
            Dersom du sikter eller går i strøkretningen, skal bergartslaget <strong>alltid helle ned mot høyre side</strong>.
            Dermed behøver man bare å oppgi to tall: <code className="text-primary font-mono">045 / 32</code> betyr
            automatisk at strøket er 045° og fallet er 32° mot sørøst (90° til høyre for 045°).
          </p>
        </div>
      </CollapsibleSection>

      {/* 4. INTERAKTIV FELTLOGG-MODELL */}
      <CollapsibleSection
        title="Interaktiv simulator: Feltlogg og observasjonskjede"
        subtitle="Mål strøk/fall med kompass, loggfør sedimentkorn, mål vannføring og sett opp HMS-matrise"
        badge="Interaktiv modell"
        badgeVariant="positive"
      >
        <p className="text-sm text-muted-foreground">
          Bruk simulatoren under til å øve på de fire sentrale feltoppgavene i Geofag 1.
          Juster kompassets vinkler, klassifiser sedimentprøver etter Wentworth-skalaen,
          regn ut elvas vannføring med vingemåler og utfør en faglig HMS-risikoanalyse før rapporten genereres.
        </p>

        <FieldworkObservationModel />
      </CollapsibleSection>

      {/* 5. MÅLEMETODER I ELV OG LØSMASSER */}
      <CollapsibleSection
        title="Hydrologiske og sedimentologiske målinger i elv og dalbunn"
        subtitle="Kornstørrelsessikting, Ott-flygel og kontinuitetsligningen Q = A · v"
        badge="Målemetoder"
        badgeVariant="primary"
      >
        <p>
          I feltarbeid knyttet til hydrosfæren og løsmasser i geosfæren er to standardmetoder uunnværlige:
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          1. Sedimentologisk kornfordelingsanalyse (Wentworth-skalaen)
        </h3>
        <p>
          Når vi analyserer løsmasser i en skjæring eller et grustak, samler vi prøver for kornfordeling.
          Vi bruker <strong>Wentworth-skalaen</strong> til å navngi fraksjonene:
        </p>
        <ul className="list-disc space-y-1.5 pl-6 text-xs text-foreground/90 font-mono">
          <li>Blokk: &gt; 256 mm (større enn et fotballhode)</li>
          <li>Stein: 64 – 256 mm</li>
          <li>Grus: 2 – 64 mm</li>
          <li>Sand: 0,063 – 2 mm (grov, middels, fin)</li>
          <li>Silt: 0,002 – 0,063 mm (føles som mel mellom fingrene, knaser svakt mot tennene)</li>
          <li>Leire: &lt; 0,002 mm (2 µm; kjennes glatt og plastisk i fuktig tilstand)</li>
        </ul>
        <p className="text-xs text-muted-foreground pt-1">
          I felt vurderer vi i tillegg <strong>sorteringsgraden</strong> (hvor ensartede kornene er) og
          <strong> rundingsgraden</strong> (kantet, kantslipt, godt rundet). Usortert materiale med kantede blokker i
          fin sand/leir-matriks tilsier bunnmorene. Godt sortert, rundet grus tilsier glasifluvial elvetransport.
        </p>

        <PhotoFigure
          src="/images/fig-ravine.jpg"
          alt="Ravinedal i marin leire under marin grense med bekkeløp og utglidninger"
          heading="Feltobservasjon i leirravine under marin grense"
          caption="En ravine er en V-dal gravd ut av rennende vann i finkornede marine løsmasser etter landhevingen. Ved feltarbeid her måles skråningsvinkler med klinometer, kornstørrelse (silt/leire) og tegn på ustabilitet (sigesprekker i gresset, skjeve trær som lener seg mot ravina, og erosjon i elvefoten)."
          marks={[
            { x: 30, y: 65, n: "1", text: "Ravinebunn / Bekk", tone: "cold" },
            { x: 70, y: 35, n: "2", text: "Ustabil leirskråning", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Fluvial fot-erosjon: Bekken graver i skråningsfoten og utløser lokale rotasjonsutglidninger." },
            { n: "2", label: "Geoteknisk observasjon: Løsmassene under marin grense krever aktsomhet ved feltarbeid – kvikkleirefaren må alltid sjekkes i NVEs kartlag før prøvetaking." },
          ]}
        />

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          2. Hydrologisk vannføring: Hastighets-areal-metoden
        </h3>
        <p>
          For å bestemme elvas vannføring Q (m³/s) i et rett elveløp:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-xs text-foreground/90">
          <li>Spenn et målebånd vinkelrett over elva for å bestemme total elvebredde $B$.</li>
          <li>Del elvetverrsnittet inn i 5–15 delvertikaler. Mål dybden $d_i$ med en målestav i hver vertikal.</li>
          <li>
            Senk et <strong>Ott-flygel (propell/vingemåler)</strong> ned til <strong>0,6 av dypet fra overflaten</strong>
            (der strømhastigheten statistisk tilsvarer vertikalens gjennomsnittshastighet $v_i$).
          </li>
          <li>
            Beregn delareal $A_i = w_i \cdot d_i$ og delvannføring $q_i = v_i \cdot A_i$.
            Summer alle delene til total vannføring: $Q = \sum q_i$.
          </li>
        </ol>
      </CollapsibleSection>

      {/* 6. HMS SOM FAG */}
      <CollapsibleSection
        title="HMS som fag: Risikovurdering, barrierer og Stopp-regelen"
        subtitle="Risikomatrisen (P × C) og sikkerhetskultur i naturen"
        badge="HMS & Sikkerhet"
        badgeVariant="warning"
      >
        <p>
          Helse, miljø og sikkerhet (HMS) i geofaglig feltarbeid er <strong>fagkunnskap</strong>, ikke et byråkratisk vedlegg.
          Geofag handler om krefter i naturen som steinsprang, skred, flom og glatte svaberg.
          Å kunne vurdere og håndtere disse farene er en kjernekompetanse for enhver geolog.
        </p>

        <div className="rounded-xl border border-border bg-card p-4 my-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Definisjon av risiko</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Risiko er <strong>IKKE</strong> det samme som at noe gikk galt. Risiko er en <em>forhåndsvurdering</em> av
            produktet mellom sannsynlighet og konsekvens før hendelsen inntreffer:
          </p>
          <div className="rounded-lg bg-background p-3 border border-border/80 font-mono text-xs">
            <strong className="text-primary">Risikotall (R) = Sannsynlighet (P, 1–5) × Konsekvens (C, 1–5)</strong>
            <p className="text-muted-foreground font-sans pt-1">
              • <strong>Grønn sone (1–7):</strong> Akseptabel risiko. Gjennomføres med standard rutiner.
              <br />
              • <strong>Gul sone (8–14):</strong> Moderat risiko. Krever spesifikke barrierer og skjerpet tilsyn.
              <br />
              • <strong>Rød sone (15–25):</strong> Uakseptabel risiko. Feltarbeid kan IKKE gjennomføres uten at faren elimineres!
            </p>
          </div>
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Fysiske barrierer og Stopp-regelen
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Hjelmpåbud:</strong> Obligatorisk ved all ferdsel under bratte bergskjæringer, i pukkverk og i steinbrudd
            for å beskytte mot steinsprang utløst av frost eller fugler.
          </li>
          <li>
            <strong>Flytevest og vadeline:</strong> Obligatorisk ved vading eller måling i elver der vannstanden overstiger knehøyde
            eller strømmen er stri.
          </li>
          <li>
            <strong>Aktsomhetskart for kvikkleire og skred:</strong> Alltid sjekke Varsom.no og NVEs kartlag på forhånd.
          </li>
          <li>
            <strong>Stopp-regelen («Stop work authority»):</strong> Enhver deltaker i feltgruppen – uansett om det er en elev,
            student eller lærer – har rett og plikt til å rope «STOPP» dersom en situasjon oppleves utrygg. Da avbrytes
            arbeidet umiddelbart inntil situasjonen er revurdert.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 7. FELTRAPPORTEN OG EKSAMENSKRAV */}
      <CollapsibleSection
        title="Feltrapporten: Struktur, feilkilder og eksamenskrav"
        subtitle="Vitenskapelig oppbygging og fylkesvise privatistkrav"
        badge="Rapportering"
        badgeVariant="neutral"
      >
        <p>
          Feltrapporten er det ferdige vitenskapelige produktet som dokumenterer hele undersøkelsen.
          En profesjonell geofaglig feltrapport følger IMRaD-strukturen (Introduction, Methods, Results, and Discussion):
        </p>

        <div className="rounded-xl border border-border bg-card p-4 my-4 space-y-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-primary">1. Tittel og sammendrag (Abstract):</span>
            <p className="text-muted-foreground">Kortfattet oppsummering av formål, lokalitet, hovedfunn og konklusjon.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-primary">2. Innledning og problemstilling:</span>
            <p className="text-muted-foreground">Geologisk rammeverk, hypotese og avgrenset geofaglig spørsmål.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-primary">3. Feltområde og HMS-vurdering:</span>
            <p className="text-muted-foreground">Georeferert oversiktskart, berggrunnskart (NGU) og risikomatrise for feltlokalitetene.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-primary">4. Metode og utstyr:</span>
            <p className="text-muted-foreground">Beskrivelse av kompass, målevinge, sikter og GPS med angivelse av måleusikkerhet.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-primary">5. Resultater (Objektiv fremstilling):</span>
            <p className="text-muted-foreground">Måledata presentert i tabeller, strøk/fall-plott (stereonett), kornfordelingskurver og hydrogrammer.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-primary">6. Diskusjon og feilkilder:</span>
            <p className="text-muted-foreground">
              Tolkning av dataene opp mot regional geologi. Drøfting av systematiske og tilfeldige målefeil
              (GPS-unøyaktighet, magnetisk misvisning, strømturbulens rundt flygel, omarbeiding av sedimenter).
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-primary">7. Konklusjon og kildeliste:</span>
            <p className="text-muted-foreground">Svar på problemstillingen, hva dataene IKKE kan bevise, og referanser etter APA-standard.</p>
          </div>
        </div>

        <Callout title="Viktig for privatister: Fylkesvise krav til fysisk feltrapport">
          <p className="text-xs">
            Praksisen for privatisteksamen i Geofag 1 varierer mellom fylkene.
            I <strong>Vestland fylkeskommune</strong> er det et eksplisitt formalkrav at privatister skal ha med en
            <strong> utskrevet, fysisk feltrapport på papir</strong> ved oppmøte til muntlig-praktisk eksamen.
            Kandidater som møter uten papirrapport eller kun har rapporten på PC/nettbrett, kan bli nektet eksamensavleggelse.
            I andre fylker (som Rogaland) kreves det derimot ikke at kandidaten bringer med eget feltarbeid.
            <strong> Sjekk alltid eksamensreglementet i ditt eget hjemfylke i god tid før eksamen!</strong>
          </p>
        </Callout>
      </CollapsibleSection>

      {/* 8. NØKKELBEGREPER OG QUIZ */}
      <CollapsibleSection
        title="Nøkkelbegreper og eksamensrettet quiz"
        subtitle="Kvalitetssikring for privatister og VG3 Geofag 1"
        badge="Begreper & Test"
        badgeVariant="neutral"
      >
        <h3 className="font-display text-xl font-medium tracking-tight">Viktige faglige begreper</h3>
        <TermGrid>
          <Term name="georeferering" def="å stedfeste en observasjon nøyaktig i et definert koordinatsystem (f.eks. UTM 32V) med høyde og tid" />
          <Term name="feltbok" def="vitenskapelig og juridisk primærkilde; føres med vannfast papir og blyant for å sikre etterprøvbarhet" />
          <Term name="strøk (strike)" def="kompassretningen (0–360°) til en tenkt horisontal linje på et skråstilt bergartslag" />
          <Term name="fall (dip)" def="den bratteste helningsvinkelen (0–90°) til et bergartslag målt vinkelrett på strøket" />
          <Term name="høyrehåndsregelen" def="konvensjon der bergartslaget alltid faller til høyre for den retningen du sikter langs strøket" />
          <Term name="Wentworth-skalaen" def="standardisert geometrisk skala for kornstørrelse fra leire (<0,002 mm) til blokk (>256 mm)" />
          <Term name="risikotall (R)" def="produktet av sannsynlighet og konsekvens (P × C) beregnet før feltarbeid igangsettes" />
          <Term name="Stopp-regelen" def="ubetinget rett og plikt for alle deltakere til å stanse feltarbeid ved uakseptabel risiko" />
        </TermGrid>

        <div className="mt-8 border-t border-border/60 pt-6">
          <h3 className="font-display text-xl font-medium tracking-tight mb-2">
            Eksamensrettet flervalgsquiz (LK20 Geofag 1)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Test dine kunnskaper om feltarbeid, strukturmålinger, måleusikkerhet og HMS:
          </p>

          <Quiz
            questions={[
              {
                prompt: "Hva betyr notasjonen '045° / 30° SØ' for et bergartslag i feltboka?",
                options: [
                  "Fjellet har en temperatur på 45 °C og ligger 30 meter over havet.",
                  "Strøkretningen (horisontallinjen på laget) har en kompassretning på 045° (nordøst), og laget heller 30° ned mot sørøst.",
                  "Laget er 45 meter tykt og heller 30° mot nordvest.",
                  "Kompasset hadde 45 graders feilvisning på grunn av magnetitt i bergmassen.",
                ],
                answer: 1,
                explain:
                  "Strøk og fall angir lagets romlige orientering. Strøk er kompassretningen til horisontallinjen på laget (045°), og fall er vinkelen ned fra horisontalplanet (30°) mot sørøst.",
              },
              {
                prompt: "Hvorfor er feltboka regnet som den vitenskapelige primærkilden under feltarbeid, framfor digitale mobilnotater og bilder alene?",
                options: [
                  "Fordi mobiltelefoner ikke har lov til å tas med på universitetsekskursjoner.",
                  "Fordi feltboka med vannfast papir og blyant fungerer uavhengig av batteri, kulde og regn, og notatene med skisser og måledata representerer den originale tids- og stedsfestede registreringen som kan etterprøves juridisk og vitenskapelig.",
                  "Fordi det er umulig å georeferere et bilde tatt med mobiltelefon.",
                  "Fordi man ikke kan tegne geologiske skisser digitalt.",
                ],
                answer: 1,
                explain:
                  "Feltboka er geologens juridiske og vitenskapelige logg. Digitale hjelpemidler supplerer, men erstatter ikke feltboka, da elektronikk er sårbar for strømbrudd, fukt og støt i krevende terreng.",
              },
              {
                prompt: "Hvordan måles elvas vannføring (Q) i praksis med hastighets-areal-metoden ved hjelp av et Ott-flygel (vingemåler)?",
                options: [
                  "Man måler vanntemperaturen på overflaten og ganger med elvas bredde.",
                  "Tverrsnittet deles inn i delvertikaler; man måler dybden og senker flygelet ned til 0,6 av dypet fra overflaten (for å fange gjennomsnittshastigheten), beregner delareal × hastighet og summerer opp.",
                  "Man kaster en trebit i elva og måler tiden den bruker på å drive 100 meter.",
                  "Man demmer opp elva med sandsekker til alt vannet renner gjennom et rør.",
                ],
                answer: 1,
                explain:
                  "I et turbulent elveløp er hastigheten størst like under overflaten og null ved bunnen. Teoretisk og empirisk tilsvarer hastigheten på 0,6 av dypet (målt fra overflaten) vertikalens gjennomsnittshastighet.",
              },
              {
                prompt: "Hva er den geofaglige definisjonen av 'risiko' i forbindelse med HMS-planlegging i felt?",
                options: [
                  "At noen i gruppen allerede har skadet seg og må hentes av ambulansehelikopter.",
                  "En forhåndsvurdering av faren uttrykt som produktet av hendelsens sannsynlighet og dens potensielle konsekvens (Risiko = Sannsynlighet × Konsekvens), med mål om å etablere barrierer før feltarbeidet starter.",
                  "Værmeldingen fra Meteorologisk institutt.",
                  "Kostnaden for bussbilletten til feltområdet.",
                ],
                answer: 1,
                explain:
                  "Risiko handler om proaktiv forebygging før ulykken inntreffer. Ved å multiplisere sannsynlighet (1–5) med konsekvens (1–5) identifiseres kritiske punkter der tiltak (barrierer som hjelm, redningsvest eller ruteendring) må iverksettes.",
              },
              {
                prompt: "Hvilket sedimentologisk kjennetegn skiller en glasifluvial breelvavsetning fra en bunnmorene (till)?",
                options: [
                  "Bunnmorenen er alltid godt sortert med runde steiner, mens breelva avsetter kantede blokker.",
                  "Bunnmorenen er usortert med kantete steinblokker i en finkornet matriks (fordi isbreen knuser uten hydraulisk sortering), mens breelvavsetningen er lagdelt, godt sortert og kantslipt/rundet av rennende vann.",
                  "Det er ingen forskjell, da begge er dannet av is.",
                  "Breelvavsetninger inneholder aldri sand eller grus.",
                ],
                answer: 1,
                explain:
                  "Isbreen transporterer alt fra kjempeblokker til leire uten sortering og gir kantet materiale. Rennende vann i breelver sorterer derimot kornene etter strømhastighet og sliper kantene runde under transporten.",
              },
            ]}
          />
        </div>
      </CollapsibleSection>
    </TopicLayout>
  );
}
