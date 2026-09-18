import { GF1_THEMES, GF2_THEMES, KLIMA_SUBTHEMES } from "./nav.ts";

/** Metadata for a chapter that has a hybrid CMS post. No markdown bodies here — keep this module client-safe. */
export type ChapterPostMeta = {
  slug: string;
  path: string;
  title: string;
  summary: string;
  thumbnail: string;
};

function lastSegment(path: string): string {
  const parts = path.replace(/\/$/, "").split("/").filter(Boolean);
  return parts[parts.length - 1] ?? path;
}

function fromThemes(
  themes: ReadonlyArray<{ to: string; title: string; blurb: string; image: string; slug?: string }>,
): ChapterPostMeta[] {
  return themes.map((t) => ({
    slug: t.slug ?? lastSegment(t.to),
    path: t.to,
    title: t.title,
    summary: t.blurb,
    thumbnail: t.image,
  }));
}

/**
 * Canonical chapters that get a Poster button and a seeded CMS post.
 * Redirects and split-page bridges are excluded.
 */
export const CHAPTER_POST_META: ChapterPostMeta[] = [
  ...fromThemes(GF1_THEMES),
  ...fromThemes(GF2_THEMES),
  ...fromThemes(KLIMA_SUBTHEMES),
];

export function posterSlugForPath(pathname: string): string | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return CHAPTER_POST_META.find((c) => c.path === path)?.slug;
}

export function chapterMetaBySlug(slug: string): ChapterPostMeta | undefined {
  return CHAPTER_POST_META.find((c) => c.slug === slug);
}

export function chapterSourceFile(path: string): string {
  if (path === "/tema/klima") return "src/routes/tema/klima/index.tsx";
  return `src/routes${path}.tsx`;
}
