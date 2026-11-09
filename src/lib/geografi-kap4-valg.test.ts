import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
const read=(p:string)=>readFileSync(new URL(p,import.meta.url),"utf8");
test("DATED-1 bruker virkelig 21 ka og har tre dokumenterte tolkningsgrenser",()=>{
 const d=JSON.parse(read("./geografi-dated1-21ka.json"));assert.deepEqual(Object.keys(d.snitt).sort(),["max","mc","min"]);
 for(const v of Object.values(d.snitt)as {features:{properties:{tidssnitt_ka:number}}[]}[])assert.ok(v.features.every(f=>f.properties.tidssnitt_ka===21));
 assert.match(read("../components/geografi/landskap-iskart.tsx"),/figur 1 viser derimot maksimum til ulike tider/);
});
test("breuttrekket utelater dokumentert 2020-ortofoto og oppdikter ikke dagens grenser",()=>{
 const d=JSON.parse(read("./geografi-breflater-2018-2019.json"));assert.equal(d.features.length,6742);assert.equal(new Set(d.features.map((f:{properties:{breid:number}})=>f.properties.breid)).size,6742);
 assert.ok(d.features.every((f:{properties:{kartlagt:string;breid:number}})=>["2018","2019"].includes(f.properties.kartlagt)&&f.properties.breid!==2098));
 const s=read("../components/geografi/landskap-brekart.tsx");assert.match(s,/ikke dagens bregrenser/);assert.match(s,/ikke endring mellom to år/);
});
test("figurene bruker lisensklart lavzoomkart, ekte foto og ingen skjult geografisk presisjon",()=>{
 const s=read("../components/geografi/landskap-valg.tsx");assert.match(s,/<VdalTilUdal geografi initialStep=\{3\}/);assert.match(s,/CC BY 2.0/);assert.match(s,/eksakte dalen er ikke oppgitt/);assert.match(s,/zoom 10/);assert.doesNotMatch(s,/OpenStreetMap|GeoMap[ >]/);
 const m=read("./posts/geo-landskap.md");assert.match(m,/```widget\nGeoLandskapGeirangerFoto\n```/);assert.doesNotMatch(m,/FIGURPLASSHOLDER/);assert.match(m,/GeoLandskapFjordLokator/);
});
