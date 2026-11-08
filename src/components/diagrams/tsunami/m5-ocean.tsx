import { useMemo, useRef, useState } from "react";
import { Choice, FigureNote, Lab, Readouts, Transport } from "./lab";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { cellGeo, makeOcean, type BasinId } from "./sim/oceanmap";
import { INDIA_RINGS, PACIFIC_RINGS } from "./sim/coasts";
import { label } from "./paint";
import { nb } from "./util";
import { ink } from "./sim/palette";

function fmt(seconds: number) {
  if (!Number.isFinite(seconds)) return "uten forbindelse";
  return `${nb(seconds / 3600, 1)} t`;
}
export function ModelOcean() {
  const [id, setId] = useState<BasinId>("india");
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const clock = useRef(0),
    canvasRef = useRef<HTMLCanvasElement>(null);
  const o = useMemo(() => makeOcean(id), [id]);
  const contours = useMemo(() => {
    const levels = id === "india" ? [3600, 7200, 10800] : [7200, 14400, 28800, 43200];
    return levels.map((level) => {
      const segments: { x: number; y: number }[][] = [];
      for (let j = 0; j < o.ny - 1; j++)
        for (let i = 0; i < o.nx - 1; i++) {
          const k = j * o.nx + i,
            corners = [k, k + 1, k + o.nx, k + o.nx + 1];
          if (corners.some((n) => o.land[n] || !Number.isFinite(o.times[n]))) continue;
          for (const tri of [
            [k, k + 1, k + o.nx],
            [k + 1, k + o.nx + 1, k + o.nx],
          ]) {
            const hits: { x: number; y: number }[] = [];
            for (let e = 0; e < 3; e++) {
              const a = tri[e],
                b = tri[(e + 1) % 3],
                ta = o.times[a],
                tb = o.times[b];
              if (ta < level === tb < level) continue;
              const f = (level - ta) / (tb - ta);
              hits.push({
                x: ((a % o.nx) + 0.5 + ((b % o.nx) - (a % o.nx)) * f) / o.nx,
                y:
                  (Math.floor(a / o.nx) + 0.5 + (Math.floor(b / o.nx) - Math.floor(a / o.nx)) * f) /
                  o.ny,
              });
            }
            if (hits.length === 2) segments.push(hits);
          }
        }
      return { level, segments };
    });
  }, [id, o]);
  const duration = id === "india" ? 4 * 3600 : 16 * 3600;
  const reset = () => {
    clock.current = 0;
    setTime(0);
    setPlaying(false);
  };
  const advance = (seconds: number) => {
    clock.current = Math.min(duration, clock.current + seconds);
    setTime(clock.current);
    if (clock.current >= duration) {
      setPlaying(false);
      return false;
    }
  };
  useSimLoop(
    canvasRef,
    playing,
    (frames) => advance(frames * 20),
    () => {
      const fit = canvasRef.current && fitCanvas(canvasRef.current);
      if (!fit) return;
      const { ctx, w, h } = fit;
      clearPaper(ctx, w, h);
      const refLat = (((o.lat0 + o.lat1) / 2) * Math.PI) / 180;
      const aspect = ((o.lon1 - o.lon0) * Math.cos(refLat)) / (o.lat1 - o.lat0);
      const mw = Math.min(w - 28, (h - 100) * aspect),
        mh = mw / aspect;
      const ox = (w - mw) / 2,
        oy = 40 + (h - 100 - mh) / 2;
      const cw = mw / o.nx,
        ch = mh / o.ny;
      const xOf = (lon: number) => ox + ((lon - o.lon0) / (o.lon1 - o.lon0)) * mw;
      const yOf = (lat: number) => oy + ((o.lat1 - lat) / (o.lat1 - o.lat0)) * mh;
      ctx.save();
      ctx.beginPath();
      ctx.rect(ox, oy, mw, mh);
      ctx.clip();
      ctx.fillStyle = ink.water;
      ctx.fillRect(ox, oy, mw, mh);
      // No image smoothing: each reached cell remains clipped by the calculation mask.
      for (let k = 0; k < o.times.length; k++)
        if (!o.land[k] && o.times[k] <= clock.current) {
          ctx.fillStyle = "#a4d0e2";
          ctx.fillRect(ox + (k % o.nx) * cw, oy + Math.floor(k / o.nx) * ch, cw + 0.2, ch + 0.2);
        }
      for (const { segments } of contours) {
        ctx.beginPath();
        for (const [a, b] of segments) {
          ctx.moveTo(ox + a.x * mw, oy + a.y * mh);
          ctx.lineTo(ox + b.x * mw, oy + b.y * mh);
        }
        ctx.strokeStyle = ink.sea;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (let k = 0; k < o.land.length; k++)
        if (o.land[k]) {
          ctx.fillStyle = ink.land;
          ctx.fillRect(ox + (k % o.nx) * cw, oy + Math.floor(k / o.nx) * ch, cw + 0.2, ch + 0.2);
        }
      for (const ring of id === "india" ? INDIA_RINGS : PACIFIC_RINGS) {
        ctx.beginPath();
        ring.forEach(([lon, lat], i) => {
          if (i === 0) ctx.moveTo(xOf(lon), yOf(lat));
          else ctx.lineTo(xOf(lon), yOf(lat));
        });
        ctx.closePath();
        ctx.fillStyle = ink.land;
        ctx.fill();
        ctx.strokeStyle = ink.rock;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (w >= 500)
        for (const { level, segments } of contours) {
          const candidates = segments.filter(
            ([a]) => a.x > 0.22 && a.x < 0.78 && a.y > 0.15 && a.y < 0.85,
          );
          const segment = candidates[Math.floor(candidates.length / 2)];
          if (segment)
            label(
              ctx,
              `${nb(level / 3600)} t`,
              ox + segment[0].x * mw,
              oy + segment[0].y * mh - 4,
              { align: "center" },
            );
        }
      ctx.restore();
      // Outline actual computational land cells along the sea edge to expose the coarse mask honestly.
      ctx.strokeStyle = ink.rock;
      ctx.lineWidth = 0.7;
      for (let j = 0; j < o.ny; j++)
        for (let i = 0; i < o.nx; i++) {
          const k = j * o.nx + i;
          if (!o.land[k]) continue;
          ctx.beginPath();
          if (i + 1 < o.nx && !o.land[k + 1]) {
            ctx.moveTo(ox + (i + 1) * cw, oy + j * ch);
            ctx.lineTo(ox + (i + 1) * cw, oy + (j + 1) * ch);
          }
          if (j + 1 < o.ny && !o.land[k + o.nx]) {
            ctx.moveTo(ox + i * cw, oy + (j + 1) * ch);
            ctx.lineTo(ox + (i + 1) * cw, oy + (j + 1) * ch);
          }
          ctx.stroke();
        }
      ctx.strokeStyle = ink.muted;
      ctx.lineWidth = 1;
      ctx.strokeRect(ox, oy, mw, mh);
      for (const p of [{ name: "K", k: o.source }, ...o.points]) {
        const [lon, lat] = cellGeo(o, p.k),
          x = xOf(lon),
          y = yOf(lat);
        ctx.fillStyle = ink.panel;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        label(ctx, p.name, x, y + 5, { align: "center", color: ink.text });
      }
      label(ctx, id === "india" ? "Indiahavet" : "Stillehavet", w / 2, 24, { align: "center" });
      label(ctx, "K: idealisert kildecelle", 14, h - 34);
      label(ctx, `Avspilt modelltid: ${fmt(clock.current)}`, 14, h - 12);
    },
  );
  const resolution = `${nb((o.lon1 - o.lon0) / o.nx, 1)}° lengde og ${nb((o.lat1 - o.lat0) / o.ny, 1)}° bredde`;
  return (
    <Lab
      id="m5"
      index="M5"
      title="Gangtid i to havbasseng"
      question="Hvordan leder landbarrierer bølgeveien rundt kysten?"
      assume={`Idealisert, konstant havdyp ${nb(o.depth)} m. Dijkstra på et 8-koblet rutenett, uten diagonale snarveier over land. Sfæriske kantavstander i meter og fart √(gd). Oppløsning: ${resolution}. Natural Earth 1:110 millioner er grovt kystgrunnlag; landmasken er konservativ og kan stenge smale sund. Rutenettet gir retningsavhengig tilnærmingsfeil. Ingen målt batymetri, refleksjon eller historisk bruddkilde.`}
      conclusion="Linjer og kontrollpunkttider er beregnet gangtid fra én idealisert kildecelle. De er ikke observerte ankomsttider. En fin linje gir ikke finere geografisk oppløsning. Ikke oppskylling, bølgehøyde eller fare."
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${id === "india" ? "Indiahavet" : "Stillehavet"}: kystkonturer, kildecelle K, kontrollpunkt A og B og idealiserte gangtidslinjer. Tidene står også under kartet.`}
          className="h-[320px] w-full sm:h-[440px]"
        />
      </div>
      <FigureNote>
        Kartet er ekvirektangulært med standardbredde {nb((o.lat0 + o.lat1) / 2)}°. Ingen jevn
        avstandsmålestokk over hele kartet. Linjene viser{" "}
        {id === "india" ? "1, 2 og 3" : "2, 4, 8 og 12"} timer. Blåtonen viser bare hvor langt
        modellklokken har kommet, ikke høyde eller fare. Ingen kurve glattes gjennom land.
      </FigureNote>
      <Choice
        label="Havbasseng"
        value={id}
        options={[
          { id: "india", label: "Indiahavet" },
          { id: "tohoku", label: "Stillehavet" },
        ]}
        onChange={(next) => {
          reset();
          setId(next);
        }}
      />
      <Transport
        playing={playing}
        onToggle={() => {
          if (clock.current >= duration) {
            clock.current = 0;
            setTime(0);
          }
          setPlaying((p) => !p);
        }}
        onReset={reset}
        onStep={() => {
          setPlaying(false);
          advance(1800);
        }}
        stepLabel="Fram 30 modellminutter"
        time={fmt(time)}
      />
      <Readouts
        items={o.points.map((p) => {
          const [lon, lat] = cellGeo(o, p.k);
          return {
            k: `Kontrollpunkt ${p.name}`,
            v: fmt(o.times[p.k]),
            hint: `${nb(lat, 1)}° N, ${nb(lon > 180 ? lon - 360 : lon, 1)}° lengde · idealisert gangtid`,
          };
        })}
      />
      <p className="text-sm text-muted">
        Alle tider over: konstant dyp {nb(o.depth)} m, 8-koblet metode og rutenett {resolution}.
        Kontrollpunktene er celler i sjøen, ikke kystmålere.
      </p>
    </Lab>
  );
}
