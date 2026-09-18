import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { editingAllowed, READ_ONLY_MESSAGE } from "@/lib/editing";

/**
 * Hybrid CMS posts: database-backed, Markdown-bodied content rendered at request
 * time (see `migrations/0002_posts.sql`). Reads are public; writes go through
 * `authMiddleware`, so only a signed-in user can edit when auth is on.
 */
export type Post = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  ingress: string;
  thumbnail: string;
  bodyMarkdown: string;
  /** 0 = draft, 1 = published. */
  published: number;
  /** Formatted text, e.g. "2026-07-01 21:02:30.618003". */
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  slug: string;
  title: string;
  summary: string;
  ingress: string;
  thumbnail: string;
  bodyMarkdown: string;
  published: number;
};

// timestamptz is driver-formatted (Date) by default; render it as the template's
// "Year-Month-Day HH:MM:SS.000000" text so the client never juggles Date shapes.
const SELECT = `
  select
    id, slug, title, summary, ingress, thumbnail,
    body_markdown as "bodyMarkdown",
    published,
    to_char(created_at, 'YYYY-MM-DD HH24:MI:SS.US') as "createdAt",
    to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS.US') as "updatedAt"
  from posts`;

const str = (v: unknown): string => (typeof v === "string" ? v : "");

/** All posts, newest first (drafts included — the admin list needs them). */
export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql.query<Post>(`${SELECT} order by created_at desc`);
});

/** A single post by slug, or `null` when it does not exist. */
export const getPost = createServerFn({ method: "GET" })
  .validator((slug: unknown): string => {
    if (typeof slug !== "string" || !slug.trim()) throw new Error("slug is required");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql.query<Post>(`${SELECT} where slug = $1`, [slug]);
    return rows[0] ?? null;
  });

/** Create or update a post (keyed by slug). Requires a signed-in user. */
export const savePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown): PostInput => {
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
  })
  .handler(async ({ data }) => {
    // Option A: refuse writes anywhere but the local dev server (fail-closed —
    // `editingAllowed` is a hardcoded `false` in the production build).
    if (!editingAllowed) throw new Error(READ_ONLY_MESSAGE);
    const sql = await getSql();
    await sql.query(
      `insert into posts (slug, title, summary, ingress, thumbnail, body_markdown, published, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7, now())
       on conflict (slug) do update set
         title = excluded.title,
         summary = excluded.summary,
         ingress = excluded.ingress,
         thumbnail = excluded.thumbnail,
         body_markdown = excluded.body_markdown,
         published = excluded.published,
         updated_at = now()`,
      [
        data.slug,
        data.title,
        data.summary,
        data.ingress,
        data.thumbnail,
        data.bodyMarkdown,
        data.published,
      ],
    );
    return { ok: true as const, slug: data.slug };
  });

/** Delete a post by slug. Requires a signed-in user. */
export const deletePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((slug: unknown): string => {
    if (typeof slug !== "string" || !slug.trim()) throw new Error("slug is required");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    if (!editingAllowed) throw new Error(READ_ONLY_MESSAGE);
    const sql = await getSql();
    await sql.query(`delete from posts where slug = $1`, [slug]);
    return { ok: true as const };
  });
