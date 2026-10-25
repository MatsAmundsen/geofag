/**
 * Kaldfront- og varmfront-stegfigurer for værkart (Luftmasser og fronter).
 * Erstatter FrontProfile / FrontVerticalProfileDiagram. Mats godkjente stil + 3+3 steg
 * og «erstatt FrontProfile» 25.10.2026. Okklusjon kommer senere.
 * Ingen skynavn, ingen °C, ingen helningstall. Tekst fra vaerkart.md.
 * Stil: F-palett / StegFigur som AtmosfaeriskElvDannelseFigur.
 */
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { F, VB } from "./vaerkatastrofer-kit";

const o = (v: number) => r1(Math.max(0, Math.min(1, v)) * 100) / 100;

const BAKKE_Y = 390;
const TOP_Y = 105;

type Bilde = { s1: number; s2: number; s3: number };

function Bakke() {
  return (
    <g>
      <rect x={0} y={BAKKE_Y} width={960} height={150} fill="#0f2418" />
      <rect x={0} y={BAKKE_Y} width={960} height={22} fill="#1a3a2a" />
      <path
        d="M0 390 Q150 381 300 390 T600 390 T900 390 L960 390 L960 405 L0 405 Z"
        fill="#245038"
        opacity={0.55}
      />
      <text x={60} y={416} fontSize={12} fontWeight={700} fill="#86efac">
        bakken
      </text>
    </g>
  );
}

function Overdrevet() {
  return (
    <text x={940} y={36} textAnchor="end" fontSize={11} fontWeight={600} fill={F.dempet}>
      Høyden er sterkt overdrevet
    </text>
  );
}

/** Skjules under midt-fade (synlig < 0,85) så ulik tekst ikke overlapper. Én label-streng. */
function OstPil({
  x,
  y,
  m,
  synlig,
}: {
  x: number;
  y: number;
  m: { teal: string };
  synlig: number;
}) {
  if (synlig < 0.85) return null;
  return (
    <g transform={`translate(${x},${y})`} opacity={o(synlig)}>
      <path d="M0 0 L120 0" stroke={F.teal} strokeWidth={2.8} markerEnd={`url(#${m.teal})`} />
      <text x={60} y={20} textAnchor="middle" fontSize={11} fontWeight={700} fill={F.teal}>
        oftest mot øst
      </text>
    </g>
  );
}

/* ---------- KALDFRONT ---------- */

function KaldSteg1({ synlig }: { synlig: number; sek: number }) {
  return (
    <g opacity={o(synlig)}>
      <rect x={0} y={60} width={480} height={330} fill={F.kald} opacity={0.28} />
      <rect x={480} y={60} width={480} height={330} fill={F.varm} opacity={0.22} />
      <line x1={480} y1={75} x2={480} y2={382} stroke={F.dempet} strokeWidth={1.5} strokeDasharray="6 5" opacity={0.55} />
      <g fill={F.kald} opacity={0.35}>
        {[
          [135, 165],
          [210, 225],
          [285, 135],
          [360, 262],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2} />
        ))}
      </g>
      <g fill={F.varm} opacity={0.35}>
        {[
          [585, 150],
          [675, 210],
          [750, 120],
          [825, 255],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2} />
        ))}
      </g>
    </g>
  );
}

