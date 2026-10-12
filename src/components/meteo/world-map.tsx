import { useEffect, useRef } from "react";
import { geoEquirectangular, geoGraticule, geoPath, type GeoProjection } from "d3-geo";
import { borderGeometry, continentalityAt, ensureLandGrid, landGeometry } from "@/lib/meteo/land";
import {
  anomalyAt,
  applyOffsetDrag,
  cloneJets,
  controlLon,
  CONTROL_COUNT,
  couplings,
  evaluate,
  followRiver,
  jetKind,
  jetSpeed,
  JET_ORDER,
  lonDegPerRealSec,
  markersFor,
  phaseSpeed,
  polarId,
  precipAt,
  ribbonAscent,
  ribbonLat,
  temperatureAt,
  VISUAL_TIME,
  waveOnly,
  wrapLon,
  type Atmosphere,
  type Hem,
  type JetId,
  type Jets,
} from "@/lib/meteo/physics";
import { focusSites, type FocusSite } from "@/lib/meteo/diagnose";
import { ensoAmp as ensoAmpOf, iodAmp as iodAmpOf } from "@/lib/meteo/physics";
import { activeFlows } from "@/lib/meteo/moisture-flows";
import { FLOW_TEXT, EXPLAIN } from "@/lib/meteo/fagtekst";
import { modesFor, useJetStore, type Layers } from "@/lib/meteo/store";

const OCEAN = "#0c2433";
const LAND = "#1a2c2a";
const COAST = "#d9d0c2";
const BORDER = "#3e564e";
const GRID = "rgba(232, 226, 214, 0.16)";
const AMBER = "#e4a23c";
const STEEL = "#7eb6cc";
const PAPER = "#e8e2d6";
/** Atmosfærisk elv (smalt bånd, stiplet kant). */
export const MOIST = "#cba6f7";
const MOIST_DOT = "#f3e8ff";
/** Tropisk fukttransport / monsunstrøm (bred, kort pil, uten front). */
export const TROP = "#5fd4a8";
const TROP_TIP = "#8ff0c8";

/** Settes per frame: tid (s) og om fuktpartikler skal bevege seg. */
const flowClock = { t: 0, animate: false };
const INK = "#07141c";

type HandleHit = { index: number; x: number; y: number };
type SiteHit = FocusSite & { x: number; y: number };
type Field = {
  w: number;
  h: number;
  temp: Float32Array;
  anom: Float32Array;
  precip: Float32Array;
  stamp: number;
};

const initial = useJetStore.getState();
const live = {
  month: initial.month,
  jets: cloneJets(initial.jets),
  playing: initial.playing,
  layers: { ...initial.layers },
  probe: { ...initial.probe },
  selected: initial.selected as JetId,
  mapZoom: initial.mapZoom,
  mapCenter: { ...initial.mapCenter },
  mapLarge: initial.mapLarge,
  landTick: initial.landTick,
  modes: modesFor(initial.oni, initial.dmi),
  revision: 1,
  lock: false,
  dragging: false,
};
let committed = cloneJets(initial.jets);

useJetStore.subscribe((state) => {
  if (live.lock) return;
  const next = cloneJets(state.jets);
  for (const id of JET_ORDER) {
    const edited = Math.abs(state.jets[id].phase - committed[id].phase) > 1e-4;
    if (live.playing && !edited) next[id].phase = live.jets[id].phase;
  }
  live.jets = next;
  committed = cloneJets(state.jets);
  live.month = state.month;
  live.playing = state.playing;
  live.layers = state.layers;
  live.probe = state.probe;
  live.selected = state.selected;
  live.mapZoom = state.mapZoom;
  live.mapCenter = state.mapCenter;
  live.mapLarge = state.mapLarge;
  live.landTick = state.landTick;
  live.modes = modesFor(state.oni, state.dmi);
  live.revision += 1;
});

function commitJets() {
  committed = cloneJets(live.jets);
  live.lock = true;
  useJetStore.setState({ jets: cloneJets(live.jets) });
  live.lock = false;
}

