/** Kapittelmetadata for Geografi (GEO01-02). Skjelett PR A. */

export type GeografiUnderkapittel = {
  readonly id: string;
  readonly title: string;
};

export type GeografiKapittel = {
  /** URL-segment under /geografi/ */
  readonly path: string;
  /** CMS-/poster-slug (geo-…) */
  readonly slug: string;
  readonly title: string;
  readonly navLabel: string;
  readonly kicker: string;
  readonly blurb: string;
  readonly image: string;
  readonly alt: string;
  readonly maal: readonly string[];
  readonly maalHoved: string;
  readonly laeringsmaal: readonly string[];
  readonly underkapitler: readonly GeografiUnderkapittel[];
  readonly ingress: string;
  readonly status: "utkast";
  /** Har fagtekst, slik at kapittelsiden ikke viser skjelettets ventetekst. */
  readonly tekstKlar?: boolean;
};

const BANNER = "/images/hero-earth.jpg";
const BANNER_ALT = "Jorda sett fra lav bane over hav og skyer";

export const GEOGRAFI_KAPITLER: readonly GeografiKapittel[] = [
  {
    path: "verktoy",
    tekstKlar: true,
    slug: "geo-verktoy",
    title: "Geografisk tenkning og verktøy",
    navLabel: "Verktøy",
    kicker: "Metoder",
    blurb: "Utforske og presentere geografiske forhold med kilder og kart, og forberede feltarbeid.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM487", "KM486"],
    maalHoved: "KM487",
    laeringsmaal: [
      "forklare hva som skiller geografiske spørsmål fra andre spørsmål (hvor, hvorfor der, hva betyr det)",
      "bruke begrepene sted, region, skala, menneske–miljø og bevegelse",
      "lese målestokk, koordinater og høydekurver og velge riktig karttype",
      "vurdere kilder (kart, statistikk, satellittbilder, nettkilder) kritisk",
      "forklare hva GIS er og bruke et enkelt GIS-verktøy"
    ],
    underkapitler: [
      { id: "hva-er-geografi", title: "Hva er geografi" },
      { id: "geografiske-begreper", title: "Geografiske begreper" },
      { id: "kart-og-projeksjoner", title: "Kart og projeksjoner" },
      { id: "koordinater-og-malestokk", title: "Koordinater og målestokk" },
      { id: "lese-topografisk-kart", title: "Lese topografisk kart" },
      { id: "temakart-og-mentale-kart", title: "Temakart og mentale kart" },
      { id: "fjernmaling-og-gis", title: "Fjernmåling og GIS" },
      { id: "kildekritikk", title: "Kildekritikk" }
    ],
    ingress: "Geografi handler om hvor ting er, hvorfor de er der, og hva det betyr. I dette kapitlet skal vi bruke kart, begreper og kilder for å stille geografiske spørsmål.",
    status: "utkast",
  },
  {
    path: "feltarbeid",
    tekstKlar: true,
    slug: "geo-feltarbeid",
    title: "Feltarbeid",
    navLabel: "Felt",
    kicker: "Metoder",
    blurb: "Planlegge, gjennomføre og presentere et geografisk feltarbeid med trygghet og kildekritikk.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM486", "KM487"],
    maalHoved: "KM486",
    laeringsmaal: [
      "formulere en geografisk problemstilling som kan undersøkes i felt",
      "planlegge et feltarbeid (metode, utstyr, sikkerhet, tid)",
      "samle inn data med observasjon, telling, måling, intervju, foto og GPS",
      "bearbeide data til kart, diagrammer og tabeller",
      "presentere funnene og vurdere feilkilder"
    ],
    underkapitler: [
      { id: "hva-er-feltarbeid", title: "Hva er feltarbeid" },
      { id: "problemstilling-og-plan", title: "Problemstilling og plan" },
      { id: "metoder-i-felt", title: "Metoder i felt" },
      { id: "sikkerhet-og-etikk", title: "Sikkerhet og etikk" },
      { id: "bearbeide-data", title: "Bearbeide data" },
      { id: "presentere-feltarbeid", title: "Presentere feltarbeid" }
    ],
    ingress: "Feltarbeid er å undersøke geografiske forhold ute. I dette kapitlet skal vi planlegge, samle inn, bearbeide og presentere data.",
    status: "utkast",
  },
  {
    path: "indre-krefter",
    tekstKlar: true,
    slug: "geo-indre-krefter",
    title: "Indre krefter: platetektonikk, jordskjelv og vulkaner",
    navLabel: "Indre",
    kicker: "Landskap",
    blurb: "Jordas oppbygning, platetektonikk, jordskjelv, vulkaner og berggrunn — egne Vg1-sider for Geografi.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM480", "KM483"],
    maalHoved: "KM480",
    laeringsmaal: [
      "beskrive jordas oppbygning og forklare platetektonikk",
      "forklare hva som skjer ved spredningsrygger, subduksjonssoner, kollisjonssoner og transformforkastninger",
      "forklare årsaker til jordskjelv, vulkanutbrudd og tsunamier og hvor de skjer",
      "gjøre rede for bergartenes kretsløp og hovedtrekk i Norges berggrunn",
      "gi eksempler på hvordan mennesker utnytter ressurser i vulkanske og tektonisk aktive områder"
    ],
    underkapitler: [
      { id: "geologisk-tid", title: "Geologisk tid" },
      { id: "jordas-oppbygning", title: "Jordas oppbygning" },
      { id: "platetektonikk", title: "Platetektonikk" },
      { id: "jordskjelv", title: "Jordskjelv" },
      { id: "vulkaner", title: "Vulkaner" },
      { id: "tsunamier", title: "Tsunamier" },
      { id: "bergarter", title: "Bergarter" },
      { id: "norges-berggrunn", title: "Norges berggrunn" },
      { id: "ressurser-i-aktive-omrader", title: "Ressurser i aktive områder" }
    ],
    ingress: "Indre krefter bygger opp landskap gjennom plater, skjelv og vulkaner. I dette kapitlet skal vi følge prosessene fra jordas indre til overflaten.",
    status: "utkast",
  },
  {
    path: "landskap",
    tekstKlar: true,
    slug: "geo-landskap",
    title: "Ytre krefter og landskapet i Norge",
    navLabel: "Landskap",
    kicker: "Landskap",
    blurb: "Forvitring, is, elver og kyst former landskapet, og landformene påvirker bosetting og ressursbruk.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM480", "KM483"],
    maalHoved: "KM480",
    laeringsmaal: [
      "forklare forvitring, erosjon, transport og avsetning",
      "forklare hvordan isbreer, elver, vind og hav har formet norske landskap",
      "kjenne igjen landformer som fjorder, botner, morener, raviner, deltaer og strandflater",
      "forklare hvordan landformer og løsmasser påvirker bosetting, jordbruk og ressursbruk"
    ],
    underkapitler: [
      { id: "ytre-krefter", title: "Ytre krefter" },
      { id: "istider-og-isbreer", title: "Istider og isbreer" },
      { id: "landformer-fra-is", title: "Landformer fra is" },
      { id: "landhevning-og-marin-grense", title: "Landhevning og marin grense" },
      { id: "elver-og-landformer", title: "Elver og landformer" },
      { id: "kystlandskapet", title: "Kystlandskapet" },
      { id: "landskap-og-mennesker", title: "Landskap og mennesker" }
    ],
    ingress: "Ytre krefter bryter ned og bygger opp. I dette kapitlet skal vi se hvordan is, elver og hav har formet Norge, og hva det betyr for bosetting.",
    status: "utkast",
  },
  {
    path: "klima",
    tekstKlar: true,
    slug: "geo-klima",
    title: "Vær, klima og klimaendringer",
    navLabel: "Klima",
    kicker: "Klima",
    blurb: "Vær og klima, sirkulasjoner, drivhuseffekt og hva klimaendringer betyr lokalt og globalt.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM482", "KM483", "KM485"],
    maalHoved: "KM482",
    laeringsmaal: [
      "forklare forskjellen på vær og klima og lese klimadiagrammer",
      "forklare de globale vind- og havstrømmene og klimasonene",
      "forklare hvorfor Norge har kyst- og innlandsklima, og hva fønvind er",
      "forklare drivhuseffekten og årsakene til menneskeskapte klimaendringer",
      "utforske hva klimaendringer betyr for natur og samfunn lokalt, regionalt og globalt",
      "skille mellom utslippskutt og klimatilpasning"
    ],
    underkapitler: [
      { id: "vaer-og-klima", title: "Vær og klima" },
      { id: "globale-sirkulasjoner", title: "Globale sirkulasjoner" },
      { id: "klimasoner", title: "Klimasoner" },
      { id: "norges-klima", title: "Norges klima" },
      { id: "drivhuseffekten", title: "Drivhuseffekten" },
      { id: "klimaendringer-na", title: "Klimaendringer nå" },
      { id: "klimaendringer-i-norge", title: "Klimaendringer i Norge" },
      { id: "klimaendringer-globalt", title: "Klimaendringer globalt" },
      { id: "kutt-og-tilpasning", title: "Kutt og tilpasning" }
    ],
    ingress: "Klima er gjennomsnittsvær over lang tid. I dette kapitlet skal vi forklare sirkulasjoner, drivhuseffekt og konsekvenser av klimaendringer.",
    status: "utkast",
  },
  {
    path: "naturfare",
    tekstKlar: true,
    slug: "geo-naturfare",
    title: "Naturfare og katastrofer",
    navLabel: "Naturfare",
    kicker: "Fare",
    blurb: "Skille fare, risiko og sårbarhet, og utforske en aktuell natur- eller miljøkatastrofe.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM483", "KM482", "KM487"],
    maalHoved: "KM483",
    laeringsmaal: [
      "skille mellom naturfare, risiko, sårbarhet og katastrofe",
      "forklare årsaker til ulike naturfarer (skred, flom, storm, tørke, jordskjelv)",
      "skille mellom natur- og miljøkatastrofer",
      "utforske én aktuell katastrofe ved hjelp av kilder og kart, med årsaker og konsekvenser for mennesker, samfunn og natur",
      "vurdere tiltak for forebygging, varsling og beredskap"
    ],
    underkapitler: [
      { id: "risiko-og-sarbarhet", title: "Risiko og sårbarhet" },
      { id: "skred-i-norge", title: "Skred i Norge" },
      { id: "flom-og-overvann", title: "Flom og overvann" },
      { id: "stormer-orkaner-og-tornadoer", title: "Stormer, orkaner og tornadoer" },
      { id: "torke-og-skogbrann", title: "Tørke og skogbrann" },
      { id: "miljokatastrofer", title: "Miljøkatastrofer" },
      { id: "forebygging-og-varsling", title: "Forebygging og varsling" },
      { id: "undersok-en-katastrofe", title: "Undersøk en katastrofe" }
    ],
    ingress: "Naturfare blir en katastrofe når mennesker og verdier rammes. I dette kapitlet skal vi vurdere risiko, sårbarhet og beredskap.",
    status: "utkast",
  },
  {
    path: "ressurser",
    slug: "geo-ressurser",
    title: "Naturressurser og arealbruk",
    navLabel: "Ressurser",
    kicker: "Ressurser",
    blurb: "Ressurstyper, arealbruk og interessekonflikter i Norge, Sápmi og nordområdene.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM481", "KM480", "KM485"],
    maalHoved: "KM481",
    laeringsmaal: [
      "skille mellom fornybare, betinget fornybare og ikke-fornybare ressurser",
      "forklare hvordan berggrunn og landskap gir ressurser (malm, mineraler, olje og gass, vannkraft, jord, skog, fisk)",
      "drøfte interessekonflikter om ressurs- og arealbruk i Norge, Sápmi og nordområdene",
      "vurdere ressursbruk i et bærekraftsperspektiv"
    ],
    underkapitler: [
      { id: "hva-er-ressurser", title: "Hva er ressurser" },
      { id: "fornybare-ressurser", title: "Fornybare ressurser" },
      { id: "ressurser-i-berggrunnen", title: "Ressurser i berggrunnen" },
      { id: "olje-og-gass", title: "Olje og gass" },
      { id: "energi", title: "Energi" },
      { id: "arealbruk-og-konflikter", title: "Arealbruk og konflikter" },
      { id: "sapmi-og-reindrift", title: "Sápmi og reindrift" },
      { id: "nordomradene", title: "Nordområdene" }
    ],
    ingress: "Ressurser er naturgitte, men mennesker gjør dem verdifulle. I dette kapitlet skal vi drøfte arealbruk og konflikter i Norge, Sápmi og nordområdene.",
    status: "utkast",
  },
  {
    path: "baerekraft",
    tekstKlar: true,
    slug: "geo-baerekraft",
    title: "Bærekraftig utvikling",
    navLabel: "Bærekraft",
    kicker: "Bærekraft",
    blurb: "Utvikling, bærekraftsmål, fotavtrykk og Norges ressursbruk i et globalt perspektiv.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM485", "KM484", "KM481"],
    maalHoved: "KM485",
    laeringsmaal: [
      "forklare ulike syn på hva «utvikling» er, og bruke mål på utvikling (BNP, HDI og andre)",
      "forklare de tre dimensjonene av bærekraftig utvikling og FNs bærekraftsmål",
      "forklare planetære grenser og økologisk fotavtrykk",
      "reflektere over din egen og Norges ressursbruk i et globalt perspektiv",
      "drøfte dilemmaer og tiltak på ulike geografiske nivåer"
    ],
    underkapitler: [
      { id: "hva-er-utvikling", title: "Hva er utvikling" },
      { id: "mal-pa-utvikling", title: "Mål på utvikling" },
      { id: "baerekraftbegrepet", title: "Bærekraftbegrepet" },
      { id: "planetare-grenser", title: "Planetære grenser" },
      { id: "ditt-fotavtrykk", title: "Ditt fotavtrykk" },
      { id: "norges-ressursbruk", title: "Norges ressursbruk" },
      { id: "dilemmaer", title: "Dilemmaer" },
      { id: "veien-videre", title: "Veien videre" }
    ],
    ingress: "Bærekraft balanserer økonomi, samfunn og miljø. I dette kapitlet skal vi måle utvikling og reflektere over ressursbruk.",
    status: "utkast",
  },
  {
    path: "naering",
    slug: "geo-naering",
    title: "Næringsliv og globalisering",
    navLabel: "Næring",
    kicker: "Samfunn",
    blurb: "Næringsstruktur, lokalisering, verdikjeder og hvordan forbruk påvirker produksjon andre steder.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM485", "KM481", "KM484"],
    maalHoved: "KM485",
    laeringsmaal: [
      "forklare endringer i næringsstrukturen (primær-, sekundær- og tertiærnæring)",
      "forklare lokaliseringsfaktorer og ringvirkninger",
      "forklare internasjonal arbeidsdeling, verdikjeder og flernasjonale selskaper",
      "reflektere over hvordan forbruket vårt påvirker produksjon og miljø andre steder"
    ],
    underkapitler: [
      { id: "naeringsstruktur", title: "Næringsstruktur" },
      { id: "lokalisering", title: "Lokalisering" },
      { id: "ringvirkninger", title: "Ringvirkninger" },
      { id: "globalisering", title: "Globalisering" },
      { id: "internasjonal-arbeidsdeling", title: "Internasjonal arbeidsdeling" },
      { id: "verdikjeder", title: "Verdikjeder" },
      { id: "forbruk-og-ansvar", title: "Forbruk og ansvar" }
    ],
    ingress: "Næringslivet er geografisk. I dette kapitlet skal vi følge lokalisering, verdikjeder og globalisering.",
    status: "utkast",
  },
  {
    path: "befolkning",
    slug: "geo-befolkning",
    title: "Befolkning og levekår",
    navLabel: "Befolkning",
    kicker: "Samfunn",
    blurb: "Demografiske mål, befolkningspyramider, overgangsmodellen og ulike levekår i verden.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM484", "KM485"],
    maalHoved: "KM484",
    laeringsmaal: [
      "bruke den demografiske grunnformelen og regne fødsels-, døds- og migrasjonsrate",
      "forklare hva som påvirker fruktbarhet og dødelighet",
      "lese og tolke befolkningspyramider",
      "forklare den demografiske overgangsmodellen og dens begrensninger",
      "drøfte forskjeller i levekår i ulike deler av verden"
    ],
    underkapitler: [
      { id: "befolkningsvekst", title: "Befolkningsvekst" },
      { id: "demografiske-mal", title: "Demografiske mål" },
      { id: "fruktbarhet-og-dodelighet", title: "Fruktbarhet og dødelighet" },
      { id: "befolkningspyramider", title: "Befolkningspyramider" },
      { id: "demografisk-overgang", title: "Demografisk overgang" },
      { id: "befolkningsteorier", title: "Befolkningsteorier" },
      { id: "levekar-i-verden", title: "Levekår i verden" },
      { id: "befolkning-i-norge", title: "Befolkning i Norge" }
    ],
    ingress: "Befolkningen endres gjennom fødsler, dødsfall og flytting. I dette kapitlet skal vi lese pyramider og drøfte levekår.",
    status: "utkast",
  },
  {
    path: "migrasjon",
    slug: "geo-migrasjon",
    title: "Migrasjon",
    navLabel: "Migrasjon",
    kicker: "Samfunn",
    blurb: "Typer migrasjon, skyve- og trekkfaktorer, flytting i Norge og den globale flyktningsituasjonen.",
    image: BANNER,
    alt: BANNER_ALT,
    maal: ["KM484", "KM481"],
    maalHoved: "KM484",
    laeringsmaal: [
      "skille mellom ulike typer migrasjon",
      "forklare skyve- og trekkfaktorer",
      "forklare sentralisering og flyttestrømmer i Norge",
      "beskrive utvandring fra og innvandring til Norge over tid",
      "drøfte global migrasjon, flyktningsituasjonen og ansvar"
    ],
    underkapitler: [
      { id: "hva-er-migrasjon", title: "Hva er migrasjon" },
      { id: "hvorfor-folk-flytter", title: "Hvorfor folk flytter" },
      { id: "flytting-i-norge", title: "Flytting i Norge" },
      { id: "utvandring-og-innvandring", title: "Utvandring og innvandring" },
      { id: "global-migrasjon", title: "Global migrasjon" },
      { id: "flyktninger", title: "Flyktninger" },
      { id: "menneskehandel", title: "Menneskehandel" }
    ],
    ingress: "Folk flytter av mange grunner. I dette kapitlet skal vi skille typer migrasjon og se på Norge og verden.",
    status: "utkast",
  },
] as const;

export function geografiKapittel(path: string): GeografiKapittel | undefined {
  return GEOGRAFI_KAPITLER.find((k) => k.path === path);
}

export function geografiKapittelBySlug(slug: string): GeografiKapittel | undefined {
  return GEOGRAFI_KAPITLER.find((k) => k.slug === slug);
}

