import { OrdBoks } from "@/components/term";
import { BoundaryQuakesDiagram } from "@/components/diagrams";

export function PlategrenserOgDypeSkjelvWadatiB() {
  return (
    <section className="pt-6 space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Plategrenser og dype skjelv: Wadati-Benioff-sonen
      </h2>
      <p>
        Jordskjelv tegner opp de globale plategrensene. Fokaldybden varierer dramatisk med tektonisk regime.
      </p>
      <BoundaryQuakesDiagram />
      <div className="grid gap-4 sm:grid-cols-2 pt-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-teal text-sm">Spredningsrygger og transformforkastninger</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Tynn litosfære og varm astenosfære. Jordskjelv er utelukkende grunne (&lt; 20–25 km).
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-rose-400 text-sm">Subduksjonssoner (Wadati-Benioff-sonen)</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Kald oseanisk plate forblir sprø ned til 670–700 km. Under 700 km opphører skjelvene.
          </p>
        </div>
      </div>
      <OrdBoks
        ord="Wadati-Benioff-sone"
        barn="Skrå sone av dype jordskjelv (ned til 700 km) inne i en kald havbunnsplate som subdueres."
      />
    </section>
  );
}
