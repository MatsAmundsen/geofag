import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure, PhotoPair } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/coriolis")({
  component: CoriolisPage,
});

function CoriolisPage() {
  return (
    <TopicLayout
      kicker="Jordrotasjon"
      title="Corioliseffekten"
      lead="Luft og vann går ikke rett fra høytrykk til lavtrykk. Fordi jorda snurrer under dem, ser banene ut til å bøye av — til høyre i nord, til venstre i sør. Uten den bøyen ville verken passater, orkaner eller Golfstrømmen sett slik ut."
      banner="/images/banner-coriolis.jpg"
      bannerAlt="Jorda med spiralformede syklonskyer"
      videoTopic="Corioliseffekten"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/havstrommer", label: "Neste: Havstrømmer" }}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Ikke en usynlig hånd som drar
      </h2>
      <p>
        Corioliseffekten er ikke en «ekte» kraft slik tyngdekraften er. Den dukker opp fordi vi
        beskriver bevegelse fra en jord som roterer. Sett fra verdensrommet går lufta mer rett.
        Sett fra bakken svinger den.
      </p>
      <p>
        Samme idé som på en karusell: kaster du ballen rett mot en på motsatt side, lander den ved
        siden av. Ballen gikk rett. Plattformen dreide under den.
      </p>
      <OrdBoks
        ord="Corioliseffekten"
        barn="At bevegelser i luft og hav ser ut til å bøye av fordi jorda roterer under dem. Til høyre på nordlig halvkule, til venstre på sørlig."
      />

      <PhotoFigure
        src="/images/fig-karusell.jpg"
        alt="Karusell sett ovenfra, plattformen sløret av rotasjon"
        heading="Karusellen er modellen"
        caption="Du siktet rett over plata. Plata snudde under ballen. På jorda er plata hele planeten."
        arrows={[
          { d: "M 22 40 L 72 22", tone: "fg", width: 1.1, dash: true },
          { d: "M 24 42 Q 48 52 78 28", tone: "teal", width: 1.35 },
        ]}
        marks={[
          { x: 6, y: 16, n: "1", text: "Du siktet rett", tone: "fg" },
          { x: 48, y: 54, n: "2", text: "Banen bøyes", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Stiplet: der du siktet." },
          { n: "2", label: "Heltrukken: der det lander, fordi underlaget dreide." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Ekvator suser, polene krabber
      </h2>
      <p>
        Hele jorda bruker ett døgn på én runde. Men omkretsen er størst ved ekvator, så farten
        østover er størst der. I Norge er den omtrent halvparten. Ved polen er den null: punktet
        snurrer bare rundt seg selv.
      </p>
      <p>
        Luft som går mot polen, tar med seg «for mye» østlig fart. Bakken under den roterer
        saktere, så lufta kommer øst for målet. På nordlig halvkule oppleves det som avbøyning til
        høyre. Mot ekvator er det omvendt — men fortsatt til høyre i nord, til venstre i sør.
      </p>

      <PhotoFigure
        src="/images/fig-rotasjon.jpg"
        alt="Jorda spinner: ekvator sløret av fart, polene skarpe og stille"
        heading="Samme døgn, ulik fart"
        caption="Ekvator har lengst vei på 24 timer og sløres av farten. Polene står nesten stille. Luft som bytter bredde, tar farten med seg."
        arrows={[{ d: "M 58 40 L 86 40", tone: "warm", width: 1.4 }]}
        marks={[
          { x: 6, y: 50, n: "1", text: "Ekvator: raskest", tone: "warm" },
          { x: 62, y: 22, n: "2", text: "Norge: omtrent halvparten", tone: "teal" },
          { x: 48, y: 8, n: "3", text: "Polen: i ro", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Ekvator: høy fart østover." },
          { n: "2", label: "Norge: omtrent halvparten." },
          { n: "3", label: "Polen: i ro." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fra høytrykk til lavtrykk — men ikke rett
      </h2>
      <p>
        Luft vil gå fra høytrykk mot lavtrykk. Coriolis dreier den underveis. Høyt oppe, der
        bakkefriksjon betyr lite, kan de to kreftene bli like store. Da går vinden langs
        trykklinjene, ikke på tvers av dem.
      </p>
      <OrdBoks
        ord="Geostrofisk vind"
        barn="Når «dra mot lavtrykk» og «bøy av på grunn av rotasjon» tar hverandre. Vinden følger da trykklinjene. God beskrivelse for jetstrøm og store havstrømmer. Dårligere nede ved bakken, der friksjon bøyer vinden inn mot lavtrykket."
      />

      <PhotoFigure
        src="/images/fig-vind-mot-lavtrykk.jpg"
        alt="Solbelyst forgrunn og mørk storm i det fjerne"
        heading="Ikke rett mot L"
        caption="Uten rotasjon ville pila gått rett mot stormen. Med rotasjon bøyes den til høyre i nord — og ender med å gå langs trykkforskjellen, ikke rett inn i den."
        arrows={[
          { d: "M 16 44 L 62 28", tone: "fg", width: 1.1, dash: true },
          { d: "M 16 46 Q 40 50 68 30", tone: "teal", width: 1.35 },
        ]}
        marks={[
          { x: 4, y: 58, n: "H", text: "H", tone: "warm" },
          { x: 62, y: 16, n: "L", text: "L", tone: "low" },
          { x: 28, y: 58, text: "bøyd til høyre", tone: "teal" },
        ]}
        points={[
          { n: "H", label: "Stiplet: rett fra H mot L, uten rotasjon." },
          { n: "L", label: "Heltrukken: avbøyd til høyre i nord." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Sterkere mot polene, borte ved ekvator
      </h2>
      <p>
        Effekten er null ved ekvator og øker mot polene. Derfor dannes ikke tropiske orkaner på
        ekvator — de trenger avbøyningen for å spinne. I Norge er den sterk. Raskere strøm gir
        også sterkere avbøyning.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hvorfor passaten kommer fra nordøst
      </h2>
      <p>
        Hadley-cellen vil sende luft rett mot ekvator. Coriolis bøyer den til høyre i nord. Vinden
        får en østlig komponent og blir nordøstpassat. I sør blir speilbildet sørøstpassat.
      </p>

      <PhotoFigure
        src="/images/fig-passat.jpg"
        alt="Rekker av småpassatskyer over varmt hav i kveldslys"
        heading="Nordøstpassaten synlig som skyrekker"
        caption="Skyene driver mot ekvator, men fra nordøst — ikke rett sørfra. Det er rotasjonen som har dreid dem."
        arrows={[
          { d: "M 50 12 L 38 42", tone: "fg", width: 1.05, dash: true },
          { d: "M 72 14 L 38 40", tone: "teal", width: 1.35 },
        ]}
        marks={[
          { x: 6, y: 14, n: "1", text: "Fra nordøst mot ekvator", tone: "teal" },
        ]}
        points={[{ n: "1", label: "Uten coriolis ville dette vært en ren nord–sør-vind." }]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hvorfor lavtrykk spinner
      </h2>
      <p>
        Luft strømmer inn mot et lavtrykk og bøyes til høyre i nord. Resultatet er rotasjon mot
        klokken. Rundt høytrykk strømmer luft ut og bøyes til høyre: med klokken. I sør er det
        omvendt. Satellittbildet av en orkan er coriolis gjort synlig.
      </p>
      <OrdBoks
        ord="Syklon og antisyklon"
        barn="Syklon: lavtrykk som spinner. På nordlig halvkule mot klokken. Antisyklon: høytrykk, med klokken i nord. Orkan, tyfon og syklon er navn på det samme slags tropiske lavtrykk."
      />
      <p>
        Nyttig på værkart: stå med ryggen mot vinden i Norge — lavtrykket ligger til venstre.
      </p>

      <PhotoFigure
        src="/images/fig-syklon.jpg"
        alt="Orkan over havet med tydelig øye og spiralbånd mot klokken"
        heading="Lavtrykk sett ovenfra"
        caption="Inn mot sentrum, bøyd til høyre: mot klokken på nordlig halvkule. Øyet er der lufta synker i midten."
        arrows={[
          { d: "M 38 16 Q 22 28 30 46", tone: "low", width: 1.25 },
          { d: "M 30 46 Q 48 58 70 46", tone: "low", width: 1.25 },
          { d: "M 70 46 Q 78 28 58 16", tone: "low", width: 1.25 },
        ]}
        marks={[
          { x: 46, y: 36, n: "L", text: "Øye", tone: "low" },
          { x: 6, y: 12, n: "1", text: "Mot klokken i nord", tone: "low" },
        ]}
        points={[
          { n: "1", label: "Spiralen er avbøyning, ikke at lufta «vil» spinne." },
          { n: "2", label: "På sørlig halvkule ville spiralen gått motsatt vei." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-hoytrykk-snitt.jpg"
        alt="Høytrykk: luft synker og strømmer ut over stille hav"
        heading="Høytrykk er det stille speilbildet"
        caption="Luft strømmer ut og bøyes til høyre i nord: med klokken. Ofte lite vær — inntil det blokkerer lavtrykkene."
        arrows={[
          { d: "M 50 12 L 50 30", tone: "warm", width: 1.3 },
          { d: "M 50 34 L 22 42", tone: "warm", width: 1.15 },
          { d: "M 50 34 L 78 42", tone: "warm", width: 1.15 },
        ]}
        marks={[{ x: 42, y: 12, n: "H", text: "Ut og med klokken i Norge", tone: "warm" }]}
        points={[{ n: "H", label: "Synker i midten, strømmer ut, dreies til høyre → med klokken." }]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Derfor lyver vasken
      </h2>
      <p>
        Coriolis er svak. Den vinner bare når bevegelsen er stor og varer lenge. Et lavtrykk som
        lever i døgn, og Golfstrømmen som lever i århundrer, merker den. En kasteball og vannet i
        en vask merker den ikke. Der styrer kummens form. Toalettet spinner ikke motsatt vei sør
        for ekvator «på grunn av coriolis».
      </p>

      <PhotoPair
        heading="Skala avgjør"
        caption="Coriolis taper på meter og sekunder. Den vinner på hundrevis av kilometer og døgn. Derfor lyver vasken, mens orkanen forteller sannheten."
        left={{
          src: "/images/fig-vask.jpg",
          alt: "Vann som virvler ned i en vask",
          title: "Vask · meter · sekunder",
          marks: [{ x: 6, y: 12, text: "Coriolis taper", tone: "fg" }],
        }}
        right={{
          src: "/images/fig-syklon.jpg",
          alt: "Orkan sett fra verdensrommet",
          title: "Orkan · 1000 km · døgn",
          arrows: [
            { d: "M 38 16 Q 22 28 30 46", tone: "low", width: 1.2 },
            { d: "M 70 46 Q 78 28 58 16", tone: "low", width: 1.2 },
          ],
          marks: [{ x: 6, y: 12, text: "Coriolis styrer", tone: "low" }],
        }}
      />

      <Callout title="Til eksamen">
        <p>
          Kompetansemålet vil ha konsekvenser av jordas rotasjon. Bind coriolis til noe konkret:
          passatenes retning, lavtrykkets spinn, eller at havstrømmer i nord dreier mot høyre.
          Si at effekten er borte ved ekvator og sterk i Norge.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Coriolis drar ikke i stille vann som en magnet. Den avbøyer bevegelse som allerede
          finnes. Nær bakken bøyer friksjon vinden inn mot lavtrykket — derfor strømmer det inn
          mot L, ikke bare rundt.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Coriolis" def="Avbøyning på grunn av jordrotasjon. Høyre i nord, venstre i sør." />
        <Term name="Geostrofisk vind" def="Når trykk og coriolis balanserer. Vind langs trykklinjene." />
        <Term name="Syklon" def="Lavtrykk som spinner. Mot klokken i Norge." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Til hvilken side bøyes luft på nordlig halvkule, og hva skjer ved ekvator?",
            options: [
              "Til venstre; sterkest ved ekvator.",
              "Til høyre; ingen avbøyning ved ekvator.",
              "Alltid mot vest.",
              "Til høyre bare om natten.",
            ],
            answer: 1,
            explain: "Høyre i nord, venstre i sør. Ved ekvator er effekten null — derfor ingen orkaner der.",
          },
          {
            prompt: "Hvorfor spinner et lavtrykk mot klokken i Norge?",
            options: [
              "Fordi jordas kjerne spinner den veien.",
              "Luft strømmer inn mot L og bøyes til høyre.",
              "Fordi jetstrømmen alltid går øst–vest.",
              "Det gjør det ikke.",
            ],
            answer: 1,
            explain: "Innstrømning + høyreavbøyning = mot klokken rundt L. Høytrykk spinner motsatt vei.",
          },
          {
            prompt: "Hvorfor gjelder ikke coriolis for vasken, men for Golfstrømmen?",
            options: [
              "Vasken står stille.",
              "Effekten krever stor avstand og lang tid. En vask er for liten og for raskt over.",
              "Bare saltvann påvirkes.",
              "Golfstrømmen ligger nærmere polen enn vasken.",
            ],
            answer: 1,
            explain: "Skala avgjør. En havstrøm er tusenvis av kilometer og lever i årevis.",
          },
        ]}
      />
    </TopicLayout>
  );
}
