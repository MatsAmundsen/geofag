/**
 * Kapittelmalen (Geo, F1): «Sjekk deg selv» mellom hoveddelene og «Sammendrag» før «Test deg selv».
 *
 * Nye kapitler trenger ikke registrere widgets for hånd i poster-body.tsx. Legg spørsmålene inn her,
 * så blir widgeten `Sjekk<Navn>` tilgjengelig i markdown. Det samme gjelder `Sammendrag<Navn>`.
 *
 * ```widget
 * SjekkLandformer1
 * ```
 */
import type { QuizQuestion } from "@/components/quiz";
import {
  QUIZ_SJEKK_LANDFORMER_1,
  QUIZ_SJEKK_LANDFORMER_2,
  QUIZ_SJEKK_LANDFORMER_3,
  QUIZ_SJEKK_LANDFORMER_4,
  QUIZ_SJEKK_LANDFORMER_5,
} from "./poster-quizzes.ts";

/** Nøkkelen blir widget-id-en med prefikset «Sjekk», f.eks. `Landformer1` → `SjekkLandformer1`. */
export const SJEKK_DEG_SELV: Record<string, QuizQuestion[]> = {
  Landformer1: QUIZ_SJEKK_LANDFORMER_1,
  Landformer2: QUIZ_SJEKK_LANDFORMER_2,
  Landformer3: QUIZ_SJEKK_LANDFORMER_3,
  Landformer4: QUIZ_SJEKK_LANDFORMER_4,
  Landformer5: QUIZ_SJEKK_LANDFORMER_5,
};

/** Nøkkelen blir widget-id-en med prefikset «Sammendrag». 4–6 punkter med hele setninger. */
export const SAMMENDRAG: Record<string, readonly string[]> = {
  Landformer: [
    "Landformene er resultatet av indre krefter som løfter berggrunnen, og ytre krefter som bryter den ned og flytter materialet.",
    "Forvitring bryter ned berget der det ligger. Mekanisk forvitring, som frostsprengning, deler berget opp, og kjemisk forvitring omdanner mineralene.",
    "Hjulströms diagram viser at sand eroderes ved lavest strømfart, mens fast leire kan kreve like stor fart som grus fordi leirkornene henger sammen.",
    "Elva graver V-daler i øvre løp, lager meandere og kroksjøer på flatere land og bygger delta der den munner ut.",
    "Viddene er etter den klassiske modellen rester av et gammelt, flatt landskap, mens fjordene og U-dalene er formet av isen. Hvordan fjellplatåene ble dannet, er omstridt.",
    "Mennesker endrer landformene når vi forbygger elver, tar ut sand og grus, bygger veier og byer og sikrer kysten, og inngrepene kan øke erosjon og skredfare.",
  ],
};

export function sjekkWidgetIds(): string[] {
  return Object.keys(SJEKK_DEG_SELV).map((key) => `Sjekk${key}`);
}

export function sammendragWidgetIds(): string[] {
  return Object.keys(SAMMENDRAG).map((key) => `Sammendrag${key}`);
}
