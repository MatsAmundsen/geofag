export const NAV_HUB = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Geofag 1" },
  { to: "/geofag-2", label: "Geofag 2" },
  { to: "/poster", label: "Poster" },
] as const;

export const NAV_GF1 = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Oversikt" },
  { to: "/geofag-1/jordsystemene", label: "Sfærer" },
  { to: "/geofag-1/platetektonikk", label: "Plater" },
  { to: "/geofag-1/vulkaner", label: "Vulkaner" },
  { to: "/geofag-1/jordskjelv", label: "Jordskjelv" },
  { to: "/geofag-1/jordskjelv-naturfare", label: "Skjelvfare" },
  { to: "/geofag-1/bergarter", label: "Berg" },
  { to: "/geofag-1/geologisk-tid", label: "Tid" },
  { to: "/geofag-1/norges-geologi", label: "Norge" },
  { to: "/geofag-1/landformer", label: "Landform" },
  { to: "/geofag-1/isbreer-og-landformer", label: "Isbre" },
  { to: "/geofag-1/vann-og-flom", label: "Vann" },
  { to: "/geofag-1/skred", label: "Skred" },
  { to: "/geofag-1/geologiske-ressurser", label: "Ressurs" },
  { to: "/geofag-1/feltarbeid", label: "Felt" },
  { to: "/poster", label: "Poster" },
] as const;

/**
 * Geofag 1-menyen er for lang til én rad ved siden av logoen på 1024 og 768 px.
 * Rad 1 er inngang, jordas indre og jordskjelv (begge sidene). Rad 2 er bergarter, Norge,
 * landskap og samfunn.
 * Rekkefølgen er den samme som NAV_GF1.
 */
export const NAV_GF1_ROWS = [NAV_GF1.slice(0, 8), NAV_GF1.slice(8)] as const;

export const NAV_GF2 = [
  { to: "/", label: "Forside" },
  { to: "/geofag-2", label: "Oversikt" },
  { to: "/eksamen", label: "Eksamen" },
  { to: "/tema/hoytrykk-lavtrykk", label: "Trykk" },
  { to: "/tema/vindsystemet", label: "Vind" },
  { to: "/tema/vaerkart", label: "Værkart" },
  { to: "/tema/lokale-vaersystemer", label: "Lokalt" },
  { to: "/tema/skyer-nedbor-klimasoner", label: "Skyer" },
  { to: "/tema/jetstrommer", label: "Jet" },
  { to: "/tema/coriolis", label: "Coriolis" },
  { to: "/tema/havstrommer", label: "Hav" },
  { to: "/tema/klima", label: "Klima" },
  { to: "/tema/kryosfaeren", label: "Is" },
  { to: "/tema/numeriske-modeller", label: "Modeller" },
  { to: "/tema/paleoklima", label: "Paleo" },
  { to: "/tema/milankovitch", label: "Istider" },
  { to: "/tema/naturlige-klimapadriv", label: "Naturlig" },
  { to: "/tema/vaerkatastrofer", label: "Farer" },
  { to: "/tema/tilpasning", label: "Tilpasning" },
  { to: "/tema/energi-hav-luft", label: "Energi" },
  { to: "/tema/energi-regning", label: "Regning" },
  { to: "/tema/klimaendring-menneskeskapt", label: "Menneske" },
  { to: "/tema/klimatiltak", label: "Tiltak" },
  { to: "/tema/klimaforskning", label: "Forskning" },
  { to: "/tema/felt-hav-luft-is", label: "Felt" },
  { to: "/poster", label: "Poster" },
] as const;

/**
 * Geofag 2-menyen er for lang til én rad innenfor max-w-6xl.
 * Rad 1 er inngang, vær og hav. Rad 2 er klima, is, samfunn og metode.
 * Rekkefølgen er den samme som NAV_GF2.
 */