export function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (ensureLandGrid()) useJetStore.getState().markLand();

    const hits: HandleHit[] = [];
    const siteHits: SiteHit[] = [];
    const jetLines: { id: JetId; pts: { x: number; y: number }[] }[] = [];
    let projection: GeoProjection = geoEquirectangular();
    let yScale = 1;
    let yOffset = 0;
    let viewW = 0;
    let viewH = 0;
    let landPath: Path2D | null = null;
    let borderPath: Path2D | null = null;
    let gridPath: Path2D | null = null;
    let field: Field | null = null;
    let fieldRev = -1;
    let weather: HTMLCanvasElement | null = null;
    let weatherKey = "";
    const storms: { lon: number; hem: Hem }[] = [];
    for (const hem of ["N", "S"] as const) {
      for (let i = 0; i < 7; i++) storms.push({ lon: -160 + i * 46, hem });
    }
    let last = performance.now();
    let built = 0;
    let wasPlaying = live.playing;
    let raf = 0;
    let panning = false;
    let panLast = { x: 0, y: 0 };
    let panMoved = 0;
    const riverLon = { N: Number.NaN, S: Number.NaN };
    let riverPattern = "";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      viewW = Math.max(1, rect.width);
      viewH = Math.max(1, rect.height);
      canvas.width = Math.round(viewW * dpr);
      canvas.height = Math.round(viewH * dpr);
      const pad = 12;
      const natW = Math.max(10, viewW - pad * 2);
      const natH = natW / 2;
      projection = geoEquirectangular().fitExtent(
        [
          [pad, 0],
          [pad + natW, natH],
        ],
        { type: "Sphere" },
      );
      const availH = Math.max(10, viewH - pad * 2);
      const rawScale = availH / natH;
      yScale = Math.min(rawScale, 1.55);
      yOffset = pad + (availH - natH * yScale) / 2;
      const path = geoPath(projection);
      landPath = new Path2D(path(landGeometry) ?? "");
      borderPath = new Path2D(path(borderGeometry) ?? "");
      gridPath = new Path2D(path(geoGraticule().step([30, 30])()) ?? "");
      fieldRev = -1;
    };

    const paintWeather = (layers: Layers) => {
      if (!field) return;
      if (!weather) weather = document.createElement("canvas");
      weather.width = field.w;
      weather.height = field.h;
      const ctx = weather.getContext("2d");
      if (!ctx) return;
      const img = ctx.createImageData(field.w, field.h);
      const data = img.data;
      for (let i = 0; i < field.w * field.h; i++) {
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        if (layers.anomaly) {
          const t = Math.max(-1, Math.min(1, field.anom[i]! / 12));
          if (t > 0.04) {
            r = 212;
            g = 101;
            b = 74;
            a = Math.round(170 * t);
          } else if (t < -0.04) {
            r = 62;
            g = 142;
            b = 174;
            a = Math.round(175 * -t);
          }
        }
        if (layers.precip) {
          const p = Math.max(0, Math.min(1, (field.precip[i]! - 1.2) / 12));
          const alpha = Math.min(0.78, p * 0.9);
          if (alpha > 0.04) {
            const prev = a / 255;
            const out = alpha + prev * (1 - alpha);
            r = (150 * alpha + r * prev * (1 - alpha)) / out;
            g = (214 * alpha + g * prev * (1 - alpha)) / out;
            b = (224 * alpha + b * prev * (1 - alpha)) / out;
            a = Math.round(out * 255);
          }
        }
        const o = i * 4;
        data[o] = r;
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = a;
      }
      ctx.putImageData(img, 0, 0);
    };

    const ensureField = (sky: Atmosphere, month: number, now: number, layers: Layers) => {
      const due = fieldRev !== live.revision || (live.playing && now - built > 140);
      if (!due && field) return;
      const w = 180;
      const h = 90;
      const temp = new Float32Array(w * h);
      const anom = new Float32Array(w * h);
      const precip = new Float32Array(w * h);
      fillField(temp, anom, precip, w, h, sky, month);
      field = { w, h, temp, anom, precip, stamp: now };
      fieldRev = live.revision;
      built = now;
      weatherKey = "";
      paintWeather(layers);
      weatherKey = layerKey(layers);
    };

    const reduce = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    let onScreen = true;
    const frame = (now: number) => {
      if (!onScreen || document.hidden) {
        raf = 0;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      flowClock.t = now / 1000;
      flowClock.animate = live.playing && !(reduce?.matches ?? false);
      if (live.playing && !live.dragging) {
        for (const id of JET_ORDER) {
          const jet = live.jets[id];
          const lat = id === "spj" || id === "sstj" ? -50 : 48;
          const dLon = lonDegPerRealSec(phaseSpeed(jet, id, live.month), lat) * VISUAL_TIME * dt;
          jet.phase = wrapPhase(jet.phase - jet.wave * dLon * (Math.PI / 180));
        }
        for (const storm of storms) {
          const id = polarId(storm.hem);
          const jet = live.jets[id];
          const along = jetSpeed(jet, id, live.month) * 0.82;
          const lat = storm.hem === "N" ? 45 : -50;
          storm.lon = wrapLon(storm.lon + lonDegPerRealSec(along, lat) * VISUAL_TIME * dt);
        }
      }
      if (!live.playing && wasPlaying) commitJets();
      wasPlaying = live.playing;
      const pattern = `${JET_ORDER.map((id) => {
        const jet = live.jets[id];
        return `${jet.amp}:${jet.wave}:${jet.latShift}:${jet.offsets.join(",")}`;
      }).join("|")}:${live.modes.oni}:${live.modes.dmi}`;
      if (pattern !== riverPattern) {
        riverPattern = pattern;
        riverLon.N = Number.NaN;
        riverLon.S = Number.NaN;
        coupleAnchor.N = Number.NaN;
        coupleAnchor.S = Number.NaN;
      }
      const sky = evaluate(live.jets, live.month, live.modes);
      for (const hem of ["N", "S"] as const) {
        const followed = followRiver(sky.ribbons, hem, riverLon[hem]);
        riverLon[hem] = followed.lon;
        const slot = sky.rivers.findIndex((river) => river.hem === hem);
        if (slot >= 0) sky.rivers[slot] = followed.river;
        else sky.rivers.push(followed.river);
      }
      ensureField(sky, live.month, now, live.layers);
      if (weatherKey !== layerKey(live.layers)) {
        paintWeather(live.layers);
        weatherKey = layerKey(live.layers);
      }
      const locate = (lon: number, lat: number): [number, number] | null => {
        const point = projection([lon, lat]);
        const origin = projection([live.mapCenter.lon, live.mapCenter.lat]);
        if (!point || !origin) return null;
        const zoom = live.mapZoom;
        const sx = point[0];
        const sy = point[1] * yScale + yOffset;
        const ox = origin[0];
        const oy = origin[1] * yScale + yOffset;
        return [viewW / 2 + (sx - ox) * zoom, viewH / 2 + (sy - oy) * zoom];
      };
      const origin = projection([live.mapCenter.lon, live.mapCenter.lat]);
      const zoom = live.mapZoom;
      const camera = origin
        ? {
            zoom,
            tx: viewW / 2 - origin[0] * zoom,
            ty: viewH / 2 + (yOffset - (origin[1] * yScale + yOffset)) * zoom,
          }
        : { zoom: 1, tx: 0, ty: yOffset };
      draw(
        canvas,
        sky,
        locate,
        { yScale, yOffset, zoom, camera },
        landPath,
        borderPath,
        gridPath,
        weather,
        field,
        hits,
        siteHits,
        jetLines,
        storms,
      );
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(frame);
    const resume = () => {
      if (!raf && onScreen && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const io =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            onScreen = entries.some((e) => e.isIntersecting);
            resume();
          })
        : null;
    io?.observe(canvas);
    document.addEventListener("visibilitychange", resume);

    const pointOf = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const invert = (x: number, y: number): [number, number] | null => {
      const origin = projection([live.mapCenter.lon, live.mapCenter.lat]);
      if (!origin || !projection.invert) return null;
      const zoom = Math.max(1, live.mapZoom);
      const sx = origin[0] + (x - viewW / 2) / zoom;
      const sy = origin[1] * yScale + yOffset + (y - viewH / 2) / zoom;
      const ll = projection.invert([sx, (sy - yOffset) / yScale]);
      if (!ll || Math.abs(ll[1]) > 90) return null;
      return [wrapLon(ll[0]), ll[1]];
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const next = live.mapZoom * (event.deltaY < 0 ? 1.14 : 0.88);
      const rect = canvas.getBoundingClientRect();
      const ll = invert(event.clientX - rect.left, event.clientY - rect.top);
      useJetStore.getState().setMapZoom(next);
      if (ll && next > 1) useJetStore.getState().setMapCenter({ lon: ll[0], lat: ll[1] });
    };

    const onDown = (event: PointerEvent) => {
      const p = pointOf(event);
      const handle = nearestHandle(hits, p.x, p.y, viewW < 720 ? 26 : 18);
      if (handle) {
        live.dragging = true;
        canvas.setPointerCapture(event.pointerId);
        dragIndex = handle.index;
        if (!useJetStore.getState().moreOpen) useJetStore.getState().setMoreOpen(true);
        return;
      }
      const site = nearestSite(siteHits, p.x, p.y, viewW < 720 ? 28 : 20);
      if (site && live.mapZoom < 1.2) {
        useJetStore.getState().setSelected(site.jet);
        if (!useJetStore.getState().moreOpen) useJetStore.getState().setMoreOpen(true);
        useJetStore.getState().setProbe({ lat: site.lat, lon: site.lon });
        useJetStore.getState().setFocus({
          name: site.name,
          lat: site.lat,
          lon: site.lon,
          jet: site.jet,
          role: site.role,
        });
        return;
      }
      panning = true;
      panLast = p;
      panMoved = 0;
      canvas.setPointerCapture(event.pointerId);
    };

    let dragIndex = -1;
    const onMove = (event: PointerEvent) => {
      const p = pointOf(event);
      if (dragIndex >= 0) {
        const ll = projection.invert?.([p.x, (p.y - yOffset) / yScale]);
        if (!ll) return;
        const id = live.selected;
        const jet = live.jets[id];
        const lon = controlLon(dragIndex);
        const desired = ll[1] - waveOnly(jet, id, live.month, lon);
        useJetStore.getState().setOffsets(id, applyOffsetDrag(jet.offsets, dragIndex, desired));
        canvas.style.cursor = "grabbing";
        return;
      }
      if (panning) {
        const dx = p.x - panLast.x;
        const dy = p.y - panLast.y;
        panMoved += Math.hypot(dx, dy);
        panLast = p;
        if (panMoved > 4 && live.mapZoom > 1) {
          const deg = 360 / Math.max(200, (viewW - 24) * live.mapZoom);
          useJetStore.getState().setMapCenter({
            lon: wrapLon(live.mapCenter.lon - dx * deg),
            lat: Math.max(-75, Math.min(75, live.mapCenter.lat + (dy * deg) / yScale)),
          });
        }
        return;
      }
      const handle = nearestHandle(hits, p.x, p.y, viewW < 720 ? 26 : 18);
      canvas.style.cursor = handle ? "grab" : nearestJet(jetLines, p.x, p.y, 14) ? "pointer" : "crosshair";
    };
    const onUp = (event: PointerEvent) => {
      const wasPan = panning;
      const moved = panMoved;
      panning = false;
      panMoved = 0;
      live.dragging = false;
      dragIndex = -1;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (!wasPan || moved > 6) return;
      const p = pointOf(event);
      const site = nearestSite(siteHits, p.x, p.y, viewW < 720 ? 28 : 20);
      const ll = invert(p.x, p.y);
      if (site) {
        useJetStore.getState().setSelected(site.jet);
        useJetStore.getState().setProbe({ lat: site.lat, lon: site.lon });
        useJetStore.getState().setFocus({
          name: site.name,
          lat: site.lat,
          lon: site.lon,
          jet: site.jet,
          role: site.role,
        });
        return;
      }
      if (ll) {
        const jet = nearestJet(jetLines, p.x, p.y, 14);
        if (jet) useJetStore.getState().setSelected(jet);
        useJetStore.getState().setProbe({ lat: ll[1], lon: ll[0] });
      }
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", resume);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
      role="img"
      aria-label={EXPLAIN.mapAria}
      aria-describedby="jet-map-desc"
      data-testid="jet-map"
    />
  );
}

function layerKey(layers: Layers): string {
  return `${layers.anomaly}-${layers.precip}`;
}

function wrapPhase(phase: number): number {
  const tau = Math.PI * 2;
  return ((phase % tau) + tau) % tau;
}

function fillField(
  temp: Float32Array,
  anom: Float32Array,
  precip: Float32Array,
  w: number,
  h: number,
  sky: Atmosphere,
  month: number,
) {
  for (let iy = 0; iy < h; iy++) {
    const lat = 90 - (iy + 0.5) * (180 / h);
    for (let ix = 0; ix < w; ix++) {
      const lon = -180 + (ix + 0.5) * (360 / w);
      const cont = continentalityAt(lat, lon);
      const i = iy * w + ix;
      temp[i] = temperatureAt(lat, lon, sky, month, cont);
      anom[i] = anomalyAt(lat, lon, sky, month, cont);
      precip[i] = precipAt(lat, lon, sky, month, cont).rate;
    }
  }
}

function nearestSite(hits: SiteHit[], x: number, y: number, radius: number): SiteHit | null {
  let best: SiteHit | null = null;
  let bestD = radius * radius;
  for (const hit of hits) {
    const d = (hit.x - x) ** 2 + (hit.y - y) ** 2;
    if (d <= bestD) {
      best = hit;
      bestD = d;
    }
  }
  return best;
}

const coupleAnchor: { N: number; S: number } = { N: Number.NaN, S: Number.NaN };

const LATITUDE_LINES: [number, string][] = [
  [0, "0°"],
  [30, "30° N"],
  [-30, "30° S"],
  [60, "60° N"],
  [-60, "60° S"],
];

function drawLatitudes(
  ctx: CanvasRenderingContext2D,
  locate: (lon: number, lat: number) => [number, number] | null,
) {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "600 11px Outfit, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  for (const [lat, label] of LATITUDE_LINES) {
    ctx.beginPath();
    let open = false;
    for (let lon = -180; lon <= 180; lon += 3) {
      const point = locate(lon, lat);
      if (!point) {
        open = false;
        continue;
      }
      if (!open) {
        ctx.moveTo(point[0], point[1]);
        open = true;
      } else ctx.lineTo(point[0], point[1]);
    }
    ctx.setLineDash(lat === 0 ? [] : [5, 4]);
    ctx.strokeStyle = lat === 0 ? "rgba(232, 226, 214, 0.7)" : "rgba(232, 226, 214, 0.45)";
    ctx.stroke();
    const anchor = locate(lonLabel(lat), lat);
    if (!anchor) continue;
    ctx.setLineDash([]);
    const width = ctx.measureText(label).width + 8;
    ctx.fillStyle = "rgba(7, 20, 28, 0.82)";
    ctx.fillRect(anchor[0] + 4, anchor[1] - 16, width, 14);
    ctx.fillStyle = "#e8e2d6";
    ctx.fillText(label, anchor[0] + 8, anchor[1] - 4);
  }
  ctx.restore();
}

