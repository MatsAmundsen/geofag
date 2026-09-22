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

export const QUIZ_VULKANER: QuizQuestion[] = [
  {
    prompt:
      "Hva er en hotspot (varmeflekk), og hva beviser Hawaii-Emperor-øykjeden med sin 47 Ma-knekk?",
    options: [
      "En hotspot er et meteorittkrater; knekken skyldes at en ny meteoritt traff 47 millioner år senere.",
      "En hotspot er en stasjonær mantelplym fra 2900 km dyp; knekken er et direkte bevis på at litosfæreplaten (Stillehavsplaten) brått endret bevegelsesretning over den stasjonære plymen.",
      "En hotspot oppstår bare langs subduksjonssoner når en plate brekker i to.",
      "Knekken på 47 Ma skyldes at jordens magnetfelt byttet polaritet.",
    ],
    answer: 1,
    explain:
      "Riktig! J. Tuzo Wilson og Jason Morgan viste at dype mantelplymer står tilnærmet i ro. Når Stillehavsplaten gled over Hawaii-hotspoten, ble en perlerad av øyer brent inn i havbunnen, og den 60-graders knekken for 47 Ma siden beviser at platens bevegelsesretning brått endret seg.",
  },
  {
    prompt:
      "Hvorfor er et utbrudd fra en ryolittisk stratovulkan dramatisk mye mer eksplosivt enn et utbrudd fra en basaltisk skjoldvulkan på Hawaii?",
    options: [
      "Ryolittisk magma er mye varmere enn basaltisk magma, noe som skaper høyere damptrykk.",
      "Ryolittisk magma har høyt SiO₂-innhold som danner silikatnettverk med ekstrem viskositet; dette fanger oppløste gasser under kolossalt trykk inntil fragmenteringsnivået nås.",
      "Basaltisk magma inneholder mer uran og thorium, som forhindrer gassdannelse.",
      "Hawaii har ingen magmakammer under overflaten, og lavaen presses ut av gravitasjonsbølger.",
    ],
    answer: 1,
    explain:
      "Riktig! Når SiO₂-innholdet overstiger 60 %, danner silikat-tetraedrene sterke kovalente polymerkjeder som øker viskositeten med opptil en million ganger sammenlignet med basalt. Gassboblene kan ikke unnslippe, og resultatet er et eksplosivt pliniansk utbrudd.",
  },
  {
    prompt:
      "Hvorfor forårsaket Eyjafjallajökull-utbruddet i 2010 en så omfattende flystans i hele Europa, til tross for at utbruddet bare var VEI 4?",
    options: [
      "Fordi utbruddet slynget ut radioaktiv lava som ødela satellittnavigasjonen.",
      "Fordi magmaen eksploderte i kontakt med smeltevann fra isbreen (freatomagmatisme) og dannet ekstremt finkornet silikatglassaske som smelter inne i varme jetmotorer.",
      "Fordi røyken fra vulkanen reagerte med ozonlaget og dannet kvelende giftgasser.",
      "Fordi flyselskapenes radarer ble blendet av lyset fra lavafontenene.",
    ],
    answer: 1,
    explain:
      "Riktig! Freatomagmatisme: Magmaens møte med isbreen knuste smelten i ørsmå, mikroskopiske glasskår som smelter ved 1100 °C inne i jetmotorers forbrenningskamre og forårsaker motorstans.",
  },
  {
    prompt:
      "Hva er den viktigste årsaken til at vulkaner på subduksjonssoner er mer eksplosive enn vulkaner på midthavsrygger?",
    options: [
      "Subduksjonssoner er nærmere jordens kjerne og har høyere temperatur.",
      "Vann frigjort fra den synkende oseaniske platen senker magmaens solidustemperatur og øker SiO₂-innholdet, noe som gir høyere viskositet og gasstrykk.",
      "Midthavsrygg-vulkaner har ingen magmakammer og kan ikke eksplodere.",
      "Subduksjonsvulkaner bruker kald havbunnsskorpe som drivstoff, noe som gir mer energi.",
    ],
    answer: 1,
    explain:
      "Riktig! Flukssmelting i mantelkilen over den synkende platen produserer intermediær til felsisk magma med høyere SiO₂ og mer oppløste gasser enn den enkle dekompresjonssmeltingen under midthavsrygger.",
  },
  {
    prompt: "Hva er 'vulkansk vinter', og hvilket historisk utbrudd forårsaket det tydeligste eksempelet?",
    options: [
      "En lokalt kald periode rundt en vulkan etter lavastrømmer — Kilauea på Hawaii 2018.",
      "En global nedkjøling forårsaket av svovelsyreaerosoler i stratosfæren etter store eksplosive utbrudd — tydeligst etter Tambora 1815, som skapte 'året uten sommer' i 1816.",
      "En flerårig nedbørsøkning i tropene etter kaldera-utbrudd.",
      "En regional vinter der askefallet blokkerer solstrålingen lokalt i opptil én uke.",
    ],
    answer: 1,
    explain:
      "Riktig! Tamboras stratosfæriske SO₂-injeksjon på 100 millioner tonn i 1815 dannet et globalt aerosolslør av svovelsyre som kuttet solinnstrålingen nok til at avlingene sviktet globalt i 1816.",
  },
  {
    prompt: "Hva er en kaldera, og hva skiller den fra et vanlig vulkankrater?",
    options: [
      "En kaldera er et vanlig eksplosjonskrater i toppen av en vulkan.",
      "En kaldera er en kolossal innsynkningsstruktur (5–50 km bred) som oppstår når taket over et delvis tømt magmakammer raser loddrett ned under et katastrofalt utbrudd.",
      "En kaldera er et underjordisk magmakammer under en skjoldvulkan.",
      "En kaldera er et lahar-fyllt dalstrøk etter et vulkanutbrudd.",
    ],
    answer: 1,
    explain:
      "Riktig! Et vulkankrater er en utblåsningsåpning fra tilførselsrøret. En kaldera oppstår ved kollapsen av hele magmakammertaket — en gigantisk senkningsstruktur som kan være titalls kilometer bred.",
  },
  {
    prompt: "Hvorfor er Beerenberg på Jan Mayen klassifisert som stratovulkan til tross for basaltisk magma?",
    options: [
      "Fordi all vulkan over 2000 moh. kalles stratovulkan.",
      "Fordi Jan Mayen ligger på en rift der magmaen er ryolittisk.",
      "Fordi utbruddsstilen veksler mellom strombolsk og hawaiisk, noe som over tid har bygd opp lagdelte avsettinger av lava og tefra til en klassisk kjegleform.",
      "Fordi Beerenberg aldri har hatt ekte lavastrømmer.",
    ],
    answer: 2,
    explain:
      "Riktig! Selv basaltisk magma kan danne stratovulkaner dersom utbruddene veksler mellom lavastrømmer og tefrafall. Beerenbergs lagdelte oppbygning, bratte flanker og isbrekledde topp er karakteristisk for denne vulkantypen (Norsk Polarinstitutt, u.å.).",
  },
];

