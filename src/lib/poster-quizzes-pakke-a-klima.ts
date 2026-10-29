/**
 * Spørsmål og sammendrag for Geofag 2 pakke A: klimakapitlene (N2–N4) og paleoklima (T2).
 * `G2_KLIMA_SJEKK` og `G2_KLIMA_SAMMENDRAG` spres inn i SJEKK_PAKKE_A og SAMMENDRAG_PAKKE_A.
 */
import type { QuizQuestion } from "@/components/quiz";

export const QUIZ_SJEKK_KLIMA_MENNESKE_1: QuizQuestion[] = [
  {
    prompt: "Hva forteller tallet 1,07 °C i IPCC-tabellen om?",
    options: [
      "Hvor mye varmere det var i 2024 enn i 1990",
      "Det beste anslaget på menneskeskapt oppvarming i 2010–2019 sammenlignet med 1850–1900",
      "Hvor mye de naturlige pådrivene har varmet",
    ],
    answer: 1,
    explain: "Samlet menneskeskapt oppvarming i 2010–2019 er 1,07 °C (spenn 0,8–1,3). Naturlige pådriv ligger mellom −0,1 og 0,1 °C (IPCC, 2021).",
  },
  {
    prompt: "Hvorfor kjøler aerosoler lufta?",
    options: [
      "De sprer blant annet sollys tilbake og skjuler dermed en del av oppvarmingen",
      "De tar opp CO₂ fra lufta",
      "De slipper ut kald luft fra industrien",
    ],
    answer: 0,
    explain: "Partikler, som svovelpartikler fra forbrenning, sprer sollys og gir kjøling. Dermed skjuler de noe av oppvarmingen fra drivhusgassene.",
  },
  {
    prompt: "En vanlig misforståelse er at CO₂-ekvivalenter måler hvor mye CO₂ det er i lufta. Hva er CO₂e egentlig?",
    options: [
      "Konsentrasjonen av CO₂ i ppm",
      "Mengden CO₂ som ville gitt samme oppvarming som utslippet, regnet med GWP",
      "Mengden karbon i havet",
    ],
    answer: 1,
    explain: "CO₂e er et regnestykke for oppvarmingseffekt og sier ikke noe om konsentrasjonen (Forster mfl., 2021).",
  },
];

export const QUIZ_SJEKK_KLIMA_MENNESKE_2: QuizQuestion[] = [
  {
    prompt: "Hva er GWP-100 for metan fra fossile kilder (AR6), og hva er GWP-20?",
    options: ["29,8 og 82,5", "82,5 og 29,8", "273 og 273"],
    answer: 0,
    explain: "Metan varmer mer per tonn de første tiårene fordi den brytes ned på ca. 12 år. Over 100 år er verdien lavere (Forster mfl., 2021).",
  },
  {
    prompt: "IPCCs karbonbudsjett for 1,5 °C med 50 % sannsynlighet var 500 Gt CO₂ fra begynnelsen av 2020. Hva betyr 50 %?",
    options: [
      "Utslipp opp til budsjettet gir like stor sjanse for å holde seg under 1,5 °C som for å gå over",
      "Vi har bare 50 % av budsjettet igjen",
      "Oppvarmingen stopper når halvparten av budsjettet er brukt",
    ],
    answer: 0,
    explain: "Budsjettet er knyttet til en sannsynlighet. Med 83 % sjanse er budsjettet mye mindre (300 Gt CO₂) (IPCC, 2021).",
  },
  {
    prompt: "Hvilket SSP-scenario gir best anslag på 1,4 °C oppvarming i 2081–2100?",
    options: ["SSP1-1.9", "SSP2-4.5", "SSP5-8.5"],
    answer: 0,
    explain: "SSP1-1.9 har netto null CO₂-utslipp rundt 2050. SSP2-4.5 gir 2,7 °C og SSP5-8.5 gir 4,4 °C (IPCC, 2021).",
  },
];

