import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";
import {
  AMPHIBOLE_KM,
  CRUSTAL_ROOT_KM,
  DEPTH_MAX_KM,
  FLUX_MELT_KM,
  HOTSPOT_STATIONS,
  JARAMILLO,
  MAG_CHRONS,
  PX_PER_KM,
  SEA_Y,
  SERPENTINE_KM,
  ageMaAtDistance,
  distanceKm,
  halfRateCmYr,
  layerAvailability,
  lithosphereThicknessKm,
  polarityAtAge,
  rateCaption,
  ridgeAxisLabel,
  ridgeBathymetryKm,
  showsDepthScale,
  yDepth,
  type BoundaryType,
} from "./plate-tectonics-geometry";

type SceneProps = {
  rate: number;
  showQuakes: boolean;
  showMelting: boolean;
  showForces: boolean;
  animating: boolean;
  polarity: "normal" | "reversed";
};

type Pt = { x: number; y: number };

function pts(points: Pt[]): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

function slabPoint(trenchX: number, depthKm: number, dipDeg: number, pxPerKmX: number): Pt {
  const dip = (dipDeg * Math.PI) / 180;
  const runKm = depthKm / Math.tan(dip);
  return { x: trenchX + runKm * pxPerKmX, y: yDepth(depthKm) };
}

function dippingSlab(
  trenchX: number,
  dipDeg: number,
  maxDepthKm: number,
  thicknessKm: number,
  pxPerKmX: number,
): Pt[] {
  const dip = (dipDeg * Math.PI) / 180;
  const nx = -Math.sin(dip);
  const ny = Math.cos(dip);
  const top: Pt[] = [];
  const bottom: Pt[] = [];
  for (let d = 0; d <= maxDepthKm; d += 8) {
    const p = slabPoint(trenchX, d, dipDeg, pxPerKmX);
    top.push(p);
    bottom.push({
      x: p.x + nx * thicknessKm * PX_PER_KM,
      y: p.y + ny * thicknessKm * PX_PER_KM,
    });
  }
  return [...top, ...bottom.reverse()];
}

function DepthScale() {
  const ticks = [0, 50, 100, 150, 200];
  return (
    <g fill="#7ba3be" fontSize="10" fontFamily="ui-monospace, monospace">
      <line x1="46" y1={yDepth(0)} x2="46" y2={yDepth(DEPTH_MAX_KM)} stroke="#334e68" strokeWidth="1" />
      {ticks.map((km) => (
        <g key={km}>
          <line x1="42" x2="50" y1={yDepth(km)} y2={yDepth(km)} stroke="#334e68" />
          <text x="38" y={yDepth(km) + 3} textAnchor="end">
            {km} km
          </text>
        </g>
      ))}
      <text x="18" y="300" textAnchor="middle" transform="rotate(-90 18 300)" fill="#6488a0">
        Dyp under skorpetoppen
      </text>
    </g>
  );
}

function Foci({ points, animating }: { points: Pt[]; animating: boolean }) {
  return (
    <g>
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="9" fill="#ef4444" opacity="0.35" className={animating ? "quake-ring" : ""} />
          <circle cx={p.x} cy={p.y} r="4.2" fill="#ef4444" stroke="#fff" strokeWidth="1" />
        </g>
      ))}
    </g>
  );
}

function RidgeScene({ rate, showMelting, showQuakes, showForces, animating }: SceneProps) {
  const axis = 460;
  const px = 1.2;
  const dists = Array.from({ length: 51 }, (_, i) => -300 + i * 12);
  const xAt = (d: number) => axis + d * px;
  const bathy = dists.map((d) => {
    const depth = ridgeBathymetryKm(d, rate);
    const y = Math.min(SEA_Y - 2, Math.max(34, SEA_Y - 36 + (depth - 2.5) * 18));
    return { x: xAt(d), y };
  });
  const lith = dists.map((d) => ({
    x: xAt(d),
    y: yDepth(lithosphereThicknessKm(ageMaAtDistance(d, rate))),
  }));
  const half = halfRateCmYr(rate);
  const axisLabel = ridgeAxisLabel(rate);
  const crustBottom = yDepth(7);
  const left = xAt(-300);
  const right = xAt(300);

  return (
    <g>
      <polygon points={`${pts(bathy)} ${right},32 ${left},32`} fill="#0f2b3e" />
      <polyline points={pts(bathy)} fill="none" stroke="#38bdf8" strokeWidth="2" />
      <text x="80" y="48" fill="#7dd3fc" fontSize="11">
        Havdyp overdrevet. 0 km er toppen av skorpen.
      </text>
      <polygon
        points={`${left},${SEA_Y} ${right},${SEA_Y} ${right},${crustBottom} ${left},${crustBottom}`}
        fill="#2d3d34"
      />
      <polygon points={`${pts(lith)} ${right},${crustBottom} ${left},${crustBottom}`} fill="#1b2e38" />
      <text x={axis} y="28" fill="#f59e0b" fontSize="13" fontWeight="700" textAnchor="middle">
        {axisLabel}
      </text>
      <text x="150" y={SEA_Y + 22} fill="#94a3b8" fontSize="11">
        ← {half.toFixed(1)} cm/år
      </text>
      <text x="680" y={SEA_Y + 22} fill="#94a3b8" fontSize="11">
        {half.toFixed(1)} cm/år →
      </text>
      <text x="150" y={yDepth(55)} fill="#94a3b8" fontSize="11">
        {rate <= 4 ? "Tykk, kald flankelitosfære" : "Tynnere litosfære ved samme avstand"}
      </text>
      {showMelting ? (
        <g>
          <ellipse cx={axis} cy={yDepth(30)} rx="34" ry="16" fill="#ef4444" opacity="0.85" className={animating ? "magma-pulse" : ""} />
          <text x={axis} y={yDepth(30) + 4} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
            Dekompresjon
          </text>
          <text x={axis} y={yDepth(48)} fill="#fed7aa" fontSize="10" textAnchor="middle">
            Solidus krysses når trykket faller
          </text>
        </g>
      ) : null}
      {showQuakes ? (
        <g>
          <Foci
            animating={animating}
            points={[
              { x: axis - 18, y: yDepth(6) },
              { x: axis, y: yDepth(8) },
              { x: axis + 16, y: yDepth(5) },
              { x: axis - 8, y: yDepth(12) },
              { x: axis + 10, y: yDepth(11) },
            ]}
          />
          <text x={axis} y={yDepth(20)} fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
            Bare grunne skjelv, under 15 km
          </text>
        </g>
      ) : null}
      {showForces ? (
        <g>
          <path
            d={`M ${axis} ${yDepth(170)} C ${axis - 20} ${yDepth(80)}, ${axis - 40} ${yDepth(40)}, ${axis - 130} ${yDepth(48)}`}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="6 6"
            className={animating ? "mantle-anim-left" : ""}
          />
          <path
            d={`M ${axis} ${yDepth(170)} C ${axis + 20} ${yDepth(80)}, ${axis + 40} ${yDepth(40)}, ${axis + 130} ${yDepth(48)}`}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="6 6"
            className={animating ? "mantle-anim-right" : ""}
          />
          <text x={axis} y={yDepth(150)} fill="#fdba74" fontSize="11" fontWeight="700" textAnchor="middle">
            Passiv oppstrømning. Mantelen fyller etter.
          </text>
          <line x1={axis - 70} y1={SEA_Y - 18} x2={axis - 150} y2={SEA_Y - 6} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
          <line x1={axis + 70} y1={SEA_Y - 18} x2={axis + 150} y2={SEA_Y - 6} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
          <text x={axis - 120} y={SEA_Y - 28} fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">
            Ridge push
          </text>
          <text x={axis + 120} y={SEA_Y - 28} fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">
            Ridge push
          </text>
        </g>
      ) : null}
    </g>
  );
}

