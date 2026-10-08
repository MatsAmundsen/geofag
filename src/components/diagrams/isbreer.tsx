/**
 * Figurene i Geofag 1: Isbreer og landformer.
 *
 * Kanoniske komponenter (kan gjenbrukes på andre sider, f.eks. Landformer og Norges geologi):
 *   BreLengdesnitt, VdalTilUdal, BotnEggTind, Avsetningsformer, Frostsprengning, IsostasiSnitt.
 * `…Diagram`-variantene er de som kapitlet bruker, med kapitlets egne bildetekster.
 *
 * Alle tall og påstander i figurene kommer fra kapitteltekstene (src/lib/posts/isbreer-og-landformer.md).
 * Figurene er skjematiske: høyder og tykkelser er overdrevet, og det står i figuren.
 */
import { useMemo, useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, Polys, Skyver, StegVelger, type Lab } from "./isbre-figur";
import {
  P,
  clamp,
  heightfield,
  hexToRgb,
  lerp,
  obliqueProj,
  pts,
  smooth,
  smoothPath,
  useInView,
  useStepClock,
  useTicker,
} from "./isbre-kit";

export type IsbreFigurProps = {
  /** Overskrift over figuren. */
  heading?: string;
  /** Bildetekst under figuren. */
  caption?: ReactNode;
  /** Steg som vises først (1-basert). */
  initialStep?: number;
};

const ICE_FLOW = "#2f5f80";

/* =====================================================================
 * 1. Breen i lengdesnitt
 * ===================================================================== */

const breBed = (x: number) => 405 - 285 * Math.pow(1 - x / 960, 1.5) + 5 * Math.sin(x / 47);
const BRE_X0 = 64;

function breWord(b: number) {
  if (b > 0.15) return "fram";
  if (b < -0.15) return "tilbake";
  return "står";
}

export function BreLengdesnitt({ heading = "Breen i lengdesnitt", caption }: IsbreFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const t = useTicker(motion.playing && visible);
  const [b, setB] = useState(0);
  const xf = 600 + 190 * b;
  const ela = 330 + 70 * b;
  const Hm = 50 + 0.07 * (xf - BRE_X0);
  const H = (x: number) =>
    Hm * Math.pow(clamp((xf - x) / (xf - BRE_X0)), 0.5) * smooth((x - BRE_X0) / 45);
  const surf = (x: number) => breBed(x) - H(x);
  const xs: number[] = [];
  for (let x = BRE_X0; x < xf; x += 6) xs.push(x);
  xs.push(xf);
  const icePath = `M${xs.map((x) => `${x.toFixed(1)} ${surf(x).toFixed(1)}`).join(" L")} L${[...xs]
    .reverse()
    .map((x) => `${x.toFixed(1)} ${breBed(x).toFixed(1)}`)
    .join(" L")} Z`;
  const snowEnd = Math.min(ela + 34, xf - 20);
  const snowXs = xs.filter((x) => x <= snowEnd);
  const snowT = (x: number) => 11 * (1 - smooth((x - ela + 6) / 40));
  const snowPath = `M${snowXs.map((x) => `${x.toFixed(1)} ${(surf(x) - 2).toFixed(1)}`).join(" L")} L${[
    ...snowXs,
  ]
    .reverse()
    .map((x) => `${x.toFixed(1)} ${(surf(x) + snowT(x)).toFixed(1)}`)
    .join(" L")} Z`;
  const layers = [0.28, 0.52, 0.76].map((f) =>
    smoothPath(
      xs
        .filter((x) => x > BRE_X0 + 12 && x < xf - 24)
        .map((x) => [x, breBed(x) - H(x) * f] as [number, number]),
    ),
  );
  const crevasses: number[] = [];
  const xp = ela + (xf - ela) * 0.3;
  for (let x = xp + 44; x < xf - 34; x += 30) crevasses.push(x);
  const terrain: [number, number][] = [
    [0, 470],
    [0, 96],
    [14, 70],
    [32, 46],
    [48, 70],
    [60, breBed(60)],
  ];
  for (let x = 70; x <= 960; x += 10) terrain.push([x, breBed(x)]);
  terrain.push([960, 470]);
  const mor = Array.from({ length: 14 }, (_, i) => xf - 6 + (52 * i) / 13);
  const moraine = `M${xf - 8} ${breBed(xf - 8)} ${mor
    .map(
      (x) =>
        `L${x.toFixed(1)} ${(breBed(x) - 15 * Math.sin((Math.PI * (x - xf + 6)) / 52)).toFixed(1)}`,
    )
    .join(" ")} L${xf + 48} ${breBed(xf + 48)} Z`;
  const riverD = smoothPath(
    Array.from({ length: 12 }, (_, i) => {
      const x = xf + 46 + ((960 - xf - 46) * i) / 11;
      return [x, breBed(x) - 2] as [number, number];
    }),
  );
  const slope = Math.atan2(breBed(xp + 2) - breBed(xp - 2), 4);
  const prof = [0.06, 0.36, 0.66, 0.94].map((f) => {
    const len = 14 + 32 * (1 - Math.pow(1 - f, 3));
    const y0 = breBed(xp) - H(xp) * f;
    return { f, y0, x1: xp + len * Math.cos(slope), y1: y0 + len * Math.sin(slope) };
  });
  const particles: { x: number; y: number; o: number }[] = [];
  [0.14, 0.46, 0.8].forEach((f, li) => {
    const v = 16 + 34 * (1 - Math.pow(1 - f, 3));
    const len = xf - BRE_X0 - 70;
    for (let k = 0; k < 5; k++) {
      const s = ((((k + li * 0.37) / 5 + (t * v) / len) % 1) + 1) % 1;
      const x = BRE_X0 + 40 + s * len;
      particles.push({ x, y: breBed(x) - H(x) * f, o: Math.min(1, s * 6, (1 - s) * 6) });
    }
  });
  const flakes = Array.from({ length: 9 }, (_, i) => {
    const x = BRE_X0 + 30 + ((ela - BRE_X0 - 40) * i) / 8 + 8 * Math.sin(i * 2.3);
    const top = 30 + 14 * ((i * 7) % 3);
    const y = top + ((t * 26 + i * 23) % Math.max(20, surf(x) - top - 12));
    return { x, y };
  });
  const word = breWord(b);
  const midAcc = (BRE_X0 + ela) / 2;
  const bedLab = (BRE_X0 + xf) / 2 + 40;
  const labels: Lab[] = [
    {
      text: "Næringsområde",
      x: midAcc,
      y: surf(midAcc) - 62,
      color: C.cold,
      anchor: "middle",
      size: 18,
      badge: [midAcc + 16, surf(midAcc) - 46],
    },
    {
      text: "Tæringsområde",
      x: (xp + xf) / 2 + 70,
      y: surf((xp + xf) / 2) - 95,
      color: C.warm,
      anchor: "middle",
      size: 18,
      badge: [(xp + xf) / 2 + 50, surf((xp + xf) / 2) - 50],
    },
    {
      text: "Likevektslinje",
      x: ela - 8,
      y: surf(ela) - 50,
      color: C.warm,
      anchor: "end",
      badge: [ela, surf(ela) - 64],
    },
    {
      text: "Snø og firn blir presset sammen til is",
      x: 24,
      y: 300,
      at: [BRE_X0 + 80, surf(BRE_X0 + 80) + 5],
      color: C.fg,
      badge: [BRE_X0 + 44, surf(BRE_X0 + 44) + 16],
    },
    ...(crevasses.length
      ? [
          {
            text: "Sprekker",
            x: crevasses[0] - 14,
            y: surf(crevasses[0]) - 22,
            at: [crevasses[0], surf(crevasses[0]) + 6] as [number, number],
            color: C.fg,
            anchor: "end" as const,
            badge: [crevasses[0] + 4, surf(crevasses[0]) - 24] as [number, number],
          },
        ]
      : []),
    {
      text: "Isen siger (deformeres)",
      x: xp - 30,
      y: surf(xp) - 40,
      at: [prof[3].x1, prof[3].y1 - 2],
      color: C.fg,
      anchor: "middle",
      badge: [xp - 20, surf(xp) - 30],
    },
    {
      text: "Glir på underlaget",
      x: prof[0].x1 + 20,
      y: prof[0].y1 + 38,
      at: [prof[0].x1, prof[0].y1],
      color: C.fg,
      badge: [prof[0].x1 + 14, prof[0].y1 + 30],
    },
    {
      text: "Stein i bresålen",
      x: bedLab,
      y: breBed(bedLab) + 30,
      at: [bedLab, breBed(bedLab) - 4],
      color: C.sand,
      anchor: "middle",
      badge: [bedLab, breBed(bedLab) + 26],
    },
    {
      text: `Isfronten ${word === "står" ? "står" : word === "fram" ? "rykker fram" : "trekker seg tilbake"}`,
      x: xf > 650 ? xf - 20 : xf + 30,
      y: breBed(xf) - (xf > 650 ? 84 : 70),
      at: [xf - 4, breBed(xf) - 6],
      color: C.fg,
      anchor: xf > 650 ? "end" : "start",
      badge: [xf - 8, breBed(xf) - 46],
    },
    {
      text: "Endemorene",
      x: xf + 22,
      y: breBed(xf + 22) + 34,
      at: [xf + 22, breBed(xf + 22) - 8],
      color: C.sand,
      anchor: "middle",
      badge: [xf + 26, breBed(xf + 22) + 30],
    },
    {
      text: "Smeltevann",
      x: Math.min(905, xf + 150),
      y: breBed(Math.min(905, xf + 150)) - 16,
      color: C.rain,
      anchor: "middle",
      badge: [Math.min(910, xf + 140), breBed(Math.min(910, xf + 140)) - 22],
    },
    { text: "Berg", x: 70, y: 440, color: C.muted, size: 17 },
  ];
  const status =
    word === "fram"
      ? "Det kommer til mer enn det smelter: breen vokser, og isfronten kan rykke fram."
      : word === "tilbake"
        ? "Det smelter mer enn det kommer til: isfronten trekker seg tilbake."
        : "Det kommer til omtrent like mye som det smelter: isfronten står omtrent stille.";
  return (
    <IsbreFigur
      svgRef={ref}
      title="Lengdesnitt av en isbre: næringsområde og tæringsområde, likevektslinje, sprekker, isbevegelse og isfront med endemorene og smeltevann"
      heading={heading}
      caption={
        caption ??
        "Isen hoper seg opp i næringsområdet, siger nedover og smelter i tæringsområdet. Der isfronten står, går isen over til smeltevann."
      }
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <Skyver
          label="Massebalanse"
          min={-1}
          max={1}
          step={0.1}
          value={b}
          onChange={setB}
          ends={["mer smelting", "mer snø"]}
          valueLabel={b > 0.15 ? "positiv" : b < -0.15 ? "negativ" : "i balanse"}
        />
      }
      status={status}
      labels={labels}
      notes={["Lengdesnitt, skjematisk", "Isen er tegnet tykkere enn i virkeligheten"]}
      viewBox="0 0 960 470"
    >
      {({ d, m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="bre-lengdesnitt"
        >
          <rect width="960" height="470" fill={d.url.sky} rx="10" />
          <path
            d="M0 210 L70 150 L140 186 L230 120 L330 176 L430 146 L540 204 L650 172 L760 232 L860 206 L960 236 L960 470 L0 470 Z"
            fill="#1c2a32"
          />
          <path
            d="M218 132 L230 120 L244 132 L236 130 L230 136 Z M420 156 L430 146 L442 156 L432 154 Z"
            fill="#c9d7df"
            opacity="0.5"
          />
          <path d={`M${pts(terrain)} Z`} fill={d.url.rock} />
          <path d={`M${pts(terrain)} Z`} fill={d.url.strata} />
          <path
            d={smoothPath(terrain.slice(1, -1))}
            fill="none"
            stroke="#9aa292"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path d={moraine} fill={d.url.moraine} stroke="#5d5040" strokeWidth="1" />
          <path d={riverD} fill="none" stroke={P.water} strokeWidth="6" strokeLinecap="round" />
          <path
            d={riverD}
            fill="none"
            stroke="#9fd0e8"
            strokeWidth="2"
            strokeDasharray="12 14"
            strokeDashoffset={-t * 40}
            strokeLinecap="round"
          />
          <path d={icePath} fill={d.url.ice} />
          <path d={icePath} fill={d.url.iceBands} />
          {layers.map((p, i) => (
            <path
              key={i}
              d={p}
              fill="none"
              stroke={P.iceLine}
              strokeWidth="1.3"
              strokeDasharray={i === 1 ? "none" : "10 6"}
              opacity="0.7"
            />
          ))}
          {xs
            .filter((x, i) => i % 3 === 0 && x > BRE_X0 + 40 && x < xf - 8)
            .map((x, i) => (
              <ellipse
                key={x}
                cx={x}
                cy={breBed(x) - 3.5}
                rx={2.2 + 1.8 * Math.abs(Math.sin(i * 1.7))}
                ry={1.8 + 1.2 * Math.abs(Math.cos(i * 2.1))}
                fill="#5c5446"
              />
            ))}
          <path d={snowPath} fill={d.url.firn} />
          <path d={snowPath} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
          <path d={`M${BRE_X0 + 18} ${surf(BRE_X0 + 18) - 1} l4 16 l5 -15 Z`} fill={P.crevasse} />
          {crevasses.map((x) => {
            const dd = 9 + H(x) * 0.13;
            return (
              <path
                key={x}
                d={`M${x - 5} ${surf(x - 5) - 0.5} L${x + 1} ${surf(x) + dd} L${x + 5} ${surf(x + 5) - 0.5} Z`}
                fill={P.crevasse}
              />
            );
          })}
          <path d={icePath} fill="none" stroke="#f3f8fb" strokeWidth="1.4" opacity="0.8" />
          <line
            x1={ela}
            y1={surf(ela) - 44}
            x2={ela}
            y2={breBed(ela)}
            stroke={C.warm}
            strokeWidth="2"
            strokeDasharray="7 6"
          />
          <line
            x1={xp}
            y1={breBed(xp)}
            x2={xp}
            y2={surf(xp)}
            stroke={ICE_FLOW}
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          {prof.map((p) => (
            <path
              key={p.f}
              d={`M${xp} ${p.y0} L${p.x1} ${p.y1}`}
              stroke={ICE_FLOW}
              strokeWidth="3"
              fill="none"
              markerEnd={`url(#${m.ice})`}
            />
          ))}
          {particles.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.4" fill={ICE_FLOW} opacity={0.85 * p.o} />
          ))}
          {flakes.map((f, i) => (
            <path
              key={i}
              d={`M${f.x - 4} ${f.y} H${f.x + 4} M${f.x} ${f.y - 4} V${f.y + 4} M${f.x - 3} ${f.y - 3} L${f.x + 3} ${f.y + 3} M${f.x + 3} ${f.y - 3} L${f.x - 3} ${f.y + 3}`}
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.8"
            />
          ))}
          {word !== "står" ? (
            <path
              d={
                word === "fram"
                  ? `M${xf - 26} ${breBed(xf) - 56} h46`
                  : `M${xf + 20} ${breBed(xf) - 56} h-46`
              }
              stroke={C.fg}
              strokeWidth="3"
              fill="none"
              markerEnd={`url(#${m.fg})`}
            />
          ) : null}
        </g>
      )}
    </IsbreFigur>
  );
}

