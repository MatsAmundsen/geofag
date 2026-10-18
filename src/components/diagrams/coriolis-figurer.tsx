/**
 * Figurene i kapitlet Corioliseffekten (Geofag 2), bygget på prosess-kit (felles avspilling, tidslinje og steg).
 * Alt i figurene står i coriolis.md eller i fagsjekken til Fagredaktør Geo (fagsjekk-geo.md, 18.10.2026):
 * Store norske leksikon (u.å.-a til -e), NOAA (u.å.-a til -d), NOAA AOML (u.å.) og Stewart (2008).
 * Ingen tall, stedsnavn, formler eller hPa-verdier uten dekning i teksten.
 *
 * De gamle komponentene i coriolis.tsx står urørt (CoriolisDiagram og CoriolisLatitudeDiagram brukes i eksamen).
 * All tekst i figurene er etiketter (Lab), så den er minst 12 px også på smal skjerm (nummermerker og liste).
 * Etikettene regnes ut én gang per steg, og ingen tegning bruker dangerouslySetInnerHTML.
 */
import { type ReactNode } from "react";
import { IsbreFigur, type Key, type Lab, type Markers } from "./isbre-figur";
import { clamp, lerp, smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { TidslinjeKontroller } from "./prosess-figur";
import { tidslinjeVerdi, useTidslinje } from "./prosess-kit";
import {
  AVBOYNING_TEKST,
  EKMANSPIRAL_TEKST,
  FART_OSTOVER_TEKST,
  GEOSTROFISK_TEKST,
  HAVVIRVLER_TEKST,
  KARUSELL_TEKST,
  OPPVELLING_TEKST,
  SKALA_TEKST_CORIOLIS,
  SYKLON_TEKST_CORIOLIS,
  TILPASNING_TEKST,
  TRYKK_ROTASJON_TEKST,
  ZONAL_VERTIKAL_TEKST,
} from "./coriolis-tekst";

/* ---------- felles ---------- */

const F = {
  bg: "#0d1820",
  panel: "#122330",
  linje: "#4b6275",
  tekst: "#e8eef2",
  dempet: "#a9b8c4",
  luft: "#e8a46a",
  ball: "#fde68a",
  teal: "#5eead4",
  kald: "#7cb8e8",
  lav: "#ff8b7a",
  hoy: "#7cc4ff",
  hav: "#173a4f",
  havLys: "#1f4f6b",
  land: "#55604f",
  landKant: "#8e9784",
  hoyre: "#86efac",
  venstre: "#f9a8d4",
  netto: "#fde047",
};

const r1 = (v: number) => Math.round(v * 10) / 10;
const R = Math.PI / 180;
type P = [number, number];
type Bilde = Record<string, number>;
const op = (v: number) => (v < 0.99 ? r1(clamp(v) * 100) / 100 : undefined);

type Tegn<S extends Bilde> = (s: S, k: { m: Markers; sek: number; fase: number }) => ReactNode;

type Def<S extends Bilde> = {
  id: string;
  tekst: { heading: string; title: string; caption: string };
  faser: string[];
  status: string[];
  /** Tilstand ved p = 0 … antall (bilder.length = faser.length + 1). */
  bilder: S[];
  etiketter: Lab[][];
  keys?: Key[];
  notes?: string[];
  viewBox: string;
  tegn: Tegn<S>;
};

type Pkt = [number, number] | undefined;
const blandP = (a: Pkt, b: Pkt, t: number): Pkt =>
  a && b ? [r1(lerp(a[0], b[0], t)), r1(lerp(a[1], b[1], t))] : t < 0.5 ? a : b;

/**
 * Etikettene følger det som faktisk tegnes: mellom to steg flyttes de med samme myke overgang som tegningen.
 * Etiketter som bare finnes i det ene steget, vises først mot slutten av overgangen (eller forsvinner tidlig).
 * Lagres per tiendedel av tidslinjen.
 */
function etiketterVed(etiketter: Lab[][], lager: Map<number, Lab[]>, p: number): Lab[] {
  const q = Math.round(p * 10);
  const hit = lager.get(q);
  if (hit) return hit;
  const pp = q / 10;
  const n = etiketter.length;
  const ved = (k: number) => etiketter[clamp(k - 1, 0, n - 1)];
  const k = Math.min(n - 1, Math.floor(clamp(pp, 0, n)));
  const t = smooth(clamp(pp, 0, n) - k);
  const A = ved(k);
  const B = ved(k + 1);
  const out: Lab[] = [];
  const brukt = new Set<number>();
  A.forEach((a) => {
    const j = B.findIndex((b, i) => !brukt.has(i) && b.text === a.text);
    if (j < 0) {
      if (t < 0.15) out.push(a);
      return;
    }
    brukt.add(j);
    const b = B[j];
    out.push({ ...b, x: r1(lerp(a.x, b.x, t)), y: r1(lerp(a.y, b.y, t)), at: blandP(a.at, b.at, t), badge: blandP(a.badge, b.badge, t) });
  });
  if (t > 0.85) B.forEach((b, i) => !brukt.has(i) && out.push(b));
  lager.set(q, out);
  return out;
}

/** Fast høyde på statusfeltet (lengste statustekst), så figuren ikke hopper mellom stegene. */
const STATUS_H = "block h-[7.5rem] min-[480px]:h-[5rem] min-[900px]:h-[3.75rem]";

const LAGER = new WeakMap<object, Map<number, Lab[]>>();
function lagerFor(def: object) {
  let l = LAGER.get(def);
  if (!l) LAGER.set(def, (l = new Map()));
  return l;
}

function StegFigur<S extends Bilde>({ def, heading, caption }: { def: Def<S>; heading?: string; caption?: ReactNode }) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall: def.faser.length, synlig: visible, faseMs: 3600, holdMs: 1800, element: ref });
  const s = tidslinjeVerdi(def.bilder, tl.p);
  const fase = tl.fase;
  const navn = heading ?? def.tekst.heading;
  return (
    <div className="[&_ol]:min-h-[5.5rem] [&_ol]:content-start min-[760px]:[&_ol]:min-h-0">
      <IsbreFigur
        svgRef={ref}
        title={def.tekst.title}
        heading={navn}
        caption={caption ?? def.tekst.caption}
        playing={tl.livePlaying}
        action={
          // fast bredde, så overskriften ikke brytes om når knappen veksler mellom «Pause» og «Start»
          <span className="grid">
            <span aria-hidden="true" className="invisible col-start-1 row-start-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
              <span className="size-1.5" />
              <span>⏸ Pause animasjon</span>
            </span>
            <span className="col-start-1 row-start-1 [&>button]:w-full [&>button]:justify-start">
              <PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={navn} />
            </span>
          </span>
        }
        toolbar={<TidslinjeKontroller tl={tl} faser={def.faser} />}
        status={<span className={STATUS_H}>{def.status[fase - 1]}</span>}
        keys={def.keys}
        labels={etiketterVed(def.etiketter, lagerFor(def), tl.p)}
        notes={def.notes}
        viewBox={def.viewBox}
      >
        {({ m }) => (
          <g data-figur={def.id} data-step={fase} data-p={tl.p.toFixed(2)}>
            {def.tegn(s, { m, sek: tl.reduced ? 0 : tl.sek, fase })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

function lagFigur<S extends Bilde>(def: Def<S>) {
  return function CoriolisFigur({ heading, caption }: { heading?: string; caption?: ReactNode }) {
    return <StegFigur def={def} heading={heading} caption={caption} />;
  };
}

/** Pilspiss som polygon i retningen fra `a` til `b`. */
function spiss(a: P, b: P, w: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const h = 7 + w * 2;
  const c: P = [b[0] - ux * h, b[1] - uy * h];
  return {
    hals: c,
    punkter: `${r1(b[0])},${r1(b[1])} ${r1(c[0] - uy * h * 0.55)},${r1(c[1] + ux * h * 0.55)} ${r1(c[0] + uy * h * 0.55)},${r1(c[1] - ux * h * 0.55)}`,
  };
}

/** Pil langs en punktliste (rett eller krum), med spiss i enden. */
function Bane({ pts, farge, w = 3, dash, opacity }: { pts: P[]; farge: string; w?: number; dash?: string; opacity?: number }) {
  if (pts.length < 2) return null;
  const n = pts.length;
  const sp = spiss(pts[n - 2], pts[n - 1], w);
  const linje = [...pts.slice(0, n - 1), sp.hals];
  return (
    <g aria-hidden="true" opacity={opacity !== undefined ? op(opacity) : undefined}>
      <path
        d={`M${linje.map((p) => `${r1(p[0])} ${r1(p[1])}`).join(" L")}`}
        fill="none"
        stroke={farge}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash}
      />
      <polygon points={sp.punkter} fill={farge} />
    </g>
  );
}

/** Strek uten spiss (referanselinjer, isobarer). */
function Strek({ pts, farge, w = 2, dash, opacity }: { pts: P[]; farge: string; w?: number; dash?: string; opacity?: number }) {
  return (
    <path
      d={`M${pts.map((p) => `${r1(p[0])} ${r1(p[1])}`).join(" L")}`}
      fill="none"
      stroke={farge}
      strokeWidth={w}
      strokeDasharray={dash}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity !== undefined ? op(opacity) : undefined}
    />
  );
}

/** Punkter langs en funksjon f(t), t i [fra, til]. */
function langs(f: (t: number) => P, fra = 0, til = 1, n = 24): P[] {
  const out: P[] = [];
  for (let i = 0; i <= n; i++) out.push(f(fra + ((til - fra) * i) / n));
  return out;
}

function Trykk({ x, y, kind, size = 30, opacity = 1 }: { x: number; y: number; kind: "L" | "H"; size?: number; opacity?: number }) {
  const col = kind === "L" ? F.lav : F.hoy;
  return (
    <g aria-hidden="true" opacity={op(opacity)}>
      <circle cx={r1(x)} cy={r1(y)} r={r1(size * 0.85)} fill="#0b1318" stroke={col} strokeWidth={2.5} />
      <text x={r1(x)} y={r1(y + size * 0.36)} textAnchor="middle" fontSize={size} fontWeight={800} fill={col}>
        {kind}
      </text>
    </g>
  );
}

/** ⊙: vinden blåser ut av arket, mot leseren. */
function UtAvArket({ x, y, r, sek, farge }: { x: number; y: number; r: number; sek: number; farge: string }) {
  return (
    <g aria-hidden="true">
      {[0, 1].map((k) => {
        const u = (sek * 0.5 + k * 0.5) % 1;
        return (
          <circle key={k} cx={x} cy={y} r={r1(r * (1.1 + u * 0.9))} fill="none" stroke={farge} strokeWidth={1.4} opacity={r1((1 - u) * 6) / 10} data-nocheck="" />
        );
      })}
      <circle cx={x} cy={y} r={r1(r)} fill="#0b1620" stroke={farge} strokeWidth={r1(Math.max(2, r * 0.16))} />
      <circle cx={x} cy={y} r={r1(Math.max(2.5, r * 0.32))} fill={farge} />
    </g>
  );
}

/** Prikk som går langs en punktliste med andel u (0–1). */
function langsPunkt(pts: P[], u: number): P {
  const n = pts.length - 1;
  const t = clamp(u) * n;
  const i = Math.min(n - 1, Math.floor(t));
  const f = t - i;
  return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)];
}

