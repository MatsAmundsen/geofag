import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T } from "./g2a-kit";

/** Enhetstrapp: energi (Wh til TWh) og effekt (W til TW), hvert trinn 1000 ganger større. */
const TRINN = [
  { e: "TWh", p: "TW", sub: "1000 GWh", subp: "1000 GW" },
  { e: "GWh", p: "GW", sub: "1000 MWh", subp: "1000 MW" },
  { e: "MWh", p: "MW", sub: "1000 kWh", subp: "1000 kW" },
  { e: "kWh", p: "kW", sub: "1000 Wh", subp: "1000 W" },
  { e: "Wh", p: "W", sub: "grunnenhet", subp: "grunnenhet" },
];

function Trapp({ x0, y0, w, rowH, gap, indent, mk }: { x0: number; y0: number; w: number; rowH: number; gap: number; indent: number; mk: string }) {
  return (
    <g>
      <T x={x0 + 14} y={y0 - 8} lines="Energi" size={14} fill={C.warm} weight={700} />
      <T x={x0 + w - 14} y={y0 - 8} lines="Effekt" size={14} fill={C.teal} weight={700} anchor="end" />
      {TRINN.map((t, i) => {
        const y = y0 + i * (rowH + gap);
        const ind = (TRINN.length - 1 - i) * indent;
        const bw = w - (TRINN.length - 1) * indent + ind;
        const x = x0 + (w - bw);
        const mid = x + bw / 2;
        return (
          <g key={t.e}>
            <Box x={x} y={y} w={bw} h={rowH} stroke={i === 3 ? C.warm : G.line} fill={G.panel} />
            <T x={x + 14} y={y + 24} lines={t.e} size={20} weight={700} fill={C.warm} />
            <T x={x + 14} y={y + 42} lines={t.sub} size={14} fill={C.muted} />
            <line x1={mid} x2={mid} y1={y + 8} y2={y + rowH - 8} stroke={G.line} strokeWidth={1} />
            <T x={x + bw - 14} y={y + 24} lines={t.p} size={20} weight={700} fill={C.teal} anchor="end" />
            <T x={x + bw - 14} y={y + 42} lines={t.subp} size={14} fill={C.muted} anchor="end" />
            {i < TRINN.length - 1 ? (
              <g>
                <Flow
                  d={`M${x0 + w / 2 + 40} ${y + rowH + gap - 2} L${x0 + w / 2 + 40} ${y + rowH + 3}`}
                  color={C.fg}
                  marker={mk}
                  w={2}
                />
                <T x={x0 + w / 2 + 52} y={y + rowH + gap / 2 + 5} lines="× 1000" size={14} fill={C.fg} weight={600} />
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function Formel({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={86} stroke={C.teal} fill={G.panel2} sw={1.6} />
      <T x={x + w / 2} y={y + 30} lines="effekt × tid = energi" size={18} weight={700} fill={C.fg} anchor="middle" />
      <T x={x + w / 2} y={y + 54} lines="2 kW × 24 timer = 48 kWh" size={14} fill={C.muted} anchor="middle" />
      <T x={x + w / 2} y={y + 73} lines="1 kW × 1 time = 1 kWh" size={14} fill={C.muted} anchor="middle" />
    </g>
  );
}

function Kort({ x, y, w, h, tittel, linjer, farge }: { x: number; y: number; w: number; h: number; tittel: string; linjer: string[]; farge: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} stroke={G.line} fill={G.panel} />
      <rect x={x} y={y + 10} width={3} height={h - 20} fill={farge} />
      <T x={x + 14} y={y + 22} lines={tittel} size={14} weight={700} fill={farge} />
      <T x={x + 14} y={y + 42} lines={linjer} size={14} fill={C.fg} lh={19} />
    </g>
  );
}

export function EnhetstrappFigur() {
  return (
    <G2Figur
      title="Enhetstrapp for energi og effekt"
      desc="To søyler med trinn der hvert trinn er 1000 ganger større: energi i Wh, kWh, MWh, GWh og TWh, og effekt i W, kW, MW, GW og TW. Effekt ganger tid er energi. Til høyre står omregninger: 1 kWh er 3,6 MJ, 1000 Sm³ gass er 1,0 Sm³ o.e., 1 Sm³ olje er om lag 35 500 MJ eller 9860 kWh, og 20 000 kWh er 20 MWh."
      heading="Enhetstrappen: hvert trinn er 1000 ganger større"
      caption="Effekt (W) sier hvor raskt energi brukes eller produseres. Energi er effekt multiplisert med tid. Elektrisk energi oppgis vanligvis i kilowattimer (kWh), og 1 kWh = 3,6 MJ. Sm³ o.e. er en samleenhet for olje og gass, ikke en eksakt energienhet."
      narrow={{ w: 300, h: 780 }}
      wide={{ w: 720, h: 410 }}
      animated
      name="enhetstrappen"
    >
      {({ bred, mk }) =>
        bred ? (
          <>
            <Trapp x0={14} y0={42} w={400} rowH={52} gap={24} indent={22} mk={mk.fg} />
            <Formel x={446} y={24} w={260} />
            <Kort x={446} y={128} w={260} h={80} tittel="Elektrisk energi" linjer={["Oppgis vanligvis i kWh.", "1 kWh = 3,6 MJ"]} farge={C.warm} />
            <Kort x={446} y={220} w={260} h={104} tittel="Olje og gass (Sokkeldirektoratet)" linjer={["1000 Sm³ gass = 1,0 Sm³ o.e.", "1 Sm³ olje ≈ 35 500 MJ", "om lag 9860 kWh"]} farge={C.teal} />
            <Kort x={446} y={336} w={260} h={56} tittel="En husholdning" linjer={["20 000 kWh = 20 MWh i året"]} farge={G.green} />
          </>
        ) : (
          <>
            <Trapp x0={10} y0={38} w={280} rowH={52} gap={26} indent={12} mk={mk.fg} />
            <Formel x={10} y={410} w={280} />
            <Kort x={10} y={512} w={280} h={78} tittel="Elektrisk energi" linjer={["Oppgis vanligvis i kWh.", "1 kWh = 3,6 MJ"]} farge={C.warm} />
            <Kort x={10} y={602} w={280} h={104} tittel="Olje og gass" linjer={["1000 Sm³ gass = 1,0 Sm³ o.e.", "1 Sm³ olje ≈ 35 500 MJ,", "om lag 9860 kWh"]} farge={C.teal} />
            <Kort x={10} y={718} w={280} h={52} tittel="En husholdning" linjer={["20 000 kWh = 20 MWh i året"]} farge={G.green} />
          </>
        )
      }
    </G2Figur>
  );
}
