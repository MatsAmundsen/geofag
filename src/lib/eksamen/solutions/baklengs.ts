import { mc, write, type Solution } from "../solution-types";

export const baklengsSolutions: Record<number, Solution> = {
  1: mc("B  Fra nordøst.", [
    "På nordlig halvkule strømmer luft inn mot L mot klokken. Når senteret treffer Vestlandet, ligger Nordland nordøst for L. Innstrømningen der kommer fra nordøst mot senteret.",
    "Sørvest er typisk på sørsiden av et atlantisk lavtrykk, ikke i nordøstkvadranten. Les isobarene, ikke «det blåser alltid påland».",
  ], {
    official: false,
    figures: ["wind-low-nh"],
    whyNot: [
      { option: "A", text: "Sørvest passer sør for L, der vestavinden mates inn i varm sektor." },
      { option: "C", text: "Sørøst er mer bakkekonvergens øst for senteret på vei inn, ikke Nordland i denne geometrien." },
      { option: "D", text: "Nordvest kan komme bak kaldfronten sørvest for L, ikke ved X." },
    ],
    tip: "Kapittel: værkart og Coriolis. Samme logikk som Vår 2026 oppgave 1.",
  }),

  2: mc("B  Bare 2.", [
    "Påstand 1 er bakvendt. Okklusjon er at kaldfronten tar igjen varmfronten. Varm sektor er stadiet før okklusjon, når begge frontene er skilt og varm luft ligger mellom dem.",
    "Påstand 2 er sjøbris: land varmes raskere, luft stiger over land, og kjøligere luft trekkes inn fra sjøen om ettermiddagen.",
  ], {
    official: false,
    figures: ["land-sea-breeze", "front-rain"],
    tip: "Kapittel: lokale værsystemer. Polarfrontens fem stadier ligger der, ikke i værkart-alene.",
  }),

  3: mc("A  er grensen mellom akkumulasjon oppe og ablasjon nede i samme år.", [
    "ELA er likevektslinjen på breen i det aktuelle budsjettåret. Over den vinner snøen. Under den tapes is. Flytter ELA oppover, krymper akkumulasjonsområdet.",
    "Weichsel-grensen er paleogeografi. Permafrost og havis er andre deler av kryosfæren.",
  ], {
    official: false,
    figures: ["ice-albedo"],
    tip: "Kapittel: kryosfæren. Istidene eier Weichsel. Denne siden eier året.",
  }),

  4: mc("A  Et ensemble er mange kjøringer med litt ulike startvilkår.", [
    "Kaos i startfeltet gir spredning. Tett bunt tidlig, sprik senere. Andelen medlemmer over en terskel er en sannsynlighet, ikke en garantikurve.",
    "Parametrisering er forenklet fysikk for prosesser mindre enn gridet — skyer, konveksjon, turbulens. Den er fysikk, ikke gjetting.",
  ], {
    official: false,
    tip: "Kapittel: numeriske modeller. Vår 2026 tester dette lite. Derfor ligger det her.",
  }),

  5: mc("B  Intensiteten i enkeltshendelser kan øke mer enn middelnedbøren.", [
    "7 % per grad er kapasitet, ikke et jevnt påslag på årsnormalen. Når en atmosfærisk elv tvinges opp Langfjella, tømmes mer vann på kort tid.",
    "Oslofjorden når ikke 26,5 °C til 50 m. Tropiske orkaner fødes ikke der.",
  ], {
    official: false,
    figures: ["atmo-river", "orographic-rain"],
    tip: "Kapittel: værkatastrofer. Gyda i Vår 2026 oppgave 6 er samme fysikk.",
  }),

  6: write("Ett kutt (nasjonalt/globalt pådriv) og ett lokalt tiltak (molo, hevet kote, flytting). Si hvem som betaler, og at tilpasning ikke fjerner havnivåstigningen.", [
    "Stormflo er springflo + invers barometer + vindstuv. Tilpasning endrer sårbarhet og eksponering. Kutt endrer pådrivet over tiår.",
    "Et hus i 100-års sonen: heve, flytte eller forsterke. Betaler: huseier, kommune, stat — si det, ikke gjem det.",
    "NCCS gir regionalt havnivå. MET gir varselet. Kartverket gir kote. En setning uten etat er svakere enn en setning med.",
  ], {
    official: false,
    figures: ["monster-wave"],
    steps: [
      "Nevn stormfloens ledd.",
      "Ett kutt, ett tiltak.",
      "Hvem betaler, og hva som gjenstår når slusen er bygget.",
    ],
    tip: "Kapittel: tilpasning. Kompetansemålet er «drøfte», ikke «liste tiltak».",
  }),

  7: write("Forholdet (10/8)³ ≈ 1,95. Omtrent dobbel effekt. Havsiden koster areal, arter, kabel og tilkomst i storm.", [
    "v³: 10/8 = 1,25. 1,25³ ≈ 1,95. Ikke si «25 % mer vind, 25 % mer strøm».",
    "Drøftingen: fiskeri, sjøfugl, visuell horisont, ising, bølger som stenger servicefartøy. Bærekraft er avveining, ikke ja/nei.",
  ], {
    official: false,
    figures: ["wave-anatomy"],
    tip: "Kapittel: energi fra hav og luft. Udirs eksempel 23–25 er ufullstendig — denne fyller målet.",
  }),

  8: write("To punkt (kai og innland), timevis gjennom dagen, termometer og vindretning, usikkerhet ±0,5 °C, Yr/Varsom, én dag ≠ sesong.", [
    "Transekt er linjen. Uten innlandspunkt er det ikke sjøbris-test.",
    "Metadata: tid, koordinat, instrument, observatør. En temperatur kl. 12 uten klokke og sted er ikke data.",
    "HMS: glatt svaberg, flod. Avlys er kompetanse.",
  ], {
    official: false,
    figures: ["land-sea-breeze"],
    steps: [
      "Hypotese i én setning.",
      "Design (rom og tid).",
      "Usikkerhet og hva én dag ikke kan bære.",
    ],
    tip: "Kapittel: felt i hav, luft og is. Samme kjede som G1, annen sfære.",
  }),
};
