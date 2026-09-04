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
      caption="Grunne skjelv ved rygg og transform. Dype skjelv i den synkende platen ved subduksjon."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <rect x="40" y="248" width="740" height="112" fill="#152028" />
          <L x="56" y="312" fill={C.muted} size={14}>
            astenosfære
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
          <L x="56" y={198} fill={C.muted} size={14}>
            litosfære
          </L>
          <L x="430" y={218} fill={C.low} size={14}>
            synkende plate
          </L>
          <L x="560" y={168} fill={C.low} size={13} anchor="end">
            dype skjelv
          </L>
          <L x="680" y={58} fill={C.low} size={15}>
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
      caption="Når et jordskjelv inntreffer, forplanter energien seg som tre typer bølger. P-bølgene (primære kompresjonsbølger) er raskest og ankommer først. Deretter kommer S-bølgene (sekundære skjærbølger) med større amplitude. Tidsdifferansen Δt øker med avstanden til episenteret. Overflatebølgene (Rayleigh og Love) ankommer sist, men har størst amplitude og forårsaker de største ødeleggelsene. Tre stasjoner gir nøyaktig posisjon via triangulering."
      viewBox="0 0 840 420"
    >
      {(m) => (
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
      {(m) => (
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

