/**
 * Botn, egg og tind (isbreer-og-landformer.md l. 81–83): ny terrengmodell med tidslinje.
 *
 * Et avrundet fjell i høyfjellet sett skrått ovenfra. Snø blir til en liten bre i en forsenkning
 * (fase 1), breen skurer ut en botn med bratt bakvegg (2), en bre på den andre siden av ryggen
 * graver samtidig så det står igjen en egg (3), breer på flere sider gir en tind (4), og når isen er
 * borte, står formene igjen (5). Under modellen: høydeprofil A–B gjennom de to fremste botnene.
 * Linsen viser bresålen: snø som blir is (1) og skuring (2–4, md l. 53).
 *
 * Terrenget tegnes i canvas som nøkkelbilder (terreng-kit), bare på klienten. Serveren viser en
 * plassholder (prosess-figurer-lat.tsx). Ingen plukking ved bakveggen og ikke vann i botnene.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { IsbreFigur, StegVelger, type Key, type Lab } from "./isbre-figur";
import { clamp, figureFont, lerp, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { KornLag, Maalere, TidslinjeKontroller, Zoomlinse } from "./prosess-figur";
import { lagKornTekstur, lat, prng, useFigurSmal, useTidslinje, type Korn } from "./prosess-kit";
import { lagTerrengNett, skraaProj, tegnSider, terrengJobb, type SkraaProj } from "./terreng-kit";
import { Flytstrok, Hoydeprofil, TerrengLerret } from "./terreng-figur";
import { useNokkelbilder, type BildeJobb } from "./terreng-nokkelbilder";
import {
  BT_D,
  BT_W,
  TOPP,
  BREER,
  bergHoyde,
  botnForm,
  farge,
  isHoyde,
  overflate,
  ryggSkarphet,
  tilstandVed,
  type BotnTilstand,
} from "./botn-egg-tind-modell";
import { BOTN_EGG_TIND_TEKST, BOTN_FASER, BOTN_STATUS, BOTN_STATUS_STILLE } from "./botn-egg-tind-tekst";

/** Nøkkelbilder per fase. Mellom dem krysstones terrenget. */
const PER_FASE = 6;

type Oppsett = {
  vb: [number, number];
  /** Område for terrenglerretet. */
  blokk: { x: number; y: number; w: number; h: number };
  proj: { ox: number; oy: number; skala: number };
  nett: [number, number];
  profil: { y: number; h: number };
  linse: { cx: number; cy: number; r: number };
};

const BRED: Oppsett = {
  vb: [960, 600],
  blokk: { x: 0, y: 0, w: 700, h: 492 },
  proj: { ox: 46, oy: 466, skala: 0.86 },
  nett: [88, 64],
  profil: { y: 500, h: 92 },
  linse: { cx: 836, cy: 176, r: 108 },
};

const SMAL: Oppsett = {
  vb: [520, 790],
  blokk: { x: 0, y: 0, w: 520, h: 414 },
  proj: { ox: 26, oy: 394, skala: 0.66 },
  nett: [64, 46],
  profil: { y: 424, h: 104 },
  linse: { cx: 260, cy: 664, r: 112 },
};

const KAMERA = { kx: 0.26, hevning: 52, overdriv: 1.4 };

/** Profillinjen A–B går vest–øst gjennom bunnen av de to fremste botnene. */
const AB_Y = 163;
const AB_X: [number, number] = [52, 548];

const FARGE = {
  is: "#cfe4f1",
  isKant: "#8fb7d2",
  berg: "#7d7d73",
  bergMork: "#4f4c47",
  sno: "#eef4f8",
  profil: "#f3d27a",
  flyt: "#5f93b8",
};

/** Retningsvektorer for de fire breene (som i modellen). */
const RETN: [number, number][] = BREER.map(({ vinkel: v }) => [Math.cos((v * Math.PI) / 180), Math.sin((v * Math.PI) / 180)]);
/** Punkt i verden for bre k: `langs` ut fra toppen, `tvers` på tvers. */
const brePunkt = (k: number, langs: number, tvers = 0): [number, number] => {
  const [ux, uy] = RETN[k];
  return [TOPP[0] + ux * langs - uy * tvers, TOPP[1] + uy * langs + ux * tvers];
};
/** Bakkanten til skålen (avstand fra toppen) ved fremdrift a, fra modellen. */
const bakVed = (a: number) => botnForm(a).bak;
const midtVed = (a: number) => botnForm(a).midt;

