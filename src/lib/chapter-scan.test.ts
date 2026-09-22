import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collapseWhitespace,
  prepareChapterScan,
  reconstructChapterMarkdown,
  slugifyHeading,
  splitChapterByH2,
} from "./chapter-scan.ts";
import {
  injectPosterWidgets,
  listedWidgetIds,
  POSTER_WIDGET_IDS,
  stripChapterEditorNotice,
} from "./poster-markdown.ts";

const chapterMarkdown = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "platetektonikk-post.md"),
  "utf8",
);

describe("splitChapterByH2", () => {
  it("keeps preamble and does not treat ### as a new section", () => {
    const doc = splitChapterByH2(
      "Ingress her.\n\n## Første\n\nAvsitt.\n\n### Under\n\nDetalj.\n\n## Andre\n\nSlutt.\n",
    );
    assert.equal(doc.preamble, "Ingress her.");
    assert.equal(doc.sections.length, 2);
    assert.equal(doc.sections[0]?.title, "Første");
    assert.match(doc.sections[0]?.markdown ?? "", /### Under/);
    assert.match(doc.sections[0]?.markdown ?? "", /Detalj/);
    assert.equal(doc.sections[1]?.title, "Andre");
  });

  it("reconstructs the same prose after a round-trip", () => {
    const cleaned = stripChapterEditorNotice(chapterMarkdown);
    const doc = splitChapterByH2(cleaned);
    assert.equal(
      collapseWhitespace(reconstructChapterMarkdown(doc)),
      collapseWhitespace(cleaned),
    );
  });

  it("splits the live Platetektonikk chapter into the known H2 sections", () => {
    const doc = splitChapterByH2(stripChapterEditorNotice(chapterMarkdown));
    assert.match(doc.preamble, /Kjerneelementer som dekkes/);
    assert.deepEqual(
      doc.sections.map((section) => section.title),
      [
        "Platetektonikk",
        "Oppdagelsen og bevisene: Fra Wegeners puslespill til den magnetiske «båndopptakeren»",
        "Hva driver platene? Slab pull, ridge push og gravitasjonell fysikk",
        "Hvorfor mantelberg smelter: Dekompresjon, flukssmelting og mantelplymer",
        "Plategrensene: Tre relative bevegelser, seks geologiske miljøer",
        "Interaktiv geodynamisk modell: Utforsk plategrensene",
        "Wilsonsyklusen: Havbassengenes liv og død",
        "Sentralt fagvokabular",
        "Test deg selv",
      ],
    );
    assert.equal(doc.sections[0]?.label, "Jordens indre");
    assert.equal(doc.sections[4]?.label, "Plategrenser");
    assert.match(doc.sections[0]?.markdown ?? "", /Indre fast kjerne/);
    assert.match(doc.sections[2]?.markdown ?? "", /Trench suction/);
  });
});

describe("prepareChapterScan", () => {
  it("keeps every injected widget with the surrounding section text", () => {
    const doc = prepareChapterScan(chapterMarkdown);
    const joined = doc.sections.map((section) => section.markdown).join("\n");
    const ids = listedWidgetIds(joined);
    for (const id of POSTER_WIDGET_IDS) {
      assert.equal(ids.has(id), true, `missing widget ${id}`);
    }
    assert.match(doc.sections[0]?.markdown ?? "", /EarthLayers/);
    assert.match(doc.sections[5]?.markdown ?? "", /PlateTectonicsModel/);
    assert.equal(
      collapseWhitespace(reconstructChapterMarkdown(doc)),
      collapseWhitespace(injectPosterWidgets(stripChapterEditorNotice(chapterMarkdown))),
    );
  });
});

describe("slugifyHeading", () => {
  it("makes stable Norwegian anchors", () => {
    assert.equal(slugifyHeading("Sentralt fagvokabular"), "sentralt-fagvokabular");
    assert.equal(slugifyHeading("Wilsonsyklusen: Havbassengenes liv og død").startsWith("wilsonsyklusen"), true);
  });
});
