/**
 * Geo med Maria-videoer til Geofag 1.
 *
 * Widget-gjerdet i kapittelteksten er én id (`YtMaria…`). Tittel, kanal og lengde
 * ligger her, så fagteksten ikke endres utover selve videoen.
 *
 * `injectPosterWidgets` setter inn gjerdet på samme sted hvis en lagret CMS-rad
 * mangler det. Da vises videoen uten å overskrive redaktørens prosa.
 */

export const GEO_MARIA_CHANNEL = "Geo med Maria";

export type GeoMariaPlacement = {
  /** Filsti relativt til src/lib. */
  seed: string;
  /** Må finnes i kapitlet, så videoen ikke sprøytes inn i et annet innlegg. */
  require: string;
} & ({ atStart: true } | { beforeHeading: string } | { afterParagraph: string });

export type GeoMariaVideo = {
  widgetId: string;
  youtubeId: string;
  title: string;
  duration: string;
  placements: GeoMariaPlacement[];
};

const JORD = "de fem sfærene, berggrunn, løsmasser og jord";
const PLATE = "Flyter platene på et hav av smeltet magma";
const VULKAN = "Beerenberg på Jan Mayen";
const SKJELV = "elastisk tilbakefjæring, skjelvdybde";
const FARE = "Oslofjordskjelvet i 1904 ga skader";
const BERG = "Er granitt et mineral?";
const TID = "den geologiske tidsskalaen, prinsippene for relativ datering";
const NORGE = "ofiolitten på Leka, den kaledonske fjellkjeden";
const LAND = "Hjulströms diagram, elvas landformer";
const IS = "hvordan isbreen beveger seg, eroderer ved plukking";
const VANN = "ekstremværet Hans, hvordan byer";
const SKRED = "Kan et kvikkleireskred gå på et helt flatt jorde";
const RESSURS = "Hvor mye tror du det brukes i Norge per person hvert år";
const FELT = "gjennomføre geofaglig feltarbeid knyttet til geosfæren";

