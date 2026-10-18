/**
 * Gamle vidder, unge fjorder og strandflaten (landformer.md l. 135–147): terrengblokk med tidslinje.
 *
 * Havet i vest, innlandet i øst. To faner for de to modellene i teksten:
 * - Klassisk modell (l. 143): den paleiske flaten (1), landet heves mest i vest (2), elvene graver
 *   V-daler (3), breene graver dalene ut til U-daler og fjorder (4), og strandflaten langs kysten (5,
 *   l. 147; et parallelt spor, ikke et steg etter breene).
 * - Annen modell (l. 145): høye fjell fra starten (1), istidene sliper ned toppene mot snøgrensen (2),
 *   og begge modellene ender med flate vidder (3).
 * Under blokken: et snitt vest–øst langs fjorden, og tidsspor som viser når prosessene virket
 * (skjematisk, ikke i målestokk). Ingen stedsnavn, eksempler eller tall utover avsnittet (GeoBot1).
 *
 * Terrenget tegnes i canvas som nøkkelbilder (terreng-kit), bare på klienten. Serveren viser en
 * plassholder (prosess-figurer-lat.tsx).
 */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Faner, IsbreFigur, type Key, type Lab } from "./isbre-figur";
import { clamp, figureFont, lerp, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { Maalere, TidslinjeKontroller } from "./prosess-figur";
import { useFigurSmal, useTidslinje } from "./prosess-kit";
import { lagTerrengNett, skraaProj, tegnSider, terrengJobb, type SkraaProj } from "./terreng-kit";
import { Flytstrok, Hoydeprofil, TerrengLerret } from "./terreng-figur";
import { useNokkelbilder, type BildeJobb } from "./terreng-nokkelbilder";
import {
  LS_D,
  LS_W,
  SNOGRENSE,
  annenVed,
  bergHoyde,
  fargeFraFelt,
  felt,
  bremISnitt,
  bremIndre,
  bremKryss,
  fjordY,
  hevAndel,
  klassiskVed,
  overflate,
  viddeHoyde,
  type LandskapTilstand,
} from "./landskap-modell";
import {
  ANNEN_FASER,
  ANNEN_SPOR,
  ANNEN_STATUS,
  KLASSISK_FASER,
  KLASSISK_SPOR,
  KLASSISK_STATUS,
  LANDSKAP_FANER,
  LANDSKAP_TEKST,
  type Spor,
} from "./landskap-tekst";

/** Nøkkelbilder per fase. Mellom dem krysstones terrenget. */
const PER_FASE = 6;

type Oppsett = {
  vb: [number, number];
  blokk: { x: number; y: number; w: number; h: number };
  proj: { ox: number; oy: number; skala: number; overdriv: number };
  nett: [number, number];
  profil: { y: number; h: number };
};

const BRED: Oppsett = {
  vb: [960, 636],
  blokk: { x: 0, y: 0, w: 960, h: 458 },
  proj: { ox: 72, oy: 422, skala: 1.08, overdriv: 0.55 },
  nett: [120, 112],
  profil: { y: 468, h: 160 },
};

const SMAL: Oppsett = {
  vb: [520, 610],
  blokk: { x: 0, y: 0, w: 520, h: 346 },
  proj: { ox: 4, oy: 312, skala: 0.74, overdriv: 0.7 },
  nett: [92, 84],
  profil: { y: 354, h: 250 },
};

const KAMERA = { kx: 0.32, hevning: 56 };

const FARGE = {
  is: "#d4e7f2",
  isKant: "#8fb7d2",
  hav: "#3f88ad",
  elv: "#8fd0f0",
  sno: "#f2f6f9",
  hev: "#f3d27a",
  bolge: "#e9f6fb",
  vidde: "#e3d9a6",
  strand: "#b2a878",
  /** Vidda i snittet: egen nyanse, så den skiller seg fra strandflaten (ΔE2000 38 mot #b2a878). */
  viddeSnitt: "#e8b4d8",
};

/** Strekene i snittet; forklaringen bruker de samme. */
const STRAND_STREK = { dash: "10 4", bredde: 3, kant: "#101b22" };
const VIDDE_STREK = { dash: "0.1 4", bredde: 2.2, rund: true };

/** Punkt på vidda (nord for fjorden), brukt til etikett og måler. */
const VIDDE: [number, number] = [470, 300];

type FaneId = "a" | "b";

function tilstandNokkel(t: LandskapTilstand) {
  return [t.hev, t.elv, t.bre, t.is, t.strand, t.slip, t.isTopp, t.slutt]
    .map((v) => v.toFixed(3))
    .join(",");
}

export function LandskapBlokkFigur({
  heading = LANDSKAP_TEKST.heading,
  caption,
}: {
  heading?: string;
  caption?: React.ReactNode;
}) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const [fane, setFane] = useState<FaneId>("a");
  const tlA = useTidslinje({
    antall: KLASSISK_FASER.length,
    synlig: visible && fane === "a",
    faseMs: 3800,
    holdMs: 1800,
    element: ref,
  });
  const tlB = useTidslinje({
    antall: ANNEN_FASER.length,
    synlig: visible && fane === "b",
    faseMs: 3800,
    holdMs: 1800,
    element: ref,
  });
  const tl = fane === "a" ? tlA : tlB;
  const b = fane === "b";
  const uid = useId().replace(/:/g, "");
  /** Fanebytte er et brukervalg: begge tidslinjene settes på pause, og ny status leses opp. */
  const velgFane = (n: number) => {
    const ny: FaneId = n === 1 ? "a" : "b";
    if (ny === fane) return;
    (fane === "a" ? tlB : tlA).valg(() => {});
    tl.valg(() => setFane(ny));
  };
  const FASER = b ? ANNEN_FASER : KLASSISK_FASER;
  const L = small ? SMAL : BRED;
  const [vbW, vbH] = L.vb;
  const proj: SkraaProj = useMemo(
    () =>
      skraaProj({
        ox: L.proj.ox,
        oy: L.proj.oy,
        skala: L.proj.skala,
        overdriv: L.proj.overdriv,
        ...KAMERA,
      }),
    [L.proj.ox, L.proj.oy, L.proj.skala, L.proj.overdriv],
  );
  const tilstand = (bb: boolean, p: number) => (bb ? annenVed(p) : klassiskVed(p));
  const t = tilstand(b, tl.p);
  const fase = tl.fase;
  const sek = tl.sek;

  /* ---- nøkkelbilder: terrenget i canvas ---- */
  const [skala, setSkala] = useState(0);
  const lag = useCallback(
    (nokkel: string): BildeJobb => {
      const [f, q] = nokkel.split("|");
      const bb = f === "b";
      const ts = bb ? annenVed(Number(q) / PER_FASE) : klassiskVed(Number(q) / PER_FASE);
      const nett = lagTerrengNett(L.nett[0], L.nett[1], LS_W, LS_D);
      // berg og is i hvert hjørne huskes, så fargen per rute bruker dem i stedet for å regne modellen på nytt
      const rad = nett.nx + 1;
      const dx = LS_W / nett.nx;
      const dy = LS_D / nett.ny;
      const n = rad * (nett.ny + 1);
      const B = new Float32Array(n);
      const I = new Float32Array(n);
      const T = new Float32Array(n);
      const hoyde = (x: number, y: number) => {
        const f = felt(x, y, ts, bb);
        const k = Math.round(y / dy) * rad + Math.round(x / dx);
        B[k] = f.berg;
        I[k] = f.is;
        T[k] = f.topp;
        return Math.max(f.berg + f.is + f.topp, 0);
      };
      const snitt = (A: Float32Array, k: number) =>
        (A[k] + A[k + 1] + A[k + rad] + A[k + rad + 1]) / 4;
      return function* (ctx) {
        // to rader per bit: korte biter, så tegningen ikke gir lange oppgaver ved 4x CPU
        const Z = yield* terrengJobb(
          ctx,
          nett,
          hoyde,
          {
            proj,
            farge: (x, y, _z, hl, i, j) => {
              const k = j * rad + i;
              return fargeFraFelt(
                x,
                y,
                hl,
                { berg: snitt(B, k), is: snitt(I, k), topp: snitt(T, k) },
                ts,
                bb,
              );
            },
          },
          2,
        );
        tegnSider(ctx, nett, Z, proj, {
          bunn: -90,
          fyll: "#4a4740",
          side: "#3c3a35",
          lag: "rgba(20,18,16,0.35)",
        });
      };
    },
    [L.nett, proj],
  );
  const { lager, versjon } = useNokkelbilder(lag, L.blokk.w, L.blokk.h, skala, skala > 0);
  const antallQ = FASER.length * PER_FASE;
  const qPos = clamp(tl.p, 0, FASER.length) * PER_FASE;
  const qa = Math.min(Math.floor(qPos), antallQ - 1);
  const vekt = qPos - qa;
  const nokkelFor = (q: number) => `${fane}|${q}`;
  const na = nokkelFor(qa);
  const nb = nokkelFor(qa + 1);
  let bildeA: HTMLCanvasElement | null = null;
  let bildeB: HTMLCanvasElement | null = null;
  // `versjon` øker når et nøkkelbilde er ferdig; da rendres figuren på nytt og henter det
  if (lager && versjon >= 0) {
    bildeA = lager.hent(na);
    bildeB = lager.hent(nb);
    const forran = [na, nb];
    if (tl.playing) for (let d = 2; d <= 4; d++) forran.push(nokkelFor((qa + d) % (antallQ + 1)));
    lager.bestill(forran);
    // står stille uten ferdig bilde: tegnes i biter over noen få bilder (ingen lang oppgave), og
    // til da vises forrige bilde i samme fane
    if (!tl.playing) {
      const mangler: string[] = [];
      if (!bildeA) mangler.push(na);
      if (!bildeB && vekt > 0.005) mangler.push(nb);
      if (mangler.length) lager.hast(mangler);
    }
  }
  const vist = useRef<{ fane: FaneId; a: HTMLCanvasElement | null; b: HTMLCanvasElement | null; vekt: number }>({
    fane,
    a: null,
    b: null,
    vekt: 0,
  });
  let visVekt = vekt;
  if (!bildeA && !bildeB && vist.current.fane === fane) {
    bildeA = vist.current.a;
    bildeB = vist.current.b;
    visVekt = vist.current.vekt;
  } else if (bildeA || bildeB) vist.current = { fane, a: bildeA, b: bildeB, vekt };

  /* ---- 3D-punkter ---- */
  const H = (x: number, y: number) => overflate(x, y, t, b);
  const P3 = (x: number, y: number, dz = 0) => proj(x, y, H(x, y) + dz);
  const fs = small ? 15 : 15;
  const vb = (x: number, y: number) => [x, y] as [number, number];

  /* ---- elver (klassisk 1–3): slynger seg på flaten, følger V-dalen når de graver ---- */
  const elvOp = b ? 0 : clamp(1 - t.bre * 4) * clamp(1 - Math.max(0, tl.p - 3.05) * 8);
  const elvBaner: [number, number][][] = [];
  if (elvOp > 0.02) {
    const slyng = 1 - t.elv;
    for (const [fra, sty] of [
      [600, 0],
      [470, 1],
    ] as const) {
      const bane: [number, number][] = [];
      for (let x = fra; x >= 70; x -= 7) {
        const y =
          sty === 0
            ? fjordY(x) + 15 * slyng * Math.sin(x / 21)
            : 64 + 10 * Math.sin(x / 57) + 9 * Math.sin(x / 17);
        const z = H(x, y);
        if (z <= 0.05 && x < 140) {
          bane.push(proj(x, y, 0.5));
          break;
        }
        bane.push(proj(x, y, z + 0.8));
      }
      if (bane.length > 2) elvBaner.push(bane);
    }
  }
  // mer fall etter hevingen: elvene renner raskere
  const elvFart = lerp(5, 18, t.hev);

  /* ---- hevingspiler (klassisk 2) ---- */
  const piler: { x1: number; y1: number; x2: number; y2: number; op: number }[] = [];
  const pilOp = b ? 0 : clamp((tl.p - 1.02) * 8) * clamp((2.25 - tl.p) * 6);
  if (pilOp > 0.02) {
    for (const x of [130, 200, 290, 400, 520, 610]) {
      for (const y of [30, 320]) {
        const len = (small ? 54 : 60) * hevAndel(x);
        if (len < 6) continue;
        const [x1, y1] = P3(x, y, 4);
        const [x2, y2] = P3(x, y, 4 + len / L.proj.overdriv);
        piler.push({ x1, y1, x2, y2, op: pilOp });
      }
    }
  }

  /* ---- isflyt (klassisk 4) ---- */
  const flytBaner: [number, number][][] = [];
  if (!b && t.is > 0.2) {
    for (const tv of [-20, 0, 20]) {
      const bane: [number, number][] = [];
      for (let x = 520; x >= 96; x -= 10) {
        const y = fjordY(x) + tv * (0.8 + 0.2 * clamp((x - 200) / 300));
        const f = felt(x, y, t, false);
        if (f.is < 2) {
          if (bane.length) break;
          continue;
        }
        bane.push(proj(x, y, f.berg + f.is + 0.6));
      }
      if (bane.length > 2) flytBaner.push(bane);
    }
  }

  /* ---- strandflaten (klassisk 5): bølger, drivis og frost ---- */
  const strandOp = b ? 0 : clamp((tl.p - 4) * 4);
  const bolger: { d: string; op: number }[] = [];
  const drivis: { pts: string; op: number }[] = [];
  const frost: { x: number; y: number; op: number }[] = [];
  if (strandOp > 0.02) {
    for (let k = 0; k < 3; k++) {
      const u = (((sek / 3.4 + k / 3) % 1) + 1) % 1;
      const x0 = lerp(10, 66, u);
      const pts: string[] = [];
      for (let y = 18; y <= LS_D - 10; y += 14) {
        const x = x0 + 4 * Math.sin(y / 23 + k);
        if (felt(x, y, t, false).berg > -1) {
          if (pts.length > 1)
            bolger.push({ d: `M${pts.join(" L")}`, op: strandOp * Math.sin(Math.PI * u) * 0.9 });
          pts.length = 0;
          continue;
        }
        const [sx, sy] = proj(x, y, 0.4);
        pts.push(`${sx.toFixed(1)} ${sy.toFixed(1)}`);
      }
      if (pts.length > 1)
        bolger.push({ d: `M${pts.join(" L")}`, op: strandOp * Math.sin(Math.PI * u) * 0.9 });
    }
    for (let k = 0; k < 6; k++) {
      // isflak driver langs kysten
      const u = (((sek / 14 + k / 6) % 1) + 1) % 1;
      const x = 22 + ((k * 37) % 50);
      const y = lerp(10, LS_D - 10, u);
      if (felt(x, y, t, false).berg > -1) continue;
      const r = 4 + (k % 3);
      const c = [
        [-r, -r * 0.6],
        [r * 0.8, -r * 0.8],
        [r, r * 0.5],
        [-r * 0.6, r * 0.8],
      ].map(([dx, dy]) => proj(x + dx, y + dy, 0.6));
      drivis.push({
        pts: c.map(([a, bb]) => `${a.toFixed(1)},${bb.toFixed(1)}`).join(" "),
        op: strandOp * Math.sin(Math.PI * u),
      });
    }
    for (let k = 0; k < 9; k++) {
      // frost: små iskrystaller som kommer og går på holmene og den indre bremmen
      const x = 76 + ((k * 53) % 120);
      const y = 30 + ((k * 97) % 300);
      const f = felt(x, y, t, false);
      if (f.berg < 1 || f.berg > 40) continue;
      const fasePuls = Math.max(0, Math.sin(sek * 1.6 + k * 1.9));
      const [sx, sy] = proj(x, y, f.berg + 1.5);
      frost.push({ x: sx, y: sy, op: strandOp * fasePuls });
    }
  }

  /* ---- snøgrensen (annen modell, fase 2) ---- */
  const snoOp = b ? clamp((tl.p - 1.02) * 8) * clamp((2.3 - tl.p) * 5) : 0;
  const snoFront: [number, number][] = [
    proj(0, 0, SNOGRENSE),
    proj(LS_W, 0, SNOGRENSE),
    proj(LS_W, LS_D, SNOGRENSE),
  ];

  /* ---- etiketter (maks fire per steg, ordlyd fra md) ---- */
  const labels: Lab[] = [];
  // tekstplasser på bred skjerm: himmelen oppe til venstre og hjørnet nede til høyre
  const VENSTRE = (rad: number) => ({ x: 16, y: 30 + rad * 30, anchor: "start" as const });
  const HOYRE = (rad: number) => ({ x: vbW - 14, y: 360 + rad * 30, anchor: "end" as const });
  // over bakkanten av blokken, til høyre (vidda ligger bakerst)
  const OPPE = { x: vbW - 14, y: 26, anchor: "end" as const };
  const lab = (
    text: string,
    at: [number, number],
    plass: { x: number; y: number; anchor: "start" | "end" },
    color: string,
    badge: [number, number],
  ) => labels.push({ text, ...plass, at, size: fs, weight: 700, color, badge });
  const viddeS = P3(VIDDE[0], VIDDE[1], 1);
  const dalX = 400;
  const dalS = P3(dalX, fjordY(dalX), 1);
  const kystS = P3(150, 120, 1);
  const flateS = P3(420, 250, 1);
  if (!b) {
    if (fase === 1) {
      lab(
        "Den paleiske flaten: gammel, lav og nesten flat",
        flateS,
        VENSTRE(0),
        "#f3eee2",
        vb(flateS[0] + 26, flateS[1] - 22),
      );
      if (elvBaner[0]) {
        const e = elvBaner[0][Math.floor(elvBaner[0].length * 0.45)];
        lab("Elver og forvitring", e, HOYRE(1), FARGE.elv, vb(e[0] + 18, e[1] + 24));
      }
    }
    if (fase === 2) {
      const pil = piler.length ? piler.reduce((a, c) => (a.y1 - a.y2 > c.y1 - c.y2 ? a : c)) : null;
      if (pil)
        lab(
          "Landet heves mest i vest",
          [pil.x2, pil.y2],
          VENSTRE(0),
          FARGE.hev,
          vb(pil.x2 + 18, pil.y2 - 14),
        );
      lab("Den paleiske flaten", flateS, HOYRE(1), "#f3eee2", vb(flateS[0] + 26, flateS[1] - 22));
    }
    if (fase === 3) {
      lab(
        "Elvene graver seg ned: V-dal",
        dalS,
        HOYRE(1),
        FARGE.elv,
        vb(dalS[0] + 20, dalS[1] + 26),
      );
      lab("Rester av flaten: vidde", viddeS, OPPE, FARGE.vidde, vb(viddeS[0] + 22, viddeS[1] - 18));
    }
    if (fase === 4) {
      if (t.is > 0.5) {
        const isS = P3(300, fjordY(300), 1);
        lab("Bre", isS, HOYRE(1), FARGE.is, vb(isS[0] + 18, isS[1] + 24));
      } else {
        const fjS = P3(220, fjordY(220), 0);
        lab("Fjord: U-dal under havnivå", fjS, HOYRE(1), "#9fd0ee", vb(fjS[0] + 18, fjS[1] + 24));
      }
      const uS = P3(480, fjordY(480) + 30, 1);
      lab("U-dal", uS, HOYRE(0), "#f3eee2", vb(uS[0] + 20, uS[1] - 20));
      lab("Vidde", viddeS, OPPE, FARGE.vidde, vb(viddeS[0] + 22, viddeS[1] - 18));
    }
    if (fase === 5) {
      lab(
        "Strandflaten: lav og flat brem",
        kystS,
        VENSTRE(1),
        "#e6e1c8",
        vb(kystS[0] + 20, kystS[1] - 18),
      );
      const oyS = P3(84, 250, 1);
      lab("Øyer, holmer og skjær", oyS, VENSTRE(0), "#f3eee2", vb(oyS[0] + 22, oyS[1] - 16));
      const fjS = P3(260, fjordY(260), 0);
      lab("Fjord", fjS, HOYRE(0), "#9fd0ee", vb(fjS[0] + 18, fjS[1] + 24));
      lab("Vidde", viddeS, OPPE, FARGE.vidde, vb(viddeS[0] + 22, viddeS[1] - 18));
    }
  } else {
    // høyeste punkt i et utvalg, til etiketten «høye fjell»
    let topp: [number, number] = [380, 220];
    let best = -Infinity;
    for (let x = 220; x <= 560; x += 20)
      for (let y = 140; y <= 330; y += 20) {
        const z = bergHoyde(x, y, t, true);
        if (z > best) {
          best = z;
          topp = [x, y];
        }
      }
    const toppS = P3(topp[0], topp[1], 1);
    if (fase === 1)
      lab("Høye fjell", toppS, VENSTRE(0), "#f3eee2", vb(toppS[0] + 20, toppS[1] - 18));
    if (fase === 2) {
      lab(
        "Istidene sliper ned toppene",
        toppS,
        VENSTRE(0),
        FARGE.sno,
        vb(toppS[0] + 20, toppS[1] - 18),
      );
      const sn = snoFront[1];
      lab("Snøgrensen", [sn[0] - 30, sn[1]], HOYRE(1), FARGE.sno, vb(sn[0] - 40, sn[1] + 22));
    }
    if (fase === 3) {
      lab("Jevn høyde: vidde", viddeS, OPPE, FARGE.vidde, vb(viddeS[0] + 22, viddeS[1] - 18));
      const fjS = P3(260, fjordY(260), 0);
      lab("Fjord", fjS, HOYRE(0), "#9fd0ee", vb(fjS[0] + 18, fjS[1] + 24));
      lab("Strandflaten", kystS, VENSTRE(0), "#e6e1c8", vb(kystS[0] + 20, kystS[1] - 18));
    }
  }

  /* ---- profil vest–øst langs fjorden ---- */
  const x0 = proj(0, 0, 0)[0];
  const x1 = Math.min(proj(LS_W, 0, 0)[0], vbW - 6);
  const pr = { x: x0, y: L.profil.y, w: x1 - x0, h: L.profil.h };
  const fsP = figureFont(13, skala);
  const Z_MIN = -100;
  const Z_MAX = small ? 320 : 300;
  const zTilY = (z: number) =>
    pr.y + pr.h - 4 - ((z - Z_MIN) / (Z_MAX - Z_MIN)) * (pr.h - fsP - 12);
  const xMaks = lerp(0, LS_W, Math.min(1, (x1 - x0) / (proj(LS_W, 0, 0)[0] - x0)));
  // snittet begynner litt ute i havet, vest for blokken, så havnivået får plass til etiketten sin
  const X_START = -60;
  const xTil = (wx: number) => lerp(pr.x, pr.x + pr.w, (wx - X_START) / (xMaks - X_START));
  const N = 90;
  const bergP: [number, number][] = [];
  const isP: [number, number][] = [];
  const havP: [number, number][] = [];
  // vidda i snittet: bare der den ligger over havnivå; der profilen går under havet, slutter linja ved havnivå
  const viddeDeler: [number, number][][] = [];
  let viddeForrige: [number, number] | null = null;
  const strandP: [number, number][] = [];
  // Strandflaten (A5 og B3) ligger ved siden av fjorden, ikke tvers over den. Snittet langs fjordaksen viser
  // derfor fjordbunnen dyp, som i blokken, og bremmen tegnes som en egen stiplet profil 60 enheter nord for
  // fjordaksen (der blokken har bremmen), på samme måte som vidda i snittet.
  const STRAND_AVSTAND = 60;
  const strandS = b ? t.slutt : t.strand;
  const snittX = Array.from({ length: N + 1 }, (_, k) => lerp(X_START, xMaks, k / N));
  for (const wx of snittX) {
    const f = felt(wx, fjordY(wx), t, b);
    const zb = f.berg;
    bergP.push([xTil(wx), zTilY(zb)]);
    isP.push([xTil(wx), zTilY(zb + f.is + f.topp)]);
    havP.push([xTil(wx), zTilY(Math.max(0, zb + f.is))]);
    const hV = bergHoyde(wx, fjordY(wx) + 112, t, b);
    if (viddeForrige && viddeForrige[1] > 0 !== hV > 0) {
      // krysningen med havnivå, lineært mellom to snittpunkter
      const [x0, h0] = viddeForrige;
      const kx = lerp(x0, wx, h0 / (h0 - hV));
      if (hV > 0) viddeDeler.push([[xTil(kx), zTilY(0)]]);
      else viddeDeler[viddeDeler.length - 1]?.push([xTil(kx), zTilY(0)]);
    } else if (hV > 0 && !viddeForrige) viddeDeler.push([]);
    if (hV > 0) viddeDeler[viddeDeler.length - 1].push([xTil(wx), zTilY(hV)]);
    viddeForrige = [wx, hV];
    const yS = fjordY(wx) + STRAND_AVSTAND;
    if (strandS > 0.02 && wx <= bremIndre(yS)) {
      strandP.push([xTil(wx), zTilY(bremISnitt(wx, yS, bergHoyde(wx, yS, t, b), strandS))]);
    }
  }
  const havY = zTilY(0);
  const sti = (p: [number, number][]) =>
    `M${p.map(([a, c]) => `${a.toFixed(1)} ${c.toFixed(1)}`).join(" L")}`;
  const profEtiketter: {
    tekst: string;
    x: number;
    y: number;
    ty: number;
    farge: string;
    anker?: "start" | "middle" | "end";
  }[] = [];
  const toppTy = pr.y + fsP + 4;
  // der den stiplede strandflaten (ved siden av fjorden) krysser havnivå
  const xKryss = xTil(bremKryss(fjordY(bremKryss(fjordY(133) + STRAND_AVSTAND)) + STRAND_AVSTAND));
  if (!b && fase === 3) {
    const wx = 330;
    profEtiketter.push({
      tekst: "V-dal",
      x: xTil(wx),
      y: zTilY(bergHoyde(wx, fjordY(wx), t, false)) - 2,
      ty: toppTy,
      farge: FARGE.elv,
    });
  }
  if (!b && fase === 4 && t.is < 0.5) {
    const wx = 200;
    profEtiketter.push({ tekst: "fjord", x: xTil(wx), y: havY - 2, ty: toppTy, farge: "#9fd0ee" });
  }
  // Klassisk steg 5 har to linjer. De står én linje høyere enn B3 når linje 1 har plass til venstre for «Øst»
  // (anslått med 0,58 fs per tegn i halvfet skrift), så linje 2 er fri av den prikkede vidde-linja der den stiger
  // fra fjorden (DS1, 1024 og 1280 px). I de smaleste figurene står de som før. Tallene er de samme.
  const hoyt = !b && xKryss + 0.58 * fsP * 30 + 8 < pr.x + pr.w - 8 - 2 * fsP;
  const ty5 = hoyt ? toppTy : toppTy + fsP + 6;
  if ((!b && fase === 5) || (b && fase === 3)) {
    // md l. 147: «går fra 60–70 m over til 30–40 m under havnivå» (bare i klassisk modell, steg 5).
    // Etiketten peker dit den stiplede strandflaten krysser havnivå.
    profEtiketter.push({
      tekst: !b ? "strandflaten: fra 60–70 m over" : "strandflaten",
      x: xKryss,
      y: havY - 1,
      ty: ty5,
      farge: "#e6e1c8",
      anker: "start",
    });
  }
  const keys: Key[] = [
    { text: "Is (bre)", color: FARGE.is, kind: "fill" },
    { text: "Hav", color: FARGE.hav, kind: "fill" },
    { text: "Elv og bølger", color: FARGE.elv, kind: "line" },
    {
      text: "Vidde i snittet (prikket)",
      color: FARGE.viddeSnitt,
      kind: "line",
      strek: VIDDE_STREK,
    },
    {
      text: "Strandflaten i snittet (stiplet)",
      color: FARGE.strand,
      kind: "line",
      strek: STRAND_STREK,
      // bare i stegene der den stiplede strandflaten er tegnet (A5 og B3); ellers usynlig, men raden beholder høyden
      skjult: strandP.length < 2,
    },
  ];
  // «snøgrensen» (B2): over snøgrenselinja, men løftet over det høyeste punktet på berg, is og den prikkede
  // vidde-linja innenfor etikettens bredde (med runde ender), så linjene ikke krysser teksten (DS1, 320–1280 px).
  // Ikke høyere enn at den går fri av «Øst» øverst til høyre i snittet.
  const fsLite = figureFont(12, skala);
  const snoX = pr.x + pr.w - 8;
  const snoB = 0.56 * fsLite * "snøgrensen".length + 6;
  let snoTopp = Infinity;
  for (const [px, py] of [...bergP, ...isP, ...viddeDeler.flat()])
    // ett snittpunkt ekstra på hver side, så segmentene som går inn i etikettens bredde også telles
    if (px >= snoX - snoB - pr.w / N && px <= snoX + 6 + pr.w / N) snoTopp = Math.min(snoTopp, py);
  const snoY = Math.max(
    pr.y + fsP + 2 + 4 + 0.75 * fsLite,
    Math.min(zTilY(SNOGRENSE) - 4, snoTopp - VIDDE_STREK.bredde / 2 - 3),
  );
  const status = (b ? ANNEN_STATUS : KLASSISK_STATUS)[fase - 1];
  const spor = b ? ANNEN_SPOR : KLASSISK_SPOR;
  const hoyde = viddeHoyde(t, b);
  const himmelId = `${uid}-himmel`;

  return (
    <div
      ref={wrapRef}
      // Statuslinjen og tidssporene følger bredden på tabpanelet (containerspørring), som er like bred som
      // plassholderens container, så plassholderen kan ha nøyaktig samme høyde.
      // Statuslinjen har ca. 12 px luft under den lengste statusen ved alle bredder, så den aldri vokser.
      className="[&_ol]:min-h-[8.75rem] [&_ol]:content-start [&_[role=tabpanel]]:[container-type:inline-size] [&_p[aria-live]]:min-h-[9.5rem] @min-[252px]:[&_p[aria-live]]:min-h-[8.25rem] @min-[340px]:[&_p[aria-live]]:min-h-[7rem] @min-[380px]:[&_p[aria-live]]:min-h-[6rem] @min-[560px]:[&_p[aria-live]]:min-h-[4.5rem]"
    >
      <IsbreFigur
        svgRef={ref}
        title={LANDSKAP_TEKST.title}
        heading={heading}
        caption={caption ?? LANDSKAP_TEKST.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        faner={
          <div className={small ? "[&_button]:text-sm" : undefined}>
            <Faner
              labels={LANDSKAP_FANER}
              valgt={b ? 2 : 1}
              onVelg={velgFane}
              label="Velg modell"
              idPrefix={uid}
              panelId={`${uid}-panel`}
            />
          </div>
        }
        fanepanel={{ id: `${uid}-panel`, labelledBy: `${uid}-fane-${b ? 2 : 1}` }}
        toolbar={
          <div
            className={
              small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"
            }
          >
            {/* Usynlig kopi av den lengste stegraden (klassisk modell) i samme rutenettcelle: verktøylinjen er like høy i begge faner */}
            <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
              <div aria-hidden="true" className="invisible flex w-full flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {KLASSISK_FASER.map((f) => (
                    <span
                      key={f}
                      className={`rounded-full border px-2.5 py-1 font-semibold ${small ? "text-sm" : "text-xs"}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex w-full items-center gap-2 text-xs font-medium">
                  <span className="whitespace-nowrap">Tidslinje</span>
                  <div className="relative min-w-0 flex-1">
                    <span className="figur-skyver inline-block w-full align-baseline" />
                    <div className="h-2" />
                  </div>
                </div>
              </div>
              <TidslinjeKontroller tl={tl} faser={FASER} />
            </div>
          </div>
        }
        status={status}
        keys={keys}
        labels={labels}
        notes={[
          "Terrengmodell, skjematisk",
          "Snittet går vest–øst langs fjorden",
          "Tidssporene er ikke i målestokk",
        ]}
        viewBox={`0 0 ${vbW} ${vbH}`}
        below={
          <>
            {/* én måler over hele bredden, så navn og verdi aldri brytes (fast høyde) */}
            <div className="[&_ul]:!grid-cols-1">
              <Maalere
                maalere={[
                  {
                    navn: "Vidden: høyde over havet",
                    verdi: hoyde,
                    ender: ["lav", "høy"],
                    farge: FARGE.vidde,
                  },
                ]}
              />
            </div>
            <Tidsspor spor={spor} fase={fase} />
          </>
        }
      >
        {({ scale }) => (
          <g
            data-figur="landskap-blokk"
            data-fane={fane}
            data-step={fase}
            data-p={tl.p.toFixed(2)}
            data-tilstand={`${fane}|${tilstandNokkel(t)}`}
          >
            <defs>
              <linearGradient id={himmelId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0f1d26" />
                <stop offset="1" stopColor="#24404f" />
              </linearGradient>
            </defs>
            <rect
              x={L.blokk.x}
              y={L.blokk.y}
              width={L.blokk.w}
              height={L.blokk.h}
              fill={`url(#${himmelId})`}
              rx="10"
            />
            <Skala verdi={scale} sett={setSkala} />
            <TerrengLerret
              x={L.blokk.x}
              y={L.blokk.y}
              bredde={L.blokk.w}
              hoyde={L.blokk.h}
              skala={skala}
              a={bildeA}
              b={bildeB}
              vekt={visVekt}
            />
            {elvOp > 0.02 ? (
              <Flytstrok
                baner={elvBaner}
                sek={sek}
                fart={elvFart}
                farge={FARGE.elv}
                bredde={small ? 2.6 : 2.2}
                opasitet={elvOp}
              />
            ) : null}
            {flytBaner.length ? (
              <Flytstrok
                baner={flytBaner}
                sek={sek}
                fart={9}
                farge={FARGE.isKant}
                bredde={small ? 2.2 : 1.8}
                opasitet={clamp((t.is - 0.2) * 2)}
              />
            ) : null}
            <g data-nocheck="" aria-hidden="true">
              {piler.map((p, i) => (
                <g key={i} opacity={p.op}>
                  <line
                    x1={p.x1}
                    y1={p.y1}
                    x2={p.x2}
                    y2={p.y2 + 6}
                    stroke={FARGE.hev}
                    strokeWidth={small ? 2.6 : 2.4}
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${p.x2 - 5} ${p.y2 + 7} L${p.x2} ${p.y2 - 2} L${p.x2 + 5} ${p.y2 + 7} Z`}
                    fill={FARGE.hev}
                  />
                </g>
              ))}
              {bolger.map((w, i) => (
                <path
                  key={i}
                  d={w.d}
                  fill="none"
                  stroke={FARGE.bolge}
                  strokeWidth={small ? 1.8 : 1.5}
                  strokeLinecap="round"
                  opacity={w.op}
                />
              ))}
              {drivis.map((d, i) => (
                <polygon
                  key={i}
                  points={d.pts}
                  fill="#eef6fa"
                  stroke="#9cc0d8"
                  strokeWidth="0.6"
                  opacity={d.op}
                />
              ))}
              {frost.map((f, i) => (
                <g key={i} opacity={f.op} stroke="#f4fbff" strokeWidth="1.1" strokeLinecap="round">
                  <line x1={f.x - 3} y1={f.y} x2={f.x + 3} y2={f.y} />
                  <line x1={f.x - 1.5} y1={f.y - 2.6} x2={f.x + 1.5} y2={f.y + 2.6} />
                  <line x1={f.x + 1.5} y1={f.y - 2.6} x2={f.x - 1.5} y2={f.y + 2.6} />
                </g>
              ))}
              {snoOp > 0.02 ? (
                <path
                  d={sti(snoFront)}
                  fill="none"
                  stroke={FARGE.sno}
                  strokeWidth="1.8"
                  strokeDasharray="8 6"
                  opacity={snoOp}
                />
              ) : null}
            </g>
            {/* snitt vest–øst langs fjorden */}
            <Hoydeprofil
              ramme={pr}
              fs={fsP}
              ender={["Vest", "Øst"]}
              lag={[
                { punkter: havP, fyll: FARGE.hav },
                { punkter: isP, fyll: FARGE.is, strek: FARGE.isKant },
                { punkter: bergP, fyll: "#6f6d64", strek: "#c9c6b8" },
              ]}
              etiketter={profEtiketter}
            />
            <g data-nocheck="" aria-hidden="true">
              <path
                d={viddeDeler
                  .filter((d) => d.length > 1)
                  .map(sti)
                  .join(" ")}
                fill="none"
                stroke={FARGE.viddeSnitt}
                strokeWidth={VIDDE_STREK.bredde}
                strokeDasharray={VIDDE_STREK.dash}
                strokeLinecap="round"
              />
              {strandP.length > 1 ? (
                // strandflaten: samme farge som i blokken (STRAND i landskap-modell), tykk og langstiplet, med mørk
                // kant under så den skiller seg fra den tynne, kortstiplede havnivå-linja også over hav og berg.
                // Kontrast #b2a878 mot snittets bakgrunn #101b22 (terreng-figur.tsx, Hoydeprofil): 7,3:1.
                // Vidde-linja (#e8b4d8, prikket): 9,9:1 mot #101b22; ΔE2000 38 / ΔE76 48 mot strandflaten.
                <g opacity={Math.round(Math.min(1, strandS) * 100) / 100}>
                  <path
                    d={sti(strandP)}
                    fill="none"
                    stroke={STRAND_STREK.kant}
                    strokeWidth={STRAND_STREK.bredde + 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={sti(strandP)}
                    fill="none"
                    stroke={FARGE.strand}
                    strokeWidth={STRAND_STREK.bredde}
                    strokeDasharray={STRAND_STREK.dash}
                    strokeLinejoin="round"
                  />
                </g>
              ) : null}
              <line
                x1={pr.x}
                x2={pr.x + pr.w}
                y1={havY}
                y2={havY}
                stroke="#bfe3f5"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.8"
              />
              {snoOp > 0.02 ? (
                <line
                  x1={pr.x}
                  x2={pr.x + pr.w}
                  y1={zTilY(SNOGRENSE)}
                  y2={zTilY(SNOGRENSE)}
                  stroke={FARGE.sno}
                  strokeWidth="1.4"
                  strokeDasharray="8 6"
                  opacity={snoOp}
                />
              ) : null}
            </g>
            <text
              x={pr.x + 8}
              y={havY - 4}
              fontSize={fsLite}
              fill="#bfe3f5"
              textAnchor="start"
              paintOrder="stroke"
              stroke="#101b22"
              strokeWidth="3"
            >
              havnivå
            </text>
            {!b && fase === 5 ? (
              <text
                x={xKryss + 8}
                y={ty5 + fsP + 6}
                fontSize={fsP}
                fontWeight={700}
                fill="#e6e1c8"
                paintOrder="stroke"
                stroke="#101b22"
                strokeWidth="3"
              >
                til 30–40 m under havnivå
              </text>
            ) : null}
            {snoOp > 0.5 ? (
              <text
                x={snoX}
                y={snoY}
                fontSize={fsLite}
                fill={FARGE.sno}
                textAnchor="end"
                paintOrder="stroke"
                stroke="#101b22"
                strokeWidth="3"
              >
                snøgrensen
              </text>
            ) : null}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/** Tidsspor: når prosessene virket. Skjematisk, ikke i målestokk; aktivt spor er uthevet. */
function Tidsspor({ spor, fase }: { spor: Spor[]; fase: number }) {
  return (
    <div className="mt-3">
      <div className="flex items-baseline justify-between text-[12px] leading-tight text-muted-foreground">
        <span className="font-semibold text-foreground">Tidsspor</span>
        <span>ikke i målestokk</span>
      </div>
      <ul
        className="mt-1 grid grid-cols-1 gap-1 @min-[600px]:grid-cols-2 @min-[600px]:gap-x-4"
        aria-label="Tidsspor"
      >
        {spor.map((s) => {
          const aktiv = s.faser.includes(fase);
          return (
            <li key={s.navn} className="h-[44px] min-w-0" aria-current={aktiv ? "step" : undefined}>
              <div
                className={`line-clamp-2 text-[12px] leading-[15px] ${aktiv ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                {s.tid ? `${s.navn}: ${s.tid}` : s.navn}
              </div>
              <div className="relative mt-0.5 h-2 w-full rounded-full bg-muted" aria-hidden="true">
                <div
                  className={
                    s.toner
                      ? "absolute top-0 h-2 rounded-l-full"
                      : `absolute top-0 h-2 rounded-full ${aktiv ? "bg-[#e3d9a6]" : "bg-[#e3d9a6]/35"}`
                  }
                  style={{
                    left: `${s.fra * 100}%`,
                    width: `${(s.til - s.fra) * 100}%`,
                    // tones ut mot høyre («og i tiden etterpå»), uten hard slutt ved «nå»
                    backgroundImage: s.toner
                      ? `linear-gradient(to right, rgb(227 217 166 / ${aktiv ? 1 : 0.35}) 45%, rgb(227 217 166 / 0))`
                      : undefined,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div
        className="mt-0.5 flex justify-between text-[11px] text-muted-foreground"
        aria-hidden="true"
      >
        <span>eldre</span>
        <span>nå</span>
      </div>
    </div>
  );
}

/** Gir figuren skalaen IsbreFigur har målt (CSS-piksler per viewBox-enhet), etter rendering. */
function Skala({ verdi, sett }: { verdi: number; sett: (v: number) => void }) {
  useEffect(() => {
    if (verdi > 0) sett(Math.round(verdi * 1000) / 1000);
  }, [verdi, sett]);
  return null;
}
