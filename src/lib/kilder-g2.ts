import type { Kilde } from "@/lib/kilder";

export const KILDER_G2 = {
  vaerkart: [
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Air masses and fronts",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/synoptic/air-masses",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.). ",
      italic: "Værkart og varsler",
      suffix: ".",
      href: "https://www.met.no/",
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
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "The sea breeze",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/ocean/sea-breezes",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.). ",
      italic: "Høytrykk og lavtrykk",
      suffix: ".",
      href: "https://www.met.no/",
    },
  ],
  kryosfare: [
    {
      prefix: "National Snow and Ice Data Center. (u.å.). ",
      italic: "All about sea ice",
      suffix: ".",
      href: "https://nsidc.org/learn/parts-cryosphere/sea-ice",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Bre",
      suffix: ".",
      href: "https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/bre/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Snøskredvarsling",
      suffix: ".",
      href: "https://www.varsom.no/sno/",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
  ],
  energi: [
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Havvind",
      suffix: ".",
      href: "https://www.nve.no/energi/energisystem/vindkraft/havvind/",
    },
    {
      prefix: "International Energy Agency. (u.å.). ",
      italic: "Wind",
      suffix: ".",
      href: "https://www.iea.org/energy-system/renewables/wind",
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
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Snøskredvarsling",
      suffix: ".",
      href: "https://www.varsom.no/sno/",
    },
  ],
  tilpasning: [
    {
      prefix: "Intergovernmental Panel on Climate Change. (2022). ",
      italic:
        "Climate change 2022: Impacts, adaptation and vulnerability. Contribution of Working Group II to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg2/",
    },
    {
      prefix: "Norsk klimaservicesenter. (u.å.). ",
      italic: "Klimaprofiler",
      suffix: ".",
      href: "https://klimaservicesenter.no/",
    },
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
  ],
} as const satisfies Record<string, readonly Kilde[]>;
