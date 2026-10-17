/**
 * B · SeaBreezeModel: solgangsvind gjennom døgnet. Snitt i steg 1, 2, 5 og 6, sett ovenfra i steg 3 og 4.
 * Følger «Solgangsvind» i lokale-vaersystemer.md. Tall bare fra teksten: 15–25 knop (SNL, u.å.-e).
 */
import { useId } from "react";
import { clamp, lerp, smooth } from "./isbre-kit";
import { lagStoy } from "./terreng-kit";
import { lat, tidslinjeVerdi } from "./prosess-kit";
import { SOLGANGSVIND_TEKST } from "./lokale-tekst";
import {
  F,
  Hav,
  Himmel,
  Hus,
  LokaleRamme,
  Maane,
  Sol,
  Stjerner,
  Strom,
  Terreng,
  Traer,
  hoydeVed,
  lagProfil,
  medKilde,
  useLokaleTidslinje,
  type Lab,
} from "./lokale-kit";

const FASER = ["Morgen", "Pålandsvind", "Dreier langs kysten", "I fjorden", "Kveld", "Natt"];

const STATUS = [
  medKilde(
    "Solgangsvind er et vindsystem i kyststrøk med pålandsvind om dagen og fralandsvind utover natten. Den er mest tydelig når det ellers er rolig vær.",
    "SNL, u.å.-e",
  ),
  medKilde("Sjøbrisen starter gjerne tidlig på ettermiddagen som pålandsvind.", "SNL, u.å.-e"),
  medKilde(
    "På den nordlige halvkule bøyer jordrotasjonen vinden av mot høyre. Vinden dreier etter hvert til vind langs kysten og kan da øke til mellom 15 og 25 knop.",
    "SNL, u.å.-e",
  ),
  medKilde(
    "I en fjord fortsetter vinden innover fjorden og bøyer ikke av, blant annet i Vestfjorden, Trondheimsfjorden og Oslofjorden.",
    "SNL, u.å.-e",
  ),
  medKilde("Utpå kvelden, når sola står lavt, løyer vinden.", "SNL, u.å.-e"),
  medKilde(
    "Om natten blåser det fra land. Landbrisen er som regel vesentlig svakere enn sjøbrisen, og i høyden er det da pålandsvind.",
    "SNL, u.å.-e; SNL, u.å.-f",
  ),
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { t: 0, inn: 0, ovenfra: 0, dreie: 0, fjord: 0, natt: 0 },
  { t: 0.4, inn: 0, ovenfra: 0, dreie: 0, fjord: 0, natt: 0 },
  { t: 1, inn: 1, ovenfra: 0, dreie: 0, fjord: 0, natt: 0 },
  { t: 1, inn: 1, ovenfra: 1, dreie: 1, fjord: 0, natt: 0 },
  { t: 1, inn: 1, ovenfra: 1, dreie: 1, fjord: 1, natt: 0 },
  { t: 2, inn: 0.35, ovenfra: 0, dreie: 0, fjord: 0, natt: 0 },
  { t: 3, inn: 0, ovenfra: 0, dreie: 0, fjord: 0, natt: 1 },
];

/* ---------- snitt ---------- */

const KYST = 420;
const HAV_Y = 400;
const hentLand = lat(() =>
  lagProfil({
    seed: 5203,
    x0: KYST - 8,
    x1: 960,
    grunn: (x) => {
      const t = clamp((x - 600) / 360);
      return HAV_Y - 4 - (x - KYST) * 0.04 - 210 * t * t * (3 - 2 * t);
    },
    ruhet: (x) => 3 + 22 * clamp((x - 620) / 300),
  }),
);
const hentPynt = lat(() => {
  const L = hentLand();
  return {
    traer: [448, 470, 560, 584, 690, 712].map((x) => [x, hoydeVed(L, x) + 2] as [number, number]),
    hus: [500, 620].map((x) => [x, hoydeVed(L, x) + 1] as [number, number]),
  };
});

/** Solbane: morgen lavt i øst (til høyre), dag høyt, kveld lavt i vest. */
function solPos(t: number): [number, number] {
  const k = clamp(t / 2);
  const x = lerp(860, 120, k);
  const y = 250 - 190 * Math.sin(Math.PI * clamp(0.12 + k * 0.76));
  return [x, y];
}

/* ---------- sett ovenfra ---------- */

const KART = { x0: -10, x1: 970, y0: -10, y1: 550 };
const KYST_X = 420;
const FJORD_Y = 300;

