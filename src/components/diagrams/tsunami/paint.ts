import { ink } from "./sim/palette";

export function skyTo(ctx: CanvasRenderingContext2D, w: number, horizon: number) {
  const g = ctx.createLinearGradient(0, 0, 0, Math.max(horizon, 1));
  g.addColorStop(0, ink.skyTop);
  g.addColorStop(1, ink.skyLow);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, horizon);
}

export function paintRock(
  ctx: CanvasRenderingContext2D,
  bed: { x: number; y: number }[],
  bottom: number,
) {
  if (bed.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(bed[0].x, bottom);
  for (const p of bed) ctx.lineTo(p.x, p.y);
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
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = 1;
  const left = bed[0].x;
  const right = bed[bed.length - 1].x;
  for (let y = y0 + 14; y < bottom; y += 11) {
    ctx.beginPath();
    const warp = 3 * Math.sin(y * 0.08);
    ctx.moveTo(left, y + warp);
    ctx.lineTo(right, y - warp);
    ctx.stroke();
  }
  ctx.restore();
}

export function paintWaterColumn(
  ctx: CanvasRenderingContext2D,
  surf: { x: number; y: number }[],
  bed: { x: number; y: number }[],
) {
  if (surf.length < 2 || bed.length < 2) return;
  let yTop = surf[0].y;
  let yBot = bed[0].y;
  ctx.beginPath();
  ctx.moveTo(surf[0].x, surf[0].y);
  for (const p of surf) {
    ctx.lineTo(p.x, p.y);
    if (p.y < yTop) yTop = p.y;
  }
  for (let i = bed.length - 1; i >= 0; i--) {
    ctx.lineTo(bed[i].x, bed[i].y);
    if (bed[i].y > yBot) yBot = bed[i].y;
  }
  ctx.closePath();
  const g = ctx.createLinearGradient(0, yTop, 0, yBot);
  g.addColorStop(0, ink.waterTop);
  g.addColorStop(0.12, ink.seaLite);
  g.addColorStop(0.45, ink.waterMid);
  g.addColorStop(1, ink.waterDeep);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(surf[0].x, surf[0].y);
  for (const p of surf) ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export function caption(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  ctx.font = "12px Source Sans 3, sans-serif";
  ctx.fillStyle = ink.muted;
  ctx.fillText(text, x, y);
}
