import { Arrow, C, Diagram, L } from "./svg-kit";

function JetCore({ x, y, r = 17 }: { x: number; y: number; r?: number }) {
  const k = r * 0.6;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.bg} stroke={C.teal} strokeWidth="2.4" />
      <path
        d={`M ${x - k} ${y - k} L ${x + k} ${y + k} M ${x - k} ${y + k} L ${x + k} ${y - k}`}
        stroke={C.teal}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  );
}

export function JetProfileDiagram() {
  return (
    <Diagram
      title="Snitt fra ekvator til nordpolen med trykkbelter ved bakken og to jetbelter ved tropopausen"
      heading="Bakken og høyden i samme snitt"
      caption="Nede veksler beltene mellom lavtrykk og høytrykk. Oppe er bildet enklere: den varme luftsøylen over tropene er tykkere, så trykket i høyden er høyere der enn over den kalde polarluften. Trykkgradienten i høyden peker polover, coriolis dreier strømmen mot øst, og der tropopausen har et hopp, samler vestavinden seg i en kjerne. Det er de to jetbeltene."
      viewBox="0 0 840 520"
    >
      {(m) => (
        <>
          <L x="60" y="40" fill={C.muted} size={13}>
            høyde
          </L>
          <L x="62" y="120" fill={C.muted} size={12} anchor="end">
            16 km
          </L>
          <L x="62" y="196" fill={C.muted} size={12} anchor="end">
            12 km
          </L>
          <L x="62" y="271" fill={C.muted} size={12} anchor="end">
            8 km
          </L>
          <L x="62" y="422" fill={C.muted} size={12} anchor="end">
            bakken
          </L>

          <rect x="86" y="130" width="210" height="284" fill={C.warm} opacity="0.1" rx="4" />
          <rect x="556" y="270" width="230" height="144" fill={C.cold} opacity="0.14" rx="4" />
          <L x="190" y="372" fill={C.warm} size={13} anchor="middle">
            varm, tykk luftsøyle
          </L>
          <L x="670" y="372" fill={C.cold} size={13} anchor="middle">
            kald, tynn luftsøyle
          </L>

          <path
            d="M 78 116 L 296 122 L 336 182 L 516 206 L 552 248 L 786 262"
            fill="none"
            stroke={C.dim}
            strokeWidth="2.6"
          />
          <L x="90" y="104" fill={C.muted} size={13}>
            tropopause
          </L>

          <L x="170" y="232" fill={C.warm} size={14} anchor="middle">
            relativt H i høyden
          </L>
          <L x="688" y="318" fill={C.cold} size={14} anchor="middle">
            relativt L i høyden
          </L>
          <Arrow d="M 200 288 L 620 288" marker={m.fg} color={C.fg} width={2.4} />
          <L x="410" y="276" fill={C.fg} size={14} anchor="middle">
            trykkgradienten i høyden peker polover
          </L>

          <JetCore x={336} y={182} />
          <L x="336" y="152" fill={C.teal} size={14} anchor="middle">
            subtropisk jet
          </L>
          <JetCore x={552} y={248} r={19} />
          <L x="552" y="218" fill={C.teal} size={14} anchor="middle">
            polarfrontjet
          </L>
          <L x="786" y="96" fill={C.muted} size={12} anchor="end">
            kryss i ring: vinden går inn i arket — mot øst
          </L>

          <line x1="78" y1="418" x2="786" y2="418" stroke={C.teal} strokeWidth="2.2" />
          {[
            { x: 110, tone: C.low, sym: "L", name: "ITCZ · regn", lat: "0°" },
            { x: 330, tone: C.warm, sym: "H", name: "subtropisk høytrykk · ørken", lat: "30°" },
            { x: 552, tone: C.low, sym: "L", name: "polarfront · lavtrykk", lat: "60°" },
            { x: 760, tone: C.cold, sym: "H", name: "polarhøytrykk", lat: "90°" },
          ].map((b) => (
            <g key={b.lat}>
              <circle cx={b.x} cy="392" r="17" fill="none" stroke={b.tone} strokeWidth="2.2" />
              <L x={b.x} y="398" fill={b.tone} size={16} anchor="middle">
                {b.sym}
              </L>
              <L x={b.x} y="448" fill={b.tone} size={12} anchor="middle">
                {b.name}
              </L>
              <L x={b.x} y="478" size={14} anchor="middle">
                {b.lat}
              </L>
            </g>
          ))}
          <L x="110" y="500" fill={C.muted} size={12} anchor="middle">
            ekvator
          </L>
          <L x="760" y="500" fill={C.muted} size={12} anchor="middle">
            nordpolen
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ThermalWindDiagram() {
  return (
    <Diagram
      title="Trykkflater som heller mot polen, og vindfart som øker med høyden til tropopausen"
      heading="Derfor er vinden sterkest helt oppe"
      caption="Til venstre: hver trykkflate ligger lavere over den kalde luften enn over den varme, og hellingen blir brattere jo høyere du kommer. Brattere helling betyr sterkere trykkgradient, og sterkere gradient betyr sterkere vind. Til høyre: derfor vokser vestavinden hele veien opp gjennom troposfæren. Over tropopausen snur temperaturkontrasten, og vinden avtar igjen. Maksimum ligger akkurat der — i jetkjernen. Sammenhengen mellom temperaturkontrast og vindøkning oppover kalles termisk vind."
      viewBox="0 0 840 420"
    >
      {(m) => (
        <>
          <L x="240" y="40" size={16} anchor="middle" weight={600}>
            Trykkflatene heller
          </L>
          <L x="640" y="40" size={16} anchor="middle" weight={600}>
            Vinden øker oppover
          </L>
          <line x1="440" y1="60" x2="440" y2="380" stroke={C.dim} />

          <line x1="70" y1="340" x2="410" y2="340" stroke={C.teal} strokeWidth="2" />
          <L x="86" y="362" fill={C.warm} size={14}>
            varm luft
          </L>
          <L x="396" y="362" fill={C.cold} size={14} anchor="end">
            kald luft
          </L>
          {[
            { d: "M 78 300 L 402 312", label: "850 hPa", y: 316 },
            { d: "M 78 232 L 402 266", label: "500 hPa", y: 270 },
            { d: "M 78 158 L 402 222", label: "300 hPa", y: 226 },
            { d: "M 78 104 L 402 186", label: "200 hPa", y: 190 },
          ].map((p) => (
            <g key={p.label}>
              <path d={p.d} fill="none" stroke={C.muted} strokeWidth="2" />
              <L x="408" y={p.y} fill={C.muted} size={11}>
                {p.label}
              </L>
            </g>
          ))}
          <L x="200" y="86" fill={C.fg} size={13} anchor="middle">
            brattere helling jo høyere opp
          </L>

          <line x1="492" y1="360" x2="492" y2="70" stroke={C.dim} />
          <line x1="492" y1="360" x2="800" y2="360" stroke={C.teal} strokeWidth="2" />
          <line
            x1="492"
            y1="152"
            x2="790"
            y2="152"
            stroke={C.dim}
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <L x="790" y="142" fill={C.muted} size={12} anchor="end">
            tropopause
          </L>
          <Arrow
            d="M 496 358 C 534 306, 604 232, 664 156"
            marker={m.teal}
            color={C.teal}
            width={3.2}
          />
          <path
            d="M 664 156 C 652 124, 606 102, 552 78"
            fill="none"
            stroke={C.teal}
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="664" cy="156" r="8" fill={C.teal} />
          <L x="678" y="182" fill={C.teal} size={14}>
            jetkjernen
          </L>
          <L x="548" y="70" fill={C.muted} size={12}>
            avtar over tropopausen
          </L>
          <L x="646" y="392" fill={C.muted} size={13} anchor="middle">
            vindfart →
          </L>
          <L x="486" y="96" fill={C.muted} size={12} anchor="end">
            høyde
          </L>
        </>
      )}
    </Diagram>
  );
}

export function JetFormsDiagram() {
  return (
    <Diagram
      title="Zonal jetstrøm som går rett vest–øst, og meridional jetstrøm med rygg og tråg over Norge"
      heading="To former, to slags vær i Norge"
      caption="Zonal form: jeten går nesten rett vest–øst, lavtrykkene kommer på rekke, og været i Norge er mildt, vått og skifter fort. Meridional form: jeten svinger i Rossby-bølger. Blir Norge liggende i et tråg, kommer kald luft sørover og været står stille i dagevis. Ligger vi under en rygg, blir det tørt og stabilt i stedet. Samme jetstrøm, motsatt vær."
      viewBox="0 0 840 560"
    >
      {(m) => (
        <>
          <L x="420" y="42" size={16} anchor="middle" weight={600}>
            Zonal form
          </L>
          <L x="60" y="98" fill={C.muted} size={12}>
            pol
          </L>
          <L x="60" y="238" fill={C.muted} size={12}>
            ekvator
          </L>
          {[92, 162, 232].map((y) => (
            <line key={y} x1="80" y1={y} x2="780" y2={y} stroke={C.dim} strokeDasharray="4 6" />
          ))}
          <path d="M 88 162 H 726" fill="none" stroke={C.teal} strokeWidth="11" opacity="0.25" />
          <Arrow d="M 96 162 L 752 162" marker={m.teal} color={C.teal} width={3.4} />
          {[300, 480].map((x) => (
            <g key={x}>
              <circle cx={x} cy="162" r="15" fill={C.bg} stroke={C.low} strokeWidth="2.2" />
              <L x={x} y="168" fill={C.low} size={14} anchor="middle">
                L
              </L>
            </g>
          ))}
          <L x="420" y="130" fill={C.teal} size={13} anchor="middle">
            vest → øst
          </L>
          <g>
            <circle cx="648" cy="162" r="7" fill={C.fg} />
            <L x="648" y="196" fill={C.fg} size={13} anchor="middle">
              Norge
            </L>
          </g>
          <L x="420" y="272" fill={C.muted} size={13} anchor="middle">
            lavtrykkene kommer på rekke · mildt, vått, skifter fort
          </L>

          <line x1="60" y1="304" x2="780" y2="304" stroke={C.dim} />
          <L x="420" y="342" size={16} anchor="middle" weight={600}>
            Meridional form
          </L>
          <L x="60" y="392" fill={C.muted} size={12}>
            pol
          </L>
          <L x="60" y="520" fill={C.muted} size={12}>
            ekvator
          </L>
          <path
            d="M 84 448 C 164 448, 194 386, 284 384 C 374 382, 394 452, 474 464 C 544 474, 564 508, 644 508 C 710 508, 734 462, 758 448"
            fill="none"
            stroke={C.teal}
            strokeWidth="11"
            opacity="0.25"
          />
          <Arrow
            d="M 92 448 C 164 448, 194 386, 284 384 C 374 382, 394 452, 474 464 C 544 474, 564 508, 644 508 C 716 508, 738 456, 776 440"
            marker={m.teal}
            color={C.teal}
            width={3.4}
          />
          <Arrow d="M 284 374 L 272 352" marker={m.warm} color={C.warm} width={2.2} />
          <L x="262" y="348" fill={C.warm} size={13} anchor="end">
            rygg · mild luft nordover
          </L>
          <L x="284" y="432" fill={C.muted} size={12} anchor="middle">
            blocking: høytrykket står
          </L>
          <Arrow d="M 604 396 L 628 452" marker={m.cold} color={C.cold} width={2.4} />
          <L x="596" y="388" fill={C.cold} size={13} anchor="middle">
            kald luft sørover
          </L>
          <g>
            <circle cx="648" cy="478" r="7" fill={C.fg} />
            <L x="664" y="474" fill={C.fg} size={13}>
              Norge
            </L>
          </g>
          <L x="644" y="542" fill={C.cold} size={13} anchor="middle">
            tråg · kaldt og stillestående
          </L>
        </>
      )}
    </Diagram>
  );
}

export function JetStreakDiagram() {
  return (
    <Diagram
      title="Jetkjerne sett ovenfra med divergens i utløpet, og lavtrykket som dypner under"
      heading="Slik lager jetstrømmen et lavtrykk"
      caption="Inne i jetstrømmen er det biter der vinden er ekstra sterk. I utløpet av en slik jetkjerne bremser luften opp og sprer seg, sterkest på nordsiden. Det fjerner luft fra toppen av søylen. Da må luft nedenfra stige for å fylle etter, trykket ved bakken faller, og lavtrykket dypner. Nedbøren kommer fra den stigende luften ved bakken — ikke fra jetstrømmen selv, som ligger 8–12 km oppe."
      viewBox="0 0 840 520"
    >
      {(m) => (
        <>
          <L x="50" y="58" fill={C.muted} size={13}>
            sett ovenfra · 8–12 km
          </L>
          <Arrow d="M 70 138 L 70 100" marker={m.muted} color={C.muted} width={1.8} />
          <L x="80" y="106" fill={C.muted} size={12}>
            nord
          </L>
          <ellipse
            cx="420"
            cy="160"
            rx="240"
            ry="44"
            fill={C.teal}
            opacity="0.16"
            stroke={C.teal}
            strokeWidth="1.6"
            strokeDasharray="6 5"
          />
          <Arrow d="M 150 160 L 700 160" marker={m.teal} color={C.teal} width={3.6} />
          <L x="250" y="128" fill={C.muted} size={13} anchor="middle">
            innløp
          </L>
          <L x="580" y="128" fill={C.muted} size={13} anchor="middle">
            utløp
          </L>
          <Arrow d="M 648 158 L 742 124" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 648 162 L 742 196" marker={m.teal} color={C.teal} width={2.2} />
          <L x="700" y="102" fill={C.teal} size={14} anchor="middle">
            divergens
          </L>
          <L x="666" y="230" fill={C.muted} size={12}>
            luften sprer seg
          </L>
          <L x="360" y="216" fill={C.muted} size={12} anchor="middle">
            jetkjerne · sterkest vind
          </L>

          <line x1="40" y1="258" x2="560" y2="258" stroke={C.dim} strokeDasharray="5 6" />
          <line x1="650" y1="204" x2="650" y2="356" stroke={C.dim} strokeDasharray="4 5" />
          <L x="380" y="290" fill={C.fg} size={14} anchor="middle">
            luft fjernes oppe → luft må stige nedenfra → trykket faller
          </L>

          <L x="50" y="336" fill={C.muted} size={13}>
            sett ovenfra · ved bakken
          </L>
          <circle cx="650" cy="390" r="30" fill="none" stroke={C.low} strokeWidth="2.4" />
          <L x="650" y="398" fill={C.low} size={18} anchor="middle">
            L
          </L>
          <Arrow
            d="M 762 440 C 706 448, 676 428, 674 408"
            marker={m.low}
            color={C.low}
            width={2.2}
          />
          <Arrow
            d="M 538 340 C 594 332, 624 352, 626 372"
            marker={m.low}
            color={C.low}
            width={2.2}
          />
          <L x="650" y="452" fill={C.low} size={14} anchor="middle">
            lavtrykket dypner
          </L>
          <L x="490" y="440" fill={C.rain} size={13} anchor="end">
            skyer og nedbør ved bakken
          </L>
          <Arrow d="M 200 486 L 760 486" marker={m.muted} color={C.muted} width={2} dash="7 6" />
          <L x="420" y="508" fill={C.muted} size={12} anchor="middle">
            stormbanen følger jetstrømmen østover
          </L>
        </>
      )}
    </Diagram>
  );
}

export function JetSeasonDiagram() {
  return (
    <Diagram
      title="Polarfrontjeten ligger lenger sør og er sterkere om vinteren enn om sommeren"
      heading="Sterkest om vinteren, lenger nord om sommeren"
      caption="Om vinteren er polen mørk og iskald mens tropene fortsatt får sol. Temperaturkontrasten er stor, og jeten blir sterk og trekker sørover. Om sommeren varmes Arktis, kontrasten krymper, og jeten blir svakere og ligger lenger nord. Det er derfor de store stormene i Norge kommer om vinteren, ikke i juli."
      viewBox="0 0 840 360"
    >
      {(m) => (
        <>
          <L x="240" y="40" size={16} anchor="middle" weight={600}>
            Vinter
          </L>
          <L x="620" y="40" size={16} anchor="middle" weight={600}>
            Sommer
          </L>
          <line x1="430" y1="60" x2="430" y2="330" stroke={C.dim} />
          {[
            {
              x0: 70,
              x1: 400,
              jet: 186,
              width: 4.6,
              norway: 152,
              labelDy: -12,
              label: "stor kontrast",
            },
            {
              x0: 460,
              x1: 790,
              jet: 112,
              width: 2.6,
              norway: 152,
              labelDy: 26,
              label: "liten kontrast",
            },
          ].map((p) => (
            <g key={p.x0}>
              {[92, 152, 212, 272].map((y) => (
                <line
                  key={y}
                  x1={p.x0}
                  y1={y}
                  x2={p.x1}
                  y2={y}
                  stroke={C.dim}
                  strokeDasharray="4 6"
                />
              ))}
              <path
                d={`M ${p.x0 + 8} ${p.jet} H ${p.x1 - 30}`}
                fill="none"
                stroke={C.teal}
                strokeWidth={p.width * 2.6}
                opacity="0.22"
              />
              <Arrow
                d={`M ${p.x0 + 16} ${p.jet} L ${p.x1 - 20} ${p.jet}`}
                marker={m.teal}
                color={C.teal}
                width={p.width}
              />
              <circle cx={p.x0 + 250} cy={p.norway} r="6" fill={C.fg} />
              <L x={p.x0 + 262} y={p.norway + p.labelDy} fill={C.fg} size={13}>
                Norge
              </L>
              <L x={(p.x0 + p.x1) / 2} y="316" fill={C.muted} size={13} anchor="middle">
                {p.label}
              </L>
            </g>
          ))}
          <L x="64" y="96" fill={C.muted} size={11} anchor="end">
            70°
          </L>
          <L x="64" y="216" fill={C.muted} size={11} anchor="end">
            50°
          </L>
          <L x="240" y="250" fill={C.teal} size={13} anchor="middle">
            sterk jet · stormbanen inn mot Norge
          </L>
          <L x="620" y="80" fill={C.teal} size={13} anchor="middle">
            svakere jet · trukket nordover
          </L>
        </>
      )}
    </Diagram>
  );
}
