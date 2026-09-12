import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. InsolationDiagram
 * Viser 3D-skygget jordklode, parallelle solstrålebunter fra rommet,
 * arealfordeling ved ekvator (A=1) vs. pol (A=2,5) og atmosfærisk veglengde.
 */
export function InsolationDiagram() {
  return (
    <Diagram
      title="Ujevn solinnstråling og jordens strålingsbalanse"
      heading="Sola treffer jorda med ulik vinkel: Motoren i det globale vindsystemet"
      caption="Solstrålene ankommer jorden i parallelle bunter fra rommet. Fordi jorden er krum, treffer strålene med vidt forskjellig innfallsvinkel: Ved ekvator står solen nesten rett over hodet (90° vinkel), slik at energien konsentreres på et minimalt flateareal (A = 1,0). Mot polene treffer nøyaktig samme strålebunt på skrå og smøres utover et mer enn 2,5 ganger så stort areal (A ≈ 2,5). I tillegg må strålene ved polene passere gjennom en mer enn dobbelt så lang atmosfære-vei, der skyer og luftmolekyler reflekterer og sprer strålingen. Resultatet er et permanent strålingsoverskudd i tropene og et underskudd mot polene. Det globale vindsystemet og havstrømmene drives av naturens behov for å transportere denne overskuddsvarmen mot polene."
      viewBox="0 0 940 460"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* 3D-skyggelegging av jordkloden */}
            <radialGradient id="inso-earth-grad" cx="38%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="25%" stopColor="#0284c7" />
              <stop offset="65%" stopColor="#0f3b5c" />
              <stop offset="100%" stopColor="#081522" />
            </radialGradient>

            {/* Atmosfæreglød rundt jorden */}
            <radialGradient id="inso-atmo-glow" cx="420" cy="200" r="145" gradientUnits="userSpaceOnUse">
              <stop offset="82%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="92%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>

            {/* Solstråle-gradient fra venstre */}
            <linearGradient id="inso-sun-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Atmosfærisk ytre glød */}
          <circle cx="420" cy="200" r="145" fill="url(#inso-atmo-glow)" />

          {/* Parallelle solstrålebunter fra rommet (venstre mot høyre) */}
          {/* Strålebunt 1: Tropene / Ekvator */}
          <polygon points="40,180 295,180 295,220 40,220" fill="url(#inso-sun-beam)" opacity="0.45" />
          <line x1="40" y1="180" x2="295" y2="180" stroke="#f59e0b" strokeWidth="1.8" />
          <line x1="40" y1="220" x2="295" y2="220" stroke="#f59e0b" strokeWidth="1.8" />
          <Arrow d="M 60 200 L 290 200" marker={m.warm} color={C.warm} width={3.2} />

          {/* Strålebunt 2: Høye breddegrader / Polarområdet (samme bredde = 40px) */}
          <polygon points="40,80 345,80 380,120 40,120" fill="url(#inso-sun-beam)" opacity="0.35" />
          <line x1="40" y1="80" x2="345" y2="80" stroke="#f59e0b" strokeWidth="1.8" />
          <line x1="40" y1="120" x2="380" y2="120" stroke="#f59e0b" strokeWidth="1.8" />
          <Arrow d="M 60 100 L 355 100" marker={m.warm} color={C.warm} width={2.8} />

          <L x="50" y="55" fill={C.warm} size={13} weight={800}>
            Parallelle solstrålebunter fra rommet (like mye energi per meter)
          </L>

          {/* JORDKLODEN I 3D-PROJEKSJON */}
          <circle cx="420" cy="200" r="125" fill="url(#inso-earth-grad)" stroke="#38bdf8" strokeWidth="2" />

          {/* Kontinent-omriss (subtil jordoverflate) */}
          <path
            d="M 390 110 Q 420 130 400 160 Q 370 180 380 220 Q 400 260 380 290 Q 360 270 350 220 Q 340 160 380 120 Z"
            fill="#15803d"
            opacity="0.55"
          />
          <path
            d="M 430 110 Q 470 120 450 160 Q 420 170 430 200 Q 460 220 440 250"
            fill="#15803d"
            opacity="0.45"
          />

          {/* Ekvatorlinje (krummet ellipse) */}
          <ellipse cx="420" cy="200" rx="125" ry="32" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="5 3" />
          <L x="300" y="196" fill="#fef08a" size={12} weight={800}>
            Ekvator (0°)
          </L>

          {/* Polmerker */}
          <line x1="420" y1="65" x2="420" y2="80" stroke={C.cold} strokeWidth="2" />
          <L x="420" y="60" fill={C.cold} size={12} weight={800} anchor="middle">
            Nordpolen (90°N)
          </L>

          <line x1="420" y1="320" x2="420" y2="335" stroke={C.cold} strokeWidth="2" />
          <L x="420" y="348" fill={C.cold} size={12} weight={800} anchor="middle">
            Sørpolen (90°S)
          </L>

          {/* FOTAVTRYKK VED EKVATOR (LODDRETT) */}
          {/* Liten flate på kuleflaten (y=180 til y=220) */}
          <path d="M 295 180 A 125 125 0 0 0 295 220" fill="none" stroke="#ef4444" strokeWidth="4.5" />
          <L x="270" y="238" fill="#fca5a5" size={11} weight={800}>
            Flate A = 1,0
          </L>

          {/* FOTAVTRYKK VED POLOMRÅDET (SKRÅTT) */}
          {/* Lang, strukket flate på kuleflaten (y=80 til y=120) */}
          <path d="M 345 80 A 125 125 0 0 0 380 120" fill="none" stroke="#38bdf8" strokeWidth="4.5" />
          <L x="320" y="70" fill="#bae6fd" size={11} weight={800}>
            Flate A ≈ 2,5
          </L>

          {/* HØYRE SIDE: KVANTITATIVE FORKLARINGSBOKSER */}
          <g transform="translate(580, 75)">
            {/* Boks 1: Polare breddegrader */}
            <rect x="0" y="0" width="325" height="110" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <L x="16" y="24" fill={C.cold} size={13} weight={800}>
              ❄️ Polene (60°–90°N): Skrå innfallsvinkel
            </L>
            <L x="16" y="44" fill={C.fg} size={11.5}>
              1. Samme energimengde fordeles over <tspan fill={C.cold} fontWeight="bold">2,5× større areal</tspan>.
            </L>
            <L x="16" y="62" fill={C.fg} size={11.5}>
              2. Strålene går gjennom mer enn <tspan fill={C.sand} fontWeight="bold">2× tykkere luftlag</tspan>.
            </L>
            <L x="16" y="80" fill={C.fg} size={11.5}>
              3. Mye refleksjon fra hvit snø og is (høy albedo).
            </L>
            <L x="16" y="98" fill="#93c5fd" size={11.5} weight={700}>
              ⟹ Permanent ENERGIUNDERSKUDD
            </L>

            {/* Boks 2: Tropene */}
            <rect x="0" y="125" width="325" height="110" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <L x="16" y="149" fill={C.warm} size={13} weight={800}>
              ☀️ Tropene (0°–30°N): Rett innfallsvinkel
            </L>
            <L x="16" y="169" fill={C.fg} size={11.5}>
              1. Solen står nær senit: Loddrett, konsentrert stråling.
            </L>
            <L x="16" y="187" fill={C.fg} size={11.5}>
              2. Korteste vei gjennom atmosfæren (minimal spredning).
            </L>
            <L x="16" y="205" fill={C.fg} size={11.5}>
              3. Mørkt hav og tett regnskog absorberer opptil 90 % varme.
            </L>
            <L x="16" y="223" fill="#fde68a" size={11.5} weight={700}>
              ⟹ Permanent ENERGIOVERSKUDD
            </L>
          </g>

          {/* BUNNSPANEL: VARMETRANSPORTENS NØDVENDIGHET */}
          <rect x="35" y="375" width="870" height="65" rx="8" fill="#0f1722" stroke="#1e293b" strokeWidth="1.4" />
          <L x="55" y="398" fill={C.sand} size={13} weight={800}>
            🌍 Hvorfor koker ikke ekvator, og hvorfor fryser ikke polene helt til?
          </L>
          <L x="55" y="418" fill={C.fg} size={12}>
            Overskuddsenergien fraktes mot polene av to enorme maskinerier:
          </L>
          <L x="55" y="434" fill={C.teal} size={12} weight={700}>
            1) Det globale vindsystemet (står for ca. 60 % av varmetransporten) · 2) Havstrømmene (står for ca. 40 %).
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. OneVsThreeCellsDiagram
 * Viser to glober side om side:
 * - Venstre: "En tenkt jord UTEN rotasjon (George Hadley 1735)" med 1 gigantisk celle
 * - Høyre: "Den virkelige roterende jorden (William Ferrel 1856)" med Coriolis-oppsplitting i 3 celler
 */
