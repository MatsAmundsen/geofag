// @ts-check
/**
 * Convert coded chapter pages (TSX) into Markdown seeds for the hybrid CMS.
 * Platetektonikk keeps its hand-authored file (`src/lib/platetektonikk-post.md`).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** @param {string} name */
function shouldSkipTag(name) {
  if (
    name === "Quiz" ||
    name === "GeoMap" ||
    name === "VideoPlaceholder" ||
    name === "PlateTectonicsModel" ||
    name === "VolcanoModel" ||
    name === "RockPetrologyModel" ||
    name === "LandformGeomorphologyModel" ||
    name === "WindSystemModel" ||
    name === "OceanCurrentModel" ||
    name === "CoriolisModel" ||
    name === "HurricaneSpinModel"
  ) {
    return true;
  }
  return name.endsWith("Diagram") || name.endsWith("Model");
}

/** @param {ts.Node} node */
function tagName(node) {
  if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
    return node.tagName.getText();
  }
  if (ts.isJsxElement(node)) return node.openingElement.tagName.getText();
  return "";
}

/**
 * @param {ts.JsxOpeningElement | ts.JsxSelfClosingElement} el
 * @returns {Record<string, string | boolean>}
 */
function attrs(el) {
  /** @type {Record<string, string | boolean>} */
  const out = {};
  for (const prop of el.attributes.properties) {
    if (!ts.isJsxAttribute(prop)) continue;
    const name = prop.name.getText();
    if (!prop.initializer) {
      out[name] = true;
      continue;
    }
    if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
      out[name] = prop.initializer.text;
      continue;
    }
    if (ts.isJsxExpression(prop.initializer) && prop.initializer.expression) {
      const expr = prop.initializer.expression;
      if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
        out[name] = expr.text;
      } else if (expr.kind === ts.SyntaxKind.TrueKeyword) {
        out[name] = true;
      } else if (expr.kind === ts.SyntaxKind.FalseKeyword) {
        out[name] = false;
      }
    }
  }
  return out;
}

/** @param {string} text */
function normalizeText(text) {
  return text.replace(/\s+/g, " ");
}

const INLINE_TAGS = new Set([
  "span",
  "strong",
  "em",
  "b",
  "i",
  "code",
  "a",
  "Link",
  "sub",
  "sup",
  "br",
  "img",
]);

/**
 * @param {readonly ts.Node[]} nodes
 */
function convertNodes(nodes) {
  let out = "";
  for (const n of nodes) {
    const md = convertNode(n);
    if (!md) continue;
    if (!out) {
      out = md;
      continue;
    }
    const glue =
      /\n\s*$/.test(out) || /^\s*\n/.test(md)
        ? "\n\n"
        : INLINE_TAGS.has(tagName(n)) || !/^\s*#/.test(md.trim())
          ? ""
          : "\n\n";
    if (glue === "\n\n") {
      out = `${out.replace(/\s+$/, "")}\n\n${md.replace(/^\s+/, "")}`;
    } else {
      out += md;
    }
  }
  return out;
}

/** @param {ts.Node} node */
function convertNode(node) {
  if (ts.isJsxFragment(node)) return convertNodes(node.children);
  if (ts.isJsxText(node)) {
    const t = normalizeText(node.text);
    return t.trim() ? t : node.text.includes("\n") ? "" : t;
  }
  if (ts.isJsxExpression(node)) {
    if (!node.expression) return "";
    if (ts.isStringLiteral(node.expression) || ts.isNoSubstitutionTemplateLiteral(node.expression)) {
      return node.expression.text;
    }
    if (
      ts.isJsxElement(node.expression) ||
      ts.isJsxSelfClosingElement(node.expression) ||
      ts.isJsxFragment(node.expression)
    ) {
      return convertNode(node.expression);
    }
    return "";
  }
  if (ts.isJsxSelfClosingElement(node)) return convertElement(tagName(node), attrs(node), "", node);
  if (ts.isJsxElement(node)) {
    const name = tagName(node);
    const a = attrs(node.openingElement);
    const inner = convertNodes(node.children);
    return convertElement(name, a, inner, node);
  }
  return "";
}

/**
 * @param {string} name
 * @param {Record<string, string | boolean>} a
 * @param {string} inner
 * @param {ts.Node} node
 */
