export function Seksjon5() {
  return (
    <>
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            Vulkanovervåking og tidlig varsling (Early Warning Systems)
          </h3>
          <p className="text-sm text-muted-foreground">
            I motsetning til jordskjelv – som opptrer plutselig uten sikre forvarsler – gir vulkaner nesten alltid
            tydelige fysiske og kjemiske signaler uker eller måneder før et utbrudd (Sigurdsson et al., 2015).
            Moderne vulkanobservatorier overvåker fire uavhengige parametere:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-sky-400 text-sm">1. Seismisk tremor og jordskjelvsvermer</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Når magma bryter seg oppover gjennom skorpen, sprekker fjellet opp i tusenvis av små skjelv (vulkano-tektoniske
                skjelv). Når magma og gasser strømmer turbulent gjennom sprekker, oppstår en kontinuerlig, lavfrekvent resonanslyd
                kalt <strong>harmonisk tremor (1–5 Hz)</strong>. Tremor er det sikreste akustiske tegnet på magma i bevegelse.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-emerald-400 text-sm">2. GNSS, InSAR og bakkedeformasjon</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Når magmakammeret fylles, utvider det seg som en ballong (Mogi-modell). Fjellflankene buler utover og hever seg
                med millimeter til titalls centimeter. Dette måles i sanntid med høypresisjons-GNSS, elektroniske tiltmetere
                og satellitt-radarinterferometri (InSAR).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-amber-400 text-sm">3. Gassfluks (SO₂ og CO₂ spektrometri)</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Oppstigende magma avgasser flyktige stoffer ved trykkfall. Optiske spektrometere (DOAS) og mobile Multi-GAS-instrumenter
                måler tonnasjen av SO₂ og CO₂. En brå økning i SO₂-fluks betyr at magmaen har nådd overflatenære dyp (&lt; 2–3 km).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold text-rose-400 text-sm">4. Termografi og satellittovervåking</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Infrarøde satellittkameraer (MODIS, Sentinel) og bakkebaserte varmekameraer oppdager termiske anomalier
                (oppvarming av kraterbunner, sprekker og fumaroler) før synlig magma når dagslys.
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Dataene integreres i det internasjonale <strong>Aviation Colour Code-systemet</strong> (Grønn, Gul, Oransje, Rød)
            som administreres av ICAO, og utløser formelle VONA-varsler som lar flyselskap omdirigere flygninger før askeskyen treffer luftkorridorene.
          </p>
        </div>
    </>
  );
}
