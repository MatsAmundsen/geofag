import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  AbruptClimateChangeDiagram,
  DeglaciationFeedbackDiagram,
  IceCoreAnatomyDiagram,
  KvartarTimeSeriesDiagram,
  OxygenIsotopeDiagram,
} from "@/components/diagrams";
import { PaleoClimateIsotopeModel } from "@/components/models/paleo-climate-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/paleoklima")!;

export const Route = createFileRoute("/tema/paleoklima")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/paleoklima",
    }),
  component: PaleoklimaPage,
});

function PaleoklimaPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Arkiv"
      title={tema.title}
      lead="Termometre og satellitter dekker et øyeblikk: globalt 150–170 år med instrumentelle målinger, CO₂ på Mauna Loa siden 1958, og havis fra satellitt siden 1979. Jordens sanne klimaspenn — istider, hetebølger og brå vippepunkter — ligger låst inne i is, havbunn, innsjøsedimenter og myrer. Uten disse paleoklimatiske arkivene kan vi verken vite om dagens menneskeskapte CO₂-nivå er unikt, eller om de numeriske klimamodellene treffer når kloden varmes opp."
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/milankovitch", label: "Neste: Istider" }}
      kilder={KILDER.paleoklima}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i Geofag 2 (LK20)">
        <p>
          Gjøre rede for forskning på forhistorisk klima, og forklare hvordan paleoklimatiske
          arkiver bidrar til å kalibrere numeriske modeller og lage pålitelige prognoser for
          framtidens klima.
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Sentrale kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Paleoklimatiske arkiver og metoder:</em> Iskjerner, havbunnssedimenter, innsjøvarver, pollenanalyse og dendrokronologi.</p>
          <p>• <em>Isotopgeokjemi:</em> Oksygenisotopen δ¹⁸O, Rayleigh-fraksjonering, isotoptermometer i is vs. foraminiferkalk på havbunnen.</p>
          <p>• <em>Istidskronologi og terskler:</em> Kvartær, Eem, Siste istidsmaksimum (LGM), Yngre Dryas, Holocen og PETM (56 mill. år).</p>
          <p>• <em>Modellvalidering:</em> Hvordan forhistoriske analoger tester klimafølsomheten (ECS) i numeriske modeller.</p>
        </div>
      </Callout>

      <p>
        Å studere forhistorisk klima handler ikke om å pugge årstall og geologiske navn. Det handler
        om en urokkelig vitenskapelig kjede: <em>Et fysisk spor bevares i et naturlig arkiv</em> →{" "}
        <em>vi daterer laget</em> → <em>vi kalibrerer sporet mot moderne fysiske prosesser</em> →{" "}
        <em>vi rekonstruerer fortidens temperatur og atmosfære med kvantitativ usikkerhet</em> →{" "}
        <em>vi tester fysikken i de{" "}
        <Link to="/tema/numeriske-modeller" className="text-primary underline-offset-2 hover:underline">
          numeriske klimamodellene
        </Link>
        </em>.
      </p>

      {/* ================= SEKSJON 1: KRONOLOGI & TIDSSKALAER ================= */}
      <CollapsibleSection
        title="1. Istidskronologi og geologiske tidsskalaer: Fra Kvartær til Holocen"
        subtitle="2,6 millioner år med istider, 100 000-års sykluser, Weichsel og overgangen til sivilisasjonens Holocen"
        badge="Kronologi"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          For å forstå klimaet vi lever i dag, må vi se på jordens nyeste geologiske periode:{" "}
          <strong>Kvartær</strong>, som startet for <strong>2,58 millioner år siden</strong>. Kvartær
          deles inn i to epoker: <em>Pleistocen</em> (istidsalderen) og <em>Holocen</em> (vår nåværende
          mellomistid).
        </p>
        <p>
          Gjennom Kvartær har klimaet vekslet rytmisk mellom lange, kalde istider (glasialer) og kortere,
          varme mellomistider (interglasialer):
        </p>

        <KvartarTimeSeriesDiagram />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Kvartærtidens to rytmer: 41 000 år og 100 000 år
          </h4>
          <p>
            I tidlig pleistocen (fra 2,58 til ca. 1,0 millioner år siden) svingte istidene i en jevn{" "}
            <strong>41 000-års rytme</strong>. Dette mønsteret ble styrt direkte av variasjoner i jordaksens
            helning (oblikvitet).
          </p>
          <p>
            For omtrent 1 million år siden inntraff en fundamental endring i jordsystemet, kjent som{" "}
            <strong>den midt-pleistocenske overgangen (MPT - Mid-Pleistocene Transition)</strong>.
            Uten at solinnstrålingens banemønster endret seg, skiftet klimarytmen til vesentlig lengre,
            dypere og mer asymmetriske <strong>100 000-års sykluser</strong>. Istidene ble preget av et
            karakteristisk <em>sagtanmønster</em>: en langsom oppbygging av gigantiske innlandsiser over
            80 000–90 000 år, etterfulgt av en eksplosiv og rask avsmelting (terminasjon) i løpet av bare
            5 000–10 000 år.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 pt-2 text-xs">
          <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
            <span className="font-semibold text-sky-400">Siste istid (Weichsel, ca. 115 000–11 700 år før nå)</span>
            <p className="text-muted-foreground leading-relaxed">
              Under <strong>Siste istidsmaksimum (LGM - Last Glacial Maximum)</strong> for ca. 21 000 år
              siden var Skandinavia begravet under en opptil 3000 meter tykk innlandsis (Det fennoskandiske
              isdekket). Globalt havnivå var hele <strong>120–130 meter lavere</strong> enn i dag fordi
              enorme vannmasser var bundet på land. Nordsjøen var tørt land (Doggerland).
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
            <span className="font-semibold text-emerald-400">Holocen (vår mellomistid, fra 11 700 år før nå)</span>
            <p className="text-muted-foreground leading-relaxed">
              Holocen ble formelt definert og datert ved en dybde på 1492,45 meter i NGRIP-iskjernen på
              Grønland (Walker et al., 2009). Denne mellomistiden har vært usedvanlig klimastabil. Under{" "}
              <strong>det holocene klimaoptimumet (ca. 8000–5000 år før nå)</strong> lå sommertemperaturene
              i Norge 1,5–2,0 °C høyere enn førindustrielt nivå, og Hardangerjøkulen var nesten smeltet bort.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Kvartær"
          barn="Den geologiske perioden de siste 2,58 millioner årene fram til i dag. Karakteriseres av gjentatte istider og mellomistider, oppdelt i epokene Pleistocen og Holocen."
        />
        <OrdBoks
          ord="Holocen"
          barn="Vår nåværende mellomistid som startet for nøyaktig 11 700 år siden (9700 f.Kr.). Starten er definert av en brå oppvarming i Grønlands iskjerner."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 2: ISKJERNER & GASSALDER ================= */}
      <CollapsibleSection
        title="2. Iskjerner og atmosfærisk gassalder (Δage): Fysiske prøver av fortidens luft"
        subtitle="EPICA Dome C, Vostok og Grønland: Direkte spektrometri vs. proxyfortolkning"
        badge="Kryosfære"
        badgeVariant="sky"
      >
        <p>
          Iskjerner fra de store innlandsisene i Antarktis og på Grønland er naturens mest komplette og
          høyoppløselige klimaarkiv. Snø som faller år etter år, legger seg i lag. Tyngden av nye snøfall
          presser de dypere lagene sammen til tett breis.
        </p>

        <PhotoFigure
          src="/images/fig-iskjerne.jpg"
          alt="Sylinder av blå is med tynne årlige lag og innestengte luftbobler"
          heading="Iskjernens anatomi: Luftboblene er ekte forhistorisk atmosfære"
          caption="En borekjerne hentet opp fra flere tusen meters dyp i innlandsisen. Iskjernen gir to fundamentalt ulike typer klimainformasjon: Selve isen er frosset nedbør som fungerer som en temperaturproxy via oksygenisotoper (δ¹⁸O). De mikroskopiske luftboblene er derimot direkte, fysiske prøver av jordens forhistoriske atmosfære, forseglet uten forurensning."
          marks={[
            { x: 10, y: 18, n: "1", text: "Årlige snølag", tone: "cold" },
            { x: 58, y: 46, n: "2", text: "Innestengte luftbobler", tone: "teal" },
            { x: 82, y: 72, n: "3", text: "Firn-forsegling (Δage)", tone: "warm" },
            { x: 25, y: 82, n: "4", text: "Tefra / vulkansk støv", tone: "low" },
          ]}
          points={[
            {
              n: "1",
              label:
                "Årlige lag: Telles visuelt, kjemisk (sesongvariasjon i kalsium og støv) og via elektrisk konduktivitet. På Grønland kan lagene telles år for år over 60 000 år tilbake.",
            },
            {
              n: "2",
              label:
                "Luftbobler: Inneholder ekte fortidsluft. CO₂, metan (CH₄) og lystgass (N₂O) måles direkte med gasskromatografi og massespektrometri — dette er ikke en tolkning, men et fysisk faktum.",
            },
            {
              n: "3",
              label:
                "Gassalder (Δage): Snøen komprimeres via firn. Porene lukkes først på 50–100 meters dyp. Luften er derfor 500–5000 år yngre enn isen rundt, noe forskerne korrigerer for.",
            },
            {
              n: "4",
              label:
                "Vulkanske askelag (tefra): Fungerer som absolutte tidshorisonter (isokroner) som binder grønlandske kjerner, europeiske torvmyrer og marine sedimenter sammen til én felles tidslinje.",
            },
          ]}
        />

        <IceCoreAnatomyDiagram />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Hvorfor luftboblene er unike: Direkte måling vs. indirekte proxy
          </h4>
          <p>
            Et avgjørende vitenskapelig skille i Geofag 2 er forskjellen på en <strong>proxy</strong>{" "}
            og en <strong>direkte fysisk måling</strong>:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Selve isen (H₂O) er en proxy:</strong> Forholdet mellom isotopene ¹⁸O og ¹⁶O i
              vannmolekylene gir en <em>indirekte indikasjon</em> på temperaturen i skyen da snøen falt.
            </li>
            <li>
              <strong>Gassen i boblene er en direkte måling:</strong> Når firnen klemmes sammen til is,
              fanges atmosfæreluft fra det eksakte øyeblikket hermetisk. Konsentrasjonen av CO₂ (målt i
              parts per million, ppm) er en direkte laboratoriemåling på linje med en flaske luft tappet i går.
            </li>
          </ul>
          <p>
            Iskjernen <strong>EPICA Dome C</strong> i Antarktis boret 3270 meter ned til fjellet og
            avdekket 800 000 år med uavbrutt atmosfærehistorie (Lüthi et al., 2008). Dataene beviser at
            CO₂-konsentrasjonen gjennom 8 fullstendige istidssykluser aldri sank under ca.{" "}
            <strong>180 ppm</strong> i de dypeste istidene, og aldri oversteg ca. <strong>280–300 ppm</strong>{" "}
            i de varmeste mellomistidene. Dagens nivå på over <strong>425 ppm</strong> er fullstendig utenfor
            naturens eget svingningsrom i hele Kvartærtiden.
          </p>
        </div>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-2">
          <h5 className="font-semibold text-primary text-sm">
            Forstå gassalderen (Δage): Hvorfor er luften yngre enn isen?
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            Nysnø på toppen av en innlandsis er ekstremt luftig og porøs. Det øverste laget (0–50 meter) kalles{" "}
            <em>firn</em>. I dette laget er porene åpne og forbundet med hverandre, slik at atmosfærisk luft
            diffunderer fritt opp og ned. Først på 50–100 meters dyp blir overlagstrykket fra ny snø så stort at
            is krystalliserer sammen og forsegler porene til separate luftbobler (pore closure depth).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dette betyr at <strong>luften forsegles mye senere enn snøen falt</strong>. På Antarktis-platået,
            der det faller svært lite snø årlig, kan gassen i boblene være over <strong>2000 til 5000 år yngre</strong>{" "}
            enn isen som omgir den! Denne aldersforskjellen kalles <strong>Δage (delta-age)</strong>. Forskere må
            bruke gassdiffusjonsmodeller for å tidssynkronisere temperaturkurven (fra isen) og CO₂-kurven (fra boblene).
          </p>
        </div>

        <OrdBoks
          ord="Gassalder (Δage)"
          barn="Forskjellen i alder mellom isen og luften i boblene. Oppstår fordi snøen er åpen og porøs (firn) de første 50–100 meterne, slik at gassen forsegles først tusenvis av år etter at snøen falt."
        />
        <OrdBoks
          ord="EPICA Dome C"
          barn="Europeisk iskjerneprosjekt i Øst-Antarktis. Kjernen er 3270 meter lang og strekker seg over 800 000 år tilbake i tid, gjennom 8 fullstendige istider og mellomistider."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 3: OKSYGENISOTOPER & RAYLEIGH ================= */}
      <CollapsibleSection
        title="3. Oksygenisotoper (δ¹⁸O) og Rayleigh-fraksjonering: Jordens kjemiske termometer"
        subtitle="Speilforholdet: Hvorfor lav δ¹⁸O i is betyr det samme som høy δ¹⁸O på havbunnen"
        badge="Isotoper"
        badgeVariant="amber"
      >
        <p>
          Oksygen i naturen består hovedsakelig av to stabile isotoper: det lette{" "}
          <strong>¹⁶O (99,76 %)</strong> med 8 protoner og 8 nøytroner, og det tyngre{" "}
          <strong>¹⁸O (0,20 %)</strong> med 8 protoner og 10 nøytroner. Fordi vannmolekyler med ¹⁸O (H₂¹⁸O)
          er tyngre enn vannmolekyler med ¹⁶O (H₂¹⁶O), oppfører de seg ulikt under faseoverganger
          (fordampning og kondensasjon).
        </p>

        <OxygenIsotopeDiagram />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Rayleigh-fraksjonering fra ekvator til polene
          </h4>
          <p>
            Prosessen som styrer isotopsammensetningen kalles <strong>Rayleigh-fraksjonering</strong>:
          </p>
          <ol className="list-decimal space-y-2 pl-6 text-sm">
            <li>
              <strong>Fordampning i subtropene:</strong> Det lette vannmolekylet H₂¹⁶O har høyere
              damptrykk og fordamper lettere enn H₂¹⁸O. Vanndampen som stiger opp fra det varme havet,
              har derfor en lavere ratio av ¹⁸O/¹⁶O enn havvannet (typisk rundt -10 ‰ til -13 ‰).
            </li>
            <li>
              <strong>Kondensasjon og transport mot polene:</strong> Når luftmassene beveger seg mot
              høyere breddegrader og avkjøles, kondenserer vanndamp til skyer og nedbør. Det tunge molekylet
              H₂¹⁸O kondenserer først fordi det har lavere metningstrykk. Dermed regner det tunge vannet ut
              underveis over tempererte strøk.
            </li>
            <li>
              <strong>Ekstrem utarming over innlandsisene:</strong> Skyen som omsider når innover Grønland
              eller Antarktis, har tapt nesten alt sitt tunge ¹⁸O. Snøen som faller på polplatået er ekstremt
              fattig på ¹⁸O, med sterkt negative δ¹⁸O-verdier (ned mot -35 ‰ på Grønland og -55 ‰ til -60 ‰
              i Antarktis).
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2 text-xs">
          <span className="font-semibold text-foreground text-sm">Formelen for δ¹⁸O (promilleavvik):</span>
          <p className="font-mono text-muted-foreground">
            δ¹⁸O = [ ( (¹⁸O/¹⁶O)prøve / (¹⁸O/¹⁶O)standard ) - 1 ] × 1000 ‰
          </p>
          <p className="text-muted-foreground">
            Standarden for vann og is er <strong>VSMOW (Vienna Standard Mean Ocean Water)</strong>,
            mens standarden for marine kalkfossiler er <strong>VPDB (Vienna Pee Dee Belemnite)</strong>.
          </p>
        </div>

        {/* DET VIKTIGE SPEILVENDTE FORHOLDET */}
        <div className="rounded-xl border-2 border-primary/40 bg-card p-4 space-y-3">
          <h4 className="font-display text-base font-semibold text-foreground">
            Eksamensfellen: Hvorfor tolkes δ¹⁸O motsatt i is og på havbunn?
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Mange geofagelever stryker på å blande sammen arkivene. Skriv aldri bare «høy δ¹⁸O betyr varme»
            uten å spesifisere <em>hvilket arkiv</em> du snakker om:
          </p>

          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-sky-500/40 bg-sky-950/20 p-3">
              <span className="font-semibold text-sky-300">1. I iskjernen (Nedbørsarkiv):</span>
              <p className="mt-1 font-bold text-foreground">Kaldt klima (istid) = LAV (sterkt negativ) δ¹⁸O</p>
              <p className="mt-1 text-muted-foreground">
                Kald luft holder lite fuktighet, og nesten alt ¹⁸O har regnet ut lenge før skyen når polen.
                Mindre ¹⁸O i snøen gir kraftig negativ verdi (f.eks. -42 ‰ på Grønland under LGM).
              </p>
            </div>

            <div className="rounded-lg border border-amber-500/40 bg-amber-950/20 p-3">
              <span className="font-semibold text-amber-300">2. I foraminiferer på havbunnen (Kalsittarkiv):</span>
              <p className="mt-1 font-bold text-foreground">Kaldt klima (istid) = HØY (mer positiv) δ¹⁸O</p>
              <p className="mt-1 text-muted-foreground">
                Under en istid bindes enorme mengder <em>lett ¹⁶O</em> fast i kilometertykke innlandsiser på
                land. Havet tappes for ¹⁶O og blir anriket på <em>tungt ¹⁸O</em>. Bunnlevende foraminiferer
                bygger dette tunge havvannet inn i kalkskallene sine (CaCO₃).
              </p>
            </div>
          </div>
        </div>

        <OrdBoks
          ord="δ¹⁸O"
          barn="Mål på avviket i forholdet mellom oksygenisotopene ¹⁸O og ¹⁶O, oppgitt i promille (‰). I is: lav verdi = kaldt. I havbunnskalk: høy verdi = mye is på land og kaldt dypvann."
        />
        <OrdBoks
          ord="Rayleigh-fraksjonering"
          barn="Fysisk separasjon av lette og tunge molekyler under faseoverganger. Tungt H₂¹⁸O regner ut først, slik at skyene blir mer og mer utarmet på vei mot polene."
        />
      </CollapsibleSection>

      {/* ================= INTERAKTIV MODELL ================= */}
      <section className="my-8">
        <PaleoClimateIsotopeModel />
      </section>

      {/* ================= SEKSJON 4: SEDIMENTKJERNER ================= */}
      <CollapsibleSection
        title="4. Sedimentkjerner fra hav og innsjøer: Mikrofossiler, varver og alkenoner"
        subtitle="Bentiske foraminiferer, kiselalger, dropstones (IRD), innsjøvarver og overflatetemperatur"
        badge="Sedimenter"
        badgeVariant="positive"
      >
        <p>
          Iskjernene dekker bare de siste 800 000 årene og finnes kun ved polene. For å gå lenger
          tilbake i tid, eller for å kartlegge havstrømmenes og havtemperaturers utvikling, må geofagfolk
          bore i <strong>marine og lakustrine sedimentkjerner</strong>.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
            <h5 className="font-semibold text-foreground text-sm">
              Marine borekjerner (IODP / ODP)
            </h5>
            <p className="text-muted-foreground leading-relaxed">
              Forskingsskip borer tusenvis av meter ned i havbunnen. På dyphavsslettene avsettes det
              kontinuerlig et «regn» av mikroskopiske organismer med skall av kalsitt (foraminiferer,
              kokkolittplater) eller kisel (radiolarer, diatomeer).
            </p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Bentiske foraminiferer:</strong> Lever på havbunnen. Deres kalsittskall gjenspeiler
                globalt isvolum og bunnvannstemperatur (stabil referansekurve).
              </li>
              <li>
                <strong>Planktoniske foraminiferer:</strong> Lever i overflaten. Deres isotoper og artssammensetning
                avslører overflatetemperaturen (SST) og overflatesaliniteten der de levde.
              </li>
              <li>
                <strong>Alkenoner (U³⁷_K):</strong> Organiske lipider produsert av encellede haptofyte alger.
                Forholdet mellom umettede fettsyrer endrer seg med vanntemperaturen og gir et nøyaktig
                «organisk termometer» for havoverflaten.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
            <h5 className="font-semibold text-foreground text-sm">
              Dropstones og Heinrich-hendelser (IRD)
            </h5>
            <p className="text-muted-foreground leading-relaxed">
              Under istidene fløt gigantiske flåter av isfjell ut i Nord-Atlanteren fra det laurentiske
              isdekket i Canada. Isfjellene førte med seg sand og grus som var skrapt løs fra grunnfjellet på land.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Når isfjellene smeltet ute i det åpne havet, regnet steinene ned på den finkornede leirbunnen.
              Disse lagene av grovt grus kalles <strong>IRD (Ice-Rafted Debris / dropstones)</strong>.
              Periodiske massive utbrudd av isfjell kalles <strong>Heinrich-hendelser</strong> og vitner
              om kollapser i de store isdekkene.
            </p>
          </div>
        </div>

        {/* LAKUSTRINE VARVER */}
        <div className="rounded-xl border border-border bg-card/70 p-4 space-y-2 text-xs">
          <h5 className="font-semibold text-foreground text-sm">
            Innsjøsedimenter og varver (Årssedimenter)
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            I dype, oksygenfattige innsjøer som mottar smeltevann fra breer, avsettes sedimentene i tydelige,
            årlige lagpar kalt <strong>varver</strong> (oppdaget av den svenske geologen Gerard De Geer):
          </p>
          <div className="grid gap-3 sm:grid-cols-2 pt-1">
            <div className="rounded-lg bg-card p-2.5 border border-border">
              <span className="font-semibold text-amber-300">Vårlag / Sommerlag (lyst og grovt):</span>
              <p className="mt-0.5 text-muted-foreground">
                Kraftig smeltevannsflom fører med seg store mengder lys silt og fin sand ut i innsjøen.
              </p>
            </div>
            <div className="rounded-lg bg-card p-2.5 border border-border">
              <span className="font-semibold text-sky-300">Vinterlag (mørkt og finkornet):</span>
              <p className="mt-0.5 text-muted-foreground">
                Innsjøen fryser til. Uten smeltevann synker ørsmå leirpartikler og mørkt organisk materiale
                sakte til bunns i det blikkstille vannet under isen.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground pt-1">
            Ved å telle varvene lag for lag kan geoforskere datere klimavariasjoner med nøyaktig ett års
            oppløsning, akkurat som med årringer i trær!
          </p>
        </div>

        <OrdBoks
          ord="Foraminiferer"
          barn="Encellede mikrofossiler i havet som bygger skall av kalsiumkarbonat (CaCO₃). Bentiske lever på bunnen; planktoniske flyter i overflaten. Skallenes kjemiske sammensetning er havets viktigste klimaarkiv."
        />
        <OrdBoks
          ord="Varve"
          barn="Et årlig lagpar i innsjøsedimenter bestående av et lyst mineralsk vårlag (smeltevann) og et mørkt organisk vinterlag (isro). Gir årlig datering."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 5: POLLEN & BIOLOGI ================= */}
      <CollapsibleSection
        title="5. Pollenanalyse (palynologi) og biologiske proxyer: Norges vegetasjonshistorie"
        subtitle="Torvmyrer, von Posts metode, vegetasjonssuksesjon, C-14 datering og årringer"
        badge="Biologi"
        badgeVariant="primary"
      >
        <p>
          Hvordan så landskapet i Norge ut da isen trakk seg tilbake for 11 700 år siden? Og hvordan vet
          vi at Hardangervidda en gang var dekket av furuskog? Svaret ligger i <strong>palynologi
          (pollenanalyse)</strong> og <strong>dendrokronologi (årringer)</strong>.
        </p>

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Lennart von Post og pollenkornenes unike holdbarhet
          </h4>
          <p>
            Den svenske geologen Lennart von Post presenterte i 1916 metoden for kvantitativ pollenanalyse.
            Pollenkorn fra blomster og trær spres med vinden og faller ned i myrer og innsjøer. I våte,
            oksygenfattige torvmyrer brytes ikke pollenet ned, fordi pollenkornenes yttervegg (<em>eksinen</em>)
            består av <strong>sporopollenin</strong> — et av naturens mest kjemisk motstandsdyktige organiske
            stoffer som tåler både syrer og tusener av år uten å råtne.
          </p>
        </div>

        {/* VEGETASJONSSUKSJON I NORGE */}
        <div className="rounded-xl border border-border bg-card/60 p-4 space-y-3">
          <h5 className="font-semibold text-foreground text-sm">
            Norges vegetasjonssuksesjon etter istiden: Fire hovedfaser
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex gap-3 items-start border-b border-border/50 pb-2">
              <span className="font-mono font-bold text-sky-400 shrink-0">1. Senglasial tundra (ca. 14 000–11 700 BP):</span>
              <p className="text-muted-foreground">
                Bart fjell og løsmasser. Pionérplanter: <strong>Reinrose (<em>Dryas octopetala</em>)</strong>,
                gress, starr og dvergbjørk (<em>Betula nana</em>). Ingen skog.
              </p>
            </div>
            <div className="flex gap-3 items-start border-b border-border/50 pb-2">
              <span className="font-mono font-bold text-teal-400 shrink-0">2. Pionérskog (ca. 11 700–9 000 BP):</span>
              <p className="text-muted-foreground">
                Klimaet ble brått mildere ved starten av Holocen. <strong>Bjørkeskog</strong> (<em>Betula pubescens</em>)
                og <strong>furu</strong> (<em>Pinus sylvestris</em>) koloniserte raskt lavlandet og dalførene.
              </p>
            </div>
            <div className="flex gap-3 items-start border-b border-border/50 pb-2">
              <span className="font-mono font-bold text-amber-400 shrink-0">3. Varmetid og edelløvskog (ca. 8 000–4 000 BP):</span>
              <p className="text-muted-foreground">
                Under <em>Holocens klimaoptimum</em> var somrene varme og tørre. Varmekjære edelløvtrær
                dominerte Sør- og Østlandet: <strong>or, alm, lind, eik og hassel</strong>. Tregrensen i
                fjellet lå 200–300 meter høyere enn i dag.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="font-mono font-bold text-emerald-400 shrink-0">4. Kjøligere klima og granas innvandring (siste 2500 år):</span>
              <p className="text-muted-foreground">
                Klimaet ble kjøligere og fuktigere (Neoglasiasjon). Myrene vokste. <strong>Gran (<em>Picea abies</em>)</strong>{" "}
                innvandret østfra via Finland og Russland for ca. 2500–1000 år siden og etablerte dagens taiga.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 pt-2 text-xs">
          <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
            <span className="font-semibold text-primary">Karbondatering (¹⁴C-datering)</span>
            <p className="text-muted-foreground leading-relaxed">
              Utviklet av Willard Libby i 1949. Kosmisk stråling danner radioaktivt ¹⁴C i atmosfæren,
              som tas opp av levende organismer. Ved død opphører opptaket, og ¹⁴C henfaller til ¹⁴N med en
              halveringstid på <strong>5730 år</strong>. Metoden rekker ca. 50 000 år tilbake og må
              kalibreres mot årringer (IntCal-kurven) på grunn av variasjoner i jordas magnetfelt.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
            <span className="font-semibold text-primary">Dendrokronologi (Årringer)</span>
            <p className="text-muted-foreground leading-relaxed">
              Trær danner en lys, bred vekstsone om våren (tidligved) og en mørk, tett cellevegg om høsten
              (seinved). Ved å overlappe mønstre av tynne og tykke årringer (kryssdatering) fra levende trær,
              gamle laftehus og subfossilt tømmer fra myrer, har forskere bygd sammenhengende kalendere over
              12 000–14 000 år med nøyaktig årsoppløsning.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Pollenanalyse"
          barn="Metode for å rekonstruere vegetasjon og klima ved å identifisere og telle mikroskopiske pollenkorn bevart i torvmyrer og innsjøsedimenter. Grunnlagt av Lennart von Post i 1916."
        />
        <OrdBoks
          ord="Karbondatering (¹⁴C)"
          barn="Radiometrisk dateringsmetode for organisk materiale basert på radioaktivt karbon med halveringstid 5730 år. Rekker ca. 50 000 år tilbake."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 6: TERSKLER & MODELLKALIBRERING ================= */}
      <CollapsibleSection
        title="6. Terskler, brå klimaendringer og modellkalibrering: Yngre Dryas og PETM"
        subtitle="Bresjøtømming, ferskvannslokk i AMOC, PETM-karbonutslipp og IPCCs klimafølsomhet"
        badge="Terskler"
        badgeVariant="warning"
      >
        <p>
          Et av de viktigste funnene fra paleoklimatisk forskning er at jordens klimasystem ikke alltid
          endrer seg lineært og jevnt. Når visse <strong>terskelverdier (vippepunkter / tipping points)</strong>{" "}
          overskrides, kan hav- og atmosfæresirkulasjonen brått skifte til en helt ny tilstand i løpet av få tiår.
        </p>

        <AbruptClimateChangeDiagram />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Yngre Dryas (12 800–11 600 år før nå): Da Golfstrømmen bremset
          </h4>
          <p>
            Under avsmeltingen av det laurentiske isdekket i Nord-Amerika ble gigantiske bresjøer som{" "}
            <strong>Lake Agassiz</strong> demmet opp bak isrygger. Da isdemningen plutselig brast for
            ca. 12 800 år siden, fosset hundretusener av kubikk-kilometer ferskvann ut gjennom St. Lawrence-elven
            og inn i Nord-Atlanteren.
          </p>
          <p>
            Ferskvann har lavere tetthet enn saltvann. Det la seg som et flytende «lokk» over havoverflaten og
            hindret det tunge, salte vannet i å synke ned i Norskehavet og Labradorhavet. Dypvannsdannelsen i{" "}
            <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
              AMOC (den atlantiske omveltningssirkulasjonen)
            </Link>{" "}
            kollapset.
          </p>
          <p>
            Uten den nordgående varmetransporten fra Golfstrømmen stupte temperaturen i Norge og Nordvest-Europa
            med <strong>5–10 °C på under et halvt århundre</strong>. Den smeltende innlandsisen rykket fram igjen
            og skjøv opp den mektige randmorenen <strong>Raet</strong> i Norge. Da ferskvannstilførselen stanset,
            startet AMOC opp igjen like brått for 11 600 år siden, og Holocen begynte.
          </p>
        </div>

        <DeglaciationFeedbackDiagram />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            PETM for 56 millioner år siden: En naturlig analog til dagens utslipp
          </h4>
          <p>
            <strong>Paleocen-eocen-temperaturmaksimum (PETM)</strong> inntraff lenge før Kvartærtidens istider.
            Under PETM ble 3000–7000 gigatonn karbon frigjort til atmosfæren i løpet av ca. 5000 år, trolig
            gjennom en kombinasjon av magmaintrusjoner i organiske sedimentbassenger i Norskehavet og smelting
            av frosne metanhydrater på havbunnen.
          </p>
          <p>
            Resultatet var en global oppvarming på <strong>5–8 °C</strong>, massiv havforsuring og utdøing av
            bunnlevende arter. Det tok naturen ca. 150 000 år å fjerne dette karbonet gjennom langsom kjemisk
            forvitring av silikatbergarter.
          </p>
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-4 text-xs">
            <strong className="text-rose-300">Viktig eksamenspoeng om utslippshastighet:</strong>
            <p className="mt-1 text-muted-foreground">
              Under PETM var den årlige karbonutslippstakten ca. 0,3–1,0 Gt C per år. I dag slipper
              menneskeskapte aktiviteter ut over <strong>10 Gt C per år</strong>. Dagens menneskelige
              utslippstakt er altså <strong>10 til 20 ganger raskere</strong> enn under en av jordens mest
              dramatiske kjente drivhuskatastrofer!
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Hvordan paleoklima kalibrerer moderne numeriske klimamodeller
          </h4>
          <p>
            Hvordan kan vi stole på at superdatamodellene som spår klimaet i 2100, har programmert fysikken
            riktig? Svaret er <strong>paleoklimatisk validering</strong>:
          </p>
          <p>
            Forskere mater modellene med kjente forhistoriske pådriv (solinnstråling fra Milanković-sykluser,
            vulkanutbrudd og CO₂-nivåer målt i iskjerner). Hvis modellen klarer å gjenskape den faktiske
            temperaturen under Siste istidsmaksimum (LGM) og Holocens klimaoptimum, har den bevist at den
            regner riktig.
          </p>
          <p>
            Dette arbeidet var avgjørende for at FNs klimapanel (IPCC) kunne fastslå jordens{" "}
            <strong>likevektsklimafølsomhet (ECS - Equilibrium Climate Sensitivity)</strong>: Ved en dobling
            av atmosfærens CO₂-konsentrasjon (fra 280 til 560 ppm), øker den globale gjennomsnittstemperaturen
            med omtrent <strong>3,0 °C</strong> (med et sannsynlig intervall på 2,5–4,0 °C; IPCC, 2021).
          </p>
        </div>

        <OrdBoks
          ord="Yngre Dryas"
          barn="En brå kuldeperiode for ca. 12 800–11 600 år siden. Utløst av en enorm ferskvannsflom til Nord-Atlanteren som dannet et lokk og bremset dypvannsdannelsen i AMOC. Isbreene rykket fram til Raet i Norge."
        />
        <OrdBoks
          ord="Klimafølsomhet (ECS)"
          barn="Hvor mye jordens globale gjennomsnittstemperatur øker ved en permanent dobling av CO₂-konsentrasjonen i atmosfæren. IPCCs beste anslag er ca. 3,0 °C, kalibrert mot paleoklima."
        />
      </CollapsibleSection>

      {/* ================= ORDLISTE / BEGREPER ================= */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Viktige fagbegreper i paleoklima
      </h2>
      <TermGrid>
        <Term
          name="Proxy"
          def="Et naturlig arkivspor (oksygenisotoper, kalkskall, årringer, pollen) som henger fysisk sammen med fortidens klima."
        />
        <Term
          name="Iskjerne"
          def="Borekjerne av innlandsis med årlige snølag og luftbobler med ekte forhistorisk atmosfære forseglet på 50–100 m dyp."
        />
        <Term
          name="Gassalder (Δage)"
          def="Tidsforskjellen mellom isens alder og alderen på luften i boblene, forårsaket av at firn er åpen og porøs i starten."
        />
        <Term
          name="δ¹⁸O"
          def="Avvik i ¹⁸O/¹⁶O i promille. Lav i is = kaldt klima. Høy i havbunnssedimenter = mye is på land og kaldt dypvann."
        />
        <Term
          name="Rayleigh-fraksjonering"
          def="Fysisk separasjon av tunge og lette isotoper ved faseoverganger. Tungt ¹⁸O regner ut først på vei mot polene."
        />
        <Term
          name="Bentiske foraminiferer"
          def="Bunnlevende mikrofossiler med kalsittskall (CaCO₃). Hovedarkivet for globalt isvolum og dypvannstemperatur i havet."
        />
        <Term
          name="Varve"
          def="Årlig lagpar i innsjøsedimenter med lyst mineralrikt smeltevannslag (vår) og mørkt organisk lag (vinter)."
        />
        <Term
          name="Sporopollenin"
          def="Ekstremt kjemisk motstandsdyktig polymer som danner pollenkornenes yttervegg, slik at de bevares i torvmyrer i titusenvis av år."
        />
        <Term
          name="Yngre Dryas"
          def="Brå kuldeperiode for 12 800–11 600 år siden forårsaket av bresjøtømming og AMOC-kollaps. Dannet Ra-morenen i Norge."
        />
        <Term
          name="PETM"
          def="Massiv oppvarming for 56 mill. år siden (+5–8 °C) forårsaket av raske karbonutslipp. Viktig naturlig analog til i dag."
        />
      </TermGrid>

      {/* ================= EKSAMENSQUIZ ================= */}
      <Quiz
        questions={[
          {
            prompt: "Hvorfor regnes luftboblene i iskjerner som en direkte fysisk måling, og IKKE en tolkende proxy?",
            options: [
              "Fordi boblene inneholder et digitalt termometer som ble frosset ned i isen.",
              "Fordi boblene inneholder ekte, uendret forhistorisk atmosfæreluft som analyseres direkte med massespektrometri.",
              "Fordi boblene måler temperaturen direkte i grader celsius via iskrystallenes form.",
              "Fordi boblene bare finnes i is som falt etter 1850.",
            ],
            answer: 1,
            explain:
              "Luftboblene forsegles hermetisk når snøen presses til is. Måling av CO₂, metan og lystgass i disse boblene er derfor en direkte prøve av fortidsluften, ikke en indirekte tolkning.",
          },
          {
            prompt: "Hva er den fysiske årsaken til gassalder (Δage) i en iskjerne?",
            options: [
              "At isen smelter i bunnen og slipper ut gass.",
              "At luftbobler stiger oppover gjennom isen som bobler i vann.",
              "At det øverste snølaget (firn) er åpent og porøst de første 50–100 meterne, slik at luften først forsegles mange hundre til tusen år etter at snøen falt.",
              "At karbondioksid har kortere halveringstid enn vannmolekyler.",
            ],
            answer: 2,
            explain:
              "Snøen komprimeres gradvis til firn og deretter is. I de øverste 50–100 meterne diffunderer luften fritt. Boblene lukkes først i dypet, slik at gassen er vesentlig yngre enn isen rundt.",
          },
          {
            prompt: "Hvordan tolkes oksygenisotopen δ¹⁸O i henholdsvis en iskjerne og i bentiske foraminiferer på havbunnen under en istid?",
            options: [
              "Høy δ¹⁸O i begge arkiver fordi hele kloden ble kaldere.",
              "Lav δ¹⁸O i begge arkiver fordi tungt ¹⁸O forsvant fra jordsystemet.",
              "I iskjernen er δ¹⁸O svært lav (kraftig utarmet), mens i foraminiferer er δ¹⁸O svært høy (havet berikes på ¹⁸O fordi ¹⁶O er bundet i innlandsis på land).",
              "I iskjernen er δ¹⁸O høy, mens på havbunnen er δ¹⁸O lav.",
            ],
            answer: 2,
            explain:
              "Dette er det klassiske speilvendte forholdet: Lett ¹⁶O fordamper lett og låses i iskapper på land under istid. Resthavet får høy δ¹⁸O, mens polarsnøen får lav δ¹⁸O pga. Rayleigh-fraksjonering.",
          },
          {
            prompt: "Hva forårsaket den brå kuldeperioden i Yngre Dryas (12 800–11 600 år før nå)?",
            options: [
              "Et asteroidenedslag som mørkla solen i 1200 år.",
              "Enorme mengder ferskvann fra bresjøer (Lake Agassiz) flommet ut i Nord-Atlanteren, la et lett lokk på overflaten og bremset dypvannsdannelsen i AMOC.",
              "At CO₂-konsentrasjonen plutselig sank til under 100 ppm.",
              "At jordaksens helning økte til 30 grader.",
            ],
            answer: 1,
            explain:
              "Ferskvann er lettere enn saltvann og hindret overflatevannet i å synke i Norskehavet og Labradorhavet. Varmetransporten med AMOC stoppet, og temperaturen over Skandinavia stupte 5–10 °C.",
          },
          {
            prompt: "Hvilken rekkefølge beskriver den postglasiale vegetasjonssuksesjonen i Norge etter siste istid, ifølge pollenanalyser?",
            options: [
              "Granurskog → Edelløvskog → Tundra med reinrose → Bjørk og furu",
              "Tundra med reinrose (Dryas) → Bjørk og furu → Varmekjær edelløvskog (alm, lind, eik) → Kjøligere klima og granas innvandring østfra",
              "Regnskog → Fjellbjørkeskog → Tundra → Gran",
              "Furu → Eik → Reinrose → Bjørk",
            ],
            answer: 1,
            explain:
              "Først kom arktiske pionérplanter (reinrose/Dryas), deretter bjørk og furu. I det varme Holocen-optimumet overtok edelløvskog, før gran innvandret østfra for ca. 2500–1000 år siden da klimaet ble kjøligere.",
          },
          {
            prompt: "Hva kjennetegner en varve i et lakustrint innsjøsediment?",
            options: [
              "Et lag av ren vulkansk aske som avsettes hvert 100. år.",
              "Et årlig lagpar bestående av et lyst, grovt mineralsk lag fra vårens smeltevannsflom og et mørkt, organisk leirlag avsatt under vinterisen.",
              "En type foraminifer som bare lever i ferskvann.",
              "Et lag av trerøtter som dateres med dendrokronologi.",
            ],
            answer: 1,
            explain:
              "Varver er årlige sedimentpar der vårflommen bringer lyst mineralmateriale fra breen, mens mørkt organisk materiale bunnfelles i det rolige vannet under vinterisen.",
          },
          {
            prompt: "Hva er den viktigste forskjellen mellom karbonutslippet under PETM (for 56 mill. år siden) og dagens menneskeskapte utslipp?",
            options: [
              "PETM ga ingen global oppvarming, mens dagens utslipp gjør det.",
              "Dagens menneskeskapte utslippshastighet per år er over 10 ganger raskere enn utslippstakten under PETM.",
              "Under PETM var utslippstakten 1000 ganger raskere enn i dag.",
              "PETM ble forårsaket av menneskelig forbrenning av kull.",
            ],
            answer: 1,
            explain:
              "Selv om PETM frigjorde tusenvis av gigatonn karbon, skjedde det over tusener av år (~0,3–1,0 Gt C/år). Dagens menneskeskapte utslipp (>10 Gt C/år) skjer i et tempo som overgår naturens verste historiske hendelser.",
          },
          {
            prompt: "Hvordan bidrar paleoklimatiske arkiver til å kalibrere numeriske klimamodeller?",
            options: [
              "De brukes til å programmere satellittene i bane rundt jorda.",
              "De gjør at vi slipper å bruke fysiske likninger for atmosfæren.",
              "Ved å teste om modellene klarer å gjenskape kjente forhistoriske klimasvingninger (som LGM og Holocen optimum) når de mates med historiske pådriv, kan forskerne verifisere klimafølsomheten (ECS).",
              "De beviser at CO₂ ikke har noen effekt på temperaturen.",
            ],
            answer: 2,
            explain:
              "Paleoklima er den eneste måten vi kan teste om numeriske klimamodeller regner riktig over lange tidsskalaer. Dette fastslår at klimafølsomheten ligger rundt 3,0 °C ved CO₂-dobling.",
          },
        ]}
      />
    </TopicLayout>
  );
}
