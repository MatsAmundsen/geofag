/**
 * Månedlige normaler 1991–2020 (Meteorologisk institutt), lest fra Yr sin historikkside for stasjonene
 * Bergen – Florida og Oslo – Blindern (kolonnene «Normal» og «Normal mm», avrundet til hele mm og tideler °C).
 * Seklima ble ikke lest direkte (krever innlogging/API-nøkkel).
 */
export const BERGEN = {
  navn: "Bergen (Florida)",
  temp: [2.6, 2.3, 3.8, 7.2, 10.7, 13.6, 15.6, 15.4, 12.6, 8.6, 5.3, 3.1],
  ned: [256, 209, 202, 141, 109, 132, 158, 208, 248, 268, 275, 290],
  arsTemp: 8.4,
  arsNed: 2496,
  kald: { m: "februar", t: 2.3 },
  varm: { m: "juli", t: 15.6 },
};
export const OSLO = {
  navn: "Oslo (Blindern)",
  temp: [-2.3, -2.0, 1.3, 6.2, 11.4, 15.3, 17.7, 16.5, 12.2, 6.6, 2.2, -1.4],
  ned: [58, 46, 41, 48, 60, 80, 87, 103, 82, 93, 85, 54],
  arsTemp: 7.0,
  arsNed: 836,
  kald: { m: "januar", t: -2.3 },
  varm: { m: "juli", t: 17.7 },
};
