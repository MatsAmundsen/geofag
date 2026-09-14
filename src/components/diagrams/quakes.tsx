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
      title="Grunne skjelv ved rygg og transform. Dype skjelv i den synkende platen ved subduksjon."
      heading="Skjelv ved plategrenser"
      caption="Grunne skjelv oppstår ved midthavsrygger og transformforkastninger der litosfæren er tynn og sprø. Ved subduksjonssone trekkes den kalde oseaniske litosfæren dypt ned i astenosfæren; brudd og fasetransformasjoner i den nedsynkende platen skaper en skrå skjelvsone (Wadati-Benioff-sonen) helt ned til 670–700 kilometers dyp."
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
            grunne skjelv (&lt; 20 km)
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
            Wadati-Benioff-sone
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
      caption="Når et jordskjelv inntreffer, forplanter energien seg som tre hovedgrupper bølger. P-bølgene (primære kompresjonsbølger) er raskest og ankommer først. Deretter kommer S-bølgene (sekundære skjærbølger) med større amplitude. Tidsdifferansen Δt øker lineært med avstanden til episenteret. Overflatebølgene (Rayleigh og Love) ankommer sist, men har størst amplitude og lavest frekvens, og forårsaker de største bygningsødeleggelsene. Tre seismiske stasjoner gir nøyaktig posisjon via sirkeltriangulering."
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
            (kompresjon, ~6 km/s)
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
            (skjærbølge, ~3,5 km/s)
          </L>

          {/* Tidsdifferanse Δt markering */}
          <line x1="150" y1="215" x2="280" y2="215" stroke={C.sand} strokeWidth="2.2" />
          <line x1="150" y1="208" x2="150" y2="222" stroke={C.sand} strokeWidth="2" />
          <line x1="280" y1="208" x2="280" y2="222" stroke={C.sand} strokeWidth="2" />
          <L x="215" y="234" fill={C.sand} size={13} weight={700} anchor="middle">
            Δt = t_S - t_P → gir avstand
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
          <L x="230" y="362" fill={C.fg} size={12}>Raskest (~6–8 km/s)</L>
          <L x="440" y="362" fill={C.fg} size={12}>Middels (~3,5–4,5 km/s)</L>
          <L x="650" y="362" fill={C.fg} size={12}>Tregest (~2–3 km/s)</L>

          <L x="50" y="386" fill={C.muted} size={12}>Utbredelse i væsker:</L>
          <L x="230" y="386" fill={C.teal} size={12} weight={600}>Går gjennom fast og væske</L>
          <L x="440" y="386" fill={C.warm} size={12} weight={600}>Stanser i væske (ytre kjerne!)</L>
          <L x="650" y="386" fill={C.low} size={12} weight={600}>Kun langs overflaten</L>
        </>
      )}
    </Diagram>
  );
}

