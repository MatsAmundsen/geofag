/**
 * OffshoreWindShelf: batymetri Nordsjøen → Norskerenna → norskekysten, bunnfast monopel på grunn
 * sokkel, flytende Spar (Hywind Tampen) med fortøyningsliner og sugeankere i dypet, og sjøkabel til land.
 * Fem steg (StegFigur via LokaleRamme). Erstatter widget-mappingen til OffshoreWindShelfDiagram;
 * OffshoreWindShelfDiagram beholdes i energy.tsx (eksamen).
 * Følger energi-hav-luft.md (Havvind) og Geo-godkjent v2-mockup (26.10.2026).
 * Tall: < 50 m, Norskerenna 200–350 m, flytende opp til 800 m (30–45 m fjernet etter Geo-fagsjekk PR #287).
 * Halvt nedsenkbar plattform tegnes ikke (bildeteksten sier det). Spar-bøyen er «type Hywind»; Hywind
 * Tampen forsyner Snorre og Gullfaks, ikke land (bildeteksten).
 */
import { useEffect, useId, useRef } from "react";
import { clamp } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { OFFSHORE_TEKST } from "./energi-tekst";
import { F, LokaleRamme, useLokaleTidslinje, type Lab } from "./lokale-kit";

const FASER = ["Batymetri", "Bunnfast", "For dypt", "Flytende", "Sjøkabel"];

const STATUS = [
  "Kontinentalsokkelen er grunn i sørlige Nordsjø. Utenfor norskekysten skjærer den dype Norskerenna seg ned i sokkelen.",
  "Der sokkelen er grunn (under 50 m) kan turbinen stå på en monopel pælet ned i sedimentene.",
  "I Norskerenna (200–350 m) er det for dypt for bunnfaste fundamenter. Her må turbinene flyte.",
  "Flytende Spar-bøyer (som Hywind Tampen) forankres med fortøyningsliner og sugeankere — aktuelle på dyp opp til 800 m.",
  "Høyspent sjøkabel fører strømmen langs bunnen inn til transformator og sentralnettet på land.",
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { bathy: 0, mono: 0, renna: 0, spar: 0, kabel: 0 },
  { bathy: 1, mono: 0, renna: 0, spar: 0, kabel: 0 },
  { bathy: 1, mono: 1, renna: 0, spar: 0, kabel: 0 },
  { bathy: 1, mono: 1, renna: 1, spar: 0, kabel: 0 },
  { bathy: 1, mono: 1, renna: 0, spar: 1, kabel: 0 },
  { bathy: 1, mono: 1, renna: 0, spar: 1, kabel: 1 },
];

const COL = {
  teal: "#5eead4",
  kald: "#7cb8e8",
  kaldLys: "#94c5e0",
  spar: "#0284c7",
  sand: "#fbbf24",
  sandLys: "#fde68a",
  varm: "#e8a46a",
  line: "#94a3b8",
  land: "#c5d9c8",
  dempet: "#9fb0bd",
  tekst: "#e8eef2",
};

/** Layout i VB 960×540. */
const SURF = 160;
const SHELF_Y = 225;
const RENNA_Y = 430;
const MONO_X = 130;
const SPAR_X = 520;
const HUB_Y = 62;

/** Havbunnen: grunn sokkel → sokkelstup → Norskerenna → stigning mot kysten → land. */
const BUNN = `M0 ${SHELF_Y} L290 ${SHELF_Y} C350 ${SHELF_Y}, 380 ${RENNA_Y}, 450 ${RENNA_Y} L600 ${RENNA_Y} C680 ${RENNA_Y}, 720 230, 770 ${SURF}`;
const LAND = "L800 150 L840 142 Q 900 132 960 134";
const KABEL = `M${MONO_X + 6} ${SHELF_Y - 3} L290 ${SHELF_Y - 3} C350 ${SHELF_Y - 3}, 380 ${RENNA_Y - 3}, 450 ${RENNA_Y - 3} L600 ${RENNA_Y - 3} C680 ${RENNA_Y - 3}, 720 227, 770 ${SURF - 3} L800 147 L820 141`;
const SPAR_KABEL = `M${SPAR_X} 300 C${SPAR_X} 370, ${SPAR_X + 2} 405, ${SPAR_X + 8} ${RENNA_Y - 3}`;
const LINE_V = `M${SPAR_X - 8} 240 C${SPAR_X - 14} 330, ${SPAR_X - 30} 415, ${SPAR_X - 54} ${RENNA_Y - 2}`;
const LINE_H = `M${SPAR_X + 8} 240 C${SPAR_X + 14} 330, ${SPAR_X + 40} 415, ${SPAR_X + 64} ${RENNA_Y - 2}`;
const ANKER_V = SPAR_X - 54;
const ANKER_H = SPAR_X + 64;

