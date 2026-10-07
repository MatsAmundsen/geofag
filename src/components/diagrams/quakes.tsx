import { Arrow, C, Diagram, L } from "./svg-kit";

function Star({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  const inner = r * 0.38;
  const d = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : inner;
    const cmd = i === 0 ? "M" : "L";
    return `${cmd} ${x + Math.cos(a) * rad} ${y + Math.sin(a) * rad}`;
  }).join(" ");
  return <path d={`${d} Z`} fill={C.low} />;
}

export function BoundaryQuakesDiagram() {
  return (
    <Diagram
      title="Skjelv ved rygg, transform og der en plate synker."
      heading="Skjelv ved plategrenser"
      caption="Skjelv oppstår ved midthavsrygger. Transformforkastninger er kjent for grunne skjelv. Der en havbunnsplate synker, blir skjelvene sterke og ødeleggende. De store skjelvene sitter ved plategrenser, ikke inne på en plate slik som i Norge."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <rect x="40" y="248" width="740" height="112" fill="#152028" />
          <L x="56" y="312" fill={C.muted} size={14}>
            astenosfære (duktil mantel)
          </L>

          <path
            d="M 40 168 H 130 L 155 128 L 180 168 H 430 L 500 168 L 700 348 H 40 Z"
            fill="#3a3428"
          />
          <path
            d="M 40 148 H 130 L 155 112 L 180 148 H 430 L 500 148 L 518 168 H 180 L 155 136 L 130 168 H 40 Z"
            fill={C.sand}
          />
          <path d="M 500 148 L 700 348 L 780 348 L 780 148 Z" fill="#3a3428" />
          <path
            d="M 500 70 L 540 118 L 590 92 L 650 128 L 710 88 L 760 122 L 780 70 V 148 H 500 Z"
            fill="#4d5c55"
          />
          <path
            d="M 40 70 H 500 V 148 H 180 L 155 112 L 130 148 H 40 Z"
            fill="#16303a"
            opacity="0.85"
          />

          <path d="M 140 248 L 155 118 L 170 248 Z" fill={C.warm} opacity="0.92" />
          <Arrow d="M 155 236 L 155 122" marker={m.warm} color={C.warm} width={2.6} />

          <line
            x1="340"
            y1="70"
            x2="340"
            y2="248"
            stroke={C.teal}
            strokeWidth="2.4"
            strokeDasharray="7 5"
          />
          <circle cx="318" cy="128" r="7" fill="none" stroke={C.teal} strokeWidth="2" />
          <circle cx="318" cy="128" r="2.2" fill={C.teal} />
          <circle cx="362" cy="128" r="7" fill="none" stroke={C.teal} strokeWidth="2" />
          <path d="M 357 123 L 367 133 M 367 123 L 357 133" stroke={C.teal} strokeWidth="1.8" />

          <Arrow d="M 220 140 L 430 140 L 620 320" marker={m.low} color={C.low} width={2.8} />

          <ellipse cx="600" cy="210" rx="24" ry="16" fill={C.warm} opacity="0.85" />
          <Arrow d="M 600 200 L 638 118" marker={m.warm} color={C.warm} width={2.4} />
          <path d="M 618 70 L 642 118 L 666 70 Z" fill={C.low} />

          <Star x={155} y={132} />
          <Star x={340} y={132} />
          <Star x={530} y={188} r={6.5} />
          <Star x={590} y={248} r={6.5} />
          <Star x={650} y={308} r={6.5} />

          <Arrow d="M 188 102 L 162 126" marker={m.low} color={C.low} width={2} />
          <Arrow d="M 372 102 L 348 126" marker={m.low} color={C.low} width={2} />
          <Arrow d="M 560 168 L 538 184" marker={m.low} color={C.low} width={2} />

          <L x="96" y={96} fill={C.cold} size={14}>
            midthavsrygg
          </L>
          <L x="188" y={92} fill={C.low} size={13}>
            grunne skjelv
          </L>
          <L x="348" y={92} fill={C.low} size={13} anchor="middle">
            transform
          </L>
          <L x="56" y="198" fill={C.muted} size={14}>
            litosfære
          </L>
          <L x="430" y="218" fill={C.low} size={14}>
            synkende plate
          </L>
          <L x="560" y="168" fill={C.low} size={13} anchor="end">
            skjelv i platen
          </L>
          <L x="680" y="58" fill={C.low} size={15}>
            vulkanbue
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SeismogramDiagram() {
  return (
    <Diagram
      title="Seismogram og seismiske bølger"
      heading="P-bølger, S-bølger og lokalisering av episenter"
      caption="P-bølgen kommer først, S-bølgen etter. Tidsforskjellen mellom dem blir større jo lenger unna skjelvet er, og tre stasjoner kan derfor peke ut episenteret. Bølgene langs overflaten kommer sist og rister bygningene mest."
      viewBox="0 0 840 420"
    >
      {() => (
        <>
          {/* Seismogram boks */}
          <rect x="30" y="30" width="540" height="230" rx="8" fill="#111c24" stroke={C.dim} strokeWidth="1.6" />
          <L x="45" y="54" fill={C.muted} size={13} weight={600}>
            Tidsakse (sekunder etter brudd) →
          </L>
          <line x1="40" y1="150" x2="550" y2="150" stroke="#1f2f3a" strokeWidth="1.2" strokeDasharray="4 4" />

          {/* Seismogram kurve */}
          {/* Før P-bølge: støy */}
          <path
            d="M 40 150 L 70 149 L 90 151 L 110 150 L 130 149 L 150 150"
            fill="none"
            stroke={C.dim}
            strokeWidth="1.8"
          />

          {/* P-bølge ankomst ved x=150 */}
          <path
            d="M 150 150 L 158 136 L 166 164 L 174 138 L 182 160 L 190 142 L 198 158 L 206 144 L 214 155 L 222 147 L 230 153 L 240 148 L 250 152 L 260 149 L 270 151 L 280 150"
            fill="none"
            stroke={C.teal}
            strokeWidth="2.2"
          />
          <line x1="150" y1="70" x2="150" y2="230" stroke={C.teal} strokeDasharray="3 3" strokeWidth="1.4" />
          <L x="150" y="86" fill={C.teal} size={14} weight={700} anchor="middle">
            P-bølge ankomst
          </L>
          <L x="150" y="104" fill={C.muted} size={11} anchor="middle">
            (kompresjon, kommer først)
          </L>

          {/* S-bølge ankomst ved x=280 */}
          <path
            d="M 280 150 L 290 115 L 302 185 L 314 118 L 326 180 L 338 125 L 350 172 L 362 132 L 374 165 L 386 138 L 398 160 L 410 150"
            fill="none"
            stroke={C.warm}
            strokeWidth="2.4"
          />
          <line x1="280" y1="70" x2="280" y2="230" stroke={C.warm} strokeDasharray="3 3" strokeWidth="1.4" />
          <L x="280" y="86" fill={C.warm} size={14} weight={700} anchor="middle">
            S-bølge ankomst
          </L>
          <L x="280" y="104" fill={C.muted} size={11} anchor="middle">
            (skjær, kommer etter)
          </L>

          {/* Tidsdifferanse Δt markering */}
          <line x1="150" y1="215" x2="280" y2="215" stroke={C.sand} strokeWidth="2.2" />
          <line x1="150" y1="208" x2="150" y2="222" stroke={C.sand} strokeWidth="2" />
          <line x1="280" y1="208" x2="280" y2="222" stroke={C.sand} strokeWidth="2" />
          <L x="215" y="234" fill={C.sand} size={13} weight={700} anchor="middle">
            tidsforskjell gir avstand
          </L>

          {/* Overflatebølger ankomst ved x=410 */}
          <path
            d="M 410 150 L 424 75 L 442 225 L 460 82 L 478 215 L 496 95 L 514 195 L 530 120 L 544 168 L 554 150"
            fill="none"
            stroke={C.low}
            strokeWidth="2.8"
          />
          <line x1="410" y1="70" x2="410" y2="230" stroke={C.low} strokeDasharray="3 3" strokeWidth="1.4" />
          <L x="470" y="58" fill={C.low} size={14} weight={700} anchor="middle">
            Overflatebølger (Rayleigh / Love)
          </L>
          <L x="470" y="74" fill={C.muted} size={11} anchor="middle">
            (størst amplitude · mest ødeleggelse)
          </L>

          {/* Høyre panel: Triangulering med 3 stasjoner */}
          <rect x="590" y="30" width="220" height="230" rx="8" fill="#152028" stroke={C.dim} strokeWidth="1.6" />
          <L x="700" y="54" fill={C.fg} size={14} weight={700} anchor="middle">
            Triangulering av episenter
          </L>

          {/* Sirkler for stasjon A, B, C */}
          <circle cx="670" cy="115" r="48" fill="none" stroke={C.teal} strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
          <circle cx="730" cy="120" r="42" fill="none" stroke={C.warm} strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
          <circle cx="700" cy="180" r="52" fill="none" stroke={C.rain} strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />

          {/* Stasjonsmarkører */}
          <circle cx="670" cy="115" r="3.5" fill={C.teal} />
          <L x="658" y="112" fill={C.teal} size={11} weight={600}>A</L>

          <circle cx="730" cy="120" r="3.5" fill={C.warm} />
          <L x="736" y="118" fill={C.warm} size={11} weight={600}>B</L>

          <circle cx="700" cy="180" r="3.5" fill={C.rain} />
          <L x="700" y="196" fill={C.rain} size={11} weight={600} anchor="middle">C</L>

          {/* Skjæringspunkt: Episenter */}
          <Star x={700} y={138} r={8} />
          <L x="700" y="154" fill={C.low} size={12} weight={700} anchor="middle">
            Episenter
          </L>
          <L x="700" y="246" fill={C.muted} size={11} anchor="middle">
            Tre sirkler krysser i ett punkt
          </L>

          {/* Sammenligningstabell nederst */}
          <rect x="30" y="280" width="780" height="120" rx="8" fill="#16222b" stroke={C.dim} strokeWidth="1.4" />
          
          <L x="50" y="306" fill={C.fg} size={14} weight={700}>
            Egenskap
          </L>
          <L x="230" y="306" fill={C.teal} size={14} weight={700}>
            P-bølger (primære)
          </L>
          <L x="440" y="306" fill={C.warm} size={14} weight={700}>
            S-bølger (sekundære)
          </L>
          <L x="650" y="306" fill={C.low} size={14} weight={700}>
            Overflatebølger
          </L>

          <line x1="40" y1="316" x2="800" y2="316" stroke={C.dim} />

          <L x="50" y="338" fill={C.muted} size={12}>Bølgetype & bevegelse:</L>
          <L x="230" y="338" fill={C.fg} size={12}>Lengdebølge (trykk/drag)</L>
          <L x="440" y="338" fill={C.fg} size={12}>Tverrbølge (skjær, opp/ned)</L>
          <L x="650" y="338" fill={C.fg} size={12}>Rullebølge / sidebølge</L>

          <L x="50" y="362" fill={C.muted} size={12}>Hastighet i jordskorpen:</L>
          <L x="230" y="362" fill={C.fg} size={12}>Raskest</L>
          <L x="440" y="362" fill={C.fg} size={12}>Langsommere</L>
          <L x="650" y="362" fill={C.fg} size={12}>Tregest</L>

          <L x="50" y="386" fill={C.muted} size={12}>Utbredelse i væsker:</L>
          <L x="230" y="386" fill={C.teal} size={12} weight={600}>Går gjennom fast og væske</L>
          <L x="440" y="386" fill={C.warm} size={12} weight={600}>Stanser i væske (ytre kjerne)</L>
          <L x="650" y="386" fill={C.low} size={12} weight={600}>Kun langs overflaten</L>
        </>
      )}
    </Diagram>
  );
}

export {
  CalderaFormationDiagram,
  IcelandContrastDiagram,
  JanMayenDiagram,
  MagmaViscosityDiagram,
  VeiScaleDiagram,
  VolcanicHazardsDiagram,
  VolcanicWinterDiagram,
  VolcanoEruptionAnatomyDiagram,
  VolcanoMonitoringDiagram,
  VolcanoTypesDiagram,
} from "./volcanoes";

export function EarthquakeWavePhysicsDiagram() {
  return (
    <Diagram
      title="P-bølger, S-bølger og skyggesonen"
      heading="Hvorfor den ytre kjernen må være flytende"
      caption="P-bølger er kompresjon og går gjennom både fast berg og væske. S-bølger er skjær og stopper i væske. Derfor kommer ikke S-bølgene fram på den andre siden av jorda. R.D. Oldham så dette i jordskjelvregistreringer i 1906, og kjernen ble identifisert."
      viewBox="0 0 880 430"
    >
      {() => (
        <>
          {/* Venstre panel: Partikkelbevegelse P-bølge og S-bølge */}
          <rect x="25" y="25" width="390" height="380" rx="8" fill="#131c24" stroke={C.dim} strokeWidth="1.4" />
          <L x="45" y="52" fill={C.teal} size={15} weight={700}>
            Partikkelfysikk: Romlige bølger (Body waves)
          </L>

          {/* P-bølge visualisering */}
          <rect x="40" y="70" width="360" height="135" rx="6" fill="#1a252f" />
          <L x="55" y="92" fill={C.teal} size={14} weight={700}>
            P-bølge: Longitudinell kompresjonsbølge
          </L>
          {/* Kompresjonsrutenett */}
          <g transform="translate(55, 105)">
            {/* Tett kompresjon */}
            <rect x="0" y="0" width="15" height="40" fill={C.teal} opacity="0.8" />
            <rect x="18" y="0" width="15" height="40" fill={C.teal} opacity="0.8" />
            {/* Dilatasjon (strekk) */}
            <rect x="45" y="0" width="15" height="40" fill={C.teal} opacity="0.3" />
            <rect x="75" y="0" width="15" height="40" fill={C.teal} opacity="0.3" />
            {/* Kompresjon */}
            <rect x="105" y="0" width="15" height="40" fill={C.teal} opacity="0.8" />
            <rect x="123" y="0" width="15" height="40" fill={C.teal} opacity="0.8" />
            {/* Dilatasjon */}
            <rect x="150" y="0" width="15" height="40" fill={C.teal} opacity="0.3" />
            <rect x="180" y="0" width="15" height="40" fill={C.teal} opacity="0.3" />
            {/* Kompresjon */}
            <rect x="210" y="0" width="15" height="40" fill={C.teal} opacity="0.8" />
            <rect x="228" y="0" width="15" height="40" fill={C.teal} opacity="0.8" />
          </g>
          <L x="55" y="166" fill={C.fg} size={12}>
            Partikkelbevegelse: ↔ Parallelt med bølgens retning
          </L>
          <L x="55" y="186" fill={C.muted} size={11}>
            Går gjennom både fast berg og væske.
          </L>

          {/* S-bølge visualisering */}
          <rect x="40" y="220" width="360" height="170" rx="6" fill="#221b1e" />
          <L x="55" y="244" fill={C.warm} size={14} weight={700}>
            S-bølge: Transversal skjærbølge
          </L>
          {/* Sinuskurve skjær */}
          <path
            d="M 55 295 Q 85 265 115 295 T 175 295 T 235 295 T 295 295 T 355 295"
            fill="none"
            stroke={C.warm}
            strokeWidth="3.5"
          />
          {/* Skjærpiler opp og ned */}
          <path d="M 85 275 V 260 M 85 260 L 80 268 M 85 260 L 90 268" stroke={C.sand} strokeWidth="1.8" />
          <path d="M 145 315 V 330 M 145 330 L 140 322 M 145 330 L 150 322" stroke={C.sand} strokeWidth="1.8" />
          <L x="55" y="340" fill={C.fg} size={12}>
            Partikkelbevegelse: ↕ Vinkelrett på bølgens retning
          </L>
          <L x="55" y="360" fill={C.muted} size={11}>
            Krever at stoffet kan skjæres, altså at det er fast.
          </L>
          <L x="55" y="378" fill={C.low} size={11} weight={700}>
            I væske stanser S-bølgene.
          </L>

          {/* Høyre panel: Jordkloden og S-bølgenes skyggesone */}
          <rect x="440" y="25" width="415" height="380" rx="8" fill="#121820" stroke={C.dim} strokeWidth="1.4" />
          <L x="460" y="52" fill={C.fg} size={15} weight={700}>
            Oldhams oppdagelse (1906): S-bølgenes skyggesone
          </L>

          {/* Globus */}
          <g transform="translate(645, 230)">
            {/* Mantel */}
            <circle cx="0" cy="0" r="140" fill="#2d251d" stroke="#524335" strokeWidth="2" />
            {/* Ytre flytende kjerne */}
            <circle cx="0" cy="0" r="75" fill="#4d1b1f" stroke={C.low} strokeWidth="2" />
            {/* Indre fast kjerne */}
            <circle cx="0" cy="0" r="28" fill={C.warm} />

            {/* Jordskjelvfokus på toppen (nordpol x=0, y=-140) */}
            <Star x={0} y={-140} r={9} />
            <L x="0" y={-152} fill={C.low} size={12} weight={700} anchor="middle">
              Jordskjelvfokus (0°)
            </L>

            {/* S-bølger som bøyer av i mantelen frem til 103° */}
            {/* Venstre side */}
            <path d="M 0 -138 Q -70 -100 -120 -60" fill="none" stroke={C.warm} strokeWidth="2.2" />
            <path d="M 0 -138 Q -90 -60 -136 20" fill="none" stroke={C.warm} strokeWidth="2.2" />
            <path d="M 0 -138 Q -105 -20 -110 85" fill="none" stroke={C.warm} strokeWidth="2.2" />

            {/* Høyre side */}
            <path d="M 0 -138 Q 70 -100 120 -60" fill="none" stroke={C.warm} strokeWidth="2.2" />
            <path d="M 0 -138 Q 90 -60 136 20" fill="none" stroke={C.warm} strokeWidth="2.2" />
            <path d="M 0 -138 Q 105 -20 110 85" fill="none" stroke={C.warm} strokeWidth="2.2" />

            {/* Skyggesone vinkelbue (103° til 180° på begge sider) */}
            <path
              d="M -110 85 A 140 140 0 0 0 110 85 L 0 0 Z"
              fill="#ef4444"
              opacity="0.18"
            />
            <line x1="0" y1="0" x2="-110" y2="85" stroke={C.low} strokeDasharray="4 3" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="110" y2="85" stroke={C.low} strokeDasharray="4 3" strokeWidth="1.5" />

            <L x="-125" y="95" fill={C.low} size={11} weight={700}>103°</L>
            <L x="115" y="95" fill={C.low} size={11} weight={700}>103°</L>
            <L x="0" y="155" fill={C.low} size={12} weight={700} anchor="middle">180°</L>

            <L x="0" y="115" fill={C.low} size={13} weight={700} anchor="middle">
              S-bølgenes skyggesone
            </L>
            <L x="0" y="130" fill="#fca5a5" size={10} anchor="middle">
              (Ingen direkte S-bølger slipper gjennom)
            </L>

            {/* Etiketter på kjerne */}
            <L x="0" y="-35" fill="#fff" size={11} weight={700} anchor="middle">
              Flytende ytre kjerne
            </L>
            <L x="0" y="4" fill="#000" size={9} weight={700} anchor="middle">
              Fast kjerne
            </L>
          </g>

          <L x="460" y="395" fill={C.muted} size={11}>
            S-bølger stanser ved grensen mot den flytende ytre kjernen.
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ElasticReboundDiagram() {
  return (
    <Diagram
      title="Elastisk tilbakefjæring"
      heading="Hvordan et jordskjelv bygges opp og utløses"
      caption="1: Forkastningen er i ro. 2: Platene drar, men friksjonen låser flaten, så fjellet bøyes som en spent fjær. 3: Når spenningen blir stor nok, ryker låsen. Fjellet spretter tilbake, og energien sprer seg som seismiske bølger. 4: Forskyvningen på overflaten blir stående."
      viewBox="0 0 880 390"
    >
      {() => (
        <>
          {/* 4 paneler horisontalt */}
          {/* PANEL 1: Uforstyrret tilstand */}
          <rect x="20" y="30" width="195" height="330" rx="8" fill="#131b22" stroke={C.dim} strokeWidth="1.4" />
          <L x="35" y="55" fill={C.teal} size={13} weight={700}>
            1. Uforstyrret bergart
          </L>
          <path d="M 30 110 H 205 V 320 H 30 Z" fill="#24211b" />
          {/* Rett forkastningslinje */}
          <line x1="117" y1="110" x2="117" y2="320" stroke={C.low} strokeWidth="2.5" />
          {/* Rett referanselinje (f.eks. gjerde/vei) */}
          <line x1="45" y1="215" x2="190" y2="215" stroke={C.sand} strokeWidth="3" />
          <L x="117" y="195" fill={C.sand} size={11} weight={600} anchor="middle">
            Rett gjerde / vei
          </L>
          <L x="117" y="130" fill={C.low} size={11} weight={600} anchor="middle">
            Forkastning
          </L>
          <L x="35" y="348" fill={C.muted} size={11}>
            Ingen mekanisk spenning.
          </L>

          {/* PANEL 2: Elastisk spenningsoppbygging */}
          <rect x="235" y="30" width="195" height="330" rx="8" fill="#131b22" stroke={C.dim} strokeWidth="1.4" />
          <L x="250" y="55" fill={C.warm} size={13} weight={700}>
            2. Elastisk tøyning (tiår)
          </L>
          <path d="M 245 110 H 420 V 320 H 245 Z" fill="#24211b" />
          <line x1="332" y1="110" x2="332" y2="320" stroke={C.low} strokeWidth="2.5" />
          {/* Låst friksjonskontakt */}
          <rect x="326" y="195" width="12" height="40" fill={C.low} />
          {/* Bøyd referanselinje (S-form) */}
          <path
            d="M 260 235 Q 310 235 332 215 Q 355 195 405 195"
            fill="none"
            stroke={C.warm}
            strokeWidth="3.5"
          />
          {/* Krefter som dytter */}
          <path d="M 270 140 V 165 M 270 165 L 265 157 M 270 165 L 275 157" stroke={C.teal} strokeWidth="2.4" />
          <path d="M 395 290 V 265 M 395 265 L 390 273 M 395 265 L 400 273" stroke={C.teal} strokeWidth="2.4" />
          <L x="250" y="348" fill={C.warm} size={11}>
            Friksjon låser flaten. Fjellet bøyes som en bue.
          </L>

          {/* PANEL 3: Brudd og tilbakefjæring */}
          <rect x="450" y="30" width="195" height="330" rx="8" fill="#1e1316" stroke={C.low} strokeWidth="1.6" />
          <L x="465" y="55" fill={C.low} size={13} weight={700}>
            3. Brudd og jordskjelv
          </L>
          <path d="M 460 110 H 635 V 320 H 460 Z" fill="#2b1c1e" />
          <line x1="547" y1="110" x2="547" y2="320" stroke={C.low} strokeWidth="3" />
          {/* Seismiske sjokkbølger */}
          <circle cx="547" cy="215" r="22" fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.8" />
          <circle cx="547" cy="215" r="45" fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.5" />
          <Star x={547} y={215} r={10} />
          {/* Lynrask tilbakefjæring */}
          <line x1="475" y1="245" x2="547" y2="245" stroke={C.sand} strokeWidth="3" />
          <line x1="547" y1="185" x2="620" y2="185" stroke={C.sand} strokeWidth="3" />
          <L x="465" y="348" fill="#fca5a5" size={11} weight={600}>
            Friksjonen ryker. Bølgene sprer seg ut.
          </L>

          {/* PANEL 4: Permanent forskyvning */}
          <rect x="665" y="30" width="195" height="330" rx="8" fill="#131b22" stroke={C.dim} strokeWidth="1.4" />
          <L x="680" y="55" fill={C.sand} size={13} weight={700}>
            4. Ny likevekt & forskyvning
          </L>
          <path d="M 675 110 H 850 V 320 H 675 Z" fill="#24211b" />
          <line x1="762" y1="110" x2="762" y2="320" stroke={C.low} strokeWidth="2.5" />
          {/* Rettet opp linjer, men forskjøvet */}
          <line x1="690" y1="245" x2="762" y2="245" stroke={C.sand} strokeWidth="3" />
          <line x1="762" y1="185" x2="835" y2="185" stroke={C.sand} strokeWidth="3" />
          {/* Forskyvningspil */}
          <line x1="772" y1="185" x2="772" y2="245" stroke={C.teal} strokeWidth="2" />
          <L x="785" y="218" fill={C.teal} size={12} weight={700}>
            forskyvning
          </L>
          <L x="680" y="348" fill={C.muted} size={11}>
            Ny spenning kan bygge seg opp.
          </L>
        </>
      )}
    </Diagram>
  );
}

export function NorwayEarthquakesDiagram() {
  return (
    <Diagram
      title="Norges seismiske risikobilde og historiske jordskjelv"
      heading="Hvorfor skjelver Norge når vi ikke er på en plategrense?"
      caption="Norge ligger inne på Den eurasiske platen. Skjelvene kommer likevel, i gamle svakhetssoner. Spredning langs Den midtatlantiske ryggen og landheving etter siste istid bygger spenning som kan reaktivere forkastninger. Lurøy i 1819 er estimert til M 5,9. Oslofjordskjelvet i 1904 var 5,4."
      viewBox="0 0 880 430"
    >
      {() => (
        <>
          {/* Kartbakgrunn Norskehavet og Norge */}
          <rect x="25" y="25" width="480" height="380" rx="8" fill="#111c26" stroke={C.dim} strokeWidth="1.4" />
          
          {/* Norskekysten stilisert kartkontur */}
          <path
            d="M 330 380 Q 280 340 270 290 Q 250 250 290 200 Q 320 170 340 120 Q 370 80 430 45 L 490 45 V 380 Z"
            fill="#2c372e"
            stroke="#47594a"
            strokeWidth="1.8"
          />

          {/* Midthavsryggen og Jan Mayen i vest */}
          <line x1="80" y1="40" x2="140" y2="380" stroke={C.warm} strokeWidth="3" strokeDasharray="6 4" />
          <L x="145" y="370" fill={C.warm} size={11} weight={700}>
            Den midtatlantiske rygg
          </L>
          {/* Jan Mayen vulkan */}
          {/* Ryggskyv-vektorer mot øst */}
          <path d="M 125 100 L 220 120" stroke={C.teal} strokeWidth="2.5" />
          <path d="M 220 120 L 210 112 M 220 120 L 212 126" stroke={C.teal} strokeWidth="2.5" />

          <path d="M 140 220 L 230 235" stroke={C.teal} strokeWidth="2.5" />
          <path d="M 230 235 L 220 227 M 230 235 L 222 241" stroke={C.teal} strokeWidth="2.5" />
          <L x="150" y="260" fill={C.teal} size={12} weight={700}>
            Havbunnsspredning →
          </L>

          {/* Postglasial landheving piler oppover i innlandet */}
          <ellipse cx="400" cy="270" rx="55" ry="40" fill="none" stroke={C.sand} strokeDasharray="4 3" strokeWidth="1.5" />
          <L x="400" y="270" fill={C.sand} size={11} weight={700} anchor="middle">
            Landheving
          </L>
          <L x="400" y="285" fill={C.muted} size={10} anchor="middle">
            etter siste istid
          </L>

          {/* Historiske jordskjelv stjerner */}
          {/* 1. Lurøy 1819 */}
          <Star x={315} y={150} r={11} />
          <rect x="235" y="130" width="70" height="20" rx="4" fill="#0f172a" opacity="0.8" />
          <L x="240" y="144" fill={C.low} size={11} weight={700}>
            Lurøy 1819
          </L>
          <L x="240" y="162" fill="#fca5a5" size={10}>
            M 5,9
          </L>

          {/* 2. Oslofjord 1904 */}
          <Star x={350} y={345} r={9} />
          <rect x="365" y="335" width="105" height="34" rx="4" fill="#0f172a" opacity="0.8" />
          <L x="370" y="348" fill={C.low} size={11} weight={700}>
            Oslofjorden 1904
          </L>
          <L x="370" y="362" fill="#fca5a5" size={10}>
            M 5,4
          </L>

          {/* 3. Nordsjøskjelvet 1989 & sokkelen */}
          <L x="160" y="315" fill={C.fg} size={10} weight={600}>
            Nordsjøen: gamle rifter
          </L>

          {/* Høyre panel: Forklaringstabell og risikofakta */}
          <rect x="525" y="25" width="330" height="380" rx="8" fill="#131a22" stroke={C.dim} strokeWidth="1.4" />
          <L x="545" y="52" fill={C.sand} size={15} weight={700}>
            Nøkkelfakta: Norsk seismisitet
          </L>

          {/* Boks 1: Hvorfor skjelver det? */}
          <rect x="540" y="70" width="300" height="95" rx="6" fill="#1a232c" />
          <L x="552" y="90" fill={C.teal} size={12} weight={700}>
            Hoveddrivkrefter for skjelv i Norge:
          </L>
          <L x="552" y="110" fill={C.fg} size={11}>
            • Havbunnsspredning langs ryggen i vest
          </L>
          <L x="552" y="128" fill={C.fg} size={11}>
            • Landheving etter siste istid
          </L>
          <L x="552" y="146" fill={C.fg} size={11}>
            • Gamle forkastninger som reaktiveres
          </L>

          {/* Boks 2: De mest aktive sonene */}
          <rect x="540" y="175" width="300" height="105" rx="6" fill="#1a232c" />
          <L x="552" y="195" fill={C.warm} size={12} weight={700}>
            Områder med skjelv i Norge:
          </L>
          <L x="552" y="215" fill={C.fg} size={11}>
            • Nordland
          </L>
          <L x="552" y="233" fill={C.fg} size={11}>
            • Vestlandet og Nordsjøen
          </L>
          <L x="552" y="251" fill={C.fg} size={11}>
            • Oslo-riften
          </L>
          <L x="552" y="269" fill={C.fg} size={11}>
            • Svalbard, øst for ryggen
          </L>

          {/* Boks 3: Byggestandarder og Eurokode 8 */}
          <rect x="540" y="290" width="300" height="100" rx="6" fill="#241a1c" />
          <L x="552" y="312" fill={C.low} size={12} weight={700}>
            Sikring av bygg:
          </L>
          <L x="552" y="332" fill={C.muted} size={11}>
            Tettere bebyggelse gjør at et skjelv som 1904 kan gjøre mer skade i dag. Kunnskap og analyser brukes til å sikre bygg.
          </L>
          <L x="552" y="365" fill={C.low} size={11} weight={600}>
            UiB og NORSAR overvåker aktiviteten.
          </L>
        </>
      )}
    </Diagram>
  );
}