export function VolcanoTypesDiagram() {
  return (
    <Diagram
      title="Vulkantyper: Skjoldvulkan vs. Stratovulkan"
      heading="Magmakjemi avgjør form og eksplosivitet"
      caption="Vulkanens form styres av magmaets silikatinnhold (SiO₂), temperatur og viskositet. Skjoldvulkaner mates av tyntflytende, varm basaltisk lava med lite gass — lavaen flyter langt og bygger slake, brede skjold (f.eks. Mauna Loa og Kilauea på Hawaii). Stratovulkaner (sammensatte vulkaner) dannes ved subduksjon der vann senker smeltepunktet og danner seig, gassrik andesittisk/ryolittisk magma. Dette gir voldsomme eksplosjoner, høye askesøyler, pyroklastiske strømmer og bratte, lagdelte kjegler (f.eks. Fuji, Vesuv og Pinatubo)."
      viewBox="0 0 860 400"
    >
      {() => (
        <>
          {/* VENSTRE: SKJOLDVULKAN */}
          <rect x="30" y="24" width="385" height="355" rx="8" fill="#141c22" stroke={C.dim} strokeWidth="1.6" />
          <L x="222" y="50" fill={C.warm} size={17} weight={700} anchor="middle">
            Skjoldvulkan (f.eks. Hawaii)
          </L>
          <L x="222" y="70" fill={C.muted} size={13} anchor="middle">
            Effusive utbrudd · Mafisk basaltisk lava
          </L>

          {/* Vulkanprofil slak */}
          <path
            d="M 50 250 Q 222 205 395 250 L 395 270 L 50 270 Z"
            fill="#2c2822"
            stroke={C.sand}
            strokeWidth="1.8"
          />

          {/* Lavastrømmer nedover de slake sidene */}
          <path d="M 215 210 Q 140 220 70 250" fill="none" stroke={C.warm} strokeWidth="3" />
          <path d="M 230 210 Q 300 220 375 250" fill="none" stroke={C.warm} strokeWidth="3" />

          {/* Magmatilførsel og kammer */}
          <path d="M 220 270 L 220 212" stroke={C.warm} strokeWidth="4" />
          <ellipse cx="222" cy="300" rx="42" ry="20" fill={C.warm} opacity="0.85" />
          <L x="222" y="304" fill="#000" size={11} weight={700} anchor="middle">
            Magmakammer
          </L>

          {/* Kjennetegn Skjoldvulkan */}
          <rect x="50" y="90" width="345" height="100" rx="6" fill="#1b252b" />
          <L x="65" y="112" fill={C.sand} size={13} weight={600}>Helning:</L>
          <L x="135" y="112" fill={C.fg} size={13}>Slak, 2–10° (stor utbredelse)</L>

          <L x="65" y="132" fill={C.sand} size={13} weight={600}>Magmatype:</L>
          <L x="150" y="132" fill={C.fg} size={13}>Basaltisk (mafisk, &lt;52 % SiO₂)</L>

          <L x="65" y="152" fill={C.sand} size={13} weight={600}>Viskositet:</L>
          <L x="145" y="152" fill={C.fg} size={13}>Lav (tyntflytende, ~1100–1200 °C)</L>

          <L x="65" y="172" fill={C.sand} size={13} weight={600}>Tektonisk setting:</L>
          <L x="180" y="172" fill={C.fg} size={13}>Hotspot / spredningsrygg</L>

          <L x="222" y="350" fill={C.teal} size={13} weight={600} anchor="middle">
            Rolig utgassing · Lite aske · Flytende lava
          </L>

          {/* HØYRE: STRATOVULKAN */}
          <rect x="445" y="24" width="385" height="355" rx="8" fill="#141c22" stroke={C.dim} strokeWidth="1.6" />
          <L x="637" y="50" fill={C.low} size={17} weight={700} anchor="middle">
            Stratovulkan (f.eks. Fuji, Vesuv)
          </L>
          <L x="637" y="70" fill={C.muted} size={13} anchor="middle">
            Eksplosive utbrudd · Felsisk/andesittisk lava
          </L>

          {/* Vulkanprofil bratt kjegle */}
          <path
            d="M 470 250 L 610 135 L 637 142 L 664 135 L 805 250 L 805 270 L 470 270 Z"
            fill="#322625"
            stroke={C.low}
            strokeWidth="1.8"
          />

          {/* Askesky / eksplosjonstopp */}
          <ellipse cx="637" cy="100" rx="35" ry="18" fill="#555" opacity="0.7" />
          <ellipse cx="615" cy="85" rx="25" ry="15" fill="#666" opacity="0.75" />
          <ellipse cx="660" cy="85" rx="28" ry="16" fill="#666" opacity="0.75" />
          <ellipse cx="637" cy="72" rx="42" ry="20" fill="#777" opacity="0.8" />
          <L x="637" y="77" fill="#fff" size={11} weight={700} anchor="middle">
            Askesøyle / Tefra
          </L>

          {/* Pyroklastisk strøm ned langs siden */}
          <path d="M 610 145 Q 560 170 510 240" fill="none" stroke={C.low} strokeWidth="3.5" strokeDasharray="5 3" />
          <L x="500" y="200" fill={C.low} size={11} weight={700}>
            Pyroklastisk strøm ⚡
          </L>

          {/* Magmatilførsel og kammer */}
          <path d="M 637 270 L 637 145" stroke={C.warm} strokeWidth="4" />
          <ellipse cx="637" cy="300" rx="38" ry="22" fill={C.warm} opacity="0.9" />
          <L x="637" y="304" fill="#000" size={11} weight={700} anchor="middle">
            Gassrik magma
          </L>

          {/* Kjennetegn Stratovulkan */}
          <rect x="465" y="90" width="345" height="100" rx="6" fill="#241b1d" opacity="0.85" />
          <L x="480" y="112" fill={C.low} size={13} weight={600}>Helning:</L>
          <L x="550" y="112" fill={C.fg} size={13}>Bratt, 25–35° (kjegleform)</L>

          <L x="480" y="132" fill={C.low} size={13} weight={600}>Magmatype:</L>
          <L x="565" y="132" fill={C.fg} size={13}>Andesitt / ryolitt (felsisk, &gt;60 % SiO₂)</L>

          <L x="480" y="152" fill={C.low} size={13} weight={600}>Viskositet:</L>
          <L x="560" y="152" fill={C.fg} size={13}>Høy (seigtflytende, ~800–1000 °C)</L>

          <L x="480" y="172" fill={C.low} size={13} weight={600}>Tektonisk setting:</L>
          <L x="595" y="172" fill={C.fg} size={13}>Subduksjonssone (konvergent)</L>

          <L x="637" y="350" fill={C.low} size={13} weight={600} anchor="middle">
            Fanger gassbobler → Eksplosjoner & askenedfall
          </L>
        </>
      )}
    </Diagram>
  );
}

