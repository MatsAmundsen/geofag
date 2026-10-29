import type { CopyReseed } from "@/lib/copy-reseed";

/**
 * Pakke B: engangsoverskriving av kapitler som er utvidet.
 * Flaggene overskriver CMS-redigeringer i disse kapitlene (se copy-reseed.ts).
 */
export const COPY_RESEEDS_B: CopyReseed[] = [
  {
    // Værkart (T3): værradar, satellitt (VIS/IR), egne observasjoner, regneeksempel for frontfart.
    // NWS-kilden for tråg-raden har fått bokstav (u.å.-a), og SjekkVaerkart4 står nå etter 500 hPa-kartet.
    flag: "vaerkart-pakke-b-2026-10-29",
    slug: "vaerkart",
    stale: ["iblant vindkast (National Weather Service [NWS], u.å.) |"],
  },
];
