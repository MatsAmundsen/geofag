import type { Kilde } from "@/lib/kilder";

/** Kildelister per Geografi-kapittel (CMS-slug geo-…). Verifiserte kilder til fagtekstene. */
export const KILDER_GEOGRAFI: Record<string, readonly Kilde[]> = {
  "geo-verktoy": [
    {
      prefix: "Field, K. (2020, 3. desember). ",
      italic: "Something in the water: the mythology of Snow’s map of cholera",
      suffix: ". Esri.",
      href: "https://www.esri.com/arcgis-blog/products/arcgis-pro/mapping/something-in-the-water-the-mythology-of-snows-map-of-cholera",
    },
    {
      prefix: "Kartverket. (2020, 28. august). ",
      italic: "Karttypar",
      suffix: ".",
      href: "https://kartverket.no/til-lands/korleis-blir-kartet-til/kartypar",
    },
    {
      prefix: "Kartverket. (2023, 19. april). ",
      italic: "Kva er eit kart?",
      suffix: ".",
      href: "https://www.kartverket.no/til-lands/korleis-blir-kartet-til/kva-er-eit-kart",
    },
    {
      prefix: "Kartverket. (2026, 26. august). ",
      italic: "Norgeskart.no",
      suffix: ".",
      href: "https://www.kartverket.no/til-lands/kart/norgeskart",
    },
    {
      prefix: "Mæhlum, L. (2025, 22. februar). ",
      italic: "Kartogram",
      suffix: ". I Store norske leksikon.",
      href: "https://snl.no/kartogram",
    },
    {
      prefix:
        "Hunt, J., Hall, H., Costa, H., Sprout, E., Teng, S., McDaniel, M., Boudreau, D., Ramroop, T., & Rutledge, K. (2026, 15. september). ",
      italic: "Map",
      suffix: ". National Geographic Society.",
      href: "https://education.nationalgeographic.org/resource/map/",
    },
    {
      prefix: "NIBIO. (u.å.). ",
      italic: "Brukerveiledning Kilden",
      suffix: ". Hentet 6. november 2026.",
      href: "https://www.nibio.no/tjenester/kilden/brukerveiledning-kilden",
    },
    {
      prefix: "Orgeret, K. S., & Hatlen, J. F. (u.å.). ",
      italic: "Kildekritikk",
      suffix: ". I Store norske leksikon. Hentet 6. november 2026.",
      href: "https://snl.no/kildekritikk",
    },
    {
      prefix: "Pearson, D. K., Gary, R. H., & Wilson, Z. D. (2007). ",
      italic:
        "Geographic information systems, remote sensing, and spatial analysis activities in Texas, 2002–07",
      suffix: ". U.S. Geological Survey Fact Sheet 2007–3076.",
      href: "https://pubs.usgs.gov/fs/2007/3076/",
    },
    {
      prefix: "Rød, J. K. (2026, 30. oktober). ",
      italic: "Kartprojeksjon",
      suffix: ". I Store norske leksikon.",
      href: "https://snl.no/kartprojeksjon",
    },
    {
      prefix: "Sahr, W.-D. (u.å.). ",
      italic: "Mental map",
      suffix: ". I Lexikon der Geographie. Spektrum. Hentet 6. november 2026.",
      href: "https://www.spektrum.de/lexikon/geographie/mental-map/5011",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Geografi",
      suffix: ". Hentet 6. november 2026.",
      href: "https://snl.no/geografi",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Region",
      suffix: ". Hentet 6. november 2026.",
      href: "https://snl.no/region",
    },
    {
      prefix: "U.S. Geological Survey. (2025, 19. november). ",
      italic: "USGS Geographic Information Systems (GIS) educational resources",
      suffix: ".",
      href: "https://www.usgs.gov/centers/wetland-and-aquatic-research-center/science/usgs-geographic-information-systems-gis",
    },
    {
      prefix: "U.S. Geological Survey. (u.å.). ",
      italic: "Landsat 8",
      suffix: ". Hentet 6. november 2026.",
      href: "https://www.usgs.gov/landsat-missions/landsat-8",
    },
    {
      prefix: "Utdanningsdirektoratet. (u.å.). ",
      italic: "Geografi (GEO01-02): Kompetansemål og vurdering",
      suffix: ". Hentet 6. november 2026.",
      href: "https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49",
    },
  ] as const,
  "geo-feltarbeid": [] as const,
  "geo-indre-krefter": [] as const,
  "geo-landskap": [] as const,
  "geo-klima": [] as const,
  "geo-naturfare": [] as const,
  "geo-ressurser": [] as const,
  "geo-baerekraft": [] as const,
  "geo-naering": [] as const,
  "geo-befolkning": [] as const,
  "geo-migrasjon": [] as const,
};
