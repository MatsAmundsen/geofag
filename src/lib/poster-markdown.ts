/**
 * Poster markdown can include fenced widgets:
 *
 *     ```widget
 *     EarthLayers
 *     ```
 *
 * Existing Platetektonikk posts were saved as prose-only markdown (images, no
 * SVG diagrams / quizzes / model). `injectPosterWidgets` places those widgets
 * at render time from heading and image anchors so the live preview and the
 * published post match the coded chapter — without rewriting stored text.
 */

export type PosterPart =
  | { type: "markdown"; value: string }
  | { type: "widget"; id: string };

export const POSTER_PHOTO_SRCS = [
  "/images/fig-spredring.jpg",
  "/images/geo-midthavsrygg-hydrotermal.jpg",
  "/images/geo-subduksjon-3d.jpg",
  "/images/geo-ofiolitt-leka.jpg",
  "/images/geo-wilsonsyklus-3d.jpg",
] as const;

type InjectRule = {
  widgets: string[];
} & (
  | { beforeHeading: string }
  | { afterHeading: string }
  | { beforeImage: string }
  | { beforeLine: string }
);

const INJECT_RULES: InjectRule[] = [
  { widgets: ["EarthLayers"], beforeHeading: "Oppdagelsen og bevisene" },
  { widgets: ["Spreading"], beforeImage: "/images/fig-spredring.jpg" },
  {
    widgets: ["Convection"],
    beforeLine: "I dag kan vi måle disse bevegelsene direkte",
  },
  { widgets: ["PlatesMap"], beforeHeading: "Hvorfor mantelberg smelter" },
  {
    widgets: ["Solidus", "DecompressionMelting", "QuizMelting"],
    beforeHeading: "Plategrensene: Tre relative bevegelser",
  },
  { widgets: ["BoundaryOverview"], beforeHeading: "1. Divergerende grenser" },
  {
    widgets: ["ContinentalRift"],
    beforeImage: "/images/geo-midthavsrygg-hydrotermal.jpg",
  },
  {
    widgets: ["Subduction", "OceanOceanSubduction", "Collision"],
    beforeImage: "/images/geo-subduksjon-3d.jpg",
  },
  { widgets: ["Transform"], beforeHeading: "Geometrisk finesse" },
  {
    widgets: ["QuizBoundaries"],
    beforeHeading: "Interaktiv geodynamisk modell",
  },
  {
    widgets: ["PlateTectonicsModel"],
    beforeHeading: "Wilsonsyklusen",
  },
  { widgets: ["WilsonCycle"], beforeImage: "/images/geo-wilsonsyklus-3d.jpg" },
  {
    widgets: ["QuizOfiolittWilson"],
    beforeHeading: "Sentralt fagvokabular",
  },
  { widgets: ["QuizTestDegSelv"], afterHeading: "Test deg selv" },
];

export const POSTER_WIDGET_IDS: string[] = INJECT_RULES.flatMap((rule) => rule.widgets);

const WIDGET_FENCE = /```widget[ \t]*\r?\n([A-Za-z][A-Za-z0-9_-]*)[ \t]*\r?\n```/g;

export function listedWidgetIds(markdown: string): Set<string> {
  const ids = new Set<string>();
  const re = new RegExp(WIDGET_FENCE.source, "g");
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown))) {
    ids.add(match[1] ?? "");
  }
  ids.delete("");
  return ids;
}

export function parsePosterMarkdown(markdown: string): PosterPart[] {
  const parts: PosterPart[] = [];
  const re = new RegExp(WIDGET_FENCE.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown))) {
    const before = markdown.slice(last, match.index);
    if (before.trim()) parts.push({ type: "markdown", value: before });
    parts.push({ type: "widget", id: match[1] ?? "" });
    last = match.index + match[0].length;
  }
  const rest = markdown.slice(last);
  if (rest.trim()) parts.push({ type: "markdown", value: rest });
  if (parts.length === 0) parts.push({ type: "markdown", value: markdown });
  return parts;
}

export function injectPosterWidgets(markdown: string): string {
  const present = listedWidgetIds(markdown);
  let out = markdown;
  for (const rule of INJECT_RULES) {
    const missing = rule.widgets.filter((id) => !present.has(id));
    if (missing.length === 0) continue;
    const insertion = fences(missing);
    const next = applyRule(out, rule, insertion);
    if (next === out) continue;
    for (const id of missing) present.add(id);
    out = next;
  }
  return stripCatalogImageCaptions(out);
}

export function stripCatalogImageCaptions(markdown: string): string {
  let out = markdown;
  for (const src of POSTER_PHOTO_SRCS) {
    const re = new RegExp(
      `(!\\[[^\\]]*\\]\\(${escapeRegExp(src)}\\))\\s*\\n+\\*[^\\n*]+\\*\\s*`,
      "g",
    );
    out = out.replace(re, "$1\n\n");
  }
  return out;
}

function fences(ids: string[]): string {
  return `\n\n${ids.map((id) => `\`\`\`widget\n${id}\n\`\`\``).join("\n\n")}\n\n`;
}

function applyRule(markdown: string, rule: InjectRule, insertion: string): string {
  if ("beforeHeading" in rule) {
    return insertBefore(markdown, headingPattern(rule.beforeHeading), insertion);
  }
  if ("afterHeading" in rule) {
    return insertAfter(markdown, headingPattern(rule.afterHeading), insertion);
  }
  if ("beforeImage" in rule) {
    return insertBefore(markdown, imagePattern(rule.beforeImage), insertion);
  }
  return insertBefore(markdown, linePattern(rule.beforeLine), insertion);
}

function headingPattern(needle: string): RegExp {
  return new RegExp(`^#{2,6}[^\\n]*${escapeRegExp(needle)}[^\\n]*$`, "m");
}

function linePattern(needle: string): RegExp {
  return new RegExp(`^[^\\n]*${escapeRegExp(needle)}[^\\n]*$`, "m");
}

function imagePattern(src: string): RegExp {
  return new RegExp(`!\\[[^\\]]*\\]\\(${escapeRegExp(src)}\\)`);
}

function insertBefore(markdown: string, pattern: RegExp, insertion: string): string {
  const match = pattern.exec(markdown);
  if (!match) return markdown;
  return markdown.slice(0, match.index) + insertion + markdown.slice(match.index);
}

function insertAfter(markdown: string, pattern: RegExp, insertion: string): string {
  const match = pattern.exec(markdown);
  if (!match) return markdown;
  const end = match.index + match[0].length;
  return markdown.slice(0, end) + insertion + markdown.slice(end);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripChapterEditorNotice(markdown: string): string {
  return markdown.replace(
    /^>\s*Interaktive modeller, quizer og 3D-diagrammer ligger i kapittelet[^\r\n]*\r?\n+/i,
    "",
  );
}
