/**
 * Geofag 1, Bergarter: rekrystallisasjon i fast fase («Hvordan skjer metamorfose?»).
 *
 * Plasseres som src/components/diagrams/rekrystallisasjon-figur.tsx og registreres i
 * POSTER_WIDGETS (src/components/poster-body.tsx) som `Rekrystallisasjon`.
 *
 * Samme ramme som figurene i bergarter-figurer.tsx (IsbreFigur, StegVelger og isbre-kit):
 * nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten: metamorfose skjer i fast fase, ved høyere temperatur går
 * diffusjon og reaksjoner raskere, bindinger brytes, og det dannes nye mineraler som er stabile ved
 * de nye forholdene (Winter, 2014, s. 467, 469, 500). Figuren har ingen tall. Alt er skjematisk.
 * All geometri (gitterplasser, bindinger, stier) er konstanter på modulnivå, så serverrenderingen
 * gjør nesten ingenting.
 */
import { useId, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key, type Lab } from "./isbre-figur";
import {
  P,
  clamp,
  figureFont,
  lerp,
  pickStep,
  smooth,
  useBoxWidth,
  useInView,
  useNarrow,
  useStepClock,
  useTicker,
} from "./isbre-kit";

export type RekrystallisasjonFigurProps = {
  heading?: string;
  caption?: ReactNode;
  initialStep?: number;
};

/* ---------- små verktøy (samme som i bergarter-figurer.tsx) ---------- */

type Pt = [number, number];
const n1 = (v: number) => Math.round(v * 10) / 10;
const fx = (v: number) => n1(v).toString();

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

/** Fast pseudotilfeldig rekke, så server og nettleser tegner det samme. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* =====================================================================
 * Gitteret: 120 ioner av tre slag. Før: to mineraler med hvert sitt gitter.
 * Etter: ett nytt mineral med et annet gitter. Samme ioner hele tiden,
 * bare nye plasser og nye bindinger.
 * Koordinatene gjelder prøveboksen (RK_W × RK_H) og flyttes med boksen.
 * ===================================================================== */

type Ion = "a" | "b" | "c";
const RK_W = 460;
const RK_H = 360;
const RK_ION: Record<Ion, { r: number; fill: string; stroke: string }> = {
  a: { r: 9, fill: "#d9b77e", stroke: "#6e5530" },
  b: { r: 5.5, fill: "#8eb4d4", stroke: "#2f4d66" },
  c: { r: 7, fill: "#c98f8f", stroke: "#5e3434" },
};
const RK_KORNGRENSE = 203;

type Site = { p: Pt; type: Ion };
type Bond = [number, number];

/** Mineral 1: kvadratisk gitter med ion a og b annenhver gang. */
const RK_OLD_A: Site[] = [];
for (let r = 0; r < 10; r++)
  for (let c = 0; c < 6; c++) RK_OLD_A.push({ p: [30 + c * 28, 50 + r * 28], type: (c + r) % 2 ? "b" : "a" });

/** Mineral 2: et annet gitter, dreid, med ion c. */
const RK_OLD_B: Site[] = [];
{
  const ang = (14 * Math.PI) / 180;
  const u: Pt = [28 * Math.cos(ang), 28 * Math.sin(ang)];
  const v: Pt = [-28 * Math.sin(ang), 28 * Math.cos(ang)];
  for (let j = 0; j < 10; j++)
    for (let i = 0; i < 6; i++)
      RK_OLD_B.push({
        p: [n1(335 + (i - 2.5) * u[0] + (j - 4.5) * v[0]), n1(180 + (i - 2.5) * u[1] + (j - 4.5) * v[1])],
        type: "c",
      });
}
const RK_OLD: Site[] = [...RK_OLD_A, ...RK_OLD_B];

function gridBonds(offset: number, cols: number, rows: number): Bond[] {
  const out: Bond[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = offset + r * cols + c;
      if (c < cols - 1) out.push([k, k + 1]);
      if (r < rows - 1) out.push([k, k + cols]);
    }
  return out;
}
/** Bindinger i det gamle gitteret, som indekser i RK_OLD (ionnummer). */
const RK_OLD_BONDS: Bond[] = [...gridBonds(0, 6, 10), ...gridBonds(60, 6, 10)];

