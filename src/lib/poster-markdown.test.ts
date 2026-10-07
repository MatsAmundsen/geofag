import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CHAPTER_SCAN_WIDGET_IDS,
  EARTH_LAYERS_PHOTO_SRC,
  injectEarthLayersPhoto,
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
    assert.equal(injected.includes(EARTH_LAYERS_PHOTO_SRC), false);
  });

  it("inserts the earth-layer photo above Inndeling when a saved post lacks it", () => {
    const stored = [
      "## Platetektonikk",
      "",
      "For å forstå platetektonikk må vi først forstå hvordan jorden er bygd opp.",
      "",
      "### Inndeling av jorden indre",
      "Jorden er kan deles inn i flere lag.",
      "",
      "## Oppdagelsen og bevisene",
      "Wegener.",
    ].join("\n");
    const injected = injectEarthLayersPhoto(stored);
    const photoAt = injected.indexOf(EARTH_LAYERS_PHOTO_SRC);
    const headingAt = injected.indexOf("### Inndeling av jorden indre");
    assert.ok(photoAt > 0);
    assert.ok(photoAt < headingAt);
    assert.equal(injectEarthLayersPhoto(injected), injected);
    assert.equal((injected.match(/geo-jordens-indre-lagdeling-3d\.jpg/g) ?? []).length, 1);
  });

  it("does not duplicate the earth-layer photo already in the seed", () => {
    const injected = injectPosterWidgets(chapterMarkdown);
    assert.equal((injected.match(/geo-jordens-indre-lagdeling-3d\.jpg/g) ?? []).length, 1);
  });

  it("places the Høytrykk quiz once and keeps it off Vulkaner", () => {
    const lib = dirname(fileURLToPath(import.meta.url));
    const hoytrykk = readFileSync(join(lib, "posts/hoytrykk-lavtrykk.md"), "utf8");
    const injected = injectPosterWidgets(hoytrykk);
    const ids = listedWidgetIds(injected);
    assert.equal(ids.has("QuizHoytrykk"), true);
    assert.equal((injected.match(/QuizHoytrykk/g) ?? []).length, 1);
    for (const id of [
      "AtmosphericColumn",
      "RelativePressure",
      "LowPressureCrossSection",
      "HighPressureCrossSection",
      "MettetForklaring",
    ]) {
      assert.equal(ids.has(id), true, `hoytrykk missing ${id}`);
      assert.equal((injected.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(ids.has("QuizVulkaner"), false);
    assert.equal(hoytrykk.includes("10 tonn"), false);
    assert.equal(hoytrykk.includes("fuktadiabatisk"), false);
    assert.equal(hoytrykk.includes("Det ser vi nærmere på nedenfor"), false);
    assert.equal(hoytrykk.includes("Hva betyr «mettet»?"), false);
    assert.equal(hoytrykk.includes("**Mettet luft:**"), true);
    assert.equal(hoytrykk.includes("**Duggpunkt:**"), true);
    assert.equal(hoytrykk.includes("## Hva er høytrykk og lavtrykk?"), true);
    assert.equal(hoytrykk.includes("<"), false);
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
    const vulkanInjected = injectPosterWidgets(readFileSync(join(lib, "posts/vulkaner.md"), "utf8"));
    const vulkaner = listedWidgetIds(vulkanInjected);
    const jordInjected = injectPosterWidgets(readFileSync(join(lib, "posts/jordskjelv.md"), "utf8"));
    const jordskjelv = listedWidgetIds(jordInjected);
    const bergarter = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/bergarter.md"), "utf8")),
    );
    for (const id of [
      "VolcanoTypes",
      "MagmaViscosity",
      "CalderaFormation",
      "IcelandContrast",
      "VeiScale",
      "VolcanoMonitoring",
      "VolcanicHazards",
      "VolcanicWinter",
      "JanMayen",
      "HotspotPlume",
      "VolcanoModel",
      "QuizVulkaner",
    ]) {
      assert.equal(vulkaner.has(id), true, `vulkaner missing ${id}`);
      assert.equal((vulkanInjected.match(new RegExp(`\\b${id}\\b`, "g")) ?? []).length, 1, id);
    }
    assert.equal(jordskjelv.has("JanMayen"), false);
    for (const id of ["ElasticRebound", "BoundaryQuakes", "QuizJordskjelv"]) {
      assert.equal(jordskjelv.has(id), true, `jordskjelv missing ${id}`);
    }
    for (const id of ["ForvitringForklaring", "ForvitringFoto", "RockCycle", "QuizBergarter"]) {
      assert.equal(bergarter.has(id), true, `bergarter missing ${id}`);
    }
    const vann = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/vann-og-flom.md"), "utf8")),
    );
    for (const id of ["Kretslop", "AkviferForklaring", "Hydrograph", "QuizVannOgFlom"]) {
      assert.equal(vann.has(id), true, `vann-og-flom missing ${id}`);
    }
    assert.equal(bergarter.has("QuizVannOgFlom"), false);
    assert.equal(vann.has("QuizBergarter"), false);
    assert.equal(bergarter.has("RockPetrologyModel"), false);
    assert.equal(bergarter.has("BowenReactionSeries"), false);
    assert.ok(CHAPTER_SCAN_WIDGET_IDS.includes("QuizVulkaner"));
    assert.ok(CHAPTER_SCAN_WIDGET_IDS.includes("QuizVannOgFlom"));
  });
});

