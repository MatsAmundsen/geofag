import { C } from "./svg-kit";
import { Flow, G, G2Figur, T } from "./g2a-kit";

const NBSP = "\u00a0";
const M = (s: string) => s.replace(/(\d) (\d{3})/g, `$1${NBSP}$2`);

/* ---------- FigHavbunnenProfil ---------- */

const BADGER = [
  { n: 1, x: 163, m: -300, t: ["Kontinentalsokkel: ytterkant", "i gjennomsnitt 130 m"] },
  { n: 2, x: 250, m: 900, t: ["Kontinentalskråning: nedre", "grense omtrent 2 000 m"] },
  { n: 3, x: 296, m: 2300, t: ["Kontinentalfot: ned til", "omtrent 4 000 m"] },
  { n: 4, x: 385, m: 5600, t: ["Dyphavsslette: 4 000–6 000 m,", "nesten 30 % av jordoverflaten"] },
  { n: 5, x: 478, m: 2000, t: ["Midthavsrygg: omtrent 23 % av", "jordoverflaten. Ny basaltisk", "skorpe dannes her."] },
  { n: 6, x: 664, m: 8000, t: ["Dyphavsgrav: opptil omtrent", "11 000 m"] },
];

export function FigHavbunnenProfil() {
  return (
    <G2Figur
      title="Havbunnens landskap"
      desc="Skjematisk tverrsnitt av havbunnen fra kyst til midthavsrygg og dyphavsgrav, med dybdeskala fra 0 til 11 000 meter. Kontinentalsokkelen har ytterkant i gjennomsnitt 130 meter. Kontinentalskråningen går ned til omtrent 2 000 meter. Kontinentalfoten går ned til omtrent 4 000 meter. Dyphavssletten ligger på 4 000 til 6 000 meter og dekker nesten 30 prosent av jordoverflaten. Midthavsryggen dekker omtrent 23 prosent av jordoverflaten og er stedet der ny basaltisk skorpe dannes. Dyphavsgraven går ned til omtrent 11 000 meter. Gjennomsnittsdypet for hele havet er 3 682 meter og Challenger Deep omtrent 10 935 meter."
      heading="Havbunnens landskap"
      caption="Skjematisk tverrsnitt. Dybdeskalaen er loddrett og fast, men avstandene sidelengs og formene er forenklet og ikke i målestokk. Midthavsryggens topp er ikke gitt noe dyp. Kilder: Store norske leksikon (u.å.-b, snl.no/havbunnen); NOAA (u.å.-d, oceanservice.noaa.gov/facts/oceandepth.html)."
      narrow={{ w: 300, h: 830 }}
      wide={{ w: 720, h: 520 }}
      animated
      name="Havbunnens landskap"
    >
      {({ bred, mk }) => {
        const top = bred ? 70 : 60;
        const per = bred ? 0.031 : 0.0262; // enheter per meter
        const Y = (m: number) => top + m * per;
        const xa = bred ? 76 : 50; // venstre kant av profilen
        // Profilpunkter (bred koordinat), dyp i meter
        const pts: [number, number][] = [
          [76, 0], [130, 0], [136, 40], [196, 130], [206, 134], [236, 1980], [248, 2000], [330, 3990], [352, 4000],
          [372, 4900], [400, 5000], [420, 4500], [450, 3000], [478, 2600], [506, 3000], [536, 4500], [556, 5000],
          [600, 5100], [626, 5300], [646, 8000], [664, 10935], [684, 8200], [700, 5600], [716, 5500],
        ];
        const R = (x: number) => (bred ? x : xa + (x - 76) * 0.372);
        const prof = pts.map(([x, m], i) => `${i ? "L" : "M"}${R(x).toFixed(1)} ${Y(m).toFixed(1)}`).join(" ");
        const xr = R(716);
        const bunn = Y(11000) + 24;
        const hav = `M${R(130)} ${Y(0)} ` + pts.slice(1).map(([x, m]) => `L${R(x).toFixed(1)} ${Y(m).toFixed(1)}`).join(" ") + ` L${xr} ${Y(0)} Z`;
        const fast = `${prof} L${xr} ${bunn} L${xa} ${bunn} Z`;
        const ticks: [number, string][] = [[0, "0 m"], [2000, M("2 000 m")], [4000, M("4 000 m")], [6000, M("6 000 m")], [11000, M("11 000 m")]];
        return (
          <>
            <defs>
              <linearGradient id="g2b-hav-vann" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3f86ad" />
                <stop offset="1" stopColor="#10303f" />
              </linearGradient>
              <linearGradient id="g2b-hav-glod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffb25a" stopOpacity="0.95" />
                <stop offset="1" stopColor="#e0663a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* luft og land */}
            <path d={`M${xa} ${Y(0) - 26} L${R(104)} ${Y(0) - 30} L${R(130)} ${Y(0)} L${xa} ${Y(0)} Z`} fill="#4a5a44" />
            {/* havet */}
            <path d={hav} fill="url(#g2b-hav-vann)" />
            <path d={`M${R(130)} ${Y(0)} L${xr} ${Y(0)}`} stroke="#9ed0e6" strokeWidth={2} className="a a-sway" style={{ ["--dx" as string]: "5px" }} />
            {/* bunn */}
            <path d={fast} fill="#2b3640" />
            <path d={prof} fill="none" stroke="#a9b6bf" strokeWidth={2} strokeLinejoin="round" />
            {/* ny skorpe ved ryggen */}
            <path d={`M${R(450)} ${Y(3000)} L${R(478)} ${Y(2600)} L${R(506)} ${Y(3000)} L${R(478)} ${Y(3900)} Z`} fill="url(#g2b-hav-glod)" className="a a-pulse" />
            <Flow d={`M${R(478)} ${Y(4600)} L${R(430)} ${Y(4600)}`} color={C.warm} marker={mk.warm} />
            <Flow d={`M${R(478)} ${Y(4600)} L${R(526)} ${Y(4600)}`} color={C.warm} marker={mk.warm} />
            {/* dybdeskala */}
            <line x1={bred ? 66 : 42} x2={bred ? 66 : 42} y1={Y(0)} y2={Y(11000)} stroke={C.muted} strokeWidth={1.4} />
            {ticks.map(([m, t]) => (
              <g key={m}>
                <line x1={bred ? 60 : 36} x2={bred ? 66 : 42} y1={Y(m)} y2={Y(m)} stroke={C.muted} strokeWidth={1.4} />
                <T x={bred ? 56 : 32} y={Y(m) + 5} lines={bred ? t : t.replace(" m", "")} size={14} fill={C.muted} anchor="end" />
              </g>
            ))}
            {!bred ? <T x={32} y={Y(0) - 32} lines="Dyp (m)" size={14} fill={C.muted} anchor="middle" /> : null}
            {/* stiplede gjennomsnittslinjer */}
            <line x1={xa} x2={xr} y1={Y(3682)} y2={Y(3682)} stroke={C.white} strokeWidth={1.4} strokeDasharray="6 5" />
            <line x1={xa} x2={xr} y1={Y(10935)} y2={Y(10935)} stroke={C.low} strokeWidth={1.4} strokeDasharray="6 5" />
            {bred ? (
              <>
                {/* tekst bred */}
                <T x={R(76)} y={Y(0) - 36} lines="Kyst" size={14} fill={C.muted} />
                <T x={142} y={Y(0) - 10} lines={["Kontinentalsokkel: ytterkant i", "gjennomsnitt 130 m"]} size={14} lh={18} fill={C.fg} />
                <T x={254} y={Y(900)} lines={["Kontinentalskråning:", "nedre grense omtrent 2 000 m"].map(M)} size={14} lh={18} fill={C.fg} />
                <T x={338} y={Y(2350)} lines={["Kontinentalfot:", "ned til omtrent 4 000 m"].map(M)} size={14} lh={18} fill={C.fg} />
                <T x={R(572)} y={Y(1250)} lines={["Gjennomsnittsdyp for", "hele havet: 3 682 m"].map(M)} size={14} lh={18} fill={C.white} anchor="middle" />
                <T x={92} y={Y(6000) + 40} lines={["Dyphavsslette", "4 000–6 000 m,", "nesten 30 % av", "jordoverflaten"].map(M)} size={14} lh={18} fill={C.fg} />
                <T x={296} y={Y(6000) + 40} lines={["Midthavsrygg: omtrent 23 % av", "jordoverflaten. Her dannes ny", "basaltisk skorpe."]} size={14} lh={18} fill={C.fg} />
                <T x={518} y={Y(8000)} lines={["Dyphavsgrav:", "opptil omtrent", "11 000 m"].map(M)} size={14} lh={18} fill={C.fg} anchor="end" />
                <T x={R(664) - 14} y={Y(10935) - 8} lines="Challenger Deep omtrent 10 935 m" size={14} fill={C.low} anchor="end" />
              </>
            ) : null}
            {!bred ? (
              <>
                {BADGER.map((b) => (
                  <g key={b.n}>
                    <circle cx={R(b.x)} cy={Y(b.m)} r={11} fill={C.bg} stroke={C.fg} strokeWidth={1.6} />
                    <T x={R(b.x)} y={Y(b.m) + 5} lines={String(b.n)} size={14} anchor="middle" weight={700} />
                  </g>
                ))}
                {BADGER.map((b, i) => {
                  const ly = Y(11000) + 62 + i * 56;
                  return (
                    <g key={b.n}>
                      <circle cx={19} cy={ly - 5} r={11} fill={C.bg} stroke={C.fg} strokeWidth={1.6} />
                      <T x={19} y={ly} lines={String(b.n)} size={14} anchor="middle" weight={700} />
                      <T x={40} y={ly - 2} lines={b.t.map(M)} size={14} lh={18} fill={C.fg} />
                    </g>
                  );
                })}
                <line x1={8} x2={30} y1={Y(11000) + 62 + 6 * 56 - 6} y2={Y(11000) + 62 + 6 * 56 - 6} stroke={C.white} strokeWidth={1.6} strokeDasharray="6 5" />
                <T x={40} y={Y(11000) + 62 + 6 * 56 - 2} lines={["Gjennomsnittsdyp for", "hele havet: 3 682 m"]} size={14} lh={18} fill={C.fg} />
                <line x1={8} x2={30} y1={Y(11000) + 62 + 7 * 56 - 6} y2={Y(11000) + 62 + 7 * 56 - 6} stroke={C.low} strokeWidth={1.6} strokeDasharray="6 5" />
                <T x={40} y={Y(11000) + 62 + 7 * 56 - 2} lines={["Challenger Deep:", "omtrent 10 935 m"]} size={14} lh={18} fill={C.fg} />
              </>
            ) : null}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- FigVannmasserAtlanterhavet ---------- */

const VM = [
  { n: 1, f: G.green, navn: "Antarktisk mellomvann (AAIW)", t: "Saltholdighetsminimum, omtrent 500–1 000 m, sør for 20° N. Opphav ved overflaten nær sørspissen av Sør-Amerika." },
  { n: 2, f: G.amber, navn: "Middelhavsvann", t: "Saltholdighetsmaksimum, omtrent 1 000 m, mellom 30° og 40° N. Ved Gibraltar 13 °C og 38,45 psu." },
  { n: 3, f: G.violet, navn: "Labradorhavsvann", t: "Omvelting ned til 1 500–2 000 m om vinteren. Saltholdighetsminimum og mye oksygen i den subpolare havvirvelen." },
  { n: 4, f: C.cold, navn: "Nord-Atlantisk dypvann (NADW)", t: "Saltholdighetsmaksimum, 1 500–3 000 m, sør for 20° N. Nordisk overløpsvann kommer over tersklene i Danmarkstredet, mellom Island og Færøyene og i Færøy–Shetland-renna." },
  { n: 5, f: "#d7e3ec", navn: "Antarktisk bunnvann (AABW)", t: "Kaldt lag med lavere saltholdighet nær bunnen. Spores til omtrent 23° N." },
];

function brytt(tekst: string, maks: number): string[] {
  const ord = tekst.split(" ");
  const ut: string[] = [];
  let l = "";
  for (const o of ord) {
    if ((l + " " + o).trim().length > maks) {
      ut.push(l);
      l = o;
    } else l = (l + " " + o).trim();
  }
  if (l) ut.push(l);
  return ut;
}

export function FigVannmasserAtlanterhavet() {
  return (
    <G2Figur
      title="Vannmasser i Atlanterhavet"
      desc="Skjematisk nord–sør-snitt av Atlanterhavet med dyp nedover. Antarktisk mellomvann ligger på omtrent 500 til 1 000 meters dyp sør for 20 grader nord og kommer fra overflaten nær sørspissen av Sør-Amerika. Middelhavsvann ligger på omtrent 1 000 meter mellom 30 og 40 grader nord. Labradorhavsvann går ned til 1 500 til 2 000 meter om vinteren. Nord-Atlantisk dypvann ligger på 1 500 til 3 000 meter sør for 20 grader nord og får nordisk overløpsvann over tersklene i Danmarkstredet, mellom Island og Færøyene og i Færøy–Shetland-renna. Antarktisk bunnvann ligger nær bunnen og spores til omtrent 23 grader nord."
      heading="Vannmasser i Atlanterhavet"
      caption="Skjematisk nord–sør-snitt. Bare dypene og breddegradene i teksten er tegnet, formene og lagenes tykkelse er forenklet. Kilder: Talley (2019, talleylab.ucsd.edu/ltalley/sio210/Atlantic_deep/); Sælen og Barthel (2026, snl.no/hav)."
      narrow={{ w: 300, h: 850 }}
      wide={{ w: 720, h: 600 }}
      animated
      name="Vannmasser i Atlanterhavet"
    >
      {({ bred, mk }) => {
        const xa = bred ? 70 : 44;
        const xb = bred ? 704 : 290;
        const top = bred ? 60 : 64;
        const per = bred ? 0.082 : 0.07;
        const Y = (m: number) => top + m * per;
        const bunn = Y(3900);
        // breddegrad → x. Sør (venstre) til nord (høyre). 20° N, 30° N, 40° N er de eneste merkede.
        const LX = (lat: number) => xa + ((lat + 55) / 130) * (xb - xa);
        const xs = (f: number) => xa + f * (xb - xa);
        const lag = (u: [number, number][], l: [number, number][]) =>
          `M${u.map(([x, m]) => `${x.toFixed(1)} ${Y(m).toFixed(1)}`).join(" L")} L${l
            .slice()
            .reverse()
            .map(([x, m]) => `${x.toFixed(1)} ${Y(m).toFixed(1)}`)
            .join(" L")} Z`;
        const aaiw = lag(
          [[xs(0), 0], [xs(0.12), 250], [xs(0.3), 500], [LX(20), 500], [LX(24), 560]],
          [[xs(0), 120], [xs(0.12), 520], [xs(0.3), 1000], [LX(20), 1000], [LX(24), 800]],
        );
        const nadw = lag(
          [[xs(1), 1500], [xs(0.85), 1500], [LX(20), 1500], [xs(0.2), 1500], [xs(0.06), 1800]],
          [[xs(1), 3000], [xs(0.85), 3000], [LX(20), 3000], [xs(0.2), 3000], [xs(0.06), 2800]],
        );
        const aabw = `M${xs(0)} ${Y(3350)} C${xs(0.3)} ${Y(3350)} ${xs(0.4)} ${Y(3400)} ${LX(23)} ${Y(3750)} L${xs(0)} ${Y(3900)} Z`;
        const gib = LX(36);
        const mv: [number, number] = [LX(35), 1000];
        const lsw: [number, number] = [bred ? xs(0.83) : xs(0.84), 1750];
        const dybder: [number, string][] = [[0, "0"], [500, "500"], [1000, M("1 000")], [1500, M("1 500")], [2000, M("2 000")], [3000, M("3 000")]];
        const badge = (n: number, x: number, y: number) => (
          <g>
            <circle cx={x} cy={y} r={11} fill={C.bg} stroke={C.fg} strokeWidth={1.6} />
            <T x={x} y={y + 5} lines={String(n)} size={14} anchor="middle" weight={700} />
          </g>
        );
        return (
          <>
            <rect x={xa} y={Y(0)} width={xb - xa} height={bunn - Y(0)} fill="#143447" />
            <path d={`M${xa} ${Y(0)} L${xb} ${Y(0)}`} stroke="#9ed0e6" strokeWidth={2} className="a a-sway" style={{ ["--dx" as string]: "4px" }} />
            {/* lag */}
            <path d={nadw} fill={C.cold} opacity={0.8} />
            <path d={aaiw} fill={G.green} opacity={0.85} />
            <path d={aabw} fill="#d7e3ec" opacity={0.85} />
            <ellipse cx={mv[0]} cy={Y(mv[1])} rx={bred ? 40 : 24} ry={bred ? 24 : 17} fill={G.amber} opacity={0.9} className="a a-pulse" />
            <ellipse cx={lsw[0]} cy={Y(lsw[1])} rx={bred ? 40 : 24} ry={bred ? 20 : 17} fill={G.violet} opacity={0.9} className="a a-pulse2" />
            {/* bunn */}
            <path d={`M${xa} ${bunn} L${xb} ${bunn} L${xb} ${bunn + 16} L${xa} ${bunn + 16} Z`} fill="#2b3640" />
            {/* strømpiler */}
            <Flow d={`M${LX(19)} ${Y(750)} L${xs(0.2)} ${Y(750)}`} color={C.fg} marker={mk.fg} w={2} />
            <Flow d={`M${xs(0.92)} ${Y(2200)} L${xs(0.3)} ${Y(2200)}`} color={C.fg} marker={mk.fg} w={2} />
            <Flow d={`M${xs(0.1)} ${Y(3600)} L${LX(23) - 4} ${Y(3640)}`} color={C.bg} marker={mk.fg} w={2} />
            {/* overløp fra nord */}
            {[0, 1, 2].map((k) => (
              <Flow key={k} d={`M${xb - 10 - k * (bred ? 14 : 8)} ${Y(0) + 14} C${xb - 10 - k * (bred ? 14 : 8)} ${Y(900)} ${xb - 30 - k * 10} ${Y(1200)} ${xb - 40 - k * 12} ${Y(1700)}`} color={C.fg} marker={mk.fg} w={1.8} />
            ))}
            {/* Gibraltar-strøm */}
            <Flow d={`M${gib} ${Y(0) - 28} L${gib} ${Y(0) - 4}`} color={G.amber} marker={mk.amber} w={2} />
            <T x={gib} y={Y(0) - 34} lines="Gibraltar" size={14} fill={G.amber} anchor="middle" />
            {/* merker */}
            {badge(1, LX(5), Y(400))}
            {badge(2, mv[0], Y(mv[1]))}
            {badge(3, lsw[0], Y(lsw[1]))}
            {badge(4, xs(0.55), Y(2600))}
            {badge(5, xs(0.17), Y(3650))}
            {/* 20° N */}
            <line x1={LX(20)} x2={LX(20)} y1={Y(0)} y2={bunn} stroke={C.white} strokeWidth={1.2} strokeDasharray="5 5" opacity={0.7} />
            {/* aksene */}
            {dybder.map(([m, t]) => (
              <g key={m}>
                <line x1={xa - 5} x2={xa} y1={Y(m)} y2={Y(m)} stroke={C.muted} strokeWidth={1.4} />
                <T x={xa - 8} y={Y(m) + 5} lines={t} size={14} fill={C.muted} anchor="end" />
              </g>
            ))}
            <T x={bred ? 8 : 6} y={Y(0) - (bred ? 22 : 40)} lines={bred ? "Dyp (m)" : "Dyp (m)"} size={14} fill={C.muted} />
            {[20, 30, 40].map((l) => (
              <g key={l}>
                <line x1={LX(l)} x2={LX(l)} y1={bunn + 16} y2={bunn + 22} stroke={C.muted} strokeWidth={1.4} />
                <T x={LX(l)} y={bunn + 40} lines={`${l}° N`} size={14} fill={C.muted} anchor="middle" />
              </g>
            ))}
            <T x={xa} y={bunn + 40} lines="Sør" size={14} fill={C.muted} />
            <T x={xb} y={bunn + 40} lines="Nord" size={14} fill={C.muted} anchor="end" />
            {/* tekstforklaring */}
            {VM.map((v, i) => {
              const maks = bred ? 78 : 31;
              const lin = brytt(`${v.navn}: ${v.t}`, maks).map(M);
              const ly0 = bunn + (bred ? 78 : 78);
              const hojde = bred ? 0 : 0;
              // y avhenger av tidligere linjer
              const forr = VM.slice(0, i).reduce((a, q) => a + brytt(`${q.navn}: ${q.t}`, maks).length * 18 + 12, 0);
              const yy = ly0 + hojde + forr;
              return (
                <g key={v.n}>
                  <circle cx={bred ? 19 : 19} cy={yy - 5} r={11} fill={C.bg} stroke={C.fg} strokeWidth={1.6} />
                  <T x={19} y={yy} lines={String(v.n)} size={14} anchor="middle" weight={700} />
                  <rect x={bred ? 38 : 38} y={yy - 14} width={4} height={lin.length * 18 - 2} fill={v.f} />
                  <T x={50} y={yy} lines={lin} size={14} lh={18} fill={C.fg} />
                </g>
              );
            })}
          </>
        );
      }}
    </G2Figur>
  );
}
