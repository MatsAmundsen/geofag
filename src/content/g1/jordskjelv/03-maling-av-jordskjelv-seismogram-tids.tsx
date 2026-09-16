import { Callout } from "@/components/callout";
import { SeismogramDiagram } from "@/components/diagrams";

export function MalingAvJordskjelvSeismogramTids() {
  return (
    <>
      {/* SEKSJON 3: SEISMOGRAM OG TRIANGULERING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Måling av jordskjelv: Seismogram, tidsdifferanse og magnitude
        </h2>
        <p>
          Et <em>seismometer</em> registrerer bakkebevegelse i tre ortogonale dimensjoner (nord-sør, øst-vest og vertikalt)
          ved hjelp av en opphengt treghetsmasse som forblir i ro mens jorden ryster rundt den. Den digitale utskriften kalles
          et <strong>seismogram</strong>.
        </p>

        <SeismogramDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Lokalisering via sirkeltriangulering
        </h3>
        <p>
          Fordi P-bølgene beveger seg omtrent 1,7 ganger raskere enn S-bølgene, vil avstanden mellom de to bølgetogene øke
          jo lenger de reiser. Tidsdifferansen mellom første P-bølgeankomst og første S-bølgeankomst kalles
          <strong className="text-foreground"> Δt = t_S - t_P</strong>.
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-primary">
          d = Δt · (v_p · v_s) / (v_p - v_s) ≈ Δt · 8,0 km/s (i typisk kontinentalskorpe)
        </div>
        <p className="text-sm text-muted-foreground">
          Én stasjon gir oss avstandsradien som en sirkel. To stasjoner gir to sirkler som skjærer hverandre i to punkter.
          Først med en <strong>tredje uavhengig seismisk stasjon</strong> krysser sirklene i et unikt, felles punkt:{" "}
          <strong>jordskjelvets episenter</strong>!
        </p>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Magnitude: Hvor mye energi slapp skjelvet?
        </h3>
        <p>
          Historisk ble jordskjelv målt med Charles Richters <em>lokalmagnitude (M_L)</em> fra 1935. Richters skala har imidlertid
          en alvorlig fysisk begrensning: Ved svært store jordskjelv «mettes» seismometeret, slik at et skjelv på magnitude 8
          og et på magnitude 9,5 kan gi tilnærmet samme utslag.
        </p>
        <p>
          I moderne geofag brukes derfor utelukkende <strong className="text-foreground">momentmagnitude (M_w)</strong>,
          introdusert av Hiroo Kanamori og Thomas Hanks. Momentmagnituden er direkte forankret i skjelvets fysiske
          parametere via det <em>seismiske momentet (M₀)</em>:
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-primary">
          M₀ = μ · A · D
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Hvor:</p>
          <p>• <strong>μ</strong> = bergartens skjærstivhet (typisk ~30 GPa i jordskorpen)</p>
          <p>• <strong>A</strong> = arealet av forkastningsflaten som brast (lengde × bredde i m²)</p>
          <p>• <strong>D</strong> = gjennomsnittlig forskyvning langs bruddflaten (i meter)</p>
        </div>
        <p>
          Momentmagnituden beregnes deretter logaritmisk: M_w = ⅔ log₁₀(M₀) - 6,07.
        </p>
        <Callout title="Viktig eksamenspoeng: Den logaritmiske energiskalaen">
          <p>
            En økning på <strong>1 enhet i magnitude</strong> betyr at den frigjorte seismiske energien øker med en faktor
            på 10^(1,5) ≈ <strong>31,6 ganger</strong>!
          </p>
          <p className="mt-1">
            En økning på <strong>2 enheter</strong> (f.eks. fra M 5 til M 7) betyr at skjelvet frigjør nøyaktig
            31,6 × 31,6 = <strong>1000 ganger mer energi</strong>! Det kraftigste skjelvet som noensinne er målt,
            Valdivia-skjelvet i Chile i 1960 (M_w 9,5), frigjorde mer seismisk energi enn titusenvis av Hiroshima-atombomber.
          </p>
        </Callout>
      </section>

    </>
  );
}
