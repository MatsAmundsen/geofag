/**
 * Figurene i Geofag 1: Geologisk tid og datering.
 *
 * Samme ramme som Isbreer, Norges geologi og Bergarter (IsbreFigur, StegVelger, Skyver og isbre-kit):
 * nummermerker og liste på smal skjerm, aria-live ved valg, fokusring fra knappene og redusert bevegelse.
 *
 * Alle tall står i kapittelteksten (src/lib/posts/geologisk-tid.md). Klokkeslettene i døgn-analogien
 * er regnet ut fra jordas alder, ca. 4,54 milliarder år = 24 timer (USGS). Periodegrensene i tidslinjen
 * følger ICS-kartet v2026/06 (Cohen mfl., 2026), som står i kildelista. Alt er skjematisk.
 */
import { useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, Skyver, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, figureFont, pickStep, smooth, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";

const n1 = (v: number) => Math.round(v * 10) / 10;

function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  const inner = width - (smallWindow ? 18 : 42);
  return [ref, width > 0 ? inner < NARROW_FIGURE_PX : smallWindow];
}

function StegRamme({ small, children }: { small: boolean; children: ReactNode }) {
  return <div className={small ? "contents [&_button]:text-sm" : "contents"}>{children}</div>;
}

/** Tekst inne i figuren: minst 12 CSS-piksler, med mørk kontur. */
function T({
  x,
  y,
  children,
  size = 15,
  scale,
  fill = C.fg,
  anchor = "start",
  weight = 600,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  scale: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={figureFont(size, scale)}
      fontWeight={weight}
      textAnchor={anchor}
      fill={fill}
      stroke={P.halo}
      strokeWidth="4"
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

const tall = (v: number, d = 0) =>
  v.toLocaleString("nb-NO", { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/\u00a0/g, " ");

/* =====================================================================
 * 1. Den geologiske tidslinjen: zoom og døgn-analogi
 * ===================================================================== */

/** Jordas alder, ca. 4540 millioner år (USGS, Age of the Earth: 4,54 ± 0,05 mrd. år). Klokka og tidslinjen starter her. */
const JORD_MA = 4540;

type Hendelse = { navn: string; ma: number; til?: number; farge: string; kort: string };

const H: Record<string, Hendelse> = {
  jord: { navn: "Jorda dannes, ca. 4,54 mrd. år", kort: "Jorda dannes", ma: 4540, farge: C.warm },
  zirkon: { navn: "Eldste zirkon, ca. 4,4 mrd. år", kort: "Eldste zirkon", ma: 4400, farge: "#e6c9c0" },
  grunnfjell: { navn: "Grunnfjellet i Norge, ca. 3000–900 mill. år", kort: "Grunnfjellet", ma: 3000, til: 900, farge: "#c7a9d9" },
  kambrium: { navn: "Kambrium begynner, 538,8 mill. år", kort: "Kambrium", ma: 538.8, farge: C.teal },
  kaledon: { navn: "Kaledonidene, ca. 495–405 mill. år", kort: "Kaledonidene", ma: 495, til: 405, farge: "#c7a9d9" },
  oslo: { navn: "Oslofeltet (riften), ca. 300–250 mill. år", kort: "Oslo-riften", ma: 300, til: 250, farge: "#e49a7a" },
  norskehav: { navn: "Norskehavet åpner seg, ca. 55 mill. år", kort: "Norskehavet", ma: 55, til: 55, farge: C.rain },
  kritt: { navn: "Kritt slutter, 66,0 mill. år", kort: "Slutten av kritt", ma: 66, farge: C.low },
  kvartaer: { navn: "Kvartær begynner, 2,58 mill. år", kort: "Kvartær", ma: 2.58, farge: C.cold },
  avset: { navn: "Avsetninger i Fastlands-Norge, siste ca. 200 000 år", kort: "Avsetninger i Norge", ma: 0.2, til: 0, farge: C.sand },
  aarring: { navn: "Sammenhengende årringserie, ca. 14 000 år", kort: "Årringserien", ma: 0.014, til: 0, farge: "#9cc78a" },
  vedde: { navn: "Vedde-asken, ca. 12 000 år", kort: "Vedde-asken", ma: 0.012, farge: "#e6c9c0" },
  holocen: { navn: "Holocen begynner, ca. 11 700 år", kort: "Holocen", ma: 0.0117, farge: C.cold },
};

/**
 * Tidsaldre og perioder i fanerozoikum, grenser i millioner år etter ICS International
 * Chronostratigraphic Chart v2026/06 (Cohen mfl., 2026). Karbon, trias og neogen vises uten tall;
 * grensene deres (358,9 og 23,0) brukes bare til å tegne båndene.
 */
type Enhet = { navn: string; fra: number; til: number; farge: string; tall?: string };
const TIDSALDRE: Enhet[] = [
  { navn: "Paleozoikum", fra: 538.8, til: 251.9, farge: "#3f6b6e", tall: "538,8" },
  { navn: "Mesozoikum", fra: 251.9, til: 66.0, farge: "#4f6d3a", tall: "251,9" },
  { navn: "Kenozoikum", fra: 66.0, til: 0, farge: "#7a6a2e", tall: "66,0" },
];
const PERIODER: Enhet[] = [
  { navn: "Kambrium", fra: 538.8, til: 486.9, farge: "#5d8a73", tall: "538,8" },
  { navn: "Ordovicium", fra: 486.9, til: 443.1, farge: "#2f8a78", tall: "486,9" },
  { navn: "Silur", fra: 443.1, til: 419.6, farge: "#6ea890", tall: "443,1" },
  { navn: "Devon", fra: 419.6, til: 358.9, farge: "#9a6a3a", tall: "419,6" },
  { navn: "Karbon", fra: 358.9, til: 298.9, farge: "#4f7a7a" },
  { navn: "Perm", fra: 298.9, til: 251.9, farge: "#a2523e", tall: "298,9" },
  { navn: "Trias", fra: 251.9, til: 201.4, farge: "#6d4a7a" },
  { navn: "Jura", fra: 201.4, til: 143.1, farge: "#3a7a9a", tall: "201,4" },
  { navn: "Kritt", fra: 143.1, til: 66.0, farge: "#5e8a3a", tall: "ca. 143,1" },
  { navn: "Paleogen", fra: 66.0, til: 23.0, farge: "#9a7a3a" },
  { navn: "Neogen", fra: 23.0, til: 2.58, farge: "#a89a3a" },
];

type Zoom = {
  knapp: string;
  fra: number;
  /** Bånd under tidslinjen: navn, fra, til (millioner år). */
  band: { navn: string; fra: number; til: number; farge: string }[];
  punkt: string[];
  spenn: string[];
  ticks: number[];
  tick: (ma: number) => string;
  enhet: string;
  status: string;
  /** Neste zoom, markert med en ramme. */
  neste?: number;
  /** Tidsaldre og perioder i stedet for ett bånd. */
  perioder?: boolean;
};

/** Andelen av jordas historie som er prekambrium, regnet fra 4540 og 538,8 millioner år. */
const PREK_PROSENT = Math.round(((JORD_MA - 538.8) / JORD_MA) * 100);

const ZOOM: Zoom[] = [
  {
    knapp: "Hele jordas historie",
    fra: JORD_MA,
    band: [
      { navn: "Prekambrium", fra: JORD_MA, til: 538.8, farge: "#5a4a63" },
      { navn: "Fanerozoikum", fra: 538.8, til: 0, farge: "#3f6b6e" },
    ],
    punkt: ["jord", "zirkon", "kambrium"],
    spenn: ["grunnfjell"],
    ticks: [4000, 3000, 2000, 1000, 0],
    tick: (ma) => (ma === 0 ? "I dag" : tall(ma / 1000)),
    enhet: "milliarder år siden",
    status: `Hele jordas historie: Prekambrium er nesten 90 prosent av tiden (ca. ${PREK_PROSENT} %). Fanerozoikum, tiden med mange fossiler, begynte for 538,8 millioner år siden.`,
    neste: 538.8,
  },
  {
    knapp: "Fanerozoikum",
    fra: 538.8,
    band: [],
    perioder: true,
    punkt: [],
    spenn: ["kaledon", "oslo", "norskehav"],
    ticks: [500, 400, 300, 200, 100, 0],
    tick: (ma) => (ma === 0 ? "I dag" : tall(ma)),
    enhet: "millioner år siden",
    status:
      "Fanerozoikum er delt i tre tidsaldre og mange perioder. Kaledonidene og Oslofeltet hører til paleozoikum. Kritt sluttet for 66,0 millioner år siden, og kvartær er bare den aller siste biten.",
    neste: 2.58,
  },
  {
    knapp: "Kvartær",
    fra: 2.58,
    band: [{ navn: "Kvartær", fra: 2.58, til: 0, farge: "#3d5a73" }],
    punkt: ["kvartaer"],
    spenn: ["avset"],
    ticks: [2.5, 2, 1.5, 1, 0.5, 0],
    tick: (ma) => (ma === 0 ? "I dag" : tall(ma, 1)),
    enhet: "millioner år siden",
    status:
      "Kvartær, perioden med de store istidene, begynte for 2,58 millioner år siden. I Fastlands-Norge finnes bare avsetninger fra de siste ca. 200 000 årene.",
    neste: 0.015,
  },
  {
    knapp: "Siste 15 000 år",
    fra: 0.015,
    band: [
      { navn: "Kvartær", fra: 0.015, til: 0.0117, farge: "#3d5a73" },
      { navn: "Holocen", fra: 0.0117, til: 0, farge: "#3f6b6e" },
    ],
    punkt: ["vedde", "holocen"],
    spenn: ["aarring"],
    ticks: [0.015, 0.0125, 0.01, 0.0075, 0.005, 0.0025, 0],
    tick: (ma) => (ma === 0 ? "I dag" : tall(ma * 1e6)),
    enhet: "år siden",
    status:
      "De siste 15 000 årene: Det aller meste av løsmassene i Fastlands-Norge er så unge. Vedde-asken er ca. 12 000 år, og holocen begynte for ca. 11 700 år siden.",
  },
];

/** Klokkeslett når jordas alder (ca. 4,54 milliarder år) er ett døgn. */
function klokke(ma: number) {
  const s = 86400 * (1 - ma / JORD_MA);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sek = Math.floor(s % 60);
  return { s, tekst: `${String(h).padStart(2, "0")}.${String(m).padStart(2, "0")}`, sek };
}
const KLOKKE: { h: Hendelse; tekst: string }[] = (() => {
  const list = ["jord", "zirkon", "grunnfjell", "kambrium", "kaledon", "oslo", "kritt", "kvartaer"].map((k) => H[k]);
  return list.map((h) => {
    const k = klokke(h.ma);
    const tid = h.ma < 10 ? `kl. 23.59.${String(k.sek).padStart(2, "0")}` : `kl. ${k.tekst}`;
    return { h, tekst: `${h.kort}: ${tid}` };
  });
})();
const KL_HOLOCEN = (86400 * 0.0117) / JORD_MA;
const KLOKKE_START = "Klokka starter da jorda ble dannet for ca. 4,54 milliarder år siden. Midnatt er i dag.";

const TL_STEPS = [...ZOOM.map((z) => z.knapp), "Som et døgn"];
const TL_X0 = 60;
const TL_X1 = 900;

export function GeotidTidslinjeFigur({ heading = "Den geologiske tidsskalaen: zoom inn" }: { heading?: string }) {
  const [step, setStep] = useState(1);
  const [wrapRef, small] = useFigurSmal();
  const i = step - 1;
  const klokkeModus = step === 5;
  const z = ZOOM[Math.min(i, ZOOM.length - 1)];
  const xOf = (ma: number) => n1(TL_X0 + ((z.fra - ma) / z.fra) * (TL_X1 - TL_X0));
  const labels: Lab[] = [];
  // med tidsaldre og perioder ligger aksen lenger ned
  const BAR_Y = z.perioder ? 96 : 250;
  const BAR_H = z.perioder ? (small ? 250 : 196) : 56;
  const SPENN_Y = z.perioder ? BAR_Y + BAR_H + 56 : 352;
  const SPENN_DY = z.perioder ? 22 : 34;
  if (!klokkeModus) {
    z.punkt.forEach((k, j) => {
      const h = H[k];
      const x = xOf(h.ma);
      const ly = 80 + j * 46;
      const right = x > 600;
      labels.push({
        text: h.navn,
        x: right ? 900 : Math.max(60, x - 10),
        y: ly,
        at: [x, BAR_Y - 4],
        color: h.farge,
        anchor: right ? "end" : "start",
        badge: [Math.min(Math.max(x, 30), 930), BAR_Y - 34 - j * 30],
      });
    });
    z.spenn.forEach((k, j) => {
      const h = H[k];
      const x0 = xOf(h.ma);
      const x1 = xOf(h.til ?? 0);
      const mid = (x0 + x1) / 2;
      const yRow = SPENN_Y + j * SPENN_DY;
      const right = mid > 620;
      labels.push({
        text: h.navn,
        x: right ? 900 : 60,
        y: (z.perioder ? 440 : 440) + j * 32,
        at: [n1(mid), yRow + 6],
        color: h.farge,
        anchor: right ? "end" : "start",
        badge: [n1(Math.min(Math.max(mid, 30), 930)), yRow + 40 + j * 4],
      });
    });
    if (z.perioder)
      labels.push({
        text: "Kvartær, 2,58",
        x: 900,
        y: 70,
        at: [n1(xOf(1.3)), BAR_Y + 60],
        color: C.cold,
        anchor: "end",
        badge: [920, 60],
      });
  } else {
    const r = 200;
    const cx = 290;
    const cy = 280;
    KLOKKE.forEach((k, j) => {
      const a = (klokke(k.h.ma).s / 86400) * Math.PI * 2 - Math.PI / 2;
      labels.push({
        text: k.tekst,
        x: 560,
        y: 92 + j * 40,
        color: k.h.farge,
        badge: [n1(cx + Math.cos(a) * (r + 34)), n1(cy + Math.sin(a) * (r + 34))],
      });
    });
  }
  const status = klokkeModus
    ? `${KLOKKE_START} Kambrium begynner da ${KLOKKE[3].tekst.split(": ")[1]}, og kvartær først ${KLOKKE[7].tekst.split(": ")[1]}. Holocen er bare de siste ${tall(KL_HOLOCEN, 1)} sekundene.`
    : z.status;
  const keys: Key[] = klokkeModus
    ? [
        { text: "Prekambrium", color: "#5a4a63", kind: "fill" },
        { text: "Fanerozoikum", color: "#3f6b6e", kind: "fill" },
      ]
    : [
        { text: "Hendelse i tid", color: C.fg, kind: "line" },
        { text: "Utsnittet i neste zoom", color: C.warm, kind: "dash" },
      ];
  const notes = klokkeModus
    ? ["Jordas alder, ca. 4,54 milliarder år = 24 timer (USGS)", "Solsystemet er litt eldre, ca. 4,567 milliarder år, og ligger før klokka starter"]
    : z.perioder
      ? ["Tid i millioner år siden", "Grenser fra ICS-kartet v2026/06", "Karbon, trias og neogen uten tall"]
      : [`Tid i ${z.enhet}`, "Eldst til venstre"];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        title="Den geologiske tidsskalaen som tidslinje med fire zoomnivåer, fra hele jordas historie med tidsaldre og perioder ned til de siste 15 000 årene, og som et døgn der jordas alder er 24 timer"
        heading={heading}
        caption="Velg et utsnitt for å zoome inn. Hver tidslinje er lineær, så lengden viser hvor lang tid det er. I døgnet tilsvarer ett sekund ca. 53 000 år."
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={TL_STEPS} step={step} onStep={setStep} label="Velg utsnitt" />
          </StegRamme>
        }
        status={status}
        labels={labels}
        keys={keys}
        notes={notes}
        viewBox="0 0 960 540"
      >
        {({ scale }) =>
          klokkeModus ? (
            <g data-figur="geotid-klokke" data-step={step}>
              <circle cx={290} cy={280} r={200} fill="#14202a" />
              {(() => {
                const a1 = (klokke(538.8).s / 86400) * Math.PI * 2 - Math.PI / 2;
                const ex = n1(290 + Math.cos(a1) * 200);
                const ey = n1(280 + Math.sin(a1) * 200);
                return (
                  <>
                    <path d={`M290 280 L290 80 A200 200 0 1 1 ${ex} ${ey} Z`} fill="#5a4a63" />
                    <path d={`M290 280 L${ex} ${ey} A200 200 0 0 1 290 80 Z`} fill="#3f6b6e" />
                  </>
                );
              })()}
              <circle cx={290} cy={280} r={200} fill="none" stroke={C.muted} strokeWidth="2" />
              {Array.from({ length: 24 }, (_, h) => {
                const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
                const long = h % 6 === 0;
                return (
                  <line
                    key={h}
                    x1={n1(290 + Math.cos(a) * (long ? 176 : 188))}
                    y1={n1(280 + Math.sin(a) * (long ? 176 : 188))}
                    x2={n1(290 + Math.cos(a) * 200)}
                    y2={n1(280 + Math.sin(a) * 200)}
                    stroke={C.fg}
                    strokeOpacity="0.7"
                    strokeWidth={long ? 3 : 1.5}
                  />
                );
              })}
              {KLOKKE.map((k) => {
                const a = (klokke(k.h.ma).s / 86400) * Math.PI * 2 - Math.PI / 2;
                return (
                  <line
                    key={k.h.kort}
                    x1={n1(290 + Math.cos(a) * 92)}
                    y1={n1(280 + Math.sin(a) * 92)}
                    x2={n1(290 + Math.cos(a) * 214)}
                    y2={n1(280 + Math.sin(a) * 214)}
                    stroke={k.h.farge}
                    strokeWidth="3"
                  />
                );
              })}
              <circle cx={290} cy={280} r={86} fill="#0f171c" />
              <T x={290} y={272} scale={scale} anchor="middle" size={20} weight={800}>
                24 timer
              </T>
              <T x={290} y={302} scale={scale} anchor="middle" size={14} fill={C.muted}>
                = 4,54 mrd. år
              </T>
            </g>
          ) : (
            <g data-figur="geotid-tidslinje" data-step={step}>
              {z.band.map((b) => {
                const x0 = xOf(b.fra);
                const x1 = xOf(b.til);
                const w = x1 - x0;
                return (
                  <g key={b.navn}>
                    <rect x={x0} y={BAR_Y} width={n1(w)} height={BAR_H} fill={b.farge} />
                    {w > (small ? 340 : 140) ? (
                      <T x={n1(x0 + w / 2)} y={BAR_Y + 36} scale={scale} anchor="middle" size={18} weight={800}>
                        {b.navn}
                      </T>
                    ) : null}
                  </g>
                );
              })}
              {z.perioder ? (
                <>
                  {TIDSALDRE.map((e) => {
                    const x0 = xOf(e.fra);
                    const w = xOf(e.til) - x0;
                    return (
                      <g key={e.navn}>
                        <rect x={x0} y={BAR_Y} width={n1(w - 1.5)} height={40} fill={e.farge} />
                        <T x={n1(x0 + w / 2)} y={BAR_Y + 26} scale={scale} anchor="middle" size={small ? 13 : 16} weight={800}>
                          {small && w < 160 ? e.navn.slice(0, 4) + "." : e.navn}
                        </T>
                      </g>
                    );
                  })}
                  {PERIODER.map((p) => {
                    const x0 = xOf(p.fra);
                    const w = xOf(p.til) - x0;
                    const cx = n1(x0 + w / 2);
                    const yb = BAR_Y + BAR_H - 8;
                    return (
                      <g key={p.navn}>
                        <rect x={x0} y={BAR_Y + 44} width={n1(Math.max(1, w - 1.5))} height={BAR_H - 44} fill={p.farge} />
                        <g transform={`rotate(-90 ${cx} ${yb})`}>
                          <T x={cx} y={n1(yb + figureFont(14, scale) * 0.35)} scale={scale} size={14} weight={700}>
                            {small || !p.tall ? p.navn : `${p.navn} ${p.tall}`}
                          </T>
                        </g>
                      </g>
                    );
                  })}
                  <rect x={xOf(2.58)} y={BAR_Y + 44} width={n1(Math.max(2, TL_X1 - xOf(2.58)))} height={BAR_H - 44} fill="#3d5a73" />
                </>
              ) : null}
              {z.neste !== undefined ? (
                <rect
                  x={xOf(z.neste) - 3}
                  y={BAR_Y - 8}
                  width={n1(TL_X1 - xOf(z.neste) + 6)}
                  height={BAR_H + 16}
                  fill="none"
                  stroke={C.warm}
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  rx="4"
                />
              ) : null}
              {z.punkt.map((k) => (
                <line key={k} x1={xOf(H[k].ma)} y1={BAR_Y - 4} x2={xOf(H[k].ma)} y2={BAR_Y + BAR_H} stroke={H[k].farge} strokeWidth="3" />
              ))}
              {z.spenn.map((k, j) => {
                const x0 = xOf(H[k].ma);
                const x1 = xOf(H[k].til ?? 0);
                const y = SPENN_Y + j * SPENN_DY;
                return <rect key={k} x={n1(Math.min(x0, x1 - 2))} y={y} width={n1(Math.max(4, x1 - x0))} height={12} rx="3" fill={H[k].farge} />;
              })}
              {z.ticks.map((t) => {
                const x = xOf(t);
                const ty = BAR_Y + BAR_H;
                return (
                  <g key={t}>
                    <line x1={x} y1={ty} x2={x} y2={ty + 8} stroke={C.muted} strokeWidth="1.5" />
                    {small && t !== 0 && z.ticks.indexOf(t) % 2 === 1 ? null : (
                      <T x={x} y={ty + 30} scale={scale} anchor={t === 0 ? "end" : "middle"} size={14} fill={C.muted}>
                        {z.tick(t)}
                      </T>
                    )}
                  </g>
                );
              })}
            </g>
          )
        }
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 2. Relativ datering: snittet bygges opp hendelse for hendelse
 *    Rekkefølgen følger kapittelteksten: lag A–D, forkastning F, gang E (yngst).
 * ===================================================================== */

const RD_STEPS = ["Lag A", "Lag B", "Lag C", "Lag D", "Forkastning F", "Gang E"];
const RD_STATUS = [
  "Lag A (skifer) avsettes først, nesten vannrett. Det ligger nederst og er eldst.",
  "Lag B (kalkstein med fossiler) avsettes oppå A. Etter overlagringsprinsippet er B yngre enn A.",
  "Lag C (sandstein) avsettes oppå B.",
  "Lag D (konglomerat) avsettes oppå C. Lagrekken er avsatt fra kambrium til devon: A er eldst og D yngst.",
  "Forkastningen F skjærer gjennom alle fire lagene og forskyver dem. Den må derfor være yngre enn lag D.",
  "Gangen E skjærer gjennom både lagene og forkastningen uten å være forskjøvet, så E er den yngste hendelsen. Bruddstykkene av lag B i gangen viser at lag B fantes før magmaen trengte opp.",
];
const RD_BILDETEKST =
  "Lagene ligger i rekkefølge, med A eldst og D yngst. Forkastningen F skjærer gjennom alle fire lagene og er yngre enn lag D. Gangen E skjærer gjennom både lagene og forkastningen og er den yngste hendelsen. Bruddstykkene av lag B i gangen viser at lag B fantes før magmaen trengte opp.";
const RD_LAG = [
  { navn: "Lag A (kambrium)", top: 310, bunn: 380, fill: "#3a3830", farge: C.sand },
  { navn: "Lag B (ordovicium)", top: 240, bunn: 310, fill: "#24414d", farge: C.teal },
  { navn: "Lag C (silur)", top: 170, bunn: 240, fill: "#4a3b2c", farge: C.warm },
  { navn: "Lag D (devon)", top: 90, bunn: 170, fill: "#2b4637", farge: C.rain },
];
const RD_SPRANG = 40;
/** Forkastningen F går fra (420, 50) til (570, 380). Høyre blokk er senket. */
const faultX = (y: number) => 420 + ((y - 50) * 150) / 330;
const RD_LEFT = `M50 40 L${n1(faultX(40))} 40 L570 380 L50 380 Z`;
const RD_RIGHT = `M${n1(faultX(40))} 40 L850 40 L850 380 L570 380 Z`;
/**
 * Gangen E tegnes over forkastningen og forskyves ikke: den er yngre enn F.
 * Den heller motsatt vei av F og krysser den ved ca. y = 307, fra toppen av den senkede blokken.
 */
const RD_GANG = "M654 130 L694 130 L500 380 L460 380 Z";
const RD_XENO = ["540,288 558,284 554,298 537,296", "552,262 570,258 566,272 549,270"];
const RD_SEKVENS = [
  { kort: "A", lang: "Lag A" },
  { kort: "B", lang: "Lag B" },
  { kort: "C", lang: "Lag C" },
  { kort: "D", lang: "Lag D" },
  { kort: "F", lang: "Forkastn. F" },
  { kort: "E", lang: "Gang E" },
];
const RD_SEKV_FARGE = [...RD_LAG.map((l) => l.farge), C.low, "#f0a07a"];

export function GeotidRelativFigur({ heading = "Slik leser du et snitt: relativ datering steg for steg" }: { heading?: string }) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(6, motion.playing && visible, 2600, 1800, 6);
  const { step, phase } = clock;
  const i = step - 1;
  const grow = motion.playing ? smooth(phase) : 1;
  const off = step < 5 ? 0 : RD_SPRANG * (step === 5 ? grow : 1);
  const uid = "rd";
  const labels: Lab[] = [];
  RD_LAG.forEach((l, j) => {
    if (j > i) return;
    labels.push({ text: l.navn, x: 70, y: l.bunn - 22, color: l.farge, size: 15, weight: 700, badge: [90, l.bunn - 28] });
  });
  if (step >= 5)
    labels.push({ text: "Forkastning F", x: 300, y: 64, at: [n1(faultX(200)), 200], color: C.low, weight: 700, badge: [420, 180] });
  if (step >= 6) {
    labels.push({ text: "Gang E (diabas)", x: 740, y: 180, at: [643, 170], color: "#f0a07a", weight: 700, badge: [700, 160] });
    labels.push({ text: "Inneslutning av lag B", x: 640, y: 340, at: [548, 291], color: C.teal, weight: 700, badge: [600, 300] });
  }
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Geologisk snitt som bygges opp i seks steg: lag A til D avsettes oppå hverandre, forkastningen F skjærer gjennom og forskyver lagene, og til slutt skjærer gangen E gjennom både lagene og forkastningen uten å være forskjøvet og inneholder bruddstykker av lag B"
        heading={heading}
        caption={RD_BILDETEKST}
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={RD_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg hendelse" />
          </StegRamme>
        }
        status={RD_STATUS[i]}
        labels={labels}
        keys={[
          { text: "Forkastning", color: C.low, kind: "dash" },
          { text: "Gang av diabas", color: "#7a3a2c", kind: "fill" },
        ]}
        notes={["Figur 1", "Skjematisk, uten målestokk"]}
        viewBox="0 0 900 480"
      >
        {({ scale }) => (
          <g className={motion.motionClass} data-figur="relativ-datering" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id={`${uid}-l`}>
                <path d={RD_LEFT} />
              </clipPath>
              <clipPath id={`${uid}-r`}>
                <path d={RD_RIGHT} />
              </clipPath>
            </defs>
            <rect x="50" y="40" width="800" height="340" rx="8" fill="#141d24" />
            {[0, 1].map((side) => (
              <g key={side} clipPath={step >= 5 ? `url(#${uid}-${side ? "r" : "l"})` : undefined}>
                <g transform={side && off ? `translate(0 ${n1(off)})` : undefined}>
                  {RD_LAG.map((l, j) => {
                    if (j > i) return null;
                    const g = j === i && step <= 4 ? grow : 1;
                    const top = l.bunn - (l.bunn - l.top) * g;
                    return (
                      <g key={l.navn}>
                        <rect x="50" y={n1(top)} width="800" height={n1(l.bunn - top + (side && j === 0 ? RD_SPRANG : 0))} fill={l.fill} />
                        {j === 1 ? (
                          <g fill="#9fd0d2" opacity="0.55" data-nocheck="">
                            {[90, 230, 370, 700, 790].map((x) => (
                              <ellipse key={x} cx={x + (side ? 20 : 0)} cy={n1(l.top + 52)} rx="7" ry="3" />
                            ))}
                          </g>
                        ) : null}
                      </g>
                    );
                  })}
                </g>
              </g>
            ))}
            {step >= 5 ? (
              <line x1={n1(faultX(90))} y1="90" x2="570" y2="380" stroke={C.low} strokeWidth="3" strokeDasharray="6 4" opacity={step === 5 ? grow : 1} />
            ) : null}
            {step >= 6 ? (
              <g opacity={grow}>
                <path d={RD_GANG} fill="#7a3a2c" />
                {RD_XENO.map((pts) => (
                  <polygon key={pts} points={pts} fill="#24414d" stroke={C.teal} strokeWidth="1.5" />
                ))}
              </g>
            ) : null}
            {/* rekkefølgen fra eldst til yngst */}
            <T x={50} y={410} scale={scale} size={14} fill={C.muted}>
              Eldst
            </T>
            <T x={850} y={410} scale={scale} size={14} fill={C.muted} anchor="end">
              Yngst
            </T>
            {RD_SEKVENS.map((s, j) => {
              const w = 118;
              const x = 50 + j * 136.4;
              const on = j <= i;
              const farge = RD_SEKV_FARGE[j];
              return (
                <g key={s.kort}>
                  <rect x={n1(x)} y={422} width={w} height={46} rx="8" fill={on ? "#1c2a33" : "#121a20"} stroke={on ? farge : C.dim} strokeWidth="2" />
                  {on ? (
                    <T x={n1(x + w / 2)} y={451} scale={scale} anchor="middle" size={16} weight={800} fill={farge}>
                      {small ? s.kort : s.lang}
                    </T>
                  ) : null}
                </g>
              );
            })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 3. Halveringstid: hvor mye morisotop er igjen?
 * ===================================================================== */

const HT_METODER = [
  { knapp: "Karbon-14", mor: "¹⁴C", datter: "¹⁴N", aar: 5730, tekst: "5730 år" },
  { knapp: "Kalium–argon", mor: "⁴⁰K", datter: "⁴⁰Ar", aar: 1.25e9, tekst: "ca. 1,25 milliarder år" },
  { knapp: "Uran–bly", mor: "²³⁸U", datter: "²⁰⁶Pb", aar: 4.5e9, tekst: "ca. 4,5 milliarder år" },
  { knapp: "Rubidium–strontium", mor: "⁸⁷Rb", datter: "⁸⁷Sr", aar: 49e9, tekst: "ca. 49 milliarder år" },
];
const JORD_AAR = 4.54e9;
const N_ATOM = 256;
/** Fast rekkefølge for hvilke atomer som brytes ned først (lik på server og klient). */
const HT_ORDEN: number[] = (() => {
  let a = 7;
  const r = () => {
    a = (a * 1103515245 + 12345) % 2147483648;
    return a / 2147483648;
  };
  const idx = Array.from({ length: N_ATOM }, (_, k) => k);
  for (let k = idx.length - 1; k > 0; k--) {
    const j = Math.floor(r() * (k + 1));
    [idx[k], idx[j]] = [idx[j], idx[k]];
  }
  const rank = new Array<number>(N_ATOM);
  idx.forEach((v, k) => (rank[v] = k));
  return rank;
})();

function aarTekst(aar: number) {
  if (aar >= 1e9) return `ca. ${tall(aar / 1e9, aar >= 1e10 ? 0 : 2).replace(/,?0+$/, "")} milliarder år`;
  if (aar >= 1e6) return `ca. ${tall(aar / 1e6, 0)} millioner år`;
  return `ca. ${tall(Math.round(aar / 10) * 10)} år`;
}
const brok = (n: number) => (n === 0 ? "alt" : `1/${2 ** n}`);

export function HalveringstidFigur({ heading = "Halveringstid: hvor mye er igjen?" }: { heading?: string }) {
  const [n, setN] = useState(0);
  const [step, setStep] = useState(1);
  const [wrapRef, small] = useFigurSmal();
  const m = HT_METODER[step - 1];
  const igjen = N_ATOM / 2 ** n;
  const aar = n * m.aar;
  const prosent = 100 / 2 ** n;
  const forGammel = aar > JORD_AAR;
  const status =
    m.aar === 5730 && n === 8
      ? "Etter 8 halveringstider (ca. 46 000 år) er bare ca. 0,4 % igjen. Derfor er grensen for C-14-datering ca. 50 000 år."
      : n === 0
      ? `Et nytt mineral med ${m.mor}: Bare morisotop, ingen datterisotop ennå. Halveringstiden for ${m.knapp.toLowerCase()} er ${m.tekst}.`
      : `Etter ${n} halveringstid${n > 1 ? "er" : ""} er ${brok(n)} av ${m.mor} igjen (${tall(prosent, prosent < 1 ? 1 : 0)} %). Med ${m.knapp.toLowerCase()} er det ${aarTekst(aar)}.` +
        (forGammel
          ? " Det er lenger enn jorda har eksistert (ca. 4,54 milliarder år). Halveringstiden må passe til alderen."
          : "");
  // rutenett og kurve: side om side på bred skjerm, over hverandre på smal
  const grid = small ? { x: 40, y: 30, cell: 25 } : { x: 40, y: 50, cell: 25 };
  const g = small ? { x: 70, y: 500, w: 370, h: 300 } : { x: 520, y: 70, w: 390, h: 300 };
  const gx = (k: number) => n1(g.x + (k / 8) * g.w);
  const gy = (f: number) => n1(g.y + g.h - f * g.h);
  const kurve = Array.from({ length: 81 }, (_, k) => `${gx(k / 10)} ${gy(2 ** -(k / 10))}`).join(" L");
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        title="Halveringstid: 256 atomer av en morisotop brytes ned til datterisotop. Etter hver halveringstid er halvparten av det som var igjen, brutt ned. Kurven til høyre viser andelen som er igjen"
        heading={heading}
        caption="Dra i skyveren og se hvordan mengden morisotop halveres for hver halveringstid. Mengden avtar stadig langsommere, så halveringstiden er ikke halve tiden det tar før alt er borte. Velg metode for å se hvor mange år det tilsvarer."
        toolbar={
          <>
            <StegRamme small={small}>
              <StegVelger labels={HT_METODER.map((x) => x.knapp)} step={step} onStep={setStep} label="Velg metode" />
            </StegRamme>
            <Skyver
              label="Halveringstider"
              min={0}
              max={8}
              step={1}
              value={n}
              onChange={setN}
              valueLabel={String(n)}
              valueText={`${n} ${n === 1 ? "halveringstid" : "halveringstider"}, ${brok(n)} igjen`}
            />
          </>
        }
        status={status}
        keys={[
          { text: `Morisotop ${m.mor}`, color: "#f0b27a", kind: "fill" },
          { text: `Datterisotop ${m.datter}`, color: C.teal, kind: "fill" },
        ]}
        notes={["Modell med 256 atomer", "Et lukket system: ingen isotoper inn eller ut"]}
        viewBox="0 0 960 470"
        narrowViewBox="0 0 480 860"
      >
        {({ scale }) => (
          <g data-figur="halveringstid" data-n={n} data-step={step}>
            <rect x={grid.x - 10} y={grid.y - 10} width={16 * grid.cell + 20} height={16 * grid.cell + 20} rx="10" fill="#141d24" />
            <g data-nocheck="">
              {HT_ORDEN.map((rank, k) => {
                const mor = rank < igjen;
                const cx = grid.x + (k % 16) * grid.cell + grid.cell / 2;
                const cy = grid.y + Math.floor(k / 16) * grid.cell + grid.cell / 2;
                return <circle key={k} cx={cx} cy={cy} r={mor ? 9 : 7} fill={mor ? "#f0b27a" : C.teal} opacity={mor ? 1 : 0.75} />;
              })}
            </g>
            {/* kurve */}
            <rect x={g.x} y={g.y} width={g.w} height={g.h} fill="#141d24" />
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <line key={f} x1={g.x} y1={gy(f)} x2={g.x + g.w} y2={gy(f)} stroke={C.dim} strokeWidth="1" />
            ))}
            <path d={`M${kurve}`} fill="none" stroke="#f0b27a" strokeWidth="3" />
            <line x1={gx(n)} y1={gy(2 ** -n)} x2={gx(n)} y2={g.y + g.h} stroke={C.fg} strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1={g.x} y1={gy(2 ** -n)} x2={gx(n)} y2={gy(2 ** -n)} stroke={C.fg} strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx={gx(n)} cy={gy(2 ** -n)} r="7" fill={C.fg} stroke={P.halo} strokeWidth="2" />
            <line x1={g.x} y1={g.y + g.h} x2={g.x + g.w} y2={g.y + g.h} stroke={C.muted} strokeWidth="2" />
            <line x1={g.x} y1={g.y} x2={g.x} y2={g.y + g.h} stroke={C.muted} strokeWidth="2" />
            {[0, 2, 4, 6, 8].map((k) => (
              <T key={k} x={gx(k)} y={g.y + g.h + 26} scale={scale} anchor="middle" size={14} fill={C.muted}>
                {k}
              </T>
            ))}
            <T x={g.x - 10} y={g.y + 6} scale={scale} anchor="end" size={14} fill={C.muted}>
              100 %
            </T>
            <T x={g.x - 10} y={gy(0.5) + 5} scale={scale} anchor="end" size={14} fill={C.muted}>
              50 %
            </T>
            <T x={g.x + g.w / 2} y={g.y + g.h + 54} scale={scale} anchor="middle" size={14} fill={C.muted}>
              Antall halveringstider
            </T>
            <T x={g.x + g.w} y={g.y - 14} scale={scale} anchor="end" size={16} weight={800} fill="#f0b27a">
              {`Igjen: ${n === 0 ? "alt" : brok(n)}`}
            </T>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 4. Ledefossiler: samme relative alder på to steder
 * ===================================================================== */

const LF_STEPS = ["To lagrekker", "Langlivet art", "Ledefossil", "Samme alder"];
const LF_STATUS = [
  "To blotninger langt fra hverandre. Bergartene er ulike, så det er ikke lett å se hvilke lag som hører sammen.",
  "Denne arten levde lenge og finnes i mange lag på begge steder. Den sier lite om hvilke lag som er like gamle.",
  "Denne trilobittarten levde bare i kort tid, men hadde stor utbredelse. Den finnes i ett lag på hvert sted.",
  "Lagene med ledefossilet har samme relative alder. Etter overlagringsprinsippet er lagene over yngre og lagene under eldre på begge steder.",
];
type LfLag = { h: number; fill: string; navn: string; skjell?: boolean; trilo?: boolean };
const LF_STED: { navn: string; x: number; lag: LfLag[] }[] = [
  {
    navn: "Sted 1",
    x: 130,
    lag: [
      { h: 70, fill: "#3a3830", navn: "Skifer", skjell: true },
      { h: 54, fill: "#24414d", navn: "Kalkstein", skjell: true, trilo: true },
      { h: 80, fill: "#3a3830", navn: "Skifer", skjell: true },
      { h: 70, fill: "#4a3b2c", navn: "Sandstein" },
    ],
  },
  {
    navn: "Sted 2",
    x: 590,
    lag: [
      { h: 110, fill: "#4a3b2c", navn: "Sandstein", skjell: true },
      { h: 40, fill: "#3a3830", navn: "Skifer", skjell: true, trilo: true },
      { h: 60, fill: "#24414d", navn: "Kalkstein", skjell: true },
      { h: 64, fill: "#3a3830", navn: "Skifer" },
    ],
  },
];
const LF_BUNN = 420;
const LF_W = 240;

function lagTopp(lag: LfLag[], j: number) {
  return LF_BUNN - lag.slice(0, j + 1).reduce((s, l) => s + l.h, 0);
}

function Trilobitt({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={on ? 1 : 0.35}>
      <ellipse cx="0" cy="0" rx="9" ry="12" fill={on ? "#f3d27a" : "#a89a73"} />
      <path d="M-3 -12 L-3 12 M3 -12 L3 12" stroke="#5a4a2a" strokeWidth="1.2" />
      <path d="M-8 -6 H8 M-8 0 H8 M-8 6 H8" stroke="#5a4a2a" strokeWidth="0.9" />
    </g>
  );
}
function Skjell({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <path
      d={`M${x - 8} ${y + 4} Q${x} ${y - 12} ${x + 8} ${y + 4} Z`}
      fill={on ? "#cfe3e5" : "#7f8f94"}
      opacity={on ? 1 : 0.4}
    />
  );
}

export function LedefossilFigur({ heading = "Ledefossiler: samme relative alder på to steder" }: { heading?: string }) {
  const [step, setStep] = useState(1);
  const [wrapRef, small] = useFigurSmal();
  const i = step - 1;
  const labels: Lab[] = [];
  const triloY = LF_STED.map((s) => {
    const j = s.lag.findIndex((l) => l.trilo);
    return lagTopp(s.lag, j) + s.lag[j].h / 2;
  });
  if (step === 2) {
    labels.push({ text: "Langlivet art: i mange lag", x: 480, y: 100, at: [LF_STED[0].x + 200, lagTopp(LF_STED[0].lag, 2) + 40], color: "#cfe3e5", anchor: "middle", badge: [400, 220] });
  }
  if (step >= 3) {
    labels.push({ text: "Ledefossil: trilobittart", x: 480, y: 100, at: [LF_STED[0].x + 120, n1(triloY[0])], color: "#f3d27a", anchor: "middle", badge: [420, n1(triloY[0])] });
  }
  // på smal skjerm tegnes ikke bergartsnavnene ved søylene, så de kommer med i nummerlisten
  if (small)
    LF_STED.forEach((st, si) =>
      st.lag.forEach((l, j) => {
        const top = lagTopp(st.lag, j);
        const cy = n1(top + l.h / 2);
        labels.push({
          text: `${st.navn}: ${l.navn.toLowerCase()}`,
          x: si === 0 ? st.x - 10 : st.x + LF_W + 10,
          y: cy,
          color: C.fg,
          badge: [si === 0 ? st.x - 34 : st.x + LF_W + 34, cy],
        });
      }),
    );
  if (step === 4) {
    labels.push({ text: "Yngre", x: 480, y: 170, color: C.fg, anchor: "middle", size: 15 });
    labels.push({ text: "Eldre", x: 480, y: 405, color: C.fg, anchor: "middle", size: 15 });
  }
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        title="To lagrekker på hvert sitt sted med ulike bergarter. En langlivet art finnes i mange lag, mens en kortlivet trilobittart finnes i bare ett lag på hvert sted. Lagene med trilobittarten har samme relative alder"
        heading={heading}
        caption="Et godt ledefossil levde kort tid og spredte seg over store områder. Trilobittene levde fra tidlig kambrium til slutten av perm, så et lag med trilobitter er fra paleozoikum. Skjematisk, uten målestokk."
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={LF_STEPS} step={step} onStep={setStep} label="Velg steg" />
          </StegRamme>
        }
        status={LF_STATUS[i]}
        labels={labels}
        keys={[
          { text: "Trilobittart (ledefossil)", color: "#f3d27a", kind: "fill" },
          { text: "Langlivet art", color: "#cfe3e5", kind: "fill" },
          { text: "Samme relative alder", color: "#f3d27a", kind: "dash" },
        ]}
        notes={["Skjematisk, uten målestokk"]}
        viewBox="0 0 960 470"
      >
        {({ scale }) => (
          <g data-figur="ledefossil" data-step={step}>
            {step === 4 ? (
              <path
                d={`M${LF_STED[0].x + LF_W} ${lagTopp(LF_STED[0].lag, 1)} L${LF_STED[1].x} ${lagTopp(LF_STED[1].lag, 1)} L${LF_STED[1].x} ${lagTopp(LF_STED[1].lag, 0)} L${LF_STED[0].x + LF_W} ${lagTopp(LF_STED[0].lag, 0)} Z`}
                fill="#f3d27a"
                opacity="0.16"
              />
            ) : null}
            {step === 4 ? (
              <>
                <line x1={LF_STED[0].x + LF_W} y1={lagTopp(LF_STED[0].lag, 1)} x2={LF_STED[1].x} y2={lagTopp(LF_STED[1].lag, 1)} stroke="#f3d27a" strokeWidth="2.5" strokeDasharray="7 5" />
                <line x1={LF_STED[0].x + LF_W} y1={lagTopp(LF_STED[0].lag, 0)} x2={LF_STED[1].x} y2={lagTopp(LF_STED[1].lag, 0)} stroke="#f3d27a" strokeWidth="2.5" strokeDasharray="7 5" />
              </>
            ) : null}
            {LF_STED.map((s, si) => (
              <g key={s.navn}>
                <T x={s.x + LF_W / 2} y={60} scale={scale} anchor="middle" size={18} weight={800}>
                  {s.navn}
                </T>
                {s.lag.map((l, j) => {
                  const top = lagTopp(s.lag, j);
                  const lys = step === 3 || step === 4 ? !!l.trilo : true;
                  return (
                    <g key={j} opacity={lys ? 1 : 0.55}>
                      <rect x={s.x} y={top} width={LF_W} height={l.h} fill={l.fill} />
                      {!small && l.h >= 40 ? (
                        <T x={si === 0 ? s.x - 10 : s.x + LF_W + 10} y={top + l.h / 2 + 5} scale={scale} anchor={si === 0 ? "end" : "start"} size={14} fill={C.muted}>
                          {l.navn}
                        </T>
                      ) : null}
                      {l.skjell
                        ? [0.2, 0.55, 0.85].map((f) => (
                            <Skjell key={f} x={n1(s.x + LF_W * f)} y={n1(top + l.h * (f === 0.55 ? 0.35 : 0.7))} on={step === 2} />
                          ))
                        : null}
                      {l.trilo ? <Trilobitt x={s.x + 120} y={n1(top + l.h / 2)} on={step >= 3} /> : null}
                    </g>
                  );
                })}
              </g>
            ))}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 5. Vinkeldiskordans: avsetning, skråstilling, erosjon og nye lag
 * ===================================================================== */

const VD_STEPS = ["Avsetning", "Skråstilling", "Erosjon", "Nye lag"];
const VD_STATUS = [
  "Lagene avsettes nesten vannrett, det eldste nederst (opprinnelig horisontalitet og overlagring).",
  "Lagene blir skråstilt og hevet. Da må noe ha skjedd med dem etter at de ble avsatt.",
  "Erosjon fjerner toppen av de skråstilte lagene. Den tiden blir ikke liggende igjen som lag.",
  "Nye lag avsettes vannrett oppå erosjonsflaten. Grensen er en vinkeldiskordans: her mangler det tid.",
];
const VD_FLATE = 250;
/** Gamle lag: nok bånd til å fylle snittet også etter skråstillingen. */
const VD_GAMLE = Array.from({ length: 20 }, (_, k) => ["#3a3830", "#24414d", "#4a3b2c", "#2b4637"][k % 4]);
const VD_NYE = ["#5a4a3a", "#3d5560", "#5e5240"];

export function VinkeldiskordansFigur({ heading = "Vinkeldiskordans: når det mangler tid i lagrekken" }: { heading?: string }) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(4, motion.playing && visible, 2600, 1800, 4);
  const { step, phase } = clock;
  const i = step - 1;
  const grow = motion.playing ? smooth(phase) : 1;
  const tilt = step === 1 ? 0 : step === 2 ? -18 * grow : -18;
  const uid = "vd";
  // toppen av de gamle lagene: åser etter skråstillingen, flat etter erosjonen
  const aaser = "M40 440 L40 200 C160 150 240 120 360 170 C460 210 540 130 660 150 C760 166 840 190 920 210 L920 440 Z";
  const flat = `M40 440 L40 ${VD_FLATE} L920 ${VD_FLATE} L920 440 Z`;
  const clip = step === 1 ? flat : step === 2 ? aaser : flat;
  const labels: Lab[] = [];
  if (step === 1) labels.push({ text: "Eldre lag, avsatt vannrett", x: 480, y: 200, at: [480, 300], color: C.sand, anchor: "middle", badge: [520, 290] });
  if (step === 2) labels.push({ text: "Lagene skråstilles og heves", x: 480, y: 100, at: [600, 200], color: C.warm, anchor: "middle", badge: [640, 190] });
  if (step === 3) labels.push({ text: "Erodert bort", x: 480, y: 120, at: [560, 200], color: C.muted, anchor: "middle", badge: [600, 205] });
  if (step === 4) {
    labels.push({ text: "Vinkeldiskordans: her mangler tid", x: 480, y: 290, at: [300, VD_FLATE], color: C.low, anchor: "middle", size: 16, weight: 800, badge: [260, VD_FLATE + 30] });
    labels.push({ text: "Yngre lag, avsatt vannrett", x: 480, y: 92, at: [700, 160], color: C.fg, anchor: "middle", badge: [740, 150] });
  }
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Vinkeldiskordans i fire steg: lag avsettes vannrett, blir skråstilt og hevet, toppen eroderes bort, og nye vannrette lag avsettes oppå erosjonsflaten"
        heading={heading}
        caption="En diskordans er en grense i lagrekken der det mangler tid. På norsk sokkel ligger lag fra kritt mange steder over skråstilte sandsteiner fra jura, og denne vinkeldiskordansen var viktig for å fange olje på felt som Statfjord og Gullfaks. Skjematisk snitt uten målestokk."
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={VD_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg steg" />
          </StegRamme>
        }
        status={VD_STATUS[i]}
        labels={labels}
        keys={[{ text: "Diskordans (erosjonsflate)", color: C.low, kind: "line" }]}
        notes={["Skjematisk, uten målestokk"]}
        viewBox="0 0 960 460"
      >
        {() => (
          <g className={motion.motionClass} data-figur="vinkeldiskordans" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id={`${uid}-c`}>
                <path d={clip} />
              </clipPath>
              <clipPath id={`${uid}-a`}>
                <path d={aaser} />
              </clipPath>
            </defs>
            <rect x="40" y="40" width="880" height="400" rx="8" fill="#141d24" />
            {step === 3 ? (
              <g clipPath={`url(#${uid}-a)`} opacity={0.4 + 0.6 * (1 - grow)} data-nocheck="">
                <g transform={`rotate(${n1(tilt)} 480 360)`}>
                  {VD_GAMLE.map((f, k) => (
                    <rect key={k} x="-300" y={n1(VD_FLATE + (k - 8) * 34 - 40)} width="1560" height="34" fill={f} />
                  ))}
                </g>
              </g>
            ) : null}
            <g clipPath={`url(#${uid}-c)`}>
              <g transform={tilt ? `rotate(${n1(tilt)} 480 360)` : undefined}>
                {VD_GAMLE.map((f, k) => (
                  <rect key={k} x="-300" y={n1(VD_FLATE + (k - 8) * 34 - 40)} width="1560" height="34" fill={f} />
                ))}
              </g>
            </g>
            {step === 4
              ? VD_NYE.map((f, k) => {
                  const h = 42;
                  const bunn = VD_FLATE - k * h;
                  // lagene bygges opp ett for ett mens animasjonen spiller
                  const f3 = motion.playing ? Math.max(0, Math.min(1, grow * 3 - k)) : 1;
                  return <rect key={k} x="40" y={n1(bunn - h * f3)} width="880" height={n1(h * f3)} fill={f} />;
                })
              : null}
            {step >= 3 ? <line x1="40" y1={VD_FLATE} x2="920" y2={VD_FLATE} stroke={C.low} strokeWidth="3.5" /> : null}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
