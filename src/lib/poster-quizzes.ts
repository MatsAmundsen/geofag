import type { QuizQuestion } from "@/components/quiz";

export const QUIZ_FELT_HAV: QuizQuestion[] = [
  {
    prompt: "Hva måler en radiosonde?",
    options: [
      "Bare vind ved bakken",
      "Saltholdighet og temperatur i havet",
      "Snødybde",
      "Temperatur, fuktighet og lufttrykk fra bakken og oppover",
    ],
    answer: 3,
    explain: "Sonden sender dataene ned mens den stiger, og driften viser vinden (Store norske leksikon, u.å.-a).",
  },
  {
    prompt: "Hva står CTD for?",
    options: [
      "Current, tide, density",
      "Konduktivitet, temperatur og dyp",
      "Kyst, tidevann og dybde",
      "Klima, tetthet og drift",
    ],
    answer: 1,
    explain: "Saltholdigheten regnes ut fra ledningsevnen og temperaturen (NOAA, u.å.; Store norske leksikon, u.å.-d).",
  },
  {
    prompt: "Hva viser Kartverkets Se havnivå?",
    options: [
      "Observert og varslet vannstand og tidevann",
      "Havtemperaturen i Norskehavet",
      "Snøskredfaren langs kysten",
      "Saltholdigheten i fjordene",
    ],
    answer: 0,
    explain: "Vannstanden varierer på grunn av tidevannet og været (Kartverket, u.å.).",
  },
  {
    prompt: "Hva er riktig om snøskredvarselet?",
    options: [
      "Det gjelder ett enkelt heng",
      "Det kommer bare én gang i uka",
      "Det er et hjelpemiddel, og du må alltid gjøre egne vurderinger",
      "Det gjelder bare Svalbard",
    ],
    answer: 2,
    explain: "Faregraden gjelder minst 100 kvadratkilometer (Varsom, u.å.-a; Varsom, u.å.-b).",
  },
  {
    prompt: "Hva skal du ha med deg utenfor bebodd område på Svalbard?",
    options: [
      "Bjørnespray",
      "Kunnskap om sikring mot isbjørnangrep og egnede midler til å skremme isbjørn",
      "Ingenting spesielt om sommeren",
      "Bare en mobiltelefon med dekning",
    ],
    answer: 1,
    explain: "Svalbardmiljøloven (2001) § 30 a.",
  },
  {
    prompt: "Du har målt temperaturen ved kaia fem ganger på ti minutter og fått litt ulike verdier. Hva gjør du?",
    options: [
      "Bruker den høyeste verdien",
      "Bruker bare den første målingen",
      "Stryker målingene som avviker",
      "Regner ut gjennomsnittet og oppgir spredningen som usikkerhet",
    ],
    answer: 3,
    explain: "Spredningen mellom målingene viser hvor sikker du kan være.",
  },
];

export const QUIZ_ENERGI: QuizQuestion[] = [
  {
    prompt: "Hva er vindkraft i daglig bruk?",
    options: [
      "Tidevannet langs kysten.",
      "Elektrisk energi fra et vindkraftverk.",
      "Varme fra havdypet.",
    ],
    answer: 1,
    explain: "Se «Tre ressurser». Vinden blir rotasjon, og generatoren gjør den om til elektrisitet.",
  },
  {
    prompt: "Hvorfor er vindkraft omstridt i Norge, selv om den er utslippsfri?",
    options: [
      "Fordi vinden tar slutt etter noen år.",
      "Fordi den bare virker i tropene.",
      "Den legger beslag på store landområder og kan være et problem for reindrift.",
    ],
    answer: 2,
    explain: "Se «Vindkraft i Norge». Fosen-saken er eksemplet på siden.",
  },
  {
    prompt: "Hvordan kan en havvindturbin stå?",
    options: [
      "Direkte på sokkelen, eller på et flytende understell.",
      "Bare på land, som Fosen.",
      "Bare der havet er dypere enn 800 meter.",
    ],
    answer: 0,
    explain:
      "Se «Havvind». Står den på sokkelen, må havet ikke være for dypt. Flytende turbiner kan stå dypere.",
  },
  {
    prompt: "Hva driver tidevannet?",
    options: [
      "Vinden langs kysten.",
      "En generator i en vindturbin.",
      "Månens og solas tiltrekning.",
    ],
    answer: 2,
    explain: "Se «Tidevann». Newton viste at tidevannet følger tyngdekraften.",
  },
  {
    prompt: "Hva er springflo?",
    options: [
      "Den minste vekslingen, en uke etter fullmåne.",
      "Den største vekslingen i vannstand, omtrent ved nymåne og fullmåne.",
      "Høy vannstand bare når det blåser storm.",
    ],
    answer: 1,
    explain: "Se «Tidevann». Nippflo er den minste vekslingen.",
  },
];

export const QUIZ_SJEKK_HOYTRYKK_1: QuizQuestion[] = [
  {
    prompt: "Et område har 1015 hPa i sentrum og 1025 hPa rundt. Hva er det?",
    options: [
      "Et høytrykk, fordi trykket er over 1013 hPa",
      "Et lavtrykk, fordi trykket er lavere enn rundt",
      "Verken høytrykk eller lavtrykk",
    ],
    answer: 1,
    explain: "Høytrykk og lavtrykk er relative. Det er trykket rundt som avgjør.",
  },
  {
    prompt: "Hva betyr det at isobarene ligger tett på værkartet?",
    options: [
      "At trykket endrer seg mye over kort avstand, og det blåser kraftig",
      "At det er vindstille",
      "At det er høytrykk",
    ],
    answer: 0,
    explain: "Tette isobarer betyr stor trykkgradient og sterk vind.",
  },
];

export const QUIZ_SJEKK_HOYTRYKK_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor dannes det skyer når lufta stiger i et lavtrykk?",
    options: [
      "Fordi lufta får mer vanndamp i høyden",
      "Fordi lufta varmes opp når den stiger",
      "Fordi lufta utvider seg og avkjøles til duggpunktet",
    ],
    answer: 2,
    explain: "Stigende luft avkjøles adiabatisk, om lag 1 °C per 100 m. Ved duggpunktet kondenserer vanndampen.",
  },
  {
    prompt: "Hvorfor avkjøles mettet luft langsommere enn tørr luft når den stiger?",
    options: [
      "Fordi kondensasjon frigjør latent varme",
      "Fordi mettet luft er tyngre",
      "Fordi sola varmer skyene",
    ],
    answer: 0,
    explain: "Når vanndamp kondenserer, frigjøres latent varme. Da faller temperaturen bare om lag 0,5 °C per 100 m.",
  },
];

export const QUIZ_SJEKK_HOYTRYKK_3: QuizQuestion[] = [
  {
    prompt: "Hvorfor løses skyene opp i et høytrykk?",
    options: [
      "Vinden blåser dem bort",
      "Lufta synker, varmes opp, og den relative fuktigheten faller",
      "Det kommer mer vanndamp inn fra havet",
    ],
    answer: 1,
    explain: "Synkende luft varmes med om lag 1 °C per 100 m. Da fordamper skydråpene.",
  },
  {
    prompt: "Hvorfor kan et vinterhøytrykk gi dårlig luft i en dal?",
    options: [
      "Fordi det blåser kraftig",
      "Fordi det regner mye",
      "Fordi kald luft legger seg i dalbunnen under et lokk av mildere luft",
    ],
    answer: 2,
    explain: "Det kalles bakkeinversjon. Lufta blandes lite, og forurensning blir liggende.",
  },
];

export const QUIZ_SJEKK_LOKALE_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor blåser sjøbrisen inn fra havet om dagen?",
    options: [
      "Fordi havet varmes raskere enn land",
      "Fordi land varmes raskere enn havet, og lufta over land stiger",
      "Fordi jetstrømmen trekker lufta inn",
    ],
    answer: 1,
    explain: "Over land dannes et svakt termisk lavtrykk, og kjøligere luft fra havet strømmer inn ved bakken.",
  },
  {
    prompt: "Hva er bergvind?",
    options: [
      "Vind ned dalen om natten, når fjellsidene avkjøles",
      "Vind opp dalen om dagen",
      "Varm vind på lesiden av et fjell",
    ],
    answer: 0,
    explain: "Om natten avkjøles fjellsidene, og den kalde lufta renner ned mot dalbunnen.",
  },
];

export const QUIZ_SJEKK_LOKALE_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor er fønvinden varm og tørr?",
    options: [
      "Fordi den kommer fra Afrika",
      "Fordi den blåser over varmt hav",
      "Fordi lufta synker på lesiden og varmes med om lag 1 °C per 100 m",
    ],
    answer: 2,
    explain: "Synkende luft varmes adiabatisk, og den relative fuktigheten faller.",
  },
  {
    prompt: "Hva er en temperaturinversjon?",
    options: [
      "At temperaturen stiger med høyden",
      "At temperaturen faller raskt med høyden",
      "At det er like varmt i alle høyder",
    ],
    answer: 0,
    explain: "Varmere luft over virker som et lokk, og utslipp blir liggende nær bakken.",
  },
];

export const QUIZ_SJEKK_JET_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor blåser jetstrømmen fra vest mot øst?",
    options: [
      "Fordi sola står opp i øst",
      "Fordi lufta som går mot polen, beholder den østlige farten fra jordrotasjonen",
      "Fordi havstrømmene drar lufta med seg",
    ],
    answer: 1,
    explain: "Bakken roterer saktere nær polen, så lufta beveger seg mot øst i forhold til bakken. Det er corioliseffekten.",
  },
  {
    prompt: "Hvor er jetstrømmen sterkest?",
    options: [
      "Der temperaturforskjellen mellom kald og varm luft er stor",
      "Over ekvator",
      "Nær bakken",
    ],
    answer: 0,
    explain: "Der kald og varm luft ligger side om side, øker vinden med høyden. Det kalles termisk vind.",
  },
];

export const QUIZ_SJEKK_JET_2: QuizQuestion[] = [
  {
    prompt: "Hva skjer med stormbanen i en positiv NAO-fase?",
    options: [
      "Den flytter seg sørover mot Middelhavet",
      "Den forsvinner",
      "Den blir sterkere og flytter seg nordover",
    ],
    answer: 2,
    explain: "Sterkere trykkforskjell gir sterkere jet, og Nord-Europa får mer storm og nedbør.",
  },
  {
    prompt: "Hvorfor flytter polarjeten seg nordover om sommeren?",
    options: [
      "Den følger sola og grensen mellom varm og kald luft",
      "Den skyves av havstrømmene",
      "Den følger fjellkjedene",
    ],
    answer: 0,
    explain: "Om våren og sommeren flytter grensen mellom varm og kald luft seg mot polen, og jetstrømmen følger den.",
  },
];

export const QUIZ_SJEKK_KATASTROFER_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan ikke middelvinden i en tropisk orkan sammenlignes direkte med norsk vindstyrke?",
    options: [
      "Fordi den måles i en annen høyde over havet",
      "Fordi NHC bruker middelvind over ett minutt, mens norske vindstyrker bruker ti minutter",
      "Fordi tropiske orkaner bare måles fra satellitt",
    ],
    answer: 1,
    explain: "Middelvind over ett minutt blir høyere enn over ti minutter for samme vær.",
  },
  {
    prompt: "Hva tar ikke Saffir-Simpson-skalaen med?",
    options: [
      "Vindstyrken",
      "Kategori 1 til 5",
      "Stormflo, flom fra regn og tornadoer",
    ],
    answer: 2,
    explain: "Skalaen anslår bare skade fra vinden. Også svake orkaner kan gi dødelig stormflo.",
  },
];

export const QUIZ_SJEKK_KATASTROFER_2: QuizQuestion[] = [
  {
    prompt: "Når blir skadene fra stormflo størst?",
    options: [
      "Når stormfloen kommer samtidig med springflo og høye bølger",
      "Når det er nippflo",
      "Når vinden blåser fra land",
    ],
    answer: 0,
    explain: "Pålandsvind stuer vann mot kysten, og springflo og bølger kommer i tillegg.",
  },
  {
    prompt: "Hvor mye hever lavere lufttrykk vannstanden?",
    options: [
      "Om lag én meter per hektopascal",
      "Om lag én centimeter per hektopascal",
      "Ingenting",
    ],
    answer: 1,
    explain: "Lavere trykk gir om lag 1 cm høyere vannstand per hPa, men vinden betyr mer.",
  },
];

export const QUIZ_SJEKK_KATASTROFER_3: QuizQuestion[] = [
  {
    prompt: "Hva er en bombesyklon?",
    options: [
      "Et lavtrykk der trykket synker svært raskt, ved 60° N minst 24 hPa på 24 timer",
      "En tornado over havet",
      "Et høytrykk som ligger i ro",
    ],
    answer: 0,
    explain: "Bombesykloner er ekstratropiske lavtrykk som forsterker seg veldig raskt.",
  },
  {
    prompt: "Når forekommer polare lavtrykk?",
    options: [
      "Om sommeren",
      "Hele året like ofte",
      "I vintersesongen, hovedsakelig fra november til april",
    ],
    answer: 2,
    explain: "De dannes over havområdene i Arktis når kald luft strømmer ut over varmere hav.",
  },
];

export const QUIZ_SJEKK_ENERGI_1: QuizQuestion[] = [
  {
    prompt: "Hvor mye av strømbehovet på Snorre- og Gullfaks-plattformene skal Hywind Tampen dekke?",
    options: [
      "Hele strømbehovet, så plattformene blir utslippsfrie",
      "Om lag 35 prosent",
      "Under 1 prosent",
    ],
    answer: 1,
    explain: "Hywind Tampen skal dekke om lag 35 prosent og kutte om lag 200 000 tonn CO₂ i året. Resten kommer fortsatt fra gassturbiner (Equinor).",
  },
  {
    prompt: "Hvilket land har mest havvind i drift?",
    options: [
      "USA",
      "Norge",
      "Kina",
    ],
    answer: 2,
    explain: "Kina har over halvparten av verdens havvindkapasitet, fulgt av Storbritannia og Tyskland (GWEC).",
  },
];

export const QUIZ_SJEKK_ENERGI_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor egner havvarmekraft (OTEC) seg best i tropiske farvann?",
    options: [
      "Der kan forskjellen mellom varmt overflatevann og kaldt dypvann bli 20 grader eller mer",
      "Der er tidevannet størst",
      "Der blåser det mest",
    ],
    answer: 0,
    explain: "OTEC trenger stor temperaturforskjell. Varmt overflatevann fordamper arbeidsmediet, og kaldt dypvann kondenserer det igjen.",
  },
  {
    prompt: "Hvorfor er bølgekraft vanskelig å utnytte, selv om potensialet langs kysten er stort?",
    options: [
      "Fordi bølgene bare finnes om sommeren",
      "Fordi bølgene ikke inneholder energi",
      "Fordi svingningene gjør omformingen vanskelig, og ekstreme bølger gir store påkjenninger",
    ],
    answer: 2,
    explain: "Se «Bølgekraft». Energien varierer hele tiden, og anleggene må tåle storm.",
  },
];

export const QUIZ_TILPASNING: QuizQuestion[] = [
  {
    prompt: "Hva er klimatilpasning?",
    options: [
      "Å forstå konsekvensene av at klimaet endrer seg, og å sette inn tiltak.",
      "Bare å måle CO₂ på Mauna Loa.",
      "Det samme som å redusere klimaendringene.",
    ],
    answer: 0,
    explain:
      "Se «To svar». Tiltakene kan hindre eller redusere skade, eller utnytte muligheter.",
  },
  {
    prompt: "Hva er Norges nasjonale mål for klimatilpasning?",
    options: [
      "At samfunnet og økosystemene skal forberedes på og tilpasses klimaendringene.",
      "At bare byene skal tilpasses, ikke økosystemene.",
      "At tilpasning erstatter alle andre svar.",
    ],
    answer: 0,
    explain: "Se «To svar». Målet gjelder både samfunn og økosystem.",
  },
  {
    prompt: "Hva ber kompetansemålet deg vurdere?",
    options: [
      "Både løsninger som reduserer klimaendringene, og løsninger for å tilpasse seg.",
      "Bare utslippsregnskapet for ett år.",
      "Bare værvarselet for i morgen.",
    ],
    answer: 0,
    explain: "Se «To svar». Redusere og tilpasse seg er to ulike svar.",
  },
  {
    prompt: "Hvilket klima har kysten fra Oslofjorden til Troms?",
    options: [
      "Varmtemperert klima med milde vintre.",
      "Polarklima, som på Svalbard.",
      "Kaldtemperert innlandsklima med barskog hele veien.",
    ],
    answer: 0,
    explain:
      "Se «Klimaet konsekvensene treffer i Norge». Polarklima ligger i fjellet, langs Finnmarkskysten og på Svalbard.",
  },
  {
    prompt: "Hva vurderer FNs klimapanels arbeidsgruppe II?",
    options: [
      "Konsekvenser for økosystem, biologisk mangfold og samfunn, og grensene for tilpasning.",
      "Bare banens tre svingninger.",
      "Bare vindstyrken orkan.",
    ],
    answer: 0,
    explain:
      "Se «To svar». Rapporten ser på konsekvenser globalt og regionalt, og på hvor langt tilpasning kan gå.",
  },
];

export const QUIZ_FARER: QuizQuestion[] = [
  {
    prompt: "Når er vindstyrken orkan i Norge?",
    options: [
      "Når et vindkast passerer 20 m/s.",
      "Når middelvinden er sterkere enn 32,6 m/s, målt ti meter over bakken i ti minutter.",
      "Når en tropisk syklon har kategori 3.",
    ],
    answer: 1,
    explain: "Se «Orkan er to ulike ting». Storm ligger under denne grensen.",
  },
  {
    prompt: "Hva er en tropisk orkan?",
    options: [
      "All vind over 32,6 m/s på norskekysten.",
      "En tornado med tverrmål på 100 meter.",
      "En tropisk syklon med middelvind på minst 74 mph.",
    ],
    answer: 2,
    explain:
      "Se «Orkan er to ulike ting». I vestlige Nord-Stillehavet kalles de tyfoner. Kategori 1 starter ved 119 km/t.",
  },
  {
    prompt: "Hvilke orkaner kan gi dødelig stormflo?",
    options: [
      "Orkaner i alle kategorier.",
      "Bare kategori 5.",
      "Bare orkaner som treffer Norge.",
    ],
    answer: 0,
    explain:
      "Se «Norskekysten og tropene». Skalaen graderer vinden. Stormflo, regnflom og tornadoer kan komme i alle kategorier.",
  },
  {
    prompt: "Hva er stormflo?",
    options: [
      "Det vanlige tidevannet to ganger i døgnet.",
      "En tornado over havet.",
      "Særlig høy vannstand langs kysten i forbindelse med storm.",
    ],
    answer: 2,
    explain:
      "Se «Stormflo». I Oslofjorden 16. oktober 1987 sto vannet 1,5 meter over normalt høyvann.",
  },
  {
    prompt: "Hva er en tornado?",
    options: [
      "En tropisk syklon med øye.",
      "En lokal virvelvind, den kraftigste av virvelvindene, med tverrmål i størrelsesorden 100 meter.",
      "Et regionalt snøskredvarsel.",
    ],
    answer: 1,
    explain: "Se «Tornado». Skypumper og støvvirvler er svakere virvelvinder.",
  },
];

export const QUIZ_ISTIDER: QuizQuestion[] = [
  {
    prompt: "Hvilke tre svingninger er Milankovitch-syklusene?",
    options: [
      "Eksentrisitet, skråstilling og presesjon.",
      "Passat, monsun og jetstrøm.",
      "El Niño, La Niña og NAO.",
    ],
    answer: 0,
    explain: "Se «Tre svingninger». De tre er banens form, aksens vinkel og aksens vingling.",
  },
  {
    prompt: "Hva gjør minkende skråstilling med somrene på høye breddegrader?",
    options: [
      "Somrene blir kjøligere, så snø og is kan bygge seg opp.",
      "Somrene blir varmere, så all is smelter med en gang.",
      "Årstidene forsvinner, fordi aksen slutter å helle.",
    ],
    answer: 0,
    explain:
      "Se «Skråstilling». Mildere årstider betyr varmere vintre og kjøligere somre. Mer is kaster mer solenergi tilbake.",
  },
  {
    prompt: "Forklarer Milankovitch-syklusene oppvarmingen vi ser nå?",
    options: [
      "Ja, fordi eksentrisiteten øker raskt.",
      "Nei. NASA skriver at syklusene ikke forklarer den oppvarmingen.",
      "Ja, fordi presesjonen snur hvert år.",
    ],
    answer: 1,
    explain: "Se «Tre svingninger». Syklusene utløser istider. De forklarer ikke oppvarmingen nå.",
  },
  {
    prompt: "Hva kjennetegnet siste istids maksimum for 20 000 år siden?",
    options: [
      "Iskappen nådde det sørlige England, og havet sto 125 meter lavere enn i dag.",
      "Havet sto høyere enn i dag, og England var en øy langt fra Frankrike.",
      "Hele Sibir var dekket av en 3000 meter tykk iskappe.",
    ],
    answer: 0,
    explain:
      "Se «Siste istids maksimum». De kaldeste delene av Sibir var isfrie fordi klimaet var tørt.",
  },
  {
    prompt: "Når sluttet siste istid, ifølge Store norske leksikon?",
    options: [
      "For 11 700 år siden.",
      "For 20 000 år siden, som er siste istids maksimum.",
      "I 1976, da havbunnsstudien ble publisert.",
    ],
    answer: 0,
    explain:
      "Se «Hvorfor istidene kommer». 20 000 år er siste istids maksimum. 11 700 år er slutten på siste istid.",
  },
];

export const QUIZ_PALEO: QuizQuestion[] = [
  {
    prompt: "Når startet de direkte målingene av CO₂ på Mauna Loa?",
    options: [
      "I mars 1958.",
      "I 1979, da satellittene begynte å måle havis.",
      "I mai 1974, da NOAA startet egne målinger.",
    ],
    answer: 0,
    explain:
      "Se «Tre arkiv, tre klokker». Keeling startet serien i mars 1958. NOAA kom med egne målinger i mai 1974.",
  },
  {
    prompt: "Hva viser iskjerner om CO₂ i istidssyklusene det siste millionåret?",
    options: [
      "At CO₂ ikke kom over 300 ppm.",
      "At CO₂ hele tiden lå rundt 422 ppm.",
      "At CO₂ først ble målt i 1958.",
    ],
    answer: 0,
    explain:
      "Se «Iskjerner og det naturlige spennet». 300 ppm er taket i de syklusene. 422,8 ppm er det globale årsmiddelet i 2024.",
  },
  {
    prompt: "Hvor lå CO₂ før midten av 1700-tallet?",
    options: [
      "På 280 ppm eller lavere.",
      "Over 400 ppm, som i 2024.",
      "Rett under 427 ppm, som mai-verdien på Mauna Loa.",
    ],
    answer: 0,
    explain:
      "Se «Iskjerner og det naturlige spennet». Før den industrielle revolusjonen lå CO₂ på 280 ppm eller lavere.",
  },
  {
    prompt: "Hva driver årstidssvingningen, og hva driver den langsiktige stigningen?",
    options: [
      "Vegetasjon driver svingningen. Menneskelig aktivitet driver stigningen.",
      "Begge kommer av istidene.",
      "Satellittene driver begge, fordi serien starter i 1979.",
    ],
    answer: 0,
    explain:
      "Se «Tre arkiv, tre klokker». Sommerens plantevekst senker CO₂, og vinterens nedbryting hever den. Stigningen er menneskedrevet.",
  },
  {
    prompt: "Hva er Sea Ice Index?",
    options: [
      "Iskjernekurven for 800 000 år.",
      "Utbredelse og konsentrasjon av havis siden 1979.",
      "Månedsmiddelet av CO₂ på Mauna Loa.",
    ],
    answer: 1,
    explain:
      "Se «Havis er et annet arkiv». Serien starter i 1979 og sammenlignes med medianen for 1981–2010.",
  },
];

