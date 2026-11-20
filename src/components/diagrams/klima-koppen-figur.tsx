/**
 * Figur 5.5 (geografi kap. 5, «Temperatur og vann virker sammen»): Köppens fem hovedgrupper på et virkelig verdenskart.
 *
 * Kartdata: Beck mfl. (2023), Köppen–Geiger 1991–2020, CC BY 4.0, via Wikimedia Commons. De 30 klassene er slått
 * sammen til hovedgruppene A–E og omprojisert til Equal Earth (se public/images/koppen-verden-grupper-beck-1991-2020.lisens.txt
 * og scripts/koppen-verden-grupper.py). PNG-en er et indekskart (pikselverdi = gruppe); fargelagene lages i nettleseren.
 * Stegene viser én hovedgruppe om gangen og til slutt to steder på samme breddegrad med ulik hovedgruppe.
 * Eksempelstedene er kontrollert mot rasteret. Navnene på gruppene følger kapittelteksten (Mamen, u.å.).
 */
import { useEffect, useState } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { KlimaDefs } from "./klima-modell-kit";
import { K, op, type P } from "./klima-modell-geo";

const ID = "kkp";
const BILDE = "/images/koppen-verden-grupper-beck-1991-2020.png";
const BW = 1440;
const BH = 701;
/** Kartets plass i viewBox. */
const MX = 20;
const MY = 52;
const MW = 920;
const MH = (MW * BH) / BW;

/* Equal Earth (Šavrič, Patterson & Jenny, 2018). */
const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796;
const M = Math.sqrt(3) / 2;
const XMAX = (2 * Math.sqrt(3) * Math.PI) / (3 * A1);
const th = (lat: number) => Math.asin(M * Math.sin((lat * Math.PI) / 180));
const YMAX = (() => { const t = Math.PI / 3; return A4 * t ** 9 + A3 * t ** 7 + A2 * t ** 3 + A1 * t; })();
function ee(lon: number, lat: number): P {
  const t = th(lat);
  const t2 = t * t, t6 = t2 * t2 * t2;
  const x = (2 * Math.sqrt(3) * ((lon * Math.PI) / 180) * Math.cos(t)) / (3 * (9 * A4 * t6 * t2 + 7 * A3 * t6 + 3 * A2 * t2 + A1));
  const y = t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
  return [MX + ((x + XMAX) / (2 * XMAX)) * MW, MY + ((YMAX - y) / (2 * YMAX)) * MH];
}
const RAMME = (() => {
  const pts: P[] = [];
  for (let lat = -90; lat <= 90; lat += 5) pts.push(ee(180, lat));
  for (let lat = 90; lat >= -90; lat -= 5) pts.push(ee(-180, lat));
  return `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L")} Z`;
})();
const parallell = (lat: number) => {
  const a = ee(-180, lat);
  const b = ee(180, lat);
  return { x1: r1(a[0]), x2: r1(b[0]), y: r1(a[1]) };
};

const GRUPPER = [
  { kode: "A", navn: "tropisk", farge: "#2f7fe8" },
  { kode: "B", navn: "tørt", farge: "#f0a020" },
  { kode: "C", navn: "varmtemperert", farge: "#7ccf3a" },
  { kode: "D", navn: "kaldtemperert", farge: "#a88bf0" },
  { kode: "E", navn: "polart", farge: "#e6edf3" },
] as const;

/** Ett gjennomsiktig PNG-lag per gruppe, laget av indekskartet i nettleseren (én gang per side). */
let lagMinne: Promise<string[]> | null = null;
function lagLag(): Promise<string[]> {
  if (lagMinne) return lagMinne;
  lagMinne = new Promise((ok, feil) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = BW;
      c.height = BH;
      const g = c.getContext("2d", { willReadFrequently: true });
      if (!g) return feil(new Error("canvas"));
      g.drawImage(img, 0, 0);
      const src = g.getImageData(0, 0, BW, BH).data;
      const ut: string[] = [];
      const farger = [[94, 108, 122], ...GRUPPER.map((gr) => [1, 3, 5].map((i) => parseInt(gr.farge.slice(i, i + 2), 16)))];
      for (let k = 0; k <= 5; k++) {
        const dst = g.createImageData(BW, BH);
        const d = dst.data;
        const [r, gg, b] = farger[k];
        for (let i = 0; i < src.length; i += 4) {
          const idx = Math.round(src[i] / 40);
          if (k === 0 ? idx > 0 : idx === k) {
            d[i] = r; d[i + 1] = gg; d[i + 2] = b; d[i + 3] = 255;
          }
        }
        g.putImageData(dst, 0, 0);
        ut.push(c.toDataURL("image/png"));
      }
      ok(ut);
    };
    img.onerror = () => { lagMinne = null; feil(new Error("bilde")); };
    img.src = BILDE;
  });
  return lagMinne;
}

