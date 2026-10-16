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
import { DIAGENESE_TEKST } from "./diagenese-tekst";
import { DIFFERENSIERING_TEKST } from "./differensiering-tekst";
import { IONBYTTE_TEKST } from "./ionbytte-tekst";
import { SYKLUS_TEKST } from "./syklus-tekst";
import { KONTAKT_REGIONAL_TEKST } from "./kontakt-regional-tekst";

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
   * over og under tegneflaten interpoleres lineært innenfor hver layout, [høyde ved w0, høyde ved w1].
   */
  skala?: {
    smal: { w: [number, number]; over: [number, number]; under: [number, number] };
    bred: { w: [number, number]; over: [number, number]; under: [number, number] };
  };
};

/** CSS-lengde som går lineært fra h[0] ved containerbredde w[0] til h[1] ved w[1]. */
function lineaer(w: [number, number], h: [number, number]) {
  const k = ((h[1] - h[0]) / (w[1] - w[0])).toFixed(4);
  return `clamp(${Math.min(...h)}px, calc(${h[0]}px + (100cqw - ${w[0]}px) * ${k}), ${Math.max(...h)}px)`;
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
      "--over-s": lineaer(sk.smal.w, sk.smal.over),
      "--over-b": lineaer(sk.bred.w, sk.bred.over),
      "--under-s": lineaer(sk.smal.w, sk.smal.under),
      "--under-b": lineaer(sk.bred.w, sk.bred.under),
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
      <div className="@container" style={stil} data-plassholder="">
        <div className={over} />
        <div role="img" aria-label={plass.title} className={`mx-auto w-full max-w-5xl rounded-[10px] bg-muted/50 ${flate}`} />
        <div className={under} />
      </div>
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

export const BergartssyklusFigurLat = lat<FigurProps>(
  {
    ...SYKLUS_TEKST,
    smal: [400, 680],
    bred: [680, 680],
    over: [258, 148],
    under: [240, 165],
    skala: {
      smal: { w: [340, 550], over: [258, 240], under: [240, 184] },
      bred: { w: [560, 678], over: [240, 148], under: [184, 165] },
    },
  },
  () => import("./bergartssyklus-figur").then((m) => m.BergartssyklusFigur),
);
