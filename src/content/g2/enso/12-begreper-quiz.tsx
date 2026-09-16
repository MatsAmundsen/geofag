import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";

export function BegreperQuiz() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Walker-sirkulasjon" def="Øst–vest-gående atmosfærisk celle over det ekvatoriale Stillehavet. Oppstigning i vest (Indonesia), nedsynking i øst (Peru)." />
        <Term name="El Niño" def="Varm fase av ENSO: svekkede passatvinder og oppvarming i det østlige Stillehavet. Typisk 9–12 måneder." />
        <Term name="La Niña" def="Kald fase av ENSO: forsterkede passatvinder og kraftig oppvelling i øst." />
        <Term name="Oppvelling (Upwelling)" def="Heving av kaldt, næringsrikt dypvann til overflaten. Under El Niño henter den lunkent vann fordi termoklinen ligger dypere." />
        <Term name="Termoklin" def="Sjiktet der temperaturen faller raskt med dybden. Flater ut og synker i øst under El Niño." />
        <Term name="Kelvin-bølge" def="Ekvatorial oseanisk bølge som bærer varmt overflatevann østover og varsler kommende El Niño." />
        <Term name="Bjerknes-tilbakekoblingen" def="Selvforsterkende løkke: svakere passat → dypere termoklin i øst → varmere SST → enda svakere passat. Forsterker, starter ikke." />
        <Term name="Telekobling" def="Klimatiske sammenhenger mellom fjerne deler av kloden, formidlet via Rossby-bølger." />
        <Term name="SOI" def="Southern Oscillation Index: normalisert trykkforskjell Tahiti minus Darwin. Negativ SOI = El Niño." />
        <Term name="ONI" def="Oceanic Niño Index: 3-månedlig SST-anomali i Niño 3.4. ONI ≥ +0,5 °C = El Niño." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva skjer med passatvindene og havtemperaturen utenfor Peru under El Niño?",
            options: [
              "Passatene blir sterkere, og havet utenfor Peru blir iskaldt.",
              "Passatene svekkes, varmt overflatevann brer seg østover og oppvellingen kollapser.",
              "Passatene snur og blåser mot polene.",
              "Havtemperaturen i hele Stillehavet synker drastisk.",
            ],
            answer: 1,
            explain: "Passatene svekkes og Bjerknes-løkka forsterker det. Kelvin-bølger trykker termoklinen ned i øst. Oppvelling henter lunkent vann — næringen svikter.",
          },
          {
            prompt: "Hva er forskjellen mellom SOI og ONI?",
            options: [
              "SOI måler lufttrykksforskjell, ONI måler havtemperaturavvik. Begge definerer ENSO-faser.",
              "SOI måler havtemperatur, ONI måler nedbør.",
              "SOI er nyest; ONI er eldst.",
              "De er det samme.",
            ],
            answer: 0,
            explain: "SOI er atmosfærebasert (Tahiti minus Darwin). ONI er havbasert (SST i Niño 3.4) og NOAAs operasjonelle definisjon.",
          },
          {
            prompt: "Hvorfor gir El Niño ofte tørke i Australia og Indonesia?",
            options: [
              "Havet rundt Australia fryser.",
              "Warm pool og konveksjon forskyves østover — Australia og Indonesia mister regnmotoren.",
              "Coriolis opphører i vest.",
              "All fuktighet suges opp i stratosfæren.",
            ],
            answer: 1,
            explain: "Konveksjonen flytter til sentrale og østlige Stillehavet. Regionen mister nedbør og får tørke og skogbrannfare.",
          },
          {
            prompt: "Må termoklinen endres før passatene kan svekkes i en El Niño?",
            options: [
              "Ja. Termoklinen må alltid synke i øst først.",
              "Nei. De forsterker hverandre. Et vestavindsutbrudd kan starte i atmosfæren; Kelvin-bølger endrer så termoklinen.",
              "Ja, men bare i La Niña.",
              "Nei, fordi termoklinen ikke finnes i tropene.",
            ],
            answer: 1,
            explain: "Bjerknes-løkka har ingen fast startknapp. Atmosfæren kan gå først. Havets varmelager kan være oppladet etter La Niña uten å være utløseren alene.",
          },
          {
            prompt: "Hva er en ekvatorial Kelvin-bølge, og hvilken rolle har den under El Niño?",
            options: [
              "En overflatebølge som dreper koraller.",
              "En indre oseanisk bølge som bærer varmt vann østover langs ekvator og utløser endringer i øst.",
              "En atmosfærisk tornado langs ekvator.",
              "En Rossby-bølge som går fra øst til vest.",
            ],
            answer: 1,
            explain: "Kelvin-bølgen følger ekvator østover med 2–3 m/s. Den er meldingen fra vest til øst og kan spores 3–6 måneder i forveien.",
          },
          {
            prompt: "Hvordan påvirker ENSO den globale gjennomsnittstemperaturen?",
            options: [
              "El Niño gir ofte rekordvarme år — havet frigjør overskuddsvarme. La Niña demper midlertidig.",
              "La Niña gjør jorda 5 grader varmere enn El Niño.",
              "ENSO har ingen effekt utenfor ekvator.",
              "El Niño blokkerer solstråling og gir global avkjøling.",
            ],
            answer: 0,
            explain: "El Niño-år slo temperaturrekorder i 1997/98, 2015/16 og 2023/24. La Niña demper midlertidig; den underliggende trenden er likevel oppover.",
          },
        ]}
      />
    </>
  );
}
