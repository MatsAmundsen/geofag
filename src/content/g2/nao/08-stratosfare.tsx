import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoSswBreakdownDiagram,
  NaoEnsoTeleconnectionDiagram,
} from "@/components/diagrams";

export function Stratosfare() {
  return (
    <>
      <CollapsibleSection
        title="6. Stratosfæren, polarvirvelen og telekoblinger"
        subtitle="Sudden Stratospheric Warming (SSW), Rossby-bølgetog og samspill med ENSO"
        badge="Atmosfærisk dynamikk"
        badgeVariant="primary"
      >
        <p>
          To overordnede mekanismer styrer NAO-fasen: <strong>polarvirvelen i stratosfæren</strong> og <strong>telekoblinger fra ENSO</strong>. Resten er ofte kaotisk intern troposfæredynamikk.
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Polarvirvelen og SSW</h4>
            <p className="mt-1 text-sm sm:text-base">
              Hver høst dannes et iskaldt lavtrykk i stratosfæren (10–50 km) over Arktis — <strong>den stratosfæriske polarvirvelen</strong>, omkranset av polar night jet.
            </p>
            <p className="mt-2 text-sm sm:text-base">
              Planetære Rossby-bølger fra fjell og hav–land-kontraster kan utløse <strong>Sudden Stratospheric Warming</strong> (Baldwin &amp; Dunkerton, 2001). Temperaturen over Nordpolen kan stige <strong>30–50 °C</strong> på få dager.
            </p>
          </div>
          <NaoSswBreakdownDiagram />
          <p className="text-sm sm:text-base">
            Virvelen forskyves eller splittes. Vestavindene reverseres til østavinder. Signalet synker på <strong>2–4 uker</strong>, Islandslavtrykket kollapser, og NAO går inn i langvarig negativ fase — derfor kan streng kulde varsles uker i forveien.
          </p>
          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Telekoblinger: ENSO og NAO</h4>
            <p className="mt-1 text-sm sm:text-base">
              Konveksjon under{" "}
              <Link to="/tema/klima/enso" className="text-primary underline-offset-2 hover:underline">ENSO</Link>{" "}
              forplanter seg som Rossby-bølgetog:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li><strong>El Niño:</strong> PNA-mønsteret forstyrrer polarvirvelen og øker sannsynligheten for NAO− og kaldere vintre i Nord-Europa (Cassou, 2008).</li>
              <li><strong>La Niña:</strong> Færre oppadgående forstyrrelser. Sterk virvel favoriserer NAO+ over Norge.</li>
            </ul>
          </div>
          <NaoEnsoTeleconnectionDiagram />
        </div>
      </CollapsibleSection>
    </>
  );
}
