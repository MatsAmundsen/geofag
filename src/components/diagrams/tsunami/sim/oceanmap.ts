import { INDIA_RINGS, PACIFIC_RINGS } from "./coasts";

export type Ring = readonly (readonly [number, number])[];

export type Gauge = {
  name: string;
  lon: number;
  lat: number;
  i: number;
  j: number;
  /** Seconds until |η| passes 5 cm. −1 if it has not. 0 if the cell starts in the source. */
  first: number;
  /** +1 crest first, −1 trough first, 0 unknown. */
  sign: number;
  max: number;
  inSource: boolean;
};

export type Ocean = {
  id: "india" | "tohoku";
  nx: number;
  ny: number;
  lon0: number;
  lon1: number;
  lat0: number;
  lat1: number;
  H: Float32Array;
  eta: Float32Array;
  u: Float32Array;
  v: Float32Array;
  land: Uint8Array;
  t: number;
  gauges: Gauge[];
};

const maskCache = new Map<string, Uint8Array>();

function covered(rings: readonly Ring[], x: number, y: number) {
  let w = false;
  for (let r = 0; r < rings.length; r++) {
    const ring = rings[r];
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0];
      const yi = ring[i][1];
      const xj = ring[j][0];
      const yj = ring[j][1];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-12) + xi) w = !w;
    }
  }
  return w;
}

function landMask(
  key: string,
  rings: readonly Ring[],
  lon0: number,
  lon1: number,
  lat0: number,
  lat1: number,
  nx: number,
  ny: number,
) {
  const hit = maskCache.get(key);
  if (hit) return hit;
  const land = new Uint8Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    const lat = lat1 - ((j + 0.5) / ny) * (lat1 - lat0);
    for (let i = 0; i < nx; i++) {
      const lon = lon0 + ((i + 0.5) / nx) * (lon1 - lon0);
      if (covered(rings, lon, lat)) land[j * nx + i] = 1;
    }
  }
  maskCache.set(key, land);
  return land;
}

function chamfer(land: Uint8Array, nx: number, ny: number) {
  const dist = new Float32Array(nx * ny);
  const INF = 1e6;
  for (let k = 0; k < land.length; k++) dist[k] = land[k] ? 0 : INF;
  const relax = (k: number, nk: number, w: number) => {
    if (nk < 0 || nk >= dist.length) return;
    if (dist[k] > dist[nk] + w) dist[k] = dist[nk] + w;
  };
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const k = j * nx + i;
      if (i > 0) relax(k, k - 1, 1);
      if (j > 0) relax(k, k - nx, 1);
      if (i > 0 && j > 0) relax(k, k - nx - 1, 1.41);
    }
  }
  for (let j = ny - 1; j >= 0; j--) {
    for (let i = nx - 1; i >= 0; i--) {
      const k = j * nx + i;
      if (i + 1 < nx) relax(k, k + 1, 1);
      if (j + 1 < ny) relax(k, k + nx, 1);
      if (i + 1 < nx && j + 1 < ny) relax(k, k + nx + 1, 1.41);
    }
  }
  return dist;
}

function kmToPolyline(lon: number, lat: number, line: readonly (readonly [number, number])[]) {
  const cos = Math.cos((lat * Math.PI) / 180);
  let best = 1e9;
  for (let s = 0; s < line.length - 1; s++) {
    const ax = line[s][0];
    const ay = line[s][1];
    const bx = line[s + 1][0];
    const by = line[s + 1][1];
    const vx = bx - ax;
    const vy = by - ay;
    const len2 = vx * vx + vy * vy || 1e-9;
    let t = ((lon - ax) * vx + (lat - ay) * vy) / len2;
    t = Math.max(0, Math.min(1, t));
    const px = ax + t * vx;
    const py = ay + t * vy;
    const km = Math.hypot((lon - px) * 111.32 * cos, (lat - py) * 111.32);
    if (km < best) best = km;
  }
  return best;
}

const SUNDA = [
  [95.2, -5.5],
  [94.4, -1.0],
  [93.6, 3.0],
  [92.6, 7.5],
  [91.8, 12.0],
  [91.2, 15.5],
] as const;

const JAPAN_TRENCH = [
  [141.6, 35.2],
  [142.6, 37.0],
  [143.8, 39.0],
  [145.0, 41.0],
  [146.2, 43.0],
] as const;

