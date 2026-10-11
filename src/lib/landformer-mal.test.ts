import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { SAMMENDRAG, SJEKK_DEG_SELV, sammendragWidgetIds, sjekkWidgetIds } from "./kapittel-mal.ts";

const md = readFileSync(new URL("./posts/landformer.md", import.meta.url), "utf8");
const widgets = [...md.matchAll(/```widget\n(\w+)\n```/g)].map((m) => m[1]);

describe("Landformer etter kapittelmalen", () => {
  it("har «Hva tror du?» tidlig, Sjekk deg selv, Sammendrag og Test deg selv i riktig rekkefølge", () => {
    assert.ok(md.indexOf("Hva tror du?") < md.indexOf("## Forvitring"));
    for (const id of sjekkWidgetIds().filter((id) => id.startsWith("SjekkLandformer"))) {
      assert.ok(widgets.includes(id), id);
    }
    const sammendrag = md.indexOf("## Sammendrag");
    assert.ok(sammendrag > md.indexOf("## Viktige begreper"));
    assert.ok(sammendrag < md.indexOf("## Test deg selv"));
    assert.ok(widgets.includes("SammendragLandformer"));
    assert.ok(sammendragWidgetIds().includes("SammendragLandformer"));
  });

  it("sammendraget har 4–6 punkter og sjekkene har spørsmål", () => {
    const n = SAMMENDRAG.Landformer.length;
    assert.ok(n >= 4 && n <= 6);
    for (const [key, qs] of Object.entries(SJEKK_DEG_SELV)) assert.ok(qs.length > 0, key);
  });

  it("har tatt ut isbre-duplikatet, leirparadokset og redaksjonsnotatet", () => {
    for (const id of ["VdalTilUdal", "BotnEggTind", "Avsetningsformer"]) assert.ok(!widgets.includes(id), id);
    assert.doesNotMatch(md, /Leirparadokset|over 100 cm\/s|Her kan du redigere|Grand Canyon|Vøringsfossen|Torghatten/);
    assert.match(md, /\/geofag-1\/isbreer-og-landformer/);
    assert.match(md, /## Mennesket former landskapet/);
    assert.doesNotMatch(md.replace(/^>.*$/gm, ""), /[a-zæøå]!/);
  });
});
