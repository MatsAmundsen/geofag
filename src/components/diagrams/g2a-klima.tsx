import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T, nb } from "./g2a-kit";

/* ---------- KarbonkretsloepFigur ---------- */

type Dir = "inn" | "ut" | "begge" | null;
type KNode = { navn: string; d: string; dir: Dir; fossil?: boolean };

const NH = 46;
const RAD = 62;

const RASK: KNode[] = [
  { navn: "Planter og alger", d: "tar opp CO₂", dir: "inn" },
  { navn: "Dyr", d: "respirasjon", dir: "ut" },
  { navn: "Jord", d: "nedbrytning", dir: "ut" },
  { navn: "Hav", d: "løser CO₂", dir: "begge" },
];
const LANGSOM: KNode[] = [
  { navn: "Vulkanutbrudd", d: "karbon ut", dir: "ut" },
  { navn: "Forvitring", d: "tar opp CO₂", dir: "inn" },
  { navn: "Kalkstein", d: "bergart", dir: null },
  { navn: "Sediment", d: "karbon lagres", dir: null },
  { navn: "Kull", d: "kull, olje, gass", dir: "ut", fossil: true },
];

function KretsPanel({
  x, y, w, h, tittel, under, f, noder, nx, nw, airX, airW, luft, mk, bred, kobl,
}: {
  x: number; y: number; w: number; h: number; tittel: string; under: string; f: string;
  noder: KNode[]; nx: number; nw: number; airX: number; airW: number; luft: "hoyre" | "venstre";
  mk: Record<string, string>; bred: boolean; kobl: [number, number][];
}) {
  const y0 = y + 66;
  const kant = luft === "hoyre" ? nx + nw : nx;
  const luftKant = luft === "hoyre" ? airX : airX + airW;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} stroke={f} fill={G.panel} sw={1.6} />
      <T x={x + 14} y={y + 26} lines={tittel} size={16} weight={700} fill={f} />
      <T x={x + 14} y={y + 46} lines={under} size={14} fill={C.muted} />
      {kobl.map(([a, b]) => (
        <Flow key={`${a}-${b}`} d={a < b ? `M${nx + 24} ${y0 + a * RAD + NH + 1} L${nx + 24} ${y0 + b * RAD - 2}` : `M${nx + 24} ${y0 + a * RAD - 1} L${nx + 24} ${y0 + b * RAD + NH + 2}`} color={f} marker={mk[f === C.sand ? "sand" : "teal"]} w={2} cls="a a-flow" />
      ))}
      {noder.map((n, i) => {
        const ny = y0 + i * RAD;
        const cy = ny + NH / 2;
        const farge = n.fossil ? C.low : n.dir === "inn" ? C.teal : n.dir === "begge" ? C.rain : C.warm;
        const merke = n.fossil ? mk.low : n.dir === "inn" ? mk.teal : n.dir === "begge" ? mk.rain : mk.warm;
        return (
          <g key={n.navn}>
            <Box x={nx} y={ny} w={nw} h={NH} stroke={n.fossil ? C.low : f} fill={G.panel2} sw={n.fossil ? 2.2 : 1.4} />
            <T x={nx + 10} y={ny + 19} lines={n.navn} size={14} weight={700} fill={C.fg} />
            <T x={nx + 10} y={ny + 37} lines={n.d} size={14} fill={C.muted} />
            {n.dir === "ut" && (
              <Flow d={`M${kant + (luft === "hoyre" ? 4 : -4)} ${cy} L${luftKant + (luft === "hoyre" ? -3 : 3)} ${cy}`} color={farge} marker={merke} w={n.fossil ? 4 : 2.4} cls="a a-flow" />
            )}
            {n.dir === "inn" && (
              <Flow d={`M${luftKant + (luft === "hoyre" ? -3 : 3)} ${cy} L${kant + (luft === "hoyre" ? 4 : -4)} ${cy}`} color={farge} marker={merke} w={2.4} cls="a a-flow" />
            )}
            {n.dir === "begge" && (
              <>
                <Flow d={`M${kant + (luft === "hoyre" ? 4 : -4)} ${cy - 8} L${luftKant + (luft === "hoyre" ? -3 : 3)} ${cy - 8}`} color={C.warm} marker={mk.warm} w={2.4} cls="a a-flow" />
                <Flow d={`M${luftKant + (luft === "hoyre" ? -3 : 3)} ${cy + 8} L${kant + (luft === "hoyre" ? 4 : -4)} ${cy + 8}`} color={C.teal} marker={mk.teal} w={2.4} cls="a a-flow" />
              </>
            )}
            {n.fossil && bred && (
              <T x={(kant + luftKant) / 2} y={cy - 36} lines={["Brenning av", "fossilt brensel"]} size={14} weight={700} fill={C.low} anchor="middle" lh={16} />
            )}
          </g>
        );
      })}
      {void bred}
    </g>
  );
}

function Luftblokk({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={C.teal} fillOpacity={0.14} stroke={C.teal} strokeWidth={2} className="a a-pulse2" />
      <T x={x + w / 2} y={y + h / 2 - 4} lines="Lufta" size={16} weight={700} fill={C.fg} anchor="middle" />
      <T x={x + w / 2} y={y + h / 2 + 22} lines="CO₂" size={22} weight={700} fill={C.teal} anchor="middle" />
    </g>
  );
}

