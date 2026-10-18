/**
 * L · PolarFrontCyclone: polarfrontsyklonens livsløp sett ovenfra, med et lite snitt i steg 2–4.
 * Følger «Polarfrontsyklonen» i lokale-vaersystemer.md (SNL, u.å.-a; NOAA, u.å.-b).
 *
 * Fagsjekk (Geo): kaldfronten tar igjen varmfronten, okklusjonen starter ved sentrum, kald luft på
 * polsiden og varm luft på ekvatorsiden. Steg 4 viser at den varme lufta løftes fra bakken (bort fra sentrum) og
 * at lavtrykket svekkes og fylles ut. At okklusjonen vokser, vises bare i animasjonen, ikke i en etikett.
 * Steg 4 kan slås sammen med steg 3 med SLAA_SAMMEN_STEG_3_OG_4.
 */
import { useId, type ReactNode } from "react";
import { clamp, lerp, smooth, smoothPath } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { SYKLON_TEKST } from "./lokale-tekst";
import { F, LokaleRamme, medKilde, useLokaleTidslinje, type Hinder, type Lab } from "./lokale-kit";

/** Sett til true for å slå sammen steg 3 og 4 (okklusjonen starter + varm luft løftet bort). */
const SLAA_SAMMEN_STEG_3_OG_4: boolean = false;

type Bilde = { bolge: number; fronter: number; okkl: number; loft: number; fyll: number; x: number };
type Steg = { fase: string; status: ReactNode; bilde: Bilde };

const STEG_ALLE: Steg[] = [
  {
    fase: "Bølge på fronten",
    status: medKilde(
      "Polarfronten skiller kald luft fra høye breddegrader fra varm luft fra subtropene, vanligvis mellom 40° og 70° bredde. Lavtrykket starter som en bølge på fronten.",
      "Store norske leksikon, u.å.-a; NOAA, u.å.-b",
    ),
    bilde: { bolge: 1, fronter: 0.3, okkl: 0, loft: 0, fyll: 0, x: 0.1 },
  },
  {
    fase: "Varmfront og kaldfront",
    status: medKilde("Lavtrykket får en varmfront og en kaldfront.", "NOAA, u.å.-b"),
    bilde: { bolge: 1, fronter: 1, okkl: 0, loft: 0, fyll: 0, x: 0.3 },
  },
  {
    fase: "Okklusjonen starter",
    status: medKilde("Kaldfronten tar igjen varmfronten og danner en okkludert front.", "NOAA, u.å.-b"),
    bilde: { bolge: 1, fronter: 1, okkl: 0.3, loft: 0.35, fyll: 0, x: 0.5 },
  },
  {
    fase: "Varm luft løftes fra bakken",
    status: medKilde("Den varme lufta løftes fra bakken og bort fra sentrum, og lavtrykket svekkes og fylles ut.", "NOAA, u.å.-b"),
    bilde: { bolge: 1, fronter: 1, okkl: 0.55, loft: 1, fyll: 0.45, x: 0.7 },
  },
  {
    fase: "Fylles ut",
    status: medKilde(
      "Lavtrykket er fylt ut. Langs polarfronten vandrer lavtrykk mot øst, omtrent med vinden i høyden, og de gir mye av nedbøren i den tempererte sonen.",
      "Store norske leksikon, u.å.-a; NOAA, u.å.-b",
    ),
    bilde: { bolge: 1, fronter: 0.25, okkl: 0.6, loft: 1, fyll: 1, x: 1 },
  },
];

const STEG: Steg[] = SLAA_SAMMEN_STEG_3_OG_4
  ? [
      STEG_ALLE[0],
      STEG_ALLE[1],
      {
        fase: "Okklusjon",
        status: medKilde(
          "Kaldfronten tar igjen varmfronten og danner en okkludert front. Den varme lufta løftes fra bakken, og lavtrykket fylles ut.",
          "NOAA, u.å.-b",
        ),
        bilde: STEG_ALLE[3].bilde,
      },
      STEG_ALLE[4],
    ]
  : STEG_ALLE;

