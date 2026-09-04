import { Arrow, C, Diagram, L } from "./svg-kit";

export function SynopticMapDiagram() {
  return (
    <Diagram
      title="Skjematisk værkart over Nord-Atlanteren og Norge med isobarer, L, H og offisielle frontsymboler"
      heading="Slik leser du et synoptisk kart"
      caption="Isobarer er linjer for likt lufttrykk (i hPa). Jo tettere linjene ligger, desto sterkere er trykkgradientkraften og vinden. Vinden blåser mot klokken og skrått inn mot lavtrykk (L), og med klokken ut fra høytrykk (H). Varmfront merkes med røde halvsirkler som peker dit varmen rykker frem. Kaldfront merkes med blå trekanter. Okklusjon (lilla med vekslende symboler) dannes når den raske kaldfronten tar igjen varmfronten og løfter den varme sektoren vekk fra bakken."
      viewBox="0 0 920 480"
      wide
    >
      {(m) => (
        <>
          {/* Kartbakgrunn og stilisert kystkontur (Norge og Storbritannia/Vest-Europa) */}
          <path
            d="M 580 90 Q 640 60, 680 120 Q 710 180, 690 260 L 650 310 Q 630 330, 600 320 Q 590 270, 620 220 Q 620 160, 580 90 Z"
            fill="#18231c"
            stroke={C.dim}
            strokeWidth="1.5"
            opacity="0.75"
          />
          <L x="660" y="160" fill={C.muted} size={14} weight={600}>Norge</L>

          <path
            d="M 430 260 Q 470 240, 480 290 Q 460 340, 420 330 Z"
            fill="#18231c"
            stroke={C.dim}
            strokeWidth="1.2"
            opacity="0.6"
          />
          <L x="450" y="295" fill={C.muted} size={12}>Storbritannia</L>

          {/* Isobarer rundt lavtrykket (vest i Norskehavet/Atlanteren) */}
          <ellipse cx="280" cy="200" rx="230" ry="160" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <L x="130" y="60" fill={C.muted} size={11}>1000 hPa</L>

          <ellipse cx="280" cy="200" rx="170" ry="120" fill="none" stroke={C.dim} strokeWidth="1.4" />
          <L x="170" y="100" fill={C.muted} size={11}>990 hPa</L>

          <ellipse cx="280" cy="200" rx="110" ry="80" fill="none" stroke={C.low} strokeWidth="1.8" />
          <L x="215" y="140" fill={C.low} size={11}>980 hPa</L>

          <ellipse cx="280" cy="200" rx="55" ry="40" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="280" y="206" fill={C.low} size={28} weight={700} anchor="middle">L</L>
          <L x="280" y="226" fill={C.muted} size={12} anchor="middle">972 hPa</L>

          {/* Høytrykk i sørøst (Kontinentet/Skandinavia) */}
          <ellipse cx="780" cy="350" rx="120" ry="85" fill="none" stroke={C.warm} strokeWidth="1.4" />
          <ellipse cx="780" cy="350" rx="65" ry="45" fill="none" stroke={C.warm} strokeWidth="1.8" />
          <L x="780" y="356" fill={C.warm} size={26} weight={700} anchor="middle">H</L>
          <L x="780" y="376" fill={C.muted} size={12} anchor="middle">1028 hPa</L>

          {/* --- FRONTSYSTEMET MED OFFISIELLE METEOROLOGISKE SYMBOLER --- */}

          {/* 1. Okkludert front (lilla strek med vekslende trekanter og halvsirkler) fra L mot trippelpunkt */}
          {/* Trippelpunkt er ved (370, 235) */}
          <path d="M 280 200 C 310 205, 345 215, 370 235" fill="none" stroke="#a872cc" strokeWidth="3.6" />
          <L x="305" y="188" fill="#a872cc" size={12} weight={700}>Okklusjon</L>
          {/* Okklusjonssymboler langs linjen */}
          <polygon points="320,207 328,197 334,212" fill="#a872cc" />
          <path d="M 345 216 A 6 6 0 0 0 357 223 Z" fill="#a872cc" />

          {/* 2. Varmfront (rød linje som buer mot øst/sørøst inn mot kysten, med halvsirkler som peker mot nordøst i bevegelsesretningen) */}
          <path d="M 370 235 C 440 260, 520 280, 600 290" fill="none" stroke={C.low} strokeWidth="3.6" />
          <L x="490" y="315" fill={C.low} size={13} weight={700}>Varmfront (rød med halvsirkler)</L>
          {/* Halvsirkler på varmfronten (peker fremover/nordøstover) */}
          <path d="M 410 248 A 7 7 0 0 0 424 253 Z" fill={C.low} />
          <path d="M 475 270 A 7 7 0 0 0 489 274 Z" fill={C.low} />
          <path d="M 545 284 A 7 7 0 0 0 559 287 Z" fill={C.low} />

          {/* 3. Kaldfront (blå linje som henger bak mot sørvest, med spisse trekanter pekende mot øst/fartsretning) */}
          <path d="M 370 235 C 360 300, 330 370, 280 430" fill="none" stroke={C.cold} strokeWidth="3.6" />
          <L x="355" y="360" fill={C.cold} size={13} weight={700}>Kaldfront (blå med trekanter)</L>
          {/* Trekanter på kaldfronten */}
          <polygon points="364,280 376,284 362,295" fill={C.cold} />
          <polygon points="345,335 357,341 341,350" fill={C.cold} />
          <polygon points="318,385 330,392 312,400" fill={C.cold} />

          {/* Varm sektor mellom frontene */}
          <L x="420" y="375" fill={C.warm} size={14} weight={700}>Varm sektor</L>
          <L x="420" y="395" fill={C.muted} size={11}>Mild, fuktig maritim luft</L>

          {/* Vindpiler som krysser isobarene mot lavtrykket (syklonal innstrømning) */}
          <Arrow d="M 390 120 C 350 100, 290 110, 250 140" marker={m.teal} color={C.teal} width={2.4} />
          <Arrow d="M 160 210 C 170 250, 200 270, 240 260" marker={m.teal} color={C.teal} width={2.4} />
          <Arrow d="M 510 180 C 460 170, 420 180, 380 200" marker={m.teal} color={C.teal} width={2.6} />
          <L x="490" y="165" fill={C.teal} size={12}>Sterk sørvestlig vind mot Norge</L>

          {/* Bunnstripe med leserekkefølge */}
          <rect x="30" y="440" width="860" height="32" rx="6" fill="#141d24" stroke={C.dim} />
          <L x="460" y="461" fill={C.muted} size={12} anchor="middle">
            Metode: 1. Lokaliser L og H · 2. Les isobaravstand (vindstyrke) · 3. Identifiser frontene · 4. Forutsi værutvikling 12–24 t
          </L>
        </>
      )}
    </Diagram>
  );
}

