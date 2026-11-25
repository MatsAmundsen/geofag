/** Geometri for figur 11.6 (migrantkorridorer). Ren funksjon, så den kan testes uten React. */

/** Radius på nummermarkørene. Med fontSize 13 i viewBox-bredde 600 blir tallene minst ca. 12 CSS-px
 *  ved 390 px skjermbredde, fordi rulleramma er minst 560 px bred (13 × 560/600 ≈ 12,1). */
export const MARKOR_R = 9;
export const MARKOR_FONT = 13;
export const VIEWBOX_BREDDE = 600;
export const MIN_BREDDE_PX = 560;

/** Markører som står ved siden av pila, med en tynn strek: korte piler (2, 3, 7, 10) som markøren ellers
 *  ville dekket, og 5, som ellers lå oppå pil 6 (begge starter i India). */
export const MARKOR_FLYTT: Record<number, [number, number]> = { 2: [601, 146], 3: [558, 122], 5: [604, 189], 7: [302, 265], 10: [515, 158] };

export type Korridor = { nr: number; fx: number; fy: number; tx: number; ty: number };

/** Kurve og markørplass for én korridor. Tur og retur mellom samme landpar (4 og 8) bøyes til hver sin
 *  side av den rette linja, slik at både pilene og markørene skilles. De andre beholder buen oppover. */
export function korridorGeometri(k: Korridor, alle: readonly Korridor[]) {
  const retur = alle.some(
    (a) => a.nr !== k.nr && a.fx === k.tx && a.fy === k.ty && a.tx === k.fx && a.ty === k.fy,
  );
  const lengde = Math.hypot(k.tx - k.fx, k.ty - k.fy);
  const sx = (k.fx + k.tx) / 2;
  const sy = (k.fy + k.ty) / 2;
  let qx: number;
  let qy: number;
  if (retur) {
    // Venstre normal i fartsretningen; motsatt retning gir automatisk motsatt side.
    const bue = 24;
    qx = sx + ((k.ty - k.fy) / lengde) * bue;
    qy = sy - ((k.tx - k.fx) / lengde) * bue;
  } else {
    qx = sx;
    qy = sy - Math.min(40, lengde * 0.25);
  }
  // Punktet midt på den kvadratiske kurven (t = 0,5).
  const kx = (sx + qx) / 2;
  const ky = (sy + qy) / 2;
  const flytt = MARKOR_FLYTT[k.nr];
  return {
    d: `M${k.fx} ${k.fy} Q${qx} ${qy} ${k.tx} ${k.ty}`,
    cx: flytt ? flytt[0] : kx,
    cy: flytt ? flytt[1] : ky,
    lx: flytt ? kx : undefined,
    ly: flytt ? ky : undefined,
  };
}