export const QUIZ_MODELLER: QuizQuestion[] = [
  {
    prompt: "Hva er oppløsningen i en numerisk modell?",
    options: [
      "Hvor ofte modellen kjøres",
      "Avstanden mellom punktene i rutenettet",
      "Hvor mange observasjoner modellen bruker",
      "Hvor langt fram i tid modellen regner",
    ],
    answer: 1,
    explain: "MEPS har en oppløsning på 2,5 km, og ECMWF ca. 9 km. Se «Hvordan bygges en numerisk modell opp?».",
  },
  {
    prompt: "Hvorfor må modellen parameterisere skyer?",
    options: [
      "Fordi skyer ikke kan observeres",
      "Fordi skyer ikke påvirker temperaturen",
      "Fordi gassloven ikke gjelder i skyer",
      "Fordi skydråpene og prosessene i skyene er mye mindre enn rutene",
    ],
    answer: 3,
    explain: "Modellen beskriver den samlede virkningen på ruten med forenklede formler. Se «Hva er parameterisering?».",
  },
  {
    prompt: "Hva gjør dataassimileringen?",
    options: [
      "Den kombinerer et kort varsel med nye observasjoner til en analyse som varselet starter fra",
      "Den gjør om modellresultatet til et kart på Yr",
      "Den fjerner alle observasjoner med feil",
      "Den regner ut været for neste uke",
    ],
    answer: 0,
    explain: "MEPS lager en ny analyse hver tredje time med 3D-Var. Se «Hvordan får modellen riktig start?».",
  },
  {
    prompt: "18 av 30 medlemmer i et ensemble gir regn i morgen. Hva er den enkleste tolkningen?",
    options: [
      "Det regner 60 prosent av dagen",
      "60 prosent av landet får regn",
      "Det er ca. 60 prosent sjanse for regn",
      "Modellen har gjort en feil",
    ],
    answer: 2,
    explain: "Andelen medlemmer som gir regn, er et mål på sannsynligheten. Se «Kaos og ensembler».",
  },
  {
    prompt: "Hvilken modell regner ut strøm og stormflo langs norskekysten?",
    options: [
      "NorESM",
      "MEPS",
      "AROME-Arctic",
      "Norkyst",
    ],
    answer: 3,
    explain: "Norkyst er MET sin havmodell, med ruter på ca. 800 meter. Se «Hvordan brukes modellene i havmodelleringen?».",
  },
  {
    prompt: "Hvorfor kan vi regne på klimaet i 2100 når vi ikke kan varsle været om tre uker?",
    options: [
      "Fordi klimamodeller ikke er påvirket av kaos i det hele tatt",
      "Fordi klimamodellen regner ut hvordan værstatistikken endrer seg når pådrivene endres, ikke været en bestemt dag",
      "Fordi klimamodeller har finere ruter enn værmodeller",
      "Fordi klimamodeller bruker flere observasjoner",
    ],
    answer: 1,
    explain: "Se «Hvordan brukes modellene i klimaforskningen?».",
  },
];

export const QUIZ_KRYO: QuizQuestion[] = [
  {
    prompt: "Hva er permafrost?",
    options: [
      "Bakke der temperaturen i to sammenhengende år ikke overstiger 0 °C.",
      "All is som ligger på en bre.",
      "Havis som er tykkere enn to meter.",
    ],
    answer: 0,
    explain: "Se «Permafrost og det aktive laget». Definisjonen er temperatur, ikke is i bakken.",
  },
  {
    prompt: "Hva skiller akkumulasjonsområdet fra ablasjonsområdet?",
    options: [
      "Akkumulasjon er der snøen blir liggende. Ablasjonsområdet er der den smelter.",
      "Begge er der isen kalver i havet.",
      "Akkumulasjon er bare permafrost.",
    ],
    answer: 0,
    explain: "Se «Breer». Firngrensen ligger mellom de to områdene.",
  },
  {
    prompt: "Hva er havis?",
    options: [
      "En innlandsis på Grønland.",
      "Frossent havvann som flyter på havet.",
      "Snø som ligger på en dalbre.",
    ],
    answer: 1,
    explain: "Se «Havis og snø». Havis er frossent havvann, ikke en bre på land.",
  },
  {
    prompt: "Hva gjelder en snøskredfaregrad for?",
    options: [
      "Ett enkelt heng.",
      "Et område på minst 100 kvadratkilometer.",
      "Bare Svalbard.",
    ],
    answer: 1,
    explain: "Se «Snøskredvarsel». Graden er regional og kan ikke settes for ett heng.",
  },
  {
    prompt: "Hva har skjedd med de fleste breene i Norge siden starten av 2000-tallet?",
    options: [
      "De har vokst, fordi vintrene er blitt kaldere.",
      "De har smeltet mye tilbake, hovedsakelig på grunn av varme somre.",
      "De er uendret, fordi massebalansen alltid er null.",
    ],
    answer: 1,
    explain: "Se «Breer». Tilbakegangen henger sammen med varme somre.",
  },
];

export const QUIZ_AMOC: QuizQuestion[] = [
  {
    prompt: "Hvor starter det trege beltet?",
    options: [
      "I overflaten nær polen i Nord-Atlanteren, der kaldt og salt vann synker.",
      "I Indiahavet, der vannet alltid synker.",
      "Langs ekvator, der passatvinden skyver overflaten.",
    ],
    answer: 0,
    explain:
      "Se «Hva er den atlantiske omveltningen?». Beltet begynner i Nord-Atlanteren.",
  },
  {
    prompt: "Hvorfor blir vannet saltere der havisen fryser?",
    options: [
      "Fordi elver fører mer salt ut i havet om vinteren.",
      "Fordi saltet ikke fryser med isen, men blir liggende i vannet rundt.",
      "Fordi varmt vann alltid er saltere enn kaldt vann.",
    ],
    answer: 1,
    explain: "Se «Hva er den atlantiske omveltningen?». Saltet blir igjen når havisen fryser.",
  },
  {
    prompt: "Hvor raskt går beltet, sammenlignet med vind og tidevann?",
    options: [
      "Noen få centimeter i sekundet. Vind og tidevann går i titalls til hundretalls.",
      "Like raskt som de vinddrevne strømmene.",
      "Raskere enn tidevannet.",
    ],
    answer: 0,
    explain: "Se tabellen. Det trege beltet er den langsomme strømmen.",
  },
  {
    prompt: "Hvor lang tid tar en runde for en kubikkmeter vann?",
    options: ["Noen uker.", "Omtrent ti år.", "Omtrent 1000 år."],
    answer: 2,
    explain: "Se «Veien rundt jorda». En gitt kubikkmeter bruker omtrent 1000 år.",
  },
  {
    prompt: "Hva kan mer regn og smeltevann gjøre med beltet?",
    options: [
      "Gjøre beltet raskere enn de vinddrevne strømmene.",
      "Hindre nedsynking av kaldt, salt vann, slik at beltet kan gå saktere eller stoppe.",
      "Ingenting. Ferskvann endrer ikke tettheten.",
    ],
    answer: 1,
    explain:
      "Se «Ferskvann kan bremse beltet». Varmt ferskvann på overflaten kan forstyrre nedsynkingen.",
  },
];

export const QUIZ_NAO: QuizQuestion[] = [
  {
    prompt: "Hva sammenligner NAO?",
    options: [
      "Lavtrykket nær Island og høytrykket nær Asorene.",
      "Havtemperaturen vest og øst i Indiahavet.",
      "Passatvinden i Stillehavet.",
    ],
    answer: 0,
    explain: "Se «Hva er NAO?». Indeksen beskriver de to trykkmønstrene over Nord-Atlanteren.",
  },
  {
    prompt: "Hva er en positiv fase?",
    options: [
      "Både lavtrykket og høytrykket er sterkere enn gjennomsnittet.",
      "Begge er svakere enn gjennomsnittet.",
      "Bare høytrykket finnes.",
    ],
    answer: 0,
    explain: "Se «Positiv NAO». Både høytrykket og lavtrykket er sterkere enn gjennomsnittet.",
  },
  {
    prompt: "Hva merker Nord-Europa i positiv fase?",
    options: [
      "Mer storm, mer nedbør og varmere enn gjennomsnittet.",
      "Mindre storm og kaldere enn gjennomsnittet.",
      "Ingen endring i været.",
    ],
    answer: 0,
    explain:
      "Se «Positiv NAO». Sterkere jetstrøm og stormbane lenger nord gir mer storm og mildere vintre i Nord-Europa.",
  },
  {
    prompt: "Hva merker Sør-Europa i negativ fase?",
    options: [
      "Mer storm, mer nedbør og varmere enn gjennomsnittet.",
      "Mindre nedbør enn gjennomsnittet.",
      "Det samme som Nord-Europa i positiv fase.",
    ],
    answer: 0,
    explain:
      "Se «Været under negativ NAO». Jetstrømmen ligger lenger sør og gir mer storm, mer nedbør og ofte høyere temperaturer enn normalt i Sør-Europa (NOAA, u.å.-a).",
  },
  {
    prompt: "Er positiv NAO det samme som oppvarmingstrenden?",
    options: [
      "Nei. Det er en sterk trykkforskjell mellom Island og Asorene.",
      "Ja. Positiv NAO er drivhuseffekten.",
      "Ja. Negativ NAO er drivhuseffekten.",
    ],
    answer: 0,
    explain:
      "Se «Vanlige misforståelser». Positiv NAO er en fase i trykkmønsteret, ikke oppvarmingstrenden.",
  },
  {
    prompt: "Hvor ligger polarvirvelen?",
    options: [
      "I stratosfæren over Arktis om vinteren.",
      "I troposfæren over Antarktis hele året.",
      "Ved havoverflaten nær Island.",
    ],
    answer: 0,
    explain: "Se «Polarvirvelen». Den ligger høyere enn polarjetstrømmen (NOAA Climate.gov, 2021).",
  },
];

export const QUIZ_IOD: QuizQuestion[] = [
  {
    prompt: "Hva er den indiske hav-dipolen?",
    options: [
      "Vedvarende forskjell i havtemperatur mellom vest og øst i den tropiske delen av Det indiske hav.",
      "Et annet navn på El Niño.",
      "Trykkvippen mellom Asorene og Island.",
    ],
    answer: 0,
    explain:
      "Se «Hva er den indiske hav-dipolen?». IOD er forskjellen mellom vest og øst.",
  },
  {
    prompt: "Hvordan er havet i en positiv fase?",
    options: [
      "Varmere enn normalt i vest og kjøligere i øst.",
      "Varmere enn normalt både i vest og i øst.",
      "Kjøligere enn normalt i vest og varmere i øst.",
    ],
    answer: 0,
    explain: "Se «Positiv fase». Positiv fase er varmere i vest og kjøligere i øst.",
  },
  {
    prompt: "Hvor stiger kaldt vann opp i positiv fase?",
    options: [
      "Sør for Indonesia, utenfor Sumatra og Java.",
      "Ved vestkysten av Australia.",
      "Utenfor Øst-Afrika.",
    ],
    answer: 0,
    explain: "Se «Positiv fase». Oppvellingen skjer nær Indonesia (BOM, u.å.).",
  },
  {
    prompt: "Er dipolen det samme som ENSO?",
    options: [
      "Nei. Det er et eget mønster i Det indiske hav, men det opptrer ofte sammen med El Niño.",
      "Ja. Positiv IOD er El Niño.",
      "Ja. Negativ IOD er La Niña.",
    ],
    answer: 0,
    explain: "Se «Vanlige misforståelser». Positiv IOD faller ofte, ikke alltid, sammen med El Niño.",
  },
  {
    prompt: "Når topper en IOD-hendelse seg vanligvis?",
    options: [
      "Mellom august og oktober.",
      "I januar.",
      "Den varer uendret hele året.",
    ],
    answer: 0,
    explain:
      "Se «Hva er den indiske hav-dipolen?». Hendelsene starter ofte i mai eller juni, topper seg mellom august og oktober, og dør ut rundt november–desember.",
  },
];

export const QUIZ_ENSO: QuizQuestion[] = [
  {
    prompt: "Hva er El Niño og La Niña?",
    options: [
      "Den varme og den kalde fasen av ENSO i det tropiske Stillehavet.",
      "To navn på oppvarmingstrenden.",
      "Vindsystemet over Nord-Atlanteren.",
    ],
    answer: 0,
    explain:
      "Se «Hva er ENSO?». El Niño er varm fase og La Niña kald fase av et naturlig mønster.",
  },
  {
    prompt: "Hva skjer med vinden under El Niño?",
    options: [
      "De østlige vindene langs ekvator svekkes eller snur.",
      "De østlige vindene blir alltid sterkere.",
      "Vinden slutter helt i hele atmosfæren.",
    ],
    answer: 0,
    explain:
      "Se tabellen. Under El Niño svekkes de østlige vindene, eller de blåser fra vest mot øst.",
  },
  {
    prompt: "Hvor flytter regnet seg under El Niño?",
    options: [
      "Mindre over Indonesia, mer over det tropiske Stillehavet.",
      "Mer over Indonesia, mindre over Stillehavet.",
      "Regnet endrer seg ikke.",
    ],
    answer: 0,
    explain:
      "Se tabellen. El Niño gir mindre regn over Indonesia og mer over det tropiske Stillehavet.",
  },
  {
    prompt: "Hvorfor setter ENSO spor i den globale middeltemperaturen?",
    options: [
      "Stillehavet er stort. Det varmeste året i et tiår er vanligvis et El Niño-år.",
      "Fordi El Niño er det samme som oppvarmingstrenden.",
      "Fordi La Niña varmer hele kloden hvert år.",
    ],
    answer: 0,
    explain:
      "Se «Virkninger langt unna». Innenfor et tiår er det varmeste året vanligvis et El Niño-år.",
  },
  {
    prompt: "Hva skjer med ansjosfisket utenfor det nordvestlige Peru under El Niño?",
    options: [
      "Det varme vannet blir ugunstig, og fisken trekker mot kjøligere vann.",
      "Fisket blir bedre fordi vannet blir kaldere.",
      "El Niño gjelder bare lufta, ikke fisket.",
    ],
    answer: 0,
    explain:
      "Se «El Niño og La Niña». Varmere vann gjør at ansjosen trekker mot kjøligere vann, og fangsten blir dårlig.",
  },
];

export const QUIZ_OVERSIKT: QuizQuestion[] = [
  {
    prompt: "Hva er klima, til forskjell fra været?",
    options: [
      "Det langvarige mønsteret i været. Et skifte i det langvarige gjennomsnittet er klimaendring.",
      "Temperaturen i én uke.",
      "Bare nedbøren i tropene.",
    ],
    answer: 0,
    explain:
      "Se «Hva er klima?». Klima er mønsteret over lang tid. Været er tilstanden nå.",
  },
  {
    prompt: "Hvorfor er vanndamp mest en tilbakekobling?",
    options: [
      "Den reagerer på temperaturen og forsterker en oppvarming som noe annet har startet.",
      "Den er ikke en drivhusgass.",
      "Den finnes bare over hav.",
    ],
    answer: 0,
    explain:
      "Se «Hva betyr drivhuseffekten?». NASA omtaler vanndamp som en tilbakekobling som forsterker.",
  },
  {
    prompt: "Hvor stor del av sollyset som treffer jorda, kastes tilbake?",
    options: ["29 prosent.", "Hele innstrålingen.", "Ingenting. Alt tas opp ved bakken."],
    answer: 0,
    explain:
      "Se tabellen. 29 prosent reflekteres. 23 prosent tas opp i atmosfæren og 48 prosent ved overflaten.",
  },
  {
    prompt: "Hvor har det meste av overskuddsvarmen det siste århundret blitt av?",
    options: [
      "Omtrent 90 prosent er tatt opp i havet.",
      "Alt er blitt værende i lufta.",
      "Havet tar ikke opp varme.",
    ],
    answer: 0,
    explain:
      "Se «Havet husker». NASA sier at omtrent 90 prosent av overskuddsvarmen er tatt opp i havet.",
  },
  {
    prompt: "Hva er tap av is ved polene i energibudsjettet?",
    options: [
      "En tilbakekobling. Flaten blir mindre reflekterende.",
      "Det første pådrivet som starter oppvarmingen.",
      "En endring som bare gjelder været i én dag.",
    ],
    answer: 0,
    explain:
      "Se «Isen er et speil». NASA bruker istap ved polene som eksempel på en tilbakekobling.",
  },
];

export const QUIZ_HAVSTROMMER: QuizQuestion[] = [
  {
    prompt: "Hva er ekmanspiralen?",
    options: [
      "En virvel som dannes rundt et lavtrykk på havet",
      "Spiralen som tidevannet beveger seg i rundt et amfidromisk punkt",
      "Mønsteret som strømretningen danner nedover i ekmanlaget, der hvert lag går litt saktere og litt mer til høyre",
      "Bevegelsen til dypvannet rundt Antarktis",
    ],
    answer: 2,
    explain: "Hvert lag drar i laget under, og corioliseffekten bøyer det mot høyre (Ekman, 1905; Barthel, 2021a).",
  },
  {
    prompt: "Hvorfor er strømmen på vestsiden av en havvirvel smal og rask?",
    options: [
      "Fordi corioliseffekten øker mot nord, noe som gir vestlig intensivering",
      "Fordi vinden alltid er sterkest i vest",
      "Fordi havet er dypere i vest",
      "Fordi tidevannet er størst i vest",
    ],
    answer: 0,
    explain: "Stommel (1948) forklarte det. Grunnen er at jorda er rund (Barthel, 2025).",
  },
  {
    prompt: "Hvor kommer det meste av atlanterhavsvannet inn i Norskehavet?",
    options: [
      "Gjennom Den engelske kanal",
      "Gjennom Danmarkstredet",
      "Gjennom Framstredet",
      "Gjennom Færøy–Shetland-renna",
    ],
    answer: 3,
    explain: "Der er vannet rundt 8 °C og har en saltholdighet på 35,4 promille (Weber & Bjørndalen, 2024).",
  },
  {
    prompt: "Hva gir oppvelling langs en kyst?",
    options: [
      "At vinden blåser rett mot land",
      "At ekmantransporten fører overflatevannet bort fra kysten",
      "At tidevannet løfter bunnvannet",
      "At havisen smelter",
    ],
    answer: 1,
    explain: "Kaldt og næringsrikt vann stiger opp og erstatter overflatevannet (Barthel, 2021b).",
  },
  {
    prompt: "Hvor har saltet fra havis størst betydning for dannelsen av tungt bunnvann?",
    options: [
      "I Nordsjøen",
      "Langs norskekysten",
      "Rundt Antarktis",
      "I Sargassohavet",
    ],
    answer: 2,
    explain: "Det meste av bunnvannet i verdenshavene dannes rundt Antarktis, særlig i Weddellhavet. I Nord-Atlanteren er avkjøling om vinteren viktigst (Barthel, 2025).",
  },
  {
    prompt: "Hvorfor kan AMOC bli svakere når klimaet blir varmere?",
    options: [
      "Fordi vinden over Atlanteren slutter å blåse",
      "Fordi havet blir saltere",
      "Fordi jorda roterer saktere",
      "Fordi overflatevannet i nord blir ferskere og varmere og synker ikke like lett",
    ],
    answer: 3,
    explain: "IPCC (2021) vurderer det som svært sannsynlig at AMOC svekkes i dette hundreåret.",
  },
];

export const QUIZ_KLIMA: QuizQuestion[] = [
  {
    prompt: "Hva er den viktigste forskjellen mellom en svingning som ENSO og global oppvarming?",
    options: [
      "Svingninger gjelder bare lufttrykk",
      "Svingninger flytter varme og nedbør innenfor systemet, mens global oppvarming skyldes et ytre pådriv",
      "Global oppvarming skjer bare i lufta",
      "Det er ingen forskjell",
    ],
    answer: 1,
    explain: "Mer klimagasser holder igjen mer energi totalt, mens svingningene flytter energien rundt.",
  },
  {
    prompt: "Hvilken svingning har mest å si for vinterværet i Norge?",
    options: [
      "IOD",
      "ENSO",
      "NAO",
      "Ingen av dem",
    ],
    answer: 2,
    explain: "NAO styrer trykkforskjellen over Nord-Atlanteren og hvor lavtrykkene går.",
  },
  {
    prompt: "Hva er forskjellen på et pådriv og en tilbakekobling?",
    options: [
      "Et pådriv setter i gang en endring, mens en tilbakekobling forsterker eller demper den",
      "Et pådriv er alltid naturlig",
      "Det er to ord for det samme",
      "En tilbakekobling virker bare i havet",
    ],
    answer: 0,
    explain: "Mer CO₂ er et pådriv. Is-albedo-effekten er en tilbakekobling. Les mer i oversikten.",
  },
];

export const QUIZ_JET: QuizQuestion[] = [
  {
    prompt: "Hvilken vei blåser vinden i en jetstrøm?",
    options: [
      "Fra øst mot vest, på begge halvkuler.",
      "Fra vest mot øst.",
      "Rett fra ekvator mot polen, uten sideveis avbøyning.",
    ],
    answer: 1,
    explain:
      "I jetstrømmen blåser vinden fra vest mot øst. Beltet kan likevel flytte seg nordover og sørover. Se «Hva er en jetstrøm?».",
  },
  {
    prompt: "Hvor ligger polarjeten og den subtropiske jetstrømmen?",
    options: [
      "Begge ligger fast over ekvator.",
      "Polarjeten rundt 30°, den subtropiske mellom 50° og 60°.",
      "Polarjeten mellom 50° og 60°, den subtropiske rundt 30°.",
    ],
    answer: 2,
    explain:
      "Polarjeten ligger mellom 50° og 60° på begge halvkuler. Den subtropiske jetstrømmen ligger rundt 30°. Se tabellen i «Hva er en jetstrøm?».",
  },
  {
    prompt: "Når er jetstrømmene sterkest, og hvorfor?",
    options: [
      "Om vinteren, fordi skillet mellom varm og kald luft er tydeligst da.",
      "Om sommeren, fordi sola varmer jetstrømmen direkte.",
      "De er like sterke hele året, fordi jorda roterer like fort.",
    ],
    answer: 0,
    explain:
      "Grensen mellom varm og kald luft er mest markert om vinteren, og da er jetstrømmene sterkest. Se «Hva er en jetstrøm?».",
  },
  {
    prompt: "Hva gjør en positiv NAO med stormbanen over Atlanteren?",
    options: [
      "Jetstrømmen stopper, og Nord-Europa får ørkenklima.",
      "Stormbanen flytter seg til ekvator, og Island får høytrykk hele vinteren.",
      "Jetstrømmen blir sterkere, og stormbanen flytter seg nordover. Nord-Europa får mer storm og mildere vær.",
    ],
    answer: 2,
    explain:
      "Positiv NAO er en sterkere trykkforskjell mellom Island og Asorene. Den atlantiske jetstrømmen blir sterkere, og stormbanen ligger lenger nord. Se «Slynger, årstid og stormbane».",
  },
  {
    prompt: "Hvorfor er jetstrømmen tegnet som en strek på værkartet en forenkling?",
    options: [
      "Streken er en front på bakken, med like sterk vind overalt.",
      "Streken viser der vinden er sterkest. Selve beltet er bredere, og vinden øker inn mot kjernen.",
      "Streken viser bare flyruter, ikke vind.",
    ],
    answer: 1,
    explain:
      "Jetstrømmen er et belte der vinden er sterkest i kjernen, omtrent som strømmen midt i en elv. Se «Hva er en jetstrøm?».",
  },
];

export const QUIZ_MELTING: QuizQuestion[] = [
  {
    prompt: "Hvorfor oppstår det dekompresjonssmelting under en midthavsrygg?",
    options: [
      "Fordi havvannet renner ned i sprekken og koker mantelen.",
      "Fordi skorpetynning reduserer overtrykket; mantelen stiger adiabatisk og krysser solidus.",
      "Fordi friksjonen mellom platene genererer voldsom varme som smelter bergartene fullstendig.",
      "Fordi astenosfæren i utgangspunktet er et flytende magmahav som slipper fri.",
    ],
    answer: 1,
    explain:
      "Riktig! Når overliggende litosfære trekkes fra hverandre, synker det litostatiske trykket. Fordi mantelens oppstigning skjer uten vesentlig varmetap (adiabatisk), faller solidus raskere enn mantelens temperatur, og det oppstår delvis smelte.",
  },
  {
    prompt: "Hvilken smeltemekanisme er ansvarlig for vulkanene i Andesfjellene og Japan?",
    options: [
      "Dekompresjonssmelting på grunn av skorpefortykkelse.",
      "Friksjonsvarme langs forkastningsflaten.",
      "Flukssmelting: Vann avgitt fra den synkende havbunnen senker smeltepunktet i mantelkilen over.",
      "Radioaktiv oppvarming fra konsentrert uran i dyphavsgropen.",
    ],
    answer: 2,
    explain:
      "Riktig! Subduksjonsvulkaner drives av flukssmelting: Den synkende havbunnsplaten avgir vann og flyktige stoffer ved 80–150 km dyp, noe som senker peridotittens smeltepunkt i mantelkilen over.",
  },
];

export const QUIZ_BOUNDARIES: QuizQuestion[] = [
  {
    prompt:
      "Hva er den fundamentale mekaniske forskjellen mellom en aktiv transformforkastning og en inaktiv bruddsone (fracture zone) i et havbasseng?",
    options: [
      "Det er ingen forskjell; begrepene brukes synonymt i geofaget.",
      "En aktiv transformforkastning forbinder to spredningsryggsegmenter der platene beveger seg i motsatte retninger (kraftig seismisitet), mens bruddsonen utenfor har skorpe som beveger seg i samme retning (aseismisk arr).",
      "Bruddsoner oppstår bare i subduksjonssoner, mens transformforkastninger bare finnes på land.",
      "Transformforkastninger har alltid dype jordskjelv dypere enn 300 km.",
    ],
    answer: 1,
    explain:
      "Riktig! J. Tuzo Wilson viste i 1965 at transformbevegelse kun foregår mellom de to forskjøvede ryggaksene der platene gnisser mot hverandre. Utenfor ryggene beveger havbunnen på begge sider seg i samme retning med samme fart – dermed oppstår det ingen jordskjelv langs bruddsonen.",
  },
  {
    prompt: "Hva kjennetegner soneringen foran en subduksjonssone (fra havet og inn mot kontinentet)?",
    options: [
      "Dyphavsgrop → Akkresjonskile → Forbuebasseng → Vulkanbue (og eventuelt bakbuebasseng).",
      "Midthavsrygg → Normalforkastning → Graben → Skjoldvulkan.",
      "Kaldera → Sinderkjegle → Stratovulkan → Dyphavsslette.",
      "Aseismisk bruddsone → Transformforkastning → Kontinentalrift.",
    ],
    answer: 0,
    explain:
      "Riktig! Denne karakteristiske soneringen skyldes subduksjonens geometri: Platen bøyes ned i dyphavsgropen, sedimenter skrapes av i akkresjonskilen, forbuebassenget dannes foran vulkanbuen som mates av flukssmelting, og slab rollback kan åpne et bakbuebasseng bakerst.",
  },
];

