/**
 * Magmatisk differensiering i et magmakammer, bygget på prosess-kit.
 * Alle faglige poeng og etiketter følger Mats' tekst i bergarter.md (avsnittene «Magmatisk differensiering»
 * og avkjølingsavsnittet under «Hva er magmatiske bergarter?»). Målerne er relative og har ingen tall.
 *
 * Krystallene dannes langs veggene og taket (GeoBot1, 16.10), og de fra taket synker rett ned. Ingen krystaller på bunnen før de har sunket.
 * Brukes i widgeten Differensiering.
 */
import { useMemo } from "react";
import { IsbreFigur, type Key, type Lab } from "./isbre-figur";
import { clamp, lerp, smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { KornLag, Maalere, TidslinjeKontroller, Zoomlinse } from "./prosess-figur";
import { DIFFERENSIERING_TEKST } from "./differensiering-tekst";
import { lagKornTekstur, lat, prng, tidslinjeVerdi, useFigurSmal, useTidslinje, type Korn } from "./prosess-kit";

const FASER = ["Smelte", "Første krystaller", "Krystallene synker", "Mørkt bunnlag", "Lysere restsmelte"];

/** Kilde per steg står i PR-beskrivelsen. */
const STATUS = [
  "Et magmakammer med smelte. En smelte krystalliserer ikke alt på en gang.",
  "Magmaen kjøles, og krystaller vokser. Olivin og pyroksen krystalliserer først. De er rike på jern og magnesium.",
  "Olivin og pyroksen er tyngre enn smelten. Krystallene synker mot bunnen og tar jern og magnesium ut av smelten.",
  "Nederst kan det bli en mørk kumulasjon. Restsmelten får en annen sammensetning. Det kalles magmatisk differensiering.",
  "Restsmelten blir fattigere på jern og rikere på silisium. Restsmelten over kan størkne som en lysere bergart.",
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { T: 1, nuc: 0, sink: 0, cum: 0, rest: 0, fe: 1, si: 0.25 },
  { T: 1, nuc: 0, sink: 0, cum: 0, rest: 0, fe: 1, si: 0.25 },
  { T: 0.75, nuc: 1, sink: 0, cum: 0, rest: 0, fe: 0.9, si: 0.28 },
  { T: 0.6, nuc: 1, sink: 0.55, cum: 0.1, rest: 0.1, fe: 0.7, si: 0.38 },
  { T: 0.45, nuc: 1, sink: 1, cum: 1, rest: 0.35, fe: 0.45, si: 0.5 },
  { T: 0.3, nuc: 1, sink: 1, cum: 1, rest: 1, fe: 0.2, si: 0.85 },
];

const FARGE = {
  vert: "#3d3b40",
  vertKant: "#57545b",
  olivin: "#4d7043",
  pyroksen: "#2b3130",
  kumulat: "#262b27",
  kant: "#0e1110",
  kornKant: "#8fa486",
};

type Hex = `#${string}`;
function blandFarge(a: Hex, b: Hex, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(t)))).join(",")})`;
}

type Layout = {
  vb: string;
  vert: { x0: number; x1: number; y0: number; y1: number };
  kammer: { x0: number; x1: number; y0: number; y1: number; r: number };
  lagH: number;
  krystall: number;
  linse: { cx: number; cy: number; r: number };
  over: number;
  under: number;
  linseOver: number;
  linseUnder: number;
  merke: { luft: number; mellom: number; side: [number, number] };
};

const BRED: Layout = {
  vb: "0 0 960 540",
  vert: { x0: 40, x1: 520, y0: 60, y1: 470 },
  kammer: { x0: 90, x1: 470, y0: 90, y1: 440, r: 70 },
  lagH: 58,
  krystall: 11,
  linse: { cx: 755, cy: 270, r: 180 },
  over: 40,
  under: 500,
  linseOver: 40,
  linseUnder: 500,
  merke: { luft: 40, mellom: 0, side: [0, 0] },
};

const SMAL: Layout = {
  vb: "0 0 520 700",
  vert: { x0: 20, x1: 500, y0: 40, y1: 345 },
  kammer: { x0: 56, x1: 464, y0: 62, y1: 322, r: 56 },
  lagH: 46,
  krystall: 10,
  linse: { cx: 260, cy: 530, r: 145 },
  over: 24,
  under: 362,
  linseOver: 362,
  linseUnder: 690,
  merke: { luft: 22, mellom: 356, side: [64, 456] },
};

/**
 * Krystallene i enhetskoordinater: start langs venstre vegg, høyre vegg eller taket, og plass i bunnlaget.
 * Startpunktene holder seg unna de avrundede hjørnene og den nederste delen av veggene, så ingen krystall
 * ser ut til å ligge på bunnen før den har sunket.
 */
const KRYSTALLER = (() => {
  const rnd = prng(911);
  const n = 36;
  const ut = [];
  for (let k = 0; k < n; k++) {
    const sted = k % 3; // 0 venstre vegg, 1 høyre vegg, 2 taket
    const vy = sted === 2 ? 0.05 + rnd() * 0.04 : 0.22 + rnd() * 0.4;
    const vx = sted === 0 ? 0.02 + rnd() * 0.05 : sted === 1 ? 0.93 + rnd() * 0.05 : 0.22 + rnd() * 0.56;
    // krystaller fra taket synker nesten rett ned
    const bunnX = sted === 2 ? Math.min(0.88, Math.max(0.12, vx + (rnd() - 0.5) * 0.06)) : 0.12 + ((k * 0.618) % 1) * 0.76;
    const bunnY = 0.25 + rnd() * 0.55;
    const kanter = 6;
    const strekk = 1.4 + rnd() * 0.5;
    const vri = rnd() * Math.PI;
    const str = 0.75 + rnd() * 0.5;
    const form: [number, number][] = [];
    for (let i = 0; i < kanter; i++) {
      const a = (i / kanter) * Math.PI * 2;
      const lx = Math.cos(a) * strekk * (0.92 + rnd() * 0.12);
      const ly = Math.sin(a) * (0.92 + rnd() * 0.12);
      form.push([lx * Math.cos(vri) - ly * Math.sin(vri), lx * Math.sin(vri) + ly * Math.cos(vri)]);
    }
    ut.push({ vx, vy, bunnX, bunnY, form, str, olivin: rnd() < 0.5, frø: rnd(), forsink: rnd() });
  }
  return ut;
})();

/** Bunnlaget i linsen: tett pakkede mørke krystaller. */
const hentKumulat = lat(() => lagKornTekstur({
  seed: 31,
  avstand: 0.13,
  storrelse: [0.8, 1],
  strekk: [0.55, 0.85],
  typer: 2,
  inni: (x, y, r) => y > -0.2 && Math.hypot(x, y) - r < 1.0,
  nokkel: "diff-kumulat",
}));
/** Pekepunktet for etiketten i bunnlaget. */
const hentPekKum = lat(() => {
  const k = hentKumulat();
  return k.reduce((a, b) => (Math.hypot(b.x - 0.35, b.y - 0.6) < Math.hypot(a.x - 0.35, a.y - 0.6) ? b : a), k[0]);
});

function kammerSti(k: Layout["kammer"]) {
  const { x0, x1, y0, y1, r } = k;
  return `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
}

