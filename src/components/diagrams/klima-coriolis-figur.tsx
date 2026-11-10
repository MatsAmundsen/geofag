/**
 * Figur 5.3 (geografi kap. 5, «Rotasjonen endrer retningen»): høyre i nord, venstre i sør, på en roterende jord.
 *
 * En globus sett fra verdensrommet over ekvator, med Natural Earth-land (world-atlas land-110m, public domain) som
 * roterer mot øst. Luft som beveger seg fra subtropene mot ekvator og mot midlere breddegrader, avbøyes mot høyre
 * på nordlig halvkule og mot venstre på sørlig, sett i bevegelsesretningen. Resultatet er passatvind med østlig
 * komponent og et vestavindsbelte (kapitteltekst: UCAR, u.å.-b; Met Office, u.å.). Stiplede piler viser retningen
 * uten avbøyning. Buene illustrerer prinsippet, ikke beregnede vindbaner.
 */
import { memo } from "react";
import { geoOrthographic, geoPath, geoGraticule, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import landJson from "world-atlas/land-110m.json";
import { type Def, type Lab } from "./steg-figur";
import { lagFigur, r1 } from "./steg-kit";
import { KlimaDefs, Pil, Strom } from "./klima-modell-kit";
import { K, bue, op, type P } from "./klima-modell-geo";

const ID = "kcor";
const CX = 480;
const CY = 272;
const R = 238;

const landTopo = landJson as unknown as Topology<{ land: GeometryCollection }>;
const LAND = feature(landTopo, landTopo.objects.land) as GeoPermissibleObjects;
const GRAT = geoGraticule().step([30, 30])();

/** Fast projeksjon for vindpilene: de følger breddegradene, ikke kontinentene. */
const FAST = geoOrthographic().scale(R).translate([CX, CY]).rotate([0, 0]).clipAngle(90);
const pkt = (dlon: number, lat: number): P => FAST([dlon, lat]) as P;

/** Landet tegnes på nytt bare når rotasjonen har endret seg med et halvt grad. */
const Jord = memo(function Jord({ lon }: { lon: number }) {
  const proj = geoOrthographic().scale(R).translate([CX, CY]).rotate([lon, 0]).clipAngle(90).precision(0.6);
  const path = geoPath(proj);
  return (
    <g aria-hidden="true">
      <path d={path(GRAT) ?? ""} fill="none" stroke="#bae6fd" strokeOpacity={0.14} strokeWidth={1} data-nocheck="" />
      <path d={path(LAND) ?? ""} fill={`url(#${ID}-land)`} stroke="#1f2a1c" strokeOpacity={0.5} strokeWidth={0.8} data-nocheck="" />
    </g>
  );
});

/** Vindbane fra (lat0) til (lat1) ved relativ lengde d, med avbøyning k (grader lengde i enden). */
function vind(d: number, lat0: number, lat1: number, k: number): P[] {
  const ut: P[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    ut.push(pkt(d + k * t * t, lat0 + (lat1 - lat0) * t));
  }
  return ut;
}

const D = [-38, 6, 48];
type S = { ref: number; nh: number; sh: number; belte: number; rot: number; on: number; os: number };

const Trykk = ({ dlon, lat, kind, opacity }: { dlon: number; lat: number; kind: "H" | "L"; opacity: number }) => {
  const [x, y] = pkt(dlon, lat);
  return (
    <g aria-hidden="true" opacity={op(opacity)}>
      <circle cx={r1(x)} cy={r1(y)} r={17} fill={kind === "H" ? "#1e3a5f" : "#5f1e2a"} stroke={kind === "H" ? "#7cc4ff" : "#fca5a5"} strokeWidth={2.5} />
      <text x={r1(x)} y={r1(y + 7)} textAnchor="middle" fontSize={20} fontWeight={800} fill={kind === "H" ? "#bfdbfe" : "#fecaca"}>{kind}</text>
    </g>
  );
};

const L = (text: string, x: number, y: number, extra: Partial<Lab> = {}): Lab => ({ text, x, y, anchor: "middle", color: K.tekst, weight: 700, size: 14, ...extra });
const NORD = L("nordlig halvkule", 120, 120, { color: K.dempet, anchor: "start", size: 13, badge: [120, 100] });
const SOR = L("sørlig halvkule", 120, 430, { color: K.dempet, anchor: "start", size: 13, badge: [120, 450] });
const EKV = L("ekvator", 790, CY + 5, { color: K.varm, size: 13, anchor: "start", at: [CX + R - 6, CY], badge: [800, CY] });
const ROT = L("jorda roterer mot øst", 480, 20, { color: K.dempet, size: 13, badge: [480, 18] });
const RETT = L("uten rotasjon: rett fra høyt mot lavt trykk", 770, 140, { color: K.dempet, size: 13, at: pkt(48, 18), badge: [800, 120] });

const etiketter: Lab[][] = [
  [NORD, SOR, EKV, ROT, RETT],
  [NORD, SOR, EKV, ROT, L("avbøyd mot høyre", 790, 170, { color: K.teal, weight: 800, at: pkt(40, 10), badge: [810, 160] }), L("mot høyre også når lufta går nordover", 790, 80, { color: K.teal, size: 13, at: pkt(70, 52), badge: [810, 70] })],
  [NORD, SOR, EKV, ROT, L("avbøyd mot venstre", 790, 380, { color: K.co2, weight: 800, at: pkt(40, -10), badge: [810, 390] }), L("mot venstre også når lufta går sørover", 790, 470, { color: K.co2, size: 13, at: pkt(70, -52), badge: [810, 480] })],
  [
    NORD, SOR, EKV, ROT,
    L("vestavindsbeltet", 180, 168, { color: K.varm, weight: 800, at: pkt(-60, 44), badge: [170, 160] }),
    L("passatvind fra nordøst", 170, 236, { color: K.teal, weight: 800, at: pkt(-58, 16), badge: [160, 230] }),
    L("passatvind fra sørøst", 170, 316, { color: K.co2, weight: 800, at: pkt(-58, -16), badge: [160, 320] }),
    L("vestavindsbeltet", 180, 384, { color: K.varm, weight: 800, at: pkt(-60, -44), badge: [170, 390] }),
  ],
];

const def: Def<S> = {
  id: "klima-coriolis",
  tekst: {
    heading: "Høyre i nord, venstre i sør",
    title:
      "Globus sett fra verdensrommet over ekvator, som roterer mot øst. Luft fra subtropene mot ekvator og mot midlere breddegrader avbøyes mot høyre på nordlig halvkule og mot venstre på sørlig, sett i bevegelsesretningen. Stiplede piler viser retningen uten avbøyning. Til slutt merkes passatvindene og vestavindsbeltene.",
    caption: "",
  },
  faser: ["Uten rotasjon", "Nordlig halvkule", "Sørlig halvkule", "Passat og vestavind"],
  status: [
    "1. Trykkforskjeller setter luft i bevegelse fra høytrykk (H) mot lavtrykk (L). Uten jordrotasjonen ville lufta gått rett fram, som de stiplede pilene.",
    "2. På nordlig halvkule avbøyes bevegelsen mot høyre, sett i retningen lufta beveger seg. Det gjelder både lufta som går mot ekvator og lufta som går nordover.",
    "3. På sørlig halvkule avbøyes bevegelsen mot venstre. Høyre betyr altså ikke alltid øst, og venstre betyr ikke alltid vest.",
    "4. Mot ekvator gir avbøyningen passatvind med en østlig komponent. På midlere breddegrader dominerer vind fra vest over tid: vestavindsbeltet. Det betyr ikke at vinden alltid kommer fra vest.",
  ],
  bilder: [
    { ref: 0, nh: 0, sh: 0, belte: 0, rot: 0, on: 1, os: 1 },
    { ref: 0, nh: 0, sh: 0, belte: 0, rot: 0, on: 1, os: 1 },
    { ref: 0.6, nh: 1, sh: 0, belte: 0, rot: 1, on: 1, os: 0.3 },
    { ref: 0.6, nh: 1, sh: 1, belte: 0, rot: 1, on: 0.3, os: 1 },
    { ref: 0.2, nh: 1, sh: 1, belte: 1, rot: 1, on: 1, os: 1 },
  ],
  etiketter,
  keys: [
    { text: "uten avbøyning", color: K.dempet, kind: "dash" },
    { text: "avbøyd mot høyre (nord)", color: K.teal, kind: "line" },
    { text: "avbøyd mot venstre (sør)", color: K.co2, kind: "line" },
    { text: "H høytrykk", color: "#7cc4ff", kind: "fill" },
    { text: "L lavtrykk", color: "#fca5a5", kind: "fill" },
  ],
  notes: ["Globus sett fra over ekvator, nord opp", "Buene illustrerer prinsippet, ikke beregnede vindbaner"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const lon = Math.round(((-10 + sek * 4) % 360) * 2) / 2;
    const f = (sek * 0.18) % 1;
    const avb = 26;
    const piler: { pts: P[]; ref: P[]; farge: string; o: number }[] = [];
    for (const d of D) {
      piler.push({ pts: vind(d, 27, 6, -avb * s.nh), ref: vind(d, 27, 6, 0), farge: s.nh > 0.5 ? K.teal : K.tekst, o: 1 });
      piler.push({ pts: vind(d, 33, 56, avb * s.nh), ref: vind(d, 33, 56, 0), farge: s.nh > 0.5 ? K.teal : K.tekst, o: 1 });
      piler.push({ pts: vind(d, -27, -6, -avb * s.sh), ref: vind(d, -27, -6, 0), farge: s.sh > 0.5 ? K.co2 : K.tekst, o: 1 });
      piler.push({ pts: vind(d, -33, -56, avb * s.sh), ref: vind(d, -33, -56, 0), farge: s.sh > 0.5 ? K.co2 : K.tekst, o: 1 });
    }
    const band = (a: number, b: number) => {
      const ya = pkt(0, a)[1];
      const yb = pkt(0, b)[1];
      return { y: Math.min(ya, yb), h: Math.abs(yb - ya) };
    };
    return (
      <>
        <KlimaDefs id={ID}>
          <radialGradient id={`${ID}-hav`} cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#2f78a8" />
            <stop offset="60%" stopColor="#174a6d" />
            <stop offset="100%" stopColor="#0a2235" />
          </radialGradient>
          <linearGradient id={`${ID}-land`} x1="0" y1={CY - R} x2="0" y2={CY + R} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e8eef2" />
            <stop offset="12%" stopColor="#8aa27a" />
            <stop offset="35%" stopColor="#7f9a5c" />
            <stop offset="45%" stopColor="#b8a06a" />
            <stop offset="55%" stopColor="#6f9650" />
            <stop offset="70%" stopColor="#a8946a" />
            <stop offset="88%" stopColor="#8aa27a" />
            <stop offset="100%" stopColor="#e8eef2" />
          </linearGradient>
          <radialGradient id={`${ID}-skygge`} cx="36%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
          </radialGradient>
          <radialGradient id={`${ID}-glorie`} cx="50%" cy="50%" r="50%">
            <stop offset="88%" stopColor="#7dd3fc" stopOpacity="0" />
            <stop offset="94%" stopColor="#7dd3fc" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`${ID}-disk`}>
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </KlimaDefs>
        <rect x={0} y={0} width={960} height={540} fill="#050b16" data-nocheck="" />
        <circle cx={CX} cy={CY} r={R + 22} fill={`url(#${ID}-glorie)`} data-nocheck="" />
        <circle cx={CX} cy={CY} r={R} fill={`url(#${ID}-hav)`} />
        <Jord lon={lon} />
        <g clipPath={`url(#${ID}-disk)`} opacity={op(s.belte)} data-nocheck="">
          <rect x={CX - R} {...(({ y, h }) => ({ y, height: h }))(band(0, 30))} width={2 * R} fill={K.teal} opacity={0.16} />
          <rect x={CX - R} {...(({ y, h }) => ({ y, height: h }))(band(-30, 0))} width={2 * R} fill={K.co2} opacity={0.16} />
          <rect x={CX - R} {...(({ y, h }) => ({ y, height: h }))(band(30, 60))} width={2 * R} fill={K.varm} opacity={0.16} />
          <rect x={CX - R} {...(({ y, h }) => ({ y, height: h }))(band(-60, -30))} width={2 * R} fill={K.varm} opacity={0.16} />
        </g>
        <circle cx={CX} cy={CY} r={R} fill={`url(#${ID}-skygge)`} data-nocheck="" />
        <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke={K.varm} strokeOpacity={0.7} strokeWidth={2} strokeDasharray="8 6" />
        {/* rotasjonspil over globusen */}
        <Pil pts={bue([CX - 150, CY - R - 4], [CX, CY - R - 34], [CX + 150, CY - R - 4])} farge={K.dempet} w={3} opacity={s.rot} />
        {piler.map((p, i) => (
          <g key={i}>
            <Pil pts={p.ref} farge={K.dempet} w={2.5} dash="7 6" opacity={s.ref * (i % 4 < 2 ? s.on : s.os)} kant={false} />
            <Pil pts={p.pts} farge={p.farge} w={4.5} opacity={i % 4 < 2 ? s.on : s.os} />
            <Strom pts={p.pts} farge="#f8fafc" fase={(f + i * 0.13) % 1} antall={2} r={3.5} opacity={i % 4 < 2 ? s.on : s.os} />
          </g>
        ))}
        <Trykk dlon={-70} lat={30} kind="H" opacity={1} />
        <Trykk dlon={-70} lat={-30} kind="H" opacity={1} />
        <Trykk dlon={28} lat={0} kind="L" opacity={1} />
        <Trykk dlon={-66} lat={60} kind="L" opacity={0.9} />
        <Trykk dlon={-66} lat={-60} kind="L" opacity={0.9} />
      </>
    );
  },
};

export const KlimaCoriolisFigur = lagFigur(def);
