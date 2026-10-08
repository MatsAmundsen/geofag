import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  PolarFrontCycloneSteps,
  ValleyWindDiagram,
  SeaBreezeLandBreezeDiagram,
  FoehnAdiabaticDiagram,
  TemperatureInversionDiagram,
} from "@/components/diagrams";
import { SeaBreezeModel } from "@/components/models/sea-breeze-model";
import { FoehnModel } from "@/components/models/foehn-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/lokale-vaersystemer")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/tema/lokale-vaersystemer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/lokale-vaersystemer",
    }),
  component: LokalePage,
});

function LokalePage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Lokale og regionale værsystemer"
      lead="Mens storskala lavtrykk og jetstrømmer sveiper over hele kontinenter, formes hverdagsveiret vårt i stor grad av lokale krefter. Ulik oppvarming av hav og land, bratte fjellsider som fanger sol og kulde, fuktig luft som tvinges over fjelloverganger, og kalde luftputer i bunnen av bygryter skaper solgangsbris, dalvind, fønvind og temperaturinversjoner."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      prev={{ to: "/tema/vaerkart", label: "Forrige: Værkart" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.lokale}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 2)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og
            lokal skala, og tolke ulike værkart og værutvikling
          </em>{" "}
          (Utdanningsdirektoratet, 2020).
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer og begreper som dekkes:</strong></p>
          <p>• <em>Solgangsbris (sjøbris og landbris):</em> Termisk trykkgradient, ulik varmekapasitet mellom hav og land, døgnsyklus og returstrøm i høyden.</p>
          <p>• <em>Dalsirkulasjon:</em> Anabatisk dalvind om dagen, katabatisk fjellvind om natten, kaldluftsdrenering og frostlommer.</p>
          <p>• <em>Fønvind og orografisk nedbør:</em> Tørradiabatisk (Γ_d) vs. fuktigadiabatisk (Γ_m) temperaturendring, kondensasjonsnivå (LCL), latent varmefrigjøring og regnskygge.</p>
          <p>• <em>Temperaturinversjoner:</em> Bakkeinversjon og subsidensinversjon, stabilt termisk lokk og akutt opphopning av lokal forurensning i norske byer.</p>
          <p>• <em>Skalaforskjeller:</em> Hvorfor lokale sirkulasjoner (høyt Rossby-tall) ikke roterer som storskala polarfrontsykloner (Coriolis-styring).</p>
        </div>
      </Callout>

      {/* ── 1. SOLGANGSBRIS ────────────────────────────────────────────── */}
      <CollapsibleSection
        title="1. Solgangsbris: Døgnets termiske kretsløp ved kysten"
        subtitle="Sjøbris om dagen, landbris om natten, termisk trykkgradient og returstrøm"
        badge="Kystkretsløp"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          På varme, solrike sommerdager langs norskekysten og i fjordene opplever vi et klassisk
          værfenomen: Morgenen starter vindstille og behagelig. Utpå formiddagen, i 11–12-tiden,
          våkner en frisk pålandsvind som blåser fra det kjølige havet og inn over land. Vinden
          når sin maksimale styrke på ettermiddagen og dør ut mot kvelden. Utover natten snur vinden
          og blåser som en svak trekk fra det avkjølte landet og ut mot sjøen.
        </p>
        <p>
          Dette lukkede døgnkretsløpet kalles <strong>solgangsbris</strong>, og det består av{" "}
          <strong>sjøbris</strong> om dagen og <strong>landbris</strong> om natten (NOAA, u.å.; Store
          norske leksikon, u.å.-b).
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Fysikken bak: Hvorfor varmes land så mye raskere enn hav?
        </h3>
        <p>
          Motoren i solgangsbrisen er den dramatiske forskjellen i <strong>varmekapasitet</strong>{" "}
          mellom vann og tørt land:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Vannets høye varmekapasitet:</strong> Flytende vann har en spesifikk varmekapasitet
            på hele <em>c ≈ 4184 J/(kg·K)</em>. I tillegg trenger solstrålene flere meter ned i vannet,
            og bølgebevegelser og strømmer rører om varmen i et dypt blandelag. Havoverflaten endrer
            derfor temperaturen med under 1 °C i løpet av et helt døgn.
          </li>
          <li>
            <strong>Landoverflatens lave varmekapasitet:</strong> Tørt fjell, sand, jord og asfalt har
            en varmekapasitet på under <em>800–1000 J/(kg·K)</em>. Solstrålene kan heller ikke trenge
            ned i berget; all energien absorberes i det øverste millimetertykke sjiktet.
          </li>
        </ul>
        <p>
          På en solrik formiddag stiger bakketemperaturen på land raskt til 25–30 °C, mens havoverflaten
          holder seg på for eksempel 16 °C. Luften like over bakken varmes opp ved varmeledning,
          utvider seg og får lavere tetthet enn den kjøligere luften over havet.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Trykkgradienten og det lukkede kretsløpet
        </h3>
        <p>
          Når den varme luften over land utvider seg vertikalt, heves de atmosfæriske trykkflatene i
          høyden over land. I 1000–1500 meters høyde oppstår det derfor et lokalt <em>høytrykk</em> over
          land i forhold til samme høyde over sjøen. Dette setter i gang en svak{" "}
          <strong>returstrøm i høyden</strong> som blåser fra land mot hav.
        </p>
        <p>
          Massetransporten i høyden fører til at vekten av hele luftkolonnen over land reduseres: Det
          oppstår et <strong>termisk lavtrykk (L) ved bakken</strong> over land. Samtidig fører
          nedsynkende luft over havet til at lufttrykket ved havoverflaten øker (<strong>H</strong>).
          Luften ved overflaten strømmer fra det relative høytrykket over havet inn mot lavtrykket over
          land — dette er <strong>sjøbrisen</strong>!
        </p>

        <OrdBoks
          ord="Sjøbris"
          barn="Lokal pålandsvind om dagen, drevet av at landjorden varmes opp raskere enn havoverflaten. Den kjølige sjøluften strømmer inn ved bakken for å erstatte den stigende varmluften over land."
        />

        {/* Interaktiv Solgangsbrissimulator */}
        <div className="my-6">
          <SeaBreezeModel />
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Hvorfor er landbrisen om natten så mye svakere?
        </h3>
        <p>
          Når solen går ned, snur energibalansen. Landjorden taper energi raskt gjennom langbølget
          varmestråling ut i verdensrommet. Bakketemperaturen kan falle til 8–10 °C, mens havet
          fortsatt holder stabile 16 °C. Nå er det luften over havet som er varmest og stiger, mens den
          kalde, tunge luften over land synker og danner et relativt høytrykk ved bakken.
        </p>
        <p>
          Resultatet er <strong>landbrisen</strong>, en fralandsvind fra land mot hav ved bakken. Men
          mens temperaturforskjellen på dagtid ofte er 8–12 °C, er nattlig temperaturkontrast sjelden
          mer enn 3–5 °C. Fordi vindstyrken er proporsjonal med trykkgradienten (som styres av
          temperaturforskjellen), blir landbrisen bare en svak bris på 1–3 m/s, sammenlignet med
          sjøbrisen som kan nå 8–12 m/s.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Sjøbrisfronten og Corioliseffektens rolle
        </h3>
        <p>
          Når den kjølige, fuktige sjøluften trenger innover land, fungerer forkanten som en miniatyr-kaldfront,
          kalt en <strong>sjøbrisfront</strong>. Her tvinges den varme innlandsluften brått oppover, noe som
          ofte utløser karakteristiske små konvektive cumulus-skyer (haugskyer) parallelt med kysten.
        </p>
        <p>
          Selv om sjøbrisen er et lokalt mesoskala-system (10–50 km bredt), varer den lenge nok (6–10
          timer) til at{" "}
          <Link to="/tema/coriolis" className={lenke}>
            Corioliseffekten
          </Link>{" "}
          rekker å avbøye luftstrømmen mot høyre på nordlig halvkule. Midt på dagen blåser sjøbrisen rett
          inn mot kysten, men utover ettermiddagen dreier vinden gradvis mot høyre og blåser skrått eller
          nesten parallelt med kystlinjen (på Sør- og Vestlandet dreier den gjerne mot nordvest).
        </p>

        <SeaBreezeLandBreezeDiagram />
      </CollapsibleSection>

      {/* ── 2. DALVIND OG FJELLVIND ────────────────────────────────────── */}
      <CollapsibleSection
        title="2. Dalvind og fjellvind: Dalsider som solfangere og kuldedrenasje"
        subtitle="Anabatisk oppstrøm om dagen, katabatisk kaldluftsavrenning om natten"
        badge="Dalsirkulasjon"
        badgeVariant="sky"
      >
        <p>
          I kupert terreng, fjorder og dalfører oppstår et lignende termisk kretsløp styrt av terrengets
          geometri og skråningsvinkler. Dalsidene fungerer som naturlige solfangere om dagen og som
          effektive utstrålingsflater om natten.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-amber-400 flex items-center gap-1.5 text-base">
              ☀️ Dag: Dalvind (Anabatisk vind)
            </h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Om formiddagen treffer solstrålene de bratte dalsidene nesten vinkelrett, slik at fjellsidene
              varmes opp vesentlig mer enn den frie luften midt i dalen. Luften like over dalsidene blir
              varm, lett og begynner å stige oppover skråningene (<strong>anabatisk vind</strong>).
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              For å erstatte denne luften suges luft fra lavlandet og dalåpningen oppover langs dalbunnen:
              Dette kalles <strong>dalvind</strong>. Den blåser typisk oppover dalføret fra formiddag til
              sen ettermiddag.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-sky-400 flex items-center gap-1.5 text-base">
              🌙 Natt: Fjellvind (Katabatisk vind)
            </h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Når solen går ned, stråler varmen fra fjellsidene uhindret ut i rommet. Det øverste
              fjellplatået og dalsidene blir ekstremt kalde. Luften i kontakt med berget kjøles ned,
              trekker seg sammen og får høy tetthet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Tyngdekraften trekker den tunge, kalde luften nedover dalsidene og ned i dalbunnen som en{" "}
              <strong>katabatisk vind</strong> (fallvind). I dalbunnen samler strømmene seg og blåser
              som en kjølig <strong>fjellvind</strong> utover dalføret mot sjøen eller lavlandet.
            </p>
          </div>
        </div>

        <ValleyWindDiagram />

        <OrdBoks
          ord="Katabatisk vind"
          barn="En tyngdedrevet fallvind der kald, tung luft avkjølt ved bakken eller på en isbre rutsjer nedover skråninger og dalfører under påvirkning av tyngdekraften."
        />

        <PhotoFigure
          src="/images/fig-katabatisk.jpg"
          alt="Snøkledd dalføre i Norge med tydelig lagdeling av kald luft og frostrøyk i bunnen"
          heading="Katabatisk kaldluftsavrenning og dannelse av frostlommer"
          caption="Illustrasjon. På stille, stjerneklare netter i norske innlandsdaler strømmer iskald luft ned fra fjellene og samler seg i dalbunnene. Dette skaper lokale frostlommer der temperaturen i bunnen kan være 10–15 °C lavere enn noen hundre meter oppe i dalsiden."
          marks={[
            { x: 30, y: 25, n: "1", text: "Fjellplatå (Strålingstap)", tone: "cold" },
            { x: 42, y: 50, n: "2", text: "Katabatisk avrenning", tone: "cold" },
            { x: 55, y: 80, n: "3", text: "Kaldluftssjø i dalbunnen", tone: "low" },
            { x: 75, y: 40, n: "4", text: "Varmere luft over inversjonen", tone: "warm" },
          ]}
          points={[
            {
              n: "1",
              label:
                "Fjellplatået taper enorm varmeenergi gjennom infrarød stråling mot det åpne verdensrommet.",
            },
            {
              n: "2",
              label:
                "Kald, tung luft renner nedover skråningene som en katabatisk vind med hastighet på 3–8 m/s.",
            },
            {
              n: "3",
              label:
                "Kaldluftssjøen (kuldegropen) samler seg i dalbunnen og skaper lokal bakkefrost og rimfrost.",
            },
            {
              n: "4",
              label:
                "Den termiske beltesonen noen hundre meter opp i dalsiden er ofte 5–10 °C mildere enn bunnen.",
            },
          ]}
        />
      </CollapsibleSection>

      {/* ── 3. FØNVINDENS TERMODYNAMIKK ────────────────────────────────── */}
      <CollapsibleSection
        title="3. Fønvindens termodynamikk: Orografisk heving og adiabatisk oppvarming"
        subtitle="Hvorfor lesiden får knusktørr, varm vind mens losiden bader i orografisk regn"
        badge="Termodynamikk"
        badgeVariant="amber"
      >
        <p>
          <strong>Fønvind</strong> er en varm, tørr og ofte kraftig fallvind som oppstår på{" "}
          <strong>lesiden</strong> av store fjellkjeder når fuktig luft tvinges over fjellet fra
          losiden. I Norge er fenomenet velkjent: Når fuktige atlantiske vestavinder treffer Vestlandet,
          bader vestlandskysten i orografisk regn, mens Østlandet og Gudbrandsdalen kan oppleve
          plutselig sommertemperatur, knusktørr luft og strålende sol.
        </p>
        <p>
          Omvendt kan en kald østlig eller sørøstlig kuling gi snø og skyer på Østlandet, mens
          fjordbunnene på Nordvestlandet (f.eks. Sunndalsøra og Tafjord) opplever midtvinterlige
          rekordtemperaturer på opptil +15 til +19 °C!
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Fysikken bak føneffekten: Forskjellen på to adiabatiske lapse rates
        </h3>
        <p>
          Hemmeligheten bak fønvinden ligger i termodynamikkens første hovedsetning og faseskiftet fra
          vanndamp til flytende vann:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Trinn 1: Tørradiabatisk heving på losiden.</strong> Når en umettet luftpakke ved
            havnivå presses oppover fjellsiden av trykkgradienten, synker det omgivende lufttrykket.
            Luftpakken ekspanderer, gjør et utvidelsesarbeid på omgivelsene, og avkjøles med den{" "}
            <strong>tørradiabatiske temperaturendringen (DALR, Γ_d = 1,0 °C / 100 m)</strong>.
          </li>
          <li>
            <strong>Trinn 2: Kondensasjon og fuktigadiabatisk heving.</strong> Ved en viss høyde når
            luftpakken duggpunktet: <em>Kondensasjonsnivået (LCL - Lifting Condensation Level)</em>. Her
            blir relativ fuktighet 100 %, og det dannes skyer. Når vanndamp kondenserer til vanndråper,
            frigjøres en enorm mengde <strong>latent varme</strong> (ca. 2,5 · 10⁶ J per kg vann).
            Denne varmeenergien motvirker avkjølingen, slik at luften nå avkjøles saktere med den{" "}
            <strong>fuktigadiabatiske temperaturendringen (SALR, Γ_m ≈ 0,6 °C / 100 m)</strong>.
          </li>
          <li>
            <strong>Trinn 3: Nedbøren faller ut (varmetapet forblir i luften!).</strong> Hvis skyen
            gir orografisk nedbør som faller til bakken på losiden, forlater vannet luftmassen. Den
            latente varmen som ble frigjort under kondensasjonen, <em>blir igjen i luften</em> som
            termisk energi!
          </li>
          <li>
            <strong>Trinn 4: Tørradiabatisk nedsynking på lesiden.</strong> Når den uttørkede luften
            passerer fjellkammen og rutsjer nedover på lesiden, øker det hydrostatiske trykket. Luften
            komprimeres adiabatisk. Siden skyene fordamper umiddelbart ved begynnende oppvarming, finnes
            det ikke lenger vanndråper som kan fordampe og forbruke latent varme. Luften varmes derfor
            med den fulle tørradiabatiske takten på <strong>1,0 °C / 100 m hele veien ned</strong>!
          </li>
        </ol>

        <div className="my-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="font-semibold text-amber-300">
            Matematisk formel for netto fønoppvarming:
          </p>
          <div className="my-2 rounded-lg bg-background/80 p-3 text-center font-mono text-sm text-foreground">
            ΔT_føn = (Γ_d - Γ_m) · (Δz_sky / 100) = (1,0 - 0,6) · (Δz_sky / 100) = 0,4 °C per 100 m sky
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Formelen beviser at temperaturøkningen på lesiden er direkte proporsjonal med tykkelsen på
            regnskyen på losiden! Jo mer det regner på losiden, desto varmere og tørrere blir fønvinden i
            ledalen.
          </p>
        </div>

        <OrdBoks
          ord="Fønvind"
          barn="Varm og tørr fallvind på lesiden av et fjell. Luften er blitt varmet opp fordi orografisk nedbør på losiden frigjorde latent kondensasjonsvarme, før den tørre luften ble komprimert og oppvarmet tørradiabatisk under nedsynkning."
        />

        {/* Interaktiv Adiabatisk Fønvind-beregner */}
        <div className="my-6">
          <FoehnModel />
        </div>

        <PhotoFigure
          src="/images/fig-fon.jpg"
          alt="Fønvind over fjellkam med skybanke på losiden og klarblå himmel med bølgeskyer på lesiden"
          heading="Fønvind og foehn wall (fønvegg) over fjellet"
          caption="Illustrasjon. Her ser vi fønveggen på fjellryggen: På losiden presses fuktig luft opp og danner en sammenhengende skybanke med regn. Idet luften tipper over eggen og synker ned i lesiden, varmes den opp adiabatisk slik at skyene fordampermomentant. Lesiden får tørr, varm fallvind og klar sikt."
          marks={[
            { x: 22, y: 65, n: "A", text: "Orografisk heving & regn", tone: "cold" },
            { x: 48, y: 35, n: "B", text: "Fønvegg (Skyen kutter her)", tone: "warm" },
            { x: 78, y: 60, n: "C", text: "Tørr, varm fallvind", tone: "warm" },
          ]}
          points={[
            {
              n: "A",
              label:
                "Losiden: Luft tvinges opp av fjellet og avkjøles fuktigadiabatisk (0,6 °C/100m) mens regnet faller.",
            },
            {
              n: "B",
              label:
                "Fjellkammen: Den skarpe skykanten (foehn wall) markerer skillet der luften begynner å synke.",
            },
            {
              n: "C",
              label:
                "Lesiden: Kompresjonsoppvarming (1,0 °C/100m) gjør luften varm og senker den relative fuktigheten til 20–30 %.",
            },
          ]}
        />

        <FoehnAdiabaticDiagram />
      </CollapsibleSection>

      {/* ── 4. TEMPERATURINVERSJONER ───────────────────────────────────── */}
      <CollapsibleSection
        title="4. Temperaturinversjoner: Når atmosfæren setter lokk på daler og byer"
        subtitle="Bakkeinversjon, subsidensinversjon og helsefarlig luftforurensning i norske bygryter"
        badge="Stabilitet & Miljø"
        badgeVariant="warning"
      >
        <p>
          I en normal troposfære avtar lufttemperaturen jevnt med høyden (den miljøbetingede lapse rate,{" "}
          <em>dT/dz &lt; 0</em>, typisk rundt -0,65 °C per 100 meter). Fordi varm luft er lettere enn
          kald luft, kan luftpakker som varmes ved bakken stige fritt oppover gjennom konveksjon og
          blanding, og dermed tynne ut forurensning, røyk og partikler.
        </p>
        <p>
          En <strong>temperaturinversjon</strong> er en unormal atmosfærisk tilstand der dette
          forholdet snus på hodet: Temperaturen <strong>øker</strong> med høyden i et visst sjikt (
          <em>dT/dz &gt; 0</em>).
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          To hovedtyper av inversjoner i Norge
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-sky-400">1. Strålingsinversjon (Bakkeinversjon)</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Oppstår på klare, vindstille vinternetter, særlig når bakken er dekket av nysnø med høy
              albedo. Bakken stråler ut enorme mengder langbølget infrarød varme mot det åpne
              verdensrommet. Bakken og luften i de nederste 50–300 meterne blir ekstremt kald (f.eks. -15
              til -25 °C), mens luften noen hundre meter høyere oppe holder -5 °C.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-amber-400">2. Subsidensinversjon (Høytrykksinversjon)</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Oppstår under store, stasjonære høytrykk (blokkerende høytrykk). Luften i høytrykket synker
              langsomt nedover (subsidens) over store områder. Under nedsynkningen komprimeres luften og
              varmes tørradiabatisk. Dette varme laget legger seg over et kaldt, fuktig grensesjikt nær
              bakken, typisk i 500–1500 meters høyde.
            </p>
          </div>
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Det termiske lokket og akutt lokal forurensning
        </h3>
        <p>
          Et inversjonslag representerer en <strong>ekstremt stabil sjiktning</strong>. Dersom en
          luftpakke med eksos eller vedrøyk stiger opp fra bakken, vil den umiddelbart komme inn i
          omgivelser som er <em>varmere</em> og dermed lettere enn den selv. Luftpakken får negativ
          oppdrift og presses tvert ned igjen!
        </p>
        <p>
          Inversjonslaget fungerer derfor som et ugjennomtrengelig <strong>fysisk lokk</strong> over byer
          og dalfører:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Bygryter som forurensningsfeller:</strong> Byer omgitt av fjell, som{" "}
            <strong>Bergen</strong> (gryten mellom de syv fjell, f.eks. Danmarks plass),{" "}
            <strong>Oslo</strong> (Oslogryta omkranset av åser) og <strong>Trondheim</strong>, er
            spesielt utsatt.
          </li>
          <li>
            <strong>Opphopning av giftstoffer:</strong> Eksos fra biltrafikk (spesielt nitrogenoksider,{" "}
            <em>NO₂</em>), veistøv og piggdekkstøv (<em>PM₁₀</em>) samt svevestøv fra vedfyring (
            <em>PM₂,₅</em>) slipper ikke ut. Konsentrasjonene kan stige dag for dag til akutt helsefarlige
            nivåer som utløser astmaanfall og hjerte-karsykdommer.
          </li>
          <li>
            <strong>Hvordan brytes inversjonen?</strong> Inversjonen kan bare brytes på to måter: Enten
            ved at en kraftig væromslagsfront med sterk vind mekanisk rører om og river opp sjiktningen,
            eller ved at vårsolen blir sterk nok til å varme opp bakken nedenfra.
          </li>
        </ul>

        <OrdBoks
          ord="Temperaturinversjon"
          barn="En tilstand i atmosfæren der temperaturen øker med høyden (dT/dz > 0) i stedet for å avta. Inversjonslaget danner et stabilt termisk lokk som hindrer vertikal omrøring og fanger forurensning i dalbunner og bygryter."
        />

        <TemperatureInversionDiagram />
      </CollapsibleSection>

      {/* ── 5. LOKAL VS SYNOPTISK SKALA ────────────────────────────────── */}
      <CollapsibleSection
        title="5. Forskjellen på lokal og synoptisk skala: Coriolis og polarfrontsykloner"
        subtitle="Hvorfor sjøbris er et lokalt kretsløp mens lavtrykk roterer som sykloner over tusen kilometer"
        badge="Skala & Dynamikk"
        badgeVariant="primary"
      >
        <p>
          I meteorologien inndeles atmosfærens fenomener etter romlig utstrekning og levetid:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Lokal skala (Mikroskala & Mesoskala, &lt; 100 km):</strong> Sjøbris, dalvind og
            fønvind. De varer fra noen timer til et døgn. Romskalaen er for liten og tidsrommet for kort
            til at jordrotasjonen dominerer dynamikken. Det dimensjonsløse{" "}
            <strong>Rossby-tallet (Ro = U / (f · L))</strong> er høyt (<em>Ro &gt;&gt; 1</em>), noe som
            betyr at trykkgradientkraften og friksjon fullstendig overskygger Corioliskraften. Luften
            blåser nesten direkte fra høyt mot lavt trykk i et lukket kretsløp uten fronter.
          </li>
          <li>
            <strong>Synoptisk og regional skala (1000–3000 km):</strong> Polarfrontsykloner og store
            høytrykk. De varer i flere dager til uker. Her er Rossby-tallet lavt (<em>Ro &lt;&lt; 1</em>),
            og Corioliseffekten er avgjørende. Luften rekker å avbøyes helt til det oppstår geostrofisk
            balanse: Vinden blåser langs isobarene og spinner syklonalt mot klokken rundt lavtrykket.
          </li>
        </ul>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Polarfrontsyklonens fem livsstadier (Bergensskolen)
        </h3>
        <p>
          Polarfronten markerer grensen der kald, tørr arktisk polarluft møter mild, fuktig subtropisk
          luft. På 1920-tallet oppdaget Vilhelm Bjerknes og Jacob Bjerknes i Bergen hvordan bølger på
          denne fronten utvikler seg til roterende lavtrykk med distinkte fronter (Bjerknes & Solberg,
          1922):
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>1. Uforstyrret stasjonær front:</strong> Rett linje mellom polarluft i nord og
            varm luft i sør.
          </li>
          <li>
            <strong>2. Bølgedannelse (Incipient cyclone):</strong> En forstyrrelse i høyden (under en
            jetstreak i{" "}
            <Link to="/tema/jetstrommer" className={lenke}>
              jetstrømmen
            </Link>
            ) får fronten til å bukte seg. Trykket faller i bølgetoppen, og det dannes et L.
          </li>
          <li>
            <strong>3. Ung syklon med varm sektor:</strong> Varmfronten beveger seg mot nordøst med
            slak helning (1:150) og langvarig, jevnt silregn fra nimbostratus. Bakfra jager den bratte
            kaldfronten (1:50) med kraftige byger. Mellom frontene ligger den <strong>varme sektoren</strong>{" "}
            med mild, fuktig luft.
          </li>
          <li>
            <strong>4. Okklusjon (Maksimal intensitet):</strong> Kaldfronten beveger seg raskere enn
            varmfronten og tar den igjen ved syklonsenteret. Den varme sektoren løftes helt opp fra
            bakken. På bakken markeres dette med en lilla okklusjonsfront.
          </li>
          <li>
            <strong>5. Utfylling og oppløsning:</strong> Temperaturkontrasten ved bakken er utvisket.
            Luft strømmer inn i lavtrykket og fyller det opp; systemet dør ut etter 4–7 dager.
          </li>
        </ol>

        <PolarFrontCycloneSteps />

        <OrdBoks
          ord="Varm sektor"
          barn="Den milde, fuktige luftmassen som ligger klemt mellom varmfronten foran og kaldfronten bak i en moden polarfrontsyklon. Bakkenivået i varm sektor har ofte oppholdsvær eller yr med jevn temperatur."
        />
      </CollapsibleSection>

      {/* ── SAMMENFATNING & BEGREPER ─────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight pt-4">
        Viktige fagbegreper
      </h2>
      <TermGrid>
        <Term
          name="Solgangsbris"
          def="Døgnlig kystkretsløp: sjøbris om dagen (pålandsvind pga. solvarmet land) og svakere landbris om natten (fralandsvind pga. strålingsavkjølt land)."
        />
        <Term
          name="Dal- og fjellvind"
          def="Døgnlig dalsirkulasjon: anabatisk dalvind oppover solvarmede skråninger om dagen, katabatisk fjellvind nedover om natten."
        />
        <Term
          name="Fønvind"
          def="Varm og knusktørr fallvind på lesiden av fjellkjeder, forårsaket av at orografisk nedbør frigjør latent varme på losiden."
        />
        <Term
          name="Temperaturinversjon"
          def="Atmosfærisk tilstand der dT/dz > 0. Danner et stabilt termisk lokk som fanger forurensning i byer og dalbunner."
        />
        <Term
          name="Tørradiabatisk (Γ_d)"
          def="Avkjøling og oppvarming av umettet luft: nøyaktig 1,0 °C per 100 meter vertikal forflytning."
        />
        <Term
          name="Fuktigadiabatisk (Γ_m)"
          def="Avkjøling av mettet luft i sky: ca. 0,6 °C per 100 m fordi kondensasjon frigjør latent varme."
        />
      </TermGrid>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <Callout title="Til eksamen">
          <p>
            Vær nøye med å skille mellom <strong>drivkreftene</strong> i de ulike skalaene: Sjøbris og
            dalvind drives av lokale <em>temperaturkontraster</em> og trykkgradienter der Coriolis
            bare spiller en mindre rolle. Fønvind krever en storskala påstrømning og en fjellbarriere,
            og varmen skyldes <em>faseskifte (latent varme)</em>.
          </p>
          <p className="mt-1">
            Når du forklarer inversjoner, husk å nevne at det er <strong>mangelen på oppdrift</strong>{" "}
            (stabil sjiktning) som gjør at forurensning hoper seg opp.
          </p>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            • Sjøbris er <strong>ikke</strong> et lite lavtrykk som roterer som en syklon; det er et
            lokalt sirkulasjonscelle-kretsløp.
          </p>
          <p className="mt-1">
            • Føn oppstår <strong>ikke</strong> på losiden. Losiden får orografisk regn og avkjøling;
            fønen er utelukkende en leside-effekt.
          </p>
          <p className="mt-1">
            • Inversjon betyr ikke at det er kaldt overalt, men at det er <em>kaldere ved bakken enn i
            høyden</em>.
          </p>
        </Callout>
      </div>

      {/* ── EKSAMENSQUIZ (LK20) ────────────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight pt-2">
        Test deg selv: Lokale og regionale værsystemer
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Disse spørsmålene tester din forståelse av termodynamikk, kretsløp, stabilitet og meteorologisk
        skala i tråd med kompetansemålene i Geofag 2.
      </p>

      <Quiz
        heading={null}
        questions={[
          {
            prompt:
              "Hvorfor er den nattlige landbrisen nesten alltid vesentlig svakere enn ettermiddagens sjøbris?",
            options: [
              "Fordi jordrotasjonen og Corioliseffekten stopper helt opp om natten.",
              "Fordi temperaturforskjellen mellom land og hav om natten (ofte 3–5 °C) er mye mindre enn den kraftige soloppvarmede kontrasten om ettermiddagen (ofte 8–12 °C).",
              "Fordi luften over havet har mye høyere friksjon enn landoverflaten om natten.",
              "Fordi lufttrykket ved havnivå alltid stiger over hele landet etter solnedgang.",
            ],
            answer: 1,
            explain:
              "Vindhastigheten bestemmes av trykkgradienten, som igjen skyldes temperaturkontrasten (ΔT). Siden solen varmer landoverflaten intenst om dagen, blir temperaturforskjellen mot havet stor. Om natten jevner temperaturen seg mer ut, slik at trykkgradienten og vinden blir svakere.",
          },
          {
            prompt:
              "Fuktig luft med starttemperatur 14 °C ved havnivå presses over en 1800 m høy fjellrygg. Kondensasjon (LCL) inntreffer ved 600 m, og orografisk nedbør faller ut på losiden. Hva blir temperaturen på lesiden ved havnivå dersom Γ_d = 1,0 °C/100m og Γ_m = 0,6 °C/100m?",
            options: [
              "14,0 °C (samme temperatur fordi energi bevares i et lukket system).",
              "9,2 °C (kaldere fordi luften ble avkjølt under oppstigningen).",
              "18,8 °C (mye varmere fordi kondensasjon frigjorde latent varme som ble igjen i luften).",
              "24,5 °C (ekstrem hetebølge pga. solstråling i fjellpasset).",
            ],
            answer: 2,
            explain:
              "Beregning: 0–600 m (tørr): 14 °C - 6·1,0 °C = 8,0 °C. 600–1800 m (sky, 1200 m med Γ_m): 8,0 °C - 12·0,6 °C = 0,8 °C på toppen. Nedsynkning 1800–0 m (tørr med Γ_d): 0,8 °C + 18·1,0 °C = 18,8 °C! Netto fønoppvarming er nøyaktig (1,0 - 0,6) · 12 = +4,8 °C.",
          },
          {
            prompt:
              "Hvilken meteorologisk prosess forklarer at det på klare, vindstille vinternetter kan oppstå akutt, helsefarlig luftforurensning i Danmarks plass i Bergen eller i Oslogryta?",
            options: [
              "Adveksjon av forurenset luftmasse fra kontinentet via polarjeten.",
              "En temperaturinversjon forårsaket av nattlig strålingsavkjøling ved bakken, som danner et stabilt termisk lokk (dT/dz > 0) som hindrer vertikal konveksjon og omrøring.",
              "Kraftig turbulens og orografisk heving som presser eksosrøyk nedover mot bakken.",
              "Lavtrykk med intens okklusjon som suger all vedrøyk inn mot sentrum av byen.",
            ],
            answer: 1,
            explain:
              "Når bakken stråler ut varme på klare, vindstille vinternetter, blir luften i dalbunnen iskald mens luften høyere oppe forblir mildere (dT/dz > 0). Dette skaper en ekstremt stabil lagdeling: All røyk og eksos har negativ oppdrift og fanges under dette termiske lokket.",
          },
          {
            prompt:
              "Hva er den fundamentale fysiske årsaken til at en polarfrontsyklon danner en roterende spiral med fronter over 1500 km, mens en sjøbris danner et lokalt kretsløp over 20 km uten rotasjon?",
            options: [
              "Sjøbris oppstår bare i ferskvann der det ikke finnes salt til å lede elektriske strømmer.",
              "Forskjell i romlig og tidsmessig skala (Rossby-tallet): Syklonen har lavt Rossby-tall der Corioliskraften dominerer balansen, mens sjøbrisen har høyt Rossby-tall der friksjon og trykkgradientkraft styrer uten vesentlig rotasjon.",
              "Polarfrontsyklonen dannes utelukkende av solgangsbris som har vokst seg stor.",
              "Polarfronten styres av månegravitasjon, mens sjøbrisen styres av jordens kjernevarme.",
            ],
            answer: 1,
            explain:
              "Corioliseffekten trenger både tid (mange timer) og stor horisontal utstrekning (flere hundre km) for å dominere vindretningen. På liten skala (sjøbris) er Rossby-tallet høyt, og luften blåser direkte fra høyt til lavt trykk.",
          },
          {
            prompt:
              "Hvorfor blåser sjøbrisen langs norskekysten ofte vinkelrett inn mot land midt på dagen, men dreier gradvis mot høyre utover ettermiddagen (f.eks. til nordvestlig langs kysten)?",
            options: [
              "Fordi tidevannet snur og trekker luften med seg i strømretningen.",
              "Fordi jordens gravitasjon øker når solen står i senit.",
              "Fordi luftmassene etter 4–6 timer i bevegelse gradvis påvirkes av Corioliskraften, som avbøyer horisontal bevegelse mot høyre på den nordlige halvkule.",
              "Fordi havtemperaturen synker med 10 °C på ettermiddagen.",
            ],
            answer: 2,
            explain:
              "Selv om sjøbrisen starter som en ren trykkgradientvind vinkelrett på kysten, virker Corioliskraften kontinuerlig på luft i bevegelse. Etter noen timer rekker den å avbøye strømmen mot høyre på nordlig halvkule.",
          },
          {
            prompt:
              "Hvilken kombinasjon av værforhold gir størst sannsynlighet for dannelse av en kraftig bakkeinversjon og frostlomme i en innlandsdal?",
            options: [
              "Tett skydekke, frisk kuling og fuktig luft.",
              "Skyfri himmel, vindstille, nysnødekke på bakken og lang vinternatt.",
              "Vestavindsstorm med orografisk nedbør og fønvind på lesiden.",
              "Havgåing under en passerende varmfront med nimbostratus.",
            ],
            answer: 1,
            explain:
              "Skyfri himmel slipper all infrarød stråling rett ut i verdensrommet, snødekke isolerer mot varme fra jordsmonnet og har høy emissivitet for langbølget stråling, vindstille hindrer mekanisk omrøring, og lange vinternetter gir maksimal tid for strålingstap.",
          },
        ]}
      />
    </TopicLayout>
  );
}
