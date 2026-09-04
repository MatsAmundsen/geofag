export const NAV_HUB = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Geofag 1" },
  { to: "/geofag-2", label: "Geofag 2" },
] as const;

export const NAV_GF1 = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Oversikt" },
  { to: "/geofag-1/jordsystemene", label: "Sfærer" },
  { to: "/geofag-1/platetektonikk", label: "Plater" },
  { to: "/geofag-1/vulkaner-og-jordskjelv", label: "Vulkan" },
  { to: "/geofag-1/bergarter-og-landformer", label: "Berg" },
  { to: "/geofag-1/vann-og-flom", label: "Vann" },
  { to: "/geofag-1/skred", label: "Skred" },
  { to: "/geofag-1/geologiske-ressurser", label: "Ressurs" },
  { to: "/geofag-1/feltarbeid", label: "Felt" },
] as const;

export const NAV_GF2 = [
  { to: "/", label: "Forside" },
  { to: "/geofag-2", label: "Oversikt" },
  { to: "/eksamen", label: "Eksamen" },
  { to: "/tema/hoytrykk-lavtrykk", label: "Trykk" },
  { to: "/tema/vindsystemet", label: "Vind" },
  { to: "/tema/jetstrommer", label: "Jet" },
  { to: "/tema/coriolis", label: "Coriolis" },
  { to: "/tema/havstrommer", label: "Hav" },
  { to: "/tema/klima", label: "Klima" },
  { to: "/tema/numeriske-modeller", label: "Modeller" },
  { to: "/tema/paleoklima", label: "Paleo" },
  { to: "/tema/milankovitch", label: "Istider" },
  { to: "/tema/vaerkatastrofer", label: "Farer" },
] as const;

/** @deprecated use NAV_GF2 — kept so older imports still typecheck during the move */
export const NAV = NAV_GF2;

export function navForPath(pathname: string) {
  if (pathname === "/") return NAV_HUB;
  if (pathname.startsWith("/geofag-1")) return NAV_GF1;
  return NAV_GF2;
}

export function brandForPath(pathname: string) {
  if (pathname.startsWith("/geofag-1")) {
    return { title: "Geofag 1", sub: "Jorda under oss" };
  }
  if (
    pathname.startsWith("/geofag-2") ||
    pathname.startsWith("/tema") ||
    pathname.startsWith("/eksamen")
  ) {
    return { title: "Geofag 2", sub: "Hav, luft og klima" };
  }
  return { title: "Geofag", sub: "Naturfarer, vær og klima" };
}

export const GF2_THEMES = [
  {
    to: "/tema/hoytrykk-lavtrykk",
    title: "Høytrykk og lavtrykk",
    kicker: "Atmosfæren",
    image: "/images/banner-trykk.jpg",
    alt: "Kyst i to slags vær: storm til venstre, klar himmel til høyre",
    blurb:
      "Luft har vekt. Der den stiger, blir det lavtrykk og ofte skyer. Der den synker, blir det høytrykk og ofte klarvær. Start her.",
    status: "klar" as const,
  },
  {
    to: "/tema/vindsystemet",
    title: "Det globale vindsystemet",
    kicker: "Atmosfæren",
    image: "/images/tema-vind.jpg",
    alt: "Skybånd og værsystemer over Nord-Atlanteren sett fra satellitt",
    blurb:
      "Hadley, Ferrel og polarcellen. Ørken der luft synker, regnskog der den stiger, vestavind over Norge.",
    status: "klar" as const,
  },
  {
    to: "/tema/jetstrommer",
    title: "Jetstrømmer",
    kicker: "Atmosfæren",
    image: "/images/fig-jet.jpg",
    alt: "Tynn, rask skyelv høyt over havet mot jordas krumning",
    blurb:
      "En elv av luft i 8–12 km høyde, i godt over 200 km/t. Den avgjør hvor lavtrykkene får gå — og dermed været i Norge.",
    status: "klar" as const,
  },
  {
    to: "/tema/coriolis",
    title: "Corioliseffekten",
    kicker: "Jordrotasjon",
    image: "/images/banner-coriolis.jpg",
    alt: "Jorda med spiralformede syklonskyer",
    blurb:
      "Trykk setter lufta i gang. Rotasjonen dreier den. Derfor spinner lavtrykk, og vasken lyver.",
    status: "klar" as const,
  },
  {
    to: "/tema/havstrommer",
    title: "Havstrømmer",
    kicker: "Havet",
    image: "/images/tema-strommer.jpg",
    alt: "Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm",
    blurb:
      "Vind, tetthet og jordrotasjon flytter varme i havet. Golfstrømmen og AMOC er grunnen til at Norge er mildt på 60°N.",
    status: "klar" as const,
  },
  {
    to: "/tema/klima",
    title: "Klima",
    kicker: "Jordsystemet",
    image: "/images/tema-klima.jpg",
    alt: "Grønlands innlandsis mot mørkt polarhav",
    blurb:
      "Luft, hav og is henger sammen over år og årtusener. Tilbakekoblinger, ENSO og menneskeskapt pådriv.",
    status: "klar" as const,
  },
  {
    to: "/tema/numeriske-modeller",
    title: "Numeriske modeller",
    kicker: "Modeller",
    image: "/images/fig-klimasystem.jpg",
    alt: "Jorda fra verdensrommet med tynn atmosfære, hav og is — det modellene beskriver",
    blurb:
      "En numerisk modell i geofag er ikke et værkart på en datamaskin. Den er fysikk regnet på et rutenett.",
    status: "klar" as const,
  },
  {
    to: "/tema/paleoklima",
    title: "Paleoklima",
    kicker: "Arkiv",
    image: "/images/fig-paleo.jpg",
    alt: "Lagdelt blå breis med bølgende bånd av gammel is",
    blurb:
      "Termometer dekker et øyeblikk. Iskjerner og havbunn forteller istidene — og tester om modellene treffer.",
    status: "klar" as const,
  },
  {
    to: "/tema/milankovitch",
    title: "Milankovitch-syklusen og istider",
    kicker: "Istider",
    image: "/images/tema-milankovitch.jpg",
    alt: "Innlandsis som kalver i mørkt polarhav, med isfjell og isdekt kyst i bakgrunnen",
    blurb:
      "Jordbanen flytter sommersola på 65 °N. Albedo og CO₂ forsterker. Weichsel sluttet for 11 700 år siden — sporene ligger i fjord og Raet.",
    status: "klar" as const,
  },
  {
    to: "/tema/vaerkatastrofer",
    title: "Værkatastrofer",
    kicker: "Naturfarer",
    image: "/images/tema-katastrofer.jpg",
    alt: "En atlantisk orkan sett fra verdensrommet, med tydelig øye",
    blurb:
      "Orkaner, ekstremnedbør og stormflo er værsystemer drevet av samme fysikk. Risikoen forskyves når klimaet endres.",
    status: "klar" as const,
  },
] as const;

