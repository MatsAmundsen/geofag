import { useEffect, useMemo, useRef, useState } from "react";
import { Choice, Lab, Readouts, Transport } from "./lab";
import { clearPaper, fitCanvas } from "./draw";
import { G } from "./sim/swe";
import { caption, paintRock, paintWaterColumn, skyTo } from "./paint";
import { ink } from "./sim/palette";

type Place = "naer" | "regional" | "fjern" | "skred";
type Act = "ga" | "vent";

const PLACES: Record<Place, { label: string; km: number; deep: number; quake: boolean; walkMin: number }> = {
  naer: { label: "Nær kilden, 70 km", km: 70, deep: 1200, quake: true, walkMin: 8 },
  regional: { label: "Regionalt, 800 km", km: 800, deep: 4200, quake: true, walkMin: 8 },
  fjern: { label: "Fjernt, 5000 km", km: 5000, deep: 4600, quake: true, walkMin: 8 },
  skred: { label: "Skred i fjord, 4 km", km: 4, deep: 280, quake: false, walkMin: 3 },
};

function travelSeconds(km: number, deep: number) {
  const shelfKm = Math.min(70, km * 0.8);
  const deepKm = Math.max(0, km - shelfKm);
  const cDeep = Math.sqrt(G * deep);
  let t = (deepKm * 1000) / cDeep;
  const steps = 30;
  for (let i = 0; i < steps; i++) {
    const d = deep + (30 - deep) * ((i + 0.5) / steps);
    t += (shelfKm * 1000) / steps / Math.sqrt(G * Math.max(8, d));
  }
  return t;
}

function fmt(sec: number) {
  if (!Number.isFinite(sec)) return "kommer ikke";
  if (sec < 90) return `${Math.round(sec)} s`;
  const m = sec / 60;
  if (m < 90) return `${m.toFixed(0)} min`;
  return `${(m / 60).toFixed(1)} t`;
}

