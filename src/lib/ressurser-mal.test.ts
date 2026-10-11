import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { SAMMENDRAG, sjekkWidgetIds } from "./kapittel-mal.ts";

const md = readFileSync(new URL("./posts/geologiske-ressurser.md", import.meta.url), "utf8");
const widgets = [...md.matchAll(/```widget\n(\w+)\n```/g)].map((m) => m[1]);

describe("Geologiske ressurser etter kapittelmalen", () => {
  it("har Sjekk deg selv 1–7, figurene, sammendrag og quiz", () => {
    for (let n = 1; n <= 7; n++) {
      assert.ok(widgets.includes(`SjekkGeologiskeRessurser${n}`));
      assert.ok(sjekkWidgetIds().includes(`SjekkGeologiskeRessurser${n}`));
    }
    for (const w of ["MalmForklaring", "FraBergartTilBrudd", "PetroleumSystem", "SammendragGeologiskeRessurser", "QuizGeologiskeRessurser"]) {
      assert.ok(widgets.includes(w), w);
    }
    assert.equal(SAMMENDRAG.GeologiskeRessurser.length, 6);
  });

  it("har ingen plassholdere eller fasitsitater", () => {
    assert.doesNotMatch(md, /<!--|✔|Vis fasit|\[NY WIDGET\]|LeteMetoder/);
    assert.doesNotMatch(md, /ca\. 85 %/);
  });
});
