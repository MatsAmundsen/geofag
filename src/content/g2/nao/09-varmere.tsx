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
          Hvordan påvirkes NAO av global oppvarming, og hvordan påvirker NAO havet tilbake? Forholdet
          mellom atmosfærens trykkvippe og verdenshavet er en toveiskobling som opererer på vidt
          forskjellige tidsskalaer.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              NAOs påvirkning på havet og AMOC (Golfstrømsystemet)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Atmosfæren endrer seg fra dag til dag, men havet har en enorm termisk treghet. Når NAO
              låser seg i en fase over flere år (som på 1990-tallet), setter den dype spor i{" "}
              <Link to="/tema/klima/amoc" className="text-primary underline-offset-2 hover:underline">
                AMOC (den atlantiske veltestrømmen)
              </Link>
              :
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>Under langvarig NAO+:</strong> Kraftige, iskalde vinder over Labradorhavet
                og Grønlandshavet trekker varme ut av overflatevannet. Vannet blir tettere, synker til
                bunns og stimulerer dypvannsdannelsen. Dette kan <strong>styrke AMOC</strong> med en
                tidsforsinkelse på 2–5 år.
              </li>
              <li>
                <strong>Under langvarig NAO−:</strong> Svakere vinder gir mindre avkjøling og
                redusert dypvannsdannelse i Labradorsjøen, noe som kan bidra til å bremse
                veltestrømmen.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Arktisk forsterkning og debatten om en «mer bølgete» jetstrøm
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Arktis varmes nå opp tre til fire ganger raskere enn det globale gjennomsnittet — et
              fenomen kjent som <strong>arktisk forsterkning</strong> (<em>Arctic Amplification</em>),
              drevet av smelting av havis og snø (is-albedo-tilbakekobling).
            </p>
            <p className="mt-2 text-sm sm:text-base">
              Dette har utløst en stor vitenskapelig debatt innen klimaforskningen:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>Francis & Vavrus-hypotesen:</strong> Når Arktis blir varmere, reduseres
                temperaturforskjellen mellom polen og ekvator. I henhold til termalvindligningen må
                da den overordnede vestavinden svekkes. En svakere jetstrøm meandrerer lettere i dype
                Rossby-bølger, noe som teoretisk kan gi flere langvarige blokkeringer (NAO−-lignende
                situasjoner med ekstremkulde om vinteren eller hetebølger om sommeren).
              </li>
              <li>
                <strong>Modellusikkerhet:</strong> Samtidig viser mange avanserte klimamodeller at
                oppvarming i den øvre troposfæren over subtropene kan motvirke denne effekten. Det er
                derfor fortsatt et åpent og aktivt forskningsspørsmål om fremtidens vintre vil bli
                dominert av sonale stormer (NAO+) eller fastlåste blokkeringer (NAO−).
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Paleoklima: NAO gjennom tusener av år
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Akkurat som koraller brukes for ENSO, bruker geoforskere <strong>dryppsteiner (speleothemer)</strong>{" "}
              i huler i Skottland og Spania, samt sedimentkjerner og grønlandske iskjerner, til å
              rekonstruere NAO tusenvis av år tilbake i tid. Analyser av vekstringer og oksygenisotoper
              viser at den nordatlantiske vippen har svingt naturlig i tusener av år, men at 1900-tallets
              vedvarende positive fase var blant de sterkeste i løpet av det siste årtusenet.
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
