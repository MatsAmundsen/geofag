import type { QuizQuestion } from "@/components/quiz";

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
      "Sommene blir kjøligere, så snø og is kan bygge seg opp.",
      "Sommene blir varmere, så all is smelter med en gang.",
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
      "For 11 600 år siden.",
      "For 20 000 år siden, som er siste istids maksimum.",
      "I 1976, da havbunnsstudien ble publisert.",
    ],
    answer: 0,
    explain:
      "Se «Hvorfor istidene kommer». 20 000 år er siste istids maksimum. 11 600 år er slutten på siste istid.",
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
    prompt: "Hva er et ensemble hos ECMWF?",
    options: [
      "Mange fulle værforløp som sammen viser hvor sannsynlige ulike utfall er.",
      "Ett endelig tall for morgendagens temperatur.",
      "Et arkiv som bare viser været i fjor.",
    ],
    answer: 0,
    explain: "Se «Ensemblet». Hvert medlem er et fullt forløp.",
  },
  {
    prompt: "Hvor ofte kjører ECMWF globale numeriske værvarsler?",
    options: [
      "Én gang i uken.",
      "Fire ganger i døgnet.",
      "Bare når det er storm.",
    ],
    answer: 1,
    explain: "Se «Observasjoner, hav og klima». De globale varslene kjøres fire ganger i døgnet.",
  },
  {
    prompt: "Hva hviler varslene på?",
    options: [
      "Bare på et kart noen tegner for hånd.",
      "Et globalt observasjonssystem som ECMWF overvåker.",
      "Bare på målinger fra én værstasjon.",
    ],
    answer: 1,
    explain: "Se «Observasjoner, hav og klima». Satellitter, vanlige målinger og havobservasjoner er med.",
  },
  {
    prompt: "Hva bruker ECMWF modellene til, ved siden av vær til i morgen?",
    options: [
      "Bare til å tegne fronter på et papirkart.",
      "Blant annet klimaovervåking og analyse av havsirkulasjonen.",
      "Bare til å varsle snøskred i ett heng.",
    ],
    answer: 1,
    explain: "Se «Observasjoner, hav og klima». Hav og klima ligger i samme arbeid.",
  },
  {
    prompt: "Hvordan videreutvikles varslene?",
    options: [
      "Ved forskning som skal gjøre varslene bedre.",
      "Ved å la være å bruke nye observasjoner.",
      "Ved å fjerne ensemblet.",
    ],
    answer: 0,
    explain: "Se «Hva er en numerisk modell?». Forskning for bedre treffsikkerhet er en kjerneoppgave.",
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
    explain: "Se tabellen. Positiv fase er sterk trykkforskjell.",
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
      "Se tabellen. Sterkere jetstrøm og stormbane lenger nord gir mer storm og varme i Nord-Europa.",
  },
  {
    prompt: "Hva merker Sør-Europa i negativ fase?",
    options: [
      "Mer storm, mer nedbør og varmere enn gjennomsnittet.",
      "Mindre nedbør enn gjennomsnittet.",
      "Det samme som Nord-Europa i positiv fase.",
    ],
    answer: 0,
    explain: "Se tabellen. Negativ fase gir mer storm og varme i Sør-Europa.",
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
];

