/**
 * Figurene i kapitlet Jetstrømmer (Geofag 2), bygget på prosess-kit (felles avspilling, tidslinje og steg).
 * Alt i figurene står i jetstrommer.md (NOAA u.å.-a og u.å.-b, AMS u.å., SNL u.å.) eller i fagsjekken til
 * Fagredaktør Geo (FIGURPLAN.md og fagsjekk-geo.md i figurloftet). Ingen tall, stedsnavn eller hPa-verdier
 * uten dekning i teksten. Kyster: Natural Earth 1:50m (klima-kart.ts).
 *
 * Konvensjon i snittene (JetProfil og TermiskVind): ekvator/sør til venstre, Nordpolen/nord til høyre.
 * Leseren ser da mot vest, så vestavinden (mot øst) kommer ut av arket: ⊙.
 *
 * Hver figur er en definisjon (steg, statustekst, nøkkelbilder, etiketter og tegning) som StegFigur viser.
 * Etikettene regnes ut én gang per steg, og ingen tegning bruker dangerouslySetInnerHTML.
 */
import { memo, type ReactNode } from "react";
import { IsbreFigur, type Key, type Lab, type Markers } from "./isbre-figur";
import { clamp, lerp, smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { TidslinjeKontroller } from "./prosess-figur";
import { tidslinjeVerdi, useTidslinje } from "./prosess-kit";
import { GLOBE_LAND, NA_LAND, naXY } from "./klima-kart";
import {
  JETSTREAK_TEKST,
  JET_NAO_TEKST,
  JET_OMEGA_TEKST,
  JET_PROFIL_TEKST,
  JET_SESONG_TEKST,
  JET_SLYNGER_TEKST,
  STORMBANE_TEKST,
  TERMISK_VIND_TEKST,
  VEST_OST_TEKST,
} from "./jetstrommer-tekst";

/* ---------- felles ---------- */

const F = {
  bg: "#0d1820",
  panel: "#122330",
  linje: "#4b6275",
  tekst: "#e8eef2",
  dempet: "#9fb0bd",
  jet: "#e0f2fe",
  jetBelte: "#38bdf8",
  varm: "#e8a46a",
  kald: "#7cb8e8",
  varmFyll: "#5a3a22",
  kaldFyll: "#1d3a55",
  lav: "#ff8b7a",
  hoy: "#7cc4ff",
  hav: "#173a4f",
  land: "#55604f",
  landKant: "#8e9784",
  front: "#c4a5f0",
  gronn: "#86efac",
  rod: "#fca5a5",
};

const r1 = (v: number) => Math.round(v * 10) / 10;
const R = Math.PI / 180;
type P = [number, number];
type Bilde = Record<string, number>;

type Tegn<S extends Bilde> = (s: S, k: { m: Markers; sek: number; fase: number }) => ReactNode;

type Def<S extends Bilde> = {
  id: string;
  tekst: { heading: string; title: string; caption: string };
  faser: string[];
  status: string[];
  /** Tilstand ved p = 0 … antall (bilder.length = faser.length + 1). */
  bilder: S[];
  etiketter: Lab[][];
  keys?: Key[];
  notes?: string[];
  viewBox: string;
  narrowViewBox?: string;
  /**
   * Smal skjerm: nummermerket legges avstand `d` ut fra punktet `fra` gjennom punktet etiketten peker på,
   * i stedet for rett over. På globusen er `fra` Nordpolen, så merket står på tvers av breddesirklene
   * og jetlinjene, ikke oppå dem.
   */
  merker?: { fra: P; d: number } | { kolonne: [number, number]; midt: number };
  tegn: Tegn<S>;
};

type Pkt = [number, number] | undefined;
const blandP = (a: Pkt, b: Pkt, t: number): Pkt =>
  a && b ? [r1(lerp(a[0], b[0], t)), r1(lerp(a[1], b[1], t))] : (t < 0.5 ? a : b);

/**
 * Etikettene følger det som faktisk tegnes: mellom to steg flyttes de med samme myke overgang som tegningen
 * (tidslinjeVerdi). Etiketter som bare finnes i det ene steget, vises først mot slutten av overgangen (eller
 * forsvinner tidlig), så de ikke peker på noe som ikke er tegnet ennå. Lagres per tiendedel av tidslinjen,
 * så det ikke lages nye objekter hvert bilde.
 */
function etiketterVed(
  etiketter: Lab[][],
  lager: Map<number, Lab[]>,
  p: number,
  merker?: { fra: P; d: number } | { kolonne: [number, number]; midt: number },
): Lab[] {
  const q = Math.round(p * 10);
  const hit = lager.get(q);
  if (hit) return hit;
  const pp = q / 10;
  const n = etiketter.length;
  const ved = (k: number) => etiketter[clamp(k - 1, 0, n - 1)];
  const k = Math.min(n - 1, Math.floor(clamp(pp, 0, n)));
  const t = smooth(clamp(pp, 0, n) - k);
  const A = ved(k);
  const B = ved(k + 1);
  const out: Lab[] = [];
  const brukt = new Set<number>();
  A.forEach((a) => {
    const j = B.findIndex((b, i) => !brukt.has(i) && b.text === a.text);
    if (j < 0) {
      if (t < 0.15) out.push(a);
      return;
    }
    brukt.add(j);
    const b = B[j];
    out.push({ ...b, x: r1(lerp(a.x, b.x, t)), y: r1(lerp(a.y, b.y, t)), at: blandP(a.at, b.at, t), badge: blandP(a.badge, b.badge, t) });
  });
  if (t > 0.85) B.forEach((b, i) => !brukt.has(i) && out.push(b));
  if (merker && "kolonne" in merker)
    // smal skjerm: merkene i en kolonne på hver side av globusen, på samme høyde som punktet
    out.forEach((l, i) => {
      if (!l.at || l.badge) return;
      const x = l.at[0] < merker.midt ? merker.kolonne[0] : merker.kolonne[1];
      out[i] = { ...l, badge: [x, l.at[1]] };
    });
  else if (merker)
    out.forEach((l, i) => {
      if (!l.at || l.badge) return;
      const dx = l.at[0] - merker.fra[0];
      const dy = l.at[1] - merker.fra[1];
      const len = Math.hypot(dx, dy);
      const [ux, uy] = len > 1 ? [dx / len, dy / len] : [0, -1];
      out[i] = { ...l, badge: [r1(l.at[0] + ux * merker.d), r1(l.at[1] + uy * merker.d)] };
    });
  lager.set(q, out);
  return out;
}

/** Fast høyde på statusfeltet (lengste statustekst), så figuren ikke hopper mellom stegene. */
const STATUS_H = "block h-[7.5rem] min-[480px]:h-[5rem] min-[900px]:h-[3.75rem]";

const LAGER = new WeakMap<object, Map<number, Lab[]>>();
function lagerFor(def: object) {
  let l = LAGER.get(def);
  if (!l) LAGER.set(def, (l = new Map()));
  return l;
}

function StegFigur<S extends Bilde>({ def, heading, caption }: { def: Def<S>; heading?: string; caption?: ReactNode }) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall: def.faser.length, synlig: visible, faseMs: 3600, holdMs: 1800, element: ref });
  const s = tidslinjeVerdi(def.bilder, tl.p);
  const fase = tl.fase;
  const navn = heading ?? def.tekst.heading;
  return (
    <div className="[&_ol]:min-h-[5.5rem] [&_ol]:content-start min-[760px]:[&_ol]:min-h-0">
      <IsbreFigur
        svgRef={ref}
        title={def.tekst.title}
        heading={navn}
        caption={caption ?? def.tekst.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={navn} />}
        toolbar={<TidslinjeKontroller tl={tl} faser={def.faser} />}
        status={<span className={STATUS_H}>{def.status[fase - 1]}</span>}
        keys={def.keys}
        labels={etiketterVed(def.etiketter, lagerFor(def), tl.p, def.merker)}
        notes={def.notes}
        viewBox={def.viewBox}
        narrowViewBox={def.narrowViewBox}
      >
        {({ m }) => (
          <g data-figur={def.id} data-step={fase} data-p={tl.p.toFixed(2)}>
            {def.tegn(s, { m, sek: tl.reduced ? 0 : tl.sek, fase })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

function lagFigur<S extends Bilde>(def: Def<S>) {
  return function JetFigur({ heading, caption }: { heading?: string; caption?: ReactNode }) {
    return <StegFigur def={def} heading={heading} caption={caption} />;
  };
}

/** ⊙: vinden blåser ut av arket, mot leseren. Ringer som brer seg ut, viser at lufta strømmer. */
function UtAvArket({ x, y, r, sek, farge = F.jet, ringer = true }: { x: number; y: number; r: number; sek: number; farge?: string; ringer?: boolean }) {
  return (
    <g aria-hidden="true">
      {ringer
        ? [0, 1].map((k) => {
            const u = (sek * 0.5 + k * 0.5) % 1;
            return (
              <circle
                key={k}
                cx={x}
                cy={y}
                r={r1(r * (1.1 + u * 0.9))}
                fill="none"
                stroke={farge}
                strokeWidth={1.4}
                opacity={r1((1 - u) * 0.6 * 10) / 10}
                data-nocheck=""
              />
            );
          })
        : null}
      <circle cx={x} cy={y} r={r1(r)} fill="#0b1620" stroke={farge} strokeWidth={r1(Math.max(2, r * 0.16))} />
      <circle cx={x} cy={y} r={r1(Math.max(2.5, r * 0.32))} fill={farge} />
    </g>
  );
}

function Pil({ fra, til, farge, w = 3, m, mk }: { fra: P; til: P; farge: string; w?: number; m?: Markers; mk?: keyof Markers }) {
  if (m && mk) {
    return <path d={`M${r1(fra[0])} ${r1(fra[1])} L${r1(til[0])} ${r1(til[1])}`} stroke={farge} strokeWidth={w} fill="none" markerEnd={`url(#${m[mk]})`} />;
  }
  const dx = til[0] - fra[0];
  const dy = til[1] - fra[1];
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const h = 6 + w * 2;
  const b: P = [til[0] - ux * h, til[1] - uy * h];
  const spiss = `${r1(til[0])},${r1(til[1])} ${r1(b[0] - uy * h * 0.55)},${r1(b[1] + ux * h * 0.55)} ${r1(b[0] + uy * h * 0.55)},${r1(b[1] - ux * h * 0.55)}`;
  return (
    <g aria-hidden="true">
      <line x1={r1(fra[0])} y1={r1(fra[1])} x2={r1(b[0])} y2={r1(b[1])} stroke={farge} strokeWidth={w} strokeLinecap="round" />
      <polygon points={spiss} fill={farge} />
    </g>
  );
}

function Trykk({ x, y, kind, size = 26, opacity = 1 }: { x: number; y: number; kind: "L" | "H"; size?: number; opacity?: number }) {
  const col = kind === "L" ? F.lav : F.hoy;
  return (
    <g aria-hidden="true" opacity={opacity < 0.99 ? r1(opacity * 100) / 100 : undefined}>
      <circle cx={r1(x)} cy={r1(y)} r={r1(size * 0.85)} fill="#0b1318" stroke={col} strokeWidth={2.5} />
      <text x={r1(x)} y={r1(y + size * 0.36)} textAnchor="middle" fontSize={size} fontWeight={800} fill={col}>
        {kind}
      </text>
    </g>
  );
}

/* ---------- globus (ortografisk, 35° V, 55° N), samme som klima-kart.ts GLOBE_* ---------- */

const GS = 1.25;
const GCX = 480;
const GCY = 270;
const GR = 200 * GS;

/** Punkt på globusen og om det er på forsiden (c > 0). */
function klode(lon: number, lat: number): [number, number, number] {
  const l0 = -35 * R;
  const p0 = 55 * R;
  const l = lon * R;
  const p = lat * R;
  const x = Math.cos(p) * Math.sin(l - l0);
  const y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l - l0);
  const c = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l - l0);
  return [r1(GCX + x * GR), r1(GCY - y * GR), c];
}
const kp = (lon: number, lat: number): P => {
  const [x, y] = klode(lon, lat);
  return [x, y];
};

/** Nordpolen på globusen: breddesirklene og jetlinjene går rundt dette punktet. */
const POLEN: P = kp(0, 90);

/** Sti gjennom punktene, bare den synlige delen (forsiden av globusen). */
function klodeSti(pts: P[]): string {
  let d = "";
  let inne = false;
  for (const [lon, lat] of pts) {
    const [x, y, c] = klode(lon, lat);
    if (c > 0.02) {
      d += `${inne ? "L" : "M"}${x} ${y} `;
      inne = true;
    } else inne = false;
  }
  return d.trim();
}

/** Bredde som funksjon av lengde, rundt hele kloden (vest til øst). */
function rundt(lat: (lon: number) => number, fra = -180, til = 180, steg = 3): P[] {
  const pts: P[] = [];
  for (let lon = fra; lon <= til; lon += steg) pts.push([lon, lat(lon)]);
  return pts;
}

const Klode = memo(function Klode({ id }: { id: string }) {
  return (
    <g aria-hidden="true" data-nocheck="">
      <defs>
        <clipPath id={`${id}-klode`}>
          <circle cx={GCX} cy={GCY} r={GR} />
        </clipPath>
        <radialGradient id={`${id}-hav`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#24597a" />
          <stop offset="100%" stopColor="#10283a" />
        </radialGradient>
      </defs>
      <circle cx={GCX} cy={GCY} r={GR} fill={`url(#${id}-hav)`} stroke="#9fb6c4" strokeOpacity={0.5} strokeWidth={1.5} />
      <g clipPath={`url(#${id}-klode)`}>
        <path d={GLOBE_LAND} transform={`translate(${GCX} ${GCY}) scale(${GS})`} fill={F.land} stroke={F.landKant} strokeWidth={0.6} />
      </g>
    </g>
  );
});

/** Jetstrømmen som bånd med strømmende streker (østover langs stien). */
function JetBaand({ d, w, sek, opacity = 1 }: { d: string; w: number; sek: number; opacity?: number }) {
  if (!d) return null;
  return (
    <g opacity={opacity < 0.99 ? r1(opacity * 100) / 100 : undefined}>
      <path d={d} fill="none" stroke={F.jetBelte} strokeOpacity={0.22} strokeWidth={r1(w * 3.2)} strokeLinecap="round" strokeLinejoin="round" data-nocheck="" />
      <path d={d} fill="none" stroke={F.jetBelte} strokeOpacity={0.35} strokeWidth={r1(w * 1.8)} strokeLinecap="round" strokeLinejoin="round" data-nocheck="" />
      <path d={d} fill="none" stroke={F.jet} strokeWidth={r1(w * 0.7)} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        fill="none"
        stroke="#0b1620"
        strokeOpacity={0.55}
        strokeWidth={r1(Math.max(1.2, w * 0.35))}
        strokeDasharray="10 26"
        strokeDashoffset={r1(-(sek * 60) % 36)}
        data-nocheck=""
      />
    </g>
  );
}

/* =====================================================================
 * P2 JetProfile: to jetstrømmer i høyden (snitt)
 * ===================================================================== */

const PX = (lat: number) => 110 + lat * 8.4;
const PROFIL_BAKKE = 470;
const SUB: P = [PX(30), 138];
const POL: P = [PX(55), 212];
const FRONT_D = `M${PX(42)} ${PROFIL_BAKKE} Q ${PX(50)} ${330} ${POL[0] - 6} ${POL[1] + 18}`;

const profil: Def<{ belte: number; front: number; vinter: number }> = {
  id: "jet-profil",
  tekst: JET_PROFIL_TEKST,
  faser: ["To jetstrømmer", "Belte, ikke strek", "Over polarfronten", "Sterkest om vinteren"],
  status: [
    "1. Det finnes to jetstrømmer: polarjeten mellom 50° og 60°, rundt 9100 meter, og den subtropiske jetstrømmen rundt 30°. Begge blåser fra vest mot øst, ut av arket.",
    "2. Jetstrømmen ligner en elv. Vinden er sterkest inn mot kjernen og svakere ut mot kantene. Beltet er bredere enn streken på et værkart.",
    "3. Polarjeten ligger over polarfronten, skillet mellom kald og varm luft. Der øker vestavinden med høyden.",
    "4. Om vinteren er skillet mellom varm og kald luft tydeligst, og begge jetstrømmene er sterkest.",
  ],
  bilder: [
    { belte: 0, front: 0, vinter: 0 },
    { belte: 0, front: 0, vinter: 0 },
    { belte: 1, front: 0, vinter: 0 },
    { belte: 1, front: 1, vinter: 0 },
    { belte: 1, front: 1, vinter: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "Den subtropiske jetstrømmen", x: SUB[0], y: 72, anchor: "middle", weight: 800, color: F.tekst, at: [SUB[0], SUB[1] - 22] },
      { text: "rundt 30°", x: SUB[0] + 105, y: 72, color: F.dempet, size: 13, narrowHide: true },
      { text: f >= 3 ? "Polarjeten (polarfrontjetstrømmen)" : "Polarjeten", x: POL[0] + 70, y: 290, weight: 800, color: F.tekst, at: [POL[0] + 22, POL[1] + 12] },
      { text: "mellom 50° og 60°, rundt 9100 m", x: POL[0] + 70, y: 310, color: F.dempet, size: 13, narrowHide: true },
      { text: "varm luft", x: 190, y: 420, color: F.varm, weight: 800 },
      { text: "kald luft", x: 790, y: 420, color: F.kald, weight: 800 },
    ];
    if (f === 2) l.push({ text: "kjernen: sterkest vind", x: POL[0] - 150, y: 150, anchor: "end", color: F.jetBelte, at: [POL[0] - 30, POL[1] - 10] });
    if (f >= 3) l.push({ text: "polarfronten", x: PX(42) - 20, y: 450, anchor: "end", color: F.front, weight: 700, at: [PX(44), 420] });
    return l;
  }),
  notes: ["⊙ = vinden blåser ut av arket, mot deg (mot øst)", "Skjematisk, høyden er sterkt overdrevet", "Nordlige halvkule"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const vinter = 1 + 0.35 * s.vinter;
    const belte = (c: P, rx: number) =>
      [3.1, 2.1, 1.3].map((k, i) => (
        <ellipse
          key={i}
          cx={c[0]}
          cy={c[1]}
          rx={r1(rx * k * vinter * (0.45 + 0.55 * s.belte))}
          ry={r1(rx * k * 0.55 * vinter * (0.45 + 0.55 * s.belte))}
          fill={F.jetBelte}
          opacity={r1((0.1 + i * 0.08) * (0.4 + 0.6 * s.belte) * 100) / 100}
          data-nocheck=""
        />
      ));
    const warm = `M110 ${PROFIL_BAKKE} L${PX(42)} ${PROFIL_BAKKE} Q ${PX(50)} 330 ${POL[0] - 6} ${POL[1] + 18} L${POL[0] - 6} 90 L110 90 Z`;
    const cold = `M${PX(90)} ${PROFIL_BAKKE} L${PX(42)} ${PROFIL_BAKKE} Q ${PX(50)} 330 ${POL[0] - 6} ${POL[1] + 18} L${POL[0] - 6} 90 L${PX(90)} 90 Z`;
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <path d={warm} fill={F.varmFyll} opacity={r1((0.25 + 0.35 * s.front) * 100) / 100} data-nocheck="" />
        <path d={cold} fill={F.kaldFyll} opacity={r1((0.3 + 0.4 * s.front) * 100) / 100} data-nocheck="" />
        {/* tropopausen uten navn: høy i tropene, lavere mot polen, brudd ved jetstrømmene */}
        <g stroke={F.dempet} strokeOpacity={0.55} strokeWidth={2} strokeDasharray="7 5" fill="none" data-nocheck="">
          <path d={`M110 108 L${PX(26)} 110`} />
          <path d={`M${PX(34)} 168 L${PX(51)} 182`} />
          <path d={`M${PX(59)} 238 L${PX(90)} 248`} />
        </g>
        {belte(SUB, 36)}
        {belte(POL, 44)}
        {s.front > 0.02 ? <path d={FRONT_D} fill="none" stroke={F.front} strokeWidth={4} opacity={s.front < 0.99 ? r1(s.front * 100) / 100 : undefined} /> : null}
        <UtAvArket x={SUB[0]} y={SUB[1]} r={13 * vinter} sek={sek} />
        <UtAvArket x={POL[0]} y={POL[1]} r={15 * vinter} sek={sek} />
        <line x1="110" y1={PROFIL_BAKKE} x2={PX(90)} y2={PROFIL_BAKKE} stroke={F.linje} strokeWidth={2.5} />
        <g fontSize={14} fill={F.dempet} textAnchor="middle">
          <text x={PX(0)} y={496}>ekvator</text>
          <text x={PX(30)} y={496}>30°</text>
          <text x={PX(60)} y={496}>60°</text>
          <text x={PX(90)} y={496}>Nordpolen</text>
        </g>
        <g fontSize={13} fontWeight={700} fill={F.dempet}>
          <text x={110} y={46}>sør</text>
          <text x={PX(90)} y={46} textAnchor="end">nord</text>
        </g>
      </>
    );
  },
};
export const JetProfilFigur = lagFigur(profil);

