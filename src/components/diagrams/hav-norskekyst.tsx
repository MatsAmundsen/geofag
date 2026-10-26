/**
 * NorskekystStrommer: atlanterhavsstrøm + kyststrøm langs Norge (5 steg + Vis tall).
 * StegFigur via LokaleRamme. Ny widget (md-linje i PR D). Eksamen urørt.
 * Geo GODKJENT mockup v2 · Mats: sørover i steg-4-etikett · piler aldri gjennom land.
 */
import { useEffect, useId, useRef, useState } from "react";
import { clamp } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { NORSK_TEKST } from "./hav-tekst";
import { F, LokaleRamme, medKilde, useLokaleTidslinje, type Hinder, type Lab } from "./lokale-kit";

const FASER = [
  "Inn gjennom renna",
  "Langs skråningen",
  "Deler seg utenfor Troms",
  "Kyststrømmen",
  "Vis tall",
];

const STATUS = [
  medKilde("Atlanterhavsvannet kommer inn gjennom Færøy–Shetland-renna.", "Weber og Bjørndalen, 2024"),
  medKilde(
    "Den følger kontinentalskråningen nordover og er nærmest land utenfor Vesterålen.",
    "Grønnestad, 2020",
  ),
  medKilde(
    "Utenfor Troms deler den seg: Nordkappstrømmen går inn i Barentshavet, Vestspitsbergenstrømmen mot Arktis.",
    "Weber og Bjørndalen, 2024",
  ),
  medKilde(
    "Nærmere land går Den norske kyststrømmen — ferskere, full av virvler; i snitt nordover, kan i perioder gå sørover.",
    "Havforskningsinstituttet, 2026",
  ),
  medKilde("Tall fra kapitlet (bryter «Vis tall»).", "Weber og Bjørndalen, 2024"),
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { atl1: 0, atl2: 0, atl3: 0, kyst: 0, tall: 0 },
  { atl1: 1, atl2: 0, atl3: 0, kyst: 0, tall: 0 },
  { atl1: 1, atl2: 1, atl3: 0, kyst: 0, tall: 0 },
  { atl1: 1, atl2: 1, atl3: 1, kyst: 0, tall: 0 },
  { atl1: 1, atl2: 1, atl3: 1, kyst: 1, tall: 0 },
  { atl1: 1, atl2: 1, atl3: 1, kyst: 1, tall: 1 },
];

const MX = 48;
const MY = 92;
const SX = 960 / 1184;
const SY = 540 / 528;

/** Norge-land (mockup v2, hav-baner utenfor). */
const PATH_NO =
  "M 1232 620 L 760 620 L 748 608 L 735 595 L 742 575 L 758 555 L 770 532 L 762 510 L 738 492 L 718 475 L 708 455 L 722 435 L 748 415 L 768 392 L 755 372 L 738 355 L 752 335 L 788 312 L 818 288 L 838 262 L 848 238 L 835 218 L 812 205 L 788 198 L 768 188 L 752 172 L 742 152 L 735 140 L 725 128 L 718 118 L 728 108 L 755 100 L 760 96 L 820 98 L 890 105 L 960 118 L 1035 138 L 1100 158 L 1155 178 L 1195 198 L 1225 218 L 1232 235 Z";

const SEG1 = "M 260 580 C 330 530, 395 470, 445 410";
const SEG2 = "M 445 410 C 485 360, 530 305, 570 255 C 600 225, 620 195, 630 165";
const SEG3_STEM = "M 630 165 C 625 145, 615 125, 605 105";
const SEG3_NK = "M 605 105 C 700 70, 820 55, 940 52 C 1040 50, 1120 60, 1180 75";
const SEG3_VS = "M 605 105 C 590 85, 572 65, 558 42";
const SEG4 =
  "M 680 590 C 695 555, 700 520, 685 490 C 668 455, 648 425, 655 390 C 662 355, 675 325, 688 295 C 702 265, 712 240, 715 215 C 718 190, 705 168, 685 150 C 665 132, 645 115, 635 95 C 720 78, 850 68, 980 65 C 1080 64, 1145 72, 1190 85";
const SLOPE = "M 360 600 C 420 535, 470 460, 510 395 C 545 340, 585 285, 615 230 C 635 195, 650 160, 665 120";

const RIBBON = [
  SEG1,
  `${SEG1} C 485 360, 530 305, 570 255 C 600 225, 620 195, 630 165`,
  `${SEG1} C 485 360, 570 255, 630 165 C 620 130, 700 70, 940 52 C 1080 50, 1180 75`,
  `${SEG1} C 485 360, 570 255, 630 165 C 605 105, 820 55, 1180 75`,
  `${SEG1} C 485 360, 570 255, 630 165 C 605 105, 820 55, 1180 75`,
];

