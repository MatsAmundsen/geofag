/**
 * Stegfigurer i kapitlet Værkatastrofer (Geofag 2), bolk 2 i figurplanen: C supercelle, F bombesyklon,
 * G atmosfærisk elv, J varselkjeden under Hans, K Beauforts trapp fra storm til orkan.
 * Egne SVG-tegninger. Tallene og kildene står i vaerkatastrofer-tekst.ts. Alt annet er relativt.
 */
import { type Def, type Lab, type P } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { Strom } from "./vaerkatastrofer-figurer";
import { F, VB } from "./vaerkatastrofer-kit";
import {
  BEAUFORT_STATUS,
  BEAUFORT_TEKST,
  BOMBE_STATUS,
  BOMBE_TEKST,
  ELV_STATUS,
  ELV_TEKST,
  HANS_STATUS,
  HANS_TEKST,
  SUPERCELLE_STATUS,
  SUPERCELLE_TEKST,
} from "./vaerkatastrofer-tekst";

const o = (v: number) => r1(Math.max(0, Math.min(1, v)) * 100) / 100;

function Nordpil({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y + 34} L${x} ${y}`} stroke={F.dempet} strokeWidth={3} />
      <path d={`M${x - 9} ${y + 12} L${x} ${y - 4} L${x + 9} ${y + 12} Z`} fill={F.dempet} />
      <text x={x} y={y + 56} textAnchor="middle" fontSize={20} fontWeight={700} fill={F.dempet}>N</text>
    </g>
  );
}

/* ---------- C: supercelle sett ovenfra ---------- */

const C_U: P = [430, 300];
const C_INN: P[] = [[860, 500], [700, 420], [520, 340]];
const C_RFD = "M352 214 Q262 300 330 392 Q420 452 520 376";
const C_FFD_REGN: P[] = Array.from({ length: 34 }, (_, i) => [560 + ((i * 53) % 260), 120 + ((i * 37) % 170)] as P);

type CBilde = { skjaer: number; meso: number; ned: number; tornado: number };

const supercelle: Def<CBilde> = {
  id: "supercelle",
  tekst: SUPERCELLE_TEKST,
  faser: ["Vindskjæring", "Mesosyklon", "Nedsynk", "Tornado"],
  status: SUPERCELLE_STATUS,
  bilder: [
    { skjaer: 0, meso: 0, ned: 0, tornado: 0 },
    { skjaer: 1, meso: 0, ned: 0, tornado: 0 },
    { skjaer: 1, meso: 1, ned: 0, tornado: 0 },
    { skjaer: 1, meso: 1, ned: 1, tornado: 0 },
    { skjaer: 1, meso: 1, ned: 1, tornado: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "sett ovenfra", x: 40, y: 44, color: F.dempet, size: 14 },
      { text: "vind med høyden", x: 40, y: 330, color: F.teal, weight: 800, size: 14 },
      { text: "varm, fuktig luft inn", x: 900, y: 520, anchor: "end", color: F.teal, weight: 800 },
    ];
    if (f >= 2) l.push({ text: "mesosyklon: roterende oppdrift", x: 230, y: 110, anchor: "middle", color: F.varm, weight: 800, at: [410, 260], badge: [380, 200] });
    if (f >= 3) {
      l.push({ text: "framre nedsynk (FFD): regnkjølt, mest nedbør", x: 920, y: 80, anchor: "end", color: F.kald, weight: 800, at: [690, 160], badge: [700, 120] });
      l.push({ text: "bakre nedsynk (RFD): gir krokekkoet", x: 200, y: 486, anchor: "middle", color: F.vind, weight: 800, at: [330, 392], badge: [300, 430] });
    }
    if (f >= 4) {
      l.push({ text: "veggsky: sterkest oppdrift", x: 700, y: 320, color: F.sky, weight: 800, at: [470, 300], badge: [520, 300] });
      l.push({ text: "tornado: ved veggskya, nord i hesteskoen", x: 920, y: 380, anchor: "end", color: "#ffd0c8", weight: 800, at: [404, 238], badge: [452, 222] });
    }
    return l;
  }),
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const [ux, uy] = C_U;
    const vinkel = (sek * 40) % 360;
    const vind: [number, number, string][] = [
      [0.35, -1, "nær bakken"],
      [1, -0.7, "midt i"],
      [1, 0.05, "høyt oppe"],
    ];
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <Nordpil x={900} y={150} />
        {/* vindskjæring: piler fra samme punkt, dreier og blir lengre med høyden */}
        <g opacity={o(s.skjaer)}>
          {vind.map(([dx, dy, t], i) => {
            const L = 46 + i * 34;
            const n = Math.hypot(dx, dy);
            return (
              <g key={t}>
                <path d={`M70 440 L${r1(70 + (dx / n) * L)} ${r1(440 + (dy / n) * L)}`} stroke={F.teal} strokeWidth={4} markerEnd={`url(#${m.teal})`} opacity={0.5 + i * 0.25} />
              </g>
            );
          })}
        </g>
        <Strom pts={C_INN} farge={F.teal} mk={m.teal} synlig={s.skjaer} sek={sek} />
        {/* framre nedsynk: regnkjølt nedbørområde nedstrøms */}
        <g opacity={o(s.ned)}>
          <ellipse cx={690} cy={200} rx={190} ry={105} transform="rotate(-18 690 200)" fill={F.kald} opacity={0.32} />
          {C_FFD_REGN.map(([x, y], i) => {
            const yy = y + ((sek * 30 + i * 7) % 20);
            return <line key={i} x1={x} x2={x - 4} y1={r1(yy)} y2={r1(yy + 10)} stroke={F.kald} strokeWidth={2} />;
          })}
        </g>
        {/* bakre nedsynk: hesteskoformet glipe */}
        <path d={C_RFD} fill="none" stroke={F.vind} strokeWidth={30} strokeLinecap="round" opacity={o(0.45 * s.ned)} />
        {s.ned > 0.02 && <path d={C_RFD} fill="none" stroke={F.himmel} strokeWidth={10} strokeLinecap="round" strokeDasharray="2 14" opacity={o(s.ned)} />}
        {/* oppdrift og mesosyklon */}
        <circle cx={ux} cy={uy} r={70} fill={F.varm} opacity={o(0.12 + 0.3 * s.meso)} />
        <g transform={`rotate(${r1(-vinkel)} ${ux} ${uy})`} opacity={o(s.meso)}>
          {[0, 120, 240].map((a) => (
            <path key={a} d={`M${ux + 58} ${uy} A58 58 0 0 0 ${r1(ux + 58 * Math.cos(-1.4))} ${r1(uy + 58 * Math.sin(-1.4))}`} transform={`rotate(${a} ${ux} ${uy})`} fill="none" stroke={F.varm} strokeWidth={5} markerEnd={`url(#${m.warm})`} />
          ))}
        </g>
        {/* veggsky og tornado */}
        <g opacity={o(s.tornado)}>
          <circle cx={ux + 10} cy={uy - 10} r={44} fill={F.sky} opacity={0.5} />
          <g transform={`rotate(${r1(-vinkel * 3)} 404 238)`}>
            <path d="M404 238 m-16 0 a16 16 0 1 0 16 -16 M404 238 m-8 0 a8 8 0 1 0 8 -8" fill="none" stroke="#ffd0c8" strokeWidth={4} />
          </g>
        </g>
      </g>
    );
  },
};

