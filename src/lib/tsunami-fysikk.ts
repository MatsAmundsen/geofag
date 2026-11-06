/**
 * Regnekjerne for tsunami-modellene M1–M7.
 * g og langbølgeformelen er NOAA sin. Øvrige tall i UI er valgte modellverdier
 * eller forhåndsvalgte illustrasjoner, ikke historiske målinger.
 */

export const G_MS2 = 9.8;

export function waveSpeedMs(depthM: number): number {
  if (!(depthM > 0)) return 0;
  return Math.sqrt(G_MS2 * depthM);
}

export function msToKmh(speedMs: number): number {
  return speedMs * 3.6;
}

export function wavelengthM(speedMs: number, periodS: number): number {
  if (!(periodS > 0) || !(speedMs > 0)) return 0;
  return speedMs * periodS;
}

export type DepthSegment = { lengthM: number; depthM: number };

/** Gangtid som sum av delstrekning / fart. Fart er √(g d) på hver del. */
export function travelTimeS(segments: readonly DepthSegment[]): number {
  let seconds = 0;
  for (const segment of segments) {
    const speed = waveSpeedMs(segment.depthM);
    if (speed <= 0 || !(segment.lengthM > 0)) continue;
    seconds += segment.lengthM / speed;
  }
  return seconds;
}

/**
 * Posisjon etter like tidssteg. Skal være lik fart × tid, så avspillingen
 * kan testes uten å stole på nettleserens klokke.
 */
export function integrateDistanceM(speedMs: number, dtS: number, steps: number): number {
  let distance = 0;
  const n = Math.max(0, Math.floor(steps));
  for (let i = 0; i < n; i++) distance += speedMs * dtS;
  return distance;
}

/** Green-tilnærming H2/H1 ≈ (d1/d2)^1/4. Bare en merket tilnærming, ikke oppskylling. */
export function greenHeightRatio(depthFromM: number, depthToM: number): number {
  if (!(depthFromM > 0) || !(depthToM > 0)) return 1;
  return (depthFromM / depthToM) ** 0.25;
}

export type SourceMode = "loddrett" | "sidelengs";

/** I denne modellen løfter bare loddrett bunnløft vannflaten. Sidebevegelse gir 0. */
export function initialLiftM(mode: SourceMode, displacementM: number): number {
  if (!(displacementM > 0)) return 0;
  return mode === "loddrett" ? displacementM : 0;
}

/** Avspillingstid, alltid i [0, 1). Samme inngang gir samme utgang. */
export function playhead(timeS: number, durationS: number): number {
  if (!(durationS > 0)) return 0;
  const wrapped = timeS % durationS;
  const positive = wrapped < 0 ? wrapped + durationS : wrapped;
  return positive / durationS;
}

export type GridPoint = { row: number; col: number };

/** 0 er land. Positive tall er valgt vanndyp i meter. */
export const M5_DEPTH_M: readonly (readonly number[])[] = [
  [4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200],
  [4000, 3800, 600, 600, 600, 3600, 4000, 4000],
  [4000, 3600, 0, 0, 0, 2400, 1800, 200],
  [4000, 3600, 0, 0, 0, 2400, 400, 80],
  [4000, 4000, 4000, 3200, 2800, 2000, 400, 80],
  [4200, 4200, 4200, 4200, 4200, 4000, 3600, 3000],
];

export const M5_CELL_M = 200_000;

export const M5_SOURCE: GridPoint = { row: 2, col: 0 };
export const M5_RECEIVER: GridPoint = { row: 2, col: 7 };

export function isLand(depthM: number): boolean {
  return !(depthM > 0);
}

export function straightCrossesLand(
  grid: readonly (readonly number[])[],
  from: GridPoint,
  to: GridPoint,
): boolean {
  const steps = Math.max(Math.abs(to.col - from.col), Math.abs(to.row - from.row), 1);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const col = Math.round(from.col + (to.col - from.col) * t);
    const row = Math.round(from.row + (to.row - from.row) * t);
    const depth = grid[row]?.[col];
    if (depth == null || isLand(depth)) return true;
  }
  return false;
}

export function constantDepthTimeS(
  grid: readonly (readonly number[])[],
  from: GridPoint,
  to: GridPoint,
  depthM: number,
): number {
  const cell = Math.hypot(to.col - from.col, to.row - from.row) * M5_CELL_M;
  const speed = waveSpeedMs(depthM);
  if (speed <= 0) return Number.POSITIVE_INFINITY;
  return cell / speed;
}