export const QUIZ_IOD: QuizQuestion[] = [
  {
    prompt: "Hva er den indiske hav-dipolen?",
    options: [
      "Vedvarende forskjell i havtemperatur mellom vest og øst i det tropiske Indiahavet.",
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
    explain: "Se tabellen. Positiv fase er varmere i vest og kjøligere i øst.",
  },
  {
    prompt: "Hva er DMI?",
    options: [
      "Forskjellen i temperaturavvik mellom en vestlig og en østlig rute.",
      "Havnivået ved ekvator.",
      "Nedbøren i Australia i millimeter.",
    ],
    answer: 0,
    explain: "Se «Hvordan den måles». DMI er vest minus øst.",
  },
  {
    prompt: "Er dipolen det samme som ENSO?",
    options: [
      "Nei. Saji og medforfattere fant et mønster som er uavhengig av ENSO.",
      "Ja. Positiv IOD er El Niño.",
      "Ja. Negativ IOD er La Niña.",
    ],
    answer: 0,
    explain:
      "Se «Vanlige misforståelser». Mønsteret er en indre variasjon i Indiahavet og er uavhengig av ENSO.",
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
      "Se «Tre faser». Hendelsene starter ofte i mai eller juni, topper seg mellom august og oktober, og dør ut rundt slutten av våren på den sørlige halvkule.",
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
    prompt: "Hva driver havstrømmer?",
    options: [
      "Tidevann, vind og forskjeller i tetthet.",
      "Bare vinden, både i overflaten og i hele dyphavet.",
      "Bare månens drag, også midt i de store havvirvlene.",
    ],
    answer: 0,
    explain:
      "Se «Hva driver en havstrøm?». Tidevann, vind og tetthet driver strømmene. Tetthetsstrømmene går mye saktere.",
  },
  {
    prompt: "Hvilken vei går ekmantransporten på den nordlige halvkule?",
    options: [
      "På tvers av vinden, til høyre for vindretningen.",
      "Nøyaktig samme vei som vinden blåser.",
      "Til venstre for vinden, som på den sørlige halvkule.",
    ],
    answer: 0,
    explain:
      "Se «Overflaten: ekmantransport og havvirvler». Overflatelaget, om lag de øverste 50 meterne, transporteres på tvers av vinden.",
  },
  {
    prompt: "Hva er oppvelling langs en vestkyst?",
    options: [
      "Overflatevann skyves ut, og kaldere, næringsrikt vann kommer opp fra dypet.",
      "Overflatevannet presses inn mot land og synker.",
      "Havisen fryser, og saltet blir igjen i overflaten.",
    ],
    answer: 0,
    explain:
      "Se «Oppvelling». En nordavind langs en vestkyst på den nordlige halvkule skyver overflaten utover.",
  },
  {
    prompt: "Hva heter strømmen nordover langs norskekysten?",
    options: [
      "Den norske atlanterhavsstrømmen, en gren av Den nordatlantiske strømmen.",
      "Selve Golfstrømmen, hele veien fra Florida.",
      "Labradorstrømmen, som kommer sørfra langs Norge.",
    ],
    answer: 0,
    explain:
      "Se «Golfstrømmen og Norges klima». Navnet Golfstrømmen brukes feilaktig om strømmen langs Norge.",
  },
  {
    prompt: "Hvorfor synker vann i Nord-Atlanteren og starter transportbåndet?",
    options: [
      "Vannet avkjøles, og salt blir igjen når havis fryser, så tettheten øker.",
      "Vinden presser overflatevannet rett ned til bunnen.",
      "Varmt ferskvann er tyngre enn kaldt salt vann.",
    ],
    answer: 0,
    explain:
      "Se «Dypet: det globale transportbåndet». Kaldt og saltere vann blir tettere og synker. Overflatevann trekkes inn.",
  },
];

export const QUIZ_KLIMA: QuizQuestion[] = [
  {
    prompt: "Hvilke fem deler består klimasystemet av?",
    options: [
      "Atmosfæren, hydrosfæren, kryosfæren, litosfæren og biosfæren.",
      "Bare atmosfæren og havet.",
      "Bare is, land og livet.",
    ],
    answer: 0,
    explain:
      "Se «Hva er klimasystemet?». WMO beskriver de fem delene, og samspillet mellom dem.",
  },
  {
    prompt: "Hva skiller indre dynamikk fra ytre pådriv?",
    options: [
      "Indre dynamikk er variasjon i systemet selv. Ytre pådriv er et dytt utenfra, som vulkan, sol, bane eller menneskelig endring.",
      "Begge er det samme som oppvarmingstrenden.",
      "Ytre pådriv er bare været fra dag til dag.",
    ],
    answer: 0,
    explain:
      "Se «Hva er klimasystemet?». Systemet endrer seg både av egen indre dynamikk og av ytre pådriv.",
  },
  {
    prompt: "Hvor i dette kapitlet ligger stråling, pådriv og tilbakekobling?",
    options: ["I oversikten.", "På ENSO-siden.", "På AMOC-siden."],
    answer: 0,
    explain: "Se tabellen. Oversikten eier stråling, pådriv og tilbakekobling. Denne siden er kartet.",
  },
  {
    prompt: "Hvilken svingning ligger nærmest norsk vintervær?",
    options: [
      "NAO, svingningen over Nord-Atlanteren.",
      "IOD, svingningen i Det indiske hav.",
      "ENSO, svingningen i det tropiske Stillehavet.",
    ],
    answer: 0,
    explain: "Se tabellen. NAO er svingningen over Nord-Atlanteren, nærmest norsk vintervær.",
  },
  {
    prompt: "Er El Niño eller en positiv NAO det samme som oppvarmingstrenden?",
    options: [
      "Nei. De hører til den indre dynamikken. Mer drivhusgass er et ytre pådriv.",
      "Ja. El Niño er oppvarmingstrenden.",
      "Ja. Positiv NAO er det samme som mer drivhusgass.",
    ],
    answer: 0,
    explain:
      "Se «Vanlige misforståelser». El Niño og positiv NAO hører til den indre dynamikken. Ytre pådriv, som mer drivhusgass, er noe annet.",
  },
];

export const QUIZ_JET: QuizQuestion[] = [
  {
    prompt: "Hvilken vei blåser vinden i en jetstrøm?",
    options: [
      "Fra vest mot øst.",
      "Fra øst mot vest, på begge halvkuler.",
      "Rett fra ekvator mot polen, uten sideveis avbøyning.",
    ],
    answer: 0,
    explain:
      "I jetstrømmen blåser vinden fra vest mot øst. Beltet kan likevel flytte seg nordover og sørover. Se «Hva er en jetstrøm?».",
  },
  {
    prompt: "Hvor ligger polarjeten og den subtropiske jetstrømmen?",
    options: [
      "Polarjeten mellom 50° og 60°, den subtropiske rundt 30°.",
      "Begge ligger fast over ekvator.",
      "Polarjeten rundt 30°, den subtropiske mellom 50° og 60°.",
    ],
    answer: 0,
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
      "Jetstrømmen blir sterkere, og stormbanen flytter seg nordover. Nord-Europa får mer storm og mildere vær.",
      "Jetstrømmen stopper, og Nord-Europa får ørkenklima.",
      "Stormbanen flytter seg til ekvator, og Island får høytrykk hele vinteren.",
    ],
    answer: 0,
    explain:
      "Positiv NAO er en sterkere trykkforskjell mellom Island og Asorene. Den atlantiske jetstrømmen blir sterkere, og stormbanen ligger lenger nord. Se «Slynger, årstid og stormbane».",
  },
  {
    prompt: "Hvorfor er jetstrømmen tegnet som en strek på værkartet en forenkling?",
    options: [
      "Streken viser der vinden er sterkest. Selve beltet er bredere, og vinden øker inn mot kjernen.",
      "Streken er en front på bakken, med like sterk vind overalt.",
      "Streken viser bare flyruter, ikke vind.",
    ],
    answer: 0,
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
      "Fordi astenosfæren i utgangspunktet er et flytende magmaha som slipper fri.",
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
      "To kontinentalplater kolliderer etter at havbunnen er fullstendig subdusert; jordskorpen forkortes og fortykkes til en mektig fjellkjede.",
      "Havbunnen utvider seg med 2–10 cm i året fra en sentral midthavsrygg.",
      "En mantelplym brenner hull gjennom litosfæren og bygger en rekke av vulkanske øyer.",
    ],
    answer: 1,
    explain:
      "Riktig! I suturstadiet (som i dagens Himalaya og oldtidens Kaledonider) har havbassenget lukket seg helt. Den lette kontinentale skorpen kan ikke subdueres, og kollisjonen folder og stabler jordskorpen i mektige skyvedekker og fjellkjeder langs suturlinjen.",
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
      "Litosfæren er flytende magma, mens astenosfæren er fast granitt.",
      "Litosfæren er det kalde, sprø ytterste skallet (skorpe + stiv mantel), mens astenosfæren er varm, fast peridotitt som oppfører seg duktilt og seigtflytende over millioner av år.",
      "Litosfæren finnes bare under kontinentene, mens astenosfæren er havbunn.",
      "Litosfæren og astenosfæren er identiske, men har ulik kjemisk sammensetning av silisium.",
    ],
    answer: 1,
    explain:
      "Riktig. Begge består av fast bergart, men litosfæren er kald og sprø (brekker i plater), mens astenosfæren er så varm (ca. 1300–1400 °C) at den deformeres plastisk og lar platene gli over seg.",
  },
  {
    prompt: "Hva er den viktigste drivkraften bak litosfæreplates bevegelse?",
    options: [
      "Tidevannskrefter fra månen som trekker kontinentene vestover.",
      "Platetrekk (slab pull): Kald og gammel havbunnsskorpe omdannes til tung eklogitt og synker under egen vekt i subduksjonssonen.",
      "Friksjonsdrag fra vinder i troposfæren som dytter på fjellkjedene.",
      "Sentrifugalkraft fra jordas rotasjon som kaster platene mot ekvator.",
    ],
    answer: 1,
    explain:
      "Riktig! Geodynamiske målinger viser at slab pull står for om lag 90 % av bevegelseskraften. Tetthetsøkningen ved faseovergang til eklogitt trekker hele platen etter seg.",
  },
  {
    prompt: "Hva er den grunnleggende forskjellen mellom dekompresjonssmelting og flukssmelting?",
    options: [
      "Dekompresjonssmelting skjer bare i kjernen, mens flukssmelting skjer i atmosfæren.",
      "Dekompresjonssmelting skjer ved trykkfall når varm mantel stiger (ved midthavsrygger), mens flukssmelting skjer når vann fra en subdusert plate senker smeltetemperaturen i mantelkilen.",
      "Dekompresjonssmelting krever ekstern oppvarming fra meteorittnedslag, mens flukssmelting skjer spontant i granitt.",
      "Det er ingen forskjell; begge prosessene krever at temperaturen stiger til over 5000 °C.",
    ],
    answer: 1,
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
    prompt: "Hvordan beviste Vine og Matthews havbunnsspredning i 1963?",
    options: [
      "Ved å finne fossiler av dinosaurer på havbunnen.",
      "Ved å oppdage symmetriske striper med normal og reversert magnetisering i havbunnsskorpen på hver side av midthavsryggen.",
      "Ved å måle tidevannsbølger over Den midtatlantiske rygg.",
      "Ved å bore helt ned til jordens flytende ytre kjerne.",
    ],
    answer: 1,
    explain:
      "Riktig! Da havbunnen spredte seg og størknet, frøs magnetittmineralene inn jordas vekslende magnetfelt som et gigantisk symmetrisk båndopptak.",
  },
  {
    prompt: "Hva oppstår når to oseaniske plater konvergerer (kolliderer)?",
    options: [
      "En enorm kontinental riftdal med ferskvannsinnsjøer.",
      "Den eldste og tetteste havbunnsplaten subduerer, og det dannes en dyphavsgrop og en vulkansk øybue (f.eks. Marianene eller Japan).",
      "Det dannes en passiv margin uten noen form for seismisk aktivitet.",
      "Begge platene smelter momentant og danner en ny kontinental kraton.",
    ],
    answer: 1,
    explain:
      "Riktig! Ved oseanisk-oseanisk konvergens vil den eldste, kaldeste og dermed tetteste litosfæreplaten presses ned i subduksjon. Resultatet er en dyp grop og en buet kjede av vulkanske øyer (øybue).",
  },
  {
    prompt: "Hvorfor begynner gammel havbunnsskorpe til slutt å subduere av seg selv i Wilsonsyklusen?",
    options: [
      "Fordi havvannet gjør skorpen magnetisk frastøtende.",
      "Fordi litosfæren avkjøles og tykner over titalls millioner år, slik at den til slutt blir tettere enn den underliggende astenosfæren.",
      "Fordi månen drar i sedimentene på havbunnen.",
      "Fordi midthavsryggene slutter å eksistere etter 10 millioner år.",
    ],
    answer: 1,
    explain:
      "Riktig! Mens litosfæren beveger seg bort fra midthavsryggen, avkjøles den fra toppen og underfra. Litosfæren tykner og tettheten øker. Etter ca. 20–30 millioner år er oseanisk litosfære tettere enn astenosfæren den hviler på, og blir ustabil overfor subduksjon.",
  },
  {
    prompt: "Hvordan virker drivkraften ryggskyv (ridge push)?",
    options: [
      "Magma presses ut som fra en sprøyte og dytter kontinentene sideveis.",
      "Det er en gravitasjonsglidning der den hevede, varme midthavsryggen (2–3 km over dyphavssletten) sklir nedover skråningen under egen vekt.",
      "Bølger på havoverflaten dytter mot vulkantoppene.",
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
      "En meteoritt traff øyene, og alderen øker ut fra krateret.",
      "Stillehavsplaten glir over en langvarig, varm sone (hotspot), så nye vulkaner dannes over hotspoten mens de gamle flyttes bort med platen.",
      "En hotspot oppstår bare langs subduksjonssoner når en plate brekker i to.",
      "Øyene blir eldre mot nordvest fordi jordens magnetfelt byttet polaritet.",
    ],
    answer: 1,
    explain:
      "Riktig! J. Tuzo Wilson (1963) beskrev en langvarig, varm sone under platen. Nye vulkaner dannes over hotspoten, og de eldre følger med platen mot nordvest. Kauai er ca. 5,5 millioner år. Big Island er yngre enn 0,7 millioner år og fortsatt aktiv (USGS, u.å.-d).",
  },
  {
    prompt:
      "Hvorfor er et utbrudd fra en ryolittisk stratovulkan mer eksplosivt enn et utbrudd fra en basaltisk skjoldvulkan på Hawaii?",
    options: [
      "Ryolittisk magma er mye varmere enn basaltisk magma, noe som skaper høyere damptrykk.",
      "Ryolittisk magma har høyt SiO₂-innhold. Silikattetraedrene kobles sammen i kjeder og nettverk, magmaen blir seig, og gassboblene slipper ikke ut.",
      "Basaltisk magma inneholder mer uran og thorium, som forhindrer gassdannelse.",
      "Hawaii har ingen magmakammer under overflaten, og lavaen presses ut av gravitasjonsbølger.",
    ],
    answer: 1,
    explain:
      "Riktig! Ryolittisk magma har mye SiO₂ (over 63 % i tabellen). Silikattetraedrene kobles sammen i kjeder og nettverk, og magmaen blir seig. Gassboblene slipper ikke ut, og utbruddet kan bli eksplosivt.",
  },
  {
    prompt:
      "Hvorfor forårsaket Eyjafjallajökull-utbruddet i 2010 en så omfattende flystans i hele Europa, til tross for at utbruddet bare var VEI 4?",
    options: [
      "Fordi utbruddet slynget ut radioaktiv lava som ødela satellittnavigasjonen.",
      "Fordi magmaen eksploderte i kontakt med smeltevann fra isbreen (freatomagmatisme) og dannet ekstremt finkornet silikatglassaske som smelter inne i varme jetmotorer.",
      "Fordi røyken fra vulkanen reagerte med ozonlaget og dannet kvelende giftgasser.",
      "Fordi flyselskapenes radarer ble blendet av lyset fra lavafontenene.",
    ],
    answer: 1,
    explain:
      "Riktig! Freatomagmatisme: Magmaens møte med isbreen knuste smelten i ørsmå, mikroskopiske glasskår som smelter ved 1100 °C inne i jetmotorers forbrenningskamre og forårsaker motorstans.",
  },
  {
    prompt:
      "Hva er den viktigste årsaken til at vulkaner på subduksjonssoner er mer eksplosive enn vulkaner på midthavsrygger?",
    options: [
      "Subduksjonssoner er nærmere jordens kjerne og har høyere temperatur.",
      "Vann fra den synkende platen senker smeltepunktet i mantelen over (flukssmelting). Magmaen her er oftere andesittisk eller ryolittisk, seigere og mer gassrik enn basalten ved midthavsrygger.",
      "Midthavsrygg-vulkaner har ingen magmakammer og kan ikke eksplodere.",
      "Subduksjonsvulkaner bruker kald havbunnsskorpe som drivstoff, noe som gir mer energi.",
    ],
    answer: 1,
    explain:
      "Riktig! Ved subduksjon senker vann fra den synkende platen smeltepunktet i mantelen (flukssmelting). Ved midthavsrygger smelter mantelen fordi trykket faller (dekompresjon). Subduksjonsvulkaner gir oftere andesittisk og ryolittisk magma. Den er seig og holder på gassen, så utbruddene blir eksplosive.",
  },
  {
    prompt: "Hva er 'vulkansk vinter', og hvilket historisk utbrudd forårsaket det tydeligste eksempelet?",
    options: [
      "En lokalt kald periode rundt en vulkan etter lavastrømmer — Kilauea på Hawaii 2018.",
      "En global nedkjøling forårsaket av svovelsyreaerosoler i stratosfæren etter store eksplosive utbrudd — tydeligst etter Tambora 1815, som skapte 'året uten sommer' i 1816.",
      "En flerårig nedbørsøkning i tropene etter kaldera-utbrudd.",
      "En regional vinter der askefallet blokkerer solstrålingen lokalt i opptil én uke.",
    ],
    answer: 1,
    explain:
      "Riktig! Etter Tambora i 1815 ble 1816 kalt «året uten sommer». Svovel i stratosfæren kan danne aerosoler som sprer sollys. Pinatubo i 1991 kjølte jordoverflaten i om lag tre år, med inntil ca. 0,7 °C på det meste (USGS, u.å.-c).",
  },
  {
    prompt: "Hva er en kaldera, og hva skiller den fra et vanlig vulkankrater?",
    options: [
      "En kaldera er et vanlig eksplosjonskrater i toppen av en vulkan.",
      "En kaldera er en stor innsynkning som oppstår når taket over et delvis tømt magmakammer synker inn.",
      "En kaldera er et underjordisk magmakammer under en skjoldvulkan.",
      "En kaldera er et lahar-fyllt dalstrøk etter et vulkanutbrudd.",
    ],
    answer: 1,
    explain:
      "Riktig! Et vulkankrater er åpningen over tilførselsrøret. En kaldera oppstår når taket over magmakammeret synker inn. Senkningen kan være flere kilometer bred.",
  },
  {
    prompt: "Hvorfor er Beerenberg på Jan Mayen klassifisert som stratovulkan til tross for basaltisk magma?",
    options: [
      "Fordi alle vulkaner over 2000 m o.h. kalles stratovulkaner.",
      "Fordi Jan Mayen ligger på en rift der magmaen er ryolittisk.",
      "Fordi utbruddsstilen veksler mellom strombolsk og hawaiisk, noe som over tid har bygd opp lagdelte avsettinger av lava og tefra til en klassisk kjegleform.",
      "Fordi Beerenberg aldri har hatt ekte lavastrømmer.",
    ],
    answer: 2,
    explain:
      "Riktig! Selv basaltisk magma kan danne stratovulkaner dersom utbruddene veksler mellom lavastrømmer og tefrafall. Beerenbergs lagdelte oppbygning, bratte flanker og isbrekledde topp er karakteristisk for denne vulkantypen (Norsk Polarinstitutt, u.å.).",
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
      "Se «P-bølger og S-bølger». S-bølger går bare gjennom fast stoff. De stopper i den flytende ytre kjernen, og det er derfor det blir en skyggesone.",
  },
  {
    prompt: "Hvorfor har Norge jordskjelv når landet ikke ligger på en plategrense?",
    options: [
      "Fordi Oslofeltet fortsatt er en aktiv rift.",
      "Fordi gamle forkastninger kan gli på nytt når spredning og landheving bygger spenning.",
      "Fordi alle skjelv i Norge kommer fra subduksjon under Vestlandet.",
    ],
    answer: 1,
    explain:
      "Se «Hvorfor skjelver Norge?». Norge ligger inne på Den eurasiske platen. Spenning fra havbunnsspredning og fra landheving etter siste istid kan reaktivere gamle brudd.",
  },
  {
    prompt: "Hva er forskjellen på en tsunami fra et undersjøisk skjelv og de historiske flodbølgene i Norge?",
    options: [
      "Begge kommer av at to plater kolliderer utenfor norskekysten.",
      "Et undersjøisk skjelv kan flytte havbunnen. Storegga og Tafjord var skred som traff vann.",
      "Norske flodbølger kommer bare fra vind, aldri fra masse som treffer vann.",
    ],
    answer: 1,
    explain:
      "Se «Tsunami: skjelv eller skred?». Store undersjøiske skjelv kan lage tsunami. Storegga og Tafjord var skred, ikke en plategrense som røyk.",
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
      "Se «Fare og risiko». Faren i bakken er den samme typen. Risikoen blir større når flere hus, veier og gamle murbygg ligger der bølgene treffer.",
  },
  {
    prompt: "Hvor sitter de store, ødeleggende jordskjelvene oftest?",
    options: [
      "Langs plategrenser, der spenning bygges opp mellom platene.",
      "Bare midt inne på platene, slik som i Oslo.",
      "Bare der en vulkan har utbrudd.",
    ],
    answer: 0,
    explain:
      "Se «Hvor skjer de store skjelvene?». De fleste skjelv, og de store, sitter der platene møtes. Norge har skjelv inne på platen, men de er sjeldnere og oftest mindre.",
  },
];

