import { Arrow, C, Diagram, L } from "./svg-kit";

export function SkredKrefterDiagram() {
  return (
    <Diagram
      title="Drivende og holdende krefter i en skråning, tørr og vannmettet"
      heading="Skred er et regnestykke mellom to krefter"
      caption="Tyngdekraften trekker rett ned, men bare den delen som peker langs skråningen, driver massen nedover. Mot den står friksjon og kohesjon. Til venstre er de holdende kreftene størst, og skråningen står. Til høyre har regn fylt porene med vann. Vanntrykket presser kornene fra hverandre, friksjonen faller, og de drivende kreftene vinner. Derfor kommer de fleste løsmasseskred i eller rett etter kraftig nedbør og snøsmelting."
      viewBox="0 0 840 420"
    >
      {(m) => (
        <>
          <L x="215" y="40" size={16} anchor="middle" weight={600}>
            Tørr skråning: står
          </L>
          <L x="625" y="40" size={16} anchor="middle" weight={600}>
            Vannmettet: svikter
          </L>
          <line x1="420" y1="58" x2="420" y2="392" stroke={C.dim} />

          {[
            { x0: 40, ok: true, label: "friksjon + kohesjon holder" },
            { x0: 450, ok: false, label: "poretrykk opp, friksjon ned" },
          ].map((p) => {
            const bx = p.x0 + 180;
            const by = 220;
            return (
              <g key={p.x0}>
                <path
                  d={`M ${p.x0 + 20} 130 L ${p.x0 + 330} 320 L ${p.x0 + 20} 320 Z`}
                  fill={p.ok ? "#2a3d34" : "#3a3428"}
                  stroke={C.dim}
                  strokeWidth="1.6"
                />
                <Arrow
                  d={`M ${bx} ${by} L ${bx + 77} ${by + 47}`}
                  marker={m.low}
                  color={C.low}
                  width={p.ok ? 2.4 : 3.8}
                />
                <L x={bx + 86} y={by + 66} fill={C.low} size={13}>
                  driver
                </L>
                <Arrow
                  d={`M ${bx} ${by} L ${bx - 77} ${by - 47}`}
                  marker={m.teal}
                  color={C.teal}
                  width={p.ok ? 3.8 : 2}
                />
                <L x={bx - 86} y={by - 52} fill={C.teal} size={13} anchor="end">
                  holder
                </L>
                <Arrow
                  d={`M ${bx} ${by + 10} L ${bx} ${by + 78}`}
                  marker={m.muted}
                  color={C.muted}
                  width={2}
                />
                <L x={bx + 8} y={by + 74} fill={C.muted} size={12}>
                  tyngde
                </L>
                <rect
                  x={bx - 27}
                  y={by - 17}
                  width="54"
                  height="34"
                  rx="4"
                  fill={p.ok ? C.teal : C.low}
                  opacity="0.9"
                  transform={`rotate(31.5 ${bx} ${by})`}
                />
                <L x={p.x0 + 175} y="352" fill={p.ok ? C.teal : C.low} size={13} anchor="middle">
                  {p.label}
                </L>
              </g>
            );
          })}

          <circle cx="540" cy="222" r="4" fill={C.rain} />
          <circle cx="578" cy="252" r="4" fill={C.rain} />
          <circle cx="618" cy="240" r="4" fill={C.rain} />
          <circle cx="656" cy="282" r="4" fill={C.rain} />
          <circle cx="600" cy="298" r="4" fill={C.rain} />
          <L x="496" y="306" fill={C.rain} size={13}>
            vann i porene
          </L>

          <L x="420" y="392" fill={C.muted} size={13} anchor="middle">
            skred når de drivende kreftene blir større enn de holdende
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SkredSonerDiagram() {
  return (
    <Diagram
      title="Løsneområde, transportsone og utløpsområde i en skråning med hus i utløpet"
      heading="Tre soner: der det løsner, der det går, der det stopper"
      caption="Et skred har tre deler. Løsneområdet er der massen bryter løs, høyest i skråningen. Transportsonen er sporet nedover, ofte et bekkeløp eller en renne. Utløpsområdet er der massen legger seg, som regel der terrenget flater ut — og det er der folk bygger. Faren sitter oppe i skråningen. Skaden skjer nede i utløpet. Derfor må et faresonekart vise hvor langt massen kan rekke, ikke bare hvor den kan løsne."
      viewBox="0 0 840 400"
    >
      {(m) => (
        <>
          <path
            d="M 60 96 L 300 96 C 420 96, 480 300, 780 316 L 780 356 L 60 356 Z"
            fill="#2a3d34"
            stroke={C.dim}
            strokeWidth="1.6"
          />
          <path
            d="M 120 100 C 150 104, 168 128, 186 152 C 240 232, 330 292, 560 312 L 560 322 C 320 306, 226 244, 172 160 C 152 132, 138 110, 118 108 Z"
            fill={C.sand}
            opacity="0.5"
          />

          <path
            d="M 96 92 C 130 96, 152 118, 172 142"
            fill="none"
            stroke={C.low}
            strokeWidth="3.4"
          />
          <L x="90" y="76" fill={C.low} size={14}>
            1 · løsneområde
          </L>
          <L x="196" y="112" fill={C.muted} size={12}>
            bratt, her bryter massen løs
          </L>

          <Arrow d="M 230 200 L 330 264" marker={m.warm} color={C.sand} width={3} />
          <L x="238" y="188" fill={C.sand} size={14}>
            2 · transportsone
          </L>
          <L x="348" y="266" fill={C.muted} size={12}>
            renne eller bekkeløp
          </L>

          <L x="592" y="250" fill={C.teal} size={14}>
            3 · utløpsområde
          </L>
          <L x="592" y="270" fill={C.muted} size={12}>
            terrenget flater ut
          </L>

          {[
            { x: 618, y: 316 },
            { x: 672, y: 320 },
            { x: 726, y: 322 },
          ].map((h) => (
            <g key={h.x}>
              <rect x={h.x} y={h.y - 22} width="30" height="22" fill="#c9ccc8" />
              <path
                d={`M ${h.x - 4} ${h.y - 22} L ${h.x + 15} ${h.y - 36} L ${h.x + 34} ${h.y - 22} Z`}
                fill={C.low}
              />
            </g>
          ))}
          <L x="672" y="352" fill={C.fg} size={13} anchor="middle">
            her bor folk
          </L>

          <line
            x1="560"
            y1="120"
            x2="560"
            y2="330"
            stroke={C.dim}
            strokeWidth="2"
            strokeDasharray="5 6"
          />
          <L x="570" y="140" fill={C.muted} size={12}>
            hvor langt rekker massen?
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SkredTyperDiagram() {
  return (
    <Diagram
      title="Skredtyper sortert etter materiale og bevegelse, med typisk helning"
      heading="Fem skredtyper, sortert på to spørsmål"
      caption="Still to spørsmål, og skredtypen faller på plass. Er det fast fjell eller løsmasse? Faller, glir eller flyter massen? Legg merke til helningene: steinsprang trenger stup, jordskred trenger bratt dalside, men kvikkleire og havbunnsskred går på terreng som ser flatt ut. Det er derfor kvikkleire overrasker — faren ser ikke bratt ut."
      viewBox="0 0 840 460"
    >
      {() => (
        <>
          <L x="60" y="46" fill={C.muted} size={13}>
            materiale ↓ · bevegelse →
          </L>
          <line x1="240" y1="60" x2="240" y2="420" stroke={C.dim} />
          <line x1="60" y1="88" x2="800" y2="88" stroke={C.dim} />
          {["faller", "glir", "flyter"].map((b, i) => (
            <L key={b} x={330 + i * 186} y="78" size={14} anchor="middle" weight={600}>
              {b}
            </L>
          ))}
          <L x="150" y="176" size={14} anchor="middle" weight={600}>
            fast fjell
          </L>
          <L x="150" y="316" size={14} anchor="middle" weight={600}>
            løsmasse
          </L>
          <line x1="60" y1="246" x2="800" y2="246" stroke={C.dim} strokeDasharray="4 6" />

          {[
            {
              x: 260,
              y: 106,
              w: 152,
              name: "Steinsprang",
              note: "blokker faller",
              deg: "over 45°",
              tone: C.cold,
            },
            {
              x: 446,
              y: 106,
              w: 152,
              name: "Fjellskred",
              note: "stort volum glir",
              deg: "varierer",
              tone: C.cold,
            },
            {
              x: 260,
              y: 262,
              w: 152,
              name: "Jordskred",
              note: "mettet jord",
              deg: "over 25–30°",
              tone: C.sand,
            },
            {
              x: 446,
              y: 262,
              w: 152,
              name: "Leirskred",
              note: "skråningen svikter",
              deg: "slakt",
              tone: C.sand,
            },
            {
              x: 632,
              y: 262,
              w: 152,
              name: "Kvikkleire",
              note: "flyter som væske",
              deg: "under 5°",
              tone: C.low,
            },
            {
              x: 632,
              y: 352,
              w: 152,
              name: "Havbunnsskred",
              note: "under vann",
              deg: "ned mot 0,3°",
              tone: C.low,
            },
          ].map((b) => (
            <g key={b.name}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height="76"
                rx="8"
                fill={b.tone}
                opacity="0.16"
                stroke={b.tone}
                strokeWidth="1.6"
              />
              <L
                x={b.x + b.w / 2}
                y={b.y + 26}
                fill={b.tone}
                size={14}
                anchor="middle"
                weight={600}
              >
                {b.name}
              </L>
              <L x={b.x + b.w / 2} y={b.y + 46} fill={C.muted} size={11} anchor="middle">
                {b.note}
              </L>
              <L x={b.x + b.w / 2} y={b.y + 65} fill={C.fg} size={12} anchor="middle">
                {b.deg}
              </L>
            </g>
          ))}

          <L x="430" y="446" fill={C.muted} size={13} anchor="middle">
            snøskred er kryosfære og hører i geofag 2
          </L>
        </>
      )}
    </Diagram>
  );
}

export function KvikkleireDiagram() {
  return (
    <Diagram
      title="Retrogressivt kvikkleireskred i fire steg, fra erosjon i bekken til stor skredgrop"
      heading="Hvorfor kvikkleireskred spiser seg bakover"
      caption="Steg 1: bekken graver i foten av skråningen, år etter år. Foten er det som holder massen over oppe. Steg 2: skråningen svikter, leira omrøres og flyter unna som en væske. Steg 3: da mister kanten bak sin støtte, og den svikter også. Steg 4: prosessen gjentar seg bakover, bort fra bekken og inn i flatt terreng. Det kalles retrogressivt, og det er derfor et kvikkleireskred kan ende langt fra der det startet — og hvorfor flatt land ikke er noen garanti."
      viewBox="0 0 840 540"
    >
      {(m) => (
        <>
          {[
            { tx: 40, ty: 60, n: "1", title: "Erosjon i foten", scarp: 0, note: "bekken graver" },
            {
              tx: 440,
              ty: 60,
              n: "2",
              title: "Første utglidning",
              scarp: 250,
              note: "leira omrøres og flyter unna",
            },
            {
              tx: 40,
              ty: 310,
              n: "3",
              title: "Kanten mister støtte",
              scarp: 190,
              note: "ny svikt bakover",
            },
            {
              tx: 440,
              ty: 310,
              n: "4",
              title: "Stor skredgrop",
              scarp: 120,
              note: "gropa vokser innover i flatt land",
            },
          ].map((p) => (
            <g key={p.n} transform={`translate(${p.tx} ${p.ty})`}>
              <circle cx="16" cy="18" r="14" fill={C.teal} />
              <L x="16" y="23" fill={C.bg} size={13} anchor="middle" weight={600}>
                {p.n}
              </L>
              <L x="40" y="23" size={14} weight={600}>
                {p.title}
              </L>
              <path
                d={
                  p.scarp === 0
                    ? "M 0 90 L 300 90 L 350 150 L 380 150 L 380 196 L 0 196 Z"
                    : `M 0 90 L ${p.scarp} 90 L ${p.scarp + 10} 150 L 380 150 L 380 196 L 0 196 Z`
                }
                fill="#7a8a86"
                opacity="0.5"
                stroke={C.dim}
                strokeWidth="1.4"
              />
              {p.scarp === 0 ? null : (
                <>
                  <rect
                    x={p.scarp + 10}
                    y="150"
                    width={330 - p.scarp}
                    height="14"
                    fill={C.low}
                    opacity="0.4"
                  />
                  <path
                    d={`M ${p.scarp} 90 L ${p.scarp + 10} 150`}
                    fill="none"
                    stroke={C.low}
                    strokeWidth="3.2"
                  />
                </>
              )}
              <path d="M 344 150 h 36" stroke={C.rain} strokeWidth="5" />
              <L x="352" y="142" fill={C.rain} size={11}>
                bekk
              </L>
              <L x="20" y="76" fill={C.muted} size={11}>
                flatt jordbruksland
              </L>
              <L x="20" y="186" fill={C.muted} size={11}>
                {p.note}
              </L>
            </g>
          ))}

          <Arrow d="M 388 190 L 348 202" marker={m.low} color={C.low} width={2} />
          <Arrow d="M 700 452 L 590 452" marker={m.low} color={C.low} width={2.6} />
          <L x="708" y="456" fill={C.low} size={12}>
            bakover
          </L>
          <L x="420" y="528" fill={C.muted} size={13} anchor="middle">
            hver ny svikt fjerner støtten til kanten bak
          </L>
        </>
      )}
    </Diagram>
  );
}

export function FjellskredBolgeDiagram() {
  return (
    <Diagram
      title="Fjellskred i fjord som lager flodbølge med stor oppskyllingshøyde på motsatt side"
      heading="Fjellskred i fjord blir flodbølge"
      caption="Et stort fjellparti treffer vannet og skyver det unna. Bølgen krysser fjorden i minutter, og på motsatt side skyller den oppover terrenget. Høyden den rekker, kalles oppskyllingshøyde, og den kan bli mange ganger bølgehøyden ute i fjorden. I Tafjord 1934 nådde vannet 61 høydemeter. Det er derfor et ustabilt fjell er en fare også for bygder som ligger på den andre siden av fjorden."
      viewBox="0 0 840 400"
    >
      {(m) => (
        <>
          <path d="M 40 300 H 800 V 356 H 40 Z" fill="#16303a" />
          <L x="420" y="336" fill={C.cold} size={13} anchor="middle">
            fjord
          </L>

          <path d="M 40 300 L 40 90 L 220 300 Z" fill="#2a3d34" stroke={C.dim} />
          <path d="M 118 196 L 160 196 L 196 262 L 148 262 Z" fill={C.low} opacity="0.8" />
          <path d="M 112 190 L 166 190" stroke={C.low} strokeWidth="3.4" />
          <L x="80" y="176" fill={C.low} size={13}>
            sprekk
          </L>
          <Arrow d="M 176 236 L 236 292" marker={m.low} color={C.low} width={3.2} />
          <L x="196" y="228" fill={C.low} size={14}>
            fjellpartiet glir ut
          </L>

          <path
            d="M 240 300 C 300 258, 340 258, 396 292 C 452 326, 500 262, 560 268 C 620 274, 660 292, 700 288"
            fill="none"
            stroke={C.rain}
            strokeWidth="3.4"
          />
          <Arrow d="M 420 246 L 620 246" marker={m.teal} color={C.rain} width={2.6} />
          <L x="520" y="234" fill={C.rain} size={13} anchor="middle">
            bølgen krysser fjorden
          </L>

          <path d="M 700 300 L 800 300 L 800 120 Z" fill="#2a3d34" stroke={C.dim} />
          <line
            x1="688"
            y1="192"
            x2="800"
            y2="192"
            stroke={C.warm}
            strokeWidth="2.4"
            strokeDasharray="7 5"
          />
          <Arrow d="M 712 296 L 712 198" marker={m.warm} color={C.warm} width={2.6} />
          <L x="676" y="186" fill={C.warm} size={13} anchor="end">
            oppskyllingshøyde
          </L>
          <L x="676" y="206" fill={C.muted} size={12} anchor="end">
            Tafjord 1934: 61 m
          </L>

          <g>
            <rect x="742" y="272" width="26" height="20" fill="#c9ccc8" />
            <path d="M 738 272 L 755 260 L 772 272 Z" fill={C.low} />
          </g>
          <L x="792" y="330" fill={C.fg} size={12} anchor="end">
            bygd på motsatt side
          </L>
        </>
      )}
    </Diagram>
  );
}
