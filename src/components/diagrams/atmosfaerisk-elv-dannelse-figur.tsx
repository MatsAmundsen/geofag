/**
 * Hvordan atmosfæriske elver dannes — pedagogisk stegfigur på klima-siden
 * /tema/klima/jetstrommer-atmosfaeriske-elver.
 * Tall: om lag 2000 km / 300–500 km (SNL via vaerkatastrofer). Landfall/flom er egen figur
 * (AtmosfaeriskElvFigur) — ikke doblet her.
 * Stil: F-palett fra vaerkatastrofer-kit. Mats godkjente stil 25.10.2026.
 */
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { F, VB } from "./vaerkatastrofer-kit";

const o = (v: number) => r1(Math.max(0, Math.min(1, v)) * 100) / 100;

const TEKST = {
  heading: "Hvordan atmosfæriske elver dannes",
  title:
    "Fire steg. Steg 1: fordamping over varmt hav i subtropene. Steg 2: lavtrykk og kaldfront på midlere bredder, med varm fuktig luft foran fronten. Steg 3: fukten samles i en lang, smal korridor — en atmosfærisk elv, typisk om lag 2000 km lang og 300–500 km bred. Steg 4: korridoren transporteres mot land; når lufta løftes over fjell, kan det bli kraftig nedbør. Full landfall og flom er en egen figur i Værkatastrofer.",
  caption:
    "Skjematisk, ikke i skala. Om lag 2000 km lang og 300–500 km bred (Store norske leksikon via kapitlet Værkatastrofer). Ikke alle atmosfæriske elver har front. Landfall og orografisk flom er egen figur i Værkatastrofer — ikke doblet her.",
};

const STATUS = [
  "Over varmt hav fordamper vann. Vanndampen følger med lufta.",
  "På midlere bredder ligger fuktig luft typisk foran en kaldfront i et lavtrykk.",
  "Transporten samles i en lang, smal korridor — en atmosfærisk elv.",
  "Når korridoren treffer land og fjell, kan det bli kraftig nedbør (orografisk).",
];

type Bilde = { s1: number; s2: number; s3: number; s4: number };

/** Skjules under midt-fade (synlig < 0,85) så N ikke treffer andre stegs linjer. */
function Nordpil({ x, y, synlig }: { x: number; y: number; synlig: number }) {
  if (synlig < 0.85) return null;
  return (
    <g opacity={o(synlig)}>
      <path d={`M${x} ${y + 26} L${x} ${y}`} stroke={F.dempet} strokeWidth={2.5} />
      <path d={`M${x - 7} ${y + 10} L${x} ${y - 3} L${x + 7} ${y + 10} Z`} fill={F.dempet} />
      <text x={x} y={y + 42} textAnchor="middle" fontSize={14} fontWeight={700} fill={F.dempet}>
        N
      </text>
    </g>
  );
}