export const NAV_GF2_ROWS = [NAV_GF2.slice(0, 11), NAV_GF2.slice(11)] as const;

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
    to: "/tema/vaerkart",
    title: "Værkart og værutvikling",
    kicker: "Atmosfæren",
    image: "/images/fig-lavtrykk-hav.jpg",
    alt: "Lavtrykk over hav med spiralformede skyer — utgangspunktet for et synoptisk kart",
    blurb:
      "Synoptiske bakkekart, WMO-stasjonsmodeller, 500 hPa styrestrøm, radar og satellitt. Slik tolker og forutsier du været trinn for trinn.",
    status: "klar" as const,
  },
  {
    to: "/tema/lokale-vaersystemer",
    title: "Lokale og regionale værsystemer",
    kicker: "Atmosfæren",
    image: "/images/fig-polarfront.jpg",
    alt: "Polarfronten som bølge mellom kald og varm luft, med lavtrykk i bølgen",
    blurb:
      "Polarfrontsyklon steg for steg. Sjøbris, dalvind og føn. Samme fysikk i tre målestokker.",
    status: "klar" as const,
  },
  {
    to: "/tema/skyer-nedbor-klimasoner",
    title: "Skyer, nedbør og klimasoner",
    kicker: "Atmosfæren",
    image: "/images/fig-stigende.jpg",
    alt: "Mørke, høye skyer med nedbør under",
    blurb:
      "Fra vanndamp til sky og nedbør. Skytyper, kyst og innland, høyde, urbane varmeøyer og Köppens klimasoner.",
    status: "klar" as const,
  },
  {
    to: "/tema/jetstrommer",
    title: "Jetstrømmer",
    kicker: "Atmosfæren",
    image: "/images/fig-jet.jpg",
    alt: "Tynn, rask skyelv høyt over havet mot jordas krumning",
    blurb:
      "Et smalt belte med sterk vestavind i 8–12 km høyde. Det påvirker hvor lavtrykkene går, og dermed været i Norge.",
    status: "klar" as const,
  },
  {
    to: "/tema/coriolis",
    title: "Corioliseffekten",
    kicker: "Jordrotasjon",
    image: "/images/banner-coriolis.jpg",
    alt: "Jorda med spiralformede syklonskyer",
    blurb:
      "Trykk setter lufta i gang. Rotasjonen dreier den. Derfor spinner lavtrykk, og vasken er et dårlig bevis.",
    status: "klar" as const,
  },
  {
    to: "/tema/havstrommer",
    title: "Havstrømmer",
    kicker: "Havet",
    image: "/images/tema-strommer.jpg",
    alt: "Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm",
    blurb:
      "Vind, jordrotasjon og tetthet driver havstrømmene. Den norske atlanterhavsstrømmen og vinden gir Norge et mildt klima.",
    status: "klar" as const,
  },
  {
    to: "/tema/klima",
    title: "Klima",
    kicker: "Jordsystemet",
    image: "/images/banner-klima.jpg",
    alt: "Grønlands innlandsis mot mørkt polarhav",
    blurb:
      "Kart over klimasystemet. Stråling og tilbakekobling står i oversikten. ENSO, IOD, NAO og AMOC har hver sin side.",
    status: "klar" as const,
  },
  {
    to: "/tema/kryosfaeren",
    title: "Kryosfæren",
    kicker: "Is og snø",
    image: "/images/fig-albedo.jpg",
    alt: "Is og snø mot mørkt hav — albedoen som styrer massebalansen i år",
    blurb:
      "Breer, permafrost, havis og snø, og snøskredvarselet. Istidene står i paleoklima og istider.",
    status: "klar" as const,
  },
  {
    to: "/tema/numeriske-modeller",
    title: "Numeriske modeller",
    kicker: "Modeller",
    image: "/images/fig-klimasystem.jpg",
    alt: "Jorda fra verdensrommet med tynn atmosfære, hav og is — det modellene beskriver",
    blurb:
      "Rutenett, parameterisering, dataassimilering og ensembler, og de norske modellene MEPS, AROME-Arctic, Norkyst og NorESM.",
    status: "klar" as const,
  },
  {
    to: "/tema/paleoklima",
    title: "Paleoklima",
    kicker: "Arkiv",
    image: "/images/fig-paleo.jpg",
    alt: "Lagdelt blå breis med bølgende bånd av gammel is",
    blurb:
      "Slik leser vi fortiden: iskjerner, oksygenisotoper, havbunn, pollen og årringer. Jordbanen står i neste kapittel.",
    status: "klar" as const,
  },
  {
    to: "/tema/milankovitch",
    title: "Istider",
    kicker: "Istider",
    image: "/images/tema-milankovitch.jpg",
    alt: "Innlandsis som kalver i mørkt polarhav, med isfjell og isdekt kyst i bakgrunnen",
    blurb:
      "Jordbanen endrer hvor mye sol som treffer ulike breddegrader. De tre svingningene forklarer ikke oppvarmingen vi ser nå.",
    status: "klar" as const,
  },
  {
    to: "/tema/naturlige-klimapadriv",
    title: "Naturlige klimapådriv",
    kicker: "Klima over tid",
    image: "/images/banner-naturlige-padriv.jpg",
    alt: "Lav sol over horisonten, et vulkanutbrudd med askesky og en brefront mot mørkt hav med isflak",
    blurb:
      "Sola, vulkanene, platetektonikken, livet og indre variabilitet. Hva som virker på hvilken tidsskala, og hvor mye de betyr for oppvarmingen siden 1850.",
    status: "klar" as const,
  },
  {
    to: "/tema/vaerkatastrofer",
    title: "Værkatastrofer",
    kicker: "Naturfarer",
    image: "/images/tema-katastrofer.jpg",
    alt: "En atlantisk orkan sett fra verdensrommet, med tydelig øye",
    blurb:
      "Orkan som vindstyrke er sterkere enn 32,6 m/s. En tropisk orkan er et lavtrykk med middelvind på minst 119 km/t.",
    status: "klar" as const,
  },
  {
    to: "/tema/tilpasning",
    title: "Konsekvenser og tilpasning",
    kicker: "Samfunn",
    image: "/images/fig-stormflo.jpg",
    alt: "Stormflo mot kai og bebyggelse — der fysikk blir skade",
    blurb:
      "Klimatilpasning er å forstå konsekvensene og sette inn tiltak som reduserer skade. Å redusere og å tilpasse seg er to ulike svar.",
    status: "klar" as const,
  },
  {
    to: "/tema/energi-hav-luft",
    title: "Energi fra hav og atmosfære",
    kicker: "Ressurser",
    image: "/images/fig-passat.jpg",
    alt: "Passatskyer over hav — vinden som energikilde, før den blir kilowatt",
    blurb:
      "Vindkraft gjør vind om til elektrisk energi. Havvind kan stå på sokkelen eller flyte. Tidevann kommer av månen og sola.",
    status: "klar" as const,
  },
  {
    to: "/tema/energi-regning",
    title: "Å regne med energi",
    kicker: "Ressurser",
    image: "/images/fig-innstraling.jpg",
    alt: "Jorda sett fra verdensrommet med sollys inn fra siden — energien alle ressursene bygger på",
    blurb:
      "Fra joule til terawattime, fra effekt til årsproduksjon. Regn brukstid og kapasitetsfaktor for Fosen Vind og Furuseth, og se hvordan kraftmarkedet og prisområdene virker.",
    status: "klar" as const,
  },
  {
    to: "/tema/klimaendring-menneskeskapt",
    title: "Klimaendring og mennesket",
    kicker: "Menneskeskapt klimapåvirkning",
    image: "/images/fig-drivhus.jpg",
    alt: "Jordas kant sett fra bane, med lys fra byer på nattsiden",
    blurb:
      "Karbonkretsløpet, drivhusgasser og GWP, utslipp, karbonbudsjett, SSP-scenarier, Parisavtalen og norske utslipp.",
    status: "klar" as const,
  },
  {
    to: "/tema/klimatiltak",
    title: "Klimatiltak",
    kicker: "Redusere utslipp",
    image: "/images/banner-vind.jpg",
    alt: "Jordas atmosfære med skyer og den tynne blå kanten mot rommet",
    blurb:
      "Hva som må kuttes, tiltak i energi, arealbruk og etterspørsel, virkemidler, rettferdighet, CCS og CDR.",
    status: "klar" as const,
  },
  {
    to: "/tema/klimaforskning",
    title: "Hvordan vet vi det? Klimaforskning",
    kicker: "Observasjoner og IPCC",
    image: "/images/banner-klima.jpg",
    alt: "Iskant ved en stor isbre mot åpent polarhav",
    blurb:
      "IPCC og usikkerhetsspråk, målinger fra stasjoner, Argo, satellitter og droner, proxyer og fingeravtrykk.",
    status: "klar" as const,
  },
  {
    to: "/tema/felt-hav-luft-is",
    title: "Feltarbeid i hav, luft og is",
    kicker: "Metode",
    image: "/images/fig-hoytrykk-fjell.jpg",
    alt: "Norsk fjell under klarvær — felt i luft og is, ikke bergartssnitt",
    blurb:
      "Planlegge, samle inn, bearbeide, tolke og presentere data fra hav, luft eller is. Varselet er et hjelpemiddel.",
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
    maal: "Gjøre rede for vekselvirkninger mellom de ulike jordsystemene og hvordan disse kan påvirke geosfæren og hydrosfæren.",
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
    maal: "Gjøre rede for bevegelser i jordas indre og hvilke konsekvenser de har for jordskorpa og jordoverflaten.",
  },
  {
    slug: "vulkaner",
    to: "/geofag-1/vulkaner",
    title: "Vulkaner",
    kicker: "Naturfarer i geosfæren",
    image: "/images/gf1-vulkan-jordskjelv.jpg",
    alt: "Snødekt stratovulkan med aske og gassutblåsning",
    blurb:
      "Noen vulkaner har rolige lavastrømmer, andre har eksplosive utbrudd. Forskjellen henger sammen med silikat (SiO₂), viskositet og gass. Magmatyper, tre hovedtyper vulkaner og kalderaer, utbruddstyper, farer, overvåking, forebygging og Beerenberg.",
    status: "klar" as const,
    maal: "Gjøre rede for ulike naturfarer knyttet til geosfæren og hydrosfæren, og vurdere hvordan mennesker kan forebygge og tilpasse seg disse farene.",
  },
  {
    slug: "jordskjelv",
    to: "/geofag-1/jordskjelv",
    title: "Jordskjelv og jordas indre",
    kicker: "Jordas indre",
    image: "/images/geo-jordskjelv-bolger-3d.jpg",
    alt: "3D-snitt av forkastningsbrudd, seismiske bølger og overflateskader",
    blurb:
      "Plutselig brudd, skjelvdybde, P-, S- og overflatebølger, magnitude og intensitet, hva bølgene forteller om jordas indre, og hvorfor Norge skjelver.",
    status: "klar" as const,
    maal: "Gjøre rede for bevegelser i jordas indre og hvilke konsekvenser de har for jordskorpa og jordoverflaten.",
  },
  {
    slug: "jordskjelv-naturfare",
    to: "/geofag-1/jordskjelv-naturfare",
    title: "Jordskjelv og tsunamier som naturfare",
    kicker: "Naturfarer i geosfæren",
    image: "/images/geo-jordskjelv-bolger-3d.jpg",
    alt: "3D-snitt av forkastningsbrudd, seismiske bølger og overflateskader",
    blurb:
      "Tsunami fra skjelv og skred, skadetyper, varsling, og fare, eksponering, sårbarhet og risiko vurdert med en enkel modell.",
    status: "klar" as const,
    maal: "Gjøre rede for jordskjelv og tsunamier som naturfarer, vurdere hvordan mennesker kan forebygge og tilpasse seg dem, og vurdere risiko ved hjelp av modellering.",
  },
  {
    slug: "bergarter",
    to: "/geofag-1/bergarter",
    title: "Bergarter og det geologiske kretsløpet",
    kicker: "Geosfærens byggesteiner",
    image: "/images/geo-geologisk-kretslop-3d.jpg",
    alt: "3D-blokkdiagram av det geologiske kretsløpet med magmakammer, sedimentasjonsbasseng og regional metamorfose",
    blurb:
      "Mineraler og mineralgrupper, de tre bergartsgruppene, forvitring og bergartssyklusen som modell. Norske eksempler er gabbro, larvikitt, rombeporfyr, fyllitt og gneis.",
    status: "klar" as const,
    maal: "Utforske ulike mineralgrupper, bergartsgrupper og sedimenter, og tolke hvor de passer inn i bergartssyklusen.",
  },
  {
    slug: "geologisk-tid",
    to: "/geofag-1/geologisk-tid",
    title: "Geologisk tid og datering",
    kicker: "Jordas historie i tall",
    image: "/images/fig-iskjerne.jpg",
    alt: "Årslag i en iskjerne. Lag på lag viser tid.",
    blurb:
      "Geologisk tidsskala, relativ alder med overlagring, gjennomskjæring og ledefossiler, radiometrisk datering og halveringstid, og kvartære metoder som varv, vulkansk aske og ¹⁰Be.",
    status: "klar" as const,
    maal: "Gjøre rede for ulike metoder som brukes for å datere bergarter, og bruke metoder for å identifisere relativ alder.",
  },
  {
    slug: "norges-geologi",
    to: "/geofag-1/norges-geologi",
    title: "Norges geologiske historie",
    kicker: "Landet blir til",
    image: "/images/geo-ofiolitt-leka.jpg",
    alt: "Leka ofiolittkompleks med karakteristisk gulbrun dunitt og peridotitt fra jordens mantel",
    blurb:
      "Fra grunnfjellet og ofiolitten på Leka til den kaledonske fjellkjeden, Oslo-riften, åpningen av Norskehavet, landhevingen etter istiden og hvordan du kan utforske geologien der du bor.",
    status: "klar" as const,
    maal: "Gjøre rede for bevegelser i jordas indre og hvilke konsekvenser de har for jordskorpa og jordoverflaten. Utforske berggrunn, løsmasser og jordarter lokalt, og tolke observasjonene for å beskrive områdets geologiske historie og betydning for lokale ressurser.",
  },
  {
    slug: "landformer",
    to: "/geofag-1/landformer",
    title: "Landformer og geomorfologiske prosesser",
    kicker: "Erosjon, forvitring og landskap",
    image: "/images/fig-vestlandet.jpg",
    alt: "Vestlandsk fjordlandskap med dyp U-dal og bratte fjellsider",
    blurb:
      "Forvitring, erosjon og avsetning, Hjulströms diagram, elvas landformer, gamle vidder og unge fjorder, og hvordan mennesker endrer landformene.",
    status: "klar" as const,
    maal: "Sammenligne ulike landformer og gjøre rede for hvordan de dannes og endres under påvirkning av jordsystemene og menneskelig aktivitet.",
  },
  {
    slug: "isbreer-og-landformer",
    to: "/geofag-1/isbreer-og-landformer",
    title: "Isbreer og landformer",
    kicker: "Isen som agent",
    image: "/images/isbre-nigardsbreen.jpg",
    alt: "Nigardsbreen med isfront og løsmasser foran breen",
    blurb:
      "Det er isen som har formet mest av landskapet vi ser i Norge i dag. Her lærer du hvordan en isbre beveger seg, eroderer og avsetter, og hvordan du kjenner igjen sporene.",
    status: "klar" as const,
    maal: "Sammenligne ulike landformer og gjøre rede for hvordan de dannes og endres under påvirkning av jordsystemene og menneskelig aktivitet.",
  },
  {
    slug: "vann-og-flom",
    to: "/geofag-1/vann-og-flom",
    title: "Vann og flom",
    kicker: "Hydrosfæren på land",
    image: "/images/gf1-flom-skred.jpg",
    alt: "Flomelv ved et fjellskred i norsk landskap",
    blurb:
      "Kretsløp, akvifer og grunnvann, hydrogram og flom, Hans 2023, mennesket og vannet, og bærekraftig bruk av ferskvann.",
    status: "klar" as const,
    maal: "Gjøre rede for det hydrologiske kretsløpet med vekt på ferskvann og utforske og presentere hvordan det påvirkes av menneskelig aktivitet.",
  },
  {
    slug: "skred",
    to: "/geofag-1/skred",
    title: "Skred",
    kicker: "Naturfarer i geosfæren",
    image: "/images/fig-ravine.jpg",
    alt: "Ravine og skredløp i løsmasse",
    blurb:
      "Fjellskred, jordskred og kvikkleire. Åknes, Mannen og Gjerdrum. Kart og varsling.",
    status: "klar" as const,
    maal: "Gjøre rede for ulike naturfarer knyttet til geosfæren og hydrosfæren, og vurdere hvordan mennesker kan forebygge og tilpasse seg disse farene.",
  },
  {
    slug: "geologiske-ressurser",
    to: "/geofag-1/geologiske-ressurser",
    title: "Geologiske ressurser",
    kicker: "Mennesket i jordsystemene",
    image: "/images/gf1-ressurser.jpg",
    alt: "Dagbrudd i fjellandskap i kveldslys",
    blurb:
      "Malm, naturstein, pukk, industrimineraler og petroleum: hvordan de dannes, hvordan vi finner dem, hva som utvinnes i Norge og i verden, og konsekvensene i et bærekraftsperspektiv.",
    status: "klar" as const,
    maal: "Gjøre rede for danning, kartlegging og utvinning av geologiske ressurser nasjonalt og globalt og drøfte konsekvenser av å utvinne og utnytte disse i et bærekraftsperspektiv.",
  },
  {
    slug: "feltarbeid",
    to: "/geofag-1/feltarbeid",
    title: "Feltarbeid",
    kicker: "Data i felt",
    image: "/images/fig-forvitring.jpg",
    alt: "Blotning i fjell. Felt i geosfæren.",
    blurb:
      "Planlegging og HMS, metoder i felt, georeferering og feltbok, og bearbeiding, tolkning og presentasjon av data fra geosfæren og hydrosfæren.",
    status: "klar" as const,
    maal: "Gjennomføre geofaglig feltarbeid knyttet til geosfæren eller hydrosfæren, bearbeide og tolke de innsamlede dataene og presentere resultatene.",
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
    image: "/images/banner-hav.jpg",
    alt: "Havoverflate sett ovenfra",
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
      "Havets store transportbånd: veien rundt jorda, hvorfor ferskvann kan bremse det, og hva IPCC sier om svekkelse.",
    status: "klar" as const,
  },
] as const;

