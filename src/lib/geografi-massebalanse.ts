/**
 * En konstruert differanse for samme areal og periode, i meter vannekvivalent.
 * Ingen temperaturrespons, bretype eller prognose for frontposisjon inngår.
 * Avrundingen følger øvingens tidels meter, ikke en målenøyaktighet i naturen.
 */
export function beregnGeografiMassebalanse(tilforsel: number, tap: number): number {
  return Math.round((tilforsel - tap) * 10) / 10;
}
