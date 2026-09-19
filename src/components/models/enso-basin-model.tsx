import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type Phase = "elnino" | "lanina";

const PERIOD_MS = 20000;
const SNAP_MS = 900;
const SURFACE_Y = 334;
const BOTTOM_Y = 578;
const CUT_L = 128;
const CUT_R = 1036;
const PX_PER_M = (BOTTOM_Y - SURFACE_Y) / 500;

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(x: number) {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

/** La Niña = −1, nøytral = 0, El Niño = +1. */
function lerp3(lanina: number, neutral: number, elnino: number, index: number) {
  if (index < 0) return lerp(lanina, neutral, index + 1);
  return lerp(neutral, elnino, index);
}

function cycleWave(t: number) {
  const u = ((t % 1) + 1) % 1;
  if (u < 0.24) return 1;
  if (u < 0.5) return 1 - smoothstep((u - 0.24) / 0.26) * 2;
  if (u < 0.74) return -1;
  return -1 + smoothstep((u - 0.74) / 0.26) * 2;
}

function offsetForIndex(index: number) {
  if (index >= 0.5) return 0.08 * PERIOD_MS;
  if (index <= -0.5) return 0.58 * PERIOD_MS;
  return 0.37 * PERIOD_MS;
}

function depthY(meters: number) {
  return SURFACE_Y + meters * PX_PER_M;
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function mixRgb(a: number[], b: number[], t: number) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function tempToColor(temp: number) {
  const stops: [number, number[]][] = [
    [18, [8, 47, 73]],
    [21, [12, 74, 110]],
    [23.5, [14, 116, 144]],
    [25.5, [6, 182, 212]],
    [27.2, [253, 224, 71]],
    [28.4, [251, 146, 60]],
    [29.4, [234, 88, 12]],
    [30.5, [185, 28, 28]],
  ];
  if (temp <= stops[0][0]) return rgb(stops[0][1][0], stops[0][1][1], stops[0][1][2]);
  for (let i = 1; i < stops.length; i++) {
    if (temp <= stops[i][0]) {
      const span = stops[i][0] - stops[i - 1][0];
      const t = (temp - stops[i - 1][0]) / span;
      const c = mixRgb(stops[i - 1][1], stops[i][1], t);
      return rgb(c[0], c[1], c[2]);
    }
  }
  const last = stops[stops.length - 1][1];
  return rgb(last[0], last[1], last[2]);
}

function sstAt(frac: number, index: number) {
  const west = lerp3(30.4, 29.5, 27.0, index);
  const east = lerp3(18.8, 21.8, 29.1, index);
  const center = lerp3(0.2, 0.3, 0.7, index);
  const width = lerp3(0.28, 0.42, 0.64, index);
  const g = Math.exp(-(((frac - center) / width) ** 2));
  const linear = lerp(west, east, frac);
  return linear * 0.38 + (19.2 + 11.6 * g) * 0.62;
}

function thermoDepth(frac: number, index: number) {
  const west = lerp3(215, 155, 108, index);
  const east = lerp3(32, 58, 172, index);
  const mid = lerp3(128, 98, 122, index);
  const base = (1 - frac) * (1 - frac) * west + 2 * (1 - frac) * frac * mid + frac * frac * east;
  const eastBulge = Math.max(0, index) * 48 * Math.exp(-(((frac - 0.86) / 0.16) ** 2));
  return base + eastBulge;
}

function thermoPath(index: number) {
  const steps = 18;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const x = lerp(CUT_L, CUT_R, f);
    const y = depthY(thermoDepth(f, index));
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function Marker({ id, color }: { id: string; color: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 12 12"
      refX="10"
      refY="6"
      markerWidth="7"
      markerHeight="7"
      orient="auto"
    >
      <path d="M0 1.4 L11 6 L0 10.6 z" fill={color} />
    </marker>
  );
}

/** Path geometry sets direction; dash animation always runs toward markerEnd. */
function FlowArrow({
  d,
  color,
  width,
  markerId,
  opacity = 1,
}: {
  d: string;
  color: string;
  width: number;
  markerId: string;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      markerEnd={`url(#${markerId})`}
      className="enso-flow"
      opacity={opacity}
    />
  );
}

function CloudBank({
  x,
  y,
  scale = 1,
  storm = 0,
  rain = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  storm?: number;
  rain?: number;
}) {
  const body = storm > 0.55 ? "#64748b" : "#dbe7f0";
  const mid = storm > 0.55 ? "#475569" : "#c5d4e0";
  const top = storm > 0.55 ? "#334155" : "#eef4f8";
  const flash = storm * rain;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="enso-cloud">
      <ellipse cx="-8" cy="10" rx="78" ry="26" fill="#0f172a" opacity="0.08" />
      <ellipse cx="0" cy="6" rx="72" ry="28" fill={body} />
      <ellipse cx="-48" cy="10" rx="38" ry="20" fill={mid} />
      <ellipse cx="50" cy="8" rx="42" ry="22" fill={mid} />
      <ellipse cx="-10" cy="-12" rx="48" ry="24" fill={top} />
      <ellipse cx="28" cy="-8" rx="36" ry="20" fill={body} />
      {rain > 0.08 ? (
        <g className="enso-rain-drop" opacity={0.35 + rain * 0.65}>
          {[-52, -36, -18, 0, 18, 36, 52, -26, 10, 44].map((dx, i) => (
            <line
              key={dx}
              x1={dx}
              y1={28 + (i % 3) * 4}
              x2={dx - 5}
              y2={58 + (i % 3) * 6}
              stroke={storm > 0.5 ? "#64748b" : "#38bdf8"}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ))}
        </g>
      ) : null}
      {flash > 0.45 ? (
        <path
          className="enso-lightning"
          d="M 12 -6 L 2 14 L 14 14 L 0 42"
          fill="none"
          stroke="#fde047"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ) : null}
      </g>
    </g>
  );
}

function DroughtMarker({ x, y, opacity }: { x: number; y: number; opacity: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity} pointerEvents="none">
      <ellipse cx="0" cy="18" rx="28" ry="10" fill="#b45309" opacity="0.35" />
      <circle cx="0" cy="8" r="16" fill="#d6a36a" stroke="#a16207" strokeWidth="1.2" />
      <path
        d="M -9 4 L -2 10 M 4 0 L 10 8 M -4 14 L 6 12 M 0 -2 L 1 16"
        stroke="#7c4a1e"
        strokeWidth="1.4"
        fill="none"
      />
      <path d="M 0 -28 L 0 0" stroke="#b91c1c" strokeWidth="2.4" />
      <circle cx="0" cy="-32" r="7" fill="#dc2626" />
      <text x="22" y="4" fill="#7f1d1d" fontSize="13" fontWeight={700} fontFamily="Source Sans 3, sans-serif">
        Alvorlig tørke
      </text>
    </g>
  );
}

export function EnsoBasinModel() {
  const uid = useId().replace(/:/g, "");
  const [index, setIndex] = useState(1);
  const [playing, setPlaying] = useState(true);
  const indexRef = useRef(1);
  const playRef = useRef(true);
  const cycleStartRef = useRef<number | null>(null);
  const snapRef = useRef<{ from: number; to: number; start: number } | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    playRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setPlaying(false);
      return;
    }

    let raf = 0;
    const tick = (now: number) => {
      const snap = snapRef.current;
      if (snap) {
        const u = clamp((now - snap.start) / SNAP_MS, 0, 1);
        const next = lerp(snap.from, snap.to, smoothstep(u));
        setIndex(next);
        if (u >= 1) snapRef.current = null;
      } else if (playRef.current) {
        if (cycleStartRef.current == null) {
          cycleStartRef.current = now - offsetForIndex(indexRef.current);
        }
        const t = (now - cycleStartRef.current) / PERIOD_MS;
        setIndex(cycleWave(t));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const snapTo = (to: number) => {
    setPlaying(false);
    playRef.current = false;
    cycleStartRef.current = null;
    snapRef.current = { from: indexRef.current, to, start: performance.now() };
  };

  const togglePlay = () => {
    const next = !playing;
    if (next) {
      snapRef.current = null;
      cycleStartRef.current = null;
    } else {
      cycleStartRef.current = null;
    }
    setPlaying(next);
  };

  const elNino = clamp(index, 0, 1);
  const laNina = clamp(-index, 0, 1);
  const phase: Phase = index >= 0 ? "elnino" : "lanina";
  const title = index >= 0 ? "El Niño-tilstand" : "La Niña-tilstand";
  const walkerLabel =
    index >= 0.25
      ? "Forskjøvet Walker-sirkulasjon (oppstigning flyttet øst)"
      : index <= -0.25
        ? "Forsterket Walker-sirkulasjon"
        : "Walker-sirkulasjonen (nøytral)";

  const sstStops = useMemo(() => {
    return [0, 0.18, 0.36, 0.52, 0.68, 0.84, 1].map((f) => ({
      offset: `${f * 100}%`,
      color: tempToColor(sstAt(f, index)),
    }));
  }, [index]);

  const thermo = thermoPath(index);
  const warmFill = `${thermo} L ${CUT_R} ${SURFACE_Y} L ${CUT_L} ${SURFACE_Y} Z`;
  const coldFill = `${thermo} L ${CUT_R} ${BOTTOM_Y} L ${CUT_L} ${BOTTOM_Y} Z`;

  const poolX = lerp(CUT_L, CUT_R, lerp3(0.22, 0.32, 0.68, index));
  const poolRx = lerp3(150, 210, 310, index);
  const convectionX = lerp(210, 860, lerp3(0.08, 0.16, 0.62, index));
  const eastStorm = elNino;
  const westStorm = laNina;
  const classicWalker = clamp(1 - index, 0, 1);
  const reversedWalker = elNino;
  const upwell = lerp3(1, 0.55, 0.12, index);
  const tradeArrows = [0.18, 0.34, 0.5, 0.66, 0.82].map((f, i) => {
    const x = lerp(CUT_L + 50, CUT_R - 50, f);
    const y = 292 + (i % 2) * 8;
    const towardEast = lerp3(-1.35, -0.9, f < 0.7 ? 0.9 : -0.4, index);
    const strength = Math.abs(towardEast);
    const dir = towardEast >= 0 ? 1 : -1;
    const len = 58 * strength;
    return {
      key: i,
      d: `M ${x - dir * len * 0.5} ${y} L ${x + dir * len * 0.5} ${y}`,
      width: 1.6 + strength,
      opacity: 0.4 + 0.55 * strength,
    };
  });
  const oni = (index * 2.05).toFixed(1);
  const westSst = sstAt(0.12, index).toFixed(1);
  const eastSst = sstAt(0.9, index).toFixed(1);

  const note =
    index >= 0
      ? "Passatene slakker. Varmt overflatevann brer seg østover, termoklinen flater ut, og oppvellingen utenfor Peru henter lunkent vann. Konveksjonen flytter mot sentralt og østlig Stillehav — tørke i Indonesia, flom i Peru."
      : "Passatene er unormalt sterke. Varmtvannet stables i vest, termoklinen står bratt og grunn i øst, og oppvellingen utenfor Peru er kraftig. Monsun og flom i Indonesia og Australia, tørke langs Peru.";

  const tradeCaption =
    index >= 0.25
      ? "Vestavind i vest/sentralt Stillehav → · svekket passat nær Sør-Amerika ←"
      : index <= -0.25
        ? "← Ekstra sterke passatvinder (øst mot vest)"
        : "← Passatvinder (øst mot vest)";

  return (
    <ModelFrame
      kicker="Interaktiv 3D-animasjon"
      title="El Niño og La Niña i tropisk Stillehav"
      lead="Samme snitt som lærebokfiguren: vest (Indonesia/Australia) til venstre, øst (Peru) til høyre. Pilene følger NOAA Climate.gov / PMEL og NASA: klassisk Walker (opp i vest, øvre strøm mot øst, ned i øst) ved La Niña; forskjøvet celle med nedsynking over Indonesia og oppstigning over sentralt/østlig tropisk hav ved El Niño."
      toolbar={
        <div className="flex flex-wrap gap-2">
          <ModelTab active={phase === "elnino"} onClick={() => snapTo(1)}>
            El Niño
          </ModelTab>
          <ModelTab active={phase === "lanina"} onClick={() => snapTo(-1)}>
            La Niña
          </ModelTab>
          <Button type="button" size="sm" variant="secondary" onClick={togglePlay} aria-pressed={playing}>
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Spill av"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <ModelPanel>
            <label className="flex justify-between gap-3 text-sm font-medium">
              <span>ENSO-fase</span>
              <span className={index >= 0 ? "text-lava" : "text-sky-300"}>
                {index >= 0 ? `El Niño · ONI ≈ +${oni} °C` : `La Niña · ONI ≈ ${oni} °C`}
              </span>
            </label>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={index}
              onChange={(e) => {
                setPlaying(false);
                playRef.current = false;
                cycleStartRef.current = null;
                snapRef.current = null;
                setIndex(Number(e.target.value));
              }}
              className="mt-3 w-full accent-primary"
              aria-valuemin={-1}
              aria-valuemax={1}
              aria-valuenow={Number(index.toFixed(2))}
              aria-label="ENSO-indeks fra La Niña til El Niño"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>La Niña</span>
              <span>Nøytral</span>
              <span>El Niño</span>
            </div>
          </ModelPanel>

          <ModelNote title={title} tone={index >= 0 ? "warm" : "teal"}>
            <p>{note}</p>
            <p className="pt-1">
              Vestlig SST ≈ {westSst} °C · Østlig SST ≈ {eastSst} °C · Termoklin i øst ≈{" "}
              {Math.round(thermoDepth(0.92, index))} m
            </p>
          </ModelNote>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-[#f4f1ea]">
          <svg
            viewBox="0 0 1120 640"
            className={`mx-auto h-auto w-full ${playing ? "" : "model-paused"}`}
            role="img"
            aria-label={`${title}. ${walkerLabel}. ${note}`}
          >
            <title>{title}</title>
            <defs>
              <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={index >= 0 ? "#e7d7a8" : "#9bb8d4"} />
                <stop offset="42%" stopColor={index >= 0 ? "#cfe0ee" : "#7fa3c4"} />
                <stop offset="100%" stopColor={index >= 0 ? "#8aa4bb" : "#d7c89a"} />
              </linearGradient>
              <linearGradient id={`${uid}-skyv`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d7e8f5" />
                <stop offset="100%" stopColor="#f3e6c4" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id={`${uid}-sst`} x1="0" y1="0" x2="1" y2="0">
                {sstStops.map((s) => (
                  <stop key={s.offset} offset={s.offset} stopColor={s.color} />
                ))}
              </linearGradient>
              <radialGradient id={`${uid}-pool`} cx="50%" cy="45%" r="58%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#ea580c" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${uid}-warm`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={index >= 0 ? "#fb923c" : "#f59e0b"} />
                <stop offset="55%" stopColor={index >= 0 ? "#f97316" : "#0e7490"} />
                <stop offset="100%" stopColor={index >= 0 ? "#ea580c" : "#0369a1"} />
              </linearGradient>
              <linearGradient id={`${uid}-cold`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e7490" />
                <stop offset="55%" stopColor="#0c4a6e" />
                <stop offset="100%" stopColor="#082f49" />
              </linearGradient>
              <linearGradient id={`${uid}-crust`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a1835c" />
                <stop offset="40%" stopColor="#7c6244" />
                <stop offset="100%" stopColor="#4d3b2a" />
              </linearGradient>
              <linearGradient id={`${uid}-land`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6b8f4a" />
                <stop offset="100%" stopColor="#3f5d2c" />
              </linearGradient>
              <clipPath id={`${uid}-surface`}>
                <polygon points="208,244 938,244 1028,332 122,332" />
              </clipPath>
              <clipPath id={`${uid}-cut`}>
                <rect x={CUT_L} y={SURFACE_Y} width={CUT_R - CUT_L} height={BOTTOM_Y - SURFACE_Y} />
              </clipPath>
              <Marker id={`${uid}-blue`} color="#2563eb" />
              <Marker id={`${uid}-steel`} color="#334155" />
              <Marker id={`${uid}-trade`} color="#1e3a5f" />
              <Marker id={`${uid}-up`} color="#38bdf8" />
              <Marker id={`${uid}-warmarr`} color="#c2410c" />
            </defs>

            <rect x="18" y="16" width="1084" height="608" rx="14" fill="#f7f4ee" />
            <text
              x="560"
              y="44"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="22"
              fontWeight={700}
              fontFamily="Fraunces, Georgia, serif"
            >
              {title}
            </text>

            <rect x="70" y="58" width="980" height="274" rx="8" fill={`url(#${uid}-sky)`} />
            <rect x="70" y="58" width="980" height="274" rx="8" fill={`url(#${uid}-skyv)`} />

            <text
              x="92"
              y="200"
              fill="#334155"
              fontSize="15"
              fontWeight={800}
              fontFamily="Source Sans 3, sans-serif"
            >
              Vestlige
            </text>
            <text
              x="92"
              y="218"
              fill="#334155"
              fontSize="15"
              fontWeight={800}
              fontFamily="Source Sans 3, sans-serif"
            >
              Stillehav
            </text>
            <text
              x="1008"
              y="200"
              textAnchor="end"
              fill="#334155"
              fontSize="15"
              fontWeight={800}
              fontFamily="Source Sans 3, sans-serif"
            >
              Østlige
            </text>
            <text
              x="1008"
              y="218"
              textAnchor="end"
              fill="#334155"
              fontSize="15"
              fontWeight={800}
              fontFamily="Source Sans 3, sans-serif"
            >
              Stillehav
            </text>

            {/* Walker: én celle om gangen. Klassisk = La Niña/nøytral (NOAA Climate.gov).
                El Niño = forskjøvet/reversert stillehavscelle: nedsynking over Indonesia,
                oppstigning over sentralt/østlig tropisk hav, øvre retur mot vest. */}
            <g opacity={classicWalker}>
              <FlowArrow
                d="M 250 208 L 250 98"
                color="#2563eb"
                width={2.2 + laNina * 1.2}
                markerId={`${uid}-blue`}
              />
              <FlowArrow
                d="M 268 92 L 800 92"
                color="#334155"
                width={2 + laNina * 0.8}
                markerId={`${uid}-steel`}
              />
              <FlowArrow
                d="M 820 98 L 820 208"
                color="#334155"
                width={2.2 + laNina * 1.2}
                markerId={`${uid}-steel`}
              />
              <text
                x="530"
                y="84"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="12"
                fontWeight={700}
                fontFamily="Source Sans 3, sans-serif"
              >
                Øvre returstrøm mot øst →
              </text>
            </g>
            <g opacity={reversedWalker}>
              <FlowArrow d="M 250 98 L 250 208" color="#334155" width={2.6} markerId={`${uid}-steel`} />
              <FlowArrow d="M 760 208 L 760 98" color="#2563eb" width={2.8} markerId={`${uid}-blue`} />
              <FlowArrow d="M 742 92 L 268 92" color="#334155" width={2.4} markerId={`${uid}-steel`} />
              <text
                x="470"
                y="84"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="12"
                fontWeight={700}
                fontFamily="Source Sans 3, sans-serif"
              >
                ← Øvre returstrøm mot vest
              </text>
            </g>

            <text
              x="560"
              y="64"
              textAnchor="middle"
              fill="#1e293b"
              fontSize="15"
              fontWeight={700}
              fontFamily="Source Sans 3, sans-serif"
            >
              {walkerLabel}
            </text>
            <text
              x="232"
              y="102"
              textAnchor="middle"
              fill="#334155"
              fontSize="12.5"
              fontWeight={600}
              fontFamily="Source Sans 3, sans-serif"
              opacity={0.35 + Math.max(elNino, laNina) * 0.65}
            >
              {index >= 0 ? "Synkende luft" : "Oppstigende luft"}
            </text>
            <text
              x={index >= 0 ? 760 : 868}
              y="96"
              textAnchor="middle"
              fill="#1e293b"
              fontSize="12.5"
              fontWeight={700}
              fontFamily="Source Sans 3, sans-serif"
              opacity={0.25 + Math.max(elNino, laNina) * 0.75}
            >
              {index >= 0 ? "Konveksjon over sentralt/østlig hav" : "Synkende luft"}
            </text>
            <text
              x="760"
              y="112"
              textAnchor="middle"
              fill="#1e293b"
              fontSize="12.5"
              fontWeight={600}
              fontFamily="Source Sans 3, sans-serif"
              opacity={elNino}
            >
              (regn når kysten av Peru)
            </text>

            <CloudBank
              x={convectionX}
              y={128}
              scale={lerp3(1.15, 1, 1.08, index)}
              storm={0.25 + eastStorm * 0.7 + westStorm * 0.35}
              rain={0.15 + Math.max(eastStorm, westStorm) * 0.85}
            />
            <CloudBank
              x={index >= 0 ? 250 : 820}
              y={150}
              scale={0.48}
              storm={0.05}
              rain={0}
            />

            <DroughtMarker x={168} y={168} opacity={elNino} />
            <g opacity={laNina} transform="translate(168 168)">
              <text x="0" y="0" fill="#0f172a" fontSize="13" fontWeight={700} fontFamily="Source Sans 3, sans-serif">
                Flom i Indonesia
              </text>
              <text x="0" y="16" fill="#0f172a" fontSize="13" fontWeight={600} fontFamily="Source Sans 3, sans-serif">
                og Australia
              </text>
            </g>
            <text
              x="990"
              y="148"
              textAnchor="end"
              fill="#1e3a5f"
              fontSize="13"
              fontWeight={700}
              fontFamily="Source Sans 3, sans-serif"
              opacity={elNino}
            >
              Flom langs kysten
            </text>
            <text
              x="990"
              y="164"
              textAnchor="end"
              fill="#1e3a5f"
              fontSize="13"
              fontWeight={700}
              fontFamily="Source Sans 3, sans-serif"
              opacity={elNino}
            >
              av Peru og Ecuador
            </text>
            <text
              x="990"
              y="148"
              textAnchor="end"
              fill="#7f1d1d"
              fontSize="13"
              fontWeight={700}
              fontFamily="Source Sans 3, sans-serif"
              opacity={laNina}
            >
              Tørke i kyst-Peru
            </text>

            {/* Venstre skorpeblokk */}
            <path d="M 70 332 L 122 332 L 208 244 L 150 244 Z" fill="#6f8a4e" />
            <path d="M 70 332 L 122 332 L 122 578 L 70 548 Z" fill={`url(#${uid}-crust)`} />
            <path d="M 70 548 L 122 578 L 122 578 L 70 548 Z" fill="#3f3224" />

            {/* Høyre skorpeblokk */}
            <path d="M 1028 332 L 1050 332 L 980 244 L 938 244 Z" fill="#5d7a42" />
            <path d="M 1028 332 L 1050 332 L 1050 548 L 1028 578 Z" fill={`url(#${uid}-crust)`} />

            {/* Havoverflate */}
            <polygon points="208,244 938,244 1028,332 122,332" fill={`url(#${uid}-sst)`} />
            <g clipPath={`url(#${uid}-surface)`}>
              <ellipse
                cx={poolX}
                cy="286"
                rx={poolRx}
                ry="46"
                fill={`url(#${uid}-pool)`}
                opacity={0.55 + elNino * 0.35}
                className="enso-pool"
              />
              <path
                d="M 180 268 Q 360 258 560 270 T 980 276"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.18"
                strokeWidth="6"
                className="enso-wave"
              />
            </g>
            <polygon
              points="208,244 938,244 1028,332 122,332"
              fill="none"
              stroke="#0e7490"
              strokeWidth="1.4"
            />

            {/* Passatvinder: easterlies = mot vest. El Niño: vestavind i vest/sentralt
                Stillehav, svekket easterly nær Sør-Amerika (NASA 2015/16, NOAA PMEL). */}
            <g>
              {tradeArrows.map((p) => (
                <FlowArrow
                  key={p.key}
                  d={p.d}
                  color="#1e3a5f"
                  width={p.width}
                  markerId={`${uid}-trade`}
                  opacity={p.opacity}
                />
              ))}
              <text
                x="560"
                y="268"
                textAnchor="middle"
                fill="#0f172a"
                fontSize="12.5"
                fontWeight={700}
                fontFamily="Source Sans 3, sans-serif"
              >
                {tradeCaption}
              </text>
            </g>

            {/* Land: Indonesia + Australia */}
            <g>
              <ellipse cx="168" cy="262" rx="42" ry="16" fill={`url(#${uid}-land)`} />
              <ellipse cx="198" cy="250" rx="28" ry="12" fill="#4d7036" />
              <ellipse cx="148" cy="248" rx="22" ry="10" fill="#567a3c" />
              <path
                d="M 150 302 C 178 294, 230 300, 242 322 C 228 342, 176 348, 148 338 C 132 324, 136 308, 150 302 Z"
                fill={`url(#${uid}-land)`}
                stroke="#355227"
                strokeWidth="1"
              />
              <text x="168" y="258" fill="#f8fafc" fontSize="11" fontWeight={700} textAnchor="middle">
                Indonesia
              </text>
              <text x="188" y="328" fill="#f8fafc" fontSize="11" fontWeight={700} textAnchor="middle">
                Australia
              </text>
            </g>

            {/* Sør-Amerika */}
            <path
              d="M 968 250 C 1010 242, 1058 268, 1062 318 C 1054 360, 1018 372, 986 350 C 968 328, 958 278, 968 250 Z"
              fill={`url(#${uid}-land)`}
              stroke="#355227"
              strokeWidth="1.1"
            />
            <path
              d="M 990 258 C 1004 270, 1010 310, 1004 348"
              fill="none"
              stroke="#2f4a24"
              strokeWidth="3.2"
              opacity="0.45"
            />
            <text x="1018" y="300" fill="#f8fafc" fontSize="12" fontWeight={700} textAnchor="middle">
              Peru
            </text>
            <text x="1022" y="316" fill="#e2e8f0" fontSize="11" fontWeight={600} textAnchor="middle">
              Sør-Amerika
            </text>

            {/* Frontsnitt av vannsøylen */}
            <g clipPath={`url(#${uid}-cut)`}>
              <path d={coldFill} fill={`url(#${uid}-cold)`} />
              <path d={warmFill} fill={`url(#${uid}-warm)`} opacity="0.92" />
              <path
                d={thermo}
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <rect
              x={CUT_L}
              y={SURFACE_Y}
              width={CUT_R - CUT_L}
              height={BOTTOM_Y - SURFACE_Y}
              fill="none"
              stroke="#3f3a32"
              strokeWidth="1.2"
            />

            <text
              x="430"
              y={depthY(lerp3(150, 118, 148, index)) + 18}
              fill="#e0f2fe"
              fontSize="14"
              fontWeight={800}
              fontFamily="Source Sans 3, sans-serif"
            >
              Termoklin ({index >= 0 ? "utdypet og utflatet" : "bratt, grunn i øst"})
            </text>
            <text
              x={index >= 0 ? 560 : 320}
              y={SURFACE_Y + 28}
              textAnchor="middle"
              fill="#fff7ed"
              fontSize="15"
              fontWeight={800}
              fontFamily="Source Sans 3, sans-serif"
              opacity={0.55 + Math.abs(index) * 0.45}
            >
              {index >= 0 ? "Varmt overflatevann > 28 °C" : "Varmt basseng i vest"}
            </text>

            <g opacity={elNino}>
              <path
                d={`M 900 ${depthY(110)} C 940 ${depthY(150)}, 980 ${depthY(175)}, 1020 ${depthY(188)}`}
                fill="none"
                stroke="#fdba74"
                strokeWidth="2"
                markerEnd={`url(#${uid}-warmarr)`}
              />
              <text
                x="820"
                y={depthY(96)}
                fill="#ffedd5"
                fontSize="13"
                fontWeight={700}
                fontFamily="Source Sans 3, sans-serif"
              >
                Varm anomali
              </text>
            </g>

            {/* Oppvelling fortsetter, men svekkes (PMEL: reduced efficiency, not reversed). */}
            <g transform={`translate(990 ${depthY(210)})`} opacity={0.2 + upwell * 0.8}>
              <FlowArrow
                d="M 0 70 L 0 -70"
                color="#7dd3fc"
                width={1.6 + upwell * 2.6}
                markerId={`${uid}-up`}
              />
              <FlowArrow
                d="M -16 54 L -16 -46"
                color="#38bdf8"
                width={1.4 + upwell * 1.2}
                markerId={`${uid}-up`}
              />
              <text
                x="18"
                y="8"
                fill="#e0f2fe"
                fontSize="13"
                fontWeight={700}
                fontFamily="Source Sans 3, sans-serif"
              >
                {index >= 0.25 ? "Svekket oppvelling (lunkent vann)" : "Intens oppvelling"}
              </text>
            </g>

            {/* Dybdeskala */}
            <g fontFamily="Source Sans 3, sans-serif">
              <text
                x="40"
                y="455"
                fill="#334155"
                fontSize="14"
                fontWeight={800}
                transform="rotate(-90 40 455)"
              >
                Dybde
              </text>
              {[0, 100, 200, 300, 500].map((d) => (
                <g key={d}>
                  <line
                    x1="108"
                    y1={depthY(d)}
                    x2="122"
                    y2={depthY(d)}
                    stroke="#57534e"
                    strokeWidth="1.2"
                  />
                  <text x="102" y={depthY(d) + 4} textAnchor="end" fill="#44403c" fontSize="11">
                    {d}m
                  </text>
                </g>
              ))}
            </g>

            {/* SST-fargeskala */}
            <g>
              <rect x="360" y="600" width="400" height="10" rx="5" fill={`url(#${uid}-sst)`} />
              <text x="360" y="628" fill="#44403c" fontSize="11" fontFamily="Source Sans 3, sans-serif">
                kald SST
              </text>
              <text
                x="760"
                y="628"
                textAnchor="end"
                fill="#44403c"
                fontSize="11"
                fontFamily="Source Sans 3, sans-serif"
              >
                varm SST (&gt;28 °C)
              </text>
            </g>
          </svg>
        </div>
      </div>
    </ModelFrame>
  );
}
