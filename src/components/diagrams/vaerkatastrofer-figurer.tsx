/**
 * Stegfigurer i kapitlet Værkatastrofer (Geofag 2), bolk 1 i figurplanen: A orkansnitt, E stormflo,
 * H polart lavtrykk, D tornadodannelse, I klimaforskyvning. Egne SVG-tegninger, ingen bilder fra andre.
 * Kildene og tallene står i vaerkatastrofer-tekst.ts. Alt annet er relativt (sterkere, høyere, varmere).
 */
import { type ReactNode } from "react";
import { lagFigur, r1, type Def, type Lab, type P } from "./steg-figur";
import {
  KLIMA_FORDELING_STATUS,
  KLIMA_FORDELING_TEKST,
  ORKAN_SNITT_STATUS,
  ORKAN_SNITT_TEKST,
  POLART_LAVTRYKK_STATUS,
  POLART_LAVTRYKK_TEKST,
  STORMFLO_BRYTER_STATUS,
  STORMFLO_STATUS,
  STORMFLO_TEKST,
  TORNADO_STATUS,
  TORNADO_TEKST,
} from "./vaerkatastrofer-tekst";

const F = {
  himmel: "#0f1d29",
  linje: "#4b6275",
  tekst: "#e8eef2",
  dempet: "#9fb0bd",
  varm: "#e8a46a",
  kald: "#7cb8e8",
  hav: "#173a4f",
  havVarm: "#7a4a2a",
  sky: "#cfd8e0",
  teal: "#5eead4",
  trykk: "#7cc4ff",
  vind: "#fca5a5",
  lilla: "#c4a5f0",
  is: "#e6f2fa",
  land: "#55604f",
  landKant: "#8e9784",
};

const VB = "0 0 960 540";

/* ---------- hjelpere ---------- */

const linje = (pts: P[]) => pts.map((p, i) => `${i ? "L" : "M"}${r1(p[0])} ${r1(p[1])}`).join(" ");

/** Punkt en andel t (0–1) langs en brutt linje. */
function langs(pts: P[], t: number): P {
  const len: number[] = [];
  let tot = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    len.push(d);
    tot += d;
  }
  let rest = ((t % 1) + 1) % 1 * tot;
  for (let i = 0; i < len.length; i++) {
    if (rest <= len[i]) {
      const u = len[i] ? rest / len[i] : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u];
    }
    rest -= len[i];
  }
  return pts[pts.length - 1];
}

