/**
 * Figur 5.8 (geografi kap. 5, «Karbon flyttes mellom lagre»): utvalgte lagre og overføringer i karbonkretsløpet.
 *
 * Et landskap med skog, jordsmonn, berggrunn med fossile brensler, en by med forbrenning og havet med overflatevann
 * og dypere vannmasser. Fotosyntese tar opp CO₂, celleånding, nedbrytning og forbrenning sender karbon tilbake,
 * havet utveksler CO₂ med lufta og fører karbon ned i dypere vann. Fossil forbrenning flytter karbon fra langvarige
 * lagre inn i det raske kretsløpet, og naturens opptak fjerner ikke hele tilførselen (kapitteltekst: Riebeek, 2011;
 * IPCC, 2023). Uten tall; pilbreddene angir ikke mengder, og figuren er ikke et fullstendig karbonregnskap.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { prng } from "./prosess-kit";
import { KlimaDefs, Maalere, Pil, Skog, Sky, Sol, Strom } from "./klima-modell-kit";
import { K, bue, flateUnder, linjeD, op, ruProfil, type P } from "./klima-modell-geo";

const ID = "kkb";
const HAV_X = 580;
const HAV_Y = 344;

const LAND = ruProfil([[0, 336], [80, 330], [160, 334], [260, 328], [340, 334], [440, 330], [510, 334], [548, HAV_Y]], 31, 8, 5);
/** Havbunnen fra stranda og utover (samme berggrunn fortsetter under havet). */
const HAVBUNN = ruProfil([[548, HAV_Y], [580, 366], [620, 404], [680, 452], [740, 486], [820, 498], [960, 504]], 51, 8, 6);
const BUNN_HELE: P[] = [...LAND.slice(0, -1), ...HAVBUNN];
const VANN = `M548 ${HAV_Y} L960 ${HAV_Y} L${HAVBUNN.slice().reverse().map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L")} Z`;
const AASER = ruProfil([[0, 300], [90, 250], [170, 270], [260, 220], [350, 262], [430, 240], [520, 280], [600, 300]], 17, 8, 8);
/** CO₂-molekyler i lufta: de siste kommer til når fossilt karbon brennes. */
const LUFT_CO2: P[] = (() => {
  const rnd = prng(41);
  return Array.from({ length: 26 }, () => [30 + rnd() * 900, 30 + rnd() * 120] as P);
})();

