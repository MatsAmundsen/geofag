/**
 * Hybrid CMS storage.
 *
 * - Local `npm run dev` (Node): Postgres via PGLite (`getSql()`), as before.
 * - Cloudflare Workers: D1 (`env.POSTS_DB`) when bound, otherwise a Durable
 *   Object (`env.POSTS_DO`). PGLite cannot instantiate there.
 * - Worker without either binding: in-memory seed so the page still renders.
 */
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";
import { passwordCookieValue, sha256Hex, timingSafeEqual } from "@/lib/cms-crypto";
import { isLocalDev } from "@/lib/editing";
import { needsCmsSetup, nonEmptyMeta } from "@/lib/cms-password";
import { canUseMemorySeedFallback, choosePostBackend } from "@/lib/post-backend";
import { isShortPlatetektonikkBody } from "@/lib/post-seed-upgrade";
import {
  CHAPTER_POST_SEEDS,
  nowStamp,
  PLATETEKTONIKK_SEED,
  seededPosts,
  toPostInput,
} from "@/lib/post-seed";
import {
  POSTS_DO_BINDING,
  POSTS_DO_NAME,
  type PostsDoOp,
  type PostsDoResult,
} from "@/lib/posts-durable-object";
import type { CmsPersist, CmsStatus, Post, PostInput } from "@/lib/post-types";
import { isCloudflareWorker } from "@/lib/runtime";
import { pickWorkerEnv, preventPosterCaching, type WorkerBindings } from "@/lib/worker-env";
import { setResponseHeader } from "@tanstack/react-start/server";

export const CMS_COOKIE = "geofag_cms";
const SESSION_META = "session";
const PASSWORD_META = "password_hash";
const SALT_META = "password_salt";

type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<{ results: T[] }>;
  run: () => Promise<unknown>;
};

type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
  exec: (query: string) => Promise<unknown>;
};

type DurableNs = {
  idFromName: (name: string) => unknown;
  get: (id: unknown) => { fetch: (input: string, init?: RequestInit) => Promise<Response> };
};

type WorkerEnv = WorkerBindings & {
  POSTS_DB?: D1Database;
  POSTS_DO?: DurableNs;
};

type Store = {
  persist: CmsPersist;
  list: () => Promise<Post[]>;
  get: (slug: string) => Promise<Post | null>;
  save: (input: PostInput) => Promise<void>;
  remove: (slug: string) => Promise<void>;
  getMeta: (key: string) => Promise<string | null>;
  setMeta: (key: string, value: string) => Promise<void>;
};

type SqlClient = {
  query: <T = Record<string, unknown>>(text: string, params?: unknown[]) => Promise<T[]>;
};

const SELECT_POSTGRES = `
  select
    id, slug, title, summary, ingress, thumbnail,
    body_markdown as "bodyMarkdown",
    published,
    to_char(created_at, 'YYYY-MM-DD HH24:MI:SS.US') as "createdAt",
    to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS.US') as "updatedAt"
  from posts`;

function requestWorkerEnv(): WorkerEnv | undefined {
  try {
    const req = getRequest() as
      | {
          runtime?: { cloudflare?: { env?: WorkerEnv } };
          context?: { cloudflare?: { env?: WorkerEnv } };
          env?: WorkerEnv;
        }
      | undefined;
    return req?.runtime?.cloudflare?.env ?? req?.context?.cloudflare?.env ?? req?.env;
  } catch {
    return undefined;
  }
}

function globalWorkerEnv(): WorkerEnv | undefined {
  return (globalThis as { __env__?: WorkerEnv }).__env__;
}

function getWorkerEnv(): WorkerEnv | null {
  return pickWorkerEnv([requestWorkerEnv(), globalWorkerEnv()]) as WorkerEnv | null;
}

/** Prefer `cloudflare:workers` env so HTML SSR sees POSTS_DO, not a stub Request. */
async function resolveWorkerEnv(): Promise<WorkerEnv | null> {
  let fromCf: WorkerEnv | undefined;
  try {
    const spec = "cloudflare:workers";
    const mod = (await import(/* @vite-ignore */ spec)) as { env?: WorkerEnv };
    fromCf = mod.env;
  } catch {
    /* Node / tests / older runtimes */
  }
  return pickWorkerEnv([fromCf, requestWorkerEnv(), globalWorkerEnv()]) as WorkerEnv | null;
}

