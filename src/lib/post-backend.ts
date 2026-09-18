/** Pick a posts backend without touching PGLite or D1. */
export function choosePostBackend(
  hasD1: boolean,
  isWorker: boolean,
  hasDurableObject = false,
): "d1" | "do" | "memory" | "postgres" {
  if (hasD1) return "d1";
  if (hasDurableObject) return "do";
  if (isWorker) return "memory";
  return "postgres";
}

/**
 * Memory seed is only allowed when the Worker has no durable store. If D1 or
 * a Durable Object is bound, falling back to the bundled chapter hides live
 * edits behind the original fagtekst.
 */
export function canUseMemorySeedFallback(hasD1: boolean, hasDurableObject: boolean): boolean {
  return !hasD1 && !hasDurableObject;
}
