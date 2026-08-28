import { Arrow, C, Diagram, L } from "./svg-kit";

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
          <L x="560" y="78" fill={C.cold} size={15}>
            90°  ·  0 km/t
          </L>
          <L x="560" y="110" fill={C.teal} size={15}>
            60°  ·  ca. 840 km/t
          </L>
          <L x="560" y="186" fill={C.warm} size={15}>
            0°  ·  ca. 1670 km/t østover
          </L>
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
          <L x="90" y="70" fill={C.muted} size={13}>
            nord
          </L>
          <L x="90" y="270" fill={C.muted} size={13}>
            ekvator
          </L>
          <Arrow d="M 180 250 L 180 80" marker={m.muted} color={C.muted} width={2.2} dash="7 6" />
          <L x="198" y="150" fill={C.muted} size={13}>
            tenkt rett linje
          </L>
          <Arrow d="M 180 250 C 180 180, 280 120, 430 80" marker={m.teal} color={C.teal} width={3.2} />
          <L x="360" y="168" fill={C.teal} size={15}>
            virkelig bane  ·  mot høyre
          </L>
          <L x="430" y="68" fill={C.fg} size={14}>
            øst for målet
          </L>
          <L x="410" y="318" fill={C.muted} size={13} anchor="middle">
            øst →
          </L>
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
          <L x="210" y="36" size={16} anchor="middle" weight={600}>
            Nordlig halvkule
          </L>
          <L x="630" y="36" size={16} anchor="middle" weight={600}>
            Sørlig halvkule
          </L>
          <line x1="420" y1="50" x2="420" y2="300" stroke={C.dim} />
          <circle cx="90" cy="165" r="26" fill="none" stroke={C.teal} strokeWidth="2.2" />
          <L x="90" y="171" fill={C.teal} size={16} anchor="middle">
            H
          </L>
          <circle cx="340" cy="165" r="26" fill="none" stroke={C.low} strokeWidth="2.2" />
          <L x="340" y="171" fill={C.low} size={16} anchor="middle">
            L
          </L>
          <Arrow d="M 118 165 L 312 165" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />
          <L x="215" y="154" fill={C.muted} size={12} anchor="middle">
            trykkgradient
          </L>
          <Arrow d="M 118 165 C 190 165, 240 88, 318 112" marker={m.teal} color={C.teal} width={3} />
          <L x="215" y="250" fill={C.teal} size={14} anchor="middle">
            avbøyd til høyre
          </L>

          <circle cx="510" cy="165" r="26" fill="none" stroke={C.teal} strokeWidth="2.2" />
          <L x="510" y="171" fill={C.teal} size={16} anchor="middle">
            H
          </L>
          <circle cx="760" cy="165" r="26" fill="none" stroke={C.low} strokeWidth="2.2" />
          <L x="760" y="171" fill={C.low} size={16} anchor="middle">
            L
          </L>
          <Arrow d="M 538 165 L 732 165" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />
          <Arrow d="M 538 165 C 610 165, 660 242, 738 218" marker={m.teal} color={C.teal} width={3} />
          <L x="630" y="250" fill={C.teal} size={14} anchor="middle">
            avbøyd til venstre
          </L>
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
          <L x="70" y="48" fill={C.muted} size={13} anchor="end">
            |f|
          </L>
          <L x="80" y="268" fill={C.muted} size={13} anchor="middle">
            0°
          </L>
          <L x="306" y="268" fill={C.muted} size={13} anchor="middle">
            30°
          </L>
          <L x="533" y="268" fill={C.muted} size={13} anchor="middle">
            60°
          </L>
          <L x="760" y="268" fill={C.muted} size={13} anchor="middle">
            90°
          </L>
          <path
            d="M 80 240 Q 220 230, 306 180 T 533 92 T 760 48"
            fill="none"
            stroke={C.teal}
            strokeWidth="3"
          />
          <circle cx="80" cy="240" r="6" fill={C.teal} />
          <circle cx="533" cy="92" r="6" fill={C.teal} />
          <Arrow d="M 533 92 L 533 40" marker={m.fg} color={C.fg} width={1.6} />
          <L x="545" y="36" size={14}>
            Norge
          </L>
          <L x="96" y="230" fill={C.muted} size={13}>
            null ved ekvator
          </L>
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
          <L x="220" y="36" size={16} anchor="middle" weight={600}>
            Lavtrykk (NH)
          </L>
          <L x="600" y="36" size={16} anchor="middle" weight={600}>
            Høytrykk (NH)
          </L>
          <circle cx="220" cy="175" r="28" fill="none" stroke={C.low} strokeWidth="2.4" />
          <L x="220" y="181" fill={C.low} size={18} anchor="middle">
            L
          </L>
          <Arrow d="M 220 70 A 105 105 0 0 0 115 175" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 115 175 A 105 105 0 0 0 220 280" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 220 280 A 105 105 0 0 0 325 175" marker={m.low} color={C.low} width={2.6} />
          <Arrow d="M 325 175 A 105 105 0 0 0 220 70" marker={m.low} color={C.low} width={2.6} />
          <L x="220" y="308" fill={C.muted} size={13} anchor="middle">
            mot klokken
          </L>

          <circle cx="600" cy="175" r="28" fill="none" stroke={C.teal} strokeWidth="2.4" />
          <L x="600" y="181" fill={C.teal} size={18} anchor="middle">
            H
          </L>
          <Arrow d="M 600 70 A 105 105 0 0 1 705 175" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 705 175 A 105 105 0 0 1 600 280" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 600 280 A 105 105 0 0 1 495 175" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 495 175 A 105 105 0 0 1 600 70" marker={m.teal} color={C.teal} width={2.6} />
          <L x="600" y="308" fill={C.muted} size={13} anchor="middle">
            med klokken
          </L>
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
            { x: 50, title: "Vask / toalett", note: "meter  ·  sekunder", ok: false },
            { x: 300, title: "Fotballstadion", note: "100 m  ·  minutter", ok: false },
            { x: 550, title: "Lavtrykk / orkan", note: "100–1000 km  ·  døgn", ok: true },
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
              <L x={b.x + 110} y="100" size={16} anchor="middle" weight={600}>
                {b.title}
              </L>
              <L x={b.x + 110} y="128" fill={C.muted} size={13} anchor="middle">
                {b.note}
              </L>
              <L
                x={b.x + 110}
                y="160"
                fill={b.ok ? C.teal : C.muted}
                size={14}
                anchor="middle"
              >
                {b.ok ? "coriolis styrer" : "coriolis taper"}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
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
          <L x="80" y="58" fill={C.muted} size={13}>
            30°  ·  subtropisk høytrykk
          </L>
          <line x1="80" y1="240" x2="740" y2="240" stroke={C.warm} strokeWidth="2" />
          <L x="80" y="268" fill={C.warm} size={13}>
            ekvator  ·  lavtrykk
          </L>
          <Arrow d="M 250 90 L 250 220" marker={m.muted} color={C.muted} width={2} dash="7 6" />
          <L x="266" y="150" fill={C.muted} size={13}>
            uten coriolis
          </L>
          <Arrow d="M 480 90 L 360 220" marker={m.teal} color={C.teal} width={3.2} />
          <L x="500" y="150" fill={C.teal} size={15}>
            nordøstpassat
          </L>
        </>
      )}
    </Diagram>
  );
}