export const QUIZ_KLIMA_MENNESKE: QuizQuestion[] = [
  {
    prompt: "Hva måler GWP?",
    options: [
      "Hvor lenge en gass blir i lufta",
      "Forholdet mellom oppvarmingen fra ett tonn av en gass og fra ett tonn CO₂ over en valgt tidsperiode",
      "Hvor mye av en gass som finnes i lufta",
    ],
    answer: 1,
    explain: "GWP er et forholdstall mellom tidsintegrert strålingspådriv, ikke en rate, og tidsperioden må alltid oppgis (Forster mfl., 2021).",
  },
  {
    prompt: "Hva hører til det langsomme karbonkretsløpet?",
    options: [
      "Fotosyntese og respirasjon",
      "Dannelse av kalkstein og kull, forvitring og vulkanutbrudd",
      "Karbon som løses i regnvann",
    ],
    answer: 1,
    explain: "Det langsomme kretsløpet går gjennom bergarter og sediment og tar tusenvis til millioner av år.",
  },
  {
    prompt: "Hvorfor er CO₂ hovedårsaken til oppvarmingen, selv om metan varmer mer per tonn?",
    options: [
      "Fordi CO₂ ikke kan tas opp av havet",
      "Fordi CO₂-utslippene er så store, og gassen blir så lenge i klimasystemet",
      "Fordi metan ikke er en drivhusgass",
    ],
    answer: 1,
    explain: "Utslippene er store og CO₂ blir værende i hundrevis av år (IPCC, 2021).",
  },
  {
    prompt: "Hva skjer med andelen av CO₂-utslippene som naturen tar opp, jo mer vi har sluppet ut totalt?",
    options: [
      "Den blir mindre",
      "Den er helt fast",
      "Den blir større",
    ],
    answer: 0,
    explain: "IPCC understreker at naturens opptak utgjør en mindre andel jo mer vi har sluppet ut (IPCC, 2021).",
  },
  {
    prompt: "Global Carbon Project beregner at det gjenstår 170 Gt CO₂ for 1,5 °C (50 %) fra begynnelsen av 2026. Fossile utslipp er om lag 38 Gt per år. Omtrent hvor mange år varer budsjettet?",
    options: ["Omtrent 4–5 år", "Omtrent 45 år", "Omtrent 450 år"],
    answer: 0,
    explain: "170 ÷ 38 ≈ 4,5 (Friedlingstein mfl., 2026).",
  },
  {
    prompt: "Hva er et SSP-scenario?",
    options: [
      "En prognose for hva som skjer",
      "En «hva hvis»-beregning for en bestemt utslippsbane og samfunnsutvikling",
      "Et mål i Parisavtalen",
    ],
    answer: 1,
    explain: "SSP er antakelser om samfunn og utslipp som klimamodellene regner på (IPCC, 2021).",
  },
  {
    prompt: "Hva er målet i Parisavtalen?",
    options: [
      "Holde oppvarmingen godt under 2 °C og fortsette arbeidet for 1,5 °C",
      "Kutte alle utslipp med 50 % innen 2020",
      "Stoppe all bruk av kull innen 2030",
    ],
    answer: 0,
    explain: "Målene gjelder oppvarming over førindustrielt nivå, og landene melder inn egne mål (UNFCCC, u.å.).",
  },
  {
    prompt: "Hvilket system dekker det meste av utslippene fra olje- og gassutvinning og industri i Norge?",
    options: ["Innsatsfordelingen", "EUs kvotesystem (EU ETS)", "Klimaavgiften på bensin"],
    answer: 1,
    explain: "Transport, jordbruk og oppvarming av bygg faller i stedet under innsatsfordelingen (Miljødirektoratet, u.å.).",
  },
];

export const QUIZ_SJEKK_KLIMATILTAK_1: QuizQuestion[] = [
  {
    prompt: "Hvor mye må de globale utslippene ned innen 2030 for å holde 1,5 °C, sammenlignet med 2019?",
    options: ["Omtrent 43 %", "Omtrent 5 %", "Omtrent 84 %"],
    answer: 0,
    explain: "43 % innen 2030 og 84 % innen 2050 (IPCC, 2022).",
  },
  {
    prompt: "Hva skjedde med enhetskostnadene for solenergi fra 2010 til 2019?",
    options: ["De falt med 85 %", "De steg med 85 %", "De var omtrent uendret"],
    answer: 0,
    explain: "Vindenergi falt med 55 % og litiumionbatterier med 85 % (IPCC, 2022).",
  },
  {
    prompt: "Hvilket tiltak i arealbruk gir størst potensial ifølge IPCC?",
    options: [
      "Å bevare og restaurere skog og andre økosystemer, og stanse avskoging",
      "Å bygge flere veier",
      "Å tørrlegge myr",
    ],
    answer: 0,
    explain: "Tiltakene har et potensial på 8–14 Gt CO₂e i året til under 100 USD per tonn (IPCC, 2022).",
  },
];