/** Strømlinje med pil og prikker som beveger seg langs den (står stille ved redusert bevegelse). */
function Strom({ pts, farge, mk, synlig, sek, fart = 0.12, n = 4, w = 3 }: { pts: P[]; farge: string; mk: string; synlig: number; sek: number; fart?: number; n?: number; w?: number }) {
  if (synlig < 0.02) return null;
  return (
    <g opacity={r1(synlig * 10) / 10}>
      <path d={linje(pts)} fill="none" stroke={farge} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${mk})`} opacity={0.75} />
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = langs(pts, sek * fart + i / n);
        return <circle key={i} cx={r1(x)} cy={r1(y)} r={4} fill={farge} />;
      })}
    </g>
  );
}

const speil = (pts: P[], cx = 480): P[] => pts.map(([x, y]) => [2 * cx - x, y]);
const gauss = (x: number, mu: number, sd: number) => Math.exp(-0.5 * ((x - mu) / sd) ** 2);

/* ---------- A: orkanen i snitt ---------- */

const A_HAV = 425;
const A_TROPO = 88;
const A_INN: P[] = [[70, 410], [240, 411], [392, 412]];
const A_OPP: P[] = [[404, 404], [398, 300], [386, 190], [372, 118]];
const A_UT: P[] = [[352, 104], [230, 98], [72, 94]];
const A_NED: P[] = [[468, 130], [470, 260], [472, 392]];
const A_PANEL = [470, 532] as const;

function aTrykk(x: number) {
  const r = (x - 480) / 70;
  return A_PANEL[0] + 6 + 50 * (1 / (1 + r * r));
}
function aVind(x: number) {
  const r = Math.abs(x - 480);
  const v = r < 62 ? r / 62 : (62 / r) ** 0.65;
  return A_PANEL[1] - 4 - 50 * v;
}
const A_TRYKK_D = linje(Array.from({ length: 81 }, (_, i) => [80 + i * 10, aTrykk(80 + i * 10)] as P));
const A_VIND_D = linje(Array.from({ length: 81 }, (_, i) => [80 + i * 10, aVind(80 + i * 10)] as P));

const OYEVEGG_V = "M444 418 L446 150 Q440 110 400 100 L318 100 Q338 128 362 168 L392 418 Z";
const REGNBAAND = (x: number, h: number) => `M${x - 46} 418 Q${x - 50} ${418 - h * 0.7} ${x - 20} ${418 - h} Q${x} ${418 - h - 18} ${x + 22} ${418 - h + 4} Q${x + 48} ${418 - h * 0.6} ${x + 44} 418 Z`;

type ABilde = { inn: number; opp: number; ut: number; ned: number; kurve: number };

const orkanSnitt: Def<ABilde> = {
  id: "orkan-snitt",
  tekst: ORKAN_SNITT_TEKST,
  faser: ["Inn", "Opp", "Ut", "Ned"],
  status: ORKAN_SNITT_STATUS,
  bilder: [
    { inn: 0, opp: 0, ut: 0, ned: 0, kurve: 0 },
    { inn: 1, opp: 0, ut: 0, ned: 0, kurve: 0.25 },
    { inn: 1, opp: 1, ut: 0, ned: 0, kurve: 0.5 },
    { inn: 1, opp: 1, ut: 1, ned: 0, kurve: 0.75 },
    { inn: 1, opp: 1, ut: 1, ned: 1, kurve: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "fuktig luft strømmer inn", x: 70, y: 392, color: F.teal, weight: 800 },
      { text: "varmt hav: minst 26,5 °C ned til om lag 50 m", x: 480, y: 452, anchor: "middle", color: F.varm, weight: 700, size: 14 },
      { text: "tropopausen", x: 900, y: A_TROPO - 10, anchor: "end", color: F.dempet, size: 13 },
    ];
    if (f >= 2) {
      l.push({ text: "øyeveggen: lufta stiger", x: 210, y: 228, anchor: "middle", color: F.tekst, weight: 800, at: [392, 250], badge: [330, 250] });
      l.push({ text: "latent varme frigjøres", x: 210, y: 300, anchor: "middle", color: F.varm, weight: 700, at: [398, 320], badge: [330, 320] });
    }
    if (f >= 3) l.push({ text: "lufta strømmer ut i høyden", x: 72, y: 70, color: F.varm, weight: 800 });
    if (f >= 4) {
      l.push({ text: "øyet: lufta synker og varmes opp", x: 640, y: 260, color: F.tekst, weight: 800, at: [474, 250], badge: [480, 200] });
      l.push({ text: "sterkest vind i øyeveggen", x: 720, y: 482, color: F.vind, weight: 700, size: 13, at: [544, aVind(544)], narrowHide: true });
      l.push({ text: "lavest trykk i øyet", x: 720, y: 530, color: F.trykk, weight: 700, size: 13, at: [484, aTrykk(484)], narrowHide: true });
    }
    return l;
  }),
  keys: [
    { text: "lufttrykk ved havflaten", color: F.trykk, kind: "line" },
    { text: "vind ved havflaten", color: F.vind, kind: "line" },
  ],
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const sky = 0.18 + 0.62 * s.opp;
    return (
      <g>
        <rect x={0} y={0} width={960} height={A_HAV} fill={F.himmel} />
        <line x1={40} x2={920} y1={A_TROPO} y2={A_TROPO} stroke={F.dempet} strokeDasharray="6 6" opacity={0.6} />
        <rect x={0} y={A_HAV} width={960} height={40} fill={F.hav} />
        <rect x={0} y={A_HAV} width={960} height={10} fill={F.havVarm} opacity={0.8} />
        {[OYEVEGG_V].map((d) => (
          <g key={d} opacity={r1(sky * 100) / 100}>
            <path d={d} fill={F.sky} />
            <path d={d} fill={F.sky} transform="translate(960 0) scale(-1 1)" />
          </g>
        ))}
        <g opacity={r1(0.15 + 0.45 * s.opp)} fill={F.sky}>
          <path d={REGNBAAND(270, 150)} />
          <path d={REGNBAAND(150, 90)} />
          <path d={REGNBAAND(690, 150)} />
          <path d={REGNBAAND(810, 90)} />
        </g>
        {/* latent varme i øyeveggen */}
        <g opacity={s.opp} fill="none" stroke={F.varm} strokeWidth={3} strokeLinecap="round">
          {[[412, 330], [416, 260], [408, 200], [548, 330], [544, 260], [552, 200]].map(([x, y], i) => {
            const k = 6 + 2 * Math.sin(sek * 2.5 + i);
            return <path key={i} d={`M${x - k} ${y} L${x + k} ${y} M${x} ${y - k} L${x} ${y + k}`} />;
          })}
        </g>
        <Strom pts={A_INN} farge={F.teal} mk={m.teal} synlig={s.inn} sek={sek} />
        <Strom pts={speil(A_INN)} farge={F.teal} mk={m.teal} synlig={s.inn} sek={sek} />
        <Strom pts={A_OPP} farge={F.varm} mk={m.warm} synlig={s.opp} sek={sek} n={3} />
        <Strom pts={speil(A_OPP)} farge={F.varm} mk={m.warm} synlig={s.opp} sek={sek} n={3} />
        <Strom pts={A_UT} farge={F.varm} mk={m.warm} synlig={s.ut} sek={sek} />
        <Strom pts={speil(A_UT)} farge={F.varm} mk={m.warm} synlig={s.ut} sek={sek} />
        <Strom pts={A_NED} farge={F.dempet} mk={m.fg} synlig={s.ned} sek={sek} fart={0.05} n={3} />
        <Strom pts={speil(A_NED)} farge={F.dempet} mk={m.fg} synlig={s.ned} sek={sek} fart={0.05} n={3} />
        {/* kurvepanel */}
        <line x1={80} x2={880} y1={A_PANEL[1]} y2={A_PANEL[1]} stroke={F.linje} />
        <path d={A_TRYKK_D} fill="none" stroke={F.trykk} strokeWidth={3} pathLength={1} strokeDasharray={`${r1(s.kurve * 100) / 100} 1`} />
        <path d={A_VIND_D} fill="none" stroke={F.vind} strokeWidth={3} pathLength={1} strokeDasharray={`${r1(s.kurve * 100) / 100} 1`} />
      </g>
    );
  },
};

/* ---------- E: stormflo ved kaia ---------- */

const E_NULL = 392;
const E_KAI = 300;
const E_BIDRAG = { tide: 46, baro: 18, vind: 54, bolge: 22 };
const E_STAV = 600;

type EBilde = { tide: number; baro: number; vind: number; bolge: number };

const stormflo: Def<EBilde> = {
  id: "stormflo",
  tekst: STORMFLO_TEKST,
  faser: ["Tidevann", "Lufttrykk", "Vind", "Bølger"],
  status: STORMFLO_STATUS,
  bilder: [
    { tide: 0, baro: 0, vind: 0, bolge: 0 },
    { tide: 1, baro: 0, vind: 0, bolge: 0 },
    { tide: 1, baro: 1, vind: 0, bolge: 0 },
    { tide: 1, baro: 1, vind: 1, bolge: 0 },
    { tide: 1, baro: 1, vind: 1, bolge: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const y1 = E_NULL - E_BIDRAG.tide / 2;
    const y2 = E_NULL - E_BIDRAG.tide - E_BIDRAG.baro / 2;
    const y3 = E_NULL - E_BIDRAG.tide - E_BIDRAG.baro - E_BIDRAG.vind / 2;
    const y4 = E_NULL - E_BIDRAG.tide - E_BIDRAG.baro - E_BIDRAG.vind - E_BIDRAG.bolge / 2;
    const l: Lab[] = [
      { text: "middels vannstand", x: 30, y: E_NULL + 22, color: F.dempet, size: 13 },
      { text: "kai", x: 900, y: E_KAI + 30, anchor: "end", color: F.tekst, weight: 800 },
      { text: "tidevann (springflo)", x: 560, y: r1(y1 + 6), anchor: "end", color: F.trykk, weight: 700, at: [E_STAV - 2, r1(y1)], badge: [E_STAV - 40, r1(y1 + 20)] },
    ];
    if (f >= 2) {
      l.push({ text: "lavt lufttrykk: om lag 1 cm per hPa", x: 560, y: r1(y2 - 2), anchor: "end", color: F.lilla, weight: 700, at: [E_STAV - 2, r1(y2)], badge: [E_STAV - 40, r1(y2)] });
      l.push({ text: "lavtrykk", x: 180, y: 30, anchor: "middle", color: F.vind, weight: 800 });
    }
    if (f >= 3) {
      l.push({ text: "vind stuer vann mot land", x: 560, y: r1(y3 - 4), anchor: "end", color: F.teal, weight: 700, at: [E_STAV - 2, r1(y3)], badge: [E_STAV - 40, r1(y3 - 16)] });
      l.push({ text: "pålandsvind", x: 120, y: 150, color: F.teal, weight: 800 });
    }
    if (f >= 4) {
      l.push({ text: "bølger på toppen", x: 560, y: r1(y4 - 16), anchor: "end", color: F.tekst, weight: 700, at: [E_STAV - 2, r1(y4)], badge: [E_STAV - 40, r1(y4 - 34)] });
      l.push({ text: "vannet går over kaia", x: 900, y: 200, anchor: "end", color: F.vind, weight: 800, at: [700, 262], badge: [700, 222] });
    }
    return l;
  }),
  bryter: {
    navn: "Sønnavind på Vestlandet",
    status: STORMFLO_BRYTER_STATUS,
    etiketter: [
      { text: "sønnavind", x: 700, y: 54, color: F.teal, weight: 800, narrowHide: false },
      { text: "transporten dreies til høyre", x: 790, y: 106, anchor: "middle", color: F.varm, weight: 700, size: 13 },
      { text: "Vestlandet", x: 905, y: 54, anchor: "end", color: F.tekst, weight: 800 },
    ],
  },
  viewBox: VB,
  tegn: (s, { m, sek, bryter }) => {
    const b = E_BIDRAG;
    const top = E_NULL - b.tide * s.tide - b.baro * s.baro - b.vind * s.vind;
    const amp = b.bolge * s.bolge;
    const bolgeD = linje(Array.from({ length: 65 }, (_, i) => [i * 10, top - amp / 2 - (amp / 2) * Math.sin(i * 0.55 - sek * 3)] as P));
    const flatD = (y: number) => `M0 ${y} L640 ${y}`;
    const segs: [number, number, string][] = [];
    let y = E_NULL;
    for (const [k, farge] of [["tide", F.trykk], ["baro", F.lilla], ["vind", F.teal], ["bolge", F.tekst]] as const) {
      const h = b[k] * s[k];
      segs.push([y - h, h, farge]);
      y -= h;
    }
    const over = Math.max(0, E_KAI - (top - amp));
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <g opacity={bryter ? 0.35 : 1}>
          {/* lavtrykk og vind */}
          <g opacity={s.baro}>
            <circle cx={180} cy={90} r={46} fill="none" stroke={F.vind} strokeWidth={2} strokeDasharray="5 5" />
            <text x={180} y={104} textAnchor="middle" fontSize={40} fontWeight={800} fill={F.vind}>L</text>
          </g>
          {[170, 200, 230].map((yy, i) => (
            <Strom key={yy} pts={[[110 + i * 30, yy], [470 + i * 30, yy]]} farge={F.teal} mk={m.teal} synlig={s.vind} sek={sek} n={2} fart={0.25} />
          ))}
          {/* hav */}
          <path d={`${bolgeD} L640 540 L0 540 Z`} fill={F.hav} />
          <path d={bolgeD} fill="none" stroke={F.kald} strokeWidth={2} />
          <path d={flatD(E_NULL)} stroke={F.dempet} strokeDasharray="6 6" />
          {/* kai og sjøhus */}
          <rect x={640} y={E_KAI} width={320} height={240} fill={F.land} stroke={F.landKant} />
          <path d="M760 300 L760 236 L810 206 L860 236 L860 300 Z" fill="#7a5a44" stroke={F.landKant} />
          {over > 0 && <rect x={640} y={r1(E_KAI - over)} width={140} height={r1(over)} fill={F.hav} opacity={0.75} />}
          {/* målestav */}
          <line x1={E_STAV} x2={E_STAV} y1={E_NULL + 40} y2={200} stroke={F.dempet} strokeWidth={2} />
          {segs.map(([y0, h, farge], i) => h > 0.5 && <rect key={i} x={E_STAV - 8} y={r1(y0)} width={16} height={r1(h)} fill={farge} opacity={0.9} />)}
        </g>
        {bryter && (
          <g>
            <rect x={600} y={20} width={340} height={160} rx={10} fill="#0b2233" stroke={F.linje} />
            <path d="M870 20 L860 60 L878 90 L856 120 L874 150 L866 180 L940 180 L940 20 Z" fill={F.land} stroke={F.landKant} />
            <path d="M700 168 L700 70" stroke={F.teal} strokeWidth={5} markerEnd={`url(#${m.teal})`} />
            <path d="M740 130 L842 130" stroke={F.varm} strokeWidth={4} strokeDasharray="8 5" markerEnd={`url(#${m.warm})`} />
            <text x={624} y={44} fontSize={14} fill={F.dempet} fontWeight={700}>N ↑</text>
          </g>
        )}
      </g>
    );
  },
};

