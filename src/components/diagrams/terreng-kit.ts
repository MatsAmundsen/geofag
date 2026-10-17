/**
 * Terreng-kit (logikk): felles byggeklosser for terrengmodeller (Botn, egg og tind, senere
 * LandskapBlokk). Ingen React her, så modellene kan testes og måles uten nettleser.
 *
 * - `lagTerrengNett`: fast rutenett (hjørnekoordinater) én gang per størrelse. Geometri og høyde er
 *   skilt, så en tilstand bare regner høyder (ett tall per hjørne), aldri nye strenger.
 * - `fyllHoyder`: høyder for alle hjørner i en Float32Array (gjenbrukes mellom bilder).
 * - `tegnTerreng`: tegner nettet i et canvas, bakerst først, med lys og fargetrinn. Ruter med lik
 *   farge som ligger etter hverandre i tegnerekkefølgen fylles i én operasjon.
 * - `tegnSider`: front- og sideflaten av blokken (snitt med lag).
 * - `lagStoy`: seedet verdistøy (fbm), lik på server og klient.
 * - `profil`: høydeprofil langs en linje, til `Hoydeprofil` i terreng-figur.tsx.
 * - `skraaProj`: skråprojeksjon med kamerahøyde i grader, og retningen kameraet ser.
 *
 * Tunge ting (nett, høyder, tegning) kjøres bare på klienten, etter montering. Serveren rendrer en
 * statisk plassholder (se prosess-figurer-lat.tsx).
 */
import { clamp, lerp } from "./isbre-kit";
import { prng } from "./prosess-kit";

export type Rgb = [number, number, number];
export type Proj = (x: number, y: number, z: number) => [number, number];

/* ---------- projeksjon ---------- */

export type SkraaProj = Proj & {
  /** Retningen kameraet ser i verden (inn i bildet), brukt til tegnerekkefølge. */
  blikk: [number, number];
};

/**
 * Skråprojeksjon (ortografisk): x mot høyre, y innover (skjæres mot høyre med `kx`), z opp.
 * `hevning` er kamerahøyden i grader over horisonten; `overdriv` forstørrer høyden.
 */
export function skraaProj({
  ox,
  oy,
  skala,
  kx,
  hevning,
  overdriv = 1,
}: {
  ox: number;
  oy: number;
  skala: number;
  kx: number;
  hevning: number;
  overdriv?: number;
}): SkraaProj {
  const t = (hevning * Math.PI) / 180;
  const ky = Math.sin(t) * skala;
  const kz = Math.cos(t) * skala * overdriv;
  const sx = skala;
  const ks = kx * skala;
  const p = ((x: number, y: number, z: number) => [ox + x * sx + y * ks, oy - y * ky - z * kz]) as SkraaProj;
  // punkter lenger inn langs (−ks/sx, 1) havner bak: der starter tegningen
  p.blikk = [-ks / sx, 1];
  return p;
}

/* ---------- nett og høyder ---------- */

export type TerrengNett = {
  nx: number;
  ny: number;
  W: number;
  D: number;
  /** Hjørnekoordinater, (nx+1)·(ny+1), rad for rad (j = 0 foran). */
  xs: Float32Array;
  ys: Float32Array;
};

const nettCache = new Map<string, TerrengNett>();

export function lagTerrengNett(nx: number, ny: number, W: number, D: number): TerrengNett {
  const key = `${nx}|${ny}|${W}|${D}`;
  const hit = nettCache.get(key);
  if (hit) return hit;
  const n = (nx + 1) * (ny + 1);
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);
  for (let j = 0; j <= ny; j++)
    for (let i = 0; i <= nx; i++) {
      xs[j * (nx + 1) + i] = (i / nx) * W;
      ys[j * (nx + 1) + i] = (j / ny) * D;
    }
  const nett = { nx, ny, W, D, xs, ys };
  nettCache.set(key, nett);
  return nett;
}

/** Høyde for hvert hjørne. `ut` gjenbrukes hvis den har riktig lengde. */
export function fyllHoyder(nett: TerrengNett, h: (x: number, y: number) => number, ut?: Float32Array) {
  const n = nett.xs.length;
  const Z = ut && ut.length === n ? ut : new Float32Array(n);
  for (let k = 0; k < n; k++) Z[k] = h(nett.xs[k], nett.ys[k]);
  return Z;
}

/* ---------- støy ---------- */