export function OneVsThreeCellsDiagram() {
  return (
    <Diagram
      title="Én celle uten rotasjon, tre celler med rotasjon"
      heading="Hvorfor tre celler og ikke én? Corioliskraftens oppsplitting"
      caption="I 1735 foreslo George Hadley at jorden hadde én gigantisk sirkulasjonscelle på hver halvkule: Varm luft stiger ved ekvator, strømmer helt til polen i høyden, synker over polisen og returnerer langs bakken (venstre globus). Men jorden roterer! Idet luften i høyden beveger seg nordover, avbøyes den kraftig mot høyre av Corioliskraften. Allerede ved 30° breddegrad er den blitt til en ren vestavind som ikke klarer å trenge lenger nord. Den hoper seg opp og tvinges ned til bakken. Dermed brytes den enkle termiske sløyfen opp i de tre cellene vi kjenner i dag (høyre globus): Hadleycellen, Ferrelcellen og Polarcellen."
      viewBox="0 0 940 400"
      wide
    >
      {(m) => (
        <>
          <line
            x1="470"
            y1="35"
            x2="470"
            y2="375"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* ============================================================== */}
          {/* VENSTRE: HADLEYS MODELL UTEN ROTASJON (1 CELLE)                */}
          {/* ============================================================== */}
          <g transform="translate(0, 0)">
            <L x="235" y="40" size={16} weight={800} anchor="middle" fill={C.warm}>
              Hypotese: Én celle (Uten jordrotasjon)
            </L>
            <L x="235" y="58" size={12} fill={C.muted} anchor="middle">
              George Hadley (1735) · Ren termisk oppdrift
            </L>

            {/* Halvkule-tverrsnitt */}
            <circle cx="235" cy="200" r="95" fill="#0f202e" stroke="#334155" strokeWidth="2" />
            <line x1="140" y1="200" x2="330" y2="200" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="4 2" />
            <L x="235" y="215" fill={C.warm} size={11} weight={700} anchor="middle">
              0° (Ekvator)
            </L>
            <L x="235" y="98" fill={C.cold} size={11} weight={700} anchor="middle">
              90°N (Nordpolen)
            </L>

            {/* Én gigantisk sløyfe: Opp ved ekvator, til polen i høyden, ned, tilbake */}
            <path
              d="M 320 195 C 370 195, 370 85, 235 85"
              fill="none"
              stroke={C.warm}
              strokeWidth="2.8"
            />
            <Arrow d="M 330 195 L 345 150" marker={m.warm} color={C.warm} width={3} />
            <Arrow d="M 310 95 L 245 85" marker={m.warm} color={C.warm} width={3} />

            <path
              d="M 235 105 L 235 125"
              fill="none"
              stroke={C.cold}
              strokeWidth="3.2"
            />
            <Arrow d="M 235 85 L 235 125" marker={m.cold} color={C.cold} width={3.4} />

            {/* Bakkestrøm tilbake */}
            <path
              d="M 235 130 C 265 130, 310 160, 310 195"
              fill="none"
              stroke={C.teal}
              strokeWidth="2.8"
            />
            <Arrow d="M 255 138 L 295 180" marker={m.teal} color={C.teal} width={3} />

            <rect x="65" y="325" width="340" height="42" rx="6" fill="#1c1417" stroke="#4a1820" strokeWidth="1.2" />
            <L x="235" y="344" fill={C.low} size={11.5} weight={800} anchor="middle">
              Urealistisk: Ignorerer Corioliskraften helt!
            </L>
            <L x="235" y="358" fill={C.fg} size={10.5} anchor="middle">
              Luft i høyden kan aldri nå helt til polen uten å avbøyes.
            </L>
          </g>

          {/* ============================================================== */}
          {/* HØYRE: FERRELS MODELL MED ROTASJON (3 CELLER)                  */}
          {/* ============================================================== */}
          <g transform="translate(470, 0)">
            <L x="235" y="40" size={16} weight={800} anchor="middle" fill={C.teal}>
              Virkeligheten: Tre celler (Med jordrotasjon)
            </L>
            <L x="235" y="58" size={12} fill={C.muted} anchor="middle">
              William Ferrel (1856) · Coriolis splitter sirkulasjonen
            </L>

            {/* Halvkule med rotasjonspil */}
            <circle cx="235" cy="200" r="95" fill="#0f202e" stroke="#38bdf8" strokeWidth="2" />
            <line x1="140" y1="200" x2="330" y2="200" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="4 2" />

            {/* Rotasjonsvektor Omega øverst */}
            <Arrow d="M 215 70 Q 235 60 255 70" marker={m.sand} color={C.sand} width={2.4} />
            <L x="235" y="52" fill={C.sand} size={11} weight={800} anchor="middle">
              Rotasjon (Ω)
            </L>

            {/* Tre celler langs kanten */}
            {/* 1. Hadley (0 - 30°) */}
            <ellipse cx="325" cy="180" rx="18" ry="32" fill="none" stroke={C.teal} strokeWidth="2" />
            <Arrow d="M 343 185 L 343 165" marker={m.warm} color={C.warm} width={2} />
            <Arrow d="M 307 165 L 307 185" marker={m.sand} color={C.sand} width={2} />
            <L x="360" y="184" fill={C.teal} size={11} weight={800}>
              Hadley
            </L>

            {/* 2. Ferrel (30 - 60°) */}
            <ellipse cx="295" cy="125" rx="18" ry="28" fill="none" stroke={C.sand} strokeWidth="2" strokeDasharray="4 2" />
            <Arrow d="M 277 130 L 277 115" marker={m.low} color={C.low} width={2} />
            <Arrow d="M 313 115 L 313 130" marker={m.warm} color={C.warm} width={2} />
            <L x="325" y="115" fill={C.sand} size={11} weight={800}>
              Ferrel
            </L>

            {/* 3. Polar (60 - 90°) */}
            <ellipse cx="235" cy="98" rx="22" ry="16" fill="none" stroke={C.cold} strokeWidth="2" />
            <Arrow d="M 257 98 L 245 90" marker={m.cold} color={C.cold} width={2} />
            <Arrow d="M 213 98 L 225 106" marker={m.cold} color={C.cold} width={2} />
            <L x="195" y="98" fill={C.cold} size={11} weight={800} anchor="end">
              Polar
            </L>

            {/* Breddegradsetiketter */}
            <L x="330" y="215" fill={C.warm} size={10} weight={700}>
              0° (ITCZ)
            </L>
            <L x="310" y="152" fill={C.sand} size={10} weight={700}>
              30°N
            </L>
            <L x="270" y="102" fill={C.low} size={10} weight={700}>
              60°N
            </L>
            <L x="235" y="85" fill={C.cold} size={10} weight={700} anchor="middle">
              90°N
            </L>

            <rect x="45" y="325" width="380" height="42" rx="6" fill="#101c22" stroke="#1c444f" strokeWidth="1.2" />
            <L x="235" y="344" fill={C.teal} size={11.5} weight={800} anchor="middle">
              Coriolis avbøyer øvre luft ved 30°N ⟹ 3 celler!
            </L>
            <L x="235" y="358" fill={C.fg} size={10.5} anchor="middle">
              Hadley og Polar er termisk direkte · Ferrel er termisk indirekte.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. WindCellsDiagram
 * Komplett, pedagogisk tverrsnitt av nordlig halvkule fra 0° til 90°N.
 * Med realistisk fallende tropopause (16 km -> 8 km), tropopausebrudd,
 * jetstrømkjerner (STJ og PFJ), skyformasjoner og trykkbelter.
 */
export function WindCellsDiagram() {
  return (
    <Diagram
      title="De tre sirkulasjonscellene på nordlig halvkule"
      heading="De tre cellene: Hadley, Ferrel og Polarcellen i helhetlig tverrsnitt"
      caption="Sirkulasjonen på nordlig halvkule er organisert i tre distinkte celler: 1) Hadleycellen (0°–30°N, termisk direkte): Varm, fuktig luft stiger voldsomt ved ITCZ, danner dype tordenskyer, strømmer nordover i høyden og synker ned over subtropene ved 30° (hestebreddegradene). Ved bakken blåser returen som nordøstpassaten. 2) Ferrelcellen (30°–60°N, termisk indirekte): Fungerer som et gigantisk mekanisk tannhjul drevet av lavtrykkene langs polarfronten. Ved bakken danner den det milde, fuktige vestavindsbeltet. 3) Polarcellen (60°–90°N, termisk direkte): Iskald luft synker over Arktis (polarhøytrykket) og strømmer sørover som polare østavinder. Tropopausen faller i to markerte trinn (tropopausebrudd): Her finner vi henholdsvis den subtropiske jetstrømmen (STJ ved 30°) og polarfrontjeten (PFJ ved 60°)."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Himmelen i tverrsnitt */}
            <linearGradient id="cell-sky-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#081018" />
              <stop offset="30%" stopColor="#0f2233" />
              <stop offset="70%" stopColor="#15324b" />
              <stop offset="100%" stopColor="#1c3d5a" />
            </linearGradient>

            {/* ITCZ Tordensky */}
            <linearGradient id="itcz-cloud-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="30%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsatmosfære */}
          <rect x="30" y="30" width="880" height="440" rx="8" fill="url(#cell-sky-grad)" />

          {/* FALLENDE TROPOPAUSE MED TROPOPAUSEBRUDD */}
          {/* Tropisk tropopause: 16 km fra 0° til 30° (x=80 til 340, y=75) */}
          <line x1="80" y1="75" x2="340" y2="75" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="5 3" />
          <L x="90" y="65" fill="#7dd3fc" size={12} weight={800}>
            Tropopausen (~16 km i tropene)
          </L>

          {/* Tropopausebrudd ved 30° (faller fra 16 km til 12 km) */}
          <path d="M 340 75 Q 360 75 365 110 L 600 110" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
          <L x="470" y="100" fill="#7dd3fc" size={11} weight={700} anchor="middle">
            Midlere tropopause (~11–12 km)
          </L>

          {/* Tropopausebrudd ved 60° (faller fra 11 km til 8 km) */}
          <path d="M 600 110 Q 620 110 625 145 L 870 145" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
          <L x="860" y="135" fill="#7dd3fc" size={11} weight={700} anchor="end">
            Polartropopausen (~8 km)
          </L>

          {/* JORDOVERFLATEN NEDERST */}
          <rect x="30" y="380" width="880" height="90" rx="4" fill="#0e171e" />
          <line x1="30" y1="380" x2="910" y2="380" stroke="#334e68" strokeWidth="2.5" />

          {/* Breddegradsskillere */}
          {[120, 360, 620, 850].map((bx, i) => (
            <line key={i} x1={bx} y1="70" x2={bx} y2="380" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
          ))}

          {/* ============================================================== */}
          {/* 1. HADLEY-CELLEN (120 til 360 = 0° til 30°N)                    */}
          {/* ============================================================== */}
          {/* ITCZ Tordensky ved 0° */}
          <path
            d="M 85 380 
               C 70 320, 90 220, 110 160 
               C 100 120, 130 85, 160 80 
               C 175 80, 190 95, 170 140 
               C 185 200, 165 310, 150 380 Z"
            fill="url(#itcz-cloud-grad)"
            opacity="0.9"
          />
          {/* Ambolt ved tropopausen */}
          <path d="M 95 80 L 220 75 Q 240 75 220 95 L 120 100 Z" fill="#f8fafc" opacity="0.9" />
          <L x="135" y="60" fill="#fca5a5" size={11} weight={800} anchor="middle">
            ITCZ Cumulonimbus
          </L>

          {/* Hadley oppdrift */}
          <Arrow d="M 135 340 L 135 110" marker={m.warm} color={C.warm} width={3.8} />

          {/* Hadley øvre strøm mot nord */}
          <Arrow d="M 180 85 L 320 85" marker={m.warm} color={C.warm} width={3} />

          {/* Hadley subsidens ved 30°N */}
          <Arrow d="M 355 125 L 355 340" marker={m.sand} color={C.sand} width={3.6} />

          {/* Nordøstpassaten ved bakken */}
          <Arrow d="M 330 365 L 160 365" marker={m.teal} color={C.teal} width={3.4} />

          <L x="240" y="210" fill={C.teal} size={16} weight={900} anchor="middle">
            HADLEY-CELLEN
          </L>
          <L x="240" y="230" fill={C.muted} size={11} anchor="middle">
            Termisk direkte (0°–30°N)
          </L>
          <L x="240" y="355" fill={C.teal} size={12} weight={800} anchor="middle">
            ← Nordøstpassaten (overflate)
          </L>

          {/* ============================================================== */}
          {/* 2. FERREL-CELLEN (360 til 620 = 30°N til 60°N)                 */}
          {/* ============================================================== */}
          {/* Vestavindsbeltet ved bakken */}
          <Arrow d="M 390 365 L 580 365" marker={m.warm} color={C.warm} width={3.6} />
          <L x="490" y="355" fill={C.warm} size={13} weight={900} anchor="middle">
            Vestavindsbeltet → (mot Norge)
          </L>

          {/* Oppdrift ved polarfronten 60°N */}
          <Arrow d="M 615 340 L 615 130" marker={m.low} color={C.low} width={3.6} />

          {/* Øvre returstrøm sørover */}
          <Arrow d="M 580 120 L 390 120" marker={m.muted} color={C.muted} width={2.8} />

          <L x="490" y="210" fill={C.sand} size={16} weight={900} anchor="middle">
            FERREL-CELLEN
          </L>
          <L x="490" y="230" fill={C.sand} size={11} weight={700} anchor="middle">
            Termisk indirekte (30°–60°N) · Mekanisk tannhjul
          </L>

          {/* ============================================================== */}
          {/* 3. POLAR-CELLEN (620 til 850 = 60°N til 90°N)                  */}
          {/* ============================================================== */}
          {/* Øvre strøm mot polen */}
          <Arrow d="M 645 155 L 810 155" marker={m.cold} color={C.cold} width={2.6} />

          {/* Nedsynking over polisen */}
          <Arrow d="M 845 170 L 845 340" marker={m.cold} color={C.cold} width={3.4} />

          {/* Polare østavinder ved bakken */}
          <Arrow d="M 810 365 L 645 365" marker={m.cold} color={C.cold} width={3.2} />

          <L x="735" y="210" fill={C.cold} size={16} weight={900} anchor="middle">
            POLAR-CELLEN
          </L>
          <L x="735" y="230" fill={C.muted} size={11} anchor="middle">
            Termisk direkte (60°–90°N)
          </L>
          <L x="735" y="355" fill={C.cold} size={12} weight={800} anchor="middle">
            ← Polare østavinder
          </L>

          {/* JETSTRØMKJERNER I TROPOPAUSEBRUDDENE */}
          {/* Subtropisk jet (STJ) ved 30° */}
          <g transform="translate(352, 92)">
            <circle cx="0" cy="0" r="15" fill="#451a03" stroke={C.sand} strokeWidth="2.2" />
            <line x1="-6" y1="-6" x2="6" y2="6" stroke={C.sand} strokeWidth="2" />
            <line x1="6" y1="-6" x2="-6" y2="6" stroke={C.sand} strokeWidth="2" />
            <L x="0" y="-18" fill={C.sand} size={11} weight={800} anchor="middle">
              STJ (Subtropisk jet)
            </L>
            <L x="0" y="25" fill={C.muted} size={9.5} anchor="middle">
              ⊗ Vestavind inn
            </L>
          </g>

          {/* Polarfrontjet (PFJ) ved 60° */}
          <g transform="translate(612, 128)">
            <circle cx="0" cy="0" r="16" fill="#450a0a" stroke={C.low} strokeWidth="2.4" />
            <line x1="-7" y1="-7" x2="7" y2="7" stroke={C.low} strokeWidth="2.2" />
            <line x1="7" y1="-7" x2="-7" y2="7" stroke={C.low} strokeWidth="2.2" />
            <L x="0" y="-20" fill={C.low} size={11.5} weight={900} anchor="middle">
              PFJ (Polarfrontjet)
            </L>
            <L x="0" y="27" fill={C.muted} size={9.5} anchor="middle">
              ⊗ Vestavind inn
            </L>
          </g>

          {/* BAKKETRYKKSYSTEMER OG BREDDEGRADER NEDERST */}
          {/* 0° ITCZ */}
          <circle cx="120" cy="405" r="14" fill="#3b151b" stroke={C.low} strokeWidth="1.8" />
          <L x="120" y="411" fill={C.low} size={13} weight={900} anchor="middle">
            L
          </L>
          <L x="120" y="434" fill={C.low} size={12} weight={800} anchor="middle">
            0° ITCZ
          </L>
          <L x="120" y="450" fill={C.muted} size={10} anchor="middle">
            Ekvatorielt lavtrykk (Regnskog)
          </L>

          {/* 30° Subtropisk høytrykk */}
          <circle cx="360" cy="405" r="14" fill="#0f2b32" stroke={C.teal} strokeWidth="1.8" />
          <L x="360" y="411" fill={C.teal} size={13} weight={900} anchor="middle">
            H
          </L>
          <L x="360" y="434" fill={C.teal} size={12} weight={800} anchor="middle">
            30° Hestebreddegradene
          </L>
          <L x="360" y="450" fill={C.muted} size={10} anchor="middle">
            Subtropisk høytrykk (Sahara)
          </L>

          {/* 60° Polarfronten */}
          <circle cx="620" cy="405" r="14" fill="#3b151b" stroke={C.low} strokeWidth="1.8" />
          <L x="620" y="411" fill={C.low} size={13} weight={900} anchor="middle">
            L
          </L>
          <L x="620" y="434" fill={C.low} size={12} weight={800} anchor="middle">
            60° Polarfronten
          </L>
          <L x="620" y="450" fill={C.muted} size={10} anchor="middle">
            Subpolart lavtrykk (Norge)
          </L>

          {/* 90° Nordpolen */}
          <circle cx="850" cy="405" r="14" fill="#0f2b32" stroke={C.teal} strokeWidth="1.8" />
          <L x="850" y="411" fill={C.teal} size={13} weight={900} anchor="middle">
            H
          </L>
          <L x="850" y="434" fill={C.cold} size={12} weight={800} anchor="middle">
            90° Nordpolen
          </L>
          <L x="850" y="450" fill={C.muted} size={10} anchor="middle">
            Polarhøytrykk (Arktis)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. HadleyCloseupDiagram
 * Nærbilde av Hadleycellen fra 0° til 30°N med varmt tropisk hav, ITCZ-konveksjon,
 * latent varmeavgivelse, tørr øvre transport, nedsynking over ørken og passatvindretur.
 */
export function HadleyCloseupDiagram() {
  return (
    <Diagram
      title="Hadley-cellen i nærbilde: Fra ITCZ til 30° breddegrad"
      heading="Hadley-cellen: Konveksjon ved ITCZ og ørkendannelse ved 30°"
      caption="Hadleycellen er den mektigste termiske varmemotoren på jorden. Ved den intertropiske konvergenssonen (ITCZ) møtes nordøstpassaten og sørøstpassaten over oppvarmet tropisk hav. Fuktig luft tvinges voldsomt til værs i gigantiske Cumulonimbus-tårn. Kondensasjonen frigjør svære mengder latent varme, som løfter luften helt til den 16 km høye tropopausen. I høyden strømmer den tørre luften nordover, avkjøles og synker ned over 30° breddegrad (subtropiske høytrykk). Her varmes den adiabatisk, skyer fordamper, og vi finner jordens største varme ørkener. Langs havoverflaten trekkes luften tilbake mot ITCZ som de stødige passatvindene."
      viewBox="0 0 940 420"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="hadley-sea-bg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="65%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id="hadley-dune-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>

          {/* Bakkenivå / havoverflate fra ekvator til 30°N */}
          <rect x="35" y="320" width="870" height="60" rx="4" fill="url(#hadley-sea-bg)" />
          <line x1="35" y1="320" x2="905" y2="320" stroke="#38bdf8" strokeWidth="2" />

          {/* Sanddyner ved 30°N (Sahara-landskap) */}
          <path
            d="M 630 320 Q 690 285 750 320 Q 810 295 870 320 L 905 320 L 905 380 L 630 380 Z"
            fill="url(#hadley-dune-grad)"
          />
          <L x="760" y="305" fill="#fde68a" size={13} weight={800} anchor="middle">
            🏜️ Subtropisk ørken (Sahara, 30°N)
          </L>

          {/* Varmt tropisk hav ved ekvator */}
          <L x="160" y="348" fill="#e0f2fe" size={13} weight={800} anchor="middle">
            Tropisk hav (+28 °C) · Massiv fordampning
          </L>

          {/* ITCZ TORDENSKY VED 0° */}
          <path
            d="M 60 320 
               C 40 260, 60 170, 90 120 
               C 120 60, 180 55, 230 65 
               C 280 75, 290 130, 270 200 
               C 260 260, 270 310, 250 320 Z"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1.8"
          />
          {/* Ambolt */}
          <path d="M 80 65 L 340 55 Q 360 55 330 85 L 120 90 Z" fill="#e2e8f0" opacity="0.9" />

          {/* Regn fra ITCZ */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={110 + i * 16}
              y1={300}
              x2={100 + i * 16}
              y2={320}
              stroke="#7dd3fc"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          ))}
          <L x="160" y="290" fill="#7dd3fc" size={11.5} weight={700} anchor="middle">
            Daglige monsun- og regnskyll 🌧️
          </L>

          {/* Vertikal oppdrift ved ITCZ */}
          <Arrow d="M 160 300 L 160 95" marker={m.warm} color={C.warm} width={4.2} />
          <L x="160" y="42" fill={C.low} size={15} weight={900} anchor="middle">
            ITCZ (0°) · Tropopausen (16 km)
          </L>

          {/* Øvre transport polover */}
          <Arrow d="M 280 75 L 720 75" marker={m.warm} color={C.warm} width={3.6} />
          <L x="500" y="62" fill={C.warm} size={13} weight={800} anchor="middle">
            Tørr luft strømmer polover i 12–16 km høyde →
          </L>

          {/* Nedsynking ved 30°N */}
          <Arrow d="M 760 95 L 760 270" marker={m.sand} color={C.sand} width={4} />
          <g transform="translate(780, 150)">
            <rect x="0" y="0" width="130" height="75" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.3" />
            <L x="12" y="22" fill={C.sand} size={12} weight={800}>
              Subsidens
            </L>
            <L x="12" y="40" fill={C.fg} size={10.5}>
              Varmes adiabatisk
            </L>
            <L x="12" y="55" fill={C.sand} size={10.5}>
              (+1,0 °C / 100 m)
            </L>
            <L x="12" y="69" fill="#fde68a" size={10} weight={700}>
              Skyer fordamper!
            </L>
          </g>

          {/* Passatvinden ved bakken */}
          <Arrow d="M 680 305 L 280 305" marker={m.teal} color={C.teal} width={3.8} />
          <L x="480" y="292" fill={C.teal} size={14} weight={900} anchor="middle">
            ← Nordøstpassaten (suges tilbake mot ITCZ over havet)
          </L>

          {/* Etiketter nederst */}
          <L x="160" y="398" fill={C.low} size={13} weight={800} anchor="middle">
            Ekvator (0°) · Doldrums (Stillebelte)
          </L>
          <L x="760" y="398" fill={C.teal} size={13} weight={800} anchor="middle">
            30°N · Hestebreddegradene (Subtropisk høytrykk)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. SurfaceWindsDiagram
 * TOTALREVIDERT: Erstattet den flate rektangulære boksen med en 3D-skygget JORDGLOBUS!
 * Viser krumme breddesirkler (0°, 30°N, 60°N, 90°N), Corioliskraftens avbøyning,
 * nordøstpassaten, vestavindsbeltet (som treffer Norge) og de polare østavindene.
 */
export function SurfaceWindsDiagram() {
  return (
    <Diagram
      title="De globale overflatevindene på nordlig halvkule"
      heading="De tre vindbeltene ved bakken: Passater, vestavinder og polare østavinder"
      caption="Vindene ved bakken drives av trykkgradienten mellom de globale trykkbeltene, men avbøyes til høyre av Corioliskraften på den roterende jorden: 1) Nordøstpassaten (0°–30°N): Luften trekkes sørover fra høytrykket ved 30° mot ITCZ, men avbøyes mot høyre og blåser jevnt fra nordøst mot sørvest. 2) Vestavindsbeltet (30°–60°N): Luften trekkes nordover mot lavtrykkene ved polarfronten og avbøyes kraftig mot høyre, slik at den blåser fra sørvest mot nordøst (dette beltet treffer Norge og bringer mild atlanterhavsluft). 3) Polare østavinder (60°–90°N): Iskald arktisk luft strømmer sørover fra polarhøytrykket og avbøyes mot vest (blåser fra øst mot vest). Husk den gylne meteorologiske regelen: Vinden har alltid navn etter retningen den KOMMER FRA!"
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* 3D-halvkule gradient */}
            <radialGradient id="surf-globe-grad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="40%" stopColor="#10253d" />
              <stop offset="75%" stopColor="#0a1624" />
              <stop offset="100%" stopColor="#04090f" />
            </radialGradient>
          </defs>

          {/* Bakgrunnsramme */}
          <rect x="30" y="30" width="880" height="420" rx="8" fill="#080f14" />

          {/* JORDKLODEN / HALVKULEN I MIDTEN */}
          <g transform="translate(180, 20)">
            <circle cx="240" cy="200" r="160" fill="url(#surf-globe-grad)" stroke="#38bdf8" strokeWidth="2.2" />

            {/* BREDDEGRADSELLIPSER */}
            {/* 0° Ekvator */}
            <ellipse cx="240" cy="200" rx="160" ry="40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
            <L x="410" y="196" fill="#fef08a" size={12} weight={800}>
              0° ITCZ (L)
            </L>

            {/* 30°N Subtropisk høytrykk */}
            <ellipse cx="240" cy="140" rx="142" ry="32" fill="none" stroke={C.teal} strokeWidth="1.8" strokeDasharray="4 2" />
            <L x="390" y="136" fill={C.teal} size={12} weight={800}>
              30°N Hestebreddegradene (H)
            </L>

            {/* 60°N Polarfronten */}
            <ellipse cx="240" cy="88" rx="105" ry="22" fill="none" stroke={C.low} strokeWidth="1.8" strokeDasharray="4 2" />
            <L x="355" y="84" fill={C.low} size={12} weight={800}>
              60°N Polarfronten (L)
            </L>

            {/* 90°N Nordpolen */}
            <circle cx="240" cy="40" r="5" fill={C.cold} />
            <L x="240" y="30" fill={C.cold} size={12} weight={900} anchor="middle">
              90°N Polarhøytrykk (H)
            </L>

            {/* KONTINENTSILHUETTER (Europa, Norge, Nord-Afrika) */}
            <path
              d="M 230 65 Q 245 75 240 95 Q 235 110 250 125"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3.5"
              opacity="0.6"
            />
            <L x="260" y="85" fill="#86efac" size={11} weight={800}>
              Norge
            </L>

            {/* VINDPILER AVBØYD OVER KULEFLATEN */}
            {/* 1. POLARE ØSTAVINDER (60°–90°N): Blåser fra nordøst mot sørvest */}
            <Arrow d="M 285 55 Q 260 70 230 78" marker={m.cold} color={C.cold} width={3.2} />
            <Arrow d="M 220 50 Q 195 65 170 75" marker={m.cold} color={C.cold} width={3.2} />
            <L x="175" y="60" fill={C.cold} size={11.5} weight={800}>
              Polare østavinder ↙
            </L>

            {/* 2. VESTAVINDSBELTET (30°–60°N): Blåser fra sørvest mot nordøst (treffer Norge!) */}
            <Arrow d="M 180 145 Q 210 115 245 92" marker={m.warm} color={C.warm} width={4} />
            <Arrow d="M 250 148 Q 280 120 315 95" marker={m.warm} color={C.warm} width={4} />
            <Arrow d="M 130 140 Q 155 115 185 98" marker={m.warm} color={C.warm} width={3.6} />
            <L x="290" y="118" fill={C.warm} size={13} weight={900}>
              Vestavindsbeltet (↗ mot Norge)
            </L>

            {/* 3. NORDØSTPASSATEN (0°–30°N): Blåser fra nordøst mot sørvest */}
            <Arrow d="M 330 148 Q 290 170 250 195" marker={m.teal} color={C.teal} width={3.6} />
            <Arrow d="M 240 148 Q 200 170 160 195" marker={m.teal} color={C.teal} width={3.6} />
            <Arrow d="M 160 148 Q 120 170 90 195" marker={m.teal} color={C.teal} width={3.6} />
            <L x="270" y="172" fill={C.teal} size={13} weight={800}>
              Nordøstpassaten ↙
            </L>
          </g>

          {/* FORKLARINGSBOKS TIL HØYRE */}
          <g transform="translate(640, 65)">
            <rect x="0" y="0" width="250" height="240" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <L x="16" y="26" fill={C.sand} size={13} weight={800}>
              🧭 Huskeregel for vindnavn:
            </L>
            <L x="16" y="46" fill={C.fg} size={11}>
              Vinden har alltid navn etter retningen
            </L>
            <L x="16" y="62" fill={C.warm} size={12} weight={800}>
              den KOMMER FRA, ikke dit den blåser!
            </L>

            <line x1="16" y1="78" x2="234" y2="78" stroke="#334155" />

            <L x="16" y="98" fill={C.cold} size={11.5} weight={700}>
              • Polare østavinder:
            </L>
            <L x="26" y="114" fill={C.muted} size={10.5}>
              Kommer fra nordøst/øst i Arktis.
            </L>

            <L x="16" y="136" fill={C.warm} size={11.5} weight={700}>
              • Vestavindsbeltet:
            </L>
            <L x="26" y="152" fill={C.muted} size={10.5}>
              Kommer fra sørvest/vest over Atlanteren.
            </L>

            <L x="16" y="174" fill={C.teal} size={11.5} weight={700}>
              • Nordøstpassaten:
            </L>
            <L x="26" y="190" fill={C.muted} size={10.5}>
              Kommer fra nordøst mot ITCZ.
            </L>

            <L x="16" y="218" fill="#a5f3fc" size={11} weight={700}>
              Coriolis avbøyer ALLTID til høyre!
            </L>
          </g>

          {/* OPPGAVESAMMENDRAG NEDERST */}
          <rect x="45" y="405" width="850" height="36" rx="6" fill="#0d1822" stroke="#1e293b" strokeWidth="1.2" />
          <L x="470" y="427" fill={C.sand} size={12} weight={700} anchor="middle">
            Globusperspektiv: Fra 30°N trekkes luften mot både 0° og 60°N — Coriolis avbøyer begge til høyre, og skaper motsatte vindretninger!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. GlobalClimateZonesDiagram
 * Illustrert vegetasjons- og klimaprofil fra ekvator til polen direkte koblet til stigende og synkende luft.
 */
export function GlobalClimateZonesDiagram() {
  return (
    <Diagram
      title="Globale klimasoner og vegetasjonsbelter"
      heading="Klimabeltene: Cellenes opp- og nedsynking skrevet på jordoverflaten"
      caption="De globale klimabeltene og økosystemene er en direkte konsekvens av hvor i cellene luften stiger eller synker: 1) Ved ITCZ (0°) tvinges luften opp: Voldsom nedbør året rundt gir grobunn for de frodige tropiske regnskogene (Amazonas, Kongo, Indonesia). 2) På 10°–20° breddegrad skifter årstidene mellom tørke og regn i takt med ITCZs vandring, noe som skaper savannen. 3) Ved 30° breddegrad synker luften: Skyer fordamper, og vi får jordens mektigste ørkener (Sahara, Kalahari). 4) På 45°–60° ligger vestavindsbeltet med hyppige lavtrykk og frontnedbør, som gir tempererte løvskoger og boreal barskog (taiga). 5) Over polene synker iskald luft i polarhøytrykket og danner tørr, frossen tundra og polarørken."
      viewBox="0 0 940 460"
      wide
    >
      {() => (
        <>
          {/* Klimasoner som bånd med farger og illustrasjoner */}
          {[
            {
              y: 40,
              h: 60,
              bg: "#0c1a24",
              border: C.cold,
              zone: "Tundra og polarørken (65°–90°N)",
              mech: "Synkende kaldluft i Polarcellen · Ekstremt tørt og kaldt (&lt; 200 mm/år)",
              veg: "Lav, mose, permafrost, isbreer (Svalbard, Grønland)",
              icon: "❄️",
            },
            {
              y: 108,
              h: 60,
              bg: "#142820",
              border: "#22c55e",
              zone: "Boreal barskog (Taiga) & Temperert lauvskog (45°–65°N)",
              mech: "Stigende luft ved polarfronten & fuktig vestavindsbelte (mye regn)",
              veg: "Gran, furu, bjørk, eik · Rik skog (Norge, Canada, Sibir)",
              icon: "🌲",
            },
            {
              y: 176,
              h: 60,
              bg: "#2d1d0c",
              border: C.sand,
              zone: "Subtropisk ørkenbelte (20°–35°N)",
              mech: "Synkende tørr luft ved 30° (Hadley-subsidens) · Skyfritt & hett",
              veg: "Knusktørt, sanddyner, oaser, kaktus (Sahara, Arabia)",
              icon: "🏜️",
            },
            {
              y: 244,
              h: 60,
              bg: "#272e13",
              border: "#a3e635",
              zone: "Tropisk savanne (10°–20°N)",
              mech: "Sesongvandring av ITCZ · Markert regntid og tørketid",
              veg: "Gresslette med spredte akasietrær (Serengeti, Sahel)",
              icon: "🦒",
            },
            {
              y: 312,
              h: 60,
              bg: "#06301d",
              border: C.teal,
              zone: "Tropisk regnskog (0°–10°N/S)",
              mech: "Maksimal konvektiv oppdrift ved ITCZ · Daglige kraftige regnskyll",
              veg: "Eviggrønn urskog, enormt artsmangfold (Amazonas, Kongo)",
              icon: "🌴",
            },
          ].map((z, idx) => (
            <g key={idx}>
              <rect
                x="40"
                y={z.y}
                width="860"
                height={z.h}
                rx="8"
                fill={z.bg}
                stroke={z.border}
                strokeWidth="1.8"
              />
              <L x="60" y={z.y + 24} fill={z.border} size={15} weight={800}>
                {z.icon} {z.zone}
              </L>
              <L x="60" y={z.y + 46} fill={C.fg} size={12}>
                {z.mech}
              </L>
              <L x="880" y={z.y + 35} fill={C.muted} size={12} weight={600} anchor="end">
                {z.veg}
              </L>
            </g>
          ))}

          {/* Oppsummeringsboks */}
          <rect
            x="40"
            y="385"
            width="860"
            height="50"
            rx="8"
            fill="#0f1722"
            stroke="#1e293b"
            strokeWidth="1.4"
          />
          <L x="470" y="408" fill={C.fg} size={12.5} weight={700} anchor="middle">
            Den gylne huskeregelen for geofagelever:
          </L>
          <L x="470" y="426" fill={C.sand} size={12} weight={800} anchor="middle">
            Der luften i gjennomsnitt STIGER (0° og 60°N), blir det skyer og frodig liv. Der den SYNKER (30° og 90°N), tørker landskapet ut!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. PolarFrontNorwayDiagram
 * Synoptisk værkart over Nord-Atlanteren og Norge: Polarfronten med ekte meteorologiske frontsømmer
 * (røde varmfrontbuer, blå kaldfrontkiler), lavtrykkssenter og orografisk nedbør over Langfjella.
 */
export function PolarFrontNorwayDiagram() {
  return (
    <Diagram
      title="Polarfronten og været i Norge"
      heading="Polarfronten: Der kald arktisk luft møter fuktig atlanterhavsluft"
      caption="Ved ca. 60°N kolliderer to fundamentalt forskjellige luftmasser: Den kalde, tunge polarluften fra Arktis og den milde, fuktige luften fra Atlanterhavet. Grenseflaten kalles polarfronten. Temperatur- og tetthetskontrasten gjør fronten ustabil, og det oppstår bølger der ekstratropiske lavtrykk (sykloner) fødes på løpende bånd. Vestavindsbeltet styrer disse lavtrykkene rett mot Norge. Når den fuktige vestavinden treffer kysten, tvinges den til værs over Langfjella: Vestlandet får voldsom orografisk nedbør (loside), mens Østlandet og indre daler havner i dyp regnskygge (leside)."
      viewBox="0 0 940 430"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="front-polar-air" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c1e2b" />
              <stop offset="100%" stopColor="#15364e" />
            </linearGradient>

            <linearGradient id="front-warm-air" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d2212" />
              <stop offset="100%" stopColor="#25160c" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsfelt: Nord for fronten = Kald polarluft */}
          <path d="M 40 40 H 900 V 210 Q 550 160 40 210 Z" fill="url(#front-polar-air)" />
          <L x="80" y="75" fill={C.cold} size={15} weight={800}>
            Kald arktisk polarluft (fra nord)
          </L>
          <L x="80" y="95" fill={C.muted} size={11.5}>
            Tung, tørr luft føres sørover av polare østavinder
          </L>

          {/* Sør for fronten = Mild subtropisk atlanterhavsluft */}
          <path d="M 40 210 Q 550 160 900 210 V 380 H 40 Z" fill="url(#front-warm-air)" />
          <L x="80" y="320" fill={C.warm} size={15} weight={800}>
            Mild, fuktig atlanterhavsluft (fra sørvest)
          </L>
          <L x="80" y="340" fill={C.muted} size={11.5}>
            Varm luft føres nordover av vestavindsbeltet
          </L>

          {/* POLARFRONTEN MED REALISTISK BØLGEFORM */}
          <path
            d="M 40 210 Q 220 180 380 230 Q 520 280 640 180 Q 740 120 900 190"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3.2"
          />

          {/* KALDFRONT-KILER (BLÅ TREKANTER) langs fronten */}
          <polygon points="260,195 272,175 284,198" fill="#38bdf8" />
          <polygon points="340,212 352,192 364,215" fill="#38bdf8" />
          <polygon points="450,255 462,235 474,258" fill="#38bdf8" />

          {/* VARMFRONT-BUER (RØDE HALVSIRKLER) */}
          <path d="M 680 160 A 10 10 0 0 1 700 150" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
          <path d="M 760 135 A 10 10 0 0 1 780 130" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />

          {/* LAVTRYKKSSENTER (SYKLON) I BØLGETOPPEN */}
          <circle cx="580" cy="190" r="28" fill="#450a0a" stroke={C.low} strokeWidth="2.5" />
          <L x="580" y="198" fill={C.low} size={22} weight={900} anchor="middle">
            L
          </L>
          <L x="580" y="235" fill={C.low} size={12} weight={800} anchor="middle">
            Lavtrykk under utvikling
          </L>

          {/* Vestavindspil som styrer lavtrykkene mot Norge */}
          <Arrow d="M 280 280 L 530 205" marker={m.warm} color={C.warm} width={3.6} />
          <L x="390" y="270" fill={C.warm} size={13} weight={800}>
            Vestavinden fører lavtrykkene mot Norge ↗
          </L>

          {/* LANGFJELLA TERRENGSNITT PÅ HØYRE SIDE */}
          <g transform="translate(680, 150)">
            {/* Fjellprofil */}
            <path
              d="M 50 170 L 100 60 L 150 170 Z"
              fill="#223328"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Snøtopp på fjellet */}
            <polygon points="90,82 100,60 110,82" fill="#ffffff" />
            <L x="100" y="195" fill={C.fg} size={13} weight={800} anchor="middle">
              Langfjella
            </L>

            {/* Loside (Vestlandet - vest for Langfjella) */}
            <L x="35" y="110" fill="#7dd3fc" size={13} weight={800} anchor="end">
              Vestlandet: Loside 🌧️
            </L>
            <L x="35" y="128" fill={C.muted} size={10.5} anchor="end">
              Orografisk regn (&gt; 2500 mm)
            </L>
            {/* Regndråper på losiden */}
            <line x1="40" y1="135" x2="35" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
            <line x1="55" y1="135" x2="50" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />

            {/* Leside (Østlandet - øst for Langfjella) */}
            <L x="165" y="110" fill={C.warm} size={13} weight={800}>
              Østlandet: Leside ☀️
            </L>
            <L x="165" y="128" fill={C.muted} size={10.5}>
              Regnskygge & føn (&lt; 400 mm)
            </L>
          </g>

          {/* Forklaringsbunn */}
          <rect x="40" y="375" width="860" height="42" rx="6" fill="#0f1722" stroke="#1e293b" strokeWidth="1.2" />
          <L x="470" y="401" fill={C.sand} size={12} weight={700} anchor="middle">
            Polarfronten er en permanent kollisjonssone mellom varm og kald luft. Norge ligger midt i skuddlinjen for frontnedbør og stormer!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 8. RossbyWavesDiagram
 * Viser meandrerende polarfrontjet i Rossbybølger: Traug (kaldt/lavtrykk),
 * Rygg (varmt/høytrykk) og Omega-blokkering over Skandinavia.
 */
export function RossbyWavesDiagram() {
  return (
    <Diagram
      title="Rossbybølger i polarfrontjeten"
      heading="Rossbybølger: Jetstrømmens meandere som avgjør ukas vær i Norge"
      caption="Polarfrontjeten i 9–11 km høyde blåser ikke i en rett linje rundt kloden, men bukter seg i gigantiske planetære meandere som kalles Rossbybølger (etter Carl-Gustaf Rossby). En bølge har to nøkkelelementer: 1) Traug (bølgedal mot sør): Her fosser iskald arktisk luft sørover. På forsiden av trauget skaper divergens i høyden dype lavtrykk med vind og regn. 2) Rygg (bølgetopp mot nord): Her presses mild subtropisk luft nordover, med konvergens i høyden som mater stabilt høytrykk og tørt klarvær. Dersom en kraftig rygg snøres av, oppstår et 'blokkerende høytrykk' (Omega-blokkering) som kan låse godværet eller kulden over Norge i ukevis."
      viewBox="0 0 940 450"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Jetstrømmens glød */}
            <linearGradient id="jet-stream-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsmasser: Arktis nord, Subtropene sør */}
          <rect x="35" y="30" width="870" height="150" fill="#081520" rx="6" />
          <L x="55" y="58" fill={C.cold} size={15} weight={800}>
            Arktisk luftmasse (Kald og tung polarluft)
          </L>

          <rect x="35" y="230" width="870" height="150" fill="#24160e" rx="6" />
          <L x="55" y="355" fill={C.warm} size={15} weight={800}>
            Subtropisk luftmasse (Varm og fuktig luft)
          </L>

          {/* KONTUR AV SKANDINAVIA UNDER JETSTRØMMEN */}
          <g transform="translate(670, 95)" opacity="0.75">
            <path
              d="M 20 10 Q 35 25 30 55 Q 25 75 40 90 Q 20 85 10 65 Z"
              fill="#15803d"
              stroke="#22c55e"
              strokeWidth="1.5"
            />
            <L x="50" y="50" fill="#86efac" size={11} weight={800}>
              Norge
            </L>
          </g>

          {/* MEANDRERENDE POLARFRONTJET (ROSSBYBØLGE) */}
          {/* Ytre bred luftelv */}
          <path
            d="M 50 190 
               C 150 90, 240 85, 340 210 
               C 440 345, 540 350, 640 180 
               C 720 50, 800 130, 890 190"
            fill="none"
            stroke="#0284c7"
            strokeWidth="22"
            opacity="0.3"
            strokeLinecap="round"
          />
          {/* Kjerne i jetstrømmen */}
          <path
            d="M 50 190 
               C 150 90, 240 85, 340 210 
               C 440 345, 540 350, 640 180 
               C 720 50, 800 130, 890 190"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Jetstrømpiler som viser fart (250 km/t vest mot øst) */}
          <Arrow d="M 120 135 L 200 95" marker={m.teal} color={C.teal} width={3.6} />
          <Arrow d="M 310 170 L 400 300" marker={m.teal} color={C.teal} width={3.6} />
          <Arrow d="M 500 325 L 590 220" marker={m.teal} color={C.teal} width={3.6} />
          <Arrow d="M 710 100 L 780 135" marker={m.teal} color={C.teal} width={3.6} />

          {/* 1. RYGG (BØLGETOPP MOT NORD) TIL VENSTRE */}
          <g transform="translate(140, 65)">
            <rect x="0" y="0" width="160" height="60" rx="8" fill="#142419" stroke={C.warm} strokeWidth="1.6" />
            <L x="80" y="24" fill={C.warm} size={13} weight={900} anchor="middle">
              RYGG (Bølgetopp)
            </L>
            <L x="80" y="44" fill={C.fg} size={11} anchor="middle">
              Varmluft nordover · Høytrykk H
            </L>
          </g>

          {/* 2. TRAUG (BØLGEDAL MOT SØR) I MIDTEN */}
          <g transform="translate(420, 280)">
            <rect x="0" y="0" width="180" height="65" rx="8" fill="#301317" stroke={C.low} strokeWidth="1.6" />
            <L x="90" y="24" fill={C.low} size={13} weight={900} anchor="middle">
              TRAUG (Bølgedal)
            </L>
            <L x="90" y="42" fill={C.fg} size={11} anchor="middle">
              Polarluft sørover · Lavtrykk L
            </L>
            <L x="90" y="56" fill={C.muted} size={10} anchor="middle">
              (Byger, kuling og nedbør)
            </L>
          </g>

          {/* 3. BLOKKERENDE HØYTRYKK OVER NORGE (OMEGA-BLOKKERING) */}
          <g transform="translate(710, 130)">
            <circle cx="0" cy="0" r="26" fill="#0f2b32" stroke={C.teal} strokeWidth="2.4" />
            <L x="0" y="8" fill={C.teal} size={22} weight={900} anchor="middle">
              H
            </L>
            <L x="0" y="-34" fill="#67e8f9" size={12} weight={900} anchor="middle">
              Blokkerende høytrykk
            </L>
            <L x="0" y="44" fill={C.fg} size={11} weight={700} anchor="middle">
              (Låser været over Skandinavia)
            </L>
          </g>

          {/* BUNNSPANEL: METEOROLOGENS NØKKEL */}
          <rect x="35" y="390" width="870" height="46" rx="6" fill="#0d1822" stroke="#1e293b" strokeWidth="1.2" />
          <L x="470" y="412" fill={C.sand} size={12.5} weight={800} anchor="middle">
            Værvarslerens hemmelighet: Ligger Norge i et traug, får vi regn og kulde. Ligger Norge under en rygg, får vi sol og sommervarme!
          </L>
          <L x="470" y="427" fill={C.muted} size={11} anchor="middle">
            Hvis en rygg snøres av som en «Omega-blokkering», kan godværet (eller vinterkulden) vare uavbrutt i flere uker.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 9. JetStreamDiagram
 * Viser tverrsnitt gjennom polarfrontjeten med isotaker (vindhastighetskonturer),
 * temperaturgradient og tropopausebrudd.
 */
export function JetStreamDiagram() {
  return (
    <Diagram
      title="Polarfrontjeten"
      heading="Polarfrontjeten: En mektig luftelv i 9–11 km høyde"
      caption="Der temperaturforskjellen mellom tropene og polene er størst i høyden, oppstår det voldsomme trykkforskjeller. Resultatet er en smal, rørformet jetstrøm med vindhastigheter ofte over 200–300 km/t. Jetstrømmen fungerer som et styringsbelte for alle lavtrykkene som treffer Norge."
      viewBox="0 0 940 320"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="jet-core-isotachs" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect x="30" y="30" width="880" height="260" rx="8" fill="#0a131c" />

          <L x="50" y="60" fill={C.muted} size={12}>
            Høyde
          </L>
          <L x="50" y="100" fill={C.teal} size={12} weight={700}>
            10 km
          </L>
          <line x1="90" y1="95" x2="890" y2="95" stroke="#334155" strokeDasharray="4 4" />

          {/* Jetstrømmens isotak-kjerne */}
          <ellipse cx="470" cy="95" rx="160" ry="45" fill="url(#jet-core-isotachs)" stroke="#f59e0b" strokeWidth="2" />
          <ellipse cx="470" cy="95" rx="80" ry="24" fill="#ef4444" opacity="0.85" />

          <L x="470" y="92" fill="#ffffff" size={14} weight={900} anchor="middle">
            ⊗ JETKJERNE (&gt; 250 km/t)
          </L>
          <L x="470" y="108" fill="#fef08a" size={11} weight={700} anchor="middle">
            Vindretning fra vest mot øst (inn i planet)
          </L>

          {/* Bakken og luftmasser */}
          <line x1="90" y1="240" x2="890" y2="240" stroke="#334e68" strokeWidth="2" />
          <L x="120" y="265" fill={C.warm} size={14} weight={800}>
            Mild subtropisk luft (sør for fronten)
          </L>
          <L x="860" y="265" fill={C.cold} size={14} weight={800} anchor="end">
            Kald arktisk luft (nord for fronten)
          </L>
          <L x="470" y="285" fill={C.muted} size={12} anchor="middle">
            Overflaten ved 60°N (Polarfronten)
          </L>
        </>
      )}
    </Diagram>
  );
}

export const ClimateBeltsDiagram = GlobalClimateZonesDiagram;