export function KarbonkretsloepFigur() {
  return (
    <G2Figur
      title="Karbonkretsløpet: det raske og det langsomme kretsløpet"
      desc="Diagram med to kretsløp som begge utveksler karbon med lufta. I det raske kretsløpet tar planter og alger opp CO₂, karbonet går videre til dyr og jord og kommer tilbake til lufta ved respirasjon og nedbrytning, og havet tar opp og avgir CO₂. Omløpstiden er fra dager til noen tusen år. I det langsomme kretsløpet går karbon inn i sediment og bergarter som kalkstein og kull, og kommer ut igjen ved vulkanutbrudd, mens forvitring tar CO₂ ut av lufta. Sediment går i to grener, til kalkstein og til kull. Det tar fra tusenvis til millioner av år. En pil viser at brenning av fossilt brensel i berggrunnen flytter karbon til lufta. Under vises at av CO₂-utslippene i tiåret 2015 til 2024 ble 50 prosent værende i lufta, 29 prosent gikk til havet og 21 prosent til landjorda. IPCC anslår at land og hav til sammen tar opp omtrent 56 prosent av utslippene hvert år, som snitt over seks tiår."
      heading="Karbonkretsløpet: raskt og langsomt"
      caption="Pilene viser hvilken vei karbonet går. Fordelingen på 50, 29 og 21 % gjelder CO₂-utslippene i tiåret 2015–2024 (Friedlingstein mfl., 2026), mens 56 % er et IPCC-snitt over seks tiår. Kilder: Store norske leksikon (SNL, u.å.), Bjerknessenteret (u.å.), IPCC (2021) og Friedlingstein mfl. (2026)."
      narrow={{ w: 300, h: 1100 }}
      wide={{ w: 720, h: 656 }}
      animated
      name="karbonkretslop-figuren"
    >
      {({ bred, mk }) => {
        const hF = 66 + 3 * RAD + NH + 14;
        const hS = 66 + 4 * RAD + NH + 14;
        const segs = [
          { t: "50 %", n: "ble i lufta", p: 50, f: C.low },
          { t: "29 %", n: "gikk til havet", p: 29, f: C.cold },
          { t: "21 %", n: "gikk til landjorda", p: 21, f: G.green },
        ];
        const bw = bred ? 700 : 280;
        let acc = 0;
        const yLeg = bred ? 10 + hS + 26 : 10 + hF + 12 + hS + 36;
        const yD = yLeg + (bred ? 74 : 112);
        return (
          <>
            {bred ? (
              <>
                <KretsPanel x={10} y={10} w={260} h={hS} tittel="Det raske kretsløpet" under="dager til noen tusen år" f={C.teal} noder={RASK} nx={24} nw={146} airX={290} airW={140} luft="hoyre" mk={mk} bred kobl={[[0, 1], [1, 2]]} />
                <Luftblokk x={290} y={76} w={140} h={3 * RAD + NH + 4 * 0 + RAD} />
                <KretsPanel x={450} y={10} w={260} h={hS} tittel="Det langsomme kretsløpet" under="tusenvis til millioner av år" f={C.sand} noder={LANGSOM} nx={564} nw={132} airX={290} airW={140} luft="venstre" mk={mk} bred kobl={[[3, 2], [3, 4]]} />
              </>
            ) : (
              <>
                <KretsPanel x={10} y={10} w={280} h={hF} tittel="Det raske kretsløpet" under="dager til noen tusen år" f={C.teal} noder={RASK} nx={22} nw={140} airX={208} airW={74} luft="hoyre" mk={mk} bred={false} kobl={[[0, 1], [1, 2]]} />
                <Luftblokk x={208} y={76} w={74} h={3 * RAD + NH} />
                <KretsPanel x={10} y={10 + hF + 12} w={280} h={hS} tittel="Det langsomme kretsløpet" under="tusenvis til millioner av år" f={C.sand} noder={LANGSOM} nx={22} nw={140} airX={208} airW={74} luft="hoyre" mk={mk} bred={false} kobl={[[3, 2], [3, 4]]} />
                <Luftblokk x={208} y={10 + hF + 12 + 66} w={74} h={4 * RAD + NH} />
              </>
            )}
            {/* tegnforklaring */}
            <Flow d={`M12 ${yLeg} L44 ${yLeg}`} color={C.low} marker={mk.low} w={4} />
            <T x={54} y={yLeg + 5} lines={bred ? "Brenning av olje, kull og gass flytter karbon fra berggrunnen til lufta." : ["Brenning av olje, kull og gass", "flytter karbon fra berggrunnen", "til lufta."]} size={14} fill={C.fg} lh={17} />
            <Flow d={`M12 ${yLeg + (bred ? 26 : 64)} L26 ${yLeg + (bred ? 26 : 64)}`} color={C.teal} marker={mk.teal} w={2.4} />
            <Flow d={`M32 ${yLeg + (bred ? 26 : 64)} L46 ${yLeg + (bred ? 26 : 64)}`} color={C.sand} marker={mk.sand} w={2.4} />
            <T x={56} y={yLeg + (bred ? 31 : 69)} lines={bred ? "Naturlig utveksling: pila viser retning." : ["Naturlig utveksling:", "pila viser retning."]} lh={17} size={14} fill={C.fg} />
            {/* fordeling */}
            <T x={10} y={yD} lines={bred ? "Hva ble det av CO₂-utslippene i tiåret 2015–2024?" : ["Hva ble det av CO₂-utslippene", "i tiåret 2015–2024?"]} size={16} weight={700} fill={C.fg} lh={20} />
            {segs.map((s) => {
              const x = 10 + (acc / 100) * bw;
              const wd = (s.p / 100) * bw;
              acc += s.p;
              const by = yD + (bred ? 14 : 34);
              return (
                <g key={s.t}>
                  <rect x={x} y={by} width={wd - 2} height={bred ? 34 : 30} rx={4} fill={s.f} />
                  <T x={x + 10} y={by + (bred ? 23 : 21)} lines={s.t} size={bred ? 16 : 14} weight={700} fill={C.bg} />
                  {bred && <T x={x + 2} y={by + 56} lines={s.n} size={14} fill={C.fg} />}
                </g>
              );
            })}
            {!bred && <T x={10} y={yD + 88} lines={["50 % ble i lufta, 29 % gikk til havet", "og 21 % til landjorda."]} size={14} fill={C.fg} lh={17} />}
            <Box x={10} y={yD + (bred ? 86 : 124)} w={bred ? 700 : 280} h={bred ? 62 : 106} stroke={G.line} fill={G.panel2} sw={1.4} />
            <T x={22} y={yD + (bred ? 113 : 148)} lines={bred ? ["IPCC anslår at land og hav til sammen tar opp omtrent 56 % av CO₂-utslippene hvert år,", "som snitt over seks tiår. Det er ikke det samme som 50 % i tiåret 2015–2024."] : ["IPCC anslår at land og hav til", "sammen tar opp omtrent 56 % av", "CO₂-utslippene hvert år, som snitt", "over seks tiår (ikke tiåret", "2015–2024)."]} size={14} fill={C.fg} lh={17} />
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- UtslippSektorFigur ---------- */

const SEKTORER = [
  { navn: "Energiforsyning", p: 34, f: C.warm },
  { navn: "Industri", p: 24, f: C.sand },
  { navn: "Jordbruk, skogbruk og arealbruk", kort: ["Jordbruk, skogbruk", "og arealbruk"], p: 22, f: G.green },
  { navn: "Transport", p: 15, f: C.cold },
  { navn: "Bygg", p: 6, f: G.violet },
];
const FOSSIL = [
  { navn: "Kull", p: 41, f: C.low },
  { navn: "Olje", p: 32, f: C.warm },
  { navn: "Gass", p: 21, f: C.cold },
];

export function UtslippSektorFigur() {
  return (
    <G2Figur
      title="Globale klimagassutslipp 2019 fordelt på sektorer"
      desc="Stolpediagram over de globale klimagassutslippene i 2019, som var 59 pluss minus 6,6 milliarder tonn CO₂-ekvivalenter. Energiforsyning sto for 34 prosent, industri 24 prosent, jordbruk, skogbruk og arealbruk 22 prosent, transport 15 prosent og bygg 6 prosent. Prosentene er avrundet og summerer seg til 101. En egen stolpe viser at av de fossile CO₂-utslippene i 2024 kom 41 prosent fra kull, 32 prosent fra olje og 21 prosent fra gass."
      heading="Utslipp fordelt på sektorer"
      caption="Prosentene er avrundet og summerer seg til 101 %. Regnes strøm og varme der de brukes, blir industri 34 % og bygg 16 %. Kilder: IPCC (2022) og Friedlingstein mfl. (2026)."
      narrow={{ w: 300, h: 828 }}
      wide={{ w: 720, h: 384 }}
    >
      {({ bred }) => {
        const maxW = bred ? 180 : 200;
        const x0 = bred ? 250 : 12;
        const rowH = bred ? 44 : 62;
        const y0 = bred ? 84 : 92;
        const fw = bred ? 210 : 270;
        const fx = bred ? 500 : 12;
        const fy = bred ? 40 : y0 + 5 * rowH + 28;
        return (
          <>
            <T x={10} y={30} lines="59 ± 6,6 Gt CO₂e" size={bred ? 26 : 24} weight={700} fill={C.fg} />
            <T x={bred ? 10 : 10} y={bred ? 54 : 56} lines={bred ? "globale klimagassutslipp i 2019" : "globale klimagassutslipp i 2019"} size={14} fill={C.muted} />
            {SEKTORER.map((s, i) => {
              const y = y0 + i * rowH;
              const bl = (s.p / 34) * maxW;
              return (
                <g key={s.navn}>
                  {bred ? (
                    <T x={10} y={y + 20} lines={s.navn.length > 22 ? s.kort ?? s.navn : s.navn} size={14} weight={700} fill={C.fg} lh={16} />
                  ) : (
                    <T x={12} y={y + 14} lines={s.navn} size={14} weight={700} fill={C.fg} />
                  )}
                  <rect x={x0} y={bred ? y + 4 : y + 22} width={bl} height={bred ? 28 : 26} rx={4} fill={s.f} />
                  <T x={x0 + bl + 8} y={bred ? y + 24 : y + 42} lines={`${s.p} %`} size={16} weight={700} fill={s.f} />
                </g>
              );
            })}
            <Box x={fx} y={fy} w={fw} h={282} stroke={G.line} fill={G.panel} sw={1.4} />
            <T x={fx + 12} y={fy + 24} lines="Fossile CO₂-utslipp 2024" size={14} weight={700} fill={C.fg} />
            <T x={fx + 12} y={fy + 42} lines="fordelt på brensel" size={14} fill={C.muted} />
            {FOSSIL.map((s, i) => {
              const y = fy + 62 + i * 44;
              const bl = (s.p / 41) * (fw - 100);
              return (
                <g key={s.navn}>
                  <T x={fx + 12} y={y + 20} lines={s.navn} size={14} weight={700} fill={C.fg} />
                  <rect x={fx + 56} y={y + 4} width={bl} height={26} rx={4} fill={s.f} />
                  <T x={fx + 56 + bl + 6} y={y + 23} lines={`${s.p} %`} size={14} weight={700} fill={s.f} />
                </g>
              );
            })}
            <Box x={bred ? 10 : 12} y={bred ? 312 : fy + 298} w={bred ? 470 : 276} h={bred ? 58 : 76} stroke={C.rain} fill={G.panel2} sw={1.4} />
            <T x={bred ? 22 : 24} y={bred ? 336 : fy + 322} lines={bred ? ["Regnes strøm og varme der de brukes,", "blir industri 34 % og bygg 16 %."] : ["Regnes strøm og varme der de", "brukes, blir industri 34 % og", "bygg 16 %."]} size={14} fill={C.fg} lh={18} />
            <T x={fx + 12} y={fy + 206} lines={["Sement 4 %, fakling", "og annet 2 %"]} size={14} fill={C.fg} lh={17} />
            <T x={fx + 12} y={fy + 250} lines={["Til sammen 37,8 ± 1,8", "Gt CO₂ fra fossile kilder"]} size={14} fill={C.muted} lh={17} />
          </>
        );
      }}
    </G2Figur>
  );
}


/* ---------- KarbonbudsjettFigur ---------- */

const SANNS = [
  { p: "17 %", a: 900, b: 2300 },
  { p: "33 %", a: 650, b: 1700 },
  { p: "50 %", a: 500, b: 1350 },
  { p: "67 %", a: 400, b: 1150 },
  { p: "83 %", a: 300, b: 900 },
];

export function KarbonbudsjettFigur() {
  return (
    <G2Figur
      title="Karbonbudsjettet for 1,5 og 2 grader: mer sikkerhet gir mindre budsjett"
      desc="Stolpediagram over det gjenværende karbonbudsjettet i milliarder tonn CO₂ fra begynnelsen av 2020, etter sannsynlighet for å holde seg under grensen. For 1,5 grader er budsjettet 900 ved 17 prosent, 650 ved 33, 500 ved 50, 400 ved 67 og 300 ved 83 prosent. For 2 grader er det 2300, 1700, 1350, 1150 og 900. Jo større sannsynlighet, desto mindre budsjett. Et eget panel viser budsjettet fra begynnelsen av 2026 ifølge Global Carbon Project: 170 for 1,5 grader med 50 prosent sannsynlighet, 525 for 1,7 grader og 1055 for 2 grader. Med 42 milliarder tonn i året er 170 brukt opp om lag fire år. Panelene har ulik skala."
      heading="Karbonbudsjettet: sikkerhet mot mengde"
      caption="Tall i Gt CO₂. Usikkerheten fra andre gasser og tilbakekoblinger er minst ±220 Gt CO₂. Om lag fire år er regnet ut av oss: 170 ÷ 42 Gt. Panelene har ulik skala. 42 Gt er fossile utslipp og endret arealbruk (2024: 42,4 Gt). Kilder: IPCC (2021) og Friedlingstein mfl. (2026)."
      narrow={{ w: 300, h: 820 }}
      wide={{ w: 720, h: 452 }}
    >
      {({ bred, mk }) => {
        const bx = bred ? 62 : 56;
        const sc = bred ? 280 / 2300 : 168 / 2300;
        const rowH = bred ? 60 : 62;
        const y0 = bred ? 100 : 108;
        const gx = bred ? 440 : 10;
        const gw = bred ? 270 : 280;
        const gy = bred ? 120 : y0 + 5 * rowH + 108;
        const rs = [
          { t: "1,5 °C", v: 170, f: C.teal },
          { t: "1,7 °C", v: 525, f: C.cold },
          { t: "2 °C", v: 1055, f: C.warm },
        ];
        const gsc = (gw - 128) / 1055;
        return (
          <>
            <T x={10} y={24} lines="Fra begynnelsen av 2020 (IPCC)" size={16} weight={700} fill={C.fg} />
            <T x={10} y={44} lines="Sannsynlighet for å holde seg under grensen" size={14} fill={C.muted} />
            <rect x={10} y={56} width={14} height={14} rx={3} fill={C.teal} />
            <T x={30} y={68} lines="1,5 °C" size={14} weight={700} fill={C.fg} />
            <rect x={96} y={56} width={14} height={14} rx={3} fill={C.warm} />
            <T x={116} y={68} lines="2,0 °C" size={14} weight={700} fill={C.fg} />
            {SANNS.map((r, i) => {
              const y = y0 + i * rowH;
              return (
                <g key={r.p}>
                  <T x={10} y={y + 24} lines={r.p} size={14} weight={700} fill={C.fg} />
                  <rect x={bx} y={y + 4} width={r.a * sc} height={bred ? 22 : 20} rx={3} fill={C.teal} />
                  <T x={bx + r.a * sc + 6} y={y + 21} lines={String(r.a)} size={14} weight={700} fill={C.teal} />
                  <rect x={bx} y={y + (bred ? 30 : 28)} width={r.b * sc} height={bred ? 22 : 20} rx={3} fill={C.warm} />
                  <T x={bx + r.b * sc + 6} y={y + (bred ? 47 : 45)} lines={nb(r.b)} size={14} weight={700} fill={C.warm} />
                </g>
              );
            })}
            {/* motsatt retning */}
            {bred ? (
              <>
                <Box x={440} y={10} w={270} h={96} stroke={C.rain} fill={G.panel2} sw={1.6} />
                <T x={454} y={34} lines={["Jo større sannsynlighet for å", "holde seg under grensen, desto", "mindre CO₂ kan vi slippe ut."]} size={14} fill={C.fg} lh={18} />
              </>
            ) : (
              <>
                <Box x={10} y={y0 + 5 * rowH + 6} w={280} h={78} stroke={C.rain} fill={G.panel2} sw={1.6} />
                <T x={22} y={y0 + 5 * rowH + 30} lines={["Jo større sannsynlighet for å holde", "seg under grensen, desto mindre", "CO₂ kan vi slippe ut."]} size={14} fill={C.fg} lh={18} />
              </>
            )}
            {/* GCP */}
            <Box x={gx} y={gy - (bred ? 0 : 0)} w={gw} h={bred ? 322 : 270} stroke={G.line} fill={G.panel} sw={1.4} />
            <T x={gx + 12} y={gy + 24} lines="Fra begynnelsen av 2026" size={16} weight={700} fill={C.fg} />
            <T x={gx + 12} y={gy + 44} lines="Global Carbon Project, Gt CO₂" size={14} fill={C.muted} />
            {rs.map((r, i) => {
              const y = gy + 62 + i * 40;
              return (
                <g key={r.t}>
                  <T x={gx + 12} y={y + 20} lines={r.t} size={14} weight={700} fill={C.fg} />
                  <rect x={gx + 62} y={y + 3} width={Math.max(r.v * gsc, 6)} height={24} rx={3} fill={r.f} />
                  <T x={gx + 62 + r.v * gsc + 6} y={y + 21} lines={nb(r.v)} size={14} weight={700} fill={r.f} />
                </g>
              );
            })}
            <T x={gx + 12} y={gy + 198} lines="Hvor lenge varer 170 Gt?" size={14} weight={700} fill={C.fg} />
            {[0, 1, 2, 3, 4].map((k) => {
              const sx = gx + 12 + k * 42;
              const del = k < 4 ? 1 : (170 - 4 * 42) / 42;
              return (
                <g key={k}>
                  <rect x={sx} y={gy + 208} width={36} height={30} rx={3} fill="none" stroke={C.muted} strokeWidth={1.4} />
                  <rect x={sx} y={gy + 208} width={36 * del} height={30} rx={3} fill={C.low} className={k === 4 ? "a a-pulse" : undefined} />
                </g>
              );
            })}
            <T x={gx + 12} y={gy + 258} lines={bred ? ["Hver rute er ett år med 42 Gt.", "170 ÷ 42: om lag fire år."] : ["Hver rute er ett år med 42 Gt:", "om lag fire år."]} size={14} fill={C.fg} lh={18} />
            {void mk}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- SspScenarioFigur ---------- */

const SSP = [
  { n: "SSP1-1.9", b: 1.4, lo: 1.0, hi: 1.8, f: "#19b5d8" },
  { n: "SSP1-2.6", b: 1.8, lo: 1.3, hi: 2.4, f: "#6a96dc" },
  { n: "SSP2-4.5", b: 2.7, lo: 2.1, hi: 3.5, f: "#f69320" },
  { n: "SSP3-7.0", b: 3.6, lo: 2.8, hi: 4.6, f: "#ef5a47" },
  { n: "SSP5-8.5", b: 4.4, lo: 3.3, hi: 5.7, f: "#c2303e", t: "#ee7f89" },
];
const HAV = [
  { n: "SSP1-1.9", lo: 0.28, hi: 0.55, f: "#19b5d8" },
  { n: "SSP5-8.5", lo: 0.63, hi: 1.01, f: "#c2303e", t: "#ee7f89" },
];

export function SspScenarioFigur() {
  return (
    <G2Figur
      title="SSP-scenariene: oppvarming 2081–2100 og havnivå i 2100"
      desc="Diagram over de fem SSP-scenariene med beste anslag og svært sannsynlig spenn for oppvarming 2081 til 2100 sammenlignet med 1850 til 1900. SSP1-1.9: 1,4 grader, 1,0 til 1,8. SSP1-2.6: 1,8, 1,3 til 2,4. SSP2-4.5: 2,7, 2,1 til 3,5. SSP3-7.0: 3,6, 2,8 til 4,6. SSP5-8.5: 4,4, 3,3 til 5,7. To stiplede linjer viser at dagens politikk gir 3,2 grader i 2100 og landenes innmeldte mål omtrent 2,8 grader. Havnivået stiger fram til 2100 med 0,28 til 0,55 meter i SSP1-1.9 og 0,63 til 1,01 meter i SSP5-8.5, sammenlignet med 1995 til 2014. Havnivåspennet er det sannsynlige spennet."
      heading="SSP-scenariene og oppvarming"
      caption="Prikken er beste anslag, og stolpen er det svært sannsynlige spennet for oppvarming. Havnivåstolpene viser det sannsynlige spennet. Fargene er lysnet fra IPCCs farger for å synes på mørk bakgrunn. Vedtatt politikk før 2020 og NDC-ene gjelder 2100. Kilder: IPCC (2021, 2022)."
      narrow={{ w: 300, h: 690 }}
      wide={{ w: 720, h: 546 }}
    >
      {({ bred }) => {
        const px0 = bred ? 132 : 14;
        const pw = bred ? 570 : 266;
        const X = (v: number) => px0 + (v / 6) * pw;
        const rowH = bred ? 50 : 60;
        const y0 = bred ? 64 : 66;
        const yAx = y0 + 5 * rowH + 6;
        const hy0 = yAx + (bred ? 70 : 94);
        const HX = (v: number) => px0 + (v / 1.1) * pw;
        return (
          <>
            {/* stiplede linjer */}
            {(bred
              ? [[38, yAx]]
              : [[44, y0 - 4], ...SSP.map((_, i) => [y0 + i * rowH + 22, y0 + (i + 1) * rowH - 4]), [y0 + 5 * rowH, yAx]]
            ).map(([a, b], i) => (
              <g key={i}>
                <line x1={X(2.8)} x2={X(2.8)} y1={a} y2={b} stroke={C.rain} strokeWidth={1.8} strokeDasharray="6 4" />
                <line x1={X(3.2)} x2={X(3.2)} y1={a} y2={b} stroke={C.low} strokeWidth={1.8} strokeDasharray="6 4" />
              </g>
            ))}
            <T x={X(2.8) - 6} y={bred ? 32 : 22} lines={bred ? "NDC: 2,8 °C" : ["NDC", "2,8 °C"]} size={14} weight={700} fill={C.rain} anchor="end" lh={16} />
            <T x={X(3.2) + 6} y={bred ? 32 : 22} lines={bred ? "Dagens politikk: 3,2 °C" : ["Dagens politikk", "3,2 °C"]} size={14} weight={700} fill={C.low} lh={16} />
            {SSP.map((s, i) => {
              const y = y0 + i * rowH;
              return (
                <g key={s.n}>
                  {bred ? (
                    <>
                      <T x={10} y={y + 20} lines={s.n} size={14} weight={700} fill={"t" in s ? s.t : s.f} />
                      <T x={10} y={y + 38} lines={`${nb(s.b, 1)} (${nb(s.lo, 1)}–${nb(s.hi, 1)})`} size={14} fill={C.fg} />
                    </>
                  ) : (
                    <>
                      <T x={14} y={y + 16} lines={s.n} size={14} weight={700} fill={"t" in s ? s.t : s.f} />
                      <T x={96} y={y + 16} lines={`${nb(s.b, 1)} (${nb(s.lo, 1)}–${nb(s.hi, 1)}) °C`} size={14} fill={C.fg} />
                    </>
                  )}
                  <rect x={X(s.lo)} y={bred ? y + 10 : y + 26} width={X(s.hi) - X(s.lo)} height={18} rx={9} fill={s.f} fillOpacity={0.45} stroke={s.f} strokeWidth={2} />
                  <circle cx={X(s.b)} cy={bred ? y + 19 : y + 35} r={8} fill={s.f} stroke={C.fg} strokeWidth={2} />
                </g>
              );
            })}
            {/* akse */}
            <line x1={px0} x2={px0 + pw} y1={yAx} y2={yAx} stroke={C.muted} strokeWidth={1.4} />
            {[0, 1, 2, 3, 4, 5, 6].map((v) => (
              <g key={v}>
                <line x1={X(v)} x2={X(v)} y1={yAx} y2={yAx + 6} stroke={C.muted} strokeWidth={1.4} />
                <T x={X(v)} y={yAx + 22} lines={String(v)} size={14} fill={C.fg} anchor="middle" />
              </g>
            ))}
            <T x={px0 + pw} y={yAx + 42} lines={bred ? "°C over 1850–1900, gjennomsnitt 2081–2100" : ["°C over 1850–1900,", "gjennomsnitt 2081–2100"]} size={14} fill={C.muted} anchor="end" lh={17} />
            {/* havnivå */}
            <T x={10} y={hy0 - 6} lines={bred ? "Havnivå i 2100 (sannsynlig spenn), meter over 1995–2014" : ["Havnivå i 2100 (sannsynlig", "spenn), meter over 1995–2014"]} size={16} weight={700} fill={C.fg} lh={19} />
            {HAV.map((s, i) => {
              const y = hy0 + (bred ? 14 : 30) + i * (bred ? 48 : 60);
              return (
                <g key={s.n}>
                  {bred ? (
                    <>
                      <T x={10} y={y + 18} lines={s.n} size={14} weight={700} fill={"t" in s ? s.t : s.f} />
                      <T x={10} y={y + 36} lines={`${nb(s.lo, 2)}–${nb(s.hi, 2)} m`} size={14} fill={C.fg} />
                    </>
                  ) : (
                    <>
                      <T x={14} y={y + 14} lines={s.n} size={14} weight={700} fill={"t" in s ? s.t : s.f} />
                      <T x={96} y={y + 14} lines={`${nb(s.lo, 2)}–${nb(s.hi, 2)} m`} size={14} fill={C.fg} />
                    </>
                  )}
                  <rect x={HX(s.lo)} y={bred ? y + 8 : y + 24} width={HX(s.hi) - HX(s.lo)} height={18} rx={4} fill={s.f} fillOpacity={0.45} stroke={s.f} strokeWidth={2} />
                </g>
              );
            })}
            {(() => {
              const ay = hy0 + (bred ? 14 : 30) + 2 * (bred ? 48 : 60) + 4;
              return (
                <>
                  <line x1={px0} x2={HX(1)} y1={ay} y2={ay} stroke={C.muted} strokeWidth={1.4} />
                  {[0, 0.5, 1].map((v) => (
                    <g key={v}>
                      <line x1={HX(v)} x2={HX(v)} y1={ay} y2={ay + 6} stroke={C.muted} strokeWidth={1.4} />
                      <T x={HX(v)} y={ay + 22} lines={nb(v, 1)} size={14} fill={C.fg} anchor="middle" />
                    </g>
                  ))}
                  <T x={HX(1) + 14} y={ay + 22} lines="m" size={14} fill={C.muted} />
                </>
              );
            })()}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- NorskeUtslippFigur ---------- */

const KILDER_NO = [
  { n: "Olje- og gassutvinning", v: 10.9, f: C.low },
  { n: "Industri og bergverk", v: 10.7, f: C.sand },
  { n: "Luftfart, sjøfart og anleggsmaskiner", k: ["Luftfart, sjøfart og", "anleggsmaskiner"], v: 7.4, f: C.cold },
  { n: "Veitrafikk", v: 6.9, f: C.warm },
];

export function NorskeUtslippFigur() {
  return (
    <G2Figur
      title="Norske klimagassutslipp: 1990, 2025 og klimalovens mål"
      desc="Stolpediagram over norske utslipp i millioner tonn CO₂-ekvivalenter. 1990: 51,2. 2025: 44,1, foreløpige tall, som er 13,9 prosent lavere enn i 1990. Klimalovens mål er utslipp minst 55 prosent lavere i 2030, omtrent 23 millioner tonn, 70 til 75 prosent lavere i 2035, det vil si 25 til 30 prosent av 1990-nivået eller 12,8 til 15,4 millioner tonn, og 90 til 95 prosent lavere i 2050, det vil si 5 til 10 prosent av 1990-nivået eller 2,6 til 5,1 millioner tonn. Et eget panel viser de største kildene i 2025: olje- og gassutvinning 10,9, industri og bergverk 10,7, luftfart, sjøfart og anleggsmaskiner 7,4 og veitrafikk 6,9 millioner tonn."
      heading="Utslipp i Norge og klimalovens mål"
      caption="SSB (2026), foreløpige tall for 2025. Tallene gjelder norsk territorium og omfatter ikke utenriks sjø- og luftfart. SSB bruker GWP-verdier fra AR5. Målene for 2030, 2035 og 2050 er lovfestet i klimaloven §§ 3–5. Målene for 2035 og 2050 er tegnet som felt etter prosent av 1990-nivået (51,2 Mt), og Mt-tallene er regnet ut av oss. Kilder: SSB (2026) og Klimaloven (2017)."
      narrow={{ w: 300, h: 872 }}
      wide={{ w: 720, h: 412 }}
    >
      {({ bred }) => {
        const bx = bred ? 112 : 14;
        const sc = (bred ? 224 : 168) / 51.2;
        const y0 = bred ? 60 : 62;
        const rowH = bred ? 56 : 80;
        const by = (i: number) => y0 + i * rowH + (bred ? 6 : 24);
        const pw = bred ? 430 : 280;
        const rx = bred ? 450 : 10;
        const ry = bred ? 10 : y0 + 4 * rowH + 96;
        const rows = [
          { t: "1990", s: "", f: C.cold },
          { t: "2025", s: "foreløpig", f: C.warm },
          { t: "2030", s: "mål", f: C.teal },
          { t: "2035", s: "mål", f: C.teal },
          { t: "2050", s: "mål", f: C.teal },
        ];
        return (
          <>
            <Box x={10} y={10} w={pw} h={bred ? 392 : y0 + 4 * rowH + 72} stroke={G.line} fill={G.panel} sw={1.4} />
            <T x={22} y={34} lines="Utslipp, millioner tonn CO₂e" size={16} weight={700} fill={C.fg} />
            {rows.map((r, i) => {
              const y = y0 + i * rowH;
              return (
                <g key={r.t}>
                  {bred ? (
                    <>
                      <T x={22} y={y + 20} lines={r.t} size={16} weight={700} fill={C.fg} />
                      {r.s && <T x={22} y={y + 38} lines={r.s} size={14} fill={C.muted} />}
                    </>
                  ) : (
                    <T x={22} y={y + 16} lines={r.s ? `${r.t} (${r.s})` : r.t} size={14} weight={700} fill={C.fg} />
                  )}
                </g>
              );
            })}
            <rect x={bx + (bred ? 0 : 8)} y={by(0)} width={51.2 * sc} height={26} rx={4} fill={C.cold} />
            <T x={bx + (bred ? 0 : 8) + 51.2 * sc + 8} y={by(0) + 20} lines="51,2" size={16} weight={700} fill={C.cold} />
            <rect x={bx + (bred ? 0 : 8)} y={by(1)} width={44.1 * sc} height={26} rx={4} fill={C.warm} />
            <T x={bx + (bred ? 0 : 8) + 44.1 * sc + 8} y={by(1) + 20} lines={bred ? "44,1 (−13,9 %)" : "44,1"} size={16} weight={700} fill={C.warm} />
            {!bred && <T x={bx + 8} y={by(1) + 46} lines="−13,9 % fra 1990" size={14} fill={C.warm} />}
            <rect x={bx + (bred ? 0 : 8)} y={by(2)} width={23 * sc} height={26} rx={4} fill={C.teal} fillOpacity={0.25} stroke={C.teal} strokeWidth={2} strokeDasharray="6 4" />
            <T x={bx + (bred ? 0 : 8) + 23 * sc + 8} y={by(2) + 20} lines={bred ? "≈ 23, minst −55 %" : "≈ 23"} size={16} weight={700} fill={C.teal} />
            {!bred && <T x={bx + 8} y={by(2) + 46} lines="minst −55 % fra 1990" size={14} fill={C.teal} />}
            <rect x={bx + (bred ? 0 : 8) + 51.2 * 0.25 * sc} y={by(3)} width={51.2 * 0.05 * sc} height={26} rx={3} fill={C.teal} fillOpacity={0.5} stroke={C.teal} strokeWidth={2} />
            <T x={bx + (bred ? 0 : 8) + 51.2 * 0.3 * sc + 10} y={by(3) + 20} lines="25–30 % av 1990-nivå" size={16} weight={700} fill={C.teal} />
            <T x={bx + (bred ? 0 : 8) + 51.2 * 0.3 * sc + 10} y={by(3) + (bred ? 40 : 46)} lines="−70–75 %, 12,8–15,4 Mt" size={14} fill={C.teal} />
            <rect x={bx + (bred ? 0 : 8) + 51.2 * 0.05 * sc} y={by(4)} width={51.2 * 0.05 * sc} height={26} rx={3} fill={C.teal} fillOpacity={0.5} stroke={C.teal} strokeWidth={2} />
            <T x={bx + (bred ? 0 : 8) + 51.2 * 0.1 * sc + 10} y={by(4) + 20} lines="5–10 % av 1990-nivå" size={16} weight={700} fill={C.teal} />
            <T x={bx + (bred ? 0 : 8) + 51.2 * 0.1 * sc + 10} y={by(4) + (bred ? 40 : 46)} lines="−90–95 %, 2,6–5,1 Mt" size={14} fill={C.teal} />
            <line x1={bx + (bred ? 0 : 8)} x2={bx + (bred ? 0 : 8)} y1={y0 - 4} y2={bred ? y0 + 5 * rowH - 6 : by(4) + 30} stroke={C.muted} strokeWidth={1.4} />
            {bred && (
              <>
                <T x={22} y={y0 + 5 * rowH + 28} lines="Foreløpige tall for 2025." size={14} weight={700} fill={C.fg} />
                <T x={22} y={y0 + 5 * rowH + 48} lines="Endelige tall kommer i november 2026." size={14} fill={C.muted} />
              </>
            )}
            {/* kilder */}
            <Box x={rx} y={ry} w={bred ? 260 : 280} h={bred ? 392 : 372} stroke={G.line} fill={G.panel} sw={1.4} />
            <T x={rx + 12} y={ry + 24} lines="Største kilder i 2025" size={16} weight={700} fill={C.fg} />
            <T x={rx + 12} y={ry + 42} lines="millioner tonn CO₂e" size={14} fill={C.muted} />
            {KILDER_NO.map((k, i) => {
              const y = ry + 60 + i * (bred ? 72 : 66);
              const bl = (k.v / 10.9) * (bred ? 150 : 170);
              return (
                <g key={k.n}>
                  <T x={rx + 12} y={y + 16} lines={bred ? k.k ?? k.n : k.n.length > 26 ? (k.k as string[]) : k.n} size={14} weight={700} fill={C.fg} lh={16} />
                  <rect x={rx + 12} y={y + (k.k ? 38 : 24)} width={bl} height={22} rx={4} fill={k.f} />
                  <T x={rx + 12 + bl + 8} y={y + (k.k ? 55 : 41)} lines={nb(k.v, 1)} size={16} weight={700} fill={k.f} />
                </g>
              );
            })}
            <T x={rx + 12} y={ry + (bred ? 60 + 4 * 72 + 8 : 60 + 4 * 66 + 6)} lines={["Gjelder norsk territorium,", "uten utenriks sjø- og luftfart."]} size={14} fill={C.muted} lh={17} />
          </>
        );
      }}
    </G2Figur>
  );
}
