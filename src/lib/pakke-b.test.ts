import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { injectPosterWidgets, listedWidgetIds } from "./poster-markdown.ts";
import { SAMMENDRAG_B, SJEKK_DEG_SELV_B } from "./kapittel-mal-b.ts";
import { KILDER_B } from "./kilder-b.ts";

const lib = dirname(fileURLToPath(import.meta.url));
const read = (rel: string) => readFileSync(join(lib, rel), "utf8");

const NEW_CHAPTERS: { slug: string; widgets: string[] }[] = [
  {
    slug: "skyer-nedbor-klimasoner",
    widgets: [
      "FigSkyerNivaaer",
      "FigNedborTyper",
      "FigKlimadiagramKystInnland",
      "FigKoppenNorge",
      "SjekkSkyer1",
      "SjekkSkyer2",
      "SjekkSkyer3",
      "SjekkSkyer4",
      "SjekkSkyer5",
      "SammendragSkyer",
      "QuizSkyer",
    ],
  },
];

describe("Pakke B: nye kapitler", () => {
  for (const { slug, widgets } of NEW_CHAPTERS) {
    it(`${slug}: følger kapittelmalen`, () => {
      const md = read(`posts/${slug}.md`);
      const ids = listedWidgetIds(injectPosterWidgets(md));
      for (const id of widgets) {
        assert.equal(ids.has(id), true, `${slug} mangler ${id}`);
        assert.equal((md.match(new RegExp(`\\b${id}\\b`, "g")) ?? []).length, 1, id);
      }
      assert.equal(md.includes("!"), false);
      assert.equal(md.includes("<"), false);
      assert.equal(md.includes("Her kan du redigere"), false);
      assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
      assert.equal(md.includes("## Viktige begreper"), true);
      assert.equal(md.includes("## Sammendrag"), true);
      assert.equal(md.includes("## Test deg selv"), true);
    });

    it(`${slug}: er registrert i navigasjonen`, () => {
      const nav = read("nav.ts");
      assert.equal(nav.includes(`to: "/tema/${slug}"`), true);
      assert.equal(read("../../public/sitemap.xml").includes(`/tema/${slug}<`), true);
      assert.equal(read("chapter-ingress.ts").includes(`"${slug}":`), true);
      assert.equal(read(`../routes/tema/${slug}.tsx`).includes(`loadChapterPost("${slug}")`), true);
    });
  }

  it("Sjekk- og Sammendrag-id-ene i kapitlene finnes i malen", () => {
    for (const { slug, widgets } of NEW_CHAPTERS) {
      for (const id of widgets) {
        if (id.startsWith("Sjekk")) assert.ok(SJEKK_DEG_SELV_B[id.slice(5)], `${slug}: ${id}`);
        if (id.startsWith("Sammendrag")) assert.ok(SAMMENDRAG_B[id.slice(10)], `${slug}: ${id}`);
      }
    }
  });

  it("alle figur- og quiz-id-er har en registrering i widget-registeret", () => {
    const registry = read("../components/figur-bestilling.tsx") + read("../components/poster-widgets-b.tsx");
    for (const { slug, widgets } of NEW_CHAPTERS) {
      for (const id of widgets) {
        if (id.startsWith("Fig") || id.startsWith("Quiz")) {
          assert.equal(registry.includes(id), true, `${slug}: ${id} er ikke registrert`);
        }
      }
    }
  });

  it("sjekkspørsmål har tre svaralternativer og et gyldig svar", () => {
    for (const [key, qs] of Object.entries(SJEKK_DEG_SELV_B)) {
      for (const q of qs) {
        assert.equal(q.options.length, 3, key);
        assert.ok(q.answer >= 0 && q.answer < 3, key);
        assert.ok(q.explain.length > 0, key);
      }
    }
  });

  it("kildelistene er sortert og uten dobbeltoppføringer", () => {
    for (const [name, list] of Object.entries(KILDER_B)) {
      const keys = list.map((k) => `${k.prefix}${k.italic}`);
      assert.equal(new Set(keys).size, keys.length, name);
      const sorted = [...list].sort((a, b) =>
        `${a.prefix}${a.italic}`.localeCompare(`${b.prefix}${b.italic}`, "nb"),
      );
      assert.deepEqual(list, sorted, name);
    }
  });
});
