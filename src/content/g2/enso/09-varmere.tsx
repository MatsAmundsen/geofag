import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";

export function Varmere() {
  return (
    <>
      <CollapsibleSection
        title="7. ENSO i en varmere verden & Paleoklima"
        subtitle="Korallkjerner som klimatermometre og framtidige super-El Niño-episoder"
        badge="Klimaendringer"
        badgeVariant="teal"
      >
        <p>
          ENSO er ikke forårsaket av menneskeskapt global oppvarming. Geologiske arkiv — koraller, iskjerner og sedimenter — viser at El Niño har eksistert i tusenvis av år (Cobb et al., 2003). Det er et naturlig trekk ved Jordens klimasystem.
        </p>

        <PhotoFigure
          src="/images/fig-enso-korall-paleo.jpg"
          alt="Korallkjerne og kjemiske proksydata for historiske ENSO-episoder"
          heading="Figur 8. Paleoklima — Korallkjerner som klimatermometer for ENSO"
          caption="Massive koraller (Porites) bygger kalkskjelett med årlige vekstbånd. δ18O og Sr/Ca i kalken avhenger av havtemperaturen. Slike kjerner rekonstruerer ENSO flere hundre år tilbake."
          fit="contain"
          points={[
            { n: "1", label: "Røntgenbilde av korallkjerne viser årlige vekstbånd." },
            { n: "2", label: "δ18O og Sr/Ca avslører historiske El Niño-topper (1877/78, 1982/83)." },
            { n: "3", label: "Dokumenterer at ENSO er en naturlig klimamodus med tusenårige røtter." },
          ]}
        />

        <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
          <h4 className="font-display text-base font-semibold tracking-tight text-primary">Hva betyr global oppvarming for ENSO?</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li><strong>Bakgrunnstemperaturen stiger:</strong> Moderate El Niño-episoder kan slå globale temperaturrekorder oppå en varmere grunnlinje.</li>
            <li><strong>Ekstremnedbør intensiveres:</strong> Clausius-Clapeyron: ~7 % mer fukt per grad oppvarming.</li>
            <li><strong>Mulig økning i «super» El Niño-er:</strong> Noen studier antyder at de kraftigste episodene kan bli hyppigere (Cai et al., 2014).</li>
          </ul>
        </div>
      </CollapsibleSection>
    </>
  );
}
