import type { QuizQuestion } from "@/components/quiz";

/** Sjekk deg selv og sluttquiz for Pakke B. Hvert spørsmål har tre svaralternativer. */

export const QUIZ_SJEKK_SKYER_1: QuizQuestion[] = [
  {
    prompt: "Hva er duggpunktet?",
    options: [
      "Temperaturen der vann fryser til is.",
      "Temperaturen lufta må kjøles ned til for å bli mettet, ved uendret trykk og innhold av vanndamp.",
      "Det høyeste trykket lufta kan ha før det dannes dugg.",
    ],
    answer: 1,
    explain:
      "Duggpunktet er temperaturen der lufta blir mettet. Under den går damp som regel over til væske, og det dannes tåke, dis eller skyer.",
  },
  {
    prompt: "Lufttemperaturen er 20 °C og duggpunktet er 14 °C. Omtrent hvor høyt over bakken ligger skybunnen etter tommelregelen på 125 m per grad?",
    options: ["Omtrent 250 m", "Omtrent 750 m", "Omtrent 2 500 m"],
    answer: 1,
    explain:
      "Forskjellen er 6 grader. 6 · 125 m = 750 m. Regelen er en tilnærming.",
  },
  {
    prompt: "Hvorfor sier relativ fuktighet lite om hvor mye vanndamp lufta faktisk inneholder?",
    options: [
      "Fordi den måles i prosent, og prosent kan ikke brukes til damp.",
      "Fordi den er forholdet til det høyeste mulige innholdet, og det avhenger av temperaturen.",
      "Fordi den bare gjelder over havet.",
    ],
    answer: 1,
    explain:
      "Varm luft kan romme mye mer damp enn kald luft. Det høyeste innholdet halveres omtrent for hver 10 °C. Derfor bruker meteorologene duggpunkt.",
  },
];

export const QUIZ_SJEKK_SKYER_2: QuizQuestion[] = [
  {
    prompt: "Hva er en kondensasjonskjerne?",
    options: [
      "En liten partikkel, for eksempel støv, sot eller pollen, som vanndamp kondenserer på.",
      "Midten av en tordensky.",
      "Et område der lufta er overmettet.",
    ],
    answer: 0,
    explain: "Vanndamp kondenserer lettest på små partikler. Uten partikler blir det vanskelig å danne skydråper.",
  },
  {
    prompt: "Hva er en underkjølt vanndråpe?",
    options: [
      "En dråpe som har fryst til is.",
      "En flytende dråpe ved temperatur under 0 °C.",
      "En dråpe som er kaldere enn lufta rundt.",
    ],
    answer: 1,
    explain: "Underkjølte dråper er vanlige i skyer ned til omtrent −15 °C.",
  },
  {
    prompt: "Hvilke av disse er lave skyer?",
    options: [
      "Fjærskyer (Ci) og slørskyer (Cs).",
      "Rukleskyer (Ac) og lagskyer (As).",
      "Bukleskyer (Sc) og haugskyer (Cu).",
    ],
    answer: 2,
    explain: "Lave skyer er Sc, St, Cu og Cb. Høye er Ci, Cc og Cs. Middels høye er Ac, As og Ns.",
  },
];

export const QUIZ_SJEKK_SKYER_3: QuizQuestion[] = [
  {
    prompt: "Hva skiller orografisk nedbør fra de andre typene?",
    options: [
      "Lufta løftes fordi den tvinges opp langs en fjellside.",
      "Lufta løftes fordi sola varmer bakken.",
      "Lufta løftes fordi den glir opp over kaldere luft.",
    ],
    answer: 0,
    explain:
      "Orografisk betyr knyttet til fjell. Konveksjon er stigning på grunn av oppvarming, og frontal nedbør kommer der varm luft glir opp over kaldere luft.",
  },
  {
    prompt: "Hvilken nedbørtype har kraftigst opptrekk?",
    options: [
      "Konvektiv nedbør, med 1–10 m/s.",
      "Frontal nedbør, med 1–10 m/s.",
      "Orografisk nedbør, med 10–100 m/s.",
    ],
    answer: 0,
    explain: "Konvektive bygeskyer har opptrekk på 1–10 m/s. Frontal og orografisk løfting gir omtrent 0,1–1,0 m/s.",
  },
  {
    prompt: "Hvor mange liter vann tilsvarer 1 mm nedbør på en kvadratmeter?",
    options: ["0,1 liter", "1 liter", "10 liter"],
    answer: 1,
    explain: "1 mm nedbør tilsvarer 1 liter per kvadratmeter.",
  },
];

