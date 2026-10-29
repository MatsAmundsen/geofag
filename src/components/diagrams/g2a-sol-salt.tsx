import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T } from "./g2a-kit";
import { Turbin } from "./g2a-vind-tidevann";

/* ---------- SolenergiFigur ---------- */

function Sol({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 7} fill={G.amber} fillOpacity={0.22} className="a a-pulse" />
      <circle cx={x} cy={y} r={r} fill={G.amber} />
    </g>
  );
}

function Hus({ mk }: { mk: Record<string, string> }) {
  return (
    <g>
      <Sol x={34} y={30} />
      <rect x={50} y={104} width={100} height={62} fill={G.panel2} stroke={C.sand} strokeWidth={2} />
      <path d="M40 106 L100 66 L160 106 Z" fill={G.panel2} stroke={C.sand} strokeWidth={2} strokeLinejoin="round" />
      <rect x={62} y={120} width={30} height={30} fill={G.amber} fillOpacity={0.35} stroke={G.amber} strokeWidth={1.6} />
      <Flow d="M52 44 L72 112" color={G.amber} marker={mk.amber} w={2} />
      <Flow d="M64 38 L100 80" color={G.amber} marker={mk.amber} w={2} />
      {/* solfanger på taket */}
      <path d="M104 74 L150 104 L142 110 L96 80 Z" fill={C.bg} stroke={C.fg} strokeWidth={1.6} />
      {/* rør til tank */}
      <Flow d="M146 108 L180 112 L180 124" color={C.warm} w={2.4} />
      <rect x={166} y={124} width={30} height={42} rx={6} fill={C.warm} fillOpacity={0.3} stroke={C.warm} strokeWidth={1.8} />
    </g>
  );
}

function Celle({ mk }: { mk: Record<string, string> }) {
  return (
    <g>
      <Sol x={34} y={30} />
      <Flow d="M52 44 L74 96" color={G.amber} marker={mk.amber} w={2} />
      <Flow d="M66 36 L102 90" color={G.amber} marker={mk.amber} w={2} />
      <Flow d="M82 30 L130 86" color={G.amber} marker={mk.amber} w={2} />
      <path d="M52 104 L142 104 L162 158 L32 158 Z" fill="#1f3a52" stroke={C.cold} strokeWidth={2} strokeLinejoin="round" />
      <line x1={32 + 130 * 0.33 + 0} y1={158} x2={52 + 90 * 0.33} y2={104} stroke={C.cold} strokeOpacity={0.6} />
      <line x1={32 + 130 * 0.66} y1={158} x2={52 + 90 * 0.66} y2={104} stroke={C.cold} strokeOpacity={0.6} />
      <line x1={42} y1={131} x2={152} y2={131} stroke={C.cold} strokeOpacity={0.6} />
      <Flow d="M96 160 L96 176 L190 176 L190 140" color={C.teal} marker={mk.teal} w={2.4} />
      <circle cx={190} cy={124} r={14} fill={G.amber} fillOpacity={0.3} className="a a-pulse" />
      <circle cx={190} cy={124} r={9} fill={G.amber} />
    </g>
  );
}

function Termisk({ mk }: { mk: Record<string, string> }) {
  return (
    <g>
      <Sol x={196} y={30} />
      {[30, 60, 90].map((x) => (
        <g key={x}>
          <line x1={x - 12} y1={168} x2={x + 12} y2={162} stroke={C.fg} strokeWidth={3.4} strokeLinecap="round" />
        </g>
      ))}
      <Flow d="M184 40 L96 154" color={G.amber} marker={mk.amber} w={2} />
      <Flow d="M86 154 L112 92" color={G.amber} marker={mk.amber} w={2} cls="a a-flowr" />
      <line x1={118} y1={80} x2={118} y2={168} stroke={C.sand} strokeWidth={3} />
      <rect x={110} y={66} width={16} height={18} rx={3} fill={C.low} stroke={C.low} />
      <Flow d="M128 72 L168 72 L168 94" color={C.warm} marker={mk.warm} w={2.4} />
      {/* dampturbin med generator */}
      <path d="M152 104 L152 142 L192 156 L192 90 Z" fill={G.panel2} stroke={C.cold} strokeWidth={2} strokeLinejoin="round" />
      {[162, 172, 182].map((x) => (
        <line key={x} x1={x} x2={x} y1={104 - (x - 152) * 0.35 + 6} y2={142 + (x - 152) * 0.45 - 6} stroke={C.cold} strokeOpacity={0.7} strokeWidth={2} />
      ))}
      <line x1={192} x2={204} y1={123} y2={123} stroke={C.cold} strokeWidth={3} />
      <circle cx={216} cy={123} r={11} fill={G.panel2} stroke={C.warm} strokeWidth={2} />
      <T x={216} y={128} lines="G" size={14} weight={700} fill={C.warm} anchor="middle" />
    </g>
  );
}

