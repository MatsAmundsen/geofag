/**
 * Durable Object protocol for hybrid CMS posts.
 *
 * Cloudflare Workers cannot boot PGLite, and the GitHub deploy token often
 * cannot create D1. A Durable Object is created with the Worker itself, so
 * edits persist without a separate D1 API permission.
 */
import { isShortPlatetektonikkBody } from "./post-seed-upgrade.ts";
import type { Post, PostInput } from "./post-types.ts";

export const POSTS_DO_BINDING = "POSTS_DO";
export const POSTS_DO_NAME = "geofag-cms";
export const POSTS_DO_CLASS = "PostsDurableObject";

const POST_PREFIX = "post:";
const META_PREFIX = "meta:";
const SEEDED = "seeded";
const NEXT_ID = "nextId";

function stamp(): string {
  const d = new Date();
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}.000000`;
}

export type DoStorage = {
  get: <T = unknown>(key: string) => Promise<T | undefined>;
  put: (key: string, value: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  list: <T = unknown>(options?: { prefix?: string }) => Promise<Map<string, T>>;
};

export type PostsDoOp =
  | { op: "list" }
  | { op: "get"; slug: string }
  | { op: "save"; input: PostInput }
  | { op: "remove"; slug: string }
  | { op: "getMeta"; key: string }
  | { op: "setMeta"; key: string; value: string };

export type PostsDoResult = { ok: true; data: unknown } | { ok: false; error: string };

function asSeeds(seed: Post | Post[]): Post[] {
  return Array.isArray(seed) ? seed : [seed];
}

/** Insert missing chapter posts. Never overwrite author text; upgrade the old Platetektonikk stub. */
async function ensureSeed(storage: DoStorage, seed: Post | Post[]): Promise<void> {
  const seeds = asSeeds(seed);
  let nextId = Number(await storage.get<number>(NEXT_ID)) || 1;
  for (const row of seeds) {
    const key = `${POST_PREFIX}${row.slug}`;
    const existing = await storage.get<Post>(key);
    if (!existing) {
      const id = row.id || nextId;
      await storage.put(key, { ...row, id });
      nextId = Math.max(nextId, id + 1);
      continue;
    }
    if (row.slug === "platetektonikk" && isShortPlatetektonikkBody(existing.bodyMarkdown ?? "")) {
      await storage.put(key, {
        ...row,
        id: existing.id,
        published: existing.published,
        createdAt: existing.createdAt || row.createdAt,
        updatedAt: stamp(),
      } satisfies Post);
    }
  }
  await storage.put(NEXT_ID, nextId);
  await storage.put(SEEDED, "1");
}

export async function handlePostsDoOp(
  storage: DoStorage,
  op: PostsDoOp,
  seed: Post | Post[],
): Promise<unknown> {
  await ensureSeed(storage, seed);
  switch (op.op) {
    case "list": {
      const rows = await storage.list<Post>({ prefix: POST_PREFIX });
      return [...rows.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }
    case "get":
      return (await storage.get<Post>(`${POST_PREFIX}${op.slug}`)) ?? null;
    case "save": {
      const key = `${POST_PREFIX}${op.input.slug}`;
      const existing = await storage.get<Post>(key);
      const stampNow = stamp();
      let id = existing?.id ?? 0;
      if (!id) {
        id = Number(await storage.get<number>(NEXT_ID)) || 2;
        await storage.put(NEXT_ID, id + 1);
      }
      const post: Post = {
        id,
        slug: op.input.slug,
        title: op.input.title,
        summary: op.input.summary,
        ingress: op.input.ingress,
        thumbnail: op.input.thumbnail,
        bodyMarkdown: op.input.bodyMarkdown,
        published: op.input.published,
        createdAt: existing?.createdAt || stampNow,
        updatedAt: stampNow,
      };
      await storage.put(key, post);
      return { saved: true, slug: post.slug };
    }
    case "remove":
      await storage.delete(`${POST_PREFIX}${op.slug}`);
      return { removed: true };
    case "getMeta":
      return (await storage.get<string>(`${META_PREFIX}${op.key}`)) ?? null;
    case "setMeta":
      if (op.value) await storage.put(`${META_PREFIX}${op.key}`, op.value);
      else await storage.delete(`${META_PREFIX}${op.key}`);
      return { saved: true };
    default:
      throw new Error(`Unknown posts DO op: ${(op as { op: string }).op}`);
  }
}

export async function handlePostsDoRequest(
  storage: DoStorage,
  request: Request,
  seed: Post | Post[],
): Promise<Response> {
  try {
    const op = (await request.json()) as PostsDoOp;
    const data = await handlePostsDoOp(storage, op, seed);
    const body: PostsDoResult = { ok: true, data };
    return Response.json(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, error: message } satisfies PostsDoResult, { status: 500 });
  }
}

export function memoryDoStorage(initial?: Map<string, unknown>): DoStorage {
  const map = initial ?? new Map<string, unknown>();
  return {
    async get<T>(key: string) {
      return map.get(key) as T | undefined;
    },
    async put(key, value) {
      map.set(key, value);
    },
    async delete(key) {
      map.delete(key);
    },
    async list<T>(options?: { prefix?: string }) {
      const out = new Map<string, T>();
      for (const [key, value] of map) {
        if (options?.prefix && !key.startsWith(options.prefix)) continue;
        out.set(key, value as T);
      }
      return out;
    },
  };
}
