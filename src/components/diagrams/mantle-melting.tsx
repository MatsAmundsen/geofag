import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { useAnimationPlaying } from "./use-motion";
import { C, font, PlayPauseToggle } from "./svg-kit";
import {
  KEEL_KM,
  KM_PER_GPA,
  MELT_ONSET_KM,
  PLATE_MAX_KM,
  PLATE_MIN_KM,
  mantleTempAt,
  meltAmountFor,
  solidusAt,
} from "@/lib/mantle-melting";

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function lerp(a: number, b: number, u: number) {
  return a + (b - a) * u;
}
function ease(u: number) {
  const c = clamp(u, 0, 1);
  return c * c * (3 - 2 * c);
}
function hash(a: number, b: number) {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
function nb(n: number, digits = 0) {
  return n.toFixed(digits).replace(".", ",");
}

/* ------------------------------------------------------------------ */
/* Snitt: koordinater                                                  */
/* ------------------------------------------------------------------ */

const W = 640;
const H = 560;
const SURF = 70;
const UX = 450;
const CMB_Y = 500;

function zToY(z: number) {
  if (z <= 100) return SURF + z * 1.9;
  if (z <= 200) return SURF + 190 + (z - 100) * 0.75;
  return SURF + 265 + ((z - 200) / 2700) * (CMB_Y - SURF - 265);
}

type Pt = [number, number];

function chaikin(points: Pt[], rounds = 3): Pt[] {
  let pts = points;
  for (let r = 0; r < rounds; r += 1) {
    const next: Pt[] = [];
    for (let i = 0; i < pts.length; i += 1) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      next.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25]);
      next.push([a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
    }
    pts = next;
  }
  return pts;
}

type Loop = { pts: Pt[]; cum: number[]; len: number; d: string };

function makeLoop(control: Pt[], scale: number): Loop {
  const cx = control.reduce((s, p) => s + p[0], 0) / control.length;
  const cy = control.reduce((s, p) => s + p[1], 0) / control.length;
  const scaled = control.map(([x, y]) => [cx + (x - cx) * scale, cy + (y - cy) * scale] as Pt);
  const pts = chaikin(scaled);
  const cum = [0];
  for (let i = 1; i <= pts.length; i += 1) {
    const a = pts[i - 1];
    const b = pts[i % pts.length];
    cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  const d = `M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")} Z`;
  return { pts, cum, len: cum[cum.length - 1], d };
}

function pointOn(loop: Loop, u: number): Pt {
  const target = (((u % 1) + 1) % 1) * loop.len;
  let lo = 0;
  let hi = loop.cum.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (loop.cum[mid] <= target) lo = mid;
    else hi = mid;
  }
  const a = loop.pts[lo];
  const b = loop.pts[(lo + 1) % loop.pts.length];
  const seg = loop.cum[lo + 1] - loop.cum[lo] || 1;
  const f = (target - loop.cum[lo]) / seg;
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
}

const COLD: [number, number, number] = [96, 158, 230];
const MID: [number, number, number] = [214, 112, 74];
const HOT: [number, number, number] = [255, 196, 92];

function heatColor(t: number) {
  const c = clamp(t, 0, 1);
  const [a, b, f] = c < 0.5 ? [COLD, MID, c / 0.5] : [MID, HOT, (c - 0.5) / 0.5];
  const r = Math.round(lerp(a[0], b[0], f));
  const g = Math.round(lerp(a[1], b[1], f));
  const bl = Math.round(lerp(a[2], b[2], f));
  return `rgb(${r},${g},${bl})`;
}

/* ------------------------------------------------------------------ */
/* Trinn                                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  "1 Varme fra kjernen",
  "2 Fast, men plastisk",
  "3 Konveksjon",
  "4 Tykk og tynn plate",
  "5 Trykket faller → smelting",
  "6 Magmakammer",
  "7 Magma når overflaten",
];

const STEP_TEXT = [
  "Kjernen er svært varm og varmer opp mantelen nedenfra. Mantelen er varmest nederst, ca. 3370 °C, og kjøligst øverst, ca. 1250 °C.",
  "Mantelen er så varm at bergarten ville smeltet ved overflaten. Men trykket fra bergartene over holder den fast. Den faste bergarten kan likevel krype svært langsomt, over millioner av år.",
  "Varm mantel er litt lettere og stiger. Kaldere mantel er tyngre og synker. Slik oppstår langsomme konveksjonsstrømmer fra dypet og opp mot platene.",
  "Platene er ikke like tykke. Under en tykk plate stopper den stigende mantelen dypt nede, der trykket er høyt. Under en tynn plate kan den stige nærmere overflaten.",
  "Jo høyere mantelen stiger, jo mindre bergart ligger over, og trykket faller. Smeltepunktet (solidus) synker med trykket. Når mantelen krysser solidus, smelter en liten del mellom kornene. Dette kalles dekompresjonssmelting.",
  "Smelten er lettere enn bergarten rundt og siver oppover. Den samler seg i et magmakammer ved bunnen av platen eller inne i den.",
  "Magmaen presser seg opp gjennom sprekker (ganger) og smelter seg delvis vei gjennom platen. Når den når overflaten, får vi et vulkanutbrudd.",
];

const STEP_MS = 7000;

/* ------------------------------------------------------------------ */
/* Små byggeklosser                                                    */
/* ------------------------------------------------------------------ */