function lonLabel(lat: number): number {
  if (lat === 60) return -35;
  if (lat === 30) return -45;
  if (lat === 0) return -28;
  if (lat === -30) return -12;
  return -25;
}

function drawCoupling(
  ctx: CanvasRenderingContext2D,
  locate: (lon: number, lat: number) => [number, number] | null,
  sky: Atmosphere,
) {
  for (const meet of couplings(sky, coupleAnchor)) {
    coupleAnchor[meet.hem] = meet.lon;
    const polar = sky.ribbons[polarId(meet.hem)];
    const sub = sky.ribbons[meet.hem === "N" ? "nstj" : "sstj"];
    for (let i = 0; i < 360; i += 2) {
      const gap = Math.abs((polar.lat[i] ?? 0) - (sub.lat[i] ?? 0));
      if (gap > 12) continue;
      const lon = i - 180;
      const a = locate(lon, polar.lat[i] ?? 0);
      const b = locate(lon, sub.lat[i] ?? 0);
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.strokeStyle = meet.crossed ? "#f0d7a2" : "#d7c4a4";
      ctx.globalAlpha = 0.18 + (1 - gap / 12) * 0.45;
      ctx.lineWidth = meet.crossed ? 2.4 : 1.6;
      ctx.stroke();
    }
    const label = locate(meet.lon, meet.lat);
    if (!label) continue;
    ctx.globalAlpha = 1;
    ctx.font = "600 11px Outfit, sans-serif";
    const text = meet.crossed ? "Kryss" : "Møtes";
    const width = ctx.measureText(text).width + 12;
    ctx.fillStyle = "rgba(16, 33, 44, 0.92)";
    ctx.fillRect(label[0] - width / 2, label[1] - 18, width, 16);
    ctx.fillStyle = PAPER;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, label[0], label[1] - 10);
  }
  ctx.globalAlpha = 1;
}

