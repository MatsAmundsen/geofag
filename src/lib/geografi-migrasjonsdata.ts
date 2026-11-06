/** Daterte kildeuttrekk kontrollert 6. november 2026. Se docs/geografi-kap11-redaksjon.md.
 * SSB: registrerte flyttinger, ikke unike personer. UNHCR: publiserte, avrundede faktatall.
 * Ingen levende API-avhengighet eller konstruerte øvingsdata. */
export const MIGRASJON_KILDER = {
  "09588": {
    "href": "https://www.ssb.no/statbank/table/09588",
    "oppdatert": "2026-03-13",
    "sha256": "fd159966917b658ef7b8ba3f071d157504d7b5f6bcdf706f57425ed2edba1f6c"
  },
  "14753": {
    "href": "https://www.ssb.no/statbank/table/14753",
    "oppdatert": "2026-03-13",
    "sha256": "ca684361df968bf30aa9c09d70e85dd1a9027cd5e0c6e5cef966f51ed8ebd72d"
  },
  "07113": {
    "href": "https://www.ssb.no/statbank/table/07113",
    "oppdatert": "2026-08-28",
    "sha256": "0773449280d5d4f39943b758468adb677ed0cd9d014e95208c2eba2828bf7fe8"
  },
  "05803": {
    "href": "https://www.ssb.no/statbank/table/05803",
    "oppdatert": "2026-04-15",
    "sha256": "f291a81dbf91e63cfe5f89a784ea3b30e6b4a1b1bf4521dc9c54a32293f6eff9"
  }
} as const;
export const FLYTTING_REGIONER = [
  {
    "kode": "32",
    "navn": "Akershus",
    "type": "Fylke",
    "ar": 2025,
    "InnflyttingInnland": 30984,
    "UtflyttingInnland": 25862,
    "NettoInnland": 5122,
    "Innvandring": 5612,
    "Utvandring": 4491,
    "Nettoinnvandring": 1121,
    "FlyttInnlandPer1000": 6.9
  },
  {
    "kode": "3209",
    "navn": "Ullensaker",
    "type": "Kommune",
    "ar": 2025,
    "InnflyttingInnland": 3654,
    "UtflyttingInnland": 3073,
    "NettoInnland": 581,
    "Innvandring": 468,
    "Utvandring": 276,
    "Nettoinnvandring": 192,
    "FlyttInnlandPer1000": 12.8
  },
  {
    "kode": "0301",
    "navn": "Oslo",
    "type": "Kommune",
    "ar": 2025,
    "InnflyttingInnland": 31533,
    "UtflyttingInnland": 34977,
    "NettoInnland": -3444,
    "Innvandring": 9484,
    "Utvandring": 6919,
    "Nettoinnvandring": 2565,
    "FlyttInnlandPer1000": -4.7
  },
  {
    "kode": "18",
    "navn": "Nordland",
    "type": "Fylke",
    "ar": 2025,
    "InnflyttingInnland": 5297,
    "UtflyttingInnland": 6760,
    "NettoInnland": -1463,
    "Innvandring": 2885,
    "Utvandring": 1405,
    "Nettoinnvandring": 1480,
    "FlyttInnlandPer1000": -6
  },
  {
    "kode": "1804",
    "navn": "Bodø",
    "type": "Kommune",
    "ar": 2025,
    "InnflyttingInnland": 1895,
    "UtflyttingInnland": 2215,
    "NettoInnland": -320,
    "Innvandring": 426,
    "Utvandring": 329,
    "Nettoinnvandring": 97,
    "FlyttInnlandPer1000": -6
  },
  {
    "kode": "55",
    "navn": "Troms",
    "type": "Fylke",
    "ar": 2025,
    "InnflyttingInnland": 4821,
    "UtflyttingInnland": 5833,
    "NettoInnland": -1012,
    "Innvandring": 2776,
    "Utvandring": 1149,
    "Nettoinnvandring": 1627,
    "FlyttInnlandPer1000": -5.9
  },
  {
    "kode": "56",
    "navn": "Finnmark",
    "type": "Fylke",
    "ar": 2025,
    "InnflyttingInnland": 2381,
    "UtflyttingInnland": 2793,
    "NettoInnland": -412,
    "Innvandring": 1068,
    "Utvandring": 418,
    "Nettoinnvandring": 650,
    "FlyttInnlandPer1000": -5.5
  },
  {
    "kode": "5501",
    "navn": "Tromsø",
    "type": "Kommune",
    "ar": 2025,
    "InnflyttingInnland": 3162,
    "UtflyttingInnland": 3394,
    "NettoInnland": -232,
    "Innvandring": 1059,
    "Utvandring": 671,
    "Nettoinnvandring": 388,
    "FlyttInnlandPer1000": -2.9
  },
  {
    "kode": "5601",
    "navn": "Alta",
    "type": "Kommune",
    "ar": 2025,
    "InnflyttingInnland": 809,
    "UtflyttingInnland": 913,
    "NettoInnland": -104,
    "Innvandring": 260,
    "Utvandring": 96,
    "Nettoinnvandring": 164,
    "FlyttInnlandPer1000": -4.7
  }
] as const;
export const LANDSDEL_FLYTTING_RA = [
  {
    "fra": "La1",
    "til": "La1",
    "flyttinger": 46691
  },
  {
    "fra": "La2",
    "til": "La1",
    "flyttinger": 16064
  },
  {
    "fra": "La3",
    "til": "La1",
    "flyttinger": 4367
  },
  {
    "fra": "La4",
    "til": "La1",
    "flyttinger": 5117
  },
  {
    "fra": "La5",
    "til": "La1",
    "flyttinger": 3312
  },
  {
    "fra": "La6",
    "til": "La1",
    "flyttinger": 3441
  },
  {
    "fra": "La1",
    "til": "La2",
    "flyttinger": 17875
  },
  {
    "fra": "La2",
    "til": "La2",
    "flyttinger": 36905
  },
  {
    "fra": "La3",
    "til": "La2",
    "flyttinger": 3008
  },
  {
    "fra": "La4",
    "til": "La2",
    "flyttinger": 3233
  },
  {
    "fra": "La5",
    "til": "La2",
    "flyttinger": 2101
  },
  {
    "fra": "La6",
    "til": "La2",
    "flyttinger": 3048
  },
  {
    "fra": "La1",
    "til": "La3",
    "flyttinger": 3729
  },
  {
    "fra": "La2",
    "til": "La3",
    "flyttinger": 3172
  },
  {
    "fra": "La3",
    "til": "La3",
    "flyttinger": 22524
  },
  {
    "fra": "La4",
    "til": "La3",
    "flyttinger": 3424
  },
  {
    "fra": "La5",
    "til": "La3",
    "flyttinger": 976
  },
  {
    "fra": "La6",
    "til": "La3",
    "flyttinger": 1401
  },
  {
    "fra": "La1",
    "til": "La4",
    "flyttinger": 4034
  },
  {
    "fra": "La2",
    "til": "La4",
    "flyttinger": 2943
  },
  {
    "fra": "La3",
    "til": "La4",
    "flyttinger": 3071
  },
  {
    "fra": "La4",
    "til": "La4",
    "flyttinger": 19774
  },
  {
    "fra": "La5",
    "til": "La4",
    "flyttinger": 2015
  },
  {
    "fra": "La6",
    "til": "La4",
    "flyttinger": 1639
  },
  {
    "fra": "La1",
    "til": "La5",
    "flyttinger": 2440
  },
  {
    "fra": "La2",
    "til": "La5",
    "flyttinger": 2199
  },
  {
    "fra": "La3",
    "til": "La5",
    "flyttinger": 868
  },
  {
    "fra": "La4",
    "til": "La5",
    "flyttinger": 2113
  },
  {
    "fra": "La5",
    "til": "La5",
    "flyttinger": 10224
  },
  {
    "fra": "La6",
    "til": "La5",
    "flyttinger": 2222
  },
  {
    "fra": "La1",
    "til": "La6",
    "flyttinger": 2545
  },
  {
    "fra": "La2",
    "til": "La6",
    "flyttinger": 2222
  },
  {
    "fra": "La3",
    "til": "La6",
    "flyttinger": 1055
  },
  {
    "fra": "La4",
    "til": "La6",
    "flyttinger": 1403
  },
  {
    "fra": "La5",
    "til": "La6",
    "flyttinger": 1639
  },
  {
    "fra": "La6",
    "til": "La6",
    "flyttinger": 11088
  }
] as const;
export const INNVANDRING_GRUNN_RA = [
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "1",
    "personer": 25524
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "1",
    "personer": 26773
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "2",
    "personer": 7525
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "2",
    "personer": 2534
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "3",
    "personer": 13388
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "3",
    "personer": 8911
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "4",
    "personer": 1032
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "4",
    "personer": 1203
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "5",
    "personer": 876
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "5",
    "personer": 1244
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "6",
    "personer": 189
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "6",
    "personer": 243
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "8",
    "personer": 807
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "8",
    "personer": 74
  },
  {
    "ar": 2015,
    "grunn": "00",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "00",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "1",
    "personer": 16046
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "1",
    "personer": 8254
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "2",
    "personer": 153
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "2",
    "personer": 252
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "3",
    "personer": 1291
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "3",
    "personer": 1193
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "4",
    "personer": 396
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "4",
    "personer": 305
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "5",
    "personer": 113
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "5",
    "personer": 395
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "6",
    "personer": 106
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "6",
    "personer": 144
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "8",
    "personer": 6
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "8",
    "personer": 2
  },
  {
    "ar": 2015,
    "grunn": "01",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "01",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "1",
    "personer": 7524
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "1",
    "personer": 4164
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "2",
    "personer": 3058
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "2",
    "personer": 1422
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "3",
    "personer": 4880
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "3",
    "personer": 6041
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "4",
    "personer": 416
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "4",
    "personer": 622
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "5",
    "personer": 537
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "5",
    "personer": 637
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "6",
    "personer": 49
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "6",
    "personer": 73
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "8",
    "personer": 264
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "8",
    "personer": 36
  },
  {
    "ar": 2015,
    "grunn": "02",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "02",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "1",
    "personer": 64
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "1",
    "personer": 12573
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "2",
    "personer": 3839
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "2",
    "personer": 527
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "3",
    "personer": 4857
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "3",
    "personer": 674
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "4",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "4",
    "personer": 4
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "5",
    "personer": 4
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "5",
    "personer": 63
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "6",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "6",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "8",
    "personer": 518
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "8",
    "personer": 29
  },
  {
    "ar": 2015,
    "grunn": "03",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "03",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "1",
    "personer": 1705
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "1",
    "personer": 1387
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "2",
    "personer": 444
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "2",
    "personer": 250
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "3",
    "personer": 2342
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "3",
    "personer": 892
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "4",
    "personer": 212
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "4",
    "personer": 206
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "5",
    "personer": 218
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "5",
    "personer": 123
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "6",
    "personer": 34
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "6",
    "personer": 18
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "8",
    "personer": 8
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "8",
    "personer": 6
  },
  {
    "ar": 2015,
    "grunn": "04",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "04",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "1",
    "personer": 3
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "1",
    "personer": 17
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "2",
    "personer": 1
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "2",
    "personer": 56
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "3",
    "personer": 2
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "3",
    "personer": 75
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "4",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "4",
    "personer": 21
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "5",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "5",
    "personer": 13
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "6",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "6",
    "personer": 3
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "8",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "8",
    "personer": 1
  },
  {
    "ar": 2015,
    "grunn": "05",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "05",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "1",
    "personer": 182
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "1",
    "personer": 378
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "2",
    "personer": 30
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "2",
    "personer": 27
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "3",
    "personer": 16
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "3",
    "personer": 36
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "4",
    "personer": 8
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "4",
    "personer": 45
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "5",
    "personer": 4
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "5",
    "personer": 13
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "6",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "6",
    "personer": 5
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "8",
    "personer": 11
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "8",
    "personer": 0
  },
  {
    "ar": 2015,
    "grunn": "06",
    "landbakgrunn": "9",
    "personer": 0
  },
  {
    "ar": 2025,
    "grunn": "06",
    "landbakgrunn": "9",
    "personer": 0
  }
] as const;
export const MIGRASJON_HISTORIE = [
  {
    "ar": 1960,
    "innvandring": 13536,
    "utvandring": 18681
  },
  {
    "ar": 1970,
    "innvandring": 17383,
    "utvandring": 18352
  },
  {
    "ar": 1980,
    "innvandring": 18776,
    "utvandring": 14705
  },
  {
    "ar": 1990,
    "innvandring": 25494,
    "utvandring": 23784
  },
  {
    "ar": 2000,
    "innvandring": 36542,
    "utvandring": 26854
  },
  {
    "ar": 2010,
    "innvandring": 73852,
    "utvandring": 31506
  },
  {
    "ar": 2020,
    "innvandring": 38071,
    "utvandring": 26744
  },
  {
    "ar": 2025,
    "innvandring": 55243,
    "utvandring": 32919
  }
] as const;
export const UNHCR_FAKTA = {
  "referansedato": "2025-12-31",
  "publisert": "2026-06-11",
  "kontrollert": "2026-11-06",
  "kilde": "https://www.unhcr.org/global-trends",
  "nabolandKilde": "https://www.unhcr.org/refugee-statistics/insights/explainers/refugee-hosting-metrics.html",
  "tvungetFordrevneMillioner": 117.8,
  "flyktningerBredMillioner": 41.6,
  "asylsokereMillioner": 9,
  "interntFordrevneKonfliktMillioner": 68.7,
  "nabolandProsent": 65
} as const;