/** Det nye mineralet: sekskantet gitter, 12 × 10 plasser. Ion c i annenhver kolonne, a og b i resten. */
const RK_NEW_COLS = 12;
const RK_NEW_ROWS = 10;
const RK_NEW: Site[] = [];
for (let r = 0; r < RK_NEW_ROWS; r++)
  for (let c = 0; c < RK_NEW_COLS; c++)
    RK_NEW.push({
      p: [36 + c * 34 + (r % 2) * 17, 48 + r * 29],
      type: c % 2 === 0 ? "c" : r % 2 === 0 ? "a" : "b",
    });
/** Bindinger i det nye gitteret, som indekser i RK_NEW (plassnummer). */
const RK_NEW_SITE_BONDS: Bond[] = [];
{
  const at = (r: number, c: number) => (r >= 0 && r < RK_NEW_ROWS && c >= 0 && c < RK_NEW_COLS ? r * RK_NEW_COLS + c : -1);
  for (let r = 0; r < RK_NEW_ROWS; r++)
    for (let c = 0; c < RK_NEW_COLS; c++) {
      const k = at(r, c);
      const nb = [at(r, c + 1), ...(r % 2 === 0 ? [at(r + 1, c - 1), at(r + 1, c)] : [at(r + 1, c), at(r + 1, c + 1)])];
      for (const j of nb) if (j >= 0) RK_NEW_SITE_BONDS.push([k, j]);
    }
}

/**
 * Hvilket ion som havner på hvilken ny plass. Per ionslag: sorter etter x, del i bolker
 * og sorter hver bolk etter y. Da blir stiene ryddige, men ionene krysser korngrensen.
 */
const RK_TARGET: number[] = new Array(RK_OLD.length).fill(-1);
for (const type of ["a", "b", "c"] as Ion[]) {
  const ions = RK_OLD.map((s, i) => ({ i, s })).filter((o) => o.s.type === type);
  const sites = RK_NEW.map((s, i) => ({ i, s })).filter((o) => o.s.type === type);
  ions.sort((p, q) => p.s.p[0] - q.s.p[0]);
  sites.sort((p, q) => p.s.p[0] - q.s.p[0]);
  const chunk = type === "c" ? 10 : 5;
  for (let k = 0; k < ions.length; k += chunk) {
    const io = ions.slice(k, k + chunk).sort((p, q) => p.s.p[1] - q.s.p[1]);
    const si = sites.slice(k, k + chunk).sort((p, q) => p.s.p[1] - q.s.p[1]);
    io.forEach((o, n) => (RK_TARGET[o.i] = si[n].i));
  }
}
/** Bindinger i det nye gitteret, som ionnummer. */
const RK_NEW_BONDS: Bond[] = (() => {
  const ionAt = new Array(RK_NEW.length).fill(-1);
  RK_TARGET.forEach((site, ion) => (ionAt[site] = ion));
  return RK_NEW_SITE_BONDS.map(([s, t]) => [ionAt[s], ionAt[t]] as Bond);
})();

/** Hvert ion starter vandringen litt forskjøvet og tar en litt buet vei (hopp, ikke strøm). */
const RK_DELAY: number[] = (() => {
  const r = rng(71);
  return RK_OLD.map(() => n1(r() * 0.45 * 100) / 100);
})();
const RK_WIGGLE: number[] = (() => {
  const r = rng(72);
  return RK_OLD.map(() => n1((r() - 0.5) * 16));
})();

const RK_STEPS = ["Før", "P og T øker", "Ioner vandrer", "Etter"];
const RK_STATUS = [
  "Før: To mineraler ved lav temperatur og lavt trykk. Ionene sitter i hvert sitt krystallgitter og holdes på plass av bindingene.",
  "Berget havner dypere, og temperaturen og trykket øker. De gamle mineralene er ikke lenger stabile, men berget smelter ikke.",
  "Bindinger brytes. Ionene diffunderer gjennom gitteret og over korngrensen, hele tiden i fast fase.",
  "Etter: Ionene er bundet på nytt i et nytt gitter. Det nye mineralet er stabilt ved den nye temperaturen og det nye trykket.",
];
/** Nivå i søylene for temperatur og trykk, 0–1, ett tall per steg. */
const RK_T = [0.22, 0.72, 0.8, 0.8];
const RK_P = [0.22, 0.62, 0.7, 0.7];
/** Hvor mye ionene svinger rundt plassen sin mens figuren spiller. */
const RK_SVING = [0.5, 2.4, 2.4, 1.2];

