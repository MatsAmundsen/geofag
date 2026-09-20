import { GEMINI } from "@/lib/gemini-slots";

export type GeminiSlot = (typeof GEMINI)[keyof typeof GEMINI];

export type NavLink = { to: string; label: string };

/** Banner som skiller sider som ellers lånte samme foto. */
export const BANNER_BY_PATH: Record<string, { src: string; alt: string }> = {
  "/tema/vaerkart": {
    src: "/images/fig-lavtrykk-hav.jpg",
    alt: "Lavtrykk over hav med spiralformede skyer — utgangspunktet for et synoptisk kart",
  },
  "/tema/lokale-vaersystemer": {
    src: "/images/fig-polarfront.jpg",
    alt: "Polarfronten som bølge mellom kald og varm luft, med lavtrykk i bølgen",
  },
  "/tema/kryosfaeren": {
    src: "/images/fig-albedo.jpg",
    alt: "Is og snø mot mørkt hav — albedoen som styrer massebalansen i år",
  },
  "/tema/tilpasning": {
    src: "/images/fig-stormflo.jpg",
    alt: "Stormflo mot kai og bebyggelse — der fysikk blir skade",
  },
  "/tema/energi-hav-luft": {
    src: "/images/fig-passat.jpg",
    alt: "Passatskyer over hav — vinden som energikilde, før den blir kilowatt",
  },
  "/tema/felt-hav-luft-is": {
    src: "/images/fig-hoytrykk-fjell.jpg",
    alt: "Norsk fjell under klarvær — felt i luft og is, ikke bergartssnitt",
  },
  "/geofag-1/feltarbeid": {
    src: "/images/fig-forvitring.jpg",
    alt: "Forvitret blotning — felt i geosfæren, ikke samme foto som bergartssiden",
  },
};

/** Overstyr prev/next der sideteksten henger etter GF2_THEMES. */
export const NAV_BY_PATH: Record<string, { prev?: NavLink; next?: NavLink }> = {
  "/tema/vindsystemet": {
    next: { to: "/tema/vaerkart", label: "Neste: Værkart" },
  },
  "/tema/vaerkart": {
    next: { to: "/tema/lokale-vaersystemer", label: "Neste: Lokale værsystemer" },
  },
  "/tema/jetstrommer": {
    prev: { to: "/tema/lokale-vaersystemer", label: "Forrige: Lokale værsystemer" },
  },
  "/tema/numeriske-modeller": {
    prev: { to: "/tema/kryosfaeren", label: "Forrige: Kryosfæren" },
  },
};

/** Eierskap øverst på sidene som ellers ville krevd 50 kB-redigering. */
export const EIERSKAP_BY_PATH: Record<string, string> = {
  "/tema/klima/enso":
    "Oversikten eier stråling, pådriv og tilbakekobling. Denne siden eier Walker-cellen, El Niño og La Niña. IOD, NAO og AMOC eier de andre svingningene.",
  "/tema/klima/iod":
    "ENSO eier Stillehavet. Denne siden eier temperaturgradienten i Det indiske hav. Strålingsbudsjettet ligger i oversikt.",
  "/tema/klima/nao":
    "Denne siden eier trykkvippen mellom Asorene og Island — og dermed norsk vintervær. AMOC eier det trege havbeltet. Oversikten eier pådriv.",
  "/tema/paleoklima":
    "Denne siden eier arkivene: proxy, iskjerne og brå hopp. Banen som setter innstrålingen på 65 °N, eier neste kapittel. Kryosfæren eier isen som jobber i år.",
  "/tema/milankovitch":
    "Denne siden eier hvorfor isen kommer: Milankovitch, albedo og CO₂. Paleoklima eier hvordan vi leser sporene. Kryosfæren eier dagens massebalanse.",
  "/geofag-1/platetektonikk":
    "Denne siden eier platene, drivkreftene, plategrensene og Wilsonsyklusen. Vulkaner eier magmakjemi og hotspots. Jordskjelv eier bølger og Wadati-Benioff. Norges geologi eier Kaledonidene og Oslofeltet.",
  "/geofag-1/vulkaner":
    "Denne siden eier magmatyper, viskositet, utbruddsformer og hotspots/mantelplymer. Platetektonikk eier smeltemekanismer og plategrenser.",
  "/geofag-1/jordskjelv":
    "Denne siden eier seismiske bølger, seismogrammer, hyposenter/episentrum, magnitude og Wadati-Benioff-sonen. Platetektonikk eier plategrensene.",
  "/geofag-1/norges-geologi":
    "Denne siden eier Norges geologiske historie fra urtid til nåtid: Leka-ofiolitten, Kaledonidene, Oslofeltets rift og landhevingen. Bergarter eier mineralklassifisering. Landformer eier kvartær erosjon.",
};

const SLOTS: Record<string, GeminiSlot[]> = {
  "/tema/vaerkart": [GEMINI.vaerkartSynoptisk, GEMINI.vaerkart24t],
  "/tema/lokale-vaersystemer": [GEMINI.polarfrontStadier],
  "/tema/numeriske-modeller": [GEMINI.modellerGrid, GEMINI.modellerParam, GEMINI.modellerEnsemble],
  "/tema/kryosfaeren": [GEMINI.kryoMassebalanse, GEMINI.kryoFlakskred],
  "/tema/energi-hav-luft": [GEMINI.energiOversikt],
  "/tema/klima/nao": [GEMINI.naoRossby, GEMINI.naoIndeks],
  "/geofag-1/bergarter-og-landformer": [GEMINI.bergartssyklus, GEMINI.relativDatering, GEMINI.kornfordeling],
  "/geofag-1/vann-og-flom": [GEMINI.hydrogramTo],
  "/geofag-1/feltarbeid": [GEMINI.feltbokUtfylt],
};

function norm(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

export function figuresForPath(pathname: string): GeminiSlot[] {
  return SLOTS[norm(pathname)] ?? [];
}

export function bannerForPath(pathname: string): { src: string; alt: string } | undefined {
  return BANNER_BY_PATH[norm(pathname)];
}

export function navForTopicPath(pathname: string): { prev?: NavLink; next?: NavLink } | undefined {
  return NAV_BY_PATH[norm(pathname)];
}

export function eierskapForPath(pathname: string): string | undefined {
  return EIERSKAP_BY_PATH[norm(pathname)];
}
