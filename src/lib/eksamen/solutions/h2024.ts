import { mc, write, type Solution } from "../solution-types";

export const h2024Solutions: Record<number, Solution> = {
  1: mc("Farevarselet som matcher kartet med tette isobarer og samme vindretning", [
    "Sterk vind varsles der trykkgradienten er stor. Klikk kartet der linjene er tettest og pilene peker samme vei som varslet. Det slake trykkfeltet er feil treff.",
  ], {
    official: false,
    figures: ["pressure-gradient"],
  }),

  2: mc("Påstand 1 er sann. Påstand 2 er usann (skal være høyre i nord).", [
    "Coriolis bøyer til høyre på nordlig halvkule og til venstre på sørlig — for både luft og hav. Les resten av påstandene mot den ene regelen. Ikke bytt om halvkulene.",
  ], {
    official: false,
    figures: ["coriolis-deflect"],
  }),

  3: mc("Klikk midt i spiralen — det rolige øyet / kommakommen", [
    "Lavtrykkssenter: skyene spinner mot urviseren på NH, og det er ofte et roligere øye. Fronten er ikke senteret. Marker der rotasjonen lukker seg.",
  ], {
    official: false,
    figures: ["wind-low-center"],
  }),

  4: mc("De to dyp-forklaringene: kaldt, svak sjiktning, god blanding", [
    "Under ~500 m varierer tettheten lite fordi vannet er kaldt, sjiktningen er svak og blandingen er god. Overflaten sjiktes av varme og ferskvann. Marker dypet, ikke overflateforklaringene.",
  ], {
    official: false,
    figures: ["thermohaline"],
  }),

  5: mc("Sann: mer nedbør langs ITCZ enn langs polarfronten", [
    "ITCZ er det store, våte beltet nær ekvator der Hadley-cellene møtes. Polarfronten er et smalere nedbørsbelte på midlere bredder. Påstanden om mer nedbør langs ITCZ er sann.",
  ], {
    official: false,
    figures: ["hadley"],
  }),

  6: mc("Senteret er et lavtrykk (L) — rotasjon med urviseren på SH", [
    "På sørlige halvkule spinner lavtrykk med urviseren. Videoen viser trykksenteret i midten. Luft inn + med urviseren = L på SH.",
  ], {
    official: false,
    figures: ["wind-low-sh", "coriolis-deflect"],
  }),

  7: mc("Boksen over det klareste, tynneste skydekket / den tropiske luftmassen", [
    "Høyest overflatetemperatur der skydekket er tynnest og innstrålingen størst, eller der luftmassen er tropisk. Den tykke fronten skygger og kjøler toppen.",
  ], {
    official: false,
  }),

  8: mc("Påstand 2, 3 og 6", [
    "Tidevann er forutsigbart (astro), fremdeles ganske dyrt, og det påvirker flora og fauna i fjord/estuarium. Ikke «ustabil» og ikke «billig og ferdig utviklet».",
  ], {
    official: false,
  }),

  10: mc("Påstand 1 og 2: ekvator netto pluss, polene netto minus", [
    "Ekvator mottar mer stråling enn den sender ut. Polene sender ut mer enn de mottar. Forskjellen drives som varmetransport mot polene i luft og hav.",
  ], {
    official: false,
    figures: ["radiation-balance", "hadley"],
  }),

  13: mc("Havnivået er koblet til tregere prosesser enn atmosfæren", [
    "Havet tar mer enn 90 % av ekstraenergien, men havnivået reagerer tregt: termisk utvidelse og issmelting tar tiår–århundrer. Atmosfæren har lav varmekapasitet og varmes raskere.",
  ], {
    official: false,
  }),

  17: mc("Åttedobling — E ∝ v³", [
    "Vindenergi i en turbin skalerer med hastigheten i tredje potens. Dobbelt så høy vind (5 → 10 m/s) gir 2³ = 8 ganger så mye energi.",
  ], {
    official: false,
    tip: "Skriv 2³ = 8. Ikke 2² og ikke «dobbelt så mye».",
  }),

  20: write("a) Si hva kjernen utenfor LGM-isranden faktisk kan vise. b) Les proxyene mot sjøisklassene.", [
    "Like utenfor LGM-isranden: når isen sto der, smeltevann, sjøis og produktivitet. Bruk proxyer og planktonmarkører. Si hva hver figurtype måler — ikke gjett på farger uten skala.",
  ], {
    official: false,
    steps: [
      "Nevn minst to proxyer og tidsskalaen deres.",
      "Koble hver proxy til is, smeltevann eller produktivitet.",
      "I b: les figur 3 mot klassene, siter skalaen.",
    ],
    figures: ["paleo-proxy"],
  }),

  21: write("Skill katabatisk og føhn. Deretter klima, jet og skred.", [
    "a) Katabatisk = kald fallvind; føn = varm, tørr leside etter orografisk heving. Du kjenner dem på temperatur og fukt, ikke bare retning.",
    "b) Varmere klima: mer vanndamp, høyere skynivå, ofte mer ekstremnedbør på losiden.",
    "c) Mindre arktisk is → svakere temperaturgradient → jet og stormbane kan ligge lenger nord.",
    "d) Fønvind + mildvær på lesiden av Jostedalsbreen øker skredfare der snøen blir våt og vinden laster lesider.",
  ], {
    official: false,
    figures: ["katabatic", "jet-blocking"],
  }),
};