const FASER = STEG.map((s) => s.fase);
const START: Bilde = { bolge: 0, fronter: 0, okkl: 0, loft: 0, fyll: 0, x: 0 };
const BILDER: Bilde[] = [START, ...STEG.map((s) => s.bilde)];
/** Fasen der okklusjonen starter (1-basert). */
const OKKL_FASE = 3;

/* ---------- geometri ---------- */

const FRONT_Y = 285;
type Pkt = [number, number];
const add = (a: Pkt, b: Pkt, k = 1): Pkt => [a[0] + b[0] * k, a[1] + b[1] * k];

/** Kvadratisk bezier som punkter (for symboler og bånd). */
function bezier(a: Pkt, c: Pkt, b: Pkt, n = 24): Pkt[] {
  const out: Pkt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    out.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]);
  }
  return out;
}
const stiAv = (p: Pkt[]) => p.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

/** Deler en polyline i like lange biter og gir midtpunkt og retning. */
function langs(p: Pkt[], avstand: number) {
  const out: { x: number; y: number; dx: number; dy: number }[] = [];
  let rest = avstand / 2;
  for (let i = 1; i < p.length; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    if (len < 1e-6) continue;
    let pos = rest;
    while (pos <= len) {
      const t = pos / len;
      out.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, dx: (x1 - x0) / len, dy: (y1 - y0) / len });
      pos += avstand;
    }
    rest = pos - len;
  }
  return out;
}

/** Frontsymboler: trekanter (kald), halvsirkler (varm) eller vekselvis (okkludert), på siden `side`. */
function symboler(p: Pkt[], type: "kald" | "varm" | "okkl", side: (nx: number, ny: number) => boolean) {
  const r = 9;
  return langs(p, 34)
    .map(({ x, y, dx, dy }, i) => {
      let nx = -dy;
      let ny = dx;
      if (!side(nx, ny)) {
        nx = -nx;
        ny = -ny;
      }
      const tri = type === "kald" || (type === "okkl" && i % 2 === 0);
      if (tri) {
        const a = [x - dx * r, y - dy * r];
        const b = [x + dx * r, y + dy * r];
        const c = [x + nx * r * 1.4, y + ny * r * 1.4];
        return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${c[0].toFixed(1)} ${c[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)} Z`;
      }
      const a = [x - dx * r, y - dy * r];
      const b = [x + dx * r, y + dy * r];
      const sweep = nx * dy - ny * dx > 0 ? 1 : 0; // halvsirkelen på normalsiden: i fartsretningen, mot den kalde lufta
      return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} A${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)} Z`;
    })
    .join(" ");
}

function geometri(s: Bilde) {
  const cx = lerp(330, 560, s.x);
  const cy = FRONT_Y - 46 * smooth(s.bolge);
  const C: Pkt = [cx, cy];
  const f = smooth(s.fronter);
  // varmfront mot øst-sørøst, kaldfront mot sørvest; lengden vokser med fronter
  const W = bezier(C, add(C, [130, 6]), add(C, [lerp(120, 250, f), lerp(28, 96, f)]));
  const K0 = bezier(C, add(C, [-10, 110]), add(C, [lerp(-60, -120, f), lerp(60, 210, f)]));
  // okklusjon: trippelpunktet flytter seg ut langs varmfronten fra sentrum
  const n = Math.round(clamp(s.okkl) * (W.length - 1) * 0.85);
  const T = W[n];
  const O = W.slice(0, n + 1);
  const Wv = W.slice(n);
  const K = K0.map((p, i) => add(p, [T[0] - C[0], T[1] - C[1]], 1 - i / (K0.length - 1)) as Pkt);
  return { C, T, O, W: Wv, K };
}

/** Bølget polarfront vest og øst for lavtrykket. */
function polarfront(g: ReturnType<typeof geometri>, bolge: number): { vest: Pkt[]; ost: Pkt[] } {
  const k = g.K[g.K.length - 1];
  const w = g.W[g.W.length - 1];
  const vest = bezier([-20, FRONT_Y + 30], [k[0] - 120, FRONT_Y + 30 + 10 * bolge], k, 12);
  const ost = bezier(w, [w[0] + 120, FRONT_Y + 10], [980, FRONT_Y - 10], 12);
  return { vest, ost };
}

/** Stiplet bue mot klokka rundt sentrum, med pilspiss nederst (der lufta går mot øst). */
const SIRK_RX = 84;
const SIRK_RY = 62;
function sirkulasjon(C: Pkt) {
  const rx = SIRK_RX;
  const ry = SIRK_RY;
  const p = (gr: number): Pkt => {
    const t = (gr * Math.PI) / 180;
    return [C[0] + rx * Math.cos(t), C[1] - ry * Math.sin(t)];
  };
  const a = p(-30);
  const b = p(262);
  const d = `M${a[0].toFixed(1)} ${a[1].toFixed(1)} A${rx} ${ry} 0 1 0 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  const [x, y] = p(270);
  const pil = `M${(x + 9).toFixed(1)} ${y.toFixed(1)} L${(x - 5).toFixed(1)} ${(y - 7).toFixed(1)} L${(x - 5).toFixed(1)} ${(y + 7).toFixed(1)} Z`;
  const punkter: Pkt[] = [];
  for (let gr = -30; gr <= 262; gr += 8) punkter.push(p(gr));
  punkter.push(b, [x + 9, y]);
  return { d, pil, punkter };
}

function Bevegelse({ fra, vinkel, lengde, farge }: { fra: Pkt; vinkel: number; lengde: number; farge: string }) {
  return (
    <g transform={`translate(${fra[0].toFixed(1)} ${fra[1].toFixed(1)}) rotate(${vinkel})`}>
      <line x1="0" y1="0" x2={lengde - 10} y2="0" stroke={farge} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${lengde} 0 L${lengde - 13} -7 L${lengde - 13} 7 Z`} fill={farge} />
    </g>
  );
}