/* =====================================================================
 * P4 ThermalWind: termisk vind (snitt sør–nord)
 * ===================================================================== */

const TV_BAKKE = 470;
const tvFlate = (i: number, d: number) => {
  const yW = TV_BAKKE - 110 * i;
  const yC = TV_BAKKE - lerp(110, 72, d) * i;
  return { yW, yC, d: `M90 ${r1(yW)} L330 ${r1(yW)} C 480 ${r1(yW)} 480 ${r1(yC)} 630 ${r1(yC)} L870 ${r1(yC)}` };
};

const termisk: Def<{ d: number }> = {
  id: "termisk-vind",
  tekst: TERMISK_VIND_TEKST,
  faser: ["Lik temperatur", "Varm og kald side om side", "Større forskjell"],
  status: [
    "1. Med lik temperatur er trykkflatene vannrette, og vinden øker ikke med høyden.",
    "2. Der varm og kald luft ligger side om side, heller trykkflatene mot den kalde siden, og vestavinden øker med høyden.",
    "3. Jo større temperaturforskjellen er, desto raskere øker vestavinden med høyden. Dette kalles termisk vind.",
  ],
  bilder: [{ d: 0 }, { d: 0 }, { d: 0.5 }, { d: 1 }],
  etiketter: [0, 0.5, 1].map((d) => {
    const top = tvFlate(3, d);
    const l: Lab[] = [
      { text: d > 0 ? "varm luft" : "lik temperatur", x: 210, y: top.yW - 22, anchor: "middle", color: d > 0 ? F.varm : F.dempet, weight: 800 },
      { text: "samme trykk ved bakken", x: 480, y: 500, anchor: "middle", color: F.dempet, size: 13 },
      { text: "trykkflate", x: 862, y: r1(tvFlate(2, d).yC - 12), anchor: "end", color: F.dempet, size: 13, at: [880, r1(tvFlate(2, d).yC)], badge: [880, r1(tvFlate(2, d).yC - 52)] },
      { text: "vestavind ut av arket", x: 560, y: 86, color: "#9be7ff", weight: 700, at: [500, r1(TV_BAKKE - (2.5 * (110 + lerp(110, 72, d))) / 2) - 10], badge: [250, TV_BAKKE - 275] },
    ];
    if (d > 0) l.push({ text: "kald luft", x: 750, y: r1(top.yC - 22), anchor: "middle", color: F.kald, weight: 800 });
    return l;
  }),
  notes: ["⊙ = vinden blåser ut av arket, mot deg (mot øst), langs isotermene", "Skjematisk, nordlige halvkule"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek }) => {
    const d = s.d;
    const flater = [1, 2, 3].map((i) => tvFlate(i, d));
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <rect x="90" y={r1(flater[2].yW - 10)} width="240" height={r1(TV_BAKKE - flater[2].yW + 10)} fill={F.varmFyll} opacity={r1((0.25 + 0.5 * d) * 100) / 100} data-nocheck="" />
        <rect x="630" y={r1(flater[2].yC - 10)} width="240" height={r1(TV_BAKKE - flater[2].yC + 10)} fill={F.kaldFyll} opacity={r1((0.25 + 0.6 * d) * 100) / 100} data-nocheck="" />
        {flater.map((f, i) => (
          <path key={i} d={f.d} fill="none" stroke="#cbd5e1" strokeWidth={1.8} />
        ))}
        <line x1="90" y1={TV_BAKKE} x2="870" y2={TV_BAKKE} stroke={F.linje} strokeWidth={2.5} />
        {[1, 2, 3].map((i) => {
          const gap = (110 + lerp(110, 72, d)) / 2;
          const y = TV_BAKKE - (i - 0.5) * gap;
          return <UtAvArket key={i} x={480} y={r1(y)} r={8 + d * i * 7} sek={sek} farge="#9be7ff" ringer={d > 0.05} />;
        })}
        <g fontSize={14} fontWeight={700} fill={F.dempet}>
          <text x={90} y={500}>sør</text>
          <text x={870} y={500} textAnchor="end">nord</text>
        </g>
      </>
    );
  },
};
export const TermiskVindFigur = lagFigur(termisk);