/** Matematisk vinkel (grader, mot klokken fra øst) til skjermpunkt. */
const polar = (c: P, r: number, a: number): P => [c[0] + r * Math.cos(a * R), c[1] - r * Math.sin(a * R)];

/* =====================================================================
 * 1 Karusellen (KarusellDiagram)
 * ===================================================================== */

const K_R = 175;
const K_V: P = [250, 300];
const K_H: P = [710, 300];
const K_TH = 55;

const karusell: Def<{ b: number; kar: number; ingen: number }> = {
  id: "karusell",
  tekst: KARUSELL_TEKST,
  faser: ["Kastet", "Sett utenfra", "Sett fra karusellen", "Ståstedet roterer"],
  status: [
    "1. Karusellen roterer mot klokken, slik den nordlige halvkulen gjør sett ovenfra. Du kaster en ball rett mot en venn på kanten.",
    "2. Sett utenfra, uten rotasjon, går ballen i en rett linje, mens vennen roterer videre.",
    "3. Sett fra karusellen ser ballen ut til å krumme mot høyre.",
    "4. Ingen skyver på ballen. Det er ståstedet som roterer. Fra den roterende jorda beskrives avbøyningen med en fiktiv kraft, corioliskraften.",
  ],
  bilder: [
    { b: 0, kar: 0, ingen: 0 },
    { b: 0, kar: 0, ingen: 0 },
    { b: 1, kar: 0, ingen: 0 },
    { b: 1, kar: 1, ingen: 0 },
    { b: 1, kar: 1, ingen: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const vennV = polar(K_V, K_R, 90 + (f >= 2 ? K_TH : 0));
    const l: Lab[] = [
      { text: "Sett utenfra, uten rotasjon (treghetssystem)", x: K_V[0], y: 64, anchor: "middle", color: F.tekst, weight: 800, size: 15, badge: [250, 70] },
      { text: "Sett fra karusellen", x: K_H[0], y: 64, anchor: "middle", color: F.tekst, weight: 800, size: 15, badge: [710, 70] },
      { text: "mot klokken", x: K_V[0] + 150, y: 152, anchor: "start", color: F.teal, at: polar(K_V, K_R + 16, 35), badge: [480, 170] },
      { text: "kaster", x: K_V[0] - 40, y: K_V[1] + 46, anchor: "end", color: F.dempet, at: [K_V[0] - 8, K_V[1] + 6], badge: [480, 330] },
      { text: "venn", x: vennV[0] - 30, y: vennV[1] - 18, anchor: "end", color: F.teal, at: vennV, badge: [60, 110] },
      { text: "venn", x: K_H[0] + 40, y: K_H[1] - K_R - 6, anchor: "start", color: F.teal, at: [K_H[0] + 6, K_H[1] - K_R], badge: [850, 90] },
    ];
    if (f >= 2) l.push({ text: "rett linje", x: K_V[0] + 20, y: K_V[1] - 90, anchor: "start", color: F.ball, at: [K_V[0] + 2, K_V[1] - 90], badge: [480, 250] });
    if (f >= 3) {
      const m = polar(K_H, K_R * 0.95 * 0.65, 90 - K_TH * 0.65);
      l.push({ text: "krummer mot høyre", x: m[0] + 34, y: m[1] + 30, anchor: "start", color: F.ball, at: m, badge: [910, 210] });
    }
    if (f === 4) l.push({ text: "Ingen skyver på ballen: ståstedet roterer", x: 480, y: 516, anchor: "middle", color: F.hoyre, weight: 700, badge: [480, 495] });
    return l;
  }),
  notes: ["Sett ovenfra", "Kasteren står i midten (forenkling)", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const rot = (sek * 12) % 360;
    const ballV = polar(K_V, K_R * 0.95 * s.b, 90);
    const vennV = polar(K_V, K_R, 90 + K_TH * s.b);
    const ute = langs((u) => polar(K_H, K_R * 0.95 * u, 90 - K_TH * u), 0, Math.max(0.001, s.kar), 30);
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        {[K_V, K_H].map((c, i) => (
          <g key={i}>
            <circle cx={c[0]} cy={c[1]} r={K_R} fill={F.panel} stroke={F.linje} strokeWidth={2} />
            {/* eiker: roterer i venstre panel (sett utenfra), står stille i høyre (sett fra karusellen) */}
            {[0, 60, 120].map((a) => {
              const v = a + (i === 0 ? rot : 0);
              return <Strek key={a} pts={[polar(c, K_R, v), polar(c, K_R, v + 180)]} farge={F.linje} w={1.2} dash="5 7" />;
            })}
            <circle cx={c[0]} cy={c[1]} r={9} fill={F.dempet} />
          </g>
        ))}
        <Bane pts={langs((t) => polar(K_V, K_R + 16, 10 + 45 * t), 0, 1, 12)} farge={F.teal} w={3} />
        {/* venstre: rett linje, vennen roterer videre */}
        {s.b > 0.01 ? <Strek pts={[K_V, ballV]} farge={F.ball} w={3} dash="7 6" /> : <Bane pts={[[K_V[0], K_V[1] - 14], [K_V[0], K_V[1] - 70]]} farge={F.ball} w={3} opacity={0.7} />}
        <circle cx={r1(ballV[0])} cy={r1(ballV[1])} r={10} fill={F.ball} stroke="#0b1620" strokeWidth={2} />
        <circle cx={r1(vennV[0])} cy={r1(vennV[1])} r={12} fill={F.teal} stroke="#0b1620" strokeWidth={2} />
        {/* høyre: samme kast sett fra karusellen */}
        {s.kar > 0.01 ? <Strek pts={ute} farge={F.ball} w={3} dash="7 6" /> : <Bane pts={[[K_H[0], K_H[1] - 14], [K_H[0], K_H[1] - 70]]} farge={F.ball} w={3} opacity={0.7} />}
        {s.kar > 0.01 ? <circle cx={r1(ute[ute.length - 1][0])} cy={r1(ute[ute.length - 1][1])} r={10} fill={F.ball} stroke="#0b1620" strokeWidth={2} /> : null}
        <circle cx={K_H[0]} cy={K_H[1] - K_R} r={12} fill={F.teal} stroke="#0b1620" strokeWidth={2} />
        {s.ingen > 0.02 ? <circle cx={K_H[0]} cy={K_H[1]} r={K_R + 8} fill="none" stroke={F.hoyre} strokeWidth={2} strokeDasharray="4 8" opacity={op(s.ingen)} data-nocheck="" /> : null}
      </>
    );
  },
};
export const KarusellFigur = lagFigur(karusell);

/* =====================================================================
 * 2 Avbøyning i alle retninger (AvboyningDiagram)
 * ===================================================================== */

const A_C: P = [300, 275];
const A_R = 250;
const A_NH: P = [300, 135];
const A_EQ: P = [300, 275];
const A_SH: P = [300, 415];
const RETN: P[] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
/** Til høyre for bevegelsen på kartet (nord opp): (x, y) → (−y, x). */
const hoyreFor = (d: P): P => [-d[1], d[0]];