function KaldSteg2({ synlig, sek, m }: { synlig: number; sek: number; m: { cold: string; warm: string; teal: string } }) {
  const bob = Math.sin(sek * 1.8) * 3;
  return (
    <g opacity={o(synlig)}>
      <defs>
        <linearGradient id="kf-kald" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={F.kald} stopOpacity={0.42} />
          <stop offset="100%" stopColor="#0284c7" stopOpacity={0.08} />
        </linearGradient>
        <linearGradient id="kf-varm" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={F.varm} stopOpacity={0.34} />
          <stop offset="100%" stopColor="#ea580c" stopOpacity={0.06} />
        </linearGradient>
      </defs>
      {/* bratt kaldkile: bakke x=390 → topp x=210 */}
      <polygon points={`0,${BAKKE_Y} 390,${BAKKE_Y} 210,${TOP_Y} 0,${TOP_Y}`} fill="url(#kf-kald)" />
      <polygon points={`390,${BAKKE_Y} 960,${BAKKE_Y} 960,${TOP_Y} 210,${TOP_Y}`} fill="url(#kf-varm)" />
      <line x1={390} y1={BAKKE_Y} x2={210} y2={TOP_Y} stroke={F.kald} strokeWidth={4} strokeLinecap="round" />
      <g fill={F.kald}>
        {[
          [360, 341],
          [322, 281],
          [285, 221],
          [247, 161],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} L${x + 22} ${y - 5} L${x + 9} ${y + 25} Z`} />
        ))}
      </g>
      {/* kald skyver */}
      <path d={`M90 ${360 + bob * 0.2} L210 ${360 + bob * 0.2}`} stroke={F.kald} strokeWidth={3} markerEnd={`url(#${m.cold})`} />
      <path d={`M105 ${338 + bob * 0.15} L225 ${338 + bob * 0.15}`} stroke={F.kald} strokeWidth={2.2} opacity={0.7} markerEnd={`url(#${m.cold})`} />
      {/* varm løftes bratt */}
      <path
        d={`M420 ${360 + bob} Q390 300 352 225 Q315 158 285 ${120 + bob * 0.5}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.2}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M450 ${368 + bob} Q412 308 375 232 Q338 165 308 ${131 + bob * 0.5}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={2.4}
        opacity={0.65}
        markerEnd={`url(#${m.warm})`}
      />
      <OstPil x={525} y={430} m={m} synlig={synlig} />
    </g>
  );
}

function KaldSteg3({ synlig, sek, m }: { synlig: number; sek: number; m: { teal: string } }) {
  const drip = (sek * 14) % 10;
  return (
    <g opacity={o(synlig)}>
      <defs>
        <linearGradient id="kf3-kald" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={F.kald} stopOpacity={0.4} />
          <stop offset="100%" stopColor="#0284c7" stopOpacity={0.08} />
        </linearGradient>
        <linearGradient id="kf3-varm" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={F.varm} stopOpacity={0.3} />
          <stop offset="100%" stopColor="#ea580c" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient id="kf3-cb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity={0.95} />
          <stop offset="35%" stopColor="#94a3b8" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#334155" stopOpacity={0.98} />
        </linearGradient>
      </defs>
      <polygon points={`0,${BAKKE_Y} 405,${BAKKE_Y} 225,${TOP_Y} 0,${TOP_Y}`} fill="url(#kf3-kald)" />
      <polygon points={`405,${BAKKE_Y} 960,${BAKKE_Y} 960,${TOP_Y} 225,${TOP_Y}`} fill="url(#kf3-varm)" />
      <line x1={405} y1={BAKKE_Y} x2={225} y2={TOP_Y} stroke={F.kald} strokeWidth={4} />
      <g fill={F.kald}>
        {[
          [375, 341],
          [338, 281],
          [300, 221],
          [262, 161],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} L${x + 22} ${y - 5} L${x + 9} ${y + 25} Z`} />
        ))}
      </g>
      {/* bygesky uten navn */}
      <path
        d="M322 375 C292 345 300 270 322 210 C341 158 322 112 382 109 L465 109 C435 131 416 165 416 218 C416 285 439 338 420 375 Z"
        fill="url(#kf3-cb)"
        stroke="#94a3b8"
        strokeWidth={1.5}
      />
      <path d="M382 109 L488 109 C458 128 431 139 405 139 Z" fill="#f8fafc" opacity={0.95} />
      {/* byger */}
      <g stroke="#60a5fa" strokeWidth={2.4} strokeDasharray="4 3" strokeLinecap="round">
        {[345, 364, 382, 401, 420, 439].map((x, i) => (
          <line key={i} x1={x} y1={r1(368 + (drip + i * 2) % 6)} x2={x - 11} y2={BAKKE_Y - 2} />
        ))}
      </g>
      <ellipse cx={135} cy={285} rx={32} ry={12} fill="#cbd5e1" opacity={0.5} />
      <ellipse cx={188} cy={300} rx={22} ry={9} fill="#cbd5e1" opacity={0.4} />
      <OstPil x={615} y={430} m={m} synlig={synlig} />
    </g>
  );
}

const kaldDef: Def<Bilde> = {
  id: "kaldfront-steg",
  tekst: {
    heading: "Kaldfront: bratt løft og byger",
    title:
      "Tre steg. Steg 1: to luftmasser møtes. Steg 2: kaldere luft skyver seg under den varmere og tvinger den opp langs en brattere flate. Steg 3: løftet gir oftere byger. Høyden er sterkt overdrevet. Ingen skynavn eller grader.",
    caption:
      "Skjematisk snitt · ikke i skala. Kaldfronten er brattere enn varmfronten. Ingen helningstall. Sky uten skynavn. Bølger på fronten går oftest mot øst.",
  },
  faser: ["To luftmasser", "Bratt løft", "Byger"],
  status: [
    "Der luftmasser møtes, dannes en front. En kaldfront: kaldere luft fortrenger varmere.",
    "Kald luft er tettere. Den skyver seg under den varmere lufta og tvinger den opp.",
    "På en kaldfront er løftet brattere, og nedbøren kommer oftere som byger.",
  ],
  bilder: [
    { s1: 0, s2: 0, s3: 0 },
    { s1: 1, s2: 0, s3: 0 },
    { s1: 0, s2: 1, s3: 0 },
    { s1: 0, s2: 0, s3: 1 },
  ],
  etiketter: [
    [
      { text: "kaldere luft", x: 240, y: 180, anchor: "middle", color: F.kald, weight: 800, size: 16 },
      { text: "tettere · skyver seg fram", x: 240, y: 204, anchor: "middle", color: F.dempet, size: 12 },
      { text: "varmere luft", x: 720, y: 180, anchor: "middle", color: F.varm, weight: 800, size: 16 },
      { text: "lettere · blir løftet", x: 720, y: 204, anchor: "middle", color: F.dempet, size: 12 },
      { text: "møte · front", x: 480, y: 92, anchor: "middle", color: F.tekst, weight: 700, size: 13, at: [480, 220], badge: [480, 92] },
    ],
    [
      { text: "kaldere luft", x: 120, y: 225, color: F.kald, weight: 800, size: 15 },
      { text: "skyver seg under", x: 120, y: 246, color: F.dempet, size: 12 },
      { text: "varmere luft", x: 675, y: 240, color: F.varm, weight: 800, size: 15 },
      { text: "løftes bratt", x: 675, y: 261, color: F.dempet, size: 12 },
      {
        text: "kaldfront",
        x: 206,
        y: 152,
        anchor: "middle",
        color: F.kald,
        weight: 800,
        size: 13,
        at: [300, 240],
        badge: [206, 152],
      },
      { text: "brattere flate", x: 206, y: 116, anchor: "middle", color: F.kald, weight: 700, size: 12 },
    ],
    [
      { text: "kaldere luft", x: 105, y: 210, color: F.kald, weight: 800, size: 14 },
      { text: "varmere luft", x: 735, y: 225, color: F.varm, weight: 800, size: 14 },
      {
        text: "bygesky · bratt løft",
        x: 540,
        y: 150,
        anchor: "middle",
        color: F.tekst,
        weight: 800,
        size: 13,
        at: [400, 200],
        badge: [540, 150],
      },
      {
        text: "byger",
        x: 409,
        y: 418,
        anchor: "middle",
        color: "#60a5fa",
        weight: 800,
        size: 13,
        at: [400, 380],
        badge: [409, 418],
      },
    ],
  ] as Lab[][],
  keys: [
    { text: "kaldfront", color: F.kald, kind: "front", front: "kald" },
    { text: "kaldere luft", color: F.kald, kind: "line" },
    { text: "varmere luft", color: F.varm, kind: "line" },
  ],
  notes: ["Skjematisk · ikke i skala", "Ingen skynavn eller grader"],
  viewBox: VB,
  tegn: (s, { m, sek }) => (
    <g>
      {/* Én himmel/bakke/overdrevet her — ikke per steg — så fade ikke overlapper tekst */}
      <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
      <Bakke />
      <KaldSteg1 synlig={s.s1} sek={sek} />
      <KaldSteg2 synlig={s.s2} sek={sek} m={m} />
      <KaldSteg3 synlig={s.s3} sek={sek} m={m} />
      <Overdrevet />
    </g>
  ),
};

/* ---------- VARMFRONT ---------- */

function VarmSteg1({ synlig }: { synlig: number; sek: number }) {
  return (
    <g opacity={o(synlig)}>
      <rect x={0} y={60} width={480} height={330} fill={F.varm} opacity={0.24} />
      <rect x={480} y={60} width={480} height={330} fill={F.kald} opacity={0.26} />
      <line x1={480} y1={75} x2={480} y2={382} stroke={F.dempet} strokeWidth={1.5} strokeDasharray="6 5" opacity={0.55} />
      <g fill={F.varm} opacity={0.35}>
        {[
          [135, 165],
          [210, 225],
          [300, 135],
          [375, 262],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2} />
        ))}
      </g>
      <g fill={F.kald} opacity={0.35}>
        {[
          [585, 150],
          [675, 210],
          [765, 120],
          [840, 255],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2} />
        ))}
      </g>
    </g>
  );
}

function VarmSteg2({ synlig, sek, m }: { synlig: number; sek: number; m: { warm: string; teal: string } }) {
  const bob = Math.sin(sek * 1.5) * 2.5;
  return (
    <g opacity={o(synlig)}>
      <defs>
        <linearGradient id="vf-kald" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={F.kald} stopOpacity={0.36} />
          <stop offset="100%" stopColor="#0284c7" stopOpacity={0.06} />
        </linearGradient>
        <linearGradient id="vf-varm" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={F.varm} stopOpacity={0.34} />
          <stop offset="100%" stopColor="#ea580c" stopOpacity={0.06} />
        </linearGradient>
      </defs>
      {/* slak kaldkile foran: bakke x=315 → topp x=825 */}
      <polygon points={`315,${BAKKE_Y} 960,${BAKKE_Y} 960,120`} fill="url(#vf-kald)" />
      <polygon points={`0,${BAKKE_Y} 315,${BAKKE_Y} 960,120 0,120`} fill="url(#vf-varm)" />
      <line x1={315} y1={BAKKE_Y} x2={825} y2={120} stroke={F.varm} strokeWidth={4} strokeLinecap="round" />
      {/* halvsirkler langs front (peker mot kald = høyre) */}
      <g fill={F.varm}>
        {[
          [390, 352],
          [465, 311],
          [540, 270],
          [615, 229],
          [690, 188],
          [765, 146],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} A14 14 0 0 1 ${x + 21} ${y - 11} A14 14 0 0 0 ${x} ${y}`} />
        ))}
      </g>
      <path
        d={`M150 ${360 + bob} Q285 315 420 255 Q570 188 720 ${142 + bob * 0.4}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={3.2}
        markerEnd={`url(#${m.warm})`}
      />
      <path
        d={`M135 ${375 + bob} Q270 338 405 278 Q555 210 705 ${161 + bob * 0.4}`}
        fill="none"
        stroke={F.varm}
        strokeWidth={2.4}
        opacity={0.6}
        markerEnd={`url(#${m.warm})`}
      />
      <OstPil x={150} y={430} m={m} synlig={synlig} />
    </g>
  );
}

function VarmSteg3({ synlig, sek, m }: { synlig: number; sek: number; m: { teal: string } }) {
  const drip = (sek * 10) % 8;
  return (
    <g opacity={o(synlig)}>
      <defs>
        <linearGradient id="vf3-kald" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={F.kald} stopOpacity={0.34} />
          <stop offset="100%" stopColor="#0284c7" stopOpacity={0.06} />
        </linearGradient>
        <linearGradient id="vf3-varm" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={F.varm} stopOpacity={0.3} />
          <stop offset="100%" stopColor="#ea580c" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient id="vf3-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.85} />
          <stop offset="100%" stopColor="#475569" stopOpacity={0.95} />
        </linearGradient>
      </defs>
      <polygon points={`300,${BAKKE_Y} 960,${BAKKE_Y} 960,116`} fill="url(#vf3-kald)" />
      <polygon points={`0,${BAKKE_Y} 300,${BAKKE_Y} 960,116 0,116`} fill="url(#vf3-varm)" />
      <line x1={300} y1={BAKKE_Y} x2={825} y2={116} stroke={F.varm} strokeWidth={4} />
      <g fill={F.varm}>
        {[
          [375, 352],
          [450, 311],
          [525, 270],
          [600, 229],
          [675, 188],
          [750, 146],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} A12 12 0 0 1 ${x + 20} ${y - 10} A12 12 0 0 0 ${x} ${y}`} />
        ))}
      </g>
      {/* lagdelte skyer uten navn */}
      <ellipse cx={788} cy={109} rx={52} ry={8} fill="#f8fafc" opacity={0.45} />
      <rect x={660} y={131} width={90} height={11} rx={4} fill="#cbd5e1" opacity={0.55} />
      <rect x={540} y={180} width={105} height={16} rx={5} fill="#94a3b8" opacity={0.7} />
      <path
        d="M315 379 L465 262 C488 225 465 202 435 218 C405 232 375 278 352 315 C338 341 322 368 315 379 Z"
        fill="url(#vf3-sky)"
        stroke="#64748b"
        strokeWidth={1.2}
      />
      <ellipse cx={510} cy={240} rx={68} ry={21} fill="#64748b" opacity={0.5} />
      {/* jevn nedbør foran i kald luft */}
      <g stroke="#38bdf8" strokeWidth={2} strokeDasharray="3 4" strokeLinecap="round" opacity={0.9}>
        {[345, 368, 390, 412, 435, 458, 480, 502].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={r1(360 - (x - 345) * 0.35 + (drip + i) % 5)}
            x2={x - 10}
            y2={BAKKE_Y - 2}
          />
        ))}
      </g>
      <OstPil x={615} y={445} m={m} synlig={synlig} />
    </g>
  );
}

const varmDef: Def<Bilde> = {
  id: "varmfront-steg",
  tekst: {
    heading: "Varmfront: slakt løft og jevn nedbør",
    title:
      "Tre steg. Steg 1: to luftmasser møtes. Steg 2: varmere luft glir opp over den kaldere langs en slakere flate. Steg 3: skyet vær og jevn nedbør foran fronten i den kalde lufta. Høyden er sterkt overdrevet. Ingen skynavn eller grader.",
    caption:
      "Skjematisk snitt · ikke i skala. Varmfronten er slakere enn kaldfronten. Ingen helningstall. Sky uten skynavn. Bølger på fronten går oftest mot øst.",
  },
  faser: ["To luftmasser", "Slakt løft", "Jevn nedbør"],
  status: [
    "En varmfront: varmere luft erstatter kaldere. Skyet vær og jevn nedbør.",
    "På en varmfront glir den varme lufta opp over den kalde.",
    "Varmfront gir skyet vær og jevn nedbør foran fronten i den kalde lufta.",
  ],
  bilder: [
    { s1: 0, s2: 0, s3: 0 },
    { s1: 1, s2: 0, s3: 0 },
    { s1: 0, s2: 1, s3: 0 },
    { s1: 0, s2: 0, s3: 1 },
  ],
  etiketter: [
    [
      { text: "varmere luft", x: 240, y: 180, anchor: "middle", color: F.varm, weight: 800, size: 16 },
      { text: "erstatter den kaldere", x: 240, y: 204, anchor: "middle", color: F.dempet, size: 12 },
      { text: "kaldere luft", x: 720, y: 180, anchor: "middle", color: F.kald, weight: 800, size: 16 },
      { text: "foran fronten", x: 720, y: 204, anchor: "middle", color: F.dempet, size: 12 },
      { text: "møte · front", x: 480, y: 92, anchor: "middle", color: F.tekst, weight: 700, size: 13, at: [480, 220], badge: [480, 92] },
    ],
    [
      { text: "varmere luft", x: 135, y: 225, color: F.varm, weight: 800, size: 15 },
      { text: "glir opp over den kalde", x: 135, y: 246, color: F.dempet, size: 12 },
      { text: "kaldere luft", x: 735, y: 315, color: F.kald, weight: 800, size: 15 },
      { text: "foran varmfronten", x: 735, y: 336, color: F.dempet, size: 12 },
      {
        text: "varmfront",
        x: 581,
        y: 165,
        anchor: "middle",
        color: F.varm,
        weight: 800,
        size: 13,
        at: [560, 240],
        badge: [581, 165],
      },
      { text: "slakere flate", x: 581, y: 146, anchor: "middle", color: F.varm, weight: 700, size: 12 },
    ],
    [
      { text: "varmere luft", x: 120, y: 210, color: F.varm, weight: 800, size: 14 },
      { text: "kaldere luft", x: 765, y: 322, color: F.kald, weight: 800, size: 14 },
      {
        text: "lagdelt sky · slakt løft",
        x: 638,
        y: 150,
        anchor: "middle",
        color: F.tekst,
        weight: 800,
        size: 13,
        at: [520, 220],
        badge: [638, 150],
      },
      {
        text: "jevn nedbør",
        x: 442,
        y: 418,
        anchor: "middle",
        color: "#38bdf8",
        weight: 800,
        size: 13,
        at: [450, 360],
        badge: [442, 418],
      },
    ],
  ] as Lab[][],
  keys: [
    { text: "varmfront", color: F.varm, kind: "front", front: "varm" },
    { text: "varmere luft", color: F.varm, kind: "line" },
    { text: "kaldere luft", color: F.kald, kind: "line" },
  ],
  notes: ["Skjematisk · ikke i skala", "Ingen skynavn eller grader"],
  viewBox: VB,
  tegn: (s, { m, sek }) => (
    <g>
      {/* Én himmel/bakke/overdrevet her — ikke per steg — så fade ikke overlapper tekst */}
      <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
      <Bakke />
      <VarmSteg1 synlig={s.s1} sek={sek} />
      <VarmSteg2 synlig={s.s2} sek={sek} m={m} />
      <VarmSteg3 synlig={s.s3} sek={sek} m={m} />
      <Overdrevet />
    </g>
  ),
};

export const KaldfrontFigur = lagFigur(kaldDef);
export const VarmfrontFigur = lagFigur(varmDef);