/* ---------- F: bombesyklon over et døgn ---------- */

const F_L: P = [600, 262];
const F_JET_Y = 300;

type FBilde = { front: number; jet: number; dyp: number; tid: number };

const bombe: Def<FBilde> = {
  id: "bombesyklon",
  tekst: BOMBE_TEKST,
  faser: ["Front", "Jetstrøm", "Trykkfall", "24 timer"],
  status: BOMBE_STATUS,
  bilder: [
    { front: 0, jet: 0, dyp: 0, tid: 0 },
    { front: 1, jet: 0, dyp: 0, tid: 0 },
    { front: 1, jet: 1, dyp: 0.1, tid: 0.2 },
    { front: 1, jet: 1, dyp: 0.6, tid: 0.6 },
    { front: 1, jet: 1, dyp: 1, tid: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "kald luft", x: 60, y: 90, color: F.kald, weight: 800 },
      { text: "varm luft", x: 900, y: 470, anchor: "end", color: F.varm, weight: 800 },
      { text: "0 t", x: 120, y: 528, anchor: "middle", color: F.dempet, size: 14 },
      { text: "24 t", x: 840, y: 528, anchor: "middle", color: F.dempet, size: 14 },
    ];
    if (f >= 2) {
      l.push({ text: "jetstrøm høyt oppe", x: 60, y: F_JET_Y - 34, color: F.lilla, weight: 800 });
      l.push({ text: "venstre utgang: lufta sprer seg i høyden", x: 920, y: 60, anchor: "end", color: F.lilla, weight: 800, at: [640, 230], badge: [690, 200] });
    }
    if (f >= 3) l.push({ text: "trykket faller, isobarene blir tettere", x: 300, y: 450, anchor: "middle", color: F.trykk, weight: 800, at: [540, 300], badge: [500, 380] });
    if (f >= 4) l.push({ text: "minst 24 hPa på 24 timer (ved 60° N)", x: 920, y: 120, anchor: "end", color: F.tekst, weight: 800, at: [590, 244], badge: [520, 150] });
    return l;
  }),
  keys: [
    { text: "isobar", color: F.trykk, kind: "line" },
    { text: "jetstrøm", color: F.lilla, kind: "line" },
  ],
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const [lx, ly] = F_L;
    const n = 2 + Math.round(4 * s.dyp);
    const avstand = 46 - 18 * s.dyp;
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <rect x={0} y={0} width={960} height={250} fill={F.kald} opacity={0.08} />
        <rect x={0} y={330} width={960} height={160} fill={F.varm} opacity={0.08} />
        <Nordpil x={900} y={170} />
        {/* fronter */}
        <g opacity={o(s.front)}>
          <path d={`M${lx} ${ly} Q520 360 380 440`} fill="none" stroke={F.kald} strokeWidth={4} />
          <path d={`M${lx} ${ly} Q700 300 800 350`} fill="none" stroke={F.vind} strokeWidth={4} />
        </g>
        {/* jetstrøm med sterkeste vindfelt og venstre utgang */}
        <g opacity={o(s.jet)}>
          <path d="M40 330 Q300 310 470 300 Q700 290 920 250" fill="none" stroke={F.lilla} strokeWidth={6} markerEnd={`url(#${m.fg})`} opacity={0.7} />
          <ellipse cx={420} cy={F_JET_Y} rx={170} ry={34} fill={F.lilla} opacity={0.22} />
          <path d={`M${420 + 100} ${F_JET_Y} L${420 + 230} ${F_JET_Y} L${420 + 230} ${F_JET_Y - 90} L${420 + 100} ${F_JET_Y - 90} Z`} fill={F.lilla} opacity={0.18} stroke={F.lilla} strokeDasharray="6 5" />
          {[0, 1, 2].map((i) => {
            const t = (sek * 0.35 + i / 3) % 1;
            return <circle key={i} cx={r1(80 + t * 800)} cy={r1(325 - t * 50)} r={5} fill={F.lilla} />;
          })}
        </g>
        {/* stigende luft under venstre utgang */}
        <g opacity={o(s.jet)}>
          <path d={`M${lx - 30} ${ly + 30} L${lx - 30} ${ly - 30}`} stroke={F.varm} strokeWidth={4} markerEnd={`url(#${m.warm})`} />
          <path d={`M${lx + 30} ${ly + 30} L${lx + 30} ${ly - 30}`} stroke={F.varm} strokeWidth={4} markerEnd={`url(#${m.warm})`} />
        </g>
        {/* isobarer */}
        {Array.from({ length: n }, (_, i) => (
          <ellipse key={i} cx={lx} cy={ly} rx={r1(28 + i * avstand * 1.4)} ry={r1(22 + i * avstand)} fill="none" stroke={F.trykk} strokeWidth={2.5} opacity={0.85} />
        ))}
        <text x={lx} y={ly + 10} textAnchor="middle" fontSize={30} fontWeight={800} fill={F.tekst}>L</text>
        {/* tidslinje */}
        <line x1={120} x2={840} y1={500} y2={500} stroke={F.linje} strokeWidth={4} />
        <line x1={120} x2={r1(120 + 720 * s.tid)} y1={500} y2={500} stroke={F.trykk} strokeWidth={6} />
        <circle cx={r1(120 + 720 * s.tid)} cy={500} r={9} fill={F.trykk} />
      </g>
    );
  },
};

