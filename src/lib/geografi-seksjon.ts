/**
 * Underkapittel-URL-er for Geografi: `/geografi/<kapittel>/<underkapittel>`.
 * Hver H2 i md-teksten som svarer til et underkapittel i `GEOGRAFI_KAPITLER`, får
 * egen side, og samme id som anker på kapittelsiden (`/geografi/<kap>#<under>`).
 */
import { slugifyHeading, splitMarkdownByHeading } from "./chapter-scan.ts";
import type { GeografiKapittel, GeografiUnderkapittel } from "./geografi-kapitler.ts";

const H2_LINE = /^#{2}(?!#)[ \t]+(.+?)\s*$/;

export function geografiUnderkapittel(
  kap: GeografiKapittel,
  id: string,
): GeografiUnderkapittel | undefined {
  return kap.underkapitler.find((u) => u.id === id);
}

export function geografiUnderkapittelNummer(kap: GeografiKapittel, id: string): number {
  return kap.underkapitler.findIndex((u) => u.id === id) + 1;
}

/** Overskrifts-slug (som `slugifyHeading` lager) → underkapittel-id. */
export function geografiHeadingAliases(kap: GeografiKapittel): Record<string, string> {
  return Object.fromEntries(kap.underkapitler.map((u) => [slugifyHeading(u.title), u.id]));
}

const sameTitle = (a: string, b: string) => slugifyHeading(a) === slugifyHeading(b);

/** H2-blokken for underkapitlet, med overskriften, eller `null` hvis den mangler. */
export function sliceGeografiUnderkapittel(markdown: string, title: string): string | null {
  const { blocks } = splitMarkdownByHeading(markdown, H2_LINE);
  const block = blocks.find((b) => sameTitle(b.title, title));
  if (!block) return null;
  return `## ${block.title}\n\n${block.markdown}`;
}

/** Første vanlige avsnitt i underkapitlet, som meta-beskrivelse (uten markdown). */
export function firstParagraph(markdown: string, max = 160): string {
  const para = markdown
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .find((p) => p && !/^(#|\||```|!\[|\[|>|-|\*|\d+\.)/.test(p));
  if (!para) return "";
  const plain = para
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
