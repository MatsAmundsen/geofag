import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import {
  GEO_AVVIK_META,
  GEO_RESEED_VERSION_META,
  GEO_STUB_HASHES,
  geoSeedHashMeta,
  isGeoStub,
  reseedGeografiFromMd,
  textHash,
  type GeoReseedStore,
} from "./geografi-reseed.ts";

const STUBB_A = "# A\n\nInnholdet er under arbeid.\n\n## Planlagte underkapitler\n- 1.1\n- 1.2\n";
const STUBBER = { "geo-a": [textHash(STUBB_A)] };

/** Falsk store med betinget skriving. `forSave` kan endre raden mellom lesing og skriving (kappløp). */
function fake(
  persist: string,
  rows: Record<string, string>,
  meta: Record<string, string> = {},
  forSave?: (slug: string) => void,
) {
  const saves: string[] = [];
  let seeds: Record<string, string> = {};
  const store: GeoReseedStore = {
    persist,
    async get(slug) {
      return slug in rows ? { bodyMarkdown: rows[slug]!, published: 1 } : null;
    },
    async save(slug, _published, expectedBody) {
      forSave?.(slug);
      if (rows[slug] !== expectedBody) return false;
      saves.push(slug);
      rows[slug] = seeds[slug]!;
      return true;
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
const kjor = (f: ReturnType<typeof fake>) => reseedGeografiFromMd(f.store, SEEDS, STUBBER);

describe("reseedGeografiFromMd", () => {
  it("overskriver en rad som er tegn for tegn lik skjelettstubben", async () => {
    const f = fake("do", { "geo-a": STUBB_A, "geo-b": "ny tekst b" });
    f.setSeeds(seedMap);
    const r = await kjor(f);
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
    const r = await kjor(f);
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
    const r = await kjor(f);
    assert.deepEqual(r.written, []);
    assert.deepEqual(r.avvik, ["geo-a"]);
    assert.equal(f.rows["geo-a"], "Mats sin redigerte tekst");
    assert.equal(f.meta[GEO_AVVIK_META], "geo-a");
  });

  it("kort redigert tekst som fortsatt har stubbmerkene, er IKKE stubb (ingen 8000-tegnsgrense)", async () => {
    const redigert = STUBB_A.replace("- 1.2", "- 1.2 Mats har skrevet dette avsnittet selv.");
    assert.ok(redigert.length < 8000);
    const f = fake("do", { "geo-a": redigert, "geo-b": "FIGURPLASSHOLDER 8.5 redigert" });
    f.setSeeds(seedMap);
    const r = await kjor(f);
    assert.deepEqual(r.written, []);
    assert.deepEqual(r.avvik, ["geo-a", "geo-b"]);
    assert.equal(f.rows["geo-a"], redigert);
    assert.equal(f.saves.length, 0);
  });

  it("rad uten kjent hash som ikke er stubb regnes som redigert", async () => {
    const f = fake("do", { "geo-a": "ukjent opprinnelse", "geo-b": "ny tekst b" });
    f.setSeeds(seedMap);
    const r = await kjor(f);
    assert.deepEqual(r.avvik, ["geo-a"]);
    assert.equal(f.saves.length, 0);
  });

  it("betinget skriving: en CMS-lagring mellom lesing og skriving vinner", async () => {
    const f = fake("do", { "geo-a": STUBB_A, "geo-b": "ny tekst b" }, {}, (slug) => {
      if (slug === "geo-a") f.rows["geo-a"] = "Mats lagret akkurat nå";
    });
    f.setSeeds(seedMap);
    const r = await kjor(f);
    assert.deepEqual(r.written, []);
    assert.deepEqual(r.kollisjon, ["geo-a"]);
    assert.equal(f.rows["geo-a"], "Mats lagret akkurat nå");
    assert.equal(f.meta[geoSeedHashMeta("geo-a")], undefined);
    // Versjonen settes ikke, så neste kjøring vurderer raden på nytt (og melder den som avvik).
    assert.equal(f.meta[GEO_RESEED_VERSION_META], undefined);
    const igjen = await kjor(f);
    assert.deepEqual(igjen.avvik, ["geo-a"]);
    assert.equal(f.rows["geo-a"], "Mats lagret akkurat nå");
  });

  it("hopper over alt med ett meta-kall når versjonen stemmer", async () => {
    const f = fake("do", { "geo-a": "ny tekst a", "geo-b": "ny tekst b" });
    f.setSeeds(seedMap);
    await kjor(f);
    const again = await kjor(f);
    assert.equal(again.skipped, true);
  });

  it("lokal Postgres uten meta: bare tomme rader og eksakte stubber overskrives", async () => {
    const f = fake("postgres", { "geo-a": STUBB_A, "geo-b": "Innholdet er under arbeid." });
    f.setSeeds(seedMap);
    const r = await kjor(f);
    assert.deepEqual(r.written, ["geo-a"]);
    assert.deepEqual(r.avvik, ["geo-b"]);
  });
});

describe("GEO_STUB_HASHES", () => {
  it("har nøyaktig én kjent skjelettstubb per geografikapittel", () => {
    const slugs = readdirSync(new URL("./posts/", import.meta.url))
      .filter((f) => /^geo-.+\.md$/.test(f))
      .map((f) => f.replace(/\.md$/, ""))
      .sort();
    assert.deepEqual(Object.keys(GEO_STUB_HASHES).sort(), slugs);
    for (const s of slugs) assert.equal(GEO_STUB_HASHES[s]!.length, 1, s);
  });
  it("dagens md-tekst er ikke en stubb", async () => {
    const { readFileSync } = await import("node:fs");
    for (const s of Object.keys(GEO_STUB_HASHES)) {
      const md = readFileSync(new URL(`./posts/${s}.md`, import.meta.url), "utf8");
      assert.equal(isGeoStub(s, md), false, s);
    }
  });
  it("tom rad regnes som stubb (ingen tekst å miste)", () => {
    assert.equal(isGeoStub("geo-klima", "  \n"), true);
  });
});
