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
import { CHAPTER_SEED_FLAG, chapterSeedIsCurrent, chapterSeedVersion } from "@/lib/chapter-seed-version";
import {
  type CopyReseed,
  copyReseedsVersion,
  oncePerKey,
  reseedFlaggedCopies as runCopyReseeds,
} from "@/lib/copy-reseed";
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
      const store = await d1Store(env.POSTS_DB);
      await reseedFlaggedCopies(store);
      return store;
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

/**
 * One-shot overwrites of chapter bodies after a copy correction.
 * Durable Object and D1 remember the flag. Local Postgres has no meta table,
 * so it only replaces a body that still contains a stale marker.
 */
const COPY_RESEEDS: CopyReseed[] = [
  {
    flag: "hoytrykk-copy-2026-10-06",
    slug: "hoytrykk-lavtrykk",
    stale: ["10 tonn", "Hva er egentlig lufttrykk", "fuktadiabatisk"],
  },
  {
    flag: "hoytrykk-copy-2-2026-10-06",
    slug: "hoytrykk-lavtrykk",
    stale: ["Det ser vi nærmere på nedenfor", "Luft er en blanding av gasser"],
  },
  {
    flag: "hoytrykk-copy-3-2026-10-07",
    slug: "hoytrykk-lavtrykk",
    stale: ["Vi lever på bunnen av et hav av luft."],
  },
  {
    flag: "vindsystemet-copy-2026-10-07",
    slug: "vindsystemet",
    stale: ["Her kan du redigere", "Nøkkelbegreper til repetisjon"],
  },
  {
    flag: "vaerkart-copy-2026-10-07",
    slug: "vaerkart",
    stale: ["Her kan du redigere", "WMO-stasjonsmodeller"],
  },
  {
    flag: "vaerkart-copy-2-2026-10-07",
    slug: "vaerkart",
    stale: ["følger ofte et fast løp"],
  },
  {
    // Geo (G2) må: Jacob Bjerknes og Solberg, ikke Vilhelm.
    flag: "g2-vaerkart-jacob-bjerknes-2026-10-11",
    slug: "vaerkart",
    stale: ["Vilhelm Bjerknes og Halvor Solberg utviklet den"],
  },
  {
    // Geo (G2) må: Ferrel-cellen drives av virvlene, ikke friksjon.
    flag: "g2-vindsystemet-ferrel-2026-10-11",
    slug: "vindsystemet",
    stale: ["Vestavinden mellom 35° og 60° skyldes friksjon"],
  },
  {
    flag: "vulkaner-copy-2026-10-06",
    slug: "vulkaner",
    stale: ["Henrys lov", "ventialsjonssystemet"],
  },
  {
    flag: "platetektonikk-rester-2026-10-06",
    slug: "platetektonikk",
    stale: ["Kauai (5 Ma)"],
  },
  {
    flag: "platetektonikk-astenosfare-2026-10-06",
    slug: "platetektonikk",
    stale: ["1450- 1650C", "Ridge push"],
  },
  {
    flag: "geologiske-ressurser-copy-2026-10-07",
    slug: "geologiske-ressurser",
    stale: ["Her kan du redigere", "Engebø"],
  },
  {
    flag: "feltarbeid-copy-2026-10-07",
    slug: "feltarbeid",
    stale: ["Her kan du redigere", "Vestland"],
  },
  {
    flag: "skred-copy-2026-10-07",
    slug: "skred",
    stale: ["Her kan du redigere", "Ormen Lange"],
  },
  {
    flag: "vann-og-flom-copy-2026-10-07",
    slug: "vann-og-flom",
    stale: ["Her kan du redigere", "Sandsekker når elva stiger"],
  },
  {
    flag: "bergarter-copy-2026-10-07",
    slug: "bergarter",
    stale: ["Her kan du redigere", "Bowens reaksjonsserie"],
  },
  {
    flag: "jordskjelv-copy-2026-10-07",
    slug: "jordskjelv",
    stale: ["Her kan du redigere", "Greens lov", "Harry Fielding"],
  },
  {
    flag: "jordsystemene-copy-2026-10-07",
    slug: "jordsystemene",
    stale: ["Fem sfærer, to spor", "Her kan du redigere"],
  },
  {
    flag: "jordsystemene-copy-2-2026-10-07",
    slug: "jordsystemene",
    stale: ["omtrent et livsløp"],
  },
  {
    flag: "jordsystemene-copy-3-2026-10-07",
    slug: "jordsystemene",
    stale: ["Hva er forvitring?", "AkviferForklaring", "IsostasiForklaring"],
  },
  {
    flag: "lokale-vaersystemer-copy-2026-10-07",
    slug: "lokale-vaersystemer",
    stale: ["Her kan du redigere", "barokline sonen"],
  },
  {
    flag: "jetstrommer-copy-2026-10-07",
    slug: "jetstrommer",
    stale: ["Her kan du redigere", "Shinkansen"],
  }
,
  {
    flag: "coriolis-copy-2026-10-07",
    slug: "coriolis",
    stale: ["Her kan du redigere", "Rossby-tallet"],
  },
  {
    flag: "g2-md-runde-coriolis-2026-10-08",
    slug: "coriolis",
    stale: ["Ingen dytter på ballen."],
  }
,
  {
    flag: "klima-copy-2026-10-07",
    slug: "klima",
    stale: ["Her kan du redigere", "Utdanningsdirektoratet, 2020"],
  },
  {
    flag: "g2-md-runde-klima-2026-10-08",
    slug: "klima",
    stale: ["Et dytt utenfra"],
  },
  {
    flag: "klima-dytter-2026-10-10",
    slug: "klima",
    stale: ["Vinden dytter på havet"],
  }
,
  {
    flag: "havstrommer-copy-2026-10-07",
    slug: "havstrommer",
    stale: ["Her kan du redigere", "termoklinen"],
  }
,
  {
    flag: "oversikt-copy-2026-10-07",
    slug: "oversikt",
    stale: ["Her kan du redigere", "Utdanningsdirektoratet, 2020"],
  },
  {
    flag: "g2-md-runde-oversikt-2026-10-08",
    slug: "oversikt",
    stale: ["svekke dytten"],
  },
  {
    flag: "oversikt-endring-2026-10-10",
    slug: "oversikt",
    stale: [
      "Det første dytet på energibalansen",
      "ikke det første dytet",
      "Det første skyvet på energibalansen",
      "ikke det første skyvet",
    ],
  }
,
  {
    flag: "enso-copy-2026-10-07",
    slug: "enso",
    stale: ["Her kan du redigere", "Kelvin-bølger"],
  },
  {
    flag: "enso-copy-2-2026-10-07",
    slug: "enso",
    stale: ["Noen ganger ser havet ut som El Niño eller La Niña"],
  },
  {
    flag: "g2-md-runde-enso-b1-13-2026-10-08",
    slug: "enso",
    stale: ["den maritime kontinentet"],
  }
,
  {
        flag: "iod-copy-2026-10-07",
    slug: "iod",
    stale: ["Her kan du redigere", "Black Summer"],
  }
,
  {
    flag: "iod-b1-7-2026-10-08",
    slug: "iod",
    stale: ["er uavhengig av ENSO", "ENSO eier Stillehavet"],
  }
,
  {
    flag: "iod-mats-word-2026-10-10",
    slug: "iod",
    stale: ["## Tre faser", "Hvordan den måles"],
  }
,
  {
    flag: "nao-copy-2026-10-07",
    slug: "nao",
    stale: ["Her kan du redigere", "sprengkulde"],
  },
  {
    flag: "nao-copy-2-2026-10-07",
    slug: "nao",
    stale: ["ikke automatisk det samme utslaget i hver landsdel"],
  }
,
  {
    flag: "nao-mats-word-2026-10-10",
    slug: "nao",
    stale: ["## To faser", "Allerede på slutten av 1700-tallet"],
  }
,
  {
    flag: "amoc-copy-2026-10-07",
    slug: "amoc",
    stale: ["Her kan du redigere", "vippepunkt"],
  },
  {
    flag: "amoc-copy-2-2026-10-07",
    slug: "amoc",
    stale: ["## Ferskvann kan bremse beltet"],
  }
,
  {
    flag: "kryosfaeren-copy-2026-10-07",
    slug: "kryosfaeren",
    stale: ["Her kan du redigere", "alle breer dør i år"],
  },
  {
    flag: "kryosfaeren-copy-2-2026-10-07",
    slug: "kryosfaeren",
    stale: ["Her er isen som måles i år."],
  }
,
  {
    flag: "numeriske-modeller-copy-2026-10-07",
    slug: "numeriske-modeller",
    stale: ["Her kan du redigere", "petaflops"],
  },
  {
    flag: "numeriske-modeller-copy-2-2026-10-07",
    slug: "numeriske-modeller",
    stale: ["Ett enkelt regnestykke sier ikke hvor sikkert været er."],
  }
,
  {
    flag: "paleoklima-copy-2026-10-07",
    slug: "paleoklima",
    stale: ["Her kan du redigere", "Rayleigh-fraksjonering"],
  },
  {
    flag: "paleoklima-copy-2-2026-10-07",
    slug: "paleoklima",
    stale: ["Satellittrekken starter altså i 1979."],
  }
,
  {
    flag: "milankovitch-copy-2026-10-07",
    slug: "milankovitch",
    stale: ["Her kan du redigere", "65 °N"],
  },
  {
    flag: "milankovitch-copy-2-2026-10-07",
    slug: "milankovitch",
    stale: ["Dagens breer er ikke kvartærtidens innlandsis."],
  },
  {
    flag: "g2-md-runde-milankovitch-2026-10-08",
    slug: "milankovitch",
    stale: ["11 600"],
  }
,
  {
    flag: "vaerkatastrofer-copy-2026-10-07",
    slug: "vaerkatastrofer",
    stale: ["Her kan du redigere", "Grays seks dannelseskriterier"],
  },
  {
    flag: "vaerkatastrofer-copy-2-2026-10-07",
    slug: "vaerkatastrofer",
    stale: ["Bare store orkaner er farlige, er feil."],
  }
,
  {
    flag: "tilpasning-copy-2026-10-07",
    slug: "tilpasning",
    stale: ["Her kan du redigere", "bestilt"],
  }
,
  {
    flag: "energi-hav-luft-copy-2026-10-07",
    slug: "energi-hav-luft",
    stale: ["Her kan du redigere", "kubikken"],
  },
  {
    flag: "energi-hav-luft-copy-2-2026-10-07",
    slug: "energi-hav-luft",
    stale: ["Bærekraft er denne avveiningen, ikke bare at vinden kommer tilbake."],
  },
  {
    // Geo (G2) må-punkter: Hywind Tampen 35 %, havvindland, Peterhead, malen.
    flag: "g2-energi-maa-2026-10-11",
    slug: "energi-hav-luft",
    stale: ["slik at energiforsyningen er utslippsfri", "Sørøst-Asia, USA og Storbritannia"],
  }
,
  {
    flag: "felt-hav-luft-is-copy-2026-10-07",
    slug: "felt-hav-luft-is",
    stale: ["Her kan du redigere", "Samme kjede, annen sfære"],
  },
  {
    flag: "felt-hav-luft-is-copy-2-2026-10-07",
    slug: "felt-hav-luft-is",
    stale: ["| Felt | Hva du kan måle | Hvor tallene kommer fra |"],
  },
  {
    flag: "isbreer-og-landformer-copy-2026-10-07",
    slug: "isbreer-og-landformer",
    stale: ["(SNL, u.å.-a). Prosessen krever vann"],
  },
  {
    flag: "g1-fakta-platetektonikk-2026-10-07",
    slug: "platetektonikk",
    stale: ["65 000 km lang undersjøisk fjellkjede, Den midtatlantiske"],
  },
  {
    flag: "g1-fakta-jordsystemene-2026-10-07",
    slug: "jordsystemene",
    stale: ["35 gigatonn i 2010"],
  },
  {
    flag: "g1-fakta-jordskjelv-2026-10-07",
    slug: "jordskjelv",
    stale: ["tettheten øker med om lag 30 prosent"],
  },
  {
    flag: "g1-fakta-bergarter-2026-10-07",
    slug: "bergarter",
    stale: ["safir 9"],
  },
  {
    flag: "g1-fakta-isbreer-2026-10-07",
    slug: "isbreer-og-landformer",
    stale: ["mistet 10 % av arealet"],
  },
  {
    flag: "g1-fakta-vann-og-flom-2026-10-07",
    slug: "vann-og-flom",
    stale: ["Sandig jord har større porøsitet"],
  },
  {
    flag: "g1-fakta-vulkaner-2026-10-07",
    slug: "vulkaner",
    stale: ["Sundhnúkur 2023–2024"],
  },
  {
    flag: "g1-fakta-landformer-2026-10-07",
    slug: "landformer",
    stale: ["kan følges fra Østfold og Vestfold"],
  },
  {
    flag: "g1-bergarter-oslofeltet-2026-10-10",
    slug: "bergarter",
    stale: ["sprakk skorpen opp fra Skagerrak til Østerdalen", "cirka 290 millioner år"],
  },
  {
    flag: "g1-jordsystemene-oslofeltet-2026-10-10",
    slug: "jordsystemene",
    stale: ["sprakk skorpen opp fra Skagerrak til Østerdalen"],
  },
  {
    flag: "g1-jordskjelv-deling-2026-10-10",
    slug: "jordskjelv",
    stale: ["Episenteret er senere lagt til Kattegat", "EarthquakeWavePhysics"],
  },
  {
    flag: "g1-fakta-skred-gjerdrum-2026-10-11",
    slug: "skred",
    stale: ["1500 mennesker ble evakuert"],
  },
  {
    flag: "g1-fakta-vulkaner-armero-2026-10-11",
    slug: "vulkaner",
    stale: ["Laharer gikk om lag 50 km ned dalen", "i [Jordskjelv og tsunamier](/geofag-1/jordskjelv)"],
  },
  {
    flag: "g1-feltarbeid-figurer-2026-10-11",
    slug: "feltarbeid",
    stale: ["kan en modell være oversikten som viser hva du observerte.\n\n## Hvordan presenterer"],
  },
  {
    flag: "g1-ressurser-figur-2026-10-11",
    slug: "geologiske-ressurser",
    stale: ["Nå skjer det i pukkverk (SNL, 2024b).\n\nIndustrimineraler"],
  },
  {
    flag: "g1-ressurser-md-2026-10-11",
    slug: "geologiske-ressurser",
    stale: ["## Hva er naturstein og pukk?", "## Hva utvinnes i Norge i dag?"],
  },
  {
    flag: "g1-isbreer-weichsel-117000-2026-10-11",
    slug: "isbreer-og-landformer",
    stale: ["fra om lag 120 000 til 11 700 år siden"],
  },
  {
    flag: "g1-jordsystemene-weichsel-117000-2026-10-11",
    slug: "jordsystemene",
    stale: ["fra om lag 120 000 år siden til for 11 700"],
  },
  {
    flag: "g1-norges-geologi-11700-2026-10-11",
    slug: "norges-geologi",
    stale: ["til ca. 10 000 år siden", "for ca. 10 000 år siden var det meste", "11 700 år siden (Mangerud, 2025a)"],
  },
  {
    flag: "g1-bergarter-mal-2026-10-11",
    slug: "bergarter",
    stale: ["*Forvitring:* Berg brytes ned", "laget skalaen i 1822", "Protolitten er leire."],
  },
  {
    flag: "g1-vulkaner-mal-2026-10-11",
    slug: "vulkaner",
    stale: ["Jordens indre prosesser", "Frekvens globalt", "Siste utbrudd var i september 1970", "200–700 km/t"],
  },
  {
    // Overskriver den lagrede teksten. Redaktørens nettsidetekst (11.10.2026) er synket inn i
    // platetektonikk-post.md og rettet. Sjekk at nettsiden ikke er redigert på nytt før merge.
    flag: "g1-platetektonikk-rettskriving-2026-10-11",
    slug: "platetektonikk",
    stale: ["være tilstedet for", "platedgrense"],
  },
  {
    // Geo sjekk1 (#130): må- og bør-punktene. Matcher bare redaktørens tekst før sjekk1.
    flag: "g1-platetektonikk-sjekk1-2026-10-11",
    slug: "platetektonikk",
    stale: ["dannet av mikroskopiske kiselalger", "For ca. 310 millioner år siden"],
  },
  {
    // Geo F1/F2 + tilbakemelding: malen, kjerneelementer, menneskelig aktivitet (isbreer-mal).
    flag: "g1-isbreer-mal-2026-10-11",
    slug: "isbreer-og-landformer",
    stale: ["*Isen som agent* – hvordan isbreen", "Det er en beslektet mekanisme til frostsprengning"],
  },
  {
    // Geo F1/F2 + tilbakemelding: malen, modellering, flodbølger, overvåking per 2026 (skred-mal).
    flag: "g1-skred-mal-2026-10-11",
    slug: "skred",
    stale: ["Over 1000 mennesker har mistet livet", "I vanlig sjøvann er saltinnholdet"],
  },
  {
    // Fjell § 6 R1–R3 (KM-komma, SNL-kilder).
    flag: "g1-jordsystemene-sjekk2-snl-2026-10-11",
    slug: "jordsystemene",
    stale: ["jordsystemene, og hvordan disse"],
  },
  {
    // Fjells kapittel etter malen (Geo sjekk 2 godkjent).
    flag: "g1-vann-og-flom-mal-2026-10-11",
    slug: "vann-og-flom",
    stale: ["Målet er at du skal kunne gjøre rede for det hydrologiske", "NVE kaller Hans den dyreste", "pinseflommen i 2011 og 2013", "cirka 144 000 brønner"],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-lokale-vaersystemer-figurer-2026-10-11",
    slug: "lokale-vaersystemer",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-jetstrommer-figurer-2026-10-11",
    slug: "jetstrommer",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-coriolis-figurer-2026-10-11",
    slug: "coriolis",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-havstrommer-figurer-2026-10-11",
    slug: "havstrommer",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-kryosfaeren-figurer-2026-10-11",
    slug: "kryosfaeren",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-numeriske-modeller-figurer-2026-10-11",
    slug: "numeriske-modeller",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-vaerkatastrofer-figurer-2026-10-11",
    slug: "vaerkatastrofer",
    stale: [],
  },
  {
    // Geo F2 (G2): figurene fra den kodede ruten er flyttet inn som widgets.
    flag: "g2-felt-hav-luft-is-figurer-2026-10-11",
    slug: "felt-hav-luft-is",
    stale: [],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-hoytrykk-lavtrykk-mal-2026-10-11",
    slug: "hoytrykk-lavtrykk",
    stale: ["Varm luft kan holde mye mer vanndamp"],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-lokale-vaersystemer-mal-2026-10-11",
    slug: "lokale-vaersystemer",
    stale: ["NOAA beskriver det samme kretsløpet"],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-jetstrommer-mal-2026-10-11",
    slug: "jetstrommer",
    stale: ["NOAA sammenligner jetstrømmen med en elv"],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-vaerkatastrofer-mal-2026-10-11",
    slug: "vaerkatastrofer",
    stale: ["Siden bruker ikke ordet barokline lavtrykk"],
  },
  {
    flag: "g1-jordsystemene-mal-2026-10-11",
    slug: "jordsystemene",
    stale: ["Mottakere og drivere", "For om lag 310 millioner år siden", "På eksamen er spørsmålet", "Hydrosfæren** er alt flytende vann", "fra om lag 120 000 år siden"],
  },
  {
    flag: "rettskriving-1-isbreer-og-landformer-2026-10-11",
    slug: "isbreer-og-landformer",
    stale: ["dette kapittelet"],
  },
  {
    flag: "rettskriving-1-landformer-2026-10-11",
    slug: "landformer",
    stale: ["høylte ut botner"],
  },
  {
    flag: "rettskriving-1-norges-geologi-2026-10-11",
    slug: "norges-geologi",
    stale: ["langs den midtatlantiske ryggen"],
  },
  {
    flag: "rettskriving-1-skred-2026-10-11",
    slug: "skred",
    stale: ["dette kapittelet"],
  },
  {
    flag: "rettskriving-1-vann-og-flom-2026-10-11",
    slug: "vann-og-flom",
    stale: ["dette kapittelet"],
  },
  {
    flag: "rettskriving-1-vulkaner-2026-10-11",
    slug: "vulkaner",
    stale: ["Luften"],
  },
  {
    flag: "g1-feltarbeid-md-2026-10-11",
    slug: "feltarbeid",
    stale: ["Feltarbeid er bare et samfunnsfaglig begrep", "Målet sier at resultatene skal presenteres"],
  },
  {
    flag: "g1-norges-geologi-md-2026-10-11",
    slug: "norges-geologi",
    stale: ["Pangea på å sprekke opp", "hevet landet seg opptil 220", "ca. 305–250", "Kilimanjaro"],
  },
  {
    flag: "g1-bergarter-oslorift-300-2026-10-11",
    slug: "bergarter",
    stale: ["For cirka 310 millioner år siden, mot slutten av karbon", "For cirka 305 millioner år siden", "funnet fem steder på jorda"],
  },
  {
    flag: "g1-landformer-md-2026-10-11",
    slug: "landformer",
    stale: ["isbreenes mektige arkitektur", "Leirparadokset", "Her kan du redigere **hele fagteksten**"],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-kryosfaeren-mal-2026-10-11",
    slug: "kryosfaeren",
    stale: ["De to ordene er ikke satt lik hverandre her", "om lag 5260 isbreer"],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-coriolis-mal-2026-10-11",
    slug: "coriolis",
    stale: ["Om lag halvparten av primærproduksjonen i havet skjer i oppvellingsområder"],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-vindsystemet-mal-2026-10-11",
    slug: "vindsystemet",
    stale: ["Bruk modellen i [dette kapittelet](/tema/vindsystemet)", "Jordaksen heller om lag 23 grader."],
  },
  {
    // Geo (G2): malen og bør-punktene.
    flag: "g2-vaerkart-mal-2026-10-11",
    slug: "vaerkart",
    stale: ["Vilhelm Bjerknes og Halvor Solberg, Bergensskolen, 1922"],
  },
  {
    // Fjells kapittel etter malen (Geo godkjent).
    flag: "g2-havstrommer-fjell-2026-10-11",
    slug: "havstrommer",
    stale: ["[Havstrømmer](/tema/havstrommer) handler om disse drivkreftene"],
  },
  {
    // Fjells kapittel etter malen (Geo godkjent).
    flag: "g2-numeriske-modeller-mal-2026-10-11",
    slug: "numeriske-modeller",
    stale: ["ECMWF har som kjerneoppgave", "Fra idé til regnestykke", "Observasjoner, hav og klima"],
  },
  {
    // Fjells kapittel etter malen (Geo godkjent).
    flag: "g2-felt-hav-luft-is-mal-2026-10-11",
    slug: "felt-hav-luft-is",
    stale: ["## Tre felt i samme kjede"],
  },
  {
    // Klima (Geo): kodet tekst flyttet til markdown etter malen.
    flag: "g2-klima-hub-md-2026-10-11",
    slug: "klima",
    stale: ["## Leserekkefølge"],
  },
  {
    // Klima (Geo): kodet tekst flyttet til markdown etter malen.
    flag: "g2-klima-tilpasning-md-2026-10-11",
    slug: "tilpasning",
    stale: ["## To svar"],
  },
  {
    // Klima (Geo): kodet tekst flyttet til markdown etter malen.
    flag: "g2-klima-oversikt-fjell-2026-10-11",
    slug: "oversikt",
    stale: ["eier stråling, pådriv og tilbakekobling. Kartet ligger på"],
  },
  {
    // Klima (Geo): kodet tekst flyttet til markdown etter malen.
    flag: "g2-klima-amoc-fjell-2026-10-11",
    slug: "amoc",
    stale: ["NOAA kaller hele beltet the global conveyor belt"],
  },
  {
    // Klima (Geo): kodet tekst flyttet til markdown etter malen.
    flag: "g2-klima-milankovitch-md-2026-10-11",
    slug: "milankovitch",
    stale: ["Isen som måles i år, eier"],
  },
  {
    // Klima (Geo): kodet tekst flyttet til markdown etter malen.
    flag: "g2-paleoklima-fjell-geo-2026-10-11",
    slug: "paleoklima",
    stale: ["Tre arkiv, tre klokker"],
  },
  {
    // Bergarter: differensiering, diagenese med porevæske, metasomatose (a6f3f57) og Mats' avsnitt om én-mineral-bergarter.
    flag: "g1-bergarter-differensiering-2026-10-15",
    slug: "bergarter",
    stale: [
      "forvitring, magmatiske, sedimentære og metamorfe bergarter, og bergartssyklusen",
      "**Skifrighet:** Plan struktur der bergarten spalter langs flak, som i fyllitt.\n\n**Protolitt:**",
    ],
  },
  {
    // Bergarter: Heving-setningen i syklus-avsnittet (#178), godkjent av Mats 16.10 og 17.10.
    flag: "g1-bergarter-heving-2026-10-17",
    slug: "bergarter",
    stale: ["og størkning er veien fra magma til magmatisk bergart.\n\nHvordan geologene vet"],
  },
  {
    // Isbreer: nytt botn-avsnitt (#181, GeoBot1-tekst), godkjent av Mats 17.10.
    flag: "g1-isbreer-botn-2026-10-17",
    slug: "isbreer-og-landformer",
    stale: ["En liten bre i en forsenkning skurer ut en skålform med bratt bakvegg."],
  },
  {
    // Jetstrømmer: tropopausen, Rossby-bølger, blokkering (med Arktis-setningen 1b) og jetstreak-avsnittet
    // (del 4) fra Fagredaktør Geo, nye kildebokstaver og widget-linjene JetVestOst og JetStormbane,
    // godkjent av Mats 18.10. Flagget er byttet da jetstreak-avsnittet kom inn, så en base som allerede
    // fikk den første versjonen (uten avsnittet) også blir overskrevet.
    flag: "jetstrommer-tekster-jetstreak-2026-10-18",
    slug: "jetstrommer",
    stale: ["polarfrontjetstrømmen (Store norske leksikon, u.å.).", "JetVestOst\n```\n\n```widget\nJetStreak"],
  },
  {
    // Værkart: setning om skydekket i stasjonsplottet (åttedeler), godkjent av Mats 18.10.
    flag: "vaerkart-skydekke-2026-10-18",
    slug: "vaerkart",
    stale: ["standardiserte (NOAA, u.å.-f).\n\n```widget\nStationModel"],
  },
  {
    // Jordskjelv: ny figur Bolgegenerering under «Overflatebølger» (bare widget-fencen er ny), fagsjekket av Geo 19.10.
    flag: "jordskjelv-bolgegenerering-2026-10-19",
    slug: "jordskjelv",
    stale: ["rister husene mest.\n\n```widget\nSjekkJordskjelv3"],
  },
  {
    // Jordskjelv som naturfare: gjentak med Poisson-formel P = 1 − e^(−T/R) i l. 118 og tabellen
    // 1,0 / 39,3 / 63,2 % i l. 122 (Baker, 2008; USGS, 2019). Fagsjekket av Geo 20.10, PR godkjent av Mats 20.10.
    flag: "g1-jordskjelv-naturfare-poisson-2026-10-20",
    slug: "jordskjelv-naturfare",
    stale: ["P = 1 − (1 − 1/R)^T.", "| 100 år | 1 % | 39,5 % | 63,4 % |"],
  },
  { flag: "g2-coriolis-ekman-2026-10-22", slug: "coriolis", stale: ["opptil 100–200 m ved sterk vind", "ca. 5°, om lag 500 km"] },
];

