/**
 * Figurene på IOD-siden (Geofag 2: Den indiske hav-dipolen), tegnet på nytt etter Mats Amundsens
 * Word-figurer og påtegninger. Ingen originalbilder brukes.
 *
 * Samme ramme som Isbreer, Landformer og Norges geologi (IsbreFigur): nummermerker og liste på mobil,
 * etiketter med streker som ikke krysser hverandre, aria og redusert bevegelse.
 *
 * Alt innhold er hentet fra iod.md (BOM, u.å.; Saji m.fl., 1999; NOAA, u.å.). Havtemperaturen i figur 3
 * er NOAA OISST v2.1 for 24. september 2026. Kartgrunnlaget ligger ferdig i klima-kart.ts, så ingenting
 * tungt beregnes under serverrendering.
 */
import { useId, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, StegVelger, type Key, type Lab } from "./isbre-figur";
import { figureFont } from "./isbre-kit";
import { FRONT, IO_LAND, SST_BANDS, SST_LEVELS, ioXY } from "./klima-kart";

/* ---------- felles ---------- */

const OCEAN = "#173a4f";
const LAND = "#55604f";
const LAND_EDGE = "#8e9784";
const JET = "#9be564"; // Mats' grønne jetstrømlinje
const MATS_RED = "#ff6b5e"; // Mats' røde påtegninger
const WARM = "#e8823f";
const COOL = "#4fa3d8";

const xy = (lon: number, lat: number) => ioXY(lon, lat);
const r1 = (v: number) => Math.round(v * 10) / 10;
const line = (pts: readonly (readonly [number, number])[]) =>
  "M" + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L");
/** Glatt kurve gjennom geografiske punkter (kvadratiske Bézier mellom midtpunkter). */
function geoCurve(pts: [number, number][]) {
  const p = pts.map(([lo, la]) => xy(lo, la));
  let d = `M${r1(p[0][0])} ${r1(p[0][1])}`;
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i][0] + p[i + 1][0]) / 2;
    const my = (p[i][1] + p[i + 1][1]) / 2;
    d += ` Q${r1(p[i][0])} ${r1(p[i][1])} ${r1(mx)} ${r1(my)}`;
  }
  const last = p[p.length - 1];
  return `${d} L${r1(last[0])} ${r1(last[1])}`;
}

