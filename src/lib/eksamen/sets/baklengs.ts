import type { ExamSet } from "../types";

export const baklengs: ExamSet = {
  slug: "baklengs",
  label: "Øv baklengs",
  season: null,
  year: 2026,
  kind: "eksempel",
  complete: true,
  officialUrl: "",
  fasitSource: "eget",
  themes: [
    "Værkart og polarfront",
    "Kryosfære og modeller",
    "Tilpasning og energi",
    "Felt i hav, luft og is",
  ],
  tasks: [
    {
      number: 1,
      title: "Vind rundt et lavtrykk",
      kind: "interaktiv",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 1 — Værkart

Et synoptisk bakkekart viser et lavtrykk vest for Stad, merket L 976 hPa. Et høytrykk ligger over Sentral-Europa, 1032 hPa. Isobarene er tette mellom L og kysten av Vestlandet.

Et sted i Nordland er merket X, nordøst for lavtrykkssenteret når senteret treffer land.

Hvilken vindretning er mest sannsynlig ved X?

A  Fra sørvest.
B  Fra nordøst.
C  Fra sørøst.
D  Fra nordvest.`,
    },
    {
      number: 2,
      title: "Polarfrontsyklon og sjøbris",
      kind: "interaktiv",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 2 — Lokale og regionale systemer

To påstander:

1  En polarfrontsyklon får varm sektor når kaldfronten tar igjen varmfronten.
2  Sjøbris om ettermiddagen blåser fra hav mot land fordi landjorda varmes raskere enn havet.

Hvilke påstander er sanne?

A  Bare 1.
B  Bare 2.
C  Begge.
D  Ingen.`,
    },
    {
      number: 3,
      title: "Likevektslinje på en bre",
      kind: "interaktiv",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 3 — Kryosfæren

Likevektslinjen (ELA) på en dalbre

A  er grensen mellom akkumulasjon oppe og ablasjon nede i samme år.
B  er den linjen innlandsisen nådde i Weichsel.
C  er der permafrosten tiner til to meters dyp.
D  er der havis blir flerårig.`,
    },
    {
      number: 4,
      title: "Ensemble og parametrisering",
      kind: "interaktiv",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 4 — Numeriske modeller

Hvilken setning er mest presis?

A  Et ensemble er mange kjøringer med litt ulike startvilkår. Sprik etter dag 5–8 er lav tillit, ikke at «modellen tar feil».
B  Parametrisering betyr at superdatamaskinen gjetter været uten fysikk.
C  Gridcellen løser skyer på 100 m når globalmodellen har 25 km rute.
D  En klimamodell og et værvarsel er samme produkt, bare med annen farge.`,
    },
    {
      number: 5,
      title: "Clausius–Clapeyron",
      kind: "interaktiv",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 5 — Naturfarer og klima

Clausius–Clapeyron-relasjonen sier at mettet vanndamptrykk øker med om lag 7 % per grad. Hva følger for ekstremnedbør i Norge?

A  Vestlandet får 7 % mer årsnedbør, jevnt fordelt.
B  Når en atmosfærisk elv treffer fjell, kan intensiteten i enkeltshendelser øke mer enn middelnedbøren.
C  Det slutter å regne på Østlandet fordi all fukt faller i vest.
D  Orkaner fødes i Oslofjorden når sjøen når 20 °C.`,
    },
    {
      number: 6,
      title: "Kutt og tilpasning",
      kind: "skrive",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 6 — Konsekvenser og tilpasning

En kystkommune i Nordland har fått rødt farevarsel for stormflo og har eldre trehus i 100-års flomsonen.

Drøft ett utslippskutt og ett tilpasningstiltak. Si hvem som betaler, og hva tiltaket ikke løser.

Skriv 8–12 setninger. Henvis til fysikk (havnivå, stormflo) og til minst én etat eller kilde du ville brukt (NCCS, Kartverket, MET).`,
    },
    {
      number: 7,
      title: "Vindkraft og kubikkloven",
      kind: "skrive",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 7 — Energi fra hav og luft

Effekten i en vindturbin skaleres omtrent med v³. Et felt på kysten har middelvind 8 m/s. Et felt lenger til havs har 10 m/s.

a) Omtrent hvor mye mer effekt gir 10 m/s enn 8 m/s, alt annet likt?
b) Drøft én økologisk eller samfunnsmessig kostnad ved å flytte parken til havs.

Maks én side.`,
    },
    {
      number: 8,
      title: "Sjøbris-transekt",
      kind: "skrive",
      needsFigure: false,
      prompt: `Geofag 2 · Øv baklengs
Oppgave 8 — Felt i atmosfæren

Du skal teste hypotesen «pålandsvind og temperaturfall ved kai bygger seg etter lunsj».

Skriv en feltplan: to punkt, tid, instrument, usikkerhet, HMS og hva slags konklusjon én dag kan og ikke kan bære.

Ikke skriv «vi måler vær».`,
    },
  ],
};
