import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FISKEEKSPORT, TELEFON_STEDER } from "./geografi-kap9-data.ts";
import { gallPeters } from "./geografi-verdenskart.ts";
const read=(p:string)=>readFileSync(new URL(p,import.meta.url),"utf8");
test("kap9: SSBs faktiske landrekkefølge er dekodet, uten dobbeltelling",()=>{
 assert.equal(FISKEEKSPORT.length,6);assert.equal(FISKEEKSPORT.find(d=>d.iso3==="ALL")?.millNok,173930);assert.equal(FISKEEKSPORT.find(d=>d.iso3==="CHN")?.millNok,12319);assert.equal(FISKEEKSPORT.find(d=>d.iso3==="POL")?.tonn,281034);assert.equal(FISKEEKSPORT.find(d=>d.iso3==="DNK")?.millNok,10207);assert.equal(FISKEEKSPORT.find(d=>d.iso3==="USA")?.tonn,113661);
});
test("kap9: dokumenterte leverandørroller, bypunkter og ingen oppdiktet rute",()=>{
 assert.equal(TELEFON_STEDER.length,3);assert.equal(TELEFON_STEDER.find(d=>d.by==="Huizhou")?.rolle,"Montering");assert.equal(TELEFON_STEDER.find(d=>d.by==="Taichung")?.rolle,"Hovedkontor");for(const d of TELEFON_STEDER){assert.ok(d.lon>110&&d.lon<125);assert.ok(d.lat>20&&d.lat<35);}
 const s=read("../components/geografi/naering-valg.tsx");assert.match(s,/ikke en komplett verdikjede/);assert.match(s,/ikke endelige/);assert.match(s,/ingen rapportgrafikk/);assert.doesNotMatch(s,/markerEnd|fetch\(|openstreetmap/i);
});
test("verdenskart: egen projeksjon, landkoder, hull og grått er ikke null",()=>{
 assert.deepEqual(gallPeters(0,0),[450,280]);assert.equal(gallPeters(30,0)[0],gallPeters(30,60)[0]);
 const d=JSON.parse(read("./geografi-verdensland.json"));assert.equal(d.length,177);assert.equal(d.find((x:{name:string})=>x.name==="Norway").iso3,"NOR");assert.equal(d.find((x:{name:string})=>x.name==="France").iso3,"FRA");assert.ok(d.every((x:{path:string})=>x.path.startsWith("M")&&!/NaN|Infinity/.test(x.path)));
 const s=read("../components/geografi/verdenskart.tsx");assert.match(s,/fillRule="evenodd"/);assert.match(s,/Grått er ikke null/);assert.match(s,/aria-live/);
});
