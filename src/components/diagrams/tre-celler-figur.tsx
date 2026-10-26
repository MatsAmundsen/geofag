/**
 * TreCellerFigur — stegfigur for vindsystemet (én celle → Coriolis → Hadley → Ferrel+Polar → hele NH).
 * v2 (Mats ja 26.10.2026): klimabakke, rikere ITCZ, cellefyll/glow, trappet tropopause;
 * Coriolis-ordlyd uten «vestavind» i 0–30° («vestavind» kun overflate 30–60°).
 * Label-hit: én himmel/bakke (ikke per steg); inline-tekst kun ved synlig ≥ 0,92; breddegrader via Lab.
 */
import type { ReactNode } from "react";
import { type Def, type Lab, type Markers } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { F, VB } from "./vaerkatastrofer-kit";

const o = (v: number) => r1(Math.max(0, Math.min(1, v)) * 100) / 100;

/** Skjul inline-tekst under midt-fade (AR-terskel 0,92 — strengere enn minstekrav 0,85). */
const HOLD = 0.92;

const SAND = "#fbbf24";
const LOW = "#f87171";
const MUTE = "#94a3b8";

/** Breddegrader (x) på 960-bredde, skalert fra mockup 1280. */
const X0 = 120;
const X30 = 360;
const X60 = 600;
const X90 = 840;
const BAKKE = 390;
const TOP = 90;

type Bilde = { s1: number; s2: number; s3: number; s4: number; s5: number };

type M = Markers & { sand: string; low: string; mute: string };

function ExtraMarkers() {
  return (
    <defs>
      <marker id="tc-sand" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7.5" markerHeight="7.5" orient="auto">
        <path d="M0 1.2 L11 6 L0 10.8 z" fill={SAND} />
      </marker>
      <marker id="tc-low" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7.5" markerHeight="7.5" orient="auto">
        <path d="M0 1.2 L11 6 L0 10.8 z" fill={LOW} />
      </marker>
      <marker id="tc-mute" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 1.2 L11 6 L0 10.8 z" fill={MUTE} />
      </marker>
      <linearGradient id="tc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050d14" />
        <stop offset="28%" stopColor="#0a1622" />
        <stop offset="62%" stopColor="#122838" />
        <stop offset="100%" stopColor="#1a3a52" />
      </linearGradient>
      <linearGradient id="tc-haze" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.14} />
        <stop offset="55%" stopColor="#64748b" stopOpacity={0.05} />
        <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="tc-ground" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0c4a6e" />
        <stop offset="12%" stopColor="#0e5a4a" />
        <stop offset="28%" stopColor="#1a5c38" />
        <stop offset="42%" stopColor="#92700e" />
        <stop offset="52%" stopColor="#a16207" />
        <stop offset="68%" stopColor="#1e3a2f" />
        <stop offset="82%" stopColor="#243b55" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="tc-ground-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.18} />
        <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="tc-sea-hadley" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0c4a6e" />
        <stop offset="40%" stopColor="#0e7490" />
        <stop offset="70%" stopColor="#166534" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
      <radialGradient id="tc-sun" cx="12%" cy="18%" r="22%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.55} />
        <stop offset="45%" stopColor="#f59e0b" stopOpacity={0.18} />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="tc-cloud-core" cx="42%" cy="35%" r="58%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f1f5f9" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </radialGradient>
      <radialGradient id="tc-cloud-base" cx="50%" cy="70%" r="50%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#334155" />
      </radialGradient>
      <linearGradient id="tc-dune" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="55%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <radialGradient id="tc-pile" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.55} />
        <stop offset="55%" stopColor="#b45309" stopOpacity={0.28} />
        <stop offset="100%" stopColor="#451a03" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="tc-loopfill" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#e8a46a" stopOpacity={0.16} />
        <stop offset="70%" stopColor="#e8a46a" stopOpacity={0.05} />
        <stop offset="100%" stopColor="#e8a46a" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="tc-hadleyfill" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#5eead4" stopOpacity={0.14} />
        <stop offset="100%" stopColor="#5eead4" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="tc-ferrelfill" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.14} />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="tc-polarfill" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#7cb8e8" stopOpacity={0.16} />
        <stop offset="100%" stopColor="#7cb8e8" stopOpacity={0} />
      </radialGradient>
      <filter id="tc-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="tc-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <filter id="tc-cloudblur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.8" />
      </filter>
    </defs>
  );
}

