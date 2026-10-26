/**
 * TreCellerFigur — stegfigur for vindsystemet (én celle → Coriolis → Hadley → Ferrel+Polar → hele NH).
 * Erstatter OneVsThreeCellsDiagram + WindCellsDiagram. Mats godkjente mockup 26.10.2026.
 * Kun nordlig halvkuletverrsnitt. Ingen nye tall. Stil: F-palett / StegFigur.
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
      <marker id="tc-sand" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 1.5 L11 6 L0 10.5 z" fill={SAND} />
      </marker>
      <marker id="tc-low" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 1.5 L11 6 L0 10.5 z" fill={LOW} />
      </marker>
      <marker id="tc-mute" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 1.5 L11 6 L0 10.5 z" fill={MUTE} />
      </marker>
      <linearGradient id="tc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#081018" />
        <stop offset="40%" stopColor="#0f1d29" />
        <stop offset="100%" stopColor="#1a3248" />
      </linearGradient>
      <linearGradient id="tc-ground" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0c4a6e" />
        <stop offset="35%" stopColor="#1a3a2a" />
        <stop offset="70%" stopColor="#1e3a2f" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="tc-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="40%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="tc-dune" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
    </defs>
  );
}

/** Én himmel + bakke — ikke per steg (unngår covered av tc-sky under fade). */
function Bakgrunn({ full = true }: { full?: boolean }) {
  return (
    <g>
      <rect x={0} y={0} width={960} height={540} fill="url(#tc-sky)" />
      <rect x={40} y={BAKKE} width={full ? 880 : 400} height={70} fill="url(#tc-ground)" />
      <line x1={40} y1={BAKKE} x2={full ? 920 : 440} y2={BAKKE} stroke="#334e68" strokeWidth={2.2} />
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
        strokeWidth={1.8}
        strokeDasharray="5 4"
        opacity={0.65}
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
      strokeWidth={1.5}
      strokeDasharray="6 5"
      opacity={0.45}
    />
  );
}

function HoldTekst({ synlig, children }: { synlig: number; children: ReactNode }) {
  if (synlig < HOLD) return null;
  return <g opacity={o(synlig)}>{children}</g>;
}

function ItczSky({ x, sek }: { x: number; sek: number }) {
  const bob = Math.sin(sek * 1.6) * 2;
  return (
    <g>
      <path
        d={`M${x - 45} ${BAKKE} C${x - 55} ${300 + bob}, ${x - 30} ${200}, ${x - 10} ${140 + bob} C${x + 5} ${105}, ${x + 40} ${95}, ${x + 70} ${110} C${x + 95} ${130}, ${x + 100} ${185}, ${x + 80} ${250} C${x + 65} ${330}, ${x + 75} ${370}, ${x + 55} ${BAKKE} Z`}
        fill="url(#tc-cloud)"
        opacity={0.88}
      />
      <ellipse cx={x + 20} cy={110 + bob * 0.5} rx={55} ry={18} fill="#e2e8f0" opacity={0.85} />
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
      <circle cx={x} cy={430} r={14} fill={fill} stroke={stroke} strokeWidth={2} />
      <text x={x} y={435} textAnchor="middle" fontSize={13} fontWeight={900} fill={stroke}>
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
      <ellipse cx={X0} cy={220} rx={32} ry={70} fill="#64748b" opacity={0.5} />
      <ellipse cx={X0} cy={155} rx={42} ry={22} fill="#e2e8f0" opacity={0.72} />
      <path
        d={`M${X0} ${BAKKE - 15} C${X0} 220, ${X0} 130, ${X0} 115`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "14 10" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X0 + 12} 108 C${X30} 85, ${X60} 100, ${X90 - 15} 128`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "14 10" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X90} 140 L${X90} ${BAKKE - 15}`}
        fill="none"
        stroke={F.kald}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "14 10" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
      <path
        d={`M${X90 - 15} ${BAKKE - 8} C${X60} ${BAKKE - 8}, ${X30} ${BAKKE - 8}, ${X0 + 18} ${BAKKE - 8}`}
        fill="none"
        stroke={F.teal}
        strokeWidth={3.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "14 10" : undefined}
        markerEnd={`url(#${m.teal})`}
      />
      <HoldTekst synlig={synlig}>
        <text x={X0 - 48} y={210} textAnchor="middle" fontSize={12} fontWeight={800} fill="#fca5a5">
          oppdrift
        </text>
        <text x={620} y={100} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.varm}>
          øvre strøm mot polen
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

