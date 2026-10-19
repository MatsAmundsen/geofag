import { createIsomorphicFn, createServerFn } from "@tanstack/react-start";
import type { Solution } from "./solution-types";
import type { ExamKind, ExamSet } from "./types";

export type ExamPayload = { set: ExamSet; solutions: Record<number, Solution> };

/** Offentlig metadata til lista på /eksamen (ingen oppgavetekst). */
export type ExamMeta = {
  slug: string;
  label: string;
  kind: ExamKind;
  complete: boolean;
  fasitSource: "udir" | "eget";
  themes: string[];
  taskCount: number;
  solutionCount: number;
};

export const listExamMeta = createServerFn({ method: "GET" }).handler(async () => {
  const { examMetaList } = await import("./server-data");
  return examMetaList();
});

/**
 * Henter ett sett. På serveren direkte fra modulen, i nettleseren fra
 * /eksamen/data/<slug> (beskyttet sti). Svarer Access med innlogging,
 * lastes hele siden på nytt slik at nettleseren går via innloggingen.
 */
export const loadExamSet = createIsomorphicFn()
  .server(async (slug: string): Promise<ExamPayload | null> => {
    const { examPayload } = await import("./server-data");
    return examPayload(slug);
  })
  .client(async (slug: string): Promise<ExamPayload | null> => {
    const url = `/eksamen/data/${encodeURIComponent(slug)}`;
    try {
      const res = await fetch(url, {
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (res.status === 404) return null;
      if (res.ok && (res.headers.get("content-type") ?? "").includes("json")) {
        return (await res.json()) as ExamPayload;
      }
    } catch {
      // Access-omdirigering til cloudflareaccess.com gir CORS-feil.
    }
    window.location.assign(`/eksamen/${encodeURIComponent(slug)}${window.location.search}`);
    return new Promise<never>(() => {});
  });
