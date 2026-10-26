import { useEffect, useId, useState } from "react";
import { useAnimationPlaying, useStepCycle } from "./use-motion";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";

type EnsoPhase = "neutral" | "elnino" | "lanina";

const PHASE_LABEL: Record<EnsoPhase, string> = {
  neutral: "Nøytral",
  elnino: "El Niño",
  lanina: "La Niña",
};

const NEUTRAL_STEPS = ["1 Passat", "2 Vann vest", "3 Termoklin", "4 Stig/synk", "5 Walker"];
const ELNINO_STEPS = ["1 Vind", "2 Varme øst", "3 Oppvelling", "4 Regn", "5 Fase"];
const LANINA_STEPS = ["1 Sterkere vind", "2 Kaldere øst", "3 Oppvelling", "4 Regn", "5 Walker"];

const NEUTRAL_STATUS = [
  "Passatvindene (de østlige vindene langs ekvator) blåser fra øst mot vest.",
  "Passatvindene skyver sjøvann vestover. Jo lenger vest, desto varmere overflate.",
  "I øst stiger kaldere, næringsrikt vann. Overflaten er kjøligere i øst.",
  "Luft stiger over det varme vannet i vest og synker over det kjøligere vannet i øst.",
  "Walker-sirkulasjonen er en krets: nedre øst→vest, øvre vest→øst.",
];

const ELNINO_STATUS = [
  "De østlige vindene svekkes eller snur.",
  "Overflaten i sentrum og øst blir varmere enn vanlig.",
  "Uten sterk passat dempes oppvellingsmønsteret i øst.",
  "Mindre regn over Indonesia, mer over det tropiske Stillehavet.",
  "Hav og luft hører til samme fase.",
];

const LANINA_STATUS = [
  "De østlige vindene blir sterkere.",
  "Overflaten i sentrum og øst blir kaldere enn vanlig.",
  "Kaldere hav i øst.",
  "Mer regn over Indonesia, mindre over det sentrale tropiske Stillehavet.",
  "Forsterket Walker-sirkulasjon.",
];

const BJERKNES_STEPS = ["1 Vind", "2 Overflate", "3 Regn", "4 Luft", "5 Løkke"];
const BJERKNES_STATUS = [
  "1 · De østlige vindene svekkes",
  "2 · Sentrum og øst blir varmere",
  "3 · Regnet flytter seg",
  "4 · Lufta følger med",
  "Hav og luft må begge være med.",
];

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

