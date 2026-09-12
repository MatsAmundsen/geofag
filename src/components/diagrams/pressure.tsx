import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. AtmosphericColumnDiagram
 * Viser atmosfærens luftsøyle, eksponentiell molekyltetthet, trykkfall med høyden og landskapssilhuett.
 */
export function AtmosphericColumnDiagram() {
  return (
    <Diagram
      title="Luftsøylen og trykkfall med høyden"
      heading="Luftsøylen: Lufttrykk er vekten av all luft over deg"
      caption="Luft har masse og trekkes mot jorden av tyngdekraften. Lufttrykket på ethvert punkt er nøyaktig lik tyngden av hele luftsøylen som hviler ovenfor. Ved havnivå veier luftsøylen over én kvadratmeter om lag 10 330 kg (over 10 tonn!), noe som tilsvarer et standardtrykk på 1013,25 hPa. Fordi luft er komprimerbar, er gassmolekylene tettest pakket nær bakken. Allerede ved 5500 meter er trykket halvert (500 hPa), og over tropopausen (~11 km) befinner mer enn 75 % av hele atmosfærens masse seg under et rutefly."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Atmosfæreglød fra mørk stratosfære ned til bakken */}
            <linearGradient id="col-sky-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080c10" />
              <stop offset="25%" stopColor="#101a24" />
              <stop offset="55%" stopColor="#172b3c" />
              <stop offset="85%" stopColor="#1e3a52" />
              <stop offset="100%" stopColor="#2a4860" />
            </linearGradient>

            {/* Søylegradient */}
            <linearGradient id="col-column-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>

            {/* Fjellgradient */}
            <linearGradient id="col-mountain-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3c4c59" />
              <stop offset="40%" stopColor="#253540" />
              <stop offset="100%" stopColor="#18232c" />
            </linearGradient>

            {/* Snøbregradient */}
            <linearGradient id="col-snow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#94b8d7" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsatmosfære */}
          <rect x="30" y="30" width="880" height="460" rx="8" fill="url(#col-sky-bg)" />

          {/* Fjell- og terrengsilhuett i bakgrunnen */}
          {/* Mount Everest silhuett i det fjerne (~8848 m) */}
          <path
            d="M 520 440 L 590 125 L 620 180 L 660 440 Z"
            fill="#182633"
            stroke="#2a3d4f"
            strokeWidth="1.2"
          />
          <path d="M 575 155 L 590 125 L 608 158 Z" fill="url(#col-snow-grad)" />

          {/* Norsk høyfjell (2500 m) */}
          <path
            d="M 410 440 L 460 335 L 485 365 L 530 440 Z"
            fill="url(#col-mountain-grad)"
            stroke="#3a4d5e"
            strokeWidth="1.2"
          />
          <path d="M 450 350 L 460 335 L 472 350 Z" fill="url(#col-snow-grad)" />

          {/* Havoverflate og kystlandskap nederst */}
          <rect x="30" y="440" width="880" height="50" rx="4" fill="#0f1920" />
          <path d="M 30 440 Q 200 435 370 440 L 370 490 L 30 490 Z" fill="#132635" />
          <line x1="30" y1="440" x2="910" y2="440" stroke="#334e68" strokeWidth="2" />

          {/* Rutefly ved tropopausen (11 km) */}
          <g transform="translate(680, 75)">
            <path
              d="M 0 0 L 25 -2 L 32 -7 L 35 -7 L 30 0 L 48 2 L 53 -3 L 56 -3 L 53 4 L 30 4 L 22 14 L 18 14 L 20 4 L 0 2 Z"
              fill="#e2e8f0"
              opacity="0.9"
            />
            <line x1="-80" y1="1" x2="-5" y2="1" stroke="#ffffff" strokeWidth="1.8" opacity="0.6" />
            <L x="65" y="5" fill={C.teal} size={11} weight={700}>
              Passasjerfly i marsjhøyde (11 km)
            </L>
          </g>

          {/* Fjell-etiketter */}
          <L x="590" y="112" fill={C.muted} size={10.5} anchor="middle">
            Mt. Everest (8 848 moh. · ~330 hPa)
          </L>
          <L x="460" y="325" fill={C.muted} size={10.5} anchor="middle">
            Galdhøpiggen (2 469 moh. · ~750 hPa)
          </L>

          {/* SELVE LUFTSØYLEN: 1 m² prisme / søyle */}
          <g transform="translate(200, 0)">
            {/* 3D toppflate av luftsøylen ved tropopausen */}
            <polygon points="0,70 30,55 130,55 100,70" fill="#38bdf8" opacity="0.35" />

            {/* Søylekropp */}
            <rect
              x="0"
              y="70"
              width="100"
              height="370"
              fill="url(#col-column-grad)"
              stroke="#38bdf8"
              strokeWidth="1.6"
              strokeDasharray="4 2"
            />
            {/* 3D sidevegg */}
            <polygon
              points="100,70 130,55 130,425 100,440"
              fill="#1e3a52"
              opacity="0.5"
              stroke="#38bdf8"
              strokeWidth="1"
            />

            {/* Eksponentiell gassmolekylfordeling */}
            {Array.from({ length: 90 }).map((_, i) => {
              const rx = 6 + (i * 17) % 88;
              const ry = 385 + (i * 7) % 52;
              return <circle key={`m1-${i}`} cx={rx} cy={ry} r={1.5} fill="#bae6fd" opacity={0.8} />;
            })}
            {Array.from({ length: 55 }).map((_, i) => {
              const rx = 6 + (i * 23) % 88;
              const ry = 265 + (i * 11) % 115;
              return <circle key={`m2-${i}`} cx={rx} cy={ry} r={1.3} fill="#7dd3fc" opacity={0.65} />;
            })}
            {Array.from({ length: 28 }).map((_, i) => {
              const rx = 8 + (i * 31) % 84;
              const ry = 75 + (i * 19) % 180;
              return <circle key={`m3-${i}`} cx={rx} cy={ry} r={1.1} fill="#38bdf8" opacity={0.4} />;
            })}

            {/* Grunnflate: 1 m² på bakken */}
            <polygon
              points="0,440 30,425 130,425 100,440"
              fill="#f59e0b"
              opacity="0.8"
              stroke="#fbbf24"
              strokeWidth="1.8"
            />
            <L x="50" y="455" fill="#fbbf24" size={12} weight={800} anchor="middle">
              1 m² grunnflate
            </L>

            {/* Tyngdekraftvektor som presser hele søylen ned */}
            <Arrow d="M 50 85 L 50 425" marker={m.warm} color={C.warm} width={3.6} />
            <rect x="6" y="235" width="88" height="34" rx="4" fill="#0f172a" opacity="0.9" />
            <L x="50" y="249" fill={C.warm} size={11} weight={800} anchor="middle">
              Tyngdekraft (g)
            </L>
            <L x="50" y="263" fill={C.fg} size={10} anchor="middle">
              10 330 kg luft
            </L>
          </g>

          {/* HØYDENIVÅER OG TRYKKSKALA PÅ VENSTRE SIDE */}
          <line x1="180" y1="70" x2="200" y2="70" stroke={C.teal} strokeWidth="2" />
          <line x1="70" y1="70" x2="180" y2="70" stroke={C.teal} strokeDasharray="3 3" opacity="0.7" />
          <L x="60" y="66" fill={C.teal} size={14} weight={800} anchor="end">
            11 000 m
          </L>
          <L x="60" y="82" fill={C.muted} size={11} anchor="end">
            Tropopausen · ~250 hPa
          </L>

          <line x1="180" y1="260" x2="200" y2="260" stroke={C.sand} strokeWidth="2" />
          <line x1="70" y1="260" x2="180" y2="260" stroke={C.sand} strokeDasharray="4 3" opacity="0.8" />
          <L x="60" y="254" fill={C.sand} size={14} weight={800} anchor="end">
            5 500 m
          </L>
          <L x="60" y="270" fill={C.warm} size={12} weight={800} anchor="end">
            500 hPa (Halvert trykk!)
          </L>
          <L x="60" y="285" fill={C.muted} size={10} anchor="end">
            50 % av atmosfærens masse under
          </L>

          <line x1="180" y1="390" x2="200" y2="390" stroke={C.cold} strokeWidth="1.8" />
          <line x1="70" y1="390" x2="180" y2="390" stroke={C.cold} strokeDasharray="3 3" opacity="0.6" />
          <L x="60" y="386" fill={C.cold} size={13} weight={700} anchor="end">
            1 500 m
          </L>
          <L x="60" y="401" fill={C.muted} size={11} anchor="end">
            Høyfjell · ~850 hPa
          </L>

          <line x1="180" y1="440" x2="200" y2="440" stroke="#38bdf8" strokeWidth="2.4" />
          <L x="60" y="436" fill={C.fg} size={15} weight={900} anchor="end">
            0 moh. (Havnivå)
          </L>
          <L x="60" y="454" fill="#38bdf8" size={14} weight={800} anchor="end">
            1013,25 hPa
          </L>
          <L x="60" y="469" fill={C.muted} size={10.5} anchor="end">
            Standard atmosfæretrykk
          </L>

          {/* HØYRE SIDE: PEDAGOGISKE FORKLARINGSBOKSER & BAROMETER */}
          <g transform="translate(560, 180)">
            <rect
              x="0"
              y="0"
              width="330"
              height="80"
              rx="8"
              fill="#111d27"
              stroke="#22394d"
              strokeWidth="1.5"
            />
            <L x="16" y="24" fill={C.warm} size={13} weight={800}>
              ⚖️ Hvor mye veier luftsøylen?
            </L>
            <L x="16" y="44" fill={C.fg} size={12} weight={700}>
              1 m² grunnflate bærer ca. 10,3 tonn luft!
            </L>
            <L x="16" y="62" fill={C.muted} size={11}>
              Kroppen knuses ikke fordi cellene våre har samme indre mottrykk.
            </L>

            <rect
              x="0"
              y="92"
              width="330"
              height="96"
              rx="8"
              fill="#111d27"
              stroke="#22394d"
              strokeWidth="1.5"
            />
            <L x="16" y="115" fill={C.teal} size={13} weight={800}>
              📉 Eksponentielt trykkfall
            </L>
            <L x="16" y="134" fill={C.fg} size={11.5}>
              Luft er en komprimerbar gass. Tyngden av de øvre
            </L>
            <L x="16" y="150" fill={C.fg} size={11.5}>
              lagene presser de nederste molekylene tett sammen.
            </L>
            <L x="16" y="168" fill={C.sand} size={11.5} weight={700}>
              Nær bakken faller trykket med hele 1 hPa per 8 meter!
            </L>

            <rect
              x="0"
              y="200"
              width="330"
              height="75"
              rx="8"
              fill="#111d27"
              stroke="#22394d"
              strokeWidth="1.5"
            />
            <L x="16" y="223" fill="#a5f3fc" size={13} weight={800}>
              🌡️ Torricellis kvikksølvbarometer (1643)
            </L>
            <L x="16" y="242" fill={C.fg} size={11.5}>
              Luftens vekt ved havnivå balanserer nøyaktig
            </L>
            <L x="16" y="259" fill={C.fg} size={11.5}>
              en <tspan fill={C.warm} fontWeight="bold">760 mm</tspan> høy søyle med flytende kvikksølv (Hg).
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. RelativePressureDiagram
 * Viser at lufttrykk er relativt – samme tallverdi (1015 hPa) kan være både L og H.
 */