export const QUIZ_OFIOLITT_WILSON: QuizQuestion[] = [
  {
    prompt: "Hva kjennetegner suturstadiet (orogenese) i Wilsonsyklusen?",
    options: [
      "Kontinentet sprekker opp og danner en langstrakt riftdal med innsjøer.",
      "To kontinentalplater kolliderer etter at havbunnen er fullstendig subdusert; jordskorpa forkortes og fortykkes til en mektig fjellkjede.",
      "Havbunnen utvider seg med 2–10 cm i året fra en sentral midthavsrygg.",
      "En mantelplym brenner hull gjennom litosfæren og bygger en rekke av vulkanske øyer.",
    ],
    answer: 1,
    explain:
      "Riktig! I suturstadiet (som i dagens Himalaya og oldtidens Kaledonider) har havbassenget lukket seg helt. Den lette kontinentale skorpen kan ikke subdueres, og kollisjonen folder og stabler jordskorpa i mektige skyvedekker og fjellkjeder langs suturlinjen.",
  },
  {
    prompt:
      "Hva er den fundamentale forskjellen mellom et modent havstadium (Atlanterhavet) og et avtagende havstadium (Stillehavet) i Wilsonsyklusen?",
    options: [
      "Atlanterhavet har ferskvann, mens Stillehavet er salt.",
      "Atlanterhavet utvider seg og har passive kontinentalmarginer uten subduksjonssoner, mens Stillehavet krymper fordi subduksjonssoner langs randen (Ildringen) sluker havbunn raskere enn den produseres.",
      "Stillehavet har ingen midthavsrygger, mens Atlanterhavet har mange.",
      "Wilsonsyklusen gjelder kun for Middelhavet, ikke for store verdenshav.",
    ],
    answer: 1,
    explain:
      "Riktig! I Wilsonsyklusen er Atlanterhavet et voksende hav med passive kontinentalmarginer, mens Stillehavet er et krympende hav dominert av subduksjonssoner som trekker havbunnsskorpen ned i mantelen.",
  },
];

export const QUIZ_TEST_DEG_SELV: QuizQuestion[] = [
  {
    prompt: "Hva er den mekaniske forskjellen på litosfæren og astenosfæren?",
    options: [
      "Litosfæren er det kalde, stive ytterste skallet (skorpe + stiv mantel), mens astenosfæren er varm, fast peridotitt som oppfører seg duktilt og seigtflytende over millioner av år.",
      "Litosfæren er flytende magma, mens astenosfæren er fast granitt.",
      "Litosfæren finnes bare under kontinentene, mens astenosfæren er havbunn.",
      "Litosfæren og astenosfæren er identiske, men har ulik kjemisk sammensetning av silisium.",
    ],
    answer: 0,
    explain:
      "Riktig. Begge består av fast bergart, men litosfæren er kald og stiv (deler seg i plater), mens astenosfæren er så varm (ca. 1300–1400 °C) at den deformeres plastisk og lar platene gli over seg.",
  },
  {
    prompt: "Hva er den viktigste drivkraften bak litosfæreplates bevegelse?",
    options: [
      "Tidevannskrefter fra månen som trekker kontinentene vestover.",
      "Friksjonsdrag fra vinder i troposfæren som skyver på fjellkjedene.",
      "Platetrekk (slab pull): Kald og gammel havbunnsskorpe omdannes til tung eklogitt og synker under egen vekt i subduksjonssonen.",
      "Sentrifugalkraft fra jordas rotasjon som kaster platene mot ekvator.",
    ],
    answer: 2,
    explain:
      "Riktig! Platetrekk (slab pull) er den viktigste drivkraften. Tetthetsøkningen ved faseovergang til eklogitt trekker hele platen etter seg.",
  },
  {
    prompt: "Hva er den grunnleggende forskjellen mellom dekompresjonssmelting og flukssmelting?",
    options: [
      "Dekompresjonssmelting skjer bare i kjernen, mens flukssmelting skjer i atmosfæren.",
      "Dekompresjonssmelting krever ekstern oppvarming fra meteorittnedslag, mens flukssmelting skjer spontant i granitt.",
      "Det er ingen forskjell; begge prosessene krever at temperaturen stiger til over 5000 °C.",
      "Dekompresjonssmelting skjer ved trykkfall når varm mantel stiger (ved midthavsrygger), mens flukssmelting skjer når vann fra en subdusert plate senker smeltetemperaturen i mantelkilen.",
    ],
    answer: 3,
    explain:
      "Riktig! Dekompresjonssmelting drives av trykkavlastning under midthavsrygger og rifter uten tilførsel av ny varme. Flukssmelting drives av vann og flyktige stoffer som frigjøres fra den synkende havbunnsplaten og senker peridotittens solidus.",
  },
  {
    prompt:
      "Hvorfor er en transformforkastning seismisk aktiv bare mellom spredningsryggene, og ikke i bruddsonen utenfor?",
    options: [
      "Fordi havvannet kjøler ned bergartene utenfor ryggen.",
      "Fordi platene på hver side av sprekken utenfor ryggaksen beveger seg i samme retning med samme fart (ingen relativ bevegelse).",
      "Fordi jordskjelvbølger bare kan bevege seg mot øst.",
      "Fordi bruddsonene er fylt med flytende magma som demper rystelser.",
    ],
    answer: 1,
    explain:
      "Riktig! Som J. Tuzo Wilson viste i 1965: Kun mellom ryggsegmentene glir platene i motsatt retning. Utenfor ryggene beveger skorpen seg unisont i samme retning; bruddsonene er derfor aseismiske arr.",
  },
  {
    prompt: "Hvilken hypotese la Vine og Matthews fram i 1963?",
    options: [
      "At havbunnen har fossiler av dinosaurer som viser alderen.",
      "At tidevannsbølger over Den midtatlantiske rygg skyver platene.",
      "At havbunnen på hver side av midthavsryggen skulle ha symmetriske striper med normal og reversert magnetisering, fordi ny skorpe dannes ved ryggen mens magnetfeltet snur.",
      "At havbunnen ligger direkte på jordas flytende ytre kjerne.",
    ],
    answer: 2,
    explain:
      "Riktig! Hypotesen kunne testes, og den ble bekreftet i 1966. Da havbunnen spredte seg og størknet, frøs magnetittmineralene inn jordas vekslende magnetfelt som et gigantisk symmetrisk båndopptak.",
  },
  {
    prompt: "Hva oppstår når to oseaniske plater konvergerer (kolliderer)?",
    options: [
      "Som regel subduerer den eldste og tetteste havbunnsplaten, og det dannes en dyphavsgrop og en vulkansk øybue (f.eks. Marianene eller Japan).",
      "En enorm kontinental riftdal med ferskvannsinnsjøer.",
      "Det dannes en passiv margin uten noen form for seismisk aktivitet.",
      "Begge platene smelter momentant og danner en ny kontinental kraton.",
    ],
    answer: 0,
    explain:
      "Riktig! Ved oseanisk-oseanisk konvergens vil den eldste, kaldeste og dermed tetteste litosfæreplaten presses ned i subduksjon. Resultatet er en dyp grop og en buet kjede av vulkanske øyer (øybue).",
  },
  {
    prompt: "Hvorfor begynner gammel havbunnsskorpe til slutt å subduere av seg selv i Wilsonsyklusen?",
    options: [
      "Fordi havvannet gjør skorpen magnetisk frastøtende.",
      "Fordi månen drar i sedimentene på havbunnen.",
      "Fordi midthavsryggene slutter å eksistere etter 10 millioner år.",
      "Fordi litosfæren avkjøles og tykner over titalls millioner år, slik at den til slutt blir tettere enn den underliggende astenosfæren.",
    ],
    answer: 3,
    explain:
      "Riktig! Mens litosfæren beveger seg bort fra midthavsryggen, avkjøles den fra toppen og underfra. Litosfæren tykner og tettheten øker. Etter ca. 20–30 millioner år er oseanisk litosfære tettere enn astenosfæren den hviler på, og blir ustabil overfor subduksjon.",
  },
  {
    prompt: "Hvordan virker drivkraften ryggskyv (ridge push)?",
    options: [
      "Magma presses ut som fra en sprøyte og skyver kontinentene sideveis.",
      "Det er en gravitasjonsglidning der den hevede, varme midthavsryggen (2–3 km over dyphavssletten) sklir nedover skråningen under egen vekt.",
      "Bølger på havoverflaten skyver mot vulkantoppene.",
      "Kontinentene suger til seg havbunnsskorpen ved elektrostatisk tiltrekning.",
    ],
    answer: 1,
    explain:
      "Riktig! Midthavsryggene rager 2–3 km høyere enn dyphavsslettene på grunn av termisk oppdrift. Tyngdekraften skaper en horisontal kraftkomponent som får litosfæren til å skli nedover skråningen bort fra ryggen.",
  },
];

export const QUIZ_VULKANER: QuizQuestion[] = [
  {
    prompt: "Hvorfor blir Hawaii-øyene eldre mot nordvest?",
    options: [
      "Hotspoten flytter seg mot sørøst",
      "Platen glir mot nordvest over en hotspot som ligger i ro",
      "Øyene i nordvest har hatt flere utbrudd",
      "Havbunnen er eldst i sørøst",
    ],
    answer: 1,
    explain: "Nye vulkaner dannes over hotspoten, og de eldre følger med platen mot nordvest. Kauai er ca. 5,5 millioner år, mens Big Island er yngre enn 0,7 millioner år og fortsatt aktiv.",
  },
  {
    prompt: "Hvorfor er ryolittisk magma mer eksplosiv enn basaltisk magma?",
    options: [
      "Den er varmere",
      "Den inneholder mindre gass",
      "Den har mye SiO₂, er seig og holder på gassen",
      "Den dannes ved midthavsrygger",
    ],
    answer: 2,
    explain: "Ryolittisk magma har over 63 % SiO₂. Silikattetraedrene kobles sammen, magmaen blir seig, og gassboblene slipper ikke ut før trykket blir svært høyt.",
  },
  {
    prompt: "Hva var hovedgrunnen til at asken fra Eyjafjallajökull i 2010 var så farlig for flytrafikken?",
    options: [
      "Magma møtte isbreen og ble sprengt i svært fine glasspartikler som smelter i jetmotorer",
      "Utbruddet var det største på Island i moderne tid",
      "Asken inneholdt mye CO₂",
      "Lavaen rant ut i havet",
    ],
    answer: 0,
    explain: "Møtet med vannet gjorde asken svært finkornet. Glasset smelter ved om lag 1100 °C, mens forbrenningskamrene i jetmotorer kan bli 1400–1700 °C.",
  },
  {
    prompt: "Hvilket utbrudd ga «året uten sommer» i 1816?",
    options: [
      "Krakatau",
      "Vesuv",
      "Pinatubo",
      "Tambora",
    ],
    answer: 3,
    explain: "Tambora hadde utbrudd i april 1815 (VEI 7). Svovelsyredråper i stratosfæren sprer sollys, og året etter ble det frost og snø om sommeren i Europa og Nord-Amerika.",
  },
  {
    prompt: "Hva viser sammenligningen av Armero 1985 og Pinatubo 1991?",
    options: [
      "At laharer er mindre farlige enn pyroklastiske strømmer",
      "At farekart og varsler redder liv bare når de blir fulgt opp med evakuering",
      "At det ikke går an å varsle vulkanutbrudd",
      "At store utbrudd alltid gir flere dødsfall enn små",
    ],
    answer: 1,
    explain: "I Armero fantes et farekart, men varselet kom sent og ble ikke fulgt opp, og over 23 000 omkom. Ved Pinatubo ble folk evakuert i tide, og minst 5000 liv ble reddet.",
  },
  {
    prompt: "Hvorfor regnes Beerenberg som en stratovulkan, selv om lavaen er basaltisk?",
    options: [
      "Fordi den er dekket av is",
      "Fordi den er Norges høyeste fjell",
      "Fordi den ligger på en plategrense",
      "Fordi utbruddene veksler mellom lavastrømmer og tefra og bygger en bratt, lagdelt kjegle",
    ],
    answer: 3,
    explain: "Typen bestemmes av oppbygningen. Beerenberg er bygd av vekslende lag av lava og tefra, og den har bratte sider.",
  },
];

export const QUIZ_JORDSKJELV: QuizQuestion[] = [
  {
    prompt: "Hva viser det at S-bølger ikke kommer fram på den andre siden av jorda?",
    options: [
      "At den ytre kjernen er flytende, så skjærbølger stopper.",
      "At S-bølger bare finnes i atmosfæren.",
      "At jordskorpa er for tykk til at bølgene når fram.",
    ],
    answer: 0,
    explain:
      "S-bølger er skjærbølger og går ikke gjennom væske, så den ytre kjernen må være flytende.",
  },
  {
    prompt: "Hvorfor har Norge jordskjelv når landet ikke ligger på en plategrense?",
    options: [
      "Fordi Oslofeltet fortsatt er en aktiv rift.",
      "Fordi gamle forkastninger kan gli på nytt når spredning og landheving bygger opp spenning.",
      "Fordi alle skjelv i Norge kommer fra subduksjon under Vestlandet.",
    ],
    answer: 1,
    explain:
      "Spenning fra spredningen langs ryggen og fra landhevingen etter istiden får gamle forkastninger til å gli på nytt – Norge har ingen aktiv rift eller subduksjonssone.",
  },
  {
    prompt: "Hvor skjer de store, ødeleggende jordskjelvene oftest?",
    options: [
      "Langs plategrenser, der spenning bygges opp mellom platene.",
      "Bare midt inne på platene, slik som i Oslo.",
      "Bare der en vulkan har utbrudd.",
    ],
    answer: 0,
    explain:
      "Spenningen bygges opp der platene henger i hverandre, og de største skjelvene skjer i subduksjonssoner.",
  },
  {
    prompt: "To skjelv har magnitude 5 og 7. Omtrent hvor mye mer energi frigjør det største?",
    options: [
      "Ca. 2 ganger så mye.",
      "Ca. 64 ganger så mye.",
      "Ca. 1000 ganger så mye.",
    ],
    answer: 2,
    explain:
      "Hvert trinn gir ca. 32 ganger så mye energi, så to trinn gir 32 · 32 ≈ 1000 ganger.",
  },
  {
    prompt: "Hva er forskjellen på magnitude og intensitet?",
    options: [
      "Et skjelv har én magnitude, men mange intensiteter.",
      "Et skjelv har mange magnituder, men én intensitet.",
      "Magnitude og intensitet er det samme, bare målt med ulike instrumenter.",
    ],
    answer: 0,
    explain:
      "Magnituden beskriver energien i selve skjelvet, mens intensiteten beskriver virkningen på hvert sted og varierer derfor.",
  },
];

export const QUIZ_SJEKK_JORDSKJELV_1: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på hyposenter og episenter?",
    options: [
      "Hyposenteret ligger på overflaten, og episenteret ligger i dypet.",
      "Hyposenteret er stedet i dypet der bruddet starter, og episenteret er punktet på overflaten rett over.",
      "De er to ord for det samme stedet.",
    ],
    answer: 1,
    explain:
      "Hypo betyr «under» og epi betyr «over» på gresk.",
  },
  {
    prompt: "Hva menes med elastisk tilbakefjæring?",
    options: [
      "Fjellet bøyes sakte langs en låst forkastning og spretter tilbake når friksjonen ryker.",
      "Mantelen smelter og skyver skorpa opp.",
      "Skorpa trekker seg sammen når den blir kald.",
    ],
    answer: 0,
    explain:
      "Mantelen smelter ikke – den er fast – og jordskjelv skyldes brudd i berg som har vært under spenning. Skorpa som trekker seg sammen, forklarer ikke et plutselig brudd.",
  },
];

export const QUIZ_SJEKK_JORDSKJELV_2: QuizQuestion[] = [
  {
    prompt: "Hvor skjer de aller største jordskjelvene?",
    options: [
      "Ved midthavsryggene.",
      "I subduksjonssoner, der en plate synker under en annen.",
      "Midt inne på platene.",
    ],
    answer: 1,
    explain:
      "Bruddflaten kan bli flere hundre kilometer lang, og alle skjelv over magnitude 9 som er målt, har skjedd der.",
  },
  {
    prompt: "Hvorfor finner vi dype skjelv (300–700 km) nesten bare i subduksjonssoner?",
    options: [
      "Fordi bare i den kalde, synkende plata er det kaldt nok til at det kan oppstå skjelv på stort dyp.",
      "Fordi mantelen er flytende under midthavsryggene.",
      "Fordi jordskorpa er 700 km tykk der.",
    ],
    answer: 0,
    explain:
      "Mantelen er ikke flytende noe sted – den er fast, men så varm at den vanligvis deformeres plastisk. Bare i den kalde, synkende plata er det kaldt nok til skjelv på stort dyp, men nøyaktig hvordan de dypeste skjelvene oppstår, er ennå ikke helt forstått. Skorpa er bare noen titalls kilometer tykk.",
  },
];

export const QUIZ_SJEKK_JORDSKJELV_3: QuizQuestion[] = [
  {
    prompt: "Hvilken bølgetype kommer først fram til en målestasjon?",
    options: [
      "S-bølgen.",
      "Overflatebølgen.",
      "P-bølgen.",
    ],
    answer: 2,
    explain:
      "P står for primary (= den første).",
  },
  {
    prompt: "Hvilke bølger rister husene mest?",
    options: [
      "P-bølgene, fordi de er raskest.",
      "Overflatebølgene, fordi de har størst utslag.",
      "S-bølgene, fordi de går gjennom væske.",
    ],
    answer: 1,
    explain:
      "Det er utslaget, ikke farten, som avgjør hvor mye bakken rister. Og S-bølger går ikke gjennom væske.",
  },
];

export const QUIZ_SJEKK_JORDSKJELV_4: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på magnitude og intensitet?",
    options: [
      "Magnituden beskriver hvor mye energi skjelvet frigjorde, og intensiteten beskriver hvordan skjelvet merkes på ett bestemt sted.",
      "Magnituden varierer fra sted til sted, mens intensiteten er den samme overalt.",
      "Det er to navn på det samme tallet.",
    ],
    answer: 0,
    explain:
      "Et skjelv har én magnitude, men mange intensiteter – det er intensiteten som varierer fra sted til sted.",
  },
  {
    prompt: "Et skjelv har magnitude 7, et annet magnitude 6. Omtrent hvor mye mer energi frigjør det første?",
    options: [
      "Ca. 2 ganger så mye.",
      "Ca. 10 ganger så mye.",
      "Ca. 32 ganger så mye.",
    ],
    answer: 2,
    explain:
      "Én magnitude mer gir omtrent 32 ganger så mye energi. «Ti ganger» gjelder hvor mange færre skjelv det blir.",
  },
];

export const QUIZ_SJEKK_JORDSKJELV_5: QuizQuestion[] = [
  {
    prompt: "Hvorfor kommer det ikke fram direkte S-bølger lenger ut enn ca. 103 grader fra skjelvet?",
    options: [
      "Fordi mantelen er flytende.",
      "Fordi den ytre kjernen er flytende, og S-bølger ikke går gjennom væske.",
      "Fordi den indre kjernen reflekterer alle bølger.",
    ],
    answer: 1,
    explain:
      "Mantelen er fast, og S-bølgene går gjennom den. Det er den ytre kjernen som er flytende og stopper dem.",
  },
  {
    prompt: "Hva skjer med farten til P-bølgene når de går fra mantelen inn i den ytre kjernen?",
    options: [
      "Farten øker med ca. 40 %.",
      "Farten faller med ca. 40 %.",
      "Farten er uendret.",
    ],
    answer: 1,
    explain:
      "Ifølge PREM faller farten fra ca. 13,7 til ca. 8,1 km/s.",
  },
];

export const QUIZ_SJEKK_JORDSKJELV_6: QuizQuestion[] = [
  {
    prompt: "Hvorfor har Norge jordskjelv, selv om landet ikke ligger ved en plategrense?",
    options: [
      "Fordi det er en subduksjonssone under Vestlandet.",
      "Fordi spenning fra spredningen langs Den midtatlantiske ryggen og landhevingen etter istiden kan få gamle forkastninger til å gli på nytt.",
      "Fordi Oslofeltet er en aktiv vulkan.",
    ],
    answer: 1,
    explain:
      "Det finnes ingen subduksjonssone under Vestlandet, og Oslofeltet er ikke aktivt i dag.",
  },
  {
    prompt: "Hvilket av disse skjelvene er det største som er målt på norsk territorium?",
    options: [
      "Oslofjorden 1904 (5,4).",
      "Helgeland/Lurøy 1819 (ca. 5,8).",
      "Jan Mayen 2012 (6,6).",
    ],
    answer: 2,
    explain:
      "Lurøy 1819 er det største kjente på fastlandet i historisk tid, men Jan Mayen 2012 og Storfjorden 2008 er større.",
  },
];

export const QUIZ_SJEKK_SKJELVFARE_1: QuizQuestion[] = [
  {
    prompt: "Hva er riktig om en tsunami?",
    options: [
      "Den kommer alltid som én stor bølge.",
      "Den kommer ofte som flere bølger, og den første er ikke nødvendigvis den største.",
      "Den første bølgen er alltid den største, så faren er over når den har passert.",
    ],
    answer: 1,
    explain:
      "Derfor skal folk holde seg unna kysten til faren er offisielt over.",
  },
  {
    prompt: "Hva var årsaken til flodbølgen i Tafjord i 1934?",
    options: [
      "Et undersjøisk jordskjelv på en plategrense.",
      "Et fjellskred som raste ut i fjorden.",
      "En storm.",
    ],
    answer: 1,
    explain:
      "De historiske flodbølgene i Norge kommer fra skred, ikke fra plategrenser.",
  },
];

export const QUIZ_SJEKK_SKJELVFARE_2: QuizQuestion[] = [
  {
    prompt: "Hva er likvefaksjon?",
    options: [
      "At vannmettet sand og silt mister bæreevnen og oppfører seg som en væske når grunnen rister.",
      "At magma strømmer opp gjennom sprekker etter et skjelv.",
      "At bygninger begynner å svinge i takt med bølgene.",
    ],
    answer: 0,
    explain:
      "Det andre alternativet beskriver vulkanisme, og det tredje beskriver resonans.",
  },
  {
    prompt: "Hvorfor ble særlig middels høye bygninger ødelagt i Mexico by i 1985?",
    options: [
      "Fordi de var eldst.",
      "Fordi bakken i de bløte sedimentene svingte i takt med bygningenes egen svingefrekvens (resonans).",
      "Fordi episenteret lå rett under dem.",
    ],
    answer: 1,
    explain:
      "Byen lå ca. 350 km fra episenteret, så det var grunnen og resonansen som var avgjørende.",
  },
];

export const QUIZ_SJEKK_SKJELVFARE_3: QuizQuestion[] = [
  {
    prompt: "Hva er tidlig varsling av jordskjelv?",
    options: [
      "Et varsel om at et skjelv kommer neste uke.",
      "Et varsel som sendes ut etter at skjelvet har startet, men før de kraftigste bølgene når fram.",
      "Et kart over hvor det kan komme skjelv de neste 50 årene.",
    ],
    answer: 1,
    explain:
      "Det tredje alternativet er langtidsvarsling. Korttidsvarsling av den typen det første alternativet beskriver, er det ennå ingen som klarer på en pålitelig måte.",
  },
  {
    prompt: "Hvorfor kan vi varsle en tsunami bedre enn et jordskjelv?",
    options: [
      "Fordi tsunamien går mye saktere enn jordskjelvbølgene og ofte bruker timer på å krysse havet.",
      "Fordi tsunamier bare oppstår om dagen.",
      "Fordi tsunamier alltid er små nær kilden.",
    ],
    answer: 0,
    explain:
      "Tsunamier kan oppstå når som helst, og nær kilden kan de være svært store og komme etter få minutter.",
  },
];

