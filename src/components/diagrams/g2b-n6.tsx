import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T, nb } from "./g2a-kit";
import { SOLFLEKK } from "./g2b-solflekker-data";

const L10 = Math.log10;
const MINUS = "\u2212";
const NBSP = "\u00a0";

/* ---------- FigNaturligTidsskalaer ---------- */

const TICKS_SMAL = ["1 år", "10 år", "100 år", `1${NBSP}000 år`, `10${NBSP}000 år`, `100${NBSP}000 år`, "1 mill.", "10 mill.", "100 mill.", "1 mrd.", "10 mrd."];
const TICKS = [
  "1 år", "10 år", "100 år", `1${NBSP}000 år`, `10${NBSP}000 år`, `100${NBSP}000 år`,
  "1 million", "10 millioner", "100 millioner", "1 milliard", "10 milliarder",
];

type Rad = {
  id: string;
  navn: string[];
  tid: string[];
  lo: number;
  hi: number;
  farge: string;
  fuzzy?: boolean;
  punkt?: boolean;
  marks?: number[];
  side?: "r" | "l";
  h?: number;
};

const RADER: Rad[] = [
  { id: "vulk", navn: ["Store vulkanutbrudd"], tid: ["1–3 år"], lo: 0, hi: L10(3), farge: C.low },
  { id: "sol", navn: ["Solsyklusen"], tid: ["8–14 år, gjennomsnitt 11 år"], lo: L10(8), hi: L10(14), farge: G.amber, marks: [L10(11)] },
  { id: "amv", navn: ["AMV"], tid: ["tiår, fra ett tiår til det neste"], lo: 1, hi: 2, farge: C.cold, fuzzy: true },
  { id: "gl", navn: ["Gleissberg-syklusen"], tid: ["omtrent 100 år"], lo: 2, hi: 2, farge: G.amber, punkt: true },
  { id: "min", navn: ["Store solminima"], tid: ["omtrent hvert 200. år"], lo: L10(200), hi: L10(200), farge: G.amber, punkt: true },
  {
    id: "mil",
    navn: ["Jordbanen", "(Milankovitch)"],
    tid: [`Presesjon: 19${NBSP}000 og 23${NBSP}000 år`, `Helning: 41${NBSP}000 år`, `Eksentrisitet: 100${NBSP}000 og 400${NBSP}000 år`],
    lo: L10(19000),
    hi: L10(400000),
    farge: G.violet,
    marks: [L10(19000), L10(23000), L10(41000), L10(100000), L10(400000)],
    h: 66,
  },
  {
    id: "plate",
    navn: ["Platetektonikk"],
    tid: ["Titalls millioner år.", "Eksempel: avkjøling fra omtrent", "50 millioner år siden"],
    lo: 7,
    hi: L10(99e6),
    farge: C.sand,
    marks: [L10(50e6)],
    side: "l",
    h: 66,
  },
  {
    id: "liv",
    navn: ["Livets utvikling"],
    tid: ["Fritt oksygen fra omtrent", "2,5 milliarder år siden"],
    lo: 9,
    hi: 10,
    farge: G.green,
    marks: [L10(2.5e9)],
    side: "l",
    h: 52,
  },
];