/* =====================================================================
 * Ny widget: hvorfor fra vest mot øst?
 * ===================================================================== */

const VO_C: P = [300, 285];
const VO_R = 205;
const voBredde = (lat: number) => ({ y: VO_C[1] - VO_R * Math.sin(lat * R), rx: VO_R * Math.cos(lat * R) });
const VO_PAKKE = `M${VO_C[0] - 40} ${VO_C[1] + 6} C ${VO_C[0] - 10} ${VO_C[1] - 70} ${VO_C[0] + 50} ${VO_C[1] - 140} ${VO_C[0] + 120} ${VO_C[1] - 172}`;

const vestOst: Def<{ fart: number; pakke: number; fly: number }> = {
  id: "vest-ost",
  tekst: VEST_OST_TEKST,
  faser: ["Jorda roterer", "Bakkefarten", "Luft mot polen", "Flyet"],
  status: [
    "1. Jorda bruker ett døgn på en omdreining. Bakken beveger seg mot øst.",
    "2. Ved ekvator er omkretsen størst, så bakken beveger seg østover med over 1600 kilometer i timen. Ved polene er farten null.",
    "3. Luft som beveger seg bort fra ekvator, beholder den østlige farten. Bakken under roterer saktere, så lufta går fra vest mot øst i forhold til bakken.",
    "4. Fly mot øst får medvind fra jetstrømmen, mens fly mot vest har den imot.",
  ],
  bilder: [
    { fart: 0, pakke: 0, fly: 0 },
    { fart: 0, pakke: 0, fly: 0 },
    { fart: 1, pakke: 0, fly: 0 },
    { fart: 1, pakke: 1, fly: 0 },
    { fart: 1, pakke: 1, fly: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [{ text: "Jorda roterer mot øst", x: 60, y: 52, color: F.tekst, weight: 800 }];
    if (f >= 2) {
      l.push({ text: "ekvator: over 1600 km/t", x: 560, y: VO_C[1] + 46, color: "#5eead4", at: [VO_C[0] + 170, VO_C[1] + 30] });
      l.push({ text: "polen: null", x: VO_C[0] + 40, y: 62, color: "#5eead4", at: [VO_C[0] + 4, VO_C[1] - VO_R + 4] });
    }
    if (f >= 3) {
      l.push({ text: "lufta beholder den østlige farten", x: 560, y: 120, color: F.varm, at: [VO_C[0] + 110, VO_C[1] - 166] });
      l.push({ text: "bakken her roterer saktere", x: 560, y: 205, color: F.dempet, at: [VO_C[0] + 150, VO_C[1] - 120] });
    }
    if (f === 4) {
      l.push({ text: "New York → Oslo: medvind", x: 650, y: 372, color: F.gronn, weight: 700 });
      l.push({ text: "Oslo → New York: motvind", x: 650, y: 452, color: F.rod, weight: 700 });
    }
    return l;
  }),
  notes: ["Jorda sett fra siden, nord opp", "Skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek, m }) => {
    const rot = r1(-(sek * 30) % 24);
    const pu = s.pakke > 0.5 ? (sek * 0.18) % 1 : 1;
    return (
      <>
        <rect x="20" y="20" width="920" height="500" rx="10" fill={F.bg} data-nocheck="" />
        <circle cx={VO_C[0]} cy={VO_C[1]} r={VO_R} fill="#16324a" stroke={F.linje} strokeWidth={2} data-nocheck="" />
        <line x1={VO_C[0]} y1={VO_C[1] - VO_R - 26} x2={VO_C[0]} y2={VO_C[1] + VO_R + 26} stroke={F.dempet} strokeWidth={1.5} strokeDasharray="4 4" data-nocheck="" />
        {[0, 30, 60].map((lat) => {
          const b = voBredde(lat);
          const ry = b.rx * 0.16;
          const fram = `M${r1(VO_C[0] - b.rx)} ${r1(b.y)} A ${r1(b.rx)} ${r1(ry)} 0 0 0 ${r1(VO_C[0] + b.rx)} ${r1(b.y)}`;
          const bak = `M${r1(VO_C[0] + b.rx)} ${r1(b.y)} A ${r1(b.rx)} ${r1(ry)} 0 0 0 ${r1(VO_C[0] - b.rx)} ${r1(b.y)}`;
          const len = 150 * Math.cos(lat * R);
          return (
            <g key={lat}>
              <path d={bak} fill="none" stroke={F.dempet} strokeOpacity={0.35} strokeWidth={1.2} data-nocheck="" />
              <path d={fram} fill="none" stroke="#5eead4" strokeOpacity={0.8} strokeWidth={2} strokeDasharray="8 16" strokeDashoffset={rot} data-nocheck="" />
              {s.fart > 0.02 ? (
                <g opacity={s.fart < 0.99 ? r1(s.fart * 100) / 100 : undefined}>
                  <Pil fra={[VO_C[0], b.y + ry]} til={[VO_C[0] + len, b.y + ry]} farge="#5eead4" w={4} />
                </g>
              ) : null}
            </g>
          );
        })}
        <circle cx={VO_C[0]} cy={VO_C[1] - VO_R} r={5} fill={F.tekst} />
        {s.pakke > 0.02 ? (
          <g opacity={s.pakke < 0.99 ? r1(s.pakke * 100) / 100 : undefined}>
            <path d={VO_PAKKE} fill="none" stroke={F.varm} strokeWidth={4} strokeDasharray="9 6" markerEnd={`url(#${m.warm})`} />
            <PakkePunkt u={pu} />
          </g>
        ) : null}
        {s.fly > 0.02 ? (
          <g opacity={s.fly < 0.99 ? r1(s.fly * 100) / 100 : undefined}>
            <rect x="620" y="300" width="300" height="190" rx="10" fill={F.panel} stroke={F.linje} data-nocheck="" />
            <path d="M650 410 L890 410" stroke={F.jetBelte} strokeOpacity={0.3} strokeWidth={26} data-nocheck="" />
            <text x={650} y={334} fontSize={14} fontWeight={700} fill={F.tekst}>
              Jetstrømmen går mot øst
            </text>
            <Pil fra={[660, 390]} til={[880, 390]} farge={F.gronn} w={4} />
            <Pil fra={[880, 470]} til={[660, 470]} farge={F.rod} w={4} />
          </g>
        ) : null}
      </>
    );
  },
};

