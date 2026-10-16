/**
 * Kontakt- og regional metamorfose (v2), bygget på prosess-kit.
 * To faner med hver sin tidslinje. Alle faglige poeng og etiketter følger Mats' tekst i bergarter.md
 * (avsnittene «Hva er metamorfe bergarter?», «Kontaktmetamorfose og regional metamorfose», «Fyllitt»,
 * «Gneis» og ordlisten). Målerne er relative og har ingen tall.
 *
 * Erstatter KontaktRegionalMetamorfoseFigur i widgeten KontaktRegional. Den gamle filen
 * (kontakt-regional-figur.tsx) er ikke endret, så åpne PR-er som retter den, ikke får konflikt.
 */
import { useId, useMemo, useState } from "react";
import { Faner, IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key, type Lab } from "./isbre-figur";
import { clamp, lerp, useBoxWidth, useInView, useNarrow } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { KornLag, Maalere, TidslinjeKontroller, Zoomlinse } from "./prosess-figur";
import { KONTAKT_REGIONAL_TEKST } from "./kontakt-regional-tekst";
import { lagKornTekstur, lat, tidslinjeVerdi, useTidslinje, type Korn, type Maaler } from "./prosess-kit";

type Fane = "kontakt" | "regional";
const FANER = ["Kontaktmetamorfose", "Regional metamorfose"];

/* ---------- tekst (kilde per steg står i PR-beskrivelsen) ---------- */

const K_FASER = ["Magma trenger inn", "Varmen sprer seg", "Omdanning i fast tilstand", "Hornfels"];
const K_STATUS = [
  "Kontaktmetamorfose: magma trenger inn i sidebergarten. Her er sidebergarten sedimentære lag.",
  "Magmaen varmer opp sidebergarten lokalt. Varmen er viktigst, og trykket er ikke rettet. Sonen rundt intrusjonen er kontaktaureolen.",
  "I kontaktaureolen omdannes bergarten til en ny bergart i fast tilstand, uten at den smelter. Lagene blir liggende flate.",
  "Sedimentære bergarter kan bli til tette, flintaktige hornfelser i kontaktaureolen. Kornene i hornfels har ingen felles retning.",
];
const K_STATUS_UTE = [
  "Kontaktmetamorfose: magma trenger inn i sidebergarten. Linsen ser på sidebergarten utenfor kontaktaureolen.",
  "Magmaen varmer opp sidebergarten lokalt. Linsen er utenfor kontaktaureolen.",
  "Omdanningen skjer i kontaktaureolen rundt intrusjonen. Linsen er utenfor, og lagene her er ikke omdannet.",
  "Hornfels dannes i kontaktaureolen rundt intrusjonen. Linsen er utenfor, og her er sidebergarten fortsatt sedimentære lag.",
];

const R_FASER = ["Platene presses sammen", "Presses dypt ned", "Bergartene foldes", "Glimmer legger seg på tvers", "Fyllitt og gneis"];
const R_STATUS = [
  "Regional metamorfose: under fjellkjededannelse presses bergartene sammen fra sidene. Trykket er rettet.",
  "Store bergflak skyves over hverandre, og bergartene presses dypt ned. Både trykket og temperaturen blir høye.",
  "Bergartene foldes. Regional metamorfose skjer over store områder.",
  "Mineraler som glimmer legger seg på tvers av trykkretningen. Det dannes foliasjon og skifrighet.",
  "Fyllitt og gneis er typiske produkter. Fyllitt har små korn og tydelig skifrighet. I gneis er kornene synlige, og båndene er grovere enn i fyllitt.",
];

/* ---------- nøkkelbilder (indeks = p) ---------- */

const K_BILDER = [
  { mag: 0, aur: 0, heat: 0, rc: 0, hf: 0 },
  { mag: 1, aur: 0, heat: 0, rc: 0, hf: 0 },
  { mag: 1, aur: 1, heat: 1, rc: 0, hf: 0 },
  { mag: 1, aur: 1, heat: 1, rc: 0.7, hf: 0 },
  { mag: 1, aur: 1, heat: 1, rc: 1, hf: 1 },
];

const R_BILDER = [
  { pr: 0, d: 0, f: 0, fol: 0, prod: 0, P: 0.08, T: 0.08 },
  // lagene er flate i steg 1, svakt bøyd i steg 2 og fullt foldet i steg 3 (GeoBot1, 16.10)
  { pr: 1, d: 0, f: 0, fol: 0, prod: 0, P: 0.35, T: 0.12 },
  { pr: 1, d: 1, f: 0.25, fol: 0, prod: 0, P: 0.8, T: 0.75 },
  { pr: 1, d: 1, f: 1, fol: 0, prod: 0, P: 0.9, T: 0.85 },
  { pr: 1, d: 1, f: 1, fol: 1, prod: 0, P: 0.95, T: 0.9 },
  { pr: 1, d: 1, f: 1, fol: 1, prod: 1, P: 0.95, T: 0.9 },
];