/* ---------- G: atmosfærisk elv ---------- */

const G_FJELL = "M500 470 L580 420 L650 360 L720 290 L780 250 L830 262 L880 300 L960 320 L960 470 Z";
const G_LUFT: P[] = [[40, 420], [480, 410], [620, 340], [740, 236], [900, 214]];
const G_BAND = "M60 186 C150 160 220 120 300 90 C340 74 370 60 400 48";

type GBilde = { band: number; loft: number; regn: number; flom: number };

const elv: Def<GBilde> = {
  id: "atmosfaerisk-elv",
  tekst: ELV_TEKST,
  faser: ["Fuktbånd", "Løft", "Regn", "Flom"],
  status: ELV_STATUS,
  bilder: [
    { band: 0, loft: 0, regn: 0, flom: 0 },
    { band: 1, loft: 0, regn: 0, flom: 0 },
    { band: 1, loft: 1, regn: 0, flom: 0 },
    { band: 1, loft: 1, regn: 1, flom: 0 },
    { band: 1, loft: 1, regn: 1, flom: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "subtropene", x: 50, y: 214, color: F.varm, weight: 700, size: 14 },
      { text: "Vestlandet", x: 458, y: 40, color: F.tekst, weight: 700, size: 14 },
      { text: "om lag 2000 km lang, 300–500 km bred", x: 480, y: 130, color: F.teal, weight: 800, size: 14 },
      { text: "hav", x: 120, y: 500, color: F.dempet, size: 14 },
      { text: "fjell", x: 860, y: 420, color: F.dempet, size: 14 },
    ];
    if (f >= 2) l.push({ text: "lufta tvinges opp og avkjøles", x: 300, y: 300, anchor: "middle", color: F.teal, weight: 800, at: [640, 330], badge: [560, 330] });
    if (f >= 3) l.push({ text: "orografisk nedbør: regn helt til fjells", x: 920, y: 170, anchor: "end", color: F.kald, weight: 800, at: [740, 270], badge: [700, 210] });
    if (f >= 4) l.push({ text: "flom og fare for skred", x: 300, y: 370, anchor: "middle", color: F.trykk, weight: 800, at: [560, 452], badge: [520, 420] });
    return l;
  }),
  viewBox: VB,
  tegn: (s, { m, sek }) => (
    <g>
      <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
      {/* kartinnfelt */}
      <rect x={30} y={24} width={420} height={200} rx={10} fill={F.hav} opacity={0.6} stroke={F.linje} />
      <path d="M380 24 L450 24 L450 140 Q420 120 400 90 Q385 60 380 24 Z" fill={F.land} stroke={F.landKant} />
      <path d={G_BAND} fill="none" stroke={F.teal} strokeWidth={22} strokeLinecap="round" opacity={o(0.35 * s.band)} />
      <Strom pts={[[60, 186], [180, 140], [300, 90], [396, 50]]} farge={F.teal} mk={m.teal} synlig={s.band} sek={sek} />
      {/* snitt */}
      <rect x={0} y={470} width={960} height={70} fill={F.hav} />
      <path d={G_FJELL} fill={F.land} stroke={F.landKant} strokeWidth={2} />
      <Strom pts={G_LUFT.slice(0, 2)} farge={F.teal} mk={m.teal} synlig={s.band * (1 - 0.0 * s.loft)} sek={sek} n={3} />
      <Strom pts={G_LUFT.slice(1)} farge={F.teal} mk={m.teal} synlig={s.loft} sek={sek} n={3} />
      <g opacity={o(s.regn)}>
        <path d="M560 300 Q600 230 690 220 Q760 170 860 180 Q910 200 880 230 L600 320 Z" fill={F.sky} opacity={0.7} />
        {Array.from({ length: 16 }, (_, i) => {
          const x = 590 + i * 18;
          const topp = 300 - i * 6;
          const y = topp + ((sek * 60 + i * 13) % 40);
          return <line key={i} x1={x} x2={x - 5} y1={r1(y)} y2={r1(y + 14)} stroke={F.kald} strokeWidth={2.5} />;
        })}
      </g>
      <g opacity={o(s.flom)}>
        <path d="M500 470 Q540 452 580 448 L600 470 Z" fill={F.trykk} opacity={0.85} />
        <path d="M690 340 Q700 370 676 392 Q660 410 668 430" fill="none" stroke={F.trykk} strokeWidth={6} strokeLinecap="round" />
        <path d="M720 300 L700 352 L742 340 Z" fill={F.landKant} />
      </g>
    </g>
  ),
};

