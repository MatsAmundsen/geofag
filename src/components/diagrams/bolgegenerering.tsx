/**
 * Widget-id: Bolgegenerering
 *
 * Inn på main i geofag.com (MatsAmundsen/geofag):
 *
 * 1. Kopier denne filen til src/components/diagrams/bolgegenerering.tsx
 * 2. I src/components/diagrams/index.ts, legg til:
 *      export { BolgegenereringDiagram } from "./bolgegenerering";
 * 3. I src/components/poster-body.tsx:
 *      - importer BolgegenereringDiagram fra "@/components/diagrams"
 *      - i POSTER_WIDGETS:
 *          Bolgegenerering: () => <BolgegenereringDiagram />,
 * 4. I src/lib/posts/jordskjelv.md, under avsnittet «Overflatebølger»
 *    (etter setningen om at de rister husene mest, før SjekkJordskjelv3):
 *
 *    ```widget
 *    Bolgegenerering
 *    ```
 *
 * Filen bruker Diagram, L, Arrow, C og useAnimationPlaying slik de
 * allerede finnes i quake-motion.tsx. Ingen nye avhengigheter.
 */
import { useEffect, useId, useRef, useState } from "react";
import { useAnimationPlaying } from "./use-motion";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";

const CRUST_L = "#3a3428";
const CRUST_L_DEEP = "#241c14";
const CRUST_R = "#16303a";
const CRUST_R_DEEP = "#0c1c24";
const SOFT_L = "#534a38";
const SOFT_R = "#214652";
const WINDOW = "#1a242c";
const GRASS = "#6d7c6a";

const FAULT = 250;
const HYPO_Y = 286;
const CRUST_BOTTOM = 424;
const LEFT = 32;
const RIGHT = 928;
const SOFT = 30;
const HOUSE_X = 748;

const VP = 148;
const VS = 148 * (3.5 / 6);
const VR = VS * 0.88;
const VL = VS * 0.96;

const DUR = [6.4, 5.4, 8.2, 7.4, 7.4, 11.2, 8.2];
const POSTER = [4.2, 2.4, 3.1, 2.6, 3.1, 6.8, 3.4];

const LAYER_DEPTHS = [52, 108, 164, 220, 276];
const GRID_COLS = 14;
const GRID_ROWS = 6;
const SURF_DEPTHS = [7, 24, 48, 78, 116];
const GRID = Array.from({ length: GRID_ROWS * GRID_COLS }, (_, index) => {
  const row = Math.floor(index / GRID_COLS);
  const col = index % GRID_COLS;
  return { x: 86 + col * 58, depth: 58 + row * 42 };
});
const SURF_XS = Array.from({ length: 20 }, (_, index) => FAULT + (index - 4) * 36);

const STEPS = [
  {
    label: "1 Spenning",
    title: "Fjellet bøyes",
    body: "Tenk på en fjær som spennes sakte. Fjellet langs en låst forkastning bøyes på samme måte, over svært lang tid. Friksjonen holder flaten, og spenningen bygger seg opp til den ryker.",
  },
  {
    label: "2 Brudd",
    title: "Hyposenter og episenter",
    body: "Når friksjonen ryker, spretter fjellet tilbake. Det kalles elastisk tilbakefjæring. Bruddet starter i hyposenteret. Episenteret er punktet på overflaten rett over. Energien som lå i det bøyde fjellet, frigjøres der.",
  },
  {
    label: "3 P og S ut",
    title: "Begge sendes ut samtidig",
    body: "Bruddet sender ut en P-bølge og en S-bølge i samme øyeblikk, fra hyposenteret. Den heltrukne fronten er P. Den skyver fjellet fram og tilbake langs strålen ut fra bruddet. Den stiplede fronten er S. Den skjærer fjellet på tvers. P går raskere, ca. 6 km/s mot 3,5 km/s, og legger seg derfor foran. S-bølgen er ikke en senere hendelse. Den startet samtidig, men blir liggende etter. Følg den sandfargede partikkelen: først et rykk langs bølgen når P passerer, så et rykk på tvers når S passerer.",
  },
  {
    label: "4 P-bølge",
    title: "Kompresjon langs strålen",
    body: "Se langs én stråle ut fra hyposenteret. P-bølgen skyver partiklene fram og tilbake i samme retning som bølgen går. Der de ligger tett, er fjellet presset sammen. Der de ligger glissent, er det trukket ut. P-bølgen går gjennom både fast berg og væske. Den stiplede S-fronten er allerede på vei lenger bak, for den ble sendt ut i samme øyeblikk.",
  },
  {
    label: "5 S-bølge",
    title: "Skjær på tvers",
    body: "S-bølgen får partiklene til å svinge på tvers av retningen bølgen går. Den kommer senere fram fordi den er tregere, ca. 3,5 km/s i skorpa, ikke fordi den ble sendt ut senere. S-bølger går bare gjennom fast stoff. Væske kan ikke overføre et skjær, og derfor stopper de i den flytende ytre kjernen. P-fronten har allerede løpt foran.",
  },
  {
    label: "6 Overflate",
    title: "Slik blir overflatebølgene til",
    body: "Følg treffet med bakken. Luft tar nesten ikke imot bølgene, så når P-fronten møter den frie overflaten, kastes den tilbake ned i fjellet. Det er den lysere buen under bakken. Så kommer S og setter bakken i bevegelse. Den bevegelsen blir ikke med de reflekterte bølgene ned. Den fanges langs overflaten og løper av gårde saktere enn S. Rayleigh-bølgen ruller: partiklene går i ellipser, størst ved bakken og nesten borte lenger nede. Love-bølgen fanges i det løse topplaget og rister sideveis. Det ser du i ruten sett ovenfra.",
  },
  {
    label: "7 Rystning",
    title: "Det som rister huset",
    body: "Overflatebølgene kommer sist fram, men de har størst utslag. Rayleigh-bølgen ruller selve bakken under huset. Love-bølgen rister sideveis. Det folk kjenner som jordskjelvet, er denne rystningen. På seismogrammet ligger bølgene i den rekkefølgen de kommer fram, ikke i den rekkefølgen de ble sendt ut: først en liten P, så en større S, og til slutt overflatebølgene med de tregeste og største svingningene.",
  },
] as const;