export const QUIZ_SJEKK_SKYER_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor har Bergen en mindre forskjell mellom varmeste og kaldeste måned enn Nesbyen?",
    options: [
      "Fordi havet tar opp og avgir varme langsommere enn land.",
      "Fordi Bergen ligger lenger sør.",
      "Fordi det regner mindre i Bergen.",
    ],
    answer: 0,
    explain:
      "Kystklimaet er mildere fordi havet jevner ut temperaturen. Bergen og Nesbyen ligger omtrent på samme breddegrad, og det regner mye mer i Bergen enn i Nesbyen.",
  },
  {
    prompt: "Hva viser et klimadiagram?",
    options: [
      "Månedlig middeltemperatur som kurve og månedlig nedbør som søyler.",
      "Daglig temperatur gjennom ett år.",
      "Lufttrykket gjennom et døgn.",
    ],
    answer: 0,
    explain: "Diagrammet bygger på normalverdier over 30 år og viser årstidene på ett sted.",
  },
  {
    prompt: "Hvilken normalperiode brukes som standard i Norge fra 2021?",
    options: ["1931–1960", "1961–1990", "1991–2020"],
    answer: 2,
    explain: "Fra 1. januar 2021 erstatter 1991–2020 perioden 1961–1990.",
  },
];

export const QUIZ_SJEKK_SKYER_5: QuizQuestion[] = [
  {
    prompt: "Hva kjennetegner sone E i Köppens system?",
    options: [
      "Kaldeste måned er under −3 °C.",
      "Varmeste måned er under +10 °C.",
      "Middeltemperaturen er minst 18 °C i alle måneder.",
    ],
    answer: 1,
    explain: "E er polart klima. A har minst 18 °C i alle måneder, og D har kaldeste måned under −3 °C og varmeste minst +10 °C.",
  },
  {
    prompt: "Bergen har kaldeste måned 2,3 °C, varmeste måned 15,6 °C og fem måneder med minst 10 °C. Hva blir klassen?",
    options: ["Cfb", "Dfc", "ET"],
    answer: 0,
    explain: "Kaldeste måned over −3 °C gir C. Fuktig hele året gir f. Varmeste måned under 22 °C og minst fire måneder med minst 10 °C gir b.",
  },
  {
    prompt: "Hva har skjedd med Köppen-kartet for Norge mellom 1961–90 og 1991–2020?",
    options: [
      "Det polare klimaet er sterkt redusert, og det varmtemperte har økt i Sør-Norge.",
      "Det polare klimaet har økt.",
      "Ingenting, kartene er like.",
    ],
    answer: 0,
    explain: "Det viser Meteorologisk institutts Köppen-kart for de to normalperiodene.",
  },
];

export const QUIZ_SKYER: QuizQuestion[] = [
  {
    prompt: "Hva skjer med lufta når den stiger?",
    options: [
      "Den utvider seg og kjøles ned, og kan bli mettet.",
      "Den trekker seg sammen og varmes opp.",
      "Den beholder samme temperatur.",
    ],
    answer: 0,
    explain: "Lavere trykk i høyden gjør at lufta utvider seg og kjøles. Blir den mettet, dannes skyer.",
  },
  {
    prompt: "Hvilken gruppe er knyttet til bygeskyer, altså konveksjon?",
    options: ["Cb", "Ci", "St"],
    answer: 0,
    explain: "Bygeskyer (Cb) dannes ved konveksjon og gir byger.",
  },
  {
    prompt: "Hva skjer på lesiden av et fjell når lufta har gitt fra seg nedbør på luvsiden?",
    options: [
      "Lufta er tørrere.",
      "Lufta er fuktigere.",
      "Det er alltid tåke.",
    ],
    answer: 0,
    explain: "Orografisk nedbør faller på luvsiden, og lufta på lesiden er tørrere.",
  },
  {
    prompt: "Hva er en urban varmeøy?",
    options: [
      "En by der temperaturen som regel er høyere enn i omgivelsene på landet.",
      "En øy i havet med varmt klima.",
      "En by som ligger høyt over havet.",
    ],
    answer: 0,
    explain: "Overflater i byen tar opp og holder på varme annerledes enn omgivelsene. Vegetasjon virker kjølende.",
  },
  {
    prompt: "Hva er nødvendig for at et sted skal få klassen D i Köppens system, ifølge Store norske leksikon?",
    options: [
      "Kaldeste måned under −3 °C og varmeste måned minst +10 °C.",
      "Alle måneder under 0 °C.",
      "Årsnedbør over 2 000 mm.",
    ],
    answer: 0,
    explain: "Det gir kaldtemperert klima. Grensen mot C varierer mellom kilder, så sjekk alltid hvilken grense et kart bruker.",
  },
];

