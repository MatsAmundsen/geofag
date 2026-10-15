import type { ReactNode } from "react";
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

import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";

const STEG = [
  "Magma trenger inn",
  "Varme i aureolen",
  "Hornfels uten foliasjon",
  "Platene møtes",
  "Skorpa foldes",
  "Foliasjon",
];

const STATUS = [
  "Kontaktmetamorfose: magma trenger opp gjennom sidebergarten. Lagene ligger fortsatt flatt. Varmen er bare lokal.",
  "Varme stråler ut fra intrusjonen. En smal sone rundt magmaet, kontaktaureolen, varmes opp. Utenfor er lagene nesten uendret.",
  "I aureolen blir berget til hornfels. Kornene er jevne og har ingen felles retning, fordi trykket ikke er rettet.",
  "Regional metamorfose: to kontinenter kolliderer. Rettet trykk virker over store områder, ikke bare rundt en intrusjon.",
  "Skorpa fortykkes. Lagene foldes. Både trykk og temperatur er høye.",
  "Glimmer legger seg på tvers av trykkretningen. Det blir foliasjon og skifrighet, som i fyllitt og gneis.",
];

/** Startvinkler for glimmerflakene i zoom før foliasjon (grader fra loddrett). */
const GLIMMER_START = [70, -40, 15, -75, 50, -20];

const LAG = [
  { y: 58, h: 20, fill: "#6d7468", name: "Leirskifer" },
  { y: 78, h: 18, fill: "#c9b896", name: "Sandstein" },
  { y: 96, h: 16, fill: "#d5d8c8", name: "Kalkstein" },
  { y: 112, h: 20, fill: "#6d7468", name: "" },
  { y: 132, h: 18, fill: "#c9b896", name: "" },
];

function foldY(x: number, i: number, amp: number) {
  return 170 + i * 26 - Math.exp(-((x - 270) ** 2) / 7000) * amp;
}

function foldPath(i: number, amp: number) {
  const pts: string[] = [];
  for (let x = 0; x <= 540; x += 12) pts.push(`${x} ${foldY(x, i, amp).toFixed(1)}`);
  return pts;
}

function band(i: number, amp: number) {
  const top = foldPath(i, amp);
  const bot = foldPath(i + 1, amp).reverse();
  return `M ${top.join(" L ")} L ${bot.join(" L ")} Z`;
}

