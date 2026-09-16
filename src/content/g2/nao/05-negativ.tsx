import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoNegativePhaseDiagram,
  NaoBlockeringDiagram,
  NaoRossbyDiagram,
} from "@/components/diagrams";

export function Negativ() {
  return (
    <>
      <CollapsibleSection
        title="3. Negativ NAO (NAO− — Den meandrerende blokkeringen)"
        subtitle="Svekket trykkgradient · Bølgete jetstrøm og atmosfærisk blokkering · Arktisk kulde i Norge, regn i Sør-Europa"
        badge="Negativ fase"
        badgeVariant="sky"
      >
        <p>
          I NAO− kollapser den nordatlantiske motoren: Islandslavtrykket og Azorhøytrykket svekkes. Differansen kan falle mot null, og trykket over Island kan bli høyere enn over Azorene.
        </p>

        <NaoNegativePhaseDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Hvorfor meandrerer jetstrømmen under NAO−?</h4>
            <p className="mt-1 text-sm sm:text-base">
              Når trykkgradienten svekkes, mister den sonale vestavinden fart. Strømmen blir ustabil og svinger i store <strong>Rossby-bølger</strong>.
            </p>
          </div>
          <NaoRossbyDiagram />
          <p className="text-sm sm:text-base">
            En forsterket rygg over Skandinavia kan avsnøres og danne et kvasistasjonært høytrykk i uke- eller månedsvis — <strong>atmosfærisk blokkering</strong>.
          </p>
          <NaoBlockeringDiagram />

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Konsekvenser for Norge under NAO−</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li><strong>Sprengkulde:</strong> Høytrykket roterer med klokken og trekker kontinentalluft fra Sibir og Nordishavet inn over Norge.</li>
              <li><strong>Tørt:</strong> Nedsynking gir klarvær. Vestlandet får bratt nedgang i vannføring.</li>
              <li><strong>Bakkeinversjon:</strong> Bakken avkjøles mer enn luften over. Forurensning fanges i bygryter (Bergen, Oslo, Trondheim).</li>
              <li><strong>Strømkrise:</strong> Høyt oppvarmingsbehov og lite tilsig i magasinene — prissjokk og frosne rør.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Atlantisk vippe: Grønland varm når Norge fryser</h4>
            <p className="mt-1 text-sm sm:text-base">
              Under NAO− pumper vestsiden av blokkeringen varm atlantisk luft nordover langs Vest-Grønland, mens østsiden trekker kulde over Norge. Vinteren 2009/2010: Vest-Grønland opptil 10 °C over normalen; Norge kaldeste vinter på over 30 år.
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