function Kart({ vekt }: { vekt: number[] }) {
  const [lag, settLag] = useState<string[] | null>(null);
  useEffect(() => {
    let aktiv = true;
    lagLag().then((l) => aktiv && settLag(l)).catch(() => undefined);
    return () => { aktiv = false; };
  }, []);
  return (
    <g aria-hidden="true">
      <path d={RAMME} fill={`url(#${ID}-hav)`} stroke="#7dd3fc" strokeOpacity={0.35} strokeWidth={1.5} />
      {lag ? (
        <>
          <image href={lag[0]} x={MX} y={r1(MY)} width={MW} height={r1(MH)} preserveAspectRatio="none" opacity={0.55} />
          {GRUPPER.map((g, i) => (
            <image key={g.kode} href={lag[i + 1]} x={MX} y={r1(MY)} width={MW} height={r1(MH)} preserveAspectRatio="none" opacity={op(vekt[i])} />
          ))}
        </>
      ) : (
        <text x={480} y={280} textAnchor="middle" fontSize={16} fill={K.dempet}>Laster kartet …</text>
      )}
      <path d={RAMME} fill={`url(#${ID}-skygge)`} data-nocheck="" />
    </g>
  );
}

type S = { a: number; b: number; c: number; d: number; e: number; br: number };

const L = (text: string, lon: number, lat: number, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, at: ee(lon, lat).map(r1) as P, ...extra });
const linjeLab = (text: string, lat: number, color: string): Lab => ({ text, x: 932, y: r1(ee(180, lat)[1] - 6), anchor: "end", color, weight: 600, size: 12, badge: [r1(ee(180, lat)[0] + 4), r1(ee(180, lat)[1])], narrowHide: true });
const LINJER: Lab[] = [linjeLab("ekvator", 0, K.varm), linjeLab("vendekretsene", 23.44, K.dempet), linjeLab("polarsirklene", 66.56, K.dempet)];

const etiketter: Lab[][] = [
  [...LINJER],
  [...LINJER, L("Amazonas", -60, -3, 190, 330, { color: "#93c5fd", badge: [150, 320] }), L("Kongobassenget", 22, 0, 420, 330, { color: "#93c5fd", badge: [400, 330] }), L("Sørøst-Asia", 113, 0, 780, 330, { color: "#93c5fd", badge: [800, 330] })],
  [...LINJER, L("Sahara", 10, 23, 400, 150, { color: "#fbbf24", badge: [440, 160] }), L("Sentral-Asia", 60, 44, 640, 110, { color: "#fbbf24", badge: [640, 110] }), L("innlandet i Australia", 133, -25, 800, 430, { color: "#fbbf24", badge: [820, 430] })],
  [...LINJER, L("Vest-Europa", 2, 48, 380, 90, { color: "#a3e635", badge: [400, 92] }), L("sørøst i USA", -85, 33, 200, 230, { color: "#a3e635", badge: [180, 230] }), L("Sørøst-Kina", 113, 27, 800, 230, { color: "#a3e635", badge: [820, 220] })],
  [...LINJER, L("Sibir", 100, 62, 740, 70, { color: "#c4b5fd", badge: [760, 72] }), L("Canada", -100, 55, 200, 70, { color: "#c4b5fd", badge: [200, 72] })],
  [...LINJER, L("Grønland", -40, 72, 340, 44, { color: K.is, badge: [360, 44] }), L("Tibet: høyde gir polart klima", 88, 33, 700, 260, { color: K.is, badge: [700, 250] }), L("Antarktis", 0, -80, 480, 520, { color: K.is, badge: [480, 520] })],
  [
    { text: "60° nord", x: 932, y: r1(ee(180, 60)[1] - 6), anchor: "end", color: K.tekst, weight: 700, size: 12, badge: [r1(ee(180, 60)[0] + 4), r1(ee(180, 60)[1])] },
    L("kysten av Vest-Norge: varmtemperert", 5.3, 60.4, 330, 60, { color: "#a3e635", badge: [440, 70] }),
    L("Sibir: kaldtemperert", 100, 60.5, 740, 60, { color: "#c4b5fd", badge: [760, 70] }),
  ],
];

const vekter = (a: number, b: number, c: number, d: number, e: number, br = 0): S => ({ a, b, c, d, e, br });

