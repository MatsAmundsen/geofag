import {it} from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
it('Vg1-feltlogg er lokal og lar eleven vurdere risiko uten automatisk skår',()=>{
 const s=readFileSync(new URL('../components/geografi/feltlogg-vg1.tsx',import.meta.url),'utf8');
 assert.match(s,/Ingen målinger er forhåndsutfylt/);assert.match(s,/Risikovurdering eleven gjør selv/);assert.match(s,/Ingen poengskår/);assert.doesNotMatch(s,/localStorage|sessionStorage|fetch\(|navigator\.geolocation/);
});
