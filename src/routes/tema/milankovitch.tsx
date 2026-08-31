import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  EccentricityDetailDiagram,
  FennoscandianIceSheetDiagram,
  GlacialLandformsDiagram,
  IceAgeFactorsDiagram,
  Insolation65NCurveDiagram,
  KvartarTimeSeriesDiagram,
  MilankovitchCyclesDiagram,
  ObliquityDetailDiagram,
  PrecessionDetailDiagram,
} from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/milankovitch")!;

export const Route = createFileRoute("/tema/milankovitch")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/milankovitch",
    }),
  component: MilankovitchPage,
});

function MilankovitchPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Istider"
      title="Milankovitch-syklusen og istider"
      lead="Jordbanen vingler langsomt. Det flytter sommersola på 65 °N — og avgjør om snøen overlever august. Resten er forsterkning: albedo, CO₂ og land. Vi er i en mellomistid inne i et ishus. Siste innlandsis over Norge smeltet for omtrent 11 700 år siden."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{ to: "/tema/paleoklima", label: "Forrige: Paleoklima" }}
      next={{ to: "/tema/vaerkatastrofer", label: "Neste: Værkatastrofer" }}
      kilder={KILDER.milankovitch}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        1. Hva er Milankovitch-syklusen?
      </h2>
      <p>
        Milankovitch-syklusen — også skrevet Milanković — er tre langsomme svingninger i jordas bane
        og rotasjonsakse. De endrer <em>hvor</em> og <em>når på året</em> solstrålingen treffer, og
        bare svakt den samlede energien jorda får fra sola (NASA, u.å.). Det er ikke sola som
        «skrur seg av». Det er geometrien som flytter innstrålingen mellom breddegrader og
        årstider.
      </p>
      <p>
        Den serbiske matematikeren Milutin Milanković regnet dette ut i første halvdel av 1900-tallet.
        Beviset i havbunnen kom senere: de samme periodene sitter i marine δ¹⁸O-kurver. Jordbanen er
        pacemakeren for istidene i kvartær (Hays, Imbrie &amp; Shackleton, 1976).
      </p>
      <OrdBoks
        ord="Milankovitch-syklusen"
        barn="Tre orbitale perioder — eksentrisitet, helning og presesjon — som flytter innstrålingen. De styrer sommersmelting på 65 °N, ikke den samlede solenergien."
      />
      <p>
        De tre periodene er ulike. Eksentrisitet, omtrent 100 000 år (og en lengre bølge rundt 400
        000 år): hvor ellipseformet banen er. Helning (oblikvitet), omtrent 41 000 år: hvor skrå
        jordaksen står. Presesjon, omtrent 23 000 og 19 000 år: når på året jorda er nærmest sola.
        Istidene styres av summen, ikke av én syklus alene.
      </p>
      <p>
        Paleoklima-siden tar arkivene — iskjerne, proxy, δ¹⁸O. Denne siden tar mekanismen: banen,
        istidsfaktorene og sporene isen etterlot i Norge. Start med{" "}
        <Link
          to="/tema/paleoklima"
          className="text-primary underline-offset-2 hover:underline"
        >
          paleoklima
        </Link>{" "}
        hvis du trenger kjeden fra spor til kunnskap først.
      </p>

      <MilankovitchCyclesDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        2. Hvordan fungerer prosessene?
      </h2>
      <p>
        Tenk tre skruer som dreies samtidig, men i ulike tempo. Ingen av dem skrur av sola. Alle tre
        avgjør om innlandsis på nordlige høye bredder smelter om sommeren — eller overlever og
        vokser.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Eksentrisitet</h3>
      <p>
        Jordas bane er en ellipse, ikke en sirkel. Eksentrisitet er et tall mellom 0 og 1 som sier
        hvor avlang ellipsen er. I dag ligger den rundt 0,017 — nesten sirkulær. Over tid svinger
        den mellom omtrent 0,000 og 0,06, med hovedperioder nær 100 000 og 413 000 år (NASA, u.å.).
      </p>
      <p>
        Når ellipsen er mer avlang, varierer avstanden til sola mer gjennom året. Jorda er da
        tydelig nærmere sola i perihel og lenger unna i aphel. Det forsterker presesjonens effekt:
        forskjellen mellom «sommer nær sola» og «sommer langt unna sola» blir større. Når banen er
        nesten sirkulær, dempes den forskjellen. Eksentrisitet er altså en modulator mer enn en
        egen istidsknapp. Den lille endringen i årsinnstråling globalt er for svak til å forklare
        istidene alene.
      </p>
      <OrdBoks
        ord="Perihel og aphel"
        barn="Perihel: nærmest sola. Aphel: lengst unna. I dag er jorda nærmest sola i januar — altså under sørlige sommer."
      />

      <EccentricityDetailDiagram />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Helning (oblikvitet)
      </h3>
      <p>
        Jordaksen heller. I dag omtrent 23,4°. Over ca. 41 000 år svinger helningen mellom omtrent
        22,1° og 24,5° (NASA, u.å.). Høy helning gir sterkere årstider: varmere somre og kaldere
        vintre, særlig på høye bredder. Lav helning gir svakere årstider.
      </p>
      <p>
        For innlandsis er <em>sommeren</em> nøkkelen, ikke vinterkulden. Snø faller uansett på 65 °N
        om vinteren. Spørsmålet er om den smelter bort i juli og august. Høy helning gir mer
        sommersol der — isen taper. Lav helning gir kjøligere somre — snøen kan overleve, og isen
        vokser. Før Midtpleistocen-overgangen for omtrent én million år siden dominerte 41 000-års
        rytmen i istidskurvene. Etterpå tok 100 000-årsrytmen over. Hvorfor, er fortsatt et
        forskningsspørsmål. Banen alene forklarer ikke skiftet.
      </p>
      <OrdBoks
        ord="Helning"
        barn="Vinkelen mellom jordaksen og normalen på baneplanet. Høy helning: sterkere somre på høye bredder. Lav helning: kjøligere somre, lettere for isen å overleve."
      />

      <ObliquityDetailDiagram />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Presesjon</h3>
      <p>
        Aksen vingler som en snurrebass. I tillegg dreier selve ellipsen langsomt. Til sammen gir
        det klimatisk presesjon med perioder nær 23 000 og 19 000 år. Den avgjør <em>hvilken
        årstid</em> som treffer perihel — altså om nordlig sommer skjer når jorda er nærmest sola,
        eller når den er lengst unna.
      </p>
      <p>
        I dag: perihel i januar. Nordlig vinter er da litt mildere, nordlig sommer litt slakere enn
        den ville vært med motsatt fase. For 11 000 år siden, nær starten av holocen, lå perihel
        nær nordlig sommer. Da fikk 65 °N mer sommersol, og innlandsisen smeltet. Presesjonens
        utslag er størst når eksentrisiteten er høy. Når banen er nesten sirkulær, spiller det
        liten rolle om sommeren treffer perihel eller aphel.
      </p>
      <OrdBoks
        ord="Presesjon"
        barn="Aksen vingler, og ellipsen dreier. Sammen avgjør de om nordlig sommer treffer perihel eller aphel. Periode ca. 19 000 og 23 000 år."
      />

      <PrecessionDetailDiagram />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Det som teller: sommersol på 65 °N
      </h3>
      <p>
        De tre syklusene summeres i innstrålingen ved omtrent 65 °N i juni–juli. Der kunne de store
        nordamerikanske og fennoskandiske isdekkene ligge. Hvis sommersola er for svak, smelter
        ikke fjorårets snø. Neste vinter legger mer oppå. Etter tusener av år står det kilometer
        med is. Hvis sommersola styrkes, smelter kanten, albedoen faller, og deglasiasjonen kan
        løpe.
      </p>
      <p>
        Banen starter. Den fullfører ikke alene. CO₂ og albedo gjør endringen global — mer om det
        under punkt 3 og 4.
      </p>

      <Insolation65NCurveDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        3. Hvordan kan den påvirke klimaet på jorden?
      </h2>
      <p>
        Orbital endring er et pådriv som omfordeler energi. Den globale årsinnstrålingen endres
        lite. Det som endres, er sesong og breddegrad: mer eller mindre sommersol ved polene,
        motsatt fortegn ved ekvator, og bytte av hvilken halvkule som får «sterk sommer». Klimaet
        reagerer fordi is, hav og karbonkretsløp er følsomme for akkurat den omfordelingen.
      </p>
      <PhotoFigure
        src="/images/fig-innstraling.jpg"
        alt="Jorda belyst av sola, med tydelig forskjell mellom belyste og skyggesider"
        heading="Innstrålingen treffer skjevt"
        caption="Sola varmer ekvator mer enn polene. Milankovitch flytter denne skjevheten gjennom årtusener: mer eller mindre sommersol på 65 °N, nesten uten å endre totalt sollys."
        marks={[
          { x: 8, y: 18, n: "1", text: "Ekvator får mest", tone: "warm" },
          { x: 70, y: 12, n: "2", text: "65 °N om sommeren", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Årsinnstrålingen globalt endres lite av banen." },
          { n: "2", label: "Istidene styres av om sommeren på 65 °N kan smelte isen." },
        ]}
      />
      <p>
        Når sommersola på 65 °N stiger etter et glacialt minimum, smelter iskantene. Mørkere land og
        hav tar over. Albedoen synker, mer energi tas opp, smeltingen går fortere. Samtidig slipper
        havet ut CO₂ som var lagret i kaldt dypvann. CO₂ i antarktisk is stiger fra rundt 180 ppm
        mot 260–280 ppm gjennom en deglasiasjon (Lüthi et al., 2008). Gassen forsterker og sprer
        oppvarmingen til hele kloden — også sørlige halvkule, der sommersola ikke nødvendigvis
        økte.
      </p>
      <p>
        Retningen kan snus. Under deglasiasjon starter orbital innstråling, og CO₂ forsterker. Siden
        1850 starter CO₂. Vi måler utslippene. Orbitale endringer er for trege til å forklare
        oppvarmingen nå, og går dessuten svakt mot <em>svakere</em> sommersol på 65 °N — altså mot
        langsom avkjøling over tusener av år (IPCC, 2021). Det er det motsatte av observert
        oppvarming.
      </p>
      <OrdBoks
        ord="Pådriv og forsterkning"
        barn="Banen er pacemaker. Isalbedo og CO₂ er forsterkere. Uten forsterkerne ville istidene vært mindre. Uten banen ville de ikke gått i 41- og 100-tusenårsrytme."
      />
      <p>
        På tiårsskalaen merker du ikke Milankovitch. På hundretusenårsskalaen er det denne
        rytmen som skiller glacial fra interglacial. Det er derfor iskjerner og havbunn viser åtte
        store sykluser de siste 800 000 årene, mens termometerrekka siden 1850 peker en annen vei.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        4. Hvilke faktorer må være til stede for å få en istid?
      </h2>
      <p>
        Banen er nødvendig, men ikke tilstrekkelig. Jorda har hatt de samme tre syklusene i
        hundrevis av millioner år. Likevel har det meste av jordas historie vært uten store
        innlandsis på begge poler. En istid krever et bakteppe der is <em>kan</em> overleve, og så
        en utløser som lar den vokse. Under følger faktorene, i den rekkefølgen de faktisk virker.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Bakteppe: et kaldt nok jordsystem
      </h3>
      <p>
        Gjennom kenozoikum har jorda kjølt seg ned. Antarktis fikk varig innlandsis for omtrent 34
        millioner år siden. Store nordlige isdekker kom for alvor inn i kvartær, fra ca. 2,6
        millioner år siden. Bak det ligger lavere bakgrunns-CO₂ over millioner av år, fjellkjededanning
        som øker forvitring, og kontinenter som har drevet mot høye bredder. Uten dette bakteppet
        gir ikke en svak 65 °N-sommer innlandsis — den gir bare en litt kjøligere årstid.
      </p>
      <OrdBoks
        ord="Ishus og drivhus"
        barn="Ishus: jorda har varig innlandsis. Drivhus: isfri eller nesten isfri. Vi lever i et ishus. Holocen er en varm fase inne i det ishuset, ikke slutten på det."
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Land på høye bredder
      </h3>
      <p>
        Innlandsis trenger et underlag. Havfrysing gir havis, ikke kilometerhøye isdekker. I
        kvartær ligger store landområder rundt Polhavet: Grønland, Nord-Amerika, Fennoskandia,
        Sibir. Isen kan da bygge tykkelse på land, senke albedo over enorme flater, og tappe vann
        fra havet. Uten kontinenter nær polene blir istidene annerledes — eller uteblir.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Svak sommersol på 65 °N
      </h3>
      <p>
        Dette er den orbitale utløseren. Helning, presesjon og eksentrisitet må sammen gi kjølige
        somre på nordlige høye bredder, slik at vintersnøen ikke smelter. Én «ugunstig» syklus er
        sjelden nok. Det er kombinasjonen som teller, og den gjentar seg i de periodene Hays,
        Imbrie og Shackleton fant i havbunnen.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Fukt nok til snø</h3>
      <p>
        Isen er frosset nedbør. For tørt, og det faller for lite snø selv om sommeren er kald.
        Nord-Atlanteren og fukttransport inn mot Nord-Amerika og Fennoskandia gir den nedbøren
        isdekkene trenger. Paradokset er kjent: et isdekke kan kvele sitt eget fukttilfang når det
        blir stort og høytrykk legger seg over det. Starten krever likevel fukt. Sibir har ofte
        vært kaldt og tørt — der ble isdekkene tynnere enn over Skandinavia.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Is–albedo-tilbakekobling
      </h3>
      <p>
        Snø og is kaster tilbake en stor del av sollyset. Bart fjell, skog og åpent hav tar det
        opp. Når isen vokser, stiger albedo, mindre energi tas opp, det blir kaldere, isen vokser
        mer. Det er en positiv tilbakekobling: den forsterker, den starter ikke. Uten den ville
        små orbitale dytt gitt små utslag. Med den kan et dårlig sommerklima på 65 °N bli til
        kilometer med is over et kontinent.
      </p>
      <PhotoFigure
        src="/images/fig-albedo.jpg"
        alt="Is og snø mot mørkt fjell og vann, med tydelig kontrast i lyshet"
        heading="Is kaster lyset tilbake"
        caption="Høy albedo over snø og is, lav over bart fjell og åpent hav. Når innlandsisen vokser, tar jorda opp mindre solenergi. Når den smelter, tar jorda opp mer. Banen dytter. Albedoen forsterker."
        marks={[
          { x: 10, y: 20, n: "1", text: "Høy albedo", tone: "cold" },
          { x: 62, y: 70, n: "2", text: "Lav albedo", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Snø og is reflekterer. Vokser isen, taper jorda energi." },
          { n: "2", label: "Mørkt land og hav tar opp. Smelter isen, går det fortere." },
        ]}
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        CO₂ som forsterker, ikke bryter
      </h3>
      <p>
        I iskjerner følger CO₂ temperaturen gjennom istidssyklusene, med et kjent etterslep på
        hundreårsskala fordi boblene lukkes sent. Det betyr ikke at CO₂ er irrelevant. Kaldt hav
        løser mer CO₂. Biologisk pumpe og omrøring i Sørishavet endres. Vegetasjon og jordsmonn
        flytter karbon. Resultatet: ca. 180–190 ppm ved siste glacialmaksimum mot ca. 280 ppm før
        industrialiseringen (Lüthi et al., 2008; IPCC, 2021). Lavere CO₂ gir svakere drivhuseffekt
        og gjør hele kloden kaldere — også der innstrålingen ikke falt. CO₂ er en forsterker i
        istidsmaskineriet. Den er ikke bryteren som slår istiden på. I dag er rollen snudd: vi
        pumper CO₂ først.
      </p>
      <OrdBoks
        ord="Naturlig CO₂-spenn i senkvartær"
        barn="Omtrent 172–300 ppm i antarktisk is over 800 000 år. Dagens verdi ligger over 425 ppm — utenfor det spennet."
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Vegetasjon, støv og havsirkulasjon
      </h3>
      <p>
        Når skog viker for tundra og steppe, stiger albedo også utenom isen. Støv fra tørre
        kontinent kan kjøle ved å reflektere og ved å så skyer — og det kan gjødsle havet med jern.
        Havsirkulasjonen, særlig AMOC, kan bremse eller forsterke: mer ferskvann fra smeltende is
        svekker dypvannsdannelse og kan gi brå regionale hopp, som yngre dryas. Det er modulatorer,
        ikke hovedbryteren. Se{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          havstrømmer
        </Link>{" "}
        for AMOC.
      </p>
      <p>
        Til slutt: tid. Et isdekke bygges over tusener av år. En kald sommer er vær. En istid er
        klima over årtusener, med is som rekker å flyte, grave og senke havnivået med over 100
        meter.
      </p>

      <IceAgeFactorsDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        5. Hva er en istid — og når var den siste?
      </h2>
      <p>
        Ordet brukes i to lag, og de må holdes fra hverandre. I vid betydning er en istid et{" "}
        <em>ishus</em>: en lang periode der jorda har varige innlandsis. Kenozoisk ishus startet da
        Antarktis frøs. Kvartær, de siste ca. 2,6 millioner år, er den delen der nordlige isdekker
        også kommer og går. Vi er fortsatt i dette ishuset.
      </p>
      <p>
        I snever betydning — den skolen oftest mener — er en istid en <em>glacial</em>: en kald fase
        der innlandsis dekker store deler av Nord-Amerika og Eurasia. Mellom dem ligger{" "}
        <em>interglacialer</em>, mellomistider. Holocen er mellomistiden vi er i nå. Den startet for
        ca. 11 700 år siden (Walker et al., 2009).
      </p>
      <OrdBoks
        ord="Glacial og interglacial"
        barn="Glacial: kald fase med store innlandsis på nordlige kontinenter. Interglacial: varmere mellomfase, som holocen. Begge skjer inne i kvartært ishus."
      />
      <p>
        Hvor mange? I kvartær viser den globale bunnvannskurven (LR04) i størrelsesorden 50
        glacial–interglacial-sykluser på 2,6 millioner år (Lisiecki &amp; Raymo, 2005). De siste 800
        000 årene, dekket av EPICA Dome C, er det åtte store sykluser på omtrent 100 000 år (Lüthi
        et al., 2008). I Nord-Europa får de yngste egne navn: Elster, Saale og Weichsel er de tre
        siste som preget Skandinavia tydelig. Eldre glacialer finnes, men sporene er mer
        overkjørt.
      </p>
      <p>
        Siste istid i snever betydning er Weichsel-istiden. Den varte i grovt fra ca.
        115 000 til 11 700 år siden. Siste glacialmaksimum (LGM) lå rundt 21 000 år før nå: isen
        var da på sitt tykkeste og mest utbredt. Fennoskandisk isdekke lå over Norge. Havnivået sto
        omtrent 120 meter lavere enn i dag. CO₂ lå rundt 180–190 ppm. Deretter smeltet isen i
        rykk, med kaldere tilbakeslag. Holocen avløste weichsel for ca. 11 700 år siden. Det er
        «siste istid slutt» i skolebetydningen.
      </p>
      <PhotoFigure
        src="/images/fig-iskjerne.jpg"
        alt="Sylinder av blå is med tynne årlige lag og innestengte luftbobler"
        heading="Åtte sykluser i isen"
        caption="EPICA Dome C dekker 800 000 år og åtte istidssykluser. Boblene er luft. CO₂ der er målt, ikke gjettet. Naturlig spenn 172–300 ppm. Dagens verdi ligger utenfor."
        marks={[
          { x: 6, y: 14, n: "1", text: "Årlige lag", tone: "cold" },
          { x: 58, y: 48, n: "2", text: "Innestengt luft", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Lagene daterer. Tynnere lag: tørrere eller kaldere år." },
          { n: "2", label: "CO₂ i boblene er ekte fortidsatmosfære." },
        ]}
      />
      <p>
        En ny glacial, orbitalt, ligger titusener av år fram i tid. Høy CO₂ kan skyve den lenger
        (Berger &amp; Loutre, 2002; IPCC, 2021). Det er irrelevant for risikoen i 2100. Vi styrer
        ikke holocen med jordbanen nå. Vi styrer den med karbon.
      </p>
      <p>
        «Snøballjorda» i prekambrium er noe annet: nesten global is, på en jord med annen
        solstyrke og annen atmosfære. Ikke bland den med weichsel.
      </p>

      <KvartarTimeSeriesDiagram />

      <FennoscandianIceSheetDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        6. Tegn etter siste istid
      </h2>
      <p>
        Weichsel-isen er borte. Landskapet husker den. I Norge er de fleste store dalene og
        fjordene fossil form: isen gravde, elva bor der nå. Geofag 1 tar U-dal mot V-dal. Her er
        sporene som vitner om at et isdekke faktisk lå her — og om hvordan det slapp taket.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Erosjonsspor</h3>
      <p>
        Isen skurer og plukker. Skuringsstriper er riss i berget i isens bevegelsesretning.
        Rundsva er avrundede knauser med slak støtside og brattere leside der isen har plukket.
        U-daler har bratte sider og slak bunn fordi isen eroderer i hele tverrsnittet, ikke bare i
        en elverenne. Fjord er U-dal under dagens havnivå. Hengende daler munner høyt i dalsiden
        fordi sidobreen ikke gravde like dypt som hovedbreen. Hard gneis gir dyp, trang dal.
        Svakere berg gir bredere. Samme agent, ulik bergart — mer under{" "}
        <Link
          to="/geofag-1/bergarter-og-landformer"
          className="text-primary underline-offset-2 hover:underline"
        >
          bergarter og landformer
        </Link>
        .
      </p>
      <PhotoFigure
        src="/images/gf1-bergarter.jpg"
        alt="Lagdelt sedimentær klippe og isskurt fjordlandskap"
        heading="Fjord er U-dal under vann"
        caption="Isskurt kyst og dal er ikke elvas verk alene. Innlandsisen gravde tverrsnittet. Elva og havet bruker formen. De fleste norske U-dalene er fossil istidsform."
        marks={[
          { x: 8, y: 28, n: "1", text: "Isskurt berg", tone: "cold" },
          { x: 55, y: 62, n: "2", text: "Dyp dal / fjord", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Skuring og plukking runder og river berget." },
          { n: "2", label: "U-form og fjord er isens tverrsnitt, ikke elvas V." },
        ]}
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Løsmasser og morener</h3>
      <p>
        Bunnmorene (till) er usortert: leire, sand, stein og blokk i samme masse, avsatt under
        isen. Endemorener er rygger der iskanten sto stille en periode og dumpet materiale. Raet i
        Sør-Norge er den store endemorenen fra yngre dryas, for omtrent 12 800–11 700 år siden: et
        kaldt tilbakeslag mens isen ellers var i ferd med å vike. Flyttblokker er stein som isen
        har fraktet langt fra opphavet — ofte en annen bergart enn berget de ligger på. Drumliner
        er strømlinjeformede hauger parallelt med isbevegelsen. Rullesteinsåser (eskerer) er
        grusrygger avsatt av smeltevannselver i eller under isen.
      </p>
      <OrdBoks
        ord="Raet"
        barn="Den store endemorenen i Sør-Norge fra yngre dryas. Iskanten sto her mens klimaet kortvarig ble kaldere, før holocen tok over."
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Havnivå, marin grense og landheving
      </h3>
      <p>
        Ved LGM var så mye vann bundet i is at det globale havnivået lå omtrent 120 meter lavere.
        Samtidig presset isen skorpa ned. Da isen smeltet, steg havet raskt, men landet i
        Fennoskandia reiste seg enda mer. Resultatet: gammel sjøbunn ligger i dag tørt, og den
        høyeste stranden etter istiden kalles marin grense. NGU kartlegger den mellom 0 og omtrent
        220 meter over dagens hav: høyest der isen var tykkest, lavere ytterst på kysten (NGU,
        u.å.). Leire avsatt i havet, nå på land, er bakgrunnen for kvikkleire — mer under{" "}
        <Link to="/geofag-1/skred" className="text-primary underline-offset-2 hover:underline">
          skred
        </Link>
        .
      </p>
      <OrdBoks
        ord="Marin grense"
        barn="Høyeste nivå havet har stått etter siste istid på et gitt sted. Over den: isens løsmasser. Under: gammel sjøbunn, ofte leire."
      />
      <p>
        Yngre dryas er også et klimaspor, ikke bare en morene. Iskjerner og sedimenter viser et
        brått kaldt hopp like før holocen, knyttet til smeltevann og svekket AMOC. Det er bevis
        for at istidens slutt ikke var en jevn oppvarming, og for at havsirkulasjonen kan knekke
        regionalt klima på tiår til århundrer.
      </p>

      <GlacialLandformsDiagram />

      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for forskning på forhistorisk klima, og hvordan det bidrar til å lage prognoser
          for framtidens klima. Her: orbital pacemaker, forsterkere, og hvorfor banen ikke forklarer
          oppvarmingen siden 1850.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Milankovitch"
          def="Tre orbitale perioder som flytter innstrålingen. Styrer sommersmelting på 65 °N."
        />
        <Term
          name="Eksentrisitet"
          def="Hvor ellipseformet jordbanen er. Ca. 100 000 og 400 000 år. Modulerer presesjonen."
        />
        <Term
          name="Helning"
          def="Aksehelning 22,1–24,5°. Ca. 41 000 år. Høy helning: sterkere somre på høye bredder."
        />
        <Term
          name="Presesjon"
          def="Når på året jorda er nærmest sola. Ca. 19 000 og 23 000 år."
        />
        <Term
          name="Glacial"
          def="Kald fase med store nordlige innlandsis. Weichsel er den siste i Norden."
        />
        <Term name="Holocen" def="Nåværende mellomistid, fra ca. 11 700 år før nå." />
        <Term
          name="Raet"
          def="Stor endemorene i Sør-Norge fra yngre dryas, like før holocen."
        />
        <Term
          name="Marin grense"
          def="Høyeste havnivå etter siste istid på et sted. Over: isens løsmasser. Under: gammel sjøbunn."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva endrer Milankovitch-syklusen først og fremst?",
            options: [
              "Den samlede solstrålingen, som halveres i istid.",
              "Hvor og når på året innstrålingen treffer — særlig sommersol på 65 °N.",
              "CO₂ i atmosfæren, som banen pumper direkte.",
              "Jordas rotasjonsretning, som snur hvert 41 000. år.",
            ],
            answer: 1,
            explain:
              "Banen omfordeler energi mellom årstid og breddegrad. Totalt sollys endres lite. Istidene styres av om snøen på 65 °N overlever sommeren.",
          },
          {
            prompt: "Hvilken faktor er utløseren for en glacial inne i kvartært ishus?",
            options: [
              "Et vulkanutbrudd som skygger for sola i ett år.",
              "At jorda er lenger unna sola hele året.",
              "Svak sommersol på 65 °N, slik at vintersnøen ikke smelter.",
              "At AMOC slår seg av som første trekk, før isen finnes.",
            ],
            answer: 2,
            explain:
              "Land, fukt, albedo og CO₂ må være på plass, men den orbitale utløseren er kjølige somre på nordlige høye bredder. Albedo og CO₂ forsterker etterpå.",
          },
          {
            prompt: "Når sluttet siste istid i snever betydning, og hva kaller vi tiden etter?",
            options: [
              "For ca. 21 000 år siden. Vi kaller tiden etter weichsel.",
              "For ca. 11 700 år siden. Vi kaller tiden etter holocen.",
              "I 1850, da termometerrekka startet.",
              "Den er ikke slutt. Innlandsisen dekker fortsatt Norge.",
            ],
            answer: 1,
            explain:
              "Siste glacialmaksimum var ca. 21 000 år siden. Weichsel sluttet og holocen startet ca. 11 700 år før nå. Vi er i en mellomistid inne i et ishus.",
          },
          {
            prompt: "Hvorfor forklarer ikke Milankovitch oppvarmingen siden 1850?",
            options: [
              "Fordi jordbanen ikke finnes lenger.",
              "Fordi iskjerner ikke kan måle CO₂.",
              "Fordi orbitale endringer er for trege, og går nå svakt mot svakere sommersol på 65 °N.",
              "Fordi holocen ikke er en mellomistid.",
            ],
            answer: 2,
            explain:
              "Under deglasiasjon starter innstråling, og CO₂ forsterker. Nå starter CO₂. Banen peker svakt mot avkjøling over tusener av år — motsatt av observert oppvarming.",
          },
        ]}
      />
    </TopicLayout>
  );
}
