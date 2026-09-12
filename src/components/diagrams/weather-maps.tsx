import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. RealisticSynopticChartDiagram
 * Realistisk synoptisk bakkekart over Nord-Atlanteren, Norskehavet og Skandinavia.
 * Viser isobarer med 5 hPa intervall (970 til 1025 hPa), et dypt lavtrykk (968 hPa)
 * vest for Stad, høytrykk over Russland/Finland, komplett frontsystem (varmfront,
 * kaldfront, okklusjon, varm sektor og tråg), animert vindstrøm, samt faktiske stasjonsplott.
 */
export function RealisticSynopticChartDiagram() {
  return (
    <Diagram
      title="Synoptisk bakkekart over Nord-Atlanteren og Skandinavia med isobarer, fronter og stasjonsplott"
      heading="Det synoptiske bakkekartet: Værets anatomiske kart"
      caption="Et offisielt synoptisk bakkekart (overflateanalyse) fra Meteorologisk institutt. Isobarene (hvite/grå linjer) binder sammen steder med samme lufttrykk i havnivå i 5 hPa-intervaller. Tette isobarer sør og vest for lavtrykket L1 (968 hPa) viser en voldsom trykkgradient som gir full storm på kysten. Vinden blåser mot klokken og krysser isobarene 20°–30° inn mot lavtrykket som følge av bakkefriksjon. Frontsystemet etter Bergensskolens modell viser en varmfront (rød med halvsirkler) over Sørøst-Norge, en kaldfront (blå med trekanter) over Nordsjøen, en okklusjon (lilla med vekslende symboler) mot lavtrykkssenteret, samt stasjonsplott med vindpiler, temperatur og lufttrykk."
      viewBox="0 0 940 560"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Hav- og landbakgrunn */}
            <linearGradient id="syn-ocean" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#08131c" />
              <stop offset="50%" stopColor="#0d1b26" />
              <stop offset="100%" stopColor="#112433" />
            </linearGradient>

            {/* Varm sektor transparent flate */}
            <linearGradient id="syn-warm-sector" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.08" />
            </linearGradient>

            {/* Nedbørssone bak/rundt frontene */}
            <radialGradient id="syn-rain-zone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Bakgrunnsflate */}
          <rect x="25" y="25" width="890" height="510" rx="10" fill="url(#syn-ocean)" stroke="#1a2d3d" strokeWidth="1.2" />

          {/* GEOGRAFISKE KYSTKONTURER */}
          {/* Storbritannia & Irland */}
          <path
            d="M 360 410 C 370 380 390 350 420 340 C 440 330 460 360 450 390 C 430 420 400 450 370 440 Z"
            fill="#182c22"
            stroke="#2e4d3b"
            strokeWidth="1.4"
            opacity="0.85"
          />
          <path
            d="M 320 400 C 340 380 350 400 350 420 C 330 440 310 420 320 400 Z"
            fill="#182c22"
            stroke="#2e4d3b"
            strokeWidth="1.2"
            opacity="0.85"
          />
          <L x="395" y="380" fill={C.muted} size={11} weight={600}>UK</L>

          {/* Island */}
          <path
            d="M 170 180 C 210 160 250 180 260 205 C 240 225 190 220 170 200 Z"
            fill="#182c22"
            stroke="#2e4d3b"
            strokeWidth="1.4"
            opacity="0.85"
          />
          <L x="215" y="195" fill={C.muted} size={11} weight={600} anchor="middle">Island</L>

          {/* NORGE OG SKANDINAVIA */}
          <path
            d="M 520 480 C 530 450 540 400 550 350 C 560 300 580 260 620 220 C 660 180 720 130 760 90 C 780 80 820 90 840 120 C 830 150 780 180 750 240 C 720 300 700 380 670 450 C 650 480 600 490 560 480 Z"
            fill="#1b3226"
            stroke="#2e543e"
            strokeWidth="1.6"
            opacity="0.9"
          />
          <L x="660" y="270" fill="#f8fafc" size={13} weight={800}>Norge</L>
          <L x="730" y="310" fill={C.muted} size={11}>Sverige</L>

          {/* VARM SEKTOR POLARFRONTEN (Transparent fargeflate) */}
          <path
            d="M 380 250 C 440 280 500 320 560 360 C 520 400 480 430 440 480 C 410 430 390 340 380 250 Z"
            fill="url(#syn-warm-sector)"
          />
          <L x="450" y="390" fill={C.warm} size={13} weight={800}>Varm sektor</L>
          <L x="450" y="406" fill={C.warm} size={10}>Mild, fuktig maritim luft (mT)</L>

          {/* ISOBARFELT RUNDT LAVTRYKKET (L1 = 968 hPa ved posisjon x=340, y=210) */}
          {/* 970 hPa */}
          <ellipse cx="340" cy="210" rx="60" ry="42" fill="none" stroke={C.low} strokeWidth="2.4" />
          <L x="340" y="164" fill={C.low} size={10} weight={700} anchor="middle">970</L>

          {/* 975 hPa */}
          <ellipse cx="340" cy="210" rx="100" ry="72" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="340" y="134" fill={C.low} size={10} weight={700} anchor="middle">975</L>

          {/* 980 hPa */}
          <ellipse cx="340" cy="210" rx="145" ry="105" fill="none" stroke="#e2e8f0" strokeWidth="1.8" />
          <L x="340" y="101" fill="#cbd5e1" size={10} anchor="middle">980</L>

          {/* 985 hPa */}
          <ellipse cx="340" cy="210" rx="195" ry="142" fill="none" stroke="#94a3b8" strokeWidth="1.6" />
          <L x="340" y="64" fill={C.muted} size={10} anchor="middle">985</L>

          {/* 990 hPa */}
          <ellipse cx="350" cy="215" rx="250" ry="180" fill="none" stroke="#64748b" strokeWidth="1.4" />
          <L x="350" y="31" fill={C.muted} size={10} anchor="middle">990</L>

          {/* 995 hPa */}
          <ellipse cx="360" cy="220" rx="310" ry="220" fill="none" stroke="#475569" strokeWidth="1.2" />
          <L x="70" y="220" fill={C.muted} size={10}>995</L>

          {/* 1000 hPa */}
          <path d="M 60 120 C 200 40 500 40 680 100 C 720 200 700 350 670 480" fill="none" stroke="#334155" strokeWidth="1.2" />
          <L x="680" y="100" fill={C.muted} size={10}>1000</L>

          {/* 1005, 1010 hPa mot Skandinavia */}
          <path d="M 520 490 C 580 430 620 350 670 250 C 720 180 770 120 830 110" fill="none" stroke="#334155" strokeWidth="1.2" />
          <L x="760" y="130" fill={C.muted} size={10}>1005</L>

          {/* 1015, 1020 hPa mot Russland */}
          <path d="M 660 500 C 710 440 760 360 810 270 C 840 220 870 180 890 170" fill="none" stroke="#334155" strokeWidth="1.2" />
          <L x="825" y="270" fill={C.muted} size={10}>1015</L>

          {/* SENTRALT LAVTRYKK (L1) */}
          <L x="340" y="212" fill={C.low} size={30} weight={900} anchor="middle">L₁</L>
          <L x="340" y="228" fill="#f8fafc" size={12} weight={800} anchor="middle">968 hPa</L>

          {/* HØYTRYKK OVER RUSSLAND (H1) */}
          <ellipse cx="850" cy="110" rx="45" ry="32" fill="none" stroke={C.warm} strokeWidth="2" />
          <L x="850" y="116" fill={C.warm} size={26} weight={900} anchor="middle">H₁</L>
          <L x="850" y="132" fill={C.warm} size={11} weight={700} anchor="middle">1028 hPa</L>

          {/* FRONTSYSTEMET MED OFFISIELLE SYMBOLER */}
          {/* 1. Okklusjon fra L1 (340, 210) til trippelpunkt (380, 250) */}
          <path d="M 340 210 C 355 220 370 235 380 250" fill="none" stroke="#a855f7" strokeWidth="4" />
          <polygon points="352,221 359,212 363,225" fill="#a855f7" />
          <path d="M 368 234 A 6 6 0 0 0 377 241 Z" fill="#a855f7" />
          <L x="325" y="245" fill="#a855f7" size={11} weight={800}>Okklusjon</L>

          {/* 2. Varmfront fra trippelpunkt (380, 250) over Nordsjøen til Sør-Norge (560, 360) */}
          <path d="M 380 250 C 430 280 490 320 560 360" fill="none" stroke={C.low} strokeWidth="4" />
          {/* Halvsirkler på varmfronten pekende mot nordøst (i fartsretningen) */}
          <path d="M 420 274 A 8 8 0 0 0 434 283 Z" fill={C.low} />
          <path d="M 480 312 A 8 8 0 0 0 494 321 Z" fill={C.low} />
          <path d="M 535 344 A 8 8 0 0 0 549 353 Z" fill={C.low} />
          <L x="500" y="300" fill={C.low} size={12} weight={800}>Varmfront</L>

          {/* Jevnt nedbørsfelt foran varmfronten */}
          <ellipse cx="530" cy="310" rx="55" ry="35" fill="url(#syn-rain-zone)" opacity="0.8" />
          <L x="530" y="305" fill="#38bdf8" size={10} weight={700} anchor="middle">Bredt silregnbelte</L>

          {/* 3. Kaldfront fra trippelpunkt (380, 250) sørover mot Nordsjøen/UK (440, 480) */}
          <path d="M 380 250 C 400 320 420 400 440 480" fill="none" stroke={C.cold} strokeWidth="4" />
          {/* Trekanter på kaldfronten pekende mot øst/fartsretningen */}
          <polygon points="390,290 404,295 393,306" fill={C.cold} />
          <polygon points="407,360 421,365 410,376" fill={C.cold} />
          <polygon points="423,430 437,435 426,446" fill={C.cold} />
          <L x="420" y="340" fill={C.cold} size={12} weight={800}>Kaldfront</L>

          {/* 4. Trog (Trough) bak kaldfronten (ustabilt bygeområde) */}
          <path d="M 300 280 C 315 340 330 400 340 460" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
          <L x="305" y="380" fill={C.warm} size={11} weight={700}>Tråg (byger/vindkast)</L>

          {/* ANIMERTE VINDSTRØMMER (Syklonal rotasjon og bakkefriksjon inn mot L) */}
          <path d="M 520 180 C 450 140 370 145 320 180" fill="none" stroke="#38bdf8" strokeWidth="2.2" className="model-wind-flow" />
          <path d="M 230 220 C 235 280 270 320 330 310" fill="none" stroke="#38bdf8" strokeWidth="2.2" className="model-wind-flow" />
          <path d="M 460 230 C 400 200 370 210 350 230" fill="none" stroke="#38bdf8" strokeWidth="2.5" className="model-wind-fast" />

          {/* VINDVEKTOR-PIL FOR FULL STORM VEST FOR VESTLANDET */}
          <Arrow d="M 430 270 L 480 260" marker={m.warm} color={C.warm} width={3.2} />
          <L x="460" y="245" fill={C.warm} size={11} weight={800}>Full storm (26 m/s)</L>

          {/* FAKTISKE STASJONSPLOTT PÅ KARTET */}
          {/* Stasjon 1: Bergen (x=550, y=360) - foran kaldfronten i varm sektor */}
          <g transform="translate(550, 370)">
            <circle cx="0" cy="0" r="7" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
            <path d="M 0 0 L 7 0 A 7 7 0 0 1 0 7 Z" fill="#f8fafc" /> {/* 6/8 skydekke */}
            {/* T og Td */}
            <L x="-11" y="-4" fill={C.warm} size={10} weight={700} anchor="end">12</L>
            <L x="-11" y="11" fill={C.cold} size={10} weight={700} anchor="end">11</L>
            {/* Trykk 988 hPa */}
            <L x="11" y="-4" fill="#f8fafc" size={10} weight={700}>880</L>
            <L x="11" y="11" fill={C.low} size={9}>-42\</L>
            {/* Vindpil sørlig kuling */}
            <line x1="0" y1="7" x2="0" y2="35" stroke="#f8fafc" strokeWidth="1.6" />
            <line x1="0" y1="35" x2="-10" y2="31" stroke="#f8fafc" strokeWidth="1.6" />
            <line x1="0" y1="30" x2="-10" y2="26" stroke="#f8fafc" strokeWidth="1.6" />
            <L x="25" y="20" fill="#f8fafc" size={10} weight={800}>Bergen</L>
          </g>

          {/* Stasjon 2: Oslo/Blindern (x=620, y=390) - foran varmfronten */}
          <g transform="translate(620, 390)">
            <circle cx="0" cy="0" r="7" fill="#f8fafc" stroke="#f8fafc" strokeWidth="1.5" /> {/* 8/8 overskyet */}
            <L x="-11" y="-4" fill={C.warm} size={10} weight={700} anchor="end">4</L>
            <L x="-11" y="11" fill={C.cold} size={10} weight={700} anchor="end">3</L>
            <L x="11" y="-4" fill="#f8fafc" size={10} weight={700}>012</L>
            <L x="11" y="11" fill={C.low} size={9}>-25\</L>
            {/* Vindpil sørøstlig frisk bris */}
            <line x1="5" y1="5" x2="25" y2="25" stroke="#f8fafc" strokeWidth="1.6" />
            <line x1="25" y1="25" x2="16" y2="27" stroke="#f8fafc" strokeWidth="1.6" />
            <line x1="21" y1="21" x2="13" y2="23" stroke="#f8fafc" strokeWidth="1.6" />
            <L x="15" y="-12" fill="#f8fafc" size={10} weight={800}>Oslo</L>
          </g>

          {/* Stasjon 3: Ekofisk Nordsjøen (x=460, y=430) - i varm sektor */}
          <g transform="translate(460, 440)">
            <circle cx="0" cy="0" r="7" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#f8fafc" /> {/* 7/8 */}
            <L x="-11" y="-4" fill={C.warm} size={10} weight={700} anchor="end">13</L>
            <L x="-11" y="11" fill={C.cold} size={10} weight={700} anchor="end">13</L>
            <L x="11" y="-4" fill="#f8fafc" size={10} weight={700}>985</L>
            <L x="11" y="11" fill={C.muted} size={9}>-05—</L>
            <L x="15" y="18" fill="#f8fafc" size={10} weight={800}>Ekofisk</L>
          </g>

          {/* FORKLARENDE BUNNSTRIPE */}
          <g transform="translate(45, 495)">
            <rect x="0" y="0" width="850" height="34" rx="6" fill="#0d1b26" stroke="#23384a" />
            <L x="20" y="21" fill={C.teal} size={11} weight={700}>Metodisk tolkning:</L>
            <L x="135" y="21" fill="#cbd5e1" size={11}>
              1. Finn L (968 hPa) og H (1028 hPa) · 2. Beregn vind fra isobaravstand (storm på Vestlandet) · 3. Analyser frontsekvensen · 4. Forutsi adveksjon mot NE.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. StationModelExplainedDiagram
 * WMO Stasjonsmodellen (plottemodell) i stor detalj.
 * Viser skydekkesirkel, temperatur, duggpunkt, trykktall (dekoding), trykktendens,
 * værtype (ww) og vindflagg (wind barb), med fullstendige forklaringskort.
 */
export function StationModelExplainedDiagram() {
  return (
    <Diagram
      title="WMO Stasjonsmodell (plottemodell) i detalj med temperatur, trykk, vind og skydekke"
      heading="Slik dekoder du en meteorologisk stasjonsmodell (WMO)"
      caption="På meteorologiske kart er observasjoner fra hver værstasjon komprimert inn i en standardisert stasjonsmodell (WMO Station Plot). 1) Sirkelen i midten angir skydekke i åttedeler (oktas). 2) Øverst til venstre: lufttemperatur (12 °C). 3) Nederst til venstre: duggpunkt (11 °C). Liten forskjell betyr nær 100 % relativ fuktighet (tåke eller regn). 4) Øverst til høyre: lufttrykk i tiendedels hPa uten 10- eller 9-tall foran («084» betyr 1008,4 hPa). 5) Nederst til høyre: trykkendring siste 3 timer (-3,4 hPa med fallende kurve). 6) Venstre symbol: nåværende vær ww (tre prikker = moderat regn). 7) Vindpil: peker i retningen luften kommer fra, og fjærene angir hastighet (halv fjær = 5 knop, hel = 10 knop, flagg = 50 knop)."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#09131d" stroke="#1d2e3f" strokeWidth="1.2" />

          {/* VENSTRE PANEL: DEN FORSTØRREDE STASJONSMODELLEN */}
          <g transform="translate(60, 60)">
            <rect x="0" y="0" width="460" height="400" rx="8" fill="#0d1b26" stroke={C.teal} strokeWidth="1.6" />
            <rect x="0" y="0" width="460" height="36" rx="8" fill="#132738" />
            <L x="18" y="24" fill={C.teal} size={13} weight={800}>Stasjonsmodellen (WMO Station Plot)</L>
            <L x="440" y="24" fill={C.muted} size={11} anchor="end">Eksempel: Kyststasjon i Norskehavet</L>

            {/* SENTRAL STASJONSSIRKEL MED PLOTT */}
            <g transform="translate(230, 200)">
              {/* Skydekkesirkel (7/8 oktas) */}
              <circle cx="0" cy="0" r="28" fill="#09141f" stroke="#f8fafc" strokeWidth="3" />
              {/* Sektor 7/8 fylt */}
              <path d="M 0 0 L 0 -28 A 28 28 0 1 1 -28 0 Z" fill="#38bdf8" opacity="0.9" />
              <L x="0" y="4" fill="#f8fafc" size={12} weight={800} anchor="middle">7/8</L>

              {/* 1. TEMPERATUR (°C) - Øverst til venstre */}
              <L x="-45" y="-12" fill={C.warm} size={22} weight={800} anchor="end">12</L>
              <line x1="-42" y1="-18" x2="-80" y2="-45" stroke={C.warm} strokeWidth="1.4" />
              <L x="-85" y="-50" fill={C.warm} size={12} weight={700} anchor="end">Temperatur: 12 °C</L>

              {/* 2. DUGGPUNKT (°C) - Nederst til venstre */}
              <L x="-45" y="28" fill={C.cold} size={22} weight={800} anchor="end">11</L>
              <line x1="-42" y1="22" x2="-80" y2="55" stroke={C.cold} strokeWidth="1.4" />
              <L x="-85" y="60" fill={C.cold} size={12} weight={700} anchor="end">Duggpunkt: 11 °C</L>
              <L x="-85" y="74" fill={C.muted} size={10} anchor="end">Depresjon = 1 °C (T-Td) · Mettet luft!</L>

              {/* 3. LUFTRYKK (PPP) - Øverst til høyre */}
              <L x="45" y="-12" fill="#f8fafc" size={22} weight={800}>084</L>
              <line x1="42" y1="-18" x2="85" y2="-45" stroke="#f8fafc" strokeWidth="1.4" />
              <L x="90" y="-50" fill="#f8fafc" size={12} weight={700}>Trykk: 1008,4 hPa</L>
              <L x="90" y="-36" fill={C.muted} size={10}>Dekodes: 084 → 1008,4 hPa</L>

              {/* 4. TRYKKTENDENS (pp) - Nederst til høyre */}
              <g transform="translate(45, 20)">
                <L x="0" y="8" fill={C.low} size={18} weight={800}>-34</L>
                {/* Fallende kurvestrek */}
                <path d="M 40 -2 L 55 -2 L 70 12" fill="none" stroke={C.low} strokeWidth="2.5" />
              </g>
              <line x1="42" y1="22" x2="85" y2="55" stroke={C.low} strokeWidth="1.4" />
              <L x="90" y="58" fill={C.low} size={12} weight={700}>Tendens siste 3 timer:</L>
              <L x="90" y="72" fill="#f8fafc" size={11}>-3,4 hPa (Raskt fallende!)</L>

              {/* 5. VÆRTYPE (ww) - Til venstre for sirkel */}
              {/* Tre fylte prikker = moderat sammenhengende regn */}
              <g transform="translate(-40, 2)">
                <circle cx="-6" cy="0" r="3" fill="#38bdf8" />
                <circle cx="0" cy="0" r="3" fill="#38bdf8" />
                <circle cx="6" cy="0" r="3" fill="#38bdf8" />
              </g>
              <L x="-55" y="5" fill="#38bdf8" size={11} weight={700} anchor="end">Moderat regn</L>

              {/* 6. VINDPIL (Sørvest 25 knop) */}
              {/* Skaftet peker mot sørvest (ned og til venstre i 225 grader) */}
              <line x1="-20" y1="20" x2="-80" y2="80" stroke="#f8fafc" strokeWidth="2.6" />
              {/* Første hele fjær (10 knop) */}
              <line x1="-80" y1="80" x2="-95" y2="65" stroke="#f8fafc" strokeWidth="2.6" />
              {/* Andre hele fjær (10 knop) */}
              <line x1="-70" y1="70" x2="-85" y2="55" stroke="#f8fafc" strokeWidth="2.6" />
              {/* Halv fjær (5 knop) */}
              <line x1="-60" y1="60" x2="-68" y2="52" stroke="#f8fafc" strokeWidth="2.6" />

              <line x1="-80" y1="80" x2="-110" y2="105" stroke="#f8fafc" strokeWidth="1.4" />
              <L x="-115" y="115" fill="#f8fafc" size={12} weight={700} anchor="end">Vind: Sørvest 25 knop (13 m/s)</L>
              <L x="-115" y="129" fill={C.muted} size={10} anchor="end">Skaft peker mot SW (hvor vinden kommer fra)</L>
            </g>
          </g>

          {/* HØYRE PANEL: DEKODINGSTABELLER OG REGLER */}
          <g transform="translate(540, 60)">
            <rect x="0" y="0" width="375" height="400" rx="8" fill="#0d1b26" stroke={C.warm} strokeWidth="1.6" />
            <rect x="0" y="0" width="375" height="36" rx="8" fill="#261b0c" />
            <L x="18" y="24" fill={C.warm} size={13} weight={800}>Regler for avlesning av stasjonsplott</L>

            {/* TABELL 1: VINDSTYRKE (WIND BARBS) */}
            <g transform="translate(18, 50)">
              <L x="0" y="0" fill={C.warm} size={12} weight={800}>1. Vindpiler og fjær (Knop og m/s):</L>

              <g transform="translate(0, 15)">
                {/* 5 knop */}
                <line x1="10" y1="12" x2="40" y2="12" stroke="#f8fafc" strokeWidth="2" />
                <line x1="40" y1="12" x2="40" y2="4" stroke="#f8fafc" strokeWidth="2" />
                <L x="55" y="15" fill="#cbd5e1" size={11}>Halv fjær = <strong>5 knop</strong> (2,5 m/s)</L>

                {/* 10 knop */}
                <line x1="10" y1="32" x2="40" y2="32" stroke="#f8fafc" strokeWidth="2" />
                <line x1="40" y1="32" x2="40" y2="18" stroke="#f8fafc" strokeWidth="2" />
                <L x="55" y="35" fill="#cbd5e1" size={11}>Hel fjær = <strong>10 knop</strong> (5 m/s)</L>

                {/* 50 knop stormflagg */}
                <line x1="10" y1="52" x2="40" y2="52" stroke="#f8fafc" strokeWidth="2" />
                <polygon points="40,52 40,36 28,52" fill="#f8fafc" />
                <L x="55" y="55" fill={C.warm} size={11} weight={700}>Trekantflagg = 50 knop (25 m/s, storm!)</L>
              </g>
            </g>

            {/* TABELL 2: TRYKKTALL-REGLEN (DEKODING) */}
            <g transform="translate(18, 145)">
              <rect x="0" y="0" width="340" height="100" rx="6" fill="#132330" stroke="#253d52" />
              <L x="12" y="20" fill={C.teal} size={12} weight={800}>2. «Gyllen regel» for trykktallet (PPP):</L>
              <L x="12" y="38" fill="#cbd5e1" size={11}>Siste siffer er alltid tidels hPa. Sett komma før siste tall:</L>
              <L x="12" y="56" fill={C.warm} size={11} weight={700}>• Hvis tallet starter med 0–5: Sett 10 foran</L>
              <L x="25" y="70" fill={C.muted} size={10}>Eks: «132» → 1013,2 hPa · «024» → 1002,4 hPa</L>
              <L x="12" y="86" fill="#38bdf8" size={11} weight={700}>• Hvis tallet starter med 6–9: Sett 9 foran</L>
              <L x="25" y="100" fill={C.muted} size={10}>Eks: «984» → 998,4 hPa · «870» → 987,0 hPa</L>
            </g>

            {/* TABELL 3: VÆRSYMBOLER */}
            <g transform="translate(18, 275)">
              <L x="0" y="0" fill={C.sand} size={12} weight={800}>3. De vanligste værsymbolene (ww):</L>
              <g transform="translate(0, 15)">
                <L x="10" y="16" fill="#38bdf8" size={14} weight={800}>• •</L>
                <L x="35" y="14" fill="#cbd5e1" size={11}>Lett regn</L>

                <L x="110" y="16" fill="#38bdf8" size={14} weight={800}>• • •</L>
                <L x="145" y="14" fill="#cbd5e1" size={11}>Moderat regn</L>

                <L x="230" y="16" fill="#f8fafc" size={14} weight={800}>* *</L>
                <L x="255" y="14" fill="#cbd5e1" size={11}>Snøvær</L>

                <L x="10" y="40" fill={C.muted} size={14} weight={800}>= =</L>
                <L x="35" y="38" fill="#cbd5e1" size={11}>Tåke</L>

                <L x="110" y="40" fill={C.sand} size={14} weight={800}>, ,</L>
                <L x="135" y="38" fill="#cbd5e1" size={11}>Yr (drizzle)</L>

                <L x="230" y="40" fill={C.warm} size={14} weight={800}>⚡</L>
                <L x="255" y="38" fill={C.warm} size={11} weight={700}>Tordenvær</L>
              </g>
            </g>

            {/* SKYDEKKE OKTAS MERKNAD */}
            <g transform="translate(18, 355)">
              <L x="0" y="0" fill={C.muted} size={10}>
                Skydekke oppgis i åttedeler (oktas): 0/8 = skyfritt, 4/8 = halvskyet, 8/8 = overskyet.
              </L>
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. FrontVerticalProfileDiagram
 * Det klassiske 1500 km vertikale tverrsnittet gjennom en polarfrontsyklon (0 til 12 km høyde).
 * Viser varmfrontens slake kile (1:150) med skysekvens (Ci -> Cs -> As -> Ns) og jevn nedbør,
 * varm sektor (Sc), samt kaldfrontens bratte kile (1:50) med Cumulonimbus, torden og byger.
 */
export function FrontVerticalProfileDiagram() {
  return (
    <Diagram
      title="Vertikalt atmosfærisk tverrsnitt gjennom en polarfrontsyklon (1500 km profil)"
      heading="Vertikalt tverrsnitt: Skyer, temperatur og nedbør gjennom frontene"
      caption="Tverrsnitt gjennom en moden polarfrontsyklon fra vest (venstre) til øst (høyre) over en avstand på ca. 1500 km. 1) Varmfronten (høyre) har en svært slak helning (1:150–1:200). Den varme, fuktige luften glir langsomt oppover den tilbaketrekkende kaldluften. Dette danner en karakteristisk skysekvens over hundrevis av kilometer: Høye fjærskyer (Cirrus) varsler fronten 800 km unna, etterfulgt av slørskyer (Cirrostratus med halo), lagskyer (Altostratus) og til slutt tykke regnskyer (Nimbostratus) med vedvarende, jevnt silregn. 2) Varm sektor (midten): Mild luft, spredt yr eller stratocumulus. 3) Kaldfronten (venstre) har en bratt helning (1:50). Den tunge polarluften pløyer brutalt inn under varmluften og tvinger den voldsomt til værs. Dette utløser opptårnende tordenskyer (Cumulonimbus) med kraftige byger, hagl og vindkast, etterfulgt av oppklarning i kaldluften bak."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="vp-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#081018" />
              <stop offset="60%" stopColor="#112233" />
              <stop offset="100%" stopColor="#1e3448" />
            </linearGradient>

            <linearGradient id="vp-warm-air" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="vp-cold-east" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="vp-cold-west" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
            </linearGradient>

            {/* Cumulonimbus gradient */}
            <linearGradient id="vp-cb-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.98" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsatmosfære */}
          <rect x="25" y="25" width="890" height="470" rx="10" fill="url(#vp-sky)" stroke="#1c2d3d" strokeWidth="1.2" />

          {/* HØYDESKALA PÅ VENSTRE SIDE (0 til 12 km) */}
          <g transform="translate(65, 50)">
            {[
              { y: 30, km: "12 km · Tropopause" },
              { y: 110, km: "9 km · Cirrus (Ci)" },
              { y: 200, km: "6 km · Altostratus (As)" },
              { y: 290, km: "3 km · Nimbostratus (Ns)" },
              { y: 380, km: "0 km · Bakkenivå" },
            ].map((tick, idx) => (
              <g key={`vp-h-${idx}`}>
                <line x1="0" y1={tick.y} x2="820" y2={tick.y} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <L x="-8" y={tick.y + 4} fill={C.muted} size={11} anchor="end">{tick.km}</L>
              </g>
            ))}
          </g>

          {/* HOVEDPROFIL FOR VARME OG KALDE LUFTSØYLER */}
          {/* 1. Bakkenivå */}
          <rect x="65" y="430" width="820" height="35" fill="#14261d" stroke="#2a4535" strokeWidth="1.5" />
          <L x="75" y="452" fill="#86efac" size={12} weight={700}>Bakkenivå (Jordoverflaten · ~1500 km profil fra vest til øst)</L>

          {/* 2. Kaldluftkilen foran varmfronten (Øst / Høyre side) */}
          {/* Varmfrontflaten starter på bakken ved x=620 og stiger slakt til x=880 ved y=160 (10 km) */}
          <polygon points="620,430 885,430 885,160" fill="url(#vp-cold-east)" />
          <line x1="620" y1="430" x2="885" y2="160" stroke={C.low} strokeWidth="3.5" />
          <L x="740" y="390" fill={C.cold} size={14} weight={800}>Kald forluft</L>
          <L x="740" y="408" fill={C.muted} size={11}>Tung, stabil luft trekker østover</L>
          <L x="760" y="270" fill={C.low} size={12} weight={800}>Varmfrontkile (1:150)</L>

          {/* 3. Kaldluftkilen bak kaldfronten (Vest / Venstre side) */}
          {/* Kaldfrontflaten starter på bakken ved x=320 og stiger bratt til x=180 ved y=160 */}
          <polygon points="65,430 320,430 180,160 65,160" fill="url(#vp-cold-west)" />
          <line x1="320" y1="430" x2="180" y2="160" stroke={C.cold} strokeWidth="3.5" />
          <L x="130" y="380" fill={C.cold} size={14} weight={800}>Kald bakluft</L>
          <L x="130" y="398" fill={C.muted} size={11}>Tung polarluft brøyter seg frem</L>
          <L x="215" y="290" fill={C.cold} size={12} weight={800}>Kaldfront (1:50)</L>

          {/* 4. Varm sektor i midten */}
          <polygon points="320,430 620,430 885,160 180,160" fill="url(#vp-warm-air)" />
          <L x="460" y="360" fill={C.warm} size={18} weight={900} anchor="middle">Varm sektor</L>
          <L x="460" y="382" fill={C.warm} size={12} weight={600} anchor="middle">Mild, fuktig maritim luft (12–15 °C)</L>

          {/* SKYER OG NEDBØR */}
          {/* A. Varmfrontens skysekvens langs kilen */}
          {/* Cirrus (Ci) ved 10 km (x=830, y=140) */}
          <path d="M 800 135 Q 830 120 860 135 T 880 130" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="5 3" />
          <L x="840" y="115" fill="#f8fafc" size={11} weight={700} anchor="middle">Cirrus (Ci)</L>
          <L x="840" y="127" fill={C.muted} size={9} anchor="middle">Iskrystaller · 800 km unna</L>

          {/* Cirrostratus (Cs) ved 8 km (x=750, y=180) */}
          <rect x="710" y="170" width="80" height="15" rx="4" fill="#cbd5e1" opacity="0.6" />
          <L x="750" y="162" fill="#cbd5e1" size={10} weight={700} anchor="middle">Cirrostratus (Cs)</L>

          {/* Altostratus (As) ved 5 km (x=660, y=240) */}
          <rect x="620" y="230" width="90" height="28" rx="6" fill="#94a3b8" opacity="0.8" />
          <L x="665" y="222" fill="#94a3b8" size={10} weight={700} anchor="middle">Altostratus (As)</L>

          {/* Nimbostratus (Ns) og silregn ved bakken (x=570 til 640) */}
          <path
            d="M 560 370 C 550 330 580 300 620 300 C 660 300 680 330 670 370 Z"
            fill="#475569"
            stroke="#64748b"
            strokeWidth="1.2"
          />
          <L x="615" y="335" fill="#f8fafc" size={11} weight={800} anchor="middle">Nimbostratus (Ns)</L>
          {/* Silregnstriper under Ns */}
          {[570, 585, 600, 615, 630, 645, 660].map((rx, idx) => (
            <line
              key={`vp-ns-rain-${idx}`}
              x1={rx}
              y1={370}
              x2={rx - 15}
              y2={430}
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="model-wind-flow"
            />
          ))}
          <L x="615" y="420" fill="#38bdf8" size={11} weight={700} anchor="middle">Jevnt silregn (300 km bredt)</L>

          {/* B. Varm sektor: Stratocumulus (Sc) */}
          <ellipse cx="460" cy="395" rx="40" ry="12" fill="#64748b" opacity="0.7" />
          <L x="460" y="398" fill="#f8fafc" size={10} anchor="middle">Stratocumulus / yr</L>

          {/* C. Kaldfrontens tordensky: Cumulonimbus (Cb) ved x=280 til 350 */}
          <path
            d="M 270 410 C 240 380 250 300 270 240 C 290 180 270 130 330 130 L 400 130 C 370 160 350 200 350 260 C 350 340 370 390 350 410 Z"
            fill="url(#vp-cb-grad)"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          {/* Ambolttopp (Anvil) */}
          <path d="M 330 130 L 420 130 C 390 150 360 160 330 160 Z" fill="#f8fafc" />
          <L x="350" y="150" fill="#0f172a" size={11} weight={900}>Ambolt (11 km)</L>

          {/* Lyn-symbol */}
          <path d="M 315 280 L 305 310 L 320 310 L 308 340" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

          {/* Kraftige byger under Cb */}
          {[275, 290, 305, 320, 335, 350].map((rx, idx) => (
            <line
              key={`vp-cb-rain-${idx}`}
              x1={rx}
              y1={410}
              x2={rx - 12}
              y2={430}
              stroke="#60a5fa"
              strokeWidth="2.8"
              strokeDasharray="4 3"
              className="model-wind-fast"
            />
          ))}
          <L x="310" y="420" fill="#60a5fa" size={11} weight={800} anchor="middle">Styrtregn / hagl</L>

          {/* D. Bak kaldfronten: Spredte haugskyer i kaldluften */}
          <ellipse cx="140" cy="350" rx="25" ry="12" fill="#cbd5e1" opacity="0.8" />
          <L x="140" y="330" fill="#cbd5e1" size={10} weight={700} anchor="middle">Cumulus (Cu)</L>
          <L x="140" y="368" fill={C.muted} size={9} anchor="middle">Oppklarning</L>

          {/* BEVEGELSESPIL (SYSTEMET FLYTTER SEG MOT HØYRE / ØST) */}
          <g transform="translate(460, 480)">
            <Arrow d="M -80 0 L 80 0" marker={m.teal} color={C.teal} width={3.2} />
            <L x="0" y="-8" fill={C.teal} size={11} weight={800} anchor="middle">
              Syklonens fremrykningsretning (mot øst/nordøst i 40–60 km/t)
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. UpperAir500hPaMapDiagram
 * 500 hPa Høydekart over Nord-Atlanteren og Skandinavia.
 * Viser isohypser i geopotensielle meter (5400–5760 gpm), tråg med kaldluft,
 * rygg med varmluft, jetstrømmens styrestrøm, og kobling til overflatesyklonens bane.
 */
export function UpperAir500hPaMapDiagram() {
  return (
    <Diagram
      title="500 hPa Høydekart: Geopotensiell høyde, isohypser og værets styrestrøm"
      heading="500 hPa Høydekart: Styrestrømmen i 5,5 kilometers høyde"
      caption="Høydekartet for 500 hPa viser høyden til trykkflaten på 500 hPa målt i geopotensielle meter (gpm). Konturlinjene kalles isohypser. Fordi kald luft er tett og kompakt, synker 500 hPa-flaten dypt ned over kalde luftmasser og danner et høyde-tråg (trough, f.eks. 5400 gpm over Norskehavet). Over varm luft hever flaten seg og danner en høyde-rygg (ridge, f.eks. 5760 gpm over Kontinentet). I fri atmosfære blåser vinden parallelt med isohypsene (geostrofisk vind). Denne kraftige øvre luftstrømmen (polarfrontjeten) fungerer som styrestrøm for overflateværet: Bakkens lavtrykk (L) trekkes mot nordøst langs isohypsene i omtrent halvparten av vindhastigheten i 500 hPa."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="25" width="890" height="450" rx="10" fill="#09131c" stroke="#1d2f40" strokeWidth="1.2" />

          {/* TITTEL OG HØYDENIVÅ */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>500 hPa Geopotensiell høyde (gpm) og styrestrøm</L>
            <L x="850" y="16" fill={C.muted} size={11} anchor="end">Målt med radiosonder og ECMWF/MEPS-modeller</L>
          </g>

          {/* STILISERT KARTBAKGRUNN */}
          <path
            d="M 550 430 C 560 360 580 300 620 240 C 660 190 730 130 780 90 C 810 120 760 210 710 330 C 680 400 650 440 550 430 Z"
            fill="#13241b"
            stroke="#264532"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <L x="660" y="280" fill="#64748b" size={13} weight={700}>Norge</L>

          {/* ISOHYPSER (BØLGENDE KONTURLINJER FOR 500 hPa GEOPOTENSIELL HØYDE) */}
          {/* Bølge 1: 5400 gpm (Dypeste tråg over Norskehavet) */}
          <path
            d="M 60 160 C 220 180 320 280 420 300 C 520 300 600 160 880 110"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.8"
          />
          <L x="180" y="170" fill="#38bdf8" size={11} weight={700}>5400 gpm</L>

          {/* Bølge 2: 5520 gpm */}
          <path
            d="M 60 220 C 220 240 330 330 430 350 C 530 350 610 220 880 170"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2.4"
          />
          <L x="180" y="230" fill="#60a5fa" size={11} weight={700}>5520 gpm</L>

          {/* Bølge 3: 5640 gpm */}
          <path
            d="M 60 280 C 220 300 340 380 440 400 C 540 400 620 280 880 230"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.4"
          />
          <L x="180" y="290" fill="#f59e0b" size={11} weight={700}>5640 gpm</L>

          {/* Bølge 4: 5760 gpm (Høyeste rygg over Kontinentet) */}
          <path
            d="M 60 340 C 220 360 350 430 450 440 C 560 440 640 340 880 290"
            fill="none"
            stroke="#ea580c"
            strokeWidth="2"
          />
          <L x="180" y="350" fill="#ea580c" size={11} weight={700}>5760 gpm</L>

          {/* HØYDETRÅG OG HØYDERYGG MARKERINGER */}
          {/* Tråg (Trough) over Norskehavet (kald luftsøyle) */}
          <g transform="translate(380, 240)">
            <line x1="0" y1="-80" x2="40" y2="90" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5 4" />
            <rect x="-45" y="-115" width="130" height="32" rx="6" fill="#082032" stroke="#38bdf8" strokeWidth="1.2" />
            <L x="20" y="-95" fill="#38bdf8" size={12} weight={800} anchor="middle">HØYDETRÅG (Kaldt)</L>
            <L x="20" y="115" fill={C.muted} size={10} anchor="middle">Sammensunket luftsøyle</L>
          </g>

          {/* Rygg (Ridge) over Øst-Europa (varm luftsøyle) */}
          <g transform="translate(730, 200)">
            <line x1="0" y1="-70" x2="-30" y2="80" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 4" />
            <rect x="-45" y="-105" width="130" height="32" rx="6" fill="#241808" stroke="#f59e0b" strokeWidth="1.2" />
            <L x="20" y="-85" fill="#f59e0b" size={12} weight={800} anchor="middle">HØYDERYGG (Varmt)</L>
            <L x="20" y="105" fill={C.muted} size={10} anchor="middle">Ekspandert luftsøyle</L>
          </g>

          {/* OVERFLATELAVTRYKKETS KOPLING (BAKKELAVTRYKK L NEDE VED TRÅGET) */}
          <g transform="translate(420, 310)">
            <circle cx="0" cy="0" r="22" fill="#091824" stroke={C.low} strokeWidth="2.5" />
            <L x="0" y="6" fill={C.low} size={18} weight={900} anchor="middle">L₁</L>
            <L x="0" y="-28" fill="#f8fafc" size={11} weight={800} anchor="middle">Bakkens lavtrykk (972 hPa)</L>

            {/* Styrestrøm-vektor som drar L1 mot nordøst langs isohypsene */}
            <Arrow d="M 22 -10 L 110 -70" marker={m.warm} color={C.warm} width={3.6} />
            <L x="80" y="-45" fill={C.warm} size={11} weight={800}>Styrestrøm</L>
            <L x="95" y="-32" fill={C.muted} size={9}>Mot NE (ca. 45 km/t)</L>
          </g>

          {/* ANIMERT VIND I 500 hPa (GEOSYNTROFISK STRØM) */}
          <path d="M 80 225 C 230 245 335 335 435 355 C 535 355 615 225 860 175" fill="none" stroke="#f8fafc" strokeWidth="2" className="model-wind-fast" />

          {/* BUNNTEKST */}
          <g transform="translate(45, 435)">
            <rect x="0" y="0" width="850" height="34" rx="6" fill="#0d1b26" stroke="#23384a" />
            <L x="20" y="21" fill={C.teal} size={11} weight={700}>Huskeregel for eksamen:</L>
            <L x="160" y="21" fill="#cbd5e1" size={11}>
              Bakkens lavtrykk styres parallelt med 500 hPa-isohypsene, på forsiden (østsiden) av høyde-tråget der øvre divergens puster liv i syklonen!
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. WeatherProgression24hDiagram
 * 3-trinns sekvens (Nå = 0t, +12 timer, +24 timer) som viser en atlantisk syklons
 * forflytning mot Norge, frontenes passasje, og hvordan vindretningen dreier («veering») på Vestlandet.
 */
export function WeatherProgression24hDiagram() {
  return (
    <Diagram
      title="Værutvikling og adveksjon over 24 timer (0t, +12t, +24t) med vinddreining på Vestlandet"
      heading="Værutvikling i 3 trinn: Slik forutsier du været 24 timer fram"
      caption="En klassisk værutvikling over 24 timer. Trinn 1 (0 timer, venstre): Lavtrykket L1 (975 hPa) ligger vest for Stad. Varmfronten gir sørøstlig kuling og silregn på Vestlandet. Trinn 2 (+12 timer, midten): Lavtrykket har rykket inn over Trøndelagskysten. Varmfronten har passert østover, og Vestlandet er i den varme sektoren med mildluft og vinddreining til sørvest. Trinn 3 (+24 timer, høyre): Lavtrykket har okkludert og ligger over Sverige. Kaldfronten har feiet forbi; vinden har dreid brått til nordvestlig kuling («veering»), temperaturen stuper, og været preges av ustabile byger med hagl og oppklarning."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#09131c" stroke="#1d2e3f" strokeWidth="1.2" />

          {/* TITTEL */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>Værutvikling og adveksjon over 24 timer (Fremrykning med vestavinden)</L>
            <L x="850" y="16" fill={C.muted} size={11} anchor="end">Fokus: Hva opplever en stasjon på Vestlandet (Bergen)?</L>
          </g>

          {/* DE TRE TIDSSTILBILDENE (0t, +12t, +24t) */}
          <g transform="translate(45, 75)">
            {/* PANEL 1: NÅ (T = 0 timer) */}
            <g transform="translate(0, 0)">
              <rect x="0" y="0" width="270" height="340" rx="8" fill="#101e2b" stroke={C.teal} strokeWidth="1.6" />
              <rect x="0" y="0" width="270" height="38" rx="8" fill="#142838" />
              <L x="15" y="24" fill={C.teal} size={13} weight={800}>Trinn 1: Nå (T = 0 timer)</L>

              {/* Kartskisse panel 1 */}
              <g transform="translate(15, 50)">
                <rect x="0" y="0" width="240" height="150" rx="6" fill="#0a151f" />
                {/* Norgeskyst kontur */}
                <path d="M 160 140 C 170 100 180 60 210 20" fill="none" stroke="#2e543e" strokeWidth="2.5" />
                <L x="180" y="130" fill="#4ade80" size={10} weight={700}>Vestlandet</L>

                {/* Lavtrykk L1 vest i havet */}
                <circle cx="80" cy="80" r="28" fill="none" stroke={C.low} strokeWidth="1.8" />
                <L x="80" y="85" fill={C.low} size={14} weight={900} anchor="middle">L₁</L>
                <L x="80" y="98" fill={C.muted} size={8} anchor="middle">975 hPa</L>

                {/* Fronter */}
                <path d="M 80 80 C 110 95 140 115 165 140" fill="none" stroke={C.low} strokeWidth="2.8" />
                <path d="M 115 98 A 5 5 0 0 0 125 104 Z" fill={C.low} />
                <path d="M 80 80 C 75 110 65 130 50 150" fill="none" stroke={C.cold} strokeWidth="2.8" />
                <polygon points="76,105 84,108 77,115" fill={C.cold} />

                {/* Nedbørsfelt over Vestlandet */}
                <ellipse cx="150" cy="110" rx="30" ry="18" fill="#38bdf8" opacity="0.3" />
                <L x="150" y="108" fill="#38bdf8" size={8} weight={700} anchor="middle">Silregn</L>
              </g>

              {/* Værkort Vestlandet Panel 1 */}
              <g transform="translate(15, 210)">
                <rect x="0" y="0" width="240" height="115" rx="6" fill="#0a131b" stroke="#1e2c3a" />
                <L x="12" y="18" fill="#f8fafc" size={11} weight={800}>Væropplevelse på Vestlandet:</L>
                <L x="12" y="36" fill={C.warm} size={10} weight={700}>• Vind:</L>
                <L x="50" y="36" fill="#cbd5e1" size={10}>Sørøstlig stiv kuling (16 m/s)</L>
                <L x="12" y="54" fill={C.low} size={10} weight={700}>• Trykk:</L>
                <L x="55" y="54" fill="#cbd5e1" size={10}>1002 hPa (Raskt fallende)</L>
                <L x="12" y="72" fill="#38bdf8" size={10} weight={700}>• Vær:</L>
                <L x="45" y="72" fill="#cbd5e1" size={10}>Tett regn fra Nimbostratus</L>
                <L x="12" y="90" fill={C.muted} size={10} weight={700}>• Temp:</L>
                <L x="52" y="90" fill="#cbd5e1" size={10}>4 °C (Kald forluft)</L>
                <L x="12" y="106" fill={C.teal} size={9}>Status: Foran varmfronten</L>
              </g>
            </g>

            {/* PIL MELLOM TRINN 1 OG 2 */}
            <g transform="translate(275, 120)">
              <Arrow d="M 0 35 L 20 35" marker={m.teal} color={C.teal} width={3.2} />
              <L x="10" y="20" fill={C.teal} size={10} weight={700} anchor="middle">+12 t</L>
            </g>

            {/* PANEL 2: +12 TIMER */}
            <g transform="translate(300, 0)">
              <rect x="0" y="0" width="270" height="340" rx="8" fill="#101e2b" stroke={C.warm} strokeWidth="1.6" />
              <rect x="0" y="0" width="270" height="38" rx="8" fill="#291e0e" />
              <L x="15" y="24" fill={C.warm} size={13} weight={800}>Trinn 2: +12 timer</L>

              {/* Kartskisse panel 2 */}
              <g transform="translate(15, 50)">
                <rect x="0" y="0" width="240" height="150" rx="6" fill="#0a151f" />
                <path d="M 160 140 C 170 100 180 60 210 20" fill="none" stroke="#2e543e" strokeWidth="2.5" />
                <L x="180" y="130" fill="#4ade80" size={10} weight={700}>Vestlandet</L>

                {/* Lavtrykk L1 har flyttet seg mot kysten av Trøndelag */}
                <circle cx="150" cy="50" r="28" fill="none" stroke={C.low} strokeWidth="1.8" />
                <L x="150" y="55" fill={C.low} size={14} weight={900} anchor="middle">L₁</L>
                <L x="150" y="68" fill={C.muted} size={8} anchor="middle">970 hPa</L>

                {/* Varmfront har passert over fjellet mot Østlandet */}
                <path d="M 150 50 C 190 70 215 100 230 140" fill="none" stroke={C.low} strokeWidth="2.8" />
                {/* Kaldfront ligger nå rett vest for kysten */}
                <path d="M 150 50 C 140 90 125 120 100 150" fill="none" stroke={C.cold} strokeWidth="2.8" />
                <polygon points="135,95 143,98 136,105" fill={C.cold} />

                {/* Vestlandet er i varm sektor */}
                <polygon points="150,50 200,95 140,115" fill="#f59e0b" opacity="0.25" />
              </g>

              {/* Værkort Vestlandet Panel 2 */}
              <g transform="translate(15, 210)">
                <rect x="0" y="0" width="240" height="115" rx="6" fill="#0a131b" stroke="#1e2c3a" />
                <L x="12" y="18" fill="#f8fafc" size={11} weight={800}>Væropplevelse på Vestlandet:</L>
                <L x="12" y="36" fill={C.warm} size={10} weight={700}>• Vind:</L>
                <L x="50" y="36" fill={C.warm} size={10} weight={800}>Dreid til SØRVEST (12 m/s)</L>
                <L x="12" y="54" fill={C.low} size={10} weight={700}>• Trykk:</L>
                <L x="55" y="54" fill="#cbd5e1" size={10}>982 hPa (Bunnpunkt)</L>
                <L x="12" y="72" fill="#38bdf8" size={10} weight={700}>• Vær:</L>
                <L x="45" y="72" fill="#cbd5e1" size={10}>Regnet stopper! Yr og tåke</L>
                <L x="12" y="90" fill={C.warm} size={10} weight={700}>• Temp:</L>
                <L x="52" y="90" fill={C.warm} size={10} weight={800}>Stiger til 11 °C (Mildt!)</L>
                <L x="12" y="106" fill={C.warm} size={9}>Status: I VARM SEKTOR</L>
              </g>
            </g>

            {/* PIL MELLOM TRINN 2 OG 3 */}
            <g transform="translate(575, 120)">
              <Arrow d="M 0 35 L 20 35" marker={m.teal} color={C.teal} width={3.2} />
              <L x="10" y="20" fill={C.teal} size={10} weight={700} anchor="middle">+24 t</L>
            </g>

            {/* PANEL 3: +24 TIMER */}
            <g transform="translate(600, 0)">
              <rect x="0" y="0" width="270" height="340" rx="8" fill="#101e2b" stroke={C.cold} strokeWidth="1.6" />
              <rect x="0" y="0" width="270" height="38" rx="8" fill="#0d2438" />
              <L x="15" y="24" fill={C.cold} size={13} weight={800}>Trinn 3: +24 timer</L>

              {/* Kartskisse panel 3 */}
              <g transform="translate(15, 50)">
                <rect x="0" y="0" width="240" height="150" rx="6" fill="#0a151f" />
                <path d="M 160 140 C 170 100 180 60 210 20" fill="none" stroke="#2e543e" strokeWidth="2.5" />
                <L x="180" y="130" fill="#4ade80" size={10} weight={700}>Vestlandet</L>

                {/* Lavtrykk L1 har okkludert over Sverige */}
                <circle cx="210" cy="50" r="28" fill="none" stroke="#a855f7" strokeWidth="1.8" />
                <L x="210" y="55" fill="#a855f7" size={14} weight={900} anchor="middle">L₁</L>
                <L x="210" y="68" fill={C.muted} size={8} anchor="middle">978 hPa</L>

                {/* Okklusjonsstilk over Midt-Norge */}
                <path d="M 210 50 C 190 70 170 90 150 110" fill="none" stroke="#a855f7" strokeWidth="2.8" />
                {/* Kaldfronten har rast langt inn i Sverige/Østlandet */}
                <path d="M 150 110 C 180 125 210 140 235 150" fill="none" stroke={C.cold} strokeWidth="2.8" />

                {/* Nordvestlig vind og bygeskyer bak fronten */}
                <line x1="80" y1="60" x2="140" y2="100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="110" cy="80" r="5" fill="#38bdf8" />
              </g>

              {/* Værkort Vestlandet Panel 3 */}
              <g transform="translate(15, 210)">
                <rect x="0" y="0" width="240" height="115" rx="6" fill="#0a131b" stroke="#1e2c3a" />
                <L x="12" y="18" fill="#f8fafc" size={11} weight={800}>Væropplevelse på Vestlandet:</L>
                <L x="12" y="36" fill={C.cold} size={10} weight={700}>• Vind:</L>
                <L x="50" y="36" fill={C.cold} size={10} weight={800}>Dreid til NORDVEST (18 m/s)</L>
                <L x="12" y="54" fill="#22c55e" size={10} weight={700}>• Trykk:</L>
                <L x="55" y="54" fill="#22c55e" size={10}>998 hPa (Raskt stigende!)</L>
                <L x="12" y="72" fill="#60a5fa" size={10} weight={700}>• Vær:</L>
                <L x="45" y="72" fill="#cbd5e1" size={10}>Kraftige haglbyger & oppklarning</L>
                <L x="12" y="90" fill={C.cold} size={10} weight={700}>• Temp:</L>
                <L x="52" y="90" fill={C.cold} size={10} weight={800}>Stuper til 3 °C (Polarluft!)</L>
                <L x="12" y="106" fill={C.cold} size={9}>Status: BAK KALDFRONTEN</L>
              </g>
            </g>
          </g>

          {/* BUNNSTRIPE: VINDDREINING («VEERING») BEGREP */}
          <g transform="translate(45, 435)">
            <rect x="0" y="0" width="850" height="34" rx="6" fill="#0d1b26" stroke="#23384a" />
            <L x="20" y="21" fill={C.sand} size={11} weight={800}>Vinddreining med klokka («Veering»):</L>
            <L x="240" y="21" fill="#cbd5e1" size={11}>
              Når et lavtrykk passerer nord for en observatør på den nordlige halvkule, dreier vinden med klokka: Sørøst → Sørvest → Nordvest.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. RadarSatelliteNowcastingDiagram
 * Dobbeltpanel:
 * Venstre panel: Værradar (reflektivitet i dBZ og nedbørsrate i mm/t).
 * Høyre panel: Infrarødt satellittbilde (skytopptemperatur i °C og farevarsler).
 */
export function RadarSatelliteNowcastingDiagram() {
  return (
    <Diagram
      title="Radar og satellitt: Nowcasting og farevarsling hos Meteorologisk institutt og Yr"
      heading="Radar og satellitt: Været i sanntid og farevarsling (Nowcasting)"
      caption="Venstre panel: Værradar sender ut mikrobølgepulser som reflekteres av nedbørspartikler. Reflektiviteten måles i dBZ og omregnes til nedbørsrate i mm per time (fra 0,5 mm/t lyseblått til over 30 mm/t rødt/lilla for ekstrem styrtregn). Viser orografisk oppstuing av regn mot vestlandsfjellene. Høyre panel: Værsatellitten (Meteosat) måler infrarød utstråling fra skytoppene. Jo kaldere skytopp (hvite og lilla områder med temperaturer ned mot -60 °C), desto høyere rager skyene i troposfæren (f.eks. Cumulonimbus og dype frontskyer). Meteorologene kombinerer disse sanntidsdataene med MEPS-modellen for å utstede farevarsler på gult, oransje og rødt nivå på Yr."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="25" width="890" height="450" rx="10" fill="#08111a" stroke="#1a2b3c" strokeWidth="1.2" />

          {/* VENSTRE PANEL: VÆRRADAR (NEDBØRSINTENSITET) */}
          <g transform="translate(45, 45)">
            <rect x="0" y="0" width="415" height="410" rx="8" fill="#0d1b26" stroke="#0284c7" strokeWidth="1.6" />
            <rect x="0" y="0" width="415" height="36" rx="8" fill="#0c2a3f" />
            <L x="15" y="24" fill="#38bdf8" size={13} weight={800}>1. Værradar på Yr: Nedbørsintensitet (dBZ / mm/t)</L>

            {/* Radarkartutsnitt Sør-Norge */}
            <g transform="translate(25, 55)">
              <rect x="0" y="0" width="365" height="260" rx="6" fill="#09141d" />

              {/* Norgeskyst kontur */}
              <path d="M 120 250 C 130 180 160 120 200 40 L 250 40 C 270 100 240 180 230 250 Z" fill="#14281e" stroke="#254734" strokeWidth="1.2" />
              <L x="210" y="140" fill="#f8fafc" size={11} weight={700}>Sør-Norge</L>

              {/* Radarekko: Frontnedbør over havet (lyseblått) */}
              <path d="M 30 180 Q 90 120 140 80 Q 180 140 120 230 Z" fill="#0284c7" opacity="0.45" />

              {/* Intens regnsone (grønt / gult) */}
              <path d="M 60 190 Q 100 150 130 120 Q 150 160 110 220 Z" fill="#22c55e" opacity="0.6" />

              {/* Kjerner med styrtregn langs fjellene (oransje/rødt ekko) */}
              <ellipse cx="125" cy="165" rx="18" ry="12" fill="#f59e0b" opacity="0.85" />
              <ellipse cx="125" cy="165" rx="8" ry="5" fill="#ef4444" />
              <L x="125" y="145" fill="#ef4444" size={9} weight={800} anchor="middle">25 mm/t</L>

              {/* Radarantenne symbol på fjellet */}
              <circle cx="180" cy="150" r="4" fill="#f8fafc" />
              <circle cx="180" cy="150" r="30" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx="180" cy="150" r="60" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
              <L x="180" y="195" fill={C.muted} size={9} anchor="middle">Radar Bømlo (240 km rekkevidde)</L>
            </g>

            {/* Fargeskala for radar nederst */}
            <g transform="translate(25, 330)">
              <rect x="0" y="0" width="365" height="55" rx="6" fill="#0a1520" stroke="#1d3042" />
              <L x="10" y="18" fill="#cbd5e1" size={10} weight={700}>Nedbørsrate (mm/time):</L>
              {/* Skalabånd */}
              <g transform="translate(10, 26)">
                <rect x="0" y="0" width="60" height="12" fill="#0284c7" />
                <rect x="60" y="0" width="70" height="12" fill="#22c55e" />
                <rect x="130" y="0" width="80" height="12" fill="#f59e0b" />
                <rect x="210" y="0" width="80" height="12" fill="#ef4444" />
                <rect x="290" y="0" width="55" height="12" fill="#a855f7" />
              </g>
              <L x="10" y="50" fill={C.muted} size={9}>0,1 (lett)</L>
              <L x="80" y="50" fill={C.muted} size={9}>2 mm/t</L>
              <L x="160" y="50" fill={C.muted} size={9}>10 mm/t</L>
              <L x="230" y="50" fill={C.muted} size={9}>25 mm/t (styrtregn)</L>
              <L x="335" y="50" fill={C.muted} size={9} anchor="end">&gt;50 (ekstrem)</L>
            </g>
          </g>

          {/* HØYRE PANEL: INFRARØD VÆRSATELLITT (METEOSAT) OG FAREVARSLER */}
          <g transform="translate(480, 45)">
            <rect x="0" y="0" width="415" height="410" rx="8" fill="#0d1b26" stroke="#f59e0b" strokeWidth="1.6" />
            <rect x="0" y="0" width="415" height="36" rx="8" fill="#291c0b" />
            <L x="15" y="24" fill="#f59e0b" size={13} weight={800}>2. Infrarød satellitt (IR) og Farevarsler på Yr</L>

            {/* Satellittbildeutsnitt */}
            <g transform="translate(25, 55)">
              <rect x="0" y="0" width="365" height="260" rx="6" fill="#081017" />

              {/* Kystomriss svakt */}
              <path d="M 120 250 C 130 180 160 120 200 40 L 250 40 C 270 100 240 180 230 250 Z" fill="#112219" stroke="#1d3829" strokeWidth="1" />

              {/* Stor kommasky (Comma cloud) for modent lavtrykk */}
              <path
                d="M 50 120 C 120 60 220 80 280 150 C 310 190 260 240 210 240 C 160 240 140 180 110 160 C 80 140 50 150 50 120 Z"
                fill="#cbd5e1"
                opacity="0.65"
              />
              {/* Kalde skytopper i kjernen (-50 °C hvit/lysende) */}
              <ellipse cx="200" cy="140" rx="45" ry="28" fill="#ffffff" opacity="0.9" />
              <ellipse cx="200" cy="140" rx="20" ry="12" fill="#e0e7ff" />
              <L x="200" y="144" fill="#0f172a" size={10} weight={900} anchor="middle">-58 °C</L>
              <L x="200" y="125" fill="#f8fafc" size={9} weight={700} anchor="middle">Tropopausetopp</L>

              {/* Farevarsel-boks på Yr lagt over kartet */}
              <g transform="translate(180, 185)">
                <rect x="0" y="0" width="165" height="60" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                <L x="12" y="18" fill="#fef08a" size={11} weight={800}>⚠️ ORANSJE FAREVARSEL</L>
                <L x="12" y="34" fill="#f8fafc" size={10}>Svært mye regn og flomfare</L>
                <L x="12" y="48" fill="#fef08a" size={9}>60–80 mm / 12 timer (Vestland)</L>
              </g>
            </g>

            {/* Forklaring for farevarselnivåer nederst */}
            <g transform="translate(25, 330)">
              <rect x="0" y="0" width="365" height="55" rx="6" fill="#0a1520" stroke="#1d3042" />
              <L x="10" y="16" fill={C.fg} size={10} weight={700}>Yr farevarselnivåer (Meteorologisk institutt):</L>
              <g transform="translate(10, 24)">
                <circle cx="6" cy="14" r="5" fill="#eab308" />
                <L x="16" y="17" fill="#fef08a" size={10} weight={700}>Gult: Vær oppmerksom</L>

                <circle cx="130" cy="14" r="5" fill="#f97316" />
                <L x="140" y="17" fill="#fdba74" size={10} weight={700}>Oransje: Vær forberedt</L>

                <circle cx="260" cy="14" r="5" fill="#ef4444" />
                <L x="270" y="17" fill="#fca5a5" size={10} weight={700}>Rødt: Gjør tiltak!</L>
              </g>
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}