/** Omtrentlig tekstbredde i em for Source Sans 3 (halvfet). */
function textEm(text: string) {
  let em = 0;
  for (const ch of text) {
    if ("MWmw".includes(ch)) em += 0.82;
    else if ("iljtfr .,:()|".includes(ch)) em += 0.3;
    else if (ch >= "A" && ch <= "Z") em += 0.62;
    else if ("ÆØÅ".includes(ch)) em += 0.66;
    else if (ch >= "0" && ch <= "9") em += 0.52;
    else em += 0.52;
  }
  return em;
}

function Tx({
  x,
  y,
  children,
  size = 21,
  fill = C.fg,
  anchor = "start",
  weight = 600,
  pill = false,
  chars,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  pill?: boolean;
  chars?: number;
}) {
  const w = (chars ?? textEm(typeof children === "string" ? children : "xxxxxxxxxx")) * size + size * 0.7;
  const left = anchor === "start" ? x - size * 0.35 : anchor === "middle" ? x - w / 2 : x - w + size * 0.35;
  return (
    <g>
      {pill ? (
        <rect
          x={left}
          y={y - size * 0.95}
          width={w}
          height={size * 1.32}
          rx={size * 0.3}
          fill="#0b1217"
          opacity={0.78}
        />
      ) : null}
      <text x={x} y={y} fill={fill} fontSize={size} fontFamily={font} fontWeight={weight} textAnchor={anchor}>
        {children}
      </text>
    </g>
  );
}

function Grains({
  cx,
  cy,
  r,
  melt,
  clipId,
}: {
  cx: number;
  cy: number;
  r: number;
  melt: number;
  clipId: string;
}) {
  const data = useMemo(() => {
    const s = 15;
    const polys: { d: string; fill: string }[] = [];
    const verts = new Map<string, Pt>();
    const edges = new Map<string, [Pt, Pt]>();
    const fills = ["#6f7d3e", "#7d8b47", "#606f37", "#879350", "#4c5536", "#76843f"];
    const jitter = (x: number, y: number): Pt => {
      const kx = Math.round(x * 4);
      const ky = Math.round(y * 4);
      return [x + (hash(kx, ky) - 0.5) * 6, y + (hash(ky, kx) - 0.5) * 6];
    };
    for (let row = -5; row <= 5; row += 1) {
      for (let col = -5; col <= 5; col += 1) {
        const hx = cx + (col + (row & 1 ? 0.5 : 0)) * s * Math.sqrt(3);
        const hy = cy + row * s * 1.5;
        if (Math.hypot(hx - cx, hy - cy) > r + s * 1.5) continue;
        const pts: Pt[] = [];
        for (let k = 0; k < 6; k += 1) {
          const a = (Math.PI / 3) * k + Math.PI / 6;
          const p = jitter(hx + Math.cos(a) * s, hy + Math.sin(a) * s);
          pts.push(p);
          verts.set(`${p[0].toFixed(2)},${p[1].toFixed(2)}`, p);
        }
        for (let k = 0; k < 6; k += 1) {
          const a = pts[k];
          const b = pts[(k + 1) % 6];
          const key = [a, b]
            .map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`)
            .sort()
            .join("|");
          edges.set(key, [a, b]);
        }
        polys.push({
          d: `M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")} Z`,
          fill: fills[Math.floor(hash(row + 11, col + 7) * fills.length)],
        });
      }
    }
    return { polys, verts: [...verts.values()], edges: [...edges.values()] };
  }, [cx, cy, r]);

  return (
    <g clipPath={`url(#${clipId})`}>
      {data.polys.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} stroke="#262b1c" strokeWidth={1.2} />
      ))}
      {melt > 0.02
        ? data.edges.map(([a, b], i) =>
            hash(i, 3) < 0.25 + melt * 0.6 ? (
              <line
                key={`e${i}`}
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
                stroke="#ff8a3d"
                strokeWidth={0.6 + melt * 2.2}
                strokeLinecap="round"
                opacity={0.5 + melt * 0.5}
              />
            ) : null,
          )
        : null}
      {melt > 0.02
        ? data.verts.map((p, i) => (
            <circle key={`v${i}`} cx={p[0]} cy={p[1]} r={0.8 + melt * 3.4} fill="#ffb35c" opacity={0.9} />
          ))
        : null}
    </g>
  );
}

function MiniSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-foreground">
      <span className="whitespace-nowrap">Platetykkelse der mantelen stiger</span>
      <span className="flex items-center gap-2">
        <span className="text-muted-foreground">tynn</span>
        <input
          type="range"
          min={PLATE_MIN_KM}
          max={PLATE_MAX_KM}
          step={5}
          value={value}
          aria-label="Platetykkelse der mantelen stiger, i kilometer"
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-32 cursor-pointer accent-primary sm:w-44"
        />
        <span className="text-muted-foreground">tykk</span>
        <span className="w-14 shrink-0 whitespace-nowrap font-mono text-primary">{value} km</span>
      </span>
    </label>
  );
}

