import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T, nb } from "./g2a-kit";

const NBSP = "\u00a0";
const MINUS = "\u2212";

/* ---------- FigSaffirSimpsonSkala ---------- */

const SS = [
  { k: 1, lo: 119, km: ["119–153 km/t"], mph: ["(74–95 mph)"], stor: false },
  { k: 2, lo: 154, km: ["154–177 km/t"], mph: ["(96–110 mph)"], stor: false },
  { k: 3, lo: 178, km: ["178–208 km/t"], mph: ["(111–129 mph)"], stor: true },
  { k: 4, lo: 209, km: ["209–251 km/t"], mph: ["(130–156 mph)"], stor: true },
  { k: 5, lo: 252, km: ["252 km/t", "eller mer"], mph: ["(157 mph", "eller mer)"], stor: true },
];

function Strek({ x, y, l, k, run }: { x: number; y: number; l: number; k: number; run?: boolean }) {
  const dur = `${(2.6 - k * 0.38).toFixed(2)}s`;
  return (
    <path
      d={`M${x} ${y} L${x + l} ${y}`}
      className="a a-flow"
      style={{ animationDuration: dur }}
      stroke={k >= 3 ? C.low : G.amber}
      strokeWidth={1.4 + k * 0.5}
      strokeLinecap="round"
      fill="none"
      opacity={run ? 1 : 1}
    />
  );
}

