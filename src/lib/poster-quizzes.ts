import type { QuizQuestion } from "@/components/quiz";

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
      "Riktig! Begge består av fast bergart, men litosfæren er kald og sprø (brekker i plater), mens astenosfæren er så varm (~1350 °C) at den deformeres plastisk og lar platene gli over seg.",
  },
  {
    prompt: "Hva er den viktigste drivkraften bak litosfæreplates bevegelse?",
    options: [
      "Tidevannskrefter fra månen som trekker kontinentene vestover.",
      "Slab pull: Kald og gammel havbunnsskorpe omdannes til tung eklogitt og synker under egen vekt i subduksjonssonen.",
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
    prompt: "Hvordan virker drivkraften «ridge push» (ryggtrykk)?",
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
