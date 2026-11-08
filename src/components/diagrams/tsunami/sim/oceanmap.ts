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

/** Display geometry only. All source data and numerical gangtider remain unchanged. */
export type IsoPoint = { x: number; y: number };
export type IsoPath = IsoPoint[];

/** A segment is drawable only if every touched computation cell is ocean.
 * Exact grid crossings, including both cells on an edge/corner: no smoothing shortcuts over land.
 */
export function oceanSegment(
  g: Pick<GeoGrid, "nx" | "ny">,
  land: Uint8Array,
  a: IsoPoint,
  b: IsoPoint,
) {
  const ax = a.x * g.nx,
    ay = a.y * g.ny,
    bx = b.x * g.nx,
    by = b.y * g.ny,
    cuts = [0, 1];
  for (const [v0, v1, max] of [
    [ax, bx, g.nx],
    [ay, by, g.ny],
  ]) {
    if (v0 === v1) continue;
    for (
      let v = Math.max(0, Math.ceil(Math.min(v0, v1)));
      v <= Math.min(max, Math.floor(Math.max(v0, v1)));
      v++
    ) {
      const t = (v - v0) / (v1 - v0);
      if (t > 0 && t < 1) cuts.push(t);
    }
  }
  cuts.sort((x, y) => x - y);
  const safe = (f: number) => {
    const x = ax + (bx - ax) * f,
      y = ay + (by - ay) * f;
    for (const dx of [-1e-8, 1e-8])
      for (const dy of [-1e-8, 1e-8]) {
        const i = Math.floor(x + dx),
          j = Math.floor(y + dy);
        if (i < 0 || j < 0 || i >= g.nx || j >= g.ny || land[j * g.nx + i]) return false;
      }
    return true;
  };
  return cuts.every((t, i) => safe(t) && (i === 0 || safe((cuts[i - 1] + t) / 2)));
}

/** Marching squares, unambiguous centre-value decision in saddle cells. */
export function marchingContours(
  o: Pick<Ocean, "nx" | "ny" | "times" | "land">,
  level: number,
): IsoPath[] {
  const segments: [IsoPoint, IsoPoint][] = [];
  for (let j = 0; j < o.ny - 1; j++)
    for (let i = 0; i < o.nx - 1; i++) {
      const k = j * o.nx + i,
        corners = [k, k + 1, k + o.nx + 1, k + o.nx];
      if (corners.some((n) => o.land[n] || !Number.isFinite(o.times[n]))) continue;
      const points = [
        { x: (i + 0.5) / o.nx, y: (j + 0.5) / o.ny },
        { x: (i + 1.5) / o.nx, y: (j + 0.5) / o.ny },
        { x: (i + 1.5) / o.nx, y: (j + 1.5) / o.ny },
        { x: (i + 0.5) / o.nx, y: (j + 1.5) / o.ny },
      ];
      const hits: { point: IsoPoint; edge: number }[] = [];
      for (let e = 0; e < 4; e++) {
        const n = (e + 1) % 4,
          ta = o.times[corners[e]],
          tb = o.times[corners[n]];
        if (ta < level === tb < level) continue;
        const f = (level - ta) / (tb - ta);
        hits.push({
          edge: e,
          point: {
            x: points[e].x + (points[n].x - points[e].x) * f,
            y: points[e].y + (points[n].y - points[e].y) * f,
          },
        });
      }
      if (hits.length === 2) segments.push([hits[0].point, hits[1].point]);
      else if (hits.length === 4) {
        const centre = corners.reduce((s, n) => s + o.times[n], 0) / 4;
        const pair =
          centre < level === o.times[corners[0]] < level
            ? [
                [0, 1],
                [2, 3],
              ]
            : [
                [0, 3],
                [1, 2],
              ];
        for (const [a, b] of pair) segments.push([hits[a].point, hits[b].point]);
      }
    }
  const key = (p: IsoPoint) => `${Math.round(p.x * 1e9)},${Math.round(p.y * 1e9)}`;
  const adjacency = new Map<string, number[]>();
  segments.forEach((s, i) =>
    s.forEach((p) => {
      const k = key(p);
      adjacency.set(k, [...(adjacency.get(k) ?? []), i]);
    }),
  );
  const used = new Set<number>(),
    paths: IsoPath[] = [];
  const walk = (first: number, start: IsoPoint) => {
    const path = [start];
    let edge = first,
      current = start;
    while (!used.has(edge)) {
      used.add(edge);
      const s = segments[edge],
        other = key(s[0]) === key(current) ? s[1] : s[0];
      path.push(other);
      current = other;
      const next = (adjacency.get(key(current)) ?? []).find((n) => !used.has(n));
      if (next === undefined) break;
      edge = next;
    }
    if (path.length >= 2) paths.push(path);
  };
  segments.forEach((s, i) => {
    for (const p of s) if ((adjacency.get(key(p))?.length ?? 0) === 1 && !used.has(i)) walk(i, p);
  });
  segments.forEach((s, i) => {
    if (!used.has(i)) walk(i, s[0]);
  });
  return paths;
}

/** Resample before two Chaikin passes, then split at any forbidden land crossing.
 * At most a few percent of map width are rounded; this is NOT a finer travel-time solution.
 */
