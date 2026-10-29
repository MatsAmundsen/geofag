import type { JSX } from "react";
import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T, nb } from "./g2a-kit";
import { BERGEN, OSLO } from "./g2b-klimadata";
import { KART_B, NABO_B, NOR_FLATE, SONER_B } from "./g2b-norgekart";

const SKY = "#dfe8ee";
const GRA = "#9fb0bb";
const MORK = "#6c7d88";

/* ---------- Skyikoner (egne tegninger) ---------- */

type Sky = { x: number; y: number; w: number };

function Ci({ x, y, w }: Sky) {
  const s = w / 60;
  return (
    <g stroke={SKY} strokeWidth={2.2} strokeLinecap="round" fill="none" transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 6 C-14 -4 0 -6 14 -2 C20 0 24 4 22 9" />
      <path d="M-24 -6 C-8 -14 8 -14 22 -9" opacity={0.8} />
      <path d="M-18 14 C-4 8 10 8 26 12" opacity={0.7} />
    </g>
  );
}
function Cc({ x, y, w }: Sky) {
  const rows = [-6, 6];
  return (
    <g fill={SKY}>
      {rows.map((dy, r) =>
        [0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={`${r}-${i}`} cx={x - w / 2 + 6 + i * ((w - 12) / 5) + (r ? 5 : 0)} cy={y + dy} r={w * 0.045} />
        )),
      )}
    </g>
  );
}
function Cs({ x, y, w }: Sky) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={w / 2} ry={w * 0.17} fill={SKY} opacity={0.28} />
      <path d={`M${x - w * 0.42} ${y - 4} q${w * 0.2} -8 ${w * 0.42} 0 t${w * 0.42} 0`} stroke={SKY} strokeWidth={1.6} fill="none" opacity={0.7} />
      <path d={`M${x - w * 0.36} ${y + 6} q${w * 0.18} -7 ${w * 0.36} 0 t${w * 0.36} 0`} stroke={SKY} strokeWidth={1.6} fill="none" opacity={0.5} />
    </g>
  );
}
function Ac({ x, y, w }: Sky) {
  const e = w * 0.16;
  return (
    <g fill={SKY} opacity={0.92}>
      {[-1.5, -0.5, 0.5, 1.5].map((i) => (
        <ellipse key={`a${i}`} cx={x + i * e * 1.7} cy={y - 7} rx={e} ry={e * 0.55} />
      ))}
      {[-1, 0, 1].map((i) => (
        <ellipse key={`b${i}`} cx={x + i * e * 1.7} cy={y + 7} rx={e} ry={e * 0.55} />
      ))}
    </g>
  );
}
function As({ x, y, w }: Sky) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={w / 2} ry={w * 0.2} fill={GRA} opacity={0.75} />
      <ellipse cx={x + w * 0.08} cy={y - w * 0.04} rx={w * 0.32} ry={w * 0.12} fill={SKY} opacity={0.35} />
    </g>
  );
}
function Ns({ x, y, w, regn }: Sky & { regn?: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={w / 2} ry={w * 0.2} fill={MORK} />
      <ellipse cx={x - w * 0.1} cy={y - w * 0.05} rx={w * 0.3} ry={w * 0.1} fill={GRA} opacity={0.4} />
      {regn
        ? [-0.3, -0.1, 0.1, 0.3].map((i) => (
            <Flow key={i} d={`M${x + i * w} ${y + w * 0.22} l-5 16`} color={C.rain} w={2} cls="a a-flow-s" />
          ))
        : null}
    </g>
  );
}
function Sc({ x, y, w }: Sky) {
  const e = w * 0.2;
  return (
    <g fill={GRA}>
      {[-1.5, -0.5, 0.5, 1.5].map((i) => (
        <ellipse key={i} cx={x + i * e * 1.35} cy={y + (i % 2 ? -3 : 3)} rx={e * 0.95} ry={e * 0.6} />
      ))}
      <rect x={x - w / 2 + 4} y={y + 4} width={w - 8} height={6} rx={3} fill={GRA} />
    </g>
  );
}
function St({ x, y, w }: Sky) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 5} width={w} height={12} rx={6} fill={GRA} opacity={0.9} />
      <rect x={x - w * 0.4} y={y + 10} width={w * 0.8} height={3} rx={1.5} fill={GRA} opacity={0.5} />
    </g>
  );
}
function Cu({ x, y, w }: Sky) {
  const r = w * 0.2;
  return (
    <g fill={SKY}>
      <circle cx={x - r * 1.1} cy={y} r={r * 0.85} />
      <circle cx={x} cy={y - r * 0.55} r={r * 1.15} />
      <circle cx={x + r * 1.15} cy={y + 1} r={r * 0.8} />
      <rect x={x - r * 1.9} y={y + 2} width={r * 3.8} height={r * 0.7} rx={r * 0.35} />
    </g>
  );
}
function Cb({ x, y, w, h }: Sky & { h: number }) {
  const r = w * 0.17;
  return (
    <g>
      <rect x={x - r * 0.9} y={y - h} width={r * 1.8} height={h} fill={SKY} opacity={0.95} />
      <circle cx={x} cy={y - h} r={r * 0.9} fill={SKY} />
      <ellipse cx={x} cy={y - h + 2} rx={w * 0.5} ry={r * 0.5} fill={SKY} opacity={0.95} />
      <rect x={x - w * 0.46} y={y - r * 0.7} width={w * 0.92} height={r * 0.9} rx={r * 0.4} fill={MORK} />
    </g>
  );
}

