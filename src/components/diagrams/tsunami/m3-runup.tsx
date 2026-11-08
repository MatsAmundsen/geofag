import { useEffect, useRef, useState } from "react";
import { Choice, Lab, Readouts, Slider, Transport } from "./lab";
import { clearPaper, fitCanvas } from "./draw";
import { advance, column, fillStill, type Column } from "./sim/swe";
import { ink } from "./sim/palette";

const N = 520;
const L = 9000;

type Beach = "slak" | "bratt";
type Lead = "topp" | "dal";

export function ModelRunup() {
  const [beach, setBeach] = useState<Beach>("slak");
  const [lead, setLead] = useState<Lead>("dal");
  const [amp, setAmp] = useState(1.4);
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState({
    wave: 0,
    runup: 0,
    depth: 0,
    reach: 0,
    minutes: 0,
    crests: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Column>(column(N));
  const time = useRef(0);
  const play = useRef(false);
  const series = useRef<number[]>([]);
  const maxRun = useRef(0);
  const maxReach = useRef(0);
  const gaugeMax = useRef(0);
  const gaugeMin = useRef(0);
  const crestCount = useRef(0);
  const prevSign = useRef(0);
  const params = useRef({ beach, lead, amp });
  params.current = { beach, lead, amp };
  play.current = playing;

  const slope = () => (params.current.beach === "bratt" ? 1 / 18 : 1 / 70);

  const reset = () => {
    const c = sim.current;
    const dx = L / N;
    const m = slope();
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * dx;
      c.b[i] = x < 2800 ? -28 : -28 + (x - 2800) * m;
    }
    fillStill(c, 0);
    const sign = params.current.lead === "dal" ? -1 : 1;
    const A = params.current.amp;
    const cc = Math.sqrt(9.81 * 28);
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * dx;
      if (c.b[i] > -4) continue;
      const e1 = Math.exp(-Math.pow((x - 900) / 280, 2));
      const e2 = 0.85 * Math.exp(-Math.pow((x - 900 - 700) / 280, 2));
      const e = sign * A * (e1 - 0.15 * e2) + (sign > 0 ? A * e2 * 0.7 : 0);
      c.h[i] += e;
      c.hu[i] += e * cc;
    }
    time.current = 0;
    series.current = [];
    maxRun.current = 0;
    maxReach.current = 0;
    gaugeMax.current = 0;
    gaugeMin.current = 0;
    crestCount.current = 0;
    prevSign.current = 0;
    setPlaying(false);
    setStats({ wave: 0, runup: 0, depth: 0, reach: 0, minutes: 0, crests: 0 });
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beach, lead, amp]);

  useEffect(() => {
    const dx = L / N;
    let frame = 0;
    let acc = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      const c = sim.current;
      if (play.current) {
        advance(c, dx, 0.35, 0.02);
        time.current += 0.35;
        let shore = 0;
        for (let i = 0; i < N; i++) if (c.b[i] >= 0) {
          shore = i;
          break;
        }
        let gauge = 0;
        for (let i = 0; i < N; i++) if (c.b[i] > -18 && c.b[i] < -12) gauge = i;
        const ge = c.b[gauge] + c.h[gauge];
        gaugeMax.current = Math.max(gaugeMax.current, ge);
        gaugeMin.current = Math.min(gaugeMin.current, ge);
        if (ge > 0.15 && prevSign.current <= 0) crestCount.current += 1;
        prevSign.current = ge > 0.05 ? 1 : ge < -0.05 ? -1 : prevSign.current;
        series.current.push(ge);
        if (series.current.length > 360) series.current.shift();
        const inland = Math.min(N - 1, shore + Math.round(80 / dx));
        for (let i = shore; i < N; i++) {
          if (c.h[i] > 0.08) {
            maxRun.current = Math.max(maxRun.current, c.b[i] + c.h[i]);
            maxReach.current = Math.max(maxReach.current, (i - shore) * dx);
          }
        }
        acc++;
        if (acc % 8 === 0) {
          setStats({
            wave: gaugeMax.current - gaugeMin.current,
            runup: maxRun.current,
            depth: c.b[inland] > 0 ? c.h[inland] : 0,
            reach: maxReach.current,
            minutes: time.current / 60,
            crests: crestCount.current,
          });
        }
      }
      draw();
    };
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      clearPaper(ctx, w, h);
      const c = sim.current;
      const pad = 16;
      const ground = h - 36;
      const sea = h * 0.42;
      const v = (h * 0.55) / 40;
      const xOf = (i: number) => pad + (i / (N - 1)) * (w - pad * 2);
      const yBed = (b: number) => sea - b * v;
      const ySurf = (b: number, hh: number) => sea - (b + hh) * v;

      ctx.beginPath();
      ctx.moveTo(xOf(0), ySurf(c.b[0], c.h[0]));
      for (let i = 1; i < N; i++) if (c.h[i] > 0.02 || c.b[i] < 0) ctx.lineTo(xOf(i), ySurf(c.b[i], c.h[i]));
      ctx.lineTo(xOf(N - 1), ground);
      ctx.lineTo(xOf(0), ground);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, sea - 40, 0, ground);
      g.addColorStop(0, "#8ec5d4");
      g.addColorStop(1, ink.sea);
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xOf(0), ground);
      for (let i = 0; i < N; i++) ctx.lineTo(xOf(i), Math.min(ground, yBed(c.b[i])));
      ctx.lineTo(xOf(N - 1), ground);
      ctx.closePath();
      ctx.fillStyle = ink.land;
      ctx.fill();
      ctx.strokeStyle = ink.landDark;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = ink.muted;
      ctx.beginPath();
      ctx.moveTo(pad, sea);
      ctx.lineTo(w - pad, sea);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = ink.foam;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < N; i++) {
        if (c.h[i] < 0.02 && c.b[i] > 0) {
          started = false;
          continue;
        }
        const x = xOf(i);
        const y = ySurf(c.b[i], c.h[i]);
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else ctx.lineTo(x, y);
      }
      ctx.stroke();

      let shoreI = 0;
      for (let i = 0; i < N; i++) if (c.b[i] >= 0) {
        shoreI = i;
        break;
      }
      let gaugeI = 0;
      for (let i = 0; i < N; i++) if (c.b[i] > -18 && c.b[i] < -12) gaugeI = i;
      const inlandI = Math.min(N - 1, shoreI + Math.round(80 / (L / N)));
      ctx.strokeStyle = ink.mark;
      ctx.fillStyle = ink.mark;
      ctx.lineWidth = 1.2;
      ctx.font = "12px Source Sans 3, sans-serif";
      if (gaugeMax.current - gaugeMin.current > 0.05) {
        const x = xOf(gaugeI);
        ctx.beginPath();
        ctx.moveTo(x, ySurf(0, gaugeMax.current));
        ctx.lineTo(x, ySurf(0, gaugeMin.current));
        ctx.stroke();
        ctx.fillText(`1  ${(gaugeMax.current - gaugeMin.current).toFixed(1)} m`, x + 6, ySurf(0, gaugeMax.current) - 4);
      }
      if (maxRun.current > 0.05) {
        const y = sea - maxRun.current * v;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(xOf(shoreI), y);
        ctx.lineTo(Math.min(w - pad, xOf(shoreI) + 180), y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillText(`2 oppskylling ${maxRun.current.toFixed(1)} m`, xOf(shoreI) + 8, y - 4);
      }
      if (c.h[inlandI] > 0.05 && c.b[inlandI] > 0) {
        const x = xOf(inlandI);
        ctx.beginPath();
        ctx.moveTo(x, yBed(c.b[inlandI]));
        ctx.lineTo(x, ySurf(c.b[inlandI], c.h[inlandI]));
        ctx.stroke();
        ctx.fillText(`3  ${c.h[inlandI].toFixed(1)} m`, x + 6, ySurf(c.b[inlandI], c.h[inlandI]) - 4);
      }
      if (maxReach.current > 2) {
        const y = ground - 10;
        const x2 = xOf(shoreI) + (maxReach.current / L) * (w - pad * 2);
        ctx.beginPath();
        ctx.moveTo(xOf(shoreI), y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        ctx.fillText(`4  ${maxReach.current.toFixed(0)} m inn`, xOf(shoreI) + 8, y - 4);
      }
      const hx = xOf(inlandI);
      const hy = yBed(Math.max(0, c.b[inlandI]));
      ctx.fillStyle = c.h[inlandI] > 0.3 ? ink.mark : ink.landDark;
      ctx.beginPath();
      ctx.moveTo(hx - 7, hy);
      ctx.lineTo(hx, hy - 8);
      ctx.lineTo(hx + 7, hy);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(hx - 5, hy, 10, 8);

      // sparkline of the offshore gauge
      const ser = series.current;
      if (ser.length > 2) {
        ctx.strokeStyle = ink.mark;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        const sw = 140;
        const sh = 46;
        const sx = w - pad - sw;
        const sy = 12;
        ctx.fillStyle = "#f7f3ea";
        ctx.fillRect(sx - 4, sy - 4, sw + 8, sh + 8);
        let mn = 0;
        let mx = 0.2;
        for (const v0 of ser) {
          mn = Math.min(mn, v0);
          mx = Math.max(mx, v0);
        }
        ser.forEach((v0, k) => {
          const x = sx + (k / (ser.length - 1)) * sw;
          const y = sy + sh - ((v0 - mn) / (mx - mn || 1)) * sh;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.fillStyle = ink.muted;
        ctx.font = "11px Source Sans 3, sans-serif";
        ctx.fillText("Måler ute i vannet", sx, sy + sh + 18);
      }

      ctx.fillStyle = ink.muted;
      ctx.font = "12px Source Sans 3, sans-serif";
      ctx.fillText("Stiplet linje er havnivå. Loddrett skala er meter, uten ekstra forstørring.", pad, 18);
      ctx.fillStyle = ink.text;
      ctx.fillText("havnivå", pad, sea - 6);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const beachLabel = beach === "bratt" ? "bratt strand, om lag 1:18" : "slak strand, om lag 1:70";

  return (
    <Lab
      id="m3"
      index="M3"
      title="Fire ulike høyder"
      replaces="Erstatter den gamle M3, der tallene var tegnet inn på forhånd og ikke regnet ut."
      question="Hvorfor er bølgehøyde, oppskylling, vanndyp på land og inntrenging fire forskjellige tall for samme bølge?"
      assume="Ikke-lineær gruntvannslikning med litt bunnfriksjon (Manning 0,02). To bølger sendes inn fra 28 m dyp. Oppskylling er høyeste vannflate på land der vanndypet er over 8 cm. Dette er ett tverrsnitt, ikke et farekart, og ikke Tafjord."
      conclusion={
        stats.reach < 1
          ? `På ${beachLabel} har bølgen ikke nådd land ennå. Se på måleren: en dal først er ikke det samme som at faren er over.`
          : `Ute er bølgehøyden ${stats.wave.toFixed(1)} m fra dal til topp. Oppskyllingen er ${stats.runup.toFixed(1)} m, vanndypet 80 m inne er ${stats.depth.toFixed(1)} m, og vannet går ${stats.reach.toFixed(0)} m inn. På en slak strand blir inntrengingen lang selv om oppskyllingen ikke er den høyeste.`
      }
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas ref={canvasRef} className="h-[400px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Choice
          label="Kyst"
          value={beach}
          options={[
            { id: "slak", label: "Slak" },
            { id: "bratt", label: "Bratt" },
          ]}
          onChange={setBeach}
        />
        <Choice
          label="Hva kommer først"
          value={lead}
          options={[
            { id: "dal", label: "Dalen" },
            { id: "topp", label: "Toppen" },
          ]}
          onChange={setLead}
        />
        <Slider label="Bølge ute" value={amp} min={0.6} max={2.4} step={0.1} unit="m" onChange={setAmp} />
      </div>
      <Transport
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={reset}
        time={`${(stats.minutes * 60).toFixed(0)} s`}
      />
      <Readouts
        items={[
          { k: "1 Bølgehøyde ute", v: `${stats.wave.toFixed(2)} m`, hint: "dal til topp" },
          { k: "2 Oppskylling", v: `${stats.runup.toFixed(2)} m`, hint: "over havnivå" },
          { k: "3 Vanndyp, 80 m inne", v: `${stats.depth.toFixed(2)} m` },
          { k: "4 Inntrenging", v: `${stats.reach.toFixed(0)} m`, hint: `${stats.crests} topper sett` },
        ]}
      />
    </Lab>
  );
}
