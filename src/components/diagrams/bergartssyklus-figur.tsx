/**
 * Bergartssyklusen i et snitt gjennom jordskorpa (erstatter BergartssyklusSnittFigur og
 * FolgBergartFigur i widgeten RockCycle).
 *
 * Fast plassering: overflaten øverst (dagbergart, forvitring og erosjon, sediment i bassenget),
 * sedimentær bergart under bassenget, dypbergart i jordskorpa, metamorf bergart dypt i skorpa og
 * magma dypest. Hver prosess er én pil med navnet ved pilen. Pilene krysser ikke hverandre.
 * Hovedløpet er heltrukket; snarveien (omdanning av magmatisk bergart) er stiplet og dempet.
 *
 * Alle tekster bygger på kapitlet (src/lib/posts/bergarter.md). Kildesetningen står ved hver
 * stasjon og pil (`kilde`) og vises i forklaringen. Utelatt (⚑):
 * - Heving: står ikke i teksten. Derfor er det ingen pil som fører dype bergarter opp til overflaten,
 *   og forvitring er tegnet bare fra bergart som ligger i overflaten (dagbergart).
 * - Gangbergart (i sprekker) er nevnt i forklaringen til størkning, men ikke tegnet som egen stasjon.
 * - «Smelter en bergart» gjelder alle bergarter; som pil er bare smelting av metamorf bergart tegnet.
 * - Ingen dybder, temperaturer eller tall: teksten gir ingen.
 */
