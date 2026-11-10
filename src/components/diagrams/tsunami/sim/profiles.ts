/**
 * Stiliserte, men sammenhengende terrengprofiler. Høyder i meter, positiv oppover, havnivå 0.
 * Profilene er glatte (ingen knekk) og er laget for undervisning, ikke hentet fra et bestemt sted.
 */

const smooth = (u: number) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Liten, fast uregelmessighet så bunnen ikke ser linjalrett ut. */
export function roughness(x: number, scale: number, amp: number) {
  const s = x / scale;
  return amp * (0.55 * Math.sin(s * 1.7 + 0.4) + 0.3 * Math.sin(s * 4.3 + 1.9) + 0.15 * Math.sin(s * 9.1 + 0.7));
}

/**
 * Subduksjonssone sett fra havet mot land: dyphavsslette, svak ytre bue, grøft,
 * kontinentalskråning, sokkel, strand og et kystland som stiger innover.
 * `x` og `length` i meter. `trenchAt` og `coastAt` er andeler av lengden.
 */
export function subductionElevation(x: number, length: number, trenchAt = 0.3, coastAt = 0.8) {
  const t = x / length;
  const xt = trenchAt;
  const xc = coastAt;
  const shelfBreak = xc - 0.07;
  let z: number;
  if (t < xt - 0.12) {
    // dyphavsslette med svak ytre bue mot grøfta
    const bulge = Math.exp(-Math.pow((t - (xt - 0.16)) / 0.06, 2));
    z = -5200 + 300 * bulge;
  } else if (t < xt) {
    // seaward side of the trench
    const u = (t - (xt - 0.12)) / 0.12;
    z = lerp(-5200 + 300 * Math.exp(-Math.pow(0.04 / 0.06, 2)), -7200, smooth(u));
  } else if (t < shelfBreak) {
    // forearc slope from trench to shelf break, concave upward
    const u = (t - xt) / (shelfBreak - xt);
    z = lerp(-7200, -160, 1 - Math.pow(1 - u, 2.2));
  } else if (t < xc) {
    const u = (t - shelfBreak) / (xc - shelfBreak);
    z = lerp(-160, 0, smooth(u));
  } else {
    const u = (t - xc) / (1 - xc);
    z = lerp(0, 650, Math.pow(u, 0.8)) + 60 * Math.sin(u * 7);
    z = Math.max(z, 2 + 40 * u);
  }
  if (t < xc - 0.01) z += roughness(x, 9000, Math.min(120, Math.abs(z) * 0.03));
  return z;
}

/**
 * Dyphav → kontinentalskråning → sokkel → kyst. `deep` er dypet ute i meter.
 * Sokkelen ligger på 60–120 m og grunnes mot kysten.
 */
export function shelfElevation(x: number, length: number, deep: number) {
  const t = x / length;
  const slopeStart = 0.42;
  const slopeEnd = 0.66;
  const shoreface = 0.94;
  const coast = 0.975;
  if (t < slopeStart) return -deep + roughness(x, 14000, deep * 0.012);
  if (t < slopeEnd) {
    const u = (t - slopeStart) / (slopeEnd - slopeStart);
    const s = 1 - Math.pow(1 - smooth(u), 1.6);
    return lerp(-deep, -130, s) + roughness(x, 9000, 40 * (1 - u));
  }
  if (t < shoreface) {
    const u = (t - slopeEnd) / (shoreface - slopeEnd);
    return lerp(-130, -50, u) + roughness(x, 6000, 5);
  }
  if (t < coast) {
    const u = (t - shoreface) / (coast - shoreface);
    return lerp(-50, 0, smooth(u)) + roughness(x, 6000, 5) * (1 - u);
  }
  const u = (t - coast) / (1 - coast);
  return lerp(0, 45, smooth(Math.min(1, u * 1.3)));
}

/**
 * Strandprofil for M3: grunt hav, krum strandflate, strand, en lav voll og en
 * kystslette som stiger mot en ås. `slope` er strandflatens helning (for eksempel 1/60).
 */
export function beachElevation(x: number, shoreX: number, offshoreDepth: number, slope: number) {
  const dx = x - shoreX;
  if (dx < 0) {
    // konkav strandflate: bratt nær land, flatere ute (likevektsprofil h ∝ x^(2/3))
    const reach = offshoreDepth / slope;
    const u = Math.min(1, -dx / reach);
    return -offshoreDepth * Math.pow(u, 2 / 3);
  }
  const berm = 1.2 * Math.exp(-Math.pow((dx - 45) / 22, 2));
  const plain = dx * slope * 0.5;
  const hill = 14 * smooth((dx - 900) / 900);
  return plain + berm + hill + roughness(x, 140, 0.25) * Math.min(1, dx / 80);
}

export function longWaveSpeed(depth: number) {
  return Math.sqrt(9.81 * Math.max(depth, 0));
}
