/**
 * Prosess-kit-figurene lastes lat og bygges bare på klienten.
 *
 * Serveren (og første klientrendering under hydrering) viser en lett, statisk plassholder med samme
 * overskrift, bildetekst og tekstalternativ som figuren, og med reservert høyde, så siden ikke hopper.
 * Den fulle figuren (modul, teksturer og SVG) lastes først når plassholderen nærmer seg skjermen.
 * Da slipper serveren å rendre figurene, og andre sider som importerer poster-body, laster dem ikke.
 */
import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type CSSProperties, type JSX } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { BOTN_EGG_TIND_TEKST } from "./botn-egg-tind-tekst";
import { DIAGENESE_TEKST } from "./diagenese-tekst";
import { DIFFERENSIERING_TEKST } from "./differensiering-tekst";
import { IONBYTTE_TEKST } from "./ionbytte-tekst";
import { SYKLUS_TEKST } from "./syklus-tekst";
import { KONTAKT_REGIONAL_TEKST } from "./kontakt-regional-tekst";
import {
  JETSTREAK_TEKST,
  JET_NAO_TEKST,
  JET_OMEGA_TEKST,
  JET_PROFIL_TEKST,
  JET_SESONG_TEKST,
  JET_SLYNGER_TEKST,
  STORMBANE_TEKST,
  TERMISK_VIND_TEKST,
  VEST_OST_TEKST,
} from "./jetstrommer-tekst";

type Plass = {
  heading: string;
  title: string;
  caption: string;
  /** Tegneflatens viewBox-størrelse, smal (< 760 px) og bred. */
  smal: [number, number];
  bred: [number, number];
  /** Reservert høyde (px) over tegneflaten (verktøylinje, status), smal og bred layout. */
  over: [number, number];
  /**
   * Reservert høyde (px) under tegneflaten (målere, nummerert forklaring, tegnforklaring), målt mot
   * ferdig figur ved 340 og 678 px bredde. Teksten brytes sjeldnere jo bredere figuren er, så høyden
   * interpoleres lineært med containerbredden.
   */
  under: [number, number];
  /** Faner over verktøylinjen (KontaktRegional). */
  faner?: [number, number];
  /**
   * For figurer som selv bytter til bred layout ved 560 px tegneflate (Bergartssyklusen): høyden
   * over og under tegneflaten som målte punkter [containerbredde, høyde] per layout, stykkevis lineært
   * mellom punktene og flatt utenfor.
   */
  skala?: {
    smal: { over: [number, number][]; under: [number, number][] };
    bred: { over: [number, number][]; under: [number, number][] };
  };
  /**
   * Jetstrømmer-figurene (StegFigur): målte punkter [containerbredde, høyde], stykkevis lineært og flatt
   * utenfor, for begge layoutene (bytter ved 760 px tegneflate). Statuslinja og minstehøyden på den
   * nummererte forklaringen følger vindusbredden i figuren (STATUS_H og [&_ol]:min-h), så de reserveres
   * med de samme mediespørringene her.
   */
  steg?: {
    /** Over tegneflaten, uten statuslinja. */
    over: [number, number][];
    /** Den nummererte forklaringen (naturlig høyde, 0 i bred layout). */
    liste: [number, number][];
    /** Resten under tegneflaten (tegnforklaring, notater). */
    under: [number, number][];
  };
};

/**
 * CSS-lengde som går stykkevis lineært gjennom punktene [containerbredde, høyde] og er flat utenfor:
 * h0 + Σ (stigningsendring ved wi) · max(0, 100cqw − wi).
 */
function stykkevis(punkter: [number, number][]) {
  const p = [...punkter].sort((a, b) => a[0] - b[0]);
  const ledd: string[] = [`${p[0][1]}px`];
  let forrige = 0;
  for (let i = 0; i < p.length; i++) {
    const neste = i < p.length - 1 ? (p[i + 1][1] - p[i][1]) / (p[i + 1][0] - p[i][0]) : 0;
    const endring = neste - forrige;
    if (Math.abs(endring) > 1e-6) ledd.push(`max(0px, 100cqw - ${p[i][0]}px) * ${endring.toFixed(4)}`);
    forrige = neste;
  }
  return `calc(${ledd.join(" + ")})`;
}

