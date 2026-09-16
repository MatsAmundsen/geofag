import { Quiz } from "@/components/quiz";

export function TestDegSelvVaerkatastrofer() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Værkatastrofer
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor dannes det aldri tropiske orkaner på ekvator (mellom 0° og 5° breddegrad)?",
            options: [
              "Fordi havet er for grunt og mangler tilstrekkelig termisk treghet.",
              "Fordi Corioliskraften er null ved ekvator (f = 2Ω sin 0° = 0), slik at innstrømmende luft ikke settes i rotasjon.",
              "Fordi det aldri er tordenvær eller fuktighet i den intertropiske konvergenssonen.",
              "Fordi passatvindene blåser orkanene over ende før de rekker å rotere.",
            ],
            answer: 1,
            explain:
              "Corioliskraften avhenger av sinus til breddegraden: f = 2Ω sin φ. Ved ekvator er φ = 0°, noe som gir f = 0. Uten Coriolis-avbøyning strømmer luften rett inn i lavtrykket og fyller det opp umiddelbart. Orkaner trenger minst 5° breddegrad for å få tilstrekkelig rotasjon.",
          },
          {
            prompt:
              "Hva er den fysiske mekanismen bak den voldsomme rotasjonsakselerasjonen når en tornado dannes under en supercelle?",
            options: [
              "Luftmolekylene kolliderer med iskrystaller og lades opp elektrostatisk.",
              "Bevaring av vinkelmoment (L = m · v · r): Når RFD klemmer og strekker virvelens radius ned mot 50–100 m, eksploderer rotasjonshastigheten v.",
              "Corioliskraften er tusen ganger sterkere under tordenskyer enn over åpent landskap.",
              "Varmen fra bakken skaper en eksplosjon som slynger luften utover.",
            ],
            answer: 1,
            explain:
              "Akkurat som en kunstløper som trekker armene inn mot kroppen og roterer raskere, må vinkelmomentet L = m·v·r bevares. Når mesosyklonens virvelradius r minker fra flere tusen meter til under hundre meter i trakten, må vindhastigheten v øke voldsomt, ofte til over 300–400 km/t.",
          },
          {
            prompt:
              "Dersom et intenst lavtrykk på 943 hPa treffer kysten, hvor mye vil havoverflaten heve seg alene som følge av den inverse barometereffekten?",
            options: [
              "Omtrent 7 cm.",
              "Omtrent 35 cm.",
              "Omtrent 70 cm (ca. 1 cm per 1 hPa trykkfall under standardtrykket på 1013 hPa).",
              "Ingenting, fordi lufttrykk bare påvirker gasser og ikke væsker.",
            ],
            answer: 2,
            explain:
              "Standardatmosfæren er 1013 hPa. Trykkfallet i lavtrykket er 1013 - 943 = 70 hPa. Den inverse barometereffekten hever havflaten med ca. 1 cm for hver hPa trykket faller, noe som alene gir en heving på ca. 70 cm over normalen.",
          },
          {
            prompt: "Hva kjennetegner en 'meteorologisk bombe' (eksplosiv syklonegenese)?",
            options: [
              "At et lavtrykk eksploderer og forsvinner i løpet av få timer.",
              "At et lavtrykk på midlere breddegrader opplever et sentraltrykkfall på minst 24 hPa på 24 timer, ofte med sting jets og orkan i vindkastene.",
              "At lynnedslag i havoverflaten antenner metangass fra havbunnen.",
              "At en tropisk orkan kolliderer med en tornado over åpent hav.",
            ],
            answer: 1,
            explain:
              "Sanders & Gyakum (1980) definerte bomben som et ekstratropisk lavtrykk med et trykkfall på minst 24 hPa på 24 timer (breddegradskorrigert). Den drives av kollisjon mellom arktisk og subtropisk luft koblet til en jetstreak, og gir ofte sting jets med orkan i kastene (slik som Nyttårsorkanen 1992 og Ingunn 2024).",
          },
          {
            prompt:
              "Hvorfor er polare lavtrykk i Norskehavet og Barentshavet så notorisk farlige for kystfartøy?",
            options: [
              "Fordi de bare dannes midt på sommeren når fiskerne har ferie.",
              "Fordi de er kompakte (150–300 km), utvikles på få timer, og gir brå vindøkning til orkan, tett snøfokk (whiteout) og alvorlig ising.",
              "Fordi de koker havvannet slik at båtene mister oppdriften og synker.",
              "Fordi de alltid ledsages av undersjøiske tsunamier.",
            ],
            answer: 1,
            explain:
              "Polare lavtrykk er små og raskt utviklende systemer under arktiske kaldluftsutbrudd. Vinden kan gå fra svak bris til orkan på under 30 minutter, og kombinasjonen av minusgrader og sjøsprøyt gir rask og farlig ising som kan kantre skip.",
          },
          {
            prompt: "Hva sier Clausius-Clapeyron-sammenhengen om ekstremnedbør i et varmere klima?",
            options: [
              "At luftens kapasitet til å holde på vanndamp øker med ca. 7 % for hver 1 °C oppvarming, noe som mater mer fuktighet inn i ekstremregn.",
              "At det slutter å regne fordi all vanndamp fordamper til verdensrommet.",
              "At havet kjøles ned med 7 % hver gang det regner på Vestlandet.",
              "At orografisk nedbør bare kan oppstå i minusgrader.",
            ],
            answer: 0,
            explain:
              "Clausius-Clapeyron-relasjonen er en fundamental termodynamisk formel: Metningstrykket for vanndamp øker eksponensielt med temperaturen, omtrent 7 % per grad celsius. Varmere luft kan dermed transportere og dumpe vesentlig større mengder vann.",
          },
          {
            prompt:
              "Hva beregner forskerne i World Weather Attribution (WWA) når de analyserer en ekstrem værhendelse?",
            options: [
              "Det nøyaktige klokkeslettet for når neste storm vil inntreffe om 50 år.",
              "Risk Ratio (RR): Hvor mange ganger mer sannsynlig eller intens hendelsen ble i dagens klima sammenlignet med et hypotetisk klima uten menneskeskapte utslipp.",
              "Hvor mange tonn CO2 som ble sluppet ut under selve stormen.",
              "Navnet på den meteorologen som varslet feil.",
            ],
            answer: 1,
            explain:
              "Attribution science sammenligner sannsynligheten for hendelsen i klimamodeller med og uten menneskeskapte klimagasser. Forholdet mellom disse sannsynlighetene kalles Risk Ratio (RR). Hvis RR = 3, ble hendelsen tre ganger så sannsynlig på grunn av global oppvarming.",
          },
        ]}
      />
    </>
  );
}
