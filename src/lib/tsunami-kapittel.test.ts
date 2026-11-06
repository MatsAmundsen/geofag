import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { injectPosterWidgets } from "./poster-markdown.ts";
import {
  QUIZ_JORDSKJELV,
  QUIZ_SJEKK_JORDSKJELV_VARSLING,
  QUIZ_SJEKK_TSUNAMI_1,
  QUIZ_SJEKK_TSUNAMI_5,
  QUIZ_TSUNAMI,
} from "./poster-quizzes.ts";
import {
  LEGACY_NATURFARE_PATH,
  TSUNAMI_PATH,
  TSUNAMI_REDIRECT_STATUS,
  tsunamiRedirectHref,
} from "./tsunami-redirect.ts";
import { GEO_MARIA_VIDEOS } from "./youtube-geo-maria.ts";

const lib = dirname(fileURLToPath(import.meta.url));

function readSeed(name: string): string {
  return readFileSync(join(lib, "posts", name), "utf8");
}

function withoutMaria(markdown: string): string {
  return markdown.replace(/```widget\nYtMaria[A-Za-z0-9]+\n```\n*/g, "");
}

function fenceCount(markdown: string, widgetId: string): number {
  return markdown.split(`\`\`\`widget\n${widgetId}\n\`\`\``).length - 1;
}

describe("tsunami redirect", () => {
  it("sends the old chapter address to /geofag-1/tsunami and keeps the query", () => {
    assert.equal(tsunamiRedirectHref(""), TSUNAMI_PATH);
    assert.equal(tsunamiRedirectHref("?kilde=plakat"), `${TSUNAMI_PATH}?kilde=plakat`);
    assert.equal(tsunamiRedirectHref("kilde=plakat"), `${TSUNAMI_PATH}?kilde=plakat`);
    assert.equal(TSUNAMI_REDIRECT_STATUS, 308);
    assert.equal(tsunamiRedirectHref("?a=1").includes(LEGACY_NATURFARE_PATH), false);
    assert.equal(tsunamiRedirectHref("?neste=/geofag-1/tsunami"), `${TSUNAMI_PATH}?neste=/geofag-1/tsunami`);
  });
});

describe("quiz split", () => {
  it("keeps earthquake questions on Jordskjelv and tsunami questions on Tsunami", () => {
    const jord = QUIZ_JORDSKJELV.map((q) => q.prompt).join("\n");
    const tsunami = QUIZ_TSUNAMI.map((q) => q.prompt).join("\n");
    assert.match(jord, /Oslofjordskjelvet i 1904/);
    assert.match(jord, /gjentaksintervall på 100 år/);
    assert.equal(/undersjøisk skjelv/.test(jord), false);
    assert.match(tsunami, /undersjøisk skjelv/);
    assert.equal(/Oslofjordskjelvet/.test(tsunami), false);
    assert.equal(QUIZ_SJEKK_JORDSKJELV_VARSLING.length, 1);
    assert.match(QUIZ_SJEKK_JORDSKJELV_VARSLING[0]!.prompt, /tidlig varsling/i);
    assert.match(QUIZ_SJEKK_TSUNAMI_5[0]!.prompt, /kraftig eller langvarig risting/);
    assert.match(QUIZ_SJEKK_TSUNAMI_5[0]!.explain, /seismikken/);
    assert.equal(QUIZ_SJEKK_TSUNAMI_1.length, 2);

    const quake = readSeed("jordskjelv.md");
    const wave = readSeed("jordskjelv-naturfare.md");
    assert.match(quake, /SjekkJordskjelvSkade/);
    assert.match(quake, /SjekkJordskjelvVarsling/);
    assert.equal(wave.includes("SjekkSkjelvfare3"), false);
    assert.equal(wave.includes("QuizSkjelvfare"), false);
    assert.match(wave, /SjekkTsunami1/);
    assert.match(wave, /QuizTsunami/);
  });
});

describe("tsunami models", () => {
  it("keeps M1–M7 in the tsunami seed and restores them without fences", () => {
    const wave = readSeed("jordskjelv-naturfare.md");
    const quake = readSeed("jordskjelv.md");
    const ids = ["TsunamiM1", "TsunamiM2", "TsunamiM3", "TsunamiM4", "TsunamiM5", "TsunamiM6", "TsunamiM7"];
    for (const id of ids) {
      assert.equal(fenceCount(wave, id), 1, id);
      assert.equal(quake.includes(id), false, id);
    }
    const stripped = wave.replace(/```widget\nTsunamiM[1-7]\n```\n*/g, "");
    const injected = injectPosterWidgets(stripped);
    for (const id of ids) assert.equal(fenceCount(injected, id), 1, `inject ${id}`);
    assert.equal(fenceCount(injectPosterWidgets(wave), "TsunamiM2"), 1);
  });

  it("merker gangtid, Green-tilnærming og at modellene ikke er en faresone", () => {
    const source = readFileSync(join(lib, "..", "components", "diagrams", "tsunami-modeller.tsx"), "utf8");
    assert.match(source, /Andel av gangtid/);
    assert.match(source, /Bølgelengde på valgt dyp/);
    assert.match(source, /Bølgelengde ved markøren/);
    assert.match(source, /ikke-brytende langbølge/);
    assert.match(source, /Ikke oppskylling eller faresone/);
    assert.match(source, /4-koblet rutenett/);
    assert.match(source, /Lokalt tiltak/);
    assert.match(source, /Fremtidig utbygging i sonen: stanset/);
  });
});

describe("Maria video placement", () => {
  it("injects each video once, only in its own chapter, with and without fences", () => {
    const quake = readSeed("jordskjelv.md");
    const wave = readSeed("jordskjelv-naturfare.md");
    const maria06 = GEO_MARIA_VIDEOS.find((video) => video.widgetId === "YtMaria06")!;
    const maria07 = GEO_MARIA_VIDEOS.find((video) => video.widgetId === "YtMaria07")!;
    assert.equal(maria06.placements[0]?.seed, "posts/jordskjelv.md");
    assert.equal(maria07.placements[0]?.seed, "posts/jordskjelv-naturfare.md");

    for (const [markdown, present, absent] of [
      [quake, "YtMaria06", "YtMaria07"],
      [wave, "YtMaria07", "YtMaria06"],
    ] as const) {
      assert.equal(fenceCount(markdown, present), 1, present);
      assert.equal(fenceCount(markdown, absent), 0, absent);
      const injected = injectPosterWidgets(withoutMaria(markdown));
      assert.equal(fenceCount(injected, present), 1, `inject ${present}`);
      assert.equal(fenceCount(injected, absent), 0, `inject ${absent}`);
      assert.equal(fenceCount(injectPosterWidgets(markdown), present), 1);
    }
  });
});
