import { useState } from "react";
import { TableScroll } from "@/components/scroll-frame";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelPanel, ModelTab, ModelNote } from "./model-chrome";

export function FieldworkObservationModel() {
  type StationKey = "strike_dip" | "sediment" | "hydrology" | "hms_risk";
  const [activeStation, setActiveStation] = useState<StationKey>("strike_dip");

  // Stasjon 1: Strøk og fall
  const [strikeAngle, setStrikeAngle] = useState<number>(45); // 0 til 360 grader
  const [dipAngle, setDipAngle] = useState<number>(32); // 0 til 90 grader

  // Stasjon 2: Sediment
  const [grainScale, setGrainScale] = useState<"clay" | "silt" | "sand" | "gravel" | "boulder">("sand");
  const [sorting, setSorting] = useState<"poor" | "moderate" | "well">("well");
  const [rounding, setRounding] = useState<"angular" | "subrounded" | "rounded">("rounded");

  // Stasjon 3: Hydrologi
  const [riverWidth, setRiverWidth] = useState<number>(12); // meter
  const [meanDepth, setMeanDepth] = useState<number>(0.85); // meter
  const [meanVelocity, setMeanVelocity] = useState<number>(1.2); // m/s
  const dischargeM3s = (riverWidth * meanDepth * meanVelocity).toFixed(2);

  // Stasjon 4: HMS-risikomatrise
  const [probScore, setProbScore] = useState<number>(3); // 1 til 5
  const [consScore, setConsScore] = useState<number>(4); // 1 til 5
  const riskIndex = probScore * consScore;

  const riskLabel =
    riskIndex >= 15 ? { text: "Uakseptabel risiko (Rød) - Feltstopp inntil tiltak!", color: "text-rose-400" }
    : riskIndex >= 8 ? { text: "Moderat risiko (Gul) - Krever skjerpede sikkerhetstiltak", color: "text-amber-400" }
    : { text: "Lav risiko (Grønn) - Kan gjennomføres med standard rutiner", color: "text-emerald-400" };

  return (
    <ModelFrame
      kicker="Interaktiv vitenskapelig feltmetodikk"
      title="Georeferert feltlogg og observasjonskjede"
      lead="Feltarbeid er ikke en tilfeldig skoletur – det er en streng vitenskapelig datainnsamlingsprosess. Utforsk de fire klassiske feltstasjonene: måling av bergartens romlige orientering med geologkompass, sedimentologisk kornanalyse, hydrologisk vannføring og faglig HMS-risikovurdering."
      toolbar={
        <>
          <ModelTab active={activeStation === "strike_dip"} onClick={() => setActiveStation("strike_dip")}>
            Stasjon 1: Strøk og fall
          </ModelTab>
          <ModelTab active={activeStation === "sediment"} onClick={() => setActiveStation("sediment")}>
            Stasjon 2: Sedimentlogg
          </ModelTab>
          <ModelTab active={activeStation === "hydrology"} onClick={() => setActiveStation("hydrology")}>
            Stasjon 3: Hydrologisk måling
          </ModelTab>
          <ModelTab active={activeStation === "hms_risk"} onClick={() => setActiveStation("hms_risk")}>
            Stasjon 4: HMS-risikomatrise
          </ModelTab>
        </>
      }
    >
      {activeStation === "strike_dip" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                  Punkt-ID: GEO-01 (UTM 32V 598210, 6645320, 142 moh.)
                </span>
              </div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Måling av skråstilte lagflater med geologkompass
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Når lagdelte bergarter foldes eller tippes av platetektoniske krefter, beskrives deres romlige orientering
                av to vinkler: <strong>Strøk (strike)</strong> – kompassretningen til en tenkt vannrett linje på lagflaten, og
                <strong> Fall (dip)</strong> – den bratteste helningsvinkelen i grader ned fra horisontalplanet.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Strøkretning (Strike, 0–360°):</span>
                    <span className="font-mono text-amber-400 font-bold">{strikeAngle}° NØ</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={5}
                    value={strikeAngle}
                    onChange={(e) => setStrikeAngle(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Strøkretning"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Fallvinkel (Dip, 0–90°):</span>
                    <span className="font-mono text-teal-400 font-bold">{dipAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={90}
                    step={1}
                    value={dipAngle}
                    onChange={(e) => setDipAngle(Number(e.target.value))}
                    className="w-full accent-teal-500"
                    aria-label="Fallvinkel"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0° (Helt vannrett)</span>
                    <span>45° (Skråstilt)</span>
                    <span>90° (Loddrett)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 text-xs space-y-1">
                <span className="font-semibold text-foreground">Standard notasjon i feltboka:</span>
                <p className="font-mono text-sm text-primary font-bold">
                  {String(strikeAngle).padStart(3, "0")}° / {dipAngle}° SØ
                </p>
                <p className="text-[11px] text-muted-foreground pt-1">
                  <strong>Høyrehåndsregelen:</strong> Hvis du ser i strøkretningen ({strikeAngle}°), faller lagene
                  alltid 90° til høyre for siktelinjen ({dipAngle}° mot sørøst).
                </p>
              </div>
            </div>

            {/* 3D-blokkdiagram med strøk og fall */}
            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
              <svg viewBox="0 0 520 300" className="w-full h-auto select-none" aria-label="Strøk og fall 3D blokk">
                {/* 3D Isometrisk terrengblokk */}
                {/* Toppflate */}
                <polygon points="120,40 420,40 480,100 180,100" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                {/* Frontflate */}
                <polygon points="180,100 480,100 480,240 180,240" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                {/* Venstre sideflate */}
                <polygon points="120,40 180,100 180,240 120,180" fill="#1e2433" stroke="#475569" strokeWidth="1.5" />

                {/* Det skråstilte bergartslaget */}
                <polygon
                  points="150,70 380,70 420,160 190,160"
                  fill="#0ea5e9"
                  opacity="0.6"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />

                {/* Strøk-linje (Vannrett linje på lagflaten) */}
                <line x1="160" y1="70" x2="370" y2="70" stroke="#f59e0b" strokeWidth="3" />
                <circle cx="160" cy="70" r="4" fill="#f59e0b" />
                <circle cx="370" cy="70" r="4" fill="#f59e0b" />
                <text x="265" y="60" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  Strøklinje (Vannrett: {strikeAngle}°)
                </text>

                {/* Fall-linje (Bratteste vinkel vinkelrett på strøk) */}
                <line x1="265" y1="70" x2="295" y2="160" stroke="#ef4444" strokeWidth="3" />
                <polygon points="295,160 288,150 298,152" fill="#ef4444" />
                <text x="310" y="125" fill="#f87171" fontSize="11" fontWeight="bold">
                  Fallvinkel ({dipAngle}°)
                </text>

                {/* Karteringssymbol for strøk og fall */}
                <g transform="translate(80, 180)">
                  <rect x="0" y="0" width="80" height="80" rx="8" fill="#1e293b" stroke="#334155" />
                  <text x="40" y="20" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Kartsymbol</text>
                  {/* T-symbol */}
                  <line x1="15" y1="45" x2="65" y2="45" stroke="#f59e0b" strokeWidth="3" />
                  <line x1="40" y1="45" x2="40" y2="65" stroke="#ef4444" strokeWidth="3" />
                  <text x="52" y="62" fill="#ffffff" fontSize="10" fontWeight="bold">{dipAngle}°</text>
                </g>

                <text x="250" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="11">
                  Bergart i blotning: Kambrosilursk kalkstein med fossiler av brachiopoder
                </text>
              </svg>
            </div>
          </ModelPanel>
        </div>
      )}

      {activeStation === "sediment" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-teal-500/20 px-2 py-0.5 text-xs font-semibold text-teal-300">
                  Punkt-ID: GEO-02 (Glasifluvialt breelvdelta, 180 moh.)
                </span>
              </div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Kornfordelingsanalyse (Wentworth-skalaen)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sedimenters kornstørrelse, sortering og rundingsgrad gir direkte fingeravtrykk på hvilket transportmedium
                som avsatte dem (isbre, breelv, vind eller stillestående innsjøvann).
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <span className="font-medium">Kornstørrelse (Wentworth):</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(["clay", "silt", "sand", "gravel", "boulder"] as const).map((g) => (
                      <Button
                        key={g}
                        size="sm"
                        variant={grainScale === g ? "default" : "secondary"}
                        className="text-xs h-7 px-2"
                        onClick={() => setGrainScale(g)}
                      >
                        {g === "clay" ? "Leire (<0.002mm)"
                          : g === "silt" ? "Silt (0.002–0.063mm)"
                          : g === "sand" ? "Sand (0.063–2mm)"
                          : g === "gravel" ? "Grus (2–64mm)"
                          : "Blokk (>256mm)"}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-medium">Sorteringsgrad:</span>
                  <div className="mt-1 grid grid-cols-3 gap-1">
                    <Button
                      size="sm"
                      variant={sorting === "poor" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setSorting("poor")}
                    >
                      Dårlig sortert
                    </Button>
                    <Button
                      size="sm"
                      variant={sorting === "moderate" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setSorting("moderate")}
                    >
                      Moderat
                    </Button>
                    <Button
                      size="sm"
                      variant={sorting === "well" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setSorting("well")}
                    >
                      Godt sortert
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="font-medium">Rundingsgrad:</span>
                  <div className="mt-1 grid grid-cols-3 gap-1">
                    <Button
                      size="sm"
                      variant={rounding === "angular" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setRounding("angular")}
                    >
                      Kantet
                    </Button>
                    <Button
                      size="sm"
                      variant={rounding === "subrounded" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setRounding("subrounded")}
                    >
                      Kantslipes
                    </Button>
                    <Button
                      size="sm"
                      variant={rounding === "rounded" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setRounding("rounded")}
                    >
                      Godt rundet
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 text-xs space-y-1">
                <span className="font-semibold text-foreground">Sedimentologisk tolkning:</span>
                {sorting === "poor" && rounding === "angular" ? (
                  <p className="text-amber-400 font-medium">
                    Bunnmorene avsatt direkte av isbre (till). Isbreer sorterer ikke materiale etter kornstørrelse og knuser steinene med skarpe kanter.
                  </p>
                ) : sorting === "well" && rounding === "rounded" ? (
                  <p className="text-emerald-400 font-medium">
                    Glasifluvialt delta eller elveavsetning. Rennende vann har slipt kantene runde og sortert bort finstoffet.
                  </p>
                ) : (
                  <p className="text-sky-400 font-medium">
                    Glasilakustrint eller strandavsetning under omarbeiding av bølger og strømmer.
                  </p>
                )}
              </div>
            </div>

            {/* Mikroskopi / siktevisning */}
            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
              <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Sedimentkorn visning">
                <rect x="20" y="20" width="480" height="240" rx="8" fill="#18181b" stroke="#3f3f46" />
                <text x="35" y="45" fill="#a1a1aa" fontSize="11" fontWeight="bold">LUPESYSTEM (Feltforstørrelse 20×)</text>

                {/* Kornvisualisering basert på valg */}
                {sorting === "poor" ? (
                  <g>
                    {/* Blanding av kjempeblokker og bittesmå korn */}
                    <polygon points="120,120 180,90 220,150 160,200 90,160" fill="#71717a" stroke="#d4d4d8" />
                    <polygon points="320,160 380,130 410,180 350,210" fill="#a1a1aa" stroke="#d4d4d8" />
                    <circle cx="260" cy="90" r="14" fill="#d4d4d8" />
                    <circle cx="280" cy="190" r="4" fill="#e4e4e7" />
                    <circle cx="230" cy="170" r="3" fill="#e4e4e7" />
                    <circle cx="310" cy="110" r="2" fill="#e4e4e7" />
                    <text x="260" y="240" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">
                      Usortert matriks (Morenejord / Till)
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Ensartet sortert sand eller grus */}
                    {Array.from({ length: 32 }).map((_, i) => {
                      const cx = 80 + (i % 8) * 45 + ((i * 17) % 15);
                      const cy = 90 + Math.floor(i / 8) * 35 + ((i * 11) % 12);
                      const r = grainScale === "sand" ? 6 : grainScale === "gravel" ? 14 : grainScale === "clay" ? 2 : 22;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill="#f59e0b"
                          stroke="#fbbf24"
                          strokeWidth="1"
                          opacity="0.85"
                        />
                      );
                    })}
                    <text x="260" y="240" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                      Godt sortert sediment ({grainScale}) – Transport i rennende vann
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </ModelPanel>
        </div>
      )}

      {activeStation === "hydrology" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-sky-500/20 px-2 py-0.5 text-xs font-semibold text-sky-300">
                  Punkt-ID: GEO-03 (Elvetverrsnitt ved målestasjon, 115 moh.)
                </span>
              </div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Hydrologisk vannføringsmåling (Q = A · v)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Vannføring $Q$ er volum vann som passerer et tverrsnitt per sekund (m³/s). I felt måles dette med
                <strong> hastighets-areal-metoden</strong>: Elveprofilen deles inn i vertikaler der bredde, dybde og strømhastighet
                registreres med en vingemåler (Ott-flygel) nedsenket til 0,6 av dypet.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Elvebredde (B):</span>
                    <span className="font-mono text-sky-400 font-bold">{riverWidth} meter</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={25}
                    step={1}
                    value={riverWidth}
                    onChange={(e) => setRiverWidth(Number(e.target.value))}
                    className="w-full accent-sky-500"
                    aria-label="Elvebredde"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Middeldybde (d):</span>
                    <span className="font-mono text-teal-400 font-bold">{meanDepth} meter</span>
                  </div>
                  <input
                    type="range"
                    min={0.3}
                    max={2.5}
                    step={0.05}
                    value={meanDepth}
                    onChange={(e) => setMeanDepth(Number(e.target.value))}
                    className="w-full accent-teal-500"
                    aria-label="Middeldybde"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Strømhastighet (v på 0.6d):</span>
                    <span className="font-mono text-amber-400 font-bold">{meanVelocity} m/s</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={3.5}
                    step={0.1}
                    value={meanVelocity}
                    onChange={(e) => setMeanVelocity(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Strømhastighet"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 text-xs space-y-1">
                <span className="font-semibold text-foreground">Beregnet vannføring:</span>
                <p className="font-mono text-xl text-primary font-bold">{dischargeM3s} m³/s</p>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Kontinuitetslikningen: $Q = B \cdot d \cdot v = A \cdot v$.
                  Tilsvarer <strong>{(parseFloat(dischargeM3s) * 1000).toLocaleString("no-NO")} liter i sekundet</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
              <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Elvetverrsnitt profil">
                {/* Terreng og elveleie */}
                <polygon points="20,100 80,100 120,220 400,220 440,100 500,100 500,260 20,260" fill="#1e293b" />
                {/* Vannflate */}
                <polygon points="80,110 440,110 400,220 120,220" fill="#0284c7" opacity="0.65" />

                <line x1="80" y1="110" x2="440" y2="110" stroke="#38bdf8" strokeWidth="2" />
                <text x="260" y="100" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Vannspeil (Bredde B = {riverWidth} m)
                </text>

                {/* Vingemåler stav */}
                <line x1="260" y1="60" x2="260" y2="180" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="260" cy="176" r="6" fill="#f59e0b" />
                <text x="275" y="165" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  Ott-flygel på 0.6·d (v = {meanVelocity} m/s)
                </text>

                {/* Dybdepil */}
                <line x1="190" y1="110" x2="190" y2="220" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="180" y="170" textAnchor="end" fill="#ffffff" fontSize="10">
                  d = {meanDepth} m
                </text>

                <text x="260" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11">
                  Målefeilkilder i felt: Bunnruhet, strømturbulens, skråstilte strømlinjebestemmelser
                </text>
              </svg>
            </div>
          </ModelPanel>
        </div>
      )}

      {activeStation === "hms_risk" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
                  Punkt-ID: GEO-04 (Leirskråning under marin grense, 45 moh.)
                </span>
              </div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Faglig HMS-risikovurdering (Sannsynlighet × Konsekvens)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                HMS i geofaglig feltarbeid er et faglig kjerneelement, ikke et administrativt vedlegg.
                Før en studentgruppe setter foten i en bratt fjellskjæring eller et kvikkleireutsatt vassdrag,
                må det gjennomføres en risikovurdering med identifiserte fysiske barrierer.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Sannsynlighet for hendelse (P, 1–5):</span>
                    <span className="font-mono text-amber-400 font-bold">{probScore} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={probScore}
                    onChange={(e) => setProbScore(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Sannsynlighet"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>1 (Svært usannsynlig)</span>
                    <span>3 (Mulig)</span>
                    <span>5 (Nesten sikkert)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Konsekvens / Alvorlighetsgrad (C, 1–5):</span>
                    <span className="font-mono text-rose-400 font-bold">{consScore} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={consScore}
                    onChange={(e) => setConsScore(Number(e.target.value))}
                    className="w-full accent-rose-500"
                    aria-label="Konsekvens"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>1 (Ubetydelig skrubbsår)</span>
                    <span>3 (Medisinsk behandling)</span>
                    <span>5 (Fatalt / Livsfare)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 text-xs space-y-1">
                <span className="font-semibold text-foreground">Beregnet risikoverdi (R = P · C):</span>
                <p className="font-mono text-xl font-bold">{riskIndex} / 25</p>
                <p className={`font-semibold ${riskLabel.color}`}>{riskLabel.text}</p>
              </div>
            </div>

            {/* 5x5 Risikomatrise SVG */}
            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
              <svg viewBox="0 0 420 320" className="w-full h-auto select-none" aria-label="Risikomatrise 5x5">
                <text x="210" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                  RISIKOMATRISE (P × C)
                </text>

                {/* Aksebetegnelser */}
                <text x="20" y="170" textAnchor="middle" fill="#94a3b8" fontSize="11" transform="rotate(-90 20 170)">
                  Sannsynlighet (P) ↑
                </text>
                <text x="230" y="305" textAnchor="middle" fill="#94a3b8" fontSize="11">
                  Konsekvens (C) →
                </text>

                {/* 5x5 Ruter */}
                {[1, 2, 3, 4, 5].map((pVal) => {
                  return [1, 2, 3, 4, 5].map((cVal) => {
                    const r = pVal * cVal;
                    const fill = r >= 15 ? "#7f1d1d" : r >= 8 ? "#78350f" : "#064e3b";
                    const isSelected = pVal === probScore && cVal === consScore;
                    const x = 50 + (cVal - 1) * 65;
                    const y = 40 + (5 - pVal) * 45;

                    return (
                      <g key={`${pVal}-${cVal}`}>
                        <rect
                          x={x}
                          y={y}
                          width={60}
                          height={40}
                          rx={4}
                          fill={fill}
                          stroke={isSelected ? "#ffffff" : "#1e293b"}
                          strokeWidth={isSelected ? 3 : 1}
                        />
                        <text x={x + 30} y={y + 24} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {r}
                        </text>
                      </g>
                    );
                  });
                })}
              </svg>

              <div className="mt-2 text-xs text-muted-foreground">
                <strong>Nødvendige HMS-barrierer for denne stasjonen:</strong> Hjelm mot steinsprang ved fjellskjæring,
                redningsvest ved elv med stri strøm, sjekk av NVEs aktsomhetskart for kvikkleire og mobildekning.
              </div>
            </div>
          </ModelPanel>
        </div>
      )}

      {/* Oppsummerende vitenskapelig feltboktabell */}
      <div className="mt-6 rounded-xl border border-border/70 bg-card p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
          Generert digital feltlogg (Utdrag til feltrapporten)
        </h4>
        <TableScroll
          caption="Generert digital feltlogg (Utdrag til feltrapporten)"
          visuallyHiddenCaption
          className="mt-3"
          tableClassName="w-full text-left text-xs"
          fade="var(--color-card)"
        >
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-2 font-semibold">Stasjon</th>
                <th className="pb-2 font-semibold">Georeferanse (UTM 32V)</th>
                <th className="pb-2 font-semibold">Måleparameter</th>
                <th className="pb-2 font-semibold">Registrert verdi</th>
                <th className="pb-2 font-semibold">Geofaglig tolkning</th>
                <th className="pb-2 font-semibold">HMS-status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground/90 font-mono">
              <tr>
                <td className="py-2 font-bold text-amber-400">GEO-01</td>
                <td className="py-2">E: 598210, N: 6645320, 142 moh</td>
                <td className="py-2">Strøk & fall</td>
                <td className="py-2 text-primary">{String(strikeAngle).padStart(3, "0")}° / {dipAngle}° SØ</td>
                <td className="py-2 font-sans text-xs">Foldet kambrosilursk kalkstein</td>
                <td className="py-2 text-emerald-400 font-sans text-xs">Sikret (hjelmpåbud)</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-teal-400">GEO-02</td>
                <td className="py-2">E: 598850, N: 6646110, 180 moh</td>
                <td className="py-2">Sedimentlogg</td>
                <td className="py-2">{grainScale}, {sorting}, {rounding}</td>
                <td className="py-2 font-sans text-xs">Glasifluvialt delta (fluvialt omarbeidet)</td>
                <td className="py-2 text-emerald-400 font-sans text-xs">Sikker avstand til skjæring</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-sky-400">GEO-03</td>
                <td className="py-2">E: 599200, N: 6646700, 115 moh</td>
                <td className="py-2">Vannføring Q</td>
                <td className="py-2 text-primary">{dischargeM3s} m³/s</td>
                <td className="py-2 font-sans text-xs">Normal sommervannføring i dalføret</td>
                <td className="py-2 text-emerald-400 font-sans text-xs">Vadeline og redningsvest</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-rose-400">GEO-04</td>
                <td className="py-2">E: 600150, N: 6647890, 45 moh</td>
                <td className="py-2">Skråningsstabilitet</td>
                <td className="py-2">Risikotall: {riskIndex}</td>
                <td className="py-2 font-sans text-xs">Marin leire under marin grense (ravine)</td>
                <td className={`py-2 font-sans text-xs font-semibold ${riskLabel.color}`}>
                  {riskIndex >= 15 ? "Stopp-regel aktivert" : "Sikret"}
                </td>
              </tr>
            </tbody>
        </TableScroll>
      </div>
    </ModelFrame>
  );
}
