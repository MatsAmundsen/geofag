/**
 * Poster pages are Durable Object content, not a static chapter. Without
 * no-store, Cloudflare/browsers can keep an old HTML document while the
 * editor (POST) already shows the saved markdown.
 */
function applyPosterNoStore(headers: Headers): void {
  headers.set("cache-control", "private, no-store, no-cache, must-revalidate");
  headers.set("cdn-cache-control", "no-store");
  headers.set("cloudflare-cdn-cache-control", "no-store");
}

type NitroEvent = { url: URL };

export default async function posterNoStoreMiddleware(
  event: NitroEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const result = await next();
  if (!event.url.pathname.startsWith("/poster")) return result;
  if (!(result instanceof Response)) return result;
  const headers = new Headers(result.headers);
  applyPosterNoStore(headers);
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