export function RelativePressureDiagram() {
  return (
    <Diagram
      title="Trykk er relativt: Samme verdi kan være lavtrykk eller høytrykk"
      heading="Trykk er relativt – Hvorfor 1015 hPa kan bety to stikk motsatte værtyper"
      caption="Det finnes ikke noe fast tall som avgjør om et område har høytrykk eller lavtrykk. Et lavtrykk er definert som et område med lavere trykk enn omgivelsene, mens et høytrykk har høyere trykk enn omgivelsene. På kart A (venstre) er et senter med 1015 hPa et lavtrykk (L) fordi naboene har 1025 hPa. Trykkgradientkraften (oransje piler) trekker luften innover, og vinden (hvite buede piler) spiraliserer mot klokken inn i senteret med heving og skyer. På kart B (høyre) er nøyaktig samme trykk, 1015 hPa, et høytrykk (H) fordi det er omgitt av dype lavtrykk på 1005 hPa. Her presses luften utover med klokken, luften synker fra høyden, og himmelen blir skyfri."
      viewBox="0 0 940 430"
      wide
    >
      {(m) => (
        <>
          <defs>
            <radialGradient id="rel-low-rad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a151b" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#2c141a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#111822" stopOpacity="0.1" />
            </radialGradient>

            <radialGradient id="rel-high-rad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f343a" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#12272e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#111822" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          <line
            x1="470"
            y1="35"
            x2="470"
            y2="400"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* KART A: 1015 hPa SOM LAVTRYKK */}
          <g transform="translate(0, 0)">
            <rect x="35" y="30" width="415" height="375" rx="8" fill="#0d151c" stroke="#1d2d3d" strokeWidth="1.5" />
            <circle cx="242" cy="195" r="145" fill="url(#rel-low-rad)" />

            <L x="242" y="58" size={16} weight={800} anchor="middle" fill={C.low}>
              KART A: Lavtrykkssenter (1015 hPa)
            </L>
            <L x="242" y="76" size={12} fill={C.muted} anchor="middle">
              Omgitt av HØYERE trykk (1020–1025 hPa)
            </L>

            <path
              d="M 105 195 C 105 115, 165 75, 242 75 C 325 75, 380 120, 380 195 C 380 270, 320 315, 242 315 C 160 315, 105 270, 105 195 Z"
              fill="none"
              stroke="#475569"
              strokeWidth="1.8"
            />
            <rect x="320" y="80" width="56" height="17" rx="3" fill="#0d151c" />
            <L x="348" y="93" fill={C.muted} size={11} anchor="middle" weight={600}>
              1025 hPa
            </L>

            <path
              d="M 150 195 C 150 140, 190 115, 242 115 C 300 115, 335 145, 335 195 C 335 245, 295 275, 242 275 C 185 275, 150 245, 150 195 Z"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            />
            <rect x="290" y="125" width="56" height="17" rx="3" fill="#0d151c" />
            <L x="318" y="138" fill={C.muted} size={11} anchor="middle" weight={600}>
              1020 hPa
            </L>

            <circle cx="242" cy="195" r="42" fill="#3b151b" stroke={C.low} strokeWidth="2.5" />
            <L x="242" y="200" fill={C.low} size={26} weight={900} anchor="middle">
              L
            </L>
            <L x="242" y="218" fill="#fca5a5" size={11} weight={800} anchor="middle">
              1015 hPa
            </L>

            <Arrow d="M 130 195 L 185 195" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
            <Arrow d="M 355 195 L 300 195" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
            <Arrow d="M 242 95 L 242 145" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
            <Arrow d="M 242 295 L 242 245" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />

            <Arrow d="M 140 160 Q 155 230 200 225" marker={m.fg} color={C.white} width={2.6} />
            <Arrow d="M 270 260 Q 320 220 280 175" marker={m.fg} color={C.white} width={2.6} />
            <Arrow d="M 330 160 Q 280 130 250 160" marker={m.fg} color={C.white} width={2.6} />
            <Arrow d="M 180 130 Q 200 170 215 175" marker={m.fg} color={C.white} width={2.6} />

            <rect x="55" y="325" width="375" height="65" rx="6" fill="#171216" stroke="#4a1820" strokeWidth="1.3" />
            <L x="242" y="344" fill={C.low} size={12} weight={800} anchor="middle">
              Netto bevegelse: Konvergens mot sentrum
            </L>
            <L x="242" y="362" fill={C.fg} size={11} anchor="middle">
              <tspan fill={C.warm}>Stiplet oransje:</tspan> Trykkgradientkraften (F_pg) suger luft innover.
            </L>
            <L x="242" y="378" fill={C.fg} size={11} anchor="middle">
              <tspan fill={C.white} fontWeight="bold">Hvit bue:</tspan> Vinden avbøyes mot høyre $
ightarrow$ spiral mot klokken inn.
            </L>
          </g>

          {/* KART B: 1015 hPa SOM HØYTRYKK */}
          <g transform="translate(470, 0)">
            <rect x="20" y="30" width="415" height="375" rx="8" fill="#0d151c" stroke="#1d2d3d" strokeWidth="1.5" />
            <circle cx="227" cy="195" r="145" fill="url(#rel-high-rad)" />

            <L x="227" y="58" size={16} weight={800} anchor="middle" fill={C.teal}>
              KART B: Høytrykkssenter (1015 hPa)
            </L>
            <L x="227" y="76" size={12} fill={C.muted} anchor="middle">
              Omgitt av LAVERE trykk (1005–1010 hPa)
            </L>

            <path
              d="M 90 195 C 90 115, 150 75, 227 75 C 310 75, 365 120, 365 195 C 365 270, 305 315, 227 315 C 145 315, 90 270, 90 195 Z"
              fill="none"
              stroke="#475569"
              strokeWidth="1.8"
            />
            <rect x="305" y="80" width="56" height="17" rx="3" fill="#0d151c" />
            <L x="333" y="93" fill={C.muted} size={11} anchor="middle" weight={600}>
              1005 hPa
            </L>

            <path
              d="M 135 195 C 135 140, 175 115, 227 115 C 285 115, 320 145, 320 195 C 320 245, 280 275, 227 275 C 170 275, 135 245, 135 195 Z"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            />
            <rect x="275" y="125" width="56" height="17" rx="3" fill="#0d151c" />
            <L x="303" y="138" fill={C.muted} size={11} anchor="middle" weight={600}>
              1010 hPa
            </L>

            <circle cx="227" cy="195" r="42" fill="#0f2b32" stroke={C.teal} strokeWidth="2.5" />
            <L x="227" y="200" fill={C.teal} size={26} weight={900} anchor="middle">
              H
            </L>
            <L x="227" y="218" fill="#67e8f9" size={11} weight={800} anchor="middle">
              1015 hPa
            </L>

            <Arrow d="M 180 195 L 125 195" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
            <Arrow d="M 275 195 L 330 195" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
            <Arrow d="M 227 150 L 227 100" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />
            <Arrow d="M 227 240 L 227 290" marker={m.warm} color={C.warm} width={2.2} dash="3 2" />

            <Arrow d="M 227 150 Q 280 145 310 180" marker={m.fg} color={C.white} width={2.6} />
            <Arrow d="M 265 215 Q 260 270 200 280" marker={m.fg} color={C.white} width={2.6} />
            <Arrow d="M 190 230 Q 145 220 135 170" marker={m.fg} color={C.white} width={2.6} />
            <Arrow d="M 185 160 Q 185 125 240 120" marker={m.fg} color={C.white} width={2.6} />

            <rect x="40" y="325" width="375" height="65" rx="6" fill="#101c22" stroke="#1c444f" strokeWidth="1.3" />
            <L x="227" y="344" fill={C.teal} size={12} weight={800} anchor="middle">
              Netto bevegelse: Divergens ut fra sentrum
            </L>
            <L x="227" y="362" fill={C.fg} size={11} anchor="middle">
              <tspan fill={C.warm}>Stiplet oransje:</tspan> Trykkgradientkraften (F_pg) presser luften utover.
            </L>
            <L x="227" y="378" fill={C.fg} size={11} anchor="middle">
              <tspan fill={C.white} fontWeight="bold">Hvit bue:</tspan> Vinden avbøyes mot høyre $
ightarrow$ spiral med klokken ut.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. LowPressureCrossSectionDiagram
 * Tverrsnitt av lavtrykk: konvergens, adiabatisk heving, LCL, latent varme,
 * realistisk Cumulonimbus med ambolt (incus) ved tropopause og divergens.
 */
export function LowPressureCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av et lavtrykk fra bakken til tropopausen"
      heading="Lavtrykkets anatomi: Konvergens, heving og skydannelse"
      caption="I et lavtrykk trekkes luft inn langs bakken mot senteret med lavest trykk (konvergens). Bakken danner en fast bunn som tvinger luften oppover. Luften avkjøles først tørradiabatisk (DALR = 1,0 °C / 100 m) inntil den når kondensasjonsnivået (LCL, skybasen) der relativ fuktighet når 100 %. Videre heving frigjør enorme mengder latent varme (~2,5 MJ/kg kondensert vann), noe som gir luften ekstra oppdrift og bygger mektige Cumulonimbus-skyer. Ved tropopausen (10–12 km) er stratosfæren stabilt varmere, og hevingen stanser brått: Skytoppen flater ut i en gigantisk ambolt (incus), og luften spres ut til sidene i høyden (divergens)."
      viewBox="0 0 940 510"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="low-cross-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0f16" />
              <stop offset="20%" stopColor="#141e2b" />
              <stop offset="60%" stopColor="#1b2d3d" />
              <stop offset="100%" stopColor="#253e54" />
            </linearGradient>

            <linearGradient id="cb-body-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#94a3b8" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#475569" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="cb-anvil-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.3" />
              <stop offset="30%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="rain-shaft-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          <rect x="30" y="30" width="880" height="450" rx="8" fill="url(#low-cross-sky)" />

          <rect x="30" y="30" width="880" height="60" rx="4" fill="#0b1118" opacity="0.8" />
          <line x1="30" y1="90" x2="910" y2="90" stroke={C.cold} strokeWidth="2" strokeDasharray="6 4" />
          <L x="50" y="60" fill={C.cold} size={14} weight={800}>
            Stratosfæren (Temperaturinversjon · Ozonvarme)
          </L>
          <L x="890" y="60" fill={C.cold} size={13} weight={700} anchor="end">
            Tropopausen (~11 km): Ufravikelig lokk på hevingen!
          </L>

          <rect x="30" y="440" width="880" height="40" rx="4" fill="#15241b" />
          <line x1="30" y1="440" x2="910" y2="440" stroke="#2a4c36" strokeWidth="2.5" />
          <L x="470" y="465" fill={C.low} size={16} weight={900} anchor="middle">
            LAVTRYKKSSENTER VED BAKKEN (L) · MINIMUMSLUFTTRYKK
          </L>

          <line x1="120" y1="330" x2="820" y2="330" stroke={C.teal} strokeDasharray="4 3" strokeWidth="1.8" />
          <L x="130" y="322" fill={C.teal} size={12} weight={800}>
            Kondensasjonsnivå (LCL, ~1 000 m) · 100 % Relativ fuktighet (RF)
          </L>
          <L x="130" y="345" fill={C.muted} size={10.5}>
            Her dannes den flate skybasen
          </L>

          <polygon
            points="340,330 600,330 630,440 310,440"
            fill="url(#rain-shaft-grad)"
          />
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 330 + i * 18;
            return (
              <line
                key={`rain-${i}`}
                x1={x}
                y1={335}
                x2={x - 15}
                y2={438}
                stroke="#7dd3fc"
                strokeWidth="1.6"
                strokeDasharray="6 4"
                opacity="0.8"
              />
            );
          })}
          <L x="470" y="415" fill="#e0f2fe" size={14} weight={800} anchor="middle">
            Kraftig nedbør og byger 🌧️⚡
          </L>

          <path
            d="M 280 330 
               C 250 300, 240 250, 280 220 
               C 270 180, 310 140, 360 150 
               C 380 110, 440 95, 470 95 
               C 500 95, 560 110, 580 150 
               C 630 140, 670 180, 660 220 
               C 700 250, 690 300, 660 330 
               Z"
            fill="url(#cb-body-grad)"
            stroke="#94a3b8"
            strokeWidth="1.8"
          />

          <path
            d="M 200 95 
               C 280 85, 380 90, 470 90 
               C 560 90, 660 85, 740 95 
               C 760 100, 720 125, 660 125 
               L 280 125 
               C 220 125, 180 100, 200 95 Z"
            fill="url(#cb-anvil-grad)"
          />
          <L x="470" y="82" fill="#f8fafc" size={12} weight={800} anchor="middle">
            Iset ambolt (incus) · Cirrusslør
          </L>

          <Arrow d="M 470 330 L 470 130" marker={m.warm} color={C.warm} width={4.2} />
          <rect x="395" y="195" width="150" height="42" rx="6" fill="#0f172a" opacity="0.9" />
          <L x="470" y="212" fill={C.warm} size={12} weight={800} anchor="middle">
            KRAFTIG OPP DRIFT
          </L>
          <L x="470" y="228" fill="#fde68a" size={10.5} weight={700} anchor="middle">
            Latent varme frigjøres!
          </L>

          <Arrow d="M 80 430 L 310 430" marker={m.low} color={C.low} width={3.6} />
          <L x="180" y="420" fill={C.low} size={13} weight={800} anchor="middle">
            Konvergens ved bakken →
          </L>

          <Arrow d="M 860 430 L 630 430" marker={m.low} color={C.low} width={3.6} />
          <L x="760" y="420" fill={C.low} size={13} weight={800} anchor="middle">
            ← Konvergens ved bakken
          </L>

          <Arrow d="M 390 105 L 140 105" marker={m.teal} color={C.teal} width={3.4} />
          <L x="240" y="96" fill={C.teal} size={12} weight={800} anchor="middle">
            ← Divergens i høyden
          </L>

          <Arrow d="M 550 105 L 800 105" marker={m.teal} color={C.teal} width={3.4} />
          <L x="700" y="96" fill={C.teal} size={12} weight={800} anchor="middle">
            Divergens i høyden →
          </L>

          <g transform="translate(680, 160)">
            <rect x="0" y="0" width="220" height="150" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <L x="14" y="24" fill={C.warm} size={12} weight={800}>
              🔥 Hvorfor stiger luften så høyt?
            </L>
            <L x="14" y="44" fill={C.fg} size={11}>
              1. <tspan fill={C.teal}>Umettet luft:</tspan> Avkjøles med DALR
            </L>
            <L x="28" y="59" fill={C.muted} size={10.5}>
              (-1,0 °C per 100 meter).
            </L>
            <L x="14" y="78" fill={C.fg} size={11}>
              2. <tspan fill="#fca5a5">Over LCL:</tspan> Vanndamp kondenserer.
            </L>
            <L x="14" y="96" fill={C.warm} size={11} weight={700}>
              Latent varme frigjøres! (~2,5 MJ/kg)
            </L>
            <L x="14" y="114" fill={C.fg} size={11}>
              3. Luften avkjøles nå saktere
            </L>
            <L x="28" y="129" fill={C.sand} size={10.5}>
              med SALR (~0,6 °C / 100 m) $