/** Steg 1: snitt — fordamping over varmt hav (mockup × 0,75 → 960×540). */
function Steg1({ synlig, sek, m }: { synlig: number; sek: number; m: { teal: string } }) {
  const pulse = 0.85 + 0.15 * Math.sin(sek * 2.2);
  const piler: [number, number, number][] = [
    [165, 368, 300],
    [210, 371, 278],
    [255, 369, 266],
    [300, 371, 261],
    [345, 369, 268],
    [390, 372, 285],
    [435, 374, 304],
  ];
  return (
    <g opacity={o(synlig)}>
      {/* sol */}
      <circle cx={135} cy={82} r={52} fill={F.varm} opacity={0.25 * pulse} />
      <circle cx={135} cy={82} r={21} fill="#ffd9a0" />
      <circle cx={135} cy={82} r={16} fill="#f5c078" />
      {/* varm luftsone */}
      <rect x={60} y={210} width={540} height={150} fill={F.varm} opacity={0.18} />
      <ellipse cx={315} cy={255} rx={210} ry={68} fill={F.teal} opacity={0.12} />
      <ellipse cx={315} cy={240} rx={180} ry={41} fill={F.teal} opacity={0.1} />
      {/* hav */}
      <rect x={0} y={375} width={960} height={165} fill={F.hav} />
      <path d="M0 375 Q120 366 240 375 T480 375 T720 375 T960 375 L960 390 L0 390 Z" fill="#1e5570" opacity={0.55} />
      <rect x={90} y={375} width={420} height={14} fill={F.varm} opacity={0.3} />
      <path d="M30 405 Q75 399 120 405 T210 405 T300 405 T390 405 T480 405" fill="none" stroke="#2a6a82" strokeWidth={1.5} opacity={0.7} />
      {/* fordampingspiler */}
      <g>
        {piler.map(([x, y0, y1], i) => {
          const bob = ((sek * 18 + i * 11) % 14) - 7;
          return (
            <path
              key={i}
              d={`M${x} ${y0} L${x} ${r1(y1 + bob * 0.3)}`}
              stroke={F.teal}
              strokeWidth={i >= 2 && i <= 4 ? 2.6 : 2}
              markerEnd={`url(#${m.teal})`}
              opacity={0.7 + i * 0.03}
            />
          );
        })}
      </g>
      {/* damp-prikker */}
      <g fill={F.teal} opacity={0.5}>
        {[
          [188, 322],
          [232, 300],
          [278, 289],
          [322, 281],
          [368, 296],
          [408, 315],
        ].map(([x, y], i) => (
          <circle key={i} cx={r1(x)} cy={r1(y + ((sek * 12 + i * 5) % 8))} r={1.8} />
        ))}
      </g>
      {/* høydehint — venstre kant, kun nær hold, så midt-fade ikke dekker mot Steg2-fyll */}
      {synlig >= 0.85 ? (
        <g opacity={o(synlig)}>
          <line x1={48} y1={90} x2={48} y2={360} stroke={F.linje} strokeWidth={1.5} />
          <text
            x={62}
            y={225}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={F.dempet}
            transform="rotate(-90 62 225)"
          >
            høyde (skjematisk)
          </text>
        </g>
      ) : null}
    </g>
  );
}

/** Steg 2: plan — lavtrykk + kaldfront. */
function Steg2({ synlig, sek, m }: { synlig: number; sek: number; m: { teal: string } }) {
  const drift = (sek * 8) % 20;
  return (
    <g opacity={o(synlig)}>
      <path d="M0 60 L465 60 L360 465 L0 465 Z" fill={F.kald} opacity={0.18} />
      <path d="M465 60 L960 60 L960 465 L360 465 Z" fill={F.varm} opacity={0.16} />
      {/* kaldfront */}
      <path d="M465 75 L375 435" fill="none" stroke={F.kald} strokeWidth={4} strokeLinecap="round" />
      <g fill={F.kald}>
        {[
          [448, 120],
          [429, 188],
          [410, 255],
          [390, 322],
          [374, 382],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} L${x + 22} ${y - 9} L${x + 10} ${y + 21} Z`} />
        ))}
      </g>
      {/* L + isobarer */}
      <ellipse cx={420} cy={210} rx={98} ry={75} fill="none" stroke={F.trykk} strokeWidth={2} opacity={0.5} />
      <ellipse cx={420} cy={210} rx={71} ry={54} fill="none" stroke={F.trykk} strokeWidth={2.2} opacity={0.7} />
      <ellipse cx={420} cy={210} rx={45} ry={33} fill="none" stroke={F.trykk} strokeWidth={2.5} />
      <circle cx={420} cy={210} r={21} fill="#122433" stroke={F.trykk} strokeWidth={2} />
      {synlig >= 0.85 ? (
        <text x={420} y={218} textAnchor="middle" fontSize={22} fontWeight={800} fill={F.tekst} opacity={o(synlig)}>
          L
        </text>
      ) : null}
      {/* fuktstrøm foran fronten */}
      <g>
        <path
          d={`M540 ${360 + drift * 0.2} Q600 300 660 255 Q720 210 780 180`}
          fill="none"
          stroke={F.teal}
          strokeWidth={10}
          strokeLinecap="round"
          opacity={0.22}
        />
        <path
          d="M555 375 Q615 315 675 270 Q735 225 795 191"
          fill="none"
          stroke={F.teal}
          strokeWidth={3}
          strokeLinecap="round"
          markerEnd={`url(#${m.teal})`}
        />
        <path
          d="M525 390 Q592 330 652 289 Q712 244 772 210"
          fill="none"
          stroke={F.teal}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.7}
          markerEnd={`url(#${m.teal})`}
        />
        <path
          d="M570 345 Q630 292 690 248 Q742 210 788 188"
          fill="none"
          stroke={F.teal}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.55}
          markerEnd={`url(#${m.teal})`}
        />
      </g>
      <Nordpil x={50} y={100} synlig={synlig} />
      <text x={24} y={36} textAnchor="start" fontSize={12} fontWeight={600} fill={F.dempet}>
        midlere bredder · sett ovenfra
      </text>
    </g>
  );
}

