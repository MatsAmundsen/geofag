/** Pick a posts backend without touching PGLite or D1. */
export function choosePostBackend(
  hasD1: boolean,
  isWorker: boolean,
): "d1" | "memory" | "postgres" {
  if (hasD1) return "d1";
  if (isWorker) return "memory";
  return "postgres";
}
