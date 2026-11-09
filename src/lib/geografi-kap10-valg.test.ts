import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SFT_2023, LEVEALDER_2023, HDI_2023 } from "./geografi-kap10-kartdata.ts";
import { HDI_KLASSER } from "./geografi-kartklasser.ts";
import { HDI_BNP } from "./geografi-hdi-data.ts";
const read=(p:string)=>readFileSync(new URL(p,import.meta.url),"utf8");
test("kap10: ekte landverdier, samme år, ingen gruppeaggregater eller falske nuller",()=>{
 assert.equal(SFT_2023.length,217);assert.equal(LEVEALDER_2023.length,217);assert.equal(HDI_2023.length,193);
 for(const rows of [SFT_2023,LEVEALDER_2023,HDI_2023]){assert.equal(new Set(rows.map(d=>d.iso3)).size,rows.length);assert.ok(rows.every(d=>Number.isFinite(d.verdi)&&d.verdi>0));assert.ok(!rows.some(d=>["WLD","HIC","LIC","AFE"].includes(d.iso3)));}
 assert.equal(SFT_2023.find(d=>d.iso3==="JPN")?.verdi,1.2);assert.equal(SFT_2023.find(d=>d.iso3==="NER")?.verdi,6.061);assert.equal(SFT_2023.find(d=>d.iso3==="NOR")?.verdi,1.4);
 for(const d of HDI_BNP)assert.equal(HDI_2023.find(x=>x.iso3===d.iso3)?.verdi,d.hdi);
});
test("kap10: UNDP-grenser og separat skala for to levekårsindikatorer",()=>{
 const klasse=(v:number)=>HDI_KLASSER.find(k=>v<k.grense)?.navn;assert.match(klasse(.549)??"",/Lav/);assert.match(klasse(.55)??"",/Middels/);assert.match(klasse(.7)??"",/Høy/);assert.match(klasse(.8)??"",/Svært høy/);
 const s=read("../components/geografi/befolkning-kart.tsx");assert.match(s,/useState\(false\)/);assert.match(s,/aria-pressed/);assert.match(s,/SP.DYN.LE00.IN/);assert.match(s,/ikke universelle reproduksjonsgrenser/);assert.doesNotMatch(s,/fetch\(|localStorage|openstreetmap/i);
});
