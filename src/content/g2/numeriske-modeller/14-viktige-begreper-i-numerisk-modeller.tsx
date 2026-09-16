import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreperINumeriskModeller() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Viktige begreper i numerisk modellering
      </h2>
      <TermGrid>
        <Term
          name="Numerisk modell"
          def="Dataprogram som simulerer naturprosesser ved å løse matematiske bevaringsligninger trinnvis over et 3D-rutenett."
        />
        <Term
          name="Rutenett (Grid)"
          def="Det tredimensjonale nettverket av beregningspunkter som deler inn atmosfæren og havet horisontalt (Δx) og vertikalt (Δz)."
        />
        <Term
          name="Primitivligninger"
          def="Settet av fysiske bevaringslover (Navier-Stokes, kontinuitet, termodynamikk, tilstandsligning og fuktighet) som styrer modellene."
        />
        <Term
          name="Parametrisering"
          def="Forenklet matematisk representasjon av sub-grid prosesser som er for små til å løses direkte (f.eks. skyer og turbulens)."
        />
        <Term
          name="CFL-kriteriet"
          def="Krav til numerisk stabilitet (u·Δt/Δx ≤ 1) som bestemmer hvor kort tidssteget må være i forhold til rutenettets oppløsning."
        />
        <Term
          name="Dataassimilering"
          def="Matematisk metode (f.eks. 4D-Var) som kontinuerlig kombinerer ferske observasjoner med modellens prognose til en optimal starttilstand."
        />
        <Term
          name="Deterministisk kaos"
          def="Egenskap ved ikke-lineære systemer der ørsmå avvik i starttilstanden vokser eksponensielt og setter en grense for langtidsvarsling."
        />
        <Term
          name="Ensemble (EPS)"
          def="Sverm av 30–50 parallelle modellkjøringer med mikroskopisk ulike startbetingelser for å tallfeste usikkerhet og sannsynligheter."
        />
        <Term
          name="Startverdiproblem"
          def="Matematisk formulering der fremtiden primært styres av den nøyaktige starttilstanden, typisk for værvarsling (dager til to uker)."
        />
        <Term
          name="Randverdiproblem"
          def="Matematisk formulering der den langsiktige statistikken styres av ytre pådriv og grensebetingelser, typisk for klimaforskning."
        />
        <Term
          name="Nesting"
          def="Teknikk der en høyoppløst regional modell (som MEPS) legges inni en grovere global modell (som ECMWF) og mates langs grensene."
        />
        <Term
          name="Jordsystemmodell (ESM)"
          def="Avansert klimamodell som kobler sammen atmosfære, verdenshav, kryosfære, biosfære og det globale karbonkretsløpet."
        />
      </TermGrid>
    </>
  );
}
