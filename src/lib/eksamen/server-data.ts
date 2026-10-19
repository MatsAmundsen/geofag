/**
 * Bare for serveren. Eksamenssett og løsningsforslag skal aldri havne i
 * klientkoden under /assets/ — de sendes fra /eksamen/* (bak Cloudflare Access).
 */
import { EXAM_SETS, examSet } from "./index";
import { SOLUTIONS } from "./solutions";
import type { ExamMeta, ExamPayload } from "./load";

export function examPayload(slug: string): ExamPayload | null {
  const set = examSet(slug);
  if (!set) return null;
  return { set, solutions: SOLUTIONS[slug] ?? {} };
}

export function examMetaList(): ExamMeta[] {
  return EXAM_SETS.map((s) => ({
    slug: s.slug,
    label: s.label,
    kind: s.kind,
    complete: s.complete,
    fasitSource: s.fasitSource,
    themes: s.themes,
    taskCount: s.tasks.length,
    solutionCount: Object.keys(SOLUTIONS[s.slug] ?? {}).length,
  }));
}
