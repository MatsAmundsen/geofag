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
        to: "/geofag-1/vulkaner-og-jordskjelv",
        label: "Neste: Vulkaner og jordskjelv",
      }}
      kilder={KILDER.platetektonikk}
    >
      {/* 1. JORDENS OPPBYGNING OG REOLOGI */}
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

      {/* 2. VITENSKAPSHISTORIE OG BEVISENE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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

      {/* 3. HVILKE KREFTER DRIVER PLATENE? */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hva driver platene? Slab pull, ridge push og gravitasjonell fysikk
      </h2>
      <p>
        I mange eldre lærebøker forklares platebevegelsene som om mantelen fungerer som et transportbånd som drar
        platene med seg via friksjon (basal drag). Moderne geodynamiske beregninger og seismisk tomografi har snudd
        dette bildet på hodet (Forsyth & Uyeda, 1975): <strong>Platene driver i stor grad seg selv!</strong>
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

      {/* 4. SMELTEFYSIKK OG MAGMADANNELSE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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

      {/* 5. DE TRE HOVEDTYPENE PLATEGRENSER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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
        src="/images/fig-subduksjon-vulkan.jpg"
        alt="Stratovulkan i utbrudd over en subduksjonssone med dyp havrenne og askesøyle"
        heading="Subduksjon i praksis: Eksplosiv stratovulkanbue"
        caption="Subduksjonssone-vulkaner (som i Andes, Kaskadefjellene eller Indonesia) er blant jordens farligste. Magmaen er rik på silisium (andesitt/dasitt) og inneholder store mengder oppløst vann avgitt fra den synkende havbunnen. Når trykket avtar under oppstigningen, ekspanderer vanndampen eksplosivt og slynger aske titalls kilometer opp i stratosfæren."
        marks={[
          { x: 12, y: 70, n: "1", text: "Dyphavsgrop", tone: "cold" },
          { x: 55, y: 15, n: "2", text: "Stratovulkan", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Dyphavsgrop der den kalde havbunnen dykker ned i mantelen." },
          { n: "2", label: "Eksplosiv vulkanbue dannet av flukssmelting over den synkende platen." },
        ]}
      />

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

      {/* 6. SEISMISITET OG WADATI-BENIOFF SONEN */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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

      {/* 8. HOTSPOTS OG WILSONSYKLUSEN */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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

      <WilsonCycleDiagram />

      {/* 9. NORGES PLATETEKTONISKE REISE */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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

      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne <em>gjøre rede for indre krefter og prosesser, platetektonikk og
          hvilke konsekvenser dette har for jordskorpen og jordoverflaten</em>, samt forstå hvordan norsk natur og
          geologi er et resultat av denne globale dynamikken.
        </p>
      </Callout>

      {/* 10. BEGREPER OG SAMMENDRAG */}
      <h2 className="font-display text-2xl font-medium tracking-tight">Sentralt fagvokabular</h2>
      <TermGrid>
        <Term name="litosfære" def="skorpe + stiv øvre mantel (0–100/250 km) som utgjør de tektoniske platene" />
        <Term name="astenosfære" def="varm, fast silikatmantel (100–350 km) som flyter duktilt over millioner av år" />
        <Term name="slab pull" def="den dominerende drivkraften: kald, tett eklogitt-slab synker i subduksjonssonen" />
        <Term name="ridge push" def="gravitasjonsglidning: litosfæren sklir nedover fra den 2–3 km høye midthavsryggen" />
        <Term name="dekompresjon" def="manteloppstigning gir trykkfall; solidus krysses uten ekstra varme (rygg/rift)" />
        <Term name="flukssmelting" def="vann fra synkende slab senker solidustemperaturen i mantelkilen over (subduksjon)" />
        <Term name="Wadati-Benioff" def="skrått seismisk plan av jordskjelv (0–700 km dyp) som sporer den synkende platen" />
        <Term name="ofiolitt" def="komplett tverrsnitt av havbunnsskorpe: sedimenter, putelava, diker, gabbro, peridotitt" />
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
    </TopicLayout>
  );
}
