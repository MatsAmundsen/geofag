import { useEffect, useRef, useState } from "react";
import { Lab, Readouts, Slider, Transport } from "./lab";
import { clearPaper, fitCanvas } from "./draw";
import { G } from "./sim/swe";
import { advanceLinear, makeLinear, type Linear1D } from "./sim/linear";
import { greenRatio } from "./sim/profiles";
import { caption, paintRock, paintWaterColumn, skyTo } from "./paint";
import { ink } from "./sim/palette";

const N = 480;
const L = 520_000;

function depthOf(x: number, deep: number) {
  const t = x / L;
  if (t < 0.42) return deep;
  if (t > 0.8) return 90;
  const u = (t - 0.42) / 0.38;
  const s = u * u * (3 - 2 * u);
  return deep + (90 - deep) * s;
}

export function ModelShoal() {
  const [deep, setDeep] = useState(4000);
  const [period, setPeriod] = useState(20);
  const [amp, setAmp] = useState(0.8);
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState({
    cDeep: 0,
    cHere: 0,
    hDeep: 0,
    hHere: 0,
    green: 1,
    xFrac: 0,
    minutes: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Linear1D>(makeLinear(N, L / N));
  const time = useRef(0);
  const play = useRef(false);
  const maxEta = useRef(new Float64Array(N));
  const prevCrest = useRef(0);
  const params = useRef({ deep, period, amp });
  params.current = { deep, period, amp };
  play.current = playing;

  const reset = () => {
    const { deep: D, period: Pmin, amp: A } = params.current;
    const s = sim.current;
    const T = Pmin * 60;
    const c0 = Math.sqrt(G * D);
    const x0 = 70_000;
    maxEta.current.fill(0);
    time.current = 0;
    prevCrest.current = x0;
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * s.dx;
      const d = depthOf(x, D);
      s.d[i] = d;
      const packet = Math.exp(-Math.pow((x - x0) / (c0 * T * 0.42), 2));
      const e = A * packet * Math.cos((2 * Math.PI * (x - x0)) / (c0 * T));
      s.eta[i] = e;
    }
    for (let i = 1; i < N; i++) {
      const df = Math.min(s.d[i], s.d[i - 1]);
      const ef = 0.5 * (s.eta[i] + s.eta[i - 1]);
      s.u[i] = df > 1 ? ef * Math.sqrt(G / df) : 0;
    }
    s.u[0] = 0;
    s.u[N] = 0;
    setPlaying(false);
    setView((v) => ({ ...v, minutes: 0, hDeep: 0, hHere: 0 }));
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deep, period, amp]);

  useEffect(() => {
    let frame = 0;
    let acc = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (play.current) {
        advanceLinear(sim.current, 8);
        time.current += 8;
        const s = sim.current;
        let crest = 0;
        let crestE = -1;
        for (let i = 0; i < N; i++) {
          maxEta.current[i] = Math.max(maxEta.current[i], s.eta[i]);
          if (s.eta[i] > crestE) {
            crestE = s.eta[i];
            crest = (i + 0.5) * s.dx;
          }
        }
        prevCrest.current = crest;
        acc++;
        if (acc % 6 === 0) publish();
      }
      draw();
    };
    const publish = () => {
      const D = params.current.deep;
      const s = sim.current;
      const iDeep = Math.round(N * 0.18);
      const iHere = crestIndex();
      const dHere = s.d[iHere];
      const cDeep = Math.sqrt(G * D);
      const cHere = Math.sqrt(G * Math.max(dHere, 1));
      setView({
        cDeep,
        cHere,
        hDeep: maxEta.current[iDeep],
        hHere: maxEta.current[iHere],
        green: greenRatio(D, Math.max(dHere, 1)),
        xFrac: iHere / N,
        minutes: time.current / 60,
      });
    };
    function crestIndex() {
      let best = 0;
      let e = -1;
      const s = sim.current;
      for (let i = 0; i < N; i++) if (s.eta[i] > e) {
        e = s.eta[i];
        best = i;
      }
      return best;
    }
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      clearPaper(ctx, w, h);
      const s = sim.current;
      const pad = 16;
      const sea = 48;
      const bedPx = (h - 92) / (params.current.deep + 200);
      const xOf = (i: number) => pad + (i / (N - 1)) * (w - pad * 2);
      skyTo(ctx, w, sea);
      let maxA = 0.3;
      for (let i = 0; i < N; i++) maxA = Math.max(maxA, Math.abs(s.eta[i]), maxEta.current[i]);
      const wavePx = Math.min(28, 80 / maxA);
      const surf: { x: number; y: number }[] = [];
      const bed: { x: number; y: number }[] = [];
      for (let i = 0; i < N; i += 2) {
        surf.push({ x: xOf(i), y: sea - s.eta[i] * wavePx });
        bed.push({ x: xOf(i), y: sea + s.d[i] * bedPx });
      }
      paintWaterColumn(ctx, surf, bed);
      paintRock(ctx, bed, h - 18);

      const peaks: number[] = [];
      for (let i = 2; i < N - 2; i++) {
        if (s.eta[i] > maxA * 0.25 && s.eta[i] >= s.eta[i - 1] && s.eta[i] > s.eta[i + 1]) peaks.push(i);
      }
      if (peaks.length >= 2) {
        const a = peaks[peaks.length - 2];
        const b = peaks[peaks.length - 1];
        const y = sea - 18;
        ctx.strokeStyle = ink.mark;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(xOf(a), y);
        ctx.lineTo(xOf(b), y);
        ctx.moveTo(xOf(a), y - 4);
        ctx.lineTo(xOf(a), y + 4);
        ctx.moveTo(xOf(b), y - 4);
        ctx.lineTo(xOf(b), y + 4);
        ctx.stroke();
        const km = ((b - a) * s.dx) / 1000;
        ctx.fillStyle = ink.mark;
        ctx.font = "12px Source Sans 3, sans-serif";
        ctx.fillText(`λ ≈ ${km.toFixed(0)} km`, (xOf(a) + xOf(b)) / 2 - 28, y - 6);
      }

      ctx.strokeStyle = ink.text;
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.2;
      for (const frac of [0.16, 0.55, 0.78]) {
        const i = Math.round(N * frac);
        const x = xOf(i);
        const top = sea - s.eta[i] * wavePx;
        const bot = sea + Math.min(s.d[i], params.current.deep * 0.35) * bedPx;
        const amp = Math.max(6, Math.min(26, Math.abs(s.eta[i]) * wavePx * 1.4));
        const dir = Math.sign(s.u[i] || s.u[Math.min(N, i + 1)] || 1);
        for (let p = 0; p < 3; p++) {
          const y = top + ((p + 0.5) / 3) * Math.max(12, bot - top);
          ctx.beginPath();
          ctx.moveTo(x - dir * amp, y);
          ctx.lineTo(x + dir * amp, y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      const ci = crestIndex();
      const cx = xOf(ci);
      ctx.strokeStyle = ink.mark;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, 28);
      ctx.lineTo(cx, sea + s.d[ci] * bedPx);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = ink.text;
      ctx.font = "12px Source Sans 3, sans-serif";
      ctx.fillText("dyphav", pad + 4, sea + 16);
      const shelf = xOf(Math.round(N * 0.62));
      ctx.fillText("skråning", shelf - 20, sea + Math.min(h - 80, sea + params.current.deep * 0.45 * bedPx));
      ctx.fillText("sokkel", w - pad - 52, sea + 16);
      caption(
        ctx,
        `Vannflaten ×${Math.round(wavePx / bedPx)} mot dypet. Strekene er vannets fram-og-tilbake, like lange nedover søylen.`,
        pad,
        h - 6,
      );
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const measured = view.hDeep > 0.05 ? view.hHere / view.hDeep : 0;
  const kmh = (v: number) => `${((v * 3.6) / 1).toFixed(0)} km/t`;

  return (
    <Lab
      id="m2"
      index="M2"
      title="Fra dypt hav inn på sokkelen"
      replaces="Erstatter den gamle M2, som bare flyttet en prikk etter formelen."
      question="Hvorfor blir bølgen saktere og vanligvis høyere når dypet minker, og når svikter den enkle regelen?"
      assume="Lineær lang bølge, v = √(g d) med g = 9,81 m/s². Green-tilnærmingen sier at høyden vokser som (d₀/d)¹ᐟ⁴ når energitapet er lite og bølgen ikke spres sideveis. Den gjelder ikke i et skrednedslag, og den er ikke oppskylling. Sokkelen er satt til 90 m."
      conclusion={
        view.hHere < 0.05
          ? `På ${deep} m er farten ${kmh(Math.sqrt(G * deep))}. La toppen nå sokkelen før du leser høydeforholdet.`
          : `Der markøren er nå, er farten ${kmh(view.cHere)}. Green venter høydeforhold ${view.green.toFixed(2)}. Modellen har så langt ${measured.toFixed(2)}. Avviket kommer av at pakken er endelig, av refleksjon i skråningen, og av at Green ikke er en fasit helt inn.`
      }
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas ref={canvasRef} className="h-[380px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Slider label="Dyp ute" value={deep} min={2000} max={6000} step={100} unit="m" onChange={setDeep} />
        <Slider label="Periode" value={period} min={10} max={40} step={1} unit="min" onChange={setPeriod} />
        <Slider label="Høyde ute" value={amp} min={0.3} max={2} step={0.1} unit="m" onChange={setAmp} />
      </div>
      <Transport
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={reset}
        time={`${view.minutes.toFixed(1)} min`}
      />
      <Readouts
        items={[
          { k: "Fart ute", v: kmh(Math.sqrt(G * deep)), hint: `${Math.sqrt(G * deep).toFixed(0)} m/s` },
          { k: "Fart ved toppen", v: kmh(view.cHere || Math.sqrt(G * deep)) },
          { k: "Høyde ute, maks", v: `${view.hDeep.toFixed(2)} m` },
          { k: "Høyde ved toppen, maks", v: `${view.hHere.toFixed(2)} m`, hint: `Green ×${view.green.toFixed(2)}` },
          {
            k: "Bølgelengde ute",
            v: `${((Math.sqrt(G * deep) * period * 60) / 1000).toFixed(0)} km`,
            hint: "λ = v · T",
          },
          {
            k: "Bølgelengde ved toppen",
            v: `${(((view.cHere || Math.sqrt(G * deep)) * period * 60) / 1000).toFixed(0)} km`,
            hint: "kortere på sokkelen",
          },
        ]}
      />
    </Lab>
  );
}