const FARGE = {
  luft: "#121a20",
  sand: "#c9b896",
  sand2: "#b8a783",
  leire: "#6d7468",
  leire2: "#7b8276",
  magma: "#b8462a",
  magmaKant: "#f08a4b",
  varme: "#e0743a",
  hornfels: "#4b4452",
  aureole: "#f2a46b",
  trykk: "#5fa6c8",
  bergflak: "#5a5048",
  foliasjon: "#d9c6e6",
  glimmer: "#463c34",
  glimmerKant: "#cbbfa8",
  lys: "#ddd6c6",
  lys2: "#cbc3b1",
};

/* ---------- oppsett ---------- */

type Layout = {
  vb: string;
  sek: { x0: number; x1: number; y0: number; flate: number; y1: number };
  magma: { cx: number; rx: number; ry: number };
  aur: { rx: number; ry: number };
  boksInne: [number, number];
  boksUte: [number, number];
  boks: [number, number];
  linse: { cx: number; cy: number; r: number };
  pil: { y: number; v: [number, number]; h: [number, number]; tykk: number };
  flak: number;
  fold: { amp: number; bolge: number };
  /** Tekstrader for etiketter på bred skjerm. */
  over: number;
  under: number;
  linseOver: number;
  linseUnder: number;
  /** Plass til nummermerker på smal skjerm. */
  merke: { luft: number; mellom: number; side: [number, number] };
};

const BRED: Layout = {
  vb: "0 0 960 540",
  sek: { x0: 70, x1: 500, y0: 40, flate: 100, y1: 470 },
  magma: { cx: 285, rx: 85, ry: 230 },
  aur: { rx: 140, ry: 290 },
  boksInne: [390, 380],
  boksUte: [462, 380],
  boks: [14, 10],
  linse: { cx: 760, cy: 262, r: 172 },
  pil: { y: 300, v: [10, 62], h: [560, 508], tykk: 22 },
  flak: 70,
  fold: { amp: 34, bolge: 290 },
  over: 70,
  under: 500,
  linseOver: 70,
  linseUnder: 470,
  merke: { luft: 70, mellom: 0, side: [0, 0] },
};

const SMAL: Layout = {
  vb: "0 0 520 700",
  sek: { x0: 44, x1: 476, y0: 20, flate: 70, y1: 330 },
  magma: { cx: 260, rx: 62, ry: 150 },
  aur: { rx: 110, ry: 200 },
  boksInne: [338, 275],
  boksUte: [450, 275],
  boks: [12, 9],
  linse: { cx: 260, cy: 520, r: 145 },
  pil: { y: 220, v: [2, 40], h: [518, 480], tykk: 18 },
  flak: 52,
  fold: { amp: 24, bolge: 290 },
  over: 50,
  under: 360,
  linseOver: 360,
  linseUnder: 690,
  merke: { luft: 44, mellom: 350, side: [70, 450] },
};

/* ---------- teksturer (seedet, regnes ut én gang per isolat) ---------- */

const iLinse = (x: number, y: number, r: number) => Math.hypot(x, y) - r < 1.0;
const erGlimmer = (k: Korn) => k.type === 0;
/** Glimmerflakene starter i tilfeldig retning og dreier mot nærmeste loddrette stilling. */
const vinkel0 = (k: Korn) => k.frø * 160 - 80;

/** Gneis: loddrette, bølgete bånd av mørke og lyse korn. */
const gneisBolge = (x: number, y: number) => Math.sin((x + 0.08 * Math.sin(y * 5)) * 5.2);
const gneisMork = (k: Korn) => gneisBolge(k.x, k.y) > 0.25;

/** Mørke gneisbånd som flater (bakgrunn bak kornene) over hele linsen, i SVG-koordinater. */
const baandCache = new Map<string, string>();
/** Mørke gneisbånd, memoisert per linse (regnes ikke på nytt hver bilderute). */
function GNEIS_BAAND(cx: number, cy: number, R: number) {
  const nokkel = `${cx}|${cy}|${R}`;
  const hit = baandCache.get(nokkel);
  if (hit !== undefined) return hit;
  const d = lagGneisBaand(cx, cy, R);
  baandCache.set(nokkel, d);
  return d;
}
function lagGneisBaand(cx: number, cy: number, R: number) {
  const deler: string[] = [];
  const ys: number[] = [];
  for (let y = -1; y <= 1.0001; y += 0.05) ys.push(y);
  // finn x-intervaller der gneisBolge > 0.25, ved å følge hver bølgetopp
  for (let n = -3; n <= 3; n++) {
    const midt = (Math.PI / 2 + 2 * Math.PI * n) / 5.2;
    const halv = Math.acos(0.25) / 5.2;
    if (midt + halv < -1.05 || midt - halv > 1.05) continue;
    const venstre = ys.map((y) => [cx + Math.max(-1.05, midt - halv - 0.08 * Math.sin(y * 5)) * R, cy + y * R]);
    const hoyre = ys.map((y) => [cx + Math.min(1.05, midt + halv - 0.08 * Math.sin(y * 5)) * R, cy + y * R]).reverse();
    deler.push(`M${[...venstre, ...hoyre].map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} Z`);
  }
  return deler.join(" ");
}

