import { GEMINI } from "@/lib/gemini-slots";

export type GeminiSlot = (typeof GEMINI)[keyof typeof GEMINI];

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

export function figuresForPath(pathname: string): GeminiSlot[] {
  const path = pathname.replace(/\/$/, "") || "/";
  return SLOTS[path] ?? [];
}

export function bannerForPath(pathname: string): { src: string; alt: string } | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return BANNER_BY_PATH[path];
}
