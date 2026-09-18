import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type Tab = "globe" | "geostrophy" | "rossby";
type Hemisphere = "north" | "south";
type Latitude = 0 | 30 | 60 | 90;
type Direction = "north" | "south" | "east" | "west";

export function CoriolisModel() {
  const [activeTab, setActiveTab] = useState<Tab>("globe");

  // Fane 1: Klode-utskytning
  const [hemisphere, setHemisphere] = useState<Hemisphere>("north");
  const [latitude, setLatitude] = useState<Latitude>(60);
  const [direction, setDirection] = useState<Direction>("north");

  // Fane 2: Geostrofi & Friksjon
  const [frictionMode, setFrictionMode] = useState<"free" | "ocean" | "land">("free");

  // Fane 3: Rossby-kalkulator preset
  const [rossbyPreset, setRossbyPreset] = useState<"sink" | "football" | "tornado" | "hurricane" | "polar" | "gyre">("sink");

  // Beregning av Coriolisparameter f (rad/s)
  const OMEGA = 7.2921e-5;
  const radLat = (latitude * Math.PI) / 180;
  const fVal = 2 * OMEGA * Math.sin(radLat);
  const fFormatted = latitude === 0 ? "0,00" : (fVal * 1e4).toFixed(2);

  // Rossby data
  const rossbyData = {
    sink: {
      title: "Vask / Kjøkkenkum",
      u: 0.5,
      l: 0.3,
      time: "sekunder",
      ro: 16600,
      verdict: "Coriolis er 16 000 ganger for svak til å ha betydning!",
      explanation:
        "Hvilken vei vannet renner ut av en vask styres 100 % av kummens geometri, helning, kranens innfallsvinkel og restvirvler fra hendene dine. Å påstå at vannet spinner mot klokken i Norge og med klokken i Australia på grunn av jorden er en ren myte.",
      tone: "low" as const,
    },
    football: {
      title: "Fotballspark / Golfslag",
      u: 25,
      l: 50,
      time: "2–3 sekunder",
      ro: 4000,
      verdict: "Coriolis gir under 1 cm avvik på 50 meter!",
      explanation:
        "Når en fotball skrus mot krysset, er det Magnus-effekten (lufttrykkforskjell pga. ballens rotasjon mot luften) og vind som bestemmer banen. Corioliseffekten er tusenvis av ganger svakere enn ballens aerodynamikk.",
      tone: "low" as const,
    },
    tornado: {
      title: "Tornado (Skypumpe)",
      u: 65,
      l: 300,
      time: "minutter",
      ro: 1700,
      verdict: "Trykkgradient og sentrifugalkraft styrer (Syklostrofisk balanse)",
      explanation:
        "Selv om de fleste tornadoer på nordlig halvkule spinner syklonalt (fordi de fødes av superceller i storskala værsystemer), er tornadoens indre virvel så liten og voldsom at Coriolis er altfor svak til å styre den direkte. Ca. 1–2 % av alle tornadoer spinner antisyklonalt (feil vei).",
      tone: "warm" as const,
    },
    polar: {
      title: "Polart lavtrykk",
      u: 25,
      l: 300000,
      time: "1–2 døgn",
      ro: 0.65,
      verdict: "Coriolis begynner å dominere over treghet!",
      explanation:
        "I et polart lavtrykk over Barentshavet (300–500 km diameter) er Rossby-tallet under 1. Her tvinger Corioliseffekten luften inn i et markert syklonalt spiralmønster med et tydelig øye som ligner en mini-orkan.",
      tone: "teal" as const,
    },
    hurricane: {
      title: "Tropisk orkan (Hurrikan)",
      u: 45,
      l: 600000,
      time: "flere døgn",
      ro: 0.75,
      verdict: "Coriolis er strengt nødvendig for dannelsen!",
      explanation:
        "Tropiske orkaner må ha en minste Coriolisparameter for å få rotasjon. Derfor dannes det aldri orkaner mellom 0° og 5° breddegrad, til tross for at havvannet der er på sitt aller varmeste (29–30 °C).",
      tone: "teal" as const,
    },
    gyre: {
      title: "Subtropisk havvirvel (Nord-Atlanteren)",
      u: 1.0,
      l: 4000000,
      time: "uker til måneder",
      ro: 0.0025,
      verdict: "Fullstendig dominans av Coriolis (Nær perfekt geostrofi)",
      explanation:
        "På havbasseng-skala (tusenvis av kilometer) er Rossby-tallet mikroskopisk. Corioliskraften og Ekman-transporten danner enorme havsirkulasjonsvirvler (gyres) og opphopning av vann i Sargassohavet.",
      tone: "teal" as const,
    },
  }[rossbyPreset];

  return (
    <ModelFrame
      kicker="Interaktiv simulator"
      title="Coriolis-laboratoriet"
      lead="Utforsk hvordan breddegrad, fartsretning og bakkefriksjon styrer vindbaner, geostrofisk balanse og havvirvler."
      toolbar={
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">LK20 Geofag 2</span>
        </div>
      }
    >
      <div>
        <ModelMarkers />

        {/* FANER */}
        <div className="mb-5 flex flex-wrap gap-2">
          <ModelTab active={activeTab === "globe"} onClick={() => setActiveTab("globe")}>
            1. Klode-utskytning (Breddegrad & Retning)
          </ModelTab>
          <ModelTab active={activeTab === "geostrophy"} onClick={() => setActiveTab("geostrophy")}>
            2. Geostrofisk balanse & Friksjon
          </ModelTab>
          <ModelTab active={activeTab === "rossby"} onClick={() => setActiveTab("rossby")}>
            3. Rossby-kalkulatoren (Vask vs. Orkan)
          </ModelTab>
        </div>

        {/* ─── FANE 1: KLODE-UTSKYTNING ─── */}
        {activeTab === "globe" && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Banevisualisering på roterende sfære
                </span>
                <span className="rounded bg-primary/15 px-2.5 py-1 font-mono text-xs font-bold text-primary">
                  f = 2Ω sin({latitude}°) = {fFormatted} × 10⁻⁴ s⁻¹
                </span>
              </div>

              {/* KONTROLLPANEL FOR UTSKYTNING */}
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Halvkule:</label>
                  <div className="mt-1 flex gap-1">
                    <Button
                      size="sm"
                      variant={hemisphere === "north" ? "default" : "secondary"}
                      onClick={() => setHemisphere("north")}
                      className="w-full text-xs"
                    >
                      Nordlig (NH)
                    </Button>
                    <Button
                      size="sm"
                      variant={hemisphere === "south" ? "default" : "secondary"}
                      onClick={() => setHemisphere("south")}
                      className="w-full text-xs"
                    >
                      Sørlig (SH)
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Breddegrad:</label>
                  <div className="mt-1 flex gap-1">
                    {([0, 30, 60, 90] as Latitude[]).map((lat) => (
                      <Button
                        key={lat}
                        size="sm"
                        variant={latitude === lat ? "default" : "secondary"}
                        onClick={() => setLatitude(lat)}
                        className="w-full text-xs font-mono"
                      >
                        {lat}°
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Utskytningsretning:</label>
                  <div className="mt-1 flex gap-1">
                    {(["north", "south", "east", "west"] as Direction[]).map((d) => (
                      <Button
                        key={d}
                        size="sm"
                        variant={direction === d ? "default" : "secondary"}
                        onClick={() => setDirection(d)}
                        className="w-full text-xs uppercase"
                      >
                        {d === "north" ? "N" : d === "south" ? "S" : d === "east" ? "Ø" : "V"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SVG VISUALISERING AV UTSKYTNINGSBANEN */}
              <div className="relative overflow-hidden rounded-xl bg-slate-950 p-4">
                <svg viewBox="0 0 540 340" className="mx-auto h-auto w-full max-w-[500px] select-none">
                  <defs>
                    <radialGradient id="globe-bg" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="80%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#020617" />
                    </radialGradient>
                  </defs>

                  {/* Bakgrunnsradar / rutenett */}
                  <rect x="10" y="10" width="520" height="320" rx="8" fill="url(#globe-bg)" stroke="#334155" strokeWidth="1" />
                  <circle cx="270" cy="170" r="140" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="270" cy="170" r="90" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="270" cy="170" r="40" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="270" y1="20" x2="270" y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="170" x2="520" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Kompassroser */}
                  <text x="270" y="36" fill="#94a3b8" fontSize="11" fontWeight="800" textAnchor="middle">NORD</text>
                  <text x="270" y="315" fill="#94a3b8" fontSize="11" fontWeight="800" textAnchor="middle">SØR</text>
                  <text x="500" y="174" fill="#94a3b8" fontSize="11" fontWeight="800" textAnchor="end">ØST</text>
                  <text x="35" y="174" fill="#94a3b8" fontSize="11" fontWeight="800">VEST</text>

                  {/* Siktelinje (Rett bane uten Coriolis) */}
                  {direction === "north" && <line x1="270" y1="170" x2="270" y2="50" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}
                  {direction === "south" && <line x1="270" y1="170" x2="270" y2="290" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}
                  {direction === "east"  && <line x1="270" y1="170" x2="470" y2="170" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}
                  {direction === "west"  && <line x1="270" y1="170" x2="70" y2="170" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}

                  {/* Virkelig avbøyd bane */}
                  {(() => {
                    // Avbøyningsfaktor basert på latitude og hemisphere
                    // Hvis lat = 0 => rett linje (ingen krumning)
                    const krum = (latitude / 90) * (hemisphere === "north" ? 1 : -1) * 65;

                    let pathD = "";
                    let endX = 270;
                    let endY = 170;

                    if (direction === "north") {
                      endX = 270 + krum;
                      endY = 55;
                      pathD = `M 270 170 Q ${270 + krum * 0.4} 110, ${endX} ${endY}`;
                    } else if (direction === "south") {
                      endX = 270 - krum;
                      endY = 285;
                      pathD = `M 270 170 Q ${270 - krum * 0.4} 230, ${endX} ${endY}`;
                    } else if (direction === "east") {
                      endX = 465;
                      endY = 170 + krum;
                      pathD = `M 270 170 Q 370 ${170 + krum * 0.4}, ${endX} ${endY}`;
                    } else if (direction === "west") {
                      endX = 75;
                      endY = 170 - krum;
                      pathD = `M 270 170 Q 170 ${170 - krum * 0.4}, ${endX} ${endY}`;
                    }

                    return (
                      <>
                        <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3.8" />
                        <circle cx={endX} cy={endY} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                      </>
                    );
                  })()}

                  {/* Utskytningssenter */}
                  <circle cx="270" cy="170" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                  <text x="270" y="196" fill="#fef08a" fontSize="11" fontWeight="800" textAnchor="middle">
                    Start ({latitude}°)
                  </text>
                </svg>
              </div>
            </ModelPanel>

            {/* HØYRE FORKLARINGSPANEL */}
            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="Fysisk tolkning av resultatet" tone={latitude === 0 ? "warm" : "teal"}>
                {latitude === 0 ? (
                  <p>
                    <strong>Ved ekvator (0°) er sin(0) = 0:</strong> Coriolisparameteren er nøyaktig null. En luftpakke
                    eller et prosjektil opplever ingen horisontal avbøyning. Banen forblir snorrett! Dette er grunnen til at
                    tropiske orkaner aldri dannes på ekvator.
                  </p>
                ) : hemisphere === "north" ? (
                  <p>
                    <strong>Nordlig halvkule:</strong> Uansett om du sikter mot nord, sør, øst eller vest, bøyes banen
                    <strong> alltid mot høyre</strong> i fartsretningen. Avbøyningen er sterkere ved 60° (Norge) og 90° (Nordpolen)
                    enn ved 30° (subtropene) fordi sin(φ) øker mot polene.
                  </p>
                ) : (
                  <p>
                    <strong>Sørlig halvkule:</strong> Sett fra en roterende jordklode under ekvator bøyes banen
                    <strong> alltid mot venstre</strong> i fartsretningen. Effekten når sitt maksimum over Sørishavet og Antarktis.
                  </p>
                )}
              </ModelNote>

              <ModelNote title="Beregnet Coriolis-akselerasjon" tone="teal">
                <p className="text-xs">
                  Akselerasjonen er gitt ved <strong>a_c = 2 · v · Ω · sin(φ) = f · v</strong>.
                </p>
                <p className="mt-1 text-xs">
                  For en vindhastighet på <strong>v = 20 m/s (sterk kuling)</strong> ved <strong>{latitude}°N</strong> er
                  Coriolis-akselerasjonen:
                </p>
                <div className="mt-2 rounded bg-slate-900 p-2 font-mono text-xs font-bold text-primary">
                  a_c = {(fVal * 20).toExponential(3)} m/s²
                </div>
              </ModelNote>
            </div>
          </div>
        )}

        {/* ─── FANE 2: GEOSTROFI & FRIKSJON ─── */}
        {activeTab === "geostrophy" && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kraftbalanse: Trykkgradient (F_pg) vs. Coriolis (F_c) vs. Friksjon (F_f)
                </span>
                <span className="rounded bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
                  {frictionMode === "free" ? "Fri atmosfære (>1000 m)" : frictionMode === "ocean" ? "Havoverflate" : "Land / Skog"}
                </span>
              </div>

              {/* FRIKSJON-VELGER */}
              <div className="mb-5 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={frictionMode === "free" ? "default" : "secondary"}
                  onClick={() => setFrictionMode("free")}
                  className="text-xs"
                >
                  1. Fri atmosfære (Ingen friksjon · 0° vinkel)
                </Button>
                <Button
                  size="sm"
                  variant={frictionMode === "ocean" ? "default" : "secondary"}
                  onClick={() => setFrictionMode("ocean")}
                  className="text-xs"
                >
                  2. Glatt havoverflate (Moderat friksjon · 15° vinkel)
                </Button>
                <Button
                  size="sm"
                  variant={frictionMode === "land" ? "default" : "secondary"}
                  onClick={() => setFrictionMode("land")}
                  className="text-xs"
                >
                  3. Kupert land / skog (Høy friksjon · 30° vinkel)
                </Button>
              </div>

              {/* SVG KRAFTVEKTOR-DIAGRAM */}
              <div className="relative overflow-hidden rounded-xl bg-slate-950 p-4">
                <svg viewBox="0 0 540 320" className="mx-auto h-auto w-full max-w-[500px] select-none">
                  {/* Isobarer */}
                  <line x1="30" y1="60" x2="510" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="40" y="52" fill="#fca5a5" fontSize="12" fontWeight="800">1000 hPa (LAVTRYKK · NORD)</text>

                  <line x1="30" y1="160" x2="510" y2="160" stroke="#64748b" strokeWidth="1.5" />
                  <text x="40" y="152" fill="#94a3b8" fontSize="11">1008 hPa</text>

                  <line x1="30" y1="260" x2="510" y2="260" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="40" y="278" fill="#86efac" fontSize="12" fontWeight="800">1016 hPa (HØYTRYKK · SØR)</text>

                  {/* Luftpakke sentrert på 1008 hPa */}
                  <g transform="translate(260, 160)">
                    <circle cx="0" cy="0" r="13" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                    <text x="0" y="4" fill="#0f172a" fontSize="10" fontWeight="900" textAnchor="middle">Luft</text>

                    {/* F_pg (peker alltid rett opp mot lavt trykk, lengde = 75px) */}
                    <line x1="0" y1="-15" x2="0" y2="-85" stroke="#ef4444" strokeWidth="3" markerEnd="url(#mdl-red)" />
                    <text x="8" y="-70" fill="#ef4444" fontSize="12" fontWeight="900">F_pg</text>

                    {frictionMode === "free" && (
                      <>
                        {/* F_c peker rett ned (balanserer F_pg perfekt) */}
                        <line x1="0" y1="15" x2="0" y2="85" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#mdl-teal)" />
                        <text x="8" y="75" fill="#38bdf8" fontSize="12" fontWeight="900">F_c</text>

                        {/* Vindvektor rett mot øst (parallelt med isobarer) */}
                        <line x1="15" y1="0" x2="110" y2="0" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#mdl-yellow)" />
                        <text x="120" y="4" fill="#fef08a" fontSize="13" fontWeight="900">V_g (Geostrofisk)</text>
                      </>
                    )}

                    {frictionMode === "ocean" && (
                      <>
                        {/* Vindvektor dreid 15° inn mot lavt trykk */}
                        <g transform="rotate(-15)">
                          <line x1="15" y1="0" x2="95" y2="0" stroke="#f59e0b" strokeWidth="3.8" markerEnd="url(#mdl-yellow)" />
                          <text x="105" y="4" fill="#fef08a" fontSize="12" fontWeight="900">V (Vind 15° vinkel)</text>

                          {/* F_c vinkelrett 90° til høyre for V */}
                          <line x1="0" y1="15" x2="0" y2="70" stroke="#38bdf8" strokeWidth="2.8" markerEnd="url(#mdl-teal)" />
                          <text x="8" y="60" fill="#38bdf8" fontSize="11" fontWeight="800">F_c (redusert)</text>

                          {/* Friksjon motsatt vei av V */}
                          <line x1="-15" y1="0" x2="-55" y2="0" stroke="#a855f7" strokeWidth="2.8" markerEnd="url(#mdl-purple)" />
                          <text x="-65" y="4" fill="#d8b4fe" fontSize="11" fontWeight="800" textAnchor="end">Friksjon</text>
                        </g>
                      </>
                    )}

                    {frictionMode === "land" && (
                      <>
                        {/* Vindvektor dreid 30° inn mot lavt trykk */}
                        <g transform="rotate(-30)">
                          <line x1="15" y1="0" x2="80" y2="0" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#mdl-yellow)" />
                          <text x="90" y="4" fill="#fef08a" fontSize="12" fontWeight="900">V (Vind 30° vinkel)</text>

                          {/* F_c vinkelrett 90° til høyre */}
                          <line x1="0" y1="15" x2="0" y2="55" stroke="#38bdf8" strokeWidth="2.8" markerEnd="url(#mdl-teal)" />
                          <text x="8" y="48" fill="#38bdf8" fontSize="11" fontWeight="800">F_c (kraftig svekket)</text>

                          {/* Friksjon motsatt vei av V */}
                          <line x1="-15" y1="0" x2="-65" y2="0" stroke="#a855f7" strokeWidth="2.8" markerEnd="url(#mdl-purple)" />
                          <text x="-75" y="4" fill="#d8b4fe" fontSize="11" fontWeight="800" textAnchor="end">Friksjon</text>
                        </g>
                      </>
                    )}
                  </g>
                </svg>
              </div>
            </ModelPanel>

            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="Hva forteller modellen?" tone="teal">
                {frictionMode === "free" ? (
                  <p>
                    <strong>I fri atmosfære:</strong> Friksjonen er null. Corioliskraften og trykkgradientkraften er i perfekt
                    likevekt (F_pg = F_c). Vinden blåser 100 % parallelt med isobarene. Dette kalles <strong>geostrofisk vind</strong>.
                  </p>
                ) : (
                  <p>
                    <strong>Nær bakken:</strong> Friksjonen bremser vindhastigheten. Fordi farten avtar, blir Corioliskraften
                    svakere. Nå dominerer trykkgradientkraften, og vinden trekkes <strong>på skrå over isobarene</strong> inn mot
                    lavtrykket! Dette skaper bakkekonvergens og oppdrift.
                  </p>
                )}
              </ModelNote>

              <ModelNote title="Buys Ballots lov" tone="warm">
                <p className="text-xs leading-relaxed">
                  <em>«Står du med ryggen mot vinden på nordlig halvkule, har du lavtrykket til venstre for deg.»</em>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  I fri atmosfære ligger det nøyaktig 90° til venstre. Nær bakken ligger det ca. 60°–75° til venstre på grunn av friksjonsavdriften.
                </p>
              </ModelNote>
            </div>
          </div>
        )}

        {/* ─── FANE 3: ROSSBY-KALKULATOREN ─── */}
        {activeTab === "rossby" && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sammenlign Rossby-tallet: Ro = U / (f · L)
                </span>
                <span className="font-mono text-xs font-bold text-primary">f ≈ 1,26 × 10⁻⁴ s⁻¹ (Norge)</span>
              </div>

              {/* PRESET-KNAPPER */}
              <div className="mb-5 flex flex-wrap gap-1.5">
                {[
                  { id: "sink", label: "Vask / Kjøkkenkum" },
                  { id: "football", label: "Fotballspark" },
                  { id: "tornado", label: "Tornado" },
                  { id: "polar", label: "Polart lavtrykk" },
                  { id: "hurricane", label: "Tropisk orkan" },
                  { id: "gyre", label: "Havvirvel (Gyre)" },
                ].map((item) => (
                  <Button
                    key={item.id}
                    size="sm"
                    variant={rossbyPreset === item.id ? "default" : "secondary"}
                    onClick={() => setRossbyPreset(item.id as typeof rossbyPreset)}
                    className="text-xs"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* VISUELT ROSSBY-RESULTAT */}
              <div className="rounded-xl border border-border bg-slate-950 p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">{rossbyData.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Hastighet: <strong>{rossbyData.u} m/s</strong> · Skala (L): <strong>{rossbyData.l >= 1000 ? `${rossbyData.l / 1000} km` : `${rossbyData.l} m`}</strong> · Varighet: {rossbyData.time}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900 px-4 py-2 text-right">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Beregnet Rossby-tall:</span>
                    <p className="font-mono text-2xl font-black text-primary">{rossbyData.ro >= 100 ? rossbyData.ro.toLocaleString("no-NO") : rossbyData.ro}</p>
                  </div>
                </div>

                {/* LOGARITMISK SKALA-LINJAL */}
                <div className="mt-6">
                  <div className="mb-1 flex justify-between text-[11px] font-semibold">
                    <span className="text-red-400">Ro &gt;&gt; 1 (Coriolis ubetydelig)</span>
                    <span className="text-amber-400">Ro ≈ 1</span>
                    <span className="text-emerald-400">Ro &lt;&lt; 1 (Coriolis dominerer!)</span>
                  </div>
                  <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 opacity-60" />
                    {/* Markør for valgt preset */}
                    <div
                      className="absolute top-0 h-4 w-2 -translate-x-1/2 bg-white shadow-lg"
                      style={{
                        left:
                          rossbyPreset === "sink"
                            ? "8%"
                            : rossbyPreset === "football"
                              ? "22%"
                              : rossbyPreset === "tornado"
                                ? "38%"
                                : rossbyPreset === "polar"
                                  ? "65%"
                                  : rossbyPreset === "hurricane"
                                    ? "72%"
                                    : "92%",
                      }}
                    />
                  </div>
                </div>

                {/* VERDIKT */}
                <div className="mt-5 rounded-lg border border-border/80 bg-slate-900/80 p-4">
                  <p className="text-sm font-bold text-primary">{rossbyData.verdict}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{rossbyData.explanation}</p>
                </div>
              </div>
            </ModelPanel>

            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="Hvorfor er Rossby-tallet så viktig?" tone="teal">
                <p className="text-xs leading-relaxed">
                  Rossby-tallet er naturens målestokk for roterende væsker. Formelen sammenligner
                  <strong> akselerasjon / sentrifugalkraft (U/L)</strong> med <strong>Corioliskraften (f)</strong>:
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  <li>
                    • <strong>Ro &gt; 10:</strong> Systemet er for lite eller raskt; Coriolis merkes overhodet ikke.
                  </li>
                  <li>
                    • <strong>Ro &lt; 0,1:</strong> Systemet er så stort at Corioliseffekten tvinger frem full geostrofisk balanse.
                  </li>
                </ul>
              </ModelNote>
            </div>
          </div>
        )}
      </div>
    </ModelFrame>
  );
}
