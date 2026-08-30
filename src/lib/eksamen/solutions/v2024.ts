import { mc, write, type Solution } from "../solution-types";

export const v2024Solutions: Record<number, Solution> = {
  1: mc("Stedet merket med trekant har den sterkeste vinden", [
    "Les isobaravstanden. Trekanten står der linjene er tettest. Trykkgradienten — ikke avstanden til senteret — styrer vinden.",
  ], {
    figures: ["pressure-gradient"],
  }),

  2: mc("CO₂, CH₄, H₂O — i den rekkefølgen oppgaven ber om", [
    "CO₂ fjernes over geologisk tid i havet. Ved oksygenfattig nedbryting dannes metan. Av de tre har vanndamp kortest levetid. Alle tre må være rett.",
  ], {
    figures: ["carbon-cycle"],
  }),

  3: mc("A — varmfronten ligger der temperaturkontrasten og den varme sektoren faktisk er", [
    "En varmfront er skillet foran den varme sektoren, ikke en strek tvers gjennom kaldlufta. Legg fronten der T hopper og skyene ligger i et bredt belte foran.",
  ]),

  4: mc("Både a og b er sanne. c og d er usanne.", [
    "Klorofyllkartet viser at produksjonen ikke følger «varmest = mest». Næringsstoffer og oppveling styrer mer enn direkte sol. Derfor er a og b de to som treffer figuren.",
  ], {
    figures: ["chlorophyll"],
  }),

  5: mc("Påstand 1, 4 og 6", [
    "Pilen peker på øyet: nesten vindstille, uten nedbør, og vannstanden rundt øya er høy (stormflo stables inn). Sterk vind, kraftig regn og lav vannstand hører øyeveggen, ikke øyet.",
  ], {
    figures: ["hurricane-eye"],
  }),

  6: mc("A og B", [
    "Overflatestrømmen er sterkest der vinden er sterkest. De to posisjonene ligger i den kraftigste delen av lavtrykket. Svakere vind lenger unna gir svakere Ekman-pådrag.",
  ], {
    figures: ["ekman-surface"],
  }),

  7: mc("H₂O = blå, CO₂ = rød, O₃ med flere = svart", [
    "Match absorpsjonsdalene i spekter A mot grafene i B. Vanndamp har brede IR-bånd, CO₂ har karakteristiske bånd, ozon har flere inkludert UV. Fargene i oppgaven følger den matchingen.",
  ], {
    figures: ["spectrum"],
  }),

  8: mc("Pilen ned fra isen", [
    "Innlandsisen kjøler lufta. Den tette lufta renner nedover mot kysten — katabatisk utstrømning. Pilen som peker ned fra isen er den.",
  ], {
    figures: ["katabatic"],
  }),

  9: mc("Vestlig retning", [
    "Vind fra sør langs vestkysten av Australia (sørlige halvkule). Ekmantransport 90° til venstre for vinden: vestover, bort fra kysten. Det gir oppveling.",
  ], {
    figures: ["ekman-surface"],
    tip: "NH: 90° til høyre. SH: 90° til venstre. Tegn vinden først, så dreiningen.",
  }),

  10: mc("A og D", [
    "Overflatevann ved ekvator er lett fordi det er varmt og har lav salinitet (mye nedbør i ITCZ). De to merkene som ligger der, er A og D.",
  ], {
    figures: ["thermohaline", "hadley"],
  }),

  11: mc("1 og 3", [
    "Termohalin sirkulasjon transporterer energi. Dypvann dannes når vannet blir kaldere og/eller saltere. Mindre fordamping driver ikke overflatestrømmene. Ferskvann svekker, ikke øker, den termohaline transporten.",
  ], {
    figures: ["amoc-nadw", "thermohaline"],
  }),

  12: mc("lavtrykk · litt nord eller sør for ekvator · vanndamp · stormflo · i Mexicogolfen · avta", [
    "Orkaner er lavtrykk. De dannes noen grader unna ekvator (coriolis ≠ 0). Motoren er vanndamp/latent varme. Flest dødsfall: stormflo. Mexicogolfen er et klassisk basseng. Over land eller kaldt vann avtar de. Fem eller seks rett ga poeng.",
  ], {
    figures: ["hurricane-sst", "hurricane-eye"],
  }),

  13: mc("Kan føre til positivt strålingspådriv", [
    "Mindre havis senker albedo og øker absorbert sol. Positivt pådriv = jorda tar til seg mer energi. Det er is-albedo-løkken.",
  ], {
    figures: ["ice-albedo"],
  }),

  14: mc("Permafrosten på Jansonhaugen har blitt svekket", [
    "Nullgradersisotermen flytter seg slik figuren viser dypere tining / slakere gradient. Det er ikke tynnere aktivt lag og ikke «dypere permafrost».",
  ]),

  15: mc("På den sørøstlige siden", [
    "Øya ligger på 20–25°S i passaten. Fuktig sørøstpassat tvinges opp på losiden. Lesiden ligger i regnskygge. Derfor sørøst = våt.",
  ], {
    figures: ["foehn", "hadley"],
  }),

  16: mc("Moderat nedbør, kraftig vind og stigende temperatur før skredet", [
    "Nysnø pluss vindtransport og mildvær: snøen lastes på lesider og blir våt og ustabil. Fallende temperatur og lite vind er motsatt situasjon.",
  ]),

  17: mc("Diagrammet øverst til venstre", [
    "Innlandsklima: stor årlig temperaturamplitude og ofte et tydelig sommernedbørsmønster. Det flate, maritime diagrammet er kyst.",
  ], {
    figures: ["inland-climate"],
  }),

  18: mc("Påstand 2, 4 og 6", [
    "Vulkaner, Maunder-minimum og negativ NAO. Platetektonikk og Milanković er feil tidsskala for den lille istiden. La Niña alene holder ikke 300 år.",
  ], {
    figures: ["nao", "paleo-proxy"],
  }),

  19: mc("A, D og E", [
    "Mildt sørvest der jetten ligger over/nærmest, kaldt i nordøst bak den kalde siden, og fukt i midtre Norge under jetens nedbørsbelte. Les fargene mot Norge.",
  ], {
    figures: ["jet-blocking"],
  }),

  20: mc("Hendelse 1, 2 og 3", [
    "El Niño: tørke i Indonesia 1997–98, flom i Paraguay/Uruguay/Argentina 2010, flom i Øst-Afrika 2019. Europa-flommen 2021 og Peru-tørke 2022 er ikke de klassiske El Niño-koblingene Udir teller her.",
  ], {
    figures: ["el-nino"],
  }),

  21: write("Bruk alle fire kildene. Forklar temperatur mot midnatt med frontenes fart.", [
    "a) Analysekart, satellitt, observasjon og radar sammen: temperatur, vind, nedbør og skydekke på Blindern kl. 09. Forklar, ikke bare beskriv.",
    "b) Temperatur mot midnatt: mulig varmfront hever temperaturen; kaldfronten kan rekke å passere og senke den igjen. At kaldfronter går fortere enn varmfronter er nok — beregning er bonus.",
    "c) Nedbør følger frontene: jevn nedbør ved varmfront, byger bak kaldfront. Usikkerhet belønnes.",
  ], {
    steps: [
      "Lag en liten tabell: parameter — kilde — verdi/tegn.",
      "Tegn frontene og anslå om kaldfronten rekker Blindern.",
      "Skill det du leser av data fra det du antar.",
    ],
  }),

  22: write("Opplasting (kategori 3): drøft fornybar energi mot norsk geografi. Ikke ett «beste» uten forbehold.", [
    "Tidevann, bølge, havvind, havvarme, sol — hver har forutsigbarhet, areal og miljøkostnad. Oppgi kilder. 22c var lavt vektet i sensuren fordi formuleringen traff læreplanen dårlig.",
  ], {
    steps: [
      "Velg minst tre teknologier.",
      "For hver: ressurs (hvor i Norge), forutsigbarhet, konflikt (fiskeri, natur, landskap).",
      "Konkluder med avveining, ikke kåring.",
    ],
  }),
};
