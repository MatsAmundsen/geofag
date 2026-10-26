/**
 * GyreDiagram: nordatlantisk havvirvel i 4 steg (StegFigur via LokaleRamme).
 * Vestlig intensivering: Golfstrømmen smal/rask, Kanaristrømmen bred/langsom, H midt i.
 * Erstatter widget-mapping til ocean.tsx GyreDiagram i kapittel; ocean.tsx beholdes urørt.
 * Geo GODKJENT mockup 26.10 · Mats kode-ja via Geo-chat.
 */
import { useEffect, useId, useRef } from "react";
import { clamp } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { GYRE_TEKST } from "./hav-tekst";
import { F, LokaleRamme, medKilde, useLokaleTidslinje, type Hinder, type Lab } from "./lokale-kit";

const FASER = [
  "Virvel med klokken",
  "Golfstrømmen",
  "Kanaristrømmen",
  "Høyere havspeil",
];

const STATUS = [
  medKilde(
    "På den nordlige halvkulen går overflatestrømmene i en stor sirkel med klokken.",
    "NOAA, u.å.-b",
  ),
  medKilde(
    "Vestsiden er smal og rask: Golfstrømmen er den vestlige randstrømmen.",
    "NOAA, u.å.-b",
  ),
  medKilde(
    "Østsiden er bred og langsom: Kanaristrømmen er den østlige randstrømmen.",
    "NOAA, u.å.-b",
  ),
  medKilde(
    "Høyere havspeil midt i virvelen — vannet strømmer langs hellingen rundt det høye havspeilet.",
    "Barthel, 2025",
  ),
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { gyre: 0, golf: 0, nac: 0, kanari: 0, south: 0, h: 0 },
  { gyre: 1, golf: 0, nac: 0, kanari: 0, south: 0, h: 0 },
  { gyre: 0.35, golf: 1, nac: 0.42, kanari: 0, south: 1, h: 0 },
  { gyre: 0, golf: 1, nac: 0.42, kanari: 1, south: 1, h: 0 },
  { gyre: 0, golf: 1, nac: 1, kanari: 1, south: 1, h: 1 },
];

const MX = 48;
const MY = 92;
const SX = 960 / 1184;
const SY = 540 / 528;

const PATH_NA =
  "M 48 92 L 268 92 L 282 130 L 278 175 L 265 220 L 248 270 L 235 320 L 228 370 L 238 410 L 255 445 L 268 480 L 275 520 L 262 560 L 245 600 L 220 620 L 48 620 Z";
const PATH_AF =
  "M 1232 200 L 1232 620 L 1080 620 L 1065 580 L 1055 530 L 1068 480 L 1088 430 L 1105 380 L 1118 330 L 1135 280 L 1160 240 L 1190 210 L 1220 200 Z";

const SEG_GYRE =
  "M 340 470 C 355 300, 390 210, 560 195 C 700 182, 860 210, 980 310 C 1050 370, 1040 470, 900 520 C 760 570, 520 560, 400 510 C 350 490, 335 485, 340 470";
const SEG_GOLF = "M 330 500 C 340 420, 350 340, 365 280 C 375 240, 400 210, 450 195";
const SEG_NAC = "M 470 195 C 560 175, 680 178, 800 210 C 860 228, 920 260, 960 300";
const SEG_KANARI = "M 970 320 C 1005 370, 1015 430, 990 485 C 965 535, 900 555, 820 550";
const SEG_SOUTH = "M 800 550 C 680 565, 520 555, 400 520 C 360 505, 340 490, 330 470";

const COL = {
  golf: "#fdba74",
  nac: "#d9f99d",
  kanari: "#7dd3fc",
  gyre: "#e2e8f0",
  h: "#99f6e4",
  sted: "#9fb0bd",
  dempet: "#94a3b8",
};

function tx(x: number) {
  return (x - MX) * SX;
}
function ty(y: number) {
  return (y - MY) * SY;
}

