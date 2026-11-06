/** Offentlig adresse for Tsunamikapitlet. CMS-nøkkelen er fortsatt jordskjelv-naturfare. */
export const TSUNAMI_PATH = "/geofag-1/tsunami";

/** Jordskjelvkapitlet, dit skade, skjelvvarsling og risiko flyttet. */
export const JORDSKJELV_PATH = "/geofag-1/jordskjelv";

/** Gammel adresse. Skal svare med permanent redirect, ikke 404 og ikke en ny lenke videre. */
export const LEGACY_NATURFARE_PATH = "/geofag-1/jordskjelv-naturfare";

/** 308 beholder metoden og er permanent. Ingen mellomstopp. */
export const TSUNAMI_REDIRECT_STATUS = 308;

/** Offentlig ENSO-adresse. */
export const ENSO_PATH = "/tema/klima/enso";

/** Gammel ENSO-adresse uten klimaleddet. */
export const LEGACY_ENSO_PATH = "/tema/enso";

export const ENSO_REDIRECT_STATUS = 308;

function withSearch(path: string, searchStr = ""): string {
  const search = searchStr === "" || searchStr.startsWith("?") ? searchStr : `?${searchStr}`;
  return `${path}${search}`;
}

/**
 * Bygger Location for redirectet. searchStr skal være tom eller starte med «?».
 * Hash sendes ikke til serveren, så den kan ikke legges på her.
 */
export function tsunamiRedirectHref(searchStr = ""): string {
  return withSearch(TSUNAMI_PATH, searchStr);
}

/** Samme 308-mønster for den gamle ENSO-adressen. Hash følger med i nettleseren. */
export function ensoRedirectHref(searchStr = ""): string {
  return withSearch(ENSO_PATH, searchStr);
}

export type LegacyNaturfareAnchor = {
  /** Id slik kapittelskanningen ga den på den gamle naturfaresiden. */
  from: string;
  path: typeof TSUNAMI_PATH | typeof JORDSKJELV_PATH;
  id: string;
};

/**
 * Overskrift-ankere fra /geofag-1/jordskjelv-naturfare før c979b13.
 * H2-er er sidens synlige ankere. H3-er fikk id i skanningen når en bolk hadde minst to underoverskrifter.
 * Ankere som fortsatt heter det samme på Tsunami, peker på seg selv og skal ikke flyttes.
 */
export const LEGACY_NATURFARE_ANCHORS: readonly LegacyNaturfareAnchor[] = [
  { from: "tsunami-skjelv-eller-skred", path: TSUNAMI_PATH, id: "hva-er-en-tsunami" },
  { from: "hvilke-skader-gjoer-jordskjelv", path: JORDSKJELV_PATH, id: "jordskjelv-som-naturfare" },
  { from: "hva-avgjoer-hvor-store-skadene-blir", path: JORDSKJELV_PATH, id: "jordskjelv-som-naturfare" },
  { from: "rystelser-og-bygninger", path: JORDSKJELV_PATH, id: "jordskjelv-som-naturfare" },
  { from: "skred-og-likvefaksjon", path: JORDSKJELV_PATH, id: "jordskjelv-som-naturfare" },
  { from: "brann-tsunami-og-etterskjelv", path: JORDSKJELV_PATH, id: "jordskjelv-som-naturfare" },
  { from: "er-det-mulig-a-varsle-jordskjelv", path: JORDSKJELV_PATH, id: "kan-jordskjelv-varsles" },
  { from: "langtidsvarsling", path: JORDSKJELV_PATH, id: "kan-jordskjelv-varsles" },
  { from: "korttidsvarsling", path: JORDSKJELV_PATH, id: "kan-jordskjelv-varsles" },
  { from: "tidlig-varsling-noen-sekunder-kan-redde-liv", path: JORDSKJELV_PATH, id: "kan-jordskjelv-varsles" },
  { from: "tsunamivarsling", path: TSUNAMI_PATH, id: "hvordan-varsles-en-tsunami" },
  { from: "fare-og-risiko", path: JORDSKJELV_PATH, id: "fare-risiko-og-forebygging" },
  { from: "en-enkel-risikomodell", path: JORDSKJELV_PATH, id: "fare-risiko-og-forebygging" },
  { from: "gjentaksintervall-hvor-ofte-kommer-et-stort-skjelv", path: JORDSKJELV_PATH, id: "fare-risiko-og-forebygging" },
  { from: "hva-om-1904-skjelvet-kom-i-dag", path: JORDSKJELV_PATH, id: "fare-risiko-og-forebygging" },
  { from: "hva-modellen-ikke-viser", path: JORDSKJELV_PATH, id: "fare-risiko-og-forebygging" },
  { from: "viktige-begreper", path: TSUNAMI_PATH, id: "viktige-begreper" },
  { from: "sammendrag", path: TSUNAMI_PATH, id: "sammendrag" },
  { from: "test-deg-selv", path: TSUNAMI_PATH, id: "test-deg-selv" },
];

/**
 * Ny adresse når hashen er et gammelt anker som ikke lenger er seg selv på Tsunami.
 * Ukjent hash og uendret Tsunami-anker gir null, så nettleseren får være i fred.
 */
export function legacyNaturfareRedirect(hash: string, searchStr = ""): string | null {
  let id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return null;
  try {
    id = decodeURIComponent(id);
  } catch {
    return null;
  }
  const hit = LEGACY_NATURFARE_ANCHORS.find((row) => row.from === id);
  if (!hit || (hit.path === TSUNAMI_PATH && hit.id === id)) return null;
  return `${withSearch(hit.path, searchStr)}#${hit.id}`;
}
