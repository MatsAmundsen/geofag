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

  it("keeps the vindsystemet poster on the template", () => {
    const lib = dirname(fileURLToPath(import.meta.url));
    const md = readFileSync(join(lib, "posts/vindsystemet.md"), "utf8");
    const injected = injectPosterWidgets(md);
    const ids = listedWidgetIds(injected);
    for (const id of [
      "StralingsbalanseForklaring",
      "InsolationDiagram",
      "TermiskDirekteForklaring",
      "OneVsThreeCellsDiagram",
      "WindCellsDiagram",
      "HadleyCloseupDiagram",
      "SubsidensForklaring",
      "SurfaceWindsDiagram",
      "GlobalClimateZonesDiagram",
      "VindBelterFoto",
      "PolarFrontNorwayDiagram",
      "WindSystemModel",
      "QuizVindsystemet",
    ]) {
      assert.equal(ids.has(id), true, `vindsystemet missing ${id}`);
      assert.equal((injected.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2 (LK20)"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("2,5 MJ"), false);
    assert.equal(md.includes("3500"), false);
  });

  it("keeps the værkart poster on the template", () => {
    const lib = dirname(fileURLToPath(import.meta.url));
    const md = readFileSync(join(lib, "posts/vaerkart.md"), "utf8");
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of [
      "SynoptiskForklaring",
      "IsobarForklaring",
      "SynopticChart",
      "FrontForklaring",
      "FrontProfile",
      "Weather24h",
      "StationModel",
      "UpperAir500",
      "RadarNowcast",
      "QuizVaerkart",
    ]) {
      assert.equal(ids.has(id), true, `vaerkart missing ${id}`);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2 (LK20)"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/vaerkart"), true);
    assert.equal(md.includes("Bjerknes-modellen"), true);
    assert.equal(md.includes("følger ofte et fast løp"), false);
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
    const ressurser = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/geologiske-ressurser.md"), "utf8")),
    );
    const felt = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/feltarbeid.md"), "utf8")),
    );
    for (const id of ["MalmForklaring", "QuizGeologiskeRessurser"]) {
      assert.equal(ressurser.has(id), true, `ressurser missing ${id}`);
    }
    for (const id of ["FeltarbeidForklaring", "QuizFeltarbeid"]) {
      assert.equal(felt.has(id), true, `feltarbeid missing ${id}`);
    }
    assert.equal(ressurser.has("QuizFeltarbeid"), false);
    assert.equal(felt.has("QuizGeologiskeRessurser"), false);
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
    assert.ok(CHAPTER_SCAN_WIDGET_IDS.includes("QuizGeologiskeRessurser"));
    assert.ok(CHAPTER_SCAN_WIDGET_IDS.includes("QuizFeltarbeid"));
  });

  it("places glacier widgets into Isbreer og landformer and keeps them off Vulkaner", () => {
    const lib = dirname(fileURLToPath(import.meta.url));
    const isbre = readFileSync(join(lib, "posts/isbreer-og-landformer.md"), "utf8");
    assert.equal(isbre.includes("## Kilder"), false);
    assert.equal(isbre.includes("Til DesignBOT"), false);
    assert.equal(isbre.includes("[FIGUR:"), false);
    assert.equal(isbre.includes("[FOTO:"), false);
    const injected = injectPosterWidgets(isbre);
    const ids = listedWidgetIds(injected);
    for (const id of [
      "FirnForklaring",
      "BreLengdesnitt",
      "VdalTilUdal",
      "BotnEggTind",
      "Avsetningsformer",
      "Frostsprengning",
      "IsostasiForklaring",
      "IsostasiSnitt",
      "QuizIsbre",
    ]) {
      assert.equal(ids.has(id), true, `isbre missing ${id}`);
      assert.equal(
        (injected.match(new RegExp("```widget\\n" + id + "\\n```", "g")) ?? []).length,
        1,
        id,
      );
    }
    const vulkaner = listedWidgetIds(
      injectPosterWidgets(readFileSync(join(lib, "posts/vulkaner.md"), "utf8")),
    );
    assert.equal(vulkaner.has("QuizIsbre"), false);
    assert.equal(vulkaner.has("BreLengdesnitt"), false);
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
      "Partikkelbolger",
      "JordasBolger",
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

describe("coriolis poster", () => {
  it("keeps the coriolis poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/coriolis.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of [
      "CoriolisForklaring",
      "KarusellDiagram",
      "AvboyningDiagram",
      "SyklonDiagram",
      "GeostrofiskDiagram",
      "EkmanForklaring",
      "SkalaDiagram",
      "QuizCoriolis",
    ]) {
      assert.equal(ids.has(id), true, `coriolis missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Rossby-tallet"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/coriolis"), true);
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

describe("lokale værsystemer poster", () => {
  it("keeps the lokale poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/lokale-vaersystemer.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of [
      "SolgangsbrisForklaring",
      "SeaBreezeLandBreeze",
      "ValleyWind",
      "FonForklaring",
      "InversjonForklaring",
      "PolarFrontCyclone",
      "QuizLokale",
    ]) {
      assert.equal(ids.has(id), true, `lokale missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/lokale-vaersystemer"), true);
    assert.equal(md.includes("4184"), false);
    assert.equal(md.includes("Rossby"), false);
    assert.equal(md.includes("sørvest for Island"), false);
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


describe("chapter posters from this pull request", () => {
  it("keeps the jetstrømmer poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/jetstrommer.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["JetForklaring", "NaoForklaring", "QuizJet"]) {
      assert.equal(ids.has(id), true, `jet missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Shinkansen"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/jetstrommer"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the climate-map poster on the template", () => {
    const md = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "posts/klima.md"), "utf8");
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["KlimaForklaring", "KlimaKart", "QuizKlima"]) {
      assert.equal(ids.has(id), true, `klima missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Utdanningsdirektoratet, 2020"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/klima"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the havstrømmer poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/havstrommer.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of [
      "HavstromForklaring",
      "DrivkrefterDiagram",
      "EkmanHavForklaring",
      "GyreDiagram",
      "OppvellingDiagram",
      "GolfDiagram",
      "TetthetDiagram",
      "QuizHavstrommer",
    ]) {
      assert.equal(ids.has(id), true, `havstrommer missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("termoklinen"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/havstrommer"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the climate overview poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/oversikt.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of [
      "KlimaDefinisjon",
      "StralingDiagram",
      "DrivhusForklaring",
      "PaadrivForklaring",
      "AlbedoFoto",
      "NorgeKlimaFoto",
      "QuizOversikt",
    ]) {
      assert.equal(ids.has(id), true, `oversikt missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("tretti"), false);
    assert.equal(md.includes("dytet"), false);
    assert.equal(md.includes("Det første skyvet på energibalansen"), true);
    assert.equal(md.includes("ikke det første skyvet"), true);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/klima/oversikt"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the ENSO poster on the template", () => {
    const md = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "posts/enso.md"), "utf8");
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["EnsoForklaring", "FaseDiagram", "BjerknesLoop", "QuizEnso"]) {
      assert.equal(ids.has(id), true, `enso missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Niño 3.4"), true);
    assert.equal(md.includes("Noen ganger ser havet ut som El Niño eller La Niña"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/klima/enso"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the IOD poster on the template", () => {
    const md = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "posts/iod.md"), "utf8");
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["IodForklaring", "QuizIod"]) {
      assert.equal(ids.has(id), true, `iod missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Black Summer"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/klima/iod"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the NAO poster on the template", () => {
    const md = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "posts/nao.md"), "utf8");
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["NaoForklaring", "QuizNao"]) {
      assert.equal(ids.has(id), true, `nao missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("sprengkulde"), false);
    assert.equal(md.includes("Sør-Norge"), true);
    assert.equal(md.includes("ikke automatisk det samme utslaget i hver landsdel"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/klima/nao"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the AMOC poster on the template", () => {
    const md = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "posts/amoc.md"), "utf8");
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["AmocForklaring", "QuizAmoc"]) {
      assert.equal(ids.has(id), true, `amoc missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("vippepunkt"), false);
    assert.equal(md.includes("## Ferskvann kan bremse beltet"), false);
    assert.equal(md.includes("siden 2004"), true);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/klima/amoc"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the cryosphere poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/kryosfaeren.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["KryoForklaring", "QuizKryo"]) {
      assert.equal(ids.has(id), true, `kryosfaeren missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("ELA"), true);
    assert.equal(md.includes("Her er isen som måles i år."), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/kryosfaeren"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the models poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/numeriske-modeller.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["ModellForklaring", "QuizModeller"]) {
      assert.equal(ids.has(id), true, `modeller missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("petaflops"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/numeriske-modeller"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the paleoclimate poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/paleoklima.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["PaleoForklaring", "QuizPaleo"]) {
      assert.equal(ids.has(id), true, `paleoklima missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("Satellittrekken starter altså"), false);
    assert.equal(md.includes("klimafølsomhet"), true);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/paleoklima"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the ice-age poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/milankovitch.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["IstidForklaring", "QuizIstider"]) {
      assert.equal(ids.has(id), true, `milankovitch missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("65 °N"), false);
    assert.equal(md.includes("65°N"), true);
    assert.equal(md.includes("Weichsel"), true);
    assert.equal(md.includes("Dagens breer er ikke kvartærtidens innlandsis."), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/milankovitch"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the hazard poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/vaerkatastrofer.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["OrkanForklaring", "QuizFarer"]) {
      assert.equal(ids.has(id), true, `vaerkatastrofer missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.toLowerCase().includes("baroklin"), true);
    assert.equal(md.includes("Bare store orkaner er farlige, er feil."), false);
    assert.equal(md.includes("bombesyklon"), true);
    assert.equal(md.includes("Hans"), true);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/vaerkatastrofer"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the adaptation poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/tilpasning.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["TilpasningForklaring", "QuizTilpasning"]) {
      assert.equal(ids.has(id), true, `tilpasning missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("bestilt"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/tilpasning"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the energy poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/energi-hav-luft.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["VindkraftForklaring", "QuizEnergi"]) {
      assert.equal(ids.has(id), true, `energi missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.includes("kubikken"), false);
    assert.equal(md.includes("bølgekraftverk"), true);
    assert.equal(md.includes("OTEC"), true);
    assert.equal(md.includes("Bærekraft er denne avveiningen, ikke bare at vinden kommer tilbake."), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/energi-hav-luft"), true);
  });
});


describe("chapter posters from this pull request", () => {
  it("keeps the fieldwork poster on the template", () => {
    const md = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "posts/felt-hav-luft-is.md"),
      "utf8",
    );
    const ids = listedWidgetIds(injectPosterWidgets(md));
    for (const id of ["FeltHavForklaring", "QuizFeltHav"]) {
      assert.equal(ids.has(id), true, `felt missing ${id}`);
      assert.equal((md.match(new RegExp(id, "g")) ?? []).length, 1, id);
    }
    assert.equal(md.includes("!"), false);
    assert.equal(md.includes("<"), false);
    assert.equal(md.includes("Her kan du redigere"), false);
    assert.equal(md.toLowerCase().includes("sjøbris"), true);
    assert.equal(md.includes("CTD"), true);
    assert.equal(md.includes("## Tre felt, samme kjede"), false);
    assert.equal(md.includes("Kompetansemål i Geofag 2"), true);
    assert.equal(md.includes("## Viktige begreper"), true);
    assert.equal(md.includes("/tema/felt-hav-luft-is"), true);
  });
});

describe("smelting under tynn plate", () => {
  const liveSnippet = [
    "## Platedrift - hva er det som driver platene?",
    "",
    "Innad i hver enkelt plate, har vi varierende tykkelse.",
    "Dette fører til at trykket blir akkurat lavt nok. **Vi har dermed fått en divergerende plategrense**",
    "",
    "Denne prosessen er det som setter igang platedrift. ",
    "",
    "---",
    "---",
    "",
    "Etter at smelteprosessen av mantelbergarter har funnet sted.",
    "",
    "## Hvorfor mantelberg smelter: Dekompresjon",
    "",
    "Tekst.",
    "",
    "## Plategrensene: Tre relative bevegelser",
    "",
  ].join("\n");

  const count = (md: string, id: string) =>
    md.split(`\`\`\`widget\n${id}\n\`\`\``).length - 1;

  it("places the figure once, right after «setter igang platedrift.»", () => {
    const out = injectPosterWidgets(liveSnippet);
    assert.equal(count(out, "SmeltingUnderTynnPlate"), 1);
    const sentence = out.indexOf("setter igang platedrift.");
    const fig = out.indexOf("```widget\nSmeltingUnderTynnPlate");
    const rule = out.indexOf("---", sentence);
    assert.ok(sentence > 0 && fig > sentence && fig < rule, "figure sits between the sentence and the rule");
    assert.ok(fig < out.indexOf("Hvorfor mantelberg smelter"), "not in the old melting section");
  });

  it("accepts the spelling «i gang»", () => {
    const out = injectPosterWidgets(liveSnippet.replace("igang", "i gang"));
    assert.equal(count(out, "SmeltingUnderTynnPlate"), 1);
    assert.ok(out.indexOf("```widget\nSmeltingUnderTynnPlate") > out.indexOf("setter i gang platedrift."));
  });

  it("does not place the figure when the sentence is missing", () => {
    assert.equal(count(injectPosterWidgets(chapterMarkdown), "SmeltingUnderTynnPlate"), 0);
  });
});
