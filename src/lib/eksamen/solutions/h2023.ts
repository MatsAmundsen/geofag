import { mc, write, type Solution } from "../solution-types";

export const h2023Solutions: Record<number, Solution> = {
  1: mc("Havet utgjør en enda større del av jordoverflaten", [
    "Lavere albedo kommer først og fremst av at is og snø viker for mørkere hav og land. Flere hvite skyer øker albedo. Is-albedo er en positiv, ikke negativ, tilbakekobling. Permafrost-tining er først et karbonspørsmål, ikke albedo.",
  ], {
    official: false,
    figures: ["ice-albedo"],
  }),

  2: mc("Endring i trykk med høyde", [
    "Luftas tetthet styres mest av trykket, som faller raskt med høyden. Temperatur og fuktighet betyr også noe, men trykkendringen med høyde er den store gradienten. Derfor er fjelluft «tynn».",
  ], {
    official: false,
  }),

  3: mc("Mer ozon i stratosfæren (ca. 30–45 km) etter Montreal-protokollen", [
    "Positiv ozonutvikling der oppe er restitusjon av ozonlaget. Ikke forveksle med bakkenært ozon, som er forurensning. Velg påstanden som sier mer ozon i det høydeintervallet.",
  ], {
    official: false,
    figures: ["convection"],
  }),

  4: mc("Klare netter taper mer IR til verdensrommet", [
    "Bakken stråler langbølge ut. Skyer absorberer og emitterer IR tilbake, så nettotapet blir mindre. Derfor er overskyede netter mildere og klare netter kaldest.",
  ], {
    official: false,
    figures: ["radiation-balance"],
  }),

  5: mc("Der sør og innland med lite sky gir mest Wh/m² over året", [
    "Årlig solinnstråling i Norge er størst i sør og innland med lite sky, ikke nødvendigvis på kysten. Klikk der juli- og januar-kartet sammen gir mest energi.",
  ], {
    official: false,
    figures: ["inland-climate"],
  }),

  6: mc("Familien klarer seg ikke på 25 m² alene — rundt 1 100–1 500 kWh/år", [
    "800 Wh/m² per dag × 365 × 25 m² = 7 300 kWh/år før virkningsgrad. Solceller tar typisk 15–20 %, altså rundt 1 100–1 500 kWh — langt under 16 000 kWh.",
  ], {
    official: false,
    tip: "Skriv regnestykket i to steg: innstråling, så virkningsgrad. Ikke glem prosenten.",
    steps: [
      "800 × 365 × 25 = 7 300 000 Wh = 7 300 kWh.",
      "Ta 15–20 %: ca. 1,1–1,5 MWh.",
      "Sammenlign med 16 000 kWh og konkluder.",
    ],
  }),

  7: mc("Tidevannskraft: høydeforskjell flo/fjære og bevegelsesenergi i strømmen", [
    "To deler: potensiell energi i høydeforskjellen og kinetisk energi i strømmen gjennom et sund. Ikke bølgekraft og ikke termisk energi i havet.",
  ], {
    official: false,
  }),

  8: mc("Havnivå stiger ikke jevnt — les fargeskalaen; hvit linje er nullendring", [
    "Vind, strøm og gravitasjon (smeltende iskapper) gir regionalt fall noen steder. Et globalt gjennomsnitt skjuler det. Marker der skalaen faktisk viser fall eller minst stigning.",
  ], {
    official: false,
  }),

  9: write("Les oppgaven og figuren. Bruk enhetene. Ikke gjett på farger uten skala.", [
    "Dette er en figurlesingsoppgave. Skriv hva aksen og fargen betyr, så svaret. En påstand uten dekning i data er usann selv om den høres geofaglig ut.",
  ], {
    official: false,
  }),

  10: mc("Havbunnssediment og bergarter/fossiler", [
    "To millioner år i Norge: iskjerner, pollen, treringer og historiske kilder rekker ikke så langt her. Havbunn og bergarter gjør det.",
  ], {
    official: false,
    figures: ["paleo-proxy"],
  }),

  11: write("Følg instruksen. Koble prosess til figur, ikke til et ferdig memorert kart.", [
    "Les hva du skal markere. Finn prosessen i figuren. Marker der den faktisk skjer.",
  ], {
    official: false,
  }),

  12: write("Les aksene først, så påstanden.", [
    "Samme metode som 11: akse, enhet, så sann/usann. Ikke ta med en husket graf fra et annet sett.",
  ], {
    official: false,
  }),

  13: mc("Tjukk is, liten flyt, isskille / høyt platå — indre Grønland, ikke kysten", [
    "Beste iskjernested: isen skal være tykk, ligge stille og ha årlige lag som ikke er foldet. Isstrøm og kyst er dårlige arkiv.",
  ], {
    official: false,
    figures: ["paleo-proxy"],
  }),

  14: write("Skill flytretning fra mektighet.", [
    "Fortsett å lese kart og profiler. Piler er bevegelse. Farger eller konturer er tykkelse. Ikke bytt dem om.",
  ], {
    official: false,
  }),

  15: write("Når oppgaven ber om flere kryss, er det ofte to riktige. Ikke marker alle.", [
    "Les «hvilke» versus «hvilken». To riktige er vanlig. Alle krysset er nesten alltid feil.",
  ], {
    official: false,
  }),

  16: mc("Iskjerne og sediment for det lange. Termometer for det korte.", [
    "Paleoklima mot instrumentell tid: arkivene dekker årtusener, termometeret dekker et øyeblikk. Bruk dem til det de kan.",
  ], {
    official: false,
    figures: ["paleo-proxy"],
  }),

  17: mc("Katabatisk vind: kald, tett luft som renner ned av tyngdekraften", [
    "Typisk fra innlandsis mot kysten. Ikke monsun og ikke lavtrykksvind. Du kjenner den på at den er kald og faller.",
  ], {
    official: false,
    figures: ["katabatic"],
  }),

  18: write("Ett alternativ er presist. De andre blander fenomener.", [
    "Sjekk definisjonen mot læreboka og temasidene. Kryss det som beskriver én prosess, ikke en blanding av to.",
  ], {
    official: false,
  }),

  19: write("Bruk figuren. En påstand uten dekning i data er usann.", [
    "Pek på aksen. Si tallet. Så vurder påstanden. Geofaglig klang er ikke evidens.",
  ], {
    official: false,
  }),

  20: write("Siste interaktive i kategorien: ofte et kartvalg. Marker der prosessen faktisk skjer.", [
    "Ikke midt i bildet av gammel vane. Finn prosessen, så punktet.",
  ], {
    official: false,
  }),

  21: write("Fem figurer om varmeutveksling hav–atmosfære.", [
    "a) Hvor havet avgir varme til lufta — typisk Golfstrømmen/NAC om vinteren. b) Atmosfæren over det varme vannet blir mildere og fuktigere. c) Konsekvens for klima i Nord-Europa: milde vintre på 60°N. Les alle delene før du skriver.",
  ], {
    official: false,
    steps: [
      "Finn området med størst varmetap fra hav til luft.",
      "Beskriv hva det gjør med luftmassen.",
      "Knytt det til norsk vinterklima — og til at det ikke er «Golfstrømmen utenfor Florida».",
    ],
    figures: ["gulf-nac", "amoc-nadw"],
  }),

  22: write("Permafrost, metan, indikator og kilder — hold de fire fra hverandre.", [
    "a) Permafrost: temperatur, snø, vegetasjon, vann, eksponering. b) Metan er en sterk, kortlevd drivhusgass — stort strålingspådriv per kilo. c) Permafrostgrensa flytter seg med klima og er derfor indikator. d) Naturlige kilder (våtmark, hydrater) versus menneske. Ikke slå dem sammen.",
  ], {
    official: false,
    figures: ["carbon-cycle", "ice-albedo"],
  }),
};