/** Rotor med tre avsmalnende blader (fyll, ikke strek). */
function Rotor({ x, y, vinkel, r = 46 }: { x: number; y: number; vinkel: number; r?: number }) {
  const blad = `M -2.6 0 C -3.4 ${-r * 0.35}, -1.6 ${-r * 0.8}, 0 ${-r} C 1.6 ${-r * 0.8}, 3.6 ${-r * 0.35}, 2.6 0 Z`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${vinkel})`} aria-hidden="true">
      {[0, 120, 240].map((a) => (
        <path key={a} d={blad} transform={`rotate(${a})`} fill="#f1f5f9" />
      ))}
      <circle r={6.5} fill="#cbd5e1" />
      <circle r={2.4} fill="#64748b" />
    </g>
  );
}

/** Tårn med nacelle (avsmalnende, fyll). */
function Taarn({ x, topp, bunn, gradient }: { x: number; topp: number; bunn: number; gradient: string }) {
  return (
    <g aria-hidden="true">
      <path d={`M${x - 2.5} ${topp} L${x + 2.5} ${topp} L${x + 4.5} ${bunn} L${x - 4.5} ${bunn} Z`} fill={gradient} />
      <rect x={x - 9} y={topp - 5} width={16} height={9} rx={3} fill="#cbd5e1" />
    </g>
  );
}

export function OffshoreFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
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
  const vinkel = reduced ? 0 : (tl.sek * 48) % 360;
  // Steg 3→4: Norskerenna-boksen tones helt ut (første 40 %) før Spar, liner og etiketter tones inn
  // (siste 55 %), så etikettene aldri ligger oppå fortøyningslinene under overgangen.
  const rennaE = clamp((s.renna - 0.6) / 0.4);
  const sparE = clamp((s.spar - 0.45) / 0.55);

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

  // Alltid: vindfelt og dybdeskala
  lab("Sterkt, uforstyrret vindfelt over åpent hav", 330, 26, COL.teal, { size: 12, weight: 700, narrowHide: true });
  lab("0 m · overflate", 32, SURF - 7, COL.dempet, { size: 11, weight: 600, anchor: "start", narrowHide: true });
  lab("< 50 m", 32, SHELF_Y - 9, COL.sand, { size: 12, weight: 700, anchor: "start", narrowHide: true });
  lab("200–350 m", 32, RENNA_Y + 4, COL.kald, { size: 12, weight: 700, anchor: "start", narrowHide: true });

  if (s.bathy > 0.4) {
    const op = hold(s.bathy);
    lab("Grunn sokkel", 150, 300, COL.sandLys, { size: 13, weight: 800, opacity: op, badge: [150, 304] });
    lab("sørlige Nordsjø · under 50 m", 150, 317, COL.varm, { size: 11, weight: 600, opacity: op, narrowHide: true });
    lab("Skråning mot Norskerenna", 350, 352, COL.varm, { size: 12, weight: 700, anchor: "end", opacity: op, badge: [300, 352] });
    lab("Norskerenna", 525, 480, COL.kald, { size: 13, weight: 800, opacity: op, badge: [525, 484] });
    lab("glasial dal · 200–350 m dyp", 525, 497, COL.kaldLys, { size: 11, weight: 600, opacity: op, narrowHide: true });
    lab("Norge", 900, 196, COL.land, { size: 13, weight: 800, opacity: op, badge: [900, 191] });
  }
  if (s.mono > 0.4) {
    const op = hold(s.mono);
    lab("BUNNFAST", 250, 102, COL.kald, { size: 13, weight: 800, opacity: op, badge: [250, 106] });
    lab("monopel · dyp < 50 m", 250, 119, COL.dempet, { size: 11, weight: 600, opacity: op, narrowHide: true });
    lab("pælet i sediment", MONO_X + 18, 250, "#c4b08a", { size: 11, weight: 700, anchor: "start", opacity: op, narrowHide: true });
    lab("Danmark og Doggerbank", MONO_X + 18, 266, "#8fa3b0", { size: 11, weight: 600, anchor: "start", opacity: op, narrowHide: true });
  }
  if (rennaE > 0.4) {
    const op = hold(rennaE);
    lab("For dypt for bunnfast", 525, 292, COL.kald, { size: 14, weight: 800, opacity: op, badge: [525, 303] });
    lab("Norskerenna 200–350 m", 525, 310, COL.dempet, { size: 12, weight: 600, opacity: op, narrowHide: true });
    lab("utenfor norskekysten", 525, 326, COL.kaldLys, { size: 11, weight: 600, opacity: op, narrowHide: true });
  }
  if (sparE > 0.4) {
    const op = hold(sparE);
    lab("FLYTENDE SPAR", 645, 102, COL.kald, { size: 13, weight: 800, opacity: op, badge: [645, 106] });
    lab("type Hywind", 645, 119, COL.dempet, { size: 11, weight: 600, opacity: op, narrowHide: true });
    lab("Spar-bøye med ballast", SPAR_X - 22, 206, COL.kald, { size: 11, weight: 700, anchor: "end", opacity: op, badge: [455, 214] });
    lab("flytende · opp til 800 m", SPAR_X - 22, 222, "#8fa3b0", { size: 11, weight: 600, anchor: "end", opacity: op, narrowHide: true });
    lab("fortøyningsliner", SPAR_X + 34, 318, COL.line, { size: 11, weight: 700, anchor: "start", opacity: op, badge: [595, 330] });
    lab("sugeanker", ANKER_V, 454, COL.sand, { size: 11, weight: 700, opacity: op, narrowHide: true });
    lab("sugeanker", ANKER_H, 454, COL.sand, { size: 11, weight: 700, opacity: op, badge: [650, 475] });
  }
  if (s.kabel > 0.4) {
    const op = hold(s.kabel);
    lab("Høyspent sjøkabel", 855, 300, COL.sandLys, { size: 13, weight: 800, opacity: op, badge: [855, 304] });
    lab("langs bunnen til land", 855, 317, COL.varm, { size: 11, weight: 600, opacity: op, narrowHide: true });
    lab("TRAFO", 843, 92, COL.sandLys, { size: 12, weight: 800, opacity: op, badge: [843, 62] });
    lab("Sentralnettet", 912, 160, COL.tekst, { size: 11, weight: 700, opacity: op, narrowHide: true });
  }

  // Nummerskilt på smal skjerm: faste plasser (i platene eller ved objektet), klar av streker også ved 320 px.

  const status = STATUS[Math.max(0, fase - 1)];

  return (
    <LokaleRamme
      tekst={OFFSHORE_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={status}
      svgRef={ref}
      labels={labels}
      data="offshore-wind-shelf"
      etikettRader={11}
      notes={["Skjematisk snitt, dybden er ikke i skala"]}
      keys={[
        { text: "bunnfast monopel · grunt vann", color: COL.kald, kind: "fill" },
        { text: "flytende Spar · opp til 800 m", color: COL.spar, kind: "fill" },
        { text: "fortøyningsliner", color: COL.line, kind: "dash" },
        { text: "sjøkabel og sugeanker", color: COL.sand, kind: "dash" },
      ]}
    >
      {() => (
        <>
          <defs>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1d29" />
              <stop offset="55%" stopColor="#122636" />
              <stop offset="100%" stopColor="#173247" />
            </linearGradient>
            <linearGradient id={id("haze")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
              <stop offset="70%" stopColor="#94a3b8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.16" />
            </linearGradient>
            <radialGradient id={id("windglow")} cx="40%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("ocean")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c3a52" />
              <stop offset="22%" stopColor="#0a3050" />
              <stop offset="60%" stopColor="#072640" />
              <stop offset="100%" stopColor="#04121f" />
            </linearGradient>
            <linearGradient id={id("sheen")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7cb8e8" stopOpacity="0.24" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("ray")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("rock")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d4654" />
              <stop offset="50%" stopColor="#2a3140" />
              <stop offset="100%" stopColor="#171c25" />
            </linearGradient>
            <linearGradient id={id("sed")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b6914" />
              <stop offset="100%" stopColor="#4a380d" />
            </linearGradient>
            <linearGradient id={id("land")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a6354" />
              <stop offset="45%" stopColor="#3d5344" />
              <stop offset="100%" stopColor="#263429" />
            </linearGradient>
            <linearGradient id={id("steel")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id={id("pile")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id={id("sparbody")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
            <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={id("blur")} x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id={id("blurS")} x="-25%" y="-40%" width="150%" height="180%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id={id("drop")} x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#020617" floodOpacity="0.5" />
            </filter>
            <marker id={id("m-teal")} viewBox="0 0 14 14" refX="11" refY="7" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 1.4 L13 7 L0 12.6 z" fill="#5eead4" />
            </marker>
            <clipPath id={id("clip")}>
              <rect x={0} y={0} width={960} height={540} rx={8} />
            </clipPath>
          </defs>

          <g clipPath={`url(#${id("clip")})`}>
            {/* Himmel med dis og skyer */}
            <rect x={0} y={0} width={960} height={SURF} fill={`url(#${id("sky")})`} />
            <ellipse cx={360} cy={50} rx={320} ry={70} fill={`url(#${id("windglow")})`} filter={`url(#${id("blur")})`} />
            <rect x={0} y={SURF - 70} width={960} height={70} fill={`url(#${id("haze")})`} />
            <g opacity={0.28} filter={`url(#${id("blurS")})`} aria-hidden="true">
              <ellipse cx={60} cy={110} rx={60} ry={12} fill="#94a3b8" />
              <ellipse cx={400} cy={120} rx={70} ry={11} fill="#cbd5e1" />
              <ellipse cx={780} cy={70} rx={80} ry={14} fill="#64748b" />
              <ellipse cx={900} cy={40} rx={50} ry={10} fill="#94a3b8" />
            </g>

            {/* Vindpiler i høyden */}
            <g opacity={0.85} aria-hidden="true">
              <path d="M200 44 L298 44" stroke="#5eead4" strokeWidth={2.4} markerEnd={`url(#${id("m-teal")})`} opacity={0.7} />
              <path d="M340 44 L448 44" stroke="#5eead4" strokeWidth={2.8} markerEnd={`url(#${id("m-teal")})`} opacity={0.85} />
              <path d="M590 44 L712 44" stroke="#5eead4" strokeWidth={3} markerEnd={`url(#${id("m-teal")})`} opacity={0.9} />
            </g>

            {/* Hav */}
            <rect x={0} y={SURF} width={960} height={540 - SURF} fill={`url(#${id("ocean")})`} />
            <rect x={0} y={SURF} width={960} height={70} fill={`url(#${id("sheen")})`} />
            <g aria-hidden="true">
              <path d={`M60 ${SURF} L120 ${SURF} L220 420 L120 420 Z`} fill={`url(#${id("ray")})`} />
              <path d={`M330 ${SURF} L380 ${SURF} L470 470 L380 470 Z`} fill={`url(#${id("ray")})`} />
              <path d={`M600 ${SURF} L640 ${SURF} L700 380 L640 380 Z`} fill={`url(#${id("ray")})`} />
            </g>
            <path
              d={`M0 ${SURF} Q 90 ${SURF - 5}, 180 ${SURF} T 360 ${SURF} T 540 ${SURF} T 720 ${SURF} T 780 ${SURF}`}
              fill="none"
              stroke="#7cb8e8"
              strokeWidth={1.6}
              opacity={0.5}
            />

            {/* Berggrunn og land */}
            <path d={`${BUNN} ${LAND} L960 540 L0 540 Z`} fill={`url(#${id("rock")})`} />
            <g opacity={0.12} filter={`url(#${id("blur")})`} aria-hidden="true">
              <ellipse cx={120} cy={400} rx={110} ry={16} fill="#64748b" />
              <ellipse cx={300} cy={480} rx={140} ry={14} fill="#475569" />
              <ellipse cx={620} cy={510} rx={180} ry={14} fill="#64748b" />
              <ellipse cx={860} cy={420} rx={110} ry={16} fill="#475569" />
            </g>
            <path d={`M770 ${SURF} ${LAND} L960 250 Q 880 262 820 238 Q 790 222 742 230 C 752 208, 762 186, 770 ${SURF} Z`} fill={`url(#${id("land")})`} />
            <path d="M800 150 Q 830 128 860 140 Q 900 112 940 132" fill="none" stroke="#5a7a64" strokeWidth={2} opacity={0.75} />
            <path d={BUNN} fill="none" stroke={`url(#${id("sed")})`} strokeWidth={5} strokeLinecap="round" />

            {/* Dybdeskala */}
            <g aria-hidden="true">
              <line x1={22} y1={SURF} x2={22} y2={RENNA_Y} stroke="#475569" strokeWidth={1.5} />
              <circle cx={22} cy={SURF} r={3.5} fill="#7cb8e8" />
              <circle cx={22} cy={SHELF_Y} r={3.5} fill="#fbbf24" />
              <circle cx={22} cy={RENNA_Y} r={3.5} fill="#7cb8e8" />
            </g>

            {/* Etikettplater, steg 1 */}
            <g opacity={s.bathy} aria-hidden="true">
              <rect x={70} y={282} width={160} height={44} rx={10} fill="#1a1408" fillOpacity={0.82} stroke="#fbbf24" strokeWidth={1.3} />
              <rect x={440} y={461} width={170} height={46} rx={10} fill="#061820" fillOpacity={0.85} stroke="#7cb8e8" strokeWidth={1.3} />
              <rect x={866} y={178} width={68} height={26} rx={8} fill="#1a241c" fillOpacity={0.85} stroke="#5a7a64" strokeWidth={1.2} />
            </g>

            {/* Steg 2: bunnfast monopel */}
            <g opacity={s.mono} filter={`url(#${id("drop")})`}>
              <rect x={MONO_X - 6} y={SURF - 12} width={12} height={SHELF_Y + 30 - (SURF - 12)} fill={`url(#${id("pile")})`} />
              <rect x={MONO_X - 8} y={SURF - 14} width={16} height={16} rx={2} fill="#fbbf24" />
              <rect x={MONO_X - 10} y={SURF - 16} width={20} height={4} rx={1} fill="#64748b" />
              <Taarn x={MONO_X} topp={HUB_Y} bunn={SURF - 16} gradient={`url(#${id("steel")})`} />
              <Rotor x={MONO_X} y={HUB_Y} vinkel={vinkel} />
              <rect x={185} y={84} width={130} height={44} rx={10} fill="#0f1d29" fillOpacity={0.92} stroke="#7cb8e8" strokeWidth={1.5} />
            </g>

            {/* Steg 3: Norskerenna, for dypt for bunnfast */}
            <g opacity={rennaE} aria-hidden="true">
              <rect x={420} y={172} width={210} height={RENNA_Y - 4 - 172} rx={12} fill="#0284c7" fillOpacity={0.08} stroke="#7cb8e8" strokeWidth={1.5} strokeDasharray="6 4" />
              <rect x={432} y={270} width={186} height={66} rx={12} fill="#061820" fillOpacity={0.92} stroke="#7cb8e8" strokeWidth={1.6} filter={`url(#${id("glow")})`} />
            </g>

            {/* Steg 4: flytende Spar med fortøyningsliner og sugeankere */}
            <g opacity={sparE} filter={`url(#${id("drop")})`}>
              <path d={LINE_V} fill="none" stroke={COL.line} strokeWidth={2} strokeDasharray="5 4" />
              <path d={LINE_H} fill="none" stroke={COL.line} strokeWidth={2} strokeDasharray="5 4" />
              <rect x={ANKER_V - 7} y={RENNA_Y - 6} width={14} height={16} rx={2} fill="#fbbf24" />
              <rect x={ANKER_H - 7} y={RENNA_Y - 6} width={14} height={16} rx={2} fill="#fbbf24" />
              <rect x={SPAR_X - 9} y={SURF - 14} width={18} height={300 - (SURF - 14)} rx={8} fill={`url(#${id("sparbody")})`} />
              <rect x={SPAR_X - 7} y={258} width={14} height={38} rx={5} fill="#0c4a6e" />
              <ellipse cx={SPAR_X} cy={SURF} rx={15} ry={4} fill="none" stroke="#5eead4" strokeWidth={1.5} opacity={0.7} />
              <Taarn x={SPAR_X} topp={HUB_Y} bunn={SURF - 14} gradient={`url(#${id("steel")})`} />
              <Rotor x={SPAR_X} y={HUB_Y} vinkel={vinkel + 40} />
              <rect x={572} y={84} width={146} height={44} rx={10} fill="#0f1d29" fillOpacity={0.92} stroke="#38bdf8" strokeWidth={1.5} />
            </g>

            {/* Steg 5: sjøkabel, trafo og sentralnettet */}
            <g opacity={s.kabel}>
              <path d={KABEL} fill="none" stroke="#fbbf24" strokeWidth={3.4} strokeDasharray="8 5" filter={`url(#${id("glow")})`} />
              <path d={SPAR_KABEL} fill="none" stroke="#fbbf24" strokeWidth={2.4} strokeDasharray="6 4" opacity={0.9} />
              <rect x={780} y={282} width={150} height={44} rx={10} fill="#1a1408" fillOpacity={0.88} stroke="#fbbf24" strokeWidth={1.3} />
              <rect x={820} y={106} width={46} height={34} rx={6} fill="#1a1408" stroke="#fbbf24" strokeWidth={1.8} filter={`url(#${id("glow")})`} />
              <path d="M829 116 h28 M829 123 h28 M829 130 h28" stroke="#fbbf24" strokeWidth={1.6} opacity={0.8} />
              <path d="M866 120 L900 112 L950 108" fill="none" stroke="#fde68a" strokeWidth={1.4} opacity={0.75} />
              <path d="M900 112 L896 140 M900 112 L904 140 M950 108 L946 136 M950 108 L954 136" stroke="#cbd5e1" strokeWidth={1.2} opacity={0.7} />
            </g>
          </g>
        </>
      )}
    </LokaleRamme>
  );
}
