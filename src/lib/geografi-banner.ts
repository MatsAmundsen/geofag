/**
 * Kapittelbannere for Geografi. Filene ligger i public/images/geografi/ som
 * banner-<kapittel>.{jpg,webp,avif} (1792×1008) og -2x (3584×2016; «@» i filnavn gir
 * en 307-omdirigering til %40 på Cloudflare, derfor -2x).
 * Kilder og lisenser: /workspace/geografi-bilder/kildeliste.md (godkjent 25.11.2026).
 */
export type GeografiBanner = {
  /** Sti uten filendelse, f.eks. /images/geografi/banner-klima */
  readonly base: string;
  readonly alt: string;
  /** Opphav og år, som i kreditlinja. */
  readonly foto: string;
  readonly lisens: string;
  /** Filside for originalen. */
  readonly href: string;
};

export const BANNER_BREDDE = 1792;
export const BANNER_HOYDE = 1008;

const b = (
  path: string,
  alt: string,
  foto: string,
  lisens: string,
  href: string,
): GeografiBanner => ({
  base: `/images/geografi/banner-${path}`,
  alt,
  foto,
  lisens,
  href,
});

export const GEOGRAFI_BANNERE = {
  verktoy: b(
    "verktoy",
    "Nildeltaet og Middelhavet om natten, fotografert fra Den internasjonale romstasjonen. Byene langs Nilen lyser, og atmosfæren ses som en tynn bue over jorda.",
    "NASA Johnson Space Center (2025)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Egypt%27s_Nile_Delta_region_(iss072e905240).jpg",
  ),
  feltarbeid: b(
    "feltarbeid",
    "En hydrolog står i en bekk i Idaho i USA og måler vannføringen med instrumenter.",
    "Deena Green, U.S. Geological Survey (2014)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Hydrologist_Measuring_Streamflow_(15303060773).jpg",
  ),
  "indre-krefter": b(
    "indre-krefter",
    "En lavasøyle spruter opp over et lavahav ved vulkanen Kīlauea på Hawaii.",
    "J. B. Judd, USGS (1969)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Lava_fountain_dome_2.jpg",
  ),
  landskap: b(
    "landskap",
    "Lysefjorden sett fra Preikestolen, med bratte fjellsider ned mot fjorden.",
    "Pixel.la Free Stock Photos (2016)",
    "CC0",
    "https://commons.wikimedia.org/wiki/File:Lysefjorden,_view_from_Preikestolen_(24244340831).jpg",
  ),
  klima: b(
    "klima",
    "Høye bygeskyer og andre skyer over jorda, fotografert fra Den internasjonale romstasjonen.",
    "NASA (2016)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:ISS-48_Towering_cumulonimbus_and_other_clouds_over_the_Earth_(2).jpg",
  ),
  naturfare: b(
    "naturfare",
    "Orkanen Hilary utenfor vestkysten av Mexico, sett fra satellitt.",
    "NASA Goddard Space Flight Center (2017)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:A_view_of_Hurricane_Hilary_from_space_(36145818535).jpg",
  ),
  ressurser: b(
    "ressurser",
    "Hoover Dam og vannmagasinet bak demningen sett fra lufta, omgitt av tørt fjellandskap.",
    "Carol M. Highsmith, Library of Congress (ca. 1980–2006)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Hoover_Dam_near_Boulder_City,_Nevada_LCCN2011636328.tif",
  ),
  baerekraft: b(
    "baerekraft",
    "Amazonas-regnskogen med elver og ettermiddagsskyer, sett fra satellitt.",
    "Jeff Schmaltz, NASA GSFC / MODIS Rapid Response (2009)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Afternoon_Clouds_over_the_Amazon_Rainforest.jpg",
  ),
  naering: b(
    "naering",
    "Containerhavna i Tacoma i USA sett fra lufta, med kraner og lange rader med containere.",
    "Brian Harris, U.S. Army (2017)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Aerial_view_of_shipping_containers,_and_big_container_cranes_at_Tacoma%27s_container_port_-a.jpg",
  ),
  befolkning: b(
    "befolkning",
    "Mexico by med forsteder om natten, fotografert fra Den internasjonale romstasjonen. Lysene viser hvor tett og vidt byen er bygd ut.",
    "NASA Johnson Space Center (2025)",
    "offentlig eiendom",
    "https://commons.wikimedia.org/wiki/File:Mexico_City,_the_capital_and_most-populous_city_of_the_Latin_American_nation_(iss073e0075943).jpg",
  ),
  migrasjon: b(
    "migrasjon",
    "Øresundsbrua mellom Danmark og Sverige sett fra København, med bygårder i forgrunnen og et fly på himmelen.",
    "News Øresund (2018)",
    "CC BY 2.0",
    "https://commons.wikimedia.org/wiki/File:%C3%98resund_Bridge_from_Copenhagen.jpg",
  ),
} as const satisfies Record<string, GeografiBanner>;

export type GeografiBannerNavn = keyof typeof GEOGRAFI_BANNERE;

/** Kreditlinje på kapittelsiden: «Foto: …, lisens». */
export function bannerKreditt(banner: GeografiBanner): string {
  return `Foto: ${banner.foto}, ${banner.lisens}`;
}

export function bannerSrcSet(banner: GeografiBanner, ext: "jpg" | "webp" | "avif"): string {
  return `${banner.base}.${ext} ${BANNER_BREDDE}w, ${banner.base}-2x.${ext} ${BANNER_BREDDE * 2}w`;
}