export const INNVANDRING_GRUNNER = [
  { kode: "01", navn: "Arbeid" }, { kode: "02", navn: "Familie" }, { kode: "03", navn: "Flukt" },
  { kode: "04", navn: "Utdanning" }, { kode: "06", navn: "Andre" }, { kode: "05", navn: "Ukjent" },
] as const;
export const INNVANDRING_GRUNN_SERIER = [2015, 2025].map((ar) => ({ ar,
  total: INNVANDRING_GRUNN_RA.filter((r) => r.ar === ar && r.grunn === "00").reduce((a, r) => a + r.personer, 0),
  grupper: INNVANDRING_GRUNNER.map((g) => ({ ...g,
    personer: INNVANDRING_GRUNN_RA.filter((r) => r.ar === ar && r.grunn === g.kode).reduce((a, r) => a + r.personer, 0),
  })),
}));
export const LANDSDELER = [
  { kode: "La1", navn: "Oslo og Akershus" }, { kode: "La2", navn: "Østlandet ellers" },
  { kode: "La3", navn: "Agder og Rogaland" }, { kode: "La4", navn: "Vestlandet" },
  { kode: "La5", navn: "Trøndelag" }, { kode: "La6", navn: "Nord-Norge" },
] as const;
export const NORD_SOR = {
  fraNord: LANDSDEL_FLYTTING_RA.filter((r) => r.fra === "La6" && r.til !== "La6").reduce((a, r) => a + r.flyttinger, 0),
  tilNord: LANDSDEL_FLYTTING_RA.filter((r) => r.til === "La6" && r.fra !== "La6").reduce((a, r) => a + r.flyttinger, 0),
  nordTilOsloAkershus: LANDSDEL_FLYTTING_RA.find((r) => r.fra === "La6" && r.til === "La1")!.flyttinger,
  osloAkershusTilNord: LANDSDEL_FLYTTING_RA.find((r) => r.fra === "La1" && r.til === "La6")!.flyttinger,
};
