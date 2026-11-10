/**
 * Figur 5.6 (geografi kap. 5, «Fjell løfter lufta» og «Varmere luft på lesiden»): fjellnedbør og fønvind.
 *
 * Et tverrsnitt over en fjellrygg mellom hav og innlandsdal. Fuktig luft fra havet tvinges opp på losiden,
 * utvider seg og avkjøles. Blir lufta mettet, kan skyer og nedbør dannes. På lesiden synker lufta, trykket
 * øker og lufta varmes, og den relative luftfuktigheten synker. Siste steg snur vinden, slik at lo og le bytter.
 * Kvalitativt, uten temperaturer, høyder eller vindstyrke (kapitteltekst: Harstveit, 2024; Dannevig mfl., u.å.;
 * Dannevig & Harstveit, 2026). Terrenget er konstruert og viser ikke en bestemt dal.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur } from "./steg-kit";
import { KlimaDefs, Maalere, Pil, Skog, Sky, Sol, Strom } from "./klima-modell-kit";
import { K, flateUnder, linjeD, op, ruProfil, yPaa, type P } from "./klima-modell-geo";

const ID = "kfon";
const TOPP_X = 486;
const SKYBASE = 300;

const PROFIL = ruProfil(
  [
    [0, 446], [150, 446], [190, 438], [240, 414], [300, 372], [350, 322], [400, 258], [440, 196], [470, 156], [486, 138],
    [506, 150], [540, 196], [580, 252], [630, 316], [680, 372], [730, 414], [770, 440], [820, 446], [960, 448],
  ],
  11, 7, 9,
).map(([x, y]) => [x, x < 160 || x > 800 ? 446 + (x > 800 ? 2 : 0) : y] as P);
const BAK = ruProfil([[0, 420], [120, 380], [230, 300], [300, 248], [360, 286], [420, 250], [560, 214], [640, 236], [720, 282], [830, 330], [960, 360]], 5, 8, 10);

/** Snøfeltet: under toppen, med ujevn nedre kant (lengre ned i renner og på skyggesida). */
const SNO = (() => {
  const pts: P[] = [];
  for (let x = 360; x <= 620; x += 10) pts.push([x, 0]);
  const bunn: P[] = [];
  for (let x = 620; x >= 360; x -= 10) bunn.push([x, 232 + Math.sin(x * 0.11) * 14 + Math.sin(x * 0.37) * 7 + (x < TOPP_X ? 10 : 0)]);
  return `${linjeD(pts)} L${bunn.map(([x, y]) => `${x} ${y.toFixed(1)}`).join(" L")} Z`;
})();
/** Korte renner ned fra ryggen (skygge i fjellsida). */
const RENNER = [404, 432, 458, 512, 536, 566, 596, 352].map((x, i) => {
  const y = yPaa(PROFIL, x) + 6;
  const dx = x < TOPP_X ? -10 : 10;
  return `M${x} ${y.toFixed(1)} q ${dx + (i % 2) * 4} 30 ${dx * 0.6} ${60 + (i % 3) * 18}`;
});

/** Lufta følger terrenget i en viss avstand; over havet og i dalen går den lavt. */
function bane(retning: 1 | -1): P[] {
  const pts: P[] = [];
  for (let i = 0; i <= 46; i++) {
    const x = 20 + i * 20;
    const yT = yPaa(PROFIL, x);
    pts.push([x, Math.min(408, yT - 44 - (Math.abs(x - TOPP_X) < 70 ? 18 : 0))]);
  }
  const glattet = pts.map((p, i) => {
    const a = pts[Math.max(0, i - 2)];
    const b = pts[Math.min(pts.length - 1, i + 2)];
    return [p[0], (a[1] + p[1] * 2 + b[1]) / 4] as P;
  });
  return retning === 1 ? glattet : glattet.slice().reverse();
}
const BANE_V = bane(1);
const BANE_O = bane(-1);
const OPP_V = BANE_V.filter((p) => p[0] <= TOPP_X + 10);
const NED_V = BANE_V.filter((p) => p[0] >= TOPP_X - 10);
const OPP_O = BANE_O.filter((p) => p[0] >= TOPP_X - 10);
const NED_O = BANE_O.filter((p) => p[0] <= TOPP_X + 10);

