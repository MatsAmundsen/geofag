import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  JetFormsDiagram,
  JetProfileDiagram,
  JetSeasonDiagram,
  JetStreakDiagram,
  NaoDiagram,
  ThermalWindDiagram,
} from "@/components/diagrams";
import { PhotoFigure, PhotoPair } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";

export const Route = createFileRoute("/tema/jetstrommer")({
  component: JetstrommerPage,
});

function JetstrommerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Atmosfæren"
      title="Jetstrømmer"
      lead="Åtte til tolv kilometer over hodet ditt renner en elv av luft østover i godt over 200 kilometer i timen. Du kjenner den aldri på kinnet. Likevel avgjør den om uka blir mild og våt, eller kald og stillestående — fordi den bestemmer hvor lavtrykkene får lov til å gå."
      banner="/images/fig-jet.jpg"
      bannerAlt="Tynn, rask skyelv høyt over havet mot jordas krumning"
      videoTopic="jetstrømmer"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
      kilder={KILDER.jetstrommer}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva en jetstrøm er</h2>
      <p>
        En jetstrøm er et smalt belte med sterk vestavind i øvre troposfære (NOAA, u.å.). Ordet
        «smalt» er nøkkelen. Vestavindsbeltet ved bakken dekker tusenvis av kilometer i bredden.
        Jetstrømmen er derimot bare noen hundre kilometer bred og et par kilometer dyp, men den kan
        være mange tusen kilometer lang. Tenk deg en elv i lufta: strømmen er sterkest i en trang
        renne midt i, og svakere ut mot sidene.
      </p>
      <p>
        Farten i kjernen ligger typisk mellom 100 og 250 km/t. De sterkeste vinterkjernene kan
        passere 400 km/t. Retningen er nesten alltid fra vest mot øst. Det er ikke tilfeldig, og vi
        skal se hvorfor litt lenger ned.
      </p>
      <OrdBoks
        ord="Jetstrøm"
        barn="Et smalt, sterkt belte med vestavind i øvre troposfære. Noen hundre kilometer bredt, et par kilometer dypt, mange tusen kilometer langt."
      />
      <p>
        Jetstrømmen ble oppdaget nettopp fordi den er så sterk. Under andre verdenskrig fløy
        amerikanske bombefly vestover mot Japan i stor høyde og oppdaget at de nesten sto stille i
        lufta. De hadde flydd rett inn i en motvind ingen visste om.
      </p>

      <PhotoFigure
        src="/images/fig-jet-cirrus.jpg"
        alt="Lange, parallelle cirrusstriper strukket ut over en mørk vinterhorisont"
        heading="Slik kan du se den fra bakken"
        caption="Jetstrømmen i seg selv er usynlig. Men iskrystallene i cirrusskyene som ligger i den, blir dratt ut i lange, parallelle striper som alle peker samme vei. Ligger de slik over deg, ser du sporet etter sterk vind i 8–12 kilometers høyde."
        arrows={[{ d: "M 14 30 L 74 24", tone: "fg", width: 1.3 }]}
        marks={[
          { x: 6, y: 16, n: "1", text: "Striper i samme retning", tone: "fg" },
          { x: 96, y: 74, n: "2", text: "Bakken merker ingenting", tone: "cold", align: "right" },
        ]}
        points={[
          { n: "1", label: "Cirrus dras ut til parallelle bånd av vinden i høyden." },
          { n: "2", label: "Vinden du kjenner ved bakken, kan være helt annerledes." },
        ]}
      />

      <p>
        Flytrafikken lever av dette. En rute fra New York til Oslo går med jetstrømmen i ryggen og
        er ofte omtrent en time kortere enn turen andre veien. Piloter søker aktivt opp kjernen
        østover og styrer utenom den vestover. Rett utenfor kanten av jeten endrer vindfarten seg
        brått over kort avstand, og der ligger mye av den klarværsturbulensen fly møter uten en sky
        i sikte.
      </p>

      <PhotoFigure
        src="/images/fig-jet-fly.jpg"
        alt="Rutefly med kondensstripe i marsjhøyde over et hav av utstrakte cirrusskyer"
        heading="Rutefly ligger midt i den"
        caption="Marsjhøyde for et rutefly er 10–12 kilometer, altså nøyaktig der jetstrømmen er sterkest. Derfor er flytid østover og vestover ikke den samme, og derfor legges rutene om fra dag til dag etter hvor jeten ligger."
        arrows={[{ d: "M 20 34 L 78 32", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 4, y: 22, n: "1", text: "Vind fra vest", tone: "teal" },
          { x: 96, y: 60, n: "2", text: "Marsjhøyde 10–12 km", tone: "fg", align: "right" },
        ]}
        points={[
          { n: "1", label: "Medvind østover, motvind vestover. Timer i forskjell." },
          { n: "2", label: "Skarp vindendring ved kanten gir klarværsturbulens." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        To jetbelter, ikke ett
      </h2>
      <p>
        Det er lett å snakke om «jetstrømmen» i entall. På hver halvkule finnes det to, og de har
        ulik jobb.
      </p>
      <p>
        <strong>Polarfrontjeten</strong> ligger over polarfronten, der kald polarluft møter mildere
        luft fra sør. I snitt ligger den rundt 50–60° nord, men den meandrerer, og kan i perioder
        stå så langt sør som 40° eller så langt nord som 70°. Høyden er typisk 8–12 km. Det er denne
        som styrer lavtrykkene inn mot Norge, og den er den mest variable av de to.
      </p>
      <OrdBoks
        ord="Polarfrontjet"
        barn="Sterk vestavind over polarfronten, typisk 8–12 km oppe og i snitt rundt 50–60° nord. Den styrer lavtrykkene inn mot Norge."
      />
      <p>
        <strong>Den subtropiske jetstrømmen</strong> ligger nær 30° bredde, ved polveggen av
        Hadleycellen, altså over det subtropiske høytrykket og nedsynkingen som lager ørkenene. Den
        ligger høyere enn polarfrontjeten, typisk 10–16 km, fordi tropopausen er høyere der. Den er
        jevnere og mer forutsigbar, og betyr mest for monsun og for været i subtropene.
      </p>
      <OrdBoks
        ord="Subtropisk jet"
        barn="Vestavind nær 30° bredde, ved Hadleycellens polvegg. Ligger høyere enn polarfrontjeten, typisk 10–16 km."
      />
      <p>
        Begge er vestlige. Det henger sammen med at luften i høyden strømmer polover og blir dreid
        mot øst av coriolis. Om vinteren kan de to beltene i perioder nærme seg hverandre eller slå
        seg sammen over deler av kloden.
      </p>
      <p>
        Du kan også møte begrepet <em>polar natt-jet</em>. Den er noe annet: en vestavind i
        stratosfæren over vinterpolen, høyt over de to jetbeltene vi snakker om her. Den hører
        hjemme i diskusjonen om ozon og plutselige stratosfæriske oppvarminger, ikke i den vanlige
        forklaringen av norsk vær.
      </p>

      <PhotoFigure
        src="/images/fig-polarfront.jpg"
        alt="Skarp skygrense over Nord-Atlanteren der kald og mild luft møtes"
        heading="Polarfronten er adressen til den viktigste jeten"
        caption="Der kald polarluft ligger vegg i vegg med mildere luft fra sør, er den horisontale temperaturforskjellen størst. Polarfrontjeten ligger rett over denne grensen. Flytter fronten seg, flytter jeten seg med."
        arrows={[{ d: "M 12 40 L 78 30", tone: "fg", width: 1.3 }]}
        marks={[
          { x: 4, y: 14, n: "1", text: "Kald polarluft", tone: "cold" },
          { x: 6, y: 76, n: "2", text: "Mildere luft sørfra", tone: "warm" },
          { x: 96, y: 40, n: "3", text: "Jeten ligger over grensen", tone: "teal", align: "right" },
        ]}
        points={[
          { n: "1", label: "Kald, tett luft nord for fronten." },
          { n: "2", label: "Mildere, tykkere luftsøyle sør for fronten." },
          { n: "3", label: "Størst kontrast gir sterkest jet, rett over fronten." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hvorfor den finnes: varme, trykk og rotasjon
      </h2>
      <p>
        Alt starter med at sola varmer tropene mer enn polene. Det gir luftsøyler med ulik
        temperatur, og det er forskjellen mellom søylene som til slutt blir en jetstrøm. Men bildet
        ved bakken og bildet i høyden ser helt ulikt ut, og du må holde dem fra hverandre.
      </p>
      <p>
        <strong>Ved bakken</strong> veksler det mellom fire belter. Varm luft stiger nær ekvator:
        lavtrykk og byger i ITCZ. Luften synker i subtropene: høytrykk, ørken og passater. Ved
        polarfronten møtes kald og mild luft: vandrende lavtrykk. Over polen synker kald, tett luft:
        polarhøytrykk.
      </p>
      <p>
        <strong>I høyden</strong> er mønsteret mye enklere. Varm luft utvider seg, så en varm
        luftsøyle er tykkere enn en kald med samme trykk ved bakken. Går du opp til for eksempel 10
        km, har du da mer luft over deg der søylen er varm enn der den er kald. Trykket i høyden
        blir høyere over tropene og lavere over polarluften. Trykkgradienten i høyden peker altså
        polover, hele veien.
      </p>
      <p>
        Så snart luften får fart mot polen, dreier coriolis den mot høyre på nordlig halvkule. En
        polgående strøm blir dermed en vestavind. Høyt oppe er det ingen friksjon fra bakken som
        bremser, så vinden legger seg langs isobarene og blir geostrofisk. Det er derfor jetstrømmen
        kan bli så sterk nettopp der, og derfor den nesten alltid går vestfra.
      </p>

      <JetProfileDiagram />

      <p>
        Neste spørsmål: hvorfor er vinden sterkest akkurat ved tropopausen, og ikke lenger opp?
        Fordi hellingen på trykkflatene bygger seg opp gjennom hele troposfæren. Så lenge det blir
        kaldere mot polen, blir hver trykkflate litt brattere enn den under, gradienten litt større,
        og vinden litt sterkere. Denne sammenhengen — temperaturkontrast på tvers gir vindøkning
        oppover — kalles termisk vind.
      </p>
      <OrdBoks
        ord="Termisk vind"
        barn="Regelen om at vestavinden øker oppover så lenge det blir kaldere mot polen. Stor temperaturkontrast gir sterk jet."
      />
      <p>
        Over tropopausen snur det. Den tropiske tropopausen ligger høyere og er kaldere enn den
        polare, så høyt oppe er det ikke lenger varmest mot ekvator. Kontrasten snur, vinden slutter
        å øke og avtar igjen. Maksimum ligger i overgangen — og det maksimumet er jetkjernen. Det
        forklarer også hvorfor jetene sitter akkurat der tropopausen har et hopp i høyde: ved 30° og
        ved polarfronten.
      </p>

      <ThermalWindDiagram />

      <p>
        Merk konsekvensen av termisk vind:{" "}
        <strong>jetstrømmens styrke er et mål på temperaturforskjellen under den.</strong> Stor
        kontrast mellom tropene og polene gir sterk jet. Krymper kontrasten, svekkes jeten. Den
        regelen skal vi bruke både om årstider og om klimaendringer lenger ned.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Zonal og meridional form
      </h2>
      <p>
        Jetstrømmen går sjelden helt rett. Den har to grunnformer, og det er formen — ikke først og
        fremst styrken — som avgjør hva slags vær du får.
      </p>
      <p>
        <strong>Zonal form:</strong> jeten går nesten rett vest–øst, parallelt med breddegradene.
        Lavtrykkene langs polarfronten vandrer raskt østover. Været skifter ofte, og ingen værtype
        rekker å sette seg. Vestavindsbeltet er sterkt.
      </p>
      <p>
        <strong>Meridional form,</strong> eller bølgeform: jeten svinger i store bølger mot nord og
        sør. Det er Rossby-bølger. En bølgetopp som peker mot polen kalles en rygg og fører mild
        luft nordover. En bølgedal som peker mot ekvator kalles et tråg og fører kald luft sørover.
        Nå flyttes luftmasser langt på tvers av breddegradene, og en kuldebølge i Nord-Europa kan
        sitte i samme bølgetog som en hetebølge lenger sør.
      </p>
      <OrdBoks
        ord="Rossby-bølger"
        barn="Store bølger på jetstrømmen. Rygg peker mot polen og fører mild luft nordover. Tråg peker mot ekvator og fører kald luft sørover."
      />
      <OrdBoks
        ord="Meandering"
        barn="At jetstrømmen svinger i store bølger nord–sør i stedet for å gå rett vest–øst."
      />

      <JetFormsDiagram />

      <p>
        Hvorfor svinger den i det hele tatt? Tre ting drar i den. For det første endrer coriolis seg
        med breddegraden: den er null ved ekvator og sterkest ved polene. Luft som beveger seg
        nordover, kommer inn i et område der dreiningen er sterkere, og luft som beveger seg sørover
        møter svakere dreining. Luftkolonnen «husker» rotasjonen den hadde, og resultatet er at en
        bane som først bøyer av, svinger tilbake igjen — altså en bølge.
      </p>
      <p>
        For det andre setter fjellkjeder og forskjellen mellom land og hav opp faste bølger.
        Klippfjellene i Nord-Amerika og Himalaya tvinger strømmen til å bøye av og forankrer trågene
        et stykke nedstrøms. For det tredje kan kraftig tropisk konveksjon sende bølger nordover og
        endre hvor rygger og tråg legger seg.
      </p>
      <p>
        Når en rygg blir stående i dagevis, kalles det blocking. Vestavindsbeltet stanser opp, og
        lavtrykkene må gå rundt. Da står været. Det er den samme situasjonen som gir langvarig kulde
        om vinteren og langvarig tørke og hete om sommeren.
      </p>
      <OrdBoks
        ord="Blocking"
        barn="En rygg som blir stående. Vestavindsbeltet stanser, lavtrykkene styres utenom, og været står stille i dagevis."
      />

      <PhotoPair
        heading="Samme bølge, motsatt vær"
        caption="Et tråg og en rygg er to sider av samme Rossby-bølge, og de opptrer samtidig noen hundre mil fra hverandre. Under tråget renner kald luft sørover og kan gi kuldebølge langt sør for der den hører hjemme. Under ryggen synker luften, skyene løses opp, sola steker dag etter dag, og bakken tørker ut."
        left={{
          src: "/images/fig-trag-kulde.jpg",
          alt: "Snødekt bygate i nordeuropeisk by under et kaldt vinterutbrudd",
          title: "Under tråget: kald luft sørover",
          arrows: [{ d: "M 50 6 L 50 34", tone: "cold", width: 1.3 }],
          marks: [{ x: 4, y: 16, n: "1", text: "Kuldeutbrudd", tone: "cold" }],
        }}
        right={{
          src: "/images/fig-rygg-varme.jpg",
          alt: "Uttørket sørlandsk jordbrukslandskap med sprukken jord under hetebølge",
          title: "Under ryggen: nedsynking og hete",
          arrows: [{ d: "M 50 6 L 50 34", tone: "warm", width: 1.3 }],
          marks: [{ x: 4, y: 16, n: "2", text: "Hetebølge og tørke", tone: "warm" }],
        }}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fra jetstrøm til lavtrykk
      </h2>
      <p>
        Vi sier at jetstrømmen «styrer lavtrykkene». Det er verdt å se nøyaktig hvordan, for det er
        her mange svarer upresist til eksamen.
      </p>
      <p>
        Jetstrømmen har ikke samme fart hele veien. Inne i den ligger biter der vinden er ekstra
        sterk, ofte kalt jetkjerner eller jet streaks. Luft som strømmer inn i en slik kjerne
        akselererer, og luft som forlater den bremser. Der luften bremser og sprer seg i utløpet,
        blir det divergens: det fjernes luft fra toppen av luftsøylen. Divergensen er sterkest på
        nordsiden av utløpet.
      </p>
      <OrdBoks
        ord="Divergens"
        barn="At luft sprer seg fra hverandre. Skjer det høyt oppe, fjernes luft fra toppen av søylen, og trykket ved bakken faller."
      />
      <p>
        Når luft forsvinner ut av toppen, må noe erstatte den. Luft nedenfra stiger, vekten av
        søylen minker, og trykket ved bakken faller. Lavtrykket dypner. Ved bakken strømmer luft inn
        mot det, blir tvunget opp, avkjøles, og vanndampen kondenserer til skyer og nedbør. Har
        lavtrykket i tillegg kald og varm luft liggende side om side — noe det har langs
        polarfronten — kan bølgen vokse av seg selv ved å bytte temperaturkontrast mot rotasjon. Det
        kalles baroklin ustabilitet.
      </p>
      <OrdBoks
        ord="Baroklin ustabilitet"
        barn="Når en bølge på polarfronten vokser til et lavtrykk ved å omdanne temperaturforskjellen mellom kald og varm luft til rotasjon."
      />

      <JetStreakDiagram />

      <p>
        Fordi hvert nytt lavtrykk fødes og forsterkes under jeten, følger de hverandre østover langs
        omtrent samme spor. Det sporet er stormbanen. Flytter jetstrømmen seg, flytter stormbanen
        seg med — og dermed også hvor det regner og blåser.
      </p>
      <OrdBoks
        ord="Stormbane"
        barn="Sporet der de vandrende lavtrykkene går, som regel like under jetstrømmen. Flytter jeten seg, flytter stormbanen seg."
      />

      <PhotoFigure
        src="/images/fig-stormbane.jpg"
        alt="Satellittbilde av Nord-Atlanteren med tre lavtrykksspiraler på rekke mot Skandinavia"
        heading="Lavtrykk på rekke og rad"
        caption="Tre lavtrykk i samme spor over Nord-Atlanteren, hvert på sitt stadium. De ligger ikke tilfeldig: de er født under den samme jetstrømmen og følger den østover. Dette er stormbanen, og enden av den er norskekysten."
        arrows={[{ d: "M 14 66 L 82 22", tone: "teal", width: 1.35 }]}
        marks={[
          { x: 4, y: 82, n: "1", text: "Ungt lavtrykk", tone: "low" },
          { x: 34, y: 50, n: "2", text: "Modent", tone: "low" },
          { x: 96, y: 14, n: "3", text: "Mot Norge", tone: "teal", align: "right" },
        ]}
        points={[
          { n: "1", label: "Nytt lavtrykk dypner under utløpet av jetkjernen." },
          { n: "2", label: "Spiralen strammes mens det vandrer østover." },
          { n: "3", label: "Stormbanen ender ofte mot Norskehavet og kysten." },
        ]}
      />

      <p>
        Her ligger den viktigste presiseringen på hele siden. Det blir ikke våtere under jeten fordi
        jetstrømmen selv er en regnsky. Den ligger 8–12 km oppe og inneholder nesten ikke vann.
        Nedbøren kommer ved bakken, i lavtrykkene den styrer, og der fjellene løfter lufta ekstra.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Årstid: sterkest om vinteren
      </h2>
      <p>
        Bruk regelen om termisk vind. Om vinteren står polen i mørke og kjøles kraftig ned, mens
        tropene fortsatt får sol. Temperaturkontrasten mellom ekvator og pol er da på sitt største,
        og polarfrontjeten blir sterk. Samtidig trekker polarfronten sørover, og jeten følger med.
      </p>
      <p>
        Om sommeren varmes Arktis opp. Kontrasten krymper, jeten svekkes og trekker nordover. Derfor
        er de kraftige lavtrykkene og de store stormene i Norge et vinterfenomen, mens sommeren
        oftere gir svakere systemer og lengre perioder med samme vær.
      </p>

      <JetSeasonDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Svingninger som flytter jeten
      </h2>
      <p>
        Jetstrømmen ligger ikke likt fra år til år. Noen svingninger i hav og atmosfære flytter den
        systematisk, og tre av dem bør du kunne.
      </p>
      <p>
        <strong>NAO</strong> er trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket (NOAA,
        u.å.). Dette er den viktigste for Norge, rett og slett fordi den sitter i Nord-Atlanteren,
        der været vårt lages. Er forskjellen stor, er gradienten stor, og polarfrontjeten blir sterk
        og ligger langt nord. Er forskjellen liten, svekkes jeten, den trekker sørover eller brytes
        opp i blocking.
      </p>
      <OrdBoks
        ord="NAO"
        barn="Trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Stor forskjell: sterk jet langt nord. Liten forskjell: svak jet, mer blocking."
      />

      <NaoDiagram />

      <PhotoFigure
        src="/images/fig-nao.jpg"
        alt="Nord-Atlanteren fra bane: klar luft i sørvest, syklonspiraler lenger nord, skystrøk mot Norge"
        heading="Scenen for NAO"
        caption="Sørvest: mer høytrykk og klarere luft over Azorene. Nord: mer lavtrykk og spiraler ved Island. Skystrøkene imellom er vestavinden og stormbanen inn mot Norge. Jo større forskjellen er mellom de to, desto kraftigere er strømmen imellom."
        arrows={[{ d: "M 28 62 L 72 38", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 6, y: 58, n: "H", text: "Azorhøytrykk", tone: "warm" },
          { x: 48, y: 12, n: "L", text: "Islandslavtrykk", tone: "low" },
        ]}
        points={[
          { n: "H", label: "Høytrykk i sør: luften synker, ofte klarere." },
          { n: "L", label: "Lavtrykk i nord: luften stiger, her går stormbanen." },
        ]}
      />

      <p>
        <strong>ENSO</strong> er koblingen mellom hav og atmosfære i det tropiske Stillehavet, med
        en syklus på to til sju år (NOAA, u.å.). Den flytter hvor tropisk luft stiger, og der luften
        stiger, mates jetstrømmene. I en El Niño-fase forsterkes den subtropiske jeten over Nord-Stillehavet
        og strekker seg østover mot sørvestlige USA, stormsporet over USA legger seg sørligere, det
        blir tørke og brannvær i Indonesia og østlige Australia, og mer nedbør langs kysten av
        Ecuador og Peru. I en La Niña-fase ligger jeten lenger vest og nord, Indonesia og Australia
        får mer regn, kysten av Peru blir tørrere, og Nord-Amerika får et nordligere stormspor. For
        Norge er koblingen indirekte og langt mer usikker enn NAO.
      </p>

      <PhotoFigure
        src="/images/fig-enso.jpg"
        alt="Tropisk Stillehav med varmt overflatevann og kraftige konveksjonsskyer"
        heading="ENSO flytter der luften stiger"
        caption="Der havet er varmest, stiger luften kraftigst. Når El Niño flytter det varmeste vannet østover, flytter oppstigningen seg med, og jetstrømmene over Stillehavet og Amerika legger seg annerledes. Mekanismen bak passater og varmt vann står i klima-kapittelet."
        marks={[
          { x: 4, y: 16, n: "1", text: "Varmt vann: luft stiger", tone: "warm" },
          { x: 96, y: 70, n: "2", text: "Jeten flytter seg", tone: "teal", align: "right" },
        ]}
        points={[
          { n: "1", label: "Oppstigningen sitter over det varmeste havet." },
          { n: "2", label: "Flyttes oppstigningen, flyttes jetstrømmen." },
        ]}
      />

      <p>
        <strong>IOD</strong>, den indiske dipolen, er en øst–vest-svingning i det tropiske
        Indiahavet. Ved positiv IOD blir det mer regn og flom i Øst-Afrika, tørke og brannvær i
        Indonesia og sørvestlige Australia, og monsunen over India kan forsterkes. Ved negativ IOD
        snur mønsteret. IOD flytter først og fremst den subtropiske jeten over Indiahavet og
        Australia. Koblingen til polarfrontjeten over Atlanteren er indirekte.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Norge under jetstrømmen
      </h2>
      <p>
        Norge ligger midt i det området polarfrontjeten vandrer over. Noen få hundre kilometer
        forskyvning nord eller sør endrer hele vinteren. Det enkleste er å tenke i tre posisjoner.
      </p>
      <p>
        <strong>Jeten ligger nord for oss.</strong> Da treffer de fleste lavtrykkene Nord-Norge og
        Barentshavet. Sør-Norge kan ligge i den milde luften sør for jeten, med færre kraftige
        systemer.
      </p>
      <p>
        <strong>Jeten ligger over oss.</strong> Da går stormbanen rett inn over kysten. Lavtrykkene
        kommer på rekke, vestavinden er fuktig, og fjellene løfter lufta. Vestlandet får orografisk
        nedbør på losiden, mens Østlandet oftere ligger i regnskygge. Dette er den klassiske milde,
        våte og urolige norske vinteren.
      </p>
      <p>
        <strong>Jeten ligger sør for oss.</strong> Da treffer lavtrykkene De britiske øyer,
        Nordsjøen og Biscaya, eller går inn i Middelhavet. Skandinavia får oftere kald, tørr og mer
        kontinental luft, gjerne med inversjon i dalene.
      </p>
      <p>
        Oversatt til NAO: ved positiv NAO ligger jeten langt nord og er sterk, stormbanen går mot
        Island, Norskehavet og Nord-Norge, Sør- og Midt-Norge får milde og våte vintrer, Middelhavet
        blir tørrere, og Grønland og Labrador kaldere. Formen er mer zonal. Ved negativ NAO svekkes
        jeten, ligger lenger sør eller brytes i blocking, Sør-Europa får mer nedbør og storm, og
        Skandinavia får oftere kald vinter. Formen er mer meridional.
      </p>
      <p>
        Blocking over Skandinavia er et eget kapittel. Om vinteren gir det klarvær, utstråling og
        kald luft som samler seg i dalbunnene som inversjon. Om sommeren gir det tørt og varmt vær.
        Mekanismen er den samme som over Sahara: nedsynking, få skyer og mye innstråling ved bakken.
      </p>

      <PhotoFigure
        src="/images/fig-blocking.jpg"
        alt="Norsk vinterdal fylt av kald tåke under klar himmel, med sol på fjelltoppene"
        heading="Blocking over Skandinavia om vinteren"
        caption="Ryggen står, vestavinden er stengt ute og himmelen er klar. Da stråler bakken varme ut, den kalde luften samler seg i dalbunnen under et lokk av mildere luft, og inversjonen kan bli stående i dagevis. Det er stikk motsatt av mildværet en zonal jet gir."
        arrows={[{ d: "M 50 8 L 50 32", tone: "warm", width: 1.2, dash: true }]}
        marks={[
          { x: 6, y: 14, n: "1", text: "Nedsynking, klart", tone: "warm" },
          { x: 96, y: 62, n: "2", text: "Kaldluft i dalbunnen", tone: "cold", align: "right" },
        ]}
        points={[
          { n: "1", label: "Ryggen står. Luften synker, skyene løses opp." },
          { n: "2", label: "Utstråling om natten. Kald luft samles: inversjon." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Endrer jetstrømmen seg med klimaet?
      </h2>
      <p>
        Arktis varmes to til fire ganger raskere enn kloden som helhet. Det kalles arktisk
        forsterkning. Bruker du regelen om termisk vind rett, følger hypotesen nesten av seg selv:
        når polen varmes mest, krymper temperaturkontrasten i nedre troposfære, jeten svekkes, og en
        svakere jet meandrerer lettere. Det skulle gi mer blocking og flere langvarige kuldeutbrudd
        — selv om kloden totalt sett blir varmere.
      </p>
      <p>
        Det er en hypotese, ikke en konklusjon, og du bør presentere den som det. IPCC AR6 har lav
        konfidens for regionale endringer i nordlige jetstrømmer og stormbaner, særlig over
        Nord-Atlanteren om vinteren (IPCC, 2021). Én grunn er at gradientene konkurrerer: nede varmes
        Arktis og kontrasten svekkes, men oppe i den tropiske øvre troposfæren varmes det også
        kraftig, og der styrkes kontrasten. De to drar jetstrømmen hver sin vei. En annen grunn er at
        den naturlige variasjonen fra år til år er stor.
      </p>
      <p>
        Legg også merke til at én mye brukt påstand peker motsatt vei av det man kanskje forventer:
        blocking over Grønland og Nord-Stillehavet ventes å bli sjeldnere i høye utslippsscenarioer,
        med middels konfidens. Det er altså ikke dekning for å si at «klimaendringene gir mer
        blocking».
      </p>
      <p>
        Til slutt en nyanse som ofte blandes sammen. En meandrerende jet kan gi kuldeperioder også i
        en varmere verden. Men global oppvarming hever hele temperaturfordelingen, og AR6 har høy
        konfidens for at kuldeekstremer blir sjeldnere og mindre kalde. En kald uke i Europa i 2040
        kan altså godt skje — den vil bare sannsynligvis være mildere enn en tilsvarende uke i 1960.
      </p>

      <Callout title="Til eksamen og Norge">
        <p>
          Fire ledd holder svaret sammen: temperaturkontrast gir trykkgradient i høyden, coriolis
          gjør strømmen vestlig, jetkjernen lager divergens som dypner lavtrykkene, og stormbanen
          følger jeten. Deretter kobler du på Norge: jet nord for oss gir vær til Nord-Norge, jet
          over oss gir mildt og vått på Vestlandet, jet sør for oss gir kald og tørr vinter i
          Skandinavia.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Det blir ikke våtere fordi jetstrømmen selv regner. Den ligger 8–12 km oppe. Nedbøren
          kommer ved bakken, i lavtrykkene den styrer.
        </p>
        <p>
          Det er to jetbelter på hver halvkule, ikke ett: polarfrontjeten og den subtropiske jeten.
          Polar natt-jeten er noe annet — den ligger i stratosfæren.
        </p>
        <p>
          Jetstrømmen er ikke det samme som vestavindsbeltet. Vestavindsbeltet er bredt og ved
          bakken. Jetstrømmen er smal og ligger ved tropopausen.
        </p>
        <p>
          At arktisk forsterkning gir mer meandering og mer blocking, er en hypotese. AR6 har lav
          konfidens for regionale endringer, og venter faktisk mindre blocking over Grønland og
          Nord-Stillehavet.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="Jetstrøm"
          def="Smalt, sterkt belte med vestavind i øvre troposfære. Noen hundre km bredt, tusenvis langt."
        />
        <Term
          name="Polarfrontjet"
          def="Jeten over polarfronten, 8–12 km oppe, i snitt 50–60° nord. Styrer lavtrykkene mot Norge."
        />
        <Term
          name="Subtropisk jet"
          def="Jeten nær 30°, ved Hadleycellens polvegg. Ligger høyere, typisk 10–16 km."
        />
        <Term
          name="Termisk vind"
          def="Vestavinden øker oppover så lenge det blir kaldere mot polen. Stor kontrast gir sterk jet."
        />
        <Term
          name="Rossby-bølger"
          def="Bølger på jetstrømmen. Rygg mot polen med mild luft, tråg mot ekvator med kald luft."
        />
        <Term name="Meandering" def="At jetstrømmen svinger nord–sør i stedet for å gå zonal." />
        <Term
          name="Blocking"
          def="En rygg som blir stående. Vestavinden stanser, og været står i dagevis."
        />
        <Term
          name="Divergens"
          def="Luft som sprer seg. Skjer det i jetens utløp, faller trykket ved bakken."
        />
        <Term
          name="Stormbane"
          def="Sporet lavtrykkene følger, like under jetstrømmen. Flytter jeten seg, flytter sporet seg."
        />
        <Term
          name="NAO"
          def="Trykkforskjellen Azorene–Island. Viktigste svingningen for jeten inn mot Norge."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor blir Sør- og Midt-Norge våtere når polarfrontjeten ligger over oss?",
            options: [
              "Fordi jetstrømmen selv er en regnsky i øvre troposfære.",
              "Fordi polar natt-jeten ligger over Skandinavia.",
              "Stormbanen flyttes med jetstrømmen. Lavtrykkene under den gir stigende luft, skyer og nedbør.",
              "Fordi den subtropiske jetstrømmen ligger i 8–12 km og regner rett ned.",
            ],
            answer: 2,
            explain:
              "Jetstrømmen ligger 8–12 km oppe og regner ikke. Den styrer hvor lavtrykkene går, og nedbøren kommer fra den stigende luften i lavtrykkene ved bakken.",
          },
          {
            prompt: "Hvor mange jetbelter er det på hver halvkule, og hvilke?",
            options: [
              "Ett: polarfrontjeten.",
              "Tre: polarfrontjet, subtropisk jet og polar natt-jet.",
              "To: polarfrontjeten over polarfronten, og den subtropiske nær 30° ved Hadleycellens polvegg.",
              "To: polarfrontjeten og polar natt-jeten.",
            ],
            answer: 2,
            explain:
              "To: polarfrontjeten og den subtropiske jeten. Polar natt-jeten ligger i stratosfæren og er noe annet.",
          },
          {
            prompt: "Hva sier regelen om termisk vind?",
            options: [
              "At varm luft alltid stiger raskere enn kald.",
              "At vestavinden øker oppover så lenge det blir kaldere mot polen. Stor temperaturkontrast gir sterk jet.",
              "At vinden er sterkest der bakken er varmest.",
              "At jetstrømmen alltid ligger på 30° bredde.",
            ],
            answer: 1,
            explain:
              "Temperaturkontrast på tvers gir stadig brattere trykkflater oppover, altså sterkere gradient og sterkere vind. Maksimum ligger ved tropopausen, der kontrasten snur.",
          },
          {
            prompt: "Hvordan bidrar en jetkjerne til at et lavtrykk dypner?",
            options: [
              "Den presser luft ned i lavtrykket ovenfra.",
              "I utløpet sprer luften seg. Divergensen fjerner luft fra toppen av søylen, luft nedenfra må stige, og trykket ved bakken faller.",
              "Den blåser skyene inn over lavtrykket.",
              "Den varmer opp havoverflaten under seg.",
            ],
            answer: 1,
            explain:
              "Divergens i utløpet av jetkjernen fjerner luft oppe. Luft nedenfra stiger for å erstatte den, søylen blir lettere, og trykket ved bakken faller.",
          },
          {
            prompt: "Hvorfor er polarfrontjeten sterkere om vinteren enn om sommeren?",
            options: [
              "Fordi jorda roterer raskere om vinteren.",
              "Fordi polen er mørk og kald mens tropene får sol. Temperaturkontrasten er størst, og termisk vind gir sterkere jet.",
              "Fordi det er mer snø som reflekterer vind.",
              "Fordi den subtropiske jeten forsvinner om vinteren.",
            ],
            answer: 1,
            explain:
              "Vinterkontrasten mellom ekvator og pol er størst. Da blir jeten sterk, og den trekker samtidig sørover med polarfronten.",
          },
          {
            prompt:
              "Hva er den faglig riktige måten å omtale arktisk forsterkning og jetstrømmen på?",
            options: [
              "Det er fastslått at jeten meandrerer mer og gir mer blocking.",
              "Det er en hypotese. AR6 har lav konfidens for regionale endringer, og venter faktisk mindre blocking over Grønland og Nord-Stillehavet.",
              "Arktisk forsterkning påvirker ikke jetstrømmen i det hele tatt.",
              "Jetstrømmen forsvinner når Arktis varmes.",
            ],
            answer: 1,
            explain:
              "Gradientene konkurrerer: nede svekkes kontrasten av arktisk forsterkning, oppe styrkes den av oppvarming i tropisk øvre troposfære. Derfor lav konfidens.",
          },
        ]}
      />
    </TopicLayout>
  );
}
