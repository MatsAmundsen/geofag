/**
 * Diagenese: fra løs sand til sandstein.
 * Bygget på prosess-kit. Alle faglige poeng og etiketter følger Mats' tekst i bergarter.md
 * (avsnittene «Hva er en bergart?» og «Diagenese»). Målerne er relative og har ingen tall.
 */
import { useMemo, useState } from "react";
import { IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key, type Lab } from "./isbre-figur";
import { clamp, lerp, useBoxWidth, useInView, useNarrow } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { KornLag, Maalere, TidslinjeKontroller, Zoomlinse } from "./prosess-figur";
import { lagKornTekstur, lat, prng, tidslinjeVerdi, useTidslinje, type Korn } from "./prosess-kit";

const FASER = ["Løs sand", "Nye lag oppå", "Kompaksjon", "Varm væske sirkulerer", "Cementering"];

/** Statustekst per fase. Kilde: Mats' tekst (se PR-beskrivelsen for setning per steg). */
const STATUS_MED = [
  "Sand er løst sediment. Det er ikke bergart ennå. Porene mellom kornene er fulle av væske, ikke luft.",
  "Nye lag legger seg oppå, og sandlaget kommer dypere ned. Vekten av de nye lagene presser sedimentet sammen.",
  "Kompaksjon: porevann presses ut, og porøsiteten avtar. En del væske blir likevel igjen mellom kornene.",
  "Samtidig øker temperaturen med dypet. Den varme væsken som er igjen, sirkulerer gjennom porene og løser ioner fra kornene.",
  "Cementering: ionene felles ut som kitt av kvarts, kalsitt eller jernoksid mellom kornene. Da blir sand til sandstein, en fast sedimentær bergart.",
];

const STATUS_UTEN = [
  "Tankeeksperiment: porene er tomme. I virkeligheten er porene fulle av væske, ikke luft.",
  "Tankeeksperiment: nye lag legger seg oppå, og vekten presser sedimentet sammen.",
  "Tankeeksperiment: trykk alene pakker bare kornene.",
  "Tankeeksperiment: uten porevæske er det ingen væske som kan sirkulere og løse ioner.",
  "Tankeeksperiment: uten porevæske blir det nesten ikke kitt. Trykk alene pakker bare kornene.",
];

/**
 * Tilstand ved slutten av hver fase (indeks = p).
 * Temperaturen (T) stiger først i steg 4: teksten tar den opp der («Samtidig øker temperaturen med dypet»).
 */
const BILDER = [
  { settle: 0, b: 0, c: 0, flow: 0, ion: 0, cem: 0, T: 0.1 },
  { settle: 1, b: 0, c: 0, flow: 0, ion: 0, cem: 0, T: 0.1 },
  { settle: 1, b: 0.55, c: 0.3, flow: 0, ion: 0, cem: 0, T: 0.1 },
  { settle: 1, b: 0.8, c: 1, flow: 0, ion: 0, cem: 0, T: 0.1 },
  { settle: 1, b: 1, c: 1, flow: 1, ion: 1, cem: 0, T: 0.85 },
  { settle: 1, b: 1, c: 1, flow: 0.5, ion: 0.2, cem: 1, T: 0.9 },
];

const FARGE = {
  kvarts: "#d6d8d3",
  feltspat: "#d49d86",
  vaeske: "#2b6f8e",
  tom: "#1c2227",
  kitt: "#d9b45a",
  ion: "#f6e3a0",
  dråpe: "#a6dcf0",
  sandlag: "#d8c69b",
  lagA: "#a99a78",
  lagB: "#7c8073",
  eldre: "#5d6458",
  vann: "#2f6680",
};

type Layout = {
  vb: string;
  col: { x: number; w: number; vannTopp: number; flate: number; bunn: number };
  strip: { x: number; w: number };
  linse: { cx: number; cy: number; r: number };
  /** Plass til etiketter (bred skjerm). */
  tekst: { tempY: number; linseUnder: number; linseOver: number };
};

