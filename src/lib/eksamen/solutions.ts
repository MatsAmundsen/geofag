import type { Solution } from "./solution-types";
import { eksempelSolutions } from "./solutions/eksempel";
import { h2023Solutions } from "./solutions/h2023";
import { h2024Solutions } from "./solutions/h2024";
import { h2025Solutions } from "./solutions/h2025";
import { v2024Solutions } from "./solutions/v2024";
import { v2025Solutions } from "./solutions/v2025";
import { v2026Solutions } from "./solutions/v2026";

export type { FigureId, Solution, WhyNot } from "./solution-types";

export const SOLUTIONS: Record<string, Record<number, Solution>> = {
  v2026: v2026Solutions,
  h2025: h2025Solutions,
  v2025: v2025Solutions,
  h2024: h2024Solutions,
  v2024: v2024Solutions,
  h2023: h2023Solutions,
  eksempel: eksempelSolutions,
};

export function solutionFor(slug: string, number: number): Solution | undefined {
  return SOLUTIONS[slug]?.[number];
}
