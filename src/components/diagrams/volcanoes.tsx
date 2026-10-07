import { useEffect, useId, useState, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { useAnimationPlaying, useStepCycle } from "./use-motion";
import { C, Diagram, L, PlayPauseToggle } from "./svg-kit";

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
    <div className="max-w-full overflow-x-auto">
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={label}
        className="h-auto w-full max-sm:min-w-[44rem]"
      >
        <rect width="100%" height="100%" fill={C.bg} rx="10" />
        {children}
      </svg>
    </div>
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

export function VolcanoTypesDiagram() {
  const uid = useId().replace(/:/g, "");
  const coneClip = `${uid}-cone`;
  const scoria = `${uid}-scoria`;
  return (
    <FigureFrame
      heading="Magmakjemi avgjør form og eksplosivitet"
      caption="Tre hovedtyper: skjoldvulkan, stratovulkan og sinderkjegle. Skjoldvulkanen bygges av tynne lavadekker. Stratovulkanen er lagdelt, med vekslende lava og aske/tefra. Sinderkjeglen er en mindre haug av slagg og sinder."
    >
      <div data-figure="vulkantyper" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="flex flex-col gap-3 rounded-xl border border-border bg-[#10181e] p-3">
          <div>
            <h3 className="text-base font-semibold text-[#e0b48a]">Skjoldvulkan</h3>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Effusive utbrudd. Basaltisk lava med lav viskositet.
            </p>
          </div>
          <svg viewBox="0 0 320 150" className="h-auto w-full" role="img" aria-label="Skjoldvulkan med slake sider">
            <rect width="320" height="150" fill={C.bg} rx="8" />
            <path d="M16 118 Q160 78 304 118 L304 132 L16 132 Z" fill="#3a332c" stroke={C.sand} strokeWidth="1.4" />
            <path d="M28 116 Q160 96 292 116" fill="none" stroke="#e0b48a" strokeWidth="3" />
            <path d="M48 112 Q160 98 272 112" fill="none" stroke="#c9844a" strokeWidth="2.4" />
            <path d="M78 108 Q160 100 242 108" fill="none" stroke="#e7c4a4" strokeWidth="2" />
            <ellipse cx="160" cy="96" rx="12" ry="3.5" fill="#1a1410" stroke="#e0894a" strokeWidth="1" />
          </svg>
          <FactList
            rows={[
              ["Helning", "Slak, ofte 2° til 10°"],
              ["Mekanisme", "Lavaen kan renne langt før den størkner. Vulkanen bygges av mange tynne lavadekker."],
              ["Eksempler", "Mauna Loa og Kilauea på Hawaii"],
            ]}
          />
        </article>

        <article className="flex flex-col gap-3 rounded-xl border border-border bg-[#10181e] p-3">
          <div>
            <h3 className="text-base font-semibold text-[#d07a7a]">Stratovulkan</h3>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Bratt kjegle. Seig magma som sjelden flyter langt.
            </p>
          </div>
          <svg viewBox="0 0 320 168" className="h-auto w-full" role="img" aria-label="Lagdelt stratovulkan">
            <rect width="320" height="168" fill={C.bg} rx="8" />
            <defs>
              <clipPath id={coneClip}>
                <path d="M78 142 L148 46 L160 58 L172 46 L242 142 Z" />
              </clipPath>
            </defs>
            <g clipPath={`url(#${coneClip})`}>
              <rect x="70" y="46" width="180" height="16" fill="#8a4b32" />
              <rect x="70" y="62" width="180" height="14" fill="#5c564e" />
              <rect x="70" y="76" width="180" height="14" fill="#c46a3a" />
              <rect x="70" y="90" width="180" height="14" fill="#6a6258" />
              <rect x="70" y="104" width="180" height="14" fill="#e0894a" />
              <rect x="70" y="118" width="180" height="24" fill="#4a3d38" />
            </g>
            <path d="M78 142 L148 46 L160 58 L172 46 L242 142" fill="none" stroke="#6b4a42" strokeWidth="1.4" />
            <ellipse cx="160" cy="32" rx="26" ry="10" fill="#6b7280" opacity="0.9" />
            <ellipse cx="148" cy="24" rx="16" ry="8" fill="#9ca3af" opacity="0.75" />
            <path d="M148 58 Q112 96 96 130" fill="none" stroke={C.low} strokeWidth="3.5" strokeDasharray="5 3" />
          </svg>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-snug text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-sm bg-[#e0894a]" />
              Lava
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-sm bg-[#6a6258]" />
              Aske/tefra
            </li>
            <li>Grå sky: askesøyle</li>
            <li>Stiplet rød: pyroklastisk strøm</li>
          </ul>
          <FactList
            rows={[
              ["Helning", "Bratt, ofte 25° til 35°"],
              ["Lag", "Vekslende størknet seig lava, aske, pimpstein og tefra"],
              ["Eksempler", "Fuji, Vesuv, Mount St. Helens, Pinatubo og Beerenberg på Jan Mayen"],
            ]}
          />
        </article>

        <article className="flex flex-col gap-3 rounded-xl border border-border bg-[#10181e] p-3">
          <div>
            <h3 className="text-base font-semibold text-[#f0c9a0]">Sinderkjegle</h3>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Mindre, bratt haug med krater i toppen.
            </p>
          </div>
          <svg viewBox="0 0 320 168" className="h-auto w-full" role="img" aria-label="Sinderkjegle med krater og lavafontene">
            <rect width="320" height="168" fill={C.bg} rx="8" />
            <defs>
              <pattern id={scoria} width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.15" fill="#6b3a2a" />
              </pattern>
            </defs>
            <path d="M20 146 H300" stroke="#2a3943" strokeWidth="2" />
            <path d="M118 142 L154 62 L166 74 L178 62 L214 142 Z" fill={`url(#${scoria})`} stroke="#8a5344" strokeWidth="1.4" />
            <path d="M118 142 L154 62 L166 74 L178 62 L214 142 Z" fill="#5a3028" opacity="0.35" />
            <ellipse cx="166" cy="66" rx="16" ry="5" fill="#140e0c" stroke="#e0894a" strokeWidth="1.2" />
            <circle cx="160" cy="40" r="3" fill="#ffb020" />
            <circle cx="172" cy="28" r="2.4" fill="#ff7a18" />
            <circle cx="150" cy="48" r="2.2" fill="#e2e8f0" />
            <circle cx="184" cy="46" r="2" fill="#cbd5e1" />
            <circle cx="142" cy="70" r="2.2" fill="#6b3a2a" />
            <circle cx="192" cy="78" r="2.4" fill="#6b3a2a" />
            <circle cx="136" cy="96" r="2" fill="#8a5344" />
            <circle cx="198" cy="102" r="2.2" fill="#8a5344" />
          </svg>
          <FactList
            rows={[
              ["Høyde", "Sjelden over 300–400 meter"],
              ["Mekanisme", "Korte, gassdrevne utbrudd. Lavafontener kaster slagg og sinder. Fragmentene størkner i flukten og danner en bratt haug rundt åpningen."],
              ["Eksempel", "Parícutin i Mexico vokste opp på en åker i 1943"],
            ]}
          />
        </article>
      </div>
    </FigureFrame>
  );
}

const CALDERA_STEPS = ["1 Oppbuling", "2 Ringutbrudd", "3 Kollaps", "4 Kratersjø"];

function columnPath(x: number): string {
  return `M ${x - 8} 188 C ${x - 18} 150, ${x - 36} 112, ${x - 48} 86 L ${x + 48} 86 C ${x + 36} 112, ${x + 18} 150, ${x + 8} 188 Z`;
}

export function CalderaFormationDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(4, playing, 3200);

  return (
    <Diagram
      title="Dannelse av en kaldera i fire trinn"
      heading="Kaldera i fire trinn"
      caption="En kaldera er en innsynkning, ikke bare et krater. Den oppstår når et magmakammer tømmes så raskt at taket over kammeret faller ned. Kalderaer er ofte 5–50 km brede. Crater Lake og Santorini er noen kilometer brede. Toba og Yellowstone er titalls kilometer. De største utbruddene kalles ofte supervulkaner (VEI 8)."
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

            {step === 1 ? (
              <g data-caldera-step="1">
                <path d="M40 168 Q380 118 720 168 L720 390 L40 390 Z" fill="#2b241e" />
                <path d="M40 168 Q380 118 720 168" fill="none" stroke="#6b5346" strokeWidth="2" />
                <line x1="230" y1="150" x2="250" y2="250" stroke={C.low} strokeDasharray="4 3" strokeWidth="1.6" />
                <line x1="530" y1="150" x2="510" y2="250" stroke={C.low} strokeDasharray="4 3" strokeWidth="1.6" />
                <ellipse cx="380" cy="310" rx="150" ry="46" fill={C.warm} />
                <L x="380" y="304" anchor="middle" size={14} weight={700} fill="#1a0c08">
                  Gassrik felsisk magma
                </L>
                <L x="380" y="324" anchor="middle" size={13} weight={600} fill="#1a0c08">
                  under høyt trykk
                </L>
                <L x="380" y="96" anchor="middle" size={13} fill={C.fg}>
                  Ringforkastninger dannes under strekk
                </L>
              </g>
            ) : null}

            {step === 2 ? (
              <g data-caldera-step="2">
                <path d="M40 188 H720 V390 H40 Z" fill="#2b241e" />
                <line x1="40" y1="188" x2="720" y2="188" stroke="#6b5346" strokeWidth="2" />
                <line x1="250" y1="188" x2="250" y2="270" stroke={C.low} strokeDasharray="4 3" />
                <line x1="510" y1="188" x2="510" y2="270" stroke={C.low} strokeDasharray="4 3" />
                <g className={playing ? "cald-col" : undefined}>
                  <path d={columnPath(250)} fill="#4b5563" />
                  <path d="M246 188 C242 156, 236 124, 228 100 L272 100 C264 124, 258 156, 254 188 Z" fill="#e0894a" />
                  <ellipse cx="250" cy="78" rx="52" ry="16" fill="#64748b" />
                  <ellipse cx="250" cy="70" rx="34" ry="10" fill="#94a3b8" opacity="0.85" />
                </g>
                <g className={playing ? "cald-col" : undefined}>
                  <path d={columnPath(510)} fill="#4b5563" />
                  <path d="M506 188 C502 156, 496 124, 488 100 L532 100 C524 124, 518 156, 514 188 Z" fill="#e0894a" />
                  <ellipse cx="510" cy="78" rx="52" ry="16" fill="#64748b" />
                  <ellipse cx="510" cy="70" rx="34" ry="10" fill="#94a3b8" opacity="0.85" />
                </g>
                <ellipse cx="380" cy="318" rx="130" ry="40" fill="#3a2418" stroke={C.warm} strokeDasharray="5 3" />
                <ellipse cx="380" cy="332" rx="108" ry="22" fill={C.warm} opacity="0.85" />
                <L x="380" y="336" anchor="middle" size={13} weight={700} fill="#1a0c08">
                  Kammeret tømmes
                </L>
                <L x="380" y="398" anchor="middle" size={13} fill={C.fg}>
                  Askesøyler langs ringforkastningene
                </L>
              </g>
            ) : null}

            {step === 3 ? (
              <g data-caldera-step="3">
                <path d="M40 150 H200 V390 H40 Z" fill="#2b241e" />
                <path d="M560 150 H720 V390 H560 Z" fill="#2b241e" />
                <path d="M200 248 H560 V390 H200 Z" fill="#1a1512" stroke={C.low} strokeWidth="1.6" />
                <line x1="200" y1="140" x2="200" y2="390" stroke={C.low} strokeWidth="2" strokeDasharray="5 3" />
                <line x1="560" y1="140" x2="560" y2="390" stroke={C.low} strokeWidth="2" strokeDasharray="5 3" />
                <L x="380" y="210" anchor="middle" size={14} weight={700} fill={C.fg}>
                  Taket faller ned
                </L>
                <L x="380" y="100" anchor="middle" size={13} fill={C.sand}>
                  Ofte 5–50 km bred
                </L>
              </g>
            ) : null}

            {step === 4 ? (
              <g data-caldera-step="4">
                <path d="M40 150 H200 V390 H40 Z" fill="#2b241e" />
                <path d="M560 150 H720 V390 H560 Z" fill="#2b241e" />
                <path d="M200 248 H560 V390 H200 Z" fill="#1a1512" />
                <path d="M214 196 H546 V236 H214 Z" fill="#0369a1" opacity="0.88" />
                <ellipse cx="470" cy="214" rx="28" ry="11" fill="#3a2f28" stroke={C.warm} strokeWidth="1.5" />
                <L x="300" y="220" anchor="middle" size={13} weight={700} fill="#e0f2fe">
                  Kratersjø
                </L>
                <L x="470" y="184" anchor="middle" size={13} weight={700} fill={C.sand}>
                  Oppadstigende kuppel
                </L>
                <ellipse cx="380" cy="320" rx="90" ry="28" fill={C.warm} opacity="0.9" />
                <L x="380" y="324" anchor="middle" size={12} weight={700} fill="#1a0c08">
                  Ny magma stiger
                </L>
              </g>
            ) : null}
          </g>
        </>
      )}
    </Diagram>
  );
}

export function VolcanoEruptionAnatomyDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  return (
    <Diagram
      title="Pliniansk utbrudd med paraplysky og pyroklastisk tetthetsstrøm"
      heading="Pliniansk søyle"
      caption="Fragmenteringsnivået ligger i tilførselsrøret, der trykket i gassboblene river smelten i stykker. Like over krateret skyver gassen blandingen ut. Søylen suger inn luft og stiger. Når den ikke stiger lenger, brer asken seg ut som en paraplysky. Blir søylen for tung, faller den ned som en pyroklastisk tetthetsstrøm. En lahar er aske, stein og vann i en dal."
      viewBox="0 0 900 500"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
    >
      {() => (
        <>
          <style>{`
            .plin-col, .plin-umb, .plin-pdc { transform-box: fill-box; }
            .plin-col { transform-origin: center bottom; }
            .plin-umb { transform-origin: center center; }
            .plin-pdc { transform-origin: 430px 250px; }
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
          <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figure="pliniansk">
            <rect x="16" y="16" width="868" height="150" fill="#0e1722" rx="8" />
            <line x1="16" y1="96" x2="884" y2="96" stroke={C.dim} strokeDasharray="4 4" />
            <L x="28" y="40" size={12} fill={C.muted}>
              Stratosfære
            </L>
            <L x="28" y="118" size={12} fill={C.muted}>
              Troposfære
            </L>

            <path d="M16 372 H884 V470 H16 Z" fill="#231e1a" />
            <path d="M250 372 L430 250 Q470 264 510 250 L700 372 Z" fill="#382e29" stroke="#52433c" strokeWidth="1.6" />

            <ellipse cx="470" cy="430" rx="78" ry="24" fill={C.warm} />
            <L x="470" y="434" anchor="middle" size={12} weight={700} fill="#1a0c08">
              Magmakammer
            </L>

            <path
              d="M458 408 L452 340 L442 252 L498 252 L488 340 L482 408 Z"
              fill="#ff7a18"
            />
            <path d="M448 318 L492 318 L490 334 L450 334 Z" fill={C.sand} />
            <line x1="448" y1="326" x2="210" y2="326" stroke={C.sand} strokeWidth="1.4" />
            <rect x="16" y="300" width="188" height="42" rx="5" fill="#14110c" opacity="0.94" />
            <L x="26" y="318" size={13} weight={700} fill={C.sand}>
              Fragmenteringsnivå
            </L>
            <L x="26" y="334" size={12} fill={C.muted}>
              i tilførselsrøret
            </L>

            <L x="300" y="236" anchor="end" size={13} weight={700} fill="#f59e0b">
              Gass-skyvesone
            </L>

            <g className={playing ? "plin-col" : undefined}>
              <path
                d="M438 248 C420 190, 360 140, 250 86 L690 86 C580 140, 520 190, 502 248 Z"
                fill="#475569"
                opacity="0.92"
              />
            </g>
            <g className={playing ? "plin-umb" : undefined}>
              <ellipse cx="470" cy="62" rx="230" ry="24" fill="#334155" />
              <ellipse cx="450" cy="54" rx="150" ry="16" fill="#475569" />
              <L x="470" y="66" anchor="middle" size={15} weight={700} fill="#f8fafc">
                Paraplysky
              </L>
            </g>
            <L x="28" y="146" size={13} weight={700} fill={C.cold}>
              Oppdrift
            </L>

            <g className={playing ? "plin-pdc" : undefined}>
              <path
                d="M430 258 Q340 300 250 340 Q180 364 120 372 L190 372 Q270 350 400 280 Z"
                fill={C.low}
                opacity="0.82"
              />
            </g>
            <rect x="24" y="168" width="214" height="36" rx="5" fill="#140c10" opacity="0.92" />
            <L x="36" y="184" size={12} weight={700} fill={C.low}>
              Pyroklastisk tetthetsstrøm
            </L>
            <L x="36" y="198" size={11} fill={C.muted}>
              200–700 km/t
            </L>

            <path d="M510 258 Q600 310 720 372 L780 372 Q640 300 524 252 Z" fill="#64748b" opacity="0.82" />
            <rect x="690" y="390" width="150" height="28" rx="5" fill="#14110e" opacity="0.92" />
            <L x="765" y="408" anchor="middle" size={12} weight={700} fill={C.sand}>
              Lahar (slamstrøm)
            </L>

            <path d="M600 78 L760 250" stroke={C.muted} strokeDasharray="3 4" />
            <path d="M650 78 L820 230" stroke={C.muted} strokeDasharray="3 4" />
            <L x="790" y="160" size={12} fill={C.muted}>
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
      "Fart 200–700 km/t. Temperatur 300–800 °C.",
      "Oppstår når deler av askesøylen blir for tung og faller ned langs siden.",
    ],
    example: "Mont Pelée, Saint-Pierre 1902: om lag 29 000 døde, to overlevde. Pompeii i år 79 e.Kr.",
  },
  {
    kind: "lahar",
    title: "2. Lahar",
    points: [
      "Blanding av vulkansk aske, stein og vann som følger elvedaler.",
      "Kan starte når varm tefra smelter snø og is, eller når regn vasker løs fersk aske.",
      "Blandingen er tykk, omtrent som våt betong.",
    ],
    example: "Armero 1985: Nevado del Ruiz. Laharer gikk om lag 50 km. Over 23 000 mennesker mistet livet.",
  },
  {
    kind: "ash",
    title: "3. Askenedfall og luftfart",
    points: [
      "Finkornet aske kan sveve langt. Partikler mindre enn 10 mikrometer.",
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
    example: "Tambora 1815 (VEI 7): 1816 kalles «året uten sommer». Pinatubo 1991: kjøling i om lag tre år, inntil ca. 0,7 °C.",
  },
];

export function VolcanicHazardsDiagram() {
  return (
    <FigureFrame
      heading="Fire vulkanske farer"
      caption="Lavastrømmer beveger seg ofte sakte nok til at folk kan komme seg unna. Kapittelet beskriver pyroklastiske strømmer, laharer, aske som truer luftfarten, og vulkansk vinter. Tsunami som egen vulkansk fare står ikke i dette kapittelet."
    >
      <div data-figure="farer" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {HAZARDS.map((hazard) => (
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
  return (
    <svg viewBox="0 0 220 280" className="mx-auto h-auto w-full max-w-xs" role="img" aria-label={mode === "fluid" ? "Lettflytende magma" : "Seig magma"}>
      <rect width="220" height="280" fill={C.bg} rx="8" />
      <L x="110" y="22" anchor="middle" size={12} fill={C.muted}>
        {level < 34 ? "Høyt trykk" : level < 68 ? "Trykket faller" : "Lavt trykk"}
      </L>
      <path d="M96 250 L88 46 H132 L124 250 Z" fill={melt} opacity="0.9" />
      <path d="M78 46 H142 L136 58 H84 Z" fill="#2b241e" />
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
  { vei: 0, volume: "< 10 000 m³", height: "< 100 m", klass: "Hawaiisk (effusiv)", freq: "Konstant", examples: "Kilauea, Fagradalsfjall (Island)", bar: 8 },
  { vei: 1, volume: "> 10 000 m³", height: "0,1–1 km", klass: "Hawaiisk / strombolsk", freq: "Daglig", examples: "Stromboli (Italia)", bar: 16 },
  { vei: 2, volume: "> 1 mill. m³", height: "1–5 km", klass: "Strombolsk / vulkansk", freq: "Ukentlig", examples: "Galeras (Colombia)", bar: 28 },
  { vei: 3, volume: "> 10 mill. m³", height: "3–15 km", klass: "Vulkansk / subpliniansk", freq: "Månedlig", examples: "Nevado del Ruiz (1985)", bar: 42 },
  { vei: 4, volume: "> 0,1 km³", height: "10–25 km", klass: "Subpliniansk / pliniansk", freq: "Om lag 1 per år", examples: "Eyjafjallajökull (2010)", bar: 56 },
  { vei: 5, volume: "> 1 km³", height: "20–35 km", klass: "Pliniansk", freq: "Om lag 1 per 12 år", examples: "Mount St. Helens (1980), Vesuv (79)", bar: 70 },
  { vei: 6, volume: "> 10 km³", height: "> 30 km", klass: "Ultrapliniansk / kaldera", freq: "Om lag 1 per 100 år", examples: "Pinatubo (1991), Krakatau (1883)", bar: 82 },
  { vei: 7, volume: "> 100 km³", height: "> 35 km", klass: "Kaldera", freq: "Om lag 1 per 1000 år", examples: "Tambora (1815), Santorini (ca. 1600 f.Kr.)", bar: 92 },
  { vei: 8, volume: "> 1000 km³", height: "> 45 km", klass: "Supervulkan", freq: "Om lag 1 per 50 000 år", examples: "Toba (74 000 år siden), Yellowstone", bar: 100 },
];

export function VeiScaleDiagram() {
  const [vei, setVei] = useState(4);
  const row = VEI_STEPS[vei] ?? VEI_STEPS[0];
  return (
    <FigureFrame
      heading="Vulkansk eksplosivitetsindeks"
      caption="Chris Newhall og Steve Self innførte skalaen i 1982. Hvert trinn over VEI 1 betyr omtrent ti ganger mer utkastet tefra. Søylehøyden i stolpene følger intervallene i tabellen, ikke en påfunnet nøyaktig verdi."
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
            <div><dt className="text-muted-foreground">Klassifisering</dt><dd className="font-medium">{row.klass}</dd></div>
            <div><dt className="text-muted-foreground">Frekvens globalt</dt><dd className="font-medium">{row.freq}</dd></div>
            <div className="sm:col-span-2"><dt className="text-muted-foreground">Eksempler</dt><dd className="font-medium">{row.examples}</dd></div>
          </dl>
        </div>
      </div>
    </FigureFrame>
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
          <svg viewBox="0 0 320 180" className="mt-2 h-auto w-full" role="img" aria-label="Eksplosivt utbrudd under isbre">
            <rect width="320" height="180" fill={C.bg} rx="8" />
            <line x1="16" y1="36" x2="304" y2="36" stroke={C.dim} strokeDasharray="3 3" />
            <L x="20" y="28" size={11} fill={C.muted}>Stratosfære</L>
            <path d="M70 150 L150 78 L170 78 L250 150 Z" fill="#3a4550" />
            <path d="M96 132 Q160 96 224 132 L210 150 L110 150 Z" fill="#dbeafe" opacity="0.85" />
            <path d="M154 78 C140 40, 120 24, 70 20 L250 20 C200 24, 180 40, 166 78 Z" fill="#64748b" />
            <L x="160" y="168" anchor="middle" size={12} fill={C.fg}>Isbre og askesøyle</L>
          </svg>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>Intermediær magma, SiO₂ ca. 58 %, under en isbre.</li>
            <li>Freatomagmatisme: magmaen traff en 200 meter tykk isbre. Smelten ble sprengt i glasspartikler mindre enn 10 mikrometer.</li>
            <li>Over 100 000 flygninger ble kansellert. 10 millioner reisende ble stående igjen.</li>
            <li>Et stabilt høytrykk over Nord-Atlanteren førte asken mot Norge og Nord-Europa.</li>
          </ul>
        </article>
        <article className="rounded-xl border border-border bg-[#10181e] p-3">
          <h3 className="text-base font-semibold text-foreground">Fagradalsfjall</h3>
          <p className="mt-1 text-sm text-muted-foreground">Effusivt. Basalt på tørt land.</p>
          <svg viewBox="0 0 320 180" className="mt-2 h-auto w-full" role="img" aria-label="Effusivt sprekkeutbrudd">
            <rect width="320" height="180" fill={C.bg} rx="8" />
            <line x1="16" y1="36" x2="304" y2="36" stroke={C.dim} strokeDasharray="3 3" />
            <L x="20" y="28" size={11} fill={C.muted}>Stratosfære</L>
            <path d="M24 140 H296 V158 H24 Z" fill="#2b241e" />
            <path d="M70 140 Q160 120 250 140" fill="none" stroke="#e0894a" strokeWidth="5" />
            <path d="M150 140 L146 96 H156 L160 118 L168 90 H176 L170 140 Z" fill="#ffb020" />
            <L x="160" y="168" anchor="middle" size={12} fill={C.fg}>Fontene og lavastrøm</L>
          </svg>
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
            <L x="180" y="28" anchor="middle" size={12} weight={700}>2272 m o.h.</L>
            <L x="300" y="150" size={11} fill={C.warm}>Lava til havs</L>
          </svg>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>Norges eneste aktive vulkan over havet. Isdekket stratovulkan, 2272 m o.h.</li>
            <li>Utbruddene veksler mellom lavastrømmer og tefra.</li>
            <li>Dekket av isbreer, blant annet Weyprechtbreen og Kronprins Olavs bre.</li>
            <li>Siste utbrudd var i september 1970 og januar 1985. Basaltisk lava rant ut i havet. Utbruddet i 1970 la til 4 km² land.</li>
          </ul>
        </article>
      </div>
    </FigureFrame>
  );
}

export function VolcanicWinterDiagram() {
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
          <rect x="0" y="0" width="760" height="108" fill="#102033" />
          <L x="16" y="22" size={13} fill={C.cold}>Stratosfære</L>
          <L x="150" y="22" size={13} weight={700} fill={C.sand}>SO₂</L>
          <L x="250" y="22" size={13} weight={700} fill={C.teal}>H₂SO₄-dråper</L>
          <L x="470" y="22" size={13} fill={C.fg}>Sprer sollys</L>
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
          <circle cx="690" cy="58" r="16" fill="#f3f6f8" />
          <path d="M674 70 L500 150" stroke="#f3f6f8" strokeWidth="1.5" opacity="0.35" />
          <line x1="0" y1="108" x2="760" y2="108" stroke={C.dim} strokeDasharray="4 4" />
          <L x="16" y="128" size={13} fill={C.muted}>Troposfære</L>
          <path d="M40 230 L90 168 L130 230 Z" fill="#3a332c" />
          <path d="M104 168 C96 140, 88 124, 80 112" fill="none" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
          <circle className={playing ? "vw-ash" : undefined} cx="150" cy="176" r="3" fill="#cbd5e1" />
          <circle className={playing ? "vw-ash" : undefined} cx="168" cy="196" r="2.4" fill="#94a3b8" />
          <L x="186" y="188" size={13} fill={C.muted}>Grov aske faller ut</L>
          <rect x="0" y="236" width="760" height="64" fill="#1c1814" />
          <L x="24" y="274" size={15} weight={700} fill={C.fg}>
            Mindre sol når bakken
          </L>
        </WideSvg>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <p className="rounded-lg border border-border p-3 text-sm leading-relaxed">
            Tambora, april 1815 (VEI 7). Svovel kom opp i stratosfæren. 1816 kalles «året uten sommer». Frost og snø i juli og august ødela avlinger i Europa og Nord-Amerika.
          </p>
          <p className="rounded-lg border border-border p-3 text-sm leading-relaxed">
            Pinatubo 1991. Jordoverflaten kjølte i om lag tre år, med inntil ca. 0,7 °C på det meste.
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