export function GyreFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length);
  const s = tidslinjeVerdi(BILDER, tl.p);
  const fase = tl.fase;
  const hoppet = useRef(false);
  const velgFase = tl.velgFase;
  const reduced = tl.reduced;

  useEffect(() => {
    if (reduced && !hoppet.current) {
      hoppet.current = true;
      velgFase(FASER.length);
    }
  }, [reduced, velgFase]);

  const labels: Lab[] = [];
  const lab = (
    text: string,
    x: number,
    y: number,
    color: string,
    opts: Partial<Lab> & { opacity?: number } = {},
  ) => {
    const { opacity = 1, ...rest } = opts;
    if (opacity < 0.08) return;
    labels.push({
      text,
      x: tx(x),
      y: ty(y),
      color,
      anchor: rest.anchor ?? "middle",
      size: rest.size ?? 13,
      weight: rest.weight ?? 800,
      halo: F.halo,
      opacity,
      at: rest.at ? [tx(rest.at[0]), ty(rest.at[1])] : undefined,
      badge: rest.badge ? [tx(rest.badge[0]), ty(rest.badge[1])] : undefined,
      narrowHide: rest.narrowHide,
    });
  };

  lab("Nord-Amerika", 130, 200, COL.sted, {
    anchor: "start",
    size: 15,
    weight: 700,
    badge: [100, 175],
  });
  lab("Afrika", 1125, 360, COL.sted, {
    size: 15,
    weight: 700,
    badge: [1095, 335],
  });

  const hold = (v: number) => clamp((v - 0.35) / 0.4);

  if (s.gyre > 0.5) {
    lab("virvelen går med klokken", 640, 160, COL.gyre, {
      size: 14,
      weight: 700,
      opacity: hold(s.gyre),
      badge: [560, 140],
    });
    lab("nordlig halvkule", 640, 182, COL.dempet, {
      size: 12,
      weight: 600,
      opacity: hold(s.gyre),
      badge: [575, 182],
      narrowHide: true,
    });
  }

  if (s.golf > 0.35) {
    const op = hold(s.golf);
    if (op >= 0.9) {
      lab("Golfstrømmen · smal · rask", 200, 300, COL.golf, {
        size: 13,
        weight: 800,
        opacity: op,
        at: [365, 340],
        badge: [155, 275],
      });
    }
  }

  if (s.nac > 0.2) {
    const op = s.nac >= 0.9 ? 1 : clamp(s.nac * 1.3);
    if (op >= 0.45) {
      lab("Den nordatlantiske strømmen", 720, 148, COL.nac, {
        size: 12,
        weight: 700,
        opacity: op,
        at: [700, 200],
        badge: [580, 130],
      });
    }
  }

  if (s.kanari > 0.35) {
    const op = hold(s.kanari);
    if (op >= 0.9) {
      lab("Kanaristrømmen · bred · langsom", 1040, 480, COL.kanari, {
        size: 13,
        weight: 800,
        opacity: op,
        at: [960, 450],
        badge: [980, 500],
      });
    }
  }

  if (s.h > 0.35) {
    const op = hold(s.h);
    if (op >= 0.9) {
      lab("høyere havspeil", 680, 430, COL.h, {
        size: 13,
        weight: 700,
        opacity: op,
        badge: [620, 445],
      });
      lab("langs hellingen", 680, 510, COL.dempet, {
        size: 12,
        weight: 600,
        opacity: op,
        badge: [600, 525],
        narrowHide: true,
      });
    }
  }

  const hinder: Hinder[] = [
    { p: [[tx(340), ty(470)], [tx(560), ty(195)], [tx(980), ty(310)], [tx(900), ty(520)]], b: 8, pil: true },
    { p: [[tx(330), ty(500)], [tx(365), ty(280)], [tx(450), ty(195)]], b: 10, pil: true },
    { p: [[tx(470), ty(195)], [tx(800), ty(210)], [tx(960), ty(300)]], b: 7, pil: true },
    { p: [[tx(970), ty(320)], [tx(990), ty(485)], [tx(820), ty(550)]], b: 12, pil: true },
    { p: [[tx(800), ty(550)], [tx(400), ty(520)], [tx(330), ty(470)]], b: 6, pil: true },
    { punkt: [tx(680), ty(360)], r: 55 },
  ];

  const id = (name: string) => `${uid}-${name}`;

  return (
    <LokaleRamme
      tekst={GYRE_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={STATUS[fase - 1]}
      svgRef={ref}
      labels={labels}
      data="gyre"
      etikettRader={6}
      hinder={hinder}
      skiltNokkel={`${fase}|${Math.round(tl.p * 4)}`}
      skiltLuft={10}
      notes={["Skjematisk kart · nord opp. Vestlig intensivering: smal og rask i vest, bred og langsom i øst."]}
      keys={[
        { text: "Golfstrømmen", color: COL.golf, kind: "line" },
        { text: "Den nordatlantiske strømmen", color: COL.nac, kind: "line" },
        { text: "Kanaristrømmen", color: COL.kanari, kind: "line" },
      ]}
    >
      {() => (
        <>
          <defs>
            <linearGradient id={id("bg")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08141c" />
              <stop offset="100%" stopColor="#0b1620" />
            </linearGradient>
            <linearGradient id={id("ocean")} x1="0.15" y1="1" x2="0.85" y2="0">
              <stop offset="0%" stopColor="#0a2c44" />
              <stop offset="35%" stopColor="#0a2238" />
              <stop offset="70%" stopColor="#071c30" />
              <stop offset="100%" stopColor="#061428" />
            </linearGradient>
            <linearGradient id={id("sst")} x1="0.12" y1="0.55" x2="0.88" y2="0.45">
              <stop offset="0%" stopColor="#c2410c" stopOpacity="0.58" />
              <stop offset="28%" stopColor="#ea580c" stopOpacity="0.4" />
              <stop offset="52%" stopColor="#f59e0b" stopOpacity="0.22" />
              <stop offset="78%" stopColor="#0ea5e9" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.58" />
            </linearGradient>
            <radialGradient id={id("warm-w")} cx="22%" cy="48%" r="38%" fx="18%" fy="52%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.82" />
              <stop offset="35%" stopColor="#f97316" stopOpacity="0.48" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("warm-m")} cx="48%" cy="32%" r="30%" fx="46%" fy="34%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.38" />
              <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("cool-e")} cx="78%" cy="55%" r="36%" fx="82%" fy="58%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.62" />
              <stop offset="45%" stopColor="#0369a1" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("h-dome")} cx="50%" cy="48%" r="42%" fx="50%" fy="45%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#2dd4bf" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#14b8a6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("h-core")} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#99f6e4" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#5eead4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("sheen")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("atm")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.16" />
              <stop offset="55%" stopColor="#64748b" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("land-w")} x1="0" y1="0" x2="1" y2="0.7">
              <stop offset="0%" stopColor="#2a3d30" />
              <stop offset="50%" stopColor="#1e2e24" />
              <stop offset="100%" stopColor="#15241c" />
            </linearGradient>
            <linearGradient id={id("land-e")} x1="1" y1="0" x2="0" y2="0.8">
              <stop offset="0%" stopColor="#2c4033" />
              <stop offset="100%" stopColor="#182820" />
            </linearGradient>
            <linearGradient id={id("g-golf")} x1="0" y1="1" x2="0.2" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f0a060" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id={id("g-nac")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e6cf6a" />
              <stop offset="50%" stopColor="#c4d96a" />
              <stop offset="100%" stopColor="#7fd0a8" />
            </linearGradient>
            <linearGradient id={id("g-kanari")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id={id("g-south")} x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id={id("g-gyre")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="35%" stopColor="#7fd0a8" />
              <stop offset="70%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={id("glow-xl")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={id("blur")} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id={id("drop")} x="-8%" y="-8%" width="120%" height="120%">
              <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="#020617" floodOpacity="0.55" />
            </filter>
            <marker id={id("m-golf")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="9" markerHeight="9" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#fdba74" />
            </marker>
            <marker id={id("m-nac")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#c4d96a" />
            </marker>
            <marker id={id("m-kanari")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8.5" markerHeight="8.5" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#7dd3fc" />
            </marker>
            <marker id={id("m-dim")} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="6.5" markerHeight="6.5" orient="auto">
              <path d="M0 1.2 L11 6 L0 10.8 z" fill="#94a3b8" />
            </marker>
            <marker id={id("m-gyre")} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 1.2 L11 6 L0 10.8 z" fill="#e2e8f0" />
            </marker>
          </defs>

          <rect width={960} height={540} fill={`url(#${id("bg")})`} data-nocheck="" />

          <g transform={`scale(${SX} ${SY}) translate(${-MX} ${-MY})`} data-nocheck="">
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("ocean")})`} />
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("sst")})`} opacity={0.85} />
            <ellipse cx={320} cy={340} rx={220} ry={200} fill={`url(#${id("warm-w")})`} filter={`url(#${id("blur")})`} />
            <ellipse cx={580} cy={250} rx={180} ry={140} fill={`url(#${id("warm-m")})`} filter={`url(#${id("blur")})`} />
            <ellipse cx={980} cy={380} rx={210} ry={190} fill={`url(#${id("cool-e")})`} filter={`url(#${id("blur")})`} />

            <g opacity={0.18} stroke="#7dd3fc" strokeWidth={1} fill="none">
              <path d="M 300 180 Q 340 172, 380 180 Q 420 188, 460 180" />
              <path d="M 520 210 Q 560 202, 600 210 Q 640 218, 680 210" />
              <path d="M 740 250 Q 780 242, 820 250 Q 860 258, 900 250" />
              <path d="M 400 480 Q 440 472, 480 480 Q 520 488, 560 480" />
            </g>
            <rect x={48} y={92} width={1184} height={200} fill={`url(#${id("sheen")})`} />
            <rect x={48} y={92} width={1184} height={120} fill={`url(#${id("atm")})`} />

            <g opacity={0.4}>
              <ellipse cx={420} cy={130} rx={70} ry={18} fill="#cbd5e1" opacity={0.35} />
              <ellipse cx={700} cy={118} rx={90} ry={16} fill="#e2e8f0" opacity={0.28} />
              <ellipse cx={960} cy={140} rx={60} ry={14} fill="#94a3b8" opacity={0.3} />
            </g>

            <rect x={260} y={92} width={70} height={528} fill="#5eead4" opacity={0.12} />
            <rect x={1040} y={200} width={80} height={420} fill="#5eead4" opacity={0.1} />

            <g filter={`url(#${id("drop")})`}>
              <path d={PATH_NA} fill={`url(#${id("land-w")})`} stroke="#3d5344" strokeWidth={1.6} />
              <path d={PATH_AF} fill={`url(#${id("land-e")})`} stroke="#3d5344" strokeWidth={1.6} />
            </g>

            <g transform="translate(1188,118)" data-nocheck="" aria-hidden="true">
              <rect x={-18} y={-8} width={36} height={48} rx={8} fill="#0f1d29" stroke="#2a3c48" strokeWidth={1.2} opacity={0.92} />
              <path d="M 0 4 L 0 32" stroke="#e8eef2" strokeWidth={2.2} strokeLinecap="round" />
              <path d="M 0 4 L -6 14 M 0 4 L 6 14" stroke="#e8eef2" strokeWidth={2.2} strokeLinecap="round" fill="none" />
            </g>

            <g opacity={s.gyre}>
              <path
                d={SEG_GYRE}
                fill="none"
                stroke="#020617"
                strokeWidth={18}
                strokeLinecap="round"
                opacity={0.28}
                transform="translate(4,4)"
              />
              <path
                d={SEG_GYRE}
                fill="none"
                stroke={`url(#${id("g-gyre")})`}
                strokeWidth={5.5}
                strokeLinecap="round"
                opacity={0.55}
                strokeDasharray="14 10"
                filter={`url(#${id("glow")})`}
                markerEnd={`url(#${id("m-gyre")})`}
              />
              <circle cx={420} cy={280} r={4} fill="#fbbf24" opacity={0.7} />
              <circle cx={720} cy={210} r={4} fill="#c4d96a" opacity={0.7} />
              <circle cx={1000} cy={380} r={4} fill="#38bdf8" opacity={0.7} />
              <circle cx={700} cy={530} r={4} fill="#94a3b8" opacity={0.7} />
            </g>

            <g opacity={s.golf}>
              <path d={SEG_GOLF} fill="none" stroke="#020617" strokeWidth={22} strokeLinecap="round" opacity={0.32} transform="translate(3,3)" />
              <path d={SEG_GOLF} fill="none" stroke="#ea580c" strokeWidth={20} strokeLinecap="round" opacity={0.3} filter={`url(#${id("glow-xl")})`} />
              <path
                d={SEG_GOLF}
                fill="none"
                stroke={`url(#${id("g-golf")})`}
                strokeWidth={9.5}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-golf")})`}
                filter={`url(#${id("glow")})`}
              />
              <circle cx={450} cy={195} r={6.5} fill="#ea580c" stroke="#fff7ed" strokeWidth={1.5} />
            </g>

            <g opacity={s.nac}>
              <path d={SEG_NAC} fill="none" stroke="#020617" strokeWidth={12} strokeLinecap="round" opacity={0.22} transform="translate(2,2)" />
              <path d={SEG_NAC} fill="none" stroke="#e6cf6a" strokeWidth={12} strokeLinecap="round" opacity={0.22} filter={`url(#${id("glow-xl")})`} />
              <path
                d={SEG_NAC}
                fill="none"
                stroke={`url(#${id("g-nac")})`}
                strokeWidth={5.2}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-nac")})`}
                filter={`url(#${id("glow")})`}
              />
            </g>

            <g opacity={s.kanari}>
              <path d={SEG_KANARI} fill="none" stroke="#020617" strokeWidth={28} strokeLinecap="round" opacity={0.26} transform="translate(3,3)" />
              <path d={SEG_KANARI} fill="none" stroke="#0ea5e9" strokeWidth={26} strokeLinecap="round" opacity={0.28} filter={`url(#${id("glow-xl")})`} />
              <path d={SEG_KANARI} fill="none" stroke={`url(#${id("g-kanari")})`} strokeWidth={14} strokeLinecap="round" opacity={0.55} />
              <path
                d={SEG_KANARI}
                fill="none"
                stroke={`url(#${id("g-kanari")})`}
                strokeWidth={7}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-kanari")})`}
                filter={`url(#${id("glow")})`}
              />
              <circle cx={820} cy={550} r={5.5} fill="#0284c7" stroke="#e0f2fe" strokeWidth={1.3} />
            </g>

            <g opacity={s.south}>
              <path d={SEG_SOUTH} fill="none" stroke="#020617" strokeWidth={11} strokeLinecap="round" opacity={0.2} transform="translate(2,2)" />
              <path
                d={SEG_SOUTH}
                fill="none"
                stroke={`url(#${id("g-south")})`}
                strokeWidth={4.5}
                strokeLinecap="round"
                opacity={0.75}
                markerEnd={`url(#${id("m-dim")})`}
                filter={`url(#${id("glow")})`}
              />
            </g>

            <g opacity={s.h}>
              <ellipse cx={680} cy={360} rx={145} ry={105} fill={`url(#${id("h-dome")})`} filter={`url(#${id("blur")})`} />
              <ellipse cx={680} cy={360} rx={72} ry={52} fill={`url(#${id("h-core")})`} opacity={0.9} />
              <ellipse cx={680} cy={360} rx={72} ry={52} fill="none" stroke="#5eead4" strokeWidth={2.2} opacity={0.85} />
              <ellipse
                cx={680}
                cy={360}
                rx={110}
                ry={80}
                fill="none"
                stroke="#5eead4"
                strokeWidth={1.2}
                opacity={0.35}
                strokeDasharray="6 5"
              />
              <g opacity={0.85} filter={`url(#${id("glow")})`}>
                <path d="M 620 300 C 650 285, 700 285, 735 305" fill="none" stroke="#99f6e4" strokeWidth={2.4} strokeLinecap="round" markerEnd={`url(#${id("m-gyre")})`} />
                <path d="M 760 340 C 775 370, 770 410, 745 435" fill="none" stroke="#99f6e4" strokeWidth={2.4} strokeLinecap="round" markerEnd={`url(#${id("m-gyre")})`} />
                <path d="M 720 430 C 690 448, 650 448, 620 430" fill="none" stroke="#99f6e4" strokeWidth={2.4} strokeLinecap="round" markerEnd={`url(#${id("m-gyre")})`} />
                <path d="M 600 400 C 585 370, 590 330, 615 310" fill="none" stroke="#99f6e4" strokeWidth={2.4} strokeLinecap="round" markerEnd={`url(#${id("m-gyre")})`} />
              </g>
              <circle cx={680} cy={360} r={18} fill="#0f2a28" stroke="#5eead4" strokeWidth={2} />
              <text
                x={680}
                y={366}
                fill="#99f6e4"
                fontSize={18}
                fontWeight={800}
                textAnchor="middle"
                fontFamily="Source Sans 3, Noto Sans, sans-serif"
              >
                H
              </text>
            </g>
          </g>
        </>
      )}
    </LokaleRamme>
  );
}
