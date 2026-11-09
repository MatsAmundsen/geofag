import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { KRAFTPRODUKSJON, SYSS_REGION } from "./geografi-kap7-data.ts";
const read=(p:string)=>readFileSync(new URL(p,import.meta.url),"utf8");
test("kap7: kontrollerte SSB-dimensjoner, faktiske år og enheter",()=>{
 assert.equal(KRAFTPRODUKSJON.length,6);assert.equal(KRAFTPRODUKSJON[5].ProdTotal,161793);
 for(const d of KRAFTPRODUKSJON)assert.ok(Math.abs(d.ProdTotal-d.VannKraft-d.VindKraft-d.Solkraft-d.VarmeKraft)<=2);
 assert.equal(SYSS_REGION.length,6);assert.deepEqual(SYSS_REGION.filter(d=>d.region==="18").map(d=>d.personer),[4379,22,63]);assert.deepEqual(SYSS_REGION.filter(d=>d.region==="55").map(d=>d.personer),[2345,366,54]);
});
test("kap7: Fosen filtreres til riktig distrikt og ekte kildekategorier",()=>{
 const d=JSON.parse(read("./geografi-fosen-vinter-vind.json"));assert.equal(d.beite.length,63);assert.equal(d.vind.length,3);assert.equal(new Set(d.vind.map((f:{properties:{anleggsnr:number}})=>f.properties.anleggsnr)).size,2);
 for(const f of d.beite){assert.match(f.properties.distrikt,/Fosen/);assert.ok(["9","10"].includes(f.properties.kode));assert.equal(f.geometry.type,"MultiPolygon");for(const p of f.geometry.coordinates)for(const ring of p){assert.deepEqual(ring[0],ring.at(-1));for(const [x,y]of ring){assert.ok(Number.isFinite(x)&&x>0&&x<40);assert.ok(Number.isFinite(y)&&y>50&&y<75);}}}
 const src=read("../components/geografi/ressurs-fosen.tsx");assert.match(src,/aria-pressed/);assert.match(src,/zoom=\{8\} basemap/);assert.match(src,/ikke alle årstidsbeiter/);assert.match(src,/63 objekter/);assert.doesNotMatch(src,/openstreetmap|localStorage|fetch\(/i);
});
