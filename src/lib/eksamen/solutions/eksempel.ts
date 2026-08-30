import { mc, write, type Solution } from "../solution-types";

export const eksempelSolutions: Record<number, Solution> = {
  1: write("Les julikartene for Polen. Koble hete, tørke eller flom til konkret naturfare.", [
    "To Europakart. Si hvilken anomali Polen har, og hvilken fare som følger: skogbrann og tørke ved hete, oversvømmelse ved ekstremnedbør. Ikke skriv «ekstremvær» uten å peke på kartet.",
  ], {
    official: false,
    steps: [
      "Les fargeskalaen og Polens rute.",
      "Velg én primær fare og én sekundær.",
      "Henvis til kartet som kilde.",
    ],
  }),

  2: write("Hellas: hetebølge og tørke peker på skogbrann og vannmangel.", [
    "Samme kartpar som 1, annet land. Snøskred er feil sesong og feil klima for et typisk gresk julikart. Begrunn med temperatur- og nedbørsanomali.",
  ], {
    official: false,
  }),

  3: write("Positiv temperaturanomali over hav = marin hetebølge-risiko.", [
    "Koble lufttemperatur, havtemperatur og værtype. Lite vind og klarvær forsterker. Si hva «anomali» betyr: avvik fra en referanseperiode, ikke «varmt i seg selv».",
  ], {
    official: false,
    figures: ["marine-heatwave"],
  }),

  4: write("Varm juli-anomali i Alpene → negativ massebalanse.", [
    "Les kartet. Ikke anta at alle breer smelter likt. Høyde, orientering og sommertemperatur styrer. Knytt anomali til smelting, ikke til «klimaendringer» løst.",
  ], {
    official: false,
  }),

  5: write("Plassholder i Udirs eksempel. Øv på marin hetebølge i Lofoten med egne kart.", [
    "Hvis siden er tom hos Udir, hopp over. Ellers: samme logikk som oppgave 3 — anomali, blanding, økosystem.",
  ], {
    official: false,
  }),

  6: write("Menneskelig pådriv mot naturlig variasjon. Kartene er evidens, ikke pynt.", [
    "Skill det som er vær (én juli) fra det som er klima (tiår). Henvis til Climate Reanalyzer. Si hva én sesong kan og ikke kan bevise.",
  ], {
    official: false,
    steps: [
      "Hva viser kartene (vær/anomali)?",
      "Hva kreves for å kalle det klimaendring?",
      "Hvor naturlig variasjon (NAO, ENSO) kan forstyrre bildet.",
    ],
  }),

  7: write("Tema 2 åpner AMOC. Skill Golfstrøm (vindgyre) og AMOC (omveltning).", [
    "Golfstrømmen er den vestlige randstrømmen i gyren. AMOC er den meridionale omveltningen med dypvannsdannelse. De henger sammen, men er ikke samme ting.",
  ], {
    official: false,
    figures: ["gulf-nac", "amoc-nadw"],
  }),

  8: write("Vil AMOC kollapse? Si enighet (svekkelse) og uenighet (kollaps).", [
    "Argumenter for risiko: ferskvann og oppvarming som øker sjiktning. Argumenter mot brå kollaps: vinddrevet Golfstrøm, urealistiske modelldoser, usikker observasjon. Konkluder nyansert.",
  ], {
    official: false,
    figures: ["amoc-nadw", "density-mix"],
  }),

  9: mc("Marker der vannet synker: Nord-Atlanteren / Grønlandshavet — ikke Mexicogolfen alene", [
    "Dypvannsdannelse skjer der overflaten blir tett nok: de nordiske hav og Labradorhavet. Mexicogolfen er varm kilde, ikke synkested.",
  ], {
    official: false,
    figures: ["amoc-nadw"],
  }),

  10: write("Dataoppgave. Les enheter. En modellbane er ikke en observasjon.", [
    "Si om kurven er målt eller simulert. Les aksen. Ikke trekk konklusjon fra én modell uten usikkerhet.",
  ], {
    official: false,
  }),

  11: write("AMOC og modeller. Skill scenario, usikkerhet og konsekvens for Norge.", [
    "Bruk Udirs vedlegg. Et scenario er ikke en prognose. For Norge: mindre varme og fukt hvis AMOC svekkes, men vestavind og gyre blir værende.",
  ], {
    official: false,
    figures: ["amoc-nadw", "gulf-nac"],
  }),

  12: write("Fortsett på samme spor. Vis kilder.", [
    "Bygg videre på 11. Ikke gjenta innledningen. Nye poeng, nye henvisninger.",
  ], {
    official: false,
  }),

  13: write("Felt: GPS, profil, usikkerhet, HMS. CTD leses som T, S og tetthet sammen.", [
    "Skriv hva dataene faktisk viser, ikke hva du ønsket å finne. Tropisk profil: varm og fersk i toppen. Subpolar: kald og gjennomblandet.",
  ], {
    official: false,
    figures: ["ctd-seasons"],
    steps: [
      "Beskriv innsamlingen (hvor, hvordan, HMS).",
      "Vis én figur eller tabell du ville laget.",
      "Si usikkerhet (kalibrering, posisjon, vær).",
    ],
  }),

  23: write("Plassholder: ekstremvær mot havvind. Tenk bølger, ising, stormflo og tilkomst.", [
    "Ikke et ferdig fasitsvar hos Udir. Drøft operasjonelle grenser: når turbinen stenges, når skip ikke kommer ut, når ising treffer bladene.",
  ], {
    official: false,
    figures: ["wave-anatomy"],
  }),

  24: write("Plassholder: værvarsling for havvind. Skill horisont, usikkerhet og terskler.", [
    "Kort horisont (timer–døgn) for drift, lenger for planlegging. Oppgi vind- og bølgetersker. Si at ensemble/usikkerhet hører med.",
  ], {
    official: false,
  }),

  25: write("Plassholder: bærekraft. Avvei energi, natur, fiskeri og forsyningssikkerhet.", [
    "Ikke konkluder med ja/nei uten forbehold. Vis at du kan holde to tanker: klimakutt og arealbruk.",
  ], {
    official: false,
  }),
};
