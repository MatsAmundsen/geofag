/**
 * Figurene i Geofag 1: Jordsystemene.
 *
 * Samme ramme som Isbreer, Norges geologi og Bergarter (IsbreFigur, StegVelger, isbre-kit):
 * nummermerker og liste på mobil, Start/Pause, steg, aria-live ved valg og redusert bevegelse.
 *
 * Faginnholdet følger kapittelteksten (src/lib/posts/jordsystemene.md): NASA (2011), Kump mfl. (2000),
 * Kelemen og Manning (2015) og USGS. Lagre og flukser i visningen «Lagre og flukser» er
 * IPCC AR6 WG1 figur 5.12 (lagre før industrialiseringen), faktasjekket av GeoBot1 11.10.2026.
 * Snittet er skjematisk og uten målestokk.
 */
import { type ReactNode } from "react";
import { useAnimationPlaying } from "./use-motion";
import { C, PlayPauseToggle } from "./svg-kit";
import { IsbreFigur, NARROW_FIGURE_PX, StegVelger, type Key, type Lab } from "./isbre-figur";
import { P, pickStep, useBoxWidth, useInView, useNarrow, useStepClock } from "./isbre-kit";

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

const line = (pts: Pt[]) => `M${pts.map(([x, y]) => `${n1(x)} ${n1(y)}`).join(" L")}`;

/** Punkt langs en polylinje, t fra 0 til 1 (etter lengde). */
function along(pts: Pt[], t: number): Pt {
  const seg: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(l);
    total += l;
  }
  let d = ((t % 1) + 1) % 1 * total;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i]) {
      const k = seg[i] ? d / seg[i] : 0;
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k,
      ];
    }
    d -= seg[i];
  }
  return pts[pts.length - 1];
}

/* =====================================================================
 * Karbonat–silikat-syklusen: den trege sløyfen
 * ===================================================================== */

/** Overflaten i snittet: vulkan til venstre, silikatfjell i midten, kyst og hav til høyre. */
const KS_SURF: Pt[] = [
  [0, 252], [70, 246], [104, 214], [138, 146], [150, 140], [162, 146], [196, 214], [232, 244],
  [272, 236], [312, 188], [350, 166], [392, 192], [432, 174], [472, 216], [512, 244], [560, 254],
  [592, 262], [622, 300], [650, 338], [700, 346], [960, 346],
];
/** Toppen av havbunnsplata, som synker under kontinentet. */
const KS_SLAB_TOP: Pt[] = [[960, 346], [690, 348], [640, 366], [560, 400], [380, 460], [200, 520], [140, 540]];
const KS_SLAB_BOT: Pt[] = [[960, 394], [700, 396], [660, 412], [580, 446], [400, 506], [262, 540]];

/** De fem leddene i sløyfen, som streker CO₂/karbon følger. */
const KS_PATH: Pt[][] = [
  // 1 vulkanen sender CO₂ opp i lufta
  [[150, 128], [176, 82], [230, 58], [300, 62]],
  // 2 regn med karbonsyre over fjellet
  [[352, 104], [356, 132], [360, 160]],
  // 3 elva fører ionene til havet
  [[474, 212], [512, 240], [560, 250], [600, 268]],
  // 4 skall av kalsiumkarbonat synker til havbunnen
  [[640, 286], [720, 300], [790, 320], [820, 340]],
  // 5 havbunnen synker, karbonatene varmes, CO₂ går opp i vulkanen
  [[880, 350], [690, 352], [640, 370], [560, 404], [380, 464], [236, 510], [196, 470], [162, 330], [152, 160]],
];