const COPY_RESEED_SEEDS = CHAPTER_POST_SEEDS.map((seed) => ({
  slug: seed.slug,
  bodyMarkdown: seed.bodyMarkdown,
  input: () => toPostInput(seed),
}));

/** Én kjøring per isolate. Samtidige forespørsler på en kald isolate deler samme løfte. */
const copyReseedOnce = oncePerKey();

function reseedFlaggedCopies(store: Store): Promise<void> {
  return copyReseedOnce(`${store.persist}:${copyReseedsVersion(COPY_RESEEDS)}`, () =>
    runCopyReseeds(store, COPY_RESEEDS, COPY_RESEED_SEEDS),
  );
}

/** One-shot write of the three poster bodies Mats saved before they were overwritten. */
const SAVED_POSTER_RESTORE = "saved-poster-restore-2026-10-06";
const SAVED_POSTER_SLUGS = ["platetektonikk", "vulkaner", "hoytrykk-lavtrykk"] as const;

async function restoreSavedPosters(store: Store): Promise<void> {
  if (await store.getMeta(SAVED_POSTER_RESTORE)) return;
  for (const slug of SAVED_POSTER_SLUGS) {
    const seed = CHAPTER_POST_SEEDS.find((row) => row.slug === slug);
    if (!seed) continue;
    const existing = await store.get(slug);
    if (existing?.bodyMarkdown === seed.bodyMarkdown) continue;
    await store.save({
      ...toPostInput(seed),
      published: existing?.published ?? 1,
    });
  }
  await store.setMeta(SAVED_POSTER_RESTORE, "1");
}