/** Én himmel + bakke — ikke per steg (unngår covered av tc-sky under fade). */
function Bakgrunn({ full = true, sol = false }: { full?: boolean; sol?: boolean }) {
  const w = full ? 880 : 400;
  const x2 = full ? 920 : 440;
  return (
    <g>
      <rect x={0} y={0} width={960} height={540} fill="url(#tc-sky)" />
      <rect x={0} y={0} width={960} height={400} fill="url(#tc-haze)" />
      {sol ? <ellipse cx={120} cy={105} rx={165} ry={120} fill="url(#tc-sun)" /> : null}
      <rect x={40} y={BAKKE} width={w} height={70} fill={full ? "url(#tc-ground)" : "url(#tc-sea-hadley)"} />
      <rect x={40} y={BAKKE} width={w} height={22} fill="url(#tc-ground-top)" />
      {/* sandrygg ~30° */}
      <path d={`M${X30 - 40} ${BAKKE} Q${X30} ${BAKKE - 24} ${X30 + 40} ${BAKKE}`} fill="#b45309" opacity={0.5} />
      {full ? (
        <g aria-hidden="true">
          <path d={`M${X90 - 40} ${BAKKE} L${x2} ${BAKKE} L${x2} 460 L${X90 - 40} 460 Z`} fill="#f1f5f9" opacity={0.32} />
          <path d={`M${X90 - 10} ${BAKKE} Q${X90 + 20} ${BAKKE - 14} ${X90 + 55} ${BAKKE}`} fill="#e2e8f0" opacity={0.45} />
        </g>
      ) : null}
      <line x1={40} y1={BAKKE} x2={x2} y2={BAKKE} stroke="#4b6275" strokeWidth={2.4} />
    </g>
  );
}

/** Kun stiplete meridians — ingen tekst (Labs bærer 0°/30°/60°/90°). */
function BredderLinjer() {
  return (
    <g stroke="#334155" strokeDasharray="3 4" opacity={0.4} aria-hidden="true">
      <line x1={X0} y1={TOP} x2={X0} y2={BAKKE} />
      <line x1={X30} y1={TOP} x2={X30} y2={BAKKE} />
      <line x1={X60} y1={TOP} x2={X60} y2={BAKKE} />
      <line x1={X90} y1={TOP} x2={X90} y2={BAKKE} />
    </g>
  );
}

/** Tropopause-geometri uten tekst (tekst via Lab / HoldTekst). */
function TropopauseGeo({ fallende }: { fallende?: boolean }) {
  if (fallende) {
    return (
      <path
        d={`M60 ${TOP + 5} L${X30} ${TOP + 5} Q${X30 + 22} ${TOP + 5} ${X30 + 30} ${TOP + 35} L${X60} ${TOP + 35} Q${X60 + 22} ${TOP + 35} ${X60 + 30} ${TOP + 65} L${X90 + 20} ${TOP + 65}`}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={2}
        strokeDasharray="5 4"
        opacity={0.7}
      />
    );
  }
  return (
    <line
      x1={60}
      y1={TOP + 10}
      x2={900}
      y2={TOP + 70}
      stroke="#38bdf8"
      strokeWidth={1.6}
      strokeDasharray="6 5"
      opacity={0.5}
    />
  );
}

function HoldTekst({ synlig, children }: { synlig: number; children: ReactNode }) {
  if (synlig < HOLD) return null;
  return <g opacity={o(synlig)}>{children}</g>;
}

/** Volumetrisk ITCZ (cumulonimbus + ambolt) — kun ved HOLD. */
function ItczSky({ x, sek }: { x: number; sek: number }) {
  const bob = Math.sin(sek * 1.6) * 2;
  return (
    <g>
      <g filter="url(#tc-cloudblur)" aria-hidden="true">
        <ellipse cx={x + 8} cy={270} rx={36} ry={90} fill="url(#tc-cloud-base)" opacity={0.85} />
        <ellipse cx={x - 8} cy={210} rx={42} ry={68} fill="#64748b" opacity={0.5} />
        <ellipse cx={x + 22} cy={188} rx={30} ry={52} fill="#475569" opacity={0.45} />
        <ellipse cx={x + 5} cy={120 + bob} rx={58} ry={32} fill="url(#tc-cloud-core)" />
        <ellipse cx={x + 28} cy={108 + bob * 0.5} rx={42} ry={20} fill="#f8fafc" opacity={0.92} />
        <ellipse cx={x - 18} cy={118 + bob * 0.4} rx={30} ry={16} fill="#e2e8f0" opacity={0.88} />
        <path
          d={`M${x - 55} ${102 + bob} L${x + 95} ${90 + bob * 0.3} Q${x + 118} ${90} ${x + 95} ${115} L${x - 40} ${120} Z`}
          fill="#e2e8f0"
          opacity={0.85}
        />
      </g>
    </g>
  );
}

function TrykkMerke({
  x,
  kind,
  synlig,
}: {
  x: number;
  kind: "L" | "H";
  synlig: number;
}) {
  if (synlig < HOLD) return null;
  const stroke = kind === "L" ? LOW : F.teal;
  const fill = kind === "L" ? "#3b151b" : "#0f2b32";
  return (
    <g opacity={o(synlig)} aria-hidden="true">
      <circle cx={x} cy={430} r={15} fill={fill} stroke={stroke} strokeWidth={2.1} />
      <text x={x} y={435} textAnchor="middle" fontSize={14} fontWeight={900} fill={stroke}>
        {kind}
      </text>
    </g>
  );
}