export function TwentyFourHourDiagram() {
  return (
    <Diagram
      title="Samme lavtrykk nå og om 24 timer"
      heading="Hva skjer de neste 24 timene?"
      caption="Polarfrontsykloner over Nord-Atlanteren drives typisk mot nordøst med styrestrømmen i jetstrømmen (20–40 knop). Frontene følger med. Områder foran varmfronten opplever først tiltakende skydække og jevn nedbør, deretter varm sektor, før kaldfronten passerer med byger, vinddreining og markert temperaturfall."
      viewBox="0 0 900 280"
      wide
    >
      {(m) => (
        <>
          <L x="170" y="36" size={16} weight={600} anchor="middle">Nå-situasjon (vest for Stad)</L>
          <circle cx="170" cy="150" r="54" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="170" y="156" fill={C.low} size={22} weight={700} anchor="middle">L₁</L>
          <L x="170" y="174" fill={C.muted} size={11} anchor="middle">980 hPa</L>

          {/* Varmfront og kaldfront nå */}
          <path d="M 170 150 C 210 170, 240 200, 250 240" fill="none" stroke={C.low} strokeWidth="2.8" />
          <path d="M 170 150 C 160 190, 140 220, 120 250" fill="none" stroke={C.cold} strokeWidth="2.8" />

          {/* Styrestrøm-vektor */}
          <Arrow d="M 240 145 C 380 120, 520 110, 640 115" marker={m.teal} color={C.teal} width={3.6} />
          <L x="440" y="100" fill={C.teal} size={13} weight={600} anchor="middle">
            Styres av jetstrømmen mot nordøst (ca. 600–800 km/døgn)
          </L>

          <L x="730" y="36" size={16} weight={600} anchor="middle">+24 timer (over Helgeland / Sverige)</L>
          <circle cx="730" cy="118" r="54" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="730" y="124" fill={C.low} size={22} weight={700} anchor="middle">L₂</L>
          <L x="730" y="142" fill={C.muted} size={11} anchor="middle">975 hPa (fordypet)</L>

          {/* Okkludert system +24t */}
          <path d="M 730 118 C 760 140, 780 170, 800 210" fill="none" stroke="#a872cc" strokeWidth="2.8" />
        </>
      )}
    </Diagram>
  );
}

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
      title="Dalvind og fjellvind: lokal sirkulasjon i et dalføre"
      heading="Dalvind om dagen, fjellvind om natten"
      caption="Venstre: Om dagen varmes de bratte dalsidene raskere opp av solen enn luften midt i dalen. Den varme luften stiger oppover dalsidene (solgangsbris/dalvind). Høyre: Om natten avkjøles dalsidene raskt ved langbølget utstråling. Den kalde, tunge luften renner som en katabatisk vind ned i dalbunnen, der det kan dannes en kald luftpytt med temperaturinversjon og frost."
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
            Solsidene varmes $\rightarrow$ termisk oppdrift langs fjellsiden
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
            Natt: Utstråling · Fjellvind
          </L>
          <L x="630" y="52" fill={C.muted} size={12} anchor="middle">
            Varme stråler ut i rommet $\rightarrow$ tung kaldluft renner ned
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
          <L x="520" y="170" fill={C.cold} size={12} weight={600}>Fjellvind ned</L>
          <L x="740" y="170" fill={C.cold} size={12} weight={600}>Fjellvind ned</L>
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
          <L x="35" y="290" fill={C.teal} size={11} anchor="end">1000 m (LCL)</L>
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