export function FigNaturligTidsskalaer() {
  return (
    <G2Figur
      title="Tidsskalaer for naturlige pådriv"
      desc="Logaritmisk tidsakse fra 1 år til 10 milliarder år med ett bånd per naturlig prosess. Store vulkanutbrudd 1 til 3 år. Solsyklusen 8 til 14 år, gjennomsnitt 11 år. AMV på tiårsskala, uten tall. Gleissberg-syklusen omtrent 100 år. Store solminima omtrent hvert 200. år. Jordbanen (Milankovitch) titusener til hundretusener av år, med presesjon 19 000 og 23 000 år, helning 41 000 år og eksentrisitet 100 000 og 400 000 år. Platetektonikk titalls millioner år, for eksempel avkjølingen fra omtrent 50 millioner år siden. Livets utvikling med fritt oksygen fra omtrent 2,5 milliarder år siden."
      heading="Tidsskalaer for naturlige pådriv"
      caption="Logaritmisk akse: hver strek er ti ganger lengre tid enn den forrige. Båndene viser tidsskalaen til hver prosess, ikke når de skjedde. AMV er ikke tallfestet i kildene. Kilder: IPCC (2021), SPM C.1.4; Matthews mfl. (2021); Lindsey (2025); Istider (presesjon, helning og eksentrisitet); Gulev mfl. (2021); Lyons mfl. (2014)."
      narrow={{ w: 300, h: 800 }}
      wide={{ w: 720, h: 484 }}
      animated
      name="Tidsskalaer"
    >
      {({ bred }) => {
        const X0 = bred ? 172 : 10;
        const PER = bred ? 53.5 : 28;
        const X = (d: number) => X0 + d * PER;
        const top = 86;
        // Rader: y-posisjon
        let y = top;
        const pos = RADER.map((r) => {
          const hh = bred ? r.h ?? 40 : 58 + 18 * r.tid.length;
          const p = { r, y, hh };
          y += hh;
          return p;
        });
        const bunn = y + 6;
        return (
          <>
            <defs>
              <linearGradient id="g2b-tid-fuzz" x1="0" x2="1">
                <stop offset="0" stopColor={C.cold} stopOpacity="0" />
                <stop offset="0.25" stopColor={C.cold} stopOpacity="0.85" />
                <stop offset="0.75" stopColor={C.cold} stopOpacity="0.85" />
                <stop offset="1" stopColor={C.cold} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* akse */}
            {(bred ? TICKS : TICKS_SMAL).map((t, d) => {
              const row = d % 3;
              const x = X(d);
              const anker = d === 10 ? "end" : d === 0 && !bred ? "start" : "middle";
              return (
                <g key={d}>
                  <T x={d === 10 ? x + 2 : d === 0 && !bred ? x - 4 : x} y={18 + row * 20} lines={t} size={14} fill={C.muted} anchor={anker} />
                  <line x1={x} x2={x} y1={row * 20 + 24} y2={bunn} stroke={G.grid} strokeWidth={1.2} />
                  <circle cx={x} cy={row * 20 + 24} r={2} fill={C.muted} />
                </g>
              );
            })}
            <line x1={X(0)} x2={X(10)} y1={78} y2={78} stroke={G.line} strokeWidth={1.4} />
            {pos.map(({ r, y: ry, hh }, i) => {
              const bandY = bred ? ry + (r.id === "mil" || r.id === "plate" ? 12 : 13) : ry + 22;
              const x1 = X(r.lo);
              const x2 = X(r.hi);
              const bh = 14;
              const midY = bandY + bh / 2;
              return (
                <g key={r.id}>
                  {i > 0 ? <line x1={bred ? 8 : 8} x2={bred ? 712 : 292} y1={ry - 3} y2={ry - 3} stroke={G.panel2} strokeWidth={1} /> : null}
                  {bred ? (
                    <T x={8} y={midY + 5 - (r.navn.length - 1) * 9} lines={r.navn} size={14} weight={700} lh={18} />
                  ) : (
                    <T x={8} y={ry + 16} lines={r.navn.join(" ")} size={14} weight={700} />
                  )}
                  {r.punkt ? (
                    <g>
                      <ellipse cx={x1} cy={midY} rx={PER * 0.12} ry={9} fill={r.farge} opacity={0.35} className="a a-pulse" />
                      <circle cx={x1} cy={midY} r={6} fill={r.farge} />
                    </g>
                  ) : r.fuzzy ? (
                    <rect x={x1} y={bandY} width={x2 - x1} height={bh} rx={7} fill="url(#g2b-tid-fuzz)" />
                  ) : (
                    <rect x={x1} y={bandY} width={Math.max(x2 - x1, 6)} height={bh} rx={5} fill={r.farge} opacity={0.9} />
                  )}
                  {(r.marks ?? []).map((m, k) => (
                    <g key={k}>
                      <line x1={X(m)} x2={X(m)} y1={bandY - 5} y2={bandY + bh + 5} stroke={C.white} strokeWidth={2} />
                      <circle cx={X(m)} cy={midY} r={3.4} fill={C.white} className={k % 2 ? "a a-pulse" : "a a-pulse2"} />
                    </g>
                  ))}
                  {/* tidstekst */}
                  {bred ? (
                    r.side === "l" ? (
                      <T x={x1 - 12} y={r.tid.length > 1 ? midY - 6 - (r.tid.length - 1) * 9 + 9 : midY + 5} lines={r.tid} size={14} fill={C.fg} anchor="end" lh={18} />
                    ) : (
                      <T x={Math.max(x2, x1) + (r.punkt ? 18 : 12)} y={midY + 5 - (r.tid.length - 1) * 9} lines={r.tid} size={14} fill={C.fg} lh={18} />
                    )
                  ) : (
                    <T x={8} y={bandY + bh + 20} lines={r.tid} size={14} fill={C.fg} lh={18} />
                  )}
                </g>
              );
            })}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- FigSolflekker ---------- */

export function FigSolflekker() {
  const sisteAar = SOLFLEKK[SOLFLEKK.length - 1][0];
  // Topper: lokale maksimum innen ±4 år og over 40.
  const topper = SOLFLEKK.filter(([y, v], i) => {
    if (v < 40) return false;
    for (let k = Math.max(0, i - 4); k <= Math.min(SOLFLEKK.length - 1, i + 4); k++) if (SOLFLEKK[k][1] > v) return false;
    return i > 0 && i < SOLFLEKK.length - 1;
  });
  return (
    <G2Figur
      title="Solflekktall og Maunder-minimum"
      desc={`Linjediagram over årlig internasjonalt solflekktall fra 1749 til ${sisteAar}, med tydelige topper omtrent hvert 11. år (8 til 14 år mellom toppene). Et skravert bånd viser Maunder-minimum 1645–1715. Båndet går ut av venstre kant, siden figuren starter i 1700. Ingen temperaturkurve er tegnet.`}
      heading="Solflekktall og Maunder-minimum"
      caption={`Årlig gjennomsnittlig internasjonalt solflekktall (versjon 2). Data: SILSO, Royal Observatory of Belgium, hentet via NOAA Space Weather Prediction Center. Lisens CC BY-NC. Årsmiddel beregnet av oss fra månedsverdier, siste hele år ${sisteAar}. Datareden starter i 1749. Maunder-minimum etter Owens mfl. (2017).`}
      narrow={{ w: 300, h: 496 }}
      wide={{ w: 720, h: 412 }}
      animated
      name="Solflekktall"
    >
      {({ bred }) => {
        const px0 = bred ? 62 : 46;
        const px1 = bred ? 704 : 288;
        const py0 = bred ? 70 : 96;
        const py1 = bred ? 320 : 330;
        const a0 = 1700;
        const a1 = 2030;
        const X = (a: number) => px0 + ((a - a0) / (a1 - a0)) * (px1 - px0);
        const Y = (v: number) => py1 - (v / 300) * (py1 - py0);
        const lin = SOLFLEKK.map(([a, v], i) => `${i ? "L" : "M"}${X(a).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
        const omr = `${lin} L${X(SOLFLEKK[SOLFLEKK.length - 1][0]).toFixed(1)} ${py1} L${X(SOLFLEKK[0][0]).toFixed(1)} ${py1} Z`;
        const aars = bred ? [1700, 1750, 1800, 1850, 1900, 1950, 2000] : [1700, 1800, 1900, 2000];
        const mx2 = X(1715);
        const siste = SOLFLEKK[SOLFLEKK.length - 1];
        return (
          <>
            <defs>
              <pattern id="g2b-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="7" height="7" fill="#1b2a34" />
                <line x1="0" y1="0" x2="0" y2="7" stroke={C.cold} strokeWidth="2.4" opacity="0.8" />
              </pattern>
              <linearGradient id="g2b-sol-fyll" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={G.amber} stopOpacity="0.35" />
                <stop offset="1" stopColor={G.amber} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0, 100, 200, 300].map((v) => (
              <g key={v}>
                <line x1={px0} x2={px1} y1={Y(v)} y2={Y(v)} stroke={G.grid} strokeWidth={1.2} />
                <T x={px0 - 6} y={Y(v) + 5} lines={String(v)} size={14} fill={C.muted} anchor="end" />
              </g>
            ))}
            <T x={px0 + 24} y={bred ? 60 : 84} lines={bred ? "Solflekktall (årsmiddel)" : "Solflekktall"} size={14} fill={C.muted} />
            {aars.map((a) => (
              <g key={a}>
                <line x1={X(a)} x2={X(a)} y1={py1} y2={py1 + 5} stroke={C.muted} strokeWidth={1.2} />
                <T x={X(a)} y={py1 + 22} lines={String(a)} size={14} fill={C.muted} anchor="middle" />
              </g>
            ))}
            {/* Maunder-båndet */}
            <rect x={px0} y={py0} width={mx2 - px0} height={py1 - py0} fill="url(#g2b-hatch)" opacity={0.95} />
            <line x1={mx2} x2={mx2} y1={py0} y2={py1} stroke={C.cold} strokeWidth={1.4} />
            {bred ? (
              <>
                <T x={px0} y={30} lines="Maunder-minimum 1645–1715 (Owens mfl., 2017)" size={14} fill={C.cold} weight={700} />
                <line x1={px0 + 14} x2={px0 + 14} y1={38} y2={py0} stroke={C.cold} strokeWidth={1.4} />
              </>
            ) : (
              <>
                <T x={8} y={26} lines={["Maunder-minimum 1645–1715", "(Owens mfl., 2017)"]} size={14} fill={C.cold} weight={700} />
                <line x1={px0 + 8} x2={px0 + 8} y1={52} y2={py0} stroke={C.cold} strokeWidth={1.4} />
              </>
            )}
            <path d={omr} fill="url(#g2b-sol-fyll)" />
            <path d={lin} fill="none" stroke={G.amber} strokeWidth={bred ? 1.8 : 1.6} strokeLinejoin="round" />
            {topper.map(([a, v], i) => (
              <circle key={a} cx={X(a)} cy={Y(v)} r={bred ? 3.6 : 3} fill={C.white} stroke={G.amber} strokeWidth={1.4} className={i % 2 ? "a a-pulse" : "a a-pulse2"} />
            ))}
            <circle cx={X(siste[0])} cy={Y(siste[1])} r={bred ? 5 : 4.5} fill={G.amber} className="a a-pulse" />
            {/* Notater */}
            {bred ? (
              <>
                <T x={px0} y={py1 + 52} lines="◂ Maunder-minimum fortsetter bak venstre kant, til 1645. Figuren har data fra 1749." size={14} fill={C.muted} />
                <circle cx={px0 + 6} cy={py1 + 74} r={4} fill={C.white} stroke={G.amber} strokeWidth={1.4} />
                <T x={px0 + 18} y={py1 + 79} lines="Topp i en solsyklus. Syklusene varer 8–14 år, i gjennomsnitt 11 år." size={14} fill={C.fg} />
              </>
            ) : (
              <>
                <T x={8} y={py1 + 52} lines={["◂ Maunder-minimum fortsetter", "bak venstre kant, til 1645.", "Figuren har data fra 1749."]} size={14} fill={C.muted} />
                <circle cx={14} cy={py1 + 108} r={4} fill={C.white} stroke={G.amber} strokeWidth={1.4} />
                <T x={26} y={py1 + 113} lines={["Topp i en solsyklus.", "Syklusene varer 8–14 år,", "i gjennomsnitt 11 år."]} size={14} fill={C.fg} />
              </>
            )}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- FigTektonikkKarbon ---------- */

const KJEDE = [
  { t: ["Oppløfting av", "Tibet-platået", "og Himalaya"], k: ["Raymo & Ruddiman", "(1992)"], f: C.sand },
  { t: ["Økt kjemisk", "forvitring av", "bergarter"], k: null, f: C.rain },
  { t: ["CO₂ tas ut", "av lufta"], k: null, f: G.green },
  { t: ["Lavere CO₂ i", "sen kenozoikum", "(de siste 40", "millioner årene)"], k: null, f: C.cold },
  { t: ["Global", "avkjøling"], k: null, f: C.white },
];

function Ikon({ i, x, y }: { i: number; x: number; y: number }) {
  // Små egne ikoner, ca. 56 × 44, sentrert i x, topp i y.
  switch (i) {
    case 0:
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M-28 42 L-8 6 L2 22 L10 10 L28 42 Z" fill="#5c6c76" />
          <path d="M-8 6 L-14 17 L-8 14 L-3 18 Z" fill={C.white} />
          <path d="M10 10 L5 19 L10 16 L14 20 Z" fill={C.white} />
          <g className="a a-rise" style={{ ["--dy" as string]: "-4px" }}>
            <path d="M-12 42 L-8 34 M0 42 L4 34 M14 42 L18 34" stroke={C.sand} strokeWidth={2} strokeLinecap="round" />
          </g>
        </g>
      );
    case 1:
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M-26 42 L-18 18 L-2 12 L14 18 L26 42 Z" fill="#6c7d88" />
          <path d="M-14 26 L-6 22 M2 24 L12 30 M-6 34 L6 36" stroke="#8b9aa6" strokeWidth={1.6} strokeLinecap="round" />
          {[-16, -2, 12].map((dx, k) => (
            <path key={k} d={`M${dx} 0 q-3 7 0 7 q3 0 0 -7`} fill={C.rain} className={k % 2 ? "a a-drift" : "a a-drift2"} style={{ ["--dy" as string]: "8px" }} />
          ))}
        </g>
      );
    case 2:
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M-24 14 C-24 6 -14 4 -10 8 C-8 0 6 0 8 8 C16 6 24 10 24 16 C24 22 -24 22 -24 14 Z" fill="#9fb0bb" opacity={0.7} />
          <g className="a a-rise" style={{ ["--dy" as string]: "10px" }}>
            <path d="M0 24 L0 40" stroke={G.green} strokeWidth={2.4} strokeLinecap="round" />
            <path d="M-6 35 L0 42 L6 35" fill="none" stroke={G.green} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      );
    case 3:
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M-26 40 L-26 4 M-26 40 L26 40" stroke={C.muted} strokeWidth={1.6} fill="none" />
          <path d="M-24 8 C-10 12 0 22 24 34" stroke={C.cold} strokeWidth={2.6} fill="none" strokeLinecap="round" />
          <circle cx={24} cy={34} r={3.6} fill={C.cold} className="a a-pulse" />
        </g>
      );
    default:
      return (
        <g transform={`translate(${x} ${y})`} stroke={C.white} strokeWidth={2.2} strokeLinecap="round">
          {[0, 60, 120].map((a) => (
            <line key={a} x1={0} y1={-18} x2={0} y2={18} transform={`translate(0 22) rotate(${a})`} />
          ))}
          <circle cx={0} cy={22} r={3} fill={C.white} stroke="none" className="a a-pulse" />
        </g>
      );
  }
}

export function FigTektonikkKarbon() {
  return (
    <G2Figur
      title="Hypotesen om Himalaya, forvitring og CO₂"
      desc="Flytskjema merket Hypotese. Oppløfting av Tibet-platået og Himalaya (Raymo og Ruddiman, 1992) kan ha ført til økt kjemisk forvitring av bergarter. Forvitringen kan ha tatt CO₂ ut av lufta. Det kan ha gitt lavere CO₂ i sen kenozoikum, de siste 40 millioner årene, og global avkjøling."
      heading="Hypotesen om Himalaya, forvitring og CO₂"
      caption="Hypotese, ikke et sikkert forløp: forfatterne skriver at oppløftingen «kan ha ført til» avkjølingen. Hver pil leses som «kan ha ført til». Kilder: Raymo & Ruddiman (1992); Gulev mfl. (2021)."
      narrow={{ w: 300, h: 698 }}
      wide={{ w: 720, h: 280 }}
      animated
      name="Hypotesen"
    >
      {({ bred, mk }) => (
        <>
          <rect x={bred ? 8 : 8} y={10} width={96} height={30} rx={15} fill={G.amber} />
          <T x={bred ? 56 : 56} y={31} lines="Hypotese" size={16} fill={C.bg} weight={800} anchor="middle" />
          {bred
            ? KJEDE.map((k, i) => {
                const bw = 112;
                const gap = 34;
                const x0 = 8 + i * (bw + gap);
                const cx = x0 + bw / 2;
                return (
                  <g key={i}>
                    <Ikon i={i} x={cx} y={62} />
                    <Box x={x0} y={118} w={bw} h={96} stroke={k.f} />
                    <T x={cx} y={118 + 48 - (k.t.length - 1) * 9 + 5} lines={k.t} size={14} anchor="middle" lh={18} weight={600} />
                    {k.k ? <T x={cx} y={236} lines={k.k} size={14} fill={C.muted} anchor="middle" lh={18} /> : null}
                    {i < 4 ? (
                      <g>
                        <Flow d={`M${x0 + bw + 4} 166 L${x0 + bw + gap - 4} 166`} color={C.fg} marker={mk.fg} />
                        <T x={x0 + bw + gap / 2} y={154} lines="kan" size={14} fill={C.fg} anchor="middle" weight={700} />
                      </g>
                    ) : null}
                  </g>
                );
              })
            : KJEDE.map((k, i) => {
                const by = 60 + i * 132;
                const bh = 96;
                const n = k.t.length + (k.k ? 1 : 0);
                const y0 = by + bh / 2 - (n * 18) / 2 + 14;
                return (
                  <g key={i}>
                    <Box x={8} y={by} w={284} h={bh} stroke={k.f} />
                    <Ikon i={i} x={48} y={by + 24} />
                    <T x={92} y={y0} lines={k.t} size={14} lh={18} weight={600} />
                    {k.k ? <T x={92} y={y0 + k.t.length * 18} lines={k.k.join(" ")} size={14} fill={C.muted} /> : null}
                    {i < 4 ? (
                      <g>
                        <Flow d={`M150 ${by + bh + 4} L150 ${by + bh + 32}`} color={C.fg} marker={mk.fg} />
                        <T x={164} y={by + bh + 24} lines="kan" size={14} fill={C.fg} weight={700} />
                      </g>
                    ) : null}
                  </g>
                );
              })}
        </>
      )}
    </G2Figur>
  );
}

/* ---------- FigNaturligVsMenneskelig ---------- */

const R3 = [
  { navn: ["Menneskeskapt", "total"], lo: 0.8, hi: 1.3, mid: 1.07, f: C.low, tekst: ["1,07 °C", "sannsynlig intervall", "0,8 til 1,3 °C"], smal: ["1,07 °C, sannsynlig intervall", "0,8 til 1,3 °C"] },
  { navn: ["Naturlige pådrivere", "(sol og vulkaner)"], lo: -0.1, hi: 0.1, mid: null, f: C.teal, tekst: [`${MINUS}0,1 til +0,1 °C`], smal: [`${MINUS}0,1 til +0,1 °C`] },
  { navn: ["Indre variabilitet"], lo: -0.2, hi: 0.2, mid: null, f: C.cold, tekst: [`${MINUS}0,2 til +0,2 °C`], smal: [`${MINUS}0,2 til +0,2 °C`] },
];

export function FigNaturligVsMenneskelig() {
  return (
    <G2Figur
      title="Bidrag til global overflatetemperatur, 1850–1900 til 2010–2019"
      desc="Tre horisontale intervall langs en akse for temperaturendring fra minus 0,4 til pluss 1,4 grader. Menneskeskapt total: beste anslag 1,07 grader, sannsynlig intervall 0,8 til 1,3 grader. Naturlige pådrivere, sol og vulkaner: minus 0,1 til pluss 0,1 grader. Indre variabilitet: minus 0,2 til pluss 0,2 grader. En loddrett linje markerer null."
      heading="Naturlig mot menneskeskapt oppvarming"
      caption="Endring i global overflatetemperatur fra 1850–1900 til 2010–2019. Intervallene har ulik karakter og kan ikke legges sammen uten videre, derfor er de ikke stablet. Kilde: IPCC (2021), Summary for Policymakers, A.1.3."
      narrow={{ w: 300, h: 430 }}
      wide={{ w: 720, h: 296 }}
      animated
      name="Bidrag til oppvarming"
    >
      {({ bred }) => {
        const X0 = bred ? 214 : 22;
        const X1 = bred ? 690 : 280;
        const PER = (X1 - X0) / 1.8;
        const X = (v: number) => X0 + (v + 0.4) * PER;
        const steg = bred ? [-0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4] : [-0.4, 0, 0.4, 0.8, 1.2];
        const aky = bred ? 262 : 392;
        const fmt = (v: number) => (v < 0 ? MINUS : v > 0 ? "" : "") + nb(Math.abs(v), 1);
        return (
          <>
            <T x={bred ? 8 : 8} y={26} lines={bred ? "Endring i global overflatetemperatur (°C)" : ["Endring i global", "overflatetemperatur (°C)"]} size={14} fill={C.muted} />
            {steg.map((v) => (
              <g key={v}>
                <line x1={X(v)} x2={X(v)} y1={bred ? 50 : 70} y2={aky} stroke={G.grid} strokeWidth={1.2} />
                <T x={X(v)} y={aky + 22} lines={fmt(v)} size={14} fill={C.muted} anchor="middle" />
              </g>
            ))}
            <line x1={X(0)} x2={X(0)} y1={bred ? 46 : 66} y2={aky} stroke={C.fg} strokeWidth={2} />
            <T x={bred ? X(0) + 8 : X(0)} y={bred ? 60 : 60} lines="0" size={14} fill={C.fg} weight={700} anchor={bred ? "start" : "middle"} />
            {R3.map((r, i) => {
              const ry = bred ? 80 + i * 62 : 100 + i * 96;
              const bh = 22;
              return (
                <g key={i}>
                  {bred ? (
                    <T x={8} y={ry + bh / 2 + 5 - (r.navn.length - 1) * 9} lines={r.navn} size={14} weight={700} lh={18} />
                  ) : (
                    <>
                      <rect x={4} y={ry - 25} width={r.navn.join(" ").length * 7.9 + 8} height={21} fill={C.bg} />
                      <T x={8} y={ry - 10} lines={r.navn.join(" ")} size={14} weight={700} />
                    </>
                  )}
                  <rect x={X(r.lo)} y={ry} width={X(r.hi) - X(r.lo)} height={bh} rx={bh / 2} fill={r.f} opacity={0.85} />
                  {r.mid != null ? (
                    <g>
                      <circle cx={X(r.mid)} cy={ry + bh / 2} r={8} fill={C.white} stroke={C.bg} strokeWidth={2} className="a a-pulse" />
                    </g>
                  ) : null}
                  {bred ? (
                    X(r.hi) + 14 + 150 > 716 ? (
                      <T x={X(r.lo) - 14} y={ry + bh / 2 + 5 - (r.tekst.length > 1 ? 18 : 0)} lines={r.tekst} size={14} lh={18} fill={C.fg} anchor="end" />
                    ) : (
                      <T x={X(r.hi) + 14} y={ry + bh / 2 + 5 - (r.tekst.length > 1 ? 18 : 0)} lines={r.tekst} size={14} lh={18} fill={C.fg} />
                    )
                  ) : (
                    <>
                      <rect x={4} y={ry + bh + 6} width={Math.max(...r.smal.map((q: string) => q.length)) * 7.6 + 8} height={r.smal.length * 18 + 6} fill={C.bg} />
                      <T x={8} y={ry + bh + 20} lines={r.smal} size={14} fill={C.fg} lh={18} />
                    </>
                  )}
                </g>
              );
            })}
          </>
        );
      }}
    </G2Figur>
  );
}
