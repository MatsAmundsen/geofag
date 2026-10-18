import { Arrow, C, Diagram, L } from "./svg-kit";
import { SkydekkeN, Vindpil, WwSymbol, type WwKode } from "./wmo-symboler";

/**
 * 1. RealisticSynopticChartDiagram
 * Skjematisk bakkekart med et lavtrykk vest for Norge og et høytrykk i øst.
 * Isobarer for hver 5. hPa (970 til 1025 hPa) som ikke krysser hverandre, frontsystem
 * (varmfront, kaldfront, okkludert front, varm sektor og tråg), vind og tre stasjonsplott
 * uten navn. Symbolene i plottene følger WMO (wmo-symboler.tsx), og trykket står som fullt trykk.
 */
export function RealisticSynopticChartDiagram() {
  return (
    <Diagram
      title="Synoptisk bakkekart over Nord-Atlanteren og Skandinavia med isobarer, fronter og stasjonsplott"
      heading="Bakkekartet: lavtrykk, høytrykk og fronter"
      caption="Illustrasjon av et bakkekart. Isobarene binder sammen steder med likt lufttrykk redusert til havnivå. På norske kart er intervallet vanligvis 5 hPa. Tette isobarer betyr stor trykkforskjell og sterk vind. Varmfront tegnes rød med halvsirkler, kaldfront blå med trekanter, og en okkludert front lilla med begge symbolene."
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

            {/* Varmere luft, transparent flate */}
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
          {/* Storbritannia og Irland */}
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
          <L x="372" y="458" fill={C.muted} size={10} weight={600} anchor="middle">Storbritannia</L>

          {/* Island */}
          <path
            d="M 170 180 C 210 160 250 180 260 205 C 240 225 190 220 170 200 Z"
            fill="#182c22"
            stroke="#2e4d3b"
            strokeWidth="1.4"
            opacity="0.85"
          />
          <L x="215" y="203" fill={C.muted} size={10} weight={600} anchor="middle">Island</L>

          {/* NORGE OG SKANDINAVIA */}
          <path
            d="M 520 480 C 530 450 540 400 550 350 C 560 300 580 260 620 220 C 660 180 720 130 760 90 C 780 80 820 90 840 120 C 830 150 780 180 750 240 C 720 300 700 380 670 450 C 650 480 600 490 560 480 Z"
            fill="#1b3226"
            stroke="#2e543e"
            strokeWidth="1.6"
            opacity="0.9"
          />
          <L x="660" y="270" fill="#f8fafc" size={13} weight={800}>Norge</L>

          {/* VARM SEKTOR POLARFRONTEN (Transparent fargeflate) */}
          <path
            d="M 380 250 C 440 280 500 320 560 360 C 520 400 480 430 440 480 C 410 430 390 340 380 250 Z"
            fill="url(#syn-warm-sector)"
          />
          <L x="470" y="400" fill={C.warm} size={13} weight={800}>Varmere luft</L>

          {/* ISOBARFELT RUNDT LAVTRYKKET (sentrum ved x=340, y=210) */}
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

          {/* 1000–1015 hPa: utenfor 995-ellipsen, mellom lavtrykket og høytrykket */}
          {[
            { v: 1000, x: 690, d: "M 690 485 C 702 380 706 200 692 30" },
            { v: 1005, x: 720, d: "M 720 485 C 731 380 735 230 726 30" },
            { v: 1010, x: 750, d: "M 750 485 C 760 390 762 270 756 30" },
            { v: 1015, x: 780, d: "M 780 485 C 790 400 772 260 772 180 C 772 120 776 70 782 30" },
          ].map((iso) => (
            <g key={`syn-iso-${iso.v}`}>
              <path d={iso.d} fill="none" stroke="#334155" strokeWidth="1.2" />
              <rect x={iso.x - 14} y="463" width="28" height="13" rx="3" fill="#0d1b26" />
              <L x={iso.x} y="473" fill={C.muted} size={10} anchor="middle">{iso.v}</L>
            </g>
          ))}
          {/* 1020 hPa rundt høytrykket */}
          <ellipse cx="850" cy="110" rx="64" ry="52" fill="none" stroke="#334155" strokeWidth="1.2" />
          <L x="850" y="175" fill={C.muted} size={10} anchor="middle">1020</L>

          {/* SENTRALT LAVTRYKK (L1) */}
          <L x="340" y="212" fill={C.low} size={30} weight={900} anchor="middle">L</L>

          {/* HØYTRYKK I ØST (H1), innerste isobar 1025 hPa */}
          <ellipse cx="850" cy="110" rx="40" ry="30" fill="none" stroke={C.warm} strokeWidth="2" />
          <L x="850" y="76" fill={C.warm} size={10} weight={700} anchor="middle">1025</L>
          <L x="850" y="120" fill={C.warm} size={26} weight={900} anchor="middle">H</L>

          {/* FRONTSYSTEMET MED OFFISIELLE SYMBOLER */}
          {/* 1. Okklusjon fra L1 (340, 210) til trippelpunkt (380, 250) */}
          <path d="M 340 210 C 355 220 370 235 380 250" fill="none" stroke="#a855f7" strokeWidth="4" />
          <polygon points="352,221 359,212 363,225" fill="#a855f7" />
          <path d="M 368 234 A 6 6 0 0 0 377 241 Z" fill="#a855f7" />
          <L x="325" y="245" fill="#a855f7" size={11} weight={800}>Okklusjon</L>

          {/* 2. Varmfront fra trippelpunktet (380, 250) mot Norge (560, 360) */}
          <path d="M 380 250 C 430 280 490 320 560 360" fill="none" stroke={C.low} strokeWidth="4" />
          {/* Halvsirkler på varmfronten pekende mot nordøst (i fartsretningen) */}
          <path d="M 420 274 A 8 8 0 0 0 434 283 Z" fill={C.low} />
          <path d="M 480 312 A 8 8 0 0 0 494 321 Z" fill={C.low} />
          <path d="M 535 344 A 8 8 0 0 0 549 353 Z" fill={C.low} />

          {/* Jevnt nedbørsfelt foran varmfronten */}
          <ellipse cx="530" cy="310" rx="55" ry="35" fill="url(#syn-rain-zone)" opacity="0.8" />
          <L x="510" y="314" fill="#38bdf8" size={10} weight={700} anchor="middle">Jevn nedbør</L>
          <L x="566" y="350" fill={C.low} size={12} weight={800}>Varmfront</L>

          {/* 3. Kaldfront fra trippelpunktet (380, 250) sørover (440, 480) */}
          <path d="M 380 250 C 400 320 420 400 440 480" fill="none" stroke={C.cold} strokeWidth="4" />
          {/* Trekanter på kaldfronten pekende mot øst/fartsretningen */}
          <polygon points="390,290 404,295 393,306" fill={C.cold} />
          <polygon points="407,360 421,365 410,376" fill={C.cold} />
          <polygon points="423,430 437,435 426,446" fill={C.cold} />
          <L x="390" y="332" fill={C.cold} size={12} weight={800} anchor="end">Kaldfront</L>

          {/* 4. Trog (Trough) bak kaldfronten (ustabilt bygeområde) */}
          <path d="M 300 280 C 315 340 330 400 340 460" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
          <L x="296" y="474" fill={C.warm} size={11} weight={700} anchor="end">Tråg (byger og vindkast)</L>

          {/* ANIMERTE VINDSTRØMMER (Syklonal rotasjon og bakkefriksjon inn mot L) */}
          <path d="M 520 180 C 450 140 370 145 320 180" fill="none" stroke="#38bdf8" strokeWidth="2.2" className="model-wind-flow" />
          <path d="M 230 220 C 235 280 270 320 330 310" fill="none" stroke="#38bdf8" strokeWidth="2.2" className="model-wind-flow" />
          <path d="M 460 230 C 400 200 370 210 350 230" fill="none" stroke="#38bdf8" strokeWidth="2.5" className="model-wind-fast" />

          {/* STERK VIND DER ISOBARENE LIGGER TETT */}
          <Arrow d="M 430 270 L 480 260" marker={m.warm} color={C.warm} width={3.2} />
          <L x="486" y="252" fill={C.warm} size={11} weight={800}>Sterk vind</L>

          {/* STASJONSPLOTT UTEN NAVN: temperatur, duggpunkt, trykk og vind (WMO-symboler) */}
          {/* Plott 1: i varm sektor, mellom 990 og 995 hPa. Skydekke 6/8, vind fra sør. */}
          <g transform="translate(550, 370)">
            <Vindpil cx={0} cy={0} fraGrader={180} r={7} len={26} hele={2} width={1.6} fjaer={10} />
            <SkydekkeN n={6} cx={0} cy={0} r={7} />
            <L x="-11" y="-4" fill={C.warm} size={10} weight={700} anchor="end">12</L>
            <L x="-11" y="11" fill={C.cold} size={10} weight={700} anchor="end">11</L>
            <L x="11" y="-4" fill="#f8fafc" size={10} weight={700}>993</L>
          </g>

          {/* Plott 2: foran varmfronten, mellom 995 og 1000 hPa. Overskyet, vind fra sørøst. */}
          <g transform="translate(630, 400)">
            <Vindpil cx={0} cy={0} fraGrader={135} r={7} len={26} hele={1} halve={1} width={1.6} fjaer={10} />
            <SkydekkeN n={8} cx={0} cy={0} r={7} />
            <L x="-11" y="-4" fill={C.warm} size={10} weight={700} anchor="end">4</L>
            <L x="-11" y="11" fill={C.cold} size={10} weight={700} anchor="end">3</L>
            <L x="11" y="-4" fill="#f8fafc" size={10} weight={700}>997</L>
          </g>

          {/* Plott 3: i varm sektor, mellom 995 og 1000 hPa. Skydekke 7/8, vind fra sørvest. */}
          <g transform="translate(470, 445)">
            <Vindpil cx={0} cy={0} fraGrader={225} r={7} len={26} hele={2} width={1.6} fjaer={10} />
            <SkydekkeN n={7} cx={0} cy={0} r={7} />
            <L x="-11" y="-4" fill={C.warm} size={10} weight={700} anchor="end">13</L>
            <L x="-11" y="11" fill={C.cold} size={10} weight={700} anchor="end">13</L>
            <L x="11" y="-4" fill="#f8fafc" size={10} weight={700}>996</L>
          </g>

          {/* FORKLARENDE BUNNSTRIPE */}
          <g transform="translate(45, 495)">
            <rect x="0" y="0" width="850" height="34" rx="6" fill="#0d1b26" stroke="#23384a" />
            <L x="20" y="21" fill={C.teal} size={11} weight={700}>Slik leser du kartet:</L>
            <L x="150" y="21" fill="#cbd5e1" size={11}>
              1. Finn L og H · 2. Tette isobarer betyr sterk vind · 3. Finn frontene · 4. Bølger på fronten går oftest mot øst.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. StationModelExplainedDiagram
 * Stasjonsplottet slik teksten beskriver det: temperatur, duggpunkt, trykk, symbol for været nå
 * og vindpil som peker dit vinden kommer fra. Symbolene er tegnet etter WMO-No. 306
 * (kodetabell 4677 og 2700), se wmo-symboler.tsx. Trykket står som fullt trykk.
 */
export function StationModelExplainedDiagram() {
  const ww: { code: WwKode; label: string }[] = [
    { code: 61, label: "Lett regn" },
    { code: 63, label: "Moderat regn" },
    { code: 51, label: "Lett yr" },
    { code: 71, label: "Lett snø" },
    { code: 45, label: "Tåke" },
    { code: 95, label: "Tordenvær med regn" },
  ];
  return (
    <Diagram
      title="Stasjonsplott med temperatur, duggpunkt, trykk, symbol for været nå og vindpil"
      heading="Slik leser du et stasjonsplott"
      caption="Et stasjonsplott samler været på ett sted: temperatur, duggpunkt, trykk, et symbol for været nå, og en vindpil som peker dit vinden kommer fra. Symbolene for været nå er standardiserte (NOAA, u.å.-f). Symboler: WMO/OGC WorldWeatherSymbols (CC BY 4.0)."
      viewBox="0 0 940 520"
      wide
    >
      {() => (
        <>
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#09131d" stroke="#1d2e3f" strokeWidth="1.2" />

          {/* VENSTRE PANEL: ETT STASJONSPLOTT */}
          <g transform="translate(60, 60)">
            <rect x="0" y="0" width="460" height="400" rx="8" fill="#0d1b26" stroke={C.teal} strokeWidth="1.6" />
            <rect x="0" y="0" width="460" height="36" rx="8" fill="#132738" />
            <L x="18" y="24" fill={C.teal} size={13} weight={800}>Stasjonsplottet</L>

            <g transform="translate(250, 170)">
              <Vindpil cx={0} cy={0} fraGrader={180} r={26} len={92} hele={2} halve={1} width={2.6} fjaer={30} />
              <SkydekkeN n={7} cx={0} cy={0} r={24} bg="#0d1b26" width={2.6} />

              <L x="-34" y="-12" fill={C.warm} size={22} weight={800} anchor="end">12</L>
              <L x="-34" y="42" fill={C.cold} size={22} weight={800} anchor="end">11</L>
              <L x="34" y="-12" fill="#f8fafc" size={22} weight={800}>1008,4</L>
              <WwSymbol code={63} x={-46} y={14} s={0.62} color="#4ade80" />
            </g>

            <L x="24" y="72" fill={C.warm} size={12} weight={700}>Temperatur: 12 °C</L>
            <L x="24" y="250" fill={C.cold} size={12} weight={700}>Duggpunkt: 11 °C</L>
            <L x="436" y="72" fill="#f8fafc" size={12} weight={700} anchor="end">Trykk: 1008,4 hPa</L>
            <L x="24" y="196" fill="#4ade80" size={12} weight={700}>Været nå: moderat regn</L>
            <L x="436" y="250" fill="#f8fafc" size={12} weight={700} anchor="end">Skydekke: 7/8</L>
            <L x="436" y="266" fill={C.muted} size={11} anchor="end">Fyllingen av sirkelen viser</L>
            <L x="436" y="281" fill={C.muted} size={11} anchor="end">skydekket i åttedeler, fra skyfri</L>
            <L x="436" y="296" fill={C.muted} size={11} anchor="end">(0/8) til helt overskyet (8/8).</L>

            <L x="230" y="330" fill="#f8fafc" size={13} weight={700} anchor="middle">Vind fra sør</L>
            <L x="230" y="350" fill={C.muted} size={11} anchor="middle">Pila peker dit vinden kommer fra.</L>
            <L x="230" y="366" fill={C.muted} size={11} anchor="middle">Fjærene viser vindstyrken.</L>
          </g>

          {/* HØYRE PANEL: VINDFJÆR OG SYMBOLER FOR VÆRET NÅ */}
          <g transform="translate(540, 60)">
            <rect x="0" y="0" width="375" height="400" rx="8" fill="#0d1b26" stroke={C.warm} strokeWidth="1.6" />
            <rect x="0" y="0" width="375" height="36" rx="8" fill="#261b0c" />
            <L x="18" y="24" fill={C.warm} size={13} weight={800}>Slik leser du plottet</L>

            <g transform="translate(18, 60)">
              <L x="0" y="0" fill={C.warm} size={12} weight={800}>1. Vindpila og fjærene</L>
              <g transform="translate(0, 14)">
                <Vindpil cx={60} cy={22} fraGrader={270} r={0} len={46} halve={1} width={2} fjaer={18} />
                <Vindpil cx={60} cy={56} fraGrader={270} r={0} len={46} hele={1} width={2} fjaer={18} />
                <Vindpil cx={60} cy={90} fraGrader={270} r={0} len={46} vimpler={1} width={2} fjaer={18} />
                <L x="80" y="26" fill="#cbd5e1" size={11}>Halv fjær</L>
                <L x="80" y="60" fill="#cbd5e1" size={11}>Hel fjær</L>
                <L x="80" y="94" fill="#cbd5e1" size={11}>Vimpel (trekant)</L>
                <L x="180" y="60" fill={C.muted} size={11}>Flere og større fjær</L>
                <L x="180" y="75" fill={C.muted} size={11}>betyr sterkere vind.</L>
              </g>
            </g>

            <g transform="translate(18, 205)">
              <L x="0" y="0" fill={C.sand} size={12} weight={800}>2. Symboler for været nå (WMO)</L>
              {ww.map((w, i) => {
                const x = 30 + (i % 3) * 115;
                const y = 40 + Math.floor(i / 3) * 70;
                return (
                  <g key={w.code}>
                    <WwSymbol code={w.code} x={x} y={y} s={0.55} color="#4ade80" />
                    <L x={x} y={y + 32} fill="#cbd5e1" size={11} anchor="middle">{w.label}</L>
                  </g>
                );
              })}
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. FrontVerticalProfileDiagram
 * Tverrsnitt gjennom en kaldfront og en varmfront. Høyden er sterkt overdrevet.
 * Varmfronten heller slakt (om lag 1:100–1:200) og gir skyet vær og jevn nedbør.
 * Kaldfronten er brattere (om lag 1:50–1:100) og gir oftere byger. Skyene har ikke navn,
 * fordi skytypene ikke står i teksten (fagsjekk F4).
 */
export function FrontVerticalProfileDiagram() {
  return (
    <Diagram
      title="Vertikalt tverrsnitt gjennom en kaldfront og en varmfront med skyer og nedbør"
      heading="Vertikalt tverrsnitt: skyer, temperatur og nedbør gjennom frontene"
      caption="Frontflaten heller svakt mot bakken. En varmfront heller ofte om lag 1:100–1:200, mens en kaldfront er brattere, om lag 1:50–1:100. Varm luft løftes over kald luft, og det dannes skyer og frontnedbør. En varmfront gir skyet vær og jevn nedbør. En kaldfront fortrenger varmere luft og gir oftere byger."
      viewBox="-95 0 1035 520"
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

          <L x="40" y="48" fill={C.sand} size={11} weight={700}>Høyden er sterkt overdrevet</L>

          {/* HOVEDPROFIL FOR VARME OG KALDE LUFTSØYLER */}
          {/* 1. Bakkenivå */}
          <rect x="65" y="430" width="820" height="35" fill="#14261d" stroke="#2a4535" strokeWidth="1.5" />
          <L x="75" y="452" fill="#86efac" size={12} weight={700}>Bakken</L>

          {/* 2. Kaldluftkilen foran varmfronten (Øst / Høyre side) */}
          {/* Varmfrontflaten starter på bakken ved x=620 og stiger slakt til x=880 ved y=160 (10 km) */}
          <polygon points="620,430 885,430 885,160" fill="url(#vp-cold-east)" />
          <line x1="620" y1="430" x2="885" y2="160" stroke={C.low} strokeWidth="3.5" />
          <L x="826" y="398" fill={C.cold} size={14} weight={800} anchor="middle">Kaldere luft</L>
          <L x="826" y="416" fill={C.muted} size={11} anchor="middle">foran varmfronten</L>
          <L x="830" y="300" fill={C.low} size={12} weight={800} anchor="middle">Varmfront</L>
          <L x="830" y="315" fill={C.low} size={10} anchor="middle">om lag 1:100–1:200</L>

          {/* 3. Kaldluftkilen bak kaldfronten (Vest / Venstre side) */}
          {/* Kaldfrontflaten starter på bakken ved x=320 og stiger bratt til x=180 ved y=160 */}
          <polygon points="65,430 320,430 180,160 65,160" fill="url(#vp-cold-west)" />
          <line x1="320" y1="430" x2="180" y2="160" stroke={C.cold} strokeWidth="3.5" />
          <L x="90" y="380" fill={C.cold} size={14} weight={800}>Kaldere luft</L>
          <L x="90" y="398" fill={C.muted} size={11}>skyver seg under den varme</L>
          <L x="150" y="230" fill={C.cold} size={12} weight={800} anchor="middle">Kaldfront</L>
          <L x="150" y="245" fill={C.cold} size={10} anchor="middle">om lag 1:50–1:100</L>

          {/* 4. Varmere luft i midten */}
          <polygon points="320,430 620,430 885,160 180,160" fill="url(#vp-warm-air)" />
          <L x="470" y="300" fill={C.warm} size={18} weight={900} anchor="middle">Varmere luft</L>
          <L x="470" y="322" fill={C.warm} size={12} weight={600} anchor="middle">løftes opp ved frontene</L>

          {/* SKYER OG NEDBØR */}
          {/* A. Varmfrontens skysekvens langs kilen */}
          {/* Cirrus (Ci) ved 10 km (x=830, y=140) */}
          <path d="M 800 135 Q 830 120 860 135 T 880 130" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="5 3" />

          {/* Cirrostratus (Cs) ved 8 km (x=750, y=180) */}
          <rect x="710" y="170" width="80" height="15" rx="4" fill="#cbd5e1" opacity="0.6" />

          {/* Altostratus (As) ved 5 km (x=660, y=240) */}
          <rect x="620" y="230" width="90" height="28" rx="6" fill="#94a3b8" opacity="0.8" />

          {/* Tett sky over varmfrontflaten, og jevn nedbør som faller foran fronten i den kalde lufta (x 630–760) */}
          <path
            d="M 632 418 L 760 288 C 772 252 742 228 716 242 C 690 256 664 300 646 338 C 632 368 620 398 632 418 Z"
            fill="#475569"
            stroke="#64748b"
            strokeWidth="1.2"
          />
          {[652, 668, 684, 700, 716, 732, 748].map((rx, idx) => (
            <line
              key={`vp-ns-rain-${idx}`}
              x1={rx}
              y1={430 - 1.02 * (rx - 620) + 6}
              x2={rx - 8}
              y2={428}
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="model-wind-flow"
            />
          ))}
          <L x="700" y="452" fill="#38bdf8" size={11} weight={700} anchor="middle">Jevn nedbør</L>

          {/* B. Skyer i den varmere lufta */}
          <ellipse cx="460" cy="395" rx="40" ry="12" fill="#64748b" opacity="0.7" />

          {/* C. Kaldfrontens tordensky: Cumulonimbus (Cb) ved x=280 til 350 */}
          <path
            d="M 270 410 C 240 380 250 300 270 240 C 290 180 270 130 330 130 L 400 130 C 370 160 350 200 350 260 C 350 340 370 390 350 410 Z"
            fill="url(#vp-cb-grad)"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          {/* Flat topp på bygeskyen */}
          <path d="M 330 130 L 420 130 C 390 150 360 160 330 160 Z" fill="#f8fafc" />

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
          <L x="364" y="424" fill="#60a5fa" size={11} weight={800}>Byger</L>

          {/* D. Bak kaldfronten: Spredte haugskyer i kaldluften */}
          <ellipse cx="140" cy="350" rx="25" ry="12" fill="#cbd5e1" opacity="0.8" />

          {/* BEVEGELSESPIL (FRONTENE FLYTTER SEG MOT ØST) */}
          <g transform="translate(460, 480)">
            <Arrow d="M -20 0 L 140 0" marker={m.teal} color={C.teal} width={3.2} />
            <L x="-30" y="4" fill={C.teal} size={11} weight={800} anchor="end">
              Bølger på fronten går oftest mot øst
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. UpperAir500hPaMapDiagram
 * 500 hPa-kartet: konturer for høyden av trykkflaten, med tre sifre (552 … 570) slik teksten lærer
 * («564 betyr 5 640 meter»). Linjene ligger med 6 imellom (fagsjekk F6). Tråget er bare en form,
 * uten etikett. Luftmassene følger i stor grad vinden i høyden.
 */
export function UpperAir500hPaMapDiagram() {
  return (
    <Diagram
      title="500 hPa-kart med konturer for høyden av trykkflaten og vinden i høyden"
      heading="500 hPa-kartet: høyden av trykkflaten"
      caption="500 hPa-kartet er det viktigste høydekartet. Flaten ligger om lag 5 000 til 6 000 meter over havet. Konturene viser høyden på flaten. Luftmassenes bevegelse følger i stor grad vinden i høyden og jetstrømmen. Foran et område med sterk virvling stiger lufta, og det kan bli nedbør."
      viewBox="0 0 940 500"
      wide
    >
      {() => (
        <>
          <rect x="25" y="25" width="890" height="450" rx="10" fill="#09131c" stroke="#1d2f40" strokeWidth="1.2" />

          {/* TITTEL OG HØYDENIVÅ */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>Høyden av 500 hPa-flaten</L>
            <L x="850" y="16" fill={C.muted} size={11} anchor="end">564 betyr 5 640 meter</L>
          </g>

          {/* STILISERT KARTBAKGRUNN */}
          <path
            d="M 550 430 C 560 360 580 300 620 240 C 660 190 730 130 780 90 C 810 120 760 210 710 330 C 680 400 650 440 550 430 Z"
            fill="#13241b"
            stroke="#264532"
            strokeWidth="1.2"
            opacity="0.6"
          />
          

          {/* ISOHYPSER (BØLGENDE KONTURLINJER FOR 500 hPa GEOPOTENSIELL HØYDE) */}
          {/* Kontur 546: tråget er dypt, så den laveste linja når ned i tråget (Geo, fagsjekk #186) */}
          <path
            d="M 60 104 C 220 124 315 228 412 250 C 512 250 592 118 880 70"
            fill="none"
            stroke="#a5b4fc"
            strokeWidth="2.6"
          />
          <L x="180" y="114" fill="#a5b4fc" size={11} weight={700}>546</L>

          {/* Kontur 552 */}
          <path
            d="M 60 160 C 220 180 320 280 420 300 C 520 300 600 160 880 110"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.8"
          />
          <L x="180" y="170" fill="#38bdf8" size={11} weight={700}>552</L>

          {/* Kontur 558 */}
          <path
            d="M 60 220 C 220 240 330 330 430 350 C 530 350 610 220 880 170"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2.4"
          />
          <L x="180" y="230" fill="#60a5fa" size={11} weight={700}>558</L>

          {/* Kontur 564 */}
          <path
            d="M 60 280 C 220 300 340 380 440 400 C 540 400 620 280 880 230"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.4"
          />
          <L x="180" y="290" fill="#f59e0b" size={11} weight={700}>564</L>

          {/* Kontur 570 (høyest, i sør) */}
          <path
            d="M 60 340 C 220 360 350 430 450 440 C 560 440 640 340 880 290"
            fill="none"
            stroke="#ea580c"
            strokeWidth="2"
          />
          <L x="180" y="350" fill="#ea580c" size={11} weight={700}>570</L>

          {/* TRÅGET SOM FORM (uten etikett, fagsjekk F6) */}
          <line x1="380" y1="150" x2="425" y2="330" stroke="#38bdf8" strokeWidth="1.5" opacity="0.3" />

          {/* LUFTMASSENE FØLGER VINDEN I HØYDEN */}
          <L x="440" y="104" fill="#f8fafc" size={11} weight={800}>Hvit stiplet linje: vinden i høyden</L>

          {/* Etikett for Norge over linjene */}
          <rect x="566" y="350" width="52" height="18" rx="4" fill="#0a1520" opacity="0.9" />
          <L x="592" y="364" fill="#94a3b8" size={12} weight={700} anchor="middle">Norge</L>

          {/* ANIMERT VIND I 500 hPa */}
          <path d="M 80 225 C 230 245 335 335 435 355 C 535 355 615 225 860 175" fill="none" stroke="#f8fafc" strokeWidth="2" className="model-wind-fast" />

          {/* BUNNTEKST */}
          <g transform="translate(45, 435)">
            <rect x="0" y="0" width="850" height="34" rx="6" fill="#0d1b26" stroke="#23384a" />
            <L x="20" y="21" fill={C.teal} size={11} weight={700}>Husk:</L>
            <L x="70" y="21" fill="#cbd5e1" size={11}>
              Luftmassene følger i stor grad vinden i høyden. Foran sterk virvling kan lufta stige, og det kan bli nedbør.
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
      caption="Illustrasjon av den norske syklonmodellen. Først en bølge på en front som nesten ligger i ro. Så en moden syklon med varmfront og kaldfront. Til slutt tar kaldfronten igjen varmfronten, og det blir en okkludert front. Uten den varme lufta i sentrum svekkes lavtrykket."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#09131c" stroke="#1d2e3f" strokeWidth="1.2" />

          {/* TITTEL */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>Værutvikling og adveksjon over 24 timer (framrykning med vestavinden)</L>
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
                <L x="80" y="85" fill={C.low} size={14} weight={900} anchor="middle">L</L>
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
                <L x="150" y="55" fill={C.low} size={14} weight={900} anchor="middle">L</L>
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
                <L x="45" y="72" fill="#cbd5e1" size={10}>Regnet avtar. Yr og tåke.</L>
                <L x="12" y="90" fill={C.warm} size={10} weight={700}>• Temp:</L>
                <L x="52" y="90" fill={C.warm} size={10} weight={800}>Mildere luft bak varmfronten.</L>
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
                <L x="210" y="55" fill="#a855f7" size={14} weight={900} anchor="middle">L</L>
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
                <L x="55" y="54" fill="#22c55e" size={10}>Trykket stiger.</L>
                <L x="12" y="72" fill="#60a5fa" size={10} weight={700}>• Vær:</L>
                <L x="45" y="72" fill="#cbd5e1" size={10}>Kraftige haglbyger og oppklarning</L>
                <L x="12" y="90" fill={C.cold} size={10} weight={700}>• Temp:</L>
                <L x="52" y="90" fill={C.cold} size={10} weight={800}>Kaldere luft bak kaldfronten.</L>
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
 * Dobbeltpanel: værradar (nedbør som er der nå) og satellitt (skyer som er der nå).
 * Begge har eksempeltid i UTC (00:00Z). Fargeskalaen er «svak → kraftig» uten tall (fagsjekk F9).
 */
export function RadarSatelliteNowcastingDiagram() {
  return (
    <Diagram
      title="Radar- og satellittbilde med tidspunkt i UTC, som viser nedbør og skyer som allerede er der"
      heading="Radar og satellitt: været de nærmeste timene"
      caption="Radar og satellitt brukes til de nærmeste timene. Tidspunktet på værkart, radar og satellittbilder oppgis i UTC, også kalt Z-tid."
      viewBox="0 0 940 500"
      wide
    >
      {() => (
        <>
          <rect x="25" y="25" width="890" height="450" rx="10" fill="#08111a" stroke="#1a2b3c" strokeWidth="1.2" />

          {/* VENSTRE PANEL: VÆRRADAR (NEDBØRSINTENSITET) */}
          <g transform="translate(45, 45)">
            <rect x="0" y="0" width="415" height="410" rx="8" fill="#0d1b26" stroke="#0284c7" strokeWidth="1.6" />
            <rect x="0" y="0" width="415" height="36" rx="8" fill="#0c2a3f" />
            <L x="15" y="24" fill="#38bdf8" size={13} weight={800}>1. Radar: nedbøren som er der nå</L>

            {/* Radarkartutsnitt */}
            <g transform="translate(25, 55)">
              <rect x="0" y="0" width="365" height="260" rx="6" fill="#09141d" />

              {/* Norgeskyst kontur */}
              <path d="M 120 250 C 130 180 160 120 200 40 L 250 40 C 270 100 240 180 230 250 Z" fill="#14281e" stroke="#254734" strokeWidth="1.2" />
              <L x="214" y="100" fill="#f8fafc" size={11} weight={700}>Norge</L>

              {/* Radarekko: Frontnedbør over havet (lyseblått) */}
              <path d="M 30 180 Q 90 120 140 80 Q 180 140 120 230 Z" fill="#0284c7" opacity="0.45" />

              {/* Intens regnsone (grønt / gult) */}
              <path d="M 60 190 Q 100 150 130 120 Q 150 160 110 220 Z" fill="#22c55e" opacity="0.6" />

              {/* Kjerner med styrtregn langs fjellene (oransje/rødt ekko) */}
              <ellipse cx="125" cy="165" rx="18" ry="12" fill="#f59e0b" opacity="0.85" />
              <ellipse cx="125" cy="165" rx="8" ry="5" fill="#ef4444" />

              {/* Radar */}
              <circle cx="180" cy="150" r="4" fill="#f8fafc" />
              <circle cx="180" cy="150" r="30" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx="180" cy="150" r="60" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
              <L x="186" y="146" fill={C.muted} size={9}>radar</L>
              <rect x="8" y="8" width="132" height="22" rx="4" fill="#0a1520" />
              <L x="16" y="23" fill="#f8fafc" size={11} weight={700}>Eksempel: 00:00Z</L>
            </g>

            {/* Fargeskala for radar nederst */}
            <g transform="translate(25, 330)">
              <rect x="0" y="0" width="365" height="55" rx="6" fill="#0a1520" stroke="#1d3042" />
              <L x="10" y="18" fill="#cbd5e1" size={10} weight={700}>Nedbør:</L>
              {/* Skalabånd */}
              <g transform="translate(10, 26)">
                <rect x="0" y="0" width="70" height="12" fill="#0284c7" />
                <rect x="70" y="0" width="80" height="12" fill="#22c55e" />
                <rect x="150" y="0" width="80" height="12" fill="#f59e0b" />
                <rect x="230" y="0" width="80" height="12" fill="#ef4444" />
              </g>
              <L x="10" y="50" fill={C.muted} size={9}>svak</L>
              <L x="320" y="50" fill={C.muted} size={9} anchor="end">kraftig</L>
            </g>
          </g>

          {/* HØYRE PANEL: SATELLITT */}
          <g transform="translate(480, 45)">
            <rect x="0" y="0" width="415" height="410" rx="8" fill="#0d1b26" stroke="#f59e0b" strokeWidth="1.6" />
            <rect x="0" y="0" width="415" height="36" rx="8" fill="#291c0b" />
            <L x="15" y="24" fill="#f59e0b" size={13} weight={800}>2. Satellitt: skyene som er der nå</L>

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
              {/* Tykkere skyer i kjernen */}
              <ellipse cx="200" cy="140" rx="45" ry="28" fill="#ffffff" opacity="0.9" />
              <rect x="8" y="8" width="132" height="22" rx="4" fill="#0a1520" />
              <L x="16" y="23" fill="#f8fafc" size={11} weight={700}>Eksempel: 00:00Z</L>
            </g>

            {/* UTC */}
            <g transform="translate(25, 330)">
              <rect x="0" y="0" width="365" height="55" rx="6" fill="#0a1520" stroke="#1d3042" />
              <L x="10" y="22" fill={C.fg} size={10} weight={700}>Tidspunktet står i UTC, også kalt Z-tid.</L>
              <L x="10" y="40" fill={C.muted} size={10}>00Z er midnatt ved nullmeridianen.</L>
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}
