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
 *
 * The live CMS row can also predate `geo-jordens-indre-lagdeling-3d.jpg`.
 * That photo is inserted above «Inndeling av jorden indre» when the stored
 * body does not already point at the file.
 */

export type PosterPart =
  | { type: "markdown"; value: string }
  | { type: "widget"; id: string };

export const EARTH_LAYERS_PHOTO_SRC = "/images/geo-jordens-indre-lagdeling-3d.jpg";

const EARTH_LAYERS_PHOTO_MD = `![Jordens skall: Fra fast indre kjerne til bevegelige litosfæreplater](${EARTH_LAYERS_PHOTO_SRC})`;

const EARTH_LAYERS_SECTION_HEADING = /^#{3,6}[^\n]*Inndeling av jord(?:en|as) indre[^\n]*$/m;

export const POSTER_PHOTO_SRCS = [
  EARTH_LAYERS_PHOTO_SRC,
  "/images/fig-spredring.jpg",
  "/images/geo-midthavsrygg-hydrotermal.jpg",
  "/images/geo-subduksjon-3d.jpg",
  "/images/geo-ofiolitt-leka.jpg",
  "/images/geo-wilsonsyklus-3d.jpg",
] as const;

type InjectRule = {
  widgets: string[];
  /** Skip the rule unless this snippet exists in the chapter markdown. */
  require?: string;
} & (
  | { beforeHeading: string }
  | { afterHeading: string }
  | { beforeImage: string }
  | { beforeLine: string }
);

const PLATE_INJECT_RULES: InjectRule[] = [
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
  { widgets: ["BoundaryOverview"], beforeHeading: "1. Divergerende" },
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
  {
    widgets: ["QuizTestDegSelv"],
    afterHeading: "Test deg selv",
    require: "Wilsonsyklusen",
  },
];

