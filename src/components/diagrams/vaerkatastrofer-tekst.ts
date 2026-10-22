/**
 * Tekstene til stegfigurene i kapitlet Værkatastrofer (Geofag 2), bolk 1 (A, E, H, D, I i figurplanen).
 * Bare tall med kilde: 26,5 °C og om lag 50 m (NOAA AOML, u.å.-b), 1 cm per hPa (SNL, u.å.-c),
 * 200–500 km og november–april (MET, u.å.; SNL, u.å.-g). Alt annet er relativt.
 */
export const ORKAN_SNITT_TEKST = {
  heading: "Orkanen i snitt: inn, opp, ut og ned",
  title:
    "Snitt gjennom en orkan med havet nederst og tropopausen øverst, høyden sterkt overdrevet. Steg 1: fuktig luft strømmer inn langs havflaten mot sentrum. Havet må være minst 26,5 °C ned til om lag 50 meters dyp. Steg 2: i øyeveggen stiger lufta i høye bygeskyer, og vanndampen kondenserer og frigjør latent varme. Steg 3: i høyden strømmer lufta ut fra sentrum. Steg 4: i øyet synker lufta sakte, blir presset sammen og varmes opp, så øyet er nesten skyfritt. Kurvene under viser at trykket er lavest i øyet, og at vinden er sterkest i øyeveggen.",
  caption:
    "Orkanen henter energi fra varmt hav (minst 26,5 °C ned til om lag 50 m). Lufta strømmer inn ved havflaten, stiger i øyeveggen der latent varme frigjøres, og strømmer ut i høyden. I øyet synker lufta sakte og varmes opp. Trykket er lavest i øyet, og vinden er sterkest i øyeveggen (NOAA AOML, u.å.-a; u.å.-b). Skjematisk, høyden er sterkt overdrevet.",
};
export const ORKAN_SNITT_STATUS = [
  "Fuktig luft strømmer inn langs havflaten mot sentrum. Havet gir varme og vanndamp.",
  "I øyeveggen stiger lufta. Vanndampen kondenserer i høye bygeskyer og frigjør latent varme.",
  "Høyt oppe strømmer lufta ut fra sentrum, nær tropopausen.",
  "I øyet synker lufta sakte og varmes opp. Trykket er lavest i øyet, vinden sterkest i øyeveggen.",
];

export const STORMFLO_TEKST = {
  heading: "Stormflo: fire bidrag til høy vannstand ved kaia",
  title:
    "Kai sett fra siden med en søyle som viser bidragene til vannstanden. Steg 1: høyvann ved springflo løfter havet. Steg 2: lavt lufttrykk løfter havet om lag én centimeter per hektopascal. Steg 3: pålandsvind stuer vann mot kysten, og dette bidraget er vanligvis større enn lufttrykket. Steg 4: bølgene kommer på toppen. Knappen «Sønnavind på Vestlandet» viser et kart: ved sønnavind dreies transporten i de øverste vannlagene til høyre for vinden, mot kysten, og vann stues opp.",
  caption:
    "Stormflo er summen av flere bidrag: tidevann (verst ved springflo), lavt lufttrykk (om lag 1 cm per hPa), vind som stuer vann mot land, og bølger på toppen. Vinden betyr vanligvis mer enn lufttrykket. Ved sønnavind dreies transporten til høyre, mot Vestlandskysten (Store norske leksikon, u.å.-c). Aktuell og varslet vannstand finnes hos Kartverket (u.å.). Skjematisk, ikke i skala.",
};
export const STORMFLO_STATUS = [
  "Tidevannet løfter havet. Ved springflo blir høyvannet ekstra høyt.",
  "Lavt lufttrykk løfter havflaten om lag én centimeter per hektopascal.",
  "Pålandsvind stuer vann opp mot kysten. Det betyr vanligvis mer enn lufttrykket.",
  "Stormbølgene kommer på toppen av den høye vannstanden og slår inn over kaia.",
];
export const STORMFLO_BRYTER_STATUS =
  "Sønnavind på Vestlandet: transporten i de øverste vannlagene dreies til høyre for vinden, inn mot kysten, og vann stues opp.";

