import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T } from "./g2a-kit";
import { BUD, NABO } from "./g2a-budkart";

/** Enkel vindturbin. Den usynlige sirkelen gjør at rotasjonen går rundt navet. */
export function Turbin({
  x,
  y,
  len,
  color,
  cls,
  rot = 0,
}: {
  x: number;
  y: number;
  len: number;
  color: string;
  cls?: string;
  rot?: number;
}) {
  return (
    <g>
      <path d={`M${x} ${y} L${x} ${y + len * 2.6}`} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <g className={cls}>
        <circle cx={x} cy={y} r={len} fill="none" stroke="none" />
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            d={`M${x} ${y} L${x} ${y - len}`}
            transform={`rotate(${a + rot} ${x} ${y})`}
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx={x} cy={y} r={3} fill={color} />
    </g>
  );
}

/* ---------- VindEffektkurve ---------- */

function kurve(v: number) {
  if (v < 3) return 0;
  if (v < 13) return (v ** 3 - 27) / (13 ** 3 - 27);
  if (v <= 25) return 1;
  return 0;
}

const SONER = [
  { n: "1", t: ["Under 3 m/s:", "ingen strøm"], f: C.low },
  { n: "2", t: ["3 til om lag 13 m/s:", "effekten stiger bratt"], f: C.warm },
  { n: "3", t: ["Cirka 13 til 25 m/s:", "jevn, størst effekt"], f: C.teal },
  { n: "4", t: ["Over 25 m/s:", "turbinen stoppes"], f: C.cold },
];

