import type { QuizQuestion } from "@/components/quiz";
import {
  QUIZ_SJEKK_SKYER_1,
  QUIZ_SJEKK_SKYER_2,
  QUIZ_SJEKK_SKYER_3,
  QUIZ_SJEKK_SKYER_4,
  QUIZ_SJEKK_SKYER_5,
} from "./poster-quizzes-b.ts";

/** Pakke B. Slås sammen med SJEKK_DEG_SELV og SAMMENDRAG i kapittel-mal.ts. Nøklene følger samme regler. */
export const SJEKK_DEG_SELV_B: Record<string, QuizQuestion[]> = {
  Skyer1: QUIZ_SJEKK_SKYER_1,
  Skyer2: QUIZ_SJEKK_SKYER_2,
  Skyer3: QUIZ_SJEKK_SKYER_3,
  Skyer4: QUIZ_SJEKK_SKYER_4,
  Skyer5: QUIZ_SJEKK_SKYER_5,
};

export const SAMMENDRAG_B: Record<string, readonly string[]> = {
  Skyer: [
    "Duggpunktet er temperaturen lufta må kjøles ned til for å bli mettet. Når stigende luft når den temperaturen, dannes skyer.",
    "Skyer består av små vanndråper eller iskrystaller. Vanndamp kondenserer på partikler som støv, sot og pollen, de såkalte kondensasjonskjernene.",
    "I kalde skyer vokser iskrystaller på bekostning av underkjølte dråper. Det gjør at nedbør kan dannes.",
    "WMO deler skyene inn i ti hovedtyper i tre høydenivåer. Satellitter ser høye skyer godt, mens observatører på bakken ser lave skyer best.",
    "Nedbør er orografisk, konvektiv eller frontal, etter hvordan lufta løftes. Fjell gir store forskjeller i nedbør mellom luvsiden og lesiden.",
    "Kystklima er mildere og våtere enn innlandsklima. Köppens soner A–E bygger på temperatur og nedbør, og Norge har polarklima, kaldtemperert og varmtemperert klima.",
  ],
};