function nearestHandle(hits: HandleHit[], x: number, y: number, radius: number): HandleHit | null {
  let best: HandleHit | null = null;
  let bestD = radius * radius;
  for (const hit of hits) {
    const d = (hit.x - x) ** 2 + (hit.y - y) ** 2;
    if (d <= bestD) {
      best = hit;
      bestD = d;
    }
  }
  return best;
}

function nearestJet(
  lines: { id: JetId; pts: { x: number; y: number }[] }[],
  x: number,
  y: number,
  radius: number,
): JetId | null {
  let best: JetId | null = null;
  let bestD = radius;
  for (const line of lines) {
    const pts = line.pts;
    for (let i = 1; i < pts.length; i++) {
      const d = segmentDistance(x, y, pts[i - 1]!, pts[i]!);
      if (d < bestD) {
        bestD = d;
        best = line.id;
      }
    }
  }
  return best;
}

function segmentDistance(
  x: number,
  y: number,
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = dx * dx + dy * dy;
  const t = len === 0 ? 0 : Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / len));
  return Math.hypot(x - (a.x + dx * t), y - (a.y + dy * t));
}

function draw(
  canvas: HTMLCanvasElement,
  sky: Atmosphere,
  locate: (lon: number, lat: number) => [number, number] | null,
  stretch: { yScale: number; yOffset: number; zoom: number; camera: { zoom: number; tx: number; ty: number } },
  landPath: Path2D | null,
  borderPath: Path2D | null,
  gridPath: Path2D | null,
  weather: HTMLCanvasElement | null,
  field: Field | null,
  hits: HandleHit[],
  siteHits: SiteHit[],
  jetLines: { id: JetId; pts: { x: number; y: number }[] }[],
  storms: { lon: number; hem: Hem }[],
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = canvas.width / Math.max(1, canvas.getBoundingClientRect().width);
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = OCEAN;
  ctx.fillRect(0, 0, w, h);
  landCamera(ctx, dpr, stretch);
  if (landPath) {
    ctx.fillStyle = LAND;
    ctx.fill(landPath);
    ctx.strokeStyle = COAST;
    ctx.lineWidth = 0.8 / stretch.yScale;
    ctx.stroke(landPath);
  }
  if (borderPath) {
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 0.6 / stretch.yScale;
    ctx.stroke(borderPath);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const nw = locate(-180, 90);
  const se = locate(180, -90);
  if (weather && nw && se) {
    ctx.drawImage(weather, nw[0], nw[1], se[0] - nw[0], se[1] - nw[1]);
  }
  landCamera(ctx, dpr, stretch);
  if (landPath) {
    ctx.strokeStyle = COAST;
    ctx.lineWidth = 1.1 / stretch.yScale;
    ctx.stroke(landPath);
  }
  if (gridPath) {
    ctx.strokeStyle = GRID;
    ctx.lineWidth = 0.6 / stretch.yScale;
    ctx.stroke(gridPath);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawLatitudes(ctx, locate);
  if (field && live.layers.anomaly) drawFreezing(ctx, locate, field);
  drawCoupling(ctx, locate, sky);
  // Lag: fukt under jetene, slik at jetlinjene alltid er lesbare.
  if (live.layers.rivers) {
    drawRivers(ctx, locate, sky);
    drawFlows(ctx, locate, w);
  }

  hits.length = 0;
  siteHits.length = 0;
  jetLines.length = 0;
  const step = w < 720 ? 2 : 1;
  for (const id of JET_ORDER) {
    const polar = jetKind(id) === "polar";
    const color = polar ? AMBER : STEEL;
    const selected = id === live.selected;
    const pts = projectRibbon(locate, sky.ribbons[id]);
    jetLines.push({ id, pts });
    trace(ctx, pts);
    ctx.strokeStyle = color;
    ctx.globalAlpha = selected ? 0.28 : 0.16;
    ctx.lineWidth = polar ? 12 : 7;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.globalAlpha = selected ? 1 : 0.72;
    ctx.lineWidth = polar ? 2.4 : 1.5;
    ctx.stroke();
    ctx.globalAlpha = 1;
    if (live.layers.normal) {
      const ghost = projectRibbon(locate, sky.reference[id]);
      trace(ctx, ghost);
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
    if (live.layers.arrows) drawArrows(ctx, pts, color, polar ? 8 : 12);
    if (selected) {
      for (let i = 0; i < CONTROL_COUNT; i += step) {
        const lon = controlLon(i);
        const point = locate(lon, ribbonLat(sky.ribbons[id], lon));
        if (!point) continue;
        hits.push({ index: i, x: point[0], y: point[1] });
        if (hits.length === 1) {
          const tag = `${Math.round(point[0])},${Math.round(point[1])}`;
          if (canvas.dataset.handle !== tag) canvas.dataset.handle = tag; // brukes av test
        }
        ctx.beginPath();
        ctx.arc(point[0], point[1], w < 720 ? 8 : 6.5, 0, Math.PI * 2);
        ctx.fillStyle = INK;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = PAPER;
        ctx.stroke();
      }
    }
  }


  const sites = focusSites(live.jets, live.month, sky);
  const sitePts = sites
    .map((site) => {
      const point = locate(site.lon, site.lat);
      return point ? { site, x: point[0], y: point[1] } : null;
    })
    .filter((item): item is { site: FocusSite; x: number; y: number } => item !== null);
  if (live.layers.systems || live.layers.highs) {
    for (const marker of markersFor(live.jets, sky)) {
      const high = marker.kind !== "L";
      if (high ? !live.layers.highs : !live.layers.systems) continue;
      const point = locate(marker.lon, marker.lat);
      if (!point) continue;
      if (sitePts.some((site) => Math.hypot(site.x - point[0], site.y - point[1]) < 28)) continue;
      drawMarker(ctx, point[0], point[1], marker.kind);
    }
  }
  sitePts.forEach((item, index) => {
    siteHits.push({ ...item.site, x: item.x, y: item.y });
    drawAreaPin(ctx, item.x, item.y, index + 1, w < 720);
    if (stretch.zoom > 1.45) {
      ctx.font = "500 11px Outfit, sans-serif";
      ctx.fillStyle = PAPER;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(item.site.name, item.x + 16, item.y);
    }
  });

  const probe = locate(live.probe.lon, live.probe.lat);
  if (probe) {
    ctx.beginPath();
    ctx.arc(probe[0], probe[1], 5, 0, Math.PI * 2);
    ctx.strokeStyle = PAPER;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function landCamera(
  ctx: CanvasRenderingContext2D,
  dpr: number,
  stretch: { yScale: number; camera: { zoom: number; tx: number; ty: number } },
) {
  const { zoom, tx, ty } = stretch.camera;
  ctx.setTransform(dpr * zoom, 0, 0, dpr * stretch.yScale * zoom, dpr * tx, dpr * ty);
}
function projectRibbon(
  locate: (lon: number, lat: number) => [number, number] | null,
  ribbon: Atmosphere["ribbons"][JetId],
) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 360; i += 2) {
    const point = locate(i - 180, ribbon.lat[i]!);
    if (point) pts.push({ x: point[0], y: point[1] });
  }
  return pts;
}

function trace(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[]) {
  ctx.beginPath();
  pts.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
}

function drawArrows(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], color: string, every: number) {
  for (let i = every; i < pts.length - 1; i += every) {
    const a = pts[i - 1]!;
    const b = pts[i + 1] ?? pts[i]!;
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    ctx.save();
    ctx.translate(pts[i]!.x, pts[i]!.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-4, 3);
    ctx.lineTo(-4, -3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}

function drawRivers(
  ctx: CanvasRenderingContext2D,
  locate: (lon: number, lat: number) => [number, number] | null,
  sky: Atmosphere,
) {
  for (const river of sky.rivers) {
    const runs = splitRuns(river.points, locate);
    for (const pts of runs) {
      if (pts.length < 2) continue;
      trace(ctx, pts);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = MOIST;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 12;
      ctx.stroke();
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      drawChevrons(ctx, pts, MOIST, 3);
    }
  }
}

type Pt = { x: number; y: number };

function densify(path: [number, number][], locate: (lon: number, lat: number) => [number, number] | null): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const [lon0, lat0] = path[i]!;
    const [lon1, lat1] = path[i + 1]!;
    for (let k = 0; k < 8; k++) {
      const t = k / 8;
      const p = locate(lon0 + (lon1 - lon0) * t, lat0 + (lat1 - lat0) * t);
      if (p) out.push({ x: p[0], y: p[1] });
    }
  }
  const end = path[path.length - 1]!;
  const p = locate(end[0], end[1]);
  if (p) out.push({ x: p[0], y: p[1] });
  return out;
}

function cumulative(pts: Pt[]): number[] {
  const d = [0];
  for (let i = 1; i < pts.length; i++) d.push(d[i - 1]! + Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y));
  return d;
}

function pointAt(pts: Pt[], dist: number[], s: number): { x: number; y: number; a: number } {
  let i = 1;
  while (i < dist.length - 1 && dist[i]! < s) i++;
  const a = pts[i - 1]!;
  const b = pts[i]!;
  const seg = dist[i]! - dist[i - 1]! || 1;
  const t = Math.max(0, Math.min(1, (s - dist[i - 1]!) / seg));
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, a: Math.atan2(b.y - a.y, b.x - a.x) };
}