function SubductionScene({
  rate,
  showMelting,
  showQuakes,
  showForces,
  animating,
  trenchX,
  arcX,
  dip,
  pxX,
  oceanLabel,
  slabLabel,
  arcLabel,
  backarc,
}: SceneProps & {
  trenchX: number;
  arcX: number;
  dip: number;
  pxX: number;
  oceanLabel: string;
  slabLabel: string;
  arcLabel: string;
  backarc: boolean;
}) {
  const amph = slabPoint(trenchX, AMPHIBOLE_KM, dip, pxX);
  const serp = slabPoint(trenchX, SERPENTINE_KM, dip, pxX);
  const melt = slabPoint(trenchX, FLUX_MELT_KM, dip, pxX);
  const pull = slabPoint(trenchX, 185, dip, pxX);
  const quakes = [20, 45, 70, 95, 120, 145].map((d) => slabPoint(trenchX, d, dip, pxX));
  const slab = dippingSlab(trenchX, dip, 200, 70, pxX);
  const wedgeX = trenchX + 18;

  return (
    <g>
      <polygon points={`50,72 ${trenchX - 16},72 ${trenchX}, ${SEA_Y + 16} ${trenchX + 28},${SEA_Y - 8} 50,${SEA_Y}`} fill="#0f2b3e" />
      <text x="70" y="64" fill="#7dd3fc" fontSize="11">
        {oceanLabel}
      </text>
      <text x={trenchX} y="52" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
        Dyphavsgrop
      </text>
      <polygon points={`${trenchX},${SEA_Y + 10} ${wedgeX + 36},${SEA_Y - 22} ${wedgeX + 8},${SEA_Y - 6}`} fill="#3d493f" />
      <text x={wedgeX + 16} y={SEA_Y - 26} fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Akkresjonskile
      </text>
      <text x={(wedgeX + arcX) / 2} y={SEA_Y - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">
        Forbuebasseng
      </text>
      <polygon
        points={`${arcX - 36},${SEA_Y} ${arcX},${backarc ? 58 : 46} ${arcX + 28},${backarc ? 64 : 58} ${arcX + 48},${SEA_Y}`}
        fill="#4b5d52"
      />
      <text x={arcX} y="36" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">
        {arcLabel}
      </text>
      {backarc ? (
        <g>
          <polyline
            points={`${arcX + 90},${SEA_Y - 16} ${arcX + 120},${SEA_Y + 6} ${arcX + 150},${SEA_Y - 16}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x={arcX + 120} y={SEA_Y - 24} fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">
            Bakbue med spredning
          </text>
          <polygon
            points={`${arcX + 70},${SEA_Y} 880,${SEA_Y} 880,${yDepth(18)} ${arcX + 70},${yDepth(22)}`}
            fill="#243038"
          />
        </g>
      ) : (
        <polygon
          points={`${trenchX + 48},${SEA_Y} 890,${SEA_Y} 890,${yDepth(42)} ${trenchX + 70},${yDepth(48)}`}
          fill="#4b5d52"
        />
      )}
      {!backarc ? (
        <text x="760" y={yDepth(24)} fill="#e2e8f0" fontSize="11">
          Kontinentalskorpe, ca. 40 km
        </text>
      ) : null}
      <polygon points={`50,${SEA_Y} ${trenchX},${SEA_Y} ${trenchX},${yDepth(8)} 50,${yDepth(8)}`} fill="#2e4238" />
      <polygon points={`50,${yDepth(8)} ${trenchX},${yDepth(8)} ${trenchX},${yDepth(70)} 50,${yDepth(70)}`} fill="#1c2f3a" />
      <text x="70" y={yDepth(40)} fill="#94a3b8" fontSize="11">
        {slabLabel}
      </text>
      <polygon points={pts(slab)} fill="#1a3330" stroke="#245046" />
      <text x={melt.x + 28} y={melt.y - 36} fill="#86efac" fontSize="11" fontWeight="700">
        Mantelkile
      </text>
      {showMelting ? (
        <g>
          <circle cx={amph.x} cy={amph.y} r="4" fill="#38bdf8" />
          <text x={amph.x + 10} y={amph.y - 8} fill="#7dd3fc" fontSize="10" fontWeight="700">
            H₂O fra amfibol, ca. {AMPHIBOLE_KM} km
          </text>
          <circle cx={serp.x} cy={serp.y} r="4" fill="#38bdf8" />
          <text x={serp.x + 10} y={serp.y + 14} fill="#7dd3fc" fontSize="10" fontWeight="700">
            H₂O fra serpentin, ca. {SERPENTINE_KM} km
          </text>
          <ellipse
            cx={melt.x - 16}
            cy={yDepth(100)}
            rx="36"
            ry="14"
            fill="#ef4444"
            opacity="0.9"
            className={animating ? "magma-pulse" : ""}
          />
          <text x={melt.x - 16} y={yDepth(100) + 4} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
            Flukssmelting
          </text>
          <path
            d={`M ${melt.x - 16} ${yDepth(92)} C ${arcX - 10} ${yDepth(50)}, ${arcX} ${yDepth(20)}, ${arcX} 70`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd="url(#arrow-magma)"
          />
        </g>
      ) : null}
      {showQuakes ? (
        <g>
          <Foci animating={animating} points={quakes} />
          <text x="70" y={yDepth(190)} fill="#fca5a5" fontSize="11">
            Jordskjelv langs plategrensen. Dybdefordelingen eier Jordskjelv.
          </text>
        </g>
      ) : null}
      {showForces ? (
        <g>
          <line
            x1={pull.x}
            y1={pull.y}
            x2={pull.x + 36}
            y2={pull.y + 28}
            stroke="#38bdf8"
            strokeWidth="4"
            markerEnd="url(#arrow-slab)"
          />
          <text x={Math.min(pull.x + 44, 760)} y={pull.y + 8} fill="#38bdf8" fontSize="12" fontWeight="800">
            Slab pull
          </text>
          <line x1={trenchX - 120} y1="84" x2={trenchX - 40} y2="84" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <text x={trenchX - 80} y="76" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
            {rate} cm/år
          </text>
        </g>
      ) : null}
    </g>
  );
}

function CollisionScene({ rate, showMelting, showQuakes, showForces, animating }: SceneProps) {
  const xs = Array.from({ length: 41 }, (_, i) => 70 + i * 20);
  const thick = (x: number) => {
    const n = (x - 460) / 340;
    return 35 + (CRUSTAL_ROOT_KM - 35) * Math.max(0, 1 - n * n);
  };
  const crest = xs.map((x) => {
    const n = (x - 460) / 340;
    return { x, y: 40 + (SEA_Y - 52) * Math.min(1, n * n) };
  });
  const base = xs.map((x) => ({ x, y: yDepth(thick(x)) }));

  return (
    <g>
      <polygon points={`${pts(crest)} 870,${SEA_Y} 70,${SEA_Y}`} fill="#4b5e52" />
      <polygon points={`70,${SEA_Y} 870,${SEA_Y} ${pts([...base].reverse())}`} fill="#3d4f46" />
      <polyline points={pts(base)} fill="none" stroke="#38bdf8" strokeWidth="2" />
      <text x="460" y="28" fill="#f8fafc" fontSize="13" fontWeight="800" textAnchor="middle">
        Himalaya
      </text>
      <text x="460" y={yDepth(CRUSTAL_ROOT_KM) - 8} fill="#7dd3fc" fontSize="11" fontWeight="700" textAnchor="middle">
        Skorperot, Moho ca. {CRUSTAL_ROOT_KM} km
      </text>
      <text x="460" y={yDepth(CRUSTAL_ROOT_KM) + 16} fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Kontinental skorpe subdueres ikke dypt
      </text>
      {showMelting ? (
        <g>
          <ellipse cx="460" cy={yDepth(42)} rx="40" ry="12" fill="#f59e0b" opacity="0.85" />
          <text x="460" y={yDepth(42) + 3} fill="#1c1917" fontSize="10" fontWeight="700" textAnchor="middle">
            Skorpesmelting (anatekse)
          </text>
        </g>
      ) : null}
      {showQuakes ? (
        <Foci
          animating={animating}
          points={[
            { x: 340, y: yDepth(8) },
            { x: 400, y: yDepth(16) },
            { x: 460, y: yDepth(12) },
            { x: 520, y: yDepth(22) },
            { x: 580, y: yDepth(10) },
          ]}
        />
      ) : null}
      {showForces ? (
        <g>
          <line x1="150" y1="78" x2="230" y2="78" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-magma)" />
          <text x="190" y="70" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
            India, relativt {rate} cm/år
          </text>
          <text x="730" y="70" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
            Eurasiske plate
          </text>
        </g>
      ) : null}
    </g>
  );
}

function RiftScene({ rate, showMelting, showQuakes, showForces, animating }: SceneProps) {
  return (
    <g>
      <polygon
        points={`60,70 340,62 400,108 520,108 580,62 860,70 860,${SEA_Y} 60,${SEA_Y}`}
        fill="#544c3d"
      />
      <line x1="340" y1="62" x2="400" y2="108" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="580" y1="62" x2="520" y2="108" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="460" y="96" fill="#fbbf24" fontSize="12" fontWeight="700" textAnchor="middle">
        Graben
      </text>
      <text x="220" y="52" fill="#e2e8f0" fontSize="11">
        Riftskulder
      </text>
      <rect x="430" y="100" width="60" height="8" fill="#0284c7" />
      <polygon
        points={`60,${SEA_Y} 300,${SEA_Y} 390,${yDepth(18)} 530,${yDepth(18)} 620,${SEA_Y} 860,${SEA_Y} 860,${yDepth(40)} 60,${yDepth(40)}`}
        fill="#4a4338"
      />
      <path
        d={`M 390 ${yDepth(190)} C 410 ${yDepth(80)}, 430 ${yDepth(40)}, 450 ${yDepth(18)} L 470 ${yDepth(18)} C 490 ${yDepth(40)}, 510 ${yDepth(80)}, 530 ${yDepth(190)} Z`}
        fill="#3a1e16"
        opacity="0.9"
      />
      {showMelting ? (
        <g>
          <ellipse cx="460" cy={yDepth(48)} rx="32" ry="12" fill="#ef4444" opacity="0.9" className={animating ? "magma-pulse" : ""} />
          <text x="460" y={yDepth(66)} fill="#fed7aa" fontSize="11" fontWeight="700" textAnchor="middle">
            Dekompresjon under tynn skorpe
          </text>
        </g>
      ) : null}
      {showQuakes ? (
        <Foci
          animating={animating}
          points={[
            { x: 360, y: yDepth(6) },
            { x: 390, y: yDepth(12) },
            { x: 560, y: yDepth(6) },
            { x: 530, y: yDepth(12) },
          ]}
        />
      ) : null}
      {showForces ? (
        <g>
          <line x1="250" y1="88" x2="180" y2="88" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
          <line x1="670" y1="88" x2="740" y2="88" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
          <text x="460" y="52" fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle">
            Relativt strekk {rate} cm/år
          </text>
        </g>
      ) : null}
    </g>
  );
}

function TransformScene({ rate, showQuakes, animating }: SceneProps) {
  return (
    <g>
      <rect x="40" y="36" width="840" height="400" rx="8" fill="#0d1b26" />
      <text x="60" y="58" fill="#f8fafc" fontSize="14" fontWeight="800">
        Transformsegment og bruddsoner
      </text>
      <text x="60" y="76" fill="#94a3b8" fontSize="11">
        Skjematisk kart. Ingen dybdeskala.
      </text>
      <rect x="250" y="96" width="14" height="110" rx="2" fill="#f59e0b" />
      <text x="257" y="90" fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle">
        Nordlig rygg
      </text>
      <rect x="620" y="250" width="14" height="110" rx="2" fill="#f59e0b" />
      <text x="627" y="376" fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle">
        Sørlig rygg
      </text>
      <line x1="70" y1="220" x2="250" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="264" y1="220" x2="620" y2="220" stroke="#ef4444" strokeWidth="5" />
      <line x1="634" y1="220" x2="860" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />

      <line x1="200" y1="200" x2="120" y2="200" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <line x1="120" y1="242" x2="50" y2="242" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="130" y="188" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Bruddsone: samme vei, {rate} cm/år
      </text>

      <line x1="340" y1="198" x2="430" y2="198" stroke="#fca5a5" strokeWidth="3" markerEnd="url(#arrow-magma)" />
      <line x1="520" y1="246" x2="430" y2="246" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="440" y="184" fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle">
        Transform: motsatt retning
      </text>

      <line x1="700" y1="198" x2="790" y2="198" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <line x1="760" y1="242" x2="850" y2="242" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="760" y="188" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Bruddsone: samme vei
      </text>

      <line x1="230" y1="150" x2="150" y2="150" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-slab)" />
      <line x1="290" y1="150" x2="370" y2="150" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-ridge)" />
      <line x1="600" y1="300" x2="520" y2="300" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-slab)" />
      <line x1="650" y1="300" x2="730" y2="300" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-ridge)" />

      {showQuakes ? (
        <Foci
          animating={animating}
          points={[
            { x: 320, y: 220 },
            { x: 400, y: 220 },
            { x: 480, y: 220 },
            { x: 560, y: 220 },
          ]}
        />
      ) : null}
      <text x="460" y="410" fill="#e2e8f0" fontSize="11" textAnchor="middle">
        Jordskjelv bare der sidene går motsatt vei, mellom ryggene.
      </text>
      <text x="460" y="428" fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle">
        Jan Mayen: det seismiske stykket er transformsegmentet. Bruddsonen utenfor er et arr.
      </text>
    </g>
  );
}

function HotspotScene({ rate, showMelting, showQuakes, animating }: SceneProps) {
  const plumeX = 760;
  const px = 0.72;
  const stations = HOTSPOT_STATIONS.map((station, index) => {
    const km = distanceKm(rate, station.ageMa);
    return { ...station, km, x: plumeX - km * px, index };
  }).filter((station) => station.x > 70);

  return (
    <g>
      <rect x="50" y="70" width="820" height="40" fill="#0f2b3e" />
      <text x="70" y="64" fill="#7dd3fc" fontSize="11">
        Stillehavet. Avstand = fart × alder. Eldre øyer ligger bak platen.
      </text>
      <rect x="50" y={SEA_Y} width="820" height={yDepth(8) - SEA_Y} fill="#1b2e25" />
      <rect x="50" y={yDepth(8)} width="820" height={yDepth(55) - yDepth(8)} fill="#152630" />
      <path
        d={`M ${plumeX - 18} ${yDepth(200)} L ${plumeX - 16} ${yDepth(70)} C ${plumeX - 28} ${yDepth(40)}, ${plumeX - 10} ${yDepth(20)}, ${plumeX} ${yDepth(12)} L ${plumeX + 8} ${yDepth(12)} C ${plumeX + 24} ${yDepth(24)}, ${plumeX + 22} ${yDepth(48)}, ${plumeX + 18} ${yDepth(70)} L ${plumeX + 18} ${yDepth(200)} Z`}
        fill="#ea580c"
        opacity="0.92"
      />
      <text x={plumeX - 28} y={yDepth(120)} fill="#ffedd5" fontSize="11" fontWeight="800" textAnchor="end">
        Øverste 200 km av plymen
      </text>
      <text x={plumeX - 28} y={yDepth(136)} fill="#fed7aa" fontSize="10" textAnchor="end">
        Kilden er D''-laget, ca. 2900 km
      </text>
      {showMelting ? (
        <g>
          <ellipse cx={plumeX} cy={yDepth(40)} rx="26" ry="10" fill="#ef4444" className={animating ? "magma-pulse" : ""} />
          <text x={plumeX + 36} y={yDepth(44)} fill="#fecaca" fontSize="10">
            Dekompresjon i varm mantel
          </text>
        </g>
      ) : null}
      {stations.map((station) => {
        const h = Math.max(18, 56 - station.ageMa * 7);
        return (
          <g key={station.label}>
            <polygon
              points={`${station.x - h * 0.7},${SEA_Y} ${station.x},${SEA_Y - h} ${station.x + h * 0.55},${SEA_Y}`}
              fill={station.ageMa === 0 ? "#5c5346" : "#2c3330"}
            />
            <text x={station.x} y={SEA_Y - h - 8 - (station.index % 2) * 12} fill="#f8fafc" fontSize="10" textAnchor="middle">
              {station.label}
            </text>
          </g>
        );
      })}
      {showQuakes ? (
        <Foci
          animating={animating}
          points={[
            { x: plumeX - 8, y: yDepth(10) },
            { x: plumeX + 6, y: yDepth(16) },
          ]}
        />
      ) : null}
      <line x1={plumeX - 40} y1={yDepth(28)} x2={plumeX - 140} y2={yDepth(28)} stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow-slab)" />
      <text x={plumeX - 90} y={yDepth(22)} fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
        Platen {rate} cm/år
      </text>
      <line x1={plumeX} y1="452" x2={plumeX - 100 * px} y2="452" stroke="#94a3b8" strokeWidth="1.5" />
      <text x={plumeX - 50 * px} y="466" fill="#94a3b8" fontSize="10" textAnchor="middle">
        100 km
      </text>
    </g>
  );
}

function PaleomagScene({ rate, showMelting, showQuakes, animating, polarity }: SceneProps) {
  const axis = 460;
  const windowKm = 220;
  const px = 1.4;
  const half = halfRateCmYr(rate);
  const xAt = (kmFromAxis: number) => axis + kmFromAxis * px;

  const stripes = MAG_CHRONS.flatMap((chron) =>
    ([-1, 1] as const).map((side) => {
      const inner = distanceKm(half, chron.startMa);
      const outer = Math.min(distanceKm(half, chron.endMa), windowKm);
      if (inner >= windowKm) return null;
      const x1 = xAt(side * inner);
      const x2 = xAt(side * outer);
      return {
        key: `${chron.name}-${side}`,
        x: Math.min(x1, x2),
        w: Math.abs(x2 - x1),
        polarity: chron.polarity,
        label: chron.name,
      };
    }),
  ).filter((stripe): stripe is NonNullable<typeof stripe> => stripe !== null && stripe.w > 0.8);

  const jara = ([-1, 1] as const).map((side) => {
    const inner = distanceKm(half, JARAMILLO.startMa);
    const outer = distanceKm(half, JARAMILLO.endMa);
    if (inner >= windowKm) return null;
    const x1 = xAt(side * inner);
    const x2 = xAt(side * Math.min(outer, windowKm));
    return { side, x: Math.min(x1, x2), w: Math.abs(x2 - x1) };
  });

  const gilbertOuter = distanceKm(half, 6.033);
  const samples: Pt[] = [];
  for (let km = -windowKm; km <= windowKm; km += 4) {
    const age = ageMaAtDistance(km, rate);
    const known = age <= 6.033;
    const pol = Math.abs(km) < 14 ? polarity : polarityAtAge(age, polarity);
    const y = known ? 96 + (pol === "normal" ? -16 : 16) : 96;
    samples.push({ x: xAt(km), y });
  }

  return (
    <g>
      <text x="60" y="40" fill="#e2e8f0" fontSize="12" fontWeight="700">
        Magnetstriper. Bredde = halvrate × alder. Horisontal skala, ikke dybdeakse.
      </text>
      <rect x="70" y="52" width="780" height="78" rx="6" fill="#071018" stroke="#1e293b" />
      <line x1="80" y1="96" x2="840" y2="96" stroke="#334155" strokeDasharray="4 3" />
      <polyline points={pts(samples)} fill="none" stroke={polarity === "normal" ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
      <text x={axis} y="68" fill="#f8fafc" fontSize="10" fontWeight="800" textAnchor="middle">
        {polarity === "normal" ? "+ΔB i aksen (normal)" : "−ΔB i aksen (reversert nå)"}
      </text>

      {gilbertOuter < windowKm
        ? ([-1, 1] as const).map((side) => {
            const x1 = xAt(side * gilbertOuter);
            const x2 = xAt(side * windowKm);
            return (
              <g key={`old-${side}`}>
                <rect x={Math.min(x1, x2)} y="150" width={Math.abs(x2 - x1)} height="58" fill="#1e293b" />
                <text x={(x1 + x2) / 2} y="182" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  Eldre enn 6 Ma
                </text>
              </g>
            );
          })
        : null}

      {stripes.map((stripe) => (
        <g key={stripe.key}>
          <rect
            x={stripe.x}
            y="150"
            width={stripe.w}
            height="58"
            fill={stripe.polarity === "normal" ? "#1d4ed8" : "#334155"}
          />
          {stripe.w > 36 ? (
            <text x={stripe.x + stripe.w / 2} y="182" fill="#fff" fontSize="9" textAnchor="middle">
              {stripe.label}
            </text>
          ) : null}
        </g>
      ))}
      {jara.map((band) =>
        band && band.w > 0.6 ? (
          <rect key={band.side} x={band.x} y="150" width={Math.max(band.w, 2)} height="58" fill="#1d4ed8" />
        ) : null,
      )}
      <rect
        x={axis - 6}
        y="146"
        width="12"
        height="66"
        fill={polarity === "normal" ? "#2563eb" : "#64748b"}
        stroke="#fff"
        strokeWidth="1"
      />
      <text x={axis} y="224" fill="#fbbf24" fontSize="10" fontWeight="800" textAnchor="middle">
        0 km
      </text>
      {[-200, -100, 100, 200].map((km) => (
        <text key={km} x={xAt(km)} y="224" fill="#94a3b8" fontSize="9" textAnchor="middle">
          {km > 0 ? "+" : ""}
          {km} km
        </text>
      ))}
      <text x={axis - 80} y="142" fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">
        ← {half.toFixed(1)} cm/år
      </text>
      <text x={axis + 80} y="142" fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">
        {half.toFixed(1)} cm/år →
      </text>
      <path
        d={`M 180 250 C 320 246, 400 236, ${axis} 232 C 520 236, 640 246, 760 250`}
        fill="none"
        stroke="#ef4444"
        strokeWidth="1.6"
        strokeDasharray="5 3"
      />
      <text x={axis} y="268" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="middle">
        Curie-isoterm, 580 °C, i skorpen
      </text>
      {showMelting ? (
        <g>
          <ellipse cx={axis} cy="300" rx="28" ry="12" fill="#ef4444" className={animating ? "magma-pulse" : ""} />
          <text x={axis} y="304" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
            Magmakammer
          </text>
        </g>
      ) : null}
      {showQuakes ? <Foci animating={animating} points={[{ x: axis - 8, y: 168 }, { x: axis + 8, y: 176 }]} /> : null}
      <text x="70" y="360" fill="#cbd5e1" fontSize="11">
        Jaramillo er den tynne normale stripen inne i Matuyama, nær 1 million år.
      </text>
      <text x="70" y="380" fill="#cbd5e1" fontSize="11">
        Polvendingen endrer bare ny skorpe i aksen. Eldre striper er allerede frosset.
      </text>
      <text x="70" y="400" fill="#94a3b8" fontSize="11">
        Raskere spredning gir bredere striper, og eldre kronologier glir ut av vinduet på ±{windowKm} km.
      </text>
    </g>
  );
}

const boundaryData: Record<
  BoundaryType,
  {
    title: string;
    kicker: string;
    rockTypes: string;
    quaketype: string;
    meltingMechanism: string;
    realExample: string;
    description: string;
  }
> = {
  ridge: {
    title: "Midthavsrygg (divergerende grense)",
    kicker: "Havbunnsspredning og dekompresjon",
    rockTypes: "Basalt (putelava), basaltganger, gabbro, serpentinisert peridotitt",
    quaketype: "Bare grunne jordskjelv, under 15–20 km, langs normalforkastninger i aksen.",
    meltingMechanism: "Dekompresjonssmelting: mantelen stiger og krysser solidus uten ekstra varme.",
    realExample: "Den midtatlantiske ryggen og Øst-Stillehavsryggen",
    description:
      "Platene glir fra hverandre. Treg spredning gir en riftdal og tykk flankelitosfære. Rask spredning gir en aksial høyde og tynnere plate ved samme avstand fra aksen.",
  },
  subduction_continent: {
    title: "Subduksjon hav mot kontinent",
    kicker: "Plateneddykking og flukssmelting",
    rockTypes: "Andesitt, dasitt, granodioritt, eklogitt i den synkende platen",
    quaketype: "Jordskjelv langs plategrensen. Dybdefordelingen ligger i kapittelet Jordskjelv.",
    meltingMechanism: `Flukssmelting. Amfibol slipper vann rundt ${AMPHIBOLE_KM} km, serpentin dypere, rundt ${SERPENTINE_KM} km.`,
    realExample: "Andesfjellene og Kaskadefjellene",
    description:
      "Tett oseanisk litosfære bøyer ned under kontinentet. Vann fra den synkende platen senker smeltepunktet i mantelkilen. Soneringen fra havet er grop, akkresjonskile, forbuebasseng og vulkanbue.",
  },
  subduction_island: {
    title: "Subduksjon hav mot hav",
    kicker: "Vulkanøybue og bakbue",
    rockTypes: "Basaltisk andesitt, tefra og pelagiske sedimenter",
    quaketype: "Jordskjelv langs subduksjonsgrensen. Dybde og tsunamifysikk ligger i kapittelet Jordskjelv.",
    meltingMechanism: "Flukssmelting i mantelkilen. Bak buen kan slab rollback åpne et bakbuebasseng.",
    realExample: "Marianene og Japanhavet som bakbue",
    description:
      "Den eldste og tetteste havbunnsplaten synker. Foran buen ligger grop, kile og forbue. Bak buen kan skorpen sprekke opp i et bakbuebasseng med egen spredning.",
  },
  collision: {
    title: "Kontinentalkollisjon",
    kicker: "Orogenese og skorperot",
    rockTypes: "Gneis, glimmerskifer, amfibolitt og granitt fra skorpesmelting",
    quaketype: "Jordskjelv i den fortykkede skorpen. Kontinental skorpe subdueres ikke dypt.",
    meltingMechanism: "Lite mantelsmelte. Skorpesmelting (anatekse) kan danne granitt.",
    realExample: "Himalaya og Tibet-platået",
    description:
      "Begge skorper er for lette til å synke dypt. Skorpen forkortes, og Moho trykkes ned til om lag 75 km under fjellkjeden. Den kaledonske kollisjonen ligger i kapitlet Norges geologi.",
  },
  rift: {
    title: "Kontinentalrift",
    kicker: "Oppsprekking",
    rockTypes: "Alkalisk basalt, ryolitt og innsjøsedimenter",
    quaketype: "Grunne jordskjelv langs de steile normalforkastningene.",
    meltingMechanism: "Dekompresjonssmelting under den uttynnede skorpen.",
    realExample: "Den østafrikanske riftdalen. Rødehavet er neste stadium.",
    description:
      "Strekk tynner kontinentet. Blokker synker inn som en graben. Fortsetter riftingen, kan havet flomme inn og en midthavsrygg oppstå.",
  },
  transform: {
    title: "Transformforkastning",
    kicker: "Sidelengs glidning",
    rockTypes: "Forkastningsbreksje, mylonitt og kataklasitt",
    quaketype: "Grunne jordskjelv bare på segmentet mellom ryggene, der sidene går motsatt vei.",
    meltingMechanism: "Ingen smelting. Skorpe verken lages eller forsvinner.",
    realExample: "San Andreas-forkastningen. Jan Mayen har et seismisk transformsegment mellom ryggene.",
    description:
      "Mellom to ryggsegmenter går platene motsatt vei. Utenfor ryggene, på bruddsonene, går begge sider samme vei med samme fart. Der er det ingen jordskjelv.",
  },
  hotspot: {
    title: "Hotspot / mantelplym",
    kicker: "Intraplate, ikke en plategrense",
    rockTypes: "Basalt og peridotitt",
    quaketype: "Små, grunne skjelv under den aktive vulkanen.",
    meltingMechanism:
      "En varm søyle fra ca. 2900 km smelter ved dekompresjon når den stiger. Figuren viser bare de øverste 200 km.",
    realExample: "Hawaii. Øyalderen øker i platens fartsretning.",
    description:
      "Plymen står nesten stille mens platen glir over. Avstanden mellom øyene er fart ganger alder. Dette er ikke en plategrense. Magmakjemi og Hawaii-Emperor-kjeden ligger i kapittelet Vulkaner.",
  },
  paleomag: {
    title: "Paleomagnetiske striper",
    kicker: "Vine-Matthews-Morley",
    rockTypes: "Basalt med magnetitt låst under Curie-temperaturen, 580 °C",
    quaketype: "Grunne skjelv i spredningsaksen.",
    meltingMechanism: "Dekompresjonssmelting under ryggen.",
    realExample: "Reykjanesryggen og ryggene i Stillehavet",
    description:
      "Ny basalt fryser magnetfeltet. Stripene er speilvendt om aksen. Bredden er halv spredningsrate ganger kronens alder. Jaramillo er en kort normal periode inne i Matuyama, nær 1 million år.",
  },
};

export function PlateTectonicsModel() {
  const [boundary, setBoundary] = useState<BoundaryType>("subduction_continent");
  const [polarity, setPolarity] = useState<"normal" | "reversed">("normal");
  const [rate, setRate] = useState(6);
  const [showQuakes, setShowQuakes] = useState(true);
  const [showMelting, setShowMelting] = useState(true);
  const [showForces, setShowForces] = useState(true);
  const [animating, setAnimating] = useState(true);

  const current = boundaryData[boundary];
  const layers = layerAvailability(boundary);
  const scene: SceneProps = {
    rate,
    showQuakes: layers.quakes && showQuakes,
    showMelting: layers.melting && showMelting,
    showForces: layers.forces && showForces,
    animating,
    polarity,
  };

  return (
    <ModelFrame
      kicker="Interaktiv geodynamisk simulator"
      title="Platetektonisk bevegelses- og grensemodell"
      lead="Juster platehastigheten og se riftdal, litosfæretykkelse og magnetstripebredde endre seg. Slå av og på jordskjelv, smelting og drivkrefter der grensen har dem."
      toolbar={
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["subduction_continent", "Subduksjon (Andes)"],
              ["ridge", "Midthavsrygg"],
              ["subduction_island", "Øybue"],
              ["collision", "Kollisjon (Himalaya)"],
              ["rift", "Rift (Øst-Afrika)"],
              ["transform", "Transform"],
              ["hotspot", "Hotspot"],
              ["paleomag", "Båndopptaker"],
            ] as const
          ).map(([id, label]) => (
            <ModelTab key={id} active={boundary === id} onClick={() => setBoundary(id)}>
              {label}
            </ModelTab>
          ))}
        </div>
      }
    >
      <ModelMarkers />
      <div className="mb-6 grid gap-4 rounded-xl border border-border bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Relativ platehastighet</span>
            <span className="font-mono text-primary">{rate} cm/år</span>
          </div>
          <input
            type="range"
            min={1}
            max={16}
            step={1}
            value={rate}
            aria-label="Relativ platehastighet"
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full cursor-pointer accent-primary"
          />
          <span className="text-[10px] text-muted-foreground">{rateCaption(boundary, rate)}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold">Visningslag</span>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={scene.showQuakes ? "default" : "secondary"}
              className="h-7 text-xs"
              disabled={!layers.quakes}
              onClick={() => setShowQuakes((q) => !q)}
            >
              {scene.showQuakes ? "Jordskjelv på" : "Jordskjelv av"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={scene.showMelting ? "default" : "secondary"}
              className="h-7 text-xs"
              disabled={!layers.melting}
              title={layers.melting ? "Smeltesoner" : "Ingen smelting på denne grensen"}
              onClick={() => setShowMelting((m) => !m)}
            >
              {layers.melting ? (scene.showMelting ? "Smelting på" : "Smelting av") : "Ingen smelting"}
            </Button>
            {boundary === "paleomag" ? (
              <Button
                type="button"
                size="sm"
                variant="default"
                className="h-7 text-xs"
                onClick={() => setPolarity((p) => (p === "normal" ? "reversed" : "normal"))}
              >
                {polarity === "normal" ? "Felt: normal" : "Felt: reversert"}
              </Button>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold">Drivkrefter</span>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={scene.showForces ? "default" : "secondary"}
              className="h-7 text-xs"
              disabled={!layers.forces}
              title={layers.forces ? "Drivkrefter" : "Pilene på denne fanen er selve bevegelsen"}
              onClick={() => setShowForces((f) => !f)}
            >
              {layers.forces ? (scene.showForces ? "Krefter på" : "Krefter av") : "Bevegelse alltid vist"}
            </Button>
            <Button type="button" size="sm" variant="secondary" className="h-7 text-xs" onClick={() => setAnimating((a) => !a)}>
              {animating ? "Pause" : "Start"}
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/40 p-2.5 text-xs">
          <span className="block font-semibold text-primary">{current.kicker}</span>
          <span className="mt-0.5 line-clamp-3 text-muted-foreground">{rateCaption(boundary, rate)}</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-[#0a1118]">
        <style>{`
          @keyframes mantle-flow-left { to { stroke-dashoffset: -40; } }
          @keyframes mantle-flow-right { to { stroke-dashoffset: 40; } }
          @keyframes magma-rise { 0%, 100% { opacity: 0.75; } 50% { opacity: 1; } }
          @keyframes quake-pulse { 0%, 100% { opacity: 0.45; } 70% { opacity: 0; } }
          .mantle-anim-left { animation: mantle-flow-left ${Math.max(2.2, 16 / rate)}s linear infinite; }
          .mantle-anim-right { animation: mantle-flow-right ${Math.max(2.2, 16 / rate)}s linear infinite; }
          .magma-pulse { animation: magma-rise 3s ease-in-out infinite; }
          .quake-ring { animation: quake-pulse 2s ease-out infinite; }
        `}</style>
        <svg viewBox="0 0 920 480" className="h-auto w-full select-none" role="img" aria-label={current.title} data-boundary={boundary}>
          <defs>
            <marker id="arrow-slab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-ridge" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-magma" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#ef4444" />
            </marker>
          </defs>
          <rect width="920" height="480" fill="#12110f" />
          {showsDepthScale(boundary) ? <DepthScale /> : null}
          {boundary === "ridge" ? <RidgeScene {...scene} /> : null}
          {boundary === "subduction_continent" ? (
            <SubductionScene
              {...scene}
              trenchX={400}
              arcX={590}
              dip={40}
              pxX={1.25}
              oceanLabel="Hav, ca. 4 km. Høyden er overdrevet."
              slabLabel="Oseanisk litosfære"
              arcLabel="Vulkanbue"
              backarc={false}
            />
          ) : null}
          {boundary === "subduction_island" ? (
            <SubductionScene
              {...scene}
              trenchX={340}
              arcX={530}
              dip={42}
              pxX={1.35}
              oceanLabel="Hav–hav. Høyden er overdrevet."
              slabLabel="Eldst og tettest plate"
              arcLabel="Vulkanøybue"
              backarc
            />
          ) : null}
          {boundary === "collision" ? <CollisionScene {...scene} /> : null}
          {boundary === "rift" ? <RiftScene {...scene} /> : null}
          {boundary === "transform" ? <TransformScene {...scene} /> : null}
          {boundary === "hotspot" ? <HotspotScene {...scene} /> : null}
          {boundary === "paleomag" ? <PaleomagScene {...scene} /> : null}
        </svg>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {showsDepthScale(boundary)
          ? "Dybdeskalaen er lineær fra 0 til 200 km under skorpetoppen. Fjell og havdyp over streken er overdrevet."
          : "Denne fanen er et kart eller et profil langs havbunnen, med horisontal skala."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ModelPanel>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Plategrensen</p>
          <p className="mt-1 text-base font-semibold">{current.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.description}</p>
        </ModelPanel>
        <ModelPanel>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Magma</p>
          <p className="mt-1 text-sm font-medium">{current.meltingMechanism}</p>
          <div className="mt-3 border-t border-border/50 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Bergarter: </span>
            {current.rockTypes}
          </div>
        </ModelPanel>
        <ModelPanel className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-500">Jordskjelv</p>
          <p className="mt-1 text-sm">{current.quaketype}</p>
          <div className="mt-3 border-t border-border/50 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Eksempel: </span>
            {current.realExample}
          </div>
        </ModelPanel>
      </div>

      <div className="mt-4 space-y-4">
        <ModelNote title="Egne kapitler" tone="teal">
          <p>
            Seismisitet og Wadati-Benioff-sonen ligger i{" "}
            <Link to="/geofag-1/jordskjelv" className="font-medium text-primary underline underline-offset-2">
              Jordskjelv og tsunamier
            </Link>
            . Ofiolittkomplekset på Leka ligger i{" "}
            <Link to="/geofag-1/norges-geologi" className="font-medium text-primary underline underline-offset-2">
              Norges geologiske historie
            </Link>
            .
          </p>
        </ModelNote>
        <ModelNote title="Eksamenstips (LK20 Geofag 1)" tone="warm">
          <p>Tre veier til magma:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-xs">
            <li>
              <strong>Dekompresjon (midthavsrygg og rift):</strong> Mantelen stiger, trykket faller, og peridotitt krysser solidus.
            </li>
            <li>
              <strong>Fluks (subduksjon):</strong> Vann fra amfibol rundt 90 km og fra serpentin dypere senker solidus i mantelkilen.
            </li>
            <li>
              <strong>Mantelplym:</strong> Ekstra varm mantel stiger og smelter ved dekompresjon, uavhengig av en plategrense.
            </li>
          </ul>
        </ModelNote>
      </div>
    </ModelFrame>
  );
}
