import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type VolcanoScenario = "shield" | "stratovolcano" | "caldera" | "earthquake_sim" | "monitoring" | "tsunami_sim";

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

  // Kontroller for vulkanovervåking (Early Warning)
  const [monitorDay, setMonitorDay] = useState<number>(-4); // -30 til 0 dager
  const [seismicTremorRate, setSeismicTremorRate] = useState<number>(75); // 0-100%

  // Kontroller for tsunamisimulator
  const [tsunamiDepth, setTsunamiDepth] = useState<number>(3500); // 10 til 5000 m
  const [tsunamiDist, setTsunamiDist] = useState<number>(180); // km til kyst
  const [initWaveHeight, setInitWaveHeight] = useState<number>(2.5); // m

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
        type: "Sub-pliniansk / Pliniansk (f.eks. Vesuv, St. Helens, Eyjafjallajökull)",
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
  const hypDist = Math.sqrt(epicenterDist * epicenterDist + focalDepth * focalDepth);
  const tP = (hypDist / 6.0).toFixed(1);
  const tS = (hypDist / 3.5).toFixed(1);
  const deltaT = (parseFloat(tS) - parseFloat(tP)).toFixed(1);
  const estMagnitude = (3.0 + (faultStress / 100) * 4.8).toFixed(1);

  // Vulkanovervåking beregninger
  const calcMonitoringStatus = () => {
    const prog = 1 - Math.abs(monitorDay) / 30; // 0 til 1
    const tremorVal = Math.round(4 + prog * 96 * (seismicTremorRate / 100)); // um/s
    const upliftVal = (prog * 42.5).toFixed(1); // cm heving
    const so2Val = Math.round(180 + Math.pow(prog, 1.9) * 4800); // tonn/døgn

    let alertLevel = "GRØNN (Normaltilstand)";
    let alertColor = "text-emerald-400";
    let alertBg = "bg-emerald-500/10 border-emerald-500/30";
    let action = "Rutinemessig forskningsovervåking. Ingen spesielle tiltak.";

    if (monitorDay >= -14 && monitorDay < -6) {
      alertLevel = "GUL (Advarsel / Uro)";
      alertColor = "text-amber-400";
      alertBg = "bg-amber-500/10 border-amber-500/30";
      action = "Økt seismisk beredskap. Observasjonsflyvninger og varsling til luftfart (VONA).";
    } else if (monitorDay >= -6 && monitorDay < -1) {
      alertLevel = "ORANSJE (Magmaoppstigning / Høy fare)";
      alertColor = "text-orange-400";
      alertBg = "bg-orange-500/10 border-orange-500/30";
      action = "Forbered evakuering av 10 km faresone. Totalforbud mot opphold på fjellet.";
    } else if (monitorDay >= -1) {
      alertLevel = "RØD (UTBRUDD OVERHENGENDE / EVAKUER!)";
      alertColor = "text-rose-400 font-bold";
      alertBg = "bg-rose-500/10 border-rose-500/30 animate-pulse";
      action = "OBLIGATORISK FULL EVAKUERING av alle dalfører innen 25 km! Flyforbud innføres.";
    }

    return { tremorVal, upliftVal, so2Val, alertLevel, alertColor, alertBg, action };
  };

  const monitorStatus = calcMonitoringStatus();

  // Tsunamiberegninger (v = sqrt(g * d))
  const g = 9.81;
  const tsunamiSpeedMs = Math.sqrt(g * tsunamiDepth);
  const tsunamiSpeedKmh = Math.round(tsunamiSpeedMs * 3.6);
  const travelTimeMin = Math.round((tsunamiDist * 1000) / tsunamiSpeedMs / 60);
  const shoalingFactor = Math.pow(tsunamiDepth / 12, 0.25);
  const coastalHeight = (initWaveHeight * shoalingFactor).toFixed(1);

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
    } else if (sc === "monitoring") {
      setMonitorDay(-4);
      setSeismicTremorRate(85);
    } else if (sc === "tsunami_sim") {
      setTsunamiDepth(4000);
      setTsunamiDist(220);
      setInitWaveHeight(2.0);
    }
  };

  return (
    <ModelFrame
      kicker="Interaktiv vulkansk & geofysisk simulator"
      title="Magmakjemi, Utbruddsdynamikk, Seismogram og Geofarer"
      lead="Eksperimenter med magmakjemi (SiO₂, gass, temp), test utbruddstyper, tolk sanntids vulkanovervåking (tremor, GPS, SO₂), studer seismiske P- og S-bølger, eller beregn tsunamihastighet og oppstuing (shoaling)."
      toolbar={
        <div className="flex flex-wrap gap-1.5">
          <ModelTab active={scenario === "stratovolcano"} onClick={() => setScenarioPreset("stratovolcano")}>
            Stratovulkan (Subduksjon)
          </ModelTab>
          <ModelTab active={scenario === "shield"} onClick={() => setScenarioPreset("shield")}>
            Skjoldvulkan (Hotspot/Rift)
          </ModelTab>
          <ModelTab active={scenario === "caldera"} onClick={() => setScenarioPreset("caldera")}>
            Kaldera & Supervulkan
          </ModelTab>
          <ModelTab active={scenario === "monitoring"} onClick={() => setScenarioPreset("monitoring")}>
            Vulkanovervåking (Varsling)
          </ModelTab>
          <ModelTab active={scenario === "earthquake_sim"} onClick={() => setScenarioPreset("earthquake_sim")}>
            Jordskjelv & Seismogram
          </ModelTab>
          <ModelTab active={scenario === "tsunami_sim"} onClick={() => setScenarioPreset("tsunami_sim")}>
            Tsunamikalkulator (Shoaling)
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* KONTROLLPANEL FOR DE ULIKE SCENARIOENE */}
      {scenario === "shield" || scenario === "stratovolcano" || scenario === "caldera" ? (
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
      ) : scenario === "monitoring" ? (
        /* KONTROLLER FOR VULKANOVERVÅKING OG TIDLIG VARSLING */
        <div className="mb-6 grid gap-4 rounded-xl border border-border bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Tidslinje før utbrudd:</span>
              <span className="font-mono text-primary">
                {monitorDay === 0 ? "Dag 0 (Utbrudd i dag!)" : `Dag ${monitorDay}`}
              </span>
            </div>
            <input
              type="range"
              min={-30}
              max={0}
              step={1}
              value={monitorDay}
              onChange={(e) => setMonitorDay(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Skyv mot Dag 0 for å simulere økende magmapress i vulkanen.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Magmatilførsel / seismisk intensitet:</span>
              <span className="font-mono text-primary">{seismicTremorRate} %</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={seismicTremorRate}
              onChange={(e) => setSeismicTremorRate(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Hvor fort magma stiger opp fra mantelen og inn i jordskorpen.
            </p>
          </div>

          <div className="sm:col-span-2 flex flex-col justify-center rounded-lg border p-2.5 text-xs transition-colors border-border/80">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground text-xs">Vulkansk Farenivå (Alert Level):</span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${monitorStatus.alertColor} ${monitorStatus.alertBg}`}>
                {monitorStatus.alertLevel}
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground leading-tight">
              <strong>Sivilforsvarets tiltak:</strong> {monitorStatus.action}
            </p>
          </div>
        </div>
      ) : scenario === "earthquake_sim" ? (
        /* KONTROLLER FOR JORDSKJELVSIMULATOR */
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
      ) : (
        /* KONTROLLER FOR TSUNAMISIMULATOR */
        <div className="mb-6 grid gap-4 rounded-xl border border-border bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Havbunnens dybde (d):</span>
              <span className="font-mono text-primary">{tsunamiDepth} meter</span>
            </div>
            <input
              type="range"
              min={50}
              max={5000}
              step={50}
              value={tsunamiDepth}
              onChange={(e) => setTsunamiDepth(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Fart v = √(g·d). Dypere vann = ekstrem bølgehastighet!
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Avstand til kysten:</span>
              <span className="font-mono text-primary">{tsunamiDist} km</span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={tsunamiDist}
              onChange={(e) => setTsunamiDist(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Beregnet varslingstid: {travelTimeMin} minutter.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Vertikal forskyvning:</span>
              <span className="font-mono text-primary">{initWaveHeight.toFixed(1)} meter</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={10.0}
              step={0.5}
              value={initWaveHeight}
              onChange={(e) => setInitWaveHeight(Number(e.target.value))}
              className="mt-2 w-full accent-primary cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Forkastningssprang eller skredvolum (Storegga/Åknes).
            </p>
          </div>

          <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-2.5 text-xs">
            <span className="font-semibold text-sky-400 block">Kyst-bølgehøyde (Shoaling):</span>
            <span className="font-mono text-base font-extrabold text-foreground">{coastalHeight} m</span>
            <span className="text-[10px] text-muted-foreground block">
              Fart i dypet: {tsunamiSpeedKmh} km/t ({tsunamiSpeedMs.toFixed(0)} m/s)
            </span>
          </div>
        </div>
      )}

      {/* SVG VISUALISERING */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-slate-950 p-2 shadow-inner">
        {scenario === "monitoring" ? (
          /* VULKANOVERVÅKING OG SANNTIDS VARSLING */
          <svg viewBox="0 0 900 460" className="w-full h-auto select-none">
            <defs>
              <linearGradient id="monSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#090f18" />
                <stop offset="100%" stopColor="#172635" />
              </linearGradient>
              <linearGradient id="monRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#29221b" />
                <stop offset="100%" stopColor="#140f0c" />
              </linearGradient>
              <radialGradient id="magmaRiseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff4400" stopOpacity="1" />
                <stop offset="60%" stopColor="#e11d48" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#7a0000" stopOpacity="0" />
              </radialGradient>
              <filter id="monGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Himmel og fjellprofil */}
            <rect x="0" y="0" width="900" height="460" fill="url(#monSky)" />
            <rect x="0" y="270" width="460" height="190" fill="url(#monRock)" />

            {/* Vulkanfjellet (venstre side) */}
            {(() => {
              const prog = 1 - Math.abs(monitorDay) / 30; // 0 til 1
              const inflationPx = prog * 14;
              const magmaHeadY = 380 - prog * 160;

              return (
                <g>
                  {/* Bakgrunnsfjell */}
                  <path d="M 0 270 L 60 210 L 140 250 L 230 150 L 320 240 L 460 270 Z" fill="#1e293b" opacity="0.5" />

                  {/* Inflasjons-stiplet profil (referanse) */}
                  <path
                    d="M 30 270 L 230 140 L 430 270 Z"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Faktisk fjellkropp (hever seg ved magmaopptrenging) */}
                  <path
                    d={`M 30 270 Q 130 ${210 - inflationPx} 220 ${140 - inflationPx} L 240 ${140 - inflationPx} Q 330 ${210 - inflationPx} 430 270 Z`}
                    fill="#332a24"
                    stroke="#785c4b"
                    strokeWidth="2.5"
                  />

                  {/* Fjellflanke GPS heving-vektorer */}
                  <g>
                    <line x1="140" y1={210 - inflationPx} x2="135" y2={185 - inflationPx * 1.6} stroke="#38bdf8" strokeWidth="2.5" />
                    <polygon points={`135,${180 - inflationPx * 1.6} 130,${190 - inflationPx * 1.6} 140,${190 - inflationPx * 1.6}`} fill="#38bdf8" />
                    <line x1="320" y1={210 - inflationPx} x2="325" y2={185 - inflationPx * 1.6} stroke="#38bdf8" strokeWidth="2.5" />
                    <polygon points={`325,${180 - inflationPx * 1.6} 320,${190 - inflationPx * 1.6} 330,${190 - inflationPx * 1.6}`} fill="#38bdf8" />
                    <text x="135" y={170 - inflationPx * 1.6} fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                      GNSS +{monitorStatus.upliftVal} cm
                    </text>
                  </g>

                  {/* Magmakammer i dypet */}
                  <ellipse cx="230" cy="400" rx={85 + prog * 20} ry={35 + prog * 12} fill="url(#magmaRiseGlow)" filter="url(#monGlow)" />
                  <ellipse cx="230" cy="400" rx={60 + prog * 15} ry={25 + prog * 8} fill="#ff5500" />
                  <text x="230" y="405" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Magmakammer (oppblåsing)
                  </text>

                  {/* Magmatilførsel og oppstigende diapir */}
                  <path d={`M 223 400 L 223 ${magmaHeadY} H 237 L 237 400 Z`} fill="#ff3700" />
                  <ellipse cx="230" cy={magmaHeadY} rx="14" ry="10" fill="#ffcc00" filter="url(#monGlow)" />

                  {/* Seismiske sverm-episentre (harmonisk tremor) */}
                  {Array.from({ length: Math.min(18, Math.round(4 + prog * 14)) }).map((_, i) => {
                    const sx = 230 + (Math.sin(i * 2.3) * (25 + prog * 35));
                    const sy = 390 - (i * 12 + Math.cos(i * 1.7) * 15);
                    return (
                      <circle key={i} cx={sx} cy={sy} r="3.5" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" filter="url(#monGlow)" />
                    );
                  })}

                  {/* DOAS Gass-målestasjon og gassfane */}
                  <ellipse cx="230" cy={135 - inflationPx} rx="12" ry="4" fill="#1c1917" />
                  {/* Gassfaner (større ved høyere SO2) */}
                  <path
                    d={`M 230 ${135 - inflationPx} Q ${260 + prog * 30} ${100 - prog * 20} ${290 + prog * 40} ${60 - prog * 25}`}
                    fill="none"
                    stroke="#fef08a"
                    strokeWidth={4 + prog * 8}
                    opacity="0.6"
                    strokeLinecap="round"
                  />
                  <text x="320" y="55" fill="#fef08a" fontSize="10" fontWeight="bold">
                    SO₂-fane: {monitorStatus.so2Val} t/d
                  </text>

                  {/* DOAS spektrometer på bakken */}
                  <rect x="360" y={250} width="16" height="12" fill="#10b981" rx="2" />
                  <line x1="368" y1="250" x2="310" y2="65" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="368" y="276" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    DOAS spektrometer
                  </text>
                </g>
              );
            })()}

            {/* MåLEINSTRUMENT-DASHBOARD (HØYRE SIDE) */}
            <g transform="translate(470, 16)">
              {/* Vulkansk varslingsnivå banner */}
              <rect width="415" height="46" rx="8" fill="#0f172a" stroke="#334155" />
              <text x="14" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">
                CIVIL PROTECTION & AVIATION ALERT (ICAO):
              </text>
              <text x="14" y="38" className={`text-sm font-extrabold ${monitorStatus.alertColor}`}>
                {monitorStatus.alertLevel}
              </text>

              {/* Instrument 1: Harmonisk Tremor (Seismogram) */}
              <g transform="translate(0, 56)">
                <rect width="415" height="110" rx="8" fill="#090d16" stroke="#1e293b" />
                <text x="14" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  1. Harmonisk Tremor (Turbulent magmastrømning)
                </text>
                <text x="395" y="20" fill="#38bdf8" fontSize="11" fontWeight="mono" textAnchor="end">
                  {monitorStatus.tremorVal} µm/s
                </text>

                {/* Seismogram bølgeform */}
                <line x1="14" y1="65" x2="400" y2="65" stroke="#1e293b" />
                {(() => {
                  const amp = (monitorStatus.tremorVal / 100) * 35;
                  const pts: string[] = [];
                  for (let x = 14; x <= 400; x += 4) {
                    const noise = Math.sin(x * 0.25) * Math.cos(x * 0.08) * amp + (Math.random() - 0.5) * (amp * 0.4);
                    pts.push(`${x},${65 + noise}`);
                  }
                  return (
                    <polyline
                      points={pts.join(" ")}
                      fill="none"
                      stroke={monitorStatus.tremorVal > 60 ? "#f43f5e" : "#38bdf8"}
                      strokeWidth="1.8"
                    />
                  );
                })()}
                <text x="14" y="100" fill="#64748b" fontSize="9">
                  Kontinuerlig lavfrekvent risting (1–5 Hz) varsler om magma i bevegelse gjennom sprekker.
                </text>
              </g>

              {/* Instrument 2: GNSS Bakkedeformasjon */}
              <g transform="translate(0, 176)">
                <rect width="415" height="110" rx="8" fill="#090d16" stroke="#1e293b" />
                <text x="14" y="20" fill="#34d399" fontSize="11" fontWeight="bold">
                  2. GNSS Vertikal Bakkedeformasjon (Inflasjon)
                </text>
                <text x="395" y="20" fill="#34d399" fontSize="11" fontWeight="mono" textAnchor="end">
                  +{monitorStatus.upliftVal} cm
                </text>

                {/* Hevingskurve over tid */}
                <line x1="20" y1="85" x2="395" y2="85" stroke="#1e293b" />
                <line x1="20" y1="28" x2="20" y2="85" stroke="#1e293b" />
                {(() => {
                  const pts: string[] = [];
                  const w = 375;
                  const prog = 1 - Math.abs(monitorDay) / 30;
                  for (let i = 0; i <= 30; i++) {
                    const tNorm = i / 30;
                    const x = 20 + tNorm * w;
                    const h = Math.pow(tNorm, 2.2) * 50 * (prog);
                    pts.push(`${x},${85 - h}`);
                  }
                  return (
                    <polyline
                      points={pts.join(" ")}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2.5"
                    />
                  );
                })()}
                <circle cx={20 + (1 - Math.abs(monitorDay) / 30) * 375} cy={85 - (parseFloat(monitorStatus.upliftVal) / 42.5) * 50} r="4" fill="#6ee7b7" />
                <text x="14" y="100" fill="#64748b" fontSize="9">
                  Mogu-modell: Bakkedeformasjon skyldes volumøkning i magmakammer på 4–8 km dyp.
                </text>
              </g>

              {/* Instrument 3: SO₂ Gassfluks (DOAS) */}
              <g transform="translate(0, 296)">
                <rect width="415" height="135" rx="8" fill="#090d16" stroke="#1e293b" />
                <text x="14" y="20" fill="#facc15" fontSize="11" fontWeight="bold">
                  3. Svoveldioksid-utslipp (SO₂ UV-spektrometri)
                </text>
                <text x="395" y="20" fill="#facc15" fontSize="11" fontWeight="mono" textAnchor="end">
                  {monitorStatus.so2Val} tonn/døgn
                </text>

                {/* Gass-søylediagram */}
                <rect x="20" y="42" width="375" height="20" fill="#1e293b" rx="4" />
                <rect
                  x="20"
                  y="42"
                  width={Math.min(375, (monitorStatus.so2Val / 5000) * 375)}
                  height="20"
                  fill={monitorStatus.so2Val > 2500 ? "#f43f5e" : "#facc15"}
                  rx="4"
                />
                <line x1={20 + (1000 / 5000) * 375} y1="38" x2={20 + (1000 / 5000) * 375} y2="66" stroke="#94a3b8" strokeWidth="1.5" />
                <text x={20 + (1000 / 5000) * 375} y="34" fill="#94a3b8" fontSize="8" textAnchor="middle">Uro (1000 t/d)</text>

                <line x1={20 + (3000 / 5000) * 375} y1="38" x2={20 + (3000 / 5000) * 375} y2="66" stroke="#f43f5e" strokeWidth="1.5" />
                <text x={20 + (3000 / 5000) * 375} y="34" fill="#f43f5e" fontSize="8" textAnchor="middle">Kritisk (3000 t/d)</text>

                <p className="text-[10px] text-muted-foreground mt-2">
                  <text x="14" y="86" fill="#94a3b8" fontSize="10">
                    Tiltak: {monitorStatus.action}
                  </text>
                </p>
                <text x="14" y="118" fill="#64748b" fontSize="9">
                  Kraftig stigning i SO₂ bekrefter at fersk magma når overflatenære dyp hvor gassen eksolveres.
                </text>
              </g>
            </g>
          </svg>
        ) : scenario === "tsunami_sim" ? (
          /* TSUNAMI KALKULATOR OG BØLGEOPPSTUING (SHOALING) */
          <svg viewBox="0 0 900 460" className="w-full h-auto select-none">
            <defs>
              <linearGradient id="tsuSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#081426" />
                <stop offset="100%" stopColor="#1e3a5f" />
              </linearGradient>
              <linearGradient id="deepWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="shelfRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#382e25" />
                <stop offset="100%" stopColor="#1a140f" />
              </linearGradient>
            </defs>

            {/* Himmel */}
            <rect x="0" y="0" width="900" height="460" fill="url(#tsuSky)" />

            {/* Havbunnens batymetri (Dypbasseng -> Kontinentalskråning -> Kystsokkel) */}
            {(() => {
              // Dypdeprofil
              const deepFloorY = 380;
              const coastX = 760;
              const coastY = 220;
              const surgeH = Math.min(120, parseFloat(coastalHeight) * 7.5);

              return (
                <g>
                  {/* Fjell og kystlinje til høyre */}
                  <path
                    d={`M 0 ${deepFloorY} L 360 ${deepFloorY} L 580 270 L ${coastX} ${coastY} L 900 210 L 900 460 L 0 460 Z`}
                    fill="url(#shelfRock)"
                    stroke="#574636"
                    strokeWidth="2"
                  />

                  {/* Forkastningsbrudd på havbunnen (jordskjelvsenter) */}
                  <g transform="translate(100, 380)">
                    <line x1="-30" y1="0" x2="30" y2="0" stroke="#f43f5e" strokeWidth="4" />
                    <line x1="0" y1="-20" x2="0" y2="30" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4 3" />
                    <polygon points="0,-25 -8,-12 8,-12" fill="#ef4444" />
                    <text x="0" y="-30" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Forkastningssprang (+{initWaveHeight} m)
                    </text>
                  </g>

                  {/* Vannsøyle */}
                  <path
                    d={`M 0 210 Q 140 ${210 - initWaveHeight * 2} 240 210 Q 380 210 520 210 Q 640 205 680 ${210 - surgeH * 0.4} Q ${coastX - 30} ${210 - surgeH} ${coastX} ${coastY} L ${coastX} ${coastY} L 580 270 L 360 ${deepFloorY} L 0 ${deepFloorY} Z`}
                    fill="url(#deepWater)"
                  />

                  {/* Bølgefront i dypet (Lav amplitude, ekstrem hastighet) */}
                  <path
                    d="M 60 210 Q 150 204 240 210"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                  />
                  <line x1="150" y1="195" x2="210" y2="195" stroke="#38bdf8" strokeWidth="2" />
                  <polygon points="215,195 205,190 205,200" fill="#38bdf8" />
                  <text x="180" y="185" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                    v = √(g·d) = {tsunamiSpeedKmh} km/t
                  </text>
                  <text x="180" y="240" fill="#e0f2fe" fontSize="10" textAnchor="middle">
                    Dyp: d = {tsunamiDepth} m · Bølgelengde λ ~ 150 km
                  </text>

                  {/* Tilbaketrekning like foran kysten (drawback) */}
                  <path
                    d={`M 660 210 Q 710 ${210 + surgeH * 0.25} ${coastX - 40} ${210 - surgeH * 0.2}`}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text x="690" y="240" fill="#fef08a" fontSize="10" fontWeight="bold">
                    Havet trekker seg tilbake! ⚠
                  </text>

                  {/* Shoaling kystbølge (oppstuing: enorm vannvegg) */}
                  <path
                    d={`M ${coastX - 60} 210 Q ${coastX - 30} ${210 - surgeH * 1.1} ${coastX - 10} ${210 - surgeH} Q ${coastX} ${210 - surgeH * 0.7} ${coastX + 25} ${coastY - 10}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                  />
                  {/* Skum og brytende bølgetopp */}
                  <circle cx={coastX - 10} cy={210 - surgeH} r="6" fill="#ffffff" />
                  <circle cx={coastX + 5} cy={210 - surgeH * 0.85} r="5" fill="#e0f2fe" />
                  <circle cx={coastX + 18} cy={210 - surgeH * 0.7} r="4" fill="#bae6fd" />

                  {/* Målelinje for kysthøyde */}
                  <line x1={coastX + 45} y1={coastY} x2={coastX + 45} y2={210 - surgeH} stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                  <text x={coastX + 55} y={215 - surgeH / 2} fill="#f43f5e" fontSize="13" fontWeight="bold">
                    H = {coastalHeight} m!
                  </text>

                  {/* Kystlandsby og trær på land */}
                  {/* Hus 1 */}
                  <rect x={coastX + 40} y={coastY - 24} width="22" height="18" fill="#e2e8f0" />
                  <polygon points={`${coastX + 37},${coastY - 24} ${coastX + 51},${coastY - 36} ${coastX + 65},${coastY - 24}`} fill="#dc2626" />
                  {/* Hus 2 (oversvømmes ved høy tsunami) */}
                  <rect x={coastX + 75} y={coastY - 30} width="24" height="20" fill="#f8fafc" />
                  <polygon points={`${coastX + 72},${coastY - 30} ${coastX + 87},${coastY - 44} ${coastX + 102},${coastY - 30}`} fill="#2563eb" />
                  {/* Fyrlykt på høyden */}
                  <polygon points="870,210 862,140 878,140" fill="#ffffff" stroke="#94a3b8" />
                  <rect x="862" y="132" width="16" height="8" fill="#dc2626" />
                  <circle cx="870" cy="128" r="5" fill="#fef08a" />
                  <text x="870" y="118" fill="#fef08a" fontSize="9" textAnchor="middle">Sikker sone &gt; 30 m</text>

                  {/* Avstandslinje fra arnested til kyst */}
                  <line x1="100" y1="435" x2={coastX} y2="435" stroke="#94a3b8" strokeWidth="1.5" />
                  <polygon points="100,435 110,430 110,440" fill="#94a3b8" />
                  <polygon points={`${coastX},435 ${coastX - 10},430 ${coastX - 10},440`} fill="#94a3b8" />
                  <text x={(100 + coastX) / 2} y="430" fill="#f1f5f9" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Total avstand: {tsunamiDist} km · Varslingstid før treff: {travelTimeMin} minutter
                  </text>
                </g>
              );
            })()}

            {/* FORMELPANEL (ØVERST) */}
            <g transform="translate(20, 20)">
              <rect width="360" height="95" rx="8" fill="#090d16" stroke="#1e293b" />
              <text x="14" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold">
                Tsunamifysikk: Greens lov
              </text>
              <text x="14" y="44" fill="#f1f5f9" fontSize="11">
                Fart: v = √(g · d) = √({g} · {tsunamiDepth}) = <tspan fill="#38bdf8" fontWeight="bold">{tsunamiSpeedKmh} km/t</tspan>
              </text>
              <text x="14" y="64" fill="#f1f5f9" fontSize="11">
                Shoaling: H₂ = H₁ · (d₁ / d₂)¼ = <tspan fill="#f43f5e" fontWeight="bold">{coastalHeight} m</tspan>
              </text>
              <text x="14" y="84" fill="#94a3b8" fontSize="10">
                Når dypet faller bremses fronten, bølgelengden krymper og energien presses opp!
              </text>
            </g>
          </svg>
        ) : scenario !== "earthquake_sim" ? (
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
          {scenario === "monitoring" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Dekompresjon og avgassing:</strong> Når magma migrerer oppover fra 10–20 km dyp,
                faller det hydrostatiske trykket. Oppløste gasser (H₂O, CO₂, SO₂) danner gassbobler (eksolsjon) som øker volumet og det hydrauliske trykket mot sidebergartene.
              </p>
              <p>
                <strong className="text-foreground">Mogi-inflasjonsmodell:</strong> Trykkøkningen i det elastiske reservoaret får
                overliggende fjelloverflate til å bøye seg oppover (heving) og til sidene, målbart med millimeterpresisjon via GNSS og satellitt-radar (InSAR).
              </p>
            </div>
          ) : scenario === "tsunami_sim" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Vertikal vannforskyvning:</strong> Tsunamier skapes når et stort volum vann plutselig
                løftes eller senkes. Dette skjer ved megathrust-jordskjelv i subduksjonssoner, massive undersjøiske skred (f.eks. Storeggaskredet) eller kalderakollaps i havet.
              </p>
              <p>
                <strong className="text-foreground">Ekstrem bølgelengde:</strong> Med bølgelengder på 100–300 km oppfører tsunamien seg
                som en grunntvannsbølge selv over 4000 meters dyp, fordi bølgelengden er mye større enn havdybden ($\lambda \gg d$).
              </p>
            </div>
          ) : scenario !== "earthquake_sim" ? (
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
          {scenario === "monitoring" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Harmonisk tremor:</strong> I motsetning til vanlige skarpbrytende jordskjelv,
                viser tremor en kontinuerlig lavfrekvent sinusformet resonans (1–5 Hz). Dette er den akustiske signaturen til magma og gasser som strømmer turbulent gjennom sprekker.
              </p>
              <p>
                <strong className="text-foreground">DOAS & Multi-GAS:</strong> Differensiell optisk absorpsjonsspektrometri måler
                svoveldioksid (SO₂). Kraftig økning i SO₂/CO₂-forholdet er et sikkert tegn på at magmaen er få kilometer fra overflaten.
              </p>
            </div>
          ) : scenario === "tsunami_sim" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Greens lov og Shoaling:</strong> I åpent hav har bølgen liten amplitude (&lt; 1 m) og
                passerer umerkelig under skip. Når bølgen treffer kontinentalsokkelen synker farten fra ~800 km/t til ~40 km/t. Energibevaring tvinger da bølgelengden til å krympe og vannet presses vertikalt opp:
                $H_2 = H_1 \cdot (d_1 / d_2)^{0.25}$.
              </p>
              <p>
                <strong className="text-foreground">Tilbaketrekning (Drawback):</strong> Hvis bølgedalen ankommer først, suger kysten
                til seg vann og tørrlegger havbunnen flere hundre meter utover minutter før vannveggen slår inn.
              </p>
            </div>
          ) : scenario !== "earthquake_sim" ? (
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
          {scenario === "monitoring" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Varslingskoder (VONA):</strong> Vulkanobservatorier opererer med fargekoder:
                Grønn (hvile), Gul (uro), Oransje (magmaoppstigning) og Rød (utbrudd nært forestående eller i gang med askeutslipp til luftfart).
              </p>
              <p>
                <strong className="text-foreground">Evakuering og livredning:</strong> Ved Pinatubo (1991) reddet tidlig varsling basert på
                seismikk og SO₂ titusenvis av menneskeliv. Ved Reykjanes på Island (2021–2024) ga bakkedeformasjon tid til å evakuere Grindavík og bygge beskyttelsesvoller.
              </p>
            </div>
          ) : scenario === "tsunami_sim" ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Norsk sårbarhet (Åkneset / Tafjord):</strong> I bratte norske vestlandsfjorder
                kan fjellskred utløse lokale kjempetsunamier. Tafjord-ulykken i 1934 krevde 40 menneskeliv (oppskylling 62 moh). Åkneset overvåkes derfor døgnkontinuerlig med radar og seismikk.
              </p>
              <p>
                <strong className="text-foreground">Varslingssystemer (DART):</strong> I Stillehavet og Atlanteren registrerer
                bunnmonterte trykksensorer (DART-bøyer) tsunamibølger i sanntid og gir kystbefolkningen livsviktige minutter og timer til å evakuere opp i høyden (&gt; 30 moh).
              </p>
            </div>
          ) : scenario !== "earthquake_sim" ? (
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
