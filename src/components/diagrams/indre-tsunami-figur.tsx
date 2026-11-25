/**
 * Figur 3.11 (geografi kap. 3, «Fra havbunn til kyst»): fra vannforskyvning til kyst.
 *
 * Skjematisk snitt fra dypt hav over sokkelen til en kyst med bebyggelse. Havbunnen forskyves brått og
 * vannmassen over settes i bevegelse; en bølgeserie sprer seg med liten høyde over dypt hav; i grunnere vann
 * avtar farten, bølgelengden blir kortere og høyden kan øke; til slutt når vann og sterke strømmer inn over
 * land. Formene er illustrasjoner (kapitteltekst og figurtekst: NOAA, u.å.-a, u.å.-b): ingen beregnede
 * bølgehøyder, ankomsttider, oversvømmelse eller sikkerhetssoner, og ingen felles målestokk.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur } from "./steg-kit";
import { TSUNAMI_FASER, TSUNAMI_STATUS } from "./indre-tsunami-tekst";
import { Pil, Strom } from "./klima-modell-kit";
import { K, glatt, linjeD, op, ruProfil, yPaa, type P } from "./klima-modell-geo";

const ID = "itsu";
const B = 960;
const HAV = 186;


/** Havbunn og land (fra venstre): dyphav, skråning, sokkel, strand og land med en liten bygd. */
const BUNN = ruProfil(
  [[0, 486], [118, 486], [124, 484], [236, 484], [420, 478], [520, 420], [620, 330], [700, 268], [770, 222], [812, 194], [846, 178], [900, 166], [960, 160]],
  3, 8, 3,
);
const FORKAST_X = 180;

type S = { hev: number; xw: number; a: number; lam: number; antall: number; flom: number; fart: number };

/** Havoverflaten: en bølgeserie (fronten først), høyden avtar bakover i serien. */
function overflate(x: number, s: S, drift: number) {
  let eta = 0;
  for (let k = 0; k < 3; k++) {
    const ak = s.a * (k === 0 ? 1 : k === 1 ? 0.72 * s.antall : 0.5 * s.antall);
    const c = s.xw + drift - k * s.lam * 1.5;
    const u = (x - c) / (s.lam * 0.42);
    eta += ak * Math.exp(-u * u) - ak * 0.28 * Math.exp(-(((x - c + s.lam * 0.7) / (s.lam * 0.45)) ** 2));
  }
  return HAV - eta;
}

const Land = memo(function Land() {
  const hus = [858, 884, 912, 936];
  return (
    <g aria-hidden="true">
      <path d={`${linjeD(BUNN)} L${B} 540 L0 540 Z`} fill={`url(#${ID}-bunn)`} stroke="#3a2c1f" strokeWidth={1.8} />
      {/* sedimentlag på sokkelen */}
      {[16, 34].map((dy) => (
        <path key={dy} d={linjeD(BUNN.filter(([x]) => x > 420).map(([x, y]) => [x, y + dy] as P))} fill="none" stroke="#2a2016" strokeOpacity={0.25} strokeWidth={1.4} data-nocheck="" />
      ))}
      {/* trær og hus på land */}
      {[820, 834, 848, 950].map((x, i) => (
        <path key={x} d={`M${x} ${yPaa(BUNN, x) + 1} l -6 0 l 6 -${16 + (i % 2) * 5} l 6 ${16 + (i % 2) * 5} Z`} fill="#3b7a4a" data-nocheck="" />
      ))}
      {hus.map((x, i) => {
        const y = yPaa(BUNN, x + 8) - 10;
        return (
          <g key={x} data-nocheck="">
            <rect x={x} y={y} width={16} height={11} fill={i % 2 ? "#c9a27a" : "#b4483c"} />
            <polygon points={`${x - 2},${y} ${x + 8},${y - 8} ${x + 18},${y}`} fill="#3a2b25" />
          </g>
        );
      })}
    </g>
  );
});

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });
const DYPT = L("Dypt hav", 90, 300, { color: K.dempet, size: 13, badge: [90, 300] });
const GRUNT = L("Grunnere vann", 650, 238, { color: K.dempet, size: 13, at: [660, 262], badge: [610, 238] });
const KYST = L("Kyst", 880, 120, { color: K.dempet, size: 13, at: [880, 152], badge: [880, 120] });

const etiketter: Lab[][] = [
  [DYPT, GRUNT, KYST,
    L("Havbunnen forskyves", 300, 430, { color: K.varm, at: [FORKAST_X + 8, 468], badge: [300, 430] }),
    L("Vannmassen forskyves", 330, 112, { color: K.kald, at: [214, 170], badge: [330, 112] })],
  [DYPT, GRUNT, KYST,
    L("Bølgeserie", 470, 104, { color: K.kald, at: [404, 178], badge: [470, 104] }),
    L("Liten bølgehøyde på dypt hav", 250, 300, { color: K.dempet, size: 13, at: [330, 192], badge: [250, 300] })],
  [DYPT, KYST,
    L("Farten avtar", 560, 92, { color: K.varm, at: [560, 112], badge: [520, 92] }),
    L("Høyden kan øke", 700, 238, { color: K.kald, at: [660, 162], badge: [720, 238] })],
  [DYPT,
    L("Vann og sterke strømmer inn over land", 700, 92, { color: K.kald, at: [840, 162], badge: [760, 92] }),
    L("Flere bølger kan følge", 470, 260, { color: K.dempet, size: 13, at: [560, 186], badge: [470, 260] })],
];