ightarrow$ enorm oppdrift!
            </L>
          </g>

          <g transform="translate(45, 170)">
            <rect x="0" y="0" width="180" height="120" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <L x="14" y="24" fill={C.cold} size={12} weight={800}>
              🌡️ Vertikal temperatur:
            </L>
            <L x="14" y="46" fill={C.cold} size={11}>
              11 km: <tspan fontWeight="bold">-55 °C</tspan> (Tropopause)
            </L>
            <L x="14" y="66" fill="#93c5fd" size={11}>
              5 km: <tspan fontWeight="bold">-15 °C</tspan> (Underkjølt)
            </L>
            <L x="14" y="86" fill={C.teal} size={11}>
              1 km: <tspan fontWeight="bold">+5 °C</tspan> (LCL / Skybase)
            </L>
            <L x="14" y="106" fill={C.warm} size={11}>
              0 m: <tspan fontWeight="bold">+15 °C</tspan> (Varm bakke)
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. HighPressureCrossSectionDiagram
 * Tverrsnitt av høytrykk: subsidens, oppvarming, fallende RF, skyoppløsning og divergens.
 */
export function HighPressureCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av et høytrykk fra tropopausen til bakken"
      heading="Høytrykkets anatomi: Subsidens, adiabatisk oppvarming og skyoppløsning"
      caption="I et høytrykk strømmer luften sammen i den øvre troposfæren og presses nedover mot bakken (subsidens). Denne nedsynkingen skjer sakte (få centimeter per sekund) over enorme geografiske områder. Ettersom luften synker ned i lag med høyere trykk, komprimeres den og varmes tørradiabatisk med 1,0 °C per 100 m. Varmere luft kan holde på langt mer vanndamp, og den relative fuktigheten (RF) stuper: Skydråper fordamper til usynlig gass, og himmelen blir krystallklar. Ved bakken oppstår et massivt overskudd av luft som strømmer ut til sidene (divergens). Om sommeren gir dette hetebølger og tørke; om vinteren fører skyfritt vær til ekstrem varmeutstråling og bitende kulde."
      viewBox="0 0 940 510"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="high-cross-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08101a" />
              <stop offset="25%" stopColor="#0f263c" />
              <stop offset="65%" stopColor="#1e486d" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="high-sun-rays" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect x="30" y="30" width="880" height="450" rx="8" fill="url(#high-cross-sky)" />

          <circle cx="160" cy="90" r="35" fill="#fef08a" opacity="0.95" />
          <circle cx="160" cy="90" r="55" fill="#fde047" opacity="0.25" />
          <polygon points="135,115 50,440 320,440 185,115" fill="url(#high-sun-rays)" />
          <polygon points="160,125 350,440 650,440 180,125" fill="url(#high-sun-rays)" />

          <rect x="30" y="30" width="880" height="50" rx="4" fill="#080e14" opacity="0.8" />
          <line x1="30" y1="80" x2="910" y2="80" stroke={C.cold} strokeWidth="1.8" strokeDasharray="6 4" />
          <L x="50" y="55" fill={C.cold} size={14} weight={800}>
            Øvre troposfære / Tropopause (~11 km)
          </L>
          <L x="890" y="55" fill={C.cold} size={13} weight={700} anchor="end">
            Konvergens i høyden mater nedsynkingen
          </L>

          <Arrow d="M 680 50 L 530 50" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 260 50 L 410 50" marker={m.teal} color={C.teal} width={3.2} />

          <rect x="30" y="440" width="880" height="40" rx="4" fill="#2d2212" />
          <line x1="30" y1="440" x2="910" y2="440" stroke="#785a2b" strokeWidth="2.5" />
          <L x="470" y="465" fill={C.warm} size={16} weight={900} anchor="middle">
            HØYTRYKKSSENTER VED BAKKEN (H) · MAKSIMALT LUFTTRYKK (LUFTOVERSKUDD)
          </L>

          <Arrow d="M 380 95 L 380 380" marker={m.warm} color={C.warm} width={3.8} />
          <Arrow d="M 470 95 L 470 380" marker={m.warm} color={C.warm} width={4.4} />
          <Arrow d="M 560 95 L 560 380" marker={m.warm} color={C.warm} width={3.8} />

          <rect x="360" y="195" width="220" height="50" rx="8" fill="#0f172a" opacity="0.9" stroke={C.warm} strokeWidth="1.5" />
          <L x="470" y="217" fill={C.warm} size={14} weight={900} anchor="middle">
            SUBSIDENS (NEDSYNKNING)
          </L>
          <L x="470" y="234" fill="#fde68a" size={11} weight={700} anchor="middle">
            Tørradiabatisk oppvarming (+1,0 °C / 100 m)
          </L>

          <g transform="translate(640, 160)">
            <path
              d="M 20 50 C 10 35, 30 15, 55 20 C 70 5, 100 10, 110 30 C 130 25, 140 45, 125 60 C 110 70, 30 70, 20 50 Z"
              fill="#94a3b8"
              opacity="0.35"
              stroke="#cbd5e1"
              strokeDasharray="4 3"
              strokeWidth="1.5"
            />
            <Arrow d="M 60 55 L 60 25" marker={m.sand} color={C.sand} width={1.8} />
            <Arrow d="M 95 55 L 95 25" marker={m.sand} color={C.sand} width={1.8} />
            <L x="75" y="88" fill={C.sand} size={12} weight={800} anchor="middle">
              Skyrester fordamper!
            </L>
            <L x="75" y="104" fill={C.fg} size={10.5} anchor="middle">
              Økende temperatur $