const CHAPTER_INJECT_RULES: InjectRule[] = [
  {
    widgets: ["MagmaViscosity"],
    beforeLine: "**Magmatyper**",
    require: "Eyjafjallajökull",
  },
  { widgets: ["VolcanoTypes"], beforeImage: "/images/geo-vulkantyper-3d.jpg" },
  {
    widgets: ["CalderaFormation"],
    beforeHeading: "Kalderaer",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["HotspotPlume"],
    beforeHeading: "Hotspots",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["IcelandContrast"],
    beforeHeading: "VEI: vulkansk eksplosivitetsindeks",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["VeiScale"],
    beforeLine: "| VEI | Tefravolum",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["VolcanoMonitoring"],
    beforeHeading: "Vulkanske farer og klima",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["VolcanoEruptionAnatomy"],
    beforeImage: "/images/geo-pliniansk-anatomi.jpg",
  },
  {
    widgets: ["VolcanicHazards"],
    beforeHeading: "1. Pyroklastiske strømmer",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["VolcanicWinter", "VolcanoModel"],
    beforeHeading: "Norsk vulkanisme",
  },
  {
    widgets: ["JanMayen"],
    beforeHeading: "Viktige faglige begreper",
    require: "Beerenberg",
  },
  {
    widgets: ["QuizVulkaner"],
    afterHeading: "Test deg selv",
    require: "Eyjafjallajökull",
  },
  {
    widgets: ["QuizHoytrykk"],
    afterHeading: "Test deg selv",
    require: "løftingskondensasjonsnivå",
  },
  {
    widgets: ["AtmosphericColumn"],
    beforeHeading: "Hva er høytrykk og lavtrykk?",
    require: "1 hPa for hver 8. meter",
  },
  {
    widgets: ["MettetForklaring"],
    afterHeading: "Hva skjer når luften stiger?",
    require: "duggpunktet",
  },
  {
    widgets: ["RelativePressure"],
    beforeHeading: "Isobarer og trykkgradient",
    require: "995 hPa",
  },
  {
    widgets: ["LowPressureCrossSection"],
    beforeHeading: "Høytrykk: nedsynking",
    require: "løftingskondensasjonsnivå",
  },
  {
    widgets: ["HighPressureCrossSection"],
    beforeHeading: "Viktige begreper",
    require: "bakkeinversjon",
  },
  { widgets: ["ElasticRebound"], beforeHeading: "Den seismiske syklusen" },
  {
    widgets: ["EarthquakeWavePhysics"],
    beforeImage: "/images/geo-jordskjelv-bolger-3d.jpg",
  },
  { widgets: ["Seismogram"], beforeHeading: "Lokalisering via sirkeltriangulering" },
  {
    widgets: ["BoundaryQuakes"],
    beforeHeading: "Spredningsrygger og transformforkastninger",
  },
  {
    widgets: ["NorwayEarthquakes"],
    beforeHeading: "To dominerende spenningskilder",
  },
  {
    widgets: ["QuizJordskjelv"],
    afterHeading: "Test deg selv",
    require: "elastisk tilbakefjæring",
  },
  {
    widgets: ["ForvitringForklaring"],
    afterHeading: "Hva er forvitring?",
  },
  {
    widgets: ["ForvitringFoto"],
    beforeHeading: "Hva er magmatiske bergarter?",
    require: "Hva er forvitring?",
  },
  {
    widgets: ["RockCycle"],
    afterHeading: "Hva er bergartssyklusen?",
  },
  {
    widgets: ["QuizBergarter"],
    afterHeading: "Test deg selv",
    require: "Hva er forvitring?",
  },
  {
    widgets: ["Kretslop"],
    afterHeading: "Hva er det hydrologiske kretsløpet?",
    require: "Hva er en akvifer?",
  },
  {
    widgets: ["AkviferForklaring"],
    afterHeading: "Hva er en akvifer?",
    require: "Hva er en akvifer?",
  },
  {
    widgets: ["Hydrograph"],
    afterHeading: "Hva er et hydrogram?",
    require: "Hva er en akvifer?",
  },
  {
    widgets: ["QuizVannOgFlom"],
    afterHeading: "Test deg selv",
    require: "Hva er en akvifer?",
  },
  {
    widgets: ["KvikkleireForklaring"],
    afterHeading: "Hva er kvikkleire?",
    require: "Hva er kvikkleire?",
  },
  {
    widgets: ["KvikkleireSteg"],
    beforeLine: "Figuren er en modell av de stegene",
    require: "Hva er kvikkleire?",
  },
  {
    widgets: ["QuizSkred"],
    afterHeading: "Test deg selv",
    require: "Hva er kvikkleire?",
  },
  {
    widgets: ["MalmForklaring"],
    beforeHeading: "Hvordan dannes malm?",
    require: "Hva er en geologisk ressurs?",
  },
  {
    widgets: ["QuizGeologiskeRessurser"],
    afterHeading: "Test deg selv",
    require: "Hva er en geologisk ressurs?",
  },
  {
    widgets: ["FeltarbeidForklaring"],
    beforeHeading: "Hva kan observasjonene svare på?",
    require: "Hva er geofaglig feltarbeid?",
  },
  {
    widgets: ["QuizFeltarbeid"],
    afterHeading: "Test deg selv",
    require: "Hva er geofaglig feltarbeid?",
  },
];

const INJECT_RULES: InjectRule[] = [...PLATE_INJECT_RULES, ...CHAPTER_INJECT_RULES];

export const POSTER_WIDGET_IDS: string[] = PLATE_INJECT_RULES.flatMap((rule) => rule.widgets);
export const CHAPTER_SCAN_WIDGET_IDS: string[] = CHAPTER_INJECT_RULES.flatMap(
  (rule) => rule.widgets,
);

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

/** Puts the 3D layer figure in Jordens indre when a saved post predates the file. */
export function injectEarthLayersPhoto(markdown: string): string {
  if (markdown.includes(EARTH_LAYERS_PHOTO_SRC)) return markdown;
  return insertBefore(markdown, EARTH_LAYERS_SECTION_HEADING, `\n\n${EARTH_LAYERS_PHOTO_MD}\n\n`);
}

export function injectPosterWidgets(markdown: string): string {
  const present = listedWidgetIds(markdown);
  let out = injectEarthLayersPhoto(markdown);
  for (const rule of INJECT_RULES) {
    if (rule.require && !markdown.includes(rule.require)) continue;
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
      `(!\\[[^\\]]*\\]\\(${escapeRegExp(src)}\\))(?:\\s*\\n+(?:-{3,}|\\*{3,}|_{3,}))*\\s*\\n+\\*[^\\n*]+\\*\\s*`,
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
