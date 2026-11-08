/** Tekst og stegdata for modellen «Termisk vind», kopiert ordrett fra godkjent v5. */
export const STEG = [
 {n:"Lik temperatur",t:"Lik temperatur gir vannrette trykkflater",
  x:"Er lufta like varm i sør og nord, og trykket ved bakken er likt, ligger trykkflatene i samme høyde overalt. Da er trykket likt i samme høyde, og det er ingen trykkforskjell som kan sette fart på en vind i høyden.",
  m:{d:0,h:0,f:0,c:0,j:0}},
 {n:"Varmt i sør, kaldt i nord",t:"Varm luft tar mer plass",
  x:"Ved samme trykk har varm luft lavere tetthet enn kald luft. Laget mellom to trykkflater blir derfor tykkere der lufta er varm og tynnere der den er kald. Trykket ved bakken kan likevel være det samme, men trykkflatene heller nedover mot nord, og i troposfæren mer jo høyere vi kommer.",
  m:{d:1,h:0,f:0,c:0,j:0}},
 {n:"Trykkforskjell i samme høyde",t:"Høyere trykk i sør enn i nord i samme høyde",
  x:"Følg den stiplede linja, som ligger i samme høyde. I sør ligger trykkflaten over linja, i nord under. Trykket i denne høyden er altså høyere i sør enn i nord, og trykkforskjellen gir en kraft mot nord.",
  m:{d:1,h:1,f:1,c:0,j:0}},
 {n:"Coriolis og balanse",t:"Lufta bøyes av og blåser mot øst",
  x:"Lufta som settes i bevegelse mot nord, blir bøyd av mot høyre av corioliseffekten. Over friksjonslaget, og et godt stykke fra ekvator, ender det i balanse: Trykkraften mot nord og corioliskraften mot sør er like store. Da blåser vinden på tvers av den vannrette trykkforskjellen, med lavere trykk til venstre: mot øst, ut av arket. Dette kalles geostrofisk vind.",
  m:{d:1,h:1,f:1,c:1,j:0}},
 {n:"Vind som øker med høyden",t:"Vestavinden øker opp mot tropopausen",
  x:"I troposfæren gjør den varme lufta i sør lagene tykkere hele veien opp, så trykkflatene heller mer jo høyere vi kommer, og den geostrofiske vestavinden øker med høyden. Termisk vind er vektorforskjellen mellom den geostrofiske vinden på to trykknivåer, vinden på det øvre nivået minus vinden på det nedre. Her er vestavinden sterkere på det øvre trykknivået enn på det nedre. Den termiske vindvektoren peker derfor mot øst. Det gjelder dette idealiserte eksempelet. I denne modellen ligger vindmaksimum nær tropopausen. Over maksimumet snur den vannrette temperaturgradienten, slik at vestavinden avtar med høyden. Virkelige jetstrømmer kan avvike fra dette.",
  m:{d:1,h:0,f:0,c:0,j:1}},
];

export const SW: Record<string, string> = {varm:"background:#f0a98f",kald:"background:#bde0f5",pgf:"background:linear-gradient(#c2311f,#c2311f) center/100% 5px no-repeat",cor:"background:linear-gradient(#1d6fa5,#1d6fa5) center/100% 5px no-repeat",linje:"background:repeating-linear-gradient(90deg,#5b6b77 0 3px,transparent 3px 9px) center/100% 2px no-repeat",vind:"background:radial-gradient(circle,#1f2a33 22%,#fff 27%,#fff 50%,#1f2a33 55%,#1f2a33 64%,transparent 67%)"};
export const NOKKEL: [string | null, string, string][][] = [
 [["A","varm","Varmere luft i sør"],["B","kald","Kaldere luft i nord"]],
 [["A","varm","Varmere luft i sør"],["B","kald","Kaldere luft i nord"]],
 [["A","varm","Varmere luft i sør"],["B","kald","Kaldere luft i nord"],[null,"linje","Stiplet linje: samme høyde"],["C","pgf","Rød pil: trykkraft mot nord"]],
 [["C","pgf","Rød pil: trykkraft mot nord"],["D","cor","Blå pil: corioliskraft mot sør"],[null,"vind","Vind mot øst, ut av arket"],[null,"linje","Stiplet linje: samme høyde"]],
 [["A","varm","Varmere luft i sør"],["B","kald","Kaldere luft i nord"],["E","vind","Jetkjerne nær tropopausen"]],
];

// Mobil (r6): ingen tekst i SVG-en. Nøkkelen under figuren forklarer med fargeprøver; bokstavene A–E vises ikke.

export const TV5_TITTEL = "Termisk vind: hvorfor vestavinden øker opp mot jetstrømmen";
export const TV5_INGRESS =
  "Følg årsakskjeden i fem steg: temperaturforskjell, trykkflater som heller, trykkforskjell i samme høyde, balanse med corioliskraften og vind som øker med høyden.";
export const TV5_SVG_TITTEL = "Snitt fra sør (til venstre) til nord (til høyre) på den nordlige halvkule";
export const TV5_BILDETEKST =
  "Snitt fra sør til nord på den nordlige halvkule, sett slik at øst peker ut av arket. Der varm og kald luft ligger side om side, heller trykkflatene mot den kalde siden. Termisk vind er vektorforskjellen mellom den geostrofiske vinden på to trykknivåer, vinden på det øvre nivået minus vinden på det nedre (AMS, u.å.-a). I dette idealiserte eksempelet er vestavinden sterkere på det øvre nivået, så den termiske vindvektoren peker mot øst. Fargene viser temperaturforskjellen innenfor hvert lag. Skjematisk: Modellen antar likt trykk og ingen geostrofisk vind ved bakken, hellingen til trykkflatene og tropopausen er sterkt overdrevet, området over tropopausen er forenklet, og figuren viser ingen bestemt værsituasjon.";
