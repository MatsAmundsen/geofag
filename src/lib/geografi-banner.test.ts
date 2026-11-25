import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { GEOGRAFI_BANNERE, bannerKreditt, bannerLisensUrl } from "./geografi-banner.ts";
import { GEOGRAFI_KAPITLER } from "./geografi-kapitler.ts";
import { GEO_THEMES } from "./nav.ts";

const pub = (sti: string) => new URL(`../../public${sti}`, import.meta.url);
const TILLATT = /^(offentlig eiendom|CC0|CC BY 2\.0|CC BY 4\.0)$/;

describe("Geografi: kapittelbannere", () => {
  it("hvert kapittel har eget banner i jpg, webp og avif, 1× og 2×", () => {
    const brukt = new Set<string>();
    for (const kap of GEOGRAFI_KAPITLER) {
      assert.equal(kap.banner, GEOGRAFI_BANNERE[kap.path as keyof typeof GEOGRAFI_BANNERE]);
      assert.equal(kap.image, `${kap.banner.base}.jpg`);
      assert.equal(kap.alt, kap.banner.alt);
      assert.ok(!brukt.has(kap.banner.base), kap.path);
      brukt.add(kap.banner.base);
      for (const ext of ["jpg", "webp", "avif"])
        for (const s of ["", "-2x"])
          assert.ok(
            existsSync(pub(`${kap.banner.base}${s}.${ext}`)),
            `${kap.banner.base}${s}.${ext}`,
          );
    }
  });

  it("menyen bruker samme banner og alt-tekst", () => {
    for (const t of GEO_THEMES) {
      const kap = GEOGRAFI_KAPITLER.find((k) => k.path === t.pathSlug)!;
      assert.equal(t.image, kap.image);
      assert.equal(t.alt, kap.alt);
    }
  });

  it("har alt-tekst, kreditlinje og fri lisens", () => {
    for (const b of Object.values(GEOGRAFI_BANNERE)) {
      assert.ok(b.alt.length > 30 && !/hero|jorda sett fra lav bane/i.test(b.alt), b.base);
      assert.match(b.lisens, TILLATT);
      assert.match(bannerKreditt(b), /^Foto: .+ \(.+\), /);
      assert.match(b.href, /^https:\/\//);
    }
  });

  it("hero-earth.jpg brukes fortsatt utenfor kapitlene", () => {
    assert.ok(existsSync(pub("/images/hero-earth.jpg")));
    assert.match(
      readFileSync(new URL("../routes/geografi/index.tsx", import.meta.url), "utf8"),
      /hero-earth\.jpg/,
    );
  });

  it("lisensnavnet lenkes: CC til lisensteksten, offentlig eiendom til filsida", () => {
    for (const b of Object.values(GEOGRAFI_BANNERE)) {
      const url = bannerLisensUrl(b);
      if (b.lisens.startsWith("CC")) assert.match(url, /^https:\/\/creativecommons\.org\//, b.base);
      else assert.equal(url, b.href);
    }
    assert.equal(bannerLisensUrl(GEOGRAFI_BANNERE.migrasjon), "https://creativecommons.org/licenses/by/2.0/deed.no");
  });

  it("kreditten er minst 12 px på kapittelsida og står på kortene på /geografi", () => {
    const side = readFileSync(new URL("../components/geografi/kapittel-side.tsx", import.meta.url), "utf8");
    assert.ok(!side.includes("text-[0.6875rem]"));
    assert.ok(side.includes("bannerLisensUrl(kapittel.banner)"));
    const indeks = readFileSync(new URL("../routes/geografi/index.tsx", import.meta.url), "utf8");
    assert.ok(indeks.includes("{bannerKreditt(kap.banner)}"));
  });
});
