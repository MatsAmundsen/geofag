import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/enso")({
  head: () =>
    topicHead({
      title: "ENSO: El Niño og La Niña · Geofag 2",
      description:
        "El Niño–Sørlige oscillasjon (ENSO): Walker-sirkulasjonen, passatvinder, termoklin, telekoblinger og hvordan svingningen i Stillehavet styrer globalt vær.",
      path: "/tema/klima/enso",
    }),
  component: EnsoPage,
});

function EnsoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Tropisk Stillehav"
      title="ENSO: El Niño og La Niña"
      lead="Ingen enkelt svingning påvirker jordas vær fra år til år mer enn ENSO. Når passatvindene slakker av over det tropiske Stillehavet, forskyves planetens største varmelager — med flom, tørke og globale temperaturhopp som resultat."
      banner="/images/fig-enso.jpg"
      bannerAlt="Det tropiske Stillehavet sett fra verdensrommet med konveksjonsskyer over varmt hav"
      prev={{ to: "/tema/klima/oversikt", label: "Forrige: Klimasystemet (oversikt)" }}
      next={{ to: "/tema/klima/iod", label: "Neste: IOD" }}
      kilder={KILDER.enso}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er ENSO?
      </h2>
      <p>
        <strong>ENSO</strong> står for <em>El Niño–Southern Oscillation</em> (El Niño–Sørlige oscillasjon).
        Det er et koblet samspill mellom havoverflatetemperaturen i det tropiske Stillehavet og
        atmosfærens trykk- og vindmønstre (Philander, 1983). Svingningen har tre tilstander:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Nøytral tilstand (normalen):</strong> Sterke passatvinder fra øst mot vest dytter varmt
          overflatevann mot Indonesia.
        </li>
        <li>
          <strong>El Niño (varm fase):</strong> Passatvindene svekkes eller snur. Varmt overflatevann flyter
          østover mot Sør-Amerika.
        </li>
        <li>
          <strong>La Niña (kald fase):</strong> Passatvindene er unormalt sterke. Varmt vann presses ekstra langt
          vest, og det kalde dypvannet i øst blir enda mer dominerende.
        </li>
      </ul>

      <OrdBoks
        ord="ENSO"
        barn="En naturlig og syklisk variasjon (med 2–7 års mellomrom) i havtemperatur og lufttrykk i det ekvatoriale Stillehavet, bestående av El Niño, La Niña og nøytrale faser."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Normaltilstanden og Walker-sirkulasjonen
      </h2>
      <p>
        Under normale forhold blåser de sørøstlige og nordøstlige <strong>passatvindene</strong> jevnt mot
        vest langs ekvator (Bjerknes, 1969). Denne vinden dytter solvarmet overflatevann vestover.
      </p>
      <p>
        I det vestlige Stillehavet (rundt Indonesia og Nord-Australia) dannes det et enormt basseng med
        varmt overflatevann (ofte over 28–30 °C). Dette kalles <em>det vestlige varmebassenget</em> (warm pool).
        Her varmes luften opp, stiger kraftig (konveksjon), og danner store nedbørsmengder.
      </p>
      <p>
        Samtidig må det vannet som skyves bort fra Sør-Amerika erstattes. Utenfor kysten av Peru og Ecuador
        trekkes kaldt, næringsrikt dypvann opp til overflaten — en prosess som kalles <strong>oppvelling</strong>{" "}
        (upwelling). Den kalde havoverflaten i øst avkjøler luften over, slik at den synker og gir tørt,
        stabilt klima.
      </p>
      <p>
        Dette lukkede luftsirkulasjonsmønsteret langs ekvator — oppstigning i vest, transport østover i høyden,
        nedsynking i øst og passatvinder vestover ved overflaten — kalles <strong>Walker-sirkulasjonen</strong>.
      </p>

      <PhotoFigure
        src="/images/fig-enso.jpg"
        alt="Satellittbilde av det tropiske Stillehavet med skydannelse over det varme bassenget"
        heading="Walker-sirkulasjonen under normale forhold"
        caption="Passatene dytter varmt vann mot vest. Varmt vann i vest gir oppstigning og regn. Kaldt oppvellingsvann i øst gir tørre forhold utenfor Sør-Amerika."
        arrows={[{ d: "M 78 32 L 28 28", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 58, y: 12, n: "1", text: "Passatvinder mot vest", tone: "teal" },
          { x: 8, y: 48, n: "2", text: "Varmt basseng & konveksjon", tone: "warm" },
          { x: 80, y: 55, n: "3", text: "Oppvelling av kaldt vann", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Passatvinden stabler opp overflatevann i vest (sjønivået er opptil 0,5 m høyere der)." },
          { n: "2", label: "Intens fordamping og dyp konveksjon over Indonesia." },
          { n: "3", label: "Næringsrikt, kaldt dypvann gir verdens rikeste fiskerier utenfor Peru." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        El Niño: Når systemet snur
      </h2>
      <p>
        Med ujevne mellomrom (typisk hvert 3.–7. år) begynner passatvindene å svekkes (Trenberth, 1997). Uten det
        kontinuerlige vindpresset klarer ikke gravitasjonen lenger å holde det varme vannet samlet i vest.
      </p>
      <p>
        En bølge av varmt overflatevann brer seg østover langs ekvator som en indre oseanisk bølge (en ekvatorial
        Kelvin-bølge). Dette fører til dramatiske endringer:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Termoklinen flater ut:</strong> Skillelaget mellom det varme overflatevannet og det kalde
          dypvannet (termoklinen) synker i øst. Oppvellingen utenfor Peru klarer ikke lenger å hente kaldt vann;
          den pumper bare rundt lunkent overflatevann.
        </li>
        <li>
          <strong>Konveksjonen flytter:</strong> Det store nedbørsområdet forlater Indonesia og flytter seg til det
          sentrale og østlige Stillehavet.
        </li>
        <li>
          <strong>Lokale konsekvenser:</strong> Ørkenområder i Peru og Ecuador rammes av voldsom nedbør og
          leirskred, mens fisket kollapser fordi næringstilførselen stanser. Indonesia og Øst-Australia rammes av
          alvorlig tørke og skogbranner.
        </li>
      </ul>

      <OrdBoks
        ord="Termoklin"
        barn="Det sjiktet i havet der temperaturen faller raskt med dybden. Under El Niño trykkes termoklinen ned i det østlige Stillehavet, noe som kveler tilførselen av kaldt næringsrikt bunnvann."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        La Niña: Den forsterkede normalen
      </h2>
      <p>
        La Niña er den motsatte ekstremfasen. Passatvindene blåser sterkere enn normalt. Det varme overflatevannet
        skyves enda hardere mot vest, og oppvellingen i øst blir ekstra kraftig.
      </p>
      <p>
        Havoverflaten i det sentrale og østlige Stillehavet blir da 1–3 °C kaldere enn gjennomsnittet (NOAA, u.å.).
        Dette forsterker tørken i Peru og det sørvestlige USA, mens Australia og Sørøst-Asia opplever ekstreme
        monsunregn og sykloner.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Telekoblinger: Hvordan ENSO påvirker hele kloden
      </h2>
      <p>
        Når et enormt nedbørs- og konveksjonsbelte flytter seg tusenvis av kilometer i tropene, påvirker det
        varmetransporten i hele atmosfæren. Dette kalles <strong>telekoblinger</strong> (Bjerknes, 1969).
      </p>
      <p>
        Konveksjonen sender ut storskala atmosfæriske bølger (Rossby-bølger) som forskyver jetstrømmene på den
        nordlige og sørlige halvkule:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Global temperatur:</strong> Under kraftige El Niño-år (som 1997/98, 2015/16 og 2023/24) avgir
          det store varme Stillehavet enorme mengder energi til luften. Dette setter ofte nye globale
          temperaturrekorder. Under La Niña absorberer havet mer varme, og den globale lufttemperaturen dempes
          midlertidig.
        </li>
        <li>
          <strong>Orkaner i Atlanterhavet:</strong> El Niño skaper sterkere vertikal vindskjær over Det karibiske
          hav og Atlanterhavet, noe som river i stykker tropiske orkaner (færre orkaner). La Niña reduserer
          vindskjæret og gir ofte svært aktive orkansesonger i Atlanteren.
        </li>
        <li>
          <strong>Været i Europa:</strong> Koblingen til Europa er mer indirekte og moduleres av NAO, men kraftige
          El Niño-vintre øker sannsynligheten for visse trykkmønstre i Nord-Atlanteren.
        </li>
      </ul>

      <Callout title="Til eksamen">
        <p>
          Husk årsakskjeden for El Niño til eksamen:
          <br />
          <strong>1. Svekket passatvind → 2. Varmt vann flyter østover → 3. Oppvelling opphører og termoklin synker i øst → 4. Konveksjon/regn flytter fra Indonesia til midt-/øst-Stillehavet → 5. Telekoblinger endrer jetstrømmene globalt.</strong>
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          ENSO er <em>ikke</em> forårsaket av menneskeskapt global oppvarming — inkasifiserte kilder og geologiske
          arkiv viser at El Niño har eksistert i tusenvis av år. Det sentrale spørsmålet for dagens forskning er
          om en varmere atmosfære og overflate gjør de ekstreme El Niño- og La Niña-hendelsene hyppigere og
          kraftigere.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Walker-sirkulasjon" def="Øst-vestgående luftsirkulasjonscelle over det ekvatoriale Stillehavet." />
        <Term name="El Niño" def="Varm fase av ENSO; svekkede passater og oppvarming i østlige Stillehav." />
        <Term name="La Niña" def="Kald fase av ENSO; forsterkede passater og kraftig oppvelling i øst." />
        <Term name="Oppvelling (Upwelling)" def="Heving av kaldt, næringsrikt dypvann til overflaten." />
        <Term name="Telekobling" def="Klimatiske sammenhenger og bølgekoblinger mellom fjerne områder på kloden." />
        <Term name="SOI / ONI" def="Indekser (Southern Oscillation Index / Oceanic Niño Index) som kvantifiserer ENSO-styrken." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva skjer med passatvindene og havtemperaturen utenfor Peru under en El Niño-fase?",
            options: [
              "Passatvindene blir mye sterkere, og havet utenfor Peru blir iskaldt.",
              "Passatvindene svekkes, og varmt overflatevann brer seg østover mot Peru slik at oppvellingen svekkes.",
              "Passatvindene snur og blåser mot polene.",
              "Havtemperaturen i hele Stillehavet synker drastisk under null.",
            ],
            answer: 1,
            explain:
              "Under El Niño svekkes passatene, og det varme overflatevannet flyter østover, noe som undertrykker oppvellingen av kaldt vann utenfor kysten av Sør-Amerika.",
          },
          {
            prompt: "Hvorfor gir El Niño ofte tørke i Australia og Indonesia?",
            options: [
              "Fordi havet rundt Australia fryser til is.",
              "Fordi det varme vannet og det tilhørende lavtrykks- og oppstigningsområdet flytter seg østover bort fra regionen.",
              "Fordi Corioliseffekten opphører i det vestlige Stillehavet.",
              "Fordi all fuktighet suges opp i stratosfæren.",
            ],
            answer: 1,
            explain:
              "Når det varme overflatebassenget forlater Indonesia/Australia og flytter mot det sentrale Stillehavet, forsvinner også den kraftige sky- og nedbørsdannelsen.",
          },
          {
            prompt: "Hvordan påvirker ENSO vanligvis den globale gjennomsnittstemperaturen i lufta?",
            options: [
              "El Niño gir ofte ekstra varme år globalt fordi havet frigjør overskuddsvarme til atmosfæren, mens La Niña har en midlertidig dempende effekt.",
              "La Niña gjør hele jorda 5 grader varmere enn El Niño.",
              "ENSO har overhodet ingen effekt utenfor ekvator.",
              "El Niño gjør at all stråling fra solen blokkeres.",
            ],
            answer: 0,
            explain:
              "Det enorme varme overflatearealet under El Niño avgir store mengder varme til atmosfæren, noe som ofte gjør El Niño-år til globale rekordår for lufttemperatur.",
          },
        ]}
      />
    </TopicLayout>
  );
}
