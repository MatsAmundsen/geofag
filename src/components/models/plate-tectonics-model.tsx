import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ScrollFrame } from "@/components/scroll-frame";
import { Button } from "@/components/ui/button";
import { useAnimationPlaying } from "@/components/diagrams/use-motion";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";
import {
  AMPHIBOLE_KM,
  CRUSTAL_ROOT_KM,
  DEPTH_MAX_KM,
  FLUX_MELT_KM,
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
      <line x1="48" y1={yDepth(0)} x2="48" y2={yDepth(DEPTH_MAX_KM)} stroke="#334e68" strokeWidth="1" />
      {ticks.map((km) => (
        <g key={km}>
          <line x1="44" x2="52" y1={yDepth(km)} y2={yDepth(km)} stroke="#334e68" />
          <text x="42" y={yDepth(km) + 3} textAnchor="end">
            {km}
          </text>
        </g>
      ))}
      <text x="14" y="312" textAnchor="middle" transform="rotate(-90 14 312)" fill="#6488a0">
        km
      </text>
    </g>
  );
}

function PlateDrift({
  id,
  x,
  y,
  width,
  dir,
  animating,
}: {
  id: string;
  x: number;
  y: number;
  width: number;
  dir: 1 | -1;
  animating: boolean;
}) {
  const period = 28;
  const count = Math.ceil(width / period) + 3;
  return (
    <g transform={`translate(${x} ${y})`} data-plate-drift={dir > 0 ? "pos" : "neg"}>
      <defs>
        <clipPath id={id}>
          <rect width={width} height="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g className={animating ? (dir > 0 ? "pt-drift-pos" : "pt-drift-neg") : undefined}>
          {Array.from({ length: count }, (_, index) => {
            const px = -period + index * period;
            const tip = dir > 0 ? px + 10 : px;
            const tail = dir > 0 ? px : px + 10;
            return (
              <path
                key={index}
                d={`M ${tail} 1 L ${tip} 8 L ${tail} 15`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </g>
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
    const y = Math.min(SEA_Y - 4, Math.max(30, SEA_Y - 58 + (depth - 2.5) * 32));
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
      <polygon points={`${pts(bathy)} ${right},28 ${left},28`} fill="#0c4a6e" opacity="0.85" />
      <polyline points={pts(bathy)} fill="none" stroke="#7dd3fc" strokeWidth="3.5" />
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
      <text x="120" y={yDepth(78)} fill="#e2e8f0" fontSize="12" fontWeight="700">
        Litosfære ca. {Math.round(lithosphereThicknessKm(ageMaAtDistance(250, rate)))} km, 250 km fra aksen
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
            Ryggskyv
          </text>
          <text x={axis + 120} y={SEA_Y - 28} fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">
            Ryggskyv
          </text>
        </g>
      ) : null}
      <PlateDrift id="pt-ridge-l" x={left + 16} y={SEA_Y - 22} width={axis - left - 70} dir={-1} animating={animating} />
      <PlateDrift id="pt-ridge-r" x={axis + 36} y={SEA_Y - 22} width={right - axis - 70} dir={1} animating={animating} />
    </g>
  );
}

function easeInOut(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function AndesScene({
  rate,
  showMelting,
  showQuakes,
  showForces,
  animating,
  stage,
}: SceneProps & { stage: number }) {
  const t = easeInOut(stage / 100);
  const trenchX = 300;
  const dip = 30;
  const pxX = 1.26;
  const meltKm = FLUX_MELT_KM;
  const arcX = trenchX + (meltKm / Math.tan((dip * Math.PI) / 180)) * pxX;
  const maxDepth = 32 + t * 168;
  const peak = SEA_Y - 6 - t * 64;
  const peak2 = SEA_Y - 2 - t * 40;
  const shoulder = SEA_Y - t * 14;
  const slab = dippingSlab(trenchX, dip, maxDepth, 54, pxX);
  const amph = slabPoint(trenchX, AMPHIBOLE_KM, dip, pxX);
  const serp = slabPoint(trenchX, SERPENTINE_KM, dip, pxX);
  const melt = slabPoint(trenchX, meltKm, dip, pxX);
  const pull = slabPoint(trenchX, Math.min(180, Math.max(40, maxDepth - 10)), dip, pxX);
  const quakes = [18, 40, 65, 90, 115, 145].filter((d) => d < maxDepth - 4).map((d) => slabPoint(trenchX, d, dip, pxX));
  const wedgeDepths = [12, 36, 60, 85, Math.min(meltKm, maxDepth - 2)].filter((d) => d < maxDepth);
  const wedge = wedgeDepths.map((d) => slabPoint(trenchX, d, dip, pxX));
  const showMelt = showMelting && maxDepth >= AMPHIBOLE_KM;
  const arcKm = (arcX - trenchX) / pxX;

  return (
    <g data-scene="andes" data-arc-km={arcKm.toFixed(0)} data-stage={stage}>
      <polygon
        points={`60,40 ${trenchX + 12},40 ${trenchX + 12},${SEA_Y - 22} ${trenchX},${SEA_Y} ${trenchX - 18},${SEA_Y - 2} ${trenchX - 46},${SEA_Y - 8} 60,${SEA_Y - 8}`}
        fill="#0c4a6e"
      />
      <polyline
        points={`60,${SEA_Y - 8} ${trenchX - 46},${SEA_Y - 8} ${trenchX - 18},${SEA_Y - 2} ${trenchX},${SEA_Y} ${trenchX + 12},${SEA_Y - 22}`}
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="2.6"
        data-trench="andes"
      />
      <polygon
        points={`60,${SEA_Y - 8} ${trenchX - 46},${SEA_Y - 8} ${trenchX - 18},${SEA_Y - 2} ${trenchX},${SEA_Y} ${trenchX},${yDepth(8)} 60,${yDepth(8)}`}
        fill="#2e4238"
      />
      <polygon points={`60,${yDepth(8)} ${trenchX},${yDepth(8)} ${trenchX},${yDepth(68)} 60,${yDepth(68)}`} fill="#1c2f3a" />
      {wedge.length > 1 ? (
        <polygon
          points={`${trenchX + 6},${SEA_Y + 6} ${pts(wedge)} ${arcX - 20},${yDepth(44)} ${trenchX + 28},${yDepth(24)}`}
          fill="#5a3024"
        />
      ) : null}
      <polygon points={pts(slab)} fill="#1a3330" stroke="#2f6a58" strokeWidth="1.4" />
      <polygon
        points={`${trenchX + 11},${SEA_Y - 18} ${trenchX + 36},${SEA_Y - 28 - t * 8} ${trenchX + 86},${SEA_Y - 10} ${arcX - 48},${shoulder + 6} ${arcX - 18},${peak + 16} ${arcX},${peak} ${arcX + 16},${peak + 12} ${arcX + 42},${peak2} ${arcX + 86},${shoulder} 880,${SEA_Y - 12} 880,${yDepth(40)} ${arcX},${yDepth(46)} ${trenchX + 40},${yDepth(36)} ${trenchX + 11},${SEA_Y - 2}`}
        fill="#4b5d52"
      />
      <polygon
        points={`${trenchX},${SEA_Y} ${trenchX + 18 + t * 16},${SEA_Y - 24 - t * 10} ${trenchX + 52 + t * 14},${SEA_Y - 6}`}
        fill="#6d5c45"
        stroke="#4a3f30"
      />
      <text x="78" y="58" fill="#7dd3fc" fontSize="11">
        Hav, ca. 4 km. Høyden er overdrevet.
      </text>
      <text x={trenchX - 4} y="34" fill="#38bdf8" fontSize="12" fontWeight="800" textAnchor="middle">
        Dyphavsgrop
      </text>
      <text x={trenchX + 58} y={SEA_Y - 36 - t * 8} fill="#e7d7b8" fontSize="10" fontWeight="700">
        Akkresjonskile
      </text>
      <text x={(trenchX + 100 + arcX - 60) / 2} y={SEA_Y - 18} fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Forbuebasseng
      </text>
      <text x={arcX + 8} y="30" fill="#f8fafc" fontSize="13" fontWeight="800">
        Andesfjellene
      </text>
      <text x="742" y={yDepth(22)} fill="#e2e8f0" fontSize="11">
        Kontinentalskorpe, ca. 40 km
      </text>
      {maxDepth >= 85 ? (
        <text x={arcX - 78} y={yDepth(44)} fill="#fdba74" fontSize="12" fontWeight="800">
          Mantelkile
        </text>
      ) : null}
      <text x="78" y={yDepth(46)} fill="#94a3b8" fontSize="11">
        Oseanisk litosfære
      </text>
      {showMelt ? (
        <g>
          <circle cx={amph.x} cy={amph.y} r="4" fill="#38bdf8" className={animating ? "pt-h2o" : ""} />
          <text x={amph.x - 118} y={amph.y - 10} fill="#7dd3fc" fontSize="10" fontWeight="700">
            H₂O fra amfibol, ca. {AMPHIBOLE_KM} km
          </text>
          {maxDepth >= SERPENTINE_KM ? (
            <g>
              <circle cx={serp.x} cy={serp.y} r="4" fill="#38bdf8" className={animating ? "pt-h2o" : ""} />
              <text x={serp.x - 150} y={serp.y + 16} fill="#7dd3fc" fontSize="10" fontWeight="700">
                H₂O fra serpentin, ca. {SERPENTINE_KM} km
              </text>
            </g>
          ) : null}
          {maxDepth >= meltKm - 6 ? (
            <g>
              <ellipse cx={melt.x - 18} cy={melt.y - 16} rx="30" ry="12" fill="#ef4444" opacity="0.92" className={animating ? "magma-pulse" : ""} />
              <text x={melt.x - 18} y={melt.y - 12} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
                Flukssmelting
              </text>
              <path
                d={`M ${melt.x - 10} ${melt.y - 26} C ${arcX - 20} ${yDepth(62)}, ${arcX - 4} ${yDepth(24)}, ${arcX} ${peak + 18}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="7 5"
                className={animating ? "pt-magma-dash" : ""}
                markerEnd="url(#arrow-magma)"
              />
            </g>
          ) : null}
        </g>
      ) : null}
      {showQuakes ? <Foci animating={animating} points={quakes} /> : null}
      {showForces ? (
        <g>
          <line x1={pull.x} y1={pull.y} x2={pull.x + 28} y2={pull.y + 22} stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow-slab)" />
          <text x={Math.min(pull.x + 36, 780)} y={pull.y + 10} fill="#38bdf8" fontSize="12" fontWeight="800">
            Platetrekk
          </text>
          <line x1={120} y1={SEA_Y + 6} x2={210} y2={SEA_Y + 6} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <text x={165} y={SEA_Y + 20} fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
            {rate} cm/år
          </text>
        </g>
      ) : null}
      <PlateDrift id="pt-andes" x={78} y={SEA_Y - 24} width={Math.max(80, trenchX - 160)} dir={1} animating={animating} />
    </g>
  );
}

function IslandArcScene({
  rate,
  showMelting,
  showQuakes,
  showForces,
  animating,
  stage,
}: SceneProps & { stage: number }) {
  const t = easeInOut(stage / 100);
  const trenchX = 276;
  const dip = 40;
  const pxX = 1.34;
  const meltKm = FLUX_MELT_KM;
  const arcX = trenchX + (meltKm / Math.tan((dip * Math.PI) / 180)) * pxX;
  const maxDepth = 32 + t * 168;
  const peak = SEA_Y - 4 - t * 50;
  const peak2 = SEA_Y - t * 28;
  const slab = dippingSlab(trenchX, dip, maxDepth, 50, pxX);
  const amph = slabPoint(trenchX, AMPHIBOLE_KM, dip, pxX);
  const serp = slabPoint(trenchX, SERPENTINE_KM, dip, pxX);
  const melt = slabPoint(trenchX, meltKm, dip, pxX);
  const pull = slabPoint(trenchX, Math.min(175, Math.max(36, maxDepth - 8)), dip, pxX);
  const quakes = [16, 40, 70, 100, 130].filter((d) => d < maxDepth - 4).map((d) => slabPoint(trenchX, d, dip, pxX));
  const wedgeDepths = [10, 32, 58, 84, Math.min(meltKm, maxDepth - 2)].filter((d) => d < maxDepth);
  const wedge = wedgeDepths.map((d) => slabPoint(trenchX, d, dip, pxX));
  const showMelt = showMelting && maxDepth >= AMPHIBOLE_KM;
  const arcKm = (arcX - trenchX) / pxX;
  const backX = arcX + 92;

  return (
    <g data-scene="island" data-arc-km={arcKm.toFixed(0)} data-stage={stage}>
      <polygon
        points={`60,40 ${trenchX + 13},40 ${trenchX + 13},${SEA_Y - 24} ${trenchX},${SEA_Y} ${trenchX - 16},${SEA_Y - 3} ${trenchX - 48},${SEA_Y - 10} 60,${SEA_Y - 10}`}
        fill="#0c4a6e"
      />
      <polygon
        points={`${arcX + 24},${SEA_Y - 12} ${backX},${SEA_Y + 10} ${backX + 28},${SEA_Y - 6} 880,${SEA_Y - 4} 880,40 ${arcX + 24},40`}
        fill="#0c4a6e"
      />
      <polyline
        points={`60,${SEA_Y - 10} ${trenchX - 48},${SEA_Y - 10} ${trenchX - 16},${SEA_Y - 3} ${trenchX},${SEA_Y} ${trenchX + 13},${SEA_Y - 24}`}
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="2.6"
        data-trench="island"
      />
      <polygon
        points={`60,${SEA_Y - 10} ${trenchX - 48},${SEA_Y - 10} ${trenchX - 16},${SEA_Y - 3} ${trenchX},${SEA_Y} ${trenchX},${yDepth(8)} 60,${yDepth(8)}`}
        fill="#2e4238"
      />
      <polygon points={`60,${yDepth(8)} ${trenchX},${yDepth(8)} ${trenchX},${yDepth(64)} 60,${yDepth(64)}`} fill="#1c2f3a" />
      {wedge.length > 1 ? (
        <polygon
          points={`${trenchX + 8},${SEA_Y + 8} ${pts(wedge)} ${arcX + 30},${yDepth(30)} ${trenchX + 26},${yDepth(18)}`}
          fill="#5a3024"
        />
      ) : null}
      <polygon points={pts(slab)} fill="#1a3330" stroke="#2f6a58" strokeWidth="1.4" />
      <polygon
        points={`${trenchX + 12},${SEA_Y - 16} ${arcX - 20},${SEA_Y - 12} 880,${SEA_Y - 8} 880,${yDepth(15)} ${arcX + 10},${yDepth(16)} ${trenchX + 18},${yDepth(14)}`}
        fill="#24382f"
      />
      <polygon points={`${arcX - 26},${SEA_Y - 10} ${arcX - 4},${peak} ${arcX + 14},${SEA_Y - 10}`} fill="#4e6056" stroke="#243028" />
      <polygon points={`${arcX + 18},${SEA_Y - 10} ${arcX + 34},${peak2} ${arcX + 50},${SEA_Y - 10}`} fill="#3e5148" />
      {t > 0.45 ? <polygon points={`${arcX - 5},${peak + 8} ${arcX + 1},${peak - 6} ${arcX + 7},${peak + 8}`} fill="#ef4444" /> : null}
      <polyline
        points={`${backX - 8},${SEA_Y - 14} ${backX + 8},${SEA_Y + 6} ${backX + 26},${SEA_Y - 14}`}
        fill="none"
        stroke="#fbbf24"
        strokeWidth="3"
      />
      <polygon
        points={`${trenchX},${SEA_Y} ${trenchX + 14 + t * 10},${SEA_Y - 22 - t * 6} ${trenchX + 36},${SEA_Y - 8}`}
        fill="#6d5c45"
      />
      <text x="68" y="72" fill="#7dd3fc" fontSize="11">
        Hav–hav. Høyden er overdrevet.
      </text>
      <text x={trenchX - 6} y="32" fill="#38bdf8" fontSize="12" fontWeight="800" textAnchor="middle">
        Dyphavsgrop
      </text>
      <text x={arcX - 8} y="46" fill="#f8fafc" fontSize="12" fontWeight="800">
        Vulkanøybue
      </text>
      <text x={backX + 36} y={SEA_Y - 22} fill="#fbbf24" fontSize="11" fontWeight="700">
        Bakbue med spredning
      </text>
      {maxDepth >= 80 ? (
        <text x={trenchX + 128} y={yDepth(30)} fill="#fdba74" fontSize="12" fontWeight="800">
          Mantelkile
        </text>
      ) : null}
      <text x="74" y={yDepth(42)} fill="#94a3b8" fontSize="11">
        Eldst og tettest plate
      </text>
      {showMelt ? (
        <g>
          <circle cx={amph.x} cy={amph.y} r="4" fill="#38bdf8" className={animating ? "pt-h2o" : ""} />
          <text x={amph.x - 116} y={amph.y - 8} fill="#7dd3fc" fontSize="10" fontWeight="700">
            H₂O fra amfibol, ca. {AMPHIBOLE_KM} km
          </text>
          {maxDepth >= SERPENTINE_KM ? (
            <g>
              <circle cx={serp.x} cy={serp.y} r="4" fill="#38bdf8" className={animating ? "pt-h2o" : ""} />
              <text x={serp.x - 8} y={serp.y + 16} fill="#7dd3fc" fontSize="10" fontWeight="700" textAnchor="end">
                H₂O fra serpentin, ca. {SERPENTINE_KM} km
              </text>
            </g>
          ) : null}
          {maxDepth >= meltKm - 6 ? (
            <g>
              <ellipse cx={melt.x - 14} cy={melt.y - 18} rx="26" ry="11" fill="#ef4444" className={animating ? "magma-pulse" : ""} />
              <text x={melt.x - 14} y={melt.y - 14} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
                Flukssmelting
              </text>
              <path
                d={`M ${melt.x - 8} ${melt.y - 28} C ${arcX - 16} ${yDepth(58)}, ${arcX} ${yDepth(20)}, ${arcX} ${peak + 14}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="7 5"
                className={animating ? "pt-magma-dash" : ""}
                markerEnd="url(#arrow-magma)"
              />
            </g>
          ) : null}
        </g>
      ) : null}
      {showQuakes ? <Foci animating={animating} points={quakes} /> : null}
      {showForces ? (
        <g>
          <line x1={pull.x} y1={pull.y} x2={pull.x + 26} y2={pull.y + 20} stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow-slab)" />
          <text x={Math.min(pull.x + 34, 760)} y={pull.y + 8} fill="#38bdf8" fontSize="12" fontWeight="800">
            Platetrekk
          </text>
          <line x1={110} y1={SEA_Y + 8} x2={190} y2={SEA_Y + 8} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <text x={150} y={SEA_Y + 22} fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
            {rate} cm/år
          </text>
        </g>
      ) : null}
      <PlateDrift id="pt-island" x={78} y={SEA_Y - 26} width={Math.max(70, trenchX - 170)} dir={1} animating={animating} />
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
      <PlateDrift id="pt-col-l" x={90} y={86} width={200} dir={1} animating={animating} />
      <PlateDrift id="pt-col-r" x={630} y={86} width={200} dir={-1} animating={animating} />
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
      <PlateDrift id="pt-rift-l" x={80} y={78} width={170} dir={-1} animating={animating} />
      <PlateDrift id="pt-rift-r" x={660} y={78} width={170} dir={1} animating={animating} />
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
      <PlateDrift id="pt-tr-n" x={300} y={168} width={280} dir={1} animating={animating} />
      <PlateDrift id="pt-tr-s" x={300} y={252} width={280} dir={-1} animating={animating} />
      <line x1="70" y1="220" x2="250" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="264" y1="220" x2="620" y2="220" stroke="#ef4444" strokeWidth="5" />
      <line x1="634" y1="220" x2="860" y2="220" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />

      <line x1="210" y1="196" x2="110" y2="196" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="160" y="188" fill="#7dd3fc" fontSize="10" textAnchor="middle">
        vestover
      </text>
      <line x1="150" y1="246" x2="60" y2="246" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="110" y="264" fill="#7dd3fc" fontSize="10" textAnchor="middle">
        vestover
      </text>
      <text x="140" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Bruddsone, samme vei, {rate} cm/år
      </text>

      <line x1="330" y1="196" x2="450" y2="196" stroke="#fca5a5" strokeWidth="3.5" markerEnd="url(#arrow-magma)" />
      <text x="390" y="186" fill="#fecaca" fontSize="11" fontWeight="800" textAnchor="middle">
        østover
      </text>
      <line x1="540" y1="248" x2="420" y2="248" stroke="#7dd3fc" strokeWidth="3.5" markerEnd="url(#arrow-slab)" />
      <text x="480" y="266" fill="#7dd3fc" fontSize="11" fontWeight="800" textAnchor="middle">
        vestover
      </text>
      <text x="450" y="160" fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle">
        Transform: motsatt retning
      </text>

      <line x1="690" y1="196" x2="820" y2="196" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="750" y="188" fill="#7dd3fc" fontSize="10" textAnchor="middle">
        østover
      </text>
      <line x1="730" y1="246" x2="850" y2="246" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
      <text x="790" y="264" fill="#7dd3fc" fontSize="10" textAnchor="middle">
        østover
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

function HotspotScene({ rate, showMelting, showQuakes, animating, stage }: SceneProps & { stage: number }) {
  const plumeX = 748;
  const px = 0.72;
  const now = (stage / 100) * 6;
  const births = [
    { birth: 0.5, mature: "ca. 5,5 Ma" },
    { birth: 3, mature: "3 Ma" },
    { birth: 5, mature: "1 Ma" },
    { birth: 5.72, mature: "0 Ma · aktiv" },
  ];
  const islands = births
    .map((item, index) => {
      const age = now - item.birth;
      if (age < 0) return null;
      const km = distanceKm(rate, age);
      const x = plumeX - km * px;
      if (x < 78 || x > 890) return null;
      const grow = Math.min(1, age / 0.25);
      const erode = Math.exp(-Math.max(0, age - 0.35) / 3.4);
      const h = 12 + 48 * grow * erode;
      const sink = Math.min(20, Math.max(0, age - 1.1) * 3.2);
      const active = age < 0.45;
      const label = stage >= 96 ? item.mature : active ? "aktiv" : `${age.toFixed(1).replace(".", ",")} Ma`;
      return { ...item, age, km, x, h, sink, active, label, index };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.x - b.x);
  let lastLabel = -200;
  const placed = islands.map((island) => {
    const showLabel = island.active || island.x - lastLabel > 76;
    if (showLabel) lastLabel = island.x;
    return { ...island, showLabel };
  });

  return (
    <g data-scene="hotspot" data-stage={stage}>
      <rect x="50" y="70" width="820" height="40" fill="#0f2b3e" />
      <text x="70" y="62" fill="#7dd3fc" fontSize="11">
        Stillehavet. Plymen står stille. Avstand = fart × alder.
      </text>
      <rect x="50" y={SEA_Y} width="820" height={yDepth(8) - SEA_Y} fill="#1b2e25" />
      <rect x="50" y={yDepth(8)} width="820" height={yDepth(55) - yDepth(8)} fill="#152630" />
      <path
        d={`M ${plumeX - 18} ${yDepth(200)} L ${plumeX - 16} ${yDepth(70)} C ${plumeX - 28} ${yDepth(40)}, ${plumeX - 10} ${yDepth(20)}, ${plumeX} ${yDepth(12)} L ${plumeX + 8} ${yDepth(12)} C ${plumeX + 24} ${yDepth(24)}, ${plumeX + 22} ${yDepth(48)}, ${plumeX + 18} ${yDepth(70)} L ${plumeX + 18} ${yDepth(200)} Z`}
        fill="#ea580c"
        opacity="0.92"
      />
      <text x="70" y={yDepth(118)} fill="#ffedd5" fontSize="11" fontWeight="800">
        Øverste 200 km av plymen
      </text>
      <text x="70" y={yDepth(134)} fill="#fed7aa" fontSize="10">
        Kilden er grensen mot kjernen, 2900 km
      </text>
      {showMelting ? (
        <g>
          <ellipse cx={plumeX} cy={yDepth(40)} rx="26" ry="10" fill="#ef4444" className={animating ? "magma-pulse" : ""} />
          <path
            d={`M ${plumeX} ${yDepth(52)} L ${plumeX} ${SEA_Y + 2}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeDasharray="6 4"
            className={animating ? "pt-magma-dash" : ""}
            markerEnd="url(#arrow-magma)"
          />
          <text x={plumeX + 34} y={yDepth(44)} fill="#fecaca" fontSize="10">
            Dekompresjon i varm mantel
          </text>
        </g>
      ) : null}
      {placed.map((island) => {
        const base = SEA_Y + island.sink;
        const half = 14 + island.age * 3.2;
        return (
          <g key={island.birth}>
            <polygon
              points={`${island.x - half},${base} ${island.x},${base - island.h} ${island.x + half * 0.72},${base}`}
              fill={island.active ? "#6a5b48" : "#333a36"}
            />
            {island.active ? (
              <polygon points={`${island.x - 5},${base - island.h + 8} ${island.x},${base - island.h - 6} ${island.x + 6},${base - island.h + 8}`} fill="#ef4444" />
            ) : null}
            {island.showLabel ? (
              <text x={island.x} y={island.active ? base - island.h - 12 : yDepth(16) + (island.index % 3) * 14} fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle">
                {island.label}
                {island.active ? "" : ` · ${Math.round(island.km)} km`}
              </text>
            ) : null}
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
      <line x1={210} y1={96} x2={120} y2={96} stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow-slab)" />
      <text x={250} y={92} fill="#38bdf8" fontSize="11" fontWeight="700">
        Platen {rate} cm/år
      </text>
      <text x="70" y="456" fill="#cbd5e1" fontSize="11">
        Alder øker mot venstre, som Hawaii–Emperor. Midway (28 Ma) ligger utenfor bildet.
      </text>
      <PlateDrift id="pt-hs" x={80} y={SEA_Y + 6} width={420} dir={-1} animating={animating} />
    </g>
  );
}

function TransformGenesis({ stage, rate, showQuakes, animating }: SceneProps & { stage: number }) {
  const u = stage / 100;
  const split = u < 0.22 ? 0 : u < 0.5 ? (u - 0.22) / 0.28 : 1;
  const fault = split;
  const northX = 455 + (257 - 455) * split;
  const southX = 455 + (627 - 455) * split;
  const northTop = 150 + (96 - 150) * split;
  const northH = 110;
  const southTop = 150 + (250 - 150) * split;
  const faultY = 220;
  const caption =
    u < 0.32 ? "Rett spredningsrygg" : u < 0.62 ? "Ryggen deles i forskjøvne segmenter" : "Transform mellom segmentene";

  return (
    <g data-scene="transform-genesis" data-stage={stage}>
      <rect x="40" y="36" width="840" height="400" rx="8" fill="#0d1b26" />
      <text x="60" y="58" fill="#f8fafc" fontSize="14" fontWeight="800">
        Slik oppstår en transformgrense
      </text>
      <text x="60" y="76" fill="#94a3b8" fontSize="11">
        {caption}
      </text>
      <rect x={northX - 7} y={northTop} width="14" height={northH} rx="2" fill="#f59e0b" />
      <text x={northX} y={northTop - 8} fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle">
        {split < 0.2 ? "Spredningsrygg" : "Nordlig rygg"}
      </text>
      {split > 0.04 ? (
        <g>
          <rect x={southX - 7} y={southTop} width="14" height={northH} rx="2" fill="#f59e0b" />
          <text x={southX} y={southTop + northH + 16} fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle">
            Sørlig rygg
          </text>
          <line x1={southX - 24} y1={faultY + 36} x2={southX - 120} y2={faultY + 36} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <line x1={southX + 24} y1={faultY + 36} x2={southX + 110} y2={faultY + 36} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
        </g>
      ) : null}
      {split === 0 ? (
        <g>
          <line x1={440} y1={210} x2={330} y2={210} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <line x1={470} y1={210} x2={580} y2={210} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
          <text x="455" y="196" fill="#e2e8f0" fontSize="11" fontWeight="700" textAnchor="middle">
            Platene glir fra hverandre
          </text>
        </g>
      ) : (
        <g>
          <line x1={northX - 70} y1={faultY - 28} x2={northX - 150} y2={faultY - 28} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <line x1={northX + 24} y1={faultY - 28} x2={northX + 110} y2={faultY - 28} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
        </g>
      )}
      {fault > 0.05 ? (
        <g opacity={fault}>
          <line x1={northX + 8} y1={faultY} x2={southX - 8} y2={faultY} stroke="#ef4444" strokeWidth="5" />
          <line x1={northX + 40} y1={faultY - 16} x2={northX + 130} y2={faultY - 16} stroke="#fca5a5" strokeWidth="3" markerEnd="url(#arrow-magma)" />
          <line x1={southX - 40} y1={faultY + 16} x2={southX - 130} y2={faultY + 16} stroke="#7dd3fc" strokeWidth="3" markerEnd="url(#arrow-slab)" />
          <text x={(northX + southX) / 2} y={faultY - 52} fill="#fff" fontSize="12" fontWeight="800" textAnchor="middle">
            Aktivt: motsatt retning
          </text>
        </g>
      ) : null}
      {u > 0.6 ? (
        <g>
          <line x1="70" y1={faultY} x2={northX - 10} y2={faultY} stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
          <line x1={southX + 10} y1={faultY} x2="860" y2={faultY} stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="180" y1={faultY - 18} x2="100" y2={faultY - 18} stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-slab)" />
          <line x1="180" y1={faultY + 18} x2="100" y2={faultY + 18} stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-slab)" />
          <line x1="720" y1={faultY - 18} x2="820" y2={faultY - 18} stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-slab)" />
          <line x1="720" y1={faultY + 18} x2="820" y2={faultY + 18} stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-slab)" />
          <text x="140" y={faultY + 40} fill="#94a3b8" fontSize="10" textAnchor="middle">
            Bruddsone, samme vei, {rate} cm/år
          </text>
          <text x="770" y={faultY + 40} fill="#94a3b8" fontSize="10" textAnchor="middle">
            Bruddsone, samme vei
          </text>
        </g>
      ) : null}
      {showQuakes && fault > 0.45 ? (
        <Foci
          animating={animating}
          points={[0.3, 0.5, 0.7].map((f) => ({ x: northX + 8 + (southX - northX - 16) * f, y: faultY }))}
        />
      ) : null}
      <text x="460" y="430" fill="#e2e8f0" fontSize="11" textAnchor="middle">
        {u < 0.22
          ? "En rett konstruktiv grense, før den deles i segmenter."
          : u < 0.5
            ? "Segmentene forskyves, og transformforkastningen vokser fram mellom dem."
            : "Aktiv bevegelse bare mellom ryggene. Bruddsonene utenfor går samme vei."}
      </text>
    </g>
  );
}

function PaleomagScene({ rate, showMelting, showQuakes, animating, polarity }: SceneProps) {
  const axis = 460;
  const windowKm = 160;
  const px = 2.1;
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
            fill={stripe.polarity === "normal" ? "#3b82f6" : "#0f172a"}
            stroke="#94a3b8"
            strokeWidth="0.6"
          />
          {stripe.w > 22 ? (
            <text x={stripe.x + stripe.w / 2} y="182" fill="#fff" fontSize="9" textAnchor="middle">
              {stripe.label}
            </text>
          ) : null}
        </g>
      ))}
      {jara.map((band) =>
        band && band.w > 0.6 ? (
          <rect key={band.side} x={band.x} y="150" width={Math.max(band.w, 3)} height="58" fill="#bfdbfe" />
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
      {[-150, -75, 75, 150].map((km) => (
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
      <PlateDrift id="pt-pm-l" x={120} y={286} width={240} dir={-1} animating={animating} />
      <PlateDrift id="pt-pm-r" x={560} y={286} width={240} dir={1} animating={animating} />
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
  const motion = useAnimationPlaying();
  const animating = motion.playing;
  const timed =
    boundary === "subduction_continent" ||
    boundary === "subduction_island" ||
    boundary === "hotspot" ||
    boundary === "transform";
  const [stage, setStage] = useState(100);
  useEffect(() => {
    if (!animating || !timed) return;
    const id = window.setInterval(() => {
      setStage((currentStage) => Math.min(100, currentStage + Math.max(0.45, rate / 7)));
    }, 90);
    return () => window.clearInterval(id);
  }, [animating, timed, rate]);

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
      stackHeader
      kicker="Interaktiv geodynamisk simulator"
      title="Platetektonisk bevegelses- og grensemodell"
      lead="Juster platehastigheten. Platene glir på hver fane, og riftdal, litosfæretykkelse og magnetstripebredde følger med. Slå av og på jordskjelv, smelting og drivkrefter der grensen har dem."
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
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="h-7 text-xs"
              onClick={() => {
                if (!animating && timed && stage >= 99) setStage(0);
                motion.toggle();
              }}
            >
              {animating ? "⏸ Pause animasjon" : "▶ Start animasjon"}
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/40 p-2.5 text-xs">
          <span className="block font-semibold text-primary">{current.kicker}</span>
          <span className="mt-0.5 line-clamp-3 text-muted-foreground">{rateCaption(boundary, rate)}</span>
        </div>
      </div>

      {timed ? (
        <div className="mb-4 flex flex-col gap-2">
          {boundary === "transform" ? (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Transformtrinn">
              {(
                [
                  ["1 Rett rygg", 10],
                  ["2 Segmenter", 40],
                  ["3 Transform", 64],
                  ["4 Aktiv og inaktiv", 100],
                ] as const
              ).map(([label, value]) => {
                const active =
                  (value === 10 && stage < 28) ||
                  (value === 40 && stage >= 28 && stage < 52) ||
                  (value === 64 && stage >= 52 && stage < 76) ||
                  (value === 100 && stage >= 76);
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStage(value)}
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border/80 bg-muted/60"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ) : null}
          <label className="flex min-w-0 items-center gap-2 text-xs font-medium text-foreground">
            <span className="whitespace-nowrap">Utvikling</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={stage}
              aria-label="Utvikling"
              onChange={(event) => setStage(Number(event.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
            <span className="w-24 shrink-0 font-mono text-primary">
              {boundary === "transform"
                ? stage < 28
                  ? "rett rygg"
                  : stage < 52
                    ? "segmenter"
                    : stage < 76
                      ? "transform"
                      : "som i dag"
                : boundary === "hotspot"
                  ? stage < 34
                    ? "ny øy"
                    : stage < 78
                      ? "driver bort"
                      : "øyrekke"
                  : stage < 34
                    ? "tidlig"
                    : stage < 72
                      ? "underveis"
                      : "moden"}
            </span>
          </label>
        </div>
      ) : null}

      <ScrollFrame
        label={current.title}
        fade="#0a1118"
        className={`overflow-hidden rounded-xl border border-border bg-[#0a1118] ${motion.motionClass}`}
      >
        <div className="w-max sm:w-full" data-playing={animating ? "yes" : "no"}>
        <style>{`
          @keyframes mantle-flow-left { to { stroke-dashoffset: -40; } }
          @keyframes mantle-flow-right { to { stroke-dashoffset: 40; } }
          @keyframes magma-rise { 0%, 100% { opacity: 0.75; } 50% { opacity: 1; } }
          @keyframes quake-pulse { 0%, 100% { opacity: 0.45; } 70% { opacity: 0; } }
          @keyframes pt-drift-pos { from { transform: translateX(0); } to { transform: translateX(28px); } }
          @keyframes pt-drift-neg { from { transform: translateX(0); } to { transform: translateX(-28px); } }
          .mantle-anim-left { animation: mantle-flow-left ${Math.max(2.2, 16 / rate)}s linear infinite; }
          .mantle-anim-right { animation: mantle-flow-right ${Math.max(2.2, 16 / rate)}s linear infinite; }
          .magma-pulse { animation: magma-rise 3s ease-in-out infinite; }
          .quake-ring { animation: quake-pulse 2s ease-out infinite; }
          .pt-drift-pos, .pt-drift-neg { animation-duration: ${Math.max(1.2, 18 / rate)}s; animation-timing-function: linear; animation-iteration-count: infinite; }
          .pt-drift-pos { animation-name: pt-drift-pos; }
          .pt-drift-neg { animation-name: pt-drift-neg; }
          @keyframes pt-h2o-rise {
            0% { transform: translate(0, 0); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translate(-6px, -18px); opacity: 0; }
          }
          @keyframes pt-magma-dash { to { stroke-dashoffset: -48; } }
          .pt-h2o {
            transform-box: fill-box;
            transform-origin: center;
            animation: pt-h2o-rise 2.2s ease-out infinite;
          }
          .pt-magma-dash { animation: pt-magma-dash 1.5s linear infinite; }
        `}</style>
        <svg viewBox="0 0 920 480" className="h-auto w-[920px] max-w-none select-none sm:w-full" role="img" aria-label={current.title} data-boundary={boundary}>
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
          {boundary === "subduction_continent" ? <AndesScene {...scene} stage={stage} /> : null}
          {boundary === "subduction_island" ? <IslandArcScene {...scene} stage={stage} /> : null}
          {boundary === "collision" ? <CollisionScene {...scene} /> : null}
          {boundary === "rift" ? <RiftScene {...scene} /> : null}
          {boundary === "transform" ? (
            stage >= 76 ? <TransformScene {...scene} /> : <TransformGenesis {...scene} stage={stage} />
          ) : null}
          {boundary === "hotspot" ? <HotspotScene {...scene} stage={stage} /> : null}
          {boundary === "paleomag" ? <PaleomagScene {...scene} /> : null}
        </svg>
        </div>
      </ScrollFrame>
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
        <ModelNote title="Les mer" tone="teal">
          <p>
            Les mer om seismisitet og Wadati-Benioff-sonen i kapittelet{" "}
            <Link to="/geofag-1/jordskjelv" className="font-medium text-primary underline underline-offset-2">
              Jordskjelv og tsunamier
            </Link>
            . Les mer om ofiolittkomplekset på Leka i kapittelet{" "}
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