function tilstandNokkel(t: BotnTilstand) {
  return [...t.grav, ...t.is].map((v) => v.toFixed(3)).join(",");
}

/* ---------- linsen: steiner i bresålen ---------- */

const steiner = lat(() =>
  lagKornTekstur({
    seed: 4417,
    avstand: 0.32,
    bredde: 3.2,
    hoyde: 0.5,
    storrelse: [0.35, 0.8],
    fyllHull: 0.15,
    inni: (x, y) => Math.sin(x * 9.1 + y * 3.7) > -0.1,
    typer: 3,
    kanter: 8,
    nokkel: "botn-steiner",
  }),
);
const snoLag = lat(() => {
  const r = prng(907);
  return Array.from({ length: 9 }, () => 0.7 + r() * 0.6);
});

export function BotnEggTindFigur({ heading = BOTN_EGG_TIND_TEKST.heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const tl = useTidslinje({ antall: BOTN_FASER.length, synlig: visible, faseMs: 3800, holdMs: 1700, element: ref });
  const [stille, setStille] = useState(false);
  const [frys, setFrys] = useState(Infinity);
  const L = small ? SMAL : BRED;
  const [vbW, vbH] = L.vb;
  const proj: SkraaProj = useMemo(
    () => skraaProj({ ox: L.proj.ox, oy: L.proj.oy, skala: L.proj.skala, ...KAMERA }),
    [L.proj.ox, L.proj.oy, L.proj.skala],
  );
  const frysEff = stille ? frys : Infinity;
  const t = tilstandVed(tl.p, frysEff);
  const fase = tl.fase;
  const beveger = !stille;

  /* ---- nøkkelbilder: terrenget i canvas ---- */
  const [skala, setSkala] = useState(0);
  const lag = useCallback(
    (nokkel: string): BildeJobb => {
      const [q, f] = nokkel.split("|");
      const ts = tilstandVed(Number(q) / PER_FASE, f === "-" ? Infinity : Number(f));
      const nett = lagTerrengNett(L.nett[0], L.nett[1], BT_W, BT_D);
      return function* (ctx) {
        const Z = yield* terrengJobb(ctx, nett, (x, y) => overflate(x, y, ts), {
          proj,
          farge: (x, y, z, hl) => farge(x, y, z, hl, ts),
        });
        tegnSider(ctx, nett, Z, proj, { bunn: -34, fyll: "#4b4741", side: "#3a3833", lag: "rgba(18,16,14,0.38)" });
      };
    },
    [L.nett, proj],
  );
  const { lager, versjon } = useNokkelbilder(lag, L.blokk.w, L.blokk.h, skala, skala > 0);
  const qPos = clamp(tl.p, 0, BOTN_FASER.length) * PER_FASE;
  const qa = Math.min(Math.floor(qPos), BOTN_FASER.length * PER_FASE - 1);
  const vekt = qPos - qa;
  const nokkelFor = (q: number) => {
    const fr = stille && q / PER_FASE > frys ? frys.toFixed(4) : "-";
    return `${q}|${fr}`;
  };
  const na = nokkelFor(qa);
  const nb = nokkelFor(qa + 1);
  let bildeA: HTMLCanvasElement | null = null;
  let bildeB: HTMLCanvasElement | null = null;
  // `versjon` øker når et nøkkelbilde er ferdig; da rendres figuren på nytt og henter det
  if (lager && versjon >= 0) {
    bildeA = lager.hent(na);
    bildeB = lager.hent(nb);
    const forran = [na, nb];
    if (tl.playing) for (let d = 2; d <= 4; d++) forran.push(nokkelFor((qa + d) % (BOTN_FASER.length * PER_FASE + 1)));
    lager.bestill(forran);
    // står figuren stille, venter brukeren på akkurat dette bildet: tegn det med en gang
    if (!tl.playing) {
      if (!bildeA) bildeA = lager.tving(na);
      if (!bildeB && vekt > 0.005) bildeB = lager.tving(nb);
    }
  }

  /* ---- 3D-punkter og etiketter ---- */
  const P3 = (x: number, y: number, dz = 0) => proj(x, y, overflate(x, y, t) + dz);
  const g0 = t.grav[0];
  const g1 = t.grav[1];
  const botnGulv = brePunkt(0, midtVed(g0));
  const bakvegg = brePunkt(0, midtVed(g0) - 0.85 * botnForm(g0).rInn);
  // eggen mellom sv og so ligger rett sør for toppen, der skålene møtes
  const eggPkt: [number, number] = [TOPP[0], TOPP[1] - 56];
  const toppPkt = P3(TOPP[0], TOPP[1], 2);
  const fs = 15;
  const labels: Lab[] = [];
  const gulvS = P3(...botnGulv);
  const bakS = P3(...bakvegg);
  const eggS = P3(...eggPkt, 1);
  const iceS = P3(...brePunkt(0, midtVed(g0) - 8), 2);
  const vb = (x: number, y: number) => [x, y] as [number, number];
  if (fase === 1) {
    labels.push({ text: "Liten bre i en forsenkning", x: 20, y: 192, at: iceS, size: fs, weight: 700, color: "#cfe9f8", badge: vb(gulvS[0] - 50, gulvS[1] + 62) });
  }
  if (fase >= 2) {
    labels.push({ text: fase === 2 ? "Botn: skålform" : "Botn", x: 20, y: 258, at: gulvS, size: fs, weight: 700, color: "#f3eee2", badge: vb(gulvS[0] - 50, gulvS[1] + 62) });
  }
  if (fase === 2) {
    labels.push({ text: "Bratt bakvegg: brytes ned av frost og steinsprang", x: 20, y: 104, at: bakS, size: fs, weight: 700, color: "#f0b27a", badge: vb(bakS[0] - 30, bakS[1] - 46) });
    const steinPkt = P3(...brePunkt(0, midtVed(g0) + 0.25 * botnForm(g0).rUt, -0.18 * botnForm(g0).B), 1);
    labels.push({ text: "Steinene havner på breen, og breen frakter dem bort", x: 20, y: 316, at: steinPkt, size: fs, weight: 700, color: "#e6d3b8", badge: vb(steinPkt[0] + 38, steinPkt[1] + 36) });
  }
  if (fase === 5) {
    const vannPkt = P3(...brePunkt(0, midtVed(g0) + 4), 0);
    labels.push({ text: "Vann i bunnen av botnen", x: 20, y: 316, at: vannPkt, size: fs, weight: 700, color: "#9fd0ee", badge: vb(vannPkt[0] - 46, vannPkt[1] + 36) });
  }
  if (fase >= 3) {
    labels.push({
      text: fase === 3 ? "Egg: skarp rygg mellom to botner" : "Egg",
      x: small ? eggS[0] : 470,
      y: small ? eggS[1] : 196,
      at: eggS,
      anchor: "start",
      size: fs,
      weight: 700,
      color: "#f3d27a",
      badge: vb(eggS[0] + 44, eggS[1] - 26),
    });
  }
  if (fase >= 4) {
    labels.push({ text: fase === 4 ? "Tind: spiss topp" : "Tind", x: toppPkt[0] + 70, y: Math.max(26, toppPkt[1] - 22), at: toppPkt, anchor: "start", size: fs, weight: 700, color: "#ffffff", badge: vb(toppPkt[0] + 42, toppPkt[1] + 6) });
  }

  /* ---- steinsprang: steiner faller fra bakveggen ned på breen og fraktes bort med isen (fase 2–4) ---- */
  const sprang: { x: number; y: number; r: number; op: number }[] = [];
  if (fase >= 2 && fase <= 4) {
    for (const k of [0, 1, 2]) {
      if (t.is[k] < 0.4 || t.grav[k] < 0.15) continue;
      const f = botnForm(t.grav[k]);
      for (let j = 0; j < 4; j++) {
        const periode = 7 + j * 1.3;
        const u = ((((beveger ? tl.sek : 0) + j * 2.3 + k * 1.7) / periode) % 1 + 1) % 1;
        const tv = (j - 1.5) * 0.26 * f.B;
        const fra = f.midt - 1.18 * f.rInn;
        const ned = f.midt - 0.72 * f.rInn;
        const ut = f.midt + 1.05 * f.rUt;
        // fall nedover bakveggen (raskt, økende fart), så med isen ut mot terskelen
        const langs = u < 0.18 ? lerp(fra, ned, (u / 0.18) ** 2) : lerp(ned, ut, (u - 0.18) / 0.82);
        const [x, y] = brePunkt(k, langs, tv * (u < 0.18 ? 1 : 1 - 0.2 * ((u - 0.18) / 0.82)));
        const [sx, sy] = P3(x, y, 1.5);
        sprang.push({ x: sx, y: sy, r: (small ? 3.4 : 2.7) * (0.8 + 0.12 * j), op: clamp((1 - u) / 0.12) * clamp(u / 0.03) * clamp((t.is[k] - 0.4) * 3) });
      }
    }
  }

  /* ---- flytstrøk på isen (sv og so) ---- */
  const flyt: { baner: [number, number][][]; op: number }[] = [];
  for (const k of [0, 1]) {
    const g = t.is[k];
    if (g < 0.2) continue;
    const bak = bakVed(t.grav[k]);
    const B = botnForm(t.grav[k]).B;
    const baner: [number, number][][] = [];
    for (const tv of [-0.42, 0, 0.42]) {
      const bane: [number, number][] = [];
      for (let s = 0; s <= 8; s++) {
        const langs = bak + 16 + s * 13;
        const [x, y] = brePunkt(k, langs, tv * B * (1 - s * 0.03));
        if (isHoyde(x, y, t) < 1.5) break;
        bane.push(P3(x, y, 0.6));
      }
      if (bane.length > 2) baner.push(bane);
    }
    flyt.push({ baner, op: clamp((g - 0.2) * 2) });
  }

  /* ---- profil A–B ---- */
  const pr = { x: proj(AB_X[0], AB_Y, 0)[0], y: L.profil.y, w: proj(AB_X[1], AB_Y, 0)[0] - proj(AB_X[0], AB_Y, 0)[0], h: L.profil.h };
  const fsP = figureFont(small ? 13 : 13, skala);
  const zTilY = (z: number) => pr.y + pr.h - 4 - ((z - 60) / 280) * (pr.h - fsP - 10);
  const bergP: [number, number][] = [];
  const isP: [number, number][] = [];
  for (let k = 0; k <= 80; k++) {
    const x = lerp(AB_X[0], AB_X[1], k / 80);
    const zb = bergHoyde(x, AB_Y, t.grav);
    const sx = lerp(pr.x, pr.x + pr.w, k / 80);
    bergP.push([sx, zTilY(zb)]);
    isP.push([sx, zTilY(zb + isHoyde(x, AB_Y, t))]);
  }
  const abLinje: [number, number][] = [];
  for (let k = 0; k <= 40; k++) {
    const x = lerp(AB_X[0], AB_X[1], k / 40);
    abLinje.push(P3(x, AB_Y, 1.2));
  }
  const xVed = (wx: number) => lerp(pr.x, pr.x + pr.w, (wx - AB_X[0]) / (AB_X[1] - AB_X[0]));
  const svX = brePunkt(0, midtVed(g0))[0];
  const soX = brePunkt(1, midtVed(g1))[0];
  const profEtiketter: { tekst: string; x: number; y: number; ty: number; farge: string; anker?: "start" | "middle" | "end" }[] = [];
  const zVed = (wx: number) => zTilY(bergHoyde(wx, AB_Y, t.grav));
  if (g0 > 0.25) profEtiketter.push({ tekst: "botn", x: xVed(svX), y: zVed(svX) - 2, ty: pr.y + fsP + 4, farge: "#f3eee2" });
  if (Math.min(g0, g1) > 0.35) {
    let ex = TOPP[0];
    let best = -1;
    for (let wx = 240; wx <= 360; wx += 2) {
      const z = bergHoyde(wx, AB_Y, t.grav);
      if (z > best) {
        best = z;
        ex = wx;
      }
    }
    profEtiketter.push({ tekst: "egg", x: xVed(ex), y: zTilY(best) - 2, ty: pr.y + fsP + 4, farge: "#f3d27a" });
  }
  if (g1 > 0.25) profEtiketter.push({ tekst: "botn", x: xVed(soX), y: zVed(soX) - 2, ty: pr.y + fsP + 4, farge: "#f3eee2" });
  // smal profil: «botn» skyves ut til hver side når den ellers ville ligge oppå «egg»
  const eggE = profEtiketter.find((e) => e.tekst === "egg");
  if (eggE) for (const e of profEtiketter) if (e !== eggE && Math.abs(e.x - eggE.x) < fsP * 2.4) e.anker = e.x < eggE.x ? "end" : "start";

  /* ---- linsen ---- */
  const { linse } = L;
  const R = linse.r;
  // berget slipes ned i fase 2–4 (står stille sammen med isen i tankeeksperimentet)
  const sliptEff = Math.min(clamp((tl.p - 1) / 3), stille ? clamp((frys - 1) / 3) : 1);
  const grunn = 0.08 + 0.16 * sliptEff;
  const sek = tl.sek;
  const STEIN = steiner();
  const flytX = beveger && fase >= 2 && fase <= 4 ? sek * 0.07 : 0;
  const steinPos = (k: Korn): [number, number, number] => {
    const x = (((k.x + 1.6 + flytX) % 3.2) + 3.2) % 3.2 - 1.6;
    // steinene ligger nederst i isen og presses mot berget
    const loft = (((k.y * 97.3) % 1) + 1) % 1;
    const y = grunn - k.r * 0.8 - loft * loft * 0.12;
    return [linse.cx + x * R, linse.cy + y * R, Math.abs(x) < 1.05 ? 1 : 0];
  };
  const steinFyll = useMemo(() => (k: Korn) => ["#6e6a63", "#8a857b", "#5a5751"][k.type], []);
  const linseModus = fase === 1 ? "sno" : fase === 5 ? "bart" : "saale";
  let linseTekst = "";
  if (linseModus === "sno") linseTekst = "Snøen presses sammen og blir til is";
  if (linseModus === "saale") linseTekst = stille ? "Isen står stille: ingen skuring" : "Skuring: steiner i bresålen sliper berget";
  if (linseModus === "bart") linseTekst = "Underlaget er slipt ned";
  if (linseTekst)
    labels.push({
      text: linseTekst,
      // høyrejustert mot figurens høyrekant, så lange etiketter ikke kuttes
      x: Math.min(linse.cx + R, vbW - 8),
      y: linse.cy + R + 30,
      at: [linse.cx, linse.cy + R * (linseModus === "sno" ? -0.1 : grunn - 0.12)],
      anchor: "end",
      size: fs,
      weight: 700,
      color: "#cfe9f8",
      badge: vb(linse.cx + R * 0.72, linse.cy - R * 0.85),
    });

  /* ---- målere og tekst ---- */
  // Målerne følger steget (og statusteksten), også ved slutten av hvert steg: steg 1 ingen graver ennå,
  // steg 2 én, steg 3 to, steg 4 flere; i steg 5 er isen borte. Står isen stille, graver ingen.
  const graver = beveger ? [0, 1, 2, 4, 0][fase - 1] : 0;
  const isFinnes = fase < 5 && Math.max(...t.is) > 0.15;
  const graverTekst = graver === 0 ? "ingen" : graver === 1 ? "én" : graver === 2 ? "to" : "flere";
  const status = stille && fase >= 2 && fase <= 4 ? BOTN_STATUS_STILLE : BOTN_STATUS[fase - 1];
  const keys: Key[] = [
    { text: "Is (bre)", color: FARGE.is, kind: "fill" },
    { text: "Snø", color: FARGE.sno, kind: "fill" },
    { text: "Berg", color: FARGE.berg, kind: "fill" },
    { text: "Profillinje A–B", color: FARGE.profil, kind: "line" },
  ];

  const himmelId = "botn-himmel";
  return (
    <div
      ref={wrapRef}
      className="[&_ol]:min-h-[8.75rem] [&_ol]:content-start [&_p[aria-live]]:min-h-[5.25rem] min-[370px]:[&_p[aria-live]]:min-h-[3.75rem] lg:[&_p[aria-live]]:min-h-[2.5rem]"
    >
      <IsbreFigur
        svgRef={ref}
        title={BOTN_EGG_TIND_TEKST.title}
        heading={heading}
        caption={caption ?? BOTN_EGG_TIND_TEKST.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={
          <div className={small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"}>
            <TidslinjeKontroller tl={tl} faser={BOTN_FASER} />
            <StegVelger
              labels={["Isen beveger seg", "Isen står stille (tankeeksperiment)"]}
              step={stille ? 2 : 1}
              onStep={(n) =>
                tl.valg(() => {
                  setStille(n === 2);
                  setFrys(tl.p);
                })
              }
              label="Isen"
            />
          </div>
        }
        status={status}
        keys={keys}
        labels={labels}
        notes={["Terrengmodell, skjematisk", "Typeområder: Jotunheimen og Sunnmørsalpene", "Målerne viser retning, ikke tall"]}
        viewBox={`0 0 ${vbW} ${vbH}`}
        below={
          <Maalere
            maalere={[
              { navn: "Isen beveger seg", verdi: isFinnes && beveger ? 1 : 0, ender: ["nei", "ja"], farge: "#8eb4d4", tekst: !isFinnes ? "ingen is" : beveger ? "ja" : "nei" },
              { navn: "Breer som graver", verdi: graver / 4, ender: ["ingen", "flere"], farge: "#9fd3ea", tekst: graverTekst },
              { navn: "Ryggen mellom botnene", verdi: ryggSkarphet(t.grav), ender: ["bred", "skarp"], farge: "#f3d27a" },
            ]}
          />
        }
      >
        {({ scale }) => {
          return (
            <g data-figur="botn-egg-tind" data-step={fase} data-p={tl.p.toFixed(2)} data-tilstand={`${tilstandNokkel(t)}|${stille ? "stille" : "beveger"}`}>
              <defs>
                <linearGradient id={himmelId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0f1d26" />
                  <stop offset="1" stopColor="#24404f" />
                </linearGradient>
              </defs>
              <rect x={L.blokk.x} y={L.blokk.y} width={L.blokk.w} height={L.blokk.h} fill={`url(#${himmelId})`} rx="10" />
              {/* fjerne fjell i bakgrunnen */}
              <path
                data-nocheck=""
                d={
                  small
                    ? "M0 210 L60 168 L120 196 L190 150 L250 186 L330 144 L400 182 L460 156 L520 190 L520 260 L0 260 Z"
                    : "M0 236 L80 184 L150 214 L230 166 L300 206 L390 152 L470 196 L560 160 L640 198 L700 178 L700 300 L0 300 Z"
                }
                fill="#1a2b35"
              />
              <Skala verdi={scale} sett={setSkala} />
              <TerrengLerret x={L.blokk.x} y={L.blokk.y} bredde={L.blokk.w} hoyde={L.blokk.h} skala={skala} a={bildeA} b={bildeB} vekt={vekt} />
              {/* isen flyter: strøk som beveger seg nedover og utover */}
              {beveger
                ? flyt.map((f, i) => <Flytstrok key={i} baner={f.baner} sek={sek} fart={12} farge={FARGE.flyt} bredde={small ? 2.2 : 1.8} opasitet={f.op * 0.85} />)
                : null}
              {/* steinsprang fra bakveggen, som breen frakter bort */}
              <g data-nocheck="" aria-hidden="true">
                {sprang.map((st, i) =>
                  st.op > 0.02 ? <circle key={i} cx={st.x.toFixed(1)} cy={st.y.toFixed(1)} r={st.r} fill="#5f5953" stroke="#2a2622" strokeWidth="0.8" opacity={st.op} /> : null,
                )}
              </g>
              {/* profillinjen A–B på terrenget */}
              <path d={`M${abLinje.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`} fill="none" stroke={FARGE.profil} strokeWidth="1.6" strokeDasharray="6 5" opacity="0.9" />
              <text x={abLinje[0][0] - 6} y={abLinje[0][1] + 5} fontSize={fsP} fontWeight={700} fill={FARGE.profil} textAnchor="end" paintOrder="stroke" stroke="#101b22" strokeWidth="3">
                A
              </text>
              <text x={abLinje[abLinje.length - 1][0] + 6} y={abLinje[abLinje.length - 1][1] + 5} fontSize={fsP} fontWeight={700} fill={FARGE.profil} paintOrder="stroke" stroke="#101b22" strokeWidth="3">
                B
              </text>
              <Hoydeprofil
                ramme={pr}
                fs={fsP}
                ender={["A", "B"]}
                lag={[
                  { punkter: isP, fyll: FARGE.is, strek: FARGE.isKant },
                  { punkter: bergP, fyll: "#6f6d64", strek: "#c9c6b8" },
                ]}
                etiketter={profEtiketter}
              />
              {/* linsen: bresålen */}
              <Zoomlinse
                cx={linse.cx}
                cy={linse.cy}
                r={R}
                fra={small ? undefined : [gulvS[0], gulvS[1], 6, 6]}
                bakgrunn={linseModus === "bart" ? "#2c4250" : FARGE.is}
              >
                {linseModus === "sno" ? (
                  <g data-nocheck="">
                    {snoLag().map((tykk, i) => {
                      // lagene synker sakte og blir tynnere og blåere nedover (presses sammen)
                      const rel = ((i / 9 + (beveger ? sek * 0.018 : 0)) % 1 + 1) % 1;
                      const y0 = linse.cy - R + rel * R * 1.5;
                      const h = R * 0.22 * tykk * (1 - rel * 0.65);
                      return (
                        <rect key={i} x={linse.cx - R} y={y0} width={R * 2} height={h} fill={mixFarge(rel)} stroke="#a9c9de" strokeWidth="0.8" strokeOpacity="0.6" />
                      );
                    })}
                    <rect x={linse.cx - R} y={linse.cy + R * 0.55} width={R * 2} height={R} fill="#5d5a54" />
                  </g>
                ) : (
                  <g data-nocheck="">
                    {linseModus === "saale"
                      ? [-0.6, -0.35, -0.1].map((yy, i) => (
                          <line
                            key={i}
                            x1={linse.cx - R}
                            x2={linse.cx + R}
                            y1={linse.cy + yy * R}
                            y2={linse.cy + yy * R}
                            stroke="#9cc0d8"
                            strokeWidth="1.4"
                            strokeDasharray="14 10"
                            strokeDashoffset={beveger ? -(sek * 18) % 24 : 0}
                          />
                        ))
                      : null}
                    {linseModus === "saale" ? (
                      <KornLag korn={STEIN} skala={R} pos={steinPos} fyll={steinFyll} noekkel={`${linse.cx}|${linse.cy}|${R}|${flytX.toFixed(3)}|${grunn.toFixed(3)}`} />
                    ) : null}
                    {/* berget: overflaten senkes etter hvert som det slipes ned */}
                    <rect x={linse.cx - R} y={linse.cy + grunn * R} width={R * 2} height={R * 1.2} fill="#6a675f" />
                    {/* slipt, glatt overflate */}
                    {sliptEff > 0.05 ? (
                      <line x1={linse.cx - R} x2={linse.cx + R} y1={linse.cy + grunn * R + 1} y2={linse.cy + grunn * R + 1} stroke="#b9b3a6" strokeWidth="2" opacity={0.4 + 0.5 * sliptEff} />
                    ) : null}
                    {/* lagene i berget ligger fast: når overflaten slipes ned, kuttes de øverste lagene bort */}
                    {[0.12, 0.19, 0.28, 0.42, 0.58, 0.76].map((yy) =>
                      yy > grunn + 0.01 ? (
                        <line key={yy} x1={linse.cx - R} x2={linse.cx + R} y1={linse.cy + yy * R} y2={linse.cy + yy * R} stroke="#4c4a44" strokeWidth="1.2" />
                      ) : null,
                    )}
                    {linseModus === "saale" && beveger
                      ? STEIN.filter((k) => k.r > 0.07).map((k, i) => {
                          const [sxp, , op] = steinPos(k);
                          if (!op) return null;
                          // finknust berg blir liggende bak steinene
                          return <circle key={i} cx={sxp - R * (k.r + 0.06)} cy={linse.cy + grunn * R - 2} r={1.6} fill="#c9c3b5" opacity="0.8" />;
                        })
                      : null}
                  </g>
                )}
              </Zoomlinse>
            </g>
          );
        }}
      </IsbreFigur>
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

function mixFarge(rel: number) {
  // snø (hvit) øverst, is (blå) nederst
  const a = [244, 248, 250];
  const b = [158, 196, 222];
  const t = clamp(rel * 1.1);
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
}