/** Fast landskap: himmel, fjern rygg, fjell med snø, hav, skog og bygd i dalen. Memo, så det ikke tegnes hvert bilde. */
const Landskap = memo(function Landskap() {
  const fjell = flateUnder(PROFIL, 540);
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={960} height={540} fill={`url(#${ID}-himmel)`} data-nocheck="" />
      <path d={flateUnder(BAK, 540)} fill="#4d6275" opacity={0.55} data-nocheck="" />
      <path d={fjell} fill={`url(#${ID}-fjell)`} />
      <clipPath id={`${ID}-klipp`}>
        <path d={fjell} />
      </clipPath>
      <g clipPath={`url(#${ID}-klipp)`} data-nocheck="">
        <rect x={0} y={250} width={960} height={290} fill={`url(#${ID}-gront)`} />
        <path d={SNO} fill={`url(#${ID}-sno)`} />
        {RENNER.map((d, i) => (
          <path key={i} d={d} stroke="#0b141d" strokeOpacity={0.22} strokeWidth={2.4} fill="none" strokeLinecap="round" />
        ))}
      </g>
      {/* hav på vestsida */}
      <rect x={0} y={446} width={168} height={94} fill={`url(#${ID}-hav)`} data-nocheck="" />
      {[458, 474, 492, 512].map((y, i) => (
        <path key={y} d={`M${6 + i * 9} ${y} q 18 -5 36 0 t 36 0 t 36 0`} stroke="#9bd2f0" strokeOpacity={0.35} strokeWidth={1.6} fill="none" data-nocheck="" />
      ))}
      <Skog pr={PROFIL} fra={176} til={300} tett={13} seed={4} h={24} />
      <Skog pr={PROFIL} fra={640} til={790} tett={14} seed={9} h={22} farge="#3b7a4a" />
      {/* bygd og elv i innlandsdalen */}
      <path d="M800 470 Q 860 462 960 476" stroke="#5aa9d6" strokeWidth={5} fill="none" opacity={0.8} data-nocheck="" />
      {[820, 846, 878, 910].map((x, i) => (
        <g key={x} data-nocheck="">
          <rect x={x} y={438 - (i % 2) * 2} width={16} height={11} fill={i % 2 ? "#c9a27a" : "#b4483c"} />
          <polygon points={`${x - 2},${438 - (i % 2) * 2} ${x + 8},${430 - (i % 2) * 2} ${x + 18},${438 - (i % 2) * 2}`} fill="#3a2b25" />
        </g>
      ))}
      <path d={linjeD(PROFIL)} fill="none" stroke="#0b141d" strokeOpacity={0.6} strokeWidth={2} data-nocheck="" />
    </g>
  );
});

/** Skyer og regn på losiden for én vindretning (r = 1 vest, -1 øst). */
function Lovaer({ r, sky, regn, fase }: { r: 1 | -1; sky: number; regn: number; fase: number }) {
  if (sky <= 0.01) return null;
  const xs = r === 1 ? [300, 360, 420, 468] : [672, 612, 556, 504];
  return (
    <g>
      {xs.map((x, i) => (
        <Sky key={x} id={ID} x={x} y={Math.min(yPaa(PROFIL, x) - 46, SKYBASE - 6) - i * 6} s={0.95 - i * 0.07} opacity={sky} regn={i < 3 ? regn : 0} fase={fase + i * 0.3} mork={0.8} />
      ))}
      <Sky id={ID} x={TOPP_X} y={98} s={0.8} opacity={sky * 0.9} />
    </g>
  );
}

type S = { v: number; o: number; vind: number; opp: number; sky: number; regn: number; ned: number; tT: number; tR: number };

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });

const LO_V = L("losiden", 250, 360, { color: K.kald, weight: 800, at: [270, 396], badge: [216, 330] });
const LE_V = L("lesiden", 706, 360, { color: K.varm, weight: 800, at: [690, 392], badge: [742, 330] });
const HAV = L("fuktig luft fra havet", 96, 360, { size: 13, at: [80, 404], badge: [60, 380] });