/** Luftpakken langs banen (kubisk Bézier i VO_PAKKE). */
function PakkePunkt({ u }: { u: number }) {
  const p0: P = [VO_C[0] - 40, VO_C[1] + 6];
  const p1: P = [VO_C[0] - 10, VO_C[1] - 70];
  const p2: P = [VO_C[0] + 50, VO_C[1] - 140];
  const p3: P = [VO_C[0] + 120, VO_C[1] - 172];
  const t = clamp(u);
  const a = (1 - t) ** 3;
  const b = 3 * (1 - t) ** 2 * t;
  const c = 3 * (1 - t) * t * t;
  const e = t ** 3;
  return <circle cx={r1(a * p0[0] + b * p1[0] + c * p2[0] + e * p3[0])} cy={r1(a * p0[1] + b * p1[1] + c * p2[1] + e * p3[1])} r={8} fill={F.varm} stroke="#0b1620" strokeWidth={2} />;
}
export const VestOstFigur = lagFigur(vestOst);

/* =====================================================================
 * P1 JetStreak: firekvadrantmodellen (beholdt, rettet)
 * ===================================================================== */

const JS_Y = 160;
const JS_X0 = 70;
const JS_X1 = 890;
const JS_INN = 300;
const JS_UT = 660;
/** Fart langs jetstrømmen: sakte ved endene, raskest i midten (x(u) med x'(u) = 1 − 0,75 cos 2πu). */
const jsX = (u: number) => JS_X0 + (JS_X1 - JS_X0) * (u - (0.75 / (2 * Math.PI)) * Math.sin(2 * Math.PI * u));