export const QUIZ_SKJELVFARE: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på en tsunami fra et undersjøisk skjelv og de historiske flodbølgene i Norge?",
    options: [
      "Begge kommer av at to plater kolliderer utenfor norskekysten.",
      "Et undersjøisk skjelv kan flytte havbunnen. Storegga og Tafjord var skred som traff vann.",
      "Norske flodbølger kommer bare fra vind, aldri fra masse som treffer vann.",
    ],
    answer: 1,
    explain:
      "Et undersjøisk skjelv løfter havbunnen, mens Storegga og Tafjord var skred som traff vann.",
  },
  {
    prompt: "Hvorfor kan et skjelv som Oslofjordskjelvet i 1904 gjøre mer skade i dag?",
    options: [
      "Fordi fjellet er blitt sprøere siden 1904.",
      "Fordi bebyggelsen er tettere og høyere, så flere er eksponert.",
      "Fordi Norge har flyttet seg inn på en subduksjonssone.",
    ],
    answer: 1,
    explain:
      "Faren er den samme som i 1904, men eksponeringen og sårbarheten har økt.",
  },
  {
    prompt: "Hva tar oftest liv når det skjer et kraftig jordskjelv?",
    options: [
      "Selve rystelsene i bakken.",
      "Bygninger som raser sammen, og følger som skred, brann og tsunami.",
      "Sprekker som åpner seg i bakken.",
    ],
    answer: 1,
    explain:
      "Det er sjelden selve rystelsene som dreper – bygninger som kollapser og følgehendelser tar flest liv.",
  },
  {
    prompt: "Et område har et gjentaksintervall på 100 år for et kraftig skjelv. Hva betyr det?",
    options: [
      "At skjelvet kommer nøyaktig hvert hundrede år.",
      "At det i gjennomsnitt går 100 år mellom hvert skjelv, men at de kan komme ujevnt.",
      "At det ikke kan komme et nytt skjelv før om 100 år.",
    ],
    answer: 1,
    explain:
      "Gjentaksintervallet er et gjennomsnitt, og sannsynligheten for minst ett skjelv på 100 år er bare ca. 63 prosent.",
  },
  {
    prompt: "Hvilket tiltak senker risikoen selv om faren er den samme?",
    options: [
      "Å bygge sterkere og la være å bygge sykehus på dårlig grunn.",
      "Å flytte forkastningen.",
      "Å slutte å registrere jordskjelv.",
    ],
    answer: 0,
    explain:
      "Vi kan ikke endre faren, men vi kan redusere sårbarheten og eksponeringen.",
  },
];

export const QUIZ_BERGARTER: QuizQuestion[] = [
  {
    prompt: "Hvorfor tester du Mohs på ett mineralkorn, ikke på hele bergarten?",
    options: [
      "En bergart er like hard overalt, så ett tall holder",
      "En bergart kan bestå av flere mineraler, og hvert korn har sin egen hardhet",
      "Mohs-skalaen gjelder bare kalkstein",
      "En bergart har ingen hardhet",
    ],
    answer: 1,
    explain: "Mohs er en skala for mineraler. Kvarts er 7 og ortoklas er 6, og en granitt har korn av begge.",
  },
  {
    prompt: "Hvilket par består av en dypbergart og en dagbergart fra samme smeltefamilie i Osloriften?",
    options: [
      "Gneis og fyllitt",
      "Sandstein og leirstein",
      "Kalkstein og marmor",
      "Larvikitt og rombeporfyr",
    ],
    answer: 3,
    explain: "Larvikitt størknet ferdig på dypet. Rombeporfyr nådde overflaten før smelten var ferdig krystallisert, og har derfor store feltspatkrystaller i en finkornet grunnmasse.",
  },
  {
    prompt: "Hva er forskjellen på forvitring og erosjon?",
    options: [
      "Forvitring bryter ned berg på stedet, mens erosjon er nedsliting pluss transport",
      "Begge betyr at vann frakter sand til havet",
      "Forvitring er transport, og erosjon er oppløsning på stedet",
      "Forvitring skjer bare i varmt klima",
    ],
    answer: 0,
    explain: "Ved forvitring blir fragmentene liggende. Først når vann, is eller tyngdekraft flytter dem, er det erosjon.",
  },
  {
    prompt: "Hvilket mineral hører til gruppen sulfider?",
    options: [
      "Kalsitt",
      "Hematitt",
      "Pyritt",
      "Kvarts",
    ],
    answer: 2,
    explain: "Pyritt (FeS₂) er bygd rundt svovel og er et sulfid. Kalsitt er et karbonat, hematitt et oksid og kvarts et silikat.",
  },
  {
    prompt: "I granittisk sand, hvilket mineral forsvinner først ved kjemisk forvitring?",
    options: [
      "Kvarts",
      "Kalifeltspat",
      "Kaolinitt",
      "Hornblende",
    ],
    answer: 3,
    explain: "Hornblende forsvinner fortere enn plagioklas, og plagioklas fortere enn kalifeltspat. Til slutt blir kaolinitt og kvarts igjen (White mfl., 1996).",
  },
  {
    prompt: "Hvorfor viser gneis eldre enn 900 millioner år at en bergart ikke må gjennom hele syklusen?",
    options: [
      "Gneisen i grunnfjellet i Sør-Norge er fortsatt metamorf. Syklusen er en modell med flere veier",
      "Gneis må smelte før den kan bli så gammel",
      "Alle bergarter blir sedimentære etter 900 millioner år",
      "Gneis er en sedimentær bergart",
    ],
    answer: 0,
    explain: "Gneisen ble dannet for mer enn 900 millioner år siden og er fortsatt en metamorf bergart. Den har ikke smeltet eller blitt til sediment.",
  },
];

export const QUIZ_VANN_OG_FLOM: QuizQuestion[] = [
  {
    prompt: "Hva er drivkraften i det hydrologiske kretsløpet?",
    options: [
      "Jordas rotasjon",
      "Tidevannet",
      "Sola",
      "Varmen fra jordas indre",
    ],
    answer: 2,
    explain: "Sola varmer opp hav og land, slik at vann fordamper. Se «Hva er det hydrologiske kretsløpet?».",
  },
  {
    prompt: "Hvorfor har godt sortert grus og sand høyere permeabilitet enn silt og leire?",
    options: [
      "Grus og sand har store, sammenhengende hulrom, mens silt og leire er tett pakket",
      "Leire har ingen porer",
      "Permeabiliteten i løsmasser styres bare av sprekker i fjellet",
      "Grus og sand inneholder mer salt",
    ],
    answer: 0,
    explain: "NGU beskriver sortering og pakking som det som styrer permeabiliteten i løsmasser. Se «Hva er en akvifer?».",
  },
  {
    prompt: "Hva betyr det at en flom er en 100-årsflom?",
    options: [
      "Den kommer nøyaktig hvert hundrede år",
      "Den har 10 prosent sannsynlighet hvert år",
      "Den kan bare komme én gang i livet",
      "Den har 1 prosent sannsynlighet for å bli overskredet hvert år",
    ],
    answer: 3,
    explain: "Gjentaksintervallet er et gjennomsnitt. En 100-årsflom kan komme to år på rad (Varsom).",
  },
  {
    prompt: "Hva skjer med avrenningen når et nedbørfelt bygges ut med mange tette flater?",
    options: [
      "Mer vann infiltrerer",
      "Avrenningen blir raskere, og flomtoppen blir større",
      "Fordampningen øker kraftig",
      "Grunnvannstanden stiger alltid",
    ],
    answer: 1,
    explain: "Vannet kan ikke trenge ned i asfalt og tak. NVE peker også på at grunnvannstanden kan synke. Se «Hvordan påvirker mennesket vannets kretsløp?».",
  },
  {
    prompt: "Hvordan kan et reguleringsmagasin dempe en flom?",
    options: [
      "Ved å ha ledig plass når flommen kommer, slik at vann holdes tilbake",
      "Ved å slippe alt vannet på en gang",
      "Ved å øke minstevannføringen",
      "Ved å fryse vannet om vinteren",
    ],
    answer: 0,
    explain: "Ledig magasinkapasitet gir lavere flomtopp nedstrøms. Effekten minker jo større flommen er (NVE).",
  },
  {
    prompt: "Hvilket utsagn om ferskvann i verden er riktig?",
    options: [
      "Det meste av ferskvannet ligger i elver og innsjøer",
      "Grunnvann brukes nesten ikke",
      "Omtrent halvparten av verdens befolkning har alvorlig vannmangel i minst en del av året",
      "Industrien bruker mest ferskvann",
    ],
    answer: 2,
    explain: "Ferskvannet ligger mest i is og grunnvann. Jordbruket bruker 72 prosent av uttaket (UNESCO).",
  },
];

export const QUIZ_SJEKK_VANN_OG_FLOM_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan leire holde mye vann, men likevel være en dårlig akvifer?",
    options: [
      "Leire har ingen hulrom",
      "Leire har høy porøsitet, men lav permeabilitet, så vannet strømmer dårlig",
      "Leire ligger alltid over grunnvannsspeilet",
    ],
    answer: 1,
    explain: "Porøsitet er hvor mye hulrom det er. Permeabilitet er om vannet kan strømme. Leire har små, tette porer og slipper lite vann gjennom.",
  },
  {
    prompt: "Hvorfor renner elva fortsatt etter flere uker uten regn?",
    options: [
      "Fordi grunnvann siger inn i elva hele tiden",
      "Fordi havet presser vann opp i elva",
      "Fordi elvevann ikke fordamper",
    ],
    answer: 0,
    explain: "Grunnvannet strømmer langsomt mot elva. I en tørkeperiode kan 40–100 prosent av vannet i elva være grunnvann (NGU).",
  },
];

export const QUIZ_SJEKK_VANN_OG_FLOM_2: QuizQuestion[] = [
  {
    prompt: "Hva viser et hydrogram?",
    options: [
      "Grunnvannsspeilet mot dybde",
      "Nedbør mot temperatur",
      "Vannføring mot tid",
    ],
    answer: 2,
    explain: "Hydrogrammet er vannføringen i en elv tegnet mot tid.",
  },
  {
    prompt: "Hvorfor gir en regnflom i et lite, bratt felt en spiss topp?",
    options: [
      "Vannet når elva raskt fordi det er lite lagringsplass i feltet",
      "Regnet fryser til is før det når elva",
      "Grunnvannet stopper all avrenning",
    ],
    answer: 0,
    explain: "I et lite, bratt felt med få innsjøer og tynne løsmasser renner vannet raskt til elva. Toppen kommer fort og forsvinner fort.",
  },
];

export const QUIZ_SJEKK_VANN_OG_FLOM_3: QuizQuestion[] = [
  {
    prompt: "En elv hadde en 100-årsflom i fjor. Hva er sannsynligheten for en like stor flom i år?",
    options: [
      "0 prosent, den kommer ikke før om 99 år",
      "50 prosent",
      "1 prosent, som alle andre år",
    ],
    answer: 2,
    explain: "En 100-årsflom har 1 prosent sannsynlighet hvert år. Den kan komme to år på rad, selv om det er lite sannsynlig.",
  },
  {
    prompt: "Hvilken flomtype gir ofte de største flommene på Østlandet?",
    options: [
      "Regn- og snøsmelteflom",
      "Stormflo",
      "Overvann i kjelleren",
    ],
    answer: 0,
    explain: "Vesleofsen i 1995 og flommene i 2011 og 2013 kom av mye regn og sterk snøsmelting samtidig (Varsom).",
  },
];

export const QUIZ_SJEKK_VANN_OG_FLOM_4: QuizQuestion[] = [
  {
    prompt: "Hvordan endrer en ny by med mye asfalt hydrogrammet i bekken nedenfor?",
    options: [
      "Toppen blir lavere og kommer senere",
      "Toppen blir høyere og kommer raskere",
      "Ingenting, for regnet er det samme",
    ],
    answer: 1,
    explain: "Tette flater gir mindre infiltrasjon og raskere overflateavrenning. Da kommer mer vann raskere fram til bekken (NVE).",
  },
  {
    prompt: "Hva er minstevannføring?",
    options: [
      "Den laveste vannføringen som er målt i en elv",
      "Vannet som skal tappes fra magasinet før en flom",
      "En viss mengde vann som et kraftverk alltid må slippe forbi på en elvestrekning",
    ],
    answer: 2,
    explain: "NVE setter ofte vilkår om minstevannføring for å ta vare på naturmangfold og friluftsliv på strekninger som får mindre vann.",
  },
];

export const QUIZ_SJEKK_VANN_OG_FLOM_5: QuizQuestion[] = [
  {
    prompt: "Hvor kommer det meste av vannforsyningen i Norge fra?",
    options: [
      "Grunnvann",
      "Overflatevann fra innsjøer og elver",
      "Avsaltet sjøvann",
    ],
    answer: 1,
    explain: "Grunnvann utgjør bare ca. 15 prosent av vannforsyningen i Norge, fordi vi har mye rent overflatevann (NGU).",
  },
  {
    prompt: "Hva betyr det at et grunnvannsuttak er bærekraftig?",
    options: [
      "At vi tar ut så mye vi trenger, uansett hvor mye som dannes",
      "At vannet bare brukes til jordbruk",
      "At uttaket ikke er større enn det som fornyes, og at vannet holdes rent",
    ],
    answer: 2,
    explain: "Tar vi ut mer enn det som fornyes, synker grunnvannsspeilet. Ved kysten kan saltvann trenge inn (UNESCO).",
  },
];

export const QUIZ_SJEKK_SKRED_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan marin leire bli kvikk?",
    options: [
      "Fordi ferskt grunnvann vasker ut saltet, slik at bindingene i korthusstrukturen svekkes",
      "Fordi leira blir varmet opp av grunnvannet",
      "Fordi isen presset leira sammen under istida",
    ],
    answer: 0,
    explain: "Saltvannet holder korthusstrukturen sammen. Synker saltinnholdet under ca. 2 g/l, svekkes bindingene (NGU).",
  },
  {
    prompt: "Kan et kvikkleireskred ta med seg et nesten flatt jorde?",
    options: [
      "Nei, skred går bare i bratte skråninger",
      "Ja, fordi skredet kan forplante seg bakover når kanten mister støtten",
      "Bare hvis det regner samtidig",
    ],
    answer: 1,
    explain: "Et bakoverforplantende (retrogressivt) skred sprer seg bakover til lommen er tømt. Derfor kan det nå langt inn i flatt terreng.",
  },
  {
    prompt: "Hva er de vanligste utløserne av kvikkleireskred?",
    options: [
      "Jordskjelv og vulkanutbrudd",
      "Snøsmelting på fjellet",
      "Erosjon fra bekker og elver, og graving eller fylling i skråningen",
    ],
    answer: 2,
    explain: "Erosjon og menneskers tiltak overbelaster leira oftest. Graving og fylling er blant de vanligste årsakene i nyere tid.",
  },
];

export const QUIZ_SJEKK_SKRED_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor er flodbølger den største faren ved fjellskred i Norge?",
    options: [
      "Fordi skredmassene som treffer en fjord eller innsjø, kan sende bølger langt opp på land og langt unna",
      "Fordi steinene alltid ruller helt ned til sjøen",
      "Fordi fjellskred bare skjer under vann",
    ],
    answer: 0,
    explain: "I Tafjord 1934 nådde bølgene 61 m opp på land, og i Loen 1936 74 m. Bølgen rammer bygder som ligger langt fra selve skredet.",
  },
  {
    prompt: "Hvilke fjellpartier overvåker NVE kontinuerlig?",
    options: [
      "Alle bratte fjellsider i Norge",
      "Fjellpartier med høy risiko, som Åknes og Mannen",
      "Bare fjellpartier som allerede har rast ut",
    ],
    answer: 1,
    explain: "Høy risiko gir kontinuerlig overvåking med minst to uavhengige målesystemer. Moderat risiko gir periodisk overvåking.",
  },
];

export const QUIZ_SKRED: QuizQuestion[] = [
  {
    prompt: "Hva skjer når kvikkleire blir overbelastet?",
    options: [
      "All marin leire er allerede flytende fra den ble avsatt.",
      "Korthusstrukturen kollapser, og leira blir flytende.",
      "Leira blir fastere fordi saltinnholdet øker.",
    ],
    answer: 1,
    explain:
      "Se «Hva er kvikkleire?». Overbelastning får strukturen til å kollapse. I omrørt tilstand er leira flytende.",
  },
  {
    prompt: "Hvordan kan saltet i marin leire forsvinne?",
    options: [
      "All marin leire er kvikk allerede da den ble avsatt i sjøen.",
      "Saltet forsvinner så snart det har regnet én dag.",
      "Ferskt grunnvann vasker det ut over mange hundre til flere tusen år. Under 2 gram salt per liter kan bindingene svekkes.",
    ],
    answer: 2,
    explain:
      "Se «Hva er kvikkleire?». Leira er tett, så utvaskingen tar mange hundre til flere tusen år. Ikke all marin leire blir kvikk.",
  },
  {
    prompt: "Hva er de to vanlige måtene et kvikkleireskred blir utløst på?",
    options: [
      "Erosjon fra bekker og elver, eller graving i foten og fylling på toppen.",
      "Et gult jordskredvarsel.",
      "At snøen i fjellet blir til sørpeskred.",
    ],
    answer: 0,
    explain:
      "Se «Hva er kvikkleire?». NVE peker på graving fra bekker og elver, og på graving i bunnen eller fylling på toppen.",
  },
  {
    prompt: "Hvorfor overvåkes Åknes kontinuerlig?",
    options: [
      "Åknes er et jordskred som går i en elv hvert år.",
      "Grønt jordskredvarsel dekker også fjellskred fra Åknes.",
      "Et skred kan gi store flodbølger i Storfjordområdet, og overvåkingen skal gi tid til å varsle.",
    ],
    answer: 2,
    explain:
      "Se «Hva er et fjellskred?». Åknes overvåkes kontinuerlig fordi et skred kan gi flodbølger, og varselet skal komme i tide.",
  },
  {
    prompt: "Hva sier et grønt jordskredvarsel om steinsprang og kvikkleire?",
    options: [
      "Grønt nivå betyr at steinsprang og kvikkleire er avblåst.",
      "De inngår ikke i jordskredvarslingen. Grønt nivå sier ikke at de er trygge.",
      "Varselet gjelder bare kvikkleire.",
    ],
    answer: 1,
    explain:
      "Se «Hvordan kan vi forebygge og tilpasse oss?». Jordskredvarselet gjelder jordskred, sørpeskred og flomskred. Steinsprang og kvikkleireskred inngår ikke.",
  },
];

export const QUIZ_GEOLOGISKE_RESSURSER: QuizQuestion[] = [
  {
    prompt: "Hva skiller de to typene hydrotermale malmer?",
    options: [
      "Den ene er avsatt fra gasser som koker ut av magma, den andre fra varme løsninger på havbunnen",
      "Den ene inneholder jern, den andre aluminium",
      "Den ene er magmatisk, den andre sedimentær",
      "Det er ingen forskjell",
    ],
    answer: 0,
    explain: "Gasser fra magma avsetter malmårer og ganger, som i Oslofeltet. Varme løsninger ved undersjøiske vulkaner avsetter kismalmer på havbunnen, som i Løkken og Røros.",
  },
  {
    prompt: "I hvilken rekkefølge skjer det som trengs for at det skal dannes en oljeforekomst?",
    options: [
      "Felle, migrasjon, kildebergart, modning",
      "Modning, kildebergart, felle, migrasjon",
      "Kildebergart, modning, migrasjon, reservoar og felle",
      "Reservoar, kildebergart, felle, modning",
    ],
    answer: 2,
    explain: "Organisk materiale må først avsettes i en kildebergart. Det modnes til olje og gass ved høy temperatur, migrerer oppover og fanges i et reservoar under en tett takbergart.",
  },
  {
    prompt: "Hva gjør geofysiske målinger fra helikopter nyttige i malmleting?",
    options: [
      "De viser nøyaktig hvor mye malm det er",
      "De dekker store områder raskt og viser for eksempel magnetiske og ledende bergarter",
      "De erstatter all kjerneboring",
      "De brukes bare til petroleum",
    ],
    answer: 1,
    explain: "Magnetometri, elektromagnetiske målinger og radiometri fra lufta viser hvor det kan være forekomster. Størrelse og innhold må undersøkes med kjerneboring.",
  },
  {
    prompt: "Hvorfor er det en forsyningsrisiko at Kina produserer det meste av verdens sjeldne jordarter?",
    options: [
      "Fordi sjeldne jordarter er svært sjeldne i jordskorpa",
      "Fordi Kina ikke bruker sjeldne jordarter selv",
      "Fordi sjeldne jordarter ikke kan resirkuleres",
      "Fordi forsyningen kan svikte når produksjonen er samlet i få land",
    ],
    answer: 3,
    explain: "Forsyningsrisikoen er størst når produksjonen er samlet i få land. I 2025 sto Kina for ca. 69 % av gruveproduksjonen av sjeldne jordarter.",
  },
  {
    prompt: "Hvilket argument brukes for å tillate gruvedrift med sjødeponi i Førdefjorden?",
    options: [
      "At deponiet ikke påvirker livet på fjordbunnen",
      "At titan er en kritisk råvare, og at forsyningssikkerhet kan være et tvingende allment hensyn",
      "At Høyesterett har godkjent tillatelsen",
      "At avgangen kan selges som drivstoff",
    ],
    answer: 1,
    explain: "Høyesterett fant tillatelsene ugyldige fordi begrunnelsen fra 2016 handlet om inntekter og arbeidsplasser. Departementet vurderer nå om forsyningssikkerhet for titan kan begrunne en ny, langvarig tillatelse.",
  },
];

export const QUIZ_FELTARBEID: QuizQuestion[] = [
  {
    prompt: "Hva handler kjerneelementet geofaglig feltarbeid om?",
    options: [
      "Bare å ta steinprøver",
      "Å lese om geologi i lærebøker",
      "Planlegging, innsamling av georefererte data og bearbeiding, med ivaretakelse av helse, miljø og sikkerhet",
      "Å lage modeller på datamaskin",
    ],
    answer: 2,
    explain: "Udir beskriver kjerneelementet som planlegging, innsamling av georefererte data i felt og bearbeiding av dem, på en faglig forsvarlig måte som ivaretar HMS.",
  },
  {
    prompt: "Hvilken fare bør stå i risikovurderingen før du undersøker en grustak-vegg?",
    options: [
      "At det kan regne",
      "Ras og steinsprang fra veggen",
      "At GPS-en viser for mange desimaler",
      "At prøvene blir tunge",
    ],
    answer: 1,
    explain: "Bratte vegger i grustak og ved bergskjæringer kan rase. Hold avstand og avtal hvem som har ansvar.",
  },
  {
    prompt: "Hvilken metode bruker du for å finne retningen isen beveget seg?",
    options: [
      "Måle retningen på skuringsstriper med kompass",
      "Måle pH i en bekk",
      "Måle vannføring",
      "Telle steinblokker under en bergvegg",
    ],
    answer: 0,
    explain: "Skuringsstriper er riper laget av steiner i bunnen av breen. Retningen viser hvordan isen beveget seg.",
  },
  {
    prompt: "Hva skal stå på en rad i feltboka?",
    options: [
      "Bare målingen",
      "Navnet ditt og været",
      "ID, tidspunkt, koordinater, måling og usikkerhet",
      "Bare koordinatene",
    ],
    answer: 2,
    explain: "Med ID, tid, koordinater, måling og usikkerhet kan du finne igjen prøven og bildet og legge dataene på et kart.",
  },
  {
    prompt: "Hvorfor gjentar du en måling flere ganger?",
    options: [
      "For å se hvor mye målingen varierer og regne ut et gjennomsnitt",
      "Fordi første måling alltid er feil",
      "For å bruke opp tiden",
      "Fordi læreren sier det",
    ],
    answer: 0,
    explain: "Alle målinger har usikkerhet. Spredningen mellom gjentatte målinger viser hvor sikker du kan være.",
  },
];

export const QUIZ_LOKALE: QuizQuestion[] = [
  {
    prompt: "Hva setter i gang sjøbris om dagen?",
    options: [
      "Havet varmes raskere enn land, så lufta synker over sjøen og presser vinden ut.",
      "Land varmes raskere enn hav, varm luft stiger, og kjøligere luft fra sjøen strømmer inn.",
      "Jordrotasjonen starter vinden av seg selv, uten temperaturforskjell.",
    ],
    answer: 1,
    explain:
      "Sjøbris er pålandsvind fordi varm luft stiger over land og erstattes av kjøligere luft fra havet. Se «Solgangsvind».",
  },
  {
    prompt: "Hvorfor dreier solgangsvinden langs norskekysten ofte fra pålandsvind til vind langs kysten?",
    options: [
      "Vinden følger tidevannet inn og ut av fjorden.",
      "Havet blir mye kaldere utover ettermiddagen, så vinden må snu.",
      "Jordrotasjonen bøyer vinden av mot høyre på den nordlige halvkule.",
    ],
    answer: 2,
    explain:
      "På den nordlige halvkule dreier sjøbrisen mot høyre, fra pålandsvind til vind langs kysten. I en fjord kan den likevel fortsette rett inn. Se «Solgangsvind».",
  },
  {
    prompt: "Hvorfor er fønvind varm?",
    options: [
      "Luft som synker på lesiden varmes med omtrent én grad per hundre meter. Regn på losiden kan bidra, men betyr mindre enn man før trodde.",
      "Føn blir varm bare fordi det regner på lesiden.",
      "Føn er kald vind, fordi lufta alltid avkjøles når den synker.",
    ],
    answer: 0,
    explain:
      "Synkende luft kommer under høyere trykk og varmes adiabatisk. Kondensasjon på losiden kan spille en rolle, men har mindre betydning enn tidligere antatt. Se «Orografisk nedbør og føn».",
  },
  {
    prompt: "Hva er en temperaturinversjon, og hvorfor kan lufta i en dal bli dårlig?",
    options: [
      "Temperaturen faller raskere enn vanlig, så røyken stiger høyere og forsvinner.",
      "Inversjon er et lavtrykk som roterer over byen og suger til seg all røyken.",
      "Temperaturen stiger med høyden. Varmere luft over virker som et lokk, og lokale utslipp samler seg nær bakken.",
    ],
    answer: 2,
    explain:
      "I en inversjon er det kaldere nær bakken enn høyere oppe. Lufta nede blandes dårlig, og utslipp kan hope seg opp. Se «Temperaturinversjon».",
  },
  {
    prompt: "Hva skjer når en polarfrontsyklon blir moden, ifølge den norske syklonmodellen?",
    options: [
      "Varmfronten tar igjen kaldfronten, og lavtrykket forsvinner med en gang.",
      "Kaldfronten tar igjen varmfronten, og det dannes en okkludert front.",
      "Fronten blir liggende i ro, og nedbøren slutter.",
    ],
    answer: 1,
    explain:
      "Kaldfronten går raskere enn varmfronten. Når den tar igjen varmfronten, løftes den varme lufta, og fronten kalles okkludert. Se «Polarfrontsyklonen».",
  },
];

