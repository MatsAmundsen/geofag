import type { QuizQuestion } from "@/components/quiz";

/** Sjekk deg selv og sluttquiz for Pakke B. Hvert spørsmål har tre svaralternativer. */

export const QUIZ_SJEKK_SKYER_1: QuizQuestion[] = [
  {
    prompt: "Hva er duggpunktet?",
    options: [
      "Temperaturen der vann fryser til is.",
      "Temperaturen lufta må kjøles ned til for å bli mettet, ved uendret trykk og innhold av vanndamp.",
      "Det høyeste trykket lufta kan ha før det dannes dugg.",
    ],
    answer: 1,
    explain:
      "Duggpunktet er temperaturen der lufta blir mettet. Under den går damp som regel over til væske, og det dannes tåke, dis eller skyer.",
  },
  {
    prompt: "Lufttemperaturen er 20 °C og duggpunktet er 14 °C. Omtrent hvor høyt over bakken ligger skybunnen etter tommelregelen på 125 m per grad?",
    options: ["Omtrent 250 m", "Omtrent 750 m", "Omtrent 2 500 m"],
    answer: 1,
    explain:
      "Forskjellen er 6 grader. 6 · 125 m = 750 m. Regelen er en tilnærming.",
  },
  {
    prompt: "Hvorfor sier relativ fuktighet lite om hvor mye vanndamp lufta faktisk inneholder?",
    options: [
      "Fordi den måles i prosent, og prosent kan ikke brukes til damp.",
      "Fordi den er forholdet til det høyeste mulige innholdet, og det avhenger av temperaturen.",
      "Fordi den bare gjelder over havet.",
    ],
    answer: 1,
    explain:
      "Varm luft kan romme mye mer damp enn kald luft. Det høyeste innholdet halveres omtrent for hver 10 °C. Derfor bruker meteorologene duggpunkt.",
  },
];

export const QUIZ_SJEKK_SKYER_2: QuizQuestion[] = [
  {
    prompt: "Hva er en kondensasjonskjerne?",
    options: [
      "En liten partikkel, for eksempel støv, sot eller pollen, som vanndamp kondenserer på.",
      "Midten av en tordensky.",
      "Et område der lufta er overmettet.",
    ],
    answer: 0,
    explain: "Vanndamp kondenserer lettest på små partikler. Uten partikler blir det vanskelig å danne skydråper.",
  },
  {
    prompt: "Hva er en underkjølt vanndråpe?",
    options: [
      "En dråpe som har fryst til is.",
      "En flytende dråpe ved temperatur under 0 °C.",
      "En dråpe som er kaldere enn lufta rundt.",
    ],
    answer: 1,
    explain: "Underkjølte dråper er vanlige i skyer ned til omtrent −15 °C.",
  },
  {
    prompt: "Hvilke av disse er lave skyer?",
    options: [
      "Fjærskyer (Ci) og slørskyer (Cs).",
      "Rukleskyer (Ac) og lagskyer (As).",
      "Bukleskyer (Sc) og haugskyer (Cu).",
    ],
    answer: 2,
    explain: "Lave skyer er Sc, St, Cu og Cb. Høye er Ci, Cc og Cs. Middels høye er Ac, As og Ns.",
  },
];

export const QUIZ_SJEKK_SKYER_3: QuizQuestion[] = [
  {
    prompt: "Hva skiller orografisk nedbør fra de andre typene?",
    options: [
      "Lufta løftes fordi den tvinges opp langs en fjellside.",
      "Lufta løftes fordi sola varmer bakken.",
      "Lufta løftes fordi den glir opp over kaldere luft.",
    ],
    answer: 0,
    explain:
      "Orografisk betyr knyttet til fjell. Konveksjon er stigning på grunn av oppvarming, og frontal nedbør kommer der varm luft glir opp over kaldere luft.",
  },
  {
    prompt: "Hvilken nedbørtype har kraftigst opptrekk?",
    options: [
      "Konvektiv nedbør, med 1–10 m/s.",
      "Frontal nedbør, med 1–10 m/s.",
      "Orografisk nedbør, med 10–100 m/s.",
    ],
    answer: 0,
    explain: "Konvektive bygeskyer har opptrekk på 1–10 m/s. Frontal og orografisk løfting gir omtrent 0,1–1,0 m/s.",
  },
  {
    prompt: "Hvor mange liter vann tilsvarer 1 mm nedbør på en kvadratmeter?",
    options: ["0,1 liter", "1 liter", "10 liter"],
    answer: 1,
    explain: "1 mm nedbør tilsvarer 1 liter per kvadratmeter.",
  },
];

