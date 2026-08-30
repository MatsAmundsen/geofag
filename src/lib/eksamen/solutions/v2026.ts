import { mc, write, type Solution } from "../solution-types";

export const v2026Solutions: Record<number, Solution> = {
  1: mc("d — Vinden kommer fra sørvest", [
    "Lavtrykket i Norskehavet spinner mot urviseren på nordlig halvkule. Luft strømmer inn mot senteret og bøyes til høyre. Når L treffer Nordland, ligger X sør for senteret.",
    "Sør for et lavtrykk peker innsuget inn mot nord. Høyreavbøyningen gjør retningen sørvestlig: vinden kommer fra sørvest inn mot L. Det er Buys-Ballots regel i praksis — stå med ryggen mot vinden, lavtrykket til venstre.",
  ], {
    whyNot: [
      { option: "a Nordøst", text: "Det er retningen nordøst for senteret, der lufta kommer inn fra land." },
      { option: "b Nordvest", text: "Nordvest hører nordsiden / baksiden av lavtrykket, ikke X sør for L." },
      { option: "c Nord", text: "Rett nordlig vind ville krevd at X lå øst for L, uten den sørvestlige innsugskomponenten." },
      { option: "e Øst", text: "Østlig vind ligger vest for senteret." },
    ],
    figures: ["wind-low-nh"],
    tip: "Tegn L, sett X sør for det, og tegn piler mot klokken. Retningen ved X leser du av pila — ikke av «vinden går mot lavtrykket» i rett linje.",
  }),

  2: mc("c — Påstand 2 og 4 er sanne", [
    "Påstand 2 stemmer med figuren: 28,67 °C er rekorden i Middelhavet siden 1991. Påstand 4 er mekanismen: lite vind og klarvær øker innstrålingen og svekker blandingen, så varmen blir liggende i toppen.",
    "En marin hetebølge er unormalt varmt overflatevann over dager til måneder. Den trenger varme inn og svak blanding ut. Vulkaner på havbunnen er ikke forklaringen.",
  ], {
    whyNot: [
      { option: "Påstand 1", text: "Anomalien er ikke «nesten 10 °C». Les fargeskalaen — den er lavere." },
      { option: "Påstand 3", text: "Vulkanisme på bunnen driver ikke denne hetebølgen." },
      { option: "Påstand 5", text: "Hele Middelhavet ble ikke like hardt rammet. Hetebølger er lokale." },
    ],
    figures: ["marine-heatwave"],
    tip: "Kryss av påstandene én for én mot figuren før du ser på bokstavkombinasjonene.",
  }),

  3: mc("b — Høyere global middeltemperatur → hyppigere hetebølger → tørke og vannmangel", [
    "Årsak–virkning skal gå i én retning og være fysisk. Global oppvarming hever utgangspunktet, så hetebølger kommer oftere. Hete tørker jorda og øker fordamping, og Spania får vannmangel.",
  ], {
    whyNot: [
      { option: "a", text: "Urbanisering kjøler ikke byer. Byer blir varmere (varmeøy)." },
      { option: "c", text: "Mer vegetasjon gir ikke mer skogbrann som hovedlenke." },
      { option: "d", text: "Luftforurensning som reduserer solinnstråling gir ikke sterkere hetebølge." },
    ],
  }),

  4: mc("c — Syklonen mister varmt hav langt nord og dør ut", [
    "Tropiske sykloner er varmemotorer. De trenger hav over omtrent 26 °C. Når Gabrielle svinger mot Europa, kommer den over kaldere vann. Latent varme forsvinner, og stormen fylles igjen.",
    "At den gjorde lite skade på fastlandet, er konsekvensen av den døende motoren — ikke at coriolis «ble for sterk» eller at vestavinden rev den i stykker.",
  ], {
    whyNot: [
      { option: "a", text: "Coriolis overstiger ikke trykkgradienten fordi banen går øst. Coriolis trengs for å spinne, den slår ikke av orkanen." },
      { option: "b", text: "Vestavinden kan styre banen, men den er ikke hovedgrunnen til at sterke tropiske sykloner sjelden når Europa." },
    ],
    figures: ["hurricane-sst"],
  }),

  5: mc("a — Flere og mer langvarige kuldebølger", [
    "Oppgaven peker på at den polare jetstrømmen endrer bane når Arktis varmes: slakkere temperaturgradient, mer meandrerende jet og blocking. Da kan kald polarluft ligge over Europa lenger.",
    "Dette er Udirs nøkkel for denne oppgaven. Den er ikke det samme som IPCC-hovedfunnet om færre kuldeekstremer globalt. Her skal du følge jet/blocking-argumentet i teksten og figuren.",
  ], {
    whyNot: [
      { option: "b–e", text: "De andre alternativene følger ikke av «jeten svinger mer». Udir teller a." },
    ],
    figures: ["jet-blocking"],
    tip: "Les hva oppgaven faktisk spør om: konsekvensen av endret jetbane, ikke det globale IPCC-sammendraget.",
  }),

  6: write("Gyda er en smal, fuktig luftstrøm fra varmt hav inn mot Vestlandet — orografisk ekstremnedbør.", [
    "Skriv om værsituasjonen, ikke om hvorfor Met sender farevarsel generelt. Prognosekartet viser en smal, mørk fuktig tunge. Farevarselet peker på samme slengen.",
    "Det er en atmosfærisk elv (ordet er ikke påkrevd): fukt fra varmt hav presses mot fjellene, heves og gir ekstremnedbør i en smal sone.",
  ], {
    steps: [
      "Beskriv hva kartet viser: fuktighet, retning, hvor den treffer kysten.",
      "Koble til orografisk heving mot Vestlandet og Trøndelag.",
      "Bruk både prognosekartet og farevarselet som kilder — navngi dem.",
      "Hold deg til denne situasjonen. Ikke skriv en generell essay om ekstremvær.",
    ],
    figures: ["atmo-river"],
  }),

  7: mc("a — Glasset der fargen synker er ferskvann", [
    "Kaldt smeltevann er tettere enn romtemperert ferskvann og synker. I saltvann er det samme smeltevannet lettere enn det salte og blir liggende oppå.",
    "Derfor: farge langs bunnen = ferskvann. Farge i toppen = saltvann.",
  ], {
    whyNot: [
      { option: "Motsatt glass", text: "Hvis du bytter om, har du glemt at salt gjør vann tyngre enn kaldt ferskvann." },
    ],
    figures: ["density-mix"],
  }),

  8: mc("b — A er tyngre enn B og legger seg under", [
    "A: 1 °C og 29,7 PSU. B: −0,8 °C og 29,4 PSU. Les isopyknalene. A ligger på en høyere tetthetslinje. Den lille ekstra saliniteten slår den lille temperaturforskjellen.",
  ], {
    whyNot: [
      { option: "A letter / B tyngre", text: "Da har du lest T alene. I sjøvann ved denne temperaturen styrer saltet mer." },
    ],
    figures: ["ts-density", "water-masses"],
  }),

  9: mc("April = B og C. August = A og D.", [
    "April: havet er gjennomblandet etter vinteren. Temperaturen er lav, og toppen er ofte saltere. Profilene er rette.",
    "August: sola har varmet toppen, og smeltevann har fersket den. Du får varm, fersk hatt over kaldere, saltere vann.",
  ], {
    figures: ["ctd-seasons"],
    tip: "Match sesong mot form: rett strek = vinter/vår. Knekk i toppen = sommer.",
  }),

  10: mc("Medvirkende: c og e. Ikke a, b og d.", [
    "Arktisk forsterkning: is- og snøalbedo som synker (mer opptak av sol), og endret vertikal temperaturgradient (lapse-rate).",
    "Ikke med: mer vanndamp enn i tropene, sterk vertikal blanding i arktisk troposfære, eller «mer klimagasser enn andre regioner».",
  ], {
    figures: ["ice-albedo"],
  }),

  11: write("Punktet ligger i spranget fra dypt til grunt. Tre prosesser: motstrøm, brå dybdeendring og vind.", [
    "Monsterbølger bygges der energi konsentreres. På batymetrikartet er det overgangen mørkt → lyst.",
    "Vind og strøm skal ha motsatt retning. Navn på strømmer er ikke krav — prosessene er det.",
  ], {
    steps: [
      "Sett punktet der dybden endrer seg brått, ikke midt i bassenget.",
      "Forklar motgående strøm som bremser og steiler bølgene.",
      "Forklar at grunt vann konsentrerer energi.",
      "Forklar at vinden bygger bølger mot strømmen.",
    ],
    figures: ["monster-wave"],
  }),

  12: write("Vurder alle fire påstander mot riktig panel.", [
    "1 og 4 er usanne ut fra grafene: et kort hopp 2015–2020 er ikke «kraftig global oppvarming», og polart vann er ikke saltere enn atlantisk.",
    "3 er sann: atlantisk vann blir saltere, knyttet til varmere klima og fordamping.",
    "2 kan argumenteres begge veier — smeltevann kan senke T og S i toppen. Selvstendig vurdering teller.",
  ], {
    steps: [
      "Les hvilken akse og hvilket panel hver påstand peker på.",
      "Si sann/usann og pek på data.",
      "Ikke generaliser fra ett kort intervall til «global oppvarming».",
    ],
  }),

  13: mc("Alle tre påstandene er sanne.", [
    "Perihelium ved NH-vinter: små årstidsforskjeller i nord (nære sola om vinteren, lenger unna om sommeren).",
    "Aphelium ved NH-sommer er samme geometri og gir store årstidsforskjeller i sør.",
    "Aphelium ved NH-vinter gir varme NH-somre og mindre sjanse for at snø overlever — altså mindre sjanse for istid. To av tre rette ga 0,5 poeng i sensuren.",
  ], {
    figures: ["perihelion"],
  }),

  14: mc("b — Ved 65°N svinger sommersola mye og styrer om snøen overlever", [
    "Milanković handler om fordeling av innstråling, særlig sommersola på høye nordlige bredder. Ved ekvator er innstrålingen jevn hele året. Ved 65°N avgjør sommersola om vintersnøen smelter.",
  ], {
    whyNot: [
      { option: "Rotasjonshastighet", text: "Døgnet endrer ikke istidene." },
      { option: "Større avstandsendring ved 65°N", text: "Avstanden til sola er den samme overalt på jorda i et gitt øyeblikk." },
    ],
    figures: ["earth-tilt"],
  }),

  15: mc("b — Positive tilbakekoblinger øker nedkjølingen ytterligere", [
    "Positiv betyr forsterkende. Mer is → høyere albedo → enda kaldere. Negative motvirker. Systemet går ikke «alltid tilbake til balanse».",
  ], {
    whyNot: [
      { option: "Alltid tilbake til balanse", text: "Det er en blanding av negativ tilbakekobling og ønsketenkning." },
      { option: "Negative dominerer i kaldt klima", text: "I istidsforsterkning er de positive (is-albedo, karbon) sentrale." },
    ],
    figures: ["positive-feedback", "ice-albedo"],
  }),

  16: mc("d — Større isvolum 750–450 ka betyr kjøligere klima, forsterket av positive tilbakekoblinger", [
    "Mer is er et kaldere jordsystem. Positive tilbakekoblinger (albedo, karbon) forklarer hvorfor utslaget blir stort. Ikke «varmere», ikke «mindre usikkerhet», ikke negative tilbakekoblinger som hovedforklaring.",
  ], {
    figures: ["positive-feedback"],
  }),

  17: mc("d — Innlandsis dekker bakken og stenger for permafrost. Nord-Amerika hadde den største Laurentide-isen.", [
    "Permafrost trenger bart, kaldt land. Der innlandsisen ligger, er det is — ikke permafrost. Laurentide-isen dekket et enormt areal i Nord-Amerika. Eurasia hadde mer bart, kaldt land og derfor mer permafrostareal.",
  ]),

  18: write("Minst to naturfarer knyttet til tapt sjøis og overgangen istid → mellomistid.", [
    "Smeltende sjøis hever ikke havnivået alene (den flyter allerede). Farene kommer av åpent hav og varmere kyst.",
  ], {
    steps: [
      "Endret lavtrykksaktivitet (flere polare lavtrykk over åpent vann).",
      "Høyere bølger og kysterosjon når isen ikke lenger demper.",
      "Tining av kystnær permafrost.",
      "Mer fukt og nedbør, eventuelt skred.",
      "Mer smelting av innlandsis (det hever havet).",
    ],
    figures: ["ice-albedo"],
  }),

  19: mc("b — Massebalansen etter 2000 er gjennomgående negativ — det peker på oppvarming", [
    "Når sommersmeltingen slår vinternedbøren, krymper breen. Ålfotbreen er den maritime (mer vinternedbør), Hellstugubreen den kontinentale.",
  ], {
    whyNot: [
      { option: "Volum øker", text: "Negativ massebalanse betyr tap, ikke vekst." },
      { option: "Hellstugubreen vest for Ålfotbreen", text: "Det er omvendt: Ålfot i vest, Hellstugu mer kontinentalt." },
    ],
  }),

  20: mc("a — Negativ NAO: kalde og tørre vestlandsvintre, lite snø, negativ vinterbalanse", [
    "Negativ NAO slakker trykkforskjellen Island–Asorene. Vestavinden svekkes, mild fukt når ikke Vestlandet like godt. Vintrene blir kaldere og tørrere, og breene får lite vinterpålagring.",
  ], {
    whyNot: [
      { option: "Positiv NAO gir tørre/kalde vintre", text: "Tvert imot: positiv NAO gir milde, våte vestlandsvintre." },
    ],
    figures: ["nao"],
  }),

  21: mc("Feil — riktig — feil", [
    "Første påstand beskriver fønvind (varm, tørr leside etter heving), ikke katabatisk. Katabatisk er kald, tett luft som renner ned av tyngdekraften, ofte på lesiden av isdekte fjell. Synkende katabatisk luft er tørr og lager sjelden skyer.",
  ], {
    figures: ["katabatic"],
    tip: "To fallvinder, to temperaturer. Lær deg forskjellen før du leser påstandene.",
  }),

  22: mc("b — 0 °C på toppen, 20 °C på lesiden", [
    "Loside 14 °C. Tørradiabat 1 °C/100 m opp 800 m til skybase: 14 − 8 = 6 °C. Våtadiabat 0,5 °C/100 m videre 1200 m: 6 − 6 = 0 °C på toppen. Leside tørradiabat 2000 m ned: 0 + 20 = 20 °C.",
  ], {
    whyNot: [
      { option: "Andre temperaturpar", text: "De glemmer skybase, bytter om tørr/våt, eller glemmer at nedsiden er tørr hele veien." },
    ],
    figures: ["foehn"],
    tip: "Skriv tre linjer: opp tørt, opp vått, ned tørt. Regn hver etappe for seg.",
  }),

  23: write("Vurder alle fire påstander. Argumentasjonen teller mer enn merkelappen.", [
    "1 usannsynlig: solvinkelen endres ikke av klima; mer fukt kan gi mer sky. 2 betinget sann: mer vannkraft under smelting, mindre når breen er borte — bærekraft og naturinngrep hører med. 3 usann: varmere klima gir mer ustabilitet, ikke «stabile fønvinder», og lite vindkraftpotensial i føn. 4 sannsynlig: mer vind kan øke produksjon.",
  ], {
    steps: [
      "Ta én påstand om gangen. Si sannsynlig/usannsynlig og hvorfor.",
      "Skill det som er fysikk (solvinkel, føn, bre) fra det som er samfunn (kraft, inngrep).",
      "Vis usikkerhet der den er ekte.",
    ],
  }),
};
