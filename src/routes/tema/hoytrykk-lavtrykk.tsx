import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { SeaBreezeDiagram } from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/hoytrykk-lavtrykk")!;

export const Route = createFileRoute("/tema/hoytrykk-lavtrykk")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/hoytrykk-lavtrykk",
    }),
  component: TrykkPage,
});

function TrykkPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Høytrykk og lavtrykk"
      lead="Luft har vekt, og den veier ikke like mye overalt. Der luften stiger, faller trykket, og skyene bygger seg. Der den synker, stiger trykket, og himmelen tømmes. Vind er luften som utligner forskjellen. Vindsystemet, havstrømmene og været henger alle på disse to bevegelsene."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      next={{ to: "/tema/vindsystemet", label: "Neste: Vindsystemet" }}
      kilder={KILDER.trykk}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Lufttrykk</h2>
      <p>
        Luft har vekt. Trykket i et punkt er vekten av luftsøylen over. Derfor faller trykket med
        høyden.
      </p>
      <OrdBoks ord="Lufttrykk" barn="Vekten av luftsøylen over. Faller med høyden." />
      <p>
        Et lavtrykk er et område med lavere trykk enn omgivelsene. Et høytrykk er et område med
        høyere trykk enn omgivelsene. Tallene er alltid relative. Samme hPa-verdi kan være lavtrykk
        i ett kart og høytrykk i et annet, avhengig av naboen.
      </p>

      <PhotoFigure
        src="/images/fig-luftsoyle.jpg"
        alt="Glødende luftsøyle over et landskap, tett nede og tynn mot verdensrommet"
        heading="Luftsøylen"
        caption="Trykket i et punkt er vekten av luftsøylen over. Derfor faller trykket med høyden."
        arrows={[{ d: "M 50 8 L 50 40", tone: "fg", width: 1.3 }]}
        marks={[
          { x: 34, y: 14, n: "1", text: "Tynn luft mot rommet", tone: "cold", align: "right" },
          { x: 34, y: 46, text: "Trykket øker nedover", tone: "fg", align: "right" },
          { x: 68, y: 72, n: "2", text: "Tyngst ved bakken", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Jo høyere, desto mindre luft over deg — lavere trykk." },
          { n: "2", label: "Ved bakken er søylen lengst. Trykket er størst." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-trykk-splitt.jpg"
        alt="Samme type kyst i to slags vær: storm og klar himmel"
        heading="Trykk er relativt"
        caption="Et lavtrykk er lavere trykk enn omgivelsene. Et høytrykk er høyere trykk enn omgivelsene. Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen."
        marks={[
          { x: 4, y: 14, n: "L", text: "Lavere enn naboen", tone: "low" },
          { x: 56, y: 14, n: "H", text: "Høyere enn naboen", tone: "warm" },
        ]}
        points={[
          { n: "L", label: "Lavtrykk: lavere trykk enn omgivelsene." },
          { n: "H", label: "Høytrykk: høyere trykk enn omgivelsene." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Lavtrykk: luften stiger
      </h2>
      <p>
        Sola varmer bakken. Bakken varmer luften. Varm luft er lettere enn kald luft ved samme
        trykk. Den stiger.
      </p>
      <p>
        Der luften stiger, blir det underskudd av luft nær bakken. Trykket faller. Det er et termisk
        lavtrykk.
      </p>
      <OrdBoks ord="Lavtrykk" barn="Et område med lavere trykk enn omgivelsene." />
      <p>
        Dette er et termisk lavtrykk: bakken varmer, og luften stiger. De lavtrykkene som gir norsk
        vær, starter ikke slik. De dannes langs polarfronten, der kald luft fra nord møter mildere
        luft fra sør, og vandrer inn over oss fra Atlanteren. Selve fødselen tar vi i vindsystemet.
        Men det som skjer inni dem — luft opp, skyer, nedbør — er nøyaktig det du leser her.
      </p>
      <p>
        På vei opp avkjøles luften. Når den når kondensasjonsnivået, dannes skyer. Vanndamp blir til
        vanndråper, og da frigjøres latent varme til luften rundt. Merk deg den varmen: den kommer
        tilbake når vi skal forklare fønvind. I tropene er denne kondensasjonen motoren i
        Hadleycellen.
      </p>
      <OrdBoks
        ord="Latent varme"
        barn="Varmen som frigjøres når vanndamp blir til dråper. Den forsvinner ikke — den går ut i luften rundt og varmer den."
      />
      <p>
        Nesten alt vær skjer i troposfæren. Der avtar temperaturen med høyden, typisk om lag 6,5 °C
        per km. Tropopausen ligger om lag 8 km over polene og 16–18 km over tropene.
      </p>
      <p>
        Over tropopausen ligger stratosfæren. Der øker temperaturen med høyden, fordi ozon
        absorberer ultrafiolett stråling. Luften er stabilt lagdelt. Den stigende luften har da
        blitt kaldere enn luften over. Stigningen stopper, og luften sprer seg ut i høyden. Vertikal
        blanding i stratosfæren er treg.
      </p>
      <OrdBoks
        ord="Tropopause"
        barn="Skillet mot stratosfæren, der temperaturen begynner å øke med høyden og stigningen stopper."
      />

      <PhotoFigure
        src="/images/fig-lavtrykk-snitt.jpg"
        alt="Tverrsnitt av et lavtrykk: luft inn langs havet, tårnhøy byge, regn"
        heading="Lavtrykk sett fra sida"
        caption="Der luften stiger, blir det underskudd av luft nær bakken. Trykket faller. På vei opp avkjøles luften, og det dannes skyer. Øverst sprer luften seg ut i høyden."
        arrows={[
          { d: "M 12 46 L 38 42", tone: "low", width: 1.25 },
          { d: "M 88 46 L 62 42", tone: "low", width: 1.25 },
          { d: "M 50 40 L 50 14", tone: "low", width: 1.4 },
          { d: "M 46 12 L 22 14", tone: "low", width: 1.1 },
          { d: "M 54 12 L 78 14", tone: "low", width: 1.1 },
        ]}
        marks={[
          { x: 4, y: 84, n: "1", text: "Inn nede", tone: "low" },
          { x: 64, y: 32, n: "2", text: "Opp og avkjøling", tone: "low" },
          { x: 96, y: 19, n: "3", text: "Ut i høyden", tone: "low", align: "right" },
        ]}
        points={[
          { n: "1", label: "Underskudd nær bakken. Luft strømmer inn." },
          { n: "2", label: "Luften stiger, avkjøles og danner skyer." },
          { n: "3", label: "Ved tropopausen stopper stigningen. Luften sprer seg ut i høyden." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-stigende.jpg"
        alt="Tårnhøye skyer der luften stiger og avkjøles"
        heading="Stigningen stopper i tropopausen"
        caption="Skyen tårner så lenge luften inni er varmere enn luften rundt. Ved tropopausen begynner temperaturen å øke oppover, og da er den stigende luften ikke lenger varmest. Stigningen stopper, og skyen brer seg utover i stedet for oppover."
        arrows={[{ d: "M 44 44 L 46 12", tone: "low", width: 1.4 }]}
        marks={[
          { x: 4, y: 62, n: "1", text: "Boblene stiger", tone: "low" },
          { x: 50, y: 12, n: "2", text: "Her brer skyen seg utover", tone: "fg", align: "center" },
          { x: 96, y: 82, n: "3", text: "Nedbør", tone: "low", align: "right" },
        ]}
        points={[
          { n: "1", label: "Luften stiger så lenge den er varmere enn luften rundt seg." },
          {
            n: "2",
            label:
              "Ved tropopausen er den ikke varmest lenger. Stigningen stopper, og skyen brer seg utover.",
          },
          { n: "3", label: "Dråpene vokser til de faller. Det er nedbøren fra et lavtrykk." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Høytrykk: luften synker
      </h2>
      <p>
        Luften som har steget, strømmer unna i høyden. Der avkjøles den. Kald, tørr luft er tettere
        og synker.
      </p>
      <p>
        Der luften synker, samles det et overskudd av luft nær bakken. Trykket stiger. Det er et
        høytrykk.
      </p>
      <OrdBoks ord="Høytrykk" barn="Et område med høyere trykk enn omgivelsene." />
      <p>
        På vei ned varmes luften tørradiabatisk: den varmes av trykket alene, ikke av at noe
        tilfører den varme. Sahara ligger under Hadleycellens nedsynking. Vedvarende høytrykk over
        Sør-Norge om sommeren virker på samme måte: nedsynking, få skyer, mer innstråling ved
        bakken.
      </p>

      <PhotoFigure
        src="/images/fig-hoytrykk-snitt.jpg"
        alt="Tverrsnitt av høytrykk: luft synker fra klar himmel og sprer seg ut over stille hav"
        heading="Høytrykk sett fra sida"
        caption="Der luften synker, samles det et overskudd av luft nær bakken. Trykket stiger, og luften strømmer ut langs bakken. Speilbildet av lavtrykket."
        arrows={[
          { d: "M 50 10 L 50 32", tone: "warm", width: 1.4 },
          { d: "M 48 36 L 18 44", tone: "warm", width: 1.2 },
          { d: "M 52 36 L 82 44", tone: "warm", width: 1.2 },
        ]}
        marks={[
          { x: 54, y: 24, n: "1", text: "Luften synker", tone: "warm" },
          { x: 6, y: 58, n: "H", text: "Overskudd ved bakken", tone: "warm" },
          { x: 96, y: 80, n: "2", text: "Ut langs bakken", tone: "warm", align: "right" },
        ]}
        points={[
          { n: "1", label: "Luften synker og varmes. Skyene løses opp." },
          { n: "H", label: "Overskudd av luft nær bakken. Trykket stiger: høytrykk." },
          { n: "2", label: "Luft strømmer ut fra høytrykket langs bakken." },
        ]}
      />

      <p>
        Hvorfor tømmes himmelen? En sky er små vanndråper. Om dråpene blir til damp igjen, eller
        blir værende som dråper, avgjøres av relativ fukt: hvor mye damp luften har, delt på hvor
        mye den har plass til. Varm luft har plass til mer damp enn kald luft.
      </p>
      <OrdBoks
        ord="Relativ fukt"
        barn="Hvor mye vanndamp luften har, i forhold til hvor mye den har plass til. Varmes luften opp uten å få ny damp, faller relativ fukt."
      />
      <p>
        Luften som synker, får ikke ny vanndamp på vei ned. Men den varmes. Da har den plass til mer
        enn den har, relativ fukt faller, og dråpene i skyen fordamper. Skyen forsvinner uten at det
        blåser den bort. Derfor er himmelen tom i et høytrykk.
      </p>

      <PhotoFigure
        src="/images/fig-synker.jpg"
        alt="Klar, kald luft over åpent hav der skyene er få"
        heading="Derfor er himmelen tom"
        caption="Dette bildet viser resultatet, ikke bevegelsen. Nedsynking er langsom og usynlig — noen centimeter i sekundet over store områder. Det du ser, er sporet den etterlater: luft som er varmet på vei ned, har plass til mer damp enn den har, så skyene har fordampet."
        arrows={[
          { d: "M 24 8 L 24 30", tone: "warm", width: 1.2, dash: true },
          { d: "M 74 8 L 74 30", tone: "warm", width: 1.2, dash: true },
        ]}
        marks={[
          { x: 4, y: 20, n: "1", text: "Luften synker, usynlig", tone: "warm" },
          {
            x: 50,
            y: 42,
            n: "2",
            text: "Varmes: plass til mer damp",
            tone: "warm",
            align: "center",
          },
          { x: 96, y: 62, n: "3", text: "Skyene fordamper", tone: "fg", align: "right" },
        ]}
        points={[
          {
            n: "1",
            label: "Nedsynkingen er for langsom til å se. Den skjer over hele høytrykket.",
          },
          { n: "2", label: "Luften varmes på vei ned, men får ikke ny damp. Relativ fukt faller." },
          {
            n: "3",
            label:
              "Dråpene i skyen fordamper. Klarværet er et resultat av nedsynkingen, ikke en egen «godværs-årsak».",
          },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Vind som resultat</h2>
      <p>
        Luft beveger seg fordi trykket ikke er det samme overalt. Trykkgradientkraften peker fra
        høyt mot lavt trykk og setter luften i gang. Tette isobarer betyr sterk vind.
      </p>
      <p>
        Nær bakken bremser friksjon. Da krysser vinden isobarene inn mot lavtrykk og ut fra
        høytrykk. Innstrømming i lavtrykk tvinger luft opp: skyer og nedbør. Utstrømming i høytrykk
        tvinger luft ned: oppløsning av skyer.
      </p>
      <p>
        På nordlig halvkule går luften mot klokka inn mot lavtrykk og med klokka ut fra høytrykk.
        Det er trykkgradientkraften, coriolis og friksjon, ikke en huskeregel.
      </p>

      <PhotoFigure
        src="/images/fig-vind-mot-lavtrykk.jpg"
        alt="Solbelyst gress i forgrunnen, mørk storm over havet i det fjerne"
        heading="Fra høyt mot lavt trykk"
        caption="Luft beveger seg fordi trykket ikke er det samme overalt. Trykkgradientkraften peker fra høyt mot lavt trykk og setter luften i gang. Der luften strømmer ut, synker den. Der den strømmer inn, stiger den."
        arrows={[
          { d: "M 18 28 L 52 28", tone: "teal", width: 1.4 },
          { d: "M 14 8 L 14 22", tone: "warm", width: 1.2 },
          { d: "M 56 24 L 56 8", tone: "low", width: 1.3 },
        ]}
        marks={[
          { x: 18, y: 12, n: "H", text: "Høytrykk · synker", tone: "warm" },
          { x: 96, y: 10, n: "L", text: "Lavtrykk · stiger", tone: "low", align: "right" },
          { x: 4, y: 57, n: "1", text: "Vind: fra H mot L", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Vinden går fra høyt mot lavt trykk. Tette isobarer betyr sterk vind." },
          { n: "H", label: "Utstrømming i høytrykk tvinger luft ned: oppløsning av skyer." },
          { n: "L", label: "Innstrømming i lavtrykk tvinger luft opp: skyer og nedbør." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Pålandsvind og fralandsvind
      </h2>
      <p>
        Pålandsvind og fralandsvind er lokale kretsløp. De drives av at land og hav varmes ulikt.
        Samme logikk som høytrykk og lavtrykk, i liten skala langs kysten.
      </p>
      <p>
        Om dagen varmes land fortere enn hav. Luften over land blir lettere og stiger: termisk
        lavtrykk. Luft fra sjøen strømmer inn. Det er pålandsvind, eller sjøbris. På Sørlandet en
        svak høytrykksdag i juni: sol, 25 °C innerst i skjærgården, 18 °C og pålandsvind på odden.
      </p>
      <p>
        Men innstrømmingen kan ikke fortsette alene. Strømmer det luft inn over land uten at noe går
        ut igjen, ville luften hopet seg opp der, og trykket ville steget til brisen stanset seg
        selv. Det den stigende luften gjør, er å frakte den ut igjen oppe. Høyt over bakken går
        luften tilbake mot havet, synker der, og fyller på sjøbrisen nede. Det er returstrømmen, og
        den er grunnen til at brisen holder seg gående hele dagen.
      </p>
      <OrdBoks
        ord="Returstrøm"
        barn="Luften som går tilbake i høyden, motsatt vei av vinden ved bakken. Uten den ville luft hopet seg opp der vinden blåser inn, og kretsløpet ville stoppet seg selv."
      />
      <p>
        Om natten avkjøles land fortere. Da synker luften over land, trykket ved bakken stiger, og
        vinden går ut mot sjøen: fralandsvind, eller landbris. Hele kretsløpet er speilvendt, også
        returstrømmen. Landbrisen er svakere, fordi temperaturforskjellen mellom land og hav er
        mindre om natten.
      </p>
      <p>
        Norskekysten om sommeren: sjøbris er vanlig når storskalavinden er svak. Den kan utløse
        byger et stykke inn i landet der brisen konvergerer, og holde kysten kjøligere.
      </p>

      <SeaBreezeDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Fønvind</h2>
      <p>
        Føn er varm, tørr vind på lesiden av et fjell. Det rare med føn er at luften kommer ned
        varmere enn den var da den startet på samme høyde på den andre siden. Fjellet har altså
        gjort luften varmere. Forklaringen ligger i regnet som falt på veien over.
      </p>
      <p>
        Fuktig luft møter fjellet og må over. Den stiger og avkjøles, akkurat som i et lavtrykk. Når
        vanndampen kondenserer til dråper, frigjøres latent varme — den samme varmen du møtte da
        lavtrykket bygget skyer. Varmen går ut i luften rundt. På losiden faller dråpene ut som
        regn.
      </p>
      <p>
        Der er byttehandelen:{" "}
        <strong>vannet forlater luften som regn, men varmen blir igjen.</strong> Over kammen er
        luften tørr og har fått et varmetilskudd den ikke hadde da den kom inn.
      </p>
      <p>
        På lesiden synker luften. Nå finnes det ingen dråper å fordampe. Når luft fordamper dråper,
        bruker den varme på det og kjøles ned — men her er det ingenting å fordampe, så hele
        oppvarmingen på vei ned blir stående. Luften lander varmere og tørrere enn den var på samme
        høyde i lo.
      </p>
      <OrdBoks
        ord="Føn"
        barn="Varm, tørr vind på lesiden av et fjell. Luften mistet vannet som regn på losiden, men beholdt varmen kondensasjonen ga. Derfor kommer den ned varmere enn den gikk opp."
      />
      <p>
        I praksis merkes føn på tre måter: temperaturen kan stige raskt, luften blir uvanlig tørr,
        og vinden er kastevill fordi den skyter ned lesiden i støt. Føn kan smelte snø på kort tid,
        tørke ut skog og gi høy skogbrannfare om våren.
      </p>
      <p>
        Vestavind inn mot Vestlandet treffer losiden av Langfjella. Vestlandet får nedbøren. Fønen
        ligger i le: østlandsbygdene og dalene øst for fjellet, Østerdalen og Gudbrandsdalen. Indre
        Østlandet kan være 10 °C varmere enn kysten samme dag. Snur vinden til østavind, snur også
        kartet: da er det Vestlandet som får føn.
      </p>

      <PhotoFigure
        src="/images/fig-fon.jpg"
        alt="Vestavind mot Langfjella: regn og skyer i lo til venstre, sol og tørr dal i le til høyre"
        heading="Føn: nedbør i lo, varm og tørr i le"
        caption="Følg én luftpakke fra venstre mot høyre. Opp losiden: den avkjøles, dampen kondenserer, og kondensasjonen varmer luften mens regnet faller ut på Vestlandet. Over kammen er vannet borte, men varmen er igjen. Ned lesiden: ingen dråper å fordampe, så oppvarmingen blir stående. Den lander varmere og tørrere enn den startet."
        arrows={[
          { d: "M 16 44 L 36 22", tone: "low", width: 1.3 },
          { d: "M 39 21 L 54 17", tone: "fg", width: 1.1, dash: true },
          { d: "M 57 18 L 78 38", tone: "warm", width: 1.35 },
        ]}
        marks={[
          { x: 4, y: 20, n: "1", text: "Loside · opp, regn faller", tone: "low" },
          { x: 47, y: 22, n: "2", text: "Vannet borte, varmen igjen", tone: "fg", align: "center" },
          { x: 96, y: 54, n: "3", text: "Leside · varm og tørr", tone: "warm", align: "right" },
        ]}
        points={[
          {
            n: "1",
            label:
              "Luften stiger og avkjøles. Dampen kondenserer, kondensasjonen varmer luften, og regnet faller på Vestlandet.",
          },
          {
            n: "2",
            label:
              "Byttehandelen: vannet forlot luften som regn, men varmen den fikk, er fortsatt der.",
          },
          {
            n: "3",
            label:
              "Ingen dråper å fordampe på vei ned, så oppvarmingen blir stående. Østerdalen og Gudbrandsdalen får føn.",
          },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Katabatisk vind</h2>
      <p>
        Katabatisk vind er kald, tett luft som renner nedover is eller fjellsider fordi
        tyngdekraften trekker den. Over snø og is stråler bakken varme ut mot himmelen. Luften like
        over blir kald og tett, og tung luft renner nedover omtrent som vann gjør.
      </p>
      <p>
        Også denne luften varmes noen grader av trykket på vei ned. Forskjellen fra føn er at den
        aldri fikk noe varmetilskudd fra kondensasjon underveis. Den startet så kald at den fortsatt
        er kald når den kommer ned.
      </p>
      <OrdBoks
        ord="Katabatisk"
        barn="Kald, tett luft som renner ned is eller fjell av tyngdekraft."
      />
      <p>
        Skill de to. Føn: luften løftes over et fjell, mister vannet som regn i lo, og kommer ned
        varm. Katabatisk: kald luft renner nedover av egen vekt, uten regn og uten varmetilskudd.
        Begge kalles fallvind i dagligtale. I geofag 2 er fallvind uten orografisk nedbør
        katabatisk.
      </p>
      <p>
        Norske eksempler: kaldluft fra høyfjellet ned daler, og utstrømning fra platåbreene
        Svartisen og Folgefonna. Samme fysikk på lesiden av isdekker på Grønland og i Antarktis.
        Katabatisk kaldluft samles i dalbunnen og kan bygge inversjon. Føn bryter inversjoner.
        Katabatisk bygger dem.
      </p>

      <PhotoFigure
        src="/images/fig-katabatisk.jpg"
        alt="Platåbre med kald tåke som renner ned isen og samles som inversjon i dalbunnen"
        heading="Katabatisk: kald luft renner av tyngdekraft"
        caption="Luften avkjøles ved utstråling over snø og is. Den blir tett og renner ned av tyngdekraft. Den trenger ikke kondensasjon. På vei ned kan den varmes noen grader, men den starter så kald at den fortsatt er kald ved foten. Nedsynkingen i seg selv gir ikke skyer. Tåka i dalbunnen er kaldluft som samler seg og bygger inversjon — ikke luft som løftes."
        arrows={[
          { d: "M 34 16 L 50 40", tone: "cold", width: 1.4 },
          { d: "M 52 42 L 62 50", tone: "cold", width: 1.2 },
        ]}
        marks={[
          { x: 4, y: 16, n: "1", text: "Avkjøling over is", tone: "cold" },
          { x: 54, y: 50, n: "2", text: "Kald luft renner", tone: "cold" },
          { x: 96, y: 84, n: "3", text: "Kald i dalbunnen", tone: "cold", align: "right" },
        ]}
        points={[
          {
            n: "1",
            label: "Utstråling over snø og is gjør luften kald og tett. Folgefonna og Svartisen.",
          },
          { n: "2", label: "Tyngdekraft: kald luft renner ned. Ingen orografisk nedbør trengs." },
          {
            n: "3",
            label:
              "Luften er kald ved foten. Den samles i dalbunnen og kan bygge inversjon. Føn bryter inversjoner. Katabatisk bygger dem.",
          },
        ]}
      />

      <Callout title="Vanlige misforståelser">
        <p>
          Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen.
        </p>
        <p>
          Skyene i et høytrykk blåser ikke bort. De fordamper, fordi synkende luft varmes og relativ
          fukt faller.
        </p>
        <p>
          Fønen er ikke varm fordi den kommer fra et varmt sted. Den er varm fordi vannet falt ut
          som regn på losiden, mens varmen kondensasjonen ga, ble igjen i luften.
        </p>
        <p>
          Føn er ikke katabatisk fallvind. Vestavind inn mot Vestlandet treffer losiden. Fønen
          ligger i le, øst for Langfjella.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Lufttrykk" def="Vekten av luftsøylen over. Faller med høyden." />
        <Term name="Lavtrykk" def="Et område med lavere trykk enn omgivelsene." />
        <Term name="Høytrykk" def="Et område med høyere trykk enn omgivelsene." />
        <Term
          name="Tropopause"
          def="Skillet mot stratosfæren, der temperaturen begynner å øke med høyden og stigningen stopper."
        />
        <Term
          name="Relativ fukt"
          def="Hvor mye damp luften har, delt på hvor mye den har plass til. Faller når luften varmes."
        />
        <Term
          name="Latent varme"
          def="Varmen som frigjøres når damp blir dråper. Den blir igjen i luften."
        />
        <Term
          name="Returstrøm"
          def="Luften tilbake i høyden. Uten den stopper kretsløpet seg selv."
        />
        <Term
          name="Føn"
          def="Varm, tørr lesidevind. Vannet falt ut som regn i lo, varmen ble igjen."
        />
        <Term
          name="Katabatisk"
          def="Kald, tett luft som renner ned is eller fjell av tyngdekraft."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva betyr det at tallene på værkartet er relative?",
            options: [
              "1013 hPa er alltid høytrykk.",
              "Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen.",
              "Lavtrykk betyr alltid under 1000 hPa.",
              "Høytrykk er den høyeste verdien som finnes i atmosfæren.",
            ],
            answer: 1,
            explain:
              "Tallene er alltid relative. Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen.",
          },
          {
            prompt: "Hva skjer når vestavind treffer Vestlandet og Langfjella?",
            options: [
              "Vestlandet ligger i le og får føn.",
              "Vestlandet treffer losiden og får orografisk nedbør. Fønen ligger øst for fjellet.",
              "Hele Sør-Norge får katabatisk fallvind.",
              "Østlandet får all nedbøren, Vestlandet ligger i le.",
            ],
            answer: 1,
            explain:
              "Vestavind inn mot Vestlandet treffer losiden av Langfjella. Vestlandet får orografisk nedbør. Fønen ligger i le: Østerdalen og Gudbrandsdalen. Østavind kan gi føn på Vestlandet.",
          },
          {
            prompt: "Hvorfor er fønen varmere i le enn luften var på samme høyde på losiden?",
            options: [
              "Fordi lesiden får mer sol.",
              "Fordi vannet falt ut som regn i lo, mens varmen kondensasjonen ga, ble igjen i luften.",
              "Fordi luften henter varme fra fjellet den blåser over.",
              "Fordi luften går fortere ned enn den gikk opp.",
            ],
            answer: 1,
            explain:
              "Kondensasjonen i lo frigjorde latent varme til luften. Regnet tok vannet med seg, men varmen ble igjen. På vei ned er det ingen dråper å fordampe, så oppvarmingen blir stående.",
          },
          {
            prompt: "Hvorfor forsvinner skyene i et høytrykk?",
            options: [
              "Vinden blåser dem bort.",
              "Luften synker og varmes, så relativ fukt faller og dråpene fordamper.",
              "Fordi høytrykk betyr varmt vær.",
              "Fordi det ikke finnes vanndamp i luften i et høytrykk.",
            ],
            answer: 1,
            explain:
              "Synkende luft får ikke ny damp, men den varmes. Da har den plass til mer damp enn den har, relativ fukt faller, og dråpene i skyen fordamper.",
          },
          {
            prompt: "Hvorfor må sjøbrisen ha en returstrøm i høyden?",
            options: [
              "For at vinden skal kunne snu om natten.",
              "Fordi luft som strømmer inn ved bakken, må ut igjen oppe — ellers hoper den seg opp og brisen stanser seg selv.",
              "Fordi corioliseffekten krever det.",
              "For å frakte nedbøren ut mot havet.",
            ],
            answer: 1,
            explain:
              "Returstrømmen lukker kretsløpet. Den stigende luften over land frakter luften tilbake mot havet oppe, den synker der, og fyller på sjøbrisen nede.",
          },
          {
            prompt: "Hva er forskjellen på føn og katabatisk vind i geofag 2?",
            options: [
              "Begge er det samme: varm fallvind.",
              "Føn: luft løftes, nedbør i lo, varm i le. Katabatisk: kald luft renner. Fallvind uten orografisk nedbør er katabatisk.",
              "Katabatisk er alltid varm. Føn er alltid kald.",
              "Føn dannes bare over is, katabatisk bare over hav.",
            ],
            answer: 1,
            explain:
              "Skill de to. Føn: luft løftes, nedbør i lo, varm i le. Katabatisk: kald luft renner. I geofag 2 er fallvind uten orografisk nedbør katabatisk.",
          },
        ]}
      />
    </TopicLayout>
  );
}
