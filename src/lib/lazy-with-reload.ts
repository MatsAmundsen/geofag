import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { clearChunkReloadMark, isChunkLoadError, isReloadPending, reloadOnceForChunkError } from "./chunk-reload";

/**
 * Som React.lazy, men når kodebiten ikke finnes lenger (gammel fane etter en deploy), lastes
 * siden på nytt én gang i stedet for å vise «Something went wrong». Mens omlastingen pågår,
 * står Suspense-plassholderen. Er omlastingen alt prøvd, kastes feilen videre som før.
 *
 * Filene importerer den som `lazy` (`import { lazyWithReload as lazy } from "@/lib/lazy-with-reload"`),
 * så kallene ser ut som før.
 */
// samme signatur som React.lazy
export function lazyWithReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() =>
    factory().then(
      (mod) => {
        // tom modul: 'vite:preloadError' ble stoppet fordi siden alt lastes på nytt
        if (mod == null && isReloadPending()) return new Promise<{ default: T }>(() => {});
        clearChunkReloadMark();
        return mod;
      },
      (error: unknown) => {
        if (isChunkLoadError(error) && reloadOnceForChunkError()) {
          // siden lastes på nytt; hold plassholderen til da
          return new Promise<{ default: T }>(() => {});
        }
        throw error;
      },
    ),
  );
}
