import { useState } from "react";
import { useAnimationPlaying, useStepCycle } from "./use-motion";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";

function MiniSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  valueLabel,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  valueLabel: string;
}) {
  return (
    <label className="flex min-w-0 items-center gap-2 text-xs font-medium text-foreground">
      <span className="whitespace-nowrap">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-28 cursor-pointer accent-primary sm:w-36"
      />
      <span className="w-20 shrink-0 font-mono text-primary">{valueLabel}</span>
    </label>
  );
}

function StepPicker({
  labels,
  step,
  onStep,
  label,
}: {
  labels: string[];
  step: number;
  onStep: (step: number) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
      {labels.map((item, index) => {
        const n = index + 1;
        const active = step === n;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => onStep(n)}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-muted/60 text-foreground hover:bg-muted"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function frontWord(value: number) {
  if (value < 40) return "tilbake";
  if (value > 60) return "fram";
  return "står";
}

function frontSentence(value: number) {
  if (value < 40) return "Isfronten trekker seg tilbake";
  if (value > 60) return "Isfronten rykker fram";
  return "Isfronten står";
}

/** Lengdesnitt: siging, nærings- og tæringsområde, likevektslinje og isfront. */
export function BreLengdesnittDiagram() {
  const motion = useAnimationPlaying();
  const [front, setFront] = useState(48);
  const toe = 500 + (front / 100) * 280;
  const ela = 400;
  const bed = (x: number) => 278 + (x - 90) * 0.07;
  const surface = (x: number) => {
    const t = (x - 110) / (toe - 110);
    return 128 + t * (bed(toe) - 18 - 128);
  };
  const samples = (from: number, to: number, n: number) =>
    Array.from({ length: n + 1 }, (_, i) => from + ((to - from) * i) / n);
  const iceXs = samples(110, toe, 18);
  const top = iceXs.map((x) => `${x.toFixed(1)},${surface(x).toFixed(1)}`);
  const bottom = [...iceXs].reverse().map((x) => `${x.toFixed(1)},${bed(x).toFixed(1)}`);
  const snowXs = samples(110, ela, 10);
  const snow = [
    ...snowXs.map((x) => `${x.toFixed(1)},${(surface(x) - 8).toFixed(1)}`),
    ...[...snowXs].reverse().map((x) => `${x.toFixed(1)},${surface(x).toFixed(1)}`),
  ].join(" ");
  const playing = motion.playing;

  return (
    <Diagram
      title="Lengdesnitt av en isbre med næringsområde, tæringsområde, likevektslinje og isfront"
      heading="Breen i lengdesnitt"
      caption="Isen hoper seg opp i næringsområdet, siger nedover og smelter i tæringsområdet. Der isfronten står, går isen over til smeltevann. Skyveren flytter isfronten fram eller tilbake."
      viewBox="0 0 900 420"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <MiniSlider
            label="Isfront"
            min={0}
            max={100}
            step={1}
            value={front}
            onChange={setFront}
            valueLabel={frontWord(front)}
          />
          <span className="text-xs text-muted-foreground">{frontSentence(front)}</span>
        </>
      }
    >
      {(m) => (
        <>
          <style>{`
            @keyframes bre-sig {
              to { stroke-dashoffset: -36; }
            }
            .bre-sig {
              animation: bre-sig 1.8s linear infinite;
              animation-play-state: ${playing ? "running" : "paused"};
            }
          `}</style>
          <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figur="bre-lengdesnitt">
            <path d="M 40 250 L 90 168 L 160 210 L 250 150 L 360 188 L 520 140 L 700 176 L 860 150 L 860 250 Z" fill="#1a2a34" />
            <path d={`M 40 430 L 40 ${bed(40)} L 860 ${bed(860)} L 860 430 Z`} fill="#3d4a3c" />
            <polygon points={`${top.join(" ")} ${bottom.join(" ")}`} fill="#9ec4dc" opacity="0.95" />
            <polygon points={snow} fill="#f4f7f8" opacity="0.92" />
            <line
              x1={ela}
              y1={surface(ela) - 28}
              x2={ela}
              y2={bed(ela)}
              stroke={C.warm}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <L x={ela} y={surface(ela) - 36} fill={C.warm} size={13} weight={700} anchor="middle">
              Likevektslinje
            </L>
            <L x="230" y="108" fill={C.white} size={15} weight={700} anchor="middle">
              Næringsområde
            </L>
            <L x={Math.min(620, (ela + toe) / 2)} y="108" fill={C.cold} size={15} weight={700} anchor="middle">
              Tæringsområde
            </L>
            <Arrow
              d={`M 180 ${surface(180) + 36} C 250 ${surface(250) + 28}, 320 ${surface(320) + 24}, 390 ${surface(390) + 22}`}
              marker={m.teal}
              color={C.teal}
              width={3}
              dash="8 6"
            />
            <path
              d={`M 210 ${surface(210) + 58} C 300 ${surface(300) + 46}, 420 ${surface(Math.min(420, toe - 20)) + 36}, ${toe - 30} ${surface(toe - 30) + 16}`}
              fill="none"
              stroke={C.teal}
              strokeWidth="3"
              strokeDasharray="8 6"
              className="bre-sig"
              markerEnd={`url(#${m.teal})`}
            />
            <L x="250" y={surface(250) + 78} fill={C.teal} size={13} weight={700}>
              Siger
            </L>
            <L x={toe + 8} y={surface(toe) - 8} fill={C.fg} size={13} weight={700}>
              Isfront
            </L>
            <path
              d={`M ${toe} ${bed(toe) - 4} Q ${toe + 36} ${bed(toe) + 8} ${Math.min(860, toe + 70)} ${bed(Math.min(860, toe + 70)) + 6}`}
              fill="none"
              stroke={C.cold}
              strokeWidth="3"
            />
            <L x={Math.min(820, toe + 24)} y={bed(toe) + 28} fill={C.cold} size={12} weight={600}>
              Smeltevann
            </L>
            <L x="120" y="390" fill={C.sand} size={14} weight={600}>
              Berg
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/** V-dal som graves til U-dal, med hengende sidedal og fjord. */
export function VdalTilUdalDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(4, playing, 2600);
  const labels = ["1 V-dal", "2 Isen graver", "3 U-dal", "4 Fjord"];
  const showIce = step === 2;
  const showU = step >= 3;
  const showFjord = step === 4;

  return (
    <Diagram
      title="En V-dal blir til en U-dal med hengende sidedal og fjord under havnivå"
      heading="Fra V-dal til U-dal og fjord"
      caption="En elvedal med V-form blir gravd ut av isen til en U-dal med bratte sider og bred bunn. Sidedalen blir liggende igjen som hengende sidedal. Der bunnen ligger under havnivå, blir dalen en fjord."
      viewBox="0 0 900 460"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={labels} step={step} onStep={setStep} label="Dalform" />
          <span className="text-xs text-muted-foreground">{labels[step - 1]}</span>
        </>
      }
    >
      {(m) => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figur="vdal-udal" data-step={step}>
          <path d="M 40 420 L 40 80 L 860 80 L 860 420 Z" fill="#163042" />
          {showU ? (
            <path d="M 70 90 L 150 90 L 210 250 L 250 300 L 620 300 L 690 210 L 760 210 L 820 90 L 860 90 L 860 420 L 70 420 Z" fill="#4a5648" />
          ) : (
            <path d="M 70 90 L 150 90 L 430 340 L 760 90 L 860 90 L 860 420 L 70 420 Z" fill="#4a5648" />
          )}
          {showIce ? (
            <path d="M 190 120 L 430 300 L 690 120 L 620 150 L 430 270 L 250 150 Z" fill="#d5e6f0" opacity="0.9" />
          ) : null}
          {showU ? (
            <path d="M 690 210 L 760 210 L 820 120 L 860 120 L 860 90 L 820 90 L 760 188 L 700 188 Z" fill="#3e4a3d" />
          ) : null}
          {showFjord ? (
            <>
              <path d="M 250 248 L 620 248 L 620 300 L 250 300 Z" fill="#1d4e6b" opacity="0.92" />
              <line x1="80" y1="248" x2="820" y2="248" stroke={C.cold} strokeWidth="2" strokeDasharray="7 5" />
              <L x="96" y="238" fill={C.cold} size={13} weight={700}>
                Havnivå
              </L>
              <L x="360" y="278" fill={C.white} size={13} weight={700} anchor="middle">
                Fjord
              </L>
              <L x="430" y="328" fill={C.sand} size={13} weight={600} anchor="middle">
                Bunn under havnivå
              </L>
            </>
          ) : null}
          {!showU ? (
            <>
              <L x="300" y="150" fill={C.fg} size={16} weight={700}>
                V-dal
              </L>
              <path d="M 400 330 Q 430 318 460 330" fill="none" stroke={C.cold} strokeWidth="3" />
              <L x="430" y="360" fill={C.cold} size={13} anchor="middle">
                Elv
              </L>
            </>
          ) : (
            <L x="160" y="150" fill={C.fg} size={16} weight={700}>
              U-dal
            </L>
          )}
          {showIce ? (
            <>
              <Arrow d="M 360 180 L 410 240" marker={m.teal} color={C.teal} width={3} />
              <L x="300" y="176" fill={C.teal} size={13} weight={700}>
                Isen graver
              </L>
            </>
          ) : null}
          {showU ? (
            <>
              <L x="700" y="168" fill={C.warm} size={13} weight={700}>
                Hengende sidedal
              </L>
              <Arrow d="M 748 206 L 748 246" marker={m.warm} color={C.warm} width={2.4} />
            </>
          ) : null}
        </g>
      )}
    </Diagram>
  );
}

/** Botn, egg og tind i samme fjellparti. */
export function BotnEggTindDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(3, playing, 2400);
  const labels = ["1 Botn", "2 Egg", "3 Tind"];
  const dim = (n: number) => (playing && step !== n ? 0.35 : 1);

  return (
    <Diagram
      title="Botn, egg og tind"
      heading="Botn, egg og tind"
      caption="Botner graves ut av små breer. Mellom to botner står det igjen en egg, og der flere botner møtes, står det igjen en tind."
      viewBox="0 0 900 420"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={labels} step={step} onStep={setStep} label="Alpine former" />
          <span className="text-xs text-muted-foreground">
            {playing ? labels[step - 1] : "Alle tre formene vises"}
          </span>
        </>
      }
    >
      {(m) => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figur="botn-egg-tind" data-step={step}>
          <path d="M 30 250 L 870 250 L 870 390 L 30 390 Z" fill="#1c2830" />
          <g opacity={dim(1)}>
            <path d="M 40 250 L 70 120 L 150 150 L 210 250 Z" fill="#5c684f" />
            <path d="M 150 150 C 190 210 250 230 300 250 L 210 250 Z" fill="#3d4a38" />
            <path d="M 175 205 C 200 220 230 222 255 210" fill="#e7eef2" />
            <L x="150" y="108" fill={C.fg} size={15} weight={700} anchor="middle">
              Botn
            </L>
            <Arrow d="M 150 118 L 190 168" marker={m.fg} color={C.fg} width={2} />
          </g>
          <g opacity={dim(2)}>
            <path d="M 330 250 L 390 150 L 450 90 L 470 250 Z" fill="#6a6256" />
            <path d="M 470 250 L 530 150 L 610 250 Z" fill="#4e5648" />
            <path d="M 430 140 L 450 90 L 490 150" fill="none" stroke={C.warm} strokeWidth="4" />
            <L x="450" y="72" fill={C.warm} size={15} weight={700} anchor="middle">
              Egg
            </L>
          </g>
          <g opacity={dim(3)}>
            <path d="M 640 250 L 720 70 L 800 250 Z" fill="#6a6256" />
            <path d="M 690 250 L 720 110 L 760 250 Z" fill="#8a7b68" />
            <path d="M 720 70 L 690 160" fill="none" stroke={C.sand} strokeWidth="3" />
            <path d="M 720 70 L 760 170" fill="none" stroke={C.sand} strokeWidth="3" />
            <L x="720" y="52" fill={C.warm} size={15} weight={700} anchor="middle">
              Tind
            </L>
          </g>
          <L x="40" y="370" fill={C.muted} size={13}>
            Skål, skarp rygg og spiss topp
          </L>
        </g>
      )}
    </Diagram>
  );
}