const Landskap = memo(function Landskap() {
  const rnd = prng(12);
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={960} height={HAV_Y + 4} fill={`url(#${ID}-himmel)`} data-nocheck="" />
      <path d={flateUnder(AASER, 360)} fill="#4a6478" opacity={0.7} data-nocheck="" />
      {/* land: jordsmonn, berggrunn med lag og fossile brensler */}
      <path d={flateUnder(BUNN_HELE, 540)} fill="#4a4038" />
      <path d={VANN} fill={`url(#${ID}-hav)`} data-nocheck="" />
      <path d={`${linjeD(HAVBUNN)} L960 ${HAVBUNN[HAVBUNN.length - 1][1] + 12} L548 ${HAV_Y + 10} Z`} fill="#6b5a45" opacity={0.8} data-nocheck="" />
      <line x1={HAV_X + 40} y1={414} x2={960} y2={414} stroke="#7dd3fc" strokeOpacity={0.25} strokeDasharray="5 7" strokeWidth={1.4} data-nocheck="" />
      {Array.from({ length: 34 }, (_, i) => (
        <circle key={i} cx={r1(HAV_X + 30 + rnd() * 350)} cy={r1(HAV_Y + 6 + rnd() * 40)} r={1.6} fill="#86efac" opacity={0.6} data-nocheck="" />
      ))}
      {[352, 366, 382].map((y, i) => (
        <path key={y} d={`M${HAV_X + 20 + i * 14} ${y} q 20 -4 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} stroke="#bae6fd" strokeOpacity={0.22} strokeWidth={1.4} fill="none" data-nocheck="" />
      ))}
      <path d={`${linjeD(LAND)} L548 384 L0 384 Z`} fill={`url(#${ID}-jord)`} />
      {[410, 432, 500, 524].map((y, i) => (
        <path key={y} d={`M0 ${y} Q 200 ${y - 6 + i * 3} 400 ${y + 4} T ${HAV_X - 30} ${y - 2}`} stroke="#2a221c" strokeOpacity={0.5} strokeWidth={2} fill="none" data-nocheck="" />
      ))}
      <path d={`M120 452 Q 260 440 400 456 Q 470 462 ${HAV_X - 40} 452 L ${HAV_X - 40} 482 Q 430 494 300 486 Q 200 480 120 484 Z`} fill="#141414" stroke="#3f3f46" strokeWidth={1.2} />
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} d={`M${r1(40 + i * 14)} ${r1(336 + (i % 3))} q ${(i % 2 ? 1 : -1) * 6} 14 ${(i % 2 ? 1 : -1) * 2} 28`} stroke="#6b4f3a" strokeWidth={1.6} fill="none" data-nocheck="" />
      ))}
      <Skog pr={LAND} fra={14} til={250} tett={17} seed={6} h={64} farge="#2f6b45" />
      <Skog pr={LAND} fra={30} til={240} tett={23} seed={16} h={50} farge="#3d7f52" />
      {/* nedfalne blader og en råtnende stamme */}
      <rect x={232} y={326} width={46} height={7} rx={3.5} fill="#5b4330" transform="rotate(-4 255 330)" data-nocheck="" />
      {/* by og kraftverk */}
      {[318, 344, 372, 404].map((x, i) => (
        <g key={x} data-nocheck="">
          <rect x={x} y={286 - (i % 2) * 22} width={24} height={46 + (i % 2) * 22} fill={i % 2 ? "#64748b" : "#475569"} />
          {Array.from({ length: 6 + (i % 2) * 3 }, (_, k) => (
            <rect key={k} x={x + 4 + (k % 3) * 6} y={292 - (i % 2) * 22 + Math.floor(k / 3) * 12} width={3} height={5} fill="#fde68a" opacity={0.55} />
          ))}
        </g>
      ))}
      <rect x={440} y={290} width={60} height={44} fill="#52525b" />
      <rect x={470} y={226} width={14} height={66} fill="#71717a" />
      <rect x={476} y={334} width={4} height={122} fill="#27272a" stroke="#52525b" strokeWidth={1} data-nocheck="" />
    </g>
  );
});

type S = { lagre: number; foto: number; aand: number; ned: number; hav: number; fossil: number; co2: number };

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });
const ATM = L("CO₂ i atmosfæren", 480, 40, { color: K.co2, weight: 800, badge: [480, 40] });
const PLANTER = L("planter", 120, 262, { at: [130, 300], badge: [70, 260] });
const JORD = L("jordsmonn", 160, 376, { color: "#d6b38a", at: [180, 360], badge: [110, 372] });
const FOSSIL = L("berggrunn og fossile brensler", 300, 524, { color: "#cbd5e1", at: [300, 470], badge: [250, 520] });
const HAVET = L("havet", 760, 374, { color: K.kald, at: [740, 360], badge: [700, 372] });
const DYP = L("dypere vann", 880, 470, { color: "#7dd3fc", at: [880, 450], badge: [900, 480] });

const etiketter: Lab[][] = [
  [ATM, PLANTER, JORD, FOSSIL, HAVET, DYP],
  [ATM, L("fotosyntese", 228, 150, { color: K.gronn, at: [200, 200], badge: [250, 140] }), L("celleånding", 46, 150, { color: K.co2, at: [76, 200], badge: [30, 140], anchor: "start" }), JORD, FOSSIL, HAVET],
  [ATM, L("fotosyntese", 228, 150, { color: K.gronn, at: [200, 200], badge: [250, 140] }), L("nedbrytning", 330, 196, { color: "#d6b38a", at: [290, 250], badge: [330, 180] }), JORD, FOSSIL, HAVET],
  [ATM, L("havet tar opp CO₂", 660, 120, { color: K.kald, at: [684, 210], badge: [640, 130] }), L("havet avgir CO₂", 860, 120, { color: K.teal, at: [840, 210], badge: [880, 130] }), L("karbon føres ned i dypere vann", 760, 440, { color: "#7dd3fc", at: [824, 460], badge: [760, 470] }), FOSSIL],
  [ATM, L("forbrenning", 400, 168, { color: K.varmSterk, at: [478, 196], badge: [420, 160] }), L("fossilt karbon hentes opp", 330, 420, { color: K.varmSterk, size: 13, at: [478, 420], badge: [350, 420] }), L("opptaket fjerner ikke alt", 760, 120, { color: K.kald, size: 13, at: [684, 210], badge: [760, 130] })],
];

