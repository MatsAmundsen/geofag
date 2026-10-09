/**
 * Figurene på NAO-siden (Geofag 2: Den nordatlantiske oscillasjonen), tegnet på nytt etter figurene i
 * Mats Amundsens Word-fil. Ingen originalbilder brukes.
 *
 * Samme ramme som IOD, Isbreer, Landformer og Norges geologi (IsbreFigur). Ingen hPa-tall: figurene viser
 * bare sterkt/svakt, slik kildene beskriver fasene (NOAA, u.å.-a). Polarvirvelen er tegnet etter
 * NOAA Climate.gov (2021). Kartgrunnlaget ligger ferdig i klima-kart.ts; banene under regnes ut én gang
 * når modulen lastes, så serverrenderingen bare skriver ferdige strenger.
 */
import { useId, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, StegVelger, type Key, type Lab } from "./isbre-figur";
import { figureFont } from "./isbre-kit";
import { GLOBE_LAND, NA_H, NA_LAND, globeXY, naXY } from "./klima-kart";

/* ---------- felles ---------- */

const OCEAN = "#173a4f";
const LAND = "#55604f";
const LAND_EDGE = "#8e9784";
const JET = "#f2f6f8";
const WARM = "#e8823f";
const COOL = "#4fa3d8";
const L_COL = "#ff8b7a";
const H_COL = "#7cc4ff";

const r1 = (v: number) => Math.round(v * 10) / 10;
type Proj = (lon: number, lat: number) => [number, number];
/** Avrundet, så server og nettleser skriver like tall (Math.sin/cos kan avvike i siste siffer). */
const na: Proj = (lon, lat) => {
  const [x, y] = naXY(lon, lat);
  return [r1(x), r1(y)];
};

/** Glatt kurve gjennom geografiske punkter. */
function curveThrough(proj: Proj, pts: [number, number][]) {
  const p = pts.map(([lo, la]) => proj(lo, la));
  let d = `M${r1(p[0][0])} ${r1(p[0][1])}`;
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i][0] + p[i + 1][0]) / 2;
    const my = (p[i][1] + p[i + 1][1]) / 2;
    d += ` Q${r1(p[i][0])} ${r1(p[i][1])} ${r1(mx)} ${r1(my)}`;
  }
  const last = p[p.length - 1];
  return `${d} L${r1(last[0])} ${r1(last[1])}`;
}

