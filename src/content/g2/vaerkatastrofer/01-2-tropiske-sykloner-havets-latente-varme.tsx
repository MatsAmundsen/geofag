import { OrdBoks } from "@/components/term";
import {
  HurricaneCrossSectionDiagram,
} from "@/components/diagrams";

export function TropiskeSyklonerHavetsLatenteVarme() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        2. Tropiske sykloner: Havets latente varmemaskin
      </h2>
      <p>
        En <strong>tropisk syklon</strong> er et intensivt varmkjerne-lavtrykk over tropisk eller subtropisk hav, med organisert dyp konveksjon og lukket syklonisk sirkulasjon (NHC). Samme fysikk, ulike navn:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li><strong>Orkan:</strong> Nord-Atlanteren, Karibia, Mexicogolfen, østlige Stillehav.</li>
        <li><strong>Tyfon:</strong> Nordvestlige Stillehav (Japan, Kina, Filippinene).</li>
        <li><strong>Syklon:</strong> Det indiske hav og sørlige Stillehav.</li>
      </ul>
      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">Grays seks dannelseskriterier</h3>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li><strong>SST ≥ 26,5 °C ned til minst 50 m:</strong> Varmt vann er brensel. Tynt varmt lag kveles av oppvelling når vinden rører opp havet.</li>
        <li><strong>Coriolis (minst ~5° / 500 km fra ekvator):</strong> Uten f = 2Ω sin φ strømmer luft rett inn og fyller lavtrykket. Ingen orkaner mellom 0° og 5°.</li>
        <li><strong>Høy fuktighet i midtre troposfære (700–500 hPa):</strong> Tørr luft gir kalde fallvinder som dreper oppdrift.</li>
        <li><strong>Betinget instabilitet og høy CAPE:</strong> Konveksjon må nå tropopausen.</li>
        <li><strong>Svak vertikal vindskjær (&lt; 10 m/s til 200 hPa):</strong> Sterk skjær river varmekjernen i stykker.</li>
        <li><strong>Forutgående forstyrrelse:</strong> Ofte en afrikansk østlig bølge fra Sahel.</li>
      </ol>
      <OrdBoks
        ord="Tropisk syklon"
        barn="Varmkjerne-lavtrykk over tropisk hav (SST over 26,5 °C). Drevet av latent varme og satt i rotasjon av Coriolis."
      />
      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">Carnot-maskinen og latent varme</h3>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li><strong>Varmereservoar (~300 K):</strong> Isoterm innstrømning langs havflaten med vanndamp og varme.</li>
        <li><strong>Adiabatisk løft i øyeveggen:</strong> Kondensasjon frigjør 2,5 MJ/kg. Oppdrift over 30 m/s.</li>
        <li><strong>Kuldreservoar ved tropopausen (~200 K):</strong> Antisyklonsk cirrusskjold stråler varme til verdensrommet.</li>
      </ul>
      <p>
        Temperaturforskjellen hav–tropopause setter Maximum Potential Intensity (MPI).
      </p>
      <HurricaneCrossSectionDiagram />
    </>
  );
}