export const QUIZ_BERGARTER: QuizQuestion[] = [
  {
    prompt: "Hvorfor tester du Mohs på ett mineralkorn, ikke på hele bergarten?",
    options: [
      "En bergart er alltid like hard overalt, så ett tall holder.",
      "En bergart kan bestå av flere mineraler, og hvert korn har sin egen hardhet.",
      "Mohs-skalaen gjelder bare for kalkstein.",
    ],
    answer: 1,
    explain:
      "Se «Hvordan undersøker du et håndstykke?». Mohs er en skala for mineraler. Kvarts er 7 og feltspat er 6. Rip ett korn.",
  },
  {
    prompt: "Hvordan viser larvikitt og rombeporfyr forskjellen på dypbergart og dagbergart?",
    options: [
      "De kommer fra to ulike magmaer, dannet i hver sin tidsalder.",
      "Larvikitt størknet ferdig på dypet. Rombeporfyr har store feltspatkrystaller i en grunnmasse, fordi smelten nådde overflaten før den var ferdig krystallisert.",
      "Begge er sedimentære bergarter, kittet av kalk.",
    ],
    answer: 1,
    explain:
      "Se «Hva er magmatiske bergarter?». NGU kaller rombeporfyr tvillingbroren til larvikitt. Forskjellen er hvor smelten størknet.",
  },
  {
    prompt: "Hva er forskjellen på forvitring og erosjon?",
    options: [
      "Forvitring bryter ned berg på stedet. Erosjon er nedsliting pluss transport.",
      "Begge betyr at vann frakter sand til havet.",
      "Forvitring er transport. Erosjon er oppløsning på stedet.",
    ],
    answer: 0,
    explain:
      "Se «Hva er forvitring?». Ved forvitring blir fragmentene liggende. Først når vann, is eller tyngdekraft flytter dem, er det erosjon.",
  },
  {
    prompt: "Hvorfor viser gneis eldre enn 900 millioner år at en bergart ikke må gjennom hele syklusen?",
    options: [
      "Gneis må smelte før den kan bli så gammel.",
      "Gneis i grunnfjellet i Sør-Norge er fortsatt metamorf. Syklusen er en modell med flere veier.",
      "Alle bergarter blir sedimentære etter 900 millioner år.",
    ],
    answer: 1,
    explain:
      "Se «Hva er bergartssyklusen?». Gneis ble dannet for mer enn 900 millioner år siden og er fortsatt en metamorf bergart.",
  },
  {
    prompt: "I granittisk sand, hvilket mineral forsvinner først?",
    options: [
      "Kvarts, fordi det løses før de andre.",
      "Hornblende fortere enn plagioklas, og plagioklas fortere enn kalifeltspat. Kaolinitt og kvarts blir igjen.",
      "Kalifeltspat forsvinner før hornblende.",
    ],
    answer: 1,
    explain:
      "Se «Hva er forvitring?». White et al. (1996) fant denne rekkefølgen i granittisk sand. Resten er kaolinitt og kvarts.",
  },
];

