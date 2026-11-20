/**
 * Figur 5.7 (geografi kap. 5, «Drivhuseffekten»): den naturlige drivhuseffekten og hva mer drivhusgass gjør.
 *
 * Sollys tilfører energi. Jordoverflaten sender energi videre som langbølget stråling (varmestråling).
 * Drivhusgasser tar opp og sender ut slik stråling i flere retninger, også tilbake mot bakken og ut mot
 * verdensrommet. Mer drivhusgass reduserer i utgangspunktet varmetapet til verdensrommet; systemet varmes,
 * og en varmere jord avgir etter hvert mer varmestråling ved et høyere temperaturnivå (kapitteltekst:
 * Lindsey, 2009; NASA, u.å.-a). Ingen energitall; pilene er ikke mål på mengder. Atmosfæren er ikke et tett lokk.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { prng } from "./prosess-kit";
import { Bolge, KlimaDefs, Maalere, Skog, Sky, Sol } from "./klima-modell-kit";
import { K, flateUnder, op, ruProfil, yPaa, type P } from "./klima-modell-geo";

const ID = "kdh";
const BAKKE = 420;

const LAND = ruProfil([[330, 436], [360, 428], [400, 420], [440, 414], [520, 396], [600, 404], [680, 380], [760, 392], [840, 372], [960, 386]], 21, 8, 7);

/** Molekyler i atmosfæren: de første er den naturlige mengden, resten kommer til i «mer drivhusgass». */
const MOLEKYLER: { x: number; y: number; vann: boolean }[] = (() => {
  const rnd = prng(77);
  const ut: { x: number; y: number; vann: boolean }[] = [];
  for (let i = 0; i < 30; i++) ut.push({ x: 40 + rnd() * 880, y: 150 + rnd() * 190, vann: rnd() < 0.35 });
  return ut;
})();
const NATURLIG = 14;

/** Varmestråling fra bakken: start, treffpunkt (molekyl) og hvor den sendes videre. */
type Str = { fra: P; mol: P; ut?: P; ned: P; side: P; fri3: boolean; fri4: boolean };
const STRALER: Str[] = [
  { fra: [150, BAKKE + 12], mol: [176, 236], ned: [214, BAKKE + 8], side: [96, 300], fri3: false, fri4: false },
  { fra: [300, BAKKE + 12], mol: [318, 300], ned: [266, BAKKE + 8], side: [374, 330], fri3: true, fri4: false },
  { fra: [460, 404], mol: [478, 214], ned: [520, 396], side: [404, 250], fri3: false, fri4: false },
  { fra: [610, 400], mol: [640, 288], ned: [596, 400], side: [700, 312], fri3: true, fri4: true },
  { fra: [780, 390], mol: [800, 230], ned: [846, 376], side: [738, 262], fri3: false, fri4: false },
];

const Landskap = memo(function Landskap() {
  const rnd = prng(5);
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={960} height={540} fill={`url(#${ID}-luft)`} data-nocheck="" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={r1(rnd() * 960)} cy={r1(rnd() * 80)} r={r1(0.6 + rnd() * 1.2)} fill="#fff" opacity={r1(0.3 + rnd() * 0.5)} data-nocheck="" />
      ))}
      {/* atmosfærens kant: lys bue */}
      <path d="M0 112 Q 480 84 960 112" fill="none" stroke="#7dd3fc" strokeOpacity={0.35} strokeWidth={10} filter={`url(#${ID}-myk)`} data-nocheck="" />
      <path d="M0 112 Q 480 84 960 112" fill="none" stroke="#bae6fd" strokeOpacity={0.5} strokeWidth={1.5} data-nocheck="" />
      {/* hav og land */}
      <rect x={0} y={BAKKE} width={960} height={120} fill={`url(#${ID}-hav)`} data-nocheck="" />
      {[440, 462, 488, 518].map((y, i) => (
        <path key={y} d={`M${10 + i * 20} ${y} q 24 -5 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0`} stroke="#9bd2f0" strokeOpacity={0.25} strokeWidth={1.5} fill="none" data-nocheck="" />
      ))}
      <path d={flateUnder(LAND, 540)} fill={`url(#${ID}-land)`} />
      <Skog pr={LAND} fra={470} til={660} tett={12} seed={2} h={20} />
      <Skog pr={LAND} fra={860} til={950} tett={12} seed={8} h={18} />
      {[700, 724, 748].map((x, i) => (
        <g key={x} data-nocheck="">
          <rect x={x} y={yPaa(LAND, x) - 12 - i} width={15} height={12} fill={i === 1 ? "#c9a27a" : "#b4483c"} />
          <polygon points={`${x - 2},${yPaa(LAND, x) - 12 - i} ${x + 7.5},${yPaa(LAND, x) - 20 - i} ${x + 17},${yPaa(LAND, x) - 12 - i}`} fill="#3a2b25" />
        </g>
      ))}
    </g>
  );
});

