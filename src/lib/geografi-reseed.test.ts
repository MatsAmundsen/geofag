import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  GEO_AVVIK_META,
  GEO_RESEED_VERSION_META,
  geoSeedHashMeta,
  reseedGeografiFromMd,
  textHash,
  type GeoReseedStore,
} from "./geografi-reseed.ts";

function fake(persist: string, rows: Record<string, string>, meta: Record<string, string> = {}) {
  const saves: string[] = [];
  let seeds: Record<string, string> = {};
  const store: GeoReseedStore = {
    persist,
    async get(slug) {
      return slug in rows ? { bodyMarkdown: rows[slug]!, published: 1 } : null;
    },
    async save(slug) {
      saves.push(slug);
      rows[slug] = seeds[slug]!;
    },
    async getMeta(key) {
      return key in meta ? meta[key]! : null;
    },
    async setMeta(key, value) {
      meta[key] = value;
    },
  };
  return { store, saves, rows, meta, setSeeds: (s: Record<string, string>) => (seeds = s) };
}

const SEEDS = [
  { slug: "geo-a", bodyMarkdown: "ny tekst a" },
  { slug: "geo-b", bodyMarkdown: "ny tekst b" },
];
const seedMap = Object.fromEntries(SEEDS.map((s) => [s.slug, s.bodyMarkdown]));

describe("reseedGeografiFromMd", () => {
  it("overskriver stubb-rader fra skjelettet", async () => {
    const f = fake("do", { "geo-a": "## Planlagte underkapitler\n- x", "geo-b": "ny tekst b" });
    f.setSeeds(seedMap);
    const r = await reseedGeografiFromMd(f.store, SEEDS);
    assert.deepEqual(r.written, ["geo-a"]);
    assert.equal(f.rows["geo-a"], "ny tekst a");
    assert.equal(f.meta[geoSeedHashMeta("geo-a")], textHash("ny tekst a"));
    assert.equal(f.meta[geoSeedHashMeta("geo-b")], textHash("ny tekst b"));
    assert.ok(f.meta[GEO_RESEED_VERSION_META]);
  });

  it("oppdaterer en rad ingen har redigert når md endres", async () => {
    const f = fake(
      "do",
      { "geo-a": "gammel a", "geo-b": "ny tekst b" },
      { [geoSeedHashMeta("geo-a")]: textHash("gammel a") },
    );
    f.setSeeds(seedMap);
    const r = await reseedGeografiFromMd(f.store, SEEDS);
    assert.deepEqual(r.written, ["geo-a"]);
    assert.deepEqual(r.avvik, []);
  });

  it("overskriver aldri tekst som er redigert i CMS, men melder avvik", async () => {
    const f = fake(
      "do",
      { "geo-a": "Mats sin redigerte tekst", "geo-b": "ny tekst b" },
      { [geoSeedHashMeta("geo-a")]: textHash("gammel a") },
    );
    f.setSeeds(seedMap);
    const r = await reseedGeografiFromMd(f.store, SEEDS);
    assert.deepEqual(r.written, []);
    assert.deepEqual(r.avvik, ["geo-a"]);
    assert.equal(f.rows["geo-a"], "Mats sin redigerte tekst");
    assert.equal(f.meta[GEO_AVVIK_META], "geo-a");
  });

  it("rad uten kjent hash som ikke er stubb regnes som redigert", async () => {
    const f = fake("do", { "geo-a": "ukjent opprinnelse", "geo-b": "ny tekst b" });
    f.setSeeds(seedMap);
    const r = await reseedGeografiFromMd(f.store, SEEDS);
    assert.deepEqual(r.avvik, ["geo-a"]);
    assert.equal(f.saves.length, 0);
  });

  it("hopper over alt med ett meta-kall når versjonen stemmer", async () => {
    const f = fake("do", { "geo-a": "ny tekst a", "geo-b": "ny tekst b" });
    f.setSeeds(seedMap);
    await reseedGeografiFromMd(f.store, SEEDS);
    const again = await reseedGeografiFromMd(f.store, SEEDS);
    assert.equal(again.skipped, true);
  });

  it("lang tekst med FIGURPLASSHOLDER eller stubbmerke regnes ikke som stubb", async () => {
    const lang = "x".repeat(9000) + "\n## Planlagte underkapitler\nFIGURPLASSHOLDER";
    const f = fake("do", { "geo-a": "FIGURPLASSHOLDER 8.5 redigert", "geo-b": lang });
    f.setSeeds(seedMap);
    const r = await reseedGeografiFromMd(f.store, SEEDS);
    assert.deepEqual(r.written, []);
    assert.deepEqual(r.avvik, ["geo-a", "geo-b"]);
  });

  it("lokal Postgres uten meta: bare stubber overskrives", async () => {
    const f = fake("postgres", {
      "geo-a": "Innholdet er under arbeid.",
      "geo-b": "redigert lokalt",
    });
    f.setSeeds(seedMap);
    const r = await reseedGeografiFromMd(f.store, SEEDS);
    assert.deepEqual(r.written, ["geo-a"]);
    assert.deepEqual(r.avvik, ["geo-b"]);
  });
});
