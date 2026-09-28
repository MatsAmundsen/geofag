import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Gauge, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

export function WindPowerModel() {
  const [v, setV] = useState<number>(9); // Vindhastighet i m/s
  const [diameter, setDiameter] = useState<number>(164); // Rotordiameter i meter
  const [rho, setRho] = useState<number>(1.225); // Lufttetthet i kg/m³

  // Rotorareal
  const radius = diameter / 2;
  const area = Math.PI * Math.pow(radius, 2);

  // Kinetisk effekt i uforstyrret luftstrøm: P_tot = 0.5 * rho * A * v^3
  const pTotalWatts = 0.5 * rho * area * Math.pow(v, 3);
  const pTotalMW = pTotalWatts / 1e6;

  // Betz' teoretiske grense (16/27 ≈ 59.26 %)
  const pBetzMW = pTotalMW * (16 / 27);

  // Realistisk merkeeffekt for turbinstørrelsen (omtrentlig tommelfingerregel basert på rotordiameter)
  const ratedPowerMW = Math.round(Math.pow(diameter / 55, 2.1) * 10) / 10;

  // Reell elektrisk produksjon med cut-in (3 m/s), merkeeffekt-platå (13 m/s) og cut-out (25 m/s)
  let pRealMW = 0;
  let status = "Normal drift";
  if (v < 3) {
    pRealMW = 0;
    status = "Under cut-in (Vinden er for svak til å starte)";
  } else if (v > 25) {
    pRealMW = 0;
    status = "Over cut-out (Stormstopp for å beskytte turbinen)";
  } else if (v >= 13) {
    pRealMW = ratedPowerMW;
    status = `Nominell drift (Bladene pitches for å holde konstant merkeeffekt ${ratedPowerMW} MW)`;
  } else {
    // Delvis last: Cp ≈ 0.46, generatorvirkningsgrad ≈ 0.94 -> totalt ca 0.43 av pTotal
    pRealMW = Math.min(ratedPowerMW, pTotalMW * 0.43);
    status = `Delt last: Cp ≈ 0.46 (Effekten følger kubikkurven v³)`;
  }

  // Kubikklov demonstrasjon: Hva skjer ved 20 % vindøkning (v * 1.2)?
  const vIncreased = Math.round(v * 1.2 * 10) / 10;
  const powerFactor = Math.pow(1.2, 3); // 1.2^3 = 1.728 (+73 % effekt!)

  return (
    <ModelFrame
      kicker="Interaktiv kalkulator"
      title="Vindkraftens fysikk: Kubikkloven og Betz' grense"
      lead="Effekten i en vindturbin vokser ikke lineært med vinden, men med kubikken av vindhastigheten (v³). Utforsk samspillet mellom rotorareal, lufttetthet, Betz-grensen på 59,3 % og turbinens faktiske effektkurve."
    >
      <div>
        <ModelMarkers />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Venstre panel: Slidere og forhåndsinnstillinger */}
          <ModelPanel className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Gauge className="size-4 text-primary" />
                <span>Turbin- og vindparametre</span>
              </h4>
            </div>

            {/* Presets */}
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider block">
                Hurtigvalg av turbinstørrelse:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant={diameter === 110 ? "default" : "secondary"}
                  onClick={() => setDiameter(110)}
                  className="text-xs h-7 px-1"
                >
                  3 MW Land (110m)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={diameter === 164 ? "default" : "secondary"}
                  onClick={() => setDiameter(164)}
                  className="text-xs h-7 px-1"
                >
                  8 MW Hav (164m)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={diameter === 236 ? "default" : "secondary"}
                  onClick={() => setDiameter(236)}
                  className="text-xs h-7 px-1"
                >
                  15 MW Gigant (236m)
                </Button>
              </div>
            </div>

            {/* Parameter 1: Vindhastighet (v) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Vindhastighet ved navhøyde (v):</span>
                <strong className="text-foreground text-sm font-mono text-primary">{v} m/s</strong>
              </div>
              <input
                type="range"
                min="1"
                max="28"
                step="0.5"
                value={v}
                onChange={(e) => setV(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>0 (Stille)</span>
                <span>Cut-in: 3</span>
                <span>Nominell: 13</span>
                <span>Cut-out: 25</span>
                <span>28 m/s (Storm)</span>
              </div>
            </div>

            {/* Parameter 2: Rotordiameter (D) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Rotordiameter (D):</span>
                <strong className="text-foreground font-mono">{diameter} meter</strong>
              </div>
              <input
                type="range"
                min="60"
                max="250"
                step="2"
                value={diameter}
                onChange={(e) => setDiameter(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="text-[11px] text-muted-foreground block">
                Sveipet rotorareal: A = π · ({diameter}/2)² ={" "}
                <strong className="text-foreground">{Math.round(area).toLocaleString("no-NO")} m²</strong>
              </span>
            </div>

            {/* Parameter 3: Lufttetthet (rho) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Lufttetthet (ρ):</span>
                <strong className="text-foreground font-mono">{rho.toFixed(3)} kg/m³</strong>
              </div>
              <input
                type="range"
                min="1.15"
                max="1.30"
                step="0.01"
                value={rho}
                onChange={(e) => setRho(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Mild sommer (1,18)</span>
                <span>Standard (1,225)</span>
                <span>Kald vinterluft (1,29)</span>
              </div>
            </div>

            {/* Kubikkloven i praksis boks */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <Sparkles className="size-4" />
                <span>Kubikkloven i praksis:</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Dersom vinden øker med bare <strong>20 %</strong> (fra {v} til {vIncreased} m/s), øker
                energien i luften med hele <strong>{Math.round((powerFactor - 1) * 100)} %</strong>{" "}
                (fordi 1,2³ = {powerFactor.toFixed(2)})!
              </p>
              <p className="text-[11px] text-amber-200/80 font-mono">
                P ∝ v³ → Derfor slår et jevnt vindfelt til havs flere turbiner i ujevn terrengvind på land.
              </p>
            </div>
          </ModelPanel>

          {/* Høyre panel: Beregningsresultater og effektkurve-visualisering */}
          <div className="space-y-4 lg:col-span-7">
            {/* Nøkkeltall kort */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="rounded-xl border border-border bg-card/70 p-3 text-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  Kinetisk effekt i luften
                </span>
                <span className="text-lg font-bold font-mono text-muted-foreground">
                  {pTotalMW.toFixed(2)} MW
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  ½ · ρ · A · v³
                </span>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-center">
                <span className="text-[10px] text-primary uppercase tracking-wider block font-semibold">
                  Betz-grense (59,3 %)
                </span>
                <span className="text-lg font-bold font-mono text-primary">
                  {pBetzMW.toFixed(2)} MW
                </span>
                <span className="text-[10px] text-primary/80 block">
                  Teoretisk maks virkningsgrad
                </span>
              </div>

              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-center">
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                  Reell elektrisk leveranse
                </span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {pRealMW.toFixed(2)} MW
                </span>
                <span className="text-[10px] text-emerald-300/80 block">
                  {v < 3 || v > 25 ? "0 MW levert" : `Virkningsgrad: ~${Math.round((pRealMW / pTotalMW) * 100)} %`}
                </span>
              </div>
            </div>

            {/* SVG effektkurve graf */}
            <ModelPanel className="p-3">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-foreground">
                  Effektkurve P(v) med aktivt driftspunkt
                </span>
                <span className="text-muted-foreground font-mono text-[11px]">
                  Drift: <strong>{status}</strong>
                </span>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-[#0e171f] border border-border p-2">
                <svg
                  viewBox="0 0 620 250"
                  className="w-full h-auto select-none"
                  aria-label="Vindturbin effektkurve graf"
                >
                  <defs>
                    <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Rutenett og akser */}
                  {/* Horisontal vind-akse: 0 til 30 m/s -> x: 50 til 580 (530px bred, 17.66 px/ms) */}
                  {/* Vertikal effekt-akse: 0 til ratedPowerMW -> y: 210 til 30 (180px høy) */}
                  <line x1="50" y1="210" x2="590" y2="210" stroke="#334155" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="50" y2="210" stroke="#334155" strokeWidth="1.5" />

                  {/* Aksetekster */}
                  <text x="590" y="225" fill="#94a3b8" fontSize="10" textAnchor="end">
                    Vindhastighet v (m/s)
                  </text>
                  <text x="45" y="24" fill="#94a3b8" fontSize="10" textAnchor="end">
                    Effekt P (MW)
                  </text>

                  {/* V-markeringer på x-aksen */}
                  {[0, 5, 10, 13, 15, 20, 25, 30].map((val) => {
                    const x = 50 + (val / 30) * 530;
                    return (
                      <g key={val}>
                        <line x1={x} y1="210" x2={x} y2="215" stroke="#475569" />
                        <text x={x} y="225" fill="#64748b" fontSize="9" textAnchor="middle">
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Cut-in og cut-out soner */}
                  {/* Sone 1: Under cut-in (0–3 m/s) */}
                  <rect x="50" y="30" width={(3 / 30) * 530} height="180" fill="#475569" opacity="0.1" />
                  <text x={50 + 1.5 * 17.66} y="120" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90, 76, 120)">
                    Stille
                  </text>

                  {/* Sone 3: Over cut-out (25–30 m/s) */}
                  <rect x={50 + (25 / 30) * 530} y="30" width={(5 / 30) * 530} height="180" fill="#ef4444" opacity="0.1" />
                  <text x={50 + 27.5 * 17.66} y="120" fill="#f87171" fontSize="9" textAnchor="middle" transform="rotate(-90, 536, 120)">
                    Stormvern
                  </text>

                  {/* Selve effektkurven */}
                  {/* 0–3 m/s: 0, 3–13 m/s: kubikkurve opp til ratedPower, 13–25 m/s: flat, 25 m/s: bratt fall til 0 */}
                  <path
                    d={`M 50 210 L ${50 + 3 * 17.66} 210 Q ${50 + 8 * 17.66} 190 ${50 + 13 * 17.66} 50 L ${50 + 25 * 17.66} 50 L ${50 + 25 * 17.66} 210 L 580 210`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Fyll under kurven */}
                  <path
                    d={`M 50 210 L ${50 + 3 * 17.66} 210 Q ${50 + 8 * 17.66} 190 ${50 + 13 * 17.66} 50 L ${50 + 25 * 17.66} 50 L ${50 + 25 * 17.66} 210 Z`}
                    fill="url(#curveGrad)"
                  />

                  {/* Merkeeffekt linje */}
                  <line x1="50" y1="50" x2={50 + 25 * 17.66} y2="50" stroke="#10b981" strokeDasharray="3 3" opacity="0.5" />
                  <text x="55" y="44" fill="#34d399" fontSize="9">
                    Merkeeffekt: {ratedPowerMW} MW
                  </text>

                  {/* Nåværende driftspunkt */}
                  {(() => {
                    const curX = 50 + Math.min(30, v) * 17.66;
                    let curY = 210;
                    if (v >= 3 && v <= 13) {
                      // Kubisk interpolasjon mellom 210 (v=3) og 50 (v=13)
                      const t = (v - 3) / 10;
                      curY = 210 - Math.pow(t, 2.5) * 160;
                    } else if (v > 13 && v <= 25) {
                      curY = 50;
                    } else {
                      curY = 210;
                    }

                    return (
                      <g>
                        {/* Hjelpelinjer til aksene */}
                        <line x1={curX} y1={curY} x2={curX} y2="210" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1.2" />
                        <line x1="50" y1={curY} x2={curX} y2={curY} stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1.2" />

                        {/* Pulserende punkt */}
                        <circle cx={curX} cy={curY} r="9" fill="#f59e0b" opacity="0.3" className="animate-ping" />
                        <circle cx={curX} cy={curY} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />

                        {/* Readout merkelapp */}
                        <g transform={`translate(${curX > 400 ? curX - 110 : curX + 12}, ${curY > 150 ? curY - 35 : curY + 10})`}>
                          <rect x="0" y="0" width="100" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" />
                          <text x="6" y="13" fill="#cbd5e1" fontSize="9">
                            v = {v} m/s
                          </text>
                          <text x="6" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            P = {pRealMW.toFixed(2)} MW
                          </text>
                        </g>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </ModelPanel>

            <ModelNote title="Hvorfor Betz' grense (16/27 ≈ 59,3 %) er en absolutt naturlov" tone="teal">
              <p>
                Albert Betz beviste i 1919 at en vindturbin umulig kan hente ut 100 % av vindens bevegelsesenergi.
                Dersom turbinen stoppet luften fullstendig (100 % uttak), ville lufthastigheten bak rotoren bli
                null. Men stillestående luft kan ikke slippe unna; den ville blokkert for all ny luft som strømmer
                til forfra!
              </p>
              <p>
                Optimal oppbremsing oppnås når lufthastigheten nedstrøms reduseres til nøyaktig <strong>én tredjedel
                (v/3)</strong> av den opprinnelige vindhastigheten. Da er virkningsgraden matematisk maksimalt{" "}
                <strong>16/27 = 59,3 %</strong>. Moderne rotordesign henter ut opptil 45–48 % i praksis.
              </p>
            </ModelNote>
          </div>
        </div>
      </div>
    </ModelFrame>
  );
}
