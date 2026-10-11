/**
 * Figurene i Geofag 1: Geologiske ressurser.
 *
 * Samme ramme som Isbreer, Norges geologi og Bergarter (IsbreFigur, StegVelger, isbre-kit):
 * nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten (src/lib/posts/geologiske-ressurser.md). Ordlyden for
 * takbergart og reservoar følger GeoBot1s faktasjekk 11.10.2026. Kartet bruker Natural Earth-kysten
 * fra norgesgeo-kart.ts. Punktene er bare steder kapitlet nevner, plassert på kjente tettsteder
 * eller gruver (rundet til 0,1°), ikke på kartlagte forekomstgrenser.
 */
import { useState, type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, pickStep, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";
import { RESSURSKART_LAND } from "./ressurskart-kyst";

type Pt = [number, number];
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

/* =====================================================================
 * 1. Petroleumssystemet: snitt gjennom en felle
 * ===================================================================== */

const PS_W = 960;
const PS_CREST = 470;
/** Hvelvingen (antiklinalen): løft i viewBox-enheter. */
const hump = (x: number, a = 96) => a * Math.exp(-(((x - PS_CREST) / 230) ** 2));
const curve = (base: number, a = 96, x0 = 0, x1 = PS_W) => {
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += 20) pts.push(`${x} ${n1(base - hump(x, a))}`);
  return pts;
};
const band = (top: number, bot: number, a = 96, aBot = a) =>
  `M${curve(top, a).join(" L")} L${curve(bot, aBot).reverse().join(" L")} Z`;

const PS_SEABED = 92;
const PS_CAP: [number, number] = [214, 252];
const PS_RES: [number, number] = [252, 312];
const PS_SOURCE: [number, number] = [430, 462];
/** Kontaktflatene er vannrette: gass over GOC, olje mellom, vann under OWC. */
const PS_GOC = 192;
const PS_OWC = 236;

const PS_STEPS = ["1 Kildebergart", "2 Modning", "3 Migrasjon", "4 Reservoar", "5 Takbergart og felle"];
const PS_STATUS = [
  "1. Kildebergart: mørk skifer med rester av plankton, for eksempel Draupneformasjonen fra sen jura.",
  "2. Modning: begravd kildebergart når oljevinduet, ca. 60–130 °C. I Nordsjøen er det ca. 2–4 km dyp. Ved ca. 130–180 °C dannes gass.",
  "3. Migrasjon: olje og gass er lettere enn vann og siver oppover gjennom porene i bergartene over.",
  "4. Reservoar: porøs og permeabel bergart, sandstein eller oppsprukket kritt. Hele laget er reservoaret.",
  "5. Takbergart og felle: tett skifer eller leirstein over en hvelving holder på petroleumen. Gass øverst, olje under, vann nederst.",
];