const streak: Def<{ ageo: number; kvad: number; under: number }> = {
  id: "jetstreak",
  tekst: JETSTREAK_TEKST,
  faser: ["Inn og ut", "På tvers", "Divergens og konvergens", "Ved bakken"],
  status: [
    "1. Inne i jetstrømmen kan et område ha ekstra sterk vind. Lufta øker farten inn mot området og senker farten ut av det.",
    "2. Mens farten endres, går en ageostrofisk vind på tvers av jetstrømmen: mot venstre i inngangen og mot høyre i utgangen.",
    "3. Lufta sprer seg i høyre inngang og venstre utgang (divergens). Den hoper seg opp i venstre inngang og høyre utgang (konvergens).",
    "4. Under divergensen stiger lufta skrått, og trykket ved bakken faller. Under konvergensen synker lufta.",
  ],
  bilder: [
    { ageo: 0, kvad: 0, under: 0 },
    { ageo: 0, kvad: 0, under: 0 },
    { ageo: 1, kvad: 0, under: 0 },
    { ageo: 1, kvad: 1, under: 0 },
    { ageo: 1, kvad: 1, under: 1 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [
      { text: "Inngang: lufta øker farten", x: JS_INN, y: 52, anchor: "middle", color: F.dempet, weight: 700 },
      { text: "Utgang: lufta senker farten", x: JS_UT, y: 52, anchor: "middle", color: F.dempet, weight: 700 },
      { text: "ekstra sterk vind", x: 480, y: 108, anchor: "middle", color: "#fde68a", weight: 700, at: [480, JS_Y - 18], badge: [420, 100] },
    ];
    if (f >= 2) l.push({ text: "ageostrofisk vind", x: JS_INN - 30, y: 226, anchor: "end", color: "#fbbf24", at: [JS_INN - 8, 200], badge: [JS_INN - 70, 246] });
    if (f >= 3) {
      l.push({ text: "venstre inngang: konvergens", x: 150, y: 96, anchor: "middle", color: F.kald, size: 13 });
      l.push({ text: "høyre inngang: divergens", x: 150, y: 236, anchor: "middle", color: F.varm, size: 13 });
      l.push({ text: "venstre utgang: divergens", x: 810, y: 96, anchor: "middle", color: F.varm, size: 13 });
      l.push({ text: "høyre utgang: konvergens", x: 810, y: 236, anchor: "middle", color: F.kald, size: 13 });
    }
    if (f === 4) {
      l.push({ text: "lufta stiger, trykket faller", x: 770, y: 470, anchor: "middle", color: F.lav, at: [JS_UT + 20, 440], badge: [JS_UT + 90, 440] });
      l.push({ text: "lufta synker", x: 190, y: 470, anchor: "middle", color: F.hoy, at: [JS_INN - 10, 440], badge: [JS_INN - 90, 440] });
    }
    return l;
  }),
  keys: [
    { text: "Divergens i høyden", color: F.varm, kind: "fill" },
    { text: "Konvergens i høyden", color: F.kald, kind: "fill" },
  ],
  notes: ["Sett ovenfra, nord opp. Venstre og høyre sett nedstrøms (mot øst)", "Nederst: snitt langs venstre side, vest til øst", "Rett jetstreak, nordlige halvkule, skjematisk"],
  viewBox: "0 0 960 540",
  tegn: (s, { sek, m }) => {
    const kv = (x: number, y: number, farge: string) => (
      <ellipse cx={x} cy={y} rx={110} ry={34} fill={farge} opacity={r1(0.35 * s.kvad * 100) / 100} data-nocheck="" />
    );
    return (
      <>
        <rect x="20" y="20" width="920" height="270" rx="10" fill={F.bg} data-nocheck="" />
        <path d={`M${JS_X0} ${JS_Y} L${JS_X1} ${JS_Y}`} stroke={F.jetBelte} strokeOpacity={0.18} strokeWidth={80} data-nocheck="" />
        {[1, 0.66, 0.36].map((k, i) => (
          <ellipse key={i} cx={480} cy={JS_Y} rx={260 * k} ry={46 * k} fill={i === 2 ? "#fde68a" : F.jetBelte} opacity={0.18 + i * 0.12} data-nocheck="" />
        ))}
        <line x1={480} y1={70} x2={480} y2={260} stroke={F.linje} strokeDasharray="4 4" data-nocheck="" />
        {s.kvad > 0.02 ? (
          <>
            {kv(JS_INN, JS_Y - 62, F.kald)}
            {kv(JS_INN, JS_Y + 62, F.varm)}
            {kv(JS_UT, JS_Y - 62, F.varm)}
            {kv(JS_UT, JS_Y + 62, F.kald)}
          </>
        ) : null}
        <path d={`M${JS_X0} ${JS_Y} L${JS_X1} ${JS_Y}`} stroke={F.jet} strokeWidth={2.5} markerEnd={`url(#${m.fg})`} />
        {Array.from({ length: 12 }, (_, i) => {
          const u = (sek * 0.08 + i / 12) % 1;
          return <circle key={i} cx={r1(jsX(u))} cy={JS_Y} r={4.5} fill={F.jet} data-nocheck="" />;
        })}
        {s.ageo > 0.02 ? (
          <g opacity={s.ageo < 0.99 ? r1(s.ageo * 100) / 100 : undefined}>
            <Pil fra={[JS_INN, JS_Y + 44]} til={[JS_INN, JS_Y - 46]} farge="#fbbf24" w={4} />
            <Pil fra={[JS_UT, JS_Y - 44]} til={[JS_UT, JS_Y + 46]} farge="#fbbf24" w={4} />
          </g>
        ) : null}
        {/* snitt langs venstre side */}
        <rect x="20" y="300" width="920" height="220" rx="10" fill={F.bg} data-nocheck="" />
        <line x1="60" y1="500" x2="900" y2="500" stroke={F.linje} strokeWidth={2.5} />
        <text x={60} y={326} fontSize={13} fill={F.dempet}>
          høyden: jetstrømmen
        </text>
        <text x={900} y={326} fontSize={13} fill={F.dempet} textAnchor="end">
          mot øst →
        </text>
        {s.under > 0.02 ? (
          <g opacity={s.under < 0.99 ? r1(s.under * 100) / 100 : undefined}>
            <Pil fra={[JS_UT - 40, 480]} til={[JS_UT + 10, 352]} farge={F.lav} w={3.5} />
            <Pil fra={[JS_UT + 10, 480]} til={[JS_UT + 60, 352]} farge={F.lav} w={3.5} />
            <Pil fra={[JS_INN - 10, 352]} til={[JS_INN - 10, 470]} farge={F.hoy} w={3.5} />
            <Pil fra={[JS_INN + 30, 352]} til={[JS_INN + 30, 470]} farge={F.hoy} w={3.5} />
            <Trykk x={JS_UT - 90} y={470} kind="L" size={22} />
            <Trykk x={JS_INN - 60} y={470} kind="H" size={22} />
          </g>
        ) : null}
      </>
    );
  },
};
export const JetStreakFigur = lagFigur(streak);

