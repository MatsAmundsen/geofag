export type SkyKind = "sol" | "sky" | "regn" | "sno" | "uvaer";

export function drawSky(ctx: CanvasRenderingContext2D, x: number, y: number, kind: SkyKind, size = 14) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#e8e2d6";
  ctx.fillStyle = "#e8e2d6";
  ctx.lineWidth = Math.max(1.2, size / 10);
  ctx.lineCap = "round";
  if (kind === "sol") sun(ctx, size);
  else if (kind === "sno") {
    cloud(ctx, size * 0.7, -size * 0.15);
    snow(ctx, size * 0.45, size * 0.42);
  } else if (kind === "regn" || kind === "uvaer") {
    cloud(ctx, size * 0.72, -size * 0.18);
    rain(ctx, size * 0.4, size * 0.38, kind === "uvaer");
  } else cloud(ctx, size * 0.8, 0);
  ctx.restore();
}

function sun(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * size * 0.42, Math.sin(a) * size * 0.42);
    ctx.lineTo(Math.cos(a) * size * 0.62, Math.sin(a) * size * 0.62);
    ctx.stroke();
  }
}

function cloud(ctx: CanvasRenderingContext2D, size: number, y: number) {
  ctx.beginPath();
  ctx.arc(-size * 0.28, y, size * 0.28, 0, Math.PI * 2);
  ctx.arc(0, y - size * 0.12, size * 0.36, 0, Math.PI * 2);
  ctx.arc(size * 0.32, y, size * 0.26, 0, Math.PI * 2);
  ctx.fill();
}

function rain(ctx: CanvasRenderingContext2D, size: number, y: number, heavy: boolean) {
  ctx.strokeStyle = heavy ? "#7eb6cc" : "#c5d7df";
  const n = heavy ? 4 : 3;
  for (let i = 0; i < n; i++) {
    const x = (i - (n - 1) / 2) * size * 0.42;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size * 0.18, y + size * 0.55);
    ctx.stroke();
  }
}

function snow(ctx: CanvasRenderingContext2D, size: number, y: number) {
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * size * 0.7;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.28, y);
    ctx.lineTo(x + size * 0.28, y);
    ctx.moveTo(x, y - size * 0.28);
    ctx.lineTo(x, y + size * 0.28);
    ctx.stroke();
  }
}
