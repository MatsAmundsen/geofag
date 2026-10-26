/**
 * TreCellerFigur — stegfigur for vindsystemet (én celle → Coriolis → Hadley → Ferrel+Polar → hele NH).
 * Erstatter OneVsThreeCellsDiagram + WindCellsDiagram. Mats godkjente mockup 26.10.2026.
 * Kun nordlig halvkuletverrsnitt. Ingen nye tall. Stil: F-palett / StegFigur.
 * Pilretninger: Geo-sjekk før merge (Hadley/Ferrel/Polar).
 */
import { type Def, type Lab, type Markers } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { F, VB } from "./vaerkatastrofer-kit";

const o = (v: number) => r1(Math.max(0, Math.min(1, v)) * 100) / 100;

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

function Bakgrunn({ full = true }: { full?: boolean }) {
  return (
    <g>
      <rect x={0} y={0} width={960} height={540} fill="url(#tc-sky)" />
      <rect x={40} y={BAKKE} width={full ? 880 : 400} height={70} fill="url(#tc-ground)" />
      <line x1={40} y1={BAKKE} x2={full ? 920 : 440} y2={BAKKE} stroke="#334e68" strokeWidth={2.2} />
    </g>
  );
}

function Bredder({ highlight }: { highlight?: "30" | "60" | "all" }) {
  const c = (key: "0" | "30" | "60" | "90") => {
    if (key === "0") return F.varm;
    if (key === "30") return highlight === "30" || highlight === "all" ? SAND : F.dempet;
    if (key === "60") return highlight === "60" || highlight === "all" ? LOW : F.dempet;
    return F.kald;
  };
  return (
    <g>
      <g stroke="#334155" strokeDasharray="3 4" opacity={0.4}>
        <line x1={X0} y1={TOP} x2={X0} y2={BAKKE} />
        <line x1={X30} y1={TOP} x2={X30} y2={BAKKE} />
        <line x1={X60} y1={TOP} x2={X60} y2={BAKKE} />
        <line x1={X90} y1={TOP} x2={X90} y2={BAKKE} />
      </g>
      <text x={X0} y={418} textAnchor="middle" fontSize={13} fontWeight={800} fill={c("0")}>
        0° ekvator
      </text>
      <text x={X30} y={418} textAnchor="middle" fontSize={13} fontWeight={800} fill={c("30")}>
        30°N
      </text>
      <text x={X60} y={418} textAnchor="middle" fontSize={13} fontWeight={800} fill={c("60")}>
        60°N
      </text>
      <text x={X90} y={418} textAnchor="middle" fontSize={13} fontWeight={800} fill={c("90")}>
        90°N polen
      </text>
    </g>
  );
}

