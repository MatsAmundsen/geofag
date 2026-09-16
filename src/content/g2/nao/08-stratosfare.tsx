import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoEnsoTeleconnectionDiagram,
  NaoSswBreakdownDiagram,
} from "@/components/diagrams";

export function Stratosfare() {
  return (
    <>
      <CollapsibleSection
        title="6. Stratosfæren, polarvirvelen og telekoblinger"
        subtitle="Sudden Stratospheric Warming (SSW), Rossby-bølgetog og samspill med ENSO i Stillehavet"
        badge="Atmosfærisk dynamikk"
        badgeVariant="primary"
      >
        <p>
          Hva er det egentlig som vipper NAO mellom positiv og negativ fase? Selv om mye av variasjonen
          skyldes kaotisk intern dynamikk i troposfæren, er det to overordnede mekanismer som utøver
          en mektig kontroll: <strong>polarvirvelen i stratosfæren</strong> og{" "}
          <strong>telekoblinger fra det tropiske Stillehavet (ENSO)</strong>.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Polarvirvelen og Plutselig stratosfærisk oppvarming (SSW)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Høyt oppe i stratosfæren (10–50 km over bakken) dannes det hver høst et gigantisk,
              iskaldt lavtrykk over Arktis — <strong>den stratosfæriske polarvirvelen</strong>.
              Virvelen omkranses av lynraske sirkumpolare vestavinder (<em>polar night jet</em>).
            </p>
            <p className="mt-2 text-sm sm:text-base">
              Når sterke planetære bølger (Rossby-bølger) forplanter seg oppover fra fjellkjeder og
              hav–land-kontraster, kan de bryte inn i stratosfæren som bølger mot en strand. Dette
              kan utløse en <strong>Plutselig stratosfærisk oppvarming</strong> (<em>Sudden
              Stratospheric Warming — SSW</em>) (Baldwin & Dunkerton, 2001). I løpet av få dager kan
              temperaturen i stratosfæren over Nordpolen stige med <strong>30–50 °C</strong>!
            </p>
          </div>

          <NaoSswBreakdownDiagram />

          <p className="text-sm sm:text-base">
            Under en SSW kollapser virvelen: den enten forskyves bort fra polen (<em>displacement</em>)
            eller splittes i to dattersentre (<em>vortex split</em>). De sirkumpolare vestavindene
            bremses opp og reverseres til østavinder. Dette signalet forplanter seg gradvis nedover
            gjennom atmosfæren i løpet av <strong>2–4 uker</strong>. Når signalet når overflaten,
            kollapser Islandslavtrykket, og NAO presses inn i en dyp, langvarig negativ fase.
            Dette er årsaken til at meteorologer ofte kan varsle streng kulde i Norge uker i forveien!
          </p>

          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Telekoblinger: Hvordan ENSO snakker med NAO
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Selv om Stillehavet ligger på den andre siden av kloden, er atmosfæren et sammenhengende
              fluid. Ekstreme omveltninger i tropisk konveksjon under{" "}
              <Link to="/tema/klima/enso" className="text-primary underline-offset-2 hover:underline">
                ENSO (El Niño og La Niña)
              </Link>{" "}
              forplanter seg via atmosfæriske Rossby-bølgetog:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>El Niño:</strong> Den voldsomme konveksjonen i det sentrale og østlige
                Stillehavet sender kraftige Rossby-bølger nordøstover over Nord-Amerika
                (PNA-mønsteret). Disse bølgene forstyrrer ofte polarvirvelen i stratosfæren og øker
                sannsynligheten for en <strong>negativ NAO (NAO−)</strong> og kaldere vintre i
                Nord-Europa (Cassou, 2008).
              </li>
              <li>
                <strong>La Niña:</strong> Kjølig hav i øst gir færre oppadgående forstyrrelser.
                Polarvirvelen forblir oftere sterk og uforstyrret, noe som statistisk favoriserer en
                stabil, rett polarjet og <strong>positiv NAO (NAO+)</strong> over Norge.
              </li>
            </ul>
          </div>

          <NaoEnsoTeleconnectionDiagram />
        </div>
      </CollapsibleSection>
    </>
  );
}