/** Steg 3: AR-korridor med dimensjoner. */
function Steg3({ synlig, sek, m }: { synlig: number; sek: number; m: { fg: string } }) {
  const t = (sek * 0.2) % 1;
  return (
    <g opacity={o(synlig)}>
      {/* svak front */}
      <path d="M360 90 L285 420" fill="none" stroke={F.kald} strokeWidth={2.5} opacity={0.4} />
      <g fill={F.kald} opacity={0.45}>
        {[
          [344, 135],
          [322, 210],
          [302, 285],
          [284, 352],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} L${x + 18} ${y - 8} L${x + 10} ${y + 16} Z`} />
        ))}
      </g>
      <ellipse cx={330} cy={195} rx={52} ry={39} fill="none" stroke={F.trykk} strokeWidth={2} opacity={0.45} />
      <circle cx={330} cy={195} r={18} fill="#122433" stroke={F.trykk} strokeWidth={2} />
      {synlig >= 0.85 ? (
        <text x={330} y={202} textAnchor="middle" fontSize={18} fontWeight={800} fill={F.tekst} opacity={o(synlig)}>
          L
        </text>
      ) : null}
      {/* AR-bånd */}
      <path
        d="M60 360 C165 345 255 315 345 270 C435 225 540 180 675 150 C750 131 825 120 900 112"
        fill="none"
        stroke={F.lilla}
        strokeWidth={54}
        strokeLinecap="round"
        opacity={0.28}
      />
      <path
        d="M75 356 C180 341 270 311 360 266 C450 221 555 176 690 146 C765 128 832 118 892 111"
        fill="none"
        stroke={F.lilla}
        strokeWidth={21}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        d="M68 338 C173 322 262 292 352 248 C442 202 548 158 682 128 C758 109 825 99 896 92"
        fill="none"
        stroke={F.lilla}
        strokeWidth={1.5}
        strokeDasharray="6 5"
        opacity={0.85}
      />
      <path
        d="M82 379 C188 364 278 334 368 289 C458 244 562 199 698 169 C772 150 840 141 904 134"
        fill="none"
        stroke={F.lilla}
        strokeWidth={1.5}
        strokeDasharray="6 5"
        opacity={0.85}
      />
      {/* strømpiler */}
      {[
        [150, 345, 240, 315],
        [360, 255, 450, 218],
        [570, 172, 660, 146],
      ].map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          d={`M${r1(x1 + t * 8)} ${r1(y1 - t * 3)} L${r1(x2 + t * 8)} ${r1(y2 - t * 3)}`}
          fill="none"
          stroke={F.tekst}
          strokeWidth={2.2}
          markerEnd={`url(#${m.fg})`}
          opacity={0.7 + i * 0.05}
        />
      ))}
      {/* lengdemål */}
      <line x1={105} y1={420} x2={825} y2={150} stroke={F.teal} strokeWidth={1.4} strokeDasharray="4 4" opacity={0.7} />
      <circle cx={105} cy={420} r={3.5} fill={F.teal} />
      <circle cx={825} cy={150} r={3.5} fill={F.teal} />
      {/* breddemål */}
      <line x1={525} y1={158} x2={525} y2={218} stroke={F.lilla} strokeWidth={1.5} />
      <line x1={518} y1={158} x2={532} y2={158} stroke={F.lilla} strokeWidth={1.5} />
      <line x1={518} y1={218} x2={532} y2={218} stroke={F.lilla} strokeWidth={1.5} />
    </g>
  );
}