/** Lukket kurve langs breddegrad lat(lon) rundt hele kloden (globusprojeksjon). */
function ring(lat: (lon: number) => number, step = 6) {
  const pts: string[] = [];
  for (let lon = -180; lon < 180; lon += step) {
    const [x, y] = globeXY(lon, lat(lon));
    pts.push(`${r1(x)} ${r1(y)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function Trykk({
  x,
  y,
  kind,
  scale,
  size = 40,
  strong = true,
}: {
  x: number;
  y: number;
  kind: "L" | "H";
  scale: number;
  size?: number;
  strong?: boolean;
}) {
  const fs = figureFont(size, scale);
  const col = kind === "L" ? L_COL : H_COL;
  return (
    <g aria-hidden="true" opacity={strong ? 1 : 0.8}>
      <circle cx={x} cy={y} r={fs * 0.88} fill="#0b1318" fillOpacity={0.55} stroke={col} strokeWidth={strong ? 3 : 1.6} />
      <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={800} fill={col}>
        {kind}
      </text>
    </g>
  );
}

/** Isobarer (uten tall) rundt et trykksenter: flere ringer når systemet er sterkt. */
function Isobarer({ x, y, n, rx, ry, color }: { x: number; y: number; n: number; rx: number; ry: number; color: string }) {
  return (
    <g aria-hidden="true" data-nocheck="">
      {Array.from({ length: n }, (_, i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={rx * (i + 1.6)}
          ry={ry * (i + 1.6)}
          fill="none"
          stroke={color}
          strokeOpacity={0.55 - i * 0.1}
          strokeWidth={1.6}
        />
      ))}
    </g>
  );
}

function Flekk({ x, y, rx, ry, color, rot = 0 }: { x: number; y: number; rx: number; ry: number; color: string; rot?: number }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={rx}
      ry={ry}
      fill={color}
      fillOpacity={0.42}
      transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
      data-nocheck=""
    />
  );
}

/* =====================================================================
 * Figur 1: positiv og negativ NAO på globusen
 * ===================================================================== */

export type NaoFase = "positiv" | "negativ";
const FASER: NaoFase[] = ["positiv", "negativ"];
const FASE_KNAPP = ["Positiv NAO", "Negativ NAO"];

const G_S = 1.25; // globusradius 250
const G_CX = 480;
const G_CY = 268;
const gp: Proj = (lon, lat) => {
  const [x, y] = globeXY(lon, lat);
  return [r1(G_CX + x * G_S), r1(G_CY + y * G_S)];
};
const G_ISL = gp(-22, 63);
const G_AZ = gp(-30, 38);
const G_STORM = {
  positiv: curveThrough(gp, [
    [-72, 40],
    [-52, 47],
    [-32, 53.5],
    [-12, 58],
    [6, 62],
  ]),
  negativ: curveThrough(gp, [
    [-66, 38],
    [-46, 40],
    [-26, 41.5],
    [-10, 42],
  ]),
};

export function NaoFaserFigur({ heading, caption }: { heading: string; caption: ReactNode }) {
  const [fase, setFase] = useState<NaoFase>("positiv");
  const pos = fase === "positiv";
  const uid = useId().replace(/:/g, "");
  const nEu = gp(8, 60);
  const sEu = gp(-4, 40);
  const eUs = gp(-75, 40);
  const labels: Lab[] = [
    {
      text: pos ? "Sterkt Islandslavtrykk" : "Svakt Islandslavtrykk",
      x: 20,
      y: 90,
      at: [G_ISL[0] - 30, G_ISL[1] - 20],
      color: L_COL,
      badge: [G_ISL[0] - 50, G_ISL[1] - 40],
    },
    {
      text: pos ? "Sterkt Asorhøytrykk" : "Svakt Asorhøytrykk",
      x: 20,
      y: pos ? 430 : 520,
      at: [G_AZ[0] - 30, G_AZ[1] + 20],
      color: H_COL,
      badge: [G_AZ[0] - 50, G_AZ[1] + 40],
    },
    {
      text: pos ? "Stormbane mot Nord-Europa" : "Stormbane mot Sør-Europa",
      x: 940,
      y: pos ? 70 : 500,
      at: pos ? gp(4, 61.6) : [sEu[0] - 60, sEu[1] + 4],
      color: "#bff0c8",
      anchor: "end",
      badge: pos ? [nEu[0] - 90, nEu[1] + 30] : [sEu[0] - 40, sEu[1] - 34],
    },
    {
      text: pos ? "Mildt og vått i Nord-Europa" : "Kaldt og tørt i Nord-Europa",
      x: 940,
      y: 150,
      at: [nEu[0] + 10, nEu[1] - 10],
      color: pos ? "#ffc39a" : "#a8d8f5",
      anchor: "end",
      badge: [nEu[0] + 20, nEu[1] - 30],
    },
    {
      text: pos ? "Tørt, ofte kaldt i Sør-Europa" : "Mildt og vått i Sør-Europa",
      x: 940,
      y: 410,
      at: [sEu[0] + 30, sEu[1] + 6],
      color: pos ? "#a8d8f5" : "#ffc39a",
      anchor: "end",
      badge: [sEu[0] + 50, sEu[1] + 20],
    },
  ];
  if (!pos)
    labels.push({
      text: "Kaldluft i østlige Nord-Amerika",
      x: 20,
      y: 440,
      at: [eUs[0] - 10, eUs[1]],
      color: "#a8d8f5",
      badge: [eUs[0] - 30, eUs[1] + 10],
    });
  const keys: Key[] = [
    { text: "Mildere enn normalt", color: WARM, kind: "fill" },
    { text: "Kaldere enn normalt", color: COOL, kind: "fill" },
    { text: "Stormbane", color: "#5fd27a", kind: "line" },
  ];
  return (
    <IsbreFigur
      title="Globus over Nord-Atlanteren med lavtrykk ved Island, høytrykk ved Asorene og stormbanen nord eller sør"
      heading={heading}
      caption={caption}
      toolbar={
        <StegVelger labels={FASE_KNAPP} step={FASER.indexOf(fase) + 1} onStep={(n) => setFase(FASER[n - 1])} label="Velg fase" />
      }
      status={
        pos
          ? "Positiv NAO: stor trykkforskjell mellom Asorene og Island."
          : "Negativ NAO: liten trykkforskjell mellom Asorene og Island."
      }
      labels={labels}
      keys={keys}
      notes={["Skjematisk, vinter", "Kyster: Natural Earth"]}
      viewBox="0 0 960 536"
      narrowViewBox="200 0 560 536"
    >
      {({ m, scale }) => (
        <g data-figur="nao-faser" data-fase={fase}>
          <defs>
            <clipPath id={`${uid}-globe`}>
              <circle cx={G_CX} cy={G_CY} r={200 * G_S} />
            </clipPath>
            <radialGradient id={`${uid}-sea`} cx="40%" cy="35%">
              <stop offset="0%" stopColor="#24597a" />
              <stop offset="100%" stopColor="#10283a" />
            </radialGradient>
          </defs>
          <circle cx={G_CX} cy={G_CY} r={200 * G_S} fill={`url(#${uid}-sea)`} stroke="#9fb6c4" strokeOpacity={0.5} strokeWidth={1.5} data-nocheck="" />
          <g clipPath={`url(#${uid}-globe)`}>
            <path
              d={GLOBE_LAND}
              transform={`translate(${G_CX} ${G_CY}) scale(${G_S})`}
              fill={LAND}
              stroke={LAND_EDGE}
              strokeWidth={0.6}
              data-nocheck=""
            />
            {pos ? (
              <>
                <Flekk x={nEu[0]} y={nEu[1]} rx={70} ry={42} color={WARM} rot={-20} />
                <Flekk x={sEu[0] + 20} y={sEu[1] + 10} rx={70} ry={34} color={COOL} rot={-10} />
              </>
            ) : (
              <>
                <Flekk x={nEu[0]} y={nEu[1]} rx={70} ry={42} color={COOL} rot={-20} />
                <Flekk x={sEu[0] + 20} y={sEu[1] + 10} rx={70} ry={34} color={WARM} rot={-10} />
                <Flekk x={eUs[0] + 10} y={eUs[1]} rx={46} ry={56} color={COOL} />
              </>
            )}
            <Isobarer x={G_ISL[0]} y={G_ISL[1]} n={pos ? 3 : 1} rx={22} ry={15} color={L_COL} />
            <Isobarer x={G_AZ[0]} y={G_AZ[1]} n={pos ? 3 : 1} rx={30} ry={17} color={H_COL} />
          </g>
          <path d={G_STORM[fase]} fill="none" stroke="#0b1318" strokeOpacity={0.6} strokeWidth={14} strokeLinecap="round" />
          <path d={G_STORM[fase]} fill="none" stroke="#5fd27a" strokeWidth={5} strokeLinecap="round" markerEnd={`url(#${m.teal})`} />
          <Trykk x={G_ISL[0]} y={G_ISL[1]} kind="L" scale={scale} size={pos ? 30 : 22} strong={pos} />
          <Trykk x={G_AZ[0]} y={G_AZ[1]} kind="H" scale={scale} size={pos ? 30 : 22} strong={pos} />
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * Figur 2: området der NAO virker
 * ===================================================================== */

function NaKart({ fill = LAND, edge = LAND_EDGE }: { fill?: string; edge?: string }) {
  return (
    <>
      <rect x={0} y={0} width={960} height={NA_H} fill={OCEAN} data-nocheck="" />
      <path d={NA_LAND} fill={fill} stroke={edge} strokeWidth={0.7} strokeLinejoin="round" data-nocheck="" />
    </>
  );
}

const ISL = na(-22, 63);
const AZ = na(-28, 38.5);

export function NaoOmradeFigur({ heading, caption }: { heading: string; caption: ReactNode }) {
  const steder: { t: string; p: [number, number]; c?: string }[] = [
    { t: "Nord-Atlanteren", p: na(-38, 48), c: "#bfe0ef" },
    { t: "Grønland", p: na(-42, 74) },
    { t: "Nord-Amerika", p: na(-88, 50) },
    { t: "Europa", p: na(22, 50) },
    { t: "Norge", p: na(10, 62.5) },
    { t: "Nord-Afrika", p: na(4, 27) },
  ];
  const labels: Lab[] = [
    ...steder.map((s) => ({
      text: s.t,
      x: s.p[0],
      y: s.p[1],
      color: s.c ?? "#f2e3c6",
      anchor: "middle" as const,
      badge: [s.p[0], s.p[1]] as [number, number],
    })),
    { text: "Island", x: ISL[0] + 64, y: ISL[1] - 28, at: [ISL[0] + 18, ISL[1] - 12], color: "#f2e3c6", anchor: "start", badge: [ISL[0] + 44, ISL[1] - 26] },
    { text: "Islandslavtrykket", x: ISL[0] - 40, y: ISL[1] + 74, at: [ISL[0] - 8, ISL[1] + 30], color: L_COL, anchor: "end", weight: 700, badge: [ISL[0] - 40, ISL[1] + 52] },
    { text: "Asorene", x: AZ[0] + 64, y: AZ[1] + 58, at: [AZ[0] + 22, AZ[1] + 24], color: "#f2e3c6", anchor: "start", badge: [AZ[0] + 40, AZ[1] + 42] },
    { text: "Asorhøytrykket", x: AZ[0] - 66, y: AZ[1] - 62, at: [AZ[0] - 32, AZ[1] - 30], color: H_COL, anchor: "end", weight: 700, badge: [AZ[0] - 48, AZ[1] - 44] },
  ];
  return (
    <IsbreFigur
      title="Kart over Nord-Atlanteren med Island, Asorene og Europa"
      heading={heading}
      caption={caption}
      labels={labels}
      notes={["Kyster: Natural Earth"]}
      viewBox={`0 40 960 ${NA_H - 40}`}
    >
      {({ scale }) => (
        <g data-figur="nao-omrade">
          <NaKart />
          <line x1={ISL[0]} y1={ISL[1] + 26} x2={AZ[0]} y2={AZ[1] - 28} stroke="#e8eef2" strokeOpacity={0.7} strokeWidth={2} strokeDasharray="8 8" />
          <Trykk x={ISL[0]} y={ISL[1]} kind="L" scale={scale} size={30} />
          <Trykk x={AZ[0]} y={AZ[1]} kind="H" scale={scale} size={30} />
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * Figur 3: stabil og forstyrret polarvirvel (etter NOAA Climate.gov)
 * ===================================================================== */

type Virvel = "stabil" | "forstyrret";
const VIRVEL: Virvel[] = ["stabil", "forstyrret"];

const PV_S = 1.25;
const PV_CX = 480;
const PV_CY = 278;
const pvp: Proj = (lon, lat) => {
  const [x, y] = globeXY(lon, lat);
  return [r1(PV_CX + x * PV_S), r1(PV_CY + y * PV_S)];
};
const tr = `translate(${PV_CX} ${PV_CY}) scale(${PV_S})`;
/** Stabil: samlet virvel rundt polen og en jevn jetstrøm lenger nord. */
const PV_STABIL = ring(() => 68);
const PV_STABIL_INNER = ring(() => 76);
const JET_STABIL = ring(() => 58);
/** Forstyrret: virvelen deles i to, jetstrømmen ligger lenger sør og er bølgete. */
const lobe = (lon0: number, lat0: number, r: number) => {
  const pts: string[] = [];
  for (let a = 0; a < 360; a += 15) {
    const lat = lat0 + r * Math.sin((a * Math.PI) / 180);
    const lon = lon0 + (r * 1.9 * Math.cos((a * Math.PI) / 180)) / Math.cos((lat0 * Math.PI) / 180);
    const [x, y] = globeXY(lon, lat);
    pts.push(`${r1(x)} ${r1(y)}`);
  }
  return `M${pts.join(" L")} Z`;
};
const LOBE_A = lobe(-80, 66, 7);
const LOBE_B = lobe(30, 68, 6);
const wavyLat = (lon: number) => 50 + 11 * Math.sin(((lon + 20) * 3 * Math.PI) / 180);
const JET_BOLGET = ring(wavyLat, 4);

/** Piler langs jetstrømmen, fra vest mot øst. */
function jetArrows(lat: (lon: number) => number, lons: number[]) {
  return lons.map((lon) => {
    const a = pvp(lon, lat(lon));
    const b = pvp(lon + 8, lat(lon + 8));
    return `M${r1(a[0])} ${r1(a[1])} L${r1(b[0])} ${r1(b[1])}`;
  });
}
const ARR_STABIL = jetArrows(() => 58, [-110, -70, -30, 10, 50]);
const ARR_BOLGET = jetArrows(wavyLat, [-104, -64, -24, 16, 56]);
/** Varm luft nordover og kald luft sørover der jetstrømmen bukter seg (forstyrret). */
const VARM_PILER = [-50, 70].map((lon) => {
  const a = pvp(lon, 34);
  const b = pvp(lon, 50);
  return `M${r1(a[0])} ${r1(a[1])} L${r1(b[0])} ${r1(b[1])}`;
});
const KALD_PILER = [-10, -90].map((lon) => {
  const a = pvp(lon, 62);
  const b = pvp(lon, 44);
  return `M${r1(a[0])} ${r1(a[1])} L${r1(b[0])} ${r1(b[1])}`;
});

export function NaoPolarvirvelFigur({ heading, caption }: { heading: string; caption: ReactNode }) {
  const [tilstand, setTilstand] = useState<Virvel>("stabil");
  const motion = useAnimationPlaying();
  const st = tilstand === "stabil";
  const uid = useId().replace(/:/g, "");
  const pvLab = st ? pvp(-30, 70) : pvp(-80, 66);
  const jetLab = st ? pvp(-75, 58) : pvp(-110, wavyLat(-110));
  const pole = pvp(0, 90);
  const labels: Lab[] = [
    {
      text: "Polarvirvelen",
      x: 940,
      y: 120,
      at: [pvLab[0] + 40, pvLab[1] - 14],
      color: "#a9c8ff",
      anchor: "end",
      badge: [pvLab[0] + 70, pvLab[1] - 34],
    },
    {
      text: "Polarjetstrømmen",
      x: 20,
      y: st ? 220 : 330,
      at: [jetLab[0], jetLab[1]],
      color: "#bfe6ff",
      badge: [jetLab[0] - 26, jetLab[1] + 16],
    },
    st
      ? { text: "Kald luft holdes i Arktis", x: 940, y: 300, at: [pole[0] + 14, pole[1] + 64], color: C.fg, anchor: "end", badge: [pole[0] + 36, pole[1] + 84] }
      : { text: "Kald luft går sørover", x: 940, y: 300, at: [pvp(-10, 50)[0] + 8, pvp(-10, 50)[1]], color: "#e6f3ff", anchor: "end", badge: [pvp(-10, 50)[0] + 30, pvp(-10, 50)[1] + 10] },
    st
      ? { text: "Sterk strøm fra vest mot øst", x: 940, y: 470, at: [pvp(-10, 57)[0] + 10, pvp(-10, 57)[1] + 6], color: "#bfe6ff", anchor: "end", badge: [pvp(-10, 57)[0] + 30, pvp(-10, 57)[1] + 26] }
      : { text: "Lenger sør, bølgete strøm", x: 940, y: 470, at: [pvp(-40, wavyLat(-40))[0], pvp(-40, wavyLat(-40))[1] + 8], color: "#bfe6ff", anchor: "end", badge: [pvp(-40, wavyLat(-40))[0] + 20, pvp(-40, wavyLat(-40))[1] + 30] },
  ];
  if (!st)
    labels.push({
      text: "Varm luft går nordover",
      x: 30,
      y: 470,
      at: [pvp(-50, 38)[0] - 6, pvp(-50, 38)[1]],
      color: C.warm,
      badge: [pvp(-50, 38)[0] - 26, pvp(-50, 38)[1] + 6],
    });
  const keys: Key[] = [
    { text: "Polarvirvelen (stratosfæren, ca. 16–48 km over bakken)", color: "#6f8fe8", kind: "fill" },
    { text: "Polarjetstrømmen (lavere, i troposfæren)", color: "#bfe6ff", kind: "line" },
  ];
  return (
    <IsbreFigur
      title="Globus over Arktis som viser en samlet og en oppbrutt polarvirvel med polarjetstrømmen under"
      heading={heading}
      caption={caption}
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={["Stabil polarvirvel", "Forstyrret polarvirvel"]}
          step={VIRVEL.indexOf(tilstand) + 1}
          onStep={(n) => setTilstand(VIRVEL[n - 1])}
          label="Velg tilstand"
        />
      }
      status={
        st
          ? "Stabil: en sterk virvel holder den kalde lufta i Arktis, og jetstrømmen går lenger nord."
          : "Forstyrret: virvelen svekkes eller deles, og jetstrømmen blir bølgete og ligger lenger sør."
      }
      labels={labels}
      keys={keys}
      notes={["Skjematisk, etter NOAA Climate.gov (2021)", "Kyster: Natural Earth"]}
      viewBox="0 0 960 556"
      narrowViewBox="200 0 560 556"
    >
      {({ m }) => (
        <g className={motion.motionClass} data-figur="nao-polarvirvel" data-tilstand={tilstand}>
          <defs>
            <clipPath id={`${uid}-g`}>
              <circle cx={PV_CX} cy={PV_CY} r={200 * PV_S} />
            </clipPath>
          </defs>
          <circle cx={PV_CX} cy={PV_CY} r={200 * PV_S} fill="#2a3a46" stroke="#9fb6c4" strokeOpacity={0.5} strokeWidth={1.5} data-nocheck="" />
          <g clipPath={`url(#${uid}-g)`}>
            <path d={GLOBE_LAND} transform={tr} fill="#6b7680" stroke="#a7b1b8" strokeWidth={0.6} data-nocheck="" />
          </g>
          {/* polarjetstrømmen */}
          <path d={st ? JET_STABIL : JET_BOLGET} transform={tr} fill="none" stroke="#bfe6ff" strokeOpacity={0.45} strokeWidth={14} strokeLinejoin="round" data-nocheck="" />
          <path
            d={st ? JET_STABIL : JET_BOLGET}
            transform={tr}
            fill="none"
            stroke="#e6f6ff"
            strokeWidth={2}
            strokeDasharray="10 12"
            style={motion.playing ? { animation: "model-ocean-flow 1.6s linear infinite" } : undefined}
          />
          {(st ? ARR_STABIL : ARR_BOLGET).map((d) => (
            <path key={d} d={d} fill="none" stroke="#3f6fd0" strokeWidth={3.2} markerEnd={`url(#${m.ice})`} />
          ))}
          {/* polarvirvelen */}
          {st ? (
            <g>
              <path d={PV_STABIL} transform={tr} fill="#6f8fe8" fillOpacity={0.45} stroke="#a9c8ff" strokeWidth={2} data-nocheck="" />
              <path d={PV_STABIL_INNER} transform={tr} fill="none" stroke="#c9dbff" strokeOpacity={0.8} strokeWidth={1.6} strokeDasharray="14 8" data-nocheck="" />
            </g>
          ) : (
            <g>
              <path d={LOBE_A} transform={tr} fill="#6f8fe8" fillOpacity={0.5} stroke="#a9c8ff" strokeWidth={2} data-nocheck="" />
              <path d={LOBE_B} transform={tr} fill="#6f8fe8" fillOpacity={0.5} stroke="#a9c8ff" strokeWidth={2} data-nocheck="" />
              {VARM_PILER.map((d) => (
                <path key={d} d={d} fill="none" stroke={C.warm} strokeWidth={4} markerEnd={`url(#${m.warm})`} />
              ))}
              {KALD_PILER.map((d) => (
                <path key={d} d={d} fill="none" stroke="#e6f3ff" strokeWidth={4} markerEnd={`url(#${m.fg})`} />
              ))}
            </g>
          )}
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * Figur 4 og 5: positiv og negativ NAO på kart
 * ===================================================================== */

const JET_KART = {
  positiv: curveThrough(naXY, [
    [-96, 39],
    [-78, 40.5],
    [-56, 45],
    [-35, 52],
    [-15, 58],
    [5, 63],
    [20, 67],
  ]),
  negativ: curveThrough(naXY, [
    [-95, 42],
    [-82, 36],
    [-68, 44],
    [-55, 58],
    [-40, 62],
    [-28, 54],
    [-18, 44],
    [-5, 40],
    [12, 38],
    [28, 37],
  ]),
};

export function NaoKartFigur({
  initialFase,
  heading,
  caption,
  title,
}: {
  initialFase: NaoFase;
  heading: string;
  caption: ReactNode;
  title: string;
}) {
  const motion = useAnimationPlaying();
  const [fase, setFase] = useState<NaoFase>(initialFase);
  const pos = fase === "positiv";
  const nEu = na(12, 61);
  const sEu = na(8, 41);
  const ca = na(-82, 60);
  const eUs = na(-79, 33.5);
  const warmSea = pos ? na(-62, 33) : na(-28, 47);
  const coolSea = pos ? na(-30, 27) : na(-55, 37);
  const jetLab = pos ? na(-56, 45) : na(-47, 61.2);
  const labels: Lab[] = [
    { text: pos ? "Mildt og vått" : "Kaldt og tørt", x: nEu[0], y: nEu[1] + 6, color: "#ffffff", anchor: "middle", halo: "#0b1318", badge: [nEu[0], nEu[1]] },
    { text: pos ? "Kaldere og tørt" : "Mildt og vått", x: sEu[0], y: pos ? sEu[1] + 6 : sEu[1] - 22, color: "#ffffff", anchor: "middle", halo: "#0b1318", badge: [sEu[0], sEu[1]] },
    { text: pos ? "Kaldt" : "Mildt", x: ca[0], y: ca[1] + 6, color: "#ffffff", anchor: "middle", halo: "#0b1318", badge: [ca[0], ca[1]] },
    { text: pos ? "Mildt og vått" : "Kaldt", x: eUs[0] + 26, y: eUs[1] + 6, color: "#ffffff", anchor: "middle", halo: "#0b1318", badge: [eUs[0] + 26, eUs[1]] },
    { text: "Varmere hav", x: warmSea[0], y: warmSea[1] + 6, color: "#ffd2ae", anchor: "middle", badge: [warmSea[0], warmSea[1]] },
    { text: "Kjøligere hav", x: coolSea[0], y: coolSea[1] + 6, color: "#bfe6ff", anchor: "middle", badge: [coolSea[0], coolSea[1]] },
    pos
      ? { text: "Jetstrøm", x: jetLab[0] - 30, y: jetLab[1] - 30, at: [jetLab[0], jetLab[1] - 6], color: JET, anchor: "end", weight: 700, badge: [jetLab[0] - 20, jetLab[1] - 26] }
      : { text: "Jetstrøm", x: jetLab[0] - 70, y: jetLab[1] - 30, at: [jetLab[0] - 6, jetLab[1] - 7], color: JET, anchor: "end", weight: 700, halo: "#0b1318", badge: [jetLab[0] + 20, jetLab[1] - 28] },
    pos
      ? { text: "Sterkt lavtrykk", x: ISL[0] - 50, y: ISL[1] + 8, color: L_COL, anchor: "end", weight: 700, halo: "#0b1318", badge: [ISL[0] - 44, ISL[1] - 20] }
      : { text: "Svakt lavtrykk", x: ISL[0] + 40, y: ISL[1] + 8, color: L_COL, anchor: "start", weight: 700, halo: "#0b1318", badge: [ISL[0] + 36, ISL[1] - 20] },
    { text: pos ? "Sterkt høytrykk" : "Svakt høytrykk", x: AZ[0] + 46, y: AZ[1] + 10, color: H_COL, anchor: "start", weight: 700, badge: [AZ[0] + 44, AZ[1] - 6] },
  ];
  const keys: Key[] = [
    { text: "Varmere enn normalt", color: WARM, kind: "fill" },
    { text: "Kaldere enn normalt", color: COOL, kind: "fill" },
    { text: "Jetstrøm", color: JET, kind: "line" },
  ];
  return (
    <IsbreFigur
      title={title}
      heading={heading}
      caption={caption}
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger labels={FASE_KNAPP} step={FASER.indexOf(fase) + 1} onStep={(n) => setFase(FASER[n - 1])} label="Velg fase" />
      }
      status={
        pos
          ? "Positiv NAO: sterkt lavtrykk og høytrykk, jetstrømmen går mot Nord-Europa."
          : "Negativ NAO: svake trykksystemer, jetstrømmen er bølgete og ligger lenger sør."
      }
      labels={labels}
      keys={keys}
      notes={["Skjematisk, vinter. Ingen trykktall", "Kyster: Natural Earth"]}
      viewBox={`0 40 960 ${NA_H - 40}`}
    >
      {({ m, scale }) => (
        <g className={motion.motionClass} data-figur="nao-kart" data-fase={fase}>
          <NaKart />
          {/* hav */}
          <Flekk x={warmSea[0]} y={warmSea[1]} rx={pos ? 150 : 90} ry={pos ? 70 : 150} color={WARM} rot={pos ? -15 : 20} />
          <Flekk x={coolSea[0]} y={coolSea[1]} rx={pos ? 190 : 140} ry={pos ? 60 : 80} color={COOL} rot={pos ? -8 : -10} />
          {/* vær på land */}
          <Flekk x={nEu[0]} y={nEu[1]} rx={78} ry={50} color={pos ? WARM : COOL} rot={-25} />
          <Flekk x={sEu[0]} y={sEu[1]} rx={80} ry={40} color={pos ? COOL : WARM} rot={-12} />
          <Flekk x={ca[0]} y={ca[1]} rx={80} ry={50} color={pos ? COOL : WARM} />
          <Flekk x={eUs[0] + 26} y={eUs[1]} rx={66} ry={36} color={pos ? WARM : COOL} rot={-30} />
          <Isobarer x={ISL[0]} y={ISL[1]} n={pos ? 3 : 1} rx={30} ry={20} color={L_COL} />
          <Isobarer x={AZ[0]} y={AZ[1]} n={pos ? 3 : 1} rx={38} ry={22} color={H_COL} />
          <path d={JET_KART[fase]} fill="none" stroke="#0b1318" strokeOpacity={0.55} strokeWidth={11} strokeLinecap="round" data-nocheck="" />
          <path
            d={JET_KART[fase]}
            fill="none"
            stroke={JET}
            strokeWidth={4.5}
            strokeLinecap="round"
            markerEnd={`url(#${m.fg})`}
            strokeDasharray={motion.playing ? "26 10" : undefined}
            style={motion.playing ? { animation: "model-wind-flow 1.3s linear infinite" } : undefined}
          />
          <Trykk x={ISL[0]} y={ISL[1]} kind="L" scale={scale} size={pos ? 40 : 28} strong={pos} />
          <Trykk x={AZ[0]} y={AZ[1]} kind="H" scale={scale} size={pos ? 40 : 28} strong={pos} />
        </g>
      )}
    </IsbreFigur>
  );
}
