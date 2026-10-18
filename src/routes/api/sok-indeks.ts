import { createFileRoute } from "@tanstack/react-router";

/**
 * Søkeindeksen for hele nettstedet, bygd fra de publiserte kapitlene i CMS
 * (Durable Object / D1), ikke fra md-filene. Mats sin egen CMS-tekst
 * (platetektonikk, vulkaner) kommer derfor med slik den står på siden.
 *
 * Kostnad i Workeren:
 * - Innen 30 s i samme isolate: ingen CMS-kall, bare svaret fra minnet.
 * - Ellers: ett `list()`-kall til CMS for å regne ut versjonen
 *   (slug + updatedAt + lengde). Er versjonen uendret, brukes indeksen i minnet.
 * - Ny versjon: Cache API (per datasenter) med versjonen i nøkkelen, og først
 *   ved bom bygges indeksen (~25–40 ms CPU for 35 kapitler).
 *
 * Når et kapittel lagres i CMS eller reseedes, får det ny updatedAt, og da får
 * indeksen ny versjon og ETag. Endepunktet skriver aldri til CMS.
 */

type Lagret = { versjon: string; body: string; sjekket: number };

const SJEKK_MS = 30_000;
let minne: Lagret | null = null;

type CacheLike = {
  match: (req: Request) => Promise<Response | undefined>;
  put: (req: Request, res: Response) => Promise<void>;
};

function edgeCache(): CacheLike | null {
  const c = (globalThis as { caches?: { default?: CacheLike } }).caches;
  return c?.default ?? null;
}

function svar(lagret: Lagret, request: Request, kilde: string, ms: number): Response {
  const etag = `"${lagret.versjon}"`;
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=60, stale-while-revalidate=600",
    etag,
    "x-sok-versjon": lagret.versjon,
    "server-timing": `sok;desc="${kilde}";dur=${ms.toFixed(1)}`,
  });
  const inm = request.headers.get("if-none-match");
  if (inm && inm.split(",").some((t) => t.trim().replace(/^W\//, "") === etag)) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(lagret.body, { status: 200, headers });
}

export const Route = createFileRoute("/api/sok-indeks")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const t0 = performance.now();
        const now = Date.now();
        if (minne && now - minne.sjekket < SJEKK_MS) {
          return svar(minne, request, "minne", performance.now() - t0);
        }
        const [{ getPostStore }, { byggSokIndeks, sokIndeksVersjon }] = await Promise.all([
          import("@/lib/post-store.server"),
          import("@/lib/sok/indeks"),
        ]);
        let posts;
        try {
          posts = await (await getPostStore()).list();
        } catch (err) {
          console.error("[sok] kunne ikke lese CMS", err);
          if (minne) return svar(minne, request, "minne-feil", performance.now() - t0);
          return new Response(JSON.stringify({ error: "Søket er ikke tilgjengelig akkurat nå." }), {
            status: 503,
            headers: {
              "content-type": "application/json; charset=utf-8",
              "cache-control": "no-store",
            },
          });
        }
        const versjon = sokIndeksVersjon(posts);
        if (minne && minne.versjon === versjon) {
          minne.sjekket = now;
          return svar(minne, request, "minne-sjekket", performance.now() - t0);
        }

        const cache = edgeCache();
        const key = new Request(
          `${new URL(request.url).origin}/api/sok-indeks?v=${encodeURIComponent(versjon)}`,
        );
        if (cache) {
          try {
            const hit = await cache.match(key);
            if (hit) {
              minne = { versjon, body: await hit.text(), sjekket: now };
              return svar(minne, request, "cache", performance.now() - t0);
            }
          } catch (err) {
            console.warn("[sok] cache.match feilet", err);
          }
        }

        const body = JSON.stringify(byggSokIndeks(posts));
        minne = { versjon, body, sjekket: now };
        if (cache) {
          try {
            await cache.put(
              key,
              new Response(body, {
                headers: {
                  "content-type": "application/json; charset=utf-8",
                  "cache-control": "public, max-age=604800",
                },
              }),
            );
          } catch (err) {
            console.warn("[sok] cache.put feilet", err);
          }
        }
        return svar(minne, request, "bygd", performance.now() - t0);
      },
    },
  },
});
