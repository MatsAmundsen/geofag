import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  ClimateBeltsDiagram,
  HadleyCloseupDiagram,
  InsolationDiagram,
  JetStreamDiagram,
  OneVsThreeCellsDiagram,
  PolarFrontNorwayDiagram,
  SurfaceWindsDiagram,
  WindCellsDiagram,
} from "@/components/diagrams";
import { WindSystemModel } from "@/components/models/wind-system-model";
import { PhotoFigure, PhotoPair } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vindsystemet")!;

export const Route = createFileRoute("/tema/vindsystemet")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vindsystemet",
    }),
  component: VindsystemetPage,
});

function VindsystemetPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Det globale vindsystemet"
      lead="Sola varmer tropene mer enn polene. Lufta flytter overskuddsvarmen nord- og sørover. Jordrotasjonen tvinger flyttingen inn i tre store kretsløp — og det er disse som gir ørken, regnskog og vestavinden over Norge."
      banner="/images/banner-vind.jpg"
      bannerAlt="Jordas atmosfære sett fra bane"
      prev={{ to: "/tema/hoytrykk-lavtrykk", label: "Forrige: Høytrykk og lavtrykk" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER.vindsystemet}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Motoren: sola treffer skjevt
      </h2>
      <p>
        Du har sett at stigende luft gir lavtrykk og skyer, synkende luft gir høytrykk og klarvær.
        Nå: hvorfor ligger disse beltene der de ligger på kloden?
      </p>
      <p>
        Ved ekvator står sola høyt. Strålene treffer nesten rett på, på et lite areal. Mot polene
        treffer de skrått og smøres utover. Tropene får derfor mer energi enn de sender ut igjen.
        Polene får mindre (NASA, u.å.). Uten luft og hav ville tropene blitt stadig varmere og polene
        stadig kaldere.
      </p>
      <OrdBoks
        ord="Strålingsbalanse"
        barn="Forskjellen mellom energien jorda tar imot fra sola, og varmen den sender ut igjen. Globalt går det i null over tid. Lokalt gjør det ikke det — og da må energien flyttes."
      />

      <InsolationDiagram />

      <p>
        Varm luft ved ekvator utvider seg, blir lettere og stiger. Det gir lavtrykk. Når lufta
        stiger, avkjøles den, vanndampen blir til skyer og regn. Resultatet er det tropiske
        regnbelte.
      </p>

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Tre kretsløp, ikke ett
      </h2>
      <p>
        På en jord som ikke roterte, kunne man tenke seg ett stort kretsløp: opp ved ekvator, ned
        ved polen. Jorda roterer. Lufta rekker ikke polen før den bøyes av og synker. Derfor får
        hver halvkule tre kretsløp i stedet for ett (NOAA, u.å.).
      </p>
      <p>
        Hadley og polarcellen er «motorer»: luft stiger der det er varmt (eller møtes langs
        polarfronten) og synker der det er kaldere. Ferrel-cellen i midten er annerledes. Den er
        termisk indirekte — den drives av de vandrende lavtrykkene, ikke av at bakken under er
        varmest. Derfor ser du sjelden en jevn Ferrel-sløyfe på satellittbildet. Du ser stormene.
      </p>
      <OrdBoks
        ord="Termisk indirekte"
        barn="Et kretsløp som ikke drives av at bakken under er varmest. Ferrel-cellen drives av stormene, ikke av soloppvarming der Norge ligger."
      />

      <OneVsThreeCellsDiagram />
      <WindCellsDiagram />
      <OrdBoks
        ord="Hadley-, Ferrel- og polarcellen"
        barn="Tre store, gjennomsnittlige kretsløp i lufta på hver halvkule. De er et middelbilde over uker og måneder — ikke tre faste rør du ser på satellittbildet i dag."
      />

      <WindSystemModel />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hadley-cellen: regn og ørken i samme sløyfe
      </h2>
      <p>
        Følg lufta. Ved ekvator er den varm og fuktig. Den stiger, blir til byger, og er tørrere når
        den kommer opp. Så strømmer den mot 30° bredde og synker. Synkende luft varmes og tørker.
        Under dette beltet ligger Sahara, Kalahari og de australske ørkenene. Ørkenene ligger der
        fordi lufta synker — ikke fordi det «mangler vann i bakken» som første årsak.
      </p>
      <p>
        Nede ved bakken strømmer lufta tilbake mot ekvator. Rotasjonen dreier den, og vi får
        nordøstpassat i nord og sørøstpassat i sør.
      </p>
      <OrdBoks
        ord="Passat"
        barn="Stødig vind mot ekvator mellom ørkenbeltet og det tropiske regnbelte. I nord kommer den fra nordøst, i sør fra sørøst."
      />

      <HadleyCloseupDiagram />
      <SurfaceWindsDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Klimabeltene er cellene skrevet på bakken
      </h2>
      <p>
        Gå fra ekvator mot nord, og du går gjennom et mønster som gjentar luftas opp og ned: vått,
        tørt, vått, så kaldt og tørt. Det er ikke tilfeldig geografi. Det er Hadley, Ferrel og
        polarcellen, avsatt som klima.
      </p>
      <p>
        <strong>Ved ekvator</strong> stiger luft i Hadley-cellen. Vanndampen blir til byger nesten
        daglig. Amazonas, Kongo og Indonesia ligger her. <strong>Rundt 30°</strong> synker den samme
        lufta, tørr og varm. Sahara, Arabia og de australske ørkenene er synkende luft — ikke
        «mangel på grunnvann» som første årsak. <strong>Rundt 40–60°</strong> ligger
        vestavindsbeltet, i Ferrel-sonen. Vandrende lavtrykk og polarfront gir milde, fuktige
        vestkyster: Norge, Chile, New Zealand. <strong>Mot polen</strong> synker kald luft. Lite
        vanndamp, tørt og iskaldt.
      </p>
      <OrdBoks
        ord="Klimabelte"
        barn="Et belte av typisk klima rundt jorda, styrt av om lufta i gjennomsnitt stiger eller synker. Vær er det som skjer i dag. Klima er mønsteret over årtier."
      />

      <ClimateBeltsDiagram />

      <PhotoFigure
        src="/images/fig-belter-globus.jpg"
        alt="Jorda fra bane med grønt ekvatorbelte, ørkenbelte, stormer mot Skandinavia og polaris"
        heading="Samme belter, viklet rundt kloden"
        caption="Det du så som en vandring, er ringer rundt jorda. Norge sitter i det stormfulle beltet mot nord — ikke i ørkenen, ikke i tropene."
        marks={[
          { x: 6, y: 48, n: "1", text: "Tropisk grønt", tone: "teal" },
          { x: 4, y: 32, n: "2", text: "Ørkenbelte", tone: "warm" },
          { x: 52, y: 22, n: "3", text: "Vestavind · Norge", tone: "cold" },
          { x: 58, y: 8, n: "4", text: "Polaris", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "Regnskogbeltet følger ekvator rundt." },
          { n: "2", label: "Ørkenbeltet følger ~30° — Sahara er ett stykke av ringen." },
          { n: "3", label: "Stormbeltet treffer vestkystene på 40–60°." },
          { n: "4", label: "Isen er polarcellens bakke." },
        ]}
      />

      <p>
        Beltene er et middelbilde. Fjell, hav og årstid flytter grensene. Det tropiske regnbelte
        vandrer med sola gjennom året og gir savanne regn om sommeren (NOAA, u.å.). Vestlandet er
        våtere enn beltet alene skulle tilsi — fjellet løfter lufta. Labrador er kaldere enn Norge
        på samme bredde — havstrømmen er en annen. Det tar vi i hav-kapittelet.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Polarfronten og været i Norge
      </h2>
      <p>
        Rundt 60° møtes kald polarluft og mildere luft fra sør. Skillet kalles polarfronten. Langs
        den fødes vandrende lavtrykk. Vestavinden fører dem inn mot Norge.
      </p>
      <OrdBoks
        ord="Polarfronten"
        barn="Grensa mellom kald luft fra polen og mildere luft sørfra. Der temperaturforskjellen er stor, dannes lavtrykkene som gir oss «vær»."
      />
      <p>
        Når fuktig atlanterhavsluft treffer Vestlandet, tvinges den til værs av fjellene, avkjøles
        og gir regn. Østlandet ligger oftere i leside: lufta har mistet fukt, og den synker og
        tørker på vei ned. Forskjellen mellom Bergen og Hamar er vestavind, polarfront og fjell —
        ikke bare «nærhet til kysten».
      </p>
      <OrdBoks
        ord="Loside og leside"
        barn="Loside: siden fjellet vender mot vinden, der lufta løftes og det regner. Leside: baksiden, der lufta synker og tørker."
      />
      <OrdBoks
        ord="Orografisk nedbør"
        barn="Nedbør som kommer fordi luft tvinges opp av fjell. Vestlandet er læreboka. Leside er baksiden, der det ofte er tørrere."
      />

      <PolarFrontNorwayDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Jetstrømmen</h2>
      <p>
        Høyt oppe, der forskjellen mellom tropisk og polar luft er størst, går en smal, sterk
        vestlig luftstrøm: polarfrontjeten. Den svinger. Ligger den sør for Norge, får vi kald
        polarluft. Ligger den nord for, kommer milde atlantiske luftmasser inn. Den styrer hvor
        lavtrykkene går denne uka.
      </p>
      <p>
        Den subtropiske jetstrømmen ligger nærmere 30° og henger sammen med Hadley-cellens
        nedsynking. To belter, ikke ett. Polarfrontjeten er den som betyr mest for Norge.
      </p>
      <OrdBoks
        ord="Jetstrøm"
        barn="En elv av sterk vestlig vind i 8–12 km høyde. Polarfrontjeten er den som betyr mest for været i Norge."
      />

      <JetStreamDiagram />

      <Callout title="Til eksamen og Norge">
        <p>
          Tre ledd: ujevn sol som motor, tre celler som mønster, polarfront og vestavind som Norges
          vær. Ørken = synkende luft. Vestlandet = løside i vestavindsbeltet.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Cellene er et middelbilde, ikke tre rør. Det tropiske regnbelte flytter seg med sola i
          løpet av året. Været i Norge er lavtrykk og fronter, ikke en jevn vestavind fra morgen til
          kveld.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Strålingsbalanse" def="Energi inn minus energi ut." />
        <Term name="Hadley-cellen" def="Tropisk kretsløp. Opp ved ekvator, ned ved ørkenen." />
        <Term name="Vestavindsbeltet" def="Der Norge ligger. Lavtrykk vandrer østover." />
        <Term name="Klimabelte" def="Klima-ring rundt jorda. Stiger = vått. Synker = tørt." />
        <Term name="Polarfronten" def="Skillet mellom polarluft og mildere luft." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor ligger de store ørkenene rundt 30° bredde?",
            options: [
              "Fordi det er kaldest der.",
              "Luft som har steget ved ekvator, synker der. Synkende luft tørker.",
              "Fordi jorda roterer sakte der.",
              "Fordi ozonlaget er tynnest der.",
            ],
            answer: 1,
            explain:
              "Hadley-cellen lukkes med synkende luft i subtropene. Sahara er et typeeksempel.",
          },
          {
            prompt: "Hvilken sone styrer været i Sør-Norge?",
            options: [
              "Hadley-cellen og passatene.",
              "Polarcellen alene.",
              "Vestavindsbeltet og polarfronten, i Ferrel-sonen.",
              "En egen skandinavisk celle.",
            ],
            answer: 2,
            explain: "Norge ligger i vestavindsbeltet. Lavtrykkene fødes langs polarfronten.",
          },
          {
            prompt: "Hvorfor er Bergen typisk våtere enn Hamar?",
            options: [
              "Fordi Hamar ligger nærmere Sverige.",
              "Fuktig vestavind løftes mot fjellene. Østlandet ligger oftere i leside.",
              "Fordi Mjøsa fordamper lite.",
              "Fordi polarcellen stopper ved Oslo.",
            ],
            answer: 1,
            explain: "Orografisk nedbør på Vestlandet, regnskygge mot øst.",
          },
        ]}
      />
    </TopicLayout>
  );
}
