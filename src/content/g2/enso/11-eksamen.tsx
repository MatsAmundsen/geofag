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
          ENSO er <em>ikke</em> comprsåket av menneskeskapt global oppvarming.
        </p>
      </Callout>
    </>
  );
}
