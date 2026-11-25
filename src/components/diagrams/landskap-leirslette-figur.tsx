/**
 * Figur 4.11 (geografi kap. 4, «Innblikk: Østlandets leirsletter»): marin leire, ravine og jordbruk.
 * Skjematisk snitt: dyrkede flater på mulig marin leire, en ravine med bekk, og en stiplet prinsipplinje for
 * tidligere havnivå / marin grense. Ingen påvisning av kvikkleire, ingen beregnet fare, ingen stedfestet høyde
 * (figurteksten: NGU, u.å.-a, u.å.-b, u.å.-c; NIBIO, 2023). Konstruert terreng, ikke et bestemt sted.
 */
import type { ReactNode } from "react";
import { IsbreFigur, type Key, type Lab } from "./isbre-figur";
import { smoothPath } from "./isbre-kit";

type P = [number, number];
const TERRENG: P[] = [[0, 210], [150, 206], [300, 212], [372, 216], [404, 236], [430, 278], [452, 326], [470, 352], [490, 360], [510, 358], [530, 346], [552, 310], [576, 262], [604, 226], [640, 212], [800, 206], [960, 210]];
const tekst = "#e8eef2";

const L = (text: string, x: number, y: number, at?: P, ekstra: Partial<Lab> = {}): Lab => ({ text, x, y, at, anchor: "middle", color: tekst, weight: 700, size: 14, badge: [x, y], ...ekstra });

const labels: Lab[] = [
  L("Prinsipp for tidligere havnivå / marin grense", 300, 76, undefined, { color: "#9bd2f0", size: 13, anchor: "start", x: 40, badge: [60, 76] }),
  L("Jordbruk", 150, 160, [150, 204]),
  L("Jordbruk", 800, 160, [800, 204]),
  L("Ravine", 470, 170, [440, 290]),
  L("Bekk", 610, 330, [500, 356]),
  L("Mulig marin leire", 220, 330, [220, 330], { badge: [220, 330] }),
];
const keys: Key[] = [
  { text: "dyrket mark", color: "#9bbf5a", kind: "fill" },
  { text: "mulig marin leire", color: "#8a97a3", kind: "fill" },
  { text: "bekk", color: "#3b8fc4", kind: "fill" },
  { text: "prinsipp for marin grense", color: "#9bd2f0", kind: "dash" },
];

function Gard({ x, y }: { x: number; y: number }) {
  return (
    <g data-nocheck="">
      <rect x={x} y={y - 16} width={26} height={16} fill="#b4483c" />
      <polygon points={`${x - 3},${y - 16} ${x + 13},${y - 28} ${x + 29},${y - 16}`} fill="#3a2b25" />
      <rect x={x + 34} y={y - 11} width={16} height={11} fill="#e6dcc8" />
      <polygon points={`${x + 32},${y - 11} ${x + 42},${y - 19} ${x + 52},${y - 11}`} fill="#3a2b25" />
    </g>
  );
}
function Tre({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path d={`M${x} ${y} l ${-7 * s} 0 l ${7 * s} ${-20 * s} l ${7 * s} ${20 * s} Z`} fill="#2f6b3c" data-nocheck="" />;
}

export function GeografiLeirsletteFigur({ heading, caption }: { heading: string; caption: ReactNode }) {
  const flate = `${smoothPath(TERRENG)} L960 470 L0 470 Z`;
  const lag = Array.from({ length: 9 }, (_, i) => 236 + i * 24);
  return (
    <IsbreFigur
      heading={heading}
      title="Skjematisk snitt av mulig marin leire på land, en bekk i ravinen og jordbruk på flatene. Ingen påvisning av kvikkleire eller beregnet fare."
      caption={caption}
      viewBox="0 0 960 470"
      labels={labels}
      keys={keys}
      notes={["Grunnundersøkelser trengs for å avgjøre leirtype og stabilitet", "Skjematisk snitt uten målestokk, ikke et bestemt sted"]}
    >
      {() => (
        <g data-figur="geo-leirslette">
          <defs>
            <linearGradient id="lls-himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22364a" /><stop offset="100%" stopColor="#4a7090" /></linearGradient>
            <linearGradient id="lls-leire" x1="0" y1="200" x2="0" y2="470" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#9aa6ae" /><stop offset="100%" stopColor="#66737e" /></linearGradient>
            <clipPath id="lls-klipp"><path d={flate} /></clipPath>
          </defs>
          <rect x={0} y={0} width={960} height={470} fill="url(#lls-himmel)" data-nocheck="" />
          <path d="M30 92 H930" stroke="#9bd2f0" strokeWidth={2.2} strokeDasharray="10 8" />
          <path d={flate} fill="url(#lls-leire)" stroke="#2b3238" strokeWidth={1.6} />
          <g clipPath="url(#lls-klipp)">
            {lag.map((y, i) => (
              <path key={y} d={`M0 ${y} Q 240 ${y + (i % 2 ? 3 : -3)} 480 ${y} T 960 ${y}`} fill="none" stroke="#4c5861" strokeOpacity={0.45} strokeWidth={1.2} data-nocheck="" />
            ))}
            {/* matjord og åker på flatene */}
            <path d={smoothPath(TERRENG)} fill="none" stroke="#5a4330" strokeWidth={14} data-nocheck="" />
          </g>
          {[[10, 360], [628, 950]].map(([a, b]) => (
            <g key={a}>
              <path d={`M${a} ${a < 300 ? 205 : 207} H${b}`} stroke="#9bbf5a" strokeWidth={6} />
              {Array.from({ length: Math.floor((b - a) / 26) }, (_, i) => <path key={i} d={`M${a + 8 + i * 26} ${a < 300 ? 205 : 207} v-6`} stroke="#c8d97a" strokeWidth={2} data-nocheck="" />)}
            </g>
          ))}
          <Gard x={250} y={203} />
          <Gard x={700} y={204} />
          {[386, 404, 566, 590, 612].map((x, i) => <Tre key={x} x={x} y={x < 480 ? 222 + i * 8 : 252 - (i - 2) * 16} s={0.9} />)}
          <path d="M470 352 Q 490 364 510 358 L 506 350 Q 490 356 474 346 Z" fill="#3b8fc4" />
          <path d="M466 352 C 486 366 512 362 532 346" fill="none" stroke="#3b8fc4" strokeWidth={6} strokeLinecap="round" />
        </g>
      )}
    </IsbreFigur>
  );
}
