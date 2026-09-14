import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type VolcanoScenario = "shield" | "stratovolcano" | "caldera" | "earthquake_sim";

export function VolcanoModel() {
  const [scenario, setScenario] = useState<VolcanoScenario>("stratovolcano");

  // Kontroller for vulkan-simulering
  const [sio2, setSio2] = useState<number>(62); // 48% (basalt) til 73% (ryolitt)
  const [gasContent, setGasContent] = useState<number>(4.2); // 0.5% til 6.0% H2O/CO2
  const [temp, setTemp] = useState<number>(950); // 750 C til 1200 C
  const [isErupting, setIsErupting] = useState<boolean>(true);

  // Kontroller for jordskjelv-simulering
  const [faultStress, setFaultStress] = useState<number>(65); // 0-100%
  const [epicenterDist, setEpicenterDist] = useState<number>(120); // km fra stasjon
  const [focalDepth, setFocalDepth] = useState<number>(15); // km
  const [quakeTriggered, setQuakeTriggered] = useState<boolean>(false);

  // Avledede egenskaper for vulkan
  // Viskositet øker eksponentielt med SiO2 og synker med temperatur
  const calcViscosity = () => {
    if (sio2 < 52) return { label: "Meget lav (tyntflytende)", class: "text-emerald-400", val: 10 };
    if (sio2 < 57) return { label: "Lav til moderat", class: "text-teal-400", val: 100 };
    if (sio2 < 63) return { label: "Moderat til høy (andesittisk)", class: "text-amber-400", val: 10000 };
    if (sio2 < 70) return { label: "Høy (dasittisk, seig)", class: "text-orange-400", val: 1000000 };
    return { label: "Ekstremt høy (ryolittisk, propeldannende)", class: "text-rose-400", val: 100000000 };
  };

  const viscosityInfo = calcViscosity();

  // Eksplosivitet bestemt av produktet av gass og viskositet
  const calcEruptionStyle = () => {
    const score = (sio2 - 45) * 1.5 + gasContent * 12;
    if (score < 40) {
      return {
        type: "Hawaiisk / Effusiv",
        vei: "VEI 0–1",
        desc: "Rolige lavastrømmer og lavafontener. Lav viskositet lar gassbobler unnslippe uten å sprenge smelten i fillebiter.",
        hazards: "Lavastrømmer ødelegger infrastruktur, men mennesker rekker normalt å evakuere til fots.",
        color: "#f59e0b",
      };
    } else if (score < 75) {
      return {
        type: "Stromboliansk / Vulkansk",
        vei: "VEI 2–3",
        desc: "Periodiske eksplosjoner, lavabomber og moderate askesøyler (1–5 km høyde).",
        hazards: "Tefra-nedfall, brann og giftige gasser i nærområdet.",
        color: "#f97316",
      };
    } else if (score < 110) {
      return {
        type: "Sub-pliniansk / Pliniansk (f.eks. Vesuv, St. Helens)",
        vei: "VEI 4–5",
        desc: "Massiv vedvarende gassutblåsning med konvektiv askesøyle til stratosfæren (10–35 km). Fragmentering av seig magma til pimpstein og finaske.",
        hazards: "Pyroklastiske tetthetsstrømmer (PDC) i 200–700 km/t, dødelig askeopphopning og laharer.",
        color: "#ef4444",
      };
    } else {
      return {
        type: "Ultra-pliniansk / Kalderautbrudd (Supervulkan)",
        vei: "VEI 6–8",
        desc: "Tømming av gigantiske magmakamre. Magmataket kollapser og danner en enorm kaldera. Global klimapåvirkning via SO₂-aerosoler.",
        hazards: "Kontinentale askelag, tiårslang vulkansk vinter og regional totalødeleggelse.",
        color: "#b91c1c",
      };
    }
  };

  const eruptionStyle = calcEruptionStyle();

  // Jordskjelvberegninger
  // P-bølge: vp ~ 6.0 km/s, S-bølge: vs ~ 3.5 km/s
  // Hypocenteravstand: d = sqrt(dist^2 + depth^2)
  const hypDist = Math.sqrt(epicenterDist * epicenterDist + focalDepth * focalDepth);
  const tP = (hypDist / 6.0).toFixed(1);
  const tS = (hypDist / 3.5).toFixed(1);
  const deltaT = (parseFloat(tS) - parseFloat(tP)).toFixed(1);
  const estMagnitude = (3.0 + (faultStress / 100) * 4.8).toFixed(1);

  // Forhåndsinnstilte scenario-moduser
  const setScenarioPreset = (sc: VolcanoScenario) => {
    setScenario(sc);
    if (sc === "shield") {
      setSio2(49);
      setGasContent(1.0);
      setTemp(1180);
    } else if (sc === "stratovolcano") {
      setSio2(62);
      setGasContent(4.5);
      setTemp(950);
    } else if (sc === "caldera") {
      setSio2(73);
      setGasContent(5.8);
      setTemp(820);
    } else if (sc === "earthquake_sim") {
      setFaultStress(80);
      setEpicenterDist(140);
      setFocalDepth(12);
    }
  };

  return (
    <ModelFrame
      kicker="Interaktiv vulkansk & seismologisk simulator"
      title="Magmakjemi, Utbruddsdynamikk og Seismisk Bølgeforplantning"
      lead="Eksperimenter med silikatinnhold (SiO₂), gass og temperatur for å se hvordan magmakjemi styrer eksplosivitet — eller utforsk hvordan elastisk forkastningsspenning utløser P- og S-bølger med distanseavhengig seismogram."
      toolbar={
        <div className="flex flex-wrap gap-1.5">
          <ModelTab active={scenario === "stratovolcano"} onClick={() => setScenarioPreset("stratovolcano")}>
            Eksplosiv Stratovulkan (Subduksjon)
          </ModelTab>
          <ModelTab active={scenario === "shield"} onClick={() => setScenarioPreset("shield")}>
            Effusiv Skjoldvulkan (Hotspot/Rift)
          </ModelTab>
          <ModelTab active={scenario === "caldera"} onClick={() => setScenarioPreset("caldera")}>
            Kalderakollaps & Supervulkan
          </ModelTab>
          <ModelTab active={scenario === "earthquake_sim"} onClick={() => setScenarioPreset("earthquake_sim")}>
            Jordskjelv & Seismogram
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* Kontroller for vulkanscenarioene */}
      {scenario !== "earthquake_sim" ? (
        <div className="mb-6 grid gap-4 rounded-xl border border-border bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Silikatinnhold (SiO₂):</span>
              <span className="font-mono text-primary">{sio2} %</span>
            </div>
            <input
              type="range"
              min={45}
              max={75}
              step={1}
              value={sio2}
              onChange={(e) => setSio2(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              {sio2 < 52 ? "Basaltisk (mafisk)" : sio2 < 63 ? "Andesittisk (intermediær)" : "Ryolittisk (felsisk)"}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Gassinnhold (H₂O, CO₂):</span>
              <span className="font-mono text-primary">{gasContent.toFixed(1)} vekt-%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={6.0}
              step={0.1}
              value={gasContent}
              onChange={(e) => setGasContent(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              {gasContent < 2 ? "Lavt drivtrykk" : gasContent < 4 ? "Moderat drivtrykk" : "Voldsom ekspansjonskraft!"}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Temperatur:</span>
              <span className="font-mono text-primary">{temp} °C</span>
            </div>
            <input
              type="range"
              min={750}
              max={1250}
              step={25}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Høy temp senker viskositeten; lav temp gjør magmaen seig.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <Button
              variant={isErupting ? "default" : "secondary"}
              onClick={() => setIsErupting(!isErupting)}
              className="w-full text-xs font-semibold"
            >
              {isErupting ? "Pause animasjon" : "Start utbruddsanimasjon"}
            </Button>
          </div>
        </div>
      ) : (
        /* Kontroller for jordskjelvsimulator */
        <div className="mb-6 grid gap-4 rounded-xl border border-border bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Akkumulert spenning:</span>
              <span className="font-mono text-primary">{faultStress} %</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={faultStress}
              onChange={(e) => {
                setFaultStress(Number(e.target.value));
                setQuakeTriggered(false);
              }}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Elastisk tøyning langs forkastningen. Brudd ved 100 %.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Avstand til stasjon:</span>
              <span className="font-mono text-primary">{epicenterDist} km</span>
            </div>
            <input
              type="range"
              min={20}
              max={400}
              step={10}
              value={epicenterDist}
              onChange={(e) => setEpicenterDist(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Jo lenger unna, desto større tidsgap (Δt) mellom P og S.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Fokusdybde (hyposenter):</span>
              <span className="font-mono text-primary">{focalDepth} km</span>
            </div>
            <input
              type="range"
              min={2}
              max={80}
              step={2}
              value={focalDepth}
              onChange={(e) => setFocalDepth(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              {focalDepth < 20 ? "Grunne skjelv (høy overflateødeleggelse)" : "Dypere skjelv (mer dempet overflate)"}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <Button
              variant={faultStress >= 80 ? "default" : "secondary"}
              onClick={() => setQuakeTriggered(true)}
              className="w-full text-xs font-semibold"
            >
              {quakeTriggered ? "⚡ Brudd utløst! (Trykk for nytt)" : "Utløs forkastningsbrudd"}
            </Button>
          </div>
        </div>
      )}

      {/* SVG VISUALISERING */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-slate-950 p-2 shadow-inner">
        {scenario !== "earthquake_sim" ? (
          /* VULKAN-VISUALISERING */
          <svg viewBox="0 0 900 460" className="w-full h-auto select-none">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#081018" />
                <stop offset="60%" stopColor="#132330" />
                <stop offset="100%" stopColor="#1e3445" />
              </linearGradient>
              <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c2720" />
                <stop offset="100%" stopColor="#181410" />
              </linearGradient>
              <linearGradient id="magmaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4d00" />
                <stop offset="50%" stopColor="#ff8c00" />
                <stop offset="100%" stopColor="#ff2200" />
              </linearGradient>
              <radialGradient id="chamberGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6a00" stopOpacity="1" />
                <stop offset="70%" stopColor="#ff2200" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7a0000" stopOpacity="0" />
              </radialGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Himmel */}
            <rect x="0" y="0" width="900" height="340" fill="url(#skyGrad)" />

            {/* Fjellbakgrunn for dybdefølelse */}
            <path d="M 0 320 L 120 250 L 260 300 L 400 240 L 520 290 L 700 230 L 900 310 L 900 340 L 0 340 Z" fill="#162029" opacity="0.6" />

            {/* Jordskorpe og sedimentlag */}
            <rect x="0" y="320" width="900" height="140" fill="url(#crustGrad)" />
            <line x1="0" y1="320" x2="900" y2="320" stroke="#44392e" strokeWidth="2" />

            {/* Magmakammer i dypet */}
            <ellipse cx="450" cy="405" rx={scenario === "caldera" ? 180 : 100} ry={scenario === "caldera" ? 45 : 32} fill="url(#chamberGlow)" />
            <ellipse cx="450" cy="405" rx={scenario === "caldera" ? 150 : 80} ry={scenario === "caldera" ? 35 : 24} fill="url(#magmaGrad)" />
            <text x="450" y="408" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {scenario === "caldera" ? "Gigantisk ryolitt-kammer (~700 km³)" : `Magmakammer (${temp} °C)`}
            </text>
            <text x="450" y="424" fill="#fed7aa" fontSize="10" textAnchor="middle">
              SiO₂: {sio2}% · Gass: {gasContent.toFixed(1)}% · Viskositet: {viscosityInfo.label.split(" ")[0]}
            </text>

            {/* VULKANGEOMETRI BASERT PÅ SCENARIO / SIO2 */}
            {scenario === "shield" ? (
              /* Skjoldvulkan: Slak helling (3–8°), bred fot */
              <g>
                <path
                  d="M 60 320 Q 450 240 840 320 Z"
                  fill="#2d2822"
                  stroke="#574838"
                  strokeWidth="2"
                />
                {/* Flate lavalag */}
                <path d="M 160 318 Q 450 255 740 318" fill="none" stroke="#221d17" strokeWidth="3" />
                <path d="M 260 316 Q 450 270 640 316" fill="none" stroke="#3d3329" strokeWidth="2.5" />

                {/* Sentral krateråpning */}
                <ellipse cx="450" cy="242" rx="35" ry="8" fill="#1b1612" stroke="#e07a30" strokeWidth="1.5" />

                {/* Tilførselsgang */}
                <path d="M 444 380 L 444 242 H 456 L 456 380 Z" fill="#ff5500" opacity="0.9" />

                {/* Lavafontener og rolige lavastrømmer */}
                {isErupting && (
                  <g>
                    {/* Lavafontene ved krateret */}
                    <path
                      d="M 446 242 Q 440 200 445 180 Q 450 170 455 180 Q 460 200 454 242 Z"
                      fill="#ff7700"
                      filter="url(#glowEffect)"
                    />
                    <ellipse cx="450" cy="180" rx="6" ry="12" fill="#ffcc00" />
                    
                    {/* Pahoehoe / Aa lavastrømmer som renner sakte ned sidene */}
                    <path
                      d="M 430 244 Q 300 260 140 320"
                      fill="none"
                      stroke="#ff4400"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 430 244 Q 300 260 140 320"
                      fill="none"
                      stroke="#ffaa00"
                      strokeWidth="2.5"
                      strokeDasharray="14 10"
                    />
                    <path
                      d="M 470 244 Q 600 262 760 320"
                      fill="none"
                      stroke="#ff3300"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Gass- og dampslør */}
                    <ellipse cx="450" cy="210" rx="30" ry="15" fill="#94a3b8" opacity="0.3" />
                    <ellipse cx="465" cy="170" rx="20" ry="12" fill="#cbd5e1" opacity="0.25" />
                  </g>
                )}
              </g>
            ) : scenario === "stratovolcano" ? (
              /* Stratovulkan: Bratt kjegle (25–35°), lagdelt aske og lava */
              <g>
                <path
                  d="M 180 320 L 420 180 Q 450 190 480 180 L 720 320 Z"
                  fill="#332a26"
                  stroke="#57453d"
                  strokeWidth="2"
                />
                {/* Lagdeling (stratifikasjon) */}
                <path d="M 230 310 L 426 195 L 474 195 L 670 310" fill="none" stroke="#261d1a" strokeWidth="4" />
                <path d="M 280 295 L 432 215 L 468 215 L 620 295" fill="none" stroke="#4a3b34" strokeWidth="3" />
                <path d="M 330 270 L 438 235 L 462 235 L 570 270" fill="none" stroke="#1f1816" strokeWidth="3" />

                {/* Krater */}
                <ellipse cx="450" cy="182" rx="30" ry="9" fill="#1c1412" stroke="#ff5500" strokeWidth="2" />

                {/* Tilførselsgang og gassboble-fragmentering */}
                <path d="M 444 380 L 444 182 H 456 L 456 380 Z" fill="#ff3b00" />

                {/* Fragmenteringsnivå markering */}
                <line x1="410" y1="260" x2="490" y2="260" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="500" y="264" fill="#facc15" fontSize="10">Fragmenteringssone (zf)</text>

                {isErupting && (
                  <g>
                    {/* Pliniansk konvektiv askesøyle rett opp i stratosfæren */}
                    <path
                      d="M 440 180 Q 430 110 390 60 Q 350 20 280 18 L 620 18 Q 550 20 510 60 Q 470 110 460 180 Z"
                      fill="#475569"
                      opacity="0.85"
                    />
                    {/* Paraplysky / tefrasky i toppen */}
                    <ellipse cx="450" cy="24" rx="200" ry="22" fill="#334155" opacity="0.9" />
                    <ellipse cx="410" cy="20" rx="140" ry="18" fill="#475569" opacity="0.85" />
                    <ellipse cx="500" cy="25" rx="120" ry="16" fill="#64748b" opacity="0.8" />
                    <text x="450" y="28" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Paraplysky (stratosfæren: 15–35 km)
                    </text>

                    {/* Vulkanske lyn i askesøylen pga statisk elektrisitet */}
                    <path d="M 425 120 L 415 135 L 430 145 L 420 160" stroke="#fef08a" strokeWidth="2" fill="none" filter="url(#glowEffect)" />
                    <path d="M 470 95 L 485 110 L 475 125 L 490 140" stroke="#fef08a" strokeWidth="2" fill="none" filter="url(#glowEffect)" />

                    {/* Pyroklastisk tetthetsstrøm (PDC) som raser nedover fjellsiden */}
                    <path
                      d="M 420 190 Q 360 220 290 260 Q 230 290 150 320 L 220 320 Q 320 280 430 210 Z"
                      fill="#e11d48"
                      opacity="0.75"
                    />
                    <path
                      d="M 150 320 Q 220 280 300 250"
                      stroke="#fb7185"
                      strokeWidth="4"
                      strokeDasharray="6 4"
                      fill="none"
                    />
                    <text x="210" y="275" fill="#ffe4e6" fontSize="11" fontWeight="bold" transform="rotate(-30 210 275)">
                      Pyroklastisk strøm (PDC ~400 km/t) ⚡
                    </text>

                    {/* Lahar (vulkansk slamstrøm) i dalbunn */}
                    <path d="M 475 200 Q 560 250 670 320 L 730 320 Q 600 250 485 200 Z" fill="#78716c" opacity="0.85" />
                    <text x="610" y="280" fill="#f5f5f4" fontSize="10" fontWeight="bold" transform="rotate(28 610 280)">
                      Lahar (slamstrøm)
                    </text>
                  </g>
                )}
              </g>
            ) : (
              /* Kalderakollaps: Tømt magmakammer, innsunket blokk */
              <g>
                <path
                  d="M 120 320 L 290 220 L 330 270 L 570 270 L 610 220 L 780 320 Z"
                  fill="#2e2523"
                  stroke="#57453d"
                  strokeWidth="2"
                />
                {/* Innsunket kalderabunn / innsjø */}
                <rect x="330" y="270" width="240" height="50" fill="#1b2024" />
                <path d="M 330 285 Q 450 282 570 285 L 570 305 Q 450 308 330 305 Z" fill="#0284c7" opacity="0.75" />
                <text x="450" y="298" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Kalderasjø (innsunket platetak)
                </text>

                {/* Resurgent kuppel (ny oppbuling) */}
                <ellipse cx="450" cy="275" rx="35" ry="12" fill="#44352f" stroke="#78594c" strokeWidth="1.5" />
                <text x="450" y="273" fill="#cbd5e1" fontSize="9" textAnchor="middle">Resurgent kuppel</text>

                {/* Ringforkastninger */}
                <line x1="330" y1="220" x2="330" y2="380" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 4" />
                <line x1="570" y1="220" x2="570" y2="380" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 4" />
                <text x="310" y="250" fill="#f43f5e" fontSize="10" textAnchor="end">Ringforkastning ↓</text>
                <text x="590" y="250" fill="#f43f5e" fontSize="10" textAnchor="start">↓ Ringforkastning</text>

                {/* Gigantisk aske- og gass-slør */}
                {isErupting && (
                  <g>
                    <ellipse cx="450" cy="70" rx="320" ry="45" fill="#475569" opacity="0.6" />
                    <ellipse cx="450" cy="50" rx="260" ry="35" fill="#334155" opacity="0.75" />
                    <text x="450" y="55" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">
                      Global SO₂-aerosolsky & vulkansk vinter (VEI 7–8)
                    </text>
                  </g>
                )}
              </g>
            )}

            {/* Skala og annoteringer */}
            <rect x="20" y="20" width="220" height="95" rx="8" fill="#0f172a" opacity="0.88" stroke="#334155" />
            <text x="35" y="42" fill="#93c5fd" fontSize="13" fontWeight="bold">Utbruddsklassifisering</text>
            <text x="35" y="62" fill="#f8fafc" fontSize="12" fontWeight="600">{eruptionStyle.type}</text>
            <text x="35" y="80" fill={eruptionStyle.color} fontSize="12" fontWeight="bold">{eruptionStyle.vei}</text>
            <text x="35" y="98" fill="#94a3b8" fontSize="11">Viskositet: {viscosityInfo.label.split(" ")[0]}</text>
          </svg>
        ) : (
          /* JORDSKJELV & SEISMOGRAM-VISUALISERING */
          <svg viewBox="0 0 900 460" className="w-full h-auto select-none">
            <defs>
              <linearGradient id="eqSkyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b131e" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="faultRockGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#332c25" />
                <stop offset="100%" stopColor="#1c1713" />
              </linearGradient>
            </defs>

            {/* Bakgrunn */}
            <rect x="0" y="0" width="900" height="230" fill="url(#eqSkyGrad)" />
            <rect x="0" y="230" width="900" height="230" fill="url(#faultRockGrad)" />

            {/* Terrengoverflate */}
            <path d="M 0 230 H 900" stroke="#64748b" strokeWidth="2" />
            <text x="20" y="220" fill="#94a3b8" fontSize="12">Jordoverflate (kontinentalskorpe)</text>

            {/* Forkastningslinje (skråplan) */}
            <line x1="280" y1="230" x2="180" y2="450" stroke="#f43f5e" strokeWidth="3" strokeDasharray="8 4" />
            <text x="220" y="370" fill="#f43f5e" fontSize="11" fontWeight="bold" transform="rotate(65 220 370)">
              Aktiv forkastningssone
            </text>

            {/* Hyposenter (Fokus) og Episenter */}
            {/* Hyposenter plassert langs forkastningen basert på dybde */}
            {(() => {
              const hypoX = 280 - (focalDepth / 80) * 100;
              const hypoY = 230 + (focalDepth / 80) * 190;
              const epiX = hypoX;
              const epiY = 230;
              const stnX = epiX + (epicenterDist / 400) * 520;
              const stnY = 230;

              return (
                <g>
                  {/* Vertikal linje fra fokus til episenter */}
                  <line x1={hypoX} y1={hypoY} x2={epiX} y2={epiY} stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />

                  {/* Bølgefronter fra fokus */}
                  {quakeTriggered && (
                    <g>
                      {/* P-bølger (raske, sfæriske) */}
                      <circle cx={hypoX} cy={hypoY} r="70" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.85" />
                      <circle cx={hypoX} cy={hypoY} r="130" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.65" />
                      <circle cx={hypoX} cy={hypoY} r="190" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.45" />

                      {/* S-bølger (langsommere, skjær) */}
                      <circle cx={hypoX} cy={hypoY} r="45" fill="none" stroke="#fb923c" strokeWidth="2.5" opacity="0.9" />
                      <circle cx={hypoX} cy={hypoY} r="85" fill="none" stroke="#fb923c" strokeWidth="2.5" opacity="0.75" />
                      <circle cx={hypoX} cy={hypoY} r="125" fill="none" stroke="#fb923c" strokeWidth="2" opacity="0.5" />

                      {/* Overflatebølger fra episenter */}
                      <path d={`M ${epiX - 80} 230 Q ${epiX - 40} 220 ${epiX} 230 Q ${epiX + 40} 240 ${epiX + 80} 230`} fill="none" stroke="#f43f5e" strokeWidth="3" />
                      <path d={`M ${epiX - 140} 230 Q ${epiX - 70} 215 ${epiX} 230 Q ${epiX + 70} 245 ${epiX + 140} 230`} fill="none" stroke="#f43f5e" strokeWidth="2.5" opacity="0.7" />
                    </g>
                  )}

                  {/* Hyposenter-stjerne */}
                  <circle cx={hypoX} cy={hypoY} r="9" fill="#ef4444" filter="url(#glowEffect)" />
                  <circle cx={hypoX} cy={hypoY} r="4" fill="#ffffff" />
                  <text x={hypoX - 12} y={hypoY + 18} fill="#fca5a5" fontSize="12" fontWeight="bold">
                    Fokus (hyposenter, {focalDepth} km dyp)
                  </text>

                  {/* Episenter på overflaten */}
                  <rect x={epiX - 6} y={epiY - 6} width="12" height="12" fill="#eab308" transform={`rotate(45 ${epiX} ${epiY})`} />
                  <text x={epiX} y={epiY - 14} fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Episenter
                  </text>

                  {/* Seismisk målestasjon */}
                  <polygon points={`${stnX},${stnY} ${stnX - 12},${stnY - 22} ${stnX + 12},${stnY - 22}`} fill="#10b981" />
                  <rect x={stnX - 3} y={stnY - 35} width="6" height="13" fill="#10b981" />
                  <circle cx={stnX} cy={stnY - 38} r="5" fill="#34d399" />
                  <text x={stnX} y={stnY - 46} fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Seismisk stasjon ({epicenterDist} km unna)
                  </text>

                  {/* Avstandspil mellom episenter og stasjon */}
                  <line x1={epiX} y1={epiY - 8} x2={stnX} y2={stnY - 8} stroke="#38bdf8" strokeWidth="1.8" />
                  <text x={(epiX + stnX) / 2} y={epiY - 14} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Δx = {epicenterDist} km
                  </text>
                </g>
              );
            })()}

            {/* SEISMOGRAM PANEL (ØVERST TIL HØYRE) */}
            <g transform="translate(480, 20)">
              <rect width="400" height="185" rx="8" fill="#090d14" stroke="#334155" strokeWidth="1.5" />
              <text x="15" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold">
                Sanntids Seismogram (Registrering ved stasjon)
              </text>
              <text x="15" y="42" fill="#94a3b8" fontSize="11">
                Hypocenteravstand: {hypDist.toFixed(0)} km · Beregnet Mw: {estMagnitude}
              </text>

              {/* Tidsakse */}
              <line x1="20" y1="110" x2="380" y2="110" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="20" y1="110" x2="380" y2="110" stroke="#334155" strokeDasharray="4 4" />

              {quakeTriggered ? (
                /* Aktivt seismogram med P-, S- og overflatebølger */
                <g>
                  {/* Bakgrunnsstøy */}
                  <path d="M 20 110 L 40 109 L 60 111 L 80 110 L 100 110" fill="none" stroke="#475569" strokeWidth="1.5" />

                  {/* P-bølge ankomst ved t ~ 100 */}
                  <path
                    d="M 100 110 L 106 100 L 112 120 L 118 102 L 124 118 L 130 106 L 136 114 L 142 108 L 148 112 L 154 110"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                  <line x1="100" y1="65" x2="100" y2="155" stroke="#38bdf8" strokeDasharray="3 3" />
                  <text x="100" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    P-bølge ({tP}s)
                  </text>

                  {/* S-bølge ankomst ved t ~ 180 */}
                  <path
                    d="M 175 110 L 182 85 L 190 135 L 198 88 L 206 132 L 214 95 L 222 125 L 230 100 L 238 120 L 246 110"
                    fill="none"
                    stroke="#fb923c"
                    strokeWidth="2.2"
                  />
                  <line x1="175" y1="65" x2="175" y2="155" stroke="#fb923c" strokeDasharray="3 3" />
                  <text x="175" y="60" fill="#fb923c" fontSize="11" fontWeight="bold" textAnchor="middle">
                    S-bølge ({tS}s)
                  </text>

                  {/* Δt tidsdifferanse klamme */}
                  <line x1="100" y1="145" x2="175" y2="145" stroke="#facc15" strokeWidth="1.8" />
                  <text x="137" y="160" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Δt = {deltaT} s
                  </text>

                  {/* Overflatebølger (Rayleigh & Love) ved t ~ 246 */}
                  <path
                    d="M 246 110 L 256 55 L 268 165 L 280 60 L 292 160 L 304 70 L 316 150 L 328 85 L 340 135 L 352 95 L 364 125 L 376 110"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.8"
                  />
                  <line x1="246" y1="65" x2="246" y2="155" stroke="#f43f5e" strokeDasharray="3 3" />
                  <text x="280" y="48" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Overflatebølger (størst amplitude)
                  </text>
                </g>
              ) : (
                <g>
                  <path d="M 20 110 Q 100 110 200 110 T 380 110" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <text x="200" y="114" fill="#64748b" fontSize="12" textAnchor="middle">
                    Ingen rystelse registrert. Trykk "Utløs forkastningsbrudd" nedenfor.
                  </text>
                </g>
              )}

              {/* Forklaring i foten av seismogrammet */}
              <rect x="15" y="165" width="370" height="1" fill="#1e293b" />
              <text x="15" y="178" fill="#64748b" fontSize="9">
                Hastigheter: Vp ≈ 6,0 km/s (kompresjon) | Vs ≈ 3,5 km/s (skjær) | V_surf ≈ 3,0 km/s
              </text>
            </g>
          </svg>
        )}
      </div>

      {/* FAGLIG UTFYLLENDE INFORMASJONSPANEL */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <ModelPanel>
          <div className="mb-2">
            <h4 className="font-semibold text-foreground text-sm">Fysisk og kjemisk drivkraft</h4>
            <p className="text-[11px] text-muted-foreground">Hvorfor oppstår reaksjonen?</p>
          </div>
          {scenario !== "earthquake_sim" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Polymerisering:</strong> Silikatmolekylene (SiO₄⁴⁻) danner
                lange kovalente nettverkskjeder når SiO₂-innholdet overstiger 60 %. Dette øker væskens viskositet
                med opptil <span className="font-semibold text-primary">en million ganger</span> sammenlignet med basalt!
              </p>
              <p>
                <strong className="text-foreground">Henrys lov & Eksolusjon:</strong> Ved stort dyp holdes vanndamp
                og CO₂ oppløst under hydrostatisk trykk. Når magmaen stiger og trykket faller, oppløses ikke gassen lenger
                og danner bobler (vesikler). I seig ryolittmagma kan ikke boblene unnslippe, noe som bygger opp et ekstremt overtrykk.
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Reids elastiske tilbakefjæring:</strong> Tektoniske plater presses
                mot hverandre, men friksjonen låser forkastningsflaten. Bergartene bøyes elastisk og lagrer mekanisk potensiell energi
                over tiår og århundrer.
              </p>
              <p>
                <strong className="text-foreground">Bruddkriterium:</strong> Når skjærspenningen overstiger bergartens
                skjærfasthet, brister kontakten i løpet av sekunder. Forskyvningen forplanter seg som seismiske bølger ut fra hyposenteret.
              </p>
            </div>
          )}
        </ModelPanel>

        <ModelPanel>
          <div className="mb-2">
            <h4 className="font-semibold text-foreground text-sm">Målinger og observasjoner</h4>
            <p className="text-[11px] text-muted-foreground">Hva ser forskere i felten?</p>
          </div>
          {scenario !== "earthquake_sim" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Utbruddsstil:</strong> {eruptionStyle.desc}
              </p>
              <p>
                <strong className="text-foreground">Vulkanovervåking:</strong> Økning i svoveldioksid (SO₂-fluks),
                grunne harmoniske skjelvinger (tremor fra magmabevegelse) og bakkeheving målt med tiltmetere og satellitt-InSAR.
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">P- og S-tidsdifferanse (Δt):</strong> Ved denne stasjonen ankommer
                P-bølgen etter <span className="font-mono text-primary font-bold">{tP} s</span> og S-bølgen etter{" "}
                <span className="font-mono text-primary font-bold">{tS} s</span>. Tidsgapet{" "}
                <span className="font-mono text-primary font-bold">Δt = {deltaT} s</span> gir direkte avstanden til jordskjelvet.
              </p>
              <p>
                <strong className="text-foreground">Triangulering:</strong> Én stasjon gir avstanden som en sirkel.
                To stasjoner gir to skjæringspunkter. Tre uavhengige seismografer peker ut det nøyaktige episenteret!
              </p>
            </div>
          )}
        </ModelPanel>

        <ModelPanel>
          <div className="mb-2">
            <h4 className="font-semibold text-foreground text-sm">Farer og samfunnsrisiko</h4>
            <p className="text-[11px] text-muted-foreground">Hva betyr dette for mennesker?</p>
          </div>
          {scenario !== "earthquake_sim" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Dominerende fare:</strong> {eruptionStyle.hazards}
              </p>
              <p>
                <strong className="text-foreground">Global påvirkning:</strong> Store eksplosive utbrudd sender svovelaerosoler
                inn i stratosfæren der de reflekterer sollys og gir global nedkjøling (f.eks. Tambora 1815 og Pinatubo 1991).
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Ødeleggende bølger:</strong> P- og S-bølger ryster grunnen, men det er
                overflatebølgene (Love og Rayleigh) med størst amplitude og lavest frekvens som får bygninger, broer og demninger til å kollapse.
              </p>
              <p>
                <strong className="text-foreground">Norsk risiko:</strong> Norge er et intraplate-område. Store skjelv er sjeldne,
                men historiske hendelser som Lurøyskjelvet (1819, M ~5,8) og Oslofjordskjelvet (1904, M 5,4) viser at beredskap og byggestandarder (Eurokode 8) er nødvendige.
              </p>
            </div>
          )}
        </ModelPanel>
      </div>

      <div className="mt-4">
        <ModelNote title="Pedagogisk nøkkelpoeng" tone="teal">
          Vulkanisme og jordskjelv er overflateuttrykk for jordens indre varmemaskin.
          Magmaens eksplosivitet styres mikroskopisk av kjemien i silikatpolymerene og gassens evne til å unnslippe. Jordskjelv
          representerer elastisk energi som plutselig frigjøres langs bruddsoner, der tidsforskjellen mellom de seismiske bølgene
          lar oss avbilde jordens indre lag med millimeterpresisjon.
        </ModelNote>
      </div>
    </ModelFrame>
  );
}
