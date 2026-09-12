import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  AbruptClimateChangeDiagram,
  IceCoreAnatomyDiagram,
  OxygenIsotopeDiagram,
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
      title={tema.title}
      lead="Termometre og satellitter dekker et øyeblikk: globalt 150–170 år med instrumentelle målinger, CO₂ på Mauna Loa siden 1958 (NOAA, u.å.), og havis fra satellitt siden 1979 (NSIDC, u.å.). Istider, mellomistider og plutselige hopp ligger i is, havbunn og trær. Uten arkivene kan vi verken vite om dagens CO₂ er utenfor naturens eget spenn — eller om klimamodellene treffer når planeten varmes og kjøles."
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/milankovitch", label: "Neste: Istider" }}
      kilder={KILDER.paleoklima}
    >
      <p>
        Kompetansemålet handler ikke om å pugge årstall. Det handler om kjeden fra{" "}
        <em>spor i naturen</em> til <em>fysisk kunnskap</em>: Noe i naturen tar vare på et avtrykk,
        vi daterer det, vi kalibrerer mot det vi måler i dag, vi rekonstruerer klimaet med
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
      <p>
        Hvorfor istidene kommer og går, og hvilke spor isen la i Norge, ligger i{" "}
        <Link
          to="/tema/milankovitch"
          className="text-primary underline-offset-2 hover:underline"
        >
          istider
        </Link>
        . Denne siden eier arkivene: hvordan vi leser fortiden.
      </p>

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
        først på vei mot polene. Under en istid blir det lette ¹⁶O-vannet låst i innlandsis på land.
      </p>

      <OxygenIsotopeDiagram />

      <p>Dette gir en klassisk geofaglig kontrast:</p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>I iskjernen (nedbørsarkiv):</strong> Kaldt istidsklima gir{" "}
          <em>lav (svært negativ) δ¹⁸O</em> fordi det meste av ¹⁸O har regnet ut lenge før skyene
          nådde polene.
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

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Hva arkivene viser — uten å forklare banen
      </h2>
      <p>
        De samme periodene sitter i is og i havbunn: åtte store sykluser de siste 800 000 årene,
        med CO₂ mellom omtrent 180 ppm i istid og 280 ppm i mellomistid (Lüthi et al., 2008). At
        kurven sager, er et fakta fra arkivet. Hvorfor den sager i 41 000 og 100 000 år — og
        hvorfor sommersol på 65 °N er nøkkelen — ligger i{" "}
        <Link
          to="/tema/milankovitch"
          className="text-primary underline-offset-2 hover:underline"
        >
          istider
        </Link>
        .
      </p>
      <p>
        <strong>Holocen</strong> er den nåværende mellomistiden, datert til å starte for ca. 11 700
        år siden i Grønlands iskjerner (Walker et al., 2009). Holocen har vært usedvanlig stabil
        og la grunnlaget for jordbruk. Under det holocene klimaoptimumet for ca. 6000–8000 år siden
        lå sommertemperaturene på den nordlige halvkule ca. 0,2–1,0 °C over førindustrielt nivå
        (1850–1900). Dagens tiår ligger allerede markant over dette nivået, og
        oppvarmingshastigheten siden 1970 er raskere enn i noen annen 50-årsperiode på minst 2000
        år (IPCC, 2021).
      </p>
      <OrdBoks
        ord="Holocen"
        barn="Vår nåværende mellomistid fra ca. 11 700 år før nå. En stabil varmeperiode der jordbruk og sivilisasjon vokste fram. Dateringen sitter i Grønlands iskjerner."
      />

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Terskler i arkivet: smeltevann, AMOC og PETM
      </h2>
      <p>
        Paleoklima viser at klimasystemet ikke alltid endrer seg jevnt. Når visse terskler
        overskrides, kan store deler av jordsystemet skifte tilstand over noen tiår. Det leser vi
        ut av iskjerner og sedimenter — ikke av banekurvene.
      </p>

      <AbruptClimateChangeDiagram />

      <p>
        <strong>Yngre Dryas (12 800–11 600 år før nå) og 8,2 ka-hendelsen:</strong> Under
        avsmeltingen av Laurentide-isdekket i Nord-Amerika ble store bresjøer som Lake Agassiz
        demmet opp bak isrygger. Da isdemningen brast, strømmet ferskvann ut i Nord-Atlanteren.
      </p>
      <p>
        Ferskvann er lettere enn saltvann og la seg som et lokk. Det hindret overflatevannet i å
        synke i Norskehavet og Labradorhavet.{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          AMOC
        </Link>{" "}
        bremset. Uten den nordgående varmetransporten stupte temperaturen over Skandinavia på få
        tiår, før sirkulasjonen kom tilbake. I Norge er det samme hoppet synlig som{" "}
        <Link
          to="/tema/milankovitch"
          className="text-primary underline-offset-2 hover:underline"
        >
          Raet
        </Link>
        — en endemorene, ikke en ny forklaring.
      </p>
      <OrdBoks
        ord="Yngre Dryas"
        barn="En brå kuldeperiode for ca. 12 800–11 600 år siden. Arkivene viser et hopp knyttet til smeltevann og svekket AMOC. I Norge står hoppet i landskapet som Raet."
      />

      <p>
        <strong>PETM (Paleocen-eocen-temperaturmaksimum for ca. 56 millioner år siden):</strong> En
        annen type terskel, lenger tilbake enn iskjerner rekker. Et stort karbonutslipp ga 5–8 °C
        global oppvarming og havforsuring. PETM viser at drivhusgasser kan endre globalt klima, men
        den årlige utslippsraten den gang var 5–10 ganger <em>lavere</em> enn dagens
        menneskeskapte utslipp (IPCC, 2021).
      </p>
      <OrdBoks
        ord="PETM"
        barn="Paleocen-eocen-temperaturmaksimum for ca. 56 millioner år siden. Massivt naturlig karbonutslipp og global oppvarming. Utslippsfarten var lavere enn i dag."
      />

      <Callout title="Kompetansemål i Geofag 2">
        <p>
          Gjøre rede for forskning på forhistorisk klima, og forklare hvordan paleoklimatiske
          arkiver bidrar til å kalibrere numeriske modeller og lage pålitelige prognoser for
          framtidens klima. Banen og istidsfaktorene ligger i neste kapittel.
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
          name="Holocen"
          def="Nåværende stabile mellomistid fra ca. 11 700 år før nå. Dateringen sitter i Grønlands iskjerner."
        />
        <Term
          name="Yngre Dryas"
          def="Brå kuldeperiode for 12 800 år siden. Leses i arkivene som smeltevann og svekket AMOC."
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
            prompt: "Hva betyr gassalder (Δage) i en iskjerne?",
            options: [
              "At luften i boblene er eldre enn isen rundt.",
              "At luften i boblene er yngre enn isen rundt, fordi porene lukkes først på 50–100 meters dyp.",
              "At CO₂ aldri kan dateres.",
              "At iskjerner bare virker etter 1850.",
            ],
            answer: 1,
            explain:
              "Firn er porøs. Luft sirkulerer til porene klemmes igjen. Gassen som fanges, falt som snø senere enn isen som omslutter den.",
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
            prompt: "Hvorfor er PETM nyttig når vi kalibrerer dagens utslipp mot arkivet?",
            options: [
              "Fordi PETM viser at karbon aldri har varmet klimaet.",
              "Fordi et stort naturlig karbonutslipp varmet jorda, men den årlige utslippsraten var lavere enn i dag.",
              "Fordi PETM sitter i antarktisk is fra de siste 800 000 årene.",
              "Fordi PETM startet holocen.",
            ],
            answer: 1,
            explain:
              "PETM er bevis for at karbon varmer globalt. IPCC bruker slike hendelser når de sammenligner naturlig og menneskeskapt utslippsrate.",
          },
          {
            prompt: "Hva utløste den brå kuldeperioden i Yngre Dryas, slik arkivene viser det?",
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