ightarrow$ lavere RF
            </L>
          </g>

          <line x1="80" y1="360" x2="860" y2="360" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <L x="90" y="352" fill="#fbbf24" size={12} weight={800}>
            Subsidensinversjon (Temperaturlokk ved ~1 500 m)
          </L>
          <L x="850" y="352" fill={C.muted} size={11} anchor="end">
            Tåke og forurensning kan fanges under lokket
          </L>

          <Arrow d="M 430 425 L 120 425" marker={m.warm} color={C.warm} width={3.6} />
          <L x="260" y="415" fill={C.warm} size={13} weight={800} anchor="middle">
            ← Divergens: Luft strømmer ut
          </L>

          <Arrow d="M 510 425 L 820 425" marker={m.warm} color={C.warm} width={3.6} />
          <L x="680" y="415" fill={C.warm} size={13} weight={800} anchor="middle">
            Divergens: Luft strømmer ut →
          </L>

          <g transform="translate(50, 220)">
            <rect x="0" y="0" width="260" height="110" rx="8" fill="#0f172a" opacity="0.92" stroke="#334155" strokeWidth="1.5" />
            <L x="16" y="24" fill={C.warm} size={13} weight={800}>
              ☀️ Sommerhøytrykk:
            </L>
            <L x="16" y="42" fill={C.fg} size={11}>
              Maks solinnstråling hele dagen.
            </L>
            <L x="16" y="58" fill={C.warm} size={11} weight={700}>
              $
