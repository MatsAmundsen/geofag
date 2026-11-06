import type { Kilde } from "@/lib/kilder";

/** Kildelister per Geografi-kapittel (CMS-slug geo-…). Fylles når teksten skrives. */
export const KILDER_GEOGRAFI: Record<string, readonly Kilde[]> = {
  "geo-verktoy": [] as const,
  "geo-feltarbeid": [] as const,
  "geo-indre-krefter": [] as const,
  "geo-landskap": [] as const,
  "geo-klima": [] as const,
  "geo-naturfare": [] as const,
  "geo-ressurser": [] as const,
  "geo-baerekraft": [] as const,
  "geo-naering": [] as const,
  "geo-befolkning": [] as const,
  "geo-migrasjon": [] as const,
};
