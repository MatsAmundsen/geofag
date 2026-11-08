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
// Start reflection at first contact of the displayed pulse with the right shoreline.
export const FJORD_CONTACT = 1.5;
export function fjordStage(t: number) {
  return t < 0.8 ? "Vannforskyvning" : t < FJORD_CONTACT ? "Bølgeutbredelse" : "Refleksjon";
}
export const FJORD_RIGHT_SHORE = (() => {
  let a = 0.8,
    b = 1;
  for (let i = 0; i < 40; i++) {
    const m = (a + b) / 2;
    if (fjordBed(m) > 0) a = m;
    else b = m;
  }
  return (a + b) / 2;
})();
export const FJORD_PULSE_HALF_SUPPORT = 0.13;
const pulseSpeed = (FJORD_RIGHT_SHORE - FJORD_PULSE_HALF_SUPPORT - 0.16) / FJORD_CONTACT;
export function fjordPulseCenter(t: number) {
  const incident = 0.16 + pulseSpeed * Math.max(0, Math.min(FJORD_END, t));
  return incident <= FJORD_RIGHT_SHORE ? incident : 2 * FJORD_RIGHT_SHORE - incident;
}
export function fjordWave(x: number, t: number) {
  if (t <= 0) return 0;
  const incident = 0.16 + pulseSpeed * Math.min(FJORD_END, t);
  const pulse = (center: number) => {
    const z = (x - center) / 0.065;
    if (Math.abs(z) >= 2) return 0;
    return 0.075 * Math.min(1, t * 4) * (1 - 2 * z * z) * Math.exp(-z * z) * (1 - (z * z) / 4) ** 2;
  };
  // Image pulse at the reflecting shoreline. Incoming and reflected parts coexist during
  // contact rather than making the entire pulse turn around prematurely. Illustrative only.
  return pulse(incident) + pulse(2 * FJORD_RIGHT_SHORE - incident);
}
export function slideOutline(t: number) {
  // Continue downslope into a spreading deposit during propagation. Geometry only, no volume claim.
  const u = Math.min(1, Math.max(0, t / 1.5));
  const cx = 0.07 + 0.27 * u;
  const spread = 1 + u * 1.1,
    flatten = 1 - u * 0.65;
  return [
    [-0.045, -0.02],
    [-0.024, -0.075],
    [0.016, -0.062],
    [0.05, -0.009],
    [0.037, 0.028],
    [0.009, 0.045],
    [-0.036, 0.025],
  ].map(([x, y]) => {
    const px = cx + x * spread;
    return { x: px, y: fjordBed(px) - 0.025 + y * flatten };
  });
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
