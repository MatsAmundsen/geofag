import { Arrow, C, Diagram, L } from "./svg-kit";

export function EarthRadiationBudgetDiagram() {
  return (
    <Diagram
      title="Jordas energibudsjett: 340 watt per kvadratmeter inn, 29 prosent reflektert, 23 prosent i atmosfæren og 48 prosent ved overflaten"
      heading="Jordas energibudsjett"
      caption="Av 340 watt per kvadratmeter som treffer jorda, kastes 29 prosent tilbake. 23 prosent tas opp i atmosfæren og 48 prosent ved overflaten. Hele jordas system tar opp omtrent 240 watt per kvadratmeter (NASA, 2009)."
      viewBox="0 0 900 480"
      wide
    >
      {(m) => (
        <>
          <rect x="40" y="30" width="820" height="420" rx="10" fill="#0d1419" stroke={C.dim} strokeWidth="1.5" />

          <line x1="40" y1="90" x2="860" y2="90" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 4" />
          <L x="55" y="80" fill={C.muted} size={13} weight={600}>Toppen av atmosfæren</L>

          <rect x="50" y="150" width="800" height="150" rx="8" fill="#182c38" opacity="0.6" stroke={C.teal} strokeWidth="1" strokeDasharray="4 3" />
          <L x="75" y="175" fill={C.teal} size={14} weight={700}>Atmosfære med drivhusgasser og skyer</L>
          <L x="75" y="195" fill={C.muted} size={12}>Vanndamp, karbondioksid og metan holder igjen varmestråling</L>

          <rect x="40" y="360" width="820" height="90" rx="6" fill="#1c251e" />
          <line x1="40" y1="360" x2="860" y2="360" stroke={C.sand} strokeWidth="2" />
          <L x="55" y="385" fill={C.sand} size={15} weight={700}>Jordoverflaten (hav og land)</L>
          <L x="55" y="405" fill={C.muted} size={12}>Gjennomsnittstemperatur omtrent 15 °C</L>

          <Arrow d="M 170 45 L 170 350" marker={m.warm} color={C.warm} width={6} />
          <L x="185" y="65" fill={C.warm} size={16} weight={700}>Inn: 340 W/m²</L>
          <L x="185" y="82" fill={C.fg} size={12}>Sollys mot jorda</L>

          <Arrow d="M 170 180 C 190 140, 260 110, 290 45" marker={m.sand} color={C.sand} width={3.8} />
          <L x="305" y="65" fill={C.sand} size={15} weight={700}>Reflektert: 29 %</L>
          <L x="305" y="82" fill={C.muted} size={12}>Mest fra skyer, også lyse flater og lufta</L>

          <L x="185" y="340" fill={C.warm} size={13} weight={600}>48 % tas opp ved overflaten</L>

          <Arrow d="M 500 355 L 500 240" marker={m.low} color={C.low} width={5.2} />
          <L x="515" y="325" fill={C.low} size={15} weight={700}>Varme fra overflaten</L>
          <L x="515" y="342" fill={C.muted} size={12}>Langbølget varmestråling</L>

          <Arrow d="M 540 230 C 580 270, 600 310, 600 350" marker={m.teal} color={C.teal} width={4.8} />
          <L x="615" y="300" fill={C.teal} size={15} weight={700}>Drivhusgasser sender varme tilbake</L>
          <L x="615" y="318" fill={C.muted} size={12}>De holder igjen varme nær bakken</L>

          <Arrow d="M 500 210 L 500 45" marker={m.rain} color={C.rain} width={4.2} />
          <L x="515" y="65" fill={C.rain} size={16} weight={700}>Ut i rommet</L>
          <L x="515" y="82" fill={C.fg} size={12}>Når inn og ut er like, er temperaturen relativt stabil</L>

          <g>
            <rect x="650" y="105" width="195" height="145" rx="8" fill="#141f27" stroke={C.teal} strokeWidth="1.2" />
            <L x="747" y="128" fill={C.teal} size={13} weight={700} anchor="middle">Av innstrålingen</L>
            <L x="747" y="152" fill={C.sand} size={13} anchor="middle">29 % reflektert</L>
            <L x="747" y="174" fill={C.fg} size={13} anchor="middle">23 % i atmosfæren</L>
            <L x="747" y="196" fill={C.warm} size={13} anchor="middle">48 % ved overflaten</L>
            <L x="747" y="226" fill={C.muted} size={12} anchor="middle">Systemet tar opp ~240 W/m²</L>
          </g>
        </>
      )}
    </Diagram>
  );
}
