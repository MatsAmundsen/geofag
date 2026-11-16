/**
 * Geometri for vulkanprofilene: skjoldvulkan, stratovulkan og sinderkjegle.
 *
 * Profilene regnes ut fra helning i grader, slik at en skjoldvulkan faktisk
 * blir slak (2–10°) og en stratovulkan bratt i toppen (ca. 30–35°).
 */
export type Pt = [number, number];

const deg = (a: number) => (a * Math.PI) / 180;

function r1(n: number) {
  return Math.round(n * 10) / 10;
}

/** Høyde over basen ved avstand d fra senteret, for en gitt profiltype. */
function heightAt(kind: "shield" | "strato" | "cinder", t: number, H: number) {
  const u = Math.min(1, Math.max(0, t));
  if (kind === "shield") return H * (1 - Math.pow(u, 1.5)); // svakt konveks
  if (kind === "cinder") return H * (1 - u); // rett, nær rasvinkel
  // Konkav profil: brattest i toppen, slakere ned mot foten.
  return H * (0.72 * Math.pow(1 - u, 2) + 0.28 * (1 - u));
}

export type ProfileSpec = {
  kind: "shield" | "strato" | "cinder";
  cx: number;
  baseY: number;
  /** Halv bredde ved foten (px). */
  halfWidth: number;
  /** Høyde fra fot til kraterkant (px). */
  height: number;
  /** Halv bredde på krateret (px). */
  crater: number;
  /** Hvor dypt krateret er (px). */
  craterDepth?: number;
};

/** Overflatepunkter fra venstre fot til høyre fot (uten krater). */
export function flankPoints(spec: ProfileSpec, n = 36): { left: Pt[]; right: Pt[] } {
  const { kind, cx, baseY, halfWidth: W, height: H, crater: c } = spec;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n; // 0 = fot, 1 = kraterkant
    const d = W - t * (W - c);
    const y = baseY - heightAt(kind, 1 - t, H);
    left.push([cx - d, y]);
    right.unshift([cx + d, y]);
  }
  return { left, right };
}

/** Lukket profilsti med krater. */
export function profilePath(spec: ProfileSpec): string {
  const { cx, baseY, height: H, crater: c, craterDepth = Math.max(2, c * 0.45) } = spec;
  const { left, right } = flankPoints(spec);
  const top = baseY - H;
  const pts = left.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L ");
  const rpts = right.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L ");
  const crater = c > 0 ? ` Q ${r1(cx)} ${r1(top + craterDepth * 2)} ${r1(cx + c)} ${r1(top)}` : "";
  return `M ${pts}${crater} L ${rpts} Z`;
}

/** Åpen flankelinje (bare overflaten), nyttig for konturer og strømmer. */
export function surfacePath(spec: ProfileSpec): string {
  return profilePath(spec).replace(/ Z$/, "");
}

/** Høyden på overflaten ved x (px), eller null utenfor vulkanen. */
export function surfaceY(spec: ProfileSpec, x: number): number | null {
  const d = Math.abs(x - spec.cx);
  if (d > spec.halfWidth) return null;
  if (d < spec.crater) return spec.baseY - spec.height;
  const t = (spec.halfWidth - d) / (spec.halfWidth - spec.crater);
  return spec.baseY - heightAt(spec.kind, 1 - t, spec.height);
}

/** Halv bredde som gir ønsket gjennomsnittlig helning (grader) for en gitt høyde. */
export function halfWidthForSlope(height: number, slopeDeg: number, crater = 0) {
  return height / Math.tan(deg(slopeDeg)) + crater;
}

/** Deterministisk «tilfeldig» tall i [0,1). */
export function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Farger for vekslende lag i en stratovulkan: størknet lava (mørk) og tefra (lys). */
export const STRATO_LAYERS = ["#4a4440", "#7a6d5c", "#413c38", "#857661", "#4e4743", "#736654", "#45403c", "#7d705e"];
/** Basaltlag i en skjoldvulkan. */
export const SHIELD_LAYERS = ["#4a4440", "#5a524b", "#433d39", "#615850", "#4d4642", "#57504a"];
