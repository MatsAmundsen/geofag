/**
 * Figur 5.9 (geografi kap. 5, «Scenario er ikke det samme som værmelding» og «Tilbakekoplinger endrer styrken»).
 *
 * To kvalitative utslippsutviklinger side om side: lavere og høyere framtidige utslipp. Lavere utslipp gir mindre
 * oppvarming enn høyere, men begge har usikkerhet. Nederst en forsterkende tilbakekopling: når snø og is forsvinner,
 * tar mørkere flater opp mer solenergi, og oppvarmingen forsterkes. Til slutt vanndamp som en annen forsterkning
 * (kapitteltekst: IPCC, 2023; Lindsey, 2009; NASA, u.å.-a). Ingen målte temperaturer, ingen IPCC-kurver og ingen
 * sannsynlighet for politiske valg.
 */
import { memo } from "react";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { prng } from "./prosess-kit";
import { Bolge, KlimaDefs, Maalere, Pil, Sol } from "./klima-modell-kit";
import { K, bue, flateUnder, op, ruProfil, type P } from "./klima-modell-geo";

const ID = "ksc";
const HAV = 290;

type Flak = { pts: string; skygge: string; n: number };
/** Isflak i ett panel (lokale koordinater 0–470). Sortert slik at flakene lengst ute smelter først. */
function lagFlak(seed: number): Flak[] {
  const rnd = prng(seed);
  const ut: Flak[] = [];
  for (let i = 0; i < 24; i++) {
    const cy = HAV + 8 + Math.pow(rnd(), 1.2) * 200;
    const cx = 232 + rnd() * 226;
    const r = (7 + rnd() * 10) * (0.45 + (cy - HAV) / 150);
    const p: string[] = [];
    const q: string[] = [];
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const rr = r * (0.7 + rnd() * 0.45);
      const x = cx + Math.cos(a) * rr * 1.7;
      const y = cy + Math.sin(a) * rr * 0.36;
      p.push(`${r1(x)},${r1(y)}`);
      q.push(`${r1(x)},${r1(y + 4)}`);
    }
    ut.push({ pts: p.join(" "), skygge: q.join(" "), n: -cx });
  }
  return ut.sort((a, b) => b.n - a.n);
}
const FLAK = lagFlak(3);
/** Kystland til venstre i hvert panel og fjell i bakgrunnen. */
const LAND = ruProfil([[0, 262], [50, 256], [100, 250], [140, 238], [170, 252], [200, 280], [222, HAV + 4]], 14, 6, 5);
const FJELL = ruProfil([[0, 226], [60, 190], [110, 150], [150, 176], [210, 132], [270, 170], [330, 150], [400, 196], [470, 214]], 8, 7, 9);
const snoLinje = (pr: P[], fra: number, til: number, dy: number) => {
  const del = pr.filter((p) => p[0] >= fra && p[0] <= til);
  if (del.length < 2) return "";
  const ned = del.slice().reverse().map(([x, y], i) => [x, y + dy + (i % 3) * 3] as P);
  return `M${del.map(([x, y]) => `${r1(x)} ${r1(y - 1)}`).join(" L")} L${ned.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L")} Z`;
};

