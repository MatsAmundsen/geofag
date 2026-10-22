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
