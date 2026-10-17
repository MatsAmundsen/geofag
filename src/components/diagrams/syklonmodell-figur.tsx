/**
 * Den norske syklonmodellen i fire steg (widget Weather24h).
 * Bygget på prosess-kit (felles avspilling). Stegene følger teksten i vaerkart.md, som bygger på
 * NOAA (u.å.-b): 1) en front ligger nesten i ro, 2) et lavtrykk i høyden, i jetstrømmen, passerer over,
 * en bølge vokser og fronten knekker til kaldfront og varmfront med nedbør, 3) kaldfronten tar igjen
 * varmfronten og det dannes en okkludert front, 4) den varme lufta løftes bort fra sentrum, og lavtrykket
 * svekkes. «Mot klokka» og «bølger på fronten går oftest mot øst» står også i teksten.
 * Ingen tall, stedsnavn eller tider (fagsjekk F3). Frontsymbolene følger tabellen i teksten.
 */
import { IsbreFigur, type Key, type Lab } from "./isbre-figur";
import { clamp, lerp, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { TidslinjeKontroller } from "./prosess-figur";
import { SYKLONMODELL_TEKST } from "./syklonmodell-tekst";
import { tidslinjeVerdi, useTidslinje } from "./prosess-kit";

const FASER = ["Front i ro", "Bølge og lavtrykk", "Okkludert front", "Lavtrykket svekkes"];

/** Statustekst per steg, ordrett nær teksten (vaerkart.md, NOAA u.å.-b). */
const STATUS = [
  "1. Først ligger en front nesten i ro, med varm luft på den ene siden og kald luft på den andre.",
  "2. En bølge vokser på fronten når et lavtrykk i høyden, i jetstrømmen, passerer over. Fronten knekker til en kaldfront og en varmfront, og det begynner å falle nedbør langs frontene.",
  "3. Bølgen blir et modent lavtrykk. Kaldfronten går fortere enn varmfronten og tar den igjen. Da dannes en okkludert front.",
  "4. Den varme, fuktige lufta løftes bort fra sentrum. Uten den svekkes lavtrykket.",
];

/**
 * Tilstand ved slutten av hvert steg (indeks = p).
 * a: bølgen (0 = rett front, 1 = full bølge), o: okklusjon, svak: lavtrykket svekkes,
 * dx: hvor langt systemet har flyttet seg mot øst, hu/hv: lavtrykket i høyden (posisjon/synlighet),
 * regn: nedbør langs frontene, vis: luftmassene.
 */
const BILDER = [
  { a: 0, o: 0, svak: 0, dx: 0, hu: 0, hv: 0, regn: 0, vis: 0.35 },
  { a: 0, o: 0, svak: 0, dx: 0, hu: 0.12, hv: 0.35, regn: 0, vis: 1 },
  { a: 1, o: 0, svak: 0, dx: 60, hu: 0.5, hv: 1, regn: 1, vis: 1 },
  { a: 1, o: 1, svak: 0, dx: 110, hu: 0.82, hv: 0.45, regn: 1, vis: 1 },
  { a: 1, o: 1.5, svak: 1, dx: 150, hu: 1, hv: 0, regn: 0.45, vis: 1 },
];

const FARGE = {
  kald: "#14263a",
  varm: "#3a2a1c",
  varmFront: "#d07a7a",
  kaldFront: "#8eb4d4",
  okkl: "#b98be0",
  regn: "#4fa3c7",
  hoyde: "#b8c4ce",
  lav: "#e8a0a0",
};

type P = [number, number];
type Tilstand = (typeof BILDER)[number];

function bez(p0: P, p1: P, p2: P, p3: P, t: number): P {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

type Kurve = [P, P, P, P];
const d = (k: Kurve) =>
  `M${k[0][0].toFixed(1)} ${k[0][1].toFixed(1)} C${k[1][0].toFixed(1)} ${k[1][1].toFixed(1)} ${k[2][0].toFixed(1)} ${k[2][1].toFixed(1)} ${k[3][0].toFixed(1)} ${k[3][1].toFixed(1)}`;

/** Geometrien for én tilstand. Alt regnes ut fra tilstanden, så hver rute bare gir nye tall. */
function geo(s: Tilstand) {
  const { a, o } = s;
  const c = 400 + s.dx;
  const yc = lerp(290, 190, a);
  const L: P = [c - 30 * o, yc - 12 * o];
  const T: P = [c + 120 * o, yc + 70 * o];
  const E: P = [c + lerp(470, 330, a), lerp(290, 340, a)];
  const W: P = [c + lerp(-350, -190, a), lerp(290, 480, a)];
  const varm: Kurve = [
    T,
    [T[0] + lerp(150, 90, a), T[1]],
    [E[0] + lerp(-150, -90, a), E[1] + lerp(0, -45, a)],
    E,
  ];
  const kald: Kurve = [
    T,
    [T[0] + lerp(-120, -15, a), T[1] + lerp(0, 80, a)],
    [W[0] + lerp(120, 70, a), W[1] + lerp(0, -60, a)],
    W,
  ];
  const mid: P = [(L[0] + T[0]) / 2 - 8, (L[1] + T[1]) / 2 + 14];
  const okkl: Kurve = [L, mid, mid, T];
  return { c, L, T, E, W, varm, kald, okkl };
}

/** Punkter med fast avstand langs en kurve, med tangent og venstre normal (nord når kurven går mot øst). */
function langs(k: Kurve, gap: number, start = gap / 2) {
  const N = 48;
  const pts: P[] = [];
  for (let i = 0; i <= N; i++) pts.push(bez(k[0], k[1], k[2], k[3], i / N));
  const out: { p: P; t: P; n: P }[] = [];
  let acc = 0;
  let neste = start;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    const l = Math.hypot(dx, dy);
    if (l < 1e-6) continue;
    while (acc + l >= neste) {
      const f = (neste - acc) / l;
      const t: P = [dx / l, dy / l];
      out.push({ p: [pts[i - 1][0] + dx * f, pts[i - 1][1] + dy * f], t, n: [t[1], -t[0]] });
      neste += gap;
    }
    acc += l;
  }
  return out;
}

function halvsirkel(p: P, t: P, n: P, r: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 8; i++) {
    const f = (Math.PI * i) / 8;
    pts.push(
      `${(p[0] - t[0] * r * Math.cos(f) + n[0] * r * Math.sin(f)).toFixed(1)},${(p[1] - t[1] * r * Math.cos(f) + n[1] * r * Math.sin(f)).toFixed(1)}`,
    );
  }
  return pts.join(" ");
}

