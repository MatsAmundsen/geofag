/** MET station normals, checked against the original files on 2026-11-06.
 * TAM: monthly mean temperature, degrees Celsius. RR: monthly precipitation, mm.
 * Values are published calculated normals, not individual raw observations.
 * Data from Meteorologisk institutt, CC BY 4.0; unstarred station 18700.
 */
export const KLIMANORMAL_STASJON = {
  id: 18700,
  navn: "Oslo – Blindern",
  hoydeMeter: 94,
  periode: "1991–2020",
  temperaturKode: "TAM",
  nedborKode: "RR",
  arsnormalTemperatur: 7.0,
  arsnormalNedbor: 837,
  temperaturKilde: "https://www.met.no/kss/_/attachment/download/a2d191d6-b9ef-4d78-ac26-9eee4ce28743:969dfb48bad54d95b9dca7685778f05448f42892/StNormaler_mnd_middeltemp_1991-2020.txt",
  nedborKilde: "https://www.met.no/kss/_/attachment/download/bb6a7fc4-429b-48a7-9788-9c5651774ba4:2a626567cdf7a7822a683029f30d0f8bf21efc18/StNormaler_mnd_nedbor_1991-2020_rettet.txt",
  lisens: "https://creativecommons.org/licenses/by/4.0/",
  temperaturSha256: "97a951db97cd6762b28b8fec842a60830182da76a21952b47c82015b022904d0",
  nedborSha256: "d41446f775429ccb6c12eb962a6bf0367beb32f2305adb19beada4bb23260e78",
} as const;

/** January–December, preserving the precision in each MET source file. */
export const OSLO_BLINDERN_NORMALER = [
  ["Jan", -2.3, 58],
  ["Feb", -2.0, 46],
  ["Mar", 1.3, 41],
  ["Apr", 6.2, 48],
  ["Mai", 11.4, 60],
  ["Jun", 15.3, 80],
  ["Jul", 17.7, 87],
  ["Aug", 16.5, 103],
  ["Sep", 12.2, 82],
  ["Okt", 6.6, 93],
  ["Nov", 2.2, 85],
  ["Des", -1.4, 54],
] as const;