const Panel = memo(function Panel({ dx }: { dx: number }) {
  return (
    <g aria-hidden="true" transform={`translate(${dx} 0)`}>
      <rect x={0} y={0} width={470} height={HAV} fill={`url(#${ID}-himmel)`} data-nocheck="" />
      <path d={flateUnder(FJELL, HAV + 2)} fill="#5b7186" data-nocheck="" />
      <rect x={0} y={HAV} width={470} height={540 - HAV} fill={`url(#${ID}-hav)`} data-nocheck="" />
      {[HAV + 20, HAV + 60, HAV + 120, HAV + 180].map((y, i) => (
        <path key={y} d={`M${200 + i * 10} ${y} q 20 -4 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} stroke="#bae6fd" strokeOpacity={0.18} strokeWidth={1.4} fill="none" data-nocheck="" />
      ))}
      <path d={flateUnder(LAND, 540)} fill={`url(#${ID}-land)`} />
      {/* by med pipe */}
      {[22, 44, 66].map((x, i) => (
        <g key={x} data-nocheck="">
          <rect x={x} y={240 - i * 3} width={18} height={18 + i * 3} fill={["#b4483c", "#c9a27a", "#8b9bb0"][i]} />
          <polygon points={`${x - 2},${240 - i * 3} ${x + 9},${231 - i * 3} ${x + 20},${240 - i * 3}`} fill="#3a2b25" />
        </g>
      ))}
      <rect x={92} y={204} width={11} height={50} fill="#71717a" data-nocheck="" />
      <rect x={84} y={236} width={30} height={18} fill="#52525b" data-nocheck="" />
    </g>
  );
});

function Scene({ dx, utslipp, is, refl, mork, damp, sek }: { dx: number; utslipp: number; is: number; refl: number; mork: number; damp: number; sek: number }) {
  const antall = Math.round(FLAK.length * is);
  return (
    <g transform={`translate(${dx} 0)`}>
      <clipPath id={`${ID}-fj${dx}`}>
        <path d={flateUnder(FJELL, HAV + 2)} />
      </clipPath>
      <rect x={0} y={0} width={470} height={r1(132 + (1 - is) * 60 + 18)} fill="#eef6fb" opacity={0.92} clipPath={`url(#${ID}-fj${dx})`} data-nocheck="" />
      <path d={snoLinje(LAND, 110, 110 + 100 * is, 9)} fill="#f1f7fb" opacity={op(Math.min(1, is * 1.5))} data-nocheck="" />
      <rect x={0} y={0} width={470} height={HAV} fill="#a78bfa" opacity={op(0.04 + 0.2 * utslipp)} data-nocheck="" />
      <rect x={0} y={0} width={470} height={HAV} fill="#cbd5e1" opacity={op(0.2 * damp)} data-nocheck="" />
      {[0, 1, 2, 3, 4].map((i) => {
        const t = (sek * 0.2 + i / 5) % 1;
        return <circle key={i} cx={r1(97 + t * 50)} cy={r1(198 - t * 120)} r={r1((5 + t * 20) * (0.4 + utslipp))} fill="#94a3b8" opacity={op((0.55 - 0.5 * t) * (0.25 + utslipp))} data-nocheck="" />;
      })}
      <rect x={222} y={HAV} width={248} height={540 - HAV} fill="#ff7a45" opacity={op(0.2 * mork)} data-nocheck="" />
      {FLAK.slice(0, antall).map((f, i) => (
        <g key={i} data-nocheck="">
          <polygon points={f.skygge} fill="#6f93ab" />
          <polygon points={f.pts} fill="#f4f9fc" />
        </g>
      ))}
      <g opacity={op(refl)}>
        <Bolge a={[410, 40]} b={[330, HAV + 40]} farge={K.sol} amp={3.5} lambda={11} fase={sek * 0.6} w={2.6} spiss={false} />
        {is > 0.45 ? (
          <Bolge a={[330, HAV + 40]} b={[250, 70]} farge={K.sol} amp={3.5} lambda={11} fase={sek * 0.6} w={2.6} />
        ) : (
          <circle cx={330} cy={HAV + 46} r={r1(12 + 4 * Math.sin(sek * 3))} fill="#ff7a45" opacity={0.6} filter={`url(#${ID}-myk)`} data-nocheck="" />
        )}
      </g>
    </g>
  );
}

type S = { ul: number; uh: number; il: number; ih: number; refl: number; loop: number; damp: number; vl: number; vh: number };

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 800, size: 15, ...extra });
const LAV = L("lavere utslipp", 235, 30, { color: K.teal, badge: [235, 30] });
const HOY = L("høyere utslipp", 725, 30, { color: K.varmSterk, badge: [725, 30] });

/** Sløyfa nederst: tre ledd og piler mellom dem. */
const NODER: P[] = [[200, 466], [480, 420], [760, 466]];
const SLOYFE: P[][] = [bue([250, 452], [330, 410], [420, 420]), bue([540, 420], [640, 410], [710, 452]), bue([720, 500], [480, 540], [240, 500])];

const etiketter: Lab[][] = [
  [LAV, HOY],
  [LAV, HOY, L("mindre utslipp", 120, 120, { size: 13, color: K.dempet, weight: 700, at: [100, 180], badge: [140, 120] }), L("mer utslipp", 610, 120, { size: 13, color: K.dempet, weight: 700, at: [590, 170], badge: [630, 120] })],
  [LAV, HOY, L("mindre oppvarming, mindre istap", 300, 250, { size: 13, color: K.teal, weight: 700, at: [330, 320], badge: [330, 260] }), L("mer oppvarming, mer istap", 790, 250, { size: 13, color: K.varm, weight: 700, at: [820, 330], badge: [820, 260] })],
  [LAV, HOY, L("snø og is reflekterer sollys", 300, 200, { size: 13, color: K.sol, weight: 700, at: [300, 180], badge: [270, 200] }), L("mørkt hav tar opp mer", 820, 210, { size: 13, color: K.varm, weight: 700, at: [800, 316], badge: [850, 220] })],
  [
    L("mindre snø og is", 200, 506, { size: 13, color: K.is, weight: 700, at: NODER[0], badge: [130, 470] }),
    L("mørkere flate tar opp mer solenergi", 480, 398, { size: 13, color: K.sol, weight: 700, at: NODER[1], badge: [480, 404] }),
    L("mer oppvarming", 760, 506, { size: 13, color: K.varmSterk, weight: 700, at: NODER[2], badge: [830, 470] }),
    L("forsterkende tilbakekopling", 480, 530, { size: 13, color: K.tekst, weight: 800, badge: [480, 530] }),
    LAV, HOY,
  ],
  [
    L("varmere luft", 200, 506, { size: 13, color: K.varmSterk, weight: 700, at: NODER[0], badge: [130, 470] }),
    L("mer vanndamp i lufta", 480, 398, { size: 13, color: "#93c5fd", weight: 700, at: NODER[1], badge: [480, 404] }),
    L("sterkere drivhuseffekt", 760, 506, { size: 13, color: K.co2, weight: 700, at: NODER[2], badge: [830, 470] }),
    L("vanndamp forsterker også", 480, 530, { size: 13, color: K.tekst, weight: 800, badge: [480, 530] }),
    LAV, HOY,
  ],
];

const def: Def<S> = {
  id: "klima-scenario",
  tekst: {
    heading: "Valg endrer utviklingen",
    title:
      "To arktiske landskap side om side, med lavere og høyere utslipp. Med høyere utslipp blir oppvarmingen og tapet av is større. Nederst en sløyfe: mindre snø og is gir mørkere flater som tar opp mer solenergi, og oppvarmingen forsterkes. Til slutt samme type sløyfe for vanndamp. Ingen tall eller kurver.",
    caption: "",
  },
  faser: ["To utviklinger", "Utslipp", "Ulik oppvarming", "Refleksjon", "Is og albedo", "Vanndamp"],
  status: [
    "1. Et utslippsscenario beskriver en mulig utvikling under bestemte forutsetninger. Her sammenliknes lavere og høyere framtidige utslipp.",
    "2. Forutsetninger om energibruk, teknologi og politikk gir ulike utslipp av drivhusgasser.",
    "3. Lavere utslipp gir mindre oppvarming enn høyere utslipp. Begge utviklingene har usikkerhet, og figuren angir ingen sannsynlighet for hvilken som blir valgt.",
    "4. Snø og is reflekterer mye sollys. Der isen er borte, tar det mørkere havet opp mer solenergi.",
    "5. Forsterkende tilbakekopling: mindre snø og is gir mørkere flater, mer opptak av solenergi og mer oppvarming, slik at enda mer snø og is går tapt. Isen lager ikke varme selv.",
    "6. Vanndamp er en annen forsterkning: varmere luft kan inneholde mer vanndamp, og vanndamp virker som drivhusgass. Sløyfene virker sammen med resten av energibalansen.",
  ],
  bilder: [
    { ul: 0.4, uh: 0.4, il: 1, ih: 1, refl: 0, loop: 0, damp: 0, vl: 0.2, vh: 0.2 },
    { ul: 0.4, uh: 0.4, il: 1, ih: 1, refl: 0, loop: 0, damp: 0, vl: 0.2, vh: 0.2 },
    { ul: 0.15, uh: 1, il: 1, ih: 1, refl: 0, loop: 0, damp: 0, vl: 0.2, vh: 0.2 },
    { ul: 0.15, uh: 1, il: 0.8, ih: 0.35, refl: 0, loop: 0, damp: 0, vl: 0.4, vh: 0.75 },
    { ul: 0.15, uh: 1, il: 0.8, ih: 0.35, refl: 1, loop: 0, damp: 0, vl: 0.4, vh: 0.75 },
    { ul: 0.15, uh: 1, il: 0.8, ih: 0.2, refl: 1, loop: 1, damp: 0, vl: 0.4, vh: 0.82 },
    { ul: 0.15, uh: 1, il: 0.8, ih: 0.2, refl: 0.4, loop: 1, damp: 1, vl: 0.42, vh: 0.85 },
  ],
  etiketter,
  keys: [
    { text: "sollys", color: K.sol, kind: "line" },
    { text: "forsterkende sløyfe", color: K.tekst, kind: "line" },
  ],
  notes: ["Kvalitative årsakskjeder, ikke målte temperaturer eller beregnede IPCC-kurver", "Ingen sannsynlighet for politiske valg er angitt"],
  viewBox: "0 0 960 540",
  under: (s, fase) => (
    <Maalere
      rader={[
        { navn: "Oppvarming med lavere utslipp", verdi: s.vl, farge: "linear-gradient(90deg,#5eead4,#f4a259)", tekst: fase >= 3 ? "mindre, med usikkerhet" : "før endringen" },
        { navn: "Oppvarming med høyere utslipp", verdi: s.vh, farge: "linear-gradient(90deg,#f4a259,#ff4d2e)", tekst: fase >= 3 ? "større, med usikkerhet" : "før endringen" },
      ]}
    />
  ),
  tegn: (s, { sek }) => {
    const f = (sek * 0.12) % 1;
    return (
      <>
        <KlimaDefs id={ID}>
          <linearGradient id={`${ID}-himmel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3149" />
            <stop offset="100%" stopColor="#6b97b8" />
          </linearGradient>
          <linearGradient id={`${ID}-hav`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a5577" />
            <stop offset="100%" stopColor="#061826" />
          </linearGradient>
          <linearGradient id={`${ID}-land`} x1="0" y1="230" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6b7a5f" />
            <stop offset="100%" stopColor="#2f3a2b" />
          </linearGradient>
        </KlimaDefs>
        <Panel dx={0} />
        <Panel dx={490} />
        <Scene dx={0} utslipp={s.ul} is={s.il} refl={s.refl} mork={s.refl * (1 - s.il)} damp={0.2 * s.damp} sek={sek} />
        <Scene dx={490} utslipp={s.uh} is={s.ih} refl={s.refl} mork={s.refl * (1 - s.ih)} damp={s.damp} sek={sek} />
        <Sol id={ID} x={440} y={46} r={18} />
        <Sol id={ID} x={930} y={46} r={18} />
        <rect x={470} y={0} width={20} height={392} fill="#0b1620" data-nocheck="" />
        {/* tilbakekoplingssløyfe */}
        <rect x={0} y={390} width={960} height={150} fill="#0b1620" data-nocheck="" />
        <g opacity={op(s.loop)}>
          {SLOYFE.map((p, i) => (
            <Pil key={i} pts={p} farge={s.damp > 0.5 ? "#93c5fd" : K.tekst} w={4} />
          ))}
          {SLOYFE.map((p, i) => (
            <circle key={`p${i}`} cx={r1(p[Math.floor(((f + i / 3) % 1) * (p.length - 1))][0])} cy={r1(p[Math.floor(((f + i / 3) % 1) * (p.length - 1))][1])} r={4.5} fill="#f8fafc" data-nocheck="" />
          ))}
          {NODER.map(([x, y], i) => (
            <circle key={`n${i}`} cx={x} cy={y} r={14} fill="#16263a" stroke={[K.is, K.sol, K.varmSterk][i]} strokeWidth={3} />
          ))}
        </g>
      </>
    );
  },
};

export const KlimaScenarioFigur = lagFigur(def);
