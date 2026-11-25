/**
 * Figur 3.3 (geografi kap. 3, «Fra hverandre: spredning og rifter»): fra tøying til et mulig hav.
 *
 * Prinsippsnitt gjennom kontinentskorpe, litosfærisk mantel og astenosfære. Strekk tynner litosfæren og gir
 * forkastninger, blokker synker ned til en riftdal, magma kan stige, havet kan trenge inn, og fortsatt
 * oppsprekking kan gi ny havbunn. Kvalitativt (kapitteltekst og figurtekst: USGS, u.å.-h; NGU, u.å.-a):
 * ingen målte lagtykkelser, dybder eller tider. Tegningen er konstruert og viser ikke et bestemt sted.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur } from "./steg-kit";
import { RIFT_FASER, RIFT_STATUS } from "./indre-rift-tekst";
import { Pil, Strom } from "./klima-modell-kit";
import { K, glatt, linjeD, op, type P } from "./klima-modell-geo";

const ID = "irift";
const MIDT = 480;
const B = 960;
const OVERFLATE = 168;
const HAVNIVA = 212;


type S = { tyn: number; brudd: number; fall: number; magma: number; hav: number; gap: number };

const klokke = (d: number) => Math.exp(-((d / 210) ** 2));

/** Overflaten på kontinentskorpa, d = avstand fra riftkanten (d = 0 ved det nye havet). */
function topp(d: number, s: S) {
  const skulder = -10 * s.fall * Math.exp(-(((d - 205) / 55) ** 2));
  if (d > 178) return OVERFLATE + skulder;
  if (d > 172) return OVERFLATE + 26 * s.fall * ((178 - d) / 6);
  if (d > 98) return OVERFLATE + 26 * s.fall;
  if (d > 92) return OVERFLATE + 26 * s.fall + 26 * s.fall * ((98 - d) / 6);
  return OVERFLATE + 52 * s.fall;
}
const mohoGrunn = (d: number, s: S) => 320 - 70 * s.tyn * klokke(d);
/** Når havet har åpnet seg, kiler kontinentskorpa ut mot kanten (passiv margin). */
const moho = (d: number, s: S) => {
  const m = mohoGrunn(d, s);
  const k = Math.min(1, s.gap * 4) * Math.max(0, 1 - d / 70);
  return m + (topp(d, s) + 14 - m) * k;
};
const HAVBUNN_KANT = 250;
const HAVBUNN_RYGG = 238;
const HAVBUNN_BUNN = 274;
const lab = (x: number, s: S) => 450 - 150 * s.tyn * Math.exp(-(((x - MIDT) / 270) ** 2));

/** Kontinentskorpa på én side (side = -1 venstre, 1 høyre). */
function skorpe(side: -1 | 1, s: S) {
  const g = s.gap * 150;
  const xs: number[] = [];
  for (let d = 0; d <= MIDT - g + 4; d += 3) xs.push(d);
  const til = (d: number) => MIDT + side * (g + d);
  const over: P[] = xs.map((d): P => [til(d), topp(d, s)]);
  const under: P[] = xs.map((d): P => [til(d), moho(d, s)]).reverse();
  return `${linjeD([...over, ...under])} Z`;
}

/** Overflaten og undersiden av kontinentskorpa som egne linjer (ingen søm i midten før havet åpner seg). */
function skorpeLinjer(side: -1 | 1, s: S) {
  const g = s.gap * 150;
  const xs: number[] = [];
  for (let d = 0; d <= MIDT - g + 4; d += 3) xs.push(d);
  const til = (d: number) => MIDT + side * (g + d);
  return [linjeD(xs.map((d): P => [til(d), topp(d, s)])), linjeD(xs.map((d): P => [til(d), moho(d, s)]))];
}

/** Skrå forkastninger (heller inn mot riften). */
function forkastninger(s: S) {
  const g = s.gap * 150;
  const ut: { d: string; side: number }[] = [];
  for (const side of [-1, 1] as const) {
    for (const d0 of [175, 95]) {
      const x0 = MIDT + side * (g + d0);
      const y0 = topp(d0 + 3, s) - 2;
      const x1 = x0 - side * 34;
      const y1 = Math.min(moho(d0, s) - 6, y0 + 92);
      ut.push({ d: `M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)}`, side });
    }
  }
  return ut;
}

/** Lagdeling i skorpa (svake linjer), så blokkene ser ut som berg og ikke flate felt. */
function lagstriper(side: -1 | 1, s: S) {
  const g = s.gap * 150;
  return [18, 40, 66, 96].map((dy, i) => {
    const pts: P[] = [];
    for (let d = 0; d <= MIDT - g; d += 12) {
      const y = topp(d, s) + dy * ((moho(d, s) - topp(d, s)) / 132);
      pts.push([MIDT + side * (g + d), y]);
    }
    return <path key={i} d={linjeD(pts)} fill="none" stroke="#2a2016" strokeOpacity={0.28} strokeWidth={1.4} data-nocheck="" />;
  });
}

