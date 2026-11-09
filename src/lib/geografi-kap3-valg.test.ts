import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { plateavstandKm } from "./geografi-platefart.ts";
const read = (p: string) => readFileSync(new URL(p, import.meta.url), "utf8");
test("fart er et modellinput og enhetsomregningen er korrekt", () => {
  assert.equal(plateavstandKm(2, 1000), .02); assert.equal(plateavstandKm(2, 1000000), 20); assert.equal(plateavstandKm(20, 1000000), 200);
  assert.equal(plateavstandKm(-1, 5), null); assert.equal(plateavstandKm(Infinity, 5), null);
  const src = read("../components/models/plate-tectonics-model.tsx");assert.match(src, /setModellfart/);assert.match(src, /ikke målte platebevegelser/);assert.match(src, /geografi = false/);
});
test("kontrollerte kilder, faktiske 2023-episentre og rett satellittdato", () => {
  const d = JSON.parse(read("./geografi-kap3-kart.json"));assert.equal(d.skjelv.length, 2);
  assert.deepEqual(d.skjelv.map((x: {mag:number}) => x.mag).sort(), [7.5, 7.8]);
  const fig = read("../components/geografi/indre-valg.tsx");assert.match(fig, /Contains modified Copernicus Sentinel data 2023/);assert.match(fig, /opptak 19. desember 2023/i);assert.match(fig, /ikke hele bruddflater/);
  assert.doesNotMatch(fig, /OpenStreetMap|GeoMap[ >]/);assert.match(fig, /Oslo-riften utviklet seg ikke til et nytt hav/);
  assert.match(read("./posts/geo-indre-krefter.md"), /```widget\nGeoIndreVarmeflekker\n```/);
  assert.doesNotMatch(read("./posts/geo-indre-krefter.md"), /FIGURPLASSHOLDER/);
});