function vifte(c: P, side: number, lengde: number, sek: number, farge: string, opacity: number) {
  return RETN.map((d, i) => {
    const h = hoyreFor(d);
    const pts = langs((t) => [c[0] + d[0] * (18 + lengde * t) + h[0] * side * 26 * t * t, c[1] + d[1] * (18 + lengde * t) + h[1] * side * 26 * t * t], 0, 1, 14);
    const pkt = langsPunkt(pts, (sek * 0.35 + i * 0.25) % 1);
    return (
      <g key={i} opacity={op(opacity)}>
        <Strek pts={[pts[0], [c[0] + d[0] * (18 + lengde), c[1] + d[1] * (18 + lengde)]]} farge={F.dempet} w={1.2} dash="3 5" />
        <Bane pts={pts} farge={farge} w={3.5} />
        {sek > 0 ? <circle cx={r1(pkt[0])} cy={r1(pkt[1])} r={4} fill={farge} data-nocheck="" /> : null}
      </g>
    );
  });
}

const avboyning: Def<{ nh: number; sh: number; eq: number; alle: number }> = {
  id: "avboyning",
  tekst: AVBOYNING_TEKST,
  faser: ["Nordlige halvkule", "Sørlige halvkule", "Ekvator", "Alle retninger"],
  status: [
    "1. På den nordlige halvkule bøyes en bevegelse av til høyre for bevegelsen.",
    "2. På den sørlige halvkule bøyes den av til venstre.",
    "3. Ved ekvator er det ingen avbøyning.",
    "4. Avbøyningen gjelder ikke bare luft som går nord–sør. Den gjelder alle retninger.",
  ],
  bilder: [
    { nh: 0, sh: 0, eq: 0, alle: 0 },
    { nh: 1, sh: 0, eq: 0, alle: 0 },
    { nh: 1, sh: 1, eq: 0, alle: 0 },
    { nh: 1, sh: 1, eq: 1, alle: 0 },
    { nh: 1, sh: 1, eq: 1, alle: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [{ text: "nordlige halvkule: til høyre for bevegelsen", x: 600, y: A_NH[1] + 6, color: F.hoyre, weight: 700, at: [A_NH[0] + 98, A_NH[1] + 10], badge: [640, 135] }];
    if (f >= 2) l.push({ text: "sørlige halvkule: til venstre for bevegelsen", x: 600, y: A_SH[1] + 6, color: F.venstre, weight: 700, at: [A_SH[0] + 98, A_SH[1] - 10], badge: [640, 415] });
    if (f >= 3) l.push({ text: "ekvator: ingen avbøyning", x: 600, y: A_EQ[1] + 6, color: F.ball, weight: 700, at: [A_EQ[0] + 74, A_EQ[1]], badge: [640, 275] });
    if (f === 4) l.push({ text: "alle retninger, ikke bare nord–sør", x: 600, y: 500, color: F.tekst, weight: 700, badge: [760, 495] });
    return l;
  }),
  keys: [{ text: "Uten avbøyning (rett fram)", color: F.dempet, kind: "dash" }],
  notes: ["Jorda sett fra siden, nord opp", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => (
    <>
      <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
      <circle cx={A_C[0]} cy={A_C[1]} r={A_R} fill="#16324a" stroke={F.linje} strokeWidth={2} data-nocheck="" />
      <Strek pts={[[A_C[0] - A_R, A_C[1]], [A_C[0] + A_R, A_C[1]]]} farge={F.ball} w={2} dash="8 6" />
      {vifte(A_NH, 1, 52, sek, F.hoyre, 0.25 + 0.75 * s.nh)}
      {vifte(A_SH, -1, 52, sek, F.venstre, 0.25 + 0.75 * s.sh)}
      {vifte(A_EQ, 0, 36, sek, F.ball, 0.25 + 0.75 * s.eq)}
      {s.alle > 0.02
        ? [A_NH, A_SH].map((c, i) => (
            <circle key={i} cx={c[0]} cy={c[1]} r={88} fill="none" stroke={F.tekst} strokeWidth={1.5} strokeDasharray="3 6" opacity={op(s.alle)} data-nocheck="" />
          ))
        : null}
    </>
  ),
};
export const AvboyningFigur = lagFigur(avboyning);

/* =====================================================================
 * 3 Fart østover og høyresvingen (CoriolisLatitude)
 * ===================================================================== */

const FO_C: P = [300, 290];
const FO_R = 215;
const foY = (lat: number) => FO_C[1] - FO_R * Math.sin(lat * R);
const foRx = (lat: number) => FO_R * Math.cos(lat * R);
const FO_SOR = langs((t) => [lerp(330, 270, t * t), lerp(foY(55), foY(15), t)], 0, 1, 20);
const FO_NORD = langs((t) => [lerp(345, 415, t * t), lerp(foY(8), foY(50), t)], 0, 1, 20);

const fartOstover: Def<{ fart: number; sor: number; nord: number; sving: number }> = {
  id: "fart-ostover",
  tekst: FART_OSTOVER_TEKST,
  faser: ["Fart østover", "Luft sørover", "Luft nordover", "Høyresving"],
  status: [
    "1. Jorda roterer. Ved ekvator har bakken en fart østover på mer enn 400 meter per sekund, ved 60° bredde over 200 meter per sekund, og ved Nordpolen null.",
    "2. Luft som blåser rett sørover, kommer til bakke som har større fart østover. Sett fra bakken dreier vinden mot vest.",
    "3. Luft som blåser rett nordover, har med seg større fart østover enn bakken lenger nord. Sett fra bakken dreier den mot øst.",
    "4. Begge deler er en høyresving på kartet. Store luftstrømmer og havstrømmer dreier mot høyre på den nordlige halvkule.",
  ],
  bilder: [
    { fart: 0, sor: 0, nord: 0, sving: 0 },
    { fart: 1, sor: 0, nord: 0, sving: 0 },
    { fart: 1, sor: 1, nord: 0, sving: 0 },
    { fart: 1, sor: 1, nord: 1, sving: 0 },
    { fart: 1, sor: 1, nord: 1, sving: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "ekvator: mer enn 400 m/s østover", x: 560, y: FO_C[1] + 44, color: F.teal, at: [FO_C[0] + 150, FO_C[1] + 6], badge: [600, 300] },
      { text: "60°: mer enn 200 m/s østover", x: 560, y: foY(60) - 10, color: F.teal, at: [FO_C[0] + 76, foY(60) + 6], badge: [600, 120] },
      { text: "Nordpolen: null", x: FO_C[0] + 40, y: 48, color: F.teal, at: [FO_C[0] + 2, FO_C[1] - FO_R + 6], badge: [430, 45] },
    ];
    if (f >= 2) l.push({ text: "luft rett sørover dreier mot vest", x: 560, y: 196, color: F.kald, at: FO_SOR[16], badge: [600, 205] });
    if (f >= 3) l.push({ text: "luft rett nordover dreier mot øst", x: 560, y: 252, color: F.luft, at: FO_NORD[16], badge: [600, 385] });
    if (f === 4) l.push({ text: "begge er en høyresving på kartet", x: 560, y: 470, color: F.hoyre, weight: 700, badge: [600, 475] });
    return l;
  }),
  keys: [
    { text: "Bakkens fart østover", color: F.teal, kind: "line" },
    { text: "Rett nord–sør uten avbøyning", color: F.dempet, kind: "dash" },
  ],
  notes: ["Jorda sett fra siden, nord opp", "Nordlige halvkule, skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const rot = r1(-(sek * 30) % 24);
    const u = (sek * 0.25) % 1;
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <circle cx={FO_C[0]} cy={FO_C[1]} r={FO_R} fill="#16324a" stroke={F.linje} strokeWidth={2} data-nocheck="" />
        <Strek pts={[[FO_C[0], FO_C[1] - FO_R - 20], [FO_C[0], FO_C[1] + FO_R + 20]]} farge={F.dempet} w={1.5} dash="4 4" />
        {[0, 60].map((lat) => {
          const y = foY(lat);
          const rx = foRx(lat);
          const ry = r1(rx * 0.16);
          const fram = `M${r1(FO_C[0] - rx)} ${r1(y)} A ${r1(rx)} ${ry} 0 0 0 ${r1(FO_C[0] + rx)} ${r1(y)}`;
          return (
            <g key={lat}>
              <path d={fram} fill="none" stroke={F.teal} strokeOpacity={0.8} strokeWidth={2} strokeDasharray="8 16" strokeDashoffset={rot} data-nocheck="" />
              {s.fart > 0.02 ? <Bane pts={[[FO_C[0], y + ry], [FO_C[0] + 150 * Math.cos(lat * R), y + ry]]} farge={F.teal} w={4} opacity={s.fart} /> : null}
            </g>
          );
        })}
        <circle cx={FO_C[0]} cy={FO_C[1] - FO_R} r={6} fill={F.teal} />
        {s.sor > 0.02 ? (
          <g opacity={op(s.sor)}>
            <Strek pts={[FO_SOR[0], [FO_SOR[0][0], FO_SOR[FO_SOR.length - 1][1]]]} farge={F.dempet} w={1.5} dash="4 5" />
            <Bane pts={FO_SOR} farge={F.kald} w={4} />
            <circle cx={r1(langsPunkt(FO_SOR, u)[0])} cy={r1(langsPunkt(FO_SOR, u)[1])} r={6} fill={F.kald} data-nocheck="" />
          </g>
        ) : null}
        {s.nord > 0.02 ? (
          <g opacity={op(s.nord)}>
            <Strek pts={[FO_NORD[0], [FO_NORD[0][0], FO_NORD[FO_NORD.length - 1][1]]]} farge={F.dempet} w={1.5} dash="4 5" />
            <Bane pts={FO_NORD} farge={F.luft} w={4} />
            <circle cx={r1(langsPunkt(FO_NORD, u)[0])} cy={r1(langsPunkt(FO_NORD, u)[1])} r={6} fill={F.luft} data-nocheck="" />
          </g>
        ) : null}
      </>
    );
  },
};
export const FartOstoverFigur = lagFigur(fartOstover);

