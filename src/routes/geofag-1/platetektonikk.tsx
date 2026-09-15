import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  BoundaryOverviewDiagram,
  CollisionDiagram,
  ContinentalRiftDiagram,
  ConvectionDiagram,
  DecompressionMeltingDiagram,
  EarthLayersDiagram,
  HotspotPlumeDiagram,
  NorwayTectonicsHistoryDiagram,
  OceanOceanSubductionDiagram,
  PlatesMapDiagram,
  SolidusDiagram,
  SpreadingDiagram,
  SubductionDiagram,
  TransformDiagram,
  WilsonCycleDiagram,
} from "@/components/diagrams";
import { GeoMap } from "@/components/geo-map";
import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("platetektonikk")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/platetektonikk")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description:
        "Platetektonikk: Jordens dynamiske skall, drivkrefter (slab pull og ridge push), dekompresjons- og flukssmelting, de tre plategrensene, Wadati-Benioff-sonen, Wilsonsyklusen og Norges geologiske reise.",
      path: "/geofag-1/platetektonikk",
    }),
  component: PlatetektonikkPage,
});

function PlatetektonikkPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Under føttene våre er jordskorpen i konstant, nådeløs bevegelse. Kontinenter kolliderer, havbassenger åpner og lukker seg, og havet fornyes kontinuerlig fra jordas brennende indre. Platetektonikken er geovitenskapens samlende teori: Den forklarer hvorfor fjellkjeder reiser seg mot himmelen, hvorfor jordskjelv ryster kloden, hvorfor magma veller fram fra dypet – og hvorfor Norges dramatisk formede kystlinje og fjellverden ser ut som den gjør i dag."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/jordsystemene",
        label: "Forrige: Jordsystemene",
      }}
      next={{
        to: "/geofag-1/vulkaner",
        label: "Neste: Vulkaner",
      }}
      kilder={KILDER.platetektonikk}
    >
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne <em>gjøre rede for indre krefter og prosesser, platetektonikk og
          hvilke konsekvenser dette har for jordskorpen og jordoverflaten</em>, samt forstå hvordan norsk natur og
          geologi er et resultat av denne globale dynamikken.
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Jordens indre krefter og prosesser:</em> Litosfære, astenosfære, konveksjon og slab pull som hoveddrivkraft.</p>
          <p>• <em>Plategrenser og landskapsutvikling:</em> Divergente, konvergente og transforme grenser samt Wilsonsyklusen.</p>
          <p>• <em>Norge i platetektonisk lys:</em> Kaledonidene, Leka-ofiolitten, Oslofeltets riftdal og postglasial landheving.</p>
        </div>
      </Callout>

      {/* 1. JORDENS OPPBYGNING OG REOLOGI */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordens dynamiske indre: Litosfære, astenosfære og reologi
        </h2>
      <p>
        For å forstå platetektonikk må vi først avlive en av de mest seiglivede misforståelsene i geofaget:
        Troen på at jordas plater er «et stykke jordskorpe som flyter på et hav av flytende magma». Slik
        er ikke planeten vår bygd opp.
      </p>
      <p>
        Jordkloden er lagdelt etter kjemisk sammensetning (tetthet) og mekaniske egenskaper (reologi):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Jordskorpen (0–70 km):</strong> Klodens ytterste, tynne «skall». Vi skiller skarpt mellom
          to typer skorpe:
          <ul className="list-disc space-y-1 pl-6 pt-1 text-sm text-foreground/80">
            <li>
              <em>Kontinentalskorpe:</em> Tykk (vanligvis 30–50 km, men opptil 70–80 km under Himalaya),
              hovedsakelig granittisk med høyt innhold av silisium og aluminium (felsisk), og med relativt lav
              tetthet (om lag <strong>2,7 g/cm³</strong>). Den er for lett til noensinne å synke dypt ned i
              mantelen, og kan derfor bli milliarder av år gammel.
            </li>
            <li>
              <em>Havbunnsskorpe (oseanisk skorpe):</em> Tynn (bare 5–8 km), basaltisk og gabbroid med høyt innhold
              av jern og magnesium (mafisk), og med vesentlig høyere tetthet (om lag <strong>3,0 g/cm³</strong>).
              Den nydannes i midthavsryggene og resirkuleres kontinuerlig. Ingen steder i dagens verdenshav finnes
              det havbunn som er eldre enn ca. 180–200 millioner år.
            </li>
          </ul>
        </li>
        <li>
          <strong>Moho-diskontinuiteten:</strong> Den seismiske grenseflaten mellom skorpen og den underliggende
          mantelen, oppdaget av den kroatiske seismologen Andrija Mohorovičić i 1909. Her gjør seismiske bølger et
          karakteristisk hopp i hastighet (P-bølger øker fra ca. 6 til over 8 km/s) fordi bergartene under Moho er
          vesentlig tettere og rikere på olivin.
        </li>
        <li>
          <strong>Litosfæren (0–100/250 km):</strong> Selve fundamentet for platetektonikken. En tektonisk plate
          er <em>ikke</em> bare skorpe, men <strong>litosfære</strong>: jordskorpen pluss den aller øverste, kalde
          og fullstendig stive delen av mantelen (litosfærisk mantel). Litosfæren oppfører seg som et sprøtt og
          elastisk fast stoff som brekker opp i plater.
        </li>
        <li>
          <strong>Astenosfæren (ca. 100–350 km dyp):</strong> Det seige underlaget som litosfæreplatene glir oppå.
          Astenosfæren består av <strong>fast silikatbergart (peridotitt)</strong> – den er IKKE flytende! Men
          fordi temperaturen her er nær bergartens smeltepunkt (om lag 1300–1400 °C), mister krystallgitteret sin
          stivhet. Over geologiske tidsskalaer på millioner av år deformeres astenosfæren plastisk og duktilt med
          en enorm viskositet på om lag 10¹⁹–10²¹ Pa·s. Platene kan derfor gli over den nesten som en kjelke på
          hardpakket snø.
        </li>
      </ul>

      <OrdBoks
        ord="Litosfære"
        barn="Jordens stive ytterste skall (0–100 km under havbunn, opptil 250 km under kontinenter). Består av jordskorpen pluss den øverste, kalde og mekanisk stive delen av mantelen. Det er litosfæren som er oppdelt i plater."
      />
      <OrdBoks
        ord="Astenosfære"
        barn="Sone i øvre mantel (100–350 km) direkte under litosfæren. Består av fast bergart (peridotitt), men er så varm at den deformeres seigtflytende (plastisk) over geologisk tid. Tillater litosfæreplatene å bevege seg."
      />

      <EarthLayersDiagram />
      </section>

      {/* 2. VITENSKAPSHISTORIE OG BEVISENE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Oppdagelsen og bevisene: Fra Wegeners puslespill til den magnetiske «båndopptakeren»
        </h2>
      <p>
        I dag tar vi platetektonikken som en selvfølge, men fram til midten av 1960-tallet var ideen om bevegelige
        kontinenter regnet som ren villfarelse blant de fleste etablerte geologer (Hess, 1962; Wegener, 1912).
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Alfred Wegener og kontinentaldrift (1912)
      </h3>
      <p>
        Den tyske meteorologen og geofysikeren Alfred Wegener la i 1912 fram teorien om <em>kontinentaldrift</em>{" "}
        (Wegener, 1912). Han observerte at kontinentene på hver side av Atlanterhavet passet sammen som brikker i et
        puslespill – særlig kystlinjene til Sør-Amerika og Afrika. Wegener samlet overbevisende tverrfaglige bevis:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Fossilfunn over verdenshav:</strong> Fossiler av ferskvannsreptilet <em>Mesosaurus</em> og den
          bregnelignende planten <em>Glossopteris</em> ble funnet i identiske berglag i både Brasil og Sør-Afrika.
          Disse organismene kunne umulig ha krysset et tusenvis av kilometer bredt, salt verdenshav.
        </li>
        <li>
          <strong>Matchende fjellkjeder og bergarter:</strong> Fjellkjedene i Nord-Amerika (Appalakkene) stemte
          nøyaktig overens i alder, bergartstype og foldestruktur med Kaledonidene i Norge, Skottland og Grønland.
        </li>
        <li>
          <strong>Paleoklimatiske spor:</strong> Spor etter istidsbreer (skuringsstriper og moreneavsetninger) fra
          samme tidsperiode (perm-karbon) ble funnet i tropiske strøk i India, Australia, Sør-Amerika og Afrika.
        </li>
      </ul>
      <p>
        Wegener konkluderte med at alle landmassene en gang hadde vært samlet i ett gigantisk superkontinent:{" "}
        <strong>Pangea</strong> (gresk for «alt land»). Likevel ble teorien hans brutalt avvist av fagmiljøet.
        Hvorfor? Fordi Wegener manglet en troverdig <strong>fysisk drivmekanisme</strong>. Han foreslo at kontinentene
        pløyde gjennom havbunnen som isbrytere, drevet av tidevannskrefter og jordrotasjonens sentrifugalkraft –
        krefter fysikere raskt beviste var mange millioner ganger for svake.
      </p>

      <Callout title="Marie Tharp og kartleggingen av havbunnen (1950-tallet)">
        <p>
          Det store vendepunktet kom etter andre verdenskrig. Under den kalde krigen kartla den amerikanske
          geologen og oseanografen <strong>Marie Tharp</strong> sammen med Bruce Heezen havbunnen ved hjelp av
          millioner av ekkoloddprofiler. Tharp oppdaget en kontinuerlig, 65 000 km lang undersjøisk fjellkjede –{" "}
          <strong>Den midtatlantiske ryggen</strong> – og identifiserte en dyp innsynkningsdal (riftdal) midt
          langs ryggens akse. Dette var det fysiske beviset på at havbunnen holdt på å revne.
        </p>
      </Callout>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Harry Hess og havbunnsspredning (1962)
      </h3>
      <p>
        I 1962 koblet geologiprofessor og marineoffiser Harry Hess trådene sammen i en banebrytende artikkel:{" "}
        <em>«History of Ocean Basins»</em> (Hess, 1962). Hess foreslo at mantelen har langsomme konveksjonsstrømmer.
        Varm mantel stiger opp under midthavsryggene, der det kontinuerlig dannes ny havbunnsskorpe. Havbunnen
        beveger seg deretter som et gigantisk samlebånd vekk fra ryggen, før den til slutt avkjøles, blir tung og
        synker ned i dype havgroper (subduksjon). Kontinentene «pløyer» ikke gjennom havbunnen, men sitter fast i
        samme litosfæreplate og følger passivt med!
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Det ugjendrivelige beviset: Den magnetiske «båndopptakeren» (1963)
      </h3>
      <p>
        Året etter leverte Fred Vine og Drummond Matthews (1963) det endelige empiriske beviset med sin berømte
        hypotese (Vine & Matthews, 1963):
      </p>
      <p>
        Når basaltisk lava veller opp i midthavsryggen og størkner under <strong>Curie-temperaturen</strong> (ca. 580 °C
        for jernoksidet <em>magnetitt</em>), magnetiseres mineralene parallelt med jordens eksisterende magnetfelt.
        Jordens magnetfelt er ikke statisk; med ujevne mellomrom på noen hundre tusen til millioner av år bytter
        magnetpolene plass (geomagnetisk reversering).
      </p>
      <p>
        Når havbunnen sprer seg kontinuerlig til begge sider, fryser havbunnsskorpen inn et symmetrisk mønster av
        striper med normal magnetisering (feltet peker nordover som i dag) og reversert magnetisering (feltet pekte
        sørover). Da forskerne seilte over Atlanteren med magnetometre på slep, oppdaget de at det magnetiske mønsteret
        på østsiden av Den midtatlantiske ryggen var et nøyaktig speilbilde av mønsteret på vestsiden! Dette beviste
        at ny havbunn lages symmetrisk i aksen og skyves utover.
      </p>

      <SpreadingDiagram />

      <PhotoFigure
        src="/images/fig-spredring.jpg"
        alt="Sprekk i basalt og vulkansk rifting på Island der to plater glir fra hverandre"
        heading="Divergerende grense eksponert på tørt land: Þingvellir på Island"
        caption="Island er et av de få stedene på jorden der en midthavsrygg rager opp over havoverflaten. Her ved Þingvellir kan du fysisk gå i sprekken mellom Den eurasiske platen (til venstre) og Den nordamerikanske platen (til høyre). Sprekken vider seg ut med om lag 2–2,5 cm hvert eneste år."
        marks={[
          { x: 30, y: 48, n: "1", text: "Eurasiske plate", tone: "cold" },
          { x: 70, y: 45, n: "2", text: "Nordamerikanske plate", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Fast bergart på eurasisk side som beveger seg østover." },
          { n: "2", label: "Normalforkastningsvegg på nordamerikansk side som glir vestover." },
        ]}
      />
      </section>

      {/* 3. HVILKE KREFTER DRIVER PLATENE? */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Hva driver platene? Slab pull, ridge push og gravitasjonell fysikk
        </h2>
        <p>
          I mange eldre lærebøker forklares platebevegelsene som om mantelen fungerer som et transportbånd som drar
          platene med seg via friksjon (basal drag). Moderne geodynamiske beregninger og <em>seismisk tomografi</em>{" "}
          (3D-avbildning av mantelen ved hjelp av seismiske bølger) har snudd dette bildet på hodet
          (Forsyth & Uyeda, 1975): <strong>Platene driver i stor grad seg selv!</strong>
        </p>
      <p>
        Platebevegelsene styres av et samspill mellom fire gravitasjonelle og termiske mekanismer:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Slab pull (platetrekk) – Drivkraft nr. 1 (~90 % av kraften):</strong> Når oseanisk litosfære
          beveger seg bort fra midthavsryggen, avkjøles den gjennom millioner av år. Den underliggende astenosfæren
          fryser fast til bunnen av platen, slik at litosfæren vokser i tykkelse og tetthet. Til slutt blir platen{" "}
          <strong>tettere enn den underliggende astenosfæren</strong>. Når platen tvinges ned i en subduksjonssone,
          øker trykket dramatisk. Ved 40–60 km dyp gjennomgår basalten og gabbroen i skorpen en metamorf
          faseovergang og omdannes til <strong>eklogitt</strong> (en ultrahøytett bergart bestående av granat og
          omfasitt, tetthet ~3,5 g/cm³). Denne blytunge platen synker vertikalt ned i mantelen under sin egen vekt
          og fungerer som et gigantisk anker som trekker hele resten av platen bak seg (Forsyth & Uyeda, 1975).
        </li>
        <li>
          <strong>Ridge push (ryggstøt / gravitasjonsglidning):</strong> Midthavsryggen er varm og termisk utvidet,
          og rager derfor <strong>2000 til 3000 meter høyere</strong> enn den omkringliggende dyphavssletten.
          Litosfæren danner en kontinuerlig skråning bort fra ryggaksen. Gravitasjonskraften virker loddrett nedover,
          noe som skaper en horisontal kraftkomponent som skyver den nydannede litosfæren vekk fra ryggen.
        </li>
        <li>
          <strong>Basal drag (manteldrag):</strong> Den seige astenosfæren under platen er i termisk konveksjon.
          Friksjonen mellom astenosfæren og undersiden av litosfæreplaten kan enten hjelpe på bevegelsen eller
          bremse den, avhengig av om mantelen strømmer raskere eller saktere enn platen.
        </li>
        <li>
          <strong>Trench suction (gropsug):</strong> Når en tung slab synker bratt ned i mantelen, trekker den med
          seg omkringliggende astenosfære, noe som skaper et lokalt undertrykk som suger den overliggende platen mot
          dyphavsgropen.
        </li>
      </ol>

      <OrdBoks
        ord="Slab pull"
        barn="Den suverent viktigste drivkraften i platetektonikken. Kald, gammel havbunnsskorpe omdannes til ultrahøytett eklogitt i subduksjonssonen og synker som et lodd, og trekker resten av platen etter seg."
      />
      <OrdBoks
        ord="Ridge push"
        barn="Gravitasjonsglidning: Midthavsryggen rager 2–3 km over dyphavsbunnen på grunn av termisk oppdrift. Tyngdekraften får den faste litosfæren til å skli langsomt ned skråningen bort fra aksen."
      />

      <ConvectionDiagram />

      <p>
        I dag kan vi måle disse bevegelsene direkte ved hjelp av globale satellittnettverk (GPS og VLBI). Målingene
        viser at platene beveger seg kontinuerlig med en fart på mellom <strong>1 og 16 centimeter per år</strong>{" "}
        (NOAA, u.å.) – omtrent like fort som menneskets negler vokser. Plater som har store subduksjonssoner festet
        til seg (som Stillehavsplaten og Nazcaplaten) beveger seg desidert raskest (7–15 cm/år), noe som bekrefter
        at <em>slab pull</em> er den dominerende drivkraften!
      </p>

      <PlatesMapDiagram />
      </section>

      {/* 4. SMELTEFYSIKK OG MAGMADANNELSE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Hvorfor mantelberg smelter: Dekompresjon, flukssmelting og mantelplymer
        </h2>
      <p>
        En av de mest fundamentale leksjonene i Geofag 1 er å forstå <strong>hvorfor og hvordan magma dannes</strong>.
        Nesten all magma på jorden oppstår i den faste øvre mantelen ved delvis oppsmelting (partiell smelting) av
        bergarten <strong>peridotitt</strong>.
      </p>
      <p>
        Bergarter smelter ikke ved en enkelt temperatur, men over et temperaturintervall:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Solidus:</strong> Temperaturen der en bergart begynner å smelte (første dråpe smelte dannes).
        </li>
        <li>
          <strong>Liquidus:</strong> Temperaturen der bergarten er 100 % flytende smelte.
        </li>
      </ul>
      <p>
        Under normale forhold under et stabilt kontinent er mantelen <em>under</em> solidus: Den er glødende varm
        (1300–1400 °C), men det enorme litostatiske overtrykket presser atomene så tett sammen at smelte ikke kan
        oppstå. For å få mantelen til å krysse solidus finnes det bare <strong>tre fysiske mekanismer</strong>:
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="font-display text-sm font-bold text-amber-500">1. Dekompresjonssmelting</p>
          <p className="mt-1 text-xs font-semibold text-foreground">Trykkfall uten varmetilførsel</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Når litosfæren tynnes ved en midthavsrygg eller kontinental rift, stiger astenosfæren opp. Fordi stein
            leder varme ekstremt dårlig, skjer oppstigningen adiabatisk (uendret temperatur). Trykket faller bratt,
            solidustemperaturen synker under mantelens temperatur, og 10–20 % av peridotitten smelter til basalt.
          </p>
        </div>

        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
          <p className="font-display text-sm font-bold text-sky-500">2. Flukssmelting</p>
          <p className="mt-1 text-xs font-semibold text-foreground">Vann senker smeltepunktet</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            I en subduksjonssone presses hydratisert havbunn ned i dypet. Mineraler som serpentin og amfibol brytes
            ned og skiller ut overkritisk vann (H₂O). Vannet stiger inn i den overliggende mantelkilen, bryter
            silikatbindingene og senker solidustemperaturen med flere hundre grader. Mantelen smelter uten at
            temperaturen øker!
          </p>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
          <p className="font-display text-sm font-bold text-rose-500">3. Mantelplym (Hotspot)</p>
          <p className="mt-1 text-xs font-semibold text-foreground">Ekstraordinær varmetilførsel</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            En smal søyle av overopphetet bergart stiger fra kjerne-mantel-grensen (2900 km dyp). Her er temperaturen
            flere hundre grader høyere enn normal omgivende mantel, noe som løfter bergartens temperatur direkte
            over soliduskurven uavhengig av plategrenser (f.eks. Hawaii og Yellowstone).
          </p>
        </div>
      </div>

      <SolidusDiagram />
      <DecompressionMeltingDiagram />

      <Quiz
        questions={[
          {
            prompt: "Hvorfor oppstår det dekompresjonssmelting under en midthavsrygg?",
            options: [
              "Fordi havvannet renner ned i sprekken og koker mantelen.",
              "Fordi skorpetynning reduserer overtrykket; mantelen stiger adiabatisk og krysser solidus.",
              "Fordi friksjonen mellom platene genererer voldsom varme som smelter bergartene fullstendig.",
              "Fordi astenosfæren i utgangspunktet er et flytende magmaha som slipper fri.",
            ],
            answer: 1,
            explain:
              "Riktig! Når overliggende litosfære trekkes fra hverandre, synker det litostatiske trykket. Fordi mantelens oppstigning skjer uten vesentlig varmetap (adiabatisk), faller solidus raskere enn mantelens temperatur, og det oppstår delvis smelte.",
          },
          {
            prompt: "Hvilken smeltemekanisme er ansvarlig for vulkanene i Andesfjellene og Japan?",
            options: [
              "Dekompresjonssmelting på grunn av skorpefortykkelse.",
              "Friksjonsvarme langs forkastningsflaten.",
              "Flukssmelting: Vann avgitt fra den synkende havbunnen senker smeltepunktet i mantelkilen over.",
              "Radioaktiv oppvarming fra konsentrert uran i dyphavsgropen.",
            ],
            answer: 2,
            explain:
              "Riktig! Subduksjonsvulkaner drives av flukssmelting: Den synkende havbunnsplaten avgir vann og flyktige stoffer ved 80–150 km dyp, noe som senker peridotittens smeltepunkt i mantelkilen over.",
          },
        ]}
      />
      </section>

      {/* 5. DE TRE HOVEDTYPENE PLATEGRENSER */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Plategrensene: Tre relative bevegelser, seks geologiske miljøer
        </h2>
      <p>
        Jordens mest dramatiske geologiske hendelser er konsentrert langs grensene mellom litosfæreplatene.
        Hva som skjer ved en gitt grense, avhenger av to faktorer: <strong>bevegelsesretningen</strong> (fra
        hverandre, mot hverandre eller sidelengs) og <strong>skorpetypen</strong> som møtes (oseanisk eller
        kontinental).
      </p>

      <BoundaryOverviewDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight text-amber-500">
        1. Divergerende grenser (Platene glir fra hverandre)
      </h3>
      <p>
        Under divergens utsettes litosfæren for tektonisk strekk (tensjon). Dette manifesterer seg i to distinkte
        stadier:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Havbunnsspredning:</strong> Grensen ligger midt i havet (Den midtatlantiske ryggen, Gakkelryggen
          i Polhavet, Øst-Stillehavsryggen). Magma fra dekompresjonssmelting fyller sprekken kontinuerlig og danner
          putelava og basaltganger. Varmt sjøvann sirkulerer ned i sprekkesystemene, varmes opp til over 350 °C,
          løser opp metaller fra basalten og spruter ut som svarte undersjøiske geysirer kalt{" "}
          <strong>hydrotermale skorsteiner («black smokers»)</strong>. Rundt disse skorsteinene lever unike økosystemer
          uavhengig av sollys, basert på kjemotrofiske bakterier som utnytter hydrogensulfid.
        </li>
        <li>
          <strong>Kontinental rifting:</strong> Grensen oppstår midt inne på et kontinent. Skorpen strekkes og tynnes,
          og store blokker raser ned langs normalforkastninger og danner en langstrakt innsynkningsdal kalt en{" "}
          <strong>graben</strong> (som Den østafrikanske riftdalen med Tanganyikasjøen og Victoriasjøen). Hvis
          riftingen fortsetter over millioner av år, vil riftdalen utvide seg til et smalt havbasseng (som Rødehavet),
          før det oppstår en fullverdig midthavsrygg. Dette var nøyaktig hvordan Atlanterhavet ble født da superkontinentet
          Pangea revnet for ca. 180 millioner år siden!
        </li>
      </ul>

      <ContinentalRiftDiagram />

      <PhotoFigure
        src="/images/geo-midthavsrygg-hydrotermal.jpg"
        alt="3D-snitt av midthavsrygg med dekompresjonssmelting, aksialt magmakammer, putelava og hydrotermale skorsteiner"
        heading="Midthavsryggens anatomi: Dekompresjonssmelting og hydrotermale skorsteiner"
        caption="Når to litosfæreplater trekkes fra hverandre i spredningsaksen, stiger astenosfærisk peridotitt opp uten å tape nevneverdig varme (adiabatisk). Trykkfallet utløser dekompresjonssmelting (10–20 % delvis smelte) som produserer basaltisk magma. På havbunnen størkner lavaen som putelava (pillow basalt), mens nedsivende sjøvann varmes opp til over 350 °C av underliggende gabbro-kamre og spyles ut som metallrike hydrotermale skorsteiner («black smokers»)."
        marks={[
          { x: 50, y: 15, n: "1", text: "Black smoker", tone: "warm" },
          { x: 32, y: 48, n: "2", text: "Putelava", tone: "cold" },
          { x: 50, y: 62, n: "3", text: "Magmakammer", tone: "warm" },
          { x: 50, y: 88, n: "4", text: "Dekompresjon", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Hydrotermale skorsteiner («black smokers») spyr ut overopphetet, mineralrikt fluid som utfeller kobber-, jern- og sinksulfider." },
          { n: "2", label: "Basaltisk putelava dannes når flytende basalt bråkjøles mot bunnvannet (2 °C) og danner glassaktige, avrundede puter." },
          { n: "3", label: "Aksialt gabbroid magmakammer på 2–4 km dyp der krystallisasjon og differensiasjon forer gangene ovenfor." },
          { n: "4", label: "Adiabatisk oppstigende astenosfære der det litostatiske trykket faller under solidus og skaper primær basaltmagma." },
        ]}
      />

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-sky-500">
        2. Konvergerende grenser (Platene kolliderer)
      </h3>
      <p>
        Ved konvergens presses to litosfæreplater mot hverandre under enorm kompresjon. Her oppstår tre helt ulike
        miljøer:
      </p>
      <ul className="list-disc space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Hav mot kontinent (Subduksjon som i Andesfjellene):</strong> Den tunge, oseaniske platen
          (f.eks. Nazcaplaten) bøyes ned under den lettere kontinentalplaten (Sør-Amerika). Foran kollisjonen dannes
          en dyp havrenne (Peru-Chile-gropen, over 8000 meter dyp) og en akkresjonskile av avskrapede havsedimenter.
          Flukssmelting i mantelkilen skaper seig, gassrik magma (andesitt og dasitt) som stiger og bygger opp
          majestetiske, men eksplosive stratovulkaner langs en kontinental vulkanbue (Andesfjellene, Kaskadefjellene).
        </li>
        <li>
          <strong>Hav mot hav (Vulkanøybuer som Marianene og Japan):</strong> Når to oseaniske plater møtes, er det
          alltid den <em>eldste, kaldeste og dermed tetteste</em> havbunnsplaten som tvinges under den andre. Dette
          skaper jordens aller dypeste groper – som <strong>Marianegropen</strong> med Challengerdypet på{" "}
          <strong>11 034 meter</strong>. Magmaen fra mantelkilen bygger opp en buet kjede av vulkanske øyer ute i
          havet: en <strong>vulkanøybue</strong> (f.eks. De japanske øyer, Marianene, Aleutene).
        </li>
        <li>
          <strong>Kontinent mot kontinent (Kollisjon som i Himalaya og Kaledonidene):</strong> Når to kontinenter
          støter sammen, kan ingen av dem synke ned i mantelen fordi granittisk kontinentalskorpe er for lett.
          I stedet oppstår voldsom skorpeforkorting. Jordskorpen foldes, presses sammen og stables opp i mektige{" "}
          <strong>skyvedekker (nappes)</strong> – store bergflak som skyves hundrevis av kilometer innover land.
          Under fjellkjeden dannes en opptil 70–80 km dyp skorperot som flyter isostatisk i mantelen. Det oppstår
          nesten ingen vulkanisme, men intens regional metamorfose omdanner bergartene til gneis og glimmerskifer.
        </li>
      </ul>

      <SubductionDiagram />
      <OceanOceanSubductionDiagram />
      <CollisionDiagram />

      <PhotoFigure
        src="/images/geo-subduksjon-3d.jpg"
        alt="3D-snitt av subduksjonssone med dyphavsgrop, akkresjonskile, dehydrering, flukssmelting og vulkanbue"
        heading="Anatomi av en subduksjonssone: Dehydrering, flukssmelting og akkresjonskile"
        caption="Når en oseanisk litosfæreplate presses ned i mantelen, varmes den opp og presses sammen. Mineraler som har tatt opp sjøvann på havbunnen (særlig serpentinitt og leirmineraler) dehydreres ved 80–150 km dyp og slipper overopphetet vann inn i overliggende mantelkile. Dette senker peridotittens smeltepunkt dramatisk (flukssmelting). Den oppstigende magmaen mater en eksplosiv vulkanbue, mens avskrapede sedimenter danner en mektig akkresjonskile foran dyphavsgropen."
        marks={[
          { x: 18, y: 55, n: "1", text: "Dyphavsgrop", tone: "cold" },
          { x: 26, y: 48, n: "2", text: "Akkresjonskile", tone: "warm" },
          { x: 42, y: 78, n: "3", text: "Dehydrering", tone: "cold" },
          { x: 54, y: 64, n: "4", text: "Flukssmelting", tone: "warm" },
          { x: 68, y: 32, n: "5", text: "Vulkanbue", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Dyphavsgrop (trench) der den bøyelige litosfæreplaten dykker ned i mantelen (opptil 11 km dyp)." },
          { n: "2", label: "Akkresjonskile: Havbunnssedimenter skrapes av som foran et snøskjær og stables i imbrikerte skyveforkastninger." },
          { n: "3", label: "Dehydrering: Trykket omdanner serpentinitt og leire til vannfrie mineraler og slipper fri superkritiske vannrike fluider." },
          { n: "4", label: "Flukssmelting: Vannet senker peridotittens smeltepunkt (solidus) med flere hundre grader i mantelkilen." },
          { n: "5", label: "Vulkanbue: Viskøs, andesittisk og gassrik magma stiger opp og bygger opp eksplosive stratovulkaner." },
        ]}
      />

      <h4 className="pt-4 font-display text-lg font-medium tracking-tight">
        Subduksjonens sonering: Akkresjonskile, forbue- og bakbuebasseng
      </h4>
      <p>
        Et fullstendig tverrsnitt av en konvergerende plategrense består av fem distinkte morfologiske og geologiske
        elementer ordnet fra havet og innover:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Dyphavsgropen (trench):</strong> Det dypeste punktet der litosfæren bøyes ned i subduksjonen.
        </li>
        <li>
          <strong>2. Akkresjonskilen (accretionary wedge):</strong> Mens den faste basaltiske havbunnsskorpen
          subdueres, blir de løse overliggende marine sedimentene (leire, sand, kiselalger) skrapt av av den overkjørende
          platen. Sedimentene presses sammen og stables opp i lagdelte, imbrikerte forkastningsflak som kan bygge opp
          flere kilometer høye rygger foran kysten.
        </li>
        <li>
          <strong>3. Forbuebassenget (forearc basin):</strong> Det relativt flate og rolige sedimentasjonsbassenget
          som ligger mellom akkresjonskilen og den vulkanske buen.
        </li>
        <li>
          <strong>4. Vulkansk bue (magmatic arc):</strong> Rekken av aktive vulkaner (enten på kontinentet eller som
          en øybue) som mates av flukssmelting i 100–120 km dyp direkte under buen.
        </li>
        <li>
          <strong>5. Bakbuebassenget (backarc basin):</strong> Dersom den synkende litosfæreplaten er gammel og tung,
          vil den synke brattere enn platen beveger seg fremover. Dette fenomenet kalles <em>«slab rollback»</em>
          (platen ruller bakover). Det suger den overliggende platen etter seg og skaper tektonisk strekk (tensjon) bak
          vulkanbuen! Strekket kan sprekke opp jordskorpen og åpne et lite, lokalt havbasseng med egen miniatyr-midthavsrygg –
          slik <strong>Japanhavet</strong> ble åpnet bak Den japanske vulkanbuen for ca. 15–20 millioner år siden.
        </li>
      </ul>

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-emerald-500">
        3. Transformgrenser (Platene glir sidelengs)
      </h3>
      <p>
        Langs en transformgrense glir to litosfæreplater horisontalt forbi hverandre. Dette kalles en{" "}
        <strong>konservativ grense</strong> fordi litosfære verken nydannes eller ødelegges.
      </p>
      <p>
        Fordi det verken skjer mantelløft (dekompresjon) eller tilførsel av vann (fluks), er transformgrenser
        praktisk talt <strong>helt uten vulkanisme</strong>. Til gjengjeld er de arnested for noen av klodens
        mest ødeleggende jordskjelv:
      </p>
      <p>
        Bergartene på hver side presses hardt mot hverandre av tektoniske spenninger. Friksjonen låser forkastningen i
        en «mekanisk lås». Mens platene fortsetter å bevege seg med 3–5 cm i året noen kilometer unna, deformeres
        bergartene elastisk over årtier og århundrer – som en stålfjær som spennes strammere og strammere. Til slutt
        overstiger den opphopede spenningen bergartens bruddstyrke: Forkastningen brister plutselig på sekunder, og
        bergartene forskyves flere meter i et massivt jordskjelv.
      </p>
      <p>
        Typeeksempelet på land er <strong>San Andreas-forkastningen</strong> i California, der Stillehavsplaten glir
        nordvestover i forhold til Den nordamerikanske platen. På havbunnen kutter utallige transformforkastninger
        midthavsryggene i et karakteristisk sikksakkmønster. I Norskehavet finner vi den seismisk aktive{" "}
        <strong>Jan Mayen-bruddsonen</strong>.
      </p>

      <TransformDiagram />

      <h4 className="pt-4 font-display text-lg font-medium tracking-tight">
        Geometrisk finesse: Transformforkastning vs. inaktiv bruddsone (fracture zone)
      </h4>
      <p>
        I 1965 løste J. Tuzo Wilson et stort geologisk paradoks: Hvorfor er midthavsryggene kuttet opp i hundrevis av
        forskyvede segmenter, og hvorfor stopper jordskjelvene brått opp utenfor ryggaksen?
      </p>
      <p>
        En midthavsrygg er aldri en rett, uavbrutt linje. Den er delt opp i forskjøvede segmenter bundet sammen av
        horisontale forkastningssoner. Men her gjelder en fundamental regel som skiller platetektonikk fra vanlige
        forkastninger på land:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Aktiv transformforkastning (mellom ryggsegmentene):</strong> Bare i strekningen <em>mellom</em> de to
          spredningsryggene beveger platene seg i motsatt retning. Her oppstår intens friksjon, forkastningslås og hyppige,
          grunne jordskjelv. Legg også merke til at hvis det høyre ryggsegmentet ligger lenger nord enn det venstre,
          er platebevegelsen langs forkastningen <em>venstregående (sinistral)</em> – stikk i strid med hva man ville trodd
          hvis forkastningen hadde kuttet og forskjøvet en opprinnelig sammenhengende rygg!
        </li>
        <li>
          <strong>Inaktiv bruddsone (fracture zone, utenfor ryggaksen):</strong> Utenfor spredningsaksene strekker
          forkastningssprekken seg tusenvis av kilometer videre over havbunnen som et dypt arr i batymetrien. Men her
          beveger havbunnen på <em>begge sider</em> av sprekken seg i <strong>nøyaktig samme retning med nøyaktig samme hastighet</strong>!
          Det er null relativ platebevegelse, ingen friksjon og følgelig <strong>ingen jordskjelv</strong>. Bruddsonene
          er aseismiske «arr» som bevarer historien om tidligere tiders transformbevegelser.
        </li>
      </ul>

      <Quiz
        questions={[
          {
            prompt:
              "Hva er den fundamentale mekaniske forskjellen mellom en aktiv transformforkastning og en inaktiv bruddsone (fracture zone) i et havbasseng?",
            options: [
              "Det er ingen forskjell; begrepene brukes synonymt i geofaget.",
              "En aktiv transformforkastning forbinder to spredningsryggsegmenter der platene beveger seg i motsatte retninger (kraftig seismisitet), mens bruddsonen utenfor har skorpe som beveger seg i samme retning (aseismisk arr).",
              "Bruddsoner oppstår bare i subduksjonssoner, mens transformforkastninger bare finnes på land.",
              "Transformforkastninger har alltid dype jordskjelv dypere enn 300 km.",
            ],
            answer: 1,
            explain:
              "Riktig! J. Tuzo Wilson viste i 1965 at transformbevegelse kun foregår mellom de to forskjøvede ryggaksene der platene gnisser mot hverandre. Utenfor ryggene beveger havbunnen på begge sider seg i samme retning med samme fart – dermed oppstår det ingen jordskjelv langs bruddsonen.",
          },
          {
            prompt:
              "Hva kjennetegner soneringen foran en subduksjonssone (fra havet og inn mot kontinentet)?",
            options: [
              "Dyphavsgrop → Akkresjonskile → Forbuebasseng → Vulkanbue (og eventuelt bakbuebasseng).",
              "Midthavsrygg → Normalforkastning → Graben → Skjoldvulkan.",
              "Kaldera → Sinderkjegle → Stratovulkan → Dyphavsslette.",
              "Aseismisk bruddsone → Transformforkastning → Kontinentalrift.",
            ],
            answer: 0,
            explain:
              "Riktig! Denne karakteristiske soneringen skyldes subduksjonens geometri: Platen bøyes ned i dyphavsgropen, sedimenter skrapes av i akkresjonskilen, forbuebassenget dannes foran vulkanbuen som mates av flukssmelting, og slab rollback kan åpne et bakbuebasseng bakerst.",
          },
        ]}
      />
      </section>

      {/* 6. SEISMISITET OG WADATI-BENIOFF SONEN */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Seismisitet og Wadati-Benioff-sonen: Jordskjelvenes geologiske røntgenbilde
        </h2>
      <p>
        Jordskjelv er ikke jevnt fordelt over jorden – de avslører plategrensenes eksakte anatomi. Ved å kartlegge
        jordskjelvenes <strong>fokus (hyposenterdybde)</strong> oppdaget de to seismologene Kiyoo Wadati og Hugo
        Benioff et slående mønster:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Midthavsrygger og transformgrenser:</strong> Har <em>utelukkende grunne jordskjelv</em> (&lt; 15–20 km
          dyp). Litosfæren ved midthavsryggen er så varm og tynn at dypere bergarter oppfører seg plastisk i stedet for
          å brekke sprøtt.
        </li>
        <li>
          <strong>Subduksjonssoner (Wadati-Benioff-sonen):</strong> Viser et skrått plan av jordskjelv som strekker
          seg fra dyphavsgropen og helt ned til <strong>700 kilometers dyp</strong> inn under kontinentet! Dette planet
          sporer nøyaktig den kalde, sprø havbunnsplaten mens den synker ned i den varme astenosfæren.
        </li>
      </ul>
      <p>
        Hvorfor stopper jordskjelvene brått ved 700 km dyp?
      </p>
      <p>
        Under 700 kilometers dyp – ved overgangen til den nedre mantelen – er både omgivelsestrykket og temperaturen
        så høye at silikatkrystallene deformeres plastisk ved dislokasjonskryp. Bergartene kan rett og slett ikke
        lagre elastisk spenning eller sprekke sprøtt lenger; de flyter som varm plastelina. Derfor forekommer det
        aldri jordskjelv dypere enn 700 km på jorden.
      </p>
      </section>

      {/* 7. OFIOLITT-KOMPLEKSET OG LEKA */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Ofiolittkomplekset: Havbunnens anatomi og Leka i Trøndelag
        </h2>
      <p>
        Husk tilbake til tverrsnittet og analysen av midthavsryggen tidligere i kapittelet: Der så vi putelava på toppen,
        en sverm av sprekker med loddrette basaltganger, og et magmakammer med gabbro som hvilte på mantelen.
        Hvordan kan vi vite alt dette med sikkerhet når havbunnen befinner seg under flere tusen meter med stummende mørkt vann?
      </p>
      <p>
        Svaret ligger i <strong>ofiolitter</strong>: sjeldne geologiske hendelser der biter av havbunnsskorpe
        og øvre mantel ikke har blitt subdusert og ødelagt, men derimot skjøvet opp på tørt land under en fjellkjedekollisjon
        (et fenomen kalt <strong>obduksjon</strong>, Furnes et al., 1988). En ofiolitt er med andre ord et komplett,
        fossilt stykke havbunn som er hevet på land og veltet over ende, slik at geologer i dag kan spasere tvers gjennom
        hele lagdelingen — fra dyphavssedimenter ned til selve mantelen — til fots!
      </p>
      <p>
        Ved den berømte Penrose-konferansen i 1972 definerte geologene den klassiske <strong>ofiolitt-stratigrafien</strong>,
        som representerer et komplett vertikalt tverrsnitt gjennom oseanisk litosfære:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Pelagiske sedimenter (øverst):</strong> Tynne lag av dyphavsleire, kalkslam og kiselholdig radiolaritt
          (dannet av mikroskopiske kiselalger).
        </li>
        <li>
          <strong>Putelava (pillow basalt):</strong> 0,5–1,5 km tykt lag med glassaktige lavaputer som vitner om
          vulkanske utbrudd direkte under vann.
        </li>
        <li>
          <strong>Plateformede basaltganger (sheeted dykes):</strong> Et unikt 1–2 km tykt kompleks av loddrette,
          parallelle basaltganger («gang-i-gang») som viser hvordan midthavsryggen kontinuerlig sprekker opp og fylles med ny magma.
        </li>
        <li>
          <strong>Gabbro (isotrop og lagdelt):</strong> 2–4 km tykt lag av grovkornet dypbergart dannet i det aksiale
          magmakammeret under midthavsryggen. Nederst danner tunge krystaller rytmiske lag (lagdelt gabbro).
        </li>
        <li>
          <strong>Petrologisk Moho:</strong> Selve grenseflaten mellom skorpen (gabbro) og den underliggende mantelen (peridotitt).
        </li>
        <li>
          <strong>Mantel-litosfære (nederst):</strong> Rester av øvre mantel bestående av <strong>peridotitt</strong> (dunitt
          og harzburgitt) som er utsmeltet for basaltkomponenter. Ved kontakt med sjøvann omdannes peridotitt til den vakre,
          grønne eller gyllenbrune bergarten <strong>serpentinitt</strong>.
        </li>
      </ol>

      <PhotoFigure
        src="/images/geo-ofiolitt-leka.jpg"
        alt="Leka ofiolittkompleks med karakteristisk gulbrun dunitt og peridotitt fra jordens mantel"
        heading="Norges geologiske nasjonalmonument: Leka ofiolittkompleks"
        caption="På øya Leka i Trøndelag ligger et av verdens best bevarte ofiolittkomplekser (Furnes et al., 1988; NGU). Da Iapetushavet lukket seg for 420 millioner år siden under Den kaledonske fjellkjedefoldingen, ble et helt stykke havbunn vippet 90 grader på høykant og skjøvet opp på land. Her på Leka kan man gå tørrskodd fra jordens mantel (karakteristisk gulbrun dunitt og harzburgitt), krysse Moho-grensen til fots, og fortsette opp gjennom lagdelt gabbro, basaltganger og putelava!"
        marks={[
          { x: 22, y: 72, n: "1", text: "Mantelperidotitt", tone: "warm" },
          { x: 42, y: 55, n: "2", text: "Moho-grensen", tone: "cold" },
          { x: 62, y: 42, n: "3", text: "Lagdelt gabbro", tone: "warm" },
          { x: 80, y: 24, n: "4", text: "Putelava", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Gulbrun forvitret dunitt og harzburgitt: Dette er selve jordens øvre mantel eksponert i dagslys!" },
          { n: "2", label: "Petrologisk Moho: Overgangen mellom ultramafisk mantel og mafisk gabbroid jordskorpe." },
          { n: "3", label: "Lagdelt gabbro: Krystallisasjonsprodukter fra havbunnens aksiale magmakammer for 497 millioner år siden." },
          { n: "4", label: "Plateformede ganger og putelava som en gang utgjorde havbunnen i Iapetushavet." },
        ]}
      />

      {/* 7. INTERAKTIV MODELL */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Interaktiv geodynamisk modell: Utforsk plategrensene
      </h2>
      <p>
        Bruk simulatoren under til å eksperimentere med de ulike plategrensene. Juster platehastigheten, slå av og på
        jordskjelvfokus (legg merke til hvordan Wadati-Benioff-sonen tegnes opp i subduksjonsmodus), og studer hvordan
        dekompresjonssmelting skiller seg fra flukssmelting:
      </p>

      <PlateTectonicsModel />
      </section>

      {/* 8. HOTSPOTS OG WILSONSYKLUSEN */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Hotspots og Wilsonsyklusen: Superkontinentenes evige kretsløp
        </h2>
      <p>
        Ikke all vulkansk aktivitet kan forklares av plategrenser. Noen av planetens mest imponerende vulkaner –
        som Hawaii og Yellowstone – oppstår midt inne på litosfæreplater.
      </p>
      <p>
        I 1963 foreslo den kanadiske geofysikeren J. Tuzo Wilson at disse vulkanene skyldes stasjonære{" "}
        <strong>«hotspots»</strong> (varmeflekker) dypt i mantelen. Senere viste Jason Morgan at hotspots er
        overflateuttrykket for <strong>mantelplymer</strong>: smale søyler av overopphetet bergart som stiger helt fra{" "}
        <strong>D&apos;&apos;-laget (kjerne-mantel-grensen på 2900 km dyp)</strong>.
      </p>
      <p>
        Fordi mantelplymen er forankret så dypt, står den praktisk talt stille over geologisk tid. Mens litosfæreplaten
        glir sakte forbi over plymen, brenner den en perlerad av vulkanske øyer inn i havbunnen:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Hawaii-Emperor-ryggen:</strong> Den aktive vulkanen (Kilauea og Mauna Loa) ligger rett over
          hotspoten i dag (0 Ma). Jo lenger nordvestover langs øykjeden du reiser, desto eldre og mer eroderte er øyene:
          Maui (1 Ma), Oahu (3 Ma), Kauai (5 Ma) og Midway (28 Ma).
        </li>
        <li>
          <strong>Den berømte 47 Ma-bøyen:</strong> For ca. 47 millioner år siden gjør vulkankjeden en skarp 60-graders
          knekk fra nord-nordvest til vest-nordvest. Dette er et direkte geologisk bevis på at Stillehavsplaten brått
          endret bevegelsesretning!
        </li>
        <li>
          <strong>Island – en unik kombinasjon:</strong> Island er spesiell fordi en kraftig mantelplym ligger nøyaktig
          under Den midtatlantiske ryggen. Kombinasjonen av dekompresjonssmelting fra ryggspredningen og ekstraordinær
          termisk oppvarming fra plymen har produsert så enorme mengder basalt at skorpen her er over 35–40 km tykk,
          og rager høyt over havoverflaten.
        </li>
      </ul>

      <HotspotPlumeDiagram />

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight">
        Wilsonsyklusen: Havbassengenes liv og død
      </h3>
      <p>
        I 1966 stilte Tuzo Wilson et fundamentalt spørsmål i en berømt Nature-artikkel:{" "}
        <em>«Did the Atlantic close and then re-open?»</em> (Wilson, 1966). Svaret var et rungende ja.
      </p>
      <p>
        Jordens overflate gjennomgår en syklisk prosess over 400 til 600 millioner år, kalt{" "}
        <strong>Wilsonsyklusen</strong>. Et superkontinent samler all kontinental skorpe på én flate. Fordi kontinental
        skorpe fungerer som et varmeisolerende teppe over mantelen, samles det opp overskuddsvarme under superkontinentet.
        Mantelen begynner å bule opp, kontinentet sprekker i en riftdal, og et nytt havbasseng åpner seg. Etter hvert
        avkjøles havbunnen, blir tung, begynner å subduere, og havet lukkes igjen inntil kontinentene kolliderer i et
        nytt superkontinent.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 pt-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-emerald-500 text-sm">Atlanterhavet: Modent vekststadium</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Atlanterhavet utvider seg kontinuerlig med 2–2,5 cm i året fra Den midtatlantiske ryggen.
            Havbassenget er omkranset av <strong>passive kontinentalmarginer</strong> (uten subduksjon eller dype groper).
            Havet vokser fremdeles.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-rose-400 text-sm">Stillehavet: Avtagende stadium</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Stillehavet er omkranset av subduksjonssoner («Ildringen»). Her slukes gammel, tung havbunn ned i
            mantelen raskere enn spredningsryggene klarer å produsere ny havbunnsskorpe. Stillehavsbassenget krymper.
          </p>
        </div>
      </div>

      <WilsonCycleDiagram />

      <PhotoFigure
        src="/images/geo-wilsonsyklus-3d.jpg"
        alt="Wilsonsyklusens 6 stadier fra kontinental oppsprekking til havlukking og fjellkjededannelse"
        heading="Wilsonsyklusens 6 stadier: Superkontinentenes kretsløp i 3D"
        caption="J. Tuzo Wilsons modell beskriver hvordan havbassenger fødes, utvides, lukkes og forsvinner i en syklus på 400–600 millioner år (Wilson, 1966). 1: Embryonisk stadium (kontinental riftdal, f.eks. Øst-Afrika). 2: Ungt stadium (smalt havbasseng med begynnende midthavsrygg, Rødehavet). 3: Modent stadium (vidt hav med passive marginer, Atlanterhavet). 4: Avtagende stadium (subduksjonssoner spiser opp havbunnen, Stillehavet). 5: Sluttstadium/terminalt (smalt, lukket hav med kollisjonsfronter, Middelhavet). 6: Suturstadium (kontinentkollisjon og høyfjellskjede, f.eks. Himalaya og oldtidens Kaledonider)."
        marks={[
          { x: 18, y: 22, n: "1", text: "1: Rifting", tone: "warm" },
          { x: 48, y: 22, n: "2", text: "2–3: Havspredning", tone: "cold" },
          { x: 80, y: 22, n: "3", text: "4: Subduksjon", tone: "cold" },
          { x: 50, y: 75, n: "4", text: "5–6: Kollisjon & Sutur", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Embryonisk & ungt stadium: Kontinental skorpe tynnes og sprekker opp (riftdal -> Rødehavet)." },
          { n: "2", label: "Modent stadium: Havbunnsspredning over titalls millioner år skaper brede verdenshav (Atlanterhavet)." },
          { n: "3", label: "Avtagende stadium: Kald og tung litosfære begynner å subduere langs havets render (Ildringen i Stillehavet)." },
          { n: "4", label: "Suturstadium: Havbunnen forsvinner fullstendig; kontinentene støter sammen i orogenese (fjellkjededannelse)." },
        ]}
      />

      <Quiz
        questions={[
          {
            prompt:
              "Hva er en ofiolitt (som på Leka), og hvorfor er den av så enorm vitenskapelig verdi?",
            options: [
              "En ofiolitt er et komplett fossil av et forhistorisk havdyr fra silurtiden.",
              "En ofiolitt er et komplett stykke havbunnsskorpe og øvre mantel som er skjøvet opp på land (obdusert), slik at hele lagdelingen ned til Moho kan studeres til fots.",
              "En ofiolitt er et meteorittkrater fylt med basaltisk lava.",
              "En ofiolitt er et magmakammer under en aktiv vulkan.",
            ],
            answer: 1,
            explain:
              "Riktig! Ofiolitter (som Leka i Trøndelag) oppstår når havbunnsskorpe under spesielle tektoniske kollisjoner unntaksvis skyves opp på land i stedet for å subduere. Det gir geologer et unikt vindu til havbunnens og mantelens dype lagdeling.",
          },
          {
            prompt:
              "Hva er den fundamentale forskjellen mellom et modent havstadium (Atlanterhavet) og et avtagende havstadium (Stillehavet) i Wilsonsyklusen?",
            options: [
              "Atlanterhavet har ferskvann, mens Stillehavet er salt.",
              "Atlanterhavet utvider seg og har passive kontinentalmarginer uten subduksjonssoner, mens Stillehavet krymper fordi subduksjonssoner langs randen (Ildringen) sluker havbunn raskere enn den produseres.",
              "Stillehavet har ingen midthavsrygger, mens Atlanterhavet har mange.",
              "Wilsonsyklusen gjelder kun for Middelhavet, ikke for store verdenshav.",
            ],
            answer: 1,
            explain:
              "Riktig! I Wilsonsyklusen er Atlanterhavet et voksende hav med passive kontinentalmarginer, mens Stillehavet er et krympende hav dominert av subduksjonssoner som trekker havbunnsskorpen ned i mantelen.",
          },
        ]}
      />
      </section>

      {/* 9. NORGES PLATETEKTONISKE REISE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norge i et platetektonisk lys: Kaledonidene, Oslofeltet og isostasi
        </h2>
      <p>
        Norge ligger i dag midt inne på <strong>Den eurasiske kontinentalplaten</strong>, tusenvis av kilometer fra
        aktive subduksjonssoner og plategrenser. Grensen i vest er Den midtatlantiske ryggen ute i Norskehavet.
        Likevel er hele det norske landskapet formet av fortidens dramatiske platetektoniske hendelser (Ramberg et al.,
        2008):
      </p>

      <NorwayTectonicsHistoryDiagram />

      <div className="my-6 space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-primary">
            1. Den kaledonske fjellkjedefoldingen (430–400 millioner år siden)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            I silur og devon lukket det opprinnelige Atlanterhavet – <strong>Iapetushavet</strong> – seg i henhold til
            Wilsonsyklusen. Vårt urgamle kontinent <strong>Baltika</strong> kolliderte frontalt med Nord-Amerika og
            Grønland (<strong>Laurentia</strong>). Kollisjonen skapte en Himalaya-lignende fjellkjede med tinder på over
            9000 meter. Enorme flak av havbunn og kontinentalrand ble høvlet av og skjøvet hundrevis av kilometer inn
            over Norge som <strong>skyvedekker (nappes)</strong>. De karakteristiske toppene i Jotunheimen (som
            Galdhøpiggen og Glittertind), Rondane og Trollheimen er eroderte rester av disse kaledonske skyvedekkene!
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-amber-500">
            2. Oslofeltets dramatiske riftdal i perm (300–250 millioner år siden)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            I karbon og perm holdt superkontinentet Pangea på å sprekke opp. En gren av denne oppsprekkingen skar rett inn
            gjennom Østlandet fra Langesund til Mjøsa. Jordskorpen sank inn som en dyp graben (Oslo-graben), ledsaget av
            voldsom vulkanisme. Det oppsto enorme sprekkevulkaner som spydde ut den verdenskjente lavaen{" "}
            <strong>rombeporfyr</strong> (som kun finnes i Oslofeltet, på Mount Erebus i Antarktis og i Øst-Afrika!). I
            dypet størknet gigantiske magmakamre og ble til prydsteinen <strong>larvikitt</strong> (Norges nasjonalbergart).
            Riften stoppet opp og ble en «fossil rift», men forkastningslinjene preger fortsatt Oslofjordens geografi.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-sky-500">
            3. Åpningen av Norskehavet og Jan Mayen (55 millioner år siden til i dag)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            I tidlig tertiær (eocen) sprakk litosfæren mellom Norge og Grønland fullstendig opp. Nord-Atlanteren åpnet
            seg, og Norge fikk en <strong>passiv kontinentalmargin</strong>. Elver og isbreer fra fastlandet eroderte
            fjellene og avsatte kilometertykke lag med sand og leire på kontinentalsokkelen – bergartslag som i dag er
            kilde- og reservoarbergarter for Norges olje- og gassrikdom. Lenger ute i havet, på spredningsryggen, ligger
            vulkanøya <strong>Jan Mayen</strong> med Beerenberg (2277 moh.) – Norges eneste aktive vulkan over havnivå
            (Norsk Polarinstitutt, u.å.).
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-emerald-500">
            4. Glasial isostasi: Landet som reiser seg etter isen
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            Under siste istid hvilte en opptil 3 kilometer tykk iskappe over Skandinavia. Den kolossale vekten trykket
            den faste litosfæren ned i astenosfæren med opptil 800 meter! Da isen smeltet bort for ca. 10 000 år siden,
            begynte litosfæren å sprette opp igjen i henhold til <strong>isostasi</strong> (Archimedes&apos; lov for
            jordskorpen). Havet flommet først inn over det nedtrykte landet og avsatte saltvannsleire. Da landet hevet
            seg opptil 220 meter (<strong>marin grense</strong>, NGU, u.å.-b), ble denne marine leiren tørt land – og ga
            opphav til Norges fruktbare jordbruksbygder på Romerike, i Trøndelag og i Vestfold, men også faren for{" "}
            <Link to="/geofag-1/skred" className={lenke}>
              kvikkleireskred
            </Link>
            . Oslo hever seg fortsatt med ca. 4 mm per år, og spenningene etter landhevingen utløser jevnlig{" "}
            <strong>intraplate-jordskjelv</strong> i Rana, på Vestlandet og i Oslofjorden (NORSAR, u.å.).
          </p>
        </div>
      </div>

      <GeoMap
        center={[65, -3]}
        zoom={4}
        markers={[
          {
            lat: 64.2558,
            lng: -21.131,
            label: "Þingvellir (Island) – Synlig spredningsrift i Den midtatlantiske ryggen",
          },
          {
            lat: 71.0,
            lng: -8.5,
            label: "Jan Mayen (Beerenberg) – Norges eneste aktive vulkan på ryggsystemet",
          },
          {
            lat: 59.91,
            lng: 10.75,
            label: "Oslofeltet – Permisk innsunket riftdal med rombeporfyr og larvikitt",
          },
          {
            lat: 61.63,
            lng: 8.31,
            label: "Jotunheimen – Kaledonsk skyvedekke (nappe) overskjøvet under Iapetus-lukkingen",
          },
        ]}
        heading="Geodynamiske nøkkelsteder i Norges nærområde"
        caption="Kartet viser sentrale geologiske lokaliteter: Den aktive spredningsaksen på Island og Jan Mayen, den kaledonske fjellkjederoten i Jotunheimen, og den permiske riftdalen i Oslofeltet."
      />
      </section>

      {/* 10. BEGREPER OG SAMMENDRAG */}
      <h2 className="font-display text-2xl font-medium tracking-tight">Sentralt fagvokabular</h2>
      <TermGrid>
        <Term name="litosfære" def="skorpe + stiv øvre mantel (0–100/250 km) som utgjør de tektoniske platene" />
        <Term name="astenosfære" def="varm, fast silikatmantel (100–350 km) som flyter duktilt over millioner av år" />
        <Term name="slab pull" def="den dominerende drivkraften: kald, tett eklogitt-slab synker under egen vekt i subduksjonssonen" />
        <Term name="ridge push" def="gravitasjonsglidning: litosfæren sklir nedover fra den 2–3 km høye midthavsryggen" />
        <Term name="eklogitt" def="ekstremt tung høytrykksmetamorf bergart (granat + omfasitt) omdannet fra basaltisk havbunnsskorpe i subduksjonssoner; drivmotoren i slab pull" />
        <Term name="dekompresjon" def="manteloppstigning gir trykkfall; solidus krysses uten ekstra varme (rygg/rift)" />
        <Term name="flukssmelting" def="vann fra synkende slab senker solidustemperaturen i mantelkilen over (subduksjon)" />
        <Term name="dehydrering" def="høyt trykk presser vann ut av serpentinitt og leirmineraler i den synkende havbunnen" />
        <Term name="akkresjonskile" def="havbunnssedimenter skrapet av den synkende platen og stablet opp foran dyphavsgropen" />
        <Term name="bakbuebasseng" def="ekstensjonsbasseng dannet bak en vulkanbue på grunn av slab rollback (f.eks. Japanhavet)" />
        <Term name="passiv margin" def="kontinentalmargin inne på en plate uten subduksjon eller jordskjelvaktivitet (f.eks. norskekysten); fungerer som en mektig sedimentfelle" />
        <Term name="bruddsone" def="inaktiv, aseismisk forlengelse av en transformforkastning utenfor spredningsryggene" />
        <Term name="Wadati-Benioff" def="skrått seismisk plan av jordskjelv (0–700 km dyp) som sporer den synkende platen" />
        <Term name="seismisk tomografi" def="3D-avbildning av jordens indre mantelstruktur ved hjelp av milliarder av seismiske bølgehastighetsmålinger" />
        <Term name="ofiolitt" def="komplett tverrsnitt av havbunnsskorpe og øvre mantel obdusert på land (f.eks. Leka)" />
        <Term name="obduksjon" def="overkjøring der tung havbunn unntaksvis skyves opp på lett kontinental skorpe i kollisjon" />
        <Term name="paleomagnetisme" def="symmetriske striper med magnetisk reversering i havbunnen (Vine-Matthews-Morley)" />
        <Term name="hotspot" def="mantelplym fra kjerne-mantel-grensen (D'') som brenner vulkankjeder (f.eks. Hawaii)" />
        <Term name="Wilsonsyklus" def="syklisk åpning og lukking av verdenshav over 400–600 mill. år (superkontinenter)" />
        <Term name="skyvedekke" def="store bergflak overskjøvet hundrevis av km under kontinentkollisjon (Kaledonidene)" />
        <Term name="graben" def="innsunket forkastningsblokk i en kontinental riftdal (f.eks. Øst-Afrika, Oslofeltet)" />
        <Term name="isostasi" def="litosfærens flytelikevekt på astenosfæren; landheving etter istidens istrykk" />
      </TermGrid>

      {/* 11. QUIZ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den mekaniske forskjellen på litosfæren og astenosfæren?",
            options: [
              "Litosfæren er flytende magma, mens astenosfæren er fast granitt.",
              "Litosfæren er det kalde, sprø ytterste skallet (skorpe + stiv mantel), mens astenosfæren er varm, fast peridotitt som oppfører seg duktilt og seigtflytende over millioner av år.",
              "Litosfæren finnes bare under kontinentene, mens astenosfæren er havbunn.",
              "Litosfæren og astenosfæren er identiske, men har ulik kjemisk sammensetning av silisium.",
            ],
            answer: 1,
            explain:
              "Riktig! Begge består av fast bergart, men litosfæren er kald og sprø (brekker i plater), mens astenosfæren er så varm (~1350 °C) at den deformeres plastisk og lar platene gli over seg.",
          },
          {
            prompt: "Hva er den viktigste drivkraften bak litosfæreplates bevegelse?",
            options: [
              "Tidevannskrefter fra månen som trekker kontinentene vestover.",
              "Slab pull: Kald og gammel havbunnsskorpe omdannes til tung eklogitt og synker under egen vekt i subduksjonssonen.",
              "Friksjonsdrag fra vinder i troposfæren som dytter på fjellkjedene.",
              "Sentrifugalkraft fra jordas rotasjon som kaster platene mot ekvator.",
            ],
            answer: 1,
            explain:
              "Riktig! Geodynamiske målinger viser at slab pull står for om lag 90 % av bevegelseskraften. Tetthetsøkningen ved faseovergang til eklogitt trekker hele platen etter seg.",
          },
          {
            prompt: "Hvorfor er Leka i Trøndelag kåret til Norges geologiske nasjonalmonument?",
            options: [
              "Fordi det er landets eneste aktive vulkan.",
              "Fordi en komplett bit av Iapetushavets bunn og øvre mantel ble skjøvet på land under Kaledonidene (ofiolitt), slik at man kan gå tørrskodd over Moho-grensen.",
              "Fordi Norges eldste meteorittkrater ligger der.",
              "Fordi det er det eneste stedet i Europa med permafrost.",
            ],
            answer: 1,
            explain:
              "Riktig! Leka ofiolittkompleks er et geologisk verdensfenomen der obduksjon bevarte hele lagrekken fra mantelperidotitt, over Moho, og opp til lagdelt gabbro og putelava.",
          },
          {
            prompt: "Hvorfor er en transformforkastning seismisk aktiv bare mellom spredningsryggene, og ikke i bruddsonen utenfor?",
            options: [
              "Fordi havvannet kjøler ned bergartene utenfor ryggen.",
              "Fordi platene på hver side av sprekken utenfor ryggaksen beveger seg i samme retning med samme fart (ingen relativ bevegelse).",
              "Fordi jordskjelvbølger bare kan bevege seg mot øst.",
              "Fordi bruddsonene er fylt med flytende magma som demper rystelser.",
            ],
            answer: 1,
            explain:
              "Riktig! Som J. Tuzo Wilson viste i 1965: Kun mellom ryggsegmentene glir platene i motsatt retning. Utenfor ryggene beveger skorpen seg unisont i samme retning; bruddsonene er derfor aseismiske arr.",
          },
          {
            prompt: "Hvordan beviste Vine og Matthews havbunnsspredning i 1963?",
            options: [
              "Ved å finne fossiler av dinosaurer på havbunnen.",
              "Ved å oppdage symmetriske striper med normal og reversert magnetisering i havbunnsskorpen på hver side av midthavsryggen.",
              "Ved å måle tidevannsbølger over Den midtatlantiske rygg.",
              "Ved å bore helt ned til jordens flytende ytre kjerne.",
            ],
            answer: 1,
            explain:
              "Riktig! Da havbunnen spredte seg og størknet, frøs magnetittmineralene inn jordas vekslende magnetfelt som et gigantisk symmetrisk båndopptak.",
          },
          {
            prompt: "Hvorfor finnes det aldri jordskjelv dypere enn 700 kilometer i Wadati-Benioff-sonen?",
            options: [
              "Fordi platen fordamper fullstendig når den når 700 km dyp.",
              "Fordi trykk og temperatur i mantelen under 700 km gjør bergartene fullstendig plastiske; de kan ikke lenger lagre elastisk spenning eller sprekke sprøtt.",
              "Fordi seismometrene på overflaten ikke klarer å registrere bølger fra større dyp.",
              "Fordi den flytende ytre kjernen starter ved 700 km dyp.",
            ],
            answer: 1,
            explain:
              "Riktig! Under 700 km dybde fører høyt trykk og høy temperatur til at bergartene deformeres kontinuerlig ved plastisk flyt (dislokasjonskryp). Uten sprøtt brudd oppstår ingen jordskjelv.",
          },
          {
            prompt: "Hva var den kaledonske fjellkjedefoldingen i Norges geologiske historie?",
            options: [
              "En oppsprekking av Norge i perm da Oslofeltet sank inn.",
              "En kontinent-kontinent-kollisjon i silur der Baltika og Laurentia kolliderte, lukket Iapetushavet og skjøv store skyvedekker over landet.",
              "En istidsepoke for 10 000 år siden som gravde ut de norske fjordene.",
              "Dannelsen av Jan Mayen og Beerenberg-vulkanen.",
            ],
            answer: 1,
            explain:
              "Riktig! Kaledonidene oppsto for 430–400 mill. år siden da Iapetushavet lukket seg og Baltika kolliderte med Grønland/Amerika. Skyvedekkene i Jotunheimen er rester av denne fjellkjeden.",
          },
          {
            prompt: "Hvorfor kan marin leire finnes opptil 220 meter over dagens havnivå på Østlandet (marin grense)?",
            options: [
              "Fordi havet under istiden sto 220 meter høyere globalt på grunn av voldsom nedbør.",
              "Fordi den 3 km tykke innlandsisen presset litosfæren ned; da isen smeltet, hevet landet seg raskere enn havet (glasial isostasi).",
              "Fordi tsunamibølger kastet leiren opp i fjellsidene.",
              "Fordi Oslofeltets vulkaner slynget leire opp i høyden under perm.",
            ],
            answer: 1,
            explain:
              "Riktig! Glasial isostasi: Isens enorme vekt trykket litosfæren ned i astenosfæren. Da isen forsvant, hevet landet seg med opptil flere hundre meter, slik at gammel havbunn i dag ligger som fruktbart jordbruksland langt over havnivå.",
          },
        ]}
      />

      <Callout title="Oppsummering: De viktigste læringspunktene om platetektonikk">
        <ul className="space-y-1.5 text-sm list-disc pl-4">
          <li><strong>Mantelen er fast bergart:</strong> Litosfæreplatene flyter ikke på flytende magma, men på duktil astenosfære (varm peridotitt) som flyter seigt over millioner av år.</li>
          <li><strong>Slab pull er hovedmotoren:</strong> Oseanisk litosfære omdannes til tung eklogitt under subduksjon, og tyngdekraften trekker hele platen med seg (~90 % av kraften).</li>
          <li><strong>Smelting krever en utløsende mekanisme:</strong> Trykkfall (dekompresjon) ved midthavsrygger, tilførsel av vann (flukssmelting) ved subduksjonssoner, eller temperaturøkning ved dype mantelplymer (hotspots).</li>
          <li><strong>Ofiolitter er havbunn på land:</strong> Leka i Trøndelag gir en enestående mulighet til å studere hele havbunnsskorpen og Moho-grenseflaten til fots.</li>
          <li><strong>Norges geologi er skapt av platetektonikk:</strong> Fra den kaledonske kollisjonen og Leka-ofiolitten, via permisk riftdannelse i Oslofeltet, til åpningen av Nord-Atlanteren og dagens postglasiale landheving.</li>
        </ul>
      </Callout>
    </TopicLayout>
  );
}
