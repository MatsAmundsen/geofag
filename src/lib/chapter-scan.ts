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
  {
    match: /^platetektonikk$/i,
    label: "Jordens indre",
    subtitle: "Skorpe, mantel, kjerne, litosfære og astenosfære",
  },
  {
    match: /oppdagelsen og bevisene|wegeners puslespill/i,
    label: "Bevisene",
    subtitle: "Wegener, Tharp, Hess og den magnetiske båndopptakeren",
  },
  {
    match: /driver platene|slab pull/i,
    label: "Drivkrefter",
    subtitle: "Slab pull, ridge push, basal drag og gropsug",
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
    match: /termiske motor/i,
    label: "Motor",
    subtitle: "Primordial varme, radiogen varme og vulkanisme som ventil",
  },
  {
    match: /^magmakjemi|silikatinnhold/i,
    label: "Magmakjemi",
    subtitle: "SiO₂, viskositet, Henrys lov og eksplosivitet",
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
    subtitle: "Fragmentering, askesøyle, Eyjafjallajökull og VEI",
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
    subtitle: "Ridge push, landheving og historiske skjelv",
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
    match: /^mineraler/i,
    label: "Mineraler",
    subtitle: "Silikater, Mohs, kløv, strekfarge og syretest",
  },
  {
    match: /geologiske kretsløpet|bergartssyklus/i,
    label: "Kretsløpet",
    subtitle: "Magmatisk, sedimentær og metamorf resirkulering",
  },
  {
    match: /magmatiske/i,
    label: "Magmatiske",
    subtitle: "Dyp-, gang- og dagbergart, Bowen, larvikitt",
  },
  {
    match: /sedimentære/i,
    label: "Sedimentære",
    subtitle: "Klastiske, kjemiske og biogene bergarter",
  },
  {
    match: /metamorfe/i,
    label: "Metamorfe",
    subtitle: "Foliasjon og metamorfosefacies",
  },
  {
    match: /petrografi|tynnsnitt/i,
    label: "Tynnsnitt",
    subtitle: "Polarisasjonsmikroskop og kryssede nicoler",
  },
  {
    match: /geologisk tid|datering/i,
    label: "Datering",
    subtitle: "Superposisjon, krysskjæring og isotopur",
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
