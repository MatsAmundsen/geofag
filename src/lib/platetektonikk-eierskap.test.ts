import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function read(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("platetektonikk chapter ownership", () => {
  it("does not teach Wadati-Benioff depth zones or the Leka ofiolitt tab", () => {
    const model = read("src/components/models/plate-tectonics-model.tsx");
    const plates = read("src/components/diagrams/plates.tsx");

    assert.doesNotMatch(model, /Ofiolitt \(Leka-lagene\)/);
    assert.doesNotMatch(model, /OPHIOLITE_LAYERS/);
    assert.doesNotMatch(model, /Wadati-Benioff-sonen:/);
    assert.doesNotMatch(model, /0–70 km: Grunne megathrust/);
    assert.doesNotMatch(plates, /WADATI-BENIOFF-SONEN/);
    assert.doesNotMatch(plates, /300–700 km: Mineralfaseoverganger/);
    assert.match(model, /to="\/geofag-1\/jordskjelv"/);
    assert.match(model, /to="\/geofag-1\/norges-geologi"/);
  });

  it("points seismicity and ofiolitt to the owner chapters", () => {
    const post = read("src/lib/platetektonikk-post.md");
    const eierskap = read("src/lib/gemini-by-path.ts");

    assert.match(post, /\/geofag-1\/jordskjelv/);
    assert.match(post, /\/geofag-1\/norges-geologi/);
    assert.match(eierskap, /Jordskjelv eier seismisitet, bølger og Wadati-Benioff/);
    assert.match(eierskap, /Norges geologi eier Leka-ofiolitten/);
  });
});
