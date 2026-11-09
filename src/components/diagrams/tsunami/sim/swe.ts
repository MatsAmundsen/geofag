/** 1D nonlinear shallow-water solver, wet-dry and well-balanced. */

export const G = 9.81;
const DRY = 1e-3;

export type Column = {
  h: Float64Array;
  hu: Float64Array;
  b: Float64Array;
  /** Scratch, allocated once. */
  u: Float64Array;
  Fh: Float64Array;
  Fhu: Float64Array;
  hL: Float64Array;
  hR: Float64Array;
  hNew: Float64Array;
  huNew: Float64Array;
};

export function column(n: number): Column {
  return {
    h: new Float64Array(n),
    hu: new Float64Array(n),
    b: new Float64Array(n),
    u: new Float64Array(n),
    Fh: new Float64Array(n + 1),
    Fhu: new Float64Array(n + 1),
    hL: new Float64Array(n + 1),
    hR: new Float64Array(n + 1),
    hNew: new Float64Array(n),
    huNew: new Float64Array(n),
  };
}

/** Still water at elevation `eta` (m). Dry where the bed is above it. */
export function fillStill(c: Column, eta = 0) {
  for (let i = 0; i < c.h.length; i++) {
    const depth = eta - c.b[i];
    c.h[i] = depth > 0 ? depth : 0;
    c.hu[i] = 0;
  }
}

/** One forward step. Reflective walls. Returns the step actually taken. */
export function stepSWE(c: Column, dx: number, dt: number, nMann = 0): number {
  const { h, hu, b, u, Fh, Fhu, hL, hR, hNew, huNew } = c;
  const n = h.length;
  const g = G;
  let amax = 1e-6;
  for (let i = 0; i < n; i++) {
    u[i] = h[i] > DRY ? hu[i] / h[i] : 0;
    amax = Math.max(amax, Math.abs(u[i]) + Math.sqrt(g * h[i]));
  }
  const ddt = Math.min(dt, (0.45 * dx) / amax);

  Fh.fill(0);
  Fhu.fill(0);

  const face = (iL: number, iR: number, f: number, wall: boolean) => {
    if (wall) {
      const i = iL;
      const hl = h[i];
      hL[f] = hl;
      hR[f] = hl;
      Fh[f] = 0;
      Fhu[f] = 0.5 * g * hl * hl;
      return;
    }
    const bstar = Math.max(b[iL], b[iR]);
    const hl = Math.max(0, h[iL] + b[iL] - bstar);
    const hr = Math.max(0, h[iR] + b[iR] - bstar);
    hL[f] = hl;
    hR[f] = hr;
    if (hl < DRY && hr < DRY) return;
    const ul = h[iL] > DRY ? u[iL] : 0;
    const ur = h[iR] > DRY ? u[iR] : 0;
    const cl = Math.sqrt(g * hl);
    const cr = Math.sqrt(g * hr);
    const sL = Math.min(ul - cl, ur - cr);
    const sR = Math.max(ul + cl, ur + cr);
    const fLh = hl * ul;
    const fRh = hr * ur;
    const fLu = hl * ul * ul + 0.5 * g * hl * hl;
    const fRu = hr * ur * ur + 0.5 * g * hr * hr;
    if (sR - sL < 1e-8) {
      Fh[f] = 0.5 * (fLh + fRh);
      Fhu[f] = 0.5 * (fLu + fRu);
    } else {
      Fh[f] = (sR * fLh - sL * fRh + sL * sR * (hr - hl)) / (sR - sL);
      Fhu[f] = (sR * fLu - sL * fRu + sL * sR * (hr * ur - hl * ul)) / (sR - sL);
    }
  };

  face(0, 0, 0, true);
  for (let i = 0; i < n - 1; i++) face(i, i + 1, i + 1, false);
  face(n - 1, n - 1, n, true);

  for (let i = 0; i < n; i++) {
    const hn = h[i] - (ddt / dx) * (Fh[i + 1] - Fh[i]);
    const source = ((0.5 * g) / dx) * (hL[i + 1] * hL[i + 1] - hR[i] * hR[i]);
    const mom = hu[i] - (ddt / dx) * (Fhu[i + 1] - Fhu[i]) + ddt * source;
    if (hn < DRY) {
      hNew[i] = Math.max(0, hn);
      huNew[i] = 0;
    } else if (nMann > 0) {
      const vel = mom / hn;
      const damp = (g * nMann * nMann * Math.abs(vel)) / Math.pow(hn, 4 / 3);
      huNew[i] = (vel / (1 + ddt * damp)) * hn;
      hNew[i] = hn;
    } else {
      hNew[i] = hn;
      huNew[i] = mom;
    }
  }
  h.set(hNew);
  hu.set(huNew);
  return ddt;
}

/** Advance until `dt` model seconds have passed. */
export function advance(c: Column, dx: number, dt: number, nMann = 0) {
  let left = dt;
  let guard = 0;
  while (left > 1e-6 && guard < 8000) {
    const used = stepSWE(c, dx, left, nMann);
    if (!(used > 0)) break;
    left -= used;
    guard++;
  }
}

export function copyColumn(from: Column, to: Column) {
  to.h.set(from.h);
  to.hu.set(from.hu);
  to.b.set(from.b);
}
