/**
 * Omlasting når en kodebit (chunk) ikke finnes lenger.
 *
 * Etter en deploy kan en fane som alt står åpen, be om en gammel hashet fil som
 * /assets/bergartssyklus-figur-WUZ6lfCL.js. Den gir 404, og den dynamiske importen feiler.
 * Da laster vi siden på nytt én gang, så nettleseren får ny HTML med nye filnavn.
 *
 * Vern mot løkke: tidspunktet for omlastingen lagres i sessionStorage. Har vi alt lastet
 * på nytt i løpet av de siste RELOAD_WINDOW_MS, lar vi feilen gå videre til vanlig feilvisning.
 *
 * Trygt under SSR: ingenting her rører window eller sessionStorage når de ikke finnes.
 * Filen har ingen importer, så den kan testes direkte med node --experimental-strip-types.
 */

export const CHUNK_RELOAD_KEY = "geofag:chunk-reload-at";
export const RELOAD_WINDOW_MS = 10_000;

const CHUNK_FEIL = [
  /Failed to fetch dynamically imported module/i, // Chromium
  /Importing a module script failed/i, // Safari
  /error loading dynamically imported module/i, // Firefox
  /Unable to preload CSS/i, // Vite __vitePreload (CSS)
  /Loading (CSS )?chunk [^\s]+ failed/i, // webpack-lignende ChunkLoadError
  /ChunkLoadError/i,
];

/** Er dette en feil fra en dynamisk import / kodebit som ikke kunne lastes? */
export function isChunkLoadError(error: unknown, depth = 0): boolean {
  if (error == null || depth > 3) return false;
  if (typeof error === "string") return CHUNK_FEIL.some((re) => re.test(error));
  if (typeof error !== "object") return false;
  const e = error as { name?: unknown; message?: unknown; cause?: unknown; payload?: unknown };
  if (e.name === "ChunkLoadError") return true;
  if (typeof e.message === "string" && CHUNK_FEIL.some((re) => re.test(e.message as string))) return true;
  // Vite legger feilen i event.payload; Error kan ha en cause
  if (e.cause !== undefined && isChunkLoadError(e.cause, depth + 1)) return true;
  if (e.payload !== undefined && isChunkLoadError(e.payload, depth + 1)) return true;
  return false;
}

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Ren regel: får vi laste på nytt nå, gitt lagret tidspunkt? */
export function canReloadAt(stored: string | null, now: number, windowMs = RELOAD_WINDOW_MS): boolean {
  if (stored == null) return true;
  const t = Number(stored);
  if (!Number.isFinite(t)) return true;
  // klokke som har gått bakover: regn som gammel
  if (t > now) return true;
  return now - t > windowMs;
}

function safeSessionStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null; // f.eks. blokkert lagring
  }
}

function read(storage: StorageLike | null): string | null {
  try {
    return storage?.getItem(CHUNK_RELOAD_KEY) ?? null;
  } catch {
    return null;
  }
}

let reloadPending = false;

/**
 * Er en omlasting satt i gang i denne siden? Når 'vite:preloadError' stoppes med preventDefault,
 * gir Vite en tom modul videre (undefined), og det gir en følgefeil før siden rekker å laste på nytt.
 * Da viser vi «Laster siden på nytt …» i stedet for feilsiden.
 */
export function isReloadPending(): boolean {
  return reloadPending;
}

export type ReloadDeps = {
  storage?: StorageLike | null;
  now?: () => number;
  reload?: () => void;
};

/** Ville en omlasting skje nå? Leser bare, endrer ingenting. */
export function canReloadForChunkError(deps: ReloadDeps = {}): boolean {
  const storage = deps.storage !== undefined ? deps.storage : safeSessionStorage();
  if (!storage) return false; // server eller ingen lagring: ingen vern, så ingen omlasting
  return canReloadAt(read(storage), (deps.now ?? Date.now)());
}

/**
 * Last siden på nytt én gang. Gir true hvis omlastingen er satt i gang,
 * false hvis vernet stopper den (eller vi er på serveren).
 */
export function reloadOnceForChunkError(deps: ReloadDeps = {}): boolean {
  const storage = deps.storage !== undefined ? deps.storage : safeSessionStorage();
  if (!storage) return false;
  const now = (deps.now ?? Date.now)();
  if (!canReloadAt(read(storage), now)) return false;
  try {
    storage.setItem(CHUNK_RELOAD_KEY, String(now));
  } catch {
    return false; // kan ikke lagre vernet: ikke risiker løkke
  }
  const reload = deps.reload ?? (() => window.location.reload());
  if (!deps.reload) reloadPending = true;
  reload();
  return true;
}

/**
 * Kalles etter vellykket lasting. Nøkkelen fjernes først når vinduet er over:
 * fjernet vi den rett etter omlastingen, kunne en kodebit som fortsatt mangler, gi løkke.
 */
export function clearChunkReloadMark(deps: Pick<ReloadDeps, "storage" | "now"> = {}): void {
  const storage = deps.storage !== undefined ? deps.storage : safeSessionStorage();
  if (!storage) return;
  const stored = read(storage);
  if (stored == null) return;
  if (!canReloadAt(stored, (deps.now ?? Date.now)())) return;
  try {
    storage.removeItem(CHUNK_RELOAD_KEY);
  } catch {
    /* ignorer */
  }
}

let lytterSatt = false;

/** Lytter på Vites 'vite:preloadError' (bare i nettleseren, én gang). */
export function installChunkReloadListener(): void {
  if (typeof window === "undefined" || lytterSatt) return;
  lytterSatt = true;
  window.addEventListener("vite:preloadError", (event) => {
    // Bare stopp feilen når vi faktisk laster på nytt; ellers går den til vanlig feilvisning.
    if (canReloadForChunkError()) {
      event.preventDefault();
      reloadOnceForChunkError();
    }
  });
  // Rydd nøkkelen når siden har stått stabil lenger enn vinduet.
  window.setTimeout(() => clearChunkReloadMark(), RELOAD_WINDOW_MS + 1_000);
}
