import { useState } from "react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

export function IodModeExplorer() {
  const [tab, setTab] = useState<"phases" | "teleconnections">("phases");

  // DMI (Dipole Mode Index) verdi i °C
  const [dmi, setDmi] = useState<number>(1.2); // -1.5 til +2.2
  const [ensoPhase, setEnsoPhase] = useState<"neutral" | "el_nino" | "la_nina">("neutral");

  // Presets
  const applyPreset = (preset: "positive_2019" | "neutral" | "negative_2016" | "super_el_nino_iod") => {
    switch (preset) {
      case "positive_2019":
        setDmi(1.8);
        setEnsoPhase("neutral");
        break;
      case "neutral":
        setDmi(0.0);
        setEnsoPhase("neutral");
        break;
      case "negative_2016":
        setDmi(-1.1);
        setEnsoPhase("neutral");
        break;
      case "super_el_nino_iod":
        setDmi(1.9);
        setEnsoPhase("el_nino");
        break;
    }
  };

  const isPositive = dmi >= 0.4;
  const isNegative = dmi <= -0.4;
  const isNeutral = !isPositive && !isNegative;

  // Beregninger for termoklin og havtemperaturer
  // Normal dybde på termoklin: ca 90m i vest, ca 120m i øst
  // Positiv IOD: Øst løftes (grunnes, oppvelling), Vest presses dypere
  const westThermoclineDepth = Math.round(90 + dmi * 30);
  const eastThermoclineDepth = Math.round(120 - dmi * 45);

  // SST-avvik
  const westSstAnomaly = (dmi * 0.55).toFixed(2);
  const eastSstAnomaly = (-dmi * 0.45).toFixed(2);

  // Regional påvirkning
  const eastAfricaRainAnomaly = Math.round(dmi * 45); // %
  const australiaRainAnomaly = Math.round(-dmi * 40 + (ensoPhase === "el_nino" ? -25 : ensoPhase === "la_nina" ? 25 : 0));

  const bushfireRisk =
    australiaRainAnomaly < -40
      ? "EKSTREM FARE («Black Summer»-nivå)"
      : australiaRainAnomaly < -15
        ? "BETYDELIG FORHØYET"
        : "MODERAT / NORMAL";

  const eastAfricaFloodRisk =
    eastAfricaRainAnomaly > 40
      ? "KATASTROFAL FLOMFARE (Masseevakuering)"
      : eastAfricaRainAnomaly > 15
        ? "FORHØYET FLOMRISIKO"
        : "LITEN FLOMFARE / TØRKE";

  return (
    <ModelFrame
      kicker="Interaktiv koblet hav-atmosfære-modell"
      title="Indian Ocean Dipole (IOD) og Walker-sirkulasjonen"
      lead="Juster Dipole Mode Index (DMI) for å se hvordan havoverflatetemperatur, termoklinhelning, Walker-sirkulasjonen og jetstrømmene endrer værregimer fra Øst-Afrika til Australia."
      toolbar={
        <div className="flex flex-wrap gap-2">
          <ModelTab active={tab === "phases"} onClick={() => setTab("phases")}>
            1. IOD-faser & Walker-sirkulasjon
          </ModelTab>
          <ModelTab active={tab === "teleconnections"} onClick={() => setTab("teleconnections")}>
            2. Telekoblinger & jetstrømmer
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* ── FANE 1: IOD-FASER ───────────────────────────────────────── */}
      {tab === "phases" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                {/* Hurtigvalg for faser */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Klassiske faser & hendelser:</label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyPreset("positive_2019")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        dmi === 1.8 && ensoPhase === "neutral"
                          ? "border-amber-500 bg-amber-500/15 text-amber-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Positiv IOD (2019 «Black Summer»)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("neutral")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        dmi === 0.0 && ensoPhase === "neutral"
                          ? "border-teal-500 bg-teal-500/15 text-teal-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Nøytral tilstand
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("negative_2016")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        dmi === -1.1 && ensoPhase === "neutral"
                          ? "border-sky-500 bg-sky-500/15 text-sky-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Negativ IOD (2016 / 2022 flom)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("super_el_nino_iod")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        ensoPhase === "el_nino"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Positiv IOD + El Niño (Dobbel sjokk)
                    </button>
                  </div>
                </div>

                {/* DMI-slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="dmi-slider" className="text-muted-foreground">
                      Dipole Mode Index (DMI = SST_vest - SST_øst):
                    </label>
                    <span
                      className={`font-mono font-bold ${
                        dmi >= 0.4 ? "text-amber-400" : dmi <= -0.4 ? "text-sky-400" : "text-teal-400"
                      }`}
                    >
                      {dmi >= 0 ? `+${dmi.toFixed(2)}` : dmi.toFixed(2)} °C
                    </span>
                  </div>
                  <input
                    id="dmi-slider"
                    type="range"
                    min="-1.5"
                    max="2.2"
                    step="0.1"
                    value={dmi}
                    onChange={(e) => setDmi(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Negativ (kald vest, varm øst)</span>
                    <span>Nøytral (-0,4 til +0,4)</span>
                    <span>Positiv (varm vest, kald øst)</span>
                  </div>
                </div>

                {/* Samspill med ENSO */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Stillehavskobling (ENSO):</label>
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEnsoPhase("neutral")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        ensoPhase === "neutral"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Nøytral
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnsoPhase("el_nino")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        ensoPhase === "el_nino"
                          ? "border-amber-500 bg-amber-500/15 text-amber-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      El Niño
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnsoPhase("la_nina")}
                      className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                        ensoPhase === "la_nina"
                          ? "border-sky-500 bg-sky-500/15 text-sky-300"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      La Niña
                    </button>
                  </div>
                </div>

                {/* Sanntidsindikatorer */}
                <div className="rounded-xl border border-border/70 bg-card/60 p-3 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">SST-anomali Vest-pol (Afrika):</span>
                    <span
                      className={`font-mono font-semibold ${
                        Number(westSstAnomaly) >= 0 ? "text-amber-400" : "text-sky-400"
                      }`}
                    >
                      {Number(westSstAnomaly) >= 0 ? `+${westSstAnomaly}` : westSstAnomaly} °C
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">SST-anomali Øst-pol (Indonesia):</span>
                    <span
                      className={`font-mono font-semibold ${
                        Number(eastSstAnomaly) >= 0 ? "text-amber-400" : "text-sky-400"
                      }`}
                    >
                      {Number(eastSstAnomaly) >= 0 ? `+${eastSstAnomaly}` : eastSstAnomaly} °C
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Nedbørsavvik Øst-Afrika:</span>
                    <span
                      className={`font-mono font-bold ${
                        eastAfricaRainAnomaly >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {eastAfricaRainAnomaly >= 0 ? `+${eastAfricaRainAnomaly}%` : `${eastAfricaRainAnomaly}%`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nedbørsavvik Australia:</span>
                    <span
                      className={`font-mono font-bold ${
                        australiaRainAnomaly >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {australiaRainAnomaly >= 0 ? `+${australiaRainAnomaly}%` : `${australiaRainAnomaly}%`}
                    </span>
                  </div>
                </div>
              </ModelPanel>

              <ModelNote
                title={
                  isPositive
                    ? "Positiv IOD: Varm vest / Kald øst"
                    : isNegative
                      ? "Negativ IOD: Kald vest / Varm øst"
                      : "Nøytral likevekt"
                }
                tone={isPositive ? "warm" : isNegative ? "teal" : "teal"}
              >
                {isPositive ? (
                  <p>
                    Passatvindene over Det indiske hav reverseres til unormale østlige vinder. Dette
                    dytter overflatevann mot vest og trigger kraftig kystoppvelling utenfor Sumatra/Java.
                    Termoklinen heves i øst (kaldt vann til overflaten), mens det varme vannet samles
                    utenfor Somalia og Kenya. Walker-sirkulasjonen forskyves vestover: voldsom konveksjon
                    og flom over Øst-Afrika, og tørr subsidens (synkende luft) med tørke over Indonesia
                    og Australia.
                  </p>
                ) : isNegative ? (
                  <p>
                    De vestlige ekvatorialvindene forsterkes. Ekstra mye varmt vann samles rundt
                    Indonesia og Nordvest-Australia. Termoklinen presses dypere i øst og heves i vest.
                    Kraftig konveksjon og ekstreme nedbørsmengder rammer Australia, mens Øst-Afrika
                    opplever tørke.
                  </p>
                ) : (
                  <p>
                    Vannet i øst er normalt noe varmere enn i vest. Svake vestavinder langs ekvator
                    (Wyrtki-jetter) opprettholder en svak østoverrettet gradient i termoklinen.
                  </p>
                )}
              </ModelNote>
            </div>

            {/* Vertikalsnitt av Det indiske hav */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Ekvatorialt vertikalsnitt: Afrika (40°E) til Indonesia (105°E)
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${
                      isPositive
                        ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                        : isNegative
                          ? "bg-sky-950 text-sky-300 border border-sky-500/40"
                          : "bg-teal-950 text-teal-300 border border-teal-500/40"
                    }`}
                  >
                    {isPositive ? "POSITIV FASE" : isNegative ? "NEGATIV FASE" : "NØYTRAL FASE"}
                  </span>
                </div>

                <svg viewBox="0 0 540 330" className="w-full">
                  <defs>
                    <linearGradient id="iod-ocean-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* Atmosfærisk bakgrunn */}
                  <rect x="0" y="0" width="540" height="150" fill="#020617" />

                  {/* Landprofiler: Afrika i vest (venstre), Indonesia i øst (høyre) */}
                  <rect x="0" y="100" width="60" height="230" fill="#1e293b" />
                  <text x="30" y="90" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    AFRIKA (Vest)
                  </text>

                  <rect x="480" y="100" width="60" height="230" fill="#1e293b" />
                  <text x="510" y="90" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    INDONESIA (Øst)
                  </text>

                  {/* Havoverflate og havbasseng */}
                  <rect x="60" y="150" width="420" height="180" fill="url(#iod-ocean-grad)" />

                  {/* Havoverflatetemperatur (SST fargebånd) */}
                  {(() => {
                    const westColor = isPositive ? "#ef4444" : isNegative ? "#0ea5e9" : "#f59e0b";
                    const eastColor = isPositive ? "#0ea5e9" : isNegative ? "#ef4444" : "#f59e0b";
                    return (
                      <g>
                        <rect x="60" y="150" width="210" height="18" fill={westColor} opacity="0.65" />
                        <rect x="270" y="150" width="210" height="18" fill={eastColor} opacity="0.65" />
                        <text x="165" y="163" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          Vest: {Number(westSstAnomaly) >= 0 ? `+${westSstAnomaly}` : westSstAnomaly} °C
                        </text>
                        <text x="375" y="163" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          Øst: {Number(eastSstAnomaly) >= 0 ? `+${eastSstAnomaly}` : eastSstAnomaly} °C
                        </text>
                      </g>
                    );
                  })()}

                  {/* Termoklinlinje */}
                  {(() => {
                    // Dybde i piksler: 180 til 280
                    const yWest = 180 + (westThermoclineDepth - 70) * 0.8;
                    const yEast = 180 + (eastThermoclineDepth - 70) * 0.8;

                    return (
                      <g>
                        <path
                          d={`M 60 ${yWest} Q 270 ${(yWest + yEast) / 2} 480 ${yEast}`}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="3.5"
                          strokeDasharray="6 4"
                        />
                        <text x="270" y={(yWest + yEast) / 2 - 8} textAnchor="middle" fill="#38bdf8" fontSize="10">
                          Termoklin
                        </text>

                        {/* Oppvelling-pil hvis øst er hevet */}
                        {isPositive && (
                          <g>
                            <path
                              d="M 440 260 L 440 175"
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="3"
                              markerEnd="url(#mdl-green)"
                            />
                            <text x="430" y="225" textAnchor="end" fill="#34d399" fontSize="10" fontWeight="bold">
                              Kystoppvelling
                            </text>
                          </g>
                        )}
                        {/* Oppvelling i vest ved negativ */}
                        {isNegative && (
                          <g>
                            <path
                              d="M 100 260 L 100 175"
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="3"
                              markerEnd="url(#mdl-green)"
                            />
                            <text x="110" y="225" fill="#34d399" fontSize="10" fontWeight="bold">
                              Oppvelling
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}

                  {/* Walker-sirkulasjon i atmosfæren (høyde 20 til 140) */}
                  {isPositive ? (
                    // Positiv Walker-celle: Stigende luft i vest, synkende luft i øst
                    <g>
                      {/* Konveksjonsskyer og regn i vest */}
                      <g transform="translate(140, 60)">
                        <ellipse cx="0" cy="0" rx="35" ry="18" fill="#475569" opacity="0.8" />
                        <ellipse cx="-15" cy="-8" rx="25" ry="16" fill="#64748b" opacity="0.9" />
                        <ellipse cx="15" cy="-6" rx="22" ry="14" fill="#64748b" opacity="0.9" />
                        <line x1="-15" y1="18" x2="-20" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="0" y1="18" x2="-5" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="15" y1="18" x2="10" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="0" y="-30" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">
                          Kraftig konveksjon & regn
                        </text>
                      </g>

                      {/* Oppadgående pil i vest */}
                      <line x1="140" y1="130" x2="140" y2="85" stroke="#ef4444" strokeWidth="3" markerEnd="url(#mdl-red)" />

                      {/* Øvre vind mot øst */}
                      <line x1="180" y1="35" x2="380" y2="35" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#mdl-wind)" />

                      {/* Nedadgående pil i øst (subsidens) */}
                      <line x1="400" y1="45" x2="400" y2="125" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#mdl-blue)" />
                      <text x="400" y="80" textAnchor="start" fill="#facc15" fontSize="11" fontWeight="bold">
                        Synkende tørr luft (Høytrykk)
                      </text>

                      {/* Ekvatorial anomalivind langs overflaten mot vest */}
                      <line x1="360" y1="135" x2="180" y2="135" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#mdl-amber)" />
                      <text x="270" y="125" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        Anomale østlige vinder (mot vest)
                      </text>
                    </g>
                  ) : isNegative ? (
                    // Negativ Walker-celle: Stigende i øst, synkende i vest
                    <g>
                      <g transform="translate(400, 60)">
                        <ellipse cx="0" cy="0" rx="35" ry="18" fill="#475569" opacity="0.8" />
                        <ellipse cx="-15" cy="-8" rx="25" ry="16" fill="#64748b" opacity="0.9" />
                        <ellipse cx="15" cy="-6" rx="22" ry="14" fill="#64748b" opacity="0.9" />
                        <line x1="-15" y1="18" x2="-20" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="0" y1="18" x2="-5" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="15" y1="18" x2="10" y2="45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="0" y="-30" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">
                          Ekstrem nedbør & flom
                        </text>
                      </g>
                      <line x1="400" y1="130" x2="400" y2="85" stroke="#ef4444" strokeWidth="3" markerEnd="url(#mdl-red)" />
                      <line x1="360" y1="35" x2="160" y2="35" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#mdl-wind)" />
                      <line x1="140" y1="45" x2="140" y2="125" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#mdl-blue)" />
                      <line x1="180" y1="135" x2="360" y2="135" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#mdl-amber)" />
                      <text x="270" y="125" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        Forsterkede vestavinder (mot øst)
                      </text>
                    </g>
                  ) : (
                    // Nøytral
                    <g>
                      <g transform="translate(380, 70)">
                        <ellipse cx="0" cy="0" rx="30" ry="15" fill="#475569" opacity="0.6" />
                        <text x="0" y="-20" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                          Normal konveksjon
                        </text>
                      </g>
                      <line x1="200" y1="135" x2="340" y2="135" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#mdl-wind)" />
                      <text x="270" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Svake vestlige Wyrtki-jetter
                      </text>
                    </g>
                  )}
                </svg>

                {/* Katastrofe- og risikovarsel */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-slate-800 pt-3 text-xs">
                  <div
                    className={`rounded-lg border p-2.5 ${
                      eastAfricaRainAnomaly > 20
                        ? "border-rose-500/40 bg-rose-950/20 text-rose-300"
                        : "border-border bg-slate-900 text-muted-foreground"
                    }`}
                  >
                    <span className="font-semibold block">🇰🇪 🇸🇴 Øst-Afrika (Somalia/Kenya):</span>
                    <span className="text-[11px] mt-0.5 block">{eastAfricaFloodRisk}</span>
                  </div>
                  <div
                    className={`rounded-lg border p-2.5 ${
                      australiaRainAnomaly < -20
                        ? "border-amber-500/40 bg-amber-950/20 text-amber-300"
                        : "border-border bg-slate-900 text-muted-foreground"
                    }`}
                  >
                    <span className="font-semibold block">🇦🇺 🇮🇩 Australia & Indonesia:</span>
                    <span className="text-[11px] mt-0.5 block">{bushfireRisk}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FANE 2: TELEKOBLINGER & JETSTRØMMER ──────────────────────── */}
      {tab === "teleconnections" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <ModelPanel className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-display font-semibold text-sm text-foreground">
                  Hvordan påvirker IOD de globale jetstrømmene?
                </h4>
                <p>
                  Når IOD forskyver den tropiske konveksjonen (oppadgående skyer og latent
                  varmefrigjøring) tusenvis av kilometer vestover eller østover, genereres det
                  storskala <strong>atmosfæriske Rossby-bølger</strong> som forplanter seg mot polene:
                </p>
                <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3">
                  <strong className="text-sky-300">Den subtropiske jetstrømmen:</strong>
                  <p className="mt-1">
                    Under positiv IOD fører manglende konveksjon over østlige Indiahav til at den
                    subtropiske jetstrømmen på den sørlige halvkule svekkes eller meandrerer
                    (bukter seg) sørover. Dette blokkerer fuktige vestavindsfronter fra Sørishavet, slik
                    at de ikke når inn over jordbruksområdene i Sørøst-Australia.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3">
                  <strong className="text-amber-300">Kobling til polarjeten:</strong>
                  <p className="mt-1">
                    En mer buktet subtropisk jet øker sjansen for at den «kobler seg sammen» med den
                    sørlige polarjeten. Når de møtes, kan jeten trekke iskald, tørr luft fra
                    Antarktis inn over Sør-Afrika og Australia, noe som gir uvanlige kuldeutbrudd i
                    tørkeperioder.
                  </p>
                </div>
              </ModelPanel>
            </div>

            <div className="space-y-4 lg:col-span-6">
              <ModelPanel className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-display font-semibold text-sm text-foreground">
                  Samspill mellom IOD og ENSO: Den doble katastrofen
                </h4>
                <p>
                  Selv om IOD og ENSO (El Niño / La Niña) er uavhengige svingninger i hvert sitt havbasseng,
                  er de forbundet via atmosfæren gjennom <strong>Indonesian Throughflow</strong> og den
                  sammenkoblede Walker-sirkulasjonen:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 pt-1">
                  <li>
                    <strong>Positiv IOD + El Niño (Super-tørke):</strong> Både El Niño og Positiv IOD
                    kjøler ned havet rundt Indonesia/Australia og skaper synkende luft. Når de inntreffer
                    samtidig (som i 1997 og 2019), forsterkes tørken til et katastrofalt nivå.
                    Dette var den direkte årsaken til <strong>«Black Summer»</strong>-brannene i
                    Australia i 2019/20 der over 18 millioner hektar skog brant ned!
                  </li>
                  <li>
                    <strong>Negativ IOD + La Niña (Super-flom):</strong> Begge moduser pumper varmt vann
                    og intens konveksjon mot Indonesia og Australia, noe som utløser historiske
                    flomkatastrofer i Queensland og New South Wales (som i 2010/11 og 2022).
                  </li>
                </ul>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 font-mono text-[11px] text-primary">
                  Formel: DMI = SST_vest (50°–70°E, 10°S–10°N) - SST_øst (90°–110°E, 10°S–0°)
                </div>
              </ModelPanel>
            </div>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
