import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelPanel, ModelTab, ModelNote } from "./model-chrome";

type SystemTab = "silicate_weathering" | "albedo_feedback" | "volcanic_climate" | "sphere_matrix";

export function EarthSystemsModel() {
  const [tab, setTab] = useState<SystemTab>("silicate_weathering");

  // --- Fane 1: Silikatforvitring & Geologisk termostat ---
  const [co2Level, setCo2Level] = useState<number>(600); // 150 til 2000 ppm
  const [orogenyExposure, setOrogenyExposure] = useState<number>(1.2); // 0.5 (flatt) til 2.5 (høye fjellkjeder/Himalaya)

  // Beregnet temperaturavvik fra referanse (+3 °C per CO2-dobling)
  const tempAnomaly = (3.0 * Math.log2(co2Level / 280)).toFixed(1);
  // Forvitringsrate (øker med temperatur og fersk eksponert stein)
  const baseWeatheringRate = Math.pow(Math.max(0.1, 1 + parseFloat(tempAnomaly) * 0.12), 1.6);
  const totalWeatheringRate = (baseWeatheringRate * orogenyExposure).toFixed(2);
  // Årlig CO2-fjerning via forvitring (Gt CO2/år, relativ skala)
  const co2DrawdownGt = (0.28 * parseFloat(totalWeatheringRate)).toFixed(2);

  // --- Fane 2: Is-albedo-tilbakekobling ---
  const [solarConstant, setSolarConstant] = useState<number>(1361); // W/m2 (1300 til 1420)
  const [greenhouseIndex, setGreenhouseIndex] = useState<number>(32); // 10 til 60 °C naturlig drivhuseffekt
  const [manualIceCover, setManualIceCover] = useState<number>(20); // 0 til 80 % isdekke

  // Albedo beregnet fra isdekke: hav/land albedo ~ 0.15, is albedo ~ 0.70
  const globalAlbedo = (0.15 + (manualIceCover / 100) * 0.55).toFixed(2);
  // Absorbert solstråling: S0/4 * (1 - albedo)
  const absorbedSolar = ((solarConstant / 4) * (1 - parseFloat(globalAlbedo))).toFixed(1);
  // Likevektstemperatur T_eff = (absorbed / sigma)^0.25 - 273.15 + drivhuseffekt
  // sigma = 5.67e-8 W/m2 K4
  const tKelvinPure = Math.pow((parseFloat(absorbedSolar) / 5.67037e-8), 0.25);
  const surfaceTempC = (tKelvinPure - 273.15 + greenhouseIndex).toFixed(1);

  // --- Fane 3: Vulkansk gass og klima (Pinatubo vs Geologisk) ---
  const [eruptionMagnitude, setEruptionMagnitude] = useState<number>(20); // Mt SO2 (0 til 100 Mt)
  const [plinianHeightKm, setPlinianHeightKm] = useState<number>(35); // 10 til 50 km (troposfære vs stratosfære)

  const reachesStratosphere = plinianHeightKm >= 18;
  const aerosolOpticalDepth = reachesStratosphere ? (eruptionMagnitude * 0.007).toFixed(3) : "0.002";
  const peakCooling = reachesStratosphere
    ? (-0.025 * eruptionMagnitude * Math.min(1.2, plinianHeightKm / 25)).toFixed(2)
    : "-0.05";
  const atmosphericResidenceMonths = reachesStratosphere ? Math.round(12 + eruptionMagnitude * 0.4) : 1;

  // --- Fane 4: Sfære-matrise ---
  const [selectedSphere, setSelectedSphere] = useState<"geo" | "hydro" | "atmo" | "bio" | "kryo">("geo");

  const sphereDetails = {
    geo: {
      name: "Geosfæren (Den faste jorden)",
      role: "Jordskorpen, mantelen og litosfæren. Hovedlager for karbon i form av kalkstein (CaCO₃) og kerogen i sedimentære bergarter.",
      inputs: "Vann og karbonsyre fra hydrosfære og atmosfære bryter ned mineraler; organisk materiale fra biosfæren begraves som fossilt brensel.",
      outputs: "Vulkanutbrudd frigjør CO₂, SO₂ og vanndamp til atmosfæren. Forvitring frigjør kalsium-, magnesium- og jernioner til elver og hav.",
      timescale: "Fra sekunder (jordskjelv, vulkaner) til hundrevis av millioner år (platetektonikk og bergartskretsløp).",
    },
    hydro: {
      name: "Hydrosfæren (Vannets sfære)",
      role: "Elver, innsjøer, grunnvann, porevann og verdenshavene. I Geofag 1 ligger hovedfokuset på ferskvannet på kontinentene.",
      inputs: "Nedbør fra atmosfæren, smeltevann fra kryosfæren, kjemiske ioner fra forvitring i geosfæren.",
      outputs: "Evapotranspirasjon til atmosfæren, sediment- og ionetransport til havbassenger, oppfylling av grunnvannsmagasiner.",
      timescale: "Fra timer og dager (flom i elver) til tusenvis av år (dyp grunnvannssirkulasjon og havstrømmer).",
    },
    atmo: {
      name: "Atmosfæren (Gasskappen)",
      role: "Det tynne gasslaget som omgir jorden. Regulerer overflatetemperaturen via drivhuseffekten og transporterer fuktighet og varme.",
      inputs: "Vanndamp fra hydrosfæren/biosfæren, vulkanske gasser fra geosfæren, oksygen og karbondioksid fra biologiske prosesser.",
      outputs: "Nedbør til hydro- og kryosfæren, kjemisk forvitringsagens (karbonsyrlig regnvann) til geosfæren.",
      timescale: "Timer og uker (synoptisk vær og stormer) til århundrer (klimagassakkumulering).",
    },
    kryo: {
      name: "Kryosfæren (Is og snø)",
      role: "Isbreer, innlandsis, permafrost, tele og sesongsnø. Regulerer klodens overflatealbedo og fungerer som geologisk gravemaskin.",
      inputs: "Fast nedbør (snø) fra atmosfæren i akkumulasjonsområder.",
      outputs: "Smeltevann som mater elver og grunnvann i hydrosfæren, breslam og erodert morenemateriale til geosfæren.",
      timescale: "Årstider (snødekke) til titusener av år (istidssykluser og isostatiske bevegelser).",
    },
    bio: {
      name: "Biosfæren (Livets sfære)",
      role: "Alt levende materiale på planeten: planter, dyr, sopp og mikroorganismer.",
      inputs: "Sollys, vann fra hydrosfæren, CO₂ fra atmosfæren, mineralnæringsstoffer (P, K, Ca, Fe) fra forvitret berg i geosfæren.",
      outputs: "O₂ til atmosfæren via fotosyntese, organisk humus til jordsmonn, oppsprekking av berggrunn via planterøtter.",
      timescale: "Dager og årstider (vegetasjonssyklus) til millioner av år (evolusjon og dannelse av kull- og oljeleier).",
    },
  };

  return (
    <ModelFrame
      kicker="Interaktiv jordsystem-modell"
      title="Dynamiske koblinger og tilbakekoblinger i jordsystemene"
      lead="Utforsk hvordan masse og energi sirkulerer mellom geosfæren, hydrosfæren, atmosfæren og kryosfæren. Endre parametere og observer hvordan negative og positive tilbakekoblingssløyfer opprettholder planetens likevekt eller utløser store klimaendringer."
      toolbar={
        <>
          <ModelTab active={tab === "silicate_weathering"} onClick={() => setTab("silicate_weathering")}>
            Kjemisk silikatforvitring (Urey)
          </ModelTab>
          <ModelTab active={tab === "albedo_feedback"} onClick={() => setTab("albedo_feedback")}>
            Is-albedo-tilbakekobling
          </ModelTab>
          <ModelTab active={tab === "volcanic_climate"} onClick={() => setTab("volcanic_climate")}>
            Vulkaner: SO₂ vs. CO₂
          </ModelTab>
          <ModelTab active={tab === "sphere_matrix"} onClick={() => setTab("sphere_matrix")}>
            Sfære-vekselvirkninger
          </ModelTab>
        </>
      }
    >
      {tab === "silicate_weathering" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h4 className="text-base font-semibold text-foreground">
                Walker-tilbakekoblingen: Jordens geologiske termostat
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Når vulkansk aktivitet øker CO₂ i atmosfæren, stiger temperaturen og nedbørsmengden.
                Dette akselererer den kjemiske forvitringen av silikatbergarter på kontinentene (Urey-reaksjonen).
                Kalsium- og bikarbonat-ioner vaskes ut i havet og felles ut som kalkstein (CaCO₃),
                noe som permanent fjerner karbon fra atmosfæren og kjøler kloden ned igjen.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Atmosfærisk CO₂-konsentrasjon:</span>
                    <span className="font-mono text-primary">{co2Level} ppm</span>
                  </div>
                  <input
                    type="range"
                    min={180}
                    max={1800}
                    step={20}
                    value={co2Level}
                    onChange={(e) => setCo2Level(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="CO2-konsentrasjon"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Istid (180 ppm)</span>
                    <span>Pre-industriell (280 ppm)</span>
                    <span>Drivhusverden (1800 ppm)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Fjellkjededannelse (orogenese & blottlagt berg):</span>
                    <span className="font-mono text-amber-400">{orogenyExposure.toFixed(1)}× referanse</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    value={orogenyExposure}
                    onChange={(e) => setOrogenyExposure(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Fjellkjededannelse"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Peneplan (Lite erosjon)</span>
                    <span>Normal kontinentalflate</span>
                    <span>Himalaya-kollisjon (Høy)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Global T-anomali</p>
                  <p className={`font-mono text-lg font-bold ${Number(tempAnomaly) >= 0 ? "text-rose-400" : "text-sky-400"}`}>
                    {Number(tempAnomaly) > 0 ? `+${tempAnomaly}` : tempAnomaly} °C
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Forvitringsrate</p>
                  <p className="font-mono text-lg font-bold text-amber-400">
                    {totalWeatheringRate}×
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CO₂-opptak (kalkstein)</p>
                  <p className="font-mono text-lg font-bold text-teal-400">
                    {co2DrawdownGt} Gt/år
                  </p>
                </div>
              </div>
            </div>

            {/* Skjematisk kjemisk kretsløp SVG */}
            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/50 p-4 lg:col-span-6">
              <svg viewBox="0 0 500 320" className="w-full h-auto" aria-label="Silikatforvitring kretsløp">
                <defs>
                  <marker id="arr-teal" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#14b8a6" />
                  </marker>
                  <marker id="arr-amber" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* Atmosfære */}
                <rect x="20" y="20" width="460" height="60" rx="8" fill="#16303a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="35" y="42" fill="#38bdf8" fontSize="12" fontWeight="bold">ATMOSFÆRE: CO₂ + H₂O → Svak karbonsyre (H₂CO₃)</text>
                <text x="35" y="62" fill="#94a3b8" fontSize="11">Aktuell CO₂-konsentrasjon: {co2Level} ppm</text>

                {/* Piler ned til geosfære */}
                <path d="M 120 80 L 120 130" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arr-teal)" />
                <text x="130" y="110" fill="#38bdf8" fontSize="10">Karbonsyrlig regnvann</text>

                {/* Geosfære (Fjell) */}
                <polygon points="40,240 140,140 240,240" fill="#2d2720" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="140" y="195" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">GEOSFÆRE</text>
                <text x="140" y="215" textAnchor="middle" fill="#d4d4d8" fontSize="10">Silikatbergart (CaSiO₃)</text>

                {/* Elvetransport */}
                <path d="M 230 220 C 270 210, 300 230, 330 230" stroke="#14b8a6" strokeWidth="3" fill="none" markerEnd="url(#arr-teal)" />
                <text x="250" y="195" fill="#14b8a6" fontSize="10">Flodtransport av Ca²⁺ & HCO₃⁻</text>

                {/* Hydrosfære (Hav) */}
                <rect x="330" y="170" width="150" height="120" rx="8" fill="#0f2636" stroke="#14b8a6" strokeWidth="1.5" />
                <text x="405" y="195" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="bold">HAVET / SEDIMENTER</text>
                <text x="405" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">Kalkutfelling:</text>
                <text x="405" y="235" textAnchor="middle" fill="#f8fafc" fontSize="10">Ca²⁺ + 2HCO₃⁻ →</text>
                <text x="405" y="255" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">CaCO₃(s) + CO₂ + H₂O</text>
                <text x="405" y="275" textAnchor="middle" fill="#34d399" fontSize="9">Kalkstein lagres i geologiske eoner</text>

                {/* Returpil subduksjon */}
                <path d="M 405 290 C 405 315, 20 315, 50 150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                <text x="230" y="310" textAnchor="middle" fill="#f87171" fontSize="9">Langsom platetektonisk subduksjon og vulkansk avgassing (100–200 mill. år)</text>
              </svg>

              <div className="mt-2 rounded-lg bg-card/80 p-2.5 border border-border text-xs text-muted-foreground">
                <strong className="text-foreground">Reaksjonslikning (Urey-reaksjonen):</strong>
                <p className="font-mono text-primary mt-1">CaSiO₃ + CO₂ ⇄ CaCO₃ + SiO₂</p>
                <p className="mt-1">
                  Reaksjonen mot høyre (forvitring og sedimentasjon) trekker CO₂ ut av atmosfæren.
                  Reaksjonen mot venstre (metamorfose på dypet) frigjør CO₂ tilbake via vulkanisme.
                </p>
              </div>
            </div>
          </ModelPanel>

          <ModelNote title="Viktig eksamenspoeng i LK20" tone="teal">
            Kjemisk forvitring av silikater er en <strong>negativ tilbakekobling</strong>. Når klimaet blir varmere,
            øker forvitringshastigheten, noe som trekker CO₂ ut av atmosfæren og stabiliserer jordens klima over geologiske
            tidsskalaer (noen hundre tusen år). Kalksteinforvitring fjerner derimot ingen netto CO₂ fra systemet på lang sikt.
          </ModelNote>
        </div>
      )}

      {tab === "albedo_feedback" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h4 className="text-base font-semibold text-foreground">
                Is-albedo-tilbakekobling: Positiv (forsterkende) sløyfe
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Albedo er et mål på overflatens refleksjonsevne for sollys (0 = absorberer alt, 1 = reflekterer alt).
                Åpent hav absorberer nesten 90 % av solstrålingen (albedo ~0.08–0.15), mens snø og havis reflekterer opptil
                70–80 % (albedo ~0.70–0.85). Når temperaturen faller, øker isdekket, mer solenergi spretter rett ut i verdensrommet,
                og avkjølingen forsterkes.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Globalt is- og snødekke:</span>
                    <span className="font-mono text-sky-400">{manualIceCover} %</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={75}
                    step={1}
                    value={manualIceCover}
                    onChange={(e) => setManualIceCover(Number(e.target.value))}
                    className="w-full accent-sky-500"
                    aria-label="Isdekke"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0 % (Isfri drivhusjord)</span>
                    <span>15 % (Dagens nivå)</span>
                    <span>75 % (Snøball-jorden)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Solarkonstant (S₀):</span>
                    <span className="font-mono text-amber-400">{solarConstant} W/m²</span>
                  </div>
                  <input
                    type="range"
                    min={1320}
                    max={1400}
                    step={5}
                    value={solarConstant}
                    onChange={(e) => setSolarConstant(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Solarkonstant"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Naturlig drivhuseffekt (ΔT_ghg):</span>
                    <span className="font-mono text-rose-400">+{greenhouseIndex} °C</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={45}
                    step={1}
                    value={greenhouseIndex}
                    onChange={(e) => setGreenhouseIndex(Number(e.target.value))}
                    className="w-full accent-rose-500"
                    aria-label="Drivhuseffekt"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Planetens albedo (α)</p>
                  <p className="font-mono text-lg font-bold text-sky-300">{globalAlbedo}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Absorbert sol (S)</p>
                  <p className="font-mono text-lg font-bold text-amber-400">{absorbedSolar} W/m²</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Overflatetemperatur</p>
                  <p className={`font-mono text-lg font-bold ${Number(surfaceTempC) <= 0 ? "text-sky-400" : "text-emerald-400"}`}>
                    {surfaceTempC} °C
                  </p>
                </div>
              </div>
            </div>

            {/* Is-albedo SVG visualiserer */}
            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/50 p-4 lg:col-span-6">
              <svg viewBox="0 0 500 300" className="w-full h-auto" aria-label="Is-albedo simulering">
                {/* Hav vs Isbakgrunn */}
                <rect x="20" y="160" width="460" height="110" rx="8" fill="#0f2b3c" />
                <rect
                  x="20"
                  y="160"
                  width={(460 * manualIceCover) / 100}
                  height="110"
                  rx="6"
                  fill="#e0f2fe"
                  stroke="#7dd3fc"
                  strokeWidth="1.5"
                />

                <text x="40" y="185" fill="#0369a1" fontSize="12" fontWeight="bold">
                  Kryosfære (Is/snødekke: {manualIceCover} %)
                </text>
                <text x="40" y="202" fill="#0284c7" fontSize="10">
                  Albedo ~ 0.70–0.85 (Reflekterer nesten alt)
                </text>

                <text x="460" y="185" textAnchor="end" fill="#38bdf8" fontSize="12" fontWeight="bold">
                  Hydrosfære (Åpent hav)
                </text>
                <text x="460" y="202" textAnchor="end" fill="#94a3b8" fontSize="10">
                  Albedo ~ 0.08–0.15 (Absorberer varme)
                </text>

                {/* Solinnstråling piler */}
                {/* Innstråling mot is */}
                <path d="M 100 40 L 140 160" stroke="#facc15" strokeWidth="2.5" markerEnd="url(#arr-amber)" />
                <path d="M 140 160 L 180 50" stroke="#facc15" strokeWidth="2.5" strokeDasharray="3 2" />
                <text x="165" y="70" fill="#facc15" fontSize="10" fontWeight="bold">75 % reflektert til rommet</text>

                {/* Innstråling mot hav */}
                <path d="M 360 40 L 390 160" stroke="#facc15" strokeWidth="2.5" markerEnd="url(#arr-amber)" />
                <path d="M 390 160 L 410 110" stroke="#facc15" strokeWidth="1" opacity="0.4" />
                <text x="400" y="140" fill="#38bdf8" fontSize="10" fontWeight="bold">88 % absorbert i havet</text>

                {/* Termisk balanse tekst */}
                <rect x="80" y="235" width="340" height="26" rx="4" fill="#09141c" stroke="#334e68" />
                <text x="250" y="252" textAnchor="middle" fill="#e2e8f0" fontSize="11">
                  Klodens gjennomsnittlige likevektstemperatur: <tspan fill="#38bdf8" fontWeight="bold">{surfaceTempC} °C</tspan>
                </text>
              </svg>

              <div className="mt-2 text-xs text-muted-foreground">
                {Number(surfaceTempC) <= 0 ? (
                  <p className="text-sky-300">
                    ❄️ <strong>Advarsel om «Snowball Earth»:</strong> Med dette isdekket overstiger albedoen en kritisk terskelverdi. Havet fryser til helt ned til tropene, slik jorden opplevde i Neoproterozoikum for ca. 717–635 millioner år siden.
                  </p>
                ) : (
                  <p>
                    ☀️ <strong>Likevekt:</strong> Is-albedo er en <em>positiv (selvforsterkende) tilbakekobling</em>. Når havisen i Arktis smelter om sommeren, blottlegges mørkt havvann som absorberer mer solvarme, noe som igjen fører til ytterligere issmelting.
                  </p>
                )}
              </div>
            </div>
          </ModelPanel>
        </div>
      )}

      {tab === "volcanic_climate" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h4 className="text-base font-semibold text-foreground">
                Vulkanisme i klimasystemet: Akutt kulde vs. geologisk drivhus
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Vulkanutbrudd påvirker atmosfæren på to vidt forskjellige tidsskalaer.
                Vulkansk aske faller raskt ut (dager/uker). Svoveldioksid (SO₂) som slynges inn i stratosfæren
                danner derimot reflekterende sulfataerosoler (H₂SO₄) som kan kjøle overflaten i 1–3 år (f.eks. Pinatubo 1991).
                Vulkansk CO₂ samler seg derimot opp og varmer jorden over millioner av år.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Erupsjonsmasse SO₂ (Svovelutslipp):</span>
                    <span className="font-mono text-rose-400">{eruptionMagnitude} megatonn (Mt)</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={eruptionMagnitude}
                    onChange={(e) => setEruptionMagnitude(Number(e.target.value))}
                    className="w-full accent-rose-500"
                    aria-label="Svoveldioksid"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Eyjafjallajökull 2010 (~0.2 Mt)</span>
                    <span>Pinatubo 1991 (20 Mt)</span>
                    <span>Tambora 1815 (100 Mt)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <span>Erupsjonssøylens høyde:</span>
                    <span className="font-mono text-sky-400">{plinianHeightKm} km</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={45}
                    step={1}
                    value={plinianHeightKm}
                    onChange={(e) => setPlinianHeightKm(Number(e.target.value))}
                    className="w-full accent-sky-500"
                    aria-label="Erupsjonshøyde"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>10 km (Troposfære - regnes raskt ut)</span>
                    <span>18 km (Tropopausegrense)</span>
                    <span>45 km (Dyp stratosfære)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Stratosfærisk injeksjon?</p>
                  <p className={`font-mono text-sm font-bold ${reachesStratosphere ? "text-emerald-400" : "text-amber-400"}`}>
                    {reachesStratosphere ? "JA (Stratosfære)" : "NEI (Troposfære)"}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Maks global kjøling</p>
                  <p className="font-mono text-lg font-bold text-sky-400">{peakCooling} °C</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Levetid i luften</p>
                  <p className="font-mono text-lg font-bold text-amber-400">
                    {atmosphericResidenceMonths} mnd.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/50 p-4 lg:col-span-6">
              <svg viewBox="0 0 500 280" className="w-full h-auto" aria-label="Pinatubo vs Tambora atmosfære">
                {/* Stratosfære / Troposfære bakgrunn */}
                <rect x="20" y="20" width="460" height="120" fill="#0f1f38" stroke="#3b82f6" strokeWidth="1" rx="6" />
                <rect x="20" y="140" width="460" height="120" fill="#1e293b" stroke="#64748b" strokeWidth="1" rx="6" />

                <line x1="20" y1="140" x2="480" y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="470" y="132" textAnchor="end" fill="#f59e0b" fontSize="10">Tropopause (~12–18 km)</text>

                <text x="35" y="45" fill="#93c5fd" fontSize="11" fontWeight="bold">STRATOSFÆRE (Ingen vær/nedbør – lang levetid for aerosoler)</text>
                <text x="35" y="165" fill="#cbd5e1" fontSize="11" fontWeight="bold">TROPOSFÆRE (Skyer og regn vasker ut aske på dager)</text>

                {/* Vulkan */}
                <polygon points="120,260 170,180 220,260" fill="#475569" stroke="#94a3b8" />
                {/* Magmasøyle */}
                <path
                  d={`M 170 180 L 170 ${Math.max(30, 260 - plinianHeightKm * 5.2)}`}
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="170" cy={Math.max(30, 260 - plinianHeightKm * 5.2)} r="14" fill="#fbbf24" opacity="0.8" />

                {/* Sulfatslør i stratosfæren */}
                {reachesStratosphere && (
                  <g>
                    <ellipse cx="320" cy="80" rx="130" ry="30" fill="#fef08a" opacity="0.35" />
                    <text x="320" y="80" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">
                      H₂SO₄-sulfataerosoler (Optisk dybde: {aerosolOpticalDepth})
                    </text>
                    <text x="320" y="96" textAnchor="middle" fill="#fef9c3" fontSize="9">
                      Reflekterer solinnstråling → Global vulkansk vinter
                    </text>
                  </g>
                )}
              </svg>

              <div className="mt-2 rounded-lg bg-card/80 p-2.5 border border-border text-xs text-muted-foreground">
                <p>
                  <strong>Historisk referanse (Tambora 1815):</strong> Utslippet på ~100 Mt SO₂ førte til
                  «året uten sommer» i 1816 med frost i juli i Nord-Amerika og Europa, feilslåtte avlinger og hungersnød.
                  Men etter 3 år var aerosolene vasket ut, og temperaturen normaliserte seg.
                </p>
              </div>
            </div>
          </ModelPanel>
        </div>
      )}

      {tab === "sphere_matrix" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-5">
            <div>
              <h4 className="text-base font-semibold text-foreground">
                Jordens fem sammenkoblede delsystemer (Interaksjonsmatrise)
              </h4>
              <p className="text-xs text-muted-foreground">
                Klikk på en sfære for å undersøke dens rolle, innputt, utputt og karakteristiske tidsskalaer i Geofag 1.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSphere === "geo" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedSphere("geo")}
              >
                Geosfære
              </Button>
              <Button
                variant={selectedSphere === "hydro" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedSphere("hydro")}
              >
                Hydrosfære
              </Button>
              <Button
                variant={selectedSphere === "atmo" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedSphere("atmo")}
              >
                Atmosfære
              </Button>
              <Button
                variant={selectedSphere === "kryo" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedSphere("kryo")}
              >
                Kryosfære
              </Button>
              <Button
                variant={selectedSphere === "bio" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedSphere("bio")}
              >
                Biosfære
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border border-border bg-card/50 p-4">
              <div>
                <h5 className="text-sm font-semibold text-primary">{sphereDetails[selectedSphere].name}</h5>
                <p className="mt-1 text-xs text-foreground/90">{sphereDetails[selectedSphere].role}</p>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="rounded-lg border border-border/70 bg-background/50 p-2.5">
                    <span className="font-semibold text-amber-400">Hva tilføres sfæren (Innputt):</span>
                    <p className="text-muted-foreground mt-0.5">{sphereDetails[selectedSphere].inputs}</p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background/50 p-2.5">
                    <span className="font-semibold text-teal-400">Hva leveres videre (Utputt):</span>
                    <p className="text-muted-foreground mt-0.5">{sphereDetails[selectedSphere].outputs}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-lg border border-border/70 bg-background/50 p-3">
                <div>
                  <span className="text-xs font-semibold text-sky-400">Karakteristisk tidsskala for respons:</span>
                  <p className="mt-1 text-xs font-mono text-foreground">{sphereDetails[selectedSphere].timescale}</p>

                  <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground space-y-1.5">
                    <p className="font-medium text-foreground">Eksempel på koblet prosess i Norge:</p>
                    {selectedSphere === "geo" && (
                      <p>Kaledonsk foldning løftet bergartene; forvitring danner i dag næringsrikt forvitringssmonn over kambrosilursk skifer i Mjøsområdet.</p>
                    )}
                    {selectedSphere === "hydro" && (
                      <p>Vannmettet leirjord under marin grense mister saltioner til grunnvannet, noe som kan utløse kvikkleireskred i geosfæren.</p>
                    )}
                    {selectedSphere === "atmo" && (
                      <p>Orografisk nedbør fra vestavindsbeltet over Vestlandet driver intens fluvial erosjon og dype V-daler mot fjordene.</p>
                    )}
                    {selectedSphere === "kryo" && (
                      <p>Nedsmelting av den 3000 meter tykke Weichsel-innlandsisen for 10 000 år siden utløste 200–300 meter isostatisk landheving (postglasial heving).</p>
                    )}
                    {selectedSphere === "bio" && (
                      <p>Røtter sprenger sprekker i gneisfjell (mekanisk forvitring) og danner humussyrer som løser feltspat og glimmer til leirmineraler.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModelPanel>
        </div>
      )}
    </ModelFrame>
  );
}