export const POLART_LAVTRYKK_TEKST = {
  heading: "Slik dannes et polart lavtrykk",
  title:
    "Snitt fra iskanten i nord ut over åpent hav. Steg 1: kald luft fra isen strømmer ut over varmere hav, et kaldluftsutbrudd. Steg 2: havet gir varme og fuktighet til lufta, som stiger og danner bygeskyer. Skyene blir høyere jo lenger ut over havet lufta kommer. Steg 3: bygene samler seg, lufta strømmer inn mot bygesenteret, og et lavtrykk dannes under det. Steg 4: sett ovenfra er lavtrykket en liten virvel som roterer mot klokka, med diameter oftest 200–500 kilometer.",
  caption:
    "Når kald luft fra isen strømmer ut over varmere hav, får den varme og fuktighet nedenfra, stiger og danner bygeskyer. Blir bygene kraftige nok, dannes et lite lavtrykk under bygesenteret. Polare lavtrykk har oftest diameter 200–500 km og kommer mest fra november til april (Meteorologisk institutt, u.å.; Store norske leksikon, u.å.-g). Skjematisk, nordlige halvkule.",
};
export const POLART_LAVTRYKK_STATUS = [
  "Kaldluftsutbrudd: svært kald luft fra isen strømmer ut over havet, som er mye varmere.",
  "Havet varmer og fukter lufta nedenfra. Lufta blir ustabil, stiger og danner bygeskyer.",
  "Bygene samler seg. Lufta strømmer inn mot bygesenteret, og et lavtrykk dannes under det.",
  "Sett ovenfra: en liten, kraftig virvel som roterer mot klokka, med sterk vind og tett snøbyger.",
];

export const TORNADO_TEKST = {
  heading: "Fra vindskjæring til roterende tordenvær",
  title:
    "Tegning av lufta foran et tordenvær. Steg 1: vinden blåser svakt ved bakken og sterkere i høyden, og den skifter retning. Denne vindskjæringen får et rør av luft til å rulle om en vannrett akse. Steg 2: den stigende lufta i tordenværet vipper rullen opp, slik at den roterer om en loddrett akse. Det gir én søyle som roterer mot klokka og én som roterer med klokka. Steg 3: vindskjæringen forsterker søylen som roterer mot klokka. Oppdriften strekker søylen og gjør den smalere, så den roterer raskere. Den roterende oppdriften kalles en mesosyklon. Under den kan det dannes en tornado, men hvordan det skjer, er ikke fullt forstått.",
  caption:
    "Vindskjæring, vind som endrer fart og retning med høyden, gir et rør av luft som ruller. Oppdriften i tordenværet vipper rullen opp og strekker den, og tordenværet får en roterende oppdrift, en mesosyklon (NOAA, u.å.; NSSL, u.å.-b). Hvordan selve tornadoen dannes under mesosyklonen, er ikke fullt forstått (NSSL, u.å.-a). Skjematisk, nordlige halvkule.",
};
export const TORNADO_STATUS = [
  "Vindskjæring: vinden er svak ved bakken og sterkere i høyden. Et rør av luft begynner å rulle om en vannrett akse.",
  "Oppdriften vipper rullen opp. Nå roterer lufta om en loddrett akse: én søyle mot klokka, én med klokka.",
  "Søylen som roterer mot klokka, forsterkes og strekkes. Den blir smalere og roterer raskere: en mesosyklon.",
];

export const KLIMA_FORDELING_TEKST = {
  heading: "Når hele fordelingen flytter seg",
  title:
    "Klokkeformet kurve over hvor ofte ulike temperaturer forekommer, med kaldt til venstre og varmt til høyre. Steg 1: dagens klima, med en grense for ekstrem varme til høyre og ekstrem kulde til venstre. Steg 2: kurven flytter seg mot varmere temperaturer. Steg 3: arealet over grensen for ekstrem varme vokser mye, mens arealet for ekstrem kulde krymper. Steg 4: noen hendelser blir varmere enn noe vi har opplevd før.",
  caption:
    "Når hele temperaturfordelingen flytter seg mot varmere verdier, blir varme ekstremer mye vanligere og kalde ekstremer sjeldnere. Noen ekstremer blir større enn noe vi har opplevd før (IPCC, 2021). Skjematisk og uten tall: hvor mye kurven flytter seg, varierer mellom steder.",
};
export const KLIMA_FORDELING_STATUS = [
  "Dagens klima: de fleste dagene ligger nær midten. Ekstremene ligger i halene.",
  "Oppvarming flytter hele fordelingen mot varmere temperaturer.",
  "Arealet over grensen for ekstrem varme vokser mye. Arealet for ekstrem kulde krymper.",
  "Noen hendelser blir varmere enn noe som er målt før: ekstremer uten sidestykke.",
];