import { useEffect, useLayoutEffect, useState, type KeyboardEvent, type RefObject } from "react";
import { IsbreFigur, StegVelger, type Key } from "./isbre-figur";
import { smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { TidslinjeKontroller } from "./prosess-figur";
import { useTidslinje } from "./prosess-kit";
import { SYKLUS_TEKST } from "./syklus-tekst";

type Pt = [number, number];
type StId = "magma" | "dag" | "dyp" | "sediment" | "sedb" | "meta";
type KantId = "ute" | "inni" | "forvitring" | "forsteining" | "omdanning" | "smelting" | "omdanningMagm";

type Stasjon = {
  id: StId;
  navn: string[];
  /** Kort navn til skjermleser og forklaring. */
  tittel: string;
  x: number;
  y: number;
  w: number;
  h: number;
  farge: string;
  forklaring: string;
  kilde: string;
};

type Kant = {
  id: KantId;
  fra: StId;
  til: StId;
  /** Kvadratisk kurve: start, kontrollpunkt, slutt (slutt = pilspiss). */
  p: [Pt, Pt, Pt];
  etikett: string[];
  /** Etikettens første linje (x, y) og forankring. */
  lab: Pt;
  anchor: "start" | "middle" | "end";
  snarvei?: boolean;
  tittel: string;
  forklaring: string;
  kilde: string;
};

const FARGE = {
  magma: "#e8743b",
  magmatisk: "#d0704f",
  sediment: "#e2c27a",
  sedb: "#c9a35c",
  meta: "#8fa3cf",
  pil: "#f2e6c9",
  snarvei: "#a9b4bc",
  boks: "#1c2830",
  tekst: "#f3efe6",
};

const STASJONER: Stasjon[] = [
  {
    id: "dag",
    navn: ["Magmatisk bergart", "dagbergart"],
    tittel: "Magmatisk bergart på overflaten (dagbergart)",
    x: 112,
    y: 120,
    w: 128,
    h: 48,
    farge: FARGE.magmatisk,
    forklaring: "Magmatisk bergart dannes når magma størkner. Størkner magmaen på overflaten, blir det en dagbergart.",
    kilde:
      "«Magmatisk bergart dannes når magma størkner. Det skjer i jordskorpa (dypbergart), i sprekker (gangbergart) eller på overflaten (dagbergart).»",
  },
  {
    id: "sediment",
    navn: ["Sediment"],
    tittel: "Sediment",
    x: 318,
    y: 196,
    w: 108,
    h: 34,
    farge: FARGE.sediment,
    forklaring: "Sediment er løst materiale, løse korn som ennå ikke er bergart.",
    kilde: "«Uten løse korn blir det ikke sediment, og uten sediment ingen ny sedimentær bergart.»",
  },
  {
    id: "sedb",
    navn: ["Sedimentær", "bergart"],
    tittel: "Sedimentær bergart",
    x: 318,
    y: 300,
    w: 124,
    h: 48,
    farge: FARGE.sedb,
    forklaring: "Sedimentær bergart er forsteinet sediment. Kjennetegn er lagdeling, korn, fossiler og kitting.",
    kilde: "«Sedimentær bergart: Forsteinet sediment. Kjennetegn er lagdeling, korn, fossiler og kitting.»",
  },
  {
    id: "meta",
    navn: ["Metamorf", "bergart"],
    tittel: "Metamorf bergart",
    x: 300,
    y: 440,
    w: 124,
    h: 48,
    farge: FARGE.meta,
    forklaring:
      "En metamorf bergart har vært sedimentær eller magmatisk. Høyt trykk, høy temperatur og/eller kjemisk påvirkning har omdannet den i fast tilstand, uten at den smelter.",
    kilde:
      "«En metamorf bergart har vært sedimentær eller magmatisk. Høyt trykk, høy temperatur og/eller kjemisk påvirkning omdanner den til en ny bergart i fast tilstand, uten at den smelter.»",
  },
  {
    id: "dyp",
    navn: ["Magmatisk bergart", "dypbergart"],
    tittel: "Magmatisk bergart i jordskorpa (dypbergart)",
    x: 122,
    y: 400,
    w: 128,
    h: 48,
    farge: FARGE.magmatisk,
    forklaring: "Størkner magmaen i jordskorpa, blir det en dypbergart. Den kjøles langsomt, og bergarten blir grovkornet.",
    kilde:
      "«Når magma kjøles langsomt, vanligvis på dypet, vokser krystallene, og bergarten blir grovkornet.»",
  },
  {
    id: "magma",
    navn: ["Magma"],
    tittel: "Magma",
    x: 175,
    y: 604,
    w: 200,
    h: 84,
    farge: FARGE.magma,
    forklaring: "Smelter en bergart, blir den til magma. Magma ligger dypest i snittet.",
    kilde: "«Smelter en bergart, blir den til magma, og størkning er veien fra magma til magmatisk bergart.»",
  },
];

const KANTER: Kant[] = [
  {
    id: "ute",
    fra: "magma",
    til: "dag",
    p: [[92, 576], [18, 360], [60, 150]],
    etikett: ["Størkning", "på overflaten"],
    lab: [64, 236],
    anchor: "start",
    tittel: "Størkning på overflaten",
    forklaring: "Størkning er veien fra magma til magmatisk bergart. Når magmaen størkner på overflaten, blir det en dagbergart. Den kjøles raskt og blir finkornet.",
    kilde:
      "«Når magma kjøles raskt, ved eller nær overflaten, blir krystallene svært små, og bergarten blir finkornet.»",
  },
  {
    id: "inni",
    fra: "magma",
    til: "dyp",
    p: [[138, 560], [146, 492], [130, 430]],
    etikett: ["Størkning", "i jordskorpa"],
    lab: [152, 498],
    anchor: "start",
    tittel: "Størkning i jordskorpa",
    forklaring: "Størkning er veien fra magma til magmatisk bergart. I jordskorpa blir det en dypbergart, i sprekker en gangbergart.",
    kilde: "«Det skjer i jordskorpa (dypbergart), i sprekker (gangbergart) eller på overflaten (dagbergart).»",
  },
  {
    id: "forvitring",
    fra: "dag",
    til: "sediment",
    p: [[178, 110], [252, 58], [298, 175]],
    etikett: ["Forvitring og erosjon"],
    lab: [236, 54],
    anchor: "middle",
    tittel: "Forvitring og erosjon",
    forklaring:
      "Forvitring og erosjon er overflateleddet, fra fast berg mot sediment. Forvitring bryter ned berget på stedet. Erosjon sliter og flytter materialet med vann, is eller tyngdekraft.",
    kilde: "«Forvitring og erosjon er overflateleddet, fra fast berg mot sediment.»",
  },
  {
    id: "forsteining",
    fra: "sediment",
    til: "sedb",
    p: [[318, 215], [318, 244], [318, 272]],
    etikett: ["Forsteining", "(diagenese)"],
    lab: [308, 238],
    anchor: "end",
    tittel: "Forsteining (diagenese)",
    forklaring:
      "Forsteining er veien fra sediment til sedimentær bergart. Diagenese er prosessene som gjør løst sediment til fast sedimentær bergart.",
    kilde: "«Forsteining er veien fra sediment til sedimentær bergart.»",
  },
  {
    id: "omdanning",
    fra: "sedb",
    til: "meta",
    p: [[316, 326], [312, 370], [304, 412]],
    etikett: ["Omdanning"],
    lab: [296, 374],
    anchor: "end",
    tittel: "Omdanning",
    forklaring: "Omdanning i fast tilstand er veien til metamorf bergart. Bergarten smelter ikke.",
    kilde: "«Omdanning i fast tilstand er veien til metamorf bergart.»",
  },
  {
    id: "smelting",
    fra: "meta",
    til: "magma",
    p: [[292, 466], [294, 540], [256, 568]],
    etikett: ["Smelting"],
    lab: [302, 530],
    anchor: "start",
    tittel: "Smelting",
    forklaring: "Smelter en bergart, blir den til magma.",
    kilde: "«Smelter en bergart, blir den til magma …»",
  },
  {
    id: "omdanningMagm",
    fra: "dyp",
    til: "meta",
    p: [[188, 408], [212, 422], [234, 434]],
    etikett: ["Omdanning"],
    lab: [194, 454],
    anchor: "middle",
    snarvei: true,
    tittel: "Snarvei: omdanning av magmatisk bergart",
    forklaring:
      "Snarvei uten sediment: magmatisk bergart kan omdannes direkte. Grønnstein er gabbro eller basalt som er omdannet. Da har den magmatiske bergarten flyttet seg til metamorf stasjon.",
    kilde:
      "«Grønnstein er gabbro eller basalt som er omdannet, med kloritt, epidot og amfibol (NGU, u.å.-e). Da har den magmatiske bergarten flyttet seg til metamorf stasjon.»",
  },
];

type Rute = {
  navn: string;
  start: StId;
  kanter: KantId[];
  /** Mulige veier (stiplet), ikke tatt. */
  mulig?: KantId[];
  /** Én statussetning per steg (minst én), fra teksten. */
  steg: string[];
};

const RUTER: Rute[] = [
  {
    navn: "Hovedløpet",
    start: "magma",
    kanter: ["ute", "forvitring", "forsteining", "omdanning", "smelting"],
    steg: [
      "Størkning: magma størkner på overflaten til magmatisk bergart (dagbergart).",
      "Forvitring og erosjon er overflateleddet, fra fast berg mot sediment.",
      "Forsteining er veien fra sediment til sedimentær bergart.",
      "Omdanning i fast tilstand er veien til metamorf bergart.",
      "Smelter en bergart, blir den til magma. Ingen bergart må innom alle stasjonene.",
    ],
  },
  {
    navn: "Larvikitt",
    start: "magma",
    kanter: ["inni"],
    steg: [
      "Larvikitt er en dypbergart. Den har vært dypbergart siden den størknet for cirka 295–290 millioner år siden. Veiene videre er ikke tatt.",
    ],
  },
  {
    navn: "Rombeporfyr",
    start: "magma",
    kanter: ["ute"],
    steg: [
      "Rombeporfyr er en dagbergart. Rombene viser at smelten ikke var ferdig krystallisert da magmaen nådde overflaten.",
    ],
  },
  {
    navn: "Grønnstein",
    start: "magma",
    kanter: ["inni", "omdanningMagm"],
    steg: [
      "Gabbro er dypbergarten: magma som har størknet i jordskorpa.",
      "Grønnstein er gabbro eller basalt som er omdannet. Den magmatiske bergarten har flyttet seg til metamorf stasjon, uten å gå via sediment.",
    ],
  },
  {
    navn: "Kalkstein",
    start: "sediment",
    kanter: ["forsteining"],
    mulig: ["omdanning"],
    steg: [
      "Kalkslam blir til kalkstein. De fleste kalksteiner i Norge er omdannet til marmor (stiplet), men i Oslo-området kan kalksteinen være bare svakt omdannet.",
    ],
  },
  {
    navn: "Fyllitt",
    start: "sediment",
    kanter: ["forsteining", "omdanning"],
    steg: [
      "Leire blir til leirstein.",
      "Fyllitt dannes ved lavgrads regional metamorfose. Protolitten er leirskifer eller leirstein.",
    ],
  },
  {
    navn: "Gneis",
    start: "meta",
    kanter: [],
    mulig: ["omdanning", "omdanningMagm"],
    steg: [
      "Gneis har opprinnelig vært magmatisk eller sedimentær bergart (stiplet). Gneis i grunnfjellet i Sør-Norge ble dannet for mer enn 900 millioner år siden og er fortsatt metamorf.",
    ],
  },
];

/** Kilder til rutene (statussetningene over), til forklaringsfeltet. */
const RUTE_KILDE: Record<string, string> = {
  Hovedløpet:
    "«Forvitring og erosjon er overflateleddet, fra fast berg mot sediment. Forsteining er veien fra sediment til sedimentær bergart. Omdanning i fast tilstand er veien til metamorf bergart. Smelter en bergart, blir den til magma, og størkning er veien fra magma til magmatisk bergart.»",
  Larvikitt:
    "«Larvikitt har vært dypbergart siden den størknet for cirka 295–290 millioner år siden (NGU, u.å.-i).»",
  Rombeporfyr:
    "«Rombeporfyr er en dagbergart … Rombene viser at smelten ikke var ferdig krystallisert da magmaen nådde overflaten.»",
  Grønnstein:
    "«Grønnstein er gabbro eller basalt som er omdannet … Da har den magmatiske bergarten flyttet seg til metamorf stasjon.»",
  Kalkstein:
    "«Da blir sand til sandstein, leire til leirstein og kalkslam til kalkstein.» og «De fleste kalksteiner i Norge er omdannet til marmor.»",
  Fyllitt:
    "«Fyllitt … dannes ved lavgrads regional metamorfose … Protolitten er leirskifer eller leirstein.»",
  Gneis:
    "«Den har opprinnelig vært magmatisk eller sedimentær bergart.» og «Gneis i grunnfjellet i Sør-Norge ble dannet for mer enn 900 millioner år siden og er fortsatt metamorf (NGU, u.å.-d).»",
};

const stasjon = (id: StId) => STASJONER.find((s) => s.id === id)!;
const kant = (id: KantId) => KANTER.find((k) => k.id === id)!;
const dAv = ([a, c, b]: [Pt, Pt, Pt]) => `M${a[0]} ${a[1]} Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`;
const punkt = ([a, c, b]: [Pt, Pt, Pt], t: number): Pt => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];

