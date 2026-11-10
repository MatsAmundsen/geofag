/**
 * Tekstene til «Breen i arbeid» (geografi kap. 4, Ytre krefter og landskapet i Norge).
 * Deles med plassholderen, så serveren ikke trenger figurmodulen.
 *
 * Fagstoffet bygger på kapitteltekstene (geo-landskap.md, isbreer-og-landformer.md), Geofag 1-biblioteket
 * (06-landformer, 01-jordsystemer, 05-lokal-geologi) og SNL-artiklene i kapitlets kildeliste:
 * Sørbel (2024) frostsprengning, Lilleøren (2025) botn, SNL (u.å.-a) bre-erosjon, Linge (2024) rundsva,
 * Røthe & Mangerud (u.å.) morene, Bryhni (2024) midtmorene og Mangerud (2026) bunnmorene.
 */
export const BRE_ARBEID_TEKST = {
  heading: "Breen i arbeid",
  title:
    "Modell av en dalbre i lengdesnitt og sett ovenfra. Isen siger nedover dalen. Over isen sprenger frosten løs blokker fra fjellsiden, og de faller ned på breen. Ved en bergknaus sliper isen støtsiden glatt og plukker løs blokker på lesiden. Steiner i bresålen skurer berget og lager skuringsstriper. Materialet fraktes på, i og under breen, usortert. Ved fronten bygges en endemorene, langs kantene sidemorener, der to breer møtes en midtmorene, og under breen bunnmorene. Når isen er borte, står morenene, rundsvaet og skuringsstripene igjen.",
  caption:
    "En tenkt dalbre i lengdesnitt og sett ovenfra. Følg steinene fra fjellsiden og underlaget fram til morenene. Skissen er konstruert, ikke i målestokk, og høyden er overdrevet.",
};

/** Kort navn per steg (stegknapper). */
export const BRE_ARBEID_FASER = ["Isen beveger seg", "Frostforvitring", "Plukking", "Skuring", "Transport", "Morener", "Etter isen"];

/** Én til tre setninger per steg. */
export const BRE_ARBEID_STATUS = [
  "Isen siger sakte nedover dalen. Den deformeres inne i isen og kan gli mot underlaget. Både plukking og skuring krever at isen beveger seg.",
  "Over isen er fjellsiden bar. Vann i sprekker fryser og tar større plass, og trykket kan utvide sprekken til en blokk løsner. Blokken faller ned på breen og blir med isen videre.",
  "Der isen går over en bergknaus, fryser den fast i sprekker på lesiden og river løs blokker når den beveger seg videre. Knausen blir ujevn og bratt på lesiden.",
  "Steinene i bresålen presses mot berget og sliper det, omtrent som sandpapir. Støtsiden av knausen blir slipt glatt, og steinene lager skuringsstriper i samme retning som isen beveger seg.",
  "Isen frakter materiale på breen, inne i breen og under breen. Det kommer fra underlaget og fra steiner som faller ned fra fjellsidene. Isen sorterer ikke: leire, sand, stein og blokker fraktes om hverandre.",
  "Ved fronten hoper materialet seg opp til en endemorene når fronten står stille eller rykker litt fram. Langs kanten avsettes sidemorener. Der to breer løper sammen, blir de to sidemorenene i midten til en midtmorene. Under breen avsettes bunnmorene.",
  "Isen er borte. Endemorenen står som en rygg der fronten lå, sidemorenene langs dalsiden og midtmorenen som en rygg midt i dalen. Bunnmorenen dekker dalbunnen. Rundsvaet og skuringsstripene viser hvilken vei isen gikk.",
];