/* ---------- bolk 2 (C, F, G, J, K i figurplanen) ---------- */

export const SUPERCELLE_TEKST = {
  heading: "Supercellen sett ovenfra: fra vindskjæring til tornado",
  title:
    "Supercelle sett ovenfra, med nord opp. Steg 1: vinden dreier og øker med høyden, og varm, fuktig luft strømmer inn mot skyen. Steg 2: den skrå, roterende oppdriften kalles mesosyklon. Steg 3: framre nedsynk (FFD) er det regnkjølte området med mest nedbør nedstrøms for oppdriften. Bakre nedsynk (RFD) er tørrere og varmere og lager en klar glipe som en hestesko rundt oppdriften. Steg 4: veggskya under den sterkeste oppdriften er stedet der tornadoer oftest dannes, mest sannsynlig på nordsiden av hesteskoen.",
  caption:
    "En supercelle er en langlivet bygesky med en skrå, roterende oppdrift, en mesosyklon. Rotasjonen kan finnes 20–60 minutter før en tornado dannes (National Severe Storms Laboratory [NSSL], u.å.-c). Framre nedsynk (FFD) er regnkjølt og har mest nedbør. Bakre nedsynk (RFD) er tørrere og varmere. Tornadoer dannes oftest ved veggskya, på nordsiden av den hesteskoformede glipa (National Weather Service [NWS], u.å.-b). Skjematisk, ikke i skala.",
};
export const SUPERCELLE_STATUS = [
  "Vinden dreier og blir sterkere med høyden. Varm, fuktig luft strømmer inn mot skyen nær bakken.",
  "Oppdriften blir skrå og begynner å rotere. Den roterende oppdriften kalles en mesosyklon.",
  "Framre nedsynk (FFD) gir regnkjølt luft og mest nedbør. Bakre nedsynk (RFD) er tørrere og varmere og lager en glipe som en hestesko.",
  "Under den sterkeste oppdriften henger veggskya. Der dannes tornadoer oftest, særlig på nordsiden av hesteskoen.",
];

export const BOMBE_TEKST = {
  heading: "Bombesyklonen: et døgn med rask utdyping",
  title:
    "Værkart over 24 timer med nord opp. Steg 1: kald og varm luft møtes langs en front, og et svakt lavtrykk dannes. Steg 2: en jetstrøm ligger høyt over, og lavtrykket ligger under venstre utgang av det sterkeste vindfeltet. Der sprer lufta seg i høyden, og lufta under stiger. Steg 3: trykket i sentrum faller, og isobarene kommer tettere. Steg 4: etter 24 timer har trykket ved 60 grader nord falt minst 24 hektopascal. Da kalles lavtrykket en bombesyklon.",
  caption:
    "Ved 60° N må trykket i sentrum falle minst 24 hPa på 24 timer for at lavtrykket skal kalles en bombesyklon. Kravet er større nær polene og mindre lenger sør (Store norske leksikon, u.å.-e). I venstre utgang av det sterkeste vindfeltet i jetstrømmen sprer lufta seg i høyden, og det gir stigende luft under (National Weather Service [NWS], u.å.-c). Tettere isobarer betyr sterkere vind. Skjematisk, ikke i skala.",
};
export const BOMBE_STATUS = [
  "Kald og varm luft møtes langs en front. Et svakt lavtrykk begynner å dannes.",
  "Jetstrømmen ligger høyt over. I venstre utgang av det sterkeste vindfeltet sprer lufta seg i høyden, og lufta under stiger.",
  "Trykket i sentrum faller raskt. Isobarene kommer tettere, og vinden blir sterkere.",
  "Etter 24 timer har trykket falt minst 24 hPa (ved 60° N). Lavtrykket er en bombesyklon.",
];