export function VindEffektkurve() {
  return (
    <G2Figur
      title="Effektkurve for en vindturbin"
      desc="Diagram av effekt mot vindfart. Under 3 meter per sekund leverer turbinen ingen strøm. Fra 3 til om lag 13 meter per sekund stiger effekten bratt fordi effekten i vinden vokser med vindfarten i tredje potens. Fra cirka 13 til 25 meter per sekund er effekten jevn og på sitt høyeste, merkeeffekten. Over 25 meter per sekund bremses og stoppes turbinen av sikkerhetsgrunner. Effektaksen viser bare andel av merkeeffekt, uten tall."
      heading="Effektkurven: hvor mye strøm gir vinden?"
      caption="Skjematisk kurve. Effektaksen viser andel av merkeeffekt, ikke MW. Tre vindfarter er markert: 3, om lag 13 og 25 meter per sekund. Kilde: Store norske leksikon (u.å.-d)."
      narrow={{ w: 300, h: 610 }}
      wide={{ w: 720, h: 420 }}
      animated
      name="vindturbinene"
    >
      {({ bred }) => {
        const px0 = bred ? 74 : 46;
        const px1 = bred ? 700 : 290;
        const top = bred ? 64 : 44;
        const bot = bred ? 258 : 240;
        const sx = (px1 - px0) / 30;
        const X = (v: number) => px0 + v * sx;
        const Y = (p: number) => bot - p * (bot - top);
        let d = `M${X(0)} ${Y(0)} L${X(3)} ${Y(0)}`;
        for (let v = 3; v <= 13.01; v += 0.5) d += ` L${X(v).toFixed(1)} ${Y(kurve(v)).toFixed(1)}`;
        d += ` L${X(25)} ${Y(1)} L${X(25)} ${Y(0)} L${X(30)} ${Y(0)}`;
        const fyll = d + ` L${X(30)} ${Y(0)} L${X(0)} ${Y(0)} Z`;
        const grenser = [0, 3, 13, 25, 30];
        return (
          <>
            {/* soner */}
            {SONER.map((s, i) => (
              <rect key={s.n} x={X(grenser[i])} y={top - 6} width={X(grenser[i + 1]) - X(grenser[i])} height={bot - top + 6} fill={s.f} fillOpacity={0.1} />
            ))}
            {[3, 13, 25].map((v) => (
              <line key={v} x1={X(v)} x2={X(v)} y1={top - 6} y2={bot + 6} stroke={C.muted} strokeWidth={1} strokeDasharray="3 4" />
            ))}
            {/* akser */}
            <line x1={px0} x2={px1} y1={bot} y2={bot} stroke={C.fg} strokeWidth={1.6} />
            <line x1={px0} x2={px0} y1={top - 6} y2={bot} stroke={C.fg} strokeWidth={1.6} />
            <path d={fyll} fill={C.teal} fillOpacity={0.14} />
            <path d={d} fill="none" stroke={C.teal} strokeWidth={3.4} strokeLinejoin="round" />
            {/* akse-tekster */}
            {[3, 13, 25].map((v) => (
              <T key={v} x={X(v)} y={bot + 22} lines={bred ? `${v} m/s` : `${v}`} size={14} weight={700} fill={C.fg} anchor="middle" />
            ))}
            <T x={bred ? px1 : px1} y={bot + 42} lines="vindfart (m/s)" size={14} fill={C.muted} anchor="end" />
            <text transform={`rotate(-90 ${bred ? 24 : 16} ${(top + bot) / 2})`} x={bred ? 24 : 16} y={(top + bot) / 2 + 5} fontSize={14} fill={C.muted} textAnchor="middle" fontFamily="inherit">
              andel av merkeeffekt
            </text>
            <T x={X(13) + 10} y={top - 12 + (bred ? 0 : 0)} lines="merkeeffekt" size={14} weight={700} fill={C.teal} />
            {/* sonenummer */}
            {SONER.map((s, i) => {
              const cx = i === 1 ? X(10.5) : (X(grenser[i]) + X(grenser[i + 1])) / 2;
              if (!bred && (i === 0 || i === 3)) {
                return (
                  <g key={s.n}>
                    <circle cx={cx} cy={bot - 20} r={10} fill={s.f} />
                    <T x={cx} y={bot - 15} lines={s.n} size={14} weight={700} fill={C.bg} anchor="middle" />
                  </g>
                );
              }
              const cy = i === 0 || i === 3 ? bot - 24 : i === 1 ? (bred ? bot - 24 : bot - 24) : top + 28;
              return (
                <g key={s.n}>
                  <circle cx={cx} cy={cy} r={10} fill={s.f} />
                  <T x={cx} y={cy + 5} lines={s.n} size={14} weight={700} fill={C.bg} anchor="middle" />
                </g>
              );
            })}
            {/* turbiner */}
            {bred ? (
              <>
                <Turbin x={X(8)} y={top + 108} len={18} color={C.warm} cls="a a-spin-s" />
                <Turbin x={X(22)} y={top + 56} len={22} color={C.teal} cls="a a-spin" />
                <Turbin x={X(27.5)} y={top + 54} len={16} color={C.cold} rot={60} />
              </>
            ) : (
              <>
                <Turbin x={X(8)} y={top + 118} len={14} color={C.warm} cls="a a-spin-s" />
                <Turbin x={X(21)} y={top + 68} len={18} color={C.teal} cls="a a-spin" />
              </>
            )}
            {/* tredje potens */}
            {bred ? (
              <>
                <Box x={px0 + 8} y={top - 2} w={196} h={78} stroke={C.warm} fill={G.panel2} />
                <T x={px0 + 20} y={top + 20} lines={["Effekten i vinden vokser", "med vindfarten i tredje", "potens. Dobbelt vindfart", "gir åtte ganger effekt."]} size={14} fill={C.fg} lh={17} />
              </>
            ) : null}
            {/* forklaring */}
            {bred ? (
              <g transform={`translate(${px0} ${bot + 66})`}>
                {SONER.map((s, i) => (
                  <g key={s.n} transform={`translate(${i * 158} 0)`}>
                    <circle cx={10} cy={8} r={10} fill={s.f} />
                    <T x={10} y={13} lines={s.n} size={14} weight={700} fill={C.bg} anchor="middle" />
                    <T x={28} y={6} lines={s.t[0]} size={14} weight={700} fill={C.fg} />
                    <T x={28} y={23} lines={s.t[1]} size={14} fill={C.muted} />
                  </g>
                ))}
              </g>
            ) : (
              <g transform={`translate(10 ${bot + 64})`}>
                {SONER.map((s, i) => (
                  <g key={s.n} transform={`translate(0 ${i * 48})`}>
                    <circle cx={10} cy={8} r={10} fill={s.f} />
                    <T x={10} y={13} lines={s.n} size={14} weight={700} fill={C.bg} anchor="middle" />
                    <T x={30} y={6} lines={s.t[0]} size={14} weight={700} fill={C.fg} />
                    <T x={30} y={24} lines={s.t[1]} size={14} fill={C.muted} />
                  </g>
                ))}
              </g>
            )}
            {!bred ? (
              <>
                <Box x={10} y={bot + 64 + 4 * 48 + 4} w={280} h={96} stroke={C.warm} fill={G.panel2} />
                <T x={22} y={bot + 64 + 4 * 48 + 26} lines={["Effekten i vinden vokser med", "vindfarten i tredje potens.", "Dobbelt vindfart gir åtte", "ganger så mye effekt i vinden."]} size={14} fill={C.fg} lh={18} />
              </>
            ) : null}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- AmfidromiskFigur ---------- */

function pol(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)] as const;
}

function Skjema({ cx, cy, rx, ry, mk }: { cx: number; cy: number; rx: number; ry: number; mk: Record<string, string> }) {
  const vinkler = [0, 45, 90, 135, 180, 225, 270, 315];
  const kyst = `M${cx - rx} ${cy} A${rx} ${ry} 0 1 1 ${cx + rx} ${cy} A${rx} ${ry} 0 1 1 ${cx - rx} ${cy} Z`;
  const R = Math.min(rx, ry);
  const buer = [25, 115, 205, 295];
  return (
    <g>
      <path d={kyst} fill={G.waterDeep} stroke={C.sand} strokeWidth={3} />
      {[0.34, 0.62, 0.9].map((f) => (
        <ellipse key={f} cx={cx} cy={cy} rx={rx * f} ry={ry * f} fill="none" stroke={C.rain} strokeOpacity={0.55} strokeWidth={1.4} strokeDasharray="2 6" />
      ))}
      {vinkler.map((v) => {
        const [x1, y1] = pol(cx, cy, 14, v);
        const [x2, y2] = pol(cx, cy, R * 0.97, v);
        const ex = cx + (x2 - cx) * (rx / R);
        const ey = cy + (y2 - cy) * (ry / R);
        return <line key={v} x1={x1} y1={y1} x2={ex} y2={ey} stroke={C.teal} strokeWidth={1.4} strokeOpacity={0.8} />;
      })}
      {buer.map((v) => {
        const r = R * 0.74;
        const [x1, y1] = pol(cx, cy, r, v);
        const [x2, y2] = pol(cx, cy, r, v + 44);
        return <Flow key={v} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)}`} color={C.fg} marker={mk.fg} w={2} cls="a a-flowr" />;
      })}
      <g className="a a-spin" style={{ animationDirection: "reverse" }}>
        <circle cx={cx} cy={cy} r={R + 4} fill="none" stroke="none" />
        <path d={`M${cx} ${cy} L${cx + R * 0.98} ${cy - R * 0.2} A${R} ${R} 0 0 0 ${cx + R * 0.98} ${cy + R * 0.2} Z`} fill={C.warm} fillOpacity={0.28} />
        <line x1={cx} y1={cy} x2={cx + R * 0.98} y2={cy} stroke={C.warm} strokeWidth={4} strokeLinecap="round" />
      </g>
      <circle cx={cx} cy={cy} r={12} fill={G.amber} fillOpacity={0.25} className="a a-pulse" />
      <circle cx={cx} cy={cy} r={6} fill={G.amber} stroke={C.bg} strokeWidth={2} />
    </g>
  );
}

function Innfelt({ x, y, w, h, s, X0, Y0 }: { x: number; y: number; w: number; h: number; s: number; X0: number; Y0: number }) {
  const px = (ux: number) => (ux - X0) * s;
  const py = (uy: number) => (uy - Y0) * s;
  const pt = [17, 316] as const;
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id="g2a-amf-klipp">
          <rect width={w} height={h} rx={8} />
        </clipPath>
      </defs>
      <g clipPath="url(#g2a-amf-klipp)">
        <rect width={w} height={h} fill={G.waterDeep} />
        <g transform={`scale(${s}) translate(${-X0} ${-Y0})`}>
          {Object.entries(NABO).map(([n, d]) => (
            <path key={n} d={d} fill={G.panel2} stroke={C.sand} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
          ))}
          {Object.entries(BUD).map(([n, d]) => (
            <path key={n} d={d} fill={G.panel2} stroke={C.sand} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        <circle cx={px(pt[0])} cy={py(pt[1])} r={13} fill={G.amber} fillOpacity={0.25} className="a a-pulse" />
        <circle cx={px(pt[0])} cy={py(pt[1])} r={6} fill={G.amber} stroke={C.bg} strokeWidth={2} />
        <circle cx={px(40.6)} cy={py(315.6)} r={4} fill={C.fg} />
        <circle cx={px(37.8)} cy={py(303.1)} r={4} fill={C.fg} />
      </g>
      <rect width={w} height={h} rx={8} fill="none" stroke={G.line} strokeWidth={1.4} />
      <T x={px(40.6) + 9} y={py(315.6) + 5} lines="Egersund" size={14} weight={700} fill={C.fg} />
      <T x={px(37.8) + 9} y={py(303.1) + 5} lines="Stavanger" size={14} fill={C.fg} />
      <T x={w - 8} y={h - 10} lines="Skagerrak" size={14} fill={C.fg} anchor="end" />
    </g>
  );
}

export function AmfidromiskFigur() {
  return (
    <G2Figur
      title="Amfidromisk punkt: tidevannsbølgen går rundt et punkt uten vannstandsendring"
      desc="Skjematisk havbasseng sett ovenfra. Midt i bassenget ligger et amfidromisk punkt der det ikke er noen vannstandsendring. Linjer går ut fra punktet og viser hvor høyvannet kommer samtidig. Stiplede ringer viser at tidevannsforskjellen blir større jo lenger fra punktet. En høyvannskile går rundt punktet med kysten på høyre side. Et lite kart viser at ett slikt punkt i Nordsjøen ligger vest for Egersund."
      heading="Amfidromisk punkt: tidevann som går rundt et nullpunkt"
      caption="Skjematisk figur uten tall. Plasseringen vest for Egersund på kartet er omtrentlig. Kilder: Store norske leksikon (u.å.-i) og Kartverket (2023)."
      narrow={{ w: 300, h: 960 }}
      wide={{ w: 720, h: 440 }}
      animated
      name="tidevannsbølgen"
    >
      {({ bred, mk }) => {
        const leg = (x: number, y: number, kind: number, t: string | string[]) => (
          <g key={kind}>
            {kind === 0 ? <line x1={x} x2={x + 26} y1={y} y2={y} stroke={C.warm} strokeWidth={4} strokeLinecap="round" /> : null}
            {kind === 1 ? <line x1={x} x2={x + 26} y1={y} y2={y} stroke={C.teal} strokeWidth={2} /> : null}
            {kind === 2 ? <line x1={x} x2={x + 26} y1={y} y2={y} stroke={C.rain} strokeWidth={2} strokeDasharray="2 5" strokeLinecap="round" /> : null}
            {kind === 3 ? <circle cx={x + 13} cy={y} r={6} fill={G.amber} /> : null}
            <T x={x + 36} y={y + 5} lines={t} size={14} fill={C.fg} lh={17} />
          </g>
        );
        return bred ? (
          <>
            <Skjema cx={196} cy={176} rx={178} ry={134} mk={mk} />
            {leg(10, 340, 3, "Amfidromisk punkt: ingen vannstandsendring")}
            {leg(10, 364, 0, ["Høyvannskile: går rundt punktet", "med kysten på høyre side"])}
            {leg(10, 398, 1, "Linjer der høyvannet kommer samtidig")}
            {leg(10, 420, 2, "Tidevannsforskjellen øker utover fra punktet")}
            <Innfelt x={420} y={20} w={290} h={176} s={2.5} X0={0} Y0={283} />
            <T x={420} y={220} lines={["Ett punkt i Nordsjøen ligger vest for", "Egersund. Derfor er tidevannsforskjellene", "små langs Jærkysten og i hele Skagerrak."]} size={14} fill={C.fg} lh={18} />
            <Box x={420} y={292} w={290} h={104} stroke={C.cold} fill={G.panel2} />
            <T x={432} y={314} lines="Hvorfor går bølgen rundt?" size={14} weight={700} fill={C.cold} />
            <T x={432} y={336} lines={["På den nordlige halvkulen bøyer", "jordrotasjonen (Corioliskraften)", "bevegelsen mot høyre."]} size={14} fill={C.fg} lh={18} />
          </>
        ) : (
          <>
            <Skjema cx={150} cy={160} rx={138} ry={120} mk={mk} />
            {leg(10, 312, 3, ["Amfidromisk punkt:", "ingen vannstandsendring"])}
            {leg(10, 358, 0, ["Høyvannskile: går rundt", "punktet med kysten på høyre side"])}
            {leg(10, 404, 1, ["Linjer der høyvannet", "kommer samtidig"])}
            {leg(10, 450, 2, ["Tidevannsforskjellen blir større", "utover fra punktet"])}
            <Innfelt x={10} y={500} w={280} h={176} s={2.4} X0={0} Y0={283} />
            <T x={10} y={702} lines={["Ett punkt i Nordsjøen ligger vest for", "Egersund. Derfor er tidevannsforskjellene", "små langs Jærkysten og i hele", "Skagerrak."]} size={14} fill={C.fg} lh={18} />
            <Box x={10} y={790} w={280} h={104} stroke={C.cold} fill={G.panel2} />
            <T x={22} y={812} lines="Hvorfor går bølgen rundt?" size={14} weight={700} fill={C.cold} />
            <T x={22} y={834} lines={["På den nordlige halvkulen bøyer", "jordrotasjonen (Corioliskraften)", "bevegelsen mot høyre."]} size={14} fill={C.fg} lh={18} />
          </>
        );
      }}
    </G2Figur>
  );
}
