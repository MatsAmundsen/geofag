import platetektonikkPost from "./platetektonikk-post.md?raw";
import { CHAPTER_INGRESS } from "./chapter-ingress.ts";
import { CHAPTER_POST_META } from "./chapter-posts.ts";
import type { Post, PostInput } from "./post-types.ts";

export { isShortPlatetektonikkBody } from "./post-seed-upgrade";

const STAMP = "2026-09-18 00:00:00.000000";

const PLATETEKTONIKK_SUMMARY =
  "Bevegelser i mantelen driver platene — konsekvensene skriver seg i jordskorpa.";

const chapterBodies = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function bodyForSlug(slug: string): string {
  if (slug === "platetektonikk") return platetektonikkPost;
  const exact = chapterBodies[`./posts/${slug}.md`];
  if (exact) return exact;
  const match = Object.entries(chapterBodies).find(([key]) => key.endsWith(`/${slug}.md`));
  return match?.[1] ?? "";
}

/** Shared seed row for PGLite, D1, Durable Object and the in-memory Worker fallback. */
export type PostSeed = Omit<Post, "id">;

export const CHAPTER_POST_SEEDS: PostSeed[] = CHAPTER_POST_META.map((meta) => ({
  slug: meta.slug,
  title: meta.title,
  summary: meta.slug === "platetektonikk" ? PLATETEKTONIKK_SUMMARY : meta.summary,
  ingress: CHAPTER_INGRESS[meta.slug] || meta.summary,
  thumbnail: meta.thumbnail,
  bodyMarkdown: bodyForSlug(meta.slug),
  published: 1,
  createdAt: STAMP,
  updatedAt: STAMP,
}));

export const PLATETEKTONIKK_SEED =
  CHAPTER_POST_SEEDS.find((s) => s.slug === "platetektonikk") ??
  ({
    slug: "platetektonikk",
    title: "Platetektonikk",
    summary: PLATETEKTONIKK_SUMMARY,
    ingress: CHAPTER_INGRESS.platetektonikk ?? "",
    thumbnail: "/images/gf1-platetektonikk.jpg",
    bodyMarkdown: platetektonikkPost,
    published: 1,
    createdAt: STAMP,
    updatedAt: STAMP,
  } satisfies PostSeed);

export function seededPosts(): Post[] {
  return CHAPTER_POST_SEEDS.map((seed, i) => ({ id: i + 1, ...seed }));
}

export function seedBySlug(slug: string): Post | null {
  const index = CHAPTER_POST_SEEDS.findIndex((seed) => seed.slug === slug);
  if (index < 0) return null;
  return { id: index + 1, ...CHAPTER_POST_SEEDS[index]! };
}

export function toPostInput(seed: PostSeed): PostInput {
  return {
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    ingress: seed.ingress,
    thumbnail: seed.thumbnail,
    bodyMarkdown: seed.bodyMarkdown,
    published: seed.published,
  };
}

export function nowStamp(): string {
  const d = new Date();
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}.000000`;
}
