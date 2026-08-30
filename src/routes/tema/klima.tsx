import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure, PhotoPair } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";

export const Route = createFileRoute("/tema/klima")({
  component: KlimaPage,
});

function KlimaPage() {
  return (
    <TopicLayout
      kicker="Jordsystemet"
      title="Klima"
      lead="Vær er det som skjer i dag. Klima er det som gjentar seg over tiår. Når du har trykk, vind, coriolis og hav, kan du se hvorfor klimaet henger sammen — og hvorfor det kan forskyves."
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      videoTopic="klimasystemet"
      prev={{ to: "/tema/havstrommer", label: "Forrige: Havstrømmer" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KILDER.klima}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Vær er dager. Klima er tiår.
      </h2>
      <p>
        En mild januaruke er vær. At Vestlandet er vått, og at norskekysten på 60°N er mildere enn
        Labrador på samme bredde — det er klima. Klima er statistikken: typisk temperatur, nedbør,
        vind og is over minst tretti år (WMO, u.å.).
      </p>
      <p>
        Derfor kan du ikke «motbevise» klimaendring med én kald vinter. Og du kan ikke «bevise» den
        med én varm uke. Du trenger mønsteret.
      </p>
      <OrdBoks
        ord="Klima"
        barn="Gjennomsnitt og variasjonsmønster i vær over lang tid, vanligvis tretti år eller mer. Klimaet beskriver hva som er typisk — og hva som er ekstremt — på et sted."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fem deler, ett system
      </h2>
      <p>
        Klimasystemet er ikke bare luft. Atmosfæren, havet, isen, landoverflaten og livet bytter
        varme, vann og karbon. Endrer du én del, svarer de andre.
      </p>
      <p>
        Kryosfæren er mer enn innlandsisen på figuren. Havis i Arktis styrer albedo fra uke til uke.
        Permafrost lagrer karbon i bakken. Breer i Norge er små, men de er synlige agenter: de
        graver om sommeren og mater elvene. Isen er treg, men ikke stille.
      </p>
      <OrdBoks
        ord="Permafrost"
        barn="Bakke som er frosset året rundt. Lagrer karbon. Tiner den, kan noe av karbonet slippe ut som CO₂ eller metan."
      />
      <OrdBoks
        ord="Kryosfæren"
        barn="All is og snø på jorda: innlandsis, isbreer, havis og permafrost. Den er hvit, kald og treg — og den henger tett sammen med havet."
      />

      <PhotoFigure
        src="/images/fig-klimasystem.jpg"
        alt="Jorda fra verdensrommet med tynn atmosfære, hav, skyer og innlandsis"
        heading="Ett system, flere etasjer"
        caption="Det du ser her, er klimasystemet: luft, hav, is og land i samme bilde. Ingenting av dette kjører alene."
        marks={[
          { x: 4, y: 20, n: "1", text: "Atmosfære", tone: "teal" },
          { x: 8, y: 52, n: "2", text: "Hav", tone: "cold" },
          { x: 58, y: 48, n: "3", text: "Is", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "Tynn, rask, flytter fukt og varme på dager." },
          { n: "2", label: "Tregt varmelager. Demper og forskyver klimaet." },
          { n: "3", label: "Hvit flate. Smelter den, tar planeten opp mer sol." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Inn og ut — og det som holder igjen
      </h2>
      <p>
        Sola sender inn kortbølget lys. Jorda sender ut langbølget stråling. Er inn og ut i balanse
        over tid, er den globale temperaturen stabil. Er de ikke det, varmes eller kjøles planeten
        til balansen er gjenopprettet.
      </p>
      <p>
        Enkelte gasser i lufta — vanndamp, karbondioksid, metan — slipper sollyset inn, men bremser
        varmen på vei ut (NASA, u.å.). Uten dem ville jorda vært en frossen stein. Med for mye av
        dem stiger temperaturen.
      </p>
      <OrdBoks
        ord="Drivhuseffekt"
        barn="At atmosfæren slipper sollys inn, men holder igjen noe av varmen jorda sender ut. Den er naturlig og nødvendig. Mennesket forsterker den ved å øke mengden av visse gasser."
      />
      <OrdBoks
        ord="Strålingspådriv"
        barn="Et dytt som forskyver balansen mellom stråling inn og ut. Solen kan dytte. Vulkaner kan dytte. Drivhusgasser kan dytte. Et positivt pådriv varmer. Et negativt kjøler."
      />

      <PhotoPair
        heading="Samme jord, to ledd i energien"
        caption="Venstre: sola treffer mest ved ekvator — det du allerede har i vindkapitlet. Høyre: den tynne glødende atmosfæren er teppet som bremser varmen på vei ut."
        left={{
          src: "/images/fig-innstraling.jpg",
          alt: "Jorda belyst sterkest ved ekvator",
          title: "Inn: sola treffer ujevnt",
          marks: [{ x: 6, y: 14, n: "1", text: "Mest inn ved ekvator", tone: "warm" }],
        }}
        right={{
          src: "/images/fig-drivhus.jpg",
          alt: "Jordas atmosfære gløder langs horisonten i skumring",
          title: "Ut: teppet bremser",
          marks: [{ x: 6, y: 18, n: "2", text: "Atmosfæren holder igjen", tone: "teal" }],
        }}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Pådriv dytter. Tilbakekobling forsterker eller demper.
      </h2>
      <p>
        Et pådriv er det første dytet. En tilbakekobling er systemets svar. Noen svar forsterker
        dytten. Noen svekker den.
      </p>
      <p>
        Vanndamp er den sterkeste drivhusgassen i lufta — men den er i hovedsak en forsterker, ikke
        det første dytet. Blir det varmere, kan lufta holde mer vanndamp. Mer vanndamp holder mer
        varme. Det kalles en positiv tilbakekobling.
      </p>
      <OrdBoks
        ord="Vanndamp"
        barn="Den sterkeste drivhusgassen i lufta, men mengden styres av temperaturen. Derfor er den en forsterker, ikke det første dytet."
      />
      <OrdBoks
        ord="Tilbakekobling"
        barn="Når en endring utløser en ny endring som enten forsterker (positiv) eller demper (negativ) den første. Positiv betyr ikke «bra». Det betyr forsterkende."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Isen er et speil</h2>
      <p>
        Hvit is kaster mye sollys tilbake. Mørkt hav tar det opp. Smelter isen, blir flaten mørkere,
        tas mer sol opp, blir det varmere, smelter mer is. Det er is-albedo-tilbakekoblingen — en av
        de tydeligste forsterkerne i polarstrøk.
      </p>
      <OrdBoks
        ord="Albedo"
        barn="Hvor stor del av sollyset en flate kaster tilbake. Snø og is har høy albedo. Hav og skog har lav. Jo mørkere flate, jo mer energi tas opp."
      />

      <PhotoFigure
        src="/images/fig-albedo.jpg"
        alt="Arktisk iskant der hvit is møter mørkt åpent hav"
        heading="To flater, to utfall"
        caption="Samme sol. Hvit is sender mye tilbake. Mørkt vann tar det opp. Når iskanten trekker seg tilbake, vinner den mørke flaten."
        marks={[
          { x: 8, y: 16, n: "1", text: "Is kaster tilbake", tone: "fg" },
          { x: 68, y: 38, n: "2", text: "Hav tar opp", tone: "cold", align: "right" },
        ]}
        points={[
          { n: "1", label: "Høy albedo. Mye sollys reflekteres." },
          { n: "2", label: "Lav albedo. Energien blir i havet og luften over." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Havet husker</h2>
      <p>
        Det meste av overskuddsvarmen de siste tiårene har gått i havet, ikke i lufta (NASA, u.å.).
        Derfor kan lufttemperaturen svinge fra år til år, mens havet jevnt tar opp mer energi.
      </p>
      <p>
        AMOC — beltet du møtte under havstrømmer — er en del av dette minnet. Smelter mer is og
        kommer mer ferskvann ut i de nordiske hav, blir overflaten lettere. Da kan synkingen
        svekkes. Usikkerheten for Nord-Europa er reell, men beltet er ikke «slått av».
      </p>

      <PhotoFigure
        src="/images/fig-amoc.jpg"
        alt="Nord-Atlanteren med varm overflate nordover og kaldt dyp"
        heading="Havet som klimaminne"
        caption="Varmt nordover i lyset, kaldt sørover i mørket. Dette er tregere enn været — og derfor en del av klimaet, ikke av ukas prognose."
        arrows={[
          { d: "M 22 22 L 58 16", tone: "warm", width: 1.3 },
          { d: "M 70 42 L 28 48", tone: "cold", width: 1.3 },
        ]}
        marks={[
          { x: 8, y: 12, n: "1", text: "Varmt, tregt lager", tone: "warm" },
          { x: 8, y: 50, n: "2", text: "Kaldt dyp sørover", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Overflaten flytter og lagrer varme mot nord." },
          { n: "2", label: "Dypet er returen. Ferskvann kan gjøre synking tyngre å få til." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        ENSO: klimaet på noen år
      </h2>
      <p>
        I det tropiske Stillehavet svinger et samspill mellom passatvind og varmt overflatevann.
        Vanligvis blåser passatene varmt vann mot Indonesia. Der stiger lufta, og det regner
        kraftig. Østkysten av Stillehavet, utenfor Peru, er da kjøligere og tørrere.
      </p>
      <p>
        I et El Niño-år svekkes passatene. Det varme vannet sprer seg østover. Regnet flytter med.
        Peru kan få flom. Indonesia og Australia tørke. Vinden og jetstrømmene andre steder på
        kloden merker det — det kalles telekobling.
      </p>
      <p>
        La Niña er den andre siden: sterkere passater, enda varmere i vest, kjøligere i øst. ENSO er
        naturlig (NOAA, u.å.). Den er ikke det samme som global oppvarming. Men den rir oppå et
        varmere hav.
      </p>
      <OrdBoks
        ord="ENSO"
        barn="El Niño–Sørlige oscillasjon: et naturlig samspill mellom tropisk Stillehav og passatvindene, med El Niño og La Niña som to ytterpunkter. Det forskyver regn og tørke over store deler av kloden i noen år."
      />

      <PhotoFigure
        src="/images/fig-enso.jpg"
        alt="Ekvatorialt Stillehav fra bane med varmt vann og konvektive skyer"
        heading="Scenen for ENSO"
        caption="Det tropiske Stillehavet. Passatene peker vanligvis mot vest og stabler varmt vann der. Når de slakker, flytter varmen og regnet østover."
        arrows={[{ d: "M 78 32 L 28 28", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 58, y: 12, n: "1", text: "Passater mot vest", tone: "teal" },
          { x: 8, y: 48, n: "2", text: "Varmt vann og konveksjon", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Vanligvis: passater driver varmt vann mot Indonesia." },
          { n: "2", label: "Der vannet er varmest, stiger lufta. Regnet følger varmen." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Klimaet har alltid endret seg
      </h2>
      <p>
        Istidene kom og gikk. Jordas bane og helning endrer hvor sola treffer gjennom årtusener.
        Vulkaner kan kjøle i noen år. Solen svinger svakt. Det er ikke et argument mot at mennesket
        endrer klimaet nå. Det er bakgrunnen.
      </p>
      <p>
        I iskjerner sitter gamle luftbobler. De viser at temperatur og karbondioksid har fulgt
        hverandre lenge — og at dagens stigning i karbondioksid er brattere enn det isen har sett
        gjennom hundretusener av år.
      </p>
      <OrdBoks
        ord="Paleoklima"
        barn="Klimaet i fortiden, rekonstruert fra iskjerner, sedimenter, årringer og koraller. Det gir oss både naturlig variasjon og en målestokk for hvor uvanlig dagens endring er."
      />
      <p>
        Hvordan arkivene blir til kunnskap — proxy, iskjerne, Milanković og terskler — står under{" "}
        <Link to="/tema/paleoklima" className="text-primary underline-offset-2 hover:underline">
          paleoklima
        </Link>
        .
      </p>

      <PhotoFigure
        src="/images/fig-paleo.jpg"
        alt="Lagdelt is i en bresprekk, blåhvite bånd av gammel is"
        heading="År skrevet i is"
        caption="Hvert bånd er gammel snø som ble til is. Luftbobler i lagene er prøver av atmosfæren den gangen. Fortiden sitter her, bokstavelig talt."
        marks={[
          { x: 6, y: 20, n: "1", text: "Yngre lag øverst", tone: "fg" },
          { x: 6, y: 52, n: "2", text: "Eldre is lenger ned", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Nyere snø og is nærmest overflaten." },
          { n: "2", label: "Dypere lag er eldre luft og eldre klima." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Det mennesket gjør</h2>
      <p>
        Når vi brenner kull, olje og gass, slipper vi ut karbon som har ligget i berggrunnen.
        Karbondioksid i lufta stiger. Det er et positivt strålingspådriv (IPCC, 2021). Vanndamp og
        is-albedo forsterker. Havet tar unna mye varme, men ikke alt — og det blir surere når det
        tar opp karbondioksid.
      </p>
      <p>
        Naturlig drivhuseffekt er ikke det samme som menneskeskapt forsterkning. Den første gjør
        planeten beboelig. Den andre forskyver klimaet vi har bygget samfunn i.
      </p>
      <OrdBoks
        ord="Antropogen"
        barn="Menneskeskapt. Antropogen klimapåvirkning er dytten fra våre utslipp og arealbruk, oppå den naturlige variasjonen."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Norge i dette bildet
      </h2>
      <p>
        Vi ligger i vestavindsbeltet, med et varmt hav utenfor. Derfor er kysten mildt for
        breddegraden. I et varmere klima holder lufta mer fukt. Vestlandet, som allerede tvinges av
        fjellet, kan få mer intens nedbør. Snøgrensen kryper oppover. Havet stiger.
      </p>
      <p>
        AMOC er usikkerhetsmomentet. En svekket nordovertransport av varme kan dempe oppvarmingen i
        Nord-Atlanteren uten å «slå av Golfstrømmen». Klima i Norge er samspill, ikke én strøm.
      </p>

      <PhotoFigure
        src="/images/fig-norge-labrador.jpg"
        alt="Norsk kyst mot isete Labrador-landskap som kontrast"
        heading="Samme bredde, ulikt klima"
        caption="Norge er ikke mildt fordi vi ligger lenger sør. Vi er milde fordi luft og hav flytter varme hit. Endres det samspillet, endres det norske klimaet."
        marks={[
          { x: 6, y: 16, n: "1", text: "Norsk kyst", tone: "teal" },
          { x: 58, y: 16, n: "2", text: "Labrador, samme bredde", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Vestavind og atlantisk varme. Grønt og åpent hav." },
          {
            n: "2",
            label: "Samme breddegrad, men kald luft og is. Klima er transport, ikke bare solhøyde.",
          },
        ]}
      />

      <Callout title="Til eksamen">
        <p>
          Skill vær og klima. Skill pådriv og tilbakekobling. Vanndamp forsterker, karbondioksid
          dytter. ENSO er naturlig årsvariasjon i Stillehavet, ikke synonymt med global oppvarming.
          Norges milde kyst er vestavind plus hav — AMOC inkludert.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          «Klimaet har alltid endret seg» er sant, og det motbeviser ikke et menneskeskapt pådriv
          nå. Drivhuseffekten er ikke noe vi har funnet opp — vi forsterker en naturlig effekt. Og
          én kald vinter er vær.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Klima" def="Værmønster over tiår, ikke enkeltuker." />
        <Term name="Strålingspådriv" def="Dytt som forskyver inn og ut av energi." />
        <Term name="Tilbakekobling" def="Svar som forsterker eller demper dytten." />
        <Term name="Albedo" def="Andel sollys som kastes tilbake." />
        <Term name="ENSO" def="Naturlig svingning i tropisk Stillehav." />
        <Term name="Antropogen" def="Menneskeskapt påvirkning." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er forskjellen på vær og klima?",
            options: [
              "Vær er temperatur, klima er nedbør.",
              "Vær er tilstanden nå og de nærmeste dagene. Klima er mønsteret over tiår.",
              "Klima er bare i tropene.",
              "De er samme ting med ulike navn.",
            ],
            answer: 1,
            explain: "En kald uke er vær. At et sted er typisk kaldt i tretti år, er klima.",
          },
          {
            prompt: "Hvorfor er vanndamp mest en tilbakekobling, ikke det første pådrivet?",
            options: [
              "Fordi vanndamp ikke er en drivhusgass.",
              "Fordi mengden vanndamp i lufta styres av temperaturen. Dytten kommer fra noe annet — for eksempel mer karbondioksid.",
              "Fordi vanndamp bare finnes over hav.",
              "Fordi den ikke påvirker stråling.",
            ],
            answer: 1,
            explain:
              "Varmere luft holder mer vanndamp. Mer vanndamp holder mer varme. Forsterker, ikke starter.",
          },
          {
            prompt: "Hva beskriver ENSO best?",
            options: [
              "At Golfstrømmen snur.",
              "Et naturlig samspill mellom passater og varmt vann i tropisk Stillehav, som flytter regn og tørke i noen år.",
              "At ozonlaget tynnes.",
              "At alle orkaner kommer fra Stillehavet.",
            ],
            answer: 1,
            explain:
              "El Niño og La Niña er ytterpunkter i samme svingning. De er ikke det samme som global oppvarming.",
          },
        ]}
      />
    </TopicLayout>
  );
}
