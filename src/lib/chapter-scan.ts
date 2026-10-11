import { injectPosterWidgets, stripChapterEditorNotice } from "./poster-markdown.ts";

export type ChapterScanBlock = {
  id: string;
  title: string;
  markdown: string;
};

export type ChapterScanSection = {
  id: string;
  title: string;
  label: string;
  subtitle: string;
  markdown: string;
  lead: string;
  subsections: ChapterScanBlock[];
};

export type ChapterScanDoc = {
  preamble: string;
  sections: ChapterScanSection[];
};

type SectionMeta = {
  match: RegExp;
  label: string;
  subtitle: string;
};

const SECTION_META: SectionMeta[] = [
  { match: /^naturstein, pukk, grus og industrimineraler/i, label: "Stein", subtitle: "Naturstein, byggeråstoff og industrimineraler" },
  { match: /^petroleum – fra plankton/i, label: "Petroleum", subtitle: "Kildebergart, oljevindu og felle" },
  { match: /^hvordan finner vi ressursene/i, label: "Kartlegging", subtitle: "Fra kart til borekjerne" },
  { match: /^hva utvinnes i norge og i verden/i, label: "Norge og verden", subtitle: "Utvinning nasjonalt og globalt" },
  { match: /^hvor gammel er jorda/i, label: "Tid", subtitle: "Eon, æra, periode og epoke" },
  { match: /^relativ alder/i, label: "Relativ alder", subtitle: "Overlagring, gjennomskjæring, fossiler" },
  { match: /^absolutt alder/i, label: "Absolutt alder", subtitle: "Halveringstid og radiometriske metoder" },
  { match: /^andre dateringsmetoder/i, label: "Andre metoder", subtitle: "Varv, tefra, OSL og ¹⁰Be" },
  { match: /^forebygging og tilpasning/i, label: "Forebygging", subtitle: "Farekart, evakuering og lavabarrierer" },
  { match: /^hva er geofaglig feltarbeid/i, label: "Feltarbeid", subtitle: "Fire steg fra plan til presentasjon" },
  { match: /^planlegging og hms$/i, label: "Planlegging", subtitle: "Problemstilling, utstyr og risiko" },
  { match: /^metoder i felt$/i, label: "Metoder", subtitle: "Berggrunn, løsmasser og vann" },
  { match: /^georeferering, feltbok/i, label: "Feltbok", subtitle: "Posisjon, ID og usikkerhet" },
  { match: /^bearbeiding, tolkning og presentasjon/i, label: "Resultater", subtitle: "Fra data til konklusjon" },
  { match: /^grunnfjellet – det eldste/i, label: "Grunnfjellet", subtitle: "Prekambrium og det subkambriske peneplanet" },
  { match: /^leka – en havbunn/i, label: "Leka", subtitle: "Ofiolitt fra Iapetushavet" },
  { match: /^den kaledonske fjellkjeden$/i, label: "Kaledonidene", subtitle: "Kollisjon, skyvedekker og eklogitt" },
  { match: /^oslo-riften/i, label: "Oslo-riften", subtitle: "Sen karbon og perm, rombeporfyr og larvikitt" },
  { match: /^norskehavet åpner seg/i, label: "Norskehavet", subtitle: "Passiv margin og Jan Mayen" },
  { match: /^istiden presset landet ned/i, label: "Istiden", subtitle: "Isostasi, marin grense og landheving" },
  { match: /^utforsk geologien der du bor/i, label: "Lokalt", subtitle: "Berggrunn, løsmasser og ressurser" },
  { match: /^tidslinje og nøkkelsteder/i, label: "Tidslinje", subtitle: "Historien samlet" },
  {
    match: /^hva former jordoverflaten/i,
    label: "Krefter",
    subtitle: "Indre krefter løfter, ytre krefter bryter ned",
  },
  {
    match: /^forvitring – berget/i,
    label: "Forvitring",
    subtitle: "Mekanisk og kjemisk, der berget ligger",
  },
  {
    match: /^erosjon, transport og avsetning/i,
    label: "Hjulström",
    subtitle: "Strømfart og kornstørrelse",
  },
  {
    match: /^elva fra kilde til munning/i,
    label: "Elva",
    subtitle: "V-dal, meander, kroksjø og delta",
  },
  {
    match: /^isen formet det meste av norge/i,
    label: "Isen",
    subtitle: "Kort om breene, mer i Isbreer og landformer",
  },
  {
    match: /^gamle vidder og unge fjorder/i,
    label: "Landskapet",
    subtitle: "To modeller for viddene",
  },
  {
    match: /^mennesket former landskapet/i,
    label: "Mennesket",
    subtitle: "Forbygning, masseuttak, kvikkleire og kyst",
  },
  {
    match: /^platetektonikk$/i,
    label: "Jordens indre",
    subtitle: "Skorpe, mantel, kjerne, litosfære og astenosfære",
  },
  {
    match: /^jordas oppbygning$/i,
    label: "Jordens indre",
    subtitle: "Skorpe, mantel, kjerne, litosfære og astenosfære",
  },
  {
    match: /oppdagelsen og bevisene|wegeners puslespill/i,
    label: "Bevisene",
    subtitle: "Wegener, Tharp, Hess og den magnetiske båndopptakeren",
  },
  {
    match: /hvordan startet platedriften/i,
    label: "Starten",
    subtitle: "Konveksjon, en tynn plate og et åpent spørsmål",
  },
  {
    match: /driver platene|holder platedriften i gang|slab pull/i,
    label: "Drivkrefter",
    subtitle: "Platetrekk, ryggskyv, manteldrag og gropsug",
  },
  {
    match: /mantelberg smelter|dekompresjon/i,
    label: "Smelting",
    subtitle: "Dekompresjon, flukssmelting og mantelplymer",
  },
  {
    match: /utforsk vulkaner/i,
    label: "Modell",
    subtitle: "Simulator for magmakjemi, utbruddsstil og forvarsler",
  },
  {
    match: /petrologi i laboratoriet/i,
    label: "Modell",
    subtitle: "Håndstykke, tynnsnitt og bergartssyklus",
  },
  {
    match: /interaktiv|geodynamisk modell/i,
    label: "Modell",
    subtitle: "Simulator for plategrenser, drivkrefter og smelting",
  },
  {
    match: /wadati-benioff|dype skjelv/i,
    label: "Wadati-Benioff",
    subtitle: "Fokusdybde langs plategrensene ned til 700 km",
  },
  {
    match: /^plategrensene:/i,
    label: "Plategrenser",
    subtitle: "Divergens, konvergens og transform — seks geologiske miljøer",
  },
  {
    match: /wilsonsyklus/i,
    label: "Wilsonsyklus",
    subtitle: "Havbassengenes liv og død over 400–600 millioner år",
  },
  {
    match: /termiske motor|indre motor/i,
    label: "Motor",
    subtitle: "Primordial varme, radiogen varme og vulkanisme som ventil",
  },
  {
    match: /magma og viskositet/i,
    label: "Magma",
    subtitle: "SiO₂, viskositet og gass i magma",
  },
  {
    match: /^magmakjemi|silikatinnhold/i,
    label: "Magmakjemi",
    subtitle: "SiO₂, viskositet og gass i magma",
  },
  {
    match: /vulkantyper|geomorfologi/i,
    label: "Vulkantyper",
    subtitle: "Skjoldvulkan, stratovulkan, sinderkjegle og kaldera",
  },
  {
    match: /intraplate|hotspot/i,
    label: "Hotspots",
    subtitle: "Mantelplymer, Hawaii-Emperor og Island",
  },
  {
    match: /pliniansk/i,
    label: "Pliniansk",
    subtitle: "Fragmentering, askesøyle og paraplysky",
  },
  {
    match: /to utbrudd på island/i,
    label: "Island",
    subtitle: "Eyjafjallajökull og Fagradalsfjall",
  },
  {
    match: /^vei:/i,
    label: "VEI",
    subtitle: "Vulkansk eksplosivitetsindeks",
  },
  {
    match: /^overvåking/i,
    label: "Overvåking",
    subtitle: "Signaler før utbrudd og varsel til luftfarten",
  },
  {
    match: /vulkanske farer|klimapåvirkning/i,
    label: "Farer",
    subtitle: "PDC, laharer og vulkansk vinter",
  },
  {
    match: /norsk vulkanisme|jan mayen|beerenberg/i,
    label: "Jan Mayen",
    subtitle: "Beerenberg — Norges eneste aktive vulkan",
  },
  {
    match: /^hva er et jordskjelv/i,
    label: "Jordskjelv",
    subtitle: "Plutselig brudd og elastisk tilbakefjæring",
  },
  {
    match: /p-bølger og s-bølger/i,
    label: "Bølger",
    subtitle: "P-, S- og overflatebølger",
  },
  {
    match: /hvor skjer de store skjelvene/i,
    label: "Plategrenser",
    subtitle: "Rygg, synkende plate og transform",
  },
  {
    match: /^hvordan måler vi jordskjelv/i,
    label: "Måling",
    subtitle: "Seismograf, episenter, magnitude og intensitet",
  },
  {
    match: /^hva forteller bølgene om jordas indre/i,
    label: "Jordas indre",
    subtitle: "Moho, flytende ytre kjerne og skyggesonen",
  },
  {
    match: /hvorfor skjelver norge/i,
    label: "Norge",
    subtitle: "Intraplate, spredning og landheving",
  },
  {
    match: /^tsunami:/i,
    label: "Tsunami",
    subtitle: "Undersjøiske skjelv og norske skredbølger",
  },
  {
    match: /^hvilke skader gjør jordskjelv/i,
    label: "Skader",
    subtitle: "Bygninger, resonans, likvefaksjon og brann",
  },
  {
    match: /^er det mulig å varsle jordskjelv/i,
    label: "Varsling",
    subtitle: "Langtidsvarsling, tidlig varsling og tsunamivarsel",
  },
  {
    match: /^fare og risiko/i,
    label: "Risiko",
    subtitle: "Fare, eksponering, sårbarhet og en enkel modell",
  },
  {
    match: /tilbakefjæring|jordskjelvfysikk/i,
    label: "Tilbakefjæring",
    subtitle: "Reids teori og den seismiske syklusen",
  },
  {
    match: /seismiske bølger|flytende kjerne/i,
    label: "Bølger",
    subtitle: "P-, S-, Rayleigh- og Love-bølger",
  },
  {
    match: /måling av jordskjelv|seismogram/i,
    label: "Måling",
    subtitle: "Triangulering, Δt og momentmagnitude",
  },
  {
    match: /norsk seismisitet/i,
    label: "Norge",
    subtitle: "Ryggskyv, landheving og historiske skjelv",
  },
  {
    match: /tsunamifysikk|shoaling/i,
    label: "Tsunami",
    subtitle: "Bølgefart, Greens lov og norske skredtsunamier",
  },
  {
    match: /jordskjelvsikring|eurokode/i,
    label: "Sikring",
    subtitle: "Eurokode 8, baseisolering og likvifaksjon",
  },
  {
    match: /hva er et mineral/i,
    label: "Mineraler",
    subtitle: "Krystall, kvarts og silikatgrupper",
  },
  {
    match: /^hva er en bergart/i,
    label: "Bergart",
    subtitle: "Ett eller flere mineraler, pluss løst sediment",
  },
  {
    match: /håndstykke/i,
    label: "Felt",
    subtitle: "Lupe, Mohs, syre og struktur",
  },
  {
    match: /hva er forvitring/i,
    label: "Forvitring",
    subtitle: "På stedet, mekanisk og kjemisk, før erosjon",
  },
  {
    match: /^mineraler/i,
    label: "Mineraler",
    subtitle: "Silikater, Mohs, kløv, strekfarge og syretest",
  },
  {
    match: /geologiske kretsløpet|bergartssyklus/i,
    label: "Kretsløpet",
    subtitle: "En modell med flere veier",
  },
  {
    match: /magmatiske/i,
    label: "Magmatiske",
    subtitle: "Dypbergart og dagbergart, gabbro, larvikitt",
  },
  {
    match: /sedimentære/i,
    label: "Sedimentære",
    subtitle: "Sandstein, leirstein og kalkstein",
  },
  {
    match: /metamorfe/i,
    label: "Metamorfe",
    subtitle: "Fyllitt, gneis og grønnstein",
  },
  {
    match: /petrografi|tynnsnitt/i,
    label: "Tynnsnitt",
    subtitle: "Polarisasjonsmikroskop og kryssede nicoler",
  },
  {
    match: /geologisk tid|datering/i,
    label: "Datering",
    subtitle: "Superposisjon, gjennomskjæring og isotopur",
  },
  {
    match: /hydrologiske kretsløpet/i,
    label: "Kretsløp",
    subtitle: "Fordampning, nedbør, infiltrasjon og grunnvann",
  },
  {
    match: /akvifer/i,
    label: "Akvifer",
    subtitle: "Porer, sprekker og grunnvann som lagres",
  },
  {
    match: /hydrogram/i,
    label: "Hydrogram",
    subtitle: "Vannføring mot tid",
  },
  {
    match: /^hva er en flom/i,
    label: "Flom",
    subtitle: "Regn, snøsmelting og varsel",
  },
  {
    match: /hva viste hans/i,
    label: "Hans",
    subtitle: "Nedbørrekorder i august 2023",
  },
  {
    match: /^hvordan påvirker mennesket/i,
    label: "Mennesket",
    subtitle: "Byer, drenering, vannkraft og grunnvann",
  },
  {
    match: /ferskvannet bærekraftig/i,
    label: "Bærekraft",
    subtitle: "Ferskvann i Norge og i verden",
  },
  {
    match: /^hva er et skred/i,
    label: "Skred",
    subtitle: "Fjell, løsmasse og volum",
  },
  {
    match: /^hva er kvikkleire/i,
    label: "Kvikkleire",
    subtitle: "Marin leire, salt og utvasking",
  },
  {
    match: /^hva er et fjellskred/i,
    label: "Fjellskred",
    subtitle: "Åknes, Mannen og overvåking",
  },
  {
    match: /^hvordan kan vi forebygge/i,
    label: "Forebygging",
    subtitle: "Sikring, kart og varsel",
  },
  {
    match: /geologisk ressurs/i,
    label: "Ressurs",
    subtitle: "Kartlegging, kritiske mineraler og grunnvann",
  },
  {
    match: /hvordan dannes malm/i,
    label: "Malm",
    subtitle: "Magmatisk og hydrotermal dannelse",
  },
  {
    match: /naturstein og pukk/i,
    label: "Stein",
    subtitle: "Naturstein, larvikitt og pukk",
  },
  {
    match: /utvinnes i norge/i,
    label: "Norge",
    subtitle: "Metaller, kobber, industrimineraler og petroleum",
  },
  {
    match: /drøfte konsekvensene/i,
    label: "Konsekvenser",
    subtitle: "Klimaavtrykk, klimagasser og kulturminner",
  },
  {
    match: /geofaglig feltarbeid/i,
    label: "Felt",
    subtitle: "Innsamling av data i geosfæren eller hydrosfæren",
  },
  {
    match: /observasjonene svare/i,
    label: "Spørsmål",
    subtitle: "Berggrunn, løsmasser, jordarter og lokale ressurser",
  },
  {
    match: /bearbeider og tolker/i,
    label: "Tolkning",
    subtitle: "Ordne data og forklare dem med en modell",
  },
  {
    match: /presenterer vi/i,
    label: "Presentasjon",
    subtitle: "Resultatene skal vise data og tolkning",
  },
  {
    match: /^sammendrag/i,
    label: "Sammendrag",
    subtitle: "Det viktigste i korte punkter",
  },
  {
    match: /fagvokabular|begrep/i,
    label: "Begreper",
    subtitle: "Kjernebegrepene du skal kunne forklare",
  },
  {
    match: /test deg selv/i,
    label: "Quiz",
    subtitle: "Sjekk om du kan gjøre rede for prosessene",
  },
];