/** Statisk plassholder. Samme ramme som figuren, uten JavaScript-tung SVG. */
export function ProsessPlassholder({ plass, heading, caption }: { plass: Plass; heading?: string; caption?: React.ReactNode }) {
  const stil = {
    "--over-s": `${plass.over[0] + (plass.faner?.[0] ?? 0)}px`,
    "--over-b": `${plass.over[1] + (plass.faner?.[1] ?? 0)}px`,
    "--under-s": `clamp(${Math.min(...plass.under)}px, calc(${plass.under[0]}px + (100cqw - 340px) * ${((plass.under[1] - plass.under[0]) / 338).toFixed(4)}), ${Math.max(...plass.under)}px)`,
    "--under-b": `${plass.under[1]}px`,
    "--ar-s": `${plass.smal[0]} / ${plass.smal[1]}`,
    "--ar-b": `${plass.bred[0]} / ${plass.bred[1]}`,
  } as CSSProperties;
  const sk = plass.skala;
  if (sk) {
    Object.assign(stil, {
      "--over-s": stykkevis(sk.smal.over),
      "--over-b": stykkevis(sk.bred.over),
      "--under-s": stykkevis(sk.smal.under),
      "--under-b": stykkevis(sk.bred.under),
    });
  }
  // bytte til bred layout: ved 560 px for figurer med egen skala, ellers ved NARROW_FIGURE_PX (760)
  const over = sk ? "h-[var(--over-s)] @min-[560px]:h-[var(--over-b)]" : "h-[var(--over-s)] @min-[760px]:h-[var(--over-b)]";
  const flate = sk ? "aspect-[var(--ar-s)] @min-[560px]:aspect-[var(--ar-b)]" : "aspect-[var(--ar-s)] @min-[760px]:aspect-[var(--ar-b)]";
  const under = sk ? "h-[var(--under-s)] @min-[560px]:h-[var(--under-b)]" : "h-[var(--under-s)] @min-[760px]:h-[var(--under-b)]";
  return (
    <FigureFrame
      heading={heading ?? plass.heading}
      caption={caption ?? plass.caption}
      action={
        // samme mål som avspillingsknappen, så toppstripen ikke endrer høyde
        <span
          aria-hidden="true"
          className="invisible inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
        >
          <span className="size-1.5" />
          <span>⏸ Pause animasjon</span>
        </span>
      }
    >
      {plass.steg ? (
        <div className="@container" style={stil} data-plassholder="">
          <div style={{ height: stykkevis(plass.steg.over) }} />
          <div className="h-[7.5rem] min-[480px]:h-[5rem] min-[900px]:h-[3.75rem]" />
          <div role="img" aria-label={plass.title} className={`mx-auto w-full max-w-5xl rounded-[10px] bg-muted/50 ${flate}`} />
          <div className="min-h-[5.5rem] min-[760px]:min-h-0" style={{ height: stykkevis(plass.steg.liste) }} />
          <div style={{ height: stykkevis(plass.steg.under) }} />
        </div>
      ) : (
        <div className="@container" style={stil} data-plassholder="">
          <div className={over} />
          <div role="img" aria-label={plass.title} className={`mx-auto w-full max-w-5xl rounded-[10px] bg-muted/50 ${flate}`} />
          <div className={under} />
        </div>
      )}
    </FigureFrame>
  );
}

/** Blir sann når elementet er innenfor én skjermhøyde fra vinduet (og aldri på serveren). */
function useNaer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [naer, setNaer] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNaer(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNaer(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, naer] as const;
}

type FigurProps = { heading?: string; caption?: React.ReactNode };

