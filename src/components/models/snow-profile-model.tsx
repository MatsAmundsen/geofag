import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Snowflake, AlertTriangle, ShieldCheck, Thermometer, Layers, Play, CheckCircle } from "lucide-react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

type SnowLayerId = "new_snow" | "wind_slab" | "weak_layer" | "old_base";

interface SnowLayer {
  id: SnowLayerId;
  name: string;
  depthRange: string;
  topCm: number;
  bottomCm: number;
  grainType: string;
  grainSymbol: string;
  grainSize: string;
  hardness: "F" | "4F" | "1F" | "P" | "K";
  hardnessName: string;
  hardnessScore: number; // 1 (F/Neve) til 5 (K/Kniv) for SVG bredde
  color: string;
  description: string;
  metamorphism: string;
}

export function SnowProfileModel() {
  const [surfaceTemp, setSurfaceTemp] = useState<number>(-16); // Overflatetemp i °C
  const [selectedLayer, setSelectedLayer] = useState<SnowLayerId>("weak_layer");
  const [hasWeakLayer, setHasWeakLayer] = useState<boolean>(true);
  const [ectResult, setEctResult] = useState<string | null>(null);
  const [isTestingEct, setIsTestingEct] = useState<boolean>(false);

  // Temperatur ved bakken er alltid ca. 0 °C på grunn av jordvarme og isolasjon
  const groundTemp = 0;
  const snowDepthMeters = 1.2;
  const tempGradient = Math.abs(groundTemp - surfaceTemp) / snowDepthMeters; // °C per meter
  const isKineticMetamorphism = tempGradient >= 10.0;

  const LAYERS: Record<SnowLayerId, SnowLayer> = {
    new_snow: {
      id: "new_snow",
      name: "1. Overflatenysnø",
      depthRange: "0–20 cm",
      topCm: 0,
      bottomCm: 20,
      grainType: "Nysnøkrystaller (Stjerner & dendritter)",
      grainSymbol: "✦",
      grainSize: "1–2 mm",
      hardness: "F",
      hardnessName: "Neve (Fist - Veldig myk)",
      hardnessScore: 1,
      color: "#38bdf8",
      description:
        "Uomdannet nysnø som har falt under rolige vindforhold. Lett, luftig og med lav tetthet (~80–120 kg/m³).",
      metamorphism:
        "I overflaten er snøen i direkte kontakt med atmosfæren og opplever døgnlige temperatursvingninger.",
    },
    wind_slab: {
      id: "wind_slab",
      name: "2. Vindpakket flak (Fokksnø)",
      depthRange: "20–55 cm",
      topCm: 20,
      bottomCm: 55,
      grainType: "Finkornet vindknust snø (Sintret)",
      grainSymbol: "•",
      grainSize: "0,3–0,5 mm",
      hardness: "1F",
      hardnessName: "Én finger (1-Finger - Moderat hardt)",
      hardnessScore: 3,
      color: "#94a3b8",
      description:
        "Vindtransport har knust snøkrystallene til små fragmenter som pakker seg ekstremt tett. Blir et stivt, sammenhengende flak som kan overføre spenninger over store avstander.",
      metamorphism:
        "Rask sintring (dannelse av isbroer mellom kornene) skaper mekanisk styrke og flakdannelse.",
    },
    weak_layer: {
      id: "weak_layer",
      name: "3. Kritisk svakt lag (Begersnø / Kantkorn)",
      depthRange: "55–65 cm",
      topCm: 55,
      bottomCm: 65,
      grainType: "Begerkrystaller / Dybderim (Fasetter)",
      grainSymbol: "⬡",
      grainSize: "2–4 mm",
      hardness: "4F",
      hardnessName: "Fire fingre (4-Finger - Svakt & løst)",
      hardnessScore: 1.5,
      color: "#f87171",
      description:
        "Kritisk svakt sjikt! Løse, store begerkrystaller (dybderim) med fasetterte kanter. Kornene har nesten ingen bindende isbroer og fungerer som kulerunder under det stive flaket over.",
      metamorphism:
        "Kinetisk metamorfose: Drevet av kraftig temperaturgradient (> 10 °C/m) som har transportert vanndamp oppover og bygget kantete krystaller.",
    },
    old_base: {
      id: "old_base",
      name: "4. Gammel vintersåle",
      depthRange: "65–120 cm",
      topCm: 65,
      bottomCm: 120,
      grainType: "Avrundede korn (Likevektsomdannet)",
      grainSymbol: "○",
      grainSize: "1–1,5 mm",
      hardness: "K",
      hardnessName: "Kniv (Knife - Svært hard & kompakt)",
      hardnessScore: 5,
      color: "#475569",
      description:
        "Gammel, godt konsolidert snøbase fra tidlig vinter. Høy tetthet (350–450 kg/m³) og sterk bæreevne.",
      metamorphism:
        "Likevektsmetamorfose (avrunding): Lav temperaturgradient har jevnet ut krystallformene og styrket isbroene.",
    },
  };

  const active = LAYERS[selectedLayer];

  function runEctTest() {
    setIsTestingEct(true);
    setEctResult(null);

    setTimeout(() => {
      setIsTestingEct(false);
      if (hasWeakLayer) {
        setEctResult("ECTP14 (Kritisk flakskredfare!)");
      } else {
        setEctResult("ECTN26 / ECTX (Stabil snøpakke)");
      }
    }, 900);
  }

  return (
    <ModelFrame
      kicker="Interaktiv snøgrop & stabilitetstest"
      title="Snøprofilbygger og Extended Column Test (ECT)"
      lead="Snø er ikke en homogen masse, men en lagdelt struktur av metamorfe bergartssjikt. Utforsk hvordan temperaturgradienten (dT/dz) styrer omdanningen til farlige begerkrystaller, og simuler en utvidet kompresjonstest (ECT) for å teste skredfaren."
    >
      <div>
        <ModelMarkers />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Venstre panel: Kontrollere og temperaturgradient */}
          <ModelPanel className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Thermometer className="size-4 text-primary" />
              <span>Temperaturgradient i snøpakken</span>
            </h4>

            {/* Parameter: Overflatetemperatur */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Snøoverflatens temperatur (T_overflate):</span>
                <strong className="text-foreground font-mono text-sky-400">{surfaceTemp} °C</strong>
              </div>
              <input
                type="range"
                min="-25"
                max="-2"
                step="1"
                value={surfaceTemp}
                onChange={(e) => setSurfaceTemp(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Svært kaldt (-25 °C)</span>
                <span>Mild vinterdag (-2 °C)</span>
              </div>
            </div>

            {/* Gradient-kalkulator boks */}
            <div
              className={`rounded-xl border p-3.5 text-xs space-y-2 ${
                isKineticMetamorphism
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>Beregnet gradient (ΔT / Δz):</span>
                <span className="text-base font-bold font-mono">
                  {tempGradient.toFixed(1)} °C / meter
                </span>
              </div>

              {isKineticMetamorphism ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <AlertTriangle className="size-3.5 shrink-0" />
                    <span>Bratt gradient (≥ 10 °C/m) → Kinetisk metamorfose!</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Fordi temperaturforskjellen mellom overflaten ({surfaceTemp} °C) og bakken (0 °C) er
                    stor, oppstår et kraftig vanndamptrykk. Vanndamp subsidierer oppover i snøen og
                    krystalliserer seg som <strong>fasetterte kantkorn og hule begerkrystaller (dybderim)</strong>.
                    Krystallene mister bindinger og danner vedvarende svake lag!
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="size-3.5 shrink-0" />
                    <span>Svak gradient (&lt; 10 °C/m) → Likevektsmetamorfose</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Lav temperaturforskjell fører til at snøkornene avrundes (avrundingsomdanning) og
                    bygger sterke isbroer (sintring). Snødekket stabiliseres og styrkes over tid.
                  </p>
                </div>
              )}
            </div>

            {/* Stabilitetstest ECT Seksjon */}
            <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center justify-between">
                <span>Extended Column Test (ECT)</span>
                <span className="text-[10px] text-muted-foreground font-normal">Feltmetode for bruddforplantning</span>
              </h4>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Scenario i snøgropa:</span>
                <Button
                  type="button"
                  size="sm"
                  variant={hasWeakLayer ? "default" : "secondary"}
                  onClick={() => {
                    setHasWeakLayer((v) => !v);
                    setEctResult(null);
                  }}
                  className={`h-6 text-[11px] px-2 ${hasWeakLayer ? "bg-rose-600 hover:bg-rose-700 text-white" : ""}`}
                >
                  {hasWeakLayer ? "Svakt lag inkludert" : "Homogent / stabilt"}
                </Button>
              </div>

              <Button
                type="button"
                onClick={runEctTest}
                disabled={isTestingEct}
                className="w-full gap-2 text-xs"
                variant="default"
              >
                <Play className="size-3.5" />
                {isTestingEct ? "Utfører 30 slag på spaden..." : "Gjennomfør ECT-test (Slag 1–30)"}
              </Button>

              {ectResult && (
                <div
                  className={`rounded-lg border p-2.5 text-xs ${
                    hasWeakLayer
                      ? "border-rose-500/50 bg-rose-500/15 text-rose-200"
                      : "border-emerald-500/50 bg-emerald-500/15 text-emerald-200"
                  }`}
                >
                  <strong className="block text-sm font-bold">{ectResult}</strong>
                  {hasWeakLayer ? (
                    <p className="mt-1 text-[11px] leading-relaxed">
                      <strong>ECTP (Propagation):</strong> På slag 14 (moderat slag fra albuen) initieres
                      et brudd i det svake laget (lag 3), og bruddet skyter <em>tvers over hele den 90 cm
                      brede søylen</em> på samme slag! Dette betyr at en skiløper vil utløse et fjernutløst
                      flakskred.
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] leading-relaxed">
                      <strong>ECTN / ECTX:</strong> Brudd oppstår enten ikke (ECTX) eller stopper lokalt
                      under spaden uten å forplante seg (ECTN). Snødekket tåler belastning.
                    </p>
                  )}
                </div>
              )}
            </div>
          </ModelPanel>

          {/* Høyre panel: Snøgrop tverrsnitt og lagdetaljer */}
          <div className="space-y-4 lg:col-span-7">
            {/* SVG Snøgrop Visualisering */}
            <ModelPanel className="p-3">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-foreground">
                  Snøprofil: Dybde, lagdeling og håndhardhet
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Klikk på et lag for å analysere kornform
                </span>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-[#0a1218] border border-border p-2">
                <svg
                  viewBox="0 0 600 300"
                  className="w-full h-auto select-none"
                  aria-label="Snøprofil med lagdeling og hardhet"
                >
                  {/* Dybdeskala til venstre (0 til 120 cm -> y: 30 til 270, 240px høy = 2px per cm) */}
                  <line x1="60" y1="30" x2="60" y2="270" stroke="#334155" strokeWidth="1.5" />
                  {[0, 20, 40, 60, 80, 100, 120].map((d) => (
                    <g key={d}>
                      <line x1="55" y1={30 + d * 2} x2="60" y2={30 + d * 2} stroke="#475569" />
                      <text x="50" y={34 + d * 2} fill="#64748b" fontSize="9" textAnchor="end">
                        {d} cm
                      </text>
                    </g>
                  ))}

                  {/* Snølagene som klikkbare rektangler */}
                  {/* Lag 1: Nysnø 0–20 cm (y: 30 til 70) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedLayer("new_snow")}
                  >
                    <rect
                      x="70"
                      y="30"
                      width="260"
                      height="40"
                      fill="#0369a1"
                      opacity={selectedLayer === "new_snow" ? 0.9 : 0.6}
                      stroke={selectedLayer === "new_snow" ? "#38bdf8" : "#0284c7"}
                      strokeWidth={selectedLayer === "new_snow" ? 2 : 1}
                    />
                    <text x="80" y="55" fill="#f0f9ff" fontSize="11" fontWeight="600">
                      1. Nysnø (0–20 cm) · ✦ Dendritter · Hardhet: F (Neve)
                    </text>
                  </g>

                  {/* Lag 2: Vindpakket flak 20–55 cm (y: 70 til 140) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedLayer("wind_slab")}
                  >
                    <rect
                      x="70"
                      y="70"
                      width="260"
                      height="70"
                      fill="#334155"
                      opacity={selectedLayer === "wind_slab" ? 0.9 : 0.6}
                      stroke={selectedLayer === "wind_slab" ? "#94a3b8" : "#475569"}
                      strokeWidth={selectedLayer === "wind_slab" ? 2 : 1}
                    />
                    <text x="80" y="105" fill="#f1f5f9" fontSize="11" fontWeight="600">
                      2. Vindflak (20–55 cm) · • Finkornet · Hardhet: 1F (Én finger)
                    </text>
                    <text x="80" y="122" fill="#cbd5e1" fontSize="9">
                      Stiv plate som kan bære spenninger
                    </text>
                  </g>

                  {/* Lag 3: Svakt lag 55–65 cm (y: 140 til 160) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedLayer("weak_layer")}
                  >
                    <rect
                      x="70"
                      y="140"
                      width="260"
                      height="20"
                      fill="#991b1b"
                      opacity={selectedLayer === "weak_layer" ? 0.95 : 0.75}
                      stroke={selectedLayer === "weak_layer" ? "#f87171" : "#ef4444"}
                      strokeWidth={selectedLayer === "weak_layer" ? 2.5 : 1.5}
                    />
                    <text x="80" y="154" fill="#fee2e2" fontSize="10" fontWeight="bold">
                      ⚠️ 3. SVAKT LAG (55–65 cm) · ⬡ Begersnø / Dybderim · Hardhet: 4F
                    </text>
                  </g>

                  {/* Lag 4: Gammel såle 65–120 cm (y: 160 til 270) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedLayer("old_base")}
                  >
                    <rect
                      x="70"
                      y="160"
                      width="260"
                      height="110"
                      fill="#1e293b"
                      opacity={selectedLayer === "old_base" ? 0.9 : 0.6}
                      stroke={selectedLayer === "old_base" ? "#cbd5e1" : "#334155"}
                      strokeWidth={selectedLayer === "old_base" ? 2 : 1}
                    />
                    <text x="80" y="215" fill="#e2e8f0" fontSize="11" fontWeight="600">
                      4. Gammel vintersåle (65–120 cm) · ○ Avrundede korn · Hardhet: K (Kniv)
                    </text>
                  </g>

                  {/* Hardhetsprofil trappetrinn (Håndhardhetsskala: F, 4F, 1F, P, K) */}
                  {/* x-posisjoner for hardhet: F=360, 4F=400, 1F=450, P=500, K=560 */}
                  <text x="460" y="22" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Håndhardhet (F → 4F → 1F → P → K)
                  </text>
                  <line x1="360" y1="28" x2="570" y2="28" stroke="#334155" />

                  {/* Hardhetskurve */}
                  <path
                    d="M 360 30 L 360 70 L 450 70 L 450 140 L 400 140 L 400 160 L 560 160 L 560 270"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />
                  {/* Bakgrunnsfyll for hardhet */}
                  <path
                    d="M 340 30 L 360 30 L 360 70 L 450 70 L 450 140 L 400 140 L 400 160 L 560 160 L 560 270 L 340 270 Z"
                    fill="#10b981"
                    opacity="0.1"
                  />

                  {/* Temperaturkurve T(z) i rødt/blått fra overflaten til bakken (0 °C) */}
                  {/* x=340 er T=0°C, x=100 er T=-25°C */}
                  {(() => {
                    // x posisjon = 340 + (temp / 25) * 200 (når temp=-25, x=140. når temp=0, x=340)
                    const xSurface = 340 + (surfaceTemp / 25) * 200;
                    return (
                      <g>
                        <line
                          x1={xSurface}
                          y1="30"
                          x2="340"
                          y2="270"
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                        <circle cx={xSurface} cy="30" r="4" fill="#38bdf8" />
                        <circle cx="340" cy="270" r="4" fill="#f87171" />
                        <text x={xSurface - 8} y="22" fill="#38bdf8" fontSize="9" textAnchor="end">
                          {surfaceTemp} °C
                        </text>
                        <text x="348" y="275" fill="#f87171" fontSize="9">
                          0 °C (Jordvarme)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </ModelPanel>

            {/* Detaljkort for valgt lag */}
            <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="text-lg">{active.grainSymbol}</span>
                  <span>{active.name}</span>
                </span>
                <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-primary">
                  {active.depthRange}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Kornform:</span>
                  <strong className="text-foreground">{active.grainType}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Kornstørrelse:</span>
                  <strong className="text-foreground">{active.grainSize}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Hardhetstest:</span>
                  <strong className="text-foreground">{active.hardnessName}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Metamorfose:</span>
                  <strong className="text-foreground">
                    {active.id === "weak_layer" ? "Kinetisk (Begersnø)" : "Likevekt (Avrunding)"}
                  </strong>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModelFrame>
  );
}