/* ---------- H: polart lavtrykk ---------- */

const H_HAV = 430;
const H_IS = 200;

type HBilde = { ut: number; varme: number; sky: number; lav: number; topp: number };

const H_BASE = 362;
const skyTopp = (x: number, sky: number, lav: number) => {
  const vanlig = 30 + (x - H_IS) * 0.28;
  const samlet = 290 * gauss(x, 700, 70);
  return H_BASE - 8 - sky * (vanlig * (1 - lav) + Math.max(vanlig * 0.4, samlet) * lav);
};

const polartLavtrykk: Def<HBilde> = {
  id: "polart-lavtrykk",
  tekst: POLART_LAVTRYKK_TEKST,
  faser: ["Kaldluft", "Byger", "Lavtrykk", "Virvel"],
  status: POLART_LAVTRYKK_STATUS,
  bilder: [
    { ut: 0, varme: 0, sky: 0, lav: 0, topp: 0 },
    { ut: 1, varme: 0, sky: 0, lav: 0, topp: 0 },
    { ut: 1, varme: 1, sky: 1, lav: 0, topp: 0 },
    { ut: 1, varme: 1, sky: 1, lav: 1, topp: 0 },
    { ut: 1, varme: 1, sky: 1, lav: 1, topp: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [];
    if (f <= 3) {
      l.push({ text: "isen", x: 100, y: H_HAV + 40, anchor: "middle", color: "#0d1820", weight: 800, halo: F.is });
      l.push({ text: "varmere hav", x: 620, y: H_HAV + 50, anchor: "middle", color: F.varm, weight: 800 });
      l.push({ text: "svært kald luft", x: 40, y: 372, color: F.kald, weight: 800 });
    }
    if (f === 2 || f === 3) l.push({ text: "varme og fukt fra havet", x: 300, y: 478, color: F.varm, weight: 700, size: 13, narrowHide: true });
    if (f === 2) l.push({ text: "bygeskyene blir høyere utover havet", x: 520, y: 150, anchor: "middle", color: F.tekst, weight: 700, at: [700, skyTopp(700, 1, 0) - 4], badge: [740, 200] });
    if (f === 3) {
      l.push({ text: "bygesenter", x: 520, y: 110, anchor: "end", color: F.tekst, weight: 700, at: [680, 160], badge: [600, 130] });
      l.push({ text: "lavtrykk dannes", x: 860, y: 370, anchor: "middle", color: F.vind, weight: 800, at: [720, 402], badge: [780, 360] });
    }
    if (f === 4) {
      l.push({ text: "sett ovenfra", x: 60, y: 60, color: F.dempet, weight: 700 });
      l.push({ text: "roterer mot klokka", x: 60, y: 120, color: F.teal, weight: 800, at: [690, 124], badge: [740, 90] });
      l.push({ text: "diameter oftest 200–500 km", x: 600, y: 520, anchor: "middle", color: F.tekst, weight: 700 });
      l.push({ text: "sterk vind og tette snøbyger", x: 60, y: 300, color: F.tekst, weight: 700, at: [480, 300], badge: [430, 300] });
    }
    return l;
  }),
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const snitt = 1 - 0.85 * s.topp;
    const xs = [260, 340, 420, 500, 580, 660, 740, 820, 900];
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <g opacity={r1(snitt * 100) / 100}>
          <defs>
            <linearGradient id="h-hav" x1="0" x2="1">
              <stop offset="0" stopColor="#1d3a55" />
              <stop offset="1" stopColor="#3b4a3a" />
            </linearGradient>
          </defs>
          <rect x={0} y={H_HAV} width={960} height={110} fill="url(#h-hav)" />
          <path d={`M0 ${H_HAV - 14} L${H_IS} ${H_HAV - 10} L${H_IS + 20} ${H_HAV + 6} L0 ${H_HAV + 30} Z`} fill={F.is} />
          {/* kald luft */}
          {[388, 410].map((y) => (
            <Strom key={y} pts={[[40, y], [920, y + 6]]} farge={F.kald} mk={m.cold} synlig={s.ut * (1 - 0.6 * s.lav)} sek={sek} n={6} fart={0.08} />
          ))}
          {/* varme og fukt */}
          <g opacity={s.varme} stroke={F.varm} strokeWidth={2.5} fill="none">
            {xs.slice(0, 8).map((x, i) => {
              const dy = ((sek * 30 + i * 9) % 30) | 0;
              return <path key={x} d={`M${x} ${H_HAV - 4 - dy} q6 -8 0 -16 q-6 -8 0 -16`} opacity={0.4 + 0.6 * (x / 900)} />;
            })}
          </g>
          {/* bygeskyer */}
          <g fill={F.sky} opacity={0.85 * s.sky}>
            {xs.map((x) => {
              const t = skyTopp(x, 1, s.lav);
              const b = H_BASE;
              return <path key={x} d={`M${x - 32} ${b} Q${x - 36} ${r1((b + t) / 2)} ${x - 10} ${r1(t + 6)} Q${x} ${r1(t - 10)} ${x + 12} ${r1(t + 4)} Q${x + 36} ${r1((b + t) / 2)} ${x + 32} ${b} Z`} />;
            })}
          </g>
          {/* lavtrykk */}
          <g opacity={s.lav}>
            <text x={720} y={420} textAnchor="middle" fontSize={34} fontWeight={800} fill={F.vind}>L</text>
            <Strom pts={[[560, 412], [690, 412]]} farge={F.teal} mk={m.teal} synlig={s.lav} sek={sek} n={2} fart={0.3} />
            <Strom pts={[[880, 412], [752, 412]]} farge={F.teal} mk={m.teal} synlig={s.lav} sek={sek} n={2} fart={0.3} />
          </g>
        </g>
        {s.topp > 0.02 && (
          <g opacity={s.topp}>
            <circle cx={600} cy={270} r={190} fill="#13283a" stroke={F.linje} />
            <g transform={`rotate(${r1(-sek * 18)} 600 270)`} fill="none" stroke={F.sky} strokeLinecap="round">
              {[0, 120, 240].map((a) => (
                <path key={a} transform={`rotate(${a} 600 270)`} d="M600 270 m14 0 C 640 240, 690 230, 720 280 S 700 390, 600 420" strokeWidth={20} opacity={0.75} />
              ))}
            </g>
            <circle cx={600} cy={270} r={12} fill="#13283a" />
            <path d="M764 330 A175 175 0 0 0 687 118" fill="none" stroke={F.teal} strokeWidth={4} markerEnd={`url(#${m.teal})`} />
            <path d="M420 480 L780 480" stroke={F.tekst} strokeWidth={2} />
            <path d="M420 472 L420 488 M780 472 L780 488" stroke={F.tekst} strokeWidth={2} />
          </g>
        )}
      </g>
    );
  },
};

