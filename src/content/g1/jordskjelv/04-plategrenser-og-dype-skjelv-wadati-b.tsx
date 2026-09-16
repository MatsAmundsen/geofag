import { BoundaryQuakesDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function PlategrenserOgDypeSkjelvWadatiB() {
  return (
    <>
      {/* SEKSJON 4: PLATEGRENSER OG DYPE SKJELV */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Plategrenser og dype skjelv: Wadati-Benioff-sonen
        </h2>
        <p>
          Jordskjelv forekommer ikke tilfeldig fordelt utover kloden. De tegner opp de globale plategrensene med
          forbløffende presisjon. Men fokaldybden (hvor dypt hyposenteret befinner seg) varierer dramatisk med tektonisk regime.
        </p>

        <BoundaryQuakesDiagram />

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">Spredningsrygger og transformforkastninger</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Her er litosfæren tynn og astenosfæren varm. Bergarter deformeres plastisk uten sprøe brudd.
              Jordskjelv er utelukkende grunne <strong>(&lt; 20–25 km dype)</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">Subduksjonssoner (Wadati-Benioff-sonen)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Her tvinges en kald, stiv oseanisk litosfæreplate dypt ned. Fordi platen er så kald,
              forblir kjernen sprø helt ned til <strong>670–700 kilometers dyp</strong>! Under 700 km opphører skjelvene
              fordi mineralene rekrystalliserer til tette faser som deformeres plastisk.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Wadati-Benioff-sone"
          barn="En skrå sone av dype jordskjelv (helt ned til 700 km) som oppstår inne i en kald havbunnsplate idet den subdueres ned i mantelen under en annen plate."
        />
      </section>

    </>
  );
}