export function ModelWarning() {
  const [place, setPlace] = useState<Place>("naer");
  const [act, setAct] = useState<Act>("vent");
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const play = useRef(false);
  const clock = useRef(0);
  play.current = playing;

  const plan = useMemo(() => {
    const p = PLACES[place];
    const arrival = travelSeconds(p.km, p.deep);
    const bulletin = p.quake ? 7 * 60 : Infinity;
    const buoyKm = Math.min(p.km * 0.65, Math.max(15, p.km - 20));
    const dart = p.quake ? travelSeconds(buoyKm, p.deep) + 3 * 60 : Infinity;
    const leave = act === "ga" ? (p.quake ? 90 : 20) : Math.min(dart, bulletin);
    const walk = p.walkMin * 60;
    const safeAt = leave + walk;
    return { ...p, arrival, bulletin, dart, leave, walk, safeAt, late: safeAt > arrival };
  }, [place, act]);

  const reset = () => {
    clock.current = 0;
    setNow(0);
    setPlaying(false);
  };

  useEffect(() => {
    reset();
  }, [place, act]);

  useEffect(() => {
    let frame = 0;
    let acc = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      const span = Math.max(plan.arrival, plan.walk + 120) * 1.15;
      if (play.current) {
        clock.current = Math.min(span, clock.current + span / 500);
        acc++;
        if (acc % 3 === 0) setNow(clock.current);
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      clearPaper(ctx, w, h);
      const km = Math.max(plan.km, 0.2);
      const shelfKm = plan.quake ? Math.min(70, km * 0.8) : km * 0.35;
      const deepKm = Math.max(0, km - shelfKm);
      const x0 = 20;
      const x1 = w - 20;
      const sea = h * 0.46;
      const bedPx = (h * 0.28) / Math.max(plan.deep, 40);
      const xOfKm = (d: number) => x0 + (Math.max(0, Math.min(km, d)) / km) * (x1 - x0);
      const depthAt = (d: number) => {
        if (d < deepKm) return plan.deep;
        const u = (d - deepKm) / Math.max(0.2, shelfKm);
        const s = u * u * (3 - 2 * u);
        return plan.deep + (12 - plan.deep) * s;
      };
      const cDeep = Math.sqrt(G * Math.max(plan.deep, 8));
      const tDeep = (deepKm * 1000) / cDeep;
      let front = 0;
      if (clock.current <= tDeep) front = (cDeep * clock.current) / 1000;
      else {
        const u = Math.min(1, (clock.current - tDeep) / Math.max(1, plan.arrival - tDeep));
        front = deepKm + u * shelfKm;
      }
      skyTo(ctx, w, sea);
      const n = 80;
      const surf: { x: number; y: number }[] = [];
      const bed: { x: number; y: number }[] = [];
      for (let i = 0; i <= n; i++) {
        const d = (i / n) * km;
        const x = xOfKm(d);
        const depth = depthAt(d);
        const along = Math.exp(-Math.pow((d - front) / Math.max(8, km * 0.04), 2));
        const eta = clock.current > 1 ? along * Math.min(6, 0.6 + km / 2000) : 0;
        const sign = d < front ? -0.35 : 1;
        surf.push({ x, y: sea - sign * eta * 10 });
        bed.push({ x, y: sea + depth * bedPx });
      }
      paintWaterColumn(ctx, surf, bed);
      paintRock(ctx, bed, h - 46);

      const buoyKm = plan.quake ? Math.min(km * 0.65, Math.max(0.4, km - Math.min(20, km * 0.3))) : -1;
      if (buoyKm > 0) {
        const x = xOfKm(buoyKm);
        ctx.strokeStyle = ink.sea;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x, sea - 16);
        ctx.lineTo(x, sea + 10);
        ctx.stroke();
        ctx.fillStyle = clock.current >= plan.dart ? ink.safe : ink.seaMid;
        ctx.beginPath();
        ctx.arc(x, sea - 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = ink.text;
        ctx.font = "12px Source Sans 3, sans-serif";
        ctx.fillText("bøye", x - 14, sea - 28);
      }

      const walkFrac = Math.min(1, Math.max(0, clock.current - plan.leave) / Math.max(1, plan.walk));
      const px = x1 - 36;
      const ground = sea - walkFrac * 54;
      ctx.strokeStyle = ink.landDark;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1 - 70, sea);
      ctx.lineTo(x1 - 8, sea - 64);
      ctx.stroke();
      ctx.strokeStyle = plan.late && clock.current > plan.arrival ? ink.mark : ink.text;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(px, ground - 16, 4, 0, Math.PI * 2);
      ctx.moveTo(px, ground - 12);
      ctx.lineTo(px, ground);
      ctx.moveTo(px, ground - 8);
      ctx.lineTo(px - 6, ground - 2);
      ctx.moveTo(px, ground - 8);
      ctx.lineTo(px + 6, ground - 4);
      ctx.stroke();
      ctx.fillStyle = ink.text;
      ctx.font = "12px Source Sans 3, sans-serif";
      ctx.fillText(walkFrac > 0.95 ? "i høyden" : walkFrac > 0 ? "på vei opp" : "ved sjøen", px - 54, ground - 28);

      if (plan.quake) {
        ctx.fillStyle = ink.mark;
        ctx.beginPath();
        ctx.arc(x0 + 8, sea + 8, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = ink.text;
        ctx.fillText("skjelv", x0, sea + 24);
      } else {
        ctx.fillStyle = ink.landDark;
        ctx.beginPath();
        ctx.moveTo(x0, sea - 48);
        ctx.lineTo(x0 + 28, sea);
        ctx.lineTo(x0, sea);
        ctx.fill();
        ctx.fillStyle = ink.text;
        ctx.fillText("skred", x0, sea - 54);
      }

      const spanT = Math.max(plan.arrival, 8 * 60) * 1.15;
      const yBar = h - 22;
      ctx.strokeStyle = ink.line;
      ctx.beginPath();
      ctx.moveTo(x0, yBar);
      ctx.lineTo(x1, yBar);
      ctx.stroke();
      const markT = (t: number, label: string, color: string) => {
        if (!Number.isFinite(t)) return;
        const x = x0 + (t / spanT) * (x1 - x0);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, yBar, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = ink.muted;
        ctx.font = "11px Source Sans 3, sans-serif";
        ctx.fillText(label, x - 18, yBar - 8);
      };
      markT(plan.bulletin, "melding", ink.route);
      markT(plan.dart, "bøye", ink.seaMid);
      markT(plan.arrival, "bølge", ink.mark);
      markT(plan.safeAt, "høyde", plan.late ? ink.mark : ink.safe);
      const xNow = x0 + (Math.min(clock.current, spanT) / spanT) * (x1 - x0);
      ctx.strokeStyle = ink.text;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(xNow, 12);
      ctx.lineTo(xNow, yBar);
      ctx.stroke();
      ctx.setLineDash([]);
      caption(ctx, "Nå-linjen går gjennom både kartet og tidsstripen. Avstandene er ikke i samme målestokk som tiden.", x0, 14);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [plan]);

  const conclusion = !plan.quake
    ? "Et skred starter ikke varslingskjeden. Det finnes ikke et seismisk varsel å vente på. I fjorden er tiden minutter, og det naturlige tegnet er det du har."
    : plan.late
      ? `Bølgen er hos deg etter ${fmt(plan.arrival)}. Hvis du venter på bekreftelse, er du i høyden først etter ${fmt(plan.safeAt)}. Det er for sent i denne øvelsen.`
      : `Du er i høyden etter ${fmt(plan.safeAt)}. Bølgen kommer etter ${fmt(plan.arrival)}. Langt unna rekker både varslet og bekreftelsen å komme først.`;

  return (
    <Lab
      id="m6"
      index="M6"
      title="Kappløpet mot bølgen"
      replaces="Erstatter den gamle M6, som brukte valgte øvelsestider i stedet for reisetid."
      question="Rekker et offisielt varsel fram, eller må du gå på ristingen?"
      assume="Bølgetiden er integralet av dx/√(gd), med dyp sokkel de siste kilometrene. Første seismiske melding er satt til 7 minutter, slik varslingssentre ofte bruker på en første bulletin, ikke et norsk system og ikke amerikanske faregrader. Bøyen ligger mellom deg og kilden, pluss 3 minutter for å sende målingen. Gange til høyden er en valgt øvelsestid."
      conclusion={conclusion}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas ref={canvasRef} className="h-[420px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Choice
          label="Hvor du er"
          value={place}
          options={[
            { id: "naer", label: "Nær" },
            { id: "regional", label: "Regionalt" },
            { id: "fjern", label: "Fjernt" },
            { id: "skred", label: "Fjordskred" },
          ]}
          onChange={setPlace}
        />
        <Choice
          label="Hva du gjør"
          value={act}
          options={[
            { id: "ga", label: "Går når det rister" },
            { id: "vent", label: "Venter på bekreftelse" },
          ]}
          onChange={setAct}
        />
      </div>
      <Transport
        playing={playing}
        onToggle={() => setPlaying((p) => !p)}
        onReset={reset}
        time={fmt(now)}
      />
      <Readouts
        items={[
          { k: "Første melding", v: fmt(plan.bulletin) },
          { k: "Bøye bekrefter", v: fmt(plan.dart) },
          { k: "Bølgen hos deg", v: fmt(plan.arrival) },
          { k: "Du er i høyden", v: fmt(plan.safeAt), hint: plan.late ? "for sent" : "før bølgen" },
        ]}
      />
    </Lab>
  );
}
