import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('Geografi reserves all 21 lazy slots before the registry has loaded', () => {
  const body = read('src/components/poster-body.tsx');
  const css = read('src/styles.css');
  const registry = read('src/components/poster-widget-renderer.tsx');
  const ids = [...registry.matchAll(/"(Geo(?:Kart1|Felt2)\w+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, 21);
  assert.match(body, /<div key=\{`w-\$\{part.id\}-\$\{index\}`\} data-widget=\{part.id\}>\s*<Suspense/);
  assert.match(css, /min-height: var\(--geo-slot/);
  assert.match(css, /display: flow-root/);
  for (const id of ids) {
    assert.equal(css.split(`[data-widget="${id}"]`).length - 1, 5, id);
  }
});

test('microclimate scale keeps the upper tick and every point inside the chart', () => {
  const source = read('src/components/geografi/kap2-figurer.tsx').split('function Mikroklima()')[1];
  const scale = source.match(/const y = \(v: number\) => (\d+) - \(v - ([\d.]+)\) \* (\d+)/);
  assert.ok(scale);
  const y = (v) => Number(scale[1]) - (v - Number(scale[2])) * Number(scale[3]);
  assert.ok(y(11.5) > 20, 'space for upper tick glyph');
  for (const v of [10, 10.2, 10.4, 11, 11.2, 11.4]) {
    assert.ok(y(v) - 8 >= 0 && y(v) + 8 <= 280, String(v));
  }
  assert.match(source, /viewBox="0 0 400 280"/);
});

test('fieldwork labels use unscaled HTML, risk cell numbers stay large', () => {
  const source = read('src/components/models/fieldwork-observation-model.tsx');
  assert.doesNotMatch(source, /text-\[(?:10|11)px\]/);
  const svgs = [...source.matchAll(/<svg\b[\s\S]*?<\/svg>/g)].map((m) => m[0]);
  assert.equal(svgs.length, 4);
  for (const svg of svgs) assert.match(svg, /role="img"/);
  for (const svg of svgs.slice(0, 3)) assert.doesNotMatch(svg, /<text\b/);
  assert.match(svgs[3], /fontSize="26"/);
  assert.match(source, /<li className="text-rose-200">Fallvinkel/);
});

test('pattern map has a keyboard-native full-size link', () => {
  assert.match(read('src/components/geografi/kap1-figurer.tsx'), /<a href="\/images\/geografi\/monsterkart-byer.svg"[^>]*>Vis kartet i full størrelse/);
});


test('ready chapter reserves text space before the CMS response', () => {
  const source = read('src/components/geografi/kapittel-side.tsx');
  assert.match(source, /kapittel.tekstKlar \|\| post\?\.bodyMarkdown \? \(/);
  assert.match(source, /<section className="prose-geofag mt-10 min-h-dvh" aria-busy=\{!post\}>/);
});
