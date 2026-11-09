import type { CopyReseed } from "@/lib/copy-reseed";

/**
 * Pakke B: engangsoverskriving av kapitler som er utvidet.
 * Flaggene overskriver CMS-redigeringer i disse kapitlene (se copy-reseed.ts).
 */
export const COPY_RESEEDS_B: CopyReseed[] = [
  { flag: "geo-ressurser-figurnummer-kap7-2026-11-09", slug: "geo-ressurser", stale: ["nnet. Figur 7.2 skiller "] },
  { flag: "geo-klima-et-al-kap5-2026-11-09", slug: "geo-klima", stale: [".-a; Dannevig mfl., u.å."] },
  { flag: "geo-landskap-figurnummer-kap4-2026-11-09", slug: "geo-landskap", stale: ["4). I figur 4.4 bruker v"] },
  { flag: "geo-indre-krefter-figurnummer-kap3-2026-11-09", slug: "geo-indre-krefter", stale: ["len i figur 3.6 lar oss "] },
  { flag: "geo-baerekraft-figurnummer-kap8-2026-11-09", slug: "geo-baerekraft", stale: ["[figur-8-6]: # (FIG"] },
  { flag: "geo-naturfare-figurnummer-kap6-2026-11-09", slug: "geo-naturfare", stale: ["Figur 6.10 gir en "] },
  { flag: "geo-ressurser-skjulte-kap7-2026-11-07", slug: "geo-ressurser", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-klima-skjulte-kap5-2026-11-07", slug: "geo-klima", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-landskap-skjulte-kap4-2026-11-07", slug: "geo-landskap", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-indre-krefter-skjulte-kap3-2026-11-07", slug: "geo-indre-krefter", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-baerekraft-skjulte-kap8-2026-11-07", slug: "geo-baerekraft", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-naturfare-skjulte-kap6-2026-11-07", slug: "geo-naturfare", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-feltarbeid-skjulte-kap2-2026-11-07", slug: "geo-feltarbeid", stale: ["FIGURPLASSHOLDER"] },
  { flag: "geo-verktoy-skjulte-kap1-2026-11-07", slug: "geo-verktoy", stale: ["FIGURPLASSHOLDER"] },
  {
    flag: "geo-ressurser-mats-valg-kap7-2026-11-06",
    slug: "geo-ressurser",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    flag: "geo-landskap-mats-valg-kap4-2026-11-06",
    slug: "geo-landskap",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    flag: "geo-indre-krefter-mats-valg-kap3-2026-11-06",
    slug: "geo-indre-krefter",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    flag: "geo-baerekraft-mats-valg-kap8-2026-11-06",
    slug: "geo-baerekraft",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    flag: "geo-naturfare-mats-valg-kap6-2026-11-06",
    slug: "geo-naturfare",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    flag: "geo-feltarbeid-mats-valg-kap2-2026-11-06",
    slug: "geo-feltarbeid",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    flag: "geo-verktoy-mats-valg-kap1-2026-11-06",
    slug: "geo-verktoy",
    stale: ["FIGURPLASSHOLDER"],
  },
  {
    // Geografi: kapittel 7 alene; aktiveres først etter godkjent merge.
    flag: "geo-ressurser-kap7-2026-11-06",
    slug: "geo-ressurser",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Nytt reseed: stasjonsnormaler erstatter øvingsdata, uten å endre tidligere flagg.
    flag: "geo-klima-normaler-blindern-1991-2020-2026-11-06",
    slug: "geo-klima",
    stale: ["konstruert øvingsdatasett", "gjennom øvingsåret"],
  },
  {
    // Geografi: kapittel 5 alene; aktiveres først etter godkjent merge.
    flag: "geo-klima-kap5-2026-11-06",
    slug: "geo-klima",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Geografi: kapittel 4 alene; aktiveres først etter godkjent merge.
    flag: "geo-landskap-kap4-2026-11-06",
    slug: "geo-landskap",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Geografi PR F: kapittel 3 alene; aktiveres først etter godkjent merge.
    flag: "geo-indre-krefter-kap3-2026-11-06",
    slug: "geo-indre-krefter",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Geografi PR E: kapittel 8; ingen produksjonsendring før godkjent merge.
    flag: "geo-baerekraft-kap8-2026-11-06",
    slug: "geo-baerekraft",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Geografi PR D: kapittel 6; ingen produksjonsendring før godkjent merge.
    flag: "geo-naturfare-kap6-2026-11-06",
    slug: "geo-naturfare",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Geografi PR C: erstatt kapittel 2-stubben med fagtekst; aktiveres først ved godkjent merge.
    flag: "geo-feltarbeid-kap2-2026-11-06",
    slug: "geo-feltarbeid",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
  {
    // Geografi PR B: erstatt kapittel 1-stubben med fagtekst; aktiveres først ved godkjent merge.
    flag: "geo-verktoy-kap1-2026-11-06",
    slug: "geo-verktoy",
    stale: ["## Planlagte underkapitler", "Tekst, figurer og oppgaver kommer i senere leveranser."],
  },
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
  {
    // Værkatastrofer (T6): Saffir–Simpson i km/t, styrtregn og regn, hetebølger, kuldebølger og blokkering, tørketyper, IPCC-tabeller.
    // Referansene IPCC 2021 og MET u.å. har fått bokstavsuffiks, og nye Sjekk-bokser (4–8) og begreper er lagt inn.
    flag: "vaerkatastrofer-pakke-b-2026-10-29",
    slug: "vaerkatastrofer",
    stale: ["naturlig variasjon (IPCC, 2021)."],
  },
  {
    // Klimasystemet (T7): havforsuring og avoksygenering, Svalbard og polarområdene, Norge mot 2100.
    // Innledningen er omskrevet, og nye Sjekk-bokser (7–9) og begreper er lagt inn.
    flag: "oversikt-pakke-b-2026-10-29",
    slug: "oversikt",
    stale: ["hvor mye det har blitt varmere, og hva det betyr for Norge."],
  },
  {
    // Tilpasning (T7): sårbarhet, tilpasningsevne og harde og myke tilpasningsgrenser.
    // Innledningen er omskrevet, og nye Sjekk-bokser (5–6) og begreper er lagt inn.
    flag: "tilpasning-pakke-b-2026-10-29",
    slug: "tilpasning",
    stale: ["og hvordan lover og arealplanlegging brukes i klimatilpasning."],
  },
];
