import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posterHeadingAnchorIds } from "./chapter-scan.ts";
import { GEOGRAFI_KAPITLER } from "./geografi-kapitler.ts";
import { GEOGRAFI_BEGREPSREGISTER } from "./geografi-begreper.ts";
import { begrepsTabell, byggGeografiData, renderGeografiData } from "./geografi-generert-bygg.ts";
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
  const norm = (t: string) => t.toLocaleLowerCase("nb");

  it("geografi-generert.ts er i takt med md og registeret (kjør scripts/geografi-generer.mts)", () => {
    const fresh = renderGeografiData(
      byggGeografiData(GEOGRAFI_KAPITLER, md, GEOGRAFI_BEGREPSREGISTER),
    );
    assert.equal(read("geografi-generert.ts"), fresh);
  });

  it("hver forklaring står ordrett i Begreper-tabellen i hvert kapittel begrepet hører til", () => {
    assert.equal(GEOGRAFI_BEGREPSREGISTER.length, 206);
    for (const b of GEOGRAFI_BEGREPSREGISTER) {
      for (const path of b.kapitler) {
        const kap = GEOGRAFI_KAPITLER.find((k) => k.path === path);
        assert.ok(kap, `${b.begrep}: ukjent kapittel ${path}`);
        const rad = begrepsTabell(md(kap.slug)).find(([navn]) => norm(navn) === norm(b.begrep));
        assert.ok(rad, `${b.begrep} mangler i tabellen i ${path}`);
        assert.equal(
          rad[1],
          b.forklaring,
          `${b.begrep} (${path}) er ikke ordrett lik kapittelraden`,
        );
      }
    }
  });

  it("registeret har verken manglende eller oppdiktede begreper", () => {
    const fraTabeller = new Set(
      GEOGRAFI_KAPITLER.flatMap((k) =>
        begrepsTabell(md(k.slug)).map(([navn]) => `${k.path}|${norm(navn)}`),
      ),
    );
    const fraRegister = new Set(
      GEOGRAFI_BEGREPSREGISTER.flatMap((b) =>
        b.kapitler.map((path) => `${path}|${norm(b.begrep)}`),
      ),
    );
    assert.deepEqual(
      [...fraTabeller].filter((x) => !fraRegister.has(x)),
      [],
      "mangler i registeret",
    );
    assert.deepEqual(
      [...fraRegister].filter((x) => !fraTabeller.has(x)),
      [],
      "finnes ikke i noen kapitteltabell",
    );
    const navn = GEOGRAFI_BEGREPSREGISTER.map((b) => norm(b.begrep));
    assert.equal(new Set(navn).size, navn.length, "dobbeltoppføring");
  });

  it("lenkene peker til underkapitler som finnes", () => {
    for (const b of byggGeografiData(GEOGRAFI_KAPITLER, md, GEOGRAFI_BEGREPSREGISTER).begreper) {
      for (const st of b.steder) {
        const kap = GEOGRAFI_KAPITLER[st.kapittelNr - 1]!;
        assert.equal(kap.path, st.kapittel);
        if (st.under)
          assert.ok(
            kap.underkapitler.some((u) => u.id === st.under),
            `${b.begrep}`,
          );
      }
    }
  });

  it("/geografi uten «under arbeid» og alle kapitler ferdig", () => {
    const landing = read("../routes/geografi/index.tsx");
    assert.doesNotMatch(landing, /under arbeid|etter planen/i);
    assert.equal((read("geografi-kapitler.ts").match(/status: "ferdig"/g) ?? []).length, 11);
  });
});
