import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CHAPTER_SCAN_WIDGET_IDS,
  injectPosterWidgets,
  listedWidgetIds,
  parsePosterMarkdown,
  POSTER_WIDGET_IDS,
  stripCatalogImageCaptions,
  stripChapterEditorNotice,
} from "./poster-markdown.ts";

const chapterMarkdown = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "platetektonikk-post.md"),
  "utf8",
);

describe("parsePosterMarkdown", () => {
  it("splits widget fences out of surrounding prose", () => {
    const parts = parsePosterMarkdown(
      "Hello\n\n```widget\nEarthLayers\n```\n\nWorld\n\n```widget\nQuizMelting\n```\n",
    );
    assert.deepEqual(
      parts.map((part) => part.type),
      ["markdown", "widget", "markdown", "widget"],
    );
    assert.equal(parts[1]?.type === "widget" ? parts[1].id : "", "EarthLayers");
    assert.equal(parts[3]?.type === "widget" ? parts[3].id : "", "QuizMelting");
  });

  it("returns a single markdown part when there are no widgets", () => {
    const parts = parsePosterMarkdown("Bare tekst");
    assert.deepEqual(parts, [{ type: "markdown", value: "Bare tekst" }]);
  });
});

describe("injectPosterWidgets", () => {
  it("places every Platetektonikk figure into the seed chapter", () => {
    const injected = injectPosterWidgets(chapterMarkdown);
    const ids = listedWidgetIds(injected);
    for (const id of POSTER_WIDGET_IDS) {
      assert.equal(ids.has(id), true, `missing widget ${id}`);
    }
    assert.equal(ids.size, POSTER_WIDGET_IDS.length);
  });

  it("does not duplicate widgets that are already fenced", () => {
    const once = injectPosterWidgets(chapterMarkdown);
    const twice = injectPosterWidgets(once);
    assert.deepEqual([...listedWidgetIds(twice)].sort(), [...listedWidgetIds(once)].sort());
    assert.equal(listedWidgetIds(twice).size, POSTER_WIDGET_IDS.length);
  });

  it("keeps an explicit widget where the author placed it", () => {
    const md = "## Intro\n\n```widget\nEarthLayers\n```\n\n## Oppdagelsen og bevisene\n\ntekst";
    const injected = injectPosterWidgets(md);
    const parts = parsePosterMarkdown(injected);
    const earth = parts.filter((part) => part.type === "widget" && part.id === "EarthLayers");
    assert.equal(earth.length, 1);
    assert.equal(parts[1]?.type, "widget");
  });

  it("skips missing anchors instead of inventing content", () => {
    const injected = injectPosterWidgets("Kort egendefinert post uten kapitteloverskrifter.");
    assert.equal(listedWidgetIds(injected).size, 0);
  });

  it("does not put the Platetektonikk quiz into Vulkaner", () => {
    const vulkaner = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/vulkaner.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(vulkaner));
    assert.equal(ids.has("QuizTestDegSelv"), false);
    assert.equal(ids.has("QuizVulkaner"), true);
    assert.equal(ids.has("VolcanoTypes"), true);
    assert.equal(ids.has("VolcanoModel"), true);
  });

  it("places chapter-scan widgets into Vulkaner, Jordskjelv and Bergarter", () => {
    const lib = dirname(fileURLToPath(import.meta.url));
    const vulkaner = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/vulkaner.md"), "utf8")),
    );
    const jordskjelv = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/jordskjelv.md"), "utf8")),
    );
    const bergarter = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/bergarter.md"), "utf8")),
    );
    for (const id of ["VolcanoTypes", "HotspotPlume", "VolcanoModel", "QuizVulkaner"]) {
      assert.equal(vulkaner.has(id), true, `vulkaner missing ${id}`);
    }
    for (const id of ["ElasticRebound", "BoundaryQuakes", "QuizJordskjelv"]) {
      assert.equal(jordskjelv.has(id), true, `jordskjelv missing ${id}`);
    }
    for (const id of ["RockCycle", "RockPetrologyModel", "QuizBergarter"]) {
      assert.equal(bergarter.has(id), true, `bergarter missing ${id}`);
    }
    assert.ok(CHAPTER_SCAN_WIDGET_IDS.includes("QuizVulkaner"));
  });
});

describe("stripCatalogImageCaptions", () => {
  it("drops the italic line under a known photo so PhotoFigure is not doubled", () => {
    const md =
      "![Divergerende grense](/images/fig-spredring.jpg)\n\n*Island er et av de få stedene.*\n\nNeste avsnitt.";
    const stripped = stripCatalogImageCaptions(md);
    assert.equal(stripped.includes("*Island"), false);
    assert.equal(stripped.includes("![Divergerende grense](/images/fig-spredring.jpg)"), true);
    assert.equal(stripped.includes("Neste avsnitt."), true);
  });
});

describe("stripChapterEditorNotice", () => {
  it("strips the leading editor blockquote notice from a chapter", () => {
    const raw =
      "> Interaktive modeller, quizer og 3D-diagrammer ligger i kapittelet [/geofag-1/platetektonikk](/geofag-1/platetektonikk). Her kan du redigere **hele fagteksten**.\n\n## Kapittelstart\nInnhold her.";
    assert.equal(stripChapterEditorNotice(raw), "## Kapittelstart\nInnhold her.");
  });

  it("leaves markdown without the editor notice untouched", () => {
    const raw = "## Egendefinert post\nIngen melding her.";
    assert.equal(stripChapterEditorNotice(raw), raw);
  });
});
