import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posterPlaceholderText } from "./poster-placeholder.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("posterPlaceholderText", () => {
  it("keeps the loading text while the chapter is still fetching", () => {
    assert.equal(posterPlaceholderText("loading"), "Laster teksten…");
  });

  it("says the text could not be loaded when the fetch resolved with an empty body", () => {
    assert.equal(posterPlaceholderText("ready"), "Teksten kunne ikke lastes.");
  });

  it("says the text could not be loaded when the fetch failed", () => {
    assert.equal(posterPlaceholderText("error"), "Teksten kunne ikke lastes.");
  });
});

describe("topic layout placeholder", () => {
  it("announces the placeholder in the same status region and style", () => {
    const src = readFileSync(join(root, "components/topic-layout.tsx"), "utf8");
    assert.match(
      src,
      /<p className="text-sm text-muted-foreground" role="status">\s*\{posterPlaceholderText\(posterStatus\)\}\s*<\/p>/,
    );
  });
});
