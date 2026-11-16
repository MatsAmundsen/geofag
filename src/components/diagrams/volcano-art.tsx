/**
 * Felles tegneverktøy for vulkanfigurene: realistiske profiler (skjoldvulkan,
 * stratovulkan, sinderkjegle), lagdeling parallelt med flankene, askeskyer med
 * bølgende kanter og naturlige gradienter for bergart, aske og glødende lava.
 *
 * Profilene regnes ut fra helning i grader, slik at en skjoldvulkan faktisk
 * blir slak (2–10°) og en stratovulkan bratt i toppen (ca. 30–35°).
 */
import type { ReactNode } from "react";
import { hash, profilePath, type ProfileSpec } from "./volcano-geometry";

function r1(n: number) {
  return Math.round(n * 10) / 10;
}

/**
 * Lag parallelt med flankene: hvert indre lag er en litt mindre kopi av
 * profilen. Tegnes utenfra og inn, så båndene ligger som skall.
 */
export function LayeredCone({
  spec,
  colors,
  layers = 7,
  clipId,
  stroke = "#1d1916",
}: {
  spec: ProfileSpec;
  colors: string[];
  layers?: number;
  clipId: string;
  stroke?: string;
}) {
  const shells: ReactNode[] = [];
  const dh = spec.height / (layers + 2);
  const dw = (spec.halfWidth - spec.crater) / (layers + 2);
  for (let k = 0; k < layers; k++) {
    const s: ProfileSpec = {
      ...spec,
      height: spec.height - k * dh,
      halfWidth: spec.halfWidth - k * dw,
      crater: Math.max(0, spec.crater * (1 - k / layers)),
      craterDepth: 0.01,
    };
    shells.push(
      <path key={k} d={profilePath(s)} fill={colors[k % colors.length]} stroke={stroke} strokeOpacity="0.35" strokeWidth="0.6" />,
    );
  }
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <path d={profilePath(spec)} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{shells}</g>
    </>
  );
}

/**
 * Bølgende askesky: et bånd av overlappende sirkler langs en sentrallinje.
 * Radius øker oppover, slik en konvektiv søyle gjør når den suger inn luft.
 */
export function BillowColumn({
  x0,
  y0,
  x1,
  y1,
  r0,
  r1: rTop,
  count = 16,
  fill,
  shade,
  seed = 1,
  opacity = 1,
}: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  r0: number;
  r1: number;
  count?: number;
  fill: string;
  shade?: string;
  seed?: number;
  opacity?: number;
}) {
  const puffs: ReactNode[] = [];
  const shades: ReactNode[] = [];
  const leftEdge: string[] = [];
  const rightEdge: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const r = r0 + (rTop - r0) * Math.pow(t, 0.85);
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t;
    leftEdge.push(`${r1(x - r * 0.85)} ${r1(y)}`);
    rightEdge.unshift(`${r1(x + r * 0.85)} ${r1(y)}`);
    // Tre «blomkålhoder» per nivå: to i kanten og ett i midten.
    for (const [k, off] of [[0, -0.55], [1, 0.55], [2, 0]] as const) {
      const h = hash(seed + i * 3 + k);
      const rr = r * (k === 2 ? 0.62 : 0.5) * (0.85 + h * 0.3);
      const px = x + off * r + (h - 0.5) * r * 0.25;
      const py = y + (hash(seed + i * 5 + k) - 0.5) * r * 0.3;
      if (shade) shades.push(<circle key={`s${i}-${k}`} cx={r1(px + rr * 0.15)} cy={r1(py + rr * 0.2)} r={r1(rr)} fill={shade} />);
      puffs.push(<circle key={`p${i}-${k}`} cx={r1(px)} cy={r1(py)} r={r1(rr * 0.92)} fill={fill} />);
    }
  }
  const body = `M ${leftEdge.join(" L ")} L ${rightEdge.join(" L ")} Z`;
  return (
    <g opacity={opacity}>
      <path d={body} fill={shade ?? fill} opacity="0.9" />
      {shades}
      {puffs}
    </g>
  );
}

