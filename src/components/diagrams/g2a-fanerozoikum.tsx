import { C } from "./svg-kit";
import { Box, G, G2Figur, T } from "./g2a-kit";
import { PHANDA } from "./g2a-phanda-data";

/* Perioder etter ICS v2026/06 (Cohen mfl., 2026): [navn, øvre grense Ma, nedre grense Ma]. PhanDA starter i Ordovicium. */
const PERIODER: [string, number, number][] = [
  ["Kvartær", 0, 2.58],
  ["Neogen", 2.58, 23.04],
  ["Paleogen", 23.04, 66],
  ["Kritt", 66, 143.1],
  ["Jura", 143.1, 201.4],
  ["Trias", 201.4, 251.902],
  ["Perm", 251.902, 298.9],
  ["Karbon", 298.9, 358.86],
  ["Devon", 358.86, 419.62],
  ["Silur", 419.62, 443.1],
  ["Ordovicium", 443.1, 486.85],
];
const T_MAX = 486.85;
const MED = PHANDA.map((r) => r[3]);
const MED_MIN = Math.min(...MED);
const MED_MAX = Math.max(...MED);

export function FanerozoikumTemperaturFigur() {
  return (
    <G2Figur
      title="Global middeltemperatur de siste 485 millioner årene"
      desc="Diagram over global middeltemperatur fra ordovicium for cirka 487 millioner år siden til i dag, fra rekonstruksjonen PhanDA. Tiden går fra venstre mot høyre i det brede diagrammet og ovenfra og ned i det smale. Medianen varierer mellom omtrent 11 og 36 grader, med et usikkerhetsbånd rundt. Under aksen står geologiske perioder fra ordovicium til kvartær etter den internasjonale stratigrafiske kartet. Jorda har vært mer av tiden i varmere enn i kaldere klima, og CO₂ har vært den viktigste styrende faktoren. De store svingningene tok millioner av år, mens dagens oppvarming har skjedd i løpet av noen få tiår."
      heading="Temperatur gjennom fanerozoikum"
      caption="Median og 5–95 %-intervall per tidsrom i PhanDA-rekonstruksjonen, tegnet som trinn. Perioder og grenser er fra ICS-kartet. Fanerozoikum begynte for ca. 539 millioner år siden, men PhanDA-dataene i figuren starter for ca. 487 millioner år siden. Kilder: Judd mfl. (2024) og Cohen mfl. (2026)."
      narrow={{ w: 300, h: 1176 }}
      wide={{ w: 720, h: 696 }}
    >
      {({ bred }) => {
        const W = bred ? 720 : 300;
        /* plott */
        const x0 = bred ? 62 : 120;
        const x1 = bred ? 704 : 290;
        const yT = bred ? 74 : 92;
        const yB = bred ? 320 : 676;
        /* P: (tid Ma, temp °C) -> [x, y] */
        const P = (t: number, v: number): [number, number] => {
          const f = (v - 5) / 40;
          if (bred) return [x1 - (t / T_MAX) * (x1 - x0), yB - f * (yB - yT)];
          return [x0 + f * (x1 - x0), yT + (t / T_MAX) * (yB - yT)];
        };
        const f1 = (n: number) => n.toFixed(1);
        const med: string[] = [];
        const hi: string[] = [];
        const lo: string[] = [];
        PHANDA.forEach(([u, l, a, m, b], i) => {
          const pu = P(u, m);
          const pl = P(l, m);
          med.push(`${i ? "L" : "M"}${f1(pu[0])} ${f1(pu[1])}L${f1(pl[0])} ${f1(pl[1])}`);
          hi.push(`${f1(P(u, b)[0])} ${f1(P(u, b)[1])}`, `${f1(P(l, b)[0])} ${f1(P(l, b)[1])}`);
          lo.unshift(`${f1(P(l, a)[0])} ${f1(P(l, a)[1])}`, `${f1(P(u, a)[0])} ${f1(P(u, a)[1])}`);
          void u;
        });
        /* lo er bygd baklengs per bin; riktig rekkefølge: omvendt hele hi-serien */
        const loD = PHANDA.slice()
          .reverse()
          .flatMap(([u, l, a]) => [`${f1(P(l, a)[0])} ${f1(P(l, a)[1])}`, `${f1(P(u, a)[0])} ${f1(P(u, a)[1])}`]);
        void lo;
        const bandD = `M${hi.join("L")}L${loD.join("L")}Z`;
        const tTicks = [0, 100, 200, 300, 400];
        const tempTicks = [10, 20, 30, 40];
        const noteY = bred ? 496 : 762;
        return (
          <>
            <T x={14} y={28} lines="Global middeltemperatur, °C" size={16} weight={700} fill={C.fg} />
            <T x={14} y={48} lines={bred ? "PhanDA, tid i millioner år siden (Ma)" : "Tid i millioner år siden (Ma)"} size={14} fill={C.muted} />
            {/* perioder: bakgrunnsfelt */}
            {PERIODER.map(([n, u, l], i) => {
              const a = P(u, 5);
              const b = P(l, 45);
              const x = Math.min(a[0], b[0]);
              const y = Math.min(a[1], b[1]);
              return i % 2 === 0 ? (
                <rect key={n} x={x} y={y} width={Math.abs(a[0] - b[0])} height={Math.abs(a[1] - b[1])} fill={C.fg} fillOpacity={0.045} />
              ) : null;
            })}
            {/* rutenett */}
            {tempTicks.map((v) => {
              const a = P(0, v);
              const b = P(T_MAX, v);
              return (
                <g key={v}>
                  <line x1={a[0]} x2={b[0]} y1={a[1]} y2={b[1]} stroke={G.grid} strokeWidth={1.2} />
                  {bred ? (
                    <T x={x0 - 8} y={a[1] + 5} lines={String(v)} size={14} fill={C.muted} anchor="end" />
                  ) : (
                    <T x={a[0]} y={yT - 8} lines={String(v)} size={14} fill={C.muted} anchor="middle" />
                  )}
                </g>
              );
            })}
            {tTicks.map((t) => {
              const a = P(t, 5);
              const b = P(t, 45);
              return (
                <g key={t}>
                  <line x1={a[0]} x2={b[0]} y1={a[1]} y2={b[1]} stroke={G.grid} strokeWidth={1.2} />
                  {bred ? (
                    <T x={a[0]} y={yB + 20} lines={String(t)} size={14} fill={C.muted} anchor="middle" />
                  ) : (
                    <T x={x0 - 6} y={a[1] + 5} lines={String(t)} size={14} fill={C.muted} anchor="end" />
                  )}
                </g>
              );
            })}
            {/* medianens ytterpunkter */}
            {[MED_MIN, MED_MAX].map((v) => {
              const a = P(0, v);
              const b = P(T_MAX, v);
              return <line key={v} x1={a[0]} x2={b[0]} y1={a[1]} y2={b[1]} stroke={C.sand} strokeWidth={1.6} strokeDasharray="6 5" />;
            })}
            {bred ? (
              <>
                <T x={x1 - 4} y={P(0, MED_MAX)[1] - 8} lines="ca. 36 °C" size={14} weight={700} fill={C.sand} anchor="end" />
                <T x={x1 - 4} y={P(0, MED_MIN)[1] + 20} lines="ca. 11 °C" size={14} weight={700} fill={C.sand} anchor="end" />
              </>
            ) : (
              <>
                <T x={P(0, MED_MIN)[0]} y={yB + 52} lines="ca. 11 °C" size={14} weight={700} fill={C.sand} anchor="middle" />
                <T x={P(0, MED_MAX)[0]} y={yB + 52} lines="ca. 36 °C" size={14} weight={700} fill={C.sand} anchor="middle" />
              </>
            )}
            {/* data */}
            <path d={bandD} fill={C.warm} fillOpacity={0.24} stroke="none" />
            <path d={med.join("")} fill="none" stroke={C.warm} strokeWidth={2.4} strokeLinejoin="round" />
            {/* tidsakse og perioder */}
            {bred ? (
              <>
                <line x1={x0} x2={x1} y1={yB} y2={yB} stroke={C.muted} strokeWidth={1.4} />
                {PERIODER.map(([n, u, l], i) => {
                  const a = P(u, 5)[0];
                  const b = P(l, 5)[0];
                  return (
                    <g key={n}>
                      <rect x={Math.min(a, b)} y={yB + 30} width={Math.abs(a - b)} height={10} fill={i % 2 ? C.cold : C.teal} fillOpacity={0.7} />
                      {n !== "Kvartær" && <text transform={`rotate(-90 ${(a + b) / 2 + 5} ${yB + 50})`} x={(a + b) / 2 + 5} y={yB + 50} fill={C.fg} fontSize={14} fontWeight={500} fontFamily="'Source Sans 3', system-ui, sans-serif" textAnchor="end">{n}</text>}
                    </g>
                  );
                })}
                <line x1={x1 - 1} x2={x1 - 1} y1={yB + 40} y2={yB + 130} stroke={C.muted} strokeWidth={1.2} />
                <T x={x1} y={yB + 150} lines="Kvartær" size={14} fill={C.fg} anchor="end" />
              </>
            ) : (
              <>
                <line x1={x0} x2={x0} y1={yT} y2={yB} stroke={C.muted} strokeWidth={1.4} />
                {PERIODER.map(([n, u, l], i) => {
                  const a = P(u, 5)[1];
                  const b = P(l, 5)[1];
                  return (
                    <g key={n}>
                      <rect x={x0 - 12} y={a} width={6} height={b - a} fill={i % 2 ? C.cold : C.teal} fillOpacity={0.75} />
                      {n !== "Kvartær" && <T x={8} y={(a + b) / 2 + 5} lines={n} size={14} fill={C.fg} />}
                    </g>
                  );
                })}
                <T x={8} y={yB + 20} lines="Kvartær" size={14} fill={C.fg} />
              </>
            )}
            {/* tegnforklaring */}
            {/* notater */}
            <Box x={10} y={noteY} w={bred ? 340 : 280} h={bred ? 110 : 150} stroke={C.warm} fill={G.panel2} sw={1.6} />
            <T x={24} y={noteY + 26} lines="Det kurven viser" size={15} weight={700} fill={C.warm} />
            <T
              x={24}
              y={noteY + 48}
              lines={
                bred
                  ? ["Linja er medianen, og båndet er 5–95 %.", "Temperaturen har variert mellom omtrent", "11 °C og 36 °C. Jorda har vært mer av tiden", "i varmere enn i kaldere klima."]
                  : ["Linja er medianen, og båndet", "er 5–95 %. Temperaturen har", "variert mellom omtrent 11 °C", "og 36 °C. Jorda har vært mer av", "tiden i varmere enn i kaldere", "klima."]
              }
              size={14}
              fill={C.fg}
              lh={18}
            />
            <Box x={bred ? 370 : 10} y={bred ? noteY : noteY + 162} w={bred ? 340 : 280} h={bred ? 110 : 116} stroke={C.teal} fill={G.panel2} sw={1.6} />
            <T x={bred ? 384 : 24} y={(bred ? noteY : noteY + 162) + 26} lines="Styrende faktor" size={15} weight={700} fill={C.teal} />
            <T
              x={bred ? 384 : 24}
              y={(bred ? noteY : noteY + 162) + 48}
              lines={bred ? ["CO₂ i lufta og temperaturen henger", "sterkt sammen. CO₂ har vært den", "viktigste styrende faktoren."] : ["CO₂ i lufta og temperaturen", "henger sterkt sammen. CO₂ har", "vært den viktigste styrende", "faktoren."]}
              size={14}
              fill={C.fg}
              lh={18}
            />
            <Box x={10} y={noteY + (bred ? 122 : 290)} w={W - 20} h={bred ? 58 : 112} stroke={C.low} fill={G.panel2} sw={1.8} />
            <T
              x={24}
              y={noteY + (bred ? 122 : 290) + 26}
              lines={
                bred
                  ? ["De store svingningene tok millioner av år,", "mens dagens oppvarming har skjedd i løpet av noen få tiår."]
                  : ["De store svingningene tok", "millioner av år, mens dagens", "oppvarming har skjedd i løpet", "av noen få tiår."]
              }
              size={14}
              weight={700}
              fill={C.fg}
              lh={19}
            />
          </>
        );
      }}
    </G2Figur>
  );
}
