import { INDIA_RINGS, PACIFIC_RINGS } from "./coasts";
export type Ring = readonly (readonly [number, number])[];
export type BasinId = "india" | "tohoku";
export type GeoGrid = {
  nx: number;
  ny: number;
  lon0: number;
  lon1: number;
  lat0: number;
  lat1: number;
};
export type Ocean = GeoGrid & {
  id: BasinId;
  land: Uint8Array;
  times: Float64Array;
  source: number;
  depth: number;
  points: { name: string; k: number }[];
};
export const IDEAL_DEPTH = 4000;
export const EARTH_RADIUS_M = 6371008.8;
const rad = Math.PI / 180;
export function greatCircle(a: readonly number[], b: readonly number[]) {
  const dl = (b[0] - a[0]) * rad,
    dp = (b[1] - a[1]) * rad;
  const h =
    Math.sin(dp / 2) ** 2 + Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(dl / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(Math.min(1, Math.max(0, h))));
}
export function cellGeo(g: GeoGrid, k: number): [number, number] {
  return [
    g.lon0 + (((k % g.nx) + 0.5) / g.nx) * (g.lon1 - g.lon0),
    g.lat1 - ((Math.floor(k / g.nx) + 0.5) / g.ny) * (g.lat1 - g.lat0),
  ];
}
export function geoCell(g: GeoGrid, lon: number, lat: number) {
  const i = Math.floor(((lon - g.lon0) / (g.lon1 - g.lon0)) * g.nx),
    j = Math.floor(((g.lat1 - lat) / (g.lat1 - g.lat0)) * g.ny);
  if (i < 0 || j < 0 || i >= g.nx || j >= g.ny) return -1;
  return j * g.nx + i;
}
export function covered(rings: readonly Ring[], x: number, y: number) {
  // Rings are separate land polygons, not mutually cancelling XOR areas.
  return rings.some((ring) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i],
        [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  });
}
export function landMask(g: GeoGrid, rings: readonly Ring[]) {
  const land = new Uint8Array(g.nx * g.ny);
  for (let k = 0; k < land.length; k++) {
    const [x, y] = cellGeo(g, k);
    if (covered(rings, x, y)) land[k] = 1;
  }
  // Conservative coastal rasterization. Thin islands and peninsulas must remain barriers.
  // Split edges at every grid crossing. Mark interval midpoints and both sides of boundary ties.
  const sx = g.nx / (g.lon1 - g.lon0),
    sy = g.ny / (g.lat1 - g.lat0);
  for (const ring of rings)
    for (let n = 0; n < ring.length; n++) {
      const a = ring[n],
        b = ring[(n + 1) % ring.length];
      if (
        Math.max(a[0], b[0]) < g.lon0 ||
        Math.min(a[0], b[0]) > g.lon1 ||
        Math.max(a[1], b[1]) < g.lat0 ||
        Math.min(a[1], b[1]) > g.lat1
      )
        continue;
      const ax = (a[0] - g.lon0) * sx,
        ay = (g.lat1 - a[1]) * sy;
      const bx = (b[0] - g.lon0) * sx,
        by = (g.lat1 - b[1]) * sy;
      const cuts = [0, 1];
      const crossings = (v0: number, v1: number, max: number) => {
        if (v0 === v1) return;
        for (
          let v = Math.max(0, Math.ceil(Math.min(v0, v1)));
          v <= Math.min(max, Math.floor(Math.max(v0, v1)));
          v++
        ) {
          const t = (v - v0) / (v1 - v0);
          if (t > 0 && t < 1) cuts.push(t);
        }
      };
      crossings(ax, bx, g.nx);
      crossings(ay, by, g.ny);
      cuts.sort((a, b) => a - b);
      const mark = (f: number) => {
        const x = ax + (bx - ax) * f,
          y = ay + (by - ay) * f;
        for (const dx of [-1e-8, 1e-8])
          for (const dy of [-1e-8, 1e-8]) {
            const i = Math.floor(x + dx),
              j = Math.floor(y + dy);
            if (i >= 0 && i < g.nx && j >= 0 && j < g.ny) land[j * g.nx + i] = 1;
          }
      };
      for (let i = 0; i < cuts.length; i++) {
        mark(cuts[i]);
        if (i > 0) mark((cuts[i - 1] + cuts[i]) / 2);
      }
    }
  return land;
}
/** No diagonal corner cutting and no wrap across the cropped map edge. */
export function waterNeighbours(k: number, nx: number, ny: number, land: Uint8Array) {
  if (land[k]) return [];
  const out: number[] = [],
    i = k % nx,
    j = Math.floor(k / nx);
  for (let dj = -1; dj <= 1; dj++)
    for (let di = -1; di <= 1; di++) {
      if ((di === 0 && dj === 0) || i + di < 0 || i + di >= nx || j + dj < 0 || j + dj >= ny)
        continue;
      const n = (j + dj) * nx + i + di;
      if (land[n] || (di !== 0 && dj !== 0 && (land[j * nx + i + di] || land[(j + dj) * nx + i])))
        continue;
      out.push(n);
    }
  return out;
}
/** Dijkstra, 8-connected ocean cells; edge length is a spherical distance in metres.
 * It approximates travel time only, not wave dynamics, heights or historical sources.
 */
