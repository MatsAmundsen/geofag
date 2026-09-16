import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";

export function Varmere() {
  return (
    <CollapsibleSection
      title="7. ENSO i en varmere verden & Paleoklima"
      subtitle="Korallkjerner som klimatermometre og framtidige super-El Niño-episoder"
      badge="Klimaendringer"
      badgeVariant="teal"
    >
      <p>
        ENSO er ikke comprsåket av menneskeskapt oppvarming. Koraller og iskjerner viser at El Niño
        har eksistert i tusenvis av år (Cobb et al., 2003).
      </p>
      <PhotoFigure
        src="/images/fig-enso-korall-paleo.jpg"
        alt="Korallkjerne og kjemiske proksydata for historiske El Niño og La Niña"
        heading="Figur 8. Paleoklima — Korallkjerner som klimatermometer for ENSO"
        caption="δ18O og Sr/Ca i korallkalk rekonstruerer ENSO lenge før termometre."
        fit="contain"
      />
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
        <li>Bakgrunnstemperaturen stiger, så moderate El Niño-er kan slå rekorder.</li>
        <li>Ekstremnedbør intensiveres (Clausius–Clapeyron, ~7 % mer fukt per grad).</li>
        <li>Noen studier antyder flere «super» El Niño-er (Cai et al., 2014).</li>
      </ul>
    </CollapsibleSection>
  );
}
