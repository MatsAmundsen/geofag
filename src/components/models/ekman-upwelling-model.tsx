/**
 * EkmanUpwellingModel: tre faner som følger havstrommer.md.
 * 1 Ekmanspiralen sett ovenfra (l. 62–64): overflaten 45° (Ekmans enkle teori), hvert lag litt saktere og
 *   litt mer til høyre (venstre i sør), ekmantransporten 90° til høyre (venstre i sør). Ingen gradtall på lagene.
 * 2 Oppvelling og nedvelling i et snitt sett fra sør (l. 98, 110). Åpnes først. Vind langs kysten vises med
 *   ⊙ (blåser mot deg) eller ⊗ (blåser bort fra deg).
 * 3 Havvirvel og geostrofisk strøm i et vest–øst-snitt sett fra sør (l. 72, 76, 82–90).
 * Ingen formler og ingen tall utover teksten. Fane 1 og 3 bruker felles avspilling (useTidslinje), og bare
 * fanen som vises, er montert, så det går aldri mer enn én tidslinje her.
 */
import { useId, useState, type ReactNode } from "react";
import { Faner } from "@/components/diagrams/isbre-figur";
import { TidslinjeKontroller } from "@/components/diagrams/prosess-figur";
import { tidslinjeVerdi, useTidslinje } from "@/components/diagrams/prosess-kit";
import { clamp, lerp, useBoxWidth, useInView, useNarrow } from "@/components/diagrams/isbre-kit";
import { PlayPauseToggle } from "@/components/diagrams/svg-kit";
import { EKMAN_BILDER, EKMAN_FASER, EKMAN_VINKLER, ekmanStatus } from "@/components/diagrams/hav-ekman-felles";
import { ModelFrame } from "./model-chrome";

const C = {
  hav: "#14405a",
  havDyp: "#0a2333",
  luft: "#1a2c3a",
  land: "#5f6e45",
  landKant: "#384329",
  tekst: "#e8eef2",
  dempet: "#a9b8c2",
  vind: "#e8eef2",
  lag: "#6fd0c4",
  netto: "#f2c94c",
  kald: "#8ec5e8",
  trykk: "#8ec5e8",
  coriolis: "#d6dde2",
  golf: "#f0a35e",
  kanari: "#8ec5e8",
  halo: "#0f171c",
};

const KILDE = "text-muted-foreground";

/**
 * Modellpanelet er smalere enn figurene (rundt 620–800 px på bred skjerm), så det bytter oppsett ved 640 px
 * panelbredde. Da blir minste skrift i bred tegning (16 i viewBox 900) minst 11,4 px.
 */
const MODELL_SMAL_PX = 640;
function useFigurSmal(): [ReturnType<typeof useBoxWidth<HTMLDivElement>>[0], boolean] {
  const [ref, width] = useBoxWidth<HTMLDivElement>();
  const smallWindow = useNarrow();
  return [ref, width > 0 ? width < MODELL_SMAL_PX : smallWindow];
}

/* ---------- små byggeklosser ---------- */