/** Snitt der endemorene, esker, drumlin, flyttblokk og breelvdelta dannes. */
export function AvsetningsformerDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(5, playing, 2400);
  const labels = ["1 Endemorene", "2 Esker", "3 Drumlin", "4 Flyttblokk", "5 Breelvdelta"];
  const on = (n: number) => (!playing || step === n ? 1 : 0.28);

  return (
    <Diagram
      title="Snitt som viser endemorene, esker, drumlin, flyttblokk og breelvdelta"
      heading="Hvor avsetningene legges igjen"
      caption="Endemorenen dannes ved isfronten, eskeren i en smeltevannstunnel under isen og drumlinen under isen i bevegelsesretningen. Flyttblokken blir liggende når isen smelter, og breelvdeltaet bygges der smeltevannet møter vann."
      viewBox="0 0 960 460"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={labels} step={step} onStep={setStep} label="Avsetningsform" />
          <span className="text-xs text-muted-foreground">
            {playing ? labels[step - 1] : "Alle formene vises"}
          </span>
        </>
      }
    >
      {(m) => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figur="avsetning" data-step={step}>
          <path d="M 40 300 L 900 300 L 900 430 L 40 430 Z" fill="#3c4a3e" />
          <path d="M 40 168 C 180 150 320 176 470 190 L 560 210 L 560 250 L 40 250 Z" fill="#d7e7f2" />
          <path d="M 180 268 C 230 250 280 250 340 272 C 300 286 230 286 180 268 Z" fill="#8d7a62" opacity={on(3)} />
          <path d="M 360 286 Q 430 292 500 278 Q 470 300 400 302 Q 360 298 360 286 Z" fill="#c9b896" opacity={on(2)} />
          <path d="M 520 236 L 600 200 L 640 248 L 560 250 Z" fill="#8d7a62" opacity={on(1)} />
          <path d="M 640 248 L 860 248 L 900 300 L 640 300 Z" fill="#1c4d68" />
          <path d="M 630 236 L 760 210 L 820 248 L 640 248 Z" fill="#d9c7a2" opacity={on(5)} />
          <circle cx="470" cy="236" r="10" fill="#6b5344" opacity={on(4)} />
          <Arrow d="M 80 200 L 180 206" marker={m.teal} color={C.teal} width={3} />
          <L x="80" y="188" fill={C.teal} size={12} weight={700}>
            Isbevegelse
          </L>
          <g opacity={on(3)}>
            <L x="250" y="242" fill={C.fg} size={13} weight={700} anchor="middle">
              Drumlin
            </L>
          </g>
          <g opacity={on(2)}>
            <L x="430" y="328" fill={C.sand} size={13} weight={700} anchor="middle">
              Esker
            </L>
            <Arrow d="M 430 314 L 430 292" marker={m.sand} color={C.sand} width={2} />
          </g>
          <g opacity={on(1)}>
            <L x="590" y="184" fill={C.warm} size={13} weight={700} anchor="middle">
              Endemorene
            </L>
          </g>
          <g opacity={on(4)}>
            <L x="470" y="214" fill={C.fg} size={12} weight={700} anchor="middle">
              Flyttblokk
            </L>
          </g>
          <g opacity={on(5)}>
            <L x="740" y="198" fill={C.sand} size={13} weight={700} anchor="middle">
              Breelvdelta
            </L>
          </g>
          <L x="780" y="276" fill={C.cold} size={13} weight={600} anchor="middle">
            Hav eller innsjø
          </L>
          <L x="160" y="400" fill={C.muted} size={13}>
            Is
          </L>
          <L x="700" y="400" fill={C.sand} size={13}>
            Smeltevann sorterer sand og grus
          </L>
        </g>
      )}
    </Diagram>
  );
}

