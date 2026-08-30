import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";
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
        "AMOC (Atlantic Meridional Overturning Circulation): Termohalin sirkulasjon, dypvannsdannelse, ferskvannspådrag, stabilitet og konsekvenser for Norges klima.",
      path: "/tema/klima/amoc",
    }),
  component: AmocPage,
});

function AmocPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Termohalin sirkulasjon"
      title="AMOC: Den atlantiske omveltningssirkulasjonen"
      lead="Atlanterhavet har en enorm termisk motor: AMOC. Den frakter varme fra ekvator helt opp til Arktis og gjør Norge beboelig på 60°N. Men når isen smelter og ferskvann strømmer ut, settes stabiliteten på prøve."
      banner="/images/fig-amoc.jpg"
      bannerAlt="Nord-Atlanteren med fargegradient som illustrerer varme overflatestrømmer og kalde dypstrømmer"
      prev={{ to: "/tema/klima/nao", label: "Forrige: NAO" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KILDER.amoc}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er AMOC?
      </h2>
      <p>
        <strong>AMOC</strong> står for <em>Atlantic Meridional Overturning Circulation</em> (Den
        atlantiske meridionale omveltningssirkulasjonen). Det er den atlantiske grenen av det globale,
        termohaline transportbåndet i verdenshavene (Rahmstorf et al., 2015).
      </p>
      <p>
        AMOC består av to hovedledd:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>En varm, overflatenær strøm nordover:</strong> Varmt og saltholdig vann fraktes fra
          tropene og Mexicogolfen via Golfstrømsystemet og Den nordatlantiske strømmen mot Norskehavet
          og Polhavet.
        </li>
        <li>
          <strong>En kald, dyp returstrøm sørover:</strong> Vannet avkjøles i nord, synker mot havbunnen
          (dypvannsdannelse), og strømmer sørover som <em>Nordatlantisk dypvann (NADW)</em> langs
          havbunnen.
        </li>
      </ul>

      <OrdBoks
        ord="AMOC"
        barn="Det store omveltningssystemet i Atlanterhavet, drevet av tetthetsforskjeller (temperatur og saltholdighet) og vind. Frakter overskuddsvarme fra tropene til Nord-Europa."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Forskjellen på Golfstrømmen og AMOC
      </h2>
      <p>
        I media omtales ofte «Golfstrømmen» som om den kan stoppe helt opp. I geofag er det avgjørende å
        skille presist mellom disse to begrepene:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Golfstrømmen (Gulf Stream):</strong> Er primært en <em>vinddrevet overflatestrøm</em>.
          Så lenge jorda roterer og passat- og vestavindene blåser, vil den subtropiske gyren og
          Golfstrømmen eksistere. Den kan ikke «slås av».
        </li>
        <li>
          <strong>AMOC:</strong> Er hele den vertikale <em>omveltningssirkulasjonen</em>. Det er denne
          termohaline pumpen — dypvannsdannelsen i nord — som kan svekkes eller i verste fall nå et
          vippepunkt.
        </li>
      </ul>

      <PhotoFigure
        src="/images/fig-amoc.jpg"
        alt="Skisse av AMOC-sirkulasjonen med overflatestrøm og dypvannsdannelse"
        heading="AMOC: Havets vertikale transportbånd"
        caption="Varmt overflatevann avgir varme til atmosfæren over Norskehavet. Det tunge, kalde vannet synker og returnerer i mørket mot Sørishavet."
        arrows={[
          { d: "M 22 22 L 58 16", tone: "warm", width: 1.3 },
          { d: "M 70 42 L 28 48", tone: "cold", width: 1.3 },
        ]}
        marks={[
          { x: 8, y: 12, n: "1", text: "Varmt salt overflatevann", tone: "warm" },
          { x: 55, y: 15, n: "2", text: "Dypvannsdannelse", tone: "cold" },
          { x: 8, y: 50, n: "3", text: "Kald dypstrøm (NADW)", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Frakter ca. 1,3 petawatt (10¹⁵ W) varme nordover." },
          { n: "2", label: "Konveksjon i Grønlandshavet, Norskehavet og Labradorhavet." },
          { n: "3", label: "Tetthetsdrevet returstrøm som fyller de dype havbassengene." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Mekanismen: Hvorfor synker vannet?
      </h2>
      <p>
        Havvannets tetthet styres av to faktorer: <strong>temperatur</strong> (kaldt vann er tyngre enn
        varmt vann) og <strong>saltholdighet</strong> (salt vann er tyngre enn ferskvann).
      </p>
      <p>
        Når overflatevannet strømmer nordover, fordamper mye fuktighet, noe som gjør vannet relativt salt.
        Når dette salte vannet når de subpolare områdene om vinteren, møter det iskald arktisk luft.
        Vannet avkjøles kraftig. Kombinasjonen av <em>høy saltholdighet</em> og <em>lav temperatur</em> gjør
        overflatevannet tettere enn lagene under.
      </p>
      <p>
        Vannet blir ustabilt og synker i gigantiske synletrakter (åpenhavskonveksjon) helt ned til
        2000–3000 meters dyp. Dette danner et sug som trekker mer varmt vann nordover fra tropene.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Ferskvannstrusselen og vippepunkter
      </h2>
      <p>
        Hva skjer når klimaet blir varmere?
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Økt smelting fra Grønland og havisen:</strong> Smelting av landis tilfører enorme
          mengder <em>rent ferskvann</em> til Nord-Atlanteren.
        </li>
        <li>
          <strong>Økt nedbør og elveavrenning:</strong> En varmere atmosfære holder mer fuktighet og øker
          nedbøren over subpolare områder.
        </li>
      </ul>
      <p>
        Ferskvann har lavere tetthet enn saltvann. Når ferskvannet legger seg som et lokk på overflaten,
        klarer ikke overflatevannet lenger å bli tungt nok til å synke, selv om det avkjøles. Dermed kan
        den vertikale motoren i AMOC bremses (Caesar et al., 2018).
      </p>

      <OrdBoks
        ord="Vippepunkt (Tipping point)"
        barn="En kritisk terskel der en liten ytterligere endring kan utløse en selvforsterkende og uomvendelig overgang til en helt ny tilstand i et system."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva betyr en svekket AMOC for Norge og verden?
      </h2>
      <p>
        Målinger og klimarekonstruksjoner tyder på at AMOC allerede er svekket med 10–15 % siden midten
        av 1900-tallet (Smeed et al., 2018). Det mest synlige tegnet på dette er den såkalte{" "}
        <em>«kaldlommen» (cold blob)</em> i Nord-Atlanteren sør for Grønland — det eneste havområdet på
        jorda som har blitt kjøligere i en periode med global oppvarming.
      </p>
      <p>
        Dersom AMOC fortsetter å svekkes kraftig:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>For Norge og Nordvest-Europa:</strong> Den raske oppvarmingen kan bremses eller lokalt
          snus til en relativ avkjøling. Men stormbanene vil trolig intensiveres, og værvariabiliteten vil
          øke markant.
        </li>
        <li>
          <strong>Havnivåstigning:</strong> Når strømmen svekkes, stuves mindre vann opp i midten av
          Atlanteren, noe som fører til ekstra rask lokal havnivåstigning langs USAs østkyst.
        </li>
        <li>
          <strong>Tropene:</strong> Det tropiske regnbeltet (ITCZ) forskyves sørover, noe som kan gi
          katastrofal tørke i Sahel-regionen i Afrika og forstyrre de asiatiske monsunene.
        </li>
      </ul>

      <Callout title="Til eksamen">
        <p>
          Husk:
          <br />
          1. <strong>AMOC drives av tetthet (termohalin = temperatur + salt).</strong>
          <br />
          2. <strong>Ferskvann fra Grønland reduserer saltholdigheten → vannet blir for lett til å synke → AMOC svekkes.</strong>
          <br />
          3. <strong>Golfstrømmen stopper ikke (den er vinddrevet), men den dype omveltningen (AMOC) kan bremses vesentlig.</strong>
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          «Istid i Norge i morgen» er en Hollywood-myte (som i filmen <em>The Day After Tomorrow</em>). En
          svekkelse av AMOC er en gradvis prosess over tiår og århundrer, og den kjemper mot den
          samtidige globale oppvarmingen fra drivhusgasser.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="AMOC" def="Den atlantiske meridionale omveltningssirkulasjonen." />
        <Term name="Termohalin sirkulasjon" def="Dypvannssirkulasjon drevet av tetthetsforskjeller (temperatur og salt)." />
        <Term name="NADW" def="North Atlantic Deep Water; det kalde dypvannet som strømmer sørover." />
        <Term name="Dyp konveksjon" def="Vertikal nedsynking av tungt overflatevann i subpolare hav." />
        <Term name="Ferskvannspådrag" def="Tilførsel av smeltevann som hemmer nedsynking ved å redusere tettheten." />
        <Term name="Cold blob" def="Det avkjølte havområdet i Nord-Atlanteren som indikerer svekket AMOC." />
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
              "Kaldt og salt overflatevann oppnår høyere tetthet enn vannlagene under, og synker dermed ned for å danne dypvann (NADW).",
          },
          {
            prompt: "Hvorfor kan økt smelting fra Grønlandsisen svekke AMOC?",
            options: [
              "Fordi isfjellene fysisk blokkerer Golfstrømmen.",
              "Fordi ferskvann har lavere tetthet enn saltvann, slik at overflatevannet ikke blir tungt nok til å synke.",
              "Fordi smeltevannet koker opp og fordamper hele Atlanterhavet.",
              "Fordi ferskvannet stanser jordrotasjonen.",
            ],
            answer: 1,
            explain:
              "Ferskvann fra smelting gjør overflatevannet mindre salt og dermed lettere. Dette hindrer nedsynkingen og bremser hele transportbåndet.",
          },
          {
            prompt: "Hva er forskjellen mellom Golfstrømmen og AMOC?",
            options: [
              "Golfstrømmen er en vinddrevet overflatestrøm i den subtropiske gyren, mens AMOC er hele det vertikale omveltningsbåndet.",
              "Det er ingen forskjell, de er to navn på nøyaktig samme vannstrøm.",
              "Golfstrømmen går i Stillehavet, mens AMOC går i Atlanterhavet.",
              "AMOC finnes bare om sommeren.",
            ],
            answer: 0,
            explain:
              "Golfstrømmen er en vestlig randstrøm drevet av vind og jordrotasjon, mens AMOC er det storskala termohaline omveltningsbåndet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
