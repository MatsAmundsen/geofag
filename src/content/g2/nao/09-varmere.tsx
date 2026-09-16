import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";

export function Varmere() {
  return (
    <>
      <CollapsibleSection
        title="7. NAO i en varmere verden og koblingen til AMOC"
        subtitle="Arktisk forsterkning, dypvannsdannelse i Labradorsjøen og havets minne"
        badge="Klimaendringer"
        badgeVariant="teal"
      >
        <p>
          Forholdet mellom NAO og havet er en toveiskobling på vidt forskjellige tidsskalaer.
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">NAO, havet og AMOC</h4>
            <p className="mt-1 text-sm sm:text-base">
              Når NAO låser seg i flere år (som på 1990-tallet), setter den spor i{" "}
              <Link to="/tema/klima/amoc" className="text-primary underline-offset-2 hover:underline">AMOC</Link>:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li><strong>Langvarig NAO+:</strong> Iskalde vinder over Labrador- og Grønlandshavet øker tettheten og dypvannsdannelsen. AMOC kan styrkes med 2–5 års forsinkelse.</li>
              <li><strong>Langvarig NAO−:</strong> Mindre avkjøling, redusert dypvannsdannelse — veltestrømmen kan bremses.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Arktisk forsterkning og «bølgete jet»-debatten</h4>
            <p className="mt-1 text-sm sm:text-base">
              Arktis varmes 3–4 ganger raskere enn globalt — <strong>arktisk forsterkning</strong> via is-albedo.
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li><strong>Francis &amp; Vavrus:</strong> Mindre pol–ekvator-kontrast svekker vestavinden (termalvind). Svakere jet meandrerer mer — flere blokkeringer og NAO−-lignende situasjoner.</li>
              <li><strong>Modellusikkerhet:</strong> Oppvarming i øvre troposfære over subtropene kan motvirke. Åpent spørsmål om fremtidens vintre blir sonale stormer eller fastlåste blokkeringer.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Paleoklima</h4>
            <p className="mt-1 text-sm sm:text-base">
              Dryppsteiner i Skottland og Spania, sediment- og iskjerner viser at vippen har svingt naturlig i tusener av år. 1900-tallets vedvarende positive fase var blant de sterkeste siste årtusen.
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