export function FrontCrossSectionDiagram() {
  return (
    <Diagram
      title="Frontenes vertikalsnitt: varmfront vs. kaldfront"
      heading="Skyrekkefølge, helning og nedbørsmønster"
      caption="Frontene er grensene der ulike luftmasser møtes. Varmfronten (øverst) har en slak helning (1:150 til 1:200). Varmluften glir langsomt oppover over den kalde luften, og danner et forvarsel av fjærskyer (Cirrus) opptil 1000 km i forkant. Nedbøren faller fra Nimbostratus i et bredt, jevnt belte (300–400 km). Kaldfronten (nederst) har en bratt helning (1:50) og dytter seg frem som en kile under varmluften. Dette kaster varmluften brått til værs og utløser veldige bygeskyer (Cumulonimbus) med kraftige byger, torden og vindkast i et smalt belte (50–100 km)."
      viewBox="0 0 920 500"
      wide
    >
      {(m) => (
        <>
          {/* ================= PANEL 1: VARMFRONT (ØVERST) ================= */}
          <rect x="30" y="20" width="860" height="220" rx="8" fill="#121a22" stroke={C.warm} strokeWidth="1.5" />

          <L x="50" y="44" fill={C.warm} size={16} weight={800}>
            VARMFRONT (Slak helning ca. 1:150)
          </L>
          <L x="380" y="44" fill={C.muted} size={12}>
            Bevegelse mot høyre →
          </L>

          {/* Bakkelinje */}
          <line x1="40" y1="210" x2="880" y2="210" stroke={C.dim} strokeWidth="1.5" />

          {/* Kald luftmasse til høyre under frontflaten */}
          <path d="M 240 210 L 880 70 L 880 210 Z" fill="#152633" />
          <L x="750" y="170" fill={C.cold} size={14} weight={800}>
            Kald luftmasse (trekkende mot øst)
          </L>

          {/* Varm luftmasse glir slakt oppover */}
          <path d="M 40 210 L 240 210 L 880 70 L 880 50 L 40 50 Z" fill="#2c1a16" opacity="0.5" />
          <L x="120" y="140" fill={C.warm} size={14} weight={800}>
            Varm luftmasse
          </L>
          <Arrow d="M 120 180 Q 220 170 340 140" marker={m.warm} color={C.warm} width={2.8} />

          {/* Frontflate linje med røde halvsirkler */}
          <line x1="240" y1="210" x2="880" y2="70" stroke={C.warm} strokeWidth="2.8" />
          {/* Offisiell frontmarkering på bakken ved x=240 */}
          <path d="M 230 210 A 8 8 0 0 1 246 210" fill={C.warm} />
          <path d="M 252 210 A 8 8 0 0 1 268 210" fill={C.warm} />
          <L x="240" y="228" fill={C.warm} size={12} weight={700} anchor="middle">
            Varmfront på bakken
          </L>

          {/* Skygenus-rekkefølge langs frontflaten */}
          {/* Cirrus (Ci) lengst til høyre, 9-10 km */}
          <path d="M 750 65 Q 790 55 840 68" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="6 3" fill="none" />
          <L x="790" y="60" fill="#cbd5e1" size={12} weight={700}>Cirrus (Ci, ~9 km)</L>

          {/* Cirrostratus (Cs) */}
          <path d="M 600 95 Q 670 85 740 90" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.8" />
          <L x="660" y="88" fill="#94a3b8" size={11} weight={600}>Cirrostratus (Cs)</L>

          {/* Altostratus (As) */}
          <path d="M 450 125 Q 520 115 590 120" stroke="#64748b" strokeWidth="7" fill="none" opacity="0.85" />
          <L x="500" y="115" fill="#e2e8f0" size={11} weight={700}>Altostratus (As)</L>

          {/* Nimbostratus (Ns) med regn */}
          <path d="M 250 165 Q 350 145 440 150 L 440 190 L 250 190 Z" fill="#475569" opacity="0.9" />
          <L x="330" y="165" fill="#fff" size={13} weight={800}>Nimbostratus (Ns)</L>

          {/* Nedbørsfelt varmfront (bredt: 300-400 km) */}
          <rect x="250" y="190" width="190" height="20" fill={C.rain} opacity="0.4" />
          <L x="345" y="204" fill={C.rain} size={11} weight={700} anchor="middle">
            Jevn, langvarig nedbør (300–400 km bredde) 🌧️
          </L>

          {/* ================= PANEL 2: KALDFRONT (NEDERST) ================= */}
          <rect x="30" y="260" width="860" height="220" rx="8" fill="#121a22" stroke={C.cold} strokeWidth="1.5" />

          <L x="50" y="284" fill={C.cold} size={16} weight={800}>
            KALDFRONT (Bratt helning ca. 1:50)
          </L>
          <L x="380" y="284" fill={C.muted} size={12}>
            Bevegelse mot høyre →
          </L>

          {/* Bakkelinje */}
          <line x1="40" y1="450" x2="880" y2="450" stroke={C.dim} strokeWidth="1.5" />

          {/* Kald kile som dytter under varmluften */}
          <path d="M 40 450 L 480 450 Q 450 350 380 290 L 40 290 Z" fill="#162c3d" />
          <L x="180" y="410" fill={C.cold} size={14} weight={800}>
            Kald luftmasse (tett & rask)
          </L>
          <Arrow d="M 260 415 L 430 415" marker={m.cold} color={C.cold} width={3.2} />

          {/* Varmluft dyttes bratt til værs */}
          <path d="M 480 450 Q 450 350 380 290 L 880 290 L 880 450 Z" fill="#2c1a16" opacity="0.4" />
          <L x="680" y="410" fill={C.warm} size={14} weight={800}>
            Varm luftmasse
          </L>
          <Arrow d="M 520 420 Q 490 380 460 310" marker={m.warm} color={C.warm} width={3} />
          <L x="525" y="360" fill={C.warm} size={12} weight={700}>
            Kastes brutalt opp!
          </L>

          {/* Frontlinje med blå trekanter */}
          <path d="M 480 450 Q 450 350 380 290" stroke={C.cold} strokeWidth="3" fill="none" />
          {/* Offisiell markering */}
          <polygon points="480,450 492,440 492,450" fill={C.cold} />
          <polygon points="460,400 472,390 468,405" fill={C.cold} />
          <L x="495" y="468" fill={C.cold} size={12} weight={700}>
            Kaldfront på bakken
          </L>

          {/* Cumulonimbus (Cb) tordensky */}
          {/* Ambolt (Anvil) i tropopausen */}
          <path
            d="M 360 300 Q 430 270 540 290 L 510 320 Q 480 340 470 410 L 410 410 Q 380 360 360 300 Z"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <L x="430" y="300" fill="#fff" size={13} weight={800} anchor="middle">
            Cumulonimbus (Cb)
          </L>
          <L x="430" y="318" fill="#cbd5e1" size={10} anchor="middle">
            Ambolttopp ved tropopausen
          </L>

          {/* Intens bygesone (smal: 50–80 km) */}
          <rect x="410" y="420" width="70" height="30" fill={C.low} opacity="0.3" />
          <L x="445" y="435" fill={C.low} size={11} weight={800} anchor="middle">
            Byger ⚡
          </L>
          <L x="445" y="446" fill="#fff" size={9} weight={600} anchor="middle">
            Hagl · Kastvind (50–80 km)
          </L>

          <L x="660" y="330" fill={C.muted} size={12}>
            Bakfront: Hurtig oppklarning og kjøligere luft
          </L>
        </>
      )}
    </Diagram>
  );
}

