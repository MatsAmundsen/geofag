import { useMemo, useRef, useState } from "react";
import { Choice, FigureNote, Lab, Readouts, Transport } from "./lab";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import {
  cellGeo,
  formatLongitude,
  makeOcean,
  marchingContours,
  smoothOceanContours,
  contourLabels,
  type BasinId,
} from "./sim/oceanmap";
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
    return levels.map((level) => ({
      level,
      paths: smoothOceanContours(o, marchingContours(o, level)),
    }));
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
      const rings = id === "india" ? INDIA_RINGS : PACIFIC_RINGS;
      const xOf = (lon: number) => ox + ((lon - o.lon0) / (o.lon1 - o.lon0)) * mw;
      const yOf = (lat: number) => oy + ((o.lat1 - lat) / (o.lat1 - o.lat0)) * mh;
      ctx.save();
      ctx.beginPath();
      ctx.rect(ox, oy, mw, mh);
      ctx.clip();
      ctx.fillStyle = ink.water;
      ctx.fillRect(ox, oy, mw, mh);
      // Original geographic polygons, not raster land cells, are the visible coastline.
      const coastPaths = rings.map((ring) => {
        const path = new Path2D();
        ring.forEach(([lon, lat], i) => {
          if (i === 0) path.moveTo(xOf(lon), yOf(lat));
          else path.lineTo(xOf(lon), yOf(lat));
        });
        path.closePath();
        return path;
      });
      for (const path of coastPaths) {
        ctx.fillStyle = ink.land;
        ctx.fill(path);
        ctx.strokeStyle = ink.rock;
        ctx.lineWidth = 1;
        ctx.stroke(path);
      }
      // Intersection of complements of all land polygons. In addition, geometry was already
      // split against the conservative calculation mask. Neither clip can open a land barrier.
      ctx.save();
      for (const coast of coastPaths) {
        const waterClip = new Path2D();
        waterClip.rect(ox, oy, mw, mh);
        waterClip.addPath(coast);
        ctx.clip(waterClip, "evenodd");
      }
      for (const { level, paths } of contours) {
        ctx.beginPath();
        for (const path of paths)
          path.forEach((p, i) => {
            if (i === 0) ctx.moveTo(ox + p.x * mw, oy + p.y * mh);
            else ctx.lineTo(ox + p.x * mw, oy + p.y * mh);
          });
        ctx.strokeStyle = ink.sea;
        ctx.lineWidth = clock.current >= level ? 2.8 : 1.25;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.restore();
      const markers = [{ name: "K", k: o.source }, ...o.points].map((p) => {
        const [lon, lat] = cellGeo(o, p.k);
        return { ...p, x: xOf(lon) - ox, y: yOf(lat) - oy };
      });
      const obstacles = markers.map((p) => ({ x: p.x - 12, y: p.y - 12, width: 24, height: 24 }));
      const isWater = (p: { x: number; y: number }) => {
        const i = Math.floor(p.x * o.nx),
          j = Math.floor(p.y * o.ny);
        return i >= 0 && i < o.nx && j >= 0 && j < o.ny && !o.land[j * o.nx + i];
      };
      const placed = contourLabels(contours, mw, mh, obstacles, isWater);
      ctx.restore();
      for (const p of placed) {
        if (p.anchor) {
          ctx.beginPath();
          ctx.moveTo(ox + p.point.x * mw, oy + p.box.y - 2);
          ctx.lineTo(ox + p.anchor.x * mw, oy + p.anchor.y * mh);
          ctx.strokeStyle = ink.muted;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.fillStyle = ink.panel;
        ctx.fillRect(ox + p.box.x - 1, oy + p.box.y - 1, p.box.width + 2, p.box.height + 2);
        label(ctx, `${nb(p.level / 3600)} t`, ox + p.point.x * mw, oy + p.point.y * mh + 5, {
          align: "center",
        });
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
        {id === "india" ? "1, 2 og 3" : "2, 4, 8 og 12"} timer. Linjer blir tykkere når
        modellklokken passerer dem, ikke når faren øker. Kurvene er moderat glattet for lesbarhet og
        klippet mot land; beregningens oppløsning er uendret.
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
            hint: `${nb(lat, 1)}° N, ${formatLongitude(lon)} · idealisert gangtid`,
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
