import { useEffect, useId, useState } from "react";
import { useAnimationPlaying, useStepCycle } from "./use-motion";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";

function MiniSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  valueLabel,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  valueLabel: string;
}) {
  return (
    <label className="flex min-w-0 items-center gap-2 text-xs font-medium text-foreground">
      <span className="whitespace-nowrap">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-28 cursor-pointer accent-primary sm:w-36"
      />
      <span className="shrink-0 whitespace-nowrap font-mono text-primary">{valueLabel}</span>
    </label>
  );
}

function StepPicker({
  labels,
  step,
  onStep,
}: {
  labels: string[];
  step: number;
  onStep: (step: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Trinn">
      {labels.map((label, index) => {
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

function Star({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  const inner = r * 0.4;
  const d = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : inner;
    const cmd = i === 0 ? "M" : "L";
    return `${cmd} ${x + Math.cos(a) * rad} ${y + Math.sin(a) * rad}`;
  }).join(" ");
  return <path d={`${d} Z`} fill={C.low} />;
}

const REBOUND_STEPS = ["1 Møtes", "2 Låst", "3 Bøyes", "4 Brudd", "5 Sprett"];

const REBOUND_LINE = [
  "Platene beveger seg mot hverandre langs forkastningen.",
  "Friksjonen låser flaten, så platene henger i hverandre.",
  "Spenningen bygger seg opp, og fjellet bøyes som en spent fjær.",
  "Bruddet starter i hyposenteret. Episenteret ligger rett over.",
  "Fjellet spretter tilbake, og bølgene sprer seg ut.",
];

function markerPath(baseY: number, bend: number, slip: number) {
  const parts: string[] = [];
  for (let x = 78; x <= 682; x += 8) {
    const d = (x - 380) / 72;
    const shear = bend * 34 * Math.tanh(d) * Math.exp(-Math.abs(d) * 0.32);
    const y = baseY + shear + (x < 380 ? -slip : slip);
    parts.push(`${x},${y.toFixed(1)}`);
  }
  return `M ${parts.join(" L ")}`;
}

/** Plater, låst forkastning, elastisk bøying, brudd og tilbakesprett. */
export function ElasticReboundDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(5, playing, 3200);
  const [tick, setTick] = useState(0.35);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTick((value) => value + dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const bend = step === 3 || step === 4 ? 1 : 0;
  const slip = step === 5 ? 16 : 0;
  const push = playing && step === 1 ? (Math.sin(tick * 2.4) + 1) * 5 : 0;
  const showBreak = step >= 4;
  const showWaves = step >= 5;
  const hypo = { x: 380, y: 292 };

  return (
    <Diagram
      title="Hvordan et jordskjelv blir til langs en låst forkastning"
      heading="Hvordan jordskjelvet blir til"
      caption="Ved en plategrense kan platene bevege seg mot hverandre langs en forkastning. Friksjonen låser flaten, fjellet bøyes over lang tid, og når friksjonen ryker, spretter det tilbake. Bruddet starter i hyposenteret. Episenteret er punktet på overflaten rett over. Energien sprer seg som seismiske bølger, og bruddet kan bli stående på overflaten."
      viewBox="0 0 760 460"
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={REBOUND_STEPS} step={step} onStep={setStep} />
          <span className="text-xs text-muted-foreground">
            {playing ? REBOUND_STEPS[step - 1] : "Velg trinn, eller start"}
          </span>
        </>
      }
    >
      {(m) => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-step={step}>
          <L x="380" y="36" fill={C.fg} size={15} weight={650} anchor="middle">
            {REBOUND_LINE[step - 1]}
          </L>

          <path
            d={`M 48 ${112 - slip} H 380 V ${400} H 48 Z`}
            fill="#3a3428"
          />
          <path
            d={`M 380 ${112 + slip} H 712 V 400 H 380 Z`}
            fill="#16303a"
          />
          <path
            d={`M 48 ${112 - slip} H 380`}
            fill="none"
            stroke="#6d7c6a"
            strokeWidth="3"
          />
          <path
            d={`M 380 ${112 + slip} H 712`}
            fill="none"
            stroke="#6d7c6a"
            strokeWidth="3"
          />
          <line
            x1="380"
            y1={112 - slip}
            x2="380"
            y2="400"
            stroke={C.low}
            strokeWidth={step >= 4 ? 3.2 : 2.4}
          />

          {[176, 242, 308].map((y) => (
            <path
              key={y}
              d={markerPath(y, bend, slip)}
              fill="none"
              stroke={C.sand}
              strokeWidth="2.6"
              strokeDasharray="7 5"
              strokeLinecap="round"
            />
          ))}

          <Arrow
            d={`M ${150 - push} 148 L ${250 + push} 148`}
            marker={m.warm}
            color={C.warm}
            width={step === 1 ? 3.2 : 2}
          />
          <Arrow
            d={`M ${610 + push} 148 L ${510 - push} 148`}
            marker={m.warm}
            color={C.warm}
            width={step === 1 ? 3.2 : 2}
          />
          <L x="188" y="136" fill={C.warm} size={13} anchor="middle">
            plate
          </L>
          <L x="572" y="136" fill={C.warm} size={13} anchor="middle">
            plate
          </L>

          {step === 2 || step === 3 ? (
            <g>
              <rect x="368" y="188" width="24" height="28" rx="3" fill={C.low} />
              <L x="404" y="206" fill={C.low} size={13} weight={700}>
                friksjon låser
              </L>
            </g>
          ) : null}

          {showBreak ? (
            <g>
              <line
                x1="380"
                y1={112 - slip}
                x2="380"
                y2={hypo.y}
                stroke={C.muted}
                strokeWidth="1.4"
                strokeDasharray="3 4"
              />
              <circle cx="380" cy={112 - slip} r="5.5" fill={C.fg} stroke={C.low} strokeWidth="1.6" />
              <L x="396" y={104 - slip} fill={C.fg} size={13} weight={700}>
                episenter
              </L>
              <Star x={hypo.x} y={hypo.y} r={9} />
              <L x="530" y={hypo.y + 4} fill={C.low} size={13} weight={700}>
                hyposenter
              </L>
            </g>
          ) : (
            <L x="392" y="100" fill={C.low} size={13}>
              forkastning
            </L>
          )}

          {showWaves
            ? [0, 0.33, 0.66].map((offset) => {
                const u = (tick * 0.4 + offset) % 1;
                return (
                  <circle
                    key={offset}
                    cx={hypo.x}
                    cy={hypo.y}
                    r={16 + u * 108}
                    fill="none"
                    stroke={C.teal}
                    strokeWidth="2"
                    opacity={0.8 * (1 - u)}
                  />
                );
              })
            : null}

          <g transform={`translate(0 ${-slip})`}>
            {showWaves ? (
              <g transform={`translate(${Math.sin(tick * 18) * 2.4} 0)`}>
                <path d="M 292 96 L 308 78 L 324 96 V 110 H 292 Z" fill={C.sand} />
                <rect x="298" y="96" width="8" height="8" fill="#1a242c" />
              </g>
            ) : (
              <path d="M 292 96 L 308 78 L 324 96 V 110 H 292 Z" fill={C.sand} opacity="0.85" />
            )}
          </g>

          <L x="120" y="430" fill={C.muted} size={13}>
            jordskorpe
          </L>
          {step === 5 ? (
            <L x="560" y="430" fill={C.teal} size={13} anchor="end">
              bruddet kan bli stående
            </L>
          ) : null}
          {step === 3 ? (
            <L x="700" y="430" fill={C.sand} size={13} anchor="end">
              stiplede linjer bøyes
            </L>
          ) : null}
        </g>
      )}
    </Diagram>
  );
}

const N_PART = 22;
const PART_X0 = 46;
const PART_GAP = 26;

function partX(index: number) {
  return PART_X0 + index * PART_GAP;
}

/** P- og S-bølger, og bølger langs overflaten, som partikkelbevegelse. */
export function PartikkelbolgerDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [tempo, setTempo] = useState(1);
  const [phase, setPhase] = useState(1.35);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setPhase((value) => value + dt * tempo * 1.7);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, tempo]);

  const tempoLabel = tempo < 0.75 ? "sakte" : tempo > 1.35 ? "rask" : "middels";
  const liquidAt = 14;
  const mark = 6;

  const pShift = (index: number) => 12 * Math.sin(index * 0.72 - phase);
  const sAmp = (index: number) => {
    if (index < liquidAt - 1) return 1;
    if (index >= liquidAt + 1) return 0;
    return index === liquidAt - 1 ? 0.45 : 0.12;
  };
  const sShift = (index: number) => 14 * sAmp(index) * Math.sin(index * 0.72 - phase);
  const surfShift = (index: number) =>
    index < liquidAt ? 18 * Math.sin(index * 0.62 - phase * 0.62) : 0;

  const pY = 132;
  const sY = 286;
  const surfY = 438;

  return (
    <Diagram
      title="Partikkelbevegelse i P-bølge, S-bølge og bølger langs overflaten"
      heading="Hvordan P- og S-bølger beveger seg"
      caption="P-bølgen er kompresjon: stoffet skyves og trekkes i bølgens retning, og den går gjennom fast berg og væske. S-bølgen er skjær: stoffet beveger seg på tvers, og den stopper i væske. Bølgene langs overflaten, Rayleigh og Love, kommer sist og har størst utslag. De rister husene mest. Hastighetsskyveren endrer tempoet i animasjonen. Kapittelet oppgir ikke en bølgefart i kilometer i sekundet."
      viewBox="0 0 760 510"
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <MiniSlider
          label="Hastighet"
          min={0.4}
          max={2}
          step={0.05}
          value={tempo}
          onChange={setTempo}
          valueLabel={tempoLabel}
        />
      }
    >
      {() => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"}>
          <rect x="24" y="58" width={partX(liquidAt) - 16} height="300" rx="8" fill="#142028" />
          <rect
            x={partX(liquidAt) - 8}
            y="58"
            width={760 - partX(liquidAt) - 16}
            height="300"
            rx="8"
            fill="#1a3048"
          />
          <L x="48" y="78" fill={C.muted} size={13} weight={700}>
            fast berg
          </L>
          <L x={partX(liquidAt) + 8} y="78" fill={C.cold} size={13} weight={700}>
            væske
          </L>

          <L x="40" y="112" fill={C.teal} size={14} weight={700}>
            P: kompresjon, langs bølgen
          </L>
          {Array.from({ length: N_PART - 1 }, (_, index) => {
            const x1 = partX(index) + pShift(index);
            const x2 = partX(index + 1) + pShift(index + 1);
            return (
              <line
                key={`p-link-${index}`}
                x1={x1}
                y1={pY}
                x2={x2}
                y2={pY}
                stroke={C.teal}
                strokeWidth="1.4"
                opacity="0.7"
              />
            );
          })}
          {Array.from({ length: N_PART }, (_, index) => {
            const marked = index === mark;
            return (
              <circle
                key={`p-${index}`}
                cx={partX(index) + pShift(index)}
                cy={pY}
                r={marked ? 7 : 4.5}
                fill={marked ? C.sand : C.teal}
                stroke={marked ? C.fg : "none"}
                strokeWidth={marked ? 1.6 : 0}
              />
            );
          })}
          <line
            x1={partX(mark)}
            y1={pY - 16}
            x2={partX(mark)}
            y2={pY + 16}
            stroke={C.sand}
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.7"
          />
          <L x="48" y="168" fill={C.fg} size={12}>
            tett der stoffet skyves, glissent der det trekkes
          </L>
          <L x={partX(liquidAt) + 8} y="168" fill={C.cold} size={12}>
            P går gjennom
          </L>

          <L x="40" y="236" fill={C.warm} size={14} weight={700}>
            S: skjær, på tvers av bølgen
          </L>
          {Array.from({ length: N_PART }, (_, index) => {
            const marked = index === mark;
            const stopped = index >= liquidAt;
            return (
              <circle
                key={`s-${index}`}
                cx={partX(index)}
                cy={sY + sShift(index)}
                r={marked ? 7 : 4.5}
                fill={stopped ? C.dim : marked ? C.sand : C.warm}
                stroke={marked ? C.fg : "none"}
                strokeWidth={marked ? 1.6 : 0}
                opacity={stopped ? 0.45 : 1}
              />
            );
          })}
          <line
            x1={partX(mark)}
            y1={sY - 22}
            x2={partX(mark)}
            y2={sY + 22}
            stroke={C.sand}
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.7"
          />
          <line
            x1={partX(liquidAt) - 8}
            y1="214"
            x2={partX(liquidAt) - 8}
            y2="340"
            stroke={C.low}
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />
          <L x={partX(liquidAt) + 8} y="268" fill={C.low} size={13} weight={700}>
            S stopper
          </L>
          <L x="48" y="332" fill={C.fg} size={12}>
            den markerte partikkelen går fram og tilbake
          </L>

          <L x="40" y="386" fill={C.low} size={14} weight={700}>
            Overflatebølger: størst utslag
          </L>
          <path
            d={Array.from({ length: liquidAt }, (_, index) => {
              const x = partX(index);
              const y = surfY + surfShift(index);
              return `${index === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`;
            }).join(" ")}
            fill="none"
            stroke="#6d7c6a"
            strokeWidth="2"
          />
          {Array.from({ length: liquidAt }, (_, index) => {
            const marked = index === mark;
            return (
              <circle
                key={`sf-${index}`}
                cx={partX(index)}
                cy={surfY + surfShift(index)}
                r={marked ? 7 : 4.5}
                fill={marked ? C.sand : C.low}
                stroke={marked ? C.fg : "none"}
                strokeWidth={marked ? 1.6 : 0}
              />
            );
          })}
          <g transform={`translate(${partX(2)} ${surfY + surfShift(2) - 18})`}>
            <path d="M 0 10 L 8 0 L 16 10 V 18 H 0 Z" fill={C.sand} />
          </g>
          <L x="40" y="492" fill={C.muted} size={12}>
            Rayleigh og Love kommer sist og rister husene mest. De går langs overflaten.
          </L>
        </g>
      )}
    </Diagram>
  );
}