/* ---------- D: fra vindskjæring til mesosyklon ---------- */

const D_BAKKE = 470;
const D_RULLE_Y = 392;

type DBilde = { skjaer: number; vipp: number; opp: number; anti: number; strekk: number };

function rulleSenter(x: number, vipp: number): number {
  return D_RULLE_Y - vipp * 250 * gauss(x, 560, 95) ** 0.6;
}

const tornado: Def<DBilde> = {
  id: "tornado-dannelse",
  tekst: TORNADO_TEKST,
  faser: ["Vindskjæring", "Vipping", "Strekking"],
  status: TORNADO_STATUS,
  bilder: [
    { skjaer: 0, vipp: 0, opp: 0, anti: 1, strekk: 0 },
    { skjaer: 1, vipp: 0, opp: 0, anti: 1, strekk: 0 },
    { skjaer: 1, vipp: 1, opp: 1, anti: 1, strekk: 0 },
    { skjaer: 1, vipp: 1, opp: 1, anti: 0.2, strekk: 1 },
  ],
  etiketter: [1, 2, 3].map((f) => {
    const l: Lab[] = [
      { text: "svak vind ved bakken", x: 40, y: 494, color: F.teal, weight: 700, size: 13 },
      { text: "sterkere vind i høyden", x: 40, y: 90, color: F.teal, weight: 700, size: 13 },
    ];
    if (f === 1) l.push({ text: "luft som ruller om en vannrett akse", x: 560, y: 320, anchor: "middle", color: F.tekst, weight: 800, at: [560, D_RULLE_Y - 26], badge: [560, 330] });
    if (f >= 2) {
      l.push({ text: "oppdrift", x: 560, y: 486, anchor: "middle", color: F.varm, weight: 800 });
      l.push({ text: "med klokka", x: 340, y: 210, anchor: "end", color: F.kald, weight: 700, at: [430, 240], badge: [400, 200], opacity: f >= 3 ? 0.55 : 1 });
    }
    if (f === 2) l.push({ text: "mot klokka", x: 780, y: 210, color: F.vind, weight: 700, at: [690, 240], badge: [720, 200] });
    if (f >= 3) {
      l.push({ text: "mesosyklon: roterende oppdrift", x: 920, y: 250, anchor: "end", color: F.vind, weight: 800, at: [668, 220], badge: [720, 250] });
      l.push({ text: "tornado kan dannes, men hvordan er ikke fullt forstått", x: 920, y: 440, anchor: "end", color: F.dempet, size: 13, at: [748, 420], narrowHide: true });
    }
    return l;
  }),
  keys: [
    { text: "vind (lengre pil = sterkere)", color: F.teal, kind: "line" },
    { text: "rotasjon mot klokka (sett ovenfra)", color: F.vind, kind: "line" },
    { text: "rotasjon med klokka", color: F.kald, kind: "line" },
  ],
  viewBox: VB,
  tegn: (s, { m, sek }) => {
    const ringer: ReactNode[] = [];
    for (let x = 270; x <= 850; x += 32) {
      const y = rulleSenter(x, s.vipp);
      const dy = rulleSenter(x + 1, s.vipp) - y;
      const vinkel = (Math.atan2(dy, 1) * 180) / Math.PI;
      const hoyre = x > 560;
      const tynn = hoyre ? 1 - 0.45 * s.strekk * Math.min(1, Math.abs(dy) * 1.5) : 1;
      const r = 24 * tynn;
      const op = (hoyre ? 1 : 0.25 + 0.75 * s.anti) * s.skjaer;
      const fi = sek * (2.4 + (hoyre ? 2 * s.strekk : 0)) + x * 0.05;
      ringer.push(
        <g key={x} transform={`rotate(${r1(vinkel)} ${x} ${r1(y)})`} opacity={r1(op * 100) / 100}>
          <ellipse cx={x} cy={r1(y)} rx={7} ry={r1(r)} fill="none" stroke={F.teal} strokeWidth={2} opacity={0.6} />
          <circle cx={r1(x + 7 * Math.cos(fi))} cy={r1(y + r * Math.sin(fi))} r={3.5} fill={F.tekst} />
        </g>,
      );
    }
    const senterD = linje(Array.from({ length: 30 }, (_, i) => [270 + i * 20, rulleSenter(270 + i * 20, s.vipp)] as P));
    const rot = (cx: number, cy: number, farge: string, mot: boolean, op: number, mk: string) => (
      <g opacity={r1(op * 100) / 100}>
        <ellipse cx={cx} cy={cy} rx={36} ry={11} fill="none" stroke={farge} strokeWidth={3} strokeDasharray="60 20" strokeDashoffset={r1((mot ? 1 : -1) * sek * 40)} />
        <path d={mot ? `M${cx + 10} ${cy + 11} L${cx - 8} ${cy + 11}` : `M${cx - 10} ${cy + 11} L${cx + 8} ${cy + 11}`} stroke={farge} strokeWidth={3} markerEnd={`url(#${mk})`} />
      </g>
    );
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <rect x={0} y={D_BAKKE} width={960} height={70} fill={F.land} />
        {/* vindprofil */}
        {[440, 350, 260, 170, 110].map((y, i) => (
          <path key={y} d={`M40 ${y} L${r1(40 + (40 + i * 38) * (0.3 + 0.7 * s.skjaer))} ${y}`} stroke={F.teal} strokeWidth={3} markerEnd={`url(#${m.teal})`} />
        ))}
        {/* sky og oppdrift */}
        <g opacity={s.opp * 0.85} fill={F.sky}>
          <path d="M420 150 Q430 70 520 60 L860 46 Q900 60 860 76 L740 92 Q770 130 760 150 Z" opacity={0.55} />
        </g>
        <path d={`M560 ${D_BAKKE - 6} L560 ${r1(D_BAKKE - 6 - 330 * s.opp)}`} stroke={F.varm} strokeWidth={10} opacity={0.55 * s.opp} markerEnd={`url(#${m.warm})`} />
        <path d={senterD} fill="none" stroke={F.teal} strokeWidth={r1(46 - 10 * s.strekk)} opacity={0.18 * s.skjaer} strokeLinecap="round" />
        {ringer}
        {rot(470, 230, F.kald, false, s.vipp * (0.25 + 0.75 * s.anti), m.cold)}
        {rot(650, 230, F.vind, true, s.vipp, m.warm)}
        {/* mulig tornado */}
        <g opacity={0.55 * s.strekk}>
          <path d="M722 150 Q734 300 744 466 L752 466 Q748 300 756 150 Z" fill={F.dempet} />
        </g>
      </g>
    );
  },
};

