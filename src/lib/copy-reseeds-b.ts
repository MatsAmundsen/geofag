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
  {
    // Kryosfæren (T4): bretyper, kalving, jøkullaup, måling, alder, permafrostsoner, havisdannelse, havisdrift, snø.
    // Setningen om snødekket er flyttet og omskrevet, og SjekkKryo2 står nå før de nye delene.
    flag: "kryosfaeren-pakke-b-2026-10-29",
    slug: "kryosfaeren",
    stale: ["Snø kan i løpet av et år dekke så mye som 46 millioner kvadratkilometer"],
  },
  {
    // Havstrømmer (T5): havbunn og verdenshav, sjøvann, termoklin/halokline, vannmasser i Atlanterhavet, AMV, plast i havvirvlene.
    // Innledningen er omskrevet, og nye Sjekk-bokser (7–10) og begreper er lagt inn.
    flag: "havstrommer-pakke-b-2026-10-29",
    slug: "havstrommer",
    stale: ["er forenklede modeller av dem."],
  },
];
