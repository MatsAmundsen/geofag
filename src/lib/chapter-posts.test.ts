import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CHAPTER_POST_META,
  chapterSourceFile,
  posterSlugForPath,
} from "./chapter-posts.ts";
import { GF1_THEMES, GF2_THEMES, KLIMA_SUBTHEMES } from "./nav.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Chapter list in nav. Independent of CHAPTER_POST_META and of the markdown files. */
const chapterThemes = [...GF1_THEMES, ...GF2_THEMES, ...KLIMA_SUBTHEMES];

function lastSegment(path: string): string {
  const parts = path.replace(/\/$/, "").split("/").filter(Boolean);
  return parts[parts.length - 1] ?? path;
}

function themeSlug(theme: { to: string; slug?: string }): string {
  return theme.slug ?? lastSegment(theme.to);
}

function canonicalPath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

function seedFile(slug: string): string {
  return slug === "platetektonikk"
    ? join(root, "src/lib/platetektonikk-post.md")
    : join(root, "src/lib/posts", `${slug}.md`);
}

/** Markdown seeds on disk. Platetektonikk counts only when its own file is there. */
function seedSlugsOnDisk(): string[] {
  const postsDir = join(root, "src/lib/posts");
  const slugs = readdirSync(postsDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -".md".length));
  if (existsSync(join(root, "src/lib/platetektonikk-post.md"))) slugs.push("platetektonikk");
  return slugs;
}

describe("CHAPTER_POST_META", () => {
  it("covers every canonical chapter with unique slugs and paths", () => {
    const slugs = CHAPTER_POST_META.map((c) => c.slug);
    const paths = CHAPTER_POST_META.map((c) => c.path);
    const listedSlugs = chapterThemes.map((theme) => themeSlug(theme));
    const listedPaths = chapterThemes.map((theme) => theme.to);
    const seedSlugs = seedSlugsOnDisk();

    assert.deepEqual(slugs, listedSlugs);
    assert.deepEqual(paths, listedPaths);
    assert.deepEqual([...slugs].sort(), [...seedSlugs].sort());
    assert.equal(CHAPTER_POST_META.length, chapterThemes.length);
    assert.equal(CHAPTER_POST_META.length, seedSlugs.length);
    assert.equal(new Set(slugs).size, slugs.length);
    assert.equal(new Set(paths).size, paths.length);
    assert.equal(new Set(listedSlugs).size, listedSlugs.length);
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
    const jordsystemene = CHAPTER_POST_META.find((chapter) => chapter.slug === "jordsystemene");
    assert.equal(jordsystemene?.path, "/geofag-1/jordsystemene");

    for (const chapter of CHAPTER_POST_META) {
      const file = seedFile(chapter.slug);
      assert.ok(existsSync(file), `missing ${file}`);
      const body = readFileSync(file, "utf8");
      assert.ok(body.length > 400, `${chapter.slug} is only ${body.length} chars`);

      const routeSource = readFileSync(join(root, chapterSourceFile(chapter.path)), "utf8");
      const declared = routeSource.match(/createFileRoute\(\s*["']([^"']+)["']/);
      assert.ok(declared, `${chapter.slug} is missing createFileRoute`);
      assert.equal(canonicalPath(declared[1]), chapter.path, chapter.slug);
    }
  });
});