/** Kystlinje (nord–sør) med en fjord mot øst. Beregnes én gang. */
const hentKart = lat(() => {
  const { fbm } = lagStoy(7311);
  const kyst: [number, number][] = [];
  for (let y = KART.y0; y <= KART.y1; y += 6) {
    const iFjord = Math.abs(y - FJORD_Y) < 34;
    if (iFjord) continue;
    kyst.push([KYST_X + 60 * fbm(y / 110, 0.3) + 16 * fbm(y / 24, 2.1), y]);
  }
  const nord = kyst.filter(([, y]) => y < FJORD_Y);
  const sor = kyst.filter(([, y]) => y > FJORD_Y);
  const fjordNord: [number, number][] = [];
  const fjordSor: [number, number][] = [];
  const start = Math.max(nord[nord.length - 1][0], sor[0][0]) + 6;
  for (let x = start; x <= 860; x += 8) {
    const b = 30 - 16 * clamp((x - start) / 420);
    const midt = FJORD_Y + 12 * Math.sin(x / 70);
    fjordNord.push([x, midt - b + 4 * fbm(x / 22, 5)]);
    fjordSor.push([x, midt + b + 4 * fbm(x / 22, 9)]);
  }
  const pt = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const land =
    `M${KART.x1} ${KART.y0} L${nord.map(pt).join(" L")} L${fjordNord.map(pt).join(" L")} ` +
    `L${[...fjordSor].reverse().map(pt).join(" L")} L${sor.map(pt).join(" L")} L${KART.x1} ${KART.y1} Z`;
  const fjordMidt = fjordNord.map(([x, y], i) => [x, (y + fjordSor[i][1]) / 2] as [number, number]);
  return { land, fjordMidt };
});

function Pil({ x, y, vinkel, lengde, farge, op, bredde = 5 }: { x: number; y: number; vinkel: number; lengde: number; farge: string; op: number; bredde?: number }) {
  if (op < 0.02) return null;
  return (
    <g transform={`translate(${x} ${y}) rotate(${vinkel})`} opacity={op}>
      <line x1={-lengde / 2} y1="0" x2={lengde / 2 - 10} y2="0" stroke="#0b1418" strokeWidth={bredde + 4} strokeLinecap="round" strokeOpacity="0.45" />
      <line x1={-lengde / 2} y1="0" x2={lengde / 2 - 10} y2="0" stroke={farge} strokeWidth={bredde} strokeLinecap="round" />
      <path d={`M${lengde / 2} 0 L${lengde / 2 - 16} -9 L${lengde / 2 - 16} 9 Z`} fill={farge} />
    </g>
  );
}

function Ovenfra({ s, op, fase }: { s: (typeof BILDER)[number]; op: number; fase: number }) {
  const K = hentKart();
  const vinkel = 82 * smooth(s.dreie);
  const kystPiler: [number, number][] = [
    [300, 90],
    [300, 215],
    [300, 390],
    [300, 500],
    [190, 150],
    [190, 440],
  ];
  const fjordIdx = [6, 20, 34, 48];
  return (
    <g opacity={op}>
      <rect x="0" y="0" width="960" height="540" fill={F.havBunn} data-nocheck="" />
      <rect x="0" y="0" width="960" height="540" fill={F.havTopp} opacity="0.55" data-nocheck="" />
      <path d={K.land} fill={F.land} stroke="#cfd8c2" strokeWidth="1.5" data-nocheck="" />
      {/* nordpil */}
      <g transform="translate(880 92)" aria-hidden="true">
        <path d="M0 -26 L9 6 L0 0 L-9 6 Z" fill={F.tekst} />
        <text x="0" y="26" textAnchor="middle" fontSize="16" fontWeight="800" fill={F.tekst}>
          N
        </text>
      </g>
      {kystPiler.map(([x, y], i) => (
        // vinden øker langs kysten (15–25 knop i status, Store norske leksikon, u.å.-e): pilene blir lengre og tykkere
        <Pil key={i} x={x} y={y} vinkel={vinkel} lengde={86 + 32 * smooth(s.dreie)} bredde={5 + 2.5 * smooth(s.dreie)} farge={F.sjobris} op={1} />
      ))}
      {fjordIdx.map((i, n) => {
        const p = K.fjordMidt[i];
        const q = K.fjordMidt[Math.min(K.fjordMidt.length - 1, i + 3)];
        const v = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
        return <Pil key={`f${n}`} x={p[0] + 10} y={p[1]} vinkel={v} lengde={64} farge={F.sjobris} op={fase >= 4 ? clamp(s.fjord * 4 - n * 0.6) : 0} />;
      })}
    </g>
  );
}

