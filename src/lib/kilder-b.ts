import type { Kilde } from "@/lib/kilder";

/**
 * Kilder for Pakke B (nye kapitler og tillegg i eksisterende kapitler).
 * Holdt i egen fil, slik at endringene er små og lette å flette med resten av kildelistene.
 */

const UDIR_A: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
  italic: "Kjerneelementer",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
};

const UDIR_B: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
  italic: "Kompetansemål etter geofag 2",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
};

function kildeNokkel(k: Kilde): [string, string, string] {
  const i = k.prefix.search(/\s\((?:u\.å\.|\d{4})/);
  const forfatter = i === -1 ? k.prefix : k.prefix.slice(0, i);
  const rest = i === -1 ? "" : k.prefix.slice(i);
  // APA: verk uten årstall kommer før verk med årstall fra samme forfatter.
  return [forfatter, rest.startsWith(" (u.å.") ? `0${rest}` : `1${rest}`, k.italic];
}

function sammenlign(a: Kilde, b: Kilde): number {
  const x = kildeNokkel(a);
  const y = kildeNokkel(b);
  for (let n = 0; n < 3; n++) {
    const c = x[n]!.localeCompare(y[n]!, "nb");
    if (c !== 0) return c;
  }
  return 0;
}

/**
 * Legger nye kilder inn i en eksisterende liste uten å røre rekkefølgen på de gamle.
 * Hver ny kilde settes foran den første gamle kilden som kommer etter den alfabetisk
 * (forfatter, så u.å. før årstall, så årstall). Udir står sist, som i de andre listene.
 */
export function medKilder(basis: readonly Kilde[], tillegg: readonly Kilde[]): Kilde[] {
  const finnes = new Set(basis.map((k) => `${k.prefix}${k.italic}`));
  const ut = [...basis];
  for (const k of tillegg.filter((t) => !finnes.has(`${t.prefix}${t.italic}`))) {
    const i = ut.findIndex((o) => sammenlign(k, o) < 0);
    ut.splice(i === -1 ? ut.length : i, 0, k);
  }
  return ut;
}

/** Kilder per nytt kapittel. */
export const KILDER_B = {
  skyer: [
    {
      prefix: "Beck, H. E., Zimmermann, N. E., McVicar, T. R., Vergopolan, N., Berg, A., & Wood, E. F. (2018). ",
      italic: "Present and future Köppen-Geiger climate classification maps at 1-km resolution",
      suffix: ". Scientific Data, 5, Artikkel 180214.",
      href: "https://doi.org/10.1038/sdata.2018.214",
    },
    {
      prefix: "Dannevig, P., & Harstveit, K. (2026, 12. juni). ",
      italic: "Klima i Norge",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/Klima_i_Norge",
    },
    {
      prefix: "Dannevig, P., Holm, A. K., & Sivle, A. D. (2026, 30. mai). ",
      italic: "Nedbør",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/nedbør",
    },
    {
      prefix: "Harstveit, K. (2024, 26. november). ",
      italic: "Kystklima",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/kystklima",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021a). ",
      italic: "FAQ 7.2: What is the role of clouds in a warming climate?",
      suffix: " I Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change (kap. 7). Cambridge University Press.",
      href: "https://www.ipcc.ch/report/ar6/wg1/downloads/faqs/IPCC_AR6_WGI_FAQ_Chapter_07.pdf",
    },
    {
      prefix: "Korkou, M., & Gray, A. M. (2026). ",
      italic: "Urbane varmeøyer i Oslo: Kartlegging og prioritering av tiltaksområder",
      suffix: " (NINA Rapport 2763). Norsk institutt for naturforskning.",
      href: "https://www.klimaoslo.no/wp-content/uploads/sites/2/2026/04/NINA-rapport_Urbane-varmeoyer-i-Oslo.pdf",
    },
    {
      prefix: "Mamen, J. (2025, 18. november). ",
      italic: "Klimasoner",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/klimasoner",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (2026, 8. oktober). ",
      italic: "Orografisk nedbør",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/orografisk_nedbør",
    },
    {
      prefix: "Pedersen, B. (2025, 22. februar). ",
      italic: "Kondensasjonskjerner",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/kondensasjonskjerner",
    },
    {
      prefix: "Romps, D. M. (2017). ",
      italic: "Exact expression for the lifting condensation level",
      suffix: ". Journal of the Atmospheric Sciences, 74(12), 3891–3900.",
      href: "https://doi.org/10.1175/JAS-D-17-0102.1",
    },
    {
      prefix: "Samuelsen, E. (2025, 22. februar). ",
      italic: "Relativ fuktighet",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/relativ_fuktighet",
    },
    {
      prefix: "Store norske leksikon. (2024, 25. november). ",
      italic: "Duggpunkt",
      suffix: ".",
      href: "https://snl.no/duggpunkt",
    },
    {
      prefix: "Store norske leksikon. (2025, 22. februar). ",
      italic: "Kontinentalt klima",
      suffix: ".",
      href: "https://snl.no/kontinentalt_klima",
    },
    {
      prefix: "Tveito, O. E. (2021). ",
      italic: "Norwegian standard climate normals 1991–2020: The methodological approach",
      suffix: " (METreport nr. 05/2021). Meteorologisk institutt.",
      href: "https://www.met.no/vaer-og-klima/ny-normal-i-klimaforskningen",
    },
    UDIR_A,
    UDIR_B,
    {
      prefix: "Velle, M., & Gjelten, H. M. (2024, 26. november). ",
      italic: "Skyer",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/skyer",
    },
  ] satisfies Kilde[],
};

/** Tillegg til eksisterende kildelister. Slås sammen med `medKilder` i rutene. */
export const KILDER_B_TILLEGG = {
  vaerkart: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-h). ",
      italic: "JetStream Max: Radar beams",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/radar-beams",
    },
    {
      prefix: "National Weather Service [NWS]. (u.å.-b). ",
      italic: "Three types of satellite imagery",
      suffix: ". National Oceanic and Atmospheric Administration.",
      href: "https://www.weather.gov/mrx/sattype",
    },
    {
      prefix: "Store norske leksikon. (2023). ",
      italic: "Vindens virkninger på sjøen",
      suffix: ".",
      href: "https://snl.no/vindens_virkninger_p%C3%A5_sj%C3%B8en",
    },
    {
      prefix: "Store norske leksikon. (2024a, 26. november). ",
      italic: "Værradar",
      suffix: ".",
      href: "https://snl.no/v%C3%A6rradar",
    },
    {
      prefix: "Store norske leksikon. (2024b, 25. november). ",
      italic: "Manuell nedbørmåler",
      suffix: ".",
      href: "https://snl.no/manuell_nedb%C3%B8rm%C3%A5ler",
    },
    {
      prefix: "Store norske leksikon. (2026, 8. april). ",
      italic: "Beauforts vindskala",
      suffix: ".",
      href: "https://snl.no/Beauforts_vindskala",
    },
  ],
} as Record<string, Kilde[]>;
