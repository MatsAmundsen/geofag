import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posterHeadingAnchorIds } from "./chapter-scan.ts";
import { GEOGRAFI_KAPITLER } from "./geografi-kapitler.ts";
import { byggGeografiData, renderGeografiData } from "./geografi-generert-bygg.ts";
import { geografiHeadingAliases, sliceGeografiUnderkapittel } from "./geografi-seksjon.ts";

const here = dirname(fileURLToPath(import.meta.url));
const read = (rel: string) => readFileSync(join(here, rel), "utf8");
const md = (slug: string) => read(`posts/${slug}.md`);

describe("Geografi: underkapittel-URL-er", () => {
  for (const kap of GEOGRAFI_KAPITLER) {
    it(`${kap.path}: hvert underkapittel har sin H2-blokk og ett unikt anker`, () => {
      const text = md(kap.slug);
      const aliases = geografiHeadingAliases(kap);
      const ids = posterHeadingAnchorIds(text).map((id) => (id && aliases[id]) || id);
      for (const u of kap.underkapitler) {
        const block = sliceGeografiUnderkapittel(text, u.title);
        assert.ok(block && block.length > 200, `${u.id} mangler tekst`);
        assert.equal(ids.filter((id) => id === u.id).length, 1, `${u.id} som anker`);
      }
    });
  }

  it("ruten, sitemap og innholdsfortegnelsen finnes", () => {
    assert.match(
      read("../routes/geografi/$kapittel_.$under.tsx"),
      /\/geografi\/\$kapittel_\/\$under/,
    );
    const sitemap = read("../../public/sitemap.xml");
    for (const kap of GEOGRAFI_KAPITLER) {
      assert.match(sitemap, new RegExp(`/geografi/${kap.path}<`));
      for (const u of kap.underkapitler)
        assert.match(sitemap, new RegExp(`/geografi/${kap.path}/${u.id}<`));
    }
    assert.match(sitemap, /\/geografi\/begreper</);
    assert.match(
      read("../components/geografi/innhold-nav.tsx"),
      /to="\/geografi\/\$kapittel\/\$under"/,
    );
  });
});

describe("Geografi: begrepsregister", () => {
  it("geografi-generert.ts er i takt med md (kjør scripts/geografi-generer.mts)", () => {
    const fresh = renderGeografiData(byggGeografiData(GEOGRAFI_KAPITLER, md));
    assert.equal(read("geografi-generert.ts"), fresh);
  });

  it("hvert begrep og hver forklaring står ordrett i kapittelets Begreper-tabell", () => {
    const { begreper } = byggGeografiData(GEOGRAFI_KAPITLER, md);
    assert.ok(begreper.length > 150);
    for (const b of begreper) {
      const kap = GEOGRAFI_KAPITLER[b.kapittelNr - 1]!;
      const flat = md(kap.slug).replace(/[*_`]/g, "");
      assert.ok(flat.includes(b.begrep), b.begrep);
      assert.ok(flat.includes(b.forklaring.slice(0, 40)), b.begrep);
      if (b.under) assert.ok(kap.underkapitler.some((u) => u.id === b.under));
    }
  });

  it("/geografi uten «under arbeid» og alle kapitler ferdig", () => {
    const landing = read("../routes/geografi/index.tsx");
    assert.doesNotMatch(landing, /under arbeid|etter planen/i);
    assert.equal((read("geografi-kapitler.ts").match(/status: "ferdig"/g) ?? []).length, 11);
  });
});