/** Polygon langs senterlinjen med bredde width(u), u = 0 … 1. */
function bandPath(pts: Pt[], dist: number[], width: (u: number) => number): Path2D {
  const total = dist[dist.length - 1] || 1;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)]!;
    const b = pts[Math.min(pts.length - 1, i + 1)]!;
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    const half = width(dist[i]! / total) / 2;
    const nx = -Math.sin(ang) * half;
    const ny = Math.cos(ang) * half;
    left.push({ x: pts[i]!.x + nx, y: pts[i]!.y + ny });
    right.push({ x: pts[i]!.x - nx, y: pts[i]!.y - ny });
  }
  const path = new Path2D();
  left.forEach((p, i) => (i ? path.lineTo(p.x, p.y) : path.moveTo(p.x, p.y)));
  for (let i = right.length - 1; i >= 0; i--) path.lineTo(right[i]!.x, right[i]!.y);
  path.closePath();
  return path;
}

function drawChevrons(ctx: CanvasRenderingContext2D, pts: Pt[], color: string, count: number) {
  if (pts.length < 2) return;
  const dist = cumulative(pts);
  const total = dist[dist.length - 1]!;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.globalAlpha = 0.95;
  for (let k = 1; k <= count; k++) {
    const p = pointAt(pts, dist, (total * k) / (count + 1));
    chevron(ctx, p.x, p.y, p.a, 4);
  }
  ctx.globalAlpha = 1;
}