/* =====================================================================
 * P3 JetForms: jetstrømmen slynger seg (globus)
 * ===================================================================== */

const slynger: Def<{ a: number; stig: number; del: number; gap: number }> = {
  id: "jet-slynger",
  tekst: JET_SLYNGER_TEKST,
  faser: ["Nesten rett", "Slynger seg", "Stiger og synker", "Deler seg", "Flytter seg"],
  status: [
    "1. Jetstrømmen går rundt jorda fra vest mot øst. Her er den nesten rett.",
    "2. Jetstrømmen ligger ikke stille. Den slynger seg rundt jorda, med kald luft mot nord og varm luft mot sør.",
    "3. Den stiger og synker i høyde og bredde. Formen kommer av høytrykk og lavtrykk, varm og kald luft og årstiden.",
    "4. Den kan dele seg og danne virvler.",
    "5. Den kan forsvinne ett sted og dukke opp et annet.",
  ],
  bilder: [
    { a: 0, stig: 0, del: 0, gap: 0 },
    { a: 0.1, stig: 0, del: 0, gap: 0 },
    { a: 1, stig: 0, del: 0, gap: 0 },
    { a: 1, stig: 1, del: 0, gap: 0 },
    { a: 1.2, stig: 0.4, del: 1, gap: 0 },
    { a: 1, stig: 0.4, del: 0.3, gap: 1 },
  ],
  etiketter: [1, 2, 3, 4, 5].map((f) => {
    const l: Lab[] = [
      { text: "kald luft", x: 60, y: 70, color: F.kald, weight: 800, at: kp(-40, 72) },
      { text: "varm luft", x: 60, y: 480, color: F.varm, weight: 800, at: kp(-45, 30) },
      { text: "jetstrømmen", x: 900, y: 70, anchor: "end", color: F.jet, weight: 700, at: kp(5, 58) },
    ];
    if (f === 3) l.push({ text: "stiger og synker", x: 900, y: 480, anchor: "end", color: "#9be7ff", at: kp(-5, 46) });
    if (f >= 4) l.push({ text: "virvel", x: 900, y: 480, anchor: "end", color: F.kald, weight: 700, at: kp(-14, 40) });
    if (f === 4) l.push({ text: "deler seg", x: 60, y: 420, color: "#9be7ff", at: kp(-58, 44) });
    if (f === 5) {
      l.push({ text: "forsvinner her", x: 900, y: 140, anchor: "end", color: F.dempet, at: kp(20, 60) });
      l.push({ text: "dukker opp her", x: 60, y: 140, color: "#9be7ff", at: kp(-95, 66) });
    }
    return l;
  }),
  notes: ["Nordlige halvkule sett fra verdensrommet", "Skjematisk. Kartdata: Natural Earth"],
  viewBox: "0 0 960 540",
  narrowViewBox: "110 0 740 540",
  merker: { kolonne: [150, 810], midt: GCX },
  tegn: (s, { sek }) => {
    // mønsteret går sakte mot øst, lufta strømmer mye raskere langs stien (fagsjekk F4)
    const drift = sek * 1.2;
    const bredde = (lon: number) => 52 + 11 * s.a * Math.sin(5 * (lon - drift) * R);
    const segs: { d: string; w: number; o: number }[] = [];
    for (let lon = -180; lon < 180; lon += 12) {
      const pts = rundt(bredde, lon, lon + 12, 3);
      const mid = lon + 6;
      const w = 6 * (1 + 0.55 * s.stig * Math.sin(3 * (mid + 20) * R));
      const iGap = mid > 0 && mid < 40 ? 1 - 0.9 * s.gap : 1;
      segs.push({ d: klodeSti(pts), w: r1(w), o: iGap });
    }
    const delSti = s.del > 0.02 ? klodeSti(rundt((lon) => bredde(lon) - 10 * s.del * Math.sin(((lon + 70) / 50) * Math.PI), -70, -20, 2.5)) : "";
    const ny = s.gap > 0.02 ? klodeSti(rundt((lon) => 66 + 3 * Math.sin((lon + 95) * 6 * R), -125, -70, 3)) : "";
    const v = kp(-14, 40);
    return (
      <>
        <Klode id="jet-slynger" />
        {segs.map((g, i) => (
          <JetBaand key={i} d={g.d} w={g.w} sek={sek} opacity={g.o} />
        ))}
        {delSti ? <JetBaand d={delSti} w={4} sek={sek} opacity={s.del} /> : null}
        {ny ? <JetBaand d={ny} w={4.5} sek={sek} opacity={s.gap} /> : null}
        {s.del > 0.02 ? (
          <g opacity={r1(Math.min(s.del * 1.5, 1) * 100) / 100}>
            <circle cx={v[0]} cy={v[1]} r={24} fill="none" stroke={F.jet} strokeWidth={3} strokeDasharray="9 6" strokeDashoffset={r1((sek * 20) % 15)} />
          </g>
        ) : null}
      </>
    );
  },
};
export const JetSlyngerFigur = lagFigur(slynger);

/* =====================================================================
 * P5 JetSeason: jetstrømmen følger sola (globus)
 * ===================================================================== */

