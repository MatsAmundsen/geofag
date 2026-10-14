import { useState, type ReactNode } from "react";
import { IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key } from "./isbre-figur";
import { lerp, pickStep, smooth, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

function keyframe<T extends Record<string, number>>(frames: T[], step: number, phase: number): T {
  const to = frames[step - 1];
  const from = step > 1 ? frames[step - 2] : frames[frames.length - 1];
  const t = smooth(phase);
  const out = {} as Record<string, number>;
  for (const k of Object.keys(to)) out[k] = lerp(from[k], to[k], t);
  return out as T;
}

import { useId } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";

const STEG = ["Homogen smelte", "Første krystaller", "Krystallene synker", "Restsmelte"];

const STATUS = [
  "Et magmakammer er fylt av en homogen smelte. Ingen mineraler har skilt seg ut ennå.",
  "Avkjølingen starter langs kanten. Olivin og pyroksen krystalliserer først. De er rike på jern og magnesium.",
  "Krystallene er tyngre enn smelten og synker. De tar jern og magnesium med seg ut av smelten.",
  "Nederst ligger en mørk kumulasjon. Restsmelten over er fattigere på jern og rikere på silisium. Den kan størkne som en lysere bergart.",
];

const KRYST = [
  [220, 155],
  [265, 145],
  [315, 165],
  [365, 150],
  [415, 160],
  [240, 195],
  [295, 188],
  [355, 200],
  [415, 185],
  [270, 225],
  [330, 218],
  [390, 230],
].map(([x, y], i) => ({ x, y0: y, y1: 340 + (i % 3) * 10, x1: 240 + (i % 6) * 28 }));

export function DifferensieringFigur({
  heading = "Magmatisk differensiering",
  caption,
  initialStep,
}: {
  heading?: string;
  caption?: React.ReactNode;
  initialStep?: number;
}) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3400, 1200, initialStep);
  const { step, phase } = clock;
  const s = keyframe(
    [
      { sink: 0, felsic: 0, show: 0 },
      { sink: 0.15, felsic: 0, show: 1 },
      { sink: 0.72, felsic: 0.45, show: 1 },
      { sink: 1, felsic: 0.88, show: 1 },
    ],
    step,
    phase,
  );

  const keys: Key[] = [
    { text: "Smelte", color: "#c44914", kind: "fill" },
    { text: "Mørke krystaller (olivin, pyroksen)", color: "#3e4a43", kind: "fill" },
    { text: "Restsmelte, mer silisium", color: "#f3d7c4", kind: "fill" },
  ];

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Magmakammer der tidlige krystaller synker og restsmelten blir lysere"
        heading={heading}
        caption={
          caption ??
          "Forenklet modell av fraksjonert krystallisasjon. De første mineralene tar jern og magnesium ut av smelten. Restsmelten kan størkne som en lysere bergart. Ikke all granitt dannes slik. Skjematisk, uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} name={heading} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={STEG} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />
          </StegRamme>
        }
        status={STATUS[step - 1]}
        keys={keys}
        notes={["Skjematisk, uten målestokk", "Fraksjonert krystallisasjon"]}
        viewBox="0 0 700 400"
      >
        {({ m }) => (
          <g data-figur="differensiering" data-step={step}>
            <path d="M0 68 C140 38 220 76 340 50 C480 20 580 62 700 34 L700 400 L0 400 Z" fill="#5d6a5c" />
            <path d="M0 68 C140 38 220 76 340 50 C480 20 580 62 700 34" fill="none" stroke={C.fg} strokeWidth="2" />
            <path
              d="M185 395 L168 275 Q158 190 230 148 Q310 100 380 145 Q470 185 485 270 L468 395 Z"
              fill="#c44914"
            />
            <path
              d="M185 395 L168 275 Q158 190 230 148 Q310 100 380 145 Q470 185 485 270 L468 395 Z"
              fill="#f3d7c4"
              opacity={s.felsic * 0.82}
            />
            <path
              d="M198 395 L210 325 Q255 292 335 298 Q425 304 452 335 L455 395 Z"
              fill="#3e4a43"
              opacity={s.sink}
            />
            {KRYST.map((c, i) => {
              const x = c.x + (c.x1 - c.x) * s.sink;
              const y = c.y0 + (c.y1 - c.y0) * s.sink;
              return (
                <polygon
                  key={i}
                  points={`${x},${y - 12} ${x + 10},${y} ${x},${y + 12} ${x - 10},${y}`}
                  fill="#2a3330"
                  opacity={s.show}
                  stroke={C.fg}
                  strokeOpacity="0.35"
                />
              );
            })}
            <text x="320" y="210" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.fg}>
              {s.felsic > 0.6 ? "Restsmelte, mer silisium" : "Homogen smelte"}
            </text>
            {s.sink > 0.5 && (
              <text x="330" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.fg}>
                Mørke krystaller (olivin, pyroksen)
              </text>
            )}
            <text x="20" y="28" fontSize="14" fontWeight="700" fill={C.fg}>
              Sidebergart
            </text>
            <defs>
              <marker id={m.warm} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill={C.warm} />
              </marker>
            </defs>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

