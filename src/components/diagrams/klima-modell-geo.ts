/**
 * Geometri og farger for modellene i geografi kap. 5 (se klima-modell-kit.tsx for tegnedelene).
 * Egen fil uten komponenter, så hurtigoppdatering i utvikling virker.
 */
import { prng } from "./prosess-kit";
import { smoothPath } from "./isbre-kit";
import { r1 } from "./steg-kit";

export type P = [number, number];

/** Farger (mørkt figurkort, samme tone som de andre prosessfigurene). */
export const K = {
  tekst: "#e8eef2",
  dempet: "#9fb0bd",
  varm: "#f4a259",
  varmSterk: "#ff7a45",
  kald: "#7cc4ff",
  dyp: "#3b82f6",
  sol: "#ffd166",
  ir: "#ff6b6b",
  gronn: "#7bd88f",
  co2: "#c4a5f0",
  teal: "#5eead4",
  is: "#eef6fb",
  regn: "#93c5fd",
} as const;

export const op = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 100) / 100;

export const linjeD = (pts: P[]) => pts.map((p, i) => `${i ? "L" : "M"}${r1(p[0])} ${r1(p[1])}`).join(" ");
export const glatt = (pts: P[], lukk = false) => smoothPath(pts, lukk);

/** Lengde langs en brutt linje, og punktet ved andel t (0–1). */
export function langsPkt(pts: P[], t: number): P {
  const l: number[] = [0];
  for (let i = 1; i < pts.length; i++) l.push(l[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const tot = l[l.length - 1] || 1;
  const m = Math.max(0, Math.min(1, t)) * tot;
  for (let i = 1; i < pts.length; i++) {
    if (m <= l[i]) {
      const u = (m - l[i - 1]) / (l[i] - l[i - 1] || 1);
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u];
    }
  }
  return pts[pts.length - 1];
}

/** Kvadratisk bezier som punktliste (for buede piler). */
export function bue(a: P, k: P, b: P, n = 18): P[] {
  const out: P[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    out.push([u * u * a[0] + 2 * u * t * k[0] + t * t * b[0], u * u * a[1] + 2 * u * t * k[1] + t * t * b[1]]);
  }
  return out;
}

/**
 * Fjellprofil med fraktal ruhet: grunnform (punkter) pluss støy. Gir punktene øverst (fra venstre mot høyre).
 * Deterministisk (seed), så serverrendring og klient tegner likt.
 */
export function ruProfil(grunn: P[], seed: number, steg = 6, amp = 7): P[] {
  const rnd = prng(seed);
  const ut: P[] = [];
  for (let i = 0; i < grunn.length - 1; i++) {
    const [x0, y0] = grunn[i];
    const [x1, y1] = grunn[i + 1];
    const n = Math.max(1, Math.round((x1 - x0) / steg));
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const y = y0 + (y1 - y0) * t;
      ut.push([x0 + (x1 - x0) * t, y + (rnd() - 0.5) * amp + (rnd() - 0.5) * amp * 0.5]);
    }
  }
  ut.push(grunn[grunn.length - 1]);
  return ut;
}

/** y på en profil ved x (lineært mellom punktene). */
export function yPaa(pr: P[], x: number) {
  if (x <= pr[0][0]) return pr[0][1];
  for (let i = 1; i < pr.length; i++) if (x <= pr[i][0]) {
    const [x0, y0] = pr[i - 1];
    const [x1, y1] = pr[i];
    return y0 + (y1 - y0) * ((x - x0) / (x1 - x0 || 1));
  }
  return pr[pr.length - 1][1];
}

/** Glatt lukket flate under en profil ned til bunn-y. */
export const flateUnder = (pr: P[], bunn: number) => `${linjeD(pr)} L${r1(pr[pr.length - 1][0])} ${bunn} L${r1(pr[0][0])} ${bunn} Z`;

