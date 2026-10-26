/**
 * Regler for hvilke stier som ikke skal i Googles indeks.
 *
 * - Redigeringssider (/poster/<slug>/rediger) er interne CMS-sider.
 * - Bokstavelige rutemaler (f.eks. /eksamen/$slug eller /eksamen/%24slug)
 *   lekker ut fordi TanStack serialiserer rute-ID-er ("/poster/$slug/") i
 *   SSR-HTML og JS-bunter, og Google plukker dem opp som URL-er. De er ikke
 *   ekte sider og skal gi 404.
 */
export function isEditorPath(pathname: string): boolean {
  return /^\/poster\/[^/]+\/rediger\/?$/.test(pathname);
}

export function isRoutePlaceholderPath(pathname: string): boolean {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // ugyldig escaping: sjekk rå sti
  }
  return /(^|\/)\$[A-Za-z_]/.test(decoded);
}
