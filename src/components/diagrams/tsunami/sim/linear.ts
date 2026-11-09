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
  // Største bølgefart i hele domenet styrer tidssteget (CFL).
  for (let i = 0; i < n; i++) cmax = Math.max(cmax, Math.sqrt(g * Math.max(0, d[i])));
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

/** Største stabile tidssteg for rutenettet (CFL 0,45). */
export function linearDtMax(s: Linear1D) {
  let cmax = 1;
  for (let i = 0; i < s.d.length; i++) cmax = Math.max(cmax, Math.sqrt(G * Math.max(0, s.d[i])));
  return (0.45 * s.dx) / cmax;
}

/**
 * Går fram `dt` sekunder med like lange delsteg. Like delsteg er viktig: fram-og-tilbake-skjemaet
 * blir ustabilt hvis et kort reststeg blandes inn mellom de vanlige stegene.
 */
export function advanceLinear(s: Linear1D, dt: number, source?: Float64Array) {
  if (!(dt > 0)) return;
  const n = Math.max(1, Math.ceil(dt / linearDtMax(s) - 1e-9));
  const sub = dt / n;
  for (let k = 0; k < n; k++) stepLinear(s, sub, source);
}