function ease(k: number) {
  return smooth(clamp(k));
}

/** Ionposisjon i boks-koordinater for steg og fase. */
function ionPos(i: number, step: number, t: number): Pt {
  const from = RK_OLD[i].p;
  const to = RK_NEW[RK_TARGET[i]].p;
  if (step <= 2) return from;
  if (step === 4) return to;
  const u = ease((t - RK_DELAY[i]) / 0.55);
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const w = Math.sin(Math.PI * 2 * u) * RK_WIGGLE[i];
  return [from[0] + dx * u + (-dy / len) * w, from[1] + dy * u + (dx / len) * w];
}

function Gitter({
  pos,
  bonds,
  bondOpacity = 1,
  bondDash,
  ionOpacity = 1,
}: {
  pos: Pt[];
  bonds: Bond[];
  bondOpacity?: number;
  bondDash?: string;
  ionOpacity?: number;
}) {
  return (
    <g data-nocheck="">
      {bondOpacity > 0.01 ? (
        <g stroke="#dfe7ec" strokeWidth="2" strokeOpacity={n1(bondOpacity * 0.75 * 100) / 100} strokeDasharray={bondDash}>
          {bonds.map(([s, t], k) => (
            <line key={k} x1={fx(pos[s][0])} y1={fx(pos[s][1])} x2={fx(pos[t][0])} y2={fx(pos[t][1])} />
          ))}
        </g>
      ) : null}
      {ionOpacity > 0 ? (
      <g opacity={ionOpacity}>
        {pos.map((p, i) => {
          const ion = RK_ION[RK_OLD[i].type];
          return <circle key={i} cx={fx(p[0])} cy={fx(p[1])} r={ion.r} fill={ion.fill} stroke={ion.stroke} strokeWidth="1.5" />;
        })}
      </g>
      ) : null}
    </g>
  );
}

const RK_POS_FOR = RK_OLD.map((s) => s.p);
const RK_POS_ETTER = RK_OLD.map((_, i) => RK_NEW[RK_TARGET[i]].p);

/** Lite bilde av gitteret, før eller etter, så begge kan sammenlignes mens figuren spiller. */
function Miniatyr({ x, y, s, etter, uid }: { x: number; y: number; s: number; etter: boolean; uid: string }) {
  return (
    <g transform={`translate(${fx(x)} ${fx(y)}) scale(${s})`}>
      <rect x="0" y="0" width={RK_W} height={RK_H} rx="14" fill={etter ? "#22303a" : "#1c262e"} stroke={etter ? "#9fd3c7" : "#8b9aa6"} strokeWidth={3 / s} />
      <g clipPath={`url(#${uid}-mclip)`}>
        {!etter ? (
          <line x1={RK_KORNGRENSE} y1="14" x2={RK_KORNGRENSE} y2={RK_H - 14} stroke="#8b9aa6" strokeWidth={2 / s} strokeDasharray="8 8" />
        ) : null}
        <Gitter pos={etter ? RK_POS_ETTER : RK_POS_FOR} bonds={etter ? RK_NEW_BONDS : RK_OLD_BONDS} />
      </g>
    </g>
  );
}

