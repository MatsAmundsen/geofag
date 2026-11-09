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

/** Display-only shore closure. Smoothly return the prescribed surface to the
 * reference shoreline, with zero slope there, rather than cutting a crest in air.
 * This is not a run-up law; reflection and source remain qualitative. */
export function fjordSurface(t: number, count = 151) {
  const shoreWidth = 0.035;
  const ease = (u: number) => {
    const q = Math.max(0, Math.min(1, u));
    return q * q * q * (10 - 15 * q + 6 * q * q);
  };
  return Array.from({ length: count }, (_, i) => {
    const x = FJORD_LEFT_SHORE + (FJORD_RIGHT_SHORE - FJORD_LEFT_SHORE) * i / (count - 1);
    const taper = ease((x - FJORD_LEFT_SHORE) / shoreWidth) * ease((FJORD_RIGHT_SHORE - x) / shoreWidth);
    return { x, y: -fjordWave(x, t) * taper };
  });
}

/** Near-label position, clear of the waterline during every source/deposit step. */
export function fjordSlideLabel(t: number, width: number, height: number, textWidth: number) {
  const sea = height * 0.42, scale = height * 0.65;
  const top = slideOutline(t).reduce((a, b) => b.y < a.y ? b : a);
  const anchor = { x: top.x * width, y: sea + top.y * scale };
  const x = Math.max(textWidth / 2 + 7, Math.min(width - textWidth / 2 - 7, anchor.x));
  let baseline = Math.max(26, anchor.y - 22);
  if (baseline + 4 > sea - 10 && baseline - 15 < sea + 10) baseline = sea - 28;
  return { x, baseline, anchor, box: { x: x - textWidth / 2, y: baseline - 15, width: textWidth, height: 19 } };
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

/** Reference surface in this invented profile, not a measured or mapped elevation. */
export const TOWN_NORMAL_SEA_LEVEL = 0;
export function townWaterLayers(level: number, heights: readonly number[] = Array.from({length: TOWN_N}, (_, i) => townHeight(i / (TOWN_N - 1)))) {
  const layer = (surface: number) => {
    const wet = connectedWet(heights, heights.length, 1, surface, [0]);
    const runs: {from: number; to: number; first: number; last: number}[] = [];
    const crossing = (a: number, b: number) =>
      (a + (surface - heights[a]) / (heights[b] - heights[a])) / (heights.length - 1);
    let first = -1;
    for (let k = 0; k <= wet.length; k++) {
      if (k < wet.length && wet[k] && first < 0) first = k;
      if (first >= 0 && (k === wet.length || !wet[k])) {
        const last = k - 1;
        runs.push({first, last,
          from: first === 0 ? 0 : crossing(first - 1, first),
          to: last === wet.length - 1 ? 1 : crossing(last, last + 1)});
        first = -1;
      }
    }
    return {surface, wet, runs};
  };
  return {heights, normal: layer(TOWN_NORMAL_SEA_LEVEL), scenario: layer(level)};
}

/** A genuine horizontal view window, not displaced symbols. All screen x values
 * (terrain, water, sites and annotations) use this same invertible mapping. */
export function townView(width: number) {
  const span = Math.min(1, Math.max(0.01, (width - 24) / 640));
  const from = Math.max(0, Math.min(1 - span, 0.57 - span / 2));
  return { from, to: from + span, span };
}
export function townScreenX(siteX: number, width: number) {
  const view = townView(width);
  return 12 + (siteX - view.from) * (width - 24) / view.span;
}
export function townSiteX(screenX: number, width: number) {
  const view = townView(width);
  return view.from + (screenX - 12) * view.span / (width - 24);
}

/** «Sjø» label inside the solid normal sea, below the normal sea line, at the deep left
 * edge of the visible profile (narrow phones start slightly further left). The 14 px text
 * (about 10 px above and 3 px below the baseline) is centred between the sea line and the
 * shallowest seabed under it, with the baseline 11.5–18 px below the line. */
export function townSeaLabel(width: number, ph: number, textWidth = 20) {
  const yOf = (z: number) => ph * 0.7 - z * ph;
  const normalY = yOf(TOWN_NORMAL_SEA_LEVEL), x = width < 340 ? 6 : 14;
  const seabed = Math.min(...Array.from({length: 11}, (_, i) =>
    yOf(townHeight(townSiteX(x + (textWidth * i) / 10, width)))));
  const centred = normalY + 0.8 + (seabed - normalY - 0.8 - 13) / 2 + 10;
  return { x, baseline: Math.max(normalY + 11.5, Math.min(normalY + 18, centred)), normalY, seabed };
}

/** Labels lie inside land below the profile, with leaders to the true building footpoints. */
export function townGlyphLayout(
  width: number,
  ph: number,
  level: number,
  sites: readonly { name: string; x: number }[],
  textWidths: Record<string, number>,
) {
  const yOf = (z: number) => ph * 0.7 - z * ph;
  const waterY = yOf(level);
  const placed: {x: number; y: number; width: number; height: number}[] = [];
  return sites.slice().sort((a, b) => a.x - b.x).map((site) => {
    const x = townScreenX(site.x, width), y = yOf(townHeight(site.x));
    const tw = textWidths[site.name], half = 7, height = 18;
    const left = Math.max(5, Math.min(width - tw - 5, x - tw / 2));
    const box = { x: left - 2, y: 0, width: tw + 4, height: 19 };
    box.y = 7 + Math.max(...Array.from({length: 31}, (_, i) =>
      yOf(townHeight(townSiteX(box.x + box.width * i / 30, width)))));
    for (const previous of placed) {
      const horizontal = box.x < previous.x + previous.width + 5 && box.x + box.width + 5 > previous.x;
      if (horizontal && box.y < previous.y + previous.height + 7 && box.y + box.height + 7 > previous.y)
        box.y = previous.y + previous.height + 7;
    }
    placed.push(box);
    return {...site, siteX: site.x, x, y, symbolX: x, symbolY: y, half, height,
      tx: left + tw / 2, baseline: box.y + 15, align: "center" as const, box, waterY};
  });
}

export function fjordStatus(position: number, playing: boolean) {
  const stage = fjordStage(position);
  if (playing) return `${stage}. Avspilling pågår.`;
  const detail = position === 0 ? "Kildetilstanden vises" : position >= FJORD_END ? "Avspillingen er ferdig" :
    position >= 2.5 ? "Reflektert del er på vei tilbake. Avspillingen er pauset" :
    position >= FJORD_CONTACT ? "Reflektert del er ved fjordsiden. Avspillingen er pauset" : "Avspillingen er pauset";
  return `${stage}. ${detail}.`;
}

export function riskStatus(scene: "lav" | "hoy", act: "ingen" | "flytt" | "stans" | "overvak", before: number, after: number) {
  const action = {ingen: "Ingen tiltak", flytt: "Skolen er flyttet", stans: "Nytt bygg er stanset", overvak: "Overvåking er valgt"}[act];
  return `${scene === "hoy" ? "Høyere nivå" : "Lavere nivå"}. ${action}. Berørte bygg før: ${before}, etter: ${after}. Bølge og kilde er uendret.`;
}

export function warningStatus(source: "skjelv" | "skred", step: number, stageTitle: string) {
  return `${source === "skred" ? "Skred" : "Jordskjelv"}. Ledd ${step + 1} av 4: ${stageTitle}.`;
}
