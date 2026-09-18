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
export const listPosts = createServerFn({ method: "POST" }).handler(async () => {
  const { getPostStore, noStorePosterResponse } = await import("@/lib/post-store.server");
  noStorePosterResponse();
  return (await getPostStore()).list();
});

/** A single post by slug, or `null` when it does not exist. */
export const getPost = createServerFn({ method: "POST" })
  .validator((slug: unknown): string => {
    if (typeof slug !== "string" || !slug.trim()) throw new Error("slug is required");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const { getPostStore, noStorePosterResponse } = await import("@/lib/post-store.server");
    noStorePosterResponse();
    const post = await (await getPostStore()).get(slug);
    if (post) return post;
    // Bundled seed only when the store has no row yet — never as a stand-in
    // for a failed Durable Object read (that hid live edits behind the old chapter).
    return slug === PLATETEKTONIKK_SEED.slug ? seedPost() : null;
  });

/** Create or update a post (keyed by slug). Requires CMS access. */
export const savePost = createServerFn({ method: "POST" })
  .validator(asPostInput)
  .handler(async ({ data }) => {
    const { assertCanEdit, getPostStore } = await import("@/lib/post-store.server");
    await assertCanEdit();
    const store = await getPostStore();
    if (store.persist === "memory") {
      throw new Error(
        "Lagring er ikke tilkoblet på geofag.com ennå (ingen varig database). Last siden på nytt etter siste deploy og prøv igjen.",
      );
    }
    await store.save(data);
    return { ok: true as const, slug: data.slug, persist: store.persist };
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
