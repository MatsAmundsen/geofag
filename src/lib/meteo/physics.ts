/** Thermal-wind and Rossby diagnostics for a teaching model, not a forecast. */

export const EARTH_R = 6_371_000;
export const OMEGA = 7.292115e-5;
export const CONTROL_COUNT = 24;
/** Seconds of atmosphere per second of animation. Keeps phase speed vs storms honest. */
export const VISUAL_TIME = 22_000;

export type JetId = "npj" | "nstj" | "spj" | "sstj";
export type Hem = "N" | "S";

export type JetParams = {
  amp: number;
  wave: number;
  phase: number;
  latShift: number;
  speedMul: number;
  offsets: number[];
};

export type Jets = Record<JetId, JetParams>;

export const JET_ORDER: JetId[] = ["npj", "nstj", "spj", "sstj"];

const MONTHS = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
] as const;

const ANCHOR_LATS = [0, 15, 30, 40, 50, 60, 70, 80, 90];
/** Desired zonal-ocean temperature, local winter and local summer. */
const ANCHOR_WINTER = [27, 23, 16, 8, 4, 2, -8, -18, -28];
const ANCHOR_SUMMER = [27, 28, 26, 20, 16, 13, 5, 1, -1];

export function emptyOffsets(): number[] {
  return Array.from({ length: CONTROL_COUNT }, () => 0);
}

export function jetHem(id: JetId): Hem {
  return id === "npj" || id === "nstj" ? "N" : "S";
}

export function jetKind(id: JetId): "polar" | "sub" {
  return id === "npj" || id === "spj" ? "polar" : "sub";
}

export function polarId(hem: Hem): JetId {
  return hem === "N" ? "npj" : "spj";
}

export function subId(hem: Hem): JetId {
  return hem === "N" ? "nstj" : "sstj";
}

export function monthName(month: number): string {
  return MONTHS[((month % 12) + 12) % 12] ?? "januar";
}

/** +1 in January, −1 in July. */
export function winterIndex(month: number): number {
  return Math.cos((month * Math.PI) / 6);
}

export function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

export function wrapLon(lon: number): number {
  let x = (((lon + 180) % 360) + 360) % 360 - 180;
  if (x === 180) x = -180;
  return x;
}

export function climLat(id: JetId, month: number): number {
  const w = winterIndex(month);
  switch (id) {
    case "npj":
      return 55 - w * 6;
    case "nstj":
      return 29 - w * 2;
    case "spj":
      return -54 - w * 4;
    case "sstj":
      return -28 - w * 1;
  }
}

export function baseSpeed(id: JetId, month: number): number {
  const w = winterIndex(month);
  switch (id) {
    case "npj":
      return 30 + w * 18;
    case "nstj":
      return Math.max(6, 16 + w * 18);
    case "spj":
      return 38 - w * 10;
    case "sstj":
      return Math.max(22, 28 - w * 12);
  }
}

export function jetSpeed(jet: JetParams, id: JetId, month: number): number {
  return Math.max(5, baseSpeed(id, month) * jet.speedMul);
}

export function controlLon(index: number, n = CONTROL_COUNT): number {
  return -180 + (index + 0.5) * (360 / n);
}