function Piler({ id }: { id: string }) {
  const farger: [string, string][] = [
    ["vind", C.vind],
    ["lag", C.lag],
    ["netto", C.netto],
    ["kald", C.kald],
    ["coriolis", C.coriolis],
  ];
  return (
    <defs>
      {farger.map(([n, f]) => (
        <marker key={n} id={`${id}-${n}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={f} />
        </marker>
      ))}
    </defs>
  );
}

function Pil({ x1, y1, x2, y2, farge, marker, b = 4, opacity = 1 }: { x1: number; y1: number; x2: number; y2: number; farge: string; marker: string; b?: number; opacity?: number }) {
  if (opacity <= 0.01 || Math.hypot(x2 - x1, y2 - y1) < 2) return null;
  return (
    <g opacity={opacity < 0.99 ? opacity : undefined}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.halo} strokeOpacity="0.5" strokeWidth={b + 3} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={farge} strokeWidth={b} strokeLinecap="round" markerEnd={`url(#${marker})`} />
    </g>
  );
}

/** ⊙: kommer mot deg. ⊗: går bort fra deg. */
function Retning({ x, y, mot, farge, r = 18 }: { x: number; y: number; mot: boolean; farge: string; r?: number }) {
  const k = r * 0.6;
  return (
    <g aria-hidden="true">
      <circle cx={x} cy={y} r={r} fill={C.halo} fillOpacity="0.45" stroke={farge} strokeWidth="3" />
      {mot ? <circle cx={x} cy={y} r={r * 0.28} fill={farge} /> : <path d={`M${x - k} ${y - k}L${x + k} ${y + k}M${x + k} ${y - k}L${x - k} ${y + k}`} stroke={farge} strokeWidth="3" />}
    </g>
  );
}

function T({ x, y, children, farge = C.tekst, size = 16, anchor = "start", vekt = 600, opacity = 1 }: { x: number; y: number; children: ReactNode; farge?: string; size?: number; anchor?: "start" | "middle" | "end"; vekt?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <text x={x} y={y} fill={farge} fontSize={size} fontWeight={vekt} textAnchor={anchor} paintOrder="stroke" stroke={C.halo} strokeWidth="4" strokeLinejoin="round" opacity={opacity < 0.99 ? opacity : undefined}>
      {children}
    </text>
  );
}

function Skilt({ x, y, n, opacity = 1 }: { x: number; y: number; n: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity < 0.99 ? opacity : undefined} aria-hidden="true" data-badge={n}>
      {/* samme minstemål som skiltene i lokale-kit: ca. 23 px i diameter og sifre på minst 12 px ved 320 */}
      <circle cx={x} cy={y} r="17" fill="#1e3a4a" stroke={C.tekst} strokeWidth="1.5" />
      <text x={x} y={y + 6} fill={C.tekst} fontSize="17" fontWeight="700" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/** Nummerert forklaring under tegningen på smal skjerm (HTML, lesbar ved 320 px). */
function Forklaring({ punkter }: { punkter: { tekst: string; farge: string; vis?: boolean }[] }) {
  return (
    <ol aria-label="Forklaring til figuren" className="mt-3 space-y-1.5 text-sm">
      {punkter.map((p, i) => (
        <li key={i} className="flex items-start gap-2" style={{ visibility: p.vis === false ? "hidden" : undefined }}>
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-foreground/60 bg-[#1e3a4a] text-xs font-bold text-foreground">{i + 1}</span>
          <span style={{ color: p.farge }}>{p.tekst}</span>
        </li>
      ))}
    </ol>
  );
}

function Valg<T extends string>({ navn, verdi, valg, onVelg }: { navn: string; verdi: T; valg: [T, string][]; onVelg: (v: T) => void }) {
  return (
    <div role="group" aria-label={navn} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-medium text-muted-foreground">{navn}</span>
      {valg.map(([v, tekst]) => (
        <button
          key={v}
          type="button"
          aria-pressed={verdi === v}
          onClick={() => onVelg(v)}
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold motion-reduce:transition-none ${
            verdi === v ? "border-primary bg-primary text-primary-foreground" : "border-border/80 bg-muted/60 text-foreground hover:bg-muted"
          }`}
        >
          {tekst}
        </button>
      ))}
    </div>
  );
}

function Status({ children }: { children: ReactNode }) {
  return (
    <p aria-live="polite" className="min-h-[7.5rem] text-sm leading-relaxed text-foreground min-[420px]:min-h-[6.25rem] sm:min-h-[4.5rem] lg:min-h-[3rem]">
      {children}
    </p>
  );
}

/* ---------- fane 1: ekmanspiralen ---------- */


function SpiralFane() {
  const uid = useId().replace(/:/g, "");
  const [boksRef, smal] = useFigurSmal();
  const [svgRef, synlig] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall: EKMAN_FASER.length, synlig, element: svgRef });
  const [nord, setNord] = useState(true);
  const s = tidslinjeVerdi(EKMAN_BILDER, tl.p);
  const side = nord ? "høyre" : "venstre";
  const sgn = nord ? 1 : -1;

  const W = smal ? 360 : 900;
  const H = smal ? 360 : 440;
  const ox = smal ? 180 : 420;
  const oy = smal ? 210 : 260;
  const L0 = smal ? 90 : 146;
  const tips = EKMAN_VINKLER.map((a, k) => {
    const r = (sgn * a * Math.PI) / 180;
    const l = L0 * 0.8 ** k;
    return [ox + l * Math.sin(r), oy - l * Math.cos(r)] as [number, number];
  });
  const lagSynlig = (k: number) => (k === 0 ? s.flate : clamp(s.lag * (EKMAN_VINKLER.length - 1) - (k - 1)));
  const spiral = tips
    .filter((_, k) => lagSynlig(k) > 0.5)
    .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" L");
  const vindTopp = oy - L0 * 1.15 * s.vind;
  const nettoX = ox + sgn * L0 * 0.95 * s.netto;

  const status = ekmanStatus(side)[tl.fase - 1];

  const forklaring = [
    { tekst: "Vinden", farge: C.vind, vis: s.vind > 0.3 },
    { tekst: "Overflaten: 45° (Ekmans enkle teori)", farge: C.lag, vis: s.flate > 0.3 },
    { tekst: `Hvert lag lenger ned: litt saktere og litt mer til ${side}`, farge: C.lag, vis: s.lag > 0.3 },
    { tekst: `Ekmantransporten: 90° til ${side} for vinden`, farge: C.netto, vis: s.netto > 0.3 },
  ];
  const [fx, fy] = tips[0];
  const [lx, ly] = tips[3];

  return (
    <div ref={boksRef} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Valg navn="Halvkule" verdi={nord ? "nord" : "sor"} valg={[["nord", "Nordlig"], ["sor", "Sørlig"]]} onVelg={(v) => tl.valg(() => setNord(v === "nord"))} />
        <PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name="Ekmanspiralen" />
      </div>
      <TidslinjeKontroller tl={tl} faser={EKMAN_FASER} />
      <Status>{status}</Status>
      <p className="text-xs text-muted-foreground">Sett ovenfra, nord opp. {nord ? "Nordlig" : "Sørlig"} halvkule.</p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-[10px]"
        role="img"
        aria-label={`Ekmanspiralen sett ovenfra på den ${nord ? "nordlige" : "sørlige"} halvkulen. Vinden blåser mot nord. Overflaten går 45 grader til ${side}, lagene under blir kortere og dreier mer til ${side}, og ekmantransporten går 90 grader til ${side} for vinden.`}
        data-figur="ekman-spiral"
        data-step={tl.fase}
      >
        <Piler id={uid} />
        <rect width={W} height={H} fill={C.hav} rx="10" />
        <circle cx={ox} cy={oy} r={L0 * 1.05} fill="none" stroke="#2e5a72" strokeDasharray="4 6" />
        <Pil x1={ox} y1={oy} x2={ox} y2={vindTopp} farge={C.vind} marker={`${uid}-vind`} b={5} opacity={s.vind > 0.02 ? 1 : 0} />
        {tips.map(([x, y], k) => {
          const v = lagSynlig(k);
          return <Pil key={k} x1={ox} y1={oy} x2={lerp(ox, x, v)} y2={lerp(oy, y, v)} farge={C.lag} marker={`${uid}-lag`} b={Math.max(2, 4.5 - k * 0.5)} opacity={v > 0.02 ? (k === 0 ? 1 : 0.9) : 0} />;
        })}
        {spiral.includes("L") ? <path d={`M${spiral}`} fill="none" stroke={C.lag} strokeWidth="2" strokeDasharray="5 5" opacity="0.8" /> : null}
        <Pil x1={ox} y1={oy} x2={nettoX} y2={oy} farge={C.netto} marker={`${uid}-netto`} b={6} opacity={s.netto > 0.02 ? 1 : 0} />
        {smal ? (
          <>
            <Skilt x={ox - sgn * 30} y={oy - L0 * 0.6} n={1} opacity={s.vind} />
            <Skilt x={fx + sgn * 26} y={fy - 18} n={2} opacity={s.flate} />
            <Skilt x={lx + sgn * 26} y={ly + 22} n={3} opacity={s.lag} />
            <Skilt x={ox + sgn * (L0 * 0.95 + 36)} y={oy} n={4} opacity={s.netto} />
          </>
        ) : (
          <>
            <T x={ox + 12} y={oy - L0 * 1.15 + 14} farge={C.vind} opacity={s.vind}>vind</T>
            <T x={fx + sgn * 14} y={fy - 12} farge={C.lag} anchor={nord ? "start" : "end"} opacity={s.flate}>overflaten: 45° (Ekmans enkle teori)</T>
            <T x={ox - sgn * 30} y={oy + L0 * 0.75} farge={C.lag} anchor={nord ? "end" : "start"} opacity={s.lag}>hvert lag lenger ned:</T>
            <T x={ox - sgn * 30} y={oy + L0 * 0.75 + 25} farge={C.lag} anchor={nord ? "end" : "start"} vekt={400} opacity={s.lag}>{`litt saktere og litt mer til ${side}`}</T>
            <T x={ox + sgn * (L0 * 0.95 + 16)} y={oy + 6} farge={C.netto} anchor={nord ? "start" : "end"} opacity={s.netto}>ekmantransporten:</T>
            <T x={ox + sgn * (L0 * 0.95 + 16)} y={oy + 31} farge={C.netto} anchor={nord ? "start" : "end"} vekt={400} opacity={s.netto}>{`90° til ${side} for vinden`}</T>
          </>
        )}
      </svg>
      {smal ? <Forklaring punkter={forklaring} /> : null}
      <p className="text-xs text-muted-foreground">
        Skjematisk.
      </p>
    </div>
  );
}

/* ---------- fane 2: oppvelling og nedvelling ---------- */

function KystFane() {
  const uid = useId().replace(/:/g, "");
  const [boksRef, smal] = useFigurSmal();
  const [vindFra, setVindFra] = useState<"nord" | "sor">("nord");
  // Sett fra sør: vind fra nord blåser mot sør, altså mot deg (⊙). 90° til høyre for den er vest.
  const motDeg = vindFra === "nord";
  // Bare vestkyst med land i øst, slik skissen Geo godkjente. Ekmantransporten går mot vest (ut fra kysten)
  // når vinden kommer fra nord: oppvelling. Vind fra sør gir transport mot kysten: nedvelling.
  const opp = vindFra === "nord";

  const W = smal ? 360 : 900;
  const H = smal ? 330 : 400;
  const luft = smal ? 70 : 90;
  const landB = smal ? 80 : 170;
  const landX0 = W - landB; // land-blokkens venstre kant
  const kystX = W - landB; // kystlinja i overflaten
  const ut = -1; // retning ut fra kysten (mot vest)
  const havY = luft;
  const bunn = H;
  // grensen mot dypere vann: løftet mot kysten ved oppvelling, senket ved nedvelling
  const fjern = 0;
  const gFjern = havY + (H - havY) * 0.48;
  const gKyst = opp ? havY + 34 : bunn - 22;
  const gMidt = (fjern + kystX) / 2;
  const grense = `M${fjern} ${gFjern} C ${gMidt} ${gFjern + (opp ? 4 : -4)}, ${kystX + ut * (W * 0.12)} ${lerp(gFjern, gKyst, 0.4)}, ${kystX + ut * 6} ${gKyst}`;
  const skraning = `M${kystX} ${havY} L${W} ${havY} L${W} ${bunn} L${kystX - (smal ? 40 : 70)} ${bunn} C ${kystX - 30} ${bunn - 60}, ${kystX - 8} ${havY + 80}, ${kystX} ${havY} Z`;
  const pilY = havY + (smal ? 22 : 28);
  const pilNaer = kystX + ut * 26;
  const pilFjern = kystX + ut * (smal ? 230 : 560);
  const [px1, px2] = opp ? [pilNaer, pilFjern] : [pilFjern, pilNaer];
  const vindX = kystX + ut * (smal ? 46 : 70);
  const vertX = [kystX + ut * (smal ? 54 : 100), kystX + ut * (smal ? 82 : 146)];
  const vNed = bunn - 16;
  const vOpp = havY + 46;

  const vindTekst = motDeg ? "blåser mot deg" : "blåser bort fra deg";
  const vindEtikett = `vind fra ${vindFra === "nord" ? "nord" : "sør"}, ${vindTekst}`;
  const ekmanTekst = opp ? "ekmantransport ut fra kysten" : "ekmantransport mot kysten";
  const vertTekst = opp ? "kaldere vann nedenfra" : "vannet hoper seg opp og presses nedover";
  const tAnchor = "end";

  return (
    <div ref={boksRef} className="space-y-3">
      <Valg navn="Vind" verdi={vindFra} valg={[["nord", "Vind fra nord"], ["sor", "Vind fra sør"]]} onVelg={setVindFra} />
      <div aria-live="polite" className="min-h-[7rem] rounded-xl border border-border bg-background p-3 text-sm sm:min-h-[5rem]">
        <p className="font-semibold text-foreground">{opp ? "Oppvelling" : "Nedvelling"}</p>
        <p className="mt-1 text-foreground">
          {opp ? (
            <>
              Ekmantransporten fører overflatevannet ut fra kysten. Vannet som forsvinner, erstattes av kaldere vann nedenfra. <span className={KILDE}>(Barthel, 2021b)</span>
            </>
          ) : (
            <>
              Ekmantransporten fører vannet mot kysten. Det hoper seg opp og presses nedover. Det kan også gi stormflo. <span className={KILDE}>(Barthel, 2021a)</span>
            </>
          )}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">Vestkyst med land i øst. Snitt sett fra sør: vest til venstre, øst til høyre. Nordlig halvkule.</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-[10px]"
        role="img"
        aria-label={`Snitt sett fra sør av en vestkyst med land i øst. Vind fra ${vindFra === "nord" ? "nord" : "sør"} langs kysten ${vindTekst}. Ekmantransporten går ${opp ? "ut fra kysten, og kaldere vann kommer opp nedenfra" : "mot kysten, og vannet presses nedover"}.`}
        data-figur="ekman-kyst"
        data-opp={opp ? "1" : "0"}
      >
        <Piler id={uid} />
        <rect width={W} height={havY} fill={C.luft} />
        <rect y={havY} width={W} height={H - havY} fill={C.hav} />
        <path d={`${grense} L${kystX + ut * 6} ${bunn} L${fjern} ${bunn} Z`} fill={C.havDyp} opacity="0.85" />
        <path d={grense} fill="none" stroke={C.kald} strokeWidth="2.2" strokeDasharray="9 6" opacity="0.8" />
        <path d={skraning} fill={C.land} stroke={C.landKant} strokeWidth="1.5" />
        <rect x={landX0} y={havY - (smal ? 24 : 34)} width={landB} height={smal ? 24 : 34} fill={C.land} />
        <Retning x={vindX} y={havY / 2 + (smal ? 6 : 4)} mot={motDeg} farge={C.vind} r={smal ? 15 : 18} />
        <Pil x1={px1} y1={pilY} x2={px2} y2={pilY} farge={C.lag} marker={`${uid}-lag`} b={5} />
        {vertX.map((x, i) =>
          opp ? (
            <Pil key={i} x1={x} y1={vNed} x2={x + ut * -6} y2={vOpp} farge={C.kald} marker={`${uid}-kald`} b={3.5} />
          ) : (
            <Pil key={i} x1={x + ut * -6} y1={vOpp} x2={x} y2={vNed} farge={C.kald} marker={`${uid}-kald`} b={3.5} />
          ),
        )}
        {smal ? (
          <>
            <Skilt x={vindX + ut * 46} y={havY / 2 + 6} n={1} />
            <Skilt x={(px1 + px2) / 2} y={pilY + 30} n={2} />
            <Skilt x={vertX[1] + ut * 44} y={(vNed + vOpp) / 2 + 30} n={3} />
          </>
        ) : (
          <>
            <T x={16} y={26} farge={C.dempet} size={16}>Vest</T>
            <T x={W - 16} y={26} anchor="end" farge={C.dempet} size={16}>Øst</T>
            <T x={landX0 + landB / 2} y={havY + 120} anchor="middle" farge={C.tekst}>land</T>
            <T x={vindX + ut * 30} y={havY / 2 + 9} anchor={tAnchor} farge={C.vind}>{vindEtikett}</T>
            <T x={kystX + ut * 300} y={pilY + 32} anchor={tAnchor} farge={C.lag}>{ekmanTekst}</T>
            <T x={vertX[1] + ut * 26} y={opp ? bunn - 40 : havY + 150} anchor={tAnchor} farge={C.kald}>{vertTekst}</T>
          </>
        )}
      </svg>
      {smal ? (
        <Forklaring
          punkter={[
            { tekst: vindEtikett.replace(/^./, (c) => c.toUpperCase()), farge: C.vind },
            { tekst: ekmanTekst.replace("ekmantransport", "Ekmantransport"), farge: C.lag },
            { tekst: vertTekst.replace(/^./, (c) => c.toUpperCase()), farge: C.kald },
          ]}
        />
      ) : null}
      <p className="text-xs text-muted-foreground">⊙ blåser mot deg, ⊗ blåser bort fra deg. Skjematisk.</p>
      <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-foreground">
        <span className="font-semibold">Norge: sterk nordavind langs vestkysten gir oppvelling.</span> Da kan nytt vann strømme inn i fjordene og fornye det oksygenfattige dypvannet der.{" "}
        <span className={KILDE}>(Barthel, 2021b)</span>
      </div>
    </div>
  );
}

/* ---------- fane 3: havvirvel og geostrofisk strøm ---------- */

const VIRVEL_FASER = ["Havflaten hever seg", "Trykkforskjell", "Corioliseffekten", "Langs hellingen"];
const VIRVEL_BILDER = [
  { haug: 0.15, trykk: 0, cor: 0, strom: 0 },
  { haug: 1, trykk: 0, cor: 0, strom: 0 },
  { haug: 1, trykk: 1, cor: 0, strom: 0 },
  { haug: 1, trykk: 1, cor: 1, strom: 0 },
  { haug: 1, trykk: 1, cor: 1, strom: 1 },
];

function VirvelFane() {
  const uid = useId().replace(/:/g, "");
  const [boksRef, smal] = useFigurSmal();
  const [svgRef, synlig] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall: VIRVEL_FASER.length, synlig, element: svgRef });
  const s = tidslinjeVerdi(VIRVEL_BILDER, tl.p);

  const W = smal ? 360 : 900;
  const H = smal ? 320 : 400;
  const base = smal ? 120 : 150; // havflaten uten haug
  const topp = smal ? 62 : 70; // toppen av haugen
  const toppX = W * 0.3; // haugen ligger mot vest: brattere på vestsiden
  const hy = (t: number) => lerp(base, topp, t * s.haug);
  const flate = `M0 ${base} C ${W * 0.08} ${base}, ${W * 0.15} ${hy(1)}, ${toppX} ${hy(1)} C ${W * 0.5} ${hy(1)}, ${W * 0.75} ${hy(0.55)}, ${W} ${base}`;
  const gx = W * (smal ? 0.2 : 0.13);
  const kx = W * (smal ? 0.8 : 0.82);
  const yy = smal ? 244 : 250;
  const pl = smal ? 38 : 60; // pillengde for kreftene
  const strY = smal ? 158 : yy - 52;

  const status = [
    <>Når ekmantransporten flytter vann sammen, hever havoverflaten seg litt. <span className={KILDE}>(Barthel, 2025)</span></>,
    <>Da oppstår en trykkforskjell som presser vannet ut fra høyden. <span className={KILDE}>(Barthel, 2025)</span></>,
    <>Corioliseffekten bøyer det samme vannet mot høyre. <span className={KILDE}>(Barthel, 2025)</span></>,
    <>
      Etter en stund er kreftene i balanse, og vannet strømmer langs hellingen i stedet for nedover den: med klokken rundt havvirvelen. Strømmen på vestsiden er smal og rask, og
      strømmen på østsiden er bred og langsom. <span className={KILDE}>(Barthel, 2025; NOAA, u.å.-b)</span>
    </>,
  ][tl.fase - 1];

  const forklaring = [
    { tekst: "Høyere havflate (høyden er overdrevet)", farge: C.tekst, vis: s.haug > 0.5 },
    { tekst: "Blå pil: trykkforskjellen presser vannet ut fra høyden", farge: C.trykk, vis: s.trykk > 0.3 },
    { tekst: "Grå pil: corioliseffekten bøyer det mot høyre", farge: C.coriolis, vis: s.cor > 0.3 },
    { tekst: "Golfstrømmen: smal og rask, nordover, går bort fra deg (⊗)", farge: C.golf, vis: s.strom > 0.3 },
    { tekst: "Kanaristrømmen: bred og langsom, sørover, kommer mot deg (⊙)", farge: C.kanari, vis: s.strom > 0.3 },
  ];

  return (
    <div ref={boksRef} className="space-y-3">
      <div className="flex justify-end">
        <PlayPauseToggle isPlaying={tl.playing} onToggle={tl.toggle} name="Havvirvel og geostrofisk strøm" />
      </div>
      <TidslinjeKontroller tl={tl} faser={VIRVEL_FASER} />
      <Status>{status}</Status>
      <p className="text-xs text-muted-foreground">Snitt vest–øst sett fra sør. Nordlig halvkule.</p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-[10px]"
        role="img"
        aria-label="Snitt vest–øst gjennom en havvirvel på den nordlige halvkulen, sett fra sør. Havflaten er høyest i midten og brattest mot vest. Trykkforskjellen presser vannet ut fra høyden, og corioliseffekten bøyer det mot høyre. I balanse går Golfstrømmen nordover på vestsiden, bort fra deg, og Kanaristrømmen sørover på østsiden, mot deg: med klokken rundt havvirvelen."
        data-figur="ekman-virvel"
        data-step={tl.fase}
      >
        <Piler id={uid} />
        <rect width={W} height={H} fill={C.luft} />
        <path d={`${flate} L${W} ${H} L0 ${H} Z`} fill={C.hav} />
        <path d={flate} fill="none" stroke="#bfe3f5" strokeWidth="2" opacity="0.7" />
        {/* ekmantransporten samler vann inn mot midten */}
        <Pil x1={8} y1={base + 18} x2={W * 0.2} y2={base + 6} farge={C.lag} marker={`${uid}-lag`} b={3} opacity={1 - s.trykk * 0.6} />
        <Pil x1={W - 8} y1={base + 18} x2={W * 0.6} y2={hy(0.55) + 22} farge={C.lag} marker={`${uid}-lag`} b={3} opacity={1 - s.trykk * 0.6} />
        <T x={toppX} y={hy(1) - 14} anchor="middle" size={smal ? 20 : 24} vekt={700} opacity={s.haug}>H</T>
        {/* kreftene ved hver randstrøm: trykk ut fra høyden, corioliseffekten inn mot den */}
        <Pil x1={gx - 6} y1={strY} x2={gx - 6 - pl * s.trykk} y2={strY} farge={C.trykk} marker={`${uid}-kald`} b={4} opacity={s.trykk > 0.02 ? 1 : 0} />
        <Pil x1={gx + 6} y1={strY} x2={gx + 6 + pl * s.cor} y2={strY} farge={C.coriolis} marker={`${uid}-coriolis`} b={4} opacity={s.cor > 0.02 ? 1 : 0} />
        <Pil x1={kx + 6} y1={strY} x2={kx + 6 + pl * s.trykk} y2={strY} farge={C.trykk} marker={`${uid}-kald`} b={4} opacity={s.trykk > 0.02 ? 1 : 0} />
        <Pil x1={kx - 6} y1={strY} x2={kx - 6 - pl * s.cor} y2={strY} farge={C.coriolis} marker={`${uid}-coriolis`} b={4} opacity={s.cor > 0.02 ? 1 : 0} />
        {s.strom > 0.02 ? (
          <g opacity={s.strom}>
            <Retning x={gx} y={yy} mot={false} farge={C.golf} r={smal ? 15 : 20} />
            <Retning x={kx} y={yy} mot farge={C.kanari} r={smal ? 15 : 20} />
          </g>
        ) : null}
        {smal ? (
          <>
            <Skilt x={toppX + 34} y={hy(1) - 28} n={1} opacity={s.haug} />
            <Skilt x={gx - 25} y={strY + 34} n={2} opacity={s.trykk} />
            <Skilt x={gx + 25} y={strY + 34} n={3} opacity={s.cor} />
            <Skilt x={gx} y={yy + 46} n={4} opacity={s.strom} />
            <Skilt x={kx} y={yy + 46} n={5} opacity={s.strom} />
          </>
        ) : (
          <>
            <T x={14} y={24} farge={C.dempet} size={16}>Vest</T>
            <T x={W - 14} y={24} anchor="end" farge={C.dempet} size={16}>Øst</T>
            <T x={toppX + 24} y={hy(1) - 16} farge={C.dempet} vekt={400} opacity={s.haug}>høyere havflate (overdrevet)</T>
            <T x={W * 0.8} y={base + 52} anchor="middle" farge={C.lag} opacity={1 - s.trykk}>ekmantransporten samler vann</T>
            <T x={W * 0.5} y={strY - 8} anchor="middle" farge={C.trykk} opacity={s.trykk}>blå pil: trykkforskjellen presser vannet ut fra høyden</T>
            <T x={W * 0.5} y={strY + 18} anchor="middle" farge={C.coriolis} opacity={s.cor}>grå pil: corioliseffekten bøyer det mot høyre</T>
            <T x={gx - 30} y={yy + 48} farge={C.golf} opacity={s.strom}>Golfstrømmen</T>
            <T x={gx - 30} y={yy + 73} farge={C.golf} vekt={400} opacity={s.strom}>smal og rask, nordover</T>
            <T x={kx + 60} y={yy + 48} anchor="end" farge={C.kanari} opacity={s.strom}>Kanaristrømmen</T>
            <T x={kx + 60} y={yy + 73} anchor="end" farge={C.kanari} vekt={400} opacity={s.strom}>bred og langsom, sørover</T>
            <T x={W * 0.5} y={H - 20} anchor="middle" farge={C.tekst} opacity={s.strom}>I balanse: langs hellingen, med klokken rundt H</T>
          </>
        )}
      </svg>
      {smal ? <Forklaring punkter={forklaring} /> : null}
      <p className="text-xs text-muted-foreground">⊗ går bort fra deg (nordover), ⊙ kommer mot deg (sørover). Skjematisk, høyden er overdrevet.</p>
    </div>
  );
}

/* ---------- modellen ---------- */

const FANER = ["1 Ekmanspiralen", "2 Oppvelling og nedvelling", "3 Havvirvel og geostrofisk strøm"];

export function EkmanUpwellingModel() {
  const uid = useId().replace(/:/g, "");
  // fane 2 åpnes først: modellen står i oppvellingsdelen av kapitlet
  const [fane, setFane] = useState(2);
  return (
    <ModelFrame
      kicker="Interaktiv modell"
      title="Ekmanspiral, oppvelling og havvirvel"
      lead="Velg en fane: ekmanspiralen sett ovenfra, oppvelling og nedvelling i et snitt langs kysten, eller hvordan vannet strømmer langs hellingen rundt en havvirvel."
      stackHeader
      toolbar={<Faner labels={FANER} valgt={fane} onVelg={setFane} label="Velg fane" idPrefix={uid} panelId={`${uid}-panel`} />}
    >
      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-fane-${fane}`} data-fane={fane}>
        {fane === 1 ? <SpiralFane /> : fane === 2 ? <KystFane /> : <VirvelFane />}
      </div>
    </ModelFrame>
  );
}