export const QUIZ_SJEKK_SKYER_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor har Bergen en mindre forskjell mellom varmeste og kaldeste måned enn Nesbyen?",
    options: [
      "Fordi havet tar opp og avgir varme langsommere enn land.",
      "Fordi Bergen ligger lenger sør.",
      "Fordi det regner mindre i Bergen.",
    ],
    answer: 0,
    explain:
      "Kystklimaet er mildere fordi havet jevner ut temperaturen. Bergen og Nesbyen ligger omtrent på samme breddegrad, og det regner mye mer i Bergen enn i Nesbyen.",
  },
  {
    prompt: "Hva viser et klimadiagram?",
    options: [
      "Månedlig middeltemperatur som kurve og månedlig nedbør som søyler.",
      "Daglig temperatur gjennom ett år.",
      "Lufttrykket gjennom et døgn.",
    ],
    answer: 0,
    explain: "Diagrammet bygger på normalverdier over 30 år og viser årstidene på ett sted.",
  },
  {
    prompt: "Hvilken normalperiode brukes som standard i Norge fra 2021?",
    options: ["1931–1960", "1961–1990", "1991–2020"],
    answer: 2,
    explain: "Fra 1. januar 2021 erstatter 1991–2020 perioden 1961–1990.",
  },
];

export const QUIZ_SJEKK_SKYER_5: QuizQuestion[] = [
  {
    prompt: "Hva kjennetegner sone E i Köppens system?",
    options: [
      "Kaldeste måned er under −3 °C.",
      "Varmeste måned er under +10 °C.",
      "Middeltemperaturen er minst 18 °C i alle måneder.",
    ],
    answer: 1,
    explain: "E er polart klima. A har minst 18 °C i alle måneder, og D har kaldeste måned under −3 °C og varmeste minst +10 °C.",
  },
  {
    prompt: "Bergen har kaldeste måned 2,3 °C, varmeste måned 15,6 °C og fem måneder med minst 10 °C. Hva blir klassen?",
    options: ["Cfb", "Dfc", "ET"],
    answer: 0,
    explain: "Kaldeste måned over −3 °C gir C. Fuktig hele året gir f. Varmeste måned under 22 °C og minst fire måneder med minst 10 °C gir b.",
  },
  {
    prompt: "Hva har skjedd med Köppen-kartet for Norge mellom 1961–90 og 1991–2020?",
    options: [
      "Det polare klimaet er sterkt redusert, og det varmtemperte har økt i Sør-Norge.",
      "Det polare klimaet har økt.",
      "Ingenting, kartene er like.",
    ],
    answer: 0,
    explain: "Det viser Meteorologisk institutts Köppen-kart for de to normalperiodene.",
  },
];

export const QUIZ_SKYER: QuizQuestion[] = [
  {
    prompt: "Hva skjer med lufta når den stiger?",
    options: [
      "Den utvider seg og kjøles ned, og kan bli mettet.",
      "Den trekker seg sammen og varmes opp.",
      "Den beholder samme temperatur.",
    ],
    answer: 0,
    explain: "Lavere trykk i høyden gjør at lufta utvider seg og kjøles. Blir den mettet, dannes skyer.",
  },
  {
    prompt: "Hvilken gruppe er knyttet til bygeskyer, altså konveksjon?",
    options: ["Cb", "Ci", "St"],
    answer: 0,
    explain: "Bygeskyer (Cb) dannes ved konveksjon og gir byger.",
  },
  {
    prompt: "Hva skjer på lesiden av et fjell når lufta har gitt fra seg nedbør på luvsiden?",
    options: [
      "Lufta er tørrere.",
      "Lufta er fuktigere.",
      "Det er alltid tåke.",
    ],
    answer: 0,
    explain: "Orografisk nedbør faller på luvsiden, og lufta på lesiden er tørrere.",
  },
  {
    prompt: "Hva er en urban varmeøy?",
    options: [
      "En by der temperaturen som regel er høyere enn i omgivelsene på landet.",
      "En øy i havet med varmt klima.",
      "En by som ligger høyt over havet.",
    ],
    answer: 0,
    explain: "Overflater i byen tar opp og holder på varme annerledes enn omgivelsene. Vegetasjon virker kjølende.",
  },
  {
    prompt: "Hva er nødvendig for at et sted skal få klassen D i Köppens system, ifølge Store norske leksikon?",
    options: [
      "Kaldeste måned under −3 °C og varmeste måned minst +10 °C.",
      "Alle måneder under 0 °C.",
      "Årsnedbør over 2 000 mm.",
    ],
    answer: 0,
    explain: "Det gir kaldtemperert klima. Grensen mot C varierer mellom kilder, så sjekk alltid hvilken grense et kart bruker.",
  },
];
