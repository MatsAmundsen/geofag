import { Arrow, C, Diagram, L } from "./svg-kit";

export function RelativeDatingDiagram() {
  return (
    <Diagram
      title="Prinsipper for relativ datering: superposisjon, krysskjæring og inklusjoner"
      heading="Relativ datering: tre geologiske prinsipper"
      caption="Superposisjon: Eldste sedimentlag ligger nederst. Krysskjæring: En intrusjon eller forkastning er alltid yngre enn bergartene den skjærer gjennom. Inklusjon: Fragmenter (xenolitter) inni en bergart er eldre enn vertsbjergarten."
      viewBox="0 0 900 480"
      wide
    >
      {(m) => (
        <>
          {/* Bakgrunnsramme for geologisk profil */}
          <rect x="50" y="40" width="800" height="340" rx="10" fill="#141d24" stroke={C.dim} strokeWidth="1.5" />

          {/* Sedimentlag A - eldst (nederst) */}
          <path d="M 50 310 L 480 310 L 510 380 L 50 380 Z" fill="#252420" />
          <path d="M 570 340 L 850 340 L 850 380 L 530 380 Z" fill="#252420" />
          <L x="120" y="352" fill={C.sand} size={15} weight={700}>Lag A (Kambrium)</L>
          <L x="120" y="370" fill={C.muted} size={12}>Skifer · Eldst i lagrekken</L>

          {/* Sedimentlag B */}
          <path d="M 50 230 L 440 230 L 480 310 L 50 310 Z" fill="#1b2a32" />
          <path d="M 610 260 L 850 260 L 850 340 L 570 340 Z" fill="#1b2a32" />
          <L x="120" y="272" fill={C.teal} size={15} weight={700}>Lag B (Ordovicium)</L>
          <L x="120" y="290" fill={C.muted} size={12}>Kalkstein med fossiler</L>

          {/* Sedimentlag C */}
          <path d="M 50 150 L 400 150 L 440 230 L 50 230 Z" fill="#28221d" />
          <path d="M 650 180 L 850 180 L 850 260 L 610 260 Z" fill="#28221d" />
          <L x="120" y="192" fill={C.warm} size={15} weight={700}>Lag C (Silur)</L>
          <L x="120" y="210" fill={C.muted} size={12}>Sandstein</L>

          {/* Sedimentlag D - yngst (øverst) */}
          <path d="M 50 70 L 360 70 L 400 150 L 50 150 Z" fill="#1e2d27" />
          <path d="M 690 100 L 850 100 L 850 180 L 650 180 Z" fill="#1e2d27" />
          <L x="120" y="112" fill={C.rain} size={15} weight={700}>Lag D (Devon)</L>
          <L x="120" y="130" fill={C.muted} size={12}>Konglomerat · Yngst i sedimentene</L>

          {/* Normalforkastning F (skråner og forskyver høyre blokk ned) */}
          <line x1="420" y1="50" x2="570" y2="380" stroke={C.low} strokeWidth="3" strokeDasharray="6 4" />
          <L x="490" y="75" fill={C.low} size={13} weight={700}>Forkastningssone F</L>
          <L x="490" y="92" fill={C.muted} size={11}>Kutter A, B, C, D → yngre enn sedimentene</L>
          {/* Forkastningsbevegelse piler */}
          <Arrow d="M 400 240 L 420 280" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 590 270 L 610 310" marker={m.low} color={C.low} width={2.4} />

          {/* Magmatisk gang / intrusjon E som skjærer gjennom forkastningen og lagene */}
          <path d="M 720 50 L 760 50 L 740 380 L 700 380 Z" fill="#3d1e1e" stroke={C.warm} strokeWidth="1.8" />
          <L x="730" y="75" fill={C.warm} size={14} weight={700} anchor="middle">Intrusjon E</L>
          <L x="730" y="93" fill={C.fg} size={11} anchor="middle">Diabasgang</L>
          <L x="730" y="110" fill={C.muted} size={10} anchor="middle">Kutter lag og forkastning</L>

          {/* Inklusjoner / xenolitter av Lag B inni intrusjon E */}
          <polygon points="715,220 735,215 730,230 710,228" fill="#1b2a32" stroke={C.teal} strokeWidth="1.2" />
          <polygon points="720,245 745,240 738,255 718,252" fill="#1b2a32" stroke={C.teal} strokeWidth="1.2" />
          <L x="750" y="235" fill={C.teal} size={12} weight={600}>Xenolitt (fra lag B)</L>
          <L x="750" y="250" fill={C.muted} size={10}>Inklusjon er eldre enn magmaet</L>

          {/* Pedagogiske forklarende prinsipp-bokser nederst */}
          <g>
            <rect x="50" y="395" width="250" height="70" rx="8" fill="#16232c" stroke={C.sand} strokeWidth="1.2" />
            <L x="64" y="418" fill={C.sand} size={13} weight={700}>1. Superposisjonsprinsippet</L>
            <L x="64" y="438" fill={C.fg} size={12}>Lag A er eldst, deretter B, C og D.</L>
            <L x="64" y="454" fill={C.muted} size={11}>Uforstyrrede lag avsettes alltid oppå hverandre.</L>
          </g>

          <g>
            <rect x="325" y="395" width="250" height="70" rx="8" fill="#16232c" stroke={C.low} strokeWidth="1.2" />
            <L x="339" y="418" fill={C.low} size={13} weight={700}>2. Krysskjæringsprinsippet</L>
            <L x="339" y="438" fill={C.fg} size={12}>Forkastning F er yngre enn lagene den bryter.</L>
            <L x="339" y="454" fill={C.muted} size={11}>Gangen E kutter forkastningen → E er yngst.</L>
          </g>

          <g>
            <rect x="600" y="395" width="250" height="70" rx="8" fill="#16232c" stroke={C.teal} strokeWidth="1.2" />
            <L x="614" y="418" fill={C.teal} size={13} weight={700}>3. Inklusjonsprinsippet</L>
            <L x="614" y="438" fill={C.fg} size={12}>Bruddstykkene av lag B inni gang E</L>
            <L x="614" y="454" fill={C.muted} size={11}>måtte eksistere før gangen størknet rundt dem.</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function GrainSizeDistributionDiagram() {
  return (
    <Diagram
      title="Kornstørrelser og sortering i geofag: fra leire til blokk, og usortert morene mot sortert elveavsetning"
      heading="Kornfordeling og sortering"
      caption="Kornstørrelse måles i millimeter og forteller om energien i transportmediet. Rennende vann og vind sorterer partikler etter vekt, mens en isbre transporterer alt sammen og avsetter usortert morene."
      viewBox="0 0 900 440"
      wide
    >
      {() => (
        <>
          {/* Øvre seksjon: Kornstørrelseskala (Udden-Wentworth) */}
          <rect x="40" y="30" width="820" height="150" rx="10" fill="#141f27" stroke={C.dim} strokeWidth="1.5" />
          <L x="60" y="55" fill={C.teal} size={15} weight={700}>Klassifisering etter kornstørrelse (ISO / NGU-standard)</L>

          {/* 4 kolonner for kornklasser */}
          {/* 1. Leir */}
          <g>
            <rect x="60" y="70" width="185" height="95" rx="8" fill="#1a2b35" stroke={C.cold} strokeWidth="1.2" />
            <L x="75" y="94" fill={C.cold} size={15} weight={700}>Leir (leire)</L>
            <L x="75" y="114" fill={C.fg} size={12}>Under 0,002 mm (2 µm)</L>
            <L x="75" y="132" fill={C.muted} size={11}>Plater av fyllosilikater</L>
            <L x="75" y="148" fill={C.sand} size={11}>Svever i rolig vann / innsjø</L>
          </g>

          {/* 2. Silt */}
          <g>
            <rect x="260" y="70" width="185" height="95" rx="8" fill="#1a282f" stroke={C.rain} strokeWidth="1.2" />
            <L x="275" y="94" fill={C.rain} size={15} weight={700}>Silt (mo / mjele)</L>
            <L x="275" y="114" fill={C.fg} size={12}>0,002 – 0,063 mm</L>
            <L x="275" y="132" fill={C.muted} size={11}>Finkornet mel, kvartsrik</L>
            <L x="275" y="148" fill={C.sand} size={11}>Frakter i svak strøm / vind (løss)</L>
          </g>

          {/* 3. Sand */}
          <g>
            <rect x="460" y="70" width="185" height="95" rx="8" fill="#25241e" stroke={C.sand} strokeWidth="1.2" />
            <L x="475" y="94" fill={C.sand} size={15} weight={700}>Sand</L>
            <L x="475" y="114" fill={C.fg} size={12}>0,063 – 2,0 mm</L>
            <L x="475" y="132" fill={C.muted} size={11}>Fin-, medium- og grovsand</L>
            <L x="475" y="148" fill={C.warm} size={11}>Elveleier, strender, sanddyner</L>
          </g>

          {/* 4. Grus, stein og blokk */}
          <g>
            <rect x="660" y="70" width="185" height="95" rx="8" fill="#29201c" stroke={C.warm} strokeWidth="1.2" />
            <L x="675" y="94" fill={C.warm} size={15} weight={700}>Grus, stein, blokk</L>
            <L x="675" y="114" fill={C.fg} size={12}>Grus: 2–64 mm · Blokk &gt;64 mm</L>
            <L x="675" y="132" fill={C.muted} size={11}>Høy strømenergi kreves</L>
            <L x="675" y="148" fill={C.low} size={11}>Fjellbekker, jettegryter, morener</L>
          </g>

          {/* Nedre seksjon: Sortering - Morene vs Elvegrus */}
          {/* Venstre panel: Usortert morenemateriale */}
          <g>
            <rect x="40" y="200" width="400" height="215" rx="10" fill="#171e23" stroke={C.low} strokeWidth="1.4" />
            <L x="60" y="228" fill={C.low} size={16} weight={700}>Usortert jordart: Bunnmorene</L>
            <L x="60" y="248" fill={C.muted} size={12}>Avsatt direkte av isbre uten medvirkning av rennende vann</L>

            {/* Illustrasjon av kaotisk blanding */}
            <rect x="60" y="260" width="360" height="105" rx="8" fill="#12181d" />
            {/* Store kantete blokker */}
            <polygon points="85,280 125,275 140,310 95,325" fill="#3a4a54" stroke={C.muted} strokeWidth="1.5" />
            <polygon points="260,290 310,270 330,315 285,335" fill="#3a4a54" stroke={C.muted} strokeWidth="1.5" />
            {/* Steiner og grus */}
            <circle cx="170" cy="285" r="14" fill="#586772" />
            <circle cx="215" cy="320" r="18" fill="#586772" />
            <circle cx="360" cy="290" r="12" fill="#586772" />
            {/* Sand og leirmatriks */}
            <circle cx="145" cy="335" r="5" fill={C.sand} />
            <circle cx="190" cy="300" r="4" fill={C.sand} />
            <circle cx="240" cy="275" r="6" fill={C.sand} />
            <circle cx="330" cy="340" r="5" fill={C.sand} />
            <circle cx="375" cy="325" r="4" fill={C.sand} />
            <text x="60" y="388" fill={C.fg} fontSize={12} fontFamily="inherit">
              • Kaotisk kornfordeling: leire, silt, sand og svære blokker i én masse.
            </text>
            <text x="60" y="404" fill={C.muted} fontSize={11} fontFamily="inherit">
              • Kantrundede til skarpkantede korn, ofte med skuringsstriper.
            </text>
          </g>

          {/* Høyre panel: Godt sortert elveavsetning */}
          <g>
            <rect x="460" y="200" width="400" height="215" rx="10" fill="#171e23" stroke={C.teal} strokeWidth="1.4" />
            <L x="480" y="228" fill={C.teal} size={16} weight={700}>Sortert jordart: Elveavsetning / strand</L>
            <L x="480" y="248" fill={C.muted} size={12}>Avsatt av rennende vann med jevn vannhastighet</L>

            {/* Illustrasjon av ensartet sortert lag */}
            <rect x="480" y="260" width="360" height="105" rx="8" fill="#12181d" />
            {/* Lagdeling og avrundede korn av nesten samme størrelse */}
            <ellipse cx="520" cy="285" rx="16" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="560" cy="285" rx="15" ry="11" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="600" cy="285" rx="17" ry="13" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="640" cy="285" rx="15" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="680" cy="285" rx="16" ry="11" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="720" cy="285" rx="15" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="760" cy="285" rx="17" ry="13" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />

            <ellipse cx="500" cy="315" rx="15" ry="11" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="540" cy="315" rx="17" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="580" cy="315" rx="16" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="620" cy="315" rx="15" ry="11" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="660" cy="315" rx="16" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="700" cy="315" rx="17" ry="13" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="740" cy="315" rx="15" ry="11" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />
            <ellipse cx="780" cy="315" rx="16" ry="12" fill={C.sand} stroke="#9e8e72" strokeWidth="1.2" />

            <text x="480" y="388" fill={C.fg} fontSize={12} fontFamily="inherit">
              • Homogen kornstørrelse: vannet har skylt vekk finere leire/silt.
            </text>
            <text x="480" y="404" fill={C.muted} fontSize={11} fontFamily="inherit">
              • Godt avrundede korn slipt mot hverandre under transport.
            </text>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function FieldworkIllustrationDiagram() {
  return (
    <Diagram
      title="Feltarbeid i geofag: verktøy, observasjoner og registrering ved geologisk blotning"
      heading="Feltmetodikk: observasjon og måling ved blotning"
      caption="Feltarbeid kobler teori til virkelighet. Ved en blotning registreres bergartsidentifikasjon, lagdeling, orientering (strøk og fall med geologkompass) og nøyaktige GPS-koordinater med usikkerhet i feltboka."
      viewBox="0 0 900 380"
      wide
    >
      {(m) => (
        <>
          {/* Venstre panel: Geologisk blotning med geologverktøy */}
          <rect x="40" y="30" width="460" height="320" rx="10" fill="#131c22" stroke={C.dim} strokeWidth="1.5" />

          {/* Skråstilte sedimentlag i fjellvegg / blotning */}
          <path d="M 50 290 L 320 120 L 490 120 L 490 340 L 50 340 Z" fill="#1f2c35" stroke={C.teal} strokeWidth="1.5" />
          <path d="M 50 230 L 320 60 L 490 60 L 490 120 L 320 120 L 50 290 Z" fill="#2c271e" stroke={C.sand} strokeWidth="1.5" />
          <path d="M 50 170 L 260 40 L 490 40 L 490 60 L 320 60 L 50 230 Z" fill="#202a24" stroke={C.warm} strokeWidth="1.5" />

          {/* Vinkelindikator for lagdeling (Fallvinkel 32°) */}
          <path d="M 120 245 A 40 40 0 0 0 150 228" fill="none" stroke={C.low} strokeWidth="2.5" />
          <L x="160" y="244" fill={C.low} size={14} weight={700}>Fall: 32° SØ</L>
          <L x="160" y="260" fill={C.muted} size={11}>Målt med klinometer</L>

          {/* Kompass / måling illustrasjon */}
          <circle cx="340" cy="220" r="38" fill="#15242c" stroke={C.teal} strokeWidth="2" />
          <line x1="340" y1="185" x2="340" y2="255" stroke={C.dim} strokeDasharray="3 3" />
          <line x1="305" y1="220" x2="375" y2="220" stroke={C.dim} strokeDasharray="3 3" />
          <polygon points="340,190 346,220 334,220" fill={C.low} />
          <polygon points="340,250 346,220 334,220" fill={C.fg} />
          <L x="340" y="275" fill={C.teal} size={12} weight={700} anchor="middle">Geologkompass</L>

          {/* GPS-punkt merke */}
          <circle cx="200" cy="110" r="8" fill={C.low} />
          <circle cx="200" cy="110" r="16" fill="none" stroke={C.low} strokeWidth="1.5" strokeDasharray="4 3" />
          <L x="218" y="105" fill={C.low} size={13} weight={700}>GPS Stasjon 1</L>
          <L x="218" y="120" fill={C.muted} size={11}>61,002°N 8,511°Ø (±3 m)</L>

          {/* Høyre panel: Sjekkliste og dataflyt i felt */}
          <rect x="520" y="30" width="340" height="320" rx="10" fill="#141f27" stroke={C.dim} strokeWidth="1.5" />
          <L x="540" y="58" fill={C.warm} size={16} weight={700}>Feltmetodikk · 4 nøkkelsteg</L>

          {/* Steg 1 */}
          <g>
            <rect x="540" y="74" width="300" height="54" rx="6" fill="#1b2832" stroke={C.teal} strokeWidth="1" />
            <L x="554" y="94" fill={C.teal} size={13} weight={700}>1. Lokalisering & bergart</L>
            <L x="554" y="112" fill={C.muted} size={11}>GPS-koordinat, værforhold, farge, kornstørrelse og mineraler</L>
          </g>

          {/* Steg 2 */}
          <g>
            <rect x="540" y="136" width="300" height="54" rx="6" fill="#1b2832" stroke={C.sand} strokeWidth="1" />
            <L x="554" y="156" fill={C.sand} size={13} weight={700}>2. Strukturmålinger</L>
            <L x="554" y="174" fill={C.muted} size={11}>Strøk og fall på lagflater, forkastninger og sprekkesystemer</L>
          </g>

          {/* Steg 3 */}
          <g>
            <rect x="540" y="198" width="300" height="54" rx="6" fill="#1b2832" stroke={C.warm} strokeWidth="1" />
            <L x="554" y="218" fill={C.warm} size={13} weight={700}>3. Skisse & profil</L>
            <L x="554" y="236" fill={C.muted} size={11}>Tegn feltprofil med målestokk, nordpil og relative lagkontakter</L>
          </g>

          {/* Steg 4 */}
          <g>
            <rect x="540" y="260" width="300" height="54" rx="6" fill="#1b2832" stroke={C.rain} strokeWidth="1" />
            <L x="554" y="280" fill={C.rain} size={13} weight={700}>4. Prøvetaking & usikkerhet</L>
            <L x="554" y="298" fill={C.muted} size={11}>Merk prøveposer med ID; noter måleusikkerhet på GPS og kompass</L>
          </g>

          <L x="540" y="336" fill={C.fg} size={11} weight={600}>
            HMS i felt: Hjelm ved bratt fjell, refleksvest ved vei, sjekk tidevann.
          </L>
        </>
      )}
    </Diagram>
  );
}
