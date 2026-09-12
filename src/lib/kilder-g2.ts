import type { Kilde } from "@/lib/kilder";

export const KILDER_G2 = {
  vaerkart: [
    {
      prefix: "Sivle, A. (2009, 31. august). ",
      italic: "Værkart og fronter",
      suffix: ".",
      href: "https://www.yr.no/artikkel/vaerkart-og-fronter-1.6750800",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.). ",
      italic: "Air masses",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/synoptic/air-masses",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Front (meteorologi)",
      suffix: ".",
      href: "https://snl.no/front_-_meteorologi",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Polarfront",
      suffix: ".",
      href: "https://snl.no/polarfront",
    },
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
  ],
  lokale: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.). ",
      italic: "The sea breeze",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/ocean/sea-breeze",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Polarfront",
      suffix: ".",
      href: "https://snl.no/polarfront",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Sjøbris",
      suffix: ".",
      href: "https://snl.no/sj%C3%B8bris",
    },
    {
      prefix: "Store norske leksikon. (u.å.-c). ",
      italic: "Orografisk nedbør",
      suffix: ".",
      href: "https://snl.no/orografisk_nedb%C3%B8r",
    },
    {
      prefix: "Store norske leksikon. (u.å.-d). ",
      italic: "Regnskygge",
      suffix: ".",
      href: "https://snl.no/regnskygge",
    },
  ],
  kryosfare: [
    {
      prefix: "National Snow and Ice Data Center [NSIDC]. (u.å.). ",
      italic: "All about sea ice",
      suffix: ".",
      href: "https://nsidc.org/learn/parts-cryosphere/sea-ice",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-a). ",
      italic: "Bre",
      suffix: ".",
      href: "https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/bre/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-b). ",
      italic: "Snøskredvarsling",
      suffix: ".",
      href: "https://www.varsom.no/snoskred",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Permafrost",
      suffix: ".",
      href: "https://snl.no/permafrost",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
  ],
  energi: [
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-a). ",
      italic: "Havvind",
      suffix: ".",
      href: "https://www.nve.no/energi/energisystem/havvind/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-b). ",
      italic: "Vindkraft",
      suffix: ".",
      href: "https://www.nve.no/energi/energisystem/vindkraft/",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Tidevann",
      suffix: ".",
      href: "https://snl.no/tidevann",
    },
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
  ],
  feltG2: [
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.). ",
      italic: "Snøskredvarsling",
      suffix: ".",
      href: "https://www.varsom.no/snoskred",
    },
  ],
  tilpasning: [
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2022). ",
      italic:
        "Climate change 2022: Impacts, adaptation and vulnerability. Contribution of Working Group II to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg2/",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Klima i Norge",
      suffix: ".",
      href: "https://snl.no/Klima_i_Norge",
    },
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
  ],
} as const satisfies Record<string, readonly Kilde[]>;