/* =====================================================================
 * 4 Den loddrette virkningen (ZonalCentrifugal)
 * ===================================================================== */

const ZV_BAKKE = 400;
const ZV_G: P = [790, 300];
const ZV_GR = 130;

const zonalVertikal: Def<{ ost: number; vest: number; liten: number; pol: number }> = {
  id: "zonal-vertikal",
  tekst: ZONAL_VERTIKAL_TEKST,
  faser: ["Østover", "Vestover", "Svært liten", "Mot polene"],
  status: [
    "1. Et legeme som beveger seg østover langs overflaten, har en tendens til å løfte seg litt.",
    "2. I vestgående retning er det omvendt.",
    "3. Effekten er svært liten. Pilene er sterkt overdrevet.",
    "4. Effekten avtar fra ekvator til null ved polene.",
  ],
  bilder: [
    { ost: 0, vest: 0, liten: 0, pol: 0 },
    { ost: 1, vest: 0, liten: 0, pol: 0 },
    { ost: 1, vest: 1, liten: 0, pol: 0 },
    { ost: 1, vest: 1, liten: 1, pol: 0 },
    { ost: 1, vest: 1, liten: 1, pol: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "overflaten", x: 80, y: ZV_BAKKE + 34, color: F.dempet },
      { text: "østover: tendens til å løfte seg litt", x: 60, y: 170, color: F.hoyre, weight: 700, at: [190, 300], badge: [120, 228] },
    ];
    if (f >= 2) l.push({ text: "vestover: omvendt", x: 560, y: 236, anchor: "end", color: F.venstre, weight: 700, at: [450, 300], badge: [530, 228] });
    if (f >= 3) l.push({ text: "overdrevet: i virkeligheten svært liten", x: 320, y: 492, anchor: "middle", color: F.ball });
    if (f === 4) {
      l.push({ text: "størst ved ekvator", x: 760, y: 486, anchor: "middle", color: F.hoyre, at: [ZV_G[0] + ZV_GR + 20, ZV_G[1]], badge: [870, 480] });
      l.push({ text: "null ved polene", x: ZV_G[0], y: 106, anchor: "middle", color: F.hoyre, at: [ZV_G[0], ZV_G[1] - ZV_GR - 4], badge: [700, 80] });
    }
    return l;
  }),
  notes: ["Venstre: snitt langs bakken, øst til høyre", "Høyre: jorda sett fra siden", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const u = (sek * 0.2) % 1;
    const xO = lerp(110, 300, u);
    const xV = lerp(540, 350, u);
    return (
      <>
        <rect x="20" y="20" width="580" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <rect x="620" y="20" width="320" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <rect x="40" y={ZV_BAKKE} width="540" height="100" fill="#2a3a2f" data-nocheck="" />
        <Strek pts={[[40, ZV_BAKKE], [580, ZV_BAKKE]]} farge={F.landKant} w={2.5} />
        {s.ost > 0.02 ? (
          <g opacity={op(s.ost)}>
            <Bane pts={[[90, ZV_BAKKE - 16], [320, ZV_BAKKE - 16]]} farge={F.dempet} w={2.5} />
            <circle cx={r1(xO)} cy={ZV_BAKKE - 16} r={14} fill={F.luft} stroke="#0b1620" strokeWidth={2} />
            <Bane pts={[[190, ZV_BAKKE - 40], [190, ZV_BAKKE - 40 - 70 * (1 - 0.6 * s.liten)]]} farge={F.hoyre} w={4} dash="7 5" />
          </g>
        ) : null}
        {s.vest > 0.02 ? (
          <g opacity={op(s.vest)}>
            <Bane pts={[[560, ZV_BAKKE - 16], [330, ZV_BAKKE - 16]]} farge={F.dempet} w={2.5} />
            <circle cx={r1(xV)} cy={ZV_BAKKE - 16} r={14} fill={F.luft} stroke="#0b1620" strokeWidth={2} />
            <Bane pts={[[450, ZV_BAKKE - 40 - 70 * (1 - 0.6 * s.liten)], [450, ZV_BAKKE - 40]]} farge={F.venstre} w={4} dash="7 5" />
          </g>
        ) : null}
        <circle cx={ZV_G[0]} cy={ZV_G[1]} r={ZV_GR} fill="#16324a" stroke={F.linje} strokeWidth={2} opacity={op(0.35 + 0.65 * s.pol)} data-nocheck="" />
        <Strek pts={[[ZV_G[0] - ZV_GR, ZV_G[1]], [ZV_G[0] + ZV_GR, ZV_G[1]]]} farge={F.ball} w={1.5} dash="6 5" opacity={0.35 + 0.65 * s.pol} />
        {s.pol > 0.02
          ? [0, 30, 60, -30, -60].map((lat) => {
              const a = polar(ZV_G, ZV_GR, lat);
              const b = polar(ZV_G, ZV_GR + 50 * Math.cos(lat * R), lat);
              return <Bane key={lat} pts={[a, b]} farge={F.hoyre} w={3.5} opacity={s.pol} />;
            })
          : null}
        {s.pol > 0.02
          ? [90, -90].map((lat) => {
              const a = polar(ZV_G, ZV_GR, lat);
              return <circle key={lat} cx={r1(a[0])} cy={r1(a[1])} r={6} fill={F.hoyre} opacity={op(s.pol)} />;
            })
          : null}
      </>
    );
  },
};
export const ZonalVertikalFigur = lagFigur(zonalVertikal);

/* =====================================================================
 * 5 Lavtrykket og rotasjonen (SyklonDiagram)
 * ===================================================================== */

const SY_L: P = [290, 280];
const syklonBane = (a0: number, rot: number) => langs((t) => polar(SY_L, 200 - 140 * t, a0 + 75 * rot * t), 0, 1, 18);

const syklon: Def<{ rot: number; fylles: number; ekv: number }> = {
  id: "syklon-rotasjon",
  tekst: SYKLON_TEKST_CORIOLIS,
  faser: ["Uten rotasjon", "Med rotasjon", "Nær ekvator"],
  status: [
    "1. Dersom jorda ikke roterte, ville lufta strømmet rett inn, og lavtrykket ville raskt bli fylt igjen.",
    "2. Avbøyningen gjør at det dannes en rotasjon. Slik oppstår virvler ved lavtrykk.",
    "3. Ved ekvator er det ingen avbøyning, så rotasjonen kommer ikke i gang der. Tropiske sykloner dannes sjelden nærmere ekvator enn ca. 5°, om lag 500 km.",
  ],
  bilder: [
    { rot: 0, fylles: 0, ekv: 0 },
    { rot: 0, fylles: 1, ekv: 0 },
    { rot: 1, fylles: 0, ekv: 0 },
    { rot: 1, fylles: 0, ekv: 1 },
  ],
  etiketter: [1, 2, 3].map((f) => {
    const l: Lab[] = [];
    if (f === 1) l.push({ text: "uten rotasjon: lavtrykket fylles raskt igjen", x: SY_L[0], y: 506, anchor: "middle", color: F.dempet, weight: 700 });
    if (f >= 2) l.push({ text: "avbøyningen gir en virvel", x: SY_L[0], y: 506, anchor: "middle", color: F.hoyre, weight: 700 });
    if (f === 3) {
      l.push({ text: "ekvator: ingen avbøyning", x: 760, y: 262, anchor: "middle", color: F.ball, weight: 700, at: [700, 280], badge: [840, 440] });
      l.push({ text: "ca. 5°, om lag 500 km", x: 760, y: 214, anchor: "middle", color: F.ball, at: [880, 236], badge: [880, 150] });
      l.push({ text: "tropiske sykloner dannes sjelden her", x: 760, y: 350, anchor: "middle", color: F.dempet, at: [760, 300], badge: [690, 440] });
    }
    return l;
  }),
  notes: ["Venstre: lavtrykk sett ovenfra, nordlige halvkule", "Høyre: et bånd langs ekvator", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const baner = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => syklonBane(a, s.rot));
    return (
      <>
        <rect x="20" y="20" width="560" height="500" rx="10" fill={F.bg} data-nocheck="" />
        {baner.map((b, i) => {
          const p = langsPunkt(b, (sek * 0.3 + i * 0.125) % 1);
          return (
            <g key={i}>
              <Bane pts={b} farge={s.rot > 0.5 ? F.hoyre : F.dempet} w={3} />
              {sek > 0 ? <circle cx={r1(p[0])} cy={r1(p[1])} r={4} fill={F.tekst} data-nocheck="" /> : null}
            </g>
          );
        })}
        <Trykk x={SY_L[0]} y={SY_L[1]} kind="L" size={34} opacity={1 - 0.6 * s.fylles} />
        <rect x="600" y="20" width="340" height="500" rx="10" fill={F.bg} opacity={op(0.4 + 0.6 * s.ekv)} data-nocheck="" />
        {s.ekv > 0.02 ? (
          <g opacity={op(s.ekv)}>
            <rect x="620" y="236" width="300" height="88" fill={F.ball} opacity={0.16} data-nocheck="" />
            <Strek pts={[[620, 280], [920, 280]]} farge={F.ball} w={2.5} dash="8 6" />
            <Strek pts={[[620, 236], [920, 236]]} farge={F.ball} w={1.2} dash="3 5" />
            <Strek pts={[[620, 324], [920, 324]]} farge={F.ball} w={1.2} dash="3 5" />
          </g>
        ) : null}
      </>
    );
  },
};
export const SyklonRotasjonFigur = lagFigur(syklon);

