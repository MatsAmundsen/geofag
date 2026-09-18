import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. Glasiale landformer: U-daler, fjorder, botner, tinder, egger, morener og eskere
 */
export function GlacialLandformsDiagram() {
  return (
    <Diagram
      title="Glasiale landformer: Alpine og kontinentale former skapt av isbreenes erosjon og avsetning"
      heading="Det glasiale landskapet — isbreens mektige arkitektur"
      caption="Isbreer er naturens mest kraftfulle geomorfologiske erosjonsagenter. Gjennom frostforvitring, plukking (isbreen fryser fast i steinblokker og river dem løs) og skuring (stein i brebånn riper og polerer fjellet) omdannes landskapet. Alpine breer skaper sylskarpe tinder, egger og botner. Dalbreer graver dype U-daler og fjorder med terskler og hengedaler, mens breens framstøt og smelting etterlater usorterte morener, drumlins og smeltevannsskapte eskere."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          {/* Hovedbakgrunn / himmel */}
          <rect x="30" y="30" width="880" height="460" rx="12" fill="#121b22" stroke={C.dim} strokeWidth="1.6" />

          {/* Bakgrunnsfjell: Tind (Horn) og Egg (Arête) */}
          {/* Tind (Matterhorn-form) */}
          <polygon points="120,70 190,190 60,190" fill="#222f3a" stroke={C.fg} strokeWidth="1.2" />
          <polygon points="120,70 145,190 190,190" fill="#1a252e" />
          {/* Snø og is på tinden */}
          <polygon points="120,70 135,110 112,110" fill="#e8f3f8" opacity="0.9" />

          {/* Egg / Arête (skarp rygg mellom to botner) */}
          <path d="M 120 70 L 260 130 L 380 180" fill="none" stroke={C.cold} strokeWidth="2.5" />
          <path d="M 120 70 L 260 130 L 260 210 L 190 190 Z" fill="#283540" />

          {/* Botn (Cirque) med botnbre og botnsjø (Tarn) */}
          <path d="M 260 130 C 270 200, 340 220, 380 200 C 400 160, 390 140, 380 130 Z" fill="#182730" stroke={C.teal} strokeWidth="1.4" />
          {/* Botnbre og innsjø */}
          <ellipse cx="320" cy="180" rx="45" ry="18" fill="#58c4dc" opacity="0.8" />
          <L x="320" y="160" fill={C.teal} size={13} weight={700} anchor="middle">Botn (Cirque) &amp; tjern</L>

          {/* Hengedal (Hanging Valley) med foss */}
          <path d="M 380 180 L 480 200 L 480 270 L 430 270 Z" fill="#202b33" stroke={C.dim} strokeWidth="1" />
          <line x1="480" y1="205" x2="480" y2="285" stroke="#7dd3fc" strokeWidth="2.8" strokeDasharray="4 2" />
          <L x="495" y="240" fill="#7dd3fc" size={12} weight={700}>Hengedal &amp; foss</L>

          {/* Hoved U-dal og Fjordtverrsnitt */}
          {/* Venstre dalside */}
          <path d="M 60 190 L 180 340 L 240 420 L 700 420 L 780 330 L 900 180 L 900 480 L 40 480 Z" fill="#2a251e" />
          
          {/* U-dal bunn og fjordvann med terskel */}
          {/* Fjordbasseng (overfordypning) */}
          <path d="M 240 320 C 300 440, 580 440, 680 320 Z" fill="#113245" stroke={C.teal} strokeWidth="1.5" />
          {/* Fjordvann speil */}
          <rect x="235" y="320" width="450" height="15" fill="#38bdf8" opacity="0.6" />
          <L x="460" y="315" fill="#38bdf8" size={13} weight={700} anchor="middle">Fjord (overfordypet U-dal under havnivå)</L>

          {/* Grunn terskel ytterst i fjorden */}
          <path d="M 660 320 Q 690 350 720 320 Z" fill="#44392b" stroke={C.sand} strokeWidth="1.4" />
          <L x="690" y="365" fill={C.sand} size={11} weight={700} anchor="middle">Fjordterskel (berg/morene)</L>

          {/* Dalsider med isskuring */}
          <line x1="160" y1="270" x2="210" y2="330" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="175" y1="260" x2="225" y2="320" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 3" />
          <L x="140" y="280" fill={C.cold} size={12} weight={700}>Skuringsstriper</L>

          {/* Moreneavsetninger nede i dalen */}
          {/* 1. Bunnmorene */}
          <rect x="270" y="425" width="220" height="24" rx="4" fill="#382e22" stroke={C.sand} strokeWidth="1" />
          <L x="380" y="441" fill={C.sand} size={11} weight={600} anchor="middle">Bunnmorene (usortert blokkleire/till)</L>

          {/* 2. Sidemorene */}
          <polygon points="190,340 230,340 215,315" fill="#4a3e2c" stroke={C.sand} strokeWidth="1.2" />
          <L x="165" y="335" fill={C.sand} size={11} weight={700}>Sidemorene</L>

          {/* 3. Endemorene (Raet-type) */}
          <polygon points="560,420 620,420 590,370" fill="#524430" stroke={C.warm} strokeWidth="1.6" />
          <L x="590" y="362" fill={C.warm} size={12} weight={700} anchor="middle">Endemorene (Ra-rygg)</L>

          {/* 4. Drumlin (strømlinjeformet hvalskrott) */}
          <ellipse cx="760" cy="400" rx="35" ry="14" fill="#3d3326" stroke={C.sand} strokeWidth="1.2" />
          <Arrow d="M 720 400 L 800 400" marker={m.sand} color={C.sand} width={1.8} />
          <L x="760" y="396" fill={C.sand} size={11} weight={700} anchor="middle">Drumlin</L>
          <L x="760" y="425" fill={C.muted} size={10} anchor="middle">Isbevegelse →</L>

          {/* 5. Esker (slangeformet smeltevannsrygg) */}
          <path d="M 800 440 Q 820 425 840 435 T 880 430" fill="none" stroke={C.rain} strokeWidth="4.5" />
          <L x="840" y="456" fill={C.rain} size={11} weight={700} anchor="middle">Esker (smeltevannselv)</L>

          {/* Annotasjon for Tind / Horn øverst */}
          <L x="120" y="55" fill={C.warm} size={14} weight={800} anchor="middle">Tind / Horn</L>
          <L x="260" y="115" fill={C.cold} size={13} weight={700} anchor="middle">Egg (Arête)</L>

          {/* Pedagogiske bokser i bunnen */}
          <g>
            <rect x="45" y="455" width="260" height="26" rx="4" fill="#17222a" stroke={C.teal} strokeWidth="1" />
            <L x="55" y="472" fill={C.teal} size={11} weight={700}>U-dal: Bratt dalside, flat bunn, iserodert</L>
          </g>
          <g>
            <rect x="320" y="455" width="280" height="26" rx="4" fill="#17222a" stroke={C.warm} strokeWidth="1" />
            <L x="330" y="472" fill={C.warm} size={11} weight={700}>Endemorene: Marker breens maksimale fremstøt</L>
          </g>
          <g>
            <rect x="615" y="455" width="280" height="26" rx="4" fill="#17222a" stroke={C.cold} strokeWidth="1" />
            <L x="625" y="472" fill={C.cold} size={11} weight={700}>Plukking &amp; skuring: Breens to erosjonsprosesser</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. Fluviale landformer: V-dal, canyon, meandere, kroksjø og elvedelta
 */
export function FluvialErosionDepositionDiagram() {
  return (
    <Diagram
      title="Fluviale landformer: Fra bratte elvegjel i fjellet til meandrerende elver og lagdelte deltaer"
      heading="Det fluviale systemet — elvens arbeid fra kilde til munning"
      caption="Rennende vann er den viktigste overflateformeren i isfrie perioder. I øvre løp med stort fall graver elva vertikalt og danner trange gjel (canyons) og V-daler der rasskrentene sklir ned. I midtre og nedre løp med lavt fall dominerer sidesveis erosjon og meandere: Vannet renner raskest i yttersvingen (helikoidal strøm som graver elveskrenter) og saktest i innersvingen (avsetter sand- og grusører). Ved flom kuttes meandersvinger og danner kroksjøer. Ved munningen bremses vannet opp og bygger et Gilbert-delta med horisontale topplag, skråstilte forlag og finkornede bunnlag."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          {/* Ramme */}
          <rect x="30" y="30" width="880" height="440" rx="12" fill="#131b22" stroke={C.dim} strokeWidth="1.6" />

          {/* Seksjon 1: V-dal vs Canyon (venstre, x: 50-320) */}
          <rect x="45" y="45" width="270" height="240" rx="8" fill="#18232c" stroke={C.warm} strokeWidth="1.2" />
          <L x="60" y="70" fill={C.warm} size={14} weight={700}>1. Øvre elveløp: V-dal &amp; Canyon</L>

          {/* V-dal profil */}
          <path d="M 60 90 L 120 180 L 180 90" fill="none" stroke={C.sand} strokeWidth="2.5" />
          {/* Elv i bunnen */}
          <circle cx="120" cy="180" r="5" fill="#38bdf8" />
          <L x="120" y="115" fill={C.fg} size={12} weight={600} anchor="middle">V-dal</L>
          <L x="120" y="132" fill={C.muted} size={10} anchor="middle">Bunnerosjon + skråningsras</L>
          <Arrow d="M 90 120 L 110 160" marker={m.sand} color={C.sand} width={1.5} />
          <Arrow d="M 150 120 L 130 160" marker={m.sand} color={C.sand} width={1.5} />

          {/* Canyon / Gjel profil (vertikale vegger) */}
          <path d="M 210 90 L 235 90 L 235 180 L 265 180 L 265 90 L 290 90" fill="none" stroke={C.cold} strokeWidth="2.5" />
          <rect x="235" y="174" width="30" height="8" fill="#38bdf8" />
          <L x="250" y="115" fill={C.cold} size={12} weight={600} anchor="middle">Canyon (gjel)</L>
          <L x="250" y="132" fill={C.muted} size={10} anchor="middle">Hard bergart, ren bunngraving</L>
          <L x="250" y="150" fill={C.teal} size={10} anchor="middle">Jettegryter (evorsjon)</L>

          <L x="60" y="225" fill={C.sand} size={11} weight={600}>Høy gradient (fall) og strømhastighet.</L>
          <L x="60" y="242" fill={C.muted} size={10}>Transporterer grov grus, stein og blokk.</L>
          <L x="60" y="260" fill={C.teal} size={10}>Mekanisk slitasje: rulling og saltasjon.</L>

          {/* Seksjon 2: Meander og Kroksjø (midten, x: 330-610) */}
          <rect x="330" y="45" width="270" height="240" rx="8" fill="#18232c" stroke={C.teal} strokeWidth="1.2" />
          <L x="345" y="70" fill={C.teal} size={14} weight={700}>2. Midtre løp: Meander &amp; Kroksjø</L>

          {/* Meandersving SVG */}
          <path
            d="M 350 110 C 430 110, 430 170, 370 180 C 330 185, 330 230, 420 235"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Yttersving (Cut bank / erosjon) */}
          <circle cx="432" cy="140" r="4" fill="#ef4444" />
          <L x="442" y="136" fill="#ef4444" size={11} weight={700}>Yttersving: Erosjon</L>
          <L x="442" y="150" fill={C.muted} size={9}>Maksimal fart (helikoid strøm)</L>

          {/* Innersving (Point bar / sandøre avsetning) */}
          <circle cx="380" cy="135" r="4" fill="#10b981" />
          <L x="350" y="145" fill="#10b981" size={11} weight={700} anchor="end">Innersving: Avsetning</L>
          <L x="350" y="158" fill={C.muted} size={9} anchor="end">Lav hastighet → sandøre</L>

          {/* Avsnørt meander: Kroksjø (Oxbow lake) */}
          <path d="M 500 130 C 560 130, 560 210, 500 210 C 475 210, 475 180, 500 175" fill="none" stroke="#22d3ee" strokeWidth="9" strokeLinecap="round" />
          <L x="535" y="125" fill="#22d3ee" size={11} weight={700}>Kroksjø</L>
          <L x="535" y="140" fill={C.muted} size={9}>(Avsnørt ved flom)</L>

          <L x="345" y="258" fill={C.fg} size={10} weight={600}>Elveslette (flomslette): Leire avsettes under flom.</L>

          {/* Seksjon 3: Elvedelta med lagdeling (høyre, x: 615-895) */}
          <rect x="615" y="45" width="280" height="240" rx="8" fill="#18232c" stroke={C.sand} strokeWidth="1.2" />
          <L x="630" y="70" fill={C.sand} size={14} weight={700}>3. Munning: Gilbert-type elvedelta</L>

          {/* Delta snitt */}
          {/* Elveløp inn */}
          <rect x="630" y="95" width="60" height="12" fill="#38bdf8" />
          {/* Vannivå i mottakerbasseng (hav/innsjø) */}
          <line x1="690" y1="100" x2="880" y2="100" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" />
          <L x="870" y="94" fill="#38bdf8" size={10} anchor="end">Hav- / bresjønivå</L>

          {/* Lag 1: Topplag (horisontale) */}
          <path d="M 630 107 L 720 107 L 710 120 L 630 120 Z" fill="#443b2c" stroke={C.warm} strokeWidth="1" />
          <L x="655" y="116" fill={C.warm} size={10} weight={700}>1. Topplag</L>
          <L x="725" y="116" fill={C.muted} size={9}>Grov sand &amp; grus</L>

          {/* Lag 2: Forlag (skråstilte sandlag som bygger deltaet utover) */}
          <path d="M 720 107 L 810 180 L 780 190 L 710 120 Z" fill="#363223" stroke={C.sand} strokeWidth="1.2" />
          <line x1="730" y1="120" x2="790" y2="175" stroke={C.sand} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="745" y1="120" x2="805" y2="175" stroke={C.sand} strokeWidth="1" strokeDasharray="3 2" />
          <L x="770" y="145" fill={C.sand} size={11} weight={700}>2. Forlag (skrå)</L>
          <L x="770" y="160" fill={C.muted} size={9}>Bygger deltafront utover</L>

          {/* Lag 3: Bunnlag (horisontale leire- og siltlag) */}
          <path d="M 630 190 L 880 190 L 880 220 L 630 220 Z" fill="#202c32" stroke={C.teal} strokeWidth="1" />
          <L x="655" y="208" fill={C.teal} size={10} weight={700}>3. Bunnlag</L>
          <L x="740" y="208" fill={C.muted} size={9}>Finsilt og marin leire på dypet</L>

          <L x="630" y="258" fill={C.fg} size={10} weight={600}>Sandtak i Norge ligger ofte i gamle bre-deltaer!</L>

          {/* Nedre panel: Sammenfatning og Hjulström-kobling */}
          <rect x="45" y="300" width="850" height="155" rx="8" fill="#152028" stroke={C.dim} strokeWidth="1.4" />
          <L x="65" y="326" fill={C.fg} size={14} weight={700}>Fluvial energi, erosjonsbasis og Hjulstrøms balanse</L>
          
          <g>
            <rect x="65" y="342" width="250" height="98" rx="6" fill="#1b2832" stroke={C.warm} strokeWidth="1" />
            <L x="75" y="362" fill={C.warm} size={12} weight={700}>Erosjonsbasis (Base level)</L>
            <L x="75" y="380" fill={C.fg} size={11}>Havnivået er den absolutte grensen</L>
            <L x="75" y="396" fill={C.muted} size={10}>for hvor dypt ei elv kan erodere landskapet.</L>
            <L x="75" y="412" fill={C.sand} size={10}>Tertiær heving senket erosjonsbasis relativt,</L>
            <L x="75" y="426" fill={C.sand} size={10}>og utløste kraftig tilbakeskridende elvegraving.</L>
          </g>

          <g>
            <rect x="330" y="342" width="265" height="98" rx="6" fill="#1b2832" stroke={C.teal} strokeWidth="1" />
            <L x="340" y="362" fill={C.teal} size={12} weight={700}>Transportmåter i elv</L>
            <L x="340" y="380" fill={C.fg} size={11}>1. Bunnlast: Grus/stein ruller og hopper (saltasjon).</L>
            <L x="340" y="396" fill={C.fg} size={11}>2. Svevelast (suspensjon): Silt og leire holdes oppe.</L>
            <L x="340" y="412" fill={C.fg} size={11}>3. Oppløst last: Kalsium, klorid og salter i løsning.</L>
            <L x="340" y="428" fill={C.muted} size={10}>Turbulens i vannet forhindrer partikler i å falle ut.</L>
          </g>

          <g>
            <rect x="610" y="342" width="270" height="98" rx="6" fill="#1b2832" stroke={C.cold} strokeWidth="1" />
            <L x="620" y="362" fill={C.cold} size={12} weight={700}>Helikoidal strøm i meander</L>
            <L x="620" y="380" fill={C.fg} size={11}>Sentrifugalkraft presser overflatevannet</L>
            <L x="620" y="396" fill={C.fg} size={11}>mot yttersvingen. En returstrøm langs bunnen</L>
            <L x="620" y="412" fill={C.sand} size={10}>frakter sand og grus diagonalt over til innersvingen.</L>
            <L x="620" y="428" fill={C.muted} size={10}>Dette gjør at meandersvinger vandrer nedover dalen.</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. Forvitringsmekanismer: Mekanisk vs kjemisk forvitring
 */
export function WeatheringMechanismsDiagram() {
  return (
    <Diagram
      title="Forvitringsmekanismer: Mekanisk oppsprekking mot kjemisk oppløsning og mineralforvandling"
      heading="Forvitring — fjellets nedbrytning i fast tilstand på overflaten"
      caption="Forvitring bryter ned fast fjell uten transport (når materialet flyttes, kalles det erosjon). Mekanisk forvitring spalter bergmassen fysisk opp i mindre biter (frostsprengning ved 9 % volumutvidelse, trykkavlastning/eksfoliering når overliggende stein fjernes, og rotsvingning). Kjemisk forvitring endrer mineralenes kjemiske sammensetning via vann og atmosfæriske gasser (hydrolyse av feltspat til leirmineraler, oksidasjon av jern, og karst-oppløsning av kalkstein til dryppsteinshuler)."
      viewBox="0 0 940 480"
      wide
    >
      {() => (
        <>
          <rect x="30" y="30" width="880" height="420" rx="12" fill="#131b22" stroke={C.dim} strokeWidth="1.6" />

          {/* Venstre halvdel: Mekanisk forvitring */}
          <rect x="45" y="45" width="415" height="390" rx="8" fill="#19232b" stroke={C.warm} strokeWidth="1.4" />
          <L x="65" y="75" fill={C.warm} size={16} weight={700}>Mekanisk forvitring (fysisk oppsprekking)</L>
          <L x="65" y="95" fill={C.muted} size={12}>Mineralenes kjemiske sammensetning forblir uendret. Arealet øker dramatisk!</L>

          {/* 1. Frostsprengning */}
          <g>
            <rect x="65" y="115" width="375" height="85" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1" />
            <L x="80" y="138" fill={C.cold} size={13} weight={700}>1. Frostsprengning (Frost wedging)</L>
            <L x="80" y="156" fill={C.fg} size={11}>• Vann trenger inn i sprekker og utvider seg med 9 % ved frysing.</L>
            <L x="80" y="172" fill={C.fg} size={11}>• Utvikler trykk på over 200 MPa — sprenger blokker løs til ur og talus.</L>
            <L x="80" y="188" fill={C.sand} size={10}>Vanligst ved fryse-tine-vekslinger rundt 0 °C i høyfjellet i Norge.</L>
          </g>

          {/* 2. Trykkavlastning / Eksfoliering */}
          <g>
            <rect x="65" y="215" width="375" height="95" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1" />
            <L x="80" y="238" fill={C.sand} size={13} weight={700}>2. Trykkavlastning &amp; eksfoliering (Sheet jointing)</L>
            <L x="80" y="256" fill={C.fg} size={11}>• Dypbergarter (f.eks. granitt) størknet under enormt litostatisk trykk.</L>
            <L x="80" y="272" fill={C.fg} size={11}>• Når erosjon fjerner flere kilometer overliggende stein, ekspanderer fjellet.</L>
            <L x="80" y="288" fill={C.fg} size={11}>• Danner overflateparallelle bueformede sprekker («løkskalling»).</L>
            <L x="80" y="302" fill={C.warm} size={10}>Eksempel i Norge: Granittkupler på Helgeland og i Iddefjorden.</L>
          </g>

          {/* 3. Rotsvingning & Solsprengning */}
          <g>
            <rect x="65" y="325" width="375" height="95" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1" />
            <L x="80" y="348" fill={C.teal} size={13} weight={700}>3. Biologisk rotsvingning &amp; saltsprengning</L>
            <L x="80" y="366" fill={C.fg} size={11}>• Planterøtter kiler seg inn i mikroskopiske sprekker og vokser.</L>
            <L x="80" y="382" fill={C.fg} size={11}>• Røttenes celletrykk (turgortrykk) utvider sprekkene mekanisk.</L>
            <L x="80" y="398" fill={C.fg} size={11}>• Krystallisasjon av salt i tørre kyst- eller ørkenområder gir sprekking.</L>
          </g>

          {/* Høyre halvdel: Kjemisk forvitring */}
          <rect x="480" y="45" width="415" height="390" rx="8" fill="#19232b" stroke={C.teal} strokeWidth="1.4" />
          <L x="500" y="75" fill={C.teal} size={16} weight={700}>Kjemisk forvitring (mineralforvandling)</L>
          <L x="500" y="95" fill={C.muted} size={12}>Reaksjon med vann (H₂O), karbondioksid (CO₂) og oksygen (O₂).</L>

          {/* 1. Karst og oppløsning */}
          <g>
            <rect x="500" y="115" width="375" height="95" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1" />
            <L x="515" y="138" fill={C.cold} size={13} weight={700}>1. Karstoppløsning av kalkstein (Kalsitt)</L>
            <L x="515" y="156" fill={C.fg} size={11}>• Regnvann tar opp CO₂ og danner svak karbonsyre (H₂CO₃).</L>
            <L x="515" y="172" fill={C.warm} size={11}>• CaCO₃ (kalkstein) + H₂O + CO₂ ⇌ Ca²⁺ + 2HCO₃⁻ (kalsiumhydrogenkarbonat).</L>
            <L x="515" y="188" fill={C.fg} size={11}>• Vannet løser ut kalk og danner synkehull (doliner) og underjordiske huler.</L>
            <L x="515" y="202" fill={C.sand} size={10}>Kjente eksempler i Norge: Grønligrotta og Setergrotta i Rana (Nordland).</L>
          </g>

          {/* 2. Hydrolyse */}
          <g>
            <rect x="500" y="225" width="375" height="95" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1" />
            <L x="515" y="248" fill={C.teal} size={13} weight={700}>2. Hydrolyse (Feltspat → Leirmineraler)</L>
            <L x="515" y="266" fill={C.fg} size={11}>• Kalifeltspat reagerer med surt vann og brytes ned til kaolinitt (leire):</L>
            <L x="515" y="282" fill={C.muted} size={10}>2 KAlSi₃O₈ + 2 H⁺ + 9 H₂O → Al₂Si₂O₅(OH)₄ + 4 H₄SiO₄ + 2 K⁺.</L>
            <L x="515" y="298" fill={C.fg} size={11}>• Granitt mister kohesjon og smuldrer opp til «grusfjell» (saprolitt).</L>
            <L x="515" y="312" fill={C.sand} size={10}>Kvarts forblir kjemisk intakt og blir til sandkorn på strender!</L>
          </g>

          {/* 3. Oksidasjon */}
          <g>
            <rect x="500" y="335" width="375" height="85" rx="6" fill="#141c22" stroke={C.dim} strokeWidth="1" />
            <L x="515" y="358" fill={C.warm} size={13} weight={700}>3. Oksidasjon (Rustdannelse)</L>
            <L x="515" y="376" fill={C.fg} size={11}>• Jernholdige silikater (olivin, pyroksen, biotitt) reagerer med oksygen.</L>
            <L x="515" y="392" fill={C.fg} size={11}>• Fe²⁺ oksideres til Fe³⁺ og danner hematitt (rød) eller goethitt (brun).</L>
            <L x="515" y="408" fill={C.muted} size={10}>Fjellet får en rødbrun forvitringshinne som svekker krystallgitteret.</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. Norges landskapsevolusjon: Paleisk flate, tertiær heving, glasial innsnitting og strandflaten
 */
export function NorwegianLandscapeEvolutionDiagram() {
  return (
    <Diagram
      title="Norges landskapsutvikling: Fra mesozoisk paleisk flate til tertiær landheving og kvartære istider"
      heading="Det norske landskapets 4D-historie — gamle vidder og unge fjorder"
      caption="Det norske landskapet består av to vidt forskjellige generasjoner landformer: 1) De gamle landformene (den paleiske overflaten): rolige vidder, avrundede åser og vide daler formet gjennom titalls millioner år under mesozoikum og tidlig tertiær. 2) De unge landformene: Dype fjorder, U-daler, alpine tinder og strandflaten, skapt av elver og kvartære isbreer etter at den skandinaviske landblokken ble hevet asymmetrisk opp mot vest i tertiær tid (paleogen/neogen) da Atlanterhavet åpnet seg."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          <rect x="30" y="30" width="880" height="440" rx="12" fill="#121a22" stroke={C.dim} strokeWidth="1.6" />

          {/* Skjematisk profil fra Norskehavet i vest til Sverige i øst */}
          {/* Havflate Norskehavet (vest, venstre) */}
          <rect x="40" y="320" width="180" height="130" fill="#0f2b3c" />
          <line x1="40" y1="320" x2="220" y2="320" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
          <L x="110" y="312" fill="#38bdf8" size={13} weight={700} anchor="middle">Norskehavet</L>

          {/* Strandflaten (lav brem av øyer og skjær langs kysten) */}
          <path d="M 160 315 L 240 315 L 250 280 L 160 320 Z" fill="#2d2922" stroke={C.teal} strokeWidth="1.5" />
          <L x="200" y="270" fill={C.teal} size={13} weight={800} anchor="middle">Strandflaten</L>
          <L x="200" y="286" fill={C.fg} size={10} anchor="middle">0–50 moh. Skjærgård</L>
          <L x="200" y="300" fill={C.muted} size={9} anchor="middle">Frostsprengning &amp; bølgeerosjon</L>

          {/* Steil vestkyst med dyp fjord (Sognefjorden) */}
          <path
            d="M 240 315 L 290 100 L 320 220 L 350 420 L 380 220 L 410 90 L 580 120 L 750 180 L 890 260 L 890 450 L 160 450 Z"
            fill="#23201a"
            stroke={C.fg}
            strokeWidth="1.4"
          />

          {/* Fjordvann som trenger dypt inn i landet */}
          <path d="M 335 320 L 365 320 L 350 420 Z" fill="#15425b" stroke="#38bdf8" strokeWidth="1" />
          <line x1="280" y1="320" x2="400" y2="320" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="350" y="285" fill="#38bdf8" size={12} weight={700} anchor="middle">Vestlandsfjord</L>
          <L x="350" y="300" fill={C.muted} size={10} anchor="middle">(Innskåret i den hevede blokken)</L>
          <L x="350" y="435" fill={C.sand} size={10} anchor="middle">Overfordypet under havnivå (-1300 m)</L>

          {/* Alpine tinder på kanten i vest (Jotunheimen / Sunnmørsalpene) */}
          <polygon points="290,100 275,140 305,140" fill="#e2e8f0" opacity="0.8" />
          <polygon points="410,90 395,130 425,130" fill="#e2e8f0" opacity="0.8" />
          <L x="350" y="70" fill={C.warm} size={14} weight={800} anchor="middle">Unge alpine landformer</L>
          <L x="350" y="86" fill={C.muted} size={10} anchor="middle">Tinder, botner og egger (Kvartære breer)</L>

          {/* Den paleiske overflaten (Hardangervidda) */}
          {/* Stiplet linje som viser den opprinnelige flata før istidens innsnitt */}
          <line x1="290" y1="100" x2="410" y2="90" stroke={C.sand} strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 410 90 Q 560 115 720 170" fill="none" stroke={C.sand} strokeWidth="3" />
          <L x="560" y="85" fill={C.sand} size={15} weight={800} anchor="middle">Den paleiske overflaten (Gamle landformer)</L>
          <L x="560" y="103" fill={C.fg} size={11} anchor="middle">Hardangervidda, Finnmarksvidda (Mesozoisk peneplan)</L>

          {/* Tertiær heving pil */}
          <Arrow d="M 120 220 L 120 120" marker={m.warm} color={C.warm} width={3.2} />
          <L x="135" y="150" fill={C.warm} size={13} weight={800}>Tertiær landheving</L>
          <L x="135" y="168" fill={C.fg} size={11}>Opptil 1500–2000 moh i vest</L>
          <L x="135" y="184" fill={C.muted} size={10}>Skandinaviske blokk tippet mot øst</L>

          {/* Østlandsdalene (slakere U-daler som følger den paleiske helningen) */}
          <path d="M 720 170 L 760 230 L 800 200 L 890 260" fill="none" stroke={C.cold} strokeWidth="2" />
          <L x="780" y="248" fill={C.cold} size={12} weight={700} anchor="middle">Østlandsdaler</L>
          <L x="780" y="264" fill={C.muted} size={10} anchor="middle">Gudbrandsdalen, Østerdalen</L>
          <L x="780" y="278" fill={C.sand} size={9} anchor="middle">Slakere fall mot Sverige/Østersjøen</L>

          {/* Forklarende tabell nederst */}
          <g>
            <rect x="50" y="370" width="390" height="85" rx="8" fill="#18232c" stroke={C.warm} strokeWidth="1.2" />
            <L x="65" y="392" fill={C.warm} size={13} weight={700}>Unge landformer (Kvartær tid &lt; 2,6 mill. år)</L>
            <L x="65" y="410" fill={C.fg} size={11}>• Fjorder, U-daler, canyoner, botner, tinder og morener.</L>
            <L x="65" y="426" fill={C.fg} size={11}>• Skapt ved voldsom bre- og elveerosjon etter tertiærhevingen.</L>
            <L x="65" y="442" fill={C.teal} size={10}>Strandflaten er en hybridflate: frostforvitring, brenninger og is.</L>
          </g>

          <g>
            <rect x="460" y="370" width="430" height="85" rx="8" fill="#18232c" stroke={C.sand} strokeWidth="1.2" />
            <L x="475" y="392" fill={C.sand} size={13} weight={700}>Gamle landformer (Mesozoikum &amp; Tidlig Tertiær)</L>
            <L x="475" y="410" fill={C.fg} size={11}>• Viddelandskap, avrundede heier og vide daler (peneplan).</L>
            <L x="475" y="426" fill={C.fg} size={11}>• Formet av millioner av års forvitring i et varmt og fuktig klima.</L>
            <L x="475" y="442" fill={C.sand} size={10}>Hardangervidda overlevde fordi innlandsisen var kald og fastfrosset!</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. U-dal og V-dal tverrsnitt
 */
export function ValleyCrossSectionDiagram() {
  return (
    <Diagram
      title="U-dal skures av is i hele tverrsnittet. V-dal graves av elva i bunnen. Fjord er U-dal under hav."
      heading="U-dal mot V-dal: Tverrsnitt og erosjonsmønster"
      caption="En U-dal er formet av breerosjon i hele tverrsnittet: Isen og steinene den fører med seg, skurer og plukker både i dalbunnen og langs de bratte dalsidene. En V-dal dannes derimot av rent fluvialt arbeid: Elva graver i selve bunnen, mens forvitring og ras i dalsidene gir det spisse V-profilet. En fjord er rett og slett en U-dal som er gravd så dyp at havet har trengt inn etter at isen smeltet bort."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <rect x="28" y="36" width="372" height="312" rx="10" fill="#152028" stroke={C.dim} strokeWidth="1.2" />
          <rect x="420" y="36" width="372" height="312" rx="10" fill="#152028" stroke={C.dim} strokeWidth="1.2" />

          {/* U-dal / Fjord */}
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

          <L x={214} y={64} fill={C.fg} size={15} anchor="middle" weight={700}>
            U-dal &amp; Fjord (Glasial)
          </L>
          <L x={214} y={140} fill={C.white} size={14} anchor="middle">
            Isbre fyller hele dalen
          </L>
          <L x={368} y={178} fill={C.white} size={12} anchor="end">
            Havnivå
          </L>
          <L x={214} y={312} fill={C.teal} size={13} anchor="middle" weight={600}>
            Fjord: U-dal gravd under havnivå
          </L>

          {/* V-dal */}
          <path d="M 440 92 H 528 L 606 268 L 684 92 H 772 V 328 H 440 Z" fill="#3a3428" />
          <path d="M 590 248 L 606 276 L 622 248 Q 606 238 590 248 Z" fill={C.teal} />
          <Arrow d="M 606 150 L 606 236" marker={m.teal} color={C.teal} width={2.4} />

          <L x={606} y={64} fill={C.fg} size={15} anchor="middle" weight={700}>
            V-dal (Fluvial)
          </L>
          <L x={640} y={228} fill={C.teal} size={14} weight={600}>
            Rennende elv i bunnen
          </L>
          <L x={606} y={312} fill={C.sand} size={13} anchor="middle">
            Skråningsras &amp; forvitring vider ut toppen
          </L>
        </>
      )}
    </Diagram>
  );
}