function chevron(ctx: CanvasRenderingContext2D, x: number, y: number, a: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(a);
  ctx.beginPath();
  ctx.moveTo(-size, -size);
  ctx.lineTo(size, 0);
  ctx.lineTo(-size, size);
  ctx.stroke();
  ctx.restore();
}

type FlowGeom = { kind: "ar" | "tropisk"; scale: number; band: Path2D; pts: Pt[]; dist: number[]; s: number; label: string; start: Pt; end: Pt };
const flowCache: { key: string; geoms: FlowGeom[] } = { key: "", geoms: [] };

function flowGeoms(locate: (lon: number, lat: number) => [number, number] | null, w: number): FlowGeom[] {
  const o = locate(0, 0);
  const key = `${live.modes.oni}:${live.modes.dmi}:${live.month}:${live.mapZoom}:${live.mapCenter.lon}:${live.mapCenter.lat}:${w}:${o?.[0]}:${o?.[1]}`;
  if (key === flowCache.key) return flowCache.geoms;
  const scale = Math.max(0.55, Math.min(1.6, (w / 1232) * Math.sqrt(live.mapZoom)));
  const geoms: FlowGeom[] = [];
  for (const { flow, s: strength, path } of activeFlows(ensoAmpOf(live.modes), iodAmpOf(live.modes), live.month)) {
    const pts = densify(path, locate);
    if (pts.length < 2) continue;
    const dist = cumulative(pts);
    const band =
      flow.kind === "ar"
        ? bandPath(pts, dist, (u) => scale * (0.6 + 0.4 * strength) * (u < 0.5 ? 4 + 28 * u : 18 - 20 * (u - 0.5)))
        : bandPath(pts, dist, () => scale * (0.7 + 0.5 * strength) * 22);
    geoms.push({ kind: flow.kind, scale, band, pts, dist, s: strength, label: FLOW_TEXT[flow.id].short, start: pts[0]!, end: pts[pts.length - 1]! });
  }
  flowCache.key = key;
  flowCache.geoms = geoms;
  return geoms;
}