/** Steg 4: snitt — transport mot land, løft-hint (ikke flom). */
function Steg4({ synlig, sek, m }: { synlig: number; sek: number; m: { teal: string; fg: string } }) {
  const t = (sek * 0.18) % 1;
  return (
    <g opacity={o(synlig)}>
      {/* hav */}
      <rect x={0} y={360} width={585} height={180} fill={F.hav} />
      <path d="M0 360 Q150 352 300 360 T585 360 L585 375 L0 375 Z" fill="#1e5570" opacity={0.5} />
      {/* fjell / land */}
      <path
        d="M585 360 L645 300 L705 225 L765 165 L825 135 L885 150 L960 195 L960 540 L585 540 Z"
        fill={F.land}
        stroke={F.landKant}
        strokeWidth={2}
      />
      <path d="M645 300 L705 225 L765 165 L825 135 L885 150" fill="none" stroke={F.landKant} strokeWidth={2} />
      <path d="M750 176 L765 165 L788 150 L810 139 L825 135 L840 141" fill="none" stroke={F.is} strokeWidth={2.5} opacity={0.5} />
      {/* AR-bånd */}
      <path
        d="M30 285 C150 278 285 270 420 255 C525 244 600 225 675 188"
        fill="none"
        stroke={F.lilla}
        strokeWidth={42}
        strokeLinecap="round"
        opacity={0.32}
      />
      <path
        d="M45 281 C165 274 300 266 435 251 C540 240 615 221 682 186"
        fill="none"
        stroke={F.lilla}
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.8}
      />
      <path
        d="M38 262 C158 255 292 248 428 232 C532 221 608 202 679 169"
        fill="none"
        stroke={F.lilla}
        strokeWidth={1.3}
        strokeDasharray="5 5"
        opacity={0.8}
      />
      <path
        d="M52 304 C172 297 308 289 442 274 C548 262 622 244 690 206"
        fill="none"
        stroke={F.lilla}
        strokeWidth={1.3}
        strokeDasharray="5 5"
        opacity={0.8}
      />
      {/* piler */}
      {[
        [135, 278, 225, 266],
        [315, 262, 405, 251],
        [495, 240, 585, 218],
      ].map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          d={`M${r1(x1 + t * 10)} ${r1(y1 - t * 2)} L${r1(x2 + t * 10)} ${r1(y2 - t * 2)}`}
          fill="none"
          stroke={F.tekst}
          strokeWidth={2.2}
          markerEnd={`url(#${m.fg})`}
          opacity={0.75}
        />
      ))}
      {/* løft-hint */}
      <path d="M660 202 L690 165" fill="none" stroke={F.teal} strokeWidth={2.8} markerEnd={`url(#${m.teal})`} opacity={0.9} />
      <path d="M682 214 L716 172" fill="none" stroke={F.teal} strokeWidth={2.2} markerEnd={`url(#${m.teal})`} opacity={0.7} />
      <ellipse cx={735} cy={146} rx={41} ry={16} fill={F.sky} opacity={0.45} />
      <ellipse cx={754} cy={141} rx={26} ry={12} fill={F.sky} opacity={0.5} />
      <g stroke={F.kald} strokeWidth={1.8} opacity={0.5}>
        {[
          [720, 165],
          [735, 168],
          [750, 164],
          [765, 166],
        ].map(([x, y], i) => (
          <line key={i} x1={x} x2={x - 4} y1={y} y2={y + 14} />
        ))}
      </g>
      {/* pek til egen figur — kun nær hold, så ikke overlapp med steg 3-etikett under fade */}
      {synlig >= 0.85 ? (
        <g opacity={o(synlig)}>
          <rect x={24} y={420} width={390} height={52} rx={8} fill="#122433" stroke={F.linje} strokeWidth={1} />
          <text x={36} y={442} fontSize={12} fontWeight={600} fill={F.dempet}>
            Landfall og orografisk flom: egen figur
          </text>
          <text x={36} y={460} fontSize={11} fontWeight={500} fill={F.dempet}>
            i Værkatastrofer — ikke doblet her
          </text>
        </g>
      ) : null}
    </g>
  );
}