export function noStorePosterResponse(): void {
  try {
    preventPosterCaching((name, value) => setResponseHeader(name, value));
  } catch {
    /* not in a request (tests) */
  }
}

function envPassword(): string | undefined {
  const fromProcess =
    typeof process !== "undefined" ? process.env.CMS_PASSWORD?.trim() : undefined;
  const fromWorker = getWorkerEnv()?.CMS_PASSWORD?.trim();
  return fromProcess || fromWorker || undefined;
}

function mapD1Row(row: Record<string, unknown>): Post {
  return {
    id: Number(row.id) || 0,
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    summary: String(row.summary ?? ""),
    ingress: String(row.ingress ?? ""),
    thumbnail: String(row.thumbnail ?? ""),
    bodyMarkdown: String(row.body_markdown ?? ""),
    published: Number(row.published) === 1 ? 1 : 0,
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
}

async function d1Store(db: D1Database): Promise<Store> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      ingress TEXT NOT NULL DEFAULT '',
      thumbnail TEXT NOT NULL DEFAULT '',
      body_markdown TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cms_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
  const countRow = await db.prepare("SELECT COUNT(*) AS n FROM posts").first<{ n: number }>();
  if (!Number(countRow?.n)) {
    const s = PLATETEKTONIKK_SEED;
    await db
      .prepare(
        `INSERT INTO posts (slug, title, summary, ingress, thumbnail, body_markdown, published, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        s.slug,
        s.title,
        s.summary,
        s.ingress,
        s.thumbnail,
        s.bodyMarkdown,
        s.published,
        s.createdAt,
        s.updatedAt,
      )
      .run();
  } else {
    const existing = await db
      .prepare("SELECT body_markdown FROM posts WHERE slug = ?")
      .bind(PLATETEKTONIKK_SEED.slug)
      .first<{ body_markdown: string }>();
    if (isShortPlatetektonikkBody(existing?.body_markdown ?? "")) {
      await db
        .prepare(
          `UPDATE posts SET title = ?, summary = ?, ingress = ?, thumbnail = ?, body_markdown = ?, updated_at = ?
           WHERE slug = ?`,
        )
        .bind(
          PLATETEKTONIKK_SEED.title,
          PLATETEKTONIKK_SEED.summary,
          PLATETEKTONIKK_SEED.ingress,
          PLATETEKTONIKK_SEED.thumbnail,
          PLATETEKTONIKK_SEED.bodyMarkdown,
          nowStamp(),
          PLATETEKTONIKK_SEED.slug,
        )
        .run();
    }
  }
  return {
    persist: "d1",
    async list() {
      const { results } = await db
        .prepare("SELECT * FROM posts ORDER BY created_at DESC")
        .all<Record<string, unknown>>();
      return results.map(mapD1Row);
    },
    async get(slug) {
      const row = await db
        .prepare("SELECT * FROM posts WHERE slug = ?")
        .bind(slug)
        .first<Record<string, unknown>>();
      return row ? mapD1Row(row) : null;
    },
    async save(input) {
      const stamp = nowStamp();
      await db
        .prepare(
          `INSERT INTO posts (slug, title, summary, ingress, thumbnail, body_markdown, published, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (slug) DO UPDATE SET
             title = excluded.title,
             summary = excluded.summary,
             ingress = excluded.ingress,
             thumbnail = excluded.thumbnail,
             body_markdown = excluded.body_markdown,
             published = excluded.published,
             updated_at = excluded.updated_at`,
        )
        .bind(
          input.slug,
          input.title,
          input.summary,
          input.ingress,
          input.thumbnail,
          input.bodyMarkdown,
          input.published,
          stamp,
          stamp,
        )
        .run();
    },
    async remove(slug) {
      await db.prepare("DELETE FROM posts WHERE slug = ?").bind(slug).run();
    },
    async getMeta(key) {
      const row = await db
        .prepare("SELECT value FROM cms_meta WHERE key = ?")
        .bind(key)
        .first<{ value: string }>();
      return nonEmptyMeta(row?.value);
    },
    async setMeta(key, value) {
      await db
        .prepare(
          `INSERT INTO cms_meta (key, value) VALUES (?, ?)
           ON CONFLICT (key) DO UPDATE SET value = excluded.value`,
        )
        .bind(key, value)
        .run();
    },
  };
}

function postgresStore(sql: SqlClient): Store {
  return {
    persist: "postgres",
    list: () => sql.query<Post>(`${SELECT_POSTGRES} order by created_at desc`),
    async get(slug) {
      const rows = await sql.query<Post>(`${SELECT_POSTGRES} where slug = $1`, [slug]);
      return rows[0] ?? null;
    },
    async save(data) {
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
    },
    async remove(slug) {
      await sql.query(`delete from posts where slug = $1`, [slug]);
    },
    async getMeta() {
      return null;
    },
    async setMeta() {
      /* local editing does not persist a CMS password */
    },
  };
}

const memorySeeds = seededPosts();
const memory = {
  posts: new Map<string, Post>(memorySeeds.map((post) => [post.slug, post])),
  meta: new Map<string, string>(),
  nextId: memorySeeds.length + 1,
};

function memoryStore(): Store {
  return {
    persist: "memory",
    async list() {
      return [...memory.posts.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    },
    async get(slug) {
      return memory.posts.get(slug) ?? null;
    },
    async save(input) {
      const existing = memory.posts.get(input.slug);
      const stamp = nowStamp();
      memory.posts.set(input.slug, {
        id: existing?.id ?? memory.nextId++,
        slug: input.slug,
        title: input.title,
        summary: input.summary,
        ingress: input.ingress,
        thumbnail: input.thumbnail,
        bodyMarkdown: input.bodyMarkdown,
        published: input.published,
        createdAt: existing?.createdAt || stamp,
        updatedAt: stamp,
      });
    },
    async remove(slug) {
      memory.posts.delete(slug);
    },
    async getMeta(key) {
      return nonEmptyMeta(memory.meta.get(key));
    },
    async setMeta(key, value) {
      memory.meta.set(key, value);
    },
  };
}

async function callPostsDo<T>(ns: DurableNs, op: PostsDoOp): Promise<T> {
  const stub = ns.get(ns.idFromName(POSTS_DO_NAME));
  const res = await stub.fetch("https://posts-do/op", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(op),
  });
  const json = (await res.json()) as PostsDoResult;
  if (!res.ok || !json.ok) {
    const error = json && typeof json === "object" && "error" in json ? json.error : res.statusText;
    throw new Error(`${POSTS_DO_BINDING} ${op.op} failed: ${error}`);
  }
  return json.data as T;
}

function durableStore(ns: DurableNs): Store {
  return {
    persist: "do",
    list: () => callPostsDo<Post[]>(ns, { op: "list" }),
    get: (slug) => callPostsDo<Post | null>(ns, { op: "get", slug }),
    async save(input) {
      await callPostsDo(ns, { op: "save", input });
    },
    async remove(slug) {
      await callPostsDo(ns, { op: "remove", slug });
    },
    getMeta: (key) => callPostsDo<string | null>(ns, { op: "getMeta", key }),
    async setMeta(key, value) {
      await callPostsDo(ns, { op: "setMeta", key, value });
    },
  };
}

export async function getPostStore(): Promise<Store> {
  const env = await resolveWorkerEnv();
  try {
    const backend = choosePostBackend(
      Boolean(env?.POSTS_DB),
      isCloudflareWorker(),
      Boolean(env?.POSTS_DO),
    );
    console.info("[posts] backend", backend);
    if (backend === "d1") {
      if (!env?.POSTS_DB) throw new Error("POSTS_DB binding missing");
      return d1Store(env.POSTS_DB);
    }
    if (backend === "do") {
      if (!env?.POSTS_DO) throw new Error("POSTS_DO binding missing");
      const store = durableStore(env.POSTS_DO);
      await ensureChapterSeeds(store);
      return store;
    }
    if (backend === "memory") {
      console.warn(
        "[posts] no POSTS_DB/POSTS_DO binding — using in-memory seed (edits will not persist)",
      );
      await ensureChapterSeeds(memoryStore());
      return memoryStore();
    }
    const { getSql } = await import("@/lib/db");
    const store = postgresStore(await getSql());
    await ensureChapterSeeds(store);
    return store;
  } catch (err) {
    if (!canUseMemorySeedFallback(Boolean(env?.POSTS_DB), Boolean(env?.POSTS_DO))) {
      throw err;
    }
    console.error("[posts] store init failed, using in-memory seed", err);
    await ensureChapterSeeds(memoryStore());
    return memoryStore();
  }
}

async function ensureChapterSeeds(store: Store): Promise<void> {
  try {
    for (const seed of CHAPTER_POST_SEEDS) {
      const post = await store.get(seed.slug);
      if (!post) {
        await store.save(toPostInput(seed));
        continue;
      }
      if (seed.slug === "platetektonikk" && isShortPlatetektonikkBody(post.bodyMarkdown)) {
        await store.save({
          ...toPostInput(seed),
          published: post.published ?? 1,
        });
      }
    }
  } catch (err) {
    console.error("[posts] chapter seed failed", err);
  }
}

function setSessionCookie(value: string) {
  setCookie(CMS_COOKIE, value, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

function clearSessionCookie() {
  setCookie(CMS_COOKIE, "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
  });
}

async function cookieIsValid(store: Store, cookie: string | undefined): Promise<boolean> {
  if (!cookie) return false;
  const password = envPassword();
  if (password) {
    const expected = await passwordCookieValue(password);
    return timingSafeEqual(cookie, expected);
  }
  const sessionHash = await store.getMeta(SESSION_META);
  if (!sessionHash) return false;
  return timingSafeEqual(await sha256Hex(cookie), sessionHash);
}

async function readStoredPassword(
  store: Store,
): Promise<{ salt: string; hash: string } | null> {
  const salt = nonEmptyMeta(await store.getMeta(SALT_META));
  const hash = nonEmptyMeta(await store.getMeta(PASSWORD_META));
  if (salt && hash) return { salt, hash };
  return null;
}

async function startSession(store: Store): Promise<void> {
  const token = crypto.randomUUID() + crypto.randomUUID();
  await store.setMeta(SESSION_META, await sha256Hex(token));
  setSessionCookie(token);
}

export async function cmsStatus(): Promise<CmsStatus> {
  try {
    if (isLocalDev) {
      return { allowed: true, signedIn: true, needsSetup: false, persist: "postgres" };
    }
    const store = await getPostStore();
    const signedIn = await cookieIsValid(store, getCookie(CMS_COOKIE));
    const stored = await readStoredPassword(store);
    return {
      allowed: signedIn,
      signedIn,
      needsSetup: needsCmsSetup(envPassword(), stored?.salt, stored?.hash),
      persist: store.persist,
    };
  } catch (err) {
    console.error("[cms] status failed", err);
    return {
      allowed: false,
      signedIn: false,
      needsSetup: needsCmsSetup(envPassword(), null, null),
      persist: "memory",
    };
  }
}

export async function assertCanEdit(): Promise<void> {
  const status = await cmsStatus();
  if (status.allowed) return;
  throw new Error("Unauthorized");
}

/**
 * One entry point for the gate: log in if a complete password exists,
 * otherwise set it. Avoids “already set” vs “not set yet” on the same form.
 */
export async function unlockCms(password: string): Promise<CmsStatus> {
  if (isLocalDev) return cmsStatus();
  const trimmed = password.trim();
  if (!trimmed) throw new Error("Passord er påkrevd");

  const configured = envPassword();
  if (configured) {
    const expected = await passwordCookieValue(configured);
    const given = await passwordCookieValue(trimmed);
    if (!timingSafeEqual(given, expected)) throw new Error("Feil passord");
    setSessionCookie(expected);
    return cmsStatus();
  }

  const store = await getPostStore();
  const stored = await readStoredPassword(store);
  if (stored) {
    const given = await sha256Hex(`${stored.salt}:${trimmed}`);
    if (!timingSafeEqual(given, stored.hash)) throw new Error("Feil passord");
    await startSession(store);
    return cmsStatus();
  }

  if (trimmed.length < 8) throw new Error("Passordet må være minst 8 tegn");
  const salt = crypto.randomUUID();
  await store.setMeta(SALT_META, salt);
  await store.setMeta(PASSWORD_META, await sha256Hex(`${salt}:${trimmed}`));
  await startSession(store);
  return cmsStatus();
}

export async function loginCms(password: string): Promise<CmsStatus> {
  return unlockCms(password);
}

export async function setupCms(password: string): Promise<CmsStatus> {
  return unlockCms(password);
}

export async function logoutCms(): Promise<CmsStatus> {
  clearSessionCookie();
  if (!isLocalDev) {
    try {
      const store = await getPostStore();
      await store.setMeta(SESSION_META, "");
    } catch {
      /* ignore */
    }
  }
  return cmsStatus();
}
