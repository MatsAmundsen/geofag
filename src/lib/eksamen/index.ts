import type { ExamSet } from "./types";
import { eksempel } from "./sets/eksempel";
import { h2023 } from "./sets/h2023";
import { v2024 } from "./sets/v2024";
import { h2024 } from "./sets/h2024";
import { v2025 } from "./sets/v2025";
import { h2025 } from "./sets/h2025";
import { v2026 } from "./sets/v2026";
import { baklengs } from "./sets/baklengs";

export const EXAM_SETS: ExamSet[] = [v2026, baklengs, h2025, v2025, h2024, v2024, h2023, eksempel];

export function examSet(slug: string): ExamSet | undefined {
  return EXAM_SETS.find((s) => s.slug === slug);
}

export { displayPrompt, taskHeading } from "./display";

export { MAAL_KART } from "./baklengs-kart";
export type { MaalKart } from "./baklengs-kart";
export { solutionFor, SOLUTIONS } from "./solutions";
export type { ExamSet, ExamTask } from "./types";
export type { FigureId, Solution, WhyNot } from "./solution-types";
