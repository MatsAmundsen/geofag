/**
 * Geografi (geo-*): md-fila er kilden for kapitteltekst som ingen har redigert i CMS.
 *
 * Problemet med engangsflaggene i `copy-reseeds-b.ts` er at en rad i Durable Object
 * bare oppdateres når noen husker å legge inn et nytt flagg. Rettes md-teksten uten
 * nytt flagg, blir den gamle raden (i verste fall skjelettets stubb) stående.
 *
 * Her lagres i stedet en hash av teksten vi selv skrev sist (`seed-hash:<slug>`):
 * - raden er lik md → bare noter hashen
 * - raden er tom eller tegn for tegn lik skjelettstubben (hash i GEO_STUB_HASHES) → skriv md
 * - raden er lik det vi skrev sist (hash stemmer) → ingen har redigert den, skriv md
 * - raden er lik en tidligere md-versjon fra git (GEO_TIDLIGERE_MD_HASHES) → seedet av oss, skriv md
 * - ellers er raden redigert i CMS → ALDRI overskriv, bare meld avvik
 *
 * Skrivingen er betinget: `save` får teksten vi leste, og lagrer bare hvis raden fortsatt har
 * nøyaktig den teksten. En CMS-lagring mellom lesing og skriving vinner da alltid.
 *
 * En samlet versjonsnøkkel (hash av alle md-tekstene) gjør at løkka hoppes over
 * med ett DO-kall når ingenting er endret.
 */

import { GEO_STUB_HASHES, GEO_TIDLIGERE_MD_HASHES } from "./geografi-md-historikk.ts";

export type GeoSeed = { slug: string; bodyMarkdown: string };

export type GeoReseedStore = {
  persist: string;
  get: (slug: string) => Promise<{ bodyMarkdown: string; published?: number | null } | null>;
  /**
   * Skriv md-teksten for `slug` bare hvis raden fortsatt har `expectedBody` (betinget skriving).
   * Returnerer false hvis raden er endret i mellomtiden; da skrives ingenting.
   */
  save: (slug: string, published: number, expectedBody: string) => Promise<boolean>;
  getMeta: (key: string) => Promise<string | null>;
  setMeta: (key: string, value: string) => Promise<void>;
};

export type GeoReseedResult = {
  skipped: boolean;
  written: string[];
  avvik: string[];
  /** Rader som ble endret mellom lesing og betinget skriving, og derfor ikke ble skrevet. */
  kollisjon: string[];
};

/**
 * Kjente tekster vi selv har seedet, generert fra git-historikken til src/lib/posts/geo-*.md
 * (scripts/geografi-md-hashes.mts → geografi-md-historikk.ts):
 * - GEO_STUB_HASHES: skjelettstubbene fra ddf9482. Bare en rad som er tegn for tegn lik stubben
 *   regnes som stubb; ingen lengde- eller merkeheuristikk.
 * - GEO_TIDLIGERE_MD_HASHES: alle tidligere md-versjoner, også den på origin/main 52ae17a. Main
 *   har ingen seed-hash i meta, så uten denne lista ville rader main har seedet, blitt meldt som
 *   avvik og aldri oppdatert ved første deploy.
 * En rad som avviker fra alle kjente versjoner, er redigert i CMS og overskrives aldri.
 */
export { GEO_STUB_HASHES, GEO_TIDLIGERE_MD_HASHES };

export const GEO_RESEED_VERSION_META = "geografi-md-versjon";
export const GEO_AVVIK_META = "geografi-cms-avvik";
export const geoSeedHashMeta = (slug: string) => `seed-hash:${slug}`;

export function textHash(text: string): string {
  let a = 0x811c9dc5;
  let b = 5381;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193);
    b = (Math.imul(b, 33) + c) | 0;
  }
  return `${text.length.toString(36)}-${(a >>> 0).toString(16)}-${(b >>> 0).toString(16)}`;
}

/** Ren stubb: tom rad eller nøyaktig skjelettstubben for kapitlet. */
export function isGeoStub(
  slug: string,
  body: string,
  stubHashes: Readonly<Record<string, readonly string[]>> = GEO_STUB_HASHES,
): boolean {
  if (!body.trim()) return true;
  return (stubHashes[slug] ?? []).includes(textHash(body));
}

export function geoSeedsVersion(seeds: readonly GeoSeed[]): string {
  return `v1:${textHash(seeds.map((s) => `${s.slug}\u0000${textHash(s.bodyMarkdown)}`).join("\n"))}`;
}

export async function reseedGeografiFromMd(
  store: GeoReseedStore,
  seeds: readonly GeoSeed[],
  stubHashes: Readonly<Record<string, readonly string[]>> = GEO_STUB_HASHES,
  tidligereHashes: Readonly<Record<string, readonly string[]>> = GEO_TIDLIGERE_MD_HASHES,
): Promise<GeoReseedResult> {
  const durable = store.persist === "do" || store.persist === "d1";
  const version = geoSeedsVersion(seeds);
  const result: GeoReseedResult = { skipped: false, written: [], avvik: [], kollisjon: [] };
  if (durable && (await store.getMeta(GEO_RESEED_VERSION_META)) === version) {
    return { ...result, skipped: true };
  }
  let complete = true;
  for (const seed of seeds) {
    const existing = await store.get(seed.slug);
    if (!existing) {
      // Manglende rad settes inn av den vanlige kapittelseedingen.
      complete = false;
      continue;
    }
    const seedHash = textHash(seed.bodyMarkdown);
    const hashKey = geoSeedHashMeta(seed.slug);
    if (existing.bodyMarkdown === seed.bodyMarkdown) {
      if (durable && (await store.getMeta(hashKey)) !== seedHash)
        await store.setMeta(hashKey, seedHash);
      continue;
    }
    const lastWritten = durable ? await store.getMeta(hashKey) : null;
    const radHash = textHash(existing.bodyMarkdown);
    const untouched =
      (lastWritten !== null && lastWritten === radHash) ||
      (tidligereHashes[seed.slug] ?? []).includes(radHash);
    if (isGeoStub(seed.slug, existing.bodyMarkdown, stubHashes) || untouched) {
      const saved = await store.save(seed.slug, existing.published ?? 1, existing.bodyMarkdown);
      if (saved) {
        if (durable) await store.setMeta(hashKey, seedHash);
        result.written.push(seed.slug);
      } else {
        // Raden ble endret (CMS-lagring) mellom lesing og skriving. Ikke rørt; prøv neste gang.
        complete = false;
        result.kollisjon.push(seed.slug);
      }
      continue;
    }
    result.avvik.push(seed.slug);
  }
  if (durable) {
    await store.setMeta(GEO_AVVIK_META, result.avvik.join(","));
    if (complete) await store.setMeta(GEO_RESEED_VERSION_META, version);
  }
  if (result.written.length > 0) {
    console.info(`[posts] Geografi: oppdatert fra md: ${result.written.join(", ")}`);
  }
  if (result.kollisjon.length > 0) {
    console.warn(
      `[posts] Geografi: raden ble endret under reseed og er IKKE skrevet (prøves igjen): ${result.kollisjon.join(", ")}`,
    );
  }
  if (result.avvik.length > 0) {
    console.warn(
      `[posts] Geografi: CMS-teksten avviker fra md og er IKKE overskrevet: ${result.avvik.join(", ")}`,
    );
  }
  return result;
}
