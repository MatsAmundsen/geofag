import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <>
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Corioliseffekten" def="Fiktiv treghetskraft fra roterende jord. Avbøyer mot høyre på NH, venstre på SH, null ved ekvator." />
        <Term name="Coriolisparameteren (f)" def="f = 2Ω sin φ. 0 ved ekvator og ca. 1,26 × 10⁻⁴ s⁻¹ i Norge." />
        <Term name="Geostrofisk vind" def="Trykkgradient og Coriolis i balanse. Vinden parallelt med isobarene." />
        <Term name="Buys Ballots lov" def="Rygg mot vinden på NH: lavtrykk til venstre." />
        <Term name="Rossby-tallet (Ro)" def="Ro = U / (f·L). Ro ≪ 1: Coriolis styrer. Ro ≫ 1: treghet styrer." />
        <Term name="Ekman-spiral" def="Havstrøm dreier med dypet på grunn av vindstress og Coriolis." />
        <Term name="Ekman-transport" def="Netto vanntransport 90° til høyre for vinden på NH." />
        <Term name="Kystoppvelling" def="Kaldt næringsrikt dypvann stiger når overflatevann føres vekk fra land." />
      </TermGrid>
    </>
  );
}