export const QUIZ_VANN_OG_FLOM: QuizQuestion[] = [
  {
    prompt: "Hvor ligger grunnvannet i en akvifer?",
    options: [
      "I underjordiske elver.",
      "I porer i sand og grus, eller i sprekker i fjell.",
      "Bare i innsjøer over bakken.",
    ],
    answer: 1,
    explain:
      "Se «Hva er en akvifer?». Grunnvann fyller porer og sprekker. Det er ikke elver under bakken.",
  },
  {
    prompt: "Hvorfor har godt sortert grus og sand høyere permeabilitet enn silt og leire?",
    options: [
      "Grus og sand som er løst pakket og godt sortert, har store hulrom. Silt og leire er tett pakket og har lav permeabilitet.",
      "Leire har alltid høyere porøsitet enn sand.",
      "Permeabiliteten i løsmasser styres bare av sprekker i fjellet.",
    ],
    answer: 0,
    explain:
      "Se «Hva er en akvifer?». NGU beskriver sortering og pakking som det som styrer permeabiliteten i løsmasser.",
  },
  {
    prompt: "Hva skiller en regnflom fra en snøsmelteflom?",
    options: [
      "Regnflom skyldes bare regn, og er ofte de største flommene på Sørlandet og Vestlandet. Snøsmelteflom skyldes snøsmelting alene, og er de største vårflommene i store vassdrag i Finnmark.",
      "Begge skyldes bare regn på asfalt.",
      "Snøsmelteflom er flom som bare kommer av tidevann.",
    ],
    answer: 0,
    explain: "Se «Hva er en flom?». Skillet står i ordlisten til Varsom.",
  },
  {
    prompt: "Hva viser et hydrogram?",
    options: [
      "Vannføring mot tid. Figuren sammenligner en spiss regnflom med en bred snøsmelteflom.",
      "Hvor dypt grunnvannsspeilet ligger i fjell.",
      "Hvor mange millimeter som falt på Geilo i 1938.",
    ],
    answer: 0,
    explain:
      "Se «Hva er et hydrogram?». Vannføring er volum per tidsenhet. Hydrogrammet er den kurven mot tid.",
  },
  {
    prompt: "Hva kan du si om elva i en tørkeperiode?",
    options: [
      "Elvene kan bestå av 40–100 prosent grunnvann.",
      "Elva får alt vannet fra havet.",
      "Grunnvannet slutter å bidra så snart det slutter å regne.",
    ],
    answer: 0,
    explain:
      "Se «Hva er en akvifer?». NGU skriver at elvene i en tørkeperiode med lav vannføring kan bestå av 40–100 prosent grunnvann.",
  },
];

