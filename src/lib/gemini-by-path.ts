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
  "/geofag-1/geologisk-tid":
    "Denne siden eier geologisk tid (eon, æra, periode og epoke, ICS-grenser), relativ datering (overlagring, opprinnelig horisontalitet, gjennomskjæring, inneslutninger, ledefossiler og diskordans), radiometrisk datering og halveringstid (U–Pb, K–Ar, Rb–Sr og C-14) og kvartære metoder (varv, årringer, tefra, OSL og eksponeringsdatering). Norges geologi eier hendelsene og alderen deres. Bergarter eier bergartene.",
  "/geofag-1/bergarter":
    "Denne siden eier mineraler og mineralgrupper, de tre bergartsgruppene, håndstykke-tester, forvitring og bergartssyklusen. Norges geologi eier Osloriften og den kaledonske fjellkjeden, Geologisk tid eier dateringen og Geologiske ressurser eier malmene.",
  "/geofag-1/vulkaner":
    "Denne siden eier magma og viskositet, vulkantyper, utbruddstyper, VEI, vulkanske farer, overvåking og forebygging av vulkanfarer, og Beerenberg. Platetektonikk eier smelting og plategrenser, og Norges geologi eier Oslo-riften.",
  "/geofag-1/feltarbeid":
    "Denne siden eier hvordan feltarbeid gjøres: planlegging og HMS, metoder i felt, georeferering, feltbok og usikkerhet, og bearbeiding, tolkning og presentasjon. Norges geologi eier hva du ser etter lokalt og hva det betyr.",
  "/geofag-1/platetektonikk":
    "Denne siden eier platene, drivkreftene, plategrensene og Wilsonsyklusen. Vulkaner eier magmakjemi og hotspots. Jordskjelv eier seismisitet, bølger og Wadati-Benioff. Norges geologi eier Leka-ofiolitten, Kaledonidene og Oslofeltet.",
  "/geofag-1/jordskjelv":
    "Denne siden eier hvordan jordskjelv oppstår og måles, skjelvdybde og Wadati-Benioff-sonen, P-, S- og overflatebølger, magnitude og intensitet, jordas indre og hvorfor Norge skjelver. Jordskjelv og tsunamier som naturfare eier tsunami, skader, varsling og risiko. Platetektonikk eier plategrensene.",
  "/geofag-1/jordskjelv-naturfare":
    "Denne siden eier tsunami fra skjelv eller skred, skader fra jordskjelv, varsling og risikovurdering med modell. Jordskjelv og jordas indre eier bølgene, målingen og jordas indre.",
  "/geofag-1/norges-geologi":
    "Denne siden eier Norges geologiske historie fra grunnfjellet til i dag: grunnfjellet og det subkambriske peneplanet, Leka-ofiolitten, den kaledonske fjellkjeden med skyvedekker og eklogitt, Oslo-riften i sen karbon og perm (ikke Pangeas oppsprekking), åpningen av Norskehavet, isostasi, marin grense (havet sto opptil ca. 220 m høyere i Oslo-området) og landhevingen, og lokal utforsking av berggrunn og løsmasser. Bergarter eier mineralklassifisering. Geologisk tid eier dateringsmetodene. Landformer eier erosjon og landformer. Feltarbeid eier hvordan feltarbeid planlegges og gjennomføres.",
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
