import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
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
        "Den indiske hav-dipolen (IOD): Positiv og negativ fase, temperaturgradient i Det indiske hav, samspill med monsunen og ekstreme tørke- og flomhendelser i Afrika og Australia.",
      path: "/tema/klima/iod",
    }),
  component: IodPage,
});

function IodPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Det indiske hav"
      title="IOD: Den indiske hav-dipolen"
      lead="Mens Stillehavet har ENSO, har Det indiske hav sin egen termiske vippe: IOD. Temperaturforskjellen mellom Afrikas og Indonesias kyster kan utløse katastrofale flommer i Øst-Afrika og historiske skogbranner i Australia."
      banner="/images/banner-hav.jpg"
      bannerAlt="Havflate i sollys med antydning til strømmer og atmosfærisk sirkulasjon"
      prev={{ to: "/tema/klima/enso", label: "Forrige: ENSO" }}
      next={{ to: "/tema/klima/nao", label: "Neste: NAO" }}
      kilder={KILDER.iod}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er Den indiske hav-dipolen (IOD)?
      </h2>
      <p>
        <strong>Den indiske hav-dipolen (IOD)</strong>, ofte kalt «Det indiske havs El Niño», er en
        regelmessig svingning i havoverflatetemperaturen mellom to motstående områder (poler) i det
        tropiske Indiske hav (Saji et al., 1999):
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Den vestlige polen:</strong> Det vestlige Indiske hav utenfor kysten av Øst-Afrika og
          Arabiahavet.
        </li>
        <li>
          <strong>Den østlige polen:</strong> Det østlige Indiske hav sør for Indonesia (Sumatra og Java)
          og nordvest for Australia.
        </li>
      </ul>
      <p>
        Tilstanden måles med <strong>DMI (Dipole Mode Index)</strong>, som beregner temperaturdifferansen
        mellom den vestlige og den østlige polen (Australian Bureau of Meteorology, u.å.).
      </p>

      <OrdBoks
        ord="IOD (Indian Ocean Dipole)"
        barn="En koblet hav-atmosfære-svingning i Det indiske hav, definert av temperaturgradienten mellom det vestlige (Afrika) og det østlige (Indonesia) havbassenget."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Fasene i IOD: Positiv, nøytral og negativ
      </h2>
      <p>
        I likhet med ENSO veksler IOD mellom tre distinkte tilstander, vanligvis med en syklus på
        noen få år og med sterkest utvikling i perioden juni til november (Webster et al., 1999).
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        1. Positiv IOD-fase (+IOD)
      </h3>
      <p>
        I en positiv fase er havoverflaten <strong>varmere enn normalt i vest</strong> (utenfor Afrika) og
        <strong> kaldere enn normalt i øst</strong> (utenfor Indonesia).
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Mekanisme:</strong> Vinder langs ekvator blåser mot vest og dytter varmt vann mot Afrika, mens
          kaldt vann veller opp utenfor Sumatra.
        </li>
        <li>
          <strong>Konsekvens for Afrika:</strong> Den varme havoverflaten forsterker oppstigning og skydannelse.
          Land i Øst-Afrika (Somalia, Kenya, Etiopia) rammes av uvanlig kraftige regnskyll, flom og jordskred.
        </li>
        <li>
          <strong>Konsekvens for Australia og Indonesia:</strong> Det kalde vannet i øst undertrykker
          skydannelse. Australia og Indonesia rammes av ekstrem tørke, hetebølger og voldsom skogbrannfare.
          (Den beryktede <em>«Black Summer»</em>-brannsesongen i Australia i 2019/20 falt sammen med en av de
          sterkeste positive IOD-hendelsene som noensinne er målt).
        </li>
      </ul>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        2. Negativ IOD-fase (-IOD)
      </h3>
      <p>
        I en negativ fase snur mønsteret helt:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Mekanisme:</strong> Vesterlige vinder intensiveres og stabler opp unormalt varmt vann i det
          østlige Indiske hav (utenfor Indonesia/Australia), mens det vestlige bassenget blir kjøligere.
        </li>
        <li>
          <strong>Konsekvenser:</strong> Økt nedbør, oversvømmelser og tropiske sykloner over Indonesia og
          sørlige/østlige Australia, mens Øst-Afrika opplever tørrere forhold enn normalt.
        </li>
      </ul>

      <PhotoFigure
        src="/images/fig-hadley-kontekst.jpg"
        alt="Klimasirkulasjon og skyformasjoner over det tropiske havområdet"
        heading="Mekanismen bak IOD-gradienten"
        caption="Vind og havtemperatur låser hverandre: Varmt hav fordamper og løfter luften i den ene enden av bassenget, mens kaldt hav holder luften tørr og stabil i den andre."
        marks={[
          { x: 12, y: 35, n: "1", text: "Vestlig pol (Afrika)", tone: "warm" },
          { x: 75, y: 35, n: "2", text: "Østlig pol (Indonesia)", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Positiv fase: Varmt vann fordamper og gir store nedbørsmengder i Øst-Afrika." },
          { n: "2", label: "Positiv fase: Kaldt vann og nedsynking gir ekstrem tørke over Australia/Indonesia." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Samspill mellom IOD, ENSO og den asiatiske monsunen
      </h2>
      <p>
        Selv om IOD er en uavhengig dynamisk modus i Det indiske hav, kommuniserer den kontinuerlig med
        Stillehavet via atmosfæriske trykkbølger og gjennomstrømningen mellom de indonesiske øyene
        (Indonesian Throughflow):
      </p>
      <p>
        Når en positiv IOD faller sammen med en El Niño (som i 1997 og 2019), forsterker de hverandres
        tørkeeffekt i Australia dramatisk. Motsatt kan en negativ IOD forsterke nedbøren under La Niña.
      </p>
      <p>
        IOD har også en avgjørende betydning for styrken på den <strong>asiatiske sommermonsunen</strong>: En
        positiv IOD pumper ekstra fuktighet inn over India og forsterker monsunregnet, mens en negativ IOD kan
        svekke monsunen.
      </p>

      <Callout title="Til eksamen">
        <p>
          Husk koblingen mellom temperatur og nedbør:
          <br />
          <strong>Varmt havoverflatevann = oppstigende luft, lavtrykk og nedbør.</strong>
          <br />
          <strong>Kaldt havoverflatevann = nedsynkende luft, høytrykk og tørke.</strong>
          <br />
          For en <strong>positiv IOD</strong> betyr dette: Varmt i vest (Afrika = flom) og kaldt i øst
          (Australia = tørke).
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Mange antar at all tørke i Australia styres av El Niño. Forskning har vist at IOD ofte er en like
          kraftig — og noen ganger mer direkte — pådriver for australsk nedbør og skogbrannfare om våren og
          sommeren enn ENSO alene.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="IOD" def="Indian Ocean Dipole; temperaturforskjell mellom øst og vest i Det indiske hav." />
        <Term name="Positiv IOD" def="Varmt hav i vest (flom i Øst-Afrika), kaldt i øst (tørke i Australia)." />
        <Term name="Negativ IOD" def="Kaldt hav i vest (tørt i Afrika), varmt i øst (mye regn i Australia)." />
        <Term name="DMI" def="Dipole Mode Index; indeksen som måler styrken og fasen til IOD." />
        <Term name="Indonesian Throughflow" def="Havstrøm som frakter vann fra Stillehavet til Det indiske hav." />
        <Term name="Monsun-interaksjon" def="Hvordan havtemperaturen i Det indiske hav styrer sommermonsunens fuktighet." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva kjennetegner en positiv IOD-fase (+IOD)?",
            options: [
              "Havet er unormalt varmt utenfor Øst-Afrika og unormalt kaldt utenfor Indonesia og Australia.",
              "Hele Det indiske hav fryser til is.",
              "Havet utenfor Afrika blir iskaldt og Australia får rekordmye flom.",
              "Vannet fordamper helt fra ekvator.",
            ],
            answer: 0,
            explain:
              "I en positiv fase er den vestlige polen (Afrika) varmere enn normalen, mens den østlige polen (Indonesia) er kaldere.",
          },
          {
            prompt: "Hvilken konsekvens har en positiv IOD ofte for Australia?",
            options: [
              "Ekstreme snøfall og isbrevekst.",
              "Alvorlig tørke, hetebølger og økt risiko for katastrofale skogbranner.",
              "Voldsomme oversvømmelser og tropisk monsunregn.",
              "Ingen merkbar effekt overhodet.",
            ],
            answer: 1,
            explain:
              "Kaldt overflatevann utenfor Nordvest-Australia undertrykker skydannelsen og fører til langvarig tørke og stor brannfare.",
          },
        ]}
      />
    </TopicLayout>
  );
}