export const QUIZ_HOYTRYKK: QuizQuestion[] = [
  {
    prompt: "Et område har 1015 hPa i sentrum. Er det høytrykk eller lavtrykk?",
    options: [
      "Høytrykk, fordi tallet er over gjennomsnittet ved havnivå.",
      "Det kommer an på trykket i områdene rundt.",
      "Lavtrykk, fordi 1015 hPa alltid gir skyer.",
    ],
    answer: 1,
    explain:
      "Høytrykk og lavtrykk er relative. 1015 hPa er et lavtrykk hvis områdene rundt har høyere trykk, og et høytrykk hvis de har lavere.",
  },
  {
    prompt: "Hva viser tette isobarer?",
    options: [
      "Høyt lufttrykk.",
      "At luften synker.",
      "Stor trykkgradient og sterk vind.",
    ],
    answer: 2,
    explain:
      "Tette isobarer betyr at trykket endrer seg mye over kort avstand. Det er en stor trykkgradient, og vinden blir sterk.",
  },
  {
    prompt: "Hvorfor dannes det skyer når luft stiger?",
    options: [
      "Luften utvider seg og avkjøles til duggpunktet, og vanndampen kondenserer.",
      "Luften får mer vanndamp i høyden.",
      "Trykket øker og presser vanndampen sammen til dråper.",
    ],
    answer: 0,
    explain:
      "Når luft stiger, utvider den seg og avkjøles. Ved duggpunktet er den mettet, og vanndampen kondenserer til skydråper.",
  },
  {
    prompt: "Hvorfor forsvinner skyene i et høytrykk?",
    options: [
      "Vinden blåser skyene bort.",
      "Synkende luft varmes opp, den relative fuktigheten faller, og dråpene fordamper.",
      "Dråpene fryser og faller ned.",
    ],
    answer: 1,
    explain:
      "I et høytrykk synker luften og varmes opp. Den relative fuktigheten faller, og skydråpene fordamper.",
  },
  {
    prompt: "Hvorfor kan vinterhøytrykk gi forurensning i dalbunner?",
    options: [
      "Høytrykk trekker røyk ned fra høyden.",
      "Det blåser mer i dalbunnen om vinteren.",
      "Kald, tung luft blir liggende under et mildere lag (bakkeinversjon), og luften sirkulerer lite.",
    ],
    answer: 2,
    explain:
      "Under et vinterhøytrykk kan kald, tung luft bli liggende i dalbunnen under et mildere lag. Luften sirkulerer lite, og forurensning blir liggende.",
  },
];

export const QUIZ_VAERKART: QuizQuestion[] = [
  {
    prompt: "Hva betyr tette isobarer på et værkart?",
    options: [
      "At lufttrykket er lavt overalt.",
      "Stor trykkforskjell over kort avstand, og sterk vind.",
      "At kartet er tegnet med feil enhet.",
    ],
    answer: 1,
    explain:
      "Isobarene viser likt trykk. Når de ligger tett, endrer trykket seg mye over kort avstand, og vinden blir sterk.",
  },
  {
    prompt: "Hvorfor reduseres lufttrykket til havnivå før det tegnes på kartet?",
    options: [
      "Slik at stasjoner i ulik høyde kan sammenlignes.",
      "Fordi havet alltid har 1013 hPa.",
      "Fordi fjellstasjoner ikke måler trykk.",
    ],
    answer: 0,
    explain:
      "Trykket faller med høyden. Reduksjon til havnivå gjør at et fjell og en kyst kan sammenlignes på samme kart.",
  },
  {
    prompt: "Hva er en varmfront?",
    options: [
      "En front der lufta bak er varmere enn lufta foran, ofte med skyet vær og jevn nedbør.",
      "En front som alltid har temperatur over 20 °C.",
      "En blå strek med trekanter.",
    ],
    answer: 0,
    explain:
      "Varm og kald er relativt. En varmfront tegnes rød med halvsirkler, og den forbindes med skyet vær og jevn nedbør.",
  },
  {
    prompt: "Hva skjer når kaldfronten tar igjen varmfronten?",
    options: [
      "Lavtrykket blir liggende uendret i flere uker.",
      "Det dannes en okkludert front, og den varme lufta løftes bort fra sentrum.",
      "Frontene bytter farge og blir en stasjonær front.",
    ],
    answer: 1,
    explain:
      "I den norske syklonmodellen går kaldfronten fortere. Når den tar igjen varmfronten, blir fronten okkludert, og lavtrykket svekkes etter hvert.",
  },
  {
    prompt: "Hva brukes 500 hPa-kartet til?",
    options: [
      "Å vise bølgehøyden på havet.",
      "Å vise høyden av flaten der trykket er 500 hPa, om lag midt i atmosfæren, og hvor lufta kan stige.",
      "Å erstatte bakkekartet, fordi bakketrykket ikke betyr noe.",
    ],
    answer: 1,
    explain:
      "500 hPa-kartet er det viktigste høydekartet. Flaten ligger om lag 5 000 til 6 000 meter oppe. Foran sterk virvling kan lufta stige, og det kan bli nedbør.",
  },
];

export const QUIZ_VINDSYSTEMET: QuizQuestion[] = [
  {
    prompt:
      "Hvorfor er sirkulasjonen delt i tre celler på hver halvkule, og ikke én sløyfe fra ekvator til pol?",
    options: [
      "Fordi hav og land er ujevnt fordelt.",
      "Fordi jorda roterer. Luft som går mot polen i høyden, blir vestavind og synker nær 30°.",
      "Fordi tyngdekraften er mye svakere ved polene.",
    ],
    answer: 1,
    explain:
      "Hadley foreslo én celle i 1735. Rotasjonen gjør at den øvre strømmen blir vestavind, lufta synker nær 30°, og vi får tre celler (NOAA).",
  },
  {
    prompt: "Hva kjennetegner den intertropiske konvergenssonen?",
    options: [
      "Høytrykk, klar himmel og stødige nordavinder.",
      "Passatene møtes, lufta stiger, og det blir skyer og byger.",
      "Kald luft som synker fra stratosfæren.",
    ],
    answer: 1,
    explain:
      "Konvergenssonen er lavtrykksbeltet der nordøstpassaten og sørøstpassaten møtes og fuktig luft tvinges opp.",
  },
  {
    prompt: "Hvorfor ligger mange av de store ørkenene nær 30° bredde?",
    options: [
      "Luft som har steget ved ekvator, synker. Den varmes opp, og skyene løses opp.",
      "Det finnes ingen fjell som kan stoppe vinden.",
      "Havet koker og tørker ut landmassene.",
    ],
    answer: 0,
    explain:
      "Subsidens nær 30° gir høytrykk og tørke, blant annet i Nord-Afrika og Australia.",
  },
  {
    prompt: "Hvorfor kalles Ferrel-cellen termisk indirekte?",
    options: [
      "Fordi den bare finnes om sommeren.",
      "Fordi lufta synker nær 30° og stiger nær 50–60°, motsatt av en celle som drives direkte av oppvarming.",
      "Fordi den frakter kulde fra ekvator mot polene.",
    ],
    answer: 1,
    explain: "Se tabellen. Ferrel-cellen drives av vandrende lavtrykk og høytrykk, ikke direkte av oppvarming.",
  },
  {
    prompt:
      "Hvorfor kan vestkysten av Norge få over 3000 mm nedbør i året, mens Ottadalen får ned mot 200 mm?",
    options: [
      "Vestkysten ligger i Hadley-cellen, og Ottadalen ligger i polarcellen.",
      "Fuktig vestavind tvinges opp av fjellene og gir orografisk nedbør på luvsiden. På lesiden synker lufta, og Ottadalen ligger i regnskygge.",
      "Det regner bare om natten på vestkysten.",
    ],
    answer: 1,
    explain:
      "SNL beskriver soner med stedvis over 3000 mm innenfor vestkysten, under 300 mm øst for Breheimen, og ned mot 200 mm i Ottadalen.",
  },
];

export const QUIZ_SJEKK_ISBRE_1: QuizQuestion[] = [
  {
    prompt: "Hva er en fjord?",
    options: [
      "En V-dal som havet har fylt",
      "En U-dal som isen har gravd ut under havnivå, og som ble fylt med sjø",
      "En dal som havet selv har gravd ut",
    ],
    answer: 1,
    explain: "Isen grov dalbunnen ned under havnivå. Da isen smeltet, ble dalen fylt med sjø. Fjord og U-dal er samme landform, men med ulik vannstand.",
  },
  {
    prompt: "Hvorfor blir en sidedal ofte hengende høyt oppe i dalsiden?",
    options: [
      "Breen i sidedalen var tynnere og eroderte mindre enn breen i hoveddalen",
      "Elva i sidedalen har bygd opp dalbunnen",
      "Sidedalen er hevet av et jordskjelv",
    ],
    answer: 0,
    explain: "Hoveddalen hadde mer og raskere is og ble gravd dypere. Sidedalen ble liggende igjen høyere oppe.",
  },
  {
    prompt: "Hva forteller skuringsstriper i berget?",
    options: [
      "Hvor gammelt berget er",
      "Hvor tykk isen var",
      "Hvilken retning isen beveget seg",
    ],
    answer: 2,
    explain: "Stripene er riper fra steiner i bresålen. De går i samme retning som isen beveget seg.",
  },
];

export const QUIZ_SJEKK_ISBRE_2: QuizQuestion[] = [
  {
    prompt: "Hva skiller morene fra breelvmateriale?",
    options: [
      "Morene er sortert i lag, breelvmateriale er usortert",
      "Morene er usortert fordi isen fraktet den, breelvmateriale er sortert av smeltevann",
      "Det er to navn på det samme materialet",
    ],
    answer: 1,
    explain: "Isen skiller ikke kornstørrelsene, så morenen blir usortert. Smeltevannet sorterer materialet slik rennende vann alltid gjør.",
  },
  {
    prompt: "Hvordan ble en esker dannet?",
    options: [
      "Smeltevann avsatte sand og grus i en tunnel under isen",
      "Isen dyttet morene foran seg ved brefronten",
      "Vinden blåste sand sammen etter istida",
    ],
    answer: 0,
    explain: "En esker er en lang, svingete rygg av sand og grus fra en smeltevannstunnel under isen.",
  },
  {
    prompt: "Hva er Raet?",
    options: [
      "Én stor morenehaug ved Oslofjorden",
      "En fjord fra siste istid",
      "Et israndtrinn fra yngre dryas, en lang sone av morene, breelvgrus og strandmateriale",
    ],
    answer: 2,
    explain: "Raet ble dannet da isfronten sto stille eller rykket fram i yngre dryas. Det er en lang sone, ikke én haug.",
  },
];

export const QUIZ_SJEKK_ISBRE_3: QuizQuestion[] = [
  {
    prompt: "Hvorfor hever landet i Norge seg fortsatt?",
    options: [
      "Fordi vekten av innlandsisen er borte, og landet er på vei tilbake mot likevekt",
      "Fordi havet synker over hele jorda",
      "Fordi platene kolliderer under Norge",
    ],
    answer: 0,
    explain: "Isen presset landet ned. Når vekten forsvant, begynte landet å heve seg igjen. Det er isostasi i praksis.",
  },
  {
    prompt: "Hva er marin grense?",
    options: [
      "Grensen mellom salt og ferskt vann i en fjord",
      "Det høyeste nivået havet nådde etter siste istid",
      "Dybden der isen sluttet å grave",
    ],
    answer: 1,
    explain: "Marin grense ligger mellom 0 og 220 meter over dagens havnivå i Norge. Over den kan du i praksis utelukke marin leire.",
  },
  {
    prompt: "Hvorfor kan trykkavlastning få berget til å skalle av?",
    options: [
      "Fordi vann fryser i sprekkene",
      "Fordi vekten av isen forsvinner, og berget utvider seg litt",
      "Fordi syre i regnvannet løser opp mineralene",
    ],
    answer: 1,
    explain: "Trykkavlastning er, som frostsprengning, mekanisk forvitring, men mekanismen er en annen: berget utvider seg når vekten forsvinner.",
  },
];

export const QUIZ_SJEKK_ISBRE_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor er breelvdeltaet på Gardermoen viktig for mennesker?",
    options: [
      "Det er en stor kilde til sand og grus, og den største selvmatende grunnvannsforekomsten i Norge",
      "Det er den eneste aktive isbreen på Østlandet",
      "Det beskytter mot kvikkleireskred",
    ],
    answer: 0,
    explain: "Den sorterte breelvsanden er en ressurs og et grunnvannsmagasin. Derfor må uttak og arealbruk tilpasses så grunnvannet ikke blir forurenset.",
  },
  {
    prompt: "Hva skjer med norske breer i dag?",
    options: [
      "De vokser fordi det faller mer snø",
      "De er stabile",
      "De krymper. Arealet er 14 prosent mindre enn i 1999–2006",
    ],
    answer: 2,
    explain: "Kartleggingen fra 2018–2019 viste 2328 km² bre, 14 prosent mindre enn i 1999–2006 (NVE, 2022).",
  },
];

export const QUIZ_ISBRE: QuizQuestion[] = [
  {
    prompt: "Hvorfor er morene usortert, mens breelvmateriale er sortert?",
    options: [
      "Morene er eldre og har blitt blandet over tid",
      "Isen frakter alle kornstørrelser sammen, mens rennende vann skiller dem etter størrelse",
      "Breelvmateriale er alltid avsatt i havet",
      "Morene består bare av store blokker",
    ],
    answer: 1,
    explain:
      "Isen skiller ikke kornene fra hverandre, men vannet mister farten gradvis og legger igjen de tyngste kornene først. Se «Usortert transport».",
  },
  {
    prompt: "Hva forteller skuringsstriper i berget?",
    options: [
      "Hvor gammelt berget er",
      "Hvor høyt havet sto etter istida",
      "Hvilken retning isen beveget seg",
      "Hvor mye frost det har vært",
    ],
    answer: 2,
    explain:
      "Stripene er laget av steiner i bresålen og går i samme retning som isen. Se «Rundsva og skuringsstriper».",
  },
  {
    prompt: "Hva er forskjellen på en fjord og en U-dal på land?",
    options: [
      "Fjorden er laget av elv, U-dalen av is",
      "Begge er gravd ut av is, men bunnen i fjorden ligger under havnivå",
      "Fjorden er en V-dal som har druknet",
      "U-dalen er yngre enn fjorden",
    ],
    answer: 1,
    explain: "Fjord og dal er samme type landform med ulik vannstand. Se «Fjord».",
  },
  {
    prompt: "Hvorfor ligger det marin leire på land, for eksempel på Østlandet?",
    options: [
      "Havnivået har steget siden istida",
      "Elvene har fraktet leira opp fra havet",
      "Landet ble presset ned av isen, leira ble avsatt i havet, og så hevet landet seg igjen",
      "Leira ble avsatt av isbreen som morene",
    ],
    answer: 2,
    explain: "Dette er isostasi. Se «Isostasi: landet som hever seg etter isen».",
  },
  {
    prompt: "Hvorfor er Raet en fossil landform, mens breene i Norge i dag er aktive?",
    options: [
      "Raet ble dannet av en isfront som ikke finnes lenger, mens dagens breer fortsatt eroderer og avsetter materiale",
      "Raet består av fast berg",
      "Raet er dannet av bølger, ikke av is",
      "Nigardsbreen er en innlandsis",
    ],
    answer: 0,
    explain:
      "Prosessen er den samme, men den skjedde til ulik tid. Se «Aktive og fossile landformer».",
  },
];

export const QUIZ_JORDSYSTEMENE: QuizQuestion[] = [
  {
    prompt: "Hvilke sfærer er mottakerne i geofag 1?",
    options: [
      "Atmosfæren og biosfæren",
      "Geosfæren og hydrosfæren",
      "Kryosfæren og atmosfæren",
      "Biosfæren og kryosfæren",
    ],
    answer: 1,
    explain: "I geofag 1 følger vi hvordan atmosfæren, kryosfæren og biosfæren endrer berg, løsmasser, jord, elver, innsjøer og grunnvann.",
  },
  {
    prompt: "Hvorfor kan et stort eksplosivt utbrudd kjøle jorda i noen år?",
    options: [
      "Asken blokkerer sollyset i mange år",
      "Vulkanen tar opp CO₂ fra lufta",
      "Utbruddet senker temperaturen i havet direkte",
      "SO₂ i stratosfæren blir til sulfataerosoler som reflekterer sollys",
    ],
    answer: 3,
    explain: "Asken faller ut i løpet av dager til uker. Sulfataerosolene blir værende lenger. Pinatubo kjølte jordoverflaten i om lag tre år.",
  },
  {
    prompt: "Hva skiller det raske karbonkretsløpet fra det trege?",
    options: [
      "Det raske går gjennom livet på måneder til år, det trege gjennom berg, hav og vulkaner på 100–200 millioner år",
      "Det raske går gjennom vulkaner, det trege gjennom planter",
      "Det finnes bare ett karbonkretsløp",
      "Det trege går raskere når det er kaldt",
    ],
    answer: 0,
    explain: "Fotosyntese og nedbrytning flytter karbon raskt. Forvitring, kalkstein og vulkaner flytter det langsomt.",
  },
  {
    prompt: "Hva er riktig om termostaten i den trege karbonsløyfen?",
    options: [
      "Varmere klima gir mindre forvitring",
      "Den virker i løpet av noen tiår",
      "Varmere klima gir mer regn og raskere forvitring, så mer karbon lagres i kalkstein",
      "Den forsterker oppvarmingen",
    ],
    answer: 2,
    explain: "Mer forvitring fjerner CO₂ fra lufta og trekker temperaturen tilbake. Det er en negativ tilbakekobling, men den tar noen hundre tusen år.",
  },
  {
    prompt: "Hva viser hevingen på Jan Mayen etter utbruddet i 1732?",
    options: [
      "At kryosfæren hevet landet",
      "At havet steg rundt Jan Mayen",
      "At hevingen tok millioner av år",
      "At geosfæren kan flytte hydrosfæren på menneskelig tidsskala",
    ],
    answer: 3,
    explain: "Magma hevet bakken om lag 14 meter, og Nordlaguna ble stengt fra havet. Det skjedde i løpet av et utbrudd.",
  },
  {
    prompt: "Hvorfor er Pinatubo-kjølingen og den trege karbonsløyfen ikke samme vulkan–klima?",
    options: [
      "De virker på helt ulike tidsskalaer: år mot hundre tusener av år",
      "Pinatubo slapp ikke ut gass",
      "Den trege sløyfen har ingenting med vulkaner å gjøre",
      "Begge varer like lenge",
    ],
    answer: 0,
    explain: "SO₂ fra Pinatubo kjølte i om lag tre år. Den trege sløyfen bruker noen hundre tusen år på å komme i balanse.",
  },
];

export const QUIZ_CORIOLIS: QuizQuestion[] = [
  {
    prompt: "Hva er corioliseffekten?",
    options: [
      "En reell kraft som setter lufta i gang fra høytrykk mot lavtrykk.",
      "Avbøyningen vi ser fordi jorda roterer under en bevegelse som ellers går rett fram.",
      "Månens drag, som styrer tidevannet.",
    ],
    answer: 1,
    explain:
      "Se «Hva er corioliseffekten?». Avbøyningen kommer av rotasjonen, ikke av en reell kraft som virker på lufta.",
  },
  {
    prompt: "Hvor er den horisontale avbøyningen null?",
    options: [
      "Ved 60°, omtrent Oslo og Bergen, der farten østover er minst.",
      "Ved Nordpolen, der bakken står stille.",
      "Ved ekvator, der coriolisparameteren er null.",
    ],
    answer: 2,
    explain:
      "Se «Breddegraden bestemmer styrken». Parameteren er null ved ekvator og øker mot polene.",
  },
  {
    prompt: "Hva skjer med et lavtrykk hvis jorda ikke roterer?",
    options: [
      "Det fylles raskt igjen, fordi lufta ikke avbøyes til en virvel.",
      "Det blir en sterkere orkan, fordi ingenting bremser vinden.",
      "Vinden legger seg langs isobarene av seg selv.",
    ],
    answer: 0,
    explain:
      "Se «Breddegraden bestemmer styrken». Uten rotasjon fylles lavtrykket. Avbøyningen er det som gir rotasjonen orkaner trenger.",
  },
  {
    prompt: "Hvilken vinkel danner vinden med isobarene nær bakken over land?",
    options: [
      "Alltid 0°, parallelt med isobarene.",
      "Alltid 90°, rett inn mot lavtrykket.",
      "20–40°, fordi friksjonen er større enn over havet.",
    ],
    answer: 2,
    explain:
      "Se «Vind, isobarer og friksjon». Over havet er vinkelen 0–20°, over land 20–40°.",
  },
  {
    prompt: "Hva skjer ved langvarig nordavind langs en vestkyst på den nordlige halvkule?",
    options: [
      "Overflatevannet presses inn mot land og synker.",
      "Ekmantransporten skyver overflaten utover, og dypere vann kommer opp.",
      "Corioliseffekten er null langs alle vestkyster, så ingenting skjer.",
    ],
    answer: 1,
    explain:
      "Se «Havet: ekmantransport og oppvelling». På den nordlige halvkule går ekmantransporten til høyre for vinden.",
  },
];

export const QUIZ_SJEKK_LANDFORMER_1: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på forvitring og erosjon?",
    options: [
      "Forvitring skjer bare i elver, og erosjon skjer bare under isbreer.",
      "Forvitring bryter ned berget der det ligger, mens erosjon river løs og frakter bort materialet.",
      "Det er to ord for samme prosess.",
    ],
    answer: 1,
    explain: "Så lenge bitene ligger der berget brøt dem løs, er det forvitring. Flytter vann, is, vind eller tyngdekraften dem, er det erosjon.",
  },
  {
    prompt: "Hvorfor sprekker berget oftest ved frostsprengning?",
    options: [
      "Fordi islinser vokser i sprekkene ved temperaturer like under frysepunktet, når det er tilgang på vann.",
      "Fordi berget krymper når det blir svært kaldt.",
      "Fordi isen smelter og løser opp mineralene.",
    ],
    answer: 0,
    explain: "Vann trekkes mot isen, og islinsene presser sprekken videre. Mange fryse–tine-sykluser betyr mer enn sterk kulde.",
  },
  {
    prompt: "Hva skjer ved hydrolyse av feltspat?",
    options: [
      "Feltspaten løses helt opp og blir til karbonsyre.",
      "Feltspaten blir omdannet til leirmineraler, og granitten smuldrer opp.",
      "Feltspaten blir til kvarts.",
    ],
    answer: 1,
    explain: "Hydrolyse er kjemisk forvitring. Kvartskornene tåler forvitringen bedre og blir igjen som sand.",
  },
];

export const QUIZ_SJEKK_LANDFORMER_2: QuizQuestion[] = [
  {
    prompt: "Hvilke korn eroderes ved lavest strømfart i Hjulströms diagram?",
    options: ["Leire", "Sand", "Grov grus"],
    answer: 1,
    explain: "Sand eroderes ved ca. 20 cm/s. Leire henger sammen og krever høyere fart, og grus er tyngre.",
  },
  {
    prompt: "Hvorfor kan fast, avsatt leire kreve like stor strømfart for å eroderes som grus?",
    options: [
      "Fordi leirkornene er tyngre enn grus.",
      "Fordi de små, flate og elektrisk ladde leirkornene henger sammen (kohesjon).",
      "Fordi leire alltid ligger dypere enn grus i elva.",
    ],
    answer: 1,
    explain: "Kohesjonen holder kornene sammen. Hvor stor fart som trengs, avhenger av hvor fast leira er pakket.",
  },
];