/** Steg 1: én lukket sløyfe 0→90°N */
function Steg1({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  if (synlig < 0.02) return null;
  const dash = synlig > 0.5 && sek > 0 ? (sek * 18) % 40 : 0;
  return (
    <g opacity={o(synlig)}>
      <path
        d={`M${X0} ${BAKKE - 15} C${X0} 225, ${X0} 120, ${X0} 108 C${X30} 80, ${X60} 95, ${X90} 125 L${X90} ${BAKKE - 15} C${X60} ${BAKKE - 5}, ${X30} ${BAKKE - 5}, ${X0} ${BAKKE - 15} Z`}
        fill="url(#tc-loopfill)"
        opacity={0.9}
      />
      <ellipse cx={X0} cy={225} rx={34} ry={72} fill="#64748b" opacity={0.42} filter="url(#tc-soft)" />
      <ellipse cx={X0} cy={158} rx={44} ry={24} fill="#e2e8f0" opacity={0.72} />
      <ellipse cx={X0} cy={140} rx={32} ry={16} fill="#f8fafc" opacity={0.85} />
      <g filter="url(#tc-glow)">
        <path
          d={`M${X0} ${BAKKE - 15} C${X0} 220, ${X0} 130, ${X0} 112`}
          fill="none"
          stroke={F.varm}
          strokeWidth={4.6}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "14 10" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X0 + 12} 105 C${X30} 82, ${X60} 98, ${X90 - 15} 125`}
          fill="none"
          stroke={F.varm}
          strokeWidth={4.2}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "14 10" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X90} 138 L${X90} ${BAKKE - 15}`}
          fill="none"
          stroke={F.kald}
          strokeWidth={4.6}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "14 10" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
        <path
          d={`M${X90 - 15} ${BAKKE - 8} C${X60} ${BAKKE - 8}, ${X30} ${BAKKE - 8}, ${X0 + 18} ${BAKKE - 8}`}
          fill="none"
          stroke={F.teal}
          strokeWidth={4.2}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "14 10" : undefined}
          markerEnd={`url(#${m.teal})`}
        />
      </g>
      <HoldTekst synlig={synlig}>
        <text x={X0 - 48} y={210} textAnchor="middle" fontSize={12} fontWeight={800} fill="#fca5a5">
          oppdrift
        </text>
        <text x={620} y={98} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.varm}>
          øvre strøm hele veien til polen
        </text>
        <text x={480} y={BAKKE - 22} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.teal}>
          retur langs bakken
        </text>
        <text x={X90 + 28} y={260} fontSize={12} fontWeight={800} fill={F.kald}>
          synker
        </text>
        <rect x={300} y={235} width={360} height={58} rx={8} fill="#1c1417" stroke="#4a1820" strokeWidth={1.4} />
        <text x={480} y={258} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fca5a5">
          Hadley 1735 · én celle uten rotasjon
        </text>
        <text x={480} y={278} textAnchor="middle" fontSize={12} fontWeight={600} fill={F.tekst}>
          Fungerer bare hvis jorda sto stille.
        </text>
      </HoldTekst>
    </g>
  );
}

/** Steg 2: Coriolis bryter — pile-up ved 30° (ingen «vestavind» i 0–30°). */
function Steg2({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  if (synlig < 0.02) return null;
  const pulse = 0.85 + 0.15 * Math.sin(sek * 2.4);
  return (
    <g opacity={o(synlig)}>
      <path
        d={`M${X0} ${BAKKE - 15} C${X0} 225, ${X0} 120, ${X0} 108 C${X0 + 90} 90, ${X30 - 30} 95, ${X30 - 8} 115 L${X30} ${BAKKE - 15} C${X30 - 80} ${BAKKE - 5}, ${X0 + 80} ${BAKKE - 5}, ${X0} ${BAKKE - 15} Z`}
        fill={F.varm}
        opacity={0.08}
      />
      <ellipse cx={X0} cy={175} rx={40} ry={80} fill="#64748b" opacity={0.36} filter="url(#tc-soft)" />
      <ellipse cx={X0} cy={118} rx={48} ry={22} fill="#e2e8f0" opacity={0.72} />
      <ellipse cx={X0} cy={102} rx={34} ry={15} fill="#f8fafc" opacity={0.88} />
      <g filter="url(#tc-glow)">
        <path d={`M${X0} ${BAKKE - 15} L${X0} 112`} fill="none" stroke={F.varm} strokeWidth={4.6} markerEnd={`url(#${m.warm})`} />
        <path
          d={`M${X0 + 12} 105 C${X0 + 90} 90, ${X30 - 40} 95, ${X30 - 10} 118`}
          fill="none"
          stroke={F.varm}
          strokeWidth={4.2}
          markerEnd={`url(#${m.warm})`}
        />
        <path d={`M${X30} 125 L${X30} ${BAKKE - 18}`} fill="none" stroke={SAND} strokeWidth={5} markerEnd={`url(#${m.sand})`} />
        <path
          d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 18} ${BAKKE - 8}`}
          fill="none"
          stroke={F.teal}
          strokeWidth={3.8}
          markerEnd={`url(#${m.teal})`}
        />
      </g>
      <path
        d={`M${X30 + 12} 122 C${X30 + 100} 108, ${X60 - 40} 118, ${X60 + 60} 132`}
        fill="none"
        stroke={MUTE}
        strokeWidth={2.4}
        strokeDasharray="8 7"
        opacity={0.55}
        markerEnd={`url(#${m.mute})`}
      />
      <circle cx={X30} cy={230} r={r1(48 * pulse)} fill="url(#tc-pile)" filter="url(#tc-soft)" />
      <circle cx={X30} cy={230} r={r1(36 * pulse)} fill="#451a03" fillOpacity={0.42} stroke={SAND} strokeWidth={2.1} />
      <path d={`M${X90 - 30} 90 Q${X90} 75 ${X90 + 30} 90`} fill="none" stroke={SAND} strokeWidth={2.2} markerEnd={`url(#${m.sand})`} />
      <HoldTekst synlig={synlig}>
        <text x={560} y={95} fontSize={12} fontWeight={700} fill={MUTE}>
          kan ikke nå polen
        </text>
        <text x={X90} y={68} textAnchor="middle" fontSize={12} fontWeight={800} fill={SAND}>
          jorda roterer (Ω)
        </text>
        <text x={X0 - 42} y={230} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.varm}>
          stiger
        </text>
        {/* Under pile-sirkelen (r≈48 @ y=230) — unngår covered «synker» @ midt-fade */}
        <text x={X30 + 48} y={318} fontSize={12} fontWeight={800} fill={SAND}>
          synker
        </text>
      </HoldTekst>
    </g>
  );
}

