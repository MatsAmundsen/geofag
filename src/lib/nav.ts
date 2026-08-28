export const NAV_HUB = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Geofag 1" },
  { to: "/geofag-2", label: "Geofag 2" },
] as const;

export const NAV_GF1 = [
  { to: "/", label: "Geofag" },
  { to: "/geofag-1", label: "Oversikt" },
] as const;

export const NAV_GF2 = [
  { to: "/tema/hoytrykk-lavtrykk", label: "Trykk" },
  { to: "/tema/vindsystemet", label: "Vind" },
  { to: "/tema/coriolis", label: "Coriolis" },
  { to: "/tema/havstrommer", label: "Hav" },
  { to: "/tema/klima", label: "Klima" },
  { to: "/tema/numeriske-modeller", label: "Modeller" },
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
  if (pathname.startsWith("/geofag-2") || pathname.startsWith("/tema")) {
    return { title: "Geofag 2", sub: "Hav, luft og klima" };
  }
  return { title: "Geofag", sub: "Naturfarer, vær og klima" };
}

export const GF2_THEMES = [
  {
    to: "/tema/hoytrykk-lavtrykk",
    title: "Vind",
    kicker: "Atmosfæren",
    image: "/images/tema-vind.jpg",
    alt: "Skybånd og værsystemer over Nord-Atlanteren sett fra satellitt",
    blurb:
      "Start med høytrykk og lavtrykk. Deretter det globale vindsystemet — Hadley, Ferrel og polarcellen — motoren i været.",
    status: "klar" as const,
  },
  {
    to: "/tema/havstrommer",
    title: "Strømmer",
    kicker: "Havet",
    image: "/images/tema-strommer.jpg",
    alt: "Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm",
    blurb:
      "Vind, tetthet og jordrotasjon flytter varme i havet. Golfstrømmen og AMOC er grunnen til at Norge er milt på 60°N.",
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
    image: "/images/tema-klima.jpg",
    alt: "Polar is og hav som står for jordsystemet modellene beskriver",
    blurb:
      "En numerisk modell i geofag er ikke et værkart på en datamaskin. Den er fysikk regnet på et rutenett.",
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
    title: "Bergarter og landformer",
    kicker: "Bergartssyklusen",
    image: "/images/gf1-bergarter.jpg",
    alt: "Lagdelt sedimentær klippe og isskurt fjordlandskap",
    blurb:
      "Mineraler, bergarter og sedimenter. Datering. Hvordan indre og ytre krefter — og mennesker — lager og endrer landformer.",
    status: "utkast" as const,
    maal: "Mineral- og bergartsgrupper, datering, lokal geologi og landformer.",
  },
  {
    slug: "vann-flom-og-skred",
    title: "Vann, flom og skred",
    kicker: "Naturfarer i hydrosfæren",
    image: "/images/gf1-flom-skred.jpg",
    alt: "Flomelv ved et fjellskred i norsk landskap",
    blurb:
      "Det hydrologiske kretsløpet med vekt på ferskvann. Flom, skred og ustabile fjell — og hvordan aktivitet på land endrer risikoen.",
    status: "utkast" as const,
    maal: "Hydrologisk kretsløp, ferskvann, og naturfarer i hydrosfæren. Modellering av risiko.",
  },
  {
    slug: "ressurser-og-felt",
    title: "Ressurser og felt",
    kicker: "Mennesket i jordsystemene",
    image: "/images/gf1-ressurser.jpg",
    alt: "Dagbrudd i fjellandskap i kveldslys",
    blurb:
      "Geologiske ressurser og ferskvann i et bærekraftsperspektiv. Feltarbeid: samle data, tolke, presentere.",
    status: "utkast" as const,
    maal: "Utvinning av ressurser, bærekraft, og geofaglig feltarbeid i geosfære eller hydrosfære.",
  },
] as const;

export function gf1Theme(slug: string) {
  return GF1_THEMES.find((t) => t.slug === slug);
}
