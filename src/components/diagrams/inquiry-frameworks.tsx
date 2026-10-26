import { useId } from "react";
import { Arrow, C, Diagram, L } from "./svg-kit";

/** Bryter en kort tekst i linjer på maks `max` tegn (hele ord), for SVG-tspan. */
function wrapWords(text: string, max: number): string[] {
  const out: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      out.push(line);
      line = word;
    } else {
      line = line ? line + " " + word : word;
    }
  }
  if (line) out.push(line);
  return out;
}

export function SeaBreezeLandBreezeDiagram() {
  return (
    <Diagram
      title="Sjøbris om dagen og landbris om natten: termisk drevet lokal luftsirkulasjon"
      heading="Sjøbris og landbris: termisk kystsirkulasjon"
      caption="Havet har stor varmekapasitet, så land varmes og avkjøles raskere. Om dagen stiger varm luft over land, og sjøbris trekkes inn ved bakken. Returstrømmen går mot havet i høyden. Om natten snus kretsløpet, og landbrisen er som regel svakere."
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
            <L x="230" y="120" fill={C.muted} size={11} anchor="middle">Returstrøm i høyden (ofte 1–1,5 km)</L>

            {/* 3. Nedsynkning over hav */}
            <Arrow d="M 130 145 L 130 245" marker={m.cold} color={C.cold} width={2.4} />

            {/* 4. Sjøbrisen ved bakken (inn mot land) */}
            <Arrow d="M 150 260 L 290 260" marker={m.teal} color={C.teal} width={3.8} />
            <L x="220" y="285" fill={C.teal} size={14} weight={700} anchor="middle">Sjøbris (pålandsvind)</L>
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
            <L x="660" y="285" fill={C.sand} size={14} weight={700} anchor="middle">Landbris (som regel svakere)</L>
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
  const uid = useId().replace(/:/g, "");
  const shadow = `${uid}-il-shadow`;
  const glowW = `${uid}-il-gw`;
  const glowT = `${uid}-il-gt`;
  const glowR = `${uid}-il-gr`;
  return (
    <Diagram
      title="Klimakonsekvenser og tilpasning på tre nivåer: individ, samfunn og økosystem"
      heading="Klimapåvirkning på tre nivåer"
      caption="En fullgod drøfting av klimaendringer må belyse alle tre nivåer: individets helse og bolig, samfunnets infrastruktur og beredskap, og økosystemenes biologiske mangfold og artsgrenser."
      viewBox="0 0 1080 460"
      wide
    >
      {() => (
        <>
          <defs>
            <filter id={shadow} x="-8%" y="-6%" width="116%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <filter id={glowW} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={glowT} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={glowR} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Individ */}
          <g filter={`url(#${shadow})`}>
            <rect x="28" y="24" width="328" height="412" rx="14" fill="#141f27" stroke={C.warm} strokeWidth="1.6" />
            <rect x="28" y="24" width="328" height="5" rx="2.5" fill={C.warm} />
          </g>
          <g filter={`url(#${glowW})`}>
            <circle cx="70" cy="68" r="22" fill="#382c1e" stroke={C.warm} strokeWidth="1.7" />
            <L x="70" y="74" fill={C.warm} size={17} weight={800} anchor="middle">1</L>
          </g>
          <circle cx="118" cy="68" r="18" fill="#382c1e" stroke={C.warm} strokeWidth="1.4" />
          <circle cx="118" cy="60" r="6" fill={C.warm} />
          <path d="M105 84c2.5-11 23-11 26 0" fill={C.warm} />
          <L x="148" y="74" fill={C.warm} size={17} weight={800}>Individ og person</L>

          <rect x="46" y="104" width="292" height="218" rx="10" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <rect x="46" y="104" width="4" height="32" rx="2" fill={C.warm} />
          <L x="64" y="126" fill={C.fg} size={14} weight={700}>Helse og sårbarhet</L>
          <L x="64" y="152" fill={C.muted} size={12.5}>• Hetestress hos eldre og syke</L>
          <L x="64" y="174" fill={C.muted} size={12.5}>• Vektorbårne sykdommer (flått)</L>
          <line x1="64" y1="192" x2="320" y2="192" stroke={C.dim} strokeWidth="1" />
          <rect x="46" y="204" width="4" height="32" rx="2" fill={C.warm} opacity={0.75} />
          <L x="64" y="226" fill={C.fg} size={14} weight={700}>Privatøkonomi og bolig</L>
          <L x="64" y="252" fill={C.muted} size={12.5}>• Kjelleroversvømmelse (overvann)</L>
          <L x="64" y="274" fill={C.muted} size={12.5}>• Økte forsikringspremier i risikosoner</L>

          <rect x="46" y="340" width="292" height="76" rx="11" fill="#2a2118" stroke={C.warm} strokeWidth="1.3" />
          <L x="64" y="364" fill={C.warm} size={11} weight={800}>TILTAK</L>
          <rect x="64" y="376" width="78" height="24" rx="12" fill="#382c1e" stroke={C.warm} strokeWidth="1" />
          <L x="103" y="392" fill="#f3e6d4" size={11} weight={650} anchor="middle">Egenresiliens</L>
          <rect x="150" y="376" width="74" height="24" rx="12" fill="#382c1e" stroke={C.warm} strokeWidth="1" />
          <L x="187" y="392" fill="#f3e6d4" size={11} weight={650} anchor="middle">Tilfluktsrom</L>
          <rect x="232" y="376" width="86" height="24" rx="12" fill="#382c1e" stroke={C.warm} strokeWidth="1" />
          <L x="275" y="392" fill="#f3e6d4" size={11} weight={650} anchor="middle">Solskjerming</L>

          {/* 2. Samfunn */}
          <g filter={`url(#${shadow})`}>
            <rect x="376" y="24" width="328" height="412" rx="14" fill="#141f27" stroke={C.teal} strokeWidth="1.6" />
            <rect x="376" y="24" width="328" height="5" rx="2.5" fill={C.teal} />
          </g>
          <g filter={`url(#${glowT})`}>
            <circle cx="418" cy="68" r="22" fill="#183338" stroke={C.teal} strokeWidth="1.7" />
            <L x="418" y="74" fill={C.teal} size={17} weight={800} anchor="middle">2</L>
          </g>
          <circle cx="466" cy="68" r="18" fill="#183338" stroke={C.teal} strokeWidth="1.4" />
          <rect x="455" y="65" width="6" height="13" rx="1" fill={C.teal} />
          <rect x="463" y="58" width="8" height="20" rx="1" fill={C.teal} />
          <rect x="473" y="62" width="6" height="16" rx="1" fill={C.teal} />
          <L x="496" y="74" fill={C.teal} size={17} weight={800}>Samfunn</L>

          <rect x="394" y="104" width="292" height="218" rx="10" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <rect x="394" y="104" width="4" height="32" rx="2" fill={C.teal} />
          <L x="412" y="126" fill={C.fg} size={14} weight={700}>Kritisk infrastruktur</L>
          <L x="412" y="152" fill={C.muted} size={12.5}>• Vei og jernbane stengt av skred/flom</L>
          <L x="412" y="174" fill={C.muted} size={12.5}>• Stormflo mot kysthavner og kaier</L>
          <line x1="412" y1="192" x2="668" y2="192" stroke={C.dim} strokeWidth="1" />
          <rect x="394" y="204" width="4" height="32" rx="2" fill={C.teal} opacity={0.75} />
          <L x="412" y="226" fill={C.fg} size={14} weight={700}>Kommune og beredskap</L>
          <L x="412" y="252" fill={C.muted} size={12.5}>• Overvannshåndtering og flomveier</L>
          <L x="412" y="274" fill={C.muted} size={12.5}>• Drikkevannssikkerhet og strømbrudd</L>

          <rect x="394" y="340" width="292" height="76" rx="11" fill="#15282c" stroke={C.teal} strokeWidth="1.3" />
          <L x="412" y="364" fill={C.teal} size={11} weight={800}>TILTAK</L>
          <rect x="412" y="376" width="96" height="24" rx="12" fill="#183338" stroke={C.teal} strokeWidth="1" />
          <L x="460" y="392" fill="#d7faf5" size={11} weight={650} anchor="middle">Arealplanlegging</L>
          <rect x="516" y="376" width="68" height="24" rx="12" fill="#183338" stroke={C.teal} strokeWidth="1" />
          <L x="550" y="392" fill="#d7faf5" size={11} weight={650} anchor="middle">Flomvern</L>
          <rect x="592" y="376" width="74" height="24" rx="12" fill="#183338" stroke={C.teal} strokeWidth="1" />
          <L x="629" y="392" fill="#d7faf5" size={11} weight={650} anchor="middle">ROS-analyse</L>

          {/* 3. Økosystem */}
          <g filter={`url(#${shadow})`}>
            <rect x="724" y="24" width="328" height="412" rx="14" fill="#141f27" stroke={C.rain} strokeWidth="1.6" />
            <rect x="724" y="24" width="328" height="5" rx="2.5" fill={C.rain} />
          </g>
          <g filter={`url(#${glowR})`}>
            <circle cx="766" cy="68" r="22" fill="#192d35" stroke={C.rain} strokeWidth="1.7" />
            <L x="766" y="74" fill={C.rain} size={17} weight={800} anchor="middle">3</L>
          </g>
          <circle cx="814" cy="68" r="18" fill="#192d35" stroke={C.rain} strokeWidth="1.4" />
          <path d="M814 80c0-8 0-14 0-20" stroke={C.rain} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M814 64c-9-7 -10-1 -1 6c4 3 7 1 8-1" fill={C.rain} />
          <path d="M814 68c7-5 10-1 3 4c-3 2-6 1-7 0" fill={C.cold} opacity={0.85} />
          <L x="844" y="74" fill={C.rain} size={17} weight={800}>Økosystem</L>

          <rect x="742" y="104" width="292" height="218" rx="10" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <rect x="742" y="104" width="4" height="32" rx="2" fill={C.rain} />
          <L x="760" y="126" fill={C.fg} size={14} weight={700}>Biologisk mangfold</L>
          <L x="760" y="152" fill={C.muted} size={12.5}>• Torsken og lodda trekker nordover</L>
          <L x="760" y="174" fill={C.muted} size={12.5}>• Tregrensen kryper oppover i fjellet</L>
          <line x1="760" y1="192" x2="1016" y2="192" stroke={C.dim} strokeWidth="1" />
          <rect x="742" y="204" width="4" height="32" rx="2" fill={C.rain} opacity={0.75} />
          <L x="760" y="226" fill={C.fg} size={14} weight={700}>Hav og ferskvann</L>
          <L x="760" y="252" fill={C.muted} size={12.5}>• Havforsuring truer kalkdannende arter</L>
          <L x="760" y="274" fill={C.muted} size={12.5}>• Endret issmelting gir varmere elver</L>

          <rect x="742" y="340" width="292" height="76" rx="11" fill="#152830" stroke={C.rain} strokeWidth="1.3" />
          <L x="760" y="364" fill={C.rain} size={11} weight={800}>TILTAK</L>
          <rect x="760" y="376" width="112" height="24" rx="12" fill="#192d35" stroke={C.rain} strokeWidth="1" />
          <L x="816" y="392" fill="#e0f2fe" size={11} weight={650} anchor="middle">Naturrestaurering</L>
          <rect x="880" y="376" width="134" height="24" rx="12" fill="#192d35" stroke={C.rain} strokeWidth="1" />
          <L x="947" y="392" fill="#e0f2fe" size={11} weight={650} anchor="middle">Vern av korridorer</L>
        </>
      )}
    </Diagram>
  );
}

export function AdaptationExamFrameworkDiagram() {
  const uid = useId().replace(/:/g, "");
  const shadow = `${uid}-ex-shadow`;
  const glow = `${uid}-ex-glow`;
  const arrGlow = `${uid}-ex-arr`;
  return (
    <Diagram
      title="Eksamensdrøfting i klimatilpasning: 5-stegs modell fra naturfenomen til tiltak og begrensninger"
      heading="5-stegs modell for eksamensdrøfting"
      caption="En fullverdig drøfting i Geofag 2 følger denne strukturen: Knytt naturfenomenet til den underliggende fysikken, belys konsekvensene på alle tre nivåer, sammenlign utslippskutt med tilpasning, og drøft begrensninger eller utilsiktede virkninger."
      viewBox="0 0 1200 470"
      wide
    >
      {(m) => (
        <>
          <defs>
            <filter id={shadow} x="-10%" y="-6%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={arrGlow} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="1.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Steg 1 Fenomen */}
          <g filter={`url(#${shadow})`}>
            <rect x="24" y="24" width="196" height="422" rx="12" fill="#141f27" stroke={C.warm} strokeWidth="1.5" />
            <rect x="24" y="24" width="196" height="4" rx="2" fill={C.warm} />
          </g>
          <g filter={`url(#${glow})`}>
            <circle cx="122" cy="68" r="20" fill="#382c1e" stroke={C.warm} strokeWidth="1.6" />
            <L x="122" y="74" fill={C.warm} size={16} weight={800} anchor="middle">1</L>
          </g>
          <L x="122" y="108" fill={C.warm} size={15} weight={800} anchor="middle">Fenomen</L>
          <rect x="40" y="124" width="164" height="300" rx="9" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <L x="52" y="150" fill={C.fg} size={12} weight={700}>Velg ett konkret:</L>
          <rect x="52" y="164" width="140" height="34" rx="8" fill="#1a1612" stroke="#3a2e22" strokeWidth="1" />
          <L x="122" y="186" fill={C.fg} size={12} weight={600} anchor="middle">Styrtregn i by</L>
          <rect x="52" y="206" width="140" height="34" rx="8" fill="#1a1612" stroke="#3a2e22" strokeWidth="1" />
          <L x="122" y="228" fill={C.muted} size={12} weight={600} anchor="middle">Flom i vassdrag</L>
          <rect x="52" y="248" width="140" height="34" rx="8" fill="#1a1612" stroke="#3a2e22" strokeWidth="1" />
          <L x="122" y="270" fill={C.muted} size={12} weight={600} anchor="middle">Stormflo / havnivå</L>
          <rect x="52" y="290" width="140" height="34" rx="8" fill="#1a1612" stroke="#3a2e22" strokeWidth="1" />
          <L x="122" y="312" fill={C.muted} size={12} weight={600} anchor="middle">Hetebølge / tørke</L>

          <g filter={`url(#${arrGlow})`}>
            <Arrow d="M 228 230 L 250 230" marker={m.warm} color={C.warm} width={3} />
          </g>

          {/* Steg 2 Fysikk */}
          <g filter={`url(#${shadow})`}>
            <rect x="260" y="24" width="196" height="422" rx="12" fill="#141f27" stroke={C.teal} strokeWidth="1.5" />
            <rect x="260" y="24" width="196" height="4" rx="2" fill={C.teal} />
          </g>
          <g filter={`url(#${glow})`}>
            <circle cx="358" cy="68" r="20" fill="#183338" stroke={C.teal} strokeWidth="1.6" />
            <L x="358" y="74" fill={C.teal} size={16} weight={800} anchor="middle">2</L>
          </g>
          <L x="358" y="108" fill={C.teal} size={15} weight={800} anchor="middle">Fysikk</L>
          <rect x="276" y="124" width="164" height="300" rx="9" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <L x="288" y="150" fill={C.fg} size={12} weight={700}>Kjernemekanisme:</L>
          <rect x="288" y="164" width="140" height="56" rx="8" fill="#183338" stroke={C.teal} strokeWidth="1.2" />
          <L x="358" y="188" fill={C.fg} size={12} weight={700} anchor="middle">Clausius-Clapeyron</L>
          <L x="358" y="208" fill={C.teal} size={12} weight={800} anchor="middle">+7 % fukt per °C</L>
          <rect x="288" y="232" width="140" height="34" rx="8" fill="#0f1c22" stroke="#1e3a40" strokeWidth="1" />
          <L x="358" y="254" fill={C.muted} size={12} weight={600} anchor="middle">Termisk ekspansjon</L>
          <rect x="288" y="274" width="140" height="34" rx="8" fill="#0f1c22" stroke="#1e3a40" strokeWidth="1" />
          <L x="358" y="296" fill={C.muted} size={12} weight={600} anchor="middle">Jetstrøm-blokkering</L>

          <g filter={`url(#${arrGlow})`}>
            <Arrow d="M 464 230 L 486 230" marker={m.teal} color={C.teal} width={3} />
          </g>

          {/* Steg 3 Tre nivåer */}
          <g filter={`url(#${shadow})`}>
            <rect x="496" y="24" width="196" height="422" rx="12" fill="#141f27" stroke={C.rain} strokeWidth="1.5" />
            <rect x="496" y="24" width="196" height="4" rx="2" fill={C.rain} />
          </g>
          <g filter={`url(#${glow})`}>
            <circle cx="594" cy="68" r="20" fill="#192d35" stroke={C.rain} strokeWidth="1.6" />
            <L x="594" y="74" fill={C.rain} size={16} weight={800} anchor="middle">3</L>
          </g>
          <L x="594" y="108" fill={C.rain} size={15} weight={800} anchor="middle">Tre nivåer</L>
          <rect x="512" y="124" width="164" height="300" rx="9" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <L x="524" y="150" fill={C.fg} size={12} weight={700}>Belys alle tre:</L>
          {/* person */}
          <rect x="524" y="164" width="140" height="46" rx="9" fill="#1a1612" stroke={C.warm} strokeWidth="1.2" />
          <circle cx="544" cy="187" r="11" fill="#382c1e" stroke={C.warm} strokeWidth="1" />
          <circle cx="544" cy="182" r="3.5" fill={C.warm} />
          <path d="M537 196c1.5-6 12-6 14 0" fill={C.warm} />
          <L x="562" y="192" fill={C.warm} size={12} weight={700}>Person / helse</L>
          {/* by */}
          <rect x="524" y="220" width="140" height="46" rx="9" fill="#183338" stroke={C.teal} strokeWidth="1.2" />
          <circle cx="544" cy="243" r="11" fill="#0f1c22" stroke={C.teal} strokeWidth="1" />
          <rect x="538" y="241" width="4" height="8" rx="0.5" fill={C.teal} />
          <rect x="543" y="237" width="5" height="12" rx="0.5" fill={C.teal} />
          <rect x="549" y="239" width="4" height="10" rx="0.5" fill={C.teal} />
          <L x="562" y="248" fill={C.teal} size={12} weight={700}>Kommune / vei</L>
          {/* natur */}
          <rect x="524" y="276" width="140" height="46" rx="9" fill="#192d35" stroke={C.rain} strokeWidth="1.2" />
          <circle cx="544" cy="299" r="11" fill="#0f161c" stroke={C.rain} strokeWidth="1" />
          <path d="M544 307c0-5 0-9 0-12" stroke={C.rain} strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M544 296c-5-4 -6-1 -1 3.5c2.5 1.5 4 1 5-0.5" fill={C.rain} />
          <L x="562" y="304" fill={C.rain} size={12} weight={700}>Natur / økologi</L>

          <g filter={`url(#${arrGlow})`}>
            <Arrow d="M 700 230 L 722 230" marker={m.rain} color={C.rain} width={3} />
          </g>

          {/* Steg 4 To tiltak */}
          <g filter={`url(#${shadow})`}>
            <rect x="732" y="24" width="196" height="422" rx="12" fill="#141f27" stroke={C.sand} strokeWidth="1.5" />
            <rect x="732" y="24" width="196" height="4" rx="2" fill={C.sand} />
          </g>
          <g filter={`url(#${glow})`}>
            <circle cx="830" cy="68" r="20" fill="#2c2818" stroke={C.sand} strokeWidth="1.6" />
            <L x="830" y="74" fill={C.sand} size={16} weight={800} anchor="middle">4</L>
          </g>
          <L x="830" y="108" fill={C.sand} size={15} weight={800} anchor="middle">To tiltak</L>
          <rect x="748" y="124" width="164" height="300" rx="9" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <L x="760" y="150" fill={C.fg} size={12} weight={700}>Avbøtende og vern:</L>
          <rect x="760" y="164" width="140" height="68" rx="9" fill="#183338" stroke={C.teal} strokeWidth="1.2" />
          <L x="830" y="192" fill={C.teal} size={12.5} weight={800} anchor="middle">Kutt i pådriv</L>
          <L x="830" y="214" fill={C.muted} size={11.5} weight={600} anchor="middle">reduserer utslipp</L>
          <rect x="760" y="244" width="140" height="68" rx="9" fill="#2a2418" stroke={C.sand} strokeWidth="1.2" />
          <L x="830" y="272" fill={C.sand} size={12.5} weight={800} anchor="middle">Tilpasningstiltak</L>
          <L x="830" y="294" fill={C.muted} size={11.5} weight={600} anchor="middle">flomvern, grønt tak</L>

          <g filter={`url(#${arrGlow})`}>
            <Arrow d="M 936 230 L 958 230" marker={m.sand} color={C.sand} width={3} />
          </g>

          {/* Steg 5 Begrensning */}
          <g filter={`url(#${shadow})`}>
            <rect x="968" y="24" width="208" height="422" rx="12" fill="#141f27" stroke={C.low} strokeWidth="1.5" />
            <rect x="968" y="24" width="208" height="4" rx="2" fill={C.low} />
          </g>
          <g filter={`url(#${glow})`}>
            <circle cx="1072" cy="68" r="20" fill="#381b1b" stroke={C.low} strokeWidth="1.6" />
            <L x="1072" y="74" fill={C.low} size={16} weight={800} anchor="middle">5</L>
          </g>
          <L x="1072" y="108" fill={C.low} size={15} weight={800} anchor="middle">Begrensning</L>
          <rect x="984" y="124" width="176" height="300" rx="9" fill="#0f161c" stroke={C.dim} strokeWidth="1" />
          <L x="996" y="150" fill={C.fg} size={12} weight={700}>Kritisk drøfting:</L>
          <rect x="996" y="164" width="152" height="52" rx="8" fill="#2a1520" stroke={C.low} strokeWidth="1.2" />
          <L x="1072" y="186" fill={C.low} size={12} weight={800} anchor="middle">Falsk trygghet</L>
          <L x="1072" y="204" fill={C.muted} size={11.5} weight={600} anchor="middle">bak flomvoller</L>
          <rect x="996" y="228" width="152" height="38" rx="8" fill="#2a1520" stroke={C.low} strokeWidth="1.2" />
          <L x="1072" y="252" fill={C.low} size={12.5} weight={800} anchor="middle">Maltilpasning</L>
          <rect x="996" y="278" width="152" height="38" rx="8" fill="#1a1218" stroke="#3a2a32" strokeWidth="1" />
          <L x="1072" y="302" fill={C.muted} size={12} weight={600} anchor="middle">Økonomi / fordeling</L>
        </>
      )}
    </Diagram>
  );
}