const Bakgrunn = memo(function Bakgrunn() {
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={B} height={540} fill={`url(#${ID}-luft)`} data-nocheck="" />
      <rect x={0} y={250} width={B} height={290} fill={`url(#${ID}-asteno)`} data-nocheck="" />
    </g>
  );
});

function mantelbaner(): P[][] {
  const opp = (side: -1 | 1): P[] => {
    const pts: P[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      pts.push([MIDT + side * (18 + 250 * t * t), 528 - 150 * Math.sin(t * Math.PI * 0.62)]);
    }
    return pts;
  };
  return [opp(-1), opp(1)];
}
const BANER = mantelbaner();

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });

const KONT_V = L("Kontinent", 120, 150, { at: [120, 190], badge: [90, 140] });
const KONT_H = L("Kontinent", 840, 150, { at: [840, 190], badge: [870, 140] });
const STREKK = L("Strekk", 480, 56, { color: K.varm, weight: 800, badge: [480, 56] });

const etiketter: Lab[][] = [
  [KONT_V, KONT_H, STREKK,
    L("Strekk tynner litosfæren", 480, 470, { color: K.varm, at: [480, 330], badge: [480, 470] }),
    L("Forkastninger kan dannes", 250, 110, { color: "#ff9b9b", at: [312, 196], badge: [250, 110] })],
  [KONT_V, KONT_H, STREKK,
    L("Riftdal: blokker synker", 480, 118, { at: [480, 240], badge: [480, 118] }),
    L("Magma kan stige", 650, 470, { color: K.varmSterk, at: [500, 360], badge: [650, 470] })],
  [KONT_V, KONT_H,
    L("Havet kan trenge inn", 480, 118, { color: K.kald, at: [480, 226], badge: [480, 118] }),
    L("Magma kan stige", 650, 470, { color: K.varmSterk, at: [500, 360], badge: [650, 470] })],
  [L("Kontinent", 110, 150, { at: [110, 190], badge: [80, 140] }), L("Kontinent", 850, 150, { at: [850, 190], badge: [880, 140] }),
    L("Havbasseng", 480, 118, { color: K.kald, at: [480, 236], badge: [480, 118] }),
    L("Ny havbunn", 250, 300, { color: K.teal, at: [420, 262], badge: [250, 300] })],
];