const NEIGHBORS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

export type WaterRoute = { seconds: number; cells: GridPoint[] };

/** Korteste gangtid gjennom vann. Landceller er ikke med i ruten. */
export function routeThroughWater(
  grid: readonly (readonly number[])[],
  from: GridPoint,
  to: GridPoint,
): WaterRoute | null {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (isLand(grid[from.row]?.[from.col] ?? 0) || isLand(grid[to.row]?.[to.col] ?? 0)) return null;

  const key = (p: GridPoint) => p.row * cols + p.col;
  const dist = new Map<number, number>();
  const prev = new Map<number, number>();
  const queue: GridPoint[] = [from];
  dist.set(key(from), 0);

  while (queue.length > 0) {
    queue.sort((a, b) => (dist.get(key(a)) ?? Infinity) - (dist.get(key(b)) ?? Infinity));
    const current = queue.shift()!;
    const currentKey = key(current);
    if (current.row === to.row && current.col === to.col) break;
    for (const [dr, dc] of NEIGHBORS) {
      const next = { row: current.row + dr, col: current.col + dc };
      if (next.row < 0 || next.col < 0 || next.row >= rows || next.col >= cols) continue;
      const depth = grid[next.row]?.[next.col] ?? 0;
      if (isLand(depth)) continue;
      const speed = waveSpeedMs(depth);
      const step = M5_CELL_M / speed;
      const nextKey = key(next);
      const candidate = (dist.get(currentKey) ?? Infinity) + step;
      if (candidate < (dist.get(nextKey) ?? Infinity)) {
        dist.set(nextKey, candidate);
        prev.set(nextKey, currentKey);
        if (!queue.some((item) => item.row === next.row && item.col === next.col)) queue.push(next);
      }
    }
  }

  const end = key(to);
  if (!dist.has(end)) return null;
  const cells: GridPoint[] = [];
  let cursor = end;
  cells.push(to);
  while (prev.has(cursor)) {
    cursor = prev.get(cursor)!;
    cells.push({ row: Math.floor(cursor / cols), col: cursor % cols });
  }
  cells.reverse();
  return { seconds: dist.get(end) ?? Number.POSITIVE_INFINITY, cells };
}

export type SlideSketch = {
  /** 0–1, illustrativ amplitude nær nedslaget. Ikke meter. */
  near: number;
  far: number;
  waves: number;
};

/** Samme volum og ulikt tempo skal ikke gi samme forløp. Ingen faresone. */
export function slideSketch(input: {
  above: boolean;
  volume: "liten" | "stor";
  tempo: "langsom" | "rask";
}): SlideSketch {
  const volumeFactor = input.volume === "stor" ? 0.7 : 0.35;
  const tempoFactor = input.tempo === "rask" ? 1 : 0.45;
  const placeFactor = input.above ? 1 : 0.7;
  const near = Math.min(1, volumeFactor * tempoFactor * placeFactor);
  return {
    near,
    far: near * 0.4,
    waves: input.tempo === "rask" ? 3 : 2,
  };
}

export type TownAction = "ingen" | "flytt-skole" | "tydelig-rute" | "ikke-bygg";
export type TownScenario = "liten" | "stor";

export type TownReadout = {
  exposed: number;
  schoolExposed: boolean;
  routeMarked: boolean;
  futureBlocked: boolean;
  changed: "eksponering" | "sårbarhet" | "ingen";
};

const TOWN_HOUSES = 6;

/** Generisk tettsted. Teller objekter, ikke mennesker eller døde. */
export function townReadout(scenario: TownScenario, action: TownAction): TownReadout {
  const housesInZone = scenario === "stor" ? TOWN_HOUSES : 3;
  const schoolStartsExposed = scenario === "stor";
  const schoolExposed = schoolStartsExposed && action !== "flytt-skole";
  const quay = 1;
  const exposed = housesInZone + quay + (schoolExposed ? 1 : 0);
  return {
    exposed,
    schoolExposed,
    routeMarked: action === "tydelig-rute",
    futureBlocked: action === "ikke-bygg",
    changed:
      action === "flytt-skole" || action === "ikke-bygg"
        ? "eksponering"
        : action === "tydelig-rute"
          ? "sårbarhet"
          : "ingen",
  };
}