function Molekyl({ x, y, vann, lys }: { x: number; y: number; vann: boolean; lys: number }) {
  return (
    <g aria-hidden="true" transform={`translate(${r1(x)} ${r1(y)})`} data-nocheck="">
      {lys > 0.02 ? <circle r={16} fill="#ff8a65" opacity={op(lys * 0.55)} filter={`url(#${ID}-myk)`} /> : null}
      {vann ? (
        <>
          <circle cx={-6} cy={4} r={3.2} fill="#e2e8f0" />
          <circle cx={6} cy={4} r={3.2} fill="#e2e8f0" />
          <circle cx={0} cy={0} r={5} fill="#60a5fa" />
        </>
      ) : (
        <>
          <circle cx={-8} cy={0} r={4} fill="#f87171" />
          <circle cx={8} cy={0} r={4} fill="#f87171" />
          <circle cx={0} cy={0} r={4.6} fill="#334155" stroke="#94a3b8" strokeWidth={1} />
        </>
      )}
    </g>
  );
}

type S = { sol: number; ir: number; gass: number; mer: number; varm: number; inn: number; ut: number; temp: number };

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });
const ROM = L("verdensrommet", 860, 40, { color: K.dempet, size: 13, badge: [900, 40] });
const ATM = L("atmosfæren", 76, 138, { color: "#bae6fd", size: 13, anchor: "start", badge: [60, 140] });
const SOLLYS = L("sollys (kortbølget)", 250, 78, { color: K.sol, at: [262, 160], badge: [214, 70] });
const REFL = L("noe sendes tilbake", 600, 60, { color: K.sol, size: 13, at: [664, 112], badge: [610, 70] });
const OPPTAK = L("bakken tar opp energi og varmes", 520, 506, { color: K.varm, size: 13, badge: [520, 500] });
const IR = L("varmestråling (langbølget)", 330, 360, { color: K.ir, at: [306, 384], badge: [380, 360] });
const GASS = L("drivhusgasser tar opp og sender ut", 640, 182, { color: K.co2, at: [640, 288], badge: [700, 200] });
const NED = L("også nedover mot bakken", 208, 372, { color: K.ir, size: 13, at: [200, 340], badge: [150, 370] });
const UT = L("noe stråler fortsatt ut", 640, 132, { color: K.ir, size: 13, at: [640, 150], badge: [720, 140] });

const etiketter: Lab[][] = [
  [ROM, ATM, SOLLYS, REFL, OPPTAK],
  [ROM, ATM, SOLLYS, IR, OPPTAK],
  [ROM, ATM, IR, GASS, NED, UT],
  [ROM, ATM, L("mer drivhusgass", 640, 182, { color: K.co2, at: [640, 288], badge: [700, 200] }), L("mindre varmetap til verdensrommet i starten", 520, 132, { color: K.ir, size: 13, badge: [560, 140] }), NED],
  [ROM, ATM, L("varmere overflate sender ut mer varmestråling", 480, 506, { color: K.varmSterk, size: 13, badge: [480, 500] }), L("ny balanse ved høyere temperatur", 520, 132, { color: K.ir, size: 13, badge: [560, 140] })],
];