/* ---------- J: varselkjeden under Hans ---------- */

const J_BOKS: [number, number][] = [[50, 60], [510, 60], [50, 300], [510, 300]];
const J_B = 400;
const J_H = 190;

type JBilde = { b1: number; b2: number; b3: number; b4: number };

const hans: Def<JBilde> = {
  id: "hans-varsel",
  tekst: HANS_TEKST,
  faser: ["Regn", "Varsel", "Skred", "Lang flom"],
  status: HANS_STATUS,
  bilder: [
    { b1: 0, b2: 0, b3: 0, b4: 0 },
    { b1: 1, b2: 0, b3: 0, b4: 0 },
    { b1: 1, b2: 1, b3: 0, b4: 0 },
    { b1: 1, b2: 1, b3: 1, b4: 0 },
    { b1: 1, b2: 1, b3: 1, b4: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [];
    const tittel = ["Ekstremt mye regn", "Flom- og skredvarsel", "Bekker og skråninger", "Store vassdrag"];
    const linje2 = ["MET: rødt nivå", "NVE: fra oransje til rødt", "over 750 løsmasseskred", "flomtopp i Drammenselva 30. august"];
    for (let i = 0; i < f; i++) {
      const [x, y] = J_BOKS[i];
      l.push({ text: tittel[i], x: x + 20, y: y + 36, color: F.tekst, weight: 800 });
      l.push({ text: linje2[i], x: x + 20, y: y + J_H - 18, color: i < 2 ? "#ffb4a8" : F.trykk, weight: 700 });
    }
    return l;
  }),
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const b = [s.b1, s.b2, s.b3, s.b4];
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        {J_BOKS.map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={J_B} height={J_H} rx={14} fill={i < 2 ? "#5a1f1f" : F.hav} stroke={i < 2 ? "#e05a4a" : F.trykk} strokeWidth={3} opacity={o(0.15 + 0.85 * b[i])} />
        ))}
        {/* piler i kjeden */}
        <path d="M454 155 L506 155" stroke={F.dempet} strokeWidth={4} markerEnd={`url(#${m.fg})`} opacity={o(b[1])} />
        <path d="M600 254 Q480 278 360 296" fill="none" stroke={F.dempet} strokeWidth={4} markerEnd={`url(#${m.fg})`} opacity={o(b[2])} />
        <path d="M454 395 L506 395" stroke={F.dempet} strokeWidth={4} markerEnd={`url(#${m.fg})`} opacity={o(b[3])} />
        {/* 1: regnsky */}
        <g opacity={o(b[0])}>
          <path d="M300 150 Q300 110 340 110 Q360 84 392 100 Q430 96 430 130 Q440 156 410 160 L320 160 Q296 160 300 150 Z" fill={F.sky} />
          {Array.from({ length: 7 }, (_, i) => {
            const y = 168 + ((sek * 50 + i * 11) % 34);
            return <line key={i} x1={318 + i * 15} x2={312 + i * 15} y1={r1(y)} y2={r1(y + 12)} stroke={F.kald} strokeWidth={3} />;
          })}
        </g>
        {/* 2: varseltrekant */}
        <g opacity={o(b[1])}>
          <path d="M850 92 L900 180 L800 180 Z" fill="#e05a4a" stroke="#ffd0c8" strokeWidth={3} />
          <text x={850} y={168} textAnchor="middle" fontSize={44} fontWeight={900} fill="#fff">!</text>
        </g>
        {/* 3: skråning med skred og bekk */}
        <g opacity={o(b[2])}>
          <path d="M290 470 L440 340 L440 470 Z" fill={F.land} stroke={F.landKant} strokeWidth={2} />
          <path d="M360 404 Q372 420 352 446 L384 446 Q394 420 380 400 Z" fill="#a0784f" />
          <path d="M420 356 Q400 400 418 430 Q430 452 420 470" fill="none" stroke={F.trykk} strokeWidth={5} />
        </g>
        {/* 4: langsom flom i stort vassdrag */}
        <g opacity={o(b[3])}>
          <path d="M700 430 Q760 430 790 400 Q820 350 850 352 Q880 356 900 430" fill="none" stroke={F.trykk} strokeWidth={4} />
          <line x1={700} x2={900} y1={432} y2={432} stroke={F.dempet} strokeWidth={2} />
          <text x={900} y={426} textAnchor="end" fontSize={14} fill={F.dempet}>uker →</text>
        </g>
      </g>
    );
  },
};

