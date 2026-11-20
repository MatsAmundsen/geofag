/**
 * Felles tegnesaker for modellene i geografi kap. 5 (Vær, klima og klimaendringer): himmel, skyer,
 * terreng, hav, piler og stråling som bølger. Alt er SVG og konstruert (ikke målestokk).
 * Hver figur importerer bare det den trenger; modulen er liten og lastes sammen med figurene (lat).
 */
import { memo, type ReactNode } from "react";
import { prng } from "./prosess-kit";
import { r1 } from "./steg-kit";
import { K, linjeD, langsPkt, op, yPaa, type P } from "./klima-modell-geo";

/** Pil langs en punktliste, med pilspiss som polygon (blir tydelig også når streken tykkes på smal skjerm). */
export function Pil({
  pts,
  farge,
  w = 4,
  dash,
  opacity = 1,
  kant = true,
  spiss = true,
}: {
  pts: P[];
  farge: string;
  w?: number;
  dash?: string;
  opacity?: number;
  kant?: boolean;
  spiss?: boolean;
}) {
  if (pts.length < 2 || opacity <= 0.01) return null;
  const n = pts.length;
  const a = pts[n - 2];
  const b = pts[n - 1];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const h = 9 + w * 2.2;
  const hals: P = [b[0] - ux * h * 0.8, b[1] - uy * h * 0.8];
  const kropp = spiss ? [...pts.slice(0, n - 1), hals] : pts;
  const d = linjeD(kropp);
  const tri = `${r1(b[0] + ux * 2)},${r1(b[1] + uy * 2)} ${r1(b[0] - ux * h - uy * h * 0.62)},${r1(b[1] - uy * h + ux * h * 0.62)} ${r1(b[0] - ux * h + uy * h * 0.62)},${r1(b[1] - uy * h - ux * h * 0.62)}`;
  return (
    <g aria-hidden="true" opacity={op(opacity)}>
      {kant ? <path d={d} fill="none" stroke="#06121c" strokeOpacity={0.55} strokeWidth={w + 3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} data-nocheck="" /> : null}
      <path d={d} fill="none" stroke={farge} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} />
      {spiss ? <polygon points={tri} fill={farge} stroke="#06121c" strokeOpacity={0.5} strokeWidth={1} data-nocheck="" /> : null}
    </g>
  );
}

/** Prikker som vandrer langs en bane (strømning). `fase` 0–1 går rundt; reduced motion gir faste prikker. */
export function Strom({ pts, farge, antall = 5, fase, r = 4.5, opacity = 1 }: { pts: P[]; farge: string; antall?: number; fase: number; r?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g aria-hidden="true" opacity={op(opacity)}>
      {Array.from({ length: antall }, (_, i) => {
        const t = (fase + i / antall) % 1;
        const p = langsPkt(pts, t);
        const kant = Math.min(1, t * 6, (1 - t) * 6);
        return <circle key={i} cx={r1(p[0])} cy={r1(p[1])} r={r} fill={farge} opacity={op(0.35 + 0.65 * kant)} stroke="#06121c" strokeOpacity={0.4} strokeWidth={1} data-nocheck="" />;
      })}
    </g>
  );
}

/** Bølgelinje fra a til b (stråling). `fase` flytter bølgen framover. Spiss i enden. */
export function Bolge({ a, b, farge, amp = 6, lambda = 22, fase = 0, w = 3, opacity = 1, spiss = true }: { a: P; b: P; farge: string; amp?: number; lambda?: number; fase?: number; w?: number; opacity?: number; spiss?: boolean }) {
  if (opacity <= 0.01) return null;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const n = Math.max(8, Math.round(l / 4));
  const pts: P[] = [];
  const hode = spiss ? 14 : 0;
  for (let i = 0; i <= n; i++) {
    const s = (i / n) * (l - hode);
    const demp = Math.min(1, s / 12, (l - hode - s) / 12 + 0.4);
    const o = Math.sin(((s - fase * lambda) / lambda) * Math.PI * 2) * amp * demp;
    pts.push([a[0] + ux * s - uy * o, a[1] + uy * s + ux * o]);
  }
  const e: P = [a[0] + ux * l, a[1] + uy * l];
  const h0: P = [a[0] + ux * (l - hode), a[1] + uy * (l - hode)];
  return (
    <g aria-hidden="true" opacity={op(opacity)}>
      <path d={linjeD(pts)} fill="none" stroke="#06121c" strokeOpacity={0.45} strokeWidth={w + 2.5} strokeLinecap="round" strokeLinejoin="round" data-nocheck="" />
      <path d={linjeD(pts)} fill="none" stroke={farge} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {spiss ? (
        <polygon
          points={`${r1(e[0])},${r1(e[1])} ${r1(h0[0] - uy * 7)},${r1(h0[1] + ux * 7)} ${r1(h0[0] + uy * 7)},${r1(h0[1] - ux * 7)}`}
          fill={farge}
          data-nocheck=""
        />
      ) : null}
    </g>
  );
}

/**
 * Sky av overlappende kuler med lys topp og mørkere bunn. `id` er prefikset for gradientene i <KlimaDefs>.
 * `regn` 0–1 tegner regnstriper under skya.
 */