/* =====================================================================
 * 6 Rotasjon rundt lavtrykk og høytrykk, og vinkelen ved bakken (PressureSpin)
 * ===================================================================== */

const TR_L: P = [250, 280];
const TR_H: P = [710, 280];

function rundt(c: P, retning: number, sek: number, farge: string) {
  // retning +1 = mot klokken, −1 = med klokken (sett ovenfra, nord opp)
  return [0, 120, 240].map((a0, i) => {
    const pts = langs((t) => polar(c, 140, a0 + retning * 70 * t), 0, 1, 14);
    const p = polar(c, 140, a0 + retning * ((sek * 40 + i * 120) % 360));
    return (
      <g key={i}>
        <Bane pts={pts} farge={farge} w={4} />
        {sek > 0 ? <circle cx={r1(p[0])} cy={r1(p[1])} r={4.5} fill={farge} data-nocheck="" /> : null}
      </g>
    );
  });
}

const trykkRotasjon: Def<{ l: number; h: number; sor: number; naer: number; land: number }> = {
  id: "trykk-rotasjon",
  tekst: TRYKK_ROTASJON_TEKST,
  faser: ["Lavtrykk", "Høytrykk", "Sørlige halvkule", "Over havet", "Over land"],
  status: [
    "1. På den nordlige halvkule blir rotasjonen rundt et lavtrykk mot klokken.",
    "2. Rundt et høytrykk blir den med klokken.",
    "3. På den sørlige halvkule er mønsteret speilvendt, fordi avbøyningen går motsatt vei.",
    "4. Nær bakken krysser vinden isobarene. Over havet er vinkelen 0–20°.",
    "5. Over land er vinkelen 20–40°, fordi friksjonen er større over land.",
  ],
  bilder: [
    { l: 0, h: 0, sor: 0, naer: 0, land: 0 },
    { l: 1, h: 0, sor: 0, naer: 0, land: 0 },
    { l: 1, h: 1, sor: 0, naer: 0, land: 0 },
    { l: 1, h: 1, sor: 1, naer: 0, land: 0 },
    { l: 1, h: 1, sor: 1, naer: 1, land: 0 },
    { l: 1, h: 1, sor: 1, naer: 1, land: 1 },
  ],
  etiketter: [1, 2, 3, 4, 5].map((f) => {
    const l: Lab[] = [];
    if (f <= 3) {
      const halv = f === 3 ? "sørlige halvkule: speilvendt" : "nordlige halvkule";
      l.push({ text: halv, x: 480, y: 64, anchor: "middle", color: f === 3 ? F.venstre : F.tekst, weight: 800, badge: [480, 70] });
      l.push({ text: f === 3 ? "lavtrykk: med klokken" : "lavtrykk: mot klokken", x: TR_L[0], y: 486, anchor: "middle", color: F.lav, weight: 700, badge: [250, 488] });
      if (f >= 2) l.push({ text: f === 3 ? "høytrykk: mot klokken" : "høytrykk: med klokken", x: TR_H[0], y: 486, anchor: "middle", color: F.hoy, weight: 700, badge: [710, 488] });
    } else {
      l.push({ text: "lavere trykk", x: 80, y: 118, color: F.lav, weight: 700, badge: [80, 88] });
      l.push({ text: "høyere trykk", x: 80, y: 446, color: F.hoy, weight: 700, badge: [80, 478] });
      l.push({ text: "isobar", x: 880, y: 262, anchor: "end", color: F.dempet, badge: [880, 340] });
      l.push({ text: f === 4 ? "over havet: 0–20°" : "over land: 20–40°", x: 620, y: 200, color: f === 4 ? F.kald : F.luft, weight: 800, at: [560, 260], badge: [720, 200] });
      if (f === 5) l.push({ text: "friksjonen er større over land", x: 620, y: 348, color: F.luft, badge: [720, 360] });
    }
    return l;
  }),
  notes: ["Sett ovenfra, nord opp", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const speil = s.sor > 0.5 ? -1 : 1;
    // pilene dempes mens mønsteret speilvendes
    const demp = 0.25 + 0.75 * clamp(Math.abs(s.sor - 0.5) * 2);
    // det gamle panelet er borte før det nye kommer, så ingenting ligger oppå hverandre i overgangen
    const opPanel = clamp(1 - 2.2 * s.naer);
    const opNaer = clamp(2.2 * s.naer - 1.2);
    const vinkel = lerp(10, 30, s.land);
    const fra = lerp(0, 20, s.land);
    const til = lerp(20, 40, s.land);
    const o: P = [380, 300];
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        {opPanel > 0.02 ? (
          <g opacity={op(opPanel)}>
            {[TR_L, TR_H].map((c, i) =>
              [60, 105, 150].map((r) => <circle key={`${i}-${r}`} cx={c[0]} cy={c[1]} r={r} fill="none" stroke={F.linje} strokeWidth={1.5} data-nocheck="" />),
            )}
            {s.l > 0.02 ? <g opacity={op(s.l * demp)}>{rundt(TR_L, speil, sek, F.lav)}</g> : null}
            {s.h > 0.02 ? <g opacity={op(s.h * demp)}>{rundt(TR_H, -speil, sek, F.hoy)}</g> : null}
            <Trykk x={TR_L[0]} y={TR_L[1]} kind="L" />
            <Trykk x={TR_H[0]} y={TR_H[1]} kind="H" />
          </g>
        ) : null}
        {opNaer > 0.02 ? (
          <g opacity={op(opNaer)}>
            <rect x="40" y="140" width="880" height="280" fill={s.land > 0.5 ? "#3a3f2c" : F.hav} opacity={0.6} data-nocheck="" />
            <Strek pts={[[40, 140], [920, 140]]} farge={F.lav} w={2.5} />
            <Strek pts={[[40, 280], [920, 280]]} farge={F.dempet} w={2} />
            <Strek pts={[[40, 420], [920, 420]]} farge={F.hoy} w={2.5} />
            <path
              d={`M${o[0]} ${o[1]} L${r1(polar(o, 190, fra)[0])} ${r1(polar(o, 190, fra)[1])} A 190 190 0 0 0 ${r1(polar(o, 190, til)[0])} ${r1(polar(o, 190, til)[1])} Z`}
              fill={s.land > 0.5 ? F.luft : F.kald}
              opacity={0.28}
              data-nocheck=""
            />
            <Bane pts={[polar(o, -150, vinkel), polar(o, 210, vinkel)]} farge={s.land > 0.5 ? F.luft : F.kald} w={5} />
          </g>
        ) : null}
      </>
    );
  },
};
export const TrykkRotasjonFigur = lagFigur(trykkRotasjon);

/* =====================================================================
 * 7 Høyre i nord, venstre i sør (GeostrofiskDiagram)
 * ===================================================================== */

const GE_Y = [150, 400];
const geBane = (y: number, side: number) => langs((t) => [lerp(175, 760, t), y + side * 92 * t * t], 0, 1, 20);

const geostrofisk: Def<{ nh: number; sh: number }> = {
  id: "geostrofisk",
  tekst: GEOSTROFISK_TEKST,
  faser: ["Uten rotasjon", "Nordlige halvkule", "Sørlige halvkule"],
  status: [
    "1. Vinden blåser fra høytrykk mot lavtrykk. Uten jordrotasjonen ville den gått rett fra høyt til lavt trykk.",
    "2. På den nordlige halvkule avbøyer corioliskraften vinden mot høyre.",
    "3. På den sørlige halvkule avbøyes den mot venstre.",
  ],
  bilder: [
    { nh: 0, sh: 0 },
    { nh: 0, sh: 0 },
    { nh: 1, sh: 0 },
    { nh: 1, sh: 1 },
  ],
  etiketter: [1, 2, 3].map((f) => {
    const l: Lab[] = [
      { text: "nordlige halvkule", x: 60, y: 62, color: F.tekst, weight: 800 },
      { text: "sørlige halvkule", x: 60, y: 312, color: F.tekst, weight: 800 },
      { text: "uten rotasjon: rett fra høyt til lavt trykk", x: 470, y: GE_Y[0] - 22, anchor: "middle", color: F.dempet, badge: [470, 88] },
    ];
    if (f >= 2) l.push({ text: "avbøyd mot høyre", x: 520, y: GE_Y[0] + 104, anchor: "middle", color: F.hoyre, weight: 700, at: [560, GE_Y[0] + 58], badge: [420, 232] });
    if (f === 3) l.push({ text: "avbøyd mot venstre", x: 520, y: GE_Y[1] - 82, anchor: "middle", color: F.venstre, weight: 700, at: [560, GE_Y[1] - 58], badge: [420, 318] });
    return l;
  }),
  notes: ["Sett ovenfra, nord opp", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const u = (sek * 0.25) % 1;
    return (
      <>
        <rect x="20" y="20" width="920" height="240" rx="10" fill={F.bg} data-nocheck="" />
        <rect x="20" y="280" width="920" height="240" rx="10" fill={F.bg} data-nocheck="" />
        {GE_Y.map((y, i) => {
          const side = i === 0 ? 1 : -1;
          const vis = i === 0 ? s.nh : s.sh;
          const b = geBane(y, side);
          const p = langsPunkt(b, u);
          return (
            <g key={i}>
              <Bane pts={[[175, y], [780, y]]} farge={F.dempet} w={2} dash="7 6" />
              {vis > 0.02 ? (
                <g opacity={op(vis)}>
                  <Bane pts={b} farge={side > 0 ? F.hoyre : F.venstre} w={4.5} />
                  <circle cx={r1(p[0])} cy={r1(p[1])} r={6} fill={side > 0 ? F.hoyre : F.venstre} data-nocheck="" />
                </g>
              ) : null}
              <Trykk x={120} y={y} kind="H" size={32} />
              <Trykk x={840} y={y} kind="L" size={32} />
            </g>
          );
        })}
      </>
    );
  },
};
export const GeostrofiskFigur = lagFigur(geostrofisk);

