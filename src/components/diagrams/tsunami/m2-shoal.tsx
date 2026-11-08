import { useEffect, useRef, useState } from "react";
import { FigureNote, Lab, Readouts, Slider, Transport } from "./lab";
import { nb, roundFactor } from "./util";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { G } from "./sim/swe";
import { advanceLinear, makeLinear, type Linear1D } from "./sim/linear";
import { longWaveSpeed, shelfElevation } from "./sim/profiles";
import { arrow, label, leader, paintRock, paintWaterColumn, skyTo, type Pt } from "./paint";
import { ink } from "./sim/palette";
import { shoalStatus } from "./a11y";

const N = 800;
const L = 1_200_000;
const DT_FRAME = 30;
const T_END = 5 * 3600;
const AMP = 0.5;

const depthAt = (x: number, deep: number) => Math.max(0, -shelfElevation(x, L, deep));
const kmh = (v: number) => `${nb(v * 3.6)} km/t`;

/** Dypet der vannflaten står høyest, altså omtrent der bølgetoppen er nå. */
function crestDepth(s: Linear1D): number {
  let best = 0;
  let k = -1;
  for (let i = 0; i < s.d.length; i++) {
    if (s.d[i] > 1 && s.eta[i] > best) {
      best = s.eta[i];
      k = i;
    }
  }
  return k < 0 ? 0 : s.d[k];
}
const COAST_DEPTH = 30;