export function KontaktRegionalMetamorfoseFigur({
  heading = "Kontakt- og regional metamorfose",
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
  const clock = useStepClock(6, motion.playing && visible, 3600, 1200, initialStep);
  const { step, phase } = clock;
  const s = keyframe(
    [
      { aureole: 0, heat: 0.2, amp: 8, folio: 0, stress: 0 },
      { aureole: 0.55, heat: 1, amp: 8, folio: 0, stress: 0 },
      { aureole: 1, heat: 1, amp: 8, folio: 0, stress: 0 },
      { aureole: 0, heat: 0.1, amp: 28, folio: 0, stress: 1 },
      { aureole: 0, heat: 0.1, amp: 58, folio: 0.35, stress: 1 },
      { aureole: 0, heat: 0.1, amp: 72, folio: 1, stress: 1 },
    ],
    step,
    phase,
  );

  const keys: Key[] = [
    { text: "Magma", color: "#c44914", kind: "fill" },
    { text: "Hornfels (kontaktaureole)", color: "#a35a32", kind: "fill" },
    { text: "Rettet trykk", color: "#5fa6c8", kind: "line" },
    { text: "Foliasjon", color: "#9b8aa0", kind: "line" },
  ];

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Kontaktmetamorfose med flate lag og hornfels, og regional metamorfose med folding og foliasjon"
        heading={heading}
        caption={
          caption ??
          "Kontakt: lokal varme, flate lag, hornfels uten foliasjon. Regional: rettet trykk over store områder, folder og skifrighet. Skjematisk, uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} name={heading} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={STEG} step={step} onStep={pickStep(clock, motion)} label="Velg prosess" />
          </StegRamme>
        }
        status={STATUS[step - 1]}
        keys={keys}
        notes={["Venstre: kontaktmetamorfose", "Høyre: regional metamorfose", "Skjematisk, uten målestokk"]}
        viewBox="0 0 1080 420"
      >
        {({ m }) => (
          <g data-figur="kontakt-regional" data-step={step}>
            <g transform="translate(0 0)">
              <rect width="540" height="420" fill="#18303d" />
              <rect x="0" y="44" width="540" height="12" fill="#55664b" opacity="0.5" />
              <rect x="0" y="48" width="100" height="160" fill="#0f171c" />
              {LAG.map((b) => (
                <rect key={b.y} x="100" y={b.y} width="440" height={b.h} fill={b.fill} />
              ))}
              <rect x="100" y="150" width="440" height="270" fill="#5d6a5c" />
              <path
                d="M190 420 L178 300 Q168 220 230 180 Q290 140 350 178 Q410 218 400 310 L388 420 Z"
                fill="none"
                stroke="#a35a32"
                strokeWidth={10 + s.aureole * 40}
                opacity={0.25 + s.aureole * 0.5}
              />
              <path
                d="M190 420 L178 300 Q168 220 230 180 Q290 140 350 178 Q410 218 400 310 L388 420 Z"
                fill="#c44914"
              />
              {s.heat > 0.4 &&
                ["M290 185 L290 125", "M245 225 L175 190", "M345 225 L415 190"].map((d) => (
                  <path key={d} d={d} stroke={C.warm} strokeWidth="2.5" fill="none" markerEnd={`url(#${m.warm})`} opacity={s.heat} />
                ))}
              <text x="16" y="28" fontSize="16" fontWeight="700" fill={C.fg}>
                Kontaktmetamorfose
              </text>
              {LAG.filter((b) => b.name).map((b) => (
                <text key={b.name} x="8" y={b.y + 14} fontSize="12" fill={C.fg}>
                  {b.name}
                </text>
              ))}
              <text x="290" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.fg}>
                Magma
              </text>
              <text x="420" y="72" fontSize="12" fill={C.fg}>
                Uendret lag
              </text>
              {s.aureole > 0.4 && (
                <text x="16" y="400" fontSize="13" fontWeight="700" fill={C.fg}>
                  Hornfels · ingen foliasjon
                </text>
              )}
              <g transform="translate(390 250)">
                <rect width="130" height="90" rx="8" fill="#0f171c" stroke="#2a3943" />
                <text x="8" y="16" fontSize="11" fontWeight="700" fill={C.fg}>
                  Zoom: hornfels
                </text>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={i} cx={28 + (i % 3) * 34} cy={42 + Math.floor(i / 3) * 26} r="9" fill="#a35a32" />
                ))}
              </g>
            </g>

            <g transform="translate(540 0)">
              <rect width="540" height="420" fill="#18303d" />
              <path d={`M ${foldPath(0, s.amp).join(" L ")} L 540 420 L 0 420 Z`} fill="#5d6a5c" />
              {[0, 1, 2, 3, 4].map((i) => (
                <path key={i} d={band(i, s.amp)} fill={i % 2 ? "#c9b896" : "#6d7468"} />
              ))}
              {s.folio > 0.2 &&
                [80, 140, 200, 260, 320, 380, 440].flatMap((x) =>
                  [0, 1, 2].map((i) => {
                    const y = foldY(x, i, s.amp) + 8;
                    return (
                      <line
                        key={`${x}-${i}`}
                        x1={x}
                        y1={y - 9}
                        x2={x}
                        y2={y + 9}
                        stroke="#9b8aa0"
                        strokeWidth="2.5"
                        opacity={s.folio}
                      />
                    );
                  }),
                )}
              <path d={`M ${foldPath(0, s.amp).join(" L ")}`} fill="none" stroke={C.fg} strokeWidth="2" />
              {s.stress > 0 && (
                <>
                  {/* Rettet trykk: pilene peker innover mot kollisjonen */}
                  <path d="M16 220 L66 220" stroke="#5fa6c8" strokeWidth="4" markerEnd={`url(#${m.teal})`} />
                  <path d="M524 220 L474 220" stroke="#5fa6c8" strokeWidth="4" markerEnd={`url(#${m.teal})`} />
                </>
              )}
              <text x="16" y="28" fontSize="16" fontWeight="700" fill={C.fg}>
                Regional metamorfose
              </text>
              <text x="16" y="400" fontSize="13" fontWeight="700" fill={C.fg}>
                {s.folio > 0.5 ? "Foliasjon på tvers av trykket" : s.stress > 0 ? "Rettet trykk fra kollisjonen" : "Før kollisjonen"}
              </text>
              <g transform="translate(360 250)" opacity={s.folio > 0.2 ? 1 : 0.4}>
                <rect width="155" height="88" rx="8" fill="#0f171c" stroke="#2a3943" />
                <text x="8" y="16" fontSize="11" fontWeight="700" fill={C.fg}>
                  Zoom: glimmerflak
                </text>
                {/* Glimmerflak: tilfeldig orientert før, loddrett (på tvers av det vannrette trykket) etter */}
                <path d="M6 56 L22 56" stroke="#5fa6c8" strokeWidth="3" markerEnd={`url(#${m.teal})`} />
                <path d="M149 56 L133 56" stroke="#5fa6c8" strokeWidth="3" markerEnd={`url(#${m.teal})`} />
                {GLIMMER_START.map((a, i) => (
                  <ellipse
                    key={i}
                    cx={36 + i * 17}
                    cy="56"
                    rx="4"
                    ry={s.folio > 0.4 ? 24 : 14}
                    fill="#9b8aa0"
                    transform={`rotate(${lerp(a, 0, Math.min(1, s.folio / 0.6))} ${36 + i * 17} 56)`}
                  />
                ))}
              </g>
            </g>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