/* ---------- snitt (steg 2–4) ---------- */

const SNITT = { X: 700, Y: 382, B: 236, H: 128 };
/** viewBox for snittet alene (smal skjerm: eget panel under kartet). */
const SNITT_VB = `${SNITT.X - 8} ${SNITT.Y - 28} ${SNITT.B + 16} ${SNITT.H + 36}`;

function Snitt({ loft, op }: { loft: number; op: number }) {
  if (op < 0.02) return null;
  const { X, Y, B, H } = SNITT;
  const bunn = Y + H;
  const midt = X + B / 2;
  // kalde kiler fra hver side; de møtes ved bakken når den varme lufta løftes
  const gap = lerp(70, 0, smooth(loft));
  const l = smooth(loft);
  const loftY = bunn - 64;
  return (
    <g opacity={op < 0.99 ? op : undefined} data-nocheck="">
      <rect x={X - 8} y={Y - 28} width={B + 16} height={H + 36} rx="8" fill="#0f171c" opacity="0.85" />
      <text x={X} y={Y - 9} fontSize="15" fontWeight="800" fill={F.tekst}>
        Snitt gjennom fronten
      </text>
      <rect x={X} y={Y} width={B} height={H} fill={F.varmfront} opacity="0.35" />
      <path d={`M${X} ${bunn} L${X} ${Y + 30} L${midt - gap / 2} ${lerp(bunn, loftY, l)} L${midt - gap / 2} ${bunn} Z`} fill={F.kaldfront} opacity="0.75" />
      <path d={`M${X + B} ${bunn} L${X + B} ${Y + 64} L${midt + gap / 2} ${lerp(bunn, loftY, l)} L${midt + gap / 2} ${bunn} Z`} fill={F.kaldfront} opacity="0.75" />
      <text x={X + 14} y={bunn - 12} fontSize="14" fontWeight="800" fill={F.tekst}>
        Kald
      </text>
      <text x={X + B - 14} y={bunn - 12} fontSize="14" fontWeight="800" fill={F.tekst} textAnchor="end">
        Kald
      </text>
      <text x={midt} y={Y + 22} fontSize="14" fontWeight="800" fill={F.tekst} textAnchor="middle">
        Varm
      </text>
    </g>
  );
}