/** Seedet verdistøy med glatt interpolasjon. `fbm(x, y, oktaver)` gir omtrent −1 … 1. */
export function lagStoy(seed: number) {
  const rnd = prng(seed);
  const N = 256;
  const perm = new Uint8Array(N * 2);
  const verdi = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    perm[i] = i;
    verdi[i] = rnd() * 2 - 1;
  }
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < N; i++) perm[N + i] = perm[i];
  const v = (i: number, j: number) => verdi[perm[(perm[i & 255] + j) & 255]];
  const glatt = (t: number) => t * t * (3 - 2 * t);
  const stoy = (x: number, y: number) => {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = glatt(x - i);
    const fy = glatt(y - j);
    const a = lerp(v(i, j), v(i + 1, j), fx);
    const b = lerp(v(i, j + 1), v(i + 1, j + 1), fx);
    return lerp(a, b, fy);
  };
  const fbm = (x: number, y: number, oktaver = 3) => {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    let f = 1;
    for (let o = 0; o < oktaver; o++) {
      sum += amp * stoy(x * f + o * 17.3, y * f - o * 9.1);
      norm += amp;
      amp *= 0.5;
      f *= 2.03;
    }
    return sum / norm;
  };
  return { stoy, fbm };
}

/* ---------- tegning ---------- */

export type TerrengStil = {
  proj: SkraaProj;
  /** Grunnfarge per rute: senter, høyde, helning (|∇z|) og rutens indeks (i, j). */
  farge: (x: number, y: number, z: number, helning: number, i: number, j: number) => Rgb;
  /** Lysretning i verden (normaliseres). */
  lys?: [number, number, number];
  omgivelse?: number;
  /** Antall trinn per fargekanal (lavere = færre fyll, mer sammenslåing). */
  trinn?: number;
  /** Strekbredde (viewBox-enheter) som tetter sømmer mellom ruter. */
  som?: number;
};

/**
 * Tegner nettet i `ctx` (som allerede er skalert til viewBox-enheter), bakerst først, så nære ruter
 * dekker de bak. Generator: gir fra seg kontrollen etter hver `radPerBit` rader, så tegningen kan
 * deles over flere ledige øyeblikk (requestIdleCallback) uten lange oppgaver.
 * Høydene regnes underveis, rad for rad (bakerste rad først).
 */
export function* terrengJobb(
  ctx: CanvasRenderingContext2D,
  nett: TerrengNett,
  h: (x: number, y: number) => number,
  stil: TerrengStil,
  radPerBit = 6,
): Generator<void, Float32Array, void> {
  const { nx, ny, W, D } = nett;
  const { proj } = stil;
  const lys = stil.lys ?? [-0.55, -0.35, 0.75];
  const ln = Math.hypot(...lys);
  const L0 = lys[0] / ln;
  const L1 = lys[1] / ln;
  const L2 = lys[2] / ln;
  const amb = stil.omgivelse ?? 0.4;
  const trinn = stil.trinn ?? 64;
  const kv = 255 / trinn;
  const dx = W / nx;
  const dy = D / ny;
  const rad = nx + 1;
  const n = rad * (ny + 1);
  const Z = new Float32Array(n);
  const sx = new Float32Array(n);
  const sy = new Float32Array(n);
  const regnRad = (j: number) => {
    for (let i = 0; i <= nx; i++) {
      const k = j * rad + i;
      const z = h(nett.xs[k], nett.ys[k]);
      Z[k] = z;
      const [a, b] = proj(nett.xs[k], nett.ys[k], z);
      sx[k] = a;
      sy[k] = b;
    }
  };
  const iFram = proj.blikk[0] <= 0;
  ctx.lineWidth = stil.som ?? 0.7;
  ctx.lineJoin = "round";
  regnRad(ny);
  for (let j = ny - 1; j >= 0; j--) {
    regnRad(j);
    let aktiv = "";
    let open = false;
    const flush = () => {
      if (!open) return;
      ctx.fill();
      // en tynn strek i samme farge tetter sømmene mellom rutene (kantutjevning gir ellers lyse fuger)
      ctx.stroke();
      open = false;
    };
    for (let s = 0; s < nx; s++) {
      const i = iFram ? s : nx - 1 - s;
      const k00 = j * rad + i;
      const k10 = k00 + 1;
      const k01 = k00 + rad;
      const k11 = k01 + 1;
      const z00 = Z[k00];
      const z10 = Z[k10];
      const z01 = Z[k01];
      const z11 = Z[k11];
      const gx = (z10 + z11 - z00 - z01) / (2 * dx);
      const gy = (z01 + z11 - z00 - z10) / (2 * dy);
      const nl = Math.hypot(gx, gy, 1);
      const lam = Math.max(0, (-gx * L0 - gy * L1 + L2) / nl);
      const base = stil.farge((i + 0.5) * dx, (j + 0.5) * dy, (z00 + z10 + z01 + z11) / 4, Math.hypot(gx, gy), i, j);
      const f = amb + (1 - amb) * lam * 1.25;
      const r = Math.round(clamp(base[0] * f, 0, 255) / kv) * kv;
      const g = Math.round(clamp(base[1] * f, 0, 255) / kv) * kv;
      const b = Math.round(clamp(base[2] * f, 0, 255) / kv) * kv;
      const c = `rgb(${r | 0},${g | 0},${b | 0})`;
      if (c !== aktiv) {
        flush();
        ctx.fillStyle = c;
        ctx.strokeStyle = c;
        aktiv = c;
      }
      if (!open) {
        ctx.beginPath();
        open = true;
      }
      ctx.moveTo(sx[k00], sy[k00]);
      ctx.lineTo(sx[k10], sy[k10]);
      ctx.lineTo(sx[k11], sy[k11]);
      ctx.lineTo(sx[k01], sy[k01]);
      ctx.closePath();
    }
    flush();
    if (j % radPerBit === 0) yield;
  }
  return Z;
}