function Tropopause({ fallende }: { fallende?: boolean }) {
  if (fallende) {
    return (
      <g>
        <path
          d={`M60 ${TOP + 5} L${X30} ${TOP + 5} Q${X30 + 22} ${TOP + 5} ${X30 + 30} ${TOP + 35} L${X60} ${TOP + 35} Q${X60 + 22} ${TOP + 35} ${X60 + 30} ${TOP + 65} L${X90 + 20} ${TOP + 65}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth={1.8}
          strokeDasharray="5 4"
          opacity={0.65}
        />
        <text x={70} y={TOP - 2} fontSize={11} fontWeight={700} fill="#7dd3fc">
          tropopause faller mot polen
        </text>
      </g>
    );
  }
  return (
    <g>
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
      <text x={70} y={TOP} fontSize={11} fontWeight={700} fill="#7dd3fc">
        tropopause (forenklet)
      </text>
    </g>
  );
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
  label,
  synlig,
}: {
  x: number;
  kind: "L" | "H";
  label: string;
  synlig: number;
}) {
  if (synlig < 0.85) return null;
  const stroke = kind === "L" ? LOW : F.teal;
  const fill = kind === "L" ? "#3b151b" : "#0f2b32";
  return (
    <g opacity={o(synlig)}>
      <circle cx={x} cy={430} r={14} fill={fill} stroke={stroke} strokeWidth={2} />
      <text x={x} y={435} textAnchor="middle" fontSize={13} fontWeight={900} fill={stroke}>
        {kind}
      </text>
      <text x={x} y={458} textAnchor="middle" fontSize={11} fontWeight={700} fill={kind === "L" ? "#fca5a5" : F.teal}>
        {label}
      </text>
    </g>
  );
}

/** Steg 1: én lukket sløyfe 0→90°N */
function Steg1({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  const dash = synlig > 0.5 && sek > 0 ? (sek * 18) % 40 : 0;
  return (
    <g opacity={o(synlig)}>
      <Bakgrunn />
      <Tropopause />
      <Bredder />
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
      <text x={X0} y={195} textAnchor="middle" fontSize={12} fontWeight={800} fill="#fca5a5">
        oppdrift
      </text>
      <text x={480} y={78} textAnchor="middle" fontSize={13} fontWeight={800} fill={F.varm}>
        øvre strøm hele veien til polen
      </text>
      <text x={480} y={BAKKE - 18} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.teal}>
        retur langs bakken
      </text>
      <text x={X90 + 18} y={260} fontSize={12} fontWeight={800} fill={F.kald}>
        synker
      </text>
      {synlig >= 0.9 ? (
        <g opacity={o(synlig)}>
          <rect x={300} y={235} width={360} height={58} rx={8} fill="#1c1417" stroke="#4a1820" strokeWidth={1.4} />
          <text x={480} y={258} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fca5a5">
            Hadley 1735 · én celle uten rotasjon
          </text>
          <text x={480} y={278} textAnchor="middle" fontSize={12} fontWeight={600} fill={F.tekst}>
            Fungerer bare hvis jorda sto stille.
          </text>
        </g>
      ) : null}
    </g>
  );
}

/** Steg 2: Coriolis bryter — pile-up ved 30° */
function Steg2({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  const pulse = 0.85 + 0.15 * Math.sin(sek * 2.4);
  return (
    <g opacity={o(synlig)}>
      <Bakgrunn />
      <Tropopause />
      <Bredder highlight="30" />
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
      <text x={520} y={100} fontSize={12} fontWeight={700} fill={MUTE}>
        kan ikke nå polen
      </text>
      <path d={`M${X30} 122 L${X30} ${BAKKE - 20}`} fill="none" stroke={SAND} strokeWidth={4.5} markerEnd={`url(#${m.sand})`} />
      <circle cx={X30} cy={240} r={r1(36 * pulse)} fill="#451a03" fillOpacity={0.45} stroke={SAND} strokeWidth={2} />
      <text x={X30} y={236} textAnchor="middle" fontSize={12} fontWeight={900} fill="#fde68a">
        hoper
      </text>
      <text x={X30} y={252} textAnchor="middle" fontSize={12} fontWeight={900} fill="#fde68a">
        seg opp
      </text>
      {synlig >= 0.9 ? (
        <g opacity={o(synlig)}>
          <rect x={210} y={55} width={300} height={36} rx={7} fill="#122433" stroke={F.teal} strokeWidth={1.4} />
          <text x={360} y={78} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.teal}>
            Coriolis dreier øvre strøm → vestavind nær 30°
          </text>
        </g>
      ) : null}
      <path
        d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 18} ${BAKKE - 8}`}
        fill="none"
        stroke={F.teal}
        strokeWidth={3.2}
        markerEnd={`url(#${m.teal})`}
      />
      <text x={230} y={BAKKE - 18} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.teal}>
        passat mot ekvator
      </text>
      <text x={X90} y={78} textAnchor="middle" fontSize={12} fontWeight={800} fill={SAND}>
        jorda roterer (Ω)
      </text>
      <path d={`M${X90 - 30} 90 Q${X90} 75 ${X90 + 30} 90`} fill="none" stroke={SAND} strokeWidth={2.2} markerEnd={`url(#${m.sand})`} />
    </g>
  );
}

/** Steg 3: Hadley-fokus 0–30° */
function Steg3({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  const drip = (sek * 14) % 8;
  const dash = sek > 0 ? (sek * 16) % 36 : 0;
  return (
    <g opacity={o(synlig)}>
      <Bakgrunn full={false} />
      <rect x={400} y={70} width={520} height={320} fill="#0b1620" opacity={0.45} />
      <text x={680} y={230} textAnchor="middle" fontSize={14} fontWeight={700} fill="#4b6275">
        Ferrel og Polar · neste steg
      </text>
      <path d={`M${X30} ${BAKKE} Q${X30 + 60} 368 ${X30 + 120} ${BAKKE} L${X30 + 120} 460 L${X30} 460 Z`} fill="url(#tc-dune)" />
      <line x1={60} y1={TOP + 5} x2={X30 + 20} y2={TOP + 5} stroke="#38bdf8" strokeWidth={1.8} strokeDasharray="6 4" />
      <text x={70} y={TOP - 5} fontSize={11} fontWeight={700} fill="#7dd3fc">
        tropopause ~16 km
      </text>
      <ItczSky x={X0 + 20} sek={sek} />
      <g stroke="#7dd3fc" strokeWidth={2} strokeDasharray="4 3">
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={X0 - 10 + i * 16}
            y1={r1(360 + (drip + i) % 5)}
            x2={X0 - 18 + i * 16}
            y2={BAKKE - 2}
          />
        ))}
      </g>
      <text x={X0 + 20} y={350} textAnchor="middle" fontSize={12} fontWeight={700} fill="#7dd3fc">
        regn
      </text>
      <path
        d={`M${X0 + 15} ${BAKKE - 15} L${X0 + 15} 108`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <text x={X0 + 42} y={230} fontSize={12} fontWeight={800} fill={F.varm}>
        stiger
      </text>
      <path
        d={`M${X0 + 80} 95 L${X30 - 8} 95`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <text x={230} y={82} textAnchor="middle" fontSize={12} fontWeight={800} fill={F.varm}>
        tørr luft polover
      </text>
      <path
        d={`M${X30} 108 L${X30} ${BAKKE - 15}`}
        fill="none"
        stroke={SAND}
        strokeWidth={4.5}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.sand})`}
      />
      <text x={X30 + 35} y={230} fontSize={12} fontWeight={800} fill={SAND}>
        subsidens
      </text>
      <path
        d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 55} ${BAKKE - 8}`}
        fill="none"
        stroke={F.teal}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.teal})`}
      />
      <text x={230} y={BAKKE - 18} textAnchor="middle" fontSize={13} fontWeight={900} fill={F.teal}>
        ← nordøstpassaten
      </text>
      <TrykkMerke x={X0 + 15} kind="L" label="ITCZ" synlig={synlig} />
      <TrykkMerke x={X30} kind="H" label="hestebreddegradene" synlig={synlig} />
      <text x={X0 + 15} y={58} textAnchor="middle" fontSize={15} fontWeight={900} fill="#fca5a5">
        ITCZ (0°)
      </text>
      <text x={X30 + 50} y={58} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fde68a">
        ørken ~30°N
      </text>
      <text x={240} y={275} textAnchor="middle" fontSize={18} fontWeight={900} fill={F.teal}>
        HADLEY-CELLEN
      </text>
      <text x={240} y={298} textAnchor="middle" fontSize={12} fontWeight={600} fill={F.dempet}>
        termisk direkte · 0°–30°N
      </text>
    </g>
  );
}

/** Steg 4: Ferrel + Polar, Hadley dimmet */
function Steg4({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  const dash = sek > 0 ? (sek * 14) % 32 : 0;
  return (
    <g opacity={o(synlig)}>
      <Bakgrunn />
      <Tropopause fallende />
      <Bredder highlight="all" />
      <g opacity={0.35}>
        <path d={`M${X0} ${BAKKE - 15} L${X0} 108`} fill="none" stroke={F.varm} strokeWidth={2.8} markerEnd={`url(#${m.warm})`} />
        <path d={`M${X0 + 15} 98 L${X30 - 15} 98`} fill="none" stroke={F.varm} strokeWidth={2.8} markerEnd={`url(#${m.warm})`} />
        <path d={`M${X30} 112 L${X30} ${BAKKE - 15}`} fill="none" stroke={SAND} strokeWidth={2.8} markerEnd={`url(#${m.sand})`} />
        <path d={`M${X30 - 22} ${BAKKE - 8} L${X0 + 18} ${BAKKE - 8}`} fill="none" stroke={F.teal} strokeWidth={2.8} markerEnd={`url(#${m.teal})`} />
        <text x={230} y={230} textAnchor="middle" fontSize={13} fontWeight={800} fill={F.teal}>
          Hadley
        </text>
      </g>
      {/* Ferrel: bakke vestavind →, opp 60, øvre retur ← */}
      <path
        d={`M${X30 + 22} ${BAKKE - 8} L${X60 - 22} ${BAKKE - 8}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.warm})`}
      />
      <text x={480} y={BAKKE - 18} textAnchor="middle" fontSize={12} fontWeight={900} fill={F.varm}>
        vestavindsbeltet →
      </text>
      <path
        d={`M${X60} ${BAKKE - 15} L${X60} 132`}
        fill="none"
        stroke={LOW}
        strokeWidth={4}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.low})`}
      />
      <text x={X60 + 35} y={245} fontSize={12} fontWeight={800} fill={LOW}>
        stiger
      </text>
      <path
        d={`M${X60 - 22} 125 L${X30 + 22} 125`}
        fill="none"
        stroke={MUTE}
        strokeWidth={3.2}
        strokeDashoffset={-dash}
        strokeDasharray={sek > 0 ? "12 8" : undefined}
        markerEnd={`url(#${m.mute})`}
      />
      <text x={480} y={115} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTE}>
        øvre retur
      </text>
      <text x={480} y={215} textAnchor="middle" fontSize={17} fontWeight={900} fill={SAND}>
        FERREL-CELLEN
      </text>
      <text x={480} y={235} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fde68a">
        termisk indirekte · drevet av virvler
      </text>
      {/* Polar */}
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
      <text x={720} y={BAKKE - 18} textAnchor="middle" fontSize={12} fontWeight={900} fill={F.kald}>
        ← polare østavinder
      </text>
      <text x={720} y={230} textAnchor="middle" fontSize={17} fontWeight={900} fill={F.kald}>
        POLARCELLEN
      </text>
      <text x={720} y={250} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        termisk direkte · 60°–90°N
      </text>
      <text x={X90 + 18} y={265} fontSize={12} fontWeight={800} fill={F.kald}>
        synker
      </text>
      <TrykkMerke x={X60} kind="L" label="polarfronten" synlig={synlig} />
      <TrykkMerke x={X90} kind="H" label="polarhøytrykk" synlig={synlig} />
      <g opacity={0.7}>
        <circle cx={X30} cy={430} r={12} fill="#0f2b32" stroke={F.teal} strokeWidth={1.5} />
        <text x={X30} y={434} textAnchor="middle" fontSize={11} fontWeight={900} fill={F.teal}>
          H
        </text>
      </g>
    </g>
  );
}

