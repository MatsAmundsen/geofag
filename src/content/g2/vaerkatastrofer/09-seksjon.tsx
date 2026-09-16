import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <>
      <Callout title="Til eksamen: Kjerneforskjeller og formler du må beherske">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Tropisk orkan vs. Norsk storm:</strong> Tropisk orkan er en <em>varmkjerne</em>{" "}
            drevet av hav over 26,5 °C og frigjøring av latent varme. En norsk storm på polarfronten
            er en <em>kaldkjerne</em> drevet av baroklin temperaturforskjell og jetstrømmen.
          </li>
          <li>
            <strong>Hvorfor ikke orkaner på ekvator?</strong> Fordi breddegraden er 0°, slik at
            Corioliskraften er null (f = 2Ω sin 0° = 0). Lufta suges rett inn og fyller
            lavtrykket uten rotasjon.
          </li>
          <li>
            <strong>Tornadogensens tre steg:</strong> 1) Vindskjæring gir horisontal virvel &rarr;
            2) Oppdrift tipper den til vertikal mesosyklon &rarr; 3) RFD strekker virvelen ned mot
            bakken, der rotasjonshastigheten eksploderer pga. bevaring av vinkelmoment (
            <em>L = m &times; v &times; r = konstant</em>).
          </li>
          <li>
            <strong>Stormfloens fire komponenter:</strong> 1) Springflo, 2) Invers barometereffekt
            (+1 cm per 1 hPa trykkfall), 3) Vindstuv (τ ∝ U²), og 4) Bølgeoppstuvning.
          </li>
          <li>
            <strong>Clausius-Clapeyron-regelen:</strong> Atmosfæren kan holde på 7 % mer vanndamp
            for hver 1 °C temperaturen stiger, noe som forsterker ekstremnedbør.
          </li>
        </ul>
      </Callout>

      <Callout title="Vanlige misforståelser om værkatastrofer">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>
              Misforståelse 1: «Vannet i badekarsluket roterer på grunn av Corioliseffekten.»
            </strong>{" "}
            Feil! Badekaret er altfor lite (noen desimeter) og tømmes for fort til at jordrotasjonen
            rekker å virke. Utformingen av sluket og restbevegelser i vannet bestemmer retningen.
            Corioliskraften krever store romlige skalaer (titalls til hundrevis av kilometer).
          </li>
          <li>
            <strong>
              Misforståelse 2: «Klimaendringer gjør at det blir orkaner i Oslofjorden.»
            </strong>{" "}
            Feil! Nord-Atlanteren og Skagerrak når aldri 26,5 °C ned til 50 meters dyp. Norge vil
            fortsatt herjes av ekstratropiske lavtrykk og polare lavtrykk, men disse kan bære mer
            vann og gi høyere stormflo på grunn av høyere havnivå.
          </li>
          <li>
            <strong>Misforståelse 3: «Stormflo er bare store bølger.»</strong> Feil! Stormflo er en
            heving av selve det flate vannspeilet forårsaket av trykkfall og vindstress. Bølgene
            kommer på toppen av dette hevede vannivået.
          </li>
        </ul>
      </Callout>
    </>
  );
}