export const QUIZ_SKRED: QuizQuestion[] = [
  {
    prompt: "Hva skjer når kvikkleire blir overbelastet?",
    options: [
      "Korthusstrukturen kollapser, og leira blir flytende.",
      "All marin leire er allerede flytende fra den ble avsatt.",
      "Leira blir fastere fordi saltinnholdet øker.",
    ],
    answer: 0,
    explain:
      "Se «Hva er kvikkleire?». Overbelastning får strukturen til å kollapse. I omrørt tilstand er leira flytende.",
  },
  {
    prompt: "Hvordan kan saltet i marin leire forsvinne?",
    options: [
      "Ferskt grunnvann vasker det ut over mange hundre til flere tusen år. Under 2 gram salt per liter kan bindingene svekkes.",
      "All marin leire er kvikk allerede da den ble avsatt i sjøen.",
      "Saltet forsvinner så snart det har regnet én dag.",
    ],
    answer: 0,
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
      "Et skred kan gi store flodbølger i Storfjordområdet, og overvåkingen skal gi tid til å varsle.",
      "Åknes er et jordskred som går i en elv hvert år.",
      "Grønt jordskredvarsel dekker også fjellskred fra Åknes.",
    ],
    answer: 0,
    explain:
      "Se «Hva er et fjellskred?». Åknes overvåkes kontinuerlig fordi et skred kan gi flodbølger, og varselet skal komme i tide.",
  },
  {
    prompt: "Hva sier et grønt jordskredvarsel om steinsprang og kvikkleire?",
    options: [
      "De inngår ikke i jordskredvarslingen. Grønt nivå sier ikke at de er trygge.",
      "Grønt nivå betyr at steinsprang og kvikkleire er avblåst.",
      "Varselet gjelder bare kvikkleire.",
    ],
    answer: 0,
    explain:
      "Se «Hvordan kan vi forebygge og tilpasse oss?». Jordskredvarselet gjelder jordskred, sørpeskred og flomskred. Steinsprang og kvikkleireskred inngår ikke.",
  },
];

