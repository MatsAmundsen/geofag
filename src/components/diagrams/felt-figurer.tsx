/**
 * Figurene i Geofag 1: Feltarbeid.
 *
 * Samme ramme som Isbreer, Norges geologi og Bergarter (IsbreFigur, StegVelger, Skyver, isbre-kit):
 * nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten (src/lib/posts/feltarbeid.md): strøk og fall (SNL, 2024c),
 * «fall 32° mot SØ», og flottørmetoden med faktoren ca. 0,85 (Turnipseed & Sauer, 2010).
 * Ingen andre tall. Skissene er skjematiske og uten målestokk.
 */
import { useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, Skyver, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, obliqueProj, pickStep, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";

type Pt = [number, number];
type V3 = [number, number, number];
const n1 = (v: number) => Math.round(v * 10) / 10;

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

const FM_STEPS = ["1 Lagflate", "2 Strøk", "3 Fall", "4 Tverrsnitt", "5 Flottør", "6 Middelfart"];

function fmStatus(step: number, dip: number) {
  return [
    "1. En lagflate i berget har en retning i rommet. Vi beskriver den med strøk og fall.",
    "2. Strøk er retningen på linjen der flaten skjærer et vannrett plan. Du måler den med kompasset.",
    `3. Fall er vinkelen mellom flaten og det vannrette planet, her ${dip}°. Du måler den med klinometeret og noterer retningen flaten heller mot, for eksempel «fall 32° mot SØ».`,
    "4. Mål bredden og dybden flere steder på en rett strekning, og regn ut tverrsnittsarealet.",
    "5. Slipp en flottør, for eksempel en appelsin, og ta tiden over en kjent lengde. Gjenta flere ganger.",
    "6. Overflaten midt i bekken renner fortere enn vannet langs bunnen og breddene. Gang flottørens fart med ca. 0,85 for å få middelfarten. Vannføring = tverrsnittsareal × middelfart.",
  ][step - 1];
}

/* ---------- strøk og fall: blokk i skrå projeksjon ---------- */

const proj = obliqueProj(470, 270, 1, 0.55, 0.34, 1);
const toPt = (v: V3): Pt => proj(v[0], v[1], v[2]);
const poly = (vs: V3[]) => `M${vs.map((v) => toPt(v).map(n1).join(" ")).join(" L")} Z`;
const seg = (a: V3, b: V3) => {
  const p = toPt(a);
  const q = toPt(b);
  return `M${n1(p[0])} ${n1(p[1])} L${n1(q[0])} ${n1(q[1])}`;
};
/** Strøk NØ–SV (045°), flaten heller mot SØ. */
const S: V3 = [Math.SQRT1_2, Math.SQRT1_2, 0];
const H: V3 = [Math.SQRT1_2, -Math.SQRT1_2, 0];
const add = (a: V3, b: V3, k = 1): V3 => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];

/* ---------- flottørmetoden ---------- */

const BANK_TOP = 150;
const BANK_BOT = 262;
const REACH: [number, number] = [120, 520];