/** Pakke B / T3: Værkart, radar, satellitt, egne observasjoner og fartsregning. */
export const QUIZ_SJEKK_VAERKART_5: QuizQuestion[] = [
  {
    prompt: "Hva måler et infrarødt satellittbilde?",
    options: [
      "Sollys som blir kastet tilbake fra skyene",
      "Varmen som stråler ut fra skyer og bakke",
      "Hvor mye nedbør som har falt ved bakken",
    ],
    answer: 1,
    explain: "Infrarøde bilder måler varmestråling, og derfor virker de både dag og natt. Visuelle bilder bruker sollys og virker bare om dagen.",
  },
  {
    prompt: "Hvorfor kan en værradar overse lave byger langt unna radaren?",
    options: [
      "Strålen er høyere over bakken lenger unna, på grunn av jordkrumningen",
      "Radaren måler bare vind og ikke nedbør",
      "Regndråper er for store til å gi ekko",
    ],
    answer: 0,
    explain: "Ved 240 km er strålen 5–6 km over bakken. Da kan strålen gå over byger som ligger lavt.",
  },
  {
    prompt: "En front flytter seg 240 km på 6 timer. Hva er farten?",
    options: ["40 km/t", "60 km/t", "1 440 km/t"],
    answer: 0,
    explain: "Fart er avstand delt på tid: 240 km / 6 t = 40 km/t.",
  },
];

/** Pakke B / T4: Kryosfæren, bretyper, måling, havisdannelse, snø og permafrostsoner. */
export const QUIZ_SJEKK_KRYO_4: QuizQuestion[] = [
  {
    prompt: "Hva kjennetegner en tempert bre, slik vi har i Norge?",
    options: [
      "Isen har temperatur nær smeltepunktet hele året, så det drenerer vann ut av breen selv midtvinters.",
      "Hele isen ligger langt under 0 °C, så det kommer aldri smeltevann.",
      "Den finnes bare i Antarktis.",
    ],
    answer: 0,
    explain: "I tempererte breer er isen nær smeltepunktet året rundt. Bare de øverste få meterne blir kaldere enn 0 °C om vinteren.",
  },
  {
    prompt: "Hva er en jøkullaup?",
    options: [
      "Et snøskred av vannmettet snø",
      "Et framstøt der breen øker farten til over 100 meter i døgnet",
      "En flom som oppstår når en bredemt innsjø plutselig tømmes",
    ],
    answer: 2,
    explain: "Jøkullaup er flom fra bredemte innsjøer. I Norge er det laget tunneler for å tappe slike innsjøer, blant annet ved Hardangerjøkulen.",
  },
  {
    prompt: "Hvorfor finnes det ikke is eldre enn 1000–2000 år i Norge, når isen nær bunnen av innlandsisen i Antarktis er mange hundre tusen år gammel?",
    options: [
      "Norske breer består av en annen type is.",
      "I Norge snør det mye, og isen siger ned i dalene og smelter bort. I Antarktis snør det lite, og isen siger svært sakte.",
      "Norske breer ble først dannet etter 1900.",
    ],
    answer: 1,
    explain: "Alderen avhenger av hvor mye snø som faller, hvor fort isen beveger seg og hvor tykk den er.",
  },
];