export const QUIZ_GEOLOGISKE_RESSURSER: QuizQuestion[] = [
  {
    prompt: "Hva må til for at en bergart kalles malm?",
    options: [
      "Den inneholder mineraler eller grunnstoffer i økonomisk drivverdige mengder.",
      "Den inneholder et hvilket som helst spor av metall.",
      "Den er knust til pukk.",
    ],
    answer: 0,
    explain:
      "Se «Hvordan dannes malm?». Malm er en bergart med mineraler eller grunnstoffer i økonomisk drivverdige mengder.",
  },
  {
    prompt: "Hvilke metallmalmer er det hovedsakelig drift på i Norge i dag?",
    options: [
      "Ilmenitt i Sokndal og hematitt i Rana.",
      "Kobber i Røros og Løkken.",
      "Sølv på Kongsberg.",
    ],
    answer: 0,
    explain:
      "Se «Hva utvinnes i Norge i dag?». I dag er det hovedsakelig drift på ilmenitt i Sokndal og hematitt i Rana.",
  },
  {
    prompt: "Hvorfor prioriterer NGU kartlegging av kritiske og strategiske mineraler?",
    options: [
      "Behovet for mineraler og metaller øker, og kartleggingen skal tjene både næring og forvaltning.",
      "Fordi all malm i Norge allerede er drevet ut.",
      "Fordi pukk ikke kan brukes i vei.",
    ],
    answer: 0,
    explain:
      "Se «Hva er en geologisk ressurs?». Behovet øker, og NGU kartlegger både for næringsutvikling og for miljø-, natur- og ressursforvaltning.",
  },
  {
    prompt: "Hva sier NGU om kobberutvinning i Norge i 2024?",
    options: [
      "Det er ingen utvinning. Drift planlegges på Nussir i Finnmark.",
      "Kobber utvinnes i Sokndal sammen med ilmenitt.",
      "Nussir ble lagt ned i 2002.",
    ],
    answer: 0,
    explain:
      "Se «Hva utvinnes i Norge i dag?». Oppdateringen i 2024 sier at det ikke er kobberutvinning. Drift planlegges på Nussir.",
  },
  {
    prompt: "Hvor tar vi hvordan grunnvann lagres og strømmer?",
    options: [
      "I kapittelet Vann og flom. Her nevnes grunnvann bare som en ressurs.",
      "I dette kapittelet, som en del av malmdannelsen.",
      "Grunnvann er ikke en geologisk ressurs.",
    ],
    answer: 0,
    explain:
      "Se «Hva er en geologisk ressurs?». Grunnvann er en geologisk ressurs. Lagring og strømning tas i Vann og flom.",
  },
];

