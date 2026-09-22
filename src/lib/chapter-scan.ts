import { injectPosterWidgets, stripChapterEditorNotice } from "./poster-markdown.ts";

export type ChapterScanSection = {
  id: string;
  title: string;
  label: string;
  subtitle: string;
  markdown: string;
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
    match: /oppdagelsen|bevisene/i,
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
    match: /plategrensene/i,
    label: "Plategrenser",
    subtitle: "Divergens, konvergens og transform — seks geologiske miljøer",
  },
  {
    match: /interaktiv|modell/i,
    label: "Modell",
    subtitle: "Simulator for plategrenser, jordskjelv og smelting",
  },
  {
    match: /wilsonsyklus/i,
    label: "Wilsonsyklus",
    subtitle: "Havbassengenes liv og død over 400–600 millioner år",
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

export function splitChapterByH2(markdown: string): ChapterScanDoc {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const preamble: string[] = [];
  const raw: { title: string; lines: string[] }[] = [];
  let current: { title: string; lines: string[] } | null = null;

  for (const line of lines) {
    const match = H2_LINE.exec(line);
    if (match) {
      if (current) raw.push(current);
      current = { title: match[1].trim(), lines: [] };
      continue;
    }
    if (current) current.lines.push(line);
    else preamble.push(line);
  }
  if (current) raw.push(current);

  const used = new Map<string, number>();
  const sections = raw.map((section) => {
    const base = slugifyHeading(section.title);
    const count = (used.get(base) ?? 0) + 1;
    used.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;
    return {
      id,
      title: section.title,
      ...metaForHeading(section.title),
      markdown: section.lines.join("\n").replace(/^\n+/, "").replace(/\n+$/, ""),
    };
  });

  return {
    preamble: preamble.join("\n").replace(/^\n+/, "").replace(/\n+$/, ""),
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

/** Same live chapter text the public page shows, ready to split into scan sections. */
export function prepareChapterScan(markdown: string): ChapterScanDoc {
  return splitChapterByH2(injectPosterWidgets(stripChapterEditorNotice(markdown)));
}
