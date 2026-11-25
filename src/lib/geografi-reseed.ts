/**
 * Geografi (geo-*): md-fila er kilden for kapitteltekst som ingen har redigert i CMS.
 *
 * Problemet med engangsflaggene i `copy-reseeds-b.ts` er at en rad i Durable Object
 * bare oppdateres når noen husker å legge inn et nytt flagg. Rettes md-teksten uten
 * nytt flagg, blir den gamle raden (i verste fall skjelettets stubb) stående.
 *
 * Her lagres i stedet en hash av teksten vi selv skrev sist (`seed-hash:<slug>`):
 * - raden er lik md → bare noter hashen
 * - raden er en kjent stubb (skjelettmerker) → skriv md
 * - raden er lik det vi skrev sist (hash stemmer) → ingen har redigert den, skriv md
 * - ellers er raden redigert i CMS → ALDRI overskriv, bare meld avvik
 *
 * En samlet versjonsnøkkel (hash av alle md-tekstene) gjør at løkka hoppes over
 * med ett DO-kall når ingenting er endret.
 */

export type GeoSeed = { slug: string; bodyMarkdown: string };

export type GeoReseedStore = {
  persist: string;
  get: (slug: string) => Promise<{ bodyMarkdown: string; published?: number | null } | null>;
  save: (slug: string, published: number) => Promise<void>;
  getMeta: (key: string) => Promise<string | null>;
  setMeta: (key: string, value: string) => Promise<void>;
};

export type GeoReseedResult = {
  skipped: boolean;
  written: string[];
  avvik: string[];
};

/**
 * Tekst som bare skjelettet (PR A) hadde. `FIGURPLASSHOLDER` er bevisst IKKE med:
 * den står i ferdige kapitler (8.5) og kan stå i en tekst Mats har redigert.
 */
export const GEO_STUB_MARKERS = [
  "## Planlagte underkapitler",
  "Innholdet er under arbeid",
] as const;
/** Skjelettstubbene var 1–2 kB. En lang tekst med et av merkene er ikke en stubb. */
export const GEO_STUB_MAX_LENGTH = 8000;

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

export function isGeoStub(body: string): boolean {
  if (!body.trim()) return true;
  return (
    body.length < GEO_STUB_MAX_LENGTH && GEO_STUB_MARKERS.some((marker) => body.includes(marker))
  );
}

export function geoSeedsVersion(seeds: readonly GeoSeed[]): string {
  return `v1:${textHash(seeds.map((s) => `${s.slug}\u0000${textHash(s.bodyMarkdown)}`).join("\n"))}`;
}

export async function reseedGeografiFromMd(
  store: GeoReseedStore,
  seeds: readonly GeoSeed[],
): Promise<GeoReseedResult> {
  const durable = store.persist === "do" || store.persist === "d1";
  const version = geoSeedsVersion(seeds);
  const result: GeoReseedResult = { skipped: false, written: [], avvik: [] };
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
    if (isGeoStub(existing.bodyMarkdown) || untouched) {
      await store.save(seed.slug, existing.published ?? 1);
      if (durable) await store.setMeta(hashKey, seedHash);
      result.written.push(seed.slug);
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
