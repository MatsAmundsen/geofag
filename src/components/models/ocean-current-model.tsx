import { useState } from "react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

export function OceanCurrentModel() {
  const [meltPercent, setMeltPercent] = useState(0);

  const isFreezing = meltPercent < 30;
  const isMelting = meltPercent > 70;
  const iceScale = Math.max(0, 1 - meltPercent / 100);
  const particleDur = isMelting ? "999s" : !isFreezing ? "20s" : "10s";
  const meltLensOpacity = !isFreezing ? (meltPercent - 30) / 70 : 0;

  const status = isMelting
    ? "Dypvannsdannelsen stopper"
    : isFreezing
      ? "Aktiv dypvannsdannelse"
      : "Sirkulasjonen svekket";

  return (
    <ModelFrame
      kicker="Interaktiv modell"
      title="Dyphavsdannelse og termoklinen"
      lead="Kald polarvind og havis driver det tunge vannet ned. Smeltevann kan legge et lett lokk over, så omveltningen bremser."
    >
      <ModelMarkers />

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <ModelPanel>
            <label className="flex justify-between gap-3 text-sm font-medium">
              <span>Klima ved polene</span>
              <span className={isFreezing ? "text-primary" : isMelting ? "text-lava" : "text-muted-foreground"}>
                {isFreezing ? "Frysing" : isMelting ? "Smelting" : "Mildt"}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={meltPercent}
              onChange={(e) => setMeltPercent(Number(e.target.value))}
              className="mt-3 w-full accent-primary"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={meltPercent}
              aria-label="Klima ved polene, fra frysing til smelting"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Kald polarvind</span>
              <span>Mildt / smelting</span>
            </div>
          </ModelPanel>

          <ModelNote title={status} tone={isFreezing ? "teal" : "warm"}>
            <p>
              {isMelting
                ? "Ferskvannet fra smeltingen er lett. Det legger seg som et lokk, og vannet under klarer ikke å bryte gjennom termoklinen. Dypvannsdannelsen stopper. Det er en svekkelse over tid — ikke en bryter som slår av Golfstrømmen på en dag."
                : isFreezing
                  ? "Kald polarvind fryser havvannet. Saltet blir igjen i vannet (brine rejection). Vannet blir tyngre og synker gjennom termoklinen."
                  : "Polarvinden har avtatt. Isdannelsen stopper opp, og saltet skilles ikke ut. Strømmen bremses."}
            </p>
          </ModelNote>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-xl border border-border bg-[#0a192f] sm:h-[500px] lg:col-span-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/4 bg-gradient-to-b from-sky-900/50 to-transparent" />

          <div className="absolute left-6 top-4 z-10 flex flex-col items-center">
            <p className="rounded bg-background/70 px-2 text-xs font-medium uppercase tracking-wider text-lava">
              Tropene
            </p>
          </div>
          <div className="absolute right-6 top-4 z-10 flex flex-col items-center">
            <p className="rounded bg-background/70 px-2 text-xs font-medium uppercase tracking-wider text-primary">
              Arktis
            </p>
          </div>

          <svg viewBox="0 0 800 500" className="absolute inset-0 z-10 h-full w-full">
            <g opacity="0.7">
              <path
                d="M 100,105 L 500,105"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
                strokeDasharray="15 15"
                className="model-ocean-wind"
                markerEnd="url(#mdl-wind)"
              />
              <path
                d="M 150,115 L 450,115"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="25 15"
                className="model-ocean-wind"
                style={{ animationDelay: "-0.5s" }}
              />
              <text x="250" y="95" fill="#94a3b8" fontSize="14" fontStyle="italic">
                Vind skyver vannet
              </text>
            </g>

            <g style={{ opacity: isFreezing ? 1 : isMelting ? 0 : 0.2, transition: "opacity 0.5s" }}>
              <path
                d="M 750,40 Q 700,70 650,110"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="4"
                strokeDasharray="20 15"
                className="model-ocean-polar"
                markerEnd="url(#mdl-polar)"
              />
              <path
                d="M 680,30 Q 620,60 580,105"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="3"
                strokeDasharray="20 15"
                className="model-ocean-polar"
                style={{ animationDelay: "-0.2s" }}
                markerEnd="url(#mdl-polar)"
              />
              <text x="630" y="70" fill="#38bdf8" fontSize="14" fontStyle="italic">
                Iskald polarvind
              </text>
            </g>

            <rect x="0" y="125" width="800" height="150" fill="#0ea5e9" opacity="0.3" />
            <rect x="0" y="275" width="800" height="225" fill="#1e3a8a" opacity="0.8" />
            <path d="M 0,275 Q 100,285 200,275 T 400,275 T 600,275 T 800,275" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="10 5" />
            <text x="20" y="295" fill="#7dd3fc" fontSize="14" fontStyle="italic">
              Termoklinen (sperre for lett vann)
            </text>

            <g style={{ transform: `translate(650px, 105px) scale(${iceScale})` }}>
              <path d="M 0,20 L 20,0 L 120,5 L 140,25 L 0,20 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 0,20 L 140,25 L 130,45 L 10,40 Z" fill="#94a3b8" />
              <text x="30" y="-10" fill="#e8eef2" fontSize="14" fontWeight="700">
                Havis
              </text>
            </g>

            <g transform="translate(680, 150)" style={{ display: isFreezing ? "block" : "none" }}>
              <circle cx="10" cy="0" r="3" fill="#ffffff" className="model-salt" style={{ animationDelay: "0s" }} />
              <circle cx="30" cy="0" r="3" fill="#ffffff" className="model-salt" style={{ animationDelay: "0.5s" }} />
              <circle cx="50" cy="0" r="3" fill="#ffffff" className="model-salt" style={{ animationDelay: "1.0s" }} />
              <circle cx="70" cy="0" r="3" fill="#ffffff" className="model-salt" style={{ animationDelay: "1.5s" }} />
              <text x="-60" y="40" fill="#ffffff" fontSize="12" fontStyle="italic" opacity="0.9">
                Salt presses ut
              </text>
            </g>

            <path
              d="M 500,125 Q 650,170 800,125 Z"
              fill="#67e8f9"
              style={{ opacity: meltLensOpacity, transition: "opacity 0.5s" }}
            />
            <text
              x="550"
              y="145"
              fill="#083344"
              fontSize="14"
              fontWeight="700"
              style={{ opacity: meltLensOpacity, transition: "opacity 0.5s" }}
            >
              Ferskvannslokk
            </text>

            <path
              id="current-track"
              d="M -50,180 L 600,180 Q 720,180 720,275 Q 720,400 600,400 L -50,400"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              opacity="0.3"
              strokeLinecap="round"
            />

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
    </ModelFrame>
  );
}