export const QUIZ_SJEKK_LANDFORMER_3: QuizQuestion[] = [
  {
    prompt: "Hvor eroderer en meandrerende elv mest?",
    options: ["I innersvingen", "I yttersvingen", "Like mye på begge sider"],
    answer: 1,
    explain: "Vannet renner fortest i yttersvingen og graver ut en bratt elvebakke. I innersvingen avsettes sand og grus.",
  },
  {
    prompt: "Hvordan blir en kroksjø dannet?",
    options: [
      "En isbre graver ut et basseng i dalbunnen.",
      "Elva bryter gjennom halsen mellom to svinger, og svingen blir liggende igjen.",
      "Kalkstein løses opp, og bakken synker inn.",
    ],
    answer: 1,
    explain: "Det skjer ofte under en flom, når elva tar den korteste veien.",
  },
  {
    prompt: "Hvilke korn legger seg lengst ute i et Gilbert-delta?",
    options: ["Grus", "Sand", "Silt og leire"],
    answer: 2,
    explain: "De fineste kornene synker saktest og danner bunnlaget lengst ute.",
  },
];

export const QUIZ_SJEKK_LANDFORMER_4: QuizQuestion[] = [
  {
    prompt: "Hva sier den klassiske modellen om viddene?",
    options: [
      "At de er rester av et gammelt, nesten flatt landskap som senere ble hevet.",
      "At de ble gravd ut av isen under siste istid.",
      "At de er unge lavaflater.",
    ],
    answer: 0,
    explain: "Modellen er omstridt. Andre forskere mener at istidene slipte ned fjellene til en jevn høyde.",
  },
  {
    prompt: "Hvilke landformer er yngst?",
    options: ["Viddene", "Fjordene og U-dalene", "De er like gamle"],
    answer: 1,
    explain: "Fjordene og U-dalene ble formet av breene de siste 2,6 millioner årene.",
  },
];

export const QUIZ_SJEKK_LANDFORMER_5: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan en utrettet elv gi mer erosjon lenger ned i vassdraget?",
    options: [
      "Fordi en rett elv renner fortere enn en buktende elv.",
      "Fordi en rett elv har mindre vann.",
      "Fordi utretting gjør vannet varmere.",
    ],
    answer: 0,
    explain: "Større strømfart gir større transportevne, slik Hjulströms diagram viser.",
  },
  {
    prompt: "Hvorfor kan en fylling øverst i en leirskråning øke faren for kvikkleireskred?",
    options: [
      "Fordi fyllingen gir ekstra vekt på skråningen.",
      "Fordi fyllingen gjør leira til fjell.",
      "Fordi fyllingen stopper all erosjon.",
    ],
    answer: 0,
    explain: "Vekt øverst og graving i foten gjør skråningen mindre stabil.",
  },
  {
    prompt: "Hvorfor er sand og grus fra breelvavsetninger en begrenset ressurs?",
    options: [
      "Fordi forekomstene ble dannet ved slutten av istiden og ikke blir fornyet.",
      "Fordi sand og grus løses opp i regnvann.",
      "Fordi det er forbudt å bruke grus i betong.",
    ],
    answer: 0,
    explain: "Når en grusrygg graves bort, forsvinner landformen for godt.",
  },
];

export const QUIZ_LANDFORMER: QuizQuestion[] = [
  {
    prompt: "Hvilken påstand om indre og ytre krefter er riktig?",
    options: [
      "De ytre kreftene drives av varmen i jordas indre.",
      "De indre kreftene løfter berggrunnen, og de ytre kreftene bryter den ned og flytter materialet.",
      "De indre kreftene jevner ut høydeforskjellene.",
      "Bare de indre kreftene former landskapet i Norge.",
    ],
    answer: 1,
    explain: "De indre kreftene får energien fra jordas indre. De ytre drives av sola og tyngdekraften.",
  },
  {
    prompt: "En elv renner med 30 cm/s over en bunn av fast leire, sand og grov grus. Hva rives trolig løs?",
    options: ["Bare den faste leira", "Sanden", "Den grove grusen", "Alt sammen"],
    answer: 1,
    explain: "Sand eroderes fra ca. 20 cm/s. Fast leire og grov grus krever høyere strømfart.",
  },
  {
    prompt: "Hvordan ble Jutulhogget trolig dannet?",
    options: [
      "Av en elv som har gravd i hard gneis i millioner av år.",
      "Av smeltevann som strømmet over dalskillet da en bredemt sjø ble tappet ved slutten av istiden.",
      "Av en isbre som grov ut en U-dal.",
      "Ved at kalkstein ble løst opp.",
    ],
    answer: 1,
    explain: "Den bredemte sjøen Nedre Glomsjø ble tappet, og vannet grov ut gjelet på kort tid.",
  },
  {
    prompt: "Hva er riktig om modellene for de norske fjellplatåene?",
    options: [
      "Alle forskere er enige om at viddene er en hevet, gammel flate.",
      "Den klassiske modellen sier at en gammel flate ble hevet, mens andre mener istidene slipte ned høye fjell.",
      "Viddene ble dannet av vulkaner.",
      "Viddene er yngre enn fjordene.",
    ],
    answer: 1,
    explain: "Begge modellene kan forklare de flate viddene. Derfor er spørsmålet fortsatt omstridt.",
  },
  {
    prompt: "Hvilket inngrep kan føre til mer erosjon et annet sted langs kysten?",
    options: [
      "Kystsikring med moloer og steinfyllinger",
      "Å plante trær på en vidde",
      "Å måle strømfarten i en elv",
      "Å kartlegge løsmasser",
    ],
    answer: 0,
    explain: "Kystsikring kan endre hvordan bølgene flytter sand og grus langs stranda.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_1: QuizQuestion[] = [
  {
    prompt: "Hvor finner vi de eldste bergartene i Norge?",
    options: [
      "I Oslofeltet",
      "I Sør-Varanger og ved Lakselv i Finnmark",
      "På Jan Mayen",
    ],
    answer: 1,
    explain: "Gneisen i Sør-Varanger og ved Lakselv er opptil ca. 3000 millioner år gammel. Oslofeltet er fra sen karbon og perm, og Jan Mayen er en ung vulkanøy.",
  },
  {
    prompt: "Hva er det subkambriske peneplanet?",
    options: [
      "En nesten flat slette som grunnfjellet var slitt ned til før kambrium",
      "En lavastrøm fra Oslofeltet",
      "En havbunn som ble skjøvet opp på land",
    ],
    answer: 0,
    explain: "Etter de prekambriske fjellkjededannelsene ble landet slitt ned til en nesten flat slette. Der lagene fra kambrium ligger rett på grunnfjellet, kan vi se denne flaten i dag.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_2: QuizQuestion[] = [
  {
    prompt: "Hva er en ofiolitt?",
    options: [
      "En dypbergart som størknet under en vulkan i Oslofeltet",
      "En forsteinet morene fra prekambrium",
      "En pakke av havbunnsskorpe og øvre mantel som er skjøvet opp på land",
    ],
    answer: 2,
    explain: "En ofiolitt består av havbunnssedimenter, putelava, gangkompleks, gabbro og peridotitt fra mantelen. På Leka er denne pakken skjøvet opp på land.",
  },
  {
    prompt: "Hva er radiolaritt dannet av?",
    options: [
      "Skjeletter av radiolarier, encellede organismer med kiselskjelett",
      "Kiselalger (diatomeer)",
      "Avkjølt lava",
    ],
    answer: 0,
    explain: "Radiolaritt er dannet av kiselskjelettene til radiolarier. Radiolarier er encellede organismer, ikke alger. Kiselalgene er en annen gruppe.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_3: QuizQuestion[] = [
  {
    prompt: "Hvorfor finner vi eldre bergarter oppå yngre bergarter i fjellkjeden?",
    options: [
      "Fordi lagene ble avsatt i omvendt rekkefølge",
      "Fordi store flak av berggrunn ble skjøvet over yngre bergarter som skyvedekker",
      "Fordi isen snudde lagene under istiden",
    ],
    answer: 1,
    explain: "Under kollisjonen ble skyvedekker skjøvet flere hundre kilometer mot øst og sørøst. Da kunne gamle bergarter, for eksempel i Jotundekket, havne oppå yngre bergarter.",
  },
  {
    prompt: "Hva viser eklogitten på Vestlandet?",
    options: [
      "At det var vulkaner på Vestlandet i perm",
      "At Vestlandet var dekket av hav i kambrium",
      "At kanten av Baltika ble dratt ned til mer enn 100 km dyp under kollisjonen",
    ],
    answer: 2,
    explain: "Eklogitt dannes bare ved svært høyt trykk. Noen eklogitter på Vestlandet ble dannet på opptil 130 km dyp for ca. 415–400 millioner år siden.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor ble Oslo-riften dannet?",
    options: [
      "Fordi skorpa ble strukket i Nord-Europa i sen karbon og perm",
      "Fordi Pangea sprakk opp i perm",
      "Fordi Baltika kolliderte med Laurentia",
    ],
    answer: 0,
    explain: "Oslo-riften ble dannet da skorpa ble strukket i sen karbon og perm, like etter at Pangea var satt sammen. Pangea begynte ikke å sprekke opp før i jura.",
  },
  {
    prompt: "Hvorfor finner vi fossiler fra kambrium og silur rundt Oslo?",
    options: [
      "Fordi riften var et hav i perm",
      "Fordi lagene ble skjøvet inn fra vest",
      "Fordi blokken sank ned i riftdalen, slik at lagene ble bevart",
    ],
    answer: 2,
    explain: "Da blokken sank ned mellom forkastningene, ble lagene fra kambrium og silur liggende lavere enn omgivelsene og ble ikke slitt bort.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_5: QuizQuestion[] = [
  {
    prompt: "Hva betyr det at norskekysten er en passiv kontinentalmargin?",
    options: [
      "At det aldri har vært vulkaner langs kysten",
      "At overgangen fra kontinent til havbunn ikke er en plategrense",
      "At havbunnen utenfor Norge subduseres under Norge",
    ],
    answer: 1,
    explain: "Norge og havbunnen utenfor ligger på samme plate. Plategrensen er spredningsryggen. Da Norskehavet åpnet seg, var det likevel mye vulkanisme langs marginen.",
  },
  {
    prompt: "Hvorfor har Jan Mayen en aktiv vulkan?",
    options: [
      "Fordi øya ligger på den midtatlantiske spredningsryggen",
      "Fordi øya ligger over Oslo-riften",
      "Fordi en havplate subduseres under øya",
    ],
    answer: 0,
    explain: "Jan Mayen ligger på spredningsryggen mellom Grønland og Norge, der magma stiger opp når platene glir fra hverandre.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_6: QuizQuestion[] = [
  {
    prompt: "Hva er marin grense?",
    options: [
      "Grensen mellom havbunn og kontinent",
      "Det høyeste nivået havet nådde etter istiden",
      "Grensen for hvor langt isen nådde",
    ],
    answer: 1,
    explain: "Marin grense er det høyeste nivået havet nådde etter istiden. I Oslo-området sto havet opptil ca. 220 m høyere enn i dag.",
  },
  {
    prompt: "Hvorfor har landet hevet seg mer enn høyden på marin grense?",
    options: [
      "Fordi marin grense er målt feil",
      "Fordi landet sank igjen etter istiden",
      "Fordi havnivået steg samtidig som landet hevet seg",
    ],
    answer: 2,
    explain: "Da isen smeltet, steg havnivået. Landet måtte derfor heve seg mer enn høyden på marin grense for at den gamle strandlinjen skulle havne der den er i dag.",
  },
];

export const QUIZ_SJEKK_NORGES_GEOLOGI_7: QuizQuestion[] = [
  {
    prompt: "Du finner sortert sand og grus i en åsrygg i dalen. Hva er den mest sannsynlige forklaringen?",
    options: [
      "Det er morene som isen la igjen",
      "Det er en breelvavsetning fra smeltevannet",
      "Det er en lavastrøm fra perm",
    ],
    answer: 1,
    explain: "Smeltevann sorterer materialet etter kornstørrelse. Morene er usortert.",
  },
  {
    prompt: "En gang av magma skjærer gjennom et lag av kalkstein. Hva kan du si om alderen?",
    options: [
      "Gangen er yngre enn kalksteinen",
      "Gangen er eldre enn kalksteinen",
      "Vi kan ikke si noe om alderen",
    ],
    answer: 0,
    explain: "Det som skjærer gjennom en bergart, må være yngre enn bergarten det skjærer gjennom.",
  },
];

export const QUIZ_NORGES_GEOLOGI: QuizQuestion[] = [
  {
    prompt: "Hvilket utsagn om Leka-ofiolitten er riktig?",
    options: [
      "Den er en lavastrøm fra Oslo-riften",
      "Den er havbunn og øvre mantel fra Iapetushavet som er skjøvet opp på land",
      "Den er en del av grunnfjellet fra prekambrium",
      "Den ble dannet da Norskehavet åpnet seg",
    ],
    answer: 1,
    explain: "Leka-ofiolitten er ca. 497 millioner år gammel havbunn fra Iapetushavet. Den ble skjøvet opp på land da havet lukket seg, lenge før Oslo-riften og Norskehavet.",
  },
  {
    prompt: "Hva skjedde med bergartene da Baltika og Laurentia kolliderte?",
    options: [
      "Store flak ble skjøvet over hverandre som skyvedekker, og mange bergarter ble omdannet",
      "Bergartene smeltet og ble til rombeporfyr",
      "Det ble dannet en riftdal med vulkaner",
      "Bergartene ble avsatt som marin leire",
    ],
    answer: 0,
    explain: "Kollisjonen skjøv skyvedekker mot øst og sørøst. Høy temperatur og høyt trykk gjorde for eksempel leirskifer om til glimmerskifer og gneis, og basalt og gabbro om til amfibolitt.",
  },
  {
    prompt: "Hvorfor ble Oslo-riften dannet?",
    options: [
      "Fordi Pangea sprakk opp i perm",
      "Fordi Iapetushavet lukket seg",
      "Fordi Norskehavet åpnet seg",
      "Fordi skorpa ble strukket i Nord-Europa i sen karbon og perm",
    ],
    answer: 3,
    explain: "Oslo-riften er ett av flere riftsystemer fra sen karbon og perm, like etter at Pangea var satt sammen. Pangea begynte å sprekke opp i jura.",
  },
  {
    prompt: "Hvorfor ligger det marin leire høyt over havet i Oslo-området i dag?",
    options: [
      "Fordi leira ble skjøvet opp av skyvedekker",
      "Fordi elvene har fraktet leira oppover",
      "Fordi leira ble avsatt i havet mens landet var presset ned, og landet har hevet seg siden",
      "Fordi havnivået har steget siden istiden",
    ],
    answer: 2,
    explain: "Etter istiden sto havet opptil ca. 220 m høyere enn i dag i Oslo-området. Leira ble avsatt under havet og kom opp på land da landet hevet seg. Havnivået steg samtidig, så landet har hevet seg mer enn 220 m.",
  },
  {
    prompt: "Hvor hever landet seg raskest i dag?",
    options: [
      "Ytterst på kysten av Vestlandet",
      "Der innlandsisen var tykkest, for eksempel ved Bottenviken",
      "På Jan Mayen",
      "Like mye overalt i Norge",
    ],
    answer: 1,
    explain: "Landhevingen er størst der isen var tykkest og presset landet mest ned. Ved Bottenviken er den opptil ca. 1 cm i året, i Oslo ca. 5 mm i året, og nær null på Sørvestlandet.",
  },
];

export const QUIZ_SJEKK_FELTARBEID_1: QuizQuestion[] = [
  {
    prompt: "Hvilken problemstilling egner seg best for et feltarbeid?",
    options: [
      "Hvordan er geologien i Norge?",
      "Er materialet i åsryggen ved skolen sortert slik en breelvavsetning er?",
      "Hva er den beste bergarten?",
    ],
    answer: 1,
    explain: "Problemstillingen må kunne besvares med data du kan samle inn på ett sted. De to andre er for vide eller ikke mulige å måle.",
  },
  {
    prompt: "Hva gir allemannsretten deg rett til?",
    options: [
      "Å ta prøver med hammer hvor du vil",
      "Å gå over åker og eng",
      "Å ferdes i utmark når du tar hensyn",
    ],
    answer: 2,
    explain: "Allemannsretten gjelder i utmark, ikke på innmark. Spør grunneieren før du tar prøver eller går inn i et grustak.",
  },
];

export const QUIZ_SJEKK_FELTARBEID_2: QuizQuestion[] = [
  {
    prompt: "Hva er fall?",
    options: [
      "Vinkelen mellom en flate i berget og det vannrette planet",
      "Retningen isen beveget seg",
      "Hvor fort vannet renner",
    ],
    answer: 0,
    explain: "Fall er helningen til flaten, fra 0° for vannrett til 90° for loddrett. Strøk er retningen på skjæringslinjen med det vannrette planet.",
  },
  {
    prompt: "Du måler tverrsnittsarealet i en bekk til 0,4 m² og middelfarten til 0,5 m/s. Hva er vannføringen?",
    options: [
      "0,9 m³/s",
      "0,2 m³/s",
      "0,8 m³/s",
    ],
    answer: 1,
    explain: "Vannføring = tverrsnittsareal × middelfart = 0,4 m² × 0,5 m/s = 0,2 m³/s. Middelfarten finner du ved å gange flottørens fart med ca. 0,85.",
  },
];

export const QUIZ_SJEKK_FELTARBEID_3: QuizQuestion[] = [
  {
    prompt: "Hvor nøyaktig er en vanlig mobil-GPS under åpen himmel?",
    options: [
      "Ca. 5 m",
      "Noen centimeter",
      "Ca. 500 m",
    ],
    answer: 0,
    explain: "En mobil har en nøyaktighet på ca. 5 m under åpen himmel og blir dårligere nær bygninger og trær. Skriv usikkerheten i feltboka.",
  },
  {
    prompt: "Hvorfor tar du bilde med en hammer eller tommestokk ved siden av?",
    options: [
      "For å vise hvem som tok bildet",
      "Fordi det er pent",
      "For å vise målestokken",
    ],
    answer: 2,
    explain: "Uten noe å sammenligne med kan ikke leseren se om lagene er en centimeter eller en meter tykke.",
  },
];

export const QUIZ_SJEKK_FELTARBEID_4: QuizQuestion[] = [
  {
    prompt: "Du finner usortert materiale med store, kantete blokker i åsryggen. Hva betyr det for hypotesen om en breelvavsetning?",
    options: [
      "Det svekker hypotesen og peker mot morene",
      "Det støtter hypotesen",
      "Det sier ingenting",
    ],
    answer: 0,
    explain: "Breelvavsetninger er sortert av vann. Usortert materiale med blokker er typisk for morene.",
  },
  {
    prompt: "Hva bør skilles tydelig i en presentasjon av et feltarbeid?",
    options: [
      "Bilder og tabeller",
      "Det du observerte og det du tolker",
      "Hypotese og problemstilling",
    ],
    answer: 1,
    explain: "Leseren skal kunne se hvilke data du samlet inn, og hvordan du kom fram til tolkningen og konklusjonen.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor kalles noen råvarer kritiske?",
    options: [
      "Fordi de er giftige",
      "Fordi de er viktige for økonomien, og forsyningen lett kan svikte",
      "Fordi de bare finnes i Norge",
    ],
    answer: 1,
    explain: "Kritiske råvarer er viktige for økonomien og har høy forsyningsrisiko. Risikoen er størst når produksjonen er samlet i få land.",
  },
  {
    prompt: "Hvilken liste bruker NGU når de omtaler en råvare som kritisk?",
    options: [
      "EUs liste over kritiske råvarer",
      "En egen norsk liste",
      "FNs liste over truede arter",
    ],
    answer: 0,
    explain: "NGU viser alltid til EUs liste. Den har 34 kritiske råvarer, og 17 av dem er også strategiske.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_2: QuizQuestion[] = [
  {
    prompt: "Hvordan ble kismalmene i Løkken og Røros dannet?",
    options: [
      "Av gasser som kokte ut av en granitt",
      "Av varme løsninger som nådde havbunnen ved undersjøiske vulkaner",
      "Ved forvitring i tropisk klima",
    ],
    answer: 1,
    explain: "Kismalmene ble avsatt fra varme løsninger på havbunnen i Iapetushavet og ble senere skjøvet inn i fjellkjeden. Gasser fra magma gir malmårer og malmganger, som i Oslofeltet.",
  },
  {
    prompt: "Hvorfor kan en forekomst være malm i dag, men ikke for 50 år siden?",
    options: [
      "Fordi malm er et økonomisk begrep, og pris og teknologi endrer seg",
      "Fordi bergarten har endret seg",
      "Fordi malm bare dannes i perm",
    ],
    answer: 0,
    explain: "Malm er en bergart med drivverdige mengder av et mineral eller grunnstoff. Når prisen stiger eller teknologien blir bedre, kan en forekomst bli drivverdig.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_3: QuizQuestion[] = [
  {
    prompt: "Hva er forskjellen på pukk og grus?",
    options: [
      "Det er ingen forskjell",
      "Grus er knust fast fjell, pukk tas fra løsmasser",
      "Pukk er knust fast fjell, grus tas fra løsmasser",
    ],
    answer: 2,
    explain: "Pukk lages ved å sprenge og knuse fast fjell, og kornene har skarpe kanter. Sand og grus tas ut fra løsmasser, for eksempel breelvavsetninger.",
  },
  {
    prompt: "Hvor mye sand, grus og pukk bruker vi i Norge per person i året?",
    options: [
      "Ca. 11 kg",
      "Ca. 1 tonn",
      "Ca. 11 tonn",
    ],
    answer: 2,
    explain: "Vi bruker om lag 60 millioner tonn i året, ca. 11 tonn per person. Det er omtrent like mye som en full lastebil.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_4: QuizQuestion[] = [
  {
    prompt: "Hva er oljevinduet?",
    options: [
      "Temperaturområdet ca. 60–130 °C, der det for det meste dannes olje",
      "Den delen av reservoaret der oljen ligger",
      "Temperaturområdet over 180 °C",
    ],
    answer: 0,
    explain: "I oljevinduet, ca. 60–130 °C, blir kerogen for det meste til olje. Ved ca. 130–180 °C dannes det gass. I Nordsjøen ligger oljevinduet på ca. 2–4 km dyp.",
  },
  {
    prompt: "Hvorfor ligger gassen øverst i en felle?",
    options: [
      "Fordi gassen dannes først",
      "Fordi takbergarten slipper gjennom olje",
      "Fordi gass har lavest tetthet, olje litt høyere og vann høyest",
    ],
    answer: 2,
    explain: "Væskene sorteres etter tetthet. Gassen legger seg øverst, oljen under og vannet nederst.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_5: QuizQuestion[] = [
  {
    prompt: "Hvilken metode brukes mest for å kartlegge mulige olje- og gassfeller under havbunnen?",
    options: [
      "Geokjemiske prøver av bekkesand",
      "Refleksjonsseismikk",
      "Radiometri fra helikopter",
    ],
    answer: 1,
    explain: "Refleksjonsseismikk viser lagene og strukturene i undergrunnen. Om det er petroleum i en felle, vet man først etter boring.",
  },
  {
    prompt: "Hvorfor ender malmleting nesten alltid med kjerneboring?",
    options: [
      "Fordi borekjernene viser hvor stor forekomsten er og hvor mye den inneholder",
      "Fordi det er den billigste metoden",
      "Fordi geofysikk ikke kan brukes i Norge",
    ],
    answer: 0,
    explain: "Geokjemi og geofysikk viser hvor det kan ligge en forekomst. Borekjernene viser om den er stor og rik nok til å være drivverdig.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_6: QuizQuestion[] = [
  {
    prompt: "Hvilket land sto for omtrent tre fjerdedeler av verdens koboltproduksjon i 2025?",
    options: [
      "Kina",
      "Chile",
      "DR Kongo",
    ],
    answer: 2,
    explain: "DR Kongo produserte ca. 230 000 av 310 000 tonn kobolt, ca. 73 % ifølge USGS. Kina produserte ca. 69 % av de sjeldne jordartene.",
  },
  {
    prompt: "Hva er status for kobberutvinning i Norge per oktober 2026?",
    options: [
      "Røros og Løkken er fortsatt i drift",
      "Ingen drift, men Nussir er under utbygging",
      "Norge er Europas største kobberprodusent",
    ],
    answer: 1,
    explain: "Det er ingen kobbergruver i drift i Norge. Nussir i Finnmark bygges ut, og produksjonen skal etter planen starte i 2027.",
  },
];

export const QUIZ_SJEKK_GEOLOGISKE_RESSURSER_7: QuizQuestion[] = [
  {
    prompt: "Hva er et sjødeponi?",
    options: [
      "Et lager for olje på havbunnen",
      "Et område på fjordbunnen der finkornet gruveavfall legges",
      "En type felle for gass",
    ],
    answer: 1,
    explain: "Avgangen fra gruva føres i rør ned til fjordbunnen. I Førdefjorden går bunnfaunaen i deponiområdet tapt i driftsperioden og en lang tid etterpå.",
  },
  {
    prompt: "Hvorfor er fornybar energi ikke uten konsekvenser for geologiske ressurser?",
    options: [
      "Fordi vindturbiner og elbiler trenger mye kobber og andre mineraler",
      "Fordi vindturbiner trenger olje som drivstoff",
      "Fordi solceller lages av kull",
    ],
    answer: 0,
    explain: "Ifølge IEA trenger en elbil seks ganger så mye mineraler som en vanlig bil, og et vindkraftverk på land ni ganger så mye som et gasskraftverk.",
  },
];

export const QUIZ_GEOLOGISK_TID: QuizQuestion[] = [
  {
    prompt: "Hva skiller relativ og absolutt datering?",
    options: [
      "Relativ datering gir alderen i år, absolutt datering bare rekkefølgen",
      "Relativ datering gir rekkefølgen, absolutt datering gir alderen i år",
      "Begge gir alderen i år, men med ulik nøyaktighet",
      "Relativ datering brukes bare på fossiler",
    ],
    answer: 1,
    explain: "Relativ datering plasserer hendelser i forhold til hverandre. Absolutt datering, for eksempel med radioaktive isotoper, gir alderen i år.",
  },
  {
    prompt: "Når gjelder ikke overlagringsprinsippet?",
    options: [
      "Når lagene er snudd, foldet eller skjøvet over hverandre",
      "Når lagene inneholder fossiler",
      "Når lagene er av sandstein",
      "Det gjelder alltid",
    ],
    answer: 0,
    explain: "Prinsippet gjelder uforstyrrede lag. I skyvedekkene i den kaledonske fjellkjeden kan eldre bergarter ligge oppå yngre.",
  },
  {
    prompt: "Et organisk materiale har en åttendedel igjen av sitt opprinnelige innhold av karbon-14. Omtrent hvor gammelt er det, før kalibrering?",
    options: [
      "Ca. 5700 år",
      "Ca. 11 500 år",
      "Ca. 46 000 år",
      "Ca. 17 200 år",
    ],
    answer: 3,
    explain: "En åttendedel betyr tre halveringstider. 3 × 5730 år er ca. 17 200 år. (Laboratoriene regner med en litt annen halveringstid og kalibrerer alltid alderen til kalenderår.)",
  },
  {
    prompt: "Hvilken metode passer best for å datere en granitt som er ca. 1 milliard år gammel?",
    options: [
      "C-14",
      "Varvtelling",
      "Uran–bly på zirkon",
      "Luminescens",
    ],
    answer: 2,
    explain: "Uran–bly-metoden har en halveringstid på ca. 4,5 milliarder år og brukes på zirkon i magmatiske bergarter. De andre metodene rekker bare noen titusener eller hundretusener av år tilbake.",
  },
  {
    prompt: "Hvorfor kan to bøker oppgi ulike tall for når en geologisk periode begynte?",
    options: [
      "Fordi geologene ikke bruker tall",
      "Fordi bedre dateringer gjør at ICS justerer grensene",
      "Fordi hvert land har sin egen tidsskala",
      "Fordi periodene flytter seg med platedriften",
    ],
    answer: 1,
    explain: "Tidsskalaen revideres når det kommer nye dateringer. Grensen til kambrium er for eksempel justert fra 542 og 541 til 538,8 millioner år.",
  },
];

export const QUIZ_SJEKK_GEOLOGISK_TID_1: QuizQuestion[] = [
  {
    prompt: "Hvilken rekkefølge går fra det lengste til det korteste tidsavsnittet?",
    options: [
      "Periode, eon, epoke, æra",
      "Eon, æra, periode, epoke",
      "Æra, eon, epoke, periode",
    ],
    answer: 1,
    explain: "En eon er delt i æraer, en æra i perioder og en periode i epoker. Jura er en periode i æraen mesozoikum.",
  },
  {
    prompt: "En bok fra 1990 sier at kvartær begynte for 1,8 millioner år siden. Hva er det beste svaret?",
    options: [
      "Boka har rett, tidsskalaen endres aldri",
      "Tallet er justert. I dag regner vi med at kvartær begynte for 2,58 millioner år siden",
      "Kvartær er ikke en periode",
    ],
    answer: 1,
    explain: "ICS reviderer tidsskalaen. Grensen for kvartær ble flyttet til 2,58 millioner år, og grensen for kambrium er i dag 538,8 millioner år.",
  },
];

export const QUIZ_SJEKK_GEOLOGISK_TID_2: QuizQuestion[] = [
  {
    prompt: "En gang av diabas skjærer gjennom et lag med kalkstein. Hva kan du si om alderen?",
    options: [
      "Gangen er eldre enn kalksteinen",
      "Gangen og kalksteinen er like gamle",
      "Gangen er yngre enn kalksteinen",
    ],
    answer: 2,
    explain: "Det som skjærer gjennom en bergart, må være yngre enn bergarten. Kalksteinen fantes allerede da magmaen trengte inn.",
  },
  {
    prompt: "I et snitt ligger skifer nederst, kalkstein over og sandstein øverst. En forkastning bryter skiferen og kalksteinen, men ikke sandsteinen. Hva skjedde først og sist?",
    options: [
      "Sandsteinen ble avsatt først, forkastningen sist",
      "Skifer og kalkstein ble avsatt, så kom forkastningen, og sandsteinen ble avsatt sist",
      "Forkastningen kom først, så ble alle tre lagene avsatt",
    ],
    answer: 1,
    explain: "Forkastningen er yngre enn lagene den bryter, men eldre enn sandsteinen som ligger uforstyrret over den.",
  },
  {
    prompt: "Granitt inneholder bruddstykker av basalt. Hva er eldst?",
    options: [
      "Basalten",
      "Granitten",
      "Det går ikke an å si",
    ],
    answer: 0,
    explain: "Inneslutninger er eldre enn bergarten de sitter i. Basalten fantes før granittmagmaen størknet rundt bruddstykkene.",
  },
  {
    prompt: "Hvorfor er trilobitter gode ledefossiler?",
    options: [
      "Fordi de levde i alle perioder",
      "Fordi hver art levde i kort tid, men var vidt utbredt",
      "Fordi de bare finnes i Norge",
    ],
    answer: 1,
    explain: "Et godt ledefossil har kort tidsmessig og stor geografisk utbredelse. Da kan det vise at lag på ulike steder har samme alder.",
  },
];

export const QUIZ_SJEKK_GEOLOGISK_TID_3: QuizQuestion[] = [
  {
    prompt: "Et mineral har en fjerdedel igjen av morisotopen. Hvor mange halveringstider har gått?",
    options: [
      "Én",
      "To",
      "Fire",
    ],
    answer: 1,
    explain: "Etter én halveringstid er halvparten igjen, og etter to er halvparten av halvparten, altså en fjerdedel, igjen.",
  },
  {
    prompt: "Hvorfor kan vi ikke bruke C-14 til å datere en dinosaurknokkel?",
    options: [
      "Fordi dinosaurer ikke inneholdt karbon",
      "Fordi knokkelen er mer enn 66 millioner år gammel, og det er ikke noe målbart karbon-14 igjen",
      "Fordi C-14 bare virker på bergarter",
    ],
    answer: 1,
    explain: "C-14 kan bare brukes på organisk materiale som er yngre enn ca. 50 000 år. Dinosaurene døde ut for 66 millioner år siden.",
  },
  {
    prompt: "Hvorfor er zirkon et viktig mineral for datering av gamle bergarter?",
    options: [
      "Det inneholder mye karbon-14",
      "Det dannes bare i sedimenter",
      "Det inneholder radioaktive grunnstoffer som uran",
    ],
    answer: 2,
    explain: "Zirkon inneholder uran, og uran–bly-metoden har så lang halveringstid at den passer for gamle bergarter.",
  },
];

export const QUIZ_SJEKK_GEOLOGISK_TID_4: QuizQuestion[] = [
  {
    prompt: "Du vil finne ut når et fjellskred gikk for flere tusen år siden. Hvilken metode passer best?",
    options: [
      "Uran–bly på zirkon",
      "Eksponeringsdatering med beryllium-10 på store blokker",
      "Varvtelling i skredmassen",
    ],
    answer: 1,
    explain: "Eksponeringsdatering viser hvor lenge steinen har vært utsatt for kosmisk stråling. For et fjellskred begynte det da skredet gikk.",
  },
  {
    prompt: "Hvorfor kan Vedde-asken brukes til å datere avsetninger over hele Europa?",
    options: [
      "Fordi asken ble avsatt samtidig over et stort område og er datert",
      "Fordi asken inneholder mye uran",
      "Fordi asken er like gammel som jorda",
    ],
    answer: 0,
    explain: "Alle avsetninger med samme askelag er like gamle. Når asken er datert ett sted, kan den brukes til å datere alle andre steder der den finnes.",
  },
  {
    prompt: "Et sandsteinslag ligger mellom to lavalag. Det nederste lavalaget er datert til 300 millioner år, og det øverste til 290 millioner år. Hva vet du om sandsteinen?",
    options: [
      "Den er eldre enn 300 millioner år",
      "Den er mellom 300 og 290 millioner år gammel",
      "Den er yngre enn 290 millioner år",
    ],
    answer: 1,
    explain: "Sandsteinen ble avsatt etter det nederste lavalaget og før det øverste. Alderen ligger mellom de to daterte nivåene.",
  },
];

export const QUIZ_SJEKK_BERGARTER_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor er kvarts et mineral, mens granitt er en bergart?",
    options: [
      "Kvarts er hardere enn granitt",
      "Kvarts har en bestemt kjemi og krystallstruktur, mens granitt består av flere mineraler",
      "Granitt er dannet av magma, og det er ikke kvarts",
    ],
    answer: 1,
    explain: "Et mineral har bestemt kjemi (kvarts er SiO₂) og en ordnet krystallstruktur. Granitt består av flere mineraler, blant annet kvarts og feltspat, og er derfor en bergart.",
  },
  {
    prompt: "Hvilken mineralgruppe hører hematitt og ilmenitt til?",
    options: [
      "Silikater",
      "Sulfider",
      "Oksider",
    ],
    answer: 2,
    explain: "Hematitt (Fe₂O₃) og ilmenitt (FeTiO₃) er oksider. De er bygd rundt oksygen og er viktige malmmineraler, hematitt i Rana og ilmenitt i Sokndal.",
  },
];

export const QUIZ_SJEKK_BERGARTER_2: QuizQuestion[] = [
  {
    prompt: "Frost sprenger en granittblokk i mindre biter, men bitene blir liggende. Hva er dette?",
    options: [
      "Mekanisk forvitring",
      "Kjemisk forvitring",
      "Erosjon",
    ],
    answer: 0,
    explain: "Berget sprekker, men mineralene er de samme, og bitene blir liggende på stedet. Det er mekanisk forvitring. Erosjon er det først når vann, is eller tyngdekraft flytter bitene.",
  },
  {
    prompt: "Hvorfor løses kalkstein lettere enn granitt av regnvann?",
    options: [
      "Kalkstein er alltid porøs",
      "Kalkstein består mest av karbonater, som løses av svak karbonsyre",
      "Granitt inneholder ikke mineraler",
    ],
    answer: 1,
    explain: "Regn tar opp CO₂ og blir en svak karbonsyre. Kalkstein består av mer enn 50 prosent karbonater, og de løses av syren.",
  },
];

export const QUIZ_SJEKK_BERGARTER_3: QuizQuestion[] = [
  {
    prompt: "Du finner en grovkornet bergart med synlige, ikke-orienterte korn av feltspat og pyroksen. Hvilken gruppe hører den trolig til?",
    options: [
      "Sedimentær",
      "Metamorf",
      "Magmatisk",
    ],
    answer: 2,
    explain: "Korn og prikker uten lagdeling og striper peker på magmatisk bergart. Store korn betyr langsom avkjøling på dypet, som i gabbro.",
  },
  {
    prompt: "Hva er protolitten til grønnstein?",
    options: [
      "Gabbro eller basalt",
      "Leirstein",
      "Kalkstein",
    ],
    answer: 0,
    explain: "Grønnstein er omdannet gabbro eller basalt. Protolitten er magmatisk, og bergarten er nå metamorf.",
  },
];

export const QUIZ_SJEKK_BERGARTER_4: QuizQuestion[] = [
  {
    prompt: "En sandstein blir varmet opp og presset dypt nede i en fjellkjede, uten å smelte. Hvilken vei i syklusen tar den?",
    options: [
      "Størkning",
      "Omdanning i fast tilstand, til metamorf bergart",
      "Forvitring og erosjon",
    ],
    answer: 1,
    explain: "Trykk og temperatur uten smelting gir omdanning i fast tilstand. Sandsteinen blir en metamorf bergart.",
  },
  {
    prompt: "Hvorfor sier vi at bergartssyklusen er en modell med flere veier?",
    options: [
      "Fordi alle bergarter blir sedimentære til slutt",
      "Fordi en bergart alltid smelter før den blir en ny bergart",
      "Fordi en bergart kan hoppe over stasjoner, slik gneisen i grunnfjellet har vært metamorf i over 900 millioner år",
    ],
    answer: 2,
    explain: "Ingen bergart må innom alle stasjonene. Gneisen i grunnfjellet har vært metamorf i over 900 millioner år, og larvikitten har vært magmatisk siden den størknet.",
  },
];

export const QUIZ_SJEKK_VULKANER_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor blir magma med mye SiO₂ seigere enn magma med lite SiO₂?",
    options: [
      "Fordi den er varmere",
      "Fordi silikattetraedrene kobles sammen i kjeder og nettverk",
      "Fordi den inneholder mer jern og magnesium",
    ],
    answer: 1,
    explain: "Med mye SiO₂ kobles silikattetraedrene sammen i kjeder og nettverk, og smelten flyter tregere. Ryolittisk magma er dessuten kaldere enn basaltisk, og det gjør den enda seigere.",
  },
  {
    prompt: "Hvorfor gir seig magma oftere eksplosive utbrudd?",
    options: [
      "Gassboblene slipper ikke ut, og trykket bygger seg opp",
      "Seig magma inneholder ikke gass",
      "Seig magma stiger raskere enn tyntflytende magma",
    ],
    answer: 0,
    explain: "I seig magma blir gassboblene holdt igjen. Trykket i dem stiger mens magmaen stiger, og til slutt kan smelten rives i stykker.",
  },
];

export const QUIZ_SJEKK_VULKANER_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor har skjoldvulkaner slakere sider enn stratovulkaner?",
    options: [
      "De er eldre og mer erodert",
      "De består mest av aske",
      "Den tyntflytende basaltlavaen renner langt før den størkner",
    ],
    answer: 2,
    explain: "Basaltisk lava har lav viskositet og renner langt. Vulkanen bygges av mange tynne lavadekker og får slake sider.",
  },
  {
    prompt: "Hva skiller en kaldera fra et krater?",
    options: [
      "En kaldera er en innsynkning som oppstår når taket over et tømt magmakammer faller ned",
      "En kaldera er et krater fylt med vann",
      "Det er ingen forskjell, ordene betyr det samme",
    ],
    answer: 0,
    explain: "Krateret er åpningen der materialet kommer ut. En kaldera er en mye større innsynkning, ofte flere kilometer bred.",
  },
];

export const QUIZ_SJEKK_VULKANER_3: QuizQuestion[] = [
  {
    prompt: "Et utbrudd har VEI 5. Omtrent hvor mye mer tefra kaster det ut enn et utbrudd med VEI 4?",
    options: [
      "Dobbelt så mye",
      "Omtrent ti ganger så mye",
      "Omtrent hundre ganger så mye",
    ],
    answer: 1,
    explain: "Over VEI 1 betyr hvert trinn omtrent ti ganger mer tefra.",
  },
  {
    prompt: "Hvorfor har Fagradalsfjall VEI 0, mens Eyjafjallajökull 2010 hadde VEI 4?",
    options: [
      "Fagradalsfjall hadde tyntflytende basalt på tørt land, og lavaen rant ut uten å eksplodere",
      "Fagradalsfjall ligger lenger fra Europa",
      "Eyjafjallajökull hadde mer lava",
    ],
    answer: 0,
    explain: "VEI måler hvor mye tefra som kastes ut, og hvor høyt søylen når. Lavastrømmer uten eksplosjoner gir lav VEI selv om utbruddet varer lenge.",
  },
];

export const QUIZ_SJEKK_VULKANER_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan en lahar være farlig langt fra selve vulkanen?",
    options: [
      "Den følger elvedalene og kan gå mange mil nedover dalen",
      "Den sprer seg i lufta som aske",
      "Den beveger seg alltid raskere enn en pyroklastisk strøm",
    ],
    answer: 0,
    explain: "En lahar er en tykk blanding av aske, stein og vann som følger elvedalene. Laharene fra Nevado del Ruiz nådde Armero ca. 45 km fra vulkanen.",
  },
  {
    prompt: "Hva er det som gir vulkansk vinter?",
    options: [
      "Aske som blir liggende på bakken",
      "CO₂ fra vulkanen",
      "Svovelsyredråper i stratosfæren som sprer sollys",
    ],
    answer: 2,
    explain: "Grov aske faller ut i løpet av dager og uker. Det er SO₂ som danner svovelsyredråper i stratosfæren og gir kjøling i noen år.",
  },
];

export const QUIZ_SJEKK_VULKANER_5: QuizQuestion[] = [
  {
    prompt: "Hvorfor omkom så mange i Armero, selv om det fantes et farekart?",
    options: [
      "Kartet viste ikke Armero",
      "Varselet kom sent og ble ikke fulgt opp med evakuering",
      "Laharen kom uten noe forvarsel fra vulkanen",
    ],
    answer: 1,
    explain: "Farekartet viste at Armero var utsatt. Varselet om evakuering kom mindre enn to timer før laharen, og det ble ikke fulgt opp. Ved Pinatubo seks år senere ble folk evakuert i tide.",
  },
  {
    prompt: "Hvilket tiltak passer best mot en tyntflytende lavastrøm som beveger seg mot et kraftverk?",
    options: [
      "Å bygge en voll som leder lavaen bort",
      "Å stenge luftrommet",
      "Å vente på at lavaen blir til aske",
    ],
    answer: 0,
    explain: "Lavastrømmer går ofte sakte nok til at de kan ledes bort med voller, slik som ved Svartsengi. På Heimaey ble lava også kjølt ned med sjøvann.",
  },
];

export const QUIZ_SJEKK_JORDSYSTEMENE_1: QuizQuestion[] = [
  {
    prompt: "Ei elv graver en V-dal i bratt fjell. Hvilken sfære er driver, og hvilken er mottaker?",
    options: [
      "Hydrosfæren er driver, og geosfæren er mottaker",
      "Geosfæren er driver, og hydrosfæren er mottaker",
      "Atmosfæren er både driver og mottaker",
    ],
    answer: 0,
    explain: "Elva er hydrosfære som graver i berg og løsmasser, altså geosfæren. Geosfæren svarer tilbake ved å styre fall og løp.",
  },
  {
    prompt: "Hvilket av disse hører til kryosfæren, ikke hydrosfæren, i dette kapitlet?",
    options: [
      "Grunnvann",
      "Isbreen",
      "Ei innsjø",
    ],
    answer: 1,
    explain: "Hydrosfæren er vannet på og under jordoverflaten. Is regner vi til kryosfæren.",
  },
];

export const QUIZ_SJEKK_JORDSYSTEMENE_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan et stort eksplosivt utbrudd kjøle jorda i noen år?",
    options: [
      "Asken blir liggende i stratosfæren i mange år",
      "CO₂ fra vulkanen kjøler lufta",
      "SO₂ i stratosfæren blir til sulfataerosoler som reflekterer sollys",
    ],
    answer: 2,
    explain: "Asken faller ut i løpet av dager til uker. Det er SO₂ som blir til sulfataerosoler i stratosfæren, og de reflekterer sollys i noen år.",
  },
  {
    prompt: "Hvorfor forklarer ikke vulkanene dagens oppvarming?",
    options: [
      "Vulkaner slipper ikke ut CO₂",
      "Vulkanenes CO₂-utslipp er under 0,5 gigatonn i året, mot ca. 38 gigatonn fra fossilt brensel",
      "Vulkansk CO₂ forsvinner i løpet av noen uker",
    ],
    answer: 1,
    explain: "Vulkaner slipper ut 0,13–0,44 gigatonn CO₂ i året (USGS), mens fossilt brensel ga 37,8 gigatonn i 2024. De menneskeskapte utslippene er ca. 80–270 ganger større (USGS).",
  },
];

