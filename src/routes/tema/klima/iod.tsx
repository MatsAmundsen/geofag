import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  DmiTimeseriesDiagram,
  IodEkmanDiagram,
  IodPhaseShift,
  IodTeleconnectionDiagram,
  IodVsEnsoDiagram,
  NegativeWalkerDiagram,
  NeutralIodDiagram,
} from "@/components/diagrams/iod";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/iod")({
  head: () =>
    topicHead({
      title: "IOD: Den indiske hav-dipolen · Geofag 2",
      description:
        "Den indiske hav-dipolen (IOD): nøytral, positiv og negativ fase, DMI, SST-anomali, oppvelling og Ekman-transport, jetstrømmer, samspill med ENSO og monsunen.",
      path: "/tema/klima/iod",
    }),
  component: IodPage,
});

function IodPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Det indiske hav"
      title="IOD: Den indiske hav-dipolen"
      lead="Stillehavet har ENSO. Det indiske hav har sin egen vippe: IOD. Når den vestlige polen utenfor Øst-Afrika blir varm og den østlige utenfor Indonesia blir kald, får Øst-Afrika flom og Australia tørke. Snur vippa, snur været."
      banner="/images/fig-iod-positiv.png"
      bannerAlt="Skisse av positiv IOD: varmere hav utenfor Øst-Afrika, kaldere utenfor Indonesia og Australia"
      prev={{ to: "/tema/klima/enso", label: "Forrige: ENSO" }}
      next={{ to: "/tema/klima/nao", label: "Neste: NAO" }}
      kilder={KILDER.iod}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva IOD er</h2>
      <p>
        Indian Ocean Dipole er en koblet hav–atmosfære-syklus i det tropiske Indiahavet. Den beskriver
        svingninger i havoverflatetemperatur og vind mellom to poler (Saji et al., 1999):
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Vestlig pol:</strong> utenfor Øst-Afrika, om lag 50–70°Ø og 10°S–10°N.
        </li>
        <li>
          <strong>Østlig pol:</strong> sør for Indonesia og nordvest for Australia, om lag 90–110°Ø og
          10°S–0° (Australian Bureau of Meteorology, u.å.).
        </li>
      </ul>
      <p>
        Styrken måles med <strong>DMI</strong> (Dipole Mode Index): temperaturen i vest minus
        temperaturen i øst. En aktiv IOD varer ofte 4–6 måneder. El Niño, La Niña og monsunen kan
        forkorte eller forlenge den.
      </p>
      <p>
        I nøytral tilstand er havet i øst gjerne varmest. Vann fra Stillehavet kommer inn gjennom
        Indonesia (Indonesian Throughflow), og vestavind blåser langs ekvator (Australian Bureau of
        Meteorology, u.å.). Figur 1 viser den tilstanden: oransje i øst, vestavind, og regnet over
        Indonesia — ikke over Øst-Afrika.
      </p>
      <NeutralIodDiagram />
      <p>
        Når øst–vest-forskjellen vokser, slår dipolen ut. Figur 2 måler det med DMI. IOD utvikler
        seg oftest gjennom andre halvår og topper gjerne i september–november (Australian Bureau of
        Meteorology, u.å.). NOAA PSL-serien, bygd på HadISST, viser at 1997 og 2019 er de to
        sterkeste positive SON-toppene siden 1961 (National Oceanic and Atmospheric Administration,
        u.å.).
      </p>
      <DmiTimeseriesDiagram />
      <OrdBoks
        ord="IOD"
        barn="En øst–vest-svingning i tropisk Indiahav. Temperaturforskjellen mellom polene styrer hvor lufta stiger, hvor den synker, og hvor regnet faller."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Positiv IOD</h2>
      <p>
        Havet er varmere enn normalt utenfor Øst-Afrika og kjøligere enn normalt utenfor Indonesia og
        Australia. De vanlige vestavindene langs ekvator svekkes. Varmt overflatevann skyves vestover.
        I øst veller kaldt dypvann opp — også utenfor vestkysten av Australia. Figur 3 er skissen av
        hele cellen. Figur 4 er det samme mønsteret i ekte SST-anomali fra 2019.
      </p>
      <p>
        Havtemperaturen styrer trykket. Varm overflate gir lavtrykk og stigende luft. Kald overflate
        gir høytrykk og synkende luft. Derfor blåser vinden fra Indonesia og Australia mot Øst-Afrika,
        som pilene i figur 3 viser.
      </p>
      <PhotoFigure
        src="/images/fig-iod-positiv.png"
        alt="Positiv IOD: varmere vann og regn i vest, kaldere vann, oppvelling og tørke i øst"
        heading="Figur 3. Positiv IOD"
        caption="Start i vest: oransje hav, stigende luft og regn mot Øst-Afrika. Gå østover: blått hav, synkende luft og tørke over Indonesia og Nord-Australia. Snittet under kartet viser termoklinen — nede i vest (nedvelling), oppe i øst (oppvelling). Dette er mekanismen bak de røde DMI-toppene i figur 2. Etter Weatherzone."
        fit="contain"
        points={[
          { n: "1", label: "Vest: varmt hav, lavtrykk, konveksjon og regn mot Øst-Afrika." },
          { n: "2", label: "Øst: kaldt hav, høytrykk, svekket konveksjon og tørke i Indonesia og Nord-Australia." },
        ]}
      />
      <PhotoFigure
        src="/images/fig-iod-sst-anom.jpg"
        alt="SST-anomali i Indiahavet 28. juli 2019: varmt i vest, kaldt utenfor Sumatra"
        heading="Figur 4. SST-anomali, ikke temperatur"
        caption="Avvik fra normalen 28. juli 2019, mens den ekstreme positive IOD-en bygde seg opp. Rødt: varmere enn det pleier. Blått: kaldere. Les vest–øst: det er samme dipole som i figur 3, men nå i satellittdata. Forveksle ikke dette med figur 8, som viser hvor mange grader havet er — der er tropisk vest alltid lilla, også i nøytrale år. NASA Earth Observatory / MUR (National Aeronautics and Space Administration, 2019a)."
        fit="contain"
        points={[
          { n: "1", label: "Vestlig pol: varmere enn normalt utenfor Øst-Afrika og Arabia." },
          { n: "2", label: "Østlig pol: kaldere enn normalt utenfor Sumatra — oppvellingens fingeravtrykk." },
        ]}
      />
      <p>
        Lavtrykket utenfor Øst-Afrika fukter lufta over det varme havet (figur 3, punkt 1). Vinden tar
        fukten inn mot kysten. Der møter du to nedbørtyper samtidig: konveksjon over havet, og
        orografisk nedbør når lufta løftes over kyst og fjell. Landskapet er ikke bygd for slike
        mengder. Resultatet er flom — se også figur 10 og 12a.
      </p>
      <p>
        I øst kveler kaldt vann og høytrykk skyene (figur 3, punkt 2, og det blå feltet i figur 4).
        Indonesia og Nord-Australia får tørke, hete og høy skogbrannfare. Den australske «Black
        Summer»-sesongen 2019/20 falt sammen med en av de sterkeste positive IOD-hendelsene som er
        målt (Australian Bureau of Meteorology, u.å.). Figur 12b er røyken fra den sesongen.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Hvorfor vannet stiger i øst: Ekman
      </h3>
      <p>
        Vind alene forklarer ikke oppvellingen. På en roterende jord avbøyes overflatestrømmen. Den
        samlede transporten i det øverste laget — Ekman-transporten — går 90° til venstre for vinden
        på sørlig halvkule. Den østlige IOD-polen ligger sør for ekvator. Figur 5 viser det ovenfra:
        østlige vinder (gule piler) skyver overflatevann sørover (turkise piler), bort fra Sumatra og
        Nordvest-Australia. Der vannet spriker, må kaldt dypvann opp — det blå beltet, og det kalde
        feltet i figur 4 (Barthel, 2021).
      </p>
      <IodEkmanDiagram />
      <p>
        Samme logikk møtte du under{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          havstrømmer
        </Link>
        . Der er pila 90° til <em>høyre</em> fordi eksempelet sitter på nordlig halvkule. I figur 5
        er pila til venstre, fordi den østlige polen sitter sør for ekvator.
      </p>
      <OrdBoks
        ord="Oppvelling"
        barn="Kaldt, ofte næringsrikt dypvann som stiger når overflatevannet skyves bort. I positiv IOD skjer det i øst. I negativ IOD skjer det utenfor Øst-Afrika."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Negativ IOD</h2>
      <p>
        Mønsteret snur. Vestavindene langs ekvator styrkes. Varmt vann stables i øst, utenfor
        Indonesia og Australia. I vest blir havet kjøligere, og oppvellingen flytter til Øst-Afrika.
        Trykket følger: høytrykk i vest, lavtrykk i øst. Figur 6 er oversiktsskissen. Figur 7 er
        Walker-snittet: termoklinen kommer opp i vest og synker i øst — speilbildet av figur 3.
      </p>
      <PhotoFigure
        src="/images/fig-iod-negativ.jpg"
        alt="Negativ IOD: kaldere vann og tørke i vest, varmere vann og økt konveksjon i øst"
        heading="Figur 6. Negativ IOD"
        caption="Speil av figur 3. Øst: varmt hav, lavtrykk og konveksjon over Indonesia og Nord-Australia. Vest: kaldt hav, høytrykk og tørke i Øst-Afrika — og ofte i deler av India. Bruk figur 7 når du skal forklare termoklin og oppvelling. Etter Study IQ IAS."
        fit="contain"
        points={[
          { n: "1", label: "Øst: varmt hav, lavtrykk, mer nedbør og flomfare i Indonesia og Australia." },
          { n: "2", label: "Vest: kaldt hav, høytrykk og tørke i Øst-Afrika — og ofte i deler av India." },
        ]}
      />
      <NegativeWalkerDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Havtemperaturen flytter jetstrømmene
      </h2>
      <p>
        Jetstrømmer ligger der temperaturkontrasten er størst. Indiahavets overflate styrer hvor
        lufta varmes og stiger, og hvor den avkjøles og synker. Når IOD flytter den kontrasten —
        som i figur 3, 4 og 7 — flytter den subtropiske jeten seg med. Figur 8 viser hvor
        temperaturgrensen ligger i et vanlig temperaturkart. Figur 9 viser jetene som følger den.
      </p>
      <PhotoFigure
        src="/images/fig-iod-sst.png"
        alt="Kart over havoverflatetemperatur i Indiahavet med tydelig sørlig temperaturgrense"
        heading="Figur 8. Havtemperatur i Indiahavet — ikke anomali"
        caption="Dette er grader, ikke avvik. Det tropiske bassenget er alltid varmt; lilla vest er ikke positiv IOD. Den skarpe fargegrensen mot sør er der den subtropiske jeten hører hjemme (figur 9). For dipolen — vest varmere eller kaldere enn øst — må du tilbake til figur 4."
        fit="contain"
      />
      <PhotoFigure
        src="/images/fig-iod-jet.png"
        alt="Subtropiske jetstrømmer over Indiahavet på nordlig og sørlig halvkule"
        heading="Figur 9. Subtropiske jetstrømmer over Indiahavet"
        caption="Jetene følger de store temperaturgrensene i figur 8. Når IOD flytter konveksjonen (figur 3 og 7), flytter grensen — og dermed banen og formen på jeten. Positiv fase kan trekke den sørlige jeten sørover og holde lavtrykk unna Australia."
        fit="contain"
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Positiv fase</h3>
      <p>
        Mindre konveksjon over kaldt vann ved Australia og Indonesia. Mer konveksjon over varmt vann
        ved Øst-Afrika. Walker-sirkulasjonen forskyves vestover. Luft synker over østlige Indiahav.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Sørlig subtropisk jet:</strong> kan trekkes sørover og holde regnbærende lavtrykk
          unna Australia.
        </li>
        <li>
          <strong>Nordlig subtropisk jet:</strong> svekket kontrast ved 30° gir oftere mer bølget
          form.
        </li>
        <li>
          <strong>Møte med polarjeten:</strong> en bølget subtropisk jet øker sjansen for at den
          møter polarjeten. Der kald luft møter varm og fuktig luft, blir det nedbør. Når jeten
          svinger tilbake, kan den dra kald, tørr luft inn over Australia og Sør-Afrika.
        </li>
      </ul>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">Negativ fase</h3>
      <p>
        Mer konveksjon over Indonesia og Nordvest-Australia. Mindre konveksjon over Øst-Afrika.
        Walker-sirkulasjonen forskyves østover.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Sørlig subtropisk jet:</strong> oftere svakere, mer bølget, og kan ligge lenger
          nord (mot ekvator). Færre møter med polarjeten gir færre kuldeutbrudd i Sør-Australia.
        </li>
        <li>
          <strong>Nordlig subtropisk jet:</strong> økt konveksjon i øst kan gi en sterkere og
          rettere jet.
        </li>
      </ul>
      <p>
        Mekanikken bak bølgene — Rossby og coriolis som endrer seg med breddegraden — står under{" "}
        <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">
          jetstrømmer
        </Link>
        .
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">IOD, ENSO og monsunen</h2>
      <p>
        Figur 10 samler konsekvensene på tre kyster: Øst-Afrika, India og Australia. Figur 11 setter
        IOD ved siden av ENSO, slik at du ser at de er to vipper i to basseng — ikke det samme
        fenomenet.
      </p>
      <IodTeleconnectionDiagram />
      <IodVsEnsoDiagram />
      <p>
        IOD er en egen modus i Indiahavet, men den snakker med Stillehavet: gjennom atmosfæriske
        bølger og gjennom Indonesian Throughflow (pilen merket ITF i figur 1). Når positiv IOD
        faller sammen med El Niño, som i 1997 og 2019, forsterker de tørken i Australia (Webster et
        al., 1999; Australian Bureau of Meteorology, u.å.). Figur 11 viser hvorfor: begge vipper
        tørker Indonesia-siden samtidig. Negativ IOD kan forsterke nedbøren under La Niña
        (Australian Bureau of Meteorology, u.å.).
      </p>
      <p>
        Positiv IOD kan også pumpe fukt inn over India og styrke sommermonsunen (figur 10, punkt 2).
        Negativ IOD kan svekke den.
      </p>
      <PhotoFigure
        src="/images/fig-iod-ea-regn.jpg"
        alt="Nedbørsanomali november 2006: mer regn over Øst-Afrika, mindre over Indonesia og Australia"
        heading="Figur 12a. Flom i vest, tørke i øst"
        caption="Nedbørsanomali i november 2006, et positivt IOD-år som også hadde El Niño. Blått: mer regn enn normalt over Øst-Afrika. Brunt: tørke over Indonesia og Australia. Det er figur 10 tegnet om til satellittdata, og samme øst–vest-mønster som i 1997 og 2019 (National Aeronautics and Space Administration, 2006)."
        fit="contain"
      />
      <PhotoFigure
        src="/images/fig-iod-black-summer.jpg"
        alt="Satellittbilde av røyk fra skogbranner langs kysten av New South Wales, 9. desember 2019"
        heading="Figur 12b. Black Summer, 9. desember 2019"
        caption="Røyk fra brannene i New South Wales under den ekstreme positive IOD-en i figur 2 og 4. Dette er punkt 4 i figur 10, sett fra satellitt. NASA Aqua/MODIS (National Aeronautics and Space Administration, 2019b)."
        fit="contain"
      />
      <p>
        Det tropiske Indiahavet har varmet mer enn andre tropiske hav siden midten av 1900-tallet —
        i størrelsesorden én grad, omtrent 50–60 % mer enn i andre tropiske basseng (Hu og Fedorov,
        2019). Den oppvarmingen kan, via Walker-sirkulasjonen og saltholdighet i tropisk Atlanter,
        motvirke en svekket{" "}
        <Link to="/tema/klima/amoc" className="text-primary underline-offset-2 hover:underline">
          AMOC
        </Link>
        . Det er en kobling, ikke at IOD «styrer Golfstrømmen».
      </p>

      <p>
        Figur 13 setter figur 3 og figur 7 i bevegelse: samme maskin, motsatt fortegn. Pause og les
        én fase, slik du ville lest et anomalikart.
      </p>
      <IodPhaseShift />

      <Callout title="Til eksamen">
        <p>
          Varmt hav: luft stiger, lavtrykk, nedbør. Kaldt hav: luft synker, høytrykk, tørke.
        </p>
        <p>
          Positiv IOD: varmt i vest (Øst-Afrika = flom), kaldt i øst (Australia/Indonesia = tørke).
          Negativ IOD: motsatt.
        </p>
        <p>
          Skill IOD fra ENSO. Figur 11: ENSO sitter i tropisk Stillehav, IOD i tropisk Indiahav. De
          kan falle sammen og forsterke hverandre, men de er ikke det samme.
        </p>
        <p>
          Skill temperaturkart og anomalikart (figur 8 mot figur 4). Lilla vest på et temperaturkart
          er tropisk varmt vann, ikke automatisk positiv IOD.
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>
          All tørke i Australia er ikke El Niño. IOD er ofte en like direkte pådriver for
          vår- og sommertørke og brannfare der (Australian Bureau of Meteorology, u.å.).
        </p>
        <p>
          Vestkysten av Australia er den <em>østlige</em> IOD-polen. Vest og øst i IOD følger
          Indiahavet, ikke det australske kontinentet.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="IOD"
          def="Øst–vest-svingning i tropisk Indiahav. Temperaturforskjellen mellom polene styrer regn og tørke."
        />
        <Term
          name="DMI"
          def="Dipole Mode Index: havtemperatur i vest minus havtemperatur i øst."
        />
        <Term
          name="positiv IOD"
          def="Varmt i vest, kaldt i øst. Flom i Øst-Afrika. Tørke i Indonesia og Nord-Australia."
        />
        <Term
          name="negativ IOD"
          def="Kaldt i vest, varmt i øst. Tørke i Øst-Afrika. Mer regn i Indonesia og Australia."
        />
        <Term
          name="oppvelling"
          def="Kaldt dypvann som stiger når overflatevannet skyves bort. Øst i positiv IOD, vest i negativ."
        />
        <Term
          name="Ekman-transport"
          def="Netto vanntransport 90° på vinden. Til venstre på sørlig halvkule. Forklarer oppvelling i øst under positiv IOD."
        />
        <Term
          name="anomali"
          def="Avvik fra normalen. Et anomalikart viser om havet er varmere eller kaldere enn det pleier — ikke hvor mange grader det er."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva kjennetegner en positiv IOD?",
            options: [
              "Havet er varmere enn normalt utenfor Øst-Afrika og kaldere enn normalt utenfor Indonesia og Australia.",
              "Hele Indiahavet er kaldere enn normalt.",
              "Havet utenfor Afrika er kaldt, og Australia får flom.",
              "DMI er null, og vestavinden langs ekvator er uendret.",
            ],
            answer: 0,
            explain:
              "Positiv IOD: vestlig pol varm, østlig pol kald. Negativ IOD er det omvendte.",
          },
          {
            prompt: "Hva viser et SST-anomalikart som et vanlig temperaturkart ikke viser?",
            options: [
              "Hvor mange grader havet er.",
              "Om vest og øst er varmere eller kaldere enn de pleier — altså dipolen.",
              "Hvor jetstrømmen ligger akkurat nå.",
              "Saltholdigheten i AMOC.",
            ],
            answer: 1,
            explain:
              "Anomali er avvik fra normalen. Et lilla vestfelt på et temperaturkart kan bare være tropisk varmt vann.",
          },
          {
            prompt: "Hvorfor veller kaldt vann opp i øst under positiv IOD?",
            options: [
              "Fordi månen trekker vannet ned.",
              "Østlige vinder og Ekman-transport på sørlig halvkule skyver overflatevann sørover, bort fra kysten. Da må dypvann opp.",
              "Fordi Indonesia alltid har kaldt hav.",
              "Fordi AMOC snur i Indiahavet.",
            ],
            answer: 1,
            explain:
              "På sørlig halvkule går Ekman-transporten 90° til venstre for vinden. Østlige vinder fjerner overflatevann fra den østlige polen.",
          },
          {
            prompt: "Hvilke to år er de sterkeste positive DMI-toppene i NOAA-serien siden 1961?",
            options: ["2016 og 2022", "1997 og 2019", "1982 og 2009", "1998 og 2010"],
            answer: 1,
            explain:
              "1997 og 2019 er de to høyeste september–november-midlene. Begge falt sammen med El Niño og ga ekstrem tørke i Australia og flom i Øst-Afrika.",
          },
        ]}
      />
    </TopicLayout>
  );
}