export const GEO_MARIA_VIDEOS: GeoMariaVideo[] = [
  {
    widgetId: "YtMaria00",
    youtubeId: "uylsHP6bxGg",
    title: "Geofag 1 #00 Introduksjon til læreplanen",
    duration: "12:48",
    placements: [{ seed: "posts/jordsystemene.md", require: JORD, atStart: true }],
  },
  {
    widgetId: "YtMaria28",
    youtubeId: "vFAEpr5gObo",
    title: "Geofag 1 #28 Vannets kretsløp",
    duration: "7:37",
    placements: [
      {
        seed: "posts/jordsystemene.md",
        require: JORD,
        beforeHeading: "Geosfæren: berggrunn, løsmasser og jord",
      },
      { seed: "posts/vann-og-flom.md", require: VANN, beforeHeading: "Hva er en akvifer?" },
    ],
  },
  {
    widgetId: "YtMaria01",
    youtubeId: "S-HnKrW2W-A",
    title: "Geofag 1 #01 Kontinentaldrift, platetektonikk og manteldynamikk",
    duration: "9:18",
    placements: [
      {
        seed: "platetektonikk-post.md",
        require: PLATE,
        beforeHeading: "Hvorfor mantelberg smelter",
      },
    ],
  },
  {
    widgetId: "YtMaria02",
    youtubeId: "U3F4oRodZtA",
    title: "Geofag 1 #02 Divergerende plategrenser",
    duration: "5:35",
    placements: [
      {
        seed: "platetektonikk-post.md",
        require: PLATE,
        beforeHeading: "2. Konvergerende plategrense",
      },
    ],
  },
  {
    widgetId: "YtMaria04",
    youtubeId: "SLGjSowgucs",
    title: "Geofag 1 #04 Konvergerende plategrenser",
    duration: "8:20",
    placements: [
      {
        seed: "platetektonikk-post.md",
        require: PLATE,
        beforeHeading: "3. Transforme plategrenser",
      },
    ],
  },
  {
    widgetId: "YtMaria03",
    youtubeId: "EiiLjyzt4xM",
    title: "Geofag 1 #03 Transforme plategrenser",
    duration: "2:22",
    placements: [
      {
        seed: "platetektonikk-post.md",
        require: PLATE,
        beforeHeading: "Seismisitet og Wadati-Benioff-sonen",
      },
    ],
  },
  {
    widgetId: "YtMaria08",
    youtubeId: "aaYwAvV0ca4",
    title: "Geofag 1 #08 Vulkaner, hotspots og basaltprovinser",
    duration: "6:28",
    placements: [
      { seed: "posts/vulkaner.md", require: VULKAN, beforeHeading: "Pliniansk utbrudd" },
    ],
  },
  {
    widgetId: "YtMaria09",
    youtubeId: "aQoz61b7S9A",
    title: "Geofag 1 #09 Vulkanutbrudd",
    duration: "7:37",
    placements: [
      { seed: "posts/vulkaner.md", require: VULKAN, beforeHeading: "Overvåking og varsling" },
    ],
  },
  {
    widgetId: "YtMaria05",
    youtubeId: "EN7V6H9fp0o",
    title: "Geofag 1 #05 Jordskjelv",
    duration: "13:03",
    placements: [
      {
        seed: "posts/jordskjelv.md",
        require: SKJELV,
        beforeHeading: "Hva forteller bølgene om jordas indre?",
      },
    ],
  },
  {
    widgetId: "YtMaria07",
    youtubeId: "Zf68oBcglt0",
    title: "Geofag 1 #07 Tsunami",
    duration: "4:58",
    placements: [
      {
        seed: "posts/jordskjelv-naturfare.md",
        require: FARE,
        beforeHeading: "Hvilke skader gjør jordskjelv?",
      },
    ],
  },
  {
    widgetId: "YtMaria06",
    youtubeId: "FsVPeceUOPg",
    title: "Geofag 1 #06 Store jordskjelv – eksempler",
    duration: "6:38",
    placements: [
      {
        seed: "posts/jordskjelv-naturfare.md",
        require: FARE,
        beforeHeading: "Viktige begreper",
      },
    ],
  },
  {
    widgetId: "YtMaria11",
    youtubeId: "nLh8WHzYE6E",
    title: "Geofag 1 #11 Bergarter og mineraler",
    duration: "5:23",
    placements: [
      {
        seed: "posts/bergarter.md",
        require: BERG,
        beforeHeading: "Hvordan undersøker du et håndstykke?",
      },
    ],
  },
  {
    widgetId: "YtMaria12",
    youtubeId: "iozwyg2F_9E",
    title: "Geofag 1 #12 Magmatiske bergarter",
    duration: "4:23",
    placements: [
      {
        seed: "posts/bergarter.md",
        require: BERG,
        beforeHeading: "Hvordan smelter og størkner magma?",
      },
    ],
  },
  {
    widgetId: "YtMaria13",
    youtubeId: "crAHroyB4hM",
    title: "Geofag 1 #13 Magmatisk differensiering og Bowens reaksjonsserie",
    duration: "9:18",
    placements: [
      {
        seed: "posts/bergarter.md",
        require: BERG,
        beforeHeading: "Hva er sedimentære bergarter?",
      },
    ],
  },
  {
    widgetId: "YtMaria14",
    youtubeId: "6dB-x1o6dJg",
    title: "Geofag 1 #14 Sedimentære bergarter",
    duration: "6:34",
    placements: [
      {
        seed: "posts/bergarter.md",
        require: BERG,
        beforeHeading: "Hva er metamorfe bergarter?",
      },
    ],
  },
  {
    widgetId: "YtMaria15",
    youtubeId: "Zmewg1s6fog",
    title: "Geofag 1 #15 Metamorfe bergarter",
    duration: "3:38",
    placements: [
      {
        seed: "posts/bergarter.md",
        require: BERG,
        beforeHeading: "Hva er bergartssyklusen?",
      },
    ],
  },
  {
    widgetId: "YtMaria16",
    youtubeId: "dyCEMKQPDU4",
    title: "Geofag 1 #16 Bergartenes kretsløp",
    duration: "2:58",
    placements: [
      { seed: "posts/bergarter.md", require: BERG, beforeHeading: "Viktige begreper" },
    ],
  },
  {
    widgetId: "YtMaria17",
    youtubeId: "Y0h6-5ZKZPU",
    title: "Geofag 1 #17 Geologisk tid",
    duration: "8:20",
    placements: [
      { seed: "posts/geologisk-tid.md", require: TID, beforeHeading: "Relativ alder" },
    ],
  },
  {
    widgetId: "YtMaria18",
    youtubeId: "9J-j_52BoKo",
    title: "Geofag 1 #18 Aldersdatering av bergarter",
    duration: "9:26",
    placements: [
      {
        seed: "posts/geologisk-tid.md",
        require: TID,
        beforeHeading: "Andre dateringsmetoder",
      },
    ],
  },
  {
    widgetId: "YtMaria19",
    youtubeId: "cHQgGmGW2iA",
    title: "Geofag 1 #19 Den kaledonske fjellkjeden",
    duration: "6:30",
    placements: [
      { seed: "posts/norges-geologi.md", require: NORGE, beforeHeading: "Oslo-riften" },
    ],
  },
  {
    widgetId: "YtMaria20",
    youtubeId: "jaiGwDWdY60",
    title: "Geofag 1 #20 Oslofeltet",
    duration: "10:37",
    placements: [
      {
        seed: "posts/norges-geologi.md",
        require: NORGE,
        beforeHeading: "Norskehavet åpner seg",
      },
    ],
  },
  {
    widgetId: "YtMaria46",
    youtubeId: "7bz8f2pk6Sk",
    title: "Geofag 1 #46 Istid i Norge",
    duration: "10:20",
    placements: [
      {
        seed: "posts/norges-geologi.md",
        require: NORGE,
        beforeHeading: "Utforsk geologien der du bor",
      },
    ],
  },
  {
    widgetId: "YtMaria10",
    youtubeId: "MGvAbT4wIB0",
    title: "Geofag 1 #10 Forvitring og erosjon",
    duration: "9:25",
    placements: [
      {
        seed: "posts/landformer.md",
        require: LAND,
        beforeHeading: "Elva fra kilde til munning",
      },
    ],
  },
  {
    widgetId: "YtMaria40",
    youtubeId: "3nWBtyDM6_s",
    title: "Geofag 1 #40 Landformer dannet av elver",
    duration: "11:57",
    placements: [
      {
        seed: "posts/landformer.md",
        require: LAND,
        beforeHeading: "Isen formet det meste av Norge",
      },
    ],
  },
  {
    widgetId: "YtMaria47",
    youtubeId: "GYoFD8Bw-Ic",
    title: "Geofag 1 #47 Strandflaten",
    duration: "2:32",
    placements: [
      { seed: "posts/landformer.md", require: LAND, afterParagraph: "strandflaten" },
    ],
  },
  {
    widgetId: "YtMaria43",
    youtubeId: "IhAY9PWtfDA",
    title: "Geofag 1 #43 Brebevegelser",
    duration: "6:24",
    placements: [
      {
        seed: "posts/isbreer-og-landformer.md",
        require: IS,
        beforeHeading: "Isen som kraft: erosjon og transport",
      },
    ],
  },
  {
    widgetId: "YtMaria44",
    youtubeId: "UKa6wn6gC7g",
    title: "Geofag 1 #44 Landformer dannet av isbreer",
    duration: "15:23",
    placements: [
      {
        seed: "posts/isbreer-og-landformer.md",
        require: IS,
        beforeHeading: "Frostforvitring",
      },
    ],
  },
  {
    widgetId: "YtMaria30",
    youtubeId: "uSNbPOdNX9g",
    title: "Geofag 1 #30 Grunnvann",
    duration: "16:34",
    placements: [
      { seed: "posts/vann-og-flom.md", require: VANN, beforeHeading: "Hva er et hydrogram?" },
    ],
  },
  {
    widgetId: "YtMaria37",
    youtubeId: "3Yz2brubGVw",
    title: "Geofag 1 #37 Flom",
    duration: "14:05",
    placements: [
      { seed: "posts/vann-og-flom.md", require: VANN, beforeHeading: "Hva viste Hans?" },
    ],
  },
  {
    widgetId: "YtMaria38",
    youtubeId: "6l3_sr3O9fs",
    title: "Geofag 1 #38 Flom i Norge",
    duration: "7:56",
    placements: [
      {
        seed: "posts/vann-og-flom.md",
        require: VANN,
        beforeHeading: "Hvordan påvirker mennesket vannets kretsløp?",
      },
    ],
  },
  {
    widgetId: "YtMaria34",
    youtubeId: "95M1YSS9Sbo",
    title: "Geofag 1 #34 Drikkevann i Norge",
    duration: "6:37",
    placements: [
      { seed: "posts/vann-og-flom.md", require: VANN, beforeHeading: "Ferskvann i verden" },
    ],
  },
  {
    widgetId: "YtMaria51",
    youtubeId: "ipc_3_dXWlc",
    title: "Geofag 1 #51 Løsmasseskred",
    duration: "8:53",
    placements: [
      { seed: "posts/skred.md", require: SKRED, beforeHeading: "Hva er kvikkleire?" },
    ],
  },
  {
    widgetId: "YtMaria49",
    youtubeId: "QQpxld1tpQI",
    title: "Geofag 1 #49 Kvikkleireskred",
    duration: "9:12",
    placements: [
      { seed: "posts/skred.md", require: SKRED, beforeHeading: "Hva er et fjellskred?" },
    ],
  },
  {
    widgetId: "YtMaria52",
    youtubeId: "ho_ssQd02I0",
    title: "Geofag 1 #52 Fjellskred",
    duration: "6:01",
    placements: [
      {
        seed: "posts/skred.md",
        require: SKRED,
        beforeHeading: "Hvordan kan vi forebygge og tilpasse oss?",
      },
    ],
  },
  {
    widgetId: "YtMaria53",
    youtubeId: "SubHfQuCL0o",
    title: "Geofag 1 #53 Fjellskred: sikring og overvåking",
    duration: "10:41",
    placements: [
      {
        seed: "posts/skred.md",
        require: SKRED,
        beforeHeading: "Hvordan kan vi forebygge og tilpasse oss?",
      },
    ],
  },
  {
    widgetId: "YtMaria22",
    youtubeId: "hBpFabkc2yE",
    title: "Geofag 1 #22 Mineral- og bergartsressurser i Norge",
    duration: "15:33",
    placements: [
      {
        seed: "posts/geologiske-ressurser.md",
        require: RESSURS,
        beforeHeading: "Petroleum – fra plankton til felle",
      },
    ],
  },
  {
    widgetId: "YtMaria23",
    youtubeId: "DrdcfBori9I",
    title: "Geofag 1 #23 Dannelse av olje og gass",
    duration: "12:15",
    placements: [
      {
        seed: "posts/geologiske-ressurser.md",
        require: RESSURS,
        beforeHeading: "Hvordan finner vi ressursene?",
      },
    ],
  },
  {
    widgetId: "YtMariaFeltrapport",
    youtubeId: "qTnMh2pcdMI",
    title: "Geofag 1 #00-1 Feltrapport for privatister",
    duration: "8:27",
    placements: [
      { seed: "posts/feltarbeid.md", require: FELT, beforeHeading: "Viktige begreper" },
    ],
  },
];

export function youtubeNocookieEmbedSrc(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`;
}

export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(youtubeId)}`;
}

export function mariaWidgetFence(widgetId: string): string {
  return "```widget\n" + widgetId + "\n```";
}