const COL = {
  atl: "#e66f5c",
  atlLys: "#fbbf9a",
  kyst: "#62c3e0",
  kystLys: "#9fe0f5",
  sted: "#8ec5a0",
  dempet: "#9fb0bd",
  hav: "#7dd3fc",
};

function tx(x: number) {
  return (x - MX) * SX;
}
function ty(y: number) {
  return (y - MY) * SY;
}

export function NorskekystFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length);
  const s = tidslinjeVerdi(BILDER, tl.p);
  const fase = tl.fase;
  const hoppet = useRef(false);
  const velgFase = tl.velgFase;
  const reduced = tl.reduced;
  const [tallOn, setTallOn] = useState(false);

  useEffect(() => {
    if (reduced && !hoppet.current) {
      hoppet.current = true;
      velgFase(FASER.length);
      setTallOn(true);
    }
  }, [reduced, velgFase]);

  useEffect(() => {
    if (fase >= 5) setTallOn(true);
    else setTallOn(false);
  }, [fase]);

  const ribbonIdx = clamp(Math.round(s.atl1 + s.atl2 + s.atl3 + s.kyst) - 1, 0, 4);
  const ribbonD = RIBBON[ribbonIdx];
  const ribbonOp = 0.2 + (s.atl1 + s.atl2 + s.atl3) * 0.06;

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

  lab("Norskehavet", 300, 265, COL.hav, { size: 15, weight: 600, badge: [280, 240] });
  lab("Barentshavet", 1095, 155, COL.dempet, { size: 13, weight: 600, badge: [1060, 140] });
  lab("Norge", 990, 400, COL.sted, { size: 16, weight: 800, badge: [960, 380] });
  lab("Skagerrak", 800, 598, COL.dempet, { size: 12, weight: 600, badge: [780, 585] });
  lab("Færøy–Shetland-renna", 230, 605, COL.dempet, { size: 11, weight: 600, badge: [210, 590] });

  const hold = (v: number) => clamp((v - 0.35) / 0.4);
  if (s.atl1 > 0.35) {
    const op = hold(s.atl1);
    if (op >= 0.92) {
      lab("Den norske atlanterhavsstrømmen", 220, 485, COL.atlLys, {
        size: 12,
        weight: 800,
        opacity: op,
        at: [320, 540],
        badge: [200, 470],
      });
    }
  }
  if (s.atl2 > 0.35) {
    const op = hold(s.atl2);
    if (op >= 0.92) {
      lab("nærmest land utenfor Vesterålen", 250, 350, COL.atlLys, {
        size: 12,
        weight: 700,
        opacity: op,
        at: [630, 165],
        badge: [220, 330],
      });
      lab("Vesterålen", 758, 150, "#e8eef2", { size: 12, weight: 700, opacity: op, badge: [745, 145] });
    }
  }
  if (s.atl3 > 0.35) {
    const op = hold(s.atl3);
    if (op >= 0.92) {
      lab("deler seg utenfor Troms", 400, 125, COL.atlLys, {
        size: 12,
        weight: 700,
        opacity: op,
        at: [605, 105],
        badge: [380, 110],
      });
      lab("Troms", 802, 130, "#e8eef2", { size: 12, weight: 700, opacity: op, badge: [790, 125] });
      lab("Nordkappstrømmen", 1000, 88, "#fecaca", {
        size: 12,
        weight: 800,
        opacity: op,
        at: [1000, 60],
        badge: [980, 95],
      });
      lab("Vestspitsbergenstrømmen", 430, 58, "#fecaca", {
        size: 12,
        weight: 800,
        opacity: op,
        at: [580, 55],
        badge: [420, 50],
      });
      lab("mot Arktis", 430, 75, COL.dempet, { size: 11, weight: 600, opacity: op, badge: [420, 72] });
    }
  }
  if (s.kyst > 0.35) {
    const op = hold(s.kyst);
    if (op >= 0.92) {
      lab("Den norske kyststrømmen", 880, 480, COL.kystLys, {
        size: 13,
        weight: 800,
        opacity: op,
        at: [720, 400],
        badge: [860, 460],
      });
      lab("nærmere land · Skagerrak → Barentshavet", 880, 500, COL.kystLys, {
        size: 11,
        weight: 600,
        opacity: op,
        badge: [860, 500],
      });
      lab("ferskere, full av virvler · i snitt nordover", 880, 518, COL.kyst, {
        size: 11,
        weight: 600,
        opacity: op,
        badge: [860, 520],
      });
      lab("kan i perioder gå sørover", 880, 536, COL.kyst, {
        size: 11,
        weight: 600,
        opacity: op,
        badge: [860, 540],
      });
    }
  }
  if (tallOn && s.tall > 0.35) {
    const op = hold(s.tall);
    if (op >= 0.92) {
      lab("i renna: ca. 8 °C · 35,4 ‰", 200, 220, COL.atlLys, {
        size: 12,
        weight: 600,
        opacity: op,
        badge: [180, 210],
      });
      lab("lengst nord: under 5 °C · ca. 35 ‰", 200, 242, COL.atlLys, {
        size: 12,
        weight: 600,
        opacity: op,
        badge: [180, 235],
      });
      lab("kyststrømmen: 30–33 ‰", 200, 264, COL.kystLys, {
        size: 12,
        weight: 600,
        opacity: op,
        badge: [180, 260],
      });
    }
  }

  const hinder: Hinder[] = [
    { p: [[tx(260), ty(580)], [tx(445), ty(410)], [tx(630), ty(165)]], b: 8, pil: true },
    { p: [[tx(605), ty(105)], [tx(940), ty(52)], [tx(1180), ty(75)]], b: 6, pil: true },
    { p: [[tx(605), ty(105)], [tx(558), ty(42)]], b: 6, pil: true },
    { p: [[tx(680), ty(590)], [tx(715), ty(215)], [tx(635), ty(95)], [tx(1190), ty(85)]], b: 5, pil: true },
  ];

  const id = (name: string) => `${uid}-${name}`;
  const status =
    tallOn && fase >= 5
      ? STATUS[4]
      : STATUS[Math.max(0, fase - 1)];

  return (
    <LokaleRamme
      tekst={NORSK_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={status}
      svgRef={ref}
      labels={labels}
      data="norskekyst"
      etikettRader={8}
      hinder={hinder}
      skiltNokkel={`${fase}|${tallOn ? 1 : 0}|${Math.round(tl.p * 4)}`}
      skiltLuft={10}
      notes={[
        "Skjematisk kart · nord opp. Atlanterhav ute langs skråningen, kyst nærmere land. Piler går bare i hav.",
      ]}
      keys={[
        { text: "Den norske atlanterhavsstrømmen", color: COL.atl, kind: "line" },
        { text: "Den norske kyststrømmen", color: COL.kyst, kind: "line" },
      ]}
      ekstra={
        <button
          type="button"
          aria-pressed={tallOn}
          disabled={fase < 5}
          onClick={() => setTallOn((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
            tallOn
              ? "border-sky-400 bg-sky-400/15 text-sky-200"
              : "border-white/20 text-slate-300"
          } disabled:opacity-40`}
        >
          <span aria-hidden="true">{tallOn ? "●" : "○"}</span>
          Vis tall
        </button>
      }
    >
      {() => (
        <>
          <defs>
            <linearGradient id={id("ocean")} x1="0.1" y1="1" x2="0.9" y2="0">
              <stop offset="0%" stopColor="#0b2e48" />
              <stop offset="40%" stopColor="#0a243c" />
              <stop offset="100%" stopColor="#061326" />
            </linearGradient>
            <linearGradient id={id("sst")} x1="0.1" y1="0.95" x2="0.82" y2="0.05">
              <stop offset="0%" stopColor="#c2410c" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id={id("warm")} cx="26%" cy="82%" r="36%" fx="22%" fy="88%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("cold")} cx="55%" cy="12%" r="34%" fx="58%" fy="8%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("land")} x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#314836" />
              <stop offset="100%" stopColor="#15241c" />
            </linearGradient>
            <linearGradient id={id("g-atl")} x1="0" y1="1" x2="0.25" y2="0">
              <stop offset="0%" stopColor="#e66f5c" />
              <stop offset="100%" stopColor="#fdc5a8" />
            </linearGradient>
            <linearGradient id={id("g-kyst")} x1="0" y1="1" x2="0.2" y2="0">
              <stop offset="0%" stopColor="#2f9dbf" />
              <stop offset="100%" stopColor="#a8e8f8" />
            </linearGradient>
            <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={id("blur")} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id={id("drop")} x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="#020617" floodOpacity="0.55" />
            </filter>
            <marker id={id("m-atl")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 1.2 L13 7 L0 12.8 z" fill="#fdc5a8" />
            </marker>
            <marker id={id("m-kyst")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 1.2 L13 7 L0 12.8 z" fill="#a8e8f8" />
            </marker>
            <clipPath id={id("clip")}>
              <rect x={0} y={0} width={960} height={540} rx={8} />
            </clipPath>
          </defs>

          <g clipPath={`url(#${id("clip")})`}>
            <rect x={0} y={0} width={960} height={540} fill={`url(#${id("ocean")})`} />
            <rect x={0} y={0} width={960} height={540} fill={`url(#${id("sst")})`} />
            <rect x={0} y={0} width={960} height={540} fill={`url(#${id("warm")})`} />
            <rect x={0} y={0} width={960} height={540} fill={`url(#${id("cold")})`} />

            <g opacity={ribbonOp} filter={`url(#${id("blur")})`}>
              <path
                d={ribbonD}
                fill="none"
                stroke="#f97316"
                strokeWidth={70}
                strokeLinecap="round"
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
            </g>

            {/* Shelf glow */}
            <path
              d={SLOPE}
              fill="none"
              stroke="#5eead4"
              strokeWidth={12}
              strokeLinecap="round"
              opacity={0.18}
              transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              filter={`url(#${id("blur")})`}
            />

            {/* Land */}
            <g filter={`url(#${id("drop")})`}>
              <path
                d={PATH_NO}
                fill={`url(#${id("land")})`}
                stroke="#3d5344"
                strokeWidth={1.2}
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
            </g>

            {/* Kontinentalskråning */}
            <path
              d={SLOPE}
              fill="none"
              stroke="#8fa3b0"
              strokeWidth={1.5}
              strokeDasharray="6 6"
              opacity={s.atl2}
              transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
            />

            {/* Atlanterhavsstrøm */}
            <g opacity={s.atl1} filter={`url(#${id("glow")})`}>
              <path
                d={SEG1}
                fill="none"
                stroke={`url(#${id("g-atl")})`}
                strokeWidth={7}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-atl")})`}
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
            </g>
            <g opacity={s.atl2} filter={`url(#${id("glow")})`}>
              <path
                d={SEG2}
                fill="none"
                stroke={`url(#${id("g-atl")})`}
                strokeWidth={6.5}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-atl")})`}
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
              <circle cx={tx(630)} cy={ty(165)} r={4.5} fill={COL.atlLys} stroke="#fff7ed" strokeWidth={1.2} />
            </g>
            <g opacity={s.atl3} filter={`url(#${id("glow")})`}>
              <path
                d={SEG3_STEM}
                fill="none"
                stroke={`url(#${id("g-atl")})`}
                strokeWidth={6}
                strokeLinecap="round"
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
              <circle cx={tx(605)} cy={ty(105)} r={4.5} fill={COL.atl} stroke="#fff7ed" strokeWidth={1.2} />
              <path
                d={SEG3_NK}
                fill="none"
                stroke={`url(#${id("g-atl")})`}
                strokeWidth={5.5}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-atl")})`}
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
              <path
                d={SEG3_VS}
                fill="none"
                stroke={`url(#${id("g-atl")})`}
                strokeWidth={5.5}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-atl")})`}
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
            </g>

            {/* Kyststrøm */}
            <g opacity={s.kyst} filter={`url(#${id("glow")})`}>
              <path
                d={SEG4}
                fill="none"
                stroke={`url(#${id("g-kyst")})`}
                strokeWidth={4}
                strokeLinecap="round"
                markerEnd={`url(#${id("m-kyst")})`}
                transform={`translate(${-MX * SX} ${-MY * SY}) scale(${SX} ${SY})`}
              />
              <g fill="none" stroke={COL.kyst} strokeWidth={1.5} opacity={0.85}>
                <circle cx={tx(682)} cy={ty(505)} r={7} />
                <circle cx={tx(658)} cy={ty(410)} r={6} />
                <circle cx={tx(690)} cy={ty(300)} r={7} />
                <circle cx={tx(700)} cy={ty(175)} r={7} />
                <circle cx={tx(900)} cy={ty(78)} r={5.5} />
              </g>
            </g>
          </g>

          {/* Nordpil */}
          <g transform="translate(920, 28)">
            <circle cx={14} cy={16} r={14} fill="#12202c" stroke="#2a3f52" strokeWidth={1} />
            <path d="M14 6 L14 24" stroke="#7dd3fc" strokeWidth={1.8} strokeLinecap="round" />
            <path d="M14 6 L10 13 M14 6 L18 13" fill="none" stroke="#7dd3fc" strokeWidth={1.8} strokeLinecap="round" />
            <text x={14} y={38} fill="#7dd3fc" fontSize={10} fontWeight={700} textAnchor="middle">
              N
            </text>
          </g>
        </>
      )}
    </LokaleRamme>
  );
}