export const THEMES = GF2_THEMES;

export const GF1_THEMES = [
  {
    slug: "jordsystemene",
    to: "/geofag-1/jordsystemene",
    title: "Jordsystemene",
    kicker: "Geosfære og hydrosfære",
    image: "/images/gf1-jordsystemene.jpg",
    alt: "Jordskorpe og mantel mot et elvelandskap på overflaten",
    blurb:
      "Geosfære, hydrosfære, atmosfære, kryosfære og biosfære henger sammen. Her: vekselvirkningene som former land og ferskvann.",
    status: "klar" as const,
    maal: "Vekselvirkninger mellom jordsystemene og hvordan de påvirker geosfæren og hydrosfæren.",
  },
  {
    slug: "platetektonikk",
    to: "/geofag-1/platetektonikk",
    title: "Platetektonikk",
    kicker: "Jordas indre",
    image: "/images/gf1-platetektonikk.jpg",
    alt: "Midthavsrygg og plategrense sett fra høyde",
    blurb:
      "Bevegelser i mantelen driver platene. Konsekvensene skriver seg i jordskorpa: spredning, kollisjon, forkastning.",
    status: "klar" as const,
    maal: "Bevegelser i jordas indre og konsekvenser for jordskorpe og overflate.",
  },
  {
    slug: "vulkaner-og-jordskjelv",
    to: "/geofag-1/vulkaner-og-jordskjelv",
    title: "Vulkaner og jordskjelv",
    kicker: "Naturfarer i geosfæren",
    image: "/images/gf1-vulkan-jordskjelv.jpg",
    alt: "Snødekt stratovulkan med aske og oppsprukket dal",
    blurb:
      "Der platene møtes, bygges spenning og magma. Risiko, varsling og hvordan samfunn kan forebygge og tilpasse seg.",
    status: "klar" as const,
    maal: "Naturfarer knyttet til geosfæren. Risiko, forebygging og tilpasning.",
  },
  {
    slug: "bergarter-og-landformer",
    to: "/geofag-1/bergarter-og-landformer",
    title: "Bergarter og landformer",
    kicker: "Bergartssyklusen",
    image: "/images/gf1-bergarter.jpg",
    alt: "Lagdelt sedimentær klippe og isskurt fjordlandskap",
    blurb:
      "Mineraler, bergarter og sedimenter. Datering. Hvordan indre og ytre krefter — og mennesker — lager og endrer landformer.",
    status: "klar" as const,
    maal: "Mineral- og bergartsgrupper, datering, lokal geologi og landformer.",
  },
  {
    slug: "vann-og-flom",
    to: "/geofag-1/vann-og-flom",
    title: "Vann og flom",
    kicker: "Hydrosfæren på land",
    image: "/images/gf1-flom-skred.jpg",
    alt: "Flomelv ved et fjellskred i norsk landskap",
    blurb:
      "Kretsløp, lager, hydrogram. Regnflom, snøsmelteflom og kombinasjonsflom. Hans 2023. NVE-flomkart og Varsom.",
    status: "klar" as const,
    maal: "Hydrologisk kretsløp, ferskvann, flom og modellering av risiko i hydrosfæren.",
  },
  {
    slug: "skred",
    to: "/geofag-1/skred",
    title: "Skred",
    kicker: "Naturfarer i geosfæren",
    image: "/images/fig-ravine.jpg",
    alt: "Ravine og skredløp i løsmasse",
    blurb:
      "Steinskred, fjellskred, løsmasseskred og havbunnsskred. Åknes, Tafjord, Gjerdrum, Storegga. Snøskred hører i geofag 2.",
    status: "klar" as const,
    maal: "Naturfarer knyttet til geosfæren: skred, risiko, forebygging og tilpasning.",
  },
  {
    slug: "geologiske-ressurser",
    to: "/geofag-1/geologiske-ressurser",
    title: "Geologiske ressurser",
    kicker: "Mennesket i jordsystemene",
    image: "/images/gf1-ressurser.jpg",
    alt: "Dagbrudd i fjellandskap i kveldslys",
    blurb:
      "Malm, pukk, naturstein, olje og gass. Danning, kartlegging, utvinning og bærekraft. Engebø er en drøfting, ikke et fasitsvar.",
    status: "klar" as const,
    maal: "Utvinning av geologiske ressurser i et bærekraftsperspektiv.",
  },
  {
    slug: "feltarbeid",
    to: "/geofag-1/feltarbeid",
    title: "Feltarbeid",
    kicker: "Data i felt",
    image: "/images/gf1-bergarter.jpg",
    alt: "Lagdelt sedimentær klippe og isskurt fjordlandskap",
    blurb:
      "Planlegge, samle georefererte data, ivareta HMS, bearbeide, tolke og presentere. Feltboka er primærkilden.",
    status: "klar" as const,
    maal: "Geofaglig feltarbeid i geosfære eller hydrosfære.",
  },
] as const;

