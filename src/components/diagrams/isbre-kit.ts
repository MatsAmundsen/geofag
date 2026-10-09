/**
 * Felles hjelpefunksjoner og hooks for isbre-figurene (Geofag 1: Isbreer og landformer).
 * Komponentene (IsbreFigur, StegVelger, Skyver, Polys) ligger i isbre-figur.tsx.
 *
 * - `IsbreFigur` tegner figuren uten sidescroll. På smal skjerm blir tekstetikettene
 *   byttet ut med nummermerker i figuren og en lesbar liste under, slik at hele
 *   figuren er synlig på mobil.
 * - `SceneDefs` gir felles fyll for berg, is, snø, vann, morene, breelvmateriale, leire,
 *   litosfære og astenosfære, slik at alle figurene får samme stil.
 * - `useStepClock` gir steg + framdrift innen steget (0–1), styrt av Start/Pause.
 * - `heightfield` tegner et skrått terrengblokk-utsnitt med lyssetting.
 */
import {
  createContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { C } from "./svg-kit";

/** CSS-piksler per viewBox-enhet. 0 før figuren er målt. IsbreFigur setter verdien. */
export const FigureScale = createContext(0);

/**
 * Skriftstørrelse i viewBox-enheter, minst 12 CSS-piksler når skalaen er kjent.
 * Uten dette blir 14 enheter omtrent 11,8 px når figuren er 960 enheter bred i spalten.
 */
export const figureFont = (size: number, scale: number) => {
  if (!(scale > 0)) return size;
  const raw = Math.max(size, 12 / scale);
  let out = Math.round(raw * 10) / 10;
  // Avrunding ned kan lande på 11,9 px. Da rundes opp, så teksten er minst 12 CSS-piksler.
  if (out * scale < 11.95) out = Math.ceil((raw + 1e-6) * 10) / 10;
  return out;
};

/* ---------- palett ---------- */

export const P = {
  skyTop: "#0d1820",
  skyLow: "#18303d",
  rock: "#6d7468",
  rockDark: "#3b4239",
  rockLight: "#8b9184",
  grass: "#55664b",
  ice: "#d9eaf5",
  iceDeep: "#9cc0d8",
  iceLine: "#7ea7c3",
  crevasse: "#3f6f92",
  snow: "#f5f9fb",
  water: "#2f7699",
  waterDeep: "#123c55",
  moraine: "#8d7d66",
  outwash: "#c8b386",
  clay: "#8f8775",
  litho: "#5d6a5c",
  astheno: "#7b4f37",
  asthenoDeep: "#4a2c1f",
  erratic: "#b9a27c",
  label: C.fg,
  halo: "#0b1318",
};

/* ---------- små verktøy ---------- */

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};
export function pts(list: [number, number][]) {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}
/** Glatt sti gjennom punktene (Catmull-Rom → Bézier). */
export function smoothPath(list: [number, number][], close = false) {
  if (list.length < 2) return "";
  const p = list;
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return close ? `${d} Z` : d;
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
export function mixHex(a: string, b: string, t: number) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  const k = clamp(t);
  return `rgb(${Math.round(lerp(x[0], y[0], k))},${Math.round(lerp(x[1], y[1], k))},${Math.round(lerp(x[2], y[2], k))})`;
}
export function shadeRgb(rgb: [number, number, number], f: number) {
  return `rgb(${Math.round(clamp(rgb[0] * f, 0, 255))},${Math.round(clamp(rgb[1] * f, 0, 255))},${Math.round(clamp(rgb[2] * f, 0, 255))})`;
}
export { hexToRgb };

/* ---------- hooks ---------- */

