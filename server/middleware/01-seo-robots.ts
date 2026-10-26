import { isEditorPath, isRoutePlaceholderPath } from "../../src/lib/seo-robots";

/**
 * - Bokstavelige rutemaler (/eksamen/$slug, /poster/%24slug/rediger …) gir 404
 *   med noindex, så Google dropper dem fra indeksen.
 * - Redigeringssider får X-Robots-Tag: noindex, nofollow.
 * Kjører etter 00-tollbit-log (som fortsatt ser endelig respons).
 */
type NitroEvent = { url: URL };

export default async function seoRobotsMiddleware(
  event: NitroEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const path = event.url.pathname;
  if (isRoutePlaceholderPath(path)) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, nofollow",
        "cache-control": "no-store",
      },
    });
  }
  const result = await next();
  if (!isEditorPath(path) || !(result instanceof Response)) return result;
  const headers = new Headers(result.headers);
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(result.body, { status: result.status, statusText: result.statusText, headers });
}
