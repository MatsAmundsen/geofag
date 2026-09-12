import { Arrow, C, Diagram, L } from "./svg-kit";

const SEA = "#13202a";
const LAND = "#1e2c25";

function Surface({ ox }: { ox: number }) {
  return (
    <>
      <rect x={ox + 10} y="280" width="160" height="64" fill={SEA} />
      <path
        d={`M ${ox + 170} 280 L ${ox + 240} 266 L ${ox + 310} 262 L ${ox + 380} 254 L ${ox + 380} 344 L ${ox + 170} 344 Z`}
        fill={LAND}
      />
      <line x1={ox + 10} y1="280" x2={ox + 170} y2="280" stroke={C.dim} strokeWidth="1.5" />
    </>
  );
}

/**
 * 1. AtmosphericColumnDiagram
 * Viser atmosfærens luftsøyle, molekyltetthet og trykkfall med høyden.
 */
export function AtmosphericColumnDiagram() {
  return (
    <Diagram
      title="Luftsøylen og trykkfall med høyden"
      heading="Luftsøylen: Trykk er vekten av luften over deg"
      caption="Luft har masse og tiltrekkes av jordens tyngdekraft. Lufttrykket i ethvert punkt er lik vekten av hele luftsøylen som hviler ovenfor. Ved havnivå veier luftsøylen over én kvadratmeter om lag 10 000 kg (10 tonn!), noe som tilsvarer et standardtrykk på 1013,25 hPa. Fordi luft er komprimerbar, er molekylene tettest pakket nær bakken. Allerede ved 5500 meter er trykket halvert (500 hPa), og over tropopausen (~11 km) befinner over 75 % av all atmosfærisk masse seg under deg."
      viewBox="0 0 860 480"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="col-atm-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#253e4f" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#182a36" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#121b22" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0a0f13" stopOpacity="0.2" />
            </linearGradient>
            <pattern
              id="dense-dots"
              x="0"
              y="0"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="1.3" fill={C.cold} opacity="0.6" />
              <circle cx="12" cy="12" r="1.3" fill={C.cold} opacity="0.6" />
              <circle cx="12" cy="4" r="0.9" fill={C.teal} opacity="0.4" />
              <circle cx="4" cy="12" r="0.9" fill={C.teal} opacity="0.4" />
            </pattern>
          </defs>

          {/* Bakkenivå */}
          <rect x="40" y="410" width="780" height="40" fill="#141f1a" rx="4" />
          <line x1="40" y1="410" x2="820" y2="410" stroke="#2a4534" strokeWidth="2.5" />
          <L x="50" y="432" fill="#78a88a" size={13} weight={600}>
            Jordoverflaten / havnivå (0 moh.) · Grunnflate 1 m²
          </L>

          {/* Selve luftsøylen */}
          <rect
            x="230"
            y="60"
            width="180"
            height="350"
            fill="url(#col-atm-grad)"
            stroke={C.dim}
            strokeWidth="1.8"
          />
          <rect x="231" y="320" width="178" height="90" fill="url(#dense-dots)" opacity="0.9" />
          <rect x="231" y="220" width="178" height="100" fill="url(#dense-dots)" opacity="0.5" />
          <rect x="231" y="130" width="178" height="90" fill="url(#dense-dots)" opacity="0.25" />
          <rect x="231" y="61" width="178" height="70" fill="url(#dense-dots)" opacity="0.1" />

          {/* Vekt/kraft-pil for tyngdekraft */}
          <Arrow d="M 320 80 L 320 395" marker={m.warm} color={C.warm} width={3.2} />
          <L x="330" y="240" fill={C.warm} size={13} weight={700}>
            Tyngdekraften (g) trekker
          </L>
          <L x="330" y="258" fill={C.warm} size={11}>
            luftsøylen nedover
          </L>

          {/* Høydenivåer og trykkangivelser på venstre side */}
          <line x1="160" y1="100" x2="230" y2="100" stroke={C.teal} strokeDasharray="3 3" />
          <L x="150" y="96" fill={C.teal} size={14} weight={800} anchor="end">
            11 000 m
          </L>
          <L x="150" y="112" fill={C.muted} size={11} anchor="end">
            Tropopausen · ~250 hPa
          </L>

          <line
            x1="160"
            y1="230"
            x2="230"
            y2="230"
            stroke={C.sand}
            strokeDasharray="4 3"
            strokeWidth="1.4"
          />
          <L x="150" y="226" fill={C.sand} size={14} weight={800} anchor="end">
            5 500 m
          </L>
          <L x="150" y="242" fill={C.sand} size={12} weight={700} anchor="end">
            500 hPa (halvert trykk!)
          </L>
          <L x="150" y="258" fill={C.muted} size={10} anchor="end">
            50 % av atmosfærens masse under
          </L>

          <line x1="160" y1="355" x2="230" y2="355" stroke={C.cold} strokeDasharray="3 3" />
          <L x="150" y="352" fill={C.cold} size={14} weight={800} anchor="end">
            1 500 m
          </L>
          <L x="150" y="368" fill={C.muted} size={11} anchor="end">
            Høyfjellet · ~850 hPa
          </L>

          <line x1="160" y1="410" x2="230" y2="410" stroke={C.fg} strokeWidth="2" />
          <L x="150" y="406" fill={C.fg} size={15} weight={900} anchor="end">
            0 moh. (Havnivå)
          </L>
          <L x="150" y="424" fill={C.warm} size={13} weight={800} anchor="end">
            1013,25 hPa
          </L>

          {/* Høyre side: Forklaringsbokser og barometer */}
          <rect
            x="450"
            y="70"
            width="370"
            height="95"
            rx="8"
            fill="#152028"
            stroke={C.dim}
            strokeWidth="1.5"
          />
          <L x="470" y="96" fill={C.fg} size={15} weight={700}>
            Hvor mye veier luften over oss?
          </L>
          <L x="470" y="118" fill={C.warm} size={13} weight={800}>
            1 m² grunnflate = ca. 10 000 kg luft (10 tonn!)
          </L>
          <L x="470" y="140" fill={C.muted} size={12}>
            Vi knuses ikke fordi det indre trykket i cellene våre motvirker lufttrykket.
          </L>

          <rect
            x="450"
            y="185"
            width="370"
            height="110"
            rx="8"
            fill="#152028"
            stroke={C.dim}
            strokeWidth="1.5"
          />
          <L x="470" y="210" fill={C.sand} size={14} weight={700}>
            Hvorfor faller trykket raskere nær bakken?
          </L>
          <L x="470" y="232" fill={C.fg} size={12}>
            Luft er en gass som kan presses sammen. De nederste lagene
          </L>
          <L x="470" y="250" fill={C.fg} size={12}>
            komprimeres av massen over. Derfor er luften tettest
          </L>
          <L x="470" y="268" fill={C.fg} size={12}>
            nær bakken (~1,2 kg/m³), og trykket faller med ca. 1 hPa per 8 meter!
          </L>

          <rect
            x="450"
            y="315"
            width="370"
            height="85"
            rx="8"
            fill="#152028"
            stroke={C.teal}
            strokeWidth="1.5"
          />
          <L x="470" y="340" fill={C.teal} size={14} weight={700}>
            Kvikksølvbarometeret (Torricelli)
          </L>
          <L x="470" y="360" fill={C.fg} size={12}>
            Standard lufttrykk (1013,25 hPa) balanserer nøyaktig en
          </L>
          <L x="470" y="378" fill={C.fg} size={12}>
            760 mm høy søyle med flytende kvikksølv (Hg).
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. RelativePressureDiagram
 * Viser at lufttrykk er relativt – samme tallverdi kan være både L og H.
 */
export function RelativePressureDiagram() {
  return (
    <Diagram
      title="Trykk er relativt: Samme verdi kan være lavtrykk eller høytrykk"
      heading="Trykk er relativt – Hvorfor 1015 hPa kan bety to helt ulike værtyper"
      caption="Det finnes ikke noe magisk tall som skiller høytrykk fra lavtrykk. Et lavtrykk er definert som et område med lavere trykk enn omgivelsene, mens et høytrykk har høyere trykk enn omgivelsene. På kart A (venstre) er et senter med 1015 hPa et lavtrykk (L) fordi naboene har 1025 hPa. På kart B (høyre) er nøyaktig samme trykk, 1015 hPa, et høytrykk (H) fordi det er omgitt av lavere trykk på 1005 hPa. Det er trykkgradienten (forskjellen over avstand) som driver vinden, aldri tallet alene."
      viewBox="0 0 860 380"
      wide
    >
      {(m) => (
        <>
          <line
            x1="430"
            y1="40"
            x2="430"
            y2="350"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* KART A: LAVTRYKK PÅ 1015 hPa */}
          <L x="215" y="35" size={17} weight={800} anchor="middle" fill={C.low}>
            KART A: Lavtrykkssenter (1015 hPa)
          </L>
          <L x="215" y="55" size={12} fill={C.muted} anchor="middle">
            Omgitt av HØYERE trykk (1025 hPa)
          </L>

          <circle cx="215" cy="180" r="115" fill="none" stroke={C.dim} strokeWidth="2" />
          <circle cx="215" cy="180" r="75" fill="none" stroke={C.dim} strokeWidth="2" />
          <circle cx="215" cy="180" r="35" fill="#301518" stroke={C.low} strokeWidth="2.5" />

          <L x="215" y="188" fill={C.low} size={24} weight={900} anchor="middle">
            L
          </L>
          <L x="215" y="206" fill={C.low} size={11} weight={700} anchor="middle">
            1015 hPa
          </L>

          <rect x="265" y="100" width="60" height="18" rx="4" fill={C.bg} />
          <L x="295" y="113" fill={C.muted} size={11} anchor="middle">
            1020 hPa
          </L>

          <rect x="295" y="65" width="60" height="18" rx="4" fill={C.bg} />
          <L x="325" y="78" fill={C.muted} size={11} anchor="middle">
            1025 hPa
          </L>

          <Arrow d="M 120 180 L 168 180" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 310 180 L 262 180" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 215 85 L 215 133" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 215 275 L 215 227" marker={m.low} color={C.low} width={2.6} />

          <rect
            x="60"
            y="305"
            width="310"
            height="42"
            rx="6"
            fill="#1c1417"
            stroke={C.low}
            strokeWidth="1.2"
          />
          <L x="215" y="323" fill={C.low} size={12} weight={700} anchor="middle">
            Trykkgradient peker INN mot sentrum
          </L>
          <L x="215" y="339" fill={C.fg} size={11} anchor="middle">
            Luften konvergerer → tvinges til værs → skyer & regn
          </L>

          {/* KART B: HØYTRYKK PÅ 1015 hPa */}
          <L x="645" y="35" size={17} weight={800} anchor="middle" fill={C.teal}>
            KART B: Høytrykkssenter (1015 hPa)
          </L>
          <L x="645" y="55" size={12} fill={C.muted} anchor="middle">
            Omgitt av LAVERE trykk (1005 hPa)
          </L>

          <circle cx="645" cy="180" r="115" fill="none" stroke={C.dim} strokeWidth="2" />
          <circle cx="645" cy="180" r="75" fill="none" stroke={C.dim} strokeWidth="2" />
          <circle cx="645" cy="180" r="35" fill="#13272c" stroke={C.teal} strokeWidth="2.5" />

          <L x="645" y="188" fill={C.teal} size={24} weight={900} anchor="middle">
            H
          </L>
          <L x="645" y="206" fill={C.teal} size={11} weight={700} anchor="middle">
            1015 hPa
          </L>

          <rect x="695" y="100" width="60" height="18" rx="4" fill={C.bg} />
          <L x="725" y="113" fill={C.muted} size={11} anchor="middle">
            1010 hPa
          </L>

          <rect x="725" y="65" width="60" height="18" rx="4" fill={C.bg} />
          <L x="755" y="78" fill={C.muted} size={11} anchor="middle">
            1005 hPa
          </L>

          <Arrow d="M 600 180 L 542 180" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 690 180 L 748 180" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 645 135 L 645 77" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 645 225 L 645 283" marker={m.teal} color={C.teal} width={2.6} />

          <rect
            x="490"
            y="305"
            width="310"
            height="42"
            rx="6"
            fill="#112226"
            stroke={C.teal}
            strokeWidth="1.2"
          />
          <L x="645" y="323" fill={C.teal} size={12} weight={700} anchor="middle">
            Trykkgradient peker UT fra sentrum
          </L>
          <L x="645" y="339" fill={C.fg} size={11} anchor="middle">
            Luften divergerer → luft synker ned → klar himmel
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. LowPressureCrossSectionDiagram
 * Tverrsnitt av lavtrykk: konvergens, adiabatisk heving, LCL, latent varme, divergens ved tropopause.
 */
export function LowPressureCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av et lavtrykk fra bakken til tropopausen"
      heading="Lavtrykkets anatomi: Konvergens, heving og skydannelse"
      caption="I et lavtrykk trekkes luft inn langs bakken mot senteret med lavest trykk (konvergens). Fordi bakken danner en ugjennomtrengelig bunn, tvinges den innstrømmende luften oppover. Når luften stiger, synker omgivelsestrykket: Luftpakken utvider seg adiabatisk og avkjøles tørradiabatisk med 1,0 °C per 100 m. Ved kondensasjonsnivået (LCL) når den 100 % relativ fuktighet, og vanndamp blir til vanndråper. Kondensasjonen frigjør store mengder latent varme (~2,5 MJ/kg), noe som holder luften varmere enn omgivelsene og gir kraftig ekstra oppdrift (skyer tårner opp). Ved tropopausen stopper hevingen fordi stratosfæren er stabilt varmere, og luften spres ut til sidene (divergens)."
      viewBox="0 0 860 480"
      wide
    >
      {(m) => (
        <>
          <rect x="40" y="50" width="780" height="45" fill="#1b212c" rx="4" />
          <line
            x1="40"
            y1="95"
            x2="820"
            y2="95"
            stroke={C.cold}
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <L x="55" y="76" fill={C.cold} size={14} weight={800}>
            Stratosfæren (stabil ozonoppvarming · temperaturinversjon)
          </L>
          <L x="805" y="76" fill={C.cold} size={13} weight={700} anchor="end">
            Tropopausen (~10–12 km): Lokk på hevingen!
          </L>

          <rect x="40" y="410" width="780" height="40" fill="#18231c" rx="4" />
          <line x1="40" y1="410" x2="820" y2="410" stroke="#2d4a36" strokeWidth="2.5" />
          <L x="430" y="434" fill={C.low} size={16} weight={900} anchor="middle">
            LAVTRYKKSSENTER VED BAKKEN (L)
          </L>

          <line
            x1="120"
            y1="280"
            x2="740"
            y2="280"
            stroke={C.teal}
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <L x="120" y="272" fill={C.teal} size={12} weight={800}>
            Kondensasjonsnivå (LCL) · 100 % RF
          </L>
          <L x="120" y="295" fill={C.muted} size={10}>
            Skybase dannes her
          </L>

          <path
            d="M 230 280 Q 200 240 250 200 Q 280 150 350 130 Q 430 98 510 130 Q 580 150 610 200 Q 660 240 630 280 Z"
            fill="#2c3b47"
            stroke={C.dim}
            strokeWidth="2"
          />
          <path
            d="M 260 115 L 600 115 Q 630 115 620 130 L 240 130 Q 230 115 260 115 Z"
            fill="#3a4c5a"
            opacity="0.75"
          />

          <Arrow d="M 360 290 L 350 395" marker={m.rain} color={C.rain} width={2.4} />
          <Arrow d="M 430 290 L 430 395" marker={m.rain} color={C.rain} width={2.6} />
          <Arrow d="M 500 290 L 510 395" marker={m.rain} color={C.rain} width={2.4} />
          <L x="430" y="350" fill={C.rain} size={14} weight={800} anchor="middle">
            Nedbør 🌧️
          </L>

          <Arrow d="M 120 395 L 340 395" marker={m.low} color={C.low} width={3.2} />
          <L x="210" y="385" fill={C.low} size={13} weight={800} anchor="middle">
            Konvergens: Luft suges inn
          </L>

          <Arrow d="M 740 395 L 520 395" marker={m.low} color={C.low} width={3.2} />
          <L x="650" y="385" fill={C.low} size={13} weight={800} anchor="middle">
            Konvergens: Luft suges inn
          </L>

          <Arrow d="M 370 380 Q 400 290 410 150" marker={m.warm} color={C.warm} width={3.6} />
          <Arrow d="M 490 380 Q 460 290 450 150" marker={m.warm} color={C.warm} width={3.6} />
          <L x="430" y="220" fill={C.warm} size={15} weight={900} anchor="middle">
            KRAFTIG VERTIKAL HEVING
          </L>

          <rect
            x="520"
            y="180"
            width="280"
            height="60"
            rx="6"
            fill="#18232c"
            stroke={C.warm}
            strokeWidth="1.4"
          />
          <L x="535" y="202" fill={C.warm} size={12} weight={800}>
            Latent varme frigjøres!
          </L>
          <L x="535" y="219" fill={C.fg} size={11}>
            Damp blir til dråper → varmer luften
          </L>
          <L x="535" y="233" fill={C.muted} size={10}>
            Fungerer som «brensel» for videre oppdrift
          </L>

          <Arrow d="M 370 110 L 150 110" marker={m.teal} color={C.teal} width={3.2} />
          <L x="260" y="100" fill={C.teal} size={13} weight={800} anchor="middle">
            Divergens i høyden
          </L>

          <Arrow d="M 490 110 L 710 110" marker={m.teal} color={C.teal} width={3.2} />
          <L x="600" y="100" fill={C.teal} size={13} weight={800} anchor="middle">
            Divergens i høyden
          </L>

          <rect x="50" y="320" width="180" height="46" rx="6" fill="#151d23" stroke={C.dim} />
          <L x="140" y="338" fill={C.fg} size={11} weight={700} anchor="middle">
            Umettet heving:
          </L>
          <L x="140" y="354" fill={C.teal} size={11} anchor="middle">
            DALR = -1,0 °C per 100 m
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. HighPressureCrossSectionDiagram
 * Tverrsnitt av høytrykk: konvergens i høyden, subsidens, adiabatisk oppvarming, fallende RF, skyoppløsning, divergens.
 */
export function HighPressureCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av et høytrykk fra tropopausen til bakken"
      heading="Høytrykkets anatomi: Subsidens, oppvarming og oppløsning av skyer"
      caption="I et høytrykk strømmer luften sammen i den øvre troposfæren og tvinges til å synke nedover mot bakken (subsidens). Nedsynkingen skjer langsomt (noen få centimeter i sekundet) over enorme geografiske områder. Ettersom luften synker inn i lag med høyere trykk, komprimeres den og varmes tørradiabatisk med 1,0 °C per 100 m. Varmere luft har høyere metningstrykk, slik at den relative fuktigheten (RF) stuper. Eventuelle skydråper fordamper fullstendig, og himmelen blir skyfri. Ved bakken oppstår det et overskudd av luft som strømmer ut til sidene (divergens). Om sommeren gir dette intens sol og varme; om vinteren fører skyfri himmel til sterk varmeutstråling og bitende kulde med bakkeinversjon."
      viewBox="0 0 860 480"
      wide
    >
      {(m) => (
        <>
          <rect x="40" y="50" width="780" height="45" fill="#1b212c" rx="4" />
          <line
            x1="40"
            y1="95"
            x2="820"
            y2="95"
            stroke={C.cold}
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <L x="55" y="76" fill={C.cold} size={14} weight={800}>
            Øvre troposfære / Tropopause
          </L>
          <L x="805" y="76" fill={C.cold} size={13} weight={700} anchor="end">
            Konvergens i høyden mater nedsynkingen
          </L>

          <Arrow d="M 140 85 L 340 85" marker={m.teal} color={C.teal} width={3} />
          <Arrow d="M 720 85 L 520 85" marker={m.teal} color={C.teal} width={3} />

          <rect x="40" y="410" width="780" height="40" fill="#241e16" rx="4" />
          <line x1="40" y1="410" x2="820" y2="410" stroke="#523e26" strokeWidth="2.5" />
          <L x="430" y="434" fill={C.warm} size={16} weight={900} anchor="middle">
            HØYTRYKKSSENTER VED BAKKEN (H) · OVERSKUDD AV LUFT
          </L>

          <Arrow d="M 300 110 L 300 360" marker={m.warm} color={C.warm} width={3.4} />
          <Arrow d="M 430 110 L 430 360" marker={m.warm} color={C.warm} width={3.8} />
          <Arrow d="M 560 110 L 560 360" marker={m.warm} color={C.warm} width={3.4} />

          <L x="430" y="195" fill={C.warm} size={16} weight={900} anchor="middle">
            SUBSIDENS (LANGSOM NEDSYNKNING)
          </L>
          <L x="430" y="218" fill={C.fg} size={12} weight={700} anchor="middle">
            Luften komprimeres av økende trykk → varmes tørradiabatisk (+1,0 °C / 100 m)
          </L>

          <g opacity="0.6">
            <path
              d="M 160 210 Q 180 190 210 195 Q 230 180 250 195 Q 270 210 250 225 Q 210 230 160 210 Z"
              fill="#2a3842"
              stroke={C.dim}
              strokeDasharray="4 3"
            />
            <L x="210" y="245" fill={C.sand} size={11} weight={700} anchor="middle">
              Skyrester fordamper!
            </L>
            <Arrow d="M 210 200 L 210 175" marker={m.sand} color={C.sand} width={1.8} />
          </g>

          <rect
            x="620"
            y="160"
            width="200"
            height="135"
            rx="8"
            fill="#152028"
            stroke={C.warm}
            strokeWidth="1.5"
          />
          <L x="635" y="185" fill={C.warm} size={13} weight={800}>
            Hvorfor blir det klarvær?
          </L>
          <L x="635" y="206" fill={C.fg} size={11}>
            1. Luften varmes på vei ned.
          </L>
          <L x="635" y="224" fill={C.fg} size={11}>
            2. Varm luft kan holde mer damp.
          </L>
          <L x="635" y="242" fill={C.sand} size={11} weight={700}>
            3. Relativ fuktighet (RF) faller.
          </L>
          <L x="635" y="260" fill={C.fg} size={11}>
            4. Skydråper fordamper til usynlig
          </L>
          <L x="635" y="278" fill={C.fg} size={11}>
            vanndamp. Skyene blåser ikke bort!
          </L>

          <Arrow d="M 390 395 L 140 395" marker={m.warm} color={C.warm} width={3.4} />
          <L x="250" y="385" fill={C.warm} size={13} weight={800} anchor="middle">
            Divergens: Luft strømmer ut
          </L>

          <Arrow d="M 470 395 L 720 395" marker={m.warm} color={C.warm} width={3.4} />
          <L x="610" y="385" fill={C.warm} size={13} weight={800} anchor="middle">
            Divergens: Luft strømmer ut
          </L>

          <rect
            x="50"
            y="280"
            width="200"
            height="85"
            rx="8"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.3"
          />
          <L x="65" y="302" fill={C.warm} size={12} weight={800}>
            ☀️ Sommerhøytrykk:
          </L>
          <L x="65" y="318" fill={C.fg} size={10.5}>
            Mye solinnstråling → varmebølge & tørke
          </L>
          <L x="65" y="338" fill={C.cold} size={12} weight={800}>
            ❄️ Vinterhøytrykk:
          </L>
          <L x="65" y="354" fill={C.fg} size={10.5}>
            Maks strålingstap → sterk kulde & inversjon
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. WindForcesBalanceDiagram
 * Viser trykkgradientkraft (F_pg), Corioliskraft (F_c) og friksjon (F_f) som styrer vindens retning.
 */
export function WindForcesBalanceDiagram() {
  return (
    <Diagram
      title="Hvorfor blåser vinden på skrå? De tre kreftene bak vinden"
      heading="Hvorfor blåser vinden på skrå over isobarene? De tre kreftene"
      caption="Vind er luft i bevegelse drevet av trykkforskjeller. Bevegelsen styres av et samspill mellom tre krefter: 1) Trykkgradientkraften (F_pg) trekker luften vinkelrett fra høyt mot lavt trykk. 2) Corioliskraften (F_c) avbøyer enhver bevegelse mot høyre på nordlig halvkule. I den frie atmosfæren (uten friksjon) balanserer disse to kreftene hverandre, og vinden blåser parallelt med isobarene (geostrofisk vind). 3) Nær bakken bremser friksjonen (F_f) farten. Dermed svekkes Corioliskraften, og trykkgradientkraften 'vinner' delvis: Vinden skjærer på skrå inn i lavtrykket (mot klokken = konvergens) og på skrå ut av høytrykket (med klokken = divergens)."
      viewBox="0 0 860 460"
      wide
    >
      {(m) => (
        <>
          <line
            x1="430"
            y1="40"
            x2="430"
            y2="430"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* DEL 1 (VENSTRE): VEKTORKREFTENE NÆR BAKKEN */}
          <L x="215" y="35" size={16} weight={800} anchor="middle" fill={C.teal}>
            Del 1: Kraftbalansen ved bakken (Nordlig halvkule)
          </L>

          <line x1="60" y1="90" x2="380" y2="90" stroke={C.dim} strokeWidth="1.8" />
          <L x="390" y="94" fill={C.muted} size={11}>
            1020 hPa (Høyt trykk)
          </L>

          <line x1="60" y1="190" x2="380" y2="190" stroke={C.dim} strokeWidth="1.8" />
          <L x="390" y="194" fill={C.muted} size={11}>
            1010 hPa
          </L>

          <line x1="60" y1="290" x2="380" y2="290" stroke={C.dim} strokeWidth="1.8" />
          <L x="390" y="294" fill={C.muted} size={11}>
            1000 hPa (Lavt trykk)
          </L>

          <circle cx="220" cy="190" r="14" fill="#1b2a34" stroke={C.fg} strokeWidth="2" />
          <L x="220" y="195" fill={C.fg} size={12} weight={800} anchor="middle">
            Luft
          </L>

          <Arrow d="M 220 190 L 220 280" marker={m.warm} color={C.warm} width={3.2} />
          <L x="230" y="255" fill={C.warm} size={13} weight={800}>
            F_pg (Trykkgradientkraft)
          </L>
          <L x="230" y="270" fill={C.muted} size={10}>
            Vinkelrett på isobarene mot L
          </L>

          <Arrow d="M 220 190 L 120 245" marker={m.teal} color={C.teal} width={3.6} />
          <L x="105" y="260" fill={C.teal} size={14} weight={900} anchor="middle">
            VINDRETNING (V)
          </L>
          <L x="105" y="275" fill={C.muted} size={10} anchor="middle">
            Krysser isobarene i ca. 25–30° vinkel
          </L>

          <Arrow d="M 220 190 L 275 105" marker={m.cold} color={C.cold} width={2.8} />
          <L x="285" y="115" fill={C.cold} size={12} weight={800}>
            F_c (Corioliskraft)
          </L>
          <L x="285" y="130" fill={C.muted} size={10}>
            90° til høyre for vinden
          </L>

          <Arrow d="M 220 190 L 285 155" marker={m.low} color={C.low} width={2.8} />
          <L x="300" y="165" fill={C.low} size={12} weight={800}>
            F_f (Bakkefriksjon)
          </L>
          <L x="300" y="180" fill={C.muted} size={10}>
            Bremser farten → svekker F_c
          </L>

          <rect
            x="60"
            y="325"
            width="320"
            height="95"
            rx="8"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.3"
          />
          <L x="75" y="348" fill={C.fg} size={12} weight={700}>
            Uten friksjon (i fri troposfære):
          </L>
          <L x="75" y="366" fill={C.teal} size={11}>
            F_pg = F_c → Geostrofisk vind (parallelt med isobarer).
          </L>
          <L x="75" y="388" fill={C.fg} size={12} weight={700}>
            Med friksjon (nær bakken):
          </L>
          <L x="75" y="406" fill={C.warm} size={11}>
            Farten minker → F_c svekkes → F_pg trekker luften på skrå inn i L.
          </L>

          {/* DEL 2 (HØYRE): SIRKULASJON RUNDT L OG H */}
          <L x="645" y="35" size={16} weight={800} anchor="middle" fill={C.warm}>
            Del 2: Rotasjonsmønster på bakken (Nordlig halvkule)
          </L>

          {/* LAVTRYKK: MOT KLOKKEN INNOVER */}
          <circle cx="535" cy="180" r="70" fill="none" stroke={C.dim} strokeWidth="1.5" />
          <circle cx="535" cy="180" r="28" fill="#301518" stroke={C.low} strokeWidth="2" />
          <L x="535" y="187" fill={C.low} size={20} weight={900} anchor="middle">
            L
          </L>
          <Arrow d="M 465 180 Q 480 230 515 205" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 535 250 Q 585 235 560 200" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 605 180 Q 590 130 555 155" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 535 110 Q 485 125 510 160" marker={m.low} color={C.low} width={2.4} />

          <L x="535" y="275" fill={C.low} size={13} weight={800} anchor="middle">
            Lavtrykk: MOT KLOKKEN
          </L>
          <L x="535" y="292" fill={C.fg} size={11} anchor="middle">
            Spiral INN mot sentrum (konvergens)
          </L>

          {/* HØYTRYKK: MED KLOKKEN UTOVER */}
          <circle cx="735" cy="180" r="70" fill="none" stroke={C.dim} strokeWidth="1.5" />
          <circle cx="735" cy="180" r="28" fill="#13272c" stroke={C.teal} strokeWidth="2" />
          <L x="735" y="187" fill={C.teal} size={20} weight={900} anchor="middle">
            H
          </L>
          <Arrow d="M 720 155 Q 685 130 670 170" marker={m.teal} color={C.teal} width={2.4} />
          <Arrow d="M 760 160 Q 795 180 770 230" marker={m.teal} color={C.teal} width={2.4} />
          <Arrow d="M 750 205 Q 785 230 735 250" marker={m.teal} color={C.teal} width={2.4} />
          <Arrow d="M 710 200 Q 675 180 700 130" marker={m.teal} color={C.teal} width={2.4} />

          <L x="735" y="275" fill={C.teal} size={13} weight={800} anchor="middle">
            Høytrykk: MED KLOKKEN
          </L>
          <L x="735" y="292" fill={C.fg} size={11} anchor="middle">
            Spiral UT fra sentrum (divergens)
          </L>

          <rect
            x="470"
            y="325"
            width="340"
            height="95"
            rx="8"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.3"
          />
          <L x="485" y="348" fill={C.sand} size={12} weight={800}>
            Buys Ballots lov (Huskeregel for meteorologer):
          </L>
          <L x="485" y="368" fill={C.fg} size={11}>
            Står du med vinden i ryggen på nordlig halvkule, har du
          </L>
          <L x="485" y="386" fill={C.low} size={12} weight={700}>
            alltid lavtrykket skrått foran deg til venstre!
          </L>
          <L x="485" y="406" fill={C.muted} size={10}>
            På sørlig halvkule er rotasjonsretningene motsatt.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. KatabaticWindDiagram
 * Viser utstråling over isbre, gravitasjonsdrenasje av tung kaldluft og dannelse av inversjon i dalbunn.
 */
export function KatabaticWindDiagram() {
  return (
    <Diagram
      title="Katabatisk fallvind og dannelse av temperaturinversjon"
      heading="Katabatisk vind: Gravitasjonsdrevet kaldluft og temperaturinversjon"
      caption="Katabatisk vind (fra gresk katabatikos: 'gående nedover') oppstår når snø og isflater mister store mengder varme gjennom langbølget utstråling under en stjerneklar himmel. Luftlaget nærmest snøen blir ekstremt kaldt og tett. Den tunge luften trekkes nedover fjellsider og brefall av tyngdekraften, omtrent som rennende vann. Nede i dalbunnen eller fjorden samler denne kaldluften seg i en 'kaldluftssjø'. Dette skaper en temperaturinversjon, der det er kaldest i dalbunnen og mildere lenger opp i åssiden. Mens fønvind er varm og tørr og bryter opp inversjoner, er katabatisk vind iskald og bygger opp dype inversjoner."
      viewBox="0 0 860 440"
      wide
    >
      {(m) => (
        <>
          <path
            d="M 40 140 L 260 140 Q 380 150 480 320 L 820 360 L 820 420 L 40 420 Z"
            fill="#152128"
            stroke={C.dim}
            strokeWidth="2"
          />
          <path
            d="M 40 140 L 260 140 Q 320 145 360 200 L 330 220 Q 300 160 240 155 L 40 155 Z"
            fill="#8eb4d4"
            opacity="0.35"
          />
          <L x="130" y="130" fill={C.cold} size={15} weight={800}>
            Platåbre / Høyfjell (f.eks. Folgefonna eller Grønland)
          </L>

          <Arrow d="M 90 120 L 90 60" marker={m.sand} color={C.sand} width={2.2} />
          <Arrow d="M 160 120 L 160 60" marker={m.sand} color={C.sand} width={2.2} />
          <Arrow d="M 230 120 L 230 60" marker={m.sand} color={C.sand} width={2.2} />
          <L x="160" y="48" fill={C.sand} size={12} weight={700} anchor="middle">
            Langbølget varmestråling tapes til rommet
          </L>

          <rect
            x="50"
            y="165"
            width="200"
            height="28"
            rx="4"
            fill="#0f2636"
            stroke={C.cold}
            strokeWidth="1.2"
          />
          <L x="150" y="184" fill={C.cold} size={12} weight={800} anchor="middle">
            Iskald, tung luft dannes (-25 °C)
          </L>

          <Arrow d="M 270 160 Q 370 200 460 330" marker={m.cold} color={C.cold} width={4} />
          <L x="390" y="240" fill={C.cold} size={14} weight={900}>
            Katabatisk fallvind
          </L>
          <L x="390" y="258" fill={C.fg} size={11}>
            Tyngdekraften trekker den tunge
          </L>
          <L x="390" y="274" fill={C.fg} size={11}>
            kaldluften ned som en elv
          </L>

          <rect x="500" y="320" width="320" height="40" fill="#0f283d" opacity="0.85" rx="4" />
          <line
            x1="500"
            y1="320"
            x2="820"
            y2="320"
            stroke={C.cold}
            strokeDasharray="4 3"
            strokeWidth="1.6"
          />
          <L x="660" y="345" fill={C.cold} size={15} weight={900} anchor="middle">
            KALDL carssJØ I DALBUNNEN (-20 °C)
          </L>

          <rect
            x="540"
            y="230"
            width="260"
            height="65"
            rx="6"
            fill="#1b221d"
            stroke={C.warm}
            strokeWidth="1.3"
          />
          <L x="555" y="252" fill={C.warm} size={13} weight={800}>
            Temperaturinversjon:
          </L>
          <L x="555" y="270" fill={C.fg} size={11}>
            Mye mildere oppe i lia (-4 °C)!
          </L>
          <L x="555" y="286" fill={C.sand} size={10}>
            Temperaturen ØKER med høyden opp fra dalbunnen.
          </L>

          <rect
            x="40"
            y="315"
            width="410"
            height="95"
            rx="8"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.4"
          />
          <L x="55" y="338" fill={C.warm} size={13} weight={800}>
            Viktig eksamensskille: Fønvind vs. Katabatisk vind
          </L>
          <L x="55" y="358" fill={C.fg} size={11}>
            •{" "}
            <tspan fontWeight="bold" fill={C.warm}>
              Føn:
            </tspan>{" "}
            Drevet av storskalavind over fjell. Mister vann ved orografisk regn på losiden → lander
            varm og tørr i le.{" "}
            <tspan fill={C.warm} fontWeight="bold">
              Bryter inversjoner.
            </tspan>
          </L>
          <L x="55" y="380" fill={C.fg} size={11}>
            •{" "}
            <tspan fontWeight="bold" fill={C.cold}>
              Katabatisk:
            </tspan>{" "}
            Drevet av tyngdekraft fra kald overflate. Ingen regn → iskald og tung ved foten.{" "}
            <tspan fill={C.cold} fontWeight="bold">
              Bygger inversjoner.
            </tspan>
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. SeaBreezeDiagram (Oppgradert)
 * Viser sjøbris om dagen og landbris om natten, med sol/måne, varmekapasitet og returstrøm.
 */
export function SeaBreezeDiagram() {
  return (
    <Diagram
      title="Solgangsbris: Sjøbris om dagen og landbris om natten"
      heading="Pålandsvind og fralandsvind: Lokale temperatur- og trykkforskjeller"
      caption="Pålandsvind (sjøbris) og fralandsvind (landbris) er et lokalt termisk kretsløp drevet av at land og hav har ulik spesifikk varmekapasitet. Vann har fire ganger høyere varmekapasitet enn stein og jord, og solstrålene trenger dypt ned i havet. Derfor varmes landjorden mye raskere opp om dagen enn havet. Luften over land stiger (termisk lavtrykk), og kjølig luft fra havet strømmer inn som sjøbris. For at kretsløpet skal gå rundt uten at luft hoper seg opp, går en returstrøm motsatt vei i høyden. Om natten avkjøles landjorden raskest, luften synker over land (høytrykk), og svak landbris blåser ut mot havet."
      viewBox="0 0 860 400"
      wide
    >
      {(m) => (
        <>
          <line
            x1="430"
            y1="40"
            x2="430"
            y2="370"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* DAG: SJØBRIS */}
          <L x="215" y="32" size={17} weight={800} anchor="middle" fill={C.warm}>
            ☀️ DAG: Sjøbris (Pålandsvind)
          </L>
          <L x="215" y="52" fill={C.muted} size={12} anchor="middle">
            Land varmes raskere enn hav (lav varmekapasitet)
          </L>

          <Surface ox={20} />

          <Arrow d="M 330 250 L 330 115" marker={m.warm} color={C.warm} width={3.2} />
          <L x="342" y="185" fill={C.warm} size={12} weight={700}>
            Stiger
          </L>

          <Arrow d="M 310 100 L 105 100" marker={m.muted} color={C.muted} width={2.4} />
          <L x="210" y="88" fill={C.muted} size={12} weight={700} anchor="middle">
            Returstrøm i høyden (mot havet)
          </L>

          <Arrow d="M 85 115 L 85 245" marker={m.cold} color={C.cold} width={2.4} />
          <L x="75" y="185" fill={C.cold} size={12} weight={700} anchor="end">
            Synker
          </L>

          <Arrow d="M 98 262 L 275 262" marker={m.teal} color={C.teal} width={3.4} />
          <L x="185" y="252" fill={C.teal} size={13} weight={800} anchor="middle">
            Sjøbris (Pålandsvind)
          </L>

          <circle cx="110" cy="305" r="16" fill="#13272c" stroke={C.teal} strokeWidth="1.5" />
          <L x="110" y="311" fill={C.teal} size={14} weight={900} anchor="middle">
            H
          </L>
          <L x="110" y="332" fill={C.muted} size={10.5} anchor="middle">
            Kjølig hav
          </L>

          <circle cx="330" cy="305" r="16" fill="#301518" stroke={C.low} strokeWidth="1.5" />
          <L x="330" y="311" fill={C.low} size={14} weight={900} anchor="middle">
            L
          </L>
          <L x="330" y="332" fill={C.muted} size={10.5} anchor="middle">
            Termisk lavtrykk
          </L>

          <L x="60" y="360" fill={C.muted} size={12}>
            Hav
          </L>
          <L x="385" y="360" fill={C.muted} size={12} anchor="end">
            Varmt land
          </L>

          {/* NATT: LANDBRIS */}
          <L x="645" y="32" size={17} weight={800} anchor="middle" fill={C.cold}>
            🌙 NATT: Landbris (Fralandsvind)
          </L>
          <L x="645" y="52" fill={C.muted} size={12} anchor="middle">
            Land avkjøles raskere enn hav (sterk utstråling)
          </L>

          <Surface ox={445} />

          <Arrow d="M 510 250 L 510 115" marker={m.warm} color={C.warm} width={2.4} />
          <L x="498" y="185" fill={C.warm} size={12} weight={700} anchor="end">
            Stiger
          </L>

          <Arrow d="M 530 100 L 735 100" marker={m.muted} color={C.muted} width={2} />
          <L x="635" y="88" fill={C.muted} size={12} weight={700} anchor="middle">
            Returstrøm i høyden (mot land)
          </L>

          <Arrow d="M 755 115 L 755 245" marker={m.cold} color={C.cold} width={2.6} />
          <L x="768" y="185" fill={C.cold} size={12} weight={700}>
            Synker
          </L>

          <Arrow d="M 700 262 L 530 262" marker={m.teal} color={C.teal} width={2.6} />
          <L x="615" y="252" fill={C.teal} size={13} weight={800} anchor="middle">
            Landbris (Fralandsvind)
          </L>

          <circle cx="535" cy="305" r="16" fill="#301518" stroke={C.low} strokeWidth="1.5" />
          <L x="535" y="311" fill={C.low} size={14} weight={900} anchor="middle">
            L
          </L>
          <L x="535" y="332" fill={C.muted} size={10.5} anchor="middle">
            Relativt mildt hav
          </L>

          <circle cx="755" cy="305" r="16" fill="#13272c" stroke={C.teal} strokeWidth="1.5" />
          <L x="755" y="311" fill={C.teal} size={14} weight={900} anchor="middle">
            H
          </L>
          <L x="755" y="332" fill={C.muted} size={10.5} anchor="middle">
            Avkjølt land
          </L>

          <L x="485" y="360" fill={C.muted} size={12}>
            Hav
          </L>
          <L x="810" y="360" fill={C.muted} size={12} anchor="end">
            Kaldt land
          </L>

          <L x="645" y="386" fill={C.muted} size={11} anchor="middle">
            Merk: Landbrisen er svakere enn sjøbrisen fordi temperaturforskjellen er mindre.
          </L>
        </>
      )}
    </Diagram>
  );
}