/** Bølgende, flat sky (paraplysky eller askeslør). */
export function BillowSheet({
  cx,
  cy,
  halfWidth,
  thickness,
  fill,
  shade,
  seed = 7,
  count = 18,
}: {
  cx: number;
  cy: number;
  halfWidth: number;
  thickness: number;
  fill: string;
  shade?: string;
  seed?: number;
  count?: number;
}) {
  const puffs: ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = cx - halfWidth + t * halfWidth * 2;
    const edge = 1 - Math.pow(Math.abs(t - 0.5) * 2, 2.2);
    const r = thickness * (0.45 + 0.55 * edge) * (0.85 + hash(seed + i) * 0.3);
    const y = cy - r * 0.25 + (hash(seed + i * 2.3) - 0.5) * thickness * 0.3;
    if (shade) puffs.push(<circle key={`s${i}`} cx={r1(x + 2)} cy={r1(y + r * 0.22)} r={r1(r)} fill={shade} />);
    puffs.push(<circle key={`p${i}`} cx={r1(x)} cy={r1(y)} r={r1(r * 0.9)} fill={fill} />);
  }
  return (
    <g>
      <ellipse cx={cx} cy={cy + thickness * 0.1} rx={halfWidth * 0.97} ry={thickness * 0.55} fill={shade ?? fill} />
      {puffs}
    </g>
  );
}

/**
 * Felles gradienter og mønstre. Alle id-er får prefikset `id` så flere
 * figurer kan stå på samme side.
 */
export function VolcArtDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0c1520" />
        <stop offset="0.7" stopColor="#16242f" />
        <stop offset="1" stopColor="#22323b" />
      </linearGradient>
      <linearGradient id={`${id}-crust`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a322b" />
        <stop offset="1" stopColor="#1c1814" />
      </linearGradient>
      <linearGradient id={`${id}-basalt`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a4440" />
        <stop offset="1" stopColor="#2d2926" />
      </linearGradient>
      <linearGradient id={`${id}-lava`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffe08a" />
        <stop offset="0.35" stopColor="#ff9a2e" />
        <stop offset="1" stopColor="#c62d0c" />
      </linearGradient>
      <linearGradient id={`${id}-lavaH`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffb347" />
        <stop offset="0.5" stopColor="#ff6a1a" />
        <stop offset="1" stopColor="#a8250b" />
      </linearGradient>
      <radialGradient id={`${id}-chamber`} cx="0.5" cy="0.45" r="0.6">
        <stop offset="0" stopColor="#ffcf73" />
        <stop offset="0.45" stopColor="#f07a22" />
        <stop offset="0.85" stopColor="#a8320e" />
        <stop offset="1" stopColor="#5c1a08" />
      </radialGradient>
      <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.45" />
        <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-ash`} cx="0.35" cy="0.3" r="0.75">
        <stop offset="0" stopColor="#bdb6ab" />
        <stop offset="0.6" stopColor="#857d73" />
        <stop offset="1" stopColor="#5a544d" />
      </radialGradient>
      <radialGradient id={`${id}-ashDark`} cx="0.35" cy="0.3" r="0.75">
        <stop offset="0" stopColor="#7a736a" />
        <stop offset="1" stopColor="#3f3a35" />
      </radialGradient>
      <radialGradient id={`${id}-steam`} cx="0.35" cy="0.3" r="0.75">
        <stop offset="0" stopColor="#eef2f4" />
        <stop offset="1" stopColor="#a9b3b9" />
      </radialGradient>
      <radialGradient id={`${id}-pdc`} cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#c9a48a" />
        <stop offset="0.6" stopColor="#8f6a55" />
        <stop offset="1" stopColor="#5a4033" />
      </radialGradient>
      <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2f7fa8" />
        <stop offset="1" stopColor="#0f3a52" />
      </linearGradient>
      <linearGradient id={`${id}-ice`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4f9fc" />
        <stop offset="1" stopColor="#b9d6e6" />
      </linearGradient>
      <pattern id={`${id}-scoria`} width="9" height="8" patternUnits="userSpaceOnUse">
        <rect width="9" height="8" fill="#5b2f22" />
        <circle cx="2" cy="2" r="1.3" fill="#7d4330" />
        <circle cx="6.5" cy="5.5" r="1.1" fill="#3b1d15" />
        <circle cx="6" cy="1.5" r="0.7" fill="#8f5139" />
      </pattern>
      <pattern id={`${id}-speckle`} width="14" height="12" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="0.8" fill="#ffffff" opacity="0.06" />
        <circle cx="10" cy="8" r="0.9" fill="#000000" opacity="0.18" />
        <circle cx="8" cy="2" r="0.6" fill="#000000" opacity="0.14" />
      </pattern>
    </defs>
  );
}
