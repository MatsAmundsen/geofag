import { useState } from "react";
import {
  AlertTriangle,
  Building,
  CheckCircle2,
  CloudRain,
  Compass,
  Droplets,
  HelpCircle,
  Home,
  Layers,
  Shield,
  ShieldAlert,
  Trees,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

export function StormwaterAdaptationModel() {
  type Tab = "stormwater_calculator" | "storm_surge_simulator" | "adaptation_matrix";
  const [tab, setTab] = useState<Tab>("stormwater_calculator");

  // ================= 1. STORMWATER CALCULATOR STATE =================
  // Catchment area: fixed at 10 000 m² = 1 hectare (standard urban block)
  const AREA_M2 = 10000;
  const AREA_HA = 1.0;

  // Rainfall intensity in mm/hour (from 15 mm/h light to 100 mm/h extreme convective cloudburst)
  const [rainfallIntensity, setRainfallIntensity] = useState<number>(65);

  // Surface composition in percentages (must sum to 100 %)
  // C-coefficients: Impervious = 0.90, Green roofs = 0.40, Permeable paving = 0.25, Parks/rain gardens = 0.10
  const [asphaltPct, setAsphaltPct] = useState<number>(60);
  const [greenRoofPct, setGreenRoofPct] = useState<number>(15);
  const [permeablePct, setPermeablePct] = useState<number>(15);
  const [parksPct, setParksPct] = useState<number>(10);

  // Mitigation measures (Step 1, 2, 3 in Treleddsstrategien)
  const [hasRainGardens, setHasRainGardens] = useState<boolean>(true); // Step 1: Infiltration
  const [retentionBasinM3, setRetentionBasinM3] = useState<number>(80); // Step 2: Detention basin m³ (0 to 200 m³)
  const [hasSafeFloodway, setHasSafeFloodway] = useState<boolean>(true); // Step 3: Safe floodway
  const [floodwayCapacityLs, setFloodwayCapacityLs] = useState<number>(120); // Floodway capacity l/s

  // Municipal pipe network capacity (fixed at standard old urban capacity: ~75 l/s per hectare)
  const PIPE_CAPACITY_LS = 75;

  // Weighted runoff coefficient C
  const totalWeight = asphaltPct + greenRoofPct + permeablePct + parksPct || 100;
  const weightedC = Number(
    (
      (asphaltPct * 0.9 + greenRoofPct * 0.4 + permeablePct * 0.25 + parksPct * 0.1) /
      totalWeight
    ).toFixed(2),
  );

  // Rational formula calculation: Q = C * I * A / 3.6  [liters/second]
  // where I is in mm/h and A is in hectares (1 ha = 10 000 m²)
  const totalInflowLs = Math.round((weightedC * rainfallIntensity * AREA_HA * 1000) / 3.6);

  // Step 1: Local infiltration reduction (rain gardens)
  const infiltrationLs = hasRainGardens ? Math.round(parksPct * 2.2 + permeablePct * 1.0) : 0;
  const netSurfaceFlowLs = Math.max(0, totalInflowLs - infiltrationLs);

  // Pipe absorbs up to its max capacity
  const pipeInflowLs = Math.min(netSurfaceFlowLs, PIPE_CAPACITY_LS);
  const pipeOverloadLs = Math.max(0, netSurfaceFlowLs - PIPE_CAPACITY_LS);

  // Step 2: Retention basin buffer (converts peak l/s over a 30-min cloudburst: 1800 s)
  // Required storage volume in m³ for overload: overload_Ls * 1800 / 1000
  const overloadVolumeM3 = Math.round((pipeOverloadLs * 1800) / 1000);
  const bufferAbsorbedM3 = Math.min(overloadVolumeM3, retentionBasinM3);
  const unbufferedVolumeM3 = Math.max(0, overloadVolumeM3 - retentionBasinM3);

  // Rate of unbuffered water spilling onto the street
  const spillRateLs =
    overloadVolumeM3 > 0
      ? Math.round((unbufferedVolumeM3 / overloadVolumeM3) * pipeOverloadLs)
      : 0;

  // Step 3: Floodway routing
  const floodwayAbsorbedLs = hasSafeFloodway
    ? Math.min(spillRateLs, floodwayCapacityLs)
    : 0;
  const dangerousFloodingLs = Math.max(0, spillRateLs - floodwayAbsorbedLs);

  // Risk status evaluation
  let floodRiskState: "safe" | "warning" | "critical";
  if (dangerousFloodingLs > 30) {
    floodRiskState = "critical";
  } else if (dangerousFloodingLs > 0 || pipeOverloadLs > 0) {
    floodRiskState = "warning";
  } else {
    floodRiskState = "safe";
  }

  // Preset scenarios
  const applyRainScenario = (scenario: "5yr" | "20yr" | "100yr" | "2050extreme") => {
    if (scenario === "5yr") setRainfallIntensity(20);
    if (scenario === "20yr") setRainfallIntensity(45);
    if (scenario === "100yr") setRainfallIntensity(70);
    if (scenario === "2050extreme") setRainfallIntensity(98);
  };

  const applyUrbanLayout = (layout: "asphalt_jungle" | "sponge_city" | "suburban") => {
    if (layout === "asphalt_jungle") {
      setAsphaltPct(85);
      setGreenRoofPct(5);
      setPermeablePct(5);
      setParksPct(5);
      setHasRainGardens(false);
      setRetentionBasinM3(0);
      setHasSafeFloodway(false);
    } else if (layout === "sponge_city") {
      setAsphaltPct(30);
      setGreenRoofPct(30);
      setPermeablePct(20);
      setParksPct(20);
      setHasRainGardens(true);
      setRetentionBasinM3(120);
      setHasSafeFloodway(true);
      setFloodwayCapacityLs(150);
    } else {
      setAsphaltPct(50);
      setGreenRoofPct(15);
      setPermeablePct(15);
      setParksPct(20);
      setHasRainGardens(true);
      setRetentionBasinM3(60);
      setHasSafeFloodway(true);
      setFloodwayCapacityLs(80);
    }
  };

  // ================= 2. STORM SURGE STATE =================
  type CoastalCity = "oslo" | "bergen" | "stavanger" | "tromso";
  const [selectedCity, setSelectedCity] = useState<CoastalCity>("bergen");
  const [targetYear, setTargetYear] = useState<number>(2050);
  const [stormSurgeReturnPeriod, setStormSurgeReturnPeriod] = useState<"20yr" | "200yr" | "1000yr">("200yr");

  const cityData: Record<
    CoastalCity,
    { name: string; upliftMmPerYear: number; baseSurge200: number; desc: string }
  > = {
    oslo: {
      name: "Oslo (Indre Oslofjord)",
      upliftMmPerYear: 4.0, // High postglacial uplift!
      baseSurge200: 1.85,
      desc: "Høy isostatisk landheving (~4 mm/år) bremser den relative havnivåstigningen betydelig.",
    },
    bergen: {
      name: "Bergen (Vestland)",
      upliftMmPerYear: 1.6, // Low uplift
      baseSurge200: 2.15,
      desc: "Liten landheving. Bryggen i Bergen er historisk truet av stormflo ved vestlandsstormer og springflo.",
    },
    stavanger: {
      name: "Stavanger / Sørvestlandet",
      upliftMmPerYear: 1.2, // Very low uplift
      baseSurge200: 1.75,
      desc: "Svært lav landheving. Global havnivåstigning slår nesten uavkortet inn over kysten.",
    },
    tromso: {
      name: "Tromsø (Nord-Norge)",
      upliftMmPerYear: 2.2,
      baseSurge200: 2.3,
      desc: "Stort astronomisk tidevannsspenn gjør at stormflotopper ved springflo krever høye kaifronter.",
    },
  };

  // Sea level projections IPCC SSP2-4.5 vs SSP5-8.5
  // Approx global rise: 2050 ~ +0.25 m, 2100 ~ +0.75 m relative to 2000
  const yearsFrom2020 = targetYear - 2020;
  const globalSeaRiseM = Number(((yearsFrom2020 / 80) * 0.72).toFixed(2));
  const localUpliftM = Number(
    ((yearsFrom2020 * cityData[selectedCity].upliftMmPerYear) / 1000).toFixed(2),
  );
  const netRelativeSeaRiseM = Number((globalSeaRiseM - localUpliftM).toFixed(2));

  // Storm surge heights relative to mean sea level
  const surgeAddOn =
    stormSurgeReturnPeriod === "20yr" ? 1.4 : stormSurgeReturnPeriod === "200yr" ? 1.9 : 2.4;
  const totalWaterLevelAboveToday = Number((netRelativeSeaRiseM + surgeAddOn).toFixed(2));

  // TEK17 Safety Class requirement
  // F1: 20-year flood/surge (sheds, garages)
  // F2: 200-year flood/surge (dwellings, schools, offices)
  // F3: 1000-year flood/surge (hospitals, emergency services)
  const quayHeightM = 2.4; // Typical older dock height above normal high tide
  const freeboardMarginM = Number((quayHeightM - totalWaterLevelAboveToday).toFixed(2));

  return (
    <ModelFrame
      kicker="Interaktiv klimatilpasningssimulator"
      title="Overvannskalkulator og flomvegsplanlegger for bymiljøer"
      lead="Undersøk hvordan tette flater forsterker styrtregn, beregn avrenning etter den rasjonelle formelen (Q = C · I · A), og test Treleddsstrategien og kystsikring mot stormflo."
      toolbar={
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            size="sm"
            variant={tab === "stormwater_calculator" ? "default" : "secondary"}
            onClick={() => setTab("stormwater_calculator")}
            className="text-xs"
          >
            <CloudRain className="mr-1.5 size-3.5" />
            Overvann & LOD
          </Button>
          <Button
            size="sm"
            variant={tab === "storm_surge_simulator" ? "default" : "secondary"}
            onClick={() => setTab("storm_surge_simulator")}
            className="text-xs"
          >
            <Waves className="mr-1.5 size-3.5" />
            Havnivå & Stormflo
          </Button>
          <Button
            size="sm"
            variant={tab === "adaptation_matrix" ? "default" : "secondary"}
            onClick={() => setTab("adaptation_matrix")}
            className="text-xs"
          >
            <Shield className="mr-1.5 size-3.5" />
            Drøftingsmal (TEK17)
          </Button>
        </div>
      }
    >
      <ModelMarkers />

      {/* ================= TAB 1: STORMWATER CALCULATOR ================= */}
      {tab === "stormwater_calculator" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Controls and Parameters */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                <div className="border-b border-border/60 pb-3">
                  <h4 className="font-display text-base font-semibold text-foreground">
                    1. Nedbørsintensitet (I)
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Nedbør over 1 time:</span>
                    <span className="font-mono text-sm font-bold text-sky-400">
                      {rainfallIntensity} mm/time
                    </span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={110}
                    step={5}
                    value={rainfallIntensity}
                    onChange={(e) => setRainfallIntensity(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                    aria-label="Nedbørsintensitet i mm per time"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>15 mm/t (lett regn)</span>
                    <span>50 mm/t (byge)</span>
                    <span>110 mm/t (skybrudd)</span>
                  </div>

                  {/* Preset rain buttons */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-[11px] h-7 px-1.5"
                      onClick={() => applyRainScenario("5yr")}
                    >
                      5-år (20 mm)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-[11px] h-7 px-1.5"
                      onClick={() => applyRainScenario("20yr")}
                    >
                      20-år (45 mm)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-[11px] h-7 px-1.5"
                      onClick={() => applyRainScenario("100yr")}
                    >
                      100-år (70 mm)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-[11px] h-7 px-1.5 text-amber-300"
                      onClick={() => applyRainScenario("2050extreme")}
                    >
                      2050 (+40 %)
                    </Button>
                  </div>
                </div>

                {/* Surface Cover Distribution */}
                <div className="border-b border-border/60 pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-base font-semibold text-foreground">
                      2. Byoverflate og tette flater
                    </h4>
                    <span className="font-mono text-xs font-bold text-primary">
                      C = {weightedC}
                    </span>
                  </div>

                  {/* Presets for layout */}
                  <div className="flex gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 flex-1"
                      onClick={() => applyUrbanLayout("asphalt_jungle")}
                    >
                      Asfaltby (C=0,85)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 flex-1"
                      onClick={() => applyUrbanLayout("suburban")}
                    >
                      Blandingsby
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 flex-1 text-emerald-300"
                      onClick={() => applyUrbanLayout("sponge_city")}
                    >
                      Svampby (C=0,35)
                    </Button>
                  </div>

                  {/* Surface sliders */}
                  <div className="space-y-2 pt-1 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px]">
                        <span>Tett asfalt / betong / tak (C = 0,90):</span>
                        <span className="font-mono font-bold text-rose-400">{asphaltPct} %</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={asphaltPct}
                        onChange={(e) => setAsphaltPct(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Asfalt prosent"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px]">
                        <span>Blågrønne fordrøyningstak (C = 0,40):</span>
                        <span className="font-mono font-bold text-teal-400">{greenRoofPct} %</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={greenRoofPct}
                        onChange={(e) => setGreenRoofPct(Number(e.target.value))}
                        className="w-full accent-teal-500"
                        aria-label="Grønne tak prosent"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px]">
                        <span>Permeabel belegningsstein / grus (C = 0,25):</span>
                        <span className="font-mono font-bold text-sky-400">{permeablePct} %</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={permeablePct}
                        onChange={(e) => setPermeablePct(Number(e.target.value))}
                        className="w-full accent-sky-500"
                        aria-label="Permeabelt dekke prosent"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px]">
                        <span>Parker, gress og regnbed (C = 0,10):</span>
                        <span className="font-mono font-bold text-emerald-400">{parksPct} %</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={parksPct}
                        onChange={(e) => setParksPct(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Park prosent"
                      />
                    </div>
                  </div>
                </div>

                {/* Treleddsstrategien Controls */}
                <div className="space-y-3">
                  <h4 className="font-display text-base font-semibold text-foreground">
                    3. Treleddsstrategiens tiltak (LOD)
                  </h4>

                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRainGardens}
                      onChange={(e) => setHasRainGardens(e.target.checked)}
                      className="size-4 rounded accent-primary"
                    />
                    <span className="font-medium text-foreground">
                      Trinn 1: Regnbed og infiltrasjonssoner (infiltrerer opptil {infiltrationLs} l/s)
                    </span>
                  </label>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Trinn 2: Fordrøyningsbasseng / kassetter:
                      </span>
                      <strong className="font-mono text-primary">{retentionBasinM3} m³</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={200}
                      step={10}
                      value={retentionBasinM3}
                      onChange={(e) => setRetentionBasinM3(Number(e.target.value))}
                      className="mt-1 w-full accent-primary"
                      aria-label="Fordrøyningsvolum i kubikkmeter"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasSafeFloodway}
                        onChange={(e) => setHasSafeFloodway(e.target.checked)}
                        className="size-4 rounded accent-primary"
                      />
                      <span className="font-medium text-foreground">
                        Trinn 3: Trygg, overflatisk flomvei (forsenket gate / kanal)
                      </span>
                    </label>

                    {hasSafeFloodway && (
                      <div className="mt-2 pl-6">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Flomveiens kapasitet:</span>
                          <span className="font-mono font-bold text-foreground">
                            {floodwayCapacityLs} l/s
                          </span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={250}
                          step={10}
                          value={floodwayCapacityLs}
                          onChange={(e) => setFloodwayCapacityLs(Number(e.target.value))}
                          className="w-full accent-primary"
                          aria-label="Flomveikapasitet"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </ModelPanel>
            </div>

            {/* Right Column: Dynamic Simulation Visualizer & Results */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              <ModelPanel className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <h4 className="font-display text-base font-semibold text-foreground">
                      Beregnet vannbalanse for kvartalet (A = 10 000 m²)
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      Rasjonelle formel: Q = C · I · A / 3,6
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {floodRiskState === "safe" && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="size-3.5" />
                        Trygt: Ingen flomskade
                      </span>
                    )}
                    {floodRiskState === "warning" && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="size-3.5" />
                        Flomvei aktivert (overvann ledes trygt)
                      </span>
                    )}
                    {floodRiskState === "critical" && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/30">
                        <ShieldAlert className="size-3.5" />
                        KRITISK: Kjellerinnsig og urban flom!
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                  <div className="rounded-xl border border-border bg-card/70 p-3">
                    <span className="text-[11px] text-muted-foreground">Total tilstrømming (Q):</span>
                    <p className="mt-1 font-mono text-lg font-bold text-foreground">
                      {totalInflowLs} l/s
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      ({Math.round((totalInflowLs * 3.6) / 1000)} m³/time)
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-card/70 p-3">
                    <span className="text-[11px] text-muted-foreground">Rørnettets kapasitet:</span>
                    <p className="mt-1 font-mono text-lg font-bold text-sky-400">
                      {pipeInflowLs} / {PIPE_CAPACITY_LS} l/s
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {pipeOverloadLs > 0 ? "Rørene er fulle!" : "Tilstrekkelig kapasitet"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-card/70 p-3">
                    <span className="text-[11px] text-muted-foreground">Fordrøyd i magasin:</span>
                    <p className="mt-1 font-mono text-lg font-bold text-teal-400">
                      {bufferAbsorbedM3} / {retentionBasinM3} m³
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {retentionBasinM3 > 0 && bufferAbsorbedM3 >= retentionBasinM3
                        ? "Magasin er fullt!"
                        : "Demper flomtoppen"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-card/70 p-3">
                    <span className="text-[11px] text-muted-foreground">Ukontrollert flom:</span>
                    <p
                      className={`mt-1 font-mono text-lg font-bold ${
                        dangerousFloodingLs > 0 ? "text-rose-400" : "text-emerald-400"
                      }`}
                    >
                      {dangerousFloodingLs} l/s
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {dangerousFloodingLs > 0 ? "Fyller kjellere!" : "0 skader"}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Cross-section of Urban Water Flow */}
                <div className="relative overflow-hidden rounded-xl border border-border/80 bg-[#091522] p-3">
                  <svg viewBox="0 0 620 280" className="w-full h-auto select-none" aria-label="Byprofil med vannstrømmer">
                    {/* Skyer og regn */}
                    <g transform="translate(40, 15)">
                      <ellipse cx="60" cy="20" rx="45" ry="16" fill="#334155" />
                      <ellipse cx="90" cy="18" rx="35" ry="14" fill="#475569" />
                      {/* Rain streaks */}
                      <line x1="45" y1="40" x2="35" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="65" y1="40" x2="55" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="85" y1="40" x2="75" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="70" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                        {rainfallIntensity} mm/t
                      </text>
                    </g>

                    {/* Bygning 1: Hus med kjeller */}
                    <g transform="translate(60, 80)">
                      {/* Tak (grønt tak eller tett tak) */}
                      <polygon
                        points="0,40 60,10 120,40"
                        fill={greenRoofPct > 30 ? "#10b981" : "#475569"}
                        stroke="#0f172a"
                      />
                      <text x="60" y="32" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="bold">
                        {greenRoofPct > 30 ? "Sedumtak (C=0,4)" : "Tett tak (C=0,9)"}
                      </text>

                      {/* Vegg over bakken */}
                      <rect x="10" y="40" width="100" height="70" fill="#1e293b" stroke="#334155" />
                      <rect x="25" y="55" width="20" height="20" fill="#fef08a" opacity="0.7" />
                      <rect x="75" y="55" width="20" height="20" fill="#fef08a" opacity="0.7" />

                      {/* Bakkenivå */}
                      <line x1="-30" y1="110" x2="140" y2="110" stroke="#64748b" strokeWidth="2" />

                      {/* Kjeller under bakken */}
                      <rect x="10" y="110" width="100" height="55" fill="#0f172a" stroke="#334155" />
                      <text x="60" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Kjelleretasje
                      </text>

                      {/* Kjellervindu med vann innsig dersom dangerousFloodingLs > 0 */}
                      {dangerousFloodingLs > 0 ? (
                        <>
                          <rect x="15" y="105" width="20" height="10" fill="#ef4444" />
                          {/* Vann fyller kjelleren */}
                          <rect x="12" y="135" width="96" height="28" fill="#0284c7" opacity="0.6" />
                          <text x="60" y="152" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">
                            VANN I KJELLER!
                          </text>
                        </>
                      ) : (
                        <rect x="15" y="105" width="20" height="8" fill="#38bdf8" opacity="0.4" />
                      )}
                    </g>

                    {/* Gate og forsenkning i midten (Flomvei) */}
                    <g transform="translate(200, 180)">
                      {/* Gateprofil med forsenkning */}
                      <path
                        d={
                          hasSafeFloodway
                            ? "M 0 10 L 40 10 L 60 25 L 140 25 L 160 10 L 200 10"
                            : "M 0 10 L 200 10"
                        }
                        fill="none"
                        stroke="#475569"
                        strokeWidth="3"
                      />

                      {/* Vannstrøm i flomveien */}
                      {hasSafeFloodway && (spillRateLs > 0 || floodRiskState === "warning") && (
                        <path
                          d="M 60 24 L 140 24 L 155 12"
                          stroke="#38bdf8"
                          strokeWidth="6"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.85"
                        />
                      )}
                      <text x="100" y="8" textAnchor="middle" fill={hasSafeFloodway ? "#38bdf8" : "#94a3b8"} fontSize="10" fontWeight="bold">
                        {hasSafeFloodway ? "Trinn 3: Forsenket gate (Flomvei)" : "Flat asfaltgate (Ingen flomvei)"}
                      </text>
                    </g>

                    {/* Under bakken: Rør og fordrøyningsbasseng */}
                    <g transform="translate(240, 215)">
                      {/* Fordrøyningsbasseng */}
                      {retentionBasinM3 > 0 && (
                        <>
                          <rect x="0" y="0" width="80" height="35" rx="4" fill="#1e293b" stroke="#0ea5e9" />
                          {/* Vannfylling i basseng */}
                          <rect
                            x="2"
                            y={35 - (bufferAbsorbedM3 / (retentionBasinM3 || 1)) * 33}
                            width="76"
                            height={(bufferAbsorbedM3 / (retentionBasinM3 || 1)) * 33}
                            fill="#0284c7"
                            opacity="0.75"
                          />
                          <text x="40" y="20" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold">
                            Fordrøying {bufferAbsorbedM3} m³
                          </text>
                        </>
                      )}

                      {/* Kommunalt overvannsrør */}
                      <g transform="translate(100, 10)">
                        <rect x="0" y="0" width="80" height="20" rx="10" fill="#334155" stroke="#94a3b8" />
                        <rect
                          x="2"
                          y="2"
                          width={Math.min(76, (pipeInflowLs / PIPE_CAPACITY_LS) * 76)}
                          height="16"
                          rx="8"
                          fill="#38bdf8"
                        />
                        <text x="40" y="14" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
                          Rør ({pipeInflowLs} l/s)
                        </text>
                      </g>
                    </g>

                    {/* Høyre del: Park og regnbed (Infiltrasjon) */}
                    <g transform="translate(440, 160)">
                      {/* Bakke med regnbed */}
                      <path d="M 0 30 Q 30 45 60 30 L 140 30" fill="none" stroke="#10b981" strokeWidth="3" />
                      <circle cx="30" cy="36" r="14" fill="#065f46" opacity="0.6" />
                      <text x="30" y="38" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="bold">
                        Regnbed
                      </text>

                      {/* Trær */}
                      <g transform="translate(80, -25)">
                        <polygon points="20,0 5,30 35,30" fill="#15803d" />
                        <rect x="17" y="30" width="6" height="15" fill="#78350f" />
                      </g>
                      <text x="70" y="60" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                        Trinn 1: Infiltrasjon
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Didaktisk konklusjon */}
                <div className="rounded-xl border border-border bg-card p-3.5 text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Lærdom til eksamen:</strong> Tradisjonelle
                  overvannsrør under asfalten er dimensjonert for 10–20-årsregn i et historisk klima.
                  Når styrtregn overstiger rørkapasiteten, er det ikke nok å grave større rør — det koster
                  milliarder. Løsningen er <strong>Treleddsstrategien</strong>: Åpne regnbed som suger opp
                  hverdagsregnet (trinn 1), fordrøyningsbassenger som kutter toppen (trinn 2), og planlagte
                  oversvømmelsesgater som leder flommen trygt til sjø eller elv uten at kjellere fylles (trinn 3).
                </div>
              </ModelPanel>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: STORM SURGE SIMULATOR ================= */}
      {tab === "storm_surge_simulator" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-4">
            <div className="border-b border-border/60 pb-3">
              <h4 className="font-display text-base font-semibold text-foreground">
                Kysttilpasning: Havnivåstigning mot lokal isostatisk landheving
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Norge hever seg fortsatt etter siste istid. Derfor er ikke klimakonsekvensene for
                havnivå like over hele landet.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column: City & Year Selection */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                {/* City selection */}
                <div>
                  <span className="text-xs font-semibold text-foreground">Velg kystsone:</span>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {(Object.keys(cityData) as CoastalCity[]).map((cKey) => {
                      const c = cityData[cKey];
                      return (
                        <button
                          key={cKey}
                          type="button"
                          onClick={() => setSelectedCity(cKey)}
                          className={`rounded-lg border p-2.5 text-left text-xs transition-all ${
                            selectedCity === cKey
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-border bg-card/60 hover:bg-card"
                          }`}
                        >
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            Landheving: +{c.upliftMmPerYear} mm/år
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Year Slider */}
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tidshorisont for planlegging:</span>
                    <strong className="font-mono text-primary text-sm">År {targetYear}</strong>
                  </div>
                  <input
                    type="range"
                    min={2025}
                    max={2100}
                    step={5}
                    value={targetYear}
                    onChange={(e) => setTargetYear(Number(e.target.value))}
                    className="mt-1.5 w-full accent-primary"
                    aria-label="Tidshorisont i år"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span>Nåtid (2025)</span>
                    <span>2050 (Kommuneplan)</span>
                    <span>2100 (TEK17 100-års)</span>
                  </div>
                </div>

                {/* Storm Surge Return Period */}
                <div>
                  <span className="text-xs font-semibold text-foreground">
                    Dimensjonerende stormflo (Gjentaksintervall):
                  </span>
                  <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant={stormSurgeReturnPeriod === "20yr" ? "default" : "secondary"}
                      className="text-xs h-7"
                      onClick={() => setStormSurgeReturnPeriod("20yr")}
                    >
                      20-års (F1)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={stormSurgeReturnPeriod === "200yr" ? "default" : "secondary"}
                      className="text-xs h-7"
                      onClick={() => setStormSurgeReturnPeriod("200yr")}
                    >
                      200-års (F2)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={stormSurgeReturnPeriod === "1000yr" ? "default" : "secondary"}
                      className="text-xs h-7"
                      onClick={() => setStormSurgeReturnPeriod("1000yr")}
                    >
                      1000-års (F3)
                    </Button>
                  </div>
                </div>

                {/* Calculated Values Card */}
                <div className="rounded-xl border border-border bg-card p-3 space-y-2 text-xs">
                  <div className="flex justify-between pb-1 border-b border-border/50">
                    <span className="text-muted-foreground">Global havnivåstigning (IPCC):</span>
                    <span className="font-mono font-bold text-amber-400">+{globalSeaRiseM} m</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-border/50">
                    <span className="text-muted-foreground">Akkumulert landheving:</span>
                    <span className="font-mono font-bold text-emerald-400">-{localUpliftM} m</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-border/50">
                    <span className="text-muted-foreground">Netto relativ stigning for {cityData[selectedCity].name}:</span>
                    <span className="font-mono font-bold text-foreground">
                      {netRelativeSeaRiseM > 0 ? `+${netRelativeSeaRiseM}` : netRelativeSeaRiseM} m
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="font-semibold text-foreground">Totalt stormflonivå:</span>
                    <span className="font-mono font-bold text-base text-rose-400">
                      +{totalWaterLevelAboveToday} m
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visualizer of Dock / Quay Level */}
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div className="relative overflow-hidden rounded-xl border border-border bg-[#081524] p-3">
                  <svg viewBox="0 0 540 300" className="w-full h-auto select-none" aria-label="Havnivå og stormflo på kai">
                    {/* Himmelen */}
                    <rect x="0" y="0" width="540" height="150" fill="#0f172a" />

                    {/* Kaifront og bygning (Fast land) */}
                    <g transform="translate(260, 60)">
                      {/* Kai-plateau */}
                      <rect x="0" y="60" width="280" height="180" fill="#334155" stroke="#1e293b" />
                      <line x1="0" y1="60" x2="280" y2="60" stroke="#94a3b8" strokeWidth="3" />
                      <text x="140" y="80" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                        Eksisterende kai (+{quayHeightM} m)
                      </text>

                      {/* Historisk trebygning eller bolig */}
                      <rect x="60" y="0" width="120" height="60" fill="#78350f" stroke="#451a03" />
                      <polygon points="50,0 120,-30 190,0" fill="#b91c1c" />
                      <text x="120" y="35" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">
                        TEK17 Sikkerhetsklasse {stormSurgeReturnPeriod === "20yr" ? "F1" : stormSurgeReturnPeriod === "200yr" ? "F2" : "F3"}
                      </text>
                    </g>

                    {/* Sjø og stormflo */}
                    {(() => {
                      // Normal high tide is at y = 200 (scale: 1 m = 40 px)
                      // Quay top is at +2.4 m -> y = 200 - 2.4*40 = 104
                      // Surge level = totalWaterLevelAboveToday * 40
                      const waterY = Math.max(50, 200 - totalWaterLevelAboveToday * 38);
                      const isOvertopping = totalWaterLevelAboveToday > quayHeightM;

                      return (
                        <>
                          {/* Sjøkropp */}
                          <rect x="0" y={waterY} width="260" height={300 - waterY} fill="#0284c7" opacity="0.85" />

                          {/* Bølger på toppen */}
                          <path
                            d={`M 0 ${waterY} Q 65 ${waterY - 8} 130 ${waterY} Q 195 ${waterY + 8} 260 ${waterY}`}
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="3"
                          />

                          {/* Hvis vannet går over brygga */}
                          {isOvertopping && (
                            <rect
                              x="260"
                              y={waterY}
                              width="160"
                              height={Math.min(30, 240 - waterY)}
                              fill="#0284c7"
                              opacity="0.7"
                            />
                          )}

                          {/* Målelinje for vannstand */}
                          <line x1="240" y1="200" x2="240" y2={waterY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                          <circle cx="240" cy={waterY} r="4" fill="#f59e0b" />
                          <text x="230" y={waterY - 6} textAnchor="end" fill="#f59e0b" fontSize="11" fontWeight="bold">
                            Stormflo +{totalWaterLevelAboveToday} m
                          </text>

                          {/* Normal middelvannlinje */}
                          <line x1="0" y1="200" x2="260" y2="200" stroke="#94a3b8" strokeDasharray="2 2" />
                          <text x="10" y="194" fill="#94a3b8" fontSize="10">
                            Normalt middelvann (0,0 m)
                          </text>

                          {/* Fribord varsel */}
                          <g transform="translate(270, 180)">
                            {freeboardMarginM < 0 ? (
                              <rect x="0" y="0" width="230" height="42" rx="6" fill="#7f1d1d" stroke="#ef4444" />
                            ) : (
                              <rect x="0" y="0" width="230" height="42" rx="6" fill="#064e3b" stroke="#10b981" />
                            )}
                            <text
                              x="115"
                              y="18"
                              textAnchor="middle"
                              fill={freeboardMarginM < 0 ? "#fecaca" : "#a7f3d0"}
                              fontSize="11"
                              fontWeight="bold"
                            >
                              {freeboardMarginM < 0
                                ? `BRYGGA OVERSVØMMES MED ${Math.abs(freeboardMarginM)} METER!`
                                : `Trygt fribord: +${freeboardMarginM} meter over flo`}
                            </text>
                            <text
                              x="115"
                              y="32"
                              textAnchor="middle"
                              fill="#e2e8f0"
                              fontSize="9"
                            >
                              {freeboardMarginM < 0
                                ? "Krav i TEK17 ikke oppfylt — tiltak kreves!"
                                : "Bygget tilfredsstiller TEK17 sikkerhetskrav."}
                            </text>
                          </g>
                        </>
                      );
                    })()}
                  </svg>
                </div>

                <div className="rounded-xl border border-border/80 bg-card p-3.5 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground">
                    Hvorfor er Sør- og Vestlandet mer sårbare enn Oslo?
                  </p>
                  <p className="mt-1">
                    Under siste istid var innlandsisen aller tykkest over Bottenviken og Østlandet.
                    Derfor er den gjenværende hevingen størst der (+4 til +9 mm/år). På Vestlandet og
                    Sørlandet (Bergen, Stavanger, Kristiansand) var isen tynnere, og hevingen er bare
                    om lag 1–2 mm/år. Når havet stiger med 5–8 mm/år utover i århundret, vil
                    kystbyene i vest og sør få en dramatisk økning i hyppigheten av 200-års stormflo.
                  </p>
                </div>
              </div>
            </div>
          </ModelPanel>
        </div>
      )}

      {/* ================= TAB 3: ADAPTATION MATRIX ================= */}
      {tab === "adaptation_matrix" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-4">
            <div>
              <h4 className="font-display text-base font-semibold text-foreground">
                Drøftingsmal for eksamen: Utslippskutt, tilpasning og faren for maltilpasning
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kompetansemålet krever at du drøfter konsekvenser på tre nivåer (person, samfunn,
                økosystem) og vurderer om løsningen er bærekraftig eller en maltilpasning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1 text-xs">
              {/* Tiltak 1: Flomvoll */}
              <div className="rounded-xl border border-border bg-card/80 p-4 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-foreground text-sm">Høye flomvoller</h5>
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    Grå infrastruktur
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Bygge massive voller av jord og stein langs elvekanten for å skjerme et boligfelt.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <p>
                    <strong>Fordel:</strong> Skjermer eksisterende bebyggelse mot 200-årsflom på kort sikt.
                  </p>
                  <p className="text-rose-400">
                    <strong>Risiko for maltilpasning:</strong> Skaper falsk trygghet slik at folk bygger
                    flere kjellere bak vollen. Når en 500-årsflom overtopper vollen, blir skadene katastrofale.
                    I tillegg øker vannhastigheten og flomfaren nedstrøms for naboene!
                  </p>
                </div>
              </div>

              {/* Tiltak 2: Blågrønne tak & regnbed */}
              <div className="rounded-xl border border-border bg-card/80 p-4 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-foreground text-sm">Blågrønne strukturer & LOD</h5>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    Bærekraftig (NBS)
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Åpne regnbed, gjenåpning av lukkede bybekker og sedumtak på nybygg.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <p>
                    <strong>Fordel:</strong> Fanger opp vannet der det lander, reduserer avrenning til
                    rørnettet, kjøler ned byen i hetebølger og skaper biologisk mangfold.
                  </p>
                  <p className="text-emerald-400">
                    <strong>Bærekraft:</strong> Lav risiko for maltilpasning; gir flerfunksjonelle goder
                    både for folk, samfunnets økonomi og byens økosystem.
                  </p>
                </div>
              </div>

              {/* Tiltak 3: Tilbaketrekking */}
              <div className="rounded-xl border border-border bg-card/80 p-4 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-foreground text-sm">Strategisk tilbaketrekking</h5>
                  <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-300">
                    Arealplanlegging
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Innføre byggeforbud i flom- og stormflosoner (TEK17 F2/F3) og flytte sårbare funksjoner.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <p>
                    <strong>Fordel:</strong> Fjerner selve <em>eksponeringen</em> permanent. Ingen flomvoll som
                    kan briste.
                  </p>
                  <p className="text-amber-300">
                    <strong>Konflikt:</strong> Dyrt for grunneiere, politisk vanskelig i populære havne- og
                    sentrumsområder, men samfunnsøkonomisk mest robust på lang sikt.
                  </p>
                </div>
              </div>

              {/* Tiltak 4: Kunstsnø */}
              <div className="rounded-xl border border-border bg-card/80 p-4 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-foreground text-sm">Snøkanoner på skisteder</h5>
                  <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                    Typisk maltilpasning
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Pumpe grunnvann og bruke enorme mengder elektrisk energi for å legge snø i milde vintre.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <p>
                    <strong>Kort sikt:</strong> Redder skiturismen og lokale arbeidsplasser en sesong til.
                  </p>
                  <p className="text-rose-400">
                    <strong>Maltilpasning:</strong> Krever mer energi og vann jo varmere det blir. Hvis
                    strømmen kommer fra fossile kilder, øker tiltaket selve <em>utslippspådrivet</em> som
                    smelter snøen!
                  </p>
                </div>
              </div>

              {/* Tiltak 5: Aircondition */}
              <div className="rounded-xl border border-border bg-card/80 p-4 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-foreground text-sm">Klimaanlegg (AC) i hete</h5>
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    Kortsiktig vern
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Montere luftkjølere på sykehjem og boliger under ekstreme hetebølger.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <p>
                    <strong>Person-nivå:</strong> Redder liv blant eldre og syke under hetebølger.
                  </p>
                  <p className="text-rose-400">
                    <strong>Samfunn/økologi:</strong> Blåser overskuddsvarme ut i bygatene (øker urban varmeøy-effekt)
                    og sprenger strømnettet. Bærekraftig alternativ: passiv solskjerming og grønne parker.
                  </p>
                </div>
              </div>

              {/* Tiltak 6: Sjømurer mot stormflo */}
              <div className="rounded-xl border border-border bg-card/80 p-4 space-y-2.5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-foreground text-sm">Harde sjømurer & moloer</h5>
                  <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-300">
                    Kystvern
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Betongmurer langs kystlinjen for å stoppe bølgepåslag og stormflo.
                </p>
                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <p>
                    <strong>Fordel:</strong> Stopper bølger foran en spesifikk strandpromenade.
                  </p>
                  <p className="text-rose-400">
                    <strong>Maltilpasning:</strong> Bølgene reflekteres og graver ut bunnen foran muren.
                    Tareskog og strandenger (som naturlig demper bølgeenergi) dør, og erosjonen forverres hos naboen.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs leading-relaxed space-y-2">
              <strong className="text-primary text-sm">Sjekkliste for toppkarakter til eksamen i Geofag 2:</strong>
              <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                <li>
                  Bruk formelen for risiko: <strong className="text-foreground">Risiko = Fare × Eksponering × Sårbarhet</strong>.
                </li>
                <li>
                  Besvar alltid <strong className="text-foreground">begge verbene</strong> i kompetansemålet:
                  Utslippskutt (demper pådrivet) og tilpasning (reduserer skaden).
                </li>
                <li>
                  Drøft alltid konsekvensene på <strong className="text-foreground">tre nivåer</strong>:
                  1) Enkeltmennesket (helse/hjem), 2) Samfunnet (vei/budsjett/avløp), 3) Økosystemet (artsutdøing/myrer).
                </li>
                <li>
                  Advar alltid mot <strong className="text-foreground">maltilpasning</strong>: Hvem vinner, hvem taper,
                  og flytter tiltaket risikoen over på neste generasjon?
                </li>
              </ol>
            </div>
          </ModelPanel>
        </div>
      )}
    </ModelFrame>
  );
}