const H2_LINE = /^#{2}(?!#)[ \t]+(.+?)\s*$/;
const H3_LINE = /^#{3}(?!#)[ \t]+(.+?)\s*$/;

export function slugifyHeading(title: string): string {
  const slug = title
    .normalize("NFKD")
    .replace(/[æÆ]/g, "ae")
    .replace(/[øØ]/g, "oe")
    .replace(/[åÅ]/g, "aa")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  return slug || "seksjon";
}

export function metaForHeading(title: string): Pick<ChapterScanSection, "label" | "subtitle"> {
  const hit = SECTION_META.find((rule) => rule.match.test(title));
  if (hit) return { label: hit.label, subtitle: hit.subtitle };
  return {
    label: title.replace(/:.+$/, "").trim() || title,
    subtitle: "Åpne for å lese hele fagteksten i denne delen",
  };
}

export function splitMarkdownByHeading(
  markdown: string,
  pattern: RegExp,
): { lead: string; blocks: { title: string; markdown: string }[] } {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const lead: string[] = [];
  const raw: { title: string; lines: string[] }[] = [];
  let current: { title: string; lines: string[] } | null = null;

  for (const line of lines) {
    const match = pattern.exec(line);
    if (match) {
      if (current) raw.push(current);
      current = { title: match[1].trim(), lines: [] };
      continue;
    }
    if (current) current.lines.push(line);
    else lead.push(line);
  }
  if (current) raw.push(current);

  return {
    lead: lead.join("\n").replace(/^\n+/, "").replace(/\n+$/, ""),
    blocks: raw.map((block) => ({
      title: block.title,
      markdown: block.lines.join("\n").replace(/^\n+/, "").replace(/\n+$/, ""),
    })),
  };
}

