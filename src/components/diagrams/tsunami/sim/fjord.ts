/** Qualitative geometry, not a calibrated impact or run-up solver. Coordinates are fractions. */
export const FJORD_END = 3;
export function fjordBed(x: number) {
  // Continuous U-shaped section, including dry shoulders above the reference surface (zero).
  return (
    0.56 -
    0.92 * Math.exp(-Math.pow(x / 0.16, 2)) -
    0.85 * Math.exp(-Math.pow((1 - x) / 0.17, 2)) +
    0.025 * Math.sin(Math.PI * x) * Math.sin(5 * Math.PI * x)
  );
}
export function fjordStage(t: number) {
  return t < 0.8 ? "Vannforskyvning" : t < 1.8 ? "Bølgeutbredelse" : "Refleksjon";
}
export function fjordWave(x: number, t: number) {
  if (t <= 0) return 0;
  const u = Math.max(0, Math.min(FJORD_END, t));
  // Prescribed pulse and its return: no amplitude or travel-time inference is intended.
  const center = u < 1.8 ? 0.16 + (0.72 * u) / 1.8 : 0.88 - (u - 1.8) * 0.52;
  const z = (x - center) / 0.065;
  return 0.075 * Math.min(1, u * 4) * (1 - 2 * z * z) * Math.exp(-z * z);
}
export function slideOutline(t: number) {
  const u = Math.min(1, Math.max(0, t / 0.8));
  const cx = 0.07 + u * 0.16;
  const cy = -0.2 + u * 0.58;
  return [
    [-0.045, -0.02],
    [-0.024, -0.075],
    [0.016, -0.062],
    [0.05, -0.009],
    [0.037, 0.028],
    [0.009, 0.045],
    [-0.036, 0.025],
  ].map(([x, y]) => ({ x: cx + x, y: cy + y }));
}

/** 4-connected static fill from specified sea cells only. No isolated depression is seeded. */
export function connectedWet(
  heights: readonly number[],
  nx: number,
  ny: number,
  level: number,
  sea: readonly number[],
) {
  if (nx * ny !== heights.length || nx < 1 || ny < 1 || !Number.isFinite(level))
    throw new Error("Invalid wet grid");
  const wet = new Uint8Array(heights.length);
  const queue: number[] = [];
  for (const k of sea) {
    if (k >= 0 && k < wet.length && heights[k] <= level && !wet[k]) {
      wet[k] = 1;
      queue.push(k);
    }
  }
  for (let q = 0; q < queue.length; q++) {
    const k = queue[q],
      i = k % nx,
      j = Math.floor(k / nx);
    for (const n of [
      i > 0 ? k - 1 : -1,
      i + 1 < nx ? k + 1 : -1,
      j > 0 ? k - nx : -1,
      j + 1 < ny ? k + nx : -1,
    ]) {
      if (n >= 0 && !wet[n] && heights[n] <= level) {
        wet[n] = 1;
        queue.push(n);
      }
    }
  }
  return wet;
}

/** Dimensionless, invented terrain for M7; deliberately includes a landward hollow. */
export function townHeight(x: number) {
  return (
    -0.16 +
    0.58 / (1 + Math.exp(-(x - 0.53) * 12)) +
    0.1 * Math.exp(-Math.pow((x - 0.64) / 0.06, 2)) -
    0.12 * Math.exp(-Math.pow((x - 0.82) / 0.055, 2))
  );
}
export const TOWN_N = 241;
export function townScenario(level: number) {
  const heights = Array.from({ length: TOWN_N }, (_, i) => townHeight(i / (TOWN_N - 1)));
  return { heights, wet: connectedWet(heights, TOWN_N, 1, level, [0]) };
}