export const QUIZ_JORDSKJELV: QuizQuestion[] = [
  {
    prompt:
      "Hva var Richard Dixon Oldhams (1906) avgjørende bevis for at jordens ytre kjerne er flytende?",
    options: [
      "P-bølger reflekteres ikke fra jordens overflate.",
      "S-bølger (transversale skjærbølger) mangler fullstendig på seismiske målestasjoner i vinkelavstanden mellom 103° og 180° fra episenteret.",
      "Borehull i Russland nådde flytende magma på 12 kilometers dyp.",
      "Rayleigh-bølger forplanter seg raskere gjennom havet enn gjennom kontinenter.",
    ],
    answer: 1,
    explain:
      "Riktig! S-bølger er transversale skjærbølger med hastighet Vs = √(μ/ρ). Fordi væsker mangler skjærstivhet (μ = 0), kan ikke S-bølger eksistere eller forplante seg i en væske. Oldhams påvisning av S-bølgenes skyggesone mellom 103° og 180° beviste ugjendrivelig at jordens kjerne har et flytende ytre lag.",
  },
  {
    prompt:
      "Dersom et jordskjelv øker fra magnitude 5,0 til magnitude 7,0 på momentmagnitudeskalaen (Mw), hvor mange ganger mer seismisk energi frigjøres?",
    options: [
      "2 ganger mer energi.",
      "20 ganger mer energi.",
      "Omtrent 100 ganger mer energi.",
      "Nøyaktig 1000 ganger mer energi (31,6² ≈ 1000).",
    ],
    answer: 3,
    explain:
      "Riktig! Magnitudeskalaen er logaritmisk med grunntall 10^(1,5) for energi. Én enhet opp tilsvarer ca. 31,6 ganger mer frigjort seismisk energi. To enheter opp tilsvarer 10^(1,5 × 2) = 10³ = 1000 ganger mer energi!",
  },
  {
    prompt:
      "Hva skjer fysisk med en tsunami når den forplanter seg fra dyphavet (4000 m) og inn mot kysten (10 m dyp)?",
    options: [
      "Bølgens hastighet øker kraftig, mens bølgehøyden avtar til null.",
      "Bølgehastigheten synker dramatisk fra ~700 km/t til ~36 km/t, bølgelengden komprimeres, og bølgehøyden presses opp etter Greens lov (shoaling).",
      "Bølgen forvandles fra en tverrbølge til en lengdebølge.",
      "Ingenting endrer seg; tsunamier har konstant hastighet og høyde overalt.",
    ],
    answer: 1,
    explain:
      "Riktig! Fordi v = √(g·d), fører det grunnere vannet til at bølgefronten bremses kraftig opp. For at den totale energifluksen skal bevares, må bølgelengden krympe og vannsøylen heve seg oppover i en massiv vannvegg (shoaling).",
  },
  {
    prompt:
      "Hva er de to viktigste geofysiske drivkreftene bak jordskjelv i Norge, til tross for at landet er et intraplate-område?",
    options: [
      "Subduksjon av Nordsjøen under Vestlandet og vulkanisme i Oslofeltet.",
      "Ryggtrykk («ridge push») fra Den midtatlantiske ryggen i vest og postglasial landheving (isostasi) etter istiden.",
      "Tidevannskrefter fra månen og sentrifugalkraft fra jordrotasjonen.",
      "Oljeboring i Nordsjøen og smelting av permafrost i Finnmark.",
    ],
    answer: 1,
    explain:
      "Riktig! Norge utsettes for kompresjonsspenninger rettet mot øst-sørøst på grunn av ryggtrykk fra den ekspanderende Midtatlantiske ryggen, kombinert med differensiell heving (opptil 8–9 mm/år) etter at den 3 km tykke iskappen smeltet. Dette reaktiverer gamle forkastningssoner.",
  },
  {
    prompt:
      "Hva er den fundamentale forskjellen på opprinnelsen til tsunamier i Stillehavet sammenlignet med historiske tsunamier i Norge?",
    options: [
      "I Stillehavet skyldes tsunamier store megathrust-jordskjelv ved subduksjonssoner; i Norge skyldes de nesten utelukkende skred i fjorder eller på sokkelskråningen (f.eks. Tafjord og Storegga).",
      "Norske tsunamier skapes av tropiske orkaner i Nordsjøen.",
      "Stillehavstsunamier er forårsaket av tidevann, mens norske tsunamier er forårsaket av Beerenberg på Jan Mayen.",
      "Det er ingen forskjell; begge typer dannes ved at litosfæreplater kolliderer langs kystlinjen.",
    ],
    answer: 0,
    explain:
      "Riktig! Norge har ingen aktive subduksjonssoner som kan heve havbunnen over store områder. Norske tsunamier oppstår når store stein- og sedimentvolumer raser ned i vannmassene — enten som fjellskred i trange vestlandsfjorder (Tafjord 1934, Loen, Åknes) eller som massive undervannsskred på kontinentalskråningen (Storeggaskredet for 8150 år siden).",
  },
  {
    prompt: "Hva er seismisk baseisolering, og hva er prinsippet bak (Eurokode 8)?",
    options: [
      "Bygningen boltes fast til fjellet med gigantiske stålstag for å hindre all bevegelse.",
      "Bygningen monteres på fleksible elastomere gummilagre eller glidependler, slik at bakken kan ryste under bygget mens selve strukturen forblir tilnærmet i ro.",
      "Bygningen kles med blyplater for å stoppe seismisk stråling.",
      "Fundamentet fylles med vann for å absorbere P-bølger.",
    ],
    answer: 1,
    explain:
      "Riktig! Baseisolering frikopler bygningens overbygning fra bakkeakselerasjonene ved hjelp av fleksible bly-gummi-lagre. Dette reduserer horisontale skjærkrefter på bygningskroppen med opptil 70–80 %.",
  },
  {
    prompt: "Hva er forskjellen på seismisk fare og seismisk risiko?",
    options: [
      "Det er det samme begrepet; bare ulikt norsk og engelsk uttrykk.",
      "Seismisk fare er den fysiske sannsynligheten for jordskjelv i et område, mens seismisk risiko kombinerer fare med sårbarhet og eksponering av befolkning og bebyggelse.",
      "Seismisk risiko gjelder bare tsunamier, mens seismisk fare gjelder jordskjelv på land.",
      "Seismisk fare måles i magnitude, mens seismisk risiko måles i intensitet.",
    ],
    answer: 1,
    explain:
      "Riktig! Et kraftig skjelv i øde fjellandskap er høy fare, men lav risiko fordi ingen er eksponert. Et svakt skjelv under en tett befolket by med gammel bygningsstock er lav fare, men potensielt høy risiko på grunn av sårbar infrastruktur og stor eksponering.",
  },
  {
    prompt:
      "Hvorfor er den seismiske Wadati-Benioff-sonen et bevis på at en kald havbunnsplate subdueres nedover i mantelen?",
    options: [
      "Fordi jordskjelv i sonen oppstår fordi magmaen smelter og eksploderer.",
      "Fordi den kalde, stive havbunnsplaten er sprø ned til 700 km dyp og kan lagre og frigjøre elastisk spenning langs et skrått plan av fokuspunkter som sporer nøyaktig plategeometrien.",
      "Fordi seismiske bølger reflekteres av plategrenseflaten og danner tydelige signaler.",
      "Fordi subduksjon produserer varme som får bergartene til å kollapse og utløse skjelv.",
    ],
    answer: 1,
    explain:
      "Riktig! Det skrå planet av jordskjelv (0–700 km dyp) i subduksjonssoner følger nøyaktig den kalde, sprø platen som tvinges ned i den varme, plastiske astenosfæren. Under 700 km er trykk og temperatur så høyt at bergartene deformeres plastisk — og ingen jordskjelv oppstår.",
  },
];