const BEATS = [
  "P løper mot den frie overflaten",
  "P treffer og kastes tilbake ned",
  "S treffer og setter bakken i gang",
  "Bevegelsen fanges og løper langs bakken",
] as const;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function groundY(x: number) {
  return 104 + Math.sin(x * 0.0115) * 3.2 + Math.sin(x * 0.0047 + 0.6) * 2.2;
}

function depth0() {
  return HYPO_Y - groundY(FAULT);
}

function bendOffset(x: number, bend: number) {
  const d = (x - FAULT) / 74;
  return bend * 30 * Math.tanh(d) * Math.exp(-Math.abs(d) * 0.34);
}

function wavetrain(radius: number, front: number, amp: number, k: number, decay: number) {
  const behind = front - radius;
  if (behind < 0 || front < 8) return 0;
  const env = Math.exp(-behind / decay) * Math.min(1, behind / 16);
  return amp * env * Math.sin(k * behind);
}

function bodyMotion(x: number, y: number, t: number, pScale: number, sScale: number) {
  const dx = x - FAULT;
  const dy = y - HYPO_Y;
  const radius = Math.hypot(dx, dy);
  if (radius < 14 || t <= 0) return { x: 0, y: 0 };
  const nx = dx / radius;
  const ny = dy / radius;
  const p = wavetrain(radius, VP * t, 10.5 * pScale, 0.082, 78);
  const s = wavetrain(radius, VS * t, 12.5 * sScale, 0.098, 64);
  return { x: nx * p - ny * s, y: ny * p + nx * s };
}

function surfaceReach(speed: number, t: number) {
  const radius = speed * t;
  const depth = depth0();
  if (radius <= depth) return 0;
  return Math.sqrt(radius * radius - depth * depth);
}

function rayleigh(x: number, depth: number, t: number, gain: number) {
  if (gain <= 0 || depth < -2) return { dx: 0, dy: 0, amp: 0 };
  const s = x - FAULT;
  const abs = Math.abs(s);
  const dir = s >= 0 ? 1 : -1;
  const buried = depth0();
  const tP = Math.hypot(abs, buried) / VP;
  const tRay = buried / VS + abs / VR;
  const decay = Math.exp(-Math.max(0, depth) / 44);
  let dx = 0;
  let dy = 0;
  let amp = 0;
  const sinceP = t - tP;
  if (sinceP > 0 && sinceP < 1.35 && depth < 80) {
    const bump = Math.exp(-sinceP * 3.2) * Math.sin(sinceP * 17) * 5 * decay * gain;
    dy += bump;
    amp = Math.max(amp, Math.abs(bump));
  }
  const since = t - tRay;
  if (since > 0) {
    const env = Math.exp(-Math.max(0, since - 0.22) * 0.78) * (1 - Math.exp(-since * 4.2));
    const a = 27 * gain * decay * env;
    const phase = since * 7.5;
    dx += -dir * a * Math.sin(phase);
    dy += -a * 0.74 * Math.cos(phase);
    amp = Math.max(amp, a);
  }
  return { dx, dy, amp };
}

function loveShift(distance: number, t: number) {
  const since = t - (depth0() / VS + distance / VL);
  if (since < 0) return 0;
  const env = Math.exp(-Math.max(0, since - 0.18) * 0.82) * (1 - Math.exp(-since * 4.8));
  return 11 * env * Math.sin(since * 8.2);
}

function beatIndex(t: number) {
  const tP = depth0() / VP;
  const tS = depth0() / VS;
  if (t < tP + 0.08) return 0;
  if (t < tS + 0.12) return 1;
  if (t < tS + 1.45) return 2;
  return 3;
}

function traceAmp(t: number, step: number) {
  let y = 0;
  if (step >= 3) {
    const u = t - 0.16;
    if (u > 0) y += Math.exp(-u * 26) * Math.sin(u * 92) * 8;
  }
  if (step >= 3) {
    const u = t - 0.34;
    if (u > 0) y += Math.exp(-u * 16) * Math.sin(u * 58) * 16;
  }
  if (step >= 6) {
    const u = t - 0.5;
    if (u > 0) {
      const gain = step >= 7 ? 1 : 0.72;
      const freq = 30 - u * 16;
      y += Math.exp(-u * 1.55) * Math.sin(u * freq) * 28 * gain * (1 - Math.exp(-u * 10));
    }
  }
  return y;
}

