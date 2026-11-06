/** Enhetsomregning for et uttrykkelig valgt, konstant modellinput. Ikke målte platehastigheter. */
export function plateavstandKm(cmPerAr: number, ar: number): number | null {
  if (!Number.isFinite(cmPerAr) || !Number.isFinite(ar) || cmPerAr < 0 || ar < 0) return null;
  return cmPerAr * ar / 100000;
}
