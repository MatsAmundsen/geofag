import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. MilankovitchCyclesDiagram
 * Viser de tre orbitale parametrene geometrisk side om side:
 * - Eksentrisitet (100k og 400k år)
 * - Oblikvitet / aksehelning (41k år)
 * - Presesjon (23k og 19k år)
 */
export function MilankovitchCyclesDiagram() {
  return (
    <Diagram
      title="De tre orbitale Milanković-syklusene: eksentrisitet, aksehelning og presesjon"
      heading="Jordbanens tre langsomme rytmer"
      caption="Milanković-syklusene er tre periodiske variasjoner i jordens bane og orientering i rommet. De endrer nesten ikke den totale solinnstrålingen jorda mottar over et år, men omfordeler hvor og når på kloden solenergien treffer. 1) Eksentrisitet (ca. 100 000 og 400 000 år): Banens form svinger mellom nesten sirkulær og svak ellipse. 2) Aksehelning / oblikvitet (ca. 41 000 år): Helningen varierer mellom 22,1° og 24,5°. Liten helning gir kjøligere somre på 65 °N. 3) Presesjon (ca. 23 000 og 19 000 år): Jordaksen vobler som en snurrebass og flytter tidspunktet for perihel (kortest avstand til sola)."
      viewBox="0 0 920 460"
    >
      {(m) => (
        <>
          {/* Header titles for 3 columns */}
          <L x="155" y="38" fill={C.warm} size={15} weight={600} anchor="middle">
            1. Eksentrisitet
          </L>
          <L x="155" y="56" fill={C.muted} size={12} anchor="middle">
            ca. 100 000 og 400 000 år
          </L>

          <L x="460" y="38" fill={C.teal} size={15} weight={600} anchor="middle">
            2. Aksehelning (oblikvitet)
          </L>
          <L x="460" y="56" fill={C.muted} size={12} anchor="middle">
            ca. 41 000 år
          </L>

          <L x="765" y="38" fill={C.cold} size={15} weight={600} anchor="middle">
            3. Presesjon (vobling)
          </L>
          <L x="765" y="56" fill={C.muted} size={12} anchor="middle">
            ca. 23 000 og 19 000 år
          </L>

          {/* Vertical dividers */}
          <line x1="310" y1="24" x2="310" y2="436" stroke={C.dim} strokeDasharray="4 4" />
          <line x1="620" y1="24" x2="620" y2="436" stroke={C.dim} strokeDasharray="4 4" />

          {/* ================= COLUMN 1: EKSENTRISITET ================= */}
          {/* Circular reference orbit */}
          <ellipse
            cx="155"
            cy="190"
            rx="115"
            ry="105"
            fill="none"
            stroke={C.dim}
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          <L x="155" y="78" fill={C.muted} size={11} anchor="middle">
            sirkulær bane (e ≈ 0)
          </L>

          {/* Elliptical orbit */}
          <ellipse
            cx="175"
            cy="190"
            rx="125"
            ry="90"
            fill="none"
            stroke={C.warm}
            strokeWidth="2.2"
          />

          {/* Sun at one focus */}
          <circle cx="120" cy="190" r="14" fill="#f59e0b" />
          <circle cx="120" cy="190" r="22" fill="#f59e0b" opacity="0.2" />
          <L x="120" y="224" fill={C.warm} size={12} weight={600} anchor="middle">
            Sola
          </L>

          {/* Earth at Perihelion (closest) */}
          <circle cx="50" cy="190" r="7" fill={C.teal} />
          <L x="50" y="174" fill={C.fg} size={11} anchor="middle">
            Perihel
          </L>
          <L x="50" y="214" fill={C.muted} size={10} anchor="middle">
            (nærmest)
          </L>

          {/* Earth at Aphelion (farthest) */}
          <circle cx="300" cy="190" r="7" fill={C.teal} />
          <L x="300" y="174" fill={C.fg} size={11} anchor="middle">
            Aphel
          </L>
          <L x="300" y="214" fill={C.muted} size={10} anchor="middle">
            (lengst fra)
          </L>

          {/* Explanation text Col 1 */}
          <rect x="25" y="300" width="260" height="124" rx="6" fill="#142028" stroke={C.dim} />
          <L x="38" y="322" fill={C.fg} size={12} weight={600}>
            Hva den gjør:
          </L>
          <L x="38" y="342" fill={C.muted} size={11}>
            • Banen strekkes fra nesten rund til oval.
          </L>
          <L x="38" y="360" fill={C.muted} size={11}>
            • Modulerer forskjellen mellom perihel
          </L>
          <L x="38" y="376" fill={C.muted} size={11}>
            og aphel (avstandseffekten).
          </L>
          <L x="38" y="400" fill={C.warm} size={11} weight={600}>
            Styrer modulasjon av presesjon.
          </L>

          {/* ================= COLUMN 2: AKSEHELNING ================= */}
          {/* Earth sphere center at (460, 190), r=55 */}
          {/* Orbital plane horizontal */}
          <line x1="345" y1="190" x2="575" y2="190" stroke={C.dim} strokeWidth="1.4" />
          <L x="555" y="184" fill={C.muted} size={10} anchor="end">
            Baneplan
          </L>

          {/* Earth body */}
          <circle cx="460" cy="190" r="52" fill="#132c38" stroke={C.teal} strokeWidth="1.8" />
          {/* Equator line tilted by 23.4 deg */}
          <path
            d="M 412 210 Q 460 216 508 170"
            fill="none"
            stroke={C.muted}
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <L x="502" y="202" fill={C.muted} size={10}>
            Ekvator
          </L>

          {/* Vertical normal to orbit */}
          <line
            x1="460"
            y1="85"
            x2="460"
            y2="295"
            stroke={C.dim}
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />

          {/* Min tilt axis 22.1° */}
          <line x1="422" y1="95" x2="498" y2="285" stroke={C.cold} strokeWidth="1.6" />
          <L x="410" y="92" fill={C.cold} size={11} anchor="end">
            22,1° (min)
          </L>

          {/* Max tilt axis 24.5° */}
          <line x1="404" y1="102" x2="516" y2="278" stroke={C.warm} strokeWidth="1.6" />
          <L x="402" y="116" fill={C.warm} size={11} anchor="end">
            24,5° (maks)
          </L>

          {/* Present axis 23.4° */}
          <line
            x1="413"
            y1="98"
            x2="507"
            y2="282"
            stroke={C.fg}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <L x="462" y="80" fill={C.fg} size={12} weight={600} anchor="middle">
            I dag: 23,44°
          </L>

          {/* Angle arc */}
          <path d="M 460 115 A 75 75 0 0 0 432 121" fill="none" stroke={C.teal} strokeWidth="1.6" />

          {/* 65°N zone marker */}
          <circle cx="438" cy="155" r="4" fill={C.warm} />
          <L x="430" y="152" fill={C.warm} size={10} anchor="end">
            65 °N
          </L>

          {/* Explanation text Col 2 */}
          <rect x="330" y="300" width="260" height="124" rx="6" fill="#142028" stroke={C.dim} />
          <L x="343" y="322" fill={C.fg} size={12} weight={600}>
            Hva den gjør:
          </L>
          <L x="343" y="342" fill={C.muted} size={11}>
            • Høy helning: Sterkere årstider og
          </L>
          <L x="343" y="358" fill={C.muted} size={11}>
            mer sommersol på polene.
          </L>
          <L x="343" y="378" fill={C.cold} size={11}>
            • Liten helning: Kjøligere somre på 65 °N
          </L>
          <L x="343" y="396" fill={C.cold} size={11} weight={600}>
            → Snø overlever sommeren (istid).
          </L>

          {/* ================= COLUMN 3: PRESESJON ================= */}
          {/* Precession cone */}
          <ellipse
            cx="765"
            cy="110"
            rx="65"
            ry="22"
            fill="none"
            stroke={C.cold}
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />

          {/* Earth sphere at (765, 210), r=44 */}
          <circle cx="765" cy="210" r="42" fill="#132c38" stroke={C.teal} strokeWidth="1.8" />
          <line
            x1="765"
            y1="110"
            x2="765"
            y2="280"
            stroke={C.dim}
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />

          {/* Tilted Axis pointing left (North Star / Polaris now) */}
          <line x1="718" y1="110" x2="812" y2="310" stroke={C.teal} strokeWidth="2.4" />
          <circle cx="718" cy="110" r="4.5" fill={C.teal} />
          <L x="710" y="98" fill={C.teal} size={11} anchor="end" weight={600}>
            Nå (Polaris)
          </L>

          {/* Axis pointing right (Vega in ~11 500 yrs) */}
          <line
            x1="812"
            y1="110"
            x2="718"
            y2="310"
            stroke={C.warm}
            strokeWidth="1.6"
            strokeDasharray="3 3"
          />
          <circle cx="812" cy="110" r="4" fill={C.warm} />
          <L x="820" y="98" fill={C.warm} size={11} weight={600}>
            Om 11 500 år (Vega)
          </L>

          {/* Wobble rotation arrow */}
          <path
            d="M 735 128 A 65 22 0 0 0 795 128"
            fill="none"
            stroke={C.cold}
            strokeWidth="2"
            markerEnd={`url(#${m.cold})`}
          />
          <L x="765" y="148" fill={C.cold} size={11} anchor="middle">
            23 000-års syklus
          </L>

          {/* Explanation text Col 3 */}
          <rect x="640" y="300" width="255" height="124" rx="6" fill="#142028" stroke={C.dim} />
          <L x="653" y="322" fill={C.fg} size={12} weight={600}>
            Hva den gjør:
          </L>
          <L x="653" y="342" fill={C.muted} size={11}>
            • Jordaksen vobler som en snurrebass.
          </L>
          <L x="653" y="360" fill={C.muted} size={11}>
            • Flytter når på året jorda er i perihel.
          </L>
          <L x="653" y="378" fill={C.muted} size={11}>
            • Sommer i perihel gir varmere somre.
          </L>
          <L x="653" y="398" fill={C.cold} size={11} weight={600}>
            Sommer i aphel = kald sommer på 65 °N.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. Sommersol65NDiagram
 * Forklarer Milankovićs kjerneinnsikt: Hvorfor sommersol på 65 °N styrer istider.
 */
export function Sommersol65NDiagram() {
  return (
    <Diagram
      title="Sommersol på 65 °N avgjør om innlandsis bygges opp eller smelter bort"
      heading="Nøkkelen til istider: Sommersolen på 65 °N"
      caption="Hvorfor ser geofagere på 65 °N sommerstid? På høye nordlige breddegrader er det alltid kaldt nok til snø om vinteren. Det avgjørende for om et isdekke vokser eller forsvinner, er om sommersolen klarer å smelte all snøen som falt forrige vinter. Til venstre: Kjølig sommer på 65 °N gjør at snøen overlever sommeren. År for år akkumuleres snø til is, albedoen øker, og en istid (glasial) starter. Til høyre: Intens sommersol gir kraftig bresmelting, isdekket trekker seg hurtig tilbake, og vi får en mellomistid (interglasial)."
      viewBox="0 0 880 440"
    >
      {(m) => (
        <>
          {/* Column 1 header: Istidsstart */}
          <L x="220" y="38" fill={C.cold} size={16} weight={600} anchor="middle">
            Kjølig sommer på 65 °N → Istid (glasial)
          </L>
          <L x="220" y="58" fill={C.muted} size={12} anchor="middle">
            Liten helning (22,1°) + sommer i aphel (langt fra sola)
          </L>

          {/* Column 2 header: Deglasiasjon */}
          <L x="660" y="38" fill={C.warm} size={16} weight={600} anchor="middle">
            Varm sommer på 65 °N → Mellomistid (interglasial)
          </L>
          <L x="660" y="58" fill={C.muted} size={12} anchor="middle">
            Stor helning (24,5°) + sommer i perihel (nær sola)
          </L>

          {/* Center dividing line */}
          <line x1="440" y1="24" x2="440" y2="420" stroke={C.dim} />

          {/* ================= LEFT PANEL: GLASIAL ================= */}
          {/* Pale Sun low on the sky */}
          <circle cx="90" cy="110" r="18" fill="#eab308" opacity="0.6" />
          <Arrow d="M 115 125 L 185 165" marker={m.muted} color={C.muted} width={1.8} />
          <L x="90" y="145" fill={C.muted} size={11} anchor="middle">
            Lav / svak sommersol
          </L>

          {/* Landscape and expanding ice sheet */}
          <path d="M 30 260 Q 150 250 250 255 L 410 260 L 410 320 L 30 320 Z" fill="#1b2e38" />
          {/* Bedrock line */}
          <path d="M 30 260 L 410 260" stroke={C.dim} strokeWidth="1.5" />

          {/* Massive Ice Dome */}
          <path
            d="M 30 260 Q 140 160 260 210 Q 320 235 360 260 Z"
            fill="#325a6a"
            stroke={C.cold}
            strokeWidth="2.2"
          />
          <L x="160" y="195" fill={C.white} size={13} weight={600} anchor="middle">
            Fennoskandisk isdekke vokser
          </L>

          {/* Persistent snow layer */}
          <path
            d="M 40 240 Q 140 155 260 205 Q 320 230 355 255"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="4"
          />
          <L x="180" y="150" fill={C.cold} size={12}>
            Snø overlever sommeren
          </L>
          <Arrow d="M 230 155 L 250 195" marker={m.cold} color={C.cold} width={1.6} />

          {/* Snow accumulation badge */}
          <rect x="45" y="275" width="165" height="34" rx="4" fill="#0f1c24" stroke={C.cold} />
          <L x="127" y="297" fill={C.cold} size={12} weight={600} anchor="middle">
            Akkumulering &gt; Smelting
          </L>

          {/* Ice expansion arrow */}
          <Arrow d="M 260 230 L 370 255" marker={m.cold} color={C.cold} width={2.4} />
          <L x="325" y="245" fill={C.cold} size={11}>
            breer sprer seg
          </L>

          {/* Outcome box left */}
          <rect x="40" y="335" width="360" height="75" rx="6" fill="#13232c" stroke={C.dim} />
          <L x="55" y="357" fill={C.cold} size={13} weight={600}>
            Resultat: Istid forsterkes
          </L>
          <L x="55" y="377" fill={C.muted} size={11}>
            • Snødekket reflekterer sollys (høy albedo).
          </L>
          <L x="55" y="395" fill={C.muted} size={11}>
            • Kjøler atmosfæren ytterligere → global istid.
          </L>

          {/* ================= RIGHT PANEL: INTERGLASIAL ================= */}
          {/* Intense Bright Sun */}
          <circle cx="530" cy="100" r="24" fill="#f59e0b" />
          <circle cx="530" cy="100" r="38" fill="#f59e0b" opacity="0.25" />
          <Arrow d="M 560 120 L 630 170" marker={m.warm} color={C.warm} width={2.4} />
          <Arrow d="M 545 135 L 590 190" marker={m.warm} color={C.warm} width={2.4} />
          <L x="530" y="152" fill={C.warm} size={12} weight={600} anchor="middle">
            Intens sommersol (65 °N)
          </L>

          {/* Landscape with melting ice */}
          <path d="M 470 260 Q 590 250 690 255 L 850 260 L 850 320 L 470 320 Z" fill="#1b2e38" />
          <path d="M 470 260 L 850 260" stroke={C.dim} strokeWidth="1.5" />

          {/* Shrinking retreating ice sheet */}
          <path
            d="M 470 260 Q 520 220 570 235 Q 610 250 630 260 Z"
            fill="#274653"
            stroke={C.teal}
            strokeWidth="2"
          />
          <L x="535" y="248" fill={C.teal} size={12} weight={600} anchor="middle">
            Isen smelter
          </L>

          {/* Meltwater streams rushing off */}
          <path
            d="M 570 240 Q 610 255 640 260 Q 680 270 730 265"
            fill="none"
            stroke={C.rain}
            strokeWidth="3"
          />
          <path
            d="M 560 245 Q 600 260 650 270 Q 700 275 750 270"
            fill="none"
            stroke={C.rain}
            strokeWidth="2"
          />
          <L x="680" y="250" fill={C.rain} size={12} weight={600}>
            Smeltevannselver
          </L>

          {/* Exposed bare land (low albedo) */}
          <rect x="650" y="258" width="180" height="12" fill="#524430" rx="2" />
          <L x="740" y="285" fill={C.warm} size={11} anchor="middle">
            Mørkt bart land / hav (lav albedo)
          </L>

          {/* Melt badge */}
          <rect x="485" y="275" width="165" height="34" rx="4" fill="#0f1c24" stroke={C.warm} />
          <L x="567" y="297" fill={C.warm} size={12} weight={600} anchor="middle">
            Smelting &gt;&gt; Akkumulering
          </L>

          {/* Retreat arrow */}
          <Arrow d="M 640 235 L 570 235" marker={m.warm} color={C.warm} width={2.4} />
          <L x="605" y="225" fill={C.warm} size={11} anchor="middle">
            isfronten rygger
          </L>

          {/* Outcome box right */}
          <rect x="480" y="335" width="360" height="75" rx="6" fill="#13232c" stroke={C.dim} />
          <L x="495" y="357" fill={C.warm} size={13} weight={600}>
            Resultat: Deglasiasjon (mellomistid)
          </L>
          <L x="495" y="377" fill={C.muted} size={11}>
            • Mindre is gir lavere albedo → mer varme tas opp.
          </L>
          <L x="495" y="395" fill={C.muted} size={11}>
            • Havet slipper ut CO₂ → oppvarmingen blir global.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. OxygenIsotopeDiagram
 * Forklarer δ¹⁸O i is vs i marine sedimenter (foraminiferer).
 */
export function OxygenIsotopeDiagram() {
  return (
    <Diagram
      title="Oksygenisotoper (δ¹⁸O): Rayleigh-fraksjonering og to motsatte arkiver i is og havbunn"
      heading="δ¹⁸O: Samme isotop, to motsatte arkiver"
      caption="Vann med lett oksygen (¹⁶O) fordamper lettere fra havet enn vann med tung oksygen (¹⁸O). Når skyer driver mot polene, regner det tunge ¹⁸O ut først. Under en istid blir det lette ¹⁶O-vannet låst i enorme innlandsisdekker på land. Dette skaper to motsatte arkivsignaler: 1) Iskjernene i Antarktis og på Grønland får ekstra lav δ¹⁸O (mye lett ¹⁶O). 2) Havet tømmes for ¹⁶O og blir anriket på tung ¹⁸O, slik at kalkskall (foraminiferer) i havbunnen får høy δ¹⁸O. Huskeregel: Lav δ¹⁸O i is = kaldt. Høy δ¹⁸O i havbunn = kaldt."
      viewBox="0 0 900 480"
    >
      {(m) => (
        <>
          {/* Evaporation & Rayleigh fractionating trajectory across top */}
          <L x="450" y="34" fill={C.fg} size={15} weight={600} anchor="middle">
            Rayleigh-fraksjonering under en istid
          </L>

          {/* Tropical Ocean Evaporation (Left) */}
          <rect x="40" y="190" width="180" height="90" fill="#0e2634" rx="4" />
          <path d="M 40 190 Q 85 185 130 190 Q 175 195 220 190" stroke={C.teal} strokeWidth="2" />
          <L x="130" y="220" fill={C.teal} size={13} weight={600} anchor="middle">
            Tropisk hav
          </L>
          <L x="130" y="240" fill={C.muted} size={11} anchor="middle">
            ¹⁶O fordamper lettest
          </L>

          {/* Evaporation wiggly arrows */}
          <Arrow d="M 90 180 Q 95 150 110 130" marker={m.teal} color={C.teal} width={1.8} />
          <Arrow d="M 150 180 Q 155 150 170 130" marker={m.teal} color={C.teal} width={1.8} />
          <L x="140" y="118" fill={C.rain} size={12} weight={600} anchor="middle">
            Vanndamp anriket på ¹⁶O
          </L>

          {/* Cloud path to Poles with rain-out */}
          <ellipse cx="320" cy="100" rx="45" ry="22" fill="#203a48" stroke={C.muted} />
          <L x="320" y="104" fill={C.fg} size={11} anchor="middle">
            Skyer avkjøles
          </L>

          {/* Heavy isotope rain-out */}
          <Arrow d="M 320 125 L 320 165" marker={m.low} color={C.low} width={2} dash="3 3" />
          <L x="320" y="180" fill={C.low} size={11} anchor="middle">
            Tung ¹⁸O regner ut først
          </L>

          {/* Atmospheric Transport Arrow */}
          <Arrow d="M 220 90 Q 320 60 480 80" marker={m.teal} color={C.teal} width={2.4} />
          <L x="360" y="65" fill={C.teal} size={12} anchor="middle">
            Fukttransport mot polene
          </L>

          {/* Polar Ice Sheet (Center-Right) */}
          <ellipse cx="580" cy="95" rx="40" ry="20" fill="#1b3240" stroke={C.cold} />
          <Arrow d="M 580 118 L 580 155" marker={m.cold} color={C.cold} width={2} />
          <L x="580" y="140" fill={C.cold} size={11} anchor="start">
            Snøfall (nesten bare ¹⁶O)
          </L>

          {/* Ice Sheet on Land */}
          <path
            d="M 500 240 Q 620 150 740 240 L 740 280 L 500 280 Z"
            fill="#234556"
            stroke={C.cold}
            strokeWidth="2.4"
          />
          <L x="620" y="210" fill={C.white} size={14} weight={600} anchor="middle">
            Innlandsis på land
          </L>
          <L x="620" y="232" fill={C.cold} size={12} anchor="middle">
            Låser gigantiske mengder lett ¹⁶O
          </L>

          {/* Deep Ocean with enriched 18O */}
          <rect x="760" y="190" width="110" height="90" fill="#0b1b24" rx="4" />
          <L x="815" y="225" fill={C.warm} size={12} weight={600} anchor="middle">
            Rest-havet
          </L>
          <L x="815" y="245" fill={C.muted} size={11} anchor="middle">
            Anrikes på ¹⁸O
          </L>

          {/* ================= LOWER PANELS: THE TWO ARCHIVES ================= */}
          {/* Archive 1: Iskjerner (Left) */}
          <rect
            x="40"
            y="295"
            width="390"
            height="165"
            rx="8"
            fill="#10202a"
            stroke={C.cold}
            strokeWidth="1.6"
          />
          <circle cx="65" cy="322" r="12" fill={C.cold} />
          <L x="65" y="327" fill="#0f171c" size={13} weight={700} anchor="middle">
            1
          </L>
          <L x="88" y="326" fill={C.cold} size={15} weight={600}>
            Arkiv: Iskjernen (Grønland / Antarktis)
          </L>
          <L x="55" y="354" fill={C.fg} size={12} weight={600}>
            • Måler: Nedbøren som falt direkte som snø.
          </L>
          <L x="55" y="374" fill={C.muted} size={12}>
            • Under istid er luften kaldere → mer ¹⁸O har regnet ut underveis.
          </L>
          <L x="55" y="394" fill={C.muted} size={12}>
            • Isen består derfor nesten utelukkende av lett ¹⁶O.
          </L>
          <rect x="55" y="412" width="360" height="34" rx="4" fill="#0b151c" />
          <L x="235" y="434" fill={C.cold} size={13} weight={600} anchor="middle">
            Signal: LAV (svært negativ) δ¹⁸O = KALDT KLIMA
          </L>

          {/* Archive 2: Marine sedimenter / Kalkskall (Right) */}
          <rect
            x="470"
            y="295"
            width="390"
            height="165"
            rx="8"
            fill="#10202a"
            stroke={C.warm}
            strokeWidth="1.6"
          />
          <circle cx="495" cy="322" r="12" fill={C.warm} />
          <L x="495" y="327" fill="#0f171c" size={13} weight={700} anchor="middle">
            2
          </L>
          <L x="518" y="326" fill={C.warm} size={15} weight={600}>
            Arkiv: Havbunnssedimenter (Foraminiferer)
          </L>
          <L x="485" y="354" fill={C.fg} size={12} weight={600}>
            • Måler: Kalkskall (CaCO₃) fra encellede organismer i havet.
          </L>
          <L x="485" y="374" fill={C.muted} size={12}>
            • Fordi ¹⁶O er låst i innlandsisen på land, er havet rikt på ¹⁸O.
          </L>
          <L x="485" y="394" fill={C.muted} size={12}>
            • Skallene bygges med det ¹⁸O-rike sjøvannet (+ kaldt bunnvann).
          </L>
          <rect x="485" y="412" width="360" height="34" rx="4" fill="#0b151c" />
          <L x="665" y="434" fill={C.warm} size={13} weight={600} anchor="middle">
            Signal: HØY δ¹⁸O = MYE IS PÅ LAND (ISTID)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. IceCoreAnatomyDiagram
 * Iskjernens anatomi: Nysnø -> Firn -> Forsegling av luftbobler -> Gassalderforskjell (Δage).
 */
export function IceCoreAnatomyDiagram() {
  return (
    <Diagram
      title="Iskjernens anatomi: dannelse av årlige islag og forsegling av luftbobler med gassalderforskjell"
      heading="Iskjernens anatomi og gassalderen (Δage)"
      caption="Nysnø faller på breoverflaten og pakkes gradvis sammen til firn. I de øverste 50–100 meterne er porene åpne, og atmosfæreluft sirkulerer fritt inn og ut. Først på 60–100 meters dyp klemmes porene hermetisk igjen til luftbobler. Boblene inneholder ekte fortidsluft — CO₂-kurven fra iskjerner er derfor en direkte fysisk gassmåling, ikke en tolkning. Fordi boblene forsegles titalls til tusenvis av år etter at snøen falt, er luften i boblene yngre enn isen rundt den. Denne kjente aldersforskjellen kalles gassalder (Δage)."
      viewBox="0 0 900 460"
    >
      {(m) => (
        <>
          {/* Depth Axis on Left */}
          <line x1="90" y1="50" x2="90" y2="410" stroke={C.muted} strokeWidth="1.6" />
          {[
            { y: 60, label: "0 m", desc: "Overflate" },
            { y: 150, label: "30 m", desc: "Firn" },
            { y: 240, label: "70 m", desc: "Lukking" },
            { y: 340, label: "120 m+", desc: "Dyp is" },
          ].map((d) => (
            <g key={d.y}>
              <line x1="82" y1={d.y} x2="98" y2={d.y} stroke={C.muted} strokeWidth="1.6" />
              <L x="74" y={d.y + 4} fill={C.fg} size={12} anchor="end" weight={600}>
                {d.label}
              </L>
            </g>
          ))}
          <L x="74" y="42" fill={C.muted} size={11} anchor="end">
            Dybde
          </L>

          {/* Ice Column Cross Section (x: 110 to 380) */}
          {/* Zone 1: Snow / loose firn (0 - 50m) */}
          <rect x="110" y="55" width="270" height="110" fill="#1e3846" rx="4" />
          <L x="245" y="80" fill="#e0f2fe" size={13} weight={600} anchor="middle">
            Nysnø og åpen firn (0–50 m)
          </L>
          <L x="245" y="100" fill={C.muted} size={11} anchor="middle">
            Porene er åpne. Luft sirkulerer fritt.
          </L>
          {/* Air exchange arrows */}
          <Arrow d="M 180 50 L 180 75" marker={m.teal} color={C.teal} width={1.8} />
          <Arrow d="M 310 75 L 310 50" marker={m.teal} color={C.teal} width={1.8} />

          {/* Zone 2: Bubble close-off depth (50 - 90m) */}
          <rect
            x="110"
            y="170"
            width="270"
            height="85"
            fill="#162d3a"
            stroke={C.warm}
            strokeWidth="1.6"
            rx="4"
          />
          <L x="245" y="195" fill={C.warm} size={13} weight={600} anchor="middle">
            Boblelukkingssone (60–90 m)
          </L>
          <L x="245" y="215" fill={C.muted} size={11} anchor="middle">
            Trykket forsegler porene hermetisk.
          </L>
          <L x="245" y="235" fill={C.warm} size={11} weight={600} anchor="middle">
            Fortidsluften fanges nå!
          </L>

          {/* Zone 3: Solid Ice with annual layers & enclosed bubbles (90m+) */}
          <rect x="110" y="260" width="270" height="150" fill="#0f212c" rx="4" />
          {/* Annual layers */}
          {[280, 305, 330, 355, 380].map((ly, idx) => (
            <line
              key={ly}
              x1="110"
              y1={ly}
              x2="380"
              y2={ly}
              stroke={idx % 2 === 0 ? "#25485c" : "#1a3443"}
              strokeWidth="3"
            />
          ))}
          {/* Trapped Bubbles */}
          {[
            [140, 290],
            [190, 318],
            [260, 295],
            [320, 315],
            [160, 345],
            [220, 365],
            [300, 342],
            [350, 370],
            [180, 395],
            [260, 390],
          ].map(([bx, by]) => (
            <circle
              key={`${bx}-${by}`}
              cx={bx}
              cy={by}
              r="4.5"
              fill={C.cold}
              stroke={C.white}
              strokeWidth="0.8"
            />
          ))}
          <L x="245" y="325" fill={C.white} size={13} weight={600} anchor="middle">
            Tett is med årslag og luftbobler
          </L>

          {/* Explanatory Panel to the Right (x: 420 to 860) */}
          <rect
            x="420"
            y="55"
            width="440"
            height="355"
            rx="8"
            fill="#121e26"
            stroke={C.dim}
            strokeWidth="1.6"
          />

          <L x="445" y="85" fill={C.teal} size={16} weight={600}>
            Hvorfor gassalderen er yngre enn isen:
          </L>

          {/* Timeline visualization */}
          <rect x="445" y="105" width="390" height="95" rx="6" fill="#0c171e" />
          <L x="460" y="130" fill={C.cold} size={13} weight={600}>
            1. Snøen faller på overflaten:
          </L>
          <L x="460" y="148" fill={C.fg} size={12}>
            Isens alder starter her (f.eks. for 15 000 år siden).
          </L>
          <L x="460" y="172" fill={C.warm} size={13} weight={600}>
            2. Boblene forsegles på 70 m dyp:
          </L>
          <L x="460" y="190" fill={C.fg} size={12}>
            Fanges først for 14 200 år siden → Gassalderen = 14 200 år.
          </L>

          <rect
            x="445"
            y="215"
            width="390"
            height="50"
            rx="6"
            fill="#192d38"
            stroke={C.teal}
            strokeWidth="1.2"
          />
          <L x="640" y="244" fill={C.teal} size={14} weight={600} anchor="middle">
            Δage = Isalder minus Gassalder = 800 år
          </L>

          <L x="445" y="295" fill={C.fg} size={13} weight={600}>
            To uvurderlige egenskaper ved isen:
          </L>
          <L x="445" y="318" fill={C.muted} size={12}>
            <tspan fill={C.cold} fontWeight="600">
              • Årlige lag:
            </tspan>{" "}
            Telles som årringer i trær → gir ekstremt presis datering.
          </L>
          <L x="445" y="342" fill={C.muted} size={12}>
            <tspan fill={C.warm} fontWeight="600">
              • Luftboblene:
            </tspan>{" "}
            Er ekte forhistorisk atmosfære. CO₂ i isen er en
          </L>
          <L x="455" y="360" fill={C.warm} size={12} weight={600}>
            direkte fysisk måling, ikke en indirekte tolkning!
          </L>
          <L x="445" y="390" fill={C.muted} size={11}>
            (EPICA Dome C dekker 800 000 år og 8 istidssykluser).
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. KvartarTimeSeriesDiagram
 * 800 000 år med temperatur og CO2 fra iskjerner.
 * Viser sagtanntakt, naturlig spenn 172-300 ppm og dagens 425+ ppm hopp.
 */
export function KvartarTimeSeriesDiagram() {
  return (
    <Diagram
      title="800 000 år med temperatur og CO₂ fra EPICA Dome C-iskjernen: sagtanntakt og dagens avvik"
      heading="800 000 år med istider og dagens CO₂-sprang"
      caption="Iskjernedata fra EPICA Dome C i Antarktis viser åtte 100 000-års istidssykluser over de siste 800 000 år. Mønsteret har en karakteristisk sagtannform: En langsom nedkjøling og isoppbygging over 80 000–90 000 år, etterfulgt av en lynrask deglasiasjon på under 10 000 år. Temperatur og CO₂ svinger i tett samspill. Gjennom hele senkvartær har CO₂ aldri vært under 172 ppm eller over 300 ppm. Dagens nivå (>425 ppm) skyter loddrett til værs, fullstendig utenfor det naturlige spennet."
      viewBox="0 0 920 480"
    >
      {() => {
        const x0 = 90;
        const w = 740;
        // 800 ka to 0 ka -> x = x0 + (1 - t/800) * w
        const toX = (ka: number) => x0 + ((800 - ka) / 800) * w;

        // Simplified sawtooth Milankovitch cycles (ka points)
        const pts = [
          [800, 0.2],
          [790, 0.85],
          [740, 0.25],
          [700, 0.15],
          [690, 0.88],
          [640, 0.3],
          [590, 0.18],
          [575, 0.92],
          [530, 0.25],
          [480, 0.18],
          [420, 0.15],
          [405, 0.86],
          [370, 0.3],
          [345, 0.2],
          [330, 0.88],
          [280, 0.28],
          [250, 0.18],
          [240, 0.9],
          [190, 0.25],
          [140, 0.15],
          [125, 0.95],
          [70, 0.35],
          [21, 0.12], // LGM (21 ka)
          [10, 0.88], // Holocene
          [0, 0.88], // Preindustrial
        ];

        // Map to T path (y: 80 to 220, range 140px)
        const pathT = pts
          .map(([ka, val], i) => {
            const x = toX(ka).toFixed(1);
            const y = (220 - val * 125).toFixed(1);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        // Map to CO2 path (y: 250 to 390, range 140px)
        const pathCO2 = pts
          .map(([ka, val], i) => {
            const x = toX(ka).toFixed(1);
            const y = (390 - val * 115).toFixed(1);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        const nowX = toX(0);

        return (
          <>
            {/* Top Title / Legend */}
            <L x="90" y="32" fill={C.cold} size={14} weight={600}>
              — Temperaturavvik (ΔT i °C over Antarktis)
            </L>
            <L x="460" y="32" fill={C.warm} size={14} weight={600}>
              — Atmosfærisk CO₂ (ppm fra luftbobler)
            </L>

            {/* Background Grid & Axis */}
            <rect x={x0} y="50" width={w} height="360" fill="#0d1820" stroke={C.dim} />

            {/* Time grid lines (every 100 ka) */}
            {[800, 700, 600, 500, 400, 300, 200, 100, 0].map((ka) => {
              const x = toX(ka);
              return (
                <g key={ka}>
                  <line
                    x1={x}
                    y1="50"
                    x2={x}
                    y2="410"
                    stroke={C.dim}
                    strokeDasharray={ka === 0 ? "none" : "2 4"}
                  />
                  <L x={x} y="428" fill={C.muted} size={11} anchor="middle">
                    {ka === 0 ? "Nå (0)" : `${ka}k`}
                  </L>
                </g>
              );
            })}
            <L x="500" y="448" fill={C.muted} size={12} anchor="middle">
              Tid (tusen år før nå)
            </L>

            {/* T-curve Y-axis markers */}
            <line x1={x0} y1="95" x2={x0 + w} y2="95" stroke={C.dim} strokeDasharray="2 4" />
            <L x={x0 - 8} y="99" fill={C.cold} size={11} anchor="end">
              +2 °C
            </L>
            <line x1={x0} y1="150" x2={x0 + w} y2="150" stroke={C.dim} strokeDasharray="2 4" />
            <L x={x0 - 8} y="154" fill={C.cold} size={11} anchor="end">
              -4 °C
            </L>
            <line x1={x0} y1="205" x2={x0 + w} y2="205" stroke={C.dim} strokeDasharray="2 4" />
            <L x={x0 - 8} y="209" fill={C.cold} size={11} anchor="end">
              -10 °C
            </L>

            {/* CO2-curve Y-axis markers */}
            <line x1={x0} y1="275" x2={x0 + w} y2="275" stroke={C.dim} strokeDasharray="2 4" />
            <L x={x0 - 8} y="279" fill={C.warm} size={11} anchor="end">
              300 ppm
            </L>
            <line x1={x0} y1="330" x2={x0 + w} y2="330" stroke={C.dim} strokeDasharray="2 4" />
            <L x={x0 - 8} y="334" fill={C.warm} size={11} anchor="end">
              240 ppm
            </L>
            <line x1={x0} y1="375" x2={x0 + w} y2="375" stroke={C.dim} strokeDasharray="2 4" />
            <L x={x0 - 8} y="379" fill={C.warm} size={11} anchor="end">
              180 ppm
            </L>

            {/* Shaded Natural Range for CO2 */}
            <rect
              x={x0}
              y="275"
              width={w}
              height="100"
              fill={C.warm}
              opacity="0.06"
              pointerEvents="none"
            />
            <L x={x0 + 10} y="362" fill={C.warm} size={10} opacity="0.8">
              Naturlig senkvartært spenn: 172–300 ppm
            </L>

            {/* Temperature Curve */}
            <path
              d={pathT}
              fill="none"
              stroke={C.cold}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* CO2 Curve */}
            <path
              d={pathCO2}
              fill="none"
              stroke={C.warm}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Annotations: Sagtannform */}
            <rect
              x="260"
              y="60"
              width="270"
              height="40"
              rx="4"
              fill="#13232c"
              stroke={C.teal}
              strokeWidth="1"
            />
            <L x="395" y="78" fill={C.teal} size={11} weight={600} anchor="middle">
              100 000-års sagtanntakt:
            </L>
            <L x="395" y="93" fill={C.muted} size={10} anchor="middle">
              Langsom isvekst (80–90 ka) → Rask deglasiasjon (&lt;10 ka)
            </L>

            {/* LGM Marker */}
            <circle cx={toX(21)} cy={220 - 0.12 * 125} r="4" fill={C.cold} />
            <L x={toX(21) - 6} y="222" fill={C.cold} size={10} anchor="end">
              LGM (21 ka)
            </L>

            {/* PRESENT CO2 EXPLOSION SPIKE (>425 ppm) */}
            <line
              x1={nowX}
              y1="275"
              x2={nowX}
              y2="190"
              stroke={C.low}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <circle cx={nowX} cy="190" r="5" fill={C.low} />
            <rect
              x="710"
              y="150"
              width="190"
              height="55"
              rx="6"
              fill="#221316"
              stroke={C.low}
              strokeWidth="1.4"
            />
            <L x="805" y="172" fill={C.low} size={12} weight={700} anchor="middle">
              I dag: &gt; 425 ppm!
            </L>
            <L x="805" y="190" fill={C.muted} size={10} anchor="middle">
              Langt over naturlig spenn
            </L>
          </>
        );
      }}
    </Diagram>
  );
}

/**
 * 6. DeglaciationFeedbackDiagram
 * Årsakskjeden ved deglasiasjon: Orbital impuls -> Is-albedo -> Hav/CO2 -> Global oppvarming.
 */
export function DeglaciationFeedbackDiagram() {
  return (
    <Diagram
      title="Årsakskjeden ved deglasiasjon: fra lokal orbital impuls på 65 °N til global oppvarming"
      heading="Hvorfor Milanković blir global: Forsterkende tilbakekoblinger"
      caption="Milanković-innstråling endrer bare fordelingen av sollys og starter smelting på 65 °N. For at hele kloden skal varmes opp og gå ut av en istid, må to kraftige positive tilbakekoblinger tre i kraft: 1) Is-albedo-tilbakekobling: Mindre snø og is gjør overflaten mørkere, slik at mer sollys absorberes. 2) Hav og CO₂-tilbakekobling: Varmere hav og endrede sørlige vinder lufter ut oppløst CO₂ til atmosfæren. Den økte drivhuseffekten varmer opp begge halvkuler. Kontrast til i dag: Under deglasiasjon startet orbitalt pådriv. I dag er det våre CO₂-utslipp som starter oppvarmingen!"
      viewBox="0 0 900 460"
    >
      {(m) => (
        <>
          {/* Step 1: Starteren (Orbital Impuls) */}
          <rect
            x="40"
            y="70"
            width="220"
            height="140"
            rx="8"
            fill="#142834"
            stroke={C.warm}
            strokeWidth="1.8"
          />
          <circle cx="68" cy="98" r="13" fill={C.warm} />
          <L x="68" y="103" fill="#0f171c" size={13} weight={700} anchor="middle">
            1
          </L>
          <L x="92" y="103" fill={C.warm} size={14} weight={600}>
            Orbital impuls
          </L>
          <L x="58" y="132" fill={C.fg} size={12} weight={600}>
            Økt sommersol på 65 °N
          </L>
          <L x="58" y="152" fill={C.muted} size={11}>
            • Milanković flytter sollys.
          </L>
          <L x="58" y="170" fill={C.muted} size={11}>
            • Innlandsis begynner å smelte.
          </L>
          <L x="58" y="192" fill={C.warm} size={11} weight={600}>
            Lokal start i nord.
          </L>

          {/* Arrow from Step 1 to Step 2 */}
          <Arrow d="M 260 140 L 320 140" marker={m.teal} color={C.teal} width={2.4} />

          {/* Step 2 & 3: Forsterkende sløyfer (Center Box) */}
          <rect
            x="320"
            y="40"
            width="320"
            height="260"
            rx="8"
            fill="#0f202b"
            stroke={C.teal}
            strokeWidth="1.8"
          />
          <circle cx="348" cy="68" r="13" fill={C.teal} />
          <L x="348" y="73" fill="#0f171c" size={13} weight={700} anchor="middle">
            2
          </L>
          <L x="372" y="73" fill={C.teal} size={15} weight={600}>
            To positive tilbakekoblinger
          </L>

          {/* Feedback Loop A: Is-albedo */}
          <rect x="340" y="95" width="280" height="85" rx="6" fill="#152c3a" />
          <L x="355" y="118" fill="#e0f2fe" size={13} weight={600}>
            A. Is-albedo-tilbakekobling
          </L>
          <L x="355" y="138" fill={C.muted} size={11}>
            Is smelter → mørkere land/hav
          </L>
          <L x="355" y="156" fill={C.teal} size={11} weight={600}>
            → Mer sollys tas opp → Varmere
          </L>

          {/* Feedback Loop B: Havets CO2 */}
          <rect x="340" y="195" width="280" height="90" rx="6" fill="#1e2c26" stroke={C.warm} />
          <L x="355" y="218" fill={C.warm} size={13} weight={600}>
            B. Havets karbonpumpe (CO₂)
          </L>
          <L x="355" y="238" fill={C.muted} size={11}>
            Varmere hav + endret sirkulasjon
          </L>
          <L x="355" y="256" fill={C.muted} size={11}>
            → Havet avgasser CO₂ til lufta
          </L>
          <L x="355" y="274" fill={C.warm} size={11} weight={600}>
            → Forsterket global drivhuseffekt!
          </L>

          {/* Arrow from Step 2 to Step 3 */}
          <Arrow d="M 640 170 L 700 170" marker={m.warm} color={C.warm} width={2.4} />

          {/* Step 4: Utfall (Global Mellomistid) */}
          <rect
            x="700"
            y="70"
            width="170"
            height="140"
            rx="8"
            fill="#2c1f18"
            stroke={C.warm}
            strokeWidth="1.8"
          />
          <circle cx="725" cy="98" r="13" fill={C.warm} />
          <L x="725" y="103" fill="#0f171c" size={13} weight={700} anchor="middle">
            3
          </L>
          <L x="748" y="103" fill={C.warm} size={14} weight={600}>
            Mellomistid
          </L>
          <L x="715" y="132" fill={C.fg} size={12} weight={600}>
            Global oppvarming
          </L>
          <L x="715" y="152" fill={C.muted} size={11}>
            • Begge poler varmes.
          </L>
          <L x="715" y="170" fill={C.muted} size={11}>
            • Havnivå stiger ~120m.
          </L>
          <L x="715" y="192" fill={C.warm} size={11} weight={600}>
            Full deglasiasjon.
          </L>

          {/* Bottom Banner: Past vs Today comparison */}
          <rect
            x="40"
            y="320"
            width="830"
            height="115"
            rx="8"
            fill="#121b22"
            stroke={C.dim}
            strokeWidth="1.4"
          />
          <L x="60" y="348" fill={C.fg} size={14} weight={600}>
            Nøkkelinnsikt for Geofag 2: Fortid mot nåtid
          </L>

          <rect x="60" y="362" width="370" height="58" rx="4" fill="#0b171e" />
          <L x="75" y="384" fill={C.teal} size={12} weight={600}>
            Fortidens deglasiasjon:
          </L>
          <L x="75" y="404" fill={C.muted} size={11}>
            Orbital innstråling startet → CO₂ og albedo forsterket.
          </L>

          <rect x="470" y="362" width="380" height="58" rx="4" fill="#1c1214" stroke={C.low} />
          <L x="485" y="384" fill={C.low} size={12} weight={600}>
            Dagens globale oppvarming:
          </L>
          <L x="485" y="404" fill={C.fg} size={11}>
            Menneskeskapt CO₂ starter pådrivet direkte. Orbitale baner kjøler!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. AbruptClimateChangeDiagram
 * Terskler og brå klimaendringer: Smeltevannsflom, ferskvannslokk i Nord-Atlanteren og AMOC-kollaps.
 */
export function AbruptClimateChangeDiagram() {
  return (
    <Diagram
      title="Terskler og brå klimaendringer: smeltevannsflom, ferskvannslokk og AMOC-kollaps"
      heading="Når klimasystemet vipper: Smeltevann og AMOC"
      caption="Under tilbaketrekkingen av det nordamerikanske isdekket ble gigantiske bresjøer (som Lake Agassiz) demmet opp av isrygger. Da isdemningen brast, strømmet enorme mengder ferskvann ut i Nord-Atlanteren (Yngre Dryas for 12 800 år siden og 8,2 ka-hendelsen). Det lette ferskvannet la seg som et lokk over havet og hindret overflatevannet i å synke (ingen dypvannsdannelse). Dette bremset AMOC (den atlantiske omveltningssirkulasjonen), kuttet varmetransporten nordover og kastet Skandinavia tilbake i intens kulde på få tiår."
      viewBox="0 0 900 460"
    >
      {(m) => (
        <>
          {/* North American Ice Sheet & Proglacial Lake (Left) */}
          <path
            d="M 40 180 Q 110 90 190 150 L 190 280 L 40 280 Z"
            fill="#224250"
            stroke={C.cold}
            strokeWidth="2"
          />
          <L x="110" y="160" fill={C.white} size={13} weight={600} anchor="middle">
            Laurentide-isdekket
          </L>

          {/* Dammed Glacial Lake (Lake Agassiz) */}
          <rect x="190" y="175" width="85" height="105" fill="#1b4d66" />
          <L x="232" y="215" fill={C.rain} size={12} weight={600} anchor="middle">
            Bresjø
          </L>
          <L x="232" y="232" fill={C.muted} size={10} anchor="middle">
            (Lake Agassiz)
          </L>

          {/* Ice Dam Bursting */}
          <line
            x1="275"
            y1="170"
            x2="275"
            y2="280"
            stroke={C.low}
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          <L x="275" y="150" fill={C.low} size={11} weight={600} anchor="middle">
            Isdam brister!
          </L>

          {/* Catastrophic Freshwater Flush Arrow into Atlantic */}
          <Arrow d="M 285 220 Q 370 200 440 220" marker={m.low} color={C.low} width={3.4} />
          <L x="360" y="195" fill={C.low} size={12} weight={600} anchor="middle">
            Enorm ferskvannspuls
          </L>

          {/* North Atlantic Ocean Box (Center-Right) */}
          <rect
            x="440"
            y="90"
            width="420"
            height="210"
            rx="8"
            fill="#0c1a24"
            stroke={C.dim}
            strokeWidth="1.6"
          />
          <L x="650" y="118" fill={C.teal} size={15} weight={600} anchor="middle">
            Nord-Atlanteren og De nordiske hav
          </L>

          {/* Freshwater Cap Layer */}
          <rect x="460" y="135" width="380" height="35" rx="4" fill="#32677d" />
          <L x="650" y="157" fill="#e0f2fe" size={12} weight={600} anchor="middle">
            Ferskvannslokk (lav saltholdighet = lav tetthet)
          </L>

          {/* Blocked Deep Water Formation */}
          <circle cx="750" cy="205" r="22" fill="#221316" stroke={C.low} strokeWidth="1.8" />
          <path d="M 738 193 L 762 217 M 762 193 L 738 217" stroke={C.low} strokeWidth="2.4" />
          <L x="750" y="245" fill={C.low} size={11} weight={600} anchor="middle">
            Dypvannsdannelse stanser!
          </L>
          <L x="750" y="260" fill={C.muted} size={10} anchor="middle">
            (Vannet er for lett til å synke)
          </L>

          {/* Weakened AMOC Flow Arrow */}
          <path
            d="M 480 260 Q 580 250 670 240"
            fill="none"
            stroke={C.warm}
            strokeWidth="2.4"
            strokeDasharray="4 4"
          />
          <L x="560" y="278" fill={C.warm} size={11}>
            Svekket Golfstrøm/AMOC-transport
          </L>

          {/* European Impact / Cold Plunge Summary */}
          <rect
            x="40"
            y="320"
            width="820"
            height="115"
            rx="8"
            fill="#121e27"
            stroke={C.dim}
            strokeWidth="1.4"
          />
          <L x="60" y="348" fill={C.fg} size={14} weight={600}>
            Konsekvenser: Yngre Dryas (12,8–11,6 ka) og 8,2 ka-hendelsen
          </L>
          <L x="60" y="372" fill={C.cold} size={12}>
            • Varmetransporten mot Nord-Europa kuttes på få tiår.
          </L>
          <L x="60" y="392" fill={C.muted} size={12}>
            • Skandinavia kastes tilbake i arktisk kulde mens resten av kloden fortsetter oppvarming.
          </L>
          <L x="60" y="412" fill={C.warm} size={12} weight={600}>
            • Bevis for at klimasystemet har ikke-lineære terskler (tipping points) som kan utløses
            brått!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * Samlekomponent for bakoverkompatibilitet
 */
export function PaleoDiagram() {
  return <MilankovitchCyclesDiagram />;
}

