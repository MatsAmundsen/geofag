import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. JetProfileDiagram
 * Realistisk globalt tverrsnitt fra ekvator (0°) til Nordpolen (90°N).
 * Viser jordens krumning, Hadley-, Ferrel- og Polarcellen med animert sirkulasjon,
 * det dramatiske tropopausetrinnet (16 km -> 11 km -> 8 km), den skråstilte polarfrontkilen,
 * og de to jetkjernene (Subtropisk jet ved 30° og Polarfrontjet ved 60°) med
 * lysende isotak-konturer og animert vind inn i planet (vestavind).
 */
export function JetProfileDiagram() {
  return (
    <Diagram
      title="Globalt tverrsnitt: To jetbelter, tre celler og tropopausesteget"
      heading="To jetbelter i høyden: Polarfrontjeten og Den subtropiske jeten"
      caption="Tverrsnitt gjennom den nordlige halvkules atmosfære fra ekvator til Nordpolen. Ved bakken drives tre sirkulasjonsceller: Hadleycellen, Ferrelcellen og Polarcellen. I overgangen mellom cellene oppstår to markante jetstrømmer ved tropopausen: 1) Den subtropiske jeten (STJ) ved ca. 30°N i 13–16 km høyde, drevet av vinkelmoment fra ekvator. 2) Polarfrontjeten (PFJ) ved 55°–65°N i 9–11 km høyde, drevet av den voldsomme temperaturkontrasten over den skråstilte polarfronten. Legg merke til det markerte trappetrinnet i tropopausen: Den tropiske tropopausen rager helt opp til 16 km, mens den polare tropopausen kun ligger 8–9 km over bakken. Begge jetstrømmene blåser inn i planet – mot øst (vestavind)."
      viewBox="0 0 940 520"
      wide
    >
      {(_m) => (
        <>
          <defs>
            {/* Himmel/stratosfære-gradient */}
            <linearGradient id="jet-prof-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#070c12" />
              <stop offset="25%" stopColor="#0c1722" />
              <stop offset="60%" stopColor="#132435" />
              <stop offset="100%" stopColor="#1e3448" />
            </linearGradient>

            {/* Varm tropisk luftsøyle */}
            <linearGradient id="jet-warm-col" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.08" />
            </linearGradient>

            {/* Kald polar luftsøyle */}
            <linearGradient id="jet-cold-col" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.28" />
            </linearGradient>

            {/* Isotak-glød for polarfrontjet */}
            <radialGradient id="pfj-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#0284c7" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#0369a1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0" />
            </radialGradient>

            {/* Isotak-glød for subtropisk jet */}
            <radialGradient id="stj-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>

            {/* Cumulonimbus-skygruppe */}
            <linearGradient id="cb-prof-cloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Bakgrunnsatmosfære */}
          <rect x="30" y="30" width="880" height="460" rx="8" fill="url(#jet-prof-sky)" />

          {/* Stratosfæren toppområde (inversjon / ozonvarme) */}
          <rect x="30" y="30" width="880" height="65" rx="8" fill="#080e14" opacity="0.8" />
          <L x="50" y="58" fill={C.cold} size={13} weight={800}>
            Stratosfæren (Stabil luft · Temperaturinversjon oppover)
          </L>
          <L x="50" y="76" fill={C.muted} size={11}>
            Vinden avtar over tropopausen fordi horisontal temperaturgradient snur
          </L>

          {/* Termiske søyler bakgrunn */}
          <rect x="100" y="95" width="250" height="345" fill="url(#jet-warm-col)" rx="4" />
          <rect x="620" y="240" width="260" height="200" fill="url(#jet-cold-col)" rx="4" />

          {/* HØYDESKALA PÅ VENSTRE SIDE */}
          <line x1="85" y1="95" x2="105" y2="95" stroke={C.muted} strokeWidth="1.5" />
          <L x="78" y="99" fill={C.muted} size={11} anchor="end" weight={700}>
            16 km
          </L>
          <line x1="85" y1="180" x2="105" y2="180" stroke={C.muted} strokeWidth="1.5" />
          <L x="78" y="184" fill={C.muted} size={11} anchor="end" weight={700}>
            12 km
          </L>
          <line x1="85" y1="260" x2="105" y2="260" stroke={C.muted} strokeWidth="1.5" />
          <L x="78" y="264" fill={C.muted} size={11} anchor="end" weight={700}>
            8 km
          </L>
          <line x1="85" y1="350" x2="105" y2="350" stroke={C.muted} strokeWidth="1.5" />
          <L x="78" y="354" fill={C.muted} size={11} anchor="end" weight={700}>
            4 km
          </L>
          <line x1="85" y1="440" x2="105" y2="440" stroke={C.muted} strokeWidth="2" />
          <L x="78" y="444" fill={C.fg} size={12} anchor="end" weight={800}>
            0 km
          </L>
          <g transform="rotate(-90 42 270)">
            <L x="42" y="270" fill={C.muted} size={11} weight={700} anchor="middle">
              Høyde over havet
            </L>
          </g>

          {/* JORDENS OVERFLATE (KRUMMET BUNN FRA 0° TIL 90°N) */}
          <path
            d="M 90 440 C 300 440, 600 440, 890 440"
            fill="none"
            stroke="#334e68"
            strokeWidth="3.5"
          />
          <rect x="90" y="440" width="800" height="42" fill="#0f1922" />

          {/* BREDDEGRADSMERKER VED BAKKEN */}
          {[
            { x: 120, lat: "0° (Ekvator)", zone: "ITCZ · Lavtrykk", col: C.low },
            { x: 370, lat: "30°N", zone: "Subtropisk høytrykk", col: C.warm },
            { x: 620, lat: "60°N", zone: "Polarfronten · Lavtrykk", col: C.low },
            { x: 860, lat: "90°N", zone: "Polarhøytrykk", col: C.cold },
          ].map((b) => (
            <g key={b.lat}>
              <line x1={b.x} y1="435" x2={b.x} y2="445" stroke={b.col} strokeWidth="2" />
              <L x={b.x} y="458" fill={C.fg} size={12} weight={800} anchor="middle">
                {b.lat}
              </L>
              <L x={b.x} y="473" fill={b.col} size={10.5} weight={700} anchor="middle">
                {b.zone}
              </L>
            </g>
          ))}

          {/* POLARFRONTKILEN: Kald arktisk luftmasse kiler seg inn under mild subtropisk luft */}
          <path
            d="M 520 440 Q 600 370 650 250 L 890 250 L 890 440 Z"
            fill="#0284c7"
            opacity="0.22"
          />
          <path
            d="M 520 440 Q 600 370 650 250"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.8"
            strokeDasharray="6 3"
          />
          <L x="700" y="380" fill="#7dd3fc" size={12} weight={800}>
            Kald, tett polarluft (kileform)
          </L>
          <L x="490" y="360" fill="#fed7aa" size={12} weight={800} anchor="end">
            Mild, lett subtropisk luft
          </L>
          <L x="560" y="395" fill="#fca5a5" size={11} weight={800} anchor="middle">
            Polarfronten
          </L>

          {/* ITCZ KONVEKSJONSSKYER (0°) */}
          <g transform="translate(105, 120)">
            <path
              d="M 10 320 L 10 180 Q 0 160 15 140 Q 5 110 30 90 Q 20 60 50 40 L 70 40 Q 90 20 120 20 L 140 20 Q 150 40 130 60 Q 140 90 120 120 Q 140 150 120 180 L 120 320 Z"
              fill="url(#cb-prof-cloud)"
              opacity="0.85"
            />
            {/* Ambolt ved tropopausen */}
            <path
              d="M 0 35 Q 60 20 160 20 Q 140 45 110 50 L 20 50 Z"
              fill="#f8fafc"
              opacity="0.9"
            />
            <L x="65" y="15" fill={C.warm} size={10.5} weight={700} anchor="middle">
              ITCZ ambolt (16 km)
            </L>
          </g>

          {/* TROPOPAUSEN: TRAPPETRINN (16 km -> 11 km -> 8 km) */}
          {/* Tropisk del (0° til 28°N): ca 16 km = y: 95 */}
          <path d="M 100 95 L 340 95" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <L x="220" y="85" fill="#fbbf24" size={12} weight={800} anchor="middle">
            Tropisk tropopause (~16 km · -75 °C)
          </L>

          {/* Trinn 1: Subtropisk brudd ved 30°N (y: 95 til y: 180) */}
          <path d="M 340 95 Q 360 120 380 180" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="4 3" />

          {/* Mellombreddegrads-tropopause (30° til 58°N): ca 11 km = y: 195 */}
          <path d="M 380 195 L 590 210" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <L x="490" y="185" fill="#7dd3fc" size={12} weight={800} anchor="middle">
            Mellombreddegrad-tropopause (~11 km)
          </L>

          {/* Trinn 2: Polarfrontbrudd ved 60°N (y: 210 til y: 260) */}
          <path d="M 590 210 Q 610 235 635 260" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="4 3" />

          {/* Polar tropopause (60° til 90°N): ca 8–9 km = y: 260 */}
          <path d="M 635 260 L 890 260" fill="none" stroke="#93c5fd" strokeWidth="3" />
          <L x="760" y="250" fill="#93c5fd" size={12} weight={800} anchor="middle">
            Polar tropopause (~8–9 km · -50 °C)
          </L>

          {/* CELLER: SIRKULASJONSPILER I TROPOSFÆREN */}
          {/* 1. HADLEYCELLEN (0°–30°N) */}
          <g>
            <path d="M 150 420 L 150 140" fill="none" stroke="#f59e0b" strokeWidth="2" className="model-wind-flow" />
            <path d="M 160 115 L 340 115" fill="none" stroke="#f59e0b" strokeWidth="2.4" className="model-wind-flow" />
            <path d="M 360 140 L 360 410" fill="none" stroke="#f59e0b" strokeWidth="2" className="model-wind-flow" />
            <path d="M 340 430 L 160 430" fill="none" stroke="#f59e0b" strokeWidth="2" className="model-wind-flow" />
            <L x="250" y="290" fill="#fbbf24" size={13} weight={800} anchor="middle">
              HADLEYCELLE
            </L>
            <L x="250" y="306" fill={C.muted} size={10.5} anchor="middle">
              Termisk direkte
            </L>
          </g>

          {/* 2. FERRELCALLEN (30°–60°N) */}
          <g>
            <path d="M 390 425 L 570 425" fill="none" stroke="#38bdf8" strokeWidth="2" className="model-wind-flow" />
            <path d="M 590 410 L 590 230" fill="none" stroke="#38bdf8" strokeWidth="2" className="model-wind-flow" />
            <path d="M 570 215 L 390 215" fill="none" stroke="#38bdf8" strokeWidth="2" className="model-wind-flow" />
            <path d="M 380 230 L 380 410" fill="none" stroke="#38bdf8" strokeWidth="2" className="model-wind-flow" />
            <L x="485" y="310" fill="#7dd3fc" size={13} weight={800} anchor="middle">
              FERRELCELLE
            </L>
            <L x="485" y="326" fill={C.muted} size={10.5} anchor="middle">
              Indirekte tannhjul
            </L>
          </g>

          {/* 3. POLARCELLEN (60°–90°N) */}
          <g>
            <path d="M 640 270 L 640 415" fill="none" stroke="#93c5fd" strokeWidth="1.8" className="model-wind-flow" />
            <path d="M 850 430 L 650 430" fill="none" stroke="#93c5fd" strokeWidth="1.8" className="model-wind-flow" />
            <path d="M 860 415 L 860 275" fill="none" stroke="#93c5fd" strokeWidth="1.8" className="model-wind-flow" />
            <path d="M 850 270 L 650 270" fill="none" stroke="#93c5fd" strokeWidth="1.8" className="model-wind-flow" />
            <L x="750" y="320" fill="#bae6fd" size={13} weight={800} anchor="middle">
              POLARCELLE
            </L>
            <L x="750" y="336" fill={C.muted} size={10.5} anchor="middle">
              Termisk direkte
            </L>
          </g>

          {/* DE TO JETKJERNENE (SETT FORFRA: VIND STRØMMER INN I ARKET = KRYSS I SIRKEL) */}

          {/* JET 1: DEN SUBTROPISKE JETEN (STJ) */}
          <g transform="translate(365, 145)">
            <circle cx="0" cy="0" r="42" fill="url(#stj-glow)" />
            <ellipse cx="0" cy="0" rx="34" ry="24" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="20" ry="14" fill="#0f1722" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Kryss (vind inn i planet) */}
            <line x1="-8" y1="-8" x2="8" y2="8" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="-8" x2="-8" y2="8" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />

            <rect x="-95" y="-55" width="190" height="24" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1.3" />
            <L x="0" y="-39" fill="#fde68a" size={11.5} weight={800} anchor="middle">
              SUBTROPISK JET (STJ)
            </L>
            <L x="0" y="35" fill="#fbbf24" size={10.5} weight={700} anchor="middle">
              13–16 km · ~200 km/t
            </L>
            <L x="0" y="48" fill={C.muted} size={9.5} anchor="middle">
              Drevet av vinkelmoment
            </L>
          </g>

          {/* JET 2: POLARFRONTJETEN (PFJ) */}
          <g transform="translate(615, 230)">
            <circle cx="0" cy="0" r="48" fill="url(#pfj-glow)" />
            <ellipse cx="0" cy="0" rx="38" ry="26" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="22" ry="15" fill="#0c1e2e" stroke="#38bdf8" strokeWidth="2.6" />
            {/* Kryss (vind inn i planet) */}
            <line x1="-9" y1="-9" x2="9" y2="9" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="9" y1="-9" x2="-9" y2="9" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />

            <rect x="-105" y="-58" width="210" height="24" rx="4" fill="#0c1a24" stroke="#38bdf8" strokeWidth="1.5" />
            <L x="0" y="-42" fill="#bae6fd" size={12} weight={900} anchor="middle">
              POLARFRONTJETEN (PFJ)
            </L>
            <L x="0" y="38" fill="#38bdf8" size={11} weight={800} anchor="middle">
              9–11 km · 200–400 km/t
            </L>
            <L x="0" y="52" fill="#cbd5e1" size={10} weight={600} anchor="middle">
              Styrer lavtrykkene mot Norge!
            </L>
          </g>

          {/* SYMBOL-FORKLARING: KRYSS I SIRKEL */}
          <g transform="translate(690, 85)">
            <rect x="0" y="0" width="205" height="48" rx="6" fill="#111d27" stroke="#22394d" strokeWidth="1.3" />
            <circle cx="24" cy="24" r="13" fill="#0f1722" stroke={C.fg} strokeWidth="2" />
            <line x1="18" y1="18" x2="30" y2="30" stroke={C.fg} strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="18" x2="18" y2="30" stroke={C.fg} strokeWidth="2" strokeLinecap="round" />
            <L x="46" y="20" fill={C.fg} size={11} weight={700}>
              Kryss i sirkel (⊗):
            </L>
            <L x="46" y="35" fill={C.teal} size={10.5} weight={700}>
              Vind blåser inn i arket (vest $\rightarrow$ øst)
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. ThermalWindDiagram
 * Realistisk 3D-perspektiv og termodynamisk sammenheng:
 * Varm luftsøyle vs. kald luftsøyle (hypsometrisk søyletykkelse),
 * hellende isobarflater som blir brattere med høyden,
 * akselererende trykkgradientkraft polover, og Coriolisbalanse
 * som gir maksimal vestavind i jetkjernen ved tropopausen.
 */
export function ThermalWindDiagram() {
  return (
    <Diagram
      title="Fysikken bak jetstrømmen: Termisk vind og trykkflaters helling"
      heading="Termisk vind: Hvorfor temperaturforskjell ved bakken gir jetstrøm i høyden"
      caption="Sammenhengen mellom horisontal temperaturgradient og vindøkning med høyden kalles termisk vind. Til venstre ser vi to luftsøyler: Den varme subtropiske søylen utvider seg og er tykk, mens den kalde polare søylen er komprimert og lav. Selv om trykket ved bakken er identisk (1013 hPa), faller trykket mye saktere med høyden i den varme søylen enn i den kalde. Derfor begynner isobarflatene (f.eks. 850 hPa, 500 hPa, 250 hPa) å helle brattere og brattere nedover mot polen jo høyere vi stiger. Dette setter opp en stadig kraftigere trykkgradientkraft (oransje piler) rettet mot polen. I fri atmosfære avbøyer Corioliskraften luften 90° til høyre til geostrofisk balanse: En voldsom vestavind som kulminerer nøyaktig ved tropopausen (jetkjernen)."
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="tw-warm-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="tw-cold-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="tw-jet-spot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Venstre panel: 3D Isobarflater som heller */}
          <g transform="translate(30, 20)">
            <rect x="0" y="10" width="530" height="430" rx="8" fill="#0d151c" stroke="#1d2d3d" strokeWidth="1.5" />
            <L x="20" y="38" fill={C.warm} size={15} weight={800}>
              A. Helling på trykkflater bygger seg opp med høyden
            </L>

            {/* Bakgrunnsfarger for søylene */}
            <rect x="30" y="60" width="130" height="340" fill="url(#tw-warm-grad)" rx="4" />
            <rect x="370" y="60" width="130" height="340" fill="url(#tw-cold-grad)" rx="4" />

            <L x="95" y="80" fill="#fbbf24" size={12} weight={800} anchor="middle">
              Varm luftsøyle
            </L>
            <L x="95" y="96" fill={C.muted} size={10.5} anchor="middle">
              (Subtropene · Lav tetthet)
            </L>

            <L x="435" y="80" fill="#7dd3fc" size={12} weight={800} anchor="middle">
              Kald luftsøyle
            </L>
            <L x="435" y="96" fill={C.muted} size={10.5} anchor="middle">
              (Polen · Høy tetthet)
            </L>

            {/* Isobarflater fra bakken og oppover */}
            {/* 1013 hPa: Horisontal ved bakken */}
            <line x1="30" y1="390" x2="500" y2="390" stroke="#94a3b8" strokeWidth="2.2" />
            <L x="508" y="394" fill="#94a3b8" size={11} weight={700}>
              1013 hPa (Havnivå · Ingen helling)
            </L>

            {/* 850 hPa: Svak helling (1500m vs 1350m) */}
            <line x1="30" y1="330" x2="500" y2="345" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 3" />
            <L x="508" y="348" fill={C.muted} size={11}>
              850 hPa (~1,5 km)
            </L>
            <Arrow d="M 230 338 L 300 340" marker={m.warm} color={C.warm} width={1.8} />

            {/* 500 hPa: Moderat helling (5700m vs 5200m) */}
            <line x1="30" y1="240" x2="500" y2="280" stroke="#e2e8f0" strokeWidth="2.2" />
            <L x="508" y="284" fill={C.sand} size={11} weight={700}>
              500 hPa (~5,5 km)
            </L>
            <Arrow d="M 210 257 L 320 266" marker={m.warm} color={C.warm} width={2.4} />

            {/* 250 hPa: Maksimal bratt helling ved tropopausen! (10800m vs 9600m) */}
            <line x1="30" y1="120" x2="500" y2="200" stroke="#38bdf8" strokeWidth="3" />
            <L x="508" y="204" fill="#38bdf8" size={12} weight={800}>
              250 hPa (Tropopausen · Brattest!)
            </L>
            <Arrow d="M 180 150 L 360 178" marker={m.warm} color={C.warm} width={3.4} />
            <L x="270" y="148" fill={C.warm} size={11} weight={800} anchor="middle">
              Maksimal trykkgradientkraft (F_pg)
            </L>

            {/* Tropopause-tak */}
            <line x1="30" y1="105" x2="500" y2="105" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.7" />
            <L x="270" y="100" fill="#fca5a5" size={10.5} anchor="middle">
              Tropopausen: Gradienten snur i stratosfæren
            </L>

            {/* Forklaringsmerknad nederst */}
            <rect x="25" y="405" width="480" height="24" rx="4" fill="#141f2a" />
            <L x="265" y="421" fill={C.fg} size={10.5} anchor="middle">
              Varm søyle er tykkere $⟹$ trykkflatene ligger høyere $⟹$ bratt helning mot polen!
            </L>
          </g>

          {/* Høyre panel: Vertikal vindprofil u(z) */}
          <g transform="translate(580, 20)">
            <rect x="0" y="10" width="330" height="430" rx="8" fill="#0d151c" stroke="#1d2d3d" strokeWidth="1.5" />
            <L x="16" y="38" fill={C.teal} size={15} weight={800}>
              B. Vindhastighet med høyden u(z)
            </L>

            {/* Koordinatakser */}
            <line x1="45" y1="390" x2="300" y2="390" stroke="#475569" strokeWidth="1.8" />
            <line x1="45" y1="390" x2="45" y2="70" stroke="#475569" strokeWidth="1.8" />

            <L x="300" y="408" fill={C.muted} size={11} anchor="end">
              Vindfart (km/t) $\rightarrow$
            </L>
            <L x="40" y="65" fill={C.muted} size={11} anchor="end">
              Høyde (km) $\uparrow$
            </L>

            {/* Høydenivåer */}
            {[
              { y: 390, label: "0" },
              { y: 330, label: "3" },
              { y: 260, label: "6" },
              { y: 190, label: "9" },
              { y: 130, label: "12" },
              { y: 80, label: "15" },
            ].map((p) => (
              <g key={p.label}>
                <line x1="40" y1={p.y} x2="45" y2={p.y} stroke="#64748b" strokeWidth="1.5" />
                <L x="36" y={p.y + 4} fill={C.muted} size={10} anchor="end">
                  {p.label}
                </L>
                <line x1="45" y1={p.y} x2="295" y2={p.y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              </g>
            ))}

            {/* Tropopauselinje */}
            <line x1="45" y1="150" x2="295" y2="150" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" />
            <L x="290" y="142" fill="#38bdf8" size={10.5} anchor="end" weight={700}>
              Tropopause (~10–11 km)
            </L>

            {/* Kurve for vindhastighet */}
            {/* Starter på 20 km/t ved bakken (x=60), vokser til 280 km/t ved tropopausen (x=270), og faller i stratosfæren */}
            <path
              d="M 60 390 Q 75 320 120 250 Q 180 180 270 150 Q 230 110 160 80"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.6"
            />
            {/* Animert flyt langs kurven */}
            <path
              d="M 60 390 Q 75 320 120 250 Q 180 180 270 150"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              className="model-wind-fast"
            />

            {/* Jetkjernepunkt */}
            <circle cx="270" cy="150" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2.2" />
            <L x="260" y="172" fill="#38bdf8" size={12} weight={800} anchor="end">
              Jetkjerne (250–350 km/t)
            </L>

            <L x="165" y="74" fill={C.muted} size={10.5} weight={600}>
              Avtar i stratosfæren
            </L>

            {/* Pedagogisk boks */}
            <rect x="15" y="270" width="165" height="75" rx="6" fill="#14212d" stroke="#1d3d52" strokeWidth="1.2" />
            <L x="24" y="288" fill={C.warm} size={11} weight={800}>
              Lærebokregelen:
            </L>
            <L x="24" y="304" fill={C.fg} size={10}>
              Vinden øker med høyden
            </L>
            <L x="24" y="318" fill={C.fg} size={10}>
              så lenge det er kaldere
            </L>
            <L x="24" y="332" fill={C.sand} size={10} weight={700}>
              mot polen (termisk vind)!
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. JetFormsDiagram
 * Realistisk synoptisk kart over Nord-Atlanteren og Europa:
 * Panel A: Zonal jetstrøm (rett vestavindsbelte, hurtige lavtrykk mot Norskehavet).
 * Panel B: Meridional jetstrøm (meandrerende Rossby-bølger, dype tråg med arktisk kulde
 * over Skandinavia og varme rygger som gir hetebølger).
 */
export function JetFormsDiagram() {
  return (
    <Diagram
      title="Zonal vs. meridional jetstrøm: Rossby-bølger og norsk vær"
      heading="Zonal vs. meridional strøm: Hvorfor jetens form avgjør ukens vær"
      caption="Formen på jetstrømmen avgjør om Norge får uker med mildt vestlandsregn eller langvarige ekstremperioder. Kart A (venstre) viser en zonal strøm: Jetstrømmen blåser i en stram, rettlinjet korridor fra vest mot øst. De atlantiske lavtrykkene raser hurtig forbi, og været skifter raskt med mild, fuktig luft. Kart B (høyre) viser en meridional strøm med store Rossby-bølger. I en bølgedal (tråg) stuper iskald arktisk luft sørover over Norge og gir sprengkulde. I en bølgetopp (rygg) pumpes varm luft nordover, luften synker og danner stabilt klarvær eller hetebølger. Rossby-bølgene beveger seg svært langsomt, og været kan 'låse seg' i ukevis."
      viewBox="0 0 940 460"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="jf-ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1722" />
              <stop offset="100%" stopColor="#081018" />
            </linearGradient>

            {/* Landmasse-fyll */}
            <linearGradient id="jf-land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#253540" />
              <stop offset="100%" stopColor="#18232c" />
            </linearGradient>

            {/* Kaldluftstunge gradient */}
            <radialGradient id="jf-cold-tongue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>

            {/* Varmluftsrygg gradient */}
            <radialGradient id="jf-warm-ridge" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* MIDTSKILLE */}
          <line x1="470" y1="35" x2="470" y2="440" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="6 4" />

          {/* KART A: ZONAL JETSTRØM (VENSTRE) */}
          <g transform="translate(0, 0)">
            <rect x="35" y="30" width="415" height="410" rx="8" fill="url(#jf-ocean)" stroke="#1d2d3d" strokeWidth="1.5" />

            <L x="242" y="58" size={15} weight={800} anchor="middle" fill="#38bdf8">
              KART A: Zonal jetstrøm (Vest $\rightarrow$ Øst)
            </L>
            <L x="242" y="76" size={11.5} fill={C.muted} anchor="middle">
              Rask vestavind · Raske værskifter · Mild atlantisk luft
            </L>

            {/* Norgeskyst og Storbritannia stilisert silhuett */}
            {/* Grønland i NV */}
            <path d="M 50 80 Q 90 90 80 140 L 50 130 Z" fill="url(#jf-land)" stroke="#334e68" strokeWidth="1" />
            <L x="65" y="110" fill={C.muted} size={9} anchor="middle">Grønland</L>

            {/* Storbritannia */}
            <path d="M 270 240 Q 290 230 285 270 Q 260 280 270 240 Z" fill="url(#jf-land)" stroke="#334e68" strokeWidth="1" />
            <L x="280" y="258" fill={C.muted} size={9} anchor="middle">UK</L>

            {/* Norge og Skandinavia */}
            <path
              d="M 330 110 Q 370 140 350 200 Q 320 230 335 250 L 370 240 L 390 140 Z"
              fill="url(#jf-land)"
              stroke="#38bdf8"
              strokeWidth="1.4"
            />
            <L x="365" y="180" fill="#f8fafc" size={12} weight={800} anchor="middle">Norge</L>

            {/* Europa kontinent */}
            <path d="M 270 290 L 420 290 L 420 370 L 290 370 Z" fill="url(#jf-land)" stroke="#334e68" strokeWidth="1" />

            {/* Zonal jetbånd (rett vest-øst korridor) */}
            <path
              d="M 40 210 L 430 210"
              fill="none"
              stroke="#0284c7"
              strokeWidth="24"
              opacity="0.3"
            />
            <path
              d="M 40 210 L 430 210"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
            />
            {/* Animert strømning */}
            <path
              d="M 40 210 L 430 210"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              className="model-wind-fast"
            />
            <Arrow d="M 410 210 L 435 210" marker={m.teal} color="#38bdf8" width={3.6} />

            {/* Vandrende lavtrykk langs jeten */}
            {[
              { x: 120, y: 195, name: "L1" },
              { x: 230, y: 195, name: "L2" },
            ].map((low) => (
              <g key={low.name}>
                <circle cx={low.x} cy={low.y} r="18" fill="#3b151b" stroke={C.low} strokeWidth="2" />
                <L x={low.x} y={low.y + 5} fill={C.low} size={13} weight={800} anchor="middle">
                  L
                </L>
                {/* Spiralpiler */}
                <path
                  d={`M ${low.x - 22} ${low.y} A 22 22 0 0 1 ${low.x + 2} ${low.y - 20}`}
                  fill="none"
                  stroke={C.low}
                  strokeWidth="1.5"
                  markerEnd={`url(#${m.low})`}
                />
              </g>
            ))}

            {/* Forklaringskort nederst */}
            <rect x="50" y="325" width="385" height="95" rx="6" fill="#111d27" stroke="#22394d" strokeWidth="1.3" />
            <L x="65" y="348" fill="#38bdf8" size={12} weight={800}>
              🌧️ Typisk norsk vestavær:
            </L>
            <L x="65" y="368" fill={C.fg} size={11}>
              • Lavtrykkene fødes på rekke og rad og dundrer inn mot Vestlandet.
            </L>
            <L x="65" y="386" fill={C.fg} size={11}>
              • Mye nedbør på Vestlandet (orografisk heving mot Langfjella).
            </L>
            <L x="65" y="404" fill={C.sand} size={11} weight={700}>
              • Raske værskifter – solen titter frem mellom bygene!
            </L>
          </g>

          {/* KART B: MERIDIONAL JETSTRØM (HØYRE) */}
          <g transform="translate(470, 0)">
            <rect x="20" y="30" width="415" height="410" rx="8" fill="url(#jf-ocean)" stroke="#1d2d3d" strokeWidth="1.5" />

            <L x="227" y="58" size={15} weight={800} anchor="middle" fill={C.warm}>
              KART B: Meridional jetstrøm (Rossby-bølger)
            </L>
            <L x="227" y="76" size={11.5} fill={C.muted} anchor="middle">
              Bølger nord/sør · Tråg & Rygger · Stillestående ekstremvær
            </L>

            {/* Landmasse-silhuetter */}
            <path d="M 35 80 Q 75 90 65 140 L 35 130 Z" fill="url(#jf-land)" stroke="#334e68" strokeWidth="1" />
            <path d="M 255 240 Q 275 230 270 270 Q 245 280 255 240 Z" fill="url(#jf-land)" stroke="#334e68" strokeWidth="1" />
            <path
              d="M 315 110 Q 355 140 335 200 Q 305 230 320 250 L 355 240 L 375 140 Z"
              fill="url(#jf-land)"
              stroke="#38bdf8"
              strokeWidth="1.4"
            />
            <L x="350" y="180" fill="#f8fafc" size={12} weight={800} anchor="middle">Norge</L>

            {/* Kuldetunge over Skandinavia i tråget */}
            <ellipse cx="320" cy="220" rx="60" ry="70" fill="url(#jf-cold-tongue)" />
            {/* Varmluftsrygg over Atlanteren */}
            <ellipse cx="140" cy="140" rx="65" ry="60" fill="url(#jf-warm-ridge)" />

            {/* Meandrerende jetstrøm med rygg og tråg */}
            {/* Ryggebue mot Grønland (NORD), trågbue over Nordsjøen/Norge (SØR) */}
            <path
              d="M 35 260 C 80 260, 100 110, 160 110 C 230 110, 240 280, 320 290 C 380 300, 390 190, 420 180"
              fill="none"
              stroke="#0284c7"
              strokeWidth="24"
              opacity="0.3"
            />
            <path
              d="M 35 260 C 80 260, 100 110, 160 110 C 230 110, 240 280, 320 290 C 380 300, 390 190, 420 180"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
            />
            {/* Animert strømning */}
            <path
              d="M 35 260 C 80 260, 100 110, 160 110 C 230 110, 240 280, 320 290 C 380 300, 390 190, 420 180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              className="model-wind-flow"
            />
            <Arrow d="M 405 185 L 425 180" marker={m.teal} color="#38bdf8" width={3.6} />

            {/* Annotasjoner for Rygg og Tråg */}
            <g transform="translate(160, 95)">
              <rect x="-45" y="-18" width="90" height="20" rx="4" fill="#1f140e" stroke="#ea580c" strokeWidth="1.2" />
              <L x="0" y="-4" fill="#fdba74" size={11} weight={800} anchor="middle">
                RYGG (Mildluft)
              </L>
              <Arrow d="M 0 5 L 0 25" marker={m.warm} color={C.warm} width={2.2} />
            </g>

            <g transform="translate(320, 315)">
              <rect x="-50" y="6" width="100" height="20" rx="4" fill="#0c1d29" stroke="#0284c7" strokeWidth="1.2" />
              <L x="0" y="20" fill="#7dd3fc" size={11} weight={800} anchor="middle">
                TRÅG (Polarluft)
              </L>
              <Arrow d="M 0 -5 L 0 -22" marker={m.cold} color={C.cold} width={2.2} />
            </g>

            {/* Forklaringskort nederst */}
            <rect x="35" y="345" width="385" height="75" rx="6" fill="#111d27" stroke="#22394d" strokeWidth="1.3" />
            <L x="50" y="366" fill={C.cold} size={12} weight={800}>
              ❄️ Værlåsing under tråget:
            </L>
            <L x="50" y="384" fill={C.fg} size={11}>
              • Iskald arktisk luft strømmer sørover over Norge (kuldeutbrudd).
            </L>
            <L x="50" y="402" fill={C.warm} size={11} weight={700}>
              • Bølgene står stille i dagevis $⟹$ langvarig kulde eller hetebølge!
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. JetStreakDiagram
 * 4-kvadrant-modellen for jetkjerne (jet streak) i 3D-kobling:
 * Øvre planvisning med isotaker, innløp/utløp og aldersofisk vind,
 * koblet til bakkenivå der divergens i venstre utløp (left exit)
 * suger opp luft, danner en syklon og dypner et lavtrykk med fronter.
 */
export function JetStreakDiagram() {
  return (
    <Diagram
      title="Jetkjernen og 4-kvadrant-modellen: Slik skaper jetstrømmen lavtrykk"
      heading="4-kvadrant-modellen: Hvorfor venstre utløp suger opp luft og lager storm"
      caption="Inne i jetstrømmen finnes lokale soner med ekstra sterk vind, kalt jetkjerner (jet streaks). Når luften raser inn i kjernen (innløpet), må den akselerere, og når den forlater den (utløpet), må den bremse opp. Denne fartsforandringen skaper ubalanse mellom trykkgradientkraften og Corioliskraften, slik at luften tvinges på tvers av jeten (aldersofisk vind). Resultatet er 4 distinkte kvadranter: I venstre utløp (nord for kjernens utløp) og høyre innløp oppstår kraftig divergens i høyden (luften spres fra hverandre). Dette fjerner luftmasse fra toppen av søylen! For å kompensere må luft suges opp fra bakken, lufttrykket faller, og det dannes et roterende lavtrykk (syklon) med skydannelse og kraftig nedbør."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Isotak-gradient for kjernen */}
            <radialGradient id="js-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>

            {/* Oppdriftsgradient fra bakken */}
            <linearGradient id="js-updraft" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* ØVRE NIVÅ (8–12 km): PLANVISNING AV JETKJERNEN */}
          <rect x="35" y="25" width="870" height="235" rx="8" fill="#0c151e" stroke="#1e2e3d" strokeWidth="1.5" />
          <L x="55" y="50" fill="#38bdf8" size={14} weight={800}>
            Øvre troposfære (300–250 hPa / ca. 10 km) · Sett ovenfra
          </L>
          <L x="880" y="50" fill={C.muted} size={11} anchor="end">
            Vindretning: Vest $\rightarrow$ Øst $\longrightarrow$
          </L>

          {/* Jetbånd bakgrunn og isotaker */}
          <path d="M 55 130 L 880 130" stroke="#0284c7" strokeWidth="50" opacity="0.18" />
          <ellipse cx="470" cy="130" rx="260" ry="42" fill="url(#js-core-grad)" />

          {/* Isotak-konturer (lik vindhastighet) */}
          <ellipse cx="470" cy="130" rx="250" ry="38" fill="none" stroke="#0284c7" strokeWidth="1.6" strokeDasharray="5 3" />
          <ellipse cx="470" cy="130" rx="170" ry="28" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
          <ellipse cx="470" cy="130" rx="90" ry="18" fill="none" stroke="#ef4444" strokeWidth="2.2" />

          {/* Hovedvindvektor gjennom kjernen */}
          <Arrow d="M 120 130 L 820 130" marker={m.teal} color="#38bdf8" width={3.8} />
          {/* Animert vindstrøm */}
          <path d="M 120 130 L 820 130" fill="none" stroke="#ffffff" strokeWidth="2.2" className="model-wind-fast" />

          <L x="470" y="134" fill="#ffffff" size={12} weight={900} anchor="middle">
            VINDMAKSIMUM (&gt;300 km/t)
          </L>

          {/* INNLØP OG UTLØP MERKER */}
          <line x1="470" y1="55" x2="470" y2="205" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
          <L x="280" y="70" fill={C.muted} size={12} weight={700} anchor="middle">
            INNLØP (Akselerasjon)
          </L>
          <L x="660" y="70" fill={C.muted} size={12} weight={700} anchor="middle">
            UTLØP (Retardasjon / Bremsing)
          </L>

          {/* DE 4 KVADRANTENE */}
          {/* 1. Venstre innløp (Konvergens) */}
          <rect x="200" y="80" width="160" height="42" rx="4" fill="#1e293b" opacity="0.8" stroke="#334155" />
          <L x="280" y="98" fill="#94a3b8" size={11} weight={700} anchor="middle">
            Venstre innløp
          </L>
          <L x="280" y="113" fill="#cbd5e1" size={11} weight={800} anchor="middle">
            KONVERGENS (Høyde)
          </L>

          {/* 2. Høyre innløp (Divergens) */}
          <rect x="200" y="145" width="160" height="42" rx="4" fill="#042f2e" opacity="0.85" stroke="#0d9488" />
          <L x="280" y="163" fill="#5eead4" size={11} weight={700} anchor="middle">
            Høyre innløp
          </L>
          <L x="280" y="178" fill="#2dd4bf" size={11} weight={800} anchor="middle">
            DIVERGENS (Heving)
          </L>

          {/* 3. Venstre utløp: STJERNEN I FORESLLINGEN! (KRAFTIG DIVERGENS) */}
          <rect x="580" y="80" width="180" height="44" rx="4" fill="#3b0710" stroke="#ef4444" strokeWidth="2" />
          <L x="670" y="98" fill="#fca5a5" size={11.5} weight={800} anchor="middle">
            VENSTRE UTLØP (Left exit)
          </L>
          <L x="670" y="114" fill="#f87171" size={12} weight={900} anchor="middle">
            🌟 MAKSIMAL DIVERGENS
          </L>
          {/* Divergens-spredningspiler */}
          <Arrow d="M 680 125 L 750 95" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 680 135 L 750 165" marker={m.teal} color={C.teal} width={2.4} />

          {/* 4. Høyre utløp (Konvergens) */}
          <rect x="580" y="145" width="180" height="42" rx="4" fill="#1e293b" opacity="0.8" stroke="#334155" />
          <L x="670" y="163" fill="#94a3b8" size={11} weight={700} anchor="middle">
            Høyre utløp
          </L>
          <L x="670" y="178" fill="#cbd5e1" size={11} weight={800} anchor="middle">
            KONVERGENS (Nedsynking)
          </L>

          {/* KOBLINGSPIL NED TIL BAKKEN: VERTIKAL SUGING I VENSTRE UTLØP */}
          <path
            d="M 670 230 L 670 330"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeDasharray="6 4"
            className="model-wind-flow"
          />
          <rect x="560" y="260" width="220" height="28" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
          <L x="670" y="278" fill="#ffffff" size={11} weight={900} anchor="middle">
            ⬆️ Luft suges opp fra bakken!
          </L>

          {/* BAKKENIVÅET (0 moh.): LAVTRYKKETS FØDSEL */}
          <rect x="35" y="300" width="870" height="200" rx="8" fill="#080e14" stroke="#1e2e3d" strokeWidth="1.5" />
          <L x="55" y="325" fill="#f59e0b" size={14} weight={800}>
            Bakkenivå (Havnivå / 1000 hPa) · Dynamisk lavtrykksdannelse (Syklon)
          </L>

          {/* Lavtrykkssenter direkte under venstre utløp */}
          <g transform="translate(670, 410)">
            {/* Isobar-ringer */}
            <circle cx="0" cy="0" r="70" fill="none" stroke="#475569" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="50" fill="none" stroke="#64748b" strokeWidth="1.6" />
            <circle cx="0" cy="0" r="30" fill="#3b151b" stroke={C.low} strokeWidth="2.4" />

            <L x="0" y="8" fill={C.low} size={26} weight={900} anchor="middle">
              L
            </L>
            <L x="0" y="-12" fill="#fca5a5" size={10} weight={800} anchor="middle">
              980 hPa
            </L>

            {/* Innstrømmende spiralvinder */}
            <path d="M 65 30 Q 30 50 15 25" fill="none" stroke={C.low} strokeWidth="2.2" markerEnd={`url(#${m.low})`} />
            <path d="M -60 -20 Q -25 -45 -10 -25" fill="none" stroke={C.low} strokeWidth="2.2" markerEnd={`url(#${m.low})`} />

            {/* Kaldfront og varmfront */}
            <path d="M 0 0 Q -30 40 -60 70" fill="none" stroke="#38bdf8" strokeWidth="3.2" />
            <L x="-45" y="45" fill="#7dd3fc" size={10.5} weight={800}>
              Kaldfront
            </L>

            <path d="M 0 0 Q 40 20 80 15" fill="none" stroke="#ef4444" strokeWidth="3.2" />
            <L x="55" y="32" fill="#fca5a5" size={10.5} weight={800}>
              Varmfront
            </L>
          </g>

          {/* Høytrykk på bakken under høyre utløp (nedsynking) */}
          <g transform="translate(280, 410)">
            <circle cx="0" cy="0" r="45" fill="#0c202d" stroke={C.teal} strokeWidth="2" />
            <L x="0" y="8" fill={C.teal} size={22} weight={900} anchor="middle">
              H
            </L>
            <L x="0" y="-10" fill="#67e8f9" size={10} weight={800} anchor="middle">
              1025 hPa
            </L>
            <L x="0" y="24" fill={C.muted} size={10} anchor="middle">
              Subsidens
            </L>
          </g>

          {/* Sammenfattende boks */}
          <rect x="55" y="348" width="400" height="42" rx="5" fill="#141f2c" stroke="#22394d" />
          <L x="70" y="366" fill="#fbbf24" size={11} weight={800}>
            Fysisk kjede:
          </L>
          <L x="70" y="382" fill={C.fg} size={10.5}>
            Øvre divergens $⟹$ Vekten av søylen minker $⟹$ P_bakke stuper $⟹$ STORM!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. JetBlockingDiagram (NY FIGUR)
 * Atmosfærisk blokkering (Omega-blokk Ω og Rex-blokk) over Skandinavia:
 * Viser hvordan en mektig kvasistasjonær høytrykksrygg kutter og splitter jetstrømmen
 * i to grener, fører til ukesvis med sol/tørke/hete om sommeren eller inversjonskulde
 * om vinteren, flankert av to avsnørte lavtrykk (cut-off lows).
 */
export function JetBlockingDiagram() {
  return (
    <Diagram
      title="Atmosfærisk blokkering: Omega-blokk over Skandinavia"
      heading="Når været låser seg: Omega-blokkering over Skandinavia"
      caption="En mektig høytrykksrygg har vokst seg så kraftig over Skandinavia at den bryter opp det vanlige vestavindsbeltet. Jetstrømmen tvinges til å dele seg i to adskilte grener rundt høytrykket, i et mønster som ligner den greske bokstaven Omega (Ω). Under det massive blokkeringshøytrykket (H) synker luften (subsidens), skyene fordamper, og været står bom fast i ukevis: Om sommeren fører dette til brennende hetebølger, ekstrem tørke og skogbrannfare (som i 2018). Om vinteren gir det klarvær, massiv utstråling og bitende kuldeinversjon i innlandet. Samtidig blir lavtrykkene tvunget utenom eller avsnørt på flankene (cut-off lows), noe som skaper uker med sammenhengende flomregn i Sør-Europa eller over Atlanteren."
      viewBox="0 0 940 460"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Blokk-høytrykk glød */}
            <radialGradient id="blk-high-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0f1722" stopOpacity="0" />
            </radialGradient>

            {/* Cut-off low glød */}
            <radialGradient id="blk-low-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0f1722" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Bakgrunnskart */}
          <rect x="30" y="25" width="880" height="415" rx="8" fill="#091118" stroke="#1d2d3d" strokeWidth="1.5" />

          {/* Stilisert kontinentalbakgrunn */}
          {/* Grønland NV */}
          <path d="M 60 70 Q 110 80 90 140 L 60 130 Z" fill="#18232c" stroke="#2a3d4f" strokeWidth="1.2" />
          {/* Storbritannia */}
          <path d="M 280 260 Q 305 250 300 290 Q 275 300 280 260 Z" fill="#18232c" stroke="#2a3d4f" strokeWidth="1.2" />
          {/* Skandinavia (Norge / Sverige / Finland) */}
          <path
            d="M 450 110 Q 510 150 490 220 Q 460 250 475 290 L 530 280 L 560 140 Z"
            fill="#1e2e3b"
            stroke="#38bdf8"
            strokeWidth="1.6"
          />
          <L x="500" y="195" fill="#ffffff" size={13} weight={900} anchor="middle">
            Skandinavia
          </L>

          {/* Sentralt blokkeringshøytrykk over Skandinavia */}
          <circle cx="500" cy="200" r="130" fill="url(#blk-high-glow)" />
          {/* Isobarringer */}
          <ellipse cx="500" cy="200" rx="110" ry="85" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <ellipse cx="500" cy="200" rx="70" ry="55" fill="none" stroke="#fbbf24" strokeWidth="2.4" />
          <circle cx="500" cy="200" r="32" fill="#291a08" stroke="#f59e0b" strokeWidth="2.8" />
          <L x="500" y="208" fill="#fbbf24" size={28} weight={900} anchor="middle">
            H
          </L>
          <L x="500" y="185" fill="#fde68a" size={11} weight={800} anchor="middle">
            1035 hPa
          </L>

          {/* OMEGA-FORMET JETSTRØM (Ω): SPLITTES I TO GRENER */}
          {/* Hovedstamme fra Atlanteren (vest) som deler seg ved x=260 */}
          {/* Nordlig gren: bukter seg langt nord om Svalbard */}
          <path
            d="M 50 250 C 180 250, 220 70, 480 60 C 650 50, 720 180, 890 200"
            fill="none"
            stroke="#0284c7"
            strokeWidth="20"
            opacity="0.3"
          />
          <path
            d="M 50 250 C 180 250, 220 70, 480 60 C 650 50, 720 180, 890 200"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4.5"
          />
          <path
            d="M 50 250 C 180 250, 220 70, 480 60 C 650 50, 720 180, 890 200"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            className="model-wind-flow"
          />
          <Arrow d="M 860 198 L 890 200" marker={m.teal} color="#38bdf8" width={3.4} />

          {/* Sørlig gren: bukter seg ned mot Middelhavet */}
          <path
            d="M 220 250 C 260 360, 360 400, 500 400 C 640 400, 720 330, 890 260"
            fill="none"
            stroke="#0284c7"
            strokeWidth="18"
            opacity="0.25"
          />
          <path
            d="M 220 250 C 260 360, 360 400, 500 400 C 640 400, 720 330, 890 260"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
          />
          <path
            d="M 220 250 C 260 360, 360 400, 500 400 C 640 400, 720 330, 890 260"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            className="model-wind-flow"
          />
          <Arrow d="M 865 268 L 890 260" marker={m.teal} color="#38bdf8" width={3.2} />

          {/* OMEGA-BOKSTAV (Ω) SYMBOL I BAKGRUNNEN */}
          <L x="500" y="115" fill="#f59e0b" size={54} weight={900} anchor="middle" opacity="0.4">
            Ω
          </L>
          <L x="500" y="140" fill="#fbbf24" size={13} weight={800} anchor="middle">
            Omega-blokk (Ω)
          </L>

          {/* AVSNØRTE LAVTRYKK PÅ FLANKENE (CUT-OFF LOWS) */}
          {/* Lavtrykk 1: Vest for blokka over Atlanteren */}
          <g transform="translate(190, 310)">
            <circle cx="0" cy="0" r="38" fill="url(#blk-low-glow)" />
            <circle cx="0" cy="0" r="22" fill="#3b151b" stroke={C.low} strokeWidth="2.2" />
            <L x="0" y="6" fill={C.low} size={18} weight={900} anchor="middle">
              L
            </L>
            <L x="0" y="38" fill="#fca5a5" size={10.5} weight={800} anchor="middle">
              Avsnørt lavtrykk
            </L>
            <L x="0" y="50" fill={C.muted} size={9.5} anchor="middle">
              Urolig vær i vest
            </L>
          </g>

          {/* Lavtrykk 2: Sørøst for blokka over Balkan / Øst-Europa */}
          <g transform="translate(740, 330)">
            <circle cx="0" cy="0" r="38" fill="url(#blk-low-glow)" />
            <circle cx="0" cy="0" r="22" fill="#3b151b" stroke={C.low} strokeWidth="2.2" />
            <L x="0" y="6" fill={C.low} size={18} weight={900} anchor="middle">
              L
            </L>
            <L x="0" y="38" fill="#fca5a5" size={10.5} weight={800} anchor="middle">
              Avsnørt lavtrykk
            </L>
            <L x="0" y="50" fill={C.muted} size={9.5} anchor="middle">
              Styrtregn & flom
            </L>
          </g>

          {/* Pedagogiske konsekvenskort */}
          <g transform="translate(60, 45)">
            <rect x="0" y="0" width="225" height="95" rx="6" fill="#141c24" stroke="#22394d" strokeWidth="1.3" />
            <L x="14" y="24" fill="#fbbf24" size={12} weight={800}>
              ☀️ Sommerkonsekvens:
            </L>
            <L x="14" y="44" fill={C.fg} size={11}>
              • Konstant solinnstråling og nedsynking
            </L>
            <L x="14" y="62" fill={C.fg} size={11}>
              • Hetebølge, tørke og skogbrannfare
            </L>
            <L x="14" y="80" fill={C.sand} size={10.5} weight={700}>
              • F.eks. den ekstreme sommeren 2018!
            </L>
          </g>

          <g transform="translate(670, 45)">
            <rect x="0" y="0" width="220" height="95" rx="6" fill="#141c24" stroke="#22394d" strokeWidth="1.3" />
            <L x="14" y="24" fill="#7dd3fc" size={12} weight={800}>
              ❄️ Vinterkonsekvens:
            </L>
            <L x="14" y="44" fill={C.fg} size={11}>
              • Skyfri himmel gir massiv varmeutstråling
            </L>
            <L x="14" y="62" fill={C.fg} size={11}>
              • Dype kuldeinversjoner (-30 °C i innlandet)
            </L>
            <L x="14" y="80" fill={C.cold} size={10.5} weight={700}>
              • Stillestående luft og forurensning
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. JetSeasonDiagram
 * Realistisk årstidsvariasjon: Vinter vs. Sommer.
 * Viser hvordan solas posisjon endrer temperaturgradienten mellom ekvator og pol,
 * og hvordan dette forskyver jetstrømmens styrke, breddegrad og stormbaner inn mot Norge.
 */
export function JetSeasonDiagram() {
  return (
    <Diagram
      title="Årstidsvariasjon: Vinterjet vs. Sommerjet"
      heading="Årstidene: Hvorfor stormene herjer om vinteren og stilner om sommeren"
      caption="Temperaturforskjellen mellom ekvator og pol styrer jetstrømmens kraft (termisk vind). Til venstre: Om vinteren er polen svøpt i stummende polarnatt (-40 °C), mens tropene bader i sol (+30 °C). Temperaturkontrasten er ekstrem (ΔT ≈ 70 °C). Polarfrontjeten blir sylskarp, akselererer til over 350 km/t og forskyves sørover mot 45°–55°N. Den mater kraftige lavtrykk som styrer stormbanen rett mot Norskehavet og Vestlandet. Til høyre: Om sommeren varmer midnattssolen Arktis, og kontrasten krymper til bare ΔT ≈ 30 °C. Jetstrømmen svekkes drastisk (100–150 km/t) og trekker nordover til 65°–70°N. Været i Norge blir roligere, med svakere lavtrykk og lengre perioder med behagelig sommervær."
      viewBox="0 0 940 430"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Vinter atmosfære-gradient */}
            <linearGradient id="seas-win-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#040910" />
              <stop offset="40%" stopColor="#081420" />
              <stop offset="100%" stopColor="#102538" />
            </linearGradient>

            {/* Sommer atmosfære-gradient */}
            <linearGradient id="seas-sum-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08121a" />
              <stop offset="40%" stopColor="#142634" />
              <stop offset="100%" stopColor="#223b4e" />
            </linearGradient>
          </defs>

          {/* VINTERPANEL (VENSTRE) */}
          <g transform="translate(0, 0)">
            <rect x="35" y="25" width="415" height="385" rx="8" fill="url(#seas-win-bg)" stroke="#1d2d3d" strokeWidth="1.5" />
            <L x="242" y="55" size={16} weight={800} anchor="middle" fill="#7dd3fc">
              ❄️ VINTER (Desember – Februar)
            </L>
            <L x="242" y="74" size={11.5} fill="#94a3b8" anchor="middle">
              Ekstrem temperaturkontrast: ΔT ≈ 70 °C!
            </L>

            {/* Breddegradsnett */}
            {[
              { y: 110, lat: "80°N · Polarnatt (-40 °C)" },
              { y: 170, lat: "60°N · Norge" },
              { y: 230, lat: "40°N · Sør-Europa" },
              { y: 290, lat: "20°N · Tropene (+30 °C)" },
            ].map((lat) => (
              <g key={lat.lat}>
                <line x1="55" y1={lat.y} x2="430" y2={lat.y} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <L x="425" y={lat.y - 6} fill={C.muted} size={10} anchor="end">
                  {lat.lat}
                </L>
              </g>
            ))}

            {/* Vinter-jetstrøm: Lav breddegrad (50°N), ekstrem tykkelse og fart */}
            {/* Ligger rundt y=200 */}
            <path d="M 55 200 L 430 200" stroke="#0284c7" strokeWidth="32" opacity="0.35" />
            <path d="M 55 200 L 430 200" stroke="#38bdf8" strokeWidth="6" />
            {/* Animert lynrask vind */}
            <path d="M 55 200 L 430 200" stroke="#ffffff" strokeWidth="2.6" className="model-wind-fast" />
            <Arrow d="M 405 200 L 430 200" marker={m.teal} color="#38bdf8" width={3.6} />

            <L x="180" y="185" fill="#f8fafc" size={12} weight={900}>
              Kraftig vinterjet: 250–400 km/t
            </L>
            <L x="180" y="222" fill="#7dd3fc" size={11} weight={700}>
              Trukket sørover (ca. 45°–55°N)
            </L>

            {/* Norge markør */}
            <circle cx="340" cy="170" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.8" />
            <L x="352" y="174" fill="#ffffff" size={12} weight={800}>
              Norge
            </L>

            {/* Stormbanepil mot Norskehavet */}
            <Arrow d="M 120 250 C 220 240, 270 190, 340 175" marker={m.low} color={C.low} width={2.4} dash="5 3" />
            <L x="190" y="270" fill={C.low} size={11} weight={700}>
              Stormbanen treffer kysten!
            </L>

            {/* Faktaboks nederst */}
            <rect x="55" y="325" width="375" height="65" rx="6" fill="#0f1b26" stroke="#1d3d54" strokeWidth="1.2" />
            <L x="70" y="348" fill="#7dd3fc" size={11.5} weight={800}>
              Konsekvens i Norge:
            </L>
            <L x="70" y="366" fill={C.fg} size={11}>
              Dype atlantiske stormer på løpende bånd, kraftig vind og mye nedbør på Vestlandet.
            </L>
          </g>

          {/* SOMMERPANEL (HØYRE) */}
          <g transform="translate(470, 0)">
            <rect x="20" y="25" width="415" height="385" rx="8" fill="url(#seas-sum-bg)" stroke="#1d2d3d" strokeWidth="1.5" />
            <L x="227" y="55" size={16} weight={800} anchor="middle" fill="#fbbf24">
              ☀️ SOMMER (Juni – August)
            </L>
            <L x="227" y="74" size={11.5} fill="#cbd5e1" anchor="middle">
              Liten temperaturkontrast: ΔT ≈ 30 °C
            </L>

            {/* Breddegradsnett */}
            {[
              { y: 110, lat: "80°N · Midnattssol (+5 °C)" },
              { y: 170, lat: "60°N · Norge" },
              { y: 230, lat: "40°N · Sør-Europa" },
              { y: 290, lat: "20°N · Tropene (+35 °C)" },
            ].map((lat) => (
              <g key={lat.lat}>
                <line x1="40" y1={lat.y} x2="415" y2={lat.y} stroke="#2a3d4f" strokeWidth="1" strokeDasharray="4 4" />
                <L x="410" y={lat.y - 6} fill={C.muted} size={10} anchor="end">
                  {lat.lat}
                </L>
              </g>
            ))}

            {/* Sommer-jetstrøm: Høy breddegrad (65°N), mye tynnere og svakere */}
            {/* Ligger rundt y=145 */}
            <path d="M 40 145 L 415 145" stroke="#0284c7" strokeWidth="16" opacity="0.22" />
            <path d="M 40 145 L 415 145" stroke="#38bdf8" strokeWidth="3.5" />
            {/* Roligere animert vind */}
            <path d="M 40 145 L 415 145" stroke="#ffffff" strokeWidth="1.8" className="model-wind-flow" />
            <Arrow d="M 390 145 L 415 145" marker={m.teal} color="#38bdf8" width={2.8} />

            <L x="160" y="132" fill="#fbbf24" size={12} weight={800}>
              Svakere sommerjet: 100–160 km/t
            </L>
            <L x="160" y="166" fill="#bae6fd" size={11} weight={700}>
              Trukket nordover (ca. 65°–70°N)
            </L>

            {/* Norge markør */}
            <circle cx="325" cy="170" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.8" />
            <L x="337" y="174" fill="#ffffff" size={12} weight={800}>
              Norge
            </L>

            {/* Faktaboks nederst */}
            <rect x="40" y="325" width="375" height="65" rx="6" fill="#17232d" stroke="#254356" strokeWidth="1.2" />
            <L x="55" y="348" fill="#fbbf24" size={11.5} weight={800}>
              Konsekvens i Norge:
            </L>
            <L x="55" y="366" fill={C.fg} size={11}>
              Stormbanen passerer oftere nord for oss mot Barentshavet. Roligere vær og lengre godværsperioder.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}