export function FeltmetodeFigur({
  heading = "Metoder i felt: strøk og fall, og vannføring med flottør",
  caption,
  initialStep,
}: {
  heading?: string;
  caption?: ReactNode;
  initialStep?: number;
}) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(6, motion.playing && visible, 3400, 1600, initialStep);
  const { step, phase } = clock;
  const [dip, setDip] = useState(32);
  const rock = step <= 3;
  const D: V3 = [
    H[0] * Math.cos((dip * Math.PI) / 180),
    H[1] * Math.cos((dip * Math.PI) / 180),
    -Math.sin((dip * Math.PI) / 180),
  ];
  const L = 210;
  const W = 150;
  const M = 230;
  const O: V3 = [0, 0, 0];
  const bedBelow: V3[] = [add(O, S, -L), add(O, S, L), add(add(O, S, L), D, W), add(add(O, S, -L), D, W)];
  const bedAbove: V3[] = [add(O, S, -L), add(O, S, L), add(add(O, S, L), D, -W * 0.6), add(add(O, S, -L), D, -W * 0.6)];
  const plane: V3[] = [[-M, -M, 0], [M, -M, 0], [M, M, 0], [-M, M, 0]];
  const arcR = 90;
  const arc: Pt[] = [];
  for (let k = 0; k <= 16; k++) {
    const t = ((dip * Math.PI) / 180) * (k / 16);
    arc.push(toPt([H[0] * Math.cos(t) * arcR, H[1] * Math.cos(t) * arcR, -Math.sin(t) * arcR]));
  }
  const dipEnd = toPt(add(O, D, W * 0.85));
  const hEnd = toPt(add(O, H, arcR + 40));
  const north = [toPt([-190, 120, 0]), toPt([-190, 200, 0])];
  const labels: Lab[] = rock
    ? [
        { text: "Vannrett plan", x: 40, y: 120, at: toPt([-170, -40, 0]), color: "#bfe4ee", anchor: "start", badge: toPt([-150, -120, 0]) },
        { text: "Lagflate", x: 920, y: 120, at: toPt(add(add(O, S, 150), D, -60)), color: "#e6cf8f", anchor: "end", badge: [760, 150] },
        { text: "N", x: n1(north[1][0]), y: n1(north[1][1] - 10), color: C.fg, anchor: "middle", size: 15 },
      ]
    : [
        { text: "Kjent lengde", x: 320, y: 120, at: [320, BANK_TOP - 6], color: C.fg, anchor: "middle", badge: [320, 128] },
        { text: "Bredde", x: 820, y: 120, at: [800, 162], color: "#bfe4ee", anchor: "middle", badge: [800, 136] },
        { text: "Dybde", x: 930, y: 300, at: [860, 250], color: "#bfe4ee", anchor: "end", badge: [900, 270] },
      ];
  if (step === 2)
    labels.push({ text: "Strøk: vannrett linje (kompass)", x: 920, y: 470, at: toPt(add(O, S, -150)), color: "#ffd27a", anchor: "end", badge: [300, 380] });
  if (step === 3)
    labels.push({ text: `Fall ${dip}° mot SØ (klinometer)`, x: 920, y: 470, at: arc[8], color: "#ff9f80", anchor: "end", badge: [700, 420] });
  if (step === 4) labels.push({ text: "Tverrsnittsareal", x: 780, y: 470, at: [780, 220], color: "#8fd3e0", anchor: "middle", badge: [740, 300] });
  if (step === 5) labels.push({ text: "Flottør: tid over kjent lengde", x: 320, y: 330, at: [REACH[0] + (REACH[1] - REACH[0]) * (motion.playing ? phase : 0.6), 206], color: "#ffb36b", anchor: "middle", badge: [300, 300] });
  if (step === 6) {
    labels.push({ text: "Fortest midt i bekken", x: 320, y: 330, at: [330, 206], color: "#ffd27a", anchor: "middle", badge: [380, 300] });
    labels.push({ text: "Middelfart ≈ flottørens fart × ca. 0,85", x: 320, y: 380, color: "#8fd3e0", anchor: "middle" });
  }
  const keys: Key[] = rock
    ? [
        { text: "Strøk", color: "#ffd27a", kind: "line", off: step < 2 },
        { text: "Fall og fallretning", color: "#ff9f80", kind: "line", off: step < 3 },
      ]
    : [
        { text: "Vann", color: "#2f7699", kind: "fill" },
        { text: "Flottør", color: "#ff9a3c", kind: "fill" },
      ];
  const floatX = REACH[0] + (REACH[1] - REACH[0]) * (step === 5 && motion.playing ? phase : 0.6);
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title={
          rock
            ? `Blokk med et vannrett plan og en skrå lagflate. Strøket er linjen der flaten skjærer planet, og fallet er vinkelen ${dip}° ned mot sørøst.`
            : "Bekk sett ovenfra med en flottør over en kjent lengde, og et tverrsnitt med bredde og dybde. Vannet går fortest midt i bekken."
        }
        heading={heading}
        caption={
          caption ??
          "Strøk er retningen på linjen der flaten skjærer et vannrett plan, og fall er vinkelen mellom flaten og planet (SNL, 2024c). Vannføring = tverrsnittsareal × middelfart. Flottøren går fortere enn middelfarten, så farten ganges med ca. 0,85 (Turnipseed & Sauer, 2010). Skjematisk, uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={FM_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />
            {rock ? (
              <Skyver label="Fall" min={0} max={90} step={1} value={dip} onChange={setDip} valueLabel={`${dip}°`} valueText={`Fall ${dip} grader mot sørøst`} ends={["0°", "90°"]} />
            ) : null}
          </StegRamme>
        }
        status={fmStatus(step, dip)}
        labels={labels}
        keys={keys}
        notes={[rock ? "Strøk NØ–SV, fall mot SØ" : "Bekken sett ovenfra (venstre) og i tverrsnitt (høyre)", "Skjematisk, uten målestokk"]}
        remark={rock ? undefined : "Vannføring = tverrsnittsareal × middelfart. Middelfart ≈ flottørens fart × ca. 0,85."}
        viewBox="0 0 960 520"
      >
        {({ d, m }) => (
          <g className={motion.motionClass} data-figur="feltmetoder" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <rect x="0" y="0" width="960" height="520" fill={d.url.sky} />
            {rock ? (
              <g>
                <path d={poly(bedBelow)} fill="#8a7a55" stroke="#c9b27a" strokeWidth="1.5" />
                <path d={poly(bedBelow)} fill={d.url.strata} opacity="0.5" data-nocheck="" />
                <path d={poly(plane)} fill="#7fb2d8" fillOpacity="0.32" stroke="#bfe4ee" strokeWidth="1.5" />
                <path d={poly(bedAbove)} fill="#c9b27a" stroke="#e6cf8f" strokeWidth="1.5" />
                <path d={poly(bedAbove)} fill={d.url.strata} opacity="0.5" data-nocheck="" />
                {/* nordpil */}
                <path d={`M${n1(north[0][0])} ${n1(north[0][1])} L${n1(north[1][0])} ${n1(north[1][1])}`} stroke={C.fg} strokeWidth="2.4" markerEnd={`url(#${m.fg})`} data-nocheck="" />
                {/* strøk */}
                <path d={seg(add(O, S, -L), add(O, S, L))} stroke="#ffd27a" strokeWidth={step === 2 ? 5 : 3} opacity={step >= 2 ? 1 : 0.35} data-nocheck="" />
                {step >= 3 ? (
                  <g data-nocheck="">
                    <path d={`M${n1(toPt(O)[0])} ${n1(toPt(O)[1])} L${n1(hEnd[0])} ${n1(hEnd[1])}`} stroke="#bfe4ee" strokeWidth="2" strokeDasharray="6 5" />
                    <path d={`M${n1(toPt(O)[0])} ${n1(toPt(O)[1])} L${n1(dipEnd[0])} ${n1(dipEnd[1])}`} stroke="#ff9f80" strokeWidth="3.5" markerEnd={`url(#${m.warm})`} />
                    <path d={`M${arc.map((q) => `${n1(q[0])} ${n1(q[1])}`).join(" L")}`} stroke="#ff9f80" strokeWidth="3" fill="none" />
                  </g>
                ) : null}
                {/* kompass og klinometer som små symboler */}
                {step === 2 || step === 3 ? (
                  <g transform={`translate(${n1(toPt(add(O, S, -60))[0])} ${n1(toPt(add(O, S, -60))[1])})`} data-nocheck="">
                    <rect x="-22" y="-14" width="44" height="28" rx="4" fill="#2b3a44" stroke={C.fg} strokeWidth="1.5" />
                    {step === 2 ? (
                      <path d="M0 -9 L4 0 L0 9 L-4 0 Z" fill="#e07a5f" />
                    ) : (
                      <path d="M-16 8 A16 16 0 0 1 16 8" stroke={C.fg} strokeWidth="1.5" fill="none" />
                    )}
                  </g>
                ) : null}
              </g>
            ) : (
              <g>
                {/* bekken ovenfra */}
                <rect x="40" y={BANK_TOP - 40} width="560" height="40" fill="#55664b" />
                <rect x="40" y={BANK_BOT} width="560" height="40" fill="#55664b" />
                <rect x="40" y={BANK_TOP} width="560" height={BANK_BOT - BANK_TOP} fill={d.url.water} />
                {/* start- og mållinje */}
                {REACH.map((x) => (
                  <path key={x} d={`M${x} ${BANK_TOP - 30} L${x} ${BANK_BOT + 30}`} stroke={C.fg} strokeWidth="2.4" strokeDasharray="7 5" data-nocheck="" />
                ))}
                <path d={`M${REACH[0] + 6} ${BANK_TOP - 18} L${REACH[1] - 6} ${BANK_TOP - 18}`} stroke={C.fg} strokeWidth="2" markerEnd={`url(#${m.fg})`} data-nocheck="" />
                {/* fartsprofil: lengre piler midt i bekken */}
                {step === 6
                  ? [0.12, 0.3, 0.5, 0.7, 0.88].map((f) => {
                      const y = BANK_TOP + (BANK_BOT - BANK_TOP) * f;
                      const len = 40 + 130 * (1 - ((f - 0.5) / 0.5) ** 2);
                      return <path key={f} d={`M150 ${n1(y)} L${n1(150 + len)} ${n1(y)}`} stroke="#ffd27a" strokeWidth="3" markerEnd={`url(#${m.warm})`} data-nocheck="" />;
                    })
                  : null}
                {/* flottør */}
                <circle cx={n1(floatX)} cy="206" r="11" fill="#ff9a3c" stroke={P.halo} strokeWidth="2" data-nocheck="" />
                {/* tverrsnitt */}
                <g data-nocheck="">
                  <rect x="660" y="150" width="280" height="170" fill="#3b4239" />
                  <path d="M680 170 C700 250 740 262 780 264 C830 262 870 240 900 170 Z" fill={d.url.water} opacity={step === 4 ? 1 : 0.8} />
                  <path d="M680 170 L900 170" stroke="#bfe4ee" strokeWidth="2" />
                  <path d="M686 158 L894 158" stroke="#bfe4ee" strokeWidth="2" markerEnd={`url(#${m.fg})`} />
                  {[730, 780, 840].map((x) => (
                    <path key={x} d={`M${x} 172 L${x} ${x === 780 ? 262 : x === 730 ? 246 : 238}`} stroke="#bfe4ee" strokeWidth="2" strokeDasharray="4 3" opacity={step === 4 ? 1 : 0.6} />
                  ))}
                </g>
              </g>
            )}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
