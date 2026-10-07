/**
 * Forenklet fysikk for figuren om dekompresjonssmelting under en tynn plate.
 * Kurvene er skjematiske: de viser formen, ikke presise laboratorieverdier.
 */


/** Trykk øker ca. 1 GPa per 31 km i øvre mantel (tetthet ca. 3300 kg/m³). */
export const KM_PER_GPA = 31;
/** Forenklet solidus for tørr peridotitt (°C) som funksjon av dyp (km). */
export function solidusAt(depthKm: number) {
  const p = depthKm / KM_PER_GPA;
  return 1120 + 133 * p - 5.1 * p * p;
}
/** Temperaturen i stigende mantel: 1300–1400 °C i astenosfæren, svakt stigende med dypet. */
export function mantleTempAt(depthKm: number) {
  return 1320 + 0.35 * depthKm;
}
function findOnset() {
  let lo = 0;
  let hi = 200;
  for (let i = 0; i < 40; i += 1) {
    const mid = (lo + hi) / 2;
    if (mantleTempAt(mid) > solidusAt(mid)) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
/** Dypet der stigende mantel krysser solidus. */
export const MELT_ONSET_KM = findOnset();
export const KEEL_KM = 150;
export const PLATE_MIN_KM = 20;
export const PLATE_MAX_KM = 150;

/** Relativ smeltemengde (0–1) når mantelen stiger opp til platens underside. */
export function meltAmountFor(plateKm: number) {
  return clamp((MELT_ONSET_KM - plateKm) / (MELT_ONSET_KM - PLATE_MIN_KM), 0, 1);
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