export const QUIZ_FELTARBEID: QuizQuestion[] = [
  {
    prompt: "Hva er feltarbeid?",
    options: [
      "Innsamling av data i en undersøkelse. I geologi kan det være steinprøver.",
      "En tur der klassen bare ser på landskapet.",
      "Et begrep som bare brukes i samfunnsfag.",
    ],
    answer: 0,
    explain:
      "Se «Hva er geofaglig feltarbeid?». Feltarbeid er innsamling av data. I geologi kan det være steinprøver.",
  },
  {
    prompt: "Hvilke deler av jordsystemet gjelder feltarbeidet i geofag 1?",
    options: [
      "Geosfæren eller hydrosfæren.",
      "Bare atmosfæren.",
      "Bare kryosfæren.",
    ],
    answer: 0,
    explain:
      "Se «Hva er geofaglig feltarbeid?». Feltarbeidet er knyttet til geosfæren eller hydrosfæren.",
  },
  {
    prompt: "Hva skal du gjøre med dataene etter at de er samlet inn?",
    options: [
      "Bearbeide og tolke dem.",
      "Kaste dem når prøvene er merket.",
      "La dem ligge uten å knytte dem til spørsmålet.",
    ],
    answer: 0,
    explain:
      "Se «Hvordan bearbeider og tolker vi?». De innsamlede dataene skal bearbeides og tolkes.",
  },
  {
    prompt: "Hva skal lokale observasjoner kunne si noe om?",
    options: [
      "Områdets geologiske historie og betydningen for lokale ressurser.",
      "Bare hvor langt det er til nærmeste vei.",
      "Bare navnet på kommunen.",
    ],
    answer: 0,
    explain:
      "Se «Hva kan observasjonene svare på?». Observasjonene tolkes for å beskrive historien og betydningen for lokale ressurser.",
  },
  {
    prompt: "Hva skal presentasjonen av feltarbeidet gjøre mulig?",
    options: [
      "Å se hvilke data som ble samlet inn, og hvordan de ble tolket.",
      "Å erstatte dataene med et inntrykk fra turen.",
      "Å sløyfe tolkningen når prøvene er tatt.",
    ],
    answer: 0,
    explain:
      "Se «Hvordan presenterer vi resultatene?». Presentasjonen skal vise dataene og tolkningen.",
  },
];