export const QUIZ_SJEKK_JORDSYSTEMENE_3: QuizQuestion[] = [
  {
    prompt: "Hva skjer i den trege karbonsløyfen når CO₂ i atmosfæren stiger?",
    options: [
      "Det blir varmere, mer berg forvitrer, og mer karbon lagres i kalkstein, så temperaturen trekkes tilbake",
      "Det blir kaldere, og isen løser opp kalksteinen",
      "Ingenting, for sløyfen er for treg til å svare",
    ],
    answer: 0,
    explain: "Varmere klima gir mer regn og raskere forvitring. Flere ioner når havet og lagres som kalkstein. Det er en negativ tilbakekobling.",
  },
  {
    prompt: "Hvordan kommer karbonet i kalkstein tilbake til atmosfæren?",
    options: [
      "Regnet løser kalksteinen og sender CO₂ rett opp i lufta",
      "Kalksteinen synker ned i en subduksjonssone, karbonatene blir varmet opp og delvis løst i vann fra platen, og CO₂ frigjøres og kommer ut gjennom vulkaner",
      "Plankton puster det ut",
    ],
    answer: 1,
    explain: "Når havbunn med kalkstein subduseres, frigjør oppvarmingen CO₂ fra karbonatene. Vulkanene gir gassen tilbake til atmosfæren.",
  },
];

export const QUIZ_SJEKK_KRYO_1: QuizQuestion[] = [
  {
    prompt: "Hva er likevektslinjen (ELA) på en bre?",
    options: [
      "Grensen mellom bre og fjell",
      "Høyden der akkumulasjon og ablasjon er like stor",
      "Den nederste enden av breen",
    ],
    answer: 1,
    explain: "Over likevektslinjen hoper snøen seg opp, under smelter den. Firngrensen ved slutten av sommeren ligger ofte nær ELA, men er ikke det samme.",
  },
  {
    prompt: "Hvor stort er brearealet i Norge etter den siste kartleggingen (2018–2019)?",
    options: [
      "Om lag 2328 km², 14 prosent mindre enn i 1999–2006",
      "Om lag 23 000 km²",
      "Om lag 232 km²",
    ],
    answer: 0,
    explain: "NVE kartla breene fra satellitt. Arealet har minket med 14 prosent siden forrige kartlegging.",
  },
];

export const QUIZ_SJEKK_KRYO_2: QuizQuestion[] = [
  {
    prompt: "Hva er det aktive laget?",
    options: [
      "Den delen av breen som beveger seg",
      "Det øverste laget over permafrosten, som tiner hver sommer",
      "Havis som er yngre enn ett år",
    ],
    answer: 1,
    explain: "Når permafrosten varmes, blir det aktive laget dypere, og bakken blir mer ustabil.",
  },
  {
    prompt: "Hvorfor forsterker smeltende havis oppvarmingen i Arktis?",
    options: [
      "Fordi isen frigjør varme når den smelter",
      "Fordi havis inneholder CO₂",
      "Fordi mørkt hav tar opp mer solvarme enn hvit is",
    ],
    answer: 2,
    explain: "Is har høy albedo og hav lav. Mindre is gir mer oppvarming, og det er en positiv tilbakekobling.",
  },
];

export const QUIZ_SJEKK_KRYO_3: QuizQuestion[] = [
  {
    prompt: "Hvor stort område gjelder en regional snøskredfaregrad for?",
    options: [
      "Minst 100 km²",
      "Ett enkelt heng",
      "Hele Norge",
    ],
    answer: 0,
    explain: "Faregraden er regional. Den som ferdes i fjellet, må gjøre egne vurderinger.",
  },
  {
    prompt: "Hvordan ventes snøskredfaren å endre seg med klimaendringene?",
    options: [
      "Flere snøskred overalt",
      "Færre snøskred i lavlandet, men flere naturlig utløste skred høyt til fjells",
      "Ingen endring",
    ],
    answer: 1,
    explain: "Mindre snø og kortere sesong gir færre skred i lavlandet. Høyere opp ventes flere (Norsk klimaservicesenter).",
  },
];

export const QUIZ_SJEKK_CORIOLIS_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor ser ballen på karusellen ut til å svinge?",
    options: [
      "Fordi en kraft skyver den sidelengs",
      "Fordi den som ser på, roterer med karusellen",
      "Fordi ballen snurrer",
    ],
    answer: 1,
    explain: "Sett utenfra går ballen rett. Avbøyningen kommer av at ståstedet roterer.",
  },
  {
    prompt: "Hvilken vei avbøyes luft som blåser nordover på den nordlige halvkule?",
    options: [
      "Mot venstre",
      "Den avbøyes ikke",
      "Mot høyre",
    ],
    answer: 2,
    explain: "Lufta har med seg større fart østover enn bakken lenger nord, og det blir en høyresving.",
  },
];

