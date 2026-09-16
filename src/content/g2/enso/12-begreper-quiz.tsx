import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";

export function BegreperQuiz() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Viktige begreper
      </h2>
      <TermGrid>
        <Term
          name="Walker-sirkulasjon"
          def="Øst–vest-gående atmosfærisk sirkulasjonscelle over det ekvatoriale Stillehavet. Oppstigning i vest (Indonesia), nedsynking i øst (Peru)."
        />
        <Term
          name="El Niño"
          def="Varm fase av ENSO: svekkede passatvinder og oppvarming i det østlige Stillehavet. Perioden er typisk 9–12 måneder."
        />
        <Term
          name="La Niña"
          def="Kald fase av ENSO: forsterkede passatvinder og kraftig oppvelling i øst. Kaldere hav i sentrale og østlige Stillehavet."
        />
        <Term
          name="Oppvelling (Upwelling)"
          def="Heving av kaldt, næringsrikt dypvann til overflaten. Under El Niño henter den lunkent vann fordi termoklinen ligger dypere."
        />
        <Term
          name="Termoklin"
          def="Sjiktet i havet der temperaturen faller raskt med dybden. Flater ut og synker i øst under El Niño."
        />
        <Term
          name="Kelvin-bølge"
          def="Ekvatorial oseanisk bølge som bærer varmt overflatevann østover og varsler kommende El Niño-episode."
        />
        <Term
          name="Bjerknes-tilbakekoblingen"
          def="Selvforsterkende løkke: svakere passat → dypere termoklin i øst → varmere SST → enda svakere passat. Forsterker, starter ikke."
        />
        <Term
          name="Telekobling"
          def="Klimatiske sammenhenger mellom fjerne deler av kloden, formidlet via atmosfæriske Rossby-bølger."
        />
        <Term
          name="SOI"
          def="Southern Oscillation Index: normalisert trykkforskjell Tahiti minus Darwin. Negativ SOI = El Niño."
        />
        <Term
          name="ONI"
          def="Oceanic Niño Index: 3-månedlig glidende gjennomsnitt av SST-anomali i Niño 3.4-regionen. ONI ≥ +0,5 °C = El Niño."
        />
      </TermGrid>

      {/* ── Quiz ─────────────────────────────────────────────────────── */}
      <Quiz
        questions={[
          {
            prompt:
              "Hva skjer med passatvindene og havtemperaturen utenfor Peru under en El Niño-fase?",
            options: [
              "Passatvindene blir mye sterkere, og havet utenfor Peru blir iskaldt.",
              "Passatvindene svekkes, varmt overflatevann brer seg østover og oppvellingen kollapser.",
              "Passatvindene snur og blåser mot polene.",
              "Havtemperaturen i hele Stillehavet synker drastisk.",
            ],
            answer: 1,
            explain:
              "Under El Niño svekkes passatene, og Bjerknes-løkka forsterker det. Kelvin-bølger trykker termoklinen ned i øst. Oppvelling fortsetter, men henter lunkent vann — derfor svikter næringen.",
          },
          {
            prompt: "Hva er forskjellen mellom SOI og ONI?",
            options: [
              "SOI måler lufttrykksforskjell (atmosfære), ONI måler havtemperaturavvik. Begge brukes til å definere ENSO-faser.",
              "SOI måler havtemperatur, ONI måler nedbør. De brukes til ulike ting.",
              "SOI er den nyeste indeksen; ONI er den eldste og gir mest nøyaktig svar.",
              "De er akkurat det samme og kan brukes om hverandre uten forbehold.",
            ],
            answer: 0,
            explain:
              "SOI (Southern Oscillation Index) er atmosfærebasert: normalisert trykkforskjell mellom Tahiti og Darwin. ONI (Oceanic Niño Index) er havbasert: SST-anomali i Niño 3.4-regionen. ONI er den operasjonelle NOAA-definisjonen i dag.",
          },
          {
            prompt: "Hvorfor gir El Niño ofte tørke i Australia og Indonesia?",
            options: [
              "Fordi havet rundt Australia fryser til is.",
              "Det varme basseng og konveksjonsområdet forskyves østover — Australia og Indonesia mister sin motor for regndannelse.",
              "Fordi Coriolis-effekten opphører i det vestlige Stillehavet.",
              "Fordi all fuktighet suges opp i stratosfæren.",
            ],
            answer: 1,
            explain:
              "Warm pool og den kraftige konveksjonen flytter fra Indonesia/Australia til det sentrale og østlige Stillehavet. Regionen mister nedbørsmotoren og opplever tørke, varme og økt skogbrannfare.",
          },
          {
            prompt:
              "Må termoklinen endres før passatene kan svekkes i en El Niño?",
            options: [
              "Ja. Termoklinen må alltid synke i øst før passaten kan slakke.",
              "Nei. De forsterker hverandre. Et vestavindsutbrudd kan starte i atmosfæren; Kelvin-bølger endrer så termoklinen. Havet kan likevel være oppladet på forhånd.",
              "Ja, men bare i La Niña.",
              "Nei, fordi termoklinen ikke finnes i tropene.",
            ],
            answer: 1,
            explain:
              "Bjerknes-løkka har ingen fast startknapp. Atmosfæren kan gå først (vestavindsutbrudd). Havets varmelager kan være oppladet etter La Niña uten at det alene er utløseren.",
          },
          {
            prompt:
              "Hva er en ekvatorial Kelvin-bølge, og hvilken rolle spiller den under El Niño?",
            options: [
              "En overflatebølge i havet som dreper koraller.",
              "En indre oseanisk bølge som bærer varmt overflatevann østover langs ekvator og utløser El Niño-endringer i øst.",
              "En atmosfærisk bølge som ligner en tornado langs ekvator.",
              "En Rossby-bølge som går fra øst til vest.",
            ],
            answer: 1,
            explain:
              "En ekvatorial Kelvin-bølge er en indre oseanisk bølge som følger ekvator og bærer varmt vann østover med 2–3 m/s. Den er «meldingen» fra vest til øst om at El Niño er i gang, og kan spores med satellitter 3–6 måneder i forveien.",
          },
          {
            prompt:
              "Hvordan påvirker ENSO den globale gjennomsnittstemperaturen i lufta?",
            options: [
              "El Niño gir ofte rekordvarme år globalt — havet frigjør overskuddsvarme til atmosfæren. La Niña demper temperaturen midlertidig.",
              "La Niña gjør hele jorda 5 grader varmere enn El Niño.",
              "ENSO har overhodet ingen effekt utenfor ekvator.",
              "El Niño blokkerer all solstråling og gir global avkjøling.",
            ],
            answer: 0,
            explain:
              "Det enorme varme Stillehavet under El Niño avgir store mengder energi til atmosfæren. El Niño-år slo globale temperaturrekorder i 1997/98, 2015/16 og 2023/24. La Niña demper temperaturen midlertidig, men den underliggende trenden fra klimaendringer er oppover.",
          },
        ]}
      />
    </>
  );
}