function starPath(x: number, y: number, r: number) {
  const inner = r * 0.42;
  return (
    Array.from({ length: 10 }, (_, i) => {
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const rad = i % 2 === 0 ? r : inner;
      const cmd = i === 0 ? "M" : "L";
      return `${cmd} ${(x + Math.cos(a) * rad).toFixed(1)} ${(y + Math.sin(a) * rad).toFixed(1)}`;
    }).join(" ") + " Z"
  );
}

function reflectPath(reach: number, slip: number) {
  const x = FAULT + reach;
  const y = groundY(x) + slip;
  const endX = x - 84;
  const endY = y + 102;
  return `M ${x.toFixed(1)} ${(y + 2).toFixed(1)} Q ${(x - 16).toFixed(1)} ${(y + 48).toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

function pathFrom(points: Array<[number, number]>, close = false) {
  if (points.length === 0) return "";
  const body = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point[0].toFixed(1)} ${point[1].toFixed(1)}`)
    .join(" ");
  return close ? `${body} Z` : body;
}

function sampleX(x0: number, x1: number, step: number) {
  const xs: number[] = [];
  for (let x = x0; x <= x1; x += step) xs.push(x);
  if (xs[xs.length - 1] !== x1) xs.push(x1);
  return xs;
}

function sceneTime(step: number, local: number) {
  if (step < 6) return local;
  if (step === 6) return local;
  return 8.15 + local * 0.42;
}

function slipOf(step: number, local: number) {
  if (step === 1) return 0;
  if (step === 2) return 13 * smoothstep(local / 0.42);
  return 13;
}

function bendOf(step: number, local: number) {
  if (step === 1) return smoothstep(local / 4.6);
  if (step === 2) return 1 - smoothstep(local / 0.42);
  return 0;
}

function emphasis(step: number) {
  if (step === 4) return { p: 1.35, s: 0.28 };
  if (step === 5) return { p: 0.2, s: 1.4 };
  if (step === 3) return { p: 1, s: 1 };
  return { p: 0.85, s: 0.85 };
}

function insideCrust(x: number, y: number, slip: number) {
  const surface = groundY(x) + (x < FAULT ? -slip : slip);
  return y > surface + 2 && y < CRUST_BOTTOM - 4 && x > LEFT + 4 && x < RIGHT - 4;
}