export const QUIZ_SJEKK_KRYO_5: QuizQuestion[] = [
  {
    prompt: "Hvorfor dannes havis langsommere enn ferskvannsis?",
    options: [
      "Havvann må kjøles til rundt −1,8 °C, og kaldt saltvann blir tyngre og synker før det fryser.",
      "Salt gjør at havvann ikke kan fryse.",
      "Havvann inneholder for lite luft.",
    ],
    answer: 0,
    explain: "Vanligvis må de øverste 100–150 meterne av havet kjøles ned til frysepunktet før havis kan dannes.",
  },
  {
    prompt: "Det faller 30 cm tørr nysnø med vannverdi 0,1. Hvor mye nedbør tilsvarer det?",
    options: ["3 mm", "30 mm", "300 mm"],
    answer: 1,
    explain: "30 cm · 0,1 = 3 cm vann, altså 30 mm.",
  },
  {
    prompt: "Et område har diskontinuerlig permafrost. Hvor stor del av landarealet inneholder sannsynligvis permafrost?",
    options: ["10–50 prosent", "50–90 prosent", "90–100 prosent"],
    answer: 1,
    explain: "Kontinuerlig er 90–100 prosent, diskontinuerlig 50–90, sporadisk 10–50 og isolert under 10 prosent.",
  },
];

/* N6: Naturlige klimapådriv */

export const QUIZ_SJEKK_NATURLIG_1: QuizQuestion[] = [
  {
    prompt: "Hvor lang er perioden til solsyklusen?",
    options: ["Mellom 8 og 14 år", "Omtrent 100 år", "Omtrent 41 000 år"],
    answer: 0,
    explain: "Solsyklusen har en periode på mellom 8 og 14 år, og i gjennomsnitt 11 år. Gleissberg-syklusen er omtrent 100 år, og 41 000 år hører til jordaksens helning.",
  },
  {
    prompt: "Maunder-minimum (1645–1715) ligger inne i den lille istiden. Hva sier Owens mfl. (2017) om det?",
    options: [
      "Det beviser at lite sol var hovedårsaken til kulden.",
      "Tidspunktet alene er ikke et bevis på årsak, og vulkansk aktivitet var avgjørende.",
      "Det viser at sola aldri påvirker klimaet.",
    ],
    answer: 1,
    explain: "Forfatterne skriver at plasseringen i tid ikke tyder på årsakssammenheng. Vulkansk aktivitet var avgjørende, og nedgangen i solenergi bidro trolig i samme størrelsesorden som endret arealbruk.",
  },
  {
    prompt: "Endringen i solinnstråling fra 1850–1900 til 2010–2019 er vurdert til 0,01 W/m². Hvor mye kan det gi i global temperaturendring?",
    options: ["Høyst 0,01 °C", "Omtrent 1 °C", "Omtrent 5 °C"],
    answer: 0,
    explain: "NOAA oppgir at IPCCs beste estimat gir høyst 0,01 °C. Den menneskeskapte oppvarmingen er 1,07 °C, omtrent hundre ganger mer.",
  },
];

export const QUIZ_SJEKK_NATURLIG_2: QuizQuestion[] = [
  {
    prompt: "Hva menes med en hypotese i dette kapitlet?",
    options: [
      "En forklaring som kan prøves mot data, men som ikke er bevist.",
      "En forklaring som er bevist uten tvil.",
      "En måling fra en iskjerne.",
    ],
    answer: 0,
    explain: "Drake-stredet, Panama og Himalaya er hypoteser om hva som drev avkjølingen i kenozoikum. Nye data kan støtte eller svekke dem.",
  },
  {
    prompt: "Hva passer best med dataene for oppstarten av isen på Antarktis for omtrent 34 millioner år siden, ifølge Hutchinson mfl. (2021)?",
    options: [
      "Et fall i CO₂ på omtrent 40 %",
      "At sola ble kraftig svakere",
      "At Panama-landbroen ble lukket",
    ],
    answer: 0,
    explain: "Modellene passer best med et CO₂-fall på omtrent 40 %, til omtrent 325 ppm. Åpning av havpassasjer ga bare en moderat endring i varmetransporten.",
  },
  {
    prompt: "Når ble Panama-landbroen dannet i streng forstand, ifølge O'Dea mfl. (2016)?",
    options: ["For omtrent 2,8 millioner år siden", "For omtrent 50 millioner år siden", "For omtrent 100 000 år siden"],
    answer: 0,
    explain: "Etter gjennomgang av bergarter, fossiler og gener kom O'Dea mfl. fram til omtrent 2,8 millioner år siden. Bevisene for en eldre landbro er ikke avgjørende.",
  },
];

