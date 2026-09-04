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

export function BowenReactionSeriesDiagram() {
  return (
    <Diagram
      title="Bowens reaksjonsserie og Goldichs forvitringsstabilitet"
      heading="Magmatisk krystallisasjon og mineralenes forvitringsresistens"
      caption="Bowens reaksjonsserie viser i hvilken rekkefølge mineraler krystalliserer når en silikatmagma avkjøles. Venstre gren er diskontinuerlig (olivin → pyroksen → amfibol → biotitt), mens høyre gren er kontinuerlig (kalsiumrik → natriumrik plagioklas). Ved lav temperatur dannes kalifeltspat, muskovitt og kvarts. Goldichs forvitringsserie er den omvendte: mineraler som dannes ved høyest temperatur (olivin) er mest ustabile på overflaten, mens kvarts er ekstremt forvitringsresistent."
      viewBox="0 0 880 500"
      wide
    >
      {(m) => (
        <>
          {/* Temperatur- og tidsskala til venstre */}
          <rect x="35" y="30" width="105" height="430" rx="8" fill="#141c22" stroke={C.dim} strokeWidth="1.5" />
          <L x="87" y="55" fill={C.warm} size={14} weight={700} anchor="middle">Temperatur</L>
          <L x="87" y="78" fill={C.warm} size={15} weight={800} anchor="middle">1200 °C</L>
          <L x="87" y="96" fill={C.muted} size={11} anchor="middle">Høy temp</L>

          <Arrow d="M 87 110 L 87 390" marker={m.cold} color={C.cold} width={2.8} />

          <L x="87" y="420" fill={C.cold} size={15} weight={800} anchor="middle">600 °C</L>
          <L x="87" y="438" fill={C.muted} size={11} anchor="middle">Lav temp</L>

          {/* Kolonnetitler */}
          <L x="270" y="52" fill={C.warm} size={15} weight={700} anchor="middle">
            Diskontinuerlig serie
          </L>
          <L x="270" y="70" fill={C.muted} size={11} anchor="middle">
            (Jern- og magnesiumrike mineraler)
          </L>

          <L x="530" y="52" fill={C.teal} size={15} weight={700} anchor="middle">
            Kontinuerlig serie
          </L>
          <L x="530" y="70" fill={C.muted} size={11} anchor="middle">
            (Plagioklas / feltspater)
          </L>

          {/* Bergartstype til høyre */}
          <rect x="670" y="30" width="175" height="430" rx="8" fill="#152028" stroke={C.dim} strokeWidth="1.5" />
          <L x="757" y="52" fill={C.fg} size={14} weight={700} anchor="middle">Bergartsgrupper</L>

          {/* Diskontinuerlig gren mineralbokser */}
          {/* Olivin */}
          <rect x="180" y="95" width="180" height="45" rx="6" fill="#202a1b" stroke={C.sand} strokeWidth="1.5" />
          <L x="270" y="122" fill={C.sand} size={14} weight={700} anchor="middle">Olivin (Mg, Fe)₂SiO₄</L>

          {/* Pyroksen */}
          <rect x="180" y="165" width="180" height="45" rx="6" fill="#25241b" stroke={C.sand} strokeWidth="1.5" />
          <L x="270" y="192" fill={C.sand} size={14} weight={700} anchor="middle">Pyroksen (Augitt)</L>

          {/* Amfibol */}
          <rect x="180" y="235" width="180" height="45" rx="6" fill="#27211e" stroke={C.sand} strokeWidth="1.5" />
          <L x="270" y="262" fill={C.sand} size={14} weight={700} anchor="middle">Amfibol (Hornblende)</L>

          {/* Biotitt */}
          <rect x="180" y="305" width="180" height="45" rx="6" fill="#2a1e20" stroke={C.sand} strokeWidth="1.5" />
          <L x="270" y="332" fill={C.sand} size={14} weight={700} anchor="middle">Biotitt (mørk glimmer)</L>

          {/* Piler ned diskontinuerlig */}
          <Arrow d="M 270 140 L 270 165" marker={m.sand} color={C.sand} width={2} />
          <Arrow d="M 270 210 L 270 235" marker={m.sand} color={C.sand} width={2} />
          <Arrow d="M 270 280 L 270 305" marker={m.sand} color={C.sand} width={2} />

          {/* Kontinuerlig gren plagioklas */}
          <rect x="440" y="95" width="180" height="45" rx="6" fill="#1b2830" stroke={C.teal} strokeWidth="1.5" />
          <L x="530" y="122" fill={C.teal} size={13} weight={700} anchor="middle">Ca-rik plagioklas (Anortitt)</L>

          <rect x="440" y="200" width="180" height="45" rx="6" fill="#1b2c2e" stroke={C.teal} strokeWidth="1.5" />
          <L x="530" y="227" fill={C.teal} size={13} weight={700} anchor="middle">Ca-Na plagioklas</L>

          <rect x="440" y="305" width="180" height="45" rx="6" fill="#1b302c" stroke={C.teal} strokeWidth="1.5" />
          <L x="530" y="332" fill={C.teal} size={13} weight={700} anchor="middle">Na-rik plagioklas (Albitt)</L>

          <Arrow d="M 530 140 L 530 200" marker={m.teal} color={C.teal} width={2} />
          <Arrow d="M 530 245 L 530 305" marker={m.teal} color={C.teal} width={2} />

          {/* Felles bunn mineraler */}
          <path d="M 270 350 L 370 375" stroke={C.dim} strokeWidth="2" />
          <path d="M 530 350 L 430 375" stroke={C.dim} strokeWidth="2" />

          <rect x="290" y="375" width="220" height="30" rx="5" fill="#241e2b" stroke={C.low} strokeWidth="1.5" />
          <L x="400" y="395" fill={C.low} size={13} weight={700} anchor="middle">Kalifeltspat (Ortoklas)</L>

          <rect x="290" y="410" width="220" height="26" rx="5" fill="#20222e" stroke={C.rain} strokeWidth="1.5" />
          <L x="400" y="428" fill={C.rain} size={13} weight={700} anchor="middle">Muskovitt (lys glimmer)</L>

          <rect x="290" y="440" width="220" height="28" rx="5" fill="#1c2b35" stroke={C.cold} strokeWidth="2" />
          <L x="400" y="459" fill={C.cold} size={14} weight={800} anchor="middle">Kvarts (SiO₂)</L>

          {/* Bergarter på høyre panel */}
          {/* Ultramafisk */}
          <rect x="685" y="85" width="145" height="60" rx="5" fill="#1b241c" stroke="#3d5e3c" strokeWidth="1" />
          <L x="757" y="106" fill="#78b078" size={13} weight={700} anchor="middle">Ultramafisk</L>
          <L x="757" y="126" fill={C.muted} size={11} anchor="middle">Peridotitt · Komatiitt</L>

          {/* Mafisk */}
          <rect x="685" y="165" width="145" height="60" rx="5" fill="#24221c" stroke="#70623d" strokeWidth="1" />
          <L x="757" y="186" fill={C.sand} size={13} weight={700} anchor="middle">Mafisk (basisk)</L>
          <L x="757" y="206" fill={C.muted} size={11} anchor="middle">Gabbro · Basalt</L>

          {/* Intermediær */}
          <rect x="685" y="245" width="145" height="60" rx="5" fill="#20252b" stroke="#486078" strokeWidth="1" />
          <L x="757" y="266" fill={C.teal} size={13} weight={700} anchor="middle">Intermediær</L>
          <L x="757" y="286" fill={C.muted} size={11} anchor="middle">Dioritt · Andesitt</L>

          {/* Felsisk */}
          <rect x="685" y="325" width="145" height="120" rx="5" fill="#2b1f24" stroke="#8a4d65" strokeWidth="1" />
          <L x="757" y="352" fill={C.warm} size={13} weight={700} anchor="middle">Felsisk (sur)</L>
          <L x="757" y="372" fill={C.fg} size={12} anchor="middle">Granitt · Ryolitt</L>
          <L x="757" y="405" fill={C.cold} size={11} weight={700} anchor="middle">Høyest SiO₂ (&gt;65 %)</L>
          <L x="757" y="425" fill={C.cold} size={11} anchor="middle">Mest forvitringsstabil!</L>
        </>
      )}
    </Diagram>
  );
}

