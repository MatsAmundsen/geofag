import { Callout } from "@/components/callout";

export function Eksamen() {
  return (
    <>
      <Callout title="Til eksamen">
        <p>
          Inne i en El Niño kan du fortelle kjeden slik:
          <br />
          <strong>
            1. Passaten svekkes → 2. Kelvin-bølge trykker termoklinen ned i øst
            → 3. Oppvelling henter lunkent vann, SST stiger → 4. Walker svekkes
            og konveksjonen flytter østover → 5. Telekoblinger via Rossby-bølger
            endrer jetstrømmene globalt.
          </strong>
        </p>
        <p>
          Si at det er <strong>Bjerknes-løkka</strong>, ikke en startknapp.
          Passaten må ikke vente på at termoklinen endres først: et
          vestavindsutbrudd kan starte i atmosfæren. Havets varmelager kan
          likevel være oppladet på forhånd (etter La Niña).
        </p>
        <p>
          Skil mellom <strong>SOI</strong> (lufttrykk-indeks, Tahiti minus
          Darwin) og <strong>ONI</strong> (havtemperaturavvik i Niño
          3.4-regionen). ONI er den offisielle operasjonelle definisjonen NOAA
          bruker i dag.
        </p>
        <p>
          Husk at La Niña ofte følger etter El Niño, og at effektene i mange
          tilfeller er <em>speilbildet</em> av El Niño.
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>
          ENSO er <em>ikke</em> forårsaket av menneskeskapt global oppvarming.
          Det er en naturlig svingning som har eksistert i tusenvis av år.
          Spørsmålet er om klimaendringer gjør ekstremhendelsene kraftigere.
        </p>
        <p>
          <em>El Niño betyr ikke nødvendigvis varmt vær i Europa.</em>{" "}
          Forbindelsene er indirekte og moduleres av NAO og polarvirvelen.
          Telekoblingene er statistiske tendenser, ikke garantier for
          enkeltvintre.
        </p>
        <p>
          <em>Passaten må ikke vente på at termoklinen endres først.</em> De
          forsterker hverandre. Et vestavindsutbrudd kan starte i atmosfæren;
          Kelvin-bølger endrer så termoklinen i øst. Havet kan likevel være
          oppladet på forhånd.
        </p>
        <p>
          <em>Oppvellingen skrus ikke av.</em> Den henter lunkent vann fordi
          termoklinen ligger dypere — derfor svikter næringen, ikke fordi
          vannet slutter å stige.
        </p>
        <p>
          <em>Ikke forveksl El Niño med IOD.</em> El Niño sitter i tropisk
          Stillehav; IOD sitter i tropisk Indiahav. De er ulike fenomener som
          kan sammenfalle og forsterke hverandre.
        </p>
        <p>
          <em>SOI og ONI måler det samme fenomenet, men med ulike metoder.</em>{" "}
          SOI er atmosfærebasert (lufttrykk), ONI er havbasert (temperatur).
          Begge brukes — og kan noen ganger peke litt ulikt i overgangsfaser.
        </p>
      </Callout>
    </>
  );
}
