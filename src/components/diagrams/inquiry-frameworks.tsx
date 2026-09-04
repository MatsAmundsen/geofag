import { Arrow, C, Diagram, L } from "./svg-kit";

export function SeaBreezeLandBreezeDiagram() {
  return (
    <Diagram
      title="Sjøbris om dagen og landbris om natten: termisk drevet lokal luftsirkulasjon"
      heading="Sjøbris og landbris: termisk kystsirkulasjon"
      caption="Land varmes og avkjøles langt raskere enn hav på grunn av ulik spesifikk varmekapasitet. Om dagen stiger varm luft over land og trekker kjølig sjøbris inn. Om natten reverseres kretsløpet til en svakere landbris mot det relativt varmere havet."
      viewBox="0 0 900 440"
      wide
    >
      {(m) => (
        <>
          {/* Venstre panel: SJØBRIS (DAG) */}
          <g>
            <rect x="40" y="30" width="390" height="380" rx="10" fill="#121a20" stroke={C.teal} strokeWidth="1.5" />
            <L x="60" y="60" fill={C.teal} size={16} weight={700}>Sjøbris (dagtid · solskinn)</L>
            <L x="60" y="80" fill={C.muted} size={12}>Land varmes raskt opp → termisk lavtrykk ved bakken</L>

            {/* Hav venstre, Land høyre */}
            <rect x="50" y="270" width="180" height="130" fill="#142c3b" />
            <L x="135" y="340" fill={C.cold} size={14} weight={600} anchor="middle">Kjølig hav (H)</L>
            <rect x="230" y="250" width="190" height="150" fill="#29241b" />
            <L x="325" y="340" fill={C.warm} size={14} weight={600} anchor="middle">Varmt land (L)</L>

            {/* Sol illustrasjon */}
            <circle cx="360" cy="90" r="16" fill={C.warm} />
            <line x1="360" y1="65" x2="360" y2="60" stroke={C.warm} strokeWidth="2" />
            <line x1="385" y1="90" x2="390" y2="90" stroke={C.warm} strokeWidth="2" />
            <line x1="378" y1="108" x2="383" y2="113" stroke={C.warm} strokeWidth="2" />

            {/* Sirkulasjon piler for sjøbris */}
            {/* 1. Oppstigning over land */}
            <Arrow d="M 330 240 L 330 140" marker={m.warm} color={C.warm} width={3.2} />
            <L x="345" y="185" fill={C.warm} size={12} weight={600}>Termisk oppdrift</L>

            {/* 2. Returstrøm i høyden (fra land mot hav) */}
            <Arrow d="M 300 130 L 160 130" marker={m.muted} color={C.muted} width={2.4} />
            <L x="230" y="120" fill={C.muted} size={11} anchor="middle">Returstrøm i høyden (~1 km)</L>

            {/* 3. Nedsynkning over hav */}
            <Arrow d="M 130 145 L 130 245" marker={m.cold} color={C.cold} width={2.4} />

            {/* 4. Sjøbrisen ved bakken (inn mot land) */}
            <Arrow d="M 150 260 L 290 260" marker={m.teal} color={C.teal} width={3.8} />
            <L x="220" y="285" fill={C.teal} size={14} weight={700} anchor="middle">Sjøbris (pålandsvind 5–10 m/s)</L>
          </g>

          {/* Høyre panel: LANDBRIS (NATT) */}
          <g>
            <rect x="470" y="30" width="390" height="380" rx="10" fill="#121a20" stroke={C.sand} strokeWidth="1.5" />
            <L x="490" y="60" fill={C.sand} size={16} weight={700}>Landbris (nattestid · utstråling)</L>
            <L x="490" y="80" fill={C.muted} size={12}>Land avkjøles raskt → termisk høytrykk ved bakken</L>

            {/* Hav venstre, Land høyre */}
            <rect x="480" y="270" width="180" height="130" fill="#193345" />
            <L x="565" y="340" fill={C.rain} size={14} weight={600} anchor="middle">Relativt lunt hav (L)</L>
            <rect x="660" y="250" width="190" height="150" fill="#182026" />
            <L x="755" y="340" fill={C.cold} size={14} weight={600} anchor="middle">Kaldt land (H)</L>

            {/* Måne illustrasjon */}
            <circle cx="800" cy="90" r="14" fill="#c0d4df" />
            <circle cx="795" cy="88" r="12" fill="#121a20" />

            {/* Sirkulasjon piler for landbris */}
            {/* 1. Oppstigning over havet */}
            <Arrow d="M 570 260 L 570 150" marker={m.rain} color={C.rain} width={2.6} />
            <L x="585" y="200" fill={C.rain} size={12} weight={600}>Svak oppdrift over sjø</L>

            {/* 2. Returstrøm i høyden (fra hav mot land) */}
            <Arrow d="M 600 140 L 730 140" marker={m.muted} color={C.muted} width={2.2} />
            <L x="665" y="130" fill={C.muted} size={11} anchor="middle">Returstrøm i høyden</L>

            {/* 3. Nedsynkning over kaldt land */}
            <Arrow d="M 760 155 L 760 240" marker={m.cold} color={C.cold} width={2.4} />

            {/* 4. Landbrisen ved bakken (ut mot sjø) */}
            <Arrow d="M 730 260 L 590 260" marker={m.sand} color={C.sand} width={3} />
            <L x="660" y="285" fill={C.sand} size={14} weight={700} anchor="middle">Landbris (fralandsvind 2–5 m/s)</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function ModelParametrizationDiagram() {
  return (
    <Diagram
      title="Parametrisering i numeriske værmodeller: sub-grid prosesser i én modellcelle"
      heading="Parametrisering av sub-grid prosesser"
      caption="En numerisk værmodell deler atmosfæren i celler (for eksempel 2,5 × 2,5 km). Prosesser som er mindre enn cellen — som konveksjonsskyer, turbulens og skykondensasjon — kan ikke løses direkte og må representeres ved forenklede fysiske parametriseringer."
      viewBox="0 0 900 420"
      wide
    >
      {(m) => (
        <>
          {/* Venstre: Én stor 3D-gridcelle */}
          <rect x="50" y="30" width="460" height="360" rx="10" fill="#131e26" stroke={C.teal} strokeWidth="1.8" />
          <L x="75" y="60" fill={C.teal} size={16} weight={700}>Én numerisk modellcelle (f.eks. 2,5 × 2,5 km)</L>
          <L x="75" y="80" fill={C.muted} size={12}>Modellen beregner kun ett enkelt gjennomsnittstall for T, p, fukt og vind i cellen</L>

          {/* Celleramme / kube */}
          <rect x="80" y="100" width="400" height="260" fill="#0f171d" stroke={C.dim} strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Sub-grid element 1: Enkelte cumulusskyer */}
          <ellipse cx="180" cy="180" rx="45" ry="25" fill="#425563" />
          <ellipse cx="205" cy="165" rx="35" ry="25" fill="#546b7c" />
          <L x="200" y="220" fill={C.fg} size={12} weight={600} anchor="middle">Cumulussky (&lt;1 km)</L>
          <L x="200" y="235" fill={C.muted} size={10} anchor="middle">For liten for gridet</L>

          {/* Sub-grid element 2: Nedbør og turbulente virvler */}
          <line x1="180" y1="210" x2="175" y2="280" stroke={C.rain} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="195" y1="210" x2="190" y2="280" stroke={C.rain} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="210" y1="210" x2="205" y2="280" stroke={C.rain} strokeWidth="1.5" strokeDasharray="3 3" />
          <L x="195" y="305" fill={C.rain} size={11} anchor="middle">Lokal bygenedbør</L>

          {/* Sub-grid element 3: Turbulente virvler nær bakken */}
          <path d="M 340 320 Q 360 290 380 320 T 420 320" fill="none" stroke={C.warm} strokeWidth="2" />
          <L x="380" y="285" fill={C.warm} size={12} weight={600} anchor="middle">Grenselagsturbulens</L>
          <L x="380" y="300" fill={C.muted} size={10} anchor="middle">Mekanisk friksjon mot terreng</L>

          {/* Stor pil over til høyre panel */}
          <Arrow d="M 525 210 L 585 210" marker={m.warm} color={C.warm} width={3.6} />

          {/* Høyre: Parametriseringsskjema */}
          <rect x="600" y="30" width="260" height="360" rx="10" fill="#141f27" stroke={C.warm} strokeWidth="1.5" />
          <L x="620" y="60" fill={C.warm} size={16} weight={700}>Parametrisering</L>
          <L x="620" y="80" fill={C.muted} size={12}>Fysisk-statistisk kobling</L>

          {/* Formel / modul-bokser */}
          <g>
            <rect x="620" y="100" width="220" height="60" rx="6" fill="#1b2933" stroke={C.dim} />
            <L x="635" y="125" fill={C.teal} size={13} weight={700}>Strålingsskjema</L>
            <L x="635" y="145" fill={C.muted} size={11}>Absorpsjon og albedo i skyer</L>
          </g>

          <g>
            <rect x="620" y="170" width="220" height="60" rx="6" fill="#1b2933" stroke={C.dim} />
            <L x="635" y="195" fill={C.rain} size={13} weight={700}>Sky-mikrofysikk</L>
            <L x="635" y="215" fill={C.muted} size={11}>Kondensasjon og vanndråpevekst</L>
          </g>

          <g>
            <rect x="620" y="240" width="220" height="60" rx="6" fill="#1b2933" stroke={C.dim} />
            <L x="635" y="265" fill={C.warm} size={13} weight={700}>Konveksjonsskjema</L>
            <L x="635" y="285" fill={C.muted} size={11}>Varme- og fukttransport oppover</L>
          </g>

          <g>
            <rect x="620" y="310" width="220" height="60" rx="6" fill="#1b2933" stroke={C.dim} />
            <L x="635" y="335" fill={C.sand} size={13} weight={700}>Turbulens & overflate</L>
            <L x="635" y="355" fill={C.muted} size={11}>Friksjon og varmeveksling</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function ImpactLevelsDiagram() {
  return (
    <Diagram
      title="Klimakonsekvenser og tilpasning på tre nivåer: individ, samfunn og økosystem"
      heading="Klimapåvirkning på tre nivåer"
      caption="En fullgod drøfting av klimaendringer må belyse alle tre nivåer: individets helse og bolig, samfunnets infrastruktur og beredskap, og økosystemenes biologiske mangfold og artsgrenser."
      viewBox="0 0 900 380"
      wide
    >
      {() => (
        <>
          {/* 1. Nivå: Individ */}
          <g>
            <rect x="40" y="30" width="260" height="320" rx="10" fill="#141f27" stroke={C.warm} strokeWidth="1.5" />
            <circle cx="80" cy="70" r="18" fill="#382c1e" stroke={C.warm} strokeWidth="1.5" />
            <L x="80" y="76" fill={C.warm} size={16} weight={700} anchor="middle">1</L>
            <L x="110" y="75" fill={C.warm} size={17} weight={700}>Individ & person</L>

            <rect x="55" y="105" width="230" height="225" rx="6" fill="#0f161c" />
            <text x="70" y="135" fill={C.fg} fontSize={13} fontWeight="600" fontFamily="inherit">
              Helse og sårbarhet:
            </text>
            <text x="70" y="160" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Hetestress hos eldre og syke.
            </text>
            <text x="70" y="185" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Vektorbårne sykdommer (flått).
            </text>
            <text x="70" y="215" fill={C.fg} fontSize={13} fontWeight="600" fontFamily="inherit">
              Privatøkonomi & bolig:
            </text>
            <text x="70" y="240" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Kjelleroversvømmelse (overvann).
            </text>
            <text x="70" y="265" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Økte forsikringspremier i risikosoner.
            </text>
            <text x="70" y="295" fill={C.warm} fontSize={11} fontWeight="600" fontFamily="inherit">
              Tiltak: Egenresiliens, tilfluktsrom, solskjerming.
            </text>
          </g>

          {/* 2. Nivå: Samfunn */}
          <g>
            <rect x="320" y="30" width="260" height="320" rx="10" fill="#141f27" stroke={C.teal} strokeWidth="1.5" />
            <circle cx="360" cy="70" r="18" fill="#183338" stroke={C.teal} strokeWidth="1.5" />
            <L x="360" y="76" fill={C.teal} size={16} weight={700} anchor="middle">2</L>
            <L x="390" y="75" fill={C.teal} size={17} weight={700}>Samfunn</L>

            <rect x="335" y="105" width="230" height="225" rx="6" fill="#0f161c" />
            <text x="350" y="135" fill={C.fg} fontSize={13} fontWeight="600" fontFamily="inherit">
              Kritisk infrastruktur:
            </text>
            <text x="350" y="160" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Vei og jernbane stengt av skred/flom.
            </text>
            <text x="350" y="185" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Stormflo mot kysthavner og kaier.
            </text>
            <text x="350" y="215" fill={C.fg} fontSize={13} fontWeight="600" fontFamily="inherit">
              Kommune & beredskap:
            </text>
            <text x="350" y="240" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Overvannshåndtering og flomveier.
            </text>
            <text x="350" y="265" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Drikkevannssikkerhet og strømbrudd.
            </text>
            <text x="350" y="295" fill={C.teal} fontSize={11} fontWeight="600" fontFamily="inherit">
              Tiltak: Arealplanlegging, flomvern, ROS-analyse.
            </text>
          </g>

          {/* 3. Nivå: Økosystem */}
          <g>
            <rect x="600" y="30" width="260" height="320" rx="10" fill="#141f27" stroke={C.rain} strokeWidth="1.5" />
            <circle cx="640" cy="70" r="18" fill="#192d35" stroke={C.rain} strokeWidth="1.5" />
            <L x="640" y="76" fill={C.rain} size={16} weight={700} anchor="middle">3</L>
            <L x="670" y="75" fill={C.rain} size={17} weight={700}>Økosystem</L>

            <rect x="615" y="105" width="230" height="225" rx="6" fill="#0f161c" />
            <text x="630" y="135" fill={C.fg} fontSize={13} fontWeight="600" fontFamily="inherit">
              Biologisk mangfold:
            </text>
            <text x="630" y="160" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Torsken og lodda trekker nordover.
            </text>
            <text x="630" y="185" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Tregrensen kryper oppover i fjellet.
            </text>
            <text x="630" y="215" fill={C.fg} fontSize={13} fontWeight="600" fontFamily="inherit">
              Hav og ferskvann:
            </text>
            <text x="630" y="240" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Havforsuring truer kalkdannende arter.
            </text>
            <text x="630" y="265" fill={C.muted} fontSize={12} fontFamily="inherit">
              • Endret issmelting gir varmere elver.
            </text>
            <text x="630" y="295" fill={C.rain} fontSize={11} fontWeight="600" fontFamily="inherit">
              Tiltak: Naturrestaurering, vern av korridorer.
            </text>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function AdaptationExamFrameworkDiagram() {
  return (
    <Diagram
      title="Eksamensdrøfting i klimatilpasning: 5-stegs modell fra naturfenomen til tiltak og begrensninger"
      heading="Eksamensdrøfting: 5-stegs modell for toppkarakter"
      caption="En fullverdig drøfting i Geofag 2 følger denne strukturen: Knytt naturfenomenet til den underliggende fysikken, belys konsekvensene på alle tre nivåer, sammenlign utslippskutt med tilpasning, og drøft begrensninger eller utilsiktede virkninger."
      viewBox="0 0 900 400"
      wide
    >
      {(m) => (
        <>
          <rect x="40" y="30" width="820" height="340" rx="10" fill="#121a22" stroke={C.dim} strokeWidth="1.5" />

          {/* Steg 1 */}
          <g>
            <rect x="60" y="60" width="140" height="260" rx="8" fill="#18252f" stroke={C.warm} strokeWidth="1.4" />
            <circle cx="130" cy="95" r="18" fill="#382b1c" stroke={C.warm} strokeWidth="1.5" />
            <L x="130" y="101" fill={C.warm} size={16} weight={700} anchor="middle">1</L>
            <L x="130" y="135" fill={C.warm} size={15} weight={700} anchor="middle">Fenomen</L>
            <rect x="70" y="155" width="120" height="150" rx="4" fill="#0f161c" />
            <text x="78" y="180" fill={C.fg} fontSize={11} fontFamily="inherit">Velg ett konkret:</text>
            <text x="78" y="202" fill={C.muted} fontSize={11} fontFamily="inherit">• Styrtregn i by</text>
            <text x="78" y="222" fill={C.muted} fontSize={11} fontFamily="inherit">• Flom i vassdrag</text>
            <text x="78" y="242" fill={C.muted} fontSize={11} fontFamily="inherit">• Stormflo / havnivå</text>
            <text x="78" y="262" fill={C.muted} fontSize={11} fontFamily="inherit">• Hetebølge / tørke</text>
          </g>

          <Arrow d="M 205 185 L 220 185" marker={m.teal} color={C.teal} width={2.4} />

          {/* Steg 2 */}
          <g>
            <rect x="225" y="60" width="140" height="260" rx="8" fill="#18252f" stroke={C.teal} strokeWidth="1.4" />
            <circle cx="295" cy="95" r="18" fill="#163138" stroke={C.teal} strokeWidth="1.5" />
            <L x="295" y="101" fill={C.teal} size={16} weight={700} anchor="middle">2</L>
            <L x="295" y="135" fill={C.teal} size={15} weight={700} anchor="middle">Fysikk</L>
            <rect x="235" y="155" width="120" height="150" rx="4" fill="#0f161c" />
            <text x="243" y="180" fill={C.fg} fontSize={11} fontFamily="inherit">Kjernemekanisme:</text>
            <text x="243" y="202" fill={C.muted} fontSize={10} fontFamily="inherit">• Clausius-Clapeyron</text>
            <text x="243" y="217" fill={C.teal} fontSize={10} fontFamily="inherit">  (+7 % fukt per °C)</text>
            <text x="243" y="237" fill={C.muted} fontSize={10} fontFamily="inherit">• Termisk ekspansjon</text>
            <text x="243" y="252" fill={C.muted} fontSize={10} fontFamily="inherit">• Jetstrøm-blokkering</text>
          </g>

          <Arrow d="M 370 185 L 385 185" marker={m.rain} color={C.rain} width={2.4} />

          {/* Steg 3 */}
          <g>
            <rect x="390" y="60" width="140" height="260" rx="8" fill="#18252f" stroke={C.rain} strokeWidth="1.4" />
            <circle cx="460" cy="95" r="18" fill="#162c38" stroke={C.rain} strokeWidth="1.5" />
            <L x="460" y="101" fill={C.rain} size={16} weight={700} anchor="middle">3</L>
            <L x="460" y="135" fill={C.rain} size={15} weight={700} anchor="middle">Tre nivåer</L>
            <rect x="400" y="155" width="120" height="150" rx="4" fill="#0f161c" />
            <text x="408" y="180" fill={C.fg} fontSize={11} fontFamily="inherit">Belys alle tre:</text>
            <text x="408" y="205" fill={C.sand} fontSize={11} fontFamily="inherit">1. Person / helse</text>
            <text x="408" y="235" fill={C.teal} fontSize={11} fontFamily="inherit">2. Kommune / vei</text>
            <text x="408" y="265" fill={C.rain} fontSize={11} fontFamily="inherit">3. Natur / økologi</text>
          </g>

          <Arrow d="M 535 185 L 550 185" marker={m.sand} color={C.sand} width={2.4} />

          {/* Steg 4 */}
          <g>
            <rect x="555" y="60" width="140" height="260" rx="8" fill="#18252f" stroke={C.sand} strokeWidth="1.4" />
            <circle cx="625" cy="95" r="18" fill="#2c2818" stroke={C.sand} strokeWidth="1.5" />
            <L x="625" y="101" fill={C.sand} size={16} weight={700} anchor="middle">4</L>
            <L x="625" y="135" fill={C.sand} size={15} weight={700} anchor="middle">To tiltak</L>
            <rect x="565" y="155" width="120" height="150" rx="4" fill="#0f161c" />
            <text x="573" y="180" fill={C.fg} fontSize={11} fontFamily="inherit">Avbøtende & vern:</text>
            <text x="573" y="202" fill={C.teal} fontSize={10} fontFamily="inherit">• Kutt i pådriv</text>
            <text x="573" y="217" fill={C.muted} fontSize={10} fontFamily="inherit">  (reduserer utslipp)</text>
            <text x="573" y="237" fill={C.sand} fontSize={10} fontFamily="inherit">• Tilpasningstiltak</text>
            <text x="573" y="252" fill={C.muted} fontSize={10} fontFamily="inherit">  (flomvern, grønt tak)</text>
          </g>

          <Arrow d="M 700 185 L 715 185" marker={m.low} color={C.low} width={2.4} />

          {/* Steg 5 */}
          <g>
            <rect x="720" y="60" width="140" height="260" rx="8" fill="#18252f" stroke={C.low} strokeWidth="1.4" />
            <circle cx="790" cy="95" r="18" fill="#381b1b" stroke={C.low} strokeWidth="1.5" />
            <L x="790" y="101" fill={C.low} size={16} weight={700} anchor="middle">5</L>
            <L x="790" y="135" fill={C.low} size={15} weight={700} anchor="middle">Begrensning</L>
            <rect x="730" y="155" width="120" height="150" rx="4" fill="#0f161c" />
            <text x="738" y="180" fill={C.fg} fontSize={11} fontFamily="inherit">Kritisk drøfting:</text>
            <text x="738" y="202" fill={C.low} fontSize={10} fontFamily="inherit">• Falsk trygghet bak</text>
            <text x="738" y="217" fill={C.muted} fontSize={10} fontFamily="inherit">  flomvoller</text>
            <text x="738" y="237" fill={C.low} fontSize={10} fontFamily="inherit">• Maltilpasning</text>
            <text x="738" y="252" fill={C.muted} fontSize={10} fontFamily="inherit">• Økonomi / fordeling</text>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function FieldworkInquiryChainDiagram() {
  return (
    <Diagram
      title="Den vitenskapelige forskningskjeden i geofeltarbeid: 5 ledd fra problemstilling til usikkerhetsanalyse"
      heading="Fra problemstilling til drøfting: den vitenskapelige feltkjeden"
      caption="Sensor og læreplanen krever en ubrutt rød tråd i feltarbeidet: en presis problemstilling, et målrettet undersøkelsesdesign med HMS, nøyaktige målinger med metadata, grundig databearbeiding, og en ærlig usikkerhetsanalyse."
      viewBox="0 0 900 360"
      wide
    >
      {(m) => (
        <>
          <rect x="40" y="30" width="820" height="300" rx="10" fill="#121b22" stroke={C.dim} strokeWidth="1.5" />

          {/* 5 kjedelenker */}
          {[
            { n: "1", t: "Problemstilling", d: "Avgrenset spørsmål og testbar hypotese", c: C.warm, x: 55 },
            { n: "2", t: "Design & HMS", d: "Valg av stasjoner, utstyr og sikkerhetsvurdering", c: C.sand, x: 215 },
            { n: "3", t: "Feltmåling", d: "Posisjon (GPS), tid, verdier og feltnotat", c: C.teal, x: 375 },
            { n: "4", t: "Analyse", d: "Grafer, kartfesting, statistikk og mønster", c: C.cold, x: 535 },
            { n: "5", t: "Usikkerhet", d: "Målefeil, representativitet og konklusjon", c: C.low, x: 695 },
          ].map((s, idx) => (
            <g key={s.n}>
              <rect x={s.x} y="60" width="145" height="230" rx="8" fill="#17242e" stroke={s.c} strokeWidth="1.4" />
              <circle cx={s.x + 72} cy="95" r="18" fill="#0f161c" stroke={s.c} strokeWidth="1.5" />
              <L x={s.x + 72} y="101" fill={s.c} size={16} weight={700} anchor="middle">{s.n}</L>
              <L x={s.x + 72} y="135" fill={s.c} size={14} weight={700} anchor="middle">{s.t}</L>
              <rect x={s.x + 10} y="155" width="125" height="120" rx="4" fill="#0f161c" />
              <text x={s.x + 18} y="185" fill={C.fg} fontSize={12} fontWeight="600" fontFamily="inherit">
                Fokus:
              </text>
              <text x={s.x + 18} y="208" fill={C.muted} fontSize={11} fontFamily="inherit" width="110">
                {s.d}
              </text>
              {idx < 4 && (
                <Arrow d={`M ${s.x + 148} 175 L ${s.x + 160} 175`} marker={m.teal} color={C.teal} width={2.2} />
              )}
            </g>
          ))}

          <L x="450" y="315" fill={C.muted} size={12} anchor="middle">
            Uten metadata og usikkerhetsvurdering kan ingen etterprøve eller stole på feltresultatene.
          </L>
        </>
      )}
    </Diagram>
  );
}
