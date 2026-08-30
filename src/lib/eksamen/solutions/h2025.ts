import { mc, write, type Solution } from "../solution-types";

export const h2025Solutions: Record<number, Solution> = {
  1: mc("b — Balanse ved bakken: like mye energi inn mot overflaten som ut fra den", [
    "Figuren summerer fluksene ved bakken. Sol pluss langbølge fra atmosfæren møter langbølge ut, fordamping og følbar varme. Drivhuseffekten er med i den nedoverrettede langbølgen.",
    "Det er ikke «like mye fra sola som fra bakken». Sola er bare én av inn-termene.",
  ], {
    whyNot: [
      { option: "Like mye fra sola som fra bakken", text: "Da har du droppet atmosfærens IR og de andre fluksene." },
      { option: "Uten drivhuseffekt", text: "Langbølge ned fra lufta er drivhuseffekten." },
    ],
    figures: ["radiation-balance"],
  }),

  2: mc("a — Snø- og isalbedo er mekanismen som ikke er godt nok med i Holocen-modellen", [
    "For varme Arktis i holocen-simuleringen peker Udir på albedo. Metan, boreal skog og vulkan-aerosoler er ikke det som mangler i den forklaringen oppgaven vil ha.",
  ], {
    figures: ["ice-albedo"],
  }),

  3: mc("b — Sted 2", [
    "Kraftig nedbør hører fronten / der fuktig luft heves, ikke høytrykket. Åpne MET-kartet og sjekk hvilket tall som ligger i frontsonen. Høytrykk = synkende luft = lite nedbør.",
  ], {
    figures: ["atmo-river"],
  }),

  4: mc("Usann — sann — usann — sann", [
    "Tyngst overflatevann er ikke i Indiahavet. Middelhavet er tett på grunn av fordamping. Høyest tetthet er ikke kystnært — elveferskvann senker den. Lavest tetthet i tropene stemmer: varmt, ofte ferskere.",
  ], {
    figures: ["thermohaline"],
  }),

  5: mc("Kaldest = år K. Våtest = år B.", [
    "Tynnest ring hvis veksten styres av temperatur (kald sommer). Tykkest ring hvis den styres av nedbør (vått år). Les linjalen mot merkene A–K. Ikke anta at «tykk = varm» uten å lese hva oppgaven sier styrer veksten.",
  ], {
    figures: ["paleo-proxy"],
  }),

  6: mc("Sirkelen i Nordishavet", [
    "Coriolisparameteren er 2Ω sin φ. Sin 0° = 0 ved ekvator. Sin 90° = 1 ved polene. Derfor er coriolis størst i Nordishavet, ikke ved ekvator og ikke på midlere bredder.",
  ], {
    figures: ["coriolis-lat"],
  }),

  7: mc("c — Dyphavsstrømmer drives av tetthetsforskjeller (temperatur og salinitet)", [
    "Termohalin: kaldt og salt synker. Vind driver overflaten. Coriolis bøyer. Tidevann er lokalt og driver ikke de store dypstrømmene.",
  ], {
    figures: ["thermohaline", "amoc-nadw"],
  }),

  8: mc("c — Elvevann har lavere salinitet og er derfor lettere enn kystvann", [
    "Ferskvann er mindre tett enn salt kystvann og legger seg oppå. Temperatur alene er ikke hovedgrunnen — det er saltet som skiller elv og fjord.",
  ], {
    figures: ["density-mix"],
  }),

  10: mc("c — For 1,68 millioner år siden", [
    "Det er tidspunktet med høyest eksentrisitet i figuren. Høy eksentrisitet gir større årstidsforskjell og mer sjanse for at sommersnø overlever på 65°N — altså mer sjanse for istid.",
  ], {
    figures: ["perihelion", "earth-tilt"],
  }),

  13: mc("c — 1920–1940 var kaldere enn 2010–2024, derfor blir anomalien mot den tidlige perioden større", [
    "Anomali = verdi minus referanse. Jo kaldere referanse, jo større positiv anomali for samme varme år. Derfor slår 1920–1940 hardere ut enn 2010–2024.",
  ]),

  17: mc("a — Metanutslipp fra alpin permafrost er den minste trusselen", [
    "Arealet av alpin permafrost er lite. Skred i tinet arktisk permafrost og isskred i alpine fjell rammer folk og infrastruktur hardere. Ranger etter konsekvens, ikke etter at «metan høres farlig ut».",
  ]),

  20: mc("c — Svekket trykkgradient tropene–polene kan gi svakere vind og mindre nordlig varmetransport", [
    "Arktis varmes raskere enn tropene, gradienten slakker, vestavinden kan svekkes. Smeltevann øker stratifisering (motsatt av «mindre»). Polar salinitet synker, ikke øker. Varmere overflate blir lettere, ikke tettere.",
  ], {
    figures: ["jet-blocking", "amoc-nadw"],
  }),

  21: write("a) Minst fire prosesser i Bjerknes-figuren. b) Hurtige endringer med lang virkning.", [
    "Fire gyldige: mer absorpsjon og emisjon av langbølge fra drivhusgasser, mer fordamping, lavere albedo, og skyer (mer refleksjon og/eller mer langbølge — usikkerhet er også gyldig). Bruk tallene i figuren.",
    "Hurtige med lang virkning: fossilt brensel, endret jordoverflate, fotosyntese via arealendring. Vulkan-aerosoler alene er for kortvarige.",
  ], {
    steps: [
      "Pek på fire piler/bokser i figuren og si hva hver gjør med energien.",
      "Skill kortvarig aerosol fra langlivet CO₂.",
    ],
    figures: ["radiation-balance", "ice-albedo"],
  }),

  22: write("1 umulig å avgjøre. 2 sann. 3 usann. 4 usann. b) Videreutvikle modellen med metan og tilbakekoblinger.", [
    "1: A og B er begge kyst — du kan ikke skille dem. 2: A mister permafrost ved kysten, C er innland. 3: D beholder permafrost i innlandet, så påstanden er usann. 4: sjøis styrer bølge, stormflo og erosjon i A, så «usann» på den påstanden som sier noe annet.",
    "b) Metan → drivhus → tilbakekoblinger (albedo, fotosyntese, areal). Figuren får mer blått og mindre grønt.",
  ], {
    figures: ["ice-albedo", "positive-feedback"],
  }),

  23: write("a) Polar østavind driver kyststrømmen vestover, vestavind driver ACC østover. b) Divergens ved ~60°S gir oppveling.", [
    "Polarcelle nærmest kysten: østavind, Ekman til venstre på SH → vestgående kyststrøm. Ferrel: vestavind → østgående sirkumpolar strøm.",
    "Ved ~60°S peker Ekmantransporten nord med vestavind og sør med polar østavind. Overflaten divergerer, dypt vann kommer opp, og primærproduksjonen blir høy.",
  ], {
    figures: ["westerlies", "ekman-surface"],
  }),
};