/* =====================================================================
 * 8 Fra ro til vind langs isobarene (GeostrophicAdjustment)
 * ===================================================================== */

const TP_ISO = [130, 270, 410];
const TP_START: P = [170, 390];
const tpKurve = (t: number): P => {
  // kubisk Bézier fra start (rett nord) til y = 200 (rett øst)
  const p0 = TP_START;
  const p1: P = [170, 270];
  const p2: P = [230, 200];
  const p3: P = [380, 200];
  const a = (1 - t) ** 3;
  const b = 3 * (1 - t) ** 2 * t;
  const c = 3 * (1 - t) * t * t;
  const e = t ** 3;
  return [a * p0[0] + b * p1[0] + c * p2[0] + e * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + e * p3[1]];
};
// jevn punkttetthet (om lag 11 px), så andelen langs banen svarer til lengden
const TP_BANE: P[] = [...langs(tpKurve, 0, 1, 30), ...langs((t) => [lerp(380, 880, t), 200], 0, 1, 45).slice(1)];

const tilpasning: Def<{ u: number; vis: number }> = {
  id: "tilpasning",
  tekst: TILPASNING_TEKST,
  faser: ["I ro", "Trykkforskjellen", "Retningen endres", "Langs isobarene"],
  status: [
    "1. Lufta er i ro mellom isobarene, med lavere trykk i nord og høyere trykk i sør.",
    "2. Trykkforskjellen setter lufta i gang mot lavere trykk. Corioliskraften setter ikke lufta i gang.",
    "3. Corioliskraften endrer retningen mot høyre.",
    "4. Figuren viser balansen uten friksjon, der vinden til slutt går langs isobarene.",
  ],
  bilder: [
    { u: 0, vis: 0 },
    { u: 0, vis: 0 },
    { u: 0.07, vis: 1 },
    { u: 0.3, vis: 1 },
    { u: 0.9, vis: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "lavere trykk", x: 60, y: TP_ISO[0] - 14, color: F.lav, weight: 700, badge: [60, 62] },
      { text: "høyere trykk", x: 60, y: TP_ISO[2] + 32, color: F.hoy, weight: 700, badge: [60, 472] },
      { text: "isobar", x: 900, y: TP_ISO[1] - 12, anchor: "end", color: F.dempet, badge: [900, 340] },
    ];
    if (f === 1) l.push({ text: "i ro", x: TP_START[0] + 40, y: TP_START[1] + 8, color: F.tekst, at: [TP_START[0] + 10, TP_START[1]], badge: [300, 440] });
    if (f >= 2) l.push({ text: "trykkforskjellen setter lufta i gang", x: 420, y: 340, color: F.lav, at: [196, 300], badge: [300, 340] });
    if (f >= 3) l.push({ text: "corioliskraften endrer retningen", x: 420, y: 250, color: F.hoyre, at: [250, 214], badge: [440, 340] });
    if (f === 4) l.push({ text: "langs isobarene, uten friksjon", x: 640, y: 176, anchor: "middle", color: F.ball, weight: 700, at: [700, 200], badge: [640, 96] });
    return l;
  }),
  keys: [
    { text: "Banen til lufta", color: F.ball, kind: "dash" },
    { text: "Trykkforskjellen (like stor overalt)", color: F.lav, kind: "line" },
  ],
  notes: ["Sett ovenfra, nord opp", "Nordlige halvkule, forenklet"],
  viewBox: "0 0 960 540",
  tegn: (s) => {
    const p = langsPunkt(TP_BANE, s.u);
    const q = langsPunkt(TP_BANE, Math.min(1, s.u + 0.02));
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const l = Math.hypot(dx, dy) || 1;
    const fart = 40 + 90 * clamp(s.u / 0.5);
    const spor = langs((t) => langsPunkt(TP_BANE, t), 0, Math.max(0.001, s.u), 30);
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        {TP_ISO.map((y, i) => (
          <Strek key={y} pts={[[40, y], [920, y]]} farge={i === 0 ? F.lav : i === 2 ? F.hoy : F.dempet} w={2.2} />
        ))}
        {s.u > 0.01 ? <Strek pts={spor} farge={F.ball} w={3} dash="7 6" /> : null}
        {s.vis > 0.02 && s.u > 0.01 ? <Bane pts={[p, [p[0] + (dx / l) * fart, p[1] + (dy / l) * fart]]} farge={F.ball} w={4} opacity={s.vis} /> : null}
        {s.vis > 0.02 ? <Bane pts={[[p[0], p[1] - 16], [p[0], p[1] - 86]]} farge={F.lav} w={4} opacity={s.vis} /> : null}
        <circle cx={r1(p[0])} cy={r1(p[1])} r={12} fill={F.luft} stroke="#0b1620" strokeWidth={2} />
      </>
    );
  },
};
export const TilpasningFigur = lagFigur(tilpasning);

/* =====================================================================
 * 9 Ekmanspiralen og ekmantransporten (EkmanSpiral)
 * ===================================================================== */

const EK_C: P = [430, 330];
/** Retning (grader med klokken fra nord) og lengde per lag, fra overflaten og ned. Skjematisk. */
const EK_LAG: [number, number][] = [
  [45, 200],
  [80, 150],
  [115, 112],
  [150, 84],
  [185, 62],
  [225, 42],
];
const ekTupp = (vinkel: number, lengde: number): P => [EK_C[0] + lengde * Math.sin(vinkel * R), EK_C[1] - lengde * Math.cos(vinkel * R)];

const ekmanSpiral: Def<{ lag: number; dyp: number; netto: number }> = {
  id: "ekmanspiral",
  tekst: EKMANSPIRAL_TEKST,
  faser: ["Vinden drar", "Lag for lag", "De dypeste lagene", "Netto transport"],
  status: [
    "1. Vinden drar i overflaten. Overflatestrømmen går til høyre for vinden.",
    "2. Det øverste laget drar dypere lag med seg. Hvert dypere lag går saktere. Dypere vann avbøyes også mot høyre, så lagene danner en spiral.",
    "3. De dypeste lagene kan gå motsatt vei av overflatestrømmen. Bevegelsen dør ut på om lag 100 meters dyp.",
    "4. Netto transport av hele ekmanlaget går 90° til høyre for vinden på den nordlige halvkule. Det er ekmantransporten.",
  ],
  bilder: [
    { lag: 1, dyp: 0, netto: 0 },
    { lag: 1, dyp: 0, netto: 0 },
    { lag: 5, dyp: 0, netto: 0 },
    { lag: 6, dyp: 1, netto: 0 },
    { lag: 6, dyp: 1, netto: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "vind", x: 140, y: 120, anchor: "middle", color: F.luft, weight: 800, at: [150, 150], badge: [150, 80] },
      { text: "overflatestrømmen: til høyre for vinden", x: 590, y: 96, color: F.teal, weight: 700, at: ekTupp(45, 200), badge: [700, 130] },
    ];
    if (f >= 2) l.push({ text: "dypere lag: saktere, mot høyre", x: 660, y: 250, color: F.kald, at: ekTupp(115, 112), badge: [640, 450] });
    if (f >= 3) l.push({ text: "dypest: motsatt vei av overflatestrømmen, om lag 100 m", x: 160, y: 470, color: F.venstre, at: ekTupp(225, 42), badge: [300, 470] });
    if (f === 4) l.push({ text: "netto: 90° til høyre for vinden", x: 660, y: 370, color: F.netto, weight: 800, at: [EK_C[0] + 190, EK_C[1]], badge: [760, 330] });
    return l;
  }),
  notes: ["Havet sett ovenfra, nordlige halvkule", "Pilene viser strømmen i hvert lag, lengden viser farten", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const tupper = EK_LAG.map(([v, l]) => ekTupp(v, l));
    const synlige = EK_LAG.slice(0, Math.max(1, Math.ceil(s.lag - 0.001)));
    const sp = (sek * 0.4) % 1;
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.hav} data-nocheck="" />
        <Bane pts={[[150, 420], [150, 150]]} farge={F.luft} w={6} />
        {[0, 1, 2].map((k) => {
          const y = 420 - ((sp + k / 3) % 1) * 250;
          return <circle key={k} cx={150} cy={r1(y)} r={4} fill={F.tekst} opacity={0.7} data-nocheck="" />;
        })}
        {s.lag > 1.5 ? <Strek pts={tupper.slice(0, synlige.length)} farge={F.kald} w={1.5} dash="3 4" /> : null}
        {synlige.map(([v, l], i) => {
          const andel = clamp(s.lag - i);
          const dypest = i === EK_LAG.length - 1;
          return (
            <Bane
              key={i}
              pts={[EK_C, ekTupp(v, l * Math.max(0.2, andel))]}
              farge={i === 0 ? F.teal : dypest ? F.venstre : F.kald}
              w={Math.max(2.2, 5.5 - i * 0.6)}
              opacity={(i === 0 ? 1 : 0.95 - i * 0.08) * andel}
            />
          );
        })}
        <circle cx={EK_C[0]} cy={EK_C[1]} r={6} fill={F.tekst} />
        {s.netto > 0.02 ? <Bane pts={[EK_C, [EK_C[0] + 190, EK_C[1]]]} farge={F.netto} w={7} opacity={s.netto} /> : null}
      </>
    );
  },
};
export const EkmanSpiralFigur = lagFigur(ekmanSpiral);

