import { makeLinear, stepLinear, type Linear1D } from "./linear";

export type FjordOpts = {
  thick: number;
  speed: number;
  entry: "vann" | "skrent";
};

export const FJORD_N = 300;
export const FJORD_L = 6400;

export function fjordDepth(x: number) {
  const left = 780;
  const right = FJORD_L - 780;
  const depth = 340;
  if (x < left) return Math.max(0, depth * (x / left));
  if (x > right) return Math.max(0, depth * ((FJORD_L - x) / (FJORD_L - right)));
  return depth;
}

export function makeFjord() {
  const s = makeLinear(FJORD_N, FJORD_L / FJORD_N);
  for (let i = 0; i < FJORD_N; i++) s.d[i] = fjordDepth((i + 0.5) * s.dx);
  return s;
}

export function slideThickness(x: number, center: number, thick: number) {
  const sig = 150;
  return thick * Math.exp(-Math.pow((x - center) / sig, 2));
}

export type FjordRun = {
  sim: Linear1D;
  center: number;
  prev: Float64Array;
  t: number;
  near: number;
  far: number;
  tFar: number;
  crests: number;
  prevFar: number;
};

export function startFjord(opts: FjordOpts): FjordRun {
  const sim = makeFjord();
  const center = opts.entry === "skrent" ? 260 : 720;
  const prev = new Float64Array(FJORD_N);
  for (let i = 0; i < FJORD_N; i++) {
    const x = (i + 0.5) * sim.dx;
    prev[i] = sim.d[i] > 2 ? slideThickness(x, center, opts.thick) : 0;
  }
  return { sim, center, prev, t: 0, near: 0, far: 0, tFar: 0, crests: 0, prevFar: 0 };
}

/** Advance by up to `dt` seconds. Mutates the run. */
export function pushFjord(run: FjordRun, opts: FjordOpts, dt: number) {
  const { sim } = run;
  const c = Math.sqrt(9.81 * 340);
  const dtMax = (0.4 * sim.dx) / c;
  let left = dt;
  const iNear = Math.round(FJORD_N * 0.24);
  const iFar = Math.round(FJORD_N * 0.84);
  while (left > 1e-4) {
    const step = Math.min(left, dtMax);
    run.center = Math.min(2000, run.center + opts.speed * step);
    const src = new Float64Array(FJORD_N);
    for (let i = 0; i < FJORD_N; i++) {
      const x = (i + 0.5) * sim.dx;
      const b = sim.d[i] > 2 ? slideThickness(x, run.center, opts.thick) : 0;
      src[i] = b - run.prev[i];
      run.prev[i] = b;
    }
    stepLinear(sim, step);
    for (let i = 0; i < FJORD_N; i++) sim.eta[i] += src[i];
    run.t += step;
    left -= step;
    run.near = Math.max(run.near, sim.eta[iNear]);
    if (sim.eta[iFar] > run.far) {
      run.far = sim.eta[iFar];
      run.tFar = run.t;
    }
    if (sim.eta[iFar] > 0.15 && run.prevFar <= 0.15) run.crests += 1;
    run.prevFar = sim.eta[iFar];
  }
}

export function runSlide(opts: FjordOpts) {
  const run = startFjord(opts);
  const trace: number[] = [];
  const iFar = Math.round(FJORD_N * 0.84);
  for (let k = 0; k < 220; k++) {
    pushFjord(run, opts, 0.8);
    if (k % 2 === 0) trace.push(run.sim.eta[iFar]);
    if (run.t > 240) break;
  }
  return run;
}
