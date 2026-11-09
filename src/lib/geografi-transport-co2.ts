/** Direkte CO₂ per personkilometer, 2020. Engedal et al. (2021), SSB tabell 1, CC BY 4.0. */
export const TRANSPORT_FAKTORER = [
  { id: "bensin", navn: "Personbil, bensin", gram: 76.9 },
  { id: "diesel", navn: "Personbil, diesel", gram: 70.4 },
  { id: "buss", navn: "Buss, diesel (ikke turbuss)", gram: 92.4 },
] as const;
export function transportCO2(kilometer: readonly number[]): number | null {
  if (kilometer.length !== TRANSPORT_FAKTORER.length || kilometer.some((x) => !Number.isFinite(x) || x < 0)) return null;
  return kilometer.reduce((sum, km, i) => sum + km * TRANSPORT_FAKTORER[i].gram / 1000, 0);
}