function PhaseButtons({
  phase,
  onPhase,
}: {
  phase: EnsoPhase;
  onPhase: (p: EnsoPhase) => void;
}) {
  const items: { id: EnsoPhase; label: string; active: string }[] = [
    { id: "neutral", label: "1. Normaltilstand (Nøytral)", active: "bg-teal-600 text-white shadow" },
    { id: "elnino", label: "2. El Niño (Varm fase)", active: "bg-amber-600 text-white shadow" },
    { id: "lanina", label: "3. La Niña (Kald fase)", active: "bg-sky-600 text-white shadow" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="ENSO-fase">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={phase === item.id}
          onClick={() => onPhase(item.id)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            phase === item.id ? item.active : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/** Skymasse med volum (soft stack). */
function CloudStack({
  cx,
  cy,
  scale = 1,
  label,
  labelFill = "#0f172a",
}: {
  cx: number;
  cy: number;
  scale?: number;
  label?: string;
  labelFill?: string;
}) {
  const s = scale;
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${s})`} style={{ transformOrigin: "0 0" }}>
      <ellipse cx="0" cy="8" rx="62" ry="28" fill="#94a3b8" opacity="0.55" />
      <ellipse cx="-28" cy="-2" rx="42" ry="24" fill="#cbd5e1" opacity="0.88" />
      <ellipse cx="30" cy="-4" rx="48" ry="26" fill="#cbd5e1" opacity="0.9" />
      <ellipse cx="0" cy="-22" rx="48" ry="24" fill="#e2e8f0" opacity="0.95" />
      <ellipse cx="-8" cy="-8" rx="36" ry="18" fill="#f1f5f9" opacity="0.55" />
      {label ? (
        <L x={0} y={10} fill={labelFill} size={12} weight={800} anchor="middle">
          {label}
        </L>
      ) : null}
    </g>
  );
}

function RainStreaks({ x, y0, y1, n = 3 }: { x: number; y0: number; y1: number; n?: number }) {
  const gap = 18;
  const start = x - ((n - 1) * gap) / 2;
  return (
    <g className="enso-rain">
      {Array.from({ length: n }, (_, i) => {
        const xi = start + i * gap;
        return (
          <line
            key={i}
            x1={xi}
            y1={y0}
            x2={xi - 2}
            y2={y1}
            stroke={C.rain}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        );
      })}
    </g>
  );
}

export function EnsoComparisonDiagram() {
  const uid = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<EnsoPhase>("neutral");
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(5, playing, 3600);

  useEffect(() => {
    setStep(1);
  }, [phase, setStep]);

  const showStep = !playing && motion.reduced ? 5 : step;
  const steps =
    phase === "neutral" ? NEUTRAL_STEPS : phase === "elnino" ? ELNINO_STEPS : LANINA_STEPS;
  const statuses =
    phase === "neutral" ? NEUTRAL_STATUS : phase === "elnino" ? ELNINO_STATUS : LANINA_STATUS;
  const statusText = playing
    ? statuses[showStep - 1]
    : motion.reduced
      ? statuses[4]
      : "Pause stopper på valgt trinn";

  const heading =
    phase === "neutral"
      ? "Normaltilstand: Passatvinder og Walker-sirkulasjon"
      : phase === "elnino"
        ? "El Niño: Varmtvannet flyter østover — tørke i vest, regn i øst"
        : "La Niña: Sterkere østlige vinder og kaldere hav i øst";

  const caption =
    phase === "neutral"
      ? "Passatvindene blåser fra øst mot vest og skyver sjøvann vestover. Vannet varmes på veien, så vest er varmere og øst kjøligere. Luft stiger over det varme vannet i vest og synker over det kjøligere vannet i øst (Di Liberto, 2014)."
      : phase === "elnino"
        ? "Overflaten i det sentrale og østlige tropiske Stillehavet blir varmere enn vanlig. De østlige vindene svekkes eller snur. Det blir mindre regn over Indonesia og mer over det tropiske Stillehavet (L'Heureux, 2014)."
        : "Overflaten i det sentrale og østlige tropiske Stillehavet blir kaldere enn vanlig. De østlige vindene blir sterkere. Det blir mer regn over Indonesia og mindre over det sentrale tropiske Stillehavet (L'Heureux, 2014).";

  const title = `ENSO: ${
    phase === "neutral"
      ? "Normaltilstand og Walker-sirkulasjon"
      : phase === "elnino"
        ? "El Niño — varmere sentrum og øst, svakere østlige vinder"
        : "La Niña — kaldere sentrum og øst, sterkere østlige vinder"
  } · steg ${showStep}`;

  return (
    <div className="space-y-4">
      <PhaseButtons
        phase={phase}
        onPhase={(p) => {
          setPhase(p);
        }}
      />

      <Diagram
        title={title}
        heading={heading}
        caption={caption}
        viewBox="0 0 900 520"
        wide
        scroll
        action={
          <PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} name={`ENSO ${PHASE_LABEL[phase]}`} />
        }
        toolbar={
          <>
            <StepPicker labels={steps} step={showStep} onStep={setStep} />
            <span className="text-xs text-muted-foreground max-w-xl">{statusText}</span>
          </>
        }
      >
        {(m) => (
          <>
            <style>{`
              .motion-unlocked .enso-dash path { animation: enso-dash 1.5s linear infinite; }
              .motion-unlocked .enso-rise { animation: enso-rise 2.2s ease-in-out infinite; }
              .motion-unlocked .enso-sink { animation: enso-sink 2.2s ease-in-out infinite; }
              .motion-unlocked .enso-rain { animation: enso-rain 1.4s ease-in-out infinite; }
              @keyframes enso-dash { to { stroke-dashoffset: -24; } }
              @keyframes enso-rise {
                0%, 100% { transform: translateY(5px); opacity: 0.65; }
                50% { transform: translateY(-4px); opacity: 1; }
              }
              @keyframes enso-sink {
                0%, 100% { transform: translateY(-5px); opacity: 0.65; }
                50% { transform: translateY(4px); opacity: 1; }
              }
              @keyframes enso-rain {
                0%, 100% { opacity: 0.55; }
                50% { opacity: 1; }
              }
            `}</style>

            <defs>
              <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#070b10" />
                <stop offset="55%" stopColor="#101820" />
                <stop offset="100%" stopColor="#152433" />
              </linearGradient>
              <linearGradient id={`${uid}-sst-n`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.72" />
                <stop offset="35%" stopColor="#ea580c" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id={`${uid}-sst-e`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.78" />
              </linearGradient>
              <linearGradient id={`${uid}-sst-l`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.75" />
                <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id={`${uid}-deep`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a1620" stopOpacity="0" />
                <stop offset="100%" stopColor="#061018" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id={`${uid}-land-w`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#243528" />
                <stop offset="100%" stopColor="#152019" />
              </linearGradient>
              <linearGradient id={`${uid}-land-e`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3224" />
                <stop offset="100%" stopColor="#1f1a14" />
              </linearGradient>
              <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g
              className={motion.motionClass}
              data-playing={playing ? "yes" : "no"}
              data-phase={phase}
              data-step={showStep}
            >
              {/* Himmel */}
              <rect x="40" y="28" width="820" height="232" rx="8" fill={`url(#${uid}-sky)`} />
              {/* Havbasseng */}
              <rect x="40" y="260" width="820" height="200" rx="8" fill="#0a141c" />
              <rect x="130" y="260" width="640" height="200" fill={`url(#${uid}-deep)`} />

              {/* Land vest / øst */}
              <path
                d="M 40 210 L 40 460 L 130 460 L 130 250 Q 100 220 70 215 Z"
                fill={`url(#${uid}-land-w)`}
              />
              <path
                d="M 770 250 Q 800 220 850 218 L 860 460 L 770 460 Z"
                fill={`url(#${uid}-land-e)`}
              />
              <line x1="130" y1="220" x2="130" y2="460" stroke={C.dim} strokeWidth="1.4" />
              <line x1="770" y1="220" x2="770" y2="460" stroke={C.dim} strokeWidth="1.4" />
              <L x="85" y="248" fill={C.teal} size={14} weight={800} anchor="middle">
                Indonesia
              </L>
              <L x="85" y="268" fill={C.muted} size={11} anchor="middle">
                (Vest)
              </L>
              <L x="815" y="248" fill={C.warm} size={14} weight={800} anchor="middle">
                Sør-Amerika
              </L>
              <L x="815" y="268" fill={C.muted} size={11} anchor="middle">
                Peru (Øst)
              </L>

              {/* Havoverflate (lett helling i nøytral/La Niña) */}
              {phase === "elnino" ? (
                <line x1="130" y1="262" x2="770" y2="262" stroke="#38bdf8" strokeWidth="1.8" opacity="0.9" />
              ) : (
                <path
                  d="M 130 268 Q 450 256 770 264"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  opacity="0.9"
                />
              )}
              <L x="450" y="252" fill="#7dd3fc" size={12} weight={600} anchor="middle">
                Havoverflate · Det tropiske Stillehavet (~12 000 km)
              </L>

              {phase === "neutral" && (
                <NeutralScene step={showStep} m={m} uid={uid} />
              )}
              {phase === "elnino" && (
                <ElNinoScene step={showStep} m={m} uid={uid} />
              )}
              {phase === "lanina" && (
                <LaNinaScene step={showStep} m={m} uid={uid} />
              )}
            </g>
          </>
        )}
      </Diagram>
    </div>
  );
}

function NeutralScene({
  step,
  m,
  uid,
}: {
  step: number;
  m: { teal: string; warm: string; cold: string; muted: string; rain: string };
  uid: string;
}) {
  const showOcean = step >= 2;
  const showThermo = step >= 3;
  const showConv = step >= 4;
  const showUpper = step >= 5;

  return (
    <>
      {/* Steg-badge */}
      <g>
        <rect x="150" y="36" width="210" height="26" rx="6" fill="#0d151c" stroke="#334155" strokeWidth="1" />
        <L x="160" y="54" fill="#94a3b8" size={12} weight={800}>
          {step === 1
            ? "NYTT · passatvinder"
            : step === 2
              ? "NYTT · vann skyves vest"
              : step === 3
                ? "NYTT · termoklin + oppvelling"
                : step === 4
                  ? "NYTT · stig / synk + regn"
                  : "NYTT · full Walker-krets"}
        </L>
      </g>

      {/* Passat (alltid fra steg 1) */}
      <g className="enso-dash">
        <Arrow
          d="M 680 200 L 280 200"
          marker={m.teal}
          color={C.teal}
          width={step >= 5 ? 3.6 : 3.2}
          dash="7 5"
        />
      </g>
      <L x="480" y="188" fill={C.teal} size={14} weight={800} anchor="middle">
        ← Passatvinder (øst → vest)
      </L>

      {showOcean && (
        <>
          <path
            d="M 130 270 C 280 270, 400 275, 770 278 L 770 320 C 500 300, 280 292, 130 300 Z"
            fill={`url(#${uid}-sst-n)`}
            opacity="0.9"
          />
          <L x="230" y="292" fill="#fff" size={13} weight={800}>
            Varmere vann i vest
          </L>
          <L x="230" y="310" fill={C.fg} size={11}>
            Høyere havnivå (~0,5 m)
          </L>
          <L x="620" y="300" fill="#7dd3fc" size={12} weight={700}>
            Kjøligere overflate i øst
          </L>
        </>
      )}

      {showThermo && (
        <>
          <path
            d="M 130 390 C 320 360, 520 310, 770 288"
            stroke="#fb923c"
            strokeWidth="3.4"
            fill="none"
            filter={`url(#${uid}-glow)`}
          />
          <path
            d="M 130 390 C 320 360, 520 310, 770 288 L 770 460 L 130 460 Z"
            fill="#0c4a6e"
            opacity="0.28"
          />
          <L x="480" y="348" fill="#fdba74" size={13} weight={800} anchor="middle">
            Termoklin heller (grunn øst, dypere vest)
          </L>
          <L x="600" y="410" fill={C.cold} size={13} weight={600}>
            Kaldt dypvann
          </L>
          <g className="enso-rise">
            <Arrow d="M 740 390 L 740 285" marker={m.cold} color={C.cold} width={3.2} />
          </g>
          <L x="728" y="350" fill={C.cold} size={12} weight={700} anchor="end">
            Oppvelling
          </L>
          <L x="728" y="368" fill={C.muted} size={11} anchor="end">
            (næringsrikt vann)
          </L>
        </>
      )}

      {showConv && (
        <>
          <CloudStack cx={230} cy={105} label="Dyp konveksjon og regn" />
          <RainStreaks x={230} y0={145} y1={210} n={4} />
          <g className="enso-rise">
            <Arrow d="M 170 195 L 170 70" marker={m.warm} color={C.warm} width={2.8} />
          </g>
          <g className="enso-sink">
            <Arrow d="M 710 70 L 710 195" marker={m.cold} color={C.cold} width={2.8} />
          </g>
          <L x={725} y={140} fill={C.cold} size={12} weight={600}>
            Synkende luft (tørt)
          </L>
        </>
      )}

      {showUpper && (
        <>
          <g className="enso-dash">
            <Arrow d="M 280 58 L 680 58" marker={m.muted} color={C.muted} width={2.6} dash="6 5" />
          </g>
          <L x={480} y={48} fill={C.muted} size={13} anchor="middle">
            Øvre returstrøm mot øst →
          </L>
          <L x={450} y={485} fill={C.fg} size={12} weight={700} anchor="middle">
            Walker-krets lukket · nedre øst→vest, øvre vest→øst
          </L>
        </>
      )}
    </>
  );
}

function ElNinoScene({
  step,
  m,
  uid,
}: {
  step: number;
  m: { teal: string; warm: string; cold: string; muted: string; rain: string };
  uid: string;
}) {
  const showWarm = step >= 2;
  const showUpwell = step >= 3;
  const showRain = step >= 4;
  const showFull = step >= 5;

  return (
    <>
      <g>
        <rect x="150" y="36" width="250" height="26" rx="6" fill="#0d151c" stroke="#334155" strokeWidth="1" />
        <L x="160" y="54" fill="#fbbf24" size={12} weight={800}>
          {step === 1
            ? "NYTT · svekket østlig vind"
            : step === 2
              ? "NYTT · varme mot øst"
              : step === 3
                ? "NYTT · dempet oppvelling"
                : step === 4
                  ? "NYTT · regn flytter øst"
                  : "NYTT · full El Niño-fase"}
        </L>
      </g>

      {/* Steg 1: primært svekket østlig; valgfri svak vestlig anomali.
          Steg ≥2: sterk vestlig får egen etikett; «Svekket østlig» flyttes østover. */}
      <g className="enso-dash" opacity={0.55}>
        <Arrow
          d="M 620 200 L 380 200"
          marker={m.teal}
          color={C.teal}
          width={1.6}
          dash="4 6"
        />
      </g>
      <L
        x={step >= 2 ? "640" : "500"}
        y="186"
        fill={C.teal}
        size={12}
        weight={700}
        anchor={step >= 2 ? "start" : "middle"}
      >
        Svekket østlig passat
      </L>
      {step === 1 && (
        <>
          <g opacity={0.45}>
            <Arrow
              d="M 300 218 L 420 218"
              marker={m.warm}
              color={C.warm}
              width={1.4}
            />
          </g>
          <L x="360" y="236" fill={C.warm} size={11} weight={600} anchor="middle">
            svak vestlig anomali
          </L>
        </>
      )}
      {step >= 2 && (
        <>
          <g className="enso-dash">
            <Arrow
              d="M 280 200 L 520 200"
              marker={m.warm}
              color={C.warm}
              width={2.8}
              dash="5 4"
            />
          </g>
          <L x="400" y="186" fill={C.warm} size={12} weight={700} anchor="middle">
            Vestlig vind
          </L>
        </>
      )}

      {(showWarm || showFull) && (
        <>
          <path
            d="M 130 268 L 770 268 L 770 330 L 130 330 Z"
            fill={`url(#${uid}-sst-e)`}
            opacity="0.88"
          />
          <path
            d="M 130 328 C 300 332, 520 336, 770 334"
            stroke="#fb923c"
            strokeWidth="3.2"
            fill="none"
            filter={`url(#${uid}-glow)`}
          />
          <L x="450" y="300" fill="#fff" size={14} weight={800} anchor="middle">
            Varmere overflate i sentrum og øst
          </L>
          <L x="450" y="350" fill="#fdba74" size={12} weight={700} anchor="middle">
            Termoklin flatere
          </L>
        </>
      )}

      {showUpwell && (
        <>
          <g opacity="0.45" className="enso-rise">
            <Arrow d="M 740 380 L 740 300" marker={m.cold} color={C.cold} width={1.8} />
          </g>
          <L x="728" y="350" fill={C.cold} size={11} weight={600} anchor="end" opacity={0.75}>
            Dempet oppvelling
          </L>
        </>
      )}

      {showRain && (
        <>
          <CloudStack cx={520} cy={105} scale={1.05} label="Konveksjon og regn flyttet øst" />
          <RainStreaks x={520} y0={148} y1={215} n={4} />
          <g className="enso-sink">
            <Arrow d="M 180 70 L 180 190" marker={m.cold} color={C.cold} width={2.6} />
          </g>
          <L x="180" y="210" fill={C.sand} size={12} weight={700} anchor="middle">
            Mindre regn over Indonesia
          </L>
          <L x="720" y="175" fill={C.rain} size={12} weight={700} anchor="middle">
            Mer regn over Stillehavet
          </L>
        </>
      )}

      {showFull && (
        <L x="700" y="390" fill={C.warm} size={12} weight={700}>
          Dårligere ansjosfiske ved Peru
        </L>
      )}
    </>
  );
}

function LaNinaScene({
  step,
  m,
  uid,
}: {
  step: number;
  m: { teal: string; warm: string; cold: string; muted: string; rain: string };
  uid: string;
}) {
  const showCold = step >= 2;
  const showUpwell = step >= 3;
  const showRain = step >= 4;
  const showFull = step >= 5;

  return (
    <>
      <g>
        <rect x="150" y="36" width="230" height="26" rx="6" fill="#0d151c" stroke="#334155" strokeWidth="1" />
        <L x="160" y="54" fill="#38bdf8" size={12} weight={800}>
          {step === 1
            ? "NYTT · sterkere passat"
            : step === 2
              ? "NYTT · kaldere øst"
              : step === 3
                ? "NYTT · sterk oppvelling"
                : step === 4
                  ? "NYTT · mer regn vest"
                  : "NYTT · forsterket Walker"}
        </L>
      </g>

      <g className="enso-dash">
        <Arrow
          d="M 710 200 L 250 200"
          marker={m.teal}
          color={C.teal}
          width={step >= 1 ? 4.2 : 3}
          dash="5 4"
        />
      </g>
      <L x="480" y="186" fill={C.teal} size={15} weight={900} anchor="middle">
        Sterkere østlige vinder
      </L>

      {showCold && (
        <>
          <path
            d="M 130 270 C 250 268, 420 275, 770 280 L 770 310 C 480 295, 260 288, 130 295 Z"
            fill={`url(#${uid}-sst-l)`}
            opacity="0.9"
          />
          <path
            d="M 130 415 C 300 370, 520 295, 770 275"
            stroke="#38bdf8"
            strokeWidth="3.5"
            fill="none"
            filter={`url(#${uid}-glow)`}
          />
          <path
            d="M 130 415 C 300 370, 520 295, 770 275 L 770 460 L 130 460 Z"
            fill="#0369a1"
            opacity="0.32"
          />
          <L x="210" y="292" fill="#fff" size={13} weight={800}>
            Forsterket varmt basseng i vest
          </L>
          <L x="520" y="340" fill="#7dd3fc" size={13} weight={700}>
            Brattere termoklin · kaldere øst
          </L>
        </>
      )}

      {showUpwell && (
        <>
          <g className="enso-rise">
            <Arrow d="M 740 405 L 740 278" marker={m.cold} color="#38bdf8" width={4} />
          </g>
          <L x="728" y="345" fill="#38bdf8" size={13} weight={800} anchor="end">
            Kaldere hav i øst
          </L>
          <L x="728" y="364" fill={C.cold} size={11} weight={600} anchor="end">
            Sterkere oppvelling
          </L>
        </>
      )}

      {showRain && (
        <>
          <CloudStack cx={200} cy={100} scale={1.15} label="Mer regn over Indonesia" />
          <RainStreaks x={200} y0={150} y1={215} n={5} />
          <L x="560" y="120" fill={C.muted} size={12} weight={600} anchor="middle">
            Mindre regn sentrale tropiske Stillehav
          </L>
        </>
      )}

      {showFull && (
        <>
          <g className="enso-dash">
            <Arrow d="M 280 58 L 680 58" marker={m.muted} color={C.muted} width={2.8} dash="6 5" />
          </g>
          <g className="enso-rise">
            <Arrow d="M 160 195 L 160 65" marker={m.warm} color={C.warm} width={3} />
          </g>
          <g className="enso-sink">
            <Arrow d="M 720 65 L 720 195" marker={m.cold} color={C.cold} width={3} />
          </g>
          <L x="450" y="485" fill="#7dd3fc" size={12} weight={700} anchor="middle">
            Forsterket Walker-sirkulasjon
          </L>
        </>
      )}
    </>
  );
}

export function BjerknesLoopDiagram() {
  const uid = useId().replace(/:/g, "");
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(5, playing, 3600);
  const showStep = !playing && motion.reduced ? 5 : step;
  const statusText = playing
    ? BJERKNES_STATUS[showStep - 1]
    : motion.reduced
      ? BJERKNES_STATUS[4]
      : "Pause stopper på valgt trinn";

  const nodes = [
    { id: 1, label: "Østlige vinder\nsvekkes", x: 450, y: 78 },
    { id: 2, label: "Overflate varmere\nsentrum/øst", x: 700, y: 230 },
    { id: 3, label: "Regn flytter\nmot øst", x: 450, y: 390 },
    { id: 4, label: "Lufta følger\nmed", x: 200, y: 230 },
  ];

  return (
    <Diagram
      title={`Bjerknes-tilbakekobling (El Niño) · steg ${showStep}`}
      heading="Hav og luft henger sammen"
      caption="ENSO krever endring både i havet og i lufta. Svakere østlige vinder, varmere sentrum og øst, og mer regn der, hører til samme fase (L'Heureux, 2014)."
      viewBox="0 0 900 480"
      wide
      scroll
      action={
        <PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} name="Bjerknes-løkke" />
      }
      toolbar={
        <>
          <StepPicker labels={BJERKNES_STEPS} step={showStep} onStep={setStep} />
          <span className="text-xs text-muted-foreground max-w-xl">{statusText}</span>
        </>
      }
    >
      {(m) => (
        <>
          <style>{`
            .motion-unlocked .bj-flow { animation: bj-dash 1.6s linear infinite; }
            .motion-unlocked .bj-pulse { animation: bj-pulse 1.8s ease-in-out infinite; }
            @keyframes bj-dash { to { stroke-dashoffset: -28; } }
            @keyframes bj-pulse {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 1; }
            }
          `}</style>
          <defs>
            <linearGradient id={`${uid}-bj-bg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1018" />
              <stop offset="100%" stopColor="#121c28" />
            </linearGradient>
            <marker
              id={`${uid}-bj-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.warm} />
            </marker>
            <filter id={`${uid}-bj-glow`}>
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className={motion.motionClass} data-step={showStep} data-playing={playing ? "yes" : "no"}>
            <rect x="40" y="24" width="820" height="430" rx="12" fill={`url(#${uid}-bj-bg)`} />

            {/* Organisk ellipse-løkke */}
            <ellipse
              cx="450"
              cy="235"
              rx="250"
              ry="155"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              opacity="0.55"
            />
            <ellipse
              cx="450"
              cy="235"
              rx="250"
              ry="155"
              fill="none"
              stroke={C.warm}
              strokeWidth="3.2"
              strokeDasharray="10 8"
              className="bj-flow"
              opacity={showStep >= 5 ? 0.95 : 0.35}
              markerEnd={`url(#${uid}-bj-arrow)`}
              filter={showStep >= 5 ? `url(#${uid}-bj-glow)` : undefined}
            />

            {/* Buepiler mellom noder (vises progressivt) */}
            {showStep >= 1 && (
              <path
                d="M 500 90 C 620 90, 700 140, 710 200"
                fill="none"
                stroke={C.warm}
                strokeWidth="2.6"
                markerEnd={`url(#${uid}-bj-arrow)`}
                className="bj-flow"
                strokeDasharray="8 6"
                opacity={showStep >= 1 ? 0.9 : 0.3}
              />
            )}
            {showStep >= 2 && (
              <path
                d="M 710 270 C 700 340, 600 390, 520 400"
                fill="none"
                stroke={C.warm}
                strokeWidth="2.6"
                markerEnd={`url(#${uid}-bj-arrow)`}
                className="bj-flow"
                strokeDasharray="8 6"
              />
            )}
            {showStep >= 3 && (
              <path
                d="M 380 400 C 280 390, 200 340, 190 270"
                fill="none"
                stroke={C.warm}
                strokeWidth="2.6"
                markerEnd={`url(#${uid}-bj-arrow)`}
                className="bj-flow"
                strokeDasharray="8 6"
              />
            )}
            {showStep >= 4 && (
              <path
                d="M 190 190 C 200 120, 300 90, 400 85"
                fill="none"
                stroke={C.warm}
                strokeWidth="2.6"
                markerEnd={`url(#${uid}-bj-arrow)`}
                className="bj-flow"
                strokeDasharray="8 6"
              />
            )}

            {nodes.map((node) => {
              const active = showStep >= node.id || showStep >= 5;
              const current = showStep === node.id || (showStep >= 5 && node.id <= 4);
              return (
                <g key={node.id} className={current ? "bj-pulse" : undefined} opacity={active ? 1 : 0.28}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="46"
                    fill={current ? "#1c140e" : "#0f1620"}
                    stroke={current ? C.warm : "#475569"}
                    strokeWidth={current ? 3 : 1.6}
                  />
                  <circle cx={node.x} cy={node.y - 18} r="14" fill={current ? C.warm : "#334155"} />
                  <L x={node.x} y={node.y - 13} fill="#0f172a" size={13} weight={900} anchor="middle">
                    {String(node.id)}
                  </L>
                  {node.label.split("\n").map((line, i) => (
                    <L
                      key={line}
                      x={node.x}
                      y={node.y + 8 + i * 16}
                      fill={C.fg}
                      size={12}
                      weight={700}
                      anchor="middle"
                    >
                      {line}
                    </L>
                  ))}
                </g>
              );
            })}

            {showStep >= 5 && (
              <>
                <rect
                  x="280"
                  y="210"
                  width="340"
                  height="56"
                  rx="10"
                  fill="#0d151c"
                  stroke={C.warm}
                  strokeWidth="1.6"
                />
                <L x="450" y="235" fill={C.warm} size={14} weight={800} anchor="middle">
                  Bjerknes-tilbakekobling (El Niño)
                </L>
                <L x="450" y="252" fill={C.muted} size={12} anchor="middle">
                  Hav og luft må begge være med
                </L>
              </>
            )}

            {/* Skjult m for unused warning avoidance via marker refs already used */}
            <g opacity="0">
              <Arrow d="M 0 0 L 1 0" marker={m.warm} color={C.warm} width={1} />
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}
