/**
 * Terreng-kit (komponenter): nøkkelbilder i canvas, terrenglerret i SVG, høydeprofil og flytstrøk.
 * Logikken (nett, høyder, tegning) ligger i terreng-kit.ts.
 *
 * Terrenget tegnes ikke på nytt for hvert bilde. For hver fase lages noen få nøkkelbilder (canvas),
 * lat og i ledige øyeblikk, delt opp i små biter, så ingen oppgave blir lang. Mellom to nøkkelbilder
 * krysstones de (to drawImage per bilde). Det som beveger seg hele tiden (is som flyter, steiner),
 * er få, billige SVG-stier oppå. Lageret for nøkkelbildene ligger i terreng-nokkelbilder.ts.
 */
import { useLayoutEffect, useRef } from "react";
import { clamp, smoothPath } from "./isbre-kit";

/* ---------- lerret ---------- */

/**
 * Canvas i SVG-en (foreignObject), med krysstoning mellom to nøkkelbilder. Bare det synlige
 * lerretet ligger i DOM-en: én node i stedet for tusenvis av stier.
 */
export function TerrengLerret({
  x,
  y,
  bredde,
  hoyde,
  skala,
  a,
  b,
  vekt,
}: {
  x: number;
  y: number;
  bredde: number;
  hoyde: number;
  skala: number;
  a: HTMLCanvasElement | null;
  b: HTMLCanvasElement | null;
  /** 0 = bare a, 1 = bare b. */
  vekt: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const dpr = Math.min(1.5, typeof window === "undefined" ? 1 : window.devicePixelRatio || 1);
  const pw = Math.max(1, Math.round(bredde * skala * dpr));
  const ph = Math.max(1, Math.round(hoyde * skala * dpr));
  useLayoutEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    const w = clamp(vekt);
    if (a && w < 0.995) {
      ctx.globalAlpha = 1;
      ctx.drawImage(a, 0, 0, c.width, c.height);
    }
    if (b && (w > 0.005 || !a)) {
      ctx.globalAlpha = a ? w : 1;
      ctx.drawImage(b, 0, 0, c.width, c.height);
    }
    ctx.globalAlpha = 1;
  }, [a, b, vekt, pw, ph]);
  return (
    <foreignObject x={x} y={y} width={bredde} height={hoyde} data-nocheck="" aria-hidden="true">
      <canvas ref={ref} width={pw} height={ph} style={{ width: "100%", height: "100%", display: "block" }} />
    </foreignObject>
  );
}

/* ---------- høydeprofil ---------- */

export type ProfilLag = { punkter: [number, number][]; fyll: string; strek?: string };

/**
 * 2D-snitt: berg (og is oppå) fylt mot bunnen av rammen. `punkter` er [x, y] i SVG-koordinater.
 * Etikettene står under eller over profilen, med kort strek.
 */
export function Hoydeprofil({
  ramme,
  lag,
  etiketter,
  fs,
  ender,
}: {
  ramme: { x: number; y: number; w: number; h: number };
  lag: ProfilLag[];
  etiketter: { tekst: string; x: number; y: number; ty: number; farge: string; anker?: "start" | "middle" | "end" }[];
  fs: number;
  ender: [string, string];
}) {
  const bunn = ramme.y + ramme.h;
  return (
    <g data-profil="">
      <rect x={ramme.x} y={ramme.y} width={ramme.w} height={ramme.h} rx="6" fill="#101b22" stroke="#e8eef2" strokeOpacity="0.25" />
      {lag.map((l, i) => {
        const p = l.punkter;
        if (p.length < 2) return null;
        const topp = smoothPath(p);
        return (
          <g key={i}>
            <path d={`${topp} L${p[p.length - 1][0].toFixed(1)} ${bunn} L${p[0][0].toFixed(1)} ${bunn} Z`} fill={l.fyll} />
            {l.strek ? <path d={topp} fill="none" stroke={l.strek} strokeWidth="1.6" /> : null}
          </g>
        );
      })}
      <text x={ramme.x + 8} y={ramme.y + fs + 2} fontSize={fs} fontWeight={700} fill="#e8eef2">
        {ender[0]}
      </text>
      <text x={ramme.x + ramme.w - 8} y={ramme.y + fs + 2} fontSize={fs} fontWeight={700} fill="#e8eef2" textAnchor="end">
        {ender[1]}
      </text>
      {etiketter.map((e) => (
        <g key={e.tekst}>
          <line x1={e.x} y1={e.y} x2={e.x} y2={e.ty + (e.ty > e.y ? -fs : 4)} stroke={e.farge} strokeWidth="1.2" />
          <text x={e.x} y={e.ty} fontSize={fs} fontWeight={700} fill={e.farge} textAnchor={e.anker ?? "middle"} paintOrder="stroke" stroke="#101b22" strokeWidth="3">
            {e.tekst}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ---------- flytstrøk ---------- */

/**
 * Bevegelige strøk langs faste baner (is som flyter, elv, bølger). Banene er ferdige SVG-punkter;
 * bare stroke-dashoffset endres med tiden, så det koster nesten ingenting per bilde.
 */
export function Flytstrok({
  baner,
  sek,
  fart = 14,
  farge,
  bredde = 1.6,
  opasitet = 1,
}: {
  baner: [number, number][][];
  sek: number;
  fart?: number;
  farge: string;
  bredde?: number;
  opasitet?: number;
}) {
  return (
    <g opacity={opasitet} data-nocheck="" aria-hidden="true">
      {baner.map((b, i) => (
        <path
          key={i}
          d={smoothPath(b)}
          fill="none"
          stroke={farge}
          strokeWidth={bredde}
          strokeLinecap="round"
          strokeDasharray="10 12"
          strokeDashoffset={(-(sek * fart) + i * 7) % 22}
        />
      ))}
    </g>
  );
}
