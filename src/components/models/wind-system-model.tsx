"use client";

import { useState } from "react";

export function WindSystemModel() {
  const [activeTab, setActiveTab] = useState<"all" | "winds" | "coriolis" | "hurricanes">("all");
  const [isAnimated, setIsAnimated] = useState(true);
  const [showStraightGuides, setShowStraightGuides] = useState(false);

  return (
    <div className={`my-8 bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-8 shadow-xl dark:bg-slate-900 dark:border-slate-800 transition-all ${isAnimated ? "" : "model-paused"}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes windFlow {
          0% { stroke-dashoffset: 36; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes windFlowFast {
          0% { stroke-dashoffset: 28; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes verticalPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.96); }
          50% { opacity: 1; transform: scaleY(1.04); }
        }
        .anim-wind-flow {
          stroke-dasharray: 8 4;
          animation: windFlow 1.8s linear infinite;
        }
        .anim-wind-fast-flow {
          stroke-dasharray: 6 3;
          animation: windFlowFast 1.2s linear infinite;
        }
        .anim-vert-pulse {
          transform-origin: center;
          animation: verticalPulse 1.8s ease-in-out infinite;
        }
        .model-paused * {
          animation-play-state: paused !important;
        }
      `}} />

      {/* Header & Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🌍 Interaktiv Modell: Atmosfærisk Sirkulasjon</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Jordens globale vindsirkulasjon & orkaner
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Se hvordan trykkforskjeller, Coriolis-avbøyning og jordrotasjon former vindbeltene og orkaners rotasjon.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAnimated(!isAnimated)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>{isAnimated ? "⏸️ Pause animasjon" : "▶️ Start animasjon"}</span>
          </button>
          <button
            onClick={() => setShowStraightGuides(!showStraightGuides)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>📐 {showStraightGuides ? "Skjul rett bane" : "Vis rett bane (uten Coriolis)"}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2 sm:gap-4 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveTab("all")}
          className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === "all"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          🌐 1. Hovedoversikt (Klode & Vinder)
        </button>
        <button
          onClick={() => setActiveTab("winds")}
          className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === "winds"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          💨 2. Globale Vinder & Celler (Animert)
        </button>
        <button
          onClick={() => setActiveTab("coriolis")}
          className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === "coriolis"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          ⚖️ 3. Coriolis-mekanismen
        </button>
        <button
          onClick={() => setActiveTab("hurricanes")}
          className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === "hurricanes"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          🌀 4 & 5. Orkaner (Nord vs. Sør)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: HOVEDOVERSIKT */}
      {/* ========================================================================= */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col items-center bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 self-start flex items-center justify-between w-full">
              <span>Jordkloden & Globale Vinder</span>
              <span className="text-[11px] text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">Jordrotasjon: Vest mot Øst ⟲</span>
            </div>

            <svg viewBox="0 0 760 700" className="w-full max-w-[700px] h-auto select-none">
              <defs>
                <radialGradient id="gGlobeGrad" cx="38%" cy="32%" r="70%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="55%" stopColor="#0f172a" />
                  <stop offset="90%" stopColor="#020617" />
                  <stop offset="100%" stopColor="#000000" />
                </radialGradient>
                <radialGradient id="gAtmoGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="82%" stopColor="#38bdf8" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
                </radialGradient>
                <marker id="mArrRed" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
                </marker>
                <marker id="mArrBlue" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#93c5fd" />
                </marker>
                <marker id="mArrCyan" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="mArrGreen" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#34d399" />
                </marker>
                <marker id="mArrAmber" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#fbbf24" />
                </marker>
                <marker id="mArrYellow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#facc15" />
                </marker>
              </defs>

              <circle cx="360" cy="350" r="295" fill="url(#gAtmoGlow)" />
              <circle cx="360" cy="350" r="260" fill="url(#gGlobeGrad)" stroke="#38bdf8" strokeWidth="2.5" />

              {/* Latitudes */}
              <ellipse cx="360" cy="95" rx="30" ry="6" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
              <path d="M 230 124 Q 360 145 490 124" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
              <path d="M 135 220 Q 360 250 585 220" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.9" />
              <line x1="100" y1="350" x2="620" y2="350" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 3" />
              <path d="M 135 480 Q 360 450 585 480" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.9" />
              <path d="M 230 576 Q 360 555 490 576" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
              <ellipse cx="360" cy="605" rx="30" ry="6" fill="none" stroke="#93c5fd" strokeWidth="1.5" />

              {/* Polar Axis */}
              <line x1="360" y1="65" x2="360" y2="635" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
              <text x="360" y="55" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Nordpolen (90°N) – Høytrykk (H)</text>
              <text x="360" y="652" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Sydpolen (90°S) – Høytrykk (H)</text>

              {/* Rotation Indicator */}
              <path d="M 330 75 Q 360 85 390 75" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#mArrCyan)" />
              <text x="360" y="96" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Rotasjon ⟲</text>

              {/* 1. Polare østavinder (Nord) */}
              {showStraightGuides && (
                <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                  <path d="M 310 100 L 310 135" />
                  <path d="M 370 100 L 370 135" />
                  <path d="M 430 105 L 430 138" />
                </g>
              )}
              <path d="M 310 100 C 310 112, 298 124, 275 132" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mArrBlue)" className="anim-wind-flow" />
              <path d="M 370 100 C 370 114, 355 126, 335 136" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mArrBlue)" className="anim-wind-flow" />
              <path d="M 430 105 C 430 118, 415 128, 395 137" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mArrBlue)" className="anim-wind-flow" />
              <text x="360" y="122" fill="#bfdbfe" fontSize="11" fontWeight="bold" textAnchor="middle">Polare østavinder (N)</text>

              {/* 2. Vestavinder (Nord) */}
              {showStraightGuides && (
                <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                  <path d="M 200 220 L 200 160" />
                  <path d="M 270 230 L 270 165" />
                  <path d="M 340 235 L 340 170" />
                </g>
              )}
              <path d="M 200 220 C 200 195, 225 175, 255 160" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 270 230 C 270 200, 295 180, 335 165" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 340 235 C 340 205, 365 185, 415 170" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 430 230 C 430 205, 455 185, 495 170" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <text x="360" y="195" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">Vestavinder (N)</text>

              {/* 3. Nordøstpassaten */}
              {showStraightGuides && (
                <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                  <path d="M 220 245 L 220 335" />
                  <path d="M 300 252 L 300 342" />
                  <path d="M 380 252 L 380 342" />
                </g>
              )}
              <path d="M 220 245 C 220 280, 195 310, 160 335" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 300 252 C 300 288, 275 318, 240 342" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 380 252 C 380 288, 355 318, 320 342" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 460 248 C 460 285, 435 315, 400 340" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <text x="320" y="295" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">Nordøstpassaten</text>

              {/* Ekvator */}
              <rect x="220" y="341" width="280" height="18" rx="9" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1.2" />
              <text x="360" y="354" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Ekvator (0°) – ITCZ (Lavtrykk)</text>

              {/* 4. Sørøstpassaten */}
              {showStraightGuides && (
                <g stroke="#64748b" strokeWidth="1" strokeDasharray="2 2">
                  <path d="M 220 455 L 220 365" />
                  <path d="M 300 448 L 300 358" />
                </g>
              )}
              <path d="M 220 455 C 220 420, 195 390, 160 365" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 300 448 C 300 412, 275 382, 240 358" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 380 448 C 380 412, 355 382, 320 358" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 460 452 C 460 415, 435 385, 400 360" fill="none" stroke="#fbbf24" strokeWidth="3.2" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <text x="320" y="415" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">Sørøstpassaten</text>

              {/* 5. Vestavinder (Sør) */}
              <path d="M 200 480 C 200 505, 225 525, 255 540" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 270 470 C 270 500, 295 520, 335 535" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 340 465 C 340 495, 365 515, 415 530" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 430 470 C 430 495, 455 515, 495 530" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <text x="360" y="505" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">Vestavinder (S)</text>

              {/* 6. Polare østavinder (Sør) */}
              <path d="M 310 600 C 310 588, 298 576, 275 568" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mArrBlue)" className="anim-wind-flow" />
              <path d="M 370 600 C 370 586, 355 574, 335 564" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mArrBlue)" className="anim-wind-flow" />
              <path d="M 430 595 C 430 582, 415 572, 395 563" fill="none" stroke="#93c5fd" strokeWidth="2.8" markerEnd="url(#mArrBlue)" className="anim-wind-flow" />
              <text x="360" y="582" fill="#bfdbfe" fontSize="11" fontWeight="bold" textAnchor="middle">Polare østavinder (S)</text>

              {/* Left Latitude Badges */}
              <g fontSize="10" fontWeight="bold" textAnchor="end">
                <text x="90" y="100" fill="#38bdf8">90°N: Polart Høytrykk (H)</text>
                <text x="90" y="220" fill="#38bdf8">60°N: Subpolart Lavtrykk (L)</text>
                <text x="90" y="300" fill="#fbbf24">30°N: Subtropisk Høytrykk (H)</text>
                <text x="90" y="354" fill="#ef4444">0°: Ekvator Lavtrykk (L)</text>
                <text x="90" y="405" fill="#fbbf24">30°S: Subtropisk Høytrykk (H)</text>
                <text x="90" y="560" fill="#38bdf8">60°S: Subpolart Lavtrykk (L)</text>
                <text x="90" y="615" fill="#38bdf8">90°S: Polart Høytrykk (H)</text>
              </g>

              {/* Clean Hurricane Badge (Nordlig halvkule) */}
              <g transform="translate(530, 235)">
                <circle cx="0" cy="0" r="34" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                <path d="M 24 0 A 24 24 0 0 0 0 -24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mArrYellow)" />
                <path d="M -24 0 A 24 24 0 0 0 0 24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mArrYellow)" />
                <circle cx="0" cy="0" r="10" fill="#ef4444" />
                <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="extrabold" textAnchor="middle">L</text>

                <rect x="42" y="-22" width="165" height="44" rx="8" fill="#0b1329" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
                <text x="50" y="-8" fill="#ef4444" fontSize="11" fontWeight="bold">4. Orkan (Nordlig halvkule)</text>
                <text x="50" y="12" fill="#fde68a" fontSize="10" fontWeight="bold">Rotasjon: MOT KLOKKEN ⟲</text>
              </g>

              {/* Clean Hurricane Badge (Sørlig halvkule) */}
              <g transform="translate(530, 465)">
                <circle cx="0" cy="0" r="34" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                <path d="M -24 0 A 24 24 0 0 0 0 -24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mArrYellow)" />
                <path d="M 24 0 A 24 24 0 0 0 0 24" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#mArrYellow)" />
                <circle cx="0" cy="0" r="10" fill="#ef4444" />
                <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="extrabold" textAnchor="middle">L</text>

                <rect x="42" y="-22" width="165" height="44" rx="8" fill="#0b1329" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
                <text x="50" y="-8" fill="#ef4444" fontSize="11" fontWeight="bold">5. Orkan (Sørlig halvkule)</text>
                <text x="50" y="12" fill="#fde68a" fontSize="10" fontWeight="bold">Rotasjon: MED KLOKKEN ⟳</text>
              </g>
            </svg>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                🔄 Gradvis avbøyning fra 30° og 60°
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Vindene starter rett ut fra trykksentrene og bøyer gradvis:
              </p>
              <ul className="text-xs space-y-2 mt-2">
                <li className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-amber-500 font-bold">1. Trykkgradient:</span> Luften settes i bevegelse rett fra høytrykk (H) mot lavtrykk (L).
                </li>
                <li className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-emerald-500 font-bold">2. Coriolis-avbøyning:</span> Bøyer banen jevnt til <strong>høyre</strong> i nord og <strong>venstre</strong> i sør.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <h3 className="text-sm font-bold text-red-500">
                🌀 Orkanens rotasjonsretning
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Fordi lavtrykket suger inn luft fra alle kanter:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-red-500/20">
                  <div className="font-bold text-red-500 text-xs">Nordlig halvkule</div>
                  <div className="text-xl my-1 text-yellow-500">⟲</div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Mot klokken</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-red-500/20">
                  <div className="font-bold text-red-400 text-xs">Sørlig halvkule</div>
                  <div className="text-xl my-1 text-yellow-500">⟳</div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Med klokken</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GLOBALE VINDER & CELLER (ANIMERT MED PILSTRUKTUR) */}
      {/* ========================================================================= */}
      {activeTab === "winds" && (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Atmosfærisk sirkulasjonssnitt med pilstruktur</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Strukturerte piler for stigende varmluft (L), synkende luft (H), overflatevinder og høydestrømmer.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-red-500/20 text-red-500 font-semibold">▲ Stigende luft (L)</span>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-blue-500/20 text-blue-500 font-semibold">▼ Synkende luft (H)</span>
            </div>
          </div>

          <div className="w-full flex justify-center overflow-x-auto py-2">
            <svg viewBox="0 0 880 500" className="w-full max-w-[860px] h-auto select-none">
              <defs>
                <linearGradient id="gHadleyCellGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.08"/>
                </linearGradient>
                <linearGradient id="gFerrelCellGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08"/>
                </linearGradient>
                <linearGradient id="gPolarCellGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.08"/>
                </linearGradient>
              </defs>

              <path d="M 80 180 Q 220 170 340 140 Q 560 110 780 90" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="780" y="80" fill="#94a3b8" fontSize="10" textAnchor="end">Tropopausen (16 km ved ekvator / 8 km ved polen)</text>

              <rect x="50" y="380" width="780" height="25" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="2" />

              {/* 90°N */}
              <line x1="100" y1="370" x2="100" y2="405" stroke="#94a3b8" strokeWidth="2" />
              <text x="100" y="425" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">90°N (Pol)</text>
              <rect x="55" y="435" width="90" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.2"/>
              <text x="100" y="450" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Høytrykk (H)</text>

              {/* 60°N */}
              <line x1="280" y1="370" x2="280" y2="405" stroke="#94a3b8" strokeWidth="2" />
              <text x="280" y="425" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">60°N (Polarfront)</text>
              <rect x="235" y="435" width="90" height="22" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.2"/>
              <text x="280" y="450" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Lavtrykk (L)</text>

              {/* 30°N */}
              <line x1="520" y1="370" x2="520" y2="405" stroke="#94a3b8" strokeWidth="2" />
              <text x="520" y="425" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">30°N (Subtropisk)</text>
              <rect x="475" y="435" width="90" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.2"/>
              <text x="520" y="450" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Høytrykk (H)</text>

              {/* 0° */}
              <line x1="760" y1="370" x2="760" y2="405" stroke="#ef4444" strokeWidth="3" />
              <text x="760" y="425" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">0° (Ekvator)</text>
              <rect x="715" y="435" width="90" height="22" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.2"/>
              <text x="760" y="450" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Lavtrykk (L)</text>

              {/* 1. Polar Cell */}
              <path d="M 100 370 L 100 180 Q 190 170 280 180 L 280 370 Z" fill="url(#gPolarCellGrad)" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8"/>
              <g className="anim-vert-pulse">
                <line x1="90" y1="200" x2="90" y2="340" stroke="#60a5fa" strokeWidth="4" markerEnd="url(#mArrBlue)" />
                <line x1="115" y1="190" x2="115" y2="350" stroke="#60a5fa" strokeWidth="4" markerEnd="url(#mArrBlue)" />
              </g>
              <text x="125" y="270" fill="#93c5fd" fontSize="10" fontWeight="bold">▼ Synkende kald luft</text>

              <g className="anim-vert-pulse">
                <line x1="265" y1="350" x2="265" y2="200" stroke="#ef4444" strokeWidth="4" markerEnd="url(#mArrRed)" />
              </g>
              <text x="255" y="270" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="end">▲ Stigende luft</text>

              <path d="M 260 175 L 130 175" stroke="#ffffff" strokeWidth="3" markerEnd="url(#mArrCyan)" className="anim-wind-flow" />
              <path d="M 130 365 L 260 365" stroke="#38bdf8" strokeWidth="4.5" markerEnd="url(#mArrCyan)" className="anim-wind-fast-flow" />
              <text x="190" y="355" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Polare østavinder ➔</text>
              <text x="190" y="130" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">POLAR CELLE</text>

              {/* 2. Ferrel Cell */}
              <path d="M 280 370 L 280 160 Q 400 145 520 140 L 520 370 Z" fill="url(#gFerrelCellGrad)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8"/>
              <g className="anim-vert-pulse">
                <line x1="505" y1="160" x2="505" y2="350" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mArrAmber)" />
              </g>
              <text x="495" y="250" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="end">▼ Synkende luft</text>

              <path d="M 300 155 L 490 145" stroke="#ffffff" strokeWidth="3" markerEnd="url(#mArrGreen)" className="anim-wind-flow" />
              <path d="M 495 365 L 305 365" stroke="#10b981" strokeWidth="4.5" markerEnd="url(#mArrGreen)" className="anim-wind-fast-flow" />
              <text x="400" y="355" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">Vestavinder ➔</text>
              <text x="400" y="110" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">FERREL CELLE</text>

              {/* 3. Hadley Cell */}
              <path d="M 520 370 L 520 130 Q 640 100 760 90 L 760 370 Z" fill="url(#gHadleyCellGrad)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8"/>
              <g className="anim-vert-pulse">
                <line x1="740" y1="350" x2="740" y2="120" stroke="#ef4444" strokeWidth="4.5" markerEnd="url(#mArrRed)" />
                <line x1="765" y1="350" x2="765" y2="105" stroke="#ef4444" strokeWidth="4.5" markerEnd="url(#mArrRed)" />
              </g>
              <text x="730" y="230" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="end">▲ Kraftig stigende varmluft</text>

              <g className="anim-vert-pulse">
                <line x1="535" y1="150" x2="535" y2="350" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#mArrAmber)" />
              </g>

              <path d="M 725 100 L 550 130" stroke="#ffffff" strokeWidth="3" markerEnd="url(#mArrAmber)" className="anim-wind-flow" />
              <path d="M 545 365 L 730 365" stroke="#fbbf24" strokeWidth="5" markerEnd="url(#mArrAmber)" className="anim-wind-fast-flow" />
              <text x="635" y="355" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">Nordøstpassaten ➔</text>
              <text x="635" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">HADLEY CELLE</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="font-bold text-amber-500 text-sm">Hadley-cellen (0°–30°)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">Varm luft stiger ved ekvator (<strong>ITCZ</strong>) og synker ved 30° (<strong>Subtropisk høytrykk</strong>). Returluften danner <strong>passatvindene</strong>.</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="font-bold text-emerald-500 text-sm">Ferrel-cellen (30°–60°)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">Drives mellom de to andre cellene. Overflatevinden avbøyes mot øst og danner <strong>vestavindene</strong>.</p>
            </div>
            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <h4 className="font-bold text-sky-500 text-sm">Polarcellen (60°–90°)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">Kald luft synker ved polen (<strong>Polart høytrykk</strong>) og strømmer sørover som <strong>polare østavinder</strong>.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CORIOLIS MEKANISME */}
      {/* ========================================================================= */}
      {activeTab === "coriolis" && (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Hvordan virker Coriolis-effekten?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Jordens rotasjonshastighet avhenger av breddegraden: ved ekvator roterer overflaten med <strong>1670 km/t</strong>, mens ved polene er den <strong>0 km/t</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-blue-500/30 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
                Nordlig halvkule (Avbøyning til HØYRE)
              </div>
              <svg viewBox="0 0 320 260" className="w-full max-w-[280px] h-auto my-2">
                <circle cx="160" cy="130" r="100" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <line x1="160" y1="30" x2="160" y2="230" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="130" x2="260" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <text x="160" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Nord (N)</text>
                <text x="275" y="134" fill="#94a3b8" fontSize="11" fontWeight="bold">Øst (Ø)</text>
                <text x="160" y="246" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Sør (S)</text>
                <text x="40" y="134" fill="#94a3b8" fontSize="11" fontWeight="bold">Vest (V)</text>
                <line x1="160" y1="210" x2="160" y2="60" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 160 210 C 160 160, 180 110, 225 70" fill="none" stroke="#3b82f6" strokeWidth="3.5" markerEnd="url(#mArrBlue)" />
                <text x="145" y="150" fill="#64748b" fontSize="10" textAnchor="end">Uten Coriolis</text>
                <text x="205" y="145" fill="#60a5fa" fontSize="11" fontWeight="bold">Avbøyd til HØYRE</text>
              </svg>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-3 text-center">
                På nordlig halvkule presses all bevegelig luft kontinuerlig mot <strong>høyre</strong> i fartsretningen.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-indigo-500/30 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
                Sørlig halvkule (Avbøyning til VENSTRE)
              </div>
              <svg viewBox="0 0 320 260" className="w-full max-w-[280px] h-auto my-2">
                <circle cx="160" cy="130" r="100" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <line x1="160" y1="30" x2="160" y2="230" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="130" x2="260" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <text x="160" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Nord (N)</text>
                <text x="275" y="134" fill="#94a3b8" fontSize="11" fontWeight="bold">Øst (Ø)</text>
                <text x="160" y="246" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Sør (S)</text>
                <text x="40" y="134" fill="#94a3b8" fontSize="11" fontWeight="bold">Vest (V)</text>
                <line x1="160" y1="50" x2="160" y2="200" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 160 50 C 160 100, 140 150, 95 190" fill="none" stroke="#818cf8" strokeWidth="3.5" markerEnd="url(#mArrBlue)" />
                <text x="175" y="120" fill="#64748b" fontSize="10">Uten Coriolis</text>
                <text x="80" y="120" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="end">Avbøyd til VENSTRE</text>
              </svg>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-3 text-center">
                På sørlig halvkule presses all bevegelig luft kontinuerlig mot <strong>venstre</strong> i fartsretningen.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ORKANER NORD VS SØR (ROTERENDE) */}
      {/* ========================================================================= */}
      {activeTab === "hurricanes" && (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Orkaners rotasjon: Nordlig vs. Sørlig Halvkule</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Faktisk roterende modeller som viser hvordan Coriolis-avbøyning på innstrømmende luft driver rotasjonen.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold">
              Lavtrykkssenter: Luft suges INN
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* North Hurricane (CCW) */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-red-500/30 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-3">
                <span className="font-bold text-sm text-red-500">4. Orkan på Nordlig Halvkule</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-400">Mot klokken (CCW) ⟲</span>
              </div>

              <svg viewBox="0 0 360 360" className="w-full max-w-[320px] h-auto my-2 select-none">
                <circle cx="180" cy="180" r="160" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="180" cy="180" r="140" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
                <circle cx="180" cy="180" r="100" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
                <circle cx="180" cy="180" r="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>

                <text x="180" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle">1008 hPa (Høytrykk rundt)</text>
                <text x="180" y="72" fill="#94a3b8" fontSize="9" textAnchor="middle">980 hPa</text>
                <text x="180" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">940 hPa</text>

                {/* Static Inflow Vectors */}
                <path d="M 180 40 Q 170 110 110 145" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />
                <path d="M 320 180 Q 250 170 215 110" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />
                <path d="M 180 320 Q 190 250 250 215" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />
                <path d="M 40 180 Q 110 190 145 250" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />

                {/* Rotating Spiral Arms */}
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="-360 180 180" dur="8s" repeatCount="indefinite" />
                  <path d="M 180 180 C 220 120, 280 110, 310 140 C 270 140, 230 160, 180 180" fill="#ef4444" opacity="0.8" />
                  <path d="M 180 180 C 140 220, 110 280, 140 310 C 140 270, 160 230, 180 180" fill="#ef4444" opacity="0.8" />
                  <path d="M 180 180 C 120 140, 80 150, 50 120 C 90 120, 130 140, 180 180" fill="#f97316" opacity="0.8" />
                  <path d="M 180 180 C 220 240, 250 220, 280 250 C 240 250, 200 230, 180 180" fill="#f97316" opacity="0.8" />
                  <path d="M 300 180 A 120 120 0 0 0 180 60" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mArrYellow)" />
                  <path d="M 60 180 A 120 120 0 0 0 180 300" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mArrYellow)" />
                </g>

                <circle cx="180" cy="180" r="18" fill="#020617" stroke="#ef4444" strokeWidth="2.5" />
                <text x="180" y="185" fill="#f8fafc" fontSize="14" fontWeight="extrabold" textAnchor="middle">L</text>
                <text x="180" y="210" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Øyet (900 hPa)</text>
              </svg>

              <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1 w-full text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-800 dark:text-slate-100">Rotasjonens fysikk (Nord):</div>
                <div>1. Luft trekkes rett inn mot lavtrykket (\(L\)).</div>
                <div>2. Coriolis-kraften bøyer innstrømningen mot <strong>HØYRE</strong>.</div>
                <div>3. Setter hele systemet i rotasjon <strong>MOT KLOKKEN ⟲</strong>.</div>
              </div>
            </div>

            {/* South Hurricane (CW) */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-red-500/30 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-3">
                <span className="font-bold text-sm text-red-500">5. Orkan på Sørlig Halvkule</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-400">Med klokken (CW) ⟳</span>
              </div>

              <svg viewBox="0 0 360 360" className="w-full max-w-[320px] h-auto my-2 select-none">
                <circle cx="180" cy="180" r="160" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="180" cy="180" r="140" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
                <circle cx="180" cy="180" r="100" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
                <circle cx="180" cy="180" r="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>

                <text x="180" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle">1008 hPa (Høytrykk rundt)</text>
                <text x="180" y="72" fill="#94a3b8" fontSize="9" textAnchor="middle">980 hPa</text>
                <text x="180" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">940 hPa</text>

                {/* Static Inflow Vectors */}
                <path d="M 180 40 Q 190 110 250 145" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />
                <path d="M 320 180 Q 250 190 215 250" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />
                <path d="M 180 320 Q 170 250 110 215" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />
                <path d="M 40 180 Q 110 170 145 110" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mArrYellow)" />

                {/* Rotating Spiral Arms */}
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="360 180 180" dur="8s" repeatCount="indefinite" />
                  <path d="M 180 180 C 140 120, 80 110, 50 140 C 90 140, 130 160, 180 180" fill="#ef4444" opacity="0.8" />
                  <path d="M 180 180 C 220 220, 250 280, 220 310 C 220 270, 200 230, 180 180" fill="#ef4444" opacity="0.8" />
                  <path d="M 180 180 C 240 140, 280 150, 310 120 C 270 120, 230 140, 180 180" fill="#f97316" opacity="0.8" />
                  <path d="M 180 180 C 140 240, 110 220, 80 250 C 120 250, 160 230, 180 180" fill="#f97316" opacity="0.8" />
                  <path d="M 60 180 A 120 120 0 0 0 180 60" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mArrYellow)" />
                  <path d="M 300 180 A 120 120 0 0 0 180 300" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mArrYellow)" />
                </g>

                <circle cx="180" cy="180" r="18" fill="#020617" stroke="#ef4444" strokeWidth="2.5" />
                <text x="180" y="185" fill="#f8fafc" fontSize="14" fontWeight="extrabold" textAnchor="middle">L</text>
                <text x="180" y="210" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Øyet (900 hPa)</text>
              </svg>

              <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1 w-full text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-800 dark:text-slate-100">Rotasjonens fysikk (Sør):</div>
                <div>1. Luft trekkes rett inn mot lavtrykket (\(L\)).</div>
                <div>2. Coriolis-kraften bøyer innstrømningen mot <strong>VENSTRE</strong>.</div>
                <div>3. Setter hele systemet i rotasjon <strong>MED KLOKKEN ⟳</strong>.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

