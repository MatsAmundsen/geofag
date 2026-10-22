import { Arrow, C, Diagram, L } from "./svg-kit";

export function PolarFrontCycloneSteps() {
  return (
    <Diagram
      title="Fire steg i en polarfrontsyklons livsløp (Bergensskolens syklonmodell)"
      heading="Polarfrontsyklonens livssyklus — fra bølge til okklusjon"
      caption="1. Bølge: Kald arktisk luft mot nord og mild luft mot sør møtes langs polarfronten. En forstyrrelse skaper et lite lavtrykk. 2. Varm sektor: Syklonen roterer; varmfronten leder an mot øst, kaldfronten feier etter fra vest. 3. Okklusjon: Den kalde, tunge luften bak kaldfronten beveger seg raskere og tar igjen varmfronten. Den varme sektoren klemmes opp i høyden. 4. Utfylling: All varm luft er løftet, lavtrykket isoleres fra sin energikilde og fylles opp."
      viewBox="0 0 920 280"
      wide
    >
      {(m) => (
        <>
          {/* 4 paneler side om side */}
          {/* Steg 1: Bølge */}
          <g>
            <rect x="20" y="25" width="205" height="240" rx="8" fill="#131c22" stroke={C.dim} />
            <L x="122" y="48" size={14} weight={700} anchor="middle">1. Bølgedannelse</L>
            <L x="122" y="85" fill={C.cold} size={11} anchor="middle">Kald polarluft (østover)</L>
            <path d="M 30 140 Q 122 110, 215 140" fill="none" stroke={C.dim} strokeWidth="2.2" strokeDasharray="5 4" />
            <circle cx="122" cy="125" r="14" fill="none" stroke={C.low} strokeWidth="1.8" />
            <L x="122" y="130" fill={C.low} size={13} weight={700} anchor="middle">L</L>
            <L x="122" y="195" fill={C.warm} size={11} anchor="middle">Varm luft (vestover)</L>
            <L x="122" y="245" fill={C.muted} size={10} anchor="middle">Instabilitet langs fronten</L>
          </g>

          {/* Steg 2: Varm sektor */}
          <g>
            <rect x="240" y="25" width="210" height="240" rx="8" fill="#131c22" stroke={C.dim} />
            <L x="345" y="48" size={14} weight={700} anchor="middle">2. Varm sektor</L>
            <circle cx="330" cy="115" r="16" fill="none" stroke={C.low} strokeWidth="2" />
            <L x="330" y="121" fill={C.low} size={15} weight={700} anchor="middle">L</L>
            {/* Varmfront */}
            <path d="M 330 115 C 370 135, 410 155, 435 190" fill="none" stroke={C.low} strokeWidth="2.8" />
            <path d="M 370 138 A 5 5 0 0 0 380 144 Z" fill={C.low} />
            {/* Kaldfront */}
            <path d="M 330 115 C 320 160, 290 200, 260 230" fill="none" stroke={C.cold} strokeWidth="2.8" />
            <polygon points="315,160 323,165 311,173" fill={C.cold} />
            <L x="365" y="180" fill={C.warm} size={11} weight={600}>Varm sektor</L>
            <L x="345" y="245" fill={C.muted} size={10} anchor="middle">Maksimal temperaturkontrast</L>
          </g>

          {/* Steg 3: Okklusjon */}
          <g>
            <rect x="465" y="25" width="215" height="240" rx="8" fill="#131c22" stroke={C.dim} />
            <L x="572" y="48" size={14} weight={700} anchor="middle">3. Okklusjon</L>
            <circle cx="560" cy="95" r="16" fill="none" stroke={C.low} strokeWidth="2" />
            <L x="560" y="101" fill={C.low} size={15} weight={700} anchor="middle">L</L>
            {/* Okklusjonsstilk */}
            <path d="M 560 95 C 575 125, 580 145, 585 160" fill="none" stroke="#a872cc" strokeWidth="3" />
            <polygon points="576,125 583,122 578,133" fill="#a872cc" />
            {/* Varmfront og kaldfront under trippelpunktet */}
            <path d="M 585 160 C 625 175, 650 195, 665 225" fill="none" stroke={C.low} strokeWidth="2.4" />
            <path d="M 585 160 C 570 190, 545 215, 520 235" fill="none" stroke={C.cold} strokeWidth="2.4" />
            <L x="572" y="195" fill="#a872cc" size={11} weight={600} anchor="middle">Varm luft løftes</L>
            <L x="572" y="245" fill={C.muted} size={10} anchor="middle">Kraftigst vind og lavest trykk</L>
          </g>

          {/* Steg 4: Utfylling */}
          <g>
            <rect x="695" y="25" width="205" height="240" rx="8" fill="#131c22" stroke={C.dim} />
            <L x="797" y="48" size={14} weight={700} anchor="middle">4. Utfylling</L>
            <circle cx="797" cy="120" r="32" fill="none" stroke={C.muted} strokeWidth="1.6" strokeDasharray="5 4" />
            <L x="797" y="126" fill={C.muted} size={16} weight={700} anchor="middle">L</L>
            <L x="797" y="165" fill={C.cold} size={11} anchor="middle">Bare kaldluft ved bakken</L>
            <L x="797" y="185" fill={C.muted} size={11} anchor="middle">Trykket stiger</L>
            <L x="797" y="245" fill={C.muted} size={10} anchor="middle">Virvelen viskes ut</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function ValleyWindDiagram() {
  return (
    <Diagram
      title="Dalvind og bergvind: lokal sirkulasjon i et dalføre"
      heading="Dalvind om dagen, bergvind om natten"
      caption="Venstre: Om dagen varmes fjellsidene mer enn lufta i samme nivå utenfor fjellet. Dalvinden blåser fra lavlandet og opp dalen. Høyre: Om natten avkjøles sidene, og kald, tung luft renner ned mot dalbunnen som bergvind. Kald luft kan hope seg opp nede, med frostfare om vinteren."
      viewBox="0 0 840 330"
    >
      {(m) => (
        <>
          {/* Skillevegg */}
          <line x1="420" y1="35" x2="420" y2="305" stroke={C.dim} strokeDasharray="4 4" />

          {/* --- VENSTRE: DAG / DALVIND --- */}
          <L x="210" y="32" size={16} weight={700} anchor="middle">
            Dag: Soloppvarming · Dalvind
          </L>
          <L x="210" y="52" fill={C.muted} size={12} anchor="middle">
            Solsidene varmes → termisk oppdrift langs fjellsiden
          </L>
          {/* Solsymbol */}
          <circle cx="210" cy="85" r="14" fill={C.warm} opacity="0.9" />
          <circle cx="210" cy="85" r="20" fill={C.warm} opacity="0.2" />

          {/* Fjellprofil venstre */}
          <path d="M 30 260 L 140 100 L 210 170 L 280 100 L 390 260 Z" fill="#1a2720" stroke={C.dim} strokeWidth="1.5" />
          {/* Dalbunn */}
          <rect x="30" y="260" width="360" height="45" fill="#131c17" />
          <L x="210" y="285" fill={C.muted} size={12} anchor="middle">Dalbunn</L>

          {/* Varme piler oppover fjellsidene */}
          <Arrow d="M 80 230 L 130 125" marker={m.warm} color={C.warm} width={2.8} />
          <Arrow d="M 340 230 L 290 125" marker={m.warm} color={C.warm} width={2.8} />
          <L x="105" y="195" fill={C.warm} size={12} weight={600}>Dalvind opp</L>
          <L x="315" y="195" fill={C.warm} size={12} weight={600}>Dalvind opp</L>

          {/* Kompenserende nedsynkning i midten */}
          <Arrow d="M 210 115 L 210 160" marker={m.muted} color={C.muted} width={1.8} />

          {/* --- HØYRE: NATT / FJELLVIND --- */}
          <L x="630" y="32" size={16} weight={700} anchor="middle">
            Natt: Utstråling · Bergvind
          </L>
          <L x="630" y="52" fill={C.muted} size={12} anchor="middle">
            Varme stråler ut i rommet → tung kaldluft renner ned
          </L>
          {/* Månesymbol */}
          <circle cx="630" cy="85" r="12" fill="#d0e2ec" />
          <circle cx="635" cy="83" r="10" fill="#0f171c" />

          {/* Fjellprofil høyre */}
          <path d="M 450 260 L 560 100 L 630 170 L 700 100 L 810 260 Z" fill="#182129" stroke={C.dim} strokeWidth="1.5" />
          {/* Kald luftpytt i dalbunnen */}
          <rect x="450" y="250" width="360" height="55" fill="#182e3d" stroke={C.cold} strokeWidth="1" strokeDasharray="3 3" />
          <L x="630" y="272" fill={C.cold} size={12} weight={700} anchor="middle">
            Kaldluftssjø (Temperaturinversjon)
          </L>
          <L x="630" y="292" fill={C.muted} size={11} anchor="middle">
            Kaldest nede i dalbunnen · fare for frost og lokal forurensning
          </L>

          {/* Kalde piler nedover fjellsidene */}
          <Arrow d="M 545 125 L 495 230" marker={m.cold} color={C.cold} width={2.8} />
          <Arrow d="M 715 125 L 765 230" marker={m.cold} color={C.cold} width={2.8} />
          <L x="520" y="170" fill={C.cold} size={12} weight={600}>Bergvind ned</L>
          <L x="740" y="170" fill={C.cold} size={12} weight={600}>Bergvind ned</L>
        </>
      )}
    </Diagram>
  );
}

export function FoehnAdiabaticDiagram() {
  return (
    <Diagram
      title="Føhneffekten: tørradiabatisk og fuktadiabatisk heving og nedsynkning"
      heading="Hvorfor blir luften varmere og tørrere på lesiden?"
      caption="Når en luftpakke tvinges over en fjellkjede, avkjøles den først tørradiabatisk (DALR = 1,0 °C / 100 m) inntil den når kondensasjonsnivået (LCL). Derfra avkjøles den saktere med fuktadiabatisk temperaturendring (SALR ≈ 0,6 °C / 100 m) fordi kondensasjon frigjør latent varme. Regnet faller ut på losiden. På lesiden synker den uttørkede luften og varmes tørradiabatisk (1,0 °C / 100 m) hele veien ned. Resultatet er at luften lander mye varmere og knusktørr i dalen på lesiden."
      viewBox="0 0 900 480"
      wide
    >
      {(m) => (
        <>
          {/* Fjellprofil: Lo-side (venstre, bratt/slak heving) til toppen 2500m, Le-side (høyre) ned til dalen */}
          <path
            d="M 50 410 L 450 120 L 850 410 Z"
            fill="#17222a"
            stroke={C.dim}
            strokeWidth="2"
          />
          <path d="M 50 410 L 450 120 L 450 410 Z" fill="#1b2832" />

          {/* Bakkenivå / havoverflate */}
          <line x1="30" y1="410" x2="870" y2="410" stroke={C.dim} strokeWidth="1.6" />

          {/* Høydeangivelser på fjellet */}
          {/* 0 m */}
          <line x1="40" y1="410" x2="860" y2="410" stroke={C.dim} strokeDasharray="3 3" />
          <L x="35" y="405" fill={C.muted} size={11} anchor="end">0 m</L>

          {/* 1000 m (Kondensasjonsnivå LCL) */}
          <line x1="40" y1="294" x2="860" y2="294" stroke={C.teal} strokeDasharray="4 4" strokeWidth="1.2" />
          <L x="44" y="308" fill={C.teal} size={11}>1000 m (LCL)</L>
          <L x="120" y="284" fill={C.teal} size={12} weight={700}>
            Kondensasjonsnivå (LCL)
          </L>
          <L x="120" y="300" fill={C.muted} size={10}>
            100 % relativ fuktighet · Skyer dannes
          </L>

          {/* 2500 m (Fjelltopp) */}
          <line x1="40" y1="120" x2="860" y2="120" stroke={C.warm} strokeDasharray="3 3" strokeWidth="1.2" />
          <L x="35" y="116" fill={C.warm} size={11} anchor="end">2500 m</L>
          <L x="450" y="98" fill={C.fg} size={14} weight={800} anchor="middle">
            Fjelltopp: 2500 m
          </L>

          {/* LOSIDE (Venstre - f.eks. Vestlandet) */}
          <L x="180" y="60" fill={C.rain} size={16} weight={800} anchor="middle">
            LOSIDE (Vestlandet)
          </L>
          <L x="180" y="80" fill={C.muted} size={12} anchor="middle">
            Fuktig luft fra havet tvinges til værs
          </L>

          {/* Starttilstand på losiden (0 m) */}
          <rect x="50" y="340" width="130" height="60" rx="6" fill="#142633" stroke={C.rain} strokeWidth="1.5" />
          <L x="115" y="362" fill={C.rain} size={15} weight={800} anchor="middle">
            +12 °C
          </L>
          <L x="115" y="382" fill={C.fg} size={11} anchor="middle">
            RF: 75 % (Umettet)
          </L>

          {/* Trinn 1: Tørradiabatisk heving 0 m -> 1000 m */}
          <Arrow d="M 120 340 L 190 290" marker={m.teal} color={C.teal} width={3} />
          <L x="115" y="320" fill={C.teal} size={11} weight={700}>
            DALR: -1,0 °C / 100 m
          </L>

          {/* Tilstand ved LCL (1000 m) */}
          <circle cx="210" cy="294" r="5" fill={C.teal} />
          <L x="220" y="275" fill={C.teal} size={14} weight={800}>
            +2 °C
          </L>
          <L x="220" y="290" fill={C.fg} size={10}>
            100 % RF
          </L>

          {/* Trinn 2: Fuktadiabatisk heving med skyer og regn 1000 m -> 2500 m */}
          {/* Orografiske skyer og regn */}
          <path
            d="M 210 280 Q 280 180 430 130 L 410 170 Q 290 220 230 290 Z"
            fill="#38bdf8"
            opacity="0.35"
          />
          {/* Regndråper */}
          <Arrow d="M 260 250 L 250 320" marker={m.rain} color={C.rain} width={2.2} />
          <Arrow d="M 320 210 L 310 300" marker={m.rain} color={C.rain} width={2.2} />
          <Arrow d="M 370 180 L 360 270" marker={m.rain} color={C.rain} width={2.2} />
          <L x="290" y="345" fill={C.rain} size={12} weight={700}>
            Orografisk regn 🌧️
          </L>
          <L x="290" y="360" fill={C.muted} size={10}>
            Latent varme frigjøres til luften!
          </L>

          <Arrow d="M 230 260 L 430 130" marker={m.rain} color={C.rain} width={3} />
          <L x="290" y="160" fill={C.rain} size={11} weight={700}>
            SALR: -0,6 °C / 100 m
          </L>

          {/* Tilstand på toppen (2500 m) */}
          <rect x="390" y="130" width="120" height="50" rx="6" fill="#1b242e" stroke={C.fg} strokeWidth="1.5" />
          <L x="450" y="152" fill={C.fg} size={15} weight={800} anchor="middle">
            -7 °C
          </L>
          <L x="450" y="170" fill={C.sand} size={10} weight={700} anchor="middle">
            Vannet er regnet ut!
          </L>

          {/* LESIDE (Høyre - f.eks. Østlandet / Innlandet) */}
          <L x="700" y="60" fill={C.warm} size={16} weight={800} anchor="middle">
            LESIDE (Østlandet)
          </L>
          <L x="700" y="80" fill={C.sand} size={12} anchor="middle">
            Fønvind: Tørr luft synker og komprimeres
          </L>

          {/* Trinn 3: Tørradiabatisk nedsynkning hele veien ned 2500 m -> 0 m */}
          <Arrow d="M 470 140 L 730 360" marker={m.warm} color={C.warm} width={3.6} />
          <L x="640" y="210" fill={C.warm} size={13} weight={800}>
            DALR: +1,0 °C / 100 m
          </L>
          <L x="640" y="230" fill={C.muted} size={11}>
            Ingen dråper å fordampe!
          </L>
          <L x="640" y="248" fill={C.fg} size={11}>
            Oppvarmingen blir stående.
          </L>

          {/* Sluttilstand på lesiden (0 m i dalen) */}
          <rect x="710" y="335" width="150" height="65" rx="6" fill="#3a2216" stroke={C.warm} strokeWidth="2" />
          <L x="785" y="360" fill={C.warm} size={18} weight={900} anchor="middle">
            +18 °C 🔥
          </L>
          <L x="785" y="380" fill="#fff" size={11} weight={700} anchor="middle">
            FØNVIND (+6 °C varmere!)
          </L>
          <L x="785" y="394" fill={C.sand} size={10} anchor="middle">
            RF: under 30 % (Knusktørr)
          </L>

          {/* Forklaring i boks nederst */}
          <rect x="50" y="425" width="800" height="46" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1.2" />
          <L x="450" y="445" fill={C.fg} size={12} weight={700} anchor="middle">
            Fysikken bak regnestykket:
          </L>
          <L x="450" y="462" fill={C.muted} size={11} anchor="middle">
            Avkjøling i lo: (10 × 1,0) + (15 × 0,6) = -19 °C fall (fra +12 til -7 °C) | Oppvarming i le: 25 × 1,0 = +25 °C stigning (fra -7 til +18 °C). Netto gevinst = +6 °C!
          </L>
        </>
      )}
    </Diagram>
  );
}

export function TemperatureInversionDiagram() {
  return (
    <Diagram
      title="Temperaturinversjon: Normal atmosfærisk temperaturprofil kontra bakkeinversjon"
      heading="Temperaturinversjon: et lokk av varmere luft"
      caption="Vanligvis avtar temperaturen oppover, fordi atmosfæren varmes nedenfra og konveksjon blander lufta (venstre). I en inversjon stiger temperaturen med høyden (høyre). En klar vinternatt mister bakken varme ved utstråling, og kald, tung luft legger seg i daler og fjorder. Lufta nær bakken blandes dårlig med lufta over, og utslipp fra skip, veitrafikk og vedfyring kan samle seg og gi dårlig luftkvalitet (Store norske leksikon, u.å.-m). Temperaturene er tenkte eksempler."
      viewBox="0 0 920 440"
      wide
    >
      {(m) => (
        <>
          {/* Skillelinje */}
          <line x1="460" y1="35" x2="460" y2="405" stroke={C.dim} strokeDasharray="4 4" />

          {/* --- VENSTRE: NORMAL SITUASJON (USTABIL / NØYTRAL) --- */}
          <rect x="30" y="30" width="410" height="380" rx="8" fill="#121b22" stroke={C.dim} strokeWidth="1.2" />
          <L x="235" y="60" fill={C.fg} size={16} weight={700} anchor="middle">
            1. Normal tilstand: Fri blanding
          </L>
          <L x="235" y="80" fill={C.muted} size={12} anchor="middle">
            Kaldere oppover (dT/dz &lt; 0) · Forurensning stiger og spres
          </L>

          {/* Bakke */}
          <rect x="50" y="350" width="370" height="40" fill="#1c2826" stroke="#334155" strokeWidth="1" />
          <L x="235" y="375" fill={C.muted} size={11} anchor="middle">
            Bakkenivå: Mildere eller oppvarmet · Ingen sperre
          </L>

          {/* Vertikal akse for høyde */}
          <line x1="90" y1="350" x2="90" y2="120" stroke={C.dim} strokeWidth="1.5" />
          <L x="85" y="115" fill={C.muted} size={10} anchor="end">Høyde (z)</L>
          <L x="85" y="150" fill={C.muted} size={9} anchor="end">1000 m (-5 °C)</L>
          <L x="85" y="250" fill={C.muted} size={9} anchor="end">500 m (-1 °C)</L>
          <L x="85" y="340" fill={C.muted} size={9} anchor="end">0 m (+2 °C)</L>

          {/* Normal temperaturprofil-kurve (går skrått mot venstre oppover: blir kaldere) */}
          <line x1="300" y1="345" x2="160" y2="135" stroke="#38bdf8" strokeWidth="3" />
          <L x="260" y="225" fill="#38bdf8" size={12} weight={600}>
            Temperaturprofil T(z)
          </L>

          {/* Fabrikkpipe / by og røyk som stiger fritt */}
          <rect x="180" y="315" width="16" height="35" fill="#475569" />
          <ellipse cx="188" cy="275" rx="14" ry="10" fill="#94a3b8" opacity="0.4" />
          <ellipse cx="200" cy="235" rx="26" ry="16" fill="#94a3b8" opacity="0.3" />
          <ellipse cx="215" cy="185" rx="42" ry="22" fill="#94a3b8" opacity="0.2" />
          <ellipse cx="230" cy="140" rx="60" ry="26" fill="#94a3b8" opacity="0.1" />

          {/* Oppdrifts-piler */}
          <Arrow d="M 270 310 L 270 170" marker={m.warm} color={C.warm} width={2.4} />
          <L x="280" y="240" fill={C.warm} size={11} weight={600}>Termisk oppdrift</L>
          <L x="280" y="256" fill={C.muted} size={10}>Utslipp tynnes ut</L>

          {/* --- HØYRE: TEMPERATURINVERSJON (STERKT STABIL) --- */}
          <rect x="480" y="30" width="410" height="380" rx="8" fill="#141923" stroke="#f87171" strokeWidth="1.5" />
          <L x="685" y="60" fill="#f87171" size={16} weight={700} anchor="middle">
            2. Temperaturinversjon: Termisk lokk
          </L>
          <L x="685" y="80" fill={C.muted} size={12} anchor="middle">
            Varmere oppover (dT/dz &gt; 0) · Forurensning fanges i bunnen
          </L>

          {/* Kald dalbunn */}
          <rect x="500" y="350" width="370" height="40" fill="#0c1e2e" stroke="#0284c7" strokeWidth="1" />
          <L x="685" y="375" fill="#7dd3fc" size={11} weight={600} anchor="middle">
            Kald dalbunn: -15 °C (bakken mister varme ved utstråling)
          </L>

          {/* Vertikal akse for høyde */}
          <line x1="540" y1="350" x2="540" y2="120" stroke={C.dim} strokeWidth="1.5" />
          <L x="535" y="115" fill={C.muted} size={10} anchor="end">Høyde (z)</L>
          <L x="535" y="160" fill={C.muted} size={9} anchor="end">600 m (-5 °C)</L>
          <L x="535" y="240" fill={C.muted} size={9} anchor="end">300 m (-2 °C)</L>
          <L x="535" y="340" fill={C.muted} size={9} anchor="end">0 m (-15 °C)</L>

          {/* Inversjonslagets "knekk": Går mot høyre (varmere!) fra bakken til 300m, deretter mot venstre */}
          {/* 0m: T=-15°C (x=600), 300m: T=-2°C (x=730), 600m: T=-5°C (x=670) */}
          <polyline
            points="610,345 730,240 670,140"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.5"
          />

          {/* Inversjonslaget skravert som "Termisk lokk" */}
          <rect x="550" y="225" width="320" height="30" fill="#ea580c" opacity="0.25" rx="4" />
          <line x1="550" y1="240" x2="870" y2="240" stroke="#f97316" strokeDasharray="4 2" strokeWidth="1.5" />
          <L x="710" y="235" fill="#fdba74" size={11} weight={800} anchor="middle">
            INVERSJONSLAG (TERMISK LOKK, ~300 m)
          </L>
          <L x="710" y="249" fill="#fde68a" size={9} anchor="middle">
            dT/dz &gt; 0 · lufta under blandes dårlig med lufta over
          </L>

          {/* Fanget forurensning i bunnen (Smog / Giftlokk) */}
          <rect x="550" y="260" width="320" height="85" fill="#451a03" opacity="0.4" rx="4" />
          {/* Utslippskilder */}
          <rect x="610" y="325" width="12" height="25" fill="#64748b" />
          <rect x="760" y="330" width="16" height="20" fill="#64748b" />
          {/* Fanget røyk som bøyer av mot lokket */}
          <ellipse cx="616" cy="295" rx="35" ry="12" fill="#d97706" opacity="0.6" />
          <ellipse cx="660" cy="285" rx="65" ry="16" fill="#b45309" opacity="0.6" />
          <ellipse cx="730" cy="285" rx="75" ry="16" fill="#b45309" opacity="0.6" />
          <ellipse cx="768" cy="305" rx="40" ry="14" fill="#d97706" opacity="0.6" />

          {/* Tekst om faren */}
          <L x="700" y="300" fill="#fef08a" size={11} weight={700} anchor="middle">
            Utslipp samler seg under lokket
          </L>
          <L x="700" y="318" fill="#fde68a" size={10} anchor="middle">
            Fra skip, veitrafikk og vedfyring
          </L>
        </>
      )}
    </Diagram>
  );
}