/** Uplift on the ocean side of the segment, subsidence on the land side. */
function lobe(
  lon: number,
  lat: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  oceanSign: number,
) {
  const vx = bx - ax;
  const vy = by - ay;
  const len2 = vx * vx + vy * vy;
  let t = ((lon - ax) * vx + (lat - ay) * vy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * vx;
  const cy = ay + t * vy;
  const cross = vx * (lat - cy) - vy * (lon - cx);
  const side = Math.sign(cross) || 1;
  const km = Math.hypot((lon - cx) * 111.32 * Math.cos((lat * Math.PI) / 180), (lat - cy) * 111.32);
  const along = t > 0.03 && t < 0.97 ? 1 : Math.exp(-Math.pow((t < 0.5 ? t : 1 - t) * 7, 2));
  const ocean = side === oceanSign;
  const amp = ocean
    ? 2.4 * Math.exp(-Math.pow((km - 70) / 55, 2))
    : -1.1 * Math.exp(-Math.pow((km - 45) / 40, 2));
  return amp * along;
}

function stamp(
  land: Uint8Array,
  nx: number,
  ny: number,
  lon0: number,
  lon1: number,
  lat0: number,
  lat1: number,
  lon: number,
  lat: number,
) {
  const i0 = Math.round(((lon - lon0) / (lon1 - lon0)) * nx);
  const j0 = Math.round(((lat1 - lat) / (lat1 - lat0)) * ny);
  for (let dj = -1; dj <= 1; dj++) {
    for (let di = -1; di <= 1; di++) {
      if (di * di + dj * dj > 2) continue;
      const ii = i0 + di;
      const jj = j0 + dj;
      if (ii < 0 || jj < 0 || ii >= nx || jj >= ny) continue;
      land[jj * nx + ii] = 1;
    }
  }
}

function build(
  id: Ocean["id"],
  lon0: number,
  lon1: number,
  lat0: number,
  lat1: number,
  nx: number,
  ny: number,
  rings: readonly Ring[],
  cities: { name: string; lon: number; lat: number }[],
  source: (lon: number, lat: number) => number,
  trench: readonly (readonly [number, number])[],
): Ocean {
  const land = landMask(id, rings, lon0, lon1, lat0, lat1, nx, ny).slice();
  if (id === "india") stamp(land, nx, ny, lon0, lon1, lat0, lat1, 73.5, 4.17);
  const dist = chamfer(land, nx, ny);
  const kmPerCell =
    ((111.32 * (lat1 - lat0)) / ny +
      (111.32 * Math.cos((((lat0 + lat1) / 2) * Math.PI) / 180) * (lon1 - lon0)) / nx) /
    2;
  const H = new Float32Array(nx * ny);
  const eta = new Float32Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    const lat = lat1 - ((j + 0.5) / ny) * (lat1 - lat0);
    for (let i = 0; i < nx; i++) {
      const lon = lon0 + ((i + 0.5) / nx) * (lon1 - lon0);
      const k = j * nx + i;
      if (land[k]) continue;
      const km = dist[k] * kmPerCell;
      let d = km < 70 ? 25 + (km / 70) * 350 : km < 200 ? 375 + ((km - 70) / 130) * 3400 : 4300;
      const trenchKm = kmToPolyline(lon, lat, trench);
      if (trenchKm < 55 && km > 80) d = Math.max(d, 6500);
      else if (trenchKm < 110 && km > 120) d = Math.max(d, 5400);
      H[k] = d;
      eta[k] = source(lon, lat);
    }
  }
  const gauges: Gauge[] = cities.map((c) => {
    const i = Math.max(1, Math.min(nx - 2, Math.round(((c.lon - lon0) / (lon1 - lon0)) * nx)));
    const j = Math.max(1, Math.min(ny - 2, Math.round(((lat1 - c.lat) / (lat1 - lat0)) * ny)));
    let best = 1e9;
    let bi = i;
    let bj = j;
    for (let dj = -12; dj <= 12; dj++) {
      for (let di = -12; di <= 12; di++) {
        const ii = i + di;
        const jj = j + dj;
        if (ii < 1 || jj < 1 || ii >= nx - 1 || jj >= ny - 1) continue;
        const id = jj * nx + ii;
        if (land[id] || H[id] < 20) continue;
        const score = di * di + dj * dj + H[id] / 400;
        if (score < best) {
          best = score;
          bi = ii;
          bj = jj;
        }
      }
    }
    const e0 = eta[bj * nx + bi];
    const inSource = Math.abs(e0) > 0.08;
    return {
      ...c,
      i: bi,
      j: bj,
      first: inSource ? 0 : -1,
      sign: inSource ? Math.sign(e0) : 0,
      max: Math.abs(e0),
      inSource,
    };
  });
  return {
    id,
    nx,
    ny,
    lon0,
    lon1,
    lat0,
    lat1,
    H,
    eta,
    u: new Float32Array(nx * ny),
    v: new Float32Array(nx * ny),
    land,
    t: 0,
    gauges,
  };
}

