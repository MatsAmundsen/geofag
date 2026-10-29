import { FigureFrame } from "@/components/figure-frame";
import { useBoxWidth } from "./isbre-kit";
import { BREDDE_TERSKEL } from "./g2a-kit";

/**
 * Köppen-klimasoner i Norge 1991–2020. Kartet er Meteorologisk institutts originalkart (ikke tegnet av oss).
 *
 * Kilde:  https://commons.wikimedia.org/wiki/File:K%C3%B6ppen_main_climate_zones_Norway_91-2020_-3C_isoterm.png
 * Forfatter: Norwegian Meteorological Institute (met.no), via Store norske leksikon. Lastet opp av Orcaborealis.
 * Lisens: Creative Commons Attribution 3.0 Unported (CC BY 3.0), sjekket på filsiden 29.10.2026.
 * Endringer: beskåret (tittel, ramme og bildetekst fra nettsiden fjernet), tegnforklaringen og forstørrelsesikonet
 * i bildet er malt over, og tegnforklaringen står som tekst under/ved siden av kartet.
 * Originalen er 501 × 958 px med nettsidetekst. Beskåret kart er 498 × 640 px, så 2x-bildet er originalens oppløsning.
 */
const KART_BREDDE = 320;
const KART_HOYDE = 411;
const FILSIDE = "https://commons.wikimedia.org/wiki/File:K%C3%B6ppen_main_climate_zones_Norway_91-2020_-3C_isoterm.png";
const LISENS = "https://creativecommons.org/licenses/by/3.0/deed.no";

/* Fargene er hentet fra pikslene i MET-kartet. */
const SONER = [
  { k: "C", navn: "varmtemperert klima", krav: "Kaldeste måned over −3 °C", farge: "#4bff00" },
  { k: "D", navn: "kaldtemperert klima", krav: "Kaldeste måned under −3 °C og varmeste måned over 10 °C", farge: "#00237c" },
  { k: "E", navn: "polarklima", krav: "Varmeste måned under 10 °C", farge: "#c7fff5" },
];

export function FigKoppenNorge() {
  const [boxRef, bw] = useBoxWidth<HTMLDivElement>();
  const bred = bw >= BREDDE_TERSKEL;
  const base = "/images/koppen-norge-1991-2020";
  return (
    <FigureFrame
      heading="Köppen-klimasoner i Norge, 1991–2020"
      caption={
        <>
          Kart: Meteorologisk institutt (MET), via{" "}
          <a className="underline underline-offset-2" href={FILSIDE} target="_blank" rel="noopener noreferrer">
            Wikimedia Commons
          </a>
          , lisens{" "}
          <a className="underline underline-offset-2" href={LISENS} target="_blank" rel="noopener noreferrer">
            CC BY 3.0
          </a>
          . Endret: beskåret, og tegnforklaringen er flyttet fra kartet til teksten. Kartet viser fastlands-Norge.
          Svalbard er ikke vist. Grensen mellom C og D er kaldeste måned −3 °C (andre kilder bruker 0 °C). Polar grense
          er varmeste måned 10 °C.
        </>
      }
    >
      <div ref={boxRef} className="w-full">
        <div className={bred ? "flex items-center justify-center gap-10" : "flex flex-col items-center gap-5"}>
          <picture className="block shrink-0 overflow-hidden rounded-lg bg-white" style={{ width: KART_BREDDE, maxWidth: "100%" }}>
            <source type="image/avif" srcSet={`${base}-320.avif 1x, ${base}-498.avif 2x`} />
            <source type="image/webp" srcSet={`${base}-320.webp 1x, ${base}-498.webp 2x`} />
            <img
              src={`${base}-498.webp`}
              srcSet={`${base}-320.webp 1x, ${base}-498.webp 2x`}
              width={KART_BREDDE}
              height={KART_HOYDE}
              loading="lazy"
              decoding="async"
              alt="Kart over fastlands-Norge med Köppen-klimasoner for 1991–2020. Kaldtemperert klima (D) dekker det meste av innlandet i Sør-Norge, Trøndelag og Nord-Norge, og hele Finnmark. Varmtemperert klima (C) ligger som et smalt belte langs kysten, fra Oslofjorden og Sørlandet rundt Vestlandet og videre nordover, og er bredest på Sørlandet og Vestlandet. Polarklima (E) dekker et stort sammenhengende høyfjellsområde i Sør-Norge og mindre flekker i fjellene lenger nord. Svalbard er ikke med."
              className="block h-auto w-full"
            />
          </picture>
          <ul className={`m-0 flex list-none flex-col gap-4 p-0 ${bred ? "max-w-sm" : "w-full max-w-sm"}`}>
            {SONER.map((z) => (
              <li key={z.k} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 block h-5 w-5 shrink-0 rounded border border-white/40"
                  style={{ backgroundColor: z.farge }}
                />
                <span className="min-w-0 text-base leading-snug text-foreground">
                  <strong className="font-semibold">
                    {z.k}: {z.navn}
                  </strong>
                  <span className="block text-sm text-muted-foreground">{z.krav}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FigureFrame>
  );
}
