import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  DmiTimeseriesDiagram,
  IodJetMeetingDiagram,
  IodPhaseShift,
  IodSstAnomalyDiagram,
  IodTeleconnectionDiagram,
  IodVsEnsoDiagram,
  IodWalkerShiftDiagram,
  NegativeWalkerDiagram,
  NeutralIodDiagram,
} from "@/components/diagrams";
import { IodModeExplorer } from "@/components/models/iod-mode-explorer";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/iod")({
  head: () =>
    topicHead({
      title: "IOD: Den indiske hav-dipolen · Geofag 2",
      description:
        "Indian Ocean Dipole (IOD): DMI-indeks, positiv og negativ fase, Walker-sirkulasjonen, termoklinhelning, jetstrømpåvirkning, telekoblinger og samspill med ENSO.",
      path: "/tema/klima/iod",
    }),
  component: IodPage,
});

function IodPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimasystemet"
      title="IOD: Den indiske hav-dipolen"
      lead="Indian Ocean Dipole (IOD) er den store hav-atmosfære-svingningen i Det indiske hav. Når havoverflatetemperaturen vipper mellom øst og vest, forskyves Walker-sirkulasjonen og jetstrømmene. Resultatet er dramatiske telekoblinger med flom i Øst-Afrika og skogbranner i Australia."
      banner="/images/fig-iod-positiv.png"
      bannerAlt="Positiv IOD: varmere hav og regn utenfor Øst-Afrika, kaldere hav, oppvelling og tørke ved Indonesia og Australia"
      prev={{ to: "/tema/klima/enso", label: "Forrige: ENSO" }}
      next={{ to: "/tema/klima/nao", label: "Neste: NAO" }}
      kilder={KILDER.iod}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i Geofag 2 (LK20)">
        <p>
          Målet er at du skal kunne <em>gjøre rede for koblede hav-atmosfæresvingninger i klimasystemet</em>,
          forklare <em>årsaker og virkninger av Indian Ocean Dipole (IOD)</em>, analysere <em>Walker-sirkulasjonen,
          termoklinhelning og telekoblinger til jetstrømmene</em>, samt drøfte hvordan IOD samspiller med ENSO
          og påvirker naturfarer regionalt og globalt (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      {/* ── 1. HVA IOD ER OG DMI-MÅLING ─────────────────────────────── */}
      <CollapsibleSection
        title="1. Hva IOD er og hvordan den måles (DMI)"
        subtitle="Det indiske havs klimamodus · Dipole Mode Index formel og sesongsyklus"
        badge="Definisjon"
        badgeVariant="primary"
        defaultOpen={true}
      >
        <p>
          <strong>Indian Ocean Dipole (IOD)</strong> er en koblet hav-atmosfærisk oscillasjon i det tropiske
          Indiahavet, identifisert og navngitt av oseanografene N. H. Saji og Peter Webster i 1999 (Saji et al., 1999;
          Webster et al., 1999). Akkurat som ENSO styrer tropisk Stillehav, styrer IOD været og nedbørsmønstrene for
          over to milliarder mennesker i Øst-Afrika, Midtøsten, Sør-Asia, Indonesia og Australia.
        </p>

        <NeutralIodDiagram />

        <div className="my-4 rounded-xl border border-border/70 bg-card p-4 space-y-3">
          <h4 className="font-display font-semibold text-base text-foreground">
            Hvordan måles IOD? Dipole Mode Index (DMI)
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Styrken og fortegnet til IOD måles ved hjelp av indeksen <strong>DMI (Dipole Mode Index)</strong>.
            DMI beregner den standardiserte forskjellen i havoverflatetemperatur (SST-anomali) mellom to definerte
            havområder (poler) i Det indiske hav (BOM, u.å.):
          </p>

          <div className="my-2 rounded-lg bg-slate-900/90 p-3 text-center font-mono text-xs sm:text-sm font-semibold text-sky-400">
            DMI = SST_vest (50°E–70°E, 10°S–10°N) - SST_øst (90°E–110°E, 10°S–0°)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-2.5">
              <strong className="text-amber-300 block">Vestlig pol (Arabiske hav / Afrikakysten):</strong>
              <p className="mt-0.5 text-muted-foreground">
                Dekker havområdet utenfor Somalia, Kenya og Tanzania (50°–70°E, 10°S–10°N).
              </p>
            </div>
            <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-2.5">
              <strong className="text-sky-300 block">Østlig pol (Indonesia / Sumatra / Java):</strong>
              <p className="mt-0.5 text-muted-foreground">
                Dekker havområdet sør for Sumatra og Java mot Nordvest-Australia (90°–110°E, 10°S–0°).
              </p>
            </div>
          </div>
        </div>

        <DmiTimeseriesDiagram />

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-primary">Årstidssyklus og terskelverdier:</strong>
          <p className="mt-1">
            En IOD-episode utvikler seg vanligvis i løpet av den boreale sommeren (mai–juni), når sin maksimale
            styrke om høsten (september–november), og bryter brått sammen i desember/januar når den asiatiske
            vintermonsunen etablerer seg og snur vindmønsteret. En hendelse klassifiseres som aktiv dersom
            DMI-avviket overskrider <strong>+0,4 °C (positiv)</strong> eller <strong>-0,4 °C (negativ)</strong> i minst
            tre påfølgende uker.
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 2. FASENE I IOD: POSITIV, NØYTRAL, NEGATIV ──────────────── */}
      <CollapsibleSection
        title="2. Fasene i IOD: Positiv, nøytral og negativ modus"
        subtitle="Termoklinhelning, oppvelling utenfor Sumatra og Bjerknes-tilbakekobling"
        badge="Fasedynamikk"
        badgeVariant="teal"
      >
        <p>
          I en <strong>nøytral tilstand</strong> er det østlige Indiahavet normalt litt varmere enn det vestlige,
          og svake vestlige vinder langs ekvator (Wyrtki-jetter) holder termoklinen dypere i øst (ca. 120 m) enn i
          vest (ca. 90 m). Men når denne likevekten forstyrres, utløses en av to distinkte faser:
        </p>

        <IodPhaseShift />

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-amber-300 text-sm">
                ☀️ 1. Positiv IOD (DMI &gt; +0,4 °C)
              </h4>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                Varm vest / Kald øst
              </span>
            </div>
            <ul className="mt-2.5 list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Vinder:</strong> Unormalt sterke østlige passatvinder blåser langs ekvator mot Afrika.
              </li>
              <li>
                <strong>Termoklin og hav:</strong> Overflatevann skyves vestover. Utenfor Sumatra/Java heves
                termoklinen opp mot overflaten, og kraftig <em>kystoppvelling</em> trekker iskaldt bunnvann opp.
                I vest presses termoklinen dypt ned, og varmt vann stuves opp utenfor Øst-Afrika.
              </li>
              <li>
                <strong>Atmosfære:</strong> Lavtrykk og intens konveksjon samles i vest $\to$ <strong>voldsomme flommer i
                Kenya, Somalia og Etiopia</strong>. Høytrykk og synkende tørr luft i øst $\to$ <strong>ekstrem tørke
                og skogbranner i Indonesia og Australia</strong>.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sky-300 text-sm">
                🌧️ 2. Negativ IOD (DMI &lt; -0,4 °C)
              </h4>
              <span className="rounded bg-sky-500/20 px-2 py-0.5 font-mono text-[10px] text-sky-300">
                Kald vest / Varm øst
              </span>
            </div>
            <ul className="mt-2.5 list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Vinder:</strong> De vestlige ekvatorialvindene forsterkes markant mot Indonesia.
              </li>
              <li>
                <strong>Termoklin og hav:</strong> Varmt overflatevann stuves opp i det østlige bassenget.
                Termoklinen presses ekstra dypt ned ved Sumatra og Australia, mens termoklinen heves i vest
                utenfor Afrikakysten.
              </li>
              <li>
                <strong>Atmosfære:</strong> Kraftig lavtrykk og konveksjon over Indonesia og Australia $\to$
                <strong>økt nedbør og flomkatastrofer i Australia</strong>. Høytrykk og synkende tørr luft i vest
                $\to$ <strong>tørke i Øst-Afrika</strong>.
              </li>
            </ul>
          </div>
        </div>

        {/* Vår nye interaktive modell */}
        <IodModeExplorer />

        <PhotoFigure
          src="/images/fig-iod-positiv.png"
          alt="Positiv IOD: varmere vann og konveksjon i vest, kaldere vann, svekket konveksjon og oppvelling i øst"
          heading="Figur 1. Positiv IOD i profil"
          caption="Snitt langs ekvator under positiv IOD. I vest: varmt vann, dyp termoklin, stigende luft og styrtregn mot Øst-Afrika. I øst: oppvelling av kaldt vann, hevet termoklin, synkende tørr luft og tørke over Indonesia og Australia."
          points={[
            { n: "1", label: "Lavtrykk utenfor Øst-Afrika: Konvektiv nedbør over havet, flomfare på land." },
            { n: "2", label: "Oppvelling og høytrykk i øst: Tørke og ekstrem skogbrannfare i Australia." },
          ]}
        />

        <PhotoFigure
          src="/images/fig-iod-negativ.jpg"
          alt="Negativ IOD: kaldere vann og tørke i vest, varmere vann og økt konveksjon over Indonesia og Australia"
          heading="Figur 2. Negativ IOD i profil"
          caption="Det omvendte speilbildet: Det varme vannet samles i øst. Australia opplever rekordmye regn og flom, mens Øst-Afrika rammes av tørke."
          points={[
            { n: "1", label: "Lavtrykk ved Indonesia og Australia: Intens konveksjon og flom." },
            { n: "2", label: "Høytrykk og synkende luft over Afrika: Tørkeperiode." },
          ]}
        />
      </CollapsibleSection>

      {/* ── 3. WALKER-SIRKULASJONEN ─────────────────────────────────── */}
      <CollapsibleSection
        title="3. Walker-sirkulasjonen og atmosfærisk kobling"
        subtitle="Lengdegradsforskyvning av konveksjonsceller · Anomale vinder over ekvator"
        badge="Atmosfære"
        badgeVariant="sky"
      >
        <p>
          I likhet med Stillehavet har atmosfæren over Det indiske hav en storskala <strong>Walker-sirkulasjonscelle</strong>{" "}
          langs ekvator (oppkalt etter sir Gilbert Walker). Cellen består av stigende luft der havet er varmest,
          horisontale vinder i øvre og nedre troposfære, og synkende luft over de kaldere havområdene.
        </p>

        <IodWalkerShiftDiagram />
        <NegativeWalkerDiagram />

        <div className="my-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-2">
          <h4 className="font-semibold text-primary text-sm">
            Bjerknes-tilbakekoblingen i Det indiske hav:
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Hvorfor forsterker en IOD-episode seg selv? Mekanismen kalles <strong>Bjerknes-tilbakekoblingen</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-foreground/90">
            <li>En liten temperaturøkning i vest svekker de vanlige vestavindene langs ekvator.</li>
            <li>Svakere vinder tillater mer varmt vann å samle seg i vest.</li>
            <li>Den økte temperaturforskjellen forsterker østavindene ytterligere.</li>
            <li>Østavindene pumper enda mer vann vekk fra Sumatra, noe som forsterker oppvellingen av kaldt dypvann i øst.</li>
          </ol>
          <p className="text-primary font-medium mt-1">
            Denne koblede tilbakekoblingen fortsetter å drive systemet inntil sesongens monsunvind snur i desember.
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 4. TELEKOBLINGER OG JETSTRØMMER ─────────────────────────── */}
      <CollapsibleSection
        title="4. Telekoblinger: Jetstrømmer, monsunen og globale værregimer"
        subtitle="Rossby-bølger mot polene · Forskyvning av den subtropiske jetstrømmen"
        badge="Telekoblinger"
        badgeVariant="amber"
      >
        <p>
          En <strong>telekobling</strong> er en statistisk og fysisk sammenheng mellom vær- og klimafenomener på steder
          som ligger tusenvis av kilometer fra hverandre (Marchant et al., 2007).
        </p>

        <PhotoFigure
          src="/images/fig-iod-sst.png"
          alt="Havoverflatetemperatur i Indiahavet med skarp fargegrense mot sør"
          heading="Figur 3. Havtemperaturer (SST) i Det indiske hav"
          caption="Tropisk Indiahav er generelt varmt. Men det er gradientene og avvikene fra normalen (anomaliene) som forskyver de store atmosfæriske trykkgrensene."
        />

        <PhotoFigure
          src="/images/fig-iod-jet.png"
          alt="Jordklode med subtropiske jetstrømmer over Indiahavet"
          heading="Figur 4. Subtropiske jetstrømmer over Indiahavet"
          caption="Jetstrømmene dannes i grensesonene mellom tropisk varme og polare luftmasser. Når IOD flytter konveksjonssonene, forskyves også jetstrømmenes bane og meandrering."
        />

        <IodTeleconnectionDiagram />
        <IodJetMeetingDiagram />

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
          <h4 className="font-display font-semibold text-sm text-foreground">
            Hvordan IOD forplanter seg via atmosfæriske Rossby-bølger:
          </h4>
          <p>
            Når gigantiske konveksjonsskyer tårner seg opp over et oppvarmet havområde, frigjøres kolossale mengder
            latent varme i midtre og øvre troposfære. Dette forstyrrer det globale trykkfeltet og eksiterer{" "}
            <strong>atmosfæriske Rossby-bølgetog</strong> som forplanter seg ut fra tropene mot midlere og høye breddegrader.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Den subtropiske jetstrømmen på sørlig halvkule:</strong> Under positiv IOD trekkes jeten
              sørover. Dette danner en blokkerende høytrykksrygg over Sør-Australia som avskjærer fuktige
              lavtrykkssystemer og sender temperaturene i været.
            </li>
            <li>
              <strong>Den indiske sommermonsunen:</strong> Positiv IOD fungerer som en «forsterker» for monsunregnet
              i det vestlige India, mens en negativ IOD kan gi monsunsvikt og landbrukstørke i delstater som Maharashtra.
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* ── 5. SAMSPILL MELLOM IOD OG ENSO ──────────────────────────── */}
      <CollapsibleSection
        title="5. Samspill mellom IOD og ENSO: Doble klimasjokk"
        subtitle="Hvorfor 1997 og 2019 ble historiske katastrofeår · «Black Summer» i Australia"
        badge="Klimamoduser"
        badgeVariant="positive"
      >
        <p>
          Selv om IOD og ENSO oppstår i to separate havbassenger (Indiahavet vs. Stillehavet), snakker de kontinuerlig
          sammen via <strong>Indonesian Throughflow</strong> (havstrømmen som renner gjennom de indonesiske stredene)
          og den sammenvevde globale Walker-sirkulasjonen (Abram et al., 2020).
        </p>

        <IodVsEnsoDiagram />

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
            <h4 className="font-semibold text-rose-300 text-sm">
              🔥 Positiv IOD + El Niño: Den doble tørkekatastrofen
            </h4>
            <p className="mt-2 text-muted-foreground">
              Både El Niño og Positiv IOD kjøler ned havoverflaten rundt Indonesia og Australia, og erstatter
              fuktig konveksjon med knusktørr, synkende luft.
            </p>
            <p className="mt-2 text-rose-200">
              <strong>1997 og 2019:</strong> I 2019 nådde DMI historiske <strong>+2,1 °C</strong> samtidig som
              Stillehavet var i en El Niño-liknende tilstand. Dette utløste <strong>«Black Summer»</strong> i Australia:
              Voldsomme hetebølger (over 49 °C), knusktørt jordsmonn og skogbranner som la et område på over
              <strong>180 000 km²</strong> i aske, ødela 3000 hjem og drepte eller fordrev anslagsvis tre milliarder dyr!
            </p>
          </div>

          <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
            <h4 className="font-semibold text-sky-300 text-sm">
              🌊 Negativ IOD + La Niña: Det doble flomsjokket
            </h4>
            <p className="mt-2 text-muted-foreground">
              Når en negativ IOD faller sammen med La Niña, pumper begge oscillasjonene varmt overflatevann og
              fuktighet direkte inn mot Nord- og Øst-Australia.
            </p>
            <p className="mt-2 text-sky-200">
              <strong>2010/11 og 2022:</strong> Sammenfallet ga historiske flomkatastrofer i Brisbane og New South Wales.
              Hele byer ble isolert av vannmassene, og kullgruver og landbruksområder sto under vann i månedsvis.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 6. EKSAMEN, BEGREPER OG QUIZ ────────────────────────────── */}
      <CollapsibleSection
        title="6. Eksamenssammendrag, misforståelser og test deg selv"
        subtitle="Nøkkellærdom for Geofag 2 · Begrepsapparat og testquiz"
        badge="Eksamen"
        badgeVariant="warning"
      >
        <Callout title="Viktig til eksamen om IOD">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Husk polene:</strong> IOD-polene er definert i <em>Det indiske hav</em>. Vestkysten av Australia
              og Indonesia utgjør den <strong>østlige polen</strong>!
            </li>
            <li>
              <strong>Temperatur mot anomali:</strong> Et vanlig temperaturkart viser at tropene alltid er varme
              (26–29 °C). For å identifisere en IOD-fase må du se på et <strong>anomalikart (avvik fra normalen)</strong>.
            </li>
            <li>
              <strong>Varmt hav = lavtrykk og regn:</strong> Der overflaten er unormalt varm, stiger luften, danner skyer
              og gir nedbør (Øst-Afrika i positiv IOD; Australia i negativ IOD).
            </li>
            <li>
              <strong>Kaldt hav = høytrykk og tørke:</strong> Der overflaten er unormalt kald (oppvelling), synker luften
              og gir stabilt tørt vær.
            </li>
          </ul>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            ❌ <em>«All tørke i Australia skyldes El Niño.»</em><br />
            Feil! IOD i Indiahavet er ofte en vel så direkte pådriver for tørke og skogbrannfare i det sørlige Australia
            som ENSO i Stillehavet.
          </p>
          <p className="mt-2">
            ❌ <em>«IOD og ENSO er det samme fenomenet.»</em><br />
            Nei! De opererer i to helt forskjellige havbassenger (Indiahavet vs. Stillehavet). De kan påvirke hverandre
            og inntreffe samtidig, men de har ulike frekvenser og mekanismer.
          </p>
        </Callout>

        <h3 className="font-display text-xl font-medium tracking-tight pt-2">Faglige nøkkelbegreper</h3>
        <TermGrid>
          <Term name="IOD" def="Indian Ocean Dipole; en periodisk svingning i havoverflatetemperatur og atmosfærisk sirkulasjon mellom østlige og vestlige deler av Det indiske hav." />
          <Term name="DMI" def="Dipole Mode Index; temperaturforskjellen mellom den vestlige polen (Arabiske hav) og den østlige polen (utenfor Sumatra/Java)." />
          <Term name="Positiv IOD" def="Modus med varmt hav i vest (flom i Øst-Afrika) og kaldt hav/oppvelling i øst (tørke og skogbranner i Indonesia og Australia)." />
          <Term name="Negativ IOD" def="Modus med kaldt hav i vest (tørke i Øst-Afrika) og varmt hav i øst (mer regn og flomfare i Australia)." />
          <Term name="Walker-sirkulasjon" def="Atmosfærisk sirkulasjonscelle langs ekvator med oppadgående bevegelse over varmt hav og synkende bevegelse over kaldere hav." />
          <Term name="Telekobling" def="Klimatisk sammenheng der en forstyrrelse i tropene (f.eks. konveksjon) forplanter seg via atmosfæriske bølger og endrer været tusenvis av kilometer unna." />
          <Term name="Bjerknes-tilbakekobling" def="Selvforsterkende kobling mellom havtemperaturgradient og vind som driver veksten til IOD- og ENSO-episoder." />
          <Term name="Wyrtki-jetter" def="Sesongmessige vestlige overflatestrømmer langs ekvator i Indiahavet som opptrer under overgangsperiodene mellom monsunene." />
        </TermGrid>

        <Quiz
          questions={[
            {
              prompt: "Hva kjennetegner en positiv fase av Indian Ocean Dipole (IOD)?",
              options: [
                "Havet er varmere enn normalt utenfor Øst-Afrika og kaldere enn normalt utenfor Indonesia og Australia.",
                "Hele Det indiske hav er 5 °C kaldere enn normalt.",
                "Havet utenfor Afrika er kaldt og Australia opplever ekstreme flommer.",
                "DMI er lik null og vestavinden over ekvator er uendret.",
              ],
              answer: 0,
              explain:
                "Positiv IOD defineres ved en positiv DMI: Varmt overflatevann i vest (utenfor Somalia/Kenya) og kaldt oppvelling-vann i øst (utenfor Sumatra).",
            },
            {
              prompt: "Hvorfor må man bruke et SST-anomalikart og ikke et vanlig temperaturkart for å oppdage en IOD-hendelse?",
              options: [
                "Fordi et vanlig kart bare måler lufttrykk.",
                "Fordi tropisk Indiahav alltid er varmt (26–29 °C); en anomali viser avviket fra normalen som driver trykkendringene.",
                "Fordi satellitter ikke kan måle vanlige temperaturer.",
                "Fordi saltet i havet forstyrrer vanlige termometre.",
              ],
              answer: 1,
              explain:
                "Tropisk hav er alltid varmt. Et lilla eller mørkerødt felt på et absolutt temperaturkart betyr bare at det er tropisk sommervann; det er anomalien (avviket fra normalen) som definerer dipolen.",
            },
            {
              prompt: "Hva skjer med Walker-sirkulasjonen under en kraftig positiv IOD?",
              options: [
                "Den forsvinner helt fra jorden.",
                "Den forskyves vestover: Den oppadgående konveksjonsgrenen flytter til Øst-Afrika, mens synkende tørr luft forsterkes over Indonesia og Australia.",
                "Den snur loddrett og blir til en havstrøm.",
                "Den flytter til Nordpolen.",
              ],
              answer: 1,
              explain:
                "Fordi det varme vannet samles i vest, flytter lavtrykket og konveksjonen dit, mens østlige Indiahav får stabilt høytrykk og subsidens.",
            },
            {
              prompt: "Hva var hovedårsaken til de katastrofale «Black Summer»-skogbrannene i Australia i 2019/20?",
              options: [
                "En ekstrem negativ IOD som brakte fuktig luft inn over ørkenen.",
                "En rekordsterk positiv IOD (DMI nådde +2,1 °C) i samspill med en El Niño-liknende tilstand i Stillehavet som ga ekstrem tørke og hete.",
                "Golfstrømmen stoppet opp.",
                "Menneskeskapt snømangel i Sydney.",
              ],
              answer: 1,
              explain:
                "I 2019 nådde den positive IOD-en sin høyeste målte verdi i moderne historie (+2,1 °C). Sammen med El Niño kuttet dette all nedbør og la Australia knusktørt.",
            },
            {
              prompt: "Hva skjer med termoklinen utenfor kysten av Sumatra/Java under en positiv IOD?",
              options: [
                "Den presses 300 meter dypere ned i havet.",
                "Den heves opp mot havoverflaten på grunn av sterk kystoppvelling drevet av anomale østavinder.",
                "Den forsvinner helt.",
                "Den fryser til is.",
              ],
              answer: 1,
              explain:
                "Østavindene dytter overflatevannet vestover, og dypvannet må velle opp for å fylle plassen. Dette hever termoklinen og kjøler ned overflaten.",
            },
            {
              prompt: "Hva er en 'telekobling' i klimasystemet?",
              options: [
                "En undersjøisk internettkabel som sender temperaturdata.",
                "En kobling der en klimatisk forstyrrelse i et område (f.eks. tropisk konveksjon) forplanter seg via atmosfæriske bølger og påvirker været tusenvis av kilometer unna.",
                "At tidevannet er synkront over hele jorden.",
                "Et dataprogram for værvarsling.",
              ],
              answer: 1,
              explain:
                "Telekoblinger er storskala atmosfæriske bølgeforbindelser (f.eks. Rossby-bølger eksitert av tropisk konveksjon) som endrer jetstrømmer og værregimer langt borte.",
            },
          ]}
        />
      </CollapsibleSection>
    </TopicLayout>
  );
}