const KS_STEPS = ["1 CO₂ i lufta", "2 Regn løser berg", "3 Elva fører ioner", "4 Kalkstein", "5 Tilbake i vulkanen"];
const KS_STATUS = [
  "1. Vulkaner slipper ut CO₂. Stiger CO₂ i atmosfæren, stiger temperaturen.",
  "2. Regn med karbonsyre løser silikatberget og frisetter ioner. Varmere luft gir mer regn, og forvitringen går raskere når det er varmt.",
  "3. Elvene fører ionene (kalsium, magnesium, kalium og natrium) til havet.",
  "4. I havet dannes kalsiumkarbonat, ofte av organismer med skall. Karbonet lagres i kalkstein på havbunnen i millioner av år, og CO₂ fjernes fra lufta.",
  "5. Havbunnen med kalkstein synker ned i en subduksjonssone. Karbonatene varmes opp og løses delvis i vann fra platen, og CO₂ kommer tilbake til atmosfæren gjennom vulkaner.",
];

const KS_STEP_LABELS: Lab[][] = [
  [{ text: "CO₂ fra vulkanen", x: 250, y: 36, at: [200, 70], color: "#ffc59a", anchor: "start", badge: [214, 40] }],
  [{ text: "Regn med karbonsyre løser berget", x: 470, y: 112, at: [362, 150], color: C.rain, anchor: "start", badge: [410, 128] }],
  [{ text: "Elva fører Ca²⁺, Mg²⁺, K⁺ og Na⁺", x: 560, y: 206, at: [536, 250], color: "#8fd3e0", anchor: "start", badge: [540, 222] }],
  [{ text: "Skall av CaCO₃ synker", x: 700, y: 238, at: [760, 306], color: "#efe6c8", anchor: "start", badge: [740, 280] }],
  [{ text: "Karbonat varmes, CO₂ frigjøres", x: 250, y: 384, at: [236, 506], color: "#ffb38a", anchor: "start", badge: [280, 470] }],
];

/** Lagre og flukser: IPCC AR6 WG1 fig. 5.12 (lagre før industrialiseringen), GeoBot1 11.10.2026. */
const KS_STORE_LABELS: Lab[] = [
  { text: "Vegetasjon: ca. 450 GtC", x: 250, y: 300, at: [300, 212], color: "#9fd08a", anchor: "start", badge: [290, 270] },
  { text: "Jordsmonn: ca. 1700 GtC", x: 250, y: 330, at: [420, 200], color: "#d6b98a", anchor: "start", badge: [440, 236] },
  { text: "Fossile ressurser: ca. 18 600 GtC", x: 40, y: 430, at: [120, 300], color: "#c9c2b4", anchor: "start", badge: [60, 330] },
  { text: "Overflatehav: ca. 900 GtC", x: 940, y: 240, at: [820, 274], color: "#8fd3e0", anchor: "end", badge: [880, 280] },
  { text: "Dyphav: ca. 37 000 GtC", x: 940, y: 330, at: [820, 330], color: "#7fb2d8", anchor: "end", badge: [800, 316] },
  { text: "Havutveksling: ca. 55–80 GtC/år hver vei", x: 940, y: 200, at: [700, 262], color: "#bfe4ee", anchor: "end", badge: [690, 230] },
  { text: "Atmosfæren: +5,1 GtC/år (2010–2019)", x: 480, y: 36, at: [420, 60], color: "#ffc59a", anchor: "start", badge: [430, 40] },
  { text: "Vulkaner: ca. 0,1 GtC/år", x: 20, y: 56, at: [146, 120], color: "#ffb38a", anchor: "start", badge: [100, 100] },
];

const KS_KEYS: Key[] = [
  { text: "Den trege sløyfen", color: "#ffd27a", kind: "dash" },
  { text: "Silikatberg", color: "#7b8476", kind: "fill" },
  { text: "Kalkstein (CaCO₃)", color: "#e6dcbf", kind: "fill" },
  { text: "Havbunnsplate", color: "#3d4a52", kind: "fill" },
  { text: "Magma", color: "#e0703a", kind: "fill" },
];

