import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { SAMMENDRAG, sjekkWidgetIds } from "./kapittel-mal.ts";

const md = readFileSync(new URL("./posts/geologisk-tid.md", import.meta.url), "utf8");
const widgets = [...md.matchAll(/```widget\n(\w+)\n```/g)].map((m) => m[1]);

describe("Geologisk tid og datering etter kapittelmalen", () => {
  it("har Sjekk deg selv 1–4, RelativeDating, sammendrag og quiz", () => {
    for (let n = 1; n <= 4; n++) {
      assert.ok(widgets.includes(`SjekkGeologiskTid${n}`));
      assert.ok(sjekkWidgetIds().includes(`SjekkGeologiskTid${n}`));
    }
    for (const w of ["RelativeDating", "SammendragGeologiskTid", "QuizGeologiskTid"]) assert.ok(widgets.includes(w), w);
    assert.ok(!widgets.includes("Halveringstid"), "Halveringstid-figuren finnes ikke ennå");
    assert.equal(SAMMENDRAG.GeologiskTid.length, 6);
  });

  it("har ingen plassholdere og bruker gjeldende begreper", () => {
    assert.doesNotMatch(md, /<!--|✔|Vis fasit|vertsbjergarten|krysskjæring|541 millioner/);
  });
});
