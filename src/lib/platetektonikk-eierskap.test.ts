import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AMPHIBOLE_KM,
  CRUSTAL_ROOT_KM,
  JARAMILLO,
  PX_PER_KM,
  SERPENTINE_KM,
  ageMaAtDistance,
  distanceKm,
  isFastSpreading,
  isSlowSpreading,
  layerAvailability,
  lithosphereThicknessKm,
  polarityAtAge,
  rateCaption,
  ridgeBathymetryKm,
  showsDepthScale,
  yDepth,
} from "../components/models/plate-tectonics-geometry.ts";

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

  it("keeps the interactive model on plate boundaries", () => {
    const model = read("src/components/models/plate-tectonics-model.tsx");

    assert.match(model, /showsDepthScale\(boundary\)/);
    assert.match(model, /distanceKm/);
    assert.match(model, /AMPHIBOLE_KM/);
    assert.match(model, /Passiv oppstrømning/);
    assert.doesNotMatch(model, /activeTransformMode/);
    assert.doesNotMatch(model, /Kron 5/);
    assert.doesNotMatch(model, /Ingen subduksjon/);
    assert.doesNotMatch(model, /670 km/);
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

describe("plate model geometry", () => {
  it("uses one linear depth scale, and only on cross sections", () => {
    assert.equal(yDepth(100) - yDepth(0), 100 * PX_PER_KM);
    assert.equal(showsDepthScale("ridge"), true);
    assert.equal(showsDepthScale("subduction_continent"), true);
    assert.equal(showsDepthScale("hotspot"), true);
    assert.equal(showsDepthScale("transform"), false);
    assert.equal(showsDepthScale("paleomag"), false);
  });

  it("puts amphibole dehydration above serpentine, both within 200 km", () => {
    assert.ok(AMPHIBOLE_KM >= 80 && AMPHIBOLE_KM <= 100);
    assert.ok(SERPENTINE_KM > AMPHIBOLE_KM && SERPENTINE_KM <= 200);
    assert.ok(yDepth(SERPENTINE_KM) > yDepth(AMPHIBOLE_KM));
    assert.equal(CRUSTAL_ROOT_KM, 75);
  });

  it("scales distance with rate and age, and widens stripes when spreading is faster", () => {
    assert.ok(Math.abs(distanceKm(3, 0.781) - 23.43) < 0.05);
    assert.ok(distanceKm(8, 0.781) > distanceKm(3, 0.781));
  });

  it("gives slow ridges a rift valley and thicker flanks", () => {
    assert.equal(isSlowSpreading(2), true);
    assert.equal(isFastSpreading(12), true);
    assert.equal(isSlowSpreading(6), false);
    assert.ok(ridgeBathymetryKm(0, 2) > ridgeBathymetryKm(20, 2));
    assert.ok(ridgeBathymetryKm(0, 2) > ridgeBathymetryKm(0, 12));
    const slowFlank = lithosphereThicknessKm(ageMaAtDistance(200, 2));
    const fastFlank = lithosphereThicknessKm(ageMaAtDistance(200, 14));
    assert.ok(slowFlank > fastFlank);
  });

  it("places Jaramillo near 1 Ma inside Matuyama", () => {
    assert.ok(JARAMILLO.startMa > 0.9 && JARAMILLO.endMa < 1.2);
    assert.ok(JARAMILLO.startMa > 0.781 && JARAMILLO.endMa < 2.581);
    assert.equal(polarityAtAge(1.02, "normal"), "normal");
    assert.equal(polarityAtAge(1.5, "normal"), "reversed");
    assert.equal(polarityAtAge(0.4, "reversed"), "normal");
    assert.equal(polarityAtAge(0.02, "reversed"), "reversed");
  });

  it("describes the open boundary, and turns off layers that do not exist", () => {
    assert.match(rateCaption("collision", 6), /Himalaya/);
    assert.doesNotMatch(rateCaption("collision", 6), /Nazca/);
    assert.match(rateCaption("ridge", 2), /Atlanter/);
    assert.match(rateCaption("ridge", 12), /Stillehav/);
    assert.match(rateCaption("paleomag", 6), /halvrate/i);
    assert.equal(layerAvailability("transform").melting, false);
    assert.equal(layerAvailability("transform").forces, false);
    assert.equal(layerAvailability("ridge").forces, true);
    assert.equal(layerAvailability("subduction_island").forces, true);
  });
});