/** Ekvator og 30°-linjene. */
function Gradnett({ scale, x0 = 0, x1 = 960 }: { scale: number; x0?: number; x1?: number }) {
  const fs = figureFont(13, scale);
  const rows: [number, string][] = [
    [30, "30° N"],
    [0, "Ekvator"],
    [-30, "30° S"],
  ];
  return (
    <g aria-hidden="true">
      {rows.map(([lat, text]) => {
        const y = xy(20, lat)[1];
        return (
          <g key={lat}>
            <line
              x1={x0}
              x2={x1}
              y1={y}
              y2={y}
              stroke={lat === 0 ? "#cfe3ee" : "#9fb6c4"}
              strokeOpacity={lat === 0 ? 0.55 : 0.32}
              strokeWidth={lat === 0 ? 1.4 : 1}
              strokeDasharray="7 7"
              data-nocheck=""
            />
            <text
              x={x1 - 8}
              y={lat > 0 ? y + fs + 4 : y - 6}
              textAnchor="end"
              fontSize={fs}
              fill="#cfe3ee"
              fillOpacity={0.85}
              data-gridlabel=""
            >
              {text}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Land({ fill = LAND, edge = LAND_EDGE, opacity = 1 }: { fill?: string; edge?: string; opacity?: number }) {
  return (
    <path d={IO_LAND} fill={fill} fillOpacity={opacity} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" data-nocheck="" />
  );
}

/** Trykkmerke (L eller H) i figuren. */
function Trykk({ at, kind, scale, size = 34, color }: { at: [number, number]; kind: "L" | "H"; scale: number; size?: number; color?: string }) {
  const [x, y] = xy(at[0], at[1]);
  const fs = figureFont(size, scale);
  const col = color ?? (kind === "L" ? "#ff8b7a" : "#7cc4ff");
  return (
    <g aria-hidden="true">
      <circle cx={x} cy={y} r={fs * 0.88} fill="#0b1318" fillOpacity={0.55} stroke={col} strokeWidth={2.2} />
      <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={800} fill={col}>
        {kind}
      </text>
    </g>
  );
}

/** Regnsky med regnstriper. */
function Sky({ x, y, s = 1, rain = true }: { x: number; y: number; s?: number; rain?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} aria-hidden="true">
      {rain
        ? [-26, -12, 2, 16, 30].map((dx) => (
            <line key={dx} x1={dx} y1={14} x2={dx - 8} y2={44} stroke="#a9d3ea" strokeWidth={2.4} strokeLinecap="round" />
          ))
        : null}
      <path
        d="M-44 14 C-60 14 -60 -8 -42 -8 C-40 -26 -16 -30 -6 -18 C2 -34 32 -32 34 -12 C52 -14 58 12 40 14 Z"
        fill="#e9eef2"
        stroke="#9fb0bc"
        strokeWidth={1.4}
      />
    </g>
  );
}

/* =====================================================================
 * Figur 1 og 2: positiv og negativ IOD (samme kart, fasebytte)
 * ===================================================================== */

export type IodFase = "positiv" | "negativ";

const FASER: IodFase[] = ["positiv", "negativ"];
const FASE_KNAPP = ["Positiv IOD", "Negativ IOD"];
const FASE_STATUS: Record<IodFase, string> = {
  positiv:
    "Positiv IOD: varmere hav ved Øst-Afrika, kjøligere nær Indonesia. Lufta stiger i vest og synker i øst.",
  negativ:
    "Negativ IOD: kjøligere hav i vest, varmere i øst. Lufta stiger over det varme havet ved Indonesia.",
};

/** Kartvindu for fasefigurene: 20° Ø–150° Ø, 34° N–50° S. */
const FASE_VB = (() => {
  const top = xy(20, 34)[1];
  const bot = xy(20, -54)[1];
  return `0 ${r1(top)} 960 ${r1(bot - top)}`;
})();

/** Varme og kalde flekker i havet (sentrum lon/lat, radius i grader). */
const POOLS = {
  vest: { lon: 56, lat: -2, rx: 15, ry: 11 },
  ost: { lon: 100, lat: -5, rx: 14, ry: 10 },
};

/** Jetstrømlinja i figur 1 og 2 etter Mats' grønne linje: inn fra vest på ca. 35° S, stiger inn over
 * SV-Australia og krysser den sørlige delen av kontinentet mot sørøst. */
const JET_IOD = geoCurve([
  [20, -35],
  [45, -35],
  [70, -35],
  [92, -34.5],
  [108, -33],
  [117, -30.5],
  [128, -31],
  [139, -34.5],
  [150, -39],
]);
/** L-merker langs jetstrømmen (lavtrykk i vestavindsbeltet), sør for linja. */
const LAV_JET: Record<"positiv" | "negativ", [number, number][]> = {
  positiv: [
    [32, -43],
    [62, -42.5],
    [106, -40],
  ],
  // L-en lengst vest står sør for Afrika
  negativ: [
    [25, -42],
    [62, -42.5],
    [124, -37.5],
  ],
};

function PoolGrad({ id, color }: { id: string; color: string }) {
  return (
    <radialGradient id={id}>
      <stop offset="0%" stopColor={color} stopOpacity={0.85} />
      <stop offset="60%" stopColor={color} stopOpacity={0.45} />
      <stop offset="100%" stopColor={color} stopOpacity={0} />
    </radialGradient>
  );
}

function Pool({ p, fill }: { p: { lon: number; lat: number; rx: number; ry: number }; fill: string }) {
  const [cx, cy] = xy(p.lon, p.lat);
  const k = 960 / 130;
  return <ellipse cx={cx} cy={cy} rx={p.rx * k} ry={p.ry * k} fill={fill} data-nocheck="" />;
}

/** Walker-sirkulasjonen som en sløyfe over ekvator: stiger over det varme havet, synker over det kalde. */
function Walker({ fase, m, flow }: { fase: IodFase; m: { fg: string }; flow: boolean }) {
  const [wx, ey] = xy(POOLS.vest.lon, 0);
  const [ex] = xy(POOLS.ost.lon + 4, 0);
  const top = xy(20, 27)[1];
  const up = fase === "positiv" ? wx : ex;
  const down = fase === "positiv" ? ex : wx;
  const d = `M${up} ${ey - 30} L${up} ${top + 30} Q${up} ${top} ${up + (down > up ? 30 : -30)} ${top} L${down + (down > up ? -30 : 30)} ${top} Q${down} ${top} ${down} ${top + 30} L${down} ${ey - 40}`;
  return (
    <g aria-hidden="true">
      <path d={d} fill="none" stroke="#0b1318" strokeOpacity={0.5} strokeWidth={9} strokeLinejoin="round" />
      <path
        d={d}
        fill="none"
        stroke="#f2f6f8"
        strokeWidth={3}
        strokeDasharray="12 10"
        strokeLinejoin="round"
        markerEnd={`url(#${m.fg})`}
        style={flow ? { animation: "model-wind-flow 1.4s linear infinite" } : undefined}
      />
    </g>
  );
}

/** Vind langs ekvator ved overflaten. */
function Overflatevind({ fase, m, flow }: { fase: IodFase; m: { fg: string; cold: string }; flow: boolean }) {
  const y = xy(20, -1.5)[1];
  const segs: [number, number][] = [
    [64, 74],
    [76, 86],
    [88, 96],
  ];
  return (
    <g aria-hidden="true">
      {segs.map(([a, b]) => {
        const [xa] = xy(a, 0);
        const [xb] = xy(b, 0);
        const [x1, x2] = fase === "positiv" ? [xb, xa] : [xa, xb];
        return (
          <line
            key={a}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke="#ffe08a"
            strokeWidth={fase === "positiv" ? 3 : 5}
            strokeLinecap="round"
            markerEnd={`url(#${m.fg})`}
            style={flow ? { animation: "model-wind-flow 1.2s linear infinite" } : undefined}
            strokeDasharray={flow ? "18 6" : undefined}
          />
        );
      })}
    </g>
  );
}

export function IodFaseFigur({
  initialFase = "positiv",
  heading,
  caption,
  title,
}: {
  initialFase?: IodFase;
  heading: string;
  caption: ReactNode;
  title: string;
}) {
  const motion = useAnimationPlaying();
  const [fase, setFase] = useState<IodFase>(initialFase);
  const pos = fase === "positiv";
  const [wx] = xy(POOLS.vest.lon, POOLS.vest.lat);
  const [ox] = xy(POOLS.ost.lon, POOLS.ost.lat);
  const upw = xy(107, -11);
  const afrika = xy(38, -2);
  const indonesia = xy(112, -1);
  const aus = xy(134, -26);
  const sAus = xy(140, -28);
  const labels: Lab[] = [
    {
      text: pos ? "Varmere enn normalt" : "Kjøligere enn normalt",
      x: wx,
      y: xy(20, -15)[1],
      color: pos ? "#ffc39a" : "#a8d8f5",
      anchor: "middle",
      badge: [wx - 70, xy(20, -9)[1]],
    },
    {
      text: pos ? "Kjøligere enn normalt" : "Varmere enn normalt",
      x: xy(92, 0)[0],
      y: xy(20, -19)[1],
      color: pos ? "#a8d8f5" : "#ffc39a",
      anchor: "middle",
      badge: [xy(88, 0)[0], xy(20, -14)[1]],
    },
    {
      text: pos ? "Lufta stiger: skyer og regn (konveksjon)" : "Lufta stiger over det varme havet: mer skyer og regn",
      x: pos ? 40 : 560,
      y: xy(20, 31)[1],
      at: pos ? [afrika[0] + 40, afrika[1] - 70] : [indonesia[0] - 6, indonesia[1] - 74],
      color: C.fg,
      badge: pos ? [afrika[0] + 40, afrika[1] - 112] : [indonesia[0] - 6, indonesia[1] - 116],
    },
    {
      text: pos ? "Lufta synker: færre skyer, tørrere i Indonesia" : "Lufta synker: tørrere i Øst-Afrika",
      x: pos ? 560 : 40,
      y: xy(20, 31)[1],
      at: pos ? [ox + 30, xy(20, 18)[1]] : [wx, xy(20, 18)[1]],
      color: C.fg,
      badge: pos ? [ox + 64, xy(20, 18)[1]] : [wx + 40, xy(20, 18)[1]],
    },
    {
      text: pos ? "Svakere vestavind, iblant østavind: varmt vann skyves mot vest" : "Sterkere vestavind: varmt vann samles i øst",
      // lang tekst i positiv fase: legges rett over vindpilene, under enden av Walker-søylene
      x: pos ? 462 : 470,
      y: pos ? xy(20, 1.7)[1] : xy(20, 7)[1],
      at: [xy(80, 0)[0], xy(20, -1)[1] - 8],
      color: "#ffe08a",
      anchor: "middle",
      size: pos ? 14 : 15,
      badge: [xy(80, 0)[0], xy(20, 4)[1]],
    },
    {
      text: pos ? "Mindre regn i deler av Australia" : "Mer regn i Sør-Australia",
      x: 900,
      y: aus[1] + 6,
      color: pos ? "#ffd08a" : "#9fdcff",
      anchor: "end",
      badge: [aus[0], aus[1]],
    },
    {
      text: "Jetstrøm",
      x: xy(70, -35)[0],
      y: xy(70, -35)[1] - 18,
      at: [xy(70, -35)[0], xy(70, -35)[1] - 4],
      color: JET,
      anchor: "middle",
      weight: 700,
      badge: [xy(80, -35)[0], xy(80, -32)[1]],
    },
  ];
  if (pos)
    labels.push({
      text: "Oppvelling: kaldt vann stiger opp",
      x: upw[0] - 24,
      y: xy(20, -27)[1],
      at: [upw[0], upw[1] + 16],
      color: "#a8d8f5",
      anchor: "end",
      badge: [upw[0] + 30, upw[1] + 26],
    });
  else
    labels.push({
      text: "Mindre oppvelling nær Indonesia",
      x: upw[0] - 24,
      y: xy(20, -27)[1],
      at: [upw[0], upw[1] + 16],
      color: "#a8d8f5",
      anchor: "end",
      badge: [upw[0] + 30, upw[1] + 26],
    });
  const keys: Key[] = [
    { text: "Varmere hav enn normalt", color: WARM, kind: "fill" },
    { text: "Kjøligere hav enn normalt", color: COOL, kind: "fill" },
    { text: "L = lavere trykk, H = høyere trykk", color: "#ff8b7a", kind: "symbol", symbol: "L" },
    { text: "Jetstrøm (skjematisk)", color: JET, kind: "line" },
  ];
  const flow = motion.playing;
  const gid = useId().replace(/:/g, "");
  return (
    <IsbreFigur
      title={title}
      heading={heading}
      caption={caption}
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={FASE_KNAPP}
          step={FASER.indexOf(fase) + 1}
          onStep={(n) => setFase(FASER[n - 1])}
          label="Velg fase"
        />
      }
      status={FASE_STATUS[fase]}
      labels={labels}
      keys={keys}
      notes={["Skjematisk kart over Det indiske hav", "Kyster: Natural Earth"]}
      viewBox={FASE_VB}
    >
      {({ m, scale }) => (
        <g className={motion.motionClass} data-figur="iod-fase" data-fase={fase}>
          <defs>
            <PoolGrad id={`${gid}-warm`} color={WARM} />
            <PoolGrad id={`${gid}-cool`} color={COOL} />
          </defs>
          <rect x={0} y={0} width={960} height={738} fill={OCEAN} data-nocheck="" />
          <Pool p={POOLS.vest} fill={pos ? `url(#${gid}-warm)` : `url(#${gid}-cool)`} />
          <Pool p={POOLS.ost} fill={pos ? `url(#${gid}-cool)` : `url(#${gid}-warm)`} />
          <Land />
          <Gradnett scale={scale} />
          {/* oppvelling sør for Indonesia (positiv fase), svak i negativ fase */}
          <g aria-hidden="true" opacity={pos ? 1 : 0.4}>
            <circle cx={upw[0]} cy={upw[1]} r={15} fill="none" stroke="#a8d8f5" strokeWidth={2.2} />
            <line x1={upw[0]} y1={upw[1] + 9} x2={upw[0]} y2={upw[1] - 9} stroke="#a8d8f5" strokeWidth={2.2} markerEnd={`url(#${m.cold})`} />
          </g>
          <Walker fase={fase} m={m} flow={flow} />
          {pos ? <Sky x={afrika[0] + 40} y={afrika[1] - 70} s={0.9} /> : <Sky x={indonesia[0] - 6} y={indonesia[1] - 74} s={1.05} />}
          {pos ? null : <Sky x={sAus[0] - 20} y={sAus[1] - 60} s={0.55} />}
          <Overflatevind fase={fase} m={m} flow={flow} />
          {/* lavere trykk over det varme havet, høyere over det kalde */}
          <Trykk at={[POOLS.vest.lon, POOLS.vest.lat - 1]} kind={pos ? "L" : "H"} scale={scale} />
          <Trykk at={[POOLS.ost.lon - 8, POOLS.ost.lat - 4]} kind={pos ? "H" : "L"} scale={scale} />
          {/* jetstrømlinja og L-merkene fra Mats' skisse */}
          <path d={JET_IOD} fill="none" stroke="#0b1318" strokeOpacity={0.55} strokeWidth={12} strokeLinecap="round" data-nocheck="" />
          <path
            d={JET_IOD}
            fill="none"
            stroke={JET}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={flow ? "30 10" : undefined}
            style={flow ? { animation: "model-ocean-flow 1.4s linear infinite" } : undefined}
          />
          {LAV_JET[fase].map((p) => (
            <Trykk key={p[0]} at={p} kind="L" scale={scale} size={26} color={MATS_RED} />
          ))}
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * Figur 3: havtemperatur med Mats' grense
 * ===================================================================== */

const SST_COLORS = [
  "#2c3e8f",
  "#2f63b3",
  "#2e8bc2",
  "#3cb1bf",
  "#5ec79a",
  "#a7d86b",
  "#e6e26a",
  "#f5ae4d",
  "#ec7a3c",
  "#d6463b",
  "#a3265c",
];
const HT_VB = (() => {
  const top = xy(20, 32)[1];
  const bot = xy(20, -58)[1];
  return `0 ${r1(top)} 960 ${r1(bot - top)}`;
})();
/** Grensesonen: to linjer om lag 3° nord og sør for den skarpeste temperaturendringen. */
const FRONT_N = line(FRONT.map(([x, y]) => [x, y - 3 * (960 / 130)] as const));
const FRONT_S = line(FRONT.map(([x, y]) => [x, y + 3 * (960 / 130)] as const));
const FRONT_MID = line(FRONT);

function Fargeskala() {
  return (
    <span className="flex flex-wrap items-center gap-x-0 gap-y-1 text-[13px] text-foreground" aria-label="Fargeskala for havtemperatur i grader celsius">
      <span className="mr-2">Havtemperatur (°C)</span>
      {SST_COLORS.map((c, i) => (
        <span key={c} className="inline-flex flex-col items-start">
          <span className="block h-3 w-7 sm:w-9" style={{ background: c }} aria-hidden="true" />
          <span className="text-[12px] leading-tight text-muted-foreground">{i === 0 ? "" : SST_LEVELS[i]}</span>
        </span>
      ))}
    </span>
  );
}

export function IodHavtemperaturFigur({ heading, caption }: { heading: string; caption: ReactNode }) {
  const gr = FRONT[Math.round(FRONT.length * 0.55)];
  const jetA = FRONT[Math.round(FRONT.length * 0.3)];
  const labels: Lab[] = [
    { text: "Grense", x: gr[0], y: gr[1] - 34, at: [gr[0], gr[1] - 3 * (960 / 130)], color: "#ffffff", anchor: "middle", weight: 700, size: 18, halo: "#0b1318", badge: [gr[0], gr[1] - 46] },
    { text: "Jetstrøm (figur 4)", x: jetA[0], y: jetA[1] + 58, at: [jetA[0], jetA[1] + 4], color: JET, anchor: "middle", weight: 700, badge: [jetA[0] + 30, jetA[1] + 50] },
    { text: "Varmt vann i nord", x: xy(75, -12)[0], y: xy(75, -12)[1], color: "#ffffff", anchor: "middle", halo: "#0b1318", badge: [xy(75, -12)[0], xy(75, -12)[1]] },
    { text: "Kaldt vann lenger sør", x: xy(85, -54)[0], y: xy(85, -54)[1], color: "#ffffff", anchor: "middle", halo: "#0b1318", badge: [xy(85, -54)[0], xy(85, -54)[1]] },
  ];
  return (
    <IsbreFigur
      title="Kart over havtemperaturen i Det indiske hav med varmt vann i nord og en skarp grense mot kaldt vann i sør"
      heading={heading}
      caption={caption}
      labels={labels}
      notes={["Data: NOAA NCEI, OISST v2.1 (24. september 2026). Kyster: Natural Earth."]}
      remark={<Fargeskala />}
      viewBox={HT_VB}
    >
      {({ scale }) => (
        <g data-figur="iod-havtemperatur">
          <rect x={0} y={0} width={960} height={738} fill="#2c3e8f" data-nocheck="" />
          <g data-nocheck="">
            {SST_BANDS.map((d, i) => (
              <path key={SST_COLORS[i]} d={d} fill={SST_COLORS[i]} />
            ))}
          </g>
          <Land fill="#9aa19a" edge="#4b5350" />
          <Gradnett scale={scale} />
          {/* Mats' grense: to svarte linjer rundt sonen der temperaturen endrer seg raskest */}
          {[FRONT_N, FRONT_S].map((d) => (
            <g key={d.slice(0, 12)}>
              <path d={d} fill="none" stroke="#ffffff" strokeOpacity={0.5} strokeWidth={7} strokeLinecap="round" data-nocheck="" />
              <path d={d} fill="none" stroke="#0b0b0b" strokeWidth={4} strokeLinecap="round" />
            </g>
          ))}
          {/* Mats' grønne jetstrømlinje langs grensen */}
          <path d={FRONT_MID} fill="none" stroke="#0b1318" strokeOpacity={0.5} strokeWidth={9} strokeLinecap="round" data-nocheck="" />
          <path d={FRONT_MID} fill="none" stroke={JET} strokeWidth={4.5} strokeLinecap="round" />
        </g>
      )}
    </IsbreFigur>
  );
}

/* =====================================================================
 * Figur 4: jetstrømmer over Det indiske hav
 * ===================================================================== */

/** Nordlig belte rundt 30° N (skjematisk). */
const JET_N = geoCurve([
  [20, 25],
  [35, 28],
  [50, 31],
  [65, 29],
  [80, 31],
  [95, 30],
  [110, 32],
  [125, 33],
  [140, 35],
  [150, 36],
]);
/** Sørlig belte over grensen i figur 3. */
const JET_S = line(FRONT);
/** Mats' røde ring rundt det sørlige beltet. */
const RING_S = (() => {
  const k = 960 / 130;
  const top = FRONT.map(([x, y]) => [x, y - 4.5 * k] as const);
  const bot = [...FRONT].reverse().map(([x, y]) => [x, y + 4.5 * k] as const);
  return `${line([...top, ...bot])} Z`;
})();

function Belte({ d, flow, w = 34 }: { d: string; flow: boolean; w?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="#f0d36a" strokeOpacity={0.35} strokeWidth={w} strokeLinecap="round" data-nocheck="" />
      <path d={d} fill="none" stroke="#f08a6a" strokeOpacity={0.55} strokeWidth={w * 0.5} strokeLinecap="round" data-nocheck="" />
      <path
        d={d}
        fill="none"
        stroke="#fff3df"
        strokeWidth={2.4}
        strokeDasharray="22 18"
        strokeLinecap="round"
        style={flow ? { animation: "model-ocean-flow 1.1s linear infinite" } : undefined}
      />
    </g>
  );
}

const JET_VB = (() => {
  const top = xy(20, 42)[1];
  const bot = xy(20, -58)[1];
  return `0 ${r1(top)} 960 ${r1(bot - top)}`;
})();
const RING_TOP = Math.min(...FRONT.map(([, y]) => y)) - 4.5 * (960 / 130);

export function IodJetstrommerFigur({ heading, caption }: { heading: string; caption: ReactNode }) {
  const motion = useAnimationPlaying();
  const n = xy(70, 30);
  const s = FRONT[Math.round(FRONT.length * 0.45)];
  const arrowTip = xy(24, -50.5);
  const labels: Lab[] = [
    { text: "Jetstrømbelte rundt 30° N", x: n[0], y: n[1] + 62, at: [n[0], n[1] + 16], color: "#ffe2a8", anchor: "middle", weight: 700, badge: [n[0], n[1] + 40] },
    { text: "Jetstrømbelte sør for Afrika og Australia, over grensen i figur 3", x: s[0] + 30, y: RING_TOP - 22, at: [s[0] + 30, s[1] - 4.5 * (960 / 130)], color: "#ffe2a8", anchor: "middle", weight: 700, badge: [s[0] + 30, RING_TOP - 20] },
    { text: "Beltet IOD kan påvirke", x: arrowTip[0] + 30, y: arrowTip[1] + 34, at: [arrowTip[0] + 6, arrowTip[1] + 8], color: MATS_RED, anchor: "start", badge: [arrowTip[0] + 26, arrowTip[1] + 34] },
  ];
  const keys: Key[] = [
    { text: "Sterk vind høyt oppe (jetstrøm)", color: "#f08a6a", kind: "line" },
    { text: "Vestavindsbelte som IOD kan påvirke", color: MATS_RED, kind: "dash" },
  ];
  return (
    <IsbreFigur
      title="Kart med to bånd av sterk vind høyt oppe, ett rundt 30 grader nord og ett sør for Afrika og Australia"
      heading={heading}
      caption={caption}
      playing={motion.playing}
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      labels={labels}
      keys={keys}
      notes={["Skjematisk, vinden høyt oppe", "Kyster: Natural Earth"]}
      viewBox={JET_VB}
    >
      {({ scale }) => (
        <g className={motion.motionClass} data-figur="iod-jetstrommer">
          <rect x={0} y={0} width={960} height={738} fill="#141a1f" data-nocheck="" />
          <Land fill="#1f282e" edge="#9aa7b0" />
          <Gradnett scale={scale} />
          <Belte d={JET_N} flow={motion.playing} />
          <Belte d={JET_S} flow={motion.playing} w={40} />
          <path d={RING_S} fill="none" stroke={MATS_RED} strokeWidth={2.6} strokeLinejoin="round" />
          <path
            d={`M${arrowTip[0] - 10} ${arrowTip[1] + 70} Q${arrowTip[0] - 22} ${arrowTip[1] + 30} ${arrowTip[0]} ${arrowTip[1]}`}
            fill="none"
            stroke={MATS_RED}
            strokeWidth={2.6}
          />
          <path
            d={`M${arrowTip[0]} ${arrowTip[1]} l-11 6 l3 -12 Z`}
            fill={MATS_RED}
            stroke={MATS_RED}
            strokeWidth={1}
            strokeLinejoin="round"
          />
        </g>
      )}
    </IsbreFigur>
  );
}