const DIA_STEG = ["Porer fulle av væske", "Kompaksjon", "Væsken sirkulerer", "Cementering"];

const DIA_STATUS = [
  "Ny sand på havbunnen er løs. De store rommene mellom kornene er fylt av væske, ikke luft. Uten den væsken stopper diagenesen.",
  "Nye lag legger seg oppå. Vekten presser kornene tettere, og mye porevæske klemmes ut. En del væske blir igjen.",
  "Væsken som er igjen, varmes opp med dypet og sirkulerer mellom kornene. Den løser ioner.",
  "Ionene felles ut som kitt rundt kornene. Det er cementering. Uten porevæske blir det nesten ikke kitt.",
];

const KORN = Array.from({ length: 20 }, (_, i) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  return {
    lx: 200 + col * 90,
    ly: 130 + row * 60,
    tx: 250 + col * 44,
    ty: 165 + row * 36,
    r: 15,
    fill: i % 3 === 0 ? "#e4d2ae" : i % 3 === 1 ? "#8a7d6e" : "#f3d7c4",
  };
});

export function DiagenesePoreFigur({
  heading = "Diagenese: fra løs sand til sandstein",
  caption,
  initialStep,
}: {
  heading?: string;
  caption?: React.ReactNode;
  initialStep?: number;
}) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3400, 1200, initialStep);
  const { step, phase } = clock;
  const s = keyframe(
    [
      { pack: 0, cement: 0, flow: 0 },
      { pack: 1, cement: 0, flow: 0 },
      { pack: 1, cement: 0.35, flow: 1 },
      { pack: 1, cement: 1, flow: 1 },
    ],
    step,
    phase,
  );
  const pack = s.pack;
  const burden = pack * 50;

  const keys: Key[] = [
    { text: "Porevæske", color: "#6ea4bc", kind: "fill" },
    { text: "Sandkorn", color: "#e4d2ae", kind: "fill" },
    { text: "Kitt (kvarts, kalsitt)", color: "#b8862f", kind: "fill" },
  ];

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Sandkorn med porevæske som sirkulerer og feller ut kitt"
        heading={heading}
        caption={
          caption ??
          "Cementering krever porevæske. Trykk pakker kornene. Det er væsken som løser ioner og feller dem ut som kitt. Skjematisk, uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} name={heading} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={DIA_STEG} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />
          </StegRamme>
        }
        status={DIA_STATUS[step - 1]}
        keys={keys}
        notes={["Blått mellom kornene er porevæske", "Skjematisk, uten målestokk"]}
        viewBox="0 0 760 400"
      >
        {() => (
          <g data-figur="diagenese" data-step={step}>
            <rect x="160" y="48" width="540" height="30" fill="#6ea4bc" opacity="0.45" />
            <text x="176" y="68" fontSize="14" fontWeight="700" fill={C.fg}>
              Hav
            </text>
            <rect x="160" y={78} width="540" height={burden} fill="#5d6a5c" opacity={pack} />
            <text x="176" y={78 + burden * 0.6} fontSize="13" fontWeight="700" fill={C.fg} opacity={pack > 0.4 ? 1 : 0}>
              Nye lag presser ned
            </text>
            <rect x="160" y={78 + burden} width="540" height={280 - burden} fill="#6ea4bc" opacity={0.55 - s.cement * 0.25} />
            {KORN.map((g, i) => {
              const x = g.lx + (g.tx - g.lx) * pack;
              const y = g.ly + (g.ty - g.ly) * pack;
              const right = i % 5 < 4 ? KORN[i + 1] : null;
              const below = i < 15 ? KORN[i + 5] : null;
              const rx = right ? right.lx + (right.tx - right.lx) * pack : 0;
              const ry = right ? right.ly + (right.ty - right.ly) * pack : 0;
              const bx = below ? below.lx + (below.tx - below.lx) * pack : 0;
              const by = below ? below.ly + (below.ty - below.ly) * pack : 0;
              return (
                <g key={i}>
                  {right && s.cement > 0 && (
                    <line x1={x} y1={y} x2={rx} y2={ry} stroke="#b8862f" strokeWidth={4 + s.cement * 8} strokeLinecap="round" />
                  )}
                  {below && s.cement > 0 && (
                    <line x1={x} y1={y} x2={bx} y2={by} stroke="#b8862f" strokeWidth={4 + s.cement * 8} strokeLinecap="round" />
                  )}
                </g>
              );
            })}
            {KORN.map((g, i) => {
              const x = g.lx + (g.tx - g.lx) * pack;
              const y = g.ly + (g.ty - g.ly) * pack;
              return <circle key={i} cx={x} cy={y} r={g.r} fill={g.fill} stroke={C.fg} strokeOpacity="0.3" />;
            })}
            {s.flow > 0.3 && (
              <path
                d={`M200 ${200 + pack * 20} C 300 ${160 + pack * 16} 360 ${250} 460 ${195 + pack * 16} C 540 ${155} 600 ${230} 690 ${195}`}
                fill="none"
                stroke={C.fg}
                strokeWidth="3"
                strokeDasharray="8 8"
                opacity={s.flow}
              />
            )}
            <text x="176" y="385" fontSize="14" fontWeight="700" fill={C.fg}>
              {s.cement > 0.5 ? "Kitt fra porevæsken limer kornene" : "Blått mellom kornene er porevæske"}
            </text>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

const ION_STEG = ["Fast gitter og væske", "Ion hopper ut", "Nytt ion går inn", "Ny sammensetning"];

const ION_STATUS = [
  "Mineralet er fast. En tynn film av varm væske ligger langs korngrensen. I væsken driver oppløste ioner.",
  "Et ion løsner fra gitteret og hopper ut i væsken. Der det satt, blir det et hull.",
  "Et annet ion fra væsken vandrer inn og tar den ledige plassen.",
  "Gitteret har fått et nytt grunnstoff. Berget er fortsatt fast. Det har ikke smeltet. Dette er metasomatose.",
];

const RING = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return { x: 200 + Math.cos(a) * 58, y: 150 + Math.sin(a) * 58 };
});

