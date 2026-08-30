"use client";

import { useState } from "react";

export function WindSystemModel() {
  const [coriolisOn, setCoriolisOn] = useState(false);

  const pathsOff: Record<string, string> = {
    'path-pn-1': 'M 170 25 L 170 42', 'path-pn-2': 'M 250 25 L 250 42', 'path-pn-3': 'M 330 25 L 330 42',
    'path-wn-1': 'M 170 125 L 170 62', 'path-wn-2': 'M 250 125 L 250 62', 'path-wn-3': 'M 330 125 L 330 62',
    'path-tn-1': 'M 170 145 L 170 240', 'path-tn-2': 'M 250 145 L 250 240', 'path-tn-3': 'M 330 145 L 330 240',
    'path-ts-1': 'M 170 355 L 170 260', 'path-ts-2': 'M 250 355 L 250 260', 'path-ts-3': 'M 330 355 L 330 260',
    'path-ws-1': 'M 170 375 L 170 438', 'path-ws-2': 'M 250 375 L 250 438', 'path-ws-3': 'M 330 375 L 330 438',
    'path-ps-1': 'M 170 475 L 170 458', 'path-ps-2': 'M 250 475 L 250 458', 'path-ps-3': 'M 330 475 L 330 458'
  };

  const pathsOn: Record<string, string> = {
    'path-pn-1': 'M 170 25 C 170 35, 140 40, 110 42', 'path-pn-2': 'M 250 25 C 250 35, 220 40, 190 42', 'path-pn-3': 'M 330 25 C 330 35, 300 40, 270 42',
    'path-wn-1': 'M 170 125 C 170 90, 230 70, 270 62', 'path-wn-2': 'M 250 125 C 250 90, 310 70, 350 62', 'path-wn-3': 'M 330 125 C 330 90, 390 70, 430 62',
    'path-tn-1': 'M 170 145 C 170 190, 110 220, 60 240', 'path-tn-2': 'M 250 145 C 250 190, 190 220, 140 240', 'path-tn-3': 'M 330 145 C 330 190, 270 220, 220 240',
    'path-ts-1': 'M 170 355 C 170 310, 110 280, 60 260', 'path-ts-2': 'M 250 355 C 250 310, 190 280, 140 260', 'path-ts-3': 'M 330 355 C 330 310, 270 280, 220 260',
    'path-ws-1': 'M 170 375 C 170 410, 230 420, 270 438', 'path-ws-2': 'M 250 375 C 250 410, 310 420, 350 438', 'path-ws-3': 'M 330 375 C 330 410, 390 420, 430 438',
    'path-ps-1': 'M 170 475 C 170 465, 140 460, 110 458', 'path-ps-2': 'M 250 475 C 250 465, 220 460, 190 458', 'path-ps-3': 'M 330 475 C 330 465, 300 460, 270 458'
  };

  const windConfig = [
    { id: 'path-pn-1', type: 'polar' }, { id: 'path-pn-2', type: 'polar' }, { id: 'path-pn-3', type: 'polar' },
    { id: 'path-wn-1', type: 'wester'}, { id: 'path-wn-2', type: 'wester'}, { id: 'path-wn-3', type: 'wester'},
    { id: 'path-tn-1', type: 'trade' }, { id: 'path-tn-2', type: 'trade' }, { id: 'path-tn-3', type: 'trade' },
    { id: 'path-ts-1', type: 'trade' }, { id: 'path-ts-2', type: 'trade' }, { id: 'path-ts-3', type: 'trade' },
    { id: 'path-ws-1', type: 'wester'}, { id: 'path-ws-2', type: 'wester'}, { id: 'path-ws-3', type: 'wester'},
    { id: 'path-ps-1', type: 'polar' }, { id: 'path-ps-2', type: 'polar' }, { id: 'path-ps-3', type: 'polar' }
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 shadow-lg dark:bg-slate-900 dark:border-slate-800">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}} />
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">1. Globale Vinder (Alle belter)</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
            Når vinden forlater høytrykket, blåser den først <strong>rett frem</strong>, før jordrotasjonen gradvis bøyer den av. Her ser du alle de tre store vindsystemene.
          </p>
        </div>
        <button 
          onClick={() => setCoriolisOn(!coriolisOn)}
          className={coriolisOn 
            ? "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold shadow-md transition-all w-48 text-center flex-shrink-0" 
            : "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-md transition-all w-48 text-center flex-shrink-0"}
        >
          {coriolisOn ? 'Coriolis: PÅ' : 'Coriolis: AV'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
        
        <div className="relative w-full aspect-square max-w-[450px] mx-auto">
          <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
            
            <defs>
              <radialGradient id="globe-grad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              
              <g id="dart-trade">
                <polygon points="-8,-6 10,0 -8,6 -3,0" fill="#fde047" stroke="#713f12" strokeWidth="1.5" />
              </g>
              <g id="dart-wester">
                <polygon points="-8,-6 10,0 -8,6 -3,0" fill="#f43f5e" stroke="#881337" strokeWidth="1.5" />
              </g>
              <g id="dart-polar">
                <polygon points="-8,-6 10,0 -8,6 -3,0" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="1.5" />
              </g>

              {Object.keys(pathsOff).map(id => (
                <path key={id} id={id} d={coriolisOn ? pathsOn[id] : pathsOff[id]} fill="none" style={{ transition: 'd 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              ))}
            </defs>

            <circle cx="250" cy="250" r="230" fill="url(#globe-grad)" stroke="#1d4ed8" strokeWidth="2" />
            
            <path d="M 20 250 Q 250 280 480 250" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
            <text x="390" y="275" fill="#fca5a5" fontWeight="bold" fontSize="14">0° (Lavtrykk)</text>
            
            <path d="M 52 135 Q 250 160 448 135" fill="none" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
            <text x="390" y="130" fill="#fde68a" fontWeight="bold" fontSize="14">30°N (Høytrykk)</text>
            
            <path d="M 135 52 Q 250 70 365 52" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
            <text x="320" y="45" fill="#bfdbfe" fontWeight="bold" fontSize="14">60°N</text>
            
            <path d="M 52 365 Q 250 390 448 365" fill="none" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
            <text x="390" y="390" fill="#fde68a" fontWeight="bold" fontSize="14">30°S (Høytrykk)</text>
            
            <path d="M 135 448 Q 250 430 365 448" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
            <text x="320" y="465" fill="#bfdbfe" fontWeight="bold" fontSize="14">60°S</text>

            <g className="animate-float" opacity="0.95">
              <path d="M 150 260 Q 160 240 180 255 Q 200 235 220 260 Z" fill="#ffffff" />
              <path d="M 230 265 Q 240 245 260 260 Q 280 240 300 265 Z" fill="#ffffff" />
              <path d="M 310 260 Q 320 240 340 255 Q 360 235 380 260 Z" fill="#ffffff" />
              <path d="M 180 65 Q 190 50 210 60 Q 220 45 240 65 Z" fill="#f1f5f9" opacity="0.9" />
              <path d="M 260 68 Q 270 53 290 63 Q 300 48 320 68 Z" fill="#f1f5f9" opacity="0.9" />
              <path d="M 180 435 Q 190 450 210 440 Q 220 455 240 435 Z" fill="#f1f5f9" opacity="0.9" />
              <path d="M 260 432 Q 270 447 290 437 Q 300 452 320 432 Z" fill="#f1f5f9" opacity="0.9" />
            </g>

            <g>
              {windConfig.map(conf => (
                <g key={conf.id}>
                  {[0, 1, 2].map(i => (
                    <use key={i} href={conf.type === 'trade' ? '#dart-trade' : (conf.type === 'wester' ? '#dart-wester' : '#dart-polar')}>
                      <animateMotion dur="4s" repeatCount="indefinite" begin={`-${i * 1.33}s`} rotate="auto">
                        <mpath href={`#${conf.id}`} />
                      </animateMotion>
                    </use>
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24"><polygon points="4,6 20,12 4,18 8,12" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="1.5"/></svg>
              Polare østavinder
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Fra polene (90°) blåser lufta mot polarfronten (60°). Avbøyningen gjør at den kommer fra øst. Iskald vind.</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-rose-500 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24"><polygon points="4,6 20,12 4,18 8,12" fill="#f43f5e" stroke="#881337" strokeWidth="1.5"/></svg>
              Vestavindsbeltet
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Fra 30° mot polarfronten. Legg merke til hvordan vinden <strong>starter rett</strong>, men skrus gradvis til høyre og blir vestlig.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-yellow-500 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24"><polygon points="4,6 20,12 4,18 8,12" fill="#fde047" stroke="#713f12" strokeWidth="1.5"/></svg>
              Passatvindene
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Fra 30° inn mot ekvator. I nord bøyes den til høyre (nordøstlig), i sør bøyes den til venstre (sørøstlig).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