function trekant(p: P, t: P, n: P, s: number) {
  const q = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;
  return [
    q(p[0] - t[0] * s, p[1] - t[1] * s),
    q(p[0] + n[0] * s * 1.5, p[1] + n[1] * s * 1.5),
    q(p[0] + t[0] * s, p[1] + t[1] * s),
  ].join(" ");
}

/** Én front med symboler. side = +1: symbolene på venstre side av kurven, −1: høyre. */
function Front({
  k,
  farge,
  type,
  side = 1,
  opacity = 1,
}: {
  k: Kurve;
  farge: string;
  type: "varm" | "kald" | "okkl" | "ro";
  side?: 1 | -1;
  opacity?: number;
}) {
  if (opacity <= 0.01) return null;
  const pkt = langs(k, 46);
  return (
    <g opacity={opacity < 0.99 ? opacity : undefined}>
      <path
        d={d(k)}
        fill="none"
        stroke={type === "ro" ? "#c9a0a0" : farge}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {pkt.map(({ p, t, n }, i) => {
        const nn: P = [n[0] * side, n[1] * side];
        if (type === "varm")
          return <polygon key={i} points={halvsirkel(p, t, nn, 8)} fill={farge} />;
        if (type === "kald") return <polygon key={i} points={trekant(p, t, nn, 8)} fill={farge} />;
        if (type === "okkl")
          return (
            <polygon
              key={i}
              points={i % 2 ? halvsirkel(p, t, nn, 8) : trekant(p, t, nn, 8)}
              fill={farge}
            />
          );
        // front i ro: røde halvsirkler mot den kalde lufta, blå trekanter mot den varme, annenhver
        return i % 2 ? (
          <polygon key={i} points={halvsirkel(p, t, nn, 8)} fill={FARGE.varmFront} />
        ) : (
          <polygon key={i} points={trekant(p, t, [-nn[0], -nn[1]], 8)} fill={FARGE.kaldFront} />
        );
      })}
    </g>
  );
}