function convertElement(name, a, inner, node) {
  if (shouldSkipTag(name)) return "";
  const trimmed = collapse(inner);

  switch (name) {
    case "h1":
      return block(`# ${inline(trimmed)}`);
    case "h2":
      return block(`## ${inline(trimmed)}`);
    case "h3":
      return block(`### ${inline(trimmed)}`);
    case "h4":
      return block(`#### ${inline(trimmed)}`);
    case "h5":
      return block(`##### ${inline(trimmed)}`);
    case "p":
      return block(inline(trimmed));
    case "strong":
    case "b":
      return `**${inline(trimmed)}**`;
    case "em":
    case "i":
      return `*${inline(trimmed)}*`;
    case "code":
      return `\`${inline(trimmed)}\``;
    case "br":
      return "  \n";
    case "blockquote":
      return block(
        inline(trimmed)
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n"),
      );
    case "a":
    case "Link": {
      const href = String(a.href || a.to || "");
      const text = inline(trimmed) || href;
      return href ? `[${text}](${href})` : text;
    }
    case "ul":
      return block(listItems(node, false));
    case "ol":
      return block(listItems(node, true));
    case "li":
      return inline(trimmed);
    case "table":
      return block(convertTable(node));
    case "Callout": {
      const title = String(a.title || "Merk");
      const quoted = trimmed
        ? trimmed
            .split("\n")
            .map((line) => (line.trim() ? `> ${line}` : ">"))
            .join("\n")
        : "";
      return block(`> **${title}**${quoted ? `\n>\n${quoted}` : ""}`);
    }
    case "OrdBoks": {
      const ord = String(a.ord || "");
      const barn = String(a.barn || trimmed);
      return block(`**${ord}:** ${inline(barn)}`);
    }
    case "Term": {
      const term = String(a.name || "");
      const def = String(a.def || trimmed);
      return block(`**${term}:** ${inline(def)}`);
    }
    case "PhotoFigure": {
      const src = String(a.src || "");
      const alt = String(a.alt || a.heading || "");
      const heading = String(a.heading || "");
      const caption = String(a.caption || "");
      const bits = [];
      if (src) bits.push(`![${alt}](${src})`);
      const note = [heading, caption].filter(Boolean).join(" — ");
      if (note) bits.push(`*${note}*`);
      return block(bits.join("\n\n"));
    }
    case "PhotoPair": {
      const heading = String(a.heading || "");
      const caption = String(a.caption || "");
      const bits = [];
      if (heading) bits.push(`**${heading}**`);
      if (caption) bits.push(`*${caption}*`);
      return block(bits.join("\n\n"));
    }
    case "FigurePlaceholder": {
      const heading = String(a.heading || "");
      const caption = String(a.caption || a.label || "");
      return block(`*${[heading, caption].filter(Boolean).join(" — ")}*`);
    }
    case "CollapsibleSection": {
      const title = String(a.title || "");
      const subtitle = String(a.subtitle || "");
      const head = subtitle ? `### ${title}\n\n*${subtitle}*` : `### ${title}`;
      return block(`${head}\n\n${trimmed}`);
    }
    case "img": {
      const src = String(a.src || "");
      const alt = String(a.alt || "");
      return src ? `![${alt}](${src})` : "";
    }
    case "span":
      return inner;
    default:
      return trimmed ? block(trimmed) : "";
  }
}

/** @param {string} s */
function inline(s) {
  return s.replace(/\s*\n\s*/g, " ").replace(/[ \t]{2,}/g, " ").trim();
}

/** @param {string} s */
function block(s) {
  const t = s.trim();
  return t ? `\n\n${t}\n\n` : "";
}