/** Steg 5: hele NH med STJ/PFJ */
function Steg5({ synlig, sek, m }: { synlig: number; sek: number; m: M }) {
  const dash = sek > 0 ? (sek * 10) % 28 : 0;
  return (
    <g opacity={o(synlig)}>
      <Bakgrunn />
      <Tropopause fallende />
      <Bredder highlight="all" />
      <ItczSky x={X0 + 10} sek={sek} />
      {/* Hadley */}
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
      <text x={230} y={195} textAnchor="middle" fontSize={14} fontWeight={900} fill={F.teal}>
        HADLEY
      </text>
      <text x={230} y={212} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        0°–30°N
      </text>
      <text x={230} y={BAKKE - 22} textAnchor="middle" fontSize={11} fontWeight={800} fill={F.teal}>
        ← passat
      </text>
      {/* Ferrel */}
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
      <text x={480} y={195} textAnchor="middle" fontSize={14} fontWeight={900} fill={SAND}>
        FERREL
      </text>
      <text x={480} y={212} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        30°–60°N · indirekte
      </text>
      <text x={480} y={BAKKE - 22} textAnchor="middle" fontSize={11} fontWeight={800} fill={F.varm}>
        vestavind →
      </text>
      {/* Polar */}
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
      <text x={720} y={195} textAnchor="middle" fontSize={14} fontWeight={900} fill={F.kald}>
        POLAR
      </text>
      <text x={720} y={212} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        60°–90°N
      </text>
      <text x={720} y={BAKKE - 22} textAnchor="middle" fontSize={11} fontWeight={800} fill={F.kald}>
        ← østavind
      </text>
      {/* STJ / PFJ */}
      <g transform={`translate(${X30}, 98)`}>
        <circle r={10} fill="#451a03" stroke={SAND} strokeWidth={1.6} />
        <line x1={-4} y1={-4} x2={4} y2={4} stroke={SAND} strokeWidth={1.6} />
        <line x1={4} y1={-4} x2={-4} y2={4} stroke={SAND} strokeWidth={1.6} />
        <text y={-14} textAnchor="middle" fontSize={11} fontWeight={800} fill={SAND}>
          STJ
        </text>
      </g>
      <g transform={`translate(${X60}, 118)`}>
        <circle r={10} fill="#450a0a" stroke={LOW} strokeWidth={1.6} />
        <line x1={-4} y1={-4} x2={4} y2={4} stroke={LOW} strokeWidth={1.6} />
        <line x1={4} y1={-4} x2={-4} y2={4} stroke={LOW} strokeWidth={1.6} />
        <text y={-14} textAnchor="middle" fontSize={11} fontWeight={800} fill={LOW}>
          PFJ
        </text>
      </g>
      <TrykkMerke x={X0} kind="L" label="0° ITCZ" synlig={synlig} />
      <TrykkMerke x={X30} kind="H" label="30° subtropisk" synlig={synlig} />
      <TrykkMerke x={X60} kind="L" label="60° polarfront" synlig={synlig} />
      <TrykkMerke x={X90} kind="H" label="90° polar" synlig={synlig} />
      <text x={X0} y={475} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        regnskog
      </text>
      <text x={X30} y={475} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        ørken
      </text>
      <text x={X60} y={475} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        Norge
      </text>
      <text x={X90} y={475} textAnchor="middle" fontSize={11} fontWeight={600} fill={F.dempet}>
        Arktis
      </text>
      <text x={940} y={36} textAnchor="end" fontSize={11} fontWeight={600} fill={F.dempet}>
        STJ/PFJ = jet i tropopausebrudd
      </text>
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
      { text: "0° ekvator", x: X0, y: 430, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [X0, 445] },
      { text: "90°N polen", x: X90, y: 430, anchor: "middle", color: F.kald, weight: 800, size: 12, badge: [X90, 445] },
      { text: "én celle uten rotasjon", x: 480, y: 55, anchor: "middle", color: F.tekst, weight: 700, size: 13, badge: [480, 48] },
    ],
    [
      { text: "hoper seg opp", x: X30, y: 200, anchor: "middle", color: SAND, weight: 800, size: 13, at: [X30, 240], badge: [X30, 175] },
      { text: "passat mot ekvator", x: 230, y: BAKKE - 30, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [230, BAKKE + 20] },
      { text: "Coriolis → vestavind", x: 360, y: 55, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [360, 48] },
    ],
    [
      { text: "ITCZ (L)", x: X0 + 15, y: 445, anchor: "middle", color: LOW, weight: 800, size: 12, badge: [X0 + 15, 470] },
      { text: "hestebreddegradene (H)", x: X30, y: 445, anchor: "middle", color: F.teal, weight: 800, size: 12, badge: [X30, 470] },
      { text: "nordøstpassaten", x: 230, y: BAKKE - 30, anchor: "middle", color: F.teal, weight: 900, size: 12, badge: [230, BAKKE + 25] },
      { text: "subsidens", x: X30 + 50, y: 220, color: SAND, weight: 800, size: 12, badge: [X30 + 80, 200] },
      { text: "Hadley-cellen", x: 240, y: 260, anchor: "middle", color: F.teal, weight: 900, size: 14, badge: [240, 250] },
    ],
    [
      { text: "Ferrel-cellen", x: 480, y: 200, anchor: "middle", color: SAND, weight: 900, size: 14, badge: [480, 185] },
      { text: "Polarcellen", x: 720, y: 215, anchor: "middle", color: F.kald, weight: 900, size: 14, badge: [720, 200] },
      { text: "vestavindsbeltet", x: 480, y: BAKKE - 30, anchor: "middle", color: F.varm, weight: 800, size: 12, badge: [480, BAKKE + 20] },
      { text: "polare østavinder", x: 720, y: BAKKE - 30, anchor: "middle", color: F.kald, weight: 800, size: 12, badge: [720, BAKKE + 20] },
      { text: "polarfronten (L)", x: X60, y: 445, anchor: "middle", color: LOW, weight: 800, size: 12, badge: [X60, 470] },
      { text: "indirekte / direkte", x: 480, y: 55, anchor: "middle", color: F.dempet, weight: 700, size: 12, badge: [480, 48] },
    ],
    [
      { text: "Hadley", x: 230, y: 180, anchor: "middle", color: F.teal, weight: 900, size: 13, badge: [230, 165] },
      { text: "Ferrel", x: 480, y: 180, anchor: "middle", color: SAND, weight: 900, size: 13, badge: [480, 165] },
      { text: "Polar", x: 720, y: 180, anchor: "middle", color: F.kald, weight: 900, size: 13, badge: [720, 165] },
      { text: "STJ", x: X30, y: 70, anchor: "middle", color: SAND, weight: 800, size: 11, at: [X30, 98], badge: [X30, 60] },
      { text: "PFJ", x: X60, y: 90, anchor: "middle", color: LOW, weight: 800, size: 11, at: [X60, 118], badge: [X60, 78] },
      { text: "passat · vestavind · østavind", x: 480, y: BAKKE + 35, anchor: "middle", color: F.dempet, weight: 700, size: 12, badge: [480, BAKKE + 50] },
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
    return (
      <g>
        <ExtraMarkers />
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
