import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  injectPosterWidgets,
  listedWidgetIds,
  parsePosterMarkdown,
  POSTER_WIDGET_IDS,
  stripCatalogImageCaptions,
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
