import type { QuizQuestion } from "@/components/quiz";
import {
  QUIZ_SJEKK_SKYER_1,
  QUIZ_SJEKK_SKYER_2,
  QUIZ_SJEKK_SKYER_3,
  QUIZ_SJEKK_SKYER_4,
  QUIZ_SJEKK_NATURLIG_1,
  QUIZ_SJEKK_NATURLIG_2,
  QUIZ_SJEKK_NATURLIG_3,
  QUIZ_SJEKK_NATURLIG_4,
  QUIZ_SJEKK_SKYER_5,
  QUIZ_SJEKK_VAERKART_5,
  QUIZ_SJEKK_KRYO_4,
  QUIZ_SJEKK_KRYO_5,
  QUIZ_SJEKK_HAVSTROMMER_7,
  QUIZ_SJEKK_HAVSTROMMER_8,
  QUIZ_SJEKK_HAVSTROMMER_9,
  QUIZ_SJEKK_HAVSTROMMER_10,
} from "./poster-quizzes-b.ts";

/** Pakke B. Slås sammen med SJEKK_DEG_SELV og SAMMENDRAG i kapittel-mal.ts. Nøklene følger samme regler. */
export const SJEKK_DEG_SELV_B: Record<string, QuizQuestion[]> = {
  Skyer1: QUIZ_SJEKK_SKYER_1,
  Skyer2: QUIZ_SJEKK_SKYER_2,
  Skyer3: QUIZ_SJEKK_SKYER_3,
  Skyer4: QUIZ_SJEKK_SKYER_4,
  Skyer5: QUIZ_SJEKK_SKYER_5,
  Vaerkart5: QUIZ_SJEKK_VAERKART_5,
  Kryo4: QUIZ_SJEKK_KRYO_4,
  Kryo5: QUIZ_SJEKK_KRYO_5,
  Havstrommer7: QUIZ_SJEKK_HAVSTROMMER_7,
  Havstrommer8: QUIZ_SJEKK_HAVSTROMMER_8,
  Havstrommer9: QUIZ_SJEKK_HAVSTROMMER_9,
  Havstrommer10: QUIZ_SJEKK_HAVSTROMMER_10,
  Naturlig1: QUIZ_SJEKK_NATURLIG_1,
  Naturlig2: QUIZ_SJEKK_NATURLIG_2,
  Naturlig3: QUIZ_SJEKK_NATURLIG_3,
  Naturlig4: QUIZ_SJEKK_NATURLIG_4,
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
  Naturlig: [
    "Naturlig variasjon består av indre variabilitet og respons på ytre naturlige faktorer: sol, vulkaner, jordbanen og platetektonikk.",
    "Solsyklusen har en periode på 8–14 år. Endringen i solinnstråling siden 1850 er vurdert til 0,01 W/m², og gir høyst 0,01 °C.",
    "Maunder-minimum (1645–1715) lå inne i den lille istiden, men tidspunktet alene er ikke bevis på årsak. Vulkansk aktivitet var avgjørende.",
    "Store vulkanutbrudd kjøler ned jorda og gir mindre nedbør i 1–3 år.",
    "Drake-stredet, Panama og Himalaya er hypoteser om hva som drev avkjølingen i kenozoikum. Hutchinson mfl. (2021) finner at et fall i CO₂ passer best for isen på Antarktis for omtrent 34 millioner år siden.",
    "Livet har påvirket lufta: oksygen fra omtrent 2,5 milliarder år siden og kullbegravingen sent i karbon og tidlig i perm.",
    "Indre variabilitet, som AMV, kan i noen år skjule oppvarmingen. Over tid er den menneskeskapte oppvarmingen på 1,07 °C mye større enn bidraget fra sol, vulkaner og indre variabilitet.",
  ],
};
