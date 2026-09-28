import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelPanel, ModelTab, ModelNote } from "./model-chrome";

type CatchmentTab = "simulator" | "urbanization_impact" | "hans_case";

export function HydrographCatchmentModel() {
  const [tab, setTab] = useState<CatchmentTab>("simulator");

  // --- Hovedparametre ---
  const [catchmentAreaKm2, setCatchmentAreaKm2] = useState<number>(150); // 20 til 800 km2
  const [reliefType, setReliefType] = useState<"steep" | "moderate" | "flat">("steep"); // Helning
  const [soilType, setSoilType] = useState<"sand_gravel" | "till" | "clay_rock">("till"); // Infiltrasjon
  const [lakePercentage, setLakePercentage] = useState<number>(3); // 0 til 15 %
  const [urbanFraction, setUrbanFraction] = useState<number>(5); // 0 til 60 % tette flater
  const [antecedentMoisture, setAntecedentMoisture] = useState<"dry" | "normal" | "saturated">("normal"); // Forutgående fuktighet

  // Nedbørshendelse
  const [rainIntensityMmH, setRainIntensityMmH] = useState<number>(18); // 2 til 50 mm/t
  const [rainDurationHours, setRainDurationHours] = useState<number>(6); // 1 til 24 timer

  // --- Hydrologisk beregning (SCS- og enhetshydrogram-tilnærming) ---
  const hydroCalc = useMemo(() => {
    // 1. Avrenningskoeffisient C (0.05 til 0.95)
    let baseC = 0.25;
    if (soilType === "sand_gravel") baseC = 0.12;
    if (soilType === "clay_rock") baseC = 0.45;

    // Justering for fuktighet
    let moistureFactor = 1.0;
    if (antecedentMoisture === "dry") moistureFactor = 0.6;
    if (antecedentMoisture === "saturated") moistureFactor = 1.8;

    // Justering for urbanisering (tette flater har C ~ 0.85)
    const effectiveC = Math.min(
      0.95,
      baseC * moistureFactor * (1 - urbanFraction / 100) + 0.88 * (urbanFraction / 100)
    );

    // 2. Konsentrasjonstid / Retardasjonstid (Lag time t_L i timer)
    // Bratt felt gir kort t_L, slakt felt gir lang t_L. Innsjøer og myr øker t_L vesentlig.
    let slopeFactor = reliefType === "steep" ? 0.6 : reliefType === "moderate" ? 1.0 : 1.7;
    let lakeRetention = 1 + (lakePercentage / 100) * 12; // 10% innsjø gir over 2x forsinkelse
    let urbanSpeedup = Math.max(0.4, 1 - (urbanFraction / 100) * 0.7); // Asfalt forkorter reisetiden drastisk

    const lagTimeHours = Math.max(
      1.5,
      Math.round(Math.pow(catchmentAreaKm2, 0.38) * 2.2 * slopeFactor * lakeRetention * urbanSpeedup * 10) / 10
    );

    // 3. Flomtopp Q_max (m3/s)
    // Rasjonell formel med demping: Q = (C * I * A) / 3.6 / lakeRetentionFactor
    const totalRainMm = rainIntensityMmH * rainDurationHours;
    const peakDischargeM3s = Math.round(
      ((effectiveC * rainIntensityMmH * catchmentAreaKm2) / 3.6) *
        (1 / Math.pow(lakeRetention, 0.4)) *
        (Math.min(1.2, rainDurationHours / (lagTimeHours * 0.5)))
    );

    // Spesifikk avrenning (l/s * km2)
    const specificRunoff = Math.round((peakDischargeM3s * 1000) / catchmentAreaKm2);

    // Flomgjentaksintervall (klasse)
    let floodClass = "Normal vannføring";
    let floodColor = "text-emerald-400";
    if (specificRunoff > 1200) {
      floodClass = ">200-årsflom (Ekstremflom)";
      floodColor = "text-rose-400";
    } else if (specificRunoff > 750) {
      floodClass = "50- til 100-årsflom (Svært stor flom)";
      floodColor = "text-amber-400";
    } else if (specificRunoff > 400) {
      floodClass = "10- til 20-årsflom (Middels flom)";
      floodColor = "text-teal-400";
    } else if (specificRunoff > 200) {
      floodClass = "5-årsflom (Mindre vårflom)";
      floodColor = "text-sky-400";
    }

    // Generer kurvepunkter for hydrogrammet over 48 timer
    const points: { t: number; q: number }[] = [];
    const baseflow = Math.round(catchmentAreaKm2 * 0.08); // Basisflyt fra grunnvann
    const peakTime = Math.round(rainDurationHours * 0.5 + lagTimeHours);

    for (let t = 0; t <= 48; t += 1) {
      let q = baseflow;
      if (t < peakTime) {
        // Stigende side
        const riseFrac = Math.max(0, (t - 1) / Math.max(1, peakTime - 1));
        q = baseflow + (peakDischargeM3s - baseflow) * Math.pow(riseFrac, 2.2);
      } else {
        // Synkende side (resesjonskurve)
        const decayTime = (t - peakTime) / (lagTimeHours * 1.6);
        q = baseflow + (peakDischargeM3s - baseflow) * Math.exp(-decayTime);
      }
      points.push({ t, q: Math.round(q) });
    }

    return {
      effectiveC: effectiveC.toFixed(2),
      lagTimeHours,
      peakDischargeM3s,
      specificRunoff,
      floodClass,
      floodColor,
      totalRainMm,
      points,
      peakTime,
    };
  }, [
    catchmentAreaKm2,
    reliefType,
    soilType,
    lakePercentage,
    urbanFraction,
    antecedentMoisture,
    rainIntensityMmH,
    rainDurationHours,
  ]);

  // SVG-skaleringskonstanter
  const svgW = 560;
  const svgH = 260;
  const padL = 50;
  const padR = 25;
  const padB = 40;
  const padT = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padB - padT;

  const maxQ = Math.max(150, hydroCalc.peakDischargeM3s * 1.25);

  const hydrogramPath = useMemo(() => {
    return hydroCalc.points
      .map((p, i) => {
        const x = padL + (p.t / 48) * plotW;
        const y = padT + plotH - (p.q / maxQ) * plotH;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, [hydroCalc.points, maxQ, plotW, plotH]);

  return (
    <ModelFrame
      kicker="Interaktiv hydrologisk simulator"
      title="Nedbørsfeltmodell og hydrogram-simulator"
      lead="Et hydrogram viser elvens vannføring mot tid som respons på en nedbørshendelse. Utforsk hvordan nedbørsfeltets areal, helning, jordsmonnets forutgående markfuktighet, innsjømagasinering og urbanisering endrer flomtoppen og forsinkelsen (retardasjonstiden)."
      toolbar={
        <>
          <ModelTab active={tab === "simulator"} onClick={() => setTab("simulator")}>
            Nedbørsfelt-simulator
          </ModelTab>
          <ModelTab active={tab === "urbanization_impact"} onClick={() => setTab("urbanization_impact")}>
            Urbanisering vs. Naturlig demping
          </ModelTab>
          <ModelTab active={tab === "hans_case"} onClick={() => setTab("hans_case")}>
            Ekstremværet Hans 2023
          </ModelTab>
        </>
      }
    >
      {tab === "simulator" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Kontroller */}
            <div className="space-y-4 lg:col-span-5">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Nedbørsfeltets parametere
              </h4>

              {/* Nedbørskontroller */}
              <div className="rounded-lg border border-border/70 bg-card/60 p-3 space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span>Nedbørsintensitet:</span>
                  <span className="font-mono text-primary font-bold">{rainIntensityMmH} mm/t</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={45}
                  step={1}
                  value={rainIntensityMmH}
                  onChange={(e) => setRainIntensityMmH(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Nedbørsintensitet"
                />

                <div className="flex justify-between text-xs font-medium">
                  <span>Nedbørsvarighet:</span>
                  <span className="font-mono text-primary font-bold">{rainDurationHours} timer</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={24}
                  step={1}
                  value={rainDurationHours}
                  onChange={(e) => setRainDurationHours(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Nedbørsvarighet"
                />
                <p className="text-[11px] text-muted-foreground">
                  Samlet nedbørsvolum: <strong className="text-foreground">{hydroCalc.totalRainMm} mm</strong>
                </p>
              </div>

              {/* Feltkarakteristika */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Nedbørsfeltets areal (A):</span>
                    <span className="font-mono text-foreground font-semibold">{catchmentAreaKm2} km²</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={600}
                    step={10}
                    value={catchmentAreaKm2}
                    onChange={(e) => setCatchmentAreaKm2(Number(e.target.value))}
                    className="w-full accent-foreground"
                    aria-label="Feltareal"
                  />
                </div>

                <div>
                  <span className="font-medium">Terrenghelning (Relieff):</span>
                  <div className="mt-1 grid grid-cols-3 gap-1">
                    <Button
                      size="sm"
                      variant={reliefType === "steep" ? "default" : "secondary"}
                      className="text-xs h-7 px-2"
                      onClick={() => setReliefType("steep")}
                    >
                      Bratt fjell
                    </Button>
                    <Button
                      size="sm"
                      variant={reliefType === "moderate" ? "default" : "secondary"}
                      className="text-xs h-7 px-2"
                      onClick={() => setReliefType("moderate")}
                    >
                      Middels
                    </Button>
                    <Button
                      size="sm"
                      variant={reliefType === "flat" ? "default" : "secondary"}
                      className="text-xs h-7 px-2"
                      onClick={() => setReliefType("flat")}
                    >
                      Slakt lavland
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="font-medium">Markfuktighet før flommen:</span>
                  <div className="mt-1 grid grid-cols-3 gap-1">
                    <Button
                      size="sm"
                      variant={antecedentMoisture === "dry" ? "default" : "secondary"}
                      className="text-xs h-7 px-2"
                      onClick={() => setAntecedentMoisture("dry")}
                    >
                      Tørr mark
                    </Button>
                    <Button
                      size="sm"
                      variant={antecedentMoisture === "normal" ? "default" : "secondary"}
                      className="text-xs h-7 px-2"
                      onClick={() => setAntecedentMoisture("normal")}
                    >
                      Normal
                    </Button>
                    <Button
                      size="sm"
                      variant={antecedentMoisture === "saturated" ? "default" : "secondary"}
                      className="text-xs h-7 px-2"
                      onClick={() => setAntecedentMoisture("saturated")}
                    >
                      Vannmettet
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Innsjø- og myrprosent (A_SE):</span>
                    <span className="font-mono text-teal-400 font-semibold">{lakePercentage} %</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    step={1}
                    value={lakePercentage}
                    onChange={(e) => setLakePercentage(Number(e.target.value))}
                    className="w-full accent-teal-500"
                    aria-label="Innsjøprosent"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Tettbebyggelse / Tette flater:</span>
                    <span className="font-mono text-rose-400 font-semibold">{urbanFraction} %</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={5}
                    value={urbanFraction}
                    onChange={(e) => setUrbanFraction(Number(e.target.value))}
                    className="w-full accent-rose-500"
                    aria-label="Urbaniseringsgrad"
                  />
                </div>
              </div>
            </div>

            {/* Hydrogramgraf SVG */}
            <div className="space-y-4 lg:col-span-7">
              <div className="rounded-xl border border-border/80 bg-background/60 p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground">Resulterende flomhydrogram</h5>
                    <p className="text-xs text-muted-foreground">Tidsforløp over 48 timer ved feltets utløp</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold uppercase tracking-wider ${hydroCalc.floodColor}`}>
                      {hydroCalc.floodClass}
                    </span>
                  </div>
                </div>

                <div className="relative mt-2">
                  <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none" aria-label="Hydrogramgraf">
                    {/* Bakgrunnsrutenett */}
                    {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
                      const y = padT + plotH * (1 - frac);
                      const qVal = Math.round(maxQ * frac);
                      return (
                        <g key={frac}>
                          <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
                          <text x={padL - 8} y={y + 3} textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                            {qVal}
                          </text>
                        </g>
                      );
                    })}

                    {/* Tidsakse ticks */}
                    {[0, 6, 12, 18, 24, 30, 36, 42, 48].map((t) => {
                      const x = padL + (t / 48) * plotW;
                      return (
                        <g key={t}>
                          <line x1={x} y1={padT + plotH} x2={x} y2={padT + plotH + 5} stroke="#64748b" strokeWidth="1" />
                          <text x={x} y={padT + plotH + 16} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                            {t}t
                          </text>
                        </g>
                      );
                    })}

                    {/* Nedbørshyetogram i toppen */}
                    <rect
                      x={padL}
                      y={padT}
                      width={(rainDurationHours / 48) * plotW}
                      height={Math.min(45, rainIntensityMmH * 1.3)}
                      fill="#0284c7"
                      opacity="0.5"
                      rx="2"
                    />
                    <text
                      x={padL + 6}
                      y={padT + 14}
                      fill="#e0f2fe"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      Nedbør ({rainIntensityMmH} mm/t i {rainDurationHours}t)
                    </text>

                    {/* Flomflate & hydrogramlinje */}
                    <path
                      d={`${hydrogramPath} L ${(padL + plotW).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${padL} ${(padT + plotH).toFixed(1)} Z`}
                      fill="#0ea5e9"
                      opacity="0.25"
                    />
                    <path d={hydrogramPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                    {/* Retardasjonstid (Lag time) markering */}
                    <line
                      x1={padL + ((rainDurationHours * 0.5) / 48) * plotW}
                      y1={padT + 50}
                      x2={padL + (hydroCalc.peakTime / 48) * plotW}
                      y2={padT + 50}
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeDasharray="2 2"
                    />
                    <circle cx={padL + ((rainDurationHours * 0.5) / 48) * plotW} cy={padT + 50} r="3" fill="#f59e0b" />
                    <circle cx={padL + (hydroCalc.peakTime / 48) * plotW} cy={padT + 50} r="3" fill="#f59e0b" />
                    <text
                      x={padL + (((rainDurationHours * 0.5 + hydroCalc.peakTime) / 2) / 48) * plotW}
                      y={padT + 42}
                      textAnchor="middle"
                      fill="#fbbf24"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      Retardasjonstid t_L: {hydroCalc.lagTimeHours} timer
                    </text>

                    {/* Flomtopp markering */}
                    <circle
                      cx={padL + (hydroCalc.peakTime / 48) * plotW}
                      cy={padT + plotH - (hydroCalc.peakDischargeM3s / maxQ) * plotH}
                      r="5"
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={padL + (hydroCalc.peakTime / 48) * plotW}
                      y={Math.max(padT + 65, padT + plotH - (hydroCalc.peakDischargeM3s / maxQ) * plotH - 8)}
                      textAnchor="middle"
                      fill="#f87171"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      Q_max: {hydroCalc.peakDischargeM3s} m³/s
                    </text>

                    {/* Aksetitler */}
                    <text x={padL - 10} y={padT - 10} fill="#94a3b8" fontSize="10" textAnchor="end">
                      Q [m³/s]
                    </text>
                    <text x={svgW - padR} y={padT + plotH + 32} fill="#94a3b8" fontSize="10" textAnchor="end">
                      Tid etter start [timer]
                    </text>
                  </svg>
                </div>

                {/* Nøkkeltall tabell */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/60 text-center">
                  <div className="rounded-lg bg-card p-2 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase">Flomtopp Q_max</p>
                    <p className="text-base font-bold font-mono text-rose-400">{hydroCalc.peakDischargeM3s} m³/s</p>
                  </div>
                  <div className="rounded-lg bg-card p-2 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase">Spesifikk avrenning</p>
                    <p className="text-base font-bold font-mono text-amber-400">{hydroCalc.specificRunoff} l/s·km²</p>
                  </div>
                  <div className="rounded-lg bg-card p-2 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase">Retardasjonstid t_L</p>
                    <p className="text-base font-bold font-mono text-sky-400">{hydroCalc.lagTimeHours} timer</p>
                  </div>
                  <div className="rounded-lg bg-card p-2 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase">Avrenningskoeff. (C)</p>
                    <p className="text-base font-bold font-mono text-teal-400">{hydroCalc.effectiveC}</p>
                  </div>
                </div>
              </div>
            </div>
          </ModelPanel>

          <ModelNote title="Hvordan lese kurvene geofaglig" tone="teal">
            En <strong>bratt, spiss topp</strong> med kort retardasjonstid (kort lag time) oppstår ved tette flater,
            tynt jordsmonn på bart fjell, bratt terreng eller vannmettet mark. En <strong>lav, bred og forsinket kurve</strong>
            kjennetegner slake nedbørsfelt med høy innsjøprosent (A_SE) og dype sand- og gruslag,
            fordi innsjøene og grunnvannet fungerer som naturlige buffere og kutter flomtoppen.
          </ModelNote>
        </div>
      )}

      {tab === "urbanization_impact" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">
              Arealbruksendringer: Hva skjer når naturen asfalteres?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I et uberørt naturfelt med skog, myr og løsmasser infiltreres 80–90 % av normal nedbør i bakken.
              Når et område bygges ut med veier, tak, parkeringsplasser og rørgater (bekkelukking), synker
              infiltrasjonen mot null. Overflateavrenningen mangedobles og flombølgen skyter fart.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4">
                <span className="inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                  Scenario A: Naturlig nedbørsfelt
                </span>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <li>• <strong>Infiltrasjon:</strong> Høy (vann trekker ned til grunnvannet via markvannssonen).</li>
                  <li>• <strong>Magasiner:</strong> Myrer og skogbunn holder på vannet som svamper.</li>
                  <li>• <strong>Hydrogram:</strong> Lav flomtopp, slak stigning, forsinket kulminasjon (lang t_L).</li>
                  <li>• <strong>Erosjonsfare:</strong> Moderat; elvebunnen er i naturlig dynamisk likevekt.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-4">
                <span className="inline-block rounded bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
                  Scenario B: Urbanisert felt (Tette flater)
                </span>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <li>• <strong>Infiltrasjon:</strong> Ekstremt lav (asfalt og betong er vanntette barrierer).</li>
                  <li>• <strong>Overvannsrør:</strong> Leder vannet umiddelbart ut i vassdraget på få minutter.</li>
                  <li>• <strong>Hydrogram:</strong> Voldsom, spiss flomtopp (Q_maks øker ofte 200–400 %), brå resesjon.</li>
                  <li>• <strong>Overvannsskader:</strong> Kjellerinnsig, kapasitetsbrudd i kulverter og elveerosjon.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Overvannstiltak (LOD - Lokal Overvannsdisponering):</strong>
              <p className="mt-1">
                For å motvirke urban flom krever TEK17 og kommunale arealplaner nå tretrinnsstrategi:
                1) Fange opp og infiltrere småregn lokalt (grønne tak, regnbed, permeabel asfalt),
                2) Forsinke og fordrøye større nedbør (åpne fordrøyningsbassenger, meandrerende bekker),
                og 3) Trygge flomveier for ekstremnedbør uten at bebyggelse skades.
              </p>
            </div>
          </ModelPanel>
        </div>
      )}

      {tab === "hans_case" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">
              Casestudie: Hvorfor utløste ekstremværet Hans (august 2023) 50- til 100-årsflom?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              7.–9. august 2023 traff lavtrykket «Hans» Sør-Norge. Nedbørmengdene var i seg selv enorme (flere stasjoner
              målte over 100 mm på to døgn), men katastrofen ble utløst av <em>forhistorien</em> i det hydrologiske kretsløpet:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="rounded-xl border border-sky-500/30 bg-sky-950/15 p-3.5">
                <p className="font-semibold text-sky-300">1. Ekstrem forutgående markfuktighet</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  Juli 2023 var uvanlig våt over hele Østlandet. Da Hans ankom, var jordas porevolum allerede 100 % vannmettet.
                  Det fantes ikke restkapasitet for infiltrasjon.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-3.5">
                <p className="font-semibold text-amber-300">2. Direkte overflateavrenning</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  Nesten hver eneste millimeter nedbør som falt under Hans, ble omgjort til umiddelbar overflateavrenning (C ≈ 0,85–0,95).
                  Vannet samlet seg i bekkefar og raviner i rekordfart.
                </p>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-3.5">
                <p className="font-semibold text-rose-300">3. Kulminasjon i store innsjøer</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  I små sideelver kulminerte flommen allerede 8.–9. august. I de store innsjømagasinene (Mjøsa, Øyeren og Tyrifjorden)
                  brukte vannmassene opptil en hel uke på å samle seg, med kulminasjon 13.–16. august.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
              <p>
                <strong>Geofaglig lærdom:</strong> Flomstørrelse bestemmes ikke av nedbøren alene,
                men av samspillet mellom atmosfærisk tilførsel og <em>geosfærens/hydrosfærens lagringskapasitet</em> der og da.
              </p>
            </div>
          </ModelPanel>
        </div>
      )}
    </ModelFrame>
  );
}
