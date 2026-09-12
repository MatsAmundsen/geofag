import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. ModelGrid3DDiagram
 * 3D isometrisk tverrsnitt av atmosfæren over norsk topografi (kyst, fjord, fjell).
 * Viser horisontale rutenettceller (dx, dy), vertikale terrengfølgende sigma-koordinater
 * som flates ut mot stratosfæren, og en forstørret celle med tilstandsvariabler (u, v, w, T, p, q).
 */
export function ModelGrid3DDiagram() {
  return (
    <Diagram
      title="3D-rutenett og vertikale koordinater i en numerisk modell over norsk topografi"
      heading="Atmosfæren delt i et tredimensjonalt rutenett"
      caption="En numerisk værmodell deler atmosfæren i et tredimensjonalt nettverk av beregningsceller. Horisontalt bestemmes oppløsningen av cellebredden Δx og celledybden Δy (for eksempel 2,5 km i MEPS og 9 km i ECMWF). Vertikalt deles luftsøylen i 65–137 lag fra bakken til mesosfæren. Nær bakken benyttes terrengfølgende koordinater (sigma-flater) som buer seg mykt over norske fjell og fjorder, før de høyere oppe går over i plane isobarflater. For hver eneste celle beregner superdatamaskinen de seks fundamentale meteorologiske tilstandsvariablene: horisontal vind (u, v), vertikal vind (w), temperatur (T), lufttrykk (p), vanndamp (q) og skymengde."
      viewBox="0 0 940 540"
      wide
    >
      {() => (
        <>
          <defs>
            {/* Atmosfæregrafient vertikalt */}
            <linearGradient id="nm-sky-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#081018" />
              <stop offset="35%" stopColor="#0e1a26" />
              <stop offset="70%" stopColor="#152839" />
              <stop offset="100%" stopColor="#1d354a" />
            </linearGradient>

            {/* Hav- og terrenggradient */}
            <linearGradient id="nm-terrain-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0d2636" />
              <stop offset="30%" stopColor="#1e3a29" />
              <stop offset="65%" stopColor="#2c4d3b" />
              <stop offset="85%" stopColor="#475245" />
              <stop offset="100%" stopColor="#7a8b99" />
            </linearGradient>

            {/* Fremhevet celle-glød */}
            <linearGradient id="nm-cell-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsrom */}
          <rect x="25" y="25" width="890" height="490" rx="10" fill="url(#nm-sky-grad)" stroke="#1a2d3d" strokeWidth="1.2" />

          {/* ØVRE STRATOSFÆRE/TOA MERKING */}
          <line x1="60" y1="65" x2="880" y2="65" stroke={C.muted} strokeWidth="1" strokeDasharray="5 4" opacity="0.5" />
          <L x="70" y="55" fill={C.cold} size={11} weight={700}>Øvre modellrand (TOA · ~0,01 hPa / 65 km · Innkommende solstråling og utgående IR)</L>
          <L x="870" y="55" fill={C.muted} size={11} anchor="end">Horisontale isobarflater</L>

          {/* 3D-PERSPEKTIV: TERRENG OG RUTENETT */}
          {/* Havnivå til venstre (0 moh), fjord og bratt fjelltopp til høyre (1800 moh) */}
          <g transform="translate(60, 80)">
            {/* Vertikale nivåer (Sigma-flater) som buer over fjellet */}
            {/* Nivå 5 (Topp: flat) */}
            <path d="M 40 40 L 480 40 L 580 80 L 140 80 Z" fill="none" stroke={C.teal} strokeWidth="1" opacity="0.35" />
            {/* Nivå 4 (Øvre troposfære: nesten flat) */}
            <path d="M 40 100 L 480 100 L 580 145 L 140 145 Z" fill="none" stroke={C.teal} strokeWidth="1" opacity="0.45" />
            {/* Nivå 3 (Midtre troposfære: svak heving over fjell) */}
            <path d="M 40 165 C 200 165 320 155 480 145 L 580 195 C 420 205 300 215 140 215 Z" fill="none" stroke={C.teal} strokeWidth="1.1" opacity="0.55" />
            {/* Nivå 2 (Lavere troposfære: tydelig terrengbøyning) */}
            <path d="M 40 235 C 180 235 280 200 380 160 C 430 140 460 170 480 190 L 580 245 C 560 225 530 190 480 215 C 380 255 280 285 140 285 Z" fill="none" stroke={C.teal} strokeWidth="1.2" opacity="0.75" />

            {/* Terrenget nederst (Nivå 1 - Bakkenivå / Sigma = 1) */}
            <path
              d="M 40 310 C 120 310 160 305 220 300 C 270 295 310 240 370 190 C 410 160 450 200 480 235 L 580 295 C 550 255 510 215 470 245 C 410 295 370 350 320 355 C 260 360 220 365 140 365 Z"
              fill="url(#nm-terrain-grad)"
              stroke={C.sand}
              strokeWidth="2"
            />

            {/* Kyst- og fjordinnslag markør */}
            <path d="M 40 310 L 140 310 L 220 305 L 140 365 Z" fill="#0c4a6e" opacity="0.7" />
            <L x="120" y="340" fill={C.cold} size={11} weight={700}>Norskehavet</L>
            <L x="390" y="225" fill="#f8fafc" size={11} weight={700}>Fjellmassiv (1800 m)</L>

            {/* Rutenettlinjer langs terrenget (Horisontale celler) */}
            {[80, 140, 200, 260, 320, 380, 440].map((gx, idx) => (
              <line
                key={`grid-x-${idx}`}
                x1={gx}
                y1={300 - (gx > 240 ? (gx - 240) * 0.45 : 0)}
                x2={gx + 95}
                y2={355 - (gx > 240 ? (gx - 240) * 0.45 : 0)}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />
            ))}

            {/* Vertikale søylekanter (3D-kolonner) */}
            {[40, 140, 260, 370, 480].map((vx, idx) => (
              <line
                key={`vert-${idx}`}
                x1={vx}
                y1={40}
                x2={vx}
                y2={vx === 370 ? 190 : vx === 480 ? 235 : 310}
                stroke={C.muted}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.35"
              />
            ))}

            {/* MÅLEPIL FOR CELLENS OPPLØSNING (dx) */}
            <line x1="60" y1="380" x2="160" y2="380" stroke={C.warm} strokeWidth="1.8" />
            <polygon points="60,380 68,376 68,384" fill={C.warm} />
            <polygon points="160,380 152,376 152,384" fill={C.warm} />
            <L x="110" y="398" fill={C.warm} size={12} weight={700} anchor="middle">Horisontal oppløsning (Δx, Δy)</L>
            <L x="110" y="412" fill={C.muted} size={10} anchor="middle">2,5 km (MEPS) / 9 km (ECMWF)</L>
          </g>

          {/* HØYRE PANEL: FORSTØRRET ENKELTCELLE MED TILSTANDSVARIABLER */}
          <g transform="translate(630, 95)">
            <rect x="0" y="0" width="265" height="395" rx="10" fill="#0f1923" stroke={C.teal} strokeWidth="1.6" />
            <rect x="0" y="0" width="265" height="38" rx="10" fill="#132330" />
            <L x="15" y="24" fill={C.teal} size={13} weight={800}>Én numerisk modellcelle</L>
            <L x="250" y="24" fill={C.muted} size={11} anchor="end">Volum: Δx · Δy · Δz</L>

            {/* Isometrisk kube inni boksen */}
            <g transform="translate(45, 60)">
              {/* Toppflate */}
              <polygon points="40,15 130,15 170,45 80,45" fill="url(#nm-cell-glow)" stroke={C.teal} strokeWidth="1.5" />
              {/* Venstre front */}
              <polygon points="40,15 80,45 80,140 40,110" fill="#091824" stroke={C.teal} strokeWidth="1.5" opacity="0.9" />
              {/* Høyre front */}
              <polygon points="80,45 170,45 170,140 80,140" fill="#11293a" stroke={C.teal} strokeWidth="1.5" opacity="0.9" />

              {/* Vektorer inni kuben */}
              {/* u (vest-øst) */}
              <line x1="50" y1="85" x2="140" y2="85" stroke={C.warm} strokeWidth="2.5" />
              <polygon points="140,85 132,81 132,89" fill={C.warm} />
              <L x="148" y="89" fill={C.warm} size={12} weight={800}>u</L>

              {/* v (sør-nord) */}
              <line x1="75" y1="110" x2="125" y2="65" stroke={C.warm} strokeWidth="2.5" />
              <polygon points="125,65 116,68 122,76" fill={C.warm} />
              <L x="132" y="66" fill={C.warm} size={12} weight={800}>v</L>

              {/* w (vertikal oppdrift) */}
              <line x1="95" y1="120" x2="95" y2="40" stroke="#38bdf8" strokeWidth="2.5" className="model-wind-flow" />
              <polygon points="95,40 91,48 99,48" fill="#38bdf8" />
              <L x="104" y="38" fill="#38bdf8" size={12} weight={800}>w</L>

              {/* Sentral tilstandsprisme */}
              <circle cx="95" cy="85" r="4.5" fill="#f8fafc" />
            </g>

            {/* Liste over de 6 primære tilstandsvariablene */}
            <g transform="translate(18, 220)">
              <rect x="0" y="0" width="230" height="155" rx="6" fill="#09121a" stroke="#1e293b" />
              <L x="12" y="20" fill={C.fg} size={11} weight={700}>Variabler beregnet i hvert gridpunkt:</L>

              <L x="12" y="42" fill={C.warm} size={11} weight={700}>u, v</L>
              <L x="42" y="42" fill={C.muted} size={11}>: Horisontale vindkomponenter (m/s)</L>

              <L x="12" y="64" fill="#38bdf8" size={11} weight={700}>w</L>
              <L x="42" y="64" fill={C.muted} size={11}>: Vertikal vindhastighet / oppdrift</L>

              <L x="12" y="86" fill={C.low} size={11} weight={700}>T</L>
              <L x="42" y="86" fill={C.muted} size={11}>: Temperatur (K / °C)</L>

              <L x="12" y="108" fill={C.teal} size={11} weight={700}>p</L>
              <L x="42" y="108" fill={C.muted} size={11}>: Lufttrykk i hektopascal (hPa)</L>

              <L x="12" y="130" fill={C.rain} size={11} weight={700}>q</L>
              <L x="42" y="130" fill={C.muted} size={11}>: Spesifikk fuktighet (vanndamp, g/kg)</L>

              <L x="12" y="148" fill="#a78bfa" size={11} weight={700}>q_c, q_i</L>
              <L x="52" y="148" fill={C.muted} size={11}>: Skymikrofysikk (dråper, is)</L>
            </g>
          </g>

          {/* TEKSTFORKLARINGER NEDERST */}
          <g transform="translate(60, 480)">
            <circle cx="8" cy="8" r="4" fill={C.sand} />
            <L x="20" y="12" fill={C.sand} size={11} weight={600}>Terrengfølgende sigma-nivåer (σ):</L>
            <L x="195" y="12" fill={C.muted} size={11}>Følger Norges dype fjorder og høye fjell for å fange opp dalvinder, fønvind og orografisk heving.</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. PrimitiveEquationsDiagram
 * Viser de fundamentale fysiske bevaringslovene som modellene regner på,
 * hvordan tidsstegintegrasjonen foregår (t -> t + dt), samt CFL-stabilitetskriteriet.
 */
export function PrimitiveEquationsDiagram() {
  return (
    <Diagram
      title="De fysiske primitivligningene, tidsstegintegrasjon og CFL-kriteriet"
      heading="Primitivligningene: Fysikken bak hvert eneste tidssteg"
      caption="Numeriske værmodeller bygger ikke på statistisk synsing, men på eksakt klassisk fysikk. Seks koblede partielle differensialligninger (primitivligningene) beskriver atmosfærens utvikling: 1) Newtons 2. lov for væsker (Navier-Stokes) styrer akselerasjon fra trykkgradient, Coriolis, tyngdekraft og friksjon. 2) Kontinuitetsligningen sikrer massebevaring. 3) Termodynamikkens 1. lov håndterer adiabatisk oppvarming og latent varme. 4) Ideell gasslov kobler trykk, tetthet og temperatur. 5) Fuktighetsligninger sporer vanndamp og faseskifter. Superdatamaskinen regner ut tendensene ∂/∂t og oppdaterer tilstanden for neste tidssteg t + Δt. For numerisk stabilitet krever Courant-Friedrichs-Lewy (CFL)-kriteriet at tidssteget Δt er kortere enn tiden det tar for vinden å krysse én rutenettcelle (C = u·Δt / Δx ≤ 1)."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          {/* Bakgrunnsramme */}
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#0a131b" stroke="#1a2936" strokeWidth="1.2" />

          {/* TOPP: DE FEM GRUNNLIGNINGENE SOM MODULER */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>De 5 fysiske bevaringslovene (Primitivligningene)</L>
            <L x="850" y="16" fill={C.muted} size={11} anchor="end">Løses samtidig i alle gridceller</L>

            {/* Boks 1: Bevegelsesligningen (Navier-Stokes) */}
            <g transform="translate(0, 30)">
              <rect x="0" y="0" width="165" height="105" rx="8" fill="#11222f" stroke={C.warm} strokeWidth="1.4" />
              <L x="12" y="20" fill={C.warm} size={12} weight={700}>1. Bevegelse (Vind)</L>
              <L x="12" y="38" fill="#cbd5e1" size={11} weight={800}>du/dt = -α·∇p - 2Ω×V</L>
              <L x="12" y="58" fill={C.muted} size={10}>Newtons 2. lov:</L>
              <L x="12" y="72" fill={C.muted} size={10}>• Trykkgradientkraft</L>
              <L x="12" y="86" fill={C.muted} size={10}>• Corioliskraft & friksjon</L>
            </g>

            {/* Boks 2: Kontinuitetsligningen */}
            <g transform="translate(175, 30)">
              <rect x="0" y="0" width="165" height="105" rx="8" fill="#11222f" stroke={C.cold} strokeWidth="1.4" />
              <L x="12" y="20" fill={C.cold} size={12} weight={700}>2. Massebevaring</L>
              <L x="12" y="38" fill="#cbd5e1" size={11} weight={800}>∂ρ/∂t + ∇·(ρV) = 0</L>
              <L x="12" y="58" fill={C.muted} size={10}>Kontinuitet:</L>
              <L x="12" y="72" fill={C.muted} size={10}>• Luft forsvinner aldri</L>
              <L x="12" y="86" fill={C.muted} size={10}>• Konvergens gir heving</L>
            </g>

            {/* Boks 3: Termodynamikkens 1. lov */}
            <g transform="translate(350, 30)">
              <rect x="0" y="0" width="165" height="105" rx="8" fill="#11222f" stroke={C.low} strokeWidth="1.4" />
              <L x="12" y="20" fill={C.low} size={12} weight={700}>3. Energibevaring</L>
              <L x="12" y="38" fill="#cbd5e1" size={11} weight={800}>c_p dT = α dp + dQ</L>
              <L x="12" y="58" fill={C.muted} size={10}>Termodynamikk:</L>
              <L x="12" y="72" fill={C.muted} size={10}>• Adiabatisk heving</L>
              <L x="12" y="86" fill={C.muted} size={10}>• Latent varme & stråling</L>
            </g>

            {/* Boks 4: Gasslov & Hydrostati */}
            <g transform="translate(525, 30)">
              <rect x="0" y="0" width="160" height="105" rx="8" fill="#11222f" stroke={C.sand} strokeWidth="1.4" />
              <L x="12" y="20" fill={C.sand} size={12} weight={700}>4. Tilstand & Trykk</L>
              <L x="12" y="38" fill="#cbd5e1" size={11} weight={800}>p = ρRT · ∂p/∂z = -ρg</L>
              <L x="12" y="58" fill={C.muted} size={10}>Hydrostatisk balanse:</L>
              <L x="12" y="72" fill={C.muted} size={10}>• Ideell gasslov</L>
              <L x="12" y="86" fill={C.muted} size={10}>• Trykket avtar med høyde</L>
            </g>

            {/* Boks 5: Fuktighetsbevaring */}
            <g transform="translate(695, 30)">
              <rect x="0" y="0" width="155" height="105" rx="8" fill="#11222f" stroke={C.rain} strokeWidth="1.4" />
              <L x="12" y="20" fill={C.rain} size={12} weight={700}>5. Fuktighet</L>
              <L x="12" y="38" fill="#cbd5e1" size={11} weight={800}>dq_v/dt = E - C</L>
              <L x="12" y="58" fill={C.muted} size={10}>Vannets kretsløp:</L>
              <L x="12" y="72" fill={C.muted} size={10}>• Fordampning (E)</L>
              <L x="12" y="86" fill={C.muted} size={10}>• Kondensasjon til regn (C)</L>
            </g>
          </g>

          {/* MIDTRE SEKSJON: TIDSINTEGRASJON FRA t0 TIL t0 + dt */}
          <g transform="translate(45, 205)">
            <rect x="0" y="0" width="850" height="120" rx="8" fill="#0d1b26" stroke={C.teal} strokeWidth="1.2" />
            <L x="20" y="24" fill={C.teal} size={13} weight={800}>Tidsstegintegrasjon (Numerisk fremskrivning)</L>

            {/* Trinn 1: Tilstand ved tid t */}
            <g transform="translate(25, 40)">
              <rect x="0" y="0" width="180" height="60" rx="6" fill="#162b3a" stroke="#334155" />
              <L x="90" y="25" fill="#f8fafc" size={12} weight={700} anchor="middle">Tilstand ved tid t</L>
              <L x="90" y="45" fill={C.muted} size={11} anchor="middle">u(t), T(t), p(t), q(t)</L>
            </g>

            {/* Pil 1 */}
            <Arrow d="M 215 70 L 275 70" marker={m.teal} color={C.teal} width={2.5} />

            {/* Trinn 2: Beregn tendenser ∂/∂t */}
            <g transform="translate(285, 40)">
              <rect x="0" y="0" width="260" height="60" rx="6" fill="#162b3a" stroke={C.warm} strokeWidth="1.2" />
              <L x="130" y="25" fill={C.warm} size={12} weight={700} anchor="middle">Løs differensialligninger</L>
              <L x="130" y="45" fill="#f8fafc" size={11} anchor="middle">Tendens: ∂u/∂t, ∂T/∂t, ∂p/∂t</L>
            </g>

            {/* Pil 2 */}
            <Arrow d="M 555 70 L 615 70" marker={m.teal} color={C.teal} width={2.5} />

            {/* Trinn 3: Ny tilstand ved tid t + dt */}
            <g transform="translate(625, 40)">
              <rect x="0" y="0" width="200" height="60" rx="6" fill="#162b3a" stroke="#22c55e" strokeWidth="1.4" />
              <L x="100" y="25" fill="#22c55e" size={12} weight={800} anchor="middle">Ny tilstand ved t + Δt</L>
              <L x="100" y="45" fill="#f8fafc" size={11} anchor="middle">u(t+Δt) = u(t) + (∂u/∂t)·Δt</L>
            </g>
          </g>

          {/* NEDRE SEKSJON: CFL-KRITERIET OG REGNEKOSTNAD */}
          <g transform="translate(45, 345)">
            <rect x="0" y="0" width="850" height="130" rx="8" fill="#111c26" stroke="#253746" />

            {/* Venstre: CFL-stabilitet */}
            <g transform="translate(20, 18)">
              <L x="0" y="0" fill={C.warm} size={13} weight={800}>CFL-kriteriet (Courant-Friedrichs-Lewy):</L>
              <L x="0" y="22" fill="#cbd5e1" size={13} weight={700}>C = (u · Δt) / Δx ≤ 1</L>
              <L x="0" y="42" fill={C.muted} size={11}>Tidssteget Δt må være så kort at luften ikke rekker å blåse</L>
              <L x="0" y="58" fill={C.muted} size={11}>gjennom mer enn én gridcelle (Δx) på ett tidssteg.</L>
              <L x="0" y="74" fill={C.low} size={11} weight={600}>Dersom C &gt; 1, eksploderer feilene numerisk og modellen krasjer!</L>
            </g>

            {/* Midt: Skisse av partikkel i gridcelle */}
            <g transform="translate(430, 25)">
              <rect x="0" y="0" width="140" height="75" fill="#09131a" stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 3" />
              <L x="70" y="16" fill={C.teal} size={10} anchor="middle">Gridcelle (Δx)</L>
              {/* Partikkel stabil */}
              <circle cx="20" cy="45" r="4" fill="#22c55e" />
              <line x1="20" y1="45" x2="85" y2="45" stroke="#22c55e" strokeWidth="2" />
              <polygon points="85,45 77,41 77,49" fill="#22c55e" />
              <L x="70" y="60" fill="#22c55e" size={10} weight={700} anchor="middle">u · Δt &lt; Δx (Stabil)</L>
            </g>

            {/* Høyre: Hvorfor finere oppløsning er dyrt */}
            <g transform="translate(600, 18)">
              <L x="0" y="0" fill={C.cold} size={13} weight={800}>Skaleringsloven for superdatamaskiner:</L>
              <L x="0" y="22" fill="#f8fafc" size={11} weight={700}>Halvering av gridstørrelse (Δx/2) krever:</L>
              <L x="0" y="40" fill={C.muted} size={11}>• 2× celler i x-retning · 2× celler i y-retning</L>
              <L x="0" y="56" fill={C.muted} size={11}>• 2× celler i z-retning = 8× flere 3D-celler</L>
              <L x="0" y="72" fill={C.warm} size={11} weight={700}>• Pluss halvert tidssteg (Δt/2) pga. CFL</L>
              <L x="0" y="90" fill="#f59e0b" size={12} weight={800}>= 16× mer regnekraft per døgn!</L>
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. SubgridParametrizationDiagram
 * Tverrsnitt av én modellcelle. Viser kontrasten mellom cellens gjennomsnittsverdi
 * og de virkelige sub-grid-prosessene inni: tordensky, turbulens, sky-mikrofysikk,
 * stråling og overflatefriksjon.
 */
export function SubgridParametrizationDiagram() {
  return (
    <Diagram
      title="Parametrisering av sub-grid prosesser i numeriske modeller"
      heading="Parametrisering: Fysikken som gjemmer seg under rutenettet"
      caption="En numerisk værmodell kan kun beregne én gjennomsnittlig verdi for temperatur, fuktighet og vind per rutenettcelle (venstre panel). Prosesser som er mindre enn cellen — som tordenskyer (konveksjon), turbulente virvler i terrenget, dråpedannelse og strålingsrefleksjon — kalles sub-grid prosesser. Siden de ikke kan løses direkte, må de representeres gjennom parametrisering (høyre panel): statistiske og fysiske formler som beregner hvordan de småskalige prosessene samlet påvirker cellens gjennomsnittstilstand."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Cumulonimbus gradient */}
            <linearGradient id="param-cb-cloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.95" />
            </linearGradient>

            {/* Solstråling */}
            <linearGradient id="param-sun-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Bakgrunn */}
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#0c1620" stroke="#1d2e3d" strokeWidth="1.2" />

          {/* VENSTRE PANEL: VIRKELIGHETEN INNI ÉN MODELLCELLE */}
          <g transform="translate(45, 45)">
            <rect x="0" y="0" width="510" height="425" rx="8" fill="#081018" stroke={C.teal} strokeWidth="1.8" />

            {/* Tittel venstre panel */}
            <rect x="0" y="0" width="510" height="38" rx="8" fill="#102331" />
            <L x="18" y="24" fill={C.teal} size={13} weight={800}>Én modellcelle i tverrsnitt (f.eks. 9 × 9 km eller 2,5 × 2,5 km)</L>
            <L x="495" y="24" fill={C.muted} size={11} anchor="end">Under cellestørrelsen = sub-grid</L>

            {/* Himmelen inni cellen */}
            <rect x="15" y="50" width="480" height="355" rx="6" fill="#0e1e2c" />

            {/* Solinnstråling og refleksjon */}
            <polygon points="40,55 90,55 140,160 50,160" fill="url(#param-sun-beam)" />
            <L x="50" y="75" fill={C.warm} size={11} weight={700}>Kortbølget sol</L>
            {/* Albedo-refleksjon */}
            <line x1="100" y1="130" x2="60" y2="90" stroke={C.sand} strokeWidth="1.8" strokeDasharray="3 3" />
            <polygon points="60,90 68,93 64,99" fill={C.sand} />
            <L x="35" y="115" fill={C.sand} size={10} weight={700}>Albedo (Skyrefleksjon)</L>

            {/* Cumulonimbus bygesky (sub-grid skala) */}
            <path
              d="M 120 180 C 100 160 120 130 150 135 C 165 110 210 105 235 125 C 265 95 330 100 345 135 C 385 130 405 165 390 190 C 410 220 380 250 350 250 L 140 250 C 110 250 100 210 120 180 Z"
              fill="url(#param-cb-cloud)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Ambolt-topp */}
            <path d="M 220 115 L 420 115 C 390 135 360 145 330 145 Z" fill="#e2e8f0" opacity="0.9" />
            <L x="270" y="138" fill="#0f172a" size={11} weight={800}>Konvektiv bygesky (&lt; 4 km bred)</L>

            {/* Intens lokal nedbørstripe under skyen */}
            {[160, 185, 210, 235, 260, 285, 310].map((rx, idx) => (
              <line
                key={`rain-${idx}`}
                x1={rx}
                y1={250}
                x2={rx - 15}
                y2={330}
                stroke={C.rain}
                strokeWidth="1.8"
                strokeDasharray="4 4"
                className="model-wind-flow"
              />
            ))}
            <L x="220" y="295" fill={C.rain} size={11} weight={800}>Lokal styrtregnskur</L>
            <L x="220" y="310" fill={C.muted} size={10}>Treffer kun 20 % av cellens areal!</L>

            {/* Terrenget nederst inni cellen (Åskam og dal) */}
            <path
              d="M 15 350 Q 120 330 200 345 T 380 320 T 495 350 L 495 405 L 15 405 Z"
              fill="#162e20"
              stroke={C.sand}
              strokeWidth="1.5"
            />

            {/* Turbulente virvler nær bakken */}
            <path d="M 370 315 C 360 295 380 280 395 295 C 405 305 390 325 375 320" fill="none" stroke={C.warm} strokeWidth="1.8" />
            <L x="420" y="300" fill={C.warm} size={10} weight={700}>Bakketurbulens</L>
            <L x="420" y="312" fill={C.muted} size={9}>Friksjon mot skog & terreng</L>

            {/* Celledimensjonsmerking */}
            <line x1="15" y1="395" x2="495" y2="395" stroke={C.teal} strokeWidth="1.2" strokeDasharray="4 3" />
            <L x="255" y="390" fill={C.teal} size={11} weight={700} anchor="middle">Modellens oppløsning: Alt over er usynlig for primærligningene!</L>
          </g>

          {/* HØYRE PANEL: DE FIRE HOVEDPARAMETRISERINGENE */}
          <g transform="translate(575, 45)">
            <rect x="0" y="0" width="340" height="425" rx="8" fill="#081018" stroke={C.warm} strokeWidth="1.8" />

            {/* Tittel høyre panel */}
            <rect x="0" y="0" width="340" height="38" rx="8" fill="#24190c" />
            <L x="18" y="24" fill={C.warm} size={13} weight={800}>4 Nøkkelparametriseringer i modellen</L>

            {/* Skjema 1: Konveksjon */}
            <g transform="translate(15, 52)">
              <rect x="0" y="0" width="310" height="80" rx="6" fill="#13212d" stroke={C.warm} strokeWidth="1.2" />
              <L x="14" y="22" fill={C.warm} size={12} weight={700}>1. Konveksjonsskjema</L>
              <L x="14" y="40" fill="#f8fafc" size={11}>Beregner oppdrift og vertikal omrøring</L>
              <L x="14" y="56" fill={C.muted} size={10}>Frigjør latent varme ved kondensasjon (~2,5 MJ/kg)</L>
              <L x="14" y="70" fill={C.muted} size={10}>og omfordeler varme og fukt fra bakke til høyde.</L>
            </g>

            {/* Skjema 2: Stråling */}
            <g transform="translate(15, 142)">
              <rect x="0" y="0" width="310" height="80" rx="6" fill="#13212d" stroke={C.sand} strokeWidth="1.2" />
              <L x="14" y="22" fill={C.sand} size={12} weight={700}>2. Strålingsskjema</L>
              <L x="14" y="40" fill="#f8fafc" size={11}>Kortbølget solstråling & langbølget varmestråling</L>
              <L x="14" y="56" fill={C.muted} size={10}>Beregner absorbsjon i CO₂, vanndamp og ozon,</L>
              <L x="14" y="70" fill={C.muted} size={10}>samt skyenes albedo og drivhuseffekt.</L>
            </g>

            {/* Skjema 3: Sky-mikrofysikk */}
            <g transform="translate(15, 232)">
              <rect x="0" y="0" width="310" height="80" rx="6" fill="#13212d" stroke={C.rain} strokeWidth="1.2" />
              <L x="14" y="22" fill={C.rain} size={12} weight={700}>3. Sky-mikrofysikkskjema</L>
              <L x="14" y="40" fill="#f8fafc" size={11}>Fra vanndamp til regn, snø og hagl</L>
              <L x="14" y="56" fill={C.muted} size={10}>Dråpevekst ved koalesens og iskrystalldannelse</L>
              <L x="14" y="70" fill={C.muted} size={10}>(Bergeron-prosessen) i underkjølte skyer.</L>
            </g>

            {/* Skjema 4: Grenselag & turbulens */}
            <g transform="translate(15, 322)">
              <rect x="0" y="0" width="310" height="85" rx="6" fill="#13212d" stroke={C.cold} strokeWidth="1.2" />
              <L x="14" y="22" fill={C.cold} size={12} weight={700}>4. Planetært grenselag & overflate</L>
              <L x="14" y="40" fill="#f8fafc" size={11}>Friksjon, varme- og fuktighetsfluks mot bakken</L>
              <L x="14" y="56" fill={C.muted} size={10}>Beregner hvordan skog, snødekke, bølger og</L>
              <L x="14" y="72" fill={C.muted} size={10}>bygningsruhet bremser vinden og varmer lufta.</L>
            </g>
          </g>

          {/* KOBLINGSPIL I MIDTEN */}
          <Arrow d="M 558 245 L 572 245" marker={m.warm} color={C.warm} width={3.2} />
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. DataAssimilationCycleDiagram
 * Den 6-timers analysesyklusen (4D-Var) som kontinuerlig forankrer modellen i observasjoner.
 */
export function DataAssimilationCycleDiagram() {
  return (
    <Diagram
      title="Dataassimilering: Den 6-timers analysesyklusen i operative værvarslingssentre"
      heading="Slik forankres modellen i virkeligheten: 4D-Var analysesyklus"
      caption="Hvert sjette time (kl. 00, 06, 12 og 18 UTC) gjennomfører Meteorologisk institutt og ECMWF en ny dataassimilering. Superdatamaskinen henter inn millioner av ferske målinger fra satellitter, værballonger (radiosonder), rutefly og bakkestasjoner. Disse veies matematisk mot modellens forrige sekstimersprognose («bakgrunnstilstand» eller First Guess). Fordi målingene har støy og er ujevnt spredt i rommet, skaper 4D-Var en optimal og fysisk balansert «analyse» (starttilstand). Fra denne analysen starter et nytt 10- til 15-dagers værvarsel."
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          {/* Bakgrunnsflate */}
          <rect x="25" y="25" width="890" height="430" rx="10" fill="#09131c" stroke="#1c2d3c" strokeWidth="1.2" />

          {/* TITTEL OG TIDSVINDU */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>Det 6-timers assimileringsvinduet (f.eks. kl. 09 til kl. 15 UTC rundt analysesenter kl. 12)</L>
            <L x="850" y="16" fill={C.muted} size={11} anchor="end">4D-Var (Fire-dimensjonal variasjonell analyse)</L>
          </g>

          {/* OBSERVATIONSSTRØMMEN FRA OVEN */}
          <g transform="translate(45, 80)">
            <rect x="0" y="0" width="850" height="90" rx="8" fill="#10202c" stroke={C.warm} strokeWidth="1.2" />
            <L x="20" y="24" fill={C.warm} size={13} weight={800}>Kontinuerlig observasjonsflom inn i superdatamaskinen:</L>

            {/* Satellitter */}
            <g transform="translate(30, 36)">
              <rect x="0" y="0" width="180" height="42" rx="5" fill="#182d3d" />
              <L x="12" y="18" fill="#38bdf8" size={11} weight={700}>🛰️ Værsatellitter (90 %)</L>
              <L x="12" y="32" fill={C.muted} size={9}>Infrarøde & mikrobølgeradianse</L>
            </g>

            {/* Radiosonder */}
            <g transform="translate(230, 36)">
              <rect x="0" y="0" width="180" height="42" rx="5" fill="#182d3d" />
              <L x="12" y="18" fill="#e0b48a" size={11} weight={700}>🎈 Radiosonder (Ballonger)</L>
              <L x="12" y="32" fill={C.muted} size={9}>Vertikalprofiler T, p, fukt, vind</L>
            </g>

            {/* Flydata */}
            <g transform="translate(430, 36)">
              <rect x="0" y="0" width="180" height="42" rx="5" fill="#182d3d" />
              <L x="12" y="18" fill="#a78bfa" size={11} weight={700}>✈️ Rutefly (AMDAR)</L>
              <L x="12" y="32" fill={C.muted} size={9}>Vind & temp i 10–12 km høyde</L>
            </g>

            {/* Bakkestasjoner & radar */}
            <g transform="translate(630, 36)">
              <rect x="0" y="0" width="190" height="42" rx="5" fill="#182d3d" />
              <L x="12" y="18" fill="#4ade80" size={11} weight={700}>📡 Radar & Værstasjoner</L>
              <L x="12" y="32" fill={C.muted} size={9}>Bakketrykk, nedbør og bøyer</L>
            </g>
          </g>

          {/* OBSERVATIONSPILER NED MOT ASSIMILERING */}
          {[130, 320, 520, 720].map((px, idx) => (
            <Arrow key={`obs-arr-${idx}`} d={`M ${px} 172 L ${px} 210`} marker={m.warm} color={C.warm} width={2.4} />
          ))}

          {/* SENTRUM: MATEMATISK ASSIMILERINGSBOKS (4D-Var) */}
          <g transform="translate(45, 215)">
            <rect x="0" y="0" width="850" height="110" rx="8" fill="#112332" stroke={C.teal} strokeWidth="1.6" />

            {/* Venstre: Bakgrunnstilstand (First Guess) */}
            <g transform="translate(25, 20)">
              <rect x="0" y="0" width="230" height="70" rx="6" fill="#183144" stroke="#475569" />
              <L x="15" y="24" fill="#94a3b8" size={12} weight={700}>1. Bakgrunnstilstand</L>
              <L x="15" y="42" fill="#cbd5e1" size={11}>«First Guess» fra forrige</L>
              <L x="15" y="58" fill="#cbd5e1" size={11}>6-timers modellprognose (x_b)</L>
            </g>

            {/* Pluss-symbol */}
            <L x="278" y="62" fill={C.warm} size={22} weight={800} anchor="middle">+</L>

            {/* Midt: Vektet feilkovarians-analyse */}
            <g transform="translate(305, 20)">
              <rect x="0" y="0" width="250" height="70" rx="6" fill="#1c384e" stroke={C.teal} strokeWidth="1.4" />
              <L x="15" y="24" fill={C.teal} size={12} weight={800}>2. 4D-Var Minimering</L>
              <L x="15" y="42" fill="#f8fafc" size={11}>J(x) = (x-x_b)ᵀB⁻¹(x-x_b) +</L>
              <L x="15" y="58" fill="#f8fafc" size={11}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(y-H[x])ᵀR⁻¹(y-H[x])</L>
            </g>

            {/* Likhetstegn / Pil */}
            <Arrow d="M 570 55 L 610 55" marker={m.teal} color={C.teal} width={3} />

            {/* Høyre: Balansert Starttilstand (Analyse) */}
            <g transform="translate(625, 20)">
              <rect x="0" y="0" width="200" height="70" rx="6" fill="#163929" stroke="#22c55e" strokeWidth="1.6" />
              <L x="15" y="24" fill="#22c55e" size={12} weight={800}>3. Analyse (Starttilstand)</L>
              <L x="15" y="42" fill="#f8fafc" size={11}>Fysisk balansert tilstand</L>
              <L x="15" y="58" fill="#94a3b8" size={11}>Klar for ny integrasjon (x_a)</L>
            </g>
          </g>

          {/* NEDRE PIL OG RESULTAT: NYTT OPERATIVT VARSEL */}
          <Arrow d="M 725 328 L 725 365" marker={m.teal} color="#22c55e" width={3} />

          <g transform="translate(45, 370)">
            <rect x="0" y="0" width="850" height="65" rx="8" fill="#0d1b24" stroke="#22c55e" strokeWidth="1.2" />
            <L x="25" y="26" fill="#22c55e" size={13} weight={800}>Neste modellprognose skytes ut:</L>
            <L x="25" y="46" fill="#cbd5e1" size={11}>
              Superdatamaskinen regner nytt 66-timers MEPS-varsel for Norden og 15-dagers ECMWF-ensemble for kloden. Syklusen gjentas om 6 timer.
            </L>
            <L x="825" y="38" fill={C.sand} size={12} weight={700} anchor="end">Uten assimilering glemmer modellen virkeligheten på 3–4 døgn!</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. LorenzChaosEnsembleDiagram
 * Dobbelpanel:
 * Venstre: Lorenz-attraktoren (1963) og sommerfugleffekten.
 * Høyre: 50-medlemmers ensemble-spredningsplume fra dag 0 til dag 14.
 */
export function LorenzChaosEnsembleDiagram() {
  return (
    <Diagram
      title="Kaos, Lorenz-attraktoren og ensemblevarsling (EPS) fra dag 0 til 14"
      heading="Fra deterministisk kaos til probabilistisk ensemble"
      caption="Venstre panel: Lorenz-attraktoren (1963) viser atmosfærens ikke-lineære dynamikk («sommerfugleffekten»). To modellberegninger som starter nesten nøyaktig likt (avvik på 0,001) følger hverandre tett de første omløpene (cyan og oransje kurve), men skiller plutselig lag og havner på helt motsatte vinger av attraktoren. Høyre panel: Moderne værvarsling løser dette gjennom ensemblevarsling (EPS). De første 1–3 døgnene er spredningen minimal (høy varslingstillit). Rundt dag 5–8 begynner banene å sprike dramatisk. Utover dag 10 gir ikke et enkelt tall mening lenger; varselet må tolkes probabilistisk via spredningsvifter og boksplot."
      viewBox="0 0 940 500"
      wide
    >
      {() => (
        <>
          <rect x="25" y="25" width="890" height="450" rx="10" fill="#09121a" stroke="#1a2836" strokeWidth="1.2" />

          {/* VENSTRE PANEL: LORENZ-ATTRAKTOREN */}
          <g transform="translate(45, 45)">
            <rect x="0" y="0" width="370" height="410" rx="8" fill="#081018" stroke={C.warm} strokeWidth="1.4" />
            <rect x="0" y="0" width="370" height="36" rx="8" fill="#201509" />
            <L x="15" y="24" fill={C.warm} size={13} weight={800}>Lorenz-attraktoren (Sommerfugleffekten)</L>
            <L x="355" y="24" fill={C.muted} size={10} anchor="end">Lorenz (1963)</L>

            {/* Lorenz-vinger projeksjon */}
            <g transform="translate(185, 235)">
              {/* Venstre vinge sløyfer */}
              <path
                d="M 0 0 C -70 -60 -140 -20 -120 40 C -100 90 -30 60 0 0"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.6"
                opacity="0.85"
              />
              <path
                d="M 0 0 C -85 -85 -160 -30 -135 55 C -110 110 -40 80 0 0"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <path
                d="M 0 0 C -55 -40 -115 -10 -95 30 C -80 70 -20 40 0 0"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Høyre vinge sløyfer */}
              <path
                d="M 0 0 C 70 -60 140 -20 120 40 C 100 90 30 60 0 0"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.6"
                opacity="0.85"
              />
              <path
                d="M 0 0 C 85 -85 160 -30 135 55 C 110 110 40 80 0 0"
                fill="none"
                stroke="#d97706"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <path
                d="M 0 0 C 55 -40 115 -10 95 30 C 80 70 20 40 0 0"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Startpunkter som skiller lag */}
              <circle cx="-1" cy="0" r="4" fill="#38bdf8" />
              <circle cx="1" cy="0" r="4" fill="#f59e0b" />
            </g>

            {/* Forklarende tekst venstre panel */}
            <g transform="translate(20, 315)">
              <rect x="0" y="0" width="330" height="75" rx="6" fill="#111c26" stroke="#253545" />
              <L x="12" y="20" fill={C.fg} size={11} weight={700}>To simuleringer med 0,001 startavvik:</L>
              <L x="12" y="38" fill="#38bdf8" size={10} weight={600}>• Bane A (cyan): Følger venstre vinge (Høytrykk)</L>
              <L x="12" y="54" fill="#f59e0b" size={10} weight={600}>• Bane B (oransje): Kastes til høyre vinge (Dyp storm!)</L>
              <L x="12" y="68" fill={C.muted} size={9}>Ekstrem følsomhet for startbetingelser gjør determinisme umulig.</L>
            </g>
          </g>

          {/* HØYRE PANEL: ENSEMBLEPREDIKSJONSSYSTEM (EPS) */}
          <g transform="translate(435, 45)">
            <rect x="0" y="0" width="460" height="410" rx="8" fill="#081018" stroke={C.teal} strokeWidth="1.4" />
            <rect x="0" y="0" width="460" height="36" rx="8" fill="#0f232f" />
            <L x="15" y="24" fill={C.teal} size={13} weight={800}>Ensemblevarsel: 50 parallelle kjøringer (EPS)</L>
            <L x="445" y="24" fill={C.muted} size={10} anchor="end">ECMWF / MEPS</L>

            {/* Koordinatsystem for EPS */}
            <g transform="translate(35, 70)">
              {/* Akser */}
              <line x1="40" y1="210" x2="390" y2="210" stroke={C.muted} strokeWidth="1.2" />
              <line x1="40" y1="20" x2="40" y2="210" stroke={C.muted} strokeWidth="1.2" />
              <L x="40" y="12" fill={C.fg} size={11} weight={700}>Temperatur / Bakketrykk</L>

              {/* X-akse tidsmarkører */}
              {[
                { x: 40, label: "Dag 0" },
                { x: 110, label: "Dag 3" },
                { x: 190, label: "Dag 6" },
                { x: 270, label: "Dag 9" },
                { x: 360, label: "Dag 14" },
              ].map((tick, idx) => (
                <g key={`tick-${idx}`}>
                  <line x1={tick.x} y1="210" x2={tick.x} y2="215" stroke={C.muted} strokeWidth="1.2" />
                  <L x={tick.x} y={230} fill={C.muted} size={10} anchor="middle">{tick.label}</L>
                </g>
              ))}

              {/* Konfidens-skygger */}
              {/* Dag 0-3: Høy forutsigbarhet (smalt bånd) */}
              <path d="M 40 115 L 110 110 L 110 120 L 40 115 Z" fill="#22c55e" opacity="0.25" />
              {/* Dag 4-7: Moderat spredning */}
              <path d="M 110 110 L 190 85 L 190 145 L 110 120 Z" fill="#f59e0b" opacity="0.2" />
              {/* Dag 8-14: Kaotisk vifte */}
              <path d="M 190 85 L 360 40 L 360 190 L 190 145 Z" fill="#ef4444" opacity="0.15" />

              {/* Ensemble-spagettikurver */}
              {[
                "M 40 115 C 80 114 110 112 150 105 C 190 98 270 70 360 45",
                "M 40 115 C 80 115 110 111 150 100 C 190 85 270 55 360 65",
                "M 40 115 C 80 116 110 114 150 110 C 190 105 270 95 360 90",
                "M 40 115 C 80 115 110 116 150 122 C 190 130 270 145 360 160",
                "M 40 115 C 80 117 110 119 150 128 C 190 145 270 170 360 185",
                "M 40 115 C 80 114 110 113 150 115 C 190 120 270 130 360 135",
                "M 40 115 C 80 116 110 115 150 118 C 190 115 270 110 360 112",
              ].map((d, idx) => (
                <path key={`ens-curve-${idx}`} d={d} fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.75" />
              ))}

              {/* Deterministisk hovedkjøring (tykk hvit linje) */}
              <path
                d="M 40 115 C 80 115 110 113 150 115 C 190 118 270 125 360 120"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="2.4"
              />

              {/* Boksplot ved Dag 10 (x = 300) */}
              <g transform="translate(300, 30)">
                <line x1="0" y1="30" x2="0" y2="140" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="-10" y="60" width="20" height="50" fill="#f59e0b" opacity="0.4" stroke="#f59e0b" strokeWidth="1.2" />
                <line x1="-10" y1="85" x2="10" y2="85" stroke="#f8fafc" strokeWidth="2" />
                <L x="15" y="88" fill={C.fg} size={9} weight={700}>Median</L>
              </g>

              {/* Sonetekster over grafen */}
              <L x="75" y="90" fill="#22c55e" size={10} weight={700} anchor="middle">Høy tillit</L>
              <L x="150" y="70" fill="#f59e0b" size={10} weight={700} anchor="middle">Spredning starter</L>
              <L x="300" y="25" fill="#ef4444" size={10} weight={700} anchor="middle">Prediksjonsgrense</L>
            </g>

            {/* Forklaring nederst høyre panel */}
            <g transform="translate(20, 325)">
              <rect x="0" y="0" width="420" height="68" rx="6" fill="#101f2b" stroke="#1e3244" />
              <L x="12" y="18" fill={C.fg} size={11} weight={700}>Slik leser du Yr-varselet ved stor spredning:</L>
              <L x="12" y="34" fill={C.muted} size={10}>Når Yr hopper mellom sol og 20 mm på dag 8, er det ikke modellen</L>
              <L x="12" y="48" fill={C.muted} size={10}>som er ødelagt. Det er ensemblets spredning du ser!</L>
              <L x="12" y="62" fill={C.teal} size={10} weight={600}>Bruk sannsynlighetsvarsel («40 % sjanse for regn»), ikke enkelttall.</L>
            </g>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. ModelHierarchyNorwayDiagram
 * Det operative modellhierarkiet (Nesting) for Norge:
 * Fra global ECMWF IFS (9 km) til regional MEPS (2,5 km konveksjonsløsende over Norden)
 * og lokal Norkyst-800 i kyst- og fjordstrøk.
 */
export function ModelHierarchyNorwayDiagram() {
  return (
    <Diagram
      title="Det operative modellhierarkiet i Norge: Fra global ECMWF til MEPS og Norkyst"
      heading="Nesting: Fra storskala global atmosfære til lokale fjorder"
      caption="Ingen superdatamaskin i verden har nok regnekraft til å kjøre hele kloden med 800 meters oppløsning. Derfor bruker Meteorologisk institutt et hierarki av modeller med ulik oppløsning (nesting): 1) Den globale modellen ECMWF IFS dekker hele planeten med 9 km oppløsning og 51 ensemblemedlemmer. Den beregner de store stormbanene og jetstrømmene. 2) På randen mater ECMWF inn data til den regionale modellen MEPS (MetCoOp Ensemble Prediction System). MEPS dekker Norden med 2,5 km oppløsning og 30 medlemmer. Med 2,5 km løser modellen dype bygeskyer og norsk fjordtopografi direkte. 3) AROME-Arctic ivaretar havis og polare lavtrykk. 4) Havmodellen Norkyst-800 drives av MEPS-vinder og simulerer kyststrømmer, tidevann og stormflo med 800 meters oppløsning."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="25" width="890" height="470" rx="10" fill="#09141e" stroke="#1d2e3f" strokeWidth="1.2" />

          {/* TITTEL */}
          <g transform="translate(45, 45)">
            <L x="10" y="16" fill={C.teal} size={14} weight={800}>Modellhierarkiet hos Meteorologisk institutt og Yr</L>
            <L x="850" y="16" fill={C.muted} size={11} anchor="end">Nesting: Randbetingelser fra stor til liten skala</L>
          </g>

          {/* DE TRE MODELLTRINNENE I KASKADE */}
          <g transform="translate(45, 75)">
            {/* TRINN 1: GLOBAL MODELL (ECMWF IFS) */}
            <g transform="translate(0, 0)">
              <rect x="0" y="0" width="270" height="340" rx="8" fill="#101e2b" stroke={C.cold} strokeWidth="1.6" />
              <rect x="0" y="0" width="270" height="40" rx="8" fill="#14283b" />
              <L x="15" y="25" fill={C.cold} size={13} weight={800}>1. Global modell: ECMWF IFS</L>

              {/* Illustrasjon: Klode */}
              <g transform="translate(135, 105)">
                <circle cx="0" cy="0" r="45" fill="#0c1f2f" stroke={C.cold} strokeWidth="1.4" />
                {/* Rutenett på kloden */}
                <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <line x1="0" y1="-45" x2="0" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <path d="M -30 -10 Q 0 -35 30 -10 Q 15 25 -30 -10" fill="#1e3a2b" opacity="0.7" />
              </g>

              {/* Spesifikasjoner */}
              <g transform="translate(15, 175)">
                <rect x="0" y="0" width="240" height="150" rx="6" fill="#09141e" stroke="#1f2d3d" />
                <L x="12" y="20" fill={C.fg} size={11} weight={700}>Spesifikasjoner:</L>
                <L x="12" y="40" fill={C.cold} size={11} weight={600}>• Område:</L>
                <L x="75" y="40" fill="#cbd5e1" size={11}>Hele jordkloden (global)</L>
                <L x="12" y="60" fill={C.cold} size={11} weight={600}>• Oppløsning:</L>
                <L x="85" y="60" fill="#f8fafc" size={11} weight={700}>~9 km grid</L>
                <L x="12" y="80" fill={C.cold} size={11} weight={600}>• Ensemble:</L>
                <L x="80" y="80" fill="#cbd5e1" size={11}>51 medlemmer</L>
                <L x="12" y="100" fill={C.cold} size={11} weight={600}>• Tidshorisont:</L>
                <L x="95" y="100" fill="#cbd5e1" size={11}>15 døgn (varsel)</L>
                <L x="12" y="125" fill={C.muted} size={10}>Styrke: Fanger store lavtrykk og jetstrømmer.</L>
                <L x="12" y="138" fill={C.muted} size={10}>Svakhet: Ser ikke norske fjorder og bygeskyer.</L>
              </g>
            </g>

            {/* PIL FRA ECMWF TIL MEPS */}
            <g transform="translate(275, 130)">
              <Arrow d="M 0 35 L 20 35" marker={m.teal} color={C.teal} width={3.2} />
              <L x="10" y="20" fill={C.teal} size={10} weight={700} anchor="middle">Randdata</L>
            </g>

            {/* TRINN 2: REGIONAL VÆRMODELL (MEPS) */}
            <g transform="translate(300, 0)">
              <rect x="0" y="0" width="270" height="340" rx="8" fill="#101e2b" stroke={C.teal} strokeWidth="1.8" />
              <rect x="0" y="0" width="270" height="40" rx="8" fill="#132c3a" />
              <L x="15" y="25" fill={C.teal} size={13} weight={800}>2. Regional modell: MEPS</L>

              {/* Illustrasjon: Skandinavia-rutenett */}
              <g transform="translate(135, 105)">
                <rect x="-45" y="-40" width="90" height="80" rx="4" fill="#0c1f2f" stroke={C.teal} strokeWidth="1.4" />
                {/* Tettere rutenett */}
                {[-30, -15, 0, 15, 30].map((gx) => (
                  <line key={`meps-x-${gx}`} x1={gx} y1="-40" x2={gx} y2="40" stroke="#14b8a6" strokeWidth="0.8" opacity="0.6" />
                ))}
                {[-25, -10, 5, 20, 35].map((gy) => (
                  <line key={`meps-y-${gy}`} x1="-45" y1={gy} x2="45" y2={gy} stroke="#14b8a6" strokeWidth="0.8" opacity="0.6" />
                ))}
                <path d="M -15 30 Q 0 -10 20 -35" fill="none" stroke={C.sand} strokeWidth="1.8" />
              </g>

              {/* Spesifikasjoner */}
              <g transform="translate(15, 175)">
                <rect x="0" y="0" width="240" height="150" rx="6" fill="#09141e" stroke="#1f2d3d" />
                <L x="12" y="20" fill={C.fg} size={11} weight={700}>Spesifikasjoner:</L>
                <L x="12" y="40" fill={C.teal} size={11} weight={600}>• Område:</L>
                <L x="75" y="40" fill="#cbd5e1" size={11}>Norden & Østersjøen</L>
                <L x="12" y="60" fill={C.teal} size={11} weight={600}>• Oppløsning:</L>
                <L x="85" y="60" fill="#22c55e" size={11} weight={800}>2,5 km grid</L>
                <L x="12" y="80" fill={C.teal} size={11} weight={600}>• Ensemble:</L>
                <L x="80" y="80" fill="#cbd5e1" size={11}>30 medlemmer</L>
                <L x="12" y="100" fill={C.teal} size={11} weight={600}>• Tidshorisont:</L>
                <L x="95" y="100" fill="#cbd5e1" size={11}>66 timer (Yr time-for-time)</L>
                <L x="12" y="125" fill="#22c55e" size={10} weight={700}>Konveksjonsløsende!</L>
                <L x="12" y="138" fill={C.muted} size={10}>Løser dype bygeskyer og fjellbølger direkte.</L>
              </g>
            </g>

            {/* PIL FRA MEPS TIL NORKYST */}
            <g transform="translate(575, 130)">
              <Arrow d="M 0 35 L 20 35" marker={m.warm} color={C.warm} width={3.2} />
              <L x="10" y="20" fill={C.warm} size={10} weight={700} anchor="middle">Vindstress</L>
            </g>

            {/* TRINN 3: KYST- OG HAVMODELL (NORKYST-800) */}
            <g transform="translate(600, 0)">
              <rect x="0" y="0" width="250" height="340" rx="8" fill="#101e2b" stroke={C.warm} strokeWidth="1.6" />
              <rect x="0" y="0" width="250" height="40" rx="8" fill="#2c2214" />
              <L x="15" y="25" fill={C.warm} size={13} weight={800}>3. Havmodell: Norkyst-800</L>

              {/* Illustrasjon: Kyst og fjord */}
              <g transform="translate(125, 105)">
                <rect x="-45" y="-40" width="90" height="80" rx="4" fill="#082032" stroke={C.warm} strokeWidth="1.4" />
                <path d="M -45 20 Q -20 10 0 30 Q 20 0 45 10 L 45 40 L -45 40 Z" fill="#1b3827" />
                <path d="M -30 -10 C -10 10 10 -20 35 0" fill="none" stroke="#38bdf8" strokeWidth="2" className="model-wind-flow" />
                <L x="0" y="32" fill={C.sand} size={9} anchor="middle">Norskekysten & fjorder</L>
              </g>

              {/* Spesifikasjoner */}
              <g transform="translate(15, 175)">
                <rect x="0" y="0" width="220" height="150" rx="6" fill="#09141e" stroke="#1f2d3d" />
                <L x="12" y="20" fill={C.fg} size={11} weight={700}>Spesifikasjoner:</L>
                <L x="12" y="40" fill={C.warm} size={11} weight={600}>• Område:</L>
                <L x="75" y="40" fill="#cbd5e1" size={11}>Hele norskekysten</L>
                <L x="12" y="60" fill={C.warm} size={11} weight={600}>• Oppløsning:</L>
                <L x="85" y="60" fill="#f59e0b" size={11} weight={800}>800 m grid</L>
                <L x="12" y="80" fill={C.warm} size={11} weight={600}>• Fysikk:</L>
                <L x="65" y="80" fill="#cbd5e1" size={11}>ROMS havmodell</L>
                <L x="12" y="100" fill={C.warm} size={11} weight={600}>• Varsler:</L>
                <L x="65" y="100" fill="#cbd5e1" size={11}>Strøm, flo, bølger, temp</L>
                <L x="12" y="125" fill={C.muted} size={10}>Drives av MEPS-atmosfære og</L>
                <L x="12" y="138" fill={C.muted} size={10}>ferskvannsavrenning fra elver.</L>
              </g>
            </g>
          </g>

          {/* EKSTRA BOKS NEDERST FOR AROME-ARCTIC */}
          <g transform="translate(45, 425)">
            <rect x="0" y="0" width="850" height="55" rx="6" fill="#0d1b26" stroke="#25384a" />
            <L x="20" y="22" fill="#38bdf8" size={12} weight={800}>Arktisk spesialmodell: AROME-Arctic (2,5 km)</L>
            <L x="20" y="40" fill={C.muted} size={11}>
              Dekker Barentshavet, Svalbard og Nord-Atlanteren. Spesialtilpasset sjøisdekke, ekstrem kulde, polare lavtrykk og arktiske grenselag.
            </L>
            <L x="830" y="32" fill={C.teal} size={11} weight={600} anchor="end">Kilde: Meteorologisk institutt (MET, u.å.-a)</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * Bakoverkompatibel eksport:
 * Dersom noen eldre filer importerer ModelGridDiagram, peker den nå på ModelGrid3DDiagram.
 */
export const ModelGridDiagram = ModelGrid3DDiagram;

