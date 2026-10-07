import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAnimationPlaying } from "@/components/diagrams/use-motion";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type VolcanoScenario = "shield" | "stratovolcano" | "cinder" | "caldera" | "earthquake_sim" | "monitoring" | "tsunami_sim";

function nb1(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

function viscosityShort(label: string): string {
  const paren = label.indexOf(" (");
  return paren === -1 ? label : label.slice(0, paren);
}

/** Jordskjelv- og tsunamimoduser beholdes i koden, men skjules på Vulkaner-siden. */
export function VolcanoModel({ showSeismicModes = false }: { showSeismicModes?: boolean } = {}) {
  const [scenario, setScenario] = useState<VolcanoScenario>("stratovolcano");

  // Kontroller for vulkan-simulering
  const [sio2, setSio2] = useState<number>(62); // 48% (basalt) til 73% (ryolitt)
  const [gasContent, setGasContent] = useState<number>(4.2); // 0.5% til 6.0% H2O/CO2
  const [temp, setTemp] = useState<number>(950); // 750 C til 1200 C
  const eruptionMotion = useAnimationPlaying();
  const isErupting = eruptionMotion.playing;

  // Kontroller for jordskjelv-simulering
  const [faultStress, setFaultStress] = useState<number>(65); // 0-100%
  const [epicenterDist, setEpicenterDist] = useState<number>(120); // km fra stasjon
  const [focalDepth, setFocalDepth] = useState<number>(15); // km
  const [quakeTriggered, setQuakeTriggered] = useState<boolean>(false);

  // Kontroller for vulkanovervåking
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
    const tempShift = ((temp - 950) / 500) * 16;
    const score = (sio2 - 45) * 1.5 + gasContent * 12 - tempShift;
    if (score < 40) {
      return {
        draw: "effusive" as const,
        type: "Hawaiisk / Effusiv",
        vei: "VEI 0–1",
        desc: "Rolige lavastrømmer og lavafontener. Lav viskositet lar gassbobler unnslippe uten å sprenge smelten i fillebiter.",
        hazards: "Lavastrømmer ødelegger infrastruktur, men mennesker rekker normalt å evakuere til fots.",
        color: "#f59e0b",
      };
    } else if (score < 75) {
      return {
        draw: "strombolian" as const,
        type: "Stromboliansk / Vulkansk",
        vei: "VEI 2–3",
        desc: "Periodiske eksplosjoner, lavabomber og moderate askesøyler.",
        hazards: "Tefra-nedfall, brann og giftige gasser i nærområdet.",
        color: "#f97316",
      };
    } else if (score < 110) {
      return {
        draw: "plinian" as const,
        type: "Sub-pliniansk / Pliniansk (f.eks. Vesuv, St. Helens, Eyjafjallajökull)",
        vei: "VEI 4–5",
        desc: "Vedvarende gassutblåsning med konvektiv askesøyle inn i stratosfæren. Seig magma fragmenteres til pimpstein og fin aske.",
        hazards: "Pyroklastiske tetthetsstrømmer i 200–700 km/t, askenedfall og laharer.",
        color: "#ef4444",
      };
    } else {
      return {
        draw: "ultra" as const,
        type: "Ultra-pliniansk / kalderautbrudd",
        vei: "VEI 6–8",
        desc: "Et stort magmakammer tømmes. Taket kollapser og danner en kaldera. SO₂-aerosoler kan påvirke klimaet.",
        hazards: "Askelag over store områder og nedkjøling i flere år.",
        color: "#b91c1c",
      };
    }
  };

  const eruptionStyle = calcEruptionStyle();
  const shownStyle =
    scenario === "cinder"
      ? {
          draw: "cinder" as const,
          type: "Sinderkjegle",
          vei: "Kort, gassdrevet utbrudd",
          desc: "Lavafontener kaster slagg og sinder opp i lufta. Fragmentene størkner i flukten og bygger en bratt haug rundt åpningen, sjelden over 300–400 meter, med krater i toppen.",
          hazards: "Slagg og sinder samler seg rundt åpningen. Parícutin i Mexico vokste opp på en åker i 1943.",
          color: "#f97316",
        }
      : eruptionStyle;

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
      action = "Forbered evakuering av nærområdet. Steng fjellet for ferdsel.";
    } else if (monitorDay >= -1) {
      alertLevel = "RØD (utbrudd nært forestående)";
      alertColor = "text-rose-400 font-bold";
      alertBg = "bg-rose-500/10 border-rose-500/30";
      action = "Evakuer dalene rundt vulkanen. Innfør flyforbud.";
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
    } else if (sc === "cinder") {
      setSio2(50);
      setGasContent(2.4);
      setTemp(1120);
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
      stackToolbar
      kicker="Interaktiv vulkansimulator"
      title="Magmakjemi, utbruddsdynamikk og geofarer"
      lead="Prøv hvordan silikat (SiO₂), gass og temperatur styrer utbruddet, og hvordan overvåking med tremor, GNSS og SO₂ brukes til varsling."
      toolbar={
        <div className="flex flex-wrap gap-1.5">
          <ModelTab active={scenario === "stratovolcano"} onClick={() => setScenarioPreset("stratovolcano")}>
            Stratovulkan (subduksjon)
          </ModelTab>
          <ModelTab active={scenario === "cinder"} onClick={() => setScenarioPreset("cinder")}>
            Sinderkjegle
          </ModelTab>
          <ModelTab active={scenario === "shield"} onClick={() => setScenarioPreset("shield")}>
            Skjoldvulkan (hotspot/rift)
          </ModelTab>
          <ModelTab active={scenario === "caldera"} onClick={() => setScenarioPreset("caldera")}>
            Kaldera
          </ModelTab>
          <ModelTab active={scenario === "monitoring"} onClick={() => setScenarioPreset("monitoring")}>
            Vulkanovervåking
          </ModelTab>
          {showSeismicModes ? (
            <>
              <ModelTab active={scenario === "earthquake_sim"} onClick={() => setScenarioPreset("earthquake_sim")}>
                Jordskjelv og seismogram
              </ModelTab>
              <ModelTab active={scenario === "tsunami_sim"} onClick={() => setScenarioPreset("tsunami_sim")}>
                Tsunamikalkulator (oppstuing)
              </ModelTab>
            </>
          ) : null}
        </div>
      }
    >
      <ModelMarkers />

      {/* KONTROLLPANEL FOR DE ULIKE SCENARIOENE */}
      {scenario === "shield" || scenario === "stratovolcano" || scenario === "cinder" || scenario === "caldera" ? (
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
              aria-label="Silikatinnhold"
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
              <span className="font-mono text-primary">{nb1(gasContent)} vekt-%</span>
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
              {gasContent < 2 ? "Lavt drivtrykk" : gasContent < 4 ? "Moderat drivtrykk" : "Høyt drivtrykk"}
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
              onClick={eruptionMotion.toggle}
              className="w-full text-xs font-semibold"
            >
              {isErupting ? "⏸ Pause animasjon" : "▶ Start animasjon"}
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
                {monitorDay === 0 ? "Dag 0 (utbrudd)" : `Dag ${monitorDay}`}
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
              <span className="font-semibold text-foreground text-xs">Vulkansk farenivå:</span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${monitorStatus.alertColor} ${monitorStatus.alertBg}`}>
                {monitorStatus.alertLevel}
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground leading-tight">
              <strong>Tiltak:</strong> {monitorStatus.action}
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
                      GNSS +{monitorStatus.upliftVal.replace(".", ",")} cm
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
                    Gassmåler
                  </text>
                </g>
              );
            })()}

            {/* MåLEINSTRUMENT-DASHBOARD (HØYRE SIDE) */}
            <g transform="translate(470, 16)">
              {/* Vulkansk varslingsnivå banner */}
              <rect width="415" height="46" rx="8" fill="#0f172a" stroke="#334155" />
              <text x="14" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Varsel til befolkning og luftfart (ICAO):
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
                  Kontinuerlig lavfrekvent risting varsler om magma i bevegelse gjennom sprekker.
                </text>
              </g>

              {/* Instrument 2: GNSS Bakkedeformasjon */}
              <g transform="translate(0, 176)">
                <rect width="415" height="110" rx="8" fill="#090d16" stroke="#1e293b" />
                <text x="14" y="20" fill="#34d399" fontSize="11" fontWeight="bold">
                  2. GNSS Vertikal Bakkedeformasjon (Inflasjon)
                </text>
                <text x="395" y="20" fill="#34d399" fontSize="11" fontWeight="mono" textAnchor="end">
                  +{monitorStatus.upliftVal.replace(".", ",")} cm
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
                  Bakken hever seg når magmakammeret fylles.
                </text>
              </g>

              {/* Instrument 3: SO₂ Gassfluks (DOAS) */}
              <g transform="translate(0, 296)">
                <rect width="415" height="135" rx="8" fill="#090d16" stroke="#1e293b" />
                <text x="14" y="20" fill="#facc15" fontSize="11" fontWeight="bold">
                  3. Svoveldioksid-utslipp (SO₂)
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
                  Kraftig stigning i SO₂ tyder på at magmaen er nær overflaten, der gassen skilles ut (eksolusjon).
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
          <svg
            viewBox="0 0 900 460"
            className={`h-auto w-full select-none ${eruptionMotion.motionClass}`}
            data-eruption-style={shownStyle.draw}
            data-has-umbrella={shownStyle.draw === "plinian" || shownStyle.draw === "ultra" ? "yes" : "no"}
            data-playing={isErupting ? "yes" : "no"}
          >
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

            <style>{`
              .vm-lava { stroke-dasharray: 18 12; animation: vm-lava 1.4s linear infinite; animation-play-state: ${isErupting ? "running" : "paused"}; }
              .vm-fountain, .vm-plume { transform-box: fill-box; transform-origin: center bottom; animation-play-state: ${isErupting ? "running" : "paused"}; }
              .vm-fountain { animation: vm-fountain 0.8s ease-in-out infinite; }
              .vm-plume { animation: vm-plume 2.2s ease-in-out infinite; }
              .vm-umbrella { transform-box: fill-box; transform-origin: center; animation: vm-umbrella 4s ease-in-out infinite; animation-play-state: ${isErupting ? "running" : "paused"}; }
              .vm-pdc { stroke-dasharray: 10 8; animation: vm-pdc 0.9s linear infinite; animation-play-state: ${isErupting ? "running" : "paused"}; }
              .vm-particle { animation: vm-rise 2.4s ease-out infinite; animation-play-state: ${isErupting ? "running" : "paused"}; }
              .vm-bolt { animation: vm-bolt 1.6s steps(2, end) infinite; animation-play-state: ${isErupting ? "running" : "paused"}; }
              @keyframes vm-lava { to { stroke-dashoffset: -60; } }
              @keyframes vm-fountain { 0%, 100% { transform: translateY(0) scaleY(0.9); } 50% { transform: translateY(-12px) scaleY(1.12); } }
              @keyframes vm-plume { 0%, 100% { transform: scaleY(0.94); } 50% { transform: scaleY(1.06); } }
              @keyframes vm-umbrella { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
              @keyframes vm-pdc { to { stroke-dashoffset: -36; } }
              @keyframes vm-rise { 0% { transform: translateY(0) scale(1); opacity: 0.85; } 100% { transform: translateY(-56px) scale(1.35); opacity: 0.1; } }
              @keyframes vm-bolt { 0%, 60% { opacity: 0.15; } 70%, 100% { opacity: 1; } }
            `}</style>

            {/* Himmel */}
            <rect x="0" y="0" width="900" height="340" fill="url(#skyGrad)" />

            {/* Fjellbakgrunn for dybdefølelse */}
            <path d="M 0 320 L 120 250 L 260 300 L 400 240 L 520 290 L 700 230 L 900 310 L 900 340 L 0 340 Z" fill="#162029" opacity="0.6" />

            {/* Jordskorpe og sedimentlag */}
            <rect x="0" y="320" width="900" height="140" fill="url(#crustGrad)" />
            <line x1="0" y1="320" x2="900" y2="320" stroke="#44392e" strokeWidth="2" />

            {/* Magmakammer i dypet */}
            <ellipse cx="450" cy="405" rx={eruptionStyle.draw === "ultra" ? 180 : 100} ry={eruptionStyle.draw === "ultra" ? 45 : 32} fill="url(#chamberGlow)" />
            <ellipse cx="450" cy="405" rx={eruptionStyle.draw === "ultra" ? 150 : 80} ry={eruptionStyle.draw === "ultra" ? 35 : 24} fill="url(#magmaGrad)" />
            <text x="450" y="408" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {eruptionStyle.draw === "ultra" ? "Stort ryolittkammer" : `Magmakammer (${temp} °C)`}
            </text>
            <text x="450" y="424" fill="#fed7aa" fontSize="10" textAnchor="middle">
              SiO₂: {sio2} % · Gass: {nb1(gasContent)} % · Viskositet: {viscosityShort(viscosityInfo.label)}
            </text>

            {/* Formen følger SiO₂, gass og temperatur, ikke bare fanen. */}
            {scenario === "cinder" ? (
              <g data-volcano-shape="cinder">
                <path d="M40 320 H860" stroke="#3a332c" strokeWidth="2" />
                <path d="M330 320 L430 168 L450 188 L470 168 L570 320 Z" fill="#5a3028" stroke="#8a5344" strokeWidth="2" />
                <path d="M360 300 L434 190 L466 190 L540 300" fill="none" stroke="#3a201c" strokeWidth="3" />
                <ellipse cx="450" cy="176" rx="22" ry="8" fill="#140e0c" stroke="#ff7a18" strokeWidth="1.6" />
                <g className="vm-fountain">
                  <path d="M444 176 Q438 140 444 118 Q450 108 456 118 Q462 140 456 176 Z" fill="#ff7700" />
                  <circle cx="442" cy="112" r="4" fill="#ffcc00" />
                  <circle cx="458" cy="100" r="3" fill="#ffb020" />
                </g>
                <circle className="vm-particle" cx="410" cy="150" r="4" fill="#6b3a2a" />
                <circle className="vm-particle" cx="490" cy="160" r="3.5" fill="#8a5344" style={{ animationDelay: "0.4s" }} />
                <circle className="vm-particle" cx="380" cy="210" r="3" fill="#a1624a" style={{ animationDelay: "0.8s" }} />
                <circle className="vm-particle" cx="520" cy="220" r="3.2" fill="#6b3a2a" style={{ animationDelay: "1.1s" }} />
                <text x="200" y="150" fill="#fed7aa" fontSize="13" fontWeight="bold" textAnchor="end">
                  Krater i toppen
                </text>
                <text x="48" y="300" fill="#e7c4a4" fontSize="13" fontWeight="bold">
                  Slagg og sinder
                </text>
                <text x="600" y="150" fill="#f8fafc" fontSize="13">
                  Sjelden over 300–400 m
                </text>
              </g>
            ) : eruptionStyle.draw === "effusive" ? (
              <g data-volcano-shape="shield">
                <path d="M 60 320 Q 450 240 840 320 Z" fill="#2d2822" stroke="#574838" strokeWidth="2" />
                <path d="M 160 318 Q 450 255 740 318" fill="none" stroke="#221d17" strokeWidth="3" />
                <path d="M 260 316 Q 450 270 640 316" fill="none" stroke="#3d3329" strokeWidth="2.5" />
                <ellipse cx="450" cy="242" rx="35" ry="8" fill="#1b1612" stroke="#e07a30" strokeWidth="1.5" />
                <path d="M 444 380 L 444 242 H 456 L 456 380 Z" fill="#ff5500" opacity="0.9" />
                <g className="vm-fountain">
                  <path d="M 446 242 Q 440 200 445 180 Q 450 170 455 180 Q 460 200 454 242 Z" fill="#ff7700" filter="url(#glowEffect)" />
                  <ellipse cx="450" cy="180" rx="6" ry="12" fill="#ffcc00" />
                </g>
                <path className="vm-lava" d="M 430 244 Q 300 260 140 320" fill="none" stroke="#ff4400" strokeWidth="6" strokeLinecap="round" />
                <path className="vm-lava" d="M 470 244 Q 600 262 760 320" fill="none" stroke="#ffaa00" strokeWidth="5" strokeLinecap="round" />
                <circle className="vm-particle" cx="442" cy="210" r="6" fill="#e2e8f0" />
                <circle className="vm-particle" cx="462" cy="198" r="5" fill="#cbd5e1" style={{ animationDelay: "0.7s" }} />
                <text x="450" y="158" fill="#fed7aa" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Lavafontene og lavastrøm
                </text>
              </g>
            ) : eruptionStyle.draw === "strombolian" ? (
              <g data-volcano-shape="cone">
                <path d="M 180 320 L 420 180 Q 450 190 480 180 L 720 320 Z" fill="#332a26" stroke="#57453d" strokeWidth="2" />
                <path d="M 230 310 L 426 195 L 474 195 L 670 310" fill="none" stroke="#261d1a" strokeWidth="4" />
                <ellipse cx="450" cy="182" rx="30" ry="9" fill="#1c1412" stroke="#ff5500" strokeWidth="2" />
                <path d="M 444 380 L 444 182 H 456 L 456 380 Z" fill="#ff3b00" />
                <path className="vm-plume" d="M 436 178 Q 424 120 418 96 Q 450 78 482 96 Q 476 120 464 178 Z" fill="#64748b" opacity="0.92" />
                <circle className="vm-particle" cx="428" cy="150" r="5" fill="#f97316" />
                <circle className="vm-particle" cx="470" cy="138" r="4.5" fill="#fbbf24" style={{ animationDelay: "0.5s" }} />
                <circle className="vm-particle" cx="450" cy="160" r="4" fill="#fb7185" style={{ animationDelay: "1s" }} />
                <text x="450" y="62" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Kort askesøyle
                </text>
              </g>
            ) : eruptionStyle.draw === "plinian" ? (
              <g data-volcano-shape="cone">
                <path d="M 180 320 L 420 180 Q 450 190 480 180 L 720 320 Z" fill="#332a26" stroke="#57453d" strokeWidth="2" />
                <path d="M 230 310 L 426 195 L 474 195 L 670 310" fill="none" stroke="#261d1a" strokeWidth="4" />
                <path d="M 280 295 L 432 215 L 468 215 L 620 295" fill="none" stroke="#4a3b34" strokeWidth="3" />
                <ellipse cx="450" cy="182" rx="30" ry="9" fill="#1c1412" stroke="#ff5500" strokeWidth="2" />
                <path d="M 444 380 L 444 182 H 456 L 456 380 Z" fill="#ff3b00" />
                <line x1="410" y1="260" x2="490" y2="260" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="500" y="264" fill="#facc15" fontSize="10">Fragmenteringsnivå</text>
                <g className="vm-plume">
                  <path d="M 440 180 Q 430 110 390 60 Q 350 20 280 18 L 620 18 Q 550 20 510 60 Q 470 110 460 180 Z" fill="#475569" opacity="0.85" />
                </g>
                <g className="vm-umbrella">
                  <ellipse cx="450" cy="24" rx="200" ry="22" fill="#334155" opacity="0.9" />
                  <ellipse cx="410" cy="20" rx="140" ry="18" fill="#475569" opacity="0.85" />
                  <text x="450" y="28" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Paraplysky (inn i stratosfæren)
                  </text>
                </g>
                <circle className="vm-particle" cx="390" cy="90" r="5" fill="#94a3b8" />
                <circle className="vm-particle" cx="510" cy="80" r="4" fill="#cbd5e1" style={{ animationDelay: "0.6s" }} />
                <path d="M 420 190 Q 360 220 290 260 Q 230 290 150 320 L 220 320 Q 320 280 430 210 Z" fill="#e11d48" opacity="0.75" />
                <path className="vm-pdc" d="M 180 310 Q 240 270 320 230" stroke="#fb7185" strokeWidth="4" fill="none" />
                <text x="210" y="275" fill="#ffe4e6" fontSize="11" fontWeight="bold" transform="rotate(-30 210 275)">
                  Pyroklastisk tetthetsstrøm
                </text>
                <path d="M 475 200 Q 560 250 670 320 L 730 320 Q 600 250 485 200 Z" fill="#78716c" opacity="0.85" />
                <text x="610" y="280" fill="#f5f5f4" fontSize="10" fontWeight="bold" transform="rotate(28 610 280)">
                  Lahar (slamstrøm)
                </text>
              </g>
            ) : (
              <g data-volcano-shape="caldera">
                <path d="M 120 320 L 290 220 L 330 270 L 570 270 L 610 220 L 780 320 Z" fill="#2e2523" stroke="#57453d" strokeWidth="2" />
                <rect x="330" y="270" width="240" height="50" fill="#1b2024" />
                <path d="M 330 285 Q 450 282 570 285 L 570 305 Q 450 308 330 305 Z" fill="#0284c7" opacity="0.75" />
                <text x="450" y="298" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Kalderasjø (innsunket platetak)
                </text>
                <ellipse cx="450" cy="275" rx="35" ry="12" fill="#44352f" stroke="#78594c" strokeWidth="1.5" />
                <text x="450" y="258" fill="#cbd5e1" fontSize="11" textAnchor="middle">Oppadstigende kuppel</text>
                <line x1="330" y1="220" x2="330" y2="380" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 4" />
                <line x1="570" y1="220" x2="570" y2="380" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 4" />
                <text x="310" y="250" fill="#f43f5e" fontSize="10" textAnchor="end">Ringforkastning ↓</text>
                <text x="590" y="250" fill="#f43f5e" fontSize="10" textAnchor="start">↓ Ringforkastning</text>
                <g className="vm-umbrella">
                  <ellipse cx="450" cy="70" rx="320" ry="45" fill="#475569" opacity="0.6" />
                  <ellipse cx="450" cy="50" rx="260" ry="35" fill="#334155" opacity="0.75" />
                  <text x="450" y="48" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Paraplysky
                  </text>
                  <text x="450" y="66" fill="#e2e8f0" fontSize="11" textAnchor="middle">
                    SO₂-aerosoler høyt i atmosfæren
                  </text>
                </g>
                <circle className="vm-particle" cx="280" cy="90" r="6" fill="#94a3b8" />
                <circle className="vm-particle" cx="620" cy="80" r="5" fill="#cbd5e1" style={{ animationDelay: "0.8s" }} />
              </g>
            )}

            {/* Skala og annoteringer */}
            <rect x="20" y="20" width="220" height="95" rx="8" fill="#0f172a" opacity="0.88" stroke="#334155" />
            <text x="35" y="42" fill="#93c5fd" fontSize="13" fontWeight="bold">Utbruddsklassifisering</text>
            <text x="35" y="62" fill="#f8fafc" fontSize="12" fontWeight="600">{shownStyle.type}</text>
            <text x="35" y="80" fill={shownStyle.color} fontSize="12" fontWeight="bold">{shownStyle.vei}</text>
            <text x="35" y="98" fill="#94a3b8" fontSize="11">Viskositet: {viscosityShort(viscosityInfo.label)}</text>
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
                <strong className="text-foreground">Trykkfall og avgassing:</strong> Når magma stiger, faller trykket fra berget over.
                Oppløste gasser (H₂O, CO₂, SO₂) danner gassbobler (eksolusjon).
              </p>
              <p>
                <strong className="text-foreground">Heving av bakken:</strong> Når magmakammeret fylles, bøyer overflaten seg opp.
                Hevingen måles med GNSS og satellitt-radar (InSAR).
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
                <strong className="text-foreground">Silikatnettverk:</strong> Silikattetraedrene kobles sammen i kjeder og nettverk
                når magmaen har mye SiO₂ (over 63 % i tabellen). Magmaen blir seig, og gassboblene slipper ikke ut.
              </p>
              <p>
                <strong className="text-foreground">Gass i magma:</strong> Ved stort dyp holdes vanndamp
                og CO₂ oppløst under trykket fra berget over. Når magmaen stiger og trykket faller, holdes gassen ikke lenger oppløst,
                og det dannes bobler (eksolusjon). I seig ryolittmagma slipper boblene ikke ut.
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
                <strong className="text-foreground">Tremor:</strong> Vanlige jordskjelv er korte rykk.
                Tremor er en vedvarende, lavfrekvent risting fra magma og gass som beveger seg i sprekker.
              </p>
              <p>
                <strong className="text-foreground">Gassmåling:</strong> Instrumentene måler
                svoveldioksid (SO₂). En kraftig økning tyder på at magmaen er nær overflaten.
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
                <strong className="text-foreground">Utbruddsstil:</strong> {shownStyle.desc}
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
                <strong className="text-foreground">Dominerende fare:</strong> {shownStyle.hazards}
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
        <ModelNote title="Hovedpoeng" tone="teal">
          Vulkanisme er et overflateuttrykk for varme fra jordas indre. Hvor eksplosivt et utbrudd blir, styres av hvor mye
          silikat (SiO₂) magmaen inneholder, og av om gassen slipper ut.{" "}
          <Link to="/geofag-1/jordskjelv" className="underline underline-offset-2">
            Les mer om jordskjelv og tsunamier i kapittelet Jordskjelv og tsunamier.
          </Link>
        </ModelNote>
      </div>
    </ModelFrame>
  );
}