function subscribeNarrow(onChange: () => void) {
  const media = window.matchMedia("(max-width: 639px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
/** Smal skjerm (under Tailwinds sm-grense). */
export function useNarrow() {
  return useSyncExternalStore(
    subscribeNarrow,
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );
}

/**
 * Bredden (CSS-piksler) til et element, målt med ResizeObserver. 0 før første måling
 * (og under serverrendering), slik at kallestedet kan falle tilbake på vindusbredden.
 */
export function useBoxWidth<T extends Element>(): [RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(Math.round(el.getBoundingClientRect().width));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

/** Er figuren på skjermen? Animasjonen går bare da. */
export function useInView<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      {
        rootMargin: "120px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/**
 * Steg med framdrift. `phase` går fra 0 til 1 i løpet av et steg mens animasjonen spiller.
 * Når brukeren velger et steg, vises sluttbildet (phase = 1); bruk `pickStep` så animasjonen
 * samtidig settes på pause.
 */
export function useStepClock(
  count: number,
  running: boolean,
  stepMs: number,
  holdMs = 900,
  initialStep = 1,
) {
  const [state, setState] = useState({ step: clamp(initialStep, 1, count), phase: 1, loops: 0 });
  const total = stepMs + holdMs;
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      acc += dt;
      if (acc >= 33) {
        const add = acc;
        acc = 0;
        setState((s) => {
          const ms = s.phase * stepMs + add;
          if (ms >= total)
            return {
              step: s.step >= count ? 1 : s.step + 1,
              phase: 0,
              loops: s.step >= count ? s.loops + 1 : s.loops,
            };
          return { step: s.step, phase: Math.min(ms / stepMs, total / stepMs), loops: s.loops };
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, count, stepMs, total]);
  const setStep = (step: number) => setState((s) => ({ step, phase: 1, loops: s.loops }));
  return { step: state.step, phase: Math.min(1, state.phase), loops: state.loops, setStep };
}

/** Brukeren velger et steg: vis steget og sett animasjonen på pause hvis den spiller. */
export function pickStep(
  clock: { setStep: (step: number) => void },
  motion: { playing: boolean; toggle: () => void },
) {
  return (step: number) => {
    clock.setStep(step);
    if (motion.playing) motion.toggle();
  };
}

/** Løpende tid i sekunder mens `running` er sann (brukes til partikler og strømmer). */
export function useTicker(running: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      acc += Math.min(100, now - last);
      last = now;
      if (acc >= 33) {
        const add = acc / 1000;
        acc = 0;
        setT((v) => v + add);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
  return t;
}

/* ---------- terrengblokk (skrå projeksjon) ---------- */

export type Proj = (x: number, y: number, z: number) => [number, number];

export function obliqueProj(
  ox: number,
  oy: number,
  sx: number,
  kx: number,
  ky: number,
  kz: number,
): Proj {
  return (x, y, z) => [ox + x * sx + y * kx, oy - y * ky - z * kz];
}

export type Poly = { d: string; fill: string };

/**
 * Tegner et høydefelt h(x, y) som fargede firkanter, bakerst først.
 * `colorAt` får posisjon, høyde og helning og returnerer en grunnfarge [r, g, b], eller null for å hoppe over.
 */
export function heightfield({
  nx,
  ny,
  W,
  D,
  h,
  colorAt,
  proj,
  light = [-0.55, 0.45, 0.7],
  ambient = 0.42,
}: {
  nx: number;
  ny: number;
  W: number;
  D: number;
  h: (x: number, y: number) => number;
  colorAt: (x: number, y: number, z: number, slope: number) => [number, number, number] | null;
  proj: Proj;
  light?: [number, number, number];
  ambient?: number;
}): Poly[] {
  const dx = W / nx;
  const dy = D / ny;
  const Z: number[][] = [];
  for (let j = 0; j <= ny; j++) {
    const row: number[] = [];
    for (let i = 0; i <= nx; i++) row.push(h(i * dx, j * dy));
    Z.push(row);
  }
  const ln = Math.hypot(...light);
  const L = light.map((v) => v / ln);
  const out: Poly[] = [];
  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      const z00 = Z[j][i];
      const z10 = Z[j][i + 1];
      const z01 = Z[j + 1][i];
      const z11 = Z[j + 1][i + 1];
      const gx = (z10 + z11 - z00 - z01) / (2 * dx);
      const gy = (z01 + z11 - z00 - z10) / (2 * dy);
      const n = [-gx, -gy, 1];
      const nl = Math.hypot(n[0], n[1], n[2]);
      const lam = Math.max(0, (n[0] * L[0] + n[1] * L[1] + n[2] * L[2]) / nl);
      const x = (i + 0.5) * dx;
      const y = (j + 0.5) * dy;
      const z = (z00 + z10 + z01 + z11) / 4;
      const base = colorAt(x, y, z, Math.hypot(gx, gy));
      if (!base) continue;
      const f = ambient + (1 - ambient) * lam * 1.25;
      const c = [
        proj(i * dx, j * dy, z00),
        proj((i + 1) * dx, j * dy, z10),
        proj((i + 1) * dx, (j + 1) * dy, z11),
        proj(i * dx, (j + 1) * dy, z01),
      ];
      out.push({
        d: `M${c.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}Z`,
        fill: shadeRgb(base, f),
      });
    }
  }
  return out;
}
