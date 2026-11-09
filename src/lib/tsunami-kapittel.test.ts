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

  it("setter M1 etter kildeforklaringen og M3 etter måledefinisjonene, også ved gjeninnsetting", () => {
    const wave = readSeed("jordskjelv-naturfare.md");
    const order = (markdown: string, before: string, id: string, after: string) => {
      const a = markdown.indexOf(before);
      const f = markdown.indexOf(`\`\`\`widget\n${id}\n\`\`\``);
      const b = markdown.indexOf(after);
      assert.ok(a >= 0 && f > a && b > f, `${id} står mellom «${before}» og «${after}»`);
    };
    const m1Before = "Modellen viser en idealisert kilde, ikke en rekonstruksjon";
    const m1After = "Magnituden alene er ikke nok";
    const m3Before = "Modellen er en begrepsmodell og gir ikke lokale flomnivåer.";
    const m3After = "NOAA skriver at de fleste oppskyllinger";
    order(wave, m1Before, "TsunamiM1", m1After);
    order(wave, m3Before, "TsunamiM3", m3After);
    const stripped = wave.replace(/```widget\nTsunamiM[13]\n```\n*/g, "");
    const injected = injectPosterWidgets(stripped);
    order(injected, m1Before, "TsunamiM1", m1After);
    order(injected, m3Before, "TsunamiM3", m3After);
    // En eldre tekst uten innledningene får likevel modellene på samme faglige sted.
    const older = stripped
      .replace(/I modell M1 kan du følge[^\n]*\n\n/, "")
      .replace(/Bruk modell M3 til å skille[^\n]*\n\n/, "");
    const olderInjected = injectPosterWidgets(older);
    order(olderInjected, "har alle noe å si for hvor stor tsunamien kan bli", "TsunamiM1", m1After);
    order(olderInjected, "er hvor langt inn over land vannet går, målt vannrett.", "TsunamiM3", m3After);
    for (const id of ["TsunamiM1", "TsunamiM3"]) assert.equal(fenceCount(olderInjected, id), 1, `eldre ${id}`);
  });

  it("eksporterer M1–M7 og merker forbehold i de nye modellene", () => {
    const diagrams = join(lib, "..", "components", "diagrams");
    const entry = readFileSync(join(diagrams, "tsunami-modeller.tsx"), "utf8");
    for (let k = 1; k <= 7; k++) assert.match(entry, new RegExp(`as TsunamiM${k}\\b`), `TsunamiM${k}`);
    const model = (name: string) => readFileSync(join(diagrams, "tsunami", name), "utf8");
    assert.match(model("m3-runup.tsx"), /ikke et farekart/);
    for (const name of ["m1-source.tsx", "m2-shoal.tsx", "m3-runup.tsx"]) {
      assert.match(model(name), /forstørret ca\./, `${name} merker forstørrelsen`);
    }
    // M2 holder seg til kapitlets grense: fart, bølgelengde og kvalitativ grunning, uten Greens lov.
    const m2 = model("m2-shoal.tsx");
    assert.equal(/Green/.test(m2), false);
    assert.match(m2, /Bølgelengde på valgt dyp/);
    assert.match(m2, /Bølgelengde ved markøren/);
    assert.match(m2, /ikke-brytende langbølge/);
    assert.match(m2, /Ikke oppskylling eller faresone/);
    assert.equal(/greenRatio/.test(model("sim/profiles.ts")), false);
    // M3 har fire atskilte mål, målt fra havnivået i ro.
    const m3 = model("m3-runup.tsx");
    for (const word of ["Bølgehøyde", "Oppskylling", "Oversvømmelsesdybde", "Inntrenging", "havnivået i ro"]) {
      assert.match(m3, new RegExp(word), word);
    }
    assert.match(model("m5-ocean.tsx"), /Ikke oppskylling/);
    assert.match(model("m7-risk.tsx"), /ikke en faresone/);
    assert.match(model("m7-risk.tsx"), /ikke en godkjent evakueringsrute/);
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
