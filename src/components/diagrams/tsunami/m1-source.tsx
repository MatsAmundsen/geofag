import { useEffect, useRef, useState } from "react";
import { Choice, Lab, Readouts, Slider, Transport } from "./lab";
import { clearPaper, fitCanvas } from "./draw";
import { seafloorUz, type FaultParams } from "./sim/fault";
import { advanceLinear, makeLinear, type Linear1D } from "./sim/linear";
import { caption, paintRock, paintWaterColumn, skyTo } from "./paint";
import { ink } from "./sim/palette";

const N = 420;
const L = 680_000;

type Preset = "skyv" | "side" | "normal";

const PRESET: Record<Preset, { slip: number; dip: number; rake: number; width: number; depth: number }> = {
  skyv: { slip: 12, dip: 14, rake: 90, width: 100, depth: 12 },
  side: { slip: 12, dip: 14, rake: 0, width: 100, depth: 12 },
  normal: { slip: 6, dip: 50, rake: -90, width: 40, depth: 8 },
};

function bedAt(x: number) {
  const coast = L * 0.8;
  if (x < coast * 0.62) return 4400;
  if (x < coast) {
    const u = (x - coast * 0.62) / (coast * 0.38);
    const s = u * u * (3 - 2 * u);
    return 4400 + (50 - 4400) * s;
  }
  return 0;
}

function load(sim: Linear1D, bedDisp: Float64Array, p: FaultParams) {
  for (let i = 0; i < N; i++) {
    const x = (i + 0.5) * sim.dx;
    const d = bedAt(x);
    sim.d[i] = d;
    sim.u[i] = 0;
    const uz = d > 20 ? seafloorUz(x, p) : 0;
    bedDisp[i] = uz;
    sim.eta[i] = uz;
  }
  sim.u[N] = 0;
}