export function KarbonatSilikatFigur({
  heading = "Karbonat–silikat-syklusen: den trege sløyfen",
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
  const clock = useStepClock(6, motion.playing && visible, 3400, 1600, initialStep);
  const { step, phase } = clock;
  const stores = step === 6;
  const i = Math.min(step, 5) - 1;
  const labels: Lab[] = stores
    ? KS_STORE_LABELS
    : [
        ...KS_STEP_LABELS[i],
        { text: "Vulkan", x: 40, y: 206, at: [120, 196], color: C.fg, anchor: "start", size: 15, badge: [60, 190] },
        { text: "Fjell av silikatberg", x: 470, y: 150, at: [430, 182], color: "#c9cfc2", anchor: "start", size: 15, badge: [470, 170] },
        { text: "Hav", x: 930, y: 290, color: "#bfe4ee", anchor: "end", size: 15 },
        { text: "Kalkstein på havbunnen", x: 940, y: 334, at: [820, 344], color: "#efe6c8", anchor: "end", size: 15, badge: [810, 318] },
        { text: "Havbunnen synker (subduksjon)", x: 620, y: 478, at: [520, 418], color: "#b9c6cf", anchor: "start", size: 15, badge: [560, 470] },
      ];
  const dots = motion.playing && !stores ? [0, 0.33, 0.66].map((o) => along(KS_PATH[i], phase * 0.999 + o)) : [];
  const status = stores
    ? "Lagre og flukser i det raske og det trege kretsløpet (IPCC AR6). Den trege sløyfen flytter lite karbon per år, men styrer klimaet over millioner av år."
    : KS_STATUS[i];
  return (
    <div ref={wrapRef}>
      <IsbreFigur
        svgRef={ref}
        title="Snitt fra en vulkan over et silikatfjell og en elv ut til havet, der kalkstein avsettes på havbunnen og føres ned i en subduksjonssone. Karbonet går i en treg sløyfe: CO₂ fra vulkanen, regn som løser berg, elv som fører ioner, kalkstein på havbunnen, og CO₂ tilbake gjennom vulkanen."
        heading={heading}
        caption={
          caption ??
          "Den trege sløyfen: regn løser berg, elvene fører ioner til havet, karbon lagres i kalkstein, og vulkaner gir CO₂ tilbake. Karbon bruker 100–200 millioner år gjennom sløyfen (NASA, 2011), og det tar noen hundre tusen år før den er i balanse igjen etter en endring (Kump mfl., 2000). Visningen «Lagre og flukser» bruker IPCC (2021), AR6 WG1 figur 5.12. Snittet er skjematisk og uten målestokk."
        }
        playing={motion.playing}
        action={<PlayPauseToggle isPlaying={motion.playing} onToggle={motion.toggle} />}
        toolbar={
          <StegRamme small={small}>
            <StegVelger
              labels={[...KS_STEPS, "Lagre og flukser"]}
              step={step}
              onStep={pickStep(clock, motion)}
              label="Velg ledd i sløyfen"
            />
          </StegRamme>
        }
        status={status}
        labels={labels}
        keys={KS_KEYS}
        notes={[
          "Skjematisk snitt, uten målestokk",
          "Vulkaner: 0,13–0,44 Gt CO₂/år (USGS) ≈ 0,04–0,12 GtC/år (× 12/44)",
        ]}
        remark="Termostaten: mer CO₂ → varmere → mer regn og raskere forvitring → mer karbon i kalkstein → mindre CO₂. Responsen demper endringen. Det er en negativ tilbakekobling."
        viewBox="0 0 960 540"
        narrowViewBox="100 40 740 490"
      >
        {({ d, m }) => (
          <g className={motion.motionClass} data-figur="karbonat-silikat" data-step={step} data-playing={motion.playing ? "yes" : "no"}>
            <defs>
              <linearGradient id="ks-carb" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0" stopColor="#e6dcbf" />
                <stop offset="0.55" stopColor="#e6dcbf" />
                <stop offset="1" stopColor="#e6dcbf" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="960" height="540" fill={d.url.sky} />
            {/* hav og mantel */}
            <rect x="570" y="262" width="390" height="100" fill={d.url.water} />
            <path d={`${line([[262, 540], [400, 506], [580, 446], [660, 412], [700, 396], [960, 394], [960, 540]])} Z`} fill={d.url.astheno} />
            {/* havbunnsplata */}
            <path d={`${line([...KS_SLAB_TOP, ...[...KS_SLAB_BOT].reverse()])} Z`} fill="#3d4a52" />
            {/* kalkstein på plata, blekner der den varmes opp */}
            <path d={line(KS_SLAB_TOP.slice(0, 5))} stroke="url(#ks-carb)" strokeWidth="9" fill="none" data-nocheck="" />
            {/* kontinentet av silikatberg */}
            <path
              d={`${line([...KS_SURF.slice(0, 18), [640, 366], [560, 400], [380, 460], [200, 520], [140, 540], [0, 540]])} Z`}
              fill="#6d7468"
            />
            <path
              d={`${line([...KS_SURF.slice(0, 18), [640, 366], [560, 400], [380, 460], [200, 520], [140, 540], [0, 540]])} Z`}
              fill={d.url.strata}
              opacity="0.6"
              data-nocheck=""
            />
            {/* vegetasjon og jordsmonn som tynt lag på land */}
            <path d={line(KS_SURF.slice(6, 16))} stroke="#55664b" strokeWidth="5" fill="none" data-nocheck="" />
            {/* magma opp til vulkanen */}
            <path d="M232 508 C206 470 180 400 164 300 C158 230 154 180 150 146" stroke="#e0703a" strokeWidth="8" fill="none" strokeLinecap="round" data-nocheck="" />
            {/* sky med regn */}
            <g data-nocheck="">
              <ellipse cx="340" cy="86" rx="62" ry="22" fill="#9fb0bb" />
              <ellipse cx="380" cy="78" rx="40" ry="18" fill="#b6c4cc" />
              {[316, 336, 356, 376, 396].map((x, k) => (
                <path key={x} d={`M${x} ${110 + (k % 2) * 6} l-5 ${step === 2 ? 30 : 16}`} stroke={C.rain} strokeWidth="2" opacity={step === 2 || stores ? 1 : 0.5} />
              ))}
            </g>
            {/* elva langs overflaten */}
            <path d={line(KS_PATH[2])} stroke="#4aa8c9" strokeWidth={step === 3 ? 6 : 4} fill="none" strokeLinecap="round" data-nocheck="" />
            {/* skall som synker */}
            <g data-nocheck="" opacity={step === 4 || stores ? 1 : 0.55}>
              {[[680, 286], [720, 304], [758, 292], [800, 316], [842, 300], [880, 322], [910, 298]].map(([x, y]) => (
                <circle key={`${x}`} cx={x} cy={y} r="3.4" fill="#efe6c8" stroke="#8b8167" strokeWidth="0.8" />
              ))}
            </g>
            {/* CO₂-bobler ved plata og over vulkanen */}
            <g data-nocheck="" opacity={step === 5 || step === 1 || stores ? 1 : 0.5}>
              {[[244, 500], [256, 486], [228, 488]].map(([x, y]) => (
                <circle key={`b${x}`} cx={x} cy={y} r="4" fill="none" stroke="#ffd7b0" strokeWidth="1.4" />
              ))}
              <path d="M150 132 C140 112 160 100 150 80" stroke="#c9b8a6" strokeWidth="10" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            </g>
            {/* sløyfen: alle ledd svakt, aktivt ledd tydelig */}
            {KS_PATH.map((p, k) => (
              <path
                key={k}
                d={line(p)}
                stroke="#ffd27a"
                strokeWidth={k === i && !stores ? 3.2 : 1.6}
                strokeDasharray="7 6"
                fill="none"
                opacity={k === i && !stores ? 1 : 0.45}
                markerEnd={k === i && !stores ? `url(#${m.warm})` : undefined}
                data-nocheck=""
              />
            ))}
            {dots.map(([x, y], k) => (
              <circle key={k} cx={n1(x)} cy={n1(y)} r="5" fill="#ffd27a" stroke={P.halo} strokeWidth="1.2" data-nocheck="" />
            ))}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}
