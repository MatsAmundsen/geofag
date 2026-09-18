import { createServerFn } from "@tanstack/react-start";
import { PLATETEKTONIKK_SEED } from "@/lib/post-seed";
import type { Post, PostInput } from "@/lib/post-types";

export type { Post, PostInput };

const seedPost = (): Post => ({ id: 1, ...PLATETEKTONIKK_SEED });

const str = (v: unknown): string => (typeof v === "string" ? v : "");

function asPostInput(input: unknown): PostInput {
  const o = (input ?? {}) as Record<string, unknown>;
  const slug = str(o.slug).trim();
  const title = str(o.title).trim();
  if (!slug) throw new Error("slug is required");
  if (!title) throw new Error("title is required");
  return {
    slug,
    title,
    summary: str(o.summary),
    ingress: str(o.ingress),
    thumbnail: str(o.thumbnail),
    bodyMarkdown: str(o.bodyMarkdown),
    published: Number(o.published) === 1 ? 1 : 0,
  };
}

/** All posts, newest first (drafts included — the admin list needs them). */
export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getPostStore } = await import("@/lib/post-store.server");
    return (await getPostStore()).list();
  } catch (err) {
    console.error("[posts] list failed", err);
    return [seedPost()];
  }
});

/** A single post by slug, or `null` when it does not exist. */
export const getPost = createServerFn({ method: "GET" })
  .validator((slug: unknown): string => {
    if (typeof slug !== "string" || !slug.trim()) throw new Error("slug is required");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    try {
      const { getPostStore } = await import("@/lib/post-store.server");
      const post = await (await getPostStore()).get(slug);
      if (post) return post;
    } catch (err) {
      console.error("[posts] get failed", err);
    }
    return slug === PLATETEKTONIKK_SEED.slug ? seedPost() : null;
  });

/** Create or update a post (keyed by slug). Requires CMS access. */
export const savePost = createServerFn({ method: "POST" })
  .validator(asPostInput)
  .handler(async ({ data }) => {
    const { assertCanEdit, getPostStore } = await import("@/lib/post-store.server");
    await assertCanEdit();
    await (await getPostStore()).save(data);
    return { ok: true as const, slug: data.slug };
  });

/** Delete a post by slug. Requires CMS access. */
export const deletePost = createServerFn({ method: "POST" })
  .validator((slug: unknown): string => {
    if (typeof slug !== "string" || !slug.trim()) throw new Error("slug is required");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const { assertCanEdit, getPostStore } = await import("@/lib/post-store.server");
    await assertCanEdit();
    await (await getPostStore()).remove(slug);
    return { ok: true as const };
  });