export function HurricaneStructureDiagram() {
  return (
    <Diagram
      title="Den tropiske orkanens oppbygning: øyet, øyveggen og regnbånd"
      heading="Den latente varmemotoren over tropisk hav"
      caption="En tropisk orkan er et varmkjerne-lavtrykk som drives av vanndamp fra hav med temperatur over 26,5 °C. I øyet synker tørr luft, noe som skaper skyfritt vær og vindstille med ekstremt lavt lufttrykk. I øyveggen raser orkanens sterkeste vinder og mest voldsomme oppdrift. Fuktig luft suges inn langs havoverflaten, kondenserer i de enorme cumulonimbus-skyene og frigjør gigantiske mengder latent varme som akselererer oppdriften. I toppen (12–15 km) sprer luften seg utover i en antisyklonsk divergens."
      viewBox="0 0 880 440"
      wide
    >
      {(m) => (
        <>
          {/* Tropopause linje øverst */}
          <line x1="40" y1="50" x2="840" y2="50" stroke={C.dim} strokeDasharray="4 4" />
          <L x="50" y="42" fill={C.muted} size={11}>Tropopause (~15 km)</L>

          {/* Varmt hav nederst */}
          <rect x="40" y="360" width="800" height="60" fill="#0f2636" rx="4" />
          <line x1="40" y1="360" x2="840" y2="360" stroke="#38bdf8" strokeWidth="2" />
          <L x="440" y="385" fill="#38bdf8" size={14} weight={800} anchor="middle">
            Varmt tropisk hav (&gt; 26,5 °C til minst 50 m dyp)
          </L>
          <L x="440" y="405" fill={C.warm} size={12} weight={600} anchor="middle">
            Enorm fordamping gir latent brensel til orkanen
          </L>

          {/* ØYET I MIDTEN (x=410 til 470) */}
          <rect x="415" y="60" width="50" height="300" fill="#141c22" opacity="0.9" />
          <L x="440" y="110" fill={C.fg} size={15} weight={800} anchor="middle">
            ØYET
          </L>
          <L x="440" y="130" fill={C.muted} size={11} anchor="middle">
            20–50 km bredt
          </L>
          <L x="440" y="150" fill={C.warm} size={11} weight={700} anchor="middle">
            Vindstille
          </L>
          <L x="440" y="170" fill={C.cold} size={11} anchor="middle">
            Skyfritt
          </L>
          <L x="440" y="240" fill={C.low} size={14} weight={800} anchor="middle">
            &lt; 920 hPa
          </L>
          {/* Synkende luft i øyet */}
          <Arrow d="M 440 70 L 440 220" marker={m.cold} color={C.cold} width={2.4} />

          {/* ØYVEGGEN (Venstre: x=340-415, Høyre: x=465-540) */}
          {/* Venstre øyvegg */}
          <path
            d="M 330 360 L 370 70 L 415 70 L 415 360 Z"
            fill="#334155"
            stroke={C.low}
            strokeWidth="1.8"
          />
          <Arrow d="M 350 350 L 380 80" marker={m.warm} color={C.warm} width={3.8} />

          {/* Høyre øyvegg */}
          <path
            d="M 550 360 L 510 70 L 465 70 L 465 360 Z"
            fill="#334155"
            stroke={C.low}
            strokeWidth="1.8"
          />
          <Arrow d="M 530 350 L 500 80" marker={m.warm} color={C.warm} width={3.8} />

          <L x="270" y="180" fill={C.low} size={14} weight={800} anchor="middle">
            Øyveggen (Eyewall)
          </L>
          <L x="270" y="200" fill="#fff" size={11} weight={700} anchor="middle">
            Sterkeste vind (&gt; 200 km/t)
          </L>
          <L x="270" y="218" fill={C.rain} size={11} anchor="middle">
            Maksimal konveksjon & regn
          </L>

          <L x="610" y="180" fill={C.low} size={14} weight={800} anchor="middle">
            Øyveggen (Eyewall)
          </L>
          <L x="610" y="200" fill="#fff" size={11} weight={700} anchor="middle">
            Sterkeste vind (&gt; 200 km/t)
          </L>
          <L x="610" y="218" fill={C.rain} size={11} anchor="middle">
            Maksimal konveksjon & regn
          </L>

          {/* SPIRALFORMEDE REGNBÅND (Ytre) */}
          {/* Venstre regnbånd */}
          <path d="M 120 360 L 160 140 L 220 140 L 200 360 Z" fill="#1e293b" opacity="0.8" />
          <path d="M 230 360 L 260 110 L 310 110 L 290 360 Z" fill="#1e293b" opacity="0.85" />
          <Arrow d="M 170 350 L 190 150" marker={m.rain} color={C.rain} width={2.4} />

          {/* Høyre regnbånd */}
          <path d="M 760 360 L 720 140 L 660 140 L 680 360 Z" fill="#1e293b" opacity="0.8" />
          <path d="M 650 360 L 620 110 L 570 110 L 590 360 Z" fill="#1e293b" opacity="0.85" />
          <Arrow d="M 710 350 L 690 150" marker={m.rain} color={C.rain} width={2.4} />

          <L x="160" y="125" fill={C.rain} size={12} weight={700} anchor="middle">
            Spiralregnbånd
          </L>
          <L x="720" y="125" fill={C.rain} size={12} weight={700} anchor="middle">
            Spiralregnbånd
          </L>

          {/* INNSTRØMMING VED OVERFLATEN */}
          <Arrow d="M 60 345 L 340 345" marker={m.warm} color={C.warm} width={3.2} />
          <L x="150" y="335" fill={C.warm} size={12} weight={700}>
            Fuktig luft suges inn →
          </L>

          <Arrow d="M 820 345 L 540 345" marker={m.warm} color={C.warm} width={3.2} />
          <L x="730" y="335" fill={C.warm} size={12} weight={700} anchor="end">
            ← Fuktig luft suges inn
          </L>

          {/* UTSTRØMMING I TOPPEN (Divergens) */}
          <Arrow d="M 370 65 L 100 65" marker={m.teal} color={C.teal} width={3} />
          <L x="230" y="55" fill={C.teal} size={12} weight={700}>
            ← Antisyklonsk utstrømning
          </L>

          <Arrow d="M 510 65 L 780 65" marker={m.teal} color={C.teal} width={3} />
          <L x="650" y="55" fill={C.teal} size={12} weight={700}>
            Antisyklonsk utstrømning →
          </L>
        </>
      )}
    </Diagram>
  );
}

