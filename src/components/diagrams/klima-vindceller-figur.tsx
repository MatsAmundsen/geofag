/**
 * Figur 5.2 (geografi kap. 5, «Ujevn oppvarming setter lufta i bevegelse»): tre vindceller på nordlig halvkule.
 *
 * Et forenklet tverrsnitt fra ekvator til polarområdene. Bare begreper fra kapittelteksten: ujevn oppvarming,
 * varm luft som stiger nær ekvator (lavtrykk, mye nedbør), luft som synker i subtropene (høytrykk, tørrere forhold),
 * Hadleycellen, Ferrelcellen og polarcellen, passatvind og vestavindsbeltet (kapitteltekst: Lindsey, 2009;
 * Met Office, u.å.; UCAR, u.å.-a). Ingen breddegrader, høyder eller hastigheter. Pilene viser nord–sør-bevegelse
 * og bevegelse opp og ned, ikke vindens øst–vest-retning. Cellene er ikke lukkede rør.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur } from "./steg-kit";
import { KlimaDefs, Pil, Skog, Sky, Sol, Strom } from "./klima-modell-kit";
import { K, op, ruProfil, type P } from "./klima-modell-geo";

const ID = "kvc";
const BAKKE = 430;
const TAK = 96;
const X0 = 60;
const XS = 350;
const XM = 650;
const XP = 910;

/** Bakken: regnskog ved ekvator, ørken i subtropene, skog på midlere breddegrader og is mot polen. */
const PROFIL = ruProfil([[0, BAKKE], [960, BAKKE]], 7, 10, 3);

/** Rund sløyfe som punktliste: opp ved `xOpp`, ned ved `xNed`, bort langs taket og tilbake langs bakken. */
function sloyfe(xOpp: number, xNed: number, topp: number, bunn: number): P[] {
  const r = 46;
  const s = Math.sign(xNed - xOpp);
  const pts: P[] = [];
  const bue = (cx: number, cy: number, a0: number, a1: number) => {
    for (let i = 0; i <= 8; i++) {
      const a = a0 + ((a1 - a0) * i) / 8;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
  };
  // opp langs xOpp, bort langs taket, ned langs xNed, tilbake langs bakken
  pts.push([xOpp, bunn - r]);
  if (s > 0) {
    bue(xOpp + r, topp + r, Math.PI, Math.PI * 1.5);
    bue(xNed - r, topp + r, Math.PI * 1.5, Math.PI * 2);
    bue(xNed - r, bunn - r, 0, Math.PI * 0.5);
    bue(xOpp + r, bunn - r, Math.PI * 0.5, Math.PI);
  } else {
    bue(xOpp - r, topp + r, 0, -Math.PI * 0.5);
    bue(xNed + r, topp + r, -Math.PI * 0.5, -Math.PI);
    bue(xNed + r, bunn - r, Math.PI, Math.PI * 0.5);
    bue(xOpp - r, bunn - r, Math.PI * 0.5, 0);
  }
  return pts;
}
const HADLEY = sloyfe(X0 + 22, XS - 22, TAK + 20, BAKKE - 22);
const FERREL = sloyfe(XM - 22, XS + 22, TAK + 50, BAKKE - 22);
const POLAR = sloyfe(XM + 22, XP - 10, TAK + 80, BAKKE - 22);

/** Del av en sløyfe (fra andel a til b) som pil. */
function del(pts: P[], a: number, b: number): P[] {
  const n = pts.length - 1;
  return pts.slice(Math.round(a * n), Math.round(b * n) + 1);
}

const Landskap = memo(function Landskap() {
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={960} height={540} fill={`url(#${ID}-himmel)`} data-nocheck="" />
      <line x1={0} y1={TAK - 10} x2={960} y2={TAK + 40} stroke="#7dd3fc" strokeOpacity={0.18} strokeWidth={2} strokeDasharray="6 8" data-nocheck="" />
      <path d={`M0 ${BAKKE} L960 ${BAKKE} L960 540 L0 540 Z`} fill={`url(#${ID}-bakke)`} />
      {/* sanddyner i subtropene */}
      {[290, 330, 372, 410].map((x, i) => (
        <path key={x} d={`M${x - 30} ${BAKKE + 2} Q ${x} ${BAKKE - 12 - (i % 2) * 5} ${x + 30} ${BAKKE + 2} Z`} fill="#d6a85c" data-nocheck="" />
      ))}
      <Skog pr={PROFIL} fra={8} til={210} tett={11} seed={3} h={26} farge="#1f7a3e" />
      <Skog pr={PROFIL} fra={520} til={760} tett={12} seed={7} h={22} farge="#2f6b45" />
      {/* is og snø mot polen */}
      <path d={`M800 ${BAKKE + 1} Q 860 ${BAKKE - 10} 960 ${BAKKE - 8} L960 ${BAKKE + 14} L800 ${BAKKE + 14} Z`} fill="#eef6fb" data-nocheck="" />
    </g>
  );
});