/** Lagdeling i sedimentet: annenhver stripe sand og leire. */
const LAG_TYKK = 0.62;
const sedimentLag = (k: Korn) => Math.floor((k.y + 1.2) / LAG_TYKK) % 2 === 0;

function naermest(korn: Korn[], tx: number, ty: number, filter: (k: Korn) => boolean = () => true) {
  let best = korn[0];
  let d = Infinity;
  for (const k of korn) {
    if (!filter(k)) continue;
    const dd = Math.hypot(k.x - tx, k.y - ty);
    if (dd < d) {
      d = dd;
      best = k;
    }
  }
  return best;
}

/** Teksturer og pekepunkter regnes ut lat ved første bruk (ikke når modulen lastes). */
const teksturer = lat(() => {
  const SEDIMENT = lagKornTekstur({ seed: 1357, avstand: 0.15, typer: 2, inni: iLinse, nokkel: "kr-sediment" });
  // Hornfels: små, likesidete, tettpakkede korn i tilfeldig retning, finere enn sedimentet (GeoBot1, 16.10)
  const HORNFELS = lagKornTekstur({
    seed: 2468,
    avstand: 0.1,
    storrelse: [0.85, 1],
    fyllHull: 0.9,
    strekk: [0.85, 1],
    inni: iLinse,
    nokkel: "kr-hornfels",
  });
  const REG = { seed: 4242, avstand: 0.2, typer: 3, inni: iLinse, nokkel: "kr-regional" };
  const REG_KORN = lagKornTekstur(REG);
  /** Samme posisjoner, men avlange, uroterte former: glimmerflak som figuren roterer selv. */
  const REG_FLAK = lagKornTekstur({ ...REG, strekk: [0.24, 0.32], roter: false });
  const LYSE = REG_KORN.filter((k) => !erGlimmer(k));
  const GLIMMER = REG_FLAK.filter(erGlimmer);
  const FYLLITT = lagKornTekstur({
    seed: 77,
    avstand: 0.13,
    strekk: [0.24, 0.34],
    roter: false,
    fyllHull: 0.3,
    inni: iLinse,
    nokkel: "kr-fyllitt-hel",
  });
  const GNEIS = lagKornTekstur({
    seed: 99,
    avstand: 0.3,
    strekk: [0.55, 0.8],
    roter: false,
    inni: iLinse,
    nokkel: "kr-gneis-hel",
  });
  const PEK = {
    sediment: naermest(SEDIMENT, -0.35, 0.35, sedimentLag),
    hornfels: naermest(HORNFELS, 0.3, 0.3),
    glimmer: naermest(GLIMMER, -0.25, -0.4),
    fyllitt: naermest(FYLLITT, 0.1, -0.35),
    gneis: naermest(GNEIS, 0.1, 0.35, gneisMork),
  };
  return { SEDIMENT, HORNFELS, LYSE, GLIMMER, FYLLITT, GNEIS, PEK };
});

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

/** Øvre halvdel av en ellipse med sentrum på bunnlinjen. */
function kuppel(cx: number, base: number, rx: number, ry: number) {
  return `M${(cx - rx).toFixed(1)} ${base} A${rx.toFixed(1)} ${Math.max(0.1, ry).toFixed(1)} 0 0 1 ${(cx + rx).toFixed(1)} ${base} Z`;
}

/** Pil som peker innover (rettet trykk). */
function pil(fra: number, til: number, y: number, t: number) {
  const dir = Math.sign(til - fra);
  const hode = t * 1.6;
  const skaft = til - dir * hode;
  return `M${fra} ${y - t / 2} L${skaft} ${y - t / 2} L${skaft} ${y - t} L${til} ${y} L${skaft} ${y + t} L${skaft} ${y + t / 2} L${fra} ${y + t / 2} Z`;
}