export const QUIZ_SJEKK_NATURLIG_3: QuizQuestion[] = [
  {
    prompt: "Hvor lenge siden begynte fritt oksygen fra tidlig biologisk produksjon å øke i atmosfæren, ifølge Lyons mfl. (2014)?",
    options: ["For omtrent 2,5 milliarder år siden", "For omtrent 2,5 millioner år siden", "For omtrent 2 500 år siden"],
    answer: 0,
    explain: "Økningen skjedde for omtrent 2,5 milliarder år siden. Nær dagens nivåer ble nådd først omtrent to milliarder år seinere.",
  },
  {
    prompt: "Hva skjedde med CO₂ da store mengder organisk karbon ble begravd og ble til kull sent i karbon og tidlig i perm?",
    options: ["CO₂ falt kraftig.", "CO₂ steg kraftig.", "CO₂ var uendret."],
    answer: 0,
    explain: "Høy begraving av organisk karbon henger sammen med et stort fall i CO₂. I tidlig perm var CO₂ 100 ± 80 ppm, og i Feulners modell gir under 40 ppm global nedising.",
  },
  {
    prompt: "Når ble C4-gress økologisk dominerende?",
    options: ["For 3–8 millioner år siden", "For 300–800 millioner år siden", "For 3–8 tusen år siden"],
    answer: 0,
    explain: "Edwards mfl. (2010) oppgir 3–8 millioner år siden, og at mønstrene og årsakene er mer sammensatte enn man først antok.",
  },
];

export const QUIZ_SJEKK_NATURLIG_4: QuizQuestion[] = [
  {
    prompt: "Hva er indre variabilitet?",
    options: [
      "Svingninger i selve klimasystemet, uten nytt pådriv utenfra.",
      "Endringer som bare kommer fra vulkanutbrudd.",
      "Endringer som bare kommer fra menneskelige utslipp.",
    ],
    answer: 0,
    explain: "Indre variabilitet er svingninger i klimasystemet selv. ENSO, IOD, NAO og AMV er eksempler.",
  },
  {
    prompt: "Hva er forskjellen på AMV og AMOC?",
    options: [
      "AMV er svingninger i havtemperaturen i Nord-Atlanteren, AMOC er omveltningssirkulasjonen.",
      "AMV og AMOC er to navn på det samme.",
      "AMV er en vulkan, og AMOC er en solsyklus.",
    ],
    answer: 0,
    explain: "AMV beskriver variasjon i havtemperaturen over tiår. AMOC er et strømsystem i Atlanterhavet.",
  },
  {
    prompt: "Hva skjedde i 1998–2012 ifølge IPCC?",
    options: [
      "Indre variabilitet og sol- og vulkanpådriv maskerte delvis den menneskeskapte oppvarmingen.",
      "Oppvarmingen stoppet helt og for alltid.",
      "Sola ble kraftig sterkere.",
    ],
    answer: 0,
    explain: "IPCC (2021) skriver at indre variabilitet på tiårsskala og sol- og vulkanpådriv delvis maskerte oppvarmingen i den perioden.",
  },
];

