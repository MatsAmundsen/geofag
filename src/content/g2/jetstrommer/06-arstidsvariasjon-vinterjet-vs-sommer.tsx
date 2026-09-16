import { JetSeasonDiagram } from "@/components/diagrams";

export function ArstidsvariasjonVinterjetVsSommer() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Årstidsvariasjon: Vinterjet vs. Sommerjet
      </h2>
      <p>
        Bruk regelen om termisk vind: Jetstrømmens styrke er direkte proporsjonal med
        temperaturkontrasten mellom ekvator og pol. Fordi solinnstrålingen forskyver seg med
        årstidene, gjennomgår jetstrømmen en dramatisk årlig syklus:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-300">
            ❄️ Vinter: Maksimal temperaturkontrast
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I vinterhalvåret er Arktis svøpt i mørke under polarnatten, og isen stråler ut varme til
            temperaturen faller under -40 °C. Samtidig mottar tropene rikelig med solvarme (+30 °C).
            Temperaturforskjellen er kolossal: <strong>ΔT ≈ 70 °C!</strong>
            <br />
            Polarfrontjeten blir sylskarp, akselererer til over <strong>350–400 km/t</strong>, og
            trekker sørover til ca. <strong>45°–55°N</strong>. Stormbanen peker rett mot Norskehavet,
            og Norge bombarderes av voldsomme vinterorkaner.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-300">
            ☀️ Sommer: Minimal temperaturkontrast
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om sommeren skinner midnattssolen døgnet rundt i Arktis. Snø og sjøis smelter, og
            landmassene varmes opp til plussgrader (+5 til +15 °C). Temperaturforskjellen mot
            tropene krymper til under <strong>ΔT ≈ 30 °C</strong>.
            <br />
            Jetstrømmen svekkes drastisk til <strong>100–160 km/t</strong> og forskyver seg nordover
            til <strong>65°–70°N</strong>. Lavtrykkene blir vesentlig svakere, stormbanene passerer
            nord for fastlandet mot Barentshavet, og Norge opplever roligere sommervær.
          </p>
        </div>
      </div>

      <JetSeasonDiagram />
    </>
  );
}
