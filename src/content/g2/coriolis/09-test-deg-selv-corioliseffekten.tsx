import { Quiz } from "@/components/quiz";

export function TestDegSelvCorioliseffekten() {
  return (
    <>
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Corioliseffekten
      </h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den fundamentale fysiske årsaken til at Corioliseffekten oppstår?",
            options: [
              "Jordens magnetfelt trekker på ladede ioner i luften.",
              "Vi observerer bevegelse fra et roterende referansesystem (jorden), mens legemet beveger seg rett fram i rommet.",
              "Månens gravitasjon bremser atmosfærens rotasjon.",
              "Solen varmer opp den østlige siden av jorden før den vestlige.",
            ],
            answer: 1,
            explain:
              "Corioliskraften er en fiktiv kraft (treghetskraft). En luftpakke beveger seg i en rett linje i forhold til rommet (Newtons 1. lov), men fordi jorden roterer under den, ser banen krummet ut sett fra bakken.",
          },
          {
            prompt:
              "Hvorfor avbøyes også en vind som blåser rett mot ØST mot høyre (sørover mot ekvator) på nordlig halvkule?",
            options: [
              "Fordi luften treffer fjellkjeder som dytter den sørover.",
              "Fordi vind mot øst øker rotasjonsfarten rundt jordaksen; den økte sentrifugalkraften kaster luften ut fra aksen, noe som gir en overflatekomponent mot ekvator.",
              "Fordi ekvator har sterkere gravitasjon enn polene.",
              "Det er feil; bare nord-sør-vinder avbøyes av Coriolis.",
            ],
            answer: 1,
            explain:
              "Når luften beveger seg mot øst, roterer den raskere enn jorden rundt jordaksen (Ω + Δω). Dette øker sentrifugalkraften (m·ω²·r). På en kuleflate peker den økte sentrifugalkraften vekk fra aksen, noe som gir en kraftkomponent rettet mot ekvator — altså mot høyre i nord (Eötvös-effekten)!",
          },
          {
            prompt: "Hvorfor kan det aldri dannes tropiske orkaner på selve ekvatorlinjen (0°)?",
            options: [
              "Fordi havvannet ved ekvator er for kaldt til å fordampe.",
              "Fordi passatvindene kolliderer og kveler all vind.",
              "Fordi Coriolisparameteren f = 2Ω sin(φ) er nøyaktig null ved ekvator, slik at luften ikke kan settes i rotasjon.",
              "Fordi lufttrykket ved ekvator alltid er over 1030 hPa.",
            ],
            answer: 2,
            explain:
              "Ved ekvator er breddegraden 0°, og sin(0°) = 0. Uten Coriolis finnes det ingen sideveis kraft som kan avbøye den innstrømmende luften til en roterende virvel; luften fyller lavtrykket direkte opp uten rotasjon. Orkaner må ha minst f > 0 (over 5° bredde) for å rotere.",
          },
          {
            prompt:
              "Hva er geostrofisk vind, og hvorfor blåser den parallelt med isobarene?",
            options: [
              "Det er en lokal kastevind som raser nedover fjellsider.",
              "Det er vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt likevekt og opphever hverandre.",
              "Det er vind som blåser 90° rett inn i lavtrykket ved bakken.",
              "Det er en havstrøm som følger kontinentalsokkelen.",
            ],
            answer: 1,
            explain:
              "I fri atmosfære (uten friksjon) akselererer luften inntil Corioliskraften er nøyaktig like stor som trykkgradientkraften, men motsatt rettet (F_pg = F_c). Da slutter luften å bevege seg mot lavere trykk og blåser parallelt med isobarene.",
          },
          {
            prompt:
              "Hvorfor er påstanden om at vannet i vasken spinner pga. Corioliseffekten vitenskapelig feilaktig?",
            options: [
              "Fordi vann ikke er påvirket av tyngdekraften.",
              "Fordi Rossby-tallet for en vask er over 10 000, noe som betyr at kummens form og restvirvler er titusenvis av ganger sterkere enn Coriolis.",
              "Fordi Coriolis bare virker på saltvann, ikke på ferskvann.",
              "Fordi Corioliskraften bare eksisterer om natten.",
            ],
            answer: 1,
            explain:
              "Rossby-tallet Ro = U / (f·L) måler forholdet mellom treghetskrefter og Coriolis. I en vask er L bare noen desimeter, så Ro ≈ 13 000 >> 1. Coriolis er mikroskopisk svak på denne skalaen; kranens vinkel, kummens asymmetri og håndbevegelser bestemmer rotasjonen 100 %.",
          },
          {
            prompt:
              "Hva skjer med havvannet når det blåser en vedvarende nordavind sørover langs norskekysten?",
            options: [
              "Vannet presses rett inn i fjordene og skaper oversvømmelse.",
              "Ekman-transporten skyver overflatevannet 90° til høyre (vekk fra kysten), og kaldt, næringsrikt dypvann suges opp til overflaten (kystoppvelling).",
              "Golfstrømmen stopper fullstendig opp og snur sørover.",
              "Havoverflaten varmes opp til over 25 °C på få timer.",
            ],
            answer: 1,
            explain:
              "På nordlig halvkule fører vindstress og Coriolis til at netto Ekman-transport går 90° til høyre for vinden. Med nordavind sørover skyves overflatevannet vestover og ut i havet. Tomrommet ved kysten erstattes av oppvelling av kaldt, næringsrikt dypvann!",
          },
        ]}
      />
    </>
  );
}