export function PolarLowDiagram() {
  return (
    <Diagram
      title="Polart lavtrykk: det arktiske uværet"
      heading="Når arktisk luftmasse treffer åpent, varmere havvann"
      caption="Et polart lavtrykk (arktisk bombe) oppstår under en kaldluftsutbrudd (marine cold air outbreak) når iskald luft (-20 til -30 °C) fra Arktis/Svalbard strømmer ut over det relativt varme Norskehavet eller Barentshavet (+4 til +7 °C). Den voldsomme temperaturforskjellen mater intens konveksjon. Systemet er lite (100–400 km), utvikler seg på under 12 timer og har ofte et orkanlignende øye med tett snøfokk og storm/orkan i vindkastene."
      viewBox="0 0 880 400"
      wide
    >
      {(m) => (
        <>
          {/* Nord: Arktisk is/Svalbard */}
          <rect x="40" y="30" width="380" height="150" rx="8" fill="#142633" stroke={C.cold} strokeWidth="1.5" />
          <L x="230" y="55" fill={C.cold} size={15} weight={800} anchor="middle">
            Arktisk luftutbrudd (Polisen / Svalbard)
          </L>
          <L x="230" y="78" fill="#fff" size={14} weight={700} anchor="middle">
            Temperatur: -20 °C til -35 °C
          </L>
          <L x="230" y="100" fill={C.muted} size={12} anchor="middle">
            Ekstremt kald, tørr og stabil luftmasse
          </L>
          <Arrow d="M 230 115 L 230 190" marker={m.cold} color={C.cold} width={3.6} />
          <L x="245" y="155" fill={C.cold} size={12} weight={700}>
            Kaldluft strømmer sørover ↓
          </L>

          {/* Sør: Åpent Norskehavet */}
          <rect x="40" y="210" width="380" height="160" rx="8" fill="#0f212e" stroke={C.teal} strokeWidth="1.5" />
          <L x="230" y="235" fill={C.teal} size={15} weight={800} anchor="middle">
            Åpent Norskehavet / Barentshavet
          </L>
          <L x="230" y="258" fill="#38bdf8" size={14} weight={700} anchor="middle">
            Havtemperatur: +4 °C til +7 °C
          </L>
          <L x="230" y="280" fill={C.warm} size={13} weight={800} anchor="middle">
            Temperaturkontrast: &gt; 30–40 °C!
          </L>
          <L x="230" y="305" fill={C.fg} size={11} anchor="middle">
            Voldsom varme- og fuktfluks fra hav til luft (&gt; 500 W/m²)
          </L>
          <L x="230" y="325" fill={C.low} size={11} weight={700} anchor="middle">
            Eksplosiv atmosfærisk ustabilitet utløses!
          </L>

          {/* Høyre panel: Det polare lavtrykket (Satellitt spiral) */}
          <rect x="450" y="30" width="390" height="340" rx="8" fill="#111a22" stroke={C.low} strokeWidth="2" />
          <L x="645" y="58" fill={C.low} size={16} weight={800} anchor="middle">
            Polart lavtrykk (Kompakt minispiral)
          </L>
          <L x="645" y="78" fill={C.muted} size={12} anchor="middle">
            Diameter: 100–400 km · Levetid: 12–36 timer
          </L>

          {/* Roterende kommaspiral */}
          <circle cx="645" cy="180" r="85" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="10 6" opacity="0.6" />
          <circle cx="645" cy="180" r="55" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="8 4" opacity="0.8" />
          <circle cx="645" cy="180" r="28" fill="none" stroke="#94a3b8" strokeWidth="5" />

          {/* Det polare øyet */}
          <circle cx="645" cy="180" r="10" fill="#111a22" stroke={C.low} strokeWidth="2" />
          <L x="645" y="184" fill={C.low} size={11} weight={800} anchor="middle">
            L
          </L>

          {/* Sykloniske rotasjonspiler mot klokken */}
          <Arrow d="M 645 120 Q 560 140 580 220" marker={m.low} color={C.low} width={3} />
          <Arrow d="M 580 220 Q 640 260 710 210" marker={m.low} color={C.low} width={3} />
          <Arrow d="M 710 210 Q 730 140 655 120" marker={m.low} color={C.low} width={3} />

          {/* Farer og konsekvenser */}
          <rect x="470" y="285" width="350" height="70" rx="6" fill="#1e181c" stroke="#dc2626" strokeWidth="1.2" />
          <L x="645" y="306" fill="#f87171" size={12} weight={800} anchor="middle">
            ⚠️ Ekstrem naturfare for kyst- og havfiske
          </L>
          <L x="645" y="324" fill={C.fg} size={11} anchor="middle">
            • Hurtig trykkfall og uvarslet vindøkning til full storm / orkan
          </L>
          <L x="645" y="342" fill={C.fg} size={11} anchor="middle">
            • Tett snøfokk (whiteout), ising på skip og ekstrem bølgehøyde
          </L>
        </>
      )}
    </Diagram>
  );
}