export const QUIZ_NATURLIG: QuizQuestion[] = [
  {
    prompt: "Hvor lenge varer kjølingen etter et stort eksplosivt vulkanutbrudd, ifølge IPCC?",
    options: ["1–3 år", "Omtrent 100 år", "Omtrent 1 million år"],
    answer: 0,
    explain: "Et stort eksplosivt utbrudd kjøler ned global temperatur og reduserer nedbøren i 1–3 år.",
  },
  {
    prompt: "Hvilken prosess har den lengste tidsskalaen i denne listen?",
    options: ["Platetektonikk", "Solsyklusen", "AMV"],
    answer: 0,
    explain: "Platetektonikk virker over titalls millioner år. Solsyklusen har en periode på 8–14 år, og AMV svinger fra ett tiår til det neste.",
  },
  {
    prompt: "Hva er forklaringen på at solsyklusen gir så liten temperaturendring?",
    options: [
      "Lysstyrken varierer bare med opptil 1 W/m² av 1 361 W/m², omtrent 0,1 %.",
      "Sola er ikke en stjerne.",
      "Solflekker er varmere enn omgivelsene.",
    ],
    answer: 0,
    explain: "I en sterk solsyklus varierer lysstyrken med opptil 1 W/m², og temperaturen på jorda endres med 0,1 °C eller mindre. Solflekker er om lag 1 500 K kjøligere enn omgivelsene.",
  },
  {
    prompt: "Hva sier Raymo og Ruddiman (1992) om Himalaya og CO₂?",
    options: [
      "Tektonisk drevet økt forvitring kan ha gitt lavere CO₂. Det er en hypotese.",
      "Himalaya slipper ut CO₂ og varmet opp jorda.",
      "Himalaya har ingen betydning for CO₂.",
    ],
    answer: 0,
    explain: "Forfatterne skriver at økt kjemisk forvitring kan ha ført til lavere CO₂ de siste 40 millioner årene.",
  },
  {
    prompt: "IPCC: Menneskeskapt oppvarming 1850–1900 til 2010–2019 er 1,07 °C. Hva er bidraget fra sol og vulkaner?",
    options: ["Mellom −0,1 og +0,1 °C", "Omtrent 1 °C", "Omtrent 3 °C"],
    answer: 0,
    explain: "IPCC vurderer at naturlige pådrivere (sol og vulkaner) endret temperaturen med mellom −0,1 og +0,1 °C. Indre variabilitet bidro med mellom −0,2 og +0,2 °C.",
  },
  {
    prompt: "Hvorfor foretrekker IPCC AR6 AMV framfor AMO?",
    options: [
      "Det finnes ingen bestemt tidsskala for svingningen, og ordet oscillasjon antyder det.",
      "AMO er et annet hav.",
      "AMV er en nyere vulkan.",
    ],
    answer: 0,
    explain: "Ordet oscillasjon antyder en bestemt periode, og det passer ikke for tiårsvariasjonen i Nord-Atlanteren.",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_7: QuizQuestion[] = [
  {
    prompt: "Hvor stor del av jordoverflaten er dyphavsslettene, og på hvilket dyp ligger de?",
    options: [
      "Nesten 30 %, på 4 000–6 000 meters dyp",
      "Omtrent 2 %, på 100–200 meters dyp",
      "Omtrent 70 %, på 10 000 meters dyp",
    ],
    answer: 0,
    explain: "Dyphavsslettene ligger på 4 000–6 000 meters dyp og dekker nesten 30 % av jordoverflaten. Havet som helhet dekker 70,8 %.",
  },
  {
    prompt: "Hvor kommer klor og svovel i havet fra?",
    options: [
      "Fra forvitring av berg på land, som elvene fører ut",
      "Fra reaksjoner knyttet til vulkansk aktivitet langs midthavsryggene",
      "Fra nedbør som faller direkte i havet",
    ],
    answer: 1,
    explain: "Berggrunnen inneholder nesten ikke klor. Klor og svovel kommer fra reaksjoner knyttet til vulkansk aktivitet langs midthavsryggene. Natrium kommer fra forvitring og elver.",
  },
  {
    prompt: "Hva betyr en saltholdighet på 35 g/kg?",
    options: [
      "35 gram oppløst salt per kilo sjøvann",
      "35 gram vann per kilo salt",
      "35 liter salt i en kubikkmeter vann",
    ],
    answer: 0,
    explain: "Saltholdighet er antall gram oppløst salt per kilo vann. Gjennomsnittet i havet er omtrent 35 g/kg.",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_8: QuizQuestion[] = [
  {
    prompt: "Hva er en termoklin?",
    options: [
      "Et sjikt der saltholdigheten endrer seg mye med dypet",
      "Overgangen mellom varmt, blandet overflatevann og kaldere dypvann",
      "En havstrøm som går langs bunnen",
    ],
    answer: 1,
    explain: "En termoklin er overgangslaget mellom varmt, blandet overflatevann og kaldere dypvann. Et sjikt med stor endring i saltholdighet kalles en halokline.",
  },
  {
    prompt: "Hva kan gi en sesonghalokline i subpolare strøk?",
    options: [
      "Ferskvann fra regn, elver og issmelting",
      "Sterk oppvelling av salt dypvann",
      "Bare tidevann",
    ],
    answer: 0,
    explain: "Ferskvann i overflaten gjør vannet lettere og gir et sjikt med stor saltforskjell. Sesonglagene forsvinner hver vinter.",
  },
  {
    prompt: "Hvor tykt er det varme laget over en termoklin viktig for?",
    options: ["Orkanvarsler", "Jordskjelvvarsler", "Måling av tidevann"],
    answer: 0,
    explain: "NOAA oppgir at tykkelsen på det varme laget over en termoklin har betydning for orkanvarsler.",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_9: QuizQuestion[] = [
  {
    prompt: "To vannmasser med saltholdighet 35 og 37 blandes, og blandingen får 36. Hvordan er blandingsforholdet?",
    options: [
      "Like store volumer av hver",
      "Tre deler med 35 og én del med 37",
      "Bare vannet med 37 er med",
    ],
    answer: 0,
    explain: "36 ligger midt mellom 35 og 37, så blandingen har like store volumer av begge. I et T–S-diagram ligger blandingen på en rett linje mellom de to punktene.",
  },
  {
    prompt: "Hva kjennetegner antarktisk mellomvann i Atlanterhavet?",
    options: [
      "Et saltholdighetsmaksimum på 1 500–3 000 meters dyp",
      "Et saltholdighetsminimum på omtrent 500–1 000 meters dyp sør for 20° N",
      "En temperatur på 13 °C og 38,45 psu",
    ],
    answer: 1,
    explain: "Antarktisk mellomvann har et saltholdighetsminimum. Saltholdighetsmaksimum på 1 500–3 000 meter er Nord-Atlantisk dypvann, og 13 °C og 38,45 psu er middelhavsvann ved Gibraltar.",
  },
  {
    prompt: "Hva er forskjellen på AMV og AMOC?",
    options: [
      "AMV er svingninger i havtemperaturen i Nord-Atlanteren, AMOC er en sirkulasjon av vann",
      "De er to navn på det samme",
      "AMV er en havstrøm, AMOC er en temperatur",
    ],
    answer: 0,
    explain: "AMV (tidligere AMO) er svingninger i temperaturen ved havoverflaten. AMOC er den atlantiske omveltningssirkulasjonen.",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_10: QuizQuestion[] = [
  {
    prompt: "Hvor mange store havvirvler finnes det, ifølge NOAA?",
    options: ["Tre", "Fem", "Tolv"],
    answer: 1,
    explain: "Det er fem: én i Indiahavet og to i hvert av Atlanterhavet og Stillehavet.",
  },
  {
    prompt: "Hvorfor er navnet «søppelflekk» misvisende?",
    options: [
      "Fordi det meste er små biter som flyter spredt i vannet, og ikke en øy av søppel",
      "Fordi det ikke finnes plast i havet",
      "Fordi flekken ligger på land",
    ],
    answer: 0,
    explain: "NOAA sammenligner det med pepperflak i en suppe. Det går an å seile gjennom et slikt område uten å se noe søppel.",
  },
  {
    prompt: "Lebreton mfl. (2018): Hvor stor del av antall biter i flekken er mikroplast, og hvor stor del av massen?",
    options: [
      "94 % av antall biter, men 8 % av massen",
      "8 % av antall biter, men 94 % av massen",
      "Like mye av begge",
    ],
    answer: 0,
    explain: "Mikroplast utgjorde 8 % av massen, men 94 % av antall biter. Over tre fjerdedeler av massen var gjenstander større enn 5 cm.",
  },
];
