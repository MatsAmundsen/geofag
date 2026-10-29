import type { QuizQuestion } from "@/components/quiz";

/**
 * Spørsmål til Geofag 2 pakke A (energi, klima). Egen fil så de eksisterende
 * nøklene i poster-quizzes.ts står urørt. Nøklene registreres i kapittel-mal.ts.
 */

// ── Energi fra hav og atmosfære (utvidelse) ────────────────────────────────

export const QUIZ_SJEKK_ENERGI_3: QuizQuestion[] = [
  {
    prompt: "Hvilken av disse energikildene har ikke sola som opphav?",
    options: ["Vindkraft", "Bølgekraft", "Tidevannskraft", "Solceller"],
    answer: 2,
    explain:
      "Tidevann kommer av månens og solas tiltrekning, ikke av solstråling. Vind og bølger drives av at sola varmer atmosfæren og havet (Store norske leksikon).",
  },
  {
    prompt: "Hvorfor avsluttet Statkraft arbeidet med saltkraft i desember 2013?",
    options: [
      "Prototypen på Tofte virket ikke i det hele tatt",
      "Potensialet i Norge viste seg å være null",
      "Teknologien ville ikke bli konkurransedyktig i overskuelig fremtid",
      "Myndighetene forbød anlegg i elvemunninger",
    ],
    answer: 2,
    explain:
      "Statkraft mente at de ikke fikk produksjonskostnadene ned på nivå med andre teknologier. De viste at teknologien virker (Statkraft, 2013).",
  },
  {
    prompt: "Omtrent hvor stor del av kraftproduksjonen i Norge kom fra solceller ved inngangen til 2025?",
    options: ["Cirka 0,35 prosent", "Cirka 10 prosent", "Cirka 35 prosent"],
    answer: 0,
    explain: "Rundt 33 000 anlegg og 754 megawatt ga en forventet årsproduksjon på 569 gigawattimer, cirka 0,35 prosent.",
  },
];

export const QUIZ_SJEKK_ENERGI_4: QuizQuestion[] = [
  {
    prompt: "Hva er et amfidromisk punkt?",
    options: [
      "Et sted der tidevannet er størst",
      "Et sted i havet der tidevannet har null utslag og tidevannsbølgen går rundt punktet",
      "Et sted der tidevannsstrømmen er sterkest",
      "Et sted der månen står rett over havet",
    ],
    answer: 1,
    explain: "Bølgen går rundt punktet på en tidevannsperiode, og bølgehøyden avtar til null inn mot punktet (Store norske leksikon).",
  },
  {
    prompt: "Hvorfor er tidevannsforskjellene små langs Jærkysten og i Skagerrak?",
    options: [
      "Fordi månen har liten innflytelse der",
      "Fordi det ligger et amfidromisk punkt vest for Egersund",
      "Fordi havet er for dypt",
    ],
    answer: 1,
    explain: "Bølger fra nord og bølger reflektert fra sør opphever hverandre delvis, og gir et punkt der det omtrent ikke er tidevannsforskjell (Kartverket, 2023).",
  },
  {
    prompt: "Hva skjer med effekten fra en vindturbin når vinden øker fra 15 til 20 meter per sekund?",
    options: [
      "Den blir omtrent åtte ganger så stor",
      "Den holder seg omtrent jevn, fordi bladene justeres",
      "Den faller til null",
    ],
    answer: 1,
    explain: "Over cirka 13 meter per sekund justeres bladene slik at effekten flater ut. Først over 25 meter per sekund stoppes turbinen.",
  },
  {
    prompt: "Hva er de tre dimensjonene i bærekraftig utvikling?",
    options: [
      "Miljø, sosial og økonomi",
      "Fortid, nåtid og fremtid",
      "Land, hav og luft",
      "Fornybar, utslippsfri og billig",
    ],
    answer: 0,
    explain: "Bærekraft handler om miljømessig, sosial og økonomisk bærekraft samtidig (Store norske leksikon).",
  },
];

/** Tilleggsspørsmål i «Test deg selv» for Energi fra hav og atmosfære. */
export const QUIZ_ENERGI_A: QuizQuestion[] = [
  {
    prompt: "Hvor stor del av bevegelsesenergien i vinden kan en vindturbin teoretisk ta ut, ifølge Betz' lov?",
    options: ["Høyst 59,3 prosent", "Nesten 100 prosent", "Høyst 10 prosent"],
    answer: 0,
    explain: "Grensen er 16/27, 59,3 prosent. Dagens turbiner utnytter i praksis om lag 75 prosent av den grensen.",
  },
  {
    prompt: "Hva slo Høyesterett fast i Fosen-saken i 2021?",
    options: [
      "At vindkraft aldri kan bygges i reinbeiteområder",
      "At konsesjonene til Storheia og Roan var ugyldige fordi de krenket reindriftssamers rett til kulturutøvelse",
      "At turbinene måtte rives innen ett år",
    ],
    answer: 1,
    explain: "Høyesterett sa ikke hva som skulle skje med anleggene. Senere avtaler kompenserer for tapt vinterbeite (Store norske leksikon).",
  },
];

export const SJEKK_PAKKE_A: Record<string, QuizQuestion[]> = {
  Energi3: QUIZ_SJEKK_ENERGI_3,
  Energi4: QUIZ_SJEKK_ENERGI_4,
};

export const SAMMENDRAG_PAKKE_A: Record<string, readonly string[]> = {};
