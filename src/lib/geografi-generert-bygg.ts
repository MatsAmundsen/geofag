/**
 * Bygger `geografi-generert.ts` fra md-tekstene (ingen nye definisjoner):
 * - begrepsregisteret: radene i hvert kapittels «## Begreper»-tabell
 * - meta-beskrivelse per underkapittel: første avsnitt i H2-blokken
 * Kjør `node --experimental-strip-types scripts/geografi-generer.mts` etter md-endringer.
 * Testen `geografi-seksjon.test.ts` feiler hvis fila ikke er i takt med md.
 */
import { slugifyHeading, splitMarkdownByHeading } from "./chapter-scan.ts";
import type { GeografiKapittel } from "./geografi-kapitler.ts";
import { firstParagraph, sliceGeografiUnderkapittel } from "./geografi-seksjon.ts";

export type GeografiBegrep = {
  readonly begrep: string;
  readonly forklaring: string;
  readonly kapittel: string;
  readonly kapittelNr: number;
  /** Underkapitlet der begrepet først står uthevet (`**begrep**`), ellers tomt. */
  readonly under: string;
};

const H2_LINE = /^#{2}(?!#)[ \t]+(.+?)\s*$/;

const plain = (cell: string) =>
  cell
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\\\|/g, "|")
    .replace(/\s+/g, " ")
    .trim();

function tableRows(markdown: string): [string, string][] {
  const rows: [string, string][] = [];
  const lines = markdown.split("\n").filter((l) => l.trim().startsWith("|"));
  for (const line of lines.slice(2)) {
    const cells = line
      .trim()
      .replace(/^\||\|$/g, "")
      .split(/(?<!\\)\|/)
      .map(plain);
    if (cells.length >= 2 && cells[0] && cells[1])
      rows.push([cells[0], cells.slice(1).join(" | ")]);
  }
  return rows;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function underFor(kap: GeografiKapittel, md: string, begrep: string): string {
  const title = kap.underkapitler.find((u) => slugifyHeading(u.title) === slugifyHeading(begrep));
  if (title) return title.id;
  const varianter = [
    begrep,
    begrep.replace(/\s*\([^)]*\)\s*$/, ""),
    ...begrep.split(/\s+(?:eller|og)\s+/),
  ].filter((v, i, all) => v.length >= 3 && all.indexOf(v) === i);
  const tests = [
    ...varianter.map((v) => new RegExp(`\\*\\*${esc(v)}`, "i")),
    ...varianter.map((v) => new RegExp(`(^|[^\\p{L}])${esc(v)}`, "iu")),
  ];
  for (const test of tests) {
    for (const u of kap.underkapitler) {
      const section = sliceGeografiUnderkapittel(md, u.title);
      if (section && test.test(section.replace(/^## .*\n/, ""))) return u.id;
    }
  }
  return "";
}

export function byggGeografiData(
  kapitler: readonly GeografiKapittel[],
  mdFor: (slug: string) => string,
): { begreper: GeografiBegrep[]; beskrivelser: Record<string, string> } {
  const begreper: GeografiBegrep[] = [];
  const beskrivelser: Record<string, string> = {};
  kapitler.forEach((kap, i) => {
    const md = mdFor(kap.slug);
    const { blocks } = splitMarkdownByHeading(md, H2_LINE);
    const tabell = blocks.find((b) => slugifyHeading(b.title) === "begreper");
    for (const [begrep, forklaring] of tabell ? tableRows(tabell.markdown) : []) {
      begreper.push({
        begrep,
        forklaring,
        kapittel: kap.path,
        kapittelNr: i + 1,
        under: underFor(kap, md, begrep),
      });
    }
    for (const u of kap.underkapitler) {
      const section = sliceGeografiUnderkapittel(md, u.title);
      const text = firstParagraph(section?.replace(/^## .*\n/, "") ?? "");
      if (text) beskrivelser[`${kap.path}/${u.id}`] = text;
    }
  });
  begreper.sort((a, b) => a.begrep.localeCompare(b.begrep, "nb") || a.kapittelNr - b.kapittelNr);
  return { begreper, beskrivelser };
}

export function renderGeografiData(data: ReturnType<typeof byggGeografiData>): string {
  return `// GENERERT av scripts/geografi-generer.mts fra src/lib/posts/geo-*.md. Ikke rediger for hånd.
import type { GeografiBegrep } from "./geografi-generert-bygg.ts";

export const GEOGRAFI_BEGREPER: readonly GeografiBegrep[] = ${JSON.stringify(data.begreper, null, 2)};

export const GEOGRAFI_UNDER_BESKRIVELSE: Readonly<Record<string, string>> = ${JSON.stringify(data.beskrivelser, null, 2)};
`;
}
