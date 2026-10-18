/**
 * Tekstene til «Gamle vidder, unge fjorder og strandflaten» (landformer.md l. 135–147).
 * Deles med plassholderen, så serveren ikke trenger figurmodulen. Ingen stedsnavn, eksempler eller
 * tall som ikke står i avsnittet. Tallene for strandflaten står bare i status og profil (GeoBot1, 16.10).
 */
export const LANDSKAP_TEKST = {
  heading: "Gamle vidder, unge fjorder og strandflaten",
  title:
    "Terrengblokk med havet i vest og innlandet i øst, med to faner for de to modellene. Klassisk modell: et gammelt, lavt og nesten flatt landskap heves mest i vest, elvene graver seg ned i flaten, breene graver ut dalene til U-daler og fjorder, og restene av flaten står igjen som vidder. Langs kysten dannes strandflaten, en lav og flat brem med øyer, holmer og skjær. Annen modell: fjellene har vært høye hele tiden, og istidene sliper ned toppene til en jevn høyde omkring snøgrensen. Under blokken viser et snitt fra vest til øst høyden langs fjorden og havnivået (strandflaten like ved fjorden vist som stiplet linje), og et tidsspor viser når prosessene virket.",
  caption:
    "Etter den klassiske modellen er viddene rester av et gammelt, lavt og nesten flatt landskap som ble hevet mest i vest. Elvene grov seg ned i den gamle flaten, og breene fortsatte arbeidet under istidene. Modellen er omstridt: andre forskere mener at fjellene har vært høye helt siden den kaledonske fjellkjeden ble dannet, og at istidene slipte ned toppene. Langs kysten ligger strandflaten.",
};

export const LANDSKAP_FANER = ["Klassisk modell", "Annen modell"];

/** Kort navn per fase (stegknapper). */
export const KLASSISK_FASER = [
  "Den paleiske flaten",
  "Landet heves",
  "Elvene graver",
  "Breene graver",
  "Strandflaten",
];
export const ANNEN_FASER = ["Høye fjell", "Istidene sliper ned toppene", "Jevn høyde: vidde"];

/**
 * Statustekst per fase, med ordlyd fra md l. 137–147. A5 sier ikke «etterpå» eller «så» (parallelt spor).
 * Høydene for strandflaten (60–70 m over og 30–40 m under havnivå) står i profilen.
 */
export const KLASSISK_STATUS = [
  "Etter den klassiske modellen var landet et gammelt, lavt og nesten flatt landskap: den paleiske flaten. Den ble formet over svært lang tid av elver og forvitring. Modellen er omstridt.",
  "Da Norskehavet åpnet seg for ca. 55 millioner år siden og i tiden etterpå, ble landet hevet mest i vest.",
  "Elvene fikk mer fall og grov seg ned i den gamle flaten. Restene av flaten står igjen høyt over havet: viddene.",
  "Breene fortsatte arbeidet under istidene, de siste 2,6 millioner årene. De grov ut V-dalene til U-daler og fjorder.",
  "Strandflaten, en lav og flat brem med øyer, holmer og skjær, regnes å være dannet gjennom de siste 5–10 millioner årene ved frostforvitring, bølgeerosjon og iserosjon. Nøyaktig hvordan prosessene virket sammen, er fortsatt diskutert.",
];
export const ANNEN_STATUS = [
  "Den klassiske modellen er omstridt. Andre forskere mener at fjellene har vært høye helt siden den kaledonske fjellkjeden ble dannet.",
  "Etter denne modellen slipte istidene ned toppene til en jevn høyde omkring snøgrensen.",
  "Begge modellene forklarer de flate viddene, men på helt ulike måter. Det viser at vi ikke alltid kan lese historien rett ut av landskapet.",
];

/** Tidssporene (skjematisk, ikke i målestokk). `fra`/`til` er andeler av sporet (0 = eldre, 1 = nå). */
export type Spor = {
  navn: string;
  tid: string;
  fra: number;
  til: number;
  faser: number[];
  /** Tones ut mot høyre i stedet for å slutte brått («og i tiden etterpå»). */
  toner?: boolean;
};
export const KLASSISK_SPOR: Spor[] = [
  {
    navn: "Elver og forvitring former den paleiske flaten",
    tid: "svært lang tid",
    fra: 0,
    til: 0.42,
    faser: [1],
  },
  {
    navn: "Landet heves, og elvene graver",
    tid: "for ca. 55 millioner år siden og i tiden etterpå",
    fra: 0.42,
    til: 0.96,
    toner: true,
    faser: [2, 3],
  },
  { navn: "Breene graver", tid: "de siste 2,6 millioner årene", fra: 0.84, til: 1, faser: [4] },
  {
    navn: "Strandflaten dannes",
    tid: "de siste 5–10 millioner årene",
    fra: 0.7,
    til: 1,
    faser: [5],
  },
];
export const ANNEN_SPOR: Spor[] = [
  { navn: "Høye fjell", tid: "helt siden den kaledonske fjellkjeden ble dannet", fra: 0, til: 1, faser: [1] },
  { navn: "Istidene sliper ned toppene", tid: "", fra: 0.84, til: 1, faser: [2] },
  { navn: "Breene graver", tid: "de siste 2,6 millioner årene", fra: 0.84, til: 1, faser: [3] },
  {
    navn: "Strandflaten dannes",
    tid: "de siste 5–10 millioner årene",
    fra: 0.7,
    til: 1,
    faser: [3],
  },
];
