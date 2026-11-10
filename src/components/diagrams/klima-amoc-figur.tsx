/**
 * Figur 5.4 (geografi kap. 5, «Havet fordeler også varme»): prinsippet i den atlantiske omveltningen (AMOC).
 *
 * Et skjematisk snitt nord–sør gjennom Atlanterhavet (dybden sterkt overdrevet). Varmt overflatevann går nordover,
 * havet avgir varme til lufta, vannet avkjøles og blir tettere (avkjøling og saltholdighet påvirker tettheten),
 * synker og vender tilbake sørover i dypet. Golfstrømmen er en del av overflatestrømmen, ikke et annet navn på AMOC
 * (kapitteltekst: Barthel, u.å.; NOAA, u.å.; Lindsey, 2009). Ikke et havkart og ikke et varsel om framtidige endringer.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { prng } from "./prosess-kit";
import { Bolge, KlimaDefs, Maalere, Pil, Sky, Sol, Strom } from "./klima-modell-kit";
import { K, bue, flateUnder, op, ruProfil, type P } from "./klima-modell-geo";

const ID = "kam";
const FLATE = 168;
const SYNK_X = 852;

/** Havbunnen: kontinentalsokkel i sør, dyphavsslette, midthavsrygg-aktige ujevnheter og en terskel før de nordiske hav. */
const BUNN = ruProfil(
  [[0, 470], [80, 500], [200, 512], [300, 506], [360, 488], [400, 470], [440, 486], [520, 506], [620, 510], [700, 498], [740, 430], [770, 412], [800, 440], [840, 486], [900, 492], [930, 420], [945, 240], [960, 200]],
  41, 8, 8,
);