export function RekrystallisasjonFigur({
  heading = "Rekrystallisasjon i fast fase",
  caption,
  initialStep,
}: RekrystallisasjonFigurProps) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const running = motion.playing && visible;
  const clock = useStepClock(4, running, 3400, 1800, initialStep);
  const { step, phase } = clock;
  const i = step - 1;
  const uid = useId().replace(/:/g, "");
  const time = useTicker(running);
  const t = motion.playing ? smooth(phase) : 1;

  // oppsett: bred skjerm har søyler til venstre og småbilder til høyre, smal har dem under
  const box: Pt = small ? [30, 60] : [160, 80];
  const vb = small ? "0 0 520 710" : "0 0 960 520";
  const prev = Math.max(0, i - 1);
  const tLevel = lerp(RK_T[prev], RK_T[i], step === 1 ? 1 : t);
  const pLevel = lerp(RK_P[prev], RK_P[i], step === 1 ? 1 : t);
  const sving = motion.playing ? lerp(RK_SVING[prev], RK_SVING[i], step === 1 ? 1 : t) : 0;

  // stillestående steg 3 (pause eller redusert bevegelse) viser ionene midt i vandringen
  const tm = step === 3 && !motion.playing ? 0.6 : t;
  const pos: Pt[] = RK_OLD.map((_, k) => {
    const p = ionPos(k, step, tm);
    if (!sving) return p;
    return [p[0] + sving * Math.sin(time * 11 + k * 1.7), p[1] + sving * Math.cos(time * 13 + k * 2.3)];
  });
  const oldOpacity = step <= 2 ? 1 : step === 3 ? (motion.playing ? 1 - t : 0.45) : 0;
  const newOpacity = step === 4 ? t : 0;

  const bx = box[0];
  const by = box[1];
  const labels: Lab[] = [];
  if (step <= 2) {
    labels.push({ text: "Mineral 1", x: bx + 100, y: by - 16, anchor: "middle", color: RK_ION.a.fill, badge: [bx + 100, by - 16] });
    labels.push({ text: "Mineral 2", x: bx + 335, y: by - 16, anchor: "middle", color: RK_ION.c.fill, badge: [bx + 335, by - 16] });
    labels.push({
      text: "Korngrense",
      x: bx + RK_KORNGRENSE,
      y: by + RK_H + 26,
      at: [bx + RK_KORNGRENSE, by + RK_H - 20],
      anchor: "middle",
      color: C.muted,
      badge: [bx + RK_KORNGRENSE + 18, by + RK_H - 10],
    });
  }
  if (step === 3) {
    labels.push({ text: "Bindinger brytes, ionene vandrer", x: bx + RK_W / 2, y: by - 16, anchor: "middle", color: "#ffc59a", badge: [bx + RK_W / 2, by - 16] });
  }
  if (step === 4) {
    labels.push({ text: "Nytt mineral med nytt gitter", x: bx + RK_W / 2, y: by - 16, anchor: "middle", color: "#9fd3c7", badge: [bx + RK_W / 2, by - 16] });
  }
  // småbildene
  const mini = small
    ? { s: 0.46, a: [30, 530] as Pt, b: [278, 530] as Pt }
    : { s: 0.55, a: [665, 76] as Pt, b: [665, 300] as Pt };
  const mw = RK_W * mini.s;
  labels.push({ text: "Før: lav P og T", x: mini.a[0] + mw / 2, y: mini.a[1] - 10, anchor: "middle", color: C.fg, size: 14, badge: [mini.a[0] + 14, mini.a[1] + 14] });
  labels.push({ text: "Etter: høyere P og T", x: mini.b[0] + mw / 2, y: mini.b[1] - 10, anchor: "middle", color: "#9fd3c7", size: 14, badge: [mini.b[0] + 14, mini.b[1] + 14] });

  const keys: Key[] = [
    { text: "Stort ion (mineral 1)", color: RK_ION.a.fill, kind: "fill" },
    { text: "Lite ion (mineral 1)", color: RK_ION.b.fill, kind: "fill" },
    { text: "Ion fra mineral 2", color: RK_ION.c.fill, kind: "fill" },
    { text: "Binding", color: "#dfe7ec", kind: "line" },
    { text: "Binding som brytes", color: "#dfe7ec", kind: "dash", off: step !== 3 },
    { text: "Temperatur (T)", color: "#e0875a", kind: "fill" },
    { text: "Trykk (P)", color: C.cold, kind: "fill" },
  ];

  // søyler for temperatur og trykk
  const gauge = small
    ? { horizontal: true, x: 70, y: 450, len: 420, thick: 16, gap: 30 }
    : { horizontal: false, x: 48, y: 90, len: 340, thick: 26, gap: 52 };

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Krystallgitter med ioner før og etter rekrystallisasjon i fast fase. To gamle mineraler har hvert sitt gitter. Temperaturen og trykket øker, bindinger brytes, ionene vandrer over korngrensen, og de bindes på nytt i et nytt gitter. To små bilder viser gitteret før og etter."
        heading={heading}
        caption={
          caption ??
          "Ved metamorfose omdannes mineralene uten at berget smelter. Når temperaturen og trykket øker, blir de gamle mineralene ustabile. Bindinger brytes, ionene diffunderer, og de bindes på nytt i et nytt mineral som er stabilt under de nye forholdene. Forenklet: ionene, gitteret og avstandene er skjematiske."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} name="rekrystallisasjon" />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={RK_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />
          </StegRamme>
        }
        status={RK_STATUS[i]}
        labels={labels}
        keys={keys}
        remark="Berget smelter ikke. Hele omdanningen skjer i fast fase."
        notes={["Skjematisk, uten målestokk", "Ionene er forstørret mange millioner ganger"]}
        viewBox={vb}
        forceNarrow={small}
      >
        {({ scale }) => (
          <g className={motion.motionClass} data-figur="rekrystallisasjon" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id={`${uid}-clip`}>
                <rect x="0" y="0" width={RK_W} height={RK_H} rx="14" />
              </clipPath>
              <clipPath id={`${uid}-mclip`}>
                <rect x="0" y="0" width={RK_W} height={RK_H} rx="14" />
              </clipPath>
            </defs>

            {/* temperatur og trykk */}
            {(["T", "P"] as const).map((navn, k) => {
              const level = k === 0 ? tLevel : pLevel;
              const color = k === 0 ? "#e0875a" : C.cold;
              if (gauge.horizontal) {
                const y = gauge.y + k * gauge.gap;
                return (
                  <g key={navn}>
                    <rect x={gauge.x} y={y} width={gauge.len} height={gauge.thick} rx="6" fill="#1c262e" stroke="#4a5a66" />
                    <rect x={gauge.x} y={y} width={fx(gauge.len * level)} height={gauge.thick} rx="6" fill={color} />
                    <text x={gauge.x - 14} y={y + gauge.thick - 2} textAnchor="end" fontSize={figureFont(15, scale)} fontWeight="700" fill={color} stroke={P.halo} strokeWidth="4" paintOrder="stroke">
                      {navn}
                    </text>
                  </g>
                );
              }
              const x = gauge.x + k * gauge.gap;
              return (
                <g key={navn}>
                  <rect x={x} y={gauge.y} width={gauge.thick} height={gauge.len} rx="8" fill="#1c262e" stroke="#4a5a66" />
                  <rect x={x} y={fx(gauge.y + gauge.len * (1 - level))} width={gauge.thick} height={fx(gauge.len * level)} rx="8" fill={color} />
                  <text x={x + gauge.thick / 2} y={gauge.y + gauge.len + 26} textAnchor="middle" fontSize={figureFont(16, scale)} fontWeight="700" fill={color} stroke={P.halo} strokeWidth="4" paintOrder="stroke">
                    {navn}
                  </text>
                </g>
              );
            })}

            {/* prøven: gitteret som endrer seg */}
            <g transform={`translate(${bx} ${by})`}>
              <rect x="0" y="0" width={RK_W} height={RK_H} rx="14" fill={step === 4 ? "#22303a" : "#1c262e"} stroke={step === 4 ? "#9fd3c7" : "#8b9aa6"} strokeWidth="2" />
              <g clipPath={`url(#${uid}-clip)`}>
                {step <= 2 ? (
                  <line x1={RK_KORNGRENSE} y1="14" x2={RK_KORNGRENSE} y2={RK_H - 14} stroke="#8b9aa6" strokeWidth="2" strokeDasharray="8 8" />
                ) : null}
                <Gitter pos={pos} bonds={RK_OLD_BONDS} bondOpacity={oldOpacity} bondDash={step === 3 ? "4 5" : undefined} ionOpacity={0} />
                <Gitter pos={pos} bonds={RK_NEW_BONDS} bondOpacity={newOpacity} ionOpacity={1} />
              </g>
            </g>

            <Miniatyr x={mini.a[0]} y={mini.a[1]} s={mini.s} etter={false} uid={uid} />
            <Miniatyr x={mini.b[0]} y={mini.b[1]} s={mini.s} etter uid={uid} />
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