const G = { cx: 178, cy: 228, R: 148 };
const CORE_RATIO = 0.55;
const INNER_RATIO = 0.19;
const VP = 1;
const VS = 0.58;
const V_SURF = 0.4;
const SLOW = 0.7;

function chord(deg: number) {
  return 2 * Math.sin((deg * Math.PI) / 360);
}

function arcLen(deg: number) {
  return (deg * Math.PI) / 180;
}

const NEAR_DEG = 42;
const FAR_DEG = 78;
const SHADOW_DEG = 120;
const NEAR_T = {
  p: chord(NEAR_DEG) / VP,
  s: chord(NEAR_DEG) / VS,
  surf: arcLen(NEAR_DEG) / V_SURF,
};
const FAR_T = {
  p: chord(FAR_DEG) / VP,
  s: chord(FAR_DEG) / VS,
  surf: arcLen(FAR_DEG) / V_SURF,
};
const T_MAX = FAR_T.surf * 1.05;

function polar(deg: number, r: number) {
  const a = -Math.PI / 2 + (deg * Math.PI) / 180;
  return { x: G.cx + r * Math.cos(a), y: G.cy + r * Math.sin(a) };
}

function arcD(deg0: number, deg1: number, r: number) {
  const p0 = polar(deg0, r);
  const p1 = polar(deg1, r);
  const large = Math.abs(deg1 - deg0) > 180 ? 1 : 0;
  const sweep = deg1 >= deg0 ? 1 : 0;
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${r} ${r} 0 ${large} ${sweep} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

function wedgeD(deg0: number, deg1: number, r: number) {
  const p0 = polar(deg0, r);
  const p1 = polar(deg1, r);
  const large = Math.abs(deg1 - deg0) > 180 ? 1 : 0;
  const sweep = deg1 >= deg0 ? 1 : 0;
  return `M ${G.cx} ${G.cy} L ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${r} ${r} 0 ${large} ${sweep} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`;
}

function phaseName(time01: number) {
  const nearP = NEAR_T.p / T_MAX;
  const nearS = NEAR_T.s / T_MAX;
  const nearSurf = NEAR_T.surf / T_MAX;
  if (time01 < nearP) return "bølgene går ut";
  if (time01 < nearS) return "P kommer først";
  if (time01 < nearSurf) return "S kommer etter";
  return "overflatebølger";
}

function wiggleY(time01: number, arrivals: { p: number; s: number; surf: number }, amp: number) {
  const t = time01 * T_MAX;
  if (t < arrivals.p) return 0;
  if (t < arrivals.s) return amp * 0.35 * Math.sin((t - arrivals.p) * 26);
  if (t < arrivals.surf) return amp * 0.7 * Math.sin((t - arrivals.s) * 22);
  return amp * 1.35 * Math.sin((t - arrivals.surf) * 16) * Math.exp(-(t - arrivals.surf) * 0.35);
}

function traceD(
  time01: number,
  arrivals: { p: number; s: number; surf: number } | null,
  x0: number,
  x1: number,
  y: number,
  amp = 16,
) {
  const parts: string[] = [];
  const steps = 90;
  for (let i = 0; i <= steps; i += 1) {
    const u = i / steps;
    if (u > time01) break;
    const dy = arrivals ? wiggleY(u, arrivals, amp) : 0;
    const x = x0 + u * (x1 - x0);
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(y + dy).toFixed(1)}`);
  }
  return parts.join(" ");
}

function hitCircle(
  ox: number,
  oy: number,
  dx: number,
  dy: number,
  r: number,
) {
  const b = 2 * (ox * dx + oy * dy);
  const c = ox * ox + oy * oy - r * r;
  const disc = b * b - 4 * c;
  if (disc < 0) return null;
  const s = Math.sqrt(disc);
  const times = [(-b - s) / 2, (-b + s) / 2].filter((t) => t > 0.4).sort((a, c2) => a - c2);
  return times[0] ?? null;
}

function refract(
  ix: number,
  iy: number,
  nx: number,
  ny: number,
  eta: number,
) {
  let cosI = -(nx * ix + ny * iy);
  let nnx = nx;
  let nny = ny;
  if (cosI < 0) {
    nnx = -nx;
    nny = -ny;
    cosI = -cosI;
  }
  const sin2 = eta * eta * (1 - cosI * cosI);
  if (sin2 > 1) return null;
  const cosT = Math.sqrt(1 - sin2);
  return {
    x: eta * ix + (eta * cosI - cosT) * nnx,
    y: eta * iy + (eta * cosI - cosT) * nny,
  };
}

/** P- og S-bølger gjennom jordas lag, med seismogram styrt av tiden. */
export function JordasBolgerDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [time, setTime] = useState(0);
  const uid = useId().replace(/:/g, "");
  const time01 = time / 100;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTime((value) => (value >= 100 ? 0 : value + dt * 7.5));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const rc = G.R * CORE_RATIO;
  const ri = G.R * INNER_RATIO;
  const crust = 14;
  const hypoR = G.R - 8;
  const hypo = polar(0, hypoR);
  const tau = time01 * T_MAX;
  const pRadius = tau * G.R;
  const sRadius = tau * VS * G.R;
  const gap = hypoR - rc;
  const intoCore = pRadius - gap;
  const coreRadius = gap + Math.max(0, intoCore) * SLOW;
  const surfFront = tau * V_SURF * (180 / Math.PI);

  const mantleMask = `${uid}-mantle`;
  const coreMask = `${uid}-core`;

  const stubs = [-16, 0, 16].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const dir = { x: Math.sin(a), y: Math.cos(a) };
    const ox = hypo.x - G.cx;
    const oy = hypo.y - G.cy;
    const tHit = hitCircle(ox, oy, dir.x, dir.y, rc);
    if (tHit == null) return null;
    const hx = ox + dir.x * tHit;
    const hy = oy + dir.y * tHit;
    const bent = refract(dir.x, dir.y, hx / rc, hy / rc, SLOW);
    if (!bent) return null;
    const len = Math.hypot(bent.x, bent.y) || 1;
    const reach = Math.max(0, Math.min(42, (intoCore - 4) * SLOW));
    return {
      x1: G.cx + ox,
      y1: G.cy + oy,
      x2: G.cx + hx,
      y2: G.cy + hy,
      x3: G.cx + hx + (bent.x / len) * reach,
      y3: G.cy + hy + (bent.y / len) * reach,
      show: pRadius > tHit * 0.92,
    };
  });

  const stations = [
    { deg: NEAR_DEG, n: "1", arrivals: NEAR_T },
    { deg: FAR_DEG, n: "2", arrivals: FAR_T },
    { deg: SHADOW_DEG, n: "3", arrivals: null },
  ];

  const traceX0 = 430;
  const traceX1 = 760;
  const traces = [
    { title: "1 Nær: liten tidsforskjell", y: 108, arrivals: NEAR_T },
    { title: "2 Lenger unna: større forskjell", y: 252, arrivals: FAR_T },
    { title: "3 Skygge: ingen direkte P eller S", y: 396, arrivals: null },
  ];

  return (
    <Diagram
      title="P- og S-bølger gjennom jordas lag, skyggesoner og seismogram"
      heading="P- og S-bølger gjennom jorda"
      caption="P-bølgen kommer først og går gjennom fast berg og væske. S-bølgen kommer etter og stopper i den flytende ytre kjernen. Farten til P-bølgen faller med om lag 30 prosent fra mantel til kjerne, og bølgene bøyes av ved grensen. S-bølger kommer ikke fram lenger ut enn om lag 103 grader. Direkte P-bølger mangler mellom om lag 103 og 140 grader. Tidsforskjellen mellom P og S blir større jo lenger unna skjelvet er. Med tre stasjoner kan sirklene krysse i episenteret. Når bølgene når overflaten, kommer overflatebølgene sist og rister bakken mest. Skorpen er tegnet tykkere enn den er, så Moho synes. Kapittelet beskriver avbøyning ved kjernen, ikke egne reflekterte bølger."
      viewBox="0 0 800 540"
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <MiniSlider
          label="Tid"
          min={0}
          max={100}
          step={1}
          value={Math.round(time)}
          onChange={setTime}
          valueLabel={phaseName(time01)}
        />
      }
    >
      {() => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"}>
          <defs>
            <mask id={mantleMask}>
              <rect width="800" height="540" fill="black" />
              <path d={wedgeD(-103, 103, G.R)} fill="white" />
              <circle cx={G.cx} cy={G.cy} r={rc - 0.5} fill="black" />
            </mask>
            <mask id={coreMask}>
              <rect width="800" height="540" fill="black" />
              <circle cx={G.cx} cy={G.cy} r={rc} fill="white" />
            </mask>
          </defs>

          <circle cx={G.cx} cy={G.cy} r={G.R} fill="#2a241c" />
          <circle cx={G.cx} cy={G.cy} r={G.R - crust} fill="#3a3428" />
          <circle cx={G.cx} cy={G.cy} r={rc} fill="#4a2428" />
          <circle cx={G.cx} cy={G.cy} r={ri} fill={C.warm} />

          <path d={arcD(103, 257, G.R + 8)} fill="none" stroke={C.warm} strokeWidth="8" opacity="0.85" />
          <path d={arcD(103, 140, G.R + 18)} fill="none" stroke={C.teal} strokeWidth="6" opacity="0.9" />
          <path d={arcD(-140, -103, G.R + 18)} fill="none" stroke={C.teal} strokeWidth="6" opacity="0.9" />

          {pRadius > 2 ? (
            <circle
              cx={hypo.x}
              cy={hypo.y}
              r={pRadius}
              fill="none"
              stroke={C.teal}
              strokeWidth="2.4"
              mask={`url(#${mantleMask})`}
            />
          ) : null}
          {sRadius > 2 ? (
            <circle
              cx={hypo.x}
              cy={hypo.y}
              r={sRadius}
              fill="none"
              stroke={C.warm}
              strokeWidth="2.4"
              mask={`url(#${mantleMask})`}
            />
          ) : null}
          {intoCore > 2 ? (
            <circle
              cx={hypo.x}
              cy={hypo.y}
              r={coreRadius}
              fill="none"
              stroke={C.teal}
              strokeWidth="2.2"
              strokeDasharray="5 4"
              mask={`url(#${coreMask})`}
            />
          ) : null}

          {stubs.map((stub, index) =>
            stub && stub.show ? (
              <g key={index}>
                <line
                  x1={stub.x1}
                  y1={stub.y1}
                  x2={stub.x2}
                  y2={stub.y2}
                  stroke={C.teal}
                  strokeWidth="1.4"
                  opacity="0.85"
                />
                <line
                  x1={stub.x2}
                  y1={stub.y2}
                  x2={stub.x3}
                  y2={stub.y3}
                  stroke={C.teal}
                  strokeWidth="1.6"
                />
              </g>
            ) : null,
          )}

          {surfFront > 2 ? (
            <path
              d={arcD(0, Math.min(100, surfFront), G.R - 2)}
              fill="none"
              stroke={C.low}
              strokeWidth="3"
            />
          ) : null}

          {stations.map((station) => {
            const at = polar(station.deg, G.R);
            const amp = station.arrivals ? wiggleY(time01, station.arrivals, 1) : 0;
            return (
              <g key={station.n} transform={`translate(${amp * 4} 0)`}>
                <circle cx={at.x} cy={at.y} r="7" fill={C.bg} stroke={C.fg} strokeWidth="1.4" />
                <L x={at.x} y={at.y + 3} fill={C.fg} size={10} weight={700} anchor="middle">
                  {station.n}
                </L>
              </g>
            );
          })}

          <Star x={hypo.x} y={hypo.y} r={6} />
          <circle cx={polar(0, G.R).x} cy={polar(0, G.R).y} r="3.5" fill={C.fg} />
          <L x="24" y="40" fill={C.fg} size={12} weight={700}>
            episenter
          </L>
          <L x="24" y="64" fill={C.low} size={12} weight={700}>
            hyposenter
          </L>
          <line
            x1="96"
            y1="36"
            x2={polar(0, G.R).x - 2}
            y2={polar(0, G.R).y - 2}
            stroke={C.muted}
            strokeWidth="1"
          />

          <L x={polar(-70, 108).x} y={polar(-70, 108).y} fill={C.sand} size={12} anchor="middle">
            mantel
          </L>
          <L x={G.cx - 24} y={G.cy + 8} fill="#1a1012" size={11} weight={700} anchor="middle">
            fast
          </L>
          <L x={G.cx - 46} y={G.cy - 36} fill={C.fg} size={11} anchor="middle">
            flytende
          </L>
          <L x="36" y="430" fill={C.warm} size={12} weight={700}>
            S-skygge fra 103°
          </L>
          <L x="36" y="450" fill={C.teal} size={12} weight={700}>
            direkte P mangler 103–140°
          </L>
          <L x="36" y="472" fill={C.muted} size={11}>
            P-farten faller med om lag 30 %
          </L>
          <L x="36" y="492" fill={C.muted} size={11}>
            ved grensen mot kjernen.
          </L>
          <L x="36" y="516" fill={C.muted} size={11}>
            Skorpen er tegnet tykkere, så Moho synes.
          </L>

          <L x="430" y="36" fill={C.fg} size={14} weight={700}>
            Seismogram
          </L>
          {traces.map((trace) => {
            const pMark = trace.arrivals ? traceX0 + (trace.arrivals.p / T_MAX) * (traceX1 - traceX0) : 0;
            const sMark = trace.arrivals ? traceX0 + (trace.arrivals.s / T_MAX) * (traceX1 - traceX0) : 0;
            const showP = trace.arrivals ? time01 >= trace.arrivals.p / T_MAX : false;
            const showS = trace.arrivals ? time01 >= trace.arrivals.s / T_MAX : false;
            return (
              <g key={trace.title}>
                <L x={traceX0} y={trace.y - 44} fill={C.fg} size={12} weight={700}>
                  {trace.title}
                </L>
                <line
                  x1={traceX0}
                  y1={trace.y}
                  x2={traceX1}
                  y2={trace.y}
                  stroke={C.dim}
                  strokeWidth="1"
                />
                <path
                  d={traceD(time01, trace.arrivals, traceX0, traceX1, trace.y, 11)}
                  fill="none"
                  stroke={trace.arrivals ? C.fg : C.muted}
                  strokeWidth="1.8"
                />
                {showP ? (
                  <g>
                    <line x1={pMark} y1={trace.y - 16} x2={pMark} y2={trace.y + 16} stroke={C.teal} strokeDasharray="2 2" />
                    <L x={pMark} y={trace.y - 24} fill={C.teal} size={11} anchor="middle">
                      P
                    </L>
                  </g>
                ) : null}
                {showS ? (
                  <g>
                    <line x1={sMark} y1={trace.y - 16} x2={sMark} y2={trace.y + 16} stroke={C.warm} strokeDasharray="2 2" />
                    <L x={sMark} y={trace.y - 24} fill={C.warm} size={11} anchor="middle">
                      S
                    </L>
                  </g>
                ) : null}
              </g>
            );
          })}
          <L x={traceX0} y="500" fill={C.muted} size={11}>
            tid etter bruddet →
          </L>
          <L x={traceX0} y="520" fill={C.low} size={11}>
            Overflatebølgene kommer sist og rister mest.
          </L>
        </g>
      )}
    </Diagram>
  );
}