function StepPicker({ step, onStep }: { step: number; onStep: (step: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Trinn i animasjonen">
      {STEPS.map((label, index) => {
        const n = index + 1;
        const active = step === n;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={active}
            onClick={() => onStep(n)}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-muted/60 text-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hovedfigur                                                          */
/* ------------------------------------------------------------------ */

/**
 * Dekompresjonssmelting under en tynn plate: varme fra kjernen, fast men plastisk mantel,
 * konveksjon, tykk og tynn plate, solidus krysses, magmakammer og vulkan.
 */
export function SmeltingUnderTynnPlateDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const uid = useId().replace(/:/g, "");
  const [step, setStepRaw] = useState(1);
  const [plateKm, setPlateKm] = useState(35);
  const [t, setT] = useState(4);
  const [stepT, setStepT] = useState(99);

  const setStep = (n: number) => {
    setStepRaw(n);
    setStepT(playing ? 0 : 99);
  };

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      acc += dt;
      setT((v) => v + dt);
      setStepT((v) => v + dt);
      if (acc * 1000 >= STEP_MS) {
        acc = 0;
        setStepRaw((s) => (s >= STEPS.length ? 1 : s + 1));
        setStepT(0);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, step]);

  const thinY = zToY(plateKm);
  const keelY = zToY(KEEL_KM);
  const onsetY = zToY(MELT_ONSET_KM);
  const melt = meltAmountFor(plateKm);
  const melts = melt > 0;

  const loops = useMemo(() => {
    const a: Pt[] = [
      [UX - 12, 466],
      [UX - 12, thinY + 40],
      [UX - 74, thinY + 56],
      [330, keelY + 34],
      [96, keelY + 36],
      [50, 380],
      [62, 462],
      [250, 470],
    ];
    const b: Pt[] = [
      [UX + 12, 466],
      [UX + 12, thinY + 40],
      [UX + 80, thinY + 56],
      [690, thinY + 90],
      [700, 462],
      [590, 474],
    ];
    return {
      a: [1, 0.76, 0.52].map((s) => makeLoop(a, s)),
      b: [1, 0.74, 0.48].map((s) => makeLoop(b, s)),
    };
  }, [thinY, keelY]);

  /* Pakken med mantel som følges opp under den tynne platen */
  let parcelZ: number | null = null;
  if (step === 2) parcelZ = 185;
  else if (step === 3 || step === 4) {
    const u = step === 4 && stepT >= 50 ? 0.8 : (stepT % 6.5) / 6.5;
    parcelZ = lerp(700, plateKm, ease(u / 0.8));
  } else if (step === 5) {
    parcelZ = lerp(200, plateKm, ease(stepT / 4.5));
  } else if (step >= 6) parcelZ = plateKm;
  const parcelY = parcelZ === null ? 0 : zToY(parcelZ) + 12;
  const parcelMelt =
    parcelZ === null ? 0 : clamp((MELT_ONSET_KM - parcelZ) / (MELT_ONSET_KM - PLATE_MIN_KM), 0, 1);

  const particleAlpha = step <= 2 ? 0.35 : 0.92;
  const chamberRx = 16 + 24 * melt;
  const chamberRy = 6 + 8 * melt;
  const chamberY = thinY - chamberRy * 0.35;
  const dikeGrow = step === 7 ? ease(stepT / 2.4) : 0;
  const erupt = step === 7 && dikeGrow >= 0.999;
  const bubble = { x: 538, y: 392, r: 56 };
  const showBubble = step === 2 || step === 5;

  const dikePts: Pt[] = [
    [UX, chamberY - chamberRy + 2],
    [UX + 5, lerp(chamberY, SURF, 0.25)],
    [UX - 4, lerp(chamberY, SURF, 0.5)],
    [UX + 4, lerp(chamberY, SURF, 0.75)],
    [UX, SURF - 32],
  ];
  const dikeD = `M ${dikePts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")}`;
  const dikeLen = dikePts.reduce(
    (s, p, i) => (i === 0 ? 0 : s + Math.hypot(p[0] - dikePts[i - 1][0], p[1] - dikePts[i - 1][1])),
    0,
  );

  const lithoD = `M 0 ${SURF} H ${W} V ${thinY.toFixed(1)} H 404 C 340 ${thinY.toFixed(1)} 330 ${keelY} 262 ${keelY} H 0 Z`;
  const crustThin = Math.min(30, (thinY - SURF) * 0.4);
  const crustKeel = zToY(35);
  const crustD = `M 0 ${SURF} H ${W} V ${(SURF + crustThin).toFixed(1)} H 404 C 340 ${(SURF + crustThin).toFixed(1)} 330 ${crustKeel} 262 ${crustKeel} H 0 Z`;

  const g = (name: string) => `${uid}-${name}`;
  const dataState = melts ? "smelter" : "fast";

  return (
    <FigureFrame
      heading="Hvorfor mantelen smelter under en tynn plate"
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      caption={
        <>
          Skjematisk snitt fra kjernen til overflaten. Dybden er strukket øverst og ikke i målestokk. Mantelen er
          fast bergart, men så varm at den kan krype svært langsomt over millioner av år. Under en tynn plate kan
          varm mantel stige høyere opp. Der ligger det mindre bergart over, så trykket er lavere. Smeltepunktet
          (solidus) synker når trykket synker. Når den stigende mantelen krysser solidus, smelter en liten del av
          den. Kurvene i diagrammet til høyre er forenklet.
        </>
      }
    >
      <div className={motion.motionClass} data-step={step} data-playing={playing ? "yes" : "no"} data-melt={dataState}>
        <div className="mb-3 flex flex-col gap-2.5">
          <StepPicker step={step} onStep={setStep} />
          <MiniSlider value={plateKm} onChange={setPlateKm} />
        </div>
        <p className="mb-3 min-h-[4.5rem] rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-sm leading-relaxed text-foreground sm:min-h-[3.5rem]">
          <span className="font-semibold text-primary">
            Trinn {step} av {STEPS.length}.{" "}
          </span>
          {STEP_TEXT[step - 1]}
        </p>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-labelledby={g("t")}
          >
            <title id={g("t")}>
              Snitt fra kjernen til overflaten med konveksjon i mantelen, en tykk og en tynn plate, og smelting
              under den tynne platen
            </title>
            <defs>
              <linearGradient id={g("sky")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0c1820" />
                <stop offset="1" stopColor="#183041" />
              </linearGradient>
              <linearGradient id={g("mantle")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4a2a22" />
                <stop offset="0.45" stopColor="#6a3324" />
                <stop offset="1" stopColor="#a8452a" />
              </linearGradient>
              <radialGradient id={g("core")} cx="0.5" cy="1.1" r="0.9">
                <stop offset="0" stopColor="#fff2b0" />
                <stop offset="0.45" stopColor="#ffb648" />
                <stop offset="1" stopColor="#e2641f" />
              </radialGradient>
              <radialGradient id={g("plume")} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ff9d4d" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ff9d4d" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={g("melt")} cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ff9a3d" stopOpacity="0.6" />
                <stop offset="0.7" stopColor="#ff8a3d" stopOpacity="0.3" />
                <stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={g("litho")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3c4d58" />
                <stop offset="1" stopColor="#2a3943" />
              </linearGradient>
              <linearGradient id={g("magma")} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#ffcf6b" />
                <stop offset="1" stopColor="#ff5a24" />
              </linearGradient>
              <clipPath id={g("mantleclip")}>
                <rect x="0" y={SURF} width={W} height={CMB_Y + 30 - SURF} />
              </clipPath>
              <clipPath id={g("bubble")}>
                <circle cx={bubble.x} cy={bubble.y} r={bubble.r} />
              </clipPath>
              <marker id={g("arw")} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 1.5 L11 6 L0 10.5 z" fill="#ffd27a" />
              </marker>
              <marker id={g("arwfg")} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 1.5 L11 6 L0 10.5 z" fill={C.fg} />
              </marker>
            </defs>

            <rect width={W} height={H} rx="10" fill={C.bg} />
            <rect x="0" y="0" width={W} height={SURF} fill={`url(#${g("sky")})`} />

            {/* Mantel med temperaturgradient */}
            <rect x="0" y={SURF} width={W} height={CMB_Y + 30 - SURF} fill={`url(#${g("mantle")})`} />
            <ellipse
              cx={UX}
              cy={(thinY + 470) / 2}
              rx={90}
              ry={(470 - thinY) / 2 + 30}
              fill={`url(#${g("plume")})`}
              opacity={step >= 3 ? 0.9 : 0.35}
            />

            {/* Konveksjonsstrømmer */}
            <g clipPath={`url(#${g("mantleclip")})`}>
              {[...loops.a, ...loops.b].map((loop, i) => (
                <path key={`s${i}`} d={loop.d} fill="none" stroke="#ffffff" strokeOpacity={step >= 3 ? 0.1 : 0.05} strokeWidth={1.2} />
              ))}
              {[...loops.a.map((l) => ({ l, cell: "a" })), ...loops.b.map((l) => ({ l, cell: "b" }))].map(
                ({ l }, li) => {
                  const n = Math.round(l.len / 26);
                  const speed = 16 / l.len;
                  return Array.from({ length: n }, (_, i) => {
                    const u = (i / n + t * speed) % 1;
                    const [x, y] = pointOn(l, u);
                    const temp = 0.5 + 0.5 * Math.cos(2 * Math.PI * (u - 0.1));
                    return (
                      <circle
                        key={`p${li}-${i}`}
                        cx={x}
                        cy={y}
                        r={temp > 0.6 ? 3.6 : 3.1}
                        fill={heatColor(temp)}
                        opacity={particleAlpha}
                      />
                    );
                  });
                },
              )}
              {step === 3
                ? [
                    `M ${UX - 12} 440 L ${UX - 12} ${thinY + 80}`,
                    `M 66 ${keelY + 70} L 66 440`,
                    `M ${UX + 112} ${thinY + 70} L ${UX + 150} ${thinY + 64}`,
                  ].map((d) => (
                    <path key={d} d={d} fill="none" stroke="#ffd27a" strokeWidth={3} markerEnd={`url(#${g("arw")})`} />
                  ))
                : null}
            </g>

            {/* Kjernen */}
            <path d={`M 0 ${CMB_Y} Q ${W / 2} ${CMB_Y - 30} ${W} ${CMB_Y} V ${H} H 0 Z`} fill={`url(#${g("core")})`} />
            <path
              d={`M 0 ${CMB_Y} Q ${W / 2} ${CMB_Y - 30} ${W} ${CMB_Y}`}
              fill="none"
              stroke="#ffe08a"
              strokeWidth={step === 1 ? 6 : 3}
              opacity={step === 1 ? 0.55 + 0.35 * Math.sin(t * 2.2) : 0.5}
            />
            {step === 1
              ? [110, 250, 390, 530].map((x, i) => {
                  const u = (t * 0.45 + i * 0.27) % 1;
                  const y0 = CMB_Y - 16 - u * 120;
                  const d = `M ${x} ${y0 + 40} q 10 -10 0 -20 q -10 -10 0 -20`;
                  return (
                    <path
                      key={x}
                      d={d}
                      fill="none"
                      stroke="#ffd27a"
                      strokeWidth={3.2}
                      strokeLinecap="round"
                      opacity={0.9 * (1 - u)}
                      markerEnd={`url(#${g("arw")})`}
                    />
                  );
                })
              : null}

            {/* Smeltesone og dråper */}
            {melts && step >= 5 ? (
              <g>
                <ellipse
                  cx={UX}
                  cy={thinY}
                  rx={100}
                  ry={onsetY - thinY + 8}
                  fill={`url(#${g("melt")})`}
                  opacity={step === 5 ? ease(stepT / 3.5) : 1}
                />
                {Array.from({ length: 22 }, (_, i) => {
                  const x = UX + (hash(i, 1) - 0.5) * 140;
                  const y = lerp(thinY + 2, onsetY - 2, hash(i, 2));
                  const show = step > 5 || hash(i, 4) < ease(stepT / 4);
                  return show ? <circle key={i} cx={x} cy={y} r={1.6 + melt * 1.4} fill="#ffb35c" /> : null;
                })}
              </g>
            ) : null}
            <line
              x1={392}
              x2={W}
              y1={onsetY}
              y2={onsetY}
              stroke="#ffb35c"
              strokeWidth={2}
              strokeDasharray="7 6"
              opacity={step >= 5 ? 0.9 : 0}
            />

            {/* Litosfæren: tykk kjøl og tynn plate */}
            <path d={lithoD} fill={`url(#${g("litho")})`} />
            <path d={crustD} fill="#5d5546" />
            <path d={`M 0 ${SURF} H ${W}`} stroke="#8a9a72" strokeWidth={3} />
            <path
              d={`M 0 ${keelY} H 262 C 330 ${keelY} 340 ${thinY} 404 ${thinY} H ${W}`}
              fill="none"
              stroke="#9fb7c9"
              strokeWidth={2}
              strokeDasharray="6 5"
              opacity={0.75}
            />

            {/* Magmakammer */}
            {melts && step >= 6 ? (
              <g>
                {step === 6
                  ? Array.from({ length: 16 }, (_, i) => {
                      const u = (t * 0.35 + hash(i, 9)) % 1;
                      const x0 = UX + (hash(i, 5) - 0.5) * 150;
                      const y0 = lerp(thinY + 4, onsetY, hash(i, 6));
                      const x = lerp(x0, UX + (hash(i, 7) - 0.5) * chamberRx, ease(u));
                      const y = lerp(y0, chamberY, ease(u));
                      return <circle key={i} cx={x} cy={y} r={2.6} fill="#ffb35c" opacity={1 - u * 0.5} />;
                    })
                  : null}
                <ellipse
                  cx={UX}
                  cy={chamberY}
                  rx={chamberRx * (step === 6 ? 0.35 + 0.65 * ease(stepT / 3) : 1)}
                  ry={chamberRy * (step === 6 ? 0.35 + 0.65 * ease(stepT / 3) : 1)}
                  fill={`url(#${g("magma")})`}
                  stroke="#ffe0a0"
                  strokeWidth={1.4}
                />
              </g>
            ) : null}

            {/* Gang og vulkan */}
            {melts && step === 7 ? (
              <g>
                <path
                  d={dikeD}
                  fill="none"
                  stroke="#ff7a2e"
                  strokeWidth={5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeDasharray={`${dikeLen * dikeGrow} ${dikeLen}`}
                />
                <path
                  d={dikeD}
                  fill="none"
                  stroke="#ffe08a"
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                  strokeDasharray="6 10"
                  strokeDashoffset={-t * 30}
                  opacity={dikeGrow}
                />
                <g opacity={0.35 + 0.65 * dikeGrow}>
                  <path
                    d={`M ${UX - 64} ${SURF} Q ${UX - 30} ${SURF - 14} ${UX - 12} ${SURF - 36} Q ${UX} ${SURF - 31} ${UX + 12} ${SURF - 36} Q ${UX + 30} ${SURF - 14} ${UX + 64} ${SURF} Z`}
                    fill="#5b4a3e"
                    stroke="#8a7562"
                    strokeWidth={1.4}
                  />
                </g>
                {erupt ? (
                  <g>
                    <path
                      d={`M ${UX - 7} ${SURF - 33} Q ${UX - 24} ${SURF - 16} ${UX - 42} ${SURF - 3}`}
                      fill="none"
                      stroke="#ff7a2e"
                      strokeWidth={3.2}
                      strokeLinecap="round"
                    />
                    <path
                      d={`M ${UX + 7} ${SURF - 33} Q ${UX + 20} ${SURF - 18} ${UX + 32} ${SURF - 6}`}
                      fill="none"
                      stroke="#ff7a2e"
                      strokeWidth={2.6}
                      strokeLinecap="round"
                    />
                    <ellipse cx={UX} cy={SURF - 34} rx={11} ry={4} fill="#ffd27a" />
                    {[0, 0.33, 0.66].map((o) => {
                      const u = (t * 0.35 + o) % 1;
                      return (
                        <circle
                          key={o}
                          cx={UX + Math.sin(u * 5 + o * 9) * 6 + u * 20}
                          cy={SURF - 40 - u * 30}
                          r={5 + u * 10}
                          fill="#9aa3a8"
                          opacity={0.75 * (1 - u)}
                        />
                      );
                    })}
                  </g>
                ) : null}
              </g>
            ) : null}

            {/* Pakken som stiger */}
            {parcelZ !== null && parcelY < CMB_Y - 14 && step <= 5 ? (
              <g>
                <circle cx={UX} cy={parcelY} r={18} fill="#ffcf6b" opacity={0.18} />
                <circle cx={UX} cy={parcelY} r={11} fill="#c9653a" stroke="#ffe0a0" strokeWidth={2} />
                {parcelMelt > 0
                  ? [0, 1, 2, 3, 4, 5].map((k) =>
                      k < 1 + parcelMelt * 5 ? (
                        <circle
                          key={k}
                          cx={UX + Math.cos(k * 1.1) * 5.5}
                          cy={parcelY + Math.sin(k * 1.1) * 5.5}
                          r={1.8}
                          fill="#ffe08a"
                        />
                      ) : null,
                    )
                  : null}
              </g>
            ) : null}

            {/* Forstørrelse av kornene */}
            {showBubble && parcelZ !== null ? (
              <g>
                <line
                  x1={UX + 12}
                  y1={parcelY}
                  x2={bubble.x - bubble.r * 0.7}
                  y2={bubble.y - bubble.r * 0.7}
                  stroke={C.fg}
                  strokeWidth={1.4}
                  strokeDasharray="4 4"
                />
                <circle cx={bubble.x} cy={bubble.y} r={bubble.r + 3} fill="#0b1217" />
                <Grains cx={bubble.x} cy={bubble.y} r={bubble.r} melt={step === 5 ? parcelMelt : 0} clipId={g("bubble")} />
                <circle cx={bubble.x} cy={bubble.y} r={bubble.r} fill="none" stroke={C.fg} strokeWidth={2} />
                {step === 2
                  ? [
                      [bubble.x, bubble.y - bubble.r - 26, bubble.x, bubble.y - bubble.r - 6],
                      [bubble.x - bubble.r - 24, bubble.y, bubble.x - bubble.r - 6, bubble.y],
                      [bubble.x + bubble.r + 24, bubble.y, bubble.x + bubble.r + 6, bubble.y],
                    ].map(([x1, y1, x2, y2]) => (
                      <path
                        key={`${x1}-${y1}`}
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        stroke={C.fg}
                        strokeWidth={2.6}
                        markerEnd={`url(#${g("arwfg")})`}
                      />
                    ))
                  : null}
                <Tx x={W - 12} y={bubble.y + bubble.r + 28} anchor="end" pill>
                  {step === 2 ? "Fast bergart (peridotitt)" : parcelMelt > 0 ? "Smelte mellom kornene" : "Fortsatt fast"}
                </Tx>
                {step === 2 ? (
                  <Tx x={bubble.x} y={bubble.y - bubble.r - 34} anchor="middle" pill>
                    Høyt trykk
                  </Tx>
                ) : null}
              </g>
            ) : null}

            {/* Tykkelsespiler */}
            {step === 4 ? (
              <g>
                {[
                  [200, keelY, `${KEEL_KM} km`],
                  [600, thinY, `${plateKm} km`],
                ].map(([x, y, label]) => (
                  <g key={String(label) + String(x)}>
                    <path
                      d={`M ${x} ${SURF + 4} L ${x} ${Number(y) - 3}`}
                      stroke={C.fg}
                      strokeWidth={2.4}
                      markerEnd={`url(#${g("arwfg")})`}
                      markerStart={`url(#${g("arwfg")})`}
                    />
                  </g>
                ))}
                <Tx x={212} y={(SURF + keelY) / 2 + 30} pill>{`${KEEL_KM} km`}</Tx>
                <Tx x={588} y={Math.max((SURF + thinY) / 2 + 8, thinY - 30)} anchor="end" pill>{`${plateKm} km`}</Tx>
              </g>
            ) : null}

            {/* Etiketter */}
            <Tx x={14} y={30} size={22} fill={C.fg}>
              Tykk plate
            </Tx>
            <Tx x={14} y={56} size={21} fill={C.muted} weight={500}>
              litosfære, kald og stiv
            </Tx>
            <Tx x={W - 14} y={30} size={22} anchor="end" fill={C.fg}>
              Tynn plate
            </Tx>
            {step === 7 && melts ? (
              <>
                <Tx x={UX - 66} y={50} anchor="end" fill="#ffb35c">
                  Vulkan
                </Tx>
                <line
                  x1={UX + 62}
                  y1={SURF - 16}
                  x2={UX + 6}
                  y2={lerp(SURF, chamberY, 0.5)}
                  stroke="#ffb35c"
                  strokeWidth={1.6}
                />
                <Tx x={UX + 66} y={SURF - 9} fill="#ffb35c">
                  Gang
                </Tx>
              </>
            ) : null}
            {melts && step >= 6 ? (
              <g>
                <line
                  x1={UX + chamberRx * 0.6}
                  y1={chamberY + chamberRy * 0.6}
                  x2={W - 150}
                  y2={thinY + 26}
                  stroke="#ffcf6b"
                  strokeWidth={1.6}
                />
                <Tx x={W - 10} y={thinY + 34} anchor="end" fill="#ffcf6b" pill>
                  Magmakammer
                </Tx>
              </g>
            ) : null}
            {step >= 5 && melts ? (
              <Tx x={UX - 92} y={onsetY + 8} anchor="end" fill="#ffcf6b" pill>
                smelting starter
              </Tx>
            ) : null}
            {step >= 5 && !melts ? (
              <Tx x={W / 2 + 60} y={250} anchor="middle" fill="#ffcf6b" pill>
                Platen er for tykk: ingen smelting
              </Tx>
            ) : null}
            {step === 1 ? (
              <>
                <Tx x={150} y={keelY + 34} pill fill="#ffcf9a">
                  ca. 1250 °C øverst
                </Tx>
                <Tx x={150} y={CMB_Y - 40} pill fill="#ffe08a">
                  ca. 3370 °C nederst
                </Tx>
                <Tx x={W / 2} y={410} anchor="middle" pill size={22}>
                  Mantel
                </Tx>
              </>
            ) : null}
            {step === 3 ? (
              <>
                <Tx x={UX - 26} y={372} anchor="end" pill fill="#ffcf6b">
                  Varm mantel stiger
                </Tx>
                <Tx x={88} y={446} pill fill="#a9cdf2">
                  Kald mantel synker
                </Tx>
              </>
            ) : null}
            <Tx x={W / 2} y={H - 18} anchor="middle" size={22} fill="#3a1a06" weight={700}>
              Kjernen
            </Tx>

            {/* Dybdeskala */}
            {[
              [100, "100 km"],
              [200, "200 km"],
              [2900, "2900 km"],
            ].map(([z, label]) => {
              const y = zToY(Number(z)) + (z === 2900 ? -10 : 0);
              return (
                <g key={String(z)}>
                  <line x1={0} x2={10} y1={y} y2={y} stroke={C.fg} strokeWidth={2} />
                  <Tx x={14} y={y + 7} weight={500} fill={C.fg} pill>
                    {String(label)}
                  </Tx>
                </g>
              );
            })}
          </svg>

          <PtInset
            uid={uid}
            step={step}
            plateKm={plateKm}
            parcelZ={parcelZ}
            parcelMelt={parcelMelt}
            melt={melt}
          />
        </div>
      </div>
    </FigureFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Innfelt trykk–temperatur-diagram                                    */
/* ------------------------------------------------------------------ */

const IW = 360;
const IH = 452;
const X0 = 66;
const X1 = 340;
const Y0 = 52;
const Y1 = 352;
const TMIN = 1000;
const TMAX = 1800;
const ZMAX = 220;
const tx = (T: number) => X0 + ((T - TMIN) / (TMAX - TMIN)) * (X1 - X0);
const zy = (z: number) => Y0 + (z / ZMAX) * (Y1 - Y0);

function PtInset({
  uid,
  step,
  plateKm,
  parcelZ,
  parcelMelt,
  melt,
}: {
  uid: string;
  step: number;
  plateKm: number;
  parcelZ: number | null;
  parcelMelt: number;
  melt: number;
}) {
  const curves = useMemo(() => {
    const sol: string[] = [];
    const ad: string[] = [];
    for (let z = 0; z <= ZMAX; z += 4) {
      sol.push(`${tx(Math.min(solidusAt(z), TMAX)).toFixed(1)} ${zy(z).toFixed(1)}`);
      ad.push(`${tx(mantleTempAt(z)).toFixed(1)} ${zy(z).toFixed(1)}`);
    }
    return {
      sol: `M ${sol.join(" L ")}`,
      field: `M ${sol.join(" L ")} L ${X1} ${Y1} L ${X1} ${Y0} Z`,
      ad: `M ${ad.join(" L ")}`,
    };
  }, []);

  const showMarker = parcelZ !== null && parcelZ <= ZMAX && step >= 2;
  const mz = parcelZ ?? 0;
  const mTemp = mantleTempAt(mz);
  const onsetX = tx(mantleTempAt(MELT_ONSET_KM));
  const onsetYv = zy(MELT_ONSET_KM);
  const plateY = zy(plateKm);
  const id = (s: string) => `${uid}-pt-${s}`;
  const state =
    parcelZ === null
      ? null
      : parcelZ > ZMAX
        ? "Dypt nede: fast"
        : parcelMelt > 0
          ? "Delvis smeltet"
          : "Fast bergart";
  const meltWord = melt <= 0 ? "ingen" : melt < 0.35 ? "litt" : melt < 0.7 ? "mer" : "mest";

  return (
    <div className="mx-auto w-full max-w-[22.5rem]">
      <svg viewBox={`0 0 ${IW} ${IH}`} className="h-auto w-full" role="img" aria-labelledby={id("t")}>
        <title id={id("t")}>
          Dyp–temperatur-diagram med solidus og mantelens temperatur. Markøren viser den stigende mantelen.
        </title>
        <defs>
          <clipPath id={id("clip")}>
            <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} />
          </clipPath>
        </defs>
        <rect width={IW} height={IH} rx="10" fill={C.bg} />
        <text x={IW / 2} y={28} fill={C.fg} fontSize={17} fontFamily={font} fontWeight={700} textAnchor="middle">
          Dyp, temperatur og smelting
        </text>
        <g clipPath={`url(#${id("clip")})`}>
          <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="#16222a" />
          <path d={curves.field} fill="#ff8a3d" opacity={0.2} />
          <rect x={X0} y={Y0} width={X1 - X0} height={plateY - Y0} fill="#8eb4d4" opacity={0.16} />
        </g>
        {/* rutenett */}
        {[1200, 1400, 1600].map((T) => (
          <line key={T} x1={tx(T)} x2={tx(T)} y1={Y0} y2={Y1} stroke="#ffffff" strokeOpacity={0.07} />
        ))}
        {[50, 100, 150, 200].map((z) => (
          <line key={z} x1={X0} x2={X1} y1={zy(z)} y2={zy(z)} stroke="#ffffff" strokeOpacity={0.07} />
        ))}
        <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="none" stroke={C.muted} strokeWidth={1.2} />

        <line x1={X0} x2={X1} y1={plateY} y2={plateY} stroke="#9fb7c9" strokeWidth={2} strokeDasharray="6 4" />
        <text x={X0 + 6} y={plateY + 18} fill="#bcd2e2" fontSize={14} fontFamily={font} fontWeight={600}>
          platens bunn
        </text>

        <g clipPath={`url(#${id("clip")})`}>
          <path d={curves.sol} fill="none" stroke="#ff6b4a" strokeWidth={3} />
          <path d={curves.ad} fill="none" stroke="#ffcf6b" strokeWidth={3} strokeDasharray="8 5" />
        </g>
        <text x={X1 - 6} y={Y0 + 20} fill="#ffb08a" fontSize={15} fontFamily={font} fontWeight={700} textAnchor="end">
          delvis smelte
        </text>
        <text x={X0 + 6} y={Y1 - 10} fill={C.fg} fontSize={15} fontFamily={font} fontWeight={700}>
          fast bergart
        </text>

        {step >= 5 ? (
          <g>
            <circle cx={onsetX} cy={onsetYv} r={5} fill="none" stroke="#ffcf6b" strokeWidth={2} />
          </g>
        ) : null}

        {step >= 4 ? (
          <g>
            <circle cx={tx(mantleTempAt(KEEL_KM))} cy={zy(KEEL_KM)} r={7} fill="#8b9aa6" stroke={C.fg} strokeWidth={1.5} />
            {Math.abs(plateKm - KEEL_KM) > 18 ? (
              <Tx x={tx(mantleTempAt(KEEL_KM)) - 12} y={zy(KEEL_KM) + 5} size={14} anchor="end" pill>
                under tykk plate
              </Tx>
            ) : null}
          </g>
        ) : null}

        {showMarker ? (
          <g>
            <circle cx={tx(mTemp)} cy={zy(mz)} r={13} fill="#ffcf6b" opacity={0.25} />
            <circle
              cx={tx(mTemp)}
              cy={zy(mz)}
              r={7.5}
              fill={parcelMelt > 0 ? "#ff8a3d" : "#c9653a"}
              stroke="#ffe0a0"
              strokeWidth={2}
            />
            {step >= 4 ? (
              <Tx x={tx(mTemp) + 16} y={zy(mz) + 5} size={14} fill="#ffe0a0" weight={700} pill>
                stigende mantel
              </Tx>
            ) : null}
          </g>
        ) : null}

        {/* akser */}
        {[1000, 1200, 1400, 1600, 1800].map((T) => (
          <text key={T} x={tx(T)} y={Y1 + 20} fill={C.muted} fontSize={14} fontFamily={font} textAnchor="middle">
            {T}
          </text>
        ))}
        {[0, 50, 100, 150, 200].map((z) => (
          <text key={z} x={X0 - 8} y={zy(z) + 5} fill={C.muted} fontSize={14} fontFamily={font} textAnchor="end">
            {z}
          </text>
        ))}
        <text x={(X0 + X1) / 2} y={Y1 + 44} fill={C.fg} fontSize={15} fontFamily={font} fontWeight={600} textAnchor="middle">
          Temperatur (°C)
        </text>
        <g transform={`translate(18 ${(Y0 + Y1) / 2}) rotate(-90)`}>
          <text fill={C.fg} fontSize={15} fontFamily={font} fontWeight={600} textAnchor="middle">
            Dyp (km)
          </text>
        </g>
        <line x1={X0} x2={X0 + 30} y1={414} y2={414} stroke="#ff6b4a" strokeWidth={3} />
        <text x={X0 + 38} y={419} fill={C.fg} fontSize={14} fontFamily={font}>
          solidus (smeltepunktet)
        </text>
        <line x1={X0} x2={X0 + 30} y1={438} y2={438} stroke="#ffcf6b" strokeWidth={3} strokeDasharray="8 5" />
        <text x={X0 + 38} y={443} fill={C.fg} fontSize={14} fontFamily={font}>
          mantelens temperatur
        </text>
      </svg>
      <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground" aria-live="polite">
        {state ? (
          <p data-testid="pt-readout">
            <span className="font-semibold">Mantelen:</span>{" "}
            {parcelZ !== null && parcelZ <= ZMAX
              ? `${nb(parcelZ)} km dyp · ca. ${nb(parcelZ / KM_PER_GPA, 1)} GPa · ca. ${nb(Math.round(mTemp / 10) * 10)} °C · `
              : ""}
            <span className={parcelMelt > 0 ? "font-semibold text-orange-400" : "font-semibold"}>{state}</span>
          </p>
        ) : (
          <p>Følg den stigende mantelen fra trinn 2.</p>
        )}
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap font-semibold">Smelte under platen:</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <span className="block h-full rounded-full bg-orange-400" style={{ width: `${Math.round(melt * 100)}%` }} />
          </span>
          <span className="w-10 text-right">{meltWord}</span>
        </div>
        <p className="text-muted-foreground">
          Forenklede kurver. Dypere ned betyr mer bergart over og høyere trykk.
        </p>
      </div>
    </div>
  );
}
