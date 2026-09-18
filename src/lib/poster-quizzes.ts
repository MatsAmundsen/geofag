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
    prompt: "Hva er en ofiolitt (som på Leka), og hvorfor er den av så enorm vitenskapelig verdi?",
    options: [
      "En ofiolitt er et komplett fossil av et forhistorisk havdyr fra silurtiden.",
      "En ofiolitt er et komplett stykke havbunnsskorpe og øvre mantel som er skjøvet opp på land (obdusert), slik at hele lagdelingen ned til Moho kan studeres til fots.",
      "En ofiolitt er et meteorittkrater fylt med basaltisk lava.",
      "En ofiolitt er et magmakammer under en aktiv vulkan.",
    ],
    answer: 1,
    explain:
      "Riktig! Ofiolitter (som Leka i Trøndelag) oppstår når havbunnsskorpe under spesielle tektoniske kollisjoner unntaksvis skyves opp på land i stedet for å subduere. Det gir geologer et unikt vindu til havbunnens og mantelens dype lagdeling.",
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
    prompt: "Hvorfor er Leka i Trøndelag kåret til Norges geologiske nasjonalmonument?",
    options: [
      "Fordi det er landets eneste aktive vulkan.",
      "Fordi en komplett bit av Iapetushavets bunn og øvre mantel ble skjøvet på land under Kaledonidene (ofiolitt), slik at man kan gå tørrskodd over Moho-grensen.",
      "Fordi Norges eldste meteorittkrater ligger der.",
      "Fordi det er det eneste stedet i Europa med permafrost.",
    ],
    answer: 1,
    explain:
      "Riktig! Leka ofiolittkompleks er et geologisk verdensfenomen der obduksjon bevarte hele lagrekken fra mantelperidotitt, over Moho, og opp til lagdelt gabbro og putelava.",
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
    prompt: "Hvorfor finnes det aldri jordskjelv dypere enn 700 kilometer i Wadati-Benioff-sonen?",
    options: [
      "Fordi platen fordamper fullstendig når den når 700 km dyp.",
      "Fordi trykk og temperatur i mantelen under 700 km gjør bergartene fullstendig plastiske; de kan ikke lenger lagre elastisk spenning eller sprekke sprøtt.",
      "Fordi seismometrene på overflaten ikke klarer å registrere bølger fra større dyp.",
      "Fordi den flytende ytre kjernen starter ved 700 km dyp.",
    ],
    answer: 1,
    explain:
      "Riktig! Under 700 km dybde fører høyt trykk og høy temperatur til at bergartene deformeres kontinuerlig ved plastisk flyt (dislokasjonskryp). Uten sprøtt brudd oppstår ingen jordskjelv.",
  },
  {
    prompt: "Hva var den kaledonske fjellkjedefoldingen i Norges geologiske historie?",
    options: [
      "En oppsprekking av Norge i perm da Oslofeltet sank inn.",
      "En kontinent-kontinent-kollisjon i silur der Baltika og Laurentia kolliderte, lukket Iapetushavet og skjøv store skyvedekker over landet.",
      "En istidsepoke for 10 000 år siden som gravde ut de norske fjordene.",
      "Dannelsen av Jan Mayen og Beerenberg-vulkanen.",
    ],
    answer: 1,
    explain:
      "Riktig! Kaledonidene oppsto for 430–400 mill. år siden da Iapetushavet lukket seg og Baltika kolliderte med Grønland/Amerika. Skyvedekkene i Jotunheimen er rester av denne fjellkjeden.",
  },
  {
    prompt: "Hvorfor kan marin leire finnes opptil 220 meter over dagens havnivå på Østlandet (marin grense)?",
    options: [
      "Fordi havet under istiden sto 220 meter høyere globalt på grunn av voldsom nedbør.",
      "Fordi den 3 km tykke innlandsisen presset litosfæren ned; da isen smeltet, hevet landet seg raskere enn havet (glasial isostasi).",
      "Fordi tsunamibølger kastet leiren opp i fjellsidene.",
      "Fordi Oslofeltets vulkaner slynget leire opp i høyden under perm.",
    ],
    answer: 1,
    explain:
      "Riktig! Glasial isostasi: Isens enorme vekt trykket litosfæren ned i astenosfæren. Da isen forsvant, hevet landet seg med opptil flere hundre meter, slik at gammel havbunn i dag ligger som fruktbart jordbruksland langt over havnivå.",
  },
];