const BRED: Layout = {
  vb: "0 0 960 540",
  col: { x: 92, w: 220, vannTopp: 40, flate: 92, bunn: 470 },
  strip: { x: 56, w: 18 },
  linse: { cx: 650, cy: 262, r: 196 },
  tekst: { tempY: 505, linseUnder: 505, linseOver: 40 },
};

const SMAL: Layout = {
  vb: "0 0 520 600",
  col: { x: 46, w: 100, vannTopp: 24, flate: 64, bunn: 576 },
  strip: { x: 18, w: 16 },
  linse: { cx: 337, cy: 300, r: 178 },
  tekst: { tempY: 590, linseUnder: 590, linseOver: 20 },
};

/** Bare korn som kan bli synlige i linsen (også i løs, utstrakt tilstand), så ingen skjulte stier ligger under etikettene. */
const hentKorn = lat(() => lagKornTekstur({
  seed: 20261015,
  avstand: 0.2,
  storrelse: [0.62, 1],
  typer: 3,
  inni: (x, y, r) => Math.hypot(x * 1.05, y * 1.17) - r < 1.0,
  nokkel: "diagenese-linse",
}));
/** To av tre korn er kvarts, ett av tre feltspat (teksten: sand av kvarts og feltspat). */
const erFeltspat = (k: Korn) => k.type === 2;

/** Ioner og dråper som driver gjennom porene. Faste startverdier (SSR-trygt). */
const hentPartikler = lat(() => {
  const rnd = prng(77);
  return Array.from({ length: 30 }, () => ({ x: rnd() * 2.4 - 1.2, y: rnd() * 2 - 1, v: 0.6 + rnd() * 0.8, f: rnd() * 6.28 }));
});

/**
 * Et punkt i en pore og et kontaktpunkt mellom to korn, i pakket tilstand.
 * Regnes ut lat ved første bruk (ikke når modulen lastes, så andre sider ikke betaler for det).
 */
const hentPunkter = lat(() => {
  const KORN = hentKorn();
  let pore: [number, number] = [0, 0];
  let best = -1;
  for (let gx = -0.45; gx <= 0.45; gx += 0.03) {
    for (let gy = -0.45; gy <= 0.45; gy += 0.03) {
      const d = Math.min(...KORN.map((k) => Math.hypot(k.x - gx, k.y - gy) - k.r));
      if (d > best) {
        best = d;
        pore = [gx, gy];
      }
    }
  }
  let kontakt: [number, number] = [0, 0];
  let gap = Infinity;
  for (let i = 0; i < KORN.length; i++) {
    for (let j = i + 1; j < KORN.length; j++) {
      const a = KORN[i];
      const b = KORN[j];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      if (Math.hypot(mx - 0.25, my - 0.35) > 0.3) continue;
      const g = Math.hypot(a.x - b.x, a.y - b.y) - a.r - b.r;
      if (g < gap) {
        gap = g;
        kontakt = [mx, my];
      }
    }
  }
  let midt = KORN[0];
  for (const k of KORN) if (Math.hypot(k.x + 0.3, k.y + 0.2) - k.r * 0.5 < Math.hypot(midt.x + 0.3, midt.y + 0.2) - midt.r * 0.5) midt = k;
  return { pore, kontakt, midt };
});

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