function etiketter(fase: number): Lab[] {
  const g = geo(BILDER[fase]);
  const s = BILDER[fase];
  const out: Lab[] = [
    { text: "Kald luft", x: 70, y: 200, color: FARGE.kaldFront, weight: 800 },
    { text: "Varm luft", x: 760, y: 470, color: "#e0b48a", weight: 800 },
  ];
  if (fase === 1) {
    out.push({
      text: "Stasjonær front (nesten i ro)",
      x: g.c - 120,
      y: 340,
      at: [g.c - 30, 298],
      color: "#e8eef2",
    });
  }
  if (fase >= 2) {
    const v = bez(...g.varm, 0.55);
    const k = bez(...g.kald, 0.5);
    out.push({
      text: "Varmfront",
      x: v[0] + 30,
      y: v[1] - 40,
      at: [v[0], v[1] - 6],
      color: FARGE.varmFront,
      weight: 800,
    });
    out.push({
      text: "Kaldfront",
      x: k[0] - 150,
      y: k[1] + 10,
      at: [k[0] - 8, k[1]],
      color: FARGE.kaldFront,
      weight: 800,
    });
    out.push({
      text: "Mot klokka",
      x: g.L[0] - 150,
      y: g.L[1] - 40,
      at: [g.L[0] - 40, g.L[1] - 18],
      color: "#e8eef2",
    });
  }
  if (fase === 2) {
    const hx = lerp(g.c - 260, g.c + 260, s.hu);
    out.push({
      text: "Lavtrykk i høyden (jetstrømmen)",
      x: hx + 70,
      y: 40,
      at: [hx + 36, 88],
      color: FARGE.hoyde,
      weight: 700,
    });
    const v = bez(...g.varm, 0.75);
    out.push({
      text: "Nedbør langs frontene",
      x: v[0] + 40,
      y: v[1] - 112,
      at: [v[0] - 4, v[1] - 24],
      color: "#9fd3e8",
    });
  }
  if (fase >= 3) {
    const o = bez(...g.okkl, 0.5);
    out.push({
      text: "Okkludert front",
      x: o[0] + 40,
      y: o[1] - 34,
      at: [o[0] + 6, o[1] - 4],
      color: FARGE.okkl,
      weight: 800,
    });
  }
  if (fase === 4) {
    out.push({
      text: "Varm luft løftes bort fra sentrum",
      x: 930,
      y: g.T[1] + 95,
      anchor: "end",
      at: [g.T[0] + 8, g.T[1] + 22],
      color: "#e0b48a",
    });
    out.push({
      text: "Lavtrykket svekkes",
      x: g.L[0] - 40,
      y: g.L[1] - 70,
      at: [g.L[0], g.L[1] - 26],
      color: FARGE.lav,
    });
  }
  out.push({
    text: "Bølgen går oftest mot øst",
    x: 742,
    y: 512,
    anchor: "end",
    color: "#6fb3b8",
    weight: 700,
  });
  return out;
}

/** Etikettene står fast gjennom hvert steg (nye objekter bare når steget skifter). */
const ETIKETTER = FASER.map((_, i) => etiketter(i + 1));

const KEYS: Key[] = [
  { text: "Stasjonær front", color: "#c9a0a0", kind: "line" },
  { text: "Varmfront", color: FARGE.varmFront, kind: "line" },
  { text: "Kaldfront", color: FARGE.kaldFront, kind: "line" },
  { text: "Okkludert front", color: FARGE.okkl, kind: "line" },
  { text: "Nedbør", color: FARGE.regn, kind: "fill" },
  { text: "Jetstrømmen og lavtrykket i høyden", color: FARGE.hoyde, kind: "dash" },
];

