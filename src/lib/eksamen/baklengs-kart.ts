/** Kompetansemål → kapittel → offisielle sett. Steg 6: øv baklengs fra målet. */

export type MaalKart = {
  maal: string;
  chapters: { to: string; label: string }[];
  exams: { slug: string; label: string; tasks: string }[];
};

export const MAAL_KART: MaalKart[] = [
  {
    maal: "Gjøre rede for værsystemer på global, regional og lokal skala, og tolke værkart.",
    chapters: [
      { to: "/tema/hoytrykk-lavtrykk", label: "Trykk" },
      { to: "/tema/vindsystemet", label: "Vind" },
      { to: "/tema/vaerkart", label: "Værkart" },
      { to: "/tema/lokale-vaersystemer", label: "Lokalt" },
      { to: "/tema/jetstrommer", label: "Jet" },
    ],
    exams: [
      { slug: "v2026", label: "Vår 2026", tasks: "1 (vind rundt L), 5 (jet og kulde), 6 (Gyda / atmosfærisk elv)" },
      { slug: "baklengs", label: "Øv baklengs", tasks: "1–2" },
    ],
  },
  {
    maal: "Gjøre rede for jordas rotasjon, tetthet- og trykkforskjeller og hvordan de driver sirkulasjon i luft og hav.",
    chapters: [
      { to: "/tema/coriolis", label: "Coriolis" },
      { to: "/tema/havstrommer", label: "Havstrømmer" },
      { to: "/tema/klima/amoc", label: "AMOC" },
    ],
    exams: [
      { slug: "v2026", label: "Vår 2026", tasks: "7–9 (tetthet, T–S, CTD), 11–12 (monsterbølge og Grønlandshavet)" },
      { slug: "eksempel", label: "Eksempel", tasks: "7–12 (AMOC)" },
    ],
  },
  {
    maal: "Gjøre rede for strålingsbalanse, pådriv og tilbakekoblinger i klimasystemet.",
    chapters: [
      { to: "/tema/klima/oversikt", label: "Klimasystemet" },
      { to: "/tema/klima/enso", label: "ENSO" },
      { to: "/tema/klima/nao", label: "NAO" },
    ],
    exams: [
      { slug: "v2026", label: "Vår 2026", tasks: "2–3 (marin hete og Spania), 10 (arktisk forsterkning)" },
    ],
  },
  {
    maal: "Gjøre rede for kryosfæren og forhistorisk klima.",
    chapters: [
      { to: "/tema/kryosfaeren", label: "Kryosfæren" },
      { to: "/tema/paleoklima", label: "Paleoklima" },
      { to: "/tema/milankovitch", label: "Istider" },
    ],
    exams: [
      { slug: "v2026", label: "Vår 2026", tasks: "tema 3 (istider og klimaendringer)" },
      { slug: "baklengs", label: "Øv baklengs", tasks: "3" },
    ],
  },
  {
    maal: "Gjøre rede for numeriske modeller i værvarsling, hav og klima.",
    chapters: [{ to: "/tema/numeriske-modeller", label: "Modeller" }],
    exams: [{ slug: "baklengs", label: "Øv baklengs", tasks: "4" }],
  },
  {
    maal: "Drøfte konsekvenser av klimaendringer og bærekraftige løsninger.",
    chapters: [
      { to: "/tema/vaerkatastrofer", label: "Værkatastrofer" },
      { to: "/tema/tilpasning", label: "Tilpasning" },
    ],
    exams: [
      { slug: "v2026", label: "Vår 2026", tasks: "3–4 og 6 (hete, orkan, Gyda)" },
      { slug: "baklengs", label: "Øv baklengs", tasks: "5–6" },
    ],
  },
  {
    maal: "Drøfte utnyttelse av energiressurser fra hav og atmosfære.",
    chapters: [{ to: "/tema/energi-hav-luft", label: "Energi" }],
    exams: [
      { slug: "eksempel", label: "Eksempel", tasks: "23–25 (havvind, ufullstendig)" },
      { slug: "baklengs", label: "Øv baklengs", tasks: "7" },
    ],
  },
  {
    maal: "Gjennomføre geofaglig feltarbeid i hav, atmosfære eller kryosfære.",
    chapters: [{ to: "/tema/felt-hav-luft-is", label: "Felt" }],
    exams: [
      { slug: "v2026", label: "Vår 2026", tasks: "7 og 9 (tetthetseksperiment og CTD)" },
      { slug: "baklengs", label: "Øv baklengs", tasks: "8" },
    ],
  },
];