export const QUIZ_BERGARTER: QuizQuestion[] = [
  {
    prompt: "Hvorfor kan Mohs hardhetsskala kun brukes på mineraler og ikke på bergarter?",
    options: [
      "Fordi bergarter alltid er mykere enn mineraler.",
      "Fordi en bergart er et aggregat av ulike mineraler med hver sin hardhet (f.eks. myk glimmer og hard kvarts i samme gneis).",
      "Fordi Mohs skala bare gjelder for kalsitt og diamant.",
      "Fordi bergarter smelter hvis man prøver å ripe dem.",
    ],
    answer: 1,
    explain:
      "Mohs måler ripehardheten til et bestemt krystallgitter. I en granitt vil kvartskornene ha hardhet 7, mens feltspat har 6 og biotitt har 2,5.",
  },
  {
    prompt:
      "Hva er den fundamentale kjemiske forskjellen mellom mineralene i Bowens diskontinuerlige og kontinuerlige serie?",
    options: [
      "Diskontinuerlig serie består av jern- og magnesiumsilikater som endrer krystallgitter trinnvis, mens kontinuerlig serie er plagioklas der Ca og Na byttes ut i samme gitter.",
      "Diskontinuerlig serie har ingen silisium, mens kontinuerlig serie er ren kvarts.",
      "Kontinuerlig serie krystalliserer bare på overflaten, mens diskontinuerlig krystalliserer i rombeporfyr.",
      "Det er ingen kjemisk forskjell; begge serier danner utelukkende ortoklas kalifeltspat.",
    ],
    answer: 0,
    explain:
      "Venstre gren endrer mineraltype og struktur trinnvis (olivin → pyroksen → amfibol → biotitt), mens høyre gren opprettholder plagioklasens feltspatgitter mens kalsium kontinuerlig erstattes av natrium.",
  },
  {
    prompt: "Hvorfor kan Karbon-14 (¹⁴C) ikke brukes til å datere en båndgneis eller en rombeporfyr?",
    options: [
      "Fordi Karbon-14 kun finnes på den sørlige halvkule.",
      "Fordi ¹⁴C har for kort halveringstid (5730 år) og kun tas opp i organisk materiale; gammelt grunnfjell dateres med U-Pb i zirkon.",
      "Fordi gneis inneholder for mye kalsitt.",
      "Fordi rombeporfyr har for høy tetthet til at radioaktivitet slipper ut.",
    ],
    answer: 1,
    explain:
      "¹⁴C har en rekkevidde på ca. 50 000 år og forutsetter biologisk karbonopptak. Norsk grunnfjell er hundrevis til milliarder av år gammelt og måles med langlivede radioaktive ur som ²³⁸U → ²⁰⁶Pb.",
  },
  {
    prompt: "Hva er en diskordans i en geologisk lagrekke?",
    options: [
      "Et lag som bruser med saltsyre.",
      "En intrusjon av flytende basaltlava.",
      "Et tidshull der erosjon eller manglende avsetning har fjernet deler av den geologiske historien før nye lag ble avsatt.",
      "En overgang der sedimentær bergart smelter direkte til magma.",
    ],
    answer: 2,
    explain:
      "En diskordans representerer en gammel erosjonsflate og et betydelig tidsintervall som mangler i steinens lagdelte arkiv.",
  },
];