export const ELV_TEKST = {
  heading: "Atmosfærisk elv: fuktig luft fra sør møter fjellene",
  title:
    "Øverst et lite kart med et fuktbånd fra subtropene til Vestlandet, under et snitt fra havet inn over fjellene. Steg 1: et langt, smalt bånd med varm og fuktig luft blir fraktet nordover. Steg 2: ved kysten tvinges lufta opp over fjellene og avkjøles. Steg 3: vanndampen kondenserer, og det blir orografisk nedbør. Lufta er så varm at det regner helt til fjells. Steg 4: mye regn over lang tid gir flom i elvene og fare for skred.",
  caption:
    "En atmosfærisk elv er typisk om lag 2000 km lang og 300–500 km bred. Den frakter tropisk, fuktig luft mot Norge. Når lufta presses opp over fjellene, blir den avkjølt, og vanndampen blir til regn. Det kalles orografisk nedbør. Lufta er så varm at nedbøren ofte faller som regn helt til fjells (Store norske leksikon, u.å.-f). I midten av desember 2023 traff en atmosfærisk elv Vestlandet og ga flom og skred (Norges vassdrags- og energidirektorat [NVE], 2024). Skjematisk, ikke i skala.",
};
export const ELV_STATUS = [
  "Et langt, smalt bånd med varm og fuktig luft føres fra subtropene mot Norge.",
  "Ved kysten tvinges lufta opp over fjellene. Den avkjøles når den stiger.",
  "Vanndampen kondenserer til skyer og regn: orografisk nedbør. Det regner helt til fjells.",
  "Regn over lang tid fyller bekker og elver. Det kan gi flom og skred.",
];

export const HANS_TEKST = {
  heading: "Hans 2023: fra regnvarsel til flom og skred",
  title:
    "En kjede av fire felt fra venstre mot høyre. Steg 1: Meteorologisk institutt varslet ekstremt mye regn på rødt nivå. Steg 2: NVE oppgraderte farevarselet for flom, jord- og flomskred fra oransje til rødt nivå. Steg 3: bratte skråninger og bekker reagerte raskt, og det gikk over 750 løsmasseskred. Steg 4: i de store vassdragene varte flommen lenge. Flomtoppen i Drammenselva kom først 30. august.",
  caption:
    "Under ekstremværet Hans i august 2023 varslet Meteorologisk institutt ekstremt mye regn på rødt nivå, og NVE oppgraderte varselet for flom, jord- og flomskred fra oransje til rødt (Norges vassdrags- og energidirektorat [NVE], 2023). Det kom over 100 mm på to–tre dager over store områder. Det utløste over 750 løsmasseskred, og flomtoppen i Drammenselva kom først 30. august (NVE, 2024). Bekker og skråninger reagerer fort, store elver sent.",
};
export const HANS_STATUS = [
  "Meteorologisk institutt varslet ekstremt mye regn på rødt nivå, det høyeste nivået.",
  "NVE oppgraderte farevarselet for flom, jord- og flomskred fra oransje til rødt nivå.",
  "Bekker og bratte skråninger reagerte raskt. Det gikk over 750 løsmasseskred.",
  "Store vassdrag reagerte sakte. Flomtoppen i Drammenselva kom først 30. august.",
];

export const BEAUFORT_TEKST = {
  heading: "Fra storm til orkan på Beauforts skala",
  title:
    "En trapp med fire trinn i Beauforts skala, der høyden viser middelvinden i meter per sekund. Steg 1: liten storm, 20,8–24,4 m/s. Steg 2: full storm, 24,5–28,4 m/s. Steg 3: sterk storm, 28,5–32,6 m/s. Steg 4: orkan, over 32,6 m/s. Norske tall er middelvind over ti minutter. Steg 5: en tropisk orkan i kategori 1 på Saffir-Simpson-skalaen starter ved om lag 33 m/s, men da er vinden middel over ett minutt. Tallene kan derfor ikke sammenlignes direkte.",
  caption:
    "Beauforts skala: liten storm 20,8–24,4 m/s, full storm 24,5–28,4 m/s, sterk storm 28,5–32,6 m/s og orkan over 32,6 m/s, målt som middelvind over ti minutter (Store norske leksikon, u.å.-h). Kategori 1 på Saffir-Simpson-skalaen er 64–82 knop, om lag 33–42 m/s, målt som høyeste middelvind over ett minutt (National Hurricane Center [NHC], 2021; u.å.-b). Fordi middelet tas over ulik tid, kan tallene ikke sammenlignes direkte.",
};
export const BEAUFORT_STATUS = [
  "Liten storm (styrke 9): 20,8–24,4 m/s. Store trær svaier, og takstein kan blåse ned.",
  "Full storm (styrke 10): 24,5–28,4 m/s. Trær kan rykkes opp med roten, og hus får store skader.",
  "Sterk storm (styrke 11): 28,5–32,6 m/s. Svært sjelden, med store ødeleggelser.",
  "Orkan (styrke 12): over 32,6 m/s. Ytterst sjelden, med uvanlig store ødeleggelser.",
  "Tropisk orkan, kategori 1: om lag 33–42 m/s, men målt over ett minutt. Ikke direkte sammenlignbart med timinutters middelvind.",
];
