/**
 * GolfDiagram: skjematisk kart over Golfstrømmen → Den nordatlantiske → Den norske atlanterhavsstrømmen.
 * Fire steg (StegFigur via LokaleRamme). Erstatter widget-mapping til GulfVsNacDiagram;
 * GulfVsNacDiagram beholdes i ocean.tsx til eksamen.
 * Følger havstrommer.md (Golfstrømmen / «går ikke helt til Norge») og v2-mockup ENSO-nivå.
 * Ingen Europa-etikett. Norsk gren ender i Norskehavet (hav).
 */
import { useEffect, useId, useRef } from "react";
import { clamp } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { GOLF_TEKST } from "./hav-tekst";
import { F, LokaleRamme, medKilde, useLokaleTidslinje, type Hinder, type Lab } from "./lokale-kit";

const FASER = [
  "Golfstrømmen",
  "Avbøyning 35–40° N",
  "Den nordatlantiske",
  "Gren til Norskehavet",
];

const STATUS = [
  medKilde(
    "Golfstrømmen starter i Floridastredet og går nordover langs Nord-Amerika.",
    "Barthel, 2026",
  ),
  medKilde(
    "Mellom 35 og 40° N bøyer strømmen ut fra kysten og inn i Atlanteren.",
    "Barthel, 2026",
  ),
  medKilde(
    "Videre øst–nordøst over Atlanteren heter den Den nordatlantiske strømmen.",
    "Weber og Bjørndalen, 2024",
  ),
  medKilde("Golfstrømmen går ikke helt til Norge.", "Barthel, 2026"),
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { golf: 0, bend: 0, nac: 0, nor: 0, lat: 0 },
  { golf: 1, bend: 0, nac: 0, nor: 0, lat: 0 },
  { golf: 1, bend: 1, nac: 0, nor: 0, lat: 1 },
  { golf: 1, bend: 1, nac: 1, nor: 0, lat: 1 },
  { golf: 1, bend: 1, nac: 1, nor: 1, lat: 1 },
];

/**
 * Mockup-kartpanel (48,92)–(1232,620) skalert til LokaleRamme VB 960×540.
 * Brukes som SVG-transform på hele kartgruppen.
 */
const MX = 48;
const MY = 92;
const SX = 960 / 1184;
const SY = 540 / 528;

/** Land- og strømgeometri i mockup-koordinater (v2). */
const PATH_NA =
  "M 48 92 L 295 92 L 312 118 L 322 155 L 318 195 L 300 240 L 278 285 L 258 325 L 242 365 L 228 400 L 220 430 L 235 455 L 258 478 L 278 500 L 292 522 L 300 545 L 292 568 L 268 585 L 238 592 L 210 580 L 198 555 L 188 575 L 168 590 L 140 598 L 110 585 L 92 555 L 80 520 L 68 485 L 48 470 Z";
const PATH_NO =
  "M 1232 92 L 1095 92 L 1072 108 L 1055 128 L 1042 155 L 1030 185 L 1022 218 L 1014 252 L 1008 288 L 1012 318 L 1022 348 L 1035 378 L 1048 405 L 1065 430 L 1088 452 L 1115 470 L 1145 488 L 1178 505 L 1208 525 L 1232 540 Z";

const SEG_GOLF = "M 218 570 C 252 512, 272 452, 294 400 C 314 356, 350 340, 398 328";
const SEG_BEND = "M 398 328 C 435 320, 470 318, 510 318";
const SEG_NAC = "M 515 318 C 595 304, 675 286, 755 262 C 785 252, 808 244, 828 238";
const SEG_NOR = "M 830 236 C 870 210, 900 172, 918 145 C 930 128, 940 118, 950 112";
const SEG_DIM = "M 830 242 C 872 268, 902 310, 925 358";

const RIBBON = [
  "M 215 568 C 250 510, 270 450, 292 398 C 312 355, 348 338, 400 328",
  "M 215 568 C 250 510, 270 450, 292 398 C 312 355, 348 338, 400 328 C 435 320, 470 318, 515 318",
  "M 215 568 C 250 510, 270 450, 292 398 C 312 355, 348 338, 400 328 C 595 304, 675 286, 755 262 C 785 252, 820 240",
  "M 215 568 C 250 510, 270 450, 292 398 C 312 355, 348 338, 400 328 C 595 304, 675 286, 755 262 C 830 236, 900 172, 918 145 C 935 125, 945 116, 950 112",
];

