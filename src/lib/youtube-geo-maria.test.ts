import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { injectPosterWidgets, parsePosterMarkdown } from "./poster-markdown.ts";
import {
  GEO_MARIA_CHANNEL,
  GEO_MARIA_VIDEOS,
  mariaWidgetFence,
  youtubeNocookieEmbedSrc,
  youtubeWatchUrl,
  type GeoMariaPlacement,
} from "./youtube-geo-maria.ts";

const lib = dirname(fileURLToPath(import.meta.url));

function readSeed(seed: string): string {
  return readFileSync(join(lib, seed), "utf8");
}

function fenceCount(markdown: string, widgetId: string): number {
  return markdown.split(mariaWidgetFence(widgetId)).length - 1;
}

function withoutMaria(markdown: string): string {
  return markdown.replace(/```widget\nYtMaria[A-Za-z0-9]+\n```\n*/g, "");
}

function headingIndex(markdown: string, needle: string): number {
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`^#{2,6}[^\\n]*${escaped}[^\\n]*$`, "m").exec(markdown);
  return match?.index ?? -1;
}

describe("Geo med Maria", () => {
  it("uses privacy-friendly embeds and a visible Norwegian label", () => {
    const video = GEO_MARIA_VIDEOS[0]!;
    assert.equal(
      youtubeNocookieEmbedSrc(video.youtubeId),
      `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    );
    assert.equal(youtubeWatchUrl(video.youtubeId), `https://www.youtube.com/watch?v=${video.youtubeId}`);
    assert.equal(GEO_MARIA_CHANNEL, "Geo med Maria");
    assert.match(video.title, /Geofag 1/);
    assert.match(video.duration, /^\d{1,2}:\d{2}$/);
  });

  it("keeps unique widget ids and does not include G2 or the geography video", () => {
    const widgets = GEO_MARIA_VIDEOS.map((video) => video.widgetId);
    const youtubeIds = GEO_MARIA_VIDEOS.map((video) => video.youtubeId);
    assert.equal(new Set(widgets).size, widgets.length);
    assert.equal(new Set(youtubeIds).size, youtubeIds.length);
    for (const video of GEO_MARIA_VIDEOS) {
      assert.match(video.widgetId, /^YtMaria[A-Za-z0-9]+$/);
      assert.match(video.youtubeId, /^[A-Za-z0-9_-]{11}$/);
      assert.match(video.duration, /^\d{1,2}:\d{2}$/);
      assert.equal(video.placements.length > 0, true);
    }
    assert.equal(widgets.includes("YtMaria41"), false);
    assert.equal(youtubeIds.includes("hkPOC4dn3UA"), false);
    const titles = GEO_MARIA_VIDEOS.map((video) => video.title.toLowerCase()).join("\n");
    assert.equal(titles.includes("massebalanse"), false);
    assert.equal(titles.includes("albedo"), false);
  });

  it("parses a youtube widget fence like any other widget", () => {
    const parts = parsePosterMarkdown("Tekst\n\n```widget\nYtMaria05\n```\n\nMer");
    assert.equal(parts.filter((part) => part.type === "widget").length, 1);
    assert.equal(parts[1]?.type === "widget" ? parts[1].id : "", "YtMaria05");
  });

  it("places each video once in the seed, and again when a stored body lacks the fence", () => {
    const seen = new Map<string, Set<string>>();
    for (const video of GEO_MARIA_VIDEOS) {
      for (const placement of video.placements) {
        const markdown = readSeed(placement.seed);
        assert.equal(markdown.includes(placement.require), true, placement.seed);
        assert.equal(fenceCount(markdown, video.widgetId), 1, `${placement.seed} ${video.widgetId}`);
        assert.equal(
          fenceCount(injectPosterWidgets(markdown), video.widgetId),
          1,
          `duplicate ${video.widgetId}`,
        );

        const stored = withoutMaria(markdown);
        assert.equal(fenceCount(stored, video.widgetId), 0);
        const injected = injectPosterWidgets(stored);
        assert.equal(fenceCount(injected, video.widgetId), 1, `missing inject ${video.widgetId}`);
        assertPlacement(injected, video.widgetId, placement);

        const ids = seen.get(placement.seed) ?? new Set<string>();
        ids.add(video.widgetId);
        seen.set(placement.seed, ids);
      }
    }

    const posts = readdirSync(join(lib, "posts")).filter((name) => name.endsWith(".md"));
    for (const name of posts) {
      const seed = `posts/${name}`;
      const markdown = readSeed(seed);
      const allowed = seen.get(seed) ?? new Set<string>();
      for (const match of markdown.matchAll(/```widget\n(YtMaria[A-Za-z0-9]+)\n```/g)) {
        assert.equal(allowed.has(match[1] ?? ""), true, `${seed} unexpected ${match[1]}`);
      }
    }
    assert.equal(seen.has("platetektonikk-post.md"), true);
    assert.equal((seen.get("posts/jordsystemene.md") ?? new Set()).size, 2);
    assert.equal((seen.get("posts/isbreer-og-landformer.md") ?? new Set()).has("YtMaria41"), false);
  });
});

function assertPlacement(markdown: string, widgetId: string, placement: GeoMariaPlacement) {
  const fenceAt = markdown.indexOf(mariaWidgetFence(widgetId));
  assert.ok(fenceAt >= 0, widgetId);
  if ("atStart" in placement) {
    assert.equal(markdown.trimStart().startsWith(mariaWidgetFence(widgetId)), true, widgetId);
    return;
  }
  if ("beforeHeading" in placement) {
    const headingAt = headingIndex(markdown, placement.beforeHeading);
    assert.ok(headingAt > fenceAt, `${widgetId} before ${placement.beforeHeading}`);
    return;
  }
  const needleAt = markdown.indexOf(placement.afterParagraph);
  assert.ok(needleAt >= 0 && needleAt < fenceAt, `${widgetId} after ${placement.afterParagraph}`);
}