export const QUIZ_SJEKK_KLIMATILTAK_2: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på CCS og CDR?",
    options: [
      "CCS fanger CO₂ ved utslippskilden, mens CDR tar CO₂ ut av lufta",
      "CCS tar CO₂ ut av lufta, mens CDR fanger den ved kilden",
      "Det er to navn på det samme",
    ],
    answer: 0,
    explain: "CCS hindrer nye utslipp. CDR fjerner CO₂ som allerede er sluppet ut (IPCC, 2022).",
  },
  {
    prompt: "Hva kan solstrålingsmodifikasjon (SRM) ikke gjøre ifølge IPCC?",
    options: [
      "Dempe temperaturen i ett til to tiår",
      "Stoppe økningen av CO₂ og havforsuringen",
      "Gi regionale endringer",
    ],
    answer: 1,
    explain: "SRM virker på sollyset og ikke på CO₂-konsentrasjonen, så havforsuringen fortsetter (IPCC, 2023).",
  },
  {
    prompt: "Hva er hovedpoenget med at kutt og tilpasning hører sammen?",
    options: [
      "Kutt begrenser hvor mye klimaet endrer seg, og tilpasning reduserer skadene av endringene som kommer uansett",
      "Tilpasning kan erstatte utslippskutt",
      "Kutt er bare nødvendig i rike land",
    ],
    answer: 0,
    explain: "De svarer på hver sin del av problemet (IPCC, 2023).",
  },
];

export const QUIZ_KLIMATILTAK: QuizQuestion[] = [
  {
    prompt: "Hvilke to hovedtyper virkemidler beskriver IPCC?",
    options: [
      "Reguleringer og økonomiske virkemidler",
      "Subsidier og skatter",
      "Frivillige og lovpålagte",
    ],
    answer: 0,
    explain: "Reguleringer setter krav. Økonomiske virkemidler gir en pris eller støtte (IPCC, 2022).",
  },
  {
    prompt: "Hva er en CO₂-avgift?",
    options: [
      "Et tak på samlede utslipp der kvoter kan handles",
      "En pris per tonn utslipp som staten pålegger",
      "Et forbud mot en teknologi",
    ],
    answer: 1,
    explain: "Kvotehandel er taket der kvoter handles. Avgiften er en pris (IPCC, 2022).",
  },
  {
    prompt: "Hva sier IPCC om karbonprising?",
    options: [
      "Den har fått bedrifter til å velge de rimeligste kuttene, men har alene ikke vært nok til å få fram de dyrere tiltakene",
      "Den har ingen effekt",
      "Den løser alle utslipp alene",
    ],
    answer: 0,
    explain: "Pakker av virkemidler virker bedre enn enkeltvirkemidler (IPCC, 2022).",
  },
  {
    prompt: "Hvorfor er sårbarhet og utslipp ujevnt fordelt?",
    options: [
      "De minst utviklede landene står for få prosent av utslippene, men mange lever i svært sårbare situasjoner",
      "Alle land har like høye utslipp per innbygger",
      "Rike land er alltid mest sårbare",
    ],
    answer: 0,
    explain: "LDC sto for ca. 3,3 % av utslippene i 2019, og 3,3–3,6 milliarder lever i svært sårbare situasjoner (IPCC, 2022; IPCC, 2023).",
  },
  {
    prompt: "Hvorfor er «klimaflyktning» ikke et anerkjent begrep i flyktningkonvensjonen?",
    options: [
      "Konvensjonen gir beskyttelse til dem som har krysset en grense på flukt fra krig, vold eller forfølgelse, og dekker ikke flukt fra tørke eller flom i seg selv",
      "Fordi ingen flykter på grunn av klimaet",
      "Fordi alle klimaflyktninger søker asyl i Europa",
    ],
    answer: 0,
    explain: "De fleste som flykter fra klimarelaterte katastrofer, flytter innenfor eget land (UNHCR, 2023).",
  },
  {
    prompt: "Hvor lagres CO₂ fra Brevik i Northern Lights-prosjektet?",
    options: [
      "I et reservoar under havbunnen i Nordsjøen",
      "I et tomt gruveanlegg på Svalbard",
      "I havvann nær Brevik",
    ],
    answer: 0,
    explain: "CO₂ fraktes med skip til Øygarden og pumpes 100 km i rørledning til et reservoar 2600 m under havbunnen (Equinor, 2025).",
  },
  {
    prompt: "Hva er CDR ment for ifølge IPCC?",
    options: [
      "Å erstatte utslippskutt",
      "Å kompensere for utslipp som er svært vanskelige å unngå",
      "Å fjerne all forurensning",
    ],
    answer: 1,
    explain: "CDR kan ikke erstatte kutt (IPCC, 2022).",
  },
  {
    prompt: "Hva er en risiko ved å stoppe SRM brått under høye utslipp?",
    options: [
      "Klimaet kan endre seg svært raskt",
      "Det blir kaldere enn før",
      "Ingenting skjer",
    ],
    answer: 0,
    explain: "IPCC peker på at SRM gir nye risikoer som ikke er godt forstått (IPCC, 2023).",
  },
];