export const KLIMA_SUBTHEMES = [
  {
    to: "/tema/klima/oversikt",
    title: "Klimasystemet (oversikt)",
    kicker: "Jordsystemet & Drivhuseffekt",
    image: "/images/fig-klimasystem.jpg",
    alt: "Jorda fra verdensrommet med tynn atmosfære, hav og is",
    blurb:
      "Vær er dager, klima er tiår. De fem delene av klimasystemet, strålingsbalanse, drivhuseffekt, pådriv og tilbakekoblinger.",
    status: "klar" as const,
  },
  {
    to: "/tema/klima/enso",
    title: "ENSO",
    subtitle: "El Niño–Sørlige oscillasjon",
    kicker: "Tropisk Stillehav",
    image: "/images/fig-enso.jpg",
    alt: "Det tropiske Stillehavet med passatvinder og varmt vann",
    blurb:
      "Walker-sirkulasjonen, El Niño og La Niña. Hvordan svekkede passatvinder forskyver regnmønstre og påvirker været globalt.",
    status: "klar" as const,
  },
  {
    to: "/tema/klima/iod",
    title: "IOD",
    subtitle: "Den indiske hav-dipolen",
    kicker: "Det indiske hav",
    image: "/images/fig-iod-positiv.png",
    alt: "Positiv IOD: varmere hav utenfor Øst-Afrika, kaldere utenfor Indonesia",
    blurb:
      "Temperaturgradienten i Det indiske hav. Positiv og negativ fase, samspill med monsunen og ekstreme tørke- og flomperioder.",
    status: "klar" as const,
  },
  {
    to: "/tema/klima/nao",
    title: "NAO",
    subtitle: "Den nordatlantiske oscillasjon",
    kicker: "Nord-Atlanteren",
    image: "/images/fig-nao.jpg",
    alt: "Trykksystemer og stormbaner over Nord-Atlanteren inn mot Norge",
    blurb:
      "Trykkgradienten mellom Asorene og Island. Positiv fase gir milde og våte vintre i Norge, mens negativ fase gir kalde blokkeringer.",
    status: "klar" as const,
  },
  {
    to: "/tema/klima/amoc",
    title: "AMOC",
    subtitle: "Den atlantiske omveltningssirkulasjonen",
    kicker: "Termohalin sirkulasjon",
    image: "/images/fig-amoc.jpg",
    alt: "Nord-Atlanteren med varm overflatestrøm nordover og kald dypstrøm sørover",
    blurb:
      "Havets store transportbånd. Dypvannsdannelse i Norskehavet og Labradorhavet, ferskvannspådrag, stabilitet og klimaeffekt for Norge.",
    status: "klar" as const,
  },
] as const;

export function gf1Theme(slug: string) {
  return GF1_THEMES.find((t) => t.slug === slug);
}

/** All canonical theme paths (G1 + G2), for sitemap/SEO use. Excludes `$slug` and redirect routes. */
export function allThemePaths(): string[] {
  return [
    ...GF1_THEMES.map((t) => t.to),
    ...GF2_THEMES.map((t) => t.to),
    ...KLIMA_SUBTHEMES.map((t) => t.to),
  ];
}
