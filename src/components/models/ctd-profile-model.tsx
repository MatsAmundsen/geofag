import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Compass, Droplets, Waves, Thermometer, Anchor, Sun, Snowflake } from "lucide-react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

type Season = "summer" | "winter";

export function CtdProfileModel() {
  const [depth, setDepth] = useState<number>(35); // Nåværende sondedybde i meter (0–200 m)
  const [season, setSeason] = useState<Season>("summer");

  // Beregning av salinitet, temperatur og tetthet som funksjon av dyp og sesong
  // Dypvann under 100 m er stabilt atlantisk vann: S ≈ 34.8 ‰, T ≈ 7.5 °C
  const isSummer = season === "summer";

  let salinity = 0;
  let temp = 0;

  if (isSummer) {
    if (depth <= 10) {
      // Brakkvannslinse i overflaten pga. vårflom og elver
      salinity = 16.0 + (depth / 10) * 8.0; // 16 til 24 ‰
      temp = 16.0 - (depth / 10) * 3.0; // 16 til 13 °C
    } else if (depth <= 60) {
      // Skarp haloklin og termoklin
      const t = (depth - 10) / 50;
      salinity = 24.0 + t * 10.0; // 24 til 34 ‰
      temp = 13.0 - t * 6.5; // 13 til 6.5 °C
    } else {
      // Dypvann
      const t = Math.min(1, (depth - 60) / 140);
      salinity = 34.0 + t * 0.9; // 34.0 til 34.9 ‰
      temp = 6.5 + t * 1.2; // 6.5 til 7.7 °C
    }
  } else {
    // Vinter: Avkjølt overflate, lite elveutslipp
    if (depth <= 50) {
      // Dypt, godt blandet overflatelag
      salinity = 30.5 + (depth / 50) * 2.5; // 30.5 til 33 ‰
      temp = 3.5 + (depth / 50) * 2.0; // Kaldere i overflaten! (3.5 til 5.5 °C)
    } else {
      const t = Math.min(1, (depth - 50) / 150);
      salinity = 33.0 + t * 1.8; // 33.0 til 34.8 ‰
      temp = 5.5 + t * 2.1; // 5.5 til 7.6 °C
    }
  }

  // Hydrostatisk trykk: ca. 1 dbar per meter dyp (P ≈ 10 kPa per meter)
  const pressureDbar = depth * 1.01;

  // Forenklet beregning av tetthet sigma-t (kg/m³ - 1000)
  // Tetthet øker med salinitet (~0.8 per ‰) og avtar med temperatur (~-0.2 per °C)
  const sigmaT = Math.round((salinity * 0.78 - (temp - 4) * 0.18 + 0.5) * 10) / 10;
  const densityKgM3 = 1000 + sigmaT;

  // Klassifisering av sjikt
  let layerName = "";
  let layerDesc = "";
  if (depth <= 12 && isSummer) {
    layerName = "Brakkvannslinse (Overflatesjikt)";
    layerDesc = "Lav saltholdighet på grunn av snøsmelting og elvetilførsel fra innlandet.";
  } else if (depth > 12 && depth <= 60 && isSummer) {
    layerName = "Sprangsjikt (Termoklin, Haloklin & Pyknoklin)";
    layerDesc = "Dramatisk økning i saltholdighet og tetthet samt temperaturfall over få meter.";
  } else if (depth <= 50 && !isSummer) {
    layerName = "Vinterblandet grensesjikt";
    layerDesc = "Konvektiv vinteravkjøling og vindblanding har homogenisert det øvre laget.";
  } else {
    layerName = "Atlantisk dypvann";
    layerDesc = "Tungt, stabilt og næringsrikt dypvann med høy saltholdighet (~34,8–35,0 ‰).";
  }

  return (
    <ModelFrame
      kicker="Interaktiv oseanografisk sonde"
      title="CTD-profilutforsker: Fjordens vertikale lagdeling"
      lead="CTD (Conductivity, Temperature, Depth) er oseanografens viktigste instrument. Dra dybdesonden ned gjennom fjordens vannsøyle for å se hvordan ferskvannstilførsel og årstider skaper skarpe halokliner, termokliner og pyknokliner."
      toolbar={
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={isSummer ? "default" : "secondary"}
            onClick={() => setSeason("summer")}
            className="gap-1.5 text-xs"
          >
            <Sun className="size-3.5 text-amber-400" />
            Sommer (Ferskvannslinse)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={!isSummer ? "default" : "secondary"}
            onClick={() => setSeason("winter")}
            className="gap-1.5 text-xs"
          >
            <Snowflake className="size-3.5 text-sky-300" />
            Vinter (Avkjølt blandelag)
          </Button>
        </div>
      }
    >
      <div>
        <ModelMarkers />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Venstre panel: Dybdekontroll og sanntidsdata */}
          <ModelPanel className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Anchor className="size-4 text-primary" />
              <span>Sondeposisjon og telemetri</span>
            </h4>

            {/* Dybdeslider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Sondens dybde i vannsøylen:</span>
                <strong className="text-foreground text-sm font-mono text-primary">{depth} meter</strong>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="2"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>0 m (Overflate)</span>
                <span>50 m</span>
                <span>100 m</span>
                <span>150 m</span>
                <span>200 m (Bunn)</span>
              </div>
            </div>

            {/* Måleverdier kort */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Salinitet */}
              <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Droplets className="size-3 text-sky-400" />
                  Salinitet (S)
                </span>
                <span className="text-lg font-bold font-mono text-sky-300">
                  {salinity.toFixed(1)} ‰ (PSU)
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Elektrisk ledningsevne
                </span>
              </div>

              {/* Temperatur */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Thermometer className="size-3 text-amber-400" />
                  Temperatur (T)
                </span>
                <span className="text-lg font-bold font-mono text-amber-300">
                  {temp.toFixed(1)} °C
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Kalibrert termistor
                </span>
              </div>

              {/* Trykk */}
              <div className="rounded-xl border border-border bg-card/60 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Hydrostatisk trykk
                </span>
                <span className="text-base font-bold font-mono text-foreground">
                  {Math.round(pressureDbar)} dbar
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Piezoresistiv sensor
                </span>
              </div>

              {/* Beregnet tetthet */}
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Beregnet tetthet (ρ)
                </span>
                <span className="text-base font-bold font-mono text-primary">
                  {densityKgM3.toFixed(1)} kg/m³
                </span>
                <span className="text-[10px] text-primary/80 block">
                  σ_t = {sigmaT.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Aktivt sjikt boks */}
            <div className="rounded-xl border border-border bg-card/80 p-3 text-xs space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                Aktivt vannlag ved {depth} m:
              </span>
              <strong className="text-sm text-foreground block">{layerName}</strong>
              <p className="text-muted-foreground leading-relaxed">{layerDesc}</p>
            </div>
          </ModelPanel>

          {/* Høyre panel: Graf med vertikale profiler og CTD-sonde */}
          <div className="space-y-4 lg:col-span-7">
            <ModelPanel className="p-3">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-foreground">
                  CTD-profil: Salinitet (blå), Temperatur (rød) og Tetthet (lilla)
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  Sesong: <strong>{isSummer ? "Sommerflom" : "Vinteravkjøling"}</strong>
                </span>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-[#07131d] border border-border p-2">
                <svg
                  viewBox="0 0 600 320"
                  className="w-full h-auto select-none"
                  aria-label="CTD vertikalprofiler i vannsøylen"
                >
                  {/* Dybdeakse til venstre (0 til 200 m -> y: 30 til 290, 260px høy = 1.3px/m) */}
                  <line x1="50" y1="30" x2="50" y2="290" stroke="#334155" strokeWidth="1.5" />
                  {[0, 20, 50, 80, 100, 150, 200].map((d) => (
                    <g key={d}>
                      <line x1="45" y1={30 + d * 1.3} x2="50" y2={30 + d * 1.3} stroke="#475569" />
                      <text x="40" y={34 + d * 1.3} fill="#64748b" fontSize="9" textAnchor="end">
                        {d} m
                      </text>
                    </g>
                  ))}

                  {/* Horisontale parametere på toppen */}
                  <text x="120" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Salinitet (10–35 ‰)
                  </text>
                  <text x="280" y="20" fill="#f87171" fontSize="10" fontWeight="bold">
                    Temperatur (2–18 °C)
                  </text>
                  <text x="440" y="20" fill="#a78bfa" fontSize="10" fontWeight="bold">
                    Tetthet (1010–1028 kg/m³)
                  </text>

                  {/* Profiler i vannsøylen */}
                  {isSummer ? (
                    <>
                      {/* SOMMER:
                          Salinitet: 0m=16‰ (x=80), 10m=24‰ (x=130), 60m=34‰ (x=190), 200m=34.9‰ (x=195)
                          Temp: 0m=16°C (x=330), 10m=13°C (x=310), 60m=6.5°C (x=270), 200m=7.7°C (x=280)
                          Tetthet: 0m=1012 (x=410), 10m=1018 (x=450), 60m=1026 (x=520), 200m=1027.5 (x=530)
                      */}
                      {/* Salinitetskurve */}
                      <path
                        d="M 80 30 L 130 43 C 160 65, 185 85, 190 108 L 195 290"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Temperaturkurve */}
                      <path
                        d="M 330 30 L 310 43 C 290 65, 275 85, 270 108 L 280 290"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="2.5"
                      />

                      {/* Tetthetskurve (Pyknoklin) */}
                      <path
                        d="M 410 30 L 450 43 C 490 65, 515 85, 520 108 L 530 290"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="2.5"
                      />

                      {/* Sprangsjikt-markering (Haloklin / Pyknoklin) */}
                      <rect x="55" y="43" width="530" height="65" fill="#38bdf8" opacity="0.08" />
                      <text x="580" y="78" fill="#38bdf8" fontSize="9" textAnchor="end">
                        HALOKLIN &amp; PYKNOKLIN (10–60 m)
                      </text>
                    </>
                  ) : (
                    <>
                      {/* VINTER */}
                      {/* Salinitet: 0m=30.5‰ (x=170), 50m=33‰ (x=185), 200m=34.8‰ (x=195) */}
                      <path
                        d="M 170 30 L 185 95 L 195 290"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Temperatur: 0m=3.5°C (x=255), 50m=5.5°C (x=265), 200m=7.6°C (x=280) */}
                      <path
                        d="M 255 30 L 265 95 L 280 290"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="2.5"
                      />

                      {/* Tetthet */}
                      <path
                        d="M 495 30 L 515 95 L 530 290"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="2.5"
                      />

                      <rect x="55" y="30" width="530" height="65" fill="#0284c7" opacity="0.06" />
                      <text x="580" y="65" fill="#94a3b8" fontSize="9" textAnchor="end">
                        VINTERBLANDET SJIKT (0–50 m)
                      </text>
                    </>
                  )}

                  {/* Nåværende sondedybde - horisontal linje og sonde */}
                  {(() => {
                    const curY = 30 + depth * 1.3;
                    return (
                      <g>
                        <line x1="50" y1={curY} x2="580" y2={curY} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />

                        {/* Illustrert CTD-rosett sonde */}
                        <g transform={`translate(550, ${curY})`}>
                          <circle cx="0" cy="0" r="7" fill="#f59e0b" className="animate-pulse" />
                          <circle cx="0" cy="0" r="4" fill="#fff" />
                          {/* Kabel opp */}
                          <line x1="0" y1="-7" x2="0" y2={-curY + 30} stroke="#94a3b8" strokeWidth="1" />
                        </g>

                        {/* Dybdetall boble */}
                        <rect x="55" y={curY - 10} width="40" height="18" rx="3" fill="#1e293b" stroke="#f59e0b" />
                        <text x="75" y={curY + 2} fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                          {depth} m
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </ModelPanel>

            <ModelNote title="Hvordan CTD-sonden måler i praksis" tone="teal">
              <p>
                <strong>Ledningsevne (C):</strong> Rent ferskvann leder nesten ikke strøm. Sjøvann leder strøm
                fordi det inneholder oppløste salt-ioner (Na⁺, Cl⁻, Mg²⁺, SO₄²⁻). Ved å sende en vekselstrøm
                gjennom en induktiv eller konduktiv celle kan saliniteten beregnes med en nøyaktighet på
                tredje desimal (±0,001 PSU)!
              </p>
              <p>
                <strong>Dybde (D):</strong> Måles ikke med målebånd, men med en piezoresistiv trykksensor.
                Siden hydrostatisk trykk øker med ca. 1 desibar (dbar) per meter i vannsøylen (P = ρ · g · z),
                gir trykket den nøyaktige posisjonen.
              </p>
            </ModelNote>
          </div>
        </div>
      </div>
    </ModelFrame>
  );
}