const MET = L("skybase: lufta blir mettet", 890, SKYBASE - 10, { color: K.dempet, size: 12, anchor: "end", at: [800, SKYBASE], badge: [900, SKYBASE - 18] });

const etiketter: Lab[][] = [
  [HAV, LO_V, LE_V, L("vinden møter fjellet først på losiden", 480, 40, { color: K.dempet, size: 13, badge: [480, 40] })],
  [HAV, LO_V, LE_V, L("lufta stiger, utvider seg og avkjøles", 250, 200, { color: K.kald, at: [366, 268], badge: [330, 240] })],
  [HAV, LO_V, LE_V, L("mettet luft: skyer og mulig nedbør", 230, 180, { color: K.tekst, at: [344, 262], badge: [300, 214] }), L("fjellnedbør", 214, 420, { color: K.regn, size: 13, at: [320, 360], badge: [250, 410] }), MET],
  [
    LO_V, LE_V,
    L("lufta synker, trykket øker og lufta varmes", 730, 200, { color: K.varm, at: [616, 268], badge: [600, 210] }),
    L("lavere relativ fuktighet", 760, 236, { color: K.varm, size: 13, badge: [850, 250] }),
    L("regnskygge", 862, 404, { color: K.dempet, size: 13, at: [860, 424], badge: [890, 400] }),
  ],
  [
    L("lesiden", 250, 360, { color: K.varm, weight: 800, at: [270, 396], badge: [216, 330] }),
    L("losiden", 706, 360, { color: K.kald, weight: 800, at: [690, 392], badge: [742, 330] }),
    L("vind fra øst: lo og le bytter side", 480, 40, { color: K.tekst, size: 14, badge: [480, 40] }),
    L("skyer på østsida", 760, 190, { color: K.tekst, size: 13, at: [612, 262], badge: [680, 214] }),
  ],
];

