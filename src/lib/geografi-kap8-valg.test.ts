import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { TRANSPORT_FAKTORER, transportCO2 } from "./geografi-transport-co2.ts";
import { HDI_BNP } from "./geografi-hdi-data.ts";
test("lokal transportberegning bruker kontrollerte 2020-faktorer og bare CO₂", () => {
  assert.deepEqual(TRANSPORT_FAKTORER.map((x) => x.gram), [76.9, 70.4, 92.4]);
  assert.ok(Math.abs((transportCO2([100, 0, 0]) ?? 0) - 7.69) < 1e-9);
  assert.ok(Math.abs((transportCO2([100, 100, 100]) ?? 0) - 23.97) < 1e-9);
  for (const a of [[-1, 0, 0], [NaN, 0, 0], [Infinity, 0, 0], [1]]) assert.equal(transportCO2(a), null);
  const ui = readFileSync(new URL("../components/geografi/baerekraft-valg.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(ui, /localStorage|sessionStorage|fetch\(|https?:/);
  assert.match(ui, /ikke alle klimagasser/); assert.match(ui, /pandemiår/); assert.match(ui, /belegg/); assert.match(ui, /Nullstill/);
});
test("HDI og BNP gjelder samme år og GFN-datadiagrammet holdes sperret", () => {
  assert.equal(HDI_BNP.length, 8); assert.ok(HDI_BNP.every((d) => d.ar === 2023 && d.hdi > 0 && d.hdi <= 1 && d.bnpPPP > 0));
  assert.equal(HDI_BNP.find((d) => d.iso3 === "NOR")?.hdi, .97);
  const md = readFileSync(new URL("./posts/geo-baerekraft.md", import.meta.url), "utf8");
  assert.match(md, /FIGURPLASSHOLDER 8.6:.*CC BY-SA 4.0/); assert.match(md, /GeoLokalFotavtrykk/);
});