export function SolgangsvindFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length);
  const s = tidslinjeVerdi(BILDER, tl.p);
  const sek = tl.sek;
  const fase = tl.fase;
  const LAND = hentLand();
  const PYNT = hentPynt();
  const [sx, sy] = solPos(s.t);
  const solOp = clamp(2.6 - s.t) * (s.t < 2.6 ? 1 : 0);
  const ov = smooth(s.ovenfra);
  const snitt = 1 - ov;

  const labels: Lab[] = [];
  const lab = (text: string, x: number, y: number, at: [number, number], color: string, anchor: Lab["anchor"] = "middle") =>
    labels.push({ text, x, y, at, color, anchor, size: 16, weight: 700, halo: F.halo, badge: [x, y - 5] });
  if (fase === 1) {
    lab("Vindstille om morgenen", 240, 350, [240, 384], F.tekst);
    lab("Hav", 200, 470, [200, 440], F.kald);
    lab("Land", 560, 470, [560, 400], F.varm);
  } else if (fase === 2) {
    lab("Pålandsvind om dagen", 240, 340, [240, 380], F.sjobris);
    lab("Hav", 200, 470, [200, 440], F.kald);
    lab("Land", 560, 470, [560, 400], F.varm);
  } else if (fase === 3) {
    lab("Sett ovenfra", 120, 60, [120, 60], F.tekst);
    lab("Vinden dreier mot høyre", 190, 300, [268, 360], F.sjobris);
    lab("Land", 700, 150, [700, 150], F.tekst);
  } else if (fase === 4) {
    lab("Sett ovenfra", 120, 60, [120, 60], F.tekst);
    lab("I fjorden: rett innover", 640, 400, [620, 312], F.sjobris);
    lab("Langs kysten: dreid mot høyre", 190, 300, [268, 360], F.sjobris);
  } else if (fase === 5) {
    lab("Vinden løyer", 240, 350, [240, 384], F.sjobris);
    lab("Sola står lavt", 230, 190, [150, 214], F.varm, "start");
  } else {
    lab("Landbris, svakere", 250, 350, [250, 388], F.kald);
    lab("Pålandsvind i høyden", 320, 248, [320, 276], F.retur);
  }

  return (
    <LokaleRamme
      tekst={SOLGANGSVIND_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={STATUS[fase - 1]}
      svgRef={ref}
      labels={labels}
      data="solgangsvind"
      etikettRader={3}
      notes={[]}
      keys={[
        { text: "Vind fra havet", color: F.sjobris, kind: "line" },
        { text: "Landbris", color: F.kald, kind: "line" },
        { text: "Vind i høyden", color: F.retur, kind: "line" },
      ]}
    >
      {({ m }) => (
        <>
          {snitt > 0.01 ? (
            <g opacity={snitt < 0.99 ? snitt : undefined}>
              <Himmel id={`${uid}-h`} t={s.t} />
              <Stjerner opacity={s.natt} />
              <Sol x={sx} y={sy} opacity={solOp} />
              <Maane x={820} y={80} opacity={s.natt} />
              <Hav x0={0} x1={KYST + 4} y={HAV_Y} sek={sek} id={`${uid}-hav`} />
              <Terreng id={`${uid}-land`} profil={LAND} snoUnder={220} />
              <Traer punkter={PYNT.traer} />
              <Hus punkter={PYNT.hus} />
              <Strom
                punkter={[[60, 382], [300, 382], [lerp(300, 640, s.inn), 378 - lerp(0, 10, s.inn)]]}
                sek={sek}
                farge={F.sjobris}
                marker={m.teal}
                bredde={2 + 4 * s.inn}
                opacity={clamp(s.inn * 3) * (1 - s.natt)}
              />
              {/* natt: et grunnere, lukket kretsløp (NOAA, u.å.-a), pålandsvind i høyden på ca. y 280 */}
              <Strom punkter={[[610, hoydeVed(LAND, 610) - 8], [420, 390], [150, 392]]} sek={sek} farge={F.kald} marker={m.cold} bredde={2.6} opacity={s.natt} fart={12} />
              <Strom punkter={[[128, 386], [128, 336], [128, 292]]} sek={sek} farge={F.kald} marker={m.cold} bredde={2.2} opacity={s.natt * 0.85} fart={10} />
              <Strom punkter={[[148, 280], [380, 278], [616, 280]]} sek={sek} farge={F.retur} marker={m.fg} bredde={2.2} opacity={s.natt * 0.85} fart={10} />
              <Strom punkter={[[632, 290], [632, 320], [632, hoydeVed(LAND, 632) - 20]]} sek={sek} farge={F.retur} marker={m.fg} bredde={2.2} opacity={s.natt * 0.85} fart={10} />
            </g>
          ) : null}
          {ov > 0.01 ? <Ovenfra s={s} op={ov} fase={fase} /> : null}
        </>
      )}
    </LokaleRamme>
  );
}