const def: Def<S> = {
  id: "klima-koppen",
  tekst: {
    heading: "Klimasoner er mer enn breddegrader",
    title:
      "Verdenskart i Equal Earth-projeksjon med Köppens fem hovedgrupper for 1991–2020: tropisk, tørt, varmtemperert, kaldtemperert og polart. Stegene viser én gruppe om gangen med eksempelområder, og til slutt to steder på 60 grader nord med ulik hovedgruppe. Ekvator, vendekretsene og polarsirklene er tegnet inn.",
    caption: "",
  },
  faser: ["Alle", "Tropisk", "Tørt", "Varmtemperert", "Kaldtemperert", "Polart", "Samme breddegrad"],
  status: [
    "1. Köppens fem hovedgrupper på et verdenskart for 1991–2020. Grensene følger ikke breddegradene rundt hele jorda.",
    "2. Tropisk klima (A): høye temperaturer gjennom året. Nedbøren varierer mellom undertypene.",
    "3. Tørt klima (B): lite nedbør sett i forhold til temperaturforholdene. Synkende luft gir ofte tørrere forhold.",
    "4. Varmtemperert klima (C) skilles fra de andre gruppene blant annet gjennom temperaturene i kalde og varme måneder.",
    "5. Kaldtemperert klima (D) har kaldere vintre enn varmtemperert klima. På kartet dekker gruppen store områder i Nord-Amerika og Asia.",
    "6. Polart klima (E) finnes nær polene, men også høyt til fjells. Høyden gir avvik fra enkle breddegradsbelter.",
    "7. Samme breddegrad, ulik klimagruppe: kysten av Vest-Norge og Sibir ligger begge nær 60 grader nord. Havstrømmer, vind og avstanden fra havet bidrar til forskjellen.",
  ],
  bilder: [
    vekter(1, 1, 1, 1, 1),
    vekter(1, 1, 1, 1, 1),
    vekter(1, 0, 0, 0, 0),
    vekter(0, 1, 0, 0, 0),
    vekter(0, 0, 1, 0, 0),
    vekter(0, 0, 0, 1, 0),
    vekter(0, 0, 0, 0, 1),
    vekter(0, 0, 1, 1, 0, 1),
  ],
  etiketter,
  keys: GRUPPER.map((g) => ({ text: `${g.kode} ${g.navn}`, color: g.farge, kind: "fill" as const })),
  notes: ["Equal Earth-projeksjon", "Grått i steg 2–7: de andre hovedgruppene"],
  remark: (
    <span className="text-xs text-slate-400">
      Kartdata: Beck mfl. (2023), Köppen–Geiger 1991–2020,{" "}
      <a className="underline" href="https://commons.wikimedia.org/wiki/File:Koppen-Geiger_Map_v2_World_1991%E2%80%932020.svg" target="_blank" rel="noreferrer">
        Wikimedia Commons
      </a>
      ,{" "}
      <a className="underline" href="https://creativecommons.org/licenses/by/4.0/deed.no" target="_blank" rel="noreferrer">
        CC BY 4.0
      </a>
      . Bearbeidet: klassene er slått sammen til fem hovedgrupper, omprojisert og gitt nye farger.
    </span>
  ),
  viewBox: "0 0 960 540",
  tegn: (s) => {
    const p0 = parallell(0);
    const tr = [parallell(23.44), parallell(-23.44)];
    const pol = [parallell(66.56), parallell(-66.56)];
    const p60 = parallell(60);
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d2a44" />
            <stop offset="50%" stopColor="#123a5c" />
            <stop offset="100%" stopColor="#0d2a44" />
          </linearGradient>
          <radialGradient id={`${ID}-skygge`} cx="50%" cy="50%" r="55%">
            <stop offset="75%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
          </radialGradient>
        </KlimaDefs>
        <rect x={0} y={0} width={960} height={540} fill="#08131f" data-nocheck="" />
        <Kart vekt={[s.a, s.b, s.c, s.d, s.e]} />
        <g aria-hidden="true" data-nocheck="">
          <line x1={p0.x1} x2={p0.x2} y1={p0.y} y2={p0.y} stroke={K.varm} strokeOpacity={0.8} strokeWidth={1.6} strokeDasharray="8 6" />
          {tr.map((p, i) => <line key={`t${i}`} x1={p.x1} x2={p.x2} y1={p.y} y2={p.y} stroke="#e2e8f0" strokeOpacity={0.7} strokeWidth={1.3} strokeDasharray="4 6" />)}
          {pol.map((p, i) => <line key={`p${i}`} x1={p.x1} x2={p.x2} y1={p.y} y2={p.y} stroke="#0b1620" strokeOpacity={0.85} strokeWidth={1.6} strokeDasharray="4 6" />)}
          <line x1={p60.x1} x2={p60.x2} y1={p60.y} y2={p60.y} stroke="#fff" strokeOpacity={op(0.9 * s.br)} strokeWidth={2.4} />
        </g>
      </>
    );
  },
};

export const KlimaKoppenFigur = lagFigur(def);
