import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HurricaneSpinModel } from "./hurricane-spin-model";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type Tab = "all" | "winds" | "coriolis" | "hurricanes";

export function WindSystemModel() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isAnimated, setIsAnimated] = useState(true);
  const [showStraightGuides, setShowStraightGuides] = useState(false);

  return (
    <ModelFrame
      kicker="Interaktiv modell"
      title="Jordas globale vinder"
      lead="Trykkforskjeller setter lufta i gang. Coriolis bøyer den. Resultatet er beltene, cellene og orkanens rotasjon."
      toolbar={
        <>
          <Button type="button" size="sm" variant="secondary" onClick={() => setIsAnimated((v) => !v)}>
            {isAnimated ? "Pause animasjon" : "Start animasjon"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={showStraightGuides ? "default" : "secondary"}
            onClick={() => setShowStraightGuides((v) => !v)}
          >
            {showStraightGuides ? "Skjul rett bane" : "Vis rett bane"}
          </Button>
        </>
      }
    >
      <div className={isAnimated ? undefined : "model-paused"}>
        <ModelMarkers />

        <div className="mb-5 flex flex-wrap gap-2">
          <ModelTab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            1. Klode og vinder
          </ModelTab>
          <ModelTab active={activeTab === "winds"} onClick={() => setActiveTab("winds")}>
            2. Celler
          </ModelTab>
          <ModelTab active={activeTab === "coriolis"} onClick={() => setActiveTab("coriolis")}>
            3. Coriolis
          </ModelTab>
          <ModelTab active={activeTab === "hurricanes"} onClick={() => setActiveTab("hurricanes")}>
            4. Orkaner
          </ModelTab>
        </div>

        {activeTab === "all" ? (
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-2 flex w-full items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
                <span>Jordkloden og de globale vindene</span>
                <span className="rounded bg-primary/15 px-2 py-0.5 text-[11px] normal-case text-primary">
                  Rotasjon: vest mot øst
                </span>
              </div>

              <svg viewBox="0 0 760 700" className="mx-auto h-auto w-full max-w-[700px] select-none">
                <defs>
                  <radialGradient id="gGlobeGrad" cx="38%" cy="32%" r="70%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="55%" stopColor="#0f172a" />
                    <stop offset="90%" stopColor="#020617" />
                    <stop offset="100%" stopColor="#000000" />
                  </radialGradient>
                  <radialGradient id="gAtmoGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="82%" stopColor="#38bdf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx="360" cy="350" r="295" fill="url(#gAtmoGlow)" />
                <circle cx="360" cy="350" r="260" fill="url(#gGlobeGrad)" stroke="#38bdf8" strokeWidth="2.5" />

                <ellipse cx="360" cy="95" rx="30" ry="6" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
                <path d="M 230 124 Q 360 145 490 124" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
                <path d="M 135 220 Q 360 250 585 220" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.9" />
                <line x1="100" y1="350" x2="620" y2="350" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 3" />
                <path d="M 135 480 Q 360 450 585 480" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.9" />
                <path d="M 230 576 Q 360 555 490 576" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
                <ellipse cx="360" cy="605" rx="30" ry="6" fill="none" stroke="#93c5fd" strokeWidth="1.5" />

                <line x1="360" y1="65" x2="360" y2="635" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
                <text x="360" y="55" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">
                  Nordpolen (90°N) — høytrykk (H)
                </text>
                <text x="360" y="652" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">
                  Sørpolen (90°S) — høytrykk (H)
                </text>

                <path d="M 330 75 Q 360 85 390 75" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#mdl-cyan)" />
                <text x="360" y="96" fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">
                  Rotasjon
                </text>

                {showStraightGuides ? (
                  <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                    <path d="M 310 100 L 310 135" />
                    <path d="M 370 100 L 370 135" />
                    <path d="M 430 105 L 430 138" />
                  </g>
                ) : null}
                <path d="M 310 100 C 310 112, 298 124, 275 132" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mdl-blue)" className="model-wind-flow" />
                <path d="M 370 100 C 370 114, 355 126, 335 136" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mdl-blue)" className="model-wind-flow" />
                <path d="M 430 105 C 430 118, 415 128, 395 137" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mdl-blue)" className="model-wind-flow" />
                <text x="360" y="122" fill="#bfdbfe" fontSize="11" fontWeight="700" textAnchor="middle">
                  Polare østavinder (N)
                </text>

                {showStraightGuides ? (
                  <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                    <path d="M 200 220 L 200 160" />
                    <path d="M 270 230 L 270 165" />
                    <path d="M 340 235 L 340 170" />
                  </g>
                ) : null}
                <path d="M 200 220 C 200 195, 225 175, 255 160" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <path d="M 270 230 C 270 200, 295 180, 335 165" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <path d="M 340 235 C 340 205, 365 185, 415 170" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <path d="M 430 230 C 430 205, 455 185, 495 170" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <text x="360" y="195" fill="#6ee7b7" fontSize="12" fontWeight="700" textAnchor="middle">
                  Vestavinder (N)
                </text>

                {showStraightGuides ? (
                  <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                    <path d="M 220 245 L 220 335" />
                    <path d="M 300 252 L 300 342" />
                    <path d="M 380 252 L 380 342" />
                  </g>
                ) : null}
                <path d="M 220 245 C 220 280, 195 310, 160 335" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <path d="M 300 252 C 300 288, 275 318, 240 342" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <path d="M 380 252 C 380 288, 355 318, 320 342" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <path d="M 460 248 C 460 285, 435 315, 400 340" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <text x="320" y="295" fill="#fde68a" fontSize="13" fontWeight="700" textAnchor="middle">
                  Nordøstpassaten
                </text>

                <rect x="220" y="341" width="280" height="18" rx="9" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1.2" />
                <text x="360" y="354" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
                  Ekvator (0°) — ITCZ (lavtrykk)
                </text>

                {showStraightGuides ? (
                  <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                    <path d="M 220 455 L 220 365" />
                    <path d="M 300 448 L 300 358" />
                  </g>
                ) : null}
                <path d="M 220 455 C 220 420, 195 390, 160 365" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <path d="M 300 448 C 300 412, 275 382, 240 358" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <path d="M 380 448 C 380 412, 355 382, 320 358" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <path d="M 460 452 C 460 415, 435 385, 400 360" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
                <text x="320" y="415" fill="#fde68a" fontSize="13" fontWeight="700" textAnchor="middle">
                  Sørøstpassaten
                </text>

                <path d="M 200 480 C 200 505, 225 525, 255 540" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <path d="M 270 470 C 270 500, 295 520, 335 535" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <path d="M 340 465 C 340 495, 365 515, 415 530" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <path d="M 430 470 C 430 495, 455 515, 495 530" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
                <text x="360" y="505" fill="#6ee7b7" fontSize="12" fontWeight="700" textAnchor="middle">
                  Vestavinder (S)
                </text>

                <path d="M 310 600 C 310 588, 298 576, 275 568" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mdl-blue)" className="model-wind-flow" />
                <path d="M 370 600 C 370 586, 355 574, 335 564" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mdl-blue)" className="model-wind-flow" />
                <path d="M 430 595 C 430 582, 415 572, 395 563" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mdl-blue)" className="model-wind-flow" />
                <text x="360" y="582" fill="#bfdbfe" fontSize="11" fontWeight="700" textAnchor="middle">
                  Polare østavinder (S)
                </text>

                <g fontSize="10" fontWeight="700" textAnchor="end">
                  <text x="90" y="100" fill="#38bdf8">
                    90°N: polart H
                  </text>
                  <text x="90" y="220" fill="#38bdf8">
                    60°N: subpolart L
                  </text>
                  <text x="90" y="300" fill="#fbbf24">
                    30°N: subtropisk H
                  </text>
                  <text x="90" y="354" fill="#ef4444">
                    0°: ekvator L
                  </text>
                  <text x="90" y="405" fill="#fbbf24">
                    30°S: subtropisk H
                  </text>
                  <text x="90" y="560" fill="#38bdf8">
                    60°S: subpolart L
                  </text>
                  <text x="90" y="615" fill="#38bdf8">
                    90°S: polart H
                  </text>
                </g>

                <g transform="translate(530, 235)">
                  <circle cx="0" cy="0" r="34" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                  <path d="M 24 0 A 24 24 0 0 0 0 -24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mdl-yellow)" />
                  <path d="M -24 0 A 24 24 0 0 0 0 24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mdl-yellow)" />
                  <circle cx="0" cy="0" r="10" fill="#ef4444" />
                  <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">
                    L
                  </text>
                  <rect x="42" y="-22" width="165" height="44" rx="8" fill="#0b1329" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="50" y="-8" fill="#ef4444" fontSize="11" fontWeight="700">
                    Orkan, nordlig halvkule
                  </text>
                  <text x="50" y="12" fill="#fde68a" fontSize="10" fontWeight="700">
                    Mot klokken
                  </text>
                </g>

                <g transform="translate(530, 465)">
                  <circle cx="0" cy="0" r="34" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                  <path d="M -24 0 A 24 24 0 0 0 0 -24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mdl-yellow)" />
                  <path d="M 24 0 A 24 24 0 0 0 0 24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mdl-yellow)" />
                  <circle cx="0" cy="0" r="10" fill="#ef4444" />
                  <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">
                    L
                  </text>
                  <rect x="42" y="-22" width="165" height="44" rx="8" fill="#0b1329" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="50" y="-8" fill="#ef4444" fontSize="11" fontWeight="700">
                    Orkan, sørlig halvkule
                  </text>
                  <text x="50" y="12" fill="#fde68a" fontSize="10" fontWeight="700">
                    Med klokken
                  </text>
                </g>
              </svg>
            </ModelPanel>

            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="To steg fra H til L">
                <p>Vinden starter rett ut fra trykksenteret og bøyer etter hvert:</p>
                <p>
                  <strong className="text-lava">1. Trykkgradient.</strong> Lufta går rett fra høytrykk
                  mot lavtrykk.
                </p>
                <p>
                  <strong className="text-primary">2. Coriolis.</strong> Banen bøyes jevnt til høyre i
                  nord og til venstre i sør.
                </p>
              </ModelNote>
              <ModelNote title="Orkanens rotasjon" tone="low">
                <p>Lavtrykket suger inn luft fra alle kanter. Coriolis bestemmer spinnet.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg border border-border bg-card p-2.5">
                    <p className="text-xs text-[#e08a8a]">Nordlig</p>
                    <p className="mt-1 text-sm font-medium text-foreground">Mot klokken</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-2.5">
                    <p className="text-xs text-[#e08a8a]">Sørlig</p>
                    <p className="mt-1 text-sm font-medium text-foreground">Med klokken</p>
                  </div>
                </div>
              </ModelNote>
            </div>
          </div>
        ) : null}

        {activeTab === "winds" ? (
          <ModelPanel>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-medium">Snitt gjennom cellene</p>
                <p className="text-sm text-muted-foreground">
                  Stigende luft under L, synkende under H, overflatevinder nederst.
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="rounded bg-[#e08a8a]/20 px-2.5 py-1 text-[#e08a8a]">Stigende luft (L)</span>
                <span className="rounded bg-primary/20 px-2.5 py-1 text-primary">Synkende luft (H)</span>
              </div>
            </div>

            <svg viewBox="0 0 880 500" className="mx-auto h-auto w-full max-w-[860px] select-none">
              <defs>
                <linearGradient id="gHadleyCellGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="gFerrelCellGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="gPolarCellGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              <path d="M 80 180 Q 220 170 340 140 Q 560 110 780 90" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="780" y="80" fill="#94a3b8" fontSize="10" textAnchor="end">
                Tropopausen (16 km ved ekvator / 8 km ved polen)
              </text>

              <rect x="50" y="380" width="780" height="25" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="2" />

              <line x1="100" y1="370" x2="100" y2="405" stroke="#94a3b8" strokeWidth="2" />
              <text x="100" y="425" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">
                90°N (pol)
              </text>
              <rect x="55" y="435" width="90" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.2" />
              <text x="100" y="450" fill="#93c5fd" fontSize="11" fontWeight="700" textAnchor="middle">
                Høytrykk (H)
              </text>

              <line x1="280" y1="370" x2="280" y2="405" stroke="#94a3b8" strokeWidth="2" />
              <text x="280" y="425" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">
                60°N (polarfront)
              </text>
              <rect x="235" y="435" width="90" height="22" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.2" />
              <text x="280" y="450" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
                Lavtrykk (L)
              </text>

              <line x1="520" y1="370" x2="520" y2="405" stroke="#94a3b8" strokeWidth="2" />
              <text x="520" y="425" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">
                30°N (subtropisk)
              </text>
              <rect x="475" y="435" width="90" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.2" />
              <text x="520" y="450" fill="#93c5fd" fontSize="11" fontWeight="700" textAnchor="middle">
                Høytrykk (H)
              </text>

              <line x1="760" y1="370" x2="760" y2="405" stroke="#ef4444" strokeWidth="3" />
              <text x="760" y="425" fill="#ef4444" fontSize="13" fontWeight="700" textAnchor="middle">
                0° (ekvator)
              </text>
              <rect x="715" y="435" width="90" height="22" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.2" />
              <text x="760" y="450" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
                Lavtrykk (L)
              </text>

              <path d="M 100 370 L 100 180 Q 190 170 280 180 L 280 370 Z" fill="url(#gPolarCellGrad)" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
              <g className="model-vert-pulse">
                <line x1="90" y1="200" x2="90" y2="340" stroke="#60a5fa" strokeWidth="4" markerEnd="url(#mdl-blue)" />
                <line x1="115" y1="190" x2="115" y2="350" stroke="#60a5fa" strokeWidth="4" markerEnd="url(#mdl-blue)" />
              </g>
              <text x="125" y="270" fill="#93c5fd" fontSize="10" fontWeight="700">
                Synkende kald luft
              </text>
              <g className="model-vert-pulse">
                <line x1="265" y1="350" x2="265" y2="200" stroke="#ef4444" strokeWidth="4" markerEnd="url(#mdl-red)" />
              </g>
              <text x="255" y="270" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="end">
                Stigende luft
              </text>
              <path d="M 260 175 L 130 175" stroke="#ffffff" strokeWidth="3" markerEnd="url(#mdl-cyan)" className="model-wind-flow" />
              <path d="M 130 365 L 260 365" stroke="#38bdf8" strokeWidth="4.5" markerEnd="url(#mdl-cyan)" className="model-wind-fast" />
              <text x="190" y="355" fill="#93c5fd" fontSize="11" fontWeight="700" textAnchor="middle">
                Polare østavinder
              </text>
              <text x="190" y="130" fill="#38bdf8" fontSize="13" fontWeight="700" textAnchor="middle">
                POLARCELLE
              </text>

              <path d="M 280 370 L 280 160 Q 400 145 520 140 L 520 370 Z" fill="url(#gFerrelCellGrad)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
              <g className="model-vert-pulse">
                <line x1="505" y1="160" x2="505" y2="350" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mdl-amber)" />
              </g>
              <text x="495" y="250" fill="#fde68a" fontSize="10" fontWeight="700" textAnchor="end">
                Synkende luft
              </text>
              <path d="M 300 155 L 490 145" stroke="#ffffff" strokeWidth="3" markerEnd="url(#mdl-green)" className="model-wind-flow" />
              <path d="M 495 365 L 305 365" stroke="#10b981" strokeWidth="4.5" markerEnd="url(#mdl-green)" className="model-wind-fast" />
              <text x="400" y="355" fill="#6ee7b7" fontSize="12" fontWeight="700" textAnchor="middle">
                Vestavinder
              </text>
              <text x="400" y="110" fill="#10b981" fontSize="13" fontWeight="700" textAnchor="middle">
                FERREL-CELLE
              </text>

              <path d="M 520 370 L 520 130 Q 640 100 760 90 L 760 370 Z" fill="url(#gHadleyCellGrad)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
              <g className="model-vert-pulse">
                <line x1="740" y1="350" x2="740" y2="120" stroke="#ef4444" strokeWidth="4.5" markerEnd="url(#mdl-red)" />
                <line x1="765" y1="350" x2="765" y2="105" stroke="#ef4444" strokeWidth="4.5" markerEnd="url(#mdl-red)" />
              </g>
              <text x="730" y="230" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="end">
                Stigende varmluft
              </text>
              <g className="model-vert-pulse">
                <line x1="535" y1="150" x2="535" y2="350" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mdl-amber)" />
              </g>
              <path d="M 725 100 L 550 130" stroke="#ffffff" strokeWidth="3" markerEnd="url(#mdl-amber)" className="model-wind-flow" />
              <path d="M 545 365 L 730 365" stroke="#fbbf24" strokeWidth="5" markerEnd="url(#mdl-amber)" className="model-wind-fast" />
              <text x="635" y="355" fill="#fde68a" fontSize="13" fontWeight="700" textAnchor="middle">
                Nordøstpassaten
              </text>
              <text x="635" y="65" fill="#ef4444" fontSize="14" fontWeight="700" textAnchor="middle">
                HADLEY-CELLE
              </text>
            </svg>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <ModelNote title="Hadley (0°–30°)" tone="warm">
                <p>
                  Varm luft stiger ved ekvator (ITCZ) og synker ved 30° (subtropisk høytrykk).
                  Returluften blir passatene.
                </p>
              </ModelNote>
              <ModelNote title="Ferrel (30°–60°)">
                <p>
                  Ikke en egen motor. Den drives av vandrende lavtrykk mellom de to andre cellene.
                  Overflatevinden blir vestavindene. Her ligger Norge.
                </p>
              </ModelNote>
              <ModelNote title="Polar (60°–90°)">
                <p>
                  Kald luft synker ved polen og strømmer mot 60° som polare østavinder. Møtet med
                  mildluft er polarfronten.
                </p>
              </ModelNote>
            </div>
          </ModelPanel>
        ) : null}

        {activeTab === "coriolis" ? (
          <ModelPanel>
            <p className="font-display text-lg font-medium">Hvordan coriolis bøyer banen</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Jordas omløpshastighet avhenger av breddegraden: ved ekvator omtrent 1670 km/t, ved
              polene null.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center rounded-xl border border-primary/30 bg-card p-5">
                <p className="mb-3 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  Nordlig halvkule — til høyre
                </p>
                <svg viewBox="0 0 320 260" className="my-2 h-auto w-full max-w-[280px]">
                  <circle cx="160" cy="130" r="100" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <line x1="160" y1="30" x2="160" y2="230" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="60" y1="130" x2="260" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="160" y="24" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">
                    Nord
                  </text>
                  <text x="275" y="134" fill="#94a3b8" fontSize="11" fontWeight="700">
                    Øst
                  </text>
                  <text x="160" y="246" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">
                    Sør
                  </text>
                  <text x="40" y="134" fill="#94a3b8" fontSize="11" fontWeight="700">
                    Vest
                  </text>
                  <line x1="160" y1="210" x2="160" y2="60" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 160 210 C 160 160, 180 110, 225 70" fill="none" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#mdl-blue)" />
                  <text x="145" y="150" fill="#64748b" fontSize="10" textAnchor="end">
                    Uten coriolis
                  </text>
                  <text x="205" y="145" fill="#60a5fa" fontSize="11" fontWeight="700">
                    Avbøyd til høyre
                  </text>
                </svg>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  All bevegelig luft presses mot høyre i fartsretningen.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-xl border border-primary/30 bg-card p-5">
                <p className="mb-3 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  Sørlig halvkule — til venstre
                </p>
                <svg viewBox="0 0 320 260" className="my-2 h-auto w-full max-w-[280px]">
                  <circle cx="160" cy="130" r="100" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <line x1="160" y1="30" x2="160" y2="230" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="60" y1="130" x2="260" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="160" y="24" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">
                    Nord
                  </text>
                  <text x="275" y="134" fill="#94a3b8" fontSize="11" fontWeight="700">
                    Øst
                  </text>
                  <text x="160" y="246" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">
                    Sør
                  </text>
                  <text x="40" y="134" fill="#94a3b8" fontSize="11" fontWeight="700">
                    Vest
                  </text>
                  <line x1="160" y1="50" x2="160" y2="200" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 160 50 C 160 100, 140 150, 95 190" fill="none" stroke="#818cf8" strokeWidth="3.5" markerEnd="url(#mdl-blue)" />
                  <text x="175" y="120" fill="#64748b" fontSize="10">
                    Uten coriolis
                  </text>
                  <text x="80" y="120" fill="#a5b4fc" fontSize="11" fontWeight="700" textAnchor="end">
                    Avbøyd til venstre
                  </text>
                </svg>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  All bevegelig luft presses mot venstre i fartsretningen.
                </p>
              </div>
            </div>
          </ModelPanel>
        ) : null}

        {activeTab === "hurricanes" ? <HurricaneSpinModel embedded /> : null}
      </div>
    </ModelFrame>
  );
}
