import { JetSeasonDiagram } from "@/components/diagrams";

export function ArstidsvariasjonVinterjetVsSommer() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Årstidsvariasjon: Vinterjet vs. Sommerjet
      </h2>
      <p>
        Jetstrømmens styrke følger temperaturkontrasten mellom ekvator og pol.
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="font-display text-base font-semibold text-sky-300">Vinter</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            ΔT ≈ 70 °C. Polarfrontjeten 350–400 km/t ved 45°–55°N. Stormbanen peker mot Norskehavet.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="font-display text-base font-semibold text-amber-300">Sommer</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            ΔT ≈ 30 °C. Jeten 100–160 km/t ved 65°–70°N. Roligere sommervær i Norge.
          </p>
        </div>
      </div>
      <JetSeasonDiagram />
    </>
  );
}
