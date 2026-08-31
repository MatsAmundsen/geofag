import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  AbruptClimateChangeDiagram,
  DeglaciationFeedbackDiagram,
  IceCoreAnatomyDiagram,
  KvartarTimeSeriesDiagram,
  MilankovitchCyclesDiagram,
  OxygenIsotopeDiagram,
  Sommersol65NDiagram,
} from "@/components/diagrams";
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
      title="Paleoklima og istider"
      lead="Termometre og satellitter dekker et øyeblikk: globalt 150–170 år med instrumentelle målinger, CO₂ på Mauna Loa siden 1958 (NOAA, u.å.), og havis fra satellitt siden 1979 (NSIDC, u.å.). Istider, mellomistider og plutselige vippepunkter ligger lagret i is, havbunn og trær. Uten disse geologiske arkivene kan vi verken vite om dagens CO₂ er utenfor naturens eget spenn — eller om klimamodellene våre faktisk treffer når planeten varmes opp og kjøles ned."
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/milankovitch", label: "Neste: Milankovitch og istider" }}
      kilder={KILDER.paleoklima}
    >
      <p>
        Kompetansemålet i geofag handler ikke om å pugge historiske årstall utenat. Det handler om
        kjeden fra <em>spor i naturen</em> til <em>fysisk kunnskap</em>: Noe i naturen tar vare på et
        avtrykk, vi daterer det, vi kalibrerer mot det vi måler i dag, vi rekonstruerer klimaet med
        usikkerhet, og vi sammenligner med de{" "}
        <Link
          to="/tema/numeriske-modeller"
          className="text-primary underline-offset-2 hover:underline"
        >
          numeriske klimamodellene
        </Link>
        . Da kan vi teste fysikken i modellene og innsnevre hva framtiden kan bringe.
      </p>
      <p>
        Paleoklimatiske data var avgjørende for at FNs klimapanel (IPCC) kunne fastslå jordas
        klimafølsomhet — altså hvor mye den globale gjennomsnittstemperaturen øker ved en dobling av
        CO₂ i atmosfæren. Beste anslag ligger rundt 3,0 °C (IPCC, 2021).
      </p>

      {/* ================= SEKSJON 1: PROXY OG ISKJERNER ================= */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Proxy, iskjerner og oksygenisotoper
      </h2>
      <p>
        En <strong>proxy</strong> (klimaindikator) er aldri temperaturen i ett bestemt år direkte.
        Den er et fysisk, kjemisk eller biologisk spor som henger sammen med klimaet: isotoper i
        is, kalkskall fra mikrofossiler i havbunnen, årringer i trær eller pollen i myrer. Hvert
        arkiv har støy, sesongskjevheter og dateringsusikkerhet. Derfor stoler vi aldri på ett
        enkelt spor alene — når flere uavhengige arkiver peker i samme retning, har vi robust
        kunnskap.
      </p>
      <OrdBoks
        ord="Proxy"
        barn="Et naturlig arkivspor som henger sammen med fortidens klima. Eksempler: isotoper i is, kalkskall i havbunn, årringer og pollen. Alltid med støy og usikkerhet."
      />

      <PhotoFigure
        src="/images/fig-iskjerne.jpg"
        alt="Sylinder av blå is med tynne årlige lag og innestengte luftbobler"
        heading="Luftboblene er ekte fortidsatmosfære"
        caption="Iskjernen er is bygget opp av årlige lag med snøfall. Boblene som forsegles i antarktisk og grønlandsk is er ekte fortidsluft. CO₂-kurven over de siste 800 000 årene er derfor en direkte fysisk gassmåling, ikke en tolkning."
        marks={[
          { x: 6, y: 14, n: "1", text: "Årlige lag", tone: "cold" },
          { x: 58, y: 48, n: "2", text: "Innestengt luft", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Lagene daterer isen lag for lag, akkurat som årringer i et tre." },
          {
            n: "2",
            label: "Boblene inneholder forhistorisk luft. CO₂ der er målt direkte med spektroskopi.",
          },
        ]}
      />

      <IceCoreAnatomyDiagram />

      <p>
        Iskjerner bores ut fra de store innlandsisene i Antarktis og på Grønland. EPICA Dome C i
        Antarktis dekker over 800 000 år og åtte fullstendige istidssykluser (Lüthi et al., 2008).
        Vostok-kjernen dekker 420 000 år (Petit et al., 1999).
      </p>
      <p>
        En viktig detalj for geofagelever er <strong>gassalderen</strong> (Δage): Nysnø øverst er
        porøs firn, og atmosfærisk luft sirkulerer fritt de første 50–100 meterne. Først på stort
        dyp klemmes porene igjen og forsegler luftboblene hermetisk. Luften i boblene er derfor{" "}
        <em>yngre</em> enn isen som omslutter den. Denne aldersforskjellen må forskere korrigere for
        når temperatur og CO₂ sammenlignes på kortere tidsskalaer.
      </p>
      <OrdBoks
        ord="Gassalder"
        barn="Luftboblene i isen forsegles først på 50–100 meters dyp, etter at snøen har falt. Gassen er derfor yngre enn isen rundt (Δage). Dette er en velkjent korreksjon i iskjernedatering."
      />

      <p>
        <strong>Oksygenisotopen δ¹⁸O</strong> er avviket i forholdet mellom tungt ¹⁸O og lett ¹⁶O
        sammenlignet med en standard. Prosessen kalles <em>Rayleigh-fraksjonering</em>: Det lette
        vannet (H₂¹⁶O) fordamper lettere fra de varme havene, mens det tunge (H₂¹⁸O) regner ut
        først på vei mot polene. Under en istid blir det lette ¹⁶O-vannet låst i gigantiske
        innlandsisdekker på land.
      </p>

      <OxygenIsotopeDiagram />

      <p>
        Dette gir en klassisk geofaglig kontrast:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>I iskjernen (nedbørsarkiv):</strong> Kaldt istidsklima gir <em>lav (svært negativ) δ¹⁸O</em> fordi det meste av ¹⁸O har regnet ut lenge før skyene nådde polene.
        </li>
        <li>
          <strong>I marine kalkskall på havbunnen (foraminiferer):</strong> Under en istid tømmes
          verdenshavet for ¹⁶O (som ligger på land som is). Havvannet og foraminiferskallene får
          derfor <em>høy (positiv) δ¹⁸O</em>.
        </li>
      </ul>
      <OrdBoks
        ord="δ¹⁸O"
        barn="Avvik i ¹⁸O/¹⁶O. I is: lavere verdi = kaldere klima. I havbunnssedimenter: høyere verdi = mer is på land og kaldere dypvann. Navngi alltid arkivet du snakker om!"
      />

      {/* ================= SEKSJON 2: MILANKOVIĆ ================= */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Milanković-syklusene: Jordbanens tre rytmer
      </h2>
      <p>
        Istidene kommer og går i en regelmessig takt styrt av gravitasjonskrefter fra sola, månen og
        de andre planetene (særlig Jupiter og Saturn). Disse kreftene forårsaker tre langsomme,
        periodiske endringer i jordas bane — kalt <strong>Milanković-syklusene</strong>. For en
        grundig gjennomgang av hele mekanismen, istidsfaktorene og sporene i Norge, se også vår
        fordypningsside om{" "}
        <Link
          to="/tema/milankovitch"
          className="text-primary underline-offset-2 hover:underline"
        >
          Milankovitch-syklusen og istider
        </Link>
        :
      </p>

      <MilankovitchCyclesDiagram />

      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Eksentrisitet (ca. 100 000 og 400 000 år):</strong> Jordbanens form varierer fra
          nesten helt sirkulær til en svakt oval ellipse. Eksentrisiteten endrer solinnstrålingen
          totalt med under 0,2 %, men den modulerer styrken på presesjonssyklusen ved å endre
          avstandsforskjellen mellom <em>perihel</em> (nærmest sola) og <em>aphel</em> (lengst fra sola).
        </li>
        <li>
          <strong>Aksehelning / oblikvitet (ca. 41 000 år):</strong> Jordaksens helning mot
          baneplanet varierer mellom 22,1° og 24,5° (i dag 23,44°). Stor helning gir kraftigere
          årstidsforskjeller og mye mer sommersol på høye breddegrader. Liten helning gir milde
          vintre og kjølige somre.
        </li>
        <li>
          <strong>Presesjon (ca. 23 000 og 19 000 år):</strong> Jordaksen vobler som en
          snurrebass, samtidig som selve banens ellipse roterer i rommet. Dette forskyver når på året
          jorda er nærmest sola (i dag er vi i perihel i januar).
        </li>
      </ol>
      <OrdBoks
        ord="Milanković-sykluser"
        barn="Tre periodiske astronomiske variasjoner: eksentrisitet (100k/400k år), aksehelning (41k år) og presesjon (23k/19k år). De flytter solinnstrålingen geografisk og gjennom årstidene."
      />

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Hvorfor sommersol på 65 °N avgjør istidene
      </h2>
      <p>
        Den serbiske matematikeren Milutin Milanković oppdaget en avgjørende fysisk sammenheng:{" "}
        <strong>Det er sommersolen på 65 °N som styrer istidene</strong>. Hvorfor akkurat sommeren,
        og hvorfor 65 °N?
      </p>
      <p>
        På 65 °N (der de store landmassene i Skandinavia, Sibir og Nord-Amerika ligger) er det alltid
        kaldt nok til at det snør om vinteren. Det som avgjør om det blir istid, er om{" "}
        <em>sommersolen er svak nok til at snøen ikke rekker å smelte bort om sommeren</em>.
      </p>

      <Sommersol65NDiagram />

      <p>
        Når aksehelningen er minimal (22,1°) og jorda er i aphel (lengst fra sola) midt på den
        nordlige sommeren, forblir somrene kjølige. Snøen fra forrige vinter overlever gjennom hele
        sommeren. Neste vinter legger det seg et nytt snølag oppå det gamle. Snø pakkes til firn og
        is, breene vokser sammen til enorme innlandsisdekker, og en ny istid (glasial) har startet.
      </p>

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Tilbakekoblinger: Hvorfor Milanković blir global
      </h2>
      <p>
        Milanković-pådrivet flytter bare solenergien lokalt og sesongmessig. For at smeltingen på 65
        °N skal føre til en global overgang til en varm mellomistid (deglasiasjon), må to kraftige
        positive tilbakekoblinger tre i kraft:
      </p>

      <DeglaciationFeedbackDiagram />

      <p>
        <strong>1. Is-albedo-tilbakekoblingen:</strong> Når sommersolen smelter snø og breer på 65 °N,
        avdekkes mørkt land og åpent hav. Den gjennomsnittlige overflatealbedoen synker dramatisk
        (fra ~0,85 for fersk snø til ~0,1 for hav). Overflaten absorberer mye mer solvarme, noe som
        øker temperaturen og akselererer smeltingen ytterligere.
      </p>
      <p>
        <strong>2. Havets karbon-tilbakekobling (CO₂):</strong> Når overflatevannet i havene varmes
        opp og sørlige vestavinder forskyves, reduseres løseligheten for CO₂ i sjøvann. Samtidig
        lufter dypvannssirkulasjonen ut karbonrikt vann fra Sørishavet. Havet avgasser gigantiske
        mengder CO₂ til atmosfæren (fra ca. 180 ppm under istid til ca. 280 ppm i mellomistid). Den
        økte drivhuseffekten sprer oppvarmingen til hele planeten — også til den sørlige halvkule.
      </p>
      <OrdBoks
        ord="Deglasiasjon"
        barn="Prosessen der innlandsisen smelter bort og jorda går fra istid til mellomistid. Startes av orbital sommersol på 65 °N og forsterkes globalt av is-albedo og CO₂ fra havet."
      />

      <Callout title="Viktig for eksamen: Hvorfor Milanković ikke forklarer oppvarmingen i dag">
        <p>
          En vanlig misforståelse er at dagens globale oppvarming skyldes Milanković-syklusene. Det
          er fysisk umulig: Orbitale endringer skjer over titusener av år, og i vår nåværende epoke
          peker de orbitale banene svakt <em>mot mindre sommersol på 65 °N</em> — altså mot en
          ekstremt langsom naturlig avkjøling over de neste tusener av år!
        </p>
        <p>
          Under forhistorisk deglasiasjon var orbital innstråling <strong>starteren</strong> og CO₂{" "}
          <strong>forsterkeren</strong>. I dag er rollene snudd: Menneskets forbrenning av fossilt
          karbon er det direkte <strong>primærpådrivet</strong>.
        </p>
      </Callout>

      {/* ================= SEKSJON 3: KVARTÆR OG HOLOCEN ================= */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Kvartær, LGM og Holocen
      </h2>
      <p>
        <strong>Kvartærperioden</strong> omfatter de siste ca. 2,6 millioner år, og kjennetegnes av
        sykliske skifter mellom istider (glasialer) og mellomistider (interglasialer). De siste 800
        000 årene har syklusene fulgt en markant 100 000-års sagtanntakt.
      </p>

      <KvartarTimeSeriesDiagram />

      <p>
        <strong>Siste istidsmaksimum (LGM - Last Glacial Maximum)</strong> fant sted for ca. 21 000
        år siden:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Det fennoskandiske isdekket dekket hele Norge, Sverige, Finland og store deler av
          Nord-Europa med opptil 3 kilometer tykk is.
        </li>
        <li>
          Fordi så mye vann var bundet i isdekkene på land, var det globale havnivået ca.{" "}
          <strong>120–130 meter lavere</strong> enn i dag. Nordsjøen var tørt land (Doggerland), og
          Beringstredet var en tørr landbro.
        </li>
        <li>
          Atmosfærisk CO₂ var nede på ca. <strong>180–190 ppm</strong>, og global middeltemperatur
          var ca. 5–6 °C kaldere enn i førindustriell tid.
        </li>
      </ul>
      <OrdBoks
        ord="LGM (Siste istidsmaksimum)"
        barn="Klimaperioden for ca. 21 000 år siden da isdekkene nådde sin største utbredelse i siste istid. Havnivået var 120–130 m lavere, og CO₂ lå på ca. 180–190 ppm."
      />

      <p>
        <strong>Holocen</strong> er den nåværende mellomistiden, som startet for ca. 11 700 år siden
        (Walker et al., 2009). Holocen har vært en usedvanlig stabil klimaperiode som la grunnlaget
        for utviklingen av jordbruk og menneskelig sivilisasjon.
      </p>
      <p>
        Under det holocene klimaoptimumet for ca. 6000–8000 år siden lå sommertemperaturene på den
        nordlige halvkule ca. 0,2–1,0 °C over førindustrielt nivå (1850–1900). Dagens tiår ligger
        allerede markant over dette nivået, og oppvarmingshastigheten siden 1970 er raskere enn i
        noen annen 50-årsperiode på minst 2000 år (IPCC, 2021).
      </p>
      <OrdBoks
        ord="Holocen"
        barn="Vår nåværende mellomistid fra ca. 11 700 år før nå. En stabil varmeperiode der jordbruk og sivilisasjon vokste fram."
      />

      {/* ================= SEKSJON 4: TERSKLER OG BRÅ ENDRINGER ================= */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Terskler og brå klimaendringer: Smeltevann og AMOC
      </h2>
      <p>
        Paleoklima viser oss at klimasystemet ikke alltid endrer seg jevnt og lineært. Når visse
        terskler (vippepunkter) overskrides, kan store deler av jordsystemet endre tilstand brått over
        bare noen få tiår.
      </p>

      <AbruptClimateChangeDiagram />

      <p>
        <strong>Yngre Dryas (12 800–11 600 år før nå) og 8,2 ka-hendelsen:</strong> Under
        avsmeltingen av det enorme Laurentide-isdekket i Nord-Amerika ble gigantiske bresjøer som Lake
        Agassiz demmet opp bak isrygger. Da isdemningen plutselig brast, strømmet enorme mengder
        ferskvann ut i St. Lawrence-elva og direkte ut i Nord-Atlanteren.
      </p>
      <p>
        Fordi ferskvann har lavere tetthet enn saltvann, la det seg som et lett lokk på overflaten.
        Dette hindret overflatevannet i å avkjøles og synke til bunns i Norskehavet og
        Labradorsjøen (ingen dypvannsdannelse). Resultatet var at{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          AMOC (den atlantiske omveltningssirkulasjonen)
        </Link>{" "}
        bremset kraftig opp. Uten den nordgående varmetransporten fra Golfstrømsystemet stupte
        temperaturen over Skandinavia og Nord-Europa med flere grader på få tiår, før sirkulasjonen
        senere gjenopprettet seg.
      </p>
      <OrdBoks
        ord="Yngre Dryas"
        barn="En brå kuldeperiode for ca. 12 800–11 600 år siden forårsaket av en massiv smeltevannsflom i Nord-Atlanteren som svekket AMOC og kastet Nord-Europa tilbake i istidstemperaturer."
      />

      <p>
        <strong>PETM (Paleocen-eocen-temperaturmaksimum for ca. 56 millioner år siden):</strong> En
        annen type terskelhendelse der et enormt karbonutslipp førte til 5–8 °C global oppvarming og
        kraftig havforsuring. PETM er et tydelig bevis på at drivhusgasser kan endre globalt klima
        dramatisk, men den årlige utslippsraten den gang var 5–10 ganger <em>lavere</em> enn dagens
        menneskeskapte utslipp (IPCC, 2021).
      </p>
      <OrdBoks
        ord="PETM"
        barn="Paleocen-eocen-temperaturmaksimum for ca. 56 millioner år siden. Massivt naturlig karbonutslipp og global oppvarming. Viser at karbon varmer kraftig, men utslippsfarten var lavere enn i dag."
      />

      {/* ================= SEKSJON 5: OPPSUMMERING OG QUIZ ================= */}
      <Callout title="Kompetansemål i Geofag 2">
        <p>
          Gjøre rede for forskning på forhistorisk klima, og forklare hvordan paleoklimatiske arkiver
          og forståelsen av naturlige drivere bidrar til å kalibrere numeriske modeller og lage
          pålitelige prognoser for framtidens klima.
        </p>
      </Callout>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Proxy"
          def="Et naturlig arkivspor (isotoper, kalkskall, årringer) som henger sammen med fortidens klima."
        />
        <Term
          name="Iskjerne"
          def="Sylinder av breis med årlige lag og innestengte luftbobler med ekte forhistorisk atmosfære."
        />
        <Term
          name="Gassalder (Δage)"
          def="Tidsforskjellen mellom isens alder og alderen på luften i de lukkede boblene."
        />
        <Term
          name="δ¹⁸O"
          def="Forholdet ¹⁸O/¹⁶O. Lav i is = kaldt. Høy i havbunnssedimenter = mye is på land."
        />
        <Term
          name="Eksentrisitet"
          def="Jordbanens form svinger mellom sirkel og ellipse over ca. 100 000 og 400 000 år."
        />
        <Term
          name="Aksehelning"
          def="Helningen varierer mellom 22,1° og 24,5° over ca. 41 000 år. Liten helning gir istid."
        />
        <Term
          name="Presesjon"
          def="Jordaksens vobling over ca. 23 000 og 19 000 år. Bestemmer årstiden i perihel."
        />
        <Term
          name="Sommersol på 65 °N"
          def="Kjernen i Milanković-teorien: avgjør om vintersnøen overlever sommeren eller smelter."
        />
        <Term
          name="LGM"
          def="Siste istidsmaksimum for 21 000 år siden. Havnivå 120 m lavere, CO₂ på 180 ppm."
        />
        <Term
          name="Holocen"
          def="Nåværende stabile mellomistid fra ca. 11 700 år før nå."
        />
        <Term
          name="Yngre Dryas"
          def="Brå kuldeperiode for 12 800 år siden utløst av ferskvannsutslipp og svekket AMOC."
        />
        <Term
          name="PETM"
          def="Massiv oppvarming for 56 millioner år siden drevet av store karbonutslipp."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er den viktigste grunnen til at luftboblene i iskjerner er unike klimaproxyer?",
            options: [
              "De viser hvor mange vulkanutbrudd som har skjedd.",
              "De inneholder ekte forhistorisk luft, slik at CO₂ er en direkte fysisk måling, ikke en tolkning.",
              "De måler temperaturen nøyaktig i grader celsius på et digitalt termometer.",
              "De viser at atmosfæren aldri har endret seg.",
            ],
            answer: 1,
            explain:
              "Iskjerneluft er forseglet atmosfære fra fortiden. Måling av CO₂ i boblene er derfor en direkte måling av fortidsluften.",
          },
          {
            prompt: "Hvorfor er sommersol på 65 °N nøkkelen til å starte en istid ifølge Milanković?",
            options: [
              "Fordi det aldri snør på 65 °N om vinteren.",
              "Fordi kjølige somre gjør at snøen fra forrige vinter ikke smelter bort, men akkumuleres år etter år til et isdekke.",
              "Fordi ekvator fryser til is først.",
              "Fordi jordaksen slutter å rotere ved 65 °N.",
            ],
            answer: 1,
            explain:
              "På høye nordlige bredder er vinteren alltid kald nok til snø. Om snøen overlever sommeren, bygger det seg opp et isdekke.",
          },
          {
            prompt: "Hva betyr det når δ¹⁸O-verdien i foraminiferskall på havbunnen er svært høy?",
            options: [
              "At det var en varm periode med lite is på kloden.",
              "At store mengder lett ¹⁶O var låst i innlandsis på land, slik at resthavet ble anriket på tung ¹⁸O (istid).",
              "At vanntemperaturen var over 40 °C i dyphavet.",
              "At havnivået var 200 meter høyere enn i dag.",
            ],
            answer: 1,
            explain:
              "Under istid bindes lett ¹⁶O på land som is. Havet anrikes på tung ¹⁸O, som foraminiferene bygger inn i skallene sine.",
          },
          {
            prompt: "Hvorfor kan IKKE dagens globale oppvarming forklares av Milanković-syklusene?",
            options: [
              "Fordi Milanković-syklusene ikke eksisterer i virkeligheten.",
              "Fordi orbitale endringer er for trege og nå peker svakt mot avkjøling. I dag er det CO₂-utslipp som er det primære pådrivet.",
              "Fordi iskjerner ikke virker etter 1850.",
              "Fordi jordens helning aldri har endret seg.",
            ],
            answer: 1,
            explain:
              "Orbital innstråling peker nå svakt mot avkjøling på 65 °N. Dagens oppvarming er rask og drives direkte av menneskeskapte drivhusgasser.",
          },
          {
            prompt: "Hva utløste den brå kuldeperioden i Yngre Dryas for 12 800 år siden?",
            options: [
              "En enorm smeltevannsflom av ferskvann til Nord-Atlanteren som dannet et lokk og stanset dypvannsdannelsen i AMOC.",
              "At sola sluknet i 1000 år.",
              "At CO₂-nivået sank til 0 ppm.",
              "At Grønland kolliderte med Norge.",
            ],
            answer: 0,
            explain:
              "Ferskvann fra bresjøer (Lake Agassiz) la seg som et lett lokk i Nord-Atlanteren, hindret overflatevann i å synke og svekket AMOC.",
          },
        ]}
      />
    </TopicLayout>
  );
}

