import { useState } from "react";
import { CloudRain, Flame, ArrowDownRight, ArrowUpRight, Mountain, Droplets } from "lucide-react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

export function FoehnModel() {
  const [t0, setT0] = useState<number>(12); // Havnivåtemperatur loside (°C)
  const [zLcl, setZLcl] = useState<number>(600); // LCL kondensasjonshøyde (m)
  const [zTop, setZTop] = useState<number>(1600); // Fjelltopp / passhøyde (m)
  const [zLee, setZLee] = useState<number>(100); // Dalbunnshøyde leside (m)

  // Lapse rates i °C / 100m
  const gammaD = 1.0; // Tørradiabatisk
  const gammaM = 0.6; // Fuktigadiabatisk

  // Beregninger
  const deltaT1 = -((zLcl / 100) * gammaD);
  const tLcl = t0 + deltaT1;

  const cloudThickness = Math.max(0, zTop - zLcl);
  const deltaT2 = -((cloudThickness / 100) * gammaM);
  const tTop = tLcl + deltaT2;

  const descentHeight = Math.max(0, zTop - zLee);
  const deltaT3 = (descentHeight / 100) * gammaD;
  const tLee = tTop + deltaT3;

  // Sammenlignbar temperatur på losiden ved samme høyde som lesidebunnen
  const tLoEquivalent = t0 - (zLee / 100) * gammaD;
  const netHeating = tLee - tLoEquivalent;

  // Beregnet latent varme og fuktighetsfall
  const rhLee = Math.max(18, Math.round(100 * Math.pow(0.5, (tLee - tLcl) / 5)));

  return (
    <ModelFrame
      kicker="Interaktiv kalkulator"
      title="Fønvindens termodynamikk: Adiabatisk beregner"
      lead="Se trinn for trinn hvordan orografisk sky- og nedbørsdannelse på losiden frigjør latent varme, slik at luften blir vesentlig varmere og knusktørr når den synker ned i dalen på lesiden."
    >
      <div>
        <ModelMarkers />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Venstre panel: Kontrollere og parametere */}
          <ModelPanel className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mountain className="size-4 text-primary" />
              <span>Juster startparametre</span>
            </h4>

            {/* Parameter 1: T0 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Starttemperatur ved havnivå ($T_0$):</span>
                <strong className="text-foreground">{t0} °C</strong>
              </div>
              <input
                type="range"
                min="4"
                max="22"
                step="1"
                value={t0}
                onChange={(e) => setT0(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Parameter 2: zLcl */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Kondensasjonshøyde (LCL):</span>
                <strong className="text-foreground">{zLcl} m</strong>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={zLcl}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setZLcl(val);
                  if (val >= zTop) setZTop(val + 300);
                }}
                className="w-full accent-primary"
              />
              <span className="text-[11px] text-muted-foreground block">
                Her blir relativ fuktighet 100 % og skyen starter.
              </span>
            </div>

            {/* Parameter 3: zTop */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fjellpassets høyde (z_topp):</span>
                <strong className="text-foreground">{zTop} m</strong>
              </div>
              <input
                type="range"
                min="1000"
                max="2600"
                step="100"
                value={zTop}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setZTop(val);
                  if (val <= zLcl) setZLcl(val - 200);
                }}
                className="w-full accent-primary"
              />
            </div>

            {/* Parameter 4: zLee */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Lesidens dalbunn (z_le):</span>
                <strong className="text-foreground">{zLee} m</strong>
              </div>
              <input
                type="range"
                min="0"
                max="400"
                step="50"
                value={zLee}
                onChange={(e) => setZLee(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Sammenfatningsboks */}
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">Netto fønoppvarming:</span>
                <span className="text-base font-bold text-amber-400">
                  +{netHeating.toFixed(1)} °C
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Fordi luftpakken regnet fra seg vanndamp (skytykkelse: {cloudThickness} m), frigjorde
                kondensasjonen latent varme. Formel:{" "}
                <strong className="text-foreground font-mono">
                  ΔT = (Γ_d - Γ_m) · (Δz_sky / 100) = (1,0 - 0,6) · {cloudThickness / 100} = +
                  {netHeating.toFixed(1)} °C
                </strong>
                .
              </p>
            </div>
          </ModelPanel>

          {/* Høyre panel: SVG fjellprofil og etappeoversikt */}
          <div className="space-y-4 lg:col-span-8">
            <ModelPanel className="p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-lg bg-[#0e171f] border border-border">
                <svg
                  viewBox="0 0 740 380"
                  className="w-full h-auto select-none"
                  aria-label="Fønvind temperaturprofil og orografisk nedbør"
                >
                  <defs>
                    <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#475569" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="foehnGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ea580c" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Fjellbakgrunn */}
                  {/* Lo side: 50 -> 360, Topp: 360 -> 100, Le side: 360 -> 690 */}
                  <polygon
                    points="40,340 360,90 700,340 700,380 40,380"
                    fill="#18232c"
                    stroke="#334155"
                    strokeWidth="2"
                  />

                  {/* Fønvindens varme sone på lesiden */}
                  <polygon
                    points="360,90 700,340 700,90"
                    fill="url(#foehnGrad)"
                  />

                  {/* Nivålinjer */}
                  {/* Havnivå */}
                  <line x1="30" y1="340" x2="710" y2="340" stroke="#334155" strokeDasharray="3 3" />
                  <text x="35" y="355" fill="#64748b" fontSize="10">0 m (Havnivå)</text>

                  {/* LCL Kondensasjonsnivå linje */}
                  {/* Skalerer høyde: 0m = y340, 2600m = y90 -> 250px / 2600m ~ 0.096 px/m */}
                  {(() => {
                    const yLcl = 340 - (zLcl / 2600) * 250;
                    const yTop = 340 - (zTop / 2600) * 250;
                    const yLee = 340 - (zLee / 2600) * 250;

                    return (
                      <>
                        {/* LCL stiplelinje */}
                        <line x1="40" y1={yLcl} x2="360" y2={yLcl} stroke="#38bdf8" strokeDasharray="4 3" opacity="0.7" />
                        <text x="50" y={yLcl - 6} fill="#38bdf8" fontSize="10" fontWeight="600">
                          Kondensasjonsnivå (LCL: {zLcl} m) · Skybase
                        </text>

                        {/* Orografisk sky og nedbør på losiden */}
                        <path
                          d={`M 150,${yLcl} Q 250,${yLcl - 35} 355,${yTop} L 360,${yTop + 20} Q 240,${yLcl + 10} 140,${yLcl + 10} Z`}
                          fill="url(#cloudGrad)"
                        />
                        {/* Regndråper under skyen på losiden */}
                        <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.7">
                          <line x1="200" y1={yLcl + 15} x2="190" y2={yLcl + 55} />
                          <line x1="230" y1={yLcl + 20} x2="220" y2={yLcl + 60} />
                          <line x1="260" y1={yLcl + 15} x2="250" y2={yLcl + 55} />
                          <line x1="290" y1={yLcl + 10} x2="280" y2={yLcl + 50} />
                        </g>
                        <text x="235" y={yLcl + 75} fill="#7dd3fc" fontSize="11" fontWeight="600" textAnchor="middle">
                          Orografisk nedbør (Regn faller ut)
                        </text>

                        {/* Piler langs losiden */}
                        {/* 1. Tørradiabatisk opp til LCL */}
                        <path
                          d={`M 80,330 C 110,310 140,${yLcl + 20} 170,${yLcl}`}
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="2.5"
                          markerEnd="url(#mdl-teal)"
                        />
                        <text x="100" y="290" fill="#94a3b8" fontSize="10">
                          Trinn 1: Tørradiabatisk (1,0 °C / 100m)
                        </text>

                        {/* 2. Fuktigadiabatisk over LCL */}
                        <path
                          d={`M 200,${yLcl - 10} C 250,${(yLcl + yTop) / 2} 300,${yTop + 20} 350,${yTop}`}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                          markerEnd="url(#mdl-teal)"
                        />
                        <text x="210" y={(yLcl + yTop) / 2 - 10} fill="#7dd3fc" fontSize="10">
                          Trinn 2: Fuktigadiabatisk (0,6 °C / 100m)
                        </text>

                        {/* 3. Tørradiabatisk stup ned på lesiden */}
                        <path
                          d={`M 370,${yTop + 5} C 440,${(yTop + yLee) / 2} 550,${yLee - 20} 640,${yLee}`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="3.5"
                          markerEnd="url(#mdl-red)"
                        />
                        <text x="510" y={(yTop + yLee) / 2 - 15} fill="#f59e0b" fontSize="11" fontWeight="600">
                          Trinn 3: Tørr kompresjonsoppvarming (1,0 °C / 100m)
                        </text>

                        {/* Markører ved nøkkelpunkter */}
                        {/* Punkt A: Havnivå loside */}
                        <g transform="translate(60, 335)">
                          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
                          <rect x="10" y="-18" width="95" height="34" rx="4" fill="#0f172a" stroke="#334155" />
                          <text x="18" y="-4" fill="#cbd5e1" fontSize="10">Loside (0 m):</text>
                          <text x="18" y="10" fill="#38bdf8" fontSize="12" fontWeight="bold">
                            {t0.toFixed(1)} °C · 75% RH
                          </text>
                        </g>

                        {/* Punkt B: LCL */}
                        <g transform={`translate(160, ${yLcl})`}>
                          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
                          <rect x="10" y="-18" width="105" height="34" rx="4" fill="#0f172a" stroke="#334155" />
                          <text x="18" y="-4" fill="#cbd5e1" fontSize="10">Skybase ({zLcl} m):</text>
                          <text x="18" y="10" fill="#38bdf8" fontSize="12" fontWeight="bold">
                            {tLcl.toFixed(1)} °C · 100% RH
                          </text>
                        </g>

                        {/* Punkt C: Fjellkam */}
                        <g transform={`translate(360, ${yTop})`}>
                          <circle cx="0" cy="0" r="6" fill="#f87171" />
                          <rect x="-65" y="-42" width="130" height="36" rx="4" fill="#0f172a" stroke="#f87171" />
                          <text x="0" y="-28" fill="#fca5a5" fontSize="10" textAnchor="middle">
                            Fjellpass ({zTop} m):
                          </text>
                          <text x="0" y="-12" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">
                            {tTop.toFixed(1)} °C
                          </text>
                        </g>

                        {/* Punkt D: Leside dalbunn */}
                        <g transform={`translate(630, ${yLee})`}>
                          <circle cx="0" cy="0" r="6" fill="#f59e0b" />
                          <rect x="-85" y="-55" width="165" height="46" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                          <text x="-75" y="-38" fill="#fed7aa" fontSize="10" fontWeight="600">
                            LESIDE (FØNVIND, {zLee} m):
                          </text>
                          <text x="-75" y="-20" fill="#fff" fontSize="15" fontWeight="bold">
                            {tLee.toFixed(1)} °C
                          </text>
                          <text x="-75" y="-6" fill="#fde68a" fontSize="10">
                            RH: ~{rhLee} % (Knusktørr!)
                          </text>
                        </g>
                      </>
                    );
                  })()}
                </svg>
              </div>
            </ModelPanel>

            {/* Trinnvis matematisk forklaring */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg border border-border bg-card/60 p-3 space-y-1">
                <span className="font-semibold text-primary flex items-center gap-1">
                  <ArrowUpRight className="size-3.5" />
                  1. Tørradiabatisk heving
                </span>
                <p className="text-muted-foreground">
                  Fra 0 til {zLcl} m avkjøles umettet luft med 1,0 °C/100m.
                </p>
                <p className="font-mono text-foreground">
                  {t0} °C - {(zLcl / 100) * 1.0} °C = <strong>{tLcl.toFixed(1)} °C</strong>
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card/60 p-3 space-y-1">
                <span className="font-semibold text-sky-400 flex items-center gap-1">
                  <Droplets className="size-3.5" />
                  2. Fuktigadiabatisk sky
                </span>
                <p className="text-muted-foreground">
                  Fra {zLcl} til {zTop} m frigjør kondensasjon latent varme (0,6 °C/100m).
                </p>
                <p className="font-mono text-foreground">
                  {tLcl.toFixed(1)} °C - {((cloudThickness / 100) * 0.6).toFixed(1)} °C ={" "}
                  <strong>{tTop.toFixed(1)} °C</strong>
                </p>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 space-y-1">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <ArrowDownRight className="size-3.5" />
                  3. Tørr nedsynkning
                </span>
                <p className="text-muted-foreground">
                  Fra {zTop} til {zLee} m varmes tørr luft adiabatisk med 1,0 °C/100m!
                </p>
                <p className="font-mono text-amber-300 font-bold">
                  {tTop.toFixed(1)} °C + {((descentHeight / 100) * 1.0).toFixed(1)} °C = {tLee.toFixed(1)} °C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModelFrame>
  );
}
