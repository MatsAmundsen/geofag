import { useState } from "react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

export function AmocTippingModel() {
  const [tab, setTab] = useState<"circulation" | "tipping_hysteresis">("circulation");

  // Ferskvannspulskontroll (Sv = 10^6 m^3/s)
  const [freshwaterFlux, setFreshwaterFlux] = useState<number>(0.05); // 0.00 til 0.35 Sv
  const [globalWarmingLevel, setGlobalWarmingLevel] = useState<number>(1.2); // °C over førindustriell

  // Fysikkberegninger for AMOC
  // Normal uforstyrret AMOC-transport er ca 17.5 Sv (Smeed et al., 2018)
  // Kritisk vippepunkt terskel F_crit ~ 0.18 - 0.22 Sv ferskvann
  const fCrit = 0.20 - (globalWarmingLevel - 1.0) * 0.03; // Varmere klima senker terskelen
  const isTipped = freshwaterFlux >= fCrit;

  // AMOC styrke beregning (Sv)
  const amocStrength = isTipped
    ? Math.max(3.2, 5.0 - (freshwaterFlux - fCrit) * 10) // kollapset tilstand (kun svak vinddrevet gyre)
    : Math.max(8.0, 18.0 - Math.pow(freshwaterFlux / fCrit, 1.8) * 9.5 - (globalWarmingLevel - 1.0) * 1.5);

  const amocPercentOfNormal = Math.round((amocStrength / 18.0) * 100);

  // Temperaturpåvirkning på Norge / Nord-Europa
  // Hvis AMOC kollapser overvinner det global oppvarming regionalt om vinteren
  const norwayTempAnomaly = isTipped
    ? -4.2 + (globalWarmingLevel - 1.0) * 0.8
    : 1.2 * globalWarmingLevel - (1 - amocPercentOfNormal / 100) * 3.5;

  // Havnivåstigning USAs østkyst (cm) pga redusert geostrofisk helning
  const usEastSeaLevelRiseCm = Math.round((1 - amocStrength / 18.0) * 32);

  // Partikkelfart / animasjonsvarighet
  const animDur = isTipped ? "999s" : `${Math.max(6, 25 - amocStrength)}s`;

  // Presets
  const applyPreset = (preset: "preindustrial" | "current" | "ssp245" | "tipping_pulse" | "collapsed") => {
    switch (preset) {
      case "preindustrial":
        setFreshwaterFlux(0.01);
        setGlobalWarmingLevel(0.0);
        break;
      case "current":
        setFreshwaterFlux(0.05);
        setGlobalWarmingLevel(1.2);
        break;
      case "ssp245":
        setFreshwaterFlux(0.12);
        setGlobalWarmingLevel(2.0);
        break;
      case "tipping_pulse":
        setFreshwaterFlux(0.22);
        setGlobalWarmingLevel(2.5);
        break;
      case "collapsed":
        setFreshwaterFlux(0.32);
        setGlobalWarmingLevel(3.0);
        break;
    }
  };

  return (
    <ModelFrame
      kicker="Interaktiv klimamodell"
      title="AMOC-strømningsanimasjon, ferskvannspulser og Stommel-vippepunkt"
      lead="Simuler hvordan økt smelting fra Grønland og arktisk elveavrenning skaper et lett ferskvannslokk i Nord-Atlanteren, bremser åpenhavskonveksjonen og utløser Stommels ikke-lineære vippepunkt."
      toolbar={
        <div className="flex flex-wrap gap-2">
          <ModelTab active={tab === "circulation"} onClick={() => setTab("circulation")}>
            1. AMOC-strømning & vertikalprofil
          </ModelTab>
          <ModelTab active={tab === "tipping_hysteresis"} onClick={() => setTab("tipping_hysteresis")}>
            2. Stommel-hysterese & vippepunkter
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* ── FANE 1: STRØMNINGSANIMASJON ─────────────────────────────── */}
      {tab === "circulation" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                {/* Hurtigvalg scenarier */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Klimascenarier:</label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyPreset("current")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        freshwaterFlux === 0.05 && globalWarmingLevel === 1.2
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Dagens tilstand (2025)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("ssp245")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        freshwaterFlux === 0.12 && globalWarmingLevel === 2.0
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Moderat svekkelse (+2 °C)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("tipping_pulse")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        freshwaterFlux === 0.22
                          ? "border-amber-500 bg-amber-500/15 text-amber-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Kritisk vippepunkt
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("collapsed")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        freshwaterFlux === 0.32
                          ? "border-rose-500 bg-rose-500/15 text-rose-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Kollapset tilstand (Off)
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="freshwater-slider" className="text-muted-foreground">
                      Ferskvannspuls (F_fersk):
                    </label>
                    <span className="font-mono font-bold text-sky-400">
                      {freshwaterFlux.toFixed(2)} Sv ({Math.round(freshwaterFlux * 1e6)} m³/s)
                    </span>
                  </div>
                  <input
                    id="freshwater-slider"
                    type="range"
                    min="0.00"
                    max="0.35"
                    step="0.01"
                    value={freshwaterFlux}
                    onChange={(e) => setFreshwaterFlux(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0 Sv (Normal)</span>
                    <span className="text-amber-400 font-semibold">Terskel (~{fCrit.toFixed(2)} Sv)</span>
                    <span>0.35 Sv (Ekstrem)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="warming-slider" className="text-muted-foreground">
                      Global oppvarming:
                    </label>
                    <span className="font-mono font-bold text-amber-400">+{globalWarmingLevel.toFixed(1)} °C</span>
                  </div>
                  <input
                    id="warming-slider"
                    type="range"
                    min="0.0"
                    max="3.5"
                    step="0.1"
                    value={globalWarmingLevel}
                    onChange={(e) => setGlobalWarmingLevel(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                </div>

                {/* AMOC Sanntidsdiagnostikk */}
                <div className="rounded-xl border border-border/70 bg-card/60 p-3 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">AMOC-transportstyrke:</span>
                    <span
                      className={`font-mono font-bold ${
                        amocStrength > 13
                          ? "text-emerald-400"
                          : amocStrength > 8
                            ? "text-amber-400"
                            : "text-rose-400"
                      }`}
                    >
                      {amocStrength.toFixed(1)} Sv ({amocPercentOfNormal} % av normalen)
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Regional vintertemp. (Norge):</span>
                    <span
                      className={`font-mono font-bold ${
                        norwayTempAnomaly >= 0 ? "text-amber-400" : "text-sky-400"
                      }`}
                    >
                      {norwayTempAnomaly >= 0 ? `+${norwayTempAnomaly.toFixed(1)}` : norwayTempAnomaly.toFixed(1)} °C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ekstra havnivåstigning USAs østkyst:</span>
                    <span className="font-mono font-bold text-primary">+{usEastSeaLevelRiseCm} cm</span>
                  </div>
                </div>
              </ModelPanel>

              <ModelNote
                title={
                  isTipped
                    ? "⚠️ AMOC har krysset vippepunktet!"
                    : amocPercentOfNormal < 70
                      ? "Betydelig svekket dyp konveksjon"
                      : "Aktivt omveltningsbånd"
                }
                tone={isTipped ? "low" : amocPercentOfNormal < 70 ? "warm" : "teal"}
              >
                {isTipped ? (
                  <p>
                    Ferskvannslokket er nå så tykt at vannet i Grønlands- og Norskehavet ikke lenger klarer
                    å oppnå tilstrekkelig tetthet til å bryte gjennom termoklinen. Den dype nedsynkingen
                    (NADW-dannelsen) har stoppet helt opp. Golfstrømmen eksisterer fortsatt som en
                    grunn, vinddrevet gyre, men frakter ikke lenger tropisk overskuddsvarme helt opp til
                    Arktis!
                  </p>
                ) : (
                  <p>
                    Saltvann fra tropene strømmer nordover med Den nordatlantiske strømmen. I de nordiske
                    hav og Labradorhavet avkjøles det kraftig av arktisk luft, oppnår maksimal tetthet og
                    synker ned i dypet for å returnere som NADW langs havbunnen.
                  </p>
                )}
              </ModelNote>
            </div>

            {/* Atlanterhavsprofil i SVG */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Atlanterhavet i profil: Ekvator til Norskehavet (0°–75°N)
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${
                      isTipped
                        ? "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                        : "bg-slate-900 text-sky-400"
                    }`}
                  >
                    {isTipped ? "KOLLAPSET TILSTAND" : `STATUS: ${amocPercentOfNormal}% AKTIV`}
                  </span>
                </div>

                <svg viewBox="0 0 540 330" className="w-full">
                  <defs>
                    <linearGradient id="amoc-warm-flow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                    <linearGradient id="amoc-deep-flow" x1="1" y1="0" x2="0" y2="0">
                      <stop offset="0%" stopColor="#0369a1" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                  </defs>

                  {/* Bakgrunn for dypet */}
                  <rect x="0" y="40" width="540" height="120" fill="#0284c7" opacity="0.25" />
                  <rect x="0" y="160" width="540" height="160" fill="#0f172a" opacity="0.95" />

                  {/* Termoklin-skillelinje */}
                  <line x1="0" y1="160" x2="540" y2="160" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="6 4" />
                  <text x="20" y="152" fill="#38bdf8" fontSize="10" fontStyle="italic">
                    Termoklin / Haloklin (~800 m dyp)
                  </text>

                  {/* Geografiske soner langs toppen */}
                  <text x="40" y="32" fill="#ef4444" fontSize="11" fontWeight="bold">
                    Tropene / Karibia (15°N)
                  </text>
                  <text x="240" y="32" fill="#f59e0b" fontSize="11" fontWeight="bold">
                    Nord-Atlanteren (45°N)
                  </text>
                  <text x="420" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold">
                    Norskehavet / GIN (70°N)
                  </text>

                  {/* Ferskvannslokk i nord ved smelting */}
                  <path
                    d="M 360 40 L 540 40 L 540 85 Q 450 95 360 80 Z"
                    fill="#22d3ee"
                    opacity={Math.min(0.85, 0.15 + freshwaterFlux * 2.2)}
                  />
                  <text
                    x="450"
                    y="68"
                    textAnchor="middle"
                    fill="#083344"
                    fontSize="11"
                    fontWeight="bold"
                    opacity={freshwaterFlux > 0.05 ? 1 : 0.3}
                  >
                    Ferskvannslokk (Grønlandsis)
                  </text>

                  {/* Strømningsbane for overflaten og dypet */}
                  <path
                    id="amoc-loop"
                    d="M 20 80 L 400 80 Q 480 80 480 160 Q 480 240 400 240 L 20 240"
                    fill="none"
                    stroke={isTipped ? "#64748b" : "url(#amoc-warm-flow)"}
                    strokeWidth={isTipped ? 4 : 10}
                    strokeLinecap="round"
                    opacity={isTipped ? 0.35 : 0.85}
                  />

                  {/* Konveksjonssone / synketrakt i nord */}
                  <g transform="translate(480, 160)">
                    {!isTipped ? (
                      <g>
                        <circle cx="0" cy="0" r="28" fill="#38bdf8" opacity="0.2" className="animate-ping" />
                        <line x1="0" y1="-70" x2="0" y2="70" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#mdl-cyan)" />
                        <text x="-40" y="0" textAnchor="end" fill="#38bdf8" fontSize="11" fontWeight="bold">
                          Dyp konveksjon (NADW)
                        </text>
                      </g>
                    ) : (
                      <g>
                        <line x1="-15" y1="-15" x2="15" y2="15" stroke="#ef4444" strokeWidth="3" />
                        <line x1="15" y1="-15" x2="-15" y2="15" stroke="#ef4444" strokeWidth="3" />
                        <text x="-30" y="0" textAnchor="end" fill="#f87171" fontSize="11" fontWeight="bold">
                          Konveksjon stoppet!
                        </text>
                      </g>
                    )}
                  </g>

                  {/* Partikler som følger sporet */}
                  {!isTipped &&
                    Array.from({ length: 12 }).map((_, i) => (
                      <circle key={i} r="5" fill="#f8fafc">
                        <animateMotion
                          dur={animDur}
                          repeatCount="indefinite"
                          begin={`-${(i * 1.8).toFixed(1)}s`}
                        >
                          <mpath href="#amoc-loop" />
                        </animateMotion>
                      </circle>
                    ))}

                  {/* Dyp returstrøm etikett */}
                  <text x="240" y="270" fill="#93c5fd" fontSize="11" fontWeight="bold">
                    Kaldt Nordatlantisk dypvann (NADW) sørover i dypet (2000–3500 m)
                  </text>
                </svg>
              </div>

              {/* Forklaringskort for Golfstrømmen vs AMOC */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-2">
                <strong className="text-primary text-sm">Det avgjørende skillet for eksamen:</strong>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="rounded bg-background/80 p-2.5 border border-border">
                    <p className="font-semibold text-foreground">Golfstrømmen (Gulf Stream):</p>
                    <p className="mt-1 text-muted-foreground">
                      Primært en <strong>vinddrevet overflatestrøm</strong> i den subtropiske gyren.
                      Så lenge jorden roterer og passatene og vestavinden blåser, vil Golfstrømmen
                      eksistere. Den kan ikke «slås av».
                    </p>
                  </div>
                  <div className="rounded bg-background/80 p-2.5 border border-border">
                    <p className="font-semibold text-foreground">AMOC (Omveltningsbåndet):</p>
                    <p className="mt-1 text-muted-foreground">
                      Hele det <strong>vertikale termohaline transportbåndet</strong>. Det er den dype
                      nedsynkingen i nord som kan svekkes eller nå et vippepunkt hvis overflaten blir for
                      fersk og lett.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FANE 2: STOMMEL-HYSTERESE & VIPPEPUNKTER ────────────────── */}
      {tab === "tipping_hysteresis" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-display font-semibold text-sm text-foreground">
                  Stommels to-boks-modell og hysterese
                </h4>
                <p>
                  I 1961 publiserte oseanografen <strong>Henry Stommel</strong> en banebrytende
                  matematisk modell som beviste at den termohaline sirkulasjonen har to fundamentalt
                  forskjellige stabile likevektstilstander for nøyaktig samme ferskvannspådrag:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 pt-1">
                  <li>
                    <strong>Aktiv tilstand (On):</strong> Sirkulasjonen transporterer salt vann
                    nordover. Saltet holder tettheten høy, noe som driver dyp konveksjon og trekker mer
                    salt vann nordover (selvforsterkende positiv tilbakekobling).
                  </li>
                  <li>
                    <strong>Kollapset tilstand (Off):</strong> Dypvannsdannelsen har stoppet. Uten
                    transport av tropisk salt forblir overflaten i nord fersk og lett. Systemet er låst i
                    en stabil av-tilstand!
                  </li>
                </ul>

                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 mt-2">
                  <p className="font-semibold text-amber-300">Hva betyr hysterese?</p>
                  <p className="mt-1">
                    Hvis en ferskvannspuls dytter AMOC forbi det kritiske vippepunktet (F_crit) slik at den
                    kollapser, er det <strong>ikke nok å redusere ferskvannet tilbake til utgangspunktet</strong>.
                    For å starte motoren igjen må ferskvannstilførselen senkes til et langt lavere nivå!
                  </p>
                </div>
              </ModelPanel>

              <ModelNote title="Moderne forskning (2023–2026)" tone="warm">
                <p>
                  Tidligere mente FNs klimapanel (IPCC AR6) at en full kollaps før år 2100 var lite
                  sannsynlig. Nyere observasjonsstudier (bl.a. Ditlevsen & Ditlevsen i{" "}
                  <em>Nature Communications</em>, 2023 og van Westen et al. i <em>Science Advances</em>,
                  2024) finner imidlertid fysiske tidlige varselsignaler (økt varians og kritisk
                  treghet) som tyder på at AMOC kan nå sitt vippepunkt allerede i dette århundret.
                </p>
              </ModelNote>
            </div>

            {/* Hysteresediagram i SVG */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Bifurkasjonsdiagram for AMOC (Stommel-hysterese)
                  </span>
                  <span className="font-mono text-xs text-sky-400">
                    Nåværende F_fersk = {freshwaterFlux.toFixed(2)} Sv
                  </span>
                </div>

                <svg viewBox="0 0 520 300" className="w-full">
                  <rect width="520" height="300" fill="#020617" rx="8" />

                  {/* Akser */}
                  <line x1="60" y1="250" x2="480" y2="250" stroke="#475569" strokeWidth="1.5" />
                  <line x1="60" y1="30" x2="60" y2="250" stroke="#475569" strokeWidth="1.5" />
                  <text x="270" y="280" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    Ferskvannspådrag i Nord-Atlanteren (Sv) →
                  </text>
                  <text x="20" y="140" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" transform="rotate(-90 20 140)">
                    AMOC-styrke (Sv) →
                  </text>

                  {/* Hysteresekurve (S-formet bifurkasjon) */}
                  {/* Øvre gren ('On'-tilstand: fra F=0, AMOC=18 ned mot F=0.20, AMOC=10) */}
                  <path
                    d="M 60 60 Q 200 70 320 150"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                  />
                  <text x="140" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">
                    Stabil 'ON'-tilstand (Dagens AMOC)
                  </text>

                  {/* Vippepunkt-bratt stup ned */}
                  <line x1="320" y1="150" x2="320" y2="225" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" />
                  <circle cx="320" cy="150" r="5" fill="#ef4444" />
                  <text x="330" y="145" fill="#ef4444" fontSize="11" fontWeight="bold">
                    Vippepunkt (F_crit ~ 0,20 Sv)
                  </text>

                  {/* Nedre gren ('Off'-tilstand: fra F=0.08, AMOC=4 til F=0.35, AMOC=3) */}
                  <path
                    d="M 160 225 L 460 235"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="3"
                  />
                  <text x="380" y="215" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    Stabil 'OFF'-tilstand (Kollaps)
                  </text>

                  {/* Gjenvinningsterskel (krever langt lavere ferskvann) */}
                  <line x1="160" y1="225" x2="160" y2="65" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="160" cy="225" r="4" fill="#34d399" />
                  <text x="150" y="215" textAnchor="end" fill="#34d399" fontSize="10">
                    Gjenoppstartsterskel (~0,08 Sv)
                  </text>

                  {/* Aktiv markør for brukerens sliderposisjon */}
                  {(() => {
                    let markerX = 60 + (freshwaterFlux / 0.35) * 400;
                    let markerY = 225; // default off

                    if (!isTipped) {
                      // On branch
                      const ratio = freshwaterFlux / fCrit;
                      markerY = 60 + ratio * ratio * 90;
                    }

                    return (
                      <g>
                        <circle cx={markerX} cy={markerY} r="7" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" className="animate-pulse" />
                        <line x1={markerX} y1={markerY} x2={markerX} y2="250" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
                        <rect x={markerX - 45} y={markerY - 26} width="90" height="18" rx="4" fill="#0f172a" stroke="#fbbf24" strokeWidth="1" />
                        <text x={markerX} y={markerY - 14} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                          {amocStrength.toFixed(1)} Sv
                        </text>
                      </g>
                    );
                  })()}
                </svg>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-slate-800 pt-3 text-[11px]">
                  <div className="rounded bg-slate-900 p-2">
                    <span className="text-muted-foreground block">1. Sadel-knute-bifurkasjon:</span>
                    <span className="text-slate-200">Over F_crit finnes ingen stabil 'on'-tilstand.</span>
                  </div>
                  <div className="rounded bg-slate-900 p-2">
                    <span className="text-muted-foreground block">2. Selvlåsende dynamikk:</span>
                    <span className="text-slate-200">Ferskvannet stenges inne i subpolare hav.</span>
                  </div>
                  <div className="rounded bg-slate-900 p-2">
                    <span className="text-muted-foreground block">3. Yngre dryas-parallell:</span>
                    <span className="text-slate-200">Skjedde for 12 800 år siden ved Lake Agassiz-brudd.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
