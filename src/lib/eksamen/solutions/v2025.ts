import { mc, write, type Solution } from "../solution-types";

export const v2025Solutions: Record<number, Solution> = {
  1: mc("a — Svekket nordatlantisk strøm / AMOC gir kaldere og tørrere Vestland", [
    "AMOC og Den nordatlantiske strømmen fører varme og fukt mot Norge. Svekkes de, mister Vestlandet den maritime varmen. Mindre varme og fukt fra havet gir også mindre nedbør.",
  ], {
    whyNot: [
      { option: "Andre lenker", text: "De bytter om varme og nedbør, eller blander inn feil strøm." },
    ],
    figures: ["amoc-nadw", "gulf-nac"],
  }),

  2: mc("b — Grønlandsisen smelter og tilfører kaldt ferskvann som kan stanse dypvannsdannelsen", [
    "Dypvannsdannelse krever tett overflatevann: kaldt og salt. Ferskt smeltevann legger seg oppå, øker sjiktningen og kan bremse omveltningen. To mekanismer i ett: is smelter, og ferskvannet stanser synkingen.",
  ], {
    whyNot: [
      { option: "Økt fordamping som «lik densitet»", text: "Fordamping øker salinitet, den stanser ikke AMOC." },
      { option: "Regn som stanser sjøis", text: "Det er ikke hovedforklaringen på AMOC-svekkelse." },
    ],
    figures: ["amoc-nadw", "density-mix"],
  }),

  3: mc("c — Påstand 1 og 2", [
    "Sol og lite sky, pluss svak vind og sterk sjiktning, stenger varmen i toppen — klassisk marin hetebølge. La Niña gir ikke typisk slike hetebølger i østlige Stillehav. Hetebølger gir sterkere, ikke svakere, tropiske orkaner.",
  ], {
    figures: ["marine-heatwave"],
  }),

  4: mc("Oppgaven er trukket (bokmål: to like alternativ).", [
    "I nøkkelen sto b: global temperatur påvirkes lite av mer ozon i 20–30 km. Tell den ikke med i øvingen. Sensuren fjernet den på grunn av skrivefeil.",
  ], {
    tip: "Hvis du øver på papir: hopp over. Ikke bruk tid på en trukket oppgave.",
  }),

  5: mc("Rett — galt — rett", [
    "Lavere albedo øker absorbert sol: rett. Permafrost som tiner gir ikke alltid lavere albedo (vegetasjon og fukt kan gå begge veier): galt. Satellitter kan måle albedo: rett.",
  ], {
    figures: ["ice-albedo"],
  }),

  6: mc("Ekvator = svart graf med rundinger. SH = grønne grafer med streker. NH = oransje graf med trekanter.", [
    "Ekvator er jevnest, med to små topper (sola står i senit to ganger). NH har maksimum i juni–juli, SH i desember–januar. Match symbolene i tegnforklaringen, ikke fargene du «husker».",
  ], {
    figures: ["earth-tilt"],
  }),

  7: mc("Farevarsel 2", [
    "Les trykk, front og vind i ringen over Finnmark. Match det varselet som faktisk hører til analysekartet — ikke skogbrann og ikke et varsel som beskriver en annen landsdel.",
  ], {
    figures: ["pressure-gradient"],
    tip: "Åpne Udir-figuren. Si høyt: hvilken vind, hvilken front, hvilket område. Så velger du varselet.",
  }),

  8: mc("a — Det ekvatorielle lavtrykksbeltet ligger litt nord for ekvator (ITCZ om NH-sommer)", [
    "ITCZ følger den varmeste sonen og ligger nord for ekvator om nordlig sommer. Det er ikke høytrykk ved ekvator. Rotasjonsretning alene forteller ikke H eller L uten halvkule. Blått i Sørishavet er ikke automatisk «høytrykk».",
  ], {
    figures: ["hadley"],
  }),

  9: mc("a — Høyere ¹⁸O/¹⁶O i foraminiferer oppover i kjernen betyr kaldere hav", [
    "I kaldt klima tar isen mer ¹⁶O. Havet blir relativ ¹⁸O-rikt, og kalkskallene viser høyere forhold. Oppover i kjernen = yngre. Stigende forhold = kaldere, ikke varmere, og ikke «høyere havnivå».",
  ], {
    whyNot: [
      { option: "Varmere / høyere hav / mer salt", text: "Det er motsatt isotop-logikk, eller en annen proxy." },
    ],
    figures: ["paleo-proxy"],
  }),

  10: mc("c — Påstand 1, 2 og 3: vulkan, lav solflekkaktivitet og langvarig negativ NAO", [
    "Den lille istiden er århundrer, ikke millionår. Vulkanutbrudd, Maunder-minimum og negativ NAO treffer tidsskalaen. Platetektonikk og Milanković gjør det ikke. La Niña alene holder ikke 300 år.",
  ], {
    figures: ["nao", "paleo-proxy"],
  }),

  11: mc("Alternativ 1 — påstand 1 og 2 er sanne", [
    "Polare lavtrykk intensiveres raskt og dannes der det er få stasjoner — derfor er de vanskelige å varsle. De dannes over åpent, isfritt hav, ikke «langt inne på sjøisen», og de synes på satellitt.",
  ]),

  12: mc("Usann — usann — usann — usann — sann", [
    "Høyre panel er ikke NH. Årstidsutslaget er ikke like stort på begge. Venstre har ikke større årstidsvariasjon enn høyre. Sjøis påvirker lufttemperatur. Septemberutbredelsen i venstre panel er lavere 2010–2024 enn 1980–2000 — det er den sanne.",
  ], {
    figures: ["ice-albedo"],
    tip: "Skriv en tabell med fem rader. Les hvert panel to ganger før du krysser.",
  }),

  13: mc("a — Sterkest vind ved X på Island", [
    "Vindstyrke = isobaravstand. Tette linjer ved X, slakere ved Y og Z. Tallverdien i senteret betyr mindre enn avstanden mellom linjene.",
  ], {
    figures: ["pressure-gradient"],
  }),

  14: mc("c — Bare påstand 2 er sann", [
    "Høy fordamping relativt til nedbør gir høy salinitet (Middelhavet, subtropene). Elvemunninger fortynner. Mye nedbør senker salinitet. Kaldt vann er ikke automatisk saltere.",
  ], {
    figures: ["thermohaline"],
  }),

  15: mc("d — Klimagasser absorberer utgående langbølge", [
    "Drivhuseffekten er IR-absorpsjon i atmosfæren, som emitterer tilbake mot bakken. Gassene stanser ikke sola, senker ikke albedo, og øker ikke utstrålingen fra bakken som primær mekanisme.",
  ], {
    figures: ["radiation-balance", "carbon-cycle"],
  }),

  16: mc("b — Troposfæren varmes primært nedenfra av langbølge fra jordoverflaten", [
    "Sola varmer bakken. Bakken emitterer IR. Lufta tar den IR-en. Direkte solvarme i lufta, varmeledning og bakkenært ozon er ikke hovedårsaken til troposfærens temperaturprofil.",
  ], {
    figures: ["radiation-balance"],
  }),

  17: mc("a — I stratosfæren stiger temperaturen med høyden, så konveksjon stanses", [
    "Ozonet absorberer UV og varmer. Stabil sjiktning: en stigende boble er kaldere enn omgivelsene og synker tilbake. «Ustabil» er feil. Vanndampmengden alene er ikke Udirs valgte forklaring.",
  ], {
    figures: ["convection"],
  }),

  18: mc("d — Stormflo", [
    "Vind, hagl og lyn tar færre liv enn vannet som presses på land. Stormflo er den dødelige kombinasjonen av lavt trykk og pålandsvind.",
  ], {
    figures: ["hurricane-eye"],
  }),

  19: mc("d — Lite sol og tørr bakke om sommeren begrenser tining og holder permafrosten", [
    "Permafrost overlever der sommersola ikke tiner for dypt og der bakken leder dårlig. Tykt tidlig snødekke isolerer mot vinterkulde og kan svekke permafrost. Tynt torvdekke og mye vann som fryser øker varmeledning.",
  ]),

  20: mc("Usann — usann — usann — sann — sann", [
    "Golfstrømmen er ikke én kontinuerlig elv inn i Norskehavet. AMOC er ikke vinddrevne overflatestrømmer. Golfstrømsystemet er ikke et vertikalt omveltningssystem. Subtropiske gyre drives av vind og gravitasjon. AMOC kan svekkes uten at gyren stopper.",
  ], {
    figures: ["gulf-nac", "amoc-nadw"],
  }),

  21: write("a) Bilde 1 varmfront, bilde 2 kaldfront. b) Fem påstander: sann — usann — usann — sann — sann.", [
    "Varmfront: tynnere, mer utstrakt sky, sakte heving. Kaldfront: tykkere sky, rask heving. Beskriv hva du ser, så prosessen.",
    "Skyer og pådriv: 1 sann (kartet er rødt / positiv endring). 2 usann (Peru har fortsatt flest varme skyer). 3 usann (varme skyer reflekterer mer → negativt pådriv). 4 sann (flere kalde skyer → mindre refleksjon → positivt pådriv). 5 sann (lengre levetid forsterker pådrivet).",
  ], {
    steps: [
      "a: Skyform + hevingshastighet + nedbørtype.",
      "b: Gå gjennom alle fem. Si hva «positivt pådriv» betyr (jorda tar til seg mer energi).",
    ],
  }),

  22: write("a) To sanne: 1 og 3. b) Paleodata og AMOC med ekte proxyer.", [
    "1 sann: avslått AMOC = ingen dypvannsdannelse, synlig i figur 1a. 3 sann: høy CO₂ krever mer negativ ferskvannstilførsel for sterk AMOC, figur 2d. 2 og 4 er usanne.",
    "Paleo: velg proxyer fra kartet (havbunn, iskjerne, innsjø, myr). Si tidsskala og hva ¹⁸O, plankton og fossiler faktisk måler. Knytt det til Nord-Atlanteren. Ikke avskrift.",
  ], {
    steps: [
      "Pek på figuren når du sier sann/usann.",
      "For b: én setning per proxy — hva, hvor, hvor langt tilbake, hva den sier om AMOC.",
    ],
    figures: ["amoc-nadw", "paleo-proxy"],
  }),

  23: write("Avgrens et område i Norge. Drøft både hydrologi og den økonomiske modellen.", [
    "Økt årsnedbør kommer ujevnt: mer styrtregn og flom/skred noen sesonger, tørke i andre, pluss kryosfærefarer.",
    "Den økonomiske modellen: lengre vekstsesong og turisme mot flom, skred, stormflo, kortere snøsesong og internasjonale kostnader. Usikkerhet i modellen skal med.",
  ], {
    steps: [
      "Velg fylke eller landsdel, ikke «hele Norge».",
      "a: minst to hydrologiske og én kryosfære-fare.",
      "b: to gevinster, to kostnader, og én setning om at modellen er forenklet.",
    ],
  }),
};
