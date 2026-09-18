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
