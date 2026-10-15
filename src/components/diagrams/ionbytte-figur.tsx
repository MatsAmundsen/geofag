/**
 * Metasomatose: ionebytte langs en korngrense, bygget på prosess-kit.
 * Alle faglige poeng og etiketter følger Mats' tekst i bergarter.md (avsnittet «Metasomatose»).
 * Ingen grunnstoffpar eller mineralnavn, fordi teksten ikke nevner noen. Målerne er relative.
 *
 * Erstatter IonBytteFigur (bergarter-nye-figurer.tsx) i widgeten IonBytte. Den gamle filen er ikke endret.
 */
import { useState } from "react";
import { IsbreFigur, StegVelger, type Key, type Lab } from "./isbre-figur";
import { clamp, lerp, smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { Maalere, TidslinjeKontroller, Zoomlinse } from "./prosess-figur";
import { prng, tidslinjeVerdi, useFigurSmal, useTidslinje } from "./prosess-kit";

const FASER = ["Fast gitter og væskefilm", "Ion hopper ut", "Nytt ion tar plassen", "Væsken frakter ionet bort", "Ny sammensetning"];

/** Kilde per steg står i PR-beskrivelsen. */
const STATUS_MED = [
  "Varm væske ligger som en tynn film langs korngrensene. Gitteret i kornene er fast.",
  "Et ion hopper ut av gitteret og over i væsken. Berget er fortsatt fast.",
  "Et annet ion fra væsken tar plassen i gitteret.",
  "Væsken er transportbåndet. Den fører ioner inn og ut av mineralene, og flere ioner byttes.",
  "Bergarten har skiftet sammensetning uten å smelte. Det kalles metasomatose. Dette er ikke smelting. Berget er fortsatt fast.",
];
const STATUS_UTEN = [
  "Tankeeksperiment: ingen væske langs korngrensene. Gitteret i kornene er fast.",
  "Tankeeksperiment: uten væsken flytter ionene seg nesten ikke.",
  "Tankeeksperiment: uten væsken flytter ionene seg nesten ikke. Ingen ioner byttes.",
  "Tankeeksperiment: væsken er transportbåndet. Uten den flytter ionene seg nesten ikke.",
  "Tankeeksperiment: uten væske skifter ikke bergarten sammensetning her. Berget er fortsatt fast.",
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { ut: 0, inn: 0, bort: 0, fler: 0 },
  { ut: 0, inn: 0, bort: 0, fler: 0 },
  { ut: 1, inn: 0, bort: 0, fler: 0 },
  { ut: 1, inn: 1, bort: 0.15, fler: 0 },
  { ut: 1, inn: 1, bort: 1, fler: 0.35 },
  { ut: 1, inn: 1, bort: 1, fler: 1 },
];

const FARGE = {
  ut: "#e8a04a",
  inn: "#5fb4e0",
  rammeA: "#a7b0b8",
  rammeB: "#b5a796",
  kationB: "#9b7fc0",
  vaeske: "#2b6f8e",
  vaeskeKant: "#7cc4e4",
  bakA: "#3b434b",
  bakB: "#4a4239",
  tørr: "#15191d",
};

/* ---------- gitter i enhetskoordinater (linsen har radius 1) ---------- */

const A = 0.17; // gitteravstand
const W = 0.085; // halv bredde på væskefilmen
const filmX = (y: number) => 0.02 * Math.sin(y * 4);

type Plass = { x: number; y: number; kation: boolean; i: number; j: number };

/** Korn A til venstre for korngrensen: rader av atomer, kationplasser i sjakkmønster. */
const GITTER_A: Plass[] = (() => {
  const ut: Plass[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = -7; j <= 7; j++) {
      const x = -W - 0.1 - i * A;
      const y = j * A;
      if (Math.hypot(x, y) < 1.04) ut.push({ x, y, kation: (i + j) % 2 === 0, i, j });
    }
  return ut;
})();

/** Korn B til høyre: samme slags gitter, men dreid (et annet korn). */
const GITTER_B: Plass[] = (() => {
  const ut: Plass[] = [];
  const v = (28 * Math.PI) / 180;
  for (let i = -8; i <= 8; i++)
    for (let j = -8; j <= 8; j++) {
      const lx = i * A;
      const ly = j * A;
      const x = 0.55 + lx * Math.cos(v) - ly * Math.sin(v);
      const y = lx * Math.sin(v) + ly * Math.cos(v);
      if (x > W + 0.09 && Math.hypot(x, y) < 1.04) ut.push({ x, y, kation: (((i + j) % 2) + 2) % 2 === 0, i, j });
    }
  return ut;
})();

/** Hovedplassen (steg 2–3): kationen nærmest filmen på midtre rad. */
const HOVED = GITTER_A.find((p) => p.i === 0 && p.j === 0)!;
/** Andre plasser som byttes i steg 4–5: de to radene nærmest filmen, innerst først. */
const ANDRE = GITTER_A.filter((p) => p.kation && p.i <= 1 && p !== HOVED && Math.abs(p.y) < 0.95)
  .sort((a, b) => a.i - b.i || Math.abs(a.j) - Math.abs(b.j))
  .map((p, k, alle) => ({ ...p, t: (k / alle.length) * 0.8 }));

/** Ioner som driver nedover i filmen. Faste startverdier (SSR-trygt). */
const DRIV = (() => {
  const rnd = prng(515);
  return Array.from({ length: 14 }, (_, k) => ({ y: rnd() * 2 - 1, v: 0.6 + rnd() * 0.6, x: (rnd() - 0.5) * W * 1.1, ut: k % 4 === 0 }));
})();

/* ---------- oversikt: korn med korngrenser ---------- */

type Pt = [number, number];
const KORN_OVERSIKT: { navn: string; pts: Pt[]; fyll: string }[] = [
  { navn: "A", pts: [[60, 150], [150, 70], [250, 70], [240, 200], [262, 330], [160, 360], [60, 300]], fyll: "#56606a" },
  { navn: "C", pts: [[60, 70], [150, 70], [60, 150]], fyll: "#6b6259" },
  { navn: "D", pts: [[60, 300], [160, 360], [262, 330], [248, 470], [60, 470]], fyll: "#615a63" },
  { navn: "B", pts: [[250, 70], [460, 70], [460, 260], [350, 290], [262, 330], [240, 200]], fyll: "#6e6355" },
  { navn: "E", pts: [[262, 330], [350, 290], [460, 260], [460, 470], [248, 470]], fyll: "#5b6460" },
];
/** Korngrensene inne i snittet (der væskefilmen ligger). */
const GRENSER: Pt[][] = [
  [[150, 70], [60, 150]],
  [[250, 70], [240, 200], [262, 330], [248, 470]],
  [[60, 300], [160, 360], [262, 330]],
  [[262, 330], [350, 290], [460, 260]],
];
const BOKS_O: Pt = [251, 265];

type Layout = {
  vb: string;
  /** Oversikten i BRED-koordinater skaleres hit. */
  til: (p: Pt) => Pt;
  boks: number;
  linse: { cx: number; cy: number; r: number };
  over: number;
  under: number;
  linseOver: number;
  linseUnder: number;
  merke: { luft: number; mellom: number; side: [number, number] };
};

const BRED: Layout = {
  vb: "0 0 960 540",
  til: (p) => p,
  boks: 20,
  linse: { cx: 735, cy: 270, r: 190 },
  over: 50,
  under: 500,
  linseOver: 50,
  linseUnder: 500,
  merke: { luft: 50, mellom: 0, side: [0, 0] },
};

const SMAL: Layout = {
  vb: "0 0 520 700",
  til: ([x, y]) => [40 + ((x - 60) / 400) * 440, 40 + ((y - 70) / 400) * 290],
  boks: 18,
  linse: { cx: 260, cy: 530, r: 145 },
  over: 24,
  under: 360,
  linseOver: 360,
  linseUnder: 690,
  merke: { luft: 22, mellom: 352, side: [64, 456] },
};

const sti = (pts: Pt[], lukk = true) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}${lukk ? " Z" : ""}`;

export function IonBytteV2Figur({
  heading = "Ioner byttes i fast berg",
  caption,
}: {
  heading?: string;
  caption?: React.ReactNode;
}) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const tl = useTidslinje({ antall: FASER.length, synlig: visible, faseMs: 3200, holdMs: 1700 });
  const [medVaeske, setMedVaeske] = useState(true);
  const L = small ? SMAL : BRED;
  const { linse } = L;
  const R = linse.r;
  const s0 = tidslinjeVerdi(BILDER, tl.p);
  const s = medVaeske ? s0 : { ut: 0, inn: 0, bort: 0, fler: 0 };
  const fs = 15;
  const tilL = (x: number, y: number): Pt => [linse.cx + x * R, linse.cy + y * R];
  const sek = tl.sek;

  // ---- hovedionet: ut av gitteret, over i filmen og bort med væsken ----
  const fx = filmX(HOVED.y);
  const ut = smooth(clamp(s.ut));
  const bort = smooth(clamp(s.bort));
  // uten væske: ionet rister bare litt på plassen sin
  const rist = medVaeske ? 0 : 0.012 * Math.sin(sek * 3) * (tl.fase >= 2 ? 1 : 0);
  const utPos: Pt = [lerp(HOVED.x, fx, ut) + rist, HOVED.y + bort * 1.4];
  const inn = smooth(clamp(s.inn));
  const innPos: Pt =
    inn < 0.5 ? [fx, lerp(HOVED.y - 0.55, HOVED.y, inn * 2)] : [lerp(fx, HOVED.x, (inn - 0.5) * 2), HOVED.y];
  const hull = s.ut > 0.5 && s.inn < 0.5;

  const andre = ANDRE.map((p) => {
    const t = clamp((s.fler - p.t) / 0.2);
    return { p, t };
  });
  const byttet = (s.inn > 0.5 ? 1 : 0) + andre.filter((a) => a.t > 0.5).length;
  const andel = byttet / (ANDRE.length + 1);

  const status = (medVaeske ? STATUS_MED : STATUS_UTEN)[tl.fase - 1];

  // ---- etiketter ----
  const labels: Lab[] = [];
  const t = L.til;
  const [bx, by] = t(BOKS_O);
  labels.push({
    text: medVaeske ? "Korngrense med tynn væskefilm" : "Korngrense uten væske",
    x: small ? t([150, 70])[0] : 60,
    y: L.over,
    at: t([245, 140]),
    badge: [t([245, 140])[0] + 24, L.merke.luft],
    size: fs,
    weight: 700,
    color: medVaeske ? FARGE.vaeskeKant : "#c9d2d8",
  });
  labels.push({
    text: "Korn",
    x: t([60, 470])[0],
    y: L.under,
    at: t([130, 410]),
    badge: small ? [t([60, 470])[0] + 20, L.merke.mellom] : undefined,
    size: fs,
    weight: 700,
    color: "#e8eef2",
  });
  const gitterPek = GITTER_A.find((p) => p.i === 3 && p.j === -3)!;
  labels.push({
    text: "Fast gitter: rader av atomer",
    x: linse.cx - R * 0.35,
    y: L.linseOver,
    at: tilL(gitterPek.x, gitterPek.y),
    badge: small ? [L.merke.side[0], linse.cy - R * 0.6] : undefined,
    anchor: "middle",
    size: fs,
    weight: 700,
    color: "#e8eef2",
  });
  if (tl.fase === 2 || tl.fase === 3 || tl.fase === 4) {
    const tekst =
      !medVaeske ? "Ionet blir sittende" : tl.fase === 2 ? "Ion hopper ut" : tl.fase === 3 ? "Et annet ion tar plassen" : "Væsken frakter ionet bort";
    const at: Pt =
      !medVaeske
        ? tilL(HOVED.x, HOVED.y)
        : tl.fase === 2
          ? tilL(utPos[0], utPos[1])
          : tl.fase === 3
            ? tilL(innPos[0], innPos[1])
            : tilL(fx, Math.min(0.85, HOVED.y + 0.6));
    labels.push({
      text: tekst,
      x: small ? linse.cx : linse.cx + R * 0.45,
      y: L.linseUnder,
      at,
      badge: small ? [L.merke.side[1], linse.cy + R * 0.6] : undefined,
      anchor: "middle",
      size: fs,
      weight: 700,
      color: tl.fase === 3 && medVaeske ? FARGE.inn : FARGE.ut,
    });
  }
  if (tl.fase === 5 && medVaeske) {
    const p = ANDRE.find((a) => a.i === 1 && a.j === 3) ?? ANDRE[ANDRE.length - 1];
    labels.push({
      text: "Ny sammensetning",
      x: small ? linse.cx : linse.cx + R * 0.45,
      y: L.linseUnder,
      at: tilL(p.x, p.y),
      badge: small ? [L.merke.side[1], linse.cy + R * 0.6] : undefined,
      anchor: "middle",
      size: fs,
      weight: 700,
      color: FARGE.inn,
    });
  }
  if (medVaeske) {
    labels.push({
      text: "Væske",
      x: small ? linse.cx + R * 0.7 : linse.cx + R * 0.55,
      y: L.linseOver,
      at: tilL(filmX(-0.75), -0.62),
      badge: small ? [L.merke.side[1], linse.cy - R * 0.6] : undefined,
      anchor: "middle",
      size: fs,
      weight: 700,
      color: FARGE.vaeskeKant,
    });
  }

  const keys: Key[] = [
    { text: "Opprinnelig ion i gitteret", color: FARGE.ut, kind: "fill" },
    { text: "Nytt ion fra væsken", color: FARGE.inn, kind: "fill" },
    { text: "Andre atomer i gitteret", color: FARGE.rammeA, kind: "fill" },
    { text: medVaeske ? "Væskefilm" : "Ingen væske (tankeeksperiment)", color: medVaeske ? FARGE.vaeske : FARGE.tørr, kind: "fill" },
  ];

  // ---- linseinnhold ----
  const rRamme = A * 0.36 * R;
  const rKation = A * 0.26 * R;
  const film = (() => {
    const ys: number[] = [];
    for (let y = -1.05; y <= 1.05; y += 0.07) ys.push(y);
    const v = ys.map((y) => tilL(filmX(y) - W, y));
    const h = ys.map((y) => tilL(filmX(y) + W, y)).reverse();
    return sti([...v, ...h]);
  })();
  const driv = DRIV.map((d) => {
    const y = ((((d.y + 1 + sek * 0.16 * d.v) % 2) + 2) % 2) - 1;
    return { pos: tilL(filmX(y) + d.x, y), ut: d.ut };
  });

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Korn med korngrenser og en tynn væskefilm. Linsen viser gitteret ved korngrensen: et ion hopper ut i væsken, et annet tar plassen, og væsken frakter ionene. Berget er fast hele tiden."
        heading={heading}
        caption={
          caption ??
          "Metasomatose: varm væske langs korngrensene fører ioner inn og ut av mineralene mens berget er fast. Bergarten skifter sammensetning uten å smelte. Skjematisk, uten målestokk."
        }
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={
          <div className={small ? "flex w-full flex-col gap-2 [&_button]:text-sm" : "flex w-full flex-col gap-2"}>
            <TidslinjeKontroller tl={tl} faser={FASER} />
            <StegVelger
              labels={["Med væske", "Uten væske (tankeeksperiment)"]}
              step={medVaeske ? 1 : 2}
              onStep={(n) => tl.valg(() => setMedVaeske(n === 1))}
              label="Væske"
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
              { navn: "Ioner byttet", verdi: andel, ender: ["ingen", "mange"], farge: FARGE.inn, tekst: andel < 0.02 ? "ingen" : undefined },
              { navn: "Smelting", verdi: 0, ender: ["ingen", "smeltet"], farge: "#e0874a", tekst: "ingen, berget er fast" },
            ]}
          />
        }
      >
        {() => (
          <g
            data-figur="ionbytte"
            data-step={tl.fase}
            data-p={tl.p.toFixed(2)}
            data-tilstand={`ut=${s.ut.toFixed(2)} inn=${s.inn.toFixed(2)} bort=${s.bort.toFixed(2)} fler=${s.fler.toFixed(2)} byttet=${byttet} vaeske=${medVaeske ? 1 : 0}`}
          >
            {/* oversikt */}
            {KORN_OVERSIKT.map((k) => (
              <path key={k.navn} d={sti(k.pts.map(t))} fill={k.fyll} />
            ))}
            {/* ny sammensetning langs korngrensen i korn A */}
            {andel > 0.01 ? (
              <g opacity={andel}>
                <clipPath id="ib-kornA">
                  <path d={sti(KORN_OVERSIKT[0].pts.map(t))} />
                </clipPath>
                <path d={sti(GRENSER[1].slice(0, 3).map(t), false)} fill="none" stroke={FARGE.inn} strokeWidth={small ? 14 : 18} clipPath="url(#ib-kornA)" opacity="0.55" />
              </g>
            ) : null}
            {GRENSER.map((g, i) => (
              <path
                key={i}
                d={sti(g.map(t), false)}
                fill="none"
                stroke={medVaeske ? FARGE.vaeskeKant : "#1d2226"}
                strokeWidth={medVaeske ? 3.5 : 2}
                strokeLinejoin="round"
              />
            ))}
            <rect x={t([60, 70])[0]} y={t([60, 70])[1]} width={t([460, 470])[0] - t([60, 70])[0]} height={t([460, 470])[1] - t([60, 70])[1]} fill="none" stroke="#e8eef2" strokeOpacity="0.5" />

            <Zoomlinse cx={linse.cx} cy={linse.cy} r={R} fra={[bx, by, L.boks, L.boks]} bakgrunn={FARGE.bakA}>
              {/* korn B (dreid gitter) */}
              <path d={`M${linse.cx} ${linse.cy - R} H${linse.cx + R} V${linse.cy + R} H${linse.cx} Z`} fill={FARGE.bakB} />
              <g data-nocheck="">
                {GITTER_B.map((p, k) => {
                  const [x, y] = tilL(p.x, p.y);
                  return <circle key={`b${k}`} cx={x} cy={y} r={p.kation ? rKation : rRamme} fill={p.kation ? FARGE.kationB : FARGE.rammeB} />;
                })}
                {/* korn A */}
                {GITTER_A.map((p, k) => {
                  if (p.kation) return null;
                  const [x, y] = tilL(p.x, p.y);
                  return <circle key={`a${k}`} cx={x} cy={y} r={rRamme} fill={FARGE.rammeA} />;
                })}
                {GITTER_A.map((p, k) => {
                  if (!p.kation || p === HOVED || ANDRE.some((a) => a.i === p.i && a.j === p.j)) return null;
                  const [x, y] = tilL(p.x, p.y);
                  return <circle key={`k${k}`} cx={x} cy={y} r={rKation} fill={FARGE.ut} />;
                })}
              </g>
              {/* væskefilmen langs korngrensen */}
              <path d={film} fill={medVaeske ? FARGE.vaeske : FARGE.tørr} opacity={medVaeske ? 0.92 : 1} />
              {medVaeske ? (
                <g data-nocheck="">
                  {driv.map((d, k) => (
                    <circle key={k} cx={d.pos[0]} cy={d.pos[1]} r={rKation * 0.85} fill={d.ut ? FARGE.ut : FARGE.inn} opacity="0.85" />
                  ))}
                </g>
              ) : null}
              {/* andre plasser som byttes */}
              <g data-nocheck="">
                {andre.map(({ p, t: lt }, k) => {
                  const fx2 = filmX(p.y);
                  const [sx, sy] = tilL(p.x, p.y);
                  const ut2 = clamp(lt * 2);
                  const inn2 = clamp(lt * 2 - 1);
                  const [ox, oy] = tilL(lerp(p.x, fx2, ut2), p.y + ut2 * 0.25);
                  const [ix, iy] = tilL(lerp(fx2, p.x, inn2), p.y - (1 - inn2) * 0.25);
                  return (
                    <g key={k}>
                      {lt < 0.999 ? <circle cx={ox} cy={oy} r={rKation} fill={FARGE.ut} opacity={1 - ut2 * 0.7} /> : null}
                      {lt > 0.5 ? <circle cx={ix} cy={iy} r={rKation} fill={FARGE.inn} /> : null}
                      {lt > 0.4 && lt < 0.6 ? <circle cx={sx} cy={sy} r={rKation} fill="none" stroke={FARGE.ut} strokeDasharray="3 3" /> : null}
                    </g>
                  );
                })}
              </g>
              {/* hovedplassen */}
              {hull ? (
                <circle cx={tilL(HOVED.x, HOVED.y)[0]} cy={tilL(HOVED.x, HOVED.y)[1]} r={rKation} fill="none" stroke={FARGE.ut} strokeWidth="2" strokeDasharray="4 3" />
              ) : null}
              {bort < 0.999 ? (
                <circle cx={tilL(utPos[0], utPos[1])[0]} cy={tilL(utPos[0], utPos[1])[1]} r={rKation * 1.15} fill={FARGE.ut} stroke="#fff3df" strokeWidth="2" />
              ) : null}
              {s.inn > 0.001 ? (
                <circle cx={tilL(innPos[0], innPos[1])[0]} cy={tilL(innPos[0], innPos[1])[1]} r={rKation * 1.15} fill={FARGE.inn} stroke="#e6f6ff" strokeWidth="2" />
              ) : null}
            </Zoomlinse>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
