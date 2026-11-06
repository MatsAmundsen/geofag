import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { gallPeters, tissotSkala } from "./geografi-projeksjon.ts";
import { readFileSync } from "node:fs";
describe("Kapittel 1: egne projeksjoner og lovlig kart",()=>{
 it("bevarer lokal arealskala ved alle undersøkte breddegrader",()=>{
  for(const lat of [-75,-60,-45,-30,0,30,45,60,75]) {const s=tissotSkala(lat);assert.ok(Math.abs(s.parallell*s.meridian-1)<1e-12);}
  assert.ok(Math.abs(tissotSkala(45).parallell-1)<1e-12);assert.deepEqual(gallPeters(0,0),[0,0]);
 });
 it("har egne modeller, lisens og nye innlastingsflagg",()=>{
  const md=readFileSync(new URL('./posts/geo-verktoy.md',import.meta.url),'utf8');assert.match(md,/GeoVerktoyGallPeters/);assert.doesNotMatch(md,/[!<]/);
  assert.match(readFileSync(new URL('./copy-reseeds-b.ts',import.meta.url),'utf8'),/geo-verktoy-mats-valg-kap1-2026-11-06/);
 });
});