function drawFlows(ctx: CanvasRenderingContext2D, locate: (lon: number, lat: number) => [number, number] | null, w: number) {
  for (const g of flowGeoms(locate, w)) {
    const grad = ctx.createLinearGradient(g.start.x, g.start.y, g.end.x, g.end.y);
    if (g.kind === "ar") {
      grad.addColorStop(0, `rgba(203,166,247,${0.15 * (0.5 + g.s)})`);
      grad.addColorStop(1, `rgba(203,166,247,${Math.min(0.75, 0.55 * (0.5 + g.s))})`);
      ctx.fillStyle = grad;
      ctx.fill(g.band);
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = MOIST;
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1;
      ctx.stroke(g.band);
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      const total = g.dist[g.dist.length - 1]!;
      const endP = pointAt(g.pts, g.dist, total);
      ctx.strokeStyle = MOIST;
      ctx.lineWidth = 2;
      chevron(ctx, endP.x, endP.y, endP.a, 8);
      if (flowClock.animate) {
        ctx.fillStyle = MOIST_DOT;
        const n = 8;
        for (let k = 0; k < n; k++) {
          const s = (flowClock.t * 40 + (total * k) / n) % total;
          const p = pointAt(g.pts, g.dist, s);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        drawChevrons(ctx, g.pts, MOIST_DOT, 3);
      }
    } else {
      // Monsun / fuktig luft fra havet: helt bånd + mørk halo + fylt pilspiss (form, ikke bare farge).
      grad.addColorStop(0, `rgba(95,212,168,${0.35 + 0.25 * g.s})`);
      grad.addColorStop(1, `rgba(95,212,168,${Math.min(0.95, 0.6 + 0.3 * g.s)})`);
      ctx.lineJoin = "round";
      ctx.strokeStyle = INK;
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = Math.max(3, 4 * g.scale);
      ctx.stroke(g.band);
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.fill(g.band);
      ctx.strokeStyle = TROP;
      ctx.lineWidth = Math.max(1.5, 1.75 * g.scale);
      ctx.stroke(g.band);
      const total = g.dist[g.dist.length - 1]!;
      const tip = pointAt(g.pts, g.dist, total);
      const len = Math.max(14, 18 * g.scale);
      const half = Math.max(16, 22 * g.scale) / 2;
      ctx.save();
      ctx.translate(tip.x, tip.y);
      ctx.rotate(tip.a);
      ctx.beginPath();
      ctx.moveTo(len * 0.6, 0);
      ctx.lineTo(-len * 0.4, -half);
      ctx.lineTo(-len * 0.4, half);
      ctx.closePath();
      ctx.lineJoin = "round";
      ctx.strokeStyle = INK;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = TROP_TIP;
      ctx.fill();
      ctx.strokeStyle = "#e8fff5";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      if (!flowClock.animate) drawChevrons(ctx, g.pts.slice(0, Math.max(2, Math.floor(g.pts.length * 0.8))), "#e8fff5", 2);
    }
    if (w >= 520) {
      const mid = pointAt(g.pts, g.dist, (g.dist[g.dist.length - 1]! * 0.45));
      ctx.font = "600 11px Outfit, sans-serif";
      const width = ctx.measureText(g.label).width + 10;
      ctx.fillStyle = "rgba(7, 20, 28, 0.88)";
      ctx.fillRect(mid.x - width / 2, mid.y - 26, width, 16);
      ctx.fillStyle = g.kind === "ar" ? MOIST : TROP;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(g.label, mid.x, mid.y - 18);
    }
  }
}

function splitRuns(
  points: { lon: number; lat: number }[],
  locate: (lon: number, lat: number) => [number, number] | null,
): { x: number; y: number }[][] {
  const runs: { x: number; y: number }[][] = [];
  let run: { x: number; y: number }[] = [];
  let prevLon = points[0]?.lon ?? 0;
  for (const point of points) {
    if (Math.abs(wrapLon(point.lon - prevLon)) > 24 && run.length) {
      runs.push(run);
      run = [];
    }
    prevLon = point.lon;
    const placed = locate(point.lon, point.lat);
    if (placed) run.push({ x: placed[0], y: placed[1] });
  }
  if (run.length) runs.push(run);
  return runs;
}

function drawAreaPin(ctx: CanvasRenderingContext2D, x: number, y: number, n: number, mobile: boolean) {
  const r = mobile ? 13 : 11;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#e8e2d6";
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = "600 11px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(n), x, y + 0.5);
}

function drawMarker(ctx: CanvasRenderingContext2D, x: number, y: number, kind: "L" | "H" | "block") {
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fillStyle = kind === "L" ? "#123044" : "#3a2a14";
  ctx.fill();
  ctx.lineWidth = 1.25;
  ctx.strokeStyle = PAPER;
  ctx.stroke();
  ctx.fillStyle = PAPER;
  ctx.font = "600 11px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(kind === "block" ? "B" : kind, x, y + 0.5);
}

function drawTag(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, width: number) {
  ctx.font = "500 13px Outfit, sans-serif";
  const pad = 8;
  const tw = ctx.measureText(text).width;
  const boxW = tw + pad * 2;
  const boxH = 26;
  let left = x + 12;
  let top = y - boxH - 10;
  if (left + boxW > width - 8) left = x - boxW - 12;
  if (top < 8) top = y + 12;
  ctx.fillStyle = "rgba(16, 33, 44, 0.92)";
  roundRect(ctx, left, top, boxW, boxH, 6);
  ctx.fill();
  ctx.fillStyle = PAPER;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, left + pad, top + boxH / 2);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawFreezing(
  ctx: CanvasRenderingContext2D,
  locate: (lon: number, lat: number) => [number, number] | null,
  field: Field,
) {
  ctx.beginPath();
  const { w, h, temp } = field;
  const lonOf = (ix: number) => -180 + (ix + 0.5) * (360 / w);
  const latOf = (iy: number) => 90 - (iy + 0.5) * (180 / h);
  const at = (ix: number, iy: number) => temp[iy * w + ix] ?? 0;
  for (let iy = 0; iy < h - 1; iy++) {
    for (let ix = 0; ix < w - 1; ix++) {
      const nw = at(ix, iy);
      const ne = at(ix + 1, iy);
      const se = at(ix + 1, iy + 1);
      const sw = at(ix, iy + 1);
      let idx = 0;
      if (sw >= 0) idx |= 1;
      if (se >= 0) idx |= 2;
      if (ne >= 0) idx |= 4;
      if (nw >= 0) idx |= 8;
      if (idx === 0 || idx === 15) continue;
      const north = edge(lonOf(ix), latOf(iy), lonOf(ix + 1), latOf(iy), nw, ne);
      const east = edge(lonOf(ix + 1), latOf(iy), lonOf(ix + 1), latOf(iy + 1), ne, se);
      const south = edge(lonOf(ix), latOf(iy + 1), lonOf(ix + 1), latOf(iy + 1), sw, se);
      const west = edge(lonOf(ix), latOf(iy), lonOf(ix), latOf(iy + 1), nw, sw);
      const pairs: Record<number, [number, number][][]> = {
        1: [[west, south]],
        2: [[south, east]],
        3: [[west, east]],
        4: [[north, east]],
        5: [
          [west, south],
          [north, east],
        ],
        6: [[north, south]],
        7: [[west, north]],
        8: [[west, north]],
        9: [[north, south]],
        10: [
          [west, north],
          [south, east],
        ],
        11: [[north, east]],
        12: [[west, east]],
        13: [[south, east]],
        14: [[west, south]],
      };
      for (const pair of pairs[idx] ?? []) {
        const a = locate(pair[0]![0], pair[0]![1]);
        const b = locate(pair[1]![0], pair[1]![1]);
        if (!a || !b) continue;
        if (Math.abs(pair[0]![0] - pair[1]![0]) > 40) continue;
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
      }
    }
  }
  ctx.strokeStyle = PAPER;
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 1.1;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function edge(x0: number, y0: number, x1: number, y1: number, v0: number, v1: number): [number, number] {
  const d = v1 - v0;
  const t = Math.abs(d) < 1e-6 ? 0.5 : Math.max(0, Math.min(1, (0 - v0) / d));
  return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
}

export function MapChrome() {
  const mapZoom = useJetStore((s) => s.mapZoom);
  const mapLarge = useJetStore((s) => s.mapLarge);
  const setMapZoom = useJetStore((s) => s.setMapZoom);
  const toggleMapLarge = useJetStore((s) => s.toggleMapLarge);
  const resetMap = useJetStore((s) => s.resetMap);
  return (
    <>
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button type="button" className="h-11 rounded-full border border-border bg-card px-3 text-sm text-foreground" onClick={toggleMapLarge}>
          {mapLarge ? "Lukk kart" : "Stort kart"}
        </button>
        <button type="button" className="h-11 rounded-full border border-border bg-card px-3 text-sm text-foreground" onClick={() => setMapZoom(mapZoom * 1.25)}>
          Zoom inn
        </button>
        <button type="button" className="h-11 rounded-full border border-border bg-card px-3 text-sm text-foreground" onClick={() => setMapZoom(mapZoom / 1.25)}>
          Zoom ut
        </button>
        <button type="button" className="h-11 rounded-full border border-border bg-card px-3 text-sm text-foreground" onClick={resetMap}>
          Hele verden
        </button>
      </div>
    </>
  );
}