/* ---------- K: Beauforts trapp fra storm til orkan ---------- */

const K_Y = (v: number) => 470 - (v - 16) * 13;
const K_TRINN: { navn: string; fra: number; til: number; tekst: string }[] = [
  { navn: "liten storm", fra: 20.8, til: 24.4, tekst: "20,8–24,4 m/s" },
  { navn: "full storm", fra: 24.5, til: 28.4, tekst: "24,5–28,4 m/s" },
  { navn: "sterk storm", fra: 28.5, til: 32.6, tekst: "28,5–32,6 m/s" },
  { navn: "orkan", fra: 32.6, til: 40, tekst: "over 32,6 m/s" },
];
const K_X = (i: number) => 90 + i * 160;
const K_W = 140;

type KBilde = { t1: number; t2: number; t3: number; t4: number; nhc: number };

const beaufort: Def<KBilde> = {
  id: "beaufort-trapp",
  tekst: BEAUFORT_TEKST,
  faser: ["Liten storm", "Full storm", "Sterk storm", "Orkan", "Kategori 1"],
  status: BEAUFORT_STATUS,
  bilder: [
    { t1: 0, t2: 0, t3: 0, t4: 0, nhc: 0 },
    { t1: 1, t2: 0, t3: 0, t4: 0, nhc: 0 },
    { t1: 1, t2: 1, t3: 0, t4: 0, nhc: 0 },
    { t1: 1, t2: 1, t3: 1, t4: 0, nhc: 0 },
    { t1: 1, t2: 1, t3: 1, t4: 1, nhc: 0 },
    { t1: 1, t2: 1, t3: 1, t4: 1, nhc: 1 },
  ],
  etiketter: [1, 2, 3, 4, 5].map((f) => {
    const l: Lab[] = [{ text: "middelvind over 10 minutter (Beaufort)", x: 40, y: 40, color: F.teal, weight: 800, size: 14 }];
    for (let i = 0; i < Math.min(f, 4); i++) {
      const t = K_TRINN[i];
      const bx = K_X(i) + K_W / 2;
      const by = r1(K_Y(t.til) - 40);
      l.push({ text: t.navn, x: bx, y: K_Y(t.til) - 34, anchor: "middle", color: i === 3 ? F.vind : F.tekst, weight: 800, badge: [bx - 40, by] });
      l.push({ text: t.tekst, x: bx, y: K_Y(t.til) - 12, anchor: "middle", color: F.dempet, weight: 700, size: 13, badge: [bx + 40, by] });
    }
    if (f >= 5) {
      l.push({ text: "kategori 1: om lag 33–42 m/s", x: 830, y: 70, anchor: "middle", color: F.varm, weight: 800, size: 14, badge: [790, 60] });
      l.push({ text: "middel over 1 minutt", x: 830, y: 92, anchor: "middle", color: F.varm, weight: 700, size: 13, badge: [870, 60] });
    }
    return l;
  }),
  keys: [
    { text: "Beaufort, 10 min", color: F.teal, kind: "fill" },
    { text: "Saffir-Simpson, 1 min", color: F.varm, kind: "fill" },
  ],
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const t = [s.t1, s.t2, s.t3, s.t4];
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <line x1={70} x2={920} y1={470} y2={470} stroke={F.dempet} strokeWidth={2} />
        {K_TRINN.map((k, i) => {
          const topp = K_Y(k.til);
          const h = (470 - topp) * t[i];
          const y = 470 - h;
          return (
            <g key={k.navn} opacity={o(0.15 + 0.85 * t[i])}>
              <rect x={K_X(i)} y={r1(y)} width={K_W} height={r1(h)} fill={i === 3 ? F.vind : F.teal} opacity={0.35 + i * 0.12} rx={4} />
              <line x1={K_X(i)} x2={K_X(i) + K_W} y1={r1(K_Y(k.fra))} y2={r1(K_Y(k.fra))} stroke={F.tekst} strokeDasharray="5 4" opacity={o(t[i])} />
              {i === 3 && <path d={`M${K_X(i) + K_W / 2} ${r1(y + 30)} L${K_X(i) + K_W / 2} ${r1(y - 4)}`} stroke={F.vind} strokeWidth={4} markerEnd={`url(#${m.warm})`} opacity={o(t[i])} />}
            </g>
          );
        })}
        {/* vindstreker over det høyeste trinnet som er vist */}
        {(() => {
          const aktiv = t.filter((v) => v > 0.5).length - 1;
          if (aktiv < 0) return null;
          const x0 = K_X(aktiv);
          const y0 = K_Y(K_TRINN[aktiv].til) - 110;
          return [0, 1, 2].map((i) => {
            const d = (sek * (60 + aktiv * 40) + i * 50) % K_W;
            return <line key={i} x1={r1(x0 + d)} x2={r1(x0 + d + 30)} y1={y0 + i * 8} y2={y0 + i * 8} stroke={F.dempet} strokeWidth={2} opacity={0.6} />;
          });
        })()}
        {/* Saffir-Simpson kategori 1, eget felt fordi middelet tas over ulik tid */}
        <g opacity={o(s.nhc)}>
          <line x1={745} x2={745} y1={110} y2={470} stroke={F.dempet} strokeDasharray="4 6" />
          <rect x={760} y={r1(K_Y(42))} width={140} height={r1(K_Y(33) - K_Y(42))} fill={F.varm} opacity={0.55} rx={4} />
        </g>
      </g>
    );
  },
};

export const SupercelleFigur = lagFigur(supercelle);
export const BombesyklonFigur = lagFigur(bombe);
export const AtmosfaeriskElvFigur = lagFigur(elv);
export const HansVarselFigur = lagFigur(hans);
export const BeaufortTrappFigur = lagFigur(beaufort);