export function DifferensieringV2Figur({
  heading = DIFFERENSIERING_TEKST.heading,
  caption,
}: {
  heading?: string;
  caption?: React.ReactNode;
}) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const tl = useTidslinje({ antall: FASER.length, synlig: visible, faseMs: 3400, holdMs: 1700, element: ref });
  const KUMULAT = hentKumulat();
  const L = small ? SMAL : BRED;
  const { kammer: K, linse } = L;
  const R = linse.r;
  const s = tidslinjeVerdi(BILDER, tl.p);
  const fs = 15;
  const W = K.x1 - K.x0;
  const H = K.y1 - K.y0;
  const lagTopp = K.y1 - L.lagH * s.cum;
  // linsen forstørrer hjørnet mellom venstre vegg og bunnen
  const boks: [number, number, number] = [K.x0 + L.lagH * 1.3, K.y1 - L.lagH * 1.3, L.lagH * 1.6];
  const zoom = R / boks[2];
  const iKammer = (x: number, y: number): [number, number] => [boks[0] + (x - linse.cx) / zoom, boks[1] + (y - linse.cy) / zoom];
  const innenfor = (x: number, y: number) => {
    // innenfor kammeret, med avrundet hjørne nede til venstre
    if (x < K.x0 + 3 || y > K.y1 - 3) return false;
    const hx = K.x0 + K.r;
    const hy = K.y1 - K.r;
    if (x < hx && y > hy) return Math.hypot(x - hx, y - hy) < K.r - 4;
    return true;
  };
  const smelteKjerne = blandFarge("#e0612e", "#f1d6a2", s.rest);
  const smelteKant = blandFarge("#9c3a1c", "#c19a6e", s.rest);

  // ---- krystallene ----
  const krystaller = KRYSTALLER.map((k) => {
    const vekst = smooth(clamp(s.nuc * 1.5 - k.frø * 0.5));
    const fall = clamp(s.sink * 1.6 - k.forsink * 0.6);
    const vx = K.x0 + k.vx * W;
    const vy = K.y0 + k.vy * H;
    const bx = K.x0 + k.bunnX * W;
    const by = K.y1 - L.lagH * (1 - k.bunnY) - 4;
    const x = lerp(vx, bx, smooth(fall));
    const y = lerp(vy, by, fall * fall);
    return { k, x, y, vekst, fall };
  });
  const pekVegg = krystaller.reduce((a, b) => (Math.abs(b.k.vy - 0.45) < Math.abs(a.k.vy - 0.45) && b.k.vx < 0.5 ? b : a), krystaller[0]);
  const pekFall = krystaller.reduce((a, b) => (Math.abs(b.fall - 0.5) < Math.abs(a.fall - 0.5) ? b : a), krystaller[0]);

  const labels: Lab[] = [];
  labels.push({
    text: s.rest > 0.6 ? "Lysere restsmelte" : s.cum > 0.5 ? "Restsmelte" : "Smelte",
    x: K.x1,
    y: L.over,
    at: [K.x0 + W * 0.62, K.y0 + H * 0.3],
    badge: [K.x0 + W * 0.62 + 30, L.merke.luft],
    anchor: "end",
    size: fs,
    weight: 700,
    color: "#ffd7b0",
  });
  if (tl.fase === 2) {
    labels.push({
      text: "Olivin og pyroksen krystalliserer først",
      x: L.vert.x0,
      y: L.over,
      at: [pekVegg.x, pekVegg.y],
      badge: [L.vert.x0 + 20, L.merke.luft],
      size: fs,
      weight: 700,
      color: "#cfe0c8",
    });
  }
  if (tl.fase === 3) {
    labels.push({
      text: "Krystallene synker",
      x: L.vert.x0,
      y: L.over,
      at: [pekFall.x, pekFall.y],
      badge: [L.vert.x0 + 20, L.merke.luft],
      size: fs,
      weight: 700,
      color: "#cfe0c8",
    });
  }
  if (s.cum > 0.6) {
    labels.push({
      text: "Mørk kumulasjon",
      x: K.x0 + W * 0.3,
      y: L.under,
      at: [K.x0 + W * 0.3, K.y1 - L.lagH * 0.45],
      badge: small ? [K.x0 + W * 0.3, L.merke.mellom] : undefined,
      anchor: "middle",
      size: fs,
      weight: 700,
      color: "#cfe0c8",
    });
  }
  const lp = (k: Korn): [number, number] => [linse.cx + k.x * R, linse.cy + k.y * R];
  const pekKum = hentPekKum();
  if (s.cum > 0.6) {
    labels.push({
      text: "Mørke krystaller i bunnlaget",
      x: linse.cx,
      y: L.linseUnder,
      at: lp(pekKum),
      badge: small ? [L.merke.side[1], linse.cy + R * 0.6] : undefined,
      anchor: "middle",
      size: fs,
      weight: 700,
      color: "#cfe0c8",
    });
  }

  const keys: Key[] = [
    { text: s.rest > 0.6 ? "Lysere restsmelte" : "Smelte", color: smelteKjerne, kind: "fill" },
    { text: "Olivin", color: FARGE.olivin, kind: "fill", off: s.nuc < 0.3 },
    { text: "Pyroksen", color: FARGE.pyroksen, kind: "fill", off: s.nuc < 0.3 },
    { text: "Mørk kumulasjon", color: FARGE.kumulat, kind: "fill", off: s.cum < 0.5 },
  ];

  const fyllKum = useMemo(() => (k: Korn) => (k.type === 0 ? FARGE.olivin : FARGE.pyroksen), []);

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title={DIFFERENSIERING_TEKST.title}
        heading={heading}
        caption={
          caption ??
          DIFFERENSIERING_TEKST.caption
        }
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={
          <div className={small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"}>
            <TidslinjeKontroller tl={tl} faser={FASER} />
          </div>
        }
        status={STATUS[tl.fase - 1]}
        keys={keys}
        labels={labels}
        notes={["Skjematisk, uten målestokk", "Målerne viser retning, ikke tall"]}
        viewBox={L.vb}
        below={
          <Maalere
            maalere={[
              { navn: "Temperatur", verdi: s.T, ender: ["lav", "høy"], farge: "#e0874a" },
              { navn: "Jern og magnesium i smelten", verdi: s.fe, ender: ["lite", "mye"], farge: "#6f8f6a" },
              { navn: "Silisium i smelten", verdi: s.si, ender: ["lite", "mye"], farge: "#d9cfa8" },
            ]}
          />
        }
      >
        {() => (
          <g
            data-figur="differensiering"
            data-step={tl.fase}
            data-p={tl.p.toFixed(2)}
            data-tilstand={`nuc=${s.nuc.toFixed(2)} sink=${s.sink.toFixed(2)} cum=${s.cum.toFixed(2)} rest=${s.rest.toFixed(2)}`}
          >
            <defs>
              <radialGradient id="diff-smelte" cx="0.5" cy="0.45" r="0.6">
                <stop offset="0" stopColor={smelteKjerne} />
                <stop offset="1" stopColor={smelteKant} />
              </radialGradient>
              <clipPath id="diff-kammer">
                <path d={kammerSti(K)} />
              </clipPath>
            </defs>
            {/* sidebergart rundt kammeret */}
            <rect x={L.vert.x0} y={L.vert.y0} width={L.vert.x1 - L.vert.x0} height={L.vert.y1 - L.vert.y0} rx="10" fill={FARGE.vert} stroke={FARGE.vertKant} />
            <path d={kammerSti(K)} fill="url(#diff-smelte)" />
            <g clipPath="url(#diff-kammer)">
              {s.cum > 0.001 ? <rect x={K.x0} y={lagTopp} width={W} height={K.y1 - lagTopp + 2} fill={FARGE.kumulat} /> : null}
              <g data-nocheck="">
                {krystaller.map(({ k, x, y, vekst }, i) =>
                  vekst > 0.02 ? (
                    <path
                      key={i}
                      d={`M${k.form.map(([fx, fy]) => `${(fx * L.krystall * k.str).toFixed(1)} ${(fy * L.krystall * k.str).toFixed(1)}`).join(" L")} Z`}
                      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${vekst.toFixed(3)})`}
                      fill={k.olivin ? FARGE.olivin : FARGE.pyroksen}
                      stroke={FARGE.kant}
                      strokeWidth="1"
                    />
                  ) : null,
                )}
              </g>
            </g>
            <path d={kammerSti(K)} fill="none" stroke="#2a1a14" strokeWidth="3" />

            <Zoomlinse cx={linse.cx} cy={linse.cy} r={R} fra={[boks[0], boks[1], boks[2], boks[2]]} bakgrunn={FARGE.vert}>
              {/* samme kammer, forstørret rundt hjørnet mellom vegg og bunn */}
              <g transform={`translate(${linse.cx} ${linse.cy}) scale(${zoom.toFixed(4)}) translate(${-boks[0]} ${-boks[1]})`}>
                <path d={kammerSti(K)} fill={smelteKjerne} />
                <g clipPath="url(#diff-kammer)">
                  {s.cum > 0.001 ? <rect x={K.x0} y={lagTopp} width={W} height={K.y1 - lagTopp + 2} fill={FARGE.kumulat} /> : null}
                </g>
                <path d={kammerSti(K)} fill="none" stroke="#2a1a14" strokeWidth={3 / zoom} />
              </g>
              <KornLag
                korn={KUMULAT}
                skala={R}
                pos={(k) => {
                  const x = linse.cx + k.x * R;
                  const y = linse.cy + k.y * R;
                  const [cx0, cy0] = iKammer(x, y);
                  const synlig = cy0 > lagTopp + 4 && innenfor(cx0, cy0) ? 1 : 0;
                  return [x, y, synlig];
                }}
                fyll={fyllKum}
                strek={FARGE.kornKant}
              />
              <g data-nocheck="">
                {krystaller.map(({ k, x, y, vekst }, i) => {
                  if (vekst <= 0.02) return null;
                  const lx = linse.cx + (x - boks[0]) * zoom;
                  const ly = linse.cy + (y - boks[1]) * zoom;
                  if (Math.hypot(lx - linse.cx, ly - linse.cy) > R + L.krystall * zoom * 2) return null;
                  return (
                    <path
                      key={i}
                      d={`M${k.form.map(([fx, fy]) => `${(fx * L.krystall * k.str).toFixed(1)} ${(fy * L.krystall * k.str).toFixed(1)}`).join(" L")} Z`}
                      transform={`translate(${lx.toFixed(1)} ${ly.toFixed(1)}) scale(${(vekst * zoom).toFixed(3)})`}
                      fill={k.olivin ? FARGE.olivin : FARGE.pyroksen}
                      stroke={FARGE.kant}
                      strokeWidth={1 / zoom}
                    />
                  );
                })}
              </g>
            </Zoomlinse>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
