/** Farger, viewBox og små hjelpere som deles av figurene i Værkatastrofer. */
import { r1 } from "./steg-kit";
import type { P } from "./steg-figur";

export const F = {
  himmel: "#0f1d29",
  linje: "#4b6275",
  tekst: "#e8eef2",
  dempet: "#9fb0bd",
  varm: "#e8a46a",
  kald: "#7cb8e8",
  hav: "#173a4f",
  havVarm: "#7a4a2a",
  sky: "#cfd8e0",
  teal: "#5eead4",
  trykk: "#7cc4ff",
  vind: "#fca5a5",
  lilla: "#c4a5f0",
  is: "#e6f2fa",
  land: "#55604f",
  landKant: "#8e9784",
};

export const VB = "0 0 960 540";

/* ---------- hjelpere ---------- */

export const linje = (pts: P[]) => pts.map((p, i) => `${i ? "L" : "M"}${r1(p[0])} ${r1(p[1])}`).join(" ");

/** Punkt en andel t (0–1) langs en brutt linje. */
export function langs(pts: P[], t: number): P {
  const len: number[] = [];
  let tot = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    len.push(d);
    tot += d;
  }
  let rest = ((t % 1) + 1) % 1 * tot;
  for (let i = 0; i < len.length; i++) {
    if (rest <= len[i]) {
      const u = len[i] ? rest / len[i] : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u];
    }
    rest -= len[i];
  }
  return pts[pts.length - 1];
}
