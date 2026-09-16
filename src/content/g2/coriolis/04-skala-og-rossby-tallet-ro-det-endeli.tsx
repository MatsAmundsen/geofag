import { RossbyScaleDiagram } from "@/components/diagrams";

export function SkalaOgRossbyTalletRoDetEndeli() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Skala og Rossby-tallet (Ro): Det endelige oppgjøret med vaskemyten
      </h2>
      <p>
        Du har garantert hørt myten: <em>«Vannet i toalettet eller badekaret renner ut mot klokken i
        Norge og med klokken i Australia på grunn av Corioliseffekten.»</em> Turister i Kenya og Ecuador
        blir til og med lurt av gateselgere som flytter en bøtte over en malt ekvatorlinje for å vise
        at vannet snur retning.
      </p>
      <p>
        <strong>Dette er 100 % fysisk umulig og en ren myte!</strong>
      </p>
      <p>
        Hvordan kan vi som geofag-elever bevise dette vitenskapelig? Meteorologer og oseanografer
        bruker et berømt dimensjonsløst tall oppkalt etter Carl-Gustaf Rossby:{" "}
        <strong>Rossby-tallet (Ro)</strong>:
      </p>
      <div className="my-4 rounded-xl border border-border bg-card p-4 text-center">
        <p className="font-mono text-xl font-bold text-primary">
          Ro = U / (f · L)
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          der <strong>U</strong> er hastigheten, <strong>f</strong> er Coriolisparameteren (~1,26 × 10⁻⁴ s⁻¹ i Norge),
          og <strong>L</strong> er fenomenets karakteristiske lengdeskala (størrelse).
        </p>
      </div>

      <p>
        Rossby-tallet sammenligner treghetskreftene (akselerasjon og sentrifugalkraft, U/L) med
        Corioliskraften (f):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Når Ro &gt;&gt; 1 (mye større enn 1):</strong> Corioliseffekten er forsvinnende liten
          og fullstendig neglisjerbar sammenlignet med andre krefter.
        </li>
        <li>
          <strong>Når Ro &lt;&lt; 1 (mye mindre enn 1):</strong> Corioliseffekten er kolossalt dominerende
          og tvinger væsken eller luften inn i geostrofisk balanse.
        </li>
      </ul>

      <RossbyScaleDiagram />

      <p>
        La oss sette inn tallene for en typisk baderomsvask:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>Vaskens diameter: <strong>L ≈ 0,3 meter</strong>.</li>
        <li>Vannets tappehastighet: <strong>U ≈ 0,5 m/s</strong>.</li>
        <li>Coriolisparameter i Norge: <strong>f ≈ 1,26 × 10⁻⁴ s⁻¹</strong>.</li>
      </ul>
      <div className="my-3 rounded-lg bg-slate-900/80 p-3 text-center font-mono text-sm text-red-400">
        Ro = 0,5 / (1,26 × 10⁻⁴ · 0,3) ≈ 13 200
      </div>
      <p>
        Rossby-tallet i vasken er over <strong>13 000</strong>! Det betyr at treghetskreftene, kummens
        form, asymmetri i sluket, kranens vinkel og restvirvler fra da du vasket hendene er over{" "}
        <strong>ti tusen ganger sterkere enn Corioliskraften</strong>. Hvilken vei vannet roterer i en
        vanlig vask, er fullstendig tilfeldig og har ingenting med jordrotasjonen å gjøre.
      </p>
      <p>
        I en atlantisk storm er derimot <strong>L ≈ 1 500 000 meter (1500 km)</strong> og farten 20 m/s:
      </p>
      <div className="my-3 rounded-lg bg-slate-900/80 p-3 text-center font-mono text-sm text-emerald-400">
        Ro = 20 / (1,26 × 10⁻⁴ · 1 500 000) ≈ 0,10
      </div>
      <p>
        Her er Rossby-tallet bare 0,10! Nå er Corioliskraften ti ganger sterkere enn akselerasjonen, og
        systemet <em>må</em> rotere mot klokken. Corioliseffekten krever store avstander og lang tid for å
        virke.
      </p>
    </>
  );
}