const def: Def<S> = {
  id: "geo-rift",
  tekst: {
    heading: "Fra tøying til et mulig hav",
    title:
      "Prinsippsnitt gjennom kontinentskorpe, mantel og astenosfære. Strekk tynner litosfæren og gir forkastninger. Blokker synker ned og danner en riftdal, og magma kan stige. Hvis strekken fortsetter og området ligger lavt nok, kan havet trenge inn, og fortsatt oppsprekking kan gi ny havbunn og et havbasseng. Én mulig utvikling, uten målestokk.",
    caption: "",
  },
  faser: RIFT_FASER,
  status: RIFT_STATUS,
  bilder: [
    { tyn: 0, brudd: 0, fall: 0, magma: 0, hav: 0, gap: 0 },
    { tyn: 0.55, brudd: 1, fall: 0.2, magma: 0, hav: 0, gap: 0 },
    { tyn: 0.8, brudd: 1, fall: 1, magma: 1, hav: 0, gap: 0 },
    { tyn: 0.92, brudd: 1, fall: 1.15, magma: 1, hav: 1, gap: 0.12 },
    { tyn: 1, brudd: 1, fall: 1.15, magma: 1, hav: 1, gap: 1 },
  ],
  etiketter,
  keys: [
    { text: "kontinentskorpe", color: "#b89a74", kind: "fill" },
    { text: "ny havbunn (havbunnsskorpe)", color: "#3d5560", kind: "fill" },
    { text: "litosfærisk mantel", color: "#5b4a52", kind: "fill" },
    { text: "astenosfæren", color: "#b4552f", kind: "fill" },
    { text: "forkastning", color: "#ff6b6b", kind: "line" },
    { text: "magma", color: K.varmSterk, kind: "fill" },
  ],
  notes: ["Konstruert prinsippsnitt, ikke i målestokk", "Ingen målte lagtykkelser eller tider"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const g = s.gap * 150;
    const f = (sek * 0.05) % 1;
    const labPts: P[] = [];
    for (let x = 0; x <= B; x += 10) labPts.push([x, lab(x, s)]);
    const mantelTopp: P[] = [];
    for (let x = 0; x <= B; x += 6) {
      const d = Math.abs(x - MIDT) - g;
      mantelTopp.push([x, d >= 0 ? moho(d, s) - 2 : HAVBUNN_BUNN - 2]);
    }
    const litoMantel = `${linjeD(mantelTopp)} L${B} ${lab(B, s)} ${labPts.slice().reverse().map(([x, y]) => `L${x} ${y.toFixed(1)}`).join(" ")} Z`;
    const magmaY = 455 - 105 * s.magma;
    const gulv = s.gap > 0.05 ? HAVBUNN_BUNN - 6 : topp(10, s) + 4;
    return (
      <>
        <defs>
          <linearGradient id={`${ID}-luft`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2c3c" />
            <stop offset="35%" stopColor="#2c4560" />
            <stop offset="100%" stopColor="#2c4560" />
          </linearGradient>
          <linearGradient id={`${ID}-asteno`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a3d26" />
            <stop offset="100%" stopColor="#c9622f" />
          </linearGradient>
          <linearGradient id={`${ID}-skorpe`} x1="0" y1="160" x2="0" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c8ab82" />
            <stop offset="55%" stopColor="#a8896a" />
            <stop offset="100%" stopColor="#7d6550" />
          </linearGradient>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f8fc0" />
            <stop offset="100%" stopColor="#174566" />
          </linearGradient>
          <radialGradient id={`${ID}-magma`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffd27a" />
            <stop offset="45%" stopColor="#ff8a3d" />
            <stop offset="100%" stopColor="#d9481f" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <Bakgrunn />
        <Strom pts={BANER[0]} farge="#ffcf9a" fase={f} antall={6} r={3.5} opacity={0.75 * s.tyn} />
        <Strom pts={BANER[1]} farge="#ffcf9a" fase={f} antall={6} r={3.5} opacity={0.75 * s.tyn} />
        {/* hav i riftdalen / havbassenget */}
        <rect x={MIDT - g - 176} y={HAVNIVA} width={2 * (g + 176)} height={88} fill={`url(#${ID}-hav)`} opacity={op(s.hav)} data-nocheck="" />
        <path d={litoMantel} fill="#5b4a52" stroke="#2b2128" strokeWidth={1.5} />
        <path d={glatt(labPts)} fill="none" stroke="#f0a070" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="7 6" data-nocheck="" />
        {/* ny havbunn i midten: tynn havbunnsskorpe med en svak rygg i midten */}
        {s.gap > 0.02 ? (
          <g>
            <path d={`M${MIDT - g - 6} ${HAVBUNN_KANT} Q${MIDT - g * 0.5} ${HAVBUNN_KANT} ${MIDT} ${HAVBUNN_RYGG} Q${MIDT + g * 0.5} ${HAVBUNN_KANT} ${MIDT + g + 6} ${HAVBUNN_KANT} L${MIDT + g + 6} ${HAVBUNN_BUNN} L${MIDT - g - 6} ${HAVBUNN_BUNN} Z`} fill="#3d5560" stroke="#1d2b31" strokeWidth={1.5} />
            {Array.from({ length: Math.max(1, Math.round(s.gap * 3)) }, (_, i) => {
              const dx = ((i + 1) * g) / (Math.max(1, Math.round(s.gap * 3)) + 1);
              return [-1, 1].map((side) => <path key={`${i}${side}`} d={`M${(MIDT + side * dx).toFixed(1)} ${HAVBUNN_KANT - 4} V${HAVBUNN_BUNN - 2}`} stroke="#22343c" strokeWidth={1.2} data-nocheck="" />);
            })}
          </g>
        ) : null}
        {([-1, 1] as const).map((side) => (
          <g key={side}>
            <path d={skorpe(side, s)} fill={`url(#${ID}-skorpe)`} stroke={`url(#${ID}-skorpe)`} strokeWidth={1} />
            {lagstriper(side, s)}
            {skorpeLinjer(side, s).map((d, i) => <path key={i} d={d} fill="none" stroke="#3a2c1f" strokeWidth={1.8} data-nocheck="" />)}
          </g>
        ))}
        {/* magma som stiger */}
        <g opacity={op(s.magma)}>
          <ellipse cx={MIDT} cy={magmaY} rx={74 + 30 * s.gap} ry={30} fill={`url(#${ID}-magma)`} />
          <path d={`M${MIDT} ${magmaY - 18} C ${MIDT - 8} ${magmaY - 60} ${MIDT + 10} ${gulv + 50} ${MIDT} ${gulv}`} fill="none" stroke="#ff8a3d" strokeWidth={5} strokeLinecap="round" opacity={op(s.magma)} />
          <path d={`M${MIDT - 26} ${magmaY - 12} C ${MIDT - 40} ${magmaY - 50} ${MIDT - 30} ${gulv + 60} ${MIDT - 34} ${Math.max(gulv + 30, HAVBUNN_BUNN)}`} fill="none" stroke="#ff8a3d" strokeWidth={3} strokeLinecap="round" opacity={op(s.magma * 0.8)} />
        </g>
        {forkastninger(s).map((fk, i) => (
          <path key={i} d={fk.d} stroke="#ff6b6b" strokeWidth={3.2} strokeLinecap="round" opacity={op(s.brudd)} />
        ))}
        {/* strekk: piler utover */}
        <Pil pts={[[400 - g * 0.3, 78], [240 - g * 0.3, 78]]} farge={K.varm} w={6} opacity={op(Math.max(0.35, s.tyn))} />
        <Pil pts={[[560 + g * 0.3, 78], [720 + g * 0.3, 78]]} farge={K.varm} w={6} opacity={op(Math.max(0.35, s.tyn))} />
      </>
    );
  },
};

export const GeografiRiftFigur = lagFigur(def);