/** Tegner hele nettet på én gang (samme som å kjøre `terrengJobb` til slutt). */
export function tegnTerreng(ctx: CanvasRenderingContext2D, nett: TerrengNett, h: (x: number, y: number) => number, stil: TerrengStil) {
  const jobb = terrengJobb(ctx, nett, h, stil, 1e9);
  let r = jobb.next();
  while (!r.done) r = jobb.next();
  return r.value;
}

/**
 * Front- og sideflaten (blokksnitt) for de sidene kameraet ser: fronten (y = 0) og enten østsiden
 * (x = W) eller vestsiden (x = 0). Lagstriper gir et inntrykk av berggrunn.
 */
export function tegnSider(
  ctx: CanvasRenderingContext2D,
  nett: TerrengNett,
  Z: Float32Array,
  proj: SkraaProj,
  { bunn, fyll, side, lag }: { bunn: number; fyll: string; side: string; lag: string },
) {
  const { nx, ny, W, D } = nett;
  const rad = nx + 1;
  const ost = proj.blikk[0] < 0;
  const flate = (punkter: [number, number][], farge: string) => {
    ctx.beginPath();
    punkter.forEach(([a, b], k) => (k ? ctx.lineTo(a, b) : ctx.moveTo(a, b)));
    ctx.closePath();
    ctx.fillStyle = farge;
    ctx.fill();
  };
  // side først (bak fronten)
  const sideI = ost ? nx : 0;
  const sideX = ost ? W : 0;
  const sp: [number, number][] = [];
  for (let j = 0; j <= ny; j++) sp.push(proj(sideX, (j / ny) * D, Z[j * rad + sideI]));
  sp.push(proj(sideX, D, bunn), proj(sideX, 0, bunn));
  flate(sp, side);
  const fp: [number, number][] = [];
  for (let i = 0; i <= nx; i++) fp.push(proj((i / nx) * W, 0, Z[i]));
  fp.push(proj(W, 0, bunn), proj(0, 0, bunn));
  flate(fp, fyll);
  // lagstriper på fronten, klippet til flaten
  ctx.save();
  ctx.beginPath();
  fp.forEach(([a, b], k) => (k ? ctx.lineTo(a, b) : ctx.moveTo(a, b)));
  ctx.closePath();
  ctx.clip();
  ctx.strokeStyle = lag;
  ctx.lineWidth = 1;
  for (let z = bunn + 9; z < 400; z += 13) {
    ctx.beginPath();
    for (let i = 0; i <= 24; i++) {
      const x = (i / 24) * W;
      const [a, b] = proj(x, 0, z + 3 * Math.sin(x / 47 + z / 31));
      if (i) ctx.lineTo(a, b);
      else ctx.moveTo(a, b);
    }
    ctx.stroke();
  }
  ctx.restore();
  // kantlinje langs toppen av fronten
  ctx.beginPath();
  for (let i = 0; i <= nx; i++) {
    const [a, b] = proj((i / nx) * W, 0, Z[i]);
    if (i) ctx.lineTo(a, b);
    else ctx.moveTo(a, b);
  }
  ctx.strokeStyle = "rgba(225,232,220,0.55)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

/* ---------- profil ---------- */

/** Høyder langs linjen a → b (n + 1 punkter): [avstand 0 … 1, verdi]. */
export function profil(h: (x: number, y: number) => number, a: [number, number], b: [number, number], n = 96) {
  const ut: [number, number][] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    ut.push([t, h(lerp(a[0], b[0], t), lerp(a[1], b[1], t))]);
  }
  return ut;
}

/** Fargeblanding for grunnfarger. */
export function blandRgb(a: Rgb, b: Rgb, t: number): Rgb {
  const k = clamp(t);
  return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
}