/** Steg 2: Coriolis bryter — pile-up ved 30° */
function Steg2({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  if (synlig < 0.02) return null;
  const pulse = 0.85 + 0.15 * Math.sin(sek * 2.4);
  return (
    <g opacity={o(synlig)}>
      <ellipse cx={X0} cy={175} rx={38} ry={78} fill="#64748b" opacity={0.38} />
      <ellipse cx={X0} cy={118} rx={45} ry={20} fill="#e2e8f0" opacity={0.68} />
      <path d={`M${X0} ${BAKKE - 15} L${X0} 115`} fill="none" stroke={F.varm} strokeWidth={4} markerEnd={`url(#${m.warm})`} />
      <path
        d={`M${X0 + 12} 108 C${X0 + 90} 95, ${X30 - 40} 98, ${X30 - 8} 112`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.5}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X30 + 8} 115 C${X30 + 100} 108, ${X60 - 40} 118, ${X60 + 60} 132`}
        fill="none"
        stroke={MUTE}
        strokeWidth={2.2}
        strokeDasharray="8 7"
        opacity={0.55}
        markerEnd={`url(#${m.mute})`}
      />
      <path d={`M${X30} 122 L${X30} ${BAKKE - 20}`} fill="none" stroke={SAND} strokeWidth={4.5} markerEnd={`url(#${m.sand})`} />
      <circle cx={X30} cy={240} r={r1(36 * pulse)} fill="#451a03" fillOpacity={0.45} stroke={SAND} strokeWidth={2} />
      <path
        d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 18} ${BAKKE - 8}`}
        fill="none"
        stroke={F.teal}
        strokeWidth={3.2}
        markerEnd={`url(#${m.teal})`}
      />
      <path d={`M${X90 - 30} 90 Q${X90} 75 ${X90 + 30} 90`} fill="none" stroke={SAND} strokeWidth={2.2} markerEnd={`url(#${m.sand})`} />
      <HoldTekst synlig={synlig}>
        <text x={560} y={95} fontSize={12} fontWeight={700} fill={MUTE}>
          kan ikke nå polen
        </text>
        <text x={X90} y={68} textAnchor="middle" fontSize={12} fontWeight={800} fill={SAND}>
          jorda roterer (Ω)
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
      {synlig >= HOLD ? <ItczSky x={X0 + 20} sek={sek} /> : null}
      <g stroke="#7dd3fc" strokeWidth={2} strokeDasharray="4 3">
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={X0 - 10 + i * 16}
            y1={r1(360 + ((drip + i) % 5))}
            x2={X0 - 18 + i * 16}
            y2={BAKKE - 2}
          />
        ))}
      </g>
      <path
        d={`M${X0 + 15} ${BAKKE - 15} L${X0 + 15} 108`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X0 + 80} 95 L${X30 - 8} 95`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X30} 108 L${X30} ${BAKKE - 15}`}
        fill="none"
        stroke={SAND}
        strokeWidth={4.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.sand})`}
      />
      <path
        d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 55} ${BAKKE - 8}`}
        fill="none"
        stroke={F.teal}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.teal})`}
      />
      <TrykkMerke x={X0 + 15} kind="L" synlig={synlig} />
      <TrykkMerke x={X30} kind="H" synlig={synlig} />
      <HoldTekst synlig={synlig}>
        <text x={680} y={230} textAnchor="middle" fontSize={14} fontWeight={700} fill="#4b6275">
          Ferrel og Polar · neste steg
        </text>
        <text x={X0 - 36} y={340} textAnchor="middle" fontSize={12} fontWeight={700} fill="#7dd3fc">
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
      <g opacity={0.35}>
        <path d={`M${X0} ${BAKKE - 15} L${X0} 108`} fill="none" stroke={F.varm} strokeWidth={2.8} markerEnd={`url(#${m.warm})`} />
        <path d={`M${X0 + 15} 98 L${X30 - 15} 98`} fill="none" stroke={F.varm} strokeWidth={2.8} markerEnd={`url(#${m.warm})`} />
        <path d={`M${X30} 112 L${X30} ${BAKKE - 15}`} fill="none" stroke={SAND} strokeWidth={2.8} markerEnd={`url(#${m.sand})`} />
        <path d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 18} ${BAKKE - 8}`} fill="none" stroke={F.teal} strokeWidth={2.8} markerEnd={`url(#${m.teal})`} />
      </g>
      <path
        d={`M${X30 + 22} ${BAKKE - 8} L${X60 - 22} ${BAKKE - 8}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X60} ${BAKKE - 15} L${X60} 132`}
        fill="none"
        stroke={LOW}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.low})`}
      />
      <path
        d={`M${X60 - 22} 125 L${X30 + 22} 125`}
        fill="none"
        stroke={MUTE}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.mute})`}
      />
      <path
        d={`M${X60 + 22} 150 L${X90 - 22} 150`}
        fill="none"
        stroke={F.kald}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
      <path
        d={`M${X90} 162 L${X90} ${BAKKE - 15}`}
        fill="none"
        stroke={F.kald}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
      <path
        d={`M${X90 - 22} ${BAKKE - 8} L${X60 + 22} ${BAKKE - 8}`}
        fill="none"
        stroke={F.kald}
        strokeWidth={3.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
      <TrykkMerke x={X60} kind="L" synlig={synlig} />
      <TrykkMerke x={X90} kind="H" synlig={synlig} />
      {synlig >= HOLD ? (
        <g opacity={0.7} aria-hidden="true">
          <circle cx={X30} cy={430} r={12} fill="#0f2b32" stroke={F.teal} strokeWidth={1.5} />
          <text x={X30} y={434} textAnchor="middle" fontSize={11} fontWeight={900} fill={F.teal}>
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
        d={`M${X0} ${BAKKE - 20} L${X0} 105`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X0 + 15} 95 L${X30 - 15} 95`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X30} 108 L${X30} ${BAKKE - 20}`}
        fill="none"
        stroke={SAND}
        strokeWidth={3.4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.sand})`}
      />
      <path
        d={`M${X30 - 22} ${BAKKE - 12} L${X0 + 18} ${BAKKE - 12}`}
        fill="none"
        stroke={F.teal}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.teal})`}
      />
      <path
        d={`M${X30 + 22} ${BAKKE - 12} L${X60 - 22} ${BAKKE - 12}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M${X60} ${BAKKE - 20} L${X60} 125`}
        fill="none"
        stroke={LOW}
        strokeWidth={3.4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.low})`}
      />
      <path
        d={`M${X60 - 22} 118 L${X30 + 22} 118`}
        fill="none"
        stroke={MUTE}
        strokeWidth={2.8}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.mute})`}
      />
      <path
        d={`M${X60 + 22} 145 L${X90 - 22} 145`}
        fill="none"
        stroke={F.kald}
        strokeWidth={2.8}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
      <path
        d={`M${X90} 155 L${X90} ${BAKKE - 20}`}
        fill="none"
        stroke={F.kald}
        strokeWidth={3.4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
      <path
        d={`M${X90 - 22} ${BAKKE - 12} L${X60 + 22} ${BAKKE - 12}`}
        fill="none"
        stroke={F.kald}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "10 8" : undefined}
        markerEnd={`url(#${m.cold})`}
      />
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
      "Fem steg. Steg 1: Hadleys ene celle uten rotasjon. Steg 2: Coriolis dreier øvre strøm nær 30° — lufta hoper seg opp og synker. Steg 3: Hadley-cellen med ITCZ, subsidens og nordøstpassat. Steg 4: Ferrel (indirekte) og Polar (direkte). Steg 5: hele systemet med trykkbelter og STJ/PFJ. Kun nordlig halvkuletverrsnitt. Ingen hastighets- eller temperatur-tall.",
    caption:
      "Skjematisk tverrsnitt · nordlig halvkule. Hadley og Polar er termisk direkte; Ferrel er indirekte (virvler). Ingen nye tall. STJ/PFJ er jetkjerner i tropopausebrudd — full jetforklaring i jetkapitlet.",
  },
  faser: ["Én celle", "Coriolis bryter", "Hadley-cellen", "Ferrel og Polar", "Hele systemet"],
  status: [
    "Varm luft stiger ved ekvator, går mot polen i høyden, synker, og vender tilbake langs bakken.",
    "Luft mot polen i høyden dreies og blir vestavind nær 30°. Den hoper seg opp og synker — én sløyfe til polen går ikke.",
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
      { text: "hoper seg opp", x: X30 + 95, y: 248, anchor: "start", color: SAND, weight: 800, size: 13, at: [X30, 240], badge: [X30 + 110, 200] },
      { text: "passat mot ekvator", x: 230, y: BAKKE - 36, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [200, BAKKE + 35] },
      { text: "Coriolis → vestavind", x: 360, y: 42, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [360, 28] },
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
      /* Hadley klar av ITCZ-sky (#tc-cloud); cellenavn midt i celle ikke i skyen */
      { text: "Hadley", x: 270, y: 250, anchor: "middle", color: F.teal, weight: 900, size: 13, badge: [270, 230] },
      { text: "Ferrel", x: 480, y: 250, anchor: "middle", color: SAND, weight: 900, size: 13, badge: [480, 230] },
      { text: "Polar", x: 720, y: 250, anchor: "middle", color: F.kald, weight: 900, size: 13, badge: [780, 230] },
      /* STJ/PFJ: badge + at klar over tropopause/strøm (unngår stroke «8» på path) */
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
    const fallende = s.s4 >= maxS || s.s5 >= maxS;
    return (
      <g>
        <ExtraMarkers />
        {/* Én himmel/bakke/breddegrader/tropopause — ikke per steg */}
        <Bakgrunn full={!hadleyFocus} />
        {hadleyFocus ? <rect x={400} y={70} width={520} height={320} fill="#0b1620" opacity={0.45 * o(s.s3)} /> : null}
        <TropopauseGeo fallende={fallende && !hadleyFocus} />
        {hadleyFocus ? (
          <line x1={60} y1={TOP + 5} x2={X30 + 20} y2={TOP + 5} stroke="#38bdf8" strokeWidth={1.8} strokeDasharray="6 4" opacity={o(s.s3)} />
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