export function ModelSource() {
  const [preset, setPreset] = useState<Preset>("skyv");
  const [slip, setSlip] = useState(PRESET.skyv.slip);
  const [dip, setDip] = useState(PRESET.skyv.dip);
  const [rake, setRake] = useState(PRESET.skyv.rake);
  const [width, setWidth] = useState(PRESET.skyv.width);
  const [depth, setDepth] = useState(PRESET.skyv.depth);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Linear1D>(makeLinear(N, L / N));
  const bedDisp = useRef(new Float64Array(N));
  const time = useRef(0);
  const play = useRef(false);
  const params = useRef({ slip, dip, rake, width, depth });
  params.current = { slip, dip, rake, width, depth };
  play.current = playing;

  const fault = (): FaultParams => {
    const p = params.current;
    return {
      slip: p.slip,
      dipDeg: p.dip,
      rakeDeg: p.rake,
      width: p.width * 1000,
      depth: p.depth * 1000,
      xTop: L * 0.28,
    };
  };

  const reset = () => {
    time.current = 0;
    load(sim.current, bedDisp.current, fault());
    setPlaying(false);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slip, dip, rake, width, depth]);

  useEffect(() => {
    let frame = 0;
    let acc = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (play.current) {
        advanceLinear(sim.current, 6);
        time.current += 6;
        acc++;
        if (acc % 8 === 0) setTick((t) => t + 1);
      }
      draw();
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = fitCanvas(canvas);
    if (!fit) return;
    const { ctx, w, h } = fit;
    clearPaper(ctx, w, h);
    const s = sim.current;
    const disp = bedDisp.current;
    const pad = 16;
    const topH = Math.max(86, h * 0.28);
    skyTo(ctx, w, pad + topH);
    ctx.strokeStyle = ink.line;
    ctx.strokeRect(pad, pad, w - pad * 2, topH);
    let maxA = 0.25;
    for (let i = 0; i < N; i++) maxA = Math.max(maxA, Math.abs(s.eta[i]));
    const mid = pad + topH * 0.62;
    const xOf = (i: number) => pad + (i / (N - 1)) * (w - pad * 2);
    ctx.beginPath();
    ctx.strokeStyle = ink.muted;
    ctx.setLineDash([3, 4]);
    ctx.moveTo(pad + 8, mid);
    ctx.lineTo(w - pad - 8, mid);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(xOf(0), mid);
    for (let i = 0; i < N; i++) ctx.lineTo(xOf(i), mid - (s.eta[i] / maxA) * (topH * 0.34));
    ctx.lineTo(xOf(N - 1), mid + topH * 0.22);
    ctx.lineTo(xOf(0), mid + topH * 0.22);
    ctx.closePath();
    const wash = ctx.createLinearGradient(0, mid - topH * 0.34, 0, mid + 8);
    wash.addColorStop(0, ink.waterTop);
    wash.addColorStop(1, ink.seaLite);
    ctx.fillStyle = wash;
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.strokeStyle = ink.sea;
    ctx.lineWidth = 1.8;
    for (let i = 0; i < N; i++) {
      const y = mid - (s.eta[i] / maxA) * (topH * 0.34);
      if (i === 0) ctx.moveTo(xOf(i), y);
      else ctx.lineTo(xOf(i), y);
    }
    ctx.stroke();
    caption(ctx, `Vannflate, forstørret. Skala ±${maxA.toFixed(1)} m. Stiplet er stille hav.`, pad + 8, pad + 16);

    const plotTop = pad + topH + 10;
    const plotBot = h - 22;
    const zMax = 34000;
    const zPx = (z: number) => plotTop + (z / zMax) * (plotBot - plotTop);
    const bed: { x: number; y: number }[] = [];
    const surf: { x: number; y: number }[] = [];
    const wavePx = Math.min(18, (plotBot - plotTop) * 0.08 / maxA);
    for (let i = 0; i < N; i += 2) {
      const x = xOf(i);
      const d = s.d[i];
      const bedY = d > 1 ? zPx(d) : zPx(0);
      bed.push({ x, y: bedY });
      surf.push({ x, y: d > 1 ? zPx(0) - s.eta[i] * wavePx : bedY });
    }
    skyTo(ctx, w, zPx(0));
    paintWaterColumn(ctx, surf, bed);
    paintRock(ctx, bed, plotBot);

    let maxDisp = 0.4;
    for (let i = 0; i < N; i++) maxDisp = Math.max(maxDisp, Math.abs(disp[i]));
    const rib = Math.min(26, (plotBot - plotTop) * 0.09);
    const yBed = (i: number) => zPx(s.d[i]);
    const yUz = (i: number) => yBed(i) - (disp[i] / maxDisp) * rib;
    ctx.lineWidth = 1.6;
    for (let i = 2; i < N; i += 2) {
      if (s.d[i] < 30 || s.d[i - 2] < 30) continue;
      ctx.beginPath();
      ctx.moveTo(xOf(i - 2), yBed(i - 2));
      ctx.lineTo(xOf(i), yBed(i));
      ctx.lineTo(xOf(i), yUz(i));
      ctx.lineTo(xOf(i - 2), yUz(i - 2));
      ctx.closePath();
      const up = disp[i] >= 0;
      ctx.fillStyle = up ? ink.uplift : ink.sink;
      ctx.globalAlpha = 0.55;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < N; i += 2) {
      if (s.d[i] < 30) {
        pen = false;
        continue;
      }
      const x = xOf(i);
      const y = yUz(i);
      if (!pen) {
        ctx.moveTo(x, y);
        pen = true;
      } else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ink.sea;
    ctx.stroke();

    const p = params.current;
    const dip = (p.dip * Math.PI) / 180;
    const xTop = L * 0.28;
    const horiz = p.width * 1000 * Math.cos(dip);
    const drop = p.width * 1000 * Math.sin(dip);
    const z1 = bedAt(xTop) + p.depth * 1000;
    const z2 = z1 + drop;
    const xA = pad + (xTop / L) * (w - pad * 2);
    const xB = pad + (Math.min(L * 0.92, xTop + horiz) / L) * (w - pad * 2);
    ctx.strokeStyle = ink.mark;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xA, zPx(Math.min(zMax - 400, z1)));
    ctx.lineTo(xB, zPx(Math.min(zMax - 400, z2)));
    ctx.stroke();
    ctx.fillStyle = ink.mark;
    ctx.font = "12px Source Sans 3, sans-serif";
    ctx.fillText(`forkastning, fall ${p.dip}°`, xA + 8, zPx(Math.min(zMax - 400, z1)) + 16);

    const pxPerMs = 36 / 0.08;
    ctx.strokeStyle = ink.foam;
    ctx.fillStyle = ink.foam;
    ctx.lineWidth = 1.2;
    for (let k = 0; k < 4; k++) {
      const i = 40 + k * 48;
      if (s.d[i] < 800) continue;
      const u = 0.5 * (s.u[i] + s.u[Math.min(N, i + 1)]);
      if (Math.abs(u) < 0.004) continue;
      const x = xOf(i);
      const top = zPx(0);
      const bot = zPx(s.d[i]);
      const len = Math.max(-48, Math.min(48, u * pxPerMs));
      const y = (top + bot) / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();
      const sgn = Math.sign(len) || 1;
      ctx.beginPath();
      ctx.moveTo(x + len, y);
      ctx.lineTo(x + len - sgn * 5, y - 3);
      ctx.lineTo(x + len - sgn * 5, y + 3);
      ctx.fill();
    }

    caption(
      ctx,
      `Snitt i sann dybdeskala til 34 km. Båndet langs bunnen er løft og senkning, ±${maxDisp.toFixed(1)} m, ikke meter i snittet.`,
      pad,
      h - 8,
    );
    ctx.fillStyle = ink.text;
    ctx.font = "12px Source Sans 3, sans-serif";
    ctx.fillText("kyst", w - pad - 28, zPx(0) - 6);
    ctx.fillStyle = ink.muted;
    ctx.fillText("hav", pad + 4, zPx(2000));
  }

  const s = sim.current;
  let up = 0;
  let down = 0;
  for (let i = 0; i < N; i++) {
    up = Math.max(up, bedDisp.current[i]);
    down = Math.min(down, bedDisp.current[i]);
  }
  let coastI = N - 1;
  for (let i = 0; i < N; i++) if (s.d[i] < 80 && s.d[i] > 20) coastI = i;
  const coastEta = s.eta[coastI];
  const dipSlip = slip * Math.sin((rake * Math.PI) / 180);
  const minutes = time.current / 60;

  const conclusion =
    Math.abs(dipSlip) < 0.4
      ? "Nesten ren sidebevegelse. I denne lange forkastningen løftes ikke havbunnen, og det blir ingen bølge å snakke om. Magnituden er ikke tegnet inn, fordi den ikke flytter vannet."
      : time.current < 30
        ? `Havbunnen løftes ${up.toFixed(1)} m og senkes ${Math.abs(down).toFixed(1)} m. Vannflaten starter som et avtrykk av den bevegelsen. Arealet av løft og senkning er omtrent det samme.`
        : coastEta < -0.05
          ? `Ved kysten kommer senkningen først: havet trekker seg tilbake før toppen. Det følger av hvilken side av kilden du står på. Pilene er like lange fra overflaten til bunnen, fordi hele søylen flyttes.`
          : `Løftet er ${up.toFixed(1)} m. Bølgen har forlatt arrene i havbunnen og går begge veier. Farten i søylen er liten i dypet, men den er den samme fra topp til bunn.`;

  return (
    <Lab
      id="m1"
      index="M1"
      title="Havbunnen flytter vannet"
      replaces="Erstatter den gamle M1, som bare viste en loddrett kloss mot en sidelengs kloss."
      question="Hva må forkastningen gjøre med havbunnen for at det i det hele tatt skal bli en tsunami?"
      assume="Uendelig lang forkastning, så ren sidebevegelse gir null loddrett avtrykk. Startflaten er en elastisk N-bølge med like stort løft og senkning i areal, kalibrert mot den grunne grensen hos Savage (1980), ikke en full Okada-flate. Vannet kopierer havbunnen med én gang og brer seg deretter som en lineær lang bølge. Oppskylling er ikke med her."
      conclusion={conclusion}
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <canvas ref={canvasRef} className="h-[460px] w-full" aria-label={conclusion} />
        </div>
        <div className="flex flex-col gap-3">
          <Choice
            label="Utgangspunkt"
            value={preset}
            options={[
              { id: "skyv", label: "Skyveforkastning" },
              { id: "side", label: "Mest sidelengs" },
              { id: "normal", label: "Normalforkastning" },
            ]}
            onChange={(id0) => {
              setPreset(id0);
              const p = PRESET[id0];
              setSlip(p.slip);
              setDip(p.dip);
              setRake(p.rake);
              setWidth(p.width);
              setDepth(p.depth);
            }}
          />
          <Slider label="Glideutslag" value={slip} min={1} max={30} step={1} unit="m" onChange={setSlip} />
          <Slider label="Fall" value={dip} min={8} max={70} step={1} unit="°" onChange={setDip} />
          <Slider
            label="Rake"
            value={rake}
            min={-90}
            max={90}
            step={5}
            unit="°"
            onChange={setRake}
            note="90 er rent skyv, 0 er rent sidelengs"
          />
          <Slider label="Bredde nedover fallet" value={width} min={20} max={160} step={5} unit="km" onChange={setWidth} />
          <Slider label="Dyp til øvre kant" value={depth} min={1} max={40} step={1} unit="km" onChange={setDepth} />
        </div>
      </div>
      <Transport
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={reset}
        time={`${minutes.toFixed(1)} min`}
      />
      <Readouts
        items={[
          { k: "Løft", v: `${up.toFixed(2)} m` },
          { k: "Senkning", v: `${down.toFixed(2)} m` },
          { k: "Dip-slip", v: `${dipSlip.toFixed(1)} m`, hint: "andel som løfter" },
          { k: "Ved kysten nå", v: `${coastEta.toFixed(2)} m`, hint: coastEta < -0.05 ? "dalen først" : "toppen eller ro" },
        ]}
      />
      <span className="sr-only">{tick}</span>
    </Lab>
  );
}