export function Sky({ x, y, s = 1, id, opacity = 1, regn = 0, fase = 0, mork = 0 }: { x: number; y: number; s?: number; id: string; opacity?: number; regn?: number; fase?: number; mork?: number }) {
  if (opacity <= 0.01) return null;
  const kuler: [number, number, number][] = [
    [-46, 8, 26], [-22, -6, 32], [8, -16, 38], [40, -4, 30], [62, 10, 22], [-60, 16, 18], [20, 10, 30], [-10, 12, 28],
  ];
  return (
    <g aria-hidden="true" opacity={op(opacity)} transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      {regn > 0.01 ? (
        <g opacity={op(regn)} data-nocheck="">
          {Array.from({ length: 14 }, (_, i) => {
            const rx = -58 + i * 9;
            const off = ((fase * 70 + i * 23) % 40) - 6;
            return <line key={i} x1={rx} y1={28 + off} x2={rx - 8} y2={58 + off} stroke={K.regn} strokeWidth={2.4} strokeLinecap="round" opacity={0.85} />;
          })}
        </g>
      ) : null}
      <ellipse cx={4} cy={30} rx={76} ry={10} fill="#0b1520" opacity={0.25} data-nocheck="" />
      {kuler.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#${id}-sky)`} data-nocheck="" />
      ))}
      <path d="M-78 24 Q 4 36 84 22 L 84 30 Q 4 44 -78 32 Z" fill={`url(#${id}-skybunn)`} opacity={0.6 + 0.4 * mork} data-nocheck="" />
    </g>
  );
}

/** Gradienter som Sky og andre bruker. Legges én gang i hver figur. */
export function KlimaDefs({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <defs>
      <radialGradient id={`${id}-sky`} cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#dfe7ee" />
        <stop offset="100%" stopColor="#9fb0c0" />
      </radialGradient>
      <linearGradient id={`${id}-skybunn`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8494a6" stopOpacity="0" />
        <stop offset="100%" stopColor="#5b6b7d" />
      </linearGradient>
      <radialGradient id={`${id}-sol`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff7d6" />
        <stop offset="35%" stopColor="#ffd166" />
        <stop offset="70%" stopColor="#ffb703" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-myk`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      {children}
    </defs>
  );
}

/** Sol med glorie. */
export function Sol({ x, y, r = 34, id, opacity = 1 }: { x: number; y: number; r?: number; id: string; opacity?: number }) {
  return (
    <g aria-hidden="true" opacity={op(opacity)}>
      <circle cx={x} cy={y} r={r * 2.6} fill={`url(#${id}-sol)`} data-nocheck="" />
      <circle cx={x} cy={y} r={r} fill="#ffe08a" data-nocheck="" />
      <circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.55} fill="#fff4c2" opacity={0.8} data-nocheck="" />
    </g>
  );
}

/** Trær (gran/løv) langs en profil. Memo: tegnes ikke på nytt hvert bilde. */
export const Skog = memo(function Skog({ pr, fra, til, tett = 16, seed = 3, h = 26, farge = "#2f6b45" }: { pr: P[]; fra: number; til: number; tett?: number; seed?: number; h?: number; farge?: string }) {
  const rnd = prng(seed);
  const trar: ReactNode[] = [];
  for (let x = fra; x <= til; x += tett * (0.7 + rnd() * 0.6)) {
    const y = yPaa(pr, x) + 2;
    const hh = h * (0.75 + rnd() * 0.5);
    const b = hh * 0.36;
    trar.push(
      <g key={x}>
        <rect x={r1(x - 1.2)} y={r1(y - hh * 0.25)} width={2.4} height={r1(hh * 0.28)} fill="#3b2a1e" data-nocheck="" />
        <polygon points={`${r1(x)},${r1(y - hh)} ${r1(x - b)},${r1(y - hh * 0.2)} ${r1(x + b)},${r1(y - hh * 0.2)}`} fill={farge} data-nocheck="" />
        <polygon points={`${r1(x)},${r1(y - hh)} ${r1(x + b)},${r1(y - hh * 0.2)} ${r1(x + b * 0.15)},${r1(y - hh * 0.2)}`} fill="#000" opacity={0.18} data-nocheck="" />
      </g>,
    );
  }
  return <g aria-hidden="true">{trar}</g>;
});

/**
 * Kvalitative målere under tegningen (HTML, lesbare også på 390 px): stolpe uten tall og en kort tekst.
 * Skjermlesere får teksten, ikke stolpen.
 */
export function Maalere({ rader }: { rader: { navn: string; verdi: number; farge: string; tekst: string }[] }) {
  return (
    <div className="mt-2 grid gap-2 min-[560px]:grid-cols-2">
      {rader.map((r) => (
        <div key={r.navn} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="flex items-baseline justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-200">{r.navn}</span>
            <span className="text-slate-300">{r.tekst}</span>
          </div>
          <div aria-hidden="true" className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
            <div className="h-full rounded-full" style={{ width: `${Math.round(Math.max(0.04, Math.min(1, r.verdi)) * 100)}%`, background: r.farge }} />
          </div>
        </div>
      ))}
    </div>
  );
}