export function ModelShoal() {
  const [deep, setDeep] = useState(4000);
  const [period, setPeriod] = useState(20);
  const [marker, setMarker] = useState(1000);
  const [playing, setPlaying] = useState(false);
  const [, setTick] = useState(0);
  const [we, setWe] = useState("1");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Linear1D>(makeLinear(N, L / N));
  const maxEta = useRef(new Float64Array(N));
  const time = useRef(0);
  const coast = useRef(false);

  const reset = () => {
    const s = sim.current;
    const T = period * 60;
    const c0 = Math.sqrt(G * deep);
    const lam = c0 * T;
    const x0 = L * 0.2;
    time.current = 0;
    coast.current = false;
    maxEta.current.fill(0);
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * s.dx;
      s.d[i] = depthAt(x, deep);
      const env = Math.exp(-Math.pow((x - x0) / (0.42 * lam), 2));
      s.eta[i] = s.d[i] > 1 ? AMP * env * Math.cos((2 * Math.PI * (x - x0)) / lam) : 0;
    }
    // Bølgen går bare mot land: u = η · √(g/d).
    for (let i = 1; i < N; i++) {
      const df = Math.min(s.d[i], s.d[i - 1]);
      const ef = 0.5 * (s.eta[i] + s.eta[i - 1]);
      s.u[i] = df > 1 ? ef * Math.sqrt(G / df) : 0;
    }
    s.u[0] = 0;
    s.u[N] = 0;
    setPlaying(false);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deep, period]);

  const advance = (seconds: number) => {
    const s = sim.current;
    let left = seconds;
    while (left > 0 && time.current < T_END) {
      const dt = Math.min(DT_FRAME, left);
      advanceLinear(s, dt);
      time.current += dt;
      left -= dt;
      for (let i = 0; i < N; i++) if (s.eta[i] > maxEta.current[i]) maxEta.current[i] = s.eta[i];
    }
    if (!coast.current && crestDepth(s) < COAST_DEPTH) coast.current = true;
    return time.current < T_END;
  };

  const frames = useRef(0);
  const { reduce } = useSimLoop(
    canvasRef,
    playing,
    (n) => {
      const more = advance(DT_FRAME * n);
      frames.current += n;
      if (frames.current >= 8 || !more) {
        frames.current = 0;
        setTick((t) => t + 1);
      }
      if (!more) setPlaying(false);
      return more;
    },
    draw,
  );

  const T = period * 60;
  const markerX = marker * 1000;
  const dMarker = depthAt(markerX, deep);
  const cMarker = longWaveSpeed(dMarker);
  const lamMarker = cMarker * T;
  const cDeep = longWaveSpeed(deep);
  const lamDeep = cDeep * T;
  const onLand = dMarker < 1;

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = fitCanvas(canvas);
    if (!fit) return;
    const { ctx, w, h } = fit;
    clearPaper(ctx, w, h);
    const s = sim.current;
    const narrow = w < 560;
    const axis = narrow ? 44 : 56;
    const sea = 104;
    const bottom = h - 6;
    const span = bottom - sea - 10;
    const dMax = 6200;
    // Dybdeaksen er strukket nær overflaten (kvadratrot), så sokkelen synes.
    const yD = (d: number) => sea + span * Math.sqrt(Math.max(0, d) / dMax);
    const xOf = (x: number) => axis + (x / L) * (w - axis);
    const pxKm = (w - axis) / (L / 1000);
    const waveScale = 12 / AMP;
    const weS = roundFactor((waveScale * 1000) / pxKm);
    if (weS !== we) setWe(weS);

    skyTo(ctx, w, sea + 2);
    const surf: Pt[] = [];
    const bed: Pt[] = [];
    let lastWet = 0;
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * s.dx;
      const z = shelfElevation(x, L, deep);
      const yb = z >= 0 ? sea - z * 0.6 : yD(-z);
      bed.push({ x: xOf(x), y: yb });
      if (s.d[i] > 1) {
        surf.push({ x: xOf(x), y: sea - s.eta[i] * waveScale });
        lastWet = i;
      }
    }
    bed.unshift({ x: axis, y: bed[0].y });
    surf.unshift({ x: axis, y: surf[0].y });
    paintWaterColumn(ctx, surf, bed.slice(0, lastWet + 2));
    paintRock(ctx, bed, bottom);

    // Høyeste vannstand så langt, tynn stiplet linje.
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = ink.mark;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < N; i++) {
      if (s.d[i] < 1 || maxEta.current[i] < 0.02) {
        pen = false;
        continue;
      }
      const X = xOf((i + 0.5) * s.dx);
      const Y = sea - maxEta.current[i] * waveScale;
      if (!pen) {
        ctx.moveTo(X, Y);
        pen = true;
      } else ctx.lineTo(X, Y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Dybdeakse til venstre.
    ctx.fillStyle = ink.paper;
    ctx.fillRect(0, sea - 2, axis - 2, bottom - sea + 2);
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(axis - 2, sea);
    ctx.lineTo(axis - 2, yD(dMax));
    ctx.stroke();
    for (const d of narrow ? [0, 100, 1000, 4000] : [0, 100, 500, 2000, 4000, 6000]) {
      const y = yD(d);
      ctx.beginPath();
      ctx.moveTo(axis - 7, y);
      ctx.lineTo(axis - 2, y);
      ctx.stroke();
      label(ctx, d === 0 ? "0 m" : nb(d).replace(/(\d)(?=(\d{3})+$)/g, "$1 "), axis - 9, y + 5, {
        align: "right",
        weight: "400",
      });
    }

    // Stille havflate.
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = ink.muted;
    ctx.beginPath();
    ctx.moveTo(axis, sea);
    ctx.lineTo(xOf(L * 0.975), sea);
    ctx.stroke();
    ctx.setLineDash([]);

    // Bølgelengde som en klamme på valgt dyp og ved markøren.
    const bracket = (xc: number, lam: number, y: number, text: string) => {
      const half = (lam / 2 / L) * (w - axis);
      const a = Math.max(axis + 2, xOf(xc) - half);
      const b = Math.min(w - 2, xOf(xc) + half);
      ctx.strokeStyle = ink.mark;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(a, y);
      ctx.lineTo(b, y);
      ctx.moveTo(a, y - 5);
      ctx.lineTo(a, y + 5);
      ctx.moveTo(b, y - 5);
      ctx.lineTo(b, y + 5);
      ctx.stroke();
      label(ctx, text, (a + b) / 2, y - 8, { align: "center", color: ink.mark, weight: "600" });
    };
    bracket(L * 0.2, lamDeep, 46, `λ ≈ ${nb(lamDeep / 1000)} km`);
    // Markørens klamme bare når den står et annet sted enn dyphavet, ellers dekker de hverandre.
    if (!onLand && dMarker < deep * 0.9) bracket(markerX, lamMarker, 46, `λ ≈ ${nb(lamMarker / 1000)} km`);

    // Markør.
    const mx = xOf(markerX);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mx, 54);
    ctx.lineTo(mx, onLand ? sea : yD(dMarker));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ink.text;
    ctx.beginPath();
    ctx.arc(mx, onLand ? sea : yD(dMarker), 4, 0, Math.PI * 2);
    ctx.fill();

    label(ctx, "bølgeretning", axis + 6, 20, { color: ink.seaMid, weight: "600" });
    arrow(ctx, axis + 6 + (narrow ? 96 : 100), 15, axis + (narrow ? 140 : 150), ink.seaMid, 2);
    label(ctx, "dyphav", xOf(L * 0.08), yD(deep) - 10, { color: ink.panel, halo: "rgba(12,48,64,0.6)" });
    if (!narrow) label(ctx, "kontinentalskråning", xOf(L * 0.56), yD(deep * 0.35) + 34, { align: "center" });
    label(ctx, "sokkel", xOf(L * 0.82), yD(110) + 30, { align: "center" });
    const kx = xOf(L * 0.985);
    leader(ctx, kx, sea - 6, kx - 12, sea - 26);
    label(ctx, "kyst", kx - 14, sea - 30, { align: "right" });
  }

  const conclusion = onLand
    ? "Markøren står på land. Flytt den ut i vannet for å lese dyp, fart og bølgelengde."
    : `På ${nb(deep)} m dyp går bølgefronten ${kmh(cDeep)}, og bølgelengden er om lag ${nb(lamDeep / 1000)} km. Ved markøren er dypet ${nb(dMarker)} m. Der går fronten ${kmh(cMarker)}, og bølgelengden er om lag ${nb(lamMarker / 1000)} km. Perioden er den samme, ${nb(period)} min, så bølgen blir kortere når den går saktere. Når samme energi presses sammen på kortere strekning, blir bølgen høyere. Det ser du på den stiplede linja.`;

  const status = shoalStatus({
    playing,
    time: time.current,
    end: T_END,
    crestDepth: crestDepth(sim.current),
    atCoast: coast.current,
  });

  return (
    <Lab
      id="m2"
      index="M2"
      title="Fra dypt hav inn på sokkelen"
      question="Hvorfor går bølgen saktere og blir kortere når vannet blir grunnere?"
      assume="Lineær lang bølge over en tenkt havbunn. Farten er √(g · d) med g = 9,81 m/s², og den gjelder bølgefronten til en lang, ikke-brytende langbølge, ikke vannets egen strømning. Perioden er fast. Modellen viser at bølgen blir høyere på sokkelen, men den regner ikke ut hvor høy den blir på land. Ikke oppskylling eller faresone."
      conclusion={conclusion}
      status={status}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Snitt fra dyphav over kontinentalskråningen til sokkelen og kysten, med en markør og klammer for bølgelengden. ${status}`}
          aria-describedby="m2-figurmerknad"
          className="h-[340px] w-full sm:h-[400px]"
        />
      </div>
      <FigureNote id="m2-figurmerknad">
        Snitt på {nb(L / 1000)} km. Dybdeaksen til venstre er strukket nær overflaten, så sokkelen synes. Bølgehøyden er
        forstørret ca. {we} ganger. Klammene viser én bølgelengde, λ = v · T. Den stiplede røde linja er høyeste vannstand så
        langt.
      </FigureNote>
      <div className="grid gap-4 md:grid-cols-3">
        <Slider label="Dyp ute på havet" value={deep} min={2000} max={6000} step={100} unit="m" onChange={setDeep} />
        <Slider label="Periode" value={period} min={15} max={40} step={1} unit="min" onChange={setPeriod} />
        <Slider
          label="Markør"
          value={marker}
          min={50}
          max={1170}
          step={10}
          unit="km fra venstre kant"
          onChange={setMarker}
        />
      </div>
      <Transport
        playing={playing}
        onToggle={() => {
          if (!playing && time.current >= T_END) reset();
          setPlaying((p) => !p);
        }}
        onReset={reset}
        onStep={() => {
          setPlaying(false);
          advance(600);
          setTick((t) => t + 1);
        }}
        stepLabel="Fram 10 minutter"
        liveTime={false}
        toggleState={false}
        time={`Simulert tid ${nb(time.current / 3600, 1)} t${reduce ? "" : " · 1 s avspilling ≈ 30 min"}`}
      />
      <Readouts
        items={[
          { k: "Fart på valgt dyp", v: kmh(cDeep), hint: `${nb(cDeep)} m/s` },
          { k: "Bølgelengde på valgt dyp", v: `${nb(lamDeep / 1000)} km`, hint: "λ = v · T" },
          {
            k: "Fart ved markøren",
            v: onLand ? "på land" : kmh(cMarker),
            hint: onLand ? undefined : `${nb(cMarker)} m/s på ${nb(dMarker)} m dyp`,
          },
          {
            k: "Bølgelengde ved markøren",
            v: onLand ? "på land" : `${nb(lamMarker / 1000)} km`,
            hint: onLand
              ? undefined
              : dMarker / lamMarker < 0.05
                ? "dypet er lite mot bølgelengden, så langbølgeformelen passer"
                : "for kort bølge for langbølgeformelen",
          },
        ]}
      />
    </Lab>
  );
}
