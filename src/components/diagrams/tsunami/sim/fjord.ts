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
export const FJORD_LEFT_SHORE = (() => {
  let a = 0,
    b = 0.3;
  for (let i = 0; i < 40; i++) {
    const m = (a + b) / 2;
    if (fjordBed(m) < 0) a = m;
    else b = m;
  }
  return (a + b) / 2;
})();
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
export function fjordWaveParts(x: number, t: number) {
  if (t <= 0) return { incident: 0, reflected: 0 };
  const center = 0.16 + pulseSpeed * Math.min(FJORD_END, t);
  const pulse = (cx: number) => {
    const z = (x - cx) / 0.065;
    if (Math.abs(z) >= 2) return 0;
    return 0.075 * Math.min(1, t * 4) * (1 - 2 * z * z) * Math.exp(-z * z) * (1 - (z * z) / 4) ** 2;
  };
  return { incident: pulse(center), reflected: pulse(2 * FJORD_RIGHT_SHORE - center) };
}
export function fjordWave(x: number, t: number) {
  const p = fjordWaveParts(x, t);
  return p.incident + p.reflected;
}

/** Playback pace, not physical travel time. The elapsed-time adapter below supplies
 * 60 Hz-equivalent frames; actual refresh rate and reduced-motion callback count
 * must not set viewing speed. This pure step also supports deterministic tests. */
export const FJORD_SECONDS_PER_UNIT = 8;
export const FJORD_FRAMES_PER_UNIT = 60 * FJORD_SECONDS_PER_UNIT;
export function advanceFjordPlayback(position: number, frames: number) {
  let next = Math.min(FJORD_END, position + Math.max(0, frames) / FJORD_FRAMES_PER_UNIT);
  for (const boundary of [0.8, FJORD_CONTACT, FJORD_END])
    if (Math.abs(next - boundary) < 1e-9) next = boundary;
  return { position: next, more: next < FJORD_END };
}
/** Wall-clock adapter for the actual RAF callback. Reset timestamp on pause/offscreen.
 * Cap a stalled callback at one reduced-motion interval: never fast-forward a hidden tab.
 * These seconds describe viewing pace only, never physical wave travel time. */
export function fjordPlaybackTick(position: number, previous: number | null, now: number) {
  const elapsed = previous === null ? 0 : Math.max(0, Math.min(500, now - previous));
  return { ...advanceFjordPlayback(position, (elapsed * 60) / 1000), timestamp: now };
}
export function nextFjordStep(position: number) {
  return [0.6, 1.1, 1.8, 2.6, FJORD_END].find((v) => v > position + 0.001) ?? FJORD_END;
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

/** Symbol/label geometry only; site x and sampled exposure never change. */
export function townGlyphLayout(
  width: number,
  ph: number,
  level: number,
  sites: readonly { name: string; x: number }[],
  textWidths: Record<string, number>,
) {
  const xOf = (x: number) => 12 + x * (width - 24),
    yOf = (z: number) => ph * 0.7 - z * ph;
  const waterY = yOf(level);
  const minSeparation = Math.min(
    ...sites.flatMap((a, i) => sites.slice(i + 1).map((b) => Math.abs(xOf(a.x) - xOf(b.x)))),
  );
  const half = Math.max(1, Math.min(7, (minSeparation - 4.2) / 2));
  return sites.map((site) => {
    const x = xOf(site.x),
      y = yOf(townHeight(site.x)),
      height = (half * 18) / 7;
    let tx: number, baseline: number, align: "left" | "right" | "center";
    const tw = textWidths[site.name];
    if (site.name === "Hus") {
      tx = x - half - 7;
      baseline = y - 12;
      align = "right";
    } else if (site.name === "Nytt bygg") {
      tx = x - 11;
      baseline = Math.min(y - 43, waterY - 10);
      align = "right";
    } else {
      tx = x;
      align = "center";
      const terrainTop = Math.min(
        ...Array.from({ length: 21 }, (_, i) =>
          yOf(
            townHeight(
              Math.max(0, Math.min(1, (x - tw / 2 - 3 + (i * (tw + 6)) / 20 - 12) / (width - 24))),
            ),
          ),
        ),
      );
      baseline = Math.max(44, Math.min(y - 32, terrainTop - 10));
    }
    if (baseline + 4 > waterY - 6 && baseline - 15 < waterY + 6) {
      baseline = site.name === "Hus" ? waterY + 21 : waterY - 10;
    }
    let left = align === "right" ? tx - tw : align === "center" ? tx - tw / 2 : tx;
    left = Math.max(5, Math.min(width - tw - 5, left));
    tx = align === "right" ? left + tw : align === "center" ? left + tw / 2 : left;
    return {
      ...site,
      x,
      y,
      half,
      height,
      tx,
      baseline,
      align,
      box: { x: left - 2, y: baseline - 15, width: tw + 4, height: 19 },
      waterY,
    };
  });
}