export function FigSaffirSimpsonSkala() {
  return (
    <G2Figur
      title="Saffir–Simpson-skalaen"
      desc="Fem trappetrinn for orkanens høyeste middelvind. Kategori 1: 119 til 153 kilometer i timen (74 til 95 mph). Kategori 2: 154 til 177 (96 til 110 mph). Kategori 3: 178 til 208 (111 til 129 mph). Kategori 4: 209 til 251 (130 til 156 mph). Kategori 5: 252 kilometer i timen eller mer (157 mph eller mer). Kategori 3, 4 og 5 er store orkaner. Skalaen bygger bare på vind."
      heading="Saffir–Simpson-skalaen"
      caption="Høyeste middelvind per kategori. Skalaen bygger bare på vind og tar ikke med stormflo, regnflom eller tornadoer. Kilde: National Hurricane Center (u.å.-b, nhc.noaa.gov/aboutsshws.php)."
      narrow={{ w: 300, h: 640 }}
      wide={{ w: 720, h: 410 }}
      animated
      name="Saffir–Simpson-skalaen"
    >
      {({ bred }) => {
        if (bred) {
          const bw = 128;
          const gap = 8;
          const x0 = 20;
          const bunn = 340;
          const sk = 0.75;
          return (
            <>
              <T x={x0} y={26} lines="Høyeste middelvind (km/t)" size={14} fill={C.muted} />
              {SS.map((s, i) => {
                const x = x0 + i * (bw + gap) + (i > 0 ? 0 : 0);
                const h = s.lo * sk;
                const top = bunn - h;
                const f = s.stor ? C.low : G.amber;
                return (
                  <g key={s.k}>
                    <rect x={x} y={top} width={bw} height={h} rx={6} fill={f} opacity={0.2} stroke={f} strokeWidth={2} />
                    <rect x={x} y={top} width={bw} height={6} rx={3} fill={f} />
                    <T x={x + 10} y={top + 32} lines={`Kategori ${s.k}`} size={16} weight={800} fill={C.white} />
                    <T x={x + 10} y={top + 54} lines={s.km} size={14} lh={18} fill={C.fg} weight={600} />
                    <T x={x + 10} y={top + 54 + s.km.length * 18 + 2} lines={s.mph} size={14} lh={18} fill="#aab7c1" />
                    {[0, 1, 2, 3, 4].slice(0, s.k).map((j) => (
                      <Strek key={j} x={x + 8 + (j % 2) * 10} y={top - 14 - j * 9} l={bw - 30 - (j % 2) * 10} k={s.k} />
                    ))}
                  </g>
                );
              })}
              <line x1={x0} x2={x0 + 5 * bw + 4 * gap} y1={bunn} y2={bunn} stroke={G.line} strokeWidth={1.4} />
              {/* parentes for store orkaner */}
              <path d={`M${x0 + 2 * (bw + gap)} 84 L${x0 + 2 * (bw + gap)} 76 L${x0 + 5 * bw + 4 * gap} 76 L${x0 + 5 * bw + 4 * gap} 84`} fill="none" stroke={C.low} strokeWidth={2} />
              <T x={x0 + 2 * (bw + gap) + (3 * bw + 2 * gap) / 2} y={62} lines="Store orkaner (kategori 3–5)" size={16} weight={800} fill={C.low} anchor="middle" />
              <T x={x0} y={372} lines="Skalaen bygger bare på vind. Den tar ikke med stormflo, regnflom eller tornadoer." size={14} fill={C.muted} />
              <T x={x0} y={394} lines="Strekene over søylene er vind. Jo høyere kategori, jo flere og raskere streker." size={14} fill={C.muted} />
            </>
          );
        }
        const maksb = 150;
        return (
          <>
            <rect x={8} y={12} width={14} height={14} rx={3} fill={G.amber} />
            <T x={30} y={25} lines="Kategori 1–2" size={14} fill={C.fg} />
            <rect x={142} y={12} width={14} height={14} rx={3} fill={C.low} />
            <T x={164} y={25} lines="Store orkaner (3–5)" size={14} fill={C.fg} />
            {SS.map((s, i) => {
              const y = 48 + i * 92;
              const f = s.stor ? C.low : G.amber;
              const wb = 40 + (s.lo / 252) * maksb;
              const tekstKm = s.km.join(" ");
              const tekstMph = s.mph.join(" ");
              return (
                <g key={s.k}>
                  <T x={8} y={y + 16} lines={`Kategori ${s.k}${s.stor ? " · stor orkan" : ""}`} size={16} weight={800} fill={C.white} />
                  <T x={8} y={y + 36} lines={`${tekstKm} ${tekstMph}`.length > 36 ? [tekstKm, tekstMph] : `${tekstKm} ${tekstMph}`} size={14} lh={18} fill={C.fg} />
                  <rect x={8} y={y + (`${tekstKm} ${tekstMph}`.length > 36 ? 62 : 46)} width={wb} height={14} rx={4} fill={f} opacity={0.3} stroke={f} strokeWidth={1.6} />
                  {[0, 1, 2, 3, 4].slice(0, s.k).map((j) => (
                    <Strek key={j} x={wb + 14} y={y + (`${tekstKm} ${tekstMph}`.length > 36 ? 62 : 46) + 2 + j * 3} l={Math.max(12, 276 - wb - 20)} k={s.k} />
                  ))}
                </g>
              );
            })}
            <T x={8} y={48 + 5 * 92 + 8} lines={["Skalaen bygger bare på vind. Den tar", "ikke med stormflo, regnflom eller", "tornadoer. Flere og raskere streker", "betyr høyere kategori."]} size={14} lh={18} fill={C.muted} />
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- FigBlokkering ---------- */

function OmegaGeo({ s }: { s: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M8 160 C30 160 45 195 75 195 C110 195 120 50 173 50 C226 50 236 195 271 195 C301 195 316 160 338 160" fill="none" stroke="#20323c" strokeWidth={14} strokeLinecap="round" />
      <path d="M8 160 C30 160 45 195 75 195 C110 195 120 50 173 50 C226 50 236 195 271 195 C301 195 316 160 338 160" fill="none" stroke={C.cold} strokeWidth={3.2} strokeLinecap="round" className="a a-flow" />
    </g>
  );
}

function RexGeo({ s }: { s: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M10 112 C40 112 70 44 130 44 L230 44 C300 44 320 100 270 140 C230 165 150 150 90 168 C36 184 36 256 110 264 C200 276 300 252 338 252" fill="none" stroke="#20323c" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 112 C40 112 70 44 130 44 L230 44 C300 44 320 100 270 140 C230 165 150 150 90 168 C36 184 36 256 110 264 C200 276 300 252 338 252" fill="none" stroke={C.cold} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" className="a a-flow" />
    </g>
  );
}

function Merke({ x, y, t, f }: { x: number; y: number; t: string; f: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={15} fill={C.bg} stroke={f} strokeWidth={2.4} />
      <T x={x} y={y + 6} lines={t} size={16} weight={800} anchor="middle" fill={f} />
    </g>
  );
}

export function FigBlokkering() {
  return (
    <G2Figur
      title="Blokkerende høytrykk"
      desc="To skjematiske kart side om side. Omegablokkering: jetstrømmen i høyden har en rygg i midten og et tråg på hver side, så den får omega-form. Ved bakken ligger et høytrykk mellom to lavtrykk. Vest for blokkeringen strømmer varm luft nordover og øst for den strømmer kald luft sørover. Rex-blokkering: et høytrykk ligger rett nord for et lavtrykk, og jetstrømmen får en bakvendt S-form. Lavtrykket i sør er fanget. Figuren er skjematisk og har ingen tall."
      heading="Blokkerende høytrykk"
      caption="Skjematisk, uten tall eller trykkverdier. H er høytrykk og L er lavtrykk ved bakken. Kilder: Store norske leksikon (u.å.-i, snl.no/omegablokkering); Tsopouridis og Sivle (2025, snl.no/blokkerende_høytrykk)."
      narrow={{ w: 300, h: 770 }}
      wide={{ w: 720, h: 342 }}
      animated
      name="Blokkerende høytrykk"
    >
      {({ bred, mk }) => {
        const s = bred ? 1 : 0.84;
        const pw = 346 * s;
        const panel = (ox: number, oy: number, rex: boolean) => {
          const P = (x: number, y: number) => [ox + x * s, oy + y * s] as const;
          const [hx, hy] = rex ? P(173, 104) : P(173, 122);
          return (
            <g>
              <Box x={ox} y={oy} w={pw} h={300 * s} r={10} fill={G.panel} stroke={G.line} />
              <g transform={`translate(${ox} ${oy})`}>{rex ? <RexGeo s={s} /> : <OmegaGeo s={s} />}</g>
              <Merke x={hx} y={hy} t="H" f={C.low} />
              {rex ? (
                <>
                  <Merke x={P(190, 214)[0]} y={P(190, 214)[1]} t="L" f={C.cold} />
                  <T x={P(228, 218)[0]} y={P(228, 218)[1]} lines={["Fanget", "lavtrykk"]} size={14} lh={18} fill={C.fg} />
                  <T x={P(36, 124)[0]} y={P(36, 124)[1] + (bred ? 0 : 0)} lines={["Jetstrøm"]} size={14} fill={C.cold} weight={700} />
                </>
              ) : (
                <>
                  <Merke x={P(60, 238)[0]} y={P(60, 238)[1]} t="L" f={C.cold} />
                  <Merke x={P(286, 238)[0]} y={P(286, 238)[1]} t="L" f={C.cold} />
                  <Flow d={`M${P(92, 196)[0]} ${P(92, 196)[1]} L${P(100, 118)[0]} ${P(100, 118)[1]}`} color={C.low} marker={mk.low} w={3} />
                  <Flow d={`M${P(254, 118)[0]} ${P(254, 118)[1]} L${P(246, 196)[0]} ${P(246, 196)[1]}`} color={C.cold} marker={mk.cold} w={3} />
                  <T x={P(8, 108)[0]} y={P(8, 108)[1]} lines={["Varm luft", "nordover"]} size={14} lh={18} fill={C.low} weight={700} />
                  <T x={P(338, 108)[0]} y={P(338, 108)[1]} lines={["Kald luft", "sørover"]} size={14} lh={18} fill={C.cold} weight={700} anchor="end" />
                  <T x={P(173, 30)[0]} y={P(173, 30)[1]} lines="Jetstrøm" size={14} fill={C.cold} weight={700} anchor="middle" />
                </>
              )}
              <T x={ox + 12} y={oy + 300 * s + 28} lines={rex ? "Rex-blokkering" : "Omegablokkering"} size={16} weight={800} fill={C.white} />
            </g>
          );
        };
        return (
          <>
            {bred ? (
              <>
                {panel(8, 8, false)}
                {panel(366, 8, true)}
              </>
            ) : (
              <>
                {panel(5, 8, false)}
                {panel(5, 394, true)}
              </>
            )}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- FigEkstremerOppvarming ---------- */

const NIV = ["1 °C", "1,5 °C", "2 °C", "4 °C"];
const PANELER = [
  { navn: ["Ekstrem varme"], f: C.low, hyp: [2.8, 4.1, 5.6, 9.4], tittel: ["Ekstra temperatur (°C)"], str: [1.2, 1.9, 2.6, 5.1], strT: ["+1,2", "+1,9", "+2,6", "+5,1"] },
  { navn: ["Kraftig døgnnedbør"], f: C.rain, hyp: [1.3, 1.5, 1.7, 2.7], tittel: ["Ekstra nedbør (%)"], str: [6.7, 10.5, 14.0, 30.2], strT: ["+6,7", "+10,5", "+14,0", "+30,2"] },
  { navn: ["Landbrukstørke", "(regioner som tørker ut)"], f: C.sand, hyp: [1.7, 2.0, 2.4, 4.1], tittel: ["Endring i jordfuktighet", "(standardavvik)"], str: [0.3, 0.5, 0.6, 1.0], strT: ["0,3", "0,5", "0,6", "1,0"] },
];

export function FigEkstremerOppvarming() {
  return (
    <G2Figur
      title="Hvor mye hyppigere og sterkere blir 10-årshendelsene?"
      desc="Tre paneler med fire søyler hver, for oppvarming på 1, 1,5, 2 og 4 grader, medianer for hendelser som kom én gang på 10 år i 1850–1900. Ekstrem varme kommer 2,8, 4,1, 5,6 og 9,4 ganger oftere og er 1,2, 1,9, 2,6 og 5,1 grader varmere. Kraftig døgnnedbør kommer 1,3, 1,5, 1,7 og 2,7 ganger oftere og er 6,7, 10,5, 14,0 og 30,2 prosent kraftigere. Landbrukstørke i regioner som tørker ut kommer 1,7, 2,0, 2,4 og 4,1 ganger oftere, og jordfuktigheten endres med 0,3, 0,5, 0,6 og 1,0 standardavvik."
      heading="Hvor mye hyppigere og sterkere blir 10-årshendelsene?"
      caption="Medianer for hendelser som kom én gang på 10 år i 1850–1900, ved global oppvarming på 1 °C (i dag), 1,5 °C, 2 °C og 4 °C. Stiplet linje er 1×, like ofte som i 1850–1900. Tørken gjelder bare regioner som tørker ut. Kilde: IPCC (2021), Summary for Policymakers, Figure SPM.6."
      narrow={{ w: 300, h: 1296 }}
      wide={{ w: 720, h: 486 }}
      animated
      name="10-årshendelser"
    >
      {({ bred }) => {
        const pw = bred ? 224 : 300;
        const sk = bred ? 14 : 11;
        const bwd = bred ? 36 : 48;
        const dx = bred ? 48 : 64;
        const panel = (p: (typeof PANELER)[number], ox: number, oy: number, idx: number) => {
          const bx = ox + (bred ? 34 : 38);
          const fb = oy + 56 + 9.4 * sk + 44; // basislinje frekvens
          const maksS = bred ? 74 : 54;
          const maxStr = Math.max(...p.str);
          const sb = fb + 44 + 66 + maksS + 20;
          return (
            <g key={idx}>
              <Box x={ox} y={oy} w={pw} h={sb + 32 - oy} r={10} fill={G.panel} stroke={G.line} />
              <T x={ox + 12} y={oy + 26} lines={p.navn} size={16} weight={800} fill={C.white} lh={18} />
              <T x={ox + 12} y={oy + (p.navn.length > 1 ? 66 : 52)} lines={bred ? "Hvor mye oftere" : "Hvor mye oftere (ganger)"} size={14} fill={C.muted} />
              {/* 1× */}
              <line x1={ox + 28} x2={ox + pw - 8} y1={fb - sk} y2={fb - sk} stroke={C.white} strokeWidth={1.4} strokeDasharray="5 4" />
              <T x={ox + 24} y={fb - sk + 5} lines="1×" size={14} fill={C.white} anchor="end" />
              {p.hyp.map((h, i) => (
                <g key={i}>
                  <rect x={bx + i * dx} y={fb - h * sk} width={bwd} height={h * sk} rx={4} fill={p.f} opacity={i === 0 ? 0.55 : 0.9} className={i === 3 ? "a a-pulse" : undefined} />
                  <T x={bx + i * dx + bwd / 2} y={fb - h * sk - 6} lines={`${nb(h, 1)}×`} size={14} fill={C.fg} weight={700} anchor="middle" />
                  <T x={bx + i * dx + bwd / 2} y={fb + 20} lines={NIV[i]} size={14} fill={C.fg} anchor="middle" />
                </g>
              ))}
              <T x={ox + 12} y={fb + 54} lines={["Hvor mye sterkere:", ...p.tittel]} size={14} fill={C.muted} lh={18} />
              {p.str.map((v, i) => {
                const hh = (v / maxStr) * maksS;
                const yb = sb;
                return (
                  <g key={i}>
                    <rect x={bx + i * dx} y={yb - hh} width={bwd} height={hh} rx={4} fill={p.f} opacity={i === 0 ? 0.35 : 0.65} stroke={p.f} strokeWidth={1.4} />
                    <T x={bx + i * dx + bwd / 2} y={yb - hh - 6} lines={p.strT[i]} size={14} fill={C.fg} weight={700} anchor="middle" />
                    <T x={bx + i * dx + bwd / 2} y={yb + 20} lines={NIV[i]} size={14} fill={C.fg} anchor="middle" />
                  </g>
                );
              })}
            </g>
          );
        };
        return bred ? (
          <>
            {PANELER.map((p, i) => panel(p, 8 + i * 237, 6, i))}
          </>
        ) : (
          <>
            {PANELER.map((p, i) => panel(p, 0, 6 + i * 428, i))}
          </>
        );
      }}
    </G2Figur>
  );
}