/* ---------- I: klimaforskyvning ---------- */

const I_BUNN = 430;
const I_X0 = 110;
const I_X1 = 880;
const I_SD = 105;
const I_MU = 420;
const I_SKIFT = 130;
const I_VARM = 640;
const I_KALD = 200;
const I_REKORD = I_MU + 3.1 * I_SD;

const kurveY = (x: number, mu: number) => I_BUNN - 300 * gauss(x, mu, I_SD);
const kurveD = (mu: number, a = I_X0, b = I_X1) =>
  linje(Array.from({ length: Math.max(2, Math.round((b - a) / 6)) + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / Math.max(1, Math.round((b - a) / 6));
    return [x, kurveY(x, mu)] as P;
  }));
const arealD = (mu: number, a: number, b: number) => `${kurveD(mu, a, b)} L${b} ${I_BUNN} L${a} ${I_BUNN} Z`;

type IBilde = { skift: number; fremhev: number; rekord: number };

const klimaFordeling: Def<IBilde> = {
  id: "klima-fordeling",
  tekst: KLIMA_FORDELING_TEKST,
  faser: ["I dag", "Forskyvning", "Halene", "Nye rekorder"],
  status: KLIMA_FORDELING_STATUS,
  bilder: [
    { skift: 0, fremhev: 0, rekord: 0 },
    { skift: 0, fremhev: 0, rekord: 0 },
    { skift: 1, fremhev: 0, rekord: 0 },
    { skift: 1, fremhev: 1, rekord: 0 },
    { skift: 1, fremhev: 1, rekord: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const mu = f >= 2 ? I_MU + I_SKIFT : I_MU;
    const l: Lab[] = [
      { text: "kaldere", x: I_X0, y: I_BUNN + 34, color: F.kald, weight: 700 },
      { text: "varmere", x: I_X1, y: I_BUNN + 34, anchor: "end", color: F.varm, weight: 700 },
      { text: "temperatur →", x: 495, y: I_BUNN + 34, anchor: "middle", color: F.dempet, size: 13 },
      { text: "grense for ekstrem varme", x: I_VARM + 8, y: 70, color: F.vind, weight: 700, size: 13 },
      { text: "ekstrem kulde", x: I_KALD - 8, y: 70, anchor: "end", color: F.kald, weight: 700, size: 13 },
      { text: f >= 2 ? "fremtidig klima" : "dagens klima", x: mu, y: 112, anchor: "middle", color: f >= 2 ? F.varm : F.tekst, weight: 800 },
    ];
    if (f >= 2) l.push({ text: "dagens klima", x: I_MU - 150, y: 210, anchor: "end", color: F.dempet, size: 13, at: [I_MU - 110, kurveY(I_MU - 110, I_MU)], narrowHide: true });
    if (f >= 3) {
      l.push({ text: "mye mer ekstrem varme", x: 900, y: 200, anchor: "end", color: F.vind, weight: 800, at: [I_VARM + 40, 400], badge: [I_VARM + 60, 330] });
      l.push({ text: "mindre ekstrem kulde", x: 180, y: 300, anchor: "middle", color: F.kald, weight: 700, at: [I_KALD - 20, 424], badge: [I_KALD - 40, 380] });
    }
    if (f >= 4) l.push({ text: "varmere enn noen gang målt", x: 900, y: 300, anchor: "end", color: "#ffd0c8", weight: 800, at: [I_REKORD + 25, 418], badge: [I_REKORD + 30, 380] });
    return l;
  }),
  keys: [
    { text: "dagens klima", color: F.dempet, kind: "dash" },
    { text: "fremtidig klima", color: F.varm, kind: "line" },
  ],
  viewBox: VB,
  tegn: (s) => {
    const mu = I_MU + I_SKIFT * s.skift;
    return (
      <g>
        <rect x={0} y={0} width={960} height={540} fill={F.himmel} />
        <line x1={I_X0} x2={I_X1} y1={I_BUNN} y2={I_BUNN} stroke={F.dempet} strokeWidth={2} markerEnd="" />
        <path d={arealD(mu, I_VARM, I_X1)} fill={F.vind} opacity={r1(0.45 + 0.35 * s.fremhev)} />
        <path d={arealD(mu, I_X0, I_KALD)} fill={F.kald} opacity={r1(0.45 + 0.35 * s.fremhev)} />
        {s.rekord > 0.02 && <path d={arealD(mu, I_REKORD, I_X1)} fill="#ffd0c8" opacity={r1(s.rekord * 0.9)} />}
        {s.skift > 0.02 && <path d={kurveD(I_MU)} fill="none" stroke={F.dempet} strokeWidth={2.5} strokeDasharray="7 6" opacity={r1(s.skift)} />}
        <path d={kurveD(mu)} fill="none" stroke={s.skift > 0.5 ? F.varm : F.tekst} strokeWidth={3.5} />
        <line x1={I_VARM} x2={I_VARM} y1={80} y2={I_BUNN} stroke={F.vind} strokeDasharray="5 5" />
        <line x1={I_KALD} x2={I_KALD} y1={80} y2={I_BUNN} stroke={F.kald} strokeDasharray="5 5" />
        {s.rekord > 0.02 && <line x1={I_REKORD} x2={I_REKORD} y1={300} y2={I_BUNN} stroke="#ffd0c8" strokeWidth={2} opacity={s.rekord} />}
        <text x={36} y={260} transform="rotate(-90 36 260)" textAnchor="middle" fontSize={13} fill={F.dempet}>hvor ofte</text>
      </g>
    );
  },
};

export const OrkanSnittFigur = lagFigur(orkanSnitt);
export const StormfloFigur = lagFigur(stormflo);
export const PolartLavtrykkFigur = lagFigur(polartLavtrykk);
export const TornadoFigur = lagFigur(tornado);
export const KlimaFordelingFigur = lagFigur(klimaFordeling);
