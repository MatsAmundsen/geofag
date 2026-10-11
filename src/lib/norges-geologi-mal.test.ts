import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { SAMMENDRAG, sjekkWidgetIds } from "./kapittel-mal.ts";

const md = readFileSync(new URL("./posts/norges-geologi.md", import.meta.url), "utf8");
const widgets = [...md.matchAll(/```widget\n(\w+)\n```/g)].map((m) => m[1]);

describe("Norges geologi etter kapittelmalen", () => {
  it("har Sjekk deg selv 1–7, sammendrag og quiz", () => {
    for (let n = 1; n <= 7; n++) {
      assert.ok(widgets.includes(`SjekkNorgesGeologi${n}`));
      assert.ok(sjekkWidgetIds().includes(`SjekkNorgesGeologi${n}`));
    }
    assert.ok(widgets.includes("SammendragNorgesGeologi"));
    assert.ok(widgets.includes("QuizNorgesGeologi"));
    assert.equal(SAMMENDRAG.NorgesGeologi.length, 6);
  });

  it("har ingen plassholdere, fasitsitater eller kjente feil", () => {
    assert.ok(!widgets.includes("NorgesBerggrunnKart"));
    assert.doesNotMatch(md, /<!--|✔|Vis fasit|\[NY WIDGET\]/);
    assert.doesNotMatch(
      md,
      /Pangea (holdt på å )?sprekke opp i perm|hevet landet seg opptil 220|kiselalger dannet|seig/,
    );
    assert.match(md, /like etter at Pangea var satt sammen/);
    assert.match(md, /Landet har hevet seg mer enn dette/);
  });
});
