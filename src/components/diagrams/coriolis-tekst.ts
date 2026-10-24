/**
 * Tekstene til Coriolis-figurene (Geofag 2). Deles med plassholderne, så serveren ikke trenger figurmodulen.
 * Alt bygger på coriolis.md og fagsjekken til Fagredaktør Geo (18.10.2026): Store norske leksikon (u.å.-a; u.å.-b;
 * u.å.-c; u.å.-d; u.å.-e), NOAA (u.å.-a; u.å.-b; u.å.-c; u.å.-d), NOAA AOML (u.å.) og Stewart (2008).
 * Husstil: «mot klokken» og «med klokken» (Mats, 18.10).
 */
export const KARUSELL_TEKST = {
  heading: "Karusellen: ballen går rett, men ståstedet roterer",
  title:
    "To karuseller sett ovenfra som roterer mot klokken. Til venstre sett utenfra, uten rotasjon: ballen går i en rett linje fra kasteren mot vennen på kanten, mens vennen roterer videre. Til høyre det samme sett fra karusellen: ballen ser ut til å krumme mot høyre. Ingen skyver på ballen, det er ståstedet som roterer.",
  caption:
    "En bevegelse som er rettlinjet i et koordinatsystem i ro, blir avbøyd hvis koordinatsystemet roterer. Sett fra den roterende jorda beskrives avbøyningen med en fiktiv kraft, corioliskraften (Store norske leksikon, u.å.-a). Skjematisk.",
};

export const AVBOYNING_TEKST = {
  heading: "Mot høyre i nord, mot venstre i sør",
  title:
    "Jorda sett fra siden med ekvator i midten. På den nordlige halvkule bøyes bevegelser mot nord, øst, sør og vest av til høyre for bevegelsen. På den sørlige halvkule bøyes de av til venstre. Ved ekvator er det ingen avbøyning.",
  caption:
    "Store luftstrømmer og havstrømmer dreier mot høyre på den nordlige halvkule og mot venstre på den sørlige (Store norske leksikon, u.å.-a). Avbøyningen gjelder alle retninger, og ved ekvator er den null (Store norske leksikon, u.å.-b). Skjematisk.",
};

export const FART_OSTOVER_TEKST = {
  heading: "Bakken går fortere østover ved ekvator enn nær polen",
  title:
    "Jorda sett fra siden. Ved ekvator har bakken en fart østover på mer enn 400 meter per sekund, ved 60° bredde mer enn 200 meter per sekund, og ved Nordpolen null. Luft som blåser rett sørover, kommer til bakke som går fortere østover, og dreier mot vest. Luft som blåser rett nordover, har med seg større fart østover enn bakken og dreier mot øst. Begge deler er en høyresving.",
  caption:
    "Fordi bakken går fortere østover jo nærmere ekvator den er, dreier luft som blåser rett sørover mot vest, og luft som blåser rett nordover mot øst. Begge deler er en høyresving på kartet (Store norske leksikon, u.å.-a). Skjematisk, nordlige halvkule.",
};

export const ZONAL_VERTIKAL_TEKST = {
  heading: "Avbøyningen virker også loddrett",
  title:
    "Et snitt langs bakken. Et legeme som beveger seg østover langs overflaten, har en tendens til å løfte seg litt. I vestgående retning er det omvendt. Pilene er sterkt overdrevet, for effekten er svært liten. Den er størst ved ekvator og avtar til null ved polene.",
  caption:
    "Et legeme som beveger seg østover langs overflaten, har en tendens til å løfte seg litt, og i vestgående retning er det omvendt. Effekten er svært liten og avtar fra ekvator til null ved polene (Store norske leksikon, u.å.-a). Pilene er sterkt overdrevet.",
};

export const SYKLON_TEKST_CORIOLIS = {
  heading: "Uten rotasjon fylles lavtrykket igjen",
  title:
    "Et lavtrykk sett ovenfra. Uten jordrotasjon strømmer lufta rett inn, og lavtrykket fylles raskt igjen. Med rotasjon bøyes lufta av, og det dannes en virvel. Et bånd langs ekvator viser hvor det ikke er avbøyning, så tropiske sykloner dannes sjelden nærmere ekvator enn ca. 5°, om lag 500 km.",
  caption:
    "Dersom jorda ikke roterte, ville et lavtrykk raskt bli fylt igjen. Avbøyningen gjør at det dannes en rotasjon (Store norske leksikon, u.å.-a). Ved ekvator er det ingen avbøyning, så tropiske sykloner dannes sjelden nærmere ekvator enn ca. 5°, om lag 500 km (NOAA AOML, u.å.). Skjematisk.",
};

export const TRYKK_ROTASJON_TEKST = {
  heading: "Rotasjon rundt lavtrykk og høytrykk, og vinkelen ved bakken",
  title:
    "Lavtrykk og høytrykk sett ovenfra med isobarer. På den nordlige halvkule går lufta mot klokken rundt lavtrykket og med klokken rundt høytrykket. På den sørlige halvkule er mønsteret speilvendt. Nær bakken krysser vinden isobarene: 0–20° over havet og 20–40° over land, fordi friksjonen er større over land.",
  caption:
    "På den nordlige halvkule blir rotasjonen rundt et lavtrykk mot klokken og rundt et høytrykk med klokken, og på den sørlige er mønsteret speilvendt (Store norske leksikon, u.å.-a; u.å.-b). Nær bakken danner vinden en vinkel med isobarene på 0–20° over havet og 20–40° over land (Store norske leksikon, u.å.-d). Skjematisk.",
};