/* =====================================================================
 * 10 Oppvelling langs en vestkyst (Oppvelling, ny widget)
 * ===================================================================== */

const OP_FLATE = 200;
const OP_HAV: P[] = [
  [40, OP_FLATE],
  [700, OP_FLATE],
  [620, 500],
  [40, 500],
];
const OP_LAND: P[] = [
  [700, OP_FLATE],
  [700, 160],
  [920, 160],
  [920, 520],
  [40, 520],
  [40, 500],
  [620, 500],
];
const OP_OPP: P[][] = [
  langs((t) => [lerp(540, 560, t), lerp(470, 262, t)], 0, 1, 10),
  langs((t) => [lerp(600, 628, t), lerp(440, 262, t)], 0, 1, 10),
];

const oppvelling: Def<{ ut: number; opp: number; sakte: number }> = {
  id: "oppvelling",
  tekst: OPPVELLING_TEKST,
  faser: ["Nordavind", "Overflatelaget utover", "Vann fra dypet", "Langsomt og næringsrikt"],
  status: [
    "1. En nordavind blåser langs en vestkyst på den nordlige halvkule, mot leseren.",
    "2. Ekmantransporten går til høyre for vinden, så overflatelaget skyves utover fra kysten.",
    "3. Da får vann fra dypere nivåer plass og løftes opp mot overflaten.",
    "4. Prosessen er langsom, om lag 10 meter per dag. Vannet er rikt på næringsstoffer.",
  ],
  bilder: [
    { ut: 0, opp: 0, sakte: 0 },
    { ut: 0, opp: 0, sakte: 0 },
    { ut: 1, opp: 0, sakte: 0 },
    { ut: 1, opp: 1, sakte: 0 },
    { ut: 1, opp: 1, sakte: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "nordavind langs kysten, mot leseren", x: 520, y: 92, anchor: "end", color: F.luft, weight: 700, at: [560, 118] },
      { text: "land", x: 820, y: 220, anchor: "middle", color: F.tekst },
      { text: "hav", x: 90, y: 250, color: F.dempet },
    ];
    if (f >= 2) l.push({ text: "overflatelaget skyves utover", x: 300, y: 172, anchor: "middle", color: F.teal, weight: 700, at: [380, 222] });
    if (f >= 3) l.push({ text: "vann fra dypere nivåer får plass", x: 360, y: 380, anchor: "end", color: F.kald, weight: 700, at: [548, 380], badge: [420, 380] });
    if (f === 4) {
      l.push({ text: "om lag 10 meter per dag", x: 360, y: 430, anchor: "end", color: F.ball, at: [602, 420], badge: [420, 465] });
      l.push({ text: "rikt på næringsstoffer", x: 360, y: 476, anchor: "end", color: F.hoyre, at: [570, 300], badge: [300, 300] });
    }
    return l;
  }),
  notes: ["Snitt: vest til venstre, øst til høyre, leseren ser mot nord", "Nordlige halvkule, skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const fart = 1 - 0.6 * s.sakte;
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <polygon points={OP_HAV.map((p) => p.join(",")).join(" ")} fill={F.hav} data-nocheck="" />
        <polygon points={OP_LAND.map((p) => p.join(",")).join(" ")} fill={F.land} stroke={F.landKant} strokeWidth={2} />
        <Strek pts={[[40, OP_FLATE], [700, OP_FLATE]]} farge={F.havLys} w={2} />
        <UtAvArket x={560} y={118} r={20} sek={sek} farge={F.luft} />
        {s.ut > 0.02 ? (
          <g opacity={op(s.ut)}>
            <rect x="60" y={OP_FLATE} width="630" height="44" fill={F.teal} opacity={0.14} data-nocheck="" />
            <Bane pts={[[670, 222], [300, 222]]} farge={F.teal} w={5} />
            {[0, 1, 2].map((k) => {
              const x = 660 - ((sek * 0.15 * fart + k / 3) % 1) * 340;
              return <circle key={k} cx={r1(x)} cy={222} r={4} fill={F.tekst} opacity={0.75} data-nocheck="" />;
            })}
          </g>
        ) : null}
        {s.opp > 0.02 ? (
          <g opacity={op(s.opp)}>
            {OP_OPP.map((b, i) => (
              <g key={i}>
                <Bane pts={b} farge={F.kald} w={4} />
                {[0, 0.5].map((k) => {
                  const p = langsPunkt(b, (sek * 0.12 * fart + k + i * 0.25) % 1);
                  return <circle key={k} cx={r1(p[0])} cy={r1(p[1])} r={4} fill={F.hoyre} data-nocheck="" />;
                })}
              </g>
            ))}
          </g>
        ) : null}
      </>
    );
  },
};
export const OppvellingFigur = lagFigur(oppvelling);

/* =====================================================================
 * 11 Hvor jordrotasjonen merkes (SkalaDiagram)
 * ===================================================================== */

const SK_X = [60, 360, 660];

const skala: Def<{ vask: number; hverdag: number; hav: number }> = {
  id: "skala",
  tekst: SKALA_TEKST_CORIOLIS,
  faser: ["Vasken", "Hverdagen", "Havstrømmer og vind"],
  status: [
    "1. Vannet i vasken styres ikke av corioliseffekten.",
    "2. I hverdagen merkes jordrotasjonen nesten ikke.",
    "3. Unntaket er havstrømmer og vind. Der merkes jordrotasjonen.",
  ],
  bilder: [
    { vask: 0, hverdag: 0, hav: 0 },
    { vask: 1, hverdag: 0, hav: 0 },
    { vask: 1, hverdag: 1, hav: 0 },
    { vask: 1, hverdag: 1, hav: 1 },
  ],
  etiketter: [1, 2, 3].map((f) => {
    const l: Lab[] = [
      { text: "Vannet i vasken", x: SK_X[0] + 120, y: 96, anchor: "middle", color: F.tekst, weight: 800 },
      { text: "Hverdagen", x: SK_X[1] + 120, y: 96, anchor: "middle", color: F.tekst, weight: 800 },
      { text: "Havstrømmer og vind", x: SK_X[2] + 120, y: 96, anchor: "middle", color: F.tekst, weight: 800 },
      { text: "styres ikke av corioliseffekten", x: SK_X[0] + 120, y: 420, anchor: "middle", color: F.dempet, size: 14 },
    ];
    if (f >= 2) l.push({ text: "merkes nesten ikke", x: SK_X[1] + 120, y: 420, anchor: "middle", color: F.dempet, size: 14 });
    if (f === 3) l.push({ text: "jordrotasjonen merkes", x: SK_X[2] + 120, y: 420, anchor: "middle", color: F.teal, weight: 700, size: 14 });
    return l;
  }),
  viewBox: "0 0 960 480",
  tegn: (s, { sek }) => {
    const rot = (sek * 50) % 360;
    return (
      <>
        {SK_X.map((x, i) => {
          const v = [s.vask, s.hverdag, s.hav][i];
          return <rect key={x} x={x} y={60} width={240} height={390} rx={12} fill={F.panel} stroke={i === 2 && v > 0.5 ? F.teal : F.linje} strokeWidth={2.5} opacity={op(0.45 + 0.55 * v)} data-nocheck="" />;
        })}
        {/* vask: kum med avløp */}
        <g opacity={op(0.45 + 0.55 * s.vask)}>
          <ellipse cx={SK_X[0] + 120} cy={250} rx={90} ry={50} fill="#1d3a55" stroke={F.dempet} strokeWidth={2} />
          <circle cx={SK_X[0] + 120} cy={250} r={8} fill="#0b1620" stroke={F.dempet} strokeWidth={2} />
          <Bane pts={langs((t) => [SK_X[0] + 120 + 60 * Math.cos((rot + 200 * t) * R), 250 + 30 * Math.sin((rot + 200 * t) * R)], 0, 1, 14)} farge={F.kald} w={3} />
        </g>
        {/* hverdag: ball som kastes */}
        <g opacity={op(0.45 + 0.55 * s.hverdag)}>
          <Strek pts={[[SK_X[1] + 30, 330], [SK_X[1] + 210, 330]]} farge={F.landKant} w={2.5} />
          <Bane pts={langs((t) => [SK_X[1] + 50 + 140 * t, 320 - 150 * Math.sin(Math.PI * t)], 0, 1, 16)} farge={F.ball} w={3} dash="6 6" />
          <circle cx={SK_X[1] + 190} cy={316} r={9} fill={F.ball} />
        </g>
        {/* havstrøm og vind: stor virvel */}
        <g opacity={op(0.45 + 0.55 * s.hav)}>
          <rect x={SK_X[2] + 20} y={150} width={200} height={210} rx={8} fill={F.hav} data-nocheck="" />
          <Bane pts={langs((t) => [SK_X[2] + 120 + 75 * Math.cos((-rot - 270 * t) * R), 255 + 75 * Math.sin((-rot - 270 * t) * R)], 0, 1, 20).map(([x, y]) => [x, y] as P)} farge={F.teal} w={4} />
        </g>
      </>
    );
  },
};
export const SkalaFigur = lagFigur(skala);