const chapterSeedOnce = oncePerKey();

/** One-shot so an existing CMS row picks up the 2026-10-06 platetektonikk copy edit. */
const PLATETEKTONIKK_COPY_FLAG = "platetektonikk-copy-2026-10-06";

async function publishPlatetektonikkCopy(store: Store): Promise<void> {
  if (await store.getMeta(PLATETEKTONIKK_COPY_FLAG)) return;
  const existing = await store.get(PLATETEKTONIKK_SEED.slug);
  if (!existing || existing.bodyMarkdown !== PLATETEKTONIKK_SEED.bodyMarkdown) {
    await store.save({
      ...toPostInput(PLATETEKTONIKK_SEED),
      published: existing?.published ?? 1,
    });
  }
  await store.setMeta(PLATETEKTONIKK_COPY_FLAG, "1");
}

async function ensureChapterSeeds(store: Store): Promise<void> {
  const version = chapterSeedVersion(CHAPTER_POST_SEEDS.map((seed) => seed.slug));
  try {
    await chapterSeedOnce(`${store.persist}:${version}`, () => runChapterSeeds(store, version));
  } catch (err) {
    console.error("[posts] chapter seed failed", err);
  }
}

async function runChapterSeeds(store: Store, version: string): Promise<void> {
  await publishPlatetektonikkCopy(store);
  await reseedFlaggedCopies(store);
  if (store.persist === "do" || store.persist === "d1") {
    const saved = await store.getMeta(CHAPTER_SEED_FLAG);
    if (chapterSeedIsCurrent(saved, version)) return;
  }
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
  if (store.persist === "do" || store.persist === "d1") {
    await restoreSavedPosters(store);
    await store.setMeta(CHAPTER_SEED_FLAG, version);
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
