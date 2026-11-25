import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { canReloadForChunkError, isChunkLoadError, isReloadPending, reloadOnceForChunkError } from "@/lib/chunk-reload";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  // Gammel kodebit etter en deploy: last siden på nytt én gang i stedet for å vise feilen.
  // Leses bare i nettleseren (canReloadForChunkError gir false på serveren).
  // Er omlastingen alt i gang (følgefeil etter 'vite:preloadError'), venter vi bare på den.
  const [lasterPaaNytt, settLasterPaaNytt] = useState(
    () => isReloadPending() || (isChunkLoadError(error) && canReloadForChunkError()),
  );

  useEffect(() => {
    if (!lasterPaaNytt || isReloadPending()) return;
    if (!reloadOnceForChunkError()) settLasterPaaNytt(false);
  }, [lasterPaaNytt]);

  if (lasterPaaNytt) {
    return (
      <main
        className={
          "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
          "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
        }
        aria-busy="true"
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Laster siden på nytt …</p>
      </main>
    );
  }

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400">
        {error instanceof Error ? error.message : "An unexpected error occurred. Try reloading the page."}
      </p>
    </main>
  );
}