const PANELER = [
  { id: "solvarme", navn: "Solvarme", f: C.warm, linjer: ["Passiv: bygninger utformes", "slik at sollyset varmer dem.", "Aktiv: solfangere, svarte", "flater, varmer vann eller luft."], ikon: Hus, merk: [["passiv", 54, 184], ["aktiv", 156, 94]] as [string, number, number][] },
  { id: "solceller", navn: "Solceller", f: C.cold, linjer: ["Lys blir direkte til", "elektrisitet ved den", "fotoelektriske effekten."], ikon: Celle, merk: [["lys", 142, 62], ["strøm", 104, 196]] as [string, number, number][] },
  { id: "termisk", navn: "Termisk solkraft", f: C.low, linjer: ["Speil samler solstrålene og", "varmer en væske som", "driver en dampturbin."], ikon: Termisk, merk: [["speil", 24, 190], ["dampturbin", 138, 178]] as [string, number, number][] },
];

function Panel({ i, x, y, w, h, mk, s = 1 }: { i: number; x: number; y: number; w: number; h: number; mk: Record<string, string>; s?: number }) {
  const p = PANELER[i];
  const Ikon = p.ikon;
  const ox = (w - 228) / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Box x={0} y={0} w={w} h={h} stroke={p.f} fill={G.panel} sw={1.6} />
      <T x={14} y={26} lines={p.navn} size={16} weight={700} fill={p.f} />
      <g transform={`translate(${ox} 30) scale(${s})`}>
        <Ikon mk={mk} />
        {p.merk.map(([t, mx, my]) => (
          <T key={t} x={mx} y={my} lines={t} size={14} fill={C.muted} />
        ))}
      </g>
      <T x={14} y={30 + 224 * s} lines={p.linjer} size={14} fill={C.fg} lh={17} />
    </g>
  );
}