const def: Def<S> = {
  id: "klima-fon",
  tekst: {
    heading: "Fjellnedbør og fønvind",
    title:
      "Tverrsnitt over en fjellrygg mellom hav og en innlandsdal. Fuktig luft fra havet stiger på losiden og avkjøles, skyer og nedbør kan dannes, og på lesiden synker lufta og varmes, med lavere relativ fuktighet. I siste steg kommer vinden fra øst, og lo og le bytter side. Ingen temperaturer eller høyder.",
    caption: "",
  },
  faser: ["Vinden møter fjellet", "Lufta stiger", "Skyer og nedbør", "Føn på lesiden", "Vinden snur"],
  status: [
    "1. Vinden fører fuktig luft fra havet inn mot fjellet. Siden vinden møter først, kalles losiden. Den skjermede siden er lesiden.",
    "2. Terrenget tvinger lufta opp. Lufta kommer under lavere trykk, utvider seg og avkjøles. Den relative fuktigheten stiger.",
    "3. Når lufta blir mettet, kan vanndampen kondensere til skyer, og nedbør kan falle på losiden. Dette er fjellnedbør.",
    "4. På lesiden synker lufta. Trykket øker, lufta presses sammen og varmes, og den relative fuktigheten synker. Føn krever ikke at det først har regnet på losiden.",
    "5. Kommer vinden fra øst, blir østsida loside og vestsida leside. Vindretningen avgjør hvilken side som er lo og le.",
  ],
  bilder: [
    { v: 1, o: 0, vind: 0, opp: 0, sky: 0, regn: 0, ned: 0, tT: 0.6, tR: 0.55 },
    { v: 1, o: 0, vind: 1, opp: 0, sky: 0, regn: 0, ned: 0, tT: 0.6, tR: 0.6 },
    { v: 1, o: 0, vind: 1, opp: 1, sky: 0.25, regn: 0, ned: 0, tT: 0.35, tR: 0.85 },
    { v: 1, o: 0, vind: 1, opp: 1, sky: 1, regn: 1, ned: 0, tT: 0.25, tR: 1 },
    { v: 1, o: 0, vind: 1, opp: 1, sky: 1, regn: 0.6, ned: 1, tT: 0.8, tR: 0.25 },
    { v: 0, o: 1, vind: 1, opp: 1, sky: 1, regn: 0.8, ned: 1, tT: 0.6, tR: 0.6 },
  ],
  etiketter,
  keys: [
    { text: "luft som stiger og avkjøles", color: K.kald, kind: "line" },
    { text: "luft som synker og varmes", color: K.varm, kind: "line" },
    { text: "nedbør", color: K.regn, kind: "dash" },
  ],
  notes: ["Konstruert tverrsnitt, ikke i målestokk", "Kvalitativt: ingen temperaturer, høyder eller vindstyrke"],
  viewBox: "0 0 960 540",
  under: (s, fase) => {
    const tekstT = fase === 1 ? "som ved havet" : fase === 2 ? "synker" : fase === 3 ? "synker langsommere i skyen" : fase === 4 ? "stiger når lufta synker" : "synker på østsida nå";
    const tekstR = fase === 1 ? "fuktig luft" : fase === 2 ? "stiger" : fase === 3 ? "mettet" : fase === 4 ? "synker" : "stiger på østsida nå";
    return (
      <Maalere
        rader={[
          { navn: "Temperatur i lufta som følges", verdi: s.tT, farge: "linear-gradient(90deg,#7cc4ff,#f4a259)", tekst: tekstT },
          { navn: "Relativ luftfuktighet", verdi: s.tR, farge: "#93c5fd", tekst: tekstR },
        ]}
      />
    );
  },
  tegn: (s, { sek }) => {
    const f = (sek * 0.07) % 1;
    const vest = s.v > 0.01;
    const ost = s.o > 0.01;
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-himmel`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2a3f55" />
            <stop offset="50%" stopColor="#35546f" />
            <stop offset="100%" stopColor="#4f7ea0" />
          </linearGradient>
          <linearGradient id={`${ID}-fjell`} x1="0" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#323f37" />
            <stop offset="44%" stopColor="#46534b" />
            <stop offset="56%" stopColor="#6f7b70" />
            <stop offset="100%" stopColor="#58665a" />
          </linearGradient>
          <linearGradient id={`${ID}-gront`} x1="0" y1="250" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c5a35" stopOpacity="0" />
            <stop offset="55%" stopColor="#2c5a35" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#24482b" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id={`${ID}-sno`} x1="360" y1="0" x2="620" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9d6e0" />
            <stop offset="45%" stopColor="#dfe8ef" />
            <stop offset="55%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef4f8" />
          </linearGradient>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f5a7a" />
            <stop offset="100%" stopColor="#0c2b40" />
          </linearGradient>
        </KlimaDefs>
        <Landskap />
        <Sol id={ID} x={vest ? 880 : 80} y={78} r={26} opacity={0.35 + 0.65 * Math.max(s.v * s.ned, s.o * s.ned, 0.4)} />
        {vest ? (
          <g opacity={op(s.v)}>
            <Lovaer r={1} sky={s.sky} regn={s.regn} fase={sek} />
            <Pil pts={[[18, 404], [150, 404]]} farge={K.kald} w={6} opacity={1} />
            <Pil pts={OPP_V} farge={K.kald} w={5} opacity={s.vind} />
            <Pil pts={NED_V} farge={K.varmSterk} w={5} opacity={s.ned} />
            <Strom pts={s.ned > 0.5 ? BANE_V : OPP_V} farge="#f8fafc" fase={f} antall={6} opacity={s.vind} />
          </g>
        ) : null}
        {ost ? (
          <g opacity={op(s.o)}>
            <Lovaer r={-1} sky={s.sky} regn={s.regn} fase={sek} />
            <Pil pts={[[942, 404], [810, 404]]} farge={K.kald} w={6} />
            <Pil pts={OPP_O} farge={K.kald} w={5} opacity={s.vind} />
            <Pil pts={NED_O} farge={K.varmSterk} w={5} opacity={s.ned} />
            <Strom pts={BANE_O} farge="#f8fafc" fase={f} antall={6} opacity={s.vind} />
          </g>
        ) : null}
        <line x1={150} y1={SKYBASE} x2={830} y2={SKYBASE} stroke="#cbd5e1" strokeOpacity={0.35 * s.sky} strokeDasharray="6 8" strokeWidth={1.5} data-nocheck="" />
      </>
    );
  },
};

export const KlimaFonFigur = lagFigur(def);