type Fokus = { type: "stasjon"; id: StId } | { type: "kant"; id: KantId } | null;

/** Skriftstørrelse i viewBox-enheter: minst 12 px også ved 390 px (figuren er ca. 340 px bred). */
const FS = 15.5;
const FS_LITEN = 14.5;

function tastKlikk(fn: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };
}

const useMaalEffekt = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Bredden på tegneflatens beholder (forelderen til SVG-en). Samme element som plassholderens
 * @container, så figur og plassholder bytter til bred layout ved samme bredde (560 px).
 */
function useFlateBredde(svgRef: RefObject<SVGSVGElement | null>) {
  const [bredde, setBredde] = useState(0);
  useMaalEffekt(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const maal = () => setBredde(Math.round(el.getBoundingClientRect().width));
    maal();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(maal);
    ro.observe(el);
    return () => ro.disconnect();
  }, [svgRef]);
  return bredde;
}

export function BergartssyklusFigur({ heading = SYKLUS_TEKST.heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const bredde = useFlateBredde(ref);
  const [ruteNr, setRuteNr] = useState(0);
  const [fokus, setFokus] = useState<Fokus>(null);
  const rute = RUTER[ruteNr];
  const antall = Math.max(1, rute.kanter.length);
  const tl = useTidslinje({ antall, synlig: visible, faseMs: 2600, holdMs: 1500, element: ref });
  // bred figur: samme snitt, men kvadratisk utsnitt så den ikke blir for høy på store skjermer
  const bred = bredde >= 560;
  const vb = bred ? "-140 0 680 680" : "0 0 400 680";

  const ruteKanter = new Set<KantId>(rute.kanter);
  const muligKanter = new Set<KantId>(rute.mulig ?? []);
  const fase = Math.min(tl.fase, antall);
  const aktivKant = rute.kanter[fase - 1];
  // stasjoner på veien til og med aktivt steg
  const besokt = new Set<StId>([rute.start]);
  rute.kanter.slice(0, fase).forEach((id) => besokt.add(kant(id).til));
  const fokusKanter = new Set<KantId>();
  const fokusStasjoner = new Set<StId>();
  if (fokus?.type === "stasjon") {
    fokusStasjoner.add(fokus.id);
    for (const k of KANTER) if (k.fra === fokus.id || k.til === fokus.id) fokusKanter.add(k.id);
  } else if (fokus?.type === "kant") {
    const k = kant(fokus.id);
    fokusKanter.add(k.id);
    fokusStasjoner.add(k.fra).add(k.til);
  }
  const fremhevStasjon = (id: StId) => (fokus ? fokusStasjoner.has(id) : besokt.has(id));
  const fremhevKant = (id: KantId) => (fokus ? fokusKanter.has(id) : ruteKanter.has(id));

  const velgRute = (n: number) =>
    tl.valg(() => {
      setFokus(null);
      setRuteNr(n);
    });
  // en valgt vei vises ferdig (alle steg); «Start» spiller den fra begynnelsen
  const settP = tl.settP;
  const spiller = tl.playing;
  useEffect(() => {
    if (!spiller) settP(antall);
    // bare når veien byttes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruteNr]);
  const velgFokus = (f: Fokus) =>
    tl.valg(() => setFokus((gammel) => (gammel && f && gammel.type === f.type && gammel.id === f.id ? null : f)));

  // prikken som følger veien
  const lokal = tl.playing ? smooth(tl.lokal) : 1;
  const prikk = !fokus && aktivKant ? punkt(kant(aktivKant).p, lokal) : null;

  const fokusTekst =
    fokus?.type === "stasjon"
      ? { tittel: stasjon(fokus.id).tittel, tekst: stasjon(fokus.id).forklaring, kilde: stasjon(fokus.id).kilde }
      : fokus?.type === "kant"
        ? { tittel: kant(fokus.id).tittel, tekst: kant(fokus.id).forklaring, kilde: kant(fokus.id).kilde }
        : null;
  const medNavn = (navn: string, tekst: string) => (tekst.startsWith(navn) ? tekst : `${navn}: ${tekst}`);
  const status = fokusTekst
    ? medNavn(fokusTekst.tittel, fokusTekst.tekst)
    : medNavn(rute.navn, rute.steg[Math.min(fase, rute.steg.length) - 1]);
  const kilde = fokusTekst ? fokusTekst.kilde : RUTE_KILDE[rute.navn];

  const keys: Key[] = [
    { text: "Hovedløp", color: FARGE.pil, kind: "line" },
    { text: "Snarvei", color: FARGE.snarvei, kind: "dash" },
    { text: "Mulig vei, ikke tatt", color: FARGE.pil, kind: "dash", off: !rute.mulig || !!fokus },
  ];

  return (
    <div>
      <IsbreFigur
        svgRef={ref}
        title={SYKLUS_TEKST.title}
        heading={heading}
        caption={caption ?? SYKLUS_TEKST.caption}
        playing={tl.livePlaying}
        action={<PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name={heading} />}
        toolbar={
          <div className="flex w-full flex-col gap-2 [&_button]:text-sm">
            <StegVelger labels={RUTER.map((r) => r.navn)} step={ruteNr + 1} onStep={(n) => velgRute(n - 1)} label="Følg en vei" />
            {rute.kanter.length > 1 ? (
              <TidslinjeKontroller tl={tl} faser={rute.kanter.map((id) => kant(id).tittel)} />
            ) : null}
          </div>
        }
        status={status}
        keys={keys}
        notes={["Skjematisk, uten målestokk", "Trykk på en stasjon eller pil for forklaring"]}
        viewBox={vb}
        forceNarrow={!bred}
        below={
          <div className="mt-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm leading-snug text-foreground">
            <p className="font-medium">Fra kapitlet</p>
            <p className="text-muted-foreground">{kilde}</p>
          </div>
        }
      >
        {({ m }) => (
          <g data-figur="bergartssyklus" data-step={fase} data-p={tl.p.toFixed(2)} data-tilstand={`${rute.navn}|${fokus ? fokus.id : "-"}`}>
            <defs>
              <linearGradient id={`${m.fg}-skorpe`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6a5644" />
                <stop offset="0.6" stopColor="#4b3530" />
                <stop offset="1" stopColor="#3a2224" />
              </linearGradient>
              <marker id={`${m.fg}-pil`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 1 L11 6 L0 11 z" fill={FARGE.pil} />
              </marker>
              <marker id={`${m.fg}-snar`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 1 L11 6 L0 11 z" fill={FARGE.snarvei} />
              </marker>
            </defs>
            {/* snitt: luft, skorpe, basseng */}
            <rect x={-150} y={0} width={700} height={150} fill="#22384a" />
            <rect x={-150} y={150} width={700} height={530} fill={`url(#${m.fg}-skorpe)`} />
            <path d="M206 150 Q232 176 270 177 L550 177 L550 150 Z" fill="#2f6f93" />
            <path d="M226 162 Q244 178 270 178 L550 178 L550 214 L262 214 Q236 200 226 162 Z" fill="#a88a55" opacity="0.85" />
            <path d="M8 150 L34 128 L46 132 L60 150 Z" fill="#5a3d33" stroke="#2b1d18" strokeWidth="1.5" />
            <line x1={-150} y1={150} x2={550} y2={150} stroke="#e8eef2" strokeOpacity="0.6" strokeWidth="1.5" />
            <text x={392} y={142} textAnchor="end" fontSize={FS_LITEN} fill="#cfdbe3">
              Overflaten
            </text>
            {/* dybde uten tall */}
            <g aria-hidden="true">
              <line x1={10} y1={164} x2={10} y2={656} stroke="#e8eef2" strokeOpacity="0.5" strokeWidth="2" markerEnd={`url(#${m.fg}-pil)`} />
              <text x={0} y={0} transform="translate(26 650) rotate(-90)" fontSize={FS_LITEN} fill="#e8eef2" fillOpacity="0.75">
                dypere i jordskorpa
              </text>
            </g>
            {/* magmakammer */}
            <ellipse cx={175} cy={604} rx={100} ry={42} fill={FARGE.magma} opacity={fremhevStasjon("magma") ? 0.95 : 0.4} />

            {/* piler (snarvei først, så den ligger under) */}
            {[...KANTER].sort((a, b) => Number(!!b.snarvei) - Number(!!a.snarvei)).map((k) => {
              const paa = fremhevKant(k.id);
              const mulig = !fokus && muligKanter.has(k.id);
              const valgt = fokus?.type === "kant" && fokus.id === k.id;
              const farge = k.snarvei ? FARGE.snarvei : FARGE.pil;
              const opasitet = paa ? 1 : mulig ? 0.85 : k.snarvei ? 0.45 : 0.35;
              const bredde = valgt ? 6 : k.snarvei ? 3 : paa ? 5 : 3.5;
              return (
                <g
                  key={k.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={valgt}
                  aria-label={k.tittel}
                  className="group cursor-pointer outline-none"
                  onClick={() => velgFokus({ type: "kant", id: k.id })}
                  onKeyDown={tastKlikk(() => velgFokus({ type: "kant", id: k.id }))}
                  data-kant={k.id}
                  opacity={opasitet}
                >
                  <path d={dAv(k.p)} stroke="transparent" strokeWidth="22" fill="none" />
                  <path
                    d={dAv(k.p)}
                    fill="none"
                    stroke={farge}
                    strokeWidth={bredde}
                    strokeDasharray={k.snarvei || mulig ? "7 6" : undefined}
                    strokeLinecap="round"
                    markerEnd={`url(#${m.fg}-${k.snarvei ? "snar" : "pil"})`}
                  />
                  {k.etikett.map((linje, i) => (
                    <text
                      key={linje}
                      x={k.lab[0]}
                      y={k.lab[1] + i * (FS + 2)}
                      textAnchor={k.anchor}
                      fontSize={k.snarvei ? FS_LITEN : FS}
                      fontWeight={k.snarvei ? 600 : 700}
                      fontStyle={k.snarvei ? "italic" : undefined}
                      fill={k.snarvei ? "#d6dde2" : "#fff6df"}
                      stroke="#14202a"
                      strokeWidth="3.5"
                      paintOrder="stroke"
                    >
                      {linje}
                    </text>
                  ))}
                  <path d={dAv(k.p)} fill="none" stroke="#7fd0ff" strokeWidth="2" className="opacity-0 group-focus-visible:opacity-100" />
                </g>
              );
            })}

            {/* stasjoner */}
            {STASJONER.map((s) => {
              const paa = fremhevStasjon(s.id);
              const valgt = fokus?.type === "stasjon" && fokus.id === s.id;
              const erMagma = s.id === "magma";
              return (
                <g
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={valgt}
                  aria-label={s.tittel}
                  className="group cursor-pointer outline-none"
                  onClick={() => velgFokus({ type: "stasjon", id: s.id })}
                  onKeyDown={tastKlikk(() => velgFokus({ type: "stasjon", id: s.id }))}
                  data-stasjon={s.id}
                  opacity={paa ? 1 : 0.5}
                >
                  {erMagma ? (
                    <ellipse cx={s.x} cy={s.y} rx={s.w / 2} ry={s.h / 2} fill="transparent" stroke={valgt ? "#fff" : "none"} strokeWidth="3" />
                  ) : (
                    <>
                      <rect x={s.x - s.w / 2} y={s.y - s.h / 2} width={s.w} height={s.h} rx="8" fill={FARGE.boks} stroke={s.farge} strokeWidth={valgt ? 4 : 2.5} />
                      <rect x={s.x - s.w / 2} y={s.y - s.h / 2} width="7" height={s.h} rx="3" fill={s.farge} />
                    </>
                  )}
                  {s.navn.map((linje, i) => (
                    <text
                      key={linje}
                      x={s.x + (erMagma ? 0 : 3)}
                      y={s.y + (s.navn.length === 1 ? FS * 0.36 : i === 0 ? -3 : FS + 1)}
                      textAnchor="middle"
                      fontSize={i === 0 ? FS : FS_LITEN}
                      fontWeight={i === 0 ? 700 : 500}
                      fill={erMagma ? "#2a1208" : FARGE.tekst}
                    >
                      {linje}
                    </text>
                  ))}
                  {erMagma ? (
                    <ellipse cx={s.x} cy={s.y} rx={s.w / 2 + 4} ry={s.h / 2 + 4} fill="none" stroke="#7fd0ff" strokeWidth="2.5" className="opacity-0 group-focus-visible:opacity-100" />
                  ) : (
                    <rect x={s.x - s.w / 2 - 4} y={s.y - s.h / 2 - 4} width={s.w + 8} height={s.h + 8} rx="10" fill="none" stroke="#7fd0ff" strokeWidth="2.5" className="opacity-0 group-focus-visible:opacity-100" />
                  )}
                </g>
              );
            })}

            {prikk ? (
              <circle cx={prikk[0]} cy={prikk[1]} r="8" fill="#fff6df" stroke="#14202a" strokeWidth="2.5" data-nocheck="" pointerEvents="none" />
            ) : null}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