export const QUIZ_SJEKK_CORIOLIS_2: QuizQuestion[] = [
  {
    prompt: "Hvor er corioliseffekten null?",
    options: [
      "Ved ekvator",
      "Ved polene",
      "Ved 60° bredde",
    ],
    answer: 0,
    explain: "Coriolisparameteren er null ved ekvator og øker mot polene. Derfor dannes ikke orkaner helt ved ekvator.",
  },
  {
    prompt: "Hvorfor blåser ikke vinden nær bakken langs isobarene?",
    options: [
      "Fordi corioliskraften er sterkest der",
      "Fordi friksjonen bremser vinden, særlig over land",
      "Fordi trykket er likt overalt",
    ],
    answer: 1,
    explain: "Over havet er vinkelen 0–20° og over land 20–40°, fordi friksjonen er større over land.",
  },
];

export const QUIZ_SJEKK_CORIOLIS_3: QuizQuestion[] = [
  {
    prompt: "Hvilken vei går ekmantransporten på den nordlige halvkule?",
    options: [
      "Med vinden",
      "Mot vinden",
      "Til høyre for vinden",
    ],
    answer: 2,
    explain: "Overflatelaget transporteres på tvers av vinden, til høyre i nord.",
  },
  {
    prompt: "Hvorfor kan en nordavind langs en vestkyst gi oppvelling?",
    options: [
      "Ekmantransporten skyver overflatevannet ut fra kysten, og dypvann kommer opp",
      "Nordavinden er varm",
      "Tidevannet blir større",
    ],
    answer: 0,
    explain: "Vannet som kommer opp, er rikt på næringsstoffer, og områdene har ofte rike fiskerier.",
  },
];

export const QUIZ_SJEKK_VINDSYSTEMET_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor får vi tre celler på hver halvkule i stedet for én?",
    options: [
      "Fordi jorda roterer og lufta mot polen dreies til vestavind",
      "Fordi havet stopper lufta ved 30°",
      "Fordi det er tre kontinenter",
    ],
    answer: 0,
    explain: "Uten rotasjon kunne én celle gått helt til polen. Corioliseffekten deler sirkulasjonen i Hadley-, Ferrel- og polarcellen.",
  },
  {
    prompt: "Hva holder Ferrel-cellen i gang?",
    options: [
      "Oppvarming ved ekvator",
      "De vandrende lavtrykkene og høytrykkene ved midlere breddegrader",
      "Friksjon mot bakken",
    ],
    answer: 1,
    explain: "Ferrel-cellen er termisk indirekte. Friksjon bremser vinden, men skaper den ikke.",
  },
];

export const QUIZ_SJEKK_VINDSYSTEMET_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor er det tørt nær 30°?",
    options: [
      "Fordi det ikke finnes elver der",
      "Fordi lufta synker, varmes opp og skyene løses opp",
      "Fordi sola skinner svakere der",
    ],
    answer: 1,
    explain: "Synkende luft presses sammen og varmes. Den relative fuktigheten faller, og det blir høytrykk og tørke.",
  },
  {
    prompt: "Hva er konvergenssonen (ITCZ)?",
    options: [
      "Et høytrykksbelte ved 30°",
      "Grensen mellom kald og varm luft ved 60°",
      "Beltet der passatene møtes og lufta stiger",
    ],
    answer: 2,
    explain: "Passatene strømmer sammen nær ekvator. Lufta stiger, og det blir skyer, byger og regn.",
  },
];

export const QUIZ_SJEKK_VINDSYSTEMET_3: QuizQuestion[] = [
  {
    prompt: "Fra hvilken retning blåser passaten på den nordlige halvkule?",
    options: [
      "Nordøst",
      "Sørvest",
      "Vest",
    ],
    answer: 0,
    explain: "Lufta strømmer fra 30° mot ekvator og dreies mot høyre, så den kommer fra nordøst.",
  },
  {
    prompt: "Hvorfor flytter konvergenssonen seg gjennom året?",
    options: [
      "Fordi havstrømmene snur",
      "Fordi den følger sola nordover og sørover",
      "Fordi jetstrømmen skyver den",
    ],
    answer: 1,
    explain: "Konvergenssonen følger der oppvarmingen er sterkest. Det gir regntid og tørketid i tropene.",
  },
];

export const QUIZ_SJEKK_VINDSYSTEMET_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor faller det mye mer nedbør på vestsiden av fjellene i Norge enn i Ottadalen?",
    options: [
      "Fordi det er kaldere i vest",
      "Fordi vestavinden løfter fuktig luft mot fjellene, og lesiden ligger i regnskygge",
      "Fordi lavtrykkene kommer fra øst",
    ],
    answer: 1,
    explain: "Orografisk nedbør faller på luvsiden. På lesiden synker lufta, varmes og er tørrere.",
  },
  {
    prompt: "Hva er polarfronten?",
    options: [
      "Grensen mellom kald polarluft og varm subtropisk luft",
      "Kanten av havisen",
      "Et høytrykk over Nordpolen",
    ],
    answer: 0,
    explain: "Langs polarfronten dannes vandrende lavtrykk som gir mye av nedbøren i Norge.",
  },
];

export const QUIZ_SJEKK_VAERKART_1: QuizQuestion[] = [
  {
    prompt: "Hva betyr det når isobarene ligger tett?",
    options: [
      "Høyt trykk",
      "Stor trykkforskjell over kort avstand og sterk vind",
      "At det blir nedbør",
    ],
    answer: 1,
    explain: "Tette isobarer gir sterk vind. Gisne isobarer gir svak vind.",
  },
  {
    prompt: "Hva betyr 12Z på et værkart?",
    options: [
      "Klokka 12 UTC",
      "Klokka 12 norsk tid om vinteren",
      "12 timer etter varselet",
    ],
    answer: 0,
    explain: "Kart, radar og satellittbilder har tidsstempel i UTC, også kalt Z-tid.",
  },
];

export const QUIZ_SJEKK_VAERKART_2: QuizQuestion[] = [
  {
    prompt: "Hvordan tegnes en kaldfront?",
    options: [
      "Rød strek med halvsirkler",
      "Blå strek med trekanter i fartsretningen",
      "Lilla strek uten symboler",
    ],
    answer: 1,
    explain: "Trekantene peker den veien fronten flytter seg.",
  },
  {
    prompt: "Hva betyr det at en front er en kaldfront?",
    options: [
      "At det er kuldegrader bak fronten",
      "At lufta bak er kaldere enn lufta foran",
      "At den kommer fra nord",
    ],
    answer: 1,
    explain: "Det finnes ingen fast temperaturgrense. Begge sidene kan være milde.",
  },
];

export const QUIZ_SJEKK_VAERKART_3: QuizQuestion[] = [
  {
    prompt: "Hvordan dannes en okkludert front?",
    options: [
      "Kaldfronten tar igjen varmfronten",
      "Varmfronten stopper opp",
      "To høytrykk møtes",
    ],
    answer: 0,
    explain: "Kaldfronten går raskere enn varmfronten. Varmsektoren løftes bort fra bakken, og lavtrykket svekkes.",
  },
  {
    prompt: "Hvem utviklet den norske syklonmodellen?",
    options: [
      "Vilhelm Bjerknes alene",
      "William Ferrel",
      "Jacob Bjerknes og Halvor Solberg",
    ],
    answer: 2,
    explain: "Jacob Bjerknes beskrev frontene i 1919, og sammen med Solberg publiserte han livsløpet i 1922.",
  },
];

export const QUIZ_SJEKK_VAERKART_4: QuizQuestion[] = [
  {
    prompt: "Hva betyr tallet 564 på et 500 hPa-kart?",
    options: [
      "Trykket er 564 hPa",
      "500 hPa-flaten ligger 5640 meter over havet",
      "Temperaturen er –56,4 °C",
    ],
    answer: 1,
    explain: "Konturene viser høyden av 500 hPa-flaten. Den siste nullen er sløyfet.",
  },
  {
    prompt: "Hvilken vei peker vindpilen i et stasjonsplott?",
    options: [
      "Dit vinden kommer fra",
      "Dit vinden blåser",
      "Alltid mot nord",
    ],
    answer: 0,
    explain: "Vinden har navn etter retningen den kommer fra, og vindpilen peker dit.",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_1: QuizQuestion[] = [
  {
    prompt: "Hvilken av disse setter IKKE i seg selv vannet i bevegelse, men bøyer av strømmen?",
    options: [
      "Vinden",
      "Tetthetsforskjeller",
      "Jordrotasjonen",
    ],
    answer: 2,
    explain: "Jordrotasjonen bøyer av alt som beveger seg, mot høyre på den nordlige halvkulen (Barthel, 2025).",
  },
  {
    prompt: "Hva er 1 sverdrup (Sv)?",
    options: [
      "1 meter per sekund",
      "1 million kubikkmeter vann per sekund",
      "1000 kubikkmeter vann per døgn",
    ],
    answer: 1,
    explain: "Sverdrup er enheten for vanntransport (Barthel, 2025).",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_2: QuizQuestion[] = [
  {
    prompt: "Vinden blåser mot nord på den nordlige halvkulen. Hvilken vei går ekmantransporten?",
    options: [
      "Mot øst",
      "Mot vest",
      "Mot nord",
    ],
    answer: 0,
    explain: "90 grader til høyre for vinden (Barthel, 2021a).",
  },
  {
    prompt: "Hvorfor er Golfstrømmen smal og rask, mens Kanaristrømmen er bred og langsom?",
    options: [
      "Fordi det blåser mer på vestsiden av Atlanteren",
      "Fordi vannet er varmere i vest",
      "Fordi corioliseffekten øker mot nord, noe som gir vestlig intensivering",
    ],
    answer: 2,
    explain: "Stommel (1948) viste at det er fordi jorda er rund (Barthel, 2025).",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_3: QuizQuestion[] = [
  {
    prompt: "Langs en vestkyst på den nordlige halvkulen blåser vinden mot sør, parallelt med land. Hva skjer?",
    options: [
      "Overflatevannet presses mot land, og det blir nedvelling",
      "Overflatevannet føres ut fra land, og det blir oppvelling",
      "Ingenting, fordi vinden blåser langs kysten",
    ],
    answer: 1,
    explain: "Ekmantransporten går 90 grader til høyre for vinden, altså vestover og ut fra land (Barthel, 2021b).",
  },
  {
    prompt: "Hvorfor er oppvellingsområdene så rike på fisk?",
    options: [
      "Vannet fra dypet har mye næringssalter, og planteplanktonet vokser godt",
      "Vannet er varmere enn rundt",
      "Strømmen er svakere enn rundt",
    ],
    answer: 0,
    explain: "De dekker under 1 prosent av havoverflaten, men står for opptil 20 prosent av fiskefangsten i verden (Du mfl., 2024).",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_4: QuizQuestion[] = [
  {
    prompt: "Hva heter strømmen som frakter varmt atlanterhavsvann langs norskekysten?",
    options: [
      "Golfstrømmen",
      "Labradorstrømmen",
      "Den norske atlanterhavsstrømmen",
    ],
    answer: 2,
    explain: "Golfstrømmen går langs Nord-Amerika. Navnet brukes feil om strømmen langs Norge (Barthel, 2026; Weber & Bjørndalen, 2024).",
  },
  {
    prompt: "Hvorfor er Den norske kyststrømmen ferskere enn atlanterhavsvannet?",
    options: [
      "Fordi den får smeltevann fra Grønland",
      "Fordi den har med seg ferskvann fra Østersjøen og de norske elvene",
      "Fordi det regner mer nær land",
    ],
    answer: 1,
    explain: "Saltholdigheten er 30–33 promille (Havforskningsinstituttet, 2026; Sælen mfl., 2025a).",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_5: QuizQuestion[] = [
  {
    prompt: "Hva er den beste forklaringen på at Norge er så mildt?",
    options: [
      "Bare varmen fra havstrømmene",
      "Samspillet mellom varme havstrømmer og vindsystemene",
      "At sola står høyere her enn på Grønland",
    ],
    answer: 1,
    explain: "Havet gir varme til lufta, og de sørvestlige vindene fører lufta inn over land (Dannevig & Harstveit, 2026; Weber & Bjørndalen, 2024).",
  },
  {
    prompt: "Hvordan har temperaturen i atlanterhavsvannet i Norskehavet utviklet seg siden 1970-tallet?",
    options: [
      "Den har steget",
      "Den har sunket",
      "Den har vært uendret",
    ],
    answer: 0,
    explain: "2007 var det varmeste året i Svinøy- og Gimsøysnittet, og i 2025 var temperaturen omtrent 0,3 grader over normalen (Havforskningsinstituttet, u.å.).",
  },
];

export const QUIZ_SJEKK_HAVSTROMMER_6: QuizQuestion[] = [
  {
    prompt: "Hva gjør først og fremst at overflatevannet synker i Nord-Atlanteren?",
    options: [
      "At det blir kraftig avkjølt om vinteren",
      "At det fordamper mye vann om sommeren",
      "At det kommer mye smeltevann",
    ],
    answer: 0,
    explain: "Saltet fra havis betyr mest rundt Antarktis (Barthel, 2025; Sælen mfl., 2025a).",
  },
  {
    prompt: "Hva mener FNs klimapanel om AMOC i dette hundreåret?",
    options: [
      "Den vil sannsynligvis bryte brått sammen før 2100",
      "Den vil bli sterkere",
      "Den vil svært sannsynlig bli svekket, men med middels sikkerhet ikke bryte brått sammen før 2100",
    ],
    answer: 2,
    explain: "IPCC (2021), SPM C.3.4.",
  },
];

export const QUIZ_SJEKK_MODELLER_1: QuizQuestion[] = [
  {
    prompt: "Hvorfor gir en modell med ruter på 2,5 km ofte et bedre varsel i en fjord enn en modell med ruter på 9 km?",
    options: [
      "Fordi modeller med små ruter ikke trenger observasjoner",
      "Fordi små ruter beskriver fjell, daler og fjorder bedre",
      "Fordi modeller med store ruter bare regner ut temperatur",
    ],
    answer: 1,
    explain: "Hver rute har én verdi. Med 9 km ruter blir en smal fjord og fjellene rundt «glattet ut». Med 2,5 km ruter kommer terrenget bedre fram (Sivle, 2025).",
  },
  {
    prompt: "Hvorfor må tidssteget gjøres kortere når rutene blir mindre?",
    options: [
      "Fordi en bølge eller strøm ellers kan flytte seg over mer enn én rute på ett steg, og regnestykket blir ustabilt",
      "Fordi datamaskinen regner fortere med små ruter",
      "Fordi små ruter bare kan brukes om natta",
    ],
    answer: 0,
    explain: "Dette er CFL-kriteriet. Norkyst bruker et tidssteg på 40 sekunder med ruter på ca. 800 meter (Christensen mfl., 2026).",
  },
];

export const QUIZ_SJEKK_MODELLER_2: QuizQuestion[] = [
  {
    prompt: "Hvorfor må modellen parameterisere skyer og turbulens?",
    options: [
      "Fordi skyer og turbulens ikke påvirker været",
      "Fordi prosessene er for raske til å måles",
      "Fordi prosessene er mindre enn rutene, så modellen kan ikke regne dem ut direkte",
    ],
    answer: 2,
    explain: "Det modellen ikke ser i rutenettet, beskrives med forenklede formler for den samlede virkningen på ruten (ECMWF, u.å.-c).",
  },
  {
    prompt: "Hva betyr det at MEPS er en konveksjonstillatende modell?",
    options: [
      "At modellen ikke har skyer",
      "At rutene er så små at store byger i grove trekk kan regnes ut direkte",
      "At modellen bare brukes om sommeren",
    ],
    answer: 1,
    explain: "Med ruter på 2,5 km trengs det ikke en egen parameterisering for de store bygeskyene, men skydråper og turbulens må fortsatt parameteriseres.",
  },
];

export const QUIZ_SJEKK_MODELLER_3: QuizQuestion[] = [
  {
    prompt: "Hva er analysen i dataassimilering?",
    options: [
      "Et kort varsel fra forrige modellkjøring",
      "En liste over alle observasjonene",
      "Den beste beskrivelsen av tilstanden nå, laget ved å justere bakgrunnen mot nye observasjoner",
    ],
    answer: 2,
    explain: "Bakgrunnen er det korte varselet. Analysen er bakgrunnen justert mot observasjonene, og den er startpunktet for neste varsel (ECMWF).",
  },
  {
    prompt: "Hvorfor kjører MET og ECMWF ensembler i stedet for ett varsel?",
    options: [
      "Fordi små feil i startverdiene vokser, så vi trenger flere mulige forløp for å se hvor sikkert varselet er",
      "Fordi én modell ikke har nok ruter",
      "Fordi hver kommune skal ha sitt eget varsel",
    ],
    answer: 0,
    explain: "Atmosfæren er kaotisk. Spredningen mellom medlemmene viser hvor usikkert varselet er (Meteorologisk institutt, 2020).",
  },
];

export const QUIZ_SJEKK_MODELLER_4: QuizQuestion[] = [
  {
    prompt: "Hvorfor trenger MEPS randverdier fra ECMWF?",
    options: [
      "Fordi MEPS bare dekker et avgrenset område og må vite hva som kommer inn langs kanten",
      "Fordi MEPS ikke har egne observasjoner",
      "Fordi ECMWF har finere ruter enn MEPS",
    ],
    answer: 0,
    explain: "Et lavtrykk som er på vei inn fra Atlanterhavet, må komme inn i MEPS-området et sted. Det er randverdiene fra den globale modellen som sørger for det (Eresmaa, 2024).",
  },
  {
    prompt: "Hvilken modell gir varslene for Svalbard på Yr?",
    options: [
      "NorESM",
      "Norkyst",
      "AROME-Arctic",
    ],
    answer: 2,
    explain: "AROME-Arctic dekker Svalbard, Nord-Norge og havområdene rundt, med ruter på 2,5 km (Meteorologisk institutt, 2017).",
  },
];

export const QUIZ_SJEKK_MODELLER_5: QuizQuestion[] = [
  {
    prompt: "Hvorfor trenger Norkyst data fra en værmodell?",
    options: [
      "Fordi havmodellen ikke har noe eget rutenett",
      "Fordi vind og lufttrykk driver strømmene og vannstanden i havet",
      "Fordi værmodellen regner ut saltholdigheten",
    ],
    answer: 1,
    explain: "Vind og lufttrykk fra MET sin værmodell gjør at Norkyst kan regne ut strøm og stormflo (Christensen mfl., 2026).",
  },
  {
    prompt: "Hva brukes Norkyst-varslene til?",
    options: [
      "Bare til å varsle bølgehøyde for surfere",
      "Til å varsle nedbør på Yr",
      "Blant annet til søk og redning, oljedrift og spredning av lakselus",
    ],
    answer: 2,
    explain: "Strømvarslene sier hvor noe som flyter i sjøen, vil drive (Christensen mfl., 2026).",
  },
];

export const QUIZ_SJEKK_MODELLER_6: QuizQuestion[] = [
  {
    prompt: "Hva er den viktigste forskjellen på en værmodell og en klimamodell?",
    options: [
      "Klimamodeller bruker ikke fysiske likninger",
      "Værmodellen regner ut været framover fra været i dag, mens klimamodellen regner ut hvordan værstatistikken endrer seg når pådrivene endres",
      "Klimamodeller har alltid finere ruter enn værmodeller",
    ],
    answer: 1,
    explain: "Begge løser de samme likningene, men de svarer på ulike spørsmål (Benestad & Gjengedal, 2024).",
  },
  {
    prompt: "Hvordan kan forskerne teste en klimamodell?",
    options: [
      "Ved å kjøre den mot klimaet vi har målt, og sammenligne med andre modeller",
      "Ved å vente til 2100",
      "Ved å sammenligne med værvarselet for neste uke",
    ],
    answer: 0,
    explain: "Modellene testes mot temperatur, årstider og naturlige svingninger som er målt, og mot hverandre i CMIP (Benestad & Gjengedal, 2024).",
  },
];

export const QUIZ_SJEKK_FELT_HAV_1: QuizQuestion[] = [
  {
    prompt: "Hva betyr det at en måling er georeferert?",
    options: [
      "At den er tatt med et kalibrert instrument",
      "At den er knyttet til en posisjon",
      "At den er sammenlignet med et varsel",
    ],
    answer: 1,
    explain: "Kjerneelementet krever georefererte data (Udir, u.å.-a). I hav, luft og is noterer du også tidspunktet.",
  },
  {
    prompt: "Hvilket instrument passer best for å måle saltholdighet nedover i en fjord?",
    options: [
      "Radiosonde",
      "Snøprofil",
      "CTD",
    ],
    answer: 2,
    explain: "CTD måler konduktivitet og temperatur mot dyp (NOAA, u.å.).",
  },
];

export const QUIZ_SJEKK_FELT_HAV_2: QuizQuestion[] = [
  {
    prompt: "Hva er påbudt i en fritidsbåt som er kortere enn åtte meter, når båten er i fart?",
    options: [
      "At alle har på seg flyteutstyr når de er utendørs i båten og båten er i fart",
      "At båten har ekkolodd",
      "At føreren har med seg kart",
    ],
    answer: 0,
    explain: "Småbåtloven (1998) § 23 a.",
  },
  {
    prompt: "Hva bør du ha med deg når du skal ut på isen?",
    options: [
      "Bare mobiltelefon",
      "Snøspade og søkestang",
      "Isstav, ispigger og redningsvest, og kasteline når dere er flere",
    ],
    answer: 2,
    explain: "Varsom (u.å.-c).",
  },
];

export const QUIZ_SJEKK_FELT_HAV_3: QuizQuestion[] = [
  {
    prompt: "Hvordan finner man vinden med en radiosonde?",
    options: [
      "Sonden har en vindmåler på toppen",
      "Ut fra lufttrykket ved bakken",
      "Ut fra hvordan sonden driver sidelengs mens den stiger",
    ],
    answer: 2,
    explain: "Store norske leksikon (u.å.-a).",
  },
  {
    prompt: "Hvorfor skal lufttemperaturen måles i skygge, 1,25–2 meter over bakken?",
    options: [
      "Fordi det er mest praktisk",
      "Fordi målinger fra ulike steder da kan sammenlignes",
      "Fordi termometeret ellers fryser",
    ],
    answer: 1,
    explain: "WMO har faste regler for målingene (WMO, 2024).",
  },
];

export const QUIZ_SJEKK_FELT_HAV_4: QuizQuestion[] = [
  {
    prompt: "Hvordan får man saltholdigheten fra en CTD-måling?",
    options: [
      "CTD-en har en egen saltmåler",
      "Den regnes ut fra ledningsevnen og temperaturen",
      "Den leses av på vannprøvene i laboratoriet hver gang",
    ],
    answer: 1,
    explain: "Store norske leksikon (u.å.-d) og WHOI (u.å.).",
  },
  {
    prompt: "Hva gjør en Argo-bøye mesteparten av tiden?",
    options: [
      "Den driver med strømmen på ca. 1000 meters dyp",
      "Den ligger i overflaten og måler bølger",
      "Den står fast på havbunnen",
    ],
    answer: 0,
    explain: "Argo (u.å.).",
  },
];

export const QUIZ_SJEKK_FELT_HAV_5: QuizQuestion[] = [
  {
    prompt: "Hvor stort område gjelder faregraden i snøskredvarselet?",
    options: [
      "Det hengen du står i",
      "Et helt fylke",
      "Minst 100 kvadratkilometer",
    ],
    answer: 2,
    explain: "Varsom (u.å.-b).",
  },
  {
    prompt: "Hvor skal du grave en snøprofil?",
    options: [
      "På et skredtrygt sted med jevnt snødekke som er representativt for området",
      "Midt i den bratteste hengen",
      "Der snøen er tynnest",
    ],
    answer: 0,
    explain: "NVE (2022).",
  },
];

export const QUIZ_SJEKK_FELT_HAV_6: QuizQuestion[] = [
  {
    prompt: "Hvorfor bør du gjenta målingene?",
    options: [
      "For å se hvor mye de varierer, og for å kunne regne ut et gjennomsnitt",
      "For å få flere rader i feltboka",
      "Fordi den første målingen alltid er feil",
    ],
    answer: 0,
    explain: "Spredningen viser hvor sikker du kan være.",
  },
  {
    prompt: "Hvordan viser du vanligvis en CTD-profil?",
    options: [
      "Som et kakediagram",
      "Med dypet på den loddrette aksen og den målte verdien på den vannrette",
      "Som en tabell uten enheter",
    ],
    answer: 1,
    explain: "Da ser du lagdelingen direkte.",
  },
];

export const QUIZ_SJEKK_KLIMA_1: QuizQuestion[] = [
  {
    prompt: "Hvilke fem deler består klimasystemet av?",
    options: [
      "Atmosfæren, hydrosfæren, kryosfæren, geosfæren og biosfæren",
      "Sola, månen, havet, lufta og isen",
      "Troposfæren, stratosfæren, mesosfæren, termosfæren og eksosfæren",
    ],
    answer: 0,
    explain: "Samspillet mellom de fem delene bestemmer klimaet (WMO, u.å.).",
  },
  {
    prompt: "Hva er forskjellen på en indre svingning og et ytre pådriv?",
    options: [
      "Det er det samme",
      "En indre svingning oppstår i systemet selv, mens et ytre pådriv kommer utenfra, for eksempel fra klimagasser",
      "Et ytre pådriv gjelder bare havet",
    ],
    answer: 1,
    explain: "ENSO og NAO er indre svingninger. Mer klimagasser er et ytre pådriv.",
  },
];