export function makeOcean(id: Ocean["id"]): Ocean {
  if (id === "india") {
    return build(
      "india",
      68,
      104,
      -8,
      22,
      168,
      140,
      INDIA_RINGS,
      [
        { name: "Banda Aceh", lon: 95.3, lat: 5.55 },
        { name: "Phuket", lon: 98.28, lat: 7.95 },
        { name: "Colombo", lon: 79.85, lat: 6.93 },
        { name: "Chennai", lon: 80.3, lat: 13.08 },
        { name: "Malé", lon: 73.5, lat: 4.17 },
      ],
      (lon, lat) => lobe(lon, lat, 94.0, 2.2, 92.2, 13.2, 1),
      SUNDA,
    );
  }
  return build(
    "tohoku",
    130,
    242,
    16,
    56,
    186,
    84,
    PACIFIC_RINGS,
    [
      { name: "Sanriku", lon: 141.65, lat: 39.5 },
      { name: "Utenfor Tokyo", lon: 139.75, lat: 35.4 },
      { name: "Honolulu", lon: 202.2, lat: 21.35 },
      { name: "California", lon: 235.7, lat: 41.5 },
    ],
    (lon, lat) => lobe(lon, lat, 143.3, 36.8, 145.2, 40.6, -1),
    JAPAN_TRENCH,
  );
}

/** Advance about `sub` stable steps. Returns nothing; reads `o.t`. */
export function stepOcean(o: Ocean, sub: number) {
  const { nx, ny, H, eta, u, v, land } = o;
  const latMid = (o.lat0 + o.lat1) / 2;
  const dx = ((o.lon1 - o.lon0) / nx) * 111_320 * Math.cos((latMid * Math.PI) / 180);
  const dy = ((o.lat1 - o.lat0) / ny) * 111_320;
  let cmax = 20;
  for (let k = 0; k < H.length; k++) if (H[k] > 8) cmax = Math.max(cmax, Math.sqrt(9.81 * H[k]));
  const dt = Math.min(120, (0.42 * Math.min(dx, dy)) / cmax);
  const g = 9.81;
  for (let s = 0; s < sub; s++) {
    for (let j = 0; j < ny; j++) {
      for (let i = 1; i < nx; i++) {
        const id = j * nx + i;
        if (land[id] || land[id - 1] || H[id] < 8 || H[id - 1] < 8) {
          u[id] = 0;
          continue;
        }
        u[id] += ((-g * dt) / dx) * (eta[id] - eta[id - 1]);
      }
    }
    for (let j = 1; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const id = j * nx + i;
        const ib = id - nx;
        if (land[id] || land[ib] || H[id] < 8 || H[ib] < 8) {
          v[id] = 0;
          continue;
        }
        v[id] += ((-g * dt) / dy) * (eta[id] - eta[ib]);
      }
    }
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const id = j * nx + i;
        if (land[id] || H[id] < 8) {
          eta[id] = 0;
          continue;
        }
        const uR = i === nx - 1 || land[id + 1] ? 0 : u[id + 1];
        const uL = u[id];
        const vU = j === ny - 1 || land[id + nx] ? 0 : v[id + nx];
        const vD = j === 0 || land[id - nx] ? 0 : v[id];
        const hR = i === nx - 1 || land[id + 1] ? 0 : 0.5 * (H[id] + H[id + 1]);
        const hL = i === 0 || land[id - 1] ? 0 : 0.5 * (H[id] + H[id - 1]);
        const hU = j === ny - 1 || land[id + nx] ? 0 : 0.5 * (H[id] + H[id + nx]);
        const hD = j === 0 || land[id - nx] ? 0 : 0.5 * (H[id] + H[id - nx]);
        eta[id] += -dt * ((hR * uR - hL * uL) / dx + (hU * vU - hD * vD) / dy);
        const edge = Math.min(i, j, nx - 1 - i, ny - 1 - j);
        if (edge < 6) {
          const damp = 0.86 + edge * 0.022;
          eta[id] *= damp;
          u[id] *= damp;
          if (i + 1 < nx) u[id + 1] *= damp;
          v[id] *= damp;
        }
      }
    }
    o.t += dt;
    for (const g0 of o.gauges) {
      if (g0.inSource) {
        g0.max = Math.max(g0.max, Math.abs(eta[g0.j * nx + g0.i]));
        continue;
      }
      const e = eta[g0.j * nx + g0.i];
      const a = Math.abs(e);
      if (a > g0.max) g0.max = a;
      if (g0.first < 0 && a > 0.05) {
        g0.first = o.t;
        g0.sign = Math.sign(e) || 1;
      }
    }
  }
}