const FOTO = bue([200, 110], [150, 150], [150, 236]);
const AAND = bue([86, 236], [60, 170], [96, 104]);
const NED = bue([268, 330], [300, 240], [310, 110]);
const FOSSIL_BANE: P[] = [[478, 456], [478, 226], [478, 160], [490, 100]];
const HAV_INN = bue([660, 100], [690, 220], [684, HAV_Y + 2]);
const HAV_UT = bue([830, HAV_Y + 2], [810, 220], [850, 100]);
const HAV_NED = bue([800, 380], [830, 430], [840, 488]);

const def: Def<S> = {
  id: "klima-karbon",
  tekst: {
    heading: "Karbon flyttes mellom lagre",
    title:
      "Landskap med skog, jordsmonn, berggrunn med fossile brensler, en by med forbrenning og havet. Piler viser fotosyntese fra lufta til plantene, celleånding og nedbrytning tilbake til lufta, havets opptak og utslipp av CO₂, karbon som føres ned i dypere vann og forbrenning av fossilt karbon. I siste steg øker CO₂ i lufta. Ingen tall.",
    caption: "",
  },
  faser: ["Lagrene", "Fotosyntese og celleånding", "Nedbrytning", "Havet", "Fossil forbrenning"],
  status: [
    "1. Karbon finnes i lufta som CO₂, i levende organismer, i jordsmonnet, i havet og i berggrunnen, blant annet som fossile brensler.",
    "2. Med fotosyntese bygger plantene organiske stoffer av CO₂ og vann, og karbon tas opp fra lufta. Celleånding frigjør energi og kan sende CO₂ tilbake.",
    "3. Når døde planterester brytes ned i jordsmonnet, kan karbon også gå tilbake til lufta.",
    "4. Havet tar opp og avgir CO₂, og karbon kan føres mellom overflatevannet og dypere vannmasser.",
    "5. Ved forbrenning av kull, olje og naturgass flyttes karbon fra langvarige lagre i berggrunnen inn i det raske kretsløpet. Naturens opptak fjerner ikke hele tilførselen, og CO₂ i lufta øker.",
  ],
  bilder: [
    { lagre: 1, foto: 0, aand: 0, ned: 0, hav: 0, fossil: 0, co2: 0.5 },
    { lagre: 1, foto: 0, aand: 0, ned: 0, hav: 0, fossil: 0, co2: 0.5 },
    { lagre: 0.6, foto: 1, aand: 1, ned: 0, hav: 0, fossil: 0, co2: 0.5 },
    { lagre: 0.6, foto: 1, aand: 0.4, ned: 1, hav: 0, fossil: 0, co2: 0.5 },
    { lagre: 0.6, foto: 0.3, aand: 0.3, ned: 0.3, hav: 1, fossil: 0, co2: 0.5 },
    { lagre: 0.6, foto: 0.3, aand: 0.3, ned: 0.3, hav: 1, fossil: 1, co2: 0.85 },
  ],
  etiketter,
  keys: [
    { text: "opptak fra lufta", color: K.gronn, kind: "line" },
    { text: "tilbake til lufta", color: K.co2, kind: "line" },
    { text: "havets utveksling", color: K.kald, kind: "line" },
    { text: "fossil forbrenning", color: K.varmSterk, kind: "line" },
  ],
  notes: ["Konstruert landskap, ikke i målestokk", "Utvalgte overføringer uten tall: pilbreddene angir ikke mengder"],
  viewBox: "0 0 960 540",
  under: (s, fase) => (
    <Maalere
      rader={[
        { navn: "CO₂ i atmosfæren", verdi: s.co2, farge: K.co2, tekst: fase === 5 ? "øker" : "utveksles med lagrene" },
        { navn: "Karbon fra fossile lagre", verdi: 0.1 + 0.8 * s.fossil, farge: K.varmSterk, tekst: fase === 5 ? "føres inn i det raske kretsløpet" : "ligger lagret lenge" },
      ]}
    />
  ),
  tegn: (s, { sek }) => {
    const f = (sek * 0.12) % 1;
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-himmel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b3047" />
            <stop offset="100%" stopColor="#5d8db0" />
          </linearGradient>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f6a8f" />
            <stop offset="30%" stopColor="#164b68" />
            <stop offset="100%" stopColor="#081b2a" />
          </linearGradient>
          <linearGradient id={`${ID}-jord`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b3526" />
            <stop offset="100%" stopColor="#6b5340" />
          </linearGradient>
          <radialGradient id={`${ID}-co2`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4a5f0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c4a5f0" stopOpacity="0" />
          </radialGradient>
        </KlimaDefs>
        <Landskap />
        <Sol id={ID} x={880} y={70} r={26} />
        <Sky id={ID} x={300} y={200} s={0.7} opacity={0.85} />
        <Sky id={ID} x={640} y={236} s={0.6} opacity={0.75} />
        <ellipse cx={480} cy={90} rx={470} ry={r1(50 + 30 * s.co2)} fill={`url(#${ID}-co2)`} opacity={op(0.2 + 0.8 * s.co2)} data-nocheck="" />
        {LUFT_CO2.slice(0, Math.round(12 + 14 * Math.max(0, (s.co2 - 0.5) / 0.35))).map(([x, y], i) => (
          <g key={i} transform={`translate(${r1(x + Math.sin(sek * 0.5 + i) * 6)} ${r1(y + Math.cos(sek * 0.4 + i) * 4)})`} aria-hidden="true" data-nocheck="">
            <circle cx={-7} r={3.4} fill="#f87171" />
            <circle cx={7} r={3.4} fill="#f87171" />
            <circle r={4} fill="#334155" stroke="#94a3b8" strokeWidth={1} />
          </g>
        ))}
        {/* røyk fra pipa ved forbrenning */}
        <g opacity={op(s.fossil)} data-nocheck="">
          {[0, 1, 2, 3].map((i) => {
            const t = (sek * 0.25 + i / 4) % 1;
            return <circle key={i} cx={r1(478 + t * 30)} cy={r1(220 - t * 90)} r={r1(8 + t * 18)} fill="#94a3b8" opacity={op(0.5 * (1 - t))} />;
          })}
        </g>
        <Pil pts={FOTO} farge={K.gronn} w={5} opacity={s.foto} />
        <Strom pts={FOTO} farge={K.gronn} fase={f} antall={4} opacity={s.foto} />
        <Pil pts={AAND} farge={K.co2} w={5} opacity={s.aand} />
        <Strom pts={AAND} farge={K.co2} fase={f} antall={4} opacity={s.aand} />
        <Pil pts={NED} farge="#d6b38a" w={5} opacity={s.ned} />
        <Strom pts={NED} farge="#d6b38a" fase={f} antall={4} opacity={s.ned} />
        <Pil pts={HAV_INN} farge={K.kald} w={5} opacity={s.hav} />
        <Strom pts={HAV_INN} farge={K.kald} fase={f} antall={4} opacity={s.hav} />
        <Pil pts={HAV_UT} farge={K.teal} w={5} opacity={s.hav} />
        <Strom pts={HAV_UT} farge={K.teal} fase={f} antall={4} opacity={s.hav} />
        <Pil pts={HAV_NED} farge="#7dd3fc" w={4} opacity={s.hav} />
        <Pil pts={FOSSIL_BANE} farge={K.varmSterk} w={5} opacity={s.fossil} />
        <Strom pts={FOSSIL_BANE} farge="#fed7aa" fase={f} antall={6} opacity={s.fossil} />
      </>
    );
  },
};

export const KlimaKarbonFigur = lagFigur(def);
