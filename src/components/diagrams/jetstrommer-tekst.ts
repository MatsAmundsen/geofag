/**
 * Tekstene til Jetstrømmer-figurene. Deles med plassholderne, så serveren ikke trenger figurmodulen.
 * Alt bygger på jetstrommer.md: NOAA (u.å.-a; u.å.-b), AMS (u.å.-a) og Store norske leksikon (u.å.-a; u.å.-e). Bokstavene er definert i kilder.ts på jetstrommer-reseed.
 * JetStreak (firekvadrantmodellen) trenger et tekstavsnitt med kilde før merge (venter på Mats).
 */
export const JET_PROFIL_TEKST = {
  heading: "To jetstrømmer i høyden",
  title:
    "Snitt fra ekvator i sør til Nordpolen i nord, med høyden sterkt overdrevet. Den subtropiske jetstrømmen ligger rundt 30°, polarjeten mellom 50° og 60°, rundt 9100 meter over bakken. Begge blåser fra vest mot øst, ut av arket. Vinden er sterkest i kjernen. Polarjeten ligger over polarfronten mellom kald og varm luft. Om vinteren er begge sterkest.",
  caption:
    "To jetstrømmer i snitt fra ekvator til Nordpolen. Polarjeten ligger mellom 50° og 60°, og den subtropiske jetstrømmen rundt 30°. Begge blåser fra vest mot øst og er sterkest om vinteren (NOAA, u.å.-a). Skjematisk, nordlige halvkule, høyden er sterkt overdrevet.",
};

export const TERMISK_VIND_TEKST = {
  heading: "Termisk vind: vestavinden øker med høyden",
  title:
    "Snitt fra sør til nord med varm luft til venstre og kald luft til høyre. Ved bakken er trykket det samme. Med lik temperatur er trykkflatene vannrette. Når varm og kald luft ligger side om side, heller trykkflatene mot den kalde siden, og vestavinden øker med høyden. Vinden blåser ut av arket, mot øst, langs isotermene. Jo større temperaturforskjellen er, desto raskere øker vinden med høyden.",
  caption:
    "Der kald og varm luft ligger side om side, øker vestavinden med høyden, og jo større temperaturforskjellen er, desto raskere øker den. Dette kalles termisk vind (AMS, u.å.-a). Skjematisk, nordlige halvkule.",
};

export const VEST_OST_TEKST = {
  heading: "Hvorfor blåser jetstrømmen fra vest mot øst?",
  title:
    "Jorda sett fra siden. Den roterer én gang i døgnet. Ved ekvator beveger bakken seg østover med over 1600 kilometer i timen, ved polen er farten null. Luft som går fra ekvator mot polen, beholder den østlige farten, og driver mot øst i forhold til bakken. Et fly mot øst får medvind, et fly mot vest motvind.",
  caption:
    "Luft som beveger seg bort fra ekvator, beholder den østlige farten, mens bakken under roterer saktere jo nærmere polen den kommer. Derfor går lufta fra vest mot øst i forhold til bakken (NOAA, u.å.-a). Skjematisk.",
};

export const JETSTREAK_TEKST = {
  heading: "Firekvadrantmodellen: områder med ekstra sterk vind i jetstrømmen",
  title:
    "Jetstrømmen sett ovenfra, med et område med ekstra sterk vind (jetstreak) i midten. Lufta øker farten inn mot området og senker farten ut av det. Da går en ageostrofisk vind på tvers: mot venstre i inngangen og mot høyre i utgangen. Det gir divergens i høyre inngang og venstre utgang og konvergens i venstre inngang og høyre utgang. Under divergensen stiger lufta, og trykket ved bakken faller.",
  caption:
    "Firekvadrantmodellen for en rett jetstreak på den nordlige halvkule. Venstre og høyre gjelder sett nedstrøms, mot øst. Skjematisk.",
};

export const JET_SLYNGER_TEKST = {
  heading: "Jetstrømmen slynger seg",
  title:
    "Den nordlige halvkule sett fra verdensrommet. Jetstrømmen går rundt jorda fra vest mot øst. Først er den nesten rett, så slynger den seg, stiger og synker, deler seg og danner virvler, og kan forsvinne ett sted og dukke opp et annet. Kald luft ligger mot nord og varm luft mot sør. Lufta strømmer raskere gjennom slyngene enn slyngene selv flytter seg.",
  caption:
    "Jetstrømmen ligger ikke stille. Den slynger seg rundt jorda, stiger og synker, kan dele seg og danne virvler, og kan forsvinne ett sted og dukke opp et annet (NOAA, u.å.-a). Skjematisk. Kartdata: Natural Earth.",
};

export const JET_SESONG_TEKST = {
  heading: "Jetstrømmen følger sola",
  title:
    "Den nordlige halvkule sett fra verdensrommet. Om vinteren er polarjeten sterkest. Om våren flytter den seg mot polen. Om sommeren ligger den nær grensen mellom USA og Canada og er svakere. Om høsten flytter den seg mot ekvator igjen. Tykkelsen på båndet viser styrken.",
  caption:
    "Polarjeten følger sola gjennom året. Om sommeren på den nordlige halvkule ligger den typisk nær grensen mellom USA og Canada (NOAA, u.å.-a). Skjematisk, tykkelsen viser styrken. Kartdata: Natural Earth.",
};

export const JET_NAO_TEKST = {
  heading: "NAO: jetstrømmen i positiv og negativ fase",
  title:
    "Nord-Atlanteren sett fra verdensrommet. I positiv fase er både lavtrykket ved Island og høytrykket ved Asorene sterkere enn vanlig. Jetstrømmen er sterkere, og stormbanen ligger lenger nord. Nord-Europa får mer storm og nedbør og blir mildere, Sør-Europa får mindre storm og nedbør. I negativ fase er trykkforskjellen svakere, og jetstrømmen og stormbanen går mer rett vest–øst. Nord-Europa får mindre storm og nedbør og blir kaldere, Sør-Europa får mer storm og nedbør og blir varmere.",
  caption:
    "Positiv og negativ fase av den nordatlantiske oscillasjonen (NOAA, u.å.-b). Skjematisk, sammenlignet med gjennomsnittet. Kartdata: Natural Earth.",
};

export const JET_OMEGA_TEKST = {
  heading: "Omega: når jetstrømmen slynger seg rundt et høytrykk",
  title:
    "Kart sett ovenfra, nord opp. Først går jetstrømmen fra vest mot øst. Så slynger den seg mer. Vest for høytrykket bøyer den mot sør, så går den nord over høytrykket og mot sør igjen øst for det, som bokstaven omega (Ω), med et lavtrykk på hver side.",
  caption:
    "Jetstrømmen kan slynge seg rundt et høytrykk med et lavtrykk på hver side, slik at den ligner den greske bokstaven omega (Ω) (Store norske leksikon, u.å.-e). Skjematisk, sett ovenfra. Kartdata: Natural Earth.",
};

export const STORMBANE_TEKST = {
  heading: "Stormbanen langs polarfronten",
  title:
    "Nord-Atlanteren sett fra verdensrommet. Polarfronten skiller kald luft i nord fra varm luft i sør, med jetstrømmen i høyden like over. Langs polarfronten dannes lavtrykk som vandrer mot øst, omtrent med vinden i høyden.",
  caption:
    "Langs polarfronten vandrer lavtrykk, oftest mot øst, omtrent med vinden i høyden. De gir mye av nedbøren i den tempererte sonen (Store norske leksikon, u.å.-a). Skjematisk. Kartdata: Natural Earth.",
};
