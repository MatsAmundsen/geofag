import { EarthquakeWavePhysicsDiagram } from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";

export function SeismiskeBolgerOgOppdagelsenAvJ() {
  return (
    <>
      {/* SEKSJON 2: SEISMISKE BØLGER OG JORDENS INDRE */}
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
          caption="Når en forkastning brister, frigjøres elastisk spenningsenergi fra hyposenteret (fokus). Energien forplanter seg innover i jorden som romlige bølger (raske P-kompresjonsbølger og langsommere S-skjærbølger). Når bølgene treffer jordoverflaten ved episenteret, omdannes de til overflatebølger: Love-bølger (horisontal sideveis skjærbevegelse) og Rayleigh-bølger (rullende elliptisk bevegelse). Det er overflatebølgenes store amplitude som forårsaker de største strukturelle skadene på bygninger."
          marks={[
            { x: 38, y: 75, n: "1", text: "Hyposenter (fokus)", tone: "warm" },
            { x: 55, y: 62, n: "2", text: "P-bølge (kompresjon)", tone: "cold" },
            { x: 25, y: 55, n: "3", text: "S-bølge (skjær)", tone: "warm" },
            { x: 42, y: 22, n: "4", text: "Episenter & overflatebølger", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Hyposenter (fokus): Det eksakte bruddpunktet på den låste forkastningsflaten der spenningen overstiger bergartens skjærfasthet." },
            { n: "2", label: "P-bølger (primære): Longitudinelle bølger med vekslende kompresjon og strekk; raskest (~6–8 km/s) og kan gå gjennom både fast stoff og væske." },
            { n: "3", label: "S-bølger (sekundære): Transversale skjærbølger (~3,5–4,5 km/s); kan KUN forplante seg i fast stoff — stoppes momentant av jordens flytende ytre kjerne." },
            { n: "4", label: "Overflatebølger (Rayleigh & Love): Beveger seg langs jordoverflaten med størst amplitude og lavest frekvens; raserer bygninger og broer." },
          ]}
        />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Bølgefysikk og elastisitetsmoduler
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">P-bølger (primære kompresjonsbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              P-bølger er <em>longitudinelle bølger</em>: Partiklene svinger frem og tilbake parallelt med
              bølgens utbredelsesretning.
            </p>
            <p className="mt-1 font-mono text-xs text-teal">
              v_p = √((K + 4/3 μ) / ρ) ≈ 6,0–8,0 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Fordi kompresjonsmodulen K aldri er null, kan P-bølger forplante seg gjennom <strong>både faste bergarter,
              væsker og gasser</strong>. De ankommer alltid først til en seismisk stasjon.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-warm text-sm">S-bølger (sekundære skjærbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              S-bølger er <em>transversale bølger</em>: Partiklene svinger vinkelrett på bølgens
              forplantningsretning.
            </p>
            <p className="mt-1 font-mono text-xs text-warm">
              v_s = √(μ / ρ) ≈ 3,5–4,5 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Væsker og gasser har ingen skjærstivhet (μ = 0). Derfor er{" "}
              <strong> v_s = 0 i væsker</strong> — S-bølger kan overhodet ikke forplante seg gjennom flytende medier!
            </p>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Overflatebølger: Rayleigh og Love
        </h3>
        <p>
          Når P- og S-bølgene treffer jordoverflaten, reflekteres og interfererer de med grenseflaten mot atmosfæren.
          Dette genererer to typer <strong>overflatebølger</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Rayleigh-bølger:</strong> Rullende bølgebevegelse i vertikalplanet (retrograd elliptisk),
            tilsvarende dønninger på havet.
          </li>
          <li>
            <strong className="text-foreground">Love-bølger:</strong> Rent horisontal skjærbevegelse på tvers av bølgeretningen.
            Det er Love- og Rayleigh-bølgene som forårsaker de suverent største ødeleggelsene på bygninger og infrastruktur!
          </li>
        </ul>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Oldhams oppdagelse (1906): S-bølgenes skyggesone
        </h3>
        <p>
          I 1906 publiserte den britiske geologen Richard Dixon Oldham en banebrytende oppdagelse: Seismografer plassert i en
          vinkelavstand på mellom <strong>103° og 180°</strong> fra et jordskjelvs episenter registrerte aldri direkte S-bølger
          (Oldham, 1906).
        </p>
        <p>
          Fordi S-bølger ikke kan gå gjennom væske, innså Oldham at jordens sentrum måtte bestå av en
          gigantisk flytende kjerne! P-bølgene ble dessuten kraftig avbøyd (refraktert) innover på grunn av en brå nedgang i
          lydhastigheten, noe som også skapte en P-bølge-skyggesone mellom 103° og 142°. I 1936 viste den danske seismologen
          Inge Lehmann at svake P-bølger likevel dukket opp i skyggesonen, og beviste dermed eksistensen av en fast, indre kjerne.
        </p>
      </section>

    </>
  );
}
