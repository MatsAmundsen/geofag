import { CollapsibleSection } from "@/components/collapsible-section";
import { EnsoComparisonDiagram } from "@/components/diagrams";

export function EnsoModell() {
  return (
    <CollapsibleSection
      title="4. Sammenlign fasene (Interaktiv modell)"
      subtitle="Bytt direkte mellom Nøytral, El Niño og La Niña i det interaktive diagrammet"
      badge="Interaktiv modell"
      badgeVariant="primary"
    >
      <p className="text-sm sm:text-base text-foreground/90">
        Bruk knappene inne i diagrammet for å sammenligne hvordan
        passatvindene, det vestlige bassenget og termoklinen endrer seg
        mellom de tre tilstandene.
      </p>
      <EnsoComparisonDiagram />
    </CollapsibleSection>
  );
}
