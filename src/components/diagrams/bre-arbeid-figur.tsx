/**
 * Breen i arbeid (geografi kap. 4, «Morener og smeltevannets avsetninger»): erosjon og transport under,
 * i og på en dalbre, og hvor de ulike morenene avsettes.
 *
 * Øverst et lengdesnitt gjennom en tenkt dalbre (høyden overdrevet): fjellsiden over isen frostsprenges (2),
 * isen plukker på lesiden av en bergknaus (3) og skurer støtsiden (4), materialet fraktes på, i og under
 * breen (5) og hoper seg opp ved fronten (6). Under: breen sett ovenfra, der to breer løper sammen, med
 * sidemorener, midtmorene og endemorene. Linsen forstørrer prosessen i hvert steg. I steg 7 er isen borte.
 *
 * Alt er tegnet i SVG og konstruert. Fagstoffet: se bre-arbeid-tekst.ts.
 */
import { useMemo } from "react";
import { IsbreFigur, type Key, type Lab } from "./isbre-figur";
import { clamp, lerp, smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { TidslinjeKontroller, Zoomlinse } from "./prosess-figur";
import { lat, prng, useFigurSmal, useTidslinje } from "./prosess-kit";
import { BRE_ARBEID_FASER, BRE_ARBEID_STATUS, BRE_ARBEID_TEKST } from "./bre-arbeid-tekst";

type P = [number, number];

/* ---------- geometri: lengdesnitt (lokalt 960 × 400) ---------- */

/** Fjelloverflaten under breen. Bergknausen ligger ved x 390–540: slak støtside, bratt og trappet leside. */
const BUNN: P[] = [
  [0, 70], [30, 82], [70, 104], [110, 126], [150, 146], [200, 168], [250, 188], [300, 206], [340, 220], [372, 232],
  [392, 238], [412, 238], [436, 233], [458, 227], [478, 222], [494, 219], [502, 220], [506, 229], [512, 231], [516, 241],
  [523, 243], [527, 253], [536, 256], [548, 266], [570, 272], [610, 280], [660, 289], [720, 299], [780, 309], [840, 316],
  [900, 321], [960, 325],
];
/** Isoverflaten. Fronten ligger ved x ≈ 778. */
const OVERFLATE: P[] = [
  [26, 52], [60, 66], [100, 78], [150, 90], [200, 101], [250, 112], [300, 124], [350, 136], [400, 147], [450, 156],
  [500, 164], [550, 173], [600, 184], [640, 194], [680, 207], [712, 222], [738, 240], [756, 258], [768, 278], [775, 296],
  [779, 309],
];
const FRONT_X = 779;
/** Fjellsiden på andre siden av dalen (bak breen). Den nederste delen dekkes av isen. */
const DALSIDE: P[] = [
  [0, 24], [40, 14], [80, 26], [120, 38], [160, 44], [200, 58], [240, 62], [280, 76], [320, 86], [360, 98], [400, 108],
  [440, 114], [480, 124], [520, 138], [560, 146], [600, 156], [650, 170], [700, 186], [760, 204], [820, 222], [880, 236],
  [960, 248],
];
/** Fjellveggen innerst i dalen, der breen begynner. */
const BAKVEGG: P[] = [[0, 0], [0, 70], [14, 62], [26, 52], [30, 38], [22, 22], [8, 6], [0, 0]];

function yVed(list: P[], x: number) {
  if (x <= list[0][0]) return list[0][1];
  for (let i = 1; i < list.length; i++) {
    if (x <= list[i][0]) {
      const [x0, y0] = list[i - 1];
      const [x1, y1] = list[i];
      return lerp(y0, y1, (x - x0) / (x1 - x0 || 1));
    }
  }
  return list[list.length - 1][1];
}
const bunn = (x: number) => yVed(BUNN, x);
const overflate = (x: number) => (x >= FRONT_X ? bunn(x) : yVed(OVERFLATE, x));
const dybde = (x: number, f: number) => lerp(overflate(x), bunn(x), f);
const poly = (list: P[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const linje = (list: P[]) => `M${list.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`;

/** Endemorenen: en usortert rygg foran fronten. Høyden h vokser i steg 6. */
function endemorene(h: number): P[] {
  const pts: P[] = [];
  for (let i = 0; i <= 16; i++) {
    const x = 768 + (i / 16) * 92;
    const t = (x - 768) / 92;
    // skjev rygg: brattere på innsiden (mot breen), slakere utover
    const form = t < 0.42 ? Math.sin((t / 0.42) * (Math.PI / 2)) : Math.cos(((t - 0.42) / 0.58) * (Math.PI / 2));
    const ru = 0.9 + 0.1 * Math.sin(i * 2.7);
    pts.push([x, bunn(x) - h * Math.pow(Math.max(0, form), 0.8) * ru]);
  }
  return pts;
}

/* ---------- geometri: sett ovenfra (lokalt 600 × 220) ---------- */

const PLAN_YTRE_N: P[] = [[0, 22], [60, 26], [120, 36], [180, 52], [230, 64], [300, 70], [370, 76], [430, 80], [475, 86]];
const PLAN_YTRE_S: P[] = [[0, 198], [60, 194], [120, 184], [180, 168], [230, 156], [300, 150], [370, 144], [430, 140], [475, 134]];
const PLAN_INDRE_N: P[] = [[0, 88], [70, 92], [140, 100], [196, 108], [214, 110]];
const PLAN_INDRE_S: P[] = [[0, 132], [70, 128], [140, 120], [196, 112], [214, 110]];
const PLAN_MIDT: P[] = [[214, 110], [300, 110], [380, 110], [450, 110], [492, 110]];
const FRONT_PLAN: P[] = [[475, 86], [494, 92], [506, 102], [510, 110], [506, 118], [494, 128], [475, 134]];
const ENDE_PLAN: P[] = [[468, 72], [500, 80], [522, 96], [530, 110], [522, 124], [500, 140], [468, 148]];
const breOmriss = (): P[] => [...PLAN_YTRE_N, ...FRONT_PLAN.slice(1, -1), ...[...PLAN_YTRE_S].reverse()];
/** Fjellryggen mellom de to breene som løper sammen. */
const RYGG_PLAN: P[] = [...PLAN_INDRE_N, ...[...PLAN_INDRE_S].reverse()];

function forskyv(list: P[], dy: number): P[] {
  return list.map(([x, y]) => [x, y + dy]);
}

/* ---------- tilfeldige, faste detaljer ---------- */

type Stein = { x: number; y: number; r: number; v: number; k: number };
/** Usortert materiale: mange små korn og noen store blokker. */
function lagSteiner(seed: number, n: number, rMin: number, rMax: number): Stein[] {
  const r = prng(seed);
  return Array.from({ length: n }, () => {
    const u = r();
    return { x: r(), y: r(), r: rMin + (rMax - rMin) * u * u * u, v: r(), k: Math.floor(r() * 4) };
  });
}
const STEINFARGER = ["#8a8378", "#a39b8d", "#6f6a62", "#b5ab98"];

/** Uregelmessig steinomriss rundt (cx, cy). */
function steinSti(cx: number, cy: number, r: number, v: number) {
  const n = 6;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + v * 3;
    const rr = r * (0.72 + 0.28 * Math.sin(i * 2.3 + v * 11));
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr * 0.8).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

const FAMILIER = lat(() => ({
  /** Steiner som faller ned på breen fra fjellsiden og fraktes på overflaten. */
  paa: lagSteiner(311, 9, 2.2, 5.5),
  /** Steiner fra bakveggen som begraves i snøen og fraktes inne i breen. */
  i: lagSteiner(523, 10, 1.6, 4.2),
  /** Steiner i bresålen. */
  under: lagSteiner(877, 16, 1.4, 4.6),
  /** Morenemateriale i ryggene. */
  morene: lagSteiner(1201, 70, 0.9, 4.2),
  /** Bunnmorene. */
  bunn: lagSteiner(1409, 60, 0.8, 2.6),
  /** Ura under fjellsiden (steg 7). */
  ur: lagSteiner(1601, 26, 1.2, 4.4),
  /** Sprekker i fjellsiden. */
  sprekk: lagSteiner(1777, 26, 6, 22),
}));

/* ---------- farger ---------- */

const F = {
  himmelTopp: "#0e1c27",
  himmelBunn: "#2a4556",
  fjern: "#1c2f3b",
  fjernSno: "#c7d6df",
  berg: "#5f5c56",
  bergLys: "#8b867b",
  bergMork: "#3c3a37",
  is: "#cfe5f2",
  isDyp: "#8fbcd8",
  isKant: "#e9f4fa",
  morene: "#a8987c",
  moreneMork: "#7a6c57",
  dalbunn: "#566b4a",
  lys: "#e8eef2",
  tekst: "#e8eef2",
  bevegelse: "#ffd27a",
  frost: "#9fe0ff",
  plukk: "#ff9d7a",
  skur: "#f3d27a",
  transport: "#c6e7a3",
};

type Utsnitt = { vb: [number, number]; snitt: { x: number; y: number; s: number }; plan: { x: number; y: number; s: number }; linse: { cx: number; cy: number; r: number } };
const BRED: Utsnitt = { vb: [960, 640], snitt: { x: 0, y: 0, s: 1 }, plan: { x: 0, y: 414, s: 1 }, linse: { cx: 790, cy: 527, r: 100 } };
/** Smal layout: snittet vises større (0,8) og panoreres til det steget handler om, så det ikke blir for smått. */
const SMAL: Utsnitt = { vb: [520, 738], snitt: { x: 0, y: 0, s: 0.8 }, plan: { x: 0, y: 330, s: 520 / 600 }, linse: { cx: 260, cy: 641, r: 88 } };
/** Midtpunktet (x i snittet) smal layout panorerer til, per steg. */
const PAN_MIDT = [600, 330, 500, 460, 480, 700, 560];
const SNITT_VIS = 520 / 0.8;
function panVed(p: number) {
  const q = clamp(p - 0.5, 0, PAN_MIDT.length - 1);
  const a = Math.floor(q);
  const b = Math.min(PAN_MIDT.length - 1, a + 1);
  const x = lerp(PAN_MIDT[a], PAN_MIDT[b], smooth(q - a));
  return clamp(x - SNITT_VIS / 2, 0, 960 - SNITT_VIS);
}

/** Punktene linsen forstørrer i lengdesnittet (bred layout), per steg. */
const LINSE_FRA: (P | null)[] = [[620, 214], [300, 104], [514, 236], [440, 230], [650, 240], [806, 300], [440, 230]];

export function BreArbeidFigur({ heading = BRE_ARBEID_TEKST.heading, caption }: { heading?: string; caption?: React.ReactNode; geografi?: boolean }) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const tl = useTidslinje({ antall: BRE_ARBEID_FASER.length, synlig: visible, faseMs: 4200, holdMs: 1800, element: ref });
  const L = small ? SMAL : BRED;
  const [vbW, vbH] = L.vb;
  const fase = tl.fase;
  const p = tl.p;
  const sek = tl.sek;
  const beveger = tl.playing;

  // overganger langs tidslinjen
  const smelt = smooth(clamp(p - 6)); // isen forsvinner i steg 7
  const isOp = 1 - smelt;
  const vekst = smooth(clamp(p - 5)); // morenene bygges i steg 6
  const moreneH = lerp(12, 40, vekst);
  const bunnOp = 0.25 + 0.75 * smooth(clamp(p - 5));
  const frostBlokk = smooth(clamp(p - 1)); // blokken faller i steg 2
  const plukket = smooth(clamp(p - 2)); // blokken på lesiden løsner i steg 3
  const skurt = smooth(clamp(p - 3));
  const fokus = (n: number) => (fase === n ? 1 : 0);

  const fam = FAMILIER();
  const S = L.snitt;
  const PL = L.plan;
  const pan = small ? panVed(p) : 0;
  const A = (x: number, y: number): P => [S.x + (x - pan) * S.s, S.y + y * S.s];
  const B = (x: number, y: number): P => [PL.x + x * PL.s, PL.y + y * PL.s];

  // tid for partiklene (sekunder) – står stille når animasjonen er pauset
  const tSek = sek;

  /* ----- lengdesnitt: statiske stier ----- */
  const stier = useMemo(() => {
    const isPoly = [...OVERFLATE, ...BUNN.filter(([x]) => x < FRONT_X).reverse(), [0, 70] as P];
    const isPolyFull: P[] = [[22, 46], ...isPoly];
    const dalside: P[] = [...DALSIDE, [960, 400], [0, 400]];
    const bunnPoly: P[] = [...BUNN, [960, 400], [0, 400]];
    // flytbånd i isen (lagdeling), følger formen mellom overflate og bunn
    const baand = [0.18, 0.36, 0.55, 0.74, 0.9].map((f) => {
      const pts: P[] = [];
      for (let x = 34; x < FRONT_X - 6; x += 12) pts.push([x, dybde(x, f)]);
      return pts;
    });
    // bresprekker der breen blir brattere
    const sprekker = [604, 628, 652, 676, 698, 718, 736].map((x, i) => {
      const y = overflate(x);
      const d = 8 + (i % 3) * 4;
      return `M${x - 3} ${y.toFixed(1)} L${x + 0.5} ${(y + d).toFixed(1)} L${x + 3} ${y.toFixed(1)}`;
    });
    // skuringsstriper på støtsiden: korte streker langs berget
    const striper: string[] = [];
    for (let x = 390; x < 496; x += 7) {
      const y = bunn(x);
      const y2 = bunn(x + 5);
      striper.push(`M${x} ${(y + 1.5).toFixed(1)} L${x + 5} ${(y2 + 1.5).toFixed(1)}`);
    }
    return { isPoly: isPolyFull, dalside, bunnPoly, baand, sprekker, striper };
  }, []);

  /* ----- partikler i lengdesnittet ----- */
  type Pos = { x: number; y: number; op: number };
  const posPaa = (s: Stein, i: number): Pos => {
    // faller fra fjellsiden ved x ≈ 300–340 og fraktes på isoverflaten til fronten
    const start = 300 + s.x * 60;
    const u = (((tSek * 0.045 + i / fam.paa.length) % 1) + 1) % 1;
    const x = lerp(start, FRONT_X - 6, u);
    return { x, y: overflate(x) - s.r * 0.7, op: u > 0.96 ? (1 - u) * 25 : 1 };
  };
  const posI = (s: Stein, i: number): Pos => {
    // begraves i snøen øverst og synker inn i breen, kommer fram igjen nær fronten (smeltesonen)
    const u = (((tSek * 0.032 + i / fam.i.length) % 1) + 1) % 1;
    const x = lerp(70 + s.x * 40, FRONT_X - 10, u);
    const f = 0.12 + 0.55 * Math.sin(Math.PI * clamp(u * 1.04)) * (0.7 + 0.3 * s.y);
    return { x, y: dybde(x, f), op: 1 };
  };
  const posUnder = (s: Stein, i: number): Pos => {
    // følger bresålen, saktere enn overflaten
    const u = (((tSek * 0.022 + i / fam.under.length) % 1) + 1) % 1;
    const x = lerp(120 + s.x * 60, FRONT_X - 4, u);
    return { x, y: bunn(x) - s.r - 0.6, op: 1 };
  };

  // den plukkede blokken: ligger i lesiden, løsner i steg 3 og fraktes videre langs sålen
  const plukkX = lerp(519, 560, plukket) + (fase > 3 ? Math.min(200, clamp(p - 3) * 200) : 0);
  const plukkY = bunn(plukkX) - (plukket > 0.02 ? 5.5 : 4);
  // blokken fra fjellsiden: løsner og faller ned på breen i steg 2
  const frostX = lerp(318, 330, frostBlokk) + (p > 2 ? clamp(p - 2) * 160 : 0);
  const frostY = p > 2 ? overflate(frostX) - 6 : lerp(98, overflate(330) - 6, frostBlokk * frostBlokk);

  /* ----- etiketter ----- */
  const fs = small ? 15 : 13.5;
  const labels: Lab[] = [];
  const lab = (l: Lab, n: number[] | null) => {
    if (n && !n.includes(fase)) return;
    // smal layout: etiketter som peker utenfor det panorerte utsnittet, skjules
    const ute = small && l.at && l.at[1] < 400 * S.s && (l.at[0] < 4 || l.at[0] > 516);
    labels.push({ size: fs, ...l, narrowHide: ute || l.narrowHide });
  };
  const [ox, oy] = A(560, 120);
  lab({ text: "Isen beveger seg", x: 548, y: 132, at: A(600, 188), color: F.bevegelse, anchor: "middle", badge: [ox, oy] }, [1]);
  lab({ text: "Bresålen glir", x: 640, y: 330, at: A(640, bunn(640) - 3), color: F.bevegelse, anchor: "start" }, [1]);
  lab({ text: "Frostsprengning i fjellsiden", x: 214, y: 30, at: A(298, 100), color: F.frost, anchor: "middle" }, [2]);
  lab({ text: "Blokk faller ned på breen", x: 402, y: 96, at: A(frostX, frostY), color: F.frost, anchor: "start" }, [2]);
  lab({ text: "Plukking på lesiden", x: 560, y: 336, at: A(519, 244), color: F.plukk, anchor: "start" }, [3]);
  lab({ text: "Støtside", x: 380, y: 290, at: A(440, 234), color: F.lys, anchor: "middle" }, [3, 4]);
  lab({ text: "Leside", x: 520, y: 300, at: A(522, 246), color: F.lys, anchor: "start" }, [4]);
  lab({ text: "Skuring og skuringsstriper", x: 300, y: 330, at: A(452, 230), color: F.skur, anchor: "middle" }, [4]);
  lab({ text: "På breen", x: 420, y: 112, at: A(470, overflate(470) - 2), color: F.transport, anchor: "end" }, [5]);
  lab({ text: "I breen", x: 300, y: 160, at: A(360, dybde(360, 0.5)), color: F.transport, anchor: "end" }, [5]);
  lab({ text: "Under breen", x: 300, y: 300, at: A(330, bunn(330) - 3), color: F.transport, anchor: "end" }, [5]);
  lab({ text: "Endemorene", x: 880, y: 262, at: A(808, bunn(808) - moreneH * 0.7), color: F.morene, anchor: "middle" }, [6, 7]);
  lab({ text: "Bunnmorene", x: 650, y: 344, at: A(680, bunn(680) - 3), color: F.morene, anchor: "middle" }, [6, 7]);
  lab({ text: "Rundsva", x: 450, y: 196, at: A(470, 222), color: F.lys, anchor: "middle" }, [7]);
  lab({ text: "Ur", x: 250, y: 172, at: A(300, bunn(300) - 8), color: F.lys, anchor: "middle" }, [7]);
  // sett ovenfra
  lab({ text: "Sidemorene", x: 300, y: 414 + 44, at: B(300, 75), color: F.morene, anchor: "middle" }, [5, 6, 7]);
  lab({ text: "Midtmorene", x: 380, y: 414 + 100, at: B(380, 110), color: F.morene, anchor: "middle" }, [5, 6, 7]);
  lab({ text: "Endemorene", x: 560, y: 414 + 64, at: B(526, 100), color: F.morene, anchor: "middle" }, [6, 7]);
  lab({ text: "To breer løper sammen", x: 110, y: 414 + 114, at: B(214, 110), color: F.lys, anchor: "middle" }, [5, 6]);

  const keys: Key[] = [
    { text: "Is", color: F.is, kind: "fill", skjult: fase === 7 },
    { text: "Berg", color: F.bergLys, kind: "fill" },
    { text: "Morenemateriale (usortert)", color: F.morene, kind: "fill" },
    { text: "Isens bevegelse", color: F.bevegelse, kind: "line" },
  ];

  /* ----- linsen ----- */
  const R = L.linse.r;
  const { cx, cy } = L.linse;
  const lq = beveger ? ((tSek / 4) % 1 + 1) % 1 : 0.8; // syklus i linsen
  const linseFra = !small && LINSE_FRA[fase - 1] ? (LINSE_FRA[fase - 1] as P) : null;
  const linseTittel = ["Isen siger", "Vann fryser i sprekken", "Isen river løs blokker", "Stein i sålen sliper", "Usortert: leire, sand, stein, blokker", "Morene: alle kornstørrelser", "Skuringsstriper"][fase - 1];

  const status = BRE_ARBEID_STATUS[fase - 1];
  const ids = { himmel: "brea-himmel", is: "brea-is", berg: "brea-berg", dal: "brea-dal", tekstur: "brea-tekstur", pil: "brea-pil", skygge: "brea-skygge", lys: "brea-lys" };

  return (
    <div
      ref={wrapRef}
      className="[&_ol]:min-h-[9.5rem] [&_ol]:content-start [&_p[aria-live]]:min-h-[6.75rem] min-[370px]:[&_p[aria-live]]:min-h-[5.25rem] lg:[&_p[aria-live]]:min-h-[3.75rem]"
    >
      <IsbreFigur
        svgRef={ref}
        title={BRE_ARBEID_TEKST.title}
        heading={heading}
        caption={caption ?? BRE_ARBEID_TEKST.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={
          <div className={small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"}>
            <TidslinjeKontroller tl={tl} faser={BRE_ARBEID_FASER} />
          </div>
        }
        status={status}
        keys={keys}
        labels={labels}
        notes={["Konstruert skisse, ikke i målestokk", "Høyden er overdrevet", "Ikke et bestemt sted"]}
        viewBox={`0 0 ${vbW} ${vbH}`}
      >
        {() => (
          <g data-figur="bre-arbeid" data-step={fase} data-p={p.toFixed(2)}>
            <defs>
              <linearGradient id={ids.himmel} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={F.himmelTopp} />
                <stop offset="1" stopColor={F.himmelBunn} />
              </linearGradient>
              <linearGradient id={ids.is} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={F.isKant} />
                <stop offset="0.45" stopColor={F.is} />
                <stop offset="1" stopColor={F.isDyp} />
              </linearGradient>
              <linearGradient id={ids.berg} x1="0" y1="0" x2="0.15" y2="1">
                <stop offset="0" stopColor="#857a68" />
                <stop offset="0.35" stopColor="#6b6152" />
                <stop offset="1" stopColor="#3b342c" />
              </linearGradient>
              {/* fjellsiden bak breen: kjøligere og lysere (dis), så den skiller seg fra berget i snittet */}
              <linearGradient id={ids.dal} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5b6870" />
                <stop offset="0.55" stopColor="#465259" />
                <stop offset="1" stopColor="#36414a" />
              </linearGradient>
              <linearGradient id={ids.lys} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <pattern id={ids.tekstur} width="34" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
                <path d="M0 6 L34 4 M0 15 L34 17" stroke="#000" strokeOpacity="0.16" strokeWidth="1" />
                <path d="M8 0 L11 6 M22 6 L19 15 M5 15 L8 22 M28 17 L30 22" stroke="#fff" strokeOpacity="0.07" strokeWidth="1" />
              </pattern>
              <marker id={ids.pil} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill={F.bevegelse} />
              </marker>
            </defs>

            {/* ===== lengdesnitt ===== */}
            <clipPath id="brea-snittklipp">
              <rect x={S.x} y={S.y} width={small ? 520 : 960} height={400 * S.s} rx="10" />
            </clipPath>
            <g clipPath="url(#brea-snittklipp)">
            <g transform={`translate(${S.x - pan * S.s} ${S.y}) scale(${S.s})`}>
              <rect x="0" y="0" width="960" height="400" fill={`url(#${ids.himmel})`} />
              {/* fjerne fjell */}
              <path
                data-nocheck=""
                d="M300 60 L360 22 L400 40 L455 8 L510 44 L560 30 L620 64 L690 34 L760 70 L830 44 L900 80 L960 58 L960 160 L300 160 Z"
                fill={F.fjern}
              />
              <path data-nocheck="" d="M443 16 L455 8 L468 18 L460 20 Z M680 40 L690 34 L702 42 L692 43 Z M822 50 L830 44 L840 52 Z" fill={F.fjernSno} opacity="0.55" />
              {/* fjellsiden på andre siden av dalen */}
              <polygon points={poly(stier.dalside)} fill={`url(#${ids.dal})`} />
              <polygon points={poly(stier.dalside)} fill={`url(#${ids.tekstur})`} />
              <path data-nocheck="" d={linje(DALSIDE)} fill="none" stroke="#8b867b" strokeWidth="1.6" opacity="0.7" />
              {/* renner og sprekker i fjellsiden */}
              <g data-nocheck="" stroke="#1f1e1c" strokeWidth="1.1" opacity="0.6" fill="none">
                {fam.sprekk.map((s, i) => {
                  const x = 40 + s.x * 880;
                  const y0 = yVed(DALSIDE, x) + 4;
                  const y1 = Math.min(overflate(x) - 2, y0 + s.r * 1.6);
                  if (y1 <= y0 + 3) return null;
                  return <path key={i} d={`M${x.toFixed(1)} ${y0.toFixed(1)} L${(x + (s.v - 0.5) * 6).toFixed(1)} ${((y0 + y1) / 2).toFixed(1)} L${(x + (s.v - 0.5) * 3).toFixed(1)} ${y1.toFixed(1)}`} />;
                })}
              </g>
              {/* fjellveggen innerst i dalen */}
              <polygon points={poly(BAKVEGG)} fill="#6b675f" stroke="#8b867b" strokeWidth="1" />
              {/* snøflekker høyt på fjellsiden */}
              <path data-nocheck="" d="M36 16 L58 20 L50 26 L30 22 Z M150 42 L176 48 L160 52 Z M236 62 L262 70 L246 72 Z" fill="#dfe9ee" opacity="0.8" />
              {/* ur under fjellsiden når isen er borte */}
              {smelt > 0.02 ? (
                <g opacity={smelt}>
                  <path d={`M236 ${bunn(236).toFixed(1)} L300 ${(bunn(300) - 22).toFixed(1)} L366 ${bunn(366).toFixed(1)} Z`} fill="#6e685f" />
                  {fam.ur.map((s, i) => {
                    const x = 246 + s.x * 110;
                    const top = bunn(x) - 22 * (1 - Math.abs(x - 300) / 66);
                    const y = lerp(top, bunn(x), s.y * 0.8) - 1;
                    return <path key={i} d={steinSti(x, y, s.r, s.v)} fill={STEINFARGER[s.k]} stroke="#2e2c29" strokeWidth="0.6" />;
                  })}
                </g>
              ) : null}

              {/* berggrunnen under breen */}
              <polygon points={poly(stier.bunnPoly)} fill={`url(#${ids.berg})`} />
              <polygon points={poly(stier.bunnPoly)} fill={`url(#${ids.tekstur})`} />
              {/* lagdeling i berget */}
              <g data-nocheck="" stroke="#2f2d2a" strokeWidth="1" opacity="0.45" fill="none">
                {[22, 44, 70].map((d) => (
                  <path key={d} d={linje(BUNN.map(([x, y]) => [x, y + d + Math.sin(x / 70) * 4] as P))} />
                ))}
              </g>
              {/* sprekker i knausen (lesiden) */}
              <g data-nocheck="" stroke="#26241f" strokeWidth="1.2" fill="none" opacity="0.8">
                <path d="M503 221 L500 236 L506 250" />
                <path d="M514 233 L510 252" />
                <path d="M526 247 L522 262" />
              </g>
              {/* bergoverflaten: blank og slipt på støtsiden, ru på lesiden */}
              <path d={linje(BUNN)} fill="none" stroke="#d6ccb6" strokeWidth="2.4" />
              <path d={linje(BUNN.filter(([x]) => x >= 380 && x <= 500))} fill="none" stroke="#e4ddcc" strokeWidth={2 + 1.2 * skurt} opacity={0.4 + 0.5 * skurt} />
              {/* skuringsstriper */}
              <g data-nocheck="" stroke={F.skur} strokeWidth="1" opacity={0.25 + 0.75 * Math.max(fokus(4), fokus(7)) * skurt}>
                {stier.striper.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              {/* hullet etter blokken som er plukket */}
              <path d="M516 241 L523 243 L527 253 L519 252 Z" fill="#2e2c28" opacity={0.3 + 0.7 * plukket} />

              {/* bunnmorene under breen */}
              <g opacity={bunnOp}>
                <path
                  d={`${linje(BUNN.filter(([x]) => x >= 540 && x <= 790).map(([x, y]) => [x, y - lerp(2, 7, smooth(clamp((x - 540) / 120)))] as P))} L790 ${bunn(790).toFixed(1)} L540 ${bunn(540).toFixed(1)} Z`}
                  fill={F.morene}
                />
                {fam.bunn.map((s, i) => {
                  const x = 544 + s.x * 240;
                  const y = bunn(x) - 1 - s.y * lerp(1, 5, smooth(clamp((x - 540) / 120)));
                  return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={s.r * 0.8} fill={STEINFARGER[s.k]} />;
                })}
              </g>

              {/* endemorenen foran fronten */}
              <g>
                <polygon points={poly([...endemorene(moreneH), [860, bunn(860)], [768, bunn(768)]])} fill={F.morene} stroke={F.moreneMork} strokeWidth="1" />
                {fam.morene.map((s, i) => {
                  const x = 772 + s.x * 84;
                  const top = yVed(endemorene(moreneH), x);
                  const y = lerp(top + s.r, bunn(x) - 1, s.y);
                  if (y < top + s.r * 0.6) return null;
                  return <path key={i} d={steinSti(x, y, Math.min(s.r, (bunn(x) - top) / 2 + 0.8), s.v)} fill={STEINFARGER[s.k]} stroke="#3a342c" strokeWidth="0.5" />;
                })}
              </g>

              {/* breen */}
              <g opacity={isOp}>
                <polygon points={poly(stier.isPoly)} fill={`url(#${ids.is})`} stroke={F.isKant} strokeWidth="1.4" />
                <polygon points={poly(stier.isPoly)} fill={`url(#${ids.lys})`} />
                {/* lagdeling (flytbånd) */}
                <g data-nocheck="" fill="none" stroke="#7fa9c6" strokeWidth="1" opacity="0.55">
                  {stier.baand.map((b, i) => (
                    <path key={i} d={linje(b)} strokeDasharray={i % 2 ? "26 8" : "40 10"} strokeDashoffset={beveger ? -(tSek * (14 - i * 2.4)) % 48 : 0} />
                  ))}
                </g>
                {/* bresprekker */}
                <g data-nocheck="" fill="#4f7d9b" stroke="#3b6684" strokeWidth="0.8">
                  {stier.sprekker.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>
                {/* steiner i, på og under breen */}
                <g>
                  {fam.i.map((s, i) => {
                    const q = posI(s, i);
                    return <path key={`i${i}`} d={steinSti(q.x, q.y, s.r, s.v)} fill={STEINFARGER[s.k]} stroke="#3a342c" strokeWidth="0.5" opacity={0.85 * q.op} />;
                  })}
                  {fam.under.map((s, i) => {
                    const q = posUnder(s, i);
                    return <path key={`u${i}`} d={steinSti(q.x, q.y, s.r, s.v)} fill={STEINFARGER[s.k]} stroke="#3a342c" strokeWidth="0.5" opacity={q.op} />;
                  })}
                  {fam.paa.map((s, i) => {
                    const q = posPaa(s, i);
                    return <path key={`p${i}`} d={steinSti(q.x, q.y, s.r, s.v)} fill={STEINFARGER[s.k]} stroke="#2a2621" strokeWidth="0.6" opacity={q.op} />;
                  })}
                </g>
                {/* fartspiler: raskest øverst, saktere mot sålen */}
                <g data-nocheck="" stroke={F.bevegelse} strokeWidth={fase === 1 ? 2.4 : 1.6} fill="none" opacity={fase === 1 ? 1 : 0.55}>
                  {[
                    [0.18, 46],
                    [0.5, 34],
                    [0.84, 22],
                  ].map(([f, len], i) => {
                    const x0 = 586;
                    const x1 = x0 + len;
                    return <path key={i} d={`M${x0} ${dybde(x0, f).toFixed(1)} L${x1} ${dybde(x1, f).toFixed(1)}`} markerEnd={`url(#${ids.pil})`} />;
                  })}
                </g>
              </g>

              {/* blokken fra fjellsiden */}
              <path d={steinSti(frostX, frostY, 7.5, 0.3)} fill="#9c9486" stroke="#2a2621" strokeWidth="0.8" opacity={p > 5 ? 0 : 1} />
              {/* frostsprengt sprekk der blokken satt */}
              <path data-nocheck="" d="M308 95 L316 89 L327 100 L318 108 Z" fill="#1c1d1e" opacity={frostBlokk} />
              {fase === 2 ? <path data-nocheck="" d="M312 94 L320 103" stroke={F.frost} strokeWidth="2.2" /> : null}
              {/* den plukkede blokken */}
              <path d={steinSti(plukkX, plukkY, 4.4, 0.7)} fill="#8d867a" stroke="#2a2621" strokeWidth="0.8" opacity={p > 5 ? 0 : 1} />

            </g>
            </g>
            {/* overskrift for snittet */}
            <text x={S.x + 14} y={S.y + 400 * S.s - 12} fontSize={small ? 15 : 13} fontWeight={700} fill={F.tekst} opacity="0.9" data-nocheck="">
              Lengdesnitt gjennom breen
            </text>

            {/* ===== sett ovenfra ===== */}
            <g transform={`translate(${PL.x} ${PL.y}) scale(${PL.s})`}>
              <rect x="0" y="0" width="600" height="220" rx="10" fill="#3c4a3a" />
              {/* dalsidene: berg med skygge mot kanten */}
              <rect x="0" y="0" width="600" height="220" rx="10" fill={`url(#${ids.tekstur})`} />
              <path d={`${linje(forskyv(PLAN_YTRE_N, -16))} L600 40 L600 0 L0 0 Z`} fill="#4d4b46" />
              <path d={`${linje(forskyv(PLAN_YTRE_S, 16))} L600 180 L600 220 L0 220 Z`} fill="#4d4b46" />
              {/* dalbunnen */}
              <path d={`${linje(forskyv(PLAN_YTRE_N, -16))} L600 40 L600 180 ${linje(forskyv([...PLAN_YTRE_S].reverse(), 16)).replace("M", "L")} Z`} fill={F.dalbunn} />
              {/* bunnmorene på dalbunnen når isen er borte */}
              <g opacity={smelt}>
                {fam.bunn.map((s, i) => (
                  <circle key={i} cx={(30 + s.x * 470).toFixed(1)} cy={lerp(40, 180, s.y).toFixed(1)} r={s.r * 0.9} fill={STEINFARGER[s.k]} opacity="0.55" />
                ))}
              </g>
              {/* breen */}
              <g opacity={isOp}>
                <polygon points={poly(breOmriss())} fill={F.is} stroke={F.isKant} strokeWidth="1.5" />
                <polygon points={poly(breOmriss())} fill={`url(#${ids.lys})`} />
                {/* flytlinjer */}
                <g data-nocheck="" fill="none" stroke="#86aecb" strokeWidth="1" opacity="0.7">
                  {[-26, -12, 12, 26].map((d, i) => (
                    <path key={i} d={linje([[10, 110 + d * 2.6], [150, 110 + d * 1.7], [240, 110 + d * 1.1], [470, 110 + d * 0.7]])} strokeDasharray="22 10" strokeDashoffset={beveger ? -(tSek * 12) % 32 : 0} />
                  ))}
                </g>
              </g>
              {/* fjellryggen mellom de to breene */}
              <polygon points={poly(RYGG_PLAN)} fill="#56534c" stroke="#7d786d" strokeWidth="1" />
              {/* sidemorener og midtmorene: på isen bånd som fraktes, etter isen rygger */}
              <g fill="none" strokeLinecap="round">
                {[forskyv(PLAN_YTRE_N, 5), forskyv(PLAN_YTRE_S, -5), PLAN_MIDT].map((b, i) => (
                  <g key={i}>
                    <path d={linje(b)} stroke={F.moreneMork} strokeWidth={lerp(6, 9, smelt)} opacity={0.9} />
                    <path
                      d={linje(b)}
                      stroke={F.morene}
                      strokeWidth={lerp(3.5, 5, smelt)}
                      strokeDasharray={smelt > 0.5 ? undefined : "5 4"}
                      strokeDashoffset={beveger ? -(tSek * 12) % 9 : 0}
                    />
                  </g>
                ))}
                {/* de indre sidemorenene som løper sammen */}
                {[forskyv(PLAN_INDRE_N, -4), forskyv(PLAN_INDRE_S, 4)].map((b, i) => (
                  <path key={`r${i}`} d={linje(b)} stroke={F.morene} strokeWidth="3.5" strokeDasharray="5 4" strokeDashoffset={beveger ? -(tSek * 12) % 9 : 0} opacity={isOp} />
                ))}
                {/* endemorenen */}
                <path d={linje(ENDE_PLAN)} stroke={F.moreneMork} strokeWidth={lerp(4, 11, vekst)} />
                <path d={linje(ENDE_PLAN)} stroke={F.morene} strokeWidth={lerp(2, 7, vekst)} />
              </g>
              {/* fronten */}
              <path d={linje(FRONT_PLAN)} fill="none" stroke={F.isKant} strokeWidth="1.5" opacity={isOp} />
              {/* retningspil */}
              <path data-nocheck="" d="M300 196 L380 196" stroke={F.bevegelse} strokeWidth="2.2" markerEnd={`url(#${ids.pil})`} opacity={0.4 + 0.6 * isOp} />
              <text x="296" y="201" fontSize="12.5" textAnchor="end" fill={F.bevegelse} data-nocheck="" opacity={0.4 + 0.6 * isOp}>
                {smelt > 0.5 ? "isen gikk denne veien" : "isen beveger seg"}
              </text>
              <text x="590" y="212" fontSize="13" fontWeight={700} fill={F.tekst} textAnchor="end" opacity="0.9" data-nocheck="">
                Sett ovenfra
              </text>
            </g>

            {/* ===== linsen ===== */}
            <Zoomlinse cx={cx} cy={cy} r={R} fra={linseFra ? [linseFra[0], linseFra[1], 10, 10] : undefined} bakgrunn="#24384a">
              <Linse fase={fase} cx={cx} cy={cy} R={R} q={lq} lokal={tl.lokal} beveger={beveger} sek={tSek} />
            </Zoomlinse>
            <text x={cx} y={cy - R - 8} fontSize={small ? 15 : 13} fontWeight={700} textAnchor="middle" fill={F.tekst} data-nocheck="">
              {linseTittel}
            </text>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* ---------- innholdet i linsen ---------- */

function Linse({ fase, cx, cy, R, q, beveger, sek }: { fase: number; cx: number; cy: number; R: number; q: number; lokal: number; beveger: boolean; sek: number }) {
  const x = (u: number) => cx + u * R;
  const y = (v: number) => cy + v * R;
  const s = R / 100;
  const fam = FAMILIER();
  const pil = (x1: number, y1: number, x2: number, color = F.bevegelse) => (
    <g data-nocheck="">
      <path d={`M${x(x1)} ${y(y1)} L${x(x2)} ${y(y1)}`} stroke={color} strokeWidth={2.2 * s} />
      <path d={`M${x(x2)} ${y(y1) - 5 * s} L${x(x2) + 8 * s} ${y(y1)} L${x(x2)} ${y(y1) + 5 * s} Z`} fill={color} />
    </g>
  );
  const etikett = (tekst: string, u: number, v: number, color = F.tekst, anchor: "start" | "middle" | "end" = "middle") => (
    <text x={x(u)} y={y(v)} fontSize={11.5 * Math.max(1, s)} fill={color} textAnchor={anchor} paintOrder="stroke" stroke="#14222d" strokeWidth="3" data-nocheck="">
      {tekst}
    </text>
  );

  if (fase === 1) {
    // lag i isen som forskyves: raskest øverst (deformasjon), litt gliding ved sålen
    const lag = [-0.8, -0.5, -0.2, 0.1, 0.4];
    return (
      <g data-nocheck="">
        <rect x={x(-1)} y={y(-1)} width={2 * R} height={1.6 * R} fill={F.is} />
        {lag.map((v, i) => {
          const fart = 1 - i * 0.17;
          const off = beveger ? ((sek * 16 * fart) % 40) : 0;
          return (
            <g key={i}>
              <line x1={x(-1)} x2={x(1)} y1={y(v)} y2={y(v)} stroke="#8fb5cf" strokeWidth={1.2 * s} />
              {[-1.2, -0.8, -0.4, 0, 0.4, 0.8].map((u, j) => (
                <circle key={j} cx={x(u) + off * s} cy={y(v + 0.15)} r={2.2 * s} fill="#6e9cbc" />
              ))}
            </g>
          );
        })}
        <rect x={x(-1)} y={y(0.6)} width={2 * R} height={0.5 * R} fill={F.berg} />
        <line x1={x(-1)} x2={x(1)} y1={y(0.6)} y2={y(0.6)} stroke="#b7b1a3" strokeWidth={2 * s} />
        {[[-0.82, 0.6], [-0.48, 0.46], [-0.14, 0.32], [0.2, 0.2]].map(([v, len], i) => pil(-0.1 - len / 2, v + 0.15, -0.1 + len / 2 + 0.05 * (1 - i)))}
        {etikett("raskest øverst", 0, -0.84, F.bevegelse)}
        {etikett("glir mot berget", 0, 0.82, F.bevegelse)}
      </g>
    );
  }
  if (fase === 2) {
    // vann i sprekken → fryser og utvider → blokken løsner
    const st = beveger ? q : 0.74;
    const frosset = st > 0.3;
    const aapning = st < 0.3 ? 0 : clamp((st - 0.3) / 0.35) * 0.08;
    const fall = clamp((st - 0.7) / 0.3);
    return (
      <g data-nocheck="">
        <rect x={x(-1)} y={y(-1)} width={2 * R} height={2 * R} fill="#24384a" />
        {/* fjellveggen */}
        <path d={`M${x(-1)} ${y(-1)} L${x(0.05)} ${y(-1)} L${x(0.1)} ${y(1)} L${x(-1)} ${y(1)} Z`} fill="#5f5c56" />
        <path d={`M${x(-1)} ${y(-1)} L${x(0.05)} ${y(-1)} L${x(0.1)} ${y(1)} L${x(-1)} ${y(1)} Z`} fill="url(#brea-tekstur)" />
        {/* blokken ytterst */}
        <g transform={`translate(${(aapning * R + fall * 0.35 * R).toFixed(1)} ${(fall * fall * 1.1 * R).toFixed(1)}) rotate(${(fall * 28).toFixed(1)} ${x(0.1)} ${y(0)})`}>
          <path d={`M${x(-0.28)} ${y(-0.42)} L${x(0.07)} ${y(-0.42)} L${x(0.09)} ${y(0.3)} L${x(-0.22)} ${y(0.3)} Z`} fill="#77736a" stroke="#2a2621" strokeWidth={s} />
        </g>
        {/* sprekken med vann eller is */}
        <path
          d={`M${x(-0.29)} ${y(-0.44)} L${x(-0.29 + aapning)} ${y(-0.44)} L${x(-0.23 + aapning * 0.5)} ${y(0.3)} L${x(-0.24)} ${y(0.3)} Z`}
          fill={frosset ? "#e9f6ff" : "#4aa3df"}
          stroke={frosset ? "#9fe0ff" : "#2a7fbf"}
          strokeWidth={1.5 * s}
        />
        {etikett(frosset ? "isen tar større plass" : "vann i sprekken", 0, -0.76, F.frost)}
        {etikett(st > 0.7 ? "blokken løsner" : frosset ? "sprekken utvides" : "frost og tining veksler", 0, 0.8, F.lys)}
      </g>
    );
  }
  if (fase === 3) {
    // isen fryser fast i sprekker på lesiden og trekker blokken med seg
    const st = beveger ? q : 0.8;
    const dx = clamp((st - 0.35) / 0.65) * 0.55;
    return (
      <g data-nocheck="">
        <rect x={x(-1)} y={y(-1)} width={2 * R} height={2 * R} fill={F.is} />
        {/* knausen sett fra siden: toppen til venstre, lesiden faller mot høyre */}
        <path d={`M${x(-1)} ${y(-0.2)} L${x(-0.3)} ${y(-0.24)} L${x(-0.2)} ${y(0.05)} L${x(0.05)} ${y(0.1)} L${x(0.12)} ${y(0.42)} L${x(1)} ${y(0.5)} L${x(1)} ${y(1)} L${x(-1)} ${y(1)} Z`} fill={F.berg} stroke="#b7b1a3" strokeWidth={1.5 * s} />
        <path d={`M${x(-1)} ${y(-0.2)} L${x(-0.3)} ${y(-0.24)} L${x(-0.2)} ${y(0.05)} L${x(0.05)} ${y(0.1)} L${x(0.12)} ${y(0.42)} L${x(1)} ${y(0.5)} L${x(1)} ${y(1)} L${x(-1)} ${y(1)} Z`} fill="url(#brea-tekstur)" />
        {/* hullet etter blokken */}
        <path d={`M${x(0.05)} ${y(0.1)} L${x(0.32)} ${y(0.12)} L${x(0.34)} ${y(0.44)} L${x(0.12)} ${y(0.42)} Z`} fill="#2e2c28" opacity={dx > 0.02 ? 1 : 0} />
        {/* blokken, frosset fast i isen */}
        <g transform={`translate(${(dx * R).toFixed(1)} ${(-dx * 0.08 * R).toFixed(1)})`}>
          <path d={`M${x(0.05)} ${y(0.1)} L${x(0.32)} ${y(0.12)} L${x(0.34)} ${y(0.44)} L${x(0.12)} ${y(0.42)} Z`} fill="#8d867a" stroke="#2a2621" strokeWidth={s} />
          <path d={`M${x(0.05)} ${y(0.1)} L${x(0.08)} ${y(0.4)}`} stroke="#ffffff" strokeWidth={2.4 * s} />
        </g>
        {pil(-0.7, -0.6, 0.4)}
        {etikett("isen fryser fast", -0.35, 0.35, F.plukk)}
        {etikett("leside", 0.6, 0.36, F.lys)}
      </g>
    );
  }
  if (fase === 4) {
    // stein i bresålen sliper berget: riper bak steinen
    const off = beveger ? ((sek * 0.18) % 1) : 0.55;
    const stx = -0.9 + off * 1.8;
    return (
      <g data-nocheck="">
        <rect x={x(-1)} y={y(-1)} width={2 * R} height={1.2 * R} fill={F.is} />
        <rect x={x(-1)} y={y(0.2)} width={2 * R} height={0.8 * R} fill="#6a675f" />
        <line x1={x(-1)} x2={x(1)} y1={y(0.2)} y2={y(0.2)} stroke="#e4ddcc" strokeWidth={2.5 * s} />
        {/* skuringsstriper sett i snitt: små hakk bak steinen */}
        {[0.24, 0.3, 0.36].map((v, i) => (
          <line key={i} x1={x(-1)} x2={x(Math.max(-1, stx - 0.05))} y1={y(v)} y2={y(v)} stroke={F.skur} strokeWidth={1.2 * s} opacity="0.85" />
        ))}
        {/* steinene i sålen */}
        {fam.under.slice(0, 5).map((st, i) => {
          const sx = ((stx + 1 + i * 0.45) % 2) - 1;
          return <path key={i} d={steinSti(x(sx), y(0.2) - (6 + st.r * 2) * s, (6 + st.r * 2) * s, st.v)} fill={STEINFARGER[st.k]} stroke="#2a2621" strokeWidth={s} />;
        })}
        {/* finmalt berg (bremel) */}
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={x(-0.95 + i * 0.14)} cy={y(0.16)} r={1.3 * s} fill="#d8d2c4" opacity="0.8" />
        ))}
        {pil(-0.6, -0.55, 0.4)}
        {etikett("stein presses mot berget", 0, -0.2, F.skur)}
        {etikett("riper i isens retning", 0, 0.7, F.skur)}
      </g>
    );
  }
  if (fase === 5) {
    // usortert: alle kornstørrelser om hverandre i isen
    return (
      <g data-nocheck="">
        <rect x={x(-1)} y={y(-1)} width={2 * R} height={2 * R} fill={F.is} />
        {fam.morene.slice(0, 46).map((st, i) => (
          <path key={i} d={steinSti(x(st.x * 2 - 1), y(st.y * 1.6 - 0.8), (st.r * 2.6 + 1) * s, st.v)} fill={STEINFARGER[st.k]} stroke="#2a2621" strokeWidth={0.6 * s} />
        ))}
      </g>
    );
  }
  if (fase === 6) {
    // morenematerialet ved fronten: usortert, ikke lagdelt
    return (
      <g data-nocheck="">
        <rect x={x(-1)} y={y(-1)} width={2 * R} height={2 * R} fill="#24384a" />
        <path d={`M${x(-1)} ${y(0.4)} Q ${x(-0.2)} ${y(-0.6)} ${x(1)} ${y(0.3)} L${x(1)} ${y(1)} L${x(-1)} ${y(1)} Z`} fill={F.morene} />
        {fam.morene.map((st, i) => {
          const u = st.x * 2 - 1;
          const top = lerp(0.4, 0.3, (u + 1) / 2) - 0.75 * (1 - Math.pow((u + 0.15) / 1.0, 2));
          const v = lerp(top + 0.08, 0.95, st.y);
          return <path key={i} d={steinSti(x(u), y(v), (st.r * 2.2 + 0.8) * s, st.v)} fill={STEINFARGER[st.k]} stroke="#2a2621" strokeWidth={0.6 * s} />;
        })}
      </g>
    );
  }
  // fase 7: skuringsstriper sett ovenfra på et slipt svaberg
  return (
    <g data-nocheck="">
      <rect x={x(-1)} y={y(-1)} width={2 * R} height={2 * R} fill="#77736a" />
      <rect x={x(-1)} y={y(-1)} width={2 * R} height={2 * R} fill="url(#brea-tekstur)" />
      <ellipse cx={x(-0.1)} cy={y(0)} rx={0.9 * R} ry={0.6 * R} fill="#8f897d" opacity="0.6" />
      {fam.sprekk.slice(0, 18).map((st, i) => {
        const v = -0.7 + st.y * 1.4;
        const u0 = -0.9 + st.x * 1.2;
        return <line key={i} x1={x(u0)} x2={x(u0 + 0.3 + st.v * 0.4)} y1={y(v)} y2={y(v + 0.03)} stroke="#e8e2d2" strokeWidth={1.1 * s} opacity="0.85" />;
      })}
      {pil(-0.5, 0.72, 0.4)}
      {etikett("isens retning", -0.05, 0.62, F.bevegelse)}
    </g>
  );
}
