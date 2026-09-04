import { Arrow, C, Diagram, L } from "./svg-kit";

function Station({
  x,
  y,
  w = 230,
  h = 88,
  stroke,
  fill,
  title,
  sub,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  stroke: string;
  fill: string;
  title: string;
  sub: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <L x={x + w / 2} y={y + 36} fill={C.fg} size={16} anchor="middle" weight={600}>
        {title}
      </L>
      <L x={x + w / 2} y={y + 58} fill={stroke} size={13} anchor="middle">
        {sub}
      </L>
    </g>
  );
}

export function RockCycleDiagram() {
  return (
    <Diagram
      title="Bergartssyklusen: samspillet mellom magmatiske, sedimentære og metamorfe bergarter"
      heading="Bergartssyklusen — naturens store gjenbruk"
      caption="Bergartssyklusen er en modell som viser hvordan jordas bergarter kontinuerlig nydannes, brytes ned og omdannes. Ingen bergart er evig. Magma størkner til magmatiske bergarter. På overflaten forvitrer bergarter til løsmasser som herdes til sedimentære bergarter. Under høyt trykk og temperatur omdannes bergarter i fast tilstand til metamorfe bergarter. Blir varmen høy nok, smelter de tilbake til magma."
      viewBox="0 0 860 480"
    >
      {(m) => (
        <>
          {/* Hovedstasjoner (Trekant-oppsett) */}
          {/* 1. Magmatiske bergarter (øverst) */}
          <Station
            x={295}
            y={35}
            w={270}
            h={85}
            stroke={C.warm}
            fill="#302418"
            title="Magmatiske bergarter"
            sub="Dypbergart (granitt) · Dagbergart (basalt)"
          />

          {/* 2. Sedimentære bergarter (nede til høyre) */}
          <Station
            x={530}
            y={240}
            w={280}
            h={85}
            stroke={C.sand}
            fill="#29261a"
            title="Sedimentære bergarter"
            sub="Sandstein · Leirskifer · Kalkstein"
          />

          {/* 3. Metamorfe bergarter (nede til venstre) */}
          <Station
            x={50}
            y={240}
            w={270}
            h={85}
            stroke={C.teal}
            fill="#152b33"
            title="Metamorfe bergarter"
            sub="Gneis · Skifer · Marmor"
          />

          {/* 4. Magmakammer / smelte (nederst i midten på dypet) */}
          <rect
            x={335}
            y={390}
            width={190}
            height={55}
            rx="12"
            fill="#3a1c14"
            stroke={C.low}
            strokeWidth="1.8"
          />
          <L x={430} y={416} fill={C.low} size={15} weight={700} anchor="middle">
            Magma (smelte)
          </L>
          <L x={430} y={434} fill={C.muted} size={11} anchor="middle">
            Mantel og dyp skorpe
          </L>

          {/* --- PILER OG PROSESSER --- */}

          {/* Magma -> Magmatisk bergart: Avkjøling og krystallisasjon */}
          <Arrow d="M 430 390 L 430 130" marker={m.warm} color={C.warm} width={3.2} />
          <L x="442" y="270" fill={C.warm} size={12} weight={600}>
            Størkning · krystallisasjon
          </L>

          {/* Magmatisk -> Sedimentær: Forvitring, erosjon, transport, avsetning og diagenese */}
          <Arrow d="M 565 85 C 690 110, 720 180, 685 235" marker={m.sand} color={C.sand} width={2.6} />
          <L x="720" y="150" fill={C.sand} size={12} weight={600}>
            Forvitring, erosjon
          </L>
          <L x="720" y="168" fill={C.muted} size={11}>
            &amp; diagenese (litifisering)
          </L>

          {/* Sedimentær -> Metamorf: Økende trykk og temperatur (metamorfose) */}
          <Arrow d="M 530 280 L 330 280" marker={m.teal} color={C.teal} width={3} />
          <L x="430" y="268" fill={C.teal} size={13} weight={700} anchor="middle">
            Metamorfose
          </L>
          <L x="430" y="298" fill={C.muted} size={11} anchor="middle">
            Trykk og temperatur (fast tilstand)
          </L>

          {/* Metamorf -> Magma: Fullstendig oppsmelting på stort dyp */}
          <Arrow d="M 210 330 C 240 385, 290 415, 330 415" marker={m.low} color={C.low} width={2.8} />
          <L x="225" y="380" fill={C.low} size={12} weight={600}>
            Smelting på dypet
          </L>

          {/* Snarveier / kryssende prosesser */}
          {/* Metamorf -> Sedimentær: Også metamorfe bergarter forvitrer når de heves til overflaten */}
          <Arrow d="M 180 235 C 190 160, 500 160, 530 235" marker={m.sand} color={C.sand} width={2} dash="5 4" />
          <L x="360" y="165" fill={C.sand} size={11} anchor="middle">
            Heving, forvitring &amp; erosjon
          </L>

          {/* Magmatisk -> Metamorf: Magmatiske bergarter kan omdannes direkte */}
          <Arrow d="M 300 85 C 180 110, 150 180, 175 235" marker={m.teal} color={C.teal} width={2.4} />
          <L x="155" y="145" fill={C.teal} size={12} weight={600}>
            Regionalmetamorfose
          </L>
          <L x="155" y="162" fill={C.muted} size={11}>
            (Fjellkjedefolding)
          </L>

          {/* Sedimentær -> Magma: Direkte smelting ved subduksjon */}
          <Arrow d="M 660 330 C 620 385, 570 415, 530 415" marker={m.low} color={C.low} width={2.4} dash="5 4" />
          <L x="640" y="380" fill={C.low} size={12}>
            Subduksjon &amp; smelting
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ValleyCrossSectionDiagram() {
  return (
    <Diagram
      title="U-dal skures av is i hele tverrsnittet. V-dal graves av elva i bunnen. Fjord er U under hav."
      heading="U-dal og V-dal"
      caption="Isen skurer i hele tverrsnittet. Elva graver i bunnen. Fjord er U under hav."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <rect x="28" y="36" width="372" height="312" rx="10" fill="#152028" />
          <rect x="420" y="36" width="372" height="312" rx="10" fill="#152028" />

          <path
            d="M 48 92 H 108 C 112 160 122 220 148 248 L 280 248 C 306 220 316 160 320 92 H 380 V 328 H 48 Z"
            fill="#3a3428"
          />
          <path
            d="M 108 92 C 112 160 122 220 148 248 L 280 248 C 306 220 316 160 320 92 Q 214 76 108 92 Z"
            fill={C.cold}
            opacity="0.92"
          />
          <line
            x1="56"
            y1="186"
            x2="372"
            y2="186"
            stroke={C.white}
            strokeWidth="1.4"
            strokeDasharray="6 5"
            opacity="0.85"
          />
          <Arrow d="M 148 128 L 132 210" marker={m.cold} color={C.white} width={2} />
          <Arrow d="M 280 128 L 296 210" marker={m.cold} color={C.white} width={2} />
          <Arrow d="M 214 118 L 214 236" marker={m.cold} color={C.white} width={2.2} />

          <L x={214} y={64} fill={C.fg} size={15} anchor="middle" weight={600}>
            U-dal
          </L>
          <L x={214} y={140} fill={C.white} size={14} anchor="middle">
            is
          </L>
          <L x={368} y={178} fill={C.white} size={12} anchor="end">
            havnivå
          </L>
          <L x={214} y={312} fill={C.muted} size={13} anchor="middle">
            fjord · U under hav
          </L>

          <path d="M 440 92 H 528 L 606 268 L 684 92 H 772 V 328 H 440 Z" fill="#3a3428" />
          <path d="M 590 248 L 606 276 L 622 248 Q 606 238 590 248 Z" fill={C.teal} />
          <Arrow d="M 606 150 L 606 236" marker={m.teal} color={C.teal} width={2.4} />

          <L x={606} y={64} fill={C.fg} size={15} anchor="middle" weight={600}>
            V-dal
          </L>
          <L x={640} y={228} fill={C.teal} size={14}>
            elv
          </L>
        </>
      )}
    </Diagram>
  );
}
