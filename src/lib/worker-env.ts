/**
 * Cloudflare Worker bindings (D1 / Durable Objects / secrets).
 *
 * Nitro stamps `globalThis.__env__` on every fetch. TanStack's `getRequest()`
 * is the original Request only when it was not cloned — a clone can have a
 * stub `env` without POSTS_DO. Always prefer a candidate that actually has
 * the CMS bindings.
 */
export type WorkerBindings = {
  POSTS_DB?: unknown;
  POSTS_DO?: unknown;
  CMS_PASSWORD?: string;
  ASSETS?: unknown;
};

export function pickWorkerEnv(
  candidates: Array<WorkerBindings | null | undefined>,
): WorkerBindings | null {
  const present = candidates.filter((env): env is WorkerBindings => Boolean(env));
  return (
    present.find((env) => Boolean(env.POSTS_DO || env.POSTS_DB)) ?? present[0] ?? null
  );
}

export function preventPosterCaching(setHeader: (name: string, value: string) => void): void {
  setHeader("cache-control", "private, no-store, no-cache, must-revalidate");
  setHeader("cdn-cache-control", "no-store");
  setHeader("cloudflare-cdn-cache-control", "no-store");
}
