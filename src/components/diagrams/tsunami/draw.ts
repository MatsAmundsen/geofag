import { useEffect, useRef, type RefObject } from "react";
import { useInView, useReducedMotion } from "./util";
import { ink } from "./sim/palette";

export function fitCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height };
}

export function clearPaper(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = ink.paper;
  ctx.fillRect(0, 0, w, h);
}

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Felles animasjonssløyfe for M1–M3. Simulerer bare mens modellen spilles og er synlig.
 * Ved redusert bevegelse tegnes det to ganger i sekundet, med tilsvarende større tidssteg,
 * så modellen fortsatt kan følges trinnvis. `frame` får hvor mange vanlige bilder som skal tas igjen,
 * og returnerer `false` når simuleringen er ferdig.
 */
export function useSimLoop(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  playing: boolean,
  frame: (frames: number) => boolean | void,
  paint: () => void,
) {
  const inView = useInView(canvasRef);
  const reduce = useReducedMotion();
  const frameRef = useRef(frame);
  const paintRef = useRef(paint);
  frameRef.current = frame;
  paintRef.current = paint;

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || typeof ResizeObserver === "undefined") return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => paintRef.current());
    });
    ro.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef]);

  // Tegn på nytt etter hver endring når modellen står stille.
  useEffect(() => {
    if (playing) return;
    const raf = requestAnimationFrame(() => paintRef.current());
    return () => cancelAnimationFrame(raf);
  });

  useEffect(() => {
    if (!playing || !inView) {
      const raf = requestAnimationFrame(() => paintRef.current());
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    let last = -1;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (reduce && last >= 0 && t - last < 500) return;
      last = t;
      const more = frameRef.current(reduce ? 30 : 1);
      paintRef.current();
      if (more === false) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, reduce]);

  return { reduce, inView };
}
