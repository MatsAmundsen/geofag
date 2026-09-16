import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";

export function Varmere() {
  return (
    <CollapsibleSection
      title="7. ENSO i en varmere verden og paleoklima"
      subtitle="Korallkjerner som klimatermometre"
      badge="Klimaendringer"
      badgeVariant="teal"
    >
      <p>
        ENSO skyldes ikke menneskeskapt oppvarming. Koraller og iskjerner viser at El Nino
        har eksistert i tusenvis av år (Cobb et al., 2003).
      </p>
      <PhotoFigure
        src="/images/fig-enso-korall-paleo.jpg"
        alt="Korallkjerne og kjemiske proksydata"
        heading="Figur 8. Paleoklima. Korallkjerner som klimatermometer for ENSO"
        caption="Oksygenisotoper og Sr/Ca i korallkalk rekonstruerer ENSO."
        fit="contain"
      />
    </CollapsibleSection>
  );
}