function uniqueId(title: string, used: Map<string, number>): string {
  const base = slugifyHeading(title);
  const count = (used.get(base) ?? 0) + 1;
  used.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

export function splitChapterByH2(markdown: string): ChapterScanDoc {
  const { lead: preamble, blocks } = splitMarkdownByHeading(markdown, H2_LINE);
  const used = new Map<string, number>();
  const sections = blocks.map((section) => {
    const id = uniqueId(section.title, used);
    const nested = splitMarkdownByHeading(section.markdown, H3_LINE);
    const subsections =
      nested.blocks.length >= 2
        ? nested.blocks.map((block) => ({
            id: uniqueId(block.title, used),
            title: block.title,
            markdown: block.markdown,
          }))
        : [];
    return {
      id,
      title: section.title,
      ...metaForHeading(section.title),
      markdown: section.markdown,
      lead: subsections.length > 0 ? nested.lead : "",
      subsections,
    };
  });

  return {
    preamble,
    sections,
  };
}

export function reconstructChapterMarkdown(doc: ChapterScanDoc): string {
  const parts: string[] = [];
  if (doc.preamble.trim()) parts.push(doc.preamble.trim());
  for (const section of doc.sections) {
    parts.push(`## ${section.title}`);
    if (section.markdown.trim()) parts.push(section.markdown.trim());
  }
  return parts.join("\n\n");
}

export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

const PLATETEKTONIKK_CHAPTER = /^##[ \t]+(?:Platetektonikk|Hva driver platene|Wilsonsyklusen)\b/m;
const RELOCATED_PLATE_SECTION = /wadati[-\s]?benioff|ofiolitt/i;

function isPlatetektonikkChapter(markdown: string): boolean {
  return PLATETEKTONIKK_CHAPTER.test(markdown);
}

/**
 * The saved Platetektonikk post can still contain the Wadati-Benioff and
 * Leka-ofiolitt chapters after they moved. Drop those H2s at render time.
 * Jordskjelv keeps Wadati-Benioff, and Norges geologi keeps ofiolitten.
 */
export function omitRelocatedPlatetektonikkSections(markdown: string): string {
  if (!isPlatetektonikkChapter(markdown)) return markdown;
  const { lead, blocks } = splitMarkdownByHeading(markdown, H2_LINE);
  const kept = blocks.filter((block) => !RELOCATED_PLATE_SECTION.test(block.title));
  if (kept.length === blocks.length) return markdown;
  const parts: string[] = [];
  if (lead.trim()) parts.push(lead.trim());
  for (const block of kept) {
    parts.push(`## ${block.title}`);
    if (block.markdown.trim()) parts.push(block.markdown.trim());
  }
  return parts.join("\n\n");
}

/** Same live chapter text the public page shows, ready to split into scan sections. */
export function prepareChapterScan(markdown: string): ChapterScanDoc {
  const source = omitRelocatedPlatetektonikkSections(stripChapterEditorNotice(markdown));
  return splitChapterByH2(injectPosterWidgets(source));
}
