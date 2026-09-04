import { Arrow, C, Diagram, L } from "./svg-kit";

export function EarthRadiationBudgetDiagram() {
  return (
    <Diagram
      title="Jordens strålingsbalanse med tall: innstråling 340 W/m², albedo 100 W/m², utstråling 240 W/m² og drivhuseffekt"
      heading="Jordens strålingsbalanse og energibudsjett"
      caption="Globalt årsgjennomsnitt (IPCC AR6). 340 W/m² kortbølget solstråling treffer atmosfæren. Omtrent 30 % reflekteres direkte (albedo). Resten absorberes og må forlate jorden som langbølget varmestråling. Drivhusgasser fanger varmen og sender den tilbake, noe som hever bakketemperaturen."
      viewBox="0 0 900 480"
      wide
    >
      {(m) => (
        <>
          {/* Hovedsoner: Verdensrommet (øverst), Atmosfære (midten), Jordoverflaten (nederst) */}
          <rect x="40" y="30" width="820" height="420" rx="10" fill="#0d1419" stroke={C.dim} strokeWidth="1.5" />

          {/* Toppen av atmosfæren linje */}
          <line x1="40" y1="90" x2="860" y2="90" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 4" />
          <L x="55" y="80" fill={C.muted} size={13} weight={600}>Toppen av atmosfæren (TOA)</L>

          {/* Drivhuslag i atmosfæren */}
          <rect x="50" y="150" width="800" height="150" rx="8" fill="#182c38" opacity="0.6" stroke={C.teal} strokeWidth="1" strokeDasharray="4 3" />
          <L x="75" y="175" fill={C.teal} size={14} weight={700}>Atmosfære med drivhusgasser og skyer</L>
          <L x="75" y="195" fill={C.muted} size={12}>H₂O, CO₂, CH₄, N₂O · Absorberer selektivt infrarød stråling</L>

          {/* Jordoverflaten nederst */}
          <rect x="40" y="360" width="820" height="90" rx="6" fill="#1c251e" />
          <line x1="40" y1="360" x2="860" y2="360" stroke={C.sand} strokeWidth="2" />
          <L x="55" y="385" fill={C.sand} size={15} weight={700}>Jordoverflaten (hav og land)</L>
          <L x="55" y="405" fill={C.muted} size={12}>Gjennomsnittstemperatur: +15 °C (uten drivhuseffekt: -18 °C)</L>

          {/* --- KORTBØLGET STRÅLING (GUL/ORANSJE) --- */}
          {/* 1. Solinnstråling inn: 340 W/m² */}
          <Arrow d="M 170 45 L 170 350" marker={m.warm} color={C.warm} width={6} />
          <L x="185" y="65" fill={C.warm} size={16} weight={700}>Inn: 340 W/m²</L>
          <L x="185" y="82" fill={C.fg} size={12}>Kortbølget sollys (100 %)</L>

          {/* 2. Reflektert albedo ut: 100 W/m² (~30 %) */}
          <Arrow d="M 170 180 C 190 140, 260 110, 290 45" marker={m.sand} color={C.sand} width={3.8} />
          <L x="305" y="65" fill={C.sand} size={15} weight={700}>Albedo: ~100 W/m²</L>
          <L x="305" y="82" fill={C.muted} size={12}>Reflektert fra skyer og is (~30 %)</L>

          {/* 3. Absorbert solvarme ved bakken: ~160 W/m² (+ ~80 i luft = 240) */}
          <L x="185" y="340" fill={C.warm} size={13} weight={600}>~160 W/m² absorbert i bakken</L>

          {/* --- LANGBØLGET STRÅLING (RØD/TEAL/VARME) --- */}
          {/* 4. Jordoverflaten emitterer varme: ~398 W/m² */}
          <Arrow d="M 500 355 L 500 240" marker={m.low} color={C.low} width={5.2} />
          <L x="515" y="325" fill={C.low} size={15} weight={700}>Jordstråling: ~398 W/m²</L>
          <L x="515" y="342" fill={C.muted} size={12}>Termisk infrarød langbølgestråling</L>

          {/* 5. Drivhuseffekt - tilbakespredning mot bakken: ~342 W/m² */}
          <Arrow d="M 540 230 C 580 270, 600 310, 600 350" marker={m.teal} color={C.teal} width={4.8} />
          <L x="615" y="300" fill={C.teal} size={15} weight={700}>Atmosfærisk tilbakespredning</L>
          <L x="615" y="318" fill={C.teal} size={13} weight={600}>Drivhuseffekt: ~342 W/m²</L>
          <L x="615" y="335" fill={C.muted} size={11}>Varmer opp overflaten på nytt</L>

          {/* 6. Utstråling til verdensrommet (balanse): 240 W/m² */}
          <Arrow d="M 500 210 L 500 45" marker={m.rain} color={C.rain} width={4.2} />
          <L x="515" y="65" fill={C.rain} size={16} weight={700}>Ut i rommet: ~240 W/m²</L>
          <L x="515" y="82" fill={C.fg} size={12}>Langbølget utstråling (OLR)</L>

          {/* Balanseoppsummering boks i toppen høyre */}
          <g>
            <rect x="680" y="105" width="165" height="130" rx="8" fill="#141f27" stroke={C.teal} strokeWidth="1.2" />
            <L x="762" y="130" fill={C.teal} size={13} weight={700} anchor="middle">Balanse i toppen:</L>
            <L x="762" y="152" fill={C.warm} size={13} anchor="middle">Inn: +340 W/m²</L>
            <L x="762" y="172" fill={C.sand} size={13} anchor="middle">Albedo: -100 W/m²</L>
            <L x="762" y="192" fill={C.rain} size={13} anchor="middle">Ut: -240 W/m²</L>
            <line x1="700" y1="202" x2="825" y2="202" stroke={C.dim} />
            <L x="762" y="222" fill={C.fg} size={13} weight={700} anchor="middle">Netto balanse = 0</L>
          </g>
        </>
      )}
    </Diagram>
  );
}
