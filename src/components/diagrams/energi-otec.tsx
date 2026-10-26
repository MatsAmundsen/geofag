/**
 * OtecRankineCycle: lukket ammoniakk-Rankine på OTEC-plattform + vertikal ΔT.
 * Fem steg (StegFigur via LokaleRamme). Erstatter widget-mapping til OtecRankineCycleDiagram;
 * OtecRankineCycleDiagram beholdes i energy.tsx til eksamen.
 * Følger energi-hav-luft.md l. 79 og v2-mockup (kondensator + pumpe på dekk).
 * Tall: ~25 °C, ~5 °C, ΔT ≥ 20 °C, ca. 1000 m. Carnot droppet. Åpen OTEC ikke i figuren.
 */
import { useEffect, useId, useRef } from "react";
import { clamp } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { OTEC_TEKST } from "./energi-tekst";
import { F, LokaleRamme, useLokaleTidslinje, type Hinder, type Lab } from "./lokale-kit";

const FASER = [
  "Temperaturprofil",
  "Fordamper",
  "Turbin",
  "Kondensator",
  "Lukket sløyfe",
];

const STATUS = [
  "I tropene er overflatevannet rundt 25 °C og dypvannet rundt 5 °C — ΔT er minst 20 °C.",
  "Varmt overflatevann varmer ammoniakk i fordamperen, slik at NH₃ går fra væske til gass.",
  "Den varme ammoniakkdampen driver turbinen, og generatoren lager strøm.",
  "Kaldt dypvann pumpes opp fra ca. 1000 m til kondensatoren på plattformen, der NH₃ blir væske igjen.",
  "Pumpen sender flytende ammoniakk tilbake til fordamperen — hele NH₃-sløyfa ligger på dekk.",
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { zone: 0, plat: 0, warm: 0, evap: 0, turb: 0, nh3h: 0, cold: 0, cond: 0, pump: 0, loop: 0 },
  { zone: 1, plat: 0, warm: 0, evap: 0, turb: 0, nh3h: 0, cold: 0, cond: 0, pump: 0, loop: 0 },
  { zone: 0.35, plat: 1, warm: 1, evap: 1, turb: 0, nh3h: 0, cold: 0, cond: 0, pump: 0, loop: 0 },
  { zone: 0.2, plat: 1, warm: 1, evap: 1, turb: 1, nh3h: 1, cold: 0, cond: 0, pump: 0, loop: 0 },
  { zone: 0.15, plat: 1, warm: 1, evap: 1, turb: 1, nh3h: 1, cold: 1, cond: 1, pump: 0, loop: 0 },
  { zone: 0.1, plat: 1, warm: 1, evap: 1, turb: 1, nh3h: 1, cold: 1, cond: 1, pump: 1, loop: 1 },
];

const COL = {
  varm: "#f59e0b",
  varmLys: "#fde68a",
  varmMellom: "#fdba74",
  kald: "#38bdf8",
  kaldLys: "#7dd3fc",
  gronn: "#10b981",
  gronnLys: "#34d399",
  dempet: "#9fb0bd",
  tekst: "#e8eef2",
};

/** Layout i VB 960×540 — snitt med plass til Rankine over overflaten. */
const SURF = 128;
const DEEP_Y = 505;
const PIPE_COLD_X = 730;
const PIPE_WARM_X = 500;

