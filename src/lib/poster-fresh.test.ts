import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posterNeedsRefresh } from "./poster-fresh.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("posterNeedsRefresh", () => {
  it("is true when the stored body is newer than what the page shows", () => {
    assert.equal(
      posterNeedsRefresh(
        { bodyMarkdown: "## Jordens dynamiske indre: Litosfære\n\nseed", updatedAt: "a" },
        { bodyMarkdown: "### Inndeling av jorden indre\n\nlagret", updatedAt: "b" },
      ),
      true,
    );
  });

  it("is false when the public view already matches storage", () => {
    const body = "### Inndeling av jorden indre\n\nlagret";
    assert.equal(
      posterNeedsRefresh(
        { bodyMarkdown: body, updatedAt: "b" },
        { bodyMarkdown: body, updatedAt: "b" },
      ),
      false,
    );
  });

  it("is false when there is no stored post", () => {
    assert.equal(
      posterNeedsRefresh({ bodyMarkdown: "seed", updatedAt: "a" }, null),
      false,
    );
  });
});

describe("poster routes do not hide saved text behind the seed chapter", () => {
  it("public view loader no longer substitutes PLATETEKTONIKK_SEED on errors", () => {
    const src = readFileSync(join(root, "routes/poster/$slug/index.tsx"), "utf8");
    assert.equal(src.includes("PLATETEKTONIKK_SEED"), false);
    assert.equal(src.includes("using seed"), false);
  });

  it("listing loader no longer substitutes PLATETEKTONIKK_SEED on errors", () => {
    const src = readFileSync(join(root, "routes/poster/index.tsx"), "utf8");
    assert.equal(src.includes("PLATETEKTONIKK_SEED"), false);
    assert.equal(src.includes("using seed"), false);
  });

  it("editor loader no longer substitutes PLATETEKTONIKK_SEED on errors", () => {
    const src = readFileSync(join(root, "routes/poster/$slug/rediger.tsx"), "utf8");
    assert.equal(src.includes("PLATETEKTONIKK_SEED"), false);
    assert.equal(src.includes("using seed"), false);
  });
});