const def: Def<Bilde> = {
  id: "atmosfaerisk-elv-dannelse",
  tekst: TEKST,
  faser: ["Fukt fra varmt hav", "Lavtrykk og kaldfront", "Korridoren dannes", "Transport mot land"],
  status: STATUS,
  bilder: [
    { s1: 0, s2: 0, s3: 0, s4: 0 },
    { s1: 1, s2: 0, s3: 0, s4: 0 },
    { s1: 0, s2: 1, s3: 0, s4: 0 },
    { s1: 0, s2: 0, s3: 1, s4: 0 },
    { s1: 0, s2: 0, s3: 0, s4: 1 },
  ],
  etiketter: [
    // steg 1
    [
      { text: "solinnstråling", x: 135, y: 48, anchor: "middle", color: F.varm, weight: 700, size: 14 },
      { text: "fordamping → vanndamp", x: 550, y: 235, color: F.teal, weight: 800, size: 14 },
      { text: "subtropene · varmt hav", x: 300, y: 450, anchor: "middle", color: F.varm, weight: 800, size: 15 },
      { text: "varm havoverflate avgir vanndamp til lufta", x: 300, y: 472, anchor: "middle", color: F.dempet, size: 12 },
    ],
    // steg 2
    [
      { text: "kald luft", x: 120, y: 150, color: F.kald, weight: 800 },
      { text: "varm luft", x: 780, y: 400, anchor: "middle", color: F.varm, weight: 800 },
      { text: "kaldfront", x: 520, y: 165, color: F.kald, weight: 800, size: 13, at: [430, 240], badge: [500, 180] },
      { text: "lavtrykk", x: 420, y: 150, anchor: "middle", color: F.trykk, weight: 700, size: 12 },
      {
        text: "varm, fuktig luft foran fronten",
        x: 700,
        y: 100,
        anchor: "middle",
        color: F.teal,
        weight: 800,
        size: 13,
        at: [680, 280],
        badge: [700, 110],
      },
    ],
    // steg 3
    [
      { text: "atmosfærisk elv", x: 780, y: 55, color: F.lilla, weight: 800, size: 14 },
      { text: "om lag 2000 km lang", x: 240, y: 450, anchor: "middle", color: F.teal, weight: 800, size: 13 },
      { text: "300–500 km bred", x: 620, y: 290, color: F.lilla, weight: 800, size: 13 },
      {
        text: "fukt samles i smal korridor foran kaldfronten",
        x: 40,
        y: 400,
        color: F.dempet,
        size: 12,
      },
      {
        text: "Tall: SNL via Værkatastrofer · typisk om lag",
        x: 940,
        y: 420,
        anchor: "end",
        color: F.dempet,
        size: 11,
      },
    ],
    // steg 4
    [
      { text: "hav", x: 225, y: 408, anchor: "middle", color: F.dempet, weight: 700, size: 14 },
      { text: "fjell / kyst", x: 810, y: 315, anchor: "middle", color: F.dempet, weight: 700, size: 14 },
      { text: "atmosfærisk elv", x: 160, y: 210, color: F.lilla, weight: 800, size: 13 },
      {
        text: "lufta løftes over fjell (hint)",
        x: 750,
        y: 105,
        anchor: "middle",
        color: F.teal,
        weight: 800,
        size: 13,
        at: [700, 180],
        badge: [750, 120],
      },
    ],
  ] as Lab[][],
  keys: [
    { text: "fukt / AR", color: F.lilla, kind: "line" },
    { text: "fordamping", color: F.teal, kind: "line" },
    { text: "kaldfront", color: F.kald, kind: "front", front: "kald" },
  ],
  notes: ["Skjematisk · ikke i skala", "Ikke alle AR har front"],
  viewBox: VB,
  tegn: (s, { m, sek }) => (
    <g>
      {/* Én himmel her — ikke per steg — så forrige stegs tekst ikke dekkes under fade */}
      <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
      <Steg1 synlig={s.s1} sek={sek} m={m} />
      <Steg2 synlig={s.s2} sek={sek} m={m} />
      <Steg3 synlig={s.s3} sek={sek} m={m} />
      <Steg4 synlig={s.s4} sek={sek} m={m} />
    </g>
  ),
};

export const AtmosfaeriskElvDannelseFigur = lagFigur(def);