export function OtecFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
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

  const id = (name: string) => `${uid}-${name}`;
  const hold = (v: number) => clamp((v - 0.25) / 0.5);

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
      x,
      y,
      color,
      anchor: rest.anchor ?? "middle",
      size: rest.size ?? 12,
      weight: rest.weight ?? 700,
      halo: F.halo,
      opacity,
      at: rest.at,
      badge: rest.badge,
      narrowHide: rest.narrowHide,
    });
  };

  lab("0 m · overflate", 78, SURF + 4, COL.varmMellom, {
    size: 12, weight: 700, anchor: "start", badge: [55, SURF],
  });
  lab("termoklin", 78, 210, COL.dempet, {
    size: 11, weight: 600, anchor: "start", badge: [55, 205], narrowHide: true,
  });
  lab("dyphav", 78, 360, COL.dempet, {
    size: 11, weight: 600, anchor: "start", badge: [55, 355], narrowHide: true,
  });
  lab("ca. 1000 m", 78, DEEP_Y + 4, COL.kaldLys, {
    size: 12, weight: 700, anchor: "start", badge: [55, DEEP_Y],
  });

  lab("~25 °C", 200, SURF + 14, COL.varmLys, {
    size: 13, weight: 800, anchor: "start", badge: [175, SURF + 8],
  });
  lab("~5 °C", 118, DEEP_Y + 14, COL.kaldLys, {
    size: 13, weight: 800, anchor: "start", badge: [95, DEEP_Y + 8],
  });

  if (s.zone > 0.4) {
    const op = hold(s.zone);
    lab("Varmt overflatevann", 320, SURF + 28, COL.varmLys, {
      size: 13, weight: 800, opacity: op, badge: [250, SURF + 18],
    });
    lab("rundt 25 °C · varmekilde", 320, SURF + 46, COL.varmMellom, {
      size: 11, weight: 600, opacity: op, badge: [250, SURF + 40], narrowHide: true,
    });
    lab("Termoklin · bratt fall", 330, 250, COL.kaldLys, {
      size: 12, weight: 700, opacity: op, badge: [250, 240], narrowHide: true,
    });
    lab("Kaldt dypvann", 320, 430, COL.kaldLys, {
      size: 13, weight: 800, opacity: op, badge: [250, 415],
    });
    lab("rundt 5 °C · ca. 1000 m", 320, 448, COL.kald, {
      size: 11, weight: 600, opacity: op, badge: [250, 442], narrowHide: true,
    });
    lab("ΔT ≥ 20 °C", 520, 285, COL.varmMellom, {
      size: 14, weight: 800, opacity: op, badge: [450, 270],
    });
    lab("tropisk hav · OTEC-krav", 520, 305, COL.varmLys, {
      size: 11, weight: 600, opacity: op, badge: [450, 298], narrowHide: true,
    });
  }

  if (s.plat > 0.4) {
    lab("OTEC-plattform", 470, SURF - 8, COL.dempet, {
      size: 11, weight: 700, anchor: "start", opacity: hold(s.plat),
      badge: [455, SURF - 14], narrowHide: true,
    });
  }
  if (s.warm > 0.4) {
    const op = hold(s.warm);
    lab("varmt overflatevann", 518, SURF + 40, COL.varmMellom, {
      size: 12, weight: 700, anchor: "start", opacity: op, badge: [515, SURF + 32],
    });
    lab("~25 °C · inn til fordamper", 518, SURF + 56, "#fbbf24", {
      size: 11, weight: 600, anchor: "start", opacity: op, badge: [515, SURF + 50], narrowHide: true,
    });
  }
  if (s.evap > 0.4) {
    const op = hold(s.evap);
    lab("FORDAMPER", 510, 48, "#fbbf24", {
      size: 13, weight: 800, opacity: op, badge: [460, 30],
    });
    lab("NH₃ væske → gass", 510, 66, COL.varmMellom, {
      size: 11, weight: 600, opacity: op, badge: [460, 58], narrowHide: true,
    });
  }
  if (s.turb > 0.4) {
    const op = hold(s.turb);
    lab("GEN", 700, 52, COL.gronnLys, {
      size: 12, weight: 800, opacity: op, badge: [680, 38],
    });
    lab("strøm ut", 700, 72, "#6ee7b7", {
      size: 11, weight: 700, opacity: op, badge: [680, 66], narrowHide: true,
    });
  }
  if (s.nh3h > 0.4) {
    lab("NH₃-damp", 600, 38, COL.varmLys, {
      size: 11, weight: 700, opacity: hold(s.nh3h), badge: [570, 28], narrowHide: true,
    });
  }
  if (s.cold > 0.4) {
    const op = hold(s.cold);
    lab("kaldtvannsrør", 752, 360, COL.kaldLys, {
      size: 12, weight: 700, anchor: "start", opacity: op, badge: [748, 350],
    });
    lab("~5 °C pumpes opp", 752, 378, COL.kald, {
      size: 11, weight: 600, anchor: "start", opacity: op, badge: [748, 372], narrowHide: true,
    });
    lab("fra ca. 1000 m", 752, 394, COL.kald, {
      size: 11, weight: 600, anchor: "start", opacity: op, badge: [748, 388], narrowHide: true,
    });
  }
  if (s.cond > 0.4) {
    const op = hold(s.cond);
    lab("KONDENSATOR", 700, SURF - 18, COL.kaldLys, {
      size: 12, weight: 800, opacity: op, badge: [640, SURF - 38],
    });
    lab("NH₃ gass → væske", 700, SURF - 2, COL.kald, {
      size: 11, weight: 600, opacity: op, badge: [640, SURF - 8], narrowHide: true,
    });
  }
  if (s.pump > 0.4) {
    const op = hold(s.pump);
    lab("Pumpe", 470, SURF - 2, "#cbd5e1", {
      size: 12, weight: 700, anchor: "end", opacity: op, badge: [430, SURF - 12],
    });
    lab("flytende NH₃", 600, SURF - 28, COL.kaldLys, {
      size: 11, weight: 700, opacity: op, badge: [560, SURF - 36], narrowHide: true,
    });
  }
  if (s.loop > 0.4) {
    const op = hold(s.loop);
    lab("Lukket ammoniakk-sløyfe på dekk", 520, SURF + 90, COL.kaldLys, {
      size: 13, weight: 800, opacity: op, badge: [400, SURF + 75],
    });
    lab("fordamper → turbin → kondensator → pumpe", 520, SURF + 108, COL.dempet, {
      size: 11, weight: 600, opacity: op, badge: [400, SURF + 102], narrowHide: true,
    });
  }

  const hinder: Hinder[] = [
    { p: [[PIPE_COLD_X, SURF], [PIPE_COLD_X, DEEP_Y]], b: 10, pil: true },
    { p: [[PIPE_WARM_X, SURF], [PIPE_WARM_X, SURF + 50]], b: 8, pil: true },
    { p: [[460, 55], [560, 55]], b: 8 },
    { p: [[620, 55], [760, 55]], b: 8 },
  ];

  const status = STATUS[Math.max(0, fase - 1)];
  const showNh3Legend = fase >= 2;

  return (
    <LokaleRamme
      tekst={OTEC_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={status}
      svgRef={ref}
      labels={labels}
      data="otec-rankine"
      etikettRader={10}
      hinder={hinder}
      skiltNokkel={`${fase}|${Math.round(tl.p * 5)}`}
      skiltLuft={10}
      notes={[
        "Lukket prosess med ammoniakk · tall fra kapitlet (~25 °C, ~5 °C, ΔT ≥ 20 °C, ca. 1000 m).",
      ]}
      keys={
        showNh3Legend
          ? [
              { text: "varmt / NH₃-damp", color: COL.varm, kind: "line" },
              { text: "kaldt / NH₃-væske", color: COL.kald, kind: "line" },
            ]
          : [
              { text: "varmt overflatevann", color: COL.varm, kind: "line" },
              { text: "kaldt dypvann", color: COL.kald, kind: "line" },
            ]
      }
    >
      {() => (
        <>
          <defs>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3348" />
              <stop offset="100%" stopColor="#0d2030" />
            </linearGradient>
            <linearGradient id={id("ocean")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c3a52" />
              <stop offset="18%" stopColor="#0a2e48" />
              <stop offset="55%" stopColor="#061c34" />
              <stop offset="100%" stopColor="#04101f" />
            </linearGradient>
            <linearGradient id={id("warm")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("thermo")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id={id("cold")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#0c4a6e" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.72" />
            </linearGradient>
            <radialGradient id={id("sst")} cx="45%" cy="8%" r="55%" fx="40%" fy="5%">
              <stop offset="0%" stopColor="#fdba74" stopOpacity="0.7" />
              <stop offset="35%" stopColor="#f97316" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("pool")} cx="50%" cy="88%" r="42%" fx="50%" fy="92%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("sun")} cx="78%" cy="18%" r="28%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("deck")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a5a68" />
              <stop offset="100%" stopColor="#2a3640" />
            </linearGradient>
            <linearGradient id={id("hull")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id={id("pw")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id={id("pc")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={id("blur")} x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id={id("drop")} x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#020617" floodOpacity="0.55" />
            </filter>
            <marker id={id("m-warm")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="7.5" markerHeight="7.5" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#fde68a" />
            </marker>
            <marker id={id("m-cold")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="7.5" markerHeight="7.5" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#7dd3fc" />
            </marker>
            <marker id={id("m-teal")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#94a3b8" />
            </marker>
            <marker id={id("m-up")} viewBox="0 0 14 14" refX="7" refY="3" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M1.4 13 L7 0 L12.6 13 z" fill="#e0f2fe" />
            </marker>
            <clipPath id={id("clip")}>
              <rect x={0} y={0} width={960} height={540} rx={8} />
            </clipPath>
          </defs>

          <g clipPath={`url(#${id("clip")})`}>
            <rect x={0} y={0} width={960} height={SURF} fill={`url(#${id("sky")})`} />
            <ellipse cx={780} cy={40} rx={140} ry={55} fill={`url(#${id("sun")})`} filter={`url(#${id("blur")})`} />

            <rect x={0} y={SURF} width={960} height={540 - SURF} fill={`url(#${id("ocean")})`} />
            <rect x={0} y={SURF} width={960} height={70} fill={`url(#${id("warm")})`} />
            <rect x={0} y={SURF} width={960} height={90} fill={`url(#${id("sst")})`} opacity={0.85} />
            <rect x={0} y={SURF + 70} width={960} height={140} fill={`url(#${id("thermo")})`} />
            <rect x={0} y={SURF + 200} width={960} height={540 - SURF - 200} fill={`url(#${id("cold")})`} />
            <ellipse cx={480} cy={490} rx={360} ry={70} fill={`url(#${id("pool")})`} filter={`url(#${id("blur")})`} />

            <path
              d={`M0 ${SURF} Q160 ${SURF - 6} 320 ${SURF} T640 ${SURF - 2} T960 ${SURF}`}
              fill="none"
              stroke="#7dd3fc"
              strokeWidth={1.6}
              opacity={0.45}
            />

            <line x1={48} y1={SURF} x2={48} y2={DEEP_Y} stroke="#475569" strokeWidth={1.5} />
            <circle cx={48} cy={SURF} r={3.5} fill="#fdba74" />
            <circle cx={48} cy={210} r={3} fill="#7dd3fc" />
            <circle cx={48} cy={360} r={3} fill="#38bdf8" />
            <circle cx={48} cy={DEEP_Y} r={3.5} fill="#0284c7" />

            <path
              d={`M170 ${SURF} L170 180 C165 230, 110 310, 90 400 L82 ${DEEP_Y}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth={3.2}
              filter={`url(#${id("glow")})`}
              opacity={0.9}
            />
            <path
              d={`M170 ${SURF} L170 180 C165 230, 110 310, 90 400 L82 ${DEEP_Y}`}
              fill="none"
              stroke="#fca5a5"
              strokeWidth={1.4}
              opacity={0.95}
            />

            <g opacity={s.zone} aria-hidden="true">
              <rect x={220} y={SURF + 10} width={200} height={42} rx={10} fill="#1a1208" fillOpacity={0.78} stroke="#f59e0b" strokeWidth={1.3} />
              <rect x={240} y={228} width={180} height={36} rx={10} fill="#0a1824" fillOpacity={0.78} stroke="#38bdf8" strokeWidth={1.2} />
              <rect x={220} y={410} width={220} height={42} rx={10} fill="#061820" fillOpacity={0.82} stroke="#0284c7" strokeWidth={1.3} />
              <rect x={420} y={260} width={200} height={56} rx={12} fill="#1a1208" fillOpacity={0.9} stroke="#f97316" strokeWidth={1.6} filter={`url(#${id("glow")})`} />
            </g>

            <g opacity={s.plat} filter={`url(#${id("drop")})`}>
              <path d="M440 128 L800 128 L818 152 L422 152 Z" fill={`url(#${id("hull")})`} />
              <rect x={450} y={95} width={340} height={36} rx={5} fill={`url(#${id("deck")})`} />
              <rect x={460} y={80} width={40} height={16} rx={3} fill="#475569" />
              <rect x={530} y={76} width={22} height={20} rx={2} fill="#334155" />
            </g>

            <g opacity={s.warm} filter={`url(#${id("glow")})`}>
              <path
                d={`M${PIPE_WARM_X} 152 L${PIPE_WARM_X} ${SURF + 55}`}
                stroke={`url(#${id("pw")})`}
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d={`M${PIPE_WARM_X} 152 L${PIPE_WARM_X} ${SURF + 55}`}
                stroke="#fdba74"
                strokeWidth={4}
                strokeLinecap="round"
              />
              <path
                d={`M${PIPE_WARM_X - 14} ${SURF + 55} L${PIPE_WARM_X + 14} ${SURF + 55} L${PIPE_WARM_X + 10} ${SURF + 66} L${PIPE_WARM_X - 10} ${SURF + 66} Z`}
                fill="#ea580c"
              />
              <path d={`M${PIPE_WARM_X} 152 L${PIPE_WARM_X} 55`} stroke="#fb923c" strokeWidth={3.5} opacity={0.75} />
            </g>

            <g opacity={s.cold}>
              <path
                d={`M${PIPE_COLD_X} 152 L${PIPE_COLD_X} ${DEEP_Y}`}
                stroke="#0c4a6e"
                strokeWidth={16}
                strokeLinecap="round"
                opacity={0.55}
              />
              <path
                d={`M${PIPE_COLD_X} 152 L${PIPE_COLD_X} ${DEEP_Y}`}
                stroke={`url(#${id("pc")})`}
                strokeWidth={9}
                strokeLinecap="round"
                filter={`url(#${id("glow")})`}
              />
              <path
                d={`M${PIPE_COLD_X} 152 L${PIPE_COLD_X} ${DEEP_Y}`}
                stroke="#7dd3fc"
                strokeWidth={3.5}
                strokeLinecap="round"
                opacity={0.85}
              />
              <ellipse cx={PIPE_COLD_X} cy={DEEP_Y + 8} rx={18} ry={8} fill="#0284c7" opacity={0.7} />
              <path
                d={`M${PIPE_COLD_X - 16} ${DEEP_Y} L${PIPE_COLD_X + 16} ${DEEP_Y} L${PIPE_COLD_X + 10} ${DEEP_Y + 15} L${PIPE_COLD_X - 10} ${DEEP_Y + 15} Z`}
                fill="#0369a1"
              />
              <g filter={`url(#${id("glow")})`} aria-hidden="true">
                <path d={`M${PIPE_COLD_X} 470 L${PIPE_COLD_X} 430`} stroke="#e0f2fe" strokeWidth={3.2} markerEnd={`url(#${id("m-up")})`} opacity={0.95} />
                <path d={`M${PIPE_COLD_X} 380 L${PIPE_COLD_X} 340`} stroke="#e0f2fe" strokeWidth={3.2} markerEnd={`url(#${id("m-up")})`} opacity={0.9} />
                <path d={`M${PIPE_COLD_X} 290 L${PIPE_COLD_X} 250`} stroke="#e0f2fe" strokeWidth={3.2} markerEnd={`url(#${id("m-up")})`} opacity={0.9} />
                <path d={`M${PIPE_COLD_X} 210 L${PIPE_COLD_X} 170`} stroke="#e0f2fe" strokeWidth={3.2} markerEnd={`url(#${id("m-up")})`} opacity={0.95} />
              </g>
              <path d={`M${PIPE_COLD_X} 152 L${PIPE_COLD_X} 105`} stroke="#38bdf8" strokeWidth={4} opacity={0.85} />
            </g>

            <g opacity={s.evap} filter={`url(#${id("glow")})`}>
              <rect x={460} y={28} width={100} height={52} rx={10} fill="#2a1810" stroke="#f59e0b" strokeWidth={2} />
            </g>

            <g opacity={s.turb} filter={`url(#${id("glow")})`}>
              <rect x={620} y={28} width={130} height={52} rx={10} fill="#0f241c" stroke="#10b981" strokeWidth={2} />
              <circle cx={655} cy={54} r={15} fill="#047857" stroke="#34d399" strokeWidth={2} />
              <text x={655} y={59} fill="#fff" fontSize={13} fontWeight={800} textAnchor="middle" fontFamily="system-ui,sans-serif">
                T
              </text>
              <rect x={680} y={40} width={50} height={26} rx={6} fill="#052e1f" stroke="#34d399" strokeWidth={1.5} />
              <path d="M760 32 L750 50 L758 50 L748 68" fill="none" stroke="#34d399" strokeWidth={2} strokeLinecap="round" opacity={0.85} />
            </g>

            <g opacity={s.nh3h} filter={`url(#${id("glow")})`}>
              <path d="M560 54 L620 54" stroke="#f59e0b" strokeWidth={5} markerEnd={`url(#${id("m-warm")})`} />
              <path d="M560 54 L620 54" stroke="#fde68a" strokeWidth={2} />
            </g>

            <g opacity={s.cond} filter={`url(#${id("glow")})`}>
              <rect x={620} y={92} width={130} height={48} rx={10} fill="#0a1e2c" stroke="#38bdf8" strokeWidth={2} />
            </g>

            <g opacity={s.cond}>
              <path d="M685 80 L685 92" stroke="#94a3b8" strokeWidth={3.5} markerEnd={`url(#${id("m-teal")})`} />
            </g>

            <g opacity={s.pump} filter={`url(#${id("glow")})`}>
              <circle cx={510} cy={116} r={22} fill="#1e293b" stroke="#94a3b8" strokeWidth={2.2} />
              <circle cx={510} cy={116} r={11} fill="#0f172a" stroke="#cbd5e1" strokeWidth={1.5} />
              <text x={510} y={120} fill="#e2e8f0" fontSize={11} fontWeight={800} textAnchor="middle" fontFamily="system-ui,sans-serif">
                P
              </text>
            </g>

            <g opacity={s.pump} filter={`url(#${id("glow")})`}>
              <path d="M620 116 L532 116" stroke="#38bdf8" strokeWidth={3.5} markerEnd={`url(#${id("m-cold")})`} />
            </g>

            <g opacity={s.pump} filter={`url(#${id("glow")})`}>
              <path d="M510 94 L510 80" stroke="#38bdf8" strokeWidth={3.5} markerEnd={`url(#${id("m-cold")})`} />
            </g>

            <g opacity={s.loop} aria-hidden="true">
              <rect x={380} y={SURF + 70} width={280} height={48} rx={12} fill="#0f1d29" fillOpacity={0.92} stroke="#7fd0d6" strokeWidth={1.5} />
            </g>
          </g>
        </>
      )}
    </LokaleRamme>
  );
}