describe("jordskjelv poster", () => {
  it("keeps the chapter widgets and drops formulas and exclamation marks", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/jordskjelv.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of [
      "HyposenterForklaring",
      "ElasticRebound",
      "EarthquakeWavePhysics",
      "Seismogram",
      "BoundaryQuakes",
      "IntraplateForklaring",
      "NorwayEarthquakes",
      "QuizJordskjelv",
    ]) {
      assert.equal(ids.has(id), true, `jordskjelv missing ${id}`);
    }
    assert.equal(md.replace(/!\[[^\]]*\]\([^)]*\)/g, "").includes("!"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Greens"), false);
    assert.equal(md.includes("Eurokode"), false);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("## Test deg selv"), true);
  });
});

describe("jordsystemene poster", () => {
  it("keeps the chapter widgets and drops the editor notice", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/jordsystemene.md"),
      "utf8",
    );
    const injected = injectPosterWidgets(md);
    const ids = listedWidgetIds(injected);
    for (const id of [
      "VekselvirkningForklaring",
      "SpheresDiagram",
      "FjordFoto",
      "CarbonCycleDiagram",
      "EarthSystemsModel",
      "QuizJordsystemene",
    ]) {
      assert.equal(ids.has(id), true, `jordsystemene missing ${id}`);
      assert.equal((injected.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    for (const gone of ["AkviferForklaring", "ForvitringFoto", "IsostasiForklaring", "Hva er forvitring?"]) {
      assert.equal(md.includes(gone), false, gone);
    }
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("## Test deg selv"), true);
    assert.equal(md.includes("## Kilder"), false);
    assert.equal(ids.size, 6);
    assert.equal(ids.has("QuizVulkaner"), false);
    assert.equal(ids.has("QuizHoytrykk"), false);
  });

  it("places the quick-clay widgets into Skred without borrowing them elsewhere", () => {
    const lib = dirname(fileURLToPath(import.meta.url));
    const skred = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/skred.md"), "utf8")),
    );
    for (const id of ["KvikkleireForklaring", "KvikkleireSteg", "QuizSkred"]) {
      assert.equal(skred.has(id), true, `skred missing ${id}`);
    }
    const bergarter = readFileSync(join(lib, "posts/bergarter.md"), "utf8");
    const injected = injectPosterWidgets(bergarter);
    assert.equal(listedWidgetIds(injected).has("QuizSkred"), false);
    assert.equal(listedWidgetIds(injected).has("KvikkleireForklaring"), false);
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

  it("drops an italic caption separated from the photo by a horizontal rule", () => {
    const md =
      "![Divergerende grense](/images/fig-spredring.jpg)\n\n--------\n\n*Island er et av de få stedene.*\n\n------\n\nNeste avsnitt.";
    const stripped = stripCatalogImageCaptions(md);
    assert.equal(stripped.includes("*Island"), false);
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
