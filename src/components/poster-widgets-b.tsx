import type { JSX } from "react";
import { FIGUR_BESTILLINGER, FigurBestilling } from "@/components/figur-bestilling";
import { Quiz } from "@/components/quiz";
import { QUIZ_SKYER } from "@/lib/poster-quizzes-b";

/** Widgetene i Pakke B: sluttquizer og bestilte figurer. Spres inn i POSTER_WIDGETS i poster-body.tsx. */
export const POSTER_WIDGETS_B: Record<string, () => JSX.Element> = {
  ...Object.fromEntries(
    Object.entries(FIGUR_BESTILLINGER).map(([id, title]) => [
      id,
      () => <FigurBestilling id={id} title={title} />,
    ]),
  ),
  QuizSkyer: () => <Quiz questions={QUIZ_SKYER} heading={null} intro="Velg ett svar per spørsmål." />,
};
