import {it} from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
it('Vg1-feltlogg er lokal og lar eleven vurdere risiko uten automatisk skår',()=>{
 const s=readFileSync(new URL('../components/geografi/feltlogg-vg1.tsx',import.meta.url),'utf8');
 assert.match(s,/Ingen målinger er forhåndsutfylt/);assert.match(s,/Risikovurdering eleven gjør selv/);assert.match(s,/Ingen poengskår/);assert.doesNotMatch(s,/localStorage|sessionStorage|fetch\(|navigator\.geolocation/);
});

it("har ni egne feltfigurer der bare kapitlets konstruerte øvingstall er forhåndsutfylt",()=>{const md=readFileSync(new URL('./posts/geo-feltarbeid.md',import.meta.url),'utf8');assert.doesNotMatch(md,/FIGURPLASSHOLDER/);const s=readFileSync(new URL('../components/geografi/kap2-figurer.tsx',import.meta.url),'utf8');assert.match(s,/const DATA = \{ A: \[10\.0, 10\.2, 10\.4\], B: \[11\.0, 11\.2, 11\.4\] \}/);assert.match(md,/\| A \| 10,0 \| 10,2 \| 10,4 \| 10,2 \|/);assert.match(md,/\| B \| 11,0 \| 11,2 \| 11,4 \| 11,2 \|/);assert.match(s,/Konstruerte tall/);assert.doesNotMatch(s,/localStorage|sessionStorage|navigator\.geolocation|fetch\(/);});
