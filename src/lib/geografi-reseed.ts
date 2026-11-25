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
 * - ellers er raden redigert i CMS → ALDRI overskriv, bare meld avvik
 *
 * Skrivingen er betinget: `save` får teksten vi leste, og lagrer bare hvis raden fortsatt har
 * nøyaktig den teksten. En CMS-lagring mellom lesing og skriving vinner da alltid.
 *
 * En samlet versjonsnøkkel (hash av alle md-tekstene) gjør at løkka hoppes over
 * med ett DO-kall når ingenting er endret.
 */

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
 * Skjelettstubbene (commit ddf9482, «## Planlagte underkapitler» / «Innholdet er under arbeid»),
 * én per kapittel, som `textHash`. Bare en rad som er tegn for tegn lik stubben regnes som stubb.
 * Det finnes ingen lengde- eller merkeheuristikk: en tekst Mats har redigert, er aldri en stubb,
 * selv om den fortsatt inneholder et av skjelettmerkene. Generert fra git-historikken til
 * src/lib/posts/geo-*.md (alle versjoner med et skjelettmerke).
 */
export const GEO_STUB_HASHES: Readonly<Record<string, readonly string[]>> = {
  "geo-baerekraft": ["r1-22e26db5-850a10cd"],
  "geo-befolkning": ["q0-e92dcad1-10e1389b"],
  "geo-feltarbeid": ["ov-e187c604-7b6d6982"],
  "geo-indre-krefter": ["t7-43d0d6d3-ac13a993"],
  "geo-klima": ["tu-b80d51bf-2731d929"],
  "geo-landskap": ["q9-4db9fe02-6dff58d8"],
  "geo-migrasjon": ["n8-43641b8d-d283529d"],
  "geo-naering": ["ok-45c22c99-3d847891"],
  "geo-naturfare": ["si-3e8469be-42bf4b48"],
  "geo-ressurser": ["rb-447e665d-8876363b"],
  "geo-verktoy": ["ta-57b88188-24c56248"],
};

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
    const untouched = lastWritten !== null && lastWritten === textHash(existing.bodyMarkdown);
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
  if (result.avvik.length > 0) {
    console.warn(
      `[posts] Geografi: CMS-teksten avviker fra md og er IKKE overskrevet: ${result.avvik.join(", ")}`,
    );
  }
  return result;
}
