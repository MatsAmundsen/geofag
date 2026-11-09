/**
 * Initial tsunami surface from a 2D megathrust.
 *
 * Buried thrust: uplift seaward of the hinge and subsidence landward,
 * with equal area (incompressible crust). Peak uplift is scaled so a
 * shallow fault sits near the Savage (1980) surface-breaking limit,
 * v ≈ b (1 − δ/π) sin δ, and a deeper fault is broader and lower.
 * Pure strike-slip (rake 0) gives no vertical displacement in this
 * infinitely-long idealisation.
 */

export type FaultParams = {
  /** Slip in metres. */
  slip: number;
  /** Dip in degrees, 0 horizontal, 90 vertical. */
  dipDeg: number;
  /** Rake in degrees. 90 thrust, 0 strike-slip, -90 normal. */
  rakeDeg: number;
  /** Downdip width in metres. */
  width: number;
  /** Depth of the upper edge in metres. */
  depth: number;
  /** Horizontal position of the upper edge, metres. */
  xTop: number;
};

export function seafloorUz(x: number, p: FaultParams): number {
  const rake = (p.rakeDeg * Math.PI) / 180;
  const dip = (p.dipDeg * Math.PI) / 180;
  const dipSlip = p.slip * Math.sin(rake);
  if (Math.abs(dipSlip) < 1e-6) return 0;
  const s = Math.sin(dip);
  const c = Math.cos(dip);
  const horiz = Math.max(p.width * c, 2000);
  const atten = p.width / (p.width + 2.5 * p.depth);
  // Savage (1980) surface-breaking peak is b (1 − δ/π) sin δ.
  // The gaussian is normalised so its crest equals that value when depth → 0.
  const savage = Math.abs(dipSlip) * (1 - dip / Math.PI) * s;
  const amp = Math.sign(dipSlip) * savage * atten;
  const xUp = p.xTop + 0.28 * horiz;
  const xSub = p.xTop + 0.28 * horiz + Math.max(0.9 * horiz, 1.6 * p.depth + 8000);
  const sigUp = 0.42 * Math.hypot(horiz, p.depth + 1000);
  const sigSub = 0.72 * Math.hypot(horiz, p.depth + 1000);
  const gaus = (xx: number, x0: number, sig: number) => Math.exp(-0.5 * ((xx - x0) / sig) ** 2);
  const iUp = sigUp * Math.sqrt(2 * Math.PI);
  const iSub = sigSub * Math.sqrt(2 * Math.PI);
  const ampSub = amp * (iUp / iSub);
  return amp * gaus(x, xUp, sigUp) - ampSub * gaus(x, xSub, sigSub);
}

export function faultStats(p: FaultParams, xs: number[]) {
  let up = 0;
  let down = 0;
  let area = 0;
  const dx = xs.length > 1 ? xs[1] - xs[0] : 1;
  for (const x of xs) {
    const z = seafloorUz(x, p);
    up = Math.max(up, z);
    down = Math.min(down, z);
    area += z * dx;
  }
  return { uplift: up, subsidence: down, netArea: area };
}
