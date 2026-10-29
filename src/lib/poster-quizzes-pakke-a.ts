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

// ── Å regne med energi (N1) ───────────────────────────────────────────────

export const QUIZ_SJEKK_ENERGI_REGNING_1: QuizQuestion[] = [
  {
    prompt: "En varmeovn på 2 kW går i 12 timer. Hvor mye energi bruker den?",
    options: ["24 kWh", "2 kWh", "6 kWh", "14 kWh"],
    answer: 0,
    explain: "Energi = effekt × tid = 2 kW × 12 h = 24 kWh (Store norske leksikon).",
  },
  {
    prompt: "Et kraftverk på 20 MW produserer 60 GWh på ett år. Hva er brukstiden?",
    options: ["3000 timer", "300 timer", "1200 timer"],
    answer: 0,
    explain: "60 GWh = 60 000 MWh, og 60 000 ÷ 20 = 3000 timer. Kapasitetsfaktoren er 3000 ÷ 8760 = 34,2 prosent.",
  },
  {
    prompt: "Hva er 3,6 megajoule i en enhet vi bruker for strøm?",
    options: ["1 kilowattime", "1 megawattime", "1 watt"],
    answer: 0,
    explain: "1 kWh = 1000 Wh = 3 600 000 Ws = 3,6 MJ (Store norske leksikon).",
  },
];

export const QUIZ_SJEKK_ENERGI_REGNING_2: QuizQuestion[] = [
  {
    prompt: "Hva menes med at i overkant av 75 prosent av produksjonskapasiteten i Norge er regulerbar?",
    options: [
      "Produsentene kan endre produksjonen etter markedsforholdene, blant annet med vannmagasiner",
      "Tre fjerdedeler av strømmen kommer fra vindkraft",
      "Tre fjerdedeler av kraftverkene kan slås av av Statnett uten at det koster noe",
    ],
    answer: 0,
    explain: "Regulerbarhet er evnen til å endre produksjonen etter markedet. Vind og sol må produsere når energien er tilgjengelig (Energifakta Norge).",
  },
  {
    prompt: "Hvorfor kan prisen på strøm være ulik i NO2 og NO4 samtidig?",
    options: [
      "Fordi det kan oppstå flaskehalser i nettet mellom områdene",
      "Fordi prisen settes av hver enkelt strømkunde",
      "Fordi bare NO2 er koblet til utlandet",
    ],
    answer: 0,
    explain: "Prisen settes for hvert budområde ut fra bud og overføringskapasitet. Er kapasiteten for liten, blir prisene ulike (Statnett).",
  },
];