export function VolcanoEruptionAnatomyDiagram() {
  return (
    <Diagram
      title="Anatomi av et eksplosivt vulkanutbrudd"
      heading="Pliniansk søyle, fragmenteringsnivå og tetthetsstrømmer"
      caption="Under et pliniansk utbrudd stiger gassmettet magma mot overflaten. Ved fragmenteringsnivået (zf) overstiger gassblærenes ekspansjonstrykk smeltenes elastiske strekkfasthet; magmaen rives i stykker til en blanding av gass, pimpstein og mikro-aske. Ut av krateret slynges blandingen i supersonisk fart (gas-thrust-region), før termisk konveksjon driver askesøylen 20–40 km opp i stratosfæren. Dersom tettheten i søylen blir for høy i forhold til atmosfæren, inntreffer søylekollaps som utløser livsfarlige pyroklastiske tetthetsstrømmer (PDC)."
      viewBox="0 0 880 460"
    >
      {(m) => (
        <>
          {/* Stratosfære / Troposfære bakgrunn */}
          <rect x="20" y="20" width="840" height="240" fill="#0e1722" rx="8" />
          <line x1="20" y1="110" x2="860" y2="110" stroke={C.dim} strokeDasharray="4 4" />
          <L x="35" y="100" fill={C.muted} size={11}>STRATOSFÆRE (&gt; 11 km)</L>
          <L x="35" y="125" fill={C.muted} size={11}>TROPOSFÆRE</L>

          {/* Jordskorpe og vulkankropp */}
          <path
            d="M 20 380 H 860 V 440 H 20 Z"
            fill="#231e1a"
          />
          {/* Stratovulkankjegle */}
          <path
            d="M 160 380 L 400 240 Q 440 248 480 240 L 720 380 Z"
            fill="#382e29"
            stroke="#52433c"
            strokeWidth="2"
          />

          {/* Magmakammer i skorpen */}
          <ellipse cx="440" cy="420" rx="90" ry="28" fill={C.warm} opacity="0.95" />
          <L x="440" y="424" fill="#000" size={12} weight={700} anchor="middle">
            Magmakammer (oppløst H₂O, CO₂, SO₂)
          </L>

          {/* Tilførselsrør (conduit) */}
          <path d="M 432 400 V 242 H 448 V 400 Z" fill={C.warm} />

          {/* Fragmenteringsnivå markering */}
          <line x1="390" y1="310" x2="490" y2="310" stroke={C.sand} strokeDasharray="3 3" strokeWidth="2" />
          <L x="500" y="314" fill={C.sand} size={11} weight={700}>
            Fragmenteringsnivå (z_f)
          </L>
          <L x="500" y="328" fill={C.muted} size={10}>
            Gassblærer sprenger magmaen til tefra
          </L>

          {/* Gas thrust region rett over krateret */}
          <path d="M 430 242 L 420 180 H 460 L 450 242 Z" fill="#d97706" opacity="0.9" />
          <L x="475" y="215" fill="#f59e0b" size={11} weight={600}>
            Gass-skyvesone (gas-thrust)
          </L>

          {/* Konvektiv pliniansk askesøyle */}
          <path
            d="M 420 180 Q 400 120 340 70 Q 280 40 180 35 L 700 35 Q 600 40 540 70 Q 480 120 460 180 Z"
            fill="#475569"
            opacity="0.85"
          />
          {/* Paraplysky (Umbrella cloud) */}
          <ellipse cx="440" cy="45" rx="270" ry="25" fill="#334155" opacity="0.9" />
          <ellipse cx="400" cy="40" rx="180" ry="20" fill="#475569" opacity="0.85" />
          <L x="440" y="48" fill="#f8fafc" size={14} weight={700} anchor="middle">
            Paraplysky (Umbrella cloud) · Vindbåren spredning
          </L>

          {/* Vulkansk lyn */}
          <path d="M 420 120 L 410 135 L 425 145 L 415 160" stroke="#fef08a" strokeWidth="2" fill="none" />
          <L x="365" y="145" fill="#fef08a" size={10} weight={700} anchor="end">
            Vulkanske lyn ⚡
          </L>

          {/* Askenedfall / tefra */}
          <path d="M 580 70 L 680 280" stroke={C.muted} strokeDasharray="3 4" strokeWidth="1.5" />
          <path d="M 620 70 L 720 280" stroke={C.muted} strokeDasharray="3 4" strokeWidth="1.5" />
          <path d="M 660 70 L 760 280" stroke={C.muted} strokeDasharray="3 4" strokeWidth="1.5" />
          <L x="720" y="200" fill={C.muted} size={12} weight={600}>
            Askenedfall & pimpstein
          </L>

          {/* Pyroklastisk tetthetsstrøm (PDC) ned venstre flanke */}
          <path
            d="M 400 245 Q 330 280 250 320 Q 180 350 90 380 L 160 380 Q 250 340 380 265 Z"
            fill={C.low}
            opacity="0.8"
          />
          <Arrow d="M 370 260 L 220 340" marker={m.low} color={C.low} width={3} />
          <g transform="rotate(-25 210 315)">
            <L x="210" y="315" fill={C.low} size={12} weight={700}>
              Pyroklastisk strøm (PDC) 200–700 km/t
            </L>
          </g>

          {/* Lahar i dalbunn til høyre */}
          <path d="M 480 250 Q 560 310 680 380 L 740 380 Q 600 300 490 245 Z" fill="#64748b" opacity="0.8" />
          <Arrow d="M 520 270 L 650 360" marker={m.sand} color={C.sand} width={2.5} />
          <L x="620" y="340" fill={C.sand} size={11} weight={700}>
            Lahar (slamstrøm)
          </L>
        </>
      )}
    </Diagram>
  );
}