export const QUIZ_SJEKK_KLIMAFORSKNING_1: QuizQuestion[] = [
  {
    prompt: "Hva gjør IPCC?",
    options: [
      "Egen forskning på klimaet",
      "Vurderer forskning som andre har gjort, og lager rapporter for myndighetene",
      "Bestemmer hvilke klimamål landene skal ha",
    ],
    answer: 1,
    explain: "Forfatterne er forskere som jobber frivillig og vurderer vitenskapelige artikler (IPCC, u.å.-a).",
  },
  {
    prompt: "Hva betyr «svært sannsynlig» i IPCC-språket?",
    options: ["50–66 %", "90–100 %", "99–100 %"],
    answer: 1,
    explain: "«Praktisk talt sikkert» er 99–100 % (IPCC, 2021).",
  },
  {
    prompt: "Hva er Suess-effekten?",
    options: [
      "At lufta blir fattigere på ¹³C og ¹⁴C når vi brenner fossile brensler",
      "At lufta får mer ¹⁴C av kosmisk stråling",
      "At CO₂ er mindre om sommeren",
    ],
    answer: 0,
    explain: "Fossilt karbon har lite ¹³C og ingen ¹⁴C (NOAA GML, u.å.).",
  },
];

export const QUIZ_SJEKK_KLIMAFORSKNING_2: QuizQuestion[] = [
  {
    prompt: "Hva er attribusjon i klimaforskning?",
    options: [
      "Å måle temperatur med satellitt",
      "Å finne ut hvilke årsaker som forklarer en observert endring",
      "Å kalibrere en proxy",
    ],
    answer: 1,
    explain: "Fingeravtrykk og modellkjøringer med og uten menneskelig påvirkning brukes (IPCC, 2021).",
  },
  {
    prompt: "Hva viser modellkjøringer som bare bruker naturlige pådriv (sol og vulkaner)?",
    options: [
      "De gir ikke oppvarmingen siden 1850",
      "De gir like mye oppvarming som observasjonene",
      "De gir sterkere nedkjøling enn observert",
    ],
    answer: 0,
    explain: "Først når menneskelig påvirkning tas med, treffer modellene observasjonene (IPCC, 2021).",
  },
  {
    prompt: "Hva er et fingeravtrykk?",
    options: [
      "Et mønster i data som peker på en bestemt årsak",
      "Et satellittbilde av en bre",
      "En feil i en måleserie",
    ],
    answer: 0,
    explain: "Eksempler er isotoper i CO₂ og oppvarming av troposfæren samtidig som nedre stratosfære kjøles (IPCC, 2021).",
  },
];