/** Steg 3: Hadley-fokus 0–30° */
function Steg3({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  if (synlig < 0.02) return null;
  const drip = (sek * 14) % 8;
  const dash = sek > 0 ? (sek * 16) % 36 : 0;
  return (
    <g opacity={o(synlig)}>
      <path d={`M${X30} ${BAKKE} Q${X30 + 60} 368 ${X30 + 120} ${BAKKE} L${X30 + 120} 460 L${X30} 460 Z`} fill="url(#tc-dune)" />
      <path d={`M${X30 + 22} ${BAKKE} Q${X30 + 70} 374 ${X30 + 100} ${BAKKE}`} fill={SAND} opacity={0.32} />
      {synlig >= HOLD ? <ItczSky x={X0 + 20} sek={sek} /> : null}
      <g stroke="#7dd3fc" strokeWidth={2.1} strokeDasharray="5 4" opacity={0.9}>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={X0 - 8 + i * 15}
            y1={r1(340 + ((drip + i) % 5))}
            x2={X0 - 18 + i * 15}
            y2={BAKKE - 2}
          />
        ))}
      </g>
      <path
        d={`M${X0 + 15} ${BAKKE - 15} C${X0 + 15} 250, ${X0 + 15} 130, ${X0 + 15} 108 C${X0 + 100} 88, ${X30 - 40} 92, ${X30 - 8} 118 L${X30} ${BAKKE - 15} C${X30 - 70} ${BAKKE - 5}, ${X0 + 90} ${BAKKE - 5}, ${X0 + 15} ${BAKKE - 15} Z`}
        fill="url(#tc-hadleyfill)"
      />
      <g filter="url(#tc-glow)">
        <path
          d={`M${X0 + 15} ${BAKKE - 15} L${X0 + 15} 105`}
          fill="none"
          stroke={F.varm}
          strokeWidth={5}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X0 + 80} 92 L${X30 - 8} 92`}
          fill="none"
          stroke={F.varm}
          strokeWidth={4.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X30} 108 L${X30} ${BAKKE - 15}`}
          fill="none"
          stroke={SAND}
          strokeWidth={5}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.sand})`}
        />
        <path
          d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 55} ${BAKKE - 8}`}
          fill="none"
          stroke={F.teal}
          strokeWidth={4.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.teal})`}
        />
      </g>
      <TrykkMerke x={X0 + 15} kind="L" synlig={synlig} />
      <TrykkMerke x={X30} kind="H" synlig={synlig} />
      <HoldTekst synlig={synlig}>
        <text x={680} y={230} textAnchor="middle" fontSize={14} fontWeight={700} fill="#4b6275">
          Ferrel og Polar · neste steg
        </text>
        <text x={X0 - 36} y={330} textAnchor="middle" fontSize={12} fontWeight={700} fill="#7dd3fc">
          regn
        </text>
        <text x={X0 - 55} y={250} fontSize={12} fontWeight={800} fill={F.varm}>
          stiger
        </text>
        <text x={230} y={78} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.varm}>
          tørr luft polover
        </text>
        <text x={X30 + 55} y={52} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fde68a">
          ørken ~30°N
        </text>
        <text x={240} y={290} textAnchor="middle" fontSize={12} fontWeight={600} fill={F.dempet}>
          termisk direkte · 0°–30°N
        </text>
      </HoldTekst>
    </g>
  );
}

/** Steg 4: Ferrel + Polar, Hadley dimmet */
function Steg4({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  if (synlig < 0.02) return null;
  const dash = sek > 0 ? (sek * 14) % 32 : 0;
  return (
    <g opacity={o(synlig)}>
      <g opacity={0.32}>
        <path d={`M${X0} ${BAKKE - 15} L${X0} 108`} fill="none" stroke={F.varm} strokeWidth={3} markerEnd={`url(#${m.warm})`} />
        <path d={`M${X0 + 15} 98 L${X30 - 15} 98`} fill="none" stroke={F.varm} strokeWidth={3} markerEnd={`url(#${m.warm})`} />
        <path d={`M${X30} 112 L${X30} ${BAKKE - 15}`} fill="none" stroke={SAND} strokeWidth={3} markerEnd={`url(#${m.sand})`} />
        <path d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 18} ${BAKKE - 8}`} fill="none" stroke={F.teal} strokeWidth={3} markerEnd={`url(#${m.teal})`} />
      </g>
      <path
        d={`M${X30 + 15} ${BAKKE - 12} C${X30 + 60} 225, ${X60 - 60} 135, ${X60 - 15} 125 C${X60 + 5} 118, ${X60 + 10} 150, ${X60} ${BAKKE - 15} C${X60 - 50} ${BAKKE - 2}, ${X30 + 70} ${BAKKE - 2}, ${X30 + 15} ${BAKKE - 12} Z`}
        fill="url(#tc-ferrelfill)"
      />
      <path
        d={`M${X60 + 15} 150 C${X60 + 70} 120, ${X90 - 70} 120, ${X90 - 15} 150 L${X90} ${BAKKE - 15} C${X90 - 70} ${BAKKE - 2}, ${X60 + 70} ${BAKKE - 2}, ${X60 + 15} ${BAKKE - 15} Z`}
        fill="url(#tc-polarfill)"
      />
      <g filter="url(#tc-glow)">
        <path
          d={`M${X30 + 22} ${BAKKE - 8} L${X60 - 22} ${BAKKE - 8}`}
          fill="none"
          stroke={F.varm}
          strokeWidth={4.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X60} ${BAKKE - 15} L${X60} 128`}
          fill="none"
          stroke={LOW}
          strokeWidth={4.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.low})`}
        />
        <path
          d={`M${X60 - 22} 122 L${X30 + 22} 122`}
          fill="none"
          stroke={MUTE}
          strokeWidth={3.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.mute})`}
        />
        <path
          d={`M${X60 + 22} 148 L${X90 - 22} 148`}
          fill="none"
          stroke={F.kald}
          strokeWidth={3.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
        <path
          d={`M${X90} 160 L${X90} ${BAKKE - 15}`}
          fill="none"
          stroke={F.kald}
          strokeWidth={4.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
        <path
          d={`M${X90 - 22} ${BAKKE - 8} L${X60 + 22} ${BAKKE - 8}`}
          fill="none"
          stroke={F.kald}
          strokeWidth={3.8}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "12 8" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
      </g>
      <TrykkMerke x={X60} kind="L" synlig={synlig} />
      <TrykkMerke x={X90} kind="H" synlig={synlig} />
      {synlig >= HOLD ? (
        <g opacity={0.75} aria-hidden="true">
          <circle cx={X30} cy={430} r={13} fill="#0f2b32" stroke={F.teal} strokeWidth={1.6} />
          <text x={X30} y={434} textAnchor="middle" fontSize={12} fontWeight={900} fill={F.teal}>
            H
          </text>
        </g>
      ) : null}
      <HoldTekst synlig={synlig}>
        <text x={250} y={305} textAnchor="middle" fontSize={13} fontWeight={800} fill={F.teal}>
          Hadley
        </text>
        <text x={X60 - 48} y={280} textAnchor="middle" fontSize={12} fontWeight={800} fill={LOW}>
          stiger
        </text>
        <text x={480} y={100} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTE}>
          øvre retur
        </text>
        <text x={480} y={300} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fde68a">
          termisk indirekte · drevet av virvler
        </text>
        <text x={780} y={300} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
          termisk direkte
        </text>
        <text x={X90 + 28} y={265} fontSize={12} fontWeight={800} fill={F.kald}>
          synker
        </text>
      </HoldTekst>
    </g>
  );
}

/** Steg 5: hele NH med STJ/PFJ */
function Steg5({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  if (synlig < 0.02) return null;
  const dash = sek > 0 ? (sek * 10) % 28 : 0;
  return (
    <g opacity={o(synlig)}>
      {synlig >= HOLD ? <ItczSky x={X0 + 10} sek={sek} /> : null}
      <path
        d={`M${X0} ${BAKKE - 18} C${X0} 240, ${X0} 120, ${X0} 105 C${X0 + 90} 88, ${X30 - 40} 90, ${X30 - 10} 112 L${X30} ${BAKKE - 18} C${X30 - 70} ${BAKKE - 6}, ${X0 + 80} ${BAKKE - 6}, ${X0} ${BAKKE - 18} Z`}
        fill="url(#tc-hadleyfill)"
        opacity={0.85}
      />
      <path
        d={`M${X30 + 12} ${BAKKE - 14} C${X30 + 55} 220, ${X60 - 55} 130, ${X60 - 12} 120 C${X60 + 5} 115, ${X60 + 8} 145, ${X60} ${BAKKE - 18} C${X60 - 45} ${BAKKE - 4}, ${X30 + 60} ${BAKKE - 4}, ${X30 + 12} ${BAKKE - 14} Z`}
        fill="url(#tc-ferrelfill)"
        opacity={0.85}
      />
      <path
        d={`M${X60 + 12} 145 C${X60 + 65} 118, ${X90 - 65} 118, ${X90 - 12} 145 L${X90} ${BAKKE - 18} C${X90 - 60} ${BAKKE - 4}, ${X60 + 60} ${BAKKE - 4}, ${X60 + 12} ${BAKKE - 18} Z`}
        fill="url(#tc-polarfill)"
        opacity={0.85}
      />
      <g filter="url(#tc-glow)">
        <path
          d={`M${X0} ${BAKKE - 20} L${X0} 102`}
          fill="none"
          stroke={F.varm}
          strokeWidth={3.6}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X0 + 15} 92 L${X30 - 15} 92`}
          fill="none"
          stroke={F.varm}
          strokeWidth={3.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X30} 105 L${X30} ${BAKKE - 20}`}
          fill="none"
          stroke={SAND}
          strokeWidth={3.6}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.sand})`}
        />
        <path
          d={`M${X30 - 22} ${BAKKE - 12} L${X0 + 18} ${BAKKE - 12}`}
          fill="none"
          stroke={F.teal}
          strokeWidth={3.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.teal})`}
        />
        <path
          d={`M${X30 + 22} ${BAKKE - 12} L${X60 - 22} ${BAKKE - 12}`}
          fill="none"
          stroke={F.varm}
          strokeWidth={3.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.warm})`}
        />
        <path
          d={`M${X60} ${BAKKE - 20} L${X60} 122`}
          fill="none"
          stroke={LOW}
          strokeWidth={3.6}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.low})`}
        />
        <path
          d={`M${X60 - 22} 115 L${X30 + 22} 115`}
          fill="none"
          stroke={MUTE}
          strokeWidth={3}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.mute})`}
        />
        <path
          d={`M${X60 + 22} 142 L${X90 - 22} 142`}
          fill="none"
          stroke={F.kald}
          strokeWidth={3}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
        <path
          d={`M${X90} 152 L${X90} ${BAKKE - 20}`}
          fill="none"
          stroke={F.kald}
          strokeWidth={3.6}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
        <path
          d={`M${X90 - 22} ${BAKKE - 12} L${X60 + 22} ${BAKKE - 12}`}
          fill="none"
          stroke={F.kald}
          strokeWidth={3.4}
          strokeDashoffset={-dash}
          strokeDasharray={sek > 0 ? "10 8" : undefined}
          markerEnd={`url(#${m.cold})`}
        />
      </g>
      {/* STJ/PFJ-merker litt over strøm/tropopausebrudd (matcher Lab.at) */}
      <g transform={`translate(${X30}, 72)`} aria-hidden="true">
        <circle r={10} fill="#451a03" stroke={SAND} strokeWidth={1.6} />
        <line x1={-4} y1={-4} x2={4} y2={4} stroke={SAND} strokeWidth={1.6} />
        <line x1={4} y1={-4} x2={-4} y2={4} stroke={SAND} strokeWidth={1.6} />
      </g>
      <g transform={`translate(${X60}, 88)`} aria-hidden="true">
        <circle r={10} fill="#450a0a" stroke={LOW} strokeWidth={1.6} />
        <line x1={-4} y1={-4} x2={4} y2={4} stroke={LOW} strokeWidth={1.6} />
        <line x1={4} y1={-4} x2={-4} y2={4} stroke={LOW} strokeWidth={1.6} />
      </g>
      <TrykkMerke x={X0} kind="L" synlig={synlig} />
      <TrykkMerke x={X30} kind="H" synlig={synlig} />
      <TrykkMerke x={X60} kind="L" synlig={synlig} />
      <TrykkMerke x={X90} kind="H" synlig={synlig} />
      <HoldTekst synlig={synlig}>
        <text x={250} y={310} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
          0°–30°N
        </text>
        <text x={230} y={BAKKE - 26} textAnchor="middle" fontSize={11} fontWeight={800} fill={F.teal}>
          ← passat
        </text>
        <text x={480} y={310} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
          30°–60°N · indirekte
        </text>
        <text x={480} y={BAKKE - 26} textAnchor="middle" fontSize={11} fontWeight={800} fill={F.varm}>
          vestavind →
        </text>
        <text x={720} y={310} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
          60°–90°N
        </text>
        <text x={720} y={BAKKE - 26} textAnchor="middle" fontSize={11} fontWeight={800} fill={F.kald}>
          ← østavind
        </text>
        <text x={940} y={28} textAnchor="end" fontSize={11} fontWeight={600} fill={F.dempet}>
          STJ/PFJ = jet i tropopausebrudd
        </text>
      </HoldTekst>
    </g>
  );
}

