import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PaleoDiagram } from "@/components/diagrams/paleo";
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
      title="Paleoklima"
      lead="Termometer og satellitt dekker et øyeblikk: globalt 150–170 år, CO₂ på Mauna Loa siden 1958 (NOAA, u.å.), havis fra satellitt siden 1979 (NSIDC, u.å.). Istider og plutselige hopp sitter i is, havbunn og tre. Uten arkivene kan vi ikke si om dagens CO₂ er utenfor det naturlige spennet — eller om modellene treffer når jorda faktisk har vært kald og varm."
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/vaerkatastrofer", label: "Neste: Værkatastrofer" }}
      kilder={KILDER.paleoklima}
    >
      <p>
        Kompetansemålet er ikke å fortelle istidshistorie. Det er kjeden fra spor til kunnskap: noe
        i naturen tar vare på et spor, vi daterer det, vi kalibrerer mot det vi måler i dag, vi
        rekonstruerer med usikkerhet, og vi sammenligner med{" "}
        <Link
          to="/tema/numeriske-modeller"
          className="text-primary underline-offset-2 hover:underline"
        >
          modellene
        </Link>
        . Da innsnevres hva framtiden kan være — det er ikke et værvarsel for 12. juni år 12 000
        f.Kr.
      </p>
      <p>
        Paleodata hjalp IPCC å innsnevre hvor mye jorda varmes når CO₂ dobles. Beste anslag ligger
        rundt tre grader (IPCC, 2021). Syvende hovedrapport er ikke publisert.
      </p>

      <h2 className="font-display text-2xl font-medium tracking-tight">Proxy og iskjerne</h2>
      <p>
        En proxy er aldri temperaturen i ett bestemt forhistorisk år. Den er et fysisk eller
        biologisk spor som henger sammen med klima: isotoper i is, skall i havbunn, årringer,
        pollen. Hvert spor har støy, sesongskjevhet og dateringsfeil. Flere uavhengige spor som
        peker samme vei, slår én spektakulær kjerne.
      </p>
      <OrdBoks
        ord="Proxy"
        barn="Et spor som henger sammen med klima. Aldri temperaturen i ett bestemt forhistorisk år. Alltid med støy."
      />

      <PhotoFigure
        src="/images/fig-iskjerne.jpg"
        alt="Sylinder av blå is med tynne årlige lag og innestengte luftbobler"
        heading="Luftboblene er ekte fortidsatmosfære"
        caption="Iskjernen er is med årlige lag. Boblene i antarktisk is er luft fra den tiden isen ble til. CO₂-kurven over 800 000 år er derfor en måling, ikke en tolkning."
        marks={[
          { x: 6, y: 14, n: "1", text: "Årlige lag", tone: "cold" },
          { x: 58, y: 48, n: "2", text: "Innestengt luft", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Lagene daterer. Tynnere lag: tørrere eller kaldere år." },
          { n: "2", label: "Boblene er luft. CO₂ der er målt, ikke gjettet." },
        ]}
      />

      <p>
        EPICA Dome C dekker åtte istidssykluser. Laveste målte CO₂ i is: 172 ppm. Naturlig spenn i
        senkvartær: 172–300 ppm (Lüthi et al., 2008). Dagens verdi ligger over 425 — langt utenfor
        det spennet (NOAA, u.å.). Vostok dekker 420 000 år og fire sykluser (Petit et al., 1999).
      </p>
      <OrdBoks
        ord="Iskjerne"
        barn="Sylinder av is med årlige lag og innestengt luft. Boblene i antarktisk is er ekte fortidsatmosfære."
      />
      <p>
        Gassalderen er yngre enn isen rundt, fordi boblene lukkes først på dybde. Det er en kjent
        usikkerhet når CO₂ og temperatur sammenlignes på hundreårsskala — ikke en grunn til å kaste
        hele kurven.
      </p>
      <OrdBoks
        ord="Gassalder"
        barn="Luftboblene lukkes etter at isen er lagt. Gassen er yngre enn isen rundt. Si usikkerheten når du sammenligner CO₂ og temperatur på kort tidsskala."
      />
      <p>
        δ¹⁸O er avviket i forholdet ¹⁸O/¹⁶O fra en standard. I is: kaldere luft, lavere verdi. Den
        tunge isotopen faller mer ut underveis mot polene. I marine karbonater blander samme symbol
        vanntemperatur og globalt isvolum, fordi den lette isotopen låses i innlandsis under istid.
        Samme tegn, ulik prosess. Navngi arkivet.
      </p>
      <OrdBoks
        ord="δ¹⁸O"
        barn="Avvik i ¹⁸O/¹⁶O. I is: kaldere gir lavere verdi. I havbunn: temperatur pluss isvolum. Navngi arkivet."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Milanković</h2>
      <p>
        Tre langsomme svingninger i jordbanen endrer hvor innstrålingen treffer, og bare svakt
        mengden sol totalt. Eksentrisitet, ca. 100 000 år: banens ellipse. Helning, ca. 41 000 år:
        sterkere sesonger og mer sommersol på høye bredder når helningen er høy. Presesjon, ca. 23
        000 og 19 000 år: når på året jorda er nærmest sola. Det som teller for istidene, er
        sommersmelting på 65 °N — om innlandsisen overlever sommeren.
      </p>
      <OrdBoks
        ord="Milanković"
        barn="Tre orbitale perioder som flytter innstrålingen. De styrer sommersmelting på 65 °N."
      />

      <PaleoDiagram />

      <p>
        Milanković starter deglasiasjoner ved å øke sommersol på nordlige høye bredder, slik at
        isdekker smelter. CO₂ og albedo forsterker og gjør endringen global. Det forklarer ikke
        oppvarmingen siden 1850. Orbitale endringer er for trege, og går nå svakt mot svakere
        sommersol på 65 °N — altså mot langsom avkjøling over tusener av år. Det er det motsatte av
        observert oppvarming.
      </p>
      <OrdBoks
        ord="Deglasiasjon"
        barn="Når innlandsisen smelter bort. Orbital innstråling starter. CO₂ og albedo forsterker."
      />
      <p>
        Under deglasiasjon starter orbital innstråling, og CO₂ forsterker. I dag starter CO₂. Vi
        måler utslippene. Årsaksretningen er ikke evig én vei. Mer om pådriv og tilbakekobling under{" "}
        <Link to="/tema/klima" className="text-primary underline-offset-2 hover:underline">
          klima
        </Link>
        .
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Holocen</h2>
      <p>
        Kvartær er en serie glacialer og interglacialer. Holocen er nåværende mellomistid, fra ca.
        11 700 år før nå (Walker et al., 2009). Relativt stabil. Jordbruk og sivilisasjon vokste her.
        Siste glacialmaksimum ca. 21 000 år siden: Fennoskandisk isdekke over Norge, havnivå ca. 120
        m lavere, CO₂ ca. 180–190 ppm.
      </p>
      <OrdBoks
        ord="Kvartær"
        barn="De siste ca. 2,6 millioner år: istider (glacialer) og mellomistider (interglacialer) i serie. Holocen er den mellomistiden vi er i nå."
      />
      <OrdBoks
        ord="Holocen"
        barn="Nåværende mellomistid, fra ca. 11 700 år før nå. Relativt stabil."
      />
      <p>
        Den varmeste flerårhundresperioden for ca. 6500 år siden lå 0,2–1 °C over 1850–1900 globalt.
        Tiåret 2011–2020 ligger over dette. Oppvarmingen siden 1970 er raskere enn i noen annen
        50-årsperiode på minst 2000 år (IPCC, 2021).
      </p>
      <p>
        En ny istid, orbitalt, ligger titusener av år fram. Høy CO₂ kan utsette den. Det er
        irrelevant for risikoen i 2100.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Terskler, kort</h2>
      <p>
        PETM, ca. 56 millioner år siden: raskt karbonpådriv, flere grader global oppvarming og
        havforsuring. Utslippsraten den gang er anslått 5–10 ganger lavere enn dagens. Analog for at
        karbon kan varme flere grader. Dårlig analog for hastighet.
      </p>
      <OrdBoks
        ord="PETM"
        barn="Paleocen–eocen-temperaturmaksimum for ca. 56 millioner år siden. Raskt karbonpådriv og flere grader oppvarming. Analog for at karbon varmer. Dårlig analog for farten i dag."
      />
      <p>
        For 8200 år siden (8,2 ka): kort avkjøling i tidlig holocen, knyttet til smeltevann i
        Nord-Atlanteren. Sammen med yngre dryas er det bevis for at AMOC-terskelen finnes. De er
        ikke 1:1-analoger. Den gang fantes enorme issjøer og isdekker i Nord-Amerika. AMOC er svært
        sannsynlig å svekke i dette århundret. Et brått sammenbrudd før 2100 er ikke det mest
        sannsynlige, men det er heller ikke utelukket. Se{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          havstrømmer
        </Link>
        .
      </p>
      <p>
        Paleodata straffer både ufølsomme og overfølsomme modeller. De minner om at beste anslag
        ikke er den eneste banen. De sjeldne, store utfallene — hale-utfall — har skjedd.
      </p>

      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for forskning på forhistorisk klima, og hvordan det bidrar til å lage prognoser
          for framtidens klima.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="Proxy"
          def="Et spor som henger sammen med klima, med støy. Aldri temperaturen i ett bestemt år."
        />
        <Term
          name="Iskjerne"
          def="Sylinder av is med årlige lag og innestengt luft. Boblene er ekte fortidsatmosfære."
        />
        <Term
          name="δ¹⁸O"
          def="Avvik i ¹⁸O/¹⁶O. I is: kaldere gir lavere verdi. I havbunn: temperatur pluss isvolum."
        />
        <Term
          name="Milanković"
          def="Tre orbitale perioder som flytter innstrålingen. Styrer sommersmelting på 65 °N."
        />
        <Term name="Holocen" def="Nåværende mellomistid, fra ca. 11 700 år før nå." />
        <Term
          name="Deglasiasjon"
          def="Når innlandsisen smelter bort. Orbital innstråling starter. CO₂ forsterker."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er en proxy i paleoklima?",
            options: [
              "Et termometer som har ligget i isen siden 1850.",
              "Et spor som henger sammen med klima, med støy — aldri selve temperaturen i ett gitt år.",
              "En modell som varsler 12. juni år 12 000 f.Kr.",
              "Bare CO₂ i dagens atmosfære.",
            ],
            answer: 1,
            explain: "Flere uavhengige spor som peker samme vei, slår én spektakulær kjerne.",
          },
          {
            prompt: "Hvorfor forklarer ikke Milanković oppvarmingen siden 1850?",
            options: [
              "Fordi jordbanen ikke finnes.",
              "Fordi de orbitale endringene er for trege, og går nå svakt mot avkjøling. I dag starter CO₂.",
              "Fordi iskjerner ikke kan måle CO₂.",
              "Fordi Holocen ikke er en mellomistid.",
            ],
            answer: 1,
            explain:
              "Under deglasiasjon starter innstråling, og CO₂ forsterker. Nå er det motsatt. Vi måler utslippene.",
          },
          {
            prompt: "Hva forteller luftboblene i antarktisk is?",
            options: [
              "Bare hvor kald isen er i dag.",
              "Ekte fortidsatmosfære. CO₂ der er en måling, ikke en tolkning.",
              "Bare δ¹⁸O, aldri gasser.",
              "At dagens CO₂ ligger i det naturlige spennet 172–300 ppm.",
            ],
            answer: 1,
            explain: "Naturlig senkvartært spenn er 172–300 ppm. Dagens verdi ligger over 425.",
          },
          {
            prompt: "Hvorfor er PETM en dårlig analog for hastigheten i dag?",
            options: [
              "Fordi PETM ikke varmet.",
              "Utslippsraten den gang er anslått 5–10 ganger lavere enn dagens. Analog for at karbon varmer — ikke for farten.",
              "Fordi AMOC ikke fantes.",
              "Fordi Holocen er eldre enn PETM.",
            ],
            answer: 1,
            explain: "PETM viser at karbon kan varme flere grader. Dagens utslipp går fortere.",
          },
        ]}
      />
    </TopicLayout>
  );
}
