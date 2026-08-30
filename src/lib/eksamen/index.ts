import type { ExamSet } from "./types";
import { eksempel } from "./sets/eksempel";
import { h2023 } from "./sets/h2023";
import { v2024 } from "./sets/v2024";
import { h2024 } from "./sets/h2024";
import { v2025 } from "./sets/v2025";
import { h2025 } from "./sets/h2025";
import { v2026 } from "./sets/v2026";
import { solutionFor } from "./solutions";

export const EXAM_SETS: ExamSet[] = [v2026, h2025, v2025, h2024, v2024, h2023, eksempel];

export function examSet(slug: string): ExamSet | undefined {
  return EXAM_SETS.find((s) => s.slug === slug);
}

export function displayPrompt(prompt: string): string {
  let body = prompt
    .replace(/^REA ?3043[^\n]*\n/gim, "")
    .replace(/^\/\n/gm, "")
    .replace(/^\.\.\.\n/gm, "")
    .replace(/^Eksamen (høsten|våren) \d+ fra Udir\n/gim, "")
    .replace(/^Eksempeloppgaver[^\n]*\n/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const lines = body.split("\n");
  if (lines.length >= 2 && /^oppgave\s+\d+/i.test(lines[0]) && /^oppgave\s+\d+/i.test(lines[1])) {
    body = lines.slice(1).join("\n").trim();
  }
  return body;
}

export function taskHeading(prompt: string, fallback: string): string {
  const lines = displayPrompt(prompt)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  for (const line of lines) {
    if (/^oppgave/i.test(line)) continue;
    if (/av \d+ til tema/i.test(line)) continue;
    if (/du skal svare/i.test(line)) continue;
    if (/kilde:/i.test(line)) continue;
    if (line.length > 3 && line.length < 48) return line;
  }
  return fallback;
}

export { solutionFor };
export type { ExamSet, ExamTask } from "./types";