export function CalderaFormationDiagram() {
  return (
    <Diagram
      title="Dannelse av en kaldera i 4 trinn"
      heading="Magmatømming og gigantisk takkollaps"
      caption="En kaldera er en stor vulkansk innsynkningsstruktur dannet ved takkollaps. 1: Et enormt gassmettet magmakammer bygger seg opp og presser jordskorpen i bue oppover. 2: Ringforkastninger sprekker opp og utløser katastrofale plinianske utbrudd som tømmer titalls til hundrevis av kubikkilometer magma. 3: Uten understøttelse fra magmaen raser skorpetaket loddrett ned i kammeret. 4: I ettertid fylles senkningen med vann (kalderasjø), og ny opptrengende magma danner en oppbulende, resurgent kuppel (f.eks. Yellowstone, Santorini, Toba)."
      viewBox="0 0 880 440"
    >
      {() => (
        <>
          {/* 4 paneler: 2x2 grid */}
          {/* TRINN 1: ØVERST VENSTRE */}
          <rect x="25" y="20" width="405" height="195" rx="8" fill="#121a22" stroke={C.dim} strokeWidth="1.4" />
          <L x="40" y="44" fill={C.teal} size={14} weight={700}>
            1. Magmaoppstuvning & oppbuling
          </L>
          {/* Skorpe */}
          <path d="M 35 120 Q 227 95 420 120 V 160 H 35 Z" fill="#2b241e" />
          <ellipse cx="227" cy="170" rx="90" ry="32" fill={C.warm} opacity="0.9" />
          <L x="227" y="174" fill="#000" size={11} weight={700} anchor="middle">
            Gassrik felsisk magma under høyt trykk
          </L>
          {/* Strekksprekker */}
          <line x1="140" y1="110" x2="140" y2="140" stroke={C.low} strokeDasharray="3 3" />
          <line x1="315" y1="110" x2="315" y2="140" stroke={C.low} strokeDasharray="3 3" />
          <L x="227" y="82" fill={C.fg} size={11} anchor="middle">
            Ringforkastninger dannes under strekk ↑
          </L>

          {/* TRINN 2: ØVERST HØYRE */}
          <rect x="450" y="20" width="405" height="195" rx="8" fill="#121a22" stroke={C.dim} strokeWidth="1.4" />
          <L x="465" y="44" fill={C.warm} size={14} weight={700}>
            2. Katastrofalt ringutbrudd (VEI 7–8)
          </L>
          <path d="M 460 120 H 845 V 160 H 460 Z" fill="#2b241e" />
          {/* Ringventiler som spyr ut aske */}
          <ellipse cx="560" cy="50" rx="40" ry="18" fill="#475569" opacity="0.8" />
          <ellipse cx="740" cy="50" rx="40" ry="18" fill="#475569" opacity="0.8" />
          <path d="M 555 140 L 545 70 H 575 L 565 140 Z" fill={C.low} />
          <path d="M 735 140 L 725 70 H 755 L 745 140 Z" fill={C.low} />
          <ellipse cx="650" cy="175" rx="85" ry="24" fill={C.warm} opacity="0.4" stroke={C.warm} strokeDasharray="4 3" />
          <L x="650" y="178" fill={C.sand} size={11} weight={600} anchor="middle">
            Kammeret tømmes i voldsomt tempo
          </L>

          {/* TRINN 3: NEDERST VENSTRE */}
          <rect x="25" y="230" width="405" height="195" rx="8" fill="#121a22" stroke={C.dim} strokeWidth="1.4" />
          <L x="40" y="254" fill={C.low} size={14} weight={700}>
            3. Skorpetaket kollapser (Kalderadannelse)
          </L>
          {/* Ytterkanter */}
          <path d="M 35 320 H 140 V 380 H 35 Z" fill="#2b241e" />
          <path d="M 315 320 H 420 V 380 H 315 Z" fill="#2b241e" />
          {/* Innsunket blokk */}
          <path d="M 140 350 H 315 V 400 H 140 Z" fill="#1e1814" stroke={C.low} strokeWidth="1.5" />
          <L x="227" y="340" fill={C.low} size={12} weight={700} anchor="middle">
            Innsunket blokk (stempelet faller ned ↓)
          </L>
          <line x1="140" y1="310" x2="140" y2="390" stroke={C.low} strokeWidth="2" strokeDasharray="4 2" />
          <line x1="315" y1="310" x2="315" y2="390" stroke={C.low} strokeWidth="2" strokeDasharray="4 2" />
          <L x="227" y="414" fill={C.muted} size={11} anchor="middle">
            Kalderavegger etterlater dyp senkning (flere mil bred)
          </L>

          {/* TRINN 4: NEDERST HØYRE */}
          <rect x="450" y="230" width="405" height="195" rx="8" fill="#121a22" stroke={C.dim} strokeWidth="1.4" />
          <L x="465" y="254" fill={C.rain} size={14} weight={700}>
            4. Kalderasjø & resurgent kuppel
          </L>
          {/* Kalderasjø */}
          <path d="M 460 320 H 550 V 390 H 460 Z" fill="#2b241e" />
          <path d="M 750 320 H 845 V 390 H 750 Z" fill="#2b241e" />
          <rect x="550" y="335" width="200" height="30" fill="#0369a1" opacity="0.8" />
          <L x="650" y="354" fill="#e0f2fe" size={11} weight={600} anchor="middle">
            Kratersjø / kalderasjø
          </L>
          {/* Resurgent kuppel i midten */}
          <ellipse cx="650" cy="358" rx="30" ry="12" fill="#3a2f28" stroke={C.warm} strokeWidth="1.5" />
          <ellipse cx="650" cy="395" rx="50" ry="16" fill={C.warm} opacity="0.85" />
          <L x="650" y="399" fill="#000" size={10} weight={700} anchor="middle">
            Ny oppadstigende magma
          </L>
          <L x="650" y="325" fill={C.sand} size={11} weight={700} anchor="middle">
            Resurgent kuppel hever innsjøbunnen
          </L>
        </>
      )}
    </Diagram>
  );
}