const GRENSE = klodeSti(rundt(() => 49, -123, -95, 2));
const sesong: Def<{ lat: number; w: number }> = {
  id: "jet-sesong",
  tekst: JET_SESONG_TEKST,
  faser: ["Vinter", "Vår", "Sommer", "Høst"],
  status: [
    "1. Om vinteren er skillet mellom varm og kald luft tydeligst, og polarjeten er sterkest.",
    "2. Om våren, når sola står høyere, flytter gjennomsnittsbanen seg mot polen.",
    "3. Om sommeren på den nordlige halvkule ligger polarjeten typisk nær grensen mellom USA og Canada. Den er svakere.",
    "4. Utover høsten flytter polarjeten seg mot ekvator igjen.",
  ],
  bilder: [
    { lat: 44, w: 9 },
    { lat: 41, w: 13 },
    { lat: 46, w: 9 },
    { lat: 51, w: 6 },
    { lat: 45, w: 9 },
  ],
  etiketter: [1, 2, 3, 4].map((f) => {
    const l: Lab[] = [{ text: "grensen USA–Canada", x: 60, y: 70, color: "#fde68a", at: kp(-110, 49.5) }];
    if (f === 1) l.push({ text: "sterkest om vinteren", x: 900, y: 70, anchor: "end", color: F.jet, weight: 700, at: kp(0, 44) });
    if (f === 2) l.push({ text: "mot polen", x: 900, y: 70, anchor: "end", color: "#9be7ff", weight: 700, at: kp(-20, 50) });
    if (f === 3) l.push({ text: "svakere om sommeren", x: 900, y: 70, anchor: "end", color: F.jet, weight: 700, at: kp(0, 52) });
    if (f === 4) l.push({ text: "mot ekvator", x: 900, y: 480, anchor: "end", color: "#9be7ff", weight: 700, at: kp(-20, 42) });
    return l;
  }),
  notes: ["Nordlige halvkule sett fra verdensrommet", "Tykkelsen viser styrken", "Skjematisk. Kartdata: Natural Earth"],
  viewBox: "0 0 960 540",
  narrowViewBox: "110 0 740 540",
  merker: { kolonne: [150, 810], midt: GCX },
  tegn: (s, { sek, fase }) => {
    const d = klodeSti(rundt((lon) => s.lat + 3 * Math.sin(3 * (lon + 60) * R)));
    const pil = fase === 2 ? [kp(-25, 44), kp(-25, 52)] : fase === 4 ? [kp(-25, 50), kp(-25, 42)] : null;
    return (
      <>
        <Klode id="jet-sesong" />
        <path d={GRENSE} fill="none" stroke="#fde68a" strokeWidth={2.5} strokeDasharray="6 4" />
        <JetBaand d={d} w={s.w} sek={sek} />
        {pil ? <Pil fra={pil[0]} til={pil[1]} farge="#9be7ff" w={4} /> : null}
      </>
    );
  },
};
export const JetSesongFigur = lagFigur(sesong);

/* =====================================================================
 * P6 Nao: positiv og negativ fase (globus)
 * ===================================================================== */

// Islandslavtrykket: midlere sentrum ligger over havet sørvest for Island, så L-en står fri av kystlinja
const ISLAND = kp(-30, 61);
const ASORENE = kp(-28, 38);
const NAO_POS: P[] = [[-75, 41], [-55, 46], [-35, 52], [-15, 57], [5, 61], [20, 63]];
const NAO_NEG: P[] = [[-75, 40], [-55, 41], [-35, 42], [-15, 42.5], [5, 43], [20, 43.5]];
const N_EU = kp(15, 61);
const S_EU = kp(5, 41);

const nao: Def<{ pos: number }> = {
  id: "jet-nao",
  tekst: JET_NAO_TEKST,
  faser: ["Positiv NAO", "Negativ NAO"],
  status: [
    "Positiv fase: sterkere lavtrykk ved Island og høytrykk ved Asorene. Jetstrømmen er sterkere, og stormbanen ligger lenger nord.",
    "Negativ fase: svakere forskjell mellom de to. Jetstrømmen og stormbanen ligger mer rett vest–øst.",
  ],
  bilder: [{ pos: 0 }, { pos: 1 }, { pos: 0 }],
  etiketter: [1, 0].map((pos) => [
    { text: pos ? "sterkere lavtrykk ved Island" : "svakere lavtrykk ved Island", x: 60, y: 70, color: F.lav, weight: 700, at: [ISLAND[0] - 22, ISLAND[1] - 14] },
    { text: pos ? "sterkere høytrykk ved Asorene" : "svakere høytrykk ved Asorene", x: 60, y: 480, color: F.hoy, weight: 700, at: [ASORENE[0] - 22, ASORENE[1] + 16] },
    { text: pos ? "Nord-Europa: mer storm og nedbør, mildere" : "Nord-Europa: mindre storm og nedbør, kaldere", x: 900, y: 70, anchor: "end", color: pos ? F.varm : F.kald, at: [N_EU[0], N_EU[1] - 8] },
    { text: pos ? "Sør-Europa: mindre storm og nedbør" : "Sør-Europa: mer storm og nedbør, varmere", x: 900, y: 480, anchor: "end", color: pos ? F.dempet : F.varm, at: [S_EU[0], S_EU[1] + 8] },
    { text: "jetstrømmen og stormbanen", x: 60, y: 270, color: F.jet, weight: 700, at: kp(-60, pos ? 44 : 40.6) },
  ] as Lab[]),
  notes: ["Sammenlignet med gjennomsnittet", "Skjematisk. Kartdata: Natural Earth"],
  viewBox: "0 0 960 540",
  narrowViewBox: "110 0 740 540",
  merker: { kolonne: [150, 810], midt: GCX },
  tegn: (s, { sek }) => {
    const pts = NAO_POS.map((p, i): P => [p[0], lerp(NAO_NEG[i][1], p[1], s.pos)]);
    const d = klodeSti(rundt((lon) => {
      const i = clamp((lon + 75) / 19, 0, 4.999);
      const k = Math.floor(i);
      return lerp(pts[k][1], pts[k + 1][1], i - k);
    }, -75, 20, 2.5));
    const ringer = (c: P, farge: string, rx: number, ry: number) =>
      [0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx={c[0]}
          cy={c[1]}
          rx={rx * (i + 1.5)}
          ry={ry * (i + 1.5)}
          fill="none"
          stroke={farge}
          strokeWidth={1.6}
          opacity={r1((i === 0 ? 0.6 : i === 1 ? 0.15 + 0.4 * s.pos : 0.45 * s.pos) * 100) / 100}
          data-nocheck=""
        />
      ));
    const nordFarge = s.pos > 0.5 ? "#e8823f" : "#4fa3d8";
    const nordOp = Math.abs(s.pos - 0.5) * 2 * 0.45;
    return (
      <>
        <Klode id="jet-nao" />
        <ellipse cx={N_EU[0]} cy={N_EU[1]} rx={64} ry={38} fill={nordFarge} opacity={r1(nordOp * 100) / 100} data-nocheck="" />
        <ellipse cx={S_EU[0]} cy={S_EU[1]} rx={64} ry={30} fill="#e8823f" opacity={r1((1 - s.pos) * 0.4 * 100) / 100} data-nocheck="" />
        {ringer(ISLAND, F.lav, 18, 12)}
        {ringer(ASORENE, F.hoy, 24, 14)}
        <JetBaand d={d} w={r1(4 + 4 * s.pos)} sek={sek} />
        <Trykk x={ISLAND[0]} y={ISLAND[1]} kind="L" size={22 + 8 * s.pos} />
        <Trykk x={ASORENE[0]} y={ASORENE[1]} kind="H" size={22 + 8 * s.pos} />
      </>
    );
  },
};
export const JetNaoFigur = lagFigur(nao);

/* =====================================================================
 * P7 JetBlocking: ekte omega (kart over Nord-Atlanteren)
 * ===================================================================== */

const nap = (lon: number, lat: number): P => {
  const [x, y] = naXY(lon, lat);
  return [r1(x), r1(y)];
};
/** Omega rundt et høytrykk: sør vest for H, nord over H, sør øst for H, med ett lavtrykk på hver side. */
const OMEGA: P[] = [
  [-80, 54], [-62, 53], [-50, 47], [-44, 41], [-36, 42], [-30, 52], [-24, 62], [-16, 65], [-8, 62],
  [-2, 52], [4, 42], [12, 41], [18, 46], [28, 52], [40, 54],
];
const OM_H = nap(-16, 57);
const OM_L1 = nap(-41, 47);
const OM_L2 = nap(9, 46);

function naSti(pts: P[]) {
  const p = pts.map(([lo, la]) => nap(lo, la));
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const mx = r1((p[i][0] + p[i + 1][0]) / 2);
    const my = r1((p[i][1] + p[i + 1][1]) / 2);
    d += ` Q${p[i][0]} ${p[i][1]} ${mx} ${my}`;
  }
  const last = p[p.length - 1];
  return `${d} L${last[0]} ${last[1]}`;
}