function lat<P extends FigurProps>(plass: Plass, last: () => Promise<ComponentType<P>>) {
  const Komponent = lazy(async () => ({ default: await last() }));
  return function LatFigur(props: P): JSX.Element {
    const [ref, naer] = useNaer();
    const holder = <ProsessPlassholder plass={plass} heading={props.heading} caption={props.caption} />;
    return (
      <div ref={ref}>
        {naer ? (
          <Suspense fallback={holder}>
            <Komponent {...(props as P & JSX.IntrinsicAttributes)} />
          </Suspense>
        ) : (
          holder
        )}
      </div>
    );
  };
}

export const DiageneseFigurLat = lat<FigurProps>(
  { ...DIAGENESE_TEKST, smal: [520, 600], bred: [960, 540], over: [150, 110], under: [437, 206] },
  () => import("./diagenese-figur").then((m) => m.DiageneseFigur),
);

export const KontaktRegionalV2FigurLat = lat<FigurProps>(
  { ...KONTAKT_REGIONAL_TEKST, smal: [520, 700], bred: [960, 540], over: [150, 110], under: [290, 200], faner: [44, 44] },
  () => import("./kontakt-regional-v2").then((m) => m.KontaktRegionalV2Figur),
);

export const DifferensieringV2FigurLat = lat<FigurProps>(
  { ...DIFFERENSIERING_TEKST, smal: [520, 700], bred: [960, 540], over: [150, 110], under: [270, 112] },
  () => import("./differensiering-figur").then((m) => m.DifferensieringV2Figur),
);

export const IonBytteV2FigurLat = lat<FigurProps>(
  { ...IONBYTTE_TEKST, smal: [520, 700], bred: [960, 540], over: [150, 110], under: [434, 270] },
  () => import("./ionbytte-figur").then((m) => m.IonBytteV2Figur),
);

/** Botn, egg og tind (isbreer-og-landformer): terrenget tegnes i canvas på klienten, serveren viser bare plassholderen. */
export const BotnEggTindFigurLat = lat<FigurProps>(
  { ...BOTN_EGG_TIND_TEKST, smal: [520, 790], bred: [960, 600], over: [194.5, 14], under: [493, 265] },
  () => import("./botn-egg-tind-figur").then((m) => m.BotnEggTindFigur),
);

export const BergartssyklusFigurLat = lat<FigurProps>(
  {
    ...SYKLUS_TEKST,
    smal: [400, 680],
    bred: [680, 680],
    over: [258, 148],
    under: [240, 165],
    // målt mot ferdig figur (Hovedløpet, redusert bevegelse) ved 340–768 px vindusbredde
    skala: {
      smal: {
        over: [[290, 350], [340, 258], [400, 242], [450, 230], [510, 241], [550, 240]],
        under: [[290, 259], [340, 240], [400, 180], [450, 184], [550, 184]],
      },
      bred: {
        over: [[570, 220], [610, 184], [678, 148]],
        under: [[570, 183], [610, 167], [678, 165]],
      },
    },
  },
  () => import("./bergartssyklus-figur").then((m) => m.BergartssyklusFigur),
);

/* Jetstrømmer: alle figurene ligger i jetstrommer-figurer.tsx og lastes først når de nærmer seg skjermen. */
// Mål 18.10: smal = narrowViewBox. steg = målt mot ferdig figur (produksjonsbuild) på /tema/jetstrommer for hver containerbredde
// 250–806 px (vindu 300–1100 px, plass-sveip2.mjs), med stykkevis lineære overganger på 1 px der teksten brytes om.
const JET_MAAL = { smal: [560, 540] as [number, number], bred: [960, 540] as [number, number], over: [190, 150] as [number, number], under: [120, 90] as [number, number] };
const jetLat = (tekst: { heading: string; title: string; caption: string }, maal: Partial<typeof JET_MAAL> & Pick<Plass, "steg">, navn: keyof typeof import("./jetstrommer-figurer")) =>
  lat<FigurProps>({ ...tekst, ...JET_MAAL, ...maal }, () => import("./jetstrommer-figurer").then((m) => m[navn] as ComponentType<FigurProps>));