export function VolcanicHazardsDiagram() {
  return (
    <Diagram
      title="De 5 dødeligste vulkanske farene"
      heading="Primære og sekundære vulkanske trusler"
      caption="Vulkanske katastrofer forårsakes sjelden av selve lavastrømmen, som beveger seg langsomt nok til at mennesker kan evakuere. De største dødstallene skyldes: 1. Pyroklastiske tetthetsstrømmer (PDC) som raser med hundrevis av km/t. 2. Laharer (vulkanske slamstrømmer) som begraver hele byer i dalbunner. 3. Askenedfall som får hustak til å rase sammen og kveler avlinger. 4. Giftige og kvelende gasser (CO₂, SO₂, HF). 5. Vulkanske tsunamier og global klimapåvirkning (vulkansk vinter)."
      viewBox="0 0 880 400"
    >
      {() => (
        <>
          {/* 5 kolonner med farekort */}
          {/* FARE 1: Pyroklastisk strøm */}
          <rect x="25" y="30" width="155" height="340" rx="8" fill="#181316" stroke={C.low} strokeWidth="1.6" />
          <rect x="25" y="30" width="155" height="42" rx="8" fill="#3d1419" />
          <L x="102" y="56" fill={C.low} size={13} weight={700} anchor="middle">
            1. Pyroklastisk strøm
          </L>
          <L x="102" y="95" fill="#fca5a5" size={24} anchor="middle">⚡</L>
          <L x="38" y="130" fill={C.fg} size={12} weight={700}>Fart:</L>
          <L x="75" y="130" fill={C.low} size={12}>200–700 km/t</L>
          <L x="38" y="152" fill={C.fg} size={12} weight={700}>Temperatur:</L>
          <L x="115" y="152" fill={C.low} size={12}>300–800 °C</L>
          <L x="38" y="180" fill={C.muted} size={11}>
            Glohet blanding av gass, aske og steinblokker. Ingen kan løpe fra den. Forkuller alt på sekunder.
          </L>
          <rect x="35" y="270" width="135" height="85" rx="6" fill="#241418" />
          <L x="42" y="290" fill={C.sand} size={10} weight={700}>Historisk eksempel:</L>
          <L x="42" y="310" fill={C.fg} size={10}>St. Pierre 1902 (29 000 døde)</L>
          <L x="42" y="326" fill={C.fg} size={10}>Pompeii 79 e.Kr. (Vesuv)</L>

          {/* FARE 2: Lahar */}
          <rect x="195" y="30" width="155" height="340" rx="8" fill="#161816" stroke={C.sand} strokeWidth="1.6" />
          <rect x="195" y="30" width="155" height="42" rx="8" fill="#2d291e" />
          <L x="272" y="56" fill={C.sand} size={13} weight={700} anchor="middle">
            2. Lahar (slamstrøm)
          </L>
          <L x="272" y="95" fill="#fde047" size={24} anchor="middle">🌊</L>
          <L x="208" y="130" fill={C.fg} size={12} weight={700}>Konsistens:</L>
          <L x="285" y="130" fill={C.sand} size={12}>Våt betong</L>
          <L x="208" y="152" fill={C.fg} size={12} weight={700}>Hastighet:</L>
          <L x="275" y="152" fill={C.sand} size={12}>opptil 100 km/t</L>
          <L x="208" y="180" fill={C.muted} size={11}>
            Oppstår når glohet aske smelter isbreer på toppen eller ved styrtregn. Fyller daler og begraver byer.
          </L>
          <rect x="205" y="270" width="135" height="85" rx="6" fill="#242116" />
          <L x="212" y="290" fill={C.sand} size={10} weight={700}>Historisk eksempel:</L>
          <L x="212" y="310" fill={C.fg} size={10}>Armero 1985 (Nevado del Ruiz,</L>
          <L x="212" y="326" fill={C.fg} size={10}>23 000 begravet i gjørme)</L>

          {/* FARE 3: Askenedfall */}
          <rect x="365" y="30" width="155" height="340" rx="8" fill="#14181f" stroke={C.rain} strokeWidth="1.6" />
          <rect x="365" y="30" width="155" height="42" rx="8" fill="#1c2b36" />
          <L x="442" y="56" fill={C.rain} size={13} weight={700} anchor="middle">
            3. Askenedfall & tefra
          </L>
          <L x="442" y="95" fill="#93c5fd" size={24} anchor="middle">🌋</L>
          <L x="378" y="130" fill={C.fg} size={12} weight={700}>Rekkevidde:</L>
          <L x="455" y="130" fill={C.rain} size={12}>10–2000 km</L>
          <L x="378" y="152" fill={C.fg} size={12} weight={700}>Tung masse:</L>
          <L x="450" y="152" fill={C.rain} size={12}>1000–1500 kg/m³</L>
          <L x="378" y="180" fill={C.muted} size={11}>
            Finmalt glass og stein som ødelegger flymotorer, kollapser hustak, forurenser drikkevann og kveler lunger.
          </L>
          <rect x="375" y="270" width="135" height="85" rx="6" fill="#19232c" />
          <L x="382" y="290" fill={C.sand} size={10} weight={700}>Historisk eksempel:</L>
          <L x="382" y="310" fill={C.fg} size={10}>Eyjafjallajökull 2010</L>
          <L x="382" y="326" fill={C.fg} size={10}>(100 000 flygninger stanset)</L>

          {/* FARE 4: Giftige gasser */}
          <rect x="535" y="30" width="155" height="340" rx="8" fill="#191914" stroke={C.warm} strokeWidth="1.6" />
          <rect x="535" y="30" width="155" height="42" rx="8" fill="#302d1a" />
          <L x="612" y="56" fill={C.warm} size={13} weight={700} anchor="middle">
            4. Giftige gasser
          </L>
          <L x="612" y="95" fill="#fde68a" size={24} anchor="middle">☣️</L>
          <L x="548" y="130" fill={C.fg} size={12} weight={700}>Gasser:</L>
          <L x="600" y="130" fill={C.warm} size={12}>CO₂, SO₂, HF, H₂S</L>
          <L x="548" y="152" fill={C.fg} size={12} weight={700}>Virkning:</L>
          <L x="600" y="152" fill={C.warm} size={12}>Kvelning / syre</L>
          <L x="548" y="180" fill={C.muted} size={11}>
            CO₂ er tyngre enn luft og samler seg i groper. SO₂ og HF gir sur nedbør og fluorforgiftning av beitedyr.
          </L>
          <rect x="545" y="270" width="135" height="85" rx="6" fill="#252418" />
          <L x="552" y="290" fill={C.sand} size={10} weight={700}>Historisk eksempel:</L>
          <L x="552" y="310" fill={C.fg} size={10}>Laki 1783 (Island, 80 % sau</L>
          <L x="552" y="326" fill={C.fg} size={10}>og 20 % befolkning døde)</L>

          {/* FARE 5: Tsunami & Vinter */}
          <rect x="705" y="30" width="155" height="340" rx="8" fill="#131b20" stroke={C.teal} strokeWidth="1.6" />
          <rect x="705" y="30" width="155" height="42" rx="8" fill="#16303d" />
          <L x="782" y="56" fill={C.teal} size={13} weight={700} anchor="middle">
            5. Tsunami & Vinter
          </L>
          <L x="782" y="95" fill="#67e8f9" size={24} anchor="middle">❄️</L>
          <L x="718" y="130" fill={C.fg} size={12} weight={700}>Global effekt:</L>
          <L x="795" y="130" fill={C.teal} size={12}>-1 til -3 °C</L>
          <L x="718" y="152" fill={C.fg} size={12} weight={700}>Tsunamibølger:</L>
          <L x="805" y="152" fill={C.teal} size={12}>opptil 40 m</L>
          <L x="718" y="180" fill={C.muted} size={11}>
            Kalderakollaps i havet utløser megatsunami. Svovel-aerosoler i stratosfæren gir global hungersnød.
          </L>
          <rect x="715" y="270" width="135" height="85" rx="6" fill="#17262f" />
          <L x="722" y="290" fill={C.sand} size={10} weight={700}>Historisk eksempel:</L>
          <L x="722" y="310" fill={C.fg} size={10}>Tambora 1815 ("Året uten</L>
          <L x="722" y="326" fill={C.fg} size={10}>sommer"), Krakatau 1883</L>
        </>
      )}
    </Diagram>
  );
}

export function EarthquakeWavePhysicsDiagram() {
  return (
    <Diagram
      title="Bølgefysikk og S-bølgenes skyggesone"
      heading="P-bølger, S-bølger og beviset for flytende ytre kjerne"
      caption="Primære P-bølger er longitudinelle kompresjonsbølger der partiklene svinger parallelt med bølgeretningen; de forplanter seg gjennom både faste bergarter og væsker (hastighet Vp = sqrt((K + 4/3μ)/ρ)). Sekundære S-bølger er transversale skjærbølger med partikkelbevegelse vinkelrett på bølgeretningen (Vs = sqrt(μ/ρ)). Fordi væsker mangler skjærstivhet (μ = 0), kan S-bølger IKKE forplante seg gjennom væsker. Richard Dixon Oldham oppdaget i 1906 at seismografer mellom 103° og 180° aldri registrerer direkte S-bølger — det ugjendrivelige beviset på at jordens ytre kjerne er flytende."
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
            Vp = √((K + 4/3μ) / ρ) ≈ 6–13 km/s · Går gjennom både fast og væske!
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
            Vs = √(μ / ρ) ≈ 3,5–7 km/s · Krever skjærstivhet (μ &gt; 0)
          </L>
          <L x="55" y="378" fill={C.low} size={11} weight={700}>
            I væske er μ = 0 → S-bølger stanser fullstendig!
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
              Flytende ytre kjerne (Fe-Ni)
            </L>
            <L x="0" y="4" fill="#000" size={9} weight={700} anchor="middle">
              Fast kjerne
            </L>
          </g>

          <L x="460" y="395" fill={C.muted} size={11}>
            S-bølger stanser ved kjerne-mantel-grensen (Gutenberg-diskontinuiteten, 2900 km dyp).
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ElasticReboundDiagram() {
  return (
    <Diagram
      title="Harry Fielding Reids elastiske tilbakefjæringsteori (1910)"
      heading="Hvordan jordskjelv bygges opp og utløses"
      caption="Etter jordskjelvet i San Francisco i 1906 analyserte geodeten Harry Fielding Reid oppmålinger av landskapet. Han formulerte teorien om elastisk tilbakefjæring: 1: En uforstyrret bergartmasse krysses av en forkastningslinje. 2: Langsomme tektoniske krefter forskyver jordskorpen, men friksjonen langs forkastningen låser flaten. Bergartene deformeres elastisk som en spent stålfjær over tiår eller århundrer. 3: Når spenningen overstiger bergartens skjærfasthet, svikter låsen; forkastningen glipper plutselig, bergartene spretter tilbake til ubelastet form, og frigjort potensiell energi stråler ut som jordskjelvbølger. 4: Resultatet er en permanent forskyvning på overflaten."
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
            3. Brudd & Jordskjelv! ⚡
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
            Friksjonen ryker. Bølgene forplanter seg ut!
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
            ΔD (forskyvning)
          </L>
          <L x="680" y="348" fill={C.muted} size={11}>
            Ny spenningssyklus starter (seismisk syklus).
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
      caption="Norge er et intraplate-område der litosfæren påvirkes av to dominerende spenningskilder: 1. Ryggtrykk ('ridge push') fra den ekspanderende Midtatlantiske ryggen i vest dytter kontinentalskorpen i kompresjon mot øst-sørøst. 2. Postglasial landheving (isostatisk tilbakefjæring etter Weichsel-istidens 3 km tykke iskappe) skaper differensielle spenninger langs kysten og i forkastningssoner. Dette utløser skjelv i gamle svakhetssoner som Oslo-graben, Nordlandskysten og på kontinentalsokkelen. Historiske kjempeskjelv inkluderer Lurøyskjelvet i 1819 (M ~5,8) og Oslofjordskjelvet i 1904 (M 5,4)."
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
          <ellipse cx="108" cy="140" rx="7" ry="5" fill={C.low} />
          <L x="122" y="144" fill={C.low} size={11} weight={700}>
            Jan Mayen (Beerenberg) 🌋
          </L>

          {/* Ryggtrykk-vektorer mot øst ("Ridge Push") */}
          <path d="M 125 100 L 220 120" stroke={C.teal} strokeWidth="2.5" />
          <path d="M 220 120 L 210 112 M 220 120 L 212 126" stroke={C.teal} strokeWidth="2.5" />

          <path d="M 140 220 L 230 235" stroke={C.teal} strokeWidth="2.5" />
          <path d="M 230 235 L 220 227 M 230 235 L 222 241" stroke={C.teal} strokeWidth="2.5" />
          <L x="150" y="260" fill={C.teal} size={12} weight={700}>
            Ryggtrykk (Ridge push) →
          </L>

          {/* Postglasial landheving piler oppover i innlandet */}
          <ellipse cx="400" cy="270" rx="55" ry="40" fill="none" stroke={C.sand} strokeDasharray="4 3" strokeWidth="1.5" />
          <L x="400" y="270" fill={C.sand} size={11} weight={700} anchor="middle">
            Landheving (isostasi)
          </L>
          <L x="400" y="285" fill={C.muted} size={10} anchor="middle">
            opptil 8–9 mm/år
          </L>

          {/* Historiske jordskjelv stjerner */}
          {/* 1. Lurøy 1819 */}
          <Star x={315} y={150} r={11} />
          <rect x="235" y="130" width="70" height="20" rx="4" fill="#0f172a" opacity="0.8" />
          <L x="240" y="144" fill={C.low} size={11} weight={700}>
            Lurøy 1819
          </L>
          <L x="240" y="162" fill="#fca5a5" size={10}>
            M ~5,8 (størst i hist. tid)
          </L>

          {/* 2. Oslofjord 1904 */}
          <Star x={350} y={345} r={9} />
          <rect x="365" y="335" width="105" height="34" rx="4" fill="#0f172a" opacity="0.8" />
          <L x="370" y="348" fill={C.low} size={11} weight={700}>
            Oslofjorden 1904
          </L>
          <L x="370" y="362" fill="#fca5a5" size={10}>
            M 5,4 (Oslo-graben)
          </L>

          {/* 3. Nordsjøskjelvet 1989 & sokkelen */}
          <Star x={230} y={320} r={7} />
          <L x="180" y="315" fill={C.fg} size={10} weight={600}>
            Nordsjøen 1989 (M 5,1)
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
            • <strong className="text-teal">Ryggtrykk:</strong> Atlanterhavet utvider seg
          </L>
          <L x="552" y="128" fill={C.fg} size={11}>
            • <strong className="text-sand">Postglasial heving:</strong> Avlastning etter isbre
          </L>
          <L x="552" y="146" fill={C.fg} size={11}>
            • <strong className="text-warm">Gamle riftsoner:</strong> Oslofeltet fra perm
          </L>

          {/* Boks 2: De mest aktive sonene */}
          <rect x="540" y="175" width="300" height="105" rx="6" fill="#1a232c" />
          <L x="552" y="195" fill={C.warm} size={12} weight={700}>
            Mest skjelvaktive områder i Norge:
          </L>
          <L x="552" y="215" fill={C.fg} size={11}>
            1. Nordland og Helgelandskysten
          </L>
          <L x="552" y="233" fill={C.fg} size={11}>
            2. Vestlandet og sokkelens oljefelt
          </L>
          <L x="552" y="251" fill={C.fg} size={11}>
            3. Osloriften (innsynkningsgraven)
          </L>
          <L x="552" y="269" fill={C.fg} size={11}>
            4. Svalbard og Storfjorden (M 6,0 i 2008)
          </L>

          {/* Boks 3: Byggestandarder og Eurokode 8 */}
          <rect x="540" y="290" width="300" height="100" rx="6" fill="#241a1c" />
          <L x="552" y="312" fill={C.low} size={12} weight={700}>
            Samfunnssikkerhet (Eurokode 8):
          </L>
          <L x="552" y="332" fill={C.muted} size={11}>
            Selv om Norge er intraplate, krever Plan- og bygningsloven at sykehus, demninger og bruer dimensjoneres mot jordskjelv.
          </L>
          <L x="552" y="365" fill={C.low} size={11} weight={600}>
            NORSAR overvåker 24/7 med seismografer.
          </L>
        </>
      )}
    </Diagram>
  );
}