const def: Def<S> = {
  id: "geo-tsunami",
  tekst: {
    heading: "Fra vannforskyvning til kyst",
    title:
      "Skjematisk tsunami i fire trinn: havbunnen forskyves brått og vannmassen over settes i bevegelse; en bølgeserie med liten høyde sprer seg over dypt hav; i grunnere vann avtar farten og høyden kan øke; vann og sterke strømmer når inn over land der det ligger en bygd. Ingen felles målestokk for dybde, avstand eller bølgehøyde.",
    caption: "",
  },
  faser: TSUNAMI_FASER,
  status: TSUNAMI_STATUS,
  bilder: [
    { hev: 0, xw: FORKAST_X, a: 0, lam: 150, antall: 0, flom: 0, fart: 0 },
    { hev: 1, xw: FORKAST_X + 10, a: 18, lam: 150, antall: 0, flom: 0, fart: 0 },
    { hev: 1, xw: 400, a: 8, lam: 150, antall: 1, flom: 0, fart: 1 },
    { hev: 1, xw: 660, a: 26, lam: 72, antall: 1, flom: 0, fart: 0.45 },
    { hev: 1, xw: 832, a: 40, lam: 58, antall: 1, flom: 1, fart: 0.25 },
  ],
  etiketter,
  keys: [
    { text: "bølgen beveger seg", color: K.kald, kind: "line" },
    { text: "havbunn som forskyves", color: K.varm, kind: "line" },
  ],
  notes: ["Ingen felles målestokk for dybde, avstand eller bølgehøyde", "Formene er illustrasjoner, ikke beregninger"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const drift = s.fart > 0.05 ? Math.sin(sek * 0.9) * 10 * s.fart : 0;
    const flate: P[] = [];
    for (let x = 0; x <= B; x += 6) flate.push([x, overflate(x, s, drift)]);
    const vann = `${glatt(flate)} L${B} 540 L0 540 Z`;
    const hev = 18 * s.hev;
    const blokk = BUNN.filter(([x]) => x >= 60 && x <= FORKAST_X).map(([x, y]) => [x, y - hev * Math.min(1, (x - 60) / 50)] as P);
    const fase = (sek * 0.12) % 1;
    const front = s.xw + drift;
    return (
      <>
        <defs>
          <linearGradient id={`${ID}-luft`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22364a" />
            <stop offset="100%" stopColor="#4a7090" />
          </linearGradient>
          <linearGradient id={`${ID}-vann`} x1="0" y1="180" x2="0" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3d8fbf" />
            <stop offset="45%" stopColor="#1f5f88" />
            <stop offset="100%" stopColor="#0e2f48" />
          </linearGradient>
          <linearGradient id={`${ID}-bunn`} x1="0" y1="160" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9b28a" />
            <stop offset="40%" stopColor="#9c825f" />
            <stop offset="100%" stopColor="#5f4d3a" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={B} height={540} fill={`url(#${ID}-luft)`} data-nocheck="" />
        <path d={vann} fill={`url(#${ID}-vann)`} />
        <path d={glatt(flate)} fill="none" stroke="#bfe6ff" strokeWidth={3} strokeLinecap="round" />
        <Land />
        {/* hevet havbunnsblokk ved forkastningen */}
        {s.hev > 0.01 ? (
          <g>
            <path d={`${linjeD(blokk)} L${FORKAST_X} 540 L60 540 Z`} fill={`url(#${ID}-bunn)`} stroke="#3a2c1f" strokeWidth={1.6} />
            <path d={`M${FORKAST_X} ${486 - hev} L${FORKAST_X + 16} 540`} stroke={K.varmSterk} strokeWidth={3.5} strokeLinecap="round" />
            <Pil pts={[[FORKAST_X - 30, 524], [FORKAST_X - 30, 494 - hev]]} farge={K.varm} w={4} opacity={op(s.hev * (1 - s.antall))} />
          </g>
        ) : null}
        {/* bølgen beveger seg mot kysten */}
        <Pil pts={[[front - 70 - 40 * s.fart, HAV - s.a - 26], [front + 10, HAV - s.a - 26]]} farge={K.kald} w={4} opacity={op(Math.min(1, s.a / 8) * (1 - s.flom * 0.6))} />
        {/* vann og strømmer inn over land */}
        {s.flom > 0.01 ? <path d={`${linjeD(BUNN.filter(([x]) => x >= 780 && x <= 930).map(([x, y]) => [x, y - 9 * Math.min(1, (930 - x) / 40)] as P))} ${BUNN.filter(([x]) => x >= 780 && x <= 930).reverse().map(([x, y]) => `L${x} ${y + 1}`).join(" ")} Z`} fill="#4aa3d8" opacity={op(0.75 * s.flom)} data-nocheck="" /> : null}
        <Strom pts={[[790, 176], [840, 166], [900, 160]]} farge="#e0f4ff" fase={fase} antall={5} r={3.6} opacity={op(s.flom)} />
        <Strom pts={[[900, 168], [850, 178], [800, 190], [760, 206]]} farge="#e0f4ff" fase={fase} antall={4} r={3.2} opacity={op(s.flom * 0.8)} />
      </>
    );
  },
};

export const GeografiTsunamiFigur = lagFigur(def);
