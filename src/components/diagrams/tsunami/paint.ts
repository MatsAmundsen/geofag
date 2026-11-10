import { ink } from "./sim/palette";

export const FONT = '"Source Sans 3", "Source Sans Fallback", "Segoe UI", sans-serif';
/** Minste skriftstørrelse i figurene, i CSS-piksler. */
export const LABEL_PX = 14;

export type Pt = { x: number; y: number };

export function skyTo(ctx: CanvasRenderingContext2D, w: number, horizon: number) {
  const g = ctx.createLinearGradient(0, 0, 0, Math.max(horizon, 1));
  g.addColorStop(0, ink.skyTop);
  g.addColorStop(1, ink.skyLow);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, horizon);
}

/** Glatt kurve gjennom punktene (kvadratiske midtpunktsbuer), uten knekk. */
export function smoothPath(ctx: CanvasRenderingContext2D, pts: Pt[], move = true) {
  if (pts.length === 0) return;
  if (move) ctx.moveTo(pts[0].x, pts[0].y);
  else ctx.lineTo(pts[0].x, pts[0].y);
  if (pts.length < 3) {
    for (const p of pts) ctx.lineTo(p.x, p.y);
    return;
  }
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

export function paintRock(ctx: CanvasRenderingContext2D, bed: Pt[], bottom: number) {
  if (bed.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(bed[0].x, bottom);
  smoothPath(ctx, bed, false);
  ctx.lineTo(bed[bed.length - 1].x, bottom);
  ctx.closePath();
  const y0 = bed.reduce((m, p) => Math.min(m, p.y), bottom);
  const g = ctx.createLinearGradient(0, y0, 0, bottom);
  g.addColorStop(0, ink.land);
  g.addColorStop(0.45, ink.landDark);
  g.addColorStop(1, ink.rock);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = ink.strata;
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 1;
  const left = bed[0].x;
  const right = bed[bed.length - 1].x;
  for (let y = y0 + 14; y < bottom; y += 13) {
    ctx.beginPath();
    const warp = 2.5 * Math.sin(y * 0.08);
    ctx.moveTo(left, y + warp);
    ctx.lineTo(right, y - warp);
    ctx.stroke();
  }
  ctx.restore();
  ctx.beginPath();
  smoothPath(ctx, bed);
  ctx.strokeStyle = ink.landDark;
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

export function paintWaterColumn(ctx: CanvasRenderingContext2D, surf: Pt[], bed: Pt[]) {
  if (surf.length < 2 || bed.length < 2) return;
  let yTop = surf[0].y;
  let yBot = bed[0].y;
  for (const p of surf) if (p.y < yTop) yTop = p.y;
  for (const p of bed) if (p.y > yBot) yBot = p.y;
  ctx.beginPath();
  smoothPath(ctx, surf);
  smoothPath(ctx, bed.slice().reverse(), false);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, yTop, 0, Math.max(yBot, yTop + 1));
  g.addColorStop(0, ink.waterTop);
  g.addColorStop(0.12, ink.seaLite);
  g.addColorStop(0.55, ink.waterMid);
  g.addColorStop(1, ink.waterDeep);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  smoothPath(ctx, surf);
  ctx.strokeStyle = ink.sea;
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

/** Etikett med lys kant rundt, så den kan leses oppå vann og land. Minst 14 px. */
export function label(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  opts: { color?: string; size?: number; weight?: string; align?: CanvasTextAlign; halo?: string } = {},
) {
  const size = Math.max(LABEL_PX, opts.size ?? LABEL_PX);
  ctx.font = `${opts.weight ?? "500"} ${size}px ${FONT}`;
  ctx.textAlign = opts.align ?? "left";
  ctx.textBaseline = "alphabetic";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = opts.halo ?? "rgba(247,243,234,0.92)";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = opts.color ?? ink.text;
  ctx.fillText(text, x, y);
  ctx.textAlign = "left";
}

export function textWidth(ctx: CanvasRenderingContext2D, text: string, size = LABEL_PX, weight = "500") {
  ctx.font = `${weight} ${Math.max(LABEL_PX, size)}px ${FONT}`;
  return ctx.measureText(text).width;
}

/** Tynn ledelinje fra etikett til objekt. */
export function leader(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string = ink.text) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

/** Enkel pil, for eksempel for bølgeretning. */
export function arrow(ctx: CanvasRenderingContext2D, x1: number, y: number, x2: number, color: string, width = 2) {
  const dir = Math.sign(x2 - x1) || 1;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2 - dir * 6, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y);
  ctx.lineTo(x2 - dir * 9, y - 5);
  ctx.lineTo(x2 - dir * 9, y + 5);
  ctx.closePath();
  ctx.fill();
}

export function caption(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  label(ctx, text, x, y, { color: ink.muted, weight: "400" });
}
