import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/hoytrykk-lavtrykk")({
  component: TrykkPage,
});

function TrykkPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Høytrykk og lavtrykk"
      lead="Luft har vekt. Der det er mer luft over deg, er trykket høyere. Vind er luft som strømmer fra høytrykk mot lavtrykk. Været følger av om lufta stiger eller synker. Dette er grunnmuren før du møter det globale vindsystemet."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      videoTopic="høytrykk og lavtrykk"
      next={{ to: "/tema/vindsystemet", label: "Neste: Vindsystemet" }}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Luft har vekt</h2>
      <p>
        Du merker det ikke, men du sitter under en søyle av luft som strekker seg opp til
        verdensrommet. Søylen veier. Det trykket kaller vi lufttrykk. Der søylen er tyngre — mer
        luft over deg — er trykket høyere. Der den er lettere, er trykket lavere.
      </p>
      <OrdBoks
        ord="Lufttrykk"
        barn="Vekten av lufta over et sted. Høyt trykk betyr mer luft stablet over deg. Lavt trykk betyr mindre. Forskjell i trykk er det som setter lufta i bevegelse."
      />

      <PhotoFigure
        src="/images/fig-luftsoyle.jpg"
        alt="Glødende luftsøyle over et landskap, tett nede og tynn mot verdensrommet"
        heading="Søylen over hodet ditt"
        caption="Lufta er tettest nede. Høyt oppe er det lite igjen. Trykket du kjenner, er vekten av alt som ligger over deg."
        arrows={[{ d: "M 50 12 L 50 46", tone: "warm", width: 1.4 }]}
        marks={[
          { x: 54, y: 10, n: "1", text: "Tynn luft mot rommet", tone: "cold" },
          { x: 54, y: 48, n: "2", text: "Tyngst ved bakken", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Jo høyere, desto mindre luft over deg — lavere trykk." },
          { n: "2", label: "Ved bakken er søylen lengst. Trykket er størst." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Lavtrykk: luft stiger
      </h2>
      <p>
        Når luft varmes, utvider den seg og blir lettere. Da stiger den. Der lufta stiger, blir
        det «mindre luft» igjen nede — trykket synker. Vi tegner det som L på værkartet.
      </p>
      <p>
        På vei opp avkjøles lufta. Vanndamp blir til skyer og ofte regn. Derfor er lavtrykk
        vanligvis det urolige været: byger, frontregn, storm.
      </p>
      <OrdBoks
        ord="Kondensasjon"
        barn="Når vanndamp blir til vanndråper. Luft som stiger, avkjøles. Da kan den ikke holde like mye damp, og det blir skyer."
      />
      <OrdBoks
        ord="Lavtrykk"
        barn="Et område der luft stiger og trykket ved bakken er lavere enn rundt. Ofte skyer og nedbør. På værkart merket L."
      />

      <PhotoFigure
        src="/images/fig-lavtrykk-snitt.jpg"
        alt="Tverrsnitt av et lavtrykk: luft inn langs havet, tårnhøy byge, regn"
        heading="Lavtrykk sett fra sida"
        caption="Luft strømmer inn nede, stiger i midten, blir til byger og sprer seg høyt oppe. Det er hele lavtrykket i ett snitt."
        arrows={[
          { d: "M 12 46 L 38 42", tone: "low", width: 1.25 },
          { d: "M 88 46 L 62 42", tone: "low", width: 1.25 },
          { d: "M 50 40 L 50 14", tone: "low", width: 1.4 },
        ]}
        marks={[
          { x: 6, y: 52, n: "1", text: "Inn nede", tone: "low" },
          { x: 42, y: 12, n: "2", text: "Opp og til skyer", tone: "low" },
        ]}
        points={[
          { n: "1", label: "Luft strømmer inn mot L langs bakken." },
          { n: "2", label: "I sentrum stiger den. Avkjøling gir skyer og regn." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Høytrykk: luft synker
      </h2>
      <p>
        Når luft synker, fylles det på mer luft over bakken. Trykket stiger. Vi tegner H. Synkende
        luft varmes og tørker. Skyene løses opp. Derfor er høytrykk ofte det stille været: klar
        himmel, svak vind.
      </p>
      <OrdBoks
        ord="Høytrykk"
        barn="Et område der luft synker og trykket ved bakken er høyere enn rundt. Ofte klar luft. På værkart merket H."
      />

      <PhotoFigure
        src="/images/fig-hoytrykk-snitt.jpg"
        alt="Tverrsnitt av høytrykk: luft synker fra klar himmel og sprer seg ut over stille hav"
        heading="Høytrykk sett fra sida"
        caption="Speilbildet av lavtrykket: luft synker, tørker, og strømmer ut langs bakken. Derfor ofte klarvær og svak vind."
        arrows={[
          { d: "M 50 10 L 50 32", tone: "warm", width: 1.4 },
          { d: "M 48 36 L 18 44", tone: "warm", width: 1.2 },
          { d: "M 52 36 L 82 44", tone: "warm", width: 1.2 },
        ]}
        marks={[
          { x: 42, y: 12, n: "H", text: "Synker", tone: "warm" },
          { x: 6, y: 48, n: "1", text: "Ut nede", tone: "warm" },
        ]}
        points={[
          { n: "H", label: "Synkende luft = høytrykk ved bakken. Skyene løses opp." },
          { n: "1", label: "Luft strømmer ut fra H langs bakken — mot lavtrykk." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-hoytrykk-fjell.jpg"
        alt="Skyfri vinterdag over snødekte norske fjell"
        heading="Slik kjenner du det i Norge"
        caption="Et vinterhøytrykk over innlandet: knallklar himmel, lite vind — og ofte bitende kulde. Høytrykk er ikke «varmt vær»."
        arrows={[{ d: "M 30 10 L 30 28", tone: "warm", width: 1.2 }]}
        marks={[{ x: 6, y: 12, n: "H", text: "Klar, stillestående luft", tone: "warm" }]}
        points={[{ n: "H", label: "Synkende luft gir opphold. Om vinteren kan bakken stråle bort varmen uforstyrret." }]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Vind: fra H mot L
      </h2>
      <p>
        Lufta vil utjevne. Den strømmer fra der trykket er høyt, mot der det er lavt. Det er
        vinden, i bunnen. Jo større trykkforskjell, desto sterkere vind.
      </p>
      <p>
        I neste temaer ser du at jorda roterer, så vinden sjelden går rett fra H til L. Men
        retningen starter der: ut av høytrykket, inn i lavtrykket.
      </p>
      <OrdBoks
        ord="Vind"
        barn="Luft i bevegelse, drevet av trykkforskjell. Fra høytrykk mot lavtrykk. Rotasjonen bøyer banen — det tar vi i Coriolis."
      />

      <PhotoFigure
        src="/images/fig-vind-mot-lavtrykk.jpg"
        alt="Solbelyst gress i forgrunnen, mørk storm over havet i det fjerne"
        heading="Lufta søker mot lavtrykket"
        caption="Den lyse, tørre sida er nærmere høytrykk. Stormen er lavtrykk. Vinden peker dit trykket er lavere."
        arrows={[
          { d: "M 18 42 L 48 32", tone: "teal", width: 1.35 },
          { d: "M 38 48 L 62 36", tone: "teal", width: 1.2 },
        ]}
        marks={[
          { x: 4, y: 58, n: "H", text: "Høytrykk", tone: "warm" },
          { x: 58, y: 18, n: "L", text: "Lavtrykk", tone: "low" },
        ]}
        points={[
          { n: "H", label: "Høytrykk: luft strømmer ut." },
          { n: "L", label: "Lavtrykk: luft strømmer inn og stiger." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-trykk-splitt.jpg"
        alt="Samme type kyst i to slags vær: storm og klar himmel"
        heading="To utfall av samme luft"
        caption="Venstre: luft stiger. Høyre: luft synker. Forskjellen er trykk, ikke «at det er kyst»."
        arrows={[
          { d: "M 22 40 L 22 16", tone: "low", width: 1.3 },
          { d: "M 78 12 L 78 34", tone: "warm", width: 1.3 },
        ]}
        marks={[
          { x: 4, y: 14, n: "L", text: "Stiger → skyer og regn", tone: "low" },
          { x: 58, y: 14, n: "H", text: "Synker → klar luft", tone: "warm", align: "left" },
        ]}
        points={[
          { n: "L", label: "Lavtrykk: opp, avkjøling, nedbør." },
          { n: "H", label: "Høytrykk: ned, oppvarming, opphold." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Det du merker i Norge
      </h2>
      <p>
        Været vårt er sjelden ett fast H eller L. Lavtrykk vandrer inn fra Atlanteren langs
        polarfronten og gir skiftende dager. Av og til legger et høytrykk seg over Skandinavia og
        «låser» været i ei uke: knallklar vinterkulde, eller stille sommertørke.
      </p>
      <p>
        Når du har dette, er neste steg hvorfor H og L ligger der de ligger på kloden — og hvorfor
        Norge får vestavind i stedet for passat.
      </p>

      <Callout title="Huskeregel">
        <p>
          L: luft opp, skyer, innstrømming. H: luft ned, klarvær, utstrømming. Vind går fra H mot
          L. Rotasjonen tar vi etterpå.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Høytrykk er ikke «varm luft» og lavtrykk er ikke «kald luft». Et vinterhøytrykk kan være
          iskaldt. Et lavtrykk kan føre mild luft. Det som teller, er om lufta stiger eller synker.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Lufttrykk" def="Vekten av lufta over et sted." />
        <Term name="Lavtrykk (L)" def="Luft stiger. Ofte skyer og nedbør." />
        <Term name="Høytrykk (H)" def="Luft synker. Ofte klar luft." />
        <Term name="Vind" def="Luft som strømmer fra H mot L." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er den enkleste forskjellen på H og L ved bakken?",
            options: [
              "H er alltid varmt, L er alltid kaldt.",
              "Ved L stiger lufta, ved H synker den.",
              "H ligger bare over hav, L bare over land.",
              "L har mer oksygen.",
            ],
            answer: 1,
            explain: "Stigende luft gir lavtrykk og ofte skyer. Synkende luft gir høytrykk og ofte klarvær.",
          },
          {
            prompt: "Hvilken vei går vinden, før vi tar med jordrotasjon?",
            options: [
              "Fra L mot H.",
              "Fra H mot L.",
              "Alltid vestover.",
              "Bare opp og ned, aldri sidelengs.",
            ],
            answer: 1,
            explain: "Lufta søker å jevne ut. Fra høyere mot lavere trykk. Coriolis bøyer den etterpå.",
          },
          {
            prompt: "Hvorfor kan et vinterhøytrykk over Østlandet gi knallkulde?",
            options: [
              "Fordi høytrykk alltid er kaldt.",
              "Synkende luft gir klar himmel. Bakken stråler bort varme om natta, og det er lite vind som blander.",
              "Fordi Golfstrømmen snur.",
              "Fordi polarcellen forsvinner om vinteren.",
            ],
            answer: 1,
            explain: "Høytrykk betyr synkende, ofte stillestående luft — ikke automatisk varme.",
          },
        ]}
      />
    </TopicLayout>
  );
}