/** Sola: bratte stråler ved ekvator, slake mot polen. */
function Straaler({ o }: { o: number }) {
  if (o <= 0.01) return null;
  const st: [P, P][] = [
    [[90, 20], [100, BAKKE - 4]], [[150, 20], [160, BAKKE - 4]],
    [[520, 20], [610, BAKKE - 4]],
    [[760, 30], [930, BAKKE - 4]], [[700, 30], [870, BAKKE - 4]],
  ];
  return (
    <g opacity={op(o)}>
      {st.map(([a, b], i) => (
        <Pil key={i} pts={[a, b]} farge={K.sol} w={3} kant={false} />
      ))}
      <rect x={60} y={BAKKE - 6} width={120} height={8} rx={4} fill="#ff7a45" opacity={0.75} data-nocheck="" />
      <rect x={840} y={BAKKE - 6} width={110} height={8} rx={4} fill="#e2e8f0" opacity={0.6} data-nocheck="" />
    </g>
  );
}

function Trykk({ x, kind, o }: { x: number; kind: "H" | "L"; o: number }) {
  if (o <= 0.01) return null;
  return (
    <g aria-hidden="true" opacity={op(o)}>
      <circle cx={x} cy={BAKKE + 44} r={17} fill={kind === "H" ? "#1e3a5f" : "#5f1e2a"} stroke={kind === "H" ? "#7cc4ff" : "#fca5a5"} strokeWidth={2.5} />
      <text x={x} y={BAKKE + 51} textAnchor="middle" fontSize={20} fontWeight={800} fill={kind === "H" ? "#bfdbfe" : "#fecaca"}>{kind}</text>
    </g>
  );
}

type S = { sol: number; h: number; f: number; p: number; vind: number; vaer: number };

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });
const EKV = L("ekvator", X0, 528, { color: K.varm, size: 13, anchor: "start", badge: [26, 520] });
const SUB = L("subtropene", XS, 528, { color: "#fbbf24", size: 13, badge: [XS - 80, 520] });
const MID = L("midlere breddegrader", XM - 30, 528, { color: K.gronn, size: 13, badge: [XM, 528] });
const POL = L("polarområdene", 900, 528, { color: K.kald, size: 13, anchor: "end", badge: [920, 520] });
const SONER = [EKV, SUB, MID, POL];
const HAD = L("Hadleycellen", 205, 250, { color: K.varm, weight: 800, badge: [205, 250] });
const FER = L("Ferrelcellen", 500, 270, { color: K.gronn, weight: 800, badge: [500, 270] });
const POLC = L("polarcellen", 780, 290, { color: K.kald, weight: 800, badge: [780, 290] });
const PASSAT = L("passatvind mot ekvator", 205, 412, { color: K.teal, size: 13, at: [205, BAKKE - 22], badge: [205, 400] });
const VEST = L("vestavindsbeltet", 500, 412, { color: K.gronn, size: 13, at: [500, BAKKE - 22], badge: [500, 400] });

const etiketter: Lab[][] = [
  [...SONER, L("mer solenergi per areal nær ekvator", 230, 60, { color: K.sol, at: [128, BAKKE - 10], badge: [230, 60] }), L("mindre per areal mot polarområdene", 760, 60, { color: K.sol, at: [868, BAKKE - 10], badge: [760, 60] })],
  [...SONER, HAD, L("varm luft stiger", 150, 140, { color: K.varm, at: [X0 + 22, 200], badge: [150, 150] }), L("luft synker i subtropene", 470, 150, { color: "#fbbf24", at: [XS - 22, 220], badge: [430, 160] }), PASSAT],
  [...SONER, HAD, FER, POLC, PASSAT, VEST],
  [...SONER, HAD, FER, POLC, PASSAT, VEST, L("mye nedbør", 150, 140, { color: K.regn, size: 13, at: [110, 200], badge: [150, 150] }), L("tørrere", 350, 140, { color: "#fbbf24", size: 13, at: [XS, 200], badge: [380, 150] })],
];

