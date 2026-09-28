import { useState } from "react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

export function EkmanUpwellingModel() {
  const [tab, setTab] = useState<"ekman_spiral" | "upwelling" | "geostrophic">("ekman_spiral");

  // Tab 1 state: Ekman-spiral
  const [windSpeed, setWindSpeed] = useState<number>(12); // m/s
  const [latitude, setLatitude] = useState<number>(45); // degrees
  const [hemisphere, setHemisphere] = useState<"north" | "south">("north");

  // Tab 2 state: Coastal upwelling
  const [coastType, setCoastType] = useState<"west_coast" | "east_coast">("west_coast");
  const [windDirection, setWindDirection] = useState<"equatorward" | "poleward">("equatorward");

  // Calculations for Ekman-spiral
  const omega = 7.2921e-5; // rad/s
  const phiRad = (Math.max(10, Math.abs(latitude)) * Math.PI) / 180;
  const f = 2 * omega * Math.sin(phiRad) * (hemisphere === "north" ? 1 : -1);
  const absF = Math.abs(f);

  // Wind stress tau = rho_air * Cd * U^2
  const rhoAir = 1.225; // kg/m^3
  const cd = 0.0013;
  const tau = rhoAir * cd * Math.pow(windSpeed, 2); // N/m^2

  // Total Ekman transport magnitude Me = tau / |f| (kg/(m*s))
  const rhoWater = 1025; // kg/m^3
  const meMass = absF > 0 ? tau / absF : 0; // kg/(m*s)
  const qeVolume = meMass / rhoWater; // m^2/s

  // Ekman depth De ~ pi * sqrt(2 * Az / |f|), approx 30-70m
  const az = 0.015; // m^2/s eddy viscosity
  const de = Math.min(80, Math.max(25, Math.PI * Math.sqrt((2 * az) / absF)));

  // Surface speed v0 = tau / (rhoWater * sqrt(Az * |f|))
  const v0 = Math.min(1.2, tau / (rhoWater * Math.sqrt(az * absF)));

  // Spiral layers (0, 10, 20, 30, 40, 50, 60m)
  const depths = [0, 10, 20, 30, 45, 60];
  const spiralVectors = depths.map((z) => {
    const decay = Math.exp(-z / de);
    const angle = (z / de) * (hemisphere === "north" ? 1 : -1); // in radians
    const surfaceAngle = (45 * Math.PI) / 180 * (hemisphere === "north" ? 1 : -1);
    const totalAngle = surfaceAngle + angle;
    const speed = v0 * decay;
    return {
      z,
      decay,
      angleDeg: Math.round((totalAngle * 180) / Math.PI),
      speed: Number(speed.toFixed(3)),
      vx: speed * Math.cos(totalAngle),
      vy: speed * Math.sin(totalAngle),
    };
  });

  // Upwelling calculation
  // For North Hemisphere:
  // West coast + wind southward (equatorward) -> Ekman transport to the right (west, offshore) -> UPWELLING!
  // West coast + wind northward (poleward) -> Ekman transport to the right (east, onshore) -> DOWNWELLING!
  // East coast + wind southward -> Ekman transport to the right (west, onshore) -> DOWNWELLING!
  // East coast + wind northward -> Ekman transport to the right (east, offshore) -> UPWELLING!
  const isUpwelling =
    (coastType === "west_coast" && windDirection === "equatorward") ||
    (coastType === "east_coast" && windDirection === "poleward");

  return (
    <ModelFrame
      kicker="Interaktiv geofysisk modell"
      title="Ekman-spiral, kystoppvelling og geostrofisk balanse"
      lead="Utforsk hvordan vindstress, Corioliskraft og friksjon mellom vannlagene skaper 45° overflateavbøyning, 90° nettotransport, oppvelling av næringsrikt bunnvann og geostrofiske gyrer."
      toolbar={
        <div className="flex flex-wrap gap-2">
          <ModelTab active={tab === "ekman_spiral"} onClick={() => setTab("ekman_spiral")}>
            1. Ekman-spiral & nettotransport
          </ModelTab>
          <ModelTab active={tab === "upwelling"} onClick={() => setTab("upwelling")}>
            2. Kystoppvelling & nedvelling
          </ModelTab>
          <ModelTab active={tab === "geostrophic"} onClick={() => setTab("geostrophic")}>
            3. Geostrofisk strøm & gyredynamikk
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* ── FANE 1: EKMAN-SPIRAL ────────────────────────────────────── */}
      {tab === "ekman_spiral" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="wind-speed" className="text-muted-foreground">
                      Vindhastighet 10 m over havet (U₁₀):
                    </label>
                    <span className="font-mono font-bold text-primary">{windSpeed} m/s</span>
                  </div>
                  <input
                    id="wind-speed"
                    type="range"
                    min="2"
                    max="25"
                    step="1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Bris (2 m/s)</span>
                    <span>Stiv kuling (15 m/s)</span>
                    <span>Storm (25 m/s)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="latitude" className="text-muted-foreground">
                      Breddegrad (|φ|):
                    </label>
                    <span className="font-mono font-bold text-primary">{latitude}°</span>
                  </div>
                  <input
                    id="latitude"
                    type="range"
                    min="10"
                    max="80"
                    step="1"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Tropene (10°)</span>
                    <span>Norge (60°)</span>
                    <span>Arktis (80°)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">Halvkule:</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHemisphere("north")}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                        hemisphere === "north"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Nordlig (90° høyre)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHemisphere("south")}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                        hemisphere === "south"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Sørlig (90° venstre)
                    </button>
                  </div>
                </div>

                {/* Sanntidsberegninger */}
                <div className="rounded-xl border border-border/70 bg-card/60 p-3 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Coriolisparameter (f):</span>
                    <span className="font-mono font-semibold text-sky-400">
                      {(f * 1e4).toFixed(3)} × 10⁻⁴ s⁻¹
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Vindstress (τ):</span>
                    <span className="font-mono font-semibold text-amber-400">
                      {tau.toFixed(3)} N/m²
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Ekman-dyp (D_E):</span>
                    <span className="font-mono font-semibold text-teal-400">
                      {de.toFixed(1)} meter
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volumtransport (Q_E):</span>
                    <span className="font-mono font-semibold text-primary">
                      {qeVolume.toFixed(2)} m²/s
                    </span>
                  </div>
                </div>
              </ModelPanel>

              <ModelNote title="Hvordan spiralen oppstår" tone="teal">
                <p>
                  Vinden drar i overflatevannet. På grunn av Corioliskraften avbøyes det øverste
                  vannlaget <strong>45°</strong> i forhold til vinden (til høyre i nord, til venstre
                  i sør).
                </p>
                <p className="mt-1">
                  Dette overflatelaget drar i sin tur på laget under via indre væskefriksjon (virvelviskositet).
                  Det neste laget avbøyes enda mer, men med lavere hastighet. Nedover i dypet danner
                  strømvektorene en elegant <strong>spiral</strong>.
                </p>
                <p className="mt-1">
                  Når vi integrerer (summerer) alle vektorene fra overflaten ned til Ekman-dypet, står
                  den totale vanntransporten nøyaktig <strong>90°</strong> på vindretningen!
                </p>
              </ModelNote>
            </div>

            {/* Vektorvisualisering: Topp-perspektiv og 3D spiral */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Fugleperspektiv: Vektordiagram fra overflaten til dypet
                  </span>
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[11px] text-primary">
                    Vind retning: 0° (mot nord)
                  </span>
                </div>

                <svg viewBox="0 0 520 380" className="w-full">
                  {/* Bakgrunnsrutenett og kompass-sirkler */}
                  <defs>
                    <radialGradient id="ocean-radial" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#020617" />
                    </radialGradient>
                  </defs>
                  <rect width="520" height="380" fill="url(#ocean-radial)" rx="8" />

                  {/* Konsentriske sirkler */}
                  <circle cx="260" cy="200" r="40" fill="none" stroke="#334155" strokeDasharray="3 3" />
                  <circle cx="260" cy="200" r="90" fill="none" stroke="#334155" strokeDasharray="3 3" />
                  <circle cx="260" cy="200" r="140" fill="none" stroke="#334155" strokeDasharray="3 3" />

                  {/* Akser */}
                  <line x1="260" y1="40" x2="260" y2="360" stroke="#1e293b" strokeWidth="1.5" />
                  <line x1="100" y1="200" x2="420" y2="200" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="260" y="32" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">
                    NORD (Vindretning)
                  </text>
                  <text x="430" y="204" textAnchor="start" fill="#64748b" fontSize="11" fontWeight="bold">
                    ØST
                  </text>
                  <text x="90" y="204" textAnchor="end" fill="#64748b" fontSize="11" fontWeight="bold">
                    VEST
                  </text>

                  {/* 1. Vindvektor: Rett nordover (lengde proporsjonal med vindhastighet) */}
                  {(() => {
                    const windLen = Math.min(140, 40 + windSpeed * 4);
                    return (
                      <g>
                        <line
                          x1="260"
                          y1="200"
                          x2="260"
                          y2={200 - windLen}
                          stroke="#e2e8f0"
                          strokeWidth="3.5"
                          markerEnd="url(#mdl-wind)"
                        />
                        <text
                          x="270"
                          y={200 - windLen + 15}
                          fill="#f8fafc"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          Vind ({windSpeed} m/s)
                        </text>
                      </g>
                    );
                  })()}

                  {/* 2. Dybdevektorer for Ekman-spiral */}
                  {spiralVectors.map((layer, idx) => {
                    const scaleFactor = 150;
                    const endX = 260 + layer.vx * scaleFactor;
                    const endY = 200 - layer.vy * scaleFactor; // minus because SVG y goes down
                    const isSurface = layer.z === 0;

                    return (
                      <g key={layer.z}>
                        <line
                          x1="260"
                          y1="200"
                          x2={endX}
                          y2={endY}
                          stroke={isSurface ? "#38bdf8" : "#0284c7"}
                          strokeWidth={isSurface ? 3 : 1.8}
                          opacity={Math.max(0.4, layer.decay)}
                          markerEnd={isSurface ? "url(#mdl-cyan)" : "url(#mdl-blue)"}
                        />
                        <circle cx={endX} cy={endY} r="3" fill={isSurface ? "#38bdf8" : "#0284c7"} />
                        <text
                          x={endX + (layer.vx >= 0 ? 8 : -8)}
                          y={endY + (layer.vy >= 0 ? -4 : 8)}
                          textAnchor={layer.vx >= 0 ? "start" : "end"}
                          fill={isSurface ? "#38bdf8" : "#94a3b8"}
                          fontSize={isSurface ? "11" : "9"}
                          fontWeight={isSurface ? "bold" : "normal"}
                        >
                          {layer.z}m ({layer.angleDeg}°)
                        </text>
                      </g>
                    );
                  })}

                  {/* Kurve som binder spiral-spissene sammen */}
                  {(() => {
                    const points = spiralVectors.map((layer) => {
                      const scaleFactor = 150;
                      return `${260 + layer.vx * scaleFactor},${200 - layer.vy * scaleFactor}`;
                    });
                    return (
                      <polyline
                        points={points.join(" ")}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />
                    );
                  })()}

                  {/* 3. Nettotransport M_E: Nøyaktig 90° til høyre (NH) eller venstre (SH) */}
                  {(() => {
                    const netAngle = hemisphere === "north" ? 0 : Math.PI; // East is 0, West is PI
                    const transportLen = Math.min(130, 45 + qeVolume * 7);
                    const netX = 260 + (hemisphere === "north" ? transportLen : -transportLen);
                    return (
                      <g>
                        <line
                          x1="260"
                          y1="200"
                          x2={netX}
                          y2="200"
                          stroke="#fbbf24"
                          strokeWidth="5"
                          markerEnd="url(#mdl-amber)"
                        />
                        <text
                          x={netX + (hemisphere === "north" ? 10 : -10)}
                          y="190"
                          textAnchor={hemisphere === "north" ? "start" : "end"}
                          fill="#fbbf24"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          Netto Ekman-transport
                        </text>
                        <text
                          x={netX + (hemisphere === "north" ? 10 : -10)}
                          y="208"
                          textAnchor={hemisphere === "north" ? "start" : "end"}
                          fill="#fef08a"
                          fontSize="11"
                        >
                          {hemisphere === "north" ? "90° til høyre" : "90° til venstre"} ({qeVolume.toFixed(1)} m²/s)
                        </text>
                      </g>
                    );
                  })()}
                </svg>

                {/* Tegnforklaring */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-5 rounded bg-slate-300" />
                    <span className="text-slate-300">Vindretning (0°)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-5 rounded bg-sky-400" />
                    <span className="text-sky-300">Overflatestrøm (45° avbøyd)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-5 rounded bg-amber-400" />
                    <span className="text-amber-300">Netto vanntransport (90°)</span>
                  </div>
                </div>
              </div>

              {/* Formel-boks */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-2">
                <div className="font-semibold text-primary">Matematisk formulering:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                  <div className="rounded bg-background/80 p-2.5 border border-border">
                    <p className="text-muted-foreground text-[10px]">Vindskjærspenning på overflaten:</p>
                    <p className="text-amber-400 font-bold mt-0.5">τ = ρ_luft · C_D · (U₁₀)²</p>
                  </div>
                  <div className="rounded bg-background/80 p-2.5 border border-border">
                    <p className="text-muted-foreground text-[10px]">Integrert Ekman-transport:</p>
                    <p className="text-primary font-bold mt-0.5">M_E = τ / |f| = τ / (2Ω sin φ)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FANE 2: KYSTOPPVELLING & NEDVELLING ─────────────────────── */}
      {tab === "upwelling" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Kystens orientering:</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCoastType("west_coast")}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition ${
                        coastType === "west_coast"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-bold">Vestkyst</span>
                      <span className="text-[10px] text-muted-foreground">Land til høyre, hav til venstre (California, Peru)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoastType("east_coast")}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition ${
                        coastType === "east_coast"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-bold">Østkyst</span>
                      <span className="text-[10px] text-muted-foreground">Land til venstre, hav til høyre (Norge vestvendt kyst)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">Vindretning langs kysten:</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWindDirection("equatorward")}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition ${
                        windDirection === "equatorward"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-bold">Mot ekvator (sørover)</span>
                      <span className="text-[10px] text-muted-foreground">Kald nordavind langs norskekysten/California</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindDirection("poleward")}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition ${
                        windDirection === "poleward"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-bold">Mot polen (nordover)</span>
                      <span className="text-[10px] text-muted-foreground">Mild sønnavind langs norskekysten</span>
                    </button>
                  </div>
                </div>

                {/* Status-oppsummering */}
                <div
                  className={`rounded-xl border p-4 ${
                    isUpwelling
                      ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                      : "border-amber-500/30 bg-amber-950/20 text-amber-300"
                  }`}
                >
                  <p className="font-display font-semibold text-sm">
                    {isUpwelling ? "🌊 Aktiv Kystoppvelling (Upwelling)" : "⬇️ Kystnedvelling (Downwelling)"}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {isUpwelling
                      ? "Ekman-transporten skyver overflatevannet rett bort fra kysten. For å opprettholde massekonservering tvinges iskaldt, næringsrikt dypvann opp fra 100–300 meters dyp."
                      : "Ekman-transporten skyver overflatevannet inn mot land. Vannet stuves opp mot kystlinjen og tvinges ned i dypet. Termoklinen presses dypere."}
                  </p>
                </div>
              </ModelPanel>

              <ModelNote
                title={isUpwelling ? "Økologiske superområder" : "Marine hetebølger"}
                tone={isUpwelling ? "teal" : "warm"}
              >
                {isUpwelling ? (
                  <p>
                    Oppvelling tilfører den solbelyste (eufotiske) sonen enorme mengder nitrat, fosfat
                    og silikat. Dette utløser eksplosiv vekst av fytoplankton og danner grunnlaget for
                    verdens rikeste fiskerier (Humboldt-strømmen utenfor Peru produserer opptil 10 %
                    av verdens villfangede fisk på under 0,1 % av havets areal!).
                  </p>
                ) : (
                  <p>
                    Når vinden tvinger overflatevannet mot land og nedover, blokkeres tilførselen av
                    kaldt dypvann. Det varme overflatelaget isoleres og overopphetes av solen. Dette er
                    en nøkkelfaktor bak alvorlige marine hetebølger som truer tareskoger og koraller.
                  </p>
                )}
              </ModelNote>
            </div>

            {/* Kystprofil og vertikalsnitt */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Vertikalt kystprofil: {coastType === "west_coast" ? "Vestkyst" : "Østkyst"}
                  </span>
                  <span className="font-mono text-xs text-primary">
                    {isUpwelling ? "Oppadgående vertikalhastighet w > 0" : "Nedadgående vertikalhastighet w < 0"}
                  </span>
                </div>

                <svg viewBox="0 0 520 320" className="w-full">
                  <defs>
                    <linearGradient id="deep-water-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="warm-surface-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Kyst og kontinentalskråning */}
                  {coastType === "west_coast" ? (
                    // Land på høyre side (øst)
                    <g>
                      {/* Vannmasse dyp */}
                      <path d="M 0 50 L 360 50 L 380 90 L 410 180 L 430 300 L 0 300 Z" fill="url(#deep-water-grad)" />

                      {/* Termoklin */}
                      <path
                        d={
                          isUpwelling
                            ? "M 0 130 Q 200 130 360 55" // Løftes helt opp til overflaten ved kysten
                            : "M 0 100 Q 200 120 400 210" // Presses ned ved kysten
                        }
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="6 4"
                      />

                      {/* Landprofil */}
                      <path
                        d="M 360 50 L 380 90 L 410 180 L 430 300 L 520 300 L 520 0 L 360 0 Z"
                        fill="#334155"
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <path d="M 360 50 Q 380 20 420 15 L 520 15 L 520 50 Z" fill="#1e293b" />
                      <text x="440" y="40" fill="#f8fafc" fontSize="13" fontWeight="bold">
                        LAND
                      </text>

                      {/* Piler for vind */}
                      <line x1="380" y1="70" x2="380" y2="120" stroke="#f8fafc" strokeWidth="3" markerEnd="url(#mdl-wind)" />
                      <text x="390" y="95" fill="#f8fafc" fontSize="10">
                        Vind {windDirection === "equatorward" ? "sørover" : "nordover"}
                      </text>

                      {/* Piler for Ekman-transport */}
                      {isUpwelling ? (
                        <g>
                          {/* Ekman til venstre (bort fra kysten) */}
                          <line x1="330" y1="65" x2="160" y2="65" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mdl-amber)" />
                          <text x="240" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            Ekman-transport bort fra kysten
                          </text>

                          {/* Oppvelling-piler fra dypet */}
                          <path
                            d="M 260 250 Q 330 220 345 85"
                            fill="none"
                            stroke="#34d399"
                            strokeWidth="3.5"
                            strokeDasharray="8 4"
                            markerEnd="url(#mdl-green)"
                          />
                          <text x="310" y="160" fill="#34d399" fontSize="12" fontWeight="bold">
                            Kaldt, næringsrikt dypvann stiger
                          </text>

                          {/* Næringssopp / klorofyllblomstring */}
                          <circle cx="340" cy="70" r="16" fill="#34d399" opacity="0.4" />
                          <circle cx="320" cy="75" r="12" fill="#34d399" opacity="0.3" />
                          <text x="290" y="95" fill="#a7f3d0" fontSize="10" fontStyle="italic">
                            Planktonoppblomstring
                          </text>
                        </g>
                      ) : (
                        <g>
                          {/* Ekman mot kysten (til høyre) */}
                          <line x1="160" y1="65" x2="330" y2="65" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mdl-amber)" />
                          <text x="240" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            Ekman-transport inn mot land
                          </text>

                          {/* Nedvelling-piler */}
                          <path
                            d="M 345 75 Q 360 140 380 230"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="3.5"
                            strokeDasharray="8 4"
                            markerEnd="url(#mdl-amber)"
                          />
                          <text x="310" y="150" fill="#f59e0b" fontSize="12" fontWeight="bold">
                            Vann presses ned (Downwelling)
                          </text>
                        </g>
                      )}
                    </g>
                  ) : (
                    // Land på venstre side (vest)
                    <g>
                      <path d="M 160 50 L 520 50 L 520 300 L 90 300 L 110 180 L 140 90 Z" fill="url(#deep-water-grad)" />

                      {/* Termoklin */}
                      <path
                        d={
                          isUpwelling
                            ? "M 520 130 Q 320 130 160 55"
                            : "M 520 100 Q 320 120 120 210"
                        }
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="6 4"
                      />

                      {/* Landprofil */}
                      <path
                        d="M 160 50 L 140 90 L 110 180 L 90 300 L 0 300 L 0 0 L 160 0 Z"
                        fill="#334155"
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <text x="50" y="40" fill="#f8fafc" fontSize="13" fontWeight="bold">
                        LAND
                      </text>

                      {isUpwelling ? (
                        <g>
                          <line x1="190" y1="65" x2="360" y2="65" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mdl-amber)" />
                          <text x="280" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            Ekman-transport ut i havet
                          </text>
                          <path
                            d="M 260 250 Q 190 220 175 85"
                            fill="none"
                            stroke="#34d399"
                            strokeWidth="3.5"
                            strokeDasharray="8 4"
                            markerEnd="url(#mdl-green)"
                          />
                          <text x="210" y="160" fill="#34d399" fontSize="12" fontWeight="bold">
                            Kystoppvelling
                          </text>
                        </g>
                      ) : (
                        <g>
                          <line x1="360" y1="65" x2="190" y2="65" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mdl-amber)" />
                          <text x="280" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            Vann stuves inn mot land
                          </text>
                          <path
                            d="M 175 75 Q 160 140 140 230"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="3.5"
                            strokeDasharray="8 4"
                            markerEnd="url(#mdl-amber)"
                          />
                          <text x="210" y="150" fill="#f59e0b" fontSize="12" fontWeight="bold">
                            Nedvelling
                          </text>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Overflatemerke for termoklinen */}
                  <text x="20" y="280" fill="#38bdf8" fontSize="11" fontStyle="italic">
                    Termoklin (skille mellom varmt overflatevann og kaldt dypvann)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FANE 3: GEOSTROFISK STRØM & GYREDYNAMIKK ──────────────── */}
      {tab === "geostrophic" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-display font-semibold text-sm text-foreground">
                  Hvordan oppstår en subtropisk gyre?
                </h4>
                <p>
                  I Nord-Atlanteren blåser <strong>passatvindene</strong> mot vest i sør (15°–30°N),
                  mens <strong>vestavindsbeltet</strong> blåser mot øst i nord (40°–60°N).
                </p>
                <p>
                  Ekman-transporten bøyer av 90° til høyre for vinden. Resultatet er at begge
                  vindsystemene pumper overflatevann inn mot <strong>midten av havbassenget</strong>{" "}
                  (Ekman-konvergens).
                </p>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="font-semibold text-primary">Dynamisk havhaug:</p>
                  <p className="mt-1">
                    Vannet som samles i sentrum (Sargassohavet) danner en vid, svakt buet «haug»
                    av overflatevann som rager <strong>1–2 meter høyere</strong> enn kystområdene
                    rundt!
                  </p>
                </div>
              </ModelPanel>

              <ModelNote title="Geostrofisk balanse: F_pg = F_c" tone="teal">
                <p>
                  Tyngdekraften forsøker å jevne ut haugen ved å skyve vann nedover trykkgradienten
                  (utover fra sentrum). Men så snart vannet settes i bevegelse nedover bakken, bøyer
                  Corioliskraften det til høyre!
                </p>
                <p className="mt-1">
                  Når <strong>trykkgradientkraften</strong> og <strong>Corioliskraften</strong> er like
                  store og motsatt rettede, er strømmen i geostrofisk balanse: den flyter
                  nøyaktig <em>langs høydekonturene</em>, med klokken rundt haugen!
                </p>
                <div className="mt-2 font-mono text-center text-xs font-bold text-sky-400 bg-background/80 p-2 rounded">
                  v_g = (g / f) · (∂η / ∂x)
                </div>
              </ModelNote>
            </div>

            {/* Skisse av haug, trykkgradient, Coriolis og vestlig randintensivering */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Tverrsnitt av subtropisk gyre (Nord-Atlanteren)
                  </span>
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[11px] text-amber-300">
                    Vestlig randintensivering (Stommel, 1948)
                  </span>
                </div>

                <svg viewBox="0 0 520 300" className="w-full">
                  {/* Bakgrunn */}
                  <rect width="520" height="300" fill="#020617" rx="8" />

                  {/* Kyst vest (Amerika) og øst (Europa/Afrika) */}
                  <rect x="0" y="40" width="40" height="260" fill="#1e293b" />
                  <text x="20" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" transform="rotate(-90 20 160)">
                    NORD-AMERIKA (Vest)
                  </text>

                  <rect x="480" y="40" width="40" height="260" fill="#1e293b" />
                  <text x="500" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" transform="rotate(90 500 160)">
                    EUROPA / AFRIKA (Øst)
                  </text>

                  {/* Asymmetrisk haug (presset mot vest pga beta-effekt) */}
                  <path
                    d="M 40 100 Q 150 40 180 40 Q 320 40 480 100 L 480 290 L 40 290 Z"
                    fill="#0369a1"
                    opacity="0.3"
                  />
                  {/* Havoverflate-linje */}
                  <path
                    d="M 40 100 Q 150 40 180 40 Q 320 40 480 100"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                  />

                  {/* Kuppel-topp-indikator */}
                  <line x1="180" y1="25" x2="180" y2="40" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="180" y="20" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                    Dynamisk haug (+1,5 m)
                  </text>

                  {/* Golfstrømmen: Smal, bratt bakke mot vest */}
                  <g>
                    <path
                      d="M 50 110 L 150 50"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="6"
                      markerEnd="url(#mdl-red)"
                    />
                    <text x="100" y="130" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">
                      Golfstrømmen
                    </text>
                    <text x="100" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                      Bratt helning → Ekstrem fart (2 m/s)
                    </text>
                  </g>

                  {/* Kanaristrømmen: Slak bakke mot øst */}
                  <g>
                    <path
                      d="M 240 45 L 460 95"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      markerEnd="url(#mdl-cyan)"
                    />
                    <text x="360" y="125" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">
                      Kanaristrømmen
                    </text>
                    <text x="360" y="140" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                      Slak helning → Bred og langsom (0,2 m/s)
                    </text>
                  </g>

                  {/* Krefter i balanse */}
                  <g transform="translate(130, 200)">
                    <rect width="260" height="75" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                    <text x="130" y="20" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                      Kjernen i geostrofisk strøm:
                    </text>
                    <text x="25" y="42" fill="#f87171" fontSize="10">
                      Trykkgradient (F_pg): Nedover haugen
                    </text>
                    <text x="25" y="58" fill="#38bdf8" fontSize="10">
                      Corioliskraft (F_c): Oppover mot sentrum
                    </text>
                    <text x="130" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontStyle="italic">
                      F_pg + F_c = 0 ⟹ Strømmen følger konturene!
                    </text>
                  </g>
                </svg>
              </div>

              <div className="rounded-xl border border-border/70 bg-card p-3 text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Hvorfor er Golfstrømmen så mye kraftigere enn Kanaristrømmen?</strong>
                <p className="mt-1">
                  Årsaken kalles <strong>vestlig randintensivering</strong> og ble løst matematisk av
                  oceanografen Henry Stommel i 1948. Fordi Corioliskraften øker med breddegraden
                  (β-effekten, β = df/dy), forskyves hele gyren mot vest. Det tvinger
                  vannmassene som skal nordover gjennom en smal «flaskehals» langs USAs østkyst.
                  Farten må mangedobles for å transportere samme vannvolum som den brede, slake
                  strømmen sørover i øst!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