export function IonBytteFigur({
  heading = "Ioner byttes i fast berg",
  caption,
  initialStep,
}: {
  heading?: string;
  caption?: React.ReactNode;
  initialStep?: number;
}) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 3200, 1000, initialStep);
  const { step, phase } = clock;
  const uid = useId().replace(/:/g, "");
  const outX = step === 1 ? 200 + (410 - 200) * phase : step === 0 ? 200 : 410;
  const outY = step === 1 ? 150 + (255 - 150) * phase : step === 0 ? 150 : 255;
  const innX = step === 2 ? 500 + (200 - 500) * phase : step < 2 ? 500 : 200;
  const innY = step === 2 ? 268 + (150 - 268) * phase : step < 2 ? 268 : 150;
  const hole = step === 1 || (step === 2 && phase < 0.7);
  const swapped = step >= 3 || (step === 2 && phase > 0.85);

  const keys: Key[] = [
    { text: "Ion som forlater gitteret", color: "#e8a04a", kind: "fill" },
    { text: "Ion fra væsken", color: "#6ea4bc", kind: "fill" },
    { text: "Porevæske", color: "#1d5c82", kind: "fill" },
  ];

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Et ion forlater mineralgitteret og et nytt ion fra væsken tar plassen"
        heading={heading}
        caption={
          caption ??
          "Væsken er transportbåndet. Uten den flytter ionene seg nesten ikke. Bergarten smelter ikke. Skjematisk, uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} name={heading} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={ION_STEG} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />
          </StegRamme>
        }
        status={ION_STATUS[step - 1]}
        keys={keys}
        notes={["Metasomatose: grunnstoff byttes uten smelting", "Skjematisk, uten målestokk"]}
        viewBox="0 0 700 360"
      >
        {() => (
          <g data-figur="ionbytte" data-step={step}>
            <text x="24" y="32" fontSize="15" fontWeight="700" fill={C.fg}>
              Mineralgitter
            </text>
            <text x="24" y="52" fontSize="13" fill={C.muted}>
              {swapped ? "Ny sammensetning" : "Opprinnelig sammensetning"}
            </text>
            <rect x="24" y="230" width="652" height="72" rx="16" fill="#1d5c82" opacity="0.35" />
            <text x="40" y="252" fontSize="13" fontWeight="700" fill={C.fg}>
              Varm porevæske langs korngrensen
            </text>
            {[80, 150, 480, 560, 630].map((x, i) => (
              <circle key={x} cx={x + (i % 2 ? 8 : -8)} cy={278} r="9" fill="#6ea4bc" opacity="0.8" />
            ))}
            <path
              d="M200 150 C 270 105 340 175 410 255"
              fill="none"
              stroke="#e8a04a"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              opacity={step === 1 ? 0.9 : 0.25}
            />
            <path
              d="M500 268 C 420 200 300 160 200 150"
              fill="none"
              stroke="#6ea4bc"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              opacity={step >= 2 ? 0.9 : 0.25}
            />
            {RING.map((p, i) => (
              <g key={i}>
                <line x1="200" y1="150" x2={p.x} y2={p.y} stroke="#3a4a55" strokeWidth="3" />
                <circle cx={p.x} cy={p.y} r="16" fill="#8a7d6e" />
              </g>
            ))}
            {hole && (
              <circle cx="200" cy="150" r="17" fill="none" stroke="#e8a04a" strokeWidth="3" strokeDasharray="5 4" />
            )}
            <circle cx={outX} cy={outY} r="16" fill="#e8a04a" stroke={C.fg} strokeOpacity="0.3" />
            <circle cx={innX} cy={innY} r="16" fill="#6ea4bc" stroke={C.fg} strokeOpacity="0.3" />
            <text x="24" y="210" fontSize="14" fill={C.fg}>
              {swapped ? "Blått ion sitter nå i gitteret" : "Oransje ion forlater plassen"}
            </text>
            <defs>
              <marker id={`${uid}-ut`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0 0 L7 3.5 L0 7 Z" fill="#e8a04a" />
              </marker>
            </defs>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