const def: Def<S> = {
  id: "klima-vindceller",
  tekst: {
    heading: "Vindceller og dominerende vindbelter",
    title:
      "Forenklet tverrsnitt av nordlig halvkule fra ekvator til polarområdene. Sola varmer mest nær ekvator. Varm luft stiger der, går mot subtropene i høyden og synker der. Langs bakken går passatvinden tilbake mot ekvator. Lenger nord ligger Ferrelcellen med vestavindsbeltet og polarcellen. Lavtrykk ved ekvator, høytrykk i subtropene. Ingen breddegrader eller tall.",
    caption: "",
  },
  faser: ["Ujevn oppvarming", "Hadleycellen", "Tre celler", "Nedbør og tørke"],
  status: [
    "1. Solstrålene treffer jordoverflaten med ulike vinkler. Områdene rundt ekvator mottar mer solenergi per areal enn polarområdene.",
    "2. Nær ekvator stiger varm luft. Lenger unna, i subtropene, synker lufta. Langs bakken går lufta tilbake mot ekvator som passatvind. Dette er Hadleycellen.",
    "3. Lenger mot polene beskriver vi Ferrelcellen og polarcellen. På midlere breddegrader ligger vestavindsbeltet. Cellene er ikke lukkede rør med faste grenser.",
    "4. Stigende, fuktig luft kan gi mye nedbør, mens synkende luft ofte gir tørrere forhold. Der lufta stiger nær ekvator, er det lavtrykk (L). Der den synker i subtropene, er det høytrykk (H).",
  ],
  bilder: [
    { sol: 1, h: 0, f: 0, p: 0, vind: 0, vaer: 0 },
    { sol: 1, h: 0, f: 0, p: 0, vind: 0, vaer: 0 },
    { sol: 0.25, h: 1, f: 0, p: 0, vind: 1, vaer: 0.5 },
    { sol: 0, h: 1, f: 1, p: 1, vind: 1, vaer: 0.5 },
    { sol: 0, h: 1, f: 1, p: 1, vind: 1, vaer: 1 },
  ],
  etiketter,
  keys: [
    { text: "Hadleycellen", color: K.varm, kind: "line" },
    { text: "Ferrelcellen", color: K.gronn, kind: "line" },
    { text: "polarcellen", color: K.kald, kind: "line" },
    { text: "H høytrykk", color: "#7cc4ff", kind: "fill" },
    { text: "L lavtrykk", color: "#fca5a5", kind: "fill" },
  ],
  notes: ["Forenklet tverrsnitt av nordlig halvkule, ikke i målestokk", "Pilene viser nord–sør-bevegelse og bevegelse opp og ned"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const f = (sek * 0.05) % 1;
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-himmel`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2c5878" />
            <stop offset="40%" stopColor="#2a4d6b" />
            <stop offset="100%" stopColor="#1b2d42" />
          </linearGradient>
          <linearGradient id={`${ID}-bakke`} x1="0" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1f5a33" />
            <stop offset="24%" stopColor="#3d6b3a" />
            <stop offset="32%" stopColor="#c99a52" />
            <stop offset="44%" stopColor="#c99a52" />
            <stop offset="54%" stopColor="#4f6e42" />
            <stop offset="80%" stopColor="#3f5a45" />
            <stop offset="86%" stopColor="#cfdde6" />
            <stop offset="100%" stopColor="#eef6fb" />
          </linearGradient>
        </KlimaDefs>
        <Landskap />
        <Sol id={ID} x={XS} y={60} r={24} opacity={0.5 + 0.5 * Math.max(s.sol, s.vaer)} />
        <Straaler o={s.sol} />
        {/* skyer og regn der lufta stiger */}
        <Sky id={ID} x={110} y={200} s={1.1} opacity={Math.max(s.h, 0.001)} regn={s.vaer} fase={sek} mork={0.6} />
        <Sky id={ID} x={120} y={140} s={0.9} opacity={Math.max(s.h, 0.001)} />
        <Sky id={ID} x={XM} y={230} s={0.8} opacity={Math.max(s.f, 0.001)} regn={s.vaer * 0.8} fase={sek + 0.4} mork={0.5} />
        <g opacity={op(s.h)}>
          <Pil pts={del(HADLEY, 0, 0.24)} farge={K.varm} w={5} />
          <Pil pts={del(HADLEY, 0.24, 0.5)} farge={K.varm} w={5} />
          <Pil pts={del(HADLEY, 0.5, 0.74)} farge="#fbbf24" w={5} />
          <Pil pts={del(HADLEY, 0.74, 1)} farge={K.teal} w={5} />
          <Strom pts={HADLEY} farge="#f8fafc" fase={f} antall={7} r={4} />
        </g>
        <g opacity={op(s.f)}>
          <Pil pts={del(FERREL, 0, 0.24)} farge={K.gronn} w={4.5} />
          <Pil pts={del(FERREL, 0.24, 0.5)} farge={K.gronn} w={4.5} />
          <Pil pts={del(FERREL, 0.5, 0.74)} farge={K.gronn} w={4.5} />
          <Pil pts={del(FERREL, 0.74, 1)} farge={K.gronn} w={4.5} />
          <Strom pts={FERREL} farge="#f8fafc" fase={(f + 0.3) % 1} antall={6} r={4} />
        </g>
        <g opacity={op(s.p)}>
          <Pil pts={del(POLAR, 0, 0.24)} farge={K.kald} w={4.5} />
          <Pil pts={del(POLAR, 0.24, 0.5)} farge={K.kald} w={4.5} />
          <Pil pts={del(POLAR, 0.5, 0.74)} farge={K.kald} w={4.5} />
          <Pil pts={del(POLAR, 0.74, 1)} farge={K.kald} w={4.5} />
          <Strom pts={POLAR} farge="#f8fafc" fase={(f + 0.6) % 1} antall={5} r={4} />
        </g>
        <Trykk x={X0 + 70} kind="L" o={s.vind} />
        <Trykk x={XS} kind="H" o={s.vind} />
      </>
    );
  },
};

export const KlimaVindcellerFigur = lagFigur(def);