export const JetProfilFigurLat = jetLat(
  JET_PROFIL_TEKST,
  { smal: [960, 540], steg: { over: [[250, 119], [466, 119], [467, 87], [806, 87]], liste: [[250, 106], [759, 106], [760, 0], [806, 0]], under: [[250, 73.62], [318, 73.62], [319, 55.75], [584, 55.75], [585, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "JetProfilFigur",
);
export const TermiskVindFigurLat = jetLat(
  TERMISK_VIND_TEKST,
  { smal: [960, 540], steg: { over: [[250, 151], [259, 151], [260, 119], [363, 119], [364, 87], [806, 87]], liste: [[250, 106], [759, 106], [760, 0], [806, 0]], under: [[250, 73.62], [261, 73.62], [262, 55.75], [524, 55.75], [525, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "TermiskVindFigur",
);
export const VestOstFigurLat = jetLat(
  VEST_OST_TEKST,
  { smal: [960, 540], steg: { over: [[250, 119], [337, 119], [338, 87], [806, 87]], liste: [[250, 88], [669, 88], [670, 22], [759, 22], [760, 0], [806, 0]], under: [[250, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "VestOstFigur",
);
export const JetStreakFigurLat = jetLat(
  JETSTREAK_TEKST,
  { smal: [960, 540], steg: { over: [[250, 119], [380, 119], [381, 87], [806, 87]], liste: [[250, 88], [669, 88], [670, 78], [759, 78], [760, 0], [806, 0]], under: [[250, 149.5], [298, 149.5], [299, 131.62], [328, 131.62], [329, 105.62], [427, 105.62], [428, 87.75], [759, 87.75], [760, 75.75], [806, 75.75]] } },
  "JetStreakFigur",
);
export const JetSlyngerFigurLat = jetLat(
  JET_SLYNGER_TEKST,
  { smal: [740, 540], steg: { over: [[250, 151], [261, 151], [262, 119], [433, 119], [434, 87], [806, 87]], liste: [[250, 88], [669, 88], [670, 78], [759, 78], [760, 0], [806, 0]], under: [[250, 55.75], [423, 55.75], [424, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "JetSlyngerFigur",
);
export const JetSesongFigurLat = jetLat(
  JET_SESONG_TEKST,
  { smal: [740, 540], steg: { over: [[250, 87], [806, 87]], liste: [[250, 88], [669, 88], [670, 50], [759, 50], [760, 0], [806, 0]], under: [[250, 73.62], [286, 73.62], [287, 55.75], [556, 55.75], [557, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "JetSesongFigur",
);
export const JetNaoFigurLat = jetLat(
  JET_NAO_TEKST,
  { smal: [740, 540], steg: { over: [[250, 87], [806, 87]], liste: [[250, 150.5], [283, 150.5], [284, 134], [759, 134], [760, 0], [806, 0]], under: [[250, 55.75], [391, 55.75], [392, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "JetNaoFigur",
);
export const JetOmegaFigurLat = jetLat(
  JET_OMEGA_TEKST,
  { smal: [640, 540], steg: { over: [[250, 119], [254, 119], [255, 87], [806, 87]], liste: [[250, 88], [669, 88], [670, 22], [759, 22], [760, 0], [806, 0]], under: [[250, 55.75], [320, 55.75], [321, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "JetOmegaFigur",
);
export const StormbaneFigurLat = jetLat(
  STORMBANE_TEKST,
  { smal: [740, 540], steg: { over: [[250, 119], [311, 119], [312, 87], [806, 87]], liste: [[250, 106], [759, 106], [760, 0], [806, 0]], under: [[250, 55.75], [416, 55.75], [417, 37.88], [759, 37.88], [760, 25.88], [806, 25.88]] } },
  "StormbaneFigur",
);
