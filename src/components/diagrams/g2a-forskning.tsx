import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T, nb } from "./g2a-kit";
import { KEELING, KEELING_START } from "./g2a-keeling-data";

function wrap(s: string, n: number): string[] {
  const out: string[] = [];
  let c = "";
  for (const w of s.split(" ")) {
    if (c && (c + " " + w).length > n) {
      out.push(c);
      c = w;
    } else c = c ? c + " " + w : w;
  }
  if (c) out.push(c);
  return out;
}

/* ---------- IpccOrganisasjonFigur ---------- */

const GRUPPER = [
  { k: "Arbeidsgruppe I", t: "Det fysiske grunnlaget for klimaendringene", f: C.teal },
  { k: "Arbeidsgruppe II", t: "Konsekvenser, tilpasning og sårbarhet", f: C.warm },
  { k: "Arbeidsgruppe III", t: "Tiltak for å redusere utslipp", f: G.green },
  { k: "Arbeidsstyrke", t: "Nasjonale klimagassregnskap", f: G.violet },
];

const TRINN = [
  "Medlemslandene og organisasjoner nominerer eksperter, og forfatterne velges ut.",
  "Forfatterne lager et første utkast. De bruker mest fagfellevurdert litteratur.",
  "Eksperter fra hele verden kan lese utkastet og kommentere. Hver kommentar må behandles av forfatterne.",
  "Et andre utkast sendes til både eksperter og regjeringer. Alle kommentarer og svar blir offentliggjort når rapporten er ferdig.",
  "Sammendraget for beslutningstakere (SPM) godkjennes linje for linje i et plenumsmøte med delegater fra regjeringene, i dialog med forfatterne. Selve rapporten blir akseptert av arbeidsgruppen uten linje-for-linje-behandling.",
];

