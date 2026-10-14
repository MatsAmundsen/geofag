import { useId } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, StegVelger, type Key, type Lab } from "./isbre-figur";
import {
  keyframe,
  pickStep,
  smooth,
  useInView,
  useFigurSmal,
  StegRamme,
  useStepClock,
} from "./isbre-kit";

export function KontaktRegionalMetamorfoseFigur({
  heading = "Kontakt- og regional metamorfose",
  caption,
  initialStep,
}: { heading?: string; caption?: React.ReactNode; initialStep?: number }) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(6, motion.playing && visible, 3200, 1400, initialStep);
  const { step, phase } = clock;
  const s = keyframe(
    [
      { heat: 0.2, aureole: 0, pressure: 0, fold: 0, foliation: 0 },
      { heat: 1, aureole: 0.3, pressure: 0, fold: 0, foliation: 0 },
      { heat: 1, aureole: 1, pressure: 0, fold: 0, foliation: 0 },
      { heat: 0, aureole: 0, pressure: 0.4, fold: 0, foliation: 0 },
      { heat: 0, aureole: 0, pressure: 1, fold: 0.6, foliation: 0.2 },
      { heat: 0, aureole: 0, pressure: 1, fold: 1, foliation: 1 },
    ],
    step,
    phase,
  );
  const uid = useId().replace(/:/g, "");

  const labels: Lab[] = [
    { text: "Magma (intrusjon)", x: 180, y: 420, at: [220, 380], color: "#ffc59a", weight: 700 },
    { text: "Hornfels (kontaktaureole)", x: 40, y: 200, at: [160, 260], color: "#ffd9b0" },
    { text: "Lokal varmepåvirkning", x: 40, y: 80, at: [180, 140], color: C.warm },
  ];
  if (step >= 4) {
    labels.push({ text: "Rettet trykk fra fjellkjededannelse", x: 520, y: 80, at: [680, 160], color: "#8ec8ff" });
    labels.push({ text: "Foliasjon og skifrighet", x: 520, y: 420, at: [700, 340], color: "#d9c8e2" });
  }

  const keys: Key[] = [
    { text: "Magma", color: "#e0743d", kind: "fill" },
    { text: "Hornfels / kontaktaureole", color: "#c47a3a", kind: "fill" },
    { text: "Rettet trykk", color: "#5fa6c8", kind: "line" },
    { text: "Folierte bergarter", color: "#6a5a70", kind: "fill" },
  ];

  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Kontaktmetamorfose med lokal varme rundt magma, og regional metamorfose med rettet trykk og foliasjon under fjellkjededannelse"
        heading={heading}
        caption={
          caption ??
          "Kontaktmetamorfose: lokal varmepåvirkning rundt en intrusjon gir hornfels uten foliasjon. Regional metamorfose: høyt trykk og temperatur over store områder under fjellkjededannelse gir foliasjon og skifrighet. Skjematisk, uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger
              labels={[
                "Kontakt: magma trenger inn",
                "Kontakt: varme stråler ut",
                "Kontakt: hornfels dannes",
                "Regional: platene kolliderer",
                "Regional: bergartene foldes",
                "Regional: foliasjon utvikles",
              ]}
              step={step}
              onStep={pickStep(clock, motion)}
              label="Velg prosess"
            />
          </StegRamme>
        }
        status={[
          "Kontaktmetamorfose starter når magma trenger inn i sidebergarter. Varmen er lokal.",
          "Varme stråler ut fra magmaet. Sidebergartene varmes opp i en begrenset sone rundt intrusjonen.",
          "Sidebergartene omdannes til hornfels i kontaktaureolen. Lite eller ingen deformasjon, ingen foliasjon.",
          "Regional metamorfose skjer når kontinentalplater kolliderer. Rettet trykk virker over store områder.",
          "Bergartene foldes, strekkes og presses. Høyt trykk og økt temperatur virker samtidig.",
          "Mineralene orienteres vinkelrett på trykkretningen. Foliasjon og skifrighet utvikles over store områder.",
        ][step - 1]}
        labels={labels}
        keys={keys}
        notes={["Venstre: kontaktmetamorfose", "Høyre: regional metamorfose", "Skjematisk, uten målestokk"]}
        viewBox="0 0 960 520"
      >
        {({ d, m }) => (
          <g className={motion.motionClass} data-figur="kontakt-regional" data-step={step}>
            <rect x="0" y="0" width="960" height="520" fill={d.url.sky} />
            <g transform="translate(40 40)">
              <rect x="0" y="40" width="400" height="360" fill="#5b6458" rx="8" />
              <ellipse cx="200" cy="280" rx={70 + 20 * s.aureole} ry={50 + 15 * s.aureole} fill="#c47a3a" opacity={0.4 + 0.5 * s.aureole} />
              <ellipse cx="200" cy="280" rx="60" ry="40" fill={`url(#${uid}-mg)`} opacity={s.heat} />
              {s.heat > 0.1 && (
                <>
                  <path d="M200 240 L200 160" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} opacity={s.heat} />
                  <path d="M160 270 L100 220" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} opacity={s.heat} />
                  <path d="M240 270 L300 220" stroke={C.warm} strokeWidth="3" markerEnd={`url(#${m.warm})`} opacity={s.heat} />
                </>
              )}
              <text x="200" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill={C.fg}>Kontaktmetamorfose</text>
              <text x="200" y="430" textAnchor="middle" fontSize="14" fill={C.muted}>Lite deformasjon · ingen foliasjon</text>
            </g>
            <g transform="translate(500 40)">
              <rect x="0" y="40" width="420" height="360" fill="#5b6458" rx="8" />
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M20 ${120 + i * 50 + 15 * s.fold * Math.sin(i)} Q210 ${100 + i * 50 + 40 * s.fold} 400 ${120 + i * 50 + 15 * s.fold * Math.sin(i + 1)}`}
                  stroke="#9b8aa0"
                  strokeWidth={6 + 4 * s.foliation}
                  fill="none"
                  opacity={0.4 + 0.6 * s.foliation}
                />
              ))}
              {s.pressure > 0.2 && (
                <>
                  <path d="M60 200 L20 200" stroke="#5fa6c8" strokeWidth="4" markerEnd={`url(#${m.teal})`} opacity={s.pressure} />
                  <path d="M360 200 L400 200" stroke="#5fa6c8" strokeWidth="4" markerEnd={`url(#${m.teal})`} opacity={s.pressure} />
                </>
              )}
              <text x="210" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill={C.fg}>Regional metamorfose</text>
              <text x="210" y="430" textAnchor="middle" fontSize="14" fill={C.muted}>Høyt trykk og temperatur over store områder</text>
            </g>
            <defs>
              <radialGradient id={`${uid}-mg`}>
                <stop offset="0" stopColor="#ffd08a" />
                <stop offset="0.6" stopColor="#e0743d" />
                <stop offset="1" stopColor="#9c3a1f" />
              </radialGradient>
            </defs>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
