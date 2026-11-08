/** Bathymetry helpers. Elevations are metres, positive upward, sea level 0. */

export function shelfBed(x: number, length: number, deep: number, shallow: number) {
  // 0–55% abyssal, 55–82% slope, 82–100% shelf. x in metres.
  const t = x / length;
  const abyssEnd = 0.52;
  const slopeEnd = 0.84;
  if (t < abyssEnd) return -deep;
  if (t > slopeEnd) {
    const u = (t - slopeEnd) / (1 - slopeEnd);
    return -shallow + (-shallow * 0.15 - -shallow) * 0 + u * 0;
  }
  const u = (t - abyssEnd) / (slopeEnd - abyssEnd);
  const s = u * u * (3 - 2 * u);
  return -deep + (-shallow - -deep) * s;
}

/** Ocean → beach → flat coastal plain. Shore at sea level near `shoreAt` (0–1). */
export function coastalBed(x: number, length: number, deep: number, plainSlope: number) {
  const shore = length * 0.72;
  if (x < shore * 0.5) return -deep;
  if (x < shore * 0.78) {
    const u = (x - shore * 0.5) / (shore * 0.28);
    const s = u * u * (3 - 2 * u);
    return -deep + ( -80 - -deep) * s;
  }
  if (x < shore) {
    const u = (x - shore * 0.78) / (shore * 0.22);
    return -80 + 80 * u;
  }
  const inland = x - shore;
  return inland * plainSlope;
}

export function fjordBed(x: number, length: number, depth: number, bank: number) {
  // Left wall, flat floor, right wall. Banks rise `bank` metres above sea level.
  const left = length * 0.18;
  const right = length * 0.82;
  if (x < left) {
    const u = x / left;
    return bank + (-depth - bank) * u;
  }
  if (x > right) {
    const u = (x - right) / (length - right);
    return -depth + (bank - -depth) * u;
  }
  return -depth;
}

export function longWaveSpeed(depth: number) {
  return Math.sqrt(9.81 * Math.max(depth, 0));
}

export function greenRatio(d0: number, d: number) {
  if (d0 <= 0 || d <= 0) return 1;
  return Math.pow(d0 / d, 0.25);
}
