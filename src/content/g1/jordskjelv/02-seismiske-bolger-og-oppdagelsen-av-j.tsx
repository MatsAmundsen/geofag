import { PhotoFigure } from "@/components/photo-figure";
import {
  EarthquakeWavePhysicsDiagram,
} from "@/components/diagrams";

export function SeismiskeBolgerOgOppdagelsenAvJ() {
  return (
    <>
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Seismiske bølger og oppdagelsen av jordens flytende kjerne
        </h2>
        <p>
          Når en forkastning brister, forplanter energien seg gjennom jorden i form av elastiske deformasjonsbølger.
          Vi deler dem inn i to hovedgrupper: <strong>romlige bølger (body waves)</strong>, som reiser gjennom jordens indre,
          og <strong>overflatebølger (surface waves)</strong>, som er bundet til jordens overflate.
        </p>

        <EarthquakeWavePhysicsDiagram />

        <PhotoFigure
          src="/images/geo-jordskjelv-bolger-3d.jpg"
          alt="3D-snitt av forkastningsbrudd, hyposenter, episenter og utbredelse av P-, S-, Rayleigh- og Love-bølger"
          heading="3D-seismologi: Fra forkastningsbrudd til overflatebølger"
          caption="Når en forkastning brister, frigjøres elastisk spenningsenergi fra hyposenteret. Energien forplanter seg som romlige bølger (P og S). Når bølgene treffer overflaten ved episenteret, omdannes de til Love- og Rayleigh-bølger. Det er overflatebølgenes store amplitude som forårsaker de største strukturelle skadene."
          marks={[
            { x: 38, y: 75, n: "1", text: "Hyposenter (fokus)", tone: "warm" },
            { x: 55, y: 62, n: "2", text: "P-bølge (kompresjon)", tone: "cold" },
            { x: 25, y: 55, n: "3", text: "S-bølge (skjær)", tone: "warm" },
            { x: 42, y: 22, n: "4", text: "Episenter & overflatebølger", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Hyposenter (fokus): Det eksakte bruddpunktet på den låste forkastningsflaten." },
            { n: "2", label: "P-bølger (primære): Longitudinelle bølger; raskest (~6–8 km/s) og kan gå gjennom både fast stoff og væske." },
            { n: "3", label: "S-bølger (sekundære): Transversale skjærbølger (~3,5–4,5 km/s); kan KUN forplante seg i fast stoff." },
            { n: "4", label: "Overflatebølger (Rayleigh & Love): Størst amplitude og lavest frekvens; raserer bygninger og broer." },
          ]}
        />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Bølgefysikk og elastisitetsmoduler
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">P-bølger (primære kompresjonsbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              P-bølger er <em>longitudinelle bølger</em>: Partiklene svinger frem og tilbake parallelt med bølgens utbredelsesretning.
            </p>
            <p className="mt-1 font-mono text-xs text-teal">
              v_p = √((K + 4/3 μ) / ρ) ≈ 6,0–8,0 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Fordi kompresjonsmodulen K aldri er null, kan P-bølger forplante seg gjennom <strong>både faste bergarter, væsker og gasser</strong>. De ankommer alltid først.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-warm text-sm">S-bølger (sekundære skjærbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              S-bølger er <em>transversale bølger</em>: Partiklene svinger vinkelrett på bølgens forplantningsretning.
            </p>
            <p className="mt-1 font-mono text-xs text-warm">
              v_s = √(μ / ρ) ≈ 3,5–4,5 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Væsker og gasser har ingen skjærstivhet (μ = 0). Derfor er <strong>v_s = 0 i væsker</strong>.
            </p>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Overflatebølger: Rayleigh og Love
        </h3>
        <p>
          Når P- og S-bølgene treffer jordoverflaten, genereres to typer <strong>overflatebølger</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Rayleigh-bølger:</strong> Rullende bølgebevegelse i vertikalplanet (retrograd elliptisk).
          </li>
          <li>
            <strong className="text-foreground">Love-bølger:</strong> Rent horisontal skjærbevegelse. Disse forårsaker de største ødeleggelsene.
          </li>
        </ul>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Oldhams oppdagelse (1906): S-bølgenes skyggesone
        </h3>
        <p>
          I 1906 publiserte Richard Dixon Oldham at seismografer mellom <strong>103° og 180°</strong> fra episenteret aldri registrerte direkte S-bølger (Oldham, 1906).
        </p>
        <p>
          Fordi S-bølger ikke kan gå gjennom væske, innså Oldham at jordens sentrum måtte ha en flytende kjerne. P-bølgene ble avbøyd og skapte en P-skyggesone mellom 103° og 142°. I 1936 viste Inge Lehmann at svake P-bølger likevel dukket opp i skyggesonen — bevis for en fast, indre kjerne.
        </p>
      </section>
    </>
  );
}
