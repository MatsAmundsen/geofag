import { useEffect, useId, useState, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { ScrollFrame } from "@/components/scroll-frame";
import { useAnimationPlaying, useStepCycle } from "./use-motion";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";
import { BillowColumn, BillowSheet, LayeredCone, VolcArtDefs } from "./volcano-art";
import {
  flankPoints,
  halfWidthForSlope,
  profilePath,
  type ProfileSpec,
  SHIELD_LAYERS,
  STRATO_LAYERS,
  surfacePath,
  surfaceY,
} from "./volcano-geometry";

function StepPicker({
  labels,
  step,
  onStep,
}: {
  labels: string[];
  step: number;
  onStep: (step: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Trinn">
      {labels.map((label, index) => {
        const n = index + 1;
        const active = step === n;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={active}
            onClick={() => onStep(n)}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-muted/60 text-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function WideSvg({
  label,
  viewBox,
  children,
}: {
  label: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <ScrollFrame label={label} fade="var(--color-card)">
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={label}
        className="h-auto w-full max-sm:min-w-[44rem]"
      >
        <rect width="100%" height="100%" fill={C.bg} rx="10" />
        {children}
      </svg>
    </ScrollFrame>
  );
}

function FactList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="space-y-1.5 text-sm leading-snug">
      {rows.map(([term, text]) => (
        <div key={term} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[7.2rem_1fr] sm:gap-2">
          <dt className="text-muted-foreground">{term}</dt>
          <dd className="text-foreground">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Realistiske profiler til «Tre hovedtyper» ---------- */

function AngleMark({ x, y, deg: a, r, side, label, labelX, labelY }: { x: number; y: number; deg: number; r: number; side: "left" | "right"; label: string; labelX: number; labelY: number }) {
  const rad = (a * Math.PI) / 180;
  const sx = side === "left" ? 1 : -1;
  const ex = x + sx * r * Math.cos(rad);
  const ey = y - r * Math.sin(rad);
  return (
    <g>
      <path d={`M ${x} ${y} H ${x + sx * (r + 10)}`} stroke="#c9b896" strokeWidth="0.9" strokeDasharray="3 2" />
      <path d={`M ${x + sx * r} ${y} A ${r} ${r} 0 0 ${side === "left" ? 0 : 1} ${ex.toFixed(1)} ${ey.toFixed(1)}`} fill="none" stroke="#c9b896" strokeWidth="1" />
      <L x={labelX} y={labelY} size={11} weight={600} fill={C.sand} anchor={side === "left" ? "start" : "end"}>
        {label}
      </L>
    </g>
  );
}

function ShieldProfileSvg({ geografi }: { geografi: boolean }) {
  const id = useId().replace(/:/g, "");
  const spec: ProfileSpec = { kind: "shield", cx: 160, baseY: 112, height: 12, crater: 10, craterDepth: 1.6, halfWidth: 0 };
  spec.halfWidth = halfWidthForSlope(spec.height, 5, spec.crater);
  const top = spec.baseY - spec.height;
  // Lavastrøm som følger høyre flanke ned fra toppområdet.
  const flow = Array.from({ length: 14 }, (_, i) => {
    const x = 176 + i * 7;
    return `${i === 0 ? "M" : "L"} ${x} ${((surfaceY(spec, x) ?? spec.baseY) - 0.6).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 320 150" className="h-auto w-full" role="img" aria-label="Skjoldvulkan i tverrsnitt med slake sider, ca. 2 til 10 grader, bygd av tynne lavadekker">
      <VolcArtDefs id={id} />
      <rect width="320" height="150" fill={`url(#${id}-sky)`} rx="8" />
      <rect x="0" y={spec.baseY} width="320" height={150 - spec.baseY} fill={`url(#${id}-crust)`} />
      <rect x="0" y={spec.baseY} width="320" height={150 - spec.baseY} fill={`url(#${id}-speckle)`} />
      <LayeredCone spec={spec} colors={SHIELD_LAYERS} layers={6} clipId={`${id}-c`} />
      <path d={surfacePath(spec)} fill="none" stroke="#6d6259" strokeWidth="0.9" />
      {/* Grunt magmareservoar og tilførselsrør */}
      <ellipse cx="160" cy="134" rx="34" ry="5" fill={`url(#${id}-halo)`} />
      <ellipse cx="160" cy="134" rx="24" ry="3.6" fill={`url(#${id}-chamber)`} />
      <path d={`M 158.6 131 L 158.8 ${top + 1} H 161.2 L 161.4 131 Z`} fill={`url(#${id}-lava)`} />
      <path d={flow} fill="none" stroke="#ff8a2a" strokeWidth="1.6" strokeLinecap="round" />
      <path d={flow} fill="none" stroke="#ffd27a" strokeWidth="0.6" strokeLinecap="round" />
      <ellipse cx="160" cy={top - 4} rx="14" ry="3" fill="#cfd6da" opacity="0.18" />
      <AngleMark x={spec.cx - spec.halfWidth} y={spec.baseY} deg={7} r={40} side="left" label={geografi ? "Slak" : "Slak: ca. 2–10°"} labelX={18} labelY={92} />
      {!geografi && (
        <L x="304" y="142" size={11} fill={C.muted} anchor="end">
          Uten overhøyde
        </L>
      )}
    </svg>
  );
}

function StratoProfileSvg({ geografi }: { geografi: boolean }) {
  const id = useId().replace(/:/g, "");
  const spec: ProfileSpec = { kind: "strato", cx: 160, baseY: 138, height: 55, crater: 7, craterDepth: 3, halfWidth: 0 };
  spec.halfWidth = spec.crater + spec.height / 0.377;
  const top = spec.baseY - spec.height;
  const { left } = flankPoints(spec, 36);
  // Pyroklastisk strøm langs venstre flanke (stiplet), fra toppen og ned.
  const pdc = left
    .filter((_, i) => i > 6 && i % 3 === 0)
    .reverse()
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(y - 3).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox="0 0 320 168" className="h-auto w-full" role="img" aria-label="Stratovulkan i tverrsnitt: bratt konkav kjegle med vekslende lag av lava og aske parallelt med flankene">
      <VolcArtDefs id={id} />
      <rect width="320" height="168" fill={`url(#${id}-sky)`} rx="8" />
      <rect x="0" y={spec.baseY} width="320" height={168 - spec.baseY} fill={`url(#${id}-crust)`} />
      <rect x="0" y={spec.baseY} width="320" height={168 - spec.baseY} fill={`url(#${id}-speckle)`} />
      <LayeredCone spec={spec} colors={STRATO_LAYERS} layers={8} clipId={`${id}-c`} />
      <path d={surfacePath(spec)} fill="none" stroke="#7a6c5c" strokeWidth="0.9" />
      {/* Tilførselsrør med en sidegang (dike) */}
      <path d={`M 158.4 168 L 158.6 ${top + 2} H 161.4 L 161.6 168 Z`} fill={`url(#${id}-lava)`} />
      <path d="M 161 120 L 186 104" stroke="#ff8a2a" strokeWidth="1.4" />
      {/* Askesøyle med bølgende kanter */}
      <BillowColumn x0={160} y0={top - 6} x1={148} y1={24} r0={5} r1={22} count={9} fill={`url(#${id}-ash)`} shade="#3e3934" seed={3} />
      {!geografi && <path d={pdc} fill="none" stroke={C.low} strokeWidth="3" strokeDasharray="5 3" strokeLinecap="round" />}
      <path d={`M ${spec.cx - spec.crater - 2} ${top} L ${spec.cx - spec.crater - 26} ${top}`} stroke="#c9b896" strokeWidth="0.9" strokeDasharray="3 2" />
      <path d={`M ${spec.cx - spec.crater - 20} ${top} A 20 20 0 0 0 ${(spec.cx - spec.crater - 20 * Math.cos((33 * Math.PI) / 180)).toFixed(1)} ${(top + 20 * Math.sin((33 * Math.PI) / 180)).toFixed(1)}`} fill="none" stroke="#c9b896" strokeWidth="1" />
      <L x="16" y={top + 4} size={11} weight={600} fill={C.sand}>
        {geografi ? "Bratt i toppen" : "Bratt i toppen: 25–35°"}
      </L>
      {!geografi && (
        <L x="304" y="160" size={11} fill={C.muted} anchor="end">
          Uten overhøyde
        </L>
      )}
    </svg>
  );
}

function CinderProfileSvg() {
  const id = useId().replace(/:/g, "");
  const spec: ProfileSpec = { kind: "cinder", cx: 150, baseY: 138, height: 66, crater: 22, craterDepth: 10, halfWidth: 0 };
  spec.halfWidth = halfWidthForSlope(spec.height, 33, spec.crater);
  const top = spec.baseY - spec.height;
  const bombs: [number, number, number][] = [
    [-34, 46, 2.4],
    [-18, 62, 2],
    [10, 66, 2.6],
    [30, 50, 2.2],
    [44, 34, 1.8],
    [-46, 26, 1.8],
  ];
  return (
    <svg viewBox="0 0 320 168" className="h-auto w-full" role="img" aria-label="Sinderkjegle i tverrsnitt: rette, bratte sider av slagg rundt et bredt krater, med lavafontene og lavastrøm fra foten">
      <VolcArtDefs id={id} />
      <rect width="320" height="168" fill={`url(#${id}-sky)`} rx="8" />
      <rect x="0" y={spec.baseY} width="320" height={168 - spec.baseY} fill={`url(#${id}-crust)`} />
      <rect x="0" y={spec.baseY} width="320" height={168 - spec.baseY} fill={`url(#${id}-speckle)`} />
      {/* Lavastrøm som bryter ut ved foten, slik det er vanlig ved sinderkjegler */}
      <path d={`M 196 ${spec.baseY} Q 240 ${spec.baseY - 7} 300 ${spec.baseY - 3} L 304 ${spec.baseY} Z`} fill="#2a2420" />
      <path d={`M 200 ${spec.baseY - 1} Q 240 ${spec.baseY - 6} 296 ${spec.baseY - 2.5}`} fill="none" stroke="#ff7a1a" strokeWidth="1.4" strokeDasharray="6 4" />
      <path d={profilePath(spec)} fill={`url(#${id}-scoria)`} stroke="#8a5344" strokeWidth="1" />
      <path d={profilePath(spec)} fill="#2a1410" opacity="0.18" />
      {/* Lagdelt slagg i snittet: lag som heller utover med rasvinkelen */}
      {[0.2, 0.4, 0.6].map((f) => (
        <path
          key={f}
          d={profilePath({ ...spec, height: spec.height * (1 - f), halfWidth: spec.halfWidth - (spec.halfWidth - spec.crater) * f * 0.6, crater: spec.crater * (1 - f) })}
          fill="none"
          stroke="#2f1812"
          strokeOpacity="0.55"
          strokeWidth="0.8"
        />
      ))}
      <path d={`M 148.6 168 L 148.8 ${top + 8} H 151.2 L 151.4 168 Z`} fill={`url(#${id}-lava)`} />
      {/* Lavafontene og glødende slagg i kastebaner */}
      <path d={`M 146 ${top + 8} Q 150 ${top - 30} 154 ${top + 8} Z`} fill={`url(#${id}-lava)`} opacity="0.95" />
      {bombs.map(([dx, h, r], i) => (
        <g key={i}>
          <path d={`M 150 ${top} Q ${150 + dx * 0.5} ${top - h * 1.6} ${150 + dx} ${top - h * 0.6}`} fill="none" stroke="#ffb020" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx={150 + dx} cy={top - h * 0.6} r={r} fill={i % 2 ? "#ff7a18" : "#ffc04d"} />
        </g>
      ))}
      <L x="304" y="160" size={11} fill={C.muted} anchor="end">
        Uten overhøyde
      </L>
    </svg>
  );
}

export function VolcanoTypesDiagram({ geografi = false, selected }: { geografi?: boolean; selected?: "shield" | "stratovolcano" } = {}) {
  return (
    <FigureFrame
      heading={geografi ? "To vulkantyper: form og oppbygning" : "Magmakjemi avgjør form og eksplosivitet"}
      caption={geografi ? "Forenklede skisser uten målestokk. Skjoldvulkaner bygges hovedsakelig av lettflytende lava; stratovulkaner har lag av lava og oppstykket materiale. Form alene avgjør ikke neste utbrudd eller sikker avstand (USGS, u.å.-f)." : "Tre hovedtyper: skjoldvulkan, stratovulkan og sinderkjegle. Skjoldvulkanen bygges av tynne lavadekker. Stratovulkanen er lagdelt, med vekslende lava og aske/tefra. Sinderkjeglen er en mindre haug av slagg og sinder. Profilene er tegnet uten overhøyde, men de tre vulkanene er ikke i samme målestokk."}
    >
      <div data-figure="vulkantyper" className={`grid grid-cols-1 gap-4 ${selected ? "" : geografi ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
        {(!selected || selected === "shield") && <article className="flex flex-col gap-3 rounded-xl border border-border bg-[#10181e] p-3">
          <div>
            <h3 className="text-base font-semibold text-[#e0b48a]">Skjoldvulkan</h3>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              {geografi ? "Relativt lettflytende lava kan bre seg utover." : "Effusive utbrudd. Basaltisk lava med lav viskositet."}
            </p>
          </div>
          <ShieldProfileSvg geografi={geografi} />
          <FactList
            rows={geografi ? [["Form", "Bred og slak."], ["Oppbygning", "Mange lag relativt lettflytende lava."], ["Forbehold", "Utbrudd kan fortsatt true mennesker og infrastruktur."]] : [
              ["Helning", "Slak, ofte 2° til 10°"],
              ["Mekanisme", "Lavaen kan renne langt før den størkner. Vulkanen bygges av mange tynne lavadekker."],
              ["Eksempler", "Mauna Loa og Kilauea på Hawaii"],
            ]}
          />
        </article>}

        {(!selected || selected === "stratovolcano") && <article className="flex flex-col gap-3 rounded-xl border border-border bg-[#10181e] p-3">
          <div>
            <h3 className="text-base font-semibold text-[#d07a7a]">Stratovulkan</h3>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              {geografi ? "Vanligvis bratt form med lag av ulike utbruddsmaterialer." : "Bratt kjegle. Seig magma som sjelden flyter langt."}
            </p>
          </div>
          <StratoProfileSvg geografi={geografi} />
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-snug text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-sm bg-[#4c4641]" />
              {geografi ? "Lava" : "Størknet lava"}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-sm bg-[#7a6d5c]" />
              {geografi ? "Oppstykket materiale" : "Aske/tefra"}
            </li>
            <li>Grå sky: askesøyle</li>
            <li>Lagene heller utover parallelt med flankene</li>
            {!geografi && <li>Stiplet rød: pyroklastisk strøm</li>}
          </ul>
          <FactList
            rows={geografi ? [["Form", "Vanligvis en brattere kjegle."], ["Oppbygning", "Lag av størknet lava og oppstykket vulkansk materiale."], ["Forbehold", "Vulkantypen alene forutsier ikke et bestemt utbrudd."]] : [
              ["Helning", "Bratt, ofte 25° til 35°"],
              ["Lag", "Vekslende størknet seig lava, aske, pimpstein og tefra"],
              ["Eksempler", "Fuji, Vesuv, Mount St. Helens, Pinatubo og Beerenberg på Jan Mayen"],
            ]}
          />
        </article>}

        {!geografi && <article className="flex flex-col gap-3 rounded-xl border border-border bg-[#10181e] p-3">
          <div>
            <h3 className="text-base font-semibold text-[#f0c9a0]">Sinderkjegle</h3>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Mindre, bratt haug med krater i toppen.
            </p>
          </div>
          <CinderProfileSvg />
          <FactList
            rows={[
              ["Høyde", "Sjelden over 300–400 meter"],
              ["Mekanisme", "Korte, gassdrevne utbrudd. Lavafontener kaster slagg og sinder. Fragmentene størkner i flukten og danner en bratt haug rundt åpningen."],
              ["Eksempel", "Parícutin i Mexico vokste opp på en åker i 1943"],
            ]}
          />
        </article>}
      </div>
    </FigureFrame>
  );
}

const CALDERA_STEPS = ["1 Oppbuling", "2 Ringutbrudd", "3 Kollaps", "4 Kratersjø"];

const CAL_G = 172;
const CAL_RING_L = 248;
const CAL_RING_R = 512;
const CAL_EDIFICE: ProfileSpec = { kind: "strato", cx: 380, baseY: CAL_G, height: 72, crater: 8, craterDepth: 3, halfWidth: 8 + 72 / 0.377 };

function calBulge(x: number, amp: number) {
  const dx = Math.abs(x - 380);
  if (dx > 300 || amp === 0) return 0;
  return amp * Math.pow(Math.cos((Math.PI * dx) / 600), 2);
}

/** Overflaten (bakke og vulkan) som polygon ned til bunnen av figuren. */
function calSurface(amp: number, bottom = 420) {
  const pts: string[] = [];
  for (let x = 0; x <= 760; x += 4) {
    const y = (surfaceY(CAL_EDIFICE, x) ?? CAL_G) - calBulge(x, amp);
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")} L 760 ${bottom} L 0 ${bottom} Z`;
}

function CalderaCrust({ id, clipKey = id, amp }: { id: string; clipKey?: string; amp: number }) {
  const surface = calSurface(amp);
  return (
    <>
      <defs>
        <clipPath id={`${clipKey}-surf`}>
          <path d={surface} />
        </clipPath>
      </defs>
      <path d={surface} fill={`url(#${id}-crust)`} />
      <g clipPath={`url(#${clipKey}-surf)`}>
        {/* Eldre lag i skorpen under vulkanen */}
        {[204, 236, 270, 352, 388].map((y, i) => (
          <path key={y} d={`M 0 ${y} Q 380 ${y - calBulge(380, amp) * (1 - i * 0.15)} 760 ${y}`} fill="none" stroke="#4a3f35" strokeWidth="1" opacity="0.7" />
        ))}
        <rect width="760" height="420" fill={`url(#${id}-speckle)`} />
        <g transform={`translate(0 ${-calBulge(380, amp).toFixed(1)})`}>
          <LayeredCone spec={CAL_EDIFICE} colors={STRATO_LAYERS} layers={7} clipId={`${clipKey}-cone`} />
        </g>
      </g>
      <path d={surface.replace(/ L 760 420 L 0 420 Z$/, "")} fill="none" stroke="#7a6c5c" strokeWidth="1.2" />
    </>
  );
}

export function CalderaFormationDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(4, playing, 3200);
  const id = useId().replace(/:/g, "");
  const rimL = surfaceY(CAL_EDIFICE, CAL_RING_L) ?? CAL_G;
  const rimR = surfaceY(CAL_EDIFICE, CAL_RING_R) ?? CAL_G;
  const drop = 64;
  // Brudd i det nedsunkne taket: skrå blokker.
  const floor = `M ${CAL_RING_L} ${CAL_G + drop - 6} L 290 ${CAL_G + drop + 4} L 330 ${CAL_G + drop - 8} L 372 ${CAL_G + drop + 2} L 420 ${CAL_G + drop - 10} L 468 ${CAL_G + drop} L ${CAL_RING_R} ${CAL_G + drop - 7}`;

  return (
    <Diagram
      title="Dannelse av en kaldera i fire trinn"
      heading="Kaldera i fire trinn"
      caption="En kaldera er en innsynkning, ikke bare et krater. Den oppstår når et magmakammer tømmes så raskt at taket over kammeret faller ned. Kalderaer er ofte 5–50 km brede. Crater Lake og Santorini er noen kilometer brede. Toba og Yellowstone er titalls kilometer. Vulkaner som har hatt et superutbrudd (VEI 8), kalles ofte supervulkaner. Tverrsnittet er skjematisk og ikke i målestokk."
      viewBox="0 0 760 420"
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={CALDERA_STEPS} step={step} onStep={setStep} />
          <span className="text-xs text-muted-foreground">
            {playing ? CALDERA_STEPS[step - 1] : "Pause stopper på valgt trinn"}
          </span>
        </>
      }
    >
      {() => (
        <>
          <style>{`
            .cald-col { transform-box: fill-box; transform-origin: center bottom; }
            .motion-unlocked .cald-col {
              animation: cald-col 2.4s ease-in-out infinite;
            }
            @keyframes cald-col {
              0%, 100% { transform: scaleY(0.92); }
              50% { transform: scaleY(1.04); }
            }
          `}</style>
          <VolcArtDefs id={id} />
          <defs>
            <clipPath id={`${id}-in`}>
              <rect x={CAL_RING_L} y="0" width={CAL_RING_R - CAL_RING_L} height="420" />
            </clipPath>
            <clipPath id={`${id}-out`}>
              <path d={`M 0 0 H ${CAL_RING_L} V 420 H 0 Z M ${CAL_RING_R} 0 H 760 V 420 H ${CAL_RING_R} Z`} />
            </clipPath>
          </defs>
          <rect width="760" height="420" fill={`url(#${id}-sky)`} rx="10" />
          <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-step={step}>
            <L x="380" y="28" anchor="middle" size={15} weight={700} fill={C.teal}>
              {step === 1
                ? "1. Magma fyller kammeret og bakken buler"
                : step === 2
                  ? "2. Ringutbrudd tømmer kammeret"
                  : step === 3
                    ? "3. Taket faller ned"
                    : "4. Senkning med kratersjø og oppadstigende kuppel"}
            </L>
            <L x="744" y="408" anchor="end" size={11} fill={C.muted}>
              Skjematisk, ikke i målestokk
            </L>

            {step === 1 ? (
              <g data-caldera-step="1">
                <CalderaCrust id={id} amp={12} />
                <ellipse cx="380" cy="308" rx="200" ry="70" fill={`url(#${id}-halo)`} />
                <ellipse cx="380" cy="310" rx="168" ry="46" fill={`url(#${id}-chamber)`} stroke="#5c1a08" strokeWidth="1" />
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <circle key={n} cx={290 + n * 30} cy={300 + (n % 2) * 14} r={2.4 + (n % 3)} fill="#fff3d6" opacity="0.7" />
                ))}
                <line x1={CAL_RING_L} y1={rimL - 9} x2={CAL_RING_L + 2} y2="282" stroke={C.low} strokeDasharray="4 3" strokeWidth="1.6" />
                <line x1={CAL_RING_R} y1={rimR - 9} x2={CAL_RING_R - 2} y2="282" stroke={C.low} strokeDasharray="4 3" strokeWidth="1.6" />
                <path d="M 380 236 V 190" stroke={C.warm} strokeWidth="2" markerEnd="none" />
                <path d="M 373 198 L 380 188 L 387 198" fill="none" stroke={C.warm} strokeWidth="2" />
                <L x="380" y="304" anchor="middle" size={14} weight={700} fill="#1a0c08">
                  Gassrik felsisk magma
                </L>
                <L x="380" y="324" anchor="middle" size={13} weight={600} fill="#1a0c08">
                  under høyt trykk
                </L>
                <L x="380" y="62" anchor="middle" size={13} fill={C.fg}>
                  Ringforkastninger dannes under strekk
                </L>
              </g>
            ) : null}

            {step === 2 ? (
              <g data-caldera-step="2">
                <CalderaCrust id={id} amp={6} />
                {/* Delvis tømt kammer: gassfylt tak, smelte nederst */}
                <ellipse cx="380" cy="310" rx="168" ry="46" fill="#2a1812" stroke={C.warm} strokeDasharray="5 3" />
                <path d="M 220 322 Q 380 300 540 322 Q 520 352 380 356 Q 240 352 220 322 Z" fill={`url(#${id}-chamber)`} />
                {/* Magma stiger i ringgangene */}
                <path d={`M ${CAL_RING_L - 1} 290 L ${CAL_RING_L - 1} ${rimL - 5}`} stroke="#ff8a2a" strokeWidth="4" />
                <path d={`M ${CAL_RING_R + 1} 290 L ${CAL_RING_R + 1} ${rimR - 5}`} stroke="#ff8a2a" strokeWidth="4" />
                <g className={playing ? "cald-col" : undefined}>
                  <BillowColumn x0={CAL_RING_L} y0={rimL - 8} x1={CAL_RING_L - 18} y1={78} r0={7} r1={30} count={14} fill={`url(#${id}-ash)`} shade="#3b3631" seed={11} />
                  <path d={`M ${CAL_RING_L - 5} ${rimL} Q ${CAL_RING_L} ${rimL - 40} ${CAL_RING_L + 5} ${rimL}`} fill={`url(#${id}-lava)`} />
                </g>
                <g className={playing ? "cald-col" : undefined}>
                  <BillowColumn x0={CAL_RING_R} y0={rimR - 8} x1={CAL_RING_R + 18} y1={78} r0={7} r1={30} count={14} fill={`url(#${id}-ash)`} shade="#3b3631" seed={23} />
                  <path d={`M ${CAL_RING_R - 5} ${rimR} Q ${CAL_RING_R} ${rimR - 40} ${CAL_RING_R + 5} ${rimR}`} fill={`url(#${id}-lava)`} />
                </g>
                {/* Pyroklastiske strømmer renner ned flankene */}
                <path d={`M ${CAL_RING_L - 20} ${rimL + 2} Q 170 168 90 ${CAL_G - 2} L 70 ${CAL_G} L ${CAL_RING_L - 10} ${rimL + 6} Z`} fill={`url(#${id}-pdc)`} opacity="0.85" />
                <path d={`M ${CAL_RING_R + 20} ${rimR + 2} Q 590 168 670 ${CAL_G - 2} L 690 ${CAL_G} L ${CAL_RING_R + 10} ${rimR + 6} Z`} fill={`url(#${id}-pdc)`} opacity="0.85" />
                <L x="380" y="340" anchor="middle" size={13} weight={700} fill="#1a0c08">
                  Kammeret tømmes
                </L>
                <L x="380" y="398" anchor="middle" size={13} fill={C.fg}>
                  Askesøyler langs ringforkastningene
                </L>
              </g>
            ) : null}

            {step >= 3 ? (
              <g data-caldera-step={step}>
                {/* Utenfor ringen står vulkanflankene igjen */}
                <g clipPath={`url(#${id}-out)`}>
                  <CalderaCrust id={id} clipKey={`${id}o`} amp={0} />
                  {/* Utstrømningsavsetninger (ignimbritt) på flankene */}
                  <path d={surfacePath(CAL_EDIFICE)} fill="none" stroke="#c9b2a0" strokeWidth="3" opacity="0.75" />
                </g>
                {/* Innenfor ringen har taket sunket ned som et stempel */}
                <g clipPath={`url(#${id}-in)`}>
                  {step === 4 ? <rect x={CAL_RING_L} y="192" width={CAL_RING_R - CAL_RING_L} height="80" fill={`url(#${id}-water)`} /> : null}
                  <rect x={CAL_RING_L} y={step === 4 ? 226 : 206} width={CAL_RING_R - CAL_RING_L} height="60" fill="#b39a86" />
                  <rect x={CAL_RING_L} y={step === 4 ? 226 : 206} width={CAL_RING_R - CAL_RING_L} height="60" fill={`url(#${id}-speckle)`} />
                  <path d={`${floor} L ${CAL_RING_R} 420 L ${CAL_RING_L} 420 Z`} fill={`url(#${id}-crust)`} />
                  <path d={`${floor} L ${CAL_RING_R} 420 L ${CAL_RING_L} 420 Z`} fill={`url(#${id}-speckle)`} />
                  {[CAL_G + drop + 30, CAL_G + drop + 64, CAL_G + drop + 98].map((y) => (
                    <path key={y} d={`M ${CAL_RING_L} ${y} H ${CAL_RING_R}`} stroke="#4a3f35" strokeWidth="1" opacity="0.7" />
                  ))}
                  <path d={floor} fill="none" stroke="#7a6c5c" strokeWidth="1.2" />
                </g>
                {step === 3 ? (
                  <>
                    <ellipse cx="380" cy="352" rx="150" ry="16" fill={`url(#${id}-chamber)`} opacity="0.9" />
                    <line x1={CAL_RING_L} y1={rimL - 6} x2={CAL_RING_L} y2="360" stroke={C.low} strokeWidth="2" strokeDasharray="5 3" />
                    <line x1={CAL_RING_R} y1={rimR - 6} x2={CAL_RING_R} y2="360" stroke={C.low} strokeWidth="2" strokeDasharray="5 3" />
                    <path d="M 380 262 V 300" stroke={C.low} strokeWidth="2" />
                    <path d="M 373 292 L 380 302 L 387 292" fill="none" stroke={C.low} strokeWidth="2" />
                    <L x="380" y="192" anchor="middle" size={14} weight={700} fill={C.fg}>
                      Taket faller ned
                    </L>
                    <L x="380" y="226" anchor="middle" size={12} weight={600} fill="#2a1f18">
                      Aske og pimpstein fyller senkningen
                    </L>
                    <path d={`M ${CAL_RING_L} 96 H ${CAL_RING_R}`} stroke={C.sand} strokeWidth="1.2" />
                    <path d={`M ${CAL_RING_L} 90 V 102 M ${CAL_RING_R} 90 V 102`} stroke={C.sand} strokeWidth="1.2" />
                    <L x="380" y="88" anchor="middle" size={13} fill={C.sand}>
                      Ofte 5–50 km bred
                    </L>
                  </>
                ) : (
                  <>
                    <line x1={CAL_RING_L} y1={rimL - 6} x2={CAL_RING_L} y2="360" stroke={C.low} strokeWidth="1.4" strokeDasharray="5 3" opacity="0.6" />
                    <line x1={CAL_RING_R} y1={rimR - 6} x2={CAL_RING_R} y2="360" stroke={C.low} strokeWidth="1.4" strokeDasharray="5 3" opacity="0.6" />
                    {/* Ny magma og en kuppel som løfter seg i sjøen */}
                    <ellipse cx="390" cy="338" rx="110" ry="30" fill={`url(#${id}-halo)`} />
                    <ellipse cx="390" cy="338" rx="92" ry="22" fill={`url(#${id}-chamber)`} />
                    <path d="M 420 318 L 424 214" stroke="#ff8a2a" strokeWidth="3" />
                    <path d="M 390 228 Q 404 186 424 182 Q 444 186 458 228 Z" fill="#4d443d" stroke={C.warm} strokeWidth="1.2" />
                    <path d="M 404 200 Q 424 192 444 200" fill="none" stroke="#ff8a2a" strokeWidth="1" opacity="0.7" />
                    <path d={`M ${CAL_RING_L} 192 H ${CAL_RING_R}`} stroke="#8ec9e8" strokeWidth="1" opacity="0.8" />
                    <L x="310" y="214" anchor="middle" size={13} weight={700} fill="#e0f2fe">
                      Kratersjø
                    </L>
                    <L x="424" y="170" anchor="middle" size={13} weight={700} fill={C.sand}>
                      Oppadstigende kuppel
                    </L>
                    <L x="390" y="342" anchor="middle" size={12} weight={700} fill="#1a0c08">
                      Ny magma stiger
                    </L>
                  </>
                )}
              </g>
            ) : null}
          </g>
        </>
      )}
    </Diagram>
  );
}

const PLIN_CONE: ProfileSpec = { kind: "strato", cx: 470, baseY: 372, height: 122, crater: 20, craterDepth: 6, halfWidth: 20 + 122 / 0.4 };

export function VolcanoEruptionAnatomyDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const id = useId().replace(/:/g, "");
  const top = PLIN_CONE.baseY - PLIN_CONE.height;
  const { left, right } = flankPoints(PLIN_CONE, 30);
  // Laharen følger en dal ned høyre flanke og ut på sletta.
  const laharPts = right.filter((_, i) => i >= 10).map(([x, y]) => [x, y - 3] as const);
  const laharBack = right.filter((_, i) => i >= 10).map(([x, y]) => [x, y + 6] as const).reverse();
  const lahar = `M ${laharPts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")} L 884 368 L 884 380 L ${laharBack.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")} Z`;
  const pdcStart = left[22];
  return (
    <Diagram
      title="Pliniansk utbrudd med paraplysky og pyroklastisk tetthetsstrøm"
      heading="Pliniansk søyle"
      caption="Fragmenteringsnivået ligger i tilførselsrøret, der trykket i gassboblene river smelten i stykker. Like over krateret skyver gassen blandingen ut. Søylen suger inn luft og stiger. Når den ikke stiger lenger, brer asken seg ut som en paraplysky. Blir søylen for tung, faller den ned som en pyroklastisk tetthetsstrøm. En lahar er aske, stein og vann i en dal. Skjematisk, ikke i målestokk."
      viewBox="0 0 900 500"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
    >
      {(m) => (
        <>
          <style>{`
            .plin-col, .plin-umb, .plin-pdc { transform-box: fill-box; }
            .plin-col { transform-origin: center bottom; }
            .plin-umb { transform-origin: center center; }
            .plin-pdc { transform-origin: right top; }
            .motion-unlocked .plin-col { animation: plin-col 3.4s ease-in-out infinite; }
            .motion-unlocked .plin-umb { animation: plin-umb 3.4s ease-out infinite; }
            .motion-unlocked .plin-pdc { animation: plin-pdc 3.4s ease-out infinite; }
            @keyframes plin-col {
              0% { transform: scaleY(0.2); opacity: 0.35; }
              42%, 100% { transform: scaleY(1); opacity: 1; }
            }
            @keyframes plin-umb {
              0%, 28% { transform: scaleX(0.08); opacity: 0; }
              62%, 100% { transform: scaleX(1); opacity: 1; }
            }
            @keyframes plin-pdc {
              0%, 48% { transform: scale(0.2); opacity: 0; }
              78%, 100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
          <VolcArtDefs id={id} />
          <defs>
            <linearGradient id={`${id}-strat`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a1220" />
              <stop offset="1" stopColor="#101c2b" />
            </linearGradient>
            <linearGradient id={`${id}-fall`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b8378" stopOpacity="0.55" />
              <stop offset="1" stopColor="#8b8378" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${id}-jet`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#ffb347" />
              <stop offset="0.35" stopColor="#c9864f" />
              <stop offset="1" stopColor="#8f877c" />
            </linearGradient>
            <linearGradient id={`${id}-mix`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#ff7a1a" />
              <stop offset="1" stopColor="#b98a66" />
            </linearGradient>
          </defs>
          <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figure="pliniansk">
            <rect x="16" y="16" width="868" height="356" fill={`url(#${id}-sky)`} rx="8" />
            <rect x="16" y="16" width="868" height="80" fill={`url(#${id}-strat)`} rx="8" />
            <line x1="16" y1="96" x2="884" y2="96" stroke={C.dim} strokeDasharray="4 4" />
            <L x="28" y="40" size={12} fill={C.muted}>
              Stratosfære
            </L>
            <L x="28" y="118" size={12} fill={C.muted}>
              Troposfære
            </L>

            {/* Askenedfall: slør under paraplyskya */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <path key={n} d={`M ${600 + n * 30} 76 L ${640 + n * 32} ${300 - (n % 3) * 30}`} stroke={`url(#${id}-fall)`} strokeWidth={10 + (n % 3) * 4} strokeLinecap="round" opacity="0.7" />
            ))}

            {/* Skorpe og vulkan */}
            <rect x="16" y="372" width="868" height="98" fill={`url(#${id}-crust)`} />
            <rect x="16" y="372" width="868" height="98" fill={`url(#${id}-speckle)`} />
            <LayeredCone spec={PLIN_CONE} colors={STRATO_LAYERS} layers={9} clipId={`${id}-cone`} />
            <path d={surfacePath(PLIN_CONE)} fill="none" stroke="#7a6c5c" strokeWidth="1.4" />

            <ellipse cx="470" cy="432" rx="110" ry="34" fill={`url(#${id}-halo)`} />
            <ellipse cx="470" cy="430" rx="80" ry="24" fill={`url(#${id}-chamber)`} stroke="#5c1a08" />
            <L x="470" y="434" anchor="middle" size={12} weight={700} fill="#1a0c08">
              Magmakammer
            </L>

            {/* Tilførselsrør: smelte under fragmenteringsnivået, gass og fragmenter over */}
            <path d={`M 462 408 L 460 334 L 480 334 L 478 408 Z`} fill={`url(#${id}-lava)`} />
            <path d={`M 460 334 L 458 ${top + 4} L 482 ${top + 4} L 480 334 Z`} fill={`url(#${id}-mix)`} />
            {[0, 1, 2, 3, 4].map((n) => (
              <circle key={n} cx={463 + (n % 3) * 7} cy={350 + n * 10} r={1.8 + (n % 2)} fill="#fff3d6" opacity="0.8" />
            ))}
            <path d="M 456 318 L 484 318 L 484 334 L 456 334 Z" fill={C.sand} opacity="0.9" />
            <line x1="456" y1="326" x2="210" y2="326" stroke={C.sand} strokeWidth="1.4" />
            <rect x="16" y="300" width="188" height="42" rx="5" fill="#14110c" opacity="0.94" />
            <L x="26" y="318" size={13} weight={700} fill={C.sand}>
              Fragmenteringsnivå
            </L>
            <L x="26" y="334" size={12} fill={C.muted}>
              i tilførselsrøret
            </L>

            {/* Gass-skyvesonen: en smal, varm stråle like over krateret */}
            <path d={`M 456 ${top + 2} C 452 230, 446 214, 440 200 L 500 200 C 494 214, 488 230, 484 ${top + 2} Z`} fill={`url(#${id}-jet)`} />
            <line x1="304" y1="232" x2="438" y2="226" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <L x="300" y="236" anchor="end" size={13} weight={700} fill="#f59e0b">
              Gass-skyvesone
            </L>

            {/* Konvektiv søyle med blomkålform */}
            <g className={playing ? "plin-col" : undefined}>
              <BillowColumn x0={470} y0={206} x1={474} y1={92} r0={26} r1={74} count={12} fill={`url(#${id}-ash)`} shade="#4a443e" seed={5} />
            </g>
            <g className={playing ? "plin-umb" : undefined}>
              <BillowSheet cx={480} cy={62} halfWidth={300} thickness={28} fill={`url(#${id}-ash)`} shade="#4a443e" seed={9} count={34} />
              <L x="470" y="66" anchor="middle" size={15} weight={700} fill="#f8fafc">
                Paraplysky
              </L>
            </g>
            <Arrow d="M 372 196 L 372 132" marker={m.cold} color={C.cold} width={2.2} />
            <L x="362" y="160" anchor="end" size={13} weight={700} fill={C.cold}>
              Oppdrift
            </L>

            {/* Pyroklastisk tetthetsstrøm som raser ned venstre flanke */}
            <g className={playing ? "plin-pdc" : undefined}>
              <BillowColumn x0={pdcStart[0] + 8} y0={pdcStart[1] - 12} x1={150} y1={352} r0={16} r1={36} count={18} fill={`url(#${id}-pdc)`} shade="#4a3429" seed={17} />
            </g>
            <rect x="24" y="168" width="214" height="36" rx="5" fill="#140c10" opacity="0.92" />
            <L x="36" y="184" size={12} weight={700} fill={C.low}>
              Pyroklastisk tetthetsstrøm
            </L>
            <L x="36" y="198" size={11} fill={C.muted}>
              ofte over 80 km/t
            </L>

            {/* Lahar i en dal på høyre flanke */}
            <path d={lahar} fill="#8a7862" stroke="#5a4c3d" strokeWidth="1" />
            <path d={lahar} fill={`url(#${id}-speckle)`} />
            <rect x="690" y="390" width="150" height="28" rx="5" fill="#14110e" opacity="0.92" />
            <L x="765" y="408" anchor="middle" size={12} weight={700} fill={C.sand}>
              Lahar (slamstrøm)
            </L>
            <L x="790" y="160" size={12} fill={C.fg}>
              Askenedfall
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

function HazardIcon({ kind }: { kind: "pdc" | "lahar" | "ash" | "winter" }) {
  const stroke = kind === "pdc" ? C.low : kind === "lahar" ? C.sand : kind === "ash" ? C.rain : C.teal;
  return (
    <svg viewBox="0 0 48 48" className="size-10 shrink-0" aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#0f171c" stroke={stroke} />
      {kind === "pdc" ? (
        <>
          <path d="M8 34 H40 L30 18 H16 Z" fill={stroke} opacity="0.85" />
          <path d="M14 34 L22 22" stroke="#fff" strokeWidth="1.6" />
        </>
      ) : null}
      {kind === "lahar" ? (
        <>
          <path d="M6 16 L18 40 H42 L30 16 Z" fill="none" stroke={stroke} strokeWidth="1.6" />
          <path d="M14 30 H34" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      {kind === "ash" ? (
        <>
          <circle cx="16" cy="16" r="3" fill={stroke} />
          <circle cx="30" cy="14" r="2.2" fill={stroke} />
          <circle cx="24" cy="26" r="2.6" fill={stroke} />
          <circle cx="34" cy="30" r="2" fill={stroke} />
          <path d="M10 38 H38" stroke={stroke} strokeWidth="1.6" />
        </>
      ) : null}
      {kind === "winter" ? (
        <>
          <circle cx="16" cy="18" r="6" fill="#f3f6f8" />
          <path d="M28 14 H42 M30 20 H42 M28 26 H40" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 38 H40" stroke={C.cold} strokeWidth="1.6" />
        </>
      ) : null}
    </svg>
  );
}

const HAZARDS: {
  kind: "pdc" | "lahar" | "ash" | "winter";
  title: string;
  points: string[];
  example: string;
}[] = [
  {
    kind: "pdc",
    title: "1. Pyroklastisk strøm",
    points: [
      "Varm blanding av gass, pimpstein og stein, også kalt en glødende askesky.",
      "Fart vanligvis over 80 km/t. Temperatur vanligvis 200–700 °C.",
      "Oppstår når deler av askesøylen blir for tung og faller ned langs siden.",
    ],
    example: "Mont Pelée, Saint-Pierre 1902: ca. 26 000–28 000 døde. Bare to inne i byen overlevde. Pompeii i år 79 e.Kr.",
  },
  {
    kind: "lahar",
    title: "2. Lahar",
    points: [
      "Blanding av vulkansk aske, stein og vann som følger elvedaler.",
      "Kan starte når varm tefra smelter snø og is, eller når regn vasker løs fersk aske.",
      "Blandingen er tykk, omtrent som våt betong.",
    ],
    example: "Armero 1985: Nevado del Ruiz. Laharene nådde Armero, ca. 45 km fra vulkanen. Over 23 000 mennesker mistet livet.",
  },
  {
    kind: "ash",
    title: "3. Askenedfall og luftfart",
    points: [
      "Finkornet aske kan sveve langt. Mye av den kan være mindre enn 10 mikrometer.",
      "Silikatglass smelter ved om lag 1100 °C. Forbrenningskamre kan bli 1400–1700 °C.",
      "Glasset kan størkne på turbinbladene, slik at motoren stanser.",
    ],
    example: "Eyjafjallajökull 2010 (VEI 4): over 100 000 flygninger kansellert, 10 millioner reisende ble stående igjen.",
  },
  {
    kind: "winter",
    title: "4. Vulkansk vinter",
    points: [
      "Grov aske faller ut i løpet av dager og uker. SO₂ kan bli værende i stratosfæren.",
      "SO₂ reagerer med vanndamp og danner dråper av svovelsyre (H₂SO₄).",
      "Dråpene sprer sollys, og mindre sol når bakken.",
    ],
    example: "Tambora 1815 (VEI 7): 1816 kalles «året uten sommer». Pinatubo 1991: kjøling i om lag tre år, ca. 0,5 °C i snitt og inntil ca. 0,7 °C på det meste.",
  },
];

// Vg1: samme kortkomponent, men uten G1-historikk, fartstall eller kjemiske detaljer.
const GEOGRAFI_HAZARDS: typeof HAZARDS = [
  { kind: "pdc", title: "1. Lava", points: ["Smeltet stein strømmer over bakken.", "Lava kan begrave eller sette fyr på bygninger og vegetasjon."], example: "Kilde: U.S. Geological Survey (u.å.-a)." },
  { kind: "pdc", title: "2. Pyroklastisk strøm", points: ["En varm blanding av gass, aske og stein beveger seg langs bakken.", "Strømmen kan ødelegge store områder rundt vulkanen."], example: "Kilde: Newhall et al. (1997)." },
  { kind: "ash", title: "3. Aske", points: ["Aske kan spres langt med vinden.", "Asken kan skade bygninger, jordbruk og flytrafikk."], example: "Kilde: Newhall et al. (1997)." },
  { kind: "lahar", title: "4. Lahar", points: ["En lahar er en strøm av vann og vulkansk materiale.", "Regn kan sette avsatt aske i bevegelse også etter selve utbruddet."], example: "Kilde: Newhall et al. (1997)." },
  { kind: "ash", title: "5. Gass", points: ["Noen vulkanske gasser kan skade mennesker, dyr og vegetasjon.", "Gassfare må vurderes av fagfolk, ikke ut fra lukt eller avstand alene."], example: "Kilde: U.S. Geological Survey (u.å.-b)." },
];

export function VolcanicHazardsDiagram({ geografi = false }: { geografi?: boolean } = {}) {
  return (
    <FigureFrame
      heading={geografi ? "Figur 6.3: Fem vulkanske farer" : "Fire vulkanske farer"}
      caption={geografi ? "En oversikt over mulige farer, ikke et kart over sikker avstand. Ulike utbrudd gir ulike kombinasjoner av farer (Newhall et al., 1997; U.S. Geological Survey, u.å.-a, u.å.-b)." : "Lavastrømmer beveger seg ofte sakte nok til at folk kan komme seg unna. Kapitlet beskriver pyroklastiske strømmer, laharer, aske som truer luftfarten, og vulkansk vinter. Tsunami som egen vulkansk fare står ikke i dette kapitlet."}
    >
      <div data-figure="farer" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(geografi ? GEOGRAFI_HAZARDS : HAZARDS).map((hazard) => (
          <article key={hazard.title} className="rounded-xl border border-border bg-[#12181e] p-4">
            <div className="flex items-start gap-3">
              <HazardIcon kind={hazard.kind} />
              <h3 className="text-base font-semibold leading-snug text-foreground">{hazard.title}</h3>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground/95">
              {hazard.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hazard.example}</p>
          </article>
        ))}
      </div>
    </FigureFrame>
  );
}

const MAGMA_ROWS: { name: string; sio2: string; temp: string; visc: string; gas: string; style: string; place: string }[] = [
  {
    name: "Basaltisk (mafisk)",
    sio2: "45–52 %",
    temp: "1050–1200 °C",
    visc: "Lav",
    gas: "Boblene stiger og slipper ut",
    style: "Rolig (effusiv)",
    place: "Midthavsrygg, Island, Hawaii",
  },
  {
    name: "Andesittisk (intermediær)",
    sio2: "52–63 %",
    temp: "850–1050 °C",
    visc: "Middels",
    gas: "Seig magma holder på gassen",
    style: "Eksplosiv til sammensatt",
    place: "Subduksjonssoner",
  },
  {
    name: "Ryolittisk/dasittisk (felsisk)",
    sio2: "> 63 % (opptil 75 %)",
    temp: "700–850 °C",
    visc: "Høy",
    gas: "Boblene slipper ikke ut",
    style: "Svært eksplosiv",
    place: "Kontinentalskorpe, store kalderaer",
  },
];

function BubbleConduit({
  level,
  mode,
}: {
  level: number;
  mode: "fluid" | "viscous";
}) {
  const top = 46;
  const bottom = 236;
  const bubbles = Array.from({ length: 8 }, (_, index) => {
    const t = index / 7;
    const y = bottom - t * (bottom - top);
    const reached = level / 100 + 0.04 >= t;
    const radius = reached ? 2.4 + (t * level) / 16 : 1.7;
    return { y, radius, t };
  });
  const cracking = mode === "viscous" && level > 68;
  const escaping = mode === "fluid" && level > 55;
  const melt = mode === "fluid" ? "#e0894a" : "#c2413b";
  const cid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 220 280" className="mx-auto h-auto w-full max-w-xs" role="img" aria-label={mode === "fluid" ? "Lettflytende magma" : "Seig magma"}>
      <VolcArtDefs id={cid} />
      <defs>
        <linearGradient id={`${cid}-melt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={mode === "fluid" ? "#ffb347" : "#e0603a"} />
          <stop offset="1" stopColor={mode === "fluid" ? "#c2410c" : "#7f1d1d"} />
        </linearGradient>
        <linearGradient id={`${cid}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a322b" />
          <stop offset="0.85" stopColor="#2b241f" />
          <stop offset="1" stopColor="#5a2a14" />
        </linearGradient>
        <linearGradient id={`${cid}-wallR`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#3a322b" />
          <stop offset="0.85" stopColor="#2b241f" />
          <stop offset="1" stopColor="#5a2a14" />
        </linearGradient>
      </defs>
      <rect width="220" height="280" fill={`url(#${cid}-sky)`} rx="8" />
      {/* Sidebergarten rundt tilførselsrøret */}
      <path d="M 0 52 H 86 L 96 250 H 0 Z" fill={`url(#${cid}-wall)`} />
      <path d="M 220 52 H 134 L 124 250 H 220 Z" fill={`url(#${cid}-wallR)`} />
      <rect x="0" y="52" width="220" height="198" fill={`url(#${cid}-speckle)`} />
      <L x="110" y="22" anchor="middle" size={12} fill={C.muted}>
        {level < 34 ? "Høyt trykk" : level < 68 ? "Trykket faller" : "Lavt trykk"}
      </L>
      <path d="M96 250 L88 52 H132 L124 250 Z" fill={`url(#${cid}-melt)`} stroke={melt} strokeOpacity="0.5" />
      <path d="M 0 52 H 84 Q 110 60 136 52 H 220" fill="none" stroke="#7a6c5c" strokeWidth="1.2" />
      {bubbles.map((bubble) => (
        <circle key={bubble.y} cx="110" cy={bubble.y} r={bubble.radius} fill="#f8fafc" opacity={mode === "viscous" ? 0.95 : 0.8} />
      ))}
      {escaping
        ? [0, 1, 2].map((n) => (
            <circle key={n} cx={100 + n * 10} cy={28 - n * 4} r={3 + level / 40} fill="#f8fafc" opacity="0.75" />
          ))
        : null}
      {cracking ? <path d="M96 58 L110 40 L124 58" fill="none" stroke="#f8fafc" strokeWidth="1.6" /> : null}
      <L x="110" y="270" anchor="middle" size={12} fill={C.muted}>
        {mode === "fluid" ? "Boblene slipper ut" : "Boblene blir værende"}
      </L>
    </svg>
  );
}

export function MagmaViscosityDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [level, setLevel] = useState(72);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setLevel((current) => (current >= 100 ? 6 : current + 4));
    }, 220);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <FigureFrame
      heading="Magmatyper, viskositet og gassbobler"
      caption="Mer SiO₂ gir seigere magma, og seig magma holder på gassen. Dypt nede er H₂O, CO₂ og SO₂ oppløst. Når magmaen stiger, faller trykket, og det dannes bobler (eksolusjon). I basalt slipper boblene ut. I ryolitt gjør de ikke det, og smelten kan sprekke opp."
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
    >
      <div data-figure="magmatyper" className={motion.motionClass}>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {MAGMA_ROWS.map((row) => (
            <article key={row.name} className="rounded-xl border border-border bg-[#10181e] p-3 text-sm leading-snug">
              <h3 className="font-semibold text-foreground">{row.name}</h3>
              <dl className="mt-2 space-y-1.5">
                {(
                  [
                    ["SiO₂", row.sio2],
                    ["Temperatur", row.temp],
                    ["Viskositet", row.visc],
                    ["Gass", row.gas],
                    ["Utbrudd", row.style],
                    ["Miljø", row.place],
                  ] as const
                ).map(([term, text]) => (
                  <div key={term} className="grid grid-cols-[5.5rem_1fr] gap-2">
                    <dt className="text-muted-foreground">{term}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-[#10181e] p-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 text-sm font-medium">
              <span className="shrink-0">Høyde i kanalen</span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={level}
                aria-label="Høyde i kanalen"
                onChange={(event) => {
                  setLevel(Number(event.target.value));
                  if (playing) motion.toggle();
                }}
                className="w-full min-w-0 accent-primary"
              />
            </label>
            <span className="text-sm text-muted-foreground">
              {level < 34 ? "Dypt: gass oppløst" : level < 68 ? "Boblene vokser" : "Nær overflaten"}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#e0b48a]">Lettflytende basaltisk magma</h3>
              <BubbleConduit level={level} mode="fluid" />
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Lav viskositet. Boblene stiger og slipper ut. Utbruddet blir rolig: lavastrømmer eller lavafontener.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#d07a7a]">Seig ryolittisk magma</h3>
              <BubbleConduit level={level} mode="viscous" />
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Høy viskositet. Boblene slipper ikke ut. Trykket i boblene stiger, og smelten kan sprekke opp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FigureFrame>
  );
}

const VEI_STEPS = [
  { vei: 0, volume: "< 10 000 m³", height: "< 100 m", klass: "Hawaiisk (effusiv)", freq: "–", examples: "Kilauea, Fagradalsfjall (Island)", bar: 8 },
  { vei: 1, volume: "> 10 000 m³", height: "0,1–1 km", klass: "Hawaiisk / strombolsk", freq: "–", examples: "Stromboli (Italia)", bar: 16 },
  { vei: 2, volume: "> 1 mill. m³", height: "1–5 km", klass: "Strombolsk / vulkansk", freq: "–", examples: "Galeras (Colombia)", bar: 28 },
  { vei: 3, volume: "> 10 mill. m³", height: "3–15 km", klass: "Vulkansk / subpliniansk", freq: "Noen ganger i året", examples: "Nevado del Ruiz (1985)", bar: 42 },
  { vei: 4, volume: "> 0,1 km³", height: "10–25 km", klass: "Subpliniansk / pliniansk", freq: "Ca. hvert 1.–2. år", examples: "Eyjafjallajökull (2010)", bar: 56 },
  { vei: 5, volume: "> 1 km³", height: "20–35 km", klass: "Pliniansk", freq: "Om lag 1 per 12 år", examples: "Mount St. Helens (1980), Vesuv (79)", bar: 70 },
  { vei: 6, volume: "> 10 km³", height: "> 30 km", klass: "Ultrapliniansk, ofte med kaldera", freq: "Om lag 1 per 100 år", examples: "Pinatubo (1991), Krakatau (1883)", bar: 82 },
  { vei: 7, volume: "> 100 km³", height: "> 35 km", klass: "Ultrapliniansk, ofte med kaldera", freq: "Svært sjelden (siste: Tambora 1815)", examples: "Tambora (1815), Santorini (ca. 1600 f.Kr.)", bar: 92 },
  { vei: 8, volume: "> 1000 km³", height: "> 45 km", klass: "Superutbrudd", freq: "Ingen i historisk tid", examples: "Toba (74 000 år siden), Yellowstone", bar: 100 },
];

export function VeiScaleDiagram() {
  const [vei, setVei] = useState(4);
  const row = VEI_STEPS[vei] ?? VEI_STEPS[0];
  return (
    <FigureFrame
      heading="Vulkansk eksplosivitetsindeks"
      caption="Chris Newhall og Steve Self innførte skalaen i 1982. Fra VEI 2 og oppover betyr hvert trinn ca. ti ganger mer tefra. Fra VEI 1 til VEI 2 er spranget ca. hundre ganger. Søylehøyden i stolpene følger intervallene i tabellen, ikke en påfunnet nøyaktig verdi. Hvor ofte: VEI 3–4 etter Global Volcanism Program, VEI 5 etter Newhall og Hoblitt (2002) og VEI 6–7 etter USGS (ett VEI 7- og fire VEI 6-utbrudd siden år 1500)."
    >
      <div data-figure="vei">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="VEI-trinn">
          {VEI_STEPS.map((item) => (
            <button
              key={item.vei}
              type="button"
              aria-pressed={item.vei === vei}
              onClick={() => setVei(item.vei)}
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                item.vei === vei
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/80 bg-muted/60 text-foreground"
              }`}
            >
              VEI {item.vei}
            </button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-3 text-sm">
          <span className="shrink-0 font-medium">Velg VEI</span>
          <input
            type="range"
            min={0}
            max={8}
            step={1}
            value={vei}
            aria-label="Velg VEI"
            onChange={(event) => setVei(Number(event.target.value))}
            className="w-full accent-primary"
          />
        </label>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[12rem_1fr] md:items-end">
          <svg viewBox="0 0 160 180" className="h-40 w-full" role="img" aria-label={`Søyle for VEI ${row.vei}`}>
            <rect width="160" height="180" fill={C.bg} rx="8" />
            <line x1="28" y1="20" x2="28" y2="156" stroke={C.dim} />
            <rect x="48" y={156 - row.bar * 1.3} width="36" height={row.bar * 1.3} fill={C.warm} rx="3" />
            <L x="110" y="40" size={13} weight={700} fill={C.fg}>
              {`VEI ${row.vei}`}
            </L>
            <L x="110" y="62" size={12} fill={C.muted}>
              søyle
            </L>
          </svg>
          <dl className="grid grid-cols-1 gap-2 text-sm leading-snug sm:grid-cols-2">
            <div><dt className="text-muted-foreground">Tefravolum</dt><dd className="font-medium">{row.volume}</dd></div>
            <div><dt className="text-muted-foreground">Søylehøyde</dt><dd className="font-medium">{row.height}</dd></div>
            <div><dt className="text-muted-foreground">Utbruddstype</dt><dd className="font-medium">{row.klass}</dd></div>
            <div><dt className="text-muted-foreground">Hvor ofte globalt</dt><dd className="font-medium">{row.freq}</dd></div>
            <div className="sm:col-span-2"><dt className="text-muted-foreground">Eksempler</dt><dd className="font-medium">{row.examples}</dd></div>
          </dl>
        </div>
      </div>
    </FigureFrame>
  );
}

const EYJA_CONE: ProfileSpec = { kind: "strato", cx: 160, baseY: 150, height: 58, crater: 14, craterDepth: 4, halfWidth: 14 + 58 / 0.42 };

function EyjafjallajokullSvg() {
  const id = useId().replace(/:/g, "");
  const top = EYJA_CONE.baseY - EYJA_CONE.height;
  // Isbreen ligger som et lokk over toppområdet og følger overflaten.
  const xs = Array.from({ length: 29 }, (_, i) => 92 + i * 5);
  const iceTop = xs.map((x) => `${x} ${((surfaceY(EYJA_CONE, x) ?? 150) - 7 + Math.abs(x - 160) * 0.04).toFixed(1)}`);
  const iceBase = xs.map((x) => `${x} ${(surfaceY(EYJA_CONE, x) ?? 150).toFixed(1)}`).reverse();
  return (
    <svg viewBox="0 0 320 180" className="mt-2 h-auto w-full" role="img" aria-label="Eksplosivt utbrudd under isbre: stratovulkan med isbre på toppen og en mørk askesøyle blandet med damp">
      <VolcArtDefs id={id} />
      <rect width="320" height="180" fill={`url(#${id}-sky)`} rx="8" />
      <line x1="16" y1="36" x2="304" y2="36" stroke={C.dim} strokeDasharray="3 3" />
      <L x="20" y="28" size={11} fill={C.muted}>Stratosfære</L>
      <rect x="0" y="150" width="320" height="30" fill={`url(#${id}-crust)`} />
      <LayeredCone spec={EYJA_CONE} colors={STRATO_LAYERS} layers={6} clipId={`${id}-c`} />
      <path d={`M ${iceTop.join(" L ")} L ${iceBase.join(" L ")} Z`} fill={`url(#${id}-ice)`} stroke="#9fc3d8" strokeWidth="0.6" />
      {[112, 128, 194, 208].map((x) => (
        <path key={x} d={`M ${x} ${((surfaceY(EYJA_CONE, x) ?? 150) - 5).toFixed(1)} l 2 4`} stroke="#8fb4c9" strokeWidth="0.8" />
      ))}
      <path d={`M 158.5 156 L 158.6 ${top + 2} H 161.4 L 161.5 156 Z`} fill={`url(#${id}-lava)`} />
      {/* Damp og aske: magma møter smeltevann og blir sprengt i fine partikler */}
      <BillowColumn x0={160} y0={top - 8} x1={176} y1={58} r0={9} r1={32} count={10} fill={`url(#${id}-ashDark)`} shade="#2c2824" seed={31} />
      <BillowColumn x0={150} y0={top - 10} x1={140} y1={70} r0={5} r1={16} count={7} fill={`url(#${id}-steam)`} seed={41} opacity={0.8} />
      <L x="160" y="168" anchor="middle" size={12} fill={C.fg}>Isbre og askesøyle</L>
    </svg>
  );
}

function FagradalsfjallSvg() {
  const id = useId().replace(/:/g, "");
  const fountains: [number, number][] = [
    [128, 18],
    [140, 30],
    [152, 44],
    [164, 38],
    [176, 26],
    [188, 16],
  ];
  return (
    <svg viewBox="0 0 320 180" className="mt-2 h-auto w-full" role="img" aria-label="Effusivt sprekkeutbrudd: lavafontener langs en sprekk og en lavastrøm som brer seg ut over flatt land">
      <VolcArtDefs id={id} />
      <rect width="320" height="180" fill={`url(#${id}-sky)`} rx="8" />
      <line x1="16" y1="36" x2="304" y2="36" stroke={C.dim} strokeDasharray="3 3" />
      <L x="20" y="28" size={11} fill={C.muted}>Stratosfære</L>
      <rect x="0" y="140" width="320" height="40" fill={`url(#${id}-crust)`} />
      <rect x="0" y="140" width="320" height="40" fill={`url(#${id}-speckle)`} />
      {/* Lavt gass- og dampslør som driver med vinden */}
      <g opacity="0.55">
        <BillowSheet cx={214} cy={98} halfWidth={70} thickness={9} fill="#9fb2bc" seed={51} count={16} />
      </g>
      {/* Gangen (dike) som mater sprekken */}
      <path d="M 156 154 L 157 124 H 161 L 162 154 Z" fill={`url(#${id}-lava)`} />
      {/* Lavastrøm: mørk skorpe med glødende sprekker og front */}
      <path d="M 70 140 Q 72 131 96 130 Q 130 126 158 124 Q 196 126 236 130 Q 262 132 268 140 Z" fill="#2a2522" />
      <path d="M 92 133 Q 120 130 150 129 M 170 129 Q 206 130 240 134" fill="none" stroke="#ff6a1a" strokeWidth="1.3" opacity="0.85" />
      <path d="M 70 140 Q 72 134 80 133 M 268 140 Q 266 134 258 133" fill="none" stroke="#ffb347" strokeWidth="1.6" />
      {/* Små sprutkjegler langs sprekken */}
      <path d="M 124 126 Q 158 110 194 126 Z" fill="#3a2a22" stroke="#6b3a2a" strokeWidth="0.8" />
      {fountains.map(([x, h]) => (
        <path key={x} d={`M ${x - 3} 121 Q ${x} ${121 - h * 2} ${x + 3} 121 Z`} fill={`url(#${id}-lava)`} />
      ))}
      {[136, 148, 160, 172].map((x, i) => (
        <circle key={x} cx={x + (i % 2 ? 4 : -4)} cy={92 - i * 3} r="1.6" fill="#ffc04d" />
      ))}
      <L x="160" y="168" anchor="middle" size={12} fill={C.fg}>Fontene og lavastrøm</L>
    </svg>
  );
}

export function IcelandContrastDiagram() {
  return (
    <FigureFrame
      heading="Eyjafjallajökull og Fagradalsfjall"
      caption="Eyjafjallajökull hadde intermediær magma under en isbre, og møtet med vannet gjorde utbruddet eksplosivt. Fagradalsfjall har basalt på tørt land, og lavaen renner ut."
    >
      <div data-figure="island" className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-[#10181e] p-3">
          <h3 className="text-base font-semibold text-foreground">Eyjafjallajökull 2010</h3>
          <p className="mt-1 text-sm text-muted-foreground">Eksplosivt. VEI 4.</p>
          <EyjafjallajokullSvg />
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>Intermediær magma, SiO₂ ca. 58 %, under en isbre.</li>
            <li>Freatomagmatisme: magmaen traff en 200 meter tykk isbre. Smelten ble sprengt i svært små glasspartikler. Minst en femdel av asken var mindre enn 10 mikrometer.</li>
            <li>Over 100 000 flygninger ble kansellert. 10 millioner reisende ble stående igjen.</li>
            <li>Et stabilt høytrykk over Nord-Atlanteren førte asken mot Norge og Nord-Europa.</li>
          </ul>
        </article>
        <article className="rounded-xl border border-border bg-[#10181e] p-3">
          <h3 className="text-base font-semibold text-foreground">Fagradalsfjall</h3>
          <p className="mt-1 text-sm text-muted-foreground">Effusivt. Basalt på tørt land.</p>
          <FagradalsfjallSvg />
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>Fagradalsfjall 2021–2023 og Sundhnúkur 2023–2025 på Reykjaneshalvøya.</li>
            <li>Basaltisk magma, SiO₂ ca. 48 %, kommer opp langs sprekker. Ingen isbre over.</li>
            <li>Tyntflytende basalt avgasser i fontener og lavastrømmer. Asken når ikke stratosfæren.</li>
            <li>Flytrafikken er ikke truet. Infrastruktur og hus, som i Grindavík, kan likevel bli truet.</li>
          </ul>
        </article>
      </div>
    </FigureFrame>
  );
}

export function JanMayenDiagram() {
  return (
    <FigureFrame
      heading="Jan Mayen og Beerenberg"
      caption="Skjematisk, ikke i målestokk. Fastlandet har ingen aktive vulkaner i dag. Jan Mayen ligger på et mikrokontinent som ble skilt fra Norge langs Aegirryggen, og øya ligger ved Mohnsryggen og Kolbeinseyryggen."
    >
      <div data-figure="jan-mayen" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-[#10181e] p-3">
          <h3 className="text-sm font-semibold text-foreground">Tektonisk sammenheng</h3>
          <WideSvg label="Skjematisk plassering av Jan Mayen mellom ryggene" viewBox="0 0 520 300">
            <rect x="28" y="70" width="120" height="150" rx="8" fill="#243028" stroke="#4d5f53" />
            <L x="88" y="130" anchor="middle" size={14} weight={700}>Norge</L>
            <L x="88" y="152" anchor="middle" size={11} fill={C.muted}>Ingen aktive</L>
            <L x="88" y="168" anchor="middle" size={11} fill={C.muted}>vulkaner i dag</L>
            <L x="88" y="196" anchor="middle" size={11} fill={C.sand}>Oslofeltet:</L>
            <L x="88" y="212" anchor="middle" size={11} fill={C.muted}>utdødd paleorift</L>
            <path d="M148 140 H300" stroke={C.teal} strokeWidth="3" strokeDasharray="6 4" />
            <L x="224" y="124" anchor="middle" size={13} weight={700} fill={C.teal}>Aegirryggen</L>
            <L x="224" y="168" anchor="middle" size={11} fill={C.muted}>ca. 54 mill. år</L>
            <rect x="300" y="78" width="180" height="150" rx="8" fill="#2a241c" stroke={C.warm} />
            <L x="390" y="118" anchor="middle" size={13} weight={700} fill={C.warm}>Jan Mayen</L>
            <L x="390" y="138" anchor="middle" size={12} fill={C.fg}>mikrokontinent</L>
            <L x="390" y="160" anchor="middle" size={12} fill={C.fg}>Beerenberg</L>
            <L x="390" y="258" anchor="middle" size={12} fill={C.cold}>
              Ved Mohnsryggen og Kolbeinseyryggen
            </L>
            <L x="36" y="28" size={12} fill={C.muted}>Norskehavets ryggsystem</L>
          </WideSvg>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>Mikrokontinentet ble skilt fra Norge ved havbunnsspredning langs Aegirryggen for ca. 54 millioner år siden.</li>
            <li>Det ble isolert da Kolbeinseyryggen åpnet for ca. 23–20 millioner år siden.</li>
            <li>Øya ligger i ryggsystemet i Norskehavet, ved Mohnsryggen og Kolbeinseyryggen.</li>
            <li>Magmatismen i Oslofeltet, med rombeporfyr, larvikitt og basalt, er 250–300 millioner år gammel.</li>
          </ul>
        </article>
        <article className="rounded-xl border border-border bg-[#10181e] p-3">
          <h3 className="text-sm font-semibold text-foreground">Beerenberg i tverrsnitt</h3>
          <svg viewBox="0 0 360 240" className="mt-2 h-auto w-full" role="img" aria-label="Tverrsnitt av Beerenberg">
            <rect width="360" height="240" fill={C.bg} rx="8" />
            <path d="M0 168 H360 V240 H0 Z" fill="#0e2430" />
            <L x="16" y="160" size={11} fill={C.cold}>Hav</L>
            <path d="M70 168 L168 48 L192 48 L290 168 Z" fill="#3a332c" />
            <path d="M110 120 H250 V136 H110 Z" fill="#8a4b32" />
            <path d="M124 104 H236 V120 H124 Z" fill="#5c564e" />
            <path d="M140 88 H220 V104 H140 Z" fill="#c46a3a" />
            <path d="M150 62 L180 40 L210 62 L196 70 L164 70 Z" fill="#e8eef2" />
            <path d="M168 168 Q210 150 250 168" fill="none" stroke="#e0894a" strokeWidth="4" />
            <L x="180" y="28" anchor="middle" size={12} weight={700}>2272 moh.</L>
            <L x="300" y="150" size={11} fill={C.warm}>Lava til havs</L>
          </svg>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>Norges eneste aktive vulkan over havet. Isdekket stratovulkan, 2272 moh.</li>
            <li>Utbruddene veksler mellom lavastrømmer og tefra.</li>
            <li>Dekket av isbreer, blant annet Weyprechtbreen og Kronprins Olavs bre.</li>
            <li>Det siste utbruddet var i 1985. De mest kjente utbruddene var høsten 1970 og januar 1985. Basaltisk lava rant ut i havet. Utbruddet i 1970 la til 4 km² land.</li>
          </ul>
        </article>
      </div>
    </FigureFrame>
  );
}

const WINTER_CONE: ProfileSpec = { kind: "strato", cx: 86, baseY: 236, height: 64, crater: 6, craterDepth: 2, halfWidth: 6 + 64 / 0.4 };

export function VolcanicWinterDiagram() {
  const wid = useId().replace(/:/g, "");
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  return (
    <FigureFrame
      heading="Vulkansk vinter"
      caption="Grov aske faller ut i løpet av dager og uker. SO₂ kan bli værende i stratosfæren, der den reagerer med vanndamp og danner dråper av svovelsyre. Dråpene sprer sollys, og mindre sol når bakken."
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
    >
      <div className={motion.motionClass} data-figure="vulkansk-vinter" data-playing={playing ? "yes" : "no"}>
        <style>{`
          .vw-ash, .vw-drop { transform-box: fill-box; transform-origin: center; }
          .motion-unlocked .vw-ash { animation: vw-ash 2.8s linear infinite; }
          .motion-unlocked .vw-drop { animation: vw-drop 3.6s ease-in-out infinite; }
          @keyframes vw-ash { from { transform: translateY(-8px); opacity: 0.2; } to { transform: translateY(28px); opacity: 0.85; } }
          @keyframes vw-drop { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
        `}</style>
        <WideSvg label="Svoveldioksid blir til sulfataerosoler i stratosfæren" viewBox="0 0 760 300">
          <VolcArtDefs id={wid} />
          <defs>
            <linearGradient id={`${wid}-strat`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b1626" />
              <stop offset="1" stopColor="#132a40" />
            </linearGradient>
            <linearGradient id={`${wid}-veil`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c9dfe4" stopOpacity="0.05" />
              <stop offset="0.25" stopColor="#c9dfe4" stopOpacity="0.32" />
              <stop offset="1" stopColor="#c9dfe4" stopOpacity="0.12" />
            </linearGradient>
            <radialGradient id={`${wid}-sun`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff6d6" />
              <stop offset="0.45" stopColor="#ffe08a" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${wid}-ground`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a2b2a" />
              <stop offset="1" stopColor="#171614" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="760" height="108" fill={`url(#${wid}-strat)`} />
          <rect x="0" y="108" width="760" height="128" fill={`url(#${wid}-sky)`} />
          {/* Slør av svovelsyredråper som sprer seg i stratosfæren */}
          <path d="M 110 62 Q 300 40 740 52 L 740 84 Q 300 92 110 74 Z" fill={`url(#${wid}-veil)`} />
          <L x="16" y="22" size={13} fill={C.cold}>Stratosfære</L>
          <L x="150" y="22" size={13} weight={700} fill={C.sand}>SO₂</L>
          <L x="250" y="22" size={13} weight={700} fill={C.teal}>H₂SO₄-dråper</L>
          <L x="452" y="22" size={13} fill={C.fg}>Sprer sollys</L>
          <line x1="210" y1="18" x2="240" y2="18" stroke={C.sand} strokeWidth="1.6" />
          {Array.from({ length: 7 }, (_, index) => (
            <circle
              key={index}
              className={playing ? "vw-drop" : undefined}
              cx={250 + index * 22}
              cy={58 + (index % 2) * 14}
              r="4"
              fill="#9ad7de"
              style={playing ? { animationDelay: `${index * 0.15}s` } : undefined}
            />
          ))}
          {/* Sola, innkommende stråler og stråler som spres tilbake */}
          <circle cx="726" cy="22" r="30" fill={`url(#${wid}-sun)`} />
          <circle cx="726" cy="22" r="12" fill="#fff6d6" />
          {[0, 1, 2].map((n) => {
            const hx = 640 - n * 44;
            const hy = 66 + n * 2;
            const dx = hx - (712 - n * 4);
            const dy = hy - (30 + n * 3);
            return (
              <g key={n}>
                <path d={`M ${712 - n * 4} ${30 + n * 3} L ${hx} ${hy}`} stroke="#ffe08a" strokeWidth="2" opacity="0.85" />
                <path d={`M ${hx} ${hy} L ${hx + dx * 0.55} ${hy - dy * 0.9}`} stroke="#ffe08a" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.75" />
                <path d={`M ${hx} ${hy} L ${hx + (dx * (232 - hy)) / dy} 232`} stroke="#ffe08a" strokeWidth="1" opacity="0.28" />
              </g>
            );
          })}
          <line x1="0" y1="108" x2="760" y2="108" stroke={C.dim} strokeDasharray="4 4" />
          <L x="16" y="128" size={13} fill={C.muted}>Troposfære</L>
          {/* Vulkan med søyle som når stratosfæren */}
          <LayeredCone spec={WINTER_CONE} colors={STRATO_LAYERS} layers={5} clipId={`${wid}-c`} />
          <BillowColumn x0={WINTER_CONE.cx} y0={WINTER_CONE.baseY - WINTER_CONE.height - 4} x1={100} y1={70} r0={7} r1={26} count={10} fill={`url(#${wid}-ash)`} shade="#3e3934" seed={61} />
          <circle className={playing ? "vw-ash" : undefined} cx="150" cy="176" r="3" fill="#cbd5e1" />
          <circle className={playing ? "vw-ash" : undefined} cx="168" cy="196" r="2.4" fill="#94a3b8" />
          <circle className={playing ? "vw-ash" : undefined} cx="138" cy="200" r="2" fill="#a8a29e" />
          <L x="186" y="188" size={13} fill={C.muted}>Grov aske faller ut</L>
          <rect x="0" y="236" width="760" height="64" fill={`url(#${wid}-ground)`} />
          <rect x="0" y="236" width="760" height="64" fill={`url(#${wid}-speckle)`} />
          <L x="24" y="274" size={15} weight={700} fill={C.fg}>
            Mindre sol når bakken
          </L>
        </WideSvg>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <p className="rounded-lg border border-border p-3 text-sm leading-relaxed">
            Tambora, april 1815 (VEI 7). Svovel kom opp i stratosfæren. 1816 kalles «året uten sommer». Frost og snø i juli og august ødela avlinger i Europa og Nord-Amerika.
          </p>
          <p className="rounded-lg border border-border p-3 text-sm leading-relaxed">
            Pinatubo 1991. Jordoverflaten kjølte i om lag tre år, ca. 0,5 °C i snitt og inntil ca. 0,7 °C på det meste.
          </p>
        </div>
      </div>
    </FigureFrame>
  );
}

function MonitorIcon({ kind }: { kind: "seismic" | "ground" | "gas" | "heat" }) {
  const stroke = C.teal;
  return (
    <svg viewBox="0 0 48 48" className="size-10 shrink-0" aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#0f171c" stroke={stroke} />
      {kind === "seismic" ? (
        <path d="M6 30 H14 L18 16 L24 36 L30 22 L34 30 H42" fill="none" stroke={C.warm} strokeWidth="1.8" />
      ) : null}
      {kind === "ground" ? (
        <>
          <path d="M8 32 Q24 18 40 32" fill="none" stroke={stroke} strokeWidth="1.8" />
          <path d="M24 28 V14" stroke={stroke} strokeWidth="1.6" />
          <path d="M20 18 L24 14 L28 18" fill="none" stroke={stroke} strokeWidth="1.6" />
        </>
      ) : null}
      {kind === "gas" ? (
        <>
          <circle cx="18" cy="20" r="4" fill="none" stroke={C.sand} strokeWidth="1.6" />
          <circle cx="30" cy="18" r="3" fill="none" stroke={C.sand} strokeWidth="1.6" />
          <circle cx="26" cy="30" r="3.5" fill="none" stroke={C.sand} strokeWidth="1.6" />
        </>
      ) : null}
      {kind === "heat" ? (
        <>
          <circle cx="24" cy="24" r="6" fill={C.low} />
          <path d="M24 8 V14 M24 34 V40 M8 24 H14 M34 24 H40" stroke={C.warm} strokeWidth="1.6" />
        </>
      ) : null}
    </svg>
  );
}

const MONITORS: { kind: "seismic" | "ground" | "gas" | "heat"; title: string; text: string }[] = [
  {
    kind: "seismic",
    title: "Seismiske signaler",
    text: "Når magma bryter seg opp gjennom skorpen, sprekker fjellet i mange små skjelv. Når magma og gass strømmer i sprekker, kan det registreres som harmonisk tremor: en jevn, lavfrekvent dur.",
  },
  {
    kind: "ground",
    title: "Bakkedeformasjon",
    text: "Når magmakammeret fylles, hever bakken seg. Hevingen måles med GNSS på bakken og med satellitt-radar (InSAR).",
  },
  {
    kind: "gas",
    title: "Gass",
    text: "Oppstigende magma slipper ut gasser når trykket faller. Målinger av svoveldioksid (SO₂) og karbondioksid (CO₂) kan vise at magmaen er nær overflaten.",
  },
  {
    kind: "heat",
    title: "Varme",
    text: "Infrarøde satellitter og varmekameraer kan se at krateret eller sprekkene blir varmere før magmaen blir synlig.",
  },
];

export function VolcanoMonitoringDiagram() {
  return (
    <FigureFrame
      heading="Overvåking og varsling"
      caption="Vulkaner gir ofte målbare signaler før et utbrudd. Observatorier følger særlig fire forhold. Målingene brukes i fargekoder for luftfart: grønn, gul, oransje og rød. Kodene administreres av ICAO. Varselet til flyselskapene kalles VONA."
    >
      <div data-figure="overvaking" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MONITORS.map((item) => (
          <article key={item.title} className="rounded-xl border border-border bg-[#12181e] p-4">
            <div className="flex items-start gap-3">
              <MonitorIcon kind={item.kind} />
              <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-2 text-sm">
        {[
          ["Grønn", "#1f8a4c"],
          ["Gul", "#c9a227"],
          ["Oransje", "#d06a1f"],
          ["Rød", "#c2413b"],
        ].map(([name, color]) => (
          <li key={name} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <span className="size-2.5 rounded-full" style={{ background: color }} />
            {name}
          </li>
        ))}
      </ul>
    </FigureFrame>
  );
}