export function travelTimes(
  g: GeoGrid,
  land: Uint8Array,
  sources: readonly number[],
  depth = IDEAL_DEPTH,
) {
  if (land.length !== g.nx * g.ny || !Number.isFinite(depth) || depth <= 0 || sources.length === 0)
    throw new Error("Invalid travel grid");
  const time = new Float64Array(land.length).fill(Infinity),
    speed = Math.sqrt(9.81 * depth);
  const heap: { k: number; t: number }[] = [];
  const push = (v: { k: number; t: number }) => {
    let i = heap.length;
    heap.push(v);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p].t <= v.t) break;
      heap[i] = heap[p];
      i = p;
    }
    heap[i] = v;
  };
  const pop = () => {
    const top = heap[0],
      last = heap.pop()!;
    if (heap.length) {
      let i = 0;
      while (i * 2 + 1 < heap.length) {
        let c = i * 2 + 1;
        if (c + 1 < heap.length && heap[c + 1].t < heap[c].t) c++;
        if (heap[c].t >= last.t) break;
        heap[i] = heap[c];
        i = c;
      }
      heap[i] = last;
    }
    return top;
  };
  for (const k of sources) {
    if (k < 0 || k >= land.length || land[k]) throw new Error("Source must be an ocean cell");
    time[k] = 0;
    push({ k, t: 0 });
  }
  const coords = Array.from({ length: land.length }, (_, k) => cellGeo(g, k));
  while (heap.length) {
    const v = pop();
    if (v.t !== time[v.k]) continue;
    for (const n of waterNeighbours(v.k, g.nx, g.ny, land)) {
      const next = v.t + greatCircle(coords[v.k], coords[n]) / speed;
      if (next < time[n]) {
        time[n] = next;
        push({ k: n, t: next });
      }
    }
  }
  return time;
}
const cache = new Map<BasinId, Ocean>();
export function makeOcean(id: BasinId): Ocean {
  const hit = cache.get(id);
  if (hit) return hit;
  const g: GeoGrid =
    id === "india"
      ? { nx: 180, ny: 150, lon0: 68, lon1: 104, lat0: -8, lat1: 22 }
      : { nx: 224, ny: 100, lon0: 130, lon1: 242, lat0: 16, lat1: 56 };
  const rings = id === "india" ? INDIA_RINGS : PACIFIC_RINGS;
  const land = landMask(g, rings);
  // Single idealized offshore cell, explicitly NOT a historical rupture reconstruction.
  const sourceCoords = id === "india" ? [93, 4] : [144, 38];
  const source = geoCell(g, sourceCoords[0], sourceCoords[1]);
  const times = travelTimes(g, land, [source]);
  const pts =
    id === "india"
      ? [
          [85, 5],
          [90, 15],
        ]
      : [
          [180, 35],
          [220, 30],
        ];
  const o: Ocean = {
    ...g,
    id,
    land,
    times,
    source,
    depth: IDEAL_DEPTH,
    points: pts.map(([lon, lat], i) => ({ name: i === 0 ? "A" : "B", k: geoCell(g, lon, lat) })),
  };
  cache.set(id, o);
  return o;
}
