import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { UNHCR_VERTSLAND_2025, UNHCR_REGIONER_2025 } from "./geografi-unhcr-2025.ts";
import { MIGRASJON_KOMMUNEPUNKTER } from "./geografi-migrasjon-punkter.ts";
import { FLYTTING_REGIONER } from "./geografi-migrasjonsdata.ts";
const read=(p:string)=>readFileSync(new URL(p,import.meta.url),"utf8");
test("kap11: komplett avgrenset UNHCR-uttrekk og ingen dobbel regiontelling",()=>{
 const r=UNHCR_VERTSLAND_2025;assert.equal(r.length,167);assert.equal(new Set(r.map(d=>d.iso3)).size,167);assert.equal(r.reduce((a,d)=>a+d.verdi,0),28461306);assert.equal(r.find(d=>d.iso3==="DEU")?.verdi,2655191);assert.equal(r.find(d=>d.iso3==="NOR")?.verdi,124006);assert.equal(UNHCR_REGIONER_2025.length,6);assert.equal(UNHCR_REGIONER_2025.reduce((a,d)=>a+d.personer,0),28461306);assert.equal(UNHCR_REGIONER_2025.reduce((a,d)=>a+d.landOmrader,0),167);
 for(const d of UNHCR_REGIONER_2025)assert.equal(d.personer,r.filter(x=>x.region===d.kode).reduce((a,x)=>a+x.verdi,0));
});
test("kap11: offisielle kommunepunkter kobles bare til riktige kommuner",()=>{
 assert.equal(MIGRASJON_KOMMUNEPUNKTER.length,5);assert.deepEqual(MIGRASJON_KOMMUNEPUNKTER.map(d=>d.kode),["0301","3209","1804","5501","5601"]);
 for(const p of MIGRASJON_KOMMUNEPUNKTER){assert.ok(p.lat>59&&p.lat<71&&p.lon>10&&p.lon<25);const r=FLYTTING_REGIONER.find(d=>d.kode===p.kode);assert.equal(r?.type,"Kommune");assert.equal(r?.navn,p.navn);assert.equal(r?.ar,2025);}
 const s=read("../components/geografi/migrasjon-kart.tsx");assert.match(s,/zoom=\{4\} basemap/);assert.match(s,/ikke bysentrum eller kommunegrenser/);assert.match(s,/Null, referanse/);assert.match(s,/ikke total befolkningsvekst/);
});
test("kap11: verifiserte bruksvilkår, avgrensning og statisk data uten personidentifikasjon",()=>{
 const d=JSON.parse(read("../../docs/geografi-kap11-kartdata-og-vilkar.json"));assert.equal(d.UNHCR.ikraft,"2026-07-01");assert.match(d.UNHCR.lisens,/CC BY 4.0/);assert.deepEqual(d.UNHCR.rader,[100,67]);assert.match(d.UNHCR.bilateraleData,/null rader/);assert.equal(d.kommunePunkter.koordinatoperasjonensOppgitteNoyaktighetMeter,1);
 const s=read("../components/geografi/migrasjon-kart.tsx");for(const term of ["OIP","UNRWA","asylsøkere","internt fordrevne","ikke et offisielt UNHCR-kart","65-prosentandelen","beholdning"] )assert.ok(s.includes(term),term);assert.doesNotMatch(s,/fetch\(|localStorage|setInterval|Math\.random|markerEnd/);
});
