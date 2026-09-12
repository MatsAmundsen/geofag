import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  GlobalClimateZonesDiagram,
  HadleyCloseupDiagram,
  InsolationDiagram,
  OneVsThreeCellsDiagram,
  PolarFrontNorwayDiagram,
  SurfaceWindsDiagram,
  WindCellsDiagram,
} from "@/components/diagrams";
import { WindSystemModel } from "@/components/models/wind-system-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vindsystemet")!;

const lenke = "text-primary underline-offset-2 hover:underline";

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
      kicker="Atmosfæren og storskala sirkulasjon"
      title="Det globale vindsystemet"
      lead="Hvorfor koker ikke ekvator, og hvorfor fryser ikke Norge til? Sola varmer tropene langt mer enn polene. Denne siden handler om hvordan lufta flytter den varmen — og hva det gjør med ørken, regnskog og været vårt."
      banner="/images/banner-vind.jpg"
      bannerAlt="Jordas atmosfære sett fra bane med skyformasjoner over kontinenter og hav"
      prev={{ to: "/tema/hoytrykk-lavtrykk", label: "Forrige: Høytrykk og lavtrykk" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER.vindsystemet}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Motoren: Klodens ujevne strålingsbalanse
      </h2>
      <p>
        I kapittelet om{" "}
        <Link to="/tema/hoytrykk-lavtrykk" className={lenke}>
          høytrykk og lavtrykk
        </Link>{" "}
        så du at temperaturforskjeller skaper trykkforskjeller, og at trykkforskjeller setter lufta
        i bevegelse. Nå ser vi på hele planeten: hva holder lufthavet i gang?
      </p>
      <p>
        Svaret er solas innstråling og jordas kuleform. Ved ekvator står sola høyt året rundt.
        Strålene treffer nesten loddrett på flaten, så energien samles på et lite areal. Veien
        gjennom atmosfæren er kort. I geofag kaller vi det ofte 90° innfallsvinkel: vinkelen mot
        bakken, ikke mot normalen.
      </p>
      <p>
        Mot polene treffer samme strålebunt på skrå. Energien smøres utover et større areal.
        Strålene går lengre gjennom atmosfæren, og snø og is kaster mye av lyset tilbake (høy
        albedo).
      </p>
      <p>Det gir en varig strålingsubalanse (NASA, u.å.):</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Fra ekvator til omkring 35–40°:</strong> mer kortbølget solenergi inn enn
          langbølget stråling ut. Energioverskudd.
        </li>
        <li>
          <strong>Fra omkring 35–40° til polene:</strong> mer energi ut enn inn. Energiunderskudd.
        </li>
      </ul>
      <p>
        Uten transport ville tropene blitt for varme og polene for kalde. Atmosfæren tar om lag 60
        prosent av varmeflukten mot polene, havet resten. Fordelingen skifter med breddegrad: i
        tropene bærer havet mer enn det globale snittet. Det tar vi opp i kapittelet om{" "}
        <Link to="/tema/havstrommer" className={lenke}>
          havstrømmer
        </Link>
        .
      </p>

      <OrdBoks
        ord="Strålingsbalanse"
        barn="Forskjellen mellom innkommende solstråling (kortbølget) og utgående varmestråling (langbølget). Globalt over et år er netto om lag null. Regionalt er det overskudd i tropene og underskudd mot polene. Den ubalansen driver sirkulasjonen."
      />

      <InsolationDiagram />
      <p>
        Figuren viser hvorfor samme solstråle varmer mer ved ekvator enn ved 60°: arealet den
        treffer, blir større når vinkelen slakner.
      </p>

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Fra én til tre sirkulasjonsceller
      </h2>
      <p>
        I 1735 foreslo George Hadley én stor sløyfe: opp ved ekvator, til polen i høyden, ned, og
        tilbake langs bakken.
      </p>
      <p>
        Det ville holdt hvis jorda sto stille. Jorda roterer. Når lufta i høyden går polover, dreier{" "}
        <em>corioliseffekten</em> den — mot høyre på nordlig halvkule, mot venstre på sørlig.
        Hvorfor den dreier, og hvor sterk dreiningen er, står i kapittelet om{" "}
        <Link to="/tema/coriolis" className={lenke}>
          corioliseffekten
        </Link>
        .
      </p>
      <p>
        Allerede rundt 30° er den polgående lufta dreid så mye at den blåser mot øst. Den tar med
        seg ekvators høye rotasjonshastighet, blir vestavind, hoper seg opp og synker. Én sløyfe til
        polen går ikke. Vi får tre celler på hver halvkule (NOAA, u.å.):
      </p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          <strong>Hadley-cellen (0°–30°):</strong> termisk direkte. Lufta stiger ved ekvator, går
          polover i høyden, synker rundt 30° og returnerer som passatvinder.
        </li>
        <li>
          <strong>Polarcellen (60°–90°):</strong> også termisk direkte. Kald luft synker over
          polene, særlig om vinteren, strømmer mot 60° som polare østavinder og tvinges opp langs
          polarfronten.
        </li>
        <li>
          <strong>Ferrel-cellen (30°–60°):</strong> termisk indirekte. Den drives ikke av oppvarming
          fra bakken, men tvinges rundt som et tannhjul mellom de to andre cellene — av friksjon og
          vandrende lavtrykk. Lufta synker ved 30° og stiger ved 60°.
        </li>
      </ol>

      <OrdBoks
        ord="Termisk direkte og termisk indirekte"
        barn="Direkte (Hadley-cellen og polarcellen): varm luft stiger, kald luft synker. Indirekte (Ferrel-cellen): kjøligere luft tvinges opp ved 60° og varmere luft ned ved 30°, drevet av stormene mellom cellene."
      />

      <OneVsThreeCellsDiagram />
      <p>
        Venstre rute er Hadleys stillestående jord. Høyre rute er tre-celle-modellen etter at
        corioliseffekten har dreid den øvre strømmen.
      </p>
      <WindCellsDiagram />
      <p>
        Tverrsnittet viser det samme fra siden: lufta stiger ved 0° og 60°, synker ved 30° og over
        polen.
      </p>

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">ITCZ og oppdrift</h2>
      <p>
        Den sterkeste motoren sitter i tropene. Der møtes passatene i <strong>ITCZ</strong> — den
        intertropiske konvergenssonen (NOAA, u.å.). Navnet forteller fysikken:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Intertropisk:</strong> mellom vendekretsene, i det varme beltet rundt ekvator.
        </li>
        <li>
          <strong>Konvergens:</strong> nordøstpassaten og sørøstpassaten strømmer sammen.
        </li>
        <li>
          <strong>Sone:</strong> ikke en strek, men et belte med skyer og nedbør rundt kloden.
        </li>
      </ul>
      <p>
        Når de to fuktige passatene møtes, har lufta bare én vei: opp. Samtidig varmer sola havet,
        ofte til 28–30 °C. Lufta blir varm, fuktig og lett. Den stiger i <em>dyp konveksjon</em>.
      </p>
      <p>
        Når lufta stiger, faller trykket. Den utvider seg og avkjøles adiabatisk. Ved duggpunktet
        kondenserer vanndampen. Kondensasjon frigjør <strong>latent varme</strong> — om lag 2,5 MJ
        per kilo vann. Lufta i skyen holder seg varmere enn lufta rundt, og oppdriften øker. Det
        bygger kumulonimbusskyer som i tropene kan nå tropopausen i 16–18 km.
      </p>
      <p>
        Nede ved havflaten er bevegelsen mest vertikal. Horisontal vind dør nesten ut. Seilere kalte
        beltet <strong>doldrums</strong> — det ekvatorielle stillebeltet.
      </p>

      <OrdBoks
        ord="ITCZ og doldrums"
        barn="ITCZ er lavtrykksbeltet der passatene møtes og lufta tvinges til værs. Doldrums er sjøfolkenes navn på de samme havområdene, der horisontal vind nesten dør ut."
      />

      <HadleyCloseupDiagram />
      <p>
        Til venstre: oppdrift, kondensasjon og regn ved ITCZ. Til høyre: tørr luft som har regnet
        fra seg, synker ved 30° og vender tilbake som passat.
      </p>

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hvorfor ørken ved 30°
      </h2>
      <p>
        I høyden over ITCZ er lufta tørr. Den har regnet fra seg. Den strømmer polover, taper varme
        og synker rundt <strong>30°</strong> — <strong>subsidens</strong>.
      </p>
      <p>
        Når lufta synker, komprimeres den og varmes adiabatisk, om lag 1 °C per 100 m. Relativ
        fuktighet faller. Skyene fordamper. Ved bakken ligger de subtropiske høytrykkene: skyfri
        himmel og tørke.
      </p>
      <p>
        Seilere kalte beltet <strong>hestebreddegradene</strong>. Navnet forklares ofte med at
        hester ble kastet over bord i stille, men det er usikker folkeetymologi. I geofag bruker vi
        30° breddegrad.
      </p>
      <p>
        Derfor ligger Sahara, Den arabiske halvøy og Kalahari her. Sahara er ørken fordi lufta
        synker, ikke fordi det «mangler elver». Atacama ligger også i dette beltet, og blir enda
        tørrere av kald kyststrøm og Andes som leside.
      </p>

      <OrdBoks
        ord="Subsidens"
        barn="Storskala nedsynking av luft. Når lufta synker, komprimeres den og varmes adiabatisk. Relativ fuktighet faller, skyer fordamper, og det etableres tørre høytrykk — slik vi ser rundt 30°."
      />

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        ITCZ flytter seg: monsunen
      </h2>
      <p>
        ITCZ ligger ikke fast på ekvator. Jorda har 23,5° aksehelning, så senit flytter seg mot
        Krepsens vendekrets i juli og Steinbukkens vendekrets i januar. ITCZ følger den termiske
        ekvator, med noen ukers etterslep.
      </p>
      <p>
        Land varmes raskere enn hav. Om sommeren i Asia trekkes ITCZ langt nord, inn over India.
        Fuktig luft fra Det indiske hav strømmer inn: <strong>sommermonsunen</strong>. Mellom 10° og
        20° kommer og går ITCZ med årstiden. Det gir savanne: regntid og tørketid.
      </p>

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Bakkevindene: passater, vestavinder og polare øster
      </h2>
      <p>
        Lufta som sank ved 30°, må strømme bort langs bakken. Noe går mot ekvator, noe mot polene.
        Corioliseffekten dreier begge, og vi får tre permanente vindbelter. Vinden har navn etter
        retningen den <em>kommer fra</em>.
      </p>

      <div className="my-6 space-y-4 rounded-xl border border-border/80 bg-surface/50 p-5">
        <div>
          <h3 className="font-display font-medium text-amber-300">1. Passatvindene (0°–30°)</h3>
          <p className="mt-1 text-sm text-foreground/90">
            Fra høytrykk ved 30° inn mot ITCZ. På nordlig halvkule dreies den sørgående lufta mot
            høyre og blir <strong>nordøstpassat</strong>. På sørlig halvkule dreies den mot venstre
            og blir <strong>sørøstpassat</strong>.
          </p>
        </div>
        <div className="border-t border-border/60 pt-3">
          <h3 className="font-display font-medium text-teal-300">2. Vestavindsbeltet (30°–60°)</h3>
          <p className="mt-1 text-sm text-foreground/90">
            Fra 30° mot lavtrykket ved 60°. På nordlig halvkule dreies lufta mot høyre, så vinden
            kommer <em>fra vest</em> og går <em>mot øst</em>. Norge ligger midt i dette beltet.
          </p>
        </div>
        <div className="border-t border-border/60 pt-3">
          <h3 className="font-display font-medium text-sky-300">
            3. De polare østavindene (60°–90°)
          </h3>
          <p className="mt-1 text-sm text-foreground/90">
            Kald luft synker over polene og strømmer mot 60°. På nordlig halvkule dreies den mot
            høyre og blir en kald, tørr <strong>polar østavind</strong>. Polarhøytrykket er
            sterkest om vinteren, og ikke et like fast belte som de subtropiske høytrykkene.
          </p>
        </div>
      </div>

      <SurfaceWindsDiagram />
      <p>
        Fra 30° trekkes lufta både mot 0° og mot 60°. Coriolis dreier begge mot høyre på nordlig
        halvkule, så passaten og vestavinden får motsatt sonevind.
      </p>

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Klimabeltene</h2>
      <p>
        Reiser du fra ekvator til Nordpolen, skifter landskapet i et fast mønster: tropisk regnskog,
        ørken, temperert skog, så tundra og is. Beltene er lufthavets vertikale bevegelser skrevet
        på bakken.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>0° (ITCZ):</strong> lufta stiger → kondensasjon og byger → tropisk regnskog
          (Amazonas, Kongo, Indonesia).
        </li>
        <li>
          <strong>10°–20°:</strong> ITCZ kommer og går → savanne med regntid og tørketid.
        </li>
        <li>
          <strong>Rundt 30°:</strong> lufta synker → skyfritt og tørke → subtropiske ørkener
          (Sahara, Kalahari, Arabia).
        </li>
        <li>
          <strong>45°–60°:</strong> polarfront og vestavind → vandrende lavtrykk → temperert skog og
          taiga.
        </li>
        <li>
          <strong>Polene:</strong> kald luft synker → lav fuktighet → tundra og polarørken.
          Antarktis-innlandet får så lite nedbør at det teller som ørken.
        </li>
      </ul>

      <GlobalClimateZonesDiagram />
      <p>
        Der lufta i gjennomsnitt stiger (0° og 60°), blir det skyer og liv. Der den synker (30° og
        polene), tørker landskapet ut.
      </p>

      <PhotoFigure
        src="/images/fig-belter-globus.jpg"
        alt="Jorda fra bane med grønt ekvatorbelte, ørkenbelte, stormer mot Skandinavia og polaris"
        heading="Klimabeltene sett fra rommet"
        caption="Satellittbildet viser de samme ringene: grønt ved ekvator, tørt rundt 30°, stormbaner mot Norge, is mot polen."
        marks={[
          { x: 6, y: 48, n: "1", text: "Tropisk regnskog (ITCZ)", tone: "teal" },
          { x: 4, y: 32, n: "2", text: "Ørkenbelte (30° subsidens)", tone: "warm" },
          { x: 52, y: 22, n: "3", text: "Vestavindsbeltet · Norge", tone: "cold" },
          { x: 58, y: 8, n: "4", text: "Polarcellen og isen", tone: "fg" },
        ]}
        points={[
          { n: "1", label: "ITCZ ved ekvator: skyproduksjon og tropisk regnskog." },
          {
            n: "2",
            label: "Subtropene rundt 30°: subsidens og skyfrihet lager ørkenene.",
          },
          {
            n: "3",
            label:
              "Mellombreddegradene (45–60°): lavtrykkene fra polarfronten treffer Vest-Europa.",
          },
          {
            n: "4",
            label: "Polarområdet: kald, synkende luft og tørr is.",
          },
        ]}
      />

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Polarfronten og været over Norge
      </h2>
      <p>
        Rundt 60° møtes mild, fuktig vestavind og kald, tørr polarluft. De blander seg ikke med en
        gang. Grenseflaten er <strong>polarfronten</strong>.
      </p>
      <p>
        Over den ligger <strong>polarfrontjeten</strong>. Den bukter seg i{" "}
        <strong>Rossby-bølger</strong> — rygger og tråg — som styrer hvor lavtrykkene får gå. Den
        fysikken, og hvorfor en rygg kan bli stående som blocking, eier kapittelet om{" "}
        <Link to="/tema/jetstrommer" className={lenke}>
          jetstrømmer
        </Link>
        .
      </p>
      <p>
        Norge ligger mellom 58° og 71° N, midt i vestavindsbeltet. Lavtrykk som dannes over
        Atlanteren, følger jeten inn mot kysten. På veien har lufta tatt opp mye vanndamp.
      </p>
      <p>
        Når vestavinden treffer <strong>Langfjella</strong>, tvinges lufta opp på Vestlandet
        (loside) og synker på Østlandet (leside). Brekke i Gulen får over 3500 mm i året. Skjåk i
        Ottadalen, like øst for Jotunheimen, får under 300 mm. Det er samme vestavind, med og uten
        fjell. Full føn-regning — 0,6 °C og 1,0 °C per 100 m — står i kapitlene om{" "}
        <Link to="/tema/hoytrykk-lavtrykk" className={lenke}>
          høytrykk og lavtrykk
        </Link>{" "}
        og{" "}
        <Link to="/tema/lokale-vaersystemer" className={lenke}>
          lokale værsystemer
        </Link>
        .
      </p>

      <PolarFrontNorwayDiagram />
      <p>
        Polarfronten er kollisjonssonen. Langfjella avgjør hvor den fuktige vestavinden slipper
        regnet.
      </p>

      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Utforsk: Interaktiv modell av det globale vindsystemet
      </h2>
      <p>
        Bruk modellen til å koble breddegrad, trykk, vindretning og vertikal luftstrøm i
        tre-celle-systemet.
      </p>

      <WindSystemModel />

      <div className="mt-8 space-y-4">
        <Callout title="Eksamensfokus: Den røde tråden">
          <p>Når du skal forklare det globale vindsystemet, bygg svaret i fire trinn:</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            <li>
              <strong>Energikilden:</strong> ujevn innstråling gir overskudd i tropene og underskudd
              ved polene.
            </li>
            <li>
              <strong>Coriolis-oppsplittingen:</strong> jordrotasjonen gjør at én celle ikke holder;
              vi får tre celler per halvkule.
            </li>
            <li>
              <strong>Klimabeltene:</strong> stigende luft gir lavtrykk og regn (0° og 60°);
              synkende luft gir høytrykk og ørken (rundt 30° og ved polene).
            </li>
            <li>
              <strong>Norges plassering:</strong> vestavindsbeltet og polarfronten sender fuktige
              lavtrykk mot kysten. Langfjella gir orografisk nedbør på Vestlandet og regnskygge
              østafjells.
            </li>
          </ol>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>
              <strong>Misforståelse:</strong>{" "}
              <em>«Hadley-, Ferrel- og polarcellen er tre lukkede rør som går hver dag.»</em>
              <br />
              <strong>Faktum:</strong> Cellene er et <em>tidsmiddel</em>. Over Norge ser du sjelden
              jevn Ferrel-sirkulasjon. Her dominerer vandrende lavtrykk.
            </li>
            <li>
              <strong>Misforståelse:</strong>{" "}
              <em>«Sahara er ørken fordi det ikke er vann i bakken.»</em>
              <br />
              <strong>Faktum:</strong> Ørkenen skyldes subsidens rundt 30°. Synkende luft tørker ut
              skyene.
            </li>
            <li>
              <strong>Misforståelse:</strong> <em>«ITCZ ligger alltid på ekvatorlinjen.»</em>
              <br />
              <strong>Faktum:</strong> ITCZ følger senit mot nord i juli og mot sør i januar, og
              trekker ekstra langt inn over varme kontinenter (monsun).
            </li>
          </ul>
        </Callout>
      </div>

      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">
        Nøkkelbegreper til repetisjon
      </h2>
      <TermGrid>
        <Term
          name="Strålingsbalanse"
          def="Forskjellen mellom absorbert solinnstråling og utgående varmestråling. Overskudd i tropene, underskudd ved polene."
        />
        <Term
          name="ITCZ"
          def="Lavtrykksbeltet rundt ekvator der passatene møtes og fuktig luft tvinges til værs."
        />
        <Term
          name="Subsidens ved 30°"
          def="Nedsynking i subtropene. Lufta varmes adiabatisk, skyer fordamper, og de store ørkenene ligger her."
        />
        <Term
          name="Passatvinder"
          def="Stødige overflatevinder mot ITCZ: nordøstpassat i nord og sørøstpassat i sør."
        />
        <Term
          name="Vestavindsbeltet"
          def="Vindbeltet mellom 30° og 60° der coriolis dreier lufta slik at den kommer fra vest. Her ligger Norge."
        />
        <Term
          name="Polarfronten"
          def="Kollisjonssonen rundt 60° mellom mild subtropisk luft og kald polarluft. Her dannes lavtrykk."
        />
        <Term
          name="Rossby-bølger"
          def="Store buktninger i polarfrontjeten. Rygg og tråg styrer lavtrykk og høytrykk. Mer i kapittelet om jetstrømmer."
        />
        <Term
          name="Orografisk nedbør"
          def="Nedbør når fuktig vind tvinges opp av fjell (loside). På lesiden: regnskygge og føn."
        />
      </TermGrid>

      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor brytes atmosfærens sirkulasjon opp i tre celler i stedet for én stor celle på hver halvkule?",
            options: [
              "Fordi jordoverflaten har ulik fordeling av hav og kontinenter.",
              "Fordi jordas rotasjon og corioliseffekten dreier luftstrømmene, slik at lufta i høyden blir vestavind rundt 30° og synker der.",
              "Fordi ozonlaget absorberer UV-stråling i stratosfæren og stopper oppdriften.",
              "Fordi gravitasjonen avtar kraftig fra ekvator mot polene.",
            ],
            answer: 1,
            explain:
              "På en jord uten rotasjon ville Hadleys éncelle-modell holdt. Rotasjonen dreier lufta via corioliseffekten. Rundt 30° blir den øvre strømmen vestavind, lufta synker, og sirkulasjonen deles i tre celler.",
          },
          {
            prompt: "Hva kjennetegner ITCZ (den intertropiske konvergenssonen)?",
            options: [
              "Høyt lufttrykk, skyfri himmel og konstante nordavinder.",
              "Konvergens mellom passatvindene, oppdrift, frigjøring av latent varme og tordenbyger.",
              "Permanent vestavind og subsidens over land.",
              "Kaldluft som synker fra stratosfæren og gir ekstrem kulde.",
            ],
            answer: 1,
            explain:
              "ITCZ er lavtrykksbeltet der passatene fra nord og sør møtes. Solvarme og fordampning gir dyp konveksjon og kumulonimbusskyer der latent varme frigjøres.",
          },
          {
            prompt:
              "Hva er den fysiske hovedårsaken til at jordas store ørkener ligger i beltet rundt 30°?",
            options: [
              "Området mottar mer kosmisk stråling enn noen annen breddegrad.",
              "Luft som har steget ved ITCZ tvinges ned (subsidens); den synkende lufta komprimeres og varmes adiabatisk, slik at skyene fordamper.",
              "Det finnes ingen fjellkjeder i disse områdene som kan stoppe vinden.",
              "Havstrømmene rundt 30° koker og tørker ut landmassene.",
            ],
            answer: 1,
            explain:
              "Subsidens rundt 30° komprimerer lufta, øker temperaturen adiabatisk og senker den relative fuktigheten. Det gir skyfrie høytrykk, for eksempel over Sahara.",
          },
          {
            prompt:
              "Hvorfor kalles Ferrel-cellen mellom 30° og 60° for et termisk indirekte kretsløp?",
            options: [
              "Fordi den bare eksisterer i sommerhalvåret.",
              "Fordi den ikke drives av lokal soloppvarming fra bakken, men tvinges rundt av friksjon og virvler mellom Hadley-cellen og polarcellen.",
              "Fordi den transporterer kulde fra ekvator mot polene.",
              "Fordi den styres av månens tidevannskrefter.",
            ],
            answer: 1,
            explain:
              "I Hadley-cellen og polarcellen stiger varm luft og synker kald luft (termisk direkte). I Ferrel-cellen tvinges lufta ned der det er relativt varmt (30°) og opp langs den kaldere polarfronten (60°).",
          },
          {
            prompt:
              "Hva skjer når en Rossby-bølge danner en omega-blokkering over Skandinavia om sommeren?",
            options: [
              "Det fører til uavbrutt regn og storm over hele Norden i flere måneder.",
              "En høytrykksrygg blir liggende fast; lavtrykkene presses utenom, og vi får langvarig tørke og høye temperaturer.",
              "Golfstrømmen stopper opp og snur sørover mot Spania.",
              "Polarfrontjeten forsvinner fra den nordlige halvkule.",
            ],
            answer: 1,
            explain:
              "En omega-blokkering er et stabilt høytrykk formet som Ω. Det leder atlanterhavslavtrykkene nord eller sør for Skandinavia. Fysikken bak rygger, tråg og blocking står i kapittelet om jetstrømmer.",
          },
          {
            prompt:
              "Hvorfor mottar Brekke i Gulen over 3500 mm nedbør i året, mens Skjåk i Ottadalen mottar under 300 mm?",
            options: [
              "Brekke ligger i polarcellen, mens Skjåk ligger i Hadley-cellen.",
              "Fuktig vestavind tvinges opp over Langfjella og gir orografisk nedbør på losiden (Brekke). På lesiden synker lufta og tørker ut (Skjåk i regnskyggen).",
              "Skjåk ligger så høyt at skyene ikke når dalbunnen.",
              "Det regner bare om natten i Brekke og bare om vinteren i Skjåk.",
            ],
            answer: 1,
            explain:
              "Samme vestavind, med og uten fjell. Loside: lufta løftes og regner. Leside: lufta synker og tørker. Adiabat-tallene står i kapitlene om trykk og lokale værsystemer.",
          },
        ]}
      />
    </TopicLayout>
  );
}
