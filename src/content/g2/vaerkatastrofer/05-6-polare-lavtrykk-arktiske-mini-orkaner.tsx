import { PolarLowFormationDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function PolareLavtrykkArktiskeMiniOrkaner() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        6. Polare lavtrykk: Arktiske mini-orkaner
      </h2>
      <p>
        I Norskehavet og Barentshavet om vinteren opptrer et annet særegent og fryktet værsystem:{" "}
        <strong>polare lavtrykk</strong> (Polar Lows). De kalles ofte «Arktis' mini-orkaner» fordi
        de på satellittbilder har en slående likhet med tropiske sykloner: en kompakt, roterende
        kommaspiral med et skyfritt øye i sentrum (Meteorologisk institutt, u.å.-a).
      </p>
      <p>
        Polare lavtrykk oppstår under et{" "}
        <strong>marint kaldluftsutbrudd (Marine Cold-Air Outbreak, MCAO)</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Iskald, knusktørr arktisk luft (-25 °C til -40 °C) blåser sørover fra pakkisen og
          Svalbard.
        </li>
        <li>
          Luften treffer det åpne, relativt varme Atlanterhavsvannet i Norskehavet (+4 °C til +7
          °C).
        </li>
        <li>
          Temperaturforskjellen mellom havoverflaten og luften like over kan overstige{" "}
          <strong>35–45 °C</strong>!
        </li>
      </ul>
      <p>
        Dette skaper en kolossal vertikal varme- og fuktfluks fra havet opp i atmosfæren (ofte over{" "}
        <strong>600–1000 W/m²</strong>). Atmosfæren blir voldsomt ustabil, og oppdriften danner dype
        konvektive skygater som kveiles sammen av Corioliskraften.
      </p>

      <PolarLowFormationDiagram />

      <p>
        <strong>Hvorfor er polare lavtrykk så farlige?</strong>
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Liten skala (150–300 km):</strong> De er for små til å fanges opp nøyaktig av
          globale varslingsmodeller med grovt rutenett, og kan utvikle seg på under 6–12 timer.
        </li>
        <li>
          <strong>Plutselig orkan og vindkantring:</strong> Vinden kan øke fra stille bris til full
          storm og orkan på under 30 minutter, med brå 180-graders vindkantring når øyet passerer.
        </li>
        <li>
          <strong>Tett snøfokk (Whiteout) og ising:</strong> Kombinasjonen av minusgrader og
          sjøsprøyt gir rask og livsfarlig ising på fiskefartøy, noe som forskyver skipets
          tyngdepunkt og kan føre til kantring.
        </li>
      </ul>

      <OrdBoks
        ord="Polart lavtrykk"
        barn="Et lite, intenst marint lavtrykk (150–300 km) i polarområdene drevet av voldsom varmefluks når iskald arktisk luft strømmer ut over åpent, varmt hav (kaldluftsutbrudd). Kjennetegnes av orkan i kastene, tett snøfokk og et øye."
      />
    </>
  );
}
