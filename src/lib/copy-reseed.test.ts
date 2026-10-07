import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  COPY_RESEEDS_VERSION_META,
  copyReseedsVersion,
  oncePerKey,
  reseedFlaggedCopies,
  type CopyReseed,
  type ReseedSeed,
  type ReseedStore,
} from "./copy-reseed.ts";

type Input = { slug: string; bodyMarkdown: string; published?: number };

function fakeStore(persist: string, rows: Record<string, string>, meta: Record<string, string> = {}) {
  const calls = { get: 0, getMeta: 0, setMeta: 0, save: [] as string[] };
  const store: ReseedStore<Input> = {
    persist,
    async get(slug) {
      calls.get++;
      return slug in rows ? { bodyMarkdown: rows[slug], published: 1 } : null;
    },
    async save(input) {
      calls.save.push(input.slug);
      rows[input.slug] = input.bodyMarkdown;
    },
    async getMeta(key) {
      calls.getMeta++;
      return key in meta ? meta[key] : null;
    },
    async setMeta(key, value) {
      calls.setMeta++;
      meta[key] = value;
    },
  };
  return { store, calls, rows, meta };
}

function seed(slug: string, bodyMarkdown: string): ReseedSeed<Input> {
  return { slug, bodyMarkdown, input: () => ({ slug, bodyMarkdown }) };
}

const SEEDS = [seed("a", "ny a"), seed("b", "ny b"), seed("c", "ny c")];
const ITEMS: CopyReseed[] = [
  { flag: "a-1", slug: "a", stale: ["gammel a"] },
  { flag: "b-1", slug: "b", stale: ["gammel b"] },
  { flag: "c-1", slug: "c", stale: ["gammel c"] },
];

describe("copyReseedsVersion", () => {
  it("changes when a flag is added or renamed, but not when stale markers change", () => {
    const base = copyReseedsVersion(ITEMS);
    assert.notEqual(copyReseedsVersion([...ITEMS, { flag: "a-2", slug: "a", stale: [] }]), base);
    assert.notEqual(copyReseedsVersion([{ ...ITEMS[0], flag: "a-x" }, ITEMS[1], ITEMS[2]]), base);
    assert.equal(copyReseedsVersion(ITEMS.map((item) => ({ ...item, stale: ["annet"] }))), base);
  });
});

describe("reseedFlaggedCopies (Durable Object)", () => {
  it("reseeds every unset flag once, then writes the aggregate key", async () => {
    const { store, calls, rows, meta } = fakeStore("do", { a: "gammel a", b: "ny b", c: "redigert c" }, { "c-1": "1" });
    await reseedFlaggedCopies(store, ITEMS, SEEDS);
    assert.deepEqual(calls.save, ["a"]);
    assert.equal(rows.a, "ny a");
    assert.equal(rows.c, "redigert c", "a flag that is already set must not overwrite CMS edits");
    assert.equal(meta["a-1"], "1");
    assert.equal(meta["b-1"], "1", "body equal to seed only sets the flag");
    assert.equal(meta[COPY_RESEEDS_VERSION_META], copyReseedsVersion(ITEMS));
  });

  it("a cold isolate with a matching key does one DO call and nothing else", async () => {
    const { store, calls } = fakeStore("do", { a: "x", b: "y", c: "z" }, {
      [COPY_RESEEDS_VERSION_META]: copyReseedsVersion(ITEMS),
    });
    await reseedFlaggedCopies(store, ITEMS, SEEDS);
    assert.equal(calls.getMeta, 1);
    assert.equal(calls.get, 0);
    assert.equal(calls.setMeta, 0);
    assert.deepEqual(calls.save, []);
  });

  it("a new flag runs the loop again and reseeds only that slug", async () => {
    const { store, calls, meta } = fakeStore("do", { a: "redigert a", b: "redigert b", c: "redigert c" }, {
      "a-1": "1",
      "b-1": "1",
      "c-1": "1",
      [COPY_RESEEDS_VERSION_META]: copyReseedsVersion(ITEMS),
    });
    const items = [...ITEMS, { flag: "b-2", slug: "b", stale: [] }];
    await reseedFlaggedCopies(store, items, SEEDS);
    assert.deepEqual(calls.save, ["b"]);
    assert.equal(meta["b-2"], "1");
    assert.equal(meta[COPY_RESEEDS_VERSION_META], copyReseedsVersion(items));
  });

  it("does not write the key while a row or seed is missing, so the flag can still fire later", async () => {
    const { store, meta } = fakeStore("do", { a: "gammel a", b: "ny b" });
    await reseedFlaggedCopies(store, ITEMS, SEEDS);
    assert.equal(meta["c-1"], undefined);
    assert.equal(meta[COPY_RESEEDS_VERSION_META], undefined);

    const second = fakeStore("do", { a: "ny a", b: "ny b", c: "gammel c" }, { ...meta });
    await reseedFlaggedCopies(second.store, ITEMS, SEEDS);
    assert.deepEqual(second.calls.save, ["c"]);
    assert.equal(second.meta[COPY_RESEEDS_VERSION_META], copyReseedsVersion(ITEMS));
  });

  it("does not write the key when a save fails", async () => {
    const { store, meta } = fakeStore("do", { a: "gammel a", b: "ny b", c: "ny c" });
    store.save = async () => {
      throw new Error("DO nede");
    };
    await assert.rejects(reseedFlaggedCopies(store, ITEMS, SEEDS));
    assert.equal(meta[COPY_RESEEDS_VERSION_META], undefined);
    assert.equal(meta["a-1"], undefined);
  });
});

describe("reseedFlaggedCopies (Postgres, no meta)", () => {
  it("still uses stale markers and never reads or writes meta", async () => {
    const { store, calls } = fakeStore("postgres", { a: "gammel a her", b: "redigert b", c: "ny c" });
    await reseedFlaggedCopies(store, ITEMS, SEEDS);
    assert.deepEqual(calls.save, ["a"]);
    assert.equal(calls.getMeta, 0);
    assert.equal(calls.setMeta, 0);
  });
});

describe("oncePerKey", () => {
  it("shares one run between concurrent callers and skips later calls", async () => {
    const once = oncePerKey();
    let runs = 0;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => (release = resolve));
    const run = async () => {
      runs++;
      await gate;
    };
    const all = Promise.all([once("k", run), once("k", run), once("k", run)]);
    release();
    await all;
    await once("k", run);
    assert.equal(runs, 1);
    await once("annen", run);
    assert.equal(runs, 2);
  });

  it("forgets a failed run so the next request retries", async () => {
    const once = oncePerKey();
    let runs = 0;
    const failing = async () => {
      runs++;
      throw new Error("feil");
    };
    await assert.rejects(Promise.all([once("k", failing), once("k", failing)]));
    assert.equal(runs, 1);
    await once("k", async () => {
      runs++;
    });
    assert.equal(runs, 2);
  });
});