export const GEOSTROFISK_TEKST = {
  heading: "Høyre i nord, venstre i sør",
  title:
    "Høytrykk til venstre og lavtrykk til høyre. Uten jordrotasjon ville vinden gått rett fra høyt til lavt trykk (stiplet). På den nordlige halvkule avbøyes den mot høyre, på den sørlige mot venstre.",
  caption:
    "Vinden blåser fra høytrykk mot lavtrykk. Uten jordrotasjonen ville den gått rett fra høyt til lavt trykk. Corioliskraften avbøyer den mot høyre på den nordlige halvkule og mot venstre på den sørlige (Store norske leksikon, u.å.-d). Skjematisk.",
};

export const TILPASNING_TEKST = {
  heading: "Trykkforskjellen setter lufta i gang, rotasjonen endrer retningen",
  title:
    "Rette isobarer med lavere trykk i nord og høyere trykk i sør. Lufta starter i ro. Trykkforskjellen setter den i gang mot lavere trykk. Corioliseffekten endrer retningen mot høyre, til vinden til slutt går langs isobarene. Uten friksjon, forenklet.",
  caption:
    "Corioliskraften setter ikke lufta i gang. Den endrer retningen. Figuren viser balansen uten friksjon, der vinden til slutt går langs isobarene (Store norske leksikon, u.å.-d). Forenklet, nordlige halvkule.",
};

export const EKMANSPIRAL_TEKST = {
  heading: "Ekmanspiralen og ekmantransporten",
  title:
    "Havet sett ovenfra, nordlige halvkule. Vinden drar i overflaten, og overflatestrømmen går til høyre for vinden. Hvert dypere lag går saktere og avbøyes også mot høyre, så lagene danner en spiral. De dypeste lagene kan gå motsatt vei av overflatestrømmen, og bevegelsen dør ut på om lag 100 meters dyp. Netto transport av hele laget går 90° til høyre for vinden.",
  caption:
    "Hvert dypere lag går saktere og avbøyes også, så lagene danner en spiral. De dypeste lagene kan gå motsatt vei av overflatestrømmen (NOAA, u.å.-b). Netto går ekmantransporten 90° til høyre for vinden på den nordlige halvkule (Stewart, 2008). Sett ovenfra, skjematisk.",
};

export const OPPVELLING_TEKST = {
  heading: "Oppvelling langs en vestkyst",
  title:
    "Snitt gjennom havet ved en vestkyst på den nordlige halvkule, med havet i vest og land i øst. Nordavinden blåser langs kysten, mot leseren. Ekmantransporten går til høyre for vinden og skyver overflatelaget utover fra kysten. Vann fra dypere nivåer kommer opp og tar plassen. Det går langsomt, om lag 10 meter per dag, og vannet er rikt på næringsstoffer.",
  caption:
    "En nordavind langs en vestkyst på den nordlige halvkule skyver overflatelaget utover, fordi ekmantransporten går til høyre. Da får vann fra dypere nivåer plass. Prosessen er langsom, om lag 10 meter per dag, og vannet er rikt på næringsstoffer (Store norske leksikon, u.å.-e; NOAA, u.å.-c). Skjematisk.",
};

export const SKALA_TEKST_CORIOLIS = {
  heading: "Jordrotasjonen merkes i havstrømmer og vind",
  title:
    "Tre kort. Vannet i vasken styres ikke av corioliseffekten. I hverdagen merkes jordrotasjonen nesten ikke. I havstrømmer og vind merkes den.",
  caption:
    "Jordrotasjonen merkes i hverdagen nesten ikke, unntatt i havstrømmer og vind. Vannet i vasken styres derfor ikke av corioliseffekten (Store norske leksikon, u.å.-c).",
};

export const HAVVIRVLER_TEKST = {
  heading: "Havvirvlene: med klokken i nord, mot klokken i sør",
  title:
    "Et skjematisk havbasseng over begge halvkuler. Vindsystemene driver overflatestrømmene, og jordrotasjonen avbøyer dem. Nord for ekvator går virvelen med klokken, sør for ekvator mot klokken. Ved ekvator dannes ikke slike virvler. Den vestlige randstrømmen er sterk og smal, den østlige svak og bred. Til slutt en skisse av de fem store havvirvlene: Nord-Atlanteren, Sør-Atlanteren, Nord-Stillehavet, Sør-Stillehavet og Det indiske hav, sør for ekvator.",
  caption:
    "De store overflatestrømmene drives av vindsystemene og avbøyes av jordrotasjonen. De danner havvirvler med klokken på den nordlige halvkule og mot klokken på den sørlige, men ikke ved ekvator. Hver har en sterk og smal vestlig randstrøm og en svak og bred østlig randstrøm (NOAA, u.å.-d). Skjematisk.",
};
