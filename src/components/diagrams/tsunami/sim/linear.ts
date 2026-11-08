import { G } from "./swe";

/** Staggered linear shallow water: eta and still-water depth at cells, u at faces. */
export type Linear1D = {
  eta: Float64Array;
  u: Float64Array;
  d: Float64Array;
  dx: number;
};

export function makeLinear(n: number, dx: number): Linear1D {
  return {
    eta: new Float64Array(n),
    u: new Float64Array(n + 1),
    d: new Float64Array(n),
    dx,
  };
}

export function stepLinear(s: Linear1D, dtReq: number, source?: Float64Array) {
  const { eta, u, d, dx } = s;
  const n = eta.length;
  const g = G;
  let cmax = 1;
  for (let i = 0; i < n; i++) if (d[i] > cmax) cmax = Math.sqrt(g * d[i]);
  const dt = Math.min(dtReq, (0.45 * dx) / cmax);
  for (let i = 1; i < n; i++) {
    if (d[i] < 1 || d[i - 1] < 1) {
      u[i] = 0;
      continue;
    }
    u[i] += ((-g * dt) / dx) * (eta[i] - eta[i - 1]);
  }
  u[0] = 0;
  u[n] = 0;
  for (let i = 0; i < n; i++) {
    if (d[i] < 1) {
      eta[i] = 0;
      continue;
    }
    const dL = i === 0 || d[i - 1] < 1 ? 0 : Math.min(d[i], d[i - 1]);
    const dR = i === n - 1 || d[i + 1] < 1 ? 0 : Math.min(d[i], d[i + 1]);
    const src = source ? source[i] : 0;
    eta[i] += (-dt / dx) * (dR * u[i + 1] - dL * u[i]) + src;
  }
  return dt;
}

export function advanceLinear(s: Linear1D, dt: number, source?: Float64Array) {
  let left = dt;
  let guard = 0;
  while (left > 1e-4 && guard < 4000) {
    const used = stepLinear(s, left, source);
    if (!(used > 0)) break;
    left -= used;
    guard++;
  }
}
