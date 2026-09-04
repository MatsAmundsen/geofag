import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { GeminiFigure } from "@/components/gemini-figure";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { GEMINI } from "@/lib/gemini-slots";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/iod")({
  head: () =>
    topicHead({
      title: "IOD: Den indiske hav-dipolen · Geofag 2",
      description:
        "Indian Ocean Dipole: positiv og negativ fase, havtemperatur, Walker-sirkulasjon, jetstrømmer, flom i Øst-Afrika og tørke i Australia.",
      path: "/tema/klima/iod",
    }),
  component: IodPage,
});

function IodPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Det indiske hav"
      title="IOD: Den indiske hav-dipolen"
      lead="Indian Ocean Dipole er klimasyklusen i Det indiske hav. Når vest blir varmt og øst kaldt, får Øst-Afrika flom og Australia tørke. Snur vippa, snur været."
      banner="/images/fig-iod-positiv.png"
      bannerAlt="Positiv IOD: varmere hav og regn utenfor Øst-Afrika, kaldere hav, oppvelling og tørke ved Indonesia og Australia"
      prev={{ to: "/tema/klima/enso", label: "Forrige: ENSO" }}
      next={{ to: "/tema/klima/nao", label: "Neste: NAO" }}
      kilder={KILDER.iod}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva IOD er</h2>
      <p>
        <strong>Indian Ocean Dipole (IOD)</strong> beskriver svingninger i havtemperatur og
        atmosfære i Det indiske hav. Den påvirker været rundt bassenget: Øst-Afrika, Sør-Asia,
        Australia og deler av Indonesia (Saji et al., 1999).
      </p>
      <p>
        Syklusen varer ofte 4–6 måneder. El Niño, La Niña og monsunen kan korte den ned eller
        forlenge den.
      </p>
      <p>
        To hovedfaser: positiv og negativ. De styres av havtemperaturen mellom Øst-Afrika i vest og
        Indonesia/Australia i øst. Styrken måles med <strong>DMI</strong> (Dipole Mode Index):
        temperatur i vest minus temperatur i øst.
      </p>
      <GeminiFigure {...GEMINI.iodNoytral} />
      <OrdBoks
        ord="IOD"
        barn="Øst–vest-svingning i tropisk Indiahav. Temperaturforskjellen mellom polene styrer hvor lufta stiger, hvor den synker, og hvor regnet faller."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Positiv fase</h2>
      <p>
        Varmere vann enn normalt ved Øst-Afrika. Kjøligere vann ved Indonesia og Australia.
        Oppvelling ved vestkysten av Australia.
      </p>
      <p>
        Havoverflatetemperatur styrer høytrykk og lavtrykk, og dermed vinden. I positiv fase blåser
        vinden fra Indonesia og Australia mot Øst-Afrika.
      </p>
      <PhotoFigure
        src="/images/fig-iod-positiv.png"
        alt="Positiv IOD: varmere vann og konveksjon i vest, kaldere vann, svekket konveksjon og oppvelling i øst"
        heading="Figur 1. Positiv IOD"
        caption="Vest: varmere enn normalt, stigende luft og regn mot Øst-Afrika. Øst: kjøligere enn normalt, synkende luft og tørke over Indonesia og Nord-Australia. Snittet under viser termoklinen — nede i vest (nedvelling), oppe i øst (oppvelling). Etter Weatherzone."
        fit="contain"
        points={[
          {
            n: "1",
            label: "Lavtrykk utenfor Øst-Afrika. Konvektiv nedbør over havet, orografisk nedbør inne på kysten.",
          },
          {
            n: "2",
            label: "Oppvelling og høytrykk i øst. Tørke og mindre regn i Indonesia og Nord-Australia.",
          },
        ]}
      />
      <p>
        Landskapet i Øst-Afrika er ikke bygd for slike mengder. Resultatet kan bli flom. I øst gir
        kaldt vann og høytrykk tørke, hete og høy skogbrannfare. «Black Summer» i Australia 2019/20
        falt sammen med en av de sterkeste positive IOD-hendelsene som er målt.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Negativ fase</h2>
      <p>
        Temperaturen snur: kjøligere vann i vest, varmere i øst. Oppvelling flytter til kysten av
        Øst-Afrika. Ingen oppvelling ved Australia og Indonesia. Høytrykk i vest, lavtrykk i øst.
        Vinden snur.
      </p>
      <PhotoFigure
        src="/images/fig-iod-negativ.jpg"
        alt="Negativ IOD: kaldere vann og tørke i vest, varmere vann og økt konveksjon over Indonesia og Australia"
        heading="Figur 2. Negativ IOD"
        caption="Speil av figur 1. Øst: varmt hav, lavtrykk og mer regn over Indonesia og Nordvest-Australia. Vest: kaldt hav, høytrykk og tørke i Øst-Afrika — og ofte i deler av India."
        fit="contain"
        points={[
          { n: "1", label: "Lavtrykk ved Indonesia og Nordvest-Australia. Økt nedbør og flomfare." },
          { n: "2", label: "Tørke i Øst-Afrika og noen deler av India." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Påvirkning på jetstrømmene
      </h2>
      <p>
        Jetstrømmer dannes i grensesonene mellom globale høytrykk og lavtrykk. Havoverflaten styrer
        lufttemperaturen, og dermed hvor de grensene ligger. Jetene følger de store
        temperaturgrensene i hav og på land.
      </p>
      <PhotoFigure
        src="/images/fig-iod-sst.png"
        alt="Havoverflatetemperatur i Indiahavet med skarp fargegrense mot sør"
        heading="Figur 3. Havtemperatur i Det indiske hav"
        caption="Dette er grader, ikke avvik. Tropisk Indiahav er alltid varmt. Den svarte/skarpe grensen mot sør er der den subtropiske jeten hører hjemme (figur 4). For dipolen — vest varmere eller kaldere enn øst — trenger du et anomalikart, ikke dette."
        fit="contain"
      />
      <PhotoFigure
        src="/images/fig-iod-jet.png"
        alt="Jordklode med subtropiske jetstrømmer som gule og røde bånd nord og sør for ekvator over Indiahavet"
        heading="Figur 4. Subtropiske jetstrømmer over Indiahavet"
        caption="Jetene følger temperaturgrensene i figur 3. Når IOD flytter konveksjonen, flytter grensen — og dermed banen og formen på jeten."
        fit="contain"
      />
      <GeminiFigure {...GEMINI.iodAnomaliVsTemp} />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Positiv fase og jetstrømmer
      </h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>Kjøligere hav rundt Australia og Indonesia: mindre konveksjon der.</li>
        <li>Varmere hav ved Øst-Afrika: mer konveksjon der.</li>
        <li>
          Walker-sirkulasjonen skifter vestover. Mer synkende luft over østlige Indiahav og
          kystene der.
        </li>
      </ul>
      <p>
        <strong>Sørlig subtropisk jet:</strong> kan trekkes sørover og gi redusert nedbør i
        Australia.
      </p>
      <p>
        <strong>Nordlig subtropisk jet:</strong> redusert konveksjon langs Indiahavets kyst svekker
        kontrasten ved ca. 30°. Jeten blir oftere mer bølget.
      </p>
      <p>
        <strong>Polarjet:</strong> En bølget subtropisk jet øker sjansen for at den møter polarjeten
        på høyere breddegrader. Der kald luft møter varm og fuktig luft, blir det nedbør. Når de
        møtes, kan den subtropiske jeten også ta med seg kald, tørr luft fra polarjeten inn over
        Australia og Sør-Afrika.
      </p>
      <GeminiFigure {...GEMINI.iodWalkerSkift} />
      <GeminiFigure {...GEMINI.iodJetMote} />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight">
        Negativ fase og jetstrømmer
      </h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>Varmere hav i øst: mer konveksjon over Indonesia og Nordvest-Australia.</li>
        <li>Kjøligere hav i vest: redusert konveksjon over Afrika.</li>
        <li>Walker-sirkulasjonen endres østover.</li>
      </ul>
      <p>
        <strong>Sørlig halvkule:</strong> svekket temperaturgradient gir svakere, mer bølget
        subtropisk jet. Den kan flytte seg nordover (mot ekvator).
      </p>
      <p>
        <strong>Nordlig halvkule:</strong> økt konveksjon kan gi en sterkere og rettere subtropisk
        jet.
      </p>
      <p>
        <strong>Polarjet:</strong> oftere svekket og mer bølget på sørlig halvkule. Færre møter med
        den subtropiske jeten gir færre kuldeutbrudd i Sør-Australia.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">IOD og ENSO</h2>
      <p>
        IOD er en egen modus i Indiahavet, men den snakker med{" "}
        <Link to="/tema/klima/enso" className="text-primary underline-offset-2 hover:underline">
          ENSO
        </Link>
        . Når positiv IOD faller sammen med El Niño, som i 1997 og 2019, forsterker de tørken i
        Australia. Begge vipper tørker Indonesia-siden samtidig. Negativ IOD kan forsterke nedbøren
        under La Niña.
      </p>
      <p>
        Mekanikken bak bølgene — Rossby og Coriolis — står under{" "}
        <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">
          jetstrømmer
        </Link>
        .
      </p>

      <Callout title="Til eksamen">
        <p>Varmt hav: luft stiger, lavtrykk, nedbør. Kaldt hav: luft synker, høytrykk, tørke.</p>
        <p>
          Positiv IOD: varmt i vest (Øst-Afrika = flom), kaldt i øst (Australia/Indonesia = tørke).
          Negativ IOD: motsatt.
        </p>
        <p>
          Skill IOD fra ENSO. ENSO sitter i tropisk Stillehav, IOD i tropisk Indiahav. De kan falle
          sammen, men de er ikke det samme.
        </p>
        <p>
          Skill temperaturkart og anomalikart (figur 3 mot et SST-avvikskart). Lilla vest på et
          temperaturkart er tropisk varmt vann, ikke automatisk positiv IOD.
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>
          All tørke i Australia er ikke El Niño. IOD er ofte en like direkte pådriver for tørke og
          brannfare der.
        </p>
        <p>
          Vestkysten av Australia er den <em>østlige</em> IOD-polen. Vest og øst følger Indiahavet,
          ikke det australske kontinentet.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="IOD"
          def="Øst–vest-svingning i tropisk Indiahav. Temperaturforskjellen styrer regn og tørke."
        />
        <Term name="DMI" def="Dipole Mode Index: havtemperatur i vest minus havtemperatur i øst." />
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
          name="Walker-sirkulasjon"
          def="Øst–vest-celle over tropisk hav. IOD flytter den vest eller øst."
        />
        <Term
          name="anomali"
          def="Avvik fra normalen. Viser om havet er varmere eller kaldere enn det pleier — ikke hvor mange grader det er."
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
            explain: "Positiv IOD: vestlig pol varm, østlig pol kald. Negativ IOD er det omvendte.",
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
            prompt: "Hva skjer med Walker-sirkulasjonen under positiv IOD?",
            options: [
              "Den skifter vestover. Mer synkende luft over østlige Indiahav.",
              "Den forsvinner.",
              "Den flytter til Nord-Atlanteren og blir NAO.",
              "Den snur og blir AMOC.",
            ],
            answer: 0,
            explain:
              "Konveksjonen samles i vest. Cellen forskyves vestover, og øst får mer synkende luft og tørke.",
          },
        ]}
      />
    </TopicLayout>
  );
}
