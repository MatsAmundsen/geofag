import { useEffect, useRef } from "react";
import { RelScale } from "@/components/meteo/rel-scale";
import { rainLevel, tempLevel } from "@/lib/meteo/fagtekst";
import { activeFlows } from "@/lib/meteo/moisture-flows";
import { ensoAmp, iodAmp } from "@/lib/meteo/physics";

/** Samme farger som world-map.tsx. */
const MOIST = "#cba6f7";
const TROP = "#5fd4a8";
import { geoEquirectangular, geoGraticule, geoPath } from "d3-geo";
import { drawSky } from "@/components/meteo/glyphs";
import { borderGeometry, continentalityAt, landGeometry } from "@/lib/meteo/land";
import { placeWeather, type PlaceWeather } from "@/lib/meteo/diagnose";
import {
  couplings,
  evaluate,
  formatLat,
  formatLon,
  jetKind,
  markersFor,
  nb,
  precipAt,
  ribbonLat,
  scenarioJets,
  type PassMode,
  temperatureAt,
  weatherKind,
  windAt,
  JET_ORDER,
  type ClimateModes,
  type JetId,
} from "@/lib/meteo/physics";
import { useClimateModes, useJetStore, type Focus } from "@/lib/meteo/store";

export function RegionZoom() {
  const focus = useJetStore((s) => s.focus);
  const setFocus = useJetStore((s) => s.setFocus);
  const jets = useJetStore((s) => s.jets);
  const month = useJetStore((s) => s.month);
  const showHighs = useJetStore((s) => s.layers.highs);
  const showLows = useJetStore((s) => s.layers.systems);
  const modes = useClimateModes();
  useEffect(() => {
    if (!focus) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocus(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, setFocus]);
  if (!focus) return null;
  const weather = placeWeather(focus, jets, month, modes);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-[#07141c]/80 p-2 sm:p-4 lg:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="zoom-title"
        className="flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Zoomet område</p>
            <h2 id="zoom-title" className="font-display text-2xl text-foreground">
              {focus.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatLat(focus.lat)}, {formatLon(focus.lon)} · {focus.role}
            </p>
          </div>
          <button
            type="button"
            className="h-11 shrink-0 rounded-full border border-border px-4 text-sm text-foreground"
            onClick={() => setFocus(null)}
          >
            Lukk
          </button>
        </div>
        <div className="grid min-h-0 flex-1 gap-3 overflow-y-auto p-3 sm:grid-cols-2">
          <Pane title="Banen du tegnet" note="Slik strekene ligger nå" mode="now" focus={focus} jets={jets} month={month} modes={modes} showHighs={showHighs} showLows={showLows} report={weather.now} />
          <Pane title="Polarjeten over" note="Hvis banen bøyes hit" mode="polar" focus={focus} jets={jets} month={month} modes={modes} showHighs={showHighs} showLows={showLows} report={weather.polar} />
          <Pane title="Subtropisk jet over" note="Hvis banen bøyes hit" mode="sub" focus={focus} jets={jets} month={month} modes={modes} showHighs={showHighs} showLows={showLows} report={weather.sub} />
          <Pane title="Begge møtes her" note="Hvis banen bøyes hit" mode="meet" focus={focus} jets={jets} month={month} modes={modes} showHighs={showHighs} showLows={showLows} report={weather.meet} />
        </div>
        <p className="border-t border-border px-4 py-3 text-sm text-pretty text-foreground">{weather.line}</p>
      </div>
    </div>
  );
}

function Pane({
  title,
  note,
  mode,
  focus,
  jets,
  month,
  modes,
  showHighs,
  showLows,
  report,
}: {
  title: string;
  note: string;
  mode: PassMode;
  focus: Focus;
  jets: ReturnType<typeof useJetStore.getState>["jets"];
  month: number;
  modes: ClimateModes;
  showHighs: boolean;
  showLows: boolean;
  report: PlaceWeather["now"];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      drawRegion(canvas, focus, jets, month, mode, modes, showHighs, showLows);
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [focus, jets, month, mode, modes, showHighs, showLows]);

  return (
    <section className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3">
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground">{note}</p>
      <canvas ref={ref} className="h-40 w-full rounded-lg bg-[#0c2433] sm:h-48" aria-label={title} />
      <p className="font-display text-xl text-foreground">{report.weather}</p>
      <div className="flex flex-col gap-1" data-testid="zoom-skala">
        <RelScale kind="Temperatur" level={tempLevel(report.anomaly)} />
        <RelScale kind="Nedbør" level={rainLevel(report.precip, report.normalPrecip)} />
      </div>
      <p className="text-sm text-muted-foreground">{report.windLine}</p>
    </section>
  );
}

function drawRegion(
  canvas: HTMLCanvasElement,
  focus: Focus,
  jets: ReturnType<typeof useJetStore.getState>["jets"],
  month: number,
  mode: PassMode,
  modes: ClimateModes,
  showHighs: boolean,
  showLows: boolean,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = canvas.width / Math.max(1, canvas.getBoundingClientRect().width);
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0c2433";
  ctx.fillRect(0, 0, w, h);

  const spanLon = 18;
  const spanLat = 12;
  const box = {
    type: "Polygon" as const,
    coordinates: [
      [
        [focus.lon - spanLon, focus.lat - spanLat],
        [focus.lon + spanLon, focus.lat - spanLat],
        [focus.lon + spanLon, focus.lat + spanLat],
        [focus.lon - spanLon, focus.lat + spanLat],
        [focus.lon - spanLon, focus.lat - spanLat],
      ],
    ],
  };
  const projection = geoEquirectangular().fitExtent(
    [
      [10, 10],
      [w - 10, h - 10],
    ],
    box,
  );
  const path = geoPath(projection, ctx);
  ctx.save();
  ctx.beginPath();
  ctx.rect(8, 8, w - 16, h - 16);
  ctx.clip();
  ctx.fillStyle = "#1a2c2a";
  ctx.beginPath();
  path(landGeometry);
  ctx.fill();
  ctx.strokeStyle = "#d9d0c2";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.strokeStyle = "#3e564e";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  path(borderGeometry);
  ctx.stroke();
  ctx.strokeStyle = "rgba(232,226,214,0.18)";
  ctx.beginPath();
  path(geoGraticule().step([5, 5])());
  ctx.stroke();

  const shaped = scenarioJets(jets, month, focus, mode);
  const sky = evaluate(shaped, month, modes);
  // Fuktpiler (samme data og farger som verdenskartet), under jetene.
  for (const { flow, s: strength, path: line } of activeFlows(ensoAmp(modes), iodAmp(modes), month)) {
    ctx.beginPath();
    line.forEach(([lon, lat], i) => {
      const p = projection([lon, lat]);
      if (!p) return;
      if (i) ctx.lineTo(p[0], p[1]);
      else ctx.moveTo(p[0], p[1]);
    });
    ctx.lineCap = "round";
    ctx.strokeStyle = flow.kind === "ar" ? MOIST : TROP;
    ctx.globalAlpha = 0.25 + 0.35 * strength;
    ctx.lineWidth = flow.kind === "ar" ? 10 : 22;
    ctx.stroke();
    ctx.globalAlpha = 1;
    if (flow.kind === "ar") {
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  for (let iy = 0; iy < 18; iy++) {
    for (let ix = 0; ix < 24; ix++) {
      const lon = focus.lon - spanLon + ((ix + 0.5) / 24) * spanLon * 2;
      const lat = focus.lat + spanLat - ((iy + 0.5) / 18) * spanLat * 2;
      const cont = continentalityAt(lat, lon);
      const rain = precipAt(lat, lon, sky, month, cont).rate;
      if (rain < 2) continue;
      const point = projection([lon, lat]);
      if (!point) continue;
      ctx.globalAlpha = Math.min(0.55, rain / 28);
      ctx.fillStyle = "#9fd4e4";
      ctx.fillRect(point[0] - 4, point[1] - 3, 8, 6);
    }
  }
  ctx.globalAlpha = 1;

  for (const id of JET_ORDER) {
    const polar = jetKind(id) === "polar";
    ctx.beginPath();
    let open = false;
    for (let lon = focus.lon - spanLon; lon <= focus.lon + spanLon; lon += 0.8) {
      const lat = ribbonLat(sky.ribbons[id], lon);
      if (Math.abs(lat - focus.lat) > spanLat + 2) {
        open = false;
        continue;
      }
      const point = projection([lon, lat]);
      if (!point) continue;
      if (!open) {
        ctx.moveTo(point[0], point[1]);
        open = true;
      } else ctx.lineTo(point[0], point[1]);
    }
    ctx.strokeStyle = polar ? "#e4a23c" : "#7eb6cc";
    ctx.lineWidth = polar ? 3 : 2;
    ctx.stroke();
  }

  for (const river of sky.rivers) {
    ctx.beginPath();
    let open = false;
    let prevLon = river.points[0]?.lon ?? 0;
    for (const point of river.points) {
      if (Math.abs(point.lat - focus.lat) > spanLat + 4 || Math.abs(wrap(point.lon - focus.lon)) > spanLon + 4) {
        open = false;
        prevLon = point.lon;
        continue;
      }
      if (open && Math.abs(wrap(point.lon - prevLon)) > 20) open = false;
      prevLon = point.lon;
      const placed = projection([point.lon, point.lat]);
      if (!placed) continue;
      if (!open) {
        ctx.moveTo(placed[0], placed[1]);
        open = true;
      } else ctx.lineTo(placed[0], placed[1]);
    }
    ctx.strokeStyle = "#9fdede";
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  for (const marker of markersFor(jets, sky)) {
    const high = marker.kind !== "L";
    if (high ? !showHighs : !showLows) continue;
    if (Math.abs(marker.lat - focus.lat) > spanLat || Math.abs(wrap(marker.lon - focus.lon)) > spanLon) continue;
    const point = projection([marker.lon, marker.lat]);
    if (!point) continue;
    ctx.beginPath();
    ctx.arc(point[0], point[1], 11, 0, Math.PI * 2);
    ctx.fillStyle = marker.kind === "L" ? "#1a4d66" : "#6a4320";
    ctx.fill();
    ctx.strokeStyle = "#e8e2d6";
    ctx.stroke();
    ctx.fillStyle = "#e8e2d6";
    ctx.font = "600 12px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(marker.kind === "block" ? "B" : marker.kind, point[0], point[1]);
  }

  const cont = continentalityAt(focus.lat, focus.lon);
  const temp = temperatureAt(focus.lat, focus.lon, sky, month, cont);
  const rain = precipAt(focus.lat, focus.lon, sky, month, cont).rate;
  const wind = windAt(focus.lat, focus.lon, sky);
  const kind = weatherKind(temp, rain, wind.surface);
  const center = projection([focus.lon, focus.lat]);
  if (center) {
    ctx.beginPath();
    ctx.arc(center[0], center[1], 22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(7,20,28,0.82)";
    ctx.fill();
    ctx.strokeStyle = "#e4a23c";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    drawSky(ctx, center[0], center[1], kind, 22);
  }

  const meet = couplings(sky).find((item) => Math.abs(wrap(item.lon - focus.lon)) < spanLon);
  ctx.restore();
  ctx.fillStyle = "#e8e2d6";
  ctx.font = "500 12px Outfit, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  if (meet) ctx.fillText(meet.crossed ? "Jetstrømmene krysser" : "Jetstrømmer nær hverandre", 14, 22);
}

function wrap(lon: number): number {
  let x = (((lon + 180) % 360) + 360) % 360 - 180;
  if (x === 180) x = -180;
  return x;
}