export function DiageneseFigur({
  heading = "Diagenese: fra løs sand til sandstein",
  caption,
}: {
  heading?: string;
  caption?: React.ReactNode;
}) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const tl = useTidslinje({ antall: FASER.length, synlig: visible, faseMs: 3400, holdMs: 1600 });
  const KORN = hentKorn();
  const PARTIKLER = hentPartikler();
  const PUNKTER = hentPunkter();
  const [medVaeske, setMedVaeske] = useState(true);
  const L = small ? SMAL : BRED;
  const s = tidslinjeVerdi(BILDER, tl.p);
  const vaeske = medVaeske ? 1 : 0;
  const flow = s.flow * vaeske;
  const ion = s.ion * vaeske;
  const cem = s.cem * (medVaeske ? 1 : 0.08);
  // vann presses ut i fase 3; når figuren står stille i fase 3, vises det som sluttbilde
  const ut = tl.fase === 3 && medVaeske ? (tl.playing ? Math.sin(Math.PI * clamp(tl.lokal)) : 1) : 0;

  // ---- søylen: sandlaget synker mens nye lag legges oppå ----
  const { col, strip, linse } = L;
  const lagTykk0 = small ? 40 : 46;
  const lagTykk = lagTykk0 * (1 - 0.35 * s.c);
  const lagTopp = col.flate + 6 + s.b * (col.bunn - col.flate - 150);
  const lagMidt = lagTopp + lagTykk / 2;
  const stripe = small ? 30 : 36;
  const over: { y: number; h: number; fill: string }[] = [];
  for (let j = 0, y = lagTopp; y > col.flate + 0.5; j++) {
    const top = Math.max(col.flate, y - stripe);
    over.push({ y: top, h: y - top, fill: j % 2 ? FARGE.lagB : FARGE.lagA });
    y = top;
  }
  const under: { y: number; h: number; fill: string }[] = [];
  for (let j = 0, y = lagTopp + lagTykk; y < col.bunn; j++) {
    const h = Math.min(stripe, col.bunn - y);
    under.push({ y, h, fill: j % 2 ? FARGE.eldre : "#6b6f62" });
    y += h;
  }

  // ---- linsen: korn i enhetskoordinater → SVG ----
  // løs sand ligger korn mot korn, men luftigere; kompaksjon pakker mest i høyden
  const sx = lerp(1.05, 1, s.c);
  const sy = lerp(1.17, 1, s.c);
  const R = linse.r;
  const tilSvg = (ux: number, uy: number): [number, number] => [linse.cx + ux * sx * R, linse.cy + uy * sy * R];
  const kornPos = (k: Korn): [number, number, number] => {
    const lokalSettle = clamp(s.settle * 1.6 - k.frø * 0.6);
    const [x, y] = tilSvg(k.x, k.y);
    return [x, y - (1 - lokalSettle) * R * 2.4, lokalSettle > 0 ? 1 : 0];
  };

  // kornene står stille det meste av tiden; nøkkelen avgjør når de må tegnes på nytt
  const kornNoekkel = `${linse.cx}|${linse.cy}|${R}|${s.settle.toFixed(3)}|${s.c.toFixed(3)}`;

  const sek = tl.sek;
  const partikler = PARTIKLER.map((pt) => {
    const x = (((pt.x + 1.2 + sek * 0.11 * pt.v) % 2.4) + 2.4) % 2.4 - 1.2;
    const y = pt.y + 0.06 * Math.sin(sek * 1.2 + pt.f);
    return tilSvg(x, y);
  });
  const draper = PARTIKLER.slice(0, 16).map((pt) => {
    const y = (((pt.y + 1 - sek * 0.22 * pt.v) % 2) + 2) % 2 - 1;
    return tilSvg(pt.x * 0.9, y);
  });

  const keys: Key[] = [
    { text: "Kvartskorn", color: FARGE.kvarts, kind: "fill" },
    { text: "Feltspatkorn", color: FARGE.feltspat, kind: "fill" },
    { text: medVaeske ? "Porevæske" : "Tomme porer (tankeeksperiment)", color: medVaeske ? FARGE.vaeske : FARGE.tom, kind: "fill" },
    // uten porevæske blir det nesten ikke kitt (teksten); da sier tegnforklaringen det
    { text: medVaeske ? "Kitt" : "Nesten ikke kitt", color: FARGE.kitt, kind: "fill", off: cem < 0.05 },
  ];

  // ---- etiketter (nummererte merker på smal skjerm) ----
  const fs = small ? 15 : 15;
  const labels: Lab[] = [];
  labels.push({
    text: "Sandlaget vi følger",
    x: col.x + col.w / 2,
    y: Math.min(col.bunn - 8, lagTopp + lagTykk + 22),
    at: [col.x + col.w / 2, lagMidt],
    anchor: "middle",
    size: fs,
    weight: 700,
    halo: "#0f171c",
    color: "#f3e3b5",
  });
  if (tl.fase >= 2) {
    labels.push({
      text: "Nye lag legges oppå",
      x: col.x + 8,
      y: col.vannTopp + 30,
      at: [col.x + col.w * 0.75, col.flate + 4],
      size: fs,
      weight: 700,
      color: "#e8eef2",
    });
  }
  if (ut > 0.25) {
    labels.push({
      text: "Vann presses ut",
      x: col.x + col.w / 2,
      y: lagTopp - 58,
      at: [col.x + col.w / 2, lagTopp - 36],
      anchor: "middle",
      size: fs,
      weight: 700,
      color: "#cfeefa",
      halo: "#0f171c",
    });
  }
  if (tl.fase >= 4) {
    labels.push({
      text: "Temperaturen øker med dypet",
      x: strip.x - 4,
      y: L.tekst.tempY,
      at: [strip.x + strip.w / 2, col.bunn - 10],
      size: fs,
      weight: 700,
      color: "#f0b27a",
    });
  }
  const [px, py] = tilSvg(PUNKTER.pore[0], PUNKTER.pore[1]);
  labels.push({
    text: medVaeske ? "Porevæske" : "Tomme porer",
    x: linse.cx - R * 0.55,
    y: L.tekst.linseUnder,
    at: [px, py],
    badge: [linse.cx - R * 0.55, linse.cy + R + 30],
    anchor: "middle",
    size: fs,
    weight: 700,
    color: medVaeske ? "#9fd3ea" : "#c9d2d8",
  });
  const [gx, gy] = tilSvg(PUNKTER.midt.x, PUNKTER.midt.y);
  if (s.settle > 0.95) {
    labels.push({
      text: "Korn av kvarts og feltspat",
      x: linse.cx,
      y: L.tekst.linseOver,
      at: [gx, gy - PUNKTER.midt.r * R * 0.4],
      badge: [linse.cx + 60, linse.cy - R - 30],
      anchor: "middle",
      size: fs,
      weight: 700,
      color: "#e8eef2",
      narrowHide: false,
    });
  }
  if (tl.fase === 4 && medVaeske) {
    const [fx, fy] = partikler[3];
    labels.push({
      text: "Løste ioner",
      x: linse.cx + R * 0.6,
      y: L.tekst.linseUnder,
      at: [fx, fy],
      badge: [linse.cx + R * 0.55, linse.cy + R + 30],
      anchor: "middle",
      size: fs,
      weight: 700,
      color: FARGE.ion,
    });
  }
  if (tl.fase === 5 && cem > 0.3) {
    const [kx, ky] = tilSvg(PUNKTER.kontakt[0], PUNKTER.kontakt[1]);
    labels.push({
      text: "Kitt mellom kornene",
      x: linse.cx + R * 0.55,
      y: L.tekst.linseUnder,
      at: [kx, ky],
      badge: [linse.cx + R * 0.55, linse.cy + R + 30],
      anchor: "middle",
      size: fs,
      weight: 700,
      color: FARGE.kitt,
    });
  }

  const status = (medVaeske ? STATUS_MED : STATUS_UTEN)[tl.fase - 1];
  const porositet = lerp(0.9, 0.38, s.c);

  const fyll = useMemo(
    () => (k: Korn) => (erFeltspat(k) ? FARGE.feltspat : k.frø > 0.5 ? FARGE.kvarts : "#c8cbc6"),
    [],
  );

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Sandlag som begraves under nye lag. Linsen viser korn, porevæske, kompaksjon og kitt som vokser mellom kornene."
        heading={heading}
        caption={
          caption ??
          "Diagenese gjør løst sediment til fast sedimentær bergart. Trykk pakker kornene. Det er porevæsken som løser ioner og feller dem ut som kitt. Skjematisk, uten målestokk."
        }
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={
          <div className={small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"}>
            <TidslinjeKontroller tl={tl} faser={FASER} />
            <StegVelger
              labels={["Med porevæske", "Uten porevæske (tankeeksperiment)"]}
              step={medVaeske ? 1 : 2}
              onStep={(n) => tl.valg(() => setMedVaeske(n === 1))}
              label="Porevæske"
            />
          </div>
        }
        status={status}
        keys={keys}
        labels={labels}
        notes={["Skjematisk, uten målestokk", "Målerne viser retning, ikke tall"]}
        viewBox={L.vb}
        below={
          <Maalere
            maalere={[
              { navn: "Dyp", verdi: s.b, ender: ["grunt", "dypt"], farge: "#8eb4d4" },
              { navn: "Temperatur", verdi: s.T, ender: ["lav", "høy"], farge: "#e0874a" },
              { navn: "Porøsitet", verdi: porositet, ender: ["lav", "høy"], farge: "#6fb3b8" },
            ]}
          />
        }
      >
        {({ m }) => (
          <g data-figur="diagenese" data-step={tl.fase} data-p={tl.p.toFixed(2)}>
            <defs>
              <linearGradient id={`${m.fg}-temp`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3d6f8f" />
                <stop offset="1" stopColor="#d9772f" />
              </linearGradient>
            </defs>
            {/* søyle */}
            <rect x={col.x} y={col.vannTopp} width={col.w} height={col.flate - col.vannTopp} fill={FARGE.vann} />
            {over.map((b, i) => (
              <rect key={`o${i}`} x={col.x} y={b.y} width={col.w} height={b.h} fill={b.fill} />
            ))}
            <rect x={col.x} y={lagTopp} width={col.w} height={lagTykk} fill={FARGE.sandlag} />
            {under.map((b, i) => (
              <rect key={`u${i}`} x={col.x} y={b.y} width={col.w} height={b.h} fill={b.fill} />
            ))}
            <rect x={col.x} y={lagTopp} width={col.w} height={lagTykk} fill="none" stroke="#f3d27a" strokeWidth="3" />
            {ut > 0.05 &&
              [0.25, 0.5, 0.75].map((f) => (
                <path
                  key={f}
                  d={`M${col.x + col.w * f} ${lagTopp - 4} L${col.x + col.w * f} ${lagTopp - 32}`}
                  stroke="#a6dcf0"
                  strokeWidth="4"
                  markerEnd={`url(#${m.ice})`}
                  opacity={ut}
                />
              ))}
            {/* temperaturstripe: varmere med dypet */}
            <rect x={strip.x} y={col.flate} width={strip.w} height={col.bunn - col.flate} rx="4" fill={`url(#${m.fg}-temp)`} />
            <rect x={col.x} y={col.vannTopp} width={col.w} height={col.bunn - col.vannTopp} fill="none" stroke="#e8eef2" strokeOpacity="0.5" />

            {/* linse */}
            <Zoomlinse
              cx={linse.cx}
              cy={linse.cy}
              r={linse.r}
              fra={[col.x + col.w + 2, lagMidt, lagTykk / 2]}
              bakgrunn={medVaeske ? FARGE.vaeske : FARGE.tom}
            >
              {medVaeske ? (
                <rect x={linse.cx - R} y={linse.cy - R} width={R * 2} height={R * 2} fill="#d9772f" opacity={s.T * 0.22} />
              ) : null}
              {/* ioner og dråper bak kornene: de ses bare i porene */}
              {ut > 0.02 &&
                draper.map(([x, y], i) => <circle key={`d${i}`} cx={x} cy={y} r={R * 0.022} fill={FARGE.dråpe} opacity={ut} />)}
              {Math.max(ion, flow * 0.6) > 0.02 &&
                partikler.map(([x, y], i) => (
                  <circle key={`p${i}`} cx={x} cy={y} r={R * 0.026} fill={FARGE.ion} stroke="#7a5b12" strokeWidth="1" opacity={Math.max(ion, flow * 0.6)} />
                ))}
              {cem > 0.01 ? (
                <KornLag korn={KORN} skala={R} pos={kornPos} fyll={() => FARGE.kitt} strek="none" forstorr={1 + 0.3 * cem} noekkel={kornNoekkel} />
              ) : null}
              <KornLag korn={KORN} skala={R} pos={kornPos} fyll={fyll} noekkel={kornNoekkel} />
            </Zoomlinse>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