const NOTES = ["Skjematisk, sett ovenfra, nord opp", "Nordlige halvkule"];

export function SyklonmodellFigur({
  heading = SYKLONMODELL_TEKST.heading,
  caption,
}: {
  heading?: string;
  caption?: React.ReactNode;
}) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const tl = useTidslinje({
    antall: FASER.length,
    synlig: visible,
    faseMs: 3600,
    holdMs: 1800,
    element: ref,
  });
  const s = tidslinjeVerdi(BILDER, tl.p);
  const g = geo(s);
  const k = clamp((s.a - 0.15) / 0.5);
  const okklVis = clamp(s.o * 3);

  // varm luft: under fronten (sør), og mellom kaldfronten og varmfronten etter at fronten har knekt
  const varmFlate = `M${g.W[0].toFixed(1)} ${g.W[1].toFixed(1)} C${g.kald[2][0].toFixed(1)} ${g.kald[2][1].toFixed(1)} ${g.kald[1][0].toFixed(1)} ${g.kald[1][1].toFixed(1)} ${g.T[0].toFixed(1)} ${g.T[1].toFixed(1)} C${g.varm[1][0].toFixed(1)} ${g.varm[1][1].toFixed(1)} ${g.varm[2][0].toFixed(1)} ${g.varm[2][1].toFixed(1)} ${g.E[0].toFixed(1)} ${g.E[1].toFixed(1)} L950 ${g.E[1].toFixed(1)} L950 535 L${(g.W[0] - 20).toFixed(1)} 535 Z`;

  // jetstrømmen: bukter seg ned der lavtrykket i høyden er
  const hx = lerp(g.c - 260, g.c + 260, s.hu);
  const jet: string[] = [];
  for (let x = 30; x <= 930; x += 30) {
    const y = 70 + 46 * s.hv * Math.exp(-(((x - hx) / 120) ** 2));
    jet.push(`${x === 30 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }

  // isobarer rundt lavtrykket uten tall: dypere i steg 2–3, den innerste forsvinner når lavtrykket svekkes
  const dyp = s.a;
  const r1 = 34 + 26 * dyp;
  const r2 = 70 + 50 * dyp;

  // mot klokka (sett ovenfra): bue rundt L med pil, sweep-flag 0 = mot klokka på skjermen
  const rr = 40;
  const vinkel = (deg: number): P => [
    g.L[0] + rr * Math.cos((deg * Math.PI) / 180),
    g.L[1] - rr * Math.sin((deg * Math.PI) / 180),
  ];
  const b0 = vinkel(300);
  const b1 = vinkel(210);
  const rot = `M${b0[0].toFixed(1)} ${b0[1].toFixed(1)} A${rr} ${rr} 0 1 0 ${b1[0].toFixed(1)} ${b1[1].toFixed(1)}`;

  const fase = tl.fase;
  return (
    <div className="[&_ol]:min-h-[15.5rem] [&_ol]:content-start">
      <IsbreFigur
        svgRef={ref}
        title={SYKLONMODELL_TEKST.title}
        heading={heading}
        caption={caption ?? SYKLONMODELL_TEKST.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={<TidslinjeKontroller tl={tl} faser={FASER} />}
        status={
          <span className="block h-[7.5rem] min-[480px]:h-[5rem] min-[900px]:h-[3.75rem]">
            {STATUS[fase - 1]}
          </span>
        }
        keys={KEYS}
        labels={ETIKETTER[fase - 1]}
        notes={NOTES}
        viewBox="0 0 960 540"
      >
        {({ m }) => (
          <g data-figur="syklonmodell" data-step={fase} data-p={tl.p.toFixed(2)}>
            {/* luftmassene */}
            <rect x="10" y="10" width="940" height="525" rx="10" fill={FARGE.kald} />
            <path d={varmFlate} fill={FARGE.varm} opacity={s.vis} />

            {/* jetstrømmen og lavtrykket i høyden */}
            {s.hv > 0.02 ? (
              <g opacity={s.hv < 0.99 ? s.hv : undefined} data-nocheck="">
                <path
                  d={jet.join(" ")}
                  fill="none"
                  stroke={FARGE.hoyde}
                  strokeWidth="3"
                  strokeDasharray="10 7"
                  markerEnd={`url(#${m.fg})`}
                />
                <ellipse
                  cx={hx}
                  cy={102}
                  rx={44}
                  ry={24}
                  fill="none"
                  stroke={FARGE.hoyde}
                  strokeWidth="2"
                  strokeDasharray="6 5"
                />
                <text
                  x={hx}
                  y={109}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="800"
                  fill={FARGE.hoyde}
                >
                  L
                </text>
              </g>
            ) : null}

            {/* nedbør langs frontene */}
            {s.regn > 0.02 ? (
              <g opacity={s.regn < 0.99 ? s.regn : undefined}>
                <path
                  d={d(g.varm)}
                  transform="translate(0,-20)"
                  fill="none"
                  stroke={FARGE.regn}
                  strokeOpacity="0.3"
                  strokeWidth="38"
                  strokeLinecap="round"
                />
                <path
                  d={d(g.kald)}
                  fill="none"
                  stroke={FARGE.regn}
                  strokeOpacity="0.3"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                {s.o > 0.05 ? (
                  <path
                    d={d(g.okkl)}
                    fill="none"
                    stroke={FARGE.regn}
                    strokeOpacity="0.3"
                    strokeWidth="30"
                    strokeLinecap="round"
                  />
                ) : null}
              </g>
            ) : null}

            {/* isobarer rundt lavtrykket, uten tall */}
            {dyp > 0.05 ? (
              <g
                fill="none"
                stroke="#9fb0bd"
                strokeWidth="1.4"
                opacity={dyp < 0.99 ? dyp : undefined}
              >
                <ellipse cx={g.L[0]} cy={g.L[1]} rx={r1 * 1.3} ry={r1} opacity={1 - s.svak} />
                <ellipse
                  cx={g.L[0] + 10}
                  cy={g.L[1] + 6}
                  rx={r2 * 1.35}
                  ry={r2}
                  opacity={1 - 0.4 * s.svak}
                />
              </g>
            ) : null}

            {/* frontene */}
            <Front k={g.kald} farge={FARGE.kaldFront} type="ro" side={-1} opacity={1 - k} />
            <Front k={g.varm} farge={FARGE.varmFront} type="ro" opacity={1 - k} />
            <Front k={g.kald} farge={FARGE.kaldFront} type="kald" opacity={k} />
            <Front k={g.varm} farge={FARGE.varmFront} type="varm" opacity={k} />
            {s.o > 0.02 ? (
              <Front k={g.okkl} farge={FARGE.okkl} type="okkl" opacity={okklVis} />
            ) : null}

            {/* lavtrykket og sirkulasjonen mot klokka */}
            {k > 0.02 ? (
              <g opacity={(k < 0.99 ? k : 1) * (1 - 0.3 * s.svak)}>
                <path
                  d={rot}
                  fill="none"
                  stroke="#e8eef2"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  strokeDashoffset={tl.reduced ? 0 : (tl.sek * 14) % 14}
                  markerEnd={`url(#${m.fg})`}
                />
                <text
                  x={g.L[0]}
                  y={g.L[1] + 11}
                  textAnchor="middle"
                  fontSize={34 - 8 * s.svak}
                  fontWeight="900"
                  fill={FARGE.lav}
                  stroke="#0f171c"
                  strokeWidth={6}
                  paintOrder="stroke"
                >
                  L
                </text>
              </g>
            ) : null}

            {/* bølgen går oftest mot øst */}
            <g transform="translate(560, 506)">
              <path
                d="M200 0 L350 0"
                stroke="#6fb3b8"
                strokeWidth="3.5"
                markerEnd={`url(#${m.teal})`}
              />
            </g>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
