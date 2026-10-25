import { useAnimationPlaying, useStepCycle } from "./use-motion";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";

/**
 * 1. AtmosphericColumnDiagram
 * Viser atmosfærens luftsøyle, eksponentiell molekyltetthet, trykkfall med høyden og landskapssilhuett.
 */
export function AtmosphericColumnDiagram() {
  return (
    <Diagram
      title="Luftsøylen og trykkfall med høyden"
      heading="Luftsøylen: Lufttrykk er vekten av lufta over deg"
      caption="Lufttrykket er vekten av hele luftsøylen over et sted. Lufta er tettest nær bakken, fordi de nederste lagene bærer vekten av lufta over. Nær bakken faller trykket med om lag 1 hPa for hver 8. meter. I om lag 5,5 km høyde er trykket ca. 500 hPa, og halvparten av lufta i atmosfæren ligger under denne høyden."
      viewBox="-140 0 1070 540"
      wide
      scroll
    >
      {(m) => (
        <>
          <defs>
            {/* Atmosfæreglød fra mørk stratosfære ned til bakken */}
            <linearGradient id="col-sky-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080c10" />
              <stop offset="25%" stopColor="#101a24" />
              <stop offset="55%" stopColor="#172b3c" />
              <stop offset="85%" stopColor="#1e3a52" />
              <stop offset="100%" stopColor="#2a4860" />
            </linearGradient>

            {/* Søylegradient */}
            <linearGradient id="col-column-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>

            {/* Fjellgradient */}
            <linearGradient id="col-mountain-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3c4c59" />
              <stop offset="40%" stopColor="#253540" />
              <stop offset="100%" stopColor="#18232c" />
            </linearGradient>

            {/* Snøbregradient */}
            <linearGradient id="col-snow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#94b8d7" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsatmosfære */}
          <rect x="-160" y="20" width="1080" height="490" rx="8" fill="url(#col-sky-bg)" />

          {/* Fjell- og terrengsilhuett i bakgrunnen */}
          {/* Fjellsilhuett i bakgrunnen, uten høyde- eller trykktall */}
          <path
            d="M 520 440 L 590 125 L 620 180 L 660 440 Z"
            fill="#182633"
            stroke="#2a3d4f"
            strokeWidth="1.2"
          />
          <path d="M 575 155 L 590 125 L 608 158 Z" fill="url(#col-snow-grad)" />

          {/* Norsk høyfjell (2500 m) */}
          <path
            d="M 410 440 L 460 335 L 485 365 L 530 440 Z"
            fill="url(#col-mountain-grad)"
            stroke="#3a4d5e"
            strokeWidth="1.2"
          />
          <path d="M 450 350 L 460 335 L 472 350 Z" fill="url(#col-snow-grad)" />

          {/* Havoverflate og kystlandskap nederst */}
          <rect x="-160" y="440" width="1080" height="60" rx="4" fill="#0f1920" />
          <path d="M -160 440 Q 200 435 370 440 L 370 500 L -160 500 Z" fill="#132635" />
          <line x1="-160" y1="440" x2="910" y2="440" stroke="#334e68" strokeWidth="2" />

          {/* Rutefly ved tropopausen (11 km) */}
          <g transform="translate(680, 75)">
            <path
              d="M 0 0 L 25 -2 L 32 -7 L 35 -7 L 30 0 L 48 2 L 53 -3 L 56 -3 L 53 4 L 30 4 L 22 14 L 18 14 L 20 4 L 0 2 Z"
              fill="#e2e8f0"
              opacity="0.9"
            />
            <line x1="-80" y1="1" x2="-5" y2="1" stroke="#ffffff" strokeWidth="1.8" opacity="0.6" />
            <L x="65" y="5" fill={C.teal} size={11} weight={700}>
              Passasjerfly i øvre troposfære
            </L>
          </g>

          {/* Fjell-etiketter */}
          <L x="590" y="112" fill={C.muted} size={10.5} anchor="middle">
            Høyfjell
          </L>
          <L x="460" y="325" fill={C.muted} size={10.5} anchor="middle">
            Fjell
          </L>

          {/* SELVE LUFTSØYLEN: 1 m² prisme / søyle */}
          <g transform="translate(200, 0)">
            {/* 3D toppflate av luftsøylen ved tropopausen */}
            <polygon points="0,70 30,55 130,55 100,70" fill="#38bdf8" opacity="0.35" />

            {/* Søylekropp */}
            <rect
              x="0"
              y="70"
              width="100"
              height="370"
              fill="url(#col-column-grad)"
              stroke="#38bdf8"
              strokeWidth="1.6"
              strokeDasharray="4 2"
            />
            {/* 3D sidevegg */}
            <polygon
              points="100,70 130,55 130,425 100,440"
              fill="#1e3a52"
              opacity="0.5"
              stroke="#38bdf8"
              strokeWidth="1"
            />

            {/* Eksponentiell gassmolekylfordeling */}
            {Array.from({ length: 90 }).map((_, i) => {
              const rx = 6 + (i * 17) % 88;
              const ry = 385 + (i * 7) % 52;
              return <circle key={`m1-${i}`} cx={rx} cy={ry} r={1.5} fill="#bae6fd" opacity={0.8} />;
            })}
            {Array.from({ length: 55 }).map((_, i) => {
              const rx = 6 + (i * 23) % 88;
              const ry = 265 + (i * 11) % 115;
              return <circle key={`m2-${i}`} cx={rx} cy={ry} r={1.3} fill="#7dd3fc" opacity={0.65} />;
            })}
            {Array.from({ length: 28 }).map((_, i) => {
              const rx = 8 + (i * 31) % 84;
              const ry = 75 + (i * 19) % 180;
              return <circle key={`m3-${i}`} cx={rx} cy={ry} r={1.1} fill="#38bdf8" opacity={0.4} />;
            })}

            {/* Grunnflate: 1 m² på bakken */}
            <polygon
              points="0,440 30,425 130,425 100,440"
              fill="#f59e0b"
              opacity="0.8"
              stroke="#fbbf24"
              strokeWidth="1.8"
            />
            <L x="50" y="455" fill="#fbbf24" size={12} weight={800} anchor="middle">
              1 m² grunnflate
            </L>

            {/* Tyngdekraftvektor som presser hele søylen ned */}
            <Arrow d="M 50 85 L 50 425" marker={m.warm} color={C.warm} width={3.6} />
            <rect x="2" y="232" width="96" height="36" rx="4" fill="#0f172a" opacity="0.9" />
            <L x="50" y="248" fill={C.warm} size={11} weight={800} anchor="middle">
              Tyngdekraft
            </L>
            <L x="50" y="263" fill={C.fg} size={10} anchor="middle">
              Lufta har masse
            </L>
          </g>

          {/* HØYDENIVÅER OG TRYKKSKALA PÅ VENSTRE SIDE */}
          <line x1="180" y1="70" x2="200" y2="70" stroke={C.teal} strokeWidth="2" />
          <line x1="70" y1="70" x2="180" y2="70" stroke={C.teal} strokeDasharray="3 3" opacity="0.7" />
          <L x="52" y="58" fill={C.teal} size={15} weight={800} anchor="end">
            Tropopausen
          </L>
          <L x="52" y="80" fill={C.muted} size={12} anchor="end">
            ca. 8–11 km over Norge
          </L>

          <line x1="180" y1="250" x2="200" y2="250" stroke={C.sand} strokeWidth="2" />
          <line x1="70" y1="250" x2="180" y2="250" stroke={C.sand} strokeDasharray="4 3" opacity="0.8" />
          <L x="52" y="238" fill={C.sand} size={15} weight={800} anchor="end">
            ca. 5,5 km
          </L>
          <L x="52" y="260" fill={C.warm} size={13} weight={800} anchor="end">
            ca. 500 hPa
          </L>
          <L x="52" y="280" fill={C.muted} size={12} anchor="end">
            Halvparten av lufta ligger under
          </L>

          <line x1="180" y1="440" x2="200" y2="440" stroke="#38bdf8" strokeWidth="2.4" />
          <L x="52" y="424" fill={C.fg} size={15} weight={800} anchor="end">
            0 moh. (Havnivå)
          </L>
          <L x="52" y="448" fill="#38bdf8" size={14} weight={800} anchor="end">
            Lufta er tettest her
          </L>
          <L x="52" y="470" fill={C.muted} size={12} anchor="end">
            Gjennomsnitt ved havnivå
          </L>

          {/* HØYRE SIDE: PEDAGOGISKE FORKLARINGSBOKSER & BAROMETER */}
          <g transform="translate(560, 180)">
            <rect
              x="0"
              y="0"
              width="330"
              height="80"
              rx="8"
              fill="#111d27"
              stroke="#22394d"
              strokeWidth="1.5"
            />
            <L x="16" y="24" fill={C.warm} size={13} weight={800}>
              Hva er lufttrykk?
            </L>
            <L x="16" y="44" fill={C.fg} size={12} weight={700}>
              Vekten av luftsøylen over stedet.
            </L>
            <L x="16" y="62" fill={C.muted} size={11}>
              Trykket måles i hektopascal (hPa).
            </L>

            <rect
              x="0"
              y="92"
              width="330"
              height="96"
              rx="8"
              fill="#111d27"
              stroke="#22394d"
              strokeWidth="1.5"
            />
            <L x="16" y="115" fill={C.teal} size={13} weight={800}>
              Trykket avtar med høyden
            </L>
            <L x="16" y="134" fill={C.fg} size={11.5}>
              Luft er en gass og kan presses sammen. De
            </L>
            <L x="16" y="150" fill={C.fg} size={11.5}>
              nederste lagene bærer lufta over seg.
            </L>
            <L x="16" y="168" fill={C.sand} size={11.5} weight={700}>
              Nær bakken: om lag 1 hPa per 8 meter.
            </L>

            <rect
              x="0"
              y="200"
              width="330"
              height="75"
              rx="8"
              fill="#111d27"
              stroke="#22394d"
              strokeWidth="1.5"
            />
            <L x="16" y="223" fill="#a5f3fc" size={13} weight={800}>
              Halvparten av lufta
            </L>
            <L x="16" y="242" fill={C.fg} size={11.5}>
              I om lag 5,5 km høyde er trykket
            </L>
            <L x="16" y="259" fill={C.fg} size={11.5}>
              halvert, til ca. 500 hPa.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. RelativePressureDiagram
 * Viser at lufttrykk er relativt – samme tallverdi (1015 hPa) kan være både L og H.
 * Pedagogikk (NH): PGF rett inn/ut → Coriolis avbøyer til høyre for bevegelsen
 * → gradientvind rundt → friksjon gir spiral + luftsøyle. Coriolis alene er IKKE spiralen.
 */
const REL_STEPS = [
  "1 Relativt",
  "2 Trykkgradient",
  "3 Coriolis avbøyer",
  "4 Rundt L/H",
  "5 Spiral og søyle",
];

const REL_STATUS = [
  "Samme tall (1015 hPa): lavtrykk på kart A, høytrykk på kart B – alt er relativt til omgivelsene.",
  "Trykkgradientkraften (stiplet oransje) driver lufta rett inn mot L og rett ut fra H.",
  "Coriolis avbøyer til høyre for den pågående bevegelsen (NH) – banen krummer, men dette er ikke den ferdige spiralen.",
  "PGF peker alltid inn (L) / ut (H). Coriolis til høyre gir balanse: vind rundt L mot klokken, rundt H med klokken.",
  "Nær bakken gir friksjon litt innspiraling (L) / utspiraling (H). Under: luftsøyla med stigning / nedsynking.",
];

function RelStepPicker({
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

/** Luftpakke: prikk + valgfri etikett. */
function RelParcel({
  cx,
  cy,
  label,
  labelX,
  labelY,
}: {
  cx: number;
  cy: number;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="5.5" fill={C.white} stroke="#0d151c" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="2.2" fill="#0d151c" />
      {label ? (
        <L x={labelX ?? cx + 10} y={labelY ?? cy - 8} fill={C.fg} size={10} weight={700}>
          {label}
        </L>
      ) : null}
    </g>
  );
}

export function RelativePressureDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(5, playing, 3600);
  // Reduced-motion: pause til start → hopp til sluttbilde (steg 5).
  const showStep = !playing && motion.reduced ? 5 : step;
  const showPgf = showStep === 2;
  const showCoriolisBend = showStep === 3;
  const showAround = showStep === 4;
  const showSpiral = showStep >= 5;
  const showColumn = showStep >= 5;

  return (
    <Diagram
      title="Trykk er relativt: Samme verdi kan være lavtrykk eller høytrykk"
      heading="Trykk er relativt: 1015 hPa kan være lavtrykk eller høytrykk"
      caption="Et lavtrykk og et høytrykk er alltid definert i forhold til områdene rundt. På kart A er et senter med 1015 hPa et lavtrykk (L), fordi det er omgitt av høyere trykk på 1025 hPa. Lufta strømmer inn, stiger, og det dannes skyer. På kart B er det samme trykket et høytrykk (H), fordi det ligger mellom lavtrykk på 995 hPa. Lufta strømmer ut, synker, og det blir ofte tørt og klart."
      viewBox="0 0 940 700"
      wide
      scroll
      action={
        <PlayPauseToggle
          isPlaying={playing}
          onToggle={motion.toggle}
          name="relativt trykk"
        />
      }
      toolbar={
        <>
          <RelStepPicker labels={REL_STEPS} step={showStep} onStep={setStep} />
          <span className="text-xs text-muted-foreground max-w-xl">
            {playing ? REL_STATUS[showStep - 1] : motion.reduced ? REL_STATUS[4] : "Pause stopper på valgt trinn"}
          </span>
        </>
      }
    >
      {(m) => (
        <>
          <style>{`
            .rel-spin-ccw, .rel-spin-cw { transform-box: fill-box; transform-origin: center; }
            .motion-unlocked .rel-spin-ccw {
              animation: rel-spin-ccw 14s linear infinite;
            }
            .motion-unlocked .rel-spin-cw {
              animation: rel-spin-cw 16s linear infinite;
            }
            .motion-unlocked .rel-rise {
              animation: rel-flow-up 2.4s ease-in-out infinite;
            }
            .motion-unlocked .rel-sink {
              animation: rel-flow-down 2.4s ease-in-out infinite;
            }
            .motion-unlocked .rel-dash-flow {
              animation: rel-dash 1.6s linear infinite;
            }
            .motion-unlocked .rel-parcel-pulse {
              animation: rel-parcel 1.8s ease-in-out infinite;
            }
            @keyframes rel-spin-ccw { to { transform: rotate(-360deg); } }
            @keyframes rel-spin-cw { to { transform: rotate(360deg); } }
            @keyframes rel-flow-up {
              0%, 100% { transform: translateY(6px); opacity: 0.55; }
              50% { transform: translateY(-4px); opacity: 1; }
            }
            @keyframes rel-flow-down {
              0%, 100% { transform: translateY(-6px); opacity: 0.55; }
              50% { transform: translateY(4px); opacity: 1; }
            }
            @keyframes rel-dash { to { stroke-dashoffset: -28; } }
            @keyframes rel-parcel {
              0%, 100% { opacity: 0.75; }
              50% { opacity: 1; }
            }
          `}</style>

          <defs>
            <radialGradient id="rel-low-rad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a151b" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#2c141a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#111822" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="rel-high-rad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f343a" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#12272e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#111822" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="rel-col-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1018" />
              <stop offset="55%" stopColor="#1a2d3e" />
              <stop offset="100%" stopColor="#243e54" />
            </linearGradient>
            <linearGradient id="rel-cloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-step={showStep}>
            <line
              x1="470"
              y1="28"
              x2="470"
              y2="400"
              stroke={C.dim}
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            {/* ─── KART A: 1015 hPa SOM LAVTRYKK ─── */}
            <g transform="translate(0, 0)">
              <rect x="35" y="24" width="415" height="300" rx="8" fill="#0d151c" stroke="#1d2d3d" strokeWidth="1.5" />
              <circle cx="242" cy="175" r="118" fill="url(#rel-low-rad)" />

              <path
                d="M 120 175 C 120 110, 170 78, 242 78 C 320 78, 365 115, 365 175 C 365 235, 310 272, 242 272 C 170 272, 120 235, 120 175 Z"
                fill="none"
                stroke="#475569"
                strokeWidth="1.8"
              />
              <rect x="46" y="92" width="78" height="22" rx="4" fill="#0d151c" />
              <L x="85" y="108" fill={C.muted} size={12} anchor="middle" weight={700}>
                1025 hPa
              </L>

              <path
                d="M 158 175 C 158 132, 192 112, 242 112 C 295 112, 328 138, 328 175 C 328 212, 290 238, 242 238 C 190 238, 158 212, 158 175 Z"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <circle cx="242" cy="175" r="36" fill="#3b151b" stroke={C.low} strokeWidth="2.5" />
              <L x="242" y="180" fill={C.low} size={24} weight={900} anchor="middle">
                L
              </L>
              <L x="242" y="202" fill="#fca5a5" size={12} weight={800} anchor="middle">
                1015 hPa
              </L>

              <rect x="36" y="25" width="413" height="48" fill="#0d151c" />
              <L x="242" y="42" size={14} weight={800} anchor="middle" fill={C.low}>
                KART A: Lavtrykkssenter (1015 hPa)
              </L>
              <L x="242" y="62" size={12} fill={C.fg} anchor="middle">
                Omgitt av høyere trykk (1025 hPa)
              </L>

              {/* Steg 2: PGF rett inn */}
              {showPgf ? (
                <g>
                  <Arrow d="M 130 175 L 190 175" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <Arrow d="M 355 175 L 295 175" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <Arrow d="M 242 92 L 242 138" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <Arrow d="M 242 258 L 242 212" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <L x="242" y="290" fill={C.warm} size={12} weight={800} anchor="middle">
                    Trykkgradientkraften (PGF) → rett inn mot L
                  </L>
                </g>
              ) : null}

              {/* Steg 3: Coriolis avbøyer den pågående innstrømningen (IKKE ferdig spiral) */}
              {showCoriolisBend ? (
                <g className={playing ? "rel-parcel-pulse" : undefined}>
                  {/* Pakke vestfra: V østover → CF sørover (høyre) */}
                  <Arrow d="M 128 175 L 195 175" marker={m.warm} color={C.warm} width={1.6} dash="4 3" />
                  <L x="148" y="166" fill={C.warm} size={9} weight={700}>
                    PGF
                  </L>
                  <path
                    d="M 128 175 L 168 175 Q 198 175 208 205"
                    fill="none"
                    stroke={C.white}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    markerEnd={`url(#${m.fg})`}
                  />
                  <Arrow d="M 168 175 L 168 205" marker={m.teal} color={C.teal} width={2.2} />
                  <L x="176" y="198" fill={C.teal} size={9} weight={800}>
                    CF
                  </L>
                  <RelParcel cx={128} cy={175} label="luft" labelX={108} labelY={168} />

                  {/* Pakke nordfra: V sørover → CF vestover */}
                  <Arrow d="M 242 95 L 242 145" marker={m.warm} color={C.warm} width={1.6} dash="4 3" />
                  <path
                    d="M 242 95 L 242 132 Q 242 158 212 168"
                    fill="none"
                    stroke={C.white}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    markerEnd={`url(#${m.fg})`}
                  />
                  <Arrow d="M 242 132 L 212 132" marker={m.teal} color={C.teal} width={2.2} />
                  <L x="198" y="124" fill={C.teal} size={9} weight={800}>
                    CF
                  </L>
                  <RelParcel cx={242} cy={95} />

                  {/* Pakke østfra: V vestover → CF nordover */}
                  <Arrow d="M 356 175 L 300 175" marker={m.warm} color={C.warm} width={1.6} dash="4 3" />
                  <path
                    d="M 356 175 L 318 175 Q 292 175 282 145"
                    fill="none"
                    stroke={C.white}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    markerEnd={`url(#${m.fg})`}
                  />
                  <Arrow d="M 318 175 L 318 145" marker={m.teal} color={C.teal} width={2.2} />
                  <L x="326" y="152" fill={C.teal} size={9} weight={800}>
                    CF
                  </L>
                  <RelParcel cx={356} cy={175} />

                  <L x="242" y="286" fill={C.teal} size={11} weight={800} anchor="middle">
                    Coriolis = avbøyning til høyre for bevegelsen — ikke spiral ennå
                  </L>
                </g>
              ) : null}

              {/* Steg 4: gradientvind / rundt L (mot klokken), parallelt isobarer */}
              {showAround ? (
                <g>
                  {/* PGF inn (kraft) + CF ut + V tangentiell */}
                  <g transform="translate(242, 175)">
                    <circle cx="0" cy="0" r="78" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
                  </g>
                  {/* Vind rundt (mot klokken), langs isobar – ikke inn */}
                  <Arrow d="M 168 145 Q 175 110 220 105" marker={m.fg} color={C.white} width={2.8} />
                  <Arrow d="M 268 105 Q 320 115 325 160" marker={m.fg} color={C.white} width={2.8} />
                  <Arrow d="M 325 195 Q 315 245 270 250" marker={m.fg} color={C.white} width={2.8} />
                  <Arrow d="M 210 250 Q 160 240 155 195" marker={m.fg} color={C.white} width={2.8} />

                  {/* Kraftbalanse vest for L: CCW → V sørover; CF til høyre (= ut), PGF inn */}
                  <RelParcel cx={155} cy={175} />
                  <Arrow d="M 155 175 L 155 220" marker={m.fg} color={C.white} width={2.4} />
                  <L x={142} y={200} fill={C.white} size={10} weight={800} anchor="end">
                    V
                  </L>
                  <Arrow d="M 155 175 L 195 175" marker={m.warm} color={C.warm} width={2.2} />
                  <L x={175} y={168} fill={C.warm} size={9} weight={700}>
                    PGF
                  </L>
                  <Arrow d="M 155 175 L 115 175" marker={m.teal} color={C.teal} width={2.2} />
                  <L x={118} y={168} fill={C.teal} size={9} weight={700} anchor="end">
                    CF
                  </L>

                  <L x="242" y="286" fill={C.fg} size={11} weight={800} anchor="middle">
                    PGF inn + Coriolis ut → vind rundt L (mot klokken)
                  </L>
                </g>
              ) : null}

              {/* Steg 5: friksjon → innspiraling */}
              {showSpiral ? (
                <g>
                  <g className={playing ? "rel-spin-ccw" : undefined} transform="translate(242, 175)">
                    <circle cx="0" cy="0" r="95" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 4" opacity="0.35" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.5" />
                  </g>
                  <Arrow d="M 140 145 Q 155 210 200 208" marker={m.fg} color={C.white} width={2.6} />
                  <Arrow d="M 275 245 Q 325 210 285 165" marker={m.fg} color={C.white} width={2.6} />
                  <Arrow d="M 335 145 Q 285 118 255 148" marker={m.fg} color={C.white} width={2.6} />
                  <Arrow d="M 175 118 Q 195 155 210 162" marker={m.fg} color={C.white} width={2.6} />
                  <L x="242" y="290" fill={C.fg} size={12} weight={700} anchor="middle">
                    Friksjon → spiral inn · konvergens
                  </L>
                </g>
              ) : null}
            </g>

            {/* ─── KART B: 1015 hPa SOM HØYTRYKK ─── */}
            <g transform="translate(470, 0)">
              <rect x="20" y="24" width="415" height="300" rx="8" fill="#0d151c" stroke="#1d2d3d" strokeWidth="1.5" />
              <circle cx="227" cy="175" r="118" fill="url(#rel-high-rad)" />

              <path
                d="M 105 175 C 105 110, 155 78, 227 78 C 305 78, 350 115, 350 175 C 350 235, 295 272, 227 272 C 155 272, 105 235, 105 175 Z"
                fill="none"
                stroke="#475569"
                strokeWidth="1.8"
              />
              <rect x="78" y="150" width="72" height="22" rx="4" fill="#0d151c" />
              <L x="114" y="166" fill={C.muted} size={12} anchor="middle" weight={700}>
                995 hPa
              </L>

              <path
                d="M 143 175 C 143 132, 177 112, 227 112 C 280 112, 313 138, 313 175 C 313 212, 275 238, 227 238 C 175 238, 143 212, 143 175 Z"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <circle cx="227" cy="175" r="36" fill="#0f2b32" stroke={C.teal} strokeWidth="2.5" />
              <L x="227" y="180" fill={C.teal} size={24} weight={900} anchor="middle">
                H
              </L>
              <L x="227" y="202" fill="#67e8f9" size={12} weight={800} anchor="middle">
                1015 hPa
              </L>

              <rect x="21" y="25" width="413" height="48" fill="#0d151c" />
              <L x="227" y="42" size={14} weight={800} anchor="middle" fill={C.teal}>
                KART B: Høytrykkssenter (1015 hPa)
              </L>
              <L x="227" y="62" size={12} fill={C.fg} anchor="middle">
                Omgitt av lavere trykk (995 hPa)
              </L>

              {showPgf ? (
                <g>
                  <Arrow d="M 180 175 L 125 175" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <Arrow d="M 275 175 L 330 175" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <Arrow d="M 227 140 L 227 95" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <Arrow d="M 227 210 L 227 255" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
                  <L x="227" y="290" fill={C.warm} size={12} weight={800} anchor="middle">
                    Trykkgradientkraften (PGF) → rett ut fra H
                  </L>
                </g>
              ) : null}

              {/* Steg 3: utstrømning avbøyes til høyre → begynnende med-klokken */}
              {showCoriolisBend ? (
                <g className={playing ? "rel-parcel-pulse" : undefined}>
                  {/* Østover ut: V øst → CF sør */}
                  <Arrow d="M 275 175 L 340 175" marker={m.warm} color={C.warm} width={1.6} dash="4 3" />
                  <path
                    d="M 275 175 L 310 175 Q 335 175 342 205"
                    fill="none"
                    stroke={C.white}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    markerEnd={`url(#${m.fg})`}
                  />
                  <Arrow d="M 310 175 L 310 205" marker={m.teal} color={C.teal} width={2.2} />
                  <L x="318" y="198" fill={C.teal} size={9} weight={800}>
                    CF
                  </L>
                  <RelParcel cx={275} cy={175} />

                  {/* Nordover ut: V nord → CF øst */}
                  <Arrow d="M 227 140 L 227 95" marker={m.warm} color={C.warm} width={1.6} dash="4 3" />
                  <path
                    d="M 227 140 L 227 112 Q 227 95 255 88"
                    fill="none"
                    stroke={C.white}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    markerEnd={`url(#${m.fg})`}
                  />
                  <Arrow d="M 227 112 L 255 112" marker={m.teal} color={C.teal} width={2.2} />
                  <L x="258" y={104} fill={C.teal} size={9} weight={800}>
                    CF
                  </L>
                  <RelParcel cx={227} cy={140} />

                  <L x="227" y="286" fill={C.teal} size={11} weight={800} anchor="middle">
                    Samme logikk: CF til høyre for V — ikke spiral ennå
                  </L>
                </g>
              ) : null}

              {showAround ? (
                <g>
                  <g transform="translate(227, 175)">
                    <circle cx="0" cy="0" r="78" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
                  </g>
                  {/* Vind med klokken rundt H */}
                  <Arrow d="M 227 105 Q 280 110 305 150" marker={m.fg} color={C.white} width={2.8} />
                  <Arrow d="M 305 195 Q 295 245 250 255" marker={m.fg} color={C.white} width={2.8} />
                  <Arrow d="M 195 255 Q 145 240 140 190" marker={m.fg} color={C.white} width={2.8} />
                  <Arrow d="M 145 155 Q 155 110 205 105" marker={m.fg} color={C.white} width={2.8} />

                  {/* Kraftbalanse: pakke øst for H, V sørover (med klokken) */}
                  <RelParcel cx={305} cy={175} />
                  <Arrow d="M 305 175 L 305 220" marker={m.fg} color={C.white} width={2.4} />
                  <L x={318} y={200} fill={C.white} size={10} weight={800}>
                    V
                  </L>
                  <Arrow d="M 305 175 L 345 175" marker={m.warm} color={C.warm} width={2.2} />
                  <L x={325} y={168} fill={C.warm} size={9} weight={700}>
                    PGF
                  </L>
                  <Arrow d="M 305 175 L 265 175" marker={m.teal} color={C.teal} width={2.2} />
                  <L x={272} y={168} fill={C.teal} size={9} weight={700} anchor="end">
                    CF
                  </L>

                  <L x="227" y="286" fill={C.fg} size={11} weight={800} anchor="middle">
                    PGF ut + Coriolis inn → vind rundt H (med klokken)
                  </L>
                </g>
              ) : null}

              {showSpiral ? (
                <g>
                  <g className={playing ? "rel-spin-cw" : undefined} transform="translate(227, 175)">
                    <circle cx="0" cy="0" r="95" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="5 4" opacity="0.35" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.5" />
                  </g>
                  <Arrow d="M 227 140 Q 275 138 305 168" marker={m.fg} color={C.white} width={2.6} />
                  <Arrow d="M 260 200 Q 255 250 205 255" marker={m.fg} color={C.white} width={2.6} />
                  <Arrow d="M 185 215 Q 145 205 138 160" marker={m.fg} color={C.white} width={2.6} />
                  <Arrow d="M 175 148 Q 175 115 225 112" marker={m.fg} color={C.white} width={2.6} />
                  <L x="227" y="290" fill={C.fg} size={12} weight={700} anchor="middle">
                    Friksjon → spiral ut · divergens
                  </L>
                </g>
              ) : null}
            </g>

            {/* ─── LUFTSØYLE-TVERRSNITT ─── */}
            <L x="470" y="345" size={14} weight={800} anchor="middle" fill={C.fg}>
              Luftsøyle i tverrsnitt (skjematisk, nordlige halvkule)
            </L>

            {showColumn ? (
              <>
                {/* L-søyle */}
                <g transform="translate(35, 358)">
                  <rect x="0" y="0" width="415" height="310" rx="8" fill="url(#rel-col-sky)" stroke="#1d2d3d" strokeWidth="1.5" />
                  <L x="207" y="24" fill={C.low} size={13} weight={800} anchor="middle">
                    Kart A · Lavtrykk: konvergens → stigning → skyer
                  </L>
                  <rect x="0" y="270" width="415" height="40" fill="#15241b" />
                  <line x1="0" y1="270" x2="415" y2="270" stroke="#2a4c36" strokeWidth="2" />
                  <L x="207" y="295" fill={C.low} size={12} weight={800} anchor="middle">
                    L ved bakken
                  </L>
                  <line x1="8" y1="48" x2="407" y2="48" stroke={C.cold} strokeWidth="1.6" strokeDasharray="5 3" />
                  <L x="16" y="42" fill={C.cold} size={11} weight={700}>
                    Høyden
                  </L>
                  <path
                    d="M 40 255 L 160 255"
                    fill="none"
                    stroke={C.low}
                    strokeWidth={2.8}
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    markerEnd={`url(#${m.low})`}
                    className={playing ? "rel-dash-flow" : undefined}
                  />
                  <Arrow d="M 375 255 L 255 255" marker={m.low} color={C.low} width={2.8} />
                  <L x="207" y="248" fill={C.low} size={11} weight={700} anchor="middle">
                    Konvergens
                  </L>
                  <g className={playing ? "rel-rise" : undefined}>
                    <Arrow d="M 207 240 L 207 95" marker={m.warm} color={C.warm} width={3.2} />
                  </g>
                  <L x="230" y="165" fill={C.warm} size={11} weight={800}>
                    Stigning
                  </L>
                  <ellipse cx="207" cy="118" rx="70" ry="28" fill="url(#rel-cloud)" opacity="0.95" />
                  <L x="207" y="122" fill="#0f172a" size={11} weight={800} anchor="middle">
                    Skyer
                  </L>
                  <Arrow d="M 150 62 L 40 62" marker={m.teal} color={C.teal} width={2.6} />
                  <Arrow d="M 265 62 L 375 62" marker={m.teal} color={C.teal} width={2.6} />
                  <L x="207" y="72" fill={C.teal} size={11} weight={700} anchor="middle">
                    Divergens i høyden
                  </L>
                </g>

                {/* H-søyle */}
                <g transform="translate(490, 358)">
                  <rect x="0" y="0" width="415" height="310" rx="8" fill="url(#rel-col-sky)" stroke="#1d2d3d" strokeWidth="1.5" />
                  <L x="207" y="24" fill={C.teal} size={13} weight={800} anchor="middle">
                    Kart B · Høytrykk: subsidens → klarvær
                  </L>
                  <rect x="0" y="270" width="415" height="40" fill="#15241b" />
                  <line x1="0" y1="270" x2="415" y2="270" stroke="#2a4c36" strokeWidth="2" />
                  <L x="207" y="295" fill={C.teal} size={12} weight={800} anchor="middle">
                    H ved bakken
                  </L>
                  <line x1="8" y1="48" x2="407" y2="48" stroke={C.cold} strokeWidth="1.6" strokeDasharray="5 3" />
                  <L x="16" y="42" fill={C.cold} size={11} weight={700}>
                    Høyden
                  </L>
                  <Arrow d="M 40 62 L 150 62" marker={m.teal} color={C.teal} width={2.6} />
                  <Arrow d="M 375 62 L 265 62" marker={m.teal} color={C.teal} width={2.6} />
                  <L x="207" y="72" fill={C.teal} size={11} weight={700} anchor="middle">
                    Konvergens i høyden
                  </L>
                  <g className={playing ? "rel-sink" : undefined}>
                    <Arrow d="M 207 90 L 207 235" marker={m.warm} color={C.warm} width={3.2} />
                  </g>
                  <L x="230" y="160" fill={C.warm} size={11} weight={800}>
                    Nedsynking
                  </L>
                  <circle cx="207" cy="130" r="22" fill="#fbbf24" opacity="0.85" />
                  <L x="207" y="134" fill="#78350f" size={11} weight={800} anchor="middle">
                    Klart
                  </L>
                  <Arrow d="M 160 255 L 40 255" marker={m.teal} color={C.teal} width={2.8} />
                  <Arrow d="M 255 255 L 375 255" marker={m.teal} color={C.teal} width={2.8} />
                  <L x="207" y="248" fill={C.teal} size={11} weight={700} anchor="middle">
                    Divergens
                  </L>
                </g>
              </>
            ) : (
              <L x="470" y="520" size={13} fill={C.muted} anchor="middle">
                Spill av, eller gå til steg 5, for å se luftsøyla under hvert kart.
              </L>
            )}
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. LowPressureCrossSectionDiagram
 * Tverrsnitt av lavtrykk: konvergens, adiabatisk heving, LCL, latent varme,
 * realistisk Cumulonimbus med ambolt (incus) ved tropopause og divergens.
 */
export function LowPressureCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av et lavtrykk fra bakken til tropopausen"
      heading="Lavtrykk: konvergens, stigning og skydannelse"
      caption="I et lavtrykk strømmer luft inn langs bakken (konvergens) og stiger. Før lufta er mettet, avkjøles den med om lag 1 °C per 100 meter. Det er den tørradiabatiske temperaturgradienten (dry adiabatic lapse rate, DALR). Ved løftingskondensasjonsnivået (lifting condensation level, LCL) er lufta mettet, og vanndampen kondenserer. Latent varme frigjøres, så mettet luft avkjøles langsommere, typisk ca. 0,5 °C per 100 meter. Det er den våtadiabatiske temperaturgradienten (saturated adiabatic lapse rate, SALR). Ved tropopausen, ca. 8–11 km over Norge, stopper stigningen. Skytoppen flater ut, og lufta sprer seg ut til sidene (divergens i høyden)."
      viewBox="0 0 940 510"
      wide
      scroll
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="low-cross-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0f16" />
              <stop offset="20%" stopColor="#141e2b" />
              <stop offset="60%" stopColor="#1b2d3d" />
              <stop offset="100%" stopColor="#253e54" />
            </linearGradient>

            <linearGradient id="cb-body-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#94a3b8" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#475569" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="cb-anvil-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.3" />
              <stop offset="30%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="rain-shaft-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          <rect x="30" y="30" width="880" height="450" rx="8" fill="url(#low-cross-sky)" />

          <rect x="30" y="30" width="880" height="78" rx="4" fill="#0b1118" opacity="0.96" />
          <line x1="30" y1="108" x2="910" y2="108" stroke={C.cold} strokeWidth="2" strokeDasharray="6 4" />
          <L x="48" y="52" fill={C.cold} size={14} weight={800}>
            Stratosfæren
          </L>
          <L x="892" y="52" fill={C.cold} size={13} weight={700} anchor="end">
            Tropopausen: stigningen stopper
          </L>
          <Arrow d="M 250 78 L 70 78" marker={m.teal} color={C.teal} width={3} />
          <L x="262" y="82" fill={C.teal} size={13} weight={800}>
            Divergens i høyden
          </L>
          <Arrow d="M 690 78 L 870 78" marker={m.teal} color={C.teal} width={3} />
          <L x="678" y="82" fill={C.teal} size={13} weight={800} anchor="end">
            Divergens i høyden
          </L>

          <rect x="30" y="440" width="880" height="40" rx="4" fill="#15241b" />
          <line x1="30" y1="440" x2="910" y2="440" stroke="#2a4c36" strokeWidth="2.5" />
          <L x="470" y="465" fill={C.low} size={15} weight={800} anchor="middle">
            Lavtrykkssenter ved bakken (L)
          </L>

          <line x1="250" y1="318" x2="820" y2="318" stroke={C.teal} strokeDasharray="4 3" strokeWidth="1.8" />
          <L x="42" y="306" fill={C.teal} size={13} weight={800}>
            Løftingskondensasjonsnivå
          </L>
          <L x="42" y="324" fill={C.teal} size={12} weight={700}>
            (LCL) · mettet luft
          </L>
          <L x="42" y="344" fill={C.muted} size={12}>
            Her dannes skybasen
          </L>

          <polygon
            points="340,330 600,330 630,440 310,440"
            fill="url(#rain-shaft-grad)"
          />
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 330 + i * 18;
            return (
              <line
                key={`rain-${i}`}
                x1={x}
                y1={335}
                x2={x - 15}
                y2={438}
                stroke="#7dd3fc"
                strokeWidth="1.6"
                strokeDasharray="6 4"
                opacity="0.8"
              />
            );
          })}
          <L x="470" y="415" fill="#e0f2fe" size={14} weight={800} anchor="middle">
            Nedbør
          </L>

          <path
            d="M 280 330 
               C 250 300, 240 250, 280 220 
               C 270 180, 310 140, 360 150 
               C 380 110, 440 95, 470 95 
               C 500 95, 560 110, 580 150 
               C 630 140, 670 180, 660 220 
               C 700 250, 690 300, 660 330 
               Z"
            fill="url(#cb-body-grad)"
            stroke="#94a3b8"
            strokeWidth="1.8"
          />

          <path
            d="M 200 95 
               C 280 85, 380 90, 470 90 
               C 560 90, 660 85, 740 95 
               C 760 100, 720 125, 660 125 
               L 280 125 
               C 220 125, 180 100, 200 95 Z"
            fill="url(#cb-anvil-grad)"
          />
          <L x="470" y="112" fill="#0f172a" size={13} weight={800} anchor="middle">
            Amboltformet skytopp
          </L>

          <Arrow d="M 470 330 L 470 130" marker={m.warm} color={C.warm} width={4.2} />
          <rect x="395" y="195" width="150" height="42" rx="6" fill="#0f172a" opacity="0.9" />
          <L x="470" y="212" fill={C.warm} size={12} weight={800} anchor="middle">
            Lufta stiger
          </L>
          <L x="470" y="228" fill="#fde68a" size={10.5} weight={700} anchor="middle">
            Latent varme frigjøres
          </L>

          <Arrow d="M 80 430 L 310 430" marker={m.low} color={C.low} width={3.6} />
          <L x="180" y="420" fill={C.low} size={13} weight={800} anchor="middle">
            Konvergens ved bakken →
          </L>

          <Arrow d="M 860 430 L 630 430" marker={m.low} color={C.low} width={3.6} />
          <L x="760" y="420" fill={C.low} size={13} weight={800} anchor="middle">
            ← Konvergens ved bakken
          </L>

          <g transform="translate(680, 160)">
            <rect x="0" y="0" width="220" height="150" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <L x="14" y="24" fill={C.warm} size={12} weight={800}>
              Når lufta stiger
            </L>
            <L x="14" y="44" fill={C.fg} size={11}>
              1. Umettet luft avkjøles med
            </L>
            <L x="28" y="59" fill={C.muted} size={10.5}>
              om lag 1 °C per 100 meter (DALR).
            </L>
            <L x="14" y="78" fill={C.fg} size={11}>
              2. Ved LCL er lufta mettet.
            </L>
            <L x="14" y="96" fill={C.warm} size={11} weight={700}>
              Vanndampen kondenserer.
            </L>
            <L x="14" y="114" fill={C.fg} size={11}>
              3. Mettet luft avkjøles saktere,
            </L>
            <L x="28" y="129" fill={C.sand} size={10.5}>
              typisk ca. 0,5 °C per 100 meter (SALR).
            </L>
          </g>

          <g transform="translate(42, 168)">
            <rect x="0" y="0" width="230" height="116" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <L x="14" y="24" fill={C.cold} size={13} weight={800}>
              Hvor stopper stigningen?
            </L>
            <L x="14" y="48" fill={C.cold} size={12}>
              Tropopausen ligger ca. 8–11 km
            </L>
            <L x="14" y="66" fill="#93c5fd" size={12}>
              over Norge.
            </L>
            <L x="14" y="88" fill={C.teal} size={12}>
              Der er lufta kaldere enn
            </L>
            <L x="14" y="106" fill={C.warm} size={12}>
              laget over, og stigningen stopper.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. HighPressureCrossSectionDiagram
 * Tverrsnitt av høytrykk: subsidens, oppvarming, fallende RF, skyoppløsning og divergens.
 */
export function HighPressureCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av et høytrykk fra tropopausen til bakken"
      heading="Høytrykk: nedsynking, oppvarming og klarvær"
      caption="I et høytrykk strømmer luft sammen i øvre troposfære og synker mot bakken. Det kalles subsidens (nedsynking). Synkende luft varmes med om lag 1 °C per 100 meter. Den relative fuktigheten faller, skydråpene fordamper, og himmelen blir klar. Ved bakken strømmer lufta ut til sidene (divergens). Om sommeren kan det gi varme og tørke. Om vinteren kan bakken bli svært kald, og det kan oppstå bakkeinversjon."
      viewBox="0 0 940 510"
      wide
      scroll
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="high-cross-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08101a" />
              <stop offset="25%" stopColor="#0f263c" />
              <stop offset="65%" stopColor="#1e486d" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="high-sun-rays" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect x="30" y="30" width="880" height="450" rx="8" fill="url(#high-cross-sky)" />

          <circle cx="160" cy="160" r="35" fill="#fef08a" opacity="0.95" />
          <circle cx="160" cy="160" r="55" fill="#fde047" opacity="0.25" />
          <polygon points="135,115 50,440 320,440 185,115" fill="url(#high-sun-rays)" />
          <polygon points="160,125 350,440 650,440 180,125" fill="url(#high-sun-rays)" />

          <rect x="30" y="30" width="880" height="72" rx="4" fill="#080e14" opacity="0.96" />
          <line x1="30" y1="102" x2="910" y2="102" stroke={C.cold} strokeWidth="1.8" strokeDasharray="6 4" />
          <L x="48" y="52" fill={C.cold} size={14} weight={800}>
            Øvre troposfære
          </L>
          <L x="892" y="52" fill={C.cold} size={13} weight={700} anchor="end">
            Konvergens i høyden mater nedsynkingen
          </L>
          <Arrow d="M 430 82 L 250 82" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 510 82 L 690 82" marker={m.teal} color={C.teal} width={3.2} />

          <rect x="30" y="440" width="880" height="40" rx="4" fill="#2d2212" />
          <line x1="30" y1="440" x2="910" y2="440" stroke="#785a2b" strokeWidth="2.5" />
          <L x="470" y="465" fill={C.warm} size={15} weight={800} anchor="middle">
            Høytrykkssenter ved bakken (H)
          </L>

          <Arrow d="M 380 118 L 380 380" marker={m.warm} color={C.warm} width={3.8} />
          <Arrow d="M 470 118 L 470 380" marker={m.warm} color={C.warm} width={4.4} />
          <Arrow d="M 560 118 L 560 380" marker={m.warm} color={C.warm} width={3.8} />

          <rect x="330" y="188" width="280" height="54" rx="8" fill="#0f172a" opacity="0.94" stroke={C.warm} strokeWidth="1.5" />
          <L x="470" y="210" fill={C.warm} size={14} weight={800} anchor="middle">
            Subsidens (nedsynking)
          </L>
          <L x="470" y="230" fill="#fde68a" size={12} weight={700} anchor="middle">
            Oppvarming om lag 1 °C per 100 m
          </L>

          <g transform="translate(640, 160)">
            <path
              d="M 20 50 C 10 35, 30 15, 55 20 C 70 5, 100 10, 110 30 C 130 25, 140 45, 125 60 C 110 70, 30 70, 20 50 Z"
              fill="#94a3b8"
              opacity="0.35"
              stroke="#cbd5e1"
              strokeDasharray="4 3"
              strokeWidth="1.5"
            />
            <Arrow d="M 60 55 L 60 25" marker={m.sand} color={C.sand} width={1.8} />
            <Arrow d="M 95 55 L 95 25" marker={m.sand} color={C.sand} width={1.8} />
            <L x="75" y="88" fill={C.sand} size={12} weight={800} anchor="middle">
              Skydråpene fordamper
            </L>
            <L x="75" y="104" fill={C.fg} size={10.5} anchor="middle">
              Relativ fuktighet faller
            </L>
          </g>

          <line x1="80" y1="360" x2="860" y2="360" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <L x="90" y="352" fill="#fbbf24" size={12} weight={800}>
            Synkende luft varmes opp
          </L>
          <L x="850" y="352" fill={C.muted} size={11} anchor="end">
            Skyene løses opp
          </L>

          <Arrow d="M 430 425 L 120 425" marker={m.warm} color={C.warm} width={3.6} />
          <L x="260" y="415" fill={C.warm} size={13} weight={800} anchor="middle">
            ← Divergens: Luft strømmer ut
          </L>

          <Arrow d="M 510 425 L 820 425" marker={m.warm} color={C.warm} width={3.6} />
          <L x="680" y="415" fill={C.warm} size={13} weight={800} anchor="middle">
            Divergens: Luft strømmer ut →
          </L>

          <g transform="translate(50, 220)">
            <rect x="0" y="0" width="260" height="110" rx="8" fill="#0f172a" opacity="0.92" stroke="#334155" strokeWidth="1.5" />
            <L x="16" y="24" fill={C.warm} size={13} weight={800}>
              Sommerhøytrykk
            </L>
            <L x="16" y="42" fill={C.fg} size={11}>
              Lange dager og mye sol.
            </L>
            <L x="16" y="58" fill={C.warm} size={11} weight={700}>
              Kan gi varme, tørke og skogbrannfare.
            </L>

            <L x="16" y="80" fill={C.cold} size={13} weight={800}>
              Vinterhøytrykk
            </L>
            <L x="16" y="98" fill={C.cold} size={11} weight={700}>
              Svært kaldt, med bakkeinversjon.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. KatabaticWindDiagram
 * Viser utstråling over isbre/høyfjell, gravitasjonsdrenasje av tung kaldluft,
 * dannelse av kaldluftssjø i dalbunnen, temperaturinversjon med røyklokk og termisk belte i lia.
 */
export function KatabaticWindDiagram() {
  return (
    <Diagram
      title="Katabatisk fallvind og dannelse av temperaturinversjon"
      heading="Katabatisk vind: kald luft renner ned og samles i dalen"
      caption="Katabatisk vind blåser nedover en helling fordi kald luft er tyngre enn varm luft. En klar vinternatt mister snøen varme ved utstråling, og lufta nærmest snøen blir kald. Den kalde lufta følger senkninger i terrenget, omtrent som vann, og kan hope seg opp i dalbunnen. Da blir det kaldere nede i dalen enn litt lenger opp, altså en inversjon. I Norge er katabatisk vind relativt mild og når sjelden mer enn frisk bris. Under inversjonen kan lokale utslipp bli liggende nær bakken (Store norske leksikon, u.å.-j; u.å.-k; u.å.-m). Skjematisk, uten målte verdier."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Vinternatt-himmel */}
            <linearGradient id="kata-night-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#030710" />
              <stop offset="35%" stopColor="#081220" />
              <stop offset="75%" stopColor="#0e1d30" />
              <stop offset="100%" stopColor="#14283e" />
            </linearGradient>

            {/* Isbre og snøplatå */}
            <linearGradient id="kata-glacier-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#e0f2fe" />
              <stop offset="70%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>

            {/* Fjellflanke gradient */}
            <linearGradient id="kata-rock-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#141d28" />
              <stop offset="100%" stopColor="#0b1118" />
            </linearGradient>

            {/* Kaldluftssjø i dalbunnen */}
            <linearGradient id="kata-coldpool-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#0284c7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Bakgrunn: Krystallklar stjerneklar vinternatt */}
          <rect x="30" y="30" width="880" height="460" rx="8" fill="url(#kata-night-sky)" />

          {/* Måneskinn og stjerner */}
          <circle cx="100" cy="70" r="16" fill="#fef08a" opacity="0.95" />
          <circle cx="95" cy="67" r="14" fill="#040913" />
          {[
            [160, 50], [210, 68], [270, 45], [430, 60], [590, 50], [740, 65], [830, 45]
          ].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r={1.3} fill="#ffffff" opacity={0.85} />
          ))}

          {/* REALISTISK NORSK DALPROFIL (U-DAL / FJORDDAL) */}
          {/* Fjellmasse: Platåbre venstre (1500 moh.), dalbunn midt (100 moh.), motgående åsside høyre */}
          <path
            d="M 30 135 
               L 240 135 
               Q 310 145 370 230 
               L 460 380 
               L 660 380 
               L 810 210 
               L 910 210 
               L 910 490 
               L 30 490 Z"
            fill="url(#kata-rock-grad)"
            stroke="#26384a"
            strokeWidth="2"
          />

          {/* Platåbreen på toppen (Folgefonna / Hardangervidda, 1500 moh.) */}
          <path
            d="M 30 135 
               L 240 135 
               Q 275 142 305 190 
               L 280 205 
               Q 250 152 220 150 
               L 30 150 Z"
            fill="url(#kata-glacier-grad)"
          />
          <L x="135" y="125" fill="#e0f2fe" size={13} weight={800} anchor="middle">
            Snødekt fjellplatå eller bre
          </L>

          {/* Langbølget infrarød utstråling (I_ut) fra snøen ut i rommet */}
          <Arrow d="M 70 115 L 70 50" marker={m.sand} color={C.sand} width={2.2} />
          <Arrow d="M 140 115 L 140 50" marker={m.sand} color={C.sand} width={2.2} />
          <Arrow d="M 210 115 L 210 50" marker={m.sand} color={C.sand} width={2.2} />
          <L x="140" y="42" fill={C.sand} size={11} weight={700} anchor="middle">
            Utstråling mot verdensrommet (klar natt)
          </L>

          {/* Iskald luftpute på platået */}
          <rect x="40" y="160" width="190" height="24" rx="4" fill="#0c2333" stroke={C.cold} strokeWidth="1.2" />
          <L x="135" y="176" fill="#7dd3fc" size={11} weight={800} anchor="middle">
            Kald, tung luft nær snøen
          </L>

          {/* Horisontal drenasjepil mot kanten */}
          <Arrow d="M 160 142 L 235 142" marker={m.cold} color={C.cold} width={2.8} />

          {/* KATABATISK FALLVIND NEDOVER LIEN */}
          {/* Bred luftstrøm */}
          <path
            d="M 240 145 Q 330 170 380 260 Q 420 320 470 375"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="14"
            opacity="0.3"
            strokeLinecap="round"
          />
          <Arrow d="M 240 145 Q 330 170 410 290" marker={m.cold} color={C.cold} width={4.2} />
          <Arrow d="M 370 250 Q 420 330 475 375" marker={m.cold} color={C.cold} width={4.2} />

          <L x="365" y="210" fill={C.cold} size={14} weight={900}>
            Katabatisk fallvind
          </L>
          <L x="365" y="228" fill={C.fg} size={11}>
            Tyngdekraften trekker den kalde
          </L>
          <L x="365" y="244" fill={C.fg} size={11}>
            lufta ned lia. I Norge sjelden over frisk bris
          </L>

          {/* KALDLUFTSSJØ I DALBUNNEN (MELLOM DE TO FJELLESIDENE) */}
          {/* Fyller bassenget fra x=385 til x=740, dybde fra y=290 til y=380 */}
          <polygon
            points="385,290 740,290 660,380 460,380"
            fill="url(#kata-coldpool-grad)"
          />
          {/* Inversjonsgrense (vannspeil-lignende lokk) */}
          <line x1="385" y1="290" x2="740" y2="290" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="5 3" />
          <L x="575" y="282" fill="#7dd3fc" size={11} weight={800} anchor="middle">
            Inversjonslokk: røyk og eksos blir liggende under
          </L>

          <L x="585" y="325" fill="#f0f9ff" size={13} weight={900} anchor="middle">
            KALD LUFT SAMLES I DALBUNNEN
          </L>
          <L x="585" y="342" fill="#bae6fd" size={10.5} anchor="middle">
            Følger terrenget, omtrent som vann
          </L>

          {/* HUS I DALBUNNEN MED RØYKLOKK */}
          <g transform="translate(440, 380)">
            {/* Hus i dalen */}
            <polygon points="12,-15 24,-26 36,-15" fill="#991b1b" />
            <rect x="12" y="-15" width="24" height="15" fill="#78350f" />
            <rect x="28" y="-26" width="3" height="8" fill="#475569" />
            {/* Røyk som stiger opp til inversjonsgrensen y=290 (dy = -90) og slår 100% flatt ut til begge sider */}
            <path
              d="M 29 -26 Q 27 -55 29 -90 L -35 -90"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3.2"
              opacity="0.85"
            />
            <path
              d="M 29 -90 L 85 -90"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3.2"
              opacity="0.85"
            />
          </g>

          {/* TERMISK BELTE OPPE I DEN MOTGÅENDE LIA (HØYRE SIDE) */}
          <g transform="translate(745, 235)">
            {/* Gård/hus i lia (over inversjonslokket!) */}
            <polygon points="10,-12 20,-22 30,-12" fill="#15803d" />
            <rect x="10" y="-12" width="20" height="12" fill="#854d0e" />
            <rect x="22" y="-22" width="3" height="6" fill="#475569" />

            {/* Informasjonsboks for det termiske beltet */}
            <rect x="35" y="-30" width="125" height="75" rx="6" fill="#111c24" stroke="#eab308" strokeWidth="1.5" />
            <L x="45" y="-12" fill="#facc15" size={11.5} weight={900}>
              Termisk belte i lia
            </L>
            <L x="45" y="4" fill="#fde047" size={13} weight={800}>
              Mildere enn i dalen
            </L>
            <L x="45" y="20" fill={C.fg} size={9.5}>
              Ligger over den kalde
            </L>
            <L x="45" y="34" fill={C.sand} size={9.5}>
              lufta i dalbunnen
            </L>
          </g>

          {/* TEMPERATURINVERsJONS-GRAF T(z) PÅ HØYRE KANT */}
          <g transform="translate(775, 55)">
            <rect x="0" y="0" width="125" height="135" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.3" />
            <L x="62" y="18" fill={C.cold} size={11} weight={800} anchor="middle">
              Inversjon T(z)
            </L>
            {/* Akser */}
            <line x1="25" y1="120" x2="25" y2="25" stroke="#64748b" strokeWidth="1" />
            <line x1="25" y1="120" x2="115" y2="120" stroke="#64748b" strokeWidth="1" />
            <L x="22" y="32" fill={C.muted} size={8.5} anchor="end">Platå</L>
            <L x="22" y="75" fill={C.muted} size={8.5} anchor="end">Lokk</L>
            <L x="22" y="118" fill={C.muted} size={8.5} anchor="end">Dal</L>

            {/* Temperatur-kurve: -20 C ved 100m, øker til -4 C ved 350m, synker til -25 C ved 1500m */}
            <path
              d="M 35 118 
                 Q 85 95 85 75 
                 Q 85 55 30 35"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.2"
            />
            <circle cx="35" cy="118" r="3" fill="#38bdf8" />
            <circle cx="85" cy="75" r="3" fill="#facc15" />
            <circle cx="30" cy="35" r="3" fill="#38bdf8" />

            <L x="42" y="116" fill="#38bdf8" size={8.5}>kald</L>
            <L x="90" y="77" fill="#facc15" size={9} weight={700}>mild</L>
            <L x="36" y="34" fill="#38bdf8" size={8.5}>kald</L>
            <L x="62" y="130" fill="#facc15" size={8.5} weight={700} anchor="middle">Temperatur →</L>
          </g>

          {/* SAMMENLIGNINGSBOKS NEDERST */}
          <rect x="40" y="425" width="860" height="55" rx="6" fill="#0d1620" stroke="#1e293b" strokeWidth="1.3" />
          <L x="55" y="445" fill={C.warm} size={12} weight={800}>
            Ikke bland sammen: føn og katabatisk vind
          </L>
          <L x="55" y="465" fill={C.fg} size={11}>
            • <tspan fill={C.warm} fontWeight="bold">Føn:</tspan> lufta synker på lesiden, varmes og blir tørr.
          </L>
          <L x="490" y="465" fill={C.fg} size={11}>
            • <tspan fill={C.cold} fontWeight="bold">Katabatisk vind:</tspan> kald, tung luft renner ned og samles.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. SeaBreezeDiagram
 * Viser solgangsbris: sjøbris om dagen og landbris om natten med realistisk kystmiljø,
 * cumulus humilis over land om dagen, havbølger, temperaturer og returstrøm i høyden.
 */
export function SeaBreezeDiagram() {
  return (
    <Diagram
      title="Solgangsbris: Sjøbris om dagen og landbris om natten"
      heading="Pålandsvind og fralandsvind: Lokale temperatur- og trykkforskjeller"
      caption="Pålandsvind (sjøbris) og fralandsvind (landbris) er et klassisk lokalt termisk kretsløp drevet av at land og vann har ulik spesifikk varmekapasitet. Vann har om lag fire ganger høyere varmekapasitet enn stein og sand, og solstrålene trenger metervis ned i sjøen. Derfor varmes landjorden mye raskere opp om dagen enn havet. Lufta over land stiger (termisk lavtrykk L) og danner ofte små godværsskyer (cumulus humilis) innover land, mens den kjølige lufta over havet (H) suges inn som en frisk sjøbris. Om natten taper landjorden varme lynraskt ved utstråling, lufta synker over land (H), og en svakere landbris blåser ut mot det lunkne havet."
      viewBox="0 0 940 430"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="sb-day-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>

            <linearGradient id="sb-night-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="60%" stopColor="#0b1329" />
              <stop offset="100%" stopColor="#111c38" />
            </linearGradient>

            <linearGradient id="sb-sea-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>

            <linearGradient id="sb-land-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="40%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>

            <linearGradient id="sb-land-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          <line
            x1="470"
            y1="30"
            x2="470"
            y2="410"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* DAG: SJØBRIS */}
          <g transform="translate(0, 0)">
            <rect x="35" y="30" width="415" height="260" rx="8" fill="url(#sb-day-sky)" />

            <circle cx="100" cy="75" r="22" fill="#fef08a" />
            <circle cx="100" cy="75" r="35" fill="#fde047" opacity="0.3" />

            <L x="242" y="55" size={15} weight={800} anchor="middle" fill="#fef08a">
              ☀️ DAG: Sjøbris (Pålandsvind)
            </L>
            <L x="242" y="73" size={11} fill="#e0f2fe" anchor="middle">
              Land varmes raskt opp → lufta stiger
            </L>

            <rect x="35" y="250" width="180" height="130" fill="url(#sb-sea-grad)" />
            <path
              d="M 45 255 Q 65 250 85 255 T 125 255 T 165 255 T 205 255"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.4"
            />

            <path
              d="M 205 250 Q 230 248 260 242 L 450 232 L 450 380 L 205 380 Z"
              fill="url(#sb-land-day)"
              stroke="#92400e"
              strokeWidth="1.5"
            />
            <polygon points="390,230 380,210 370,230" fill="#15803d" />
            <polygon points="390,220 380,200 370,220" fill="#16a34a" />
            <rect x="378" y="230" width="4" height="6" fill="#78350f" />

            <path
              d="M 330 145 
                 C 320 135, 330 120, 345 122 
                 C 355 110, 380 112, 390 125 
                 C 405 125, 415 138, 405 148 Z"
              fill="#ffffff"
              opacity="0.95"
            />
            <L x="370" y="105" fill="#f8fafc" size={10.5} weight={700} anchor="middle">
              Godværsskyer over land
            </L>

            <circle cx="370" cy="275" r="16" fill="#7f1d1d" stroke={C.low} strokeWidth="1.8" />
            <L x="370" y="281" fill="#fca5a5" size={14} weight={900} anchor="middle">
              L
            </L>
            <L x="370" y="302" fill="#fde68a" size={11} weight={800} anchor="middle">
              Varmt land (+25 °C)
            </L>

            <circle cx="120" cy="275" r="16" fill="#0c4a6e" stroke={C.teal} strokeWidth="1.8" />
            <L x="120" y="281" fill="#67e8f9" size={14} weight={900} anchor="middle">
              H
            </L>
            <L x="120" y="302" fill="#bae6fd" size={11} weight={800} anchor="middle">
              Kjølig hav (+16 °C)
            </L>

            <Arrow d="M 145 240 L 320 240" marker={m.teal} color={C.teal} width={3.6} />
            <L x="232" y="230" fill="#082f49" size={12} weight={900} anchor="middle">
              Sjøbris (Pålandsvind) →
            </L>

            <Arrow d="M 370 215 L 370 155" marker={m.warm} color={C.warm} width={3.2} />

            <Arrow d="M 340 135 L 140 135" marker={m.fg} color={C.white} width={2.4} dash="4 3" />
            <L x="240" y="125" fill="#f8fafc" size={11} weight={700} anchor="middle">
              ← Returstrøm i høyden
            </L>

            <Arrow d="M 120 155 L 120 220" marker={m.cold} color={C.cold} width={2.8} />

            <rect x="50" y="330" width="385" height="50" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />
            <L x="242" y="350" fill={C.teal} size={11.5} weight={700} anchor="middle">
              Høy solinnstråling gir markant trykkgradient.
            </L>
            <L x="242" y="368" fill={C.fg} size={11} anchor="middle">
              Sjøbrisen starter gjerne i 11–12-tiden og kulminerer om ettermiddagen.
            </L>
          </g>

          {/* NATT: LANDBRIS */}
          <g transform="translate(470, 0)">
            <rect x="20" y="30" width="415" height="260" rx="8" fill="url(#sb-night-sky)" />

            <circle cx="390" cy="75" r="16" fill="#fef08a" opacity="0.9" />
            <circle cx="384" cy="72" r="14" fill="#0b1329" />

            <L x="227" y="55" size={15} weight={800} anchor="middle" fill="#93c5fd">
              🌙 NATT: Landbris (Fralandsvind)
            </L>
            <L x="227" y="73" size={11} fill="#cbd5e1" anchor="middle">
              Land avkjøles raskt → kald luft synker
            </L>

            <rect x="20" y="250" width="180" height="130" fill="url(#sb-sea-grad)" />
            <path
              d="M 30 255 Q 50 252 70 255 T 110 255 T 150 255 T 190 255"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              opacity="0.6"
            />

            <path
              d="M 190 250 Q 215 248 245 242 L 435 232 L 435 380 L 190 380 Z"
              fill="url(#sb-land-night)"
              stroke="#334155"
              strokeWidth="1.5"
            />

            <circle cx="355" cy="275" r="16" fill="#0f2b32" stroke={C.teal} strokeWidth="1.8" />
            <L x="355" y="281" fill="#67e8f9" size={14} weight={900} anchor="middle">
              H
            </L>
            <L x="355" y="302" fill="#93c5fd" size={11} weight={800} anchor="middle">
              Kaldt land (+10 °C)
            </L>

            <circle cx="105" cy="275" r="16" fill="#7f1d1d" stroke={C.low} strokeWidth="1.8" />
            <L x="105" y="281" fill="#fca5a5" size={14} weight={900} anchor="middle">
              L
            </L>
            <L x="105" y="302" fill="#bae6fd" size={11} weight={800} anchor="middle">
              Lunkent hav (+16 °C)
            </L>

            <Arrow d="M 310 240 L 135 240" marker={m.teal} color={C.teal} width={3} />
            <L x="222" y="230" fill={C.teal} size={12} weight={900} anchor="middle">
              ← Landbris (Fralandsvind)
            </L>

            <Arrow d="M 105 215 L 105 155" marker={m.warm} color={C.warm} width={2.4} />

            <Arrow d="M 125 135 L 325 135" marker={m.fg} color={C.white} width={2.2} dash="4 3" />
            <L x="225" y="125" fill="#cbd5e1" size={11} weight={700} anchor="middle">
              Returstrøm i høyden →
            </L>

            <Arrow d="M 355 155 L 355 220" marker={m.cold} color={C.cold} width={2.6} />

            <rect x="35" y="330" width="385" height="50" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />
            <L x="227" y="350" fill={C.sand} size={11.5} weight={700} anchor="middle">
              Landbrisen er svakere enn sjøbrisen.
            </L>
            <L x="227" y="368" fill={C.fg} size={11} anchor="middle">
              Temperaturforskjellen hav/land er mindre om natten enn midt på dagen.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}