/** Frostsprengning i fire steg. */
export function FrostsprengningDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(4, playing, 2200);
  const labels = ["1 Vann", "2 Fryser", "3 Sprekk", "4 Løsner"];
  const frames = [
    "Vann renner inn i en sprekk.",
    "Vannet fryser og utvider seg.",
    "Sprekken blir større.",
    "Etter mange runder løsner en bit av berget.",
  ];

  return (
    <Diagram
      title="Frostsprengning i fire steg"
      heading="Frostsprengning"
      caption="1. Vann renner inn i en sprekk. 2. Vannet fryser og utvider seg. 3. Sprekken blir større. 4. Etter mange runder løsner en bit av berget."
      viewBox="0 0 960 430"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={labels} step={step} onStep={setStep} label="Frostsprengning" />
          <span className="text-xs text-muted-foreground">{frames[step - 1]}</span>
        </>
      }
    >
      {() => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figur="frost" data-step={step}>
          {[0, 1, 2, 3].map((index) => {
            const x = 40 + index * 230;
            const active = step === index + 1;
            const crack = 8 + index * 7;
            return (
              <g key={index} opacity={!playing || active ? 1 : 0.45}>
                <rect x={x} y="70" width="200" height="230" rx="16" fill="#4d5648" stroke={active ? C.warm : C.dim} strokeWidth={active ? 3 : 1} />
                <path
                  d={`M ${x + 100} 90 L ${x + 100 - crack} 180 L ${x + 100 + crack} 250`}
                  fill="none"
                  stroke="#1b2420"
                  strokeWidth={6 + index * 3}
                  strokeLinecap="round"
                />
                {index === 0 ? (
                  <path d={`M ${x + 100} 100 L ${x + 96} 170`} stroke={C.cold} strokeWidth="4" />
                ) : null}
                {index >= 1 && index < 3 ? (
                  <path
                    d={`M ${x + 100 - crack / 2} 120 L ${x + 100 + crack / 2} 200`}
                    stroke="#f4f7f8"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                ) : null}
                {index === 1 ? (
                  <>
                    <path d={`M ${x + 70} 160 L ${x + 88} 160`} stroke={C.warm} strokeWidth="3" markerEnd="" />
                    <path d={`M ${x + 130} 160 L ${x + 112} 160`} stroke={C.warm} strokeWidth="3" />
                  </>
                ) : null}
                {index === 3 ? (
                  <path d={`M ${x + 118} 150 L ${x + 168} 250 L ${x + 130} 268 Z`} fill="#6d624f" />
                ) : null}
                <L x={x + 100} y="340" fill={C.fg} size={15} weight={700} anchor="middle">
                  {labels[index]}
                </L>
              </g>
            );
          })}
        </g>
      )}
    </Diagram>
  );
}