export const QUIZ_KLIMAFORSKNING: QuizQuestion[] = [
  {
    prompt: "Hvem godkjenner sammendraget for beslutningstakere (SPM) i en IPCC-rapport?",
    options: [
      "Delegater fra regjeringene, linje for linje, i dialog med forfatterne",
      "Bare forfatterne",
      "FNs generalsekretær",
    ],
    answer: 0,
    explain: "Selve rapporten blir akseptert av arbeidsgruppen uten linje-for-linje-behandling (IPCC, u.å.-b).",
  },
  {
    prompt: "Hva tar arbeidsgruppe II for seg?",
    options: [
      "Det fysiske grunnlaget",
      "Konsekvenser, tilpasning og sårbarhet",
      "Tiltak for å redusere utslipp",
    ],
    answer: 1,
    explain: "Arbeidsgruppe I tar for seg det fysiske grunnlaget, og arbeidsgruppe III utslippskutt (IPCC, u.å.-a).",
  },
  {
    prompt: "Hva måler Argo-flyterne?",
    options: [
      "Temperatur og saltholdighet i havet",
      "CO₂ i lufta",
      "Havnivå fra satellitt",
    ],
    answer: 0,
    explain: "Dataene viser hvor mye varme havet lagrer (Argo, u.å.).",
  },
  {
    prompt: "Hva forklarer sagtannen i Keeling-kurven?",
    options: [
      "Planter på den nordlige halvkule tar opp CO₂ om sommeren og slipper den ut om høsten og vinteren",
      "Målefeil i instrumentene",
      "Vulkanutbrudd hvert år",
    ],
    answer: 0,
    explain: "Det jevnt stigende trendet kommer av utslipp fra mennesker (NOAA GML, u.å.).",
  },
  {
    prompt: "Hvilken satellitt i Sentinel-programmet er en radarhøydemåler for havnivå?",
    options: ["Sentinel-2", "Sentinel-5P", "Sentinel-6"],
    answer: 2,
    explain: "Sentinel-5P måler gasser og partikler, og Sentinel-2 tar bilder av vegetasjon og kyst (ESA, u.å.).",
  },
  {
    prompt: "Hvorfor brukes proxyer?",
    options: [
      "Instrumentene har bare målt i noen få hundre år, og proxyene viser klima før det",
      "Fordi satellitter ikke fungerer",
      "Fordi proxyer er mer nøyaktige enn termometre",
    ],
    answer: 0,
    explain: "Proxyene kalibreres mot instrumentdata i overlappingsperioden (IPCC, 2021).",
  },
  {
    prompt: "Hvilken påstand om en kald vinter og global oppvarming er riktig?",
    options: [
      "Den motbeviser oppvarmingen",
      "Vær er det som skjer på ett sted over kort tid, mens klima er gjennomsnittet over mange år",
      "Kalde vintre skjer aldri lenger",
    ],
    answer: 1,
    explain: "Derfor kan en kald vinter ikke brukes som bevis mot global oppvarming.",
  },
  {
    prompt: "Hva betyr intervallet [0,8 til 1,3] i en IPCC-rapport?",
    options: [
      "Det er et svært sannsynlig område, altså et intervall på 90 %",
      "At forskerne gjetter",
      "At tallet er feil",
    ],
    answer: 0,
    explain: "Intervallet viser hvor godt vi kjenner tallet (IPCC, 2021).",
  },
];

export const QUIZ_SJEKK_PALEO_7: QuizQuestion[] = [
  {
    prompt: "Hvordan dateres dryppstein?",
    options: [
      "Med C-14",
      "Med forholdet mellom uran og thorium (U–Th)",
      "Med årringer",
    ],
    answer: 1,
    explain: "Uran følger med vannet inn i kalken, men thorium gjør det ikke (Wendt mfl., 2021).",
  },
  {
    prompt: "Hva viser δ¹³C i dryppstein?",
    options: [
      "Hvor mye is det var på land",
      "Planteveksten og vegetasjonstypen i jorda over grotta",
      "Temperaturen i verdensrommet",
    ],
    answer: 1,
    explain: "Det er ¹³C og ikke «¹³O». δ¹⁸O i dryppstein henger sammen med nedbøren (Nehme og Deininger, 2017).",
  },
];

export const QUIZ_SJEKK_PALEO_8: QuizQuestion[] = [
  {
    prompt: "Hvilken bergart tyder på istid?",
    options: ["Evaporitt", "Tillitt", "Kull"],
    answer: 1,
    explain: "Tillitt er forsteinet morene (Rüther, 2026).",
  },
  {
    prompt: "Hva tyder store saltlag av evaporitt på?",
    options: [
      "Tørt og varmt klima med mye fordamping",
      "Kalde breer",
      "Frodig skog",
    ],
    answer: 0,
    explain: "Evaporitter dannes når sjøvann eller vann i innsjøer uten avløp fordamper (Selbekk, 2025).",
  },
];

export const G2_KLIMA_SJEKK: Record<string, QuizQuestion[]> = {
  KlimaMenneske1: QUIZ_SJEKK_KLIMA_MENNESKE_1,
  KlimaMenneske2: QUIZ_SJEKK_KLIMA_MENNESKE_2,
  Klimatiltak1: QUIZ_SJEKK_KLIMATILTAK_1,
  Klimatiltak2: QUIZ_SJEKK_KLIMATILTAK_2,
  Klimaforskning1: QUIZ_SJEKK_KLIMAFORSKNING_1,
  Klimaforskning2: QUIZ_SJEKK_KLIMAFORSKNING_2,
  Paleo7: QUIZ_SJEKK_PALEO_7,
  Paleo8: QUIZ_SJEKK_PALEO_8,
};

