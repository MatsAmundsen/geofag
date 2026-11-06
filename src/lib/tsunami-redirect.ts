/** Offentlig adresse for Tsunamikapitlet. CMS-nøkkelen er fortsatt jordskjelv-naturfare. */
export const TSUNAMI_PATH = "/geofag-1/tsunami";

/** Gammel adresse. Skal svare med permanent redirect, ikke 404 og ikke en ny lenke videre. */
export const LEGACY_NATURFARE_PATH = "/geofag-1/jordskjelv-naturfare";

/** 308 beholder metoden og er permanent. Ingen mellomstopp. */
export const TSUNAMI_REDIRECT_STATUS = 308;

/**
 * Bygger Location for redirectet. searchStr skal være tom eller starte med «?».
 * Hash sendes ikke til serveren, så den kan ikke legges på her.
 */
export function tsunamiRedirectHref(searchStr = ""): string {
  const search = searchStr === "" || searchStr.startsWith("?") ? searchStr : `?${searchStr}`;
  return `${TSUNAMI_PATH}${search}`;
}