/** Isen trykker skorpa ned, smelter, og landet hever seg. Marin grense markeres til slutt. */
export function IsostasiSnittDiagram() {
  const motion = useAnimationPlaying();
  const playing = motion.playing;
  const [step, setStep] = useStepCycle(4, playing, 2600);
  const labels = ["1 Isen tynger", "2 Isen smelter", "3 Landet hever seg", "4 Marin grense"];
  const drop = [48, 40, 16, 4][step - 1] ?? 4;
  const land = (x: number) => {
    const bowl = Math.exp(-((x - 450) ** 2) / 70000);
    return 150 + drop * bowl + (x - 80) * 0.02;
  };
  const crustBase = (x: number) => land(x) + 70;
  const xs = Array.from({ length: 25 }, (_, i) => 70 + i * 32);
  const landPath = xs.map((x) => `${x},${land(x).toFixed(1)}`).join(" ");
  const basePath = [...xs].reverse().map((x) => `${x},${crustBase(x).toFixed(1)}`).join(" ");
  const sea = 214;
  const showIce = step <= 2;
  const iceThick = step === 1 ? 70 : 24;

  return (
    <Diagram
      title="Isostasi og landheving med marin grense"
      heading="Landet presses ned og hever seg"
      caption="Isen presser landet ned. Når isen smelter, kommer havet inn, og deretter hever landet seg sakte. Marin grense er det høyeste nivået havet nådde."
      viewBox="0 0 920 440"
      wide
      scroll
      action={<PlayPauseToggle isPlaying={playing} onToggle={motion.toggle} />}
      toolbar={
        <>
          <StepPicker labels={labels} step={step} onStep={setStep} label="Isostasi" />
          <span className="text-xs text-muted-foreground">{labels[step - 1]}</span>
        </>
      }
    >
      {(m) => (
        <g className={motion.motionClass} data-playing={playing ? "yes" : "no"} data-figur="isostasi" data-step={step}>
          <rect x="40" y="300" width="840" height="110" fill="#5c4638" />
          <L x="70" y="360" fill={C.warm} size={14} weight={600}>
            Seig astenosfære
          </L>
          <polygon points={`${landPath} ${basePath}`} fill="#4e5c50" />
          <L x="80" y="250" fill={C.sand} size={13} weight={600}>
            Litosfære
          </L>
          {xs.some((x) => land(x) > sea) ? (
            <path
              d={`M 70 ${sea} L 870 ${sea} L 870 300 L 70 300 Z`}
              fill="#1c4e68"
              opacity="0.55"
            />
          ) : null}
          <line x1="70" y1={sea} x2="870" y2={sea} stroke={C.cold} strokeWidth="1.5" />
          <L x="760" y={sea - 8} fill={C.cold} size={12} weight={700}>
            Havnivå
          </L>
          {showIce ? (
            <path
              d={`M 220 ${land(220) - iceThick} Q 450 ${land(450) - iceThick - 10} 680 ${land(680) - iceThick * 0.4} L 680 ${land(680)} L 220 ${land(220)} Z`}
              fill="#e7f1f6"
              opacity="0.95"
            />
          ) : null}
          {step === 1 ? (
            <g>
              <Arrow d="M 450 70 L 450 120" marker={m.cold} color={C.cold} width={3} />
              <L x="450" y="60" fill={C.fg} size={14} weight={700} anchor="middle">
                Isen presser landet ned
              </L>
            </g>
          ) : null}
          {step === 2 ? (
            <L x="450" y="64" fill={C.fg} size={14} weight={700} anchor="middle">
              Isen smelter, havet kommer inn
            </L>
          ) : null}
          {step >= 3 ? (
            <g>
              <Arrow d={`M 450 ${land(450) + 40} L 450 ${land(450) + 8}`} marker={m.warm} color={C.warm} width={3} />
              <L x="450" y="64" fill={C.warm} size={14} weight={700} anchor="middle">
                Landet hever seg
              </L>
            </g>
          ) : null}
          {step === 4 ? (
            <g>
              <line x1="250" y1="168" x2="700" y2="168" stroke={C.warm} strokeWidth="2" strokeDasharray="7 4" />
              <L x="470" y="158" fill={C.warm} size={14} weight={700} anchor="middle">
                Marin grense
              </L>
            </g>
          ) : null}
        </g>
      )}
    </Diagram>
  );
}
