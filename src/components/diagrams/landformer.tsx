import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. Glasiale landformer: U-daler, fjorder, botner, tinder, egger, morener og eskere
 */
export function GlacialLandformsDiagram() {
  return (
    <Diagram
      title="Glasiale landformer: Alpine og kontinentale former skapt av isbreenes erosjon og avsetning"
      heading="Det glasiale landskapet — isbreens mektige arkitektur"
      caption="Isbreer er naturens mest kraftfulle geomorfologiske erosjonsagenter. Gjennom frostforvitring, plukking (isbreen fryser fast i steinblokker og river dem løs) og skuring (stein i bresålen riper og polerer fjellet) omdannes landskapet. Alpine breer skaper sylskarpe tinder, egger og botner. Dalbreer graver dype U-daler og fjorder med terskler og hengedaler, mens breens framstøt og smelting etterlater usorterte morener, drumliner og smeltevannsskapte eskere."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          {/* Hovedbakgrunn / himmel */}
          <rect x="30" y="30" width="880" height="460" rx="12" fill="#121b22" stroke={C.dim} strokeWidth="1.6" />

          {/* Bakgrunnsfjell: Tind (Horn) og Egg (Arête) */}
          {/* Tind (Matterhorn-form) */}
          <polygon points="120,70 190,190 60,190" fill="#222f3a" stroke={C.fg} strokeWidth="1.2" />
          <polygon points="120,70 145,190 190,190" fill="#1a252e" />
          {/* Snø og is på tinden */}
          <polygon points="120,70 135,110 112,110" fill="#e8f3f8" opacity="0.9" />

          {/* Egg / Arête (skarp rygg mellom to botner) */}
          <path d="M 120 70 L 260 130 L 380 180" fill="none" stroke={C.cold} strokeWidth="2.5" />
          <path d="M 120 70 L 260 130 L 260 210 L 190 190 Z" fill="#283540" />

          {/* Botn (Cirque) med botnbre og botnsjø (Tarn) */}
          <path d="M 260 130 C 270 200, 340 220, 380 200 C 400 160, 390 140, 380 130 Z" fill="#182730" stroke={C.teal} strokeWidth="1.4" />
          {/* Botnbre og innsjø */}
          <ellipse cx="320" cy="180" rx="45" ry="18" fill="#58c4dc" opacity="0.8" />
          <L x="320" y="160" fill={C.teal} size={13} weight={700} anchor="middle">Botn (Cirque) &amp; tjern</L>

          {/* Hengedal (Hanging Valley) med foss */}
          <path d="M 380 180 L 480 200 L 480 270 L 430 270 Z" fill="#202b33" stroke={C.dim} strokeWidth="1" />
          <line x1="480" y1="205" x2="480" y2="285" stroke="#7dd3fc" strokeWidth="2.8" strokeDasharray="4 2" />
          <L x="495" y="240" fill="#7dd3fc" size={12} weight={700}>Hengedal &amp; foss</L>

          {/* Hoved U-dal og Fjordtverrsnitt */}
          {/* Venstre dalside */}
          <path d="M 60 190 L 180 340 L 240 420 L 700 420 L 780 330 L 900 180 L 900 480 L 40 480 Z" fill="#2a251e" />
          
          {/* U-dal bunn og fjordvann med terskel */}
          {/* Fjordbasseng (overfordypning) */}
          <path d="M 240 320 C 300 440, 580 440, 680 320 Z" fill="#113245" stroke={C.teal} strokeWidth="1.5" />
          {/* Fjordvann speil */}
          <rect x="235" y="320" width="450" height="15" fill="#38bdf8" opacity="0.6" />
          <L x="460" y="315" fill="#38bdf8" size={13} weight={700} anchor="middle">Fjord (overfordypet U-dal under havnivå)</L>

          {/* Grunn terskel ytterst i fjorden */}
          <path d="M 660 320 Q 690 350 720 320 Z" fill="#44392b" stroke={C.sand} strokeWidth="1.4" />
          <L x="690" y="365" fill={C.sand} size={11} weight={700} anchor="middle">Fjordterskel (berg/morene)</L>

          {/* Dalsider med isskuring */}
          <line x1="160" y1="270" x2="210" y2="330" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="175" y1="260" x2="225" y2="320" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 3" />
          <L x="140" y="280" fill={C.cold} size={12} weight={700}>Skuringsstriper</L>

          {/* Moreneavsetninger nede i dalen */}
          {/* 1. Bunnmorene */}
          <rect x="270" y="425" width="220" height="24" rx="4" fill="#382e22" stroke={C.sand} strokeWidth="1" />
          <L x="380" y="441" fill={C.sand} size={11} weight={600} anchor="middle">Bunnmorene (usortert blokkleire/till)</L>

          {/* 2. Sidemorene */}
          <polygon points="190,340 230,340 215,315" fill="#4a3e2c" stroke={C.sand} strokeWidth="1.2" />
          <L x="165" y="335" fill={C.sand} size={11} weight={700}>Sidemorene</L>

          {/* 3. Endemorene (Raet-type) */}
          <polygon points="560,420 620,420 590,370" fill="#524430" stroke={C.warm} strokeWidth="1.6" />
          <L x="590" y="362" fill={C.warm} size={12} weight={700} anchor="middle">Endemorene (Ra-rygg)</L>

          {/* 4. Drumlin (strømlinjeformet hvalskrott) */}
          <ellipse cx="760" cy="400" rx="35" ry="14" fill="#3d3326" stroke={C.sand} strokeWidth="1.2" />
          <Arrow d="M 720 400 L 800 400" marker={m.sand} color={C.sand} width={1.8} />
          <L x="760" y="396" fill={C.sand} size={11} weight={700} anchor="middle">Drumlin</L>
          <L x="760" y="425" fill={C.muted} size={10} anchor="middle">Isbevegelse →</L>

          {/* 5. Esker (slangeformet smeltevannsrygg) */}
          <path d="M 800 440 Q 820 425 840 435 T 880 430" fill="none" stroke={C.rain} strokeWidth="4.5" />
          <L x="840" y="456" fill={C.rain} size={11} weight={700} anchor="middle">Esker (smeltevannselv)</L>

          {/* Annotasjon for Tind / Horn øverst */}
          <L x="120" y="55" fill={C.warm} size={14} weight={800} anchor="middle">Tind / Horn</L>
          <L x="260" y="115" fill={C.cold} size={13} weight={700} anchor="middle">Egg (Arête)</L>

          {/* Pedagogiske bokser i bunnen */}
          <g>
            <rect x="45" y="455" width="260" height="26" rx="4" fill="#17222a" stroke={C.teal} strokeWidth="1" />
            <L x="55" y="472" fill={C.teal} size={11} weight={700}>U-dal: Bratt dalside, flat bunn, iserodert</L>
          </g>
          <g>
            <rect x="320" y="455" width="280" height="26" rx="4" fill="#17222a" stroke={C.warm} strokeWidth="1" />
            <L x="330" y="472" fill={C.warm} size={11} weight={700}>Endemorene: markerer hvor langt breen rykket fram</L>
          </g>
          <g>
            <rect x="615" y="455" width="280" height="26" rx="4" fill="#17222a" stroke={C.cold} strokeWidth="1" />
            <L x="625" y="472" fill={C.cold} size={11} weight={700}>Plukking &amp; skuring: Breens to erosjonsprosesser</L>
          </g>
        </>
      )}
    </Diagram>
  );
}