ightarrow$ Hetebølge, tørke og skogbrannfare.
            </L>

            <L x="16" y="80" fill={C.cold} size={13} weight={800}>
              ❄️ Vinterhøytrykk:
            </L>
            <L x="16" y="98" fill={C.cold} size={11} weight={700}>
              $
ightarrow$ Maks varmeutstråling, sprengkulde & inversjon.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. WindForcesBalanceDiagram
 * Fysisk korrekt vektorbalanse:
 * - V peker mot sørvest
 * - F_c peker mot NORDVEST (90° til høyre for V)
 * - F_f peker mot NORDØST (motsatt av V)
 * - Vektorsum F_c + F_f balanserer F_pg (rett sør)
 */
export function WindForcesBalanceDiagram() {
  return (
    <Diagram
      title="Hvorfor blåser vinden på skrå? De tre kreftene bak vinden"
      heading="Hvorfor blåser vinden på skrå over isobarene? De tre kreftene"
      caption="Vind er luft i bevegelse drevet av trykkforskjeller, men banen styres av tre krefter i samspill: 1) Trykkgradientkraften (F_pg, rød) trekker luften vinkelrett fra høyt mot lavt trykk. 2) Corioliskraften (F_c, blå) avbøyer alltid bevegelsen 90° til høyre på nordlig halvkule. I den frie atmosfæren (uten friksjon) balanserer F_pg og F_c hverandre nøyaktig, slik at vinden blåser parallelt med isobarene (geostrofisk vind). 3) Nær bakken bremser friksjonen (F_f, gul/oransje) vindfarten. Siden Corioliskraften er proporsjonal med farten, svekkes den: Trykkgradientkraften vinner delvis drakampen, og vinden skjærer på skrå over isobarene i ca. 25–30° vinkel inn i lavtrykket (konvergens mot klokken) og ut av høytrykket (divergens med klokken)."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          <line
            x1="470"
            y1="35"
            x2="470"
            y2="475"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* DEL 1 (VENSTRE): KRAFTBALANSE */}
          <g transform="translate(0, 0)">
            <L x="235" y="40" size={16} weight={800} anchor="middle" fill={C.teal}>
              Del 1: Kraftbalansen ved bakken (Nordlig halvkule)
            </L>
            <L x="235" y="58" size={12} fill={C.muted} anchor="middle">
              Vektorsummen: F_pg + F_c + F_f = 0
            </L>

            <line x1="50" y1="100" x2="430" y2="100" stroke="#475569" strokeWidth="2" />
            <rect x="360" y="88" width="65" height="18" rx="3" fill="#0f171c" />
            <L x="392" y="102" fill={C.muted} size={11} anchor="middle">
              1020 hPa (H)
            </L>

            <line x1="50" y1="210" x2="430" y2="210" stroke="#64748b" strokeWidth="2" />
            <rect x="360" y="198" width="65" height="18" rx="3" fill="#0f171c" />
            <L x="392" y="212" fill={C.muted} size={11} anchor="middle">
              1010 hPa
            </L>

            <line x1="50" y1="320" x2="430" y2="320" stroke="#475569" strokeWidth="2" />
            <rect x="360" y="308" width="65" height="18" rx="3" fill="#0f171c" />
            <L x="392" y="322" fill={C.muted} size={11} anchor="middle">
              1000 hPa (L)
            </L>

            <path
              d="M 180 210 A 50 50 0 0 1 187 236"
              fill="none"
              stroke={C.sand}
              strokeWidth="1.6"
            />
            <L x="160" y="228" fill={C.sand} size={11} weight={700}>
              α ≈ 30°
            </L>

            <circle cx="230" cy="210" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
            <L x="230" y="215" fill="#bae6fd" size={11} weight={900} anchor="middle">
              Luft
            </L>

            {/* F_pg (rett SØR mot L) */}
            <Arrow d="M 230 210 L 230 310" marker={m.low} color={C.low} width={3.6} />
            <L x="242" y="280" fill={C.low} size={13} weight={800}>
              F_pg (Trykkgradientkraft)
            </L>
            <L x="242" y="296" fill={C.muted} size={10}>
              Rettvinklet mot lavere trykk
            </L>

            {/* VIND (V) mot sørvest */}
            <Arrow d="M 230 210 L 130 265" marker={m.teal} color={C.teal} width={4.2} />
            <L x="110" y="285" fill={C.teal} size={14} weight={900} anchor="middle">
              VIND (V)
            </L>
            <L x="110" y="300" fill={C.muted} size={10} anchor="middle">
              Blåser på skrå inn i L
            </L>

            {/* CORIOLISKRAFT F_c (90° høyre for V -> NORDVEST!) */}
            <Arrow d="M 230 210 L 180 120" marker={m.cold} color={C.cold} width={3.2} />
            <L x="175" y="105" fill={C.cold} size={13} weight={800} anchor="end">
              F_c (Corioliskraft)
            </L>
            <L x="175" y="120" fill={C.muted} size={10} anchor="end">
              Alltid 90° til høyre for V!
            </L>

            {/* BAKKEFRIKSJON F_f (motsatt av V -> NORDØST!) */}
            <Arrow d="M 230 210 L 280 183" marker={m.sand} color={C.sand} width={3} />
            <L x="290" y="175" fill={C.sand} size={13} weight={800}>
              F_f (Bakkefriksjon)
            </L>
            <L x="290" y="190" fill={C.muted} size={10}>
              Bremser farten ⟹ svekker F_c
            </L>

            <line x1="180" y1="120" x2="230" y2="93" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.2" />
            <line x1="280" y1="183" x2="230" y2="93" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.2" />
            <Arrow d="M 230 210 L 230 110" marker={m.warm} color={C.warm} width={2} dash="4 3" />
            <L x="235" y="135" fill={C.warm} size={10.5} weight={700}>
              F_c + F_f opphever F_pg
            </L>

            <rect x="50" y="350" width="380" height="120" rx="8" fill="#111822" stroke="#1e293b" strokeWidth="1.4" />
            <L x="65" y="374" fill={C.teal} size={12} weight={800}>
              I fri troposfære (uten friksjon): Geostrofisk vind
            </L>
            <L x="65" y="392" fill={C.fg} size={11}>
              F_f = 0 ⟹ F_pg = F_c. Vinden blåser <tspan fill={C.teal} fontWeight="bold">parallelt med isobarene</tspan>!
            </L>
            <L x="65" y="416" fill={C.sand} size={12} weight={800}>
              Nær bakken (med friksjon):
            </L>
            <L x="65" y="434" fill={C.fg} size={11}>
              Friksjon bremser farten ⟹ F_c svekkes ⟹ F_pg trekker
            </L>
            <L x="65" y="452" fill={C.low} size={11} weight={700}>
              luften på skrå (25–30°) inn i lavtrykket!
            </L>
          </g>

          {/* DEL 2 (HØYRE): SIRKULASJON */}
          <g transform="translate(470, 0)">
            <L x="235" y="40" size={16} weight={800} anchor="middle" fill={C.warm}>
              Del 2: Rotasjonsmønster på bakken (Nordlig halvkule)
            </L>
            <L x="235" y="58" size={12} fill={C.muted} anchor="middle">
              Lavtrykk (mot klokken) vs. Høytrykk (med klokken)
            </L>

            <g transform="translate(120, 165)">
              <circle cx="0" cy="0" r="75" fill="none" stroke="#334155" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="45" fill="none" stroke="#475569" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="24" fill="#3b151b" stroke={C.low} strokeWidth="2.2" />
              <L x="0" y="7" fill={C.low} size={20} weight={900} anchor="middle">
                L
              </L>

              <Arrow d="M -75 0 Q -50 50 0 45" marker={m.low} color={C.low} width={2.4} />
              <Arrow d="M 0 75 Q 50 50 45 0" marker={m.low} color={C.low} width={2.4} />
              <Arrow d="M 75 0 Q 50 -50 0 -45" marker={m.low} color={C.low} width={2.4} />
              <Arrow d="M 0 -75 Q -50 -50 -45 0" marker={m.low} color={C.low} width={2.4} />

              <L x="0" y="98" fill={C.low} size={13} weight={800} anchor="middle">
                Lavtrykk (Syklonal)
              </L>
              <L x="0" y="115" fill={C.fg} size={11} anchor="middle">
                Spiral MOT KLOKKEN inn
              </L>
              <L x="0" y="130" fill={C.muted} size={10} anchor="middle">
                (Konvergens $
ightarrow$ oppdrift)
              </L>
            </g>

            <g transform="translate(350, 165)">
              <circle cx="0" cy="0" r="75" fill="none" stroke="#334155" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="45" fill="none" stroke="#475569" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="24" fill="#0f2b32" stroke={C.teal} strokeWidth="2.2" />
              <L x="0" y="7" fill={C.teal} size={20} weight={900} anchor="middle">
                H
              </L>

              <Arrow d="M -20 -20 Q -60 -40 -75 0" marker={m.teal} color={C.teal} width={2.4} />
              <Arrow d="M 20 -20 Q 40 -60 0 -75" marker={m.teal} color={C.teal} width={2.4} />
              <Arrow d="M 20 20 Q 60 40 75 0" marker={m.teal} color={C.teal} width={2.4} />
              <Arrow d="M -20 20 Q -40 60 0 75" marker={m.teal} color={C.teal} width={2.4} />

              <L x="0" y="98" fill={C.teal} size={13} weight={800} anchor="middle">
                Høytrykk (Antisyklonal)
              </L>
              <L x="0" y="115" fill={C.fg} size={11} anchor="middle">
                Spiral MED KLOKKEN ut
              </L>
              <L x="0" y="130" fill={C.muted} size={10} anchor="middle">
                (Divergens $
ightarrow$ nedsynking)
              </L>
            </g>

            <rect x="35" y="350" width="400" height="120" rx="8" fill="#111822" stroke="#1e293b" strokeWidth="1.4" />
            <L x="50" y="374" fill={C.sand} size={13} weight={800}>
              🧭 Buys Ballots lov (1857):
            </L>
            <L x="50" y="396" fill={C.fg} size={12}>
              Står du med <tspan fontWeight="bold" fill={C.teal}>vinden i ryggen</tspan> på nordlig halvkule,
            </L>
            <L x="50" y="415" fill={C.low} size={13} weight={800}>
              har du alltid lavtrykket skrått foran deg til venstre!
            </L>
            <L x="50" y="438" fill={C.muted} size={11}>
              (Og høytrykket skrått bak deg til høyre).
            </L>
            <L x="50" y="455" fill={C.sand} size={10.5}>
              På sørlig halvkule er alle rotasjonsretninger speilvendt.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. KatabaticWindDiagram
 * Viser utstråling over isbre/høyfjell, gravitasjonsdrenasje av tung kaldluft,
 * dannelse av kaldluftssjø og temperaturinversjon med røyklokk i dalbunn.
 */
export function KatabaticWindDiagram() {
  return (
    <Diagram
      title="Katabatisk fallvind og dannelse av temperaturinversjon"
      heading="Katabatisk vind: Gravitasjonsdrevet kaldluft og dype inversjoner"
      caption="Katabatisk vind (fra gresk katabatikos: 'gående nedover') oppstår når snø- og isflater mister store mengder varme gjennom langbølget infrarød utstråling under en stjerneklar vinternatt. Luftlaget nærmest snøen blir ekstremt kaldt, tett og tungt. Tyngdekraften trekker denne tunge luften nedover fjellsider og brefall som en brusende 'elv av kulde'. Nede i dalbunnen eller fjorden samler kaldluften seg i en dyp kaldluftssjø (-20 °C). Dette skaper en markert temperaturinversjon, der det er bitende kaldt i dalen, men opptil 15 grader mildere litt lenger oppe i åssiden (-5 °C). Røyk og forurensning fanges under inversjonslokket."
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="kata-night-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04080e" />
              <stop offset="35%" stopColor="#0a131e" />
              <stop offset="75%" stopColor="#101d2d" />
              <stop offset="100%" stopColor="#15263a" />
            </linearGradient>

            <linearGradient id="kata-glacier-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="30%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="kata-coldpool-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#0284c7" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <rect x="30" y="30" width="880" height="420" rx="8" fill="url(#kata-night-sky)" />

          <circle cx="120" cy="70" r="16" fill="#fef08a" opacity="0.9" />
          <circle cx="115" cy="68" r="14" fill="#060b12" />
          {[
            [180, 55], [230, 75], [290, 50], [450, 65], [620, 55], [780, 70], [840, 50]
          ].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r={1.2} fill="#ffffff" opacity={0.8} />
          ))}

          <path
            d="M 30 150 
               L 310 150 
               Q 430 165 520 330 
               L 910 370 
               L 910 450 
               L 30 450 Z"
            fill="#121e29"
            stroke="#22384a"
            strokeWidth="2"
          />

          <path
            d="M 30 150 
               L 310 150 
               Q 360 160 400 220 
               L 375 235 
               Q 330 170 290 165 
               L 30 165 Z"
            fill="url(#kata-glacier-grad)"
          />
          <L x="160" y="140" fill="#e0f2fe" size={14} weight={800} anchor="middle">
            Platåbre / Snøvidde (f.eks. Folgefonna eller Grønland)
          </L>

          <Arrow d="M 90 125 L 90 55" marker={m.sand} color={C.sand} width={2.2} />
          <Arrow d="M 180 125 L 180 55" marker={m.sand} color={C.sand} width={2.2} />
          <Arrow d="M 270 125 L 270 55" marker={m.sand} color={C.sand} width={2.2} />
          <L x="180" y="45" fill={C.sand} size={11.5} weight={700} anchor="middle">
            Maksimal infrarød varmestråling tapes til rommet
          </L>

          <rect x="50" y="180" width="220" height="26" rx="4" fill="#0f2638" stroke={C.cold} strokeWidth="1.2" />
          <L x="160" y="197" fill="#7dd3fc" size={11.5} weight={800} anchor="middle">
            Iskald, ultrakomprimert luft dannes (-25 °C)
          </L>

          <path
            d="M 310 165 Q 430 180 515 340"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="10"
            opacity="0.35"
          />
          <Arrow d="M 310 165 Q 430 180 515 340" marker={m.cold} color={C.cold} width={4.2} />
          <L x="425" y="235" fill={C.cold} size={14} weight={900}>
            Katabatisk fallvind
          </L>
          <L x="425" y="253" fill={C.fg} size={11}>
            Tyngdekraften trekker den tunge
          </L>
          <L x="425" y="269" fill={C.fg} size={11}>
            kaldluften nedover som en elv
          </L>

          {/* KALDLyFTSSJØ I DALBUNNEN (KORRIGERT FRA KALDL carssJØ) */}
          <rect x="520" y="330" width="390" height="120" rx="4" fill="url(#kata-coldpool-grad)" />
          <line x1="520" y1="330" x2="910" y2="330" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="5 3" />
          <L x="715" y="355" fill="#f0f9ff" size={16} weight={900} anchor="middle">
            KALDLyFTSSJØ I DALBUNNEN (-20 °C)
          </L>

          <g transform="translate(620, 395)">
            <polygon points="15,-15 30,-30 45,-15" fill="#991b1b" />
            <rect x="15" y="-15" width="30" height="20" fill="#78350f" />
            <rect x="36" y="-30" width="4" height="10" fill="#475569" />
            <path
              d="M 38 -30 Q 35 -50 38 -65 L 120 -65"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3.5"
              opacity="0.8"
            />
            <L x="55" y="-72" fill="#cbd5e1" size={10.5} weight={700}>
              Røyk stanger i inversjonslokket!
            </L>
          </g>

          <g transform="translate(680, 210)">
            <rect x="0" y="0" width="220" height="95" rx="6" fill="#141d24" stroke="#eab308" strokeWidth="1.5" />
            <L x="14" y="24" fill="#facc15" size={13} weight={800}>
              🌡️ Temperaturinversjon:
            </L>
            <L x="14" y="44" fill={C.fg} size={11}>
              Oppe i lia: <tspan fill="#facc15" fontWeight="bold">-5 °C</tspan> (Mye mildere!)
            </L>
            <L x="14" y="62" fill={C.fg} size={11}>
              I dalbunnen: <tspan fill={C.cold} fontWeight="bold">-20 °C</tspan> (Bikkjekaldt)
            </L>
            <L x="14" y="82" fill={C.sand} size={10.5}>
              Temperaturen ØKER med høyden opp fra dalen!
            </L>
          </g>

          <g transform="translate(45, 340)">
            <rect x="0" y="0" width="420" height="95" rx="8" fill="#0f1722" stroke="#1e293b" strokeWidth="1.4" />
            <L x="14" y="22" fill={C.warm} size={12.5} weight={800}>
              Eksamensskille: Fønvind vs. Katabatisk fallvind
            </L>
            <L x="14" y="44" fill={C.fg} size={11}>
              • <tspan fill={C.warm} fontWeight="bold">Fønvind:</tspan> Drevet av storskalavind over fjell. Mye regn på losiden
            </L>
            <L x="26" y="59" fill={C.fg} size={11}>
              frigjør latent varme $
ightarrow$ lander <tspan fill={C.warm} fontWeight="bold">varm og tørr</tspan> i le. <tspan fill={C.warm}>Bryter opp inversjoner.</tspan>
            </L>
            <L x="14" y="78" fill={C.fg} size={11}>
              • <tspan fill={C.cold} fontWeight="bold">Katabatisk vind:</tspan> Drevet av tyngdekraft fra kald overflate. Ingen regn
            </L>
            <L x="26" y="93" fill={C.fg} size={11}>
              $
ightarrow$ lander <tspan fill={C.cold} fontWeight="bold">iskald og tung</tspan> i dalen. <tspan fill={C.cold}>Bygger opp dype inversjoner.</tspan>
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. SeaBreezeDiagram
 * Viser solgangsbris: sjøbris om dagen og landbris om natten med realistisk kystmiljø,
 * cumulus humilis over land om dagen, havbølger, temperaturer og returstrøm i høyden.
 */
export function SeaBreezeDiagram() {
  return (
    <Diagram
      title="Solgangsbris: Sjøbris om dagen og landbris om natten"
      heading="Pålandsvind og fralandsvind: Lokale temperatur- og trykkforskjeller"
      caption="Pålandsvind (sjøbris) og fralandsvind (landbris) er et klassisk lokalt termisk kretsløp drevet av at land og vann har ulik spesifikk varmekapasitet. Vann har om lag fire ganger høyere varmekapasitet enn stein og sand, og solstrålene trenger metervis ned i sjøen. Derfor varmes landjorden mye raskere opp om dagen enn havet. Luften over land stiger (termisk lavtrykk L) og danner ofte små godværsskyer (cumulus humilis) innover land, mens den kjølige luften over havet (H) suges inn som en frisk sjøbris. Om natten taper landjorden varme lynraskt ved utstråling, luften synker over land (H), og en svakere landbris blåser ut mot det lunkne havet."
      viewBox="0 0 940 430"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="sb-day-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>

            <linearGradient id="sb-night-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="60%" stopColor="#0b1329" />
              <stop offset="100%" stopColor="#111c38" />
            </linearGradient>

            <linearGradient id="sb-sea-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>

            <linearGradient id="sb-land-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="40%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>

            <linearGradient id="sb-land-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          <line
            x1="470"
            y1="30"
            x2="470"
            y2="410"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* DAG: SJØBRIS */}
          <g transform="translate(0, 0)">
            <rect x="35" y="30" width="415" height="260" rx="8" fill="url(#sb-day-sky)" />

            <circle cx="100" cy="75" r="22" fill="#fef08a" />
            <circle cx="100" cy="75" r="35" fill="#fde047" opacity="0.3" />

            <L x="242" y="55" size={15} weight={800} anchor="middle" fill="#fef08a">
              ☀️ DAG: Sjøbris (Pålandsvind)
            </L>
            <L x="242" y="73" size={11} fill="#e0f2fe" anchor="middle">
              Land varmes raskt opp $
ightarrow$ luften stiger
            </L>

            <rect x="35" y="250" width="180" height="130" fill="url(#sb-sea-grad)" />
            <path
              d="M 45 255 Q 65 250 85 255 T 125 255 T 165 255 T 205 255"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.4"
            />

            <path
              d="M 205 250 Q 230 248 260 242 L 450 232 L 450 380 L 205 380 Z"
              fill="url(#sb-land-day)"
              stroke="#92400e"
              strokeWidth="1.5"
            />
            <polygon points="390,230 380,210 370,230" fill="#15803d" />
            <polygon points="390,220 380,200 370,220" fill="#16a34a" />
            <rect x="378" y="230" width="4" height="6" fill="#78350f" />

            <path
              d="M 330 145 
                 C 320 135, 330 120, 345 122 
                 C 355 110, 380 112, 390 125 
                 C 405 125, 415 138, 405 148 Z"
              fill="#ffffff"
              opacity="0.95"
            />
            <L x="370" y="105" fill="#f8fafc" size={10.5} weight={700} anchor="middle">
              Godværsskyer over land
            </L>

            <circle cx="370" cy="275" r="16" fill="#7f1d1d" stroke={C.low} strokeWidth="1.8" />
            <L x="370" y="281" fill="#fca5a5" size={14} weight={900} anchor="middle">
              L
            </L>
            <L x="370" y="302" fill="#fde68a" size={11} weight={800} anchor="middle">
              Varmt land (+25 °C)
            </L>

            <circle cx="120" cy="275" r="16" fill="#0c4a6e" stroke={C.teal} strokeWidth="1.8" />
            <L x="120" y="281" fill="#67e8f9" size={14} weight={900} anchor="middle">
              H
            </L>
            <L x="120" y="302" fill="#bae6fd" size={11} weight={800} anchor="middle">
              Kjølig hav (+16 °C)
            </L>

            <Arrow d="M 145 240 L 320 240" marker={m.teal} color={C.teal} width={3.6} />
            <L x="232" y="230" fill="#082f49" size={12} weight={900} anchor="middle">
              Sjøbris (Pålandsvind) →
            </L>

            <Arrow d="M 370 215 L 370 155" marker={m.warm} color={C.warm} width={3.2} />

            <Arrow d="M 340 135 L 140 135" marker={m.fg} color={C.white} width={2.4} dash="4 3" />
            <L x="240" y="125" fill="#f8fafc" size={11} weight={700} anchor="middle">
              ← Returstrøm i høyden
            </L>

            <Arrow d="M 120 155 L 120 220" marker={m.cold} color={C.cold} width={2.8} />

            <rect x="50" y="330" width="385" height="50" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />
            <L x="242" y="350" fill={C.teal} size={11.5} weight={700} anchor="middle">
              Høy solinnstråling gir markant trykkgradient.
            </L>
            <L x="242" y="368" fill={C.fg} size={11} anchor="middle">
              Sjøbrisen starter gjerne i 11–12-tiden og kulminerer om ettermiddagen.
            </L>
          </g>

          {/* NATT: LANDBRIS */}
          <g transform="translate(470, 0)">
            <rect x="20" y="30" width="415" height="260" rx="8" fill="url(#sb-night-sky)" />

            <circle cx="390" cy="75" r="16" fill="#fef08a" opacity="0.9" />
            <circle cx="384" cy="72" r="14" fill="#0b1329" />

            <L x="227" y="55" size={15} weight={800} anchor="middle" fill="#93c5fd">
              🌙 NATT: Landbris (Fralandsvind)
            </L>
            <L x="227" y="73" size={11} fill="#cbd5e1" anchor="middle">
              Land avkjøles raskt $
ightarrow$ kald luft synker
            </L>

            <rect x="20" y="250" width="180" height="130" fill="url(#sb-sea-grad)" />
            <path
              d="M 30 255 Q 50 252 70 255 T 110 255 T 150 255 T 190 255"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              opacity="0.6"
            />

            <path
              d="M 190 250 Q 215 248 245 242 L 435 232 L 435 380 L 190 380 Z"
              fill="url(#sb-land-night)"
              stroke="#334155"
              strokeWidth="1.5"
            />

            <circle cx="355" cy="275" r="16" fill="#0f2b32" stroke={C.teal} strokeWidth="1.8" />
            <L x="355" y="281" fill="#67e8f9" size={14} weight={900} anchor="middle">
              H
            </L>
            <L x="355" y="302" fill="#93c5fd" size={11} weight={800} anchor="middle">
              Kaldt land (+10 °C)
            </L>

            <circle cx="105" cy="275" r="16" fill="#7f1d1d" stroke={C.low} strokeWidth="1.8" />
            <L x="105" y="281" fill="#fca5a5" size={14} weight={900} anchor="middle">
              L
            </L>
            <L x="105" y="302" fill="#bae6fd" size={11} weight={800} anchor="middle">
              Lunkent hav (+16 °C)
            </L>

            <Arrow d="M 310 240 L 135 240" marker={m.teal} color={C.teal} width={3} />
            <L x="222" y="230" fill={C.teal} size={12} weight={900} anchor="middle">
              ← Landbris (Fralandsvind)
            </L>

            <Arrow d="M 105 215 L 105 155" marker={m.warm} color={C.warm} width={2.4} />

            <Arrow d="M 125 135 L 325 135" marker={m.fg} color={C.white} width={2.2} dash="4 3" />
            <L x="225" y="125" fill="#cbd5e1" size={11} weight={700} anchor="middle">
              Returstrøm i høyden →
            </L>

            <Arrow d="M 355 155 L 355 220" marker={m.cold} color={C.cold} width={2.6} />

            <rect x="35" y="330" width="385" height="50" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />
            <L x="227" y="350" fill={C.sand} size={11.5} weight={700} anchor="middle">
              Landbrisen er svakere enn sjøbrisen.
            </L>
            <L x="227" y="368" fill={C.fg} size={11} anchor="middle">
              Temperaturforskjellen hav/land er mindre om natten enn midt på dagen.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}