const COL = {
  golf: "#f0a060",
  nac: "#c4d96a",
  nor: "#f0a07a",
  sted: "#8ec5a0",
  dempet: "#9fb0bd",
  atl: "#7dd3fc",
};

function tx(x: number) {
  return (x - MX) * SX;
}
function ty(y: number) {
  return (y - MY) * SY;
}

export function GolfFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length);
  const s = tidslinjeVerdi(BILDER, tl.p);
  const fase = tl.fase;
  const hoppet = useRef(false);
  const velgFase = tl.velgFase;
  const reduced = tl.reduced;

  // Reduced-motion: vis siste steg (hele kartet), som i v2-mockupen.
  useEffect(() => {
    if (reduced && !hoppet.current) {
      hoppet.current = true;
      velgFase(FASER.length);
    }
  }, [reduced, velgFase]);

  const ribbonIdx = clamp(Math.round(s.golf + s.bend + s.nac + s.nor) - 1, 0, 3);
  const ribbonD = RIBBON[ribbonIdx];
  const ribbonOp = 0.22 + (s.golf + s.bend + s.nac + s.nor) * 0.08;

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

  lab("Nord-Amerika", 155, 280, COL.sted, { anchor: "start", size: 15, weight: 800, badge: [120, 250] });
  /* Badge i havet, klar av kyststrek #5a7a62 (stroke «2»). */
  lab("Floridastredet", 360, 595, COL.dempet, { anchor: "start", size: 12, weight: 600, badge: [350, 590] });
  /* Norge klar av kompass-N (covered «N»). */
  lab("Norge", 1100, 260, COL.sted, { size: 15, weight: 800, badge: [1060, 240] });
  lab("Atlanteren", 640, 530, COL.atl, { size: 16, weight: 600, badge: [640, 500] });
  /* Norskehavet under tip/ribbon, inne i viewBox. */
  lab("Norskehavet", 700, 130, COL.dempet, { size: 13, weight: 600, badge: [660, 115] });

  /* Inline-tekst kun ved høy synlighet (TreCeller HOLD ~0,92) — unngår midt-fade stroke. */
  const hold = (v: number) => clamp((v - 0.35) / 0.4);
  if (s.golf > 0.35) {
    const op = hold(s.golf);
    if (op >= 0.92) {
      lab("Golfstrømmen · Floridastredet", 470, 555, COL.golf, {
        size: 12,
        weight: 800,
        opacity: op,
        at: [300, 540],
        badge: [450, 575],
      });
    }
  }
  if (s.bend > 0.35) {
    const op = hold(s.bend);
    if (op >= 0.92) {
      lab("bøyer av · 35–40° N", 520, 270, "#fde68a", {
        size: 12,
        weight: 800,
        opacity: op,
        at: [455, 305],
        badge: [500, 245],
      });
    }
  }
  if (s.nac > 0.35) {
    const op = hold(s.nac);
    if (op >= 0.92) {
      lab("Den nordatlantiske strømmen", 680, 200, "#d9f99d", {
        size: 12,
        weight: 800,
        opacity: op,
        at: [700, 255],
        badge: [640, 185],
      });
    }
  }
  if (s.nor > 0.35) {
    const op = hold(s.nor);
    if (op >= 0.92) {
      /* Sør for NAC/nor-korridor — unngår stroke mot #a3e635/#020617. */
      lab("Den norske atlanterhavsstrømmen", 620, 350, "#fecaca", {
        size: 12,
        weight: 800,
        opacity: op,
        at: [860, 200],
        badge: [600, 360],
      });
      /* Høyre for Norskehavet, vest for tip — ikke overlapping. */
      lab("ender i havet", 900, 175, COL.dempet, {
        size: 11,
        weight: 600,
        opacity: op,
        badge: [870, 160],
      });
    }
  }
  if (s.lat > 0.35) {
    const op = hold(s.lat);
    if (op >= 0.92) {
      lab("35° N", 85, 399, "#b8c9d4", { size: 11, weight: 600, opacity: op, badge: [70, 399] });
      lab("40° N", 85, 354, "#b8c9d4", { size: 11, weight: 600, opacity: op, badge: [70, 354] });
    }
  }

  const hinder: Hinder[] = [
    { p: [[tx(218), ty(570)], [tx(294), ty(400)], [tx(398), ty(328)]], b: 8, pil: true },
    { p: [[tx(398), ty(328)], [tx(510), ty(318)]], b: 7, pil: true },
    { p: [[tx(515), ty(318)], [tx(755), ty(262)], [tx(828), ty(238)]], b: 7, pil: true },
    { p: [[tx(830), ty(236)], [tx(918), ty(138)], [tx(958), ty(78)]], b: 7, pil: true },
    { punkt: [tx(218), ty(570)], r: 10 },
    { punkt: [tx(950), ty(112)], r: 10 },
  ];

  const id = (name: string) => `${uid}-${name}`;

  return (
    <LokaleRamme
      tekst={GOLF_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={STATUS[fase - 1]}
      svgRef={ref}
      labels={labels}
      data="golf"
      etikettRader={6}
      hinder={hinder}
      skiltNokkel={`${fase}|${Math.round(tl.p * 4)}`}
      skiltLuft={10}
      notes={[
        "Skjematisk kart · nord opp. Tre strekninger, tre navn. Pilen ender i Norskehavet, ikke på land.",
      ]}
      keys={[
        { text: "Golfstrømmen", color: COL.golf, kind: "line" },
        { text: "Den nordatlantiske strømmen", color: COL.nac, kind: "line" },
        { text: "Den norske atlanterhavsstrømmen", color: COL.nor, kind: "line" },
      ]}
    >
      {() => (
        <>
          <defs>
            <linearGradient id={id("bg")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08141c" />
              <stop offset="100%" stopColor="#0b1620" />
            </linearGradient>
            <linearGradient id={id("ocean")} x1="0.2" y1="1" x2="0.75" y2="0">
              <stop offset="0%" stopColor="#0a2840" />
              <stop offset="35%" stopColor="#0a2238" />
              <stop offset="70%" stopColor="#071c30" />
              <stop offset="100%" stopColor="#061528" />
            </linearGradient>
            <linearGradient id={id("sst")} x1="0.08" y1="0.95" x2="0.82" y2="0.08">
              <stop offset="0%" stopColor="#c2410c" stopOpacity="0.55" />
              <stop offset="22%" stopColor="#ea580c" stopOpacity="0.42" />
              <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.28" />
              <stop offset="68%" stopColor="#0ea5e9" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.62" />
            </linearGradient>
            <radialGradient id={id("warm")} cx="28%" cy="72%" r="42%" fx="22%" fy="78%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#f97316" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#ea580c" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("warm2")} cx="42%" cy="52%" r="28%" fx="40%" fy="55%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("cold")} cx="72%" cy="18%" r="38%" fx="75%" fy="12%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#0369a1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("sheen")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.14" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("land-na")} x1="0" y1="0" x2="1" y2="0.8">
              <stop offset="0%" stopColor="#2a3d30" />
              <stop offset="45%" stopColor="#1e2e24" />
              <stop offset="100%" stopColor="#15241c" />
            </linearGradient>
            <linearGradient id={id("land-no")} x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#2c4033" />
              <stop offset="100%" stopColor="#182820" />
            </linearGradient>
            <linearGradient id={id("g-golf")} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f0a060" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id={id("g-nac")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e6cf6a" />
              <stop offset="45%" stopColor="#c4d96a" />
              <stop offset="100%" stopColor="#5eead4" />
            </linearGradient>
            <linearGradient id={id("g-nor")} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#e07a5f" />
              <stop offset="100%" stopColor="#f0a07a" />
            </linearGradient>
            <linearGradient id={id("atm")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.18" />
              <stop offset="55%" stopColor="#64748b" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
            </linearGradient>
            <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={id("blur")} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
            <filter id={id("drop")} x="-8%" y="-8%" width="120%" height="120%">
              <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="#020617" floodOpacity="0.55" />
            </filter>
            <marker id={id("m-golf")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8.5" markerHeight="8.5" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#fdba74" />
            </marker>
            <marker id={id("m-nac")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8.5" markerHeight="8.5" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#c4d96a" />
            </marker>
            <marker id={id("m-nor")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8.5" markerHeight="8.5" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#f0a07a" />
            </marker>
            <marker id={id("m-dim")} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 1.2 L11 6 L0 10.8 z" fill="#64748b" />
            </marker>
          </defs>

          <rect width={960} height={540} fill={`url(#${id("bg")})`} data-nocheck="" />

          <g transform={`scale(${SX} ${SY}) translate(${-MX} ${-MY})`} data-nocheck="">
            {/* Havflate */}
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("ocean")})`} />
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("sst")})`} />
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("warm")})`} />
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("warm2")})`} />
            <rect x={48} y={92} width={1184} height={528} fill={`url(#${id("cold")})`} />

            {/* SST-ribbon under strøm */}
            {/* Tynn stroke + sterk blur: visuelt bred SST, men isPointInStroke (label-hit) treffer ikke. */}
            <g opacity={ribbonOp} aria-hidden="true">
              <path
                d={ribbonD}
                fill="none"
                stroke="#f97316"
                strokeWidth={1.5}
                strokeLinecap="round"
                opacity={0.95}
                filter={`url(#${id("blur")})`}
              />
              <path
                d={ribbonD}
                fill="none"
                stroke="#fbbf24"
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.8}
                filter={`url(#${id("blur")})`}
              />
            </g>

            {/* Bølgestreker + sheen */}
            <g opacity={0.55} fill="none" stroke="#7dd3fc" strokeLinecap="round">
              <path d="M 320 180 Q 480 172 640 185 T 980 170" strokeWidth={1.2} opacity={0.22} />
              <path d="M 300 240 Q 500 228 700 248 T 1050 230" strokeWidth={1.1} opacity={0.16} />
              <path d="M 280 310 Q 520 298 760 318 T 1100 300" strokeWidth={1.0} opacity={0.12} />
              <path d="M 260 420 Q 480 408 720 430 T 1020 415" strokeWidth={1.0} opacity={0.1} />
            </g>
            <rect x={48} y={92} width={1184} height={140} fill={`url(#${id("sheen")})`} />
            <rect x={48} y={92} width={1184} height={110} fill={`url(#${id("atm")})`} />

            {/* Myke skyer */}
            <g opacity={0.42}>
              <ellipse cx={620} cy={118} rx={70} ry={18} fill="#94a3b8" opacity={0.55} />
              <ellipse cx={660} cy={112} rx={48} ry={14} fill="#e2e8f0" opacity={0.5} />
              <ellipse cx={780} cy={125} rx={55} ry={15} fill="#94a3b8" opacity={0.4} />
              <ellipse cx={900} cy={115} rx={62} ry={16} fill="#94a3b8" opacity={0.45} />
            </g>

            {/* Breddegrader (steg 2+) */}
            <g opacity={s.lat}>
              <path d="M48 405 H1232" stroke="#4a6a80" strokeWidth={1.3} strokeDasharray="5 7" opacity={0.85} />
              <path d="M48 360 H1232" stroke="#4a6a80" strokeWidth={1.3} strokeDasharray="5 7" opacity={0.85} />
              <rect x={48} y={360} width={1184} height={45} fill="#f59e0b" opacity={0.05} />
            </g>

            {/* Shelf-glød */}
            <path
              d="M 300 95 L 318 120 L 328 158 L 324 198 L 306 242 L 284 288 L 264 328 L 248 368 L 234 402 L 226 432 L 242 458 L 265 482 L 286 505 L 300 528"
              fill="none"
              stroke="#5eead4"
              strokeWidth={14}
              strokeLinecap="round"
              opacity={0.18}
            />
            <path
              d="M 1090 95 L 1068 112 L 1050 132 L 1036 160 L 1024 190 L 1016 224 L 1008 258 L 1002 294 L 1006 324 L 1016 354 L 1030 384 L 1044 412"
              fill="none"
              stroke="#5eead4"
              strokeWidth={12}
              strokeLinecap="round"
              opacity={0.16}
            />

            {/* Land med skygge */}
            <g opacity={0.55}>
              <path d={PATH_NA} fill="#020617" transform="translate(10,8)" />
              <path d={PATH_NO} fill="#020617" transform="translate(-8,6)" />
            </g>
            <g filter={`url(#${id("drop")})`}>
              <path d={PATH_NA} fill={`url(#${id("land-na")})`} stroke="#3d5344" strokeWidth={1.3} />
              <path d={PATH_NO} fill={`url(#${id("land-no")})`} stroke="#3d5344" strokeWidth={1.3} />
            </g>
            <path
              d="M 295 92 L 312 118 L 322 155 L 318 195 L 300 240 L 278 285 L 258 325 L 242 365 L 228 400 L 220 430 L 235 455 L 258 478 L 278 500 L 292 522 L 300 545 L 292 568 L 268 585 L 238 592"
              fill="none"
              stroke="#5a7a62"
              strokeWidth={2.2}
              opacity={0.65}
            />
            <path
              d="M 1095 92 L 1072 108 L 1055 128 L 1042 155 L 1030 185 L 1022 218 L 1014 252 L 1008 288 L 1012 318 L 1022 348 L 1035 378 L 1048 405 L 1065 430 L 1088 452 L 1115 470"
              fill="none"
              stroke="#5a7a62"
              strokeWidth={2.2}
              opacity={0.6}
            />

            {/* Nordpil øvre venstre uten «N»-bokstav (notes: «nord opp») — unngår covered badge@320. */}
            <g transform="translate(72,118)" data-nocheck="" aria-hidden="true">
              <circle cx={18} cy={22} r={18} fill="#12202c" stroke="#2a3f52" strokeWidth={1.2} />
              <path d="M18 10 L18 34" stroke="#7dd3fc" strokeWidth={2.2} strokeLinecap="round" />
              <path d="M18 10 L13 18 M18 10 L23 18" fill="none" stroke="#7dd3fc" strokeWidth={2.2} strokeLinecap="round" />
            </g>

            {/* Strømsegmenter */}
            <g opacity={s.golf}>
              <path d={SEG_GOLF} fill="none" stroke="#020617" strokeWidth={16} strokeLinecap="round" opacity={0.35} transform="translate(4,5)" />
              <path d={SEG_GOLF} fill="none" stroke="#ea580c" strokeWidth={18} strokeLinecap="round" opacity={0.28} filter={`url(#${id("glow")})`} />
              <path
                d={SEG_GOLF}
                fill="none"
                stroke={`url(#${id("g-golf")})`}
                strokeWidth={8.5}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-golf")})`}
                filter={`url(#${id("glow")})`}
              />
              <circle cx={218} cy={570} r={7} fill="#f0a060" stroke="#fff7ed" strokeWidth={1.6} />
            </g>

            <g opacity={s.bend}>
              <path d={SEG_BEND} fill="none" stroke="#020617" strokeWidth={14} strokeLinecap="round" opacity={0.3} transform="translate(3,4)" />
              <path d={SEG_BEND} fill="none" stroke="#ea580c" strokeWidth={16} strokeLinecap="round" opacity={0.25} filter={`url(#${id("glow")})`} />
              <path
                d={SEG_BEND}
                fill="none"
                stroke={`url(#${id("g-golf")})`}
                strokeWidth={8}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-golf")})`}
                filter={`url(#${id("glow")})`}
              />
              <circle cx={455} cy={320} r={6} fill="#fbbf24" stroke="#fff7ed" strokeWidth={1.3} />
            </g>

            <g opacity={s.nac}>
              <path d={SEG_NAC} fill="none" stroke="#020617" strokeWidth={14} strokeLinecap="round" opacity={0.28} transform="translate(3,4)" />
              <path d={SEG_NAC} fill="none" stroke="#a3e635" strokeWidth={16} strokeLinecap="round" opacity={0.22} filter={`url(#${id("glow")})`} />
              <path
                d={SEG_NAC}
                fill="none"
                stroke={`url(#${id("g-nac")})`}
                strokeWidth={8}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-nac")})`}
                filter={`url(#${id("glow")})`}
              />
              <circle cx={828} cy={238} r={5.5} fill="#c4d96a" stroke="#ecfccb" strokeWidth={1.2} />
            </g>

            <g opacity={s.nor}>
              <path
                d={SEG_DIM}
                fill="none"
                stroke="#64748b"
                strokeWidth={3.4}
                strokeLinecap="round"
                strokeDasharray="4 7"
                opacity={0.55}
                markerEnd={`url(#${id("m-dim")})`}
              />
              <path d={SEG_NOR} fill="none" stroke="#020617" strokeWidth={13} strokeLinecap="round" opacity={0.3} transform="translate(3,3)" />
              <path d={SEG_NOR} fill="none" stroke="#e07a5f" strokeWidth={15} strokeLinecap="round" opacity={0.26} filter={`url(#${id("glow")})`} />
              <path
                d={SEG_NOR}
                fill="none"
                stroke={`url(#${id("g-nor")})`}
                strokeWidth={7.5}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-nor")})`}
                filter={`url(#${id("glow")})`}
              />
              <circle cx={950} cy={112} r={6.5} fill="#e07a5f" stroke="#fff7ed" strokeWidth={1.5} />
            </g>
          </g>
        </>
      )}
    </LokaleRamme>
  );
}