const NaKart = memo(function NaKart() {
  return (
    <g aria-hidden="true" data-nocheck="">
      <rect x={0} y={0} width={960} height={619} fill={F.hav} />
      <path d={NA_LAND} fill={F.land} stroke={F.landKant} strokeWidth={0.7} strokeLinejoin="round" />
    </g>
  );
});

const omega: Def<{ a: number }> = {
  id: "jet-omega",
  tekst: JET_OMEGA_TEKST,
  faser: ["Fra vest mot øst", "Slynger seg", "Omega"],
  status: [
    "1. Jetstrømmen går fra vest mot øst.",
    "2. Jetstrømmen slynger seg mer, rundt høytrykk og lavtrykk.",
    "3. Den går sør for høytrykket i vest, nord over det og sør igjen i øst, som bokstaven omega (Ω), med et lavtrykk på hver side.",
  ],
  bilder: [{ a: 0 }, { a: 0 }, { a: 0.5 }, { a: 1 }],
  etiketter: [0, 0.5, 1].map((a) => {
    const l: Lab[] = [{ text: "jetstrømmen", x: 60, y: 120, color: F.jet, weight: 700, at: nap(-70, 53.6) }];
    if (a > 0) {
      l.push({ text: "høytrykk", x: OM_H[0], y: OM_H[1] + 112, anchor: "middle", color: F.hoy, weight: 700, at: [OM_H[0], OM_H[1] + 22], badge: [OM_H[0], OM_H[1] + 82] });
      l.push({ text: "lavtrykk", x: 300, y: 470, anchor: "middle", color: F.lav, weight: 700, at: [OM_L1[0], OM_L1[1] + 24] });
      l.push({ text: "lavtrykk", x: 860, y: 420, anchor: "middle", color: F.lav, weight: 700, at: [OM_L2[0], OM_L2[1] + 24], badge: [OM_L2[0] - 80, OM_L2[1] + 48] });
    }
    if (a === 1) l.push({ text: "Ω", x: 760, y: 120, anchor: "middle", color: "#fde68a", weight: 800, size: 30, at: [OM_H[0] + 40, OM_H[1] - 40] });
    return l;
  }),
  notes: ["Sett ovenfra, nord opp", "Skjematisk. Kartdata: Natural Earth"],
  viewBox: "0 40 960 540",
  narrowViewBox: "180 40 640 540",
  merker: { fra: OM_H, d: 60 },
  tegn: (s, { sek }) => {
    const pts = OMEGA.map(([lo, la]): P => [lo, lerp(54, la, s.a)]);
    return (
      <>
        <NaKart />
        {/* H og L vises først når omegaen er formet, så jetlinja ikke går gjennom bokstavene underveis */}
        {s.a > 0.75 ? (
          <>
            <Trykk x={OM_H[0]} y={OM_H[1]} kind="H" size={30} opacity={r1(clamp((s.a - 0.75) / 0.25) * 100) / 100} />
            <Trykk x={OM_L1[0]} y={OM_L1[1]} kind="L" size={24} opacity={r1(clamp((s.a - 0.75) / 0.25) * 100) / 100} />
            <Trykk x={OM_L2[0]} y={OM_L2[1]} kind="L" size={24} opacity={r1(clamp((s.a - 0.75) / 0.25) * 100) / 100} />
          </>
        ) : null}
        <JetBaand d={naSti(pts)} w={6} sek={sek} />
      </>
    );
  },
};
export const JetOmegaFigur = lagFigur(omega);

/* =====================================================================
 * N1 Stormbanen langs polarfronten (globus)
 * ===================================================================== */

const pfBredde = (lon: number) => 46 + 5 * Math.sin((lon + 40) * 2 * R);
const PF_STI = klodeSti(rundt(pfBredde, -85, 25, 2.5));
const PF_JET = klodeSti(rundt((lon) => pfBredde(lon) + 4, -85, 25, 2.5));

const stormbane: Def<{ front: number; lav: number; vandre: number }> = {
  id: "stormbane",
  tekst: STORMBANE_TEKST,
  faser: ["Polarfronten", "Lavtrykk dannes", "Vandrer mot øst"],
  status: [
    "1. Polarfronten skiller kald luft fra høye breddegrader og varm luft fra subtropene. Jetstrømmen går i høyden like over.",
    "2. Langs polarfronten dannes lavtrykk.",
    "3. Lavtrykkene vandrer oftest mot øst, omtrent med vinden i høyden. De gir mye av nedbøren i den tempererte sonen.",
  ],
  bilder: [
    { front: 0.4, lav: 0, vandre: 0 },
    { front: 1, lav: 0, vandre: 0 },
    { front: 1, lav: 1, vandre: 0 },
    { front: 1, lav: 1, vandre: 1 },
  ],
  etiketter: [1, 2, 3].map((f) => {
    const l: Lab[] = [
      { text: "kald luft", x: 60, y: 70, color: F.kald, weight: 800, at: kp(-45, 66) },
      { text: "varm luft", x: 60, y: 480, color: F.varm, weight: 800, at: kp(-50, 34) },
      { text: "polarfronten", x: 900, y: 480, anchor: "end", color: F.front, weight: 700, at: kp(5, pfBredde(5) - 1) },
      { text: "jetstrømmen i høyden", x: 900, y: 70, anchor: "end", color: F.jet, weight: 700, at: kp(10, pfBredde(10) + 5) },
    ];
    if (f >= 2) l.push({ text: "lavtrykk", x: 60, y: 300, color: F.lav, weight: 700, at: kp(-62, pfBredde(-62) - 2) });
    if (f === 3) l.push({ text: "mot øst", x: 900, y: 300, anchor: "end", color: "#5eead4", weight: 700, at: kp(-8, 40) });
    return l;
  }),
  notes: ["Nord-Atlanteren sett fra verdensrommet", "Skjematisk. Kartdata: Natural Earth"],
  viewBox: "0 0 960 540",
  narrowViewBox: "110 0 740 540",
  merker: { kolonne: [150, 810], midt: GCX },
  tegn: (s, { sek }) => {
    const lav = [0, 1, 2].map((k) => {
      const start = -60 + k * 30;
      // lavtrykkene vandrer øst for punktet etiketten peker på, så pekelinja ikke krysser dem
      const lon = s.vandre > 0.5 ? -52 + ((sek * 5 + k * 26) % 77) : start;
      const synlig = k === 0 ? s.lav : s.lav * s.vandre;
      // L-en litt sør for frontlinja, så verken fronten eller jetbåndet (nord for fronten) går gjennom bokstaven
      const c = kp(lon, pfBredde(lon) - 3.5);
      return { c, o: synlig };
    });
    return (
      <>
        <Klode id="stormbane" />
        <JetBaand d={PF_JET} w={4} sek={sek} opacity={0.55 + 0.45 * s.front} />
        <path d={PF_STI} fill="none" stroke={F.front} strokeWidth={4} strokeDasharray="12 6" opacity={r1(s.front * 100) / 100} />
        {lav.map((l, i) =>
          l.o > 0.02 ? (
            <g key={i}>
              {[1.4, 2.2].map((k) => (
                <ellipse key={k} cx={l.c[0]} cy={l.c[1]} rx={16 * k} ry={11 * k} fill="none" stroke={F.lav} strokeOpacity={0.45} strokeWidth={1.5} opacity={r1(l.o * 100) / 100} data-nocheck="" />
              ))}
              <Trykk x={l.c[0]} y={l.c[1]} kind="L" size={20} opacity={l.o} />
            </g>
          ) : null,
        )}
        {s.vandre > 0.02 ? <Pil fra={kp(-30, 38)} til={kp(0, 41)} farge="#5eead4" w={4} /> : null}
      </>
    );
  },
};
export const StormbaneFigur = lagFigur(stormbane);