export function IpccOrganisasjonFigur() {
  return (
    <G2Figur
      title="IPCC: arbeidsgrupper og de fem trinnene fra utkast til godkjenning"
      desc="Organisasjonskart for IPCC, som ble opprettet i 1988 av Verdens meteorologiorganisasjon og FNs miljøprogram. IPCC gjør ikke egen forskning, og forfatterne er forskere som jobber frivillig. Arbeidet er delt i tre arbeidsgrupper: I det fysiske grunnlaget, II konsekvenser, tilpasning og sårbarhet, III tiltak for å redusere utslipp. I tillegg finnes en arbeidsstyrke for nasjonale klimagassregnskap. Hver vurderingsrapport får også en syntese og en sammendragsrapport. Under vises fem trinn: nominering av forfattere, første utkast, kommentarer fra eksperter, andre utkast til eksperter og regjeringer, og godkjenning. Sammendraget for beslutningstakere godkjennes linje for linje av regjeringene, mens selve rapporten aksepteres av arbeidsgruppen."
      heading="IPCC: hvem og hvordan"
      caption="IPCC vurderer forskning som andre har gjort. Forfatterne er forskere, og regjeringene er med på å godkjenne sammendraget linje for linje. Kilder: IPCC (u.å.-a) og IPCC (u.å.-b)."
      narrow={{ w: 300, h: 1540 }}
      wide={{ w: 720, h: 880 }}
      animated
      name="ipcc-figuren"
    >
      {({ bred, mk }) => {
        const W = bred ? 720 : 300;
        const m = 10;
        /* toppboks */
        const topH = bred ? 112 : 168;
        const cx = W / 2;
        /* grupper */
        const gY = topH + 60;
        const gW = bred ? 163 : 280;
        const gH = bred ? 116 : 78;
        const gX = (i: number) => (bred ? m + i * (gW + 12) : m);
        const gYi = (i: number) => (bred ? gY : gY + i * (gH + 10));
        const gEnd = bred ? gY + gH : gYi(3) + gH;
        const sY = gEnd + 14;
        const sH = bred ? 46 : 66;
        /* trinn */
        const tY0 = sY + sH + 44;
        const tw = bred ? 76 : 36;
        const rader = TRINN.map((t, i) => {
          const l = wrap(t, bred ? 80 : 29);
          return { l, h: Math.max(48, l.length * 18 + 22), i };
        });
        let yy = tY0;
        const pos = rader.map((r) => {
          const p = yy;
          yy += r.h + 14;
          return p;
        });
        const slutt = yy;
        const spmY = slutt + 2;
        return (
          <>
            {/* IPCC */}
            <Box x={bred ? 150 : m} y={m} w={bred ? 420 : 280} h={topH - 14} stroke={C.teal} fill={G.panel} sw={2} />
            <T x={cx} y={m + 36} lines="IPCC" size={26} weight={700} fill={C.teal} anchor="middle" />
            <T
              x={cx}
              y={m + 62}
              lines={bred ? ["Opprettet i 1988 av WMO og UNEP", "Gjør ikke egen forskning. Forfatterne er forskere som jobber frivillig."] : ["Opprettet i 1988", "av WMO og UNEP", "Gjør ikke egen forskning.", "Forfatterne er forskere", "som jobber frivillig."]}
              size={14}
              fill={C.fg}
              anchor="middle"
              lh={19}
            />
            {/* piler ned til gruppene */}
            {bred ? (
              GRUPPER.map((g, i) => (
                <Flow key={g.k} d={`M${cx} ${topH - 4} L${cx} ${topH + 14} L${gX(i) + gW / 2} ${topH + 14} L${gX(i) + gW / 2} ${gY - 3}`} color={g.f} marker={(mk as Record<string, string>)[g.f === C.teal ? "teal" : g.f === C.warm ? "warm" : g.f === G.green ? "green" : "violet"]} w={2} />
              ))
            ) : (
              <Flow d={`M${cx} ${topH - 4} L${cx} ${gY - 3}`} color={C.teal} marker={mk.teal} w={2.2} />
            )}
            {GRUPPER.map((g, i) => (
              <g key={g.k}>
                <Box x={gX(i)} y={gYi(i)} w={gW} h={gH} stroke={g.f} fill={G.panel2} sw={1.8} dash={i === 3 ? "6 4" : undefined} />
                <T x={gX(i) + 12} y={gYi(i) + 26} lines={g.k} size={15} weight={700} fill={g.f} />
                <T x={gX(i) + 12} y={gYi(i) + 48} lines={wrap(g.t, bred ? 20 : 34)} size={14} fill={C.fg} lh={18} />
              </g>
            ))}
            {/* syntese */}
            <Box x={m} y={sY} w={W - 2 * m} h={sH} stroke={C.sand} fill={G.panel} sw={1.6} />
            <T
              x={m + 14}
              y={sY + (bred ? 29 : 26)}
              lines={bred ? "Hver vurderingsrapport får også en syntese og en sammendragsrapport." : ["Hver vurderingsrapport får også", "en syntese og en", "sammendragsrapport."]}
              size={14}
              weight={700}
              fill={C.fg}
              lh={18}
            />
            {/* trinn */}
            <T x={m} y={tY0 - 18} lines="Slik blir en rapport til: fem trinn" size={17} weight={700} fill={C.teal} />
            <line x1={m + 18} x2={m + 18} y1={pos[0] + 24} y2={pos[4] + 24} stroke={G.line} strokeWidth={3} />
            <Flow d={`M${m + 18} ${pos[0] + 24} L${m + 18} ${pos[4] + 20}`} color={C.teal} marker={mk.teal} w={2.4} />
            {rader.map((r) => (
              <g key={r.i}>
                <Box x={m + 38} y={pos[r.i]} w={W - 2 * m - 38} h={r.h} stroke={r.i === 4 ? C.sand : G.line} fill={G.panel2} sw={r.i === 4 ? 1.8 : 1.3} />
                <circle cx={m + 18} cy={pos[r.i] + 24} r={15} fill={C.teal} />
                <T x={m + 18} y={pos[r.i] + 30} lines={String(r.i + 1)} size={16} weight={700} fill={C.bg} anchor="middle" />
                <T x={m + 52} y={pos[r.i] + 24} lines={r.l} size={14} fill={C.fg} lh={18} />
              </g>
            ))}
            {/* utfall trinn 5 */}
            <T x={m} y={spmY + 24} lines="Det som skjer i trinn 5" size={15} weight={700} fill={C.sand} />
            <Box x={m} y={spmY + 36} w={bred ? 343 : 280} h={bred ? 92 : 98} stroke={C.sand} fill={G.panel} sw={1.6} />
            <T x={m + 12} y={spmY + 60} lines="Sammendraget (SPM)" size={14} weight={700} fill={C.sand} />
            <T x={m + 12} y={spmY + 80} lines={bred ? ["Godkjennes linje for linje,", "sammen med regjeringene"] : ["Godkjennes linje for linje,", "sammen med regjeringene"]} size={14} fill={C.fg} lh={18} />
            <Box x={bred ? m + 357 : m} y={bred ? spmY + 36 : spmY + 146} w={bred ? 343 : 280} h={bred ? 92 : 98} stroke={C.teal} fill={G.panel} sw={1.6} />
            <T x={(bred ? m + 357 : m) + 12} y={(bred ? spmY + 60 : spmY + 170)} lines="Selve rapporten" size={14} weight={700} fill={C.teal} />
            <T x={(bred ? m + 357 : m) + 12} y={(bred ? spmY + 80 : spmY + 190)} lines={["Aksepteres av arbeidsgruppen,", "uten linje-for-linje-behandling"]} size={14} fill={C.fg} lh={18} />
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- KeelingKurveFigur ---------- */

const MND = ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."];
void MND;
const tid = (i: number) => KEELING_START.year + (KEELING_START.month - 0.5 + i) / 12;
const iAv = (år: number, mnd: number) => (år - KEELING_START.year) * 12 + (mnd - KEELING_START.month);

export function KeelingKurveFigur() {
  const i0 = iAv(2021, 1);
  const iSep25 = iAv(2025, 9);
  const iSep26 = iAv(2026, 9);
  return (
    <G2Figur
      title="Keeling-kurven: CO₂ i lufta på Mauna Loa siden 1958"
      desc="Linjediagram med månedlige målinger av CO₂ i lufta på Mauna Loa på Hawaii fra mars 1958 til september 2026, i ppm. Kurven stiger jevnt fra 315,71 ppm i 1958 til 426,07 ppm i september 2026. Førindustrielt nivå, rundt 1750, var omtrent 278 ppm. I 2025 var gjennomsnittet 425,6 ppm, 53 prosent over førindustrielt nivå. Et utsnitt fra 2021 til 2026 viser sagtannen: planter på den nordlige halvkule tar opp CO₂ om sommeren og slipper den ut igjen om høsten og vinteren. September 2025 var 424,37 ppm og september 2026 var 426,07 ppm."
      heading="Keeling-kurven"
      caption="Månedlige middelverdier fra Mauna Loa-observatoriet, ikke skisse. Gjennomsnittet for 2025 er fra Friedlingstein mfl. (2026), førindustrielt nivå er ca. 278 ppm rundt 1750. Kilder: NOAA GML (2026), NOAA GML (u.å.) og Scripps (u.å.)."
      narrow={{ w: 300, h: 774 }}
      wide={{ w: 720, h: 718 }}
    >
      {({ bred }) => {
        const W = bred ? 720 : 300;
        const x0 = bred ? 62 : 58;
        const x1 = bred ? 646 : 226;
        const yT = 62;
        const yB = bred ? 290 : 262;
        const vMin = 230;
        const vMax = 450;
        const X = (t: number) => x0 + ((t - 1958) / (2027 - 1958)) * (x1 - x0);
        const Y = (v: number) => yB - ((v - vMin) / (vMax - vMin)) * (yB - yT);
        const hovedD = KEELING.map((v, i) => `${i ? "L" : "M"}${X(tid(i)).toFixed(1)} ${Y(v).toFixed(1)}`).join("");
        /* utsnitt */
        const zT0 = bred ? 350 : 330;
        const zT = bred ? 2021 : 2023;
        const zi = iAv(zT, 1);
        void i0;
        const zx0 = x0;
        const zx1 = x1;
        const zYT = zT0 + 40;
        const zYB = zYT + (bred ? 140 : 130);
        const zMin = 410;
        const zMax = 435;
        const ZX = (t: number) => zx0 + ((t - zT) / (2026.75 - zT)) * (zx1 - zx0);
        const ZY = (v: number) => zYB - ((v - zMin) / (zMax - zMin)) * (zYB - zYT);
        const zD = KEELING.slice(zi).map((v, k) => `${k ? "L" : "M"}${ZX(tid(zi + k)).toFixed(1)} ${ZY(v).toFixed(1)}`).join("");
        const p25 = { x: ZX(tid(iSep25)), y: ZY(KEELING[iSep25]) };
        const p26 = { x: ZX(tid(iSep26)), y: ZY(KEELING[iSep26]) };
        const aar = bred ? [2021, 2022, 2023, 2024, 2025, 2026] : [2023, 2024, 2025, 2026];
        const mTicks = [250, 300, 350, 400, 450];
        const noteY = zYB + 52;
        return (
          <>
            <T x={14} y={28} lines="CO₂ i lufta, Mauna Loa, Hawaii" size={16} weight={700} fill={C.fg} />
            <T x={14} y={48} lines="månedlig middel, ppm" size={14} fill={C.muted} />
            {mTicks.map((v) => (
              <g key={v}>
                <line x1={x0} x2={x1} y1={Y(v)} y2={Y(v)} stroke={G.grid} strokeWidth={1.2} />
                <T x={x0 - 8} y={Y(v) + 5} lines={String(v)} size={14} fill={C.muted} anchor="end" />
              </g>
            ))}
            {[1960, 1980, 2000, 2020].map((t) => (
              <g key={t}>
                <line x1={X(t)} x2={X(t)} y1={yB} y2={yB + 5} stroke={C.muted} strokeWidth={1.2} />
                <T x={X(t)} y={yB + 22} lines={String(t)} size={14} fill={C.muted} anchor="middle" />
              </g>
            ))}
            <line x1={x0} x2={x1} y1={yB} y2={yB} stroke={C.muted} strokeWidth={1.4} />
            {/* førindustrielt */}
            <line x1={x0} x2={x1} y1={Y(278)} y2={Y(278)} stroke={C.sand} strokeWidth={1.8} strokeDasharray="6 5" />
            <T x={x0 + 8} y={Y(278) + 20} lines={bred ? "Førindustrielt: ca. 278 ppm (rundt 1750)" : "Førindustrielt: ca. 278 ppm"} size={14} fill={C.sand} />
            {/* kurve */}
            <path d={hovedD} fill="none" stroke={C.teal} strokeWidth={2.2} strokeLinejoin="round" />
            <circle cx={X(tid(0))} cy={Y(KEELING[0])} r={4.5} fill={C.fg} />
            <T x={X(tid(0)) + 4} y={Y(KEELING[0]) - 50} lines={["Mars 1958:", `${nb(KEELING[0], 2)} ppm`]} size={14} fill={C.fg} />
            <circle cx={X(tid(KEELING.length - 1))} cy={Y(KEELING[KEELING.length - 1])} r={4.5} fill={C.fg} />
            <T x={X(tid(KEELING.length - 1)) - 8} y={Y(KEELING[KEELING.length - 1]) - 40} lines={["Sep. 2026:", `${nb(KEELING[KEELING.length - 1], 2)} ppm`]} size={14} fill={C.fg} anchor="end" />
            {/* 53 % */}
            <line x1={x1 + 14} x2={x1 + 14} y1={Y(278)} y2={Y(425.6)} stroke={C.low} strokeWidth={2.2} />
            <line x1={x1 + 9} x2={x1 + 19} y1={Y(278)} y2={Y(278)} stroke={C.low} strokeWidth={2.2} />
            <line x1={x1 + 9} x2={x1 + 19} y1={Y(425.6)} y2={Y(425.6)} stroke={C.low} strokeWidth={2.2} />
            <T x={x1 + 26} y={(Y(278) + Y(425.6)) / 2 - 4} lines="+53 %" size={15} weight={700} fill={C.low} />
            <T x={x1 + 26} y={(Y(278) + Y(425.6)) / 2 + 14} lines="i 2025" size={14} fill={C.low} />
            {/* utsnitt */}
            <T x={14} y={zT0 - 6} lines={bred ? `Utsnitt ${zT}–2026: sagtannen` : `Utsnitt ${zT}–2026`} size={16} weight={700} fill={C.fg} />
            {[410, 420, 430].map((v) => (
              <g key={v}>
                <line x1={zx0} x2={zx1} y1={ZY(v)} y2={ZY(v)} stroke={G.grid} strokeWidth={1.2} />
                <T x={zx0 - 8} y={ZY(v) + 5} lines={String(v)} size={14} fill={C.muted} anchor="end" />
              </g>
            ))}
            {aar.map((a) => (
              <g key={a}>
                <line x1={ZX(a)} x2={ZX(a)} y1={zYB} y2={zYB + 5} stroke={C.muted} strokeWidth={1.2} />
                <T x={ZX(a)} y={zYB + 22} lines={String(a)} size={14} fill={C.muted} anchor="middle" />
              </g>
            ))}
            <line x1={zx0} x2={zx1} y1={zYB} y2={zYB} stroke={C.muted} strokeWidth={1.4} />
            <path d={zD} fill="none" stroke={C.teal} strokeWidth={2.4} strokeLinejoin="round" />
            <circle cx={p25.x} cy={p25.y} r={5} fill={C.warm} />
            <circle cx={p26.x} cy={p26.y} r={5} fill={C.fg} />

            <T x={bred ? p25.x : p25.x - 6} y={p25.y + (bred ? 24 : 54)} lines={["Sep. 2025:", `${nb(KEELING[iSep25], 2)} ppm`]} size={14} weight={700} fill={C.warm} anchor={bred ? "middle" : "end"} />
            <T x={bred ? p26.x : p26.x + 6} y={p26.y + 24} lines={["Sep. 2026:", `${nb(KEELING[iSep26], 2)} ppm`]} size={14} weight={700} fill={C.fg} anchor={bred ? "middle" : "end"} />
            {/* notat */}
            <Box x={10} y={noteY} w={W - 20} h={bred ? 62 : 112} stroke={C.teal} fill={G.panel2} sw={1.6} />
            <T
              x={24}
              y={noteY + 26}
              lines={
                bred
                  ? ["Sagtann: Planter på den nordlige halvkule tar opp CO₂ om sommeren", "og slipper den ut igjen om høsten og vinteren."]
                  : ["Sagtann: Planter på den", "nordlige halvkule tar opp CO₂", "om sommeren og slipper den ut", "igjen om høsten og vinteren."]
              }
              size={14}
              weight={700}
              fill={C.fg}
              lh={19}
            />
            <Box x={10} y={noteY + (bred ? 76 : 124)} w={W - 20} h={bred ? 44 : 82} stroke={C.low} fill={G.panel2} sw={1.6} />
            <T
              x={24}
              y={noteY + (bred ? 76 : 124) + 26}
              lines={bred ? ["Gjennomsnittet for 2025 var 425,6 ppm, 53 % over førindustrielt nivå."] : ["Gjennomsnittet for 2025 var", "425,6 ppm, 53 % over", "førindustrielt nivå."]}
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