export function HjulstromDiagram() {
  return (
    <Diagram
      title="Hjulstrøms diagram: sammenheng mellom strømhastighet og sedimenttransport"
      heading="Erosjon, transport og sedimentasjon i rennende vann"
      caption="Hjulstrøms diagram viser hvilken vannhastighet som kreves for å erodere, transportere eller avsette partikler av ulike kornstørrelser. Merk leirparadokset: På grunn av kohesjon (elektrostatisk tiltrekning mellom leirmineraler) krever leire høyere strømhastighet for å eroderes enn sand! Sandkorn (0,2–0,5 mm) eroderes lettest ved rundt 20 cm/s. Når strømhastigheten avtar, faller partiklene ut i sedimentasjonssonen etter størrelse."
      viewBox="0 0 880 480"
      wide
    >
      {() => (
        <>
          {/* Koordinatramme */}
          <rect x="70" y="40" width="760" height="370" rx="8" fill="#121a22" stroke={C.dim} strokeWidth="1.6" />

          {/* Sone 1: Erosjon (øverst) */}
          <path
            d="M 70 40 L 830 40 L 830 110 L 730 140 L 580 200 L 440 240 L 320 230 L 220 180 L 150 120 L 70 85 Z"
            fill="#3a1b1b"
            opacity="0.65"
          />

          {/* Sone 2: Transport (i midten) */}
          <path
            d="M 70 85 L 150 120 L 220 180 L 320 230 L 440 240 L 580 200 L 730 140 L 830 110 L 830 280 L 730 310 L 580 340 L 440 360 L 300 375 L 70 405 Z"
            fill="#2c2a1b"
            opacity="0.6"
          />

          {/* Sone 3: Sedimentasjon (nederst) */}
          <path
            d="M 70 405 L 300 375 L 440 360 L 580 340 L 730 310 L 830 280 L 830 410 L 70 410 Z"
            fill="#142c26"
            opacity="0.65"
          />

          {/* Kurve 1: Kritisk erosjonshastighet */}
          <path
            d="M 70 85 Q 150 120 220 180 Q 320 235 440 240 Q 580 200 730 140 L 830 110"
            fill="none"
            stroke={C.warm}
            strokeWidth="3.2"
          />

          {/* Kurve 2: Sedimentasjonshastighet */}
          <path
            d="M 70 405 Q 300 375 440 360 Q 580 340 730 310 L 830 280"
            fill="none"
            stroke={C.teal}
            strokeWidth="2.8"
            strokeDasharray="6 4"
          />

          {/* Tekster i sonene */}
          <L x="480" y="90" fill={C.warm} size={20} weight={800} anchor="middle">
            EROSJONSSONE
          </L>
          <L x="480" y="112" fill={C.sand} size={12} anchor="middle">
            Partikler rives løs fra bunnen og settes i bevegelse
          </L>

          <L x="480" y="275" fill="#edd08e" size={20} weight={800} anchor="middle">
            TRANSPORZONE
          </L>
          <L x="480" y="296" fill={C.fg} size={12} anchor="middle">
            Partikler holdes i bevegelse (suspensjon eller bunntransport)
          </L>

          <L x="480" y="382" fill={C.teal} size={18} weight={800} anchor="middle">
            SEDIMENTASJONSSONE
          </L>
          <L x="480" y="400" fill={C.muted} size={12} anchor="middle">
            Partiklene faller til bunns og avsettes
          </L>

          {/* Kohesjon og sand-merknader */}
          {/* Kohesjon leire */}
          <rect x="85" y="105" width="130" height="50" rx="5" fill="#1b252d" stroke={C.warm} strokeWidth="1.2" />
          <L x="150" y="124" fill={C.warm} size={11} weight={700} anchor="middle">
            Kohesjonseffekt!
          </L>
          <L x="150" y="142" fill={C.fg} size={10} anchor="middle">
            Elektrostatisk binding
          </L>

          {/* Letteste erosjon ved sand */}
          <rect x="360" y="195" width="150" height="38" rx="5" fill="#1b252d" stroke={C.sand} strokeWidth="1.2" />
          <L x="435" y="212" fill={C.sand} size={11} weight={700} anchor="middle">
            Eroderes lettest (~20 cm/s)
          </L>
          <L x="435" y="226" fill={C.muted} size={10} anchor="middle">
            Middels sand (0,2–0,5 mm)
          </L>

          {/* Y-akse: Strømhastighet (cm/s) */}
          <L x="25" y="50" fill={C.fg} size={12} weight={700}>cm/s</L>
          <L x="60" y="55" fill={C.muted} size={11} anchor="end">1000</L>
          <L x="60" y="130" fill={C.muted} size={11} anchor="end">100</L>
          <L x="60" y="225" fill={C.muted} size={11} anchor="end">10</L>
          <L x="60" y="320" fill={C.muted} size={11} anchor="end">1,0</L>
          <L x="60" y="410" fill={C.muted} size={11} anchor="end">0,1</L>

          {/* X-akse inndeling (Kornstørrelser) */}
          {/* Skillelinjer vertikalt */}
          <line x1="210" y1="40" x2="210" y2="410" stroke={C.dim} strokeDasharray="3 3" />
          <line x1="370" y1="40" x2="370" y2="410" stroke={C.dim} strokeDasharray="3 3" />
          <line x1="590" y1="40" x2="590" y2="410" stroke={C.dim} strokeDasharray="3 3" />
          <line x1="750" y1="40" x2="750" y2="410" stroke={C.dim} strokeDasharray="3 3" />

          {/* Kategori-etiketter nederst på X-aksen */}
          <L x="140" y="432" fill={C.fg} size={13} weight={700} anchor="middle">Leire</L>
          <L x="140" y="448" fill={C.muted} size={10} anchor="middle">&lt; 0,002 mm</L>

          <L x="290" y="432" fill={C.fg} size={13} weight={700} anchor="middle">Silt</L>
          <L x="290" y="448" fill={C.muted} size={10} anchor="middle">0,002–0,063 mm</L>

          <L x="480" y="432" fill={C.sand} size={14} weight={800} anchor="middle">Sand</L>
          <L x="480" y="448" fill={C.muted} size={10} anchor="middle">0,063–2 mm</L>

          <L x="670" y="432" fill={C.fg} size={13} weight={700} anchor="middle">Grus</L>
          <L x="670" y="448" fill={C.muted} size={10} anchor="middle">2–64 mm</L>

          <L x="790" y="432" fill={C.fg} size={13} weight={700} anchor="middle">Stein / Blokk</L>
          <L x="790" y="448" fill={C.muted} size={10} anchor="middle">&gt; 64 mm</L>

          <L x="480" y="470" fill={C.muted} size={12} weight={600} anchor="middle">
            Kornstørrelse (logaritmisk skala) →
          </L>
        </>
      )}
    </Diagram>
  );
}

