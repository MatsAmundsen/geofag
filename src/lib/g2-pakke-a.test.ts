import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(join(here, p), "utf8");

const NEW_CHAPTERS = [
  "energi-regning",
  "klimaendring-menneskeskapt",
  "klimatiltak",
  "klimaforskning",
];

const widgetSources = [
  read("../components/g2-pakke-a-widgets.tsx"),
  read("../components/g2-pakke-a-figurer.tsx"),
  read("../components/poster-body.tsx"),
  read("poster-quizzes-pakke-a.ts"),
  read("poster-quizzes-pakke-a-klima.ts"),
  read("poster-quizzes.ts"),
  read("kapittel-mal.ts"),
].join("\n");

function widgetKnown(id: string): boolean {
  const sjekk = /^Sjekk(\w+)$/.exec(id);
  if (sjekk) return new RegExp(`\\b${sjekk[1]}\\d*\\b`).test(widgetSources);
  const sammendrag = /^Sammendrag(\w+)$/.exec(id);
  if (sammendrag) return new RegExp(`\\b${sammendrag[1]}\\b\\s*:`).test(widgetSources);
  return new RegExp(`\\b${id}\\b`).test(widgetSources);
}

describe("Geofag 2 pakke A, nye kapitler", () => {
  for (const slug of NEW_CHAPTERS) {
    const md = read(`posts/${slug}.md`);
    it(`${slug}: har fast kapittelstruktur`, () => {
      assert.match(md, /Kompetansemål i Geofag 2/);
      assert.match(md, /Hva tror du\?/);
      assert.match(md, /^## Viktige begreper/m);
      assert.match(md, /^## Sammendrag/m);
      assert.match(md, /^## Test deg selv/m);
    });
    it(`${slug}: ingen utropstegn eller vinkelparenteser`, () => {
      assert.ok(!md.includes("!"));
      assert.ok(!md.includes("<"));
    });
    it(`${slug}: alle widgeter er registrert og brukt en gang`, () => {
      const ids = [...md.matchAll(/```widget\n(\w+)\n```/g)].map((m) => m[1]!);
      assert.ok(ids.length > 0);
      assert.equal(new Set(ids).size, ids.length);
      for (const id of ids) assert.ok(widgetKnown(id), `ukjent widget ${id}`);
    });
    it(`${slug}: er registrert i nav, ingress, sitemap og rute`, () => {
      assert.match(read("nav.ts"), new RegExp(`/tema/${slug}`));
      assert.match(read("chapter-ingress.ts"), new RegExp(slug));
      assert.match(read("gemini-by-path.ts"), new RegExp(`/tema/${slug}`));
      assert.match(read("../../public/sitemap.xml"), new RegExp(`/tema/${slug}`));
      assert.match(read(`../routes/tema/${slug}.tsx`), new RegExp(`posterSlug="${slug}"`));
    });
  }
});
