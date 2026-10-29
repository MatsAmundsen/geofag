import type { JSX } from "react";
import { FIGUR_BESTILLINGER, FigurBestilling } from "@/components/figur-bestilling";
import { G2_PAKKE_B_FERDIGE } from "@/components/g2-pakke-b-figurer";
import { Quiz } from "@/components/quiz";
import { QUIZ_NATURLIG, QUIZ_SKYER } from "@/lib/poster-quizzes-b";

/** Widgetene i Pakke B: sluttquizer og bestilte figurer. Spres inn i POSTER_WIDGETS i poster-body.tsx. */
export const POSTER_WIDGETS_B: Record<string, () => JSX.Element> = {
  ...Object.fromEntries(
    Object.entries(FIGUR_BESTILLINGER).map(([id, title]) => [
      id,
      () => <FigurBestilling id={id} title={title} />,
    ]),
  ),
  ...G2_PAKKE_B_FERDIGE,
  QuizNaturlig: () => <Quiz questions={QUIZ_NATURLIG} heading={null} intro="Velg ett svar per spørsmål." />,
  QuizSkyer: () => <Quiz questions={QUIZ_SKYER} heading={null} intro="Velg ett svar per spørsmål." />,
};
