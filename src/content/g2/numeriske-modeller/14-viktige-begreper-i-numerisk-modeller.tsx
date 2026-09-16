import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreperINumeriskModeller() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Viktige begreper i numerisk modellering
      </h2>
      <TermGrid>
        <Term name="Numerisk modell" def="Simulerer naturen ved å løse bevaringsligninger på et 3D-rutenett." />
        <Term name="Rutenett (Grid)" def="Beregningspunkter med avstand Δx og Δz." />
        <Term name="Primitivligninger" def="Navier-Stokes, kontinuitet, termodynamikk, tilstandsligning og fuktighet." />
        <Term name="Parametrisering" def="Forenklet representasjon av sub-grid-prosesser som skyer og turbulens." />
        <Term name="CFL-kriteriet" def="u·Δt/Δx ≤ 1. Tidssteget må være kort nok for stabilitet." />
        <Term name="Dataassimilering" def="Kombinerer observasjoner og modell til optimal starttilstand (f.eks. 4D-Var)." />
        <Term name="Ensemble (EPS)" def="Mange parallelle kjøringer med litt ulike startbetingelser." />
        <Term name="Startverdiproblem" def="Fremtiden styres av starttilstanden — værvarsling." />
        <Term name="Randverdiproblem" def="Statistikken styres av ytre pådriv — klimaforskning." />
      </TermGrid>
    </>
  );
}
