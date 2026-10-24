/**
 * Eksamenssett og løsningsforslag under /eksamen/* ligger bak Cloudflare
 * Access. De skal ikke caches i delte cacher eller indekseres.
 * Selve forsiden /eksamen er offentlig og røres ikke.
 */
type NitroEvent = { url: URL };

export default async function eksamenNoStoreMiddleware(
  event: NitroEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const result = await next();
  if (!event.url.pathname.startsWith("/eksamen/")) return result;
  if (!(result instanceof Response)) return result;
  const headers = new Headers(result.headers);
  headers.set("cache-control", "private, no-store");
  headers.set("cdn-cache-control", "no-store");
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
