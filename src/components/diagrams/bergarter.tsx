import { Arrow, C, Diagram, L } from "./svg-kit";

function Station({
  x,
  y,
  w = 230,
  h = 88,
  stroke,
  fill,
  title,
  sub,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  stroke: string;
  fill: string;
  title: string;
  sub: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <L x={x + w / 2} y={y + 36} fill={C.fg} size={16} anchor="middle" weight={700}>
        {title}
      </L>
      <L x={x + w / 2} y={y + 58} fill={stroke} size={13} anchor="middle">
        {sub}
      </L>
    </g>
  );
}

export function RockCycleDiagram() {
  return (
    <Diagram
      title="Bergartssyklusen: samspillet mellom magmatiske, sedimentære og metamorfe bergarter"
      heading="Bergartssyklusen — naturens store gjenbruk"
      caption="Bergartssyklusen er en dynamisk modell som viser hvordan jordas bergarter kontinuerlig nydannes, brytes ned og omdannes. Ingen bergart er evig. Magma krystalliserer til magmatiske bergarter (dypbergarter eller dagbergarter). På overflaten forvitrer og eroderer eksponert fjell til løsmasser, som gjennom diagenese (kompaksjon og sementering) forsteines til sedimentære bergarter. Under tektonisk nedsenkning, fjellkjedefolding og varme omdannes bergartene i fast tilstand til metamorfe bergarter. Blir temperaturen høy nok (>650–800 °C), inntreffer partiell eller full smelting (anateksis) tilbake til magma."
      viewBox="0 0 860 480"
    >
      {(m) => (
        <>
          {/* Hovedstasjoner (Trekant-oppsett) */}
          {/* 1. Magmatiske bergarter (øverst) */}
          <Station
            x={295}
            y={35}
            w={270}
            h={85}
            stroke={C.warm}
            fill="#302418"
            title="Magmatiske bergarter"
            sub="Dypbergart (granitt) · Dagbergart (basalt)"
          />

          {/* 2. Sedimentære bergarter (nede til høyre) */}
          <Station
            x={530}
            y={240}
            w={280}
            h={85}
            stroke={C.sand}
            fill="#29261a"
            title="Sedimentære bergarter"
            sub="Sandstein · Leirskifer · Kalkstein"
          />

          {/* 3. Metamorfe bergarter (nede til venstre) */}
          <Station
            x={50}
            y={240}
            w={270}
            h={85}
            stroke={C.teal}
            fill="#152b33"
            title="Metamorfe bergarter"
            sub="Gneis · Skifer · Marmor"
          />

          {/* 4. Magmakammer / smelte (nederst i midten på dypet) */}
          <rect
            x={335}
            y={390}
            width={190}
            height={55}
            rx="12"
            fill="#3a1c14"
            stroke={C.low}
            strokeWidth="1.8"
          />
          <L x={430} y={416} fill={C.low} size={15} weight={700} anchor="middle">
            Magma (smelte)
          </L>
          <L x={430} y={434} fill={C.muted} size={11} anchor="middle">
            Astenosfæren og dyp skorpe
          </L>

          {/* --- PILER OG PROSESSER --- */}

          {/* Magma -> Magmatisk bergart: Avkjøling og krystallisasjon */}
          <Arrow d="M 430 390 L 430 130" marker={m.warm} color={C.warm} width={3.2} />
          <L x="442" y="270" fill={C.warm} size={12} weight={700}>
            Størkning · krystallisasjon
          </L>

          {/* Magmatisk -> Sedimentær: Forvitring, erosjon, transport, avsetning og diagenese */}
          <Arrow d="M 565 85 C 690 110, 720 180, 685 235" marker={m.sand} color={C.sand} width={2.6} />
          <L x="720" y="150" fill={C.sand} size={12} weight={700}>
            Forvitring, erosjon
          </L>
          <L x="720" y="168" fill={C.muted} size={11}>
            &amp; diagenese (litifisering)
          </L>

          {/* Sedimentær -> Metamorf: Økende trykk og temperatur (metamorfose) */}
          <Arrow d="M 530 280 L 330 280" marker={m.teal} color={C.teal} width={3} />
          <L x="430" y="268" fill={C.teal} size={13} weight={700} anchor="middle">
            Metamorfose
          </L>
          <L x="430" y="298" fill={C.muted} size={11} anchor="middle">
            Trykk og temperatur (fast tilstand)
          </L>

          {/* Metamorf -> Magma: Fullstendig oppsmelting på stort dyp */}
          <Arrow d="M 210 330 C 240 385, 290 415, 330 415" marker={m.low} color={C.low} width={2.8} />
          <L x="225" y="380" fill={C.low} size={12} weight={700}>
            Smelting på dypet
          </L>

          {/* Snarveier / kryssende prosesser */}
          {/* Metamorf -> Sedimentær: Også metamorfe bergarter forvitrer når de heves til overflaten */}
          <Arrow d="M 180 235 C 190 160, 500 160, 530 235" marker={m.sand} color={C.sand} width={2} dash="5 4" />
          <L x="360" y="165" fill={C.sand} size={11} anchor="middle">
            Heving, forvitring &amp; erosjon
          </L>

          {/* Magmatisk -> Metamorf: Magmatiske bergarter kan omdannes direkte */}
          <Arrow d="M 300 85 C 180 110, 150 180, 175 235" marker={m.teal} color={C.teal} width={2.4} />
          <L x="155" y="145" fill={C.teal} size={12} weight={700}>
            Regionalmetamorfose
          </L>
          <L x="155" y="162" fill={C.muted} size={11}>
            (Kollisjon / orogenese)
          </L>

          {/* Sedimentær -> Magma: Direkte smelting ved subduksjon */}
          <Arrow d="M 660 330 C 620 385, 570 415, 530 415" marker={m.low} color={C.low} width={2.4} dash="5 4" />
          <L x="640" y="380" fill={C.low} size={12}>
            Subduksjon &amp; smelting
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * Silikatstrukturenes oppbygning fra SiO4-tetraeder til nettverk
 */
export function SilicateStructureDiagram() {
  return (
    <Diagram
      title="Silikatenes krystallkjemiske oppbygning: Fra isolerte tetraedre til 3D-rammeverk"
      heading="Silikatmineralenes arkitektur — jordas dominerende mineralgruppe"
      caption="Silikater utgjør over 90 % av jordskorpen. Byggesteinen er silisium-oksygen-tetraederet [SiO₄]⁴⁻, der ett lite Si⁴⁺-ion er omgitt av fire store O²⁻-ioner. Graden av kovalent deling av oksygenatomer mellom tetraedrene avgjør mineralets spalteretning, hardhet, tetthet og forvitringsresistens: Fra isolerte tetraedre i olivin til enkle kjeder (pyroksen), doble kjeder (amfibol), sjikt (glimmer) og tredimensjonale rammeverk (feltspat og kvarts)."
      viewBox="0 0 920 480"
      wide
    >
      {() => (
        <>
          <rect x="30" y="30" width="860" height="420" rx="12" fill="#131c23" stroke={C.dim} strokeWidth="1.6" />

          {/* 5 kolonner for de 5 silikatklassene */}
          {/* 1. Nesosilikater (Isolerte tetraedre) */}
          <g>
            <rect x="45" y="45" width="160" height="390" rx="8" fill="#1a2720" stroke={C.cold} strokeWidth="1.2" />
            <L x="125" y="70" fill={C.cold} size={13} weight={700} anchor="middle">Isolerte [SiO₄]⁴⁻</L>
            <L x="125" y="88" fill={C.fg} size={11} anchor="middle">(Nesosilikater)</L>
            <L x="125" y="106" fill={C.sand} size={10} anchor="middle">Si:O = 1:4</L>

            {/* Tetraeder tegning */}
            <polygon points="125,130 95,180 155,180" fill="#2d4a36" stroke={C.cold} strokeWidth="1.5" />
            <line x1="125" y1="130" x2="125" y2="160" stroke={C.cold} strokeWidth="1.2" />
            <line x1="95" y1="180" x2="125" y2="160" stroke={C.cold} strokeWidth="1.2" />
            <line x1="155" y1="180" x2="125" y2="160" stroke={C.cold} strokeWidth="1.2" />
            <circle cx="125" cy="160" r="5" fill="#facc15" />
            <circle cx="125" cy="130" r="6" fill="#ef4444" />
            <circle cx="95" cy="180" r="6" fill="#ef4444" />
            <circle cx="155" cy="180" r="6" fill="#ef4444" />

            <L x="125" y="215" fill={C.fg} size={12} weight={700} anchor="middle">Olivin</L>
            <L x="125" y="232" fill={C.muted} size={10} anchor="middle">Granat</L>

            <rect x="55" y="250" width="140" height="170" rx="6" fill="#141f1a" />
            <L x="65" y="272" fill={C.sand} size={10} weight={600}>Egenskaper:</L>
            <L x="65" y="290" fill={C.fg} size={9}>• Ingen felles oksygen.</L>
            <L x="65" y="306" fill={C.fg} size={9}>• Bundet via Fe²⁺/Mg²⁺.</L>
            <L x="65" y="322" fill={C.fg} size={9}>• Høy tetthet (3,3 g/cm³).</L>
            <L x="65" y="338" fill={C.fg} size={9}>• Ingen kløv (musklete brudd).</L>
            <L x="65" y="360" fill={C.warm} size={9}>• Svært lav forvitrings-</L>
            <L x="65" y="374" fill={C.warm} size={9}>  resistens på overflaten.</L>
          </g>

          {/* 2. Enkeltkjeder (Inosilikater) */}
          <g>
            <rect x="215" y="45" width="160" height="390" rx="8" fill="#1b2528" stroke={C.teal} strokeWidth="1.2" />
            <L x="295" y="70" fill={C.teal} size={13} weight={700} anchor="middle">Enkelkjeder [Si₂O₆]⁴⁻</L>
            <L x="295" y="88" fill={C.fg} size={11} anchor="middle">(Inosilikater)</L>
            <L x="295" y="106" fill={C.sand} size={10} anchor="middle">Si:O = 1:3</L>

            {/* Kjede */}
            <polygon points="275,130 255,160 295,160" fill="#1f3d45" stroke={C.teal} strokeWidth="1.2" />
            <polygon points="315,130 295,160 335,160" fill="#1f3d45" stroke={C.teal} strokeWidth="1.2" />
            <polygon points="295,160 275,190 315,190" fill="#1f3d45" stroke={C.teal} strokeWidth="1.2" />

            <L x="295" y="215" fill={C.fg} size={12} weight={700} anchor="middle">Pyroksen</L>
            <L x="295" y="232" fill={C.muted} size={10} anchor="middle">Augitt, diopsid</L>

            <rect x="225" y="250" width="140" height="170" rx="6" fill="#131e22" />
            <L x="235" y="272" fill={C.sand} size={10} weight={600}>Egenskaper:</L>
            <L x="235" y="290" fill={C.fg} size={9}>• Deler 2 oksygenatomer.</L>
            <L x="235" y="306" fill={C.fg} size={9}>• To perfekte kløvretninger</L>
            <L x="235" y="322" fill={C.teal} size={9}>  i ~90° vinkel (87°/93°).</L>
            <L x="235" y="338" fill={C.fg} size={9}>• Korte, prismatiske</L>
            <L x="235" y="352" fill={C.fg} size={9}>  mørke krystaller.</L>
            <L x="235" y="374" fill={C.warm} size={9}>• Mafiske bergarter (gabbro).</L>
          </g>

          {/* 3. Dobbeltkjeder (Inosilikater) */}
          <g>
            <rect x="385" y="45" width="160" height="390" rx="8" fill="#1c242c" stroke={C.sand} strokeWidth="1.2" />
            <L x="465" y="70" fill={C.sand} size={13} weight={700} anchor="middle">Dobbeltkjeder [Si₄O₁₁]⁶⁻</L>
            <L x="465" y="88" fill={C.fg} size={11} anchor="middle">(Amfibolgruppe)</L>
            <L x="465" y="106" fill={C.sand} size={10} anchor="middle">Si:O = 4:11</L>

            {/* Dobbeltkjede skisse */}
            <polygon points="445,130 425,160 465,160" fill="#383424" stroke={C.sand} strokeWidth="1.2" />
            <polygon points="485,130 465,160 505,160" fill="#383424" stroke={C.sand} strokeWidth="1.2" />
            <polygon points="465,160 445,190 485,190" fill="#383424" stroke={C.sand} strokeWidth="1.2" />
            <polygon points="505,160 485,190 525,190" fill="#383424" stroke={C.sand} strokeWidth="1.2" />

            <L x="465" y="215" fill={C.fg} size={12} weight={700} anchor="middle">Amfibol</L>
            <L x="465" y="232" fill={C.muted} size={10} anchor="middle">Hornblende, tremolitt</L>

            <rect x="395" y="250" width="140" height="170" rx="6" fill="#151b22" />
            <L x="405" y="272" fill={C.sand} size={10} weight={600}>Egenskaper:</L>
            <L x="405" y="290" fill={C.fg} size={9}>• Deler 2 og 3 oksygen.</L>
            <L x="405" y="306" fill={C.sand} size={9}>• To perfekte kløvretninger</L>
            <L x="405" y="322" fill={C.sand} size={9}>  i 60° / 120° vinkel!</L>
            <L x="405" y="338" fill={C.fg} size={9}>• Nålformede, langstrakte</L>
            <L x="405" y="352" fill={C.fg} size={9}>  krystaller.</L>
            <L x="405" y="374" fill={C.fg} size={9}>• Inneholder OH⁻-grupper.</L>
          </g>

          {/* 4. Sjikt/Flak (Fyllosilikater) */}
          <g>
            <rect x="555" y="45" width="160" height="390" rx="8" fill="#241e28" stroke={C.low} strokeWidth="1.2" />
            <L x="635" y="70" fill={C.low} size={13} weight={700} anchor="middle">Sjiktsilikater [Si₂O₅]²⁻</L>
            <L x="635" y="88" fill={C.fg} size={11} anchor="middle">(Fyllosilikater)</L>
            <L x="635" y="106" fill={C.sand} size={10} anchor="middle">Si:O = 2:5</L>

            {/* Flak linjer */}
            <rect x="585" y="140" width="100" height="8" rx="2" fill="#442a42" stroke={C.low} strokeWidth="1" />
            <rect x="585" y="156" width="100" height="8" rx="2" fill="#442a42" stroke={C.low} strokeWidth="1" />
            <rect x="585" y="172" width="100" height="8" rx="2" fill="#442a42" stroke={C.low} strokeWidth="1" />

            <L x="635" y="215" fill={C.fg} size={12} weight={700} anchor="middle">Glimmer / Leir</L>
            <L x="635" y="232" fill={C.muted} size={10} anchor="middle">Biotitt, muskovitt, kloritt</L>

            <rect x="565" y="250" width="140" height="170" rx="6" fill="#1b1620" />
            <L x="575" y="272" fill={C.sand} size={10} weight={600}>Egenskaper:</L>
            <L x="575" y="290" fill={C.fg} size={9}>• Deler 3 oksygenatomer.</L>
            <L x="575" y="306" fill={C.low} size={9}>• Én ekstremt perfekt kløv</L>
            <L x="575" y="322" fill={C.low} size={9}>  (kan spaltes til tynne flak).</L>
            <L x="575" y="338" fill={C.fg} size={9}>• Svake van der Waals-</L>
            <L x="575" y="352" fill={C.fg} size={9}>  krefter mellom sjiktene.</L>
            <L x="575" y="374" fill={C.teal} size={9}>• Grunnlag for skifrighet.</L>
          </g>

          {/* 5. 3D Rammeverk (Tektosilikater) */}
          <g>
            <rect x="725" y="45" width="150" height="390" rx="8" fill="#192834" stroke={C.warm} strokeWidth="1.4" />
            <L x="800" y="70" fill={C.warm} size={13} weight={700} anchor="middle">Rammeverk [SiO₂]⁰</L>
            <L x="800" y="88" fill={C.fg} size={11} anchor="middle">(Tektosilikater)</L>
            <L x="800" y="106" fill={C.sand} size={10} anchor="middle">Si:O = 1:2</L>

            {/* 3D kube / nettverk */}
            <polygon points="780,135 820,135 835,150 795,150" fill="#2d4254" stroke={C.warm} strokeWidth="1" />
            <polygon points="780,135 795,150 795,185 780,170" fill="#233444" stroke={C.warm} strokeWidth="1" />
            <polygon points="795,150 835,150 835,185 795,185" fill="#1b2834" stroke={C.warm} strokeWidth="1" />

            <L x="800" y="215" fill={C.fg} size={12} weight={700} anchor="middle">Kvarts &amp; Feltspat</L>
            <L x="800" y="232" fill={C.muted} size={10} anchor="middle">Plagioklas, ortoklas</L>

            <rect x="735" y="250" width="130" height="170" rx="6" fill="#131e27" />
            <L x="745" y="272" fill={C.sand} size={10} weight={600}>Egenskaper:</L>
            <L x="745" y="290" fill={C.fg} size={9}>• Alle 4 oksygen deles!</L>
            <L x="745" y="306" fill={C.fg} size={9}>• Ekstremt sterke kovalente</L>
            <L x="745" y="322" fill={C.fg} size={9}>  bindinger i alle retninger.</L>
            <L x="745" y="338" fill={C.warm} size={9}>• Kvarts har INGEN kløv,</L>
            <L x="745" y="352" fill={C.warm} size={9}>  bare muskelbrudd (Mohs 7).</L>
            <L x="745" y="374" fill={C.cold} size={9}>• Høyeste kjemiske resistens.</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * Metamorfe facies og P-T-gradienter
 */
export function MetamorphicFaciesDiagram() {
  return (
    <Diagram
      title="Metamorfe facies: Trykk (P) og temperatur (T) i ulike geodynamiske miljøer"
      heading="Metamorfosens P-T-rom — fra grønnskifer til eklogitt"
      caption="Metamorfe facies definerer likevektssamlinger av mineraler dannet under spesifikke intervaller av trykk (dyp) og temperatur. P-T-gradienten avhenger direkte av platetektonisk regime: Subduksjonssoner (kald oseanskorpe presses raskt ned) gir høyt trykk og lav temperatur (blåskifer og eklogitt). Fjellkjedefolding og orogenese gir regionalmetamorfose (grønnskifer → amfibolitt → granulitt). Varm magma som trenger opp i kald overflateskorpe gir kontaktmetamorfose (hornfels) ved høy temperatur og lavt trykk."
      viewBox="0 0 900 480"
      wide
    >
      {() => (
        <>
          <rect x="50" y="35" width="800" height="400" rx="10" fill="#121820" stroke={C.dim} strokeWidth="1.6" />

          {/* Akser */}
          {/* Y-akse: Trykk (kbar) / Dyp (km) */}
          <line x1="120" y1="50" x2="120" y2="390" stroke={C.dim} strokeWidth="2" />
          <L x="60" y="65" fill={C.fg} size={11} weight={700}>Trykk / Dyp</L>
          <L x="110" y="70" fill={C.muted} size={10} anchor="end">12 kbar (~40 km)</L>
          <L x="110" y="160" fill={C.muted} size={10} anchor="end">8 kbar (~28 km)</L>
          <L x="110" y="260" fill={C.muted} size={10} anchor="end">4 kbar (~14 km)</L>
          <L x="110" y="375" fill={C.muted} size={10} anchor="end">0 kbar (overflate)</L>

          {/* X-akse: Temperatur (°C) */}
          <line x1="120" y1="390" x2="820" y2="390" stroke={C.dim} strokeWidth="2" />
          <L x="140" y="415" fill={C.muted} size={11}>100 °C</L>
          <L x="300" y="415" fill={C.muted} size={11}>300 °C</L>
          <L x="480" y="415" fill={C.muted} size={11}>500 °C</L>
          <L x="660" y="415" fill={C.muted} size={11}>700 °C</L>
          <L x="800" y="415" fill={C.warm} size={11} weight={700}>900 °C (Smelting)</L>

          {/* Facies-polygonfelte */}
          {/* 1. Zeolitt facies (Lav P, lav T) */}
          <polygon points="120,390 120,330 260,330 260,390" fill="#1a2e38" stroke={C.teal} strokeWidth="1" opacity="0.7" />
          <L x="190" y="365" fill={C.teal} size={12} weight={700} anchor="middle">Zeolitt</L>

          {/* 2. Hornfels facies (Lav P, høy T - kontaktmetamorfose) */}
          <polygon points="360,390 360,340 760,340 760,390" fill="#3a221b" stroke={C.warm} strokeWidth="1" opacity="0.6" />
          <L x="560" y="365" fill={C.warm} size={13} weight={700} anchor="middle">Hornfels (Kontaktmetamorfose rundt plutoner)</L>

          {/* 3. Blåskifer facies (Høy P, lav T - subduksjon) */}
          <polygon points="120,330 120,130 280,180 260,330" fill="#162e4a" stroke="#38bdf8" strokeWidth="1.4" opacity="0.8" />
          <L x="190" y="225" fill="#38bdf8" size={13} weight={800} anchor="middle">Blåskifer</L>
          <L x="190" y="242" fill={C.fg} size={10} anchor="middle">Glaukofan (subduksjon)</L>

          {/* 4. Eklogitt facies (Svært høy P, moderat T) */}
          <polygon points="120,130 120,50 420,50 360,160 280,180" fill="#20382b" stroke="#4ade80" strokeWidth="1.4" opacity="0.8" />
          <L x="260" y="100" fill="#4ade80" size={14} weight={800} anchor="middle">Eklogitt</L>
          <L x="260" y="118" fill={C.fg} size={10} anchor="middle">Omfasitt + pyropgranat (Vestlandet!)</L>

          {/* 5. Grønnskifer facies (Regionalmetamorfose - moderat P og T) */}
          <polygon points="260,330 280,180 360,160 480,240 420,340 260,340" fill="#1e3828" stroke={C.sand} strokeWidth="1.2" opacity="0.75" />
          <L x="350" y="255" fill={C.sand} size={13} weight={700} anchor="middle">Grønnskifer</L>
          <L x="350" y="272" fill={C.muted} size={10} anchor="middle">Kloritt, epidot, albitt</L>

          {/* 6. Amfibolitt facies (Regionalmetamorfose - middels til høy T og P) */}
          <polygon points="480,240 360,160 520,110 680,190 600,340 420,340" fill="#332a1e" stroke={C.low} strokeWidth="1.2" opacity="0.75" />
          <L x="520" y="220" fill={C.low} size={14} weight={700} anchor="middle">Amfibolitt</L>
          <L x="520" y="238" fill={C.fg} size={10} anchor="middle">Hornblende + plagioklas (Gneis)</L>

          {/* 7. Granulitt facies (Høy T, dyp skorpe) */}
          <polygon points="520,110 420,50 760,50 760,190 680,190" fill="#3d1f23" stroke="#f43f5e" strokeWidth="1.2" opacity="0.75" />
          <L x="640" y="115" fill="#f43f5e" size={14} weight={700} anchor="middle">Granulitt</L>
          <L x="640" y="132" fill={C.fg} size={10} anchor="middle">Pyrokser, tørr dyp skorpe (Lofoten)</L>

          {/* Smeltekurve (Anateksis / Granittisk solidus) */}
          <path d="M 620 340 Q 680 200 760 120" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
          <L x="740" y="270" fill="#ef4444" size={12} weight={800}>Granitt solidus (smelting!)</L>

          {/* Geotermale stier */}
          {/* Subduksjonssti */}
          <text x="145" y="150" fill="#38bdf8" fontSize="10" fontWeight="700" transform="rotate(-75, 145, 150)">Subduksjons-geoterm</text>

          {/* Orogen regionalmetamorf sti */}
          <path d="M 120 390 Q 320 300 560 150" fill="none" stroke={C.warm} strokeWidth="2.8" />
          <L x="420" y="180" fill={C.warm} size={11} weight={800}>Fjellkjedefolding (Kaledonsk)</L>
        </>
      )}
    </Diagram>
  );
}

export function ValleyCrossSectionDiagram() {
  return (
    <Diagram
      title="U-dal skures av is i hele tverrsnittet. V-dal graves av elva i bunnen. Fjord er U under hav."
      heading="U-dal og V-dal"
      caption="Isen skurer i hele tverrsnittet. Elva graver i bunnen. Fjord er U under hav."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <rect x="28" y="36" width="372" height="312" rx="10" fill="#152028" />
          <rect x="420" y="36" width="372" height="312" rx="10" fill="#152028" />

          <path
            d="M 48 92 H 108 C 112 160 122 220 148 248 L 280 248 C 306 220 316 160 320 92 H 380 V 328 H 48 Z"
            fill="#3a3428"
          />
          <path
            d="M 108 92 C 112 160 122 220 148 248 L 280 248 C 306 220 316 160 320 92 Q 214 76 108 92 Z"
            fill={C.cold}
            opacity="0.92"
          />
          <line
            x1="56"
            y1="186"
            x2="372"
            y2="186"
            stroke={C.white}
            strokeWidth="1.4"
            strokeDasharray="6 5"
            opacity="0.85"
          />
          <Arrow d="M 148 128 L 132 210" marker={m.cold} color={C.white} width={2} />
          <Arrow d="M 280 128 L 296 210" marker={m.cold} color={C.white} width={2} />
          <Arrow d="M 214 118 L 214 236" marker={m.cold} color={C.white} width={2.2} />

          <L x={214} y={64} fill={C.fg} size={15} anchor="middle" weight={600}>
            U-dal
          </L>
          <L x={214} y={140} fill={C.white} size={14} anchor="middle">
            is
          </L>
          <L x={368} y={178} fill={C.white} size={12} anchor="end">
            havnivå
          </L>
          <L x={214} y={312} fill={C.muted} size={13} anchor="middle">
            fjord · U under hav
          </L>

          <path d="M 440 92 H 528 L 606 268 L 684 92 H 772 V 328 H 440 Z" fill="#3a3428" />
          <path d="M 590 248 L 606 276 L 622 248 Q 606 238 590 248 Z" fill={C.teal} />
          <Arrow d="M 606 150 L 606 236" marker={m.teal} color={C.teal} width={2.4} />

          <L x={606} y={64} fill={C.fg} size={15} anchor="middle" weight={600}>
            V-dal
          </L>
          <L x={640} y={228} fill={C.teal} size={14}>
            elv
          </L>
        </>
      )}
    </Diagram>
  );
}