export function FieldworkInquiryChainDiagram() {
  return (
    <Diagram
      title="Kjeden i et feltarbeid: fra problemstilling til presentasjon"
      heading="Fra problemstilling til presentasjon"
      caption="Et feltarbeid følger en kjede: problemstilling og hypotese, planlegging med HMS, georefererte målinger, bearbeiding og tolkning med usikkerhet, og presentasjon."
      viewBox="0 0 900 360"
      wide
    >
      {(m) => (
        <>
          <rect x="40" y="30" width="820" height="300" rx="10" fill="#121b22" stroke={C.dim} strokeWidth="1.5" />

          {/* 5 kjedelenker */}
          {[
            { n: "1", t: "Problemstilling", d: "Avgrenset spørsmål og testbar hypotese", c: C.warm, x: 55 },
            { n: "2", t: "Planlegging og HMS", d: "Valg av stasjoner, utstyr og risikovurdering", c: C.sand, x: 215 },
            { n: "3", t: "Georefererte målinger", d: "Posisjon (GPS), tid, verdier og feltnotat", c: C.teal, x: 375 },
            { n: "4", t: "Bearbeiding og tolkning", d: "Grafer, kart, usikkerhet og mønster", c: C.cold, x: 535 },
            { n: "5", t: "Presentasjon", d: "Resultater, usikkerhet og konklusjon", c: C.low, x: 695 },
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
              <text x={s.x + 18} y="208" fill={C.muted} fontSize={11} fontFamily="inherit">
                {wrapWords(s.d, 19).map((line, li, all) => (
                  <tspan key={li} x={s.x + 18} dy={li === 0 ? 0 : 15}>
                    {li < all.length - 1 ? `${line} ` : line}
                  </tspan>
                ))}
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

export function RadiosondeAscentDiagram() {
  return (
    <Diagram
      title="Radiosonde og aerologisk profil: Vertikal sondering fra bakken til stratosfæren"
      heading="Radiosonde og atmosfærisk profil: Værballongens oppstigning"
      caption="Radiosonden er meteorologiens vertikale måleverktøy. En ballong med hydrogen eller helium stiger til den sprekker, opptil ca. 30 km over havet. Underveis måler den temperatur, lufttrykk og relativ fuktighet, og sondens drift sidelengs viser vinden. Dataene plottes i et aerologisk diagram som avslører bakkeinversjoner, skybaser, skytopper og tropopausen."
      viewBox="0 0 940 440"
      wide
    >
      {(m) => (
        <>
          {/* Skillelinje */}
          <line x1="470" y1="35" x2="470" y2="405" stroke={C.dim} strokeDasharray="4 4" />

          {/* --- VENSTRE: BALLONG OG SONDE-SYSTEM --- */}
          <rect x="30" y="30" width="420" height="380" rx="8" fill="#0d1b2a" stroke={C.dim} strokeWidth="1.2" />
          <L x="240" y="58" fill={C.fg} size={15} weight={700} anchor="middle">
            Radiosondesystemet i oppstigning
          </L>
          <L x="240" y="78" fill={C.muted} size={11} anchor="middle">
            Måler trykk, temperatur, fuktighet og vind opp til 35 000 m
          </L>

          {/* Latex-ballong */}
          <circle cx="170" cy="140" r="45" fill="#f8fafc" opacity="0.9" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 170 185 L 165 195 L 175 195 Z" fill="#cbd5e1" />
          <L x="170" y="145" fill="#0f172a" size={11} weight={800} anchor="middle">HELIUM</L>

          {/* Snøre og fallskjerm */}
          <line x1="170" y1="195" x2="170" y2="230" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Liten fallskjerm */}
          <path d="M 155 235 Q 170 220 185 235 Z" fill="#ef4444" />
          <line x1="155" y1="235" x2="170" y2="260" stroke="#94a3b8" strokeWidth="1" />
          <line x1="185" y1="235" x2="170" y2="260" stroke="#94a3b8" strokeWidth="1" />

          {/* Radiosonde måleinstrumentboks */}
          <rect x="155" y="260" width="30" height="42" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="170" cy="275" r="3" fill="#f59e0b" className="animate-ping" />
          {/* Antenne */}
          <line x1="170" y1="302" x2="170" y2="330" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Sensorbom */}
          <line x1="185" y1="268" x2="205" y2="260" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="205" cy="260" r="2.5" fill="#ef4444" />

          {/* Sensorforklaringer */}
          <rect x="235" y="110" width="195" height="230" rx="6" fill="#142230" stroke="#334155" />
          <L x="250" y="132" fill="#38bdf8" size={12} weight={700}>Instrumentering:</L>
          <L x="250" y="155" fill={C.fg} size={11}>• Termistor: Lufttemp (±0,1 °C)</L>
          <L x="250" y="178" fill={C.fg} size={11}>• Kapasitiv hygrometer: Relativ fukt</L>
          <L x="250" y="201" fill={C.fg} size={11}>• Piezoresistiv: Lufttrykk i hPa</L>
          <L x="250" y="224" fill={C.fg} size={11}>• GPS-mottaker: Vindstyrke &amp; retning</L>
          <L x="250" y="247" fill={C.fg} size={11}>• 400 MHz radiosender: Telemetri</L>
          <line x1="245" y1="265" x2="420" y2="265" stroke="#334155" />
          <L x="250" y="285" fill="#fde68a" size={10} weight={600}>WMO Standard:</L>
          <L x="250" y="303" fill={C.muted} size={10}>Slippes globalt kl. 00 og 12 UTC</L>
          <L x="250" y="321" fill={C.muted} size={10}>Norge: Sola, Ørland, Bodø, Jan Mayen</L>

          {/* Radiosignal-bølger ned mot bakkestasjon */}
          <path d="M 155 330 Q 120 350 80 370" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <L x="100" y="380" fill="#38bdf8" size={10}>403 MHz radiosignal</L>

          {/* --- HØYRE: AEROLOGISK DIAGRAM (SKEW-T STYLE) --- */}
          <rect x="490" y="30" width="420" height="380" rx="8" fill="#111c26" stroke="#38bdf8" strokeWidth="1.2" />
          <L x="700" y="58" fill="#38bdf8" size={15} weight={700} anchor="middle">
            Aerologisk profil (Temperatur mot høyde)
          </L>
          <L x="700" y="78" fill={C.muted} size={11} anchor="middle">
            Temperatur T (rød) og duggpunkt T_d (blå)
          </L>

          {/* Høydeakse (0 til 14 km -> y: 350 til 100) */}
          <line x1="550" y1="350" x2="550" y2="100" stroke={C.dim} strokeWidth="1.5" />
          <L x="545" y="105" fill={C.muted} size={9} anchor="end">12 km (Tropopause)</L>
          <L x="545" y="170" fill={C.muted} size={9} anchor="end">8 km (350 hPa)</L>
          <L x="545" y="240" fill={C.muted} size={9} anchor="end">4 km (600 hPa)</L>
          <L x="545" y="315" fill={C.muted} size={9} anchor="end">1 km (900 hPa)</L>
          <L x="545" y="348" fill={C.muted} size={9} anchor="end">0 km (1013 hPa)</L>

          {/* Temperaturakse på bunnen (-60 °C til +20 °C) */}
          <line x1="550" y1="350" x2="880" y2="350" stroke={C.dim} strokeWidth="1.5" />
          <L x="580" y="365" fill={C.muted} size={9}>-60 °C</L>
          <L x="680" y="365" fill={C.muted} size={9}>-20 °C</L>
          <L x="780" y="365" fill={C.muted} size={9}>0 °C</L>
          <L x="860" y="365" fill={C.muted} size={9}>+15 °C</L>

          {/* Bakkeinversjon i de nederste 500 m */}
          {/* T(z): 0m= -10°C (x=730), 500m= -2°C (x=770), 11km= -58°C (x=590), stratosfære= flat/varmere */}
          <polyline
            points="730,348 770,325 710,240 640,160 590,115 590,95"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <L x="780" y="325" fill="#f87171" size={10} weight={700}>Bakkeinversjon!</L>

          {/* Duggpunktskurve T_d(z) i blått */}
          {/* Møter T(z) mellom 1500m og 4000m (Skydekke!) */}
          <polyline
            points="700,348 720,325 690,290 640,240 580,180 540,115"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />

          {/* Sky-område der T og T_d møtes (1500–4000 m) */}
          <rect x="560" y="240" width="310" height="50" fill="#38bdf8" opacity="0.12" rx="4" />
          <L x="760" y="268" fill="#7dd3fc" size={11} weight={600} anchor="middle">
            SKYLAG: T = T_d (100 % relativ fuktighet)
          </L>

          {/* Tropopause linje */}
          <line x1="550" y1="115" x2="880" y2="115" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <L x="760" y="110" fill="#fbbf24" size={10} weight={700} anchor="middle">
            TROPOPAUSE (-58 °C) · Taket for været
          </L>
          <L x="760" y="90" fill="#94a3b8" size={9} anchor="middle">
            Stratosfæren over: Temperatur slutter å falle
          </L>
        </>
      )}
    </Diagram>
  );
}

export function MeteorologicalStationDiagram() {
  return (
    <Diagram
      title="Automatisk meteorologisk bakkestasjon (AWS): WMO-standarder og sensorplassering"
      heading="Den automatiske værstasjonen (AWS): Standarder som sikrer nøyaktighet"
      caption="For at værdata skal kunne sammenlignes på tvers av landegrenser, har Verdens meteorologiorganisasjon (WMO) faste regler for sensorplassering, slik at målingene kan sammenlignes. Vind måles 10 meter over bakken for å unngå bakkefriksjon. Lufttemperatur og relativ fuktighet måles 1,25–2 meter over bakken i en hvit, ventilert lamellskjerm (strålingsskjerm) som beskytter sensorene mot direkte solstråling og nedbør. Nedbørsmålere utstyres med vindskjerm for å motvirke vindturbulens."
      viewBox="0 0 920 440"
      wide
    >
      {(m) => (
        <>
          {/* Terreng og gressbakke */}
          <rect x="30" y="30" width="860" height="340" fill="#0d1822" />
          <rect x="30" y="370" width="860" height="40" fill="#1b2820" />
          <line x1="30" y1="370" x2="890" y2="370" stroke="#34d399" strokeWidth="1.5" />
          <L x="60" y="392" fill="#6ee7b7" size={11}>Kortklippet gressunderlag (WMO-standard)</L>

          {/* --- 1. VINDMAST (10 METER) TIL VENSTRE --- */}
          {/* Fagverksmast */}
          <line x1="180" y1="370" x2="180" y2="90" stroke="#94a3b8" strokeWidth="4" />
          <line x1="160" y1="370" x2="180" y2="280" stroke="#64748b" strokeWidth="1.5" />
          <line x1="200" y1="370" x2="180" y2="280" stroke="#64748b" strokeWidth="1.5" />
          <line x1="165" y1="280" x2="180" y2="180" stroke="#64748b" strokeWidth="1.5" />
          <line x1="195" y1="280" x2="180" y2="180" stroke="#64748b" strokeWidth="1.5" />

          {/* Vindmåler på toppen (10 m) */}
          <line x1="150" y1="90" x2="210" y2="90" stroke="#cbd5e1" strokeWidth="2" />
          {/* Koppanemometer venstre */}
          <circle cx="160" cy="80" r="5" fill="#f59e0b" />
          <line x1="160" y1="90" x2="160" y2="80" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Vindfløy høyre */}
          <polygon points="200,82 215,80 200,78 203,80" fill="#38bdf8" />
          <line x1="200" y1="90" x2="200" y2="80" stroke="#38bdf8" strokeWidth="1.5" />

          <rect x="70" y="50" width="220" height="34" rx="4" fill="#1e293b" stroke="#f59e0b" />
          <L x="180" y="65" fill="#fbbf24" size={11} weight={700} anchor="middle">
            Vindhastighet &amp; retning: 10 meter
          </L>
          <L x="180" y="78" fill={C.muted} size={9} anchor="middle">
            Unngår friksjon og lokal terrengturbulens
          </L>

          {/* --- 2. LAMELLSKJERM / STEVENSON-SKJERM (2 METER) MIDTEN --- */}
          {/* Stativben */}
          <line x1="450" y1="370" x2="470" y2="290" stroke="#94a3b8" strokeWidth="2" />
          <line x1="510" y1="370" x2="490" y2="290" stroke="#94a3b8" strokeWidth="2" />
          {/* Den hvite kassa */}
          <rect x="455" y="240" width="50" height="50" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* Sjalusier / lameller */}
          <line x1="460" y1="250" x2="500" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="460" y1="260" x2="500" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="460" y1="270" x2="500" y2="270" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="460" y1="280" x2="500" y2="280" stroke="#94a3b8" strokeWidth="1.5" />

          <rect x="365" y="185" width="230" height="46" rx="6" fill="#1e293b" stroke="#38bdf8" />
          <L x="480" y="202" fill="#38bdf8" size={11} weight={700} anchor="middle">
            Lamellskjerm (1,25–2 meter over bakken)
          </L>
          <L x="480" y="216" fill={C.fg} size={10} anchor="middle">
            • PT100 Termistor (Temperatur)
          </L>
          <L x="480" y="227" fill={C.fg} size={10} anchor="middle">
            • Hygrometer (Relativ fuktighet %)
          </L>
          <L x="480" y="305" fill="#fde68a" size={9} anchor="middle">
            Hvit farge reflekterer solstråling · Lameller lufter
          </L>

          {/* --- 3. NEDBØRSMÅLER MED NIPHER-SKJERM (HØYRE) --- */}
          <line x1="720" y1="370" x2="720" y2="290" stroke="#64748b" strokeWidth="3" />
          {/* Nipher-traktformet vindskjerm */}
          <polygon points="695,270 745,270 735,290 705,290" fill="#475569" stroke="#94a3b8" />
          <rect x="712" y="285" width="16" height="25" fill="#334155" />

          <rect x="635" y="210" width="220" height="42" rx="6" fill="#1e293b" stroke="#34d399" />
          <L x="745" y="228" fill="#34d399" size={11} weight={700} anchor="middle">
            Nedbørsmåler (1,5–2 meter)
          </L>
          <L x="745" y="244" fill={C.muted} size={9} anchor="middle">
            Vindskjerm hindrer at vind feier snø forbi
          </L>

          {/* --- 4. DATALOGGER & SOLCELLEPANEL --- */}
          <rect x="420" y="325" width="25" height="35" rx="3" fill="#334155" stroke="#f59e0b" />
          <L x="405" y="345" fill="#fbbf24" size={9} anchor="end">Datalogger &amp; 4G</L>

          {/* --- 5. JORDTERMOMETRE I BAKKEN --- */}
          <line x1="570" y1="370" x2="570" y2="405" stroke="#ef4444" strokeWidth="2" />
          <circle cx="570" cy="380" r="3" fill="#ef4444" />
          <circle cx="570" cy="390" r="3" fill="#ef4444" />
          <circle cx="570" cy="405" r="3" fill="#ef4444" />
          <L x="585" y="392" fill="#fca5a5" size={10}>Jordtemperatur (10, 20, 50 cm)</L>
        </>
      )}
    </Diagram>
  );
}

