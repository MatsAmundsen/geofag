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
  "/geofag-1/platetektonikk":
    "Denne siden eier platene, drivkreftene, plategrensene og Wilsonsyklusen. Vulkaner eier magmakjemi og hotspots. Jordskjelv eier seismisitet, bølger og Wadati-Benioff. Norges geologi eier Leka-ofiolitten, Kaledonidene og Oslofeltet.",
  "/geofag-1/jordskjelv":
    "Denne siden eier hvordan jordskjelv oppstår og måles, skjelvdybde og Wadati-Benioff-sonen, P-, S- og overflatebølger, magnitude og intensitet, jordas indre og hvorfor Norge skjelver. Jordskjelv og tsunamier som naturfare eier tsunami, skader, varsling og risiko. Platetektonikk eier plategrensene.",
  "/geofag-1/jordskjelv-naturfare":
    "Denne siden eier tsunami fra skjelv eller skred, skader fra jordskjelv, varsling og risikovurdering med modell. Jordskjelv og jordas indre eier bølgene, målingen og jordas indre.",
  "/geofag-1/norges-geologi":
    "Denne siden eier Norges geologiske historie fra urtid til nåtid: Leka-ofiolitten, Kaledonidene, Oslofeltets rift og landhevingen. Bergarter eier mineralklassifisering. Landformer eier kvartær erosjon.",
};

const SLOTS: Record<string, GeminiSlot[]> = {
  "/geofag-1/bergarter-og-landformer": [GEMINI.bergartssyklus, GEMINI.relativDatering, GEMINI.kornfordeling],
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
