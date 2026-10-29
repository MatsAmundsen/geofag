import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T } from "./g2a-kit";

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

/* ---------- FigNorgeFramskrivninger ---------- */

type Obs = { t: string; p: string };
type Rad = { id: string; navn: string; obs: Obs[]; vt: string; vn: string; ekstra?: { tag: string; lin: string[] } };

const NRAD: Rad[] = [
  {
    id: "temp",
    navn: "Temperatur",
    obs: [{ t: "omtrent +1,4 °C", p: "1901 til 2024" }, { t: "omtrent +1 °C", p: "1961–1990 til 1991–2020" }],
    vt: "omtrent +3,4 °C",
    vn: "Mer i nord enn sør, mer i øst enn vest, mer om vinteren enn om sommeren.",
  },
  {
    id: "ned",
    navn: "Nedbør",
    obs: [{ t: "omtrent +21 %", p: "1901 til 2024" }, { t: "omtrent +7 %", p: "1961–1990 til 1991–2020" }],
    vt: "omtrent +11 %",
    vn: "Størst om høsten, minst om sommeren.",
  },
  { id: "avr", navn: "Avrenning", obs: [{ t: "omtrent +5 %", p: "1961–1990 til 1991–2020" }], vt: "omtrent +10 %", vn: "" },
  { id: "ford", navn: "Fordampning", obs: [{ t: "omtrent +10 %", p: "1961–1990 til 1991–2020" }], vt: "omtrent +20 %", vn: "" },
  {
    id: "hav",
    navn: "Havnivå",
    obs: [],
    vt: "omtrent 36 cm",
    vn: "relativ havnivåstigning i 2100, gjennomsnitt for Norge (SSP3-7.0)",
    ekstra: {
      tag: "Lav sannsynlighet, stor konsekvens",
      lin: ["(SSP5-8.5 og raskt istap i Antarktis):", "omtrent 1–1,5 m innen 2100", "opptil omtrent 4,5–5 m innen 2150"],
    },
  },
];

function RadIkon({ id, x, y }: { id: string; x: number; y: number }) {
  const g = { transform: `translate(${x} ${y})` };
  switch (id) {
    case "temp":
      return (
        <g {...g}>
          <rect x={-5} y={-18} width={10} height={28} rx={5} fill="none" stroke={C.fg} strokeWidth={2} />
          <circle cx={0} cy={14} r={8} fill={C.low} />
          <rect x={-2} y={-8} width={4} height={22} fill={C.low} className="a a-pulse" />
        </g>
      );
    case "ned":
      return (
        <g {...g}>
          <path d="M-18 2 C-18 -6 -10 -8 -6 -4 C-4 -14 10 -14 12 -4 C20 -4 20 4 14 4 L-14 4 C-18 4 -18 4 -18 2 Z" fill="#9fb0bb" />
          {[-10, 0, 10].map((dx, k) => (
            <path key={k} d={`M${dx} 10 l-2 7`} stroke={C.rain} strokeWidth={2.4} strokeLinecap="round" className={k % 2 ? "a a-drift" : "a a-drift2"} style={{ ["--dy" as string]: "6px" }} />
          ))}
        </g>
      );
    case "avr":
      return (
        <g {...g} fill="none" stroke={C.rain} strokeWidth={2.4} strokeLinecap="round">
          <path d="M-18 -10 C-10 -16 -4 -4 4 -10 S14 -14 18 -10" className="a a-flow" />
          <path d="M-18 2 C-10 -4 -4 8 4 2 S14 -2 18 2" className="a a-flow" />
          <path d="M-18 14 C-10 8 -4 20 4 14 S14 10 18 14" className="a a-flow" />
        </g>
      );
    case "ford":
      return (
        <g {...g} fill="none" stroke={C.warm} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          {[-12, 0, 12].map((dx, k) => (
            <g key={k} className={k % 2 ? "a a-rise" : "a a-rise"} style={{ ["--dy" as string]: "-5px" }}>
              <path d={`M${dx} 14 C${dx - 5} 6 ${dx + 5} 2 ${dx} -6`} />
              <path d={`M${dx - 4} -3 L${dx} -9 L${dx + 4} -3`} />
            </g>
          ))}
          <path d="M-18 18 L18 18" stroke={C.rain} />
        </g>
      );
    default:
      return (
        <g {...g} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-18 6 C-12 0 -6 12 0 6 S12 0 18 6" stroke={C.rain} strokeWidth={2.4} className="a a-sway" style={{ ["--dx" as string]: "4px" }} />
          <path d="M-18 14 C-12 8 -6 20 0 14 S12 8 18 14" stroke={C.rain} strokeWidth={2.4} opacity={0.6} />
          <path d="M12 -16 L12 0 M8 -12 L12 -17 L16 -12" stroke={C.fg} strokeWidth={2.2} className="a a-rise" style={{ ["--dy" as string]: "-4px" }} />
        </g>
      );
  }
}