function catmull(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

export function sampleOffset(offsets: number[], lon: number): number {
  const n = offsets.length;
  if (n === 0) return 0;
  const span = 360 / n;
  let x = (wrapLon(lon) + 180) / span - 0.5;
  x = ((x % n) + n) % n;
  const i1 = Math.floor(x) % n;
  const t = x - Math.floor(x);
  const i0 = (i1 - 1 + n) % n;
  const i2 = (i1 + 1) % n;
  const i3 = (i1 + 2) % n;
  return catmull(offsets[i0]!, offsets[i1]!, offsets[i2]!, offsets[i3]!, t);
}

export function waveOnly(jet: JetParams, id: JetId, month: number, lon: number): number {
  const clim = climLat(id, month) + jet.latShift;
  const lambda = (wrapLon(lon) * Math.PI) / 180;
  return clim + jet.amp * Math.sin(jet.wave * lambda + jet.phase);
}

export function latAt(jet: JetParams, id: JetId, month: number, lon: number): number {
  const raw = waveOnly(jet, id, month, lon) + sampleOffset(jet.offsets, lon);
  return jetHem(id) === "N" ? clamp(raw, 14, 76) : clamp(raw, -76, -14);
}

export function beta(latDeg: number): number {
  const phi = (latDeg * Math.PI) / 180;
  return (2 * OMEGA * Math.cos(phi)) / EARTH_R;
}

/** Eastward Rossby phase speed in m/s. c = U − β/k². */
export function phaseSpeed(jet: JetParams, id: JetId, month: number): number {
  const lat = clamp(Math.abs(climLat(id, month) + jet.latShift), 20, 70);
  const phi = (lat * Math.PI) / 180;
  const u = jetSpeed(jet, id, month);
  const k = jet.wave / (EARTH_R * Math.max(0.25, Math.cos(phi)));
  return u - beta(lat) / (k * k);
}

export function lonDegPerRealSec(speedMs: number, latDeg: number): number {
  const phi = (Math.abs(latDeg) * Math.PI) / 180;
  const denom = EARTH_R * Math.max(0.25, Math.cos(phi));
  return (speedMs / denom) * (180 / Math.PI);
}

export function applyOffsetDrag(offsets: number[], index: number, value: number): number[] {
  const n = offsets.length;
  const delta = clamp(value, -22, 22) - (offsets[index] ?? 0);
  const next = offsets.slice();
  for (let k = -3; k <= 3; k++) {
    const w = Math.exp(-(k * k) / 1.35);
    const idx = (index + k + n * 4) % n;
    next[idx] = clamp((offsets[idx] ?? 0) + delta * w, -22, 22);
  }
  return next;
}

export function cloneJets(jets: Jets): Jets {
  const out = {} as Jets;
  for (const id of JET_ORDER) {
    const jet = jets[id];
    out[id] = { ...jet, offsets: jet.offsets.slice() };
  }
  return out;
}

export function neutralJet(amp: number, wave: number, phase = 0.4): JetParams {
  return { amp, wave, phase, latShift: 0, speedMul: 1, offsets: emptyOffsets() };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleAnchors(latAbs: number, table: number[]): number {
  if (latAbs <= ANCHOR_LATS[0]!) return table[0]!;
  for (let i = 1; i < ANCHOR_LATS.length; i++) {
    const hi = ANCHOR_LATS[i]!;
    if (latAbs <= hi) {
      const lo = ANCHOR_LATS[i - 1]!;
      const t = (latAbs - lo) / (hi - lo);
      return lerp(table[i - 1]!, table[i]!, t);
    }
  }
  return table[table.length - 1]!;
}

/** Ocean climate plus a land boost. `cont` is 0 at sea, ~0.3 on a west coast, ~1 inland. */
export function zonalClimate(lat: number, month: number, cont: number): number {
  const localWinter = lat >= 0 ? winterIndex(month) : -winterIndex(month);
  const tSummer = (1 - localWinter) / 2;
  const ocean = lerp(
    sampleAnchors(Math.abs(lat), ANCHOR_WINTER),
    sampleAnchors(Math.abs(lat), ANCHOR_SUMMER),
    tSummer,
  );
  const winterCool = -12 * Math.max(localWinter, 0);
  const summerHeat = 6 * Math.max(-localWinter, 0);
  return ocean + cont * (winterCool + summerHeat);
}

function dipole(lat: number, jetLat: number, speed: number, hem: Hem, kind: "polar" | "sub"): number {
  const poleward = hem === "N" ? lat - jetLat : jetLat - lat;
  const amp = (kind === "polar" ? 0.11 : 0.045) * speed;
  return -Math.tanh(poleward / 6) * amp;
}

/** A place counts as under a jet inside this many degrees of latitude. */
export const OVER_DEG = 8;

/** The mild air sits a few degrees on the equatorward flank, not as a heat source in the core. */
function overheadWarmth(lat: number, jetLat: number, hem: Hem, kind: "polar" | "sub"): number {
  const equatorward = hem === "N" ? jetLat - lat : lat - jetLat;
  const along = equatorward - 5;
  const width = kind === "polar" ? 7 : 8;
  const peak = kind === "polar" ? 2.4 : 1.4;
  return peak * Math.exp(-((along / width) ** 2));
}

/** ENSO storm-track signal peaks in northern winter. IOD peaks in September–November. */
export function ensoSeasonWeight(month: number): number {
  return 0.25 + 0.75 * Math.max(winterIndex(month), 0);
}

/**
 * IOD virker fra mai til desember, sterkest i august–oktober, og dør ut i november–desember.
 * Januar–april: ingen effekt. Indeks: 0 = januar.
 */
const IOD_SEASON = [0, 0, 0, 0, 0.25, 0.5, 0.75, 1, 1, 1, 0.5, 0.15];
export function iodSeasonWeight(month: number): number {
  return IOD_SEASON[((Math.round(month) % 12) + 12) % 12] ?? 0;
}

/** Desember–februar: IOD-hendelser er vanligvis over. */
export function isDjf(month: number): boolean {
  const m = ((Math.round(month) % 12) + 12) % 12;
  return m === 11 || m === 0 || m === 1;
}

export type Ribbon = {
  id: JetId;
  lat: Float64Array;
  slope: Float64Array;
  curv: Float64Array;
  asc: Float64Array;
  speed: number;
  phaseMs: number;
};

export type EnsoPhase = "off" | "nino" | "nina";
export type IodPhase = "off" | "positive" | "negative";

/** ONI-skala (°C) og terskel for El Niño / La Niña. */
export const ONI_MIN = -2;
export const ONI_MAX = 2;
export const ONI_THRESHOLD = 0.5;
/** DMI-skala (°C) og terskel for positiv / negativ IOD. */
export const DMI_MIN = -1.5;
export const DMI_MAX = 1.5;
export const DMI_THRESHOLD = 0.4;

export type ClimateModes = {
  /** Fase utledet fra ONI med terskel ±0,5. */
  enso: EnsoPhase;
  /** Fase utledet fra DMI med terskel ±0,4. */
  iod: IodPhase;
  oni: number;
  dmi: number;
};

export function ensoPhaseOf(oni: number): EnsoPhase {
  return oni >= ONI_THRESHOLD ? "nino" : oni <= -ONI_THRESHOLD ? "nina" : "off";
}
export function iodPhaseOf(dmi: number): IodPhase {
  return dmi >= DMI_THRESHOLD ? "positive" : dmi <= -DMI_THRESHOLD ? "negative" : "off";
}
export function climateModes(oni: number, dmi: number): ClimateModes {
  return { enso: ensoPhaseOf(oni), iod: iodPhaseOf(dmi), oni, dmi };
}

/**
 * Gradvis styrke (ikke sprang): starter svakt halvveis til terskelen og er 1 ved referanseverdien
 * (ONI ±1,5 / DMI ±1,0, de kjente mønstrene). Tak 1,4.
 */
function ramp(x: number, threshold: number, reference: number): number {
  const a = Math.abs(x);
  const start = threshold / 2;
  if (a <= start) return 0;
  return Math.sign(x) * Math.min(1.4, (a - start) / (reference - start));
}
export function ensoAmp(modes: ClimateModes): number {
  return ramp(modes.oni, ONI_THRESHOLD, 1.5);
}
export function iodAmp(modes: ClimateModes): number {
  return ramp(modes.dmi, DMI_THRESHOLD, 1);
}

export const CLIMATE_OFF: ClimateModes = climateModes(0, 0);

export type Atmosphere = {
  ribbons: Record<JetId, Ribbon>;
  reference: Record<JetId, Ribbon>;
  rivers: River[];
  modes: ClimateModes;
};

export type River = {
  id: string;
  hem: Hem;
  name: string;
  points: { lon: number; lat: number }[];
  width: number;
  strength: number;
  landfall: string;
};

function buildRibbon(jet: JetParams, id: JetId, month: number, modes: ClimateModes): Ribbon {
  const lat = new Float64Array(360);
  const slope = new Float64Array(360);
  const curv = new Float64Array(360);
  const asc = new Float64Array(360);
  const hem = jetHem(id);
  for (let i = 0; i < 360; i++) {
    const lon = i - 180;
    const shifted = latAt(jet, id, month, lon) + modeJetShift(id, lon, modes, month);
    lat[i] = hem === "N" ? clamp(shifted, 14, 76) : clamp(shifted, -76, -14);
  }
  const pole = (i: number) => {
    const y = lat[(i + 360) % 360]!;
    return hem === "N" ? y : -y;
  };
  for (let i = 0; i < 360; i++) {
    slope[i] = (lat[(i + 2) % 360]! - lat[(i - 2 + 360) % 360]!) / 4;
    curv[i] = (pole(i - 3) - 2 * pole(i) + pole(i + 3)) / 9;
  }
  for (let i = 0; i < 360; i++) {
    const dZ = (curv[(i + 4) % 360]! - curv[(i - 4 + 360) % 360]!) / 8;
    asc[i] = Math.tanh(-dZ / 0.0045);
  }
  return {
    id,
    lat,
    slope,
    curv,
    asc,
    speed: jetSpeed(jet, id, month) * modeSpeedFactor(id, modes, month),
    phaseMs: phaseSpeed(jet, id, month),
  };
}

/**
 * El Niño shifts the northern subtropical jet south, toward the equator, and
 * La Niña shifts it north. The same sign pulls the southern jets toward the
 * equator. The Pacific sector moves most, but the whole jet relocates.
 */
function modeJetShift(id: JetId, lon: number, modes: ClimateModes, month: number): number {
  const enso = ensoAmp(modes);
  const iod = iodAmp(modes);
  const season = ensoSeasonWeight(month);
  const iodW = iodSeasonWeight(month);
  let shift = 0;
  if (enso) {
    const pacific = 0.45 + 0.55 * Math.exp(-((wrapLon(lon + 160) / 70) ** 2));
    const eastPac = Math.exp(-((wrapLon(lon - -130) / 32) ** 2));
    if (id === "nstj") shift += enso * season * (-7 * pacific - 6 * eastPac);
    if (id === "npj") shift += enso * season * (-4 * pacific - 2 * eastPac);
    // Sørlig halvkule: ENSO-effekten på jetene der er [USIKKER] i grunnlaget og tegnes ikke.
  }
  if (iod && id === "spj") {
    // IOD: bare en liten forskyvning av lavtrykksbanen over Sør-Australia. Ingen egen jet.
    // Positiv IOD: banen litt mot polen (færre fronter). Negativ: litt mot ekvator.
    const southAus = Math.exp(-((wrapLon(lon - 135) / 25) ** 2));
    shift += -iod * iodW * 1.5 * southAus;
  }
  return shift;
}

function modeSpeedFactor(id: JetId, modes: ClimateModes, month: number): number {
  // Bare nordlig subtropisk jet. Sterkere sørlig subtropisk jet ved El Niño er [USIKKER] og tegnes ikke.
  if (id !== "nstj") return 1;
  const season = ensoSeasonWeight(month);
  const enso = ensoAmp(modes);
  return 1 + (enso > 0 ? 0.35 : 0.18) * enso * season;
}

function climateBlob(lat: number, lon: number, cLat: number, cLon: number, latW: number, lonW: number): number {
  const dLat = (lat - cLat) / latW;
  const dLon = wrapLon(lon - cLon) / lonW;
  return Math.exp(-(dLat * dLat + dLon * dLon));
}

export function ensoTemperature(lat: number, lon: number, sign: number): number {
  if (!sign) return 0;
  return (
    sign * 2.4 * climateBlob(lat, lon, 0, -140, 10, 38) +
    sign * 0.8 * climateBlob(lat, lon, -2, -90, 8, 18) +
    sign * -0.9 * climateBlob(lat, lon, 0, 135, 10, 28)
  );
}

export function iodTemperature(lat: number, lon: number, sign: number): number {
  if (!sign) return 0;
  return sign * 1.5 * climateBlob(lat, lon, -6, 55, 12, 18) + sign * -1.3 * climateBlob(lat, lon, -8, 105, 11, 16);
}

export function modeTemperature(lat: number, lon: number, modes: ClimateModes, month: number): number {
  return (
    ensoSeasonWeight(month) * ensoTemperature(lat, lon, ensoAmp(modes)) +
    iodSeasonWeight(month) * iodTemperature(lat, lon, iodAmp(modes))
  );
}

export function modePrecip(lat: number, lon: number, modes: ClimateModes, month: number): number {
  const enso = ensoAmp(modes);
  const iod = iodAmp(modes);
  let rain = 0;
  const ensoW = ensoSeasonWeight(month);
  const iodW = iodSeasonWeight(month);
  if (enso) {
    rain += enso * ensoW * 8 * climateBlob(lat, lon, 0, -150, 8, 36);
    rain += enso * ensoW * -7 * climateBlob(lat, lon, -8, 130, 12, 24);
    rain += enso * ensoW * 5 * climateBlob(lat, lon, 32, -95, 8, 16);
    rain += enso * ensoW * 4 * climateBlob(lat, lon, 36, -120, 6, 8);
    rain += enso * ensoW * -3.5 * climateBlob(lat, lon, 47, -122, 6, 8);
  }
  if (iod) {
    rain += iod * iodW * 7 * climateBlob(lat, lon, 2, 40, 10, 12);
    rain += iod * iodW * -6 * climateBlob(lat, lon, -10, 120, 12, 18);
    // Sør-Australia: positiv IOD ofte tørrere, negativ ofte våtere (vinter og vår).
    rain += iod * iodW * -3 * climateBlob(lat, lon, -33, 140, 6, 14);
  }
  return rain;
}

export function referenceJets(jets: Jets): Jets {
  const out = {} as Jets;
  for (const id of JET_ORDER) {
    out[id] = {
      amp: 0,
      wave: jets[id].wave,
      phase: 0,
      latShift: 0,
      speedMul: 1,
      offsets: emptyOffsets(),
    };
  }
  return out;
}

export function evaluate(jets: Jets, month: number, modes: ClimateModes = CLIMATE_OFF): Atmosphere {
  const ribbons = {} as Record<JetId, Ribbon>;
  const reference = {} as Record<JetId, Ribbon>;
  const ref = referenceJets(jets);
  for (const id of JET_ORDER) {
    ribbons[id] = buildRibbon(jets[id], id, month, modes);
    reference[id] = buildRibbon(ref[id], id, month, CLIMATE_OFF);
  }
  return { ribbons, reference, rivers: buildRivers(ribbons), modes };
}

const LANDFALLS = [
  { name: "Vestlandet", lat: 60.5, lon: 5.2, hem: "N" as const },
  { name: "De britiske øyer", lat: 54, lon: -6, hem: "N" as const },
  { name: "vestkysten av USA", lat: 42, lon: -124, hem: "N" as const },
  { name: "British Columbia", lat: 51, lon: -127, hem: "N" as const },
  { name: "Japan", lat: 38, lon: 140, hem: "N" as const },
  { name: "Patagonia", lat: -47, lon: -73, hem: "S" as const },
  { name: "New Zealand", lat: -43.5, lon: 171, hem: "S" as const },
  { name: "sørkysten av Australia", lat: -38, lon: 145, hem: "S" as const },
];

function buildRivers(ribbons: Record<JetId, Ribbon>): River[] {
  const found: River[] = [];
  for (const hem of ["N", "S"] as const) {
    const polar = ribbons[polarId(hem)];
    const index = deepestTrough(polar);
    const river = riverFromTrough(hem, polar, index);
    if (river) found.push(river);
  }
  return found;
}

export function followRiver(
  ribbons: Record<JetId, Ribbon>,
  hem: Hem,
  preferLon: number,
): { river: River; lon: number } {
  const polar = ribbons[polarId(hem)];
  const troughs = troughIndexes(polar);
  const index = Number.isFinite(preferLon) ? closestTrough(polar, troughs, preferLon) : deepestTrough(polar);
  const lon = wrapLon(index - 180);
  return { river: riverFromTrough(hem, polar, index), lon };
}

function troughIndexes(polar: Ribbon): number[] {
  const found: number[] = [];
  for (let i = 0; i < 360; i += 3) {
    const curv = polar.curv[i] ?? 0;
    if (curv < 0.006) continue;
    const prev = polar.curv[(i - 3 + 360) % 360] ?? 0;
    const next = polar.curv[(i + 3) % 360] ?? 0;
    if (curv >= prev && curv > next) found.push(i);
  }
  return found.length ? found : [deepestTrough(polar)];
}

function closestTrough(polar: Ribbon, troughs: number[], preferLon: number): number {
  let best = troughs[0] ?? deepestTrough(polar);
  let bestD = 999;
  for (const index of troughs) {
    const d = Math.abs(wrapLon(index - 180 - preferLon));
    if (d < bestD) {
      bestD = d;
      best = index;
    }
  }
  return best;
}

function deepestTrough(polar: Ribbon): number {
  let best = 0;
  let score = -Infinity;
  for (let i = 0; i < 360; i++) {
    const curv = polar.curv[i] ?? 0;
    const asc = Math.max(0, polar.asc[i] ?? 0);
    const value = curv * 40 + asc;
    if (value > score) {
      score = value;
      best = i;
    }
  }
  return best;
}

function riverFromTrough(hem: Hem, polar: Ribbon, index: number): River {
  const sign = hem === "N" ? 1 : -1;
  const points: { lon: number; lat: number }[] = [];
  const start = index - 32;
  for (let step = 0; step <= 52; step += 2) {
    const i = (start + step + 360) % 360;
    const lon = wrapLon(i - 180);
    const jetLat = polar.lat[i] ?? 0;
    const along = step / 52;
    const source = sign * 24;
    const warmSide = jetLat - sign * 7;
    const lat = clamp(lerp(source, warmSide, Math.min(1, along / 0.4)), -68, 68);
    points.push({ lon, lat });
  }
  const end = points[points.length - 1]!;
  const coast = nearestCoast(hem, end.lat, end.lon);
  const nearCoast = coast !== null && coast.dist < 16;
  const asc = Math.max(0, polar.asc[index] ?? 0);
  const curv = Math.max(0, polar.curv[index] ?? 0);
  const strength = clamp(0.45 + asc * 0.25 + curv * 8 + polar.speed / 220, 0.45, 1);
  const landfall = nearCoast && coast ? coast.name : "åpent hav";
  return {
    id: hem,
    hem,
    name: landfall === "åpent hav" ? "Atmosfærisk elv" : `Elv mot ${landfall}`,
    points,
    width: 5,
    strength,
    landfall,
  };
}

function nearestCoast(hem: Hem, lat: number, lon: number): { name: string; dist: number } | null {
  let best: { name: string; dist: number } | null = null;
  for (const place of LANDFALLS) {
    if (place.hem !== hem) continue;
    const dist = Math.hypot(place.lat - lat, wrapLon(place.lon - lon));
    if (!best || dist < best.dist) best = { name: place.name, dist };
  }
  return best;
}

export function riverHit(lat: number, lon: number, atm: Atmosphere): number {
  let best = 0;
  for (const river of atm.rivers) {
    for (let i = 1; i < river.points.length; i++) {
      const a = river.points[i - 1]!;
      const b = river.points[i]!;
      const dLon = wrapLon(b.lon - a.lon);
      if (Math.abs(dLon) > 24) continue;
      const along = dLon === 0 ? 0 : wrapLon(lon - a.lon) / dLon;
      if (along < -0.15 || along > 1.15) continue;
      const t = clamp(along, 0, 1);
      const cLat = a.lat + (b.lat - a.lat) * t;
      const cLon = a.lon + dLon * t;
      const dist = Math.hypot(lat - cLat, wrapLon(lon - cLon) * Math.max(0.35, Math.cos((lat * Math.PI) / 180)));
      const hit = river.strength * Math.exp(-((dist / river.width) ** 2));
      if (hit > best) best = hit;
    }
  }
  return best;
}

export function strongestRiver(atm: Atmosphere): River | null {
  return atm.rivers.reduce<River | null>((best, river) => (!best || river.strength > best.strength ? river : best), null);
}

function atLon(arr: Float64Array, lon: number): number {
  const x = wrapLon(lon) + 180;
  if (x <= 0 || x >= 360) return arr[0]!;
  const i = Math.floor(x) % 360;
  const t = x - Math.floor(x);
  const j = (i + 1) % 360;
  return arr[i]! * (1 - t) + arr[j]! * t;
}

export function ribbonLat(rb: Ribbon, lon: number): number {
  return atLon(rb.lat, lon);
}

export function ribbonSlope(rb: Ribbon, lon: number): number {
  return atLon(rb.slope, lon);
}

export function ribbonCurv(rb: Ribbon, lon: number): number {
  return atLon(rb.curv, lon);
}

export function ribbonAscent(rb: Ribbon, lon: number): number {
  return atLon(rb.asc, lon);
}

function thermalAnomaly(lat: number, lon: number, atm: Atmosphere): number {
  const hem: Hem = lat >= 0 ? "N" : "S";
  let extra = 0;
  for (const id of [polarId(hem), subId(hem)] as const) {
    const kind = jetKind(id);
    const actual = atm.ribbons[id];
    const ref = atm.reference[id];
    extra += dipole(lat, ribbonLat(actual, lon), actual.speed, hem, kind);
    extra -= dipole(lat, ribbonLat(ref, lon), ref.speed, hem, kind);
    extra += overheadWarmth(lat, ribbonLat(actual, lon), hem, kind);
  }
  const polar = atm.ribbons[polarId(hem)];
  const jLat = ribbonLat(polar, lon);
  const slope = ribbonSlope(polar, lon);
  const prox = Math.exp(-(((lat - jLat) / 16) ** 2));
  const hemSign = hem === "N" ? 1 : -1;
  extra += hemSign * 4 * Math.tanh(slope * 2.4) * prox;
  extra += 1.6 * riverHit(lat, lon, atm);
  return extra;
}

export function temperatureAt(lat: number, lon: number, atm: Atmosphere, month: number, cont: number): number {
  return zonalClimate(lat, month, cont) + thermalAnomaly(lat, lon, atm) + modeTemperature(lat, lon, atm.modes, month);
}

export function anomalyAt(lat: number, lon: number, atm: Atmosphere, month: number, cont: number): number {
  const withWave = temperatureAt(lat, lon, atm, month, cont);
  const flat: Atmosphere = { ribbons: atm.reference, reference: atm.reference, rivers: [], modes: CLIMATE_OFF };
  const zonal = temperatureAt(lat, lon, flat, month, cont);
  return withWave - zonal;
}

type Range = {
  name: string;
  lat: number;
  lon: number;
  east: number;
  north: number;
  radius: number;
};

const RANGES: Range[] = [
  { name: "Skandesfjellene", lat: 61.2, lon: 5.6, east: 1, north: 0.05, radius: 3.2 },
  { name: "Skandesfjellene", lat: 63.4, lon: 8.2, east: 1, north: 0.1, radius: 3.2 },
  { name: "Skandesfjellene", lat: 67.5, lon: 14.5, east: 1, north: 0.15, radius: 3.4 },
  { name: "Det skotske høylandet", lat: 57, lon: -5, east: 1, north: 0, radius: 3.5 },
  { name: "Alpene", lat: 46.5, lon: 10, east: 0.1, north: 1, radius: 4 },
  { name: "Pyreneene", lat: 42.6, lon: 0.2, east: 0.15, north: 1, radius: 3 },
  { name: "Rocky Mountains", lat: 45, lon: -112, east: 1, north: 0, radius: 7 },
  { name: "Cascades", lat: 47, lon: -121.5, east: 1, north: 0.05, radius: 3.5 },
  { name: "Kystfjellene i British Columbia", lat: 53, lon: -127, east: 1, north: 0, radius: 4 },
  { name: "Sierra Nevada", lat: 38, lon: -119.6, east: 0.78, north: 0.42, radius: 3.5 },
  { name: "Andes", lat: -33, lon: -70.5, east: 1, north: 0, radius: 5 },
  { name: "Andes i Patagonia", lat: -46, lon: -72, east: 1, north: 0, radius: 5 },
  { name: "New Zealand-alpene", lat: -43.6, lon: 170.2, east: 1, north: 0, radius: 3.5 },
  { name: "Japanfjellene", lat: 37, lon: 137.5, east: 0.55, north: -0.8, radius: 4 },
  { name: "Himalaya", lat: 28.5, lon: 84, east: 0.05, north: 1, radius: 6 },
  { name: "Great Dividing Range", lat: -36, lon: 148.5, east: -1, north: 0.1, radius: 4.5 },
  { name: "Drakensberg", lat: -29, lon: 29, east: -1, north: 0.1, radius: 3.5 },
  { name: "Atlasfjellene", lat: 32, lon: -5, east: 1, north: 0.25, radius: 4 },
];

export type Precip = { rate: number; range?: string };

export function precipAt(lat: number, lon: number, atm: Atmosphere, month: number, cont: number): Precip {
  const w = winterIndex(month);
  const itcz = -7 * w;
  let rate = 10 * Math.exp(-(((lat - itcz) / 6.2) ** 2));

  const hem: Hem = lat >= 0 ? "N" : "S";
  const sub = atm.ribbons[subId(hem)];
  const sLat = ribbonLat(sub, lon);
  rate *= 1 - 0.78 * Math.exp(-(((lat - sLat) / 8.5) ** 2));

  const polar = atm.ribbons[polarId(hem)];
  const jLat = ribbonLat(polar, lon);
  const band = Math.exp(-(((lat - jLat) / 7.5) ** 2));
  const climb = ribbonAscent(polar, lon);
  const baseline = 3.4 * (polar.speed / 40) * band;
  const enhance = 13 * band * Math.max(0, climb);
  const dry = 0.62 * band * Math.max(0, -climb);
  rate = Math.max(0, rate * (1 - dry) + baseline + enhance);

  const slope = ribbonSlope(polar, lon);
  const cosLat = Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  const prox = Math.exp(-(((lat - jLat) / 18) ** 2));
  const east = lerp(cosLat, cosLat, prox);
  const north = slope * prox;
  const mag = Math.hypot(east, north) || 1;
  const windE = east / mag;
  const windN = north / mag;
  const windMs = 4 + polar.speed * (0.12 + 0.22 * band);
  const temp = temperatureAt(lat, lon, atm, month, cont);
  const moist = 1 / (1 + Math.exp(-(temp - 0) / 5));

  const gap = Math.abs(jLat - sLat);
  const couple = Math.exp(-((gap / 6.5) ** 2));
  const mid = (jLat + sLat) / 2;
  const inCouple = Math.exp(-(((lat - mid) / 5.5) ** 2));
  const crossed = gap < 2.4;
  rate += (crossed ? 22 : 16) * couple * inCouple * (0.4 + 0.85 * Math.max(0, climb)) * (polar.speed / 38);
  if (Math.abs(lat - jLat) < OVER_DEG && Math.abs(lat - sLat) < OVER_DEG) rate += 16;

  let best = 0;
  let range: string | undefined;
  for (const hill of RANGES) {
    const dLon = wrapLon(lon - hill.lon);
    const dLat = lat - hill.lat;
    const dist = Math.hypot(dLat, dLon * cosLat);
    if (dist > hill.radius) continue;
    const upMag = Math.hypot(hill.east, hill.north) || 1;
    const dot = windE * (hill.east / upMag) + windN * (hill.north / upMag);
    if (dot <= 0.05) continue;
    const weight = Math.exp(-(dist * dist) / (2 * (hill.radius * 0.42) ** 2));
    const add = 18 * dot * weight * (0.35 + 0.65 * moist) * Math.min(1.3, windMs / 14);
    if (add > best) {
      best = add;
      range = hill.name;
    }
  }
  rate += best;
  rate += 18 * riverHit(lat, lon, atm);
  rate += modePrecip(lat, lon, atm.modes, month);
  return { rate: clamp(rate, 0, 48), range: best > 2 ? range : undefined };
}

export type Wind = { from: string; surface: number; jet?: number; jetName?: string };

const COMPASS = [
  "nord",
  "nord-nordøst",
  "nordøst",
  "øst-nordøst",
  "øst",
  "øst-sørøst",
  "sørøst",
  "sør-sørøst",
  "sør",
  "sør-sørvest",
  "sørvest",
  "vest-sørvest",
  "vest",
  "vest-nordvest",
  "nordvest",
  "nord-nordvest",
];

export function windAt(lat: number, lon: number, atm: Atmosphere): Wind {
  const hem: Hem = lat >= 0 ? "N" : "S";
  let best: { id: JetId; dist: number } | null = null;
  for (const id of [polarId(hem), subId(hem)] as const) {
    const dist = Math.abs(lat - ribbonLat(atm.ribbons[id], lon));
    if (!best || dist < best.dist) best = { id, dist };
  }
  const id = best?.id ?? polarId(hem);
  const rb = atm.ribbons[id];
  const slope = ribbonSlope(rb, lon);
  const cosLat = Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  const prox = Math.exp(-(((best?.dist ?? 30) / 14) ** 2));
  const east = cosLat;
  const north = slope * prox;
  const mag = Math.hypot(east, north) || 1;
  const toDeg = (Math.atan2(east / mag, north / mag) * 180) / Math.PI;
  const fromDeg = (toDeg + 180 + 360) % 360;
  const name = COMPASS[Math.round(fromDeg / 22.5) % 16] ?? "vest";
  const band = Math.exp(-(((best?.dist ?? 30) / 12) ** 2));
  const other = best?.id === polarId(hem) ? subId(hem) : polarId(hem);
  const gap = Math.abs(ribbonLat(rb, lon) - ribbonLat(atm.ribbons[other], lon));
  const couple = Math.exp(-((gap / 7) ** 2));
  const surface = (3 + rb.speed * (0.08 + 0.18 * band)) * (1 + 0.35 * couple);
  const overhead = (best?.dist ?? 99) < OVER_DEG;
  return {
    from: name,
    surface,
    jet: overhead ? rb.speed * (1 + 0.28 * couple) : undefined,
    jetName: overhead
      ? couple > 0.45
        ? "den sammenkoblede jetstrømmen"
        : jetKind(id) === "polar"
          ? "polarjeten"
          : "den subtropiske jetstrømmen"
      : undefined,
  };
}

export type Marker = {
  kind: "L" | "H" | "block";
  lat: number;
  lon: number;
  label: string;
  score: number;
};

type Peak = { index: number; score: number };

function peaks(values: Float64Array, sign: 1 | -1, floor: number): Peak[] {
  const found: Peak[] = [];
  for (let i = 0; i < 360; i += 4) {
    const v = values[i] ?? 0;
    if (sign * v < floor) continue;
    const prev = values[(i - 4 + 360) % 360] ?? 0;
    const next = values[(i + 4) % 360] ?? 0;
    if (sign * v >= sign * prev && sign * v > sign * next) found.push({ index: i, score: sign * v });
  }
  found.sort((a, b) => b.score - a.score);
  return found;
}

function lonOfIndex(index: number): number {
  return index <= 180 ? index - 180 : index - 180;
}

export function markersFor(jets: Jets, atm: Atmosphere): Marker[] {
  const lows: Marker[] = [];
  const highs: Marker[] = [];
  for (const id of JET_ORDER) {
    const rb = atm.ribbons[id];
    const hem = jetHem(id);
    const jet = jets[id];
    const blocking = jetKind(id) === "polar" && jet.amp >= 12 && jet.wave <= 4 && Math.abs(rb.phaseMs) < 12;
    const eq = hem === "N" ? -3.2 : 3.2;
    const pole = hem === "N" ? 3.6 : -3.6;
    const push = (list: Marker[], kind: Marker["kind"], index: number, shift: number, score: number, label: string) => {
      const lon = wrapLon(lonOfIndex(index) + (hem === "N" ? 6 : -6));
      const jLat = rb.lat[index] ?? 0;
      list.push({
        kind,
        lon,
        lat: clamp(jLat + shift, -78, 78),
        label,
        score,
      });
    };
    for (const peak of peaks(rb.asc, 1, 0.32)) {
      push(lows, "L", peak.index, eq, peak.score + 0.2, "lavtrykk, stigende luft");
    }
    for (const peak of peaks(rb.asc, -1, 0.28)) {
      push(highs, blocking ? "block" : "H", peak.index, pole, peak.score, blocking ? "blokkering" : "høytrykk, synkende luft");
    }
    for (const peak of peaks(rb.curv, 1, 0.01)) {
      push(lows, "L", peak.index, eq, peak.score * 40, "lavtrykk øst for tråg");
    }
    for (const peak of peaks(rb.curv, -1, 0.01)) {
      push(highs, blocking ? "block" : "H", peak.index, pole, peak.score * 40, blocking ? "blokkering i ryggen" : "høytrykk i ryggen");
    }
  }
  return [...keepSpread(lows, 5, 32), ...keepSpread(highs, 4, 36)];
}

function keepSpread(list: Marker[], limit: number, gap: number): Marker[] {
  const sorted = list.slice().sort((a, b) => b.score - a.score);
  const kept: Marker[] = [];
  for (const marker of sorted) {
    if (kept.length >= limit) break;
    const near = kept.some((other) => Math.hypot(marker.lat - other.lat, Math.abs(wrapLon(marker.lon - other.lon))) < gap);
    if (!near) kept.push(marker);
  }
  return kept;
}

export type Coupling = {
  hem: Hem;
  lon: number;
  lat: number;
  gap: number;
  crossed: boolean;
};

export function couplings(atm: Atmosphere, prefer: Partial<Record<Hem, number>> = {}): Coupling[] {
  const found: Coupling[] = [];
  for (const hem of ["N", "S"] as const) {
    const polar = atm.ribbons[polarId(hem)];
    const sub = atm.ribbons[subId(hem)];
    let best = 99;
    let bestI = 0;
    let crossed = false;
    for (let i = 0; i < 360; i++) {
      const gap = Math.abs((polar.lat[i] ?? 0) - (sub.lat[i] ?? 0));
      if (gap < best) {
        best = gap;
        bestI = i;
      }
      const prev = (polar.lat[(i + 359) % 360] ?? 0) - (sub.lat[(i + 359) % 360] ?? 0);
      const cur = (polar.lat[i] ?? 0) - (sub.lat[i] ?? 0);
      if (prev * cur < 0 && gap < 8) crossed = true;
    }
    const preferLon = prefer[hem];
    if (typeof preferLon === "number" && Number.isFinite(preferLon)) {
      let stick = bestI;
      let stickGap = best;
      let stickD = Math.abs(wrapLon(bestI - 180 - preferLon));
      for (let i = 0; i < 360; i++) {
        const gap = Math.abs((polar.lat[i] ?? 0) - (sub.lat[i] ?? 0));
        const d = Math.abs(wrapLon(i - 180 - preferLon));
        if (d <= 14 && gap <= best + 0.8 && d < stickD) {
          stick = i;
          stickGap = gap;
          stickD = d;
        }
      }
      if (stickD <= 14 && stickGap < 14) {
        bestI = stick;
        best = stickGap;
      }
    }
    if (best < 12) {
      const lat = ((polar.lat[bestI] ?? 0) + (sub.lat[bestI] ?? 0)) / 2;
      found.push({ hem, lon: wrapLon(bestI - 180), lat, gap: best, crossed: crossed || best < 2.2 });
    }
  }
  return found;
}

export type SkyKind = "sol" | "sky" | "regn" | "sno" | "uvaer";

export function weatherKind(temp: number, precip: number, wind = 0): SkyKind {
  if (precip >= 14 || (precip >= 8 && wind >= 16)) return "uvaer";
  if (temp <= 0.8 && precip >= 2.2) return "sno";
  if (precip >= 4.2) return "regn";
  if (precip >= 1.7) return "sky";
  return "sol";
}

export type PassMode = "now" | "polar" | "sub" | "meet";

function bendJetTo(jet: JetParams, id: JetId, month: number, lon: number, targetLat: number) {
  const limit = jetHem(id) === "N" ? clamp(targetLat, 16, 74) : clamp(targetLat, -74, -16);
  const current = latAt(jet, id, month, lon);
  if (Math.abs(limit - current) < 0.4) return;
  const n = jet.offsets.length;
  const span = 360 / n;
  let x = (wrapLon(lon) + 180) / span - 0.5;
  x = ((x % n) + n) % n;
  const index = Math.round(x) % n;
  const value = clamp((jet.offsets[index] ?? 0) + (limit - current), -22, 22);
  jet.offsets = applyOffsetDrag(jet.offsets, index, value);
}

/** Bend the jets you drew so a marked place can be compared under polar, subtropical, or both. */
export function scenarioJets(
  jets: Jets,
  month: number,
  site: { lat: number; lon: number },
  mode: PassMode,
): Jets {
  const next = cloneJets(jets);
  if (mode === "now") return next;
  const hem: Hem = site.lat >= 0 ? "N" : "S";
  const polar = polarId(hem);
  const sub = subId(hem);
  const poleward = hem === "N" ? 16 : -16;
  if (mode === "polar" || mode === "meet") bendJetTo(next[polar], polar, month, site.lon, site.lat);
  if (mode === "sub" || mode === "meet") bendJetTo(next[sub], sub, month, site.lon, site.lat);
  if (mode === "polar" && Math.abs(latAt(next[sub], sub, month, site.lon) - site.lat) < 12) {
    bendJetTo(next[sub], sub, month, site.lon, site.lat - poleward);
  }
  if (mode === "sub" && Math.abs(latAt(next[polar], polar, month, site.lon) - site.lat) < 12) {
    bendJetTo(next[polar], polar, month, site.lon, site.lat + poleward);
  }
  return next;
}

export function stationaryWave(jet: JetParams, id: JetId, month: number): number {
  const lat = clamp(Math.abs(climLat(id, month) + jet.latShift), 20, 70);
  const phi = (lat * Math.PI) / 180;
  const u = Math.max(5, jetSpeed(jet, id, month));
  const ks = Math.sqrt(beta(lat) / u);
  return ks * EARTH_R * Math.cos(phi);
}

export function nb(n: number, digits = 0): string {
  return n.toLocaleString("nb-NO", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export function formatLat(lat: number): string {
  return `${nb(Math.abs(lat), 0)}° ${lat >= 0 ? "N" : "S"}`;
}

export function formatLon(lon: number): string {
  const x = wrapLon(lon);
  return `${nb(Math.abs(x), 0)}° ${x >= 0 ? "Ø" : "V"}`;
}
