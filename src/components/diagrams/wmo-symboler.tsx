/**
 * WMO-symboler til stasjonsplott, tegnet etter WMO-No. 306 (Manual on Codes, Volume I.1):
 * kodetabell 4677 (ww, været nå), 2700 (N, skydekke) og vindpil for den nordlige halvkule.
 * Geometrien følger WorldWeatherSymbols (OGC MetOcean DWG / WMO, CC BY 4.0), skalert fra 55 × 55.
 */
import type React from "react";

export type WwKode = 45 | 51 | 61 | 63 | 71 | 95;

/** Snøkrystall (ww 70-armen): tre streker gjennom sentrum, 60° mellom. */
function Snokrystall({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <g stroke={color} strokeWidth={3 * s} strokeLinecap="round">
      {[90, 30, 150].map((a) => {
        const r = 5.5 * s;
        const dx = r * Math.cos((a * Math.PI) / 180);
        const dy = r * Math.sin((a * Math.PI) / 180);
        return <line key={a} x1={x - dx} y1={y - dy} x2={x + dx} y2={y + dy} />;
      })}
    </g>
  );
}

/** Symbol for været nå. s = 1 gir WMO-størrelsen (55 enheter bred rute). */
export function WwSymbol({ code, x, y, s = 1, color = "#e6edf3" }: { code: WwKode; x: number; y: number; s?: number; color?: string }) {
  const d = (r: number) => r * s;
  switch (code) {
    case 61:
      return (
        <g fill={color}>
          <circle cx={x - d(9.5)} cy={y} r={d(5.5)} />
          <circle cx={x + d(9.5)} cy={y} r={d(5.5)} />
        </g>
      );
    case 63:
      // Tre prikker i trekant: én øverst, to nederst.
      return (
        <g fill={color}>
          <circle cx={x} cy={y - d(9)} r={d(5.5)} />
          <circle cx={x - d(7.79)} cy={y + d(4.5)} r={d(5.5)} />
          <circle cx={x + d(7.79)} cy={y + d(4.5)} r={d(5.5)} />
        </g>
      );
    case 51:
      return (
        <g>
          {[-9.5, 9.5].map((dx) => (
            <g key={dx} transform={`translate(${x + d(dx)} ${y})`}>
              <circle r={d(5.5)} fill={color} />
              <path d={`M ${d(4)} 0 C ${d(4)} ${d(3.7)} ${d(1.9)} ${d(7.1)} ${d(-1)} ${d(9.2)}`} fill="none" stroke={color} strokeWidth={d(3)} strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
    case 71:
      return (
        <g>
          <Snokrystall x={x - d(9.5)} y={y} s={s} color={color} />
          <Snokrystall x={x + d(9.5)} y={y} s={s} color={color} />
        </g>
      );
    case 45:
      return <path d={`M ${x - d(17.5)} ${y - d(9.5)} h ${d(35)} M ${x - d(17.5)} ${y} h ${d(35)} M ${x - d(17.5)} ${y + d(9.5)} h ${d(35)}`} fill="none" stroke={color} strokeWidth={d(3)} />;
    case 95:
      // Tordenvær med regn (95a): tordensymbolet med regnprikken midt over.
      return (
        <g fill="none" stroke={color} strokeWidth={d(3)}>
          <circle cx={x} cy={y - d(19)} r={d(4.5)} fill={color} stroke="none" />
          <path d={`M ${x - d(10.5)} ${y - d(10)} h ${d(20)} L ${x - d(2)} ${y + d(6.5)} l ${d(12)} ${d(12)}`} />
          <path d={`M ${x - d(6.5)} ${y - d(10)} V ${y + d(21.5)}`} />
          <path d={`M ${x + d(4)} ${y + d(18.5)} h ${d(6)} v ${d(-6)} z`} fill={color} />
        </g>
      );
  }
}

/**
 * Skydekke N (kodetabell 2700) i en stasjonssirkel. Bare N = 6, 7 og 8 brukes i kapitlet.
 * 6: fylt unntatt øvre venstre kvadrant. 7: fylt med loddrett åpning. 8: helt fylt.
 */
export function SkydekkeN({ n, cx, cy, r, color = "#e6edf3", bg = "#0f172a", width = 1.6 }: { n: 6 | 7 | 8; cx: number; cy: number; r: number; color?: string; bg?: string; width?: number }) {
  if (n === 8) return <circle cx={cx} cy={cy} r={r} fill={color} stroke={color} strokeWidth={width} />;
  if (n === 7)
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill={color} stroke={color} strokeWidth={width} />
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={bg} strokeWidth={Math.max(1.5, r * 0.15)} />
      </g>
    );
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={bg} stroke={color} strokeWidth={width} />
      <path d={`M ${cx} ${cy - r} V ${cy} H ${cx - r} A ${r} ${r} 0 1 0 ${cx} ${cy - r} Z`} fill={color} />
    </g>
  );
}

/**
 * Vindpil for den nordlige halvkule. Skaftet går fra sirkelen mot retningen vinden kommer fra
 * (fraGrader: 0 = nord, 90 = øst). Fjærene står på siden mot lavere trykk og heller utover,
 * slik WMO-pilene gjør: hel fjær, halv fjær og vimpel (trekant).
 */
export function Vindpil({
  cx,
  cy,
  fraGrader,
  r,
  len,
  hele = 0,
  halve = 0,
  vimpler = 0,
  color = "#e6edf3",
  width = 1.6,
  fjaer = len * 0.42,
}: {
  cx: number;
  cy: number;
  fraGrader: number;
  r: number;
  len: number;
  hele?: number;
  halve?: number;
  vimpler?: number;
  color?: string;
  width?: number;
  fjaer?: number;
}) {
  const a = (fraGrader * Math.PI) / 180;
  const ux = Math.sin(a);
  const uy = -Math.cos(a);
  const px = -uy;
  const py = ux;
  // Fjærene står til venstre sett fra spissen inn mot stasjonen (mot lavere trykk).
  const sx = px;
  const sy = py;
  const x0 = cx + ux * r;
  const y0 = cy + uy * r;
  const x1 = cx + ux * (r + len);
  const y1 = cy + uy * (r + len);
  const step = fjaer * 0.3;
  const parts: React.JSX.Element[] = [];
  let k = 0;
  for (let i = 0; i < vimpler; i++, k++) {
    const bx = x1 - ux * step * k * 1.6;
    const by = y1 - uy * step * k * 1.6;
    const ex = bx - ux * step * 1.6;
    const ey = by - uy * step * 1.6;
    parts.push(<polygon key={`v${i}`} points={`${bx},${by} ${bx + sx * fjaer + ux * fjaer * 0.29},${by + sy * fjaer + uy * fjaer * 0.29} ${ex},${ey}`} fill={color} />);
  }
  const offset = vimpler * step * 1.6;
  for (let i = 0; i < hele; i++) {
    const bx = x1 - ux * (offset + step * i);
    const by = y1 - uy * (offset + step * i);
    parts.push(<line key={`h${i}`} x1={bx} y1={by} x2={bx + sx * fjaer + ux * fjaer * 0.29} y2={by + sy * fjaer + uy * fjaer * 0.29} stroke={color} strokeWidth={width} strokeLinecap="round" />);
  }
  for (let i = 0; i < halve; i++) {
    const t = offset + step * (hele + i + (hele ? 0 : 1));
    const bx = x1 - ux * t;
    const by = y1 - uy * t;
    const f = fjaer / 2;
    parts.push(<line key={`k${i}`} x1={bx} y1={by} x2={bx + sx * f + ux * f * 0.29} y2={by + sy * f + uy * f * 0.29} stroke={color} strokeWidth={width} strokeLinecap="round" />);
  }
  return (
    <g>
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={color} strokeWidth={width} strokeLinecap="round" />
      {parts}
    </g>
  );
}