export function FigNorgeFramskrivninger() {
  return (
    <G2Figur
      title="Norge mot 2100"
      desc="Fem paneler for fastlands-Norge med observert endring og videre endring fram mot slutten av århundret hvis utslippene fortsetter å øke. Temperatur: omtrent 1,4 grader varmere fra 1901 til 2024 og omtrent 1 grad fra 1961–1990 til 1991–2020, videre omtrent 3,4 grader. Nedbør: omtrent 21 prosent mer fra 1901 til 2024 og omtrent 7 prosent fra 1961–1990 til 1991–2020, videre omtrent 11 prosent. Avrenning: omtrent 5 prosent mer, videre omtrent 10 prosent. Fordampning: omtrent 10 prosent mer, videre omtrent 20 prosent. Havnivå: relativ havnivåstigning omtrent 36 centimeter i 2100 i gjennomsnitt for Norge (SSP3-7.0). Ved lav sannsynlighet og stor konsekvens omtrent 1 til 1,5 meter innen 2100 og opptil omtrent 4,5 til 5 meter innen 2150."
      heading="Norge mot 2100"
      caption="Fastlands-Norge. Observert endring og videre endring fram mot slutten av århundret hvis utslippene fortsetter å øke. Kilde: Norsk klimaservicesenter (2025), Oppsummeringer fra Klima i Norge 2025."
      narrow={{ w: 300, h: 1600 }}
      wide={{ w: 720, h: 650 }}
      animated
      name="Norge mot 2100"
    >
      {({ bred }) => {
        if (bred) {
          const hh = [108, 108, 80, 80, 176];
          let y = 86;
          const ys = hh.map((h) => {
            const v = y;
            y += h;
            return v;
          });
          return (
            <>
              <T x={178} y={26} lines="Observert" size={16} weight={800} fill={C.white} />
              <T x={462} y={26} lines={["Videre endring fram mot slutten av", "århundret, hvis utslippene", "fortsetter å øke"]} size={16} weight={800} fill={C.white} lh={20} />
              <line x1={170} x2={170} y1={8} y2={y} stroke={G.line} strokeWidth={1} />
              <line x1={454} x2={454} y1={8} y2={y} stroke={G.line} strokeWidth={1} />
              {NRAD.map((r, i) => {
                const ry = ys[i];
                return (
                  <g key={r.id}>
                    <line x1={8} x2={712} y1={ry} y2={ry} stroke={G.line} strokeWidth={1} />
                    <RadIkon id={r.id} x={30} y={ry + 34} />
                    <T x={60} y={ry + 40} lines={r.navn} size={16} weight={800} fill={C.white} />
                    {r.obs.length ? (
                      r.obs.map((o, k) => (
                        <g key={k}>
                          <T x={182} y={ry + 28 + k * 44} lines={o.t} size={20} weight={800} fill={C.warm} />
                          <T x={182} y={ry + 46 + k * 44} lines={o.p} size={14} fill={C.muted} />
                        </g>
                      ))
                    ) : (
                      <T x={182} y={ry + 28} lines={["Ikke tallfestet", "i denne figuren"]} size={14} fill={C.muted} lh={18} />
                    )}
                    <T x={466} y={ry + 28} lines={r.vt} size={20} weight={800} fill={C.low} />
                    {r.vn ? <T x={466} y={ry + 48} lines={brytt(r.vn, 38)} size={14} fill={C.fg} lh={18} /> : null}
                    {r.ekstra ? (
                      <g>
                        <T x={466} y={ry + 48 + brytt(r.vn, 38).length * 18 + 14} lines={r.ekstra.tag} size={14} weight={800} fill={G.amber} />
                        <T x={466} y={ry + 48 + brytt(r.vn, 38).length * 18 + 32} lines={r.ekstra.lin} size={14} lh={18} fill={C.fg} />
                      </g>
                    ) : null}
                  </g>
                );
              })}
              <line x1={8} x2={712} y1={y} y2={y} stroke={G.line} strokeWidth={1} />
            </>
          );
        }
        // smal
        let y = 8;
        const blokker = NRAD.map((r) => {
          const vnl = r.vn ? brytt(r.vn, 36) : [];
          const ekl = r.ekstra ? 1 + r.ekstra.lin.length : 0;
          const obsH = r.obs.length ? r.obs.length * 44 : 40;
          const h = 38 + 22 + obsH + 22 + 30 + vnl.length * 18 + (ekl ? ekl * 18 + 14 : 0) + 22;
          const v = { r, y, h, vnl };
          y += h + 12;
          return v;
        });
        return (
          <>
            {blokker.map(({ r, y: by, h, vnl }) => {
              let cy = by + 62;
              return (
                <g key={r.id}>
                  <Box x={4} y={by} w={292} h={h} r={10} fill={G.panel} stroke={G.line} />
                  <RadIkon id={r.id} x={30} y={by + 22} />
                  <T x={58} y={by + 28} lines={r.navn} size={16} weight={800} fill={C.white} />
                  <T x={16} y={cy - 4} lines="Observert" size={14} weight={800} fill={C.muted} />
                  {(() => {
                    cy += 20;
                    return null;
                  })()}
                  {r.obs.length ? (
                    r.obs.map((o, k) => (
                      <g key={k}>
                        <T x={16} y={cy + k * 44 + 4} lines={o.t} size={20} weight={800} fill={C.warm} />
                        <T x={16} y={cy + k * 44 + 22} lines={o.p} size={14} fill={C.muted} />
                      </g>
                    ))
                  ) : (
                    <T x={16} y={cy + 4} lines="Ikke tallfestet i denne figuren" size={14} fill={C.muted} />
                  )}
                  {(() => {
                    cy += r.obs.length ? r.obs.length * 44 : 40;
                    return null;
                  })()}
                  <T x={16} y={cy + 10} lines="Videre, hvis utslippene fortsetter å øke" size={14} weight={800} fill={C.muted} />
                  <T x={16} y={cy + 36} lines={r.vt} size={20} weight={800} fill={C.low} />
                  {vnl.length ? <T x={16} y={cy + 56} lines={vnl} size={14} fill={C.fg} lh={18} /> : null}
                  {r.ekstra ? (
                    <g>
                      <T x={16} y={cy + 56 + vnl.length * 18 + 12} lines={r.ekstra.tag} size={14} weight={800} fill={G.amber} />
                      <T x={16} y={cy + 56 + vnl.length * 18 + 30} lines={r.ekstra.lin} size={14} lh={18} fill={C.fg} />
                    </g>
                  ) : null}
                </g>
              );
            })}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- FigTilpasningsgrenser ---------- */

type Pkt = { t: "hard" | "myk"; tag: string; tekst: string };
const GR = [
  {
    v: 1.5,
    tittel: "Over 1,5 °C",
    it: [{ t: "hard", tag: "Mulig hard grense", tekst: "Begrensede ferskvannsressurser for små øystater og regioner som er avhengige av smeltevann fra breer og snø." }] as Pkt[],
    tillit: "Middels tillit",
  },
  {
    v: 2,
    tittel: "2 °C",
    it: [{ t: "myk", tag: "Myke grenser", tekst: "For flere viktige matplanter i mange dyrkingsområder, særlig i tropene." }] as Pkt[],
    tillit: "Høy tillit",
  },
  {
    v: 3,
    tittel: "3 °C",
    it: [
      { t: "myk", tag: "Myke grenser", tekst: "For noen tiltak i vannforvaltning i mange regioner." },
      { t: "hard", tag: "Harde grenser", tekst: "I deler av Europa." },
    ] as Pkt[],
    tillit: "Middels tillit",
  },
];
const FARGE = { hard: "#e07a6a", myk: "#e8c36a" };

function Kort({ x, y, w, g, maks }: { x: number; y: number; w: number; g: (typeof GR)[number]; maks: number }) {
  let cy = y + 30;
  const deler = g.it.map((p) => {
    const lin = brytt(p.tekst, maks);
    const d = { p, lin, y: cy };
    cy += 22 + lin.length * 18 + 8;
    return d;
  });
  const h = cy - y + 30;
  return { h, el: (
    <g>
      <Box x={x} y={y} w={w} h={h} r={10} fill={G.panel} stroke={G.line} />
      <T x={x + 14} y={y + 24} lines={g.tittel} size={16} weight={800} fill={C.white} />
      {deler.map((d, i) => (
        <g key={i}>
          <rect x={x + 14} y={d.y - 2} width={4} height={22 + d.lin.length * 18 - 6} rx={2} fill={FARGE[d.p.t]} />
          <T x={x + 26} y={d.y + 14} lines={d.p.tag} size={14} weight={800} fill={FARGE[d.p.t]} />
          <T x={x + 26} y={d.y + 34} lines={d.lin} size={14} lh={18} fill={C.fg} />
        </g>
      ))}
      <T x={x + 14} y={y + h - 12} lines={g.tillit} size={14} fill={C.muted} />
    </g>
  ) };
}

export function FigTilpasningsgrenser() {
  return (
    <G2Figur
      title="Grensene for tilpasning kommer tidligere jo varmere det blir"
      desc="Skala for global oppvarming med tre markeringer. Hard grense betyr at ingen tilpasningstiltak kan hindre uakseptabel risiko. Myk grense betyr at tiltak finnes kanskje, men ikke er tilgjengelige nå. Over 1,5 grader: mulige harde grenser, begrensede ferskvannsressurser for små øystater og regioner avhengige av smeltevann fra breer og snø, middels tillit. Ved 2 grader: myke grenser for flere viktige matplanter i mange dyrkingsområder, særlig i tropene, høy tillit. Ved 3 grader: myke grenser for noen tiltak i vannforvaltning i mange regioner og harde grenser i deler av Europa, middels tillit."
      heading="Grensene for tilpasning kommer tidligere jo varmere det blir"
      caption="Skalaen er forenklet: markeringene viser 1,5, 2 og 3 °C global oppvarming, ikke et fullstendig sett av grenser. Kilde: IPCC (2022), Summary for Policymakers, C.3.4; Möller mfl. (2022)."
      narrow={{ w: 300, h: 1000 }}
      wide={{ w: 720, h: 470 }}
      animated
      name="Tilpasningsgrenser"
    >
      {({ bred, mk }) => {
        const def = (x: number, y: number, w: number, tittel: string, tekst: string, f: string, maks: number) => {
          const lin = brytt(tekst, maks);
          return (
            <g>
              <Box x={x} y={y} w={w} h={34 + lin.length * 18} r={10} fill={G.panel} stroke={f} sw={2} />
              <T x={x + 14} y={y + 24} lines={tittel} size={16} weight={800} fill={f} />
              <T x={x + 14} y={y + 46} lines={lin} size={14} lh={18} fill={C.fg} />
            </g>
          );
        };
        if (bred) {
          const sx = (v: number) => 40 + ((v - 1) / 2.5) * 640;
          const ty = 172;
          const kort = GR.map((g, i) => Kort({ x: 8 + i * 240, y: 226, w: 224, g, maks: 28 }));
          return (
            <>
              {def(8, 8, 352, "Hard grense", "Ingen tilpasningstiltak kan hindre uakseptabel risiko.", FARGE.hard, 46)}
              {def(368, 8, 344, "Myk grense", "Tiltak finnes kanskje, men er ikke tilgjengelige nå.", FARGE.myk, 46)}
              <defs>
                <linearGradient id="g2b-tilp-skala" x1="0" x2="1">
                  <stop offset="0" stopColor={C.cold} />
                  <stop offset="1" stopColor={C.low} />
                </linearGradient>
              </defs>
              <rect x={30} y={ty - 5} width={670} height={10} rx={5} fill="url(#g2b-tilp-skala)" />
              <T x={30} y={ty - 46} lines="Global oppvarming" size={14} fill={C.muted} />
              <Flow d={`M${640} ${ty} L${700} ${ty}`} color={C.white} marker={mk.fg} w={2} />
              {GR.map((g, i) => {
                const mx = sx(g.v);
                const cx = 8 + i * 240 + 112;
                return (
                  <g key={g.v}>
                    <path d={`M${mx} ${ty + 8} L${mx} ${ty + 24} L${cx} ${ty + 24} L${cx} 226`} fill="none" stroke={C.muted} strokeWidth={1.4} />
                    <circle cx={mx} cy={ty} r={10} fill={C.bg} stroke={C.white} strokeWidth={2.4} className={i % 2 ? "a a-pulse" : "a a-pulse2"} />
                    <T x={mx} y={ty - 20} lines={g.v === 1.5 ? "1,5 °C" : `${g.v} °C`} size={16} weight={800} fill={C.white} anchor="middle" />
                  </g>
                );
              })}
              {kort.map((k, i) => (
                <g key={i}>{k.el}</g>
              ))}
            </>
          );
        }
        const dh1 = def(8, 8, 284, "Hard grense", "Ingen tilpasningstiltak kan hindre uakseptabel risiko.", FARGE.hard, 36);
        const dh2 = def(8, 108, 284, "Myk grense", "Tiltak finnes kanskje, men er ikke tilgjengelige nå.", FARGE.myk, 36);
        let y = 224;
        const kort = GR.map((g) => {
          const k = Kort({ x: 44, y, w: 250, g, maks: 28 });
          const r = { k, y, h: k.h };
          y += k.h + 18;
          return r;
        });
        return (
          <>
            {dh1}
            {dh2}
            <T x={8} y={216} lines="Global oppvarming" size={14} fill={C.muted} />
            <rect x={20} y={226} width={10} height={y - 226 - 8} rx={5} fill="url(#g2b-tilp-skala-v)" />
            <defs>
              <linearGradient id="g2b-tilp-skala-v" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={C.cold} />
                <stop offset="1" stopColor={C.low} />
              </linearGradient>
            </defs>
            {kort.map(({ k, y: ky, h }, i) => (
              <g key={i}>
                <line x1={30} x2={44} y1={ky + 24} y2={ky + 24} stroke={C.muted} strokeWidth={1.4} />
                <circle cx={25} cy={ky + 24} r={9} fill={C.bg} stroke={C.white} strokeWidth={2.4} className={i % 2 ? "a a-pulse" : "a a-pulse2"} />
                {k.el}
              </g>
            ))}
            <T x={8} y={y + 8} lines={["Markeringene står i rekkefølge,", "ikke i målestokk."]} size={14} lh={18} fill={C.muted} />
          </>
        );
      }}
    </G2Figur>
  );
}
