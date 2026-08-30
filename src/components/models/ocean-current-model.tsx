"use client";

import { useState } from "react";

export function OceanCurrentModel() {
  const [meltPercent, setMeltPercent] = useState(0);

  const isFreezing = meltPercent < 30;
  const isMelting = meltPercent > 70;
  
  const iceScale = Math.max(0, 1 - (meltPercent / 100));
  const particleDur = isMelting ? '999s' : (!isFreezing ? '20s' : '10s');
  const meltLensOpacity = !isFreezing ? (meltPercent - 30) / 70 : 0;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 shadow-lg mt-12 dark:bg-slate-900 dark:border-slate-800 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sink-salt {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(80px); opacity: 0; }
        }
        .salt-crystal { animation: sink-salt 2s linear infinite; }

        @keyframes wind-flow { to { stroke-dashoffset: -40; } }
        .wind-drag { animation: wind-flow 1s linear infinite; }
        .polar-wind { animation: wind-flow 0.6s linear infinite; }
      `}} />

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Dyphavsdannelsen og Termoklinen</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Hvordan vind og frysing av sjøis utgjør motoren i havets store transportbånd.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="space-y-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20 p-5 border border-sky-100 dark:border-sky-800">
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>❄️ Klima ved Polene</span>
                <span className={isFreezing ? "text-blue-600 dark:text-blue-400 font-bold" : isMelting ? "text-cyan-400 font-bold" : "text-slate-500 font-bold"}>
                  {isFreezing ? 'Frysing (Isdannelse)' : isMelting ? 'Klimaendring (Smelting)' : 'Mildt'}
                </span>
              </label>
              <input 
                type="range" 
                min="0" max="100" 
                value={meltPercent} 
                onChange={(e) => setMeltPercent(parseInt(e.target.value))}
                className="w-full accent-blue-600" 
              />
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span>Kald polarvind (Frys)</span>
                <span>Mildt (Smelting)</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <span className="text-xl">{isMelting ? '⚠️' : (isFreezing ? '⚙️' : '⚠️')}</span> 
              {isMelting ? 'Sirkulasjon kollapset' : (isFreezing ? 'Aktiv prosess' : 'Sirkulasjon svekket')}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {isMelting 
                ? "Ferskvannet fra smeltingen er lett. Det danner et lokk som gjør at vannet under ikke klarer å bryte gjennom termoklinen. Dypvannsdannelsen stopper."
                : (isFreezing 
                  ? "Kald polarvind fryser havvannet. Sjøvann etterlater saltet i vannet (brine rejection). Vannet blir ekstremt salt og tungt, og synker tvers gjennom termoklinen."
                  : "Polarvinden har avtatt. Isdannelsen stopper opp, og saltet skilles ikke ut. Strømmen bremses kraftig ned.")
              }
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0a192f] rounded-2xl border-4 border-slate-700 h-[500px] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-sky-200 to-sky-50 dark:from-sky-900/50 dark:to-transparent z-0"></div>
          
          <div className="absolute left-6 top-4 z-10 flex flex-col items-center">
            <div className="text-yellow-500 text-4xl">☀️</div>
            <div className="text-xs font-bold text-slate-600 uppercase mt-1 bg-white/50 px-2 rounded">Tropene</div>
          </div>
          <div className="absolute right-6 top-4 z-10 flex flex-col items-center">
            <div className="text-blue-300 text-4xl">{isFreezing ? '🌨️🌪️' : (isMelting ? '☀️' : '🌤️')}</div>
            <div className="text-xs font-bold text-slate-600 uppercase mt-1 bg-white/50 px-2 rounded">Arktis</div>
          </div>

          <svg viewBox="0 0 800 500" className="w-full h-full absolute inset-0 z-10">
            <defs>
              <marker id="wind-arrow-head" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
              </marker>
              <marker id="polar-arrow-head" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#7dd3fc" />
              </marker>
            </defs>

            <g opacity="0.7">
              <path d="M 100,105 L 500,105" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="15 15" className="wind-drag" markerEnd="url(#wind-arrow-head)" />
              <path d="M 150,115 L 450,115" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="25 15" className="wind-drag" style={{animationDelay: '-0.5s'}} />
              <text x="250" y="95" fill="#64748b" fontSize="14" fontWeight="bold" fontStyle="italic">Vind-drag skyver vannet</text>
            </g>
            
            <g style={{ opacity: isFreezing ? 1 : (isMelting ? 0 : 0.2), transition: 'opacity 0.5s' }}>
              <path d="M 750,40 Q 700,70 650,110" fill="none" stroke="#7dd3fc" strokeWidth="4" strokeDasharray="20 15" className="polar-wind" markerEnd="url(#polar-arrow-head)" />
              <path d="M 680,30 Q 620,60 580,105" fill="none" stroke="#7dd3fc" strokeWidth="3" strokeDasharray="20 15" className="polar-wind" style={{animationDelay: '-0.2s'}} markerEnd="url(#polar-arrow-head)" />
              <text x="630" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" fontStyle="italic">Iskald polarvind</text>
            </g>

            <rect x="0" y="125" width="800" height="150" fill="#0ea5e9" opacity="0.3" /> 
            <rect x="0" y="275" width="800" height="225" fill="#1e3a8a" opacity="0.8" /> 
            <path d="M 0,275 Q 100,285 200,275 T 400,275 T 600,275 T 800,275" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="10 5" />
            <text x="20" y="295" fill="#7dd3fc" fontSize="14" fontWeight="bold" fontStyle="italic">Termoklinen (Sperre for lett vann)</text>
            
            <g style={{ transform: `translate(650px, 105px) scale(${iceScale})` }}>
              <path d="M 0,20 L 20,0 L 120,5 L 140,25 L 0,20 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 0,20 L 140,25 L 130,45 L 10,40 Z" fill="#94a3b8" />
              <text x="30" y="-10" fill="#334155" fontSize="14" fontWeight="bold">Havis</text>
            </g>
            
            <g transform="translate(680, 150)" style={{ display: isFreezing ? 'block' : 'none' }}>
              <circle cx="10" cy="0" r="3" fill="#ffffff" className="salt-crystal" style={{animationDelay: '0s'}} />
              <circle cx="30" cy="0" r="3" fill="#ffffff" className="salt-crystal" style={{animationDelay: '0.5s'}} />
              <circle cx="50" cy="0" r="3" fill="#ffffff" className="salt-crystal" style={{animationDelay: '1.0s'}} />
              <circle cx="70" cy="0" r="3" fill="#ffffff" className="salt-crystal" style={{animationDelay: '1.5s'}} />
              <text x="-60" y="40" fill="#ffffff" fontSize="12" fontStyle="italic" opacity="0.9">Salt presses ut</text>
            </g>

            <path d="M 500,125 Q 650,170 800,125 Z" fill="#67e8f9" style={{ opacity: meltLensOpacity, transition: 'opacity 0.5s' }} />
            <text x="550" y="145" fill="#083344" fontSize="14" fontWeight="bold" style={{ opacity: meltLensOpacity, transition: 'opacity 0.5s' }}>Ferskvannslokk</text>

            <path id="current-track" d="M -50,180 L 600,180 Q 720,180 720,275 Q 720,400 600,400 L -50,400" fill="none" stroke="#ef4444" strokeWidth="12" opacity="0.3" strokeLinecap="round" />
            
            <g>
              {Array.from({ length: 15 }).map((_, i) => (
                <circle key={i} r="8" fill="#ffffff">
                  <animateMotion dur={particleDur} repeatCount="indefinite" begin={`-${i * 0.8}s`}>
                    <mpath href="#current-track" />
                  </animateMotion>
                </circle>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
