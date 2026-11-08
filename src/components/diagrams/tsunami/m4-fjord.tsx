import { useEffect, useRef, useState } from "react";
import { Choice, Lab, Readouts, Slider, Transport } from "./lab";
import { clearPaper, fitCanvas } from "./draw";
import { FJORD_L, FJORD_N, pushFjord, slideThickness, startFjord, type FjordOpts, type FjordRun } from "./sim/fjord";
import { ink } from "./sim/palette";

export function ModelFjord() {
  const [thick, setThick] = useState(10);
  const [speed, setSpeed] = useState(28);
  const [entry, setEntry] = useState<FjordOpts["entry"]>("skrent");
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState({ near: 0, far: 0, t: 0, crests: 0, compare: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const run = useRef<FjordRun>(startFjord({ thick: 10, speed: 28, entry: "skrent" }));
  const play = useRef(false);
  const opts = useRef<FjordOpts>({ thick: 10, speed: 28, entry: "skrent" });
  opts.current = { thick, speed, entry };
  play.current = playing;

  const reset = () => {
    run.current = startFjord(opts.current);
    setPlaying(false);
    setStats({ near: 0, far: 0, t: 0, crests: 0, compare: stats.compare });
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thick, speed, entry]);

  useEffect(() => {
    let frame = 0;
    let acc = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (play.current) {
        pushFjord(run.current, opts.current, 0.55);
        acc++;
        if (acc % 5 === 0) {
          const r = run.current;
          setStats((s) => ({ ...s, near: r.near, far: r.far, t: r.t, crests: r.crests }));
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
      const r = run.current;
      const s = r.sim;
      const pad = 18;
      const sea = h * 0.42;
      const bedPx = (h * 0.46) / 360;
      let maxA = 0.6;
      for (let i = 0; i < FJORD_N; i++) maxA = Math.max(maxA, Math.abs(s.eta[i]));
      const wavePx = 34 / maxA;
      const xOf = (i: number) => pad + (i / (FJORD_N - 1)) * (w - pad * 2);

      ctx.beginPath();
      let moved = false;
      for (let i = 0; i < FJORD_N; i++) {
        const x = xOf(i);
        const y = sea - s.eta[i] * wavePx;
        if (!moved) {
          ctx.moveTo(x, y);
          moved = true;
        } else ctx.lineTo(x, y);
      }
      for (let i = FJORD_N - 1; i >= 0; i--) ctx.lineTo(xOf(i), sea + s.d[i] * bedPx);
      ctx.closePath();
      const water = ctx.createLinearGradient(0, sea - 20, 0, sea + 340 * bedPx);
      water.addColorStop(0, ink.water);
      water.addColorStop(1, ink.seaMid);
      ctx.fillStyle = water;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xOf(0), h - 8);
      for (let i = 0; i < FJORD_N; i++) ctx.lineTo(xOf(i), sea + s.d[i] * bedPx);
      ctx.lineTo(xOf(FJORD_N - 1), h - 8);
      ctx.closePath();
      ctx.fillStyle = ink.rock;
      ctx.fill();

      const slideTop: { x: number; y: number }[] = [];
      const slideBed: { x: number; y: number }[] = [];
      for (let i = 0; i < FJORD_N; i += 2) {
        const x = (i + 0.5) * (FJORD_L / FJORD_N);
        const th = slideThickness(x, r.center, opts.current.thick);
        if (th < 0.4) continue;
        const px = xOf(i);
        const bot = sea + s.d[i] * bedPx;
        const top = bot - th * wavePx * 0.55;
        slideTop.push({ x: px, y: top });
        slideBed.push({ x: px, y: bot });
      }
      if (slideTop.length > 2) {
        ctx.beginPath();
        ctx.moveTo(slideTop[0].x, slideTop[0].y);
        for (const p of slideTop) ctx.lineTo(p.x, p.y);
        for (let i = slideBed.length - 1; i >= 0; i--) ctx.lineTo(slideBed[i].x, slideBed[i].y);
        ctx.closePath();
        ctx.fillStyle = ink.landDark;
        ctx.fill();
        ctx.strokeStyle = ink.rock;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const hamlet = (frac: number, name: string) => {
        const i = Math.round(FJORD_N * frac);
        const x = xOf(i);
        const y = sea - Math.max(0, s.eta[i]) * wavePx;
        ctx.fillStyle = s.eta[i] > 1.5 ? ink.mark : ink.landDark;
        ctx.fillRect(x - 4, y - 10, 8, 8);
        ctx.beginPath();
        ctx.moveTo(x - 6, y - 10);
        ctx.lineTo(x, y - 16);
        ctx.lineTo(x + 6, y - 10);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = ink.text;
        ctx.font = "12px Source Sans 3, sans-serif";
        ctx.fillText(name, x - 18, y - 22);
      };
      hamlet(0.22, "nær bredd");
      hamlet(0.82, "motstående");

      ctx.strokeStyle = ink.foam;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < FJORD_N; i++) {
        const x = xOf(i);
        const y = sea - s.eta[i] * wavePx;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = ink.muted;
      for (const frac of [0.24, 0.84]) {
        const i = Math.round(FJORD_N * frac);
        ctx.beginPath();
        ctx.moveTo(xOf(i), sea - 28);
        ctx.lineTo(xOf(i), sea + s.d[i] * bedPx);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.fillStyle = ink.muted;
      ctx.font = "12px Source Sans 3, sans-serif";
      ctx.fillText("skredmassen", xOf(Math.min(FJORD_N - 1, Math.round(r.center / (FJORD_L / FJORD_N)))) - 28, h - 16);
      ctx.fillText(
        `Dyp 340 m. Vannflate og skred er forstørret ${Math.round(wavePx / bedPx)}×. Meterne er i fjorden, ikke oppskylling i Tafjord.`,
        pad,
        18,
      );
      ctx.strokeStyle = ink.muted;
      ctx.beginPath();
      ctx.moveTo(pad, sea);
      ctx.lineTo(pad, sea + 100 * bedPx);
      ctx.stroke();
      ctx.fillText("100 m", pad + 4, sea + 50 * bedPx);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const tooBig = stats.far > 80;
  const conclusion = tooBig
    ? `Motstående bredd har ${stats.far.toFixed(0)} m i modellen. Det er utenfor det lineære kildeleddet: skredet er stort og raskt i forhold til dypet, og tallet er ikke en måling. Senk farten eller tykkelsen og se at samme volum da gir en mye lavere bølge.`
    : stats.far < 0.2
      ? "Skredet har ikke rukket å sette opp bølgen ennå. Farten styrer hvor brått vannet blir skjøvet, ikke bare hvor mye masse som flyttes."
      : `Nær bredden ${stats.near.toFixed(1)} m, motstående bredd ${stats.far.toFixed(1)} m, ${stats.crests} passeringer så langt. Samme tykkelse med lavere fart gir en klart lavere bølge, fordi vannet rekker å sige unna.`;

  return (
    <Lab
      id="m4"
      index="M4"
      title="Skred i en fjord"
      replaces="Erstatter den gamle M4, som viste en indeks fra 0 til 1 i stedet for meter."
      question="Hvorfor er ikke likt volum det samme som lik bølge?"
      assume="Dybdemidlet lineær kilde: skredet hever bunnen, og vannflaten svarer med ∂η/∂t = ∂b/∂t. Det beskriver spredningen over fjorden, ikke plasket i nedslaget og ikke oppskylling i en trang vik. Fjorden er 6,4 km og 340 m dyp. Når bølgen blir en stor del av dypet, er tallet for høyt. Ikke et farekart for Tafjord eller Loen."
      conclusion={conclusion}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas ref={canvasRef} className="h-[380px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Choice
          label="Hvor skredet starter"
          value={entry}
          options={[
            { id: "skrent", label: "Høyt i skrenten" },
            { id: "vann", label: "Nede i vannet" },
          ]}
          onChange={setEntry}
        />
        <Slider label="Tykkelse" value={thick} min={3} max={16} step={1} unit="m" onChange={setThick} note="samme form, mer masse" />
        <Slider label="Fart" value={speed} min={4} max={40} step={1} unit="m/s" onChange={setSpeed} />
      </div>
      <Transport
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={reset}
        time={`${run.current.t.toFixed(0)} s`}
      />
      <Readouts
        items={[
          { k: "Nær bredden", v: `${stats.near.toFixed(1)} m`, hint: "på ca. 80 m dyp" },
          { k: "Motstående bredd", v: `${stats.far.toFixed(1)} m`, hint: "ikke oppskylling" },
          { k: "Passeringer", v: String(stats.crests), hint: "en serie, ikke én vegg" },
          { k: "Lineær grense", v: tooBig ? "sprengt" : "innenfor", hint: "når høyden blir stor mot dypet" },
        ]}
      />
    </Lab>
  );
}