export const QUIZ_LOKALE: QuizQuestion[] = [
  {
    prompt: "Hva setter i gang sjøbris om dagen?",
    options: [
      "Land varmes raskere enn hav, varm luft stiger, og kjøligere luft fra sjøen strømmer inn.",
      "Havet varmes raskere enn land, så lufta synker over sjøen og presser vinden ut.",
      "Jordrotasjonen starter vinden av seg selv, uten temperaturforskjell.",
    ],
    answer: 0,
    explain:
      "Sjøbris er pålandsvind fordi varm luft stiger over land og erstattes av kjøligere luft fra havet. Se «Solgangsvind».",
  },
  {
    prompt: "Hvorfor dreier solgangsvinden langs norskekysten ofte fra pålandsvind til vind langs kysten?",
    options: [
      "Vinden følger tidevannet inn og ut av fjorden.",
      "Jordrotasjonen bøyer vinden av mot høyre på den nordlige halvkule.",
      "Havet blir mye kaldere utover ettermiddagen, så vinden må snu.",
    ],
    answer: 1,
    explain:
      "På den nordlige halvkule dreier sjøbrisen mot høyre, fra pålandsvind til vind langs kysten. I en fjord kan den likevel fortsette rett inn. Se «Solgangsvind».",
  },
  {
    prompt: "Hva sier leksikonet om hvorfor fønvind er varm?",
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
      "Temperaturen stiger med høyden. Varmere luft over virker som et lokk, og lokale utslipp samler seg nær bakken.",
      "Temperaturen faller raskere enn vanlig, så røyken stiger høyere og forsvinner.",
      "Inversjon er et lavtrykk som roterer over byen og suger til seg all røyken.",
    ],
    answer: 0,
    explain:
      "I en inversjon er det kaldere nær bakken enn høyere oppe. Lufta nede blandes dårlig, og utslipp kan hope seg opp. Se «Temperaturinversjon».",
  },
  {
    prompt: "Hva skjer når en polarfrontsyklon blir moden, ifølge den norske syklonmodellen?",
    options: [
      "Kaldfronten tar igjen varmfronten, og det dannes en okkludert front.",
      "Varmfronten tar igjen kaldfronten, og lavtrykket forsvinner med en gang.",
      "Fronten blir liggende i ro, og nedbøren slutter.",
    ],
    answer: 0,
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
      "Fordi den drives av friksjon mellom de to andre cellene, ikke av varmekontrasten mellom ekvator og pol.",
      "Fordi den frakter kulde fra ekvator mot polene.",
    ],
    answer: 1,
    explain:
      "NOAA beskriver vestavinden mellom 35° og 60° som drevet av friksjon, ikke av varmekontrasten mellom ekvator og polene.",
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
    prompt: "Hva er forskjellen på en fjord og en U-dal som Gudbrandsdalen?",
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
      "Geosfæren og hydrosfæren. Atmosfæren, kryosfæren og biosfæren er med som drivere.",
      "Alle fem sfærene er mottakere, og ingen er drivere.",
      "Bare atmosfæren, fordi regn og CO₂ kommer derfra.",
    ],
    answer: 0,
    explain:
      "Se «Hva er et jordsystem?». I geofag 1 følger du hvordan berg og ferskvann svarer. Atmosfæren, kryosfæren og biosfæren er med fordi de driver endringen.",
  },
  {
    prompt: "Hvorfor kan et stort eksplosivt utbrudd kjøle jorda i noen år?",
    options: [
      "Fordi asken blir liggende i stratosfæren i mange år og stenger sola ute.",
      "Fordi SO₂ i stratosfæren blir til sulfataerosoler som reflekterer sollys.",
      "Fordi lavaen tar varme fra lufta når den størkner.",
    ],
    answer: 1,
    explain:
      "Se «Vulkaner på kort sikt». Aske faller ut i løpet av dager til uker. Det er sulfataerosolene fra SO₂ som kan kjøle troposfæren i noen år, som etter Pinatubo i 1991.",
  },
  {
    prompt: "Hva skiller det raske karbonkretsløpet fra det trege?",
    options: [
      "I det raske kommer karbonet tilbake når planter og plankton brytes ned. I det trege bruker karbon 100–200 millioner år.",
      "Begge kretsløpene tar noen år.",
      "Det trege går bare gjennom livet, det raske bare gjennom vulkaner.",
    ],
    answer: 0,
    explain:
      "Se «Karbonat–silikat-syklusen». Det raske kretsløpet går gjennom livet og gir karbonet tilbake når organismene brytes ned. Det trege går mellom berg, jord, hav og atmosfære og tar 100–200 millioner år.",
  },
  {
    prompt: "Hva skjer i den trege karbonsløyfen når CO₂ i atmosfæren stiger?",
    options: [
      "Det blir varmere og mer regn, mer berg løses, og mer karbon lagres i kalkstein.",
      "Sløyfen stopper, så CO₂ blir værende i lufta for alltid.",
      "Karbonet lagres i kalkstein i løpet av noen år, samme klokke som et vulkanutbrudd.",
    ],
    answer: 0,
    explain:
      "Se «Karbonat–silikat-syklusen». Mer CO₂ gir høyere temperatur og mer regn. Da løses mer berg, og mer karbon avsettes på havbunnen. Det demper endringen, men det tar noen hundre tusen år.",
  },
  {
    prompt: "Hvorfor er Pinatubo-kjøling og den trege karbonsløyfen ikke samme vulkan–klima?",
    options: [
      "Begge virker på samme tidsskala, noen år.",
      "Pinatubo-kjølingen varte i år. Den trege sløyfen bruker noen hundre tusen år.",
      "Den trege sløyfen kjøler jorda i tre år, akkurat som SO₂.",
    ],
    answer: 1,
    explain:
      "Se «Hvilken tidsskala?». SO₂ fra et stort utbrudd virker i år. Karbonat–silikat-syklusen er den trege sløyfen, fra noen hundre tusen år til 100–200 millioner år.",
  },
];

export const QUIZ_CORIOLIS: QuizQuestion[] = [
  {
    prompt: "Hva er corioliseffekten?",
    options: [
      "Avbøyningen vi ser fordi jorda roterer under en bevegelse som ellers går rett fram.",
      "En reell kraft som setter lufta i gang fra høytrykk mot lavtrykk.",
      "Månens drag, som styrer tidevannet.",
    ],
    answer: 0,
    explain:
      "Se «Hva er corioliseffekten?». Avbøyningen kommer av rotasjonen, ikke av en reell kraft som dytter på lufta.",
  },
  {
    prompt: "Hvor er den horisontale avbøyningen null?",
    options: [
      "Ved ekvator, der coriolisparameteren er null.",
      "Ved 60°, omtrent Oslo og Bergen, der farten østover er minst.",
      "Ved Nordpolen, der bakken står stille.",
    ],
    answer: 0,
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
      "20–40°, fordi friksjonen er større enn over havet.",
      "Alltid 0°, parallelt med isobarene.",
      "Alltid 90°, rett inn mot lavtrykket.",
    ],
    answer: 0,
    explain:
      "Se «Vind, isobarer og friksjon». Over havet er vinkelen 0–20°, over land 20–40°.",
  },
  {
    prompt: "Hva skjer ved langvarig nordavind langs en vestkyst på den nordlige halvkule?",
    options: [
      "Ekmantransporten skyver overflaten utover, og dypere vann kommer opp.",
      "Overflatevannet presses inn mot land og synker.",
      "Corioliseffekten er null langs alle vestkyster, så ingenting skjer.",
    ],
    answer: 0,
    explain:
      "Se «Havet: ekmantransport og oppvelling». På den nordlige halvkule går ekmantransporten til høyre for vinden.",
  },
];
