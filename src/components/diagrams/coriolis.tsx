import { useId } from "react";
import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. CarouselFrameDiagram
 * Sammenligning av treghetssystem (rommet) og roterende referansesystem (på karusellen).
 * Viser at en kule som kastes i rett linje i rommet, bøyes av til høyre sett fra
 * observatøren på den mot-klokken-roterende karusellen.
 * Animerte kuler og rotasjonselementer via SVG-animasjoner.
 */
export function CarouselFrameDiagram() {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram
      title="Referanserammer og treghetskrefter: Karusell-eksperimentet"
      heading="Hvorfor oppstår Corioliseffekten? Rommet vs. Den roterende observatøren"
      caption="Corioliskraften er en fiktiv kraft (treghetskraft) som oppstår fordi vi observerer bevegelse fra et roterende referansesystem. Til venstre (Treghetssystem / Rommet): Karusellen roterer mot klokken (akkurat som jordens nordlige halvkule). En person i sentrum (A) kaster en ball rett mot en person på kanten (B). I rommet beveger ballen seg i en snorrett linje i henhold til Newtons 1. lov. Men mens ballen er i luften, har person B rotert videre mot venstre! Til høyre (Roterende referansesystem / På karusellen): For personene som står på karusellen og føler seg i ro, ser det ut som om ballen på mystisk vis krummer til høyre og bommer på målet. Ingen fysisk hånd dyttet på ballen; avbøyningen er en ren konsekvens av observatørens egen rotasjon."
      viewBox="0 0 920 420"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Gradient for venstre karusellskive (Inertial / Rommet) */}
            <radialGradient id={`${uid}-disk-inertial`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Gradient for høyre karusellskive (Roterende) */}
            <radialGradient id={`${uid}-disk-rot`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#132a2f" />
              <stop offset="70%" stopColor="#0c1d22" />
              <stop offset="100%" stopColor="#040e11" />
            </radialGradient>

            {/* Sti for ball i inertialramme (rett linje fra sentrum mot toppen) */}
            <path id={`${uid}-path-straight`} d="M 230 220 L 230 75" />

            {/* Sti for ball i roterende ramme (bøyer mot høyre) */}
            <path id={`${uid}-path-curved`} d="M 690 220 Q 690 140 780 115" />
          </defs>

          {/* SKILLEDELING MELLOM DE TO VISNINGENE */}
          <line x1="460" y1="30" x2="460" y2="390" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* ─── VENSTRE PANEL: TREGHETSSYSTEM (ROMMET) ─── */}
          <g>
            <L x="230" y="45" fill={C.fg} size={15} weight={800} anchor="middle">
              1. Treghetssystem (Sett fra rommet)
            </L>
            <L x="230" y="65" fill={C.muted} size={12} anchor="middle">
              Utenforstående observatør · Newtons 1. lov gjelder
            </L>

            {/* Roterende skive */}
            <circle cx="230" cy="220" r="145" fill={`url(#${uid}-disk-inertial)`} stroke="#475569" strokeWidth="2.5" />

            {/* Roterende markører på skiven */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 230 220"
                to="-360 230 220"
                dur="8s"
                repeatCount="indefinite"
              />
              {/* Eiker */}
              <line x1="230" y1="75" x2="230" y2="365" stroke="#334155" strokeWidth="1.2" strokeDasharray="4 4" />
              <line x1="85" y1="220" x2="375" y2="220" stroke="#334155" strokeWidth="1.2" strokeDasharray="4 4" />

              {/* Målbryter B som roterer mot venstre (mot klokken) */}
              <circle cx="230" cy="85" r="11" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
              <text x="230" y="89" fill="#0f172a" fontSize="10" fontWeight="900" textAnchor="middle">B</text>
              <text x="230" y="68" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">Mål (B)</text>
            </g>

            {/* Rotasjonspil mot klokken rundt kanten */}
            <path
              d="M 390 200 A 165 165 0 0 0 250 58"
              fill="none"
              stroke="#64748b"
              strokeWidth="2.2"
              markerEnd={`url(#${m.muted})`}
            />
            <L x="350" y="110" fill={C.muted} size={11} weight={700}>
              Rotasjon mot klokken
            </L>

            {/* Kaster A i sentrum */}
            <circle cx="230" cy="220" r="13" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.2" />
            <text x="230" y="224" fill="#0f172a" fontSize="11" fontWeight="900" textAnchor="middle">A</text>
            <L x="230" y="248" fill="#f59e0b" size={11} weight={700} anchor="middle">
              Kaster (A)
            </L>

            {/* Rett kastebane i rommet (snorrett linje) */}
            <line x1="230" y1="220" x2="230" y2="75" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" />
            <L x="215" y="145" fill="#fef08a" size={11} weight={700} anchor="end">
              Snorrett bane i rommet
            </L>

            {/* Animert ball i rommet */}
            <circle r="7" fill="#ffffff" stroke="#f59e0b" strokeWidth="2">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href={`#${uid}-path-straight`} />
              </animateMotion>
            </circle>

            {/* Bunnotat */}
            <rect x="70" y="375" width="320" height="30" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <L x="230" y="394" fill="#94a3b8" size={11.5} weight={600} anchor="middle">
              Ballen går rett fram — målet roterer vekk!
            </L>
          </g>

          {/* ─── HØYRE PANEL: ROTERENDE REFERANSESYSTEM (PÅ KARUSELLEN) ─── */}
          <g>
            <L x="690" y="45" fill="#38bdf8" size={15} weight={800} anchor="middle">
              2. Roterende referansesystem (Sett fra karusellen)
            </L>
            <L x="690" y="65" fill={C.muted} size={12} anchor="middle">
              Observatør A og B roterer med · Opplever seg selv i ro
            </L>

            {/* Skiven oppleves som stasjonær */}
            <circle cx="690" cy="220" r="145" fill={`url(#${uid}-disk-rot)`} stroke="#0ea5e9" strokeWidth="2.5" />

            {/* Fast aksekryss for observatørene */}
            <line x1="690" y1="75" x2="690" y2="365" stroke="#164e63" strokeWidth="1.2" strokeDasharray="4 4" />
            <line x1="545" y1="220" x2="835" y2="220" stroke="#164e63" strokeWidth="1.2" strokeDasharray="4 4" />

            {/* Fast mål B på kanten */}
            <circle cx="690" cy="85" r="11" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x="690" y="89" fill="#0f172a" fontSize="10" fontWeight="900" textAnchor="middle">B</text>
            <L x="690" y="68" fill="#38bdf8" size={11} weight={700} anchor="middle">
              Fast mål B (for observatør)
            </L>

            {/* Kaster A i sentrum */}
            <circle cx="690" cy="220" r="13" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.2" />
            <text x="690" y="224" fill="#0f172a" fontSize="11" fontWeight="900" textAnchor="middle">A</text>
            <L x="690" y="248" fill="#f59e0b" size={11} weight={700} anchor="middle">
              Kaster (A)
            </L>

            {/* Tenkt rett siktelinje */}
            <line x1="690" y1="220" x2="690" y2="96" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 5" />
            <L x="675" y="145" fill="#64748b" size={11} weight={600} anchor="end">
              Siktelinje
            </L>

            {/* Tilsynelatende krummet bane mot høyre */}
            <path
              d="M 690 220 Q 690 140 780 115"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3.2"
              markerEnd={`url(#${m.low})`}
            />

            {/* Fiktiv kraft-pil (Coriolis) */}
            <Arrow d="M 725 155 L 755 170" marker={m.warm} color={C.warm} width={2.4} />
            <L x="765" y="180" fill={C.warm} size={11} weight={800}>
              F_c (avbøyer til høyre)
            </L>

            {/* Animert ball i krum bane */}
            <circle r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href={`#${uid}-path-curved`} />
              </animateMotion>
            </circle>

            {/* Tydelig treff-markør som bommer */}
            <circle cx="780" cy="115" r="8" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
            <L x="792" y="112" fill="#ef4444" size={11.5} weight={800}>
              Bommer til høyre!
            </L>

            {/* Bunnotat */}
            <rect x="530" y="375" width="320" height="30" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="1" />
            <L x="690" y="394" fill="#bae6fd" size={11.5} weight={700} anchor="middle">
              Tilsynelatende avbøyning mot høyre = Corioliskraften
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. GlobalDeflectionDiagram
 * 3D-skygget jordklode som viser at Corioliseffekten avbøyer bevegelse
 * uansett hvilken kompassretning man beveger seg (Nord, Sør, Øst eller Vest).
 * Animerte partikkelbaner for begge halvkuler.
 */
export function GlobalDeflectionDiagram() {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram
      title="Coriolis på den roterende jordkloden (Alle himmelretninger)"
      heading="Alltid mot høyre i nord, alltid mot venstre i sør – uansett kompasskurs"
      caption="En av de vanligste feiloppfatningene er at Corioliseffekten bare virker når man beveger seg fra nord mot sør eller omvendt. Figuren viser at avbøyningen er like sterk uansett hvilken vei en luftpakke eller et prosjektil sendes: 1) På nordlig halvkule (øverst): Bevegelse mot nord bøyes mot øst (høyre), bevegelse mot sør bøyes mot vest (høyre), bevegelse mot øst bøyes mot sør (høyre), og bevegelse mot vest bøyes mot nord (høyre). 2) På sørlig halvkule (nederst) er regelen speilvendt: All horisontal bevegelse bøyes mot venstre. 3) Ved ekvator (0°) er den horisontale komponenten av Corioliskraften nøyaktig null (sin 0° = 0)."
      viewBox="0 0 940 460"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* 3D-skyggegradient for kloden */}
            <radialGradient id={`${uid}-earth-glow`} cx="38%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="25%" stopColor="#0284c7" />
              <stop offset="65%" stopColor="#0f3b5c" />
              <stop offset="100%" stopColor="#081522" />
            </radialGradient>

            {/* Atmosfæreglød */}
            <radialGradient id={`${uid}-atmo-ring`} cx="470" cy="230" r="195" gradientUnits="userSpaceOnUse">
              <stop offset="85%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>

            {/* Partikkelstier Nordlig halvkule */}
            <path id={`${uid}-nh-north`} d="M 470 145 Q 470 95 515 75" />
            <path id={`${uid}-nh-south`} d="M 470 145 Q 470 190 425 210" />
            <path id={`${uid}-nh-east`}  d="M 470 145 Q 520 145 540 185" />
            <path id={`${uid}-nh-west`}  d="M 470 145 Q 420 145 400 105" />

            {/* Partikkelstier Sørlig halvkule */}
            <path id={`${uid}-sh-south`} d="M 470 315 Q 470 365 515 385" />
            <path id={`${uid}-sh-north`} d="M 470 315 Q 470 270 425 250" />
            <path id={`${uid}-sh-east`}  d="M 470 315 Q 520 315 540 275" />
            <path id={`${uid}-sh-west`}  d="M 470 315 Q 420 315 400 355" />
          </defs>

          {/* Atmosfæreglød */}
          <circle cx="470" cy="230" r="190" fill={`url(#${uid}-atmo-ring)`} />

          {/* JORDKLODEN I 3D */}
          <circle cx="470" cy="230" r="175" fill={`url(#${uid}-earth-glow)`} stroke="#38bdf8" strokeWidth="2.2" />

          {/* Kontinent-omriss (stiliserte kontinenter for romfølelse) */}
          <path
            d="M 430 90 Q 470 110 440 150 Q 410 170 420 210 Q 440 250 420 280 Q 400 320 390 350 Q 380 300 370 240 Q 360 170 400 110 Z"
            fill="#15803d"
            opacity="0.45"
          />
          <path
            d="M 500 110 Q 540 130 520 170 Q 490 190 510 230 Q 530 260 510 290"
            fill="#15803d"
            opacity="0.35"
          />

          {/* BREDDEGRADSLINJER */}
          {/* 60°N */}
          <ellipse cx="470" cy="115" rx="135" ry="24" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <L x="320" y="119" fill="#94a3b8" size={11} anchor="end">60°N (Norge: f = 1,26 × 10⁻⁴)</L>

          {/* 30°N */}
          <ellipse cx="470" cy="170" rx="165" ry="30" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <L x="290" y="174" fill="#94a3b8" size={11} anchor="end">30°N (Subtropene)</L>

          {/* Ekvator (0°) */}
          <ellipse cx="470" cy="230" rx="175" ry="34" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" />
          <L x="280" y="234" fill="#fef08a" size={12} weight={800} anchor="end">Ekvator 0° (f = 0)</L>

          {/* 30°S */}
          <ellipse cx="470" cy="290" rx="165" ry="30" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <L x="290" y="294" fill="#94a3b8" size={11} anchor="end">30°S</L>

          {/* 60°S */}
          <ellipse cx="470" cy="345" rx="135" ry="24" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
          <L x="320" y="349" fill="#94a3b8" size={11} anchor="end">60°S</L>

          {/* JORDENS ROTASJONSAKSE OG ROTASJONSPIL */}
          <line x1="470" y1="35" x2="470" y2="425" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" />
          <circle cx="470" cy="55" r="5" fill="#ffffff" />
          <L x="470" y="42" fill="#ffffff" size={12} weight={800} anchor="middle">Nordpolen (90°N)</L>
          <circle cx="470" cy="405" r="5" fill="#ffffff" />
          <L x="470" y="422" fill="#ffffff" size={12} weight={800} anchor="middle">Sørpolen (90°S)</L>

          {/* Rotasjonspil ved ekvator (mot øst) */}
          <Arrow d="M 430 230 L 520 230" marker={m.warm} color={C.warm} width={3} />
          <L x="475" y="222" fill="#fef08a" size={11} weight={800} anchor="middle">Jordrotasjon mot øst (1670 km/t)</L>

          {/* ─── NORDLIG HALVKULE: 4-VEIS UTBYTE FRA PUNKT (470, 145) ─── */}
          <circle cx="470" cy="145" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

          {/* Krummede piler mot høyre på NH */}
          <path d="M 470 145 Q 470 95 515 75" fill="none" stroke="#38bdf8" strokeWidth="2.8" markerEnd={`url(#${m.teal})`} />
          <path d="M 470 145 Q 470 190 425 210" fill="none" stroke="#38bdf8" strokeWidth="2.8" markerEnd={`url(#${m.teal})`} />
          <path d="M 470 145 Q 520 145 540 185" fill="none" stroke="#38bdf8" strokeWidth="2.8" markerEnd={`url(#${m.teal})`} />
          <path d="M 470 145 Q 420 145 400 105" fill="none" stroke="#38bdf8" strokeWidth="2.8" markerEnd={`url(#${m.teal})`} />

          {/* Animerte partikler på NH */}
          {[
            { id: `${uid}-nh-north`, col: "#ffffff" },
            { id: `${uid}-nh-south`, col: "#ffffff" },
            { id: `${uid}-nh-east`,  col: "#ffffff" },
            { id: `${uid}-nh-west`,  col: "#ffffff" },
          ].map((p, idx) => (
            <circle key={`nh-p-${idx}`} r="5" fill={p.col} stroke="#0284c7" strokeWidth="1.5">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${idx * 0.4}s`}>
                <mpath href={`#${p.id}`} />
              </animateMotion>
            </circle>
          ))}

          {/* Infokort Nordlig halvkule */}
          <rect x="670" y="90" width="240" height="90" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          <L x="685" y="112" fill="#38bdf8" size={13} weight={800}>Nordlig halvkule (NH)</L>
          <L x="685" y="130" fill="#f8fafc" size={11.5} weight={700}>Avbøyes ALLTID til HØYRE</L>
          <L x="685" y="148" fill="#94a3b8" size={10.5}>• Nordover ➔ mot øst (høyre)</L>
          <L x="685" y="164" fill="#94a3b8" size={10.5}>• Sørover ➔ mot vest (høyre)</L>

          {/* ─── SØRLIG HALVKULE: 4-VEIS UTBYTE FRA PUNKT (470, 315) ─── */}
          <circle cx="470" cy="315" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

          {/* Krummede piler mot venstre på SH */}
          <path d="M 470 315 Q 470 365 515 385" fill="none" stroke="#f43f5e" strokeWidth="2.8" markerEnd={`url(#${m.low})`} />
          <path d="M 470 315 Q 470 270 425 250" fill="none" stroke="#f43f5e" strokeWidth="2.8" markerEnd={`url(#${m.low})`} />
          <path d="M 470 315 Q 520 315 540 275" fill="none" stroke="#f43f5e" strokeWidth="2.8" markerEnd={`url(#${m.low})`} />
          <path d="M 470 315 Q 420 315 400 355" fill="none" stroke="#f43f5e" strokeWidth="2.8" markerEnd={`url(#${m.low})`} />

          {/* Animerte partikler på SH */}
          {[
            { id: `${uid}-sh-south`, col: "#ffffff" },
            { id: `${uid}-sh-north`, col: "#ffffff" },
            { id: `${uid}-sh-east`,  col: "#ffffff" },
            { id: `${uid}-sh-west`,  col: "#ffffff" },
          ].map((p, idx) => (
            <circle key={`sh-p-${idx}`} r="5" fill={p.col} stroke="#e11d48" strokeWidth="1.5">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${idx * 0.4}s`}>
                <mpath href={`#${p.id}`} />
              </animateMotion>
            </circle>
          ))}

          {/* Infokort Sørlig halvkule */}
          <rect x="670" y="270" width="240" height="90" rx="8" fill="#0f172a" stroke="#e11d48" strokeWidth="1.5" />
          <L x="685" y="292" fill="#fb7185" size={13} weight={800}>Sørlig halvkule (SH)</L>
          <L x="685" y="310" fill="#f8fafc" size={11.5} weight={700}>Avbøyes ALLTID til VENSTRE</L>
          <L x="685" y="328" fill="#94a3b8" size={10.5}>• Sørover ➔ mot øst (venstre)</L>
          <L x="685" y="344" fill="#94a3b8" size={10.5}>• Nordover ➔ mot vest (venstre)</L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. ZonalCentrifugalDiagram
 * Forklarer den fysiske mekanismen bak øst-vest-avbøyning (Eötvös-effekten).
 * Viser at når luft beveger seg mot øst, øker dens absolutte rotasjonshastighet rundt jordaksen,
 * noe som øker sentrifugalkraften og slynger luften mot ekvator (til høyre i nord).
 */
export function ZonalCentrifugalDiagram() {
  return (
    <Diagram
      title="Hvorfor bøyes øst-vest-bevegelser? Sentrifugalkraften og Eötvös-effekten"
      heading="Fysikken bak zonal avbøyning: Endring i sentrifugalkraft"
      caption="Mange lærebøker forklarer bare Coriolis for nord-sør-bevegelser, noe som etterlater et stort mysterium: Hvorfor bøyes vind som blåser rett mot øst eller vest? Svaret ligger i sentrifugalkraften rundt jordens rotasjonsakse: 1) Bevegelse mot ØST (til venstre): Luftpakken beveger seg i samme retning som jordens rotasjon. Den totale vinkelhastigheten øker (Ω + Δω). Sentrifugalkraften (F_cf = m·ω²·r) øker proporsjonalt med kvadratet av farten. På en kuleformet planet peker den økte sentrifugalkraften rett ut fra rotasjonsaksen; dekomponert langs jordoverflaten gir dette en kraftkomponent mot EKVATOR. For en østgående vind på nordlig halvkule er ekvator til høyre! 2) Bevegelse mot VEST (til høyre): Luftpakken beveger seg mot rotasjonen. Vinkelhastigheten minker (Ω - Δω), og sentrifugalkraften svekkes. Nå er det jordens gravitasjon som dominerer og trekker pakken inn mot jordaksen. Dekomponert langs kuleflaten gir dette en kraftkomponent mot NORDPOLEN. For en vestgående vind på nordlig halvkule er nordpolen også til høyre!"
      viewBox="0 0 920 400"
      wide
    >
      {(m) => (
        <>
          {/* SKILLEVEGG */}
          <line x1="460" y1="30" x2="460" y2="380" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* ─── VENSTRE: BEVEGELSE MOT ØST ─── */}
          <g>
            <rect x="40" y="35" width="390" height="345" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.2" />
            <L x="235" y="60" fill="#38bdf8" size={14} weight={800} anchor="middle">
              A. Bevegelse mot ØST (Med jordrotasjonen)
            </L>

            {/* Kvart-jordbue og rotasjonsakse */}
            <line x1="120" y1="80" x2="120" y2="330" stroke="#64748b" strokeWidth="2.5" />
            <L x="120" y="72" fill="#94a3b8" size={11} weight={700} anchor="middle">Jordakse</L>
            <path d="M 120 100 A 210 210 0 0 1 330 310" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <L x="345" y="325" fill="#f59e0b" size={11} weight={700}>Ekvator</L>
            <L x="120" y="115" fill="#94a3b8" size={11} anchor="end">Nordpol</L>

            {/* Luftpakke på 45°N */}
            <circle cx="250" cy="180" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <L x="268" y="175" fill="#f59e0b" size={12} weight={800}>Luftpakke (v mot øst)</L>

            {/* Radius r til aksen */}
            <line x1="120" y1="180" x2="250" y2="180" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
            <L x="180" y="174" fill="#64748b" size={10.5} anchor="middle">r = R·cos φ</L>

            {/* Økt sentrifugalkraft rett ut fra aksen */}
            <Arrow d="M 250 180 L 370 180" marker={m.warm} color={C.warm} width={3.2} />
            <L x="375" y="175" fill={C.warm} size={11.5} weight={800}>Økt sentrifugalkraft (F_cf)</L>

            {/* Dekomponert overflatekomponent mot ekvator */}
            <Arrow d="M 250 180 L 305 245" marker={m.teal} color={C.teal} width={3.5} />
            <L x="315" y="255" fill="#38bdf8" size={12} weight={800}>Overflatekomponent mot EKVATOR</L>

            {/* Konklusjonsboks */}
            <rect x="60" y="295" width="350" height="70" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <L x="75" y="315" fill="#fef08a" size={11.5} weight={700}>• Fart mot øst ➔ vinkelhastighet øker (Ω + Δω)</L>
            <L x="75" y="332" fill="#94a3b8" size={11}>• Sentrifugalkraft kaster luften ut fra aksen</L>
            <L x="75" y="350" fill="#38bdf8" size={11.5} weight={800}>➔ Skyves mot ekvator = AVBØYD MOT HØYRE!</L>
          </g>

          {/* ─── HØYRE: BEVEGELSE MOT VEST ─── */}
          <g>
            <rect x="490" y="35" width="390" height="345" rx="8" fill="#0f172a" stroke="#e11d48" strokeWidth="1.2" />
            <L x="685" y="60" fill="#fb7185" size={14} weight={800} anchor="middle">
              B. Bevegelse mot VEST (Mot jordrotasjonen)
            </L>

            {/* Kvart-jordbue og rotasjonsakse */}
            <line x1="570" y1="80" x2="570" y2="330" stroke="#64748b" strokeWidth="2.5" />
            <L x="570" y="72" fill="#94a3b8" size={11} weight={700} anchor="middle">Jordakse</L>
            <path d="M 570 100 A 210 210 0 0 1 780 310" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <L x="795" y="325" fill="#f59e0b" size={11} weight={700}>Ekvator</L>
            <L x="570" y="115" fill="#94a3b8" size={11} anchor="end">Nordpol</L>

            {/* Luftpakke på 45°N */}
            <circle cx="700" cy="180" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <L x="718" y="175" fill="#f59e0b" size={12} weight={800}>Luftpakke (v mot vest)</L>

            {/* Radius r til aksen */}
            <line x1="570" y1="180" x2="700" y2="180" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />
            <L x="635" y="174" fill="#64748b" size={10.5} anchor="middle">r = R·cos φ</L>

            {/* Redusert sentrifugalkraft ➔ gravitasjon dominerer */}
            <Arrow d="M 700 180 L 610 180" marker={m.low} color={C.low} width={3.2} />
            <L x="600" y="170" fill={C.low} size={11.5} weight={800} anchor="end">Netto gravitasjonssug mot akse</L>

            {/* Dekomponert overflatekomponent mot polen */}
            <Arrow d="M 700 180 L 645 125" marker={m.low} color={C.low} width={3.5} />
            <L x="640" y="115" fill="#fb7185" size={12} weight={800}>Overflatekomponent mot POLEN</L>

            {/* Konklusjonsboks */}
            <rect x="510" y="295" width="350" height="70" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <L x="525" y="315" fill="#fef08a" size={11.5} weight={700}>• Fart mot vest ➔ vinkelhastighet minker (Ω - Δω)</L>
            <L x="525" y="332" fill="#94a3b8" size={11}>• Sentrifugalkraft minker ➔ gravitasjon trekker inn</L>
            <L x="525" y="350" fill="#fb7185" size={11.5} weight={800}>➔ Trekkes mot polen = OGSÅ AVBØYD MOT HØYRE!</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. GeostrophicAdjustmentDiagram
 * Trinnvis animert geostrofisk tilpasning:
 * Viser hvordan en luftpakke starter fra ro i et høytrykk, akselererer mot lavtrykket,
 * mens Corioliskraften vokser og bøyer banen 90°, inntil F_pg og F_c er i balanse
 * (geostrofisk vind parallelt med isobarene).
 */
export function GeostrophicAdjustmentDiagram() {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram
      title="Geostrofisk tilpasning: Fra trykkgradient til stabil parallell vind"
      heading="Hvordan geostrofisk vind fødes i fri atmosfære"
      caption="I fri atmosfære (over ca. 1 km høyde der friksjon er neglisjerbar) blåser vinden ikke fra høyt mot lavt trykk, men parallelt med isobarene. Figuren viser tilpasningsprosessen i fire trinn: 1) Trinn 1: Luftpakken starter fra ro. Bare trykkgradientkraften (F_pg, rød pil) virker, og trekker luften vinkelrett mot lavt trykk. Fordi farten er null, er Corioliskraften (F_c) null. 2) Trinn 2: Luften akselererer mot nord. Nå som luften har fart, oppstår Corioliskraften (F_c, blå pil) som virker 90° til høyre for fartsretningen. Banen begynner å krumme mot øst. 3) Trinn 3: Farten øker ytterligere. F_c vokser i styrke og svinger banen kraftigere mot høyre. 4) Trinn 4 (Geostrofisk likevekt): F_pg og F_c er like store og peker nøyaktig motsatt vei (F_pg + F_c = 0). Luften slutter å akselerere mot lavtrykket og blåser med konstant fart rett fra vest mot øst, parallelt med isobarene. Dette er geostrofisk vind!"
      viewBox="0 0 940 420"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Komplett bane for animert luftpakke */}
            <path
              id={`${uid}-geo-path`}
              d="M 120 320 Q 220 320 320 270 T 540 180 L 850 180"
            />
          </defs>

          {/* ISOBARER (PARALLELLE LINJER FRA VEST TIL ØST) */}
          {/* 1000 hPa (Lavtrykk øverst) */}
          <line x1="60" y1="80" x2="880" y2="80" stroke="#ef4444" strokeWidth="2.2" strokeDasharray="8 4" opacity="0.8" />
          <L x="70" y="70" fill="#fca5a5" size={13} weight={800}>1000 hPa · LAVTRYKK (L)</L>

          {/* 1008 hPa */}
          <line x1="60" y1="180" x2="880" y2="180" stroke="#64748b" strokeWidth="1.5" />
          <L x="70" y="172" fill="#94a3b8" size={12} weight={700}>1008 hPa</L>

          {/* 1016 hPa */}
          <line x1="60" y1="280" x2="880" y2="280" stroke="#64748b" strokeWidth="1.5" />
          <L x="70" y="272" fill="#94a3b8" size={12} weight={700}>1016 hPa</L>

          {/* 1024 hPa (Høytrykk nederst) */}
          <line x1="60" y1="360" x2="880" y2="360" stroke="#22c55e" strokeWidth="2.2" strokeDasharray="8 4" opacity="0.8" />
          <L x="70" y="380" fill="#86efac" size={13} weight={800}>1024 hPa · HØYTRYKK (H)</L>

          {/* Trykkgradient-retning (peker oppover mot L) */}
          <Arrow d="M 880 340 L 880 100" marker={m.low} color={C.low} width={2.5} />
          <L x="870" y="220" fill="#ef4444" size={12} weight={800} anchor="end">
            Trykkgradient (F_pg) peker mot lavt trykk
          </L>

          {/* Svinget tilpasningsbane */}
          <path
            d="M 120 320 Q 220 320 320 270 T 540 180 L 850 180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeDasharray="8 5"
          />

          {/* ─── DE 4 TRINNENE MED KRAFTVEKTORER ─── */}

          {/* TRINN 1: Start fra ro (x=120, y=320) */}
          <g transform="translate(120, 320)">
            <circle cx="0" cy="0" r="11" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#0f172a" fontSize="10" fontWeight="900" textAnchor="middle">1</text>
            <Arrow d="M 0 -14 L 0 -58" marker={m.low} color={C.low} width={2.8} />
            <L x="12" y="-36" fill="#ef4444" size={11} weight={800}>F_pg</L>
            <L x="0" y="24" fill="#fef08a" size={11} weight={800} anchor="middle">1. Start fra ro</L>
            <L x="0" y="38" fill="#94a3b8" size={10} anchor="middle">v = 0 ➔ F_c = 0</L>
          </g>

          {/* TRINN 2: Akselerasjon og krumning (x=300, y=275) */}
          <g transform="translate(300, 275)">
            <circle cx="0" cy="0" r="11" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#0f172a" fontSize="10" fontWeight="900" textAnchor="middle">2</text>
            {/* F_pg rett opp */}
            <Arrow d="M 0 -14 L 0 -58" marker={m.low} color={C.low} width={2.8} />
            <L x="-8" y="-36" fill="#ef4444" size={11} weight={800} anchor="end">F_pg</L>
            {/* F_c 90° til høyre */}
            <Arrow d="M 12 -4 L 46 16" marker={m.teal} color={C.teal} width={2.8} />
            <L x="52" y="28" fill="#38bdf8" size={11} weight={800}>F_c</L>
            <L x="0" y="24" fill="#fef08a" size={11} weight={800} anchor="middle">2. Akselerasjon</L>
            <L x="0" y="38" fill="#94a3b8" size={10} anchor="middle">F_c bøyer mot høyre</L>
          </g>

          {/* TRINN 3: Ytterligere dreining (x=500, y=200) */}
          <g transform="translate(500, 200)">
            <circle cx="0" cy="0" r="11" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#0f172a" fontSize="10" fontWeight="900" textAnchor="middle">3</text>
            {/* F_pg opp */}
            <Arrow d="M 0 -14 L 0 -58" marker={m.low} color={C.low} width={2.8} />
            <L x="-8" y="-36" fill="#ef4444" size={11} weight={800} anchor="end">F_pg</L>
            {/* F_c mot sørøst */}
            <Arrow d="M 8 10 L 28 46" marker={m.teal} color={C.teal} width={2.8} />
            <L x="36" y="52" fill="#38bdf8" size={11} weight={800}>F_c vokser</L>
            <L x="0" y="-70" fill="#fef08a" size={11} weight={800} anchor="middle">3. Sterk krumning</L>
          </g>

          {/* TRINN 4: Geostrofisk likevekt (x=750, y=180) */}
          <g transform="translate(750, 180)">
            <circle cx="0" cy="0" r="13" fill="#22c55e" stroke="#ffffff" strokeWidth="2.5" />
            <text x="0" y="4" fill="#0f172a" fontSize="11" fontWeight="900" textAnchor="middle">4</text>
            {/* F_pg rett opp */}
            <Arrow d="M 0 -16 L 0 -68" marker={m.low} color={C.low} width={3.2} />
            <L x="-10" y="-45" fill="#ef4444" size={12} weight={900} anchor="end">F_pg</L>
            {/* F_c nøyaktig rett ned, like stor! */}
            <Arrow d="M 0 16 L 0 68" marker={m.teal} color={C.teal} width={3.2} />
            <L x="-10" y="52" fill="#38bdf8" size={12} weight={900} anchor="end">F_c</L>
            {/* Geostrofisk vindvektor mot øst */}
            <Arrow d="M 18 0 L 85 0" marker={m.warm} color={C.warm} width={4} />
            <L x="50" y="-12" fill="#fef08a" size={12} weight={900} anchor="middle">V_g (Geostrofisk vind)</L>

            <rect x="-80" y="85" width="180" height="34" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="1.2" />
            <L x="10" y="100" fill="#bbf7d0" size={11.5} weight={800} anchor="middle">4. GEOSTROFISK VIND</L>
            <L x="10" y="113" fill="#86efac" size={10} anchor="middle">F_pg = F_c · Parallelt med isobar</L>
          </g>

          {/* Kontinuerlig animert luftpartikkel som gjennomfører tilpasningen */}
          <circle r="8" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5">
            <animateMotion dur="4.2s" repeatCount="indefinite">
              <mpath href={`#${uid}-geo-path`} />
            </animateMotion>
          </circle>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. PressureSpinDiagram
 * Lavtrykk og høytrykk med bakkefriksjon.
 * Viser kreftenes samspill (Trykkgradient, Coriolis, Friksjon) og animerte
 * roterende spiralstrømmer inn i lavtrykk (mot klokken) og ut av høytrykk (med klokken).
 */
export function PressureSpinDiagram() {
  return (
    <Diagram
      title="Syklonal og antisyklonal sirkulasjon med bakkefriksjon"
      heading="Hvorfor lavtrykk spinner mot klokken og høytrykk spinner med klokken"
      caption="Når vi beveger oss ned i det atmosfæriske grenselaget (nær bakken), bremser friksjonen mot terreng og havbølger vindhastigheten. Fordi farten synker, svekkes Corioliskraften (som er direkte proporsjonal med fart). Trykkgradientkraften svekkes derimot ikke! Trykkgradientkraften «vinner» drakampen og trekker vinden på skrå over isobarene (typisk 15°–30° vinkel): 1) Rundt et lavtrykk (til venstre): Vinden blåser i en spiral MOT KLOKKEN og innover mot sentrum (konvergens ved bakken). Den innstrømmende luften tvinges oppover, avkjøles adiabatisk og danner skyer og regn. 2) Rundt et høytrykk (til høyre): Vinden blåser i en spiral MED KLOKKEN og utover fra sentrum (divergens ved bakken). Dette suger luft ned fra høyden (subsidens), som varmes adiabatisk og oppløser skyene."
      viewBox="0 0 920 400"
      wide
    >
      {(m) => (
        <>
          {/* SKILLEVEGG */}
          <line x1="460" y1="30" x2="460" y2="380" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* ─── VENSTRE: LAVTRYKK (L) MOT KLOKKEN ─── */}
          <g transform="translate(230, 200)">
            <L x="0" y="-160" fill="#ef4444" size={16} weight={800} anchor="middle">
              LAVTRYKK (L) · NORDLIG HALVKULE
            </L>
            <L x="0" y="-142" fill={C.muted} size={11.5} anchor="middle">
              Bakkekonvergens · Spiral mot klokken (Syklonalt)
            </L>

            {/* Roterende spiral-isobarer */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="-360"
                dur="16s"
                repeatCount="indefinite"
              />
              <circle cx="0" cy="0" r="120" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.4" />
              <circle cx="0" cy="0" r="85" fill="none" stroke="#ef4444" strokeWidth="1.4" strokeDasharray="8 4" opacity="0.6" />
              <circle cx="0" cy="0" r="50" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="10 4" opacity="0.8" />
            </g>

            {/* Sentrum L */}
            <circle cx="0" cy="0" r="24" fill="#450a0a" stroke="#ef4444" strokeWidth="2.5" />
            <text x="0" y="8" fill="#ef4444" fontSize="20" fontWeight="900" textAnchor="middle">L</text>
            <L x="0" y="38" fill="#fca5a5" size={11} weight={700} anchor="middle">990 hPa</L>

            {/* Innstrømmende spiralpiler (skråstilt 25° over isobarene mot L) */}
            <Arrow d="M 0 -115 Q -45 -95 -55 -45" marker={m.low} color={C.low} width={2.8} />
            <Arrow d="M -115 0 Q -95 45 -45 55" marker={m.low} color={C.low} width={2.8} />
            <Arrow d="M 0 115 Q 45 95 55 45" marker={m.low} color={C.low} width={2.8} />
            <Arrow d="M 115 0 Q 95 -45 45 -55" marker={m.low} color={C.low} width={2.8} />

            {/* Kraftvektor-trekant på en luftpakke ved (90, 50) */}
            <circle cx="90" cy="50" r="6" fill="#ffffff" />
            {/* F_pg mot sentrum */}
            <Arrow d="M 90 50 L 35 20" marker={m.low} color={C.low} width={2.4} />
            <L x="65" y="16" fill="#ef4444" size={10} weight={800}>F_pg</L>
            {/* F_c 90° til høyre */}
            <Arrow d="M 90 50 L 125 15" marker={m.teal} color={C.teal} width={2.2} />
            <L x="132" y="18" fill="#38bdf8" size={10} weight={800}>F_c</L>
            {/* Friksjon bakover */}
            <Arrow d="M 90 50 L 120 75" marker={m.warm} color={C.warm} width={2} />
            <L x="130" y="80" fill={C.warm} size={10} weight={800}>Friksjon</L>

            <rect x="-140" y="145" width="280" height="28" rx="5" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
            <L x="0" y="163" fill="#c7d2fe" size={11} weight={700} anchor="middle">
              Innstrømming ➔ Luften heves ➔ Skyer og regn
            </L>
          </g>

          {/* ─── HØYRE: HØYTRYKK (H) MED KLOKKEN ─── */}
          <g transform="translate(690, 200)">
            <L x="0" y="-160" fill="#22c55e" size={16} weight={800} anchor="middle">
              HØYTRYKK (H) · NORDLIG HALVKULE
            </L>
            <L x="0" y="-142" fill={C.muted} size={11.5} anchor="middle">
              Bakkedivergens · Spiral med klokken (Antisyklonalt)
            </L>

            {/* Roterende spiral-isobarer */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="20s"
                repeatCount="indefinite"
              />
              <circle cx="0" cy="0" r="120" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.4" />
              <circle cx="0" cy="0" r="85" fill="none" stroke="#22c55e" strokeWidth="1.4" strokeDasharray="8 4" opacity="0.6" />
              <circle cx="0" cy="0" r="50" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeDasharray="10 4" opacity="0.8" />
            </g>

            {/* Sentrum H */}
            <circle cx="0" cy="0" r="24" fill="#052e16" stroke="#22c55e" strokeWidth="2.5" />
            <text x="0" y="8" fill="#22c55e" fontSize="20" fontWeight="900" textAnchor="middle">H</text>
            <L x="0" y="38" fill="#86efac" size={11} weight={700} anchor="middle">1030 hPa</L>

            {/* Utstrømmende spiralpiler (skråstilt 25° ut fra H) */}
            <Arrow d="M 0 -50 Q 55 -55 105 -25" marker={m.teal} color={C.teal} width={2.8} />
            <Arrow d="M 50 0 Q 55 55 25 105" marker={m.teal} color={C.teal} width={2.8} />
            <Arrow d="M 0 50 Q -55 55 -105 25" marker={m.teal} color={C.teal} width={2.8} />
            <Arrow d="M -50 0 Q -55 -55 -25 -105" marker={m.teal} color={C.teal} width={2.8} />

            <rect x="-140" y="145" width="280" height="28" rx="5" fill="#064e3b" stroke="#059669" strokeWidth="1" />
            <L x="0" y="163" fill="#a7f3d0" size={11} weight={700} anchor="middle">
              Utstrømming ➔ Subsidens i sentrum ➔ Skyfritt
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. RossbyScaleDiagram
 * Visuell og matematisk sammenligning av Rossby-tallet (Ro = U / (f * L)).
 * Knuser vaskemyten én gang for alle.
 */
export function RossbyScaleDiagram() {
  return (
    <Diagram
      title="Skala og Rossby-tallet (Ro): Hvorfor vasken lyver og orkanen spinner"
      heading="Det matematiske beviset: Rossby-tallet skiller vasken fra stormene"
      caption="Rossby-tallet (Ro = U / (f·L)) er et dimensjonsløst tall som meteorologer og oseanografer bruker for å avgjøre om Corioliseffekten betyr noe for en bevegelse: U er hastighet, f er Coriolisparameteren (~10⁻⁴ s⁻¹ i Norge), og L er fenomenets horisontale utstrekning. 1) Når Ro >> 1 (rød sone til venstre): Treghets- og sentrifugalkrefter er tusenvis av ganger sterkere enn Coriolis. I en vask (Ro ≈ 16 000), et fotballspark (Ro ≈ 4000) eller en tornado (Ro ≈ 1100) er Corioliskraften fullstendig ubetydelig. Hvilken vei vannet renner i vasken avgjøres av kummens form, kranens vinkel og restvirvler fra da du vasket hendene! 2) Når Ro << 1 (grønn sone til høyre): Corioliskraften dominerer over akselerasjon. I polare lavtrykk (Ro ≈ 0,3), ekstratropiske sykloner (Ro ≈ 0,08) og store havstrømmer (Ro ≈ 0,002) tvinger Corioliseffekten all bevegelse inn i faste rotasjonsmønstre."
      viewBox="0 0 920 380"
      wide
    >
      {() => (
        <>
          {/* SKALA-LINJE I BAKGRUNNEN */}
          <rect x="50" y="90" width="820" height="12" rx="6" fill="#1e293b" />
          {/* Rød gradient venstre (Coriolis taper) */}
          <rect x="50" y="90" width="410" height="12" rx="6" fill="#ef4444" opacity="0.6" />
          {/* Grønn gradient høyre (Coriolis dominerer) */}
          <rect x="460" y="90" width="410" height="12" rx="6" fill="#22c55e" opacity="0.6" />

          {/* Formel-boks øverst */}
          <rect x="330" y="25" width="260" height="42" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="460" y="51" fill="#38bdf8" size={15} weight={900} anchor="middle">
            Ro = U / (f · L)
          </L>

          {/* SKALAKORT (6 EKSEMPLER FRA LITEN TIL STOR) */}
          {[
            {
              x: 50,
              name: "Vask / Toalett",
              scale: "L = 0,3 m",
              speed: "U = 0,5 m/s",
              ro: "Ro ≈ 16 000",
              status: "Coriolis taper totalt",
              sub: "Kummens form styrer",
              col: "#ef4444",
              bg: "#450a0a",
            },
            {
              x: 190,
              name: "Fotballspark",
              scale: "L = 50 m",
              speed: "U = 25 m/s",
              ro: "Ro ≈ 4 000",
              status: "Coriolis = null",
              sub: "Magnus-effekt styrer",
              col: "#f97316",
              bg: "#431407",
            },
            {
              x: 330,
              name: "Tornado",
              scale: "L = 300 m",
              speed: "U = 60 m/s",
              ro: "Ro ≈ 1 500",
              status: "Coriolis neglisjerbar",
              sub: "Syklostrofisk balanse",
              col: "#eab308",
              bg: "#422006",
            },
            {
              x: 480,
              name: "Polart lavtrykk",
              scale: "L = 400 km",
              speed: "U = 25 m/s",
              ro: "Ro ≈ 0,5",
              status: "Coriolis viktig!",
              sub: "Begynner å dominere",
              col: "#38bdf8",
              bg: "#082f49",
            },
            {
              x: 620,
              name: "Norsk storm (L)",
              scale: "L = 1 500 km",
              speed: "U = 20 m/s",
              ro: "Ro ≈ 0,1",
              status: "Coriolis dominerer!",
              sub: "Kvasigeostrofisk",
              col: "#22c55e",
              bg: "#052e16",
            },
            {
              x: 760,
              name: "Golfstrømmen",
              scale: "L = 5 000 km",
              speed: "U = 1 m/s",
              ro: "Ro ≈ 0,002",
              status: "Full geostrofi!",
              sub: "Ekman-transport & Gyres",
              col: "#10b981",
              bg: "#064e3b",
            },
          ].map((item) => (
            <g key={item.name} transform={`translate(${item.x}, 120)`}>
              {/* Forbindelsesstrek til aksen */}
              <line x1="55" y1="-18" x2="55" y2="0" stroke={item.col} strokeWidth="2" />
              <circle cx="55" cy="-18" r="4" fill={item.col} />

              {/* Kort */}
              <rect x="0" y="0" width="115" height="180" rx="8" fill={item.bg} stroke={item.col} strokeWidth="1.5" />
              <L x="57" y="24" fill="#ffffff" size={11} weight={800} anchor="middle">{item.name}</L>
              <L x="57" y="44" fill="#cbd5e1" size={10} anchor="middle">{item.scale}</L>
              <L x="57" y="58" fill="#cbd5e1" size={10} anchor="middle">{item.speed}</L>

              <rect x="8" y="70" width="99" height="28" rx="4" fill="#0f172a" />
              <L x="57" y="88" fill={item.col} size={11.5} weight={900} anchor="middle">{item.ro}</L>

              <L x="57" y="125" fill="#f8fafc" size={9.5} weight={700} anchor="middle">{item.status}</L>
              <L x="57" y="145" fill="#94a3b8" size={9} anchor="middle">{item.sub}</L>
            </g>
          ))}

          {/* Sone-etiketter under skalaen */}
          <L x="180" y="340" fill="#ef4444" size={12} weight={800} anchor="middle">
            ← Ro &gt;&gt; 1: Fiktive krefter neglisjerbare
          </L>
          <L x="690" y="340" fill="#22c55e" size={12} weight={800} anchor="middle">
            Ro &lt;&lt; 1: Corioliseffekten styrer alt! →
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. EkmanSpiralDiagram
 * Ekman-spiral og kystoppvelling.
 * Viser hvordan vindstress på havoverflaten avbøyes 45° mot høyre,
 * mens dypere lag danner en spiral, og netto transport (90° til høyre)
 * trekker kaldt bunnvann opp langs kysten.
 */
export function EkmanSpiralDiagram() {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram
      title="Ekman-spiral og kystoppvelling: Coriolis i verdenshavene"
      heading="Hvordan vinden pumper næringsrikt dypvann opp til kysten"
      caption="Corioliseffekten gjelder ikke bare atmosfæren; den er hovedarkitekten bak havets strømningsmønstre: 1) Ekman-spiralen (til venstre): Når vind blåser over havet, drar den i det øverste vannlaget. Corioliskraften avbøyer overflatevannet 45° til høyre for vindretningen (på nordlig halvkule). Dette vannlaget overfører bevegelsen nedover til neste lag ved friksjon (viskositet). Hvert dypere vannlag beveger seg saktere og vris enda lenger mot høyre, inntil strømmen på ca. 100 meters dyp går stikk motsatt vei av vinden! 2) Netto Ekman-transport (90°): Summerer vi opp all vanntransporten gjennom hele Ekman-laget, er nettoresultatet at vannmassene fraktes nøyaktig 90° til høyre for vinden. 3) Kystoppvelling (til høyre): Når en nordavind blåser sørover langs kysten av Vestlandet eller Portugal, skyver Ekman-transporten det varme overflatevannet 90° ut i havet (vekk fra land). For å tette vannunderskuddet ved land, suges iskaldt, krystallklart og ekstremt næringsrikt dypvann opp langs havbunnen. Dette gir næring til planteplankton og skaper grunnlaget for verdens rikeste fiskerier!"
      viewBox="0 0 920 440"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Hav-snitt gradient */}
            <linearGradient id={`${uid}-sea-col`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#0369a1" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
            </linearGradient>

            {/* Dypvannsoppvelling-sti for animerte partikler */}
            <path id={`${uid}-upwell-path`} d="M 850 350 Q 820 280 800 200 T 780 140 L 680 140" />
          </defs>

          {/* SKILLEVEGG */}
          <line x1="450" y1="30" x2="450" y2="410" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* ─── VENSTRE: EKMAN-SPIRALEN (TOPP- OG DYBDESNITT) ─── */}
          <g>
            <L x="225" y="45" fill="#38bdf8" size={15} weight={800} anchor="middle">
              1. Ekman-spiralen i vannsøylen
            </L>
            <L x="225" y="65" fill={C.muted} size={11.5} anchor="middle">
              Vindstress, intern friksjon og 90° netto transport
            </L>

            {/* Vindretning (rett mot nord / oppover) */}
            <rect x="70" y="90" width="310" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <Arrow d="M 120 110 L 260 110" marker={m.warm} color={C.warm} width={3.5} />
            <L x="270" y="115" fill={C.warm} size={13} weight={800}>Vindretning på overflaten</L>

            {/* Havlag tverrsnitt */}
            <rect x="70" y="150" width="310" height="200" rx="8" fill={`url(#${uid}-sea-col)`} stroke="#0284c7" strokeWidth="1.5" />

            {/* Vektorer på ulike dyp */}
            {/* Overflate (0m): 45° til høyre */}
            <line x1="160" y1="180" x2="350" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <L x="85" y="184" fill="#ffffff" size={11} weight={700}>0 m (Overflate)</L>
            <Arrow d="M 180 180 L 290 180" marker={m.teal} color={C.teal} width={3.5} />
            <L x="300" y="184" fill="#38bdf8" size={11} weight={800}>45° til høyre (100 % fart)</L>

            {/* Dyp 25m: 65° til høyre */}
            <line x1="160" y1="225" x2="350" y2="225" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <L x="85" y="229" fill="#cbd5e1" size={11}>25 m dybde</L>
            <Arrow d="M 180 225 L 260 225" marker={m.teal} color={C.teal} width={2.8} />
            <L x="270" y="229" fill="#7dd3fc" size={10.5}>65° til høyre (65 % fart)</L>

            {/* Dyp 50m: 90° til høyre */}
            <line x1="160" y1="270" x2="350" y2="270" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <L x="85" y="274" fill="#cbd5e1" size={11}>50 m dybde</L>
            <Arrow d="M 180 270 L 230 270" marker={m.teal} color={C.teal} width={2.2} />
            <L x="240" y="274" fill="#7dd3fc" size={10.5}>90° til høyre (35 % fart)</L>

            {/* Dyp 100m: 180° motsatt */}
            <line x1="160" y1="315" x2="350" y2="315" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <L x="85" y="319" fill="#cbd5e1" size={11}>100 m dybde</L>
            <Arrow d="M 180 315 L 145 315" marker={m.low} color={C.low} width={1.8} />
            <L x="195" y="319" fill="#fca5a5" size={10.5}>180° motsatt (Revers)</L>

            {/* Netto Ekman-transport markør */}
            <rect x="70" y="365" width="310" height="38" rx="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
            <L x="225" y="382" fill="#fef08a" size={12} weight={800} anchor="middle">
              NETTO EKMAN-TRANSPORT = 90° TIL HØYRE
            </L>
            <L x="225" y="396" fill="#bae6fd" size={10.5} anchor="middle">
              Vinkelrett på vindretningen over hele Ekman-laget
            </L>
          </g>

          {/* ─── HØYRE: KYSTOPPVELLING (UPWELLING) ─── */}
          <g>
            <L x="685" y="45" fill="#22c55e" size={15} weight={800} anchor="middle">
              2. Kystoppvelling (Upwelling) i praksis
            </L>
            <L x="685" y="65" fill={C.muted} size={11.5} anchor="middle">
              Nordavind langs norskekysten trekker næringsrikt dypvann til overflaten
            </L>

            {/* Land/Kystblokk (til høyre) */}
            <path
              d="M 820 120 L 890 120 L 890 380 L 780 380 Q 790 300 810 220 L 820 120 Z"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="2"
            />
            <L x="850" y="150" fill="#f8fafc" size={13} weight={800} anchor="middle">Kyst / Land</L>
            <L x="850" y="168" fill="#94a3b8" size={10.5} anchor="middle">(Norge)</L>

            {/* Havbasseng */}
            <path
              d="M 490 140 L 820 140 Q 810 220 780 380 L 490 380 Z"
              fill={`url(#${uid}-sea-col)`}
              stroke="#0284c7"
              strokeWidth="1.5"
            />
            <L x="530" y="160" fill="#bae6fd" size={11} weight={700}>Åpent hav</L>

            {/* Vindvektor inn i planet (nordavind sørover) */}
            <circle cx="750" cy="115" r="14" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="750" y="119" fill="#0f172a" fontSize="12" fontWeight="900" textAnchor="middle">⊗</text>
            <L x="730" y="100" fill="#fef08a" size={11.5} weight={800} anchor="end">Nordavind (sørover)</L>

            {/* Overflatevann som skyves vekk fra kysten (mot venstre) */}
            <Arrow d="M 780 150 L 580 150" marker={m.teal} color={C.teal} width={3.8} />
            <L x="680" y="170" fill="#38bdf8" size={11.5} weight={800} anchor="middle">
              Ekman-transport utover i havet ➔ ➔
            </L>

            {/* Oppvelling av dypvann (krum bue opp langs bunnen) */}
            <path
              d="M 770 360 Q 740 280 720 220 T 700 160"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.2"
              strokeDasharray="6 4"
            />
            <Arrow d="M 715 190 L 700 155" marker={m.cold} color={C.cold} width={3} />
            <L x="650" y="270" fill="#7dd3fc" size={12} weight={800}>
              OPPVELLING
            </L>
            <L x="650" y="288" fill="#bae6fd" size={10.5}>
              Kaldt, næringsrikt dypvann
            </L>
            <L x="650" y="304" fill="#86efac" size={10.5} weight={700}>
              Næring til alger & fisk!
            </L>

            {/* Animerte bobler/partikler som stiger opp */}
            {Array.from({ length: 4 }).map((_, i) => (
              <circle key={`upwell-bubble-${i}`} r="4" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5">
                <animateMotion dur="3.4s" repeatCount="indefinite" begin={`-${i * 0.85}s`}>
                  <mpath href={`#${uid}-upwell-path`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        </>
      )}
    </Diagram>
  );
}

// ─── LEGACY DIAGRAMMER (BEHOLDES FOR BAKOVERKOMPATIBILITET MED EKSAMENSFIGURER) ───

export function RotationSpeedDiagram() {
  return (
    <Diagram
      title="Jordas omløpshastighet avtar mot polene"
      heading="Ekvator suser østover, polene står nesten stille"
      caption="Hele jorda bruker ett døgn på en runde, men omkretsen er størst ved ekvator. Der er farten mot øst omtrent 1670 km/t. Ved 60° er den omtrent halvparten. Ved polen er den null. Luft som bytter bredde, tar med seg den østlige farten den hadde."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <ellipse cx="280" cy="180" rx="150" ry="150" fill="#152028" stroke={C.teal} strokeWidth="2.2" />
          <ellipse cx="280" cy="180" rx="55" ry="150" fill="none" stroke={C.dim} />
          <line x1="130" y1="180" x2="430" y2="180" stroke={C.dim} />
          <Arrow d="M 300 180 L 500 180" marker={m.warm} color={C.warm} width={3.4} />
          <Arrow d="M 310 105 L 430 105" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 318 70 L 400 70" marker={m.cold} color={C.cold} width={2.2} />
          <circle cx="280" cy="32" r="5" fill={C.cold} />
          <L x="560" y="78" fill={C.cold} size={15}>90° · 0 km/t</L>
          <L x="560" y="110" fill={C.teal} size={15}>60° · ca. 840 km/t</L>
          <L x="560" y="186" fill={C.warm} size={15}>0° · ca. 1670 km/t østover</L>
          <L x="280" y="340" fill={C.muted} size={13} anchor="middle">
            sett ovenfra vil østlig fart være størst der jorda er «bredest»
          </L>
        </>
      )}
    </Diagram>
  );
}

export function PolewardParcelDiagram() {
  return (
    <Diagram
      title="Luft mot polen bøyes østover"
      heading="Hvorfor avbøyningen går til høyre i nord"
      caption="Luft som starter ved ekvator, har stor østlig fart. Lenger nord roterer bakken saktere. Lufta kommer derfor «foran» — øst for — det punktet den siktet mot. På nordlig halvkule oppleves det som avbøyning til høyre."
      viewBox="0 0 820 340"
    >
      {(m) => (
        <>
          <rect x="70" y="40" width="680" height="250" fill="#122026" rx="8" />
          <L x="90" y="70" fill={C.muted} size={13}>nord</L>
          <L x="90" y="270" fill={C.muted} size={13}>ekvator</L>
          <Arrow d="M 180 250 L 180 80" marker={m.muted} color={C.muted} width={2.2} dash="7 6" />
          <L x="198" y="150" fill={C.muted} size={13}>tenkt rett linje</L>
          <Arrow d="M 180 250 C 180 180, 280 120, 430 80" marker={m.teal} color={C.teal} width={3.2} />
          <L x="360" y="168" fill={C.teal} size={15}>virkelig bane · mot høyre</L>
          <L x="430" y="68" fill={C.fg} size={14}>øst for målet</L>
          <L x="410" y="318" fill={C.muted} size={13} anchor="middle">øst →</L>
        </>
      )}
    </Diagram>
  );
}

export function CoriolisDiagram() {
  return (
    <Diagram
      title="Avbøyning rundt trykksystemer"
      heading="Høyre i nord, venstre i sør"
      caption="Trykkgradienten vil sende luft rett fra H til L (stiplet). Coriolis dreier banen til høyre på nordlig halvkule og til venstre på sørlig. Når de to kreftene balanserer, går vinden langs isobarene — geostrofisk vind."
      viewBox="0 0 840 330"
    >
      {(m) => (
        <>
          <L x="210" y="36" size={16} anchor="middle" weight={600}>Nordlig halvkule</L>
          <L x="630" y="36" size={16} anchor="middle" weight={600}>Sørlig halvkule</L>
          <line x1="420" y1="50" x2="420" y2="300" stroke={C.dim} />
          <circle cx="90" cy="165" r="26" fill="none" stroke={C.teal} strokeWidth="2.2" />
          <L x="90" y="171" fill={C.teal} size={16} anchor="middle">H</L>
          <circle cx="340" cy="165" r="26" fill="none" stroke={C.low} strokeWidth="2.2" />
          <L x="340" y="171" fill={C.low} size={16} anchor="middle">L</L>
          <Arrow d="M 118 165 L 312 165" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />
          <L x="215" y="152" fill={C.muted} size={12} anchor="middle">trykkgradientkraft (rett mot L)</L>
          <Arrow d="M 118 165 C 190 165, 240 242, 318 218" marker={m.teal} color={C.teal} width={3.2} />
          <L x="215" y="255" fill={C.teal} size={14} weight={600} anchor="middle">avbøyd til høyre (NH)</L>

          <circle cx="510" cy="165" r="26" fill="none" stroke={C.teal} strokeWidth="2.2" />
          <L x="510" y="171" fill={C.teal} size={16} anchor="middle">H</L>
          <circle cx="760" cy="165" r="26" fill="none" stroke={C.low} strokeWidth="2.2" />
          <L x="760" y="171" fill={C.low} size={16} anchor="middle">L</L>
          <Arrow d="M 538 165 L 732 165" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />
          <L x="635" y="152" fill={C.muted} size={12} anchor="middle">trykkgradientkraft (rett mot L)</L>
          <Arrow d="M 538 165 C 610 165, 660 88, 738 112" marker={m.teal} color={C.teal} width={3.2} />
          <L x="635" y="78" fill={C.teal} size={14} weight={600} anchor="middle">avbøyd til venstre (SH)</L>
        </>
      )}
    </Diagram>
  );
}

export function CoriolisLatitudeDiagram() {
  return (
    <Diagram
      title="Coriolisparameteren øker mot polene"
      heading="f = 2Ω sin φ"
      caption="Ω er jordas vinkelhastighet, φ er breddegraden. Ved ekvator er sin 0° = 0, så f = 0. Ved 60°N (Norge) er sin 60° = 0,87 — nesten like sterkt som ved polen. Derfor spinner ikke tropiske sykloner på ekvator, mens lavtrykk over Norskehavet gjør det lett."
      viewBox="0 0 820 300"
    >
      {(m) => (
        <>
          <line x1="80" y1="240" x2="760" y2="240" stroke={C.dim} />
          <line x1="80" y1="40" x2="80" y2="240" stroke={C.dim} />
          <L x="70" y="48" fill={C.muted} size={13} anchor="end">|f|</L>
          <L x="80" y="268" fill={C.muted} size={13} anchor="middle">0°</L>
          <L x="306" y="268" fill={C.muted} size={13} anchor="middle">30°</L>
          <L x="533" y="268" fill={C.muted} size={13} anchor="middle">60°</L>
          <L x="760" y="268" fill={C.muted} size={13} anchor="middle">90°</L>
          <path d="M 80 240 Q 220 230, 306 180 T 533 92 T 760 48" fill="none" stroke={C.teal} strokeWidth="3" />
          <circle cx="80" cy="240" r="6" fill={C.teal} />
          <circle cx="533" cy="92" r="6" fill={C.teal} />
          <Arrow d="M 533 92 L 533 40" marker={m.fg} color={C.fg} width={1.6} />
          <L x="545" y="36" size={14}>Norge</L>
          <L x="96" y="230" fill={C.muted} size={13}>null ved ekvator</L>
        </>
      )}
    </Diagram>
  );
}

export function CycloneSpinDiagram() {
  return (
    <Diagram
      title="Lavtrykk og høytrykk spinner motsatt vei"
      heading="Syklonalt mot klokken i nord"
      caption="Luft strømmer inn mot L og ut fra H. Coriolis bøyer den til høyre. Rundt lavtrykk på nordlig halvkule blir det rotasjon mot klokken; rundt høytrykk med klokken. På sørlig halvkule er alt speilvendt. En orkan er det samme mønsteret, bare varmere og strammere."
      viewBox="0 0 820 320"
    >
      {(m) => (
        <>
          <L x="220" y="36" size={16} anchor="middle" weight={600}>Lavtrykk (NH)</L>
          <L x="600" y="36" size={16} anchor="middle" weight={600}>Høytrykk (NH)</L>
          <circle cx="220" cy="175" r="28" fill="none" stroke={C.low} strokeWidth="2.4" />
          <L x="220" y="181" fill={C.low} size={18} anchor="middle">L</L>
          <Arrow d="M 220 70 A 105 105 0 0 0 115 175" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 115 175 A 105 105 0 0 0 220 280" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 220 280 A 105 105 0 0 0 325 175" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 325 175 A 105 105 0 0 0 220 70" marker={m.low} color={C.low} width={2.6} />
          <L x="220" y="308" fill={C.muted} size={13} anchor="middle">mot klokken</L>

          <circle cx="600" cy="175" r="28" fill="none" stroke={C.teal} strokeWidth="2.4" />
          <L x="600" y="181" fill={C.teal} size={18} anchor="middle">H</L>
          <Arrow d="M 600 70 A 105 105 0 0 1 705 175" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 705 175 A 105 105 0 0 1 600 280" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 600 280 A 105 105 0 0 1 495 175" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 495 175 A 105 105 0 0 1 600 70" marker={m.teal} color={C.teal} width={2.6} />
          <L x="600" y="308" fill={C.muted} size={13} anchor="middle">med klokken</L>
        </>
      )}
    </Diagram>
  );
}

export function CoriolisScaleDiagram() {
  return (
    <Diagram
      title="Coriolis krever stor skala"
      heading="Vasken lyver, orkanen forteller sannheten"
      caption="Coriolis er svak. Den vinner bare når bevegelsen er stor og varer lenge, og friksjonen er liten. Derfor styrer den Golfstrømmen og et lavtrykk, men ikke vannet i en vask — der avgjør kummens form og hvordan vannet slås på."
      viewBox="0 0 820 240"
    >
      {() => (
        <>
          {[
            { x: 50, title: "Vask / toalett", note: "meter · sekunder", ok: false },
            { x: 300, title: "Fotballstadion", note: "100 m · minutter", ok: false },
            { x: 550, title: "Lavtrykk / orkan", note: "100–1000 km · døgn", ok: true },
          ].map((b) => (
            <g key={b.title}>
              <rect
                x={b.x}
                y="50"
                width="220"
                height="140"
                rx="10"
                fill="#152028"
                stroke={b.ok ? C.teal : C.dim}
                strokeWidth="2"
              />
              <L x={b.x + 110} y="100" size={16} anchor="middle" weight={600}>{b.title}</L>
              <L x={b.x + 110} y="128" fill={C.muted} size={13} anchor="middle">{b.note}</L>
              <L x={b.x + 110} y="160" fill={b.ok ? C.teal : C.muted} size={14} anchor="middle">
                {b.ok ? "coriolis styrer" : "coriolis taper"}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}

export function ZonalMeridionalDiagram() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Diagram
        title="Zonal form: jetstrømmen går nesten rett vest–øst. Meridional form: den svinger i Rossby-bølger mot nord og sør, med rygg og tråg."
        heading="To grunnformer"
        caption="Zonal form: nesten rett vest–øst, parallelt med breddegradene. Meridional form, eller bølgeform: jetstrømmen svinger i store bølger mot nord og sør. Det er Rossby-bølger. En rygg peker mot polene. En tråg peker mot ekvator."
        viewBox="0 0 440 560"
      >
        {(m) => (
          <>
            <L x="220" y="36" size={16} anchor="middle" weight={600}>Zonal form</L>
            <line x1="48" y1="70" x2="392" y2="70" stroke={C.dim} />
            <line x1="48" y1="132" x2="392" y2="132" stroke={C.dim} />
            <line x1="48" y1="194" x2="392" y2="194" stroke={C.dim} />
            <L x="36" y="74" fill={C.muted} size={12} anchor="end">pol</L>
            <L x="36" y="198" fill={C.muted} size={12} anchor="end">ekvator</L>
            <path d="M 56 132 H 384" fill="none" stroke={C.teal} strokeWidth="10" opacity="0.28" />
            <Arrow d="M 64 132 L 368 132" marker={m.teal} color={C.teal} width={3.2} />
            <circle cx="150" cy="132" r="14" fill="none" stroke={C.low} strokeWidth="2" />
            <L x="150" y="137" fill={C.low} size={13} anchor="middle">L</L>
            <circle cx="290" cy="132" r="14" fill="none" stroke={C.low} strokeWidth="2" />
            <L x="290" y="137" fill={C.low} size={13} anchor="middle">L</L>
            <L x="220" y="108" fill={C.teal} size={13} anchor="middle">vest → øst</L>
            <L x="220" y="230" fill={C.muted} size={13} anchor="middle">parallelt med breddegradene</L>

            <line x1="40" y1="258" x2="400" y2="258" stroke={C.dim} />

            <L x="220" y="292" size={16} anchor="middle" weight={600}>Meridional form</L>
            <L x="220" y="312" fill={C.muted} size={13} anchor="middle">Rossby-bølger</L>
            <path
              d="M 48 410 C 100 410, 118 328, 176 328 C 234 328, 252 410, 292 410 C 332 410, 350 492, 400 492"
              fill="none"
              stroke={C.teal}
              strokeWidth="10"
              opacity="0.28"
            />
            <Arrow
              d="M 56 410 C 100 410, 118 328, 176 328 C 234 328, 252 410, 292 410 C 332 410, 350 492, 392 492"
              marker={m.teal}
              color={C.teal}
              width={3.2}
            />
            <Arrow d="M 176 320 L 176 286" marker={m.warm} color={C.warm} width={2.2} />
            <L x="186" y="282" fill={C.warm} size={13}>rygg · mild luft</L>
            <L x="48" y="322" fill={C.muted} size={12}>mot polene</L>
            <Arrow d="M 368 500 L 368 538" marker={m.cold} color={C.cold} width={2.2} />
            <L x="48" y="538" fill={C.cold} size={13}>tråg · kald luft</L>
            <L x="356" y="538" fill={C.muted} size={12} anchor="end">mot ekvator</L>
          </>
        )}
      </Diagram>
    </div>
  );
}

export function TradeDeflectionDiagram() {
  return (
    <Diagram
      title="Hvorfor passaten kommer fra nordøst"
      heading="Rett sydlig blir nordøstlig"
      caption="Hadley-cellen vil sende luft rett mot ekvator. Coriolis bøyer den til høyre på nordlig halvkule, så vinden får en østlig komponent: nordøstpassaten. På sørlig halvkule blir det sørøstpassat. Uten coriolis ville «passatene» vært rene nord–sør-vinder."
      viewBox="0 0 820 300"
    >
      {(m) => (
        <>
          <line x1="80" y1="70" x2="740" y2="70" stroke={C.dim} />
          <L x="80" y="58" fill={C.muted} size={13}>30° · subtropisk høytrykk</L>
          <line x1="80" y1="240" x2="740" y2="240" stroke={C.warm} strokeWidth="2" />
          <L x="80" y="268" fill={C.warm} size={13}>ekvator · lavtrykk</L>
          <Arrow d="M 250 90 L 250 220" marker={m.muted} color={C.muted} width={2} dash="7 6" />
          <L x="266" y="150" fill={C.muted} size={13}>uten coriolis</L>
          <Arrow d="M 480 90 L 360 220" marker={m.teal} color={C.teal} width={3.2} />
          <L x="500" y="150" fill={C.teal} size={15}>nordøstpassat</L>
        </>
      )}
    </Diagram>
  );
}

export function NaoDiagram() {
  return (
    <Diagram
      title="NAO er trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket."
      heading="NAO: Azorene mot Island"
      caption="Positiv NAO: stor forskjell, jet og stormbane lenger nord. Negativ NAO: liten forskjell, mer blocking og kaldere Skandinavia."
      viewBox="0 0 820 320"
    >
      {(m) => (
        <>
          <circle cx="230" cy="230" r="34" fill="none" stroke={C.teal} strokeWidth="2.4" />
          <L x={230} y={236} fill={C.teal} size={18} anchor="middle">H</L>
          <L x={230} y={278} fill={C.muted} size={13} anchor="middle">Azorene</L>
          <circle cx="430" cy="88" r="34" fill="none" stroke={C.low} strokeWidth="2.4" />
          <L x={430} y={94} fill={C.low} size={18} anchor="middle">L</L>
          <L x={430} y={48} fill={C.muted} size={13} anchor="middle">Island</L>
          <Arrow d="M 270 210 L 560 150" marker={m.teal} color={C.teal} width={3} />
          <L x={400} y={198} fill={C.teal} size={14}>vestavind mot Norge</L>
          <L x={620} y={80} fill={C.fg} size={15} weight={600}>+ NAO</L>
          <L x={620} y={104} fill={C.muted} size={13}>stor gradient</L>
          <L x={620} y={128} fill={C.muted} size={13}>jet lenger nord</L>
          <L x={620} y={200} fill={C.fg} size={15} weight={600}>− NAO</L>
          <L x={620} y={224} fill={C.muted} size={13}>liten gradient</L>
          <L x={620} y={248} fill={C.muted} size={13}>mer blocking</L>
        </>
      )}
    </Diagram>
  );
}