const KM = (k: number, top: number, per: number) => top + (13 - k) * per;

export function FigSkyerNivaaer() {
  return (
    <G2Figur
      title="Skytyper i tre høydenivåer"
      desc="Loddrett kilometerskala fra 0 til 13 kilometer med tre høydenivåer som delvis overlapper. Høye skyer ligger mellom 5 og 13 kilometer og omfatter fjærskyer, makrellskyer og slørskyer. Middels høye skyer ligger mellom 2 og 7 kilometer og omfatter rukleskyer, lagskyer og nedbørskylag. Lave skyer ligger mellom 0 og 2 kilometer og omfatter bukleskyer, tåkeskyer, haugskyer og bygeskyer. Høydene gjelder tempererte strøk og varierer med breddegrad."
      heading="Skytyper i tre høydenivåer"
      caption="Høydene gjelder tempererte strøk (Velle & Gjelten, 2024). Skjematisk tegning, ikke målestokk for skyenes størrelse. Kilde: Store norske leksikon (Velle & Gjelten, 2024)."
      narrow={{ w: 300, h: 900 }}
      wide={{ w: 720, h: 590 }}
      animated
      name="skyene"
    >
      {({ bred }) => {
        const top = bred ? 50 : 56;
        const per = bred ? 34 : 40;
        const ax = bred ? 70 : 46;
        const R = bred ? 712 : 296;
        const y = (k: number) => KM(k, top, per);
        const bot = y(0);
        const niv = [
          { id: "h", t: "Høye skyer", k0: 5, k1: 13, c: C.cold, off: 0 },
          { id: "m", t: "Middels høye skyer", k0: 2, k1: 7, c: C.teal, off: 8 },
          { id: "l", t: "Lave skyer", k0: 0, k1: 2, c: C.warm, off: 16 },
        ];
        return (
          <>
            {niv.map((n) => (
              <g key={n.id}>
                <rect x={ax} y={y(n.k1)} width={R - ax} height={y(n.k0) - y(n.k1)} fill={n.c} fillOpacity={0.07} />
                <rect x={ax + 2 + n.off / 2} y={y(n.k1)} width={4} height={y(n.k0) - y(n.k1)} fill={n.c} />
              </g>
            ))}
            {/* akse */}
            <line x1={ax} x2={ax} y1={top - 8} y2={bot} stroke={C.fg} strokeWidth={1.6} />
            <line x1={ax} x2={R} y1={bot} y2={bot} stroke={C.fg} strokeWidth={1.6} />
            {[0, 2, 5, 7, 13].map((k) => (
              <g key={k}>
                <line x1={ax - 5} x2={ax} y1={y(k)} y2={y(k)} stroke={C.fg} strokeWidth={1.4} />
                <line x1={ax} x2={R} y1={y(k)} y2={y(k)} stroke={C.muted} strokeWidth={0.8} strokeDasharray="2 5" opacity={0.7} />
                <T x={ax - 8} y={y(k) + 5} lines={k === 13 && bred ? "13 km" : String(k)} size={14} anchor="end" fill={C.fg} weight={600} />
              </g>
            ))}
            <T x={ax - 8} y={top - 22} lines="km" size={14} anchor="end" fill={C.muted} />

            {bred ? (
              <>
                {/* nivåtitler */}
                <T x={ax + 36} y={y(13) + 24} lines={["Høye skyer", "5–13 km"]} size={14} weight={700} fill={C.cold} />
                <T x={ax + 36} y={y(4.2) + 4} lines={["Middels høye skyer", "2–7 km"]} size={14} weight={700} fill={C.teal} />
                <T x={ax + 36} y={y(1.4) + 4} lines={["Lave skyer", "0–2 km"]} size={14} weight={700} fill={C.warm} />
                {/* høye */}
                <g className="a a-sway" style={{ ["--dx" as string]: "10px" }}>
                  <Ci x={330} y={y(10.6)} w={84} />
                </g>
                <T x={330} y={y(10.6) + 36} lines="Ci fjærskyer" size={14} anchor="middle" />
                <g className="a a-sway" style={{ ["--dx" as string]: "8px" }}>
                  <Cc x={490} y={y(9)} w={90} />
                </g>
                <T x={490} y={y(9) + 34} lines="Cc makrellskyer" size={14} anchor="middle" />
                <Cs x={640} y={y(7.6)} w={96} />
                <T x={640} y={y(7.6) + 36} lines="Cs slørskyer" size={14} anchor="middle" />
                {/* middels */}
                <g className="a a-sway" style={{ ["--dx" as string]: "8px" }}>
                  <Ac x={330} y={y(4.2)} w={96} />
                </g>
                <T x={330} y={y(4.2) + 34} lines="Ac rukleskyer" size={14} anchor="middle" />
                <As x={490} y={y(4.6)} w={96} />
                <T x={490} y={y(4.6) + 38} lines="As lagskyer" size={14} anchor="middle" />
                <Ns x={640} y={y(5.1)} w={100} regn />
                <T x={640} y={y(2.9) + 4} lines="Ns nedbørskylag" size={14} anchor="middle" />
                {/* lave */}
                <g className="a a-sway" style={{ ["--dx" as string]: "8px" }}>
                  <Sc x={250} y={y(1.25)} w={84} />
                </g>
                <T x={250} y={y(0.12) - 2} lines="Sc bukleskyer" size={14} anchor="middle" />
                <St x={390} y={y(1.1)} w={92} />
                <T x={390} y={y(0.12) - 2} lines="St tåkeskyer" size={14} anchor="middle" />
                <Cu x={520} y={y(1.2)} w={70} />
                <T x={520} y={y(0.12) - 2} lines="Cu haugskyer" size={14} anchor="middle" />
                <Cb x={650} y={y(0.55)} w={70} h={34} />
                <T x={650} y={y(0.12) - 2} lines="Cb bygeskyer" size={14} anchor="middle" />
                {/* opptrekk i bygesky */}
                <Flow d={`M${650 - 34} ${y(0.4)} v-26`} color={C.low} w={2} cls="a a-flowr" />
                <Flow d={`M${650 + 34} ${y(0.4)} v-26`} color={C.low} w={2} cls="a a-flowr" />
                <T x={ax} y={bot + 36} lines="Høyden varierer med breddegrad. Tropene: høye skyer 6–18 km. Polare strøk: 3–8 km." size={14} fill={C.muted} />
              </>
            ) : (
              <>
                <T x={ax + 14} y={y(13) + 22} lines="Høye skyer 5–13 km" size={14} weight={700} fill={C.cold} />
                <T x={ax + 14} y={y(7) + 22} lines="Middels høye 2–7 km" size={14} weight={700} fill={C.teal} />
                <T x={ax + 14} y={y(2) - 8} lines="Lave skyer 0–2 km" size={14} weight={700} fill={C.warm} />
                {[
                  { f: Ci, x: 100, k: 10.4, l: "Ci", w: 62 },
                  { f: Cc, x: 180, k: 9.2, l: "Cc", w: 62 },
                  { f: Cs, x: 258, k: 8.2, l: "Cs", w: 64 },
                  { f: Ac, x: 100, k: 6.0, l: "Ac", w: 62 },
                  { f: As, x: 180, k: 5.2, l: "As", w: 62 },
                  { f: Ns, x: 258, k: 5.6, l: "Ns", w: 66 },
                  { f: Sc, x: 90, k: 1.3, l: "Sc", w: 52 },
                  { f: St, x: 150, k: 1.1, l: "St", w: 56 },
                  { f: Cu, x: 208, k: 1.2, l: "Cu", w: 50 },
                ].map((c) => {
                  const F = c.f as (p: Sky) => JSX.Element;
                  return (
                    <g key={c.l}>
                      <F x={c.x} y={y(c.k)} w={c.w} />
                      <T x={c.x} y={y(c.k) + 34} lines={c.l} size={14} weight={700} anchor="middle" />
                    </g>
                  );
                })}
                <Cb x={262} y={y(0.55)} w={46} h={30} />
                <T x={262} y={y(0.12) - 2} lines="Cb" size={14} weight={700} anchor="middle" />
                <T x={ax} y={bot + 30} lines="Høyden varierer med" size={14} fill={C.muted} />
                <T x={ax} y={bot + 50} lines="breddegrad. Tropene: høye" size={14} fill={C.muted} />
                <T x={ax} y={bot + 70} lines="skyer 6–18 km. Polare strøk:" size={14} fill={C.muted} />
                <T x={ax} y={bot + 90} lines="3–8 km." size={14} fill={C.muted} />
                {/* navneliste */}
                {[
                  { t: "Høye skyer", c: C.cold, l: ["Ci fjærskyer", "Cc makrellskyer", "Cs slørskyer"] },
                  { t: "Middels høye skyer", c: C.teal, l: ["Ac rukleskyer", "As lagskyer", "Ns nedbørskylag"] },
                  { t: "Lave skyer", c: C.warm, l: ["Sc bukleskyer", "St tåkeskyer", "Cu haugskyer", "Cb bygeskyer"] },
                ].map((g, i) => {
                  const y0 = bot + 128 + i * 100 + (i === 2 ? 0 : 0);
                  return (
                    <g key={g.t}>
                      <rect x={10} y={y0 - 20} width={280} height={g.l.length * 18 + 34} rx={8} fill={G.panel} stroke={g.c} strokeOpacity={0.5} />
                      <T x={22} y={y0} lines={g.t} size={14} weight={700} fill={g.c} />
                      <T x={22} y={y0 + 20} lines={g.l} size={14} lh={18} />
                    </g>
                  );
                })}
              </>
            )}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- Tre typer nedbør ---------- */

function Orografisk({ x, y }: { x: number; y: number }) {
  // scene 220 x 250, origo (x,y) øverst til venstre
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 220 L118 96 L220 220 Z" fill="#3b4a54" />
      <path d="M0 220 L118 96 L150 130 L60 220 Z" fill="#44565f" />
      <path d="M96 118 L118 96 L132 111 L118 108 Z" fill={C.white} opacity={0.8} />
      <rect x={0} y={220} width={220} height={6} fill="#2a3943" />
      {/* sky ved toppen */}
      <g className="a a-sway" style={{ ["--dx" as string]: "5px" }}>
        <ellipse cx={104} cy={68} rx={40} ry={16} fill={SKY} opacity={0.95} />
        <ellipse cx={128} cy={58} rx={26} ry={13} fill={SKY} opacity={0.95} />
        <ellipse cx={82} cy={74} rx={22} ry={10} fill={GRA} opacity={0.9} />
      </g>
      {/* regn på luvsiden */}
      {[56, 72, 88].map((rx, i) => (
        <Flow key={rx} d={`M${rx} ${100 + i * 6} l-3 22`} color={C.rain} w={2.2} cls="a a-flow-s" />
      ))}
      {/* fuktig luft stiger */}
      <Flow d="M4 190 C30 188 56 168 96 126 C104 116 106 104 104 92" color={C.cold} w={2.8} />
      <Flow d="M126 106 C160 112 190 150 214 176" color={C.warm} w={2.4} />
      <T x={6} y={172} lines={["Fuktig", "luft"]} size={14} fill={C.cold} weight={600} />
      <T x={152} y={140} lines={["Tørrere", "luft"]} size={14} fill={C.warm} weight={600} />
      <T x={8} y={248} lines="Luv" size={14} weight={700} />
      <T x={212} y={248} lines="Lesiden" size={14} weight={700} anchor="end" />
    </g>
  );
}

function Konvektiv({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={220} width={220} height={8} fill="#44565f" />
      <rect x={0} y={228} width={220} height={4} fill="#2a3943" />
      {/* sol */}
      <g className="a a-spin-s">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1={26} y1={22} x2={26} y2={6} stroke={C.warm} strokeWidth={2.4} strokeLinecap="round" transform={`rotate(${a} 26 38)`} />
        ))}
        <circle cx={26} cy={38} r={20} fill="none" stroke="none" />
      </g>
      <circle cx={26} cy={38} r={12} fill={C.warm} />
      {/* varm bakke */}
      {[60, 100, 140].map((bx) => (
        <path key={bx} d={`M${bx} 214 q6 -8 12 0 t12 0`} stroke={C.low} strokeWidth={2} fill="none" className="a a-pulse" />
      ))}
      {/* opptrekk */}
      {[78, 116, 154].map((ux, i) => (
        <Flow key={ux} d={`M${ux} 204 L${ux} ${i === 1 ? 96 : 112}`} color={C.low} w={3} cls="a a-flowr" />
      ))}
      {/* bygesky */}
      <g className="a a-sway" style={{ ["--dx" as string]: "4px" }}>
        <rect x={100} y={44} width={30} height={46} fill={SKY} opacity={0.95} />
        <circle cx={115} cy={50} r={22} fill={SKY} />
        <circle cx={92} cy={64} r={16} fill={SKY} />
        <circle cx={140} cy={62} r={18} fill={SKY} />
        <ellipse cx={116} cy={34} rx={56} ry={9} fill={SKY} />
        <rect x={74} y={82} width={90} height={16} rx={8} fill={MORK} />
      </g>
      {[96, 114, 132, 150].map((rx) => (
        <Flow key={rx} d={`M${rx} 104 l-3 22`} color={C.rain} w={2.2} cls="a a-flow-s" />
      ))}
      <T x={110} y={250} lines="Opptrekk 1–10 m/s" size={14} weight={700} anchor="middle" fill={C.low} />
    </g>
  );
}

function Frontal({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={220} width={220} height={8} fill="#44565f" />
      <rect x={0} y={228} width={220} height={4} fill="#2a3943" />
      {/* kald kile */}
      <path d="M24 220 L220 128 L220 220 Z" fill={C.cold} fillOpacity={0.28} />
      <path d="M24 220 L220 128" stroke={C.cold} strokeWidth={2.6} />
      {/* nedbørskylag langs fronten */}
      <path d="M40 188 L214 100 L214 124 L60 212 Z" fill={MORK} opacity={0.9} className="a a-sway" style={{ ["--dx" as string]: "-4px" }} />
      {[84, 112, 140, 168].map((rx, i) => (
        <Flow key={rx} d={`M${rx} ${186 - i * 15} l-3 20`} color={C.rain} w={2.2} cls="a a-flow-s" />
      ))}
      <Flow d="M2 160 C50 150 120 90 200 52" color={C.low} w={3} />
      <T x={8} y={46} lines={["Varm luft", "glir oppover"]} size={14} weight={600} fill={C.low} />
      <T x={150} y={214} lines="Kald luft" size={14} weight={700} fill={C.cold} anchor="middle" />
      <T x={72} y={216} lines="Front" size={14} weight={700} />
      <T x={110} y={250} lines="Opptrekk 0,1–1,0 m/s" size={14} weight={700} anchor="middle" fill={C.low} />
    </g>
  );
}

export function FigNedborTyper() {
  return (
    <G2Figur
      title="Tre typer nedbør"
      desc="Tre tverrsnitt side om side. Til venstre orografisk nedbør: fuktig luft stiger langs en fjellside, det dannes sky og nedbør på luvsiden og lufta blir tørrere på lesiden. I midten konvektiv nedbør: sola varmer bakken, lufta stiger i kraftig opptrekk på 1 til 10 meter per sekund og gir en bygesky. Til høyre frontal nedbør: varm luft glir sakte opp over kaldere luft langs en front med opptrekk på 0,1 til 1,0 meter per sekund."
      heading="Tre typer nedbør"
      caption="Skjematiske tverrsnitt. Orografisk nedbør: MET (2026). Konvektiv og frontal nedbør: Dannevig mfl. (2026)."
      narrow={{ w: 300, h: 1000 }}
      wide={{ w: 720, h: 340 }}
      animated
      name="nedbørtypene"
    >
      {({ bred }) => {
        const pw = 224;
        const ph = 322;
        const tit = ["1  Orografisk nedbør", "2  Konvektiv nedbør", "3  Frontal nedbør"];
        const scenes = [Orografisk, Konvektiv, Frontal];
        return (
          <>
            {scenes.map((S, i) => {
              const px = bred ? 10 + i * (pw + 12) : 12;
              const py = bred ? 8 : 8 + i * (ph + 6);
              return (
                <g key={i}>
                  <Box x={px} y={py} w={bred ? pw : 276} h={ph} />
                  <T x={px + 14} y={py + 26} lines={tit[i]} size={15} weight={700} />
                  <S x={bred ? px + 2 : px + 28} y={py + 36} />
                </g>
              );
            })}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- Klimadiagram Bergen og Oslo ---------- */

const MND = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function Klimadiagram({
  x,
  y,
  w,
  d,
}: {
  x: number;
  y: number;
  w: number;
  d: typeof BERGEN;
}) {
  const L = 40;
  const Rm = 40;
  const px0 = x + L;
  const px1 = x + w - Rm;
  const top = y + 74;
  const bot = y + 74 + 190;
  const bw = (px1 - px0) / 12;
  const Yn = (mm: number) => bot - (mm / 300) * (bot - top);
  const Yt = (t: number) => bot - ((t + 10) / 30) * (bot - top);
  const pts = d.temp.map((t, i) => `${(px0 + bw * (i + 0.5)).toFixed(1)} ${Yt(t).toFixed(1)}`);
  return (
    <g>
      <T x={x + w / 2} y={y + 26} lines={d.navn} size={17} weight={700} anchor="middle" />
      <T x={x + w / 2} y={y + 46} lines="Normal 1991–2020" size={14} fill={C.muted} anchor="middle" />
      {/* akseenheter */}
      <T x={px0 - 6} y={top - 12} lines="mm" size={14} weight={700} fill={C.cold} anchor="end" />
      <T x={px1 + 6} y={top - 12} lines="°C" size={14} weight={700} fill={C.low} anchor="start" />
      {[0, 100, 200, 300].map((v, i) => (
        <g key={v}>
          <line x1={px0} x2={px1} y1={Yn(v)} y2={Yn(v)} stroke={G.grid} strokeWidth={1} />
          <T x={px0 - 6} y={Yn(v) + 5} lines={String(v)} size={14} fill={C.cold} anchor="end" />
          <T x={px1 + 6} y={Yt(-10 + i * 10) + 5} lines={String(-10 + i * 10).replace("-", "−")} size={14} fill={C.low} anchor="start" />
        </g>
      ))}
      <line x1={px0} x2={px1} y1={Yt(0)} y2={Yt(0)} stroke={C.low} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.7} />
      {d.ned.map((v, i) => (
        <rect key={i} x={px0 + bw * i + bw * 0.14} y={Yn(v)} width={bw * 0.72} height={bot - Yn(v)} fill={C.cold} fillOpacity={0.7} />
      ))}
      <polyline points={pts.join(" ")} fill="none" stroke={C.low} strokeWidth={3} strokeLinejoin="round" />
      {d.temp.map((t, i) => (
        <circle key={i} cx={px0 + bw * (i + 0.5)} cy={Yt(t)} r={3} fill={C.low} stroke={C.bg} strokeWidth={1} />
      ))}
      <line x1={px0} x2={px1} y1={bot} y2={bot} stroke={C.fg} strokeWidth={1.4} />
      {MND.map((m, i) => (
        <T key={i} x={px0 + bw * (i + 0.5)} y={bot + 20} lines={m} size={14} anchor="middle" fill={C.fg} />
      ))}
      <T x={x + w / 2} y={bot + 50} lines={`Årsmiddel ${nb(d.arsTemp, 1)} °C · årsnedbør ${nb(d.arsNed, 0).replace(/(\d)(\d{3})$/, "$1\u00a0$2")} mm`} size={14} weight={700} anchor="middle" />
      <T x={x + w / 2} y={bot + 70} lines={`Kaldest ${d.kald.m} ${nb(d.kald.t, 1).replace("-", "−")} °C, varmest ${d.varm.m} ${nb(d.varm.t, 1)} °C`} size={14} fill={C.muted} anchor="middle" />
    </g>
  );
}

export function FigKlimadiagramKystInnland() {
  return (
    <G2Figur
      title="Klimadiagram for Bergen og Oslo"
      desc="To klimadiagrammer side om side for normalperioden 1991–2020. Hvert diagram har nedbør som søyler på venstre akse fra 0 til 300 millimeter og temperatur som kurve på høyre akse fra minus 10 til 20 grader. Aksene er uavhengige. Bergen (Florida) har årsmiddel 8,4 grader og årsnedbør 2 496 millimeter, med mest nedbør om høsten og tidlig vinter. Oslo (Blindern) har årsmiddel 7,0 grader og årsnedbør 836 millimeter, med kalde vintre og varme somre."
      heading="Klimadiagram for Bergen og Oslo"
      caption="Nedbør (søyler, venstre akse, mm) og temperatur (kurve, høyre akse, °C) per måned. Aksene er frie og har ikke fast forhold til hverandre. Normal 1991–2020. Månedsverdiene er Meteorologisk instituttets normaler slik de vises på Yr (stasjonene Bergen – Florida og Oslo – Blindern). Kilde: Meteorologisk institutt, Seklima. Årstallene: SNL (Dannevig & Harstveit, 2026)."
      narrow={{ w: 300, h: 760 }}
      wide={{ w: 720, h: 400 }}
    >
      {({ bred }) => (
        <>
          {bred ? (
            <>
              <Klimadiagram x={8} y={6} w={346} d={BERGEN} />
              <Klimadiagram x={366} y={6} w={346} d={OSLO} />
            </>
          ) : (
            <>
              <Klimadiagram x={0} y={6} w={300} d={BERGEN} />
              <Klimadiagram x={0} y={386} w={300} d={OSLO} />
            </>
          )}
        </>
      )}
    </G2Figur>
  );
}

/* ---------- Köppen-klimasoner i Norge ---------- */

const SONE = { C: "#e0b48a", D: "#5f93ad", E: "#e8eef2" };

function KartEn({ x, y, s, per, stasjoner }: { x: number; y: number; s: number; per: "p6190" | "p9120"; stasjoner?: boolean }) {
  const pr = (lon: number, lat: number) => [(lon - 4.0) * Math.cos((65 * Math.PI) / 180) * 22, (71.6 - lat) * 22];
  const st = [
    { n: "Bergen", lon: 5.33, lat: 60.39, a: "end" as const, dx: -8 },
    { n: "Oslo", lon: 10.75, lat: 59.91, a: "start" as const, dx: 8 },
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Object.entries(NABO_B).map(([n, d]) => (
        <path key={n} d={d} fill="#1d2a33" stroke="#33444f" strokeWidth={0.6 / s} />
      ))}
      <path d={NOR_FLATE} fill={SONE.D} />
      <path d={SONER_B[per].C} fill={SONE.C} />
      <path d={SONER_B[per].E} fill={SONE.E} />
      <path d={NOR_FLATE} fill="none" stroke={C.bg} strokeWidth={0.7 / s} strokeLinejoin="round" />
      {stasjoner
        ? st.map((q) => {
            const [px, py] = pr(q.lon, q.lat);
            return (
              <g key={q.n}>
                <circle cx={px} cy={py} r={3.6 / s} fill={C.bg} stroke={C.fg} strokeWidth={1.6 / s} />
              </g>
            );
          })
        : null}
    </g>
  );
}

export function FigKoppenNorge() {
  return (
    <G2Figur
      title="Köppen-klimasoner i Norge, 1961–1990 og 1991–2020"
      desc="To skjematiske kart over fastlands-Norge, ett for 1961–1990 og ett for 1991–2020, med Köppen-klimasonene C varmtemperert, D kaldtemperert og E polart. På kartet for 1991–2020 er polart klima sterkt redusert og det varmtemperert klimaet i Sør-Norge har bredt seg lenger innover i landet og nordover langs kysten."
      heading="Köppen-klimasoner i Norge"
      caption="Skjematisk kart tegnet av oss etter kriteriene i teksten: C/D-grensen er kaldeste måned −3 °C, polar grense er varmeste måned 10 °C. Soneflatene er forenklet og ikke målt grense for grense. Mamen (2025), Dannevig & Harstveit (2026). Kartgrunnlag: Natural Earth (offentlig eie)."
      narrow={{ w: 300, h: 600 }}
      wide={{ w: 720, h: 420 }}
    >
      {({ bred }) => {
        const leg = [
          { k: "C", t: ["C varmtemperert", "kaldeste måned over −3 °C"], f: SONE.C },
          { k: "D", t: ["D kaldtemperert", "kaldeste måned under −3 °C", "og varmeste over 10 °C"], f: SONE.D },
          { k: "E", t: ["E polart", "varmeste måned under 10 °C"], f: SONE.E },
        ];
        if (bred) {
          return (
            <>
              <T x={20 + KART_B.w / 2} y={34} lines="1961–1990" size={17} weight={700} anchor="middle" />
              <KartEn x={20} y={50} s={1} per="p6190" stasjoner />
              <T x={300 + KART_B.w / 2} y={34} lines="1991–2020" size={17} weight={700} anchor="middle" />
              <KartEn x={300} y={50} s={1} per="p9120" stasjoner />
              <T x={20} y={50 + KART_B.h + 26} lines="Ringene viser Bergen og Oslo." size={14} fill={C.muted} />
              {leg.map((l, i) => {
                const yy = 70 + i * 100;
                return (
                  <g key={l.k}>
                    <rect x={578} y={yy} width={20} height={20} rx={4} fill={l.f} />
                    <T x={606} y={yy + 16} lines={l.t[0]} size={14} weight={700} />
                    <T x={578} y={yy + 42} lines={l.t.slice(1)} size={14} fill={C.muted} />
                  </g>
                );
              })}
            </>
          );
        }
        const s = 0.56;
        return (
          <>
            <T x={6 + (KART_B.w * s) / 2} y={30} lines="1961–1990" size={15} weight={700} anchor="middle" />
            <KartEn x={6} y={44} s={s} per="p6190" />
            <T x={154 + (KART_B.w * s) / 2} y={30} lines="1991–2020" size={15} weight={700} anchor="middle" />
            <KartEn x={154} y={44} s={s} per="p9120" />
            {leg.map((l, i) => {
              const yy = 44 + KART_B.h * s + 34 + i * 74;
              return (
                <g key={l.k}>
                  <rect x={10} y={yy} width={20} height={20} rx={4} fill={l.f} />
                  <T x={40} y={yy + 16} lines={l.t[0]} size={14} weight={700} />
                  <T x={10} y={yy + 40} lines={l.t.slice(1)} size={14} fill={C.muted} />
                </g>
              );
            })}
          </>
        );
      }}
    </G2Figur>
  );
}
