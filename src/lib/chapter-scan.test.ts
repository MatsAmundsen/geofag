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

const libDir = dirname(fileURLToPath(import.meta.url));
const readChapter = (name: string) =>
  readFileSync(join(libDir, name === "platetektonikk" ? "platetektonikk-post.md" : `posts/${name}.md`), "utf8");

const chapterMarkdown = readChapter("platetektonikk");

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
    assert.equal(doc.sections[5]?.label, "Modell");
    assert.deepEqual(
      doc.sections.map((section) => section.label),
      [
        "Jordens indre",
        "Bevisene",
        "Drivkrefter",
        "Smelting",
        "Plategrenser",
        "Modell",
        "Wilsonsyklus",
        "Begreper",
        "Quiz",
      ],
    );
    assert.match(doc.sections[0]?.markdown ?? "", /Indre fast kjerne/);
    assert.match(doc.sections[2]?.markdown ?? "", /Trench suction/);
    assert.ok(doc.sections[0]?.subsections.length >= 2);
    assert.equal(doc.sections[0]?.subsections[0]?.title, "Inndeling av jorden indre");
    assert.match(doc.sections[0]?.subsections[0]?.markdown ?? "", /Indre fast kjerne/);
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

describe("scan chips for the other geosfære chapters", () => {
  it("labels Vulkaner with short topic chips", () => {
    const doc = prepareChapterScan(readChapter("vulkaner"));
    assert.deepEqual(
      doc.sections.map((section) => section.label),
      [
        "Motor",
        "Magmakjemi",
        "Vulkantyper",
        "Hotspots",
        "Pliniansk",
        "Farer",
        "Modell",
        "Jan Mayen",
        "Begreper",
        "Quiz",
      ],
    );
  });

  it("labels Jordskjelv with short topic chips", () => {
    const doc = prepareChapterScan(readChapter("jordskjelv"));
    assert.deepEqual(
      doc.sections.map((section) => section.label),
      [
        "Tilbakefjæring",
        "Bølger",
        "Måling",
        "Wadati-Benioff",
        "Norge",
        "Tsunami",
        "Sikring",
        "Begreper",
        "Quiz",
      ],
    );
  });

  it("labels Bergarter with short topic chips", () => {
    const doc = prepareChapterScan(readChapter("bergarter"));
    assert.deepEqual(
      doc.sections.map((section) => section.label),
      [
        "Mineraler",
        "Kretsløpet",
        "Magmatiske",
        "Sedimentære",
        "Metamorfe",
        "Tynnsnitt",
        "Modell",
        "Datering",
        "Begreper",
        "Quiz",
      ],
    );
  });
});
