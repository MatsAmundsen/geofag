import { useState } from "react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

export function GlacierMassBalanceModel() {
  const [tab, setTab] = useState<"mass_balance" | "permafrost_albedo">("mass_balance");

  // Bre-tilstand
  const [glacierType, setGlacierType] = useState<"maritime" | "continental">("maritime");
  const [winterFactor, setWinterFactor] = useState<number>(0); // -50% to +50%
  const [summerTempAnomaly, setSummerTempAnomaly] = useState<number>(0); // -2 to +3 °C
  const [albedoPreset, setAlbedoPreset] = useState<"fresh" | "normal" | "dirty">("normal");

  // Albedo verdi
  const albedo = albedoPreset === "fresh" ? 0.82 : albedoPreset === "normal" ? 0.65 : 0.45;
  const albedoMeltMultiplier = (1 - albedo) / (1 - 0.65); // 1.0 for normal

  // Parametere avhengig av bretype
  // Maritim bre (eks. Nigardsbreen/Ålfotbreen): Høye nedbørsmengder, stor ablasjon, bratt gradient
  // Kontinental bre (eks. Storbreen/Svalbard): Lav nedbør, tørrere, slakere gradient
  const zMin = glacierType === "maritime" ? 600 : 1100; // m o.h.
  const zMax = glacierType === "maritime" ? 1950 : 2200; // m o.h.
  const baseEla = glacierType === "maritime" ? 1450 : 1680; // m o.h. normalt

  // Beregning av ELA (Likevektslinjen)
  // Hver grad varmere sommer løfter ELA med ca 100-130 meter (NVE tommelfingerregel)
  // 10 % mer vintersnø senker ELA med ca 40-60 meter
  const elaShiftTemp = summerTempAnomaly * 115;
  const elaShiftPrecip = -(winterFactor / 10) * 50;
  const elaShiftAlbedo = (albedoMeltMultiplier - 1) * 85;
  const calculatedEla = Math.round(
    Math.min(zMax + 50, Math.max(zMin - 50, baseEla + elaShiftTemp + elaShiftPrecip + elaShiftAlbedo))
  );

  // Høydekurve for visualisering og integrering (10 trinn)
  const steps = 11;
  const heightStep = (zMax - zMin) / (steps - 1);
  const profileData = Array.from({ length: steps }).map((_, i) => {
    const z = zMin + i * heightStep;
    // Arealfordeling: større akkumulasjonsplatå øverst, smalere bretunge nederst
    const areaFraction = 0.05 + 0.15 * Math.pow(i / (steps - 1), 0.8);

    // Vinterakkumulasjon b_w (meter vannekvivalenter, m v.e.)
    const baseBw = glacierType === "maritime" ? 1.5 + (z - zMin) * 0.0018 : 0.6 + (z - zMin) * 0.0008;
    const bw = Math.max(0.2, baseBw * (1 + winterFactor / 100));

    // Sommerablasjon b_s (negativ, m v.e.)
    const baseBs = glacierType === "maritime" ? -(4.2 - (z - zMin) * 0.0022) : -(2.2 - (z - zMin) * 0.0012);
    const tempEffect = 1 + summerTempAnomaly * 0.18;
    const bs = Math.min(-0.1, baseBs * tempEffect * albedoMeltMultiplier);

    // Nettobalanse b_n = b_w + b_s
    const bn = bw + bs;

    return { z, areaFraction, bw, bs, bn };
  });

  // Total spesifikk nettobalanse Bn (m v.e.)
  const totalArea = profileData.reduce((acc, p) => acc + p.areaFraction, 0);
  const netBalanceBn = profileData.reduce((acc, p) => acc + p.bn * p.areaFraction, 0) / totalArea;

  // AAR (Accumulation Area Ratio)
  const accumArea = profileData
    .filter((p) => p.z >= calculatedEla)
    .reduce((acc, p) => acc + p.areaFraction, 0);
  const aarPercent = Math.round((accumArea / totalArea) * 100);

  // Status for breen
  const glacierStatus =
    netBalanceBn > 0.6
      ? { text: "Kraftig vekst (positiv massebalanse)", tone: "teal" as const, desc: "Breen legger på seg is. Brefall og bretunge vil rykke frem de neste årene." }
      : netBalanceBn > -0.2
        ? { text: "Nær likevekt (stabil massebalanse)", tone: "teal" as const, desc: "Inn (akkumulasjon) og ut (ablasjon) balanserer hverandre. Breen har stabil front." }
        : netBalanceBn > -1.0
          ? { text: "Moderat underskudd (tilbaketrekning)", tone: "warm" as const, desc: "Ablasjonen overgår vintersnøen. Likevektslinjen (ELA) ligger for høyt, og bretungen smelter tilbake." }
          : { text: "Ekstrem massedød (kraftig smelting)", tone: "low" as const, desc: "Nesten hele breen ligger i ablasjonssonen. Firnlag tæres ned, bresprekker blottlegges og breen krymper dramatisk." };

  return (
    <ModelFrame
      kicker="Interaktiv glasiologisk simulator"
      title="Bremassebalanse-kalkulator og kryosfæredynamikk"
      lead="Juster vintersnø, sommertemperatur og albedo for å beregne Likevektslinjen (ELA), akkumulasjonsareal (AAR) og den årlige nettomassebalansen (Bn) i henhold til NVE-metodikk."
      toolbar={
        <div className="flex flex-wrap gap-2">
          <ModelTab active={tab === "mass_balance"} onClick={() => setTab("mass_balance")}>
            1. Bremassebalanse & ELA
          </ModelTab>
          <ModelTab active={tab === "permafrost_albedo"} onClick={() => setTab("permafrost_albedo")}>
            2. Permafrost & albedo-tilbakekobling
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* ── FANE 1: BREMASSEBALANSE ─────────────────────────────────── */}
      {tab === "mass_balance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Type bre i Norge:</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGlacierType("maritime")}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition ${
                        glacierType === "maritime"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-bold">Maritim kystbre</span>
                      <span className="text-[10px] text-muted-foreground">Nigardsbreen / Ålfotbreen (store snømengder & kraftig smelting)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGlacierType("continental")}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition ${
                        glacierType === "continental"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-bold">Kontinental innlandsbre</span>
                      <span className="text-[10px] text-muted-foreground">Storbreen / Svalbard (tørrere klima, kaldere somre)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="winter-factor" className="text-muted-foreground">
                      Vinterakkumulasjon (snømengde, b_w):
                    </label>
                    <span className="font-mono font-bold text-sky-400">
                      {winterFactor >= 0 ? `+${winterFactor}%` : `${winterFactor}%`}
                    </span>
                  </div>
                  <input
                    id="winter-factor"
                    type="range"
                    min="-50"
                    max="50"
                    step="5"
                    value={winterFactor}
                    onChange={(e) => setWinterFactor(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Tørr vinter (-50%)</span>
                    <span>Normalår (0%)</span>
                    <span>Snørik vinter (+50%)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium">
                    <label htmlFor="summer-temp" className="text-muted-foreground">
                      Sommertemperatur-anomali (ΔT_sommer):
                    </label>
                    <span
                      className={`font-mono font-bold ${
                        summerTempAnomaly > 0 ? "text-amber-400" : summerTempAnomaly < 0 ? "text-sky-400" : "text-primary"
                      }`}
                    >
                      {summerTempAnomaly >= 0 ? `+${summerTempAnomaly.toFixed(1)} °C` : `${summerTempAnomaly.toFixed(1)} °C`}
                    </span>
                  </div>
                  <input
                    id="summer-temp"
                    type="range"
                    min="-2.0"
                    max="3.0"
                    step="0.2"
                    value={summerTempAnomaly}
                    onChange={(e) => setSummerTempAnomaly(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Kjølig sommer (-2 °C)</span>
                    <span>Normal (0 °C)</span>
                    <span>Hetebølge (+3 °C)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">Overflatealbedo (refleksjonsevne):</label>
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setAlbedoPreset("fresh")}
                      className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium text-center transition ${
                        albedoPreset === "fresh"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Ren nysnø
                      <span className="block text-[9px] text-muted-foreground">α = 0,82</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlbedoPreset("normal")}
                      className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium text-center transition ${
                        albedoPreset === "normal"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Normal firn
                      <span className="block text-[9px] text-muted-foreground">α = 0,65</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlbedoPreset("dirty")}
                      className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium text-center transition ${
                        albedoPreset === "dirty"
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Sot / alger / grus
                      <span className="block text-[9px] text-muted-foreground">α = 0,45</span>
                    </button>
                  </div>
                </div>

                {/* Glasiologisk resultatpanel */}
                <div className="rounded-xl border border-border/70 bg-card/60 p-3 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Likevektslinje (ELA):</span>
                    <span className="font-mono font-bold text-sky-400">{calculatedEla} m o.h.</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1.5">
                    <span className="text-muted-foreground">Akkumulasjonsareal (AAR):</span>
                    <span className="font-mono font-bold text-teal-400">{aarPercent} %</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Årlig spesifikk nettobalanse (B_n):</span>
                    <span
                      className={`font-mono font-bold ${
                        netBalanceBn >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {netBalanceBn >= 0 ? `+${netBalanceBn.toFixed(2)}` : netBalanceBn.toFixed(2)} m v.e.
                    </span>
                  </div>
                </div>
              </ModelPanel>

              <ModelNote title={glacierStatus.text} tone={glacierStatus.tone}>
                <p>{glacierStatus.desc}</p>
                <p className="mt-1 text-xs">
                  <strong>AAR-regelen:</strong> For at en temperert norsk bre skal være i likevekt
                  (B_n = 0), må akkumulasjonsområdet normalt utgjøre <strong>55–65 %</strong> av
                  breens totale areal. Når ELA presses for høyt og AAR faller under 50 %, krymper
                  breen uvegerlig.
                </p>
              </ModelNote>
            </div>

            {/* Brediagram og profil med ELA-linje */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-slate-300">
                    Bretverrsnitt og balansegradient: {glacierType === "maritime" ? "Nigardsbreen" : "Storbreen"}
                  </span>
                  <span className="font-mono text-xs text-sky-400">
                    ELA = {calculatedEla} m o.h.
                  </span>
                </div>

                <svg viewBox="0 0 520 340" className="w-full">
                  <defs>
                    <linearGradient id="glacier-ice-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>

                  {/* Fjellprofil under breen */}
                  <path
                    d="M 40 280 Q 140 250 220 200 Q 320 130 400 50 L 400 320 L 40 320 Z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  <text x="50" y="305" fill="#64748b" fontSize="11" fontWeight="bold">
                    Fast fjell (Bunn)
                  </text>

                  {/* Islag på fjellet */}
                  <path
                    d="M 40 280 Q 60 260 90 240 Q 180 200 240 160 Q 320 110 390 40 L 400 50 Q 320 130 220 200 Q 140 250 40 280 Z"
                    fill="url(#glacier-ice-grad)"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />

                  {/* ELA-høydekonvertering til SVG Y:
                      zMin -> Y=280, zMax -> Y=40
                  */}
                  {(() => {
                    const elaRatio = Math.max(0, Math.min(1, (calculatedEla - zMin) / (zMax - zMin)));
                    const elaY = 280 - elaRatio * 240;
                    const isBelowGlacier = calculatedEla <= zMin;
                    const isAboveGlacier = calculatedEla >= zMax;

                    return (
                      <g>
                        {/* ELA horisontal stiplet linje */}
                        <line
                          x1="30"
                          y1={elaY}
                          x2="450"
                          y2={elaY}
                          stroke="#facc15"
                          strokeWidth="2.5"
                          strokeDasharray="6 4"
                        />
                        <rect
                          x="320"
                          y={elaY - 22}
                          width="125"
                          height="20"
                          rx="4"
                          fill="#0f172a"
                          stroke="#facc15"
                          strokeWidth="1"
                        />
                        <text
                          x="382"
                          y={elaY - 8}
                          textAnchor="middle"
                          fill="#fef08a"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          ELA: {calculatedEla} m o.h.
                        </text>

                        {/* Akkumulasjonsareal (blå markør over ELA) */}
                        {!isAboveGlacier && (
                          <g>
                            <text x="310" y={Math.max(65, elaY - 40)} fill="#38bdf8" fontSize="11" fontWeight="bold">
                              ❄️ Akkumulasjonsområde
                            </text>
                            <text x="310" y={Math.max(80, elaY - 26)} fill="#bae6fd" fontSize="9">
                              Snø overlever (b_n &gt; 0)
                            </text>
                          </g>
                        )}

                        {/* Ablasjonsareal (rød markør under ELA) */}
                        {!isBelowGlacier && (
                          <g>
                            <text x="100" y={Math.min(270, elaY + 35)} fill="#fb7185" fontSize="11" fontWeight="bold">
                              ☀️ Ablasjonsområde
                            </text>
                            <text x="100" y={Math.min(285, elaY + 49)} fill="#fda4af" fontSize="9">
                              Netto smelting (b_n &lt; 0)
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}

                  {/* Høydeskala på høyre kant */}
                  <line x1="440" y1="40" x2="440" y2="280" stroke="#475569" strokeWidth="1" />
                  <text x="450" y="45" fill="#94a3b8" fontSize="9">
                    {zMax}m (Topp)
                  </text>
                  <text x="450" y="160" fill="#94a3b8" fontSize="9">
                    {Math.round((zMax + zMin) / 2)}m
                  </text>
                  <text x="450" y="280" fill="#94a3b8" fontSize="9">
                    {zMin}m (Tunge)
                  </text>

                  {/* Balansegradient-kurve b_n(z) i miniatyr */}
                  <g transform="translate(460, 0)">
                    <line x1="20" y1="40" x2="20" y2="280" stroke="#334155" strokeWidth="1" />
                    <line x1="5" y1="160" x2="35" y2="160" stroke="#334155" strokeWidth="1" />
                    <text x="20" y="30" textAnchor="middle" fill="#64748b" fontSize="8">
                      b_n
                    </text>
                    <text x="5" y="155" fill="#f43f5e" fontSize="7">
                      -
                    </text>
                    <text x="30" y="155" fill="#0ea5e9" fontSize="7">
                      +
                    </text>
                  </g>
                </svg>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-5 rounded bg-sky-300" />
                    <span className="text-slate-300">Akkumulasjonssone (Nettopluss)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-5 rounded bg-rose-400" />
                    <span className="text-slate-300">Ablasjonssone (Nettominus)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-5 rounded bg-yellow-400" />
                    <span className="text-yellow-300 font-semibold">ELA (Likevektslinje: b_n = 0)</span>
                  </div>
                </div>
              </div>

              {/* Formelkort */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-2">
                <div className="font-semibold text-primary">NVE-formler for bremassebalanse:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                  <div className="rounded bg-background/80 p-2.5 border border-border">
                    <p className="text-muted-foreground text-[10px]">Spesifikk nettobalanse:</p>
                    <p className="text-sky-400 font-bold mt-0.5">b_n = b_w + b_s = c - a</p>
                    <p className="text-[10px] text-muted-foreground mt-1">der c = akkumulasjon, a = ablasjon</p>
                  </div>
                  <div className="rounded bg-background/80 p-2.5 border border-border">
                    <p className="text-muted-foreground text-[10px]">Total massebalanse (volum):</p>
                    <p className="text-teal-400 font-bold mt-0.5">B_n = (1/A_tot) · ∫ b_n(z) · A(z) dz</p>
                    <p className="text-[10px] text-muted-foreground mt-1">måles i meter vannekvivalenter (m v.e.)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FANE 2: PERMAFROST & ALBEDO ────────────────────────────── */}
      {tab === "permafrost_albedo" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <ModelPanel className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-display font-semibold text-sm text-foreground">
                  Permafrost og det aktive laget
                </h4>
                <p>
                  <strong>Permafrost</strong> er definert termisk: grunn som holder under{" "}
                  <strong>0 °C i minst to sammenhengende år</strong> (uavhengig av om grunnen består
                  av fjell, grus, torv eller is).
                </p>
                <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3">
                  <p className="font-semibold text-sky-300">Det aktive laget (Active Layer):</p>
                  <p className="mt-1">
                    Det øverste laget over permafrosten som tiner hver sommer og fryser hver vinter.
                    Tykkelsen varierer fra <strong>30 cm til 2 meter</strong> i Norge og på Svalbard.
                    Når somrene blir varmere, forplanter varmen seg dypere, og det aktive laget vokser.
                  </p>
                </div>
                <div className="space-y-1.5 pt-1">
                  <strong className="text-foreground">Kritiske geofarer ved tining:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Tap av mekanisk bæreevne:</strong> Når is i løsmasser smelter, mettes
                      jorden med vann. Veier bryter sammen, rørledninger vrir seg og bygninger i
                      Longyearbyen setter seg i grunnen.
                    </li>
                    <li>
                      <strong>Fjellskred i høyfjellet:</strong> Is i sprekker (isfyllte sprekker) fungerer
                      som armering. Når permafrosten tiner i bratte fjellsider (f.eks. i Troms og
                      Møre), svekkes friksjonen og gigantiske steinpartier raser ut.
                    </li>
                    <li>
                      <strong>Klimapermafrost-tilbakekobling:</strong> Organisk materiale som har vært
                      frosset i tusener av år brytes ned av mikrober når det tiner, og slipper ut{" "}
                      <strong>CO₂ og CH₄ (metan)</strong>.
                    </li>
                  </ul>
                </div>
              </ModelPanel>
            </div>

            <div className="space-y-4 lg:col-span-6">
              <ModelPanel className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-display font-semibold text-sm text-foreground">
                  Havis og is-albedo-tilbakekobling
                </h4>
                <p>
                  <strong>Albedo (α)</strong> er andelen innkommende solstråling som reflekteres fra en
                  overflate. Verdien går fra 0 (helt sort, 100 % absorpsjon) til 1,0 (perfekt speil).
                </p>
                <div className="grid grid-cols-2 gap-2 text-center font-mono pt-1">
                  <div className="rounded-lg border border-sky-500/30 bg-sky-950/25 p-2.5">
                    <p className="text-[10px] text-sky-300 font-sans uppercase">Havis / Nysnø</p>
                    <p className="text-base font-bold text-sky-300 mt-0.5">α = 0,85</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Reflekterer 85 % · Absorberer kun 15 %</p>
                  </div>
                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/25 p-2.5">
                    <p className="text-[10px] text-amber-300 font-sans uppercase">Åpent hav</p>
                    <p className="text-base font-bold text-amber-300 mt-0.5">α = 0,07</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Reflekterer 7 % · Absorberer hele 93 %</p>
                  </div>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 mt-2">
                  <p className="font-semibold text-rose-300">Den positive tilbakekoblingssløyfen:</p>
                  <p className="mt-1">
                    Når klimaet varmes opp og havisen smelter, erstattes et hvitt speil med mørkt hav.
                    Det åpne havet absorberer over <strong>6 ganger mer solvarme</strong> enn isen.
                    Vannet varmes ytterligere opp, smelter mer is neste sesong, og forsterker oppvarmingen.
                    Dette er hovedforklaringen på at Arktis varmes opp <strong>3–4 ganger raskere</strong>{" "}
                    enn resten av kloden (arktisk forsterkning).
                  </p>
                </div>
              </ModelPanel>
            </div>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