export function SolenergiFigur() {
  return (
    <G2Figur
      title="Tre måter å bruke solenergi på, og hvor mye sol det er"
      desc="Tre paneler: solvarme med passiv solvarme i et hus og aktiv solvarme med solfanger og varmtvannstank, solceller som gjør lys direkte om til elektrisitet ved den fotoelektriske effekten, og termisk solkraft der speil samler solstrålene og varmer en væske som driver en dampturbin med generator. Sol-pilene treffer speilene, og speilene reflekterer strålene mot toppen av tårnet. En skala viser innstråling fra 700 til over 2200 kilowattimer per kvadratmeter og år, og at den i Nord-Europa sjelden er over 1000. Passiv solvarme antas å bidra med 3 til 4 terawattimer til oppvarming av norske bygg."
      heading="Solenergi: tre bruksområder"
      caption="Skjematiske tegninger. Innstrålingen er målt i kilowattimer (kWh) per kvadratmeter og år. Kilde: Store norske leksikon (u.å.-g)."
      narrow={{ w: 300, h: 1350 }}
      wide={{ w: 720, h: 526 }}
      animated
      name="solenergi-figurene"
    >
      {({ bred, mk }) => {
        const bw = bred ? 400 : 280;
        const bx = bred ? 10 : 10;
        const by = bred ? 346 : 1000;
        const X = (v: number) => bx + 16 + ((v - 600) / 1800) * (bw - 32);
        return (
          <>
            <defs>
              <linearGradient id="g2a-sol-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor={C.cold} />
                <stop offset="0.35" stopColor={G.amber} />
                <stop offset="1" stopColor={C.low} />
              </linearGradient>
            </defs>
            {bred
              ? PANELER.map((_, i) => <Panel key={i} i={i} x={10 + i * 238} y={10} w={228} h={316} mk={mk} />)
              : PANELER.map((_, i) => <Panel key={i} i={i} x={10} y={10 + i * 330} w={280} h={318} mk={mk} />)}
            <Box x={bx} y={by} w={bw} h={bred ? 170 : 190} stroke={G.amber} fill={G.panel} sw={1.6} />
            <T x={bx + 14} y={by + 26} lines="Innstråling per m² og år" size={16} weight={700} fill={G.amber} />
            <rect x={X(700)} y={by + 64} width={X(2200) - X(700)} height={22} rx={4} fill="url(#g2a-sol-grad)" />
            <Flow d={`M${X(2200) + 4} ${by + 75} L${bx + bw - 12} ${by + 75}`} color={C.low} marker={mk.low} w={2.4} cls="a a-flow" />
            {[700, 1000, 2200].map((v) => (
              <g key={v}>
                <line x1={X(v)} x2={X(v)} y1={by + 58} y2={by + 94} stroke={C.fg} strokeWidth={1.6} />
                <T x={v === 700 ? X(v) - 4 : X(v)} y={by + 112} lines={v === 2200 ? "over 2200" : String(v)} size={14} weight={700} fill={C.fg} anchor="middle" />
              </g>
            ))}
            <path d={`M${X(700)} ${by + 124} L${X(700)} ${by + 130} L${X(1000)} ${by + 130} L${X(1000)} ${by + 124}`} fill="none" stroke={C.cold} strokeWidth={2} />
            <T x={X(700)} y={by + 150} lines={bred ? "Nord-Europa: sjelden over 1000" : ["Nord-Europa:", "sjelden over 1000"]} size={14} weight={700} fill={C.cold} />
            {/* passiv solvarme */}
            {bred ? (
              <g transform="translate(422 346)">
                <Box x={0} y={0} w={288} h={170} stroke={C.warm} fill={G.panel} sw={1.6} />
                <T x={14} y={26} lines="Passiv solvarme" size={16} weight={700} fill={C.warm} />
                <T x={14} y={78} lines="3–4 TWh" size={32} weight={700} fill={C.fg} />
                <T x={14} y={108} lines={["antas å bidra til oppvarming", "av norske bygg."]} size={14} fill={C.fg} lh={18} />
              </g>
            ) : (
              <g transform="translate(10 1204)">
                <Box x={0} y={0} w={280} h={130} stroke={C.warm} fill={G.panel} sw={1.6} />
                <T x={14} y={26} lines="Passiv solvarme" size={16} weight={700} fill={C.warm} />
                <T x={14} y={68} lines="3–4 TWh" size={32} weight={700} fill={C.fg} />
                <T x={14} y={96} lines={["antas å bidra til oppvarming", "av norske bygg."]} size={14} fill={C.fg} lh={18} />
              </g>
            )}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- SaltkraftFigur ---------- */

function Ioner({ pts, dx }: { pts: [number, number][]; dx: number }) {
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4.2} fill={G.violet} className={i % 2 ? "a a-drift" : "a a-drift2"} style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${(i % 3) * 3 - 3}px` }} />
      ))}
    </g>
  );
}

export function SaltkraftFigur() {
  return (
    <G2Figur
      title="Saltkraft: trykkretardert osmose mellom ferskvann og saltvann"
      desc="Skjema med to kammer atskilt av en membran: ferskvann til venstre og saltvann til høyre. Bare vann slipper gjennom membranen, og da bygger det seg opp et overtrykk på saltvannssiden. Overtrykket driver en vannturbin som er koblet til en generator. Beregnet potensial i Norge er 12 terawattimer i året. Statkraft åpnet prototypen på Tofte i Hurum i 2009 og avsluttet satsingen 20. desember 2013. Tofte-anlegget ble avviklet i 2014."
      heading="Saltkraft: strøm fra ferskvann og saltvann"
      caption="Skjematisk tegning. Prosessen heter trykkretardert osmose. Statkraft avsluttet satsingen 20.12.2013, og Tofte-anlegget ble avviklet i 2014. Saltkraft er ikke i kommersiell drift. Kilder: Store norske leksikon (u.å.-h) og Statkraft (2013)."
      narrow={{ w: 300, h: 650 }}
      wide={{ w: 720, h: 456 }}
      animated
      name="saltkraft-figuren"
    >
      {({ bred, mk }) => {
        const fx = 20;
        const fw = bred ? 176 : 130;
        const mx = fx + fw;
        const sx0 = mx + 8;
        const sw = bred ? 176 : 130;
        const top = bred ? 70 : 122;
        const bot = bred ? 300 : 294;
        const lvF = top + (bred ? 90 : 82);
        const lvS = top + (bred ? 50 : 46);
        const ions: [number, number][] = bred
          ? [[230, 160], [262, 200], [300, 175], [340, 215], [250, 250], [290, 270], [350, 255], [320, 140], [366, 170], [240, 205]]
          : [[162, 190], [196, 220], [232, 196], [250, 250], [176, 266], [214, 270], [260, 224], [240, 160]];
        const vannY = bred ? [186, 222, 258] : [208, 238, 268];
        const sCx = (sx0 + sx0 + sw) / 2;
        return (
          <>
            <T x={fx + fw / 2} y={top - 14} lines="Ferskvann" size={16} weight={700} fill={C.rain} anchor="middle" />
            <T x={sCx} y={top - 14} lines="Saltvann" size={16} weight={700} fill={G.violet} anchor="middle" />
            {/* kammer */}
            <rect x={fx} y={lvF} width={fw} height={bot - lvF} fill={C.rain} fillOpacity={0.3} />
            <rect x={sx0} y={lvS} width={sw} height={bot - lvS} fill={C.cold} fillOpacity={0.38} />
            <path d={`M${fx} ${top} L${fx} ${bot} L${mx} ${bot} L${mx} ${top}`} fill="none" stroke={C.sand} strokeWidth={3} strokeLinejoin="round" />
            <path d={`M${sx0} ${top} L${sx0} ${bot} L${sx0 + sw} ${bot} L${sx0 + sw} ${top} Z`} fill="none" stroke={C.sand} strokeWidth={3} strokeLinejoin="round" />
            {/* membran */}
            <rect x={mx + 1} y={top} width={6} height={bot - top} fill={C.fg} fillOpacity={0.25} stroke={C.fg} strokeWidth={1.4} strokeDasharray="6 5" />
            {/* vann gjennom membranen */}
            {vannY.map((y) => (
              <Flow key={y} d={`M${mx - 40} ${y} L${mx + 50} ${y}`} color={C.rain} marker={mk.rain} w={2.4} />
            ))}
            <Ioner pts={ions} dx={8} />
            {/* overtrykk */}
            <T x={sx0 + 10} y={top + 26} lines="Overtrykk" size={14} weight={700} fill={C.fg} />
            {[bred ? sx0 + sw - 30 : sx0 + sw - 20].map((x) => (
              <Flow key={x} d={`M${x} ${lvS - 6} L${x} ${top + 14}`} color={C.fg} marker={mk.fg} w={2.4} cls="a a-flowr" />
            ))}
            {/* rør, turbin og generator */}
            {bred ? (
              <>
                <Flow d={`M${sx0 + sw - 30} ${top} L${sx0 + sw - 30} 40 L440 40 L440 96`} color={C.cold} w={4} />
                <Turbin x={440} y={128} len={26} color={C.cold} cls="a a-spin" />
                <T x={440} y={184} lines="Vannturbin" size={14} fill={C.fg} anchor="middle" weight={700} />
                <line x1={440} y1={128} x2={510} y2={128} stroke={C.fg} strokeWidth={2.4} />
                <Box x={510} y={108} w={84} h={40} stroke={C.warm} fill={G.panel2} sw={1.6} />
                <T x={552} y={133} lines="Generator" size={14} fill={C.warm} anchor="middle" weight={700} />
                <Flow d="M596 128 L664 128" color={G.amber} marker={mk.amber} w={2.6} />
                <T x={630} y={158} lines={["elektrisk", "strøm"]} size={14} fill={G.amber} anchor="middle" lh={17} />
                <T x={mx + 4} y={bot + 26} lines="Membran: bare vann, ikke salt, slipper gjennom" size={14} fill={C.fg} anchor="middle" />
              </>
            ) : (
              <>
                <Flow d={`M${sx0 + sw - 20} ${top} L${sx0 + sw - 20} 90 L150 90 L150 76`} color={C.cold} w={4} />
                <Turbin x={150} y={52} len={22} color={C.cold} cls="a a-spin" />
                <T x={10} y={48} lines={["Vann-", "turbin"]} size={14} fill={C.fg} weight={700} lh={16} />
                <line x1={150} y1={52} x2={206} y2={52} stroke={C.fg} strokeWidth={2.4} />
                <Box x={206} y={34} w={84} h={36} stroke={C.warm} fill={G.panel2} sw={1.6} />
                <T x={248} y={57} lines="Generator" size={14} fill={C.warm} anchor="middle" weight={700} />
                <T x={mx + 4} y={bot + 26} lines={["Membran: bare vann, ikke salt,", "slipper gjennom"]} size={14} fill={C.fg} anchor="middle" lh={17} />
              </>
            )}
            {/* fakta */}
            {bred ? (
              <>
                <Box x={10} y={360} w={206} h={84} stroke={C.teal} fill={G.panel} sw={1.6} />
                <T x={22} y={382} lines="Beregnet potensial i Norge" size={14} fill={C.muted} />
                <T x={22} y={420} lines="12 TWh i året" size={24} weight={700} fill={C.teal} />
                <Box x={230} y={360} w={480} h={84} stroke={G.line} fill={G.panel} sw={1.6} />
                <T x={242} y={382} lines={["2009: Statkraft åpner verdens", "første saltkraftverk (prototyp)", "på Tofte i Hurum."]} size={14} fill={C.fg} lh={17} />
                <Flow d="M452 402 L476 402" color={C.muted} marker={mk.muted} w={2} cls="a" />
                <T x={490} y={382} lines={["20. desember 2013: Statkraft", "avsluttet satsingen."]} size={14} weight={700} fill={C.warm} lh={17} />
              </>
            ) : (
              <>
                <Box x={10} y={360} w={280} h={74} stroke={C.teal} fill={G.panel} sw={1.6} />
                <T x={22} y={382} lines="Beregnet potensial i Norge" size={14} fill={C.muted} />
                <T x={22} y={416} lines="12 TWh i året" size={24} weight={700} fill={C.teal} />
                <Box x={10} y={448} w={280} h={84} stroke={G.line} fill={G.panel} sw={1.6} />
                <T x={22} y={470} lines={["2009: Statkraft åpner verdens", "første saltkraftverk (prototyp)", "på Tofte i Hurum."]} size={14} fill={C.fg} lh={17} />
                <Box x={10} y={546} w={280} h={64} stroke={C.warm} fill={G.panel} sw={1.6} />
                <T x={22} y={568} lines={["20. desember 2013: Statkraft", "avsluttet satsingen."]} size={14} weight={700} fill={C.warm} lh={17} />
              </>
            )}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- BaerekraftTreFigur ---------- */

const DIM = [
  {
    id: "miljo",
    navn: "Miljø",
    f: G.green,
    w: ["Vindkraft på land beslaglegger store", "landområder. Saltkraft ville påvirke", "brakkvannsdeltaer. Hywind Tampen", "dekker bare om lag 35 % av behovet."],
    n: ["Vindkraft på land beslaglegger", "store landområder. Saltkraft ville", "påvirke brakkvannsdeltaer. Hywind", "Tampen dekker bare om lag 35 %", "av behovet."],
  },
  {
    id: "sosial",
    navn: "Sosial",
    f: C.cold,
    w: ["Fosen-saken: Høyesterett slo i 2021 fast", "at konsesjonene til Storheia og Roan var", "ugyldige. Kraftverkene fortsatte likevel."],
    n: ["Fosen-saken: Høyesterett slo i", "2021 fast at konsesjonene til", "Storheia og Roan var ugyldige.", "Kraftverkene fortsatte likevel."],
  },
  {
    id: "okonomi",
    navn: "Økonomi",
    f: G.amber,
    w: ["Havsul I stoppet i 2012 og saltkraft ble", "lagt bort i 2013: prisen ble ikke", "konkurransedyktig. Hywind Tampen fikk", "støtte: Enova 2,3 mrd. kr og NoX-fondet", "566 mill. kr."],
    n: ["Havsul I stoppet i 2012 og", "saltkraft ble lagt bort i 2013:", "prisen ble ikke konkurransedyktig.", "Hywind Tampen fikk støtte fra Enova", "(2,3 mrd. kr) og NoX-fondet", "(566 mill. kr)."],
  },
];

function Venn({ cx, cy, r, d }: { cx: number; cy: number; r: number; d: number }) {
  const pos: [number, number][] = [
    [cx, cy - d],
    [cx - d * 0.95, cy + d * 0.62],
    [cx + d * 0.95, cy + d * 0.62],
  ];
  const lab: [number, number][] = [
    [cx, cy - d - r * 0.42],
    [cx - d * 0.95 - r * 0.38, cy + d * 0.62 + r * 0.42],
    [cx + d * 0.95 + r * 0.38, cy + d * 0.62 + r * 0.42],
  ];
  const rekkef = [0, 2, 1];
  return (
    <g>
      {rekkef.map((i) => (
        <circle key={i} cx={pos[i][0]} cy={pos[i][1]} r={r} fill={DIM[i].f} fillOpacity={0.2} stroke={DIM[i].f} strokeWidth={2.4} />
      ))}
      {DIM.map((m, i) => (
        <T key={m.id} x={lab[i][0]} y={lab[i][1]} lines={m.navn} size={16} weight={700} fill={m.f} anchor="middle" />
      ))}
      <T x={cx} y={cy + d * 0.08 + 5} lines="Bærekraft" size={14} weight={700} fill={C.fg} anchor="middle" />
    </g>
  );
}

export function BaerekraftTreFigur() {
  return (
    <G2Figur
      title="Bærekraft i tre dimensjoner: miljø, sosial og økonomi"
      desc="Tre overlappende sirkler: miljø, sosial og økonomi. Eksempler fra kapitlet: vindkraft på land beslaglegger store landområder og Hywind Tampen dekker bare om lag 35 prosent av behovet til plattformene. Fosen-saken viser sosial bærekraft, der Høyesterett i 2021 slo fast at konsesjonene var ugyldige. Havsul I og saltkraft stoppet av økonomiske grunner, og Hywind Tampen fikk støtte fra Enova. En energikilde er ikke bærekraftig bare fordi den er fornybar."
      heading="Bærekraft har tre dimensjoner"
      caption="Eksemplene er hentet fra kapitlet. Kilder: Store norske leksikon (u.å.-j, u.å.-k), Equinor (2023) og Statkraft (2013)."
      narrow={{ w: 300, h: 760 }}
      wide={{ w: 720, h: 452 }}
      animated
      name="bærekraft-figuren"
    >
      {({ bred }) => {
        const ys = bred ? [14, 138, 242] : [250, 392, 514];
        const hs = bred
          ? DIM.map((m) => 40 + m.w.length * 18)
          : DIM.map((m) => 42 + m.n.length * 18);
        const x0 = bred ? 376 : 10;
        const w = bred ? 334 : 280;
        const yy = bred ? [14, 14 + hs[0] + 12, 14 + hs[0] + hs[1] + 24] : [250, 250 + hs[0] + 12, 250 + hs[0] + hs[1] + 24];
        void ys;
        const ender = yy[2] + hs[2] + 14;
        return (
          <>
            {bred ? <Venn cx={190} cy={140} r={88} d={46} /> : <Venn cx={150} cy={122} r={76} d={40} />}
            {DIM.map((m, i) => (
              <g key={m.id}>
                <Box x={x0} y={yy[i]} w={w} h={hs[i]} stroke={m.f} fill={G.panel} sw={1.6} />
                <rect x={x0} y={yy[i]} width={6} height={hs[i]} rx={3} fill={m.f} />
                <T x={x0 + 18} y={yy[i] + 26} lines={m.navn} size={16} weight={700} fill={m.f} />
                <T x={x0 + 18} y={yy[i] + 48} lines={bred ? m.w : m.n} size={14} fill={C.fg} lh={18} />
              </g>
            ))}
            <Box x={10} y={ender} w={bred ? 700 : 280} h={bred ? 46 : 62} stroke={C.teal} fill={G.panel2} sw={1.6} />
            <T
              x={bred ? 360 : 150}
              y={ender + (bred ? 29 : 26)}
              lines={bred ? "En energikilde er ikke bærekraftig bare fordi den er fornybar." : ["En energikilde er ikke bærekraftig", "bare fordi den er fornybar."]}
              size={16}
              weight={700}
              fill={C.teal}
              anchor="middle"
              lh={20}
            />
          </>
        );
      }}
    </G2Figur>
  );
}
