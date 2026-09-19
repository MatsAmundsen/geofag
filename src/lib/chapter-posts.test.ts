import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CHAPTER_POST_META,
  chapterSourceFile,
  posterSlugForPath,
} from "./chapter-posts.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("CHAPTER_POST_META", () => {
  it("covers every canonical chapter with unique slugs and paths", () => {
    assert.equal(CHAPTER_POST_META.length, 31);
    const slugs = CHAPTER_POST_META.map((c) => c.slug);
    const paths = CHAPTER_POST_META.map((c) => c.path);
    assert.equal(new Set(slugs).size, slugs.length);
    assert.equal(new Set(paths).size, paths.length);
    assert.ok(slugs.includes("platetektonikk"));
    assert.ok(slugs.includes("vulkaner"));
    assert.ok(slugs.includes("enso"));
    assert.ok(paths.includes("/geofag-1/platetektonikk"));
    assert.ok(paths.includes("/tema/klima/enso"));
  });

  it("maps chapter paths to poster slugs", () => {
    assert.equal(posterSlugForPath("/geofag-1/platetektonikk"), "platetektonikk");
    assert.equal(posterSlugForPath("/geofag-1/vulkaner/"), "vulkaner");
    assert.equal(posterSlugForPath("/tema/hoytrykk-lavtrykk"), "hoytrykk-lavtrykk");
    assert.equal(posterSlugForPath("/tema/klima/enso"), "enso");
    assert.equal(posterSlugForPath("/geofag-1"), undefined);
  });

  it("points at real chapter source files", () => {
    for (const chapter of CHAPTER_POST_META) {
      const file = join(root, chapterSourceFile(chapter.path));
      assert.ok(existsSync(file), `missing ${file}`);
    }
  });

  it("has a markdown seed for every chapter except the hand-authored Platetektonikk file", () => {
    for (const chapter of CHAPTER_POST_META) {
      const file =
        chapter.slug === "platetektonikk"
          ? join(root, "src/lib/platetektonikk-post.md")
          : join(root, "src/lib/posts", `${chapter.slug}.md`);
      assert.ok(existsSync(file), `missing ${file}`);
      const body = readFileSync(file, "utf8");
      assert.ok(body.length > 400, `${chapter.slug} is only ${body.length} chars`);
      assert.match(body, new RegExp(chapter.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });
});
