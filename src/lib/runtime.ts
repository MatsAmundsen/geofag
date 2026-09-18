/**
 * Runtime detection. Keep this file free of DB imports so it is safe to load
 * on Cloudflare Workers.
 *
 * Node 22+ exposes `navigator.userAgent` ("Node.js/…"). That must not count
 * as a Worker. `nodejs_compat` Workers still have `WebSocketPair`, so that
 * stays the primary signal.
 */
export function isCloudflareWorker(): boolean {
  if (typeof window !== "undefined") return false;
  const g = globalThis as {
    WebSocketPair?: unknown;
    EdgeRuntime?: unknown;
    caches?: unknown;
    navigator?: { userAgent?: string };
  };
  if (typeof g.WebSocketPair !== "undefined") return true;
  if (typeof g.EdgeRuntime !== "undefined") return true;
  const inNode = typeof process !== "undefined" && Boolean(process.versions?.node);
  if (inNode) return false;
  if (typeof g.caches !== "undefined") return true;
  const ua =
    g.navigator?.userAgent ??
    (typeof navigator !== "undefined" ? navigator.userAgent : "");
  return typeof ua === "string" && /Cloudflare/i.test(ua);
}