const Landskap = memo(function Landskap() {
  const rnd = prng(9);
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={960} height={FLATE} fill={`url(#${ID}-himmel)`} data-nocheck="" />
      <rect x={0} y={FLATE} width={960} height={372} fill={`url(#${ID}-hav)`} data-nocheck="" />
      {/* overflatelaget: varmt i sør, kaldt i nord */}
      <mask id={`${ID}-lag`}>
        <rect x={0} y={FLATE} width={960} height={90} fill={`url(#${ID}-lagfade)`} />
      </mask>
      <rect x={0} y={FLATE} width={960} height={90} fill={`url(#${ID}-overflate)`} mask={`url(#${ID}-lag)`} data-nocheck="" />
      <path d={flateUnder(BUNN, 540)} fill={`url(#${ID}-bunn)`} />
      {/* land med snø og is i nord */}
      <path d="M930 168 L 944 130 L 952 110 L 960 104 L 960 210 L 945 240 Z" fill="#6b7a6a" data-nocheck="" />
      <path d="M944 130 L 952 110 L 960 104 L 960 120 L 950 128 Z" fill="#eef6fb" data-nocheck="" />
      {Array.from({ length: 26 }, (_, i) => (
        <circle key={i} cx={r1(rnd() * 920)} cy={r1(FLATE + 90 + rnd() * 280)} r={1.2} fill="#bae6fd" opacity={0.25} data-nocheck="" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${i * 200} ${FLATE} q 25 -5 50 0 t 50 0 t 50 0 t 50 0`} stroke="#e0f2fe" strokeOpacity={0.35} strokeWidth={1.5} fill="none" data-nocheck="" />
      ))}
    </g>
  );
});

const OVERFLATE: P[] = [[30, FLATE + 30], [300, FLATE + 30], [600, FLATE + 32], [800, FLATE + 36], [SYNK_X - 10, FLATE + 44]];
const SYNK: P[] = bue([SYNK_X - 10, FLATE + 44], [SYNK_X + 30, 300], [SYNK_X - 6, 440]);
const RETUR: P[] = [[SYNK_X - 18, 450], [818, 418], [776, 386], [730, 410], [680, 456], [560, 470], [400, 446], [220, 466], [40, 448]];
const HELE: P[] = [...OVERFLATE, ...SYNK.slice(1), ...RETUR];

type S = { strom: number; varme: number; kald: number; synk: number; retur: number; tett: number; temp: number };

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });
const SOR = L("sør, mot ekvator", 86, 30, { color: K.dempet, size: 13, badge: [60, 30] });
const NORD = L("nord", 880, 30, { color: K.dempet, size: 13, badge: [900, 30] });
const VARM = L("varmt overflatevann nordover", 300, 236, { color: K.varm, at: [300, FLATE + 30], badge: [300, 250] });
const GOLF = L("Golfstrømmen er en del av overflatestrømmen", 300, 128, { color: K.dempet, size: 13, badge: [300, 120] });

const etiketter: Lab[][] = [
  [SOR, NORD, VARM, GOLF],
  [SOR, NORD, VARM, L("havet avgir varme til lufta", 640, 60, { color: K.varmSterk, at: [660, 120], badge: [600, 60] }), L("vind kan føre varme mot land", 760, 150, { color: K.tekst, size: 13, at: [880, 150], badge: [760, 148] })],
  [SOR, NORD, L("vannet avkjøles og blir tettere", 700, 268, { color: K.kald, at: [820, FLATE + 40], badge: [700, 268] }), L("saltholdighet påvirker også tettheten", 700, 292, { color: K.dempet, size: 13, badge: [700, 296] })],
  [SOR, NORD, L("tett vann synker", 760, 360, { color: K.dyp, at: [SYNK_X + 14, 320], badge: [780, 360] })],
  [SOR, NORD, VARM, L("kaldt vann sørover i dypet", 420, 420, { color: "#93c5fd", at: [420, 452], badge: [420, 410] }), L("omveltning", 600, 330, { color: K.tekst, weight: 800, badge: [600, 330] })],
];

const def: Def<S> = {
  id: "klima-amoc",
  tekst: {
    heading: "Omveltning i Atlanterhavet",
    title:
      "Skjematisk snitt nord–sør gjennom Atlanterhavet. Varmt overflatevann går nordover, havet avgir varme til lufta, vannet avkjøles og blir tettere, synker i nord og går tilbake sørover i dypet. Ikke et kart.",
    caption: "",
  },
  faser: ["Varmt vann nordover", "Varme til lufta", "Tettere vann", "Vannet synker", "Dyp returstrøm"],
  status: [
    "1. Varmt overflatevann strømmer nordover. Golfstrømmen og Den nordatlantiske strømmen er deler av denne overflatestrømmen.",
    "2. Varmt hav avgir energi til lufta, og vind kan føre varme og fuktighet videre mot land. Vannet blir kaldere på veien.",
    "3. Når sjøvannet avkjøles, øker tettheten. Saltholdigheten påvirker også hvor tett vannet blir.",
    "4. Tett vann kan synke. I nord synker vannet ned mot dypet.",
    "5. I dypet går kaldt vann tilbake sørover. Sammen med overflatestrømmen gir det en omveltning: AMOC.",
  ],
  bilder: [
    { strom: 0, varme: 0, kald: 0, synk: 0, retur: 0, tett: 0.3, temp: 0.8 },
    { strom: 1, varme: 0, kald: 0, synk: 0, retur: 0, tett: 0.3, temp: 0.8 },
    { strom: 1, varme: 1, kald: 0.4, synk: 0, retur: 0, tett: 0.4, temp: 0.55 },
    { strom: 1, varme: 0.6, kald: 1, synk: 0, retur: 0, tett: 0.85, temp: 0.25 },
    { strom: 1, varme: 0.4, kald: 1, synk: 1, retur: 0, tett: 0.85, temp: 0.25 },
    { strom: 1, varme: 0.4, kald: 1, synk: 1, retur: 1, tett: 0.85, temp: 0.25 },
  ],
  etiketter,
  keys: [
    { text: "varm overflatestrøm", color: K.varm, kind: "line" },
    { text: "kaldt, tett vann", color: K.dyp, kind: "line" },
    { text: "varme til lufta", color: K.varmSterk, kind: "line" },
  ],
  notes: ["Skjematisk snitt, ikke et havkart", "Dybden er sterkt overdrevet", "Ikke et varsel om framtidige endringer"],
  viewBox: "0 0 960 540",
  under: (s, fase) => (
    <Maalere
      rader={[
        { navn: "Temperatur i overflatevannet i nord", verdi: s.temp, farge: "linear-gradient(90deg,#3b82f6,#f4a259)", tekst: fase <= 1 ? "varmt" : fase === 2 ? "synker" : "kaldt" },
        { navn: "Tetthet i overflatevannet i nord", verdi: s.tett, farge: "#3b82f6", tekst: fase <= 2 ? "lavere" : "høyere: vannet kan synke" },
      ]}
    />
  ),
  tegn: (s, { sek }) => {
    const f = (sek * 0.06) % 1;
    const alleFire = s.retur > 0.5;
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-himmel`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a7fa8" />
            <stop offset="100%" stopColor="#25384c" />
          </linearGradient>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#13506f" />
            <stop offset="45%" stopColor="#0d3149" />
            <stop offset="100%" stopColor="#06141f" />
          </linearGradient>
          <linearGradient id={`${ID}-overflate`} x1="0" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d97a3a" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#b8814f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e88c7" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${ID}-lagfade`} x1="0" y1={FLATE} x2="0" y2={FLATE + 90} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${ID}-bunn`} x1="0" y1="400" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5a4d3f" />
            <stop offset="100%" stopColor="#2c251f" />
          </linearGradient>
        </KlimaDefs>
        <Landskap />
        <Sol id={ID} x={70} y={50} r={24} />
        <Sky id={ID} x={220} y={74} s={0.8} />
        <Sky id={ID} x={760} y={84} s={0.9} mork={0.6} opacity={0.6 + 0.4 * s.varme} />
        {/* kaldt vann i nord: blått felt som vokser */}
        <ellipse cx={SYNK_X - 30} cy={FLATE + 50} rx={r1(40 + 70 * s.kald)} ry={r1(18 + 22 * s.kald)} fill="#2563eb" opacity={op(0.35 * s.kald)} filter={`url(#${ID}-myk)`} data-nocheck="" />
        {/* varme til lufta */}
        <g opacity={op(s.varme)}>
          {[560, 640, 720, 800].map((x, i) => (
            <Bolge key={x} a={[x, FLATE - 4]} b={[x + 12, FLATE - 84]} farge={K.varmSterk} amp={5} lambda={18} fase={sek * 0.8 + i * 0.25} w={3} />
          ))}
          <Pil pts={[[700, 140], [900, 140]]} farge={K.tekst} w={3.5} opacity={0.8} />
        </g>
        <Pil pts={OVERFLATE} farge={K.varm} w={7} opacity={s.strom} />
        <Pil pts={SYNK} farge={K.dyp} w={7} opacity={s.synk} />
        <Pil pts={RETUR} farge="#60a5fa" w={7} opacity={s.retur} />
        {alleFire ? (
          <Strom pts={HELE} farge="#f8fafc" fase={f} antall={14} r={4} opacity={1} />
        ) : (
          <>
            <Strom pts={OVERFLATE} farge="#fde68a" fase={(f * 2) % 1} antall={6} opacity={s.strom} />
            <Strom pts={SYNK} farge="#bfdbfe" fase={(f * 3) % 1} antall={3} opacity={s.synk} />
          </>
        )}
      </>
    );
  },
};

export const KlimaAmocFigur = lagFigur(def);
