/**
 * Felles stegfigur (avspilling, pause, stegknapper, etiketter som følger tegningen) for figurer bygget på
 * prosess-kit og IsbreFigur. Kopiert fra jetstrommer-figurer.tsx, slik at Jetstrømmer-figurene står urørt.
 * Med prefers-reduced-motion viser useTidslinje stillbilder per steg (sek = 0).
 */
import { useState, type ReactNode } from "react";
import { IsbreFigur, type Key, type Lab, type Markers } from "./isbre-figur";
import { clamp, lerp, smooth, useInView } from "./isbre-kit";
import { PlayPauseToggle } from "./svg-kit";
import { r1 } from "./steg-kit";
import { TidslinjeKontroller } from "./prosess-figur";
import { tidslinjeVerdi, useTidslinje } from "./prosess-kit";

export type P = [number, number];
export type Bilde = Record<string, number>;

export type Tegn<S extends Bilde> = (s: S, k: { m: Markers; sek: number; fase: number; bryter: boolean }) => ReactNode;

export type Def<S extends Bilde> = {
  id: string;
  tekst: { heading: string; title: string; caption: string };
  faser: string[];
  status: string[];
  /** Tilstand ved p = 0 … antall (bilder.length = faser.length + 1). */
  bilder: S[];
  etiketter: Lab[][];
  keys?: Key[];
  notes?: string[];
  viewBox: string;
  narrowViewBox?: string;
  /**
   * Smal skjerm: nummermerket legges avstand `d` ut fra punktet `fra` gjennom punktet etiketten peker på,
   * i stedet for rett over. På globusen er `fra` Nordpolen, så merket står på tvers av breddesirklene
   * og jetlinjene, ikke oppå dem.
   */
  merker?: { fra: P; d: number } | { kolonne: [number, number]; midt: number };
  /** Valgfri av/på-knapp ved siden av stegene (f.eks. et kartutsnitt). Etikettene legges til når den er på. */
  bryter?: { navn: string; etiketter: Lab[]; status: string };
  tegn: Tegn<S>;
};

type Pkt = [number, number] | undefined;
const blandP = (a: Pkt, b: Pkt, t: number): Pkt =>
  a && b ? [r1(lerp(a[0], b[0], t)), r1(lerp(a[1], b[1], t))] : (t < 0.5 ? a : b);

/**
 * Etikettene følger det som faktisk tegnes: mellom to steg flyttes de med samme myke overgang som tegningen
 * (tidslinjeVerdi). Etiketter som bare finnes i det ene steget, vises først mot slutten av overgangen (eller
 * forsvinner tidlig), så de ikke peker på noe som ikke er tegnet ennå. Lagres per tiendedel av tidslinjen,
 * så det ikke lages nye objekter hvert bilde.
 */
function etiketterVed(
  etiketter: Lab[][],
  lager: Map<number, Lab[]>,
  p: number,
  merker?: { fra: P; d: number } | { kolonne: [number, number]; midt: number },
): Lab[] {
  const q = Math.round(p * 10);
  const hit = lager.get(q);
  if (hit) return hit;
  const pp = q / 10;
  const n = etiketter.length;
  const ved = (k: number) => etiketter[clamp(k - 1, 0, n - 1)];
  const k = Math.min(n - 1, Math.floor(clamp(pp, 0, n)));
  const t = smooth(clamp(pp, 0, n) - k);
  const A = ved(k);
  const B = ved(k + 1);
  const out: Lab[] = [];
  const brukt = new Set<number>();
  A.forEach((a) => {
    const j = B.findIndex((b, i) => !brukt.has(i) && b.text === a.text);
    if (j < 0) {
      if (t < 0.15) out.push(a);
      return;
    }
    brukt.add(j);
    const b = B[j];
    out.push({ ...b, x: r1(lerp(a.x, b.x, t)), y: r1(lerp(a.y, b.y, t)), at: blandP(a.at, b.at, t), badge: blandP(a.badge, b.badge, t) });
  });
  if (t > 0.85) B.forEach((b, i) => !brukt.has(i) && out.push(b));
  if (merker && "kolonne" in merker)
    // smal skjerm: merkene i en kolonne på hver side av globusen, på samme høyde som punktet
    out.forEach((l, i) => {
      if (!l.at || l.badge) return;
      const x = l.at[0] < merker.midt ? merker.kolonne[0] : merker.kolonne[1];
      out[i] = { ...l, badge: [x, l.at[1]] };
    });
  else if (merker)
    out.forEach((l, i) => {
      if (!l.at || l.badge) return;
      const dx = l.at[0] - merker.fra[0];
      const dy = l.at[1] - merker.fra[1];
      const len = Math.hypot(dx, dy);
      const [ux, uy] = len > 1 ? [dx / len, dy / len] : [0, -1];
      out[i] = { ...l, badge: [r1(l.at[0] + ux * merker.d), r1(l.at[1] + uy * merker.d)] };
    });
  lager.set(q, out);
  return out;
}

