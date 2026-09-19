import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isShortPlatetektonikkBody } from "./post-seed-upgrade.ts";

const chapterMarkdown = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "platetektonikk-post.md"),
  "utf8",
);

describe("isShortPlatetektonikkBody", () => {
  it("treats the original stub as short", () => {
    assert.equal(
      isShortPlatetektonikkBody(
        "## Jordas lag og hva en plate egentlig er\n\n> Rediger denne teksten i redigeringsvisningen og lagre",
      ),
      true,
    );
  });

  it("keeps the full chapter body", () => {
    assert.equal(
      isShortPlatetektonikkBody(
        "## Jordens dynamiske indre: Litosfære, astenosfære og reologi\n\n" + "x".repeat(9000),
      ),
      false,
    );
  });

  it("does not treat a short user edit as the stub", () => {
    assert.equal(isShortPlatetektonikkBody("Mitt korte utkast til kapittelet."), false);
  });

  it("treats an empty body as missing seed", () => {
    assert.equal(isShortPlatetektonikkBody(""), true);
  });

  it("treats the bundled Platetektonikk fagtekst as the full chapter", () => {
    assert.ok(chapterMarkdown.length > 20_000, `got ${chapterMarkdown.length} chars`);
    assert.match(chapterMarkdown, /Inndeling av jorden indre/);
    assert.match(chapterMarkdown, /Wilsonsyklusen/);
    assert.match(chapterMarkdown, /Leka/);
    assert.match(chapterMarkdown, /Sentralt fagvokabular/);
    assert.equal(isShortPlatetektonikkBody(chapterMarkdown), false);
  });
});