export function PetroleumSnittFigur({
  heading = "Petroleumssystemet: fra kildebergart til felle",
  caption,
  initialStep,
}: {
  heading?: string;
  caption?: ReactNode;
  initialStep?: number;
}) {
  const motion = useAnimationPlaying();
  const [ref, visible] = useInView<SVGSVGElement>();
  const [wrapRef, small] = useFigurSmal();
  const clock = useStepClock(5, motion.playing && visible, 3200, 1600, initialStep);
  const { step, phase } = clock;
  const on = (k: number) => step === k;
  const labels: Lab[] = [
    { text: "Gass", x: 300, y: 150, at: [470, 172], color: "#ffd38a", anchor: "end", badge: [420, 150] },
    { text: "Olje", x: 260, y: 200, at: [400, 222], color: "#e8a35a", anchor: "end", badge: [350, 196] },
    { text: "Vann", x: 160, y: 262, at: [250, 280], color: "#8fc4e0", anchor: "end", badge: [200, 262] },
    { text: "Takbergart: tett skifer eller leirstein", x: 600, y: 150, at: [610, 192], color: "#d9a0a0", anchor: "start", badge: [640, 172] },
    { text: "Reservoar: sandstein eller oppsprukket kritt", x: 612, y: 300, at: [700, 262], color: "#e6cf8f", anchor: "start", badge: [740, 290] },
    { text: "Kildebergart: skifer (f.eks. Draupneformasjonen)", x: 60, y: 506, at: [200, 448], color: "#c9b2e6", anchor: "start", badge: [150, 490] },
  ];
  if (on(2)) labels.push({ text: "Oljevinduet: ca. 60–130 °C", x: 930, y: 404, at: [900, 446], color: "#ffb36b", anchor: "end", badge: [920, 420] });
  if (on(3)) labels.push({ text: "Olje og gass stiger", x: 930, y: 372, at: [760, 360], color: "#ffd27a", anchor: "end", badge: [800, 380] });
  if (on(5)) labels.push({ text: "Felle: hvelving (antiklinal)", x: 540, y: 66, at: [520, 124], color: C.fg, anchor: "start", badge: [560, 70] });
  const keys: Key[] = [
    { text: "Gass", color: "#e9b44c", kind: "fill" },
    { text: "Olje", color: "#9a5a22", kind: "fill" },
    { text: "Vann i porene", color: "#3f7fa3", kind: "fill" },
    { text: "Takbergart", color: "#5b4a52", kind: "fill" },
    { text: "Kildebergart", color: "#3c3350", kind: "fill" },
  ];
  // migrasjonsdråper langs to baner fra kildebergarten opp i reservoaret
  const paths: Pt[][] = [
    [[260, 432], [300, 380], [340, 330], [372, 292]],
    [[700, 432], [660, 380], [610, 330], [580, 290]],
  ];
  const drops = on(3)
    ? paths.flatMap((p) =>
        [0, 0.33, 0.66].map((o) => {
          const t = motion.playing ? (phase + o) % 1 : o + 0.15;
          const k = Math.min(p.length - 2, Math.floor(t * (p.length - 1)));
          const f = t * (p.length - 1) - k;
          return [p[k][0] + (p[k + 1][0] - p[k][0]) * f, p[k][1] + (p[k + 1][1] - p[k][1]) * f] as Pt;
        }),
      )
    : [];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt under Nordsjøen: kildebergart på dypet, olje og gass som stiger opp til et porøst reservoar i en hvelving, og en tett takbergart over. I fellen ligger gass øverst, olje under og vann nederst."
        heading={heading}
        caption={
          caption ??
          "Fem forhold må være til stede: kildebergart, modning, migrasjon, reservoar og takbergart med felle. I fellen legger gassen seg øverst, oljen under og vannet nederst (Bryhni mfl., 2024). Oljevinduet er ca. 60–130 °C, i Nordsjøen ca. 2–4 km dyp. Skjematisk snitt, ikke et bestemt felt. Dybden er ikke i målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={PS_STEPS} step={step} onStep={pickStep(clock, motion)} label="Velg ledd i petroleumssystemet" />
          </StegRamme>
        }
        status={PS_STATUS[step - 1]}
        labels={labels}
        keys={keys}
        notes={["Skjematisk snitt, høyden er overdrevet", "Oljevinduet i Nordsjøen: ca. 2–4 km dyp"]}
        viewBox="0 0 960 540"
      >
        {({ d, m }) => (
          <g className={motion.motionClass} data-figur="petroleum" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <clipPath id="ps-res">
                <path d={band(PS_RES[0], PS_RES[1])} />
              </clipPath>
              <pattern id="ps-sand" width="12" height="10" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1" fill="#000" fillOpacity="0.22" />
                <circle cx="9" cy="7" r="1.1" fill="#000" fillOpacity="0.18" />
              </pattern>
            </defs>
            {/* hav */}
            <rect x="0" y="0" width="960" height={PS_SEABED} fill={d.url.water} />
            {/* overliggende lag */}
            <path d={`M0 ${PS_SEABED} H960 V540 H0 Z`} fill="#4b5560" />
            <path d={band(PS_SEABED + 50, PS_CAP[0], 50, 96)} fill="#56606a" data-nocheck="" />
            {/* takbergart */}
            <path d={band(PS_CAP[0], PS_CAP[1])} fill="#5b4a52" opacity={on(5) ? 1 : 0.85} />
            {/* reservoar: sandstein, med gass, olje og vann som ikke overlapper */}
            <path d={band(PS_RES[0], PS_RES[1])} fill="#c9b27a" />
            <g clipPath="url(#ps-res)">
              <rect x="0" y="0" width="960" height={PS_GOC} fill="#e9b44c" opacity={0.92} />
              <rect x="0" y={PS_GOC} width="960" height={PS_OWC - PS_GOC} fill="#9a5a22" opacity={0.95} />
              <rect x="0" y={PS_OWC} width="960" height={400} fill="#3f7fa3" opacity={0.75} />
              <rect x="0" y="0" width="960" height="540" fill="url(#ps-sand)" data-nocheck="" />
            </g>
            <path d={`M${curve(PS_RES[0]).join(" L")}`} stroke={on(4) ? "#ffe9a8" : "#7d6a45"} strokeWidth={on(4) ? 3 : 1.5} fill="none" data-nocheck="" />
            <path d={`M${curve(PS_RES[1]).join(" L")}`} stroke={on(4) ? "#ffe9a8" : "#7d6a45"} strokeWidth={on(4) ? 3 : 1.5} fill="none" data-nocheck="" />
            {/* lag mellom reservoar og kilde */}
            <path d={band(PS_RES[1], PS_SOURCE[0], 96, 40)} fill="#606a63" />
            {/* kildebergart */}
            <path d={band(PS_SOURCE[0], PS_SOURCE[1], 40)} fill="#3c3350" stroke={on(1) ? "#d9c2ff" : "none"} strokeWidth="3" />
            {/* oljevinduet som bånd på dypet */}
            {on(2) ? (
              <rect x="0" y="392" width="960" height="96" fill="#ff8a3d" opacity="0.22" data-nocheck="" />
            ) : null}
            {/* plattform og brønn */}
            <g data-nocheck="">
              <rect x="452" y="22" width="40" height="14" fill="#8a949c" rx="2" />
              <path d="M458 36 L452 92 M486 36 L492 92" stroke="#8a949c" strokeWidth="3" />
              <path d={`M472 36 L472 ${PS_GOC + 30}`} stroke={C.fg} strokeWidth="2" strokeDasharray="5 4" />
            </g>
            {/* migrasjon */}
            {paths.map((p, k) => (
              <path
                key={k}
                d={`M${p.map(([x, y]) => `${x} ${y}`).join(" L")}`}
                stroke="#ffd27a"
                strokeWidth={on(3) ? 3 : 1.4}
                strokeDasharray="6 6"
                fill="none"
                opacity={on(3) ? 1 : 0.4}
                markerEnd={on(3) ? `url(#${m.warm})` : undefined}
                data-nocheck=""
              />
            ))}
            {drops.map(([x, y], k) => (
              <circle key={k} cx={n1(x)} cy={n1(y)} r="5" fill="#9a5a22" stroke={P.halo} strokeWidth="1.2" data-nocheck="" />
            ))}
            {/* kontaktflatene */}
            <g clipPath="url(#ps-res)" data-nocheck="">
              <path d={`M0 ${PS_GOC} H960`} stroke="#fff3c4" strokeWidth="1.4" strokeDasharray="4 4" />
              <path d={`M0 ${PS_OWC} H960`} stroke="#c8e6f5" strokeWidth="1.4" strokeDasharray="4 4" />
            </g>
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

/* =====================================================================
 * 2. Norgeskart: forekomstene kapitlet nevner
 * ===================================================================== */

/** Lambert asimutal flatetro, 8° V 70° N, R = 1000 (samme som norgesgeo-kart.ts og ressurskart-kyst.ts), skalert til figuren. */
const MAP_S = 2.7;
const MAP_OX = 10;
const MAP_OY = -100;
function proj(lat: number, lon: number): Pt {
  const r = Math.PI / 180;
  const f = lat * r;
  const l = lon * r;
  const f0 = 70 * r;
  const l0 = -8 * r;
  const k = Math.sqrt(2 / (1 + Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l - l0)));
  const x = 1000 * k * Math.cos(f) * Math.sin(l - l0);
  const y = -1000 * k * (Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l - l0));
  return [n1((x - MAP_OX) * MAP_S), n1((y - MAP_OY) * MAP_S)];
}

type Kat = "metall" | "kobber" | "industri" | "stein" | "petro";
type Sted = { navn: string; tekst: string; lat: number; lon: number; kat: Kat; lx: number; ly: number; anchor: "start" | "end" };

/** Bare steder som står i kapittelteksten. Posisjon: tettsted eller gruve, rundet til 0,1°. */
const STEDER: Sted[] = [
  { navn: "Sokndal", tekst: "Sokndal: ilmenitt", lat: 58.3, lon: 6.4, kat: "metall", lx: 300, ly: 812, anchor: "end" },
  { navn: "Rana", tekst: "Rana: hematitt", lat: 66.3, lon: 14.1, kat: "metall", lx: 330, ly: 362, anchor: "end" },
  { navn: "Engebøfjellet", tekst: "Engebøfjellet: rutil og granat", lat: 61.5, lon: 5.4, kat: "metall", lx: 236, ly: 666, anchor: "end" },
  { navn: "Råna-feltet", tekst: "Råna-feltet: nikkel, nedlagt 2002", lat: 68.3, lon: 16.8, kat: "metall", lx: 520, ly: 262, anchor: "start" },
  { navn: "Nussir", tekst: "Nussir: kobber, under utbygging", lat: 70.5, lon: 24.3, kat: "kobber", lx: 520, ly: 108, anchor: "start" },
  { navn: "Sulitjelma", tekst: "Sulitjelma: kismalm", lat: 67.1, lon: 16.1, kat: "kobber", lx: 520, ly: 318, anchor: "start" },
  { navn: "Grong", tekst: "Grongfeltet: kismalm", lat: 64.5, lon: 12.3, kat: "kobber", lx: 520, ly: 462, anchor: "start" },
  { navn: "Løkken", tekst: "Løkken: kismalm", lat: 63.1, lon: 9.7, kat: "kobber", lx: 316, ly: 520, anchor: "end" },
  { navn: "Røros", tekst: "Røros: kismalm", lat: 62.6, lon: 11.4, kat: "kobber", lx: 520, ly: 546, anchor: "start" },
  { navn: "Folldal", tekst: "Folldal: kismalm", lat: 62.1, lon: 10.0, kat: "kobber", lx: 520, ly: 592, anchor: "start" },
  { navn: "Kongsberg", tekst: "Kongsberg: sølv", lat: 59.7, lon: 9.6, kat: "kobber", lx: 520, ly: 664, anchor: "start" },
  { navn: "Akselberg", tekst: "Akselberg (Brønnøy): kalkstein", lat: 65.5, lon: 12.2, kat: "industri", lx: 330, ly: 420, anchor: "end" },
  { navn: "Åheim", tekst: "Åheim: olivin", lat: 62.0, lon: 5.5, kat: "industri", lx: 236, ly: 606, anchor: "end" },
  { navn: "Stjernøya", tekst: "Stjernøya: nefelinsyenitt", lat: 70.3, lon: 22.6, kat: "industri", lx: 410, ly: 160, anchor: "end" },
  { navn: "Skaland", tekst: "Skaland (Senja): grafitt", lat: 69.4, lon: 17.3, kat: "industri", lx: 340, ly: 214, anchor: "end" },
  { navn: "Larvik", tekst: "Larvik: larvikitt", lat: 59.1, lon: 10.0, kat: "stein", lx: 520, ly: 756, anchor: "start" },
  { navn: "Fensfeltet", tekst: "Fensfeltet: sjeldne jordarter", lat: 59.3, lon: 9.3, kat: "stein", lx: 520, ly: 712, anchor: "start" },
];

const KAT_FARGE: Record<Kat, string> = {
  metall: "#e8a35a",
  kobber: "#e07a5f",
  industri: "#9fd0c8",
  stein: "#c9b2e6",
  petro: "#ffd27a",
};

const RK_STEPS = ["Alle", "Metaller", "Kobber, kis og sølv", "Industrimineraler", "Larvikitt og Fen", "Sokkelen"];
const RK_KATS: (Kat[] | null)[] = [null, ["metall"], ["kobber"], ["industri"], ["stein"], ["petro"]];
const RK_STATUS = [
  "Alle stedene kapitlet nevner. Velg en gruppe for å se dem for seg.",
  "Metaller: i dag ilmenitt i Sokndal, hematitt i Rana og rutil og granat i Engebøfjellet. Nikkelgruva i Råna-feltet ble lagt ned i 2002.",
  "Kobber: ingen gruver i drift per oktober 2026. Nussir er under utbygging. Kismalmene i Løkken, Folldal, Røros, Grong og Sulitjelma ble dannet på havbunnen i Iapetushavet. Sølvet på Kongsberg er hydrotermalt.",
  "Industrimineraler i drift: kalkstein på Akselberg, olivin i Åheim, nefelinsyenitt på Stjernøya og grafitt på Skaland.",
  "Larvikitt er Norges viktigste naturstein. I Fensfeltet ligger Europas største kjente forekomst av sjeldne jordarter.",
  "Petroleum: råolje og gass fra sokkelen. Kartet viser ikke enkeltfelt.",
];

export function RessurskartFigur({
  heading = "Hvor i Norge? Forekomstene i kapitlet",
  caption,
}: {
  heading?: string;
  caption?: ReactNode;
}) {
  const [wrapRef, small] = useFigurSmal();
  const [step, setStep] = useState(1);
  const kats = RK_KATS[step - 1];
  const shown = (k: Kat) => !kats || kats.includes(k);
  const pts = STEDER.map((s) => ({ ...s, p: proj(s.lat, s.lon) }));
  const labels: Lab[] = pts
    .filter((s) => shown(s.kat))
    .map((s) => ({ text: s.tekst, x: s.lx, y: s.ly, at: s.p, color: KAT_FARGE[s.kat], anchor: s.anchor, size: 15 }));
  if (shown("petro"))
    labels.push({ text: "Sokkelen: råolje og gass", x: 40, y: 760, color: KAT_FARGE.petro, anchor: "start", size: 15 });
  const keys: Key[] = [
    { text: "Metaller", color: KAT_FARGE.metall, kind: "fill" },
    { text: "Kobber, kismalm og sølv", color: KAT_FARGE.kobber, kind: "fill" },
    { text: "Industrimineraler", color: KAT_FARGE.industri, kind: "fill" },
    { text: "Naturstein og sjeldne jordarter", color: KAT_FARGE.stein, kind: "fill" },
  ];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        title="Norgeskart med forekomstene kapitlet nevner: metaller, kobber og kismalm, industrimineraler, larvikitt og sjeldne jordarter, og sokkelen"
        heading={heading}
        caption={
          caption ??
          "Bare steder kapitlet nevner, plassert ved tettstedet eller gruva. Kartet viser ikke hvor stor forekomsten er. Kystlinje: Natural Earth (public domain). Sokkelen er bare navngitt, ikke tegnet med felt."
        }
        toolbar={
          <StegRamme small={small}>
            <StegVelger labels={RK_STEPS} step={step} onStep={setStep} label="Velg type forekomst" />
          </StegRamme>
        }
        status={RK_STATUS[step - 1]}
        labels={labels}
        keys={keys}
        notes={["Lambert asimutal flatetro projeksjon", "Posisjoner rundet til 0,1°"]}
        viewBox="0 0 960 840"
        narrowViewBox="150 40 420 800"
      >
        {() => (
          <g data-figur="ressurskart" data-step={step} data-playing="no">
            <rect x="0" y="0" width="960" height="840" fill="#123247" />
            <path d={RESSURSKART_LAND} fill="#5f6a58" stroke="#b9c2a8" strokeWidth="1.4" strokeLinejoin="round" data-nocheck="" />
            {pts.map((s) => (
              <circle
                key={s.navn}
                cx={s.p[0]}
                cy={s.p[1]}
                r={shown(s.kat) ? 7 : 4}
                fill={KAT_FARGE[s.kat]}
                stroke={P.halo}
                strokeWidth="2"
                opacity={shown(s.kat) ? 1 : 0.35}
                data-nocheck=""
              />
            ))}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
