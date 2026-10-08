import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import { AmocDiagram, DensityDiagram } from "@/components/diagrams";
import { AmocTippingModel } from "@/components/models/amoc-tipping-model";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/amoc")({
  head: () =>
    topicHead({
      title: "AMOC: Den atlantiske omveltningssirkulasjonen · Geofag 2",
      description:
        "AMOC (Atlantic Meridional Overturning Circulation): Termohalin dypvannsdannelse, Golfstrømmen vs. AMOC, ferskvannspulser, Stommel-hysterese, vippepunkter og konsekvenser for Norges klima.",
      path: "/tema/klima/amoc",
    }),
  component: AmocPage,
});

function AmocPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimasystemet"
      title="AMOC: Den atlantiske omveltningssirkulasjonen"
      lead="Atlanterhavet har en enorm termisk pumpe: AMOC. Den frakter tropisk overskuddsvarme helt opp til de nordiske hav og gjør Norge beboelig på 60°N. Men når Grønlandsisen smelter og pumper ferskvann ut i havet, trues dypvannsdannelsen av et ikke-lineært vippepunkt."
      banner="/images/fig-amoc.jpg"
      bannerAlt="Nord-Atlanteren med fargegradient som illustrerer varme overflatestrømmer og kalde dypstrømmer"
      prev={{ to: "/tema/klima/nao", label: "Forrige: NAO" }}
      next={{ to: "/tema/kryosfaeren", label: "Neste: Kryosfæren" }}
      kilder={KILDER.amoc}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i Geofag 2 (LK20)">
        <p>
          Målet er at du skal kunne <em>gjøre rede for drivkreftene i den termohaline sirkulasjonen (AMOC)</em>,
          skille presist mellom <em>den vinddrevne Golfstrømmen og omveltningsbåndet</em>, analysere hvordan
          <em>ferskvannspulser kan utløse vippepunkter</em>, samt drøfte konsekvensene av en svekket AMOC for
          norsk og globalt klima (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      {/* ── 1. HVA ER AMOC OG SKILLET TIL GOLFSTRØMMEN ──────────────── */}
      <CollapsibleSection
        title="1. Hva AMOC er — og det avgjørende skillet til Golfstrømmen"
        subtitle="Termohalin motor mot vinddrevet gyre · Begrepsavklaring for eksamen"
        badge="Fundament"
        badgeVariant="primary"
        defaultOpen={true}
      >
        <p>
          <strong>AMOC</strong> står for <em>Atlantic Meridional Overturning Circulation</em> (Den atlantiske
          meridionale omveltningssirkulasjonen). Det er den atlantiske motoren i det globale termohaline
          transportbåndet som forbinder verdenshavene (Broecker, 1991; Rahmstorf et al., 2015).
        </p>

        <AmocDiagram />

        <div className="my-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-3">
          <h4 className="font-semibold text-primary text-sm">
            Det avgjørende faglige skillet: Golfstrømmen vs. AMOC
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            I media brukes begrepet «Golfstrømmen» ofte feilaktig om hele det atlantiske strømningssystemet,
            med sensasjonelle overskrifter om at «Golfstrømmen kan kollapse i morgen». I geofag må du skille
            krystallklart mellom to fundamentalt forskjellige fysiske systemer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg bg-background/80 p-3 border border-border">
              <strong className="text-foreground block text-sm">1. Golfstrømmen (Gulf Stream)</strong>
              <p className="mt-1 text-muted-foreground">
                En <strong>horisontal, vinddrevet overflatestrøm</strong> på vestkanten av den subtropiske gyren.
                Den drives av passatvindene, vestavindsbeltet og jordrotasjonens Corioliskraft. Så lenge planeten
                snurrer og atmosfæren har vind, <strong>vil Golfstrømmen eksistere</strong>. Den kan ikke «skrus av».
              </p>
            </div>
            <div className="rounded-lg bg-background/80 p-3 border border-border">
              <strong className="text-foreground block text-sm">2. AMOC (Omveltningsbåndet)</strong>
              <p className="mt-1 text-muted-foreground">
                Hele det <strong>tredimensjonale, vertikale transportbåndet</strong> som forbinder overflaten med
                dyphavet. AMOC drives av <em>tetthetsforskjeller</em> (temperatur og salt). Det er denne dype
                omveltningen og nedsynkingen i nord som kan svekkes eller nå et vippepunkt dersom vannet i nord
                blir for ferskt og lett!
              </p>
            </div>
          </div>
        </div>

        <OrdBoks
          ord="AMOC i tall"
          barn="AMOC transporterer ca. 17–18 Sverdrup (1 Sv = 1 million kubikkmeter vann per sekund!). Dette tilsvarer nesten 100 ganger den samlede vannføringen til alle verdens elver til sammen. I tillegg frakter den ca. 1,2 Petawatt (10¹⁵ W) varmeenergi nordover — tilsvarende energiproduksjonen fra en million store kjernekraftverk."
        />
      </CollapsibleSection>

      {/* ── 2. DYPVANNSDANNELSENS MOTOR ─────────────────────────────── */}
      <CollapsibleSection
        title="2. Dypvannsdannelsens motor: Saltadveksjon og arktisk avkjøling"
        subtitle="Åpenhavskonveksjon i Norskehavet og Labradorhavet · Tetthetsfysikk og NADW"
        badge="Termohalin motor"
        badgeVariant="teal"
      >
        <p>
          Hva er det som driver denne gigantiske motoren? Svaret ligger i <strong>tetthetsdifferansen</strong> mellom
          tropisk overflatevann og polart dyphav. Sjøvannets tetthet styres av tilstandsligningen $\rho(T, S)$:
        </p>

        <div className="my-2 rounded-lg bg-slate-900/90 p-3 text-center font-mono text-xs sm:text-sm font-semibold text-sky-400">
          Tetthetsendring: Δρ = -α · ΔT + β · ΔS
        </div>

        <DensityDiagram />

        <div className="my-4 rounded-xl border border-border/70 bg-card p-4 space-y-3 text-xs leading-relaxed">
          <h4 className="font-display font-semibold text-sm text-foreground">
            De tre trinnene i dypvannsdannelsen:
          </h4>
          <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong>1. Saltanriking i subtropene:</strong> I de subtropiske høytrykksbeltene (rundt 20°–30°N) er
              solinnstrålingen intens og fordampningen langt større enn nedbøren. Vannet mister fuktighet, og
              saltholdigheten stiger til over <strong>35,5–36,5 PSU</strong> (Practical Salinity Units). Dette varme,
              men usedvanlig salte overflatevannet føres nordover med Golfstrømmen og Den nordatlantiske strømmen.
            </li>
            <li>
              <strong>2. Ekstrem atmosfærisk avkjøling i nord:</strong> Når vannet når subpolare breddegrader i
              Labradorhavet, Grønlandshavet og Norskehavet om vinteren, møter det tørr, arktisk luft. Overflatevannet
              avgir enorme mengder varmeenergi (opptil <strong>300 W/m²</strong>) til atmosfæren. Temperaturen faller
              fra 12–15 °C til under 2 °C.
            </li>
            <li>
              <strong>3. Åpenhavskonveksjon og nedsynking:</strong> Kombinasjonen av <em>svært lav temperatur</em> og
              <em>høy saltholdighet</em> gjør vannet tyngre enn de underliggende lagene. Vannsøylen blir ustabil, og
              vannet velter ned i gigantiske roterende synletrakter (chimneys) på 2000–3500 meters dyp.
              Dette danner <strong>Nordatlantisk dypvann (NADW)</strong>, som strømmer sørover langs havbunnen.
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3 text-xs text-muted-foreground">
          <strong className="text-sky-300">Saltadveksjons-tilbakekoblingen (Positiv tilbakekobling):</strong>
          <p className="mt-1">
            Når dypvannet synker, skaper det et sug som trekker mer varmt og saltholdig vann nordover fra tropene.
            Dette tilførte saltet opprettholder overflatens høye tetthet og driver ytterligere konveksjon. Dette kalles
            <strong>saltadveksjons-tilbakekoblingen</strong> og er selve «tennpluggen» som holder AMOC i gang.
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 3. FERSKVANNSTRUSSELEN OG VIPPEPUNKTER ──────────────────── */}
      <CollapsibleSection
        title="3. Ferskvannstrusselen, Stommels to-boks-modell og vippepunkter"
        subtitle="Smeltevann fra Grønlandsisen · Ikke-lineær bifurkasjon og hysterese"
        badge="Vippepunkt"
        badgeVariant="amber"
      >
        <p>
          Hva skjer når den globale oppvarmingen akselererer? Den største trusselen mot AMOC er ikke varmen i seg selv,
          men <strong>ferskvann</strong> (Caesar et al., 2018):
        </p>

        <ul className="list-disc space-y-1.5 pl-6 text-xs text-foreground/90">
          <li>
            <strong>Akselerert smelting av Grønlandsisen:</strong> Grønland mister nå over 250 milliarder tonn is årlig,
            og smeltevannet renner ut som <em>rent ferskvann</em> i subpolare havområder.
          </li>
          <li>
            <strong>Økt arktisk elveavrenning og nedbør:</strong> En varmere atmosfære holder mer vanndamp (Clausius-Clapeyron:
            ca. 7 % per grad oppvarming). Nedbøren over Nord-Atlanteren øker, og de store sibirske elvene tømmer mer ferskvann i Polhavet.
          </li>
          <li>
            <strong>Mindre havisdannelse:</strong> Redusert isfrysing betyr mindre saltutstøting (brine rejection).
          </li>
        </ul>

        <div className="my-4 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs space-y-2">
          <h4 className="font-semibold text-rose-300 text-sm">
            Ferskvannslokket og tetthetskollapsen:
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Ferskvann har markant lavere tetthet enn saltvann (ferskvann ca. 1000 kg/m³ mot
            saltvann ca. 1028 kg/m³). Ferskvannet blander seg ikke lett nedover, men legger seg
            som et stabilt, flytende «lokk» over havoverflaten.
          </p>
          <p className="text-rose-200 leading-relaxed">
            Selv om vinterluften avkjøler dette overflatevannet ned mot frysepunktet, er det <strong>for lite salt til å bli
            tungt nok til å synke</strong> gjennom pyknoklinen. Den vertikale åpenhavskonveksjonen blokkeres, og AMOC-pumpen kveles!
          </p>
        </div>

        {/* Vår nye interaktive modell */}
        <AmocTippingModel />

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
          <h4 className="font-display font-semibold text-sm text-foreground">
            Stommels to-boks-modell (1961) og hysterese
          </h4>
          <p>
            I 1961 viste oseanografen Henry Stommel at AMOC er et <strong>ikke-lineært dynamisk system med to stabile tilstander</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-2.5">
              <strong className="text-sky-300 block">1. 'ON'-tilstanden (Dagens situasjon)</strong>
              <p className="mt-0.5">
                Sterk sirkulasjon. Saltadveksjonen bringer kontinuerlig nok salt nordover til å opprettholde konveksjonen.
              </p>
            </div>
            <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-2.5">
              <strong className="text-rose-300 block">2. 'OFF'-tilstanden (Kollapset AMOC)</strong>
              <p className="mt-0.5">
                Hvis ferskvannspådraget overskrider en kritisk terskel (F_crit), kollapser dypvannsdannelsen.
                Uten transport av salt fra tropene forblir Nord-Atlanteren fersk og lagdelt. Systemet låser seg i en kald tilstand!
              </p>
            </div>
          </div>
          <p className="pt-1">
            <strong>Hysterese</strong> innebærer at dersom vi krysser dette vippepunktet, vil ikke systemet starte igjen
            selv om smeltevannstilførselen reduseres tilbake til dagens nivå. Det kreves en dramatisk reduksjon i ferskvann
            over mange tiår for å gjenopprette saltbalansen!
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 4. PALEOKLIMATISKE BEVIS ────────────────────────────────── */}
      <CollapsibleSection
        title="4. Paleoklimatiske bevis: Yngre dryas og Heinrich-hendelser"
        subtitle="Når transportbåndet bråbremset i fortiden · Lake Agassiz og Dansgaard-Oeschger-sykluser"
        badge="Paleoklima"
        badgeVariant="sky"
      >
        <p>
          Hvordan vet forskerne at AMOC faktisk kan kollapse? Det beste beviset kommer fra jordens egen historie,
          nedskrevet i <strong>grønlandske iskjerner (GISP2, NGRIP)</strong> og havbunnssedimenter (IPCC, 2021).
        </p>

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-sky-500/30 bg-sky-950/15 p-4">
            <h4 className="font-semibold text-sky-300 text-sm">
              🧊 Yngre dryas (Younger Dryas, 12 800 år siden)
            </h4>
            <p className="mt-2 text-muted-foreground">
              Da siste istid var i ferd med å ebbe ut for ca. 12 800 år siden, brast en enorm isdemning i Nord-Amerika.
              Den gigantiske bresjøen <strong>Lake Agassiz</strong> (større enn alle de store sjøene til sammen)
              tømte over 9500 kubikk-kilometer ferskvann ut i Nord-Atlanteren via St. Lawrence-dalen på få måneder.
            </p>
            <p className="mt-2 text-sky-200">
              <strong>Klimasjokket:</strong> Ferskvannet kvelte dyp konveksjon og slo av AMOC. Temperaturen i
              Nord-Europa og på Grønland <strong>stupte med 5–10 °C på under et tiår</strong>! Norge ble kastet tilbake
              i en 1100 år lang arktisk kuldeperiode før AMOC omsider startet opp igjen ved inngangen til Holocen.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/15 p-4">
            <h4 className="font-semibold text-indigo-300 text-sm">
              🚢 Heinrich-hendelser og Dansgaard-Oeschger (D-O)
            </h4>
            <p className="mt-2 text-muted-foreground">
              Under siste istid opplevde kloden gjentatte <strong>Heinrich-hendelser</strong>: Enorme armader av
              isfjell løsnet fra den laurentiske innlandsisen og drev ut i Atlanteren.
            </p>
            <p className="mt-2 text-indigo-200">
              Når isfjellene smeltet, etterlot de sedimentlag (Ice-Rafted Debris, IRD) på havbunnen og tilførte
              så mye ferskvann at AMOC bremset kraftig opp. Dette utløste de dramatiske <strong>Dansgaard-Oeschger-syklusene</strong>,
              med lynraske temperaturhopp og -fall i subpolare strøk.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 5. NÅTIDSSTATUS OG KONSEKVENSER FOR NORGE ────────────────── */}
      <CollapsibleSection
        title="5. Nåtidsstatus, 'Cold Blob' og konsekvenser for Norge"
        subtitle="Måleserier (RAPID, OSNAP) · Kaldlommen sør for Grønland · Regionale følger"
        badge="Klimarisiko"
        badgeVariant="warning"
      >
        <p>
          Observasjonssystemene <strong>RAPID-MOCHA</strong> (fortøyningsbøyer langs 26,5°N) og <strong>OSNAP</strong>{" "}
          (i subpolare Nord-Atlanteren) har overvåket AMOC direkte siden 2004. Rekonstruksjoner og måledata indikerer
          at AMOC allerede har <strong>svekket seg med 10–15 %</strong> siden midten av 1900-tallet (Smeed et al., 2018).
        </p>

        <div className="my-4 rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 text-xs leading-relaxed">
          <h4 className="font-semibold text-sky-300 text-sm">
            «The Cold Blob» (Kaldlommen i Nord-Atlanteren):
          </h4>
          <p className="mt-1.5 text-muted-foreground">
            Det mest slående fysiske fingeravtrykket på en svekket AMOC er den såkalte <strong>kaldlommen</strong> i
            havet sør for Grønland og Island. Mens praktisk talt hele resten av kloden opplever kraftig oppvarming,
            er dette havområdet <em>det eneste stedet på jorden</em> som har opplevd en netto avkjøling de siste 70 årene!
            Årsaken er at den nordgående varmetransporten med Den nordatlantiske strømmen har slakket av.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3 text-xs leading-relaxed">
          <h4 className="font-display font-semibold text-sm text-foreground">
            Hva skjer dersom AMOC fortsetter å svekkes kraftig?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <strong className="text-primary block text-sm">🇳🇴 Norge og Nord-Europa</strong>
              <p className="mt-1 text-muted-foreground">
                Den globale oppvarmingen motvirkes lokalt. Vintrene kan bli <strong>2–5 °C kaldere</strong> enn i dag.
                Temperaturforskjellen mellom Arktis og tropene øker, noe som forsterker stormbanene og gir mer ekstremvær
                og kortere vekstsesong for landbruket.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <strong className="text-amber-400 block text-sm">🇺🇸 USAs østkyst</strong>
              <p className="mt-1 text-muted-foreground">
                Når strømmen svekkes, faller den dynamiske helningen på havoverflaten (som normalt trekker vann bort
                fra kysten). Dette gir en <strong>ekstra havnivåstigning på 15–35 cm</strong> i New York, Boston og
                Miami, uavhengig av bresmelting!
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <strong className="text-rose-400 block text-sm">🌍 Tropene og Sahel</strong>
              <p className="mt-1 text-muted-foreground">
                Uten varmetransport nordover blir den sørlige halvkule relativt varmere enn den nordlige.
                <strong>ITCZ (det tropiske regnbeltet) forskyves sørover</strong>, noe som kan gi katastrofal tørke
                i Sahel i Afrika og forstyrre monsunregnet som milliarder av mennesker i Asia er avhengige av.
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 6. EKSAMEN, BEGREPER OG QUIZ ────────────────────────────── */}
      <CollapsibleSection
        title="6. Eksamenssammendrag, misforståelser og quiz"
        subtitle="Nøkkelkunnskap for Geofag 2 · Begrepsapparat og test deg selv"
        badge="Eksamen"
        badgeVariant="default"
      >
        <Callout title="Viktig til eksamen om AMOC">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Husk forskjellen:</strong> Golfstrømmen er vinddrevet og stopper ikke. AMOC er det vertikale
              omveltningsbåndet drevet av tetthetsforskjeller, og det kan svekkes!
            </li>
            <li>
              <strong>Mekanisme for svekkelse:</strong> Ferskvann fra Grønland $\to$ lavere saltholdighet $\to$ lavere tetthet
              $\to$ overflatevannet klarer ikke å synke $\to$ AMOC bremser.
            </li>
            <li>
              <strong>Vippepunkt og hysterese:</strong> Stommels modell viser at AMOC har to likevektstilstander.
              Krysses terskelen, kreves enorm innsats over lang tid for å snu tilstanden.
            </li>
            <li>
              <strong>Kaldlommen:</strong> Observasjonsbeviset sør for Grønland som bekrefter svekket varmetransport.
            </li>
          </ul>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            ❌ <em>«En svekket AMOC betyr ny istid over hele kloden i neste uke (som i filmen The Day After Tomorrow).»</em><br />
            Nei! Dette er en Hollywood-karikatur. En svekkelse skjer over tiår, og den kjemper mot den pågående
            menneskeskapte oppvarmingen fra klimagasser. Globalt forblir kloden varmere.
          </p>
          <p className="mt-2">
            ❌ <em>«Golfstrømmen snur og renner baklengs.»</em><br />
            Feil! Golfstrømmen drives av vestavinden og passatene og snur aldri. Det er dypvannsdannelsen i Norskehavet
            og Labradorhavet som avtar.
          </p>
        </Callout>

        <h3 className="font-display text-xl font-medium tracking-tight pt-2">Faglige nøkkelbegreper</h3>
        <TermGrid>
          <Term name="AMOC" def="Atlantic Meridional Overturning Circulation; det storskala vertikale transportbåndet i Atlanterhavet drevet av temperatur og saltholdighet." />
          <Term name="Golfstrømmen" def="Vinddrevet vestlig randstrøm i den subtropiske gyren langs kysten av USA. Drives av jordrotasjon og vind; ikke det samme som AMOC." />
          <Term name="NADW" def="North Atlantic Deep Water; det kalde, salte og oksygenrike dypvannet som dannes ved åpenhavskonveksjon og strømmer sørover på 2000–3500 m dyp." />
          <Term name="Åpenhavskonveksjon" def="Vertikal nedsynking av overflatevann i roterende søyler (chimneys) når overflaten blir tettere enn lagene under." />
          <Term name="Ferskvannspådrag" def="Tilførsel av ferskvann (smelting fra Grønland, elveavrenning og nedbør) som senker saltholdigheten og hemmer nedsynking." />
          <Term name="Stommel-hysterese" def="Teorien om at AMOC har to stabile tilstander ('On' og 'Off'), og at overgangen mellom dem er uomvendelig uten drastisk endring i ferskvann." />
          <Term name="Vippepunkt" def="En kritisk terskel der en liten tilleggsendring utløser et selvforsterkende og brått skifte til en ny likevektstilstand." />
          <Term name="Cold Blob" def="Havområdet sør for Grønland som har opplevd markant avkjøling, et fysisk fingeravtrykk på svekket AMOC." />
        </TermGrid>

        <Quiz
          questions={[
            {
              prompt: "Hva er hoveddrivkraften bak nedsynkingen av overflatevann (dyp konveksjon) i Nord-Atlanteren?",
              options: [
                "At overflatevannet er både svært salt og sterkt nedkjølt, noe som gir maksimal tetthet.",
                "At store magnetiske felter trekker vannet mot havbunnen.",
                "At ferskvann fra breer er mye tyngre enn saltvann.",
                "At Corioliseffekten presser vannet loddrett nedover ved polene.",
              ],
              answer: 0,
              explain:
                "Kombinasjonen av høy saltholdighet (fra subtropene) og ekstrem avkjøling gjør overflatevannet tyngre enn lagene under, slik at det velter ned og danner NADW.",
            },
            {
              prompt: "Hvorfor kan økt smelting fra Grønlandsisen svekke AMOC?",
              options: [
                "Fordi isfjellene fysisk blokkerer Golfstrømmen som en demning.",
                "Fordi ferskvann har lavere tetthet enn saltvann, slik at overflatevannet ikke blir tungt nok til å synke selv om det avkjøles.",
                "Fordi smeltevannet koker opp og fordamper hele Norskehavet.",
                "Fordi ferskvannet stanser jordens rotasjon.",
              ],
              answer: 1,
              explain:
                "Ferskvann gjør overflaten lettere. Vannet forblir flytende på toppen som et lokk og forhindrer dyp konveksjon.",
            },
            {
              prompt: "Hva er forskjellen mellom Golfstrømmen og AMOC?",
              options: [
                "Golfstrømmen er en vinddrevet overflatestrøm i den subtropiske gyren, mens AMOC er hele det vertikale omveltningsbåndet.",
                "Det er ingen forskjell, de to begrepene betyr nøyaktig det samme.",
                "Golfstrømmen går i Stillehavet, mens AMOC går i Atlanterhavet.",
                "AMOC eksisterer bare om sommeren.",
              ],
              answer: 0,
              explain:
                "Golfstrømmen er en vestlig randstrøm styrt av vind og Corioliskraft, mens AMOC er det termohaline omveltningsbåndet.",
            },
            {
              prompt: "Hva betyr begrepet 'hysterese' i Stommels to-boks-modell for AMOC?",
              options: [
                "At havstrømmen skifter retning to ganger i døgnet på grunn av tidevannet.",
                "At dersom AMOC kollapser over et vippepunkt, vil den ikke starte igjen selv om ferskvannspådraget reduseres til det opprinnelige nivået.",
                "At saltholdigheten i havet er konstant overalt.",
                "At vanntemperaturen stiger lineært med atmosfæretrykket.",
              ],
              answer: 1,
              explain:
                "Hysterese betyr at systemets tilstand avhenger av historien: Uten aktiv saltadveksjon kreves det langt gunstigere forhold (mye mindre ferskvann) for å restarte AMOC.",
            },
            {
              prompt: "Hva er den såkalte 'Cold Blob' (kaldlommen) sør for Grønland et tegn på?",
              options: [
                "At en undersjøisk vulkan har eksplodert og kjølt ned havet.",
                "At AMOC og Den nordatlantiske strømmen har svekket seg og frakter mindre tropisk varme nordover.",
                "At Grønland har sluttet å smelte.",
                "At Corioliskraften har snudd retning.",
              ],
              answer: 1,
              explain:
                "Kaldlommen er et direkte fingeravtrykk på at transportbåndet har mistet fart: Det tilføres mindre varme fra sør til subpolare Nord-Atlanteren.",
            },
            {
              prompt: "Hva skjedde under Yngre dryas for 12 800 år siden?",
              options: [
                "En enorm ferskvannspuls fra bresjøen Lake Agassiz slo ut AMOC og sendte Nordvest-Europa inn i en 5–10 °C kuldeperiode.",
                "Golfstrømmen tørket helt ut på grunn av tørke i Karibia.",
                "Jorden gikk inn i en supervarm mellomistid uten snø.",
                "Dinosaurene døde ut på grunn av havnivåstigning.",
              ],
              answer: 0,
              explain:
                "Tømmingen av Lake Agassiz er det klassiske paleoklimatiske beviset på at en plutselig ferskvannspuls kan kvele dyp konveksjon og gi lynrask regional nedkjøling.",
            },
          ]}
        />
      </CollapsibleSection>
    </TopicLayout>
  );
}