/** Interaktive klimamodeller. Ingen CMS-post (står derfor ikke i KLIMA_SUBTHEMES). */
export const KLIMA_MODELS = [
  {
    to: "/tema/jetstrommer",
    title: "Jetstrømmer og atmosfæriske elver",
    subtitle: "Interaktiv undervisningsmodell",
    kicker: "Interaktiv modell",
    image: "/images/jetstrommer-modell.jpg",
    alt: "Verdenskart med jetstrømmer og atmosfæriske elver",
    blurb:
      "Polarjet og subtropisk jet, Rossby-bølger og atmosfæriske elver. Modellen ligger i jetstrømmer-kapitlet. Skru på ENSO og IOD og se hvordan jetstrøm og nedbør endres.",
    status: "klar" as const,
  },
] as const;

export function gf1Theme(slug: string) {
  if (slug === "bergarter-og-landformer") return GF1_THEMES.find((t) => t.slug === "bergarter");
  if (slug === "vulkaner-og-jordskjelv") return GF1_THEMES.find((t) => t.slug === "vulkaner");
  return GF1_THEMES.find((t) => t.slug === slug);
}

/** All canonical theme paths (G1 + G2), for sitemap/SEO use. Excludes `$slug` and redirect routes. */
export function allThemePaths(): string[] {
  return [
    ...GF1_THEMES.map((t) => t.to),
    ...GF2_THEMES.map((t) => t.to),
    ...KLIMA_SUBTHEMES.map((t) => t.to),
    "/tema/kryosfare",
    "/tema/klima/jetstrommer-atmosfaeriske-elver",
  ];
}
