import { StormSurgeDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function StormfloNarHavetHevesOgStablesMo() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        8. Stormflo: Når havet heves og stables mot land
      </h2>
      <p>
        Mange tror at stormflo bare er store bølger som slår inn over land. Det er en alvorlig
        feiloppfatning. En <strong>stormflo</strong> er en unormal heving av{" "}
        <em>selve havoverflaten</em>, der middelvannspeilet løftes flere meter over sjøkartnull
        (Kartverket, u.å.).
      </p>
      <p>En ekstrem stormflo oppstår når fire uavhengige fysiske mekanismer inntreffer samtidig:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Astronomisk tidvann (Springflo):</strong> Når månen og solen står på linje i
          forhold til jorden (ved nymåne og fullmåne), adderes deres gravitasjonskrefter og gir
          maksimal tidevannsforskjell. Dersom en storm treffer nøyaktig på springfloens toppunkt, er
          utgangsnivået allerede hevet med opptil én meter i deler av Nord-Norge og på Vestlandet.
        </li>
        <li>
          <strong>2. Den inverse barometereffekten:</strong> Lufttrykket utøver en mekanisk vekt på
          havoverflaten (1013,25 hPa tilsvarer 10 tonn per m²). I et dypt lavtrykk på f.eks. 950 hPa
          veier luftsøylen over havet vesentlig mindre enn i omkringliggende høytrykk. Vekten
          letter, og havoverflaten suges opp:{" "}
          <strong>For hver 1 hPa lufttrykket faller, heves havoverflaten med nøyaktig 1 cm!</strong>{" "}
          Et trykkfall på 63 hPa (fra 1013 til 950 hPa) gir en ren barometrisk heving på{" "}
          <strong>+63 cm</strong>.
        </li>
        <li>
          <strong>3. Vindstuv (Wind Setup):</strong> Når sterk pålandsvind blåser over grunt
          kystfarvann, utøver friksjonen mellom luft og vann en skjærspenning (τ₀ = ρₐ C_D U²). Vannet drives med vinden og stuves fysisk opp mot kystlinjen og inn i trange
          fjorder og bukter. Vindstuvet øker med kvadratet av vindhastigheten og er størst på
          langgrunne sokkelområder (som i Nordsjøen og Vadehavet).
        </li>
        <li>
          <strong>4. Bølgeoppstuvning (Wave Setup):</strong> Når gigantiske stormbølger bryter mot
          land og grunner, frigjøres bølgeenergi som presser vannmasser opp på stranden og kaiene
          utover selve vannstandsnivået.
        </li>
      </ol>

      <StormSurgeDiagram />

      <OrdBoks
        ord="Invers barometereffekt"
        barn="Hevingen av havoverflaten som skyldes redusert lufttrykk. Havet heves med om lag 1 cm for hvert hektopascal (hPa) trykket faller under standardatmosfæren (1013,25 hPa)."
      />
    </>
  );
}
