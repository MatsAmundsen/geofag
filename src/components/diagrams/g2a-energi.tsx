import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T, nb } from "./g2a-kit";
import { BUD, NABO } from "./g2a-budkart";

/* ---------- BrukstidFigur ---------- */

const BRUKSTID = [
  { navn: "Furuseth solkraftverk", d: "7 MWp, 6,4 GWh (forventet)", t: 914, pst: "10,4", f: C.warm },
  { navn: "Fosen Vind", d: "1057 MW, 3,4 TWh (beregnet)", t: 3217, pst: "36,7", f: C.cold },
  { navn: "Kraftverk i SNL-eksempelet", d: "50 MW, 250 GWh", t: 5000, pst: "57,1", f: C.teal },
];

export function BrukstidFigur() {
  return (
    <G2Figur
      title="Brukstid og kapasitetsfaktor for Furuseth, Fosen Vind og et eksempelkraftverk"
      desc="Tre vannrette søyler viser brukstid i timer per år mot 8760 timer, som er hele året. Furuseth solkraftverk: 914 timer, 10,4 prosent. Fosen Vind: 3217 timer, 36,7 prosent. Kraftverket i eksempelet fra Store norske leksikon med 50 MW og 250 GWh: 5000 timer, 57,1 prosent. Brukstid er årsproduksjon delt på installert effekt, og kapasitetsfaktor er brukstid delt på 8760."
      heading="Brukstid: hvor mange timer på full effekt?"
      caption="Brukstiden er det antallet timer anlegget måtte ha gått på full effekt for å gi årsproduksjonen. Lengst mulig er 8760 timer, som er hele året. Fosen og Furuseth er regnet ut av oss fra tallene i kapitlet. Kilder: Store norske leksikon (u.å.-a) og Solgrid (u.å.)."
      narrow={{ w: 300, h: 468 }}
      wide={{ w: 720, h: 330 }}
    >
      {({ bred }) => {
        const x0 = bred ? 236 : 10;
        const tw = bred ? 460 : 280;
        const rowH = bred ? 62 : 86;
        const y0 = bred ? 50 : 56;
        return (
          <>
            <T x={bred ? x0 + tw : x0 + tw} y={22} lines="8760 t = hele året (100 %)" size={14} fill={C.fg} anchor="end" weight={700} />
            <line x1={x0 + tw} x2={x0 + tw} y1={30} y2={y0 + 3 * rowH - 8} stroke={C.fg} strokeWidth={1.6} strokeDasharray="5 4" />
            {BRUKSTID.map((b, i) => {
              const y = y0 + i * rowH;
              const bl = (b.t / 8760) * tw;
              const by = bred ? y + 8 : y + 32;
              return (
                <g key={b.navn}>
                  {bred ? (
                    <>
                      <T x={10} y={y + 18} lines={b.navn} size={16} weight={700} fill={C.fg} />
                      <T x={10} y={y + 38} lines={b.d} size={14} fill={C.muted} />
                    </>
                  ) : (
                    <>
                      <T x={x0} y={y + 14} lines={b.navn} size={16} weight={700} fill={C.fg} />
                      <T x={x0} y={y + 31} lines={b.d} size={14} fill={C.muted} />
                    </>
                  )}
                  <rect x={x0} y={by + (bred ? 0 : 8)} width={tw} height={22} rx={4} fill={G.panel} stroke={G.line} />
                  <rect x={x0} y={by + (bred ? 0 : 8)} width={bl} height={22} rx={4} fill={b.f} />
                  {bred ? (
                    <T x={x0 + bl + 8} y={by + 17} lines={`${nb(b.t)} t · ${b.pst} %`} size={16} weight={700} fill={b.f} />
                  ) : (
                    <T x={x0} y={by + 46} lines={`${nb(b.t)} t · ${b.pst} %`} size={16} weight={700} fill={b.f} />
                  )}
                </g>
              );
            })}
            {bred ? (
              <>
                <Box x={10} y={y0 + 3 * rowH + 6} w={340} h={64} stroke={C.teal} fill={G.panel2} />
                <T x={22} y={y0 + 3 * rowH + 28} lines="Brukstid" size={14} weight={700} fill={C.teal} />
                <T x={22} y={y0 + 3 * rowH + 50} lines="årsproduksjon ÷ installert effekt" size={16} fill={C.fg} />
                <Box x={370} y={y0 + 3 * rowH + 6} w={340} h={64} stroke={C.warm} fill={G.panel2} />
                <T x={382} y={y0 + 3 * rowH + 28} lines="Kapasitetsfaktor" size={14} weight={700} fill={C.warm} />
                <T x={382} y={y0 + 3 * rowH + 50} lines="brukstid ÷ 8760 timer" size={16} fill={C.fg} />
              </>
            ) : (
              <>
                <Box x={10} y={y0 + 3 * rowH + 4} w={280} h={64} stroke={C.teal} fill={G.panel2} />
                <T x={22} y={y0 + 3 * rowH + 26} lines="Brukstid" size={14} weight={700} fill={C.teal} />
                <T x={22} y={y0 + 3 * rowH + 48} lines="årsproduksjon ÷ installert effekt" size={14} fill={C.fg} />
                <Box x={10} y={y0 + 3 * rowH + 78} w={280} h={64} stroke={C.warm} fill={G.panel2} />
                <T x={22} y={y0 + 3 * rowH + 100} lines="Kapasitetsfaktor" size={14} weight={700} fill={C.warm} />
                <T x={22} y={y0 + 3 * rowH + 122} lines="brukstid ÷ 8760 timer" size={14} fill={C.fg} />
              </>
            )}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- KraftsystemetNorgeFigur ---------- */

function SegBar({ x, y, w, h = 26, segs }: { x: number; y: number; w: number; h?: number; segs: { v: number; f: string }[] }) {
  const sum = segs.reduce((s, q) => s + q.v, 0);
  const gap = 2;
  let cx = x;
  return (
    <g>
      {segs.map((q, i) => {
        const sw = Math.max(3, (q.v / sum) * (w - gap * (segs.length - 1)));
        const r = <rect key={i} x={cx} y={y} width={sw} height={h} rx={3} fill={q.f} />;
        cx += sw + gap;
        return r;
      })}
    </g>
  );
}

function Legende({ x, y, rader, lh = 21 }: { x: number; y: number; rader: { f: string; t: string }[]; lh?: number }) {
  return (
    <g>
      {rader.map((r, i) => (
        <g key={i}>
          <rect x={x} y={y + i * lh - 11} width={12} height={12} rx={2} fill={r.f} />
          <T x={x + 20} y={y + i * lh} lines={r.t} size={14} fill={C.fg} />
        </g>
      ))}
    </g>
  );
}

export function KraftsystemetNorgeFigur() {
  const prod = [
    { f: C.cold, t: "Vannkraft 138 TWh (1818 verk)" },
    { f: C.teal, t: "Vindkraft 15,9 TWh (64 verk)" },
    { f: C.warm, t: "Rest (egen utregning): ca. 3 TWh" },
  ];
  const inst = [
    { f: C.cold, t: "Vannkraft 34 082 MW" },
    { f: C.teal, t: "Vindkraft 5082 MW" },
    { f: G.amber, t: "Solkraft 871 MW" },
    { f: C.warm, t: "Varmekraft 525 MW" },
  ];
  return (
    <G2Figur
      title="Kraftsystemet i Norge: produksjon, installert effekt og magasiner"
      desc="Norsk kraftsystem. Normalårsproduksjon er ca. 157 TWh: vannkraft 138 TWh fra 1818 verk, vindkraft 15,9 TWh fra 64 verk og en rest på ca. 3 TWh, egen utregning (157 minus 138 minus 15,9). Installert effekt ved inngangen til 2026: vannkraft 34 082 MW, vindkraft 5082 MW, solkraft 871 MW og varmekraft 525 MW. Samlet installert effekt er 40 560 MW, egen utregning av vannkraft, vindkraft, solkraft og varmekraft. Norge har omtrent 1100 magasiner med over 87 TWh lagringskapasitet. I overkant av 75 prosent av produksjonskapasiteten er regulerbar."
      heading="Norges kraftsystem: vannkraft er ryggraden"
      caption="Normalårsproduksjon og installert effekt er to ulike ting: TWh er energi over et år, MW er effekt. Effekttallene er installert effekt ved inngangen til 2026, ikke produksjon. Summen 40 560 MW og resten på ca. 3 TWh (157 − 138 − 15,9) er egen utregning. Kilde: Energifakta Norge (NVE)."
      narrow={{ w: 300, h: 776 }}
      wide={{ w: 720, h: 420 }}
      animated
      name="kraftsystemet"
    >
      {({ bred, mk }) => {
        const colW = bred ? 340 : 280;
        const rx = bred ? 380 : 10;
        const ry = bred ? 14 : 0;
        const iy = bred ? 168 : 168;
        const my = bred ? 0 : 456;
        const my0 = bred ? 14 : my;
        const reg = my0 + (bred ? 170 : 150) + 18;
        return (
          <>
            {/* 1. produksjon */}
            <T x={10} y={26} lines="Produksjon i et normalår" size={16} weight={700} fill={C.fg} />
            <T x={10} y={45} lines="ca. 157 TWh (energi per år)" size={14} fill={C.muted} />
            <SegBar x={10} y={56} w={colW} segs={[{ v: 138, f: C.cold }, { v: 15.9, f: C.teal }, { v: 3, f: C.warm }]} />
            <Legende x={10} y={106} rader={prod} />
            {/* 2. installert effekt */}
            <T x={10} y={iy + 6} lines="Installert effekt" size={16} weight={700} fill={C.fg} />
            <T x={10} y={iy + 25} lines={bred ? "ved inngangen til 2026 (effekt, ikke produksjon)" : ["ved inngangen til 2026", "(effekt, ikke produksjon)"]} size={14} fill={C.muted} />
            <SegBar x={10} y={iy + (bred ? 38 : 56)} w={colW} segs={[{ v: 34082, f: C.cold }, { v: 5082, f: C.teal }, { v: 871, f: G.amber }, { v: 525, f: C.warm }]} />
            <Legende x={10} y={iy + (bred ? 88 : 106)} rader={inst} />
            <T x={10} y={iy + (bred ? 88 : 106) + 4 * 21 + 4} lines={bred ? ["Samlet 40 560 MW ved inngangen til 2026", "(egen utregning: vann 34 082 + vind 5082 +", "sol 871 + varme 525)"] : ["Samlet 40 560 MW ved", "inngangen til 2026", "(egen utregning: vann", "34 082 + vind 5082 +", "sol 871 + varme 525)"]} size={14} fill={C.muted} lh={19} />
            {/* 3. magasin */}
            <Box x={rx} y={bred ? 14 : my} w={colW} h={bred ? 170 : 150} stroke={C.cold} fill={G.panel} sw={1.6} />
            <T x={rx + 14} y={(bred ? 14 : my) + 26} lines="Magasiner" size={16} weight={700} fill={C.cold} />
            <T
              x={rx + 14}
              y={(bred ? 14 : my) + 48}
              lines={["Omtrent 1100 magasiner med", "over 87 TWh lagringskapasitet.", "Det er 87 ÷ 157 = 55 prosent av", "en normalårsproduksjon."]}
              size={14}
              fill={C.fg}
              lh={19}
            />
            {/* magasinikon */}
            <rect x={rx + colW - 76} y={(bred ? 14 : my) + 44} width={60} height={64} rx={4} fill={G.waterDeep} stroke={G.water} strokeWidth={1.4} />
            <path className="a a-sway" style={{ ["--dx" as string]: "6px" }} d={`M${rx + colW - 76} ${(bred ? 14 : my) + 60} q10 -8 20 0 t20 0 t20 0 v-6 h-60 z`} fill={G.water} opacity={0.8} />
            <Flow d={`M${rx + colW - 46} ${(bred ? 14 : my) + 112} L${rx + colW - 46} ${(bred ? 14 : my) + 136}`} color={C.rain} marker={mk.rain} w={2} />
            {/* 4. regulerbar */}
            <T x={rx} y={reg + 14} lines="Regulerbar kraft" size={16} weight={700} fill={C.fg} />
            <rect x={rx} y={reg + 28} width={colW} height={24} rx={4} fill={G.panel} stroke={G.line} />
            <rect x={rx} y={reg + 28} width={colW * 0.75} height={24} rx={4} fill={C.teal} />
            <T x={rx + colW * 0.75 - 8} y={reg + 46} lines="75 %" size={14} weight={700} fill={C.bg} anchor="end" />
            <T
              x={rx}
              y={reg + 76}
              lines={bred ? ["I overkant av 75 % av produksjonskapasiteten", "er regulerbar. Vann i magasin kan holdes tilbake;", "vind og sol må produsere når været gir energi."] : ["I overkant av 75 % av produksjons-", "kapasiteten er regulerbar. Vann i", "magasin kan holdes tilbake; vind og", "sol må produsere når været gir energi."]}
              size={14}
              fill={C.fg}
              lh={19}
            />
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- PrisomraderFigur ---------- */

const ZONER = [
  { id: "NO1", navn: "Østlandet", d: "Østlandet (unntatt vestlige Buskerud)", f: C.warm },
  { id: "NO2", navn: "Sørvest-Norge", d: "Vestfold, Telemark, Agder, Rogaland og sørlige deler av Vestland", f: C.low },
  { id: "NO3", navn: "Midt-Norge", d: "Nordre og vestlige Vestland, Møre og Romsdal, Trøndelag til Tunnsjødal, Innlandet vest/nord for Vågåmo", f: C.teal },
  { id: "NO4", navn: "Nord-Norge", d: "Nord-Norge og nordligste Trøndelag", f: C.cold },
  { id: "NO5", navn: "Vestlandet", d: "Midtre Vestland til Sognefjorden, Indre Sogn, vestlige Buskerud", f: G.violet },
] as const;

const FLASKEHALS: [number, number][] = [
  [105, 171],
  [98, 215],
  [70, 225],
  [71, 257],
  [57, 274],
  [73, 283],
];

function brytTekst(t: string, maks: number): string[] {
  const ut: string[] = [];
  let lin = "";
  for (const o of t.split(" ")) {
    if (lin && (lin + " " + o).length > maks) {
      ut.push(lin);
      lin = o;
    } else lin = lin ? lin + " " + o : o;
  }
  if (lin) ut.push(lin);
  return ut;
}

function sonePlan(bred: boolean) {
  let y = bred ? 30 : 410;
  const rader = ZONER.map((z) => {
    const lin = z.id === "NO2" ? (bred ? ["Vestfold, Telemark, Agder, Rogaland", "og sørlige deler av Vestland"] : ["Vestfold, Telemark, Agder,", "Rogaland og sørlige deler av Vestland"]) : brytTekst(z.d, bred ? 36 : 33);
    const ly = y;
    y += 20 + lin.length * 17 + (bred ? 14 : 18);
    return { z, lin, ly };
  });
  return { rader, slutt: y };
}

const KAP_MW = [
  ["Sverige", "ca. 4000"],
  ["Danmark", "1600"],
  ["Tyskland", "1400"],
  ["Storbritannia", "1400"],
  ["Nederland", "700"],
];

function Pille({ id, x, y, ax, ay, f }: { id: string; x: number; y: number; ax: number; ay: number; f: string }) {
  return (
    <g>
      <line x1={x + 40} y1={y + 10} x2={ax} y2={ay} stroke={f} strokeWidth={1.4} />
      <circle cx={ax} cy={ay} r={2.6} fill={f} />
      <rect x={x} y={y} width={40} height={20} rx={10} fill={C.bg} stroke={f} strokeWidth={1.6} />
      <T x={x + 20} y={y + 15} lines={id} size={14} weight={700} fill={f} anchor="middle" />
    </g>
  );
}

function Budkart({ mk }: { mk: Record<string, string> }) {
  return (
    <g>
      <defs>
        <clipPath id="g2a-bud-klipp">
          <rect x={-2} y={-4} width={302} height={394} />
        </clipPath>
      </defs>
      <g clipPath="url(#g2a-bud-klipp)">
      {Object.entries(NABO).map(([n, d]) => (
        <path key={n} d={d} fill={G.panel2} stroke={G.line} strokeWidth={0.8} />
      ))}
      </g>
      {ZONER.map((z) => (
        <path key={z.id} d={BUD[z.id]} fill={z.f} fillOpacity={0.8} stroke={C.bg} strokeWidth={0.8} strokeLinejoin="round" />
      ))}
      {FLASKEHALS.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={7} fill="none" stroke={G.amber} strokeWidth={1.6} className={i % 2 ? "a a-pulse" : "a a-pulse2"} />
          <circle cx={x} cy={y} r={3} fill={G.amber} />
        </g>
      ))}
      <Flow d="M108 262 L138 262" color={C.fg} marker={mk.fg} w={1.8} />
      <Flow d="M100 205 L132 205" color={C.fg} marker={mk.fg} w={1.8} />
      <Flow d="M118 140 L150 140" color={C.fg} marker={mk.fg} w={1.8} />
      <Flow d="M234 52 L236 88" color={C.fg} marker={mk.fg} w={1.8} />
      <T x={242} y={84} lines="Finland" size={14} fill={C.fg} />
      <Flow d="M56 322 L70 350" color={C.fg} marker={mk.fg} w={1.8} />
      <Flow d="M40 312 L16 338" color={C.fg} marker={mk.fg} w={1.8} />
      <T x={118} y={284} lines="Sverige" size={14} fill={C.fg} />
      <T x={92} y={376} lines="Danmark" size={14} fill={C.fg} />
      <Pille id="NO4" x={6} y={96} ax={118} ay={122} f={ZONER[3].f} />
      <Pille id="NO3" x={6} y={168} ax={78} ay={202} f={ZONER[2].f} />
      <Pille id="NO5" x={6} y={222} ax={50} ay={246} f={ZONER[4].f} />
      <Pille id="NO2" x={6} y={262} ax={52} ay={288} f={ZONER[1].f} />
      <Pille id="NO1" x={118} y={228} ax={92} ay={252} f={ZONER[0].f} />
    </g>
  );
}

export function PrisomraderFigur() {
  return (
    <G2Figur
      title="Norges fem budområder (prisområder) NO1 til NO5"
      desc="Skjematisk kart over Norge delt i fem budområder: NO1 Østlandet, NO2 Sørvest-Norge, NO3 Midt-Norge, NO4 Nord-Norge og NO5 Vestlandet. Grensene mellom områdene er markert med gule ringer som flaskehalser i kraftnettet. Piler viser et utvalg av forbindelsene til Sverige fra NO1, NO3 og NO4, til Finland fra NO4, til Danmark og, mot sørvest, til Storbritannia, Nederland og Tyskland. Kapasitet i MW: Sverige ca. 4000, Danmark 1600, Tyskland 1400, Storbritannia 1400, Nederland 700, totalt ca. 9000. NO1 er Østlandet unntatt vestlige Buskerud. NO3 er nordre og vestlige Vestland, Møre og Romsdal, Trøndelag til Tunnsjødal og Innlandet vest og nord for Vågåmo. NO4 er Nord-Norge og nordligste Trøndelag. NO5 er midtre Vestland til Sognefjorden, Indre Sogn og vestlige Buskerud. I 2025 var eksporten 34,3 TWh og importen 11,5 TWh, netto 22,8 TWh."
      heading="Fem prisområder i Norge"
      caption="Skjematisk kart: grensene er omtrentlige. De følger flaskehalser i kraftnettet og ikke fylkesgrensene. Grenser etter NVE (budområder), forenklet; naboland fra Natural Earth. Kilder: Statnett (u.å.) og Energifakta Norge (u.å.-b)."
      narrow={{ w: 300, h: 1114 }}
      wide={{ w: 720, h: 560 }}
      animated
      name="prisområdene"
    >
      {({ bred, mk }) => (
        <>
          {bred ? (
            <g transform="translate(100 16)">
              <Budkart mk={mk} />
            </g>
          ) : (
            <g transform="translate(2 4)">
              <Budkart mk={mk} />
            </g>
          )}
          {bred ? <T x={8} y={372} lines={["Storbritannia,", "Nederland og", "Tyskland"]} size={14} fill={C.fg} lh={17} /> : null}
          {sonePlan(bred).rader.map(({ z, lin, ly }) => {
            const lx = bred ? 410 : 10;
            return (
              <g key={z.id}>
                <rect x={lx} y={ly - 14} width={44} height={22} rx={11} fill={z.f} />
                <T x={lx + 22} y={ly + 2} lines={z.id} size={14} weight={700} fill={C.bg} anchor="middle" />
                <T x={lx + 54} y={ly + 2} lines={z.navn} size={16} weight={700} fill={C.fg} />
                <T x={lx + 54} y={ly + 20} lines={lin} size={14} fill={C.muted} lh={17} />
              </g>
            );
          })}
          {/* flaskehals-forklaring og utveksling */}
          <g transform={`translate(${bred ? 410 : 10} ${sonePlan(bred).slutt + (bred ? 4 : 0)})`}>
            <circle cx={8} cy={0} r={6} fill="none" stroke={G.amber} strokeWidth={1.6} />
            <circle cx={8} cy={0} r={2.6} fill={G.amber} />
            <T x={24} y={5} lines="Flaskehals i nettet" size={14} fill={C.fg} />
            <Flow d="M2 22 L16 22" color={C.fg} marker={mk.fg} w={1.8} />
            <T x={24} y={27} lines="Utenlandsforbindelser (utvalg, skjematisk)" size={14} fill={C.fg} />
            <Box x={0} y={44} w={bred ? 296 : 280} h={bred ? 64 : 80} stroke={G.line} fill={G.panel} />
            <T
              x={12}
              y={64}
              lines={bred ? ["2025: eksport 34,3 TWh, import 11,5 TWh,", "netto 22,8 TWh (Energifakta Norge)."] : ["2025: eksport 34,3 TWh,", "import 11,5 TWh, netto 22,8 TWh", "(Energifakta Norge)."]}
              size={14}
              fill={C.fg}
              lh={19}
            />
          </g>
          {/* kapasitet på utenlandsforbindelsene */}
          <g transform={bred ? "translate(10 436)" : `translate(10 ${sonePlan(false).slutt + 142})`}>
            <Box x={0} y={0} w={bred ? 380 : 280} h={bred ? 104 : 150} stroke={C.fg} fill={G.panel} />
            <T x={12} y={24} lines="Kapasitet på utenlandsforbindelsene (MW)" size={14} weight={700} fill={C.fg} />
            {bred ? (
              <T x={12} y={46} lines={["Sverige ca. 4000, Danmark 1600, Tyskland 1400,", "Storbritannia 1400, Nederland 700.", "Totalt ca. 9000 MW."]} size={14} fill={C.fg} lh={19} />
            ) : (
              <T x={12} y={46} lines={["Sverige ca. 4000", "Danmark 1600", "Tyskland 1400", "Storbritannia 1400", "Nederland 700", "Totalt ca. 9000 MW"]} size={14} fill={C.fg} lh={19} />
            )}
          </g>
        </>
      )}
    </G2Figur>
  );
}