export const BreLengdesnittDiagram = () => (
  <BreLengdesnitt caption="Isen hoper seg opp i næringsområdet, siger nedover og smelter i tæringsområdet. Der isfronten står, går isen over til smeltevann. Skyveren endrer massebalansen og flytter isfronten fram eller tilbake." />
);

/* =====================================================================
 * 2. Fra V-dal til U-dal og fjord (kanonisk: VdalTilUdal)
 * ===================================================================== */

const VU_XC = 480;
const VU_SEA = 340;
const vProfile = (dx: number) => 330 - dx * 0.62;
const uProfile = (dx: number) => 440 - 320 * Math.pow(dx / 340, 3.5);
function vuShoulder(x: number) {
  return (
    120 -
    62 * Math.exp(-(((x - 52) / 44) ** 2)) -
    36 * Math.exp(-(((x - 918) / 38) ** 2)) -
    3 * Math.sin(x / 9) * Math.exp(-(((x - 52) / 60) ** 2))
  );
}
/** Høyden (y) på bakken i tverrsnittet. p = 0 er V-dal, p = 1 er U-dal. */
function vuGround(x: number, p: number, riverNotch = 0) {
  const dx = Math.abs(x - VU_XC);
  if (dx > 340) return vuShoulder(x);
  let y = lerp(vProfile(dx), uProfile(dx), p);
  if (riverNotch > 0 && dx < 16) y += riverNotch * 9 * (1 - dx / 16);
  return y;
}
const VU_E: [number, number] = [-62, -46];

function litShade(base: string, dx: number, dy: number, minF = 0.5) {
  const len = Math.hypot(dx, dy) || 1;
  const nx = dy / len;
  const ny = -dx / len;
  const lam = Math.max(0, nx * -0.55 + ny * -0.83);
  const rgb = hexToRgb(base);
  const f = minF + (1.15 - minF) * lam;
  return `rgb(${Math.round(Math.min(255, rgb[0] * f))},${Math.round(Math.min(255, rgb[1] * f))},${Math.round(Math.min(255, rgb[2] * f))})`;
}

