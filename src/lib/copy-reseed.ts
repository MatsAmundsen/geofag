/**
 * Engangs-reseed av kapitteltekster etter en tekstrettelse (`COPY_RESEEDS`).
 *
 * Durable Object og D1 husker hvert flagg. For at en kald isolate ikke skal gjøre
 * to DO-kall per oppføring (get + getMeta) før første svar, lagres i tillegg én
 * samlet versjonsnøkkel for hele flagglista. Stemmer den, er alle flaggene allerede
 * satt, og løkka hoppes over. Lokal Postgres har ingen meta-tabell og bruker
 * fortsatt stale-markørene hver gang.
 */

export type CopyReseed = { flag: string; slug: string; stale: string[] };

export type ReseedSeed<I> = { slug: string; bodyMarkdown: string; input: () => I };

export type ReseedStore<I> = {
  persist: string;
  get: (slug: string) => Promise<{ bodyMarkdown: string; published?: number | null } | null>;
  save: (input: I & { published: number }) => Promise<void>;
  getMeta: (key: string) => Promise<string | null>;
  setMeta: (key: string, value: string) => Promise<void>;
};

/** Meta-nøkkelen som sier at alle flaggene i `COPY_RESEEDS` er satt. */
export const COPY_RESEEDS_VERSION_META = "copy-reseeds-version";

function fnv1a(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function djb2(text: string): number {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) hash = (Math.imul(hash, 33) + text.charCodeAt(i)) | 0;
  return hash >>> 0;
}

/** Endres når et flagg eller en slug legges til, fjernes eller endres. */
export function copyReseedsVersion(items: readonly CopyReseed[]): string {
  const text = items.map((item) => `${item.flag}\u0000${item.slug}`).join("\n");
  return `v1:${items.length}:${fnv1a(text).toString(16)}:${djb2(text).toString(16)}`;
}

export function isDurablePersist(persist: string): boolean {
  return persist === "do" || persist === "d1";
}

export async function reseedFlaggedCopies<I>(
  store: ReseedStore<I>,
  items: readonly CopyReseed[],
  seeds: readonly ReseedSeed<I>[],
): Promise<void> {
  const durable = isDurablePersist(store.persist);
  const version = copyReseedsVersion(items);
  if (durable && (await store.getMeta(COPY_RESEEDS_VERSION_META)) === version) return;

  // Versjonsnøkkelen skrives bare når hvert flagg faktisk er satt. Mangler en seed
  // eller en rad, blir flagget stående usatt, og løkka kjøres igjen neste gang,
  // akkurat som før.
  let everyFlagSet = true;
  for (const item of items) {
    const seed = seeds.find((row) => row.slug === item.slug);
    if (!seed) {
      everyFlagSet = false;
      continue;
    }
    const existing = await store.get(item.slug);
    if (!existing) {
      everyFlagSet = false;
      continue;
    }
    if (existing.bodyMarkdown === seed.bodyMarkdown) {
      if (durable && !(await store.getMeta(item.flag))) await store.setMeta(item.flag, "1");
      continue;
    }
    if (durable) {
      if (await store.getMeta(item.flag)) continue;
    } else if (!item.stale.some((marker) => existing.bodyMarkdown.includes(marker))) {
      continue;
    }
    await store.save({ ...seed.input(), published: existing.published ?? 1 });
    if (durable) await store.setMeta(item.flag, "1");
  }
  if (durable && everyFlagSet) await store.setMeta(COPY_RESEEDS_VERSION_META, version);
}

/**
 * Kjører `run` høyst én gang per nøkkel og isolate. Samtidige kall deler samme
 * løfte. Feiler kjøringen, glemmes nøkkelen, så neste forespørsel prøver igjen.
 */
export function oncePerKey(): (key: string, run: () => Promise<void>) => Promise<void> {
  const done = new Set<string>();
  const inflight = new Map<string, Promise<void>>();
  return (key, run) => {
    if (done.has(key)) return Promise.resolve();
    const running = inflight.get(key);
    if (running) return running;
    const promise = run().then(
      () => {
        done.add(key);
        inflight.delete(key);
      },
      (err: unknown) => {
        inflight.delete(key);
        throw err;
      },
    );
    inflight.set(key, promise);
    return promise;
  };
}
