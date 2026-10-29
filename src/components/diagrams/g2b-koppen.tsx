import { FigureFrame } from "@/components/figure-frame";
import { useBoxWidth } from "./isbre-kit";
import { BREDDE_TERSKEL } from "./g2a-kit";

/**
 * Köppen–Geiger-klimasoner i Norge 1991–2020, kart fra Beck mfl. (2023).
 *
 * Kilde:  https://commons.wikimedia.org/wiki/File:Koppen-Geiger_Map_v2_NOR_1991%E2%80%932020.svg
 * Forfattere: Beck, McVicar, Vergopolan, Alexis Berg, Lutsko, Dufour, Zeng, Xin Jiang, van Dijk og Miralles (Commons-metadata har «Alexis, B.» og «Jian», som er feil). Lastet opp av NVergopolan.
 * Lisens: Creative Commons Attribution 4.0 (CC BY 4.0), sjekket på filsiden og via Commons API 29.10.2026.
 * Endringer: SVG-filen er et matplotlib-plott med ett innebygd rasterbilde (15 280 × 7 979 px). Rasterbildet er hentet ut,
 * omprojisert fra lengde/bredde (som strekker Norge sidelengs) til Lambert konform kjegleprojeksjon, beskåret til Norge og
 * lagret som AVIF/WebP i 640 og 1280 px bredde. Klassefargene er uendret. Tegnforklaringen står som HTML under/ved siden av.
 * Se public/images/koppen-norge-beck-1991-2020.lisens.txt.
 *
 * Fargene under er Becks egne (hentet fra tegnforklaringen i SVG-en).
 */
const BILDE_BREDDE = 640;
const BILDE_HOYDE = 790;
const KART_BREDDE = 320;
const FILSIDE = "https://commons.wikimedia.org/wiki/File:Koppen-Geiger_Map_v2_NOR_1991%E2%80%932020.svg";
const ARTIKKEL = "https://doi.org/10.1038/s41597-023-02549-6";
const LISENS = "https://creativecommons.org/licenses/by/4.0/deed.no";

type Klasse = { kode: string; navn: string; farge: string; liten?: boolean; kant?: boolean };
type Gruppe = { bokstav: string; tittel: string; krav: string; klasser: Klasse[] };

/* Rekkefølge og farger følger Becks tegnforklaring. */
const GRUPPER: Gruppe[] = [
  {
    bokstav: "C",
    tittel: "Temperert klima",
    krav: "Kaldeste måned over 0 °C",
    klasser: [
      { kode: "Cfb", navn: "ingen tørketid, varm sommer", farge: "#64ff50" },
      { kode: "Cfc", navn: "ingen tørketid, kjølig sommer", farge: "#32c800" },
    ],
  },
  {
    bokstav: "D",
    tittel: "Kaldt klima",
    krav: "Kaldeste måned 0 °C eller lavere, varmeste måned over 10 °C",
    klasser: [
      { kode: "Dsc", navn: "tørr sommer, kjølig sommer", farge: "#963296", liten: true, kant: true },
      { kode: "Dfb", navn: "ingen tørketid, varm sommer", farge: "#37c8ff" },
      { kode: "Dfc", navn: "ingen tørketid, kjølig sommer", farge: "#007d7d" },
    ],
  },
  {
    bokstav: "E",
    tittel: "Polarklima",
    krav: "Varmeste måned under 10 °C",
    klasser: [{ kode: "ET", navn: "tundra", farge: "#b2b2b2" }],
  },
];