/** Overflate som strekker seg bakover fra et tverrsnitt (enkel blokkdiagram-effekt). */
function Extruded({
  profile,
  color,
  e = VU_E,
  minF,
}: {
  profile: [number, number][];
  color: string;
  e?: [number, number];
  minF?: number;
}) {
  const quads: { d: string; fill: string }[] = [];
  for (let i = 0; i < profile.length - 1; i++) {
    const [x1, y1] = profile[i];
    const [x2, y2] = profile[i + 1];
    const q: [number, number][] = [
      [x1, y1],
      [x2, y2],
      [x2 + e[0], y2 + e[1]],
      [x1 + e[0], y1 + e[1]],
    ];
    let area = 0;
    for (let k = 0; k < 4; k++) area += q[k][0] * q[(k + 1) % 4][1] - q[(k + 1) % 4][0] * q[k][1];
    if (area >= 0) continue;
    quads.push({ d: `M${pts(q)}Z`, fill: litShade(color, x2 - x1, y2 - y1, minF) });
  }
  return (
    <g>
      {quads.map((q, i) => (
        <path
          key={i}
          d={q.d}
          fill={q.fill}
          stroke={q.fill}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

const VU_STEPS = ["1 V-dal", "2 Isen graver", "3 U-dal", "4 Fjord"];
const VU_STATUS = [
  "Før istidene rant elvene i V-formede daler.",
  "Innlandsisen følger dalen og skurer og plukker mest der isen er tykkest og tyngst.",
  "Dalen har fått bratte sider og bred bunn: en U-dal. Sidedalen ble gravd mindre og henger igjen høyt oppe. Eksempel: Gudbrandsdalen.",
  "Der bunnen ligger under havnivå, fylles dalen med sjø: en fjord. Fjord og dal er samme landform med ulik vannstand. Eksempel: Sognefjorden.",
];

export function VdalTilUdal({
  heading = "Fra V-dal til U-dal og fjord",
  caption,
  initialStep,
}: IsbreFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const clock = useStepClock(4, motion.playing && visible, 3200, 1400, initialStep);
  const { step, phase } = clock;
  const p = step === 1 ? 0 : step === 2 ? smooth((phase - 0.22) / 0.78) : 1;
  const iceLevel = step === 2 ? smooth(phase / 0.25) : step === 3 ? 1 - smooth(phase / 0.3) : 0;
  const notch = step >= 3 ? 1 : 0;
  const k4 = step === 4 ? smooth(phase / 0.35) : 0;
  const seaK = step === 4 ? smooth((phase - 0.2) / 0.6) : 0;
  const s = lerp(1, 0.56, k4);
  const tx = lerp(0, 6, k4);
  const ty = lerp(0, 150, k4);
  const T = (x: number, y: number): [number, number] => [tx + s * x, ty + s * y];

  const xs: number[] = [];
  for (let x = 0; x <= 960; x += 8) xs.push(x);
  [VU_XC - 16, VU_XC, VU_XC + 16].forEach((x) => xs.push(x));
  xs.sort((a, b) => a - b);
  const ground: [number, number][] = xs.map((x) => [x, vuGround(x, p, notch)]);
  const front = `M0 520 L${pts(ground)} L960 520 Z`;
  const oldV = smoothPath(
    Array.from({ length: 2 }, (_, i) => [VU_XC - 339 + i * 339, i ? 330 : 120] as [number, number]),
  );
  const iceTopY = (x: number) => lerp(330, 96 + 0.00006 * (x - VU_XC) ** 2, iceLevel);
  const iceTop: [number, number][] = xs.map((x) => [
    x,
    Math.min(iceTopY(x), vuGround(x, p, notch)),
  ]);
  const icePoly = `M${pts(iceTop)} L${pts([...ground].reverse())} Z`;
  const seaY = lerp(445, VU_SEA, seaK);
  const wet = xs.filter((x) => vuGround(x, 1, 1) > seaY);
  const wa = wet.length ? wet[0] - 8 : VU_XC;
  const wb = wet.length ? wet[wet.length - 1] + 8 : VU_XC;
  const waterXs = xs.filter((x) => x >= wa && x <= wb);
  const water = `M${wa} ${seaY} ${waterXs.map((x) => `L${x} ${Math.max(seaY, vuGround(x, 1, 1))}`).join(" ")} L${wb} ${seaY} Z`;
  // hengende sidedal
  // sidedalen ble gravd mindre enn hoveddalen og henger igjen høyt oppe (vises fra steg 3)
  const sideY = 190;
  let mouth = VU_XC + 250;
  for (let x = VU_XC + 200; x < VU_XC + 340; x += 1) {
    if (vuGround(x, p) <= sideY) {
      mouth = x;
      break;
    }
  }
  const sideEnd = 880;
  const floorY = (x: number) => lerp(sideY, 160, clamp((x - mouth) / (sideEnd - mouth)));
  const DD = (x: number, y: number, k: number): [number, number] => [
    x + VU_E[0] * k,
    y + VU_E[1] * k,
  ];
  const fx = xs.filter((x) => x > mouth && x <= sideEnd);
  fx.unshift(mouth);
  const slotFloor: [number, number][] = [
    ...fx.map((x) => DD(x, floorY(x), 0.3)),
    ...[...fx].reverse().map((x) => DD(x, floorY(x), 0.7)),
  ];
  const slotWall: [number, number][] = [
    ...fx.map((x) => DD(x, floorY(x), 0.7)),
    ...[...fx].reverse().map((x) => DD(x, Math.min(floorY(x), vuGround(x, p)), 0.7)),
  ];
  const nearStrip = ground.filter(([x]) => x >= mouth - 10);
  const flowMarks =
    iceLevel > 0.6
      ? [
          [VU_XC, 300, 15],
          [VU_XC - 120, 230, 12],
          [VU_XC + 120, 230, 12],
          [VU_XC, 190, 12],
          [VU_XC - 230, 160, 9],
          [VU_XC + 230, 160, 9],
        ]
      : [];
  const erosion =
    step === 2 && iceLevel > 0.9
      ? [-150, -80, 0, 80, 150].map((dx) => {
          const x = VU_XC + dx;
          const y = vuGround(x, p);
          const len = 26 - Math.abs(dx) * 0.08;
          const ang = Math.atan2(vuGround(x + 2, p) - vuGround(x - 2, p), 4) + Math.PI / 2;
          return { x, y, x2: x + Math.cos(ang) * len, y2: y + Math.sin(ang) * len };
        })
      : [];

  // lengdesnitt langs fjorden (steg 4)
  const lsBottom: [number, number][] = [
    [566, 150],
    [588, 196],
    [606, 232],
    [632, 300],
    [664, 372],
    [706, 404],
    [752, 410],
    [792, 392],
    [826, 344],
    [852, 294],
    [870, 270],
    [888, 276],
    [906, 300],
    [930, 312],
    [954, 316],
  ];
  const lsSea = 230;
  const lsWaterXs = lsBottom.filter(([, y]) => y > lsSea);
  const lsWater = `M${lsWaterXs[0][0] - 10} ${lsSea} ${lsWaterXs.map(([x, y]) => `L${x} ${y}`).join(" ")} L954 ${lsSea} Z`;

  const labels: Lab[] = [];
  const add = (l: Lab) => labels.push(l);
  if (step === 1) {
    add({
      text: "V-dal",
      x: T(VU_XC - 120, 0)[0],
      y: T(0, 210)[1],
      size: 20,
      color: C.fg,
      at: T(VU_XC - 80, 280),
      badge: T(VU_XC - 120, 205),
    });
    add({
      text: "Elv i dalbunnen",
      x: T(VU_XC + 60, 0)[0],
      y: T(0, 372)[1],
      at: T(VU_XC + 4, 330),
      color: C.rain,
      badge: T(VU_XC + 40, 372),
    });
  }
  if (step === 2) {
    add({
      text: "Innlandsis",
      x: T(VU_XC - 300, 0)[0],
      y: T(0, 82)[1],
      color: C.cold,
      size: 19,
      badge: T(VU_XC - 300, 120),
    });
    add({
      text: "Isen beveger seg langs dalen (inn i bildet)",
      x: T(VU_XC - 10, 0)[0],
      y: T(0, 54)[1],
      at: T(VU_XC, 187),
      color: C.fg,
      anchor: "middle",
      badge: T(VU_XC + 46, 176),
    });
    add({
      text: "Skurer og plukker mest der isen er tykkest",
      x: T(VU_XC, 0)[0],
      y: T(0, 498)[1],
      at: T(VU_XC, vuGround(VU_XC, p) + 10),
      color: C.warm,
      anchor: "middle",
      badge: T(VU_XC + 60, 476),
    });
  }
  if (step >= 3) {
    add({
      text: step === 4 ? "Fjord: U-dal under havnivå" : "U-dal: bratte sider og bred bunn",
      x: T(VU_XC, 0)[0],
      y: T(0, step === 4 ? 302 : 290)[1],
      color: C.fg,
      size: step === 4 ? 17 : 19,
      anchor: "middle",
      badge: step === 4 ? T(VU_XC + 90, 300) : T(VU_XC - 60, 290),
    });
    add({
      text: "Gammel V-dal (stiplet)",
      x: T(VU_XC - 160, 0)[0] - (step === 4 ? 16 : 0),
      y: T(0, 190)[1],
      at: T(VU_XC - 140, 243),
      color: C.warm,
      anchor: "end",
      badge: step === 4 ? T(VU_XC - 200, 200) : T(VU_XC - 120, 260),
    });
    add({
      text: "Hengende sidedal",
      x: T(mouth + 20, 0)[0],
      y: T(0, sideY - 70)[1],
      at: T(mouth + VU_E[0] * 0.5, sideY + VU_E[1] * 0.5),
      color: C.sand,
      badge: T(mouth + 34, sideY - 46),
    });
    if (step === 3)
      add({
        text: "Liten V-form fra elva i bunnen",
        x: T(VU_XC + 40, 0)[0],
        y: T(0, 492)[1],
        at: T(VU_XC + 4, 446),
        color: C.rain,
        badge: T(VU_XC + 60, 482),
      });
  }
  if (step === 4 && k4 > 0.6) {
    add({
      text: "Havnivå",
      x: T(18, 0)[0],
      y: T(0, VU_SEA - 8)[1],
      color: C.rain,
      badge: T(40, VU_SEA),
    });
    add({
      text: "Lengdesnitt langs fjorden",
      x: 760,
      y: 82,
      color: C.fg,
      anchor: "middle",
      size: 17,
      badge: [760, 90],
    });
    add({ text: "Innerst", x: 572, y: 118, color: C.muted, badge: [586, 112] });
    add({ text: "Havet", x: 948, y: 118, color: C.muted, anchor: "end", badge: [932, 112] });
    add({
      text: "Overfordypning",
      x: 730,
      y: 462,
      at: [730, 400],
      color: C.warm,
      anchor: "middle",
      badge: [730, 446],
    });
    add({
      text: "Terskel",
      x: 878,
      y: 254,
      at: [870, 272],
      color: C.warm,
      anchor: "middle",
      badge: [872, 244],
    });
    add({
      text: "Her ligger tverrsnittet til venstre",
      x: 714,
      y: 206,
      at: [714, 230],
      color: C.fg,
      anchor: "middle",
      badge: [690, 200],
    });
  }
  return (
    <IsbreFigur
      svgRef={ref}
      title="En V-dal blir gravd ut av isen til en U-dal med hengende sidedal. Der bunnen ligger under havnivå, blir dalen en fjord med terskel og overfordypning."
      heading={heading}
      caption={
        caption ??
        "En elvedal med V-form blir gravd ut av isen til en U-dal med bratte sider og bred bunn. Sidedalen blir liggende igjen som hengende sidedal. Der bunnen ligger under havnivå, blir dalen en fjord."
      }
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger
          labels={VU_STEPS}
          step={step}
          onStep={clock.setStep}
          label="Velg steg i dalutviklingen"
        />
      }
      status={VU_STATUS[step - 1]}
      labels={labels}
      notes={
        step === 4
          ? ["Skjematisk, ikke i målestokk"]
          : ["Tverrsnitt av dalen, skjematisk", "Ikke i målestokk"]
      }
      viewBox="0 0 960 520"
    >
      {({ d, m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="vdal-udal"
          data-step={step}
        >
          <rect width="960" height="520" fill={d.url.sky} rx="10" />
          <g transform={`translate(${tx} ${ty}) scale(${s})`}>
            <path
              d="M0 120 L120 60 L260 96 L380 40 L520 80 L640 30 L780 76 L900 44 L1000 70 L1120 50 L1120 420 L0 420 Z"
              fill="#1b2830"
              transform={`translate(${VU_E[0] * 1.6} ${VU_E[1] * 1.6})`}
            />
            <Extruded profile={ground} color="#7b8273" />
            {step >= 3 ? (
              <g>
                <path d={`M${pts(slotWall)}Z`} fill="#596155" />
                <path d={`M${pts(slotFloor)}Z`} fill="#9aa38f" />
                <Extruded profile={nearStrip} color="#7b8273" e={[VU_E[0] * 0.3, VU_E[1] * 0.3]} />
                <path
                  d={`M${pts([DD(mouth, sideY, 0.3), DD(mouth, sideY, 0.7)])}`}
                  stroke={C.sand}
                  strokeWidth="3"
                />
              </g>
            ) : null}
            {iceLevel > 0.02 ? (
              <Extruded
                profile={iceTop.filter(([x, y]) => y < vuGround(x, p, notch) - 1)}
                color="#e9f3f9"
                minF={0.75}
              />
            ) : null}
            {step >= 3 ? (
              <path
                d={`M${VU_XC} ${vuGround(VU_XC, 1, notch) - 2} l${VU_E[0]} ${VU_E[1]}`}
                stroke={P.water}
                strokeWidth="4"
                opacity={step === 4 ? 1 - seaK : 1}
              />
            ) : (
              <path
                d={`M${VU_XC} 329 l${VU_E[0]} ${VU_E[1]}`}
                stroke={P.water}
                strokeWidth="4"
                opacity={step === 1 ? 1 : 1 - iceLevel}
              />
            )}
            {seaK > 0 ? (
              <path
                d={`M${wa} ${seaY} L${wb} ${seaY} L${wb + VU_E[0]} ${seaY + VU_E[1]} L${wa + VU_E[0]} ${seaY + VU_E[1]} Z`}
                fill="#3d88ad"
                opacity="0.85"
              />
            ) : null}
            <path d={front} fill={d.url.rock} />
            <path d={front} fill={d.url.strata} />
            <path d={`M${pts(ground)}`} fill="none" stroke="#a3ab98" strokeWidth="1.6" />
            {step >= 3 ? (
              <path
                d={oldV + ` L${VU_XC + 339} 120`}
                fill="none"
                stroke={C.warm}
                strokeWidth="2.2"
                strokeDasharray="8 7"
              />
            ) : null}
            {step === 1 ? <ellipse cx={VU_XC} cy={327} rx={10} ry={3.5} fill={P.water} /> : null}
            {step === 3 ? (
              <path
                d={`M${VU_XC - 7} ${vuGround(VU_XC - 7, 1, 1)} Q${VU_XC} ${vuGround(VU_XC, 1, 1) + 2} ${VU_XC + 7} ${vuGround(VU_XC + 7, 1, 1)} Z`}
                fill={P.water}
              />
            ) : null}
            {iceLevel > 0.02 ? (
              <g opacity={Math.min(1, iceLevel * 1.5)}>
                <path d={icePoly} fill={d.url.ice} />
                <path d={icePoly} fill={d.url.iceBands} />
                <path d={`M${pts(iceTop)}`} fill="none" stroke="#ffffff" strokeWidth="1.5" />
                {flowMarks.map(([x, y, r]) => (
                  <g key={`${x}-${y}`}>
                    <circle cx={x} cy={y} r={r} fill="none" stroke={ICE_FLOW} strokeWidth="2.4" />
                    <path
                      d={`M${x - r * 0.62} ${y - r * 0.62} L${x + r * 0.62} ${y + r * 0.62} M${x + r * 0.62} ${y - r * 0.62} L${x - r * 0.62} ${y + r * 0.62}`}
                      stroke={ICE_FLOW}
                      strokeWidth="2.4"
                    />
                  </g>
                ))}
                {xs
                  .filter(
                    (x, i) =>
                      i % 2 === 0 && Math.abs(x - VU_XC) < 300 && iceTopY(x) < vuGround(x, p) - 20,
                  )
                  .map((x, i) => (
                    <ellipse
                      key={x}
                      cx={x}
                      cy={vuGround(x, p) - 4}
                      rx={2.5 + (i % 3)}
                      ry={2}
                      fill="#5c5446"
                    />
                  ))}
              </g>
            ) : null}
            {erosion.map((e) => (
              <path
                key={e.x}
                d={`M${e.x} ${e.y - 8} L${e.x2} ${e.y2}`}
                stroke={C.warm}
                strokeWidth="3.2"
                markerEnd={`url(#${m.warm})`}
              />
            ))}
            {seaK > 0 ? (
              <g>
                <path d={water} fill={d.url.water} opacity="0.92" />
                <line
                  x1={0}
                  y1={VU_SEA}
                  x2={960}
                  y2={VU_SEA}
                  stroke={C.rain}
                  strokeWidth="2"
                  strokeDasharray="9 7"
                  opacity={seaK}
                />
              </g>
            ) : null}
          </g>
          {k4 > 0 ? (
            <g opacity={k4}>
              <rect x="556" y="62" width="398" height="440" rx="10" fill="#0f1c24" stroke={C.dim} />
              <path d={`M566 500 L${pts(lsBottom)} L954 500 Z`} fill={d.url.rock} />
              <path d={`M566 500 L${pts(lsBottom)} L954 500 Z`} fill={d.url.strata} />
              <path d={lsWater} fill={d.url.water} opacity="0.92" />
              <line
                x1="566"
                y1={lsSea}
                x2="954"
                y2={lsSea}
                stroke={C.rain}
                strokeWidth="2"
                strokeDasharray="9 7"
              />
              <path d={`M${pts(lsBottom)}`} fill="none" stroke="#a3ab98" strokeWidth="1.6" />
              <line
                x1="714"
                y1="150"
                x2="714"
                y2="408"
                stroke={C.fg}
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
            </g>
          ) : null}
        </g>
      )}
    </IsbreFigur>
  );
}

export const VdalTilUdalDiagram = () => <VdalTilUdal />;

/* =====================================================================
 * 3. Botn, egg og tind (terrengmodell)
 * ===================================================================== */

const BT_W = 600;
const BT_D = 420;
const BT_SUMMIT: [number, number] = [300, 236];
type Cirque = { u: [number, number]; r: number };
const BT_CIRQUES: Cirque[] = [
  { u: [-0.62, -0.78], r: 92 },
  { u: [0.62, -0.78], r: 92 },
  { u: [-0.72, 0.69], r: 96 },
  { u: [0.74, 0.67], r: 96 },
];
const btBase = (x: number, y: number) =>
  22 +
  262 * Math.exp(-0.9 * (((x - BT_SUMMIT[0]) / 180) ** 2 + ((y - BT_SUMMIT[1]) / 150) ** 2)) +
  7 * Math.sin(x / 23) * Math.sin(y / 31) +
  4 * Math.sin((x + y) / 11);
function btMask(x: number, y: number, c: Cirque) {
  const cx = BT_SUMMIT[0] + c.u[0] * c.r;
  const cy = BT_SUMMIT[1] + c.u[1] * c.r;
  const rx = x - cx;
  const ry = y - cy;
  const a = rx * c.u[0] + ry * c.u[1];
  const b = -rx * c.u[1] + ry * c.u[0];
  const Ra = a < 0 ? 74 : 130;
  const e = Math.sqrt((a / Ra) ** 2 + (b / 70) ** 2);
  return { mask: 1 - smooth((e - 0.5) / 0.5), a, floor: btBase(cx, cy) * 0.5 - a * 0.12 };
}
function btHeight(x: number, y: number, amounts: number[]) {
  let h = btBase(x, y);
  for (let k = 0; k < BT_CIRQUES.length; k++) {
    if (amounts[k] <= 0) continue;
    const { mask, floor } = btMask(x, y, BT_CIRQUES[k]);
    if (mask <= 0) continue;
    const target = Math.min(h, floor + 0.1 * Math.max(0, h - floor));
    h = lerp(h, target, mask * amounts[k]);
  }
  return h;
}
const BT_PROJ = obliqueProj(28, 482, 1.08, 0.6, 0.5, 0.95);

const BT_STEPS = ["1 Botn", "2 Egg", "3 Tind"];
const BT_STATUS = [
  "En liten bre i en forsenkning skurer ut en skålform med bratt bakvegg: en botn.",
  "To breer sliper på hver sin side av fjellet. Mellom botnene blir det igjen en skarp rygg: en egg.",
  "Isen har gravd fra flere sider. Det står igjen en spiss topp som minner om en pyramide: en tind.",
];

export function BotnEggTind({
  heading = "Botn, egg og tind",
  caption,
  initialStep,
}: IsbreFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const clock = useStepClock(3, motion.playing && visible, 2600, 1800, initialStep);
  const { step } = clock;
  const q = Math.round(clock.phase * 8) / 8;
  const amounts = [
    step >= 2 ? 1 : q,
    step >= 3 ? 1 : step === 2 ? q : 0,
    step === 3 ? q : 0,
    step === 3 ? q : 0,
  ];
  const key = amounts.join(",");
  const polys = useMemo(() => {
    const am = key.split(",").map(Number);
    const rock = hexToRgb("#7d8476");
    const low = hexToRgb("#5f6f55");
    const snow = hexToRgb("#eef4f8");
    const ice = hexToRgb("#cfe4f1");
    return heightfield({
      nx: 76,
      ny: 54,
      W: BT_W,
      D: BT_D,
      h: (x, y) => btHeight(x, y, am),
      proj: BT_PROJ,
      colorAt: (x, y, z, slope) => {
        for (let k = 0; k < BT_CIRQUES.length; k++) {
          if (am[k] < 0.5) continue;
          const { mask } = btMask(x, y, BT_CIRQUES[k]);
          if (mask > 0.72 && slope < 0.75) return ice;
        }
        if (z > 215 && slope < 1.1) return snow;
        if (z < 60) return low;
        const t = clamp((z - 60) / 60);
        return [lerp(low[0], rock[0], t), lerp(low[1], rock[1], t), lerp(low[2], rock[2], t)];
      },
    });
  }, [key]);
  const am = amounts;
  const frontProfile: [number, number][] = [];
  const rightProfile: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const x = (BT_W * i) / 60;
    frontProfile.push(BT_PROJ(x, 0, btHeight(x, 0, am)));
    const y = (BT_D * i) / 60;
    rightProfile.push(BT_PROJ(BT_W, y, btHeight(BT_W, y, am)));
  }
  const base = -24;
  const frontFace = `M${pts(frontProfile)} L${pts([BT_PROJ(BT_W, 0, base), BT_PROJ(0, 0, base)])} Z`;
  const rightFace = `M${pts(rightProfile)} L${pts([BT_PROJ(BT_W, BT_D, base), BT_PROJ(BT_W, 0, base)])} Z`;
  const P3 = (x: number, y: number) => BT_PROJ(x, y, btHeight(x, y, am));
  const c1 = BT_CIRQUES[0];
  const c1c: [number, number] = [
    BT_SUMMIT[0] + c1.u[0] * (c1.r + 10),
    BT_SUMMIT[1] + c1.u[1] * (c1.r + 10),
  ];
  const c1wall: [number, number] = [BT_SUMMIT[0] + c1.u[0] * 40, BT_SUMMIT[1] + c1.u[1] * 40];
  const eggPt: [number, number] = [BT_SUMMIT[0], BT_SUMMIT[1] - 92];
  const tindPt = P3(BT_SUMMIT[0], BT_SUMMIT[1]);
  const labels: Lab[] = [
    {
      text: "Botn",
      x: P3(...c1c)[0] - 150,
      y: P3(...c1c)[1] + 34,
      at: P3(...c1c),
      color: C.fg,
      size: 19,
      badge: [P3(...c1c)[0] - 44, P3(...c1c)[1] + 4],
    },
    {
      text: "Liten bre (botnbre)",
      x: P3(...c1c)[0] - 150,
      y: P3(...c1c)[1] + 58,
      at: P3(c1c[0] + 8, c1c[1] + 18),
      color: C.cold,
      badge: [P3(...c1c)[0] + 26, P3(...c1c)[1] + 30],
    },
    {
      text: "Bratt bakvegg",
      x: P3(...c1wall)[0] - 160,
      y: P3(...c1wall)[1] - 18,
      at: P3(...c1wall),
      color: C.warm,
      badge: [P3(...c1wall)[0] - 50, P3(...c1wall)[1] - 14],
    },
  ];
  if (step >= 2)
    labels.push({
      text: "Egg: skarp rygg mellom to botner",
      x: P3(...eggPt)[0] + 70,
      y: P3(...eggPt)[1] - 64,
      at: P3(...eggPt),
      color: C.sand,
      badge: [P3(...eggPt)[0] + 34, P3(...eggPt)[1] - 26],
    });
  if (step === 3)
    labels.push({
      text: "Tind: spiss topp, isen har gravd fra flere sider",
      x: tindPt[0] + 40,
      y: Math.max(28, tindPt[1] - 34),
      at: [tindPt[0], tindPt[1] + 2],
      color: C.fg,
      badge: [tindPt[0] + 2, tindPt[1] - 26],
    });
  return (
    <IsbreFigur
      svgRef={ref}
      title="Terrengmodell av et fjell der små breer graver ut botner. Mellom to botner står en egg, og når isen graver fra flere sider, står det igjen en tind."
      heading={heading}
      caption={
        caption ??
        "Botner graves ut av små breer. Mellom to botner står det igjen en egg, og der flere botner møtes, står det igjen en tind."
      }
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger labels={BT_STEPS} step={step} onStep={clock.setStep} label="Velg steg" />
      }
      status={BT_STATUS[step - 1]}
      labels={labels}
      notes={["Terrengmodell, skjematisk", "Typeområder: Jotunheimen og Sunnmørsalpene"]}
      viewBox="0 0 960 520"
    >
      {({ d }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="botn-egg-tind"
          data-step={step}
        >
          <rect width="960" height="520" fill={d.url.sky} rx="10" />
          <path
            d="M0 250 L90 190 L170 230 L260 170 L360 220 L470 160 L560 200 L660 150 L760 196 L860 166 L960 210 L960 330 L0 330 Z"
            fill="#1b2830"
          />
          <path d={rightFace} fill="#4b5247" />
          <path d={rightFace} fill={d.url.strata} />
          <Polys polys={polys} />
          <path d={frontFace} fill={d.url.rock} />
          <path d={frontFace} fill={d.url.strata} />
          <path d={`M${pts(frontProfile)}`} fill="none" stroke="#a3ab98" strokeWidth="1.4" />
        </g>
      )}
    </IsbreFigur>
  );
}

export const BotnEggTindDiagram = () => <BotnEggTind />;

/* =====================================================================
 * 4. Avsetningsformer (blokkdiagram, kanonisk: Avsetningsformer)
 * ===================================================================== */

const AV_W = 640;
const AV_D = 360;
const AV_WATER = 20;
const avEskerY = (x: number) => 120 + 34 * Math.sin(x / 62);
const AV_DRUMLINS: [number, number][] = [
  [110, 238],
  [205, 296],
  [262, 214],
];
const AV_DELTA: [number, number] = [440, avEskerY(402)];
const AV_BLOCK: [number, number] = [330, 286];
const avMoraineX = (y: number) => 405 + 30 * Math.sin((Math.PI * y) / AV_D);
function avBase(x: number, y: number) {
  return (
    36 +
    5 * Math.sin(x / 40) * Math.cos(y / 55) +
    2.5 * Math.sin(y / 17 + x / 29) -
    0.02 * x -
    (x > 470 ? (x - 470) * 0.34 : 0)
  );
}
function avParts(x: number, y: number) {
  const base = avBase(x, y);
  let drum = 0;
  for (const [cx, cy] of AV_DRUMLINS) {
    const a = x - cx;
    const b = y - cy;
    drum = Math.max(
      drum,
      17 *
        Math.exp(-((b / 21) ** 2)) *
        (a < 0 ? Math.exp(-((a / 24) ** 2)) : Math.exp(-((a / 60) ** 2))),
    );
  }
  const esk =
    x > 30 && x < 404
      ? 12 *
        Math.exp(-(((y - avEskerY(x)) / 12) ** 2)) *
        smooth((x - 30) / 30) *
        smooth((404 - x) / 16)
      : 0;
  const mor = 18 * Math.exp(-(((x - avMoraineX(y)) / 12) ** 2));
  const r = Math.hypot(x - AV_DELTA[0], y - AV_DELTA[1]);
  const deltaMask = x > 418 ? (1 - smooth((r - 105) / 34)) * smooth((x - 418) / 14) : 0;
  return { base, drum, esk, mor, deltaMask };
}
function avGround(x: number, y: number) {
  const q = avParts(x, y);
  let z = q.base + q.drum + q.esk + q.mor;
  if (q.deltaMask > 0) z = lerp(z, Math.max(z, AV_WATER + 4), q.deltaMask);
  return z;
}
function avIce(x: number, front: number) {
  if (front <= 0 || x >= front) return 0;
  return 92 * Math.pow(clamp((front - x) / 430), 0.5);
}
const AV_PROJ = obliqueProj(16, 422, 1.12, 0.6, 0.46, 1.5);

const AV_STEPS = ["1 Under isen", "2 Isen smelter", "3 Etter isen"];
const AV_STATUS = [
  "Under isen bygges eskeren i en smeltevannstunnel, og drumlinen formes i bevegelsesretningen. Ved fronten hoper morenen seg opp, og der smeltevannet møter vann, bygges et delta.",
  "Isen smelter, og fronten trekker seg tilbake. Steinene isen har fraktet, blir lagt igjen der isen forsvant.",
  "Etter isen ligger formene igjen som spor etter hvor fronten sto og hvordan smeltevannet rant.",
];

export function Avsetningsformer({
  heading = "Hvor avsetningene legges igjen",
  caption,
  initialStep,
}: IsbreFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const clock = useStepClock(3, motion.playing && visible, 3400, 1800, initialStep);
  const { step } = clock;
  const qPhase = Math.round(clock.phase * 14) / 14;
  const front = step === 1 ? 396 : step === 2 ? lerp(396, 150, smooth(qPhase)) : -40;
  const terrain = useMemo(() => {
    const ground = hexToRgb("#7f8a6c");
    const mor = hexToRgb("#9a8a6e");
    const sand = hexToRgb("#cdb98c");
    const water = hexToRgb("#3a86ab");
    return heightfield({
      nx: 110,
      ny: 70,
      W: AV_W,
      D: AV_D,
      h: (x, y) => Math.max(avGround(x, y), AV_WATER),
      proj: AV_PROJ,
      colorAt: (x, y, z) => {
        const g = avGround(x, y);
        if (g < AV_WATER) return water;
        const q = avParts(x, y);
        if (q.deltaMask > 0.4 || q.esk > 4) return sand;
        if (q.mor > 5 || q.drum > 5) return mor;
        return z > 40 ? ground : ground;
      },
    });
  }, []);
  const fq = Math.round(front);
  const ice = useMemo(() => {
    if (fq <= 0) return [];
    const ic = hexToRgb("#dcebf5");
    return heightfield({
      nx: 64,
      ny: 36,
      W: AV_W,
      D: AV_D,
      h: (x, y) => avGround(x, y) + avIce(x, fq),
      proj: AV_PROJ,
      colorAt: (x) => (avIce(x + 3, fq) > 1.5 ? ic : null),
      ambient: 0.62,
    });
  }, [fq]);
  // snitt i forkanten (y = 0)
  const N = 128;
  const sec = Array.from({ length: N + 1 }, (_, i) => {
    const x = (AV_W * i) / N;
    return { x, g: avGround(x, 0), b: avBase(x, 0) - 9, i: avIce(x, front) };
  });
  const SP = (x: number, z: number) => AV_PROJ(x, 0, z);
  const bottom = -62;
  const rockPoly = `M${pts([SP(0, bottom), ...sec.map((s) => SP(s.x, Math.min(s.g, s.b)))])} L${pts([SP(AV_W, bottom)])} Z`;
  const deposit = sec.filter((s) => s.g > s.b + 0.5 && s.x < 420);
  const morPoly = `M${pts(deposit.map((s) => SP(s.x, s.g)))} L${pts([...deposit].reverse().map((s) => SP(s.x, s.b)))} Z`;
  const del = sec.filter((s) => s.x >= 414 && s.x <= 500 && s.g > s.b + 0.5);
  const delPoly = del.length
    ? `M${pts(del.map((s) => SP(s.x, s.g)))} L${pts([...del].reverse().map((s) => SP(s.x, Math.min(s.b, s.g))))} Z`
    : "";
  const wet = sec.filter((s) => s.g < AV_WATER);
  const waterSec = wet.length
    ? `M${pts([SP(wet[0].x - 3, AV_WATER), ...wet.map((s) => SP(s.x, s.g)), SP(AV_W, AV_WATER)])} Z`
    : "";
  const iceSec = sec.filter((s) => s.i > 0.5);
  const iceSecPoly = iceSec.length
    ? `M${pts(iceSec.map((s) => SP(s.x, s.g + s.i)))} L${pts([...iceSec].reverse().map((s) => SP(s.x, s.g)))} Z`
    : "";
  const sideFace = `M${pts([AV_PROJ(AV_W, 0, bottom), AV_PROJ(AV_W, AV_D, bottom), AV_PROJ(AV_W, AV_D, Math.max(AV_WATER, avGround(AV_W, AV_D))), AV_PROJ(AV_W, 0, Math.max(AV_WATER, avGround(AV_W, 0)))])} Z`;
  // flyttblokk
  const bg = avGround(...AV_BLOCK);
  const bi = avIce(AV_BLOCK[0], front);
  const blockZ = bg + bi * 0.55;
  const [bx, by] = AV_PROJ(AV_BLOCK[0], AV_BLOCK[1], blockZ);
  const blockShape: [number, number][] = [
    [-15, 0],
    [-12, -13],
    [-3, -20],
    [10, -17],
    [16, -5],
    [12, 2],
    [-5, 3],
  ].map(([u, v]) => [bx + u, by + v]);
  const blockTop: [number, number][] = [
    [-12, -13],
    [-3, -20],
    [10, -17],
    [3, -11],
  ].map(([u, v]) => [bx + u, by + v]);
  const onIce = (x: number, y: number) => AV_PROJ(x, y, avGround(x, y) + avIce(x, front));
  const crev: string[] = [];
  if (front > 60) {
    for (let x = front - 70; x < front - 12; x += 17) {
      for (let y = 30; y < AV_D - 20; y += 52) {
        const a = onIce(x, y + ((x * 7) % 13));
        const b = onIce(x + 2, y + 22 + ((x * 7) % 13));
        crev.push(`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`);
      }
    }
  }
  const flowArrows =
    front > 200
      ? [70, 250].map((y) => `M${pts([onIce(50, y), onIce(110, y), onIce(170, y)])}`)
      : [];
  const tunnel =
    front > 40
      ? smoothPath(
          Array.from({ length: 14 }, (_, i) => {
            const x = 40 + ((Math.min(front, 404) - 40) * i) / 13;
            return AV_PROJ(x, avEskerY(x), avGround(x, avEskerY(x)) + 1);
          }),
        )
      : "";
  const meltRiver =
    front > 380
      ? smoothPath([
          AV_PROJ(front + 2, avEskerY(front), avGround(front + 2, avEskerY(front)) + 1),
          AV_PROJ(425, AV_DELTA[1] + 2, AV_WATER + 5),
          AV_PROJ(470, AV_DELTA[1] + 10, AV_WATER + 4.5),
        ])
      : "";
  const PG = (x: number, y: number) => AV_PROJ(x, y, avGround(x, y));
  const labels: Lab[] = [];
  const L2 = (l: Lab) => labels.push(l);
  const mPt = PG(avMoraineX(330), 330);
  const eskPt = PG(250, avEskerY(250));
  const drPt = PG(...AV_DRUMLINS[2]);
  const dlPt = PG(AV_DELTA[0] + 55, AV_DELTA[1] + 10);
  if (step === 1) {
    L2({
      text: "Isen beveger seg",
      x: onIce(60, 250)[0] - 6,
      y: onIce(60, 250)[1] - 16,
      color: C.cold,
      badge: onIce(40, 250),
    });
    L2({
      text: "Smeltevannstunnel: her bygges eskeren",
      x: 70,
      y: 470,
      at: AV_PROJ(160, avEskerY(160), avGround(160, avEskerY(160))),
      color: C.rain,
      badge: AV_PROJ(160, avEskerY(160) - 14, avGround(160, avEskerY(160))),
    });
    L2({
      text: "Drumlin formes under isen",
      x: drPt[0] - 40,
      y: 42,
      at: drPt,
      color: C.sand,
      anchor: "middle",
      badge: [drPt[0], drPt[1] - 22],
    });
    L2({
      text: "Endemorene ved isfronten",
      x: mPt[0] + 10,
      y: mPt[1] - 46,
      at: mPt,
      color: C.sand,
      badge: [mPt[0] + 6, mPt[1] - 20],
    });
    L2({
      text: "Stein fraktes i isen",
      x: bx - 8,
      y: by - 70,
      at: [bx, by - 10],
      color: C.fg,
      anchor: "middle",
      badge: [bx, by - 36],
    });
  }
  if (step === 2) {
    L2({
      text: "Isfronten trekker seg tilbake",
      x: Math.max(130, onIce(Math.max(40, front - 30), 300)[0]),
      y: 48,
      at: onIce(Math.max(30, front - 6), 300),
      color: C.cold,
      anchor: "middle",
      badge: onIce(Math.max(30, front - 30), 300),
    });
    L2({
      text: bi > 0.5 ? "Steinen fraktes i isen" : "Flyttblokken blir liggende",
      x: bx - 8,
      y: by - 70,
      at: [bx, by - 10],
      color: C.fg,
      anchor: "middle",
      badge: [bx, by - 36],
    });
  }
  if (step === 3) {
    L2({
      text: "Esker: svingete rygg av sand og grus",
      x: 70,
      y: 470,
      at: eskPt,
      color: C.sand,
      badge: [eskPt[0], eskPt[1] - 20],
    });
    L2({
      text: "Drumlin: strømlinjeformet haug",
      x: drPt[0] - 40,
      y: 42,
      at: drPt,
      color: C.sand,
      anchor: "middle",
      badge: [drPt[0], drPt[1] - 22],
    });
    L2({
      text: "Flyttblokk: ofte en annen bergart",
      x: bx + 6,
      y: by - 46,
      at: [bx, by - 14],
      color: C.fg,
      anchor: "middle",
      badge: [bx + 26, by - 24],
    });
    L2({
      text: "Endemorene: viser hvor fronten sto",
      x: mPt[0] + 10,
      y: mPt[1] - 46,
      at: mPt,
      color: C.sand,
      badge: [mPt[0] + 6, mPt[1] - 20],
    });
    const ar = AV_PROJ(14, 330, avGround(14, 330) + 4);
    L2({
      text: "Isen beveget seg denne veien",
      x: ar[0],
      y: ar[1] - 18,
      color: C.cold,
      badge: [ar[0] + 40, ar[1] - 4],
    });
  }
  if (step !== 2) {
    L2({
      text: "Breelvdelta",
      x: dlPt[0] + 30,
      y: dlPt[1] - 40,
      at: dlPt,
      color: C.sand,
      badge: [dlPt[0] + 20, dlPt[1] - 16],
    });
    const mf = SP(300, avGround(300, 0) - 4);
    L2({
      text: "Morene: usortert",
      x: mf[0] - 30,
      y: 506,
      at: mf,
      color: C.sand,
      anchor: "middle",
      badge: [mf[0], mf[1] + 22],
    });
    const df = SP(470, AV_WATER - 2);
    L2({
      text: "Breelvmateriale: sortert i lag",
      x: df[0] + 30,
      y: 506,
      at: df,
      color: C.sand,
      badge: [df[0] + 8, df[1] + 24],
    });
  }
  return (
    <IsbreFigur
      svgRef={ref}
      title="Blokkdiagram av et landskap under og etter isen, med endemorene, esker, drumlin, flyttblokk og breelvdelta. Snittet foran viser usortert morene og sortert breelvmateriale."
      heading={heading}
      caption={
        caption ??
        "Endemorenen dannes ved isfronten, eskeren i en smeltevannstunnel under isen og drumlinen under isen i bevegelsesretningen. Flyttblokken blir liggende når isen smelter, og breelvdeltaet bygges der smeltevannet møter vann."
      }
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <StegVelger labels={AV_STEPS} step={step} onStep={clock.setStep} label="Velg fase" />
      }
      status={AV_STATUS[step - 1]}
      labels={labels}
      notes={["Blokkdiagram, skjematisk", "Høydene er overdrevet"]}
      viewBox="0 0 960 520"
    >
      {({ d, m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="avsetning"
          data-step={step}
        >
          <rect width="960" height="520" fill={d.url.sky} rx="10" />
          <path d={sideFace} fill="#4b5247" />
          <path d={sideFace} fill={d.url.strata} />
          <Polys polys={terrain} />
          <path d={`M${pts(blockShape)}Z`} fill="#b07c66" stroke="#5b3a2c" strokeWidth="1.2" />
          <path d={`M${pts(blockTop)}Z`} fill="#d29b82" />
          {tunnel ? (
            <path
              d={tunnel}
              fill="none"
              stroke="#7fd0f0"
              strokeWidth="3"
              strokeDasharray="8 6"
              opacity="0.95"
            />
          ) : null}
          {ice.length ? (
            <g opacity={0.8}>
              <Polys polys={ice} />
            </g>
          ) : null}
          {crev.map((c, i) => (
            <path key={i} d={c} stroke={P.crevasse} strokeWidth="2" strokeLinecap="round" />
          ))}
          {flowArrows.map((a, i) => (
            <path
              key={i}
              d={a}
              fill="none"
              stroke={ICE_FLOW}
              strokeWidth="3.2"
              markerEnd={`url(#${m.ice})`}
            />
          ))}
          {step === 3 ? (
            <path
              d={`M${pts([AV_PROJ(14, 330, avGround(14, 330) + 4), AV_PROJ(120, 330, avGround(120, 330) + 4)])}`}
              stroke={C.cold}
              strokeWidth="3.5"
              strokeDasharray="10 6"
              markerEnd={`url(#${m.cold})`}
            />
          ) : null}
          {meltRiver ? (
            <path
              d={meltRiver}
              fill="none"
              stroke="#7fd0f0"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ) : null}
          <path d={rockPoly} fill={d.url.rock} />
          <path d={rockPoly} fill={d.url.strata} />
          <path d={morPoly} fill={d.url.moraine} />
          {delPoly ? <path d={delPoly} fill={d.url.outwash} /> : null}
          {waterSec ? <path d={waterSec} fill={d.url.water} /> : null}
          {iceSecPoly ? (
            <g>
              <path d={iceSecPoly} fill={d.url.ice} />
              <path d={iceSecPoly} fill={d.url.iceBands} />
            </g>
          ) : null}
        </g>
      )}
    </IsbreFigur>
  );
}

export const AvsetningsformerDiagram = () => <Avsetningsformer />;

/* =====================================================================
 * 5. Frostsprengning (nærbilde + fjellside med ur)
 * ===================================================================== */

const FR_STEPS = ["1 Vann", "2 Fryser", "3 Sprekk", "4 Løsner"];
const FR_STATUS = [
  "Over 0 °C: vann renner inn i en sprekk i berget.",
  "Under 0 °C: vannet fryser, og volumet øker. Vann trekkes mot isen, og isen vokser og presser sprekken videre ved temperaturer like under frysepunktet, ca. −3 til −6 °C.",
  "Isen tiner, og sprekken er blitt større. Neste gang kommer vannet lenger inn.",
  "Etter mange fryse–tine-sykluser løsner en bit av berget og faller ned i ura.",
];

function crackGeom(step: number, phase: number) {
  const mouth: [number, number] = [372, 112];
  const deep = step >= 3 ? 1 : step === 2 ? 0 : 0;
  const tip: [number, number] = [lerp(418, 436, deep), lerp(282, 362, deep)];
  const w0 = step === 1 ? 22 : step === 2 ? lerp(22, 36, smooth(phase)) : step === 3 ? 40 : 46;
  const dx = tip[0] - mouth[0];
  const dy = tip[1] - mouth[1];
  const len = Math.hypot(dx, dy);
  const n: [number, number] = [dy / len, -dx / len];
  const at = (s: number, side: number): [number, number] => {
    const w = w0 * Math.pow(1 - s, 0.8) * 0.5;
    const wob = 4 * Math.sin(s * 11) + 2 * Math.sin(s * 29);
    return [
      mouth[0] + dx * s + n[0] * (side * w + wob),
      mouth[1] + dy * s + n[1] * (side * w + wob),
    ];
  };
  return { mouth, tip, at, n, w0 };
}

export function Frostsprengning({
  heading = "Frostsprengning",
  caption,
  initialStep,
}: IsbreFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const running = motion.playing && visible;
  const clock = useStepClock(4, running, 2600, 1300, initialStep);
  const t = useTicker(running);
  const { step, phase } = clock;
  const g = crackGeom(step, phase);
  const S = Array.from({ length: 21 }, (_, i) => i / 20);
  const crack = `M${pts([...S.map((s) => g.at(s, -1)), ...[...S].reverse().map((s) => g.at(s, 1))])} Z`;
  const fillFrom =
    step === 1
      ? lerp(0.95, 0.38, smooth(phase))
      : step === 3
        ? lerp(0.95, 0.3, smooth(phase))
        : 0.3;
  const fillS = S.filter((s) => s >= fillFrom);
  const fillPoly =
    fillS.length > 1
      ? `M${pts([...fillS.map((s) => g.at(s, -1)), ...[...fillS].reverse().map((s) => g.at(s, 1))])} Z`
      : "";
  const frozen = step === 2 && phase > 0.15;
  const rock = `M20 112 L${g.mouth[0]} 112 L470 112 L482 220 L488 310 L496 486 L20 486 Z`;
  // biten som løsner: mellom sprekken og stupet
  const blockPoly = `M${pts([
    [470, 112],
    [482, 220],
    [488, 310],
    [490, g.tip[1] + 16],
    g.tip,
    ...[...S]
      .reverse()
      .slice(1)
      .map((s) => g.at(s, 1)),
  ])} Z`;
  const fall = step === 4 ? 0.5 * smooth((phase - 0.1) / 0.6) : 0;
  const pivot: [number, number] = [490, g.tip[1] + 16];
  const blockTf = `translate(${fall * 40} ${fall * fall * 190}) rotate(${fall * 28} ${pivot[0]} ${pivot[1]})`;
  const drops =
    step === 1 || step === 3
      ? [0, 1, 2].map((k) => {
          const s = ((t * 0.9 + k / 3) % 1) * 0.5;
          return g.at(s, 0);
        })
      : [];
  const pushArrows = frozen
    ? [0.45, 0.68].flatMap((s) =>
        [-1, 1].map((side) => {
          const [x, y] = g.at(s, side * 1.6);
          return `M${x} ${y} l${g.n[0] * side * 26} ${g.n[1] * side * 26}`;
        }),
      )
    : [];
  const suck = frozen
    ? [0.55, 0.8].flatMap((s) =>
        [-1, 1].map((side) => {
          const [x, y] = g.at(s, side * 7);
          return `M${x} ${y} l${-g.n[0] * side * 14} ${-g.n[1] * side * 14}`;
        }),
      )
    : [];
  // fjellside med ur
  const cliff =
    "M580 486 L580 132 L700 120 L712 150 L726 230 L742 300 L760 336 L944 460 L944 486 Z";
  const talus = "M752 318 Q800 352 944 446 L944 486 L790 486 Q770 420 752 318 Z";
  const stones = Array.from({ length: 26 }, (_, i) => {
    const u = (i * 0.618) % 1;
    const x = 770 + u * 160;
    const yTop = 332 + (x - 760) * 0.62;
    const y = yTop + 8 + ((i * 37) % 30);
    const r = 4 + ((i * 13) % 5);
    return `M${x - r} ${y} L${x - r * 0.4} ${y - r} L${x + r * 0.8} ${y - r * 0.6} L${x + r} ${y + r * 0.3} L${x} ${y + r * 0.8} Z`;
  });
  const fb = step === 4 ? smooth((phase - 0.15) / 0.85) : 0;
  const fbx = lerp(722, 858, fb);
  const fby = lerp(176, 372, fb * fb);
  const cold = step === 2;
  const labels: Lab[] = [
    { text: "Nærbilde", x: 36, y: 86, color: C.muted, badge: [52, 78] },
    { text: "Fjellside med ur", x: 596, y: 86, color: C.muted, badge: [612, 78] },
  ];
  if (step === 1) {
    labels.push({
      text: "Sprekk i berget",
      x: 230,
      y: 170,
      at: g.at(0.62, -1),
      color: C.fg,
      anchor: "middle",
      badge: [g.at(0.62, -1)[0] - 30, g.at(0.62, -1)[1]],
    });
    labels.push({
      text: "Vann renner inn",
      x: 300,
      y: 60,
      at: g.at(0.1, 0),
      color: C.rain,
      badge: [g.at(0.05, 0)[0] - 26, 94],
    });
  }
  if (step === 2) {
    labels.push({
      text: "Vannet fryser, og volumet øker",
      x: 210,
      y: 60,
      at: g.at(0.32, 0),
      color: C.cold,
      badge: [g.at(0.2, 0)[0] - 30, 96],
    });
    labels.push({
      text: "Isen presser sprekken utover",
      x: 232,
      y: 236,
      at: g.at(0.45, -2.6),
      color: C.warm,
      anchor: "middle",
      badge: [g.at(0.45, -2.6)[0] - 34, g.at(0.45, -2.6)[1] + 4],
    });
    labels.push({
      text: "Vann trekkes mot isen",
      x: 300,
      y: 400,
      at: g.at(0.8, -6),
      color: C.rain,
      anchor: "middle",
      badge: [g.at(0.8, -6)[0] - 30, g.at(0.8, -6)[1] + 14],
    });
  }
  if (step === 3)
    labels.push({
      text: "Sprekken er større og går dypere",
      x: 240,
      y: 410,
      at: g.at(0.9, -1),
      color: C.fg,
      anchor: "middle",
      badge: [g.at(0.9, -1)[0] - 34, g.at(0.9, -1)[1] + 10],
    });
  if (step === 4)
    labels.push({
      text: "En bit av berget løsner",
      x: 300,
      y: 60,
      at: [470 + fall * 40, 230 + fall * fall * 190],
      color: C.warm,
      badge: [500 + fall * 40, 200 + fall * fall * 190],
    });
  labels.push({
    text: "Ur: kjegle av kantet stein",
    x: 938,
    y: 300,
    at: [880, 400],
    color: C.sand,
    anchor: "end",
    badge: [905, 438],
  });
  labels.push({ text: "Stup", x: 760, y: 220, at: [724, 222], color: C.muted, badge: [700, 250] });
  return (
    <IsbreFigur
      svgRef={ref}
      title="Frostsprengning i fire steg: vann i en sprekk, vannet fryser og presser sprekken utover, sprekken vokser, og en bit løsner og faller ned i ura"
      heading={heading}
      caption={
        caption ??
        "1. Vann renner inn i en sprekk. 2. Vannet fryser og utvider seg. 3. Sprekken blir større. 4. Etter mange runder løsner en bit av berget."
      }
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StegVelger
            labels={FR_STEPS}
            step={step}
            onStep={clock.setStep}
            label="Velg steg i frostsprengningen"
          />
          <span className="rounded-full border border-border/80 px-2.5 py-1 font-mono text-xs text-muted-foreground">
            Fryse–tine-syklus {clock.loops + 1}
          </span>
        </>
      }
      status={FR_STATUS[step - 1]}
      labels={labels}
      notes={["Skjematisk, ikke i målestokk"]}
      viewBox="0 0 960 500"
    >
      {({ d, m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="frost"
          data-step={step}
        >
          <rect width="960" height="500" fill={d.url.sky} rx="10" />
          <rect x="12" y="44" width="550" height="448" rx="10" fill="#132430" stroke={C.dim} />
          <rect x="572" y="44" width="378" height="448" rx="10" fill="#132430" stroke={C.dim} />
          <path d={rock} fill={d.url.rock} />
          <path d={rock} fill={d.url.strata} />
          <path
            d="M120 112 L134 230 M226 300 L300 486 M60 330 L170 360"
            stroke="#2f362d"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path d="M20 112 L470 112" stroke="#a3ab98" strokeWidth="2" />
          {step === 4 ? <path d={blockPoly} fill="#132430" /> : null}
          <path d={crack} fill="#0b1217" />
          {fillPoly ? (
            frozen ? (
              <g>
                <path d={fillPoly} fill="#e4f1f8" stroke="#9ec5dc" strokeWidth="1.2" />
                {fillS
                  .filter((_, i) => i % 3 === 1)
                  .map((s) => {
                    const [x, y] = g.at(s, 0);
                    return (
                      <path
                        key={s}
                        d={`M${x - 3} ${y} L${x + 3} ${y} M${x} ${y - 3} L${x} ${y + 3}`}
                        stroke="#8fb6d0"
                        strokeWidth="1"
                      />
                    );
                  })}
              </g>
            ) : step !== 4 ? (
              <path d={fillPoly} fill={P.water} />
            ) : null
          ) : null}
          {drops.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill="#7fd0f0" />
          ))}
          {pushArrows.map((a, i) => (
            <path
              key={i}
              d={a}
              stroke={C.warm}
              strokeWidth="3.4"
              fill="none"
              markerEnd={`url(#${m.warm})`}
            />
          ))}
          {suck.map((a, i) => (
            <path
              key={i}
              d={a}
              stroke="#7fd0f0"
              strokeWidth="2.2"
              fill="none"
              markerEnd={`url(#${m.cold})`}
            />
          ))}
          {step === 4 ? (
            <g transform={blockTf}>
              <path d={blockPoly} fill={d.url.rock} />
              <path d={blockPoly} fill={d.url.strata} />
              <path d={blockPoly} fill="none" stroke="#a3ab98" strokeWidth="1.5" />
            </g>
          ) : null}
          {/* termometer */}
          <g transform="translate(520 64)">
            <rect x="-6" y="0" width="12" height="70" rx="6" fill="#0b1217" stroke={C.muted} />
            <circle cx="0" cy="78" r="11" fill={cold ? C.cold : C.low} stroke={C.muted} />
            <rect
              x="-3"
              y={cold ? 46 : 20}
              width="6"
              height={cold ? 30 : 56}
              fill={cold ? C.cold : C.low}
            />
            <line x1="-10" y1="40" x2="10" y2="40" stroke={C.fg} strokeWidth="1.5" />
          </g>
          {/* fjellside */}
          <path d={cliff} fill={d.url.rock} />
          <path d={cliff} fill={d.url.strata} />
          <path d={talus} fill="#8b8676" />
          {stones.map((st, i) => (
            <path
              key={i}
              d={st}
              fill={i % 3 ? "#a19b89" : "#6e695c"}
              stroke="#4c483f"
              strokeWidth="0.8"
            />
          ))}
          <rect
            x="708"
            y="160"
            width="26"
            height="34"
            fill="none"
            stroke={C.warm}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {step === 4 ? (
            <path
              d={`M${fbx - 9} ${fby} L${fbx - 5} ${fby - 9} L${fbx + 7} ${fby - 8} L${fbx + 10} ${fby + 2} L${fbx + 1} ${fby + 8} Z`}
              fill="#c7c0aa"
              stroke="#4c483f"
              transform={`rotate(${fb * 220} ${fbx} ${fby})`}
            />
          ) : null}
        </g>
      )}
    </IsbreFigur>
  );
}

export const FrostsprengningDiagram = () => <Frostsprengning />;

/* =====================================================================
 * 6. Isostasi og marin grense (kanonisk: IsostasiSnitt)
 * ===================================================================== */

const IS_SEA = 210;
const IS_BASE = 372;
function isLand(x: number) {
  if (x < 290) return IS_SEA + (290 - x) * 0.22;
  if (x < 560) return IS_SEA - 0.42 * (x - 290);
  return (
    96.6 -
    10 * Math.sin((x - 560) / 38) -
    14 * Math.exp(-(((x - 760) / 50) ** 2)) -
    6 * Math.sin(x / 13) * clamp((x - 560) / 80)
  );
}
const isBell = (x: number) => smooth((x + 60) / 700);
const IS_FRONT0 = 300;

function isState(step: number, phase: number) {
  const ph = smooth(phase);
  if (step === 1) return { load: ph, dep: ph, front: IS_FRONT0, clay: 0, mark: 0 };
  if (step === 2)
    return {
      load: 1 - ph,
      dep: 1,
      front: lerp(IS_FRONT0, 980, ph),
      clay: smooth((phase - 0.35) / 0.65),
      mark: smooth((phase - 0.55) / 0.45),
    };
  if (step === 3) return { load: 0, dep: 1 - ph, front: 980, clay: 1, mark: 1 };
  return { load: 0, dep: 0, front: 980, clay: 1, mark: 1 };
}

const IS_STEPS = ["1 Isen tynger", "2 Isen smelter", "3 Landet hever seg", "4 Marin grense"];
const IS_STATUS = [
  "Isen er så tung at den presser landet ned i den seige astenosfæren.",
  "Isen smelter. Landet ligger fortsatt nedpresset, så havet går langt inn over det som i dag er land. Finstoff fra smeltevannet synker til bunns som leire.",
  "Vekten er borte, og landet hever seg sakte. Den gamle strandlinja og havbunnen med leire blir løftet opp.",
  "Det høyeste nivået havet nådde, er marin grense. Under marin grense kan det ligge marin leire, over kan du i praksis utelukke den.",
];

export function IsostasiSnitt({
  heading = "Landet presses ned og hever seg",
  caption,
  initialStep,
}: IsbreFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const clock = useStepClock(4, motion.playing && visible, 3000, 1600, initialStep);
  const { step, phase } = clock;
  const [thick, setThick] = useState(1);
  const st = isState(step, phase);
  const Wmax = 95 * thick;
  const w = (x: number) => Wmax * st.dep * isBell(x);
  const surf = (x: number) => isLand(x) + w(x);
  const H = (x: number) =>
    x <= st.front ? 0 : 128 * thick * st.load * Math.sqrt(clamp((x - st.front) / 320));
  // høyeste strandlinje: der nedpresset land (full nedpressing) møter havnivået
  let xs = 300;
  for (let x = 290; x < 700; x += 1) {
    if (isLand(x) + Wmax * isBell(x) <= IS_SEA) {
      xs = x;
      break;
    }
  }
  const X: number[] = [];
  for (let x = 0; x <= 960; x += 6) X.push(x);
  const landTop: [number, number][] = X.map((x) => [x, surf(x)]);
  const base: [number, number][] = X.map((x) => [x, IS_BASE + w(x)]);
  const litho = `M${pts(landTop)} L${pts([...base].reverse())} Z`;
  const astheno = `M${pts(base)} L960 540 L0 540 Z`;
  const iceX = X.filter((x) => H(x) > 0.5);
  const icePoly = iceX.length
    ? `M${st.front} ${surf(st.front)} L${pts(iceX.map((x) => [x, surf(x) - H(x)]))} L960 ${surf(960) - H(960)} L960 ${surf(960)} L${pts([...iceX].reverse().map((x) => [x, surf(x)]))} Z`
    : "";
  const wetX = X.filter((x) => surf(x) > IS_SEA && H(x) < 0.5);
  const seaEnd = wetX.length ? wetX[wetX.length - 1] + 6 : 0;
  const sea = wetX.length
    ? `M0 ${IS_SEA} L${pts(X.filter((x) => x <= seaEnd).map((x) => [x, Math.max(IS_SEA, surf(x))]))} L${seaEnd} ${IS_SEA} Z`
    : "";
  const clayX = X.filter((x) => x >= 160 && x <= xs);
  const clayT = 13 * st.clay;
  const clay =
    clayT > 0.5
      ? `M${pts(clayX.map((x) => [x, surf(x) - clayT * smooth((xs - x) / 40)]))} L${pts([...clayX].reverse().map((x) => [x, surf(x)]))} Z`
      : "";
  const mgY = surf(xs);
  const labels: Lab[] = [
    { text: "Havnivå", x: 16, y: IS_SEA - 10, color: C.rain, badge: [30, IS_SEA - 4] },
    {
      text: "Litosfære",
      x: 120,
      y: IS_BASE - 34 + w(120),
      color: C.fg,
      badge: [130, IS_BASE - 40],
    },
    { text: "Seig astenosfære", x: 120, y: 500, color: C.warm, badge: [130, 494] },
  ];
  if (step === 1) {
    labels.push({
      text: "Innlandsis",
      x: 860,
      y: surf(860) - H(860) * 0.55,
      color: C.fg,
      size: 19,
      anchor: "middle",
      badge: [860, surf(860) - H(860) * 0.55],
    });
    labels.push({
      text: "Isen presser landet ned",
      x: 640,
      y: Math.max(40, surf(560) - H(560) - 18),
      color: C.fg,
      anchor: "middle",
      badge: [600, Math.max(48, surf(600) - H(600) - 22)],
    });
    labels.push({
      text: "Stiplet: landoverflaten uten is",
      x: 470,
      y: isLand(470) + 4,
      at: [530, isLand(530)],
      color: C.fg,
      anchor: "end",
      badge: [520, isLand(520) - 2],
    });
    if (st.load > 0.3)
      labels.push({
        text: "Astenosfæren gir sakte etter",
        x: 400,
        y: IS_BASE + 104,
        color: C.warm,
        badge: [450, IS_BASE + 70],
      });
  }
  if (step === 2) {
    labels.push({
      text: "Havet går inn over nedpresset land",
      x: 250,
      y: 150,
      at: [Math.min(xs - 30, seaEnd - 30), IS_SEA + 6],
      color: C.rain,
      badge: [Math.min(xs - 40, seaEnd - 40), IS_SEA + 12],
    });
    if (st.clay > 0.3)
      labels.push({
        text: "Leire synker til bunns",
        x: 120,
        y: 300,
        at: [240, surf(240) - 3],
        color: C.sand,
        badge: [226, surf(226) + 16],
      });
    if (st.mark > 0.5)
      labels.push({
        text: "Høyeste strandlinje",
        x: xs + 26,
        y: mgY - 30,
        at: [xs, mgY],
        color: C.sand,
        badge: [xs + 22, mgY - 22],
      });
  }
  if (step === 3) {
    labels.push({ text: "Landet hever seg", x: 600, y: 300, color: C.fg, badge: [620, 300] });
    labels.push({
      text: "Gammel strandlinje løftes opp",
      x: xs + 30,
      y: mgY - 40,
      at: [xs, mgY],
      color: C.sand,
      badge: [xs + 22, mgY - 22],
    });
    labels.push({
      text: "Havbunn med leire løftes",
      x: 120,
      y: 300,
      at: [250, surf(250) - 3],
      color: C.sand,
      badge: [256, surf(256) + 18],
    });
  }
  if (step === 4) {
    labels.push({
      text: "Marin grense: 0–220 m over dagens havnivå, avhengig av sted",
      x: xs + 26,
      y: Math.min(mgY, 150) - 26,
      at: [xs, mgY],
      color: C.sand,
      badge: [xs + 22, mgY - 22],
    });
    labels.push({
      text: "Marin leire på land under marin grense",
      x: 120,
      y: 300,
      at: [Math.round((xs + 300) / 2), surf(Math.round((xs + 300) / 2)) - 3],
      color: C.sand,
      badge: [Math.round((xs + 300) / 2) + 6, surf(Math.round((xs + 300) / 2)) + 18],
    });
    labels.push({
      text: "Over marin grense: ingen marin leire",
      x: xs + 130,
      y: isLand(xs + 130) + 84,
      at: [xs + 100, isLand(xs + 100) + 2],
      color: C.muted,
      badge: [xs + 110, isLand(xs + 110) + 62],
    });
  }
  return (
    <IsbreFigur
      svgRef={ref}
      title="Tverrsnitt: innlandsisen presser litosfæren ned i astenosfæren. Når isen smelter, går havet inn over landet, og etterpå hever landet seg. Det høyeste havnivået blir marin grense."
      heading={heading}
      caption={
        caption ??
        "Isen presser landet ned. Når isen smelter, kommer havet inn, og deretter hever landet seg sakte. Marin grense er det høyeste nivået havet nådde."
      }
      action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StegVelger
            labels={IS_STEPS}
            step={step}
            onStep={clock.setStep}
            label="Velg steg i isostasien"
          />
          <Skyver
            label="Istykkelse"
            min={0.3}
            max={1}
            step={0.05}
            value={thick}
            onChange={setThick}
            ends={["tynn", "tykk"]}
            valueLabel={thick < 0.5 ? "tynn is" : thick < 0.8 ? "middels" : "tykk is"}
          />
        </>
      }
      status={
        <>
          {IS_STATUS[step - 1]}
          {step === 4
            ? " Landet ble presset ned ulikt mye, og derfor varierer marin grense: prøv istykkelsen."
            : null}
        </>
      }
      labels={labels}
      notes={["Skjematisk tverrsnitt", "Nedpressingen er sterkt overdrevet"]}
      viewBox="0 0 960 540"
    >
      {({ d, m }) => (
        <g
          className={motion.motionClass}
          data-playing={motion.playing ? "yes" : "no"}
          data-figur="isostasi"
          data-step={step}
        >
          <rect width="960" height="540" fill={d.url.sky} rx="10" />
          <path d={astheno} fill={d.url.astheno} />
          <path d={litho} fill={d.url.litho} />
          <path d={litho} fill={d.url.strata} opacity="0.6" />
          <path d={`M${pts(base)}`} fill="none" stroke="#2c241d" strokeWidth="2" />
          <path
            d={`M${pts(landTop.filter(([x]) => x > 280))}`}
            fill="none"
            stroke="#7d9268"
            strokeWidth="3"
          />
          {sea ? <path d={sea} fill={d.url.water} opacity="0.92" /> : null}
          {clay ? <path d={clay} fill={d.url.clay} opacity={sea ? 0.85 : 1} /> : null}
          <line
            x1="0"
            y1={IS_SEA}
            x2="960"
            y2={IS_SEA}
            stroke={C.rain}
            strokeWidth="1.6"
            strokeDasharray="9 7"
            opacity="0.8"
          />
          {icePoly ? (
            <g>
              <path d={icePoly} fill={d.url.ice} />
              <path d={icePoly} fill={d.url.iceBands} />
              <path
                d={`M${pts(iceX.map((x) => [x, surf(x) - H(x)]))}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>
          ) : null}
          {step <= 3 && st.dep > 0.05 ? (
            <path
              d={`M${pts(X.filter((x) => x >= 300).map((x) => [x, isLand(x)]))}`}
              fill="none"
              stroke={"#33536a"}
              strokeWidth="2.2"
              strokeDasharray="6 6"
            />
          ) : null}
          {step === 1 && st.load > 0.3
            ? [560, 700, 840].map((x) => (
                <path
                  key={x}
                  d={`M${x} ${surf(x) - H(x) + 10} v30`}
                  stroke={C.fg}
                  strokeWidth="3"
                  markerEnd={`url(#${m.fg})`}
                />
              ))
            : null}
          {step === 1 && st.load > 0.3
            ? [
                <path
                  key="l"
                  d={`M560 ${IS_BASE + 70} h-90`}
                  stroke={C.warm}
                  strokeWidth="2.6"
                  strokeDasharray="7 5"
                  markerEnd={`url(#${m.warm})`}
                />,
              ]
            : null}
          {step === 3
            ? [480, 620, 780].map((x) => (
                <path
                  key={x}
                  d={`M${x} ${IS_BASE + w(x) + 70} v-36`}
                  stroke={C.warm}
                  strokeWidth="3"
                  markerEnd={`url(#${m.warm})`}
                />
              ))
            : null}
          {st.mark > 0 ? (
            <g opacity={st.mark}>
              <path d={`M${xs - 16} ${mgY} h32`} stroke={C.sand} strokeWidth="3" />
              <circle cx={xs} cy={mgY} r="5" fill={C.sand} />
            </g>
          ) : null}
          {step === 4 ? (
            <g>
              <line x1={xs} y1={mgY} x2={xs} y2={IS_SEA} stroke={C.sand} strokeWidth="2" />
              <path
                d={`M${xs - 6} ${IS_SEA - 1} h12 M${xs - 6} ${mgY} h12`}
                stroke={C.sand}
                strokeWidth="2"
              />
              <line
                x1={0}
                y1={mgY}
                x2={xs}
                y2={mgY}
                stroke={C.sand}
                strokeWidth="1.6"
                strokeDasharray="5 5"
                opacity="0.8"
              />
            </g>
          ) : null}
        </g>
      )}
    </IsbreFigur>
  );
}

export const IsostasiSnittDiagram = () => <IsostasiSnitt />;