export function SyklonFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length, 3800, 1800);
  const s = tidslinjeVerdi(BILDER, tl.p);
  const fase = tl.fase;
  const g = geometri(s);
  const pf = polarfront(g, smooth(s.bolge));
  const fr = smooth(s.fronter);
  const dybde = smooth(s.bolge) * (1 - 0.8 * smooth(s.fyll));
  const snittOp = fase >= 2 && fase <= (SLAA_SAMMEN_STEG_3_OG_4 ? 3 : 4) ? 1 : 0;
  const varmSektor = [...g.W, ...[...g.K].reverse()];
  const sirk = sirkulasjon(g.C);
  const sirkOp = clamp(dybde * 1.4) * 0.8;
  const bevOp = fase >= 2 && fase <= (SLAA_SAMMEN_STEG_3_OG_4 ? 3 : 4) ? fr : 0;
  const frontOp = clamp(0.25 + fr);
  const pfOp = 0.5 * (1 - fr) + 0.2;
  // isobarene har sentrum i lavtrykket; den innerste går innenfor sirkulasjonsbuen
  const isobarer = [50, 104, 150, 204].map((r, i) => ({
    rx: r * 1.25 * (1 + 0.4 * s.fyll),
    ry: r * (1 + 0.4 * s.fyll),
    op: clamp(dybde * 1.6 - i * 0.3) * 0.75,
  }));
  const bevegelse = [
    { fra: add(g.K[12], [22, -4]), vinkel: 12, lengde: 78, farge: F.kaldfront },
    { fra: add(g.W[Math.min(g.W.length - 1, 8)], [6, -26]), vinkel: -28, lengde: 34, farge: F.varmfront },
  ];

  // nummerskiltene på smal skjerm skal ligge utenfor frontene (med symboler), buen, isobarene og pilene
  const hinder: Hinder[] = [
    { p: g.W, b: 30 },
    { p: g.K, b: 30 },
    { p: pf.vest, b: 3 },
    { p: pf.ost, b: 3 },
  ];
  if (g.O.length > 1) hinder.push({ p: g.O, b: 30 });
  // skybåndene langs frontene og «L» i sentrum
  if (0.12 * fr > 0.02) hinder.push({ p: g.W.map(([x, y]) => [x, y - 18] as Pkt), b: 46 }, { p: g.K, b: 22 });
  if (g.O.length > 1 && 0.14 * fr > 0.02) hinder.push({ p: g.O, b: 40 });
  hinder.push({ boks: [g.C[0] - 22 - 18, g.C[1] - 40, g.C[0] - 22 + 18, g.C[1]] });
  if (sirkOp > 0.1) hinder.push({ p: sirk.punkter, b: 4 });
  for (const iso of isobarer) if (iso.op > 0.15) hinder.push({ ellipse: [g.C[0], g.C[1], iso.rx, iso.ry], b: 1.6 });
  if (bevOp > 0.1)
    for (const bv of bevegelse) {
      const t = (bv.vinkel * Math.PI) / 180;
      hinder.push({ p: [bv.fra, [bv.fra[0] + Math.cos(t) * bv.lengde, bv.fra[1] + Math.sin(t) * bv.lengde]], b: 8 });
    }
  if (fase === 1 || fase === FASER.length) hinder.push({ p: [[800, 92], [900, 92]], b: 12 });

  const labels: Lab[] = [];
  const lab = (text: string, x: number, y: number, at: [number, number], color: string, anchor: Lab["anchor"] = "middle") =>
    labels.push({ text, x, y, at, color, anchor, size: 16, weight: 700, halo: F.halo, badge: [x, y - 5] });
  lab("Kald luft fra høye breddegrader", 160, 50, [160, 70], F.kald);
  lab("Varm luft fra subtropene", 150, 500, [150, 480], F.varm);
  if (fase === 1) {
    lab("Polarfronten", 120, 220, [120, FRONT_Y + 26], F.tekst);
    lab("Bølge", g.C[0], g.C[1] - 70, [g.C[0], g.C[1] - 30], F.tekst);
  } else if (fase === 2) {
    lab("Varmfront", 730, 236, [g.W[12][0], g.W[12][1] - 12], F.varmfront);
    lab("Kaldfront", 420, 456, [g.K[16][0] - 12, g.K[16][1]], F.kaldfront);
    lab("Kaldfronten tar igjen varmfronten", 290, 296, [g.K[12][0] - 8, g.K[12][1]], F.kaldfront, "end");
  } else if (fase === OKKL_FASE) {
    lab("Okkludert front", g.C[0] + 30, g.C[1] - 70, [g.O[Math.floor(g.O.length / 2)][0], g.O[Math.floor(g.O.length / 2)][1] - 10], F.okkludert);
  } else if (fase === OKKL_FASE + 1 && !SLAA_SAMMEN_STEG_3_OG_4) {
    lab("Varm luft løftes fra bakken", 820, 170, [g.T[0] + 20, g.T[1] - 14], F.varm, "end");
    lab("Lavtrykket svekkes", g.C[0] - 120, g.C[1] - 80, [g.C[0] - 12, g.C[1] - 44], F.tekst);
  } else {
    lab("Lavtrykket fylles ut", g.C[0], g.C[1] - 90, [g.C[0], g.C[1] - 30], F.tekst);
  }
  if (fase === 1 || fase === FASER.length) lab("Vandrer mot øst", 860, 60, [900, 92], F.tekst, "end");

  return (
    <LokaleRamme
      tekst={SYKLON_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={STEG[fase - 1].status}
      svgRef={ref}
      labels={labels}
      data="syklon"
      etikettRader={5}
      notes={[]}
      hinder={hinder}
      skiltNokkel={`${fase}|${Math.round(tl.p * 4)}`}
      keys={[
        { text: "Kaldfront", color: F.kaldfront, kind: "front", front: "kald" },
        { text: "Varmfront", color: F.varmfront, kind: "front", front: "varm" },
        { text: "Okkludert front", color: F.okkludert, kind: "front", front: "okkl" },
        { text: "Isobarer", color: F.retur, kind: "line" },
      ]}
      below={(smal) =>
        smal ? (
          // smal skjerm: snittet som eget panel under kartet, så teksten blir lesbar. Plassen holdes i alle steg.
          <svg
            viewBox={SNITT_VB}
            className="mx-auto mt-2 block h-auto w-full max-w-[17rem]"
            aria-hidden="true"
            data-snitt-panel=""
            style={{ visibility: snittOp ? "visible" : "hidden" }}
          >
            <Snitt loft={s.loft} op={1} />
          </svg>
        ) : null
      }
    >
      {({ narrow }) => (
        <>
          <defs>
            <linearGradient id={`${uid}-luft`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1c3a5c" />
              <stop offset="0.5" stopColor="#24394a" />
              <stop offset="1" stopColor="#4a2d2a" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="960" height="540" fill={`url(#${uid}-luft)`} data-nocheck="" />
          {/* varm sektor */}
          {fr > 0.02 ? <path d={`${stiAv(varmSektor)} Z`} fill={F.varmfront} opacity={0.22 * fr} data-nocheck="" /> : null}
          {/* skybånd langs frontene */}
          <g fill="none" strokeLinecap="round" data-nocheck="">
            <path d={stiAv(g.W)} stroke={F.sky} strokeWidth="46" opacity={0.12 * fr} transform="translate(0 -18)" />
            <path d={stiAv(g.K)} stroke={F.sky} strokeWidth="22" opacity={0.14 * fr} />
            {g.O.length > 1 ? <path d={stiAv(g.O)} stroke={F.sky} strokeWidth="40" opacity={0.14 * fr} /> : null}
          </g>
          {/* isobarer */}
          <g fill="none" stroke={F.retur} strokeWidth="1.6" data-nocheck="">
            {isobarer.map((iso, i) => (
              <ellipse key={i} cx={g.C[0]} cy={g.C[1]} rx={iso.rx} ry={iso.ry} opacity={iso.op} />
            ))}
          </g>
          {/* sirkulasjon mot klokka rundt lavtrykket (uten etikett). Negativ dashoffset flytter strekene
              framover langs buen, altså mot klokka. sek kommer fra felles avspilling, så pause stopper den. */}
          {sirkOp > 0.02 ? (
            <g opacity={sirkOp}>
              <path d={sirk.d} fill="none" stroke={F.tekst} strokeWidth="2.5" strokeDasharray="9 7" strokeDashoffset={-((tl.sek * 22) % 16)} strokeLinecap="round" />
              <path d={sirk.pil} fill={F.tekst} />
            </g>
          ) : null}
          {/* polarfronten utenfor lavtrykket */}
          <path d={smoothPath(pf.vest)} fill="none" stroke={F.retur} strokeWidth="3" strokeDasharray="10 8" opacity={pfOp} data-nocheck="" />
          <path d={smoothPath(pf.ost)} fill="none" stroke={F.retur} strokeWidth="3" strokeDasharray="10 8" opacity={pfOp} data-nocheck="" />
          {/* frontene, heltrukne som i Værkart (PR #187). Uten farge skilles den okkluderte fronten fra
              kaldfronten på de vekslende trekantene og halvsirklene, også i tegnforklaringen. */}
          <g opacity={frontOp}>
            <path d={stiAv(g.W)} fill="none" stroke={F.varmfront} strokeWidth="4" />
            <path d={symboler(g.W, "varm", (nx, ny) => ny < 0)} fill={F.varmfront} />
            <path d={stiAv(g.K)} fill="none" stroke={F.kaldfront} strokeWidth="4" />
            <path d={symboler(g.K, "kald", (nx) => nx > 0)} fill={F.kaldfront} />
            {g.O.length > 1 ? (
              <>
                <path d={stiAv(g.O)} fill="none" stroke={F.okkludert} strokeWidth="4" />
                <path d={symboler(g.O, "okkl", (nx, ny) => ny < 0)} fill={F.okkludert} />
              </>
            ) : null}
          </g>
          {/* sentrum: «L» litt opp og til venstre for frontmøtet (som i Værkart), innenfor buen og den
              innerste isobaren. Større på smal skjerm, så bokstaven blir minst ca. 11 px. */}
          <text
            x={g.C[0] - 22}
            y={g.C[1] - 4}
            textAnchor="middle"
            fontSize={narrow ? 44 : lerp(26, 34, dybde)}
            fontWeight="900"
            fill={F.lavtrykk}
            opacity={clamp(0.35 + dybde)}
            paintOrder="stroke"
            stroke={F.halo}
            strokeWidth="6"
          >
            L
          </text>
          {/* østover */}
          {fase === 1 || fase === FASER.length ? (
            <path d="M800 92 L900 92" stroke={F.tekst} strokeWidth="3" data-nocheck="" />
          ) : null}
          {fase === 1 || fase === FASER.length ? <path d="M900 92 L886 84 L886 100 Z" fill={F.tekst} data-nocheck="" /> : null}
          {/* bevegelsespiler uten tekst: kaldfronten går raskere enn varmfronten */}
          {bevOp > 0.02 ? (
            <g opacity={bevOp} data-nocheck="">
              {bevegelse.map((bv, i) => (
                <Bevegelse key={i} {...bv} />
              ))}
            </g>
          ) : null}
          {narrow ? null : <Snitt loft={s.loft} op={snittOp} />}
        </>
      )}
    </LokaleRamme>
  );
}