/** Fast høyde på statusfeltet (lengste statustekst), så figuren ikke hopper mellom stegene. */
const STATUS_H = "block h-[7.5rem] min-[480px]:h-[5rem] min-[900px]:h-[3.75rem]";

const LAGER = new WeakMap<object, Map<number, Lab[]>>();
function lagerFor(def: object) {
  let l = LAGER.get(def);
  if (!l) LAGER.set(def, (l = new Map()));
  return l;
}

export function StegFigur<S extends Bilde>({ def, heading, caption }: { def: Def<S>; heading?: string; caption?: ReactNode }) {
  const [ref, visible] = useInView<SVGSVGElement>();
  const tl = useTidslinje({ antall: def.faser.length, synlig: visible, faseMs: 3600, holdMs: 1800, element: ref });
  const s = tidslinjeVerdi(def.bilder, tl.p);
  const fase = tl.fase;
  const navn = heading ?? def.tekst.heading;
  const [paa, settPaa] = useState(false);
  const bryterPaa = !!def.bryter && paa;
  const lab = etiketterVed(def.etiketter, lagerFor(def), tl.p, def.merker);
  return (
    <div className="[&_ol]:min-h-[5.5rem] [&_ol]:content-start min-[760px]:[&_ol]:min-h-0">
      <IsbreFigur
        svgRef={ref}
        title={def.tekst.title}
        heading={navn}
        caption={caption ?? def.tekst.caption}
        playing={tl.livePlaying}
        action={
          // fast bredde: knappen veksler mellom «Pause» og «Start» når figurene spiller etter tur. Uten fast bredde
          // ville overskriften brytes om og flytte siden. Knappen fyller bredden, med innholdet til venstre (samme bredde som i plassholderen).
          <span className="grid">
            <span aria-hidden="true" className="invisible col-start-1 row-start-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
              <span className="size-1.5" />
              <span>⏸ Pause animasjon</span>
            </span>
            <span className="col-start-1 row-start-1 [&>button]:w-full [&>button]:justify-start">
              <PlayPauseToggle isPlaying={tl.playing} pulserer={tl.livePlaying && visible} onToggle={tl.toggle} name={navn} />
            </span>
          </span>
        }
        toolbar={
          <>
            <TidslinjeKontroller tl={tl} faser={def.faser} />
            {def.bryter && (
              <button
                type="button"
                aria-pressed={bryterPaa}
                onClick={() => settPaa((v) => !v)}
                className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${bryterPaa ? "border-sky-400 bg-sky-400/15 text-sky-200" : "border-white/20 text-slate-300"}`}
              >
                <span aria-hidden="true">{bryterPaa ? "●" : "○"}</span>
                {def.bryter.navn}
              </button>
            )}
          </>
        }
        status={<span className={STATUS_H}>{bryterPaa && def.bryter ? def.bryter.status : def.status[fase - 1]}</span>}
        keys={def.keys}
        labels={bryterPaa && def.bryter ? [...lab, ...def.bryter.etiketter] : lab}
        notes={def.notes}
        viewBox={def.viewBox}
        narrowViewBox={def.narrowViewBox}
      >
        {({ m }) => (
          <g data-figur={def.id} data-step={fase} data-p={tl.p.toFixed(2)}>
            {def.tegn(s, { m, sek: tl.reduced ? 0 : tl.sek, fase, bryter: bryterPaa })}
          </g>
        )}
      </IsbreFigur>
    </div>
  );
}

export type { Key, Lab, Markers };