export const G2_KLIMA_SAMMENDRAG: Record<string, readonly string[]> = {
  KlimaMenneske: [
    "GWP sier hvor mye ett tonn av en gass varmer sammenlignet med CO₂ over en valgt tidsperiode. Metan har GWP 82,5 over 20 år og 29,8 over 100 år.",
    "Det raske karbonkretsløpet går gjennom lufta, havet og levende organismer. Det langsomme går gjennom bergarter og tar tusenvis til millioner av år. Fossile brensler flytter karbon fra det langsomme til det raske.",
    "Menneskeskapt oppvarming er 1,07 °C i 2010–2019 sammenlignet med 1850–1900. Naturlige pådriv ligger mellom −0,1 og 0,1 °C.",
    "Karbonbudsjettet for 1,5 °C er et regnestykke med sannsynlighet. Global Carbon Project beregner at det gjenstår om lag 170 Gt CO₂ for 50 % sjanse, noe som tilsvarer om lag fire år med dagens utslipp.",
    "SSP-scenariene er «hva hvis»-baner for utslipp. De gir fra 1,4 °C (SSP1-1.9) til 4,4 °C (SSP5-8.5) oppvarming i 2081–2100.",
    "Parisavtalen har som mål å holde oppvarmingen godt under 2 °C og arbeide for 1,5 °C. Norge har lovfestet minst 55 % kutt innen 2030 sammenlignet med 1990, og er med i EUs kvotesystem.",
  ],
  Klimatiltak: [
    "For å holde 1,5 °C må globale utslipp ned 43 % innen 2030 og 84 % innen 2050 sammenlignet med 2019. IPCC peker på fire hovedgrep: fornybar energi, mindre energibruk, kutt i andre gasser enn CO₂ og fjerning av CO₂.",
    "Sol og vind har blitt mye billigere: enhetskostnadene falt 85 % og 55 % fra 2010 til 2019. Tiltak i arealbruk, spesielt å stanse avskoging, har et potensial på 8–14 Gt CO₂e i året.",
    "Virkemidler er reguleringer og økonomiske virkemidler, som CO₂-avgift og kvotehandel. Pakker av virkemidler virker bedre enn enkeltvirkemidler.",
    "Utslipp og sårbarhet er ujevnt fordelt. Begrepet «klimaflyktning» er ikke anerkjent i folkeretten, og de fleste som flykter fra klimarelaterte katastrofer flytter innenfor eget land.",
    "CCS fanger CO₂ ved kilden, og CDR tar CO₂ ut av lufta. De er ment for utslipp som er svært vanskelige å unngå, og kan ikke erstatte utslippskutt.",
    "Solstrålingsmodifikasjon (SRM) kan dempe temperaturen, men ikke CO₂-økningen eller havforsuringen. Kutt og tilpasning svarer på hver sin del av problemet og må sees sammen.",
  ],
  Klimaforskning: [
    "IPCC ble opprettet i 1988. Panelet gjør ikke egen forskning, men forskere vurderer forskning fra hele verden. Sammendraget for beslutningstakere godkjennes linje for linje av regjeringene.",
    "IPCC bruker et fast språk for sikkerhet og sannsynlighet. «Svært sannsynlig» betyr 90–100 %, og tall i firkantklammer viser vanligvis et intervall på 90 %.",
    "Observasjoner kommer fra stasjoner, radiosonder, Argo-flytere, satellitter og droner. Keeling-kurven har målt CO₂ på Mauna Loa siden 1958.",
    "Karbon fra fossile brensler har lite ¹³C og ingen ¹⁴C. Derfor blir lufta fattigere på disse isotopene når vi brenner dem. Det kalles Suess-effekten.",
    "Proxyer, som iskjerner, årringer og dryppstein, viser klimaet før målingene begynte. De kalibreres mot instrumentdata.",
    "Fingeravtrykk og modellkjøringer med og uten menneskelig påvirkning viser at oppvarmingen siden 1850 ikke kan forklares uten menneskelig påvirkning.",
  ],
};