function StepPicker({ step, onStep }: { step: number; onStep: (step: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Trinn i bølgegenereringen">
      {STEPS.map((item, index) => {
        const n = index + 1;
        const active = step === n;
        return (
          <button
            key={item.label}
            type="button"
            aria-pressed={active}
            onClick={() => onStep(n)}
            className={`min-h-11 rounded-full border px-3 py-1.5 text-sm font-semibold ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-muted/60 text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function BolgegenereringDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useState(1);
  const [auto, setAuto] = useState(true);
  const [tempo, setTempo] = useState(1);
  const [phase, setPhase] = useState(2.2);
  const [anchor, setAnchor] = useState(0);
  const maskId = useId().replace(/:/g, "");
  const gradL = `${maskId}-gl`;
  const gradR = `${maskId}-gr`;

  const dur = DUR[step - 1] ?? 7;
  const raw = Math.max(0, phase - anchor);
  const local = raw % dur;
  const story = STEPS[step - 1] ?? STEPS[0];
  const slip = slipOf(step, local);
  const bend = bendOf(step, local);
  const t = sceneTime(step, local);
  const gain = step === 6 ? 1 : step === 7 ? 1.15 : 0;
  const scales = emphasis(step);
  const showBreak = step >= 2;
  const showBody = step >= 3 && step <= 6;
  const showParticles = step >= 3 && step <= 5;
  const showSurface = step >= 6;
  const formationBeat = beatIndex(t);
  const flash =
    step === 2 ? Math.exp(-Math.max(0, local - 0.38) * 2.8) * smoothstep(local / 0.12) : step === 3 && local < 0.45 ? 1 - local / 0.45 : 0;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setPhase((value) => value + dt * tempo);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, tempo]);

  const advancing = useRef(false);
  useEffect(() => {
    if (!playing || !auto) return;
    if (raw < dur) {
      advancing.current = false;
      return;
    }
    if (advancing.current) return;
    advancing.current = true;
    setStep((current) => (current >= STEPS.length ? 1 : current + 1));
    setAnchor(phase);
  }, [auto, dur, phase, playing, raw]);

  function goTo(next: number) {
    const wrapped = next < 1 ? STEPS.length : next > STEPS.length ? 1 : next;
    setStep(wrapped);
    const start = playing ? 0 : (POSTER[wrapped - 1] ?? 0);
    setAnchor(phase - start);
    setAuto(false);
  }

  const block = (x0: number, x1: number, yShift: number) => {
    const top = sampleX(x0, x1, 8).map((x) => {
      const wave = rayleigh(x, 0, t, gain);
      return [x, groundY(x) + yShift + wave.dy] as [number, number];
    });
    return pathFrom([...top, [x1, CRUST_BOTTOM], [x0, CRUST_BOTTOM]], true);
  };

  const softBand = (x0: number, x1: number, yShift: number) => {
    const xs = sampleX(x0, x1, 8);
    const top = xs.map((x) => {
      const wave = rayleigh(x, 0, t, gain);
      return [x, groundY(x) + yShift + wave.dy] as [number, number];
    });
    const bottom = xs
      .slice()
      .reverse()
      .map((x) => {
        const wave = rayleigh(x, SOFT, t, gain);
        return [x, groundY(x) + yShift + SOFT + wave.dy] as [number, number];
      });
    return pathFrom([...top, ...bottom], true);
  };

  const layer = (depth: number, x0: number, x1: number, yShift: number) =>
    pathFrom(
      sampleX(x0, x1, 10).map((x) => {
        const wave = rayleigh(x, depth, t, gain);
        return [x + wave.dx * 0.85, groundY(x) + yShift + depth + bendOffset(x, bend) + wave.dy] as [number, number];
      }),
    );

  const maskPath = `${block(LEFT, FAULT, -slip)} ${block(FAULT, RIGHT, slip)}`;
  const reachP = surfaceReach(VP, t);
  const reachS = surfaceReach(VS, t);
  const buried = depth0();
  const tS0 = buried / VS;
  const reachLove = Math.max(0, VL * (t - tS0));
  const reachRay = Math.max(0, VR * (t - tS0));

  const rayN = 13;
  const rayGap = 38;
  const rayPoint = (index: number) => {
    const x = FAULT + 36 + index * rayGap;
    const shift = showParticles ? bodyMotion(x, HYPO_Y, t, scales.p, scales.s) : { x: 0, y: 0 };
    return { x: x + shift.x, y: HYPO_Y + shift.y };
  };

  const marked = 4;
  const trail = Array.from({ length: 22 }, (_, k) => {
    const past = Math.max(0, t - k * 0.07);
    const x = FAULT + 36 + marked * rayGap;
    const shift = bodyMotion(x, HYPO_Y, past, scales.p, scales.s);
    return { x: x + shift.x, y: HYPO_Y + shift.y };
  });

  const houseWave = rayleigh(HOUSE_X, 0, t, gain);
  const houseY = groundY(HOUSE_X) + slip + houseWave.dy;
  const guideS = clamp(reachRay * 0.62, 70, 430);
  const guideX = FAULT + guideS;

  let tight = { x: 0, strain: 0 };
  let loose = { x: 0, strain: 0 };
  if (step === 4) {
    tight = { x: FAULT, strain: 0 };
    loose = { x: FAULT, strain: 0 };
    for (let index = 0; index < rayN - 1; index += 1) {
      const a = rayPoint(index);
      const b = rayPoint(index + 1);
      const strain = (b.x - a.x - rayGap) / rayGap;
      const mid = (a.x + b.x) / 2;
      if (strain < tight.strain) tight = { x: mid, strain };
      if (strain > loose.strain) loose = { x: mid, strain };
    }
  }

  const traceHead =
    step >= 7 ? 1 : step >= 6 ? Math.max(0.78, Math.min(1, local / (dur * 0.92))) : step >= 3 ? Math.max(0.48, Math.min(1, local / (dur * 0.9))) : Math.min(1, local / dur);
  const rP = VP * t;
  const rS = VS * t;

  return (
    <div data-model="bolgegenerering">
      <Diagram
        title="Hvordan P- og S-bølger sendes ut samtidig, og hvordan overflatebølger blir til langs bakken"
        heading="Fra brudd til rystelse"
        wide
        scroll
        caption="Bruddet sender ut P og S i samme øyeblikk. Heltrukken front er P, ca. 6 km/s, og den skyver fjellet langs strålen. Stiplet front er S, ca. 3,5 km/s, og den skjærer på tvers. Når frontene treffer den frie overflaten, kastes de tilbake. Bevegelsen som blir igjen, løper langs bakken: Rayleigh ruller i ellipser som dør ut nedover, Love rister sideveis i det løse topplaget. Overflatebølgene kommer sist og har størst utslag. Tiden er bremset, men fartsforholdet er beholdt. Skorpa er uten målestokk."
        viewBox="0 0 960 640"
        action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} name="fra brudd til rystelse" />}
        toolbar={
          <>
            <StepPicker step={step} onStep={goTo} />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="min-h-11 rounded-full border border-border/80 bg-muted/60 px-3 text-sm text-foreground hover:bg-muted"
              >
                Forrige
              </button>
              <button
                type="button"
                onClick={() => goTo(step + 1)}
                className="min-h-11 rounded-full border border-border/80 bg-muted/60 px-3 text-sm text-foreground hover:bg-muted"
              >
                Neste
              </button>
              <button
                type="button"
                aria-pressed={auto}
                onClick={() => setAuto((value) => !value)}
                className={`min-h-11 rounded-full border px-3 text-sm font-medium ${
                  auto ? "border-primary bg-primary text-primary-foreground" : "border-border/80 bg-muted/60 text-foreground"
                }`}
              >
                {auto ? "Spiller trinnene" : "Spill trinnene"}
              </button>
            </div>
            <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-foreground">
              <span>Tempo</span>
              <input
                type="range"
                min={0.4}
                max={1.8}
                step={0.05}
                value={tempo}
                aria-label="Tempo"
                onChange={(event) => setTempo(Number(event.target.value))}
                className="w-28 cursor-pointer accent-primary sm:w-36"
              />
              <span className="font-mono text-sm text-primary">{tempo < 0.75 ? "sakte" : tempo > 1.3 ? "rask" : "vanlig"}</span>
            </label>
          </>
        }
      >
        {(m) => (
          <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-step={step} data-beat={step === 6 ? formationBeat : step === 7 ? 3 : 0}>
            <defs>
              <linearGradient id={gradL} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={SOFT_L} />
                <stop offset="0.18" stopColor={CRUST_L} />
                <stop offset="1" stopColor={CRUST_L_DEEP} />
              </linearGradient>
              <linearGradient id={gradR} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={SOFT_R} />
                <stop offset="0.18" stopColor={CRUST_R} />
                <stop offset="1" stopColor={CRUST_R_DEEP} />
              </linearGradient>
              <mask id={maskId}>
                <rect width="960" height="640" fill="black" />
                <path d={maskPath} fill="white" />
              </mask>
            </defs>

            <rect x="16" y="16" width="928" height="608" fill="#10181e" />
            <path d={block(LEFT, FAULT, -slip)} fill={`url(#${gradL})`} />
            <path d={block(FAULT, RIGHT, slip)} fill={`url(#${gradR})`} />
            <path d={softBand(LEFT, FAULT, -slip)} fill={SOFT_L} opacity="0.55" />
            <path d={softBand(FAULT, RIGHT, slip)} fill={SOFT_R} opacity="0.72" />

            {LAYER_DEPTHS.map((depth) => (
              <g key={depth}>
                <path d={layer(depth, LEFT, FAULT - 2, -slip)} fill="none" stroke={C.sand} strokeWidth="1.4" opacity={step <= 2 ? 0.8 : 0.38} />
                <path d={layer(depth, FAULT + 2, RIGHT, slip)} fill="none" stroke={C.sand} strokeWidth="1.4" opacity={step <= 2 ? 0.8 : 0.38} />
              </g>
            ))}

            <path
              d={pathFrom(
                sampleX(LEFT, FAULT, 8).map((x) => {
                  const wave = rayleigh(x, 0, t, gain);
                  return [x, groundY(x) - slip + wave.dy] as [number, number];
                }),
              )}
              fill="none"
              stroke={GRASS}
              strokeWidth="3.2"
            />
            <path
              d={pathFrom(
                sampleX(FAULT, RIGHT, 8).map((x) => {
                  const wave = rayleigh(x, 0, t, gain);
                  return [x, groundY(x) + slip + wave.dy] as [number, number];
                }),
              )}
              fill="none"
              stroke={GRASS}
              strokeWidth="3.2"
            />
            <line
              x1={FAULT}
              y1={groundY(FAULT) - slip}
              x2={FAULT}
              y2={CRUST_BOTTOM}
              stroke={C.low}
              strokeWidth={showBreak ? 2.6 : 2}
            />
            {slip > 1 ? (
              <line
                x1={FAULT}
                y1={groundY(FAULT) - slip}
                x2={FAULT}
                y2={groundY(FAULT) + slip}
                stroke={C.low}
                strokeWidth="4"
              />
            ) : null}

            {step === 1 ? (
              <g>
                <Arrow d="M 118 196 H 214" marker={m.warm} color={C.warm} width={2.6} />
                <Arrow d="M 390 206 H 292" marker={m.warm} color={C.warm} width={2.6} />
                <rect x={FAULT - 11} y={176} width="22" height="24" rx="3" fill={C.low} />
                <L x={FAULT + 16} y={192} fill={C.low} size={13} weight={700}>
                  friksjon låser
                </L>
              </g>
            ) : null}

            {showBody ? (
              <g mask={`url(#${maskId})`}>
                {[0, 1, 2].map((ring) => (
                  <circle
                    key={`p-${ring}`}
                    cx={FAULT}
                    cy={HYPO_Y}
                    r={Math.max(0, rP - ring * 74)}
                    fill="none"
                    stroke={C.teal}
                    strokeWidth={ring === 0 ? 2.4 : 1.3}
                    opacity={ring === 0 ? 0.95 : 0.4}
                  />
                ))}
                {[0, 1, 2].map((ring) => (
                  <circle
                    key={`s-${ring}`}
                    cx={FAULT}
                    cy={HYPO_Y}
                    r={Math.max(0, rS - ring * 58)}
                    fill="none"
                    stroke={C.warm}
                    strokeWidth={ring === 0 ? 2.4 : 1.3}
                    strokeDasharray="7 5"
                    opacity={ring === 0 ? 0.95 : 0.42}
                  />
                ))}
              </g>
            ) : null}

            {showBody && step === 3
              ? [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const px = FAULT + Math.cos(rad) * rP;
                  const py = HYPO_Y + Math.sin(rad) * rP;
                  const sx = FAULT + Math.cos(rad) * rS;
                  const sy = HYPO_Y + Math.sin(rad) * rS;
                  const pOk = rP > 36 && insideCrust(px, py, slip);
                  const sOk = rS > 30 && insideCrust(sx, sy, slip);
                  return (
                    <g key={deg}>
                      {pOk ? (
                        <line
                          x1={px - Math.cos(rad) * 11}
                          y1={py - Math.sin(rad) * 11}
                          x2={px + Math.cos(rad) * 11}
                          y2={py + Math.sin(rad) * 11}
                          stroke={C.teal}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      ) : null}
                      {sOk ? (
                        <line
                          x1={sx - Math.cos(rad + Math.PI / 2) * 11}
                          y1={sy - Math.sin(rad + Math.PI / 2) * 11}
                          x2={sx + Math.cos(rad + Math.PI / 2) * 11}
                          y2={sy + Math.sin(rad + Math.PI / 2) * 11}
                          stroke={C.warm}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      ) : null}
                    </g>
                  );
                })
              : null}

            {showBody && rP > 48 && rP < 560 ? (
              <L x={FAULT + Math.min(rP, 520) + 8} y={HYPO_Y - 10} fill={C.teal} size={13} weight={700}>
                P
              </L>
            ) : null}
            {showBody && rS > 42 && rS < 480 ? (
              <L x={FAULT + Math.min(rS, 440) + 8} y={HYPO_Y + 22} fill={C.warm} size={13} weight={700}>
                S
              </L>
            ) : null}

            {showParticles
              ? GRID.map((cell) => {
                  const yShift = cell.x < FAULT ? -slip : slip;
                  const y = groundY(cell.x) + yShift + cell.depth;
                  if (y > CRUST_BOTTOM - 12 || y < groundY(cell.x) + yShift + 20) return null;
                  const shift = bodyMotion(cell.x, y - yShift, t, scales.p, scales.s);
                  const onRay = Math.abs(y - (HYPO_Y + yShift)) < 24 && cell.x > FAULT;
                  if (onRay) return null;
                  return (
                    <circle
                      key={`${cell.x}-${cell.depth}`}
                      cx={cell.x + shift.x}
                      cy={y + shift.y}
                      r="3.1"
                      fill={step === 5 ? C.warm : step === 4 ? C.teal : C.sand}
                      opacity="0.8"
                    />
                  );
                })
              : null}

            {showParticles ? (
              <g>
                {step === 4
                  ? Array.from({ length: rayN - 1 }, (_, index) => {
                      const a = rayPoint(index);
                      const b = rayPoint(index + 1);
                      const strain = (b.x - a.x - rayGap) / rayGap;
                      return (
                        <line
                          key={`link-${index}`}
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                          stroke={strain < -0.035 ? C.teal : strain > 0.035 ? C.cold : C.dim}
                          strokeWidth={Math.abs(strain) > 0.035 ? 2.6 : 1.3}
                        />
                      );
                    })
                  : null}
                {step === 5 ? (
                  <path
                    d={pathFrom(Array.from({ length: rayN }, (_, index) => {
                      const point = rayPoint(index);
                      return [point.x, point.y] as [number, number];
                    }))}
                    fill="none"
                    stroke={C.warm}
                    strokeWidth="1.6"
                    opacity="0.85"
                  />
                ) : null}
                {Array.from({ length: rayN }, (_, index) => {
                  const point = rayPoint(index);
                  const isMark = index === marked;
                  return (
                    <circle
                      key={`ray-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r={isMark ? 6.5 : 4.2}
                      fill={isMark ? C.sand : step === 5 ? C.warm : C.teal}
                      stroke={isMark ? C.fg : "none"}
                      strokeWidth={isMark ? 1.4 : 0}
                    />
                  );
                })}
                <polyline
                  points={trail.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")}
                  fill="none"
                  stroke={C.sand}
                  strokeWidth="1.3"
                  opacity="0.75"
                />
              </g>
            ) : null}

            {step === 4 && tight.strain < -0.04 ? (
              <L x={tight.x} y={HYPO_Y + 28} fill={C.teal} size={12} weight={700} anchor="middle">
                tett
              </L>
            ) : null}
            {step === 4 && loose.strain > 0.04 ? (
              <L x={loose.x} y={HYPO_Y + 46} fill={C.cold} size={12} anchor="middle">
                glissent
              </L>
            ) : null}
            {step === 4 ? (
              <g>
                <Arrow d={`M ${FAULT + 150} ${HYPO_Y - 36} H ${FAULT + 230}`} marker={m.sand} color={C.sand} width={1.7} />
                <L x={FAULT + 190} y={HYPO_Y - 44} fill={C.sand} size={12} anchor="middle">
                  langs bølgen
                </L>
                <L x={FAULT + 210} y={CRUST_BOTTOM - 28} fill={C.warm} size={12}>
                  S er allerede på vei, lenger bak
                </L>
              </g>
            ) : null}
            {step === 5 ? (
              <g>
                <Arrow
                  d={`M ${FAULT + 36 + marked * rayGap + 16} ${HYPO_Y - 26} V ${HYPO_Y + 26}`}
                  marker={m.sand}
                  color={C.sand}
                  width={1.7}
                />
                <L x={FAULT + 36 + marked * rayGap + 24} y={HYPO_Y - 30} fill={C.sand} size={12}>
                  på tvers
                </L>
                <L x={FAULT + 210} y={CRUST_BOTTOM - 28} fill={C.teal} size={12}>
                  P ble sendt ut samtidig og har løpt foran
                </L>
              </g>
            ) : null}

            {showSurface && reachRay > 24 ? (
              <path
                d={(() => {
                  const end = Math.min(FAULT + reachRay, HOUSE_X - 36);
                  const xs = sampleX(FAULT + 16, end, 12);
                  const top = xs.map((x) => [x, groundY(x) + slip] as [number, number]);
                  const bottom = xs
                    .slice()
                    .reverse()
                    .map((x) => {
                      const amp = rayleigh(x, 0, t, gain).amp;
                      return [x, groundY(x) + slip + 14 + amp * 2.6] as [number, number];
                    });
                  return pathFrom([...top, ...bottom], true);
                })()}
                fill={C.low}
                opacity="0.22"
              />
            ) : null}

            {showSurface
              ? SURF_DEPTHS.map((depth) =>
                  SURF_XS.map((x) => {
                    const yShift = x < FAULT ? -slip : slip;
                    const wave = rayleigh(x, depth, t, gain);
                    if (wave.amp < 0.4 && depth > 20) return null;
                    const guide = Math.abs(x - guideX) < 20 && wave.amp > 4;
                    const y0 = groundY(x) + yShift + depth;
                    return (
                      <g key={`sf-${depth}-${x}`}>
                        {guide ? (
                          <ellipse
                            cx={x}
                            cy={y0}
                            rx={Math.max(3, wave.amp)}
                            ry={Math.max(2.4, wave.amp * 0.74)}
                            fill="none"
                            stroke={C.low}
                            strokeWidth="1.15"
                            opacity="0.7"
                          />
                        ) : null}
                        <circle
                          cx={x + wave.dx}
                          cy={y0 + wave.dy}
                          r={depth < 16 ? 4.3 : 3.1}
                          fill={depth < 16 ? C.low : C.sand}
                          opacity={depth < 16 ? 1 : 0.8}
                        />
                      </g>
                    );
                  }),
                )
              : null}

            {step === 6 && reachP > 24 ? (
              <g>
                <Arrow d={reflectPath(Math.min(reachP, 200), slip)} marker={m.cold} color={C.cold} width={2.6} />
                {reachS > 24 ? (
                  <Arrow d={reflectPath(Math.min(reachS, 320), slip)} marker={m.warm} color={C.warm} width={2.4} dash="7 4" />
                ) : null}
                <L x={FAULT + Math.min(reachP, 200) - 78} y={groundY(FAULT) + slip + 118} fill={C.cold} size={13} weight={700}>
                  kastes tilbake
                </L>
              </g>
            ) : null}

            {step === 6 && reachS > 40 ? (
              <g>
                <line
                  x1={FAULT + Math.min(reachS, 400)}
                  y1={groundY(FAULT + Math.min(reachS, 400)) + slip - 18}
                  x2={FAULT + Math.min(reachS, 400)}
                  y2={groundY(FAULT + Math.min(reachS, 400)) + slip + 4}
                  stroke={C.warm}
                  strokeWidth="1.6"
                />
                <L x={FAULT + Math.min(reachS, 400)} y={groundY(FAULT) + slip - 24} fill={C.warm} size={12} anchor="middle" weight={700}>
                  S
                </L>
              </g>
            ) : null}
            {showSurface && reachRay > 36 ? (
              <g>
                <line
                  x1={FAULT + Math.min(reachRay, 420)}
                  y1={groundY(FAULT + Math.min(reachRay, 420)) + slip - 18}
                  x2={FAULT + Math.min(reachRay, 420)}
                  y2={groundY(FAULT + Math.min(reachRay, 420)) + slip + 6}
                  stroke={C.low}
                  strokeWidth="1.8"
                />
                <L
                  x={FAULT + Math.min(reachRay, 420)}
                  y={groundY(FAULT) - slip - 22}
                  fill={C.low}
                  size={12}
                  anchor="middle"
                  weight={700}
                >
                  Rayleigh
                </L>
              </g>
            ) : null}

            {step === 6 && reachLove > 30 ? (
              <path
                d={(() => {
                  const pts: Array<[number, number]> = [];
                  const end = FAULT + Math.min(170, reachLove);
                  let x = FAULT + 8;
                  let down = true;
                  pts.push([x, groundY(x) + slip + 5]);
                  while (x < end) {
                    x = Math.min(end, x + 34);
                    pts.push([x, groundY(x) + slip + (down ? SOFT - 4 : 5)]);
                    down = !down;
                  }
                  return pathFrom(pts);
                })()}
                fill="none"
                stroke={C.sand}
                strokeWidth="1.7"
                strokeDasharray="4 3"
              />
            ) : null}
            {step === 6 && reachLove > 40 ? (
              <L x={FAULT + 168} y={groundY(FAULT) + slip + SOFT + 16} fill={C.sand} size={12} weight={700}>
                Love fanges i topplaget
              </L>
            ) : null}

            {showSurface && gain > 0 && step === 6 ? (
              <g>
                <line
                  x1={guideX}
                  y1={groundY(guideX) + slip}
                  x2={guideX}
                  y2={groundY(guideX) + slip + 130}
                  stroke={C.low}
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.8"
                />
                <L x={guideX + 8} y={groundY(guideX) + slip + 132} fill={C.low} size={12}>
                  dør ut nedover
                </L>
              </g>
            ) : null}

            {showSurface ? (
              <g>
                <rect x="48" y="346" width="214" height="70" rx="8" fill="#10181e" stroke={C.dim} />
                <L x="60" y="364" fill={C.sand} size={13} weight={700}>
                  Love, sett ovenfra
                </L>
                <L x="60" y="380" fill={C.muted} size={11}>
                  sideveis, bare i topplaget
                </L>
                <line x1="62" y1="402" x2="246" y2="402" stroke={C.dim} strokeWidth="1" />
                {Array.from({ length: 11 }, (_, index) => {
                  const distance = 18 + index * 16;
                  const z = loveShift(distance, t) * 0.55;
                  return <circle key={index} cx={68 + index * 16} cy={398 + z} r="3" fill={C.sand} />;
                })}
              </g>
            ) : null}

            {showSurface && step === 7 ? (
              <L x={FAULT + 48} y={groundY(FAULT) + slip + SOFT + 14} fill={C.sand} size={12} weight={700}>
                løst topplag
              </L>
            ) : null}

            <g transform={`translate(${HOUSE_X + houseWave.dx} ${houseY}) rotate(${houseWave.dx * 0.55})`}>
              <path d="M -20 1 L 0 -20 L 20 1 V 22 H -20 Z" fill={C.sand} stroke={C.bg} strokeWidth="1" />
              <rect x="-6" y="8" width="8" height="14" fill={WINDOW} />
              <rect x="6" y="9" width="6" height="6" fill={WINDOW} />
              {step === 7 ? <path d="M -2 4 L 3 10 L 0 16" fill="none" stroke={C.low} strokeWidth="1.2" /> : null}
            </g>

            {flash > 0.04 ? (
              <circle cx={FAULT} cy={HYPO_Y} r={10 + flash * 28} fill={C.low} opacity={0.18 * flash} />
            ) : null}

            {showBreak ? (
              <g>
                <line
                  x1={FAULT}
                  y1={groundY(FAULT) - slip}
                  x2={FAULT}
                  y2={HYPO_Y}
                  stroke={C.muted}
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
                <circle cx={FAULT} cy={groundY(FAULT) - slip} r="5" fill={C.fg} stroke={C.low} strokeWidth="1.5" />
                <L x={FAULT + 12} y={groundY(FAULT) - slip - 10} fill={C.fg} size={13} weight={700}>
                  episenter
                </L>
                <path d={starPath(FAULT, HYPO_Y, 9)} fill={C.low} />
                <L x={FAULT - 14} y={HYPO_Y + 4} fill={C.low} size={13} weight={700} anchor="end">
                  hyposenter
                </L>
              </g>
            ) : (
              <L x={FAULT + 14} y={150} fill={C.low} size={13} weight={700}>
                forkastning
              </L>
            )}

            <L x="40" y="42" fill={C.fg} size={16} weight={650}>
              {story.title}
            </L>
            {step === 3 ? (
              <L x="430" y="42" fill={C.fg} size={14} weight={700}>
                samme brudd, to bølger
              </L>
            ) : null}

            <L x="40" y={CRUST_BOTTOM - 10} fill={C.muted} size={12}>
              jordskorpe
            </L>
            {showBody ? (
              <L x="150" y={CRUST_BOTTOM - 10} fill={C.teal} size={12} weight={700}>
                P ca. 6 km/s
              </L>
            ) : null}
            {showBody ? (
              <L x="280" y={CRUST_BOTTOM - 10} fill={C.warm} size={12} weight={700}>
                S ca. 3,5 km/s
              </L>
            ) : null}
            {showSurface ? (
              <L x="430" y={CRUST_BOTTOM - 10} fill={C.low} size={12} weight={700}>
                overflate sist, størst utslag
              </L>
            ) : null}

            <L x="40" y="456" fill={C.fg} size={14} weight={700}>
              Seismogram ved huset
            </L>
            <L x="250" y="456" fill={C.muted} size={12}>
              {step < 3 ? "Stille. Ingen bølger før bruddet." : "P og S ble sendt ut samtidig. P kommer likevel først fram."}
            </L>
            <line x1="40" y1="548" x2="900" y2="548" stroke={C.dim} strokeWidth="1.2" />
            <path
              d={Array.from({ length: 160 }, (_, index) => {
                const u = (index / 159) * traceHead;
                const x = 40 + (index / 159) * 860;
                const y = 548 - traceAmp(u, step);
                return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
              }).join(" ")}
              fill="none"
              stroke={C.fg}
              strokeWidth="1.7"
            />
            {step >= 3 && traceHead > 0.16 ? (
              <L x={40 + 0.16 * 860} y="508" fill={C.teal} size={12} anchor="middle" weight={700}>
                P
              </L>
            ) : null}
            {step >= 3 && traceHead > 0.34 ? (
              <L x={40 + 0.34 * 860} y="498" fill={C.warm} size={12} anchor="middle" weight={700}>
                S
              </L>
            ) : null}
            {step >= 6 && traceHead > 0.55 ? (
              <L x={40 + 0.66 * 860} y="492" fill={C.low} size={12} anchor="middle" weight={700}>
                overflate
              </L>
            ) : null}
            <L x="40" y="590" fill={C.muted} size={12}>
              tid etter bruddet, ved huset
            </L>
            {step >= 6 ? (
              <L x="560" y="590" fill={C.muted} size={12}>
                overflatesvingningene er trege og store
              </L>
            ) : null}
          </g>
        )}
      </Diagram>
      <section className="mt-4 rounded-xl border border-border bg-card px-4 py-4 sm:px-5" aria-live="polite">
        <p className="text-sm font-semibold text-primary">{story.label}</p>
        <h3 className="mt-1 font-display text-2xl font-medium tracking-tight text-foreground">{story.title}</h3>
        {step === 6 ? (
          <ol className="mt-3 grid gap-2 sm:grid-cols-4">
            {BEATS.map((text, index) => (
              <li
                key={text}
                className={`rounded-lg border px-3 py-2 text-sm leading-snug ${
                index === formationBeat ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
                }`}
              >
                <span className="font-semibold">{index + 1}. </span>
                {text}
              </li>
            ))}
          </ol>
        ) : null}
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground">{story.body}</p>
      </section>
    </div>
  );
}
