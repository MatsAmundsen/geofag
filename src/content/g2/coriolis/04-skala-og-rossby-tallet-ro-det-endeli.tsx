import { RossbyScaleDiagram } from "@/components/diagrams";

export function SkalaOgRossbyTalletRoDetEndeli() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Skala og Rossby-tallet (Ro)
      </h2>
      <p>
        Ro = U / (f · L). Ro ≫ 1: Coriolis er neglisjerbar (vasken, Ro ≈ 13 000). Ro ≪ 1: Coriolis
        styrer (atlanterhavsstorm, Ro ≈ 0,10).
      </p>
      <div className="my-4 rounded-xl border border-border bg-card p-4 text-center">
        <p className="font-mono text-xl font-bold text-primary">Ro = U / (f · L)</p>
      </div>
      <RossbyScaleDiagram />
    </>
  );
}