/* =====================================================================
 * 12 Havvirvlene (RossbyScale-widgeten, Geo F1 a)
 * ===================================================================== */

const HV_EKV = 270;
/** Punkter rundt en virvel. retning −1 = med klokken (nord), +1 = mot klokken (sør). */
function virvel(c: P, rx: number, ry: number, retning: number, fra: number, til: number, n = 30): P[] {
  return langs((t) => [c[0] + rx * Math.cos((fra + retning * (til - fra) * t) * R), c[1] - ry * Math.sin((fra + retning * (til - fra) * t) * R)], 0, 1, n);
}

function Virvel({ c, rx, ry, retning, sek, rand, farge }: { c: P; rx: number; ry: number; retning: number; sek: number; rand: number; farge: string }) {
  // vestsiden (venstre) er randstrømmen: tykk og smal; østsiden tynn og bred
  const vest = virvel(c, rx, ry, 1, 100, 260, 20);
  const vestRett = retning < 0 ? [...vest].reverse() : vest;
  const ost = [0, 1, 2].map((k) => virvel([c[0] - k * 14 * rand, c[1]], rx - k * 14 * rand, ry - k * 8 * rand, 1, -80, 80, 16));
  const ostRett = ost.map((o) => (retning < 0 ? [...o].reverse() : o));
  const topp = virvel(c, rx, ry, 1, 80, 100, 4);
  const bunn = virvel(c, rx, ry, 1, 260, 280, 4);
  const alle = virvel(c, rx, ry, retning, 0, 360, 60);
  return (
    <g aria-hidden="true">
      <Bane pts={vestRett} farge={farge} w={3 + 5 * rand} />
      {ostRett.map((o, k) => (k === 0 || rand > 0.05 ? <Bane key={k} pts={o} farge={farge} w={k === 0 ? 3 - rand : 2} opacity={k === 0 ? 1 : rand} /> : null))}
      <Strek pts={retning < 0 ? [...topp].reverse() : topp} farge={farge} w={3} />
      <Strek pts={retning < 0 ? [...bunn].reverse() : bunn} farge={farge} w={3} />
      {sek > 0
        ? [0, 0.33, 0.66].map((k) => {
            const p = langsPunkt(alle, (sek * 0.06 + k) % 1);
            return <circle key={k} cx={r1(p[0])} cy={r1(p[1])} r={4.5} fill={F.tekst} data-nocheck="" />;
          })
        : null}
    </g>
  );
}

const HV_BASS = { x: 300, w: 400, y: 40, h: 460 };
const HV_HAV = [
  { navn: "Stillehavet", x: 50, w: 360, n: true, s: true },
  { navn: "Atlanteren", x: 450, w: 230, n: true, s: true },
  { navn: "Det indiske hav", x: 720, w: 200, n: false, s: true },
];

const havvirvler: Def<{ virv: number; retn: number; ekv: number; rand: number; verden: number }> = {
  id: "havvirvler",
  tekst: HAVVIRVLER_TEKST,
  faser: ["Vind og rotasjon", "Med og mot klokken", "Ikke ved ekvator", "Randstrømmene", "Fem havvirvler"],
  status: [
    "1. De store overflatestrømmene drives av vindsystemene og avbøyes av jordrotasjonen. De danner havvirvler.",
    "2. Virvlene går med klokken på den nordlige halvkule og mot klokken på den sørlige.",
    "3. Ved ekvator, der corioliseffekten ikke virker, dannes ikke slike virvler.",
    "4. Hver virvel har en sterk og smal vestlig randstrøm og en svak og bred østlig randstrøm.",
    "5. Det er fem store havvirvler: Nord-Atlanteren, Sør-Atlanteren, Nord-Stillehavet, Sør-Stillehavet og Det indiske hav.",
  ],
  bilder: [
    { virv: 0, retn: 0, ekv: 0, rand: 0, verden: 0 },
    { virv: 1, retn: 0, ekv: 0, rand: 0, verden: 0 },
    { virv: 1, retn: 1, ekv: 0, rand: 0, verden: 0 },
    { virv: 1, retn: 1, ekv: 1, rand: 0, verden: 0 },
    { virv: 1, retn: 1, ekv: 1, rand: 1, verden: 0 },
    { virv: 1, retn: 1, ekv: 1, rand: 1, verden: 1 },
  ],
  etiketter: [1, 2, 3, 4, 5].map((f) => {
    const l: Lab[] = [];
    if (f <= 4) {
      l.push({ text: "vindsystemene driver, jordrotasjonen avbøyer", x: 480, y: 524, anchor: "middle", color: F.dempet, badge: [480, 520] });
      if (f >= 2) {
        l.push({ text: "nord: med klokken", x: 712, y: 120, color: F.hoyre, weight: 700, at: [670, 150], badge: [820, 110] });
        l.push({ text: "sør: mot klokken", x: 712, y: 380, color: F.venstre, weight: 700, at: [670, 400], badge: [820, 380] });
      }
      if (f >= 3) l.push({ text: "ekvator: ingen virvler", x: 712, y: HV_EKV + 6, color: F.ball, weight: 700, at: [700, HV_EKV], badge: [820, 262] });
      if (f >= 4) {
        l.push({ text: "vestlig randstrøm: sterk og smal", x: 288, y: 150, anchor: "end", color: F.tekst, weight: 700, at: [322, 150], badge: [150, 150] });
        l.push({ text: "østlig randstrøm: svak og bred", x: 712, y: 470, color: F.dempet, at: [664, 420], badge: [820, 470] });
      }
    } else {
      l.push({ text: "Nord-Stillehavet", x: 230, y: 70, anchor: "middle", color: F.hoyre, weight: 700 });
      l.push({ text: "Sør-Stillehavet", x: 230, y: 492, anchor: "middle", color: F.venstre, weight: 700 });
      l.push({ text: "Nord-Atlanteren", x: 565, y: 70, anchor: "middle", color: F.hoyre, weight: 700 });
      l.push({ text: "Sør-Atlanteren", x: 565, y: 492, anchor: "middle", color: F.venstre, weight: 700 });
      l.push({ text: "Det indiske hav", x: 820, y: 492, anchor: "middle", color: F.venstre, weight: 700 });
      l.push({ text: "ekvator", x: 820, y: HV_EKV - 14, anchor: "middle", color: F.ball, badge: [820, 226] });
    }
    return l;
  }),
  notes: ["Sett ovenfra, nord opp", "Skjematiske havbassenger, ikke kart"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    // bassenget er borte før verdensskissen kommer, så etikettene fra steg 4 ikke ligger over den nye tegningen
    const enkelt = clamp(1 - 2.2 * s.verden);
    const verden = clamp(2.2 * s.verden - 1.2);
    const B = HV_BASS;
    return (
      <>
        <rect x="20" y="20" width="920" height="520" rx="10" fill={F.bg} data-nocheck="" />
        {enkelt > 0.02 ? (
          <g opacity={op(enkelt)}>
            <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={14} fill={F.hav} stroke={F.landKant} strokeWidth={2} data-nocheck="" />
            {s.ekv > 0.02 ? <rect x={B.x} y={HV_EKV - 28} width={B.w} height={56} fill={F.ball} opacity={r1(0.16 * s.ekv * 100) / 100} data-nocheck="" /> : null}
            <Strek pts={[[B.x, HV_EKV], [B.x + B.w, HV_EKV]]} farge={F.ball} w={2} dash="8 6" />
            {s.virv > 0.02 ? (
              <g opacity={op(s.virv)}>
                <Virvel c={[B.x + B.w / 2, 150]} rx={B.w / 2 - 30} ry={80} retning={-1} sek={sek} rand={s.rand} farge={F.hoyre} />
                <Virvel c={[B.x + B.w / 2, 390]} rx={B.w / 2 - 30} ry={80} retning={1} sek={sek} rand={s.rand} farge={F.venstre} />
              </g>
            ) : null}
          </g>
        ) : null}
        {verden > 0.02 ? (
          <g opacity={op(verden)}>
            {HV_HAV.map((h) => (
              <g key={h.navn}>
                <rect x={h.x} y={90} width={h.w} height={380} rx={12} fill={F.hav} stroke={F.landKant} strokeWidth={2} data-nocheck="" />
                {h.n ? <Virvel c={[h.x + h.w / 2, 180]} rx={h.w / 2 - 22} ry={62} retning={-1} sek={sek} rand={1} farge={F.hoyre} /> : null}
                {h.s ? <Virvel c={[h.x + h.w / 2, 370]} rx={h.w / 2 - 22} ry={62} retning={1} sek={sek} rand={1} farge={F.venstre} /> : null}
              </g>
            ))}
            <Strek pts={[[40, HV_EKV], [930, HV_EKV]]} farge={F.ball} w={2} dash="8 6" />
          </g>
        ) : null}
      </>
    );
  },
};
export const HavvirvlerFigur = lagFigur(havvirvler);