const def: Def<Bilde> = {
  id: "tre-celler-figur",
  tekst: {
    heading: "Fra én celle til tre · nordlig halvkuletverrsnitt",
    title:
      "Fem steg. Steg 1: Hadleys ene celle uten rotasjon. Steg 2: Coriolis dreier øvre strøm østover i høyden — lufta hoper seg opp nær 30° og synker. Steg 3: Hadley-cellen med ITCZ, subsidens og nordøstpassat. Steg 4: Ferrel (indirekte) og Polar (direkte). Steg 5: hele systemet med trykkbelter og STJ/PFJ. Kun nordlig halvkuletverrsnitt. Ingen hastighets- eller temperatur-tall.",
    caption:
      "Skjematisk tverrsnitt · nordlig halvkuletverrsnitt. Hadley og Polar er termisk direkte; Ferrel er indirekte (virvler). Ingen nye tall. STJ/PFJ er jetkjerner i tropopausebrudd — full jetforklaring i jetkapitlet. «Vestavind» er overflatevind 30°–60°N.",
  },
  faser: ["Én celle", "Coriolis bryter", "Hadley-cellen", "Ferrel og Polar", "Hele systemet"],
  status: [
    "Varm luft stiger ved ekvator, går mot polen i høyden, synker, og vender tilbake langs bakken.",
    "Luft mot polen i høyden dreies østover av Coriolis (vestlig strøm). Den hoper seg opp nær 30° og synker — én sløyfe til polen går ikke.",
    "Passatene møtes i ITCZ → opp og regn. I høyden går tørr luft mot 30°, synker (subsidens) og gir subtropisk høytrykk og ørken.",
    "Ferrel (30°–60°) er indirekte og drives av virvler. Polar (60°–90°) er direkte: kald luft synker over polen.",
    "Luft stiger ved 0° og nær 60°, synker nær 30° og over polen. Trykkbeltene og overflatevindene følger cellene.",
  ],
  bilder: [
    { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
    { s1: 1, s2: 0, s3: 0, s4: 0, s5: 0 },
    { s1: 0, s2: 1, s3: 0, s4: 0, s5: 0 },
    { s1: 0, s2: 0, s3: 1, s4: 0, s5: 0 },
    { s1: 0, s2: 0, s3: 0, s4: 1, s5: 0 },
    { s1: 0, s2: 0, s3: 0, s4: 0, s5: 1 },
  ],
  etiketter: [
    [
      /* Breddegrader under bakke — klar av meridian-linjer og TrykkMerke */
      { text: "0° ekvator", x: X0, y: 508, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [55, 508] },
      { text: "30°N", x: X30, y: 508, anchor: "middle", color: F.dempet, weight: 800, size: 12, badge: [X30 - 45, 508] },
      { text: "60°N", x: X60, y: 508, anchor: "middle", color: F.dempet, weight: 800, size: 12, badge: [X60 - 45, 508] },
      { text: "90°N polen", x: X90, y: 508, anchor: "middle", color: F.kald, weight: 800, size: 12, badge: [905, 508] },
      { text: "én celle uten rotasjon", x: 200, y: 42, anchor: "middle", color: F.tekst, weight: 700, size: 13, badge: [120, 28] },
      { text: "tropopause", x: 100, y: 58, anchor: "start", color: "#7dd3fc", weight: 700, size: 11, badge: [70, 48] },
    ],
    [
      { text: "0° ekvator", x: X0, y: 508, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [55, 508] },
      { text: "30°N", x: X30, y: 508, anchor: "middle", color: SAND, weight: 800, size: 12, badge: [X30 - 45, 508] },
      { text: "60°N", x: X60, y: 508, anchor: "middle", color: F.dempet, weight: 800, size: 12, badge: [X60 - 45, 508] },
      { text: "90°N polen", x: X90, y: 508, anchor: "middle", color: F.kald, weight: 800, size: 12, badge: [905, 508] },
      { text: "hoper seg opp", x: X30 + 95, y: 248, anchor: "start", color: SAND, weight: 800, size: 13, at: [X30, 230], badge: [X30 + 110, 200] },
      { text: "← passat mot ekvator", x: 230, y: BAKKE - 36, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [200, BAKKE + 35] },
      /* Kritisk: ingen «vestavind» i 0–30° — øvre strøm østover i høyden */
      {
        text: "Coriolis dreier øvre strøm østover (i høyden)",
        x: 360,
        y: 42,
        anchor: "middle",
        color: F.teal,
        weight: 800,
        size: 12,
        badge: [360, 28],
      },
      { text: "tropopause", x: 100, y: 58, anchor: "start", color: "#7dd3fc", weight: 700, size: 11, badge: [70, 48] },
    ],
    [
      { text: "0° ekvator", x: X0, y: 508, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [55, 508] },
      { text: "30°N", x: X30, y: 508, anchor: "middle", color: SAND, weight: 800, size: 12, badge: [X30 - 45, 508] },
      { text: "ITCZ (L)", x: X0 + 15, y: 468, anchor: "middle", color: LOW, weight: 800, size: 12, badge: [55, 468] },
      { text: "hestebreddegradene (H)", x: X30, y: 468, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [X30 + 90, 468] },
      { text: "nordøstpassaten", x: 230, y: BAKKE - 36, anchor: "middle", color: F.teal, weight: 900, size: 12, badge: [200, BAKKE + 35] },
      { text: "subsidens", x: X30 + 70, y: 210, color: SAND, weight: 800, size: 12, badge: [X30 + 100, 180] },
      { text: "Hadley-cellen", x: 240, y: 255, anchor: "middle", color: F.teal, weight: 900, size: 14, badge: [240, 235] },
      { text: "tropopause", x: 90, y: 58, anchor: "start", color: "#7dd3fc", weight: 700, size: 11, badge: [60, 48] },
    ],
    [
      { text: "0° ekvator", x: X0, y: 508, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [55, 508] },
      { text: "30°N", x: X30, y: 508, anchor: "middle", color: SAND, weight: 800, size: 12, badge: [X30 - 45, 508] },
      { text: "60°N", x: X60, y: 508, anchor: "middle", color: LOW, weight: 800, size: 12, badge: [X60 - 45, 508] },
      { text: "90°N polen", x: X90, y: 508, anchor: "middle", color: F.kald, weight: 800, size: 12, badge: [905, 508] },
      { text: "Ferrel-cellen", x: 480, y: 250, anchor: "middle", color: SAND, weight: 900, size: 14, badge: [480, 230] },
      { text: "Polarcellen", x: 750, y: 280, anchor: "middle", color: F.kald, weight: 900, size: 14, badge: [800, 250] },
      { text: "vestavindsbeltet", x: 480, y: BAKKE - 36, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [480, BAKKE + 35] },
      { text: "polare østavinder", x: 720, y: BAKKE - 36, anchor: "middle", color: F.kald, weight: 800, size: 12, badge: [720, BAKKE + 35] },
      { text: "polarfronten (L)", x: X60, y: 468, anchor: "middle", color: LOW, weight: 800, size: 12, badge: [X60 + 90, 468] },
      { text: "indirekte / direkte", x: 480, y: 42, anchor: "middle", color: F.dempet, weight: 700, size: 12, badge: [480, 28] },
      { text: "tropopause faller mot polen", x: 140, y: 58, anchor: "start", color: "#7dd3fc", weight: 700, size: 11, badge: [90, 48] },
    ],
    [
      { text: "0° ekvator", x: X0, y: 522, anchor: "middle", color: F.varm, weight: 800, size: 11, badge: [55, 522] },
      { text: "30°N", x: X30, y: 522, anchor: "middle", color: SAND, weight: 800, size: 11, badge: [X30 - 40, 522] },
      { text: "60°N", x: X60, y: 522, anchor: "middle", color: LOW, weight: 800, size: 11, badge: [X60 - 40, 522] },
      { text: "90°N polen", x: X90, y: 522, anchor: "middle", color: F.kald, weight: 800, size: 11, badge: [905, 522] },
      /* Hadley klar av ITCZ-sky; cellenavn midt i celle */
      { text: "Hadley", x: 270, y: 250, anchor: "middle", color: F.teal, weight: 900, size: 13, badge: [270, 230] },
      { text: "Ferrel", x: 480, y: 250, anchor: "middle", color: SAND, weight: 900, size: 13, badge: [480, 230] },
      { text: "Polar", x: 720, y: 250, anchor: "middle", color: F.kald, weight: 900, size: 13, badge: [780, 230] },
      /* STJ/PFJ: badge + at klar over tropopause/strøm */
      { text: "STJ", x: X30, y: 36, anchor: "middle", color: SAND, weight: 800, size: 11, at: [X30, 72], badge: [X30 - 90, 28] },
      { text: "PFJ", x: X60, y: 48, anchor: "middle", color: LOW, weight: 800, size: 11, at: [X60, 88], badge: [X60 + 90, 36] },
      { text: "tropopause faller mot polen", x: 160, y: 42, anchor: "start", color: "#7dd3fc", weight: 700, size: 11, badge: [100, 28] },
    ],
  ] as Lab[][],
  keys: [
    { text: "varm / stigende", color: F.varm, kind: "line" },
    { text: "subsidens", color: SAND, kind: "line" },
    { text: "passat / retur", color: F.teal, kind: "line" },
    { text: "polar / kald", color: F.kald, kind: "line" },
  ],
  notes: ["Nordlig halvkuletverrsnitt · skjematisk", "Ingen hastighets- eller temperatur-tall"],
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const mm: M = { ...m, sand: "tc-sand", low: "tc-low", mute: "tc-mute" };
    const maxS = Math.max(s.s1, s.s2, s.s3, s.s4, s.s5);
    const hadleyFocus = s.s3 >= maxS && s.s3 > 0.15;
    const fallende = Math.max(s.s2, s.s3, s.s4, s.s5) >= maxS && maxS > 0.05;
    const sol = s.s1 >= maxS && s.s1 > 0.15;
    return (
      <g>
        <ExtraMarkers />
        {/* Én himmel/bakke/breddegrader/tropopause — ikke per steg */}
        <Bakgrunn full={!hadleyFocus} sol={sol} />
        {hadleyFocus ? <rect x={400} y={70} width={520} height={320} fill="#0b1620" opacity={0.5 * o(s.s3)} /> : null}
        <TropopauseGeo fallende={fallende && !hadleyFocus} />
        {hadleyFocus ? (
          <line x1={60} y1={TOP + 5} x2={X30 + 20} y2={TOP + 5} stroke="#38bdf8" strokeWidth={2} strokeDasharray="6 4" opacity={o(s.s3)} />
        ) : null}
        <BredderLinjer />
        <Steg1 synlig={s.s1} sek={sek} m={mm} />
        <Steg2 synlig={s.s2} sek={sek} m={mm} />
        <Steg3 synlig={s.s3} sek={sek} m={mm} />
        <Steg4 synlig={s.s4} sek={sek} m={mm} />
        <Steg5 synlig={s.s5} sek={sek} m={mm} />
      </g>
    );
  },
};

export const TreCellerFigur = lagFigur(def);