export function FigKoppenNorge() {
  const [boxRef, bw] = useBoxWidth<HTMLDivElement>();
  const bred = bw >= BREDDE_TERSKEL;
  const base = "/images/koppen-norge-beck-1991-2020";
  const sizes = "(min-width: 680px) 360px, 320px";
  const srcAvif = `${base}-640.avif 640w, ${base}-1280.avif 1280w`;
  const srcWebp = `${base}-640.webp 640w, ${base}-1280.webp 1280w`;
  return (
    <FigureFrame
      heading="Köppen-klimasoner i Norge, 1991–2020"
      caption={
        <>
          Kart: Beck mfl. (
          <a className="underline underline-offset-2" href={ARTIKKEL} target="_blank" rel="noopener noreferrer">
            2023
          </a>
          ), via{" "}
          <a className="underline underline-offset-2" href={FILSIDE} target="_blank" rel="noopener noreferrer">
            Wikimedia Commons
          </a>
          , lisens{" "}
          <a className="underline underline-offset-2" href={LISENS} target="_blank" rel="noopener noreferrer">
            CC BY 4.0
          </a>
          . Bearbeidet: kartet er omprojisert og beskåret til Norge, og tegnforklaringen er flyttet fra bildet til
          teksten. Grensen mellom C og D er kaldeste måned 0 °C (Beck). Polar grense er varmeste måned 10 °C. Kartet
          viser fastlands-Norge. Svalbard er ikke vist. BSk og Dsb finnes på noen få ruter og er ikke synlige. Mørk bakgrunn er hav, innsjøer og land utenfor Norge.
        </>
      }
    >
      <div ref={boxRef} className="w-full">
        <div className={bred ? "flex items-center justify-center gap-10" : "flex flex-col items-center gap-5"}>
          <picture className="block shrink-0 overflow-hidden rounded-lg" style={{ width: bred ? 360 : KART_BREDDE, maxWidth: "100%" }}>
            <source type="image/avif" srcSet={srcAvif} sizes={sizes} />
            <source type="image/webp" srcSet={srcWebp} sizes={sizes} />
            <img
              src={`${base}-640.webp`}
              srcSet={srcWebp}
              sizes={sizes}
              width={BILDE_BREDDE}
              height={BILDE_HOYDE}
              loading="lazy"
              decoding="async"
              alt="Kart over fastlands-Norge med Köppen-klimasoner for 1991–2020 (Beck mfl.). Kaldt klima uten tørketid og med kjølig sommer (Dfc) dekker det meste av landet: innlandet i Sør-Norge, Trøndelag og Nord-Norge og nesten hele Finnmark. Kaldt klima med varm sommer (Dfb) ligger i lavlandet på Østlandet og Sørlandet, rundt Oslofjorden, i Trøndelag, i indre fjordstrøk på Vestlandet og langs kysten på Helgeland. Temperert klima (Cfb) ligger som et smalt kystbelte fra Sørlandet til Trøndelag, og små flekker av Cfc finnes helt ytterst på kysten fra Sogn og Møre og i Lofoten og Vesterålen. Polarklima (ET) ligger på høyfjellet over hele landet, mest i Sør-Norge, og som små flekker i Finnmark. Svalbard er ikke med."
              className="block h-auto w-full"
            />
          </picture>
          <div className={bred ? "max-w-sm" : "w-full max-w-sm"}>
            <p className="m-0 mb-3 text-sm font-semibold text-foreground">Tegnforklaring (Beck)</p>
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {GRUPPER.map((g) => (
                <li key={g.bokstav}>
                  <p className="m-0 text-base font-semibold leading-snug text-foreground">
                    {g.bokstav}: {g.tittel}
                  </p>
                  <p className="m-0 text-sm leading-snug text-muted-foreground">{g.krav}</p>
                  <ul className="m-0 mt-1.5 flex list-none flex-col gap-1.5 p-0">
                    {g.klasser.map((k) => (
                      <li key={k.kode} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 block h-5 w-5 shrink-0 rounded border ${k.kant ? "border-2 border-white" : "border-white/60"}`}
                          style={{ backgroundColor: k.farge }}
                        />
                        <span className="min-w-0 text-base leading-snug text-foreground">
                          <strong className="font-semibold">{k.kode}</strong>: {k.navn}
                          {k.liten ? <span className="text-sm text-muted-foreground"> (svært lite areal)</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-4 text-sm leading-snug text-muted-foreground">
              Tredje bokstav: b er varm sommer (under 22 °C, minst fire måneder på 10 °C eller mer), c er kjølig sommer
              (én til tre måneder på 10 °C eller mer).
            </p>
          </div>
        </div>
      </div>
    </FigureFrame>
  );
}
