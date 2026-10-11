import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { SAMMENDRAG, sjekkWidgetIds } from "./kapittel-mal.ts";

const md = readFileSync(new URL("./posts/feltarbeid.md", import.meta.url), "utf8");
const widgets = [...md.matchAll(/```widget\n(\w+)\n```/g)].map((m) => m[1]);

describe("Feltarbeid etter kapittelmalen", () => {
  it("har Sjekk deg selv 1–4, figurene, sammendrag og quiz", () => {
    for (let n = 1; n <= 4; n++) {
      assert.ok(widgets.includes(`SjekkFeltarbeid${n}`));
      assert.ok(sjekkWidgetIds().includes(`SjekkFeltarbeid${n}`));
    }
    for (const w of [
      "FieldworkIllustration",
      "Feltbok",
      "SammendragFeltarbeid",
      "QuizFeltarbeid",
    ]) {
      assert.ok(widgets.includes(w), w);
    }
    assert.ok(SAMMENDRAG.Feltarbeid.length >= 4 && SAMMENDRAG.Feltarbeid.length <= 6);
  });

  it("dekker kjerneelementet, HMS og georeferering", () => {
    assert.match(md, /Geofaglig feltarbeid:/);
    assert.match(md, /## Planlegging og HMS/);
    assert.match(md, /## Metoder i felt/);
    assert.match(md, /## Georeferering, feltbok og usikkerhet/);
    assert.match(md, /EUREF89/);
    assert.doesNotMatch(md, /samfunnsfaglig begrep/);
  });
});
