/** Verified SSB 09174 extract, 2026-11-06. Values are in 1000 persons.
 * Source: employed persons, employees AND self-employed; all Norway, not mainland only.
 * Selected years only. No values after the 2023 benchmark year are included.
 * Data: SSB, CC BY 4.0. Grouping, residual and percentages are our calculations.
 */
export const NAERING_KILDE = {
  tabell: "09174",
  variabel: "Sysselsatte",
  enhet: "1000 personer",
  geografi: "Norge, totalt for næringer",
  oppdatert: "2026-05-28",
  kontrollert: "2026-11-06",
  href: "https://www.ssb.no/statbank/table/09174",
  api: "https://data.ssb.no/api/v0/no/table/09174",
  lisens: "https://creativecommons.org/licenses/by/4.0/",
  sha256: "13f3d229210e021b4f818ff25955dcad654192c5a758d2580c80ce7335eaa3ad",
} as const;

export const NAERING_AR = [1970, 1980, 1990, 2000, 2010, 2020, 2023] as const;
export const NAERING_RASERIER = [
  {
    "kode": "nr23_6",
    "navn": "Totalt for næringer",
    "tall": [
      1622.5,
      1934.6,
      2046.3,
      2313.7,
      2555.3,
      2799,
      2973.3
    ]
  },
  {
    "kode": "nr23ind",
    "navn": "Industri",
    "tall": [
      357.4,
      349.5,
      267.9,
      273.4,
      231.8,
      219.4,
      227.6
    ]
  },
  {
    "kode": "pub2X35",
    "navn": "Elektrisitets-, gass- og varmtvannsforsyning",
    "tall": [
      14,
      17.4,
      20.2,
      17.3,
      14.4,
      16.6,
      18.2
    ]
  },
  {
    "kode": "pub2X36_39",
    "navn": "Vannforsyning, avløp og renovasjon",
    "tall": [
      4.3,
      5.6,
      6.3,
      9.2,
      14,
      17.6,
      19.2
    ]
  },
  {
    "kode": "pub2X41_43",
    "navn": "Bygge- og anleggsvirksomhet",
    "tall": [
      113.3,
      125.1,
      123.6,
      133.6,
      182.8,
      247.5,
      260.6
    ]
  },
  {
    "kode": "A38NP2X01_03",
    "navn": "Jordbruk, skogbruk og fiske",
    "tall": [
      212.9,
      164.6,
      128.4,
      96.3,
      65.7,
      66.1,
      68.3
    ]
  },
  {
    "kode": "A38NP2X05_09",
    "navn": "Bergverksdrift og oljeutvinning",
    "tall": [
      9.3,
      19,
      27,
      29.7,
      59,
      63.6,
      67.9
    ]
  }
] as const;

const sekundarKoder = ["A38NP2X05_09", "nr23ind", "pub2X35", "pub2X36_39", "pub2X41_43"];

// Integer tenths retain the precision of the published source values during aggregation.
export const NAERING_STRUKTUR = NAERING_AR.map((ar, index) => {
  const tideler = (kode: string) => Math.round(NAERING_RASERIER.find((serie) => serie.kode === kode)!.tall[index] * 10);
  const total = tideler("nr23_6");
  const primaer = tideler("A38NP2X01_03");
  const sekundaer = sekundarKoder.reduce((sum, kode) => sum + tideler(kode), 0);
  const tertiaer = total - primaer - sekundaer;
  return {
    ar, total: total / 10, primaer: primaer / 10, sekundaer: sekundaer / 10, tertiaer: tertiaer / 10,
    andeler: [primaer, sekundaer, tertiaer].map((verdi) => 100 * verdi / total),
  };
});
