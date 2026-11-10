import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('Geografi kap. 1–2 reserves all 21 lazy slots before the registry has loaded', () => {
  const body = read('src/components/poster-body.tsx');
  const css = read('src/styles.css');
  const md = read('src/lib/posts/geo-verktoy.md') + read('src/lib/posts/geo-feltarbeid.md');
  const ids = [...md.matchAll(/^```widget\n(Geo(?:Verktoy|Felt)\w+)\n```$/gm)].map((m) => m[1]);
  assert.equal(new Set(ids).size, 21);
  assert.match(body, /const GEO_PLASS = \/\^Geo\(\?:Verktoy\|Felt\)\//);
  assert.match(body, /<div className="geo-plass" data-widget=\{id\}>/);
  assert.match(css, /\.geo-plass \{\s+display: flow-root;\s+min-height: var\(--geo-slot/);
  for (const id of ids) {
    assert.equal(css.split(`.geo-plass[data-widget="${id}"]`).length - 1, 5, id);
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

test('pattern map has a keyboard-native full-size link', () => {
  assert.match(read('src/components/geografi/kap1-figurer.tsx'), /<a href="\/images\/geografi\/monsterkart-byer.svg"[^>]*>Vis kartet i full størrelse/);
});


test('ready chapter reserves text space before the CMS response', () => {
  const source = read('src/components/geografi/kapittel-side.tsx');
  assert.match(source, /kapittel.tekstKlar \|\| post\?\.bodyMarkdown \? \(/);
  assert.match(source, /<section className="prose-geofag mt-10 min-h-dvh" aria-busy=\{!post\}>/);
});