/** Tilleggsspørsmål i «Test deg selv» for Å regne med energi. */
export const QUIZ_ENERGI_REGNING: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på MW og MWh?",
    options: [
      "MW er effekt, MWh er energi",
      "MW er energi, MWh er effekt",
      "Begge er enheter for energi",
    ],
    answer: 0,
    explain: "Effekt sier hvor raskt energi brukes eller produseres. Energi = effekt × tid, så MWh = MW × timer.",
  },
  {
    prompt: "Fosen Vind har en årsproduksjon på 3,4 TWh. Hvor mange kilowattimer er det?",
    options: ["3,4 milliarder kWh", "3,4 millioner kWh", "3,4 tusen kWh"],
    answer: 0,
    explain: "1 TWh = 1 000 000 000 kWh, så 3,4 TWh = 3 400 000 000 kWh.",
  },
  {
    prompt: "Fosen Vind har 1057 MW installert og 3,4 TWh i årsproduksjon. Hva er kapasitetsfaktoren?",
    options: ["Cirka 37 prosent", "Cirka 3,7 prosent", "Cirka 90 prosent"],
    answer: 0,
    explain: "3 400 000 MWh ÷ 1057 MW = 3217 timer, og 3217 ÷ 8760 = 36,7 prosent.",
  },
  {
    prompt: "Furuseth solkraftverk har 7 MWp og forventer 6,4 GWh i året. Hva er brukstiden?",
    options: ["Cirka 914 timer", "Cirka 9140 timer", "Cirka 91 timer"],
    answer: 0,
    explain: "6400 MWh ÷ 7 MW = 914 timer. Det er mye lavere enn vindkraftens 3217 timer ved Fosen.",
  },
  {
    prompt: "Hywind Tampen har 11 turbiner på 8,6 MW. Hvor mye energi gir parken hvis den yter full effekt i ett døgn?",
    options: ["Cirka 2270 MWh", "Cirka 94,6 MWh", "Cirka 22,7 GWh"],
    answer: 0,
    explain: "11 × 8,6 MW = 94,6 MW, og 94,6 MW × 24 h = 2270,4 MWh. Det er et regnestykke ved full effekt, ikke en opplyst produksjon.",
  },
  {
    prompt: "Hva er den høyeste brukstiden et anlegg kan ha på ett år?",
    options: ["8760 timer", "1000 timer", "Det finnes ingen grense"],
    answer: 0,
    explain: "Et år har 8760 timer, og full effekt hele året gir kapasitetsfaktor 100 prosent (Store norske leksikon).",
  },
  {
    prompt: "Hva tilsvarer 1000 Sm³ gass?",
    options: ["1,0 Sm³ o.e.", "1000 Sm³ o.e.", "0,001 Sm³ o.e."],
    answer: 0,
    explain: "Sokkeldirektoratet regner 1000 Sm³ gass som 1,0 Sm³ oljeekvivalent.",
  },
  {
    prompt: "Hvilken kraftproduksjon er ikke regulerbar?",
    options: ["Vindkraft", "Vannkraft med stort magasin", "Blåsjø"],
    answer: 0,
    explain: "Vind og sol må produsere når energien er tilgjengelig. Magasinkraftverk kan holde vann tilbake (Energifakta Norge).",
  },
  {
    prompt: "Hvilket budområde er NO5?",
    options: ["Vestlandet", "Østlandet", "Nord-Norge"],
    answer: 0,
    explain: "NO1 Østlandet, NO2 Sørvest-Norge, NO3 Midt-Norge, NO4 Nord-Norge og NO5 Vestlandet (Statnett).",
  },
];

export const SJEKK_PAKKE_A: Record<string, QuizQuestion[]> = {
  Energi3: QUIZ_SJEKK_ENERGI_3,
  Energi4: QUIZ_SJEKK_ENERGI_4,
  EnergiRegning1: QUIZ_SJEKK_ENERGI_REGNING_1,
  EnergiRegning2: QUIZ_SJEKK_ENERGI_REGNING_2,
};

export const SAMMENDRAG_PAKKE_A: Record<string, readonly string[]> = {
  EnergiRegning: [
    "Effekt (W) sier hvor raskt energi brukes eller produseres. Energi (J, Wh, kWh) er effekt × tid. 1 kWh = 3,6 MJ, og hvert prefiks i rekken k, M, G, T er 1000 ganger større.",
    "Brukstid er årsproduksjon ÷ installert effekt, høyst 8760 timer. Kapasitetsfaktoren er brukstiden ÷ 8760, i prosent.",
    "Fosen Vind: 3,4 TWh ÷ 1057 MW = 3217 timer, 36,7 prosent. Furuseth solkraftverk: 6,4 GWh ÷ 7 MWp = 914 timer, 10,4 prosent. Vind gir flere brukstimer enn sol i Norge.",
    "Sm³ o.e. er en samleenhet for olje, gass, kondensat og NGL: 1000 Sm³ gass = 1,0 Sm³ o.e. 1 Sm³ olje har cirka 35 500 MJ, om lag 9860 kWh.",
    "Norge hadde 40 334 MW installert og cirka 157 TWh normalårsproduksjon ved inngangen til 2025. Vannkraft er ryggraden, og i overkant av 75 prosent av produksjonskapasiteten er regulerbar.",
    "Magasinene lagrer over 87 TWh og gir balansekraft. Prisen settes per budområde, NO1 til NO5, og flaskehalser i nettet gir ulike priser.",
  ],
};
