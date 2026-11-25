/**
 * Figur 4.8 (geografi kap. 4, «Meanderen flytter seg», «Elveslette og elveterrasse», «Delta og raviner»):
 * fire elveprosesser i samme skråperspektiv. Valg mellom fire bilder, ikke en avspilt kjede: meander og
 * avsnøring kan henge sammen, men terrasse og delta er egne prosesser (figurteksten). Ingen tidsintervaller,
 * strømhastigheter eller målestokk. Terrenget er konstruert og viser ikke et bestemt sted.
 */
import { useState, type ReactNode } from "react";
import { IsbreFigur, type Key, type Lab } from "./isbre-figur";
import { smoothPath } from "./isbre-kit";

type P = [number, number];
/** Skråperspektiv: u langs dalen (0–1, mot høyre), v innover (0 foran, 1 bak). */
const pr = (u: number, v: number): P => [Math.round((40 + 90 * v + 780 * u) * 10) / 10, Math.round((430 - 300 * v) * 10) / 10];
const lin = (pts: P[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
const glatt = (uv: P[]) => smoothPath(uv.map(([u, v]) => pr(u, v)));

const F = {
  gress: "#4f7a45",
  gressMork: "#3d6136",
  slette: "#6b8f4e",
  sand: "#d9c28a",
  vann: "#3b8fc4",
  vannLys: "#8fd0f2",
  erosjon: "#f4a259",
  jord: "#8a6a4a",
  tekst: "#e8eef2",
  dempet: "#9fb0bd",
};

/** Senterlinje for et slyngende løp. */
const meander = (n = 80, amp = 0.24): P[] => Array.from({ length: n + 1 }, (_, i) => {
  const u = i / n;
  return [u, 0.5 + amp * Math.sin(u * Math.PI * 3.2 + 0.4)] as P;
});
const LOP = meander();

/** Sandører i innersvingene (halvmåner) ved toppunktene av svingene. */
function sandorer(amp = 0.24) {
  const ut: ReactNode[] = [];
  for (let k = 0; k < 3; k++) {
    const u0 = (Math.PI / 2 + k * Math.PI - 0.4) / (Math.PI * 3.2);
    if (u0 < 0.05 || u0 > 0.95) continue;
    const opp = k % 2 === 0; // svingen bøyer bakover (v stor) når opp
    const tegn = opp ? -1 : 1;
    const bue: P[] = [];
    for (let i = 0; i <= 16; i++) {
      const t = -1 + (2 * i) / 16;
      const u = u0 + t * 0.085;
      const v = 0.5 + amp * Math.sin(u * Math.PI * 3.2 + 0.4) + tegn * 0.035;
      bue.push([u, v]);
    }
    const indre = bue.slice().reverse().map(([u, v], i) => [u, v + tegn * 0.09 * Math.sin((Math.PI * i) / 16)] as P);
    ut.push(<path key={`s${k}`} d={`${lin([...bue, ...indre].map(([u, v]) => pr(u, v)))} Z`} fill={F.sand} stroke="#a88f5a" strokeWidth={1} />);
    // erosjonskant i yttersvingen
    const ytre: P[] = [];
    for (let i = 0; i <= 14; i++) {
      const u = u0 + (-1 + (2 * i) / 14) * 0.07;
      ytre.push([u, 0.5 + amp * Math.sin(u * Math.PI * 3.2 + 0.4) - tegn * 0.05]);
    }
    ut.push(<path key={`e${k}`} d={glatt(ytre)} fill="none" stroke={F.erosjon} strokeWidth={4} strokeLinecap="round" />);
  }
  return ut;
}

function Blokk({ terrasse = false, delta = false, children }: { terrasse?: boolean; delta?: boolean; children?: ReactNode }) {
  const a = pr(0, 0), b = pr(1, 0), c = pr(1, 1), d = pr(0, 1);
  const H = 70;
  return (
    <g>
      <defs>
        <linearGradient id="lelv-himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1f3347" /><stop offset="100%" stopColor="#3d6584" /></linearGradient>
        <linearGradient id="lelv-flate" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5f8a4f" /><stop offset="100%" stopColor="#4a7240" /></linearGradient>
        <linearGradient id="lelv-vann" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b8fc4" /><stop offset="100%" stopColor="#2a6f9e" /></linearGradient>
      </defs>
      <rect x={0} y={0} width={960} height={540} fill="url(#lelv-himmel)" data-nocheck="" />
      {/* forside og høyre side av blokka med lag */}
      <path d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${b[0]} ${b[1] + H} L${a[0]} ${a[1] + H} Z`} fill={F.jord} stroke="#3a2c1f" strokeWidth={1.5} />
      <path d={`M${b[0]} ${b[1]} L${c[0]} ${c[1]} L${c[0]} ${c[1] + H} L${b[0]} ${b[1] + H} Z`} fill="#6e543a" stroke="#3a2c1f" strokeWidth={1.5} />
      {[16, 32, 50].map((dy, i) => (
        <path key={dy} d={`M${a[0]} ${a[1] + dy} L${b[0]} ${b[1] + dy} L${c[0]} ${c[1] + dy}`} fill="none" stroke={i === 1 ? "#c9a96a" : "#5a4330"} strokeOpacity={0.6} strokeWidth={i === 1 ? 3 : 1.4} data-nocheck="" />
      ))}
      {/* toppflata: elveslette */}
      <path d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]} L${d[0]} ${d[1]} Z`} fill={terrasse ? "#6f8a55" : "url(#lelv-flate)"} stroke="#24361f" strokeWidth={1.5} />
      {/* åkerstriper og trær på sletta */}
      {!delta && !terrasse
        ? [0.12, 0.86].map((u) => [0.1, 0.16, 0.22].map((v) => <path key={`${u}${v}`} d={lin([pr(u - 0.07, v), pr(u + 0.07, v)])} stroke="#8fae5f" strokeWidth={2} opacity={0.5} data-nocheck="" />))
        : null}
      {children}
    </g>
  );
}

function Elv({ pts, w = 16, piler = true }: { pts: P[]; w?: number; piler?: boolean }) {
  const d = glatt(pts);
  return (
    <g>
      <path d={d} fill="none" stroke="#173a52" strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="url(#lelv-vann)" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {piler ? <path d={d} fill="none" stroke={F.vannLys} strokeWidth={2} strokeDasharray="10 14" strokeLinecap="round" opacity={0.85} data-nocheck="" /> : null}
    </g>
  );
}

const VALG = ["Meander", "Avsnøring", "Elveterrasse", "Delta"] as const;

const L = (text: string, x: number, y: number, at?: P, ekstra: Partial<Lab> = {}): Lab => ({ text, x, y, at, anchor: "middle", color: F.tekst, weight: 700, size: 14, badge: [x, y], ...ekstra });

function bilde(s: number): { tegning: ReactNode; labels: Lab[]; keys: Key[] } {
  const elvKey: Key = { text: "elv", color: F.vann, kind: "line" };
  const sandKey: Key = { text: "sand og grus (avsetning)", color: F.sand, kind: "fill" };
  const erosjonKey: Key = { text: "erosjon i yttersvingen", color: F.erosjon, kind: "line" };
  const sletteKey: Key = { text: "elveslette", color: "#5f8a4f", kind: "fill" };
  if (s === 0) {
    const gammel = meander(80, 0.18).map(([u, v]) => [u, v - 0.02] as P);
    return {
      tegning: (
        <Blokk>
          <path d={glatt(gammel)} fill="none" stroke="#cfe6f5" strokeOpacity={0.45} strokeWidth={3} strokeDasharray="6 8" data-nocheck="" />
          {sandorer()}
          <Elv pts={LOP} />
        </Blokk>
      ),
      labels: [
        L("Yttersving: erosjon", 300, 70, pr(0.178, 0.78)),
        L("Innersving: avsetning", 250, 500, pr(0.2, 0.62)),
        L("Løpet kan flytte seg", 720, 500, pr(0.6, 0.33)),
      ],
      keys: [elvKey, sandKey, erosjonKey, sletteKey, { text: "tidligere løp (prinsipp)", color: "#cfe6f5", kind: "dash" }],
    };
  }
  if (s === 1) {
    // en svanehalssving: elva har tatt snarveien over den smale halsen, og den gamle svingen står igjen som kroksjø
    const nytt: P[] = [[0.02, 0.56], [0.14, 0.64], [0.28, 0.56], [0.4, 0.5], [0.5, 0.49], [0.6, 0.5], [0.72, 0.58], [0.86, 0.52], [0.98, 0.44]];
    const sjo: P[] = [[0.415, 0.43], [0.385, 0.32], [0.43, 0.2], [0.5, 0.16], [0.57, 0.2], [0.615, 0.32], [0.585, 0.43]];
    return {
      tegning: (
        <Blokk>
          <path d={glatt(sjo)} fill="none" stroke="#173a52" strokeWidth={21} strokeLinecap="round" />
          <path d={glatt(sjo)} fill="none" stroke="#5aa6cf" strokeWidth={16} strokeLinecap="round" />
          <Elv pts={nytt} />
        </Blokk>
      ),
      labels: [
        L("Snarvei over halsen", 470, 60, pr(0.5, 0.49)),
        L("Kroksjø: avsnørt sving", 640, 500, pr(0.56, 0.19)),
      ],
      keys: [elvKey, { text: "kroksjø", color: "#5aa6cf", kind: "fill" }, sletteKey],
    };
  }
  if (s === 2) {
    // elva har skåret seg ned: lav dalbunn langs løpet, eldre elveslette står igjen som terrasser
    const bunnV0 = 0.36, bunnV1 = 0.64;
    const a0 = pr(0, bunnV0), b0 = pr(1, bunnV0), b1 = pr(1, bunnV1), a1 = pr(0, bunnV1);
    const ned = 34;
    const lavt = (q: P): P => [q[0], q[1] + ned];
    const rett: P[] = Array.from({ length: 41 }, (_, i) => [i / 40, 0.5 + 0.08 * Math.sin((i / 40) * Math.PI * 3)] as P);
    return {
      tegning: (
        <Blokk terrasse>
          {/* skråkanter (terrassekanter) og lav dalbunn */}
          <path d={`M${a0[0]} ${a0[1]} L${b0[0]} ${b0[1]} L${lavt(b0)[0]} ${lavt(b0)[1] - 8} L${lavt(a0)[0]} ${lavt(a0)[1] - 8} Z`} fill="#7a6a4a" />
          <path d={`M${lavt(a0)[0]} ${lavt(a0)[1] - 8} L${lavt(b0)[0]} ${lavt(b0)[1] - 8} L${lavt(b1)[0]} ${lavt(b1)[1]} L${lavt(a1)[0]} ${lavt(a1)[1]} Z`} fill="url(#lelv-flate)" stroke="#24361f" strokeWidth={1.2} />
          <path d={`M${a1[0]} ${a1[1]} L${b1[0]} ${b1[1]} L${lavt(b1)[0]} ${lavt(b1)[1]} L${lavt(a1)[0]} ${lavt(a1)[1]} Z`} fill="#8a7752" opacity={0.85} />
          <path d={lin([a1, b1])} stroke="#24361f" strokeWidth={1.5} fill="none" />
          <g transform={`translate(0 ${ned - 4})`}><Elv pts={rett} w={13} /></g>
        </Blokk>
      ),
      labels: [
        L("Eldre elveslette (terrasse)", 250, 60, pr(0.2, 0.82)),
        L("Terrasse over nytt løp", 720, 500, pr(0.75, 0.25)),
        L("Nytt, lavere løp", 520, 500, [pr(0.5, 0.5)[0], pr(0.5, 0.5)[1] + ned - 4]),
      ],
      keys: [elvKey, { text: "terrassekant (skråning)", color: "#7a6a4a", kind: "fill" }, { text: "eldre elveslette", color: "#6f8a55", kind: "fill" }, sletteKey],
    };
  }
  // delta: elva møter roligere vann og deler seg
  const inn: P[] = Array.from({ length: 31 }, (_, i) => [0.02 + (i / 30) * 0.5, 0.5 + 0.06 * Math.sin((i / 30) * Math.PI * 2)] as P);
  const grein = (dv: number): P[] => [[0.52, 0.5], [0.6, 0.5 + dv * 0.5 + 0.02], [0.69, 0.5 + dv]];
  const sjoA = pr(0.62, 0), sjoB = pr(1, 0), sjoC = pr(1, 1), sjoD = pr(0.62, 1);
  const vifte: P[] = [[0.5, 0.46], [0.6, 0.22], [0.72, 0.2], [0.76, 0.5], [0.72, 0.8], [0.6, 0.78], [0.5, 0.54]];
  return {
    tegning: (
      <Blokk delta>
        <path d={`M${sjoA[0]} ${sjoA[1]} L${sjoB[0]} ${sjoB[1]} L${sjoC[0]} ${sjoC[1]} L${sjoD[0]} ${sjoD[1]} Z`} fill="#2d77a8" stroke="#173a52" strokeWidth={1.2} />
        {[0.2, 0.4, 0.6, 0.8].map((v) => <path key={v} d={lin([pr(0.8, v), pr(0.95, v)])} stroke="#9bd2f0" strokeOpacity={0.4} strokeWidth={1.6} data-nocheck="" />)}
        <path d={`${glatt(vifte)} Z`} fill="#c9b27a" opacity={0.35} data-nocheck="" />
        <path d={`${glatt(vifte.map(([u, v]) => [u - 0.02, 0.5 + (v - 0.5) * 0.85] as P))} Z`} fill={F.sand} stroke="#a88f5a" strokeWidth={1.2} />
        <Elv pts={inn} />
        {[-0.26, 0, 0.24].map((dv) => <Elv key={dv} pts={grein(dv)} w={8} piler={false} />)}
      </Blokk>
    ),
    labels: [
      L("Roligere vann", 820, 60, pr(0.86, 0.75)),
      L("Delta: avsatte sedimenter", 560, 500, pr(0.66, 0.3)),
      L("Løpet deles i flere greiner", 330, 60, pr(0.62, 0.7)),
    ],
    keys: [elvKey, sandKey, { text: "innsjø eller hav", color: "#2d77a8", kind: "fill" }, sletteKey],
  };
}

export function GeografiElvFigur({ heading, tekster, caption }: { heading: string; tekster: readonly string[]; caption: ReactNode }) {
  const [s, setS] = useState(0);
  const b = bilde(s);
  return (
    <IsbreFigur
      heading={heading}
      title={`Skjematisk skråperspektiv over en elveslette: ${VALG[s]}. ${tekster[s]}`}
      caption={caption}
      viewBox="0 0 960 540"
      toolbar={
        <div role="group" aria-label="Velg elveprosess" className="flex flex-wrap gap-2">
          {VALG.map((n, i) => (
            <button key={n} type="button" aria-pressed={s === i} onClick={() => setS(i)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${s === i ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted/40 text-foreground hover:bg-muted"}`}>
              {n}
            </button>
          ))}
        </div>
      }
      status={tekster[s]}
      labels={b.labels}
      keys={b.keys}
      notes={["Prinsippfigur uten geografisk sted eller målestokk", "Samme skråperspektiv i alle fire bilder"]}
    >
      {() => <g data-figur="geo-elv" data-step={s + 1}>{b.tegning}</g>}
    </IsbreFigur>
  );
}