/** @param {string} s */
function collapse(s) {
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * @param {ts.Node} node
 * @param {boolean} ordered
 */
function listItems(node, ordered) {
  if (!ts.isJsxElement(node)) return "";
  const items = node.children.filter((c) => ts.isJsxElement(c) && tagName(c) === "li");
  return items
    .map((item, i) => {
      const text = inline(convertNode(item));
      const mark = ordered ? `${i + 1}.` : "-";
      return `${mark} ${text}`;
    })
    .join("\n\n");
}

/** @param {ts.Node} node */
function convertTable(node) {
  if (!ts.isJsxElement(node)) return "";
  /** @type {string[][]} */
  const rows = [];
  walkTable(node, rows);
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const padded = rows.map((r) => {
    const copy = [...r];
    while (copy.length < width) copy.push("");
    return copy;
  });
  const header = padded[0];
  const sep = header.map(() => "---");
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${sep.join(" | ")} |`,
    ...padded.slice(1).map((r) => `| ${r.join(" | ")} |`),
  ];
  return lines.join("\n");
}

/**
 * @param {ts.Node} node
 * @param {string[][]} rows
 */
function walkTable(node, rows) {
  if (ts.isJsxElement(node) && tagName(node) === "tr") {
    const cells = node.children
      .filter((c) => ts.isJsxElement(c) && (tagName(c) === "td" || tagName(c) === "th"))
      .map((c) => inline(convertNode(c)));
    if (cells.length) rows.push(cells);
    return;
  }
  if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
    for (const child of node.children) walkTable(child, rows);
  }
}

/**
 * @param {string} source
 * @param {string} fileName
 */
export function extractChapterMarkdown(source, fileName) {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  /** @type {ts.JsxElement | undefined} */
  let layout;
  /** @param {ts.Node} node */
  function visit(node) {
    if (layout) return;
    if (ts.isJsxElement(node) && tagName(node) === "TopicLayout") {
      layout = node;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  if (!layout) return { markdown: "", lead: "" };
  const lead = String(attrs(layout.openingElement).lead || "");
  const body = collapse(convertNodes(layout.children));
  return { markdown: body, lead };
}

/**
 * @param {string} path
 * @param {string} body
 */
export function withIntro(path, body) {
  const intro = `> Interaktive modeller, quizer og 3D-diagrammer ligger i kapittelet [${path}](${path}). Her kan du redigere **hele fagteksten**.`;
  return `${intro}\n\n${body.trim()}\n`;
}

function loadChapterMeta() {
  const nav = readFileSync(join(root, "src/lib/nav.ts"), "utf8");
  /** @type {{ slug: string, path: string, title: string }[]} */
  const chapters = [];
  const gf1 =
    [...nav.matchAll(/slug:\s*"([^"]+)"[\s\S]*?to:\s*"(\/geofag-1\/[^"]+)"[\s\S]*?title:\s*"([^"]+)"/g)];
  for (const m of gf1) chapters.push({ slug: m[1], path: m[2], title: m[3] });
  const gf2 = [...nav.matchAll(/to:\s*"(\/tema\/[^"]+)"[\s\S]*?title:\s*"([^"]+)"/g)];
  for (const m of gf2) {
    const path = m[1];
    if (path.includes("/klima/") && !path.endsWith("/klima")) {
      /* collected via KLIMA_SUBTHEMES below — but this regex also hits GF2_THEMES including /tema/klima */
    }
    const slug = path.replace(/\/$/, "").split("/").filter(Boolean).pop() ?? path;
    if (!chapters.some((c) => c.path === path)) {
      chapters.push({ slug, path, title: m[2] });
    }
  }
  return chapters;
}

function sourceForPath(path) {
  if (path === "/tema/klima") return join(root, "src/routes/tema/klima/index.tsx");
  return join(root, `src/routes${path}.tsx`);
}

export function extractAllChapters() {
  const chapters = loadChapterMeta();
  mkdirSync(join(root, "src/lib/posts"), { recursive: true });
  /** @type {Record<string, string>} */
  const leads = {};
  /** @type {{ slug: string, path: string, chars: number }[]} */
  const written = [];

  for (const ch of chapters) {
    if (ch.slug === "platetektonikk") {
      const md = readFileSync(join(root, "src/lib/platetektonikk-post.md"), "utf8");
      leads[ch.slug] =
        "Jordas ytre skall er delt i plater som glir på astenosfæren; der de møtes, endres både skorpe og overflate.";
      written.push({ slug: ch.slug, path: ch.path, chars: md.length });
      continue;
    }
    const file = sourceForPath(ch.path);
    const source = readFileSync(file, "utf8");
    const { markdown, lead } = extractChapterMarkdown(source, file);
    if (!markdown.trim()) {
      throw new Error(`No TopicLayout body extracted from ${file}`);
    }
    const out = withIntro(ch.path, markdown);
    writeFileSync(join(root, "src/lib/posts", `${ch.slug}.md`), out);
    leads[ch.slug] = lead.trim();
    written.push({ slug: ch.slug, path: ch.path, chars: out.length });
  }

  const ingressLines = [
    "/** Generated by scripts/extract-chapter-posts.mjs — do not edit by hand. */",
    "export const CHAPTER_INGRESS: Record<string, string> = {",
    ...Object.entries(leads).map(
      ([slug, lead]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(lead)},`,
    ),
    "};",
    "",
  ];
  writeFileSync(join(root, "src/lib/chapter-ingress.ts"), ingressLines.join("\n"));
  return written;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const written = extractAllChapters();
  for (const w of written) {
    console.log(`${w.slug.padEnd(28)} ${String(w.chars).padStart(7)}  ${w.path}`);
  }
  console.log(`\n${written.length} chapter posts`);
}