const def: Def<S> = {
  id: "klima-drivhus",
  tekst: {
    heading: "Den naturlige drivhuseffekten",
    title:
      "Landskap under atmosfæren. Sollys kommer inn, noe sendes tilbake og bakken varmes. Bakken sender varmestråling oppover. Drivhusgasser tar opp strålingen og sender den ut i flere retninger, også ned mot bakken, mens noe fortsatt stråler ut. Med mer drivhusgass går mindre ut i starten, og overflaten varmes til en ny balanse. Ingen energitall.",
    caption: "",
  },
  faser: ["Sollys inn", "Varmestråling", "Drivhusgasser", "Mer drivhusgass", "Ny balanse"],
  status: [
    "1. Sollys tilfører energi. Noe sendes tilbake fra skyer og lyse flater, resten tas opp, og bakken varmes.",
    "2. Bakken sender energien videre som langbølget stråling, altså varmestråling, oppover mot atmosfæren.",
    "3. Drivhusgasser som karbondioksid og vanndamp tar opp varmestråling og sender den ut i flere retninger, også tilbake mot bakken. Noe stråler fortsatt ut. Dette er den naturlige drivhuseffekten.",
    "4. Med mer drivhusgass sendes mer stråling tilbake, og varmetapet til verdensrommet blir i utgangspunktet mindre. Systemet mottar mer energi enn det avgir.",
    "5. Systemet varmes. En varmere jord avgir etter hvert mer varmestråling, men ved et høyere temperaturnivå. Dette er den forsterkede drivhuseffekten.",
  ],
  bilder: [
    { sol: 1, ir: 0, gass: 0, mer: 0, varm: 0.3, inn: 0.7, ut: 0.7, temp: 0.5 },
    { sol: 1, ir: 0, gass: 0, mer: 0, varm: 0.3, inn: 0.7, ut: 0.7, temp: 0.5 },
    { sol: 0.5, ir: 1, gass: 0, mer: 0, varm: 0.5, inn: 0.7, ut: 0.7, temp: 0.5 },
    { sol: 0.35, ir: 1, gass: 1, mer: 0, varm: 0.5, inn: 0.7, ut: 0.7, temp: 0.5 },
    { sol: 0.35, ir: 1, gass: 1, mer: 1, varm: 0.6, inn: 0.7, ut: 0.5, temp: 0.58 },
    { sol: 0.35, ir: 1, gass: 1, mer: 1, varm: 1, inn: 0.7, ut: 0.7, temp: 0.78 },
  ],
  etiketter,
  keys: [
    { text: "sollys (kortbølget)", color: K.sol, kind: "line" },
    { text: "varmestråling (langbølget)", color: K.ir, kind: "line" },
    { text: "karbondioksid (CO₂)", color: "#f87171", kind: "fill" },
    { text: "vanndamp", color: "#60a5fa", kind: "fill" },
  ],
  notes: ["Konstruert, ikke i målestokk", "Ingen energitall: pilene er ikke mål på mengder", "Molekylene er sterkt forstørret"],
  viewBox: "0 0 960 540",
  under: (s, fase) => (
    <Maalere
      rader={[
        { navn: "Energi inn fra sola", verdi: s.inn, farge: K.sol, tekst: "uendret i figuren" },
        { navn: "Varmestråling ut til verdensrommet", verdi: s.ut, farge: K.ir, tekst: fase === 4 ? "mindre enn inn" : fase === 5 ? "lik inn igjen" : "i balanse med inn" },
        { navn: "Overflatetemperatur", verdi: s.temp, farge: "linear-gradient(90deg,#7cc4ff,#ff7a45)", tekst: fase === 4 ? "begynner å stige" : fase === 5 ? "høyere nivå" : "naturlig nivå" },
      ]}
    />
  ),
  tegn: (s, { sek }) => {
    const f = sek * 0.6;
    const antall = Math.round(NATURLIG + (MOLEKYLER.length - NATURLIG) * s.mer);
    const puls = (i: number) => (0.5 + 0.5 * Math.sin(sek * 2.2 + i * 1.7)) * s.gass;
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-luft`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050b16" />
            <stop offset="17%" stopColor="#0b1830" />
            <stop offset="24%" stopColor="#173456" />
            <stop offset="60%" stopColor="#2b5a82" />
            <stop offset="78%" stopColor="#4a83ac" />
          </linearGradient>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f5f84" />
            <stop offset="100%" stopColor="#0a2638" />
          </linearGradient>
          <linearGradient id={`${ID}-land`} x1="0" y1="370" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5d7a4a" />
            <stop offset="100%" stopColor="#2f4127" />
          </linearGradient>
          <linearGradient id={`${ID}-varme`} x1="0" y1="370" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff7a45" stopOpacity="0" />
            <stop offset="30%" stopColor="#ff7a45" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff7a45" stopOpacity="0.1" />
          </linearGradient>
        </KlimaDefs>
        <Landskap />
        {/* bakken varmes: glød over overflaten */}
        <rect x={0} y={370} width={960} height={170} fill={`url(#${ID}-varme)`} opacity={op(0.1 + 0.6 * s.varm)} data-nocheck="" />
        <Sol id={ID} x={70} y={50} r={30} />
        <Sky id={ID} x={690} y={170} s={1.05} />
        {/* sollys inn: fire stråler, én reflekteres fra skya og én fra en lys flate */}
        <g opacity={op(s.sol)}>
          {([[[110, 70], [262, BAKKE + 16]], [[120, 60], [400, BAKKE + 20]], [[130, 54], [880, 380]]] as [P, P][]).map(([a, b], i) => (
            <Bolge key={i} a={a} b={b} farge={K.sol} amp={4} lambda={12} fase={f + i * 0.3} w={3} />
          ))}
          <Bolge a={[124, 56]} b={[642, 150]} farge={K.sol} amp={4} lambda={12} fase={f} w={3} spiss={false} />
          <Bolge a={[642, 150]} b={[700, 40]} farge={K.sol} amp={4} lambda={12} fase={f} w={3} opacity={0.9} />
        </g>
        {/* varmestråling */}
        <g opacity={op(s.ir)}>
          {STRALER.map((st, i) => {
            const fri = s.mer > 0.5 ? st.fri4 : st.fri3;
            const fanges = s.gass > 0.05 && !fri;
            const topp: P = [st.fra[0] + (st.mol[0] - st.fra[0]) * 1.8, 60];
            const sluttFri: P = s.gass > 0.05 ? topp : [st.fra[0] + (st.mol[0] - st.fra[0]) * 1.1, 190];
            return (
              <g key={i}>
                {fanges ? (
                  <>
                    <Bolge a={st.fra} b={st.mol} farge={K.ir} amp={7} lambda={26} fase={f * 0.6 + i * 0.2} w={3.2} spiss={false} />
                    <Bolge a={st.mol} b={[st.mol[0] + 20, 70]} farge={K.ir} amp={6} lambda={26} fase={f * 0.6} w={2.8} opacity={0.8 * s.gass} />
                    <Bolge a={st.mol} b={st.ned} farge={K.ir} amp={6} lambda={26} fase={f * 0.6} w={2.8} opacity={s.gass} />
                    <Bolge a={st.mol} b={st.side} farge={K.ir} amp={5} lambda={26} fase={f * 0.6} w={2.4} opacity={0.6 * s.gass} />
                  </>
                ) : (
                  <Bolge a={st.fra} b={sluttFri} farge={K.ir} amp={7} lambda={26} fase={f * 0.6 + i * 0.2} w={3.2} opacity={s.gass > 0.05 ? 1 : 0.9} />
                )}
              </g>
            );
          })}
          {/* varmere bakke: flere stråler i ny balanse */}
          {s.varm > 0.8 ? (
            <>
              <Bolge a={[540, 404]} b={[560, 60]} farge={K.ir} amp={7} lambda={26} fase={f * 0.6} w={3.2} opacity={(s.varm - 0.8) * 5} />
              <Bolge a={[40, BAKKE + 12]} b={[60, 60]} farge={K.ir} amp={7} lambda={26} fase={f * 0.6 + 0.4} w={3.2} opacity={(s.varm - 0.8) * 5} />
            </>
          ) : null}
        </g>
        {MOLEKYLER.slice(0, antall).map((m, i) => (
          <Molekyl key={i} x={m.x} y={m.y} vann={m.vann} lys={0} />
        ))}
        {STRALER.map((st, i) => (
          <Molekyl key={`t${i}`} x={st.mol[0]} y={st.mol[1]} vann={i % 2 === 1} lys={puls(i)} />
        ))}
      </>
    );
  },
};

export const KlimaDrivhusFigur = lagFigur(def);