export function KontaktRegionalV2Figur({
  heading = KONTAKT_REGIONAL_TEKST.heading,
  caption,
}: {
  heading?: string;
  caption?: React.ReactNode;
}) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const { SEDIMENT, HORNFELS, LYSE, GLIMMER, FYLLITT, GNEIS, PEK } = teksturer();
  const [fane, setFane] = useState<Fane>("kontakt");
  const [inne, setInne] = useState(true);
  const tlK = useTidslinje({ antall: K_FASER.length, synlig: visible && fane === "kontakt", faseMs: 3400, holdMs: 1700, element: ref });
  const tlR = useTidslinje({ antall: R_FASER.length, synlig: visible && fane === "regional", faseMs: 3400, holdMs: 1700, element: ref });
  const tl = fane === "kontakt" ? tlK : tlR;
  const uid = useId().replace(/:/g, "");
  /** Fanebytte er et brukervalg, som et stegvalg: begge tidslinjene settes på pause, og ny status leses opp. */
  const velgFane = (n: number) => {
    const ny: Fane = n === 1 ? "kontakt" : "regional";
    if (ny === fane) return;
    (fane === "kontakt" ? tlR : tlK).valg(() => {});
    tl.valg(() => setFane(ny));
  };
  const L = small ? SMAL : BRED;
  const { sek, linse } = L;
  const R = linse.r;
  const fs = 15;
  const sekMidt = (sek.x0 + sek.x1) / 2;

  const fyllSed = useMemo(
    () => (k: Korn) => (sedimentLag(k) ? (k.frø > 0.5 ? FARGE.sand : FARGE.sand2) : k.frø > 0.5 ? FARGE.leire : FARGE.leire2),
    [],
  );
  const fyllHf = useMemo(() => (k: Korn) => ["#4f4a55", "#5e5964", "#6b6571", "#433f48"][Math.floor(k.frø * 4)], []);
  const fyllLys = useMemo(() => (k: Korn) => (k.frø > 0.5 ? FARGE.lys : FARGE.lys2), []);
  const fyllGlimmer = useMemo(() => () => FARGE.glimmer, []);
  const fyllFyllitt = useMemo(
    () => (k: Korn) => (k.type === 0 ? "#5d675f" : k.frø > 0.5 ? "#a9b0a4" : "#8e978c"),
    [],
  );
  const fyllGneis = useMemo(
    () => (k: Korn) => (gneisMork(k) ? (k.frø > 0.5 ? "#3f3833" : "#51483f") : k.frø > 0.5 ? "#e6dfd0" : "#d3b9a6"),
    [],
  );

  const labels: Lab[] = [];
  let tegning: React.ReactNode;
  let maalere: Maaler[];
  let keys: Key[];
  let status: string;
  let tittel: string;
  let tilstand: string;
  /** Målerne skjules (men beholder plassen) når de ikke gjelder bildet, f.eks. produktene i steg 5. */
  let skjulMaalere = false;

  if (fane === "kontakt") {
    const s = tidslinjeVerdi(K_BILDER, tl.p);
    const base = sek.y1;
    const { cx } = L.magma;
    const mRx = L.magma.rx * (0.45 + 0.55 * s.mag);
    const mRy = L.magma.ry * s.mag;
    const aRx = lerp(L.magma.rx, L.aur.rx, s.aur);
    const aRy = lerp(L.magma.ry, L.aur.ry, s.aur);
    const boks = inne ? L.boksInne : L.boksUte;
    const rc = inne ? s.rc : 0;
    const varmeLinse = inne ? s.heat : s.heat * 0.08;
    const lagH = (sek.y1 - sek.flate) / 6;
    status = (inne ? K_STATUS : K_STATUS_UTE)[tl.fase - 1];
    tittel =
      KONTAKT_REGIONAL_TEKST.title;
    tilstand = `mag=${s.mag.toFixed(2)} aur=${s.aur.toFixed(2)} rc=${rc.toFixed(2)} hf=${s.hf.toFixed(2)}`;
    maalere = [
      { navn: "Temperatur i linsen", verdi: varmeLinse, ender: ["lav", "høy"], farge: "#e0874a" },
      { navn: "Rettet trykk", verdi: 0, ender: ["nei", "ja"], farge: "#5fa6c8", tekst: "nei, ikke rettet" },
    ];
    keys = [
      { text: "Magma", color: FARGE.magma, kind: "fill", off: s.mag < 0.05 },
      { text: "Kontaktaureole", color: FARGE.aureole, kind: "dash", off: s.aur < 0.5 },
      { text: "Hornfels", color: FARGE.hornfels, kind: "fill", off: s.hf < 0.5 },
      { text: "Sand- og leirlag", color: FARGE.sand, kind: "fill" },
    ];

    // ---- etiketter ----
    labels.push({
      text: "Sedimentære lag",
      x: sek.x0,
      y: L.over,
      at: [sek.x0 + 40, sek.flate + lagH * 0.5],
      badge: [sek.x0 + 16, L.merke.luft],
      size: fs,
      weight: 700,
      color: "#e9dfc4",
    });
    if (s.mag > 0.4) {
      labels.push({
        text: tl.fase === 1 ? "Magma trenger inn" : "Magma",
        x: cx,
        y: L.under,
        at: [cx, base - mRy * 0.45],
        badge: small ? [cx, L.merke.mellom] : undefined,
        anchor: "middle",
        size: fs,
        weight: 700,
        color: "#ffb38a",
      });
    }
    if (s.aur > 0.6) {
      const ax = cx + L.aur.rx * Math.cos(-Math.PI * 0.32);
      const ay = base + L.aur.ry * Math.sin(-Math.PI * 0.32);
      labels.push({
        text: "Kontaktaureole",
        x: small ? ax : cx + 40,
        y: L.over,
        at: [ax, ay],
        badge: [ax + 20, L.merke.luft],
        anchor: "start",
        size: fs,
        weight: 700,
        color: FARGE.aureole,
      });
    }
    if (tl.fase >= 3) {
      labels.push({
        text: "Lagene ligger flate",
        x: sek.x1,
        y: L.under,
        at: [sek.x1 - 22, sek.flate + lagH * 1.5],
        badge: [sek.x1 - 24, L.merke.luft],
        anchor: "end",
        size: fs,
        weight: 700,
        color: "#e9dfc4",
      });
    }
    if (s.hf > 0.6) {
      const hx = cx - (L.magma.rx + L.aur.rx) / 2;
      labels.push({
        text: "Hornfels",
        x: sek.x0 + 30,
        y: L.under,
        at: [hx, base - lagH * 0.8],
        badge: small ? [sek.x0 + 30, L.merke.mellom] : undefined,
        anchor: "start",
        size: fs,
        weight: 700,
        color: "#d8cce6",
      });
    }
    // linse
    const lp = (k: Korn): [number, number] => [linse.cx + k.x * R, linse.cy + k.y * R];
    if (rc < 0.5) {
      labels.push({
        text: inne ? "Korn i sand- og leirlag" : "Uomdannet: sand- og leirlag",
        x: linse.cx,
        y: L.linseUnder,
        at: lp(PEK.sediment),
        badge: small ? [L.merke.side[0], linse.cy + R * 0.55] : undefined,
        anchor: "middle",
        size: fs,
        weight: 700,
        color: "#e9dfc4",
      });
    } else {
      labels.push({
        text: tl.fase >= 4 ? "Hornfels: kornene har ingen felles retning" : "Ny bergart i fast tilstand",
        x: linse.cx,
        y: L.linseUnder,
        at: lp(PEK.hornfels),
        badge: small ? [L.merke.side[1], linse.cy + R * 0.55] : undefined,
        anchor: small ? "middle" : "end",
        size: fs,
        weight: 700,
        color: "#d8cce6",
      });
      if (!small) labels[labels.length - 1].x = linse.cx + R + 30;
    }

    const lagFarger = [FARGE.sand, FARGE.leire, FARGE.sand2, FARGE.leire2, FARGE.sand, FARGE.leire];
    tegning = (
      <>
        <defs>
          <radialGradient id="kr-varme" gradientUnits="userSpaceOnUse" cx={cx} cy={base} r={L.aur.ry}>
            <stop offset="0" stopColor={FARGE.varme} stopOpacity="0.95" />
            <stop offset="0.7" stopColor={FARGE.varme} stopOpacity="0.55" />
            <stop offset="1" stopColor={FARGE.varme} stopOpacity="0.2" />
          </radialGradient>
          <clipPath id="kr-sek">
            <rect x={sek.x0} y={sek.flate} width={sek.x1 - sek.x0} height={sek.y1 - sek.flate} />
          </clipPath>
        </defs>
        <rect x={sek.x0} y={sek.y0} width={sek.x1 - sek.x0} height={sek.flate - sek.y0} fill={FARGE.luft} />
        <g clipPath="url(#kr-sek)">
          {lagFarger.map((f, i) => (
            <rect key={i} x={sek.x0} y={sek.flate + i * lagH} width={sek.x1 - sek.x0} height={lagH + 0.5} fill={f} />
          ))}
          {s.hf > 0.01 ? <path d={kuppel(cx, base, L.aur.rx, L.aur.ry)} fill={FARGE.hornfels} opacity={s.hf * 0.85} /> : null}
          {s.heat > 0.01 ? (
            <path d={kuppel(cx, base, aRx, aRy)} fill="url(#kr-varme)" opacity={s.heat * (1 - 0.45 * s.hf)} />
          ) : null}
          {s.mag > 0.01 ? <path d={kuppel(cx, base, mRx, mRy)} fill={FARGE.magma} stroke={FARGE.magmaKant} strokeWidth="3" /> : null}
          {/* aureolens yttergrense tegnes bare i full størrelse, så streken aldri krysser linseboksen */}
          {s.aur > 0.5 ? (
            <path
              d={kuppel(cx, base, L.aur.rx, L.aur.ry)}
              fill="none"
              stroke={FARGE.aureole}
              strokeWidth="2.5"
              strokeDasharray="9 6"
              opacity={clamp((s.aur - 0.5) * 2)}
            />
          ) : null}
        </g>
        <rect x={sek.x0} y={sek.y0} width={sek.x1 - sek.x0} height={sek.y1 - sek.y0} fill="none" stroke="#e8eef2" strokeOpacity="0.5" />
        <Zoomlinse cx={linse.cx} cy={linse.cy} r={R} fra={[boks[0], boks[1], L.boks[0], L.boks[1]]} bakgrunn={rc > 0.5 ? "#3a3640" : "#4a463f"}>
          {rc < 0.999 ? (
            <g opacity={1 - rc}>
              {[0, 1, 2, 3].map((j) => (
                <rect
                  key={j}
                  x={linse.cx - R}
                  y={linse.cy + (-1.2 + (2 * j + 1) * LAG_TYKK) * R}
                  width={R * 2}
                  height={LAG_TYKK * R}
                  fill="#3a3d36"
                />
              ))}
              {[0, 1, 2].map((j) => (
                <rect key={`s${j}`} x={linse.cx - R} y={linse.cy + (-1.2 + 2 * j * LAG_TYKK) * R} width={R * 2} height={LAG_TYKK * R} fill="#6b5d48" />
              ))}
            </g>
          ) : null}
          {rc < 0.999 ? (
            <KornLag
              korn={SEDIMENT}
              skala={R}
              pos={(k) => {
                const ut = clamp(rc * 1.6 - k.frø * 0.6);
                return [linse.cx + k.x * R, linse.cy + k.y * R, 1 - ut, 0, 1 - 0.35 * ut];
              }}
              fyll={fyllSed}
              noekkel={`${linse.cx}|${linse.cy}|${R}|${rc.toFixed(3)}`}
            />
          ) : null}
          {rc > 0.001 ? (
            <KornLag
              korn={HORNFELS}
              skala={R}
              pos={(k) => {
                const inn = clamp(rc * 1.6 - (1 - k.frø) * 0.6);
                return [linse.cx + k.x * R, linse.cy + k.y * R, inn > 0 ? 1 : 0, 0, Math.max(0.02, inn)];
              }}
              fyll={fyllHf}
              noekkel={`${linse.cx}|${linse.cy}|${R}|${rc.toFixed(3)}`}
            />
          ) : null}
          <rect x={linse.cx - R} y={linse.cy - R} width={R * 2} height={R * 2} fill={FARGE.varme} opacity={varmeLinse * 0.2} />
        </Zoomlinse>
      </>
    );
  } else {
    const s = tidslinjeVerdi(R_BILDER, tl.p);
    const topp = sek.flate + s.d * L.flak;
    const lagH = (sek.y1 - sek.flate) / 6;
    const amp = L.fold.amp * s.f;
    const lambda = ((sek.x1 - sek.x0) / 1.5) * (L.fold.bolge / 290);
    const yb = (x: number, i: number) => topp + i * lagH - amp * (0.55 + 0.45 * Math.min(1, i / 3)) * Math.cos((2 * Math.PI * (x - sekMidt)) / lambda);
    const xs: number[] = [];
    for (let x = sek.x0; x < sek.x1; x += 8) xs.push(x);
    xs.push(sek.x1);
    const linje = (i: number) => xs.map((x) => `${x.toFixed(1)} ${yb(x, i).toFixed(1)}`);
    const band = (i: number) => `M${linje(i).join(" L")} L${linje(i + 1).reverse().join(" L")} Z`;
    const lagFarger = ["#6d7468", "#9c8f74", "#7b8276", "#b6a684", "#6a6f63", "#8c8270", "#5f645a", "#857b69", "#5a5f55"];
    const boksY = (yb(sekMidt, 3) + yb(sekMidt, 4)) / 2;
    const flakT = s.d;
    const flakV = sek.x0 + (sekMidt + 30 - sek.x0) * flakT;
    const flakH = sek.x1 - (sek.x1 - sekMidt + 30) * flakT;
    const fol = s.fol;
    status = R_STATUS[tl.fase - 1];
    tittel =
      "Snitt der rettet trykk presser bergartene sammen fra sidene. Bergflak skyves over, lagene presses dypt ned og foldes, og glimmer legger seg på tvers av trykket. Linsen viser glimmerflak som dreier, og til slutt fyllitt og gneis.";
    tilstand = `pr=${s.pr.toFixed(2)} d=${s.d.toFixed(2)} f=${s.f.toFixed(2)} fol=${fol.toFixed(2)} prod=${s.prod.toFixed(2)}`;
    maalere = [
      { navn: "Trykk", verdi: s.P, ender: ["lavt", "høyt"], farge: "#8eb4d4" },
      { navn: "Temperatur", verdi: s.T, ender: ["lav", "høy"], farge: "#e0874a" },
      { navn: "Rettet trykk", verdi: s.pr, ender: ["nei", "ja"], farge: "#5fa6c8", tekst: s.pr > 0.5 ? "ja" : "nei" },
    ];
    keys = [
      { text: "Rettet trykk", color: FARGE.trykk, kind: "fill", off: s.pr < 0.5 },
      { text: "Bergflak", color: FARGE.bergflak, kind: "fill", off: s.d < 0.3 },
      { text: "Foliasjon", color: FARGE.foliasjon, kind: "line", off: fol < 0.3 },
      ...(s.prod < 0.5
        ? [{ text: "Glimmer", color: FARGE.glimmer, kind: "fill" as const }]
        : [
            { text: "Fyllitt", color: "#717a6e", kind: "fill" as const },
            { text: "Gneis", color: "#b9ad98", kind: "fill" as const },
          ]),
    ];

    if (s.pr > 0.5) {
      labels.push({
        text: "Rettet trykk",
        x: small ? L.pil.v[0] : sek.x0 - 60,
        y: L.under,
        at: [(L.pil.v[0] + L.pil.v[1]) / 2, L.pil.y + L.pil.tykk],
        badge: small ? [20, L.pil.y + 60] : undefined,
        anchor: "start",
        size: fs,
        weight: 700,
        color: "#9fd3ea",
      });
    }
    if (s.d > 0.6) {
      labels.push({
        text: "Bergflak skyves over",
        x: sek.x0 + 10,
        y: L.over,
        at: [sek.x0 + 60, sek.flate + L.flak * s.d * 0.5],
        badge: [sek.x0 + 60, L.merke.luft],
        anchor: "start",
        size: fs,
        weight: 700,
        color: "#e3d6c8",
      });
    }
    if (s.f > 0.6) {
      labels.push({
        text: "Lagene foldes",
        x: sek.x1,
        y: L.over,
        at: [sekMidt + lambda * 0.5 + 10, yb(sekMidt + lambda * 0.5 + 10, 2)],
        badge: [sek.x1 - 50, L.merke.luft],
        anchor: "end",
        size: fs,
        weight: 700,
        color: "#e9dfc4",
      });
    }
    if (fol > 0.5) {
      const fx = sekMidt - lambda * 0.25;
      labels.push({
        text: "Foliasjon på tvers av trykket",
        x: sekMidt,
        y: L.under,
        at: [fx, sek.y1 - lagH * 0.7],
        badge: small ? [sekMidt - 40, L.merke.mellom] : undefined,
        anchor: "middle",
        size: fs,
        weight: 700,
        color: FARGE.foliasjon,
      });
    }
    const lp = (k: Korn): [number, number] => [linse.cx + k.x * R, linse.cy + k.y * R];
    // Fyllitt og gneis i to separate, små linser med mellomrom. De er eksempler på produkter, ikke utsnitt av snittet.
    const produkt = { r: R * 0.47, fyllitt: linse.cx - R * 0.53, gneis: linse.cx + R * 0.53 };
    // målerne gjelder snittet, ikke de to produktene: de skjules i steg 5
    skjulMaalere = s.prod > 0.5;
    if (s.prod < 0.5) {
      labels.push({
        text: fol > 0.5 ? "Glimmer på tvers av trykket" : "Glimmer",
        x: linse.cx,
        y: L.linseUnder,
        at: lp(PEK.glimmer),
        badge: small ? [L.merke.side[0], linse.cy - R * 0.55] : undefined,
        anchor: "middle",
        size: fs,
        weight: 700,
        color: FARGE.glimmerKant,
      });
    } else {
      labels.push({
        text: "Fyllitt (lavgrads): små korn, tydelig skifrighet",
        x: small ? produkt.fyllitt : linse.cx - R,
        y: small ? L.linseUnder : L.linseOver,
        at: [produkt.fyllitt + PEK.fyllitt.x * produkt.r, linse.cy + PEK.fyllitt.y * produkt.r],
        badge: small ? [L.merke.side[0], linse.cy - R * 0.55] : undefined,
        anchor: small ? "middle" : "start",
        size: fs,
        weight: 700,
        color: "#c9d1c4",
      });
      labels.push({
        text: "Gneis: synlige korn, grovere bånd",
        x: small ? produkt.gneis : linse.cx + R,
        y: L.linseUnder,
        at: [produkt.gneis + PEK.gneis.x * produkt.r, linse.cy + PEK.gneis.y * produkt.r],
        badge: small ? [L.merke.side[1], linse.cy - R * 0.55] : undefined,
        anchor: small ? "middle" : "end",
        size: fs,
        weight: 700,
        color: "#eadfcb",
      });
    }

    const pilV = s.pr > 0.01;
    const steg = small ? 14 : 16;
    const folX: number[] = [];
    for (let x = sek.x0 + steg / 2; x < sek.x1; x += steg) folX.push(x);
    const prodSkjul = 1 - s.prod;
    tegning = (
      <>
        <defs>
          <clipPath id="kr-rsek">
            <rect x={sek.x0} y={sek.flate} width={sek.x1 - sek.x0} height={sek.y1 - sek.flate} />
          </clipPath>
          <linearGradient id="kr-dyp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={FARGE.varme} stopOpacity="0" />
            <stop offset="1" stopColor={FARGE.varme} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect x={sek.x0} y={sek.y0} width={sek.x1 - sek.x0} height={sek.flate - sek.y0} fill={FARGE.luft} />
        <g clipPath="url(#kr-rsek)">
          <rect x={sek.x0} y={sek.flate} width={sek.x1 - sek.x0} height={sek.y1 - sek.flate} fill="#4f5449" />
          {s.d > 0.01 ? (
            <>
              <path
                d={`M${sek.x0} ${sek.flate} L${flakV} ${sek.flate} L${flakV - L.flak * 0.6} ${topp + 2} L${sek.x0} ${topp + 2} Z`}
                fill={FARGE.bergflak}
                stroke="#2e2924"
                strokeWidth="2"
              />
              <path
                d={`M${sek.x1} ${sek.flate} L${flakH} ${sek.flate} L${flakH + L.flak * 0.6} ${topp + 2} L${sek.x1} ${topp + 2} Z`}
                fill="#6a5e54"
                stroke="#2e2924"
                strokeWidth="2"
              />
            </>
          ) : null}
          {lagFarger.map((f, i) => (
            <path key={i} d={band(i)} fill={f} stroke={i === 3 ? "#f3d27a" : "none"} strokeWidth={i === 3 ? 2 : 0} />
          ))}
          <rect x={sek.x0} y={sek.flate} width={sek.x1 - sek.x0} height={sek.y1 - sek.flate} fill="url(#kr-dyp)" opacity={s.T * 0.4} />
          {fol > 0.01 ? (
            <g data-nocheck="" opacity={fol * 0.85}>
              {folX.map((x) => (
                <line key={x} x1={x} y1={yb(x, 0) + 3} x2={x} y2={sek.y1} stroke={FARGE.foliasjon} strokeWidth="1.4" />
              ))}
            </g>
          ) : null}
        </g>
        <rect x={sek.x0} y={sek.y0} width={sek.x1 - sek.x0} height={sek.y1 - sek.y0} fill="none" stroke="#e8eef2" strokeOpacity="0.5" />
        {pilV ? (
          <g opacity={s.pr}>
            <path d={pil(L.pil.v[0], L.pil.v[1], L.pil.y, L.pil.tykk)} fill={FARGE.trykk} />
            <path d={pil(L.pil.h[0], L.pil.h[1], L.pil.y, L.pil.tykk)} fill={FARGE.trykk} />
          </g>
        ) : null}
        {prodSkjul > 0.01 ? (
          <g opacity={prodSkjul < 1 ? prodSkjul : undefined}>
            <Zoomlinse cx={linse.cx} cy={linse.cy} r={R} fra={[sekMidt, boksY, L.boks[0], L.boks[1]]} bakgrunn="#8d8576">
              <KornLag korn={LYSE} skala={R} pos={(k) => [linse.cx + k.x * R, linse.cy + k.y * R]} fyll={fyllLys} noekkel={`${linse.cx}|${linse.cy}|${R}`} />
              <KornLag
                korn={GLIMMER}
                skala={R}
                pos={(k) => {
                  const a0 = vinkel0(k);
                  return [linse.cx + k.x * R, linse.cy + k.y * R, 1, lerp(a0, a0 >= 0 ? 90 : -90, fol), 1.25];
                }}
                fyll={fyllGlimmer}
                strek={FARGE.glimmerKant}
                noekkel={`${linse.cx}|${linse.cy}|${R}|${fol.toFixed(3)}`}
              />
            </Zoomlinse>
          </g>
        ) : null}
        {s.prod > 0.01 ? (
          <g opacity={s.prod < 1 ? s.prod : undefined}>
            <Zoomlinse cx={produkt.fyllitt} cy={linse.cy} r={produkt.r} bakgrunn="#717a6e">
              <KornLag
                korn={FYLLITT}
                skala={produkt.r}
                pos={(k) => [produkt.fyllitt + k.x * produkt.r, linse.cy + k.y * produkt.r, 1, 90]}
                fyll={fyllFyllitt}
                strek="rgba(20,24,20,0.45)"
                noekkel={`${produkt.fyllitt}|${linse.cy}|${produkt.r}`}
              />
            </Zoomlinse>
            <Zoomlinse cx={produkt.gneis} cy={linse.cy} r={produkt.r} bakgrunn="#b9ad98">
              <path d={GNEIS_BAAND(produkt.gneis, linse.cy, produkt.r)} fill="#4a413a" />
              <KornLag
                korn={GNEIS}
                skala={produkt.r}
                pos={(k) => [produkt.gneis + k.x * produkt.r, linse.cy + k.y * produkt.r, 1, 90]}
                fyll={fyllGneis}
                noekkel={`${produkt.gneis}|${linse.cy}|${produkt.r}`}
              />
            </Zoomlinse>
          </g>
        ) : null}
      </>
    );
  }

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title={tittel}
        heading={heading}
        caption={
          caption ??
          KONTAKT_REGIONAL_TEKST.caption
        }
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        faner={
          <div className={small ? "[&_button]:text-sm" : undefined}>
            <Faner
              labels={FANER}
              valgt={fane === "kontakt" ? 1 : 2}
              onVelg={velgFane}
              label="Velg prosess"
              idPrefix={uid}
              panelId={`${uid}-panel`}
            />
          </div>
        }
        fanepanel={{ id: `${uid}-panel`, labelledBy: `${uid}-fane-${fane === "kontakt" ? 1 : 2}` }}
        toolbar={
          <div className={small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"}>
            <TidslinjeKontroller tl={tl} faser={fane === "kontakt" ? K_FASER : R_FASER} />
            {fane === "kontakt" ? (
              <StegVelger
                labels={["Linse i aureolen", "Linse utenfor aureolen"]}
                step={inne ? 1 : 2}
                onStep={(n) => tl.valg(() => setInne(n === 1))}
                label="Linse"
              />
            ) : null}
          </div>
        }
        status={status}
        keys={keys}
        labels={labels}
        notes={["Skjematisk, uten målestokk", "Målerne viser retning, ikke tall"]}
        viewBox={L.vb}
        below={
          <div className={skjulMaalere ? "invisible" : undefined} aria-hidden={skjulMaalere || undefined}>
            <Maalere maalere={maalere} />
          </div>
        }
      >
        {() => (
          <g data-figur="kontakt-regional" data-fane={fane} data-step={tl.fase} data-p={tl.p.toFixed(2)} data-tilstand={tilstand}>
            {tegning}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