export function smoothOceanContours(
  o: Pick<Ocean, "nx" | "ny" | "land">,
  paths: IsoPath[],
): IsoPath[] {
  const out: IsoPath[] = [];
  for (const path of paths) {
    if (path.length < 3) {
      out.push(path);
      continue;
    }
    const closed =
      Math.hypot(path[0].x - path[path.length - 1].x, path[0].y - path[path.length - 1].y) < 1e-7;
    const samples: IsoPath = [path[0]];
    let carry = 0;
    for (let i = 1; i < path.length; i++) {
      let a = path[i - 1];
      const b = path[i];
      let length = Math.hypot(b.x - a.x, b.y - a.y);
      while (carry + length >= 0.035) {
        const f = (0.035 - carry) / length;
        a = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
        samples.push(a);
        length = Math.hypot(b.x - a.x, b.y - a.y);
        carry = 0;
      }
      carry += length;
    }
    samples.push(path[path.length - 1]);
    let pts = samples;
    for (let pass = 0; pass < 3; pass++) {
      const next: IsoPath = closed ? [] : [pts[0]];
      const n = pts.length - 1;
      for (let i = 0; i < n; i++) {
        const a = pts[i],
          b = pts[i + 1];
        next.push(
          { x: a.x * 0.75 + b.x * 0.25, y: a.y * 0.75 + b.y * 0.25 },
          { x: a.x * 0.25 + b.x * 0.75, y: a.y * 0.25 + b.y * 0.75 },
        );
      }
      next.push(closed ? next[0] : pts[pts.length - 1]);
      pts = next;
    }
    let part: IsoPath = [];
    for (let i = 1; i < pts.length; i++) {
      if (oceanSegment(o, o.land, pts[i - 1], pts[i])) {
        if (part.length === 0) part.push(pts[i - 1]);
        part.push(pts[i]);
      } else {
        if (part.length > 1) out.push(part);
        part = [];
      }
    }
    if (part.length > 1) out.push(part);
  }
  return out;
}

export type LabelBox = { x: number; y: number; width: number; height: number };
export function boxesOverlap(a: LabelBox, b: LabelBox, gap = 5) {
  return (
    a.x < b.x + b.width + gap &&
    a.x + a.width + gap > b.x &&
    a.y < b.y + b.height + gap &&
    a.y + a.height + gap > b.y
  );
}
/** Canvas-independent collision placement, checked again on each actual canvas size. */
export function contourLabels(
  contours: { level: number; paths: IsoPath[] }[],
  width: number,
  height: number,
  obstacles: LabelBox[],
  isWater: (p: IsoPoint) => boolean,
) {
  const placed: { level: number; point: IsoPoint; box: LabelBox; anchor?: IsoPoint }[] = [];
  // Outer, shorter lines get first choice so the 12-hour line cannot lose its label.
  for (const contour of contours.slice().reverse()) {
    const tw = contour.level >= 36000 ? 34 : 28;
    let best: { point: IsoPoint; box: LabelBox; score: number } | undefined;
    for (const path of contour.paths)
      for (let i = 1; i < path.length - 1; i += 2) {
        const p = path[i],
          box = { x: p.x * width - tw / 2, y: p.y * height - 9, width: tw, height: 18 };
        if (box.x < 4 || box.y < 4 || box.x + tw > width - 4 || box.y + 18 > height - 4) continue;
        if ([...obstacles, ...placed.map((p) => p.box)].some((b) => boxesOverlap(box, b, 6)))
          continue;
        if (
          ![
            { x: box.x / width, y: box.y / height },
            { x: (box.x + tw) / width, y: box.y / height },
            { x: box.x / width, y: (box.y + 18) / height },
            { x: (box.x + tw) / width, y: (box.y + 18) / height },
            p,
          ].every(isWater)
        )
          continue;
        const clearance = Math.min(box.x, width - box.x - tw, box.y, height - box.y - 18);
        const distance = Math.min(
          ...obstacles.map((b) =>
            Math.hypot(p.x * width - b.x - b.width / 2, p.y * height - b.y - b.height / 2),
          ),
          1000,
        );
        const score = Math.min(30, clearance) + Math.min(50, distance) * 0.25;
        if (!best || score > best.score) best = { point: p, box, score };
      }
    if (best) placed.push({ level: contour.level, point: best.point, box: best.box });
  }
  // If a narrow Pacific map has no room on the line, use a labelled callout just below
  // the map, attached to that same contour. Every essential time keeps a direct association.
  for (const contour of contours) {
    if (placed.some((p) => p.level === contour.level)) continue;
    const tw = contour.level >= 36000 ? 34 : 28;
    const candidates = contour.paths
      .flat()
      .slice()
      .sort((a, b) => b.y - a.y);
    for (const anchor of candidates) {
      const x = Math.max(tw / 2 + 4, Math.min(width - tw / 2 - 4, anchor.x * width));
      const box = { x: x - tw / 2, y: height + 9, width: tw, height: 18 };
      if (placed.some((p) => boxesOverlap(box, p.box, 6))) continue;
      placed.push({
        level: contour.level,
        point: { x: x / width, y: (height + 18) / height },
        box,
        anchor,
      });
      break;
    }
  }
  return placed;
}

export function formatLongitude(lon: number) {
  const signed = ((((lon + 180) % 360) + 360) % 360) - 180;
  return `${Math.abs(signed).toFixed(1).replace(".", ",")}° ${signed < 0 ? "V" : "Ø"}`;
}
