/**
 * QC for bergarter-modellene på /geofag-1/bergarter.
 *
 *   node scripts/qc-bergarter.mjs compare
 *   node scripts/qc-bergarter.mjs capture --out docs/qc/bergarter-baseline
 *   node scripts/qc-bergarter.mjs labels
 *   node scripts/qc-bergarter.mjs axe
 *   node scripts/qc-bergarter.mjs perf
 *   node scripts/qc-bergarter.mjs all
 *
 * Nettleser: CHROME_PATH, ellers Playwrights Chromium.
 * Etikettsjekken bruker scanFigureInPage fra diagram-label-hit.mjs.
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromeExecutableFromEnv } from "./diagram-label-hit.mjs";
import { scanFigureInPage, summarize as summarizeLabelHit } from "./diagram-label-hit.mjs";
import { diffPng } from "./qc-bergarter-png.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const WIDTHS = [390, 768, 1024, 1280];
export const MOTIONS = ["reduce", "no-preference"];
export const PAGE_PATH = "/geofag-1/bergarter";
export const MIN_FONT_PX = 12;
const BASELINE_DIR = join(ROOT, "docs/qc/bergarter-baseline");
const LABEL_BASELINE = join(ROOT, "docs/qc/bergarter-label-baseline.json");
const BUDGET_FILE = join(ROOT, "docs/qc/bergarter-budsjett.json");
const CURRENT_DIR = join(ROOT, "docs/qc/bergarter-current");
const DIFF_DIR = join(ROOT, "docs/qc/bergarter-diff");
const PERF_WINDOW_MS = 8000;
const FONT_SLACK_PX = 0.3;

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--font-render-hinting=none",
  "--disable-font-subpixel-positioning",
  "--disable-lcd-text",
  "--force-color-profile=srgb",
  "--hide-scrollbars",
  "--disable-gpu",
];

export function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

export function parseArgs(argv, env = process.env) {
  const [command = "compare", ...rest] = argv;
  const known = new Set(["compare", "capture", "labels", "axe", "perf", "all", "help"]);
  if (!known.has(command))
    return {
      error: `ukjent kommando «${command}». Bruk compare, capture, labels, axe, perf eller all.`,
    };
  const opts = {
    command,
    url: env.BERGARTER_QC_URL || "http://127.0.0.1:8080",
    baseline: BASELINE_DIR,
    out: command === "capture" ? BASELINE_DIR : CURRENT_DIR,
    diff: DIFF_DIR,
    labelBaseline: LABEL_BASELINE,
    budgetFile: BUDGET_FILE,
    widths: WIDTHS,
    only: "",
    writeBaseline: false,
    writeBudget: false,
    strict: false,
  };
  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    const next = () => {
      i += 1;
      if (rest[i] == null) throw new Error(`mangler verdi etter ${arg}`);
      return rest[i];
    };
    if (arg === "--url") opts.url = next();
    else if (arg === "--baseline") opts.baseline = next();
    else if (arg === "--out") opts.out = next();
    else if (arg === "--diff") opts.diff = next();
    else if (arg === "--widths") opts.widths = next().split(",").map(Number);
    else if (arg === "--only") opts.only = next();
    else if (arg === "--write-baseline") opts.writeBaseline = true;
    else if (arg === "--write-budget") opts.writeBudget = true;
    else if (arg === "--strict") opts.strict = true;
    else if (arg === "--help" || arg === "-h") opts.command = "help";
    else return { error: `ukjent argument ${arg}` };
  }
  if (opts.widths.some((width) => !Number.isFinite(width) || width < 200)) {
    return { error: "--widths må være tall, for eksempel 390,768,1024,1280" };
  }
  return opts;
}

export function renderedFontPx(cssPx, svgCssWidth, viewBoxWidth) {
  if (!(cssPx > 0)) return null;
  if (!(svgCssWidth > 0) || !(viewBoxWidth > 0)) return Math.round(cssPx * 10) / 10;
  return Math.round(((cssPx * svgCssWidth) / viewBoxWidth) * 10) / 10;
}

export function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(p * sorted.length) - 1));
  return sorted[index];
}

export function labelIssueKey(issue) {
  const texts = [...(issue.texts || [])].map((text) => text.trim()).sort();
  return `${issue.width}|${issue.heading}|${issue.kind}|${texts.join(" | ")}`;
}

export function labelRegression(current, baseline, slackPx = FONT_SLACK_PX) {
  const known = new Set((baseline.issues || []).map(labelIssueKey));
  const novel = (current.issues || []).filter((issue) => !known.has(labelIssueKey(issue)));
  const smaller = [];
  for (const row of current.fonts || []) {
    const prev = (baseline.fonts || []).find(
      (item) => item.width === row.width && item.heading === row.heading,
    );
    if (!prev || row.minFontPx == null || prev.minFontPx == null) continue;
    if (row.minFontPx < prev.minFontPx - slackPx) {
      smaller.push({
        heading: row.heading,
        width: row.width,
        minFontPx: row.minFontPx,
        previous: prev.minFontPx,
      });
    }
  }
  return { novel, smaller };
}

export function fontsUnderLimit(fonts, width = 390, limit = MIN_FONT_PX) {
  return (fonts || []).filter(
    (row) => row.width === width && row.minFontPx != null && row.minFontPx < limit - 0.05,
  );
}

function nodeBlob(node) {
  return `${node.html || ""}\n${(node.target || []).join(" ")}`;
}

/** Kjente grunnlinjefunn på f38ac70: logoens navn, og listitem i quiz-radiogrupper. */
export function isKnownAxe(violation) {
  const nodes = violation.nodes || [];
  if (!nodes.length) return false;
  if (violation.id === "label-content-name-mismatch") {
    return nodes.every((node) => /Gå til hovedforsiden/.test(nodeBlob(node)));
  }
  if (violation.id === "listitem") {
    return nodes.every((node) => /role="radio"|radiogroup/.test(nodeBlob(node)));
  }
  return false;
}

export function judgeMotion(sample) {
  const failures = [];
  if (!sample.startedPaused) failures.push("starter ikke pauset ved prefers-reduced-motion");
  if (sample.playingRaf < sample.idleRaf + 15) {
    failures.push(
      `klokken går ikke i visning (rAF ${sample.playingRaf}/s, hvile ${sample.idleRaf}/s)`,
    );
  }
  if (sample.offscreenRaf > sample.idleRaf + 12) {
    failures.push(
      `klokken stopper ikke utenfor skjermen (rAF ${sample.offscreenRaf}/s, hvile ${sample.idleRaf}/s)`,
    );
  }
  if (sample.stepChangedOffscreen)
    failures.push("data-step endret seg mens figuren var utenfor skjermen");
  if (sample.liveWhilePlaying !== "off") {
    failures.push(`aria-live under avspilling er «${sample.liveWhilePlaying}», kravet er off`);
  }
  if (sample.liveAfterChoice !== "polite") {
    failures.push(`aria-live etter valg er «${sample.liveAfterChoice}», kravet er polite`);
  }
  if (!sample.pausedAfterChoice) failures.push("valg pauset ikke avspillingen");
  return failures;
}

export function proposeBudget(sample, headroom = 1.5) {
  const up = (value, step) =>
    Math.max(step, Math.ceil(((Number(value) || 0) * headroom) / step) * step);
  return {
    taskMs: up(sample.taskMs, 50),
    scriptMs: up(sample.scriptMs, 50),
    longTaskCount: Math.max(1, Math.ceil((sample.longTaskCount || 0) * headroom + 1)),
    longTaskMaxMs: up(sample.longTaskMaxMs, 25),
    frameP95Ms: up(sample.frameP95Ms, 5),
    scriptPerFrameMs: Math.max(0.5, Math.ceil((sample.scriptPerFrameMs || 0) * headroom * 10) / 10),
  };
}

export function overBudget(sample, budget) {
  const fails = [];
  for (const key of [
    "taskMs",
    "scriptMs",
    "longTaskCount",
    "longTaskMaxMs",
    "frameP95Ms",
    "scriptPerFrameMs",
  ]) {
    if ((sample[key] ?? 0) > budget[key]) fails.push(`${key} ${sample[key]} > ${budget[key]}`);
  }
  return fails;
}

export function summarizeCompare(rows) {
  const count = (status) => rows.filter((row) => row.status === status).length;
  const lines = [
    `bilder: ${rows.length}`,
    `like: ${count("lik")}`,
    `avvik: ${count("avvik")}`,
    `mangler i kjøring: ${count("mangler-kjoring")}`,
    `nye mot grunnlag: ${count("ny")}`,
  ];
  const bad = rows.filter((row) => row.status !== "lik");
  for (const row of bad.slice(0, 40)) {
    const extra = row.changed == null ? "" : ` (${row.changed} px)`;
    lines.push(`  ${row.status}: ${row.file}${extra}`);
  }
  if (bad.length > 40) lines.push(`  … ${bad.length - 40} flere`);
  return lines.join("\n");
}

function gitHead() {
  try {
    return execSync("git rev-parse HEAD", { cwd: ROOT, encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

async function launchBrowser() {
  const executablePath = chromeExecutableFromEnv();
  if (executablePath && !existsSync(executablePath)) {
    throw new Error(`Fant ikke nettleseren på «${executablePath}».`);
  }
  return chromium.launch({
    ...(executablePath ? { executablePath } : {}),
    args: LAUNCH_ARGS,
  });
}

async function openPage(browser, { url, width, motion, rafProbe = false }) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: motion === "reduce" ? "reduce" : "no-preference",
    locale: "nb-NO",
  });
  page.setDefaultTimeout(180000);
  if (rafProbe) {
    await page.addInitScript(() => {
      const orig = window.requestAnimationFrame.bind(window);
      window.__qcRaf = { n: 0 };
      window.requestAnimationFrame = (cb) => {
        window.__qcRaf.n += 1;
        return orig(cb);
      };
    });
  }
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  await page.goto(`${url}${PAGE_PATH}`, { waitUntil: "domcontentloaded" });
  await page.locator("figure").first().waitFor();
  const fontOk = await page.evaluate(async () => {
    await document.fonts.ready;
    await document.fonts.load('400 16px "Source Sans 3"');
    await document.fonts.load('600 16px "Source Sans 3"');
    await document.fonts.load('700 16px "Source Sans 3"');
    return document.fonts.check('16px "Source Sans 3"');
  });
  if (!fontOk)
    throw new Error(
      "Source Sans 3 ble ikke lastet. Avbryter så grunnlaget ikke blir miljøavhengig.",
    );
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += 800) {
      window.scrollTo(0, y);
      await sleep(30);
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images]
        .filter((img) => !img.complete)
        .map((img) => img.decode().catch(() => undefined)),
    );
    for (const el of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(el).position;
      if (pos === "sticky" || pos === "fixed")
        el.style.setProperty("visibility", "hidden", "important");
    }
  });
  page.__qcPageErrors = pageErrors;
  return page;
}

async function listSteps(fig) {
  return fig.evaluate((root) =>
    [...root.querySelectorAll('[role="group"]')].map((group) => ({
      label: group.getAttribute("aria-label") || "",
      buttons: [...group.querySelectorAll("button")].map((button) =>
        button.textContent.trim().replace(/\s+/g, " "),
      ),
    })),
  );
}

async function clickStep(fig, label, text) {
  const button = fig.getByRole("group", { name: label, exact: true }).getByRole("button", {
    name: text,
    exact: true,
  });
  await button.scrollIntoViewIfNeeded();
  await button.click();
}

async function settle(page, motion) {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
  );
  await page.waitForTimeout(motion === "reduce" ? 40 : 400);
}

async function saveShot(locator, file) {
  await mkdir(dirname(file), { recursive: true });
  await locator.screenshot({ path: file, animations: "disabled", caret: "hide" });
}

async function walkSteps(page, fig, motion, visit) {
  const initial = await listSteps(fig);
  const first = initial.find((group) => group.buttons.length);
  if (first) {
    await clickStep(fig, first.label, first.buttons[0]);
    await settle(page, motion);
  }
  await visit("default");
  const queue = [];
  const queued = new Set();
  const enqueue = (groups) => {
    for (const group of groups) {
      group.buttons.forEach((text, index) => {
        const key = `${group.label}\n${index}\n${text}`;
        if (queued.has(key)) return;
        queued.add(key);
        queue.push({ label: group.label, text, key });
      });
    }
  };
  enqueue(await listSteps(fig));
  let n = 0;
  while (queue.length) {
    const item = queue.shift();
    n += 1;
    await clickStep(fig, item.label, item.text);
    await settle(page, motion);
    const name = `steg-${String(n).padStart(2, "0")}-${slug(item.text)}`;
    await visit(name);
    enqueue(await listSteps(fig));
  }
}

function keepHeading(heading, only) {
  return !only || heading.toLowerCase().includes(only.toLowerCase());
}

async function captureMatrix(browser, opts) {
  await mkdir(opts.out, { recursive: true });
  const files = [];
  const pageErrors = [];
  for (const width of opts.widths) {
    for (const motion of MOTIONS) {
      process.stderr.write(`\n${width}px ${motion}\n`);
      const page = await openPage(browser, { url: opts.url, width, motion });
      const figures = await page.evaluate(() =>
        [...document.querySelectorAll("figure")].map((fig) =>
          (fig.querySelector(":scope > div p, :scope > p")?.textContent || "")
            .trim()
            .replace(/\s+/g, " "),
        ),
      );
      for (let index = 0; index < figures.length; index += 1) {
        const heading = figures[index];
        if (!keepHeading(heading, opts.only)) continue;
        const folder = join(
          opts.out,
          String(width),
          motion,
          `${String(index).padStart(2, "0")}-${slug(heading)}`,
        );
        process.stderr.write(`  ${heading}\n`);
        const fig = page.locator("figure").nth(index);
        await fig.scrollIntoViewIfNeeded();
        await walkSteps(page, fig, motion, async (name) => {
          const file = join(folder, `${name}.png`);
          await saveShot(fig, file);
          files.push(relative(opts.out, file).split(sep).join("/"));
        });
      }
      if (!opts.only) {
        const photo = page.locator('img[src*="fig-tre-bergarter"]');
        if (await photo.count()) {
          const file = join(opts.out, String(width), motion, "bilde-tre-bergarter.png");
          await photo.scrollIntoViewIfNeeded();
          await saveShot(photo, file);
          files.push(relative(opts.out, file).split(sep).join("/"));
        }
      }
      pageErrors.push(...page.__qcPageErrors.map((text) => ({ width, motion, text })));
      await page.close();
    }
  }
  const manifest = {
    commit: gitHead(),
    url: `${opts.url}${PAGE_PATH}`,
    widths: opts.widths,
    motions: MOTIONS,
    files,
    pageErrors,
  };
  await writeFile(join(opts.out, "manifest.json"), JSON.stringify(manifest, null, 2));
  return manifest;
}

async function pngFiles(dir) {
  if (!existsSync(dir)) return [];
  const found = [];
  const walk = async (current) => {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".png")) found.push(relative(dir, full).split(sep).join("/"));
    }
  };
  await walk(dir);
  return found.sort();
}

export async function compareShots(baselineDir, currentDir, diffDir) {
  const baseline = await pngFiles(baselineDir);
  const current = new Set(await pngFiles(currentDir));
  const rows = [];
  await mkdir(diffDir, { recursive: true });
  for (const file of baseline) {
    if (!current.has(file)) {
      rows.push({ file, status: "mangler-kjoring", changed: null });
      continue;
    }
    current.delete(file);
    const left = await readFile(join(baselineDir, file));
    const right = await readFile(join(currentDir, file));
    if (left.equals(right)) {
      rows.push({ file, status: "lik", changed: 0 });
      continue;
    }
    const diff = diffPng(left, right);
    if (diff.changed === 0) {
      rows.push({ file, status: "lik", changed: 0 });
      continue;
    }
    if (diff.png) await writeFile(join(diffDir, file.replaceAll("/", "__")), diff.png);
    rows.push({
      file,
      status: "avvik",
      changed: diff.changed,
      reason: diff.reason,
    });
  }
  for (const file of current) rows.push({ file, status: "ny", changed: null });
  const text = summarizeCompare(rows);
  await writeFile(join(diffDir, "summary.txt"), text);
  await writeFile(join(diffDir, "summary.json"), JSON.stringify(rows, null, 2));
  return { rows, text, ok: rows.every((row) => row.status === "lik") };
}

function readFontsInPage(headingPrefix) {
  const fig = [...document.querySelectorAll("figure")].find((candidate) =>
    (candidate.querySelector(":scope > div p, :scope > p")?.textContent || "")
      .trim()
      .startsWith(headingPrefix),
  );
  if (!fig) return { missing: true, fonts: [] };
  const opacityOf = (el) => {
    let opacity = 1;
    for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") return 0;
      const value = Number(style.opacity);
      if (Number.isFinite(value)) opacity *= value;
      if (opacity <= 0.05) return opacity;
    }
    return opacity;
  };
  const fonts = [];
  for (const el of fig.querySelectorAll("svg text")) {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    if (!text || opacityOf(el) <= 0.05) continue;
    const css = Number.parseFloat(getComputedStyle(el).fontSize);
    const svg = el.ownerSVGElement;
    const vb = svg?.viewBox?.baseVal;
    const rect = svg?.getBoundingClientRect();
    const px =
      css > 0 && vb?.width > 0 && rect?.width > 0
        ? Math.round(((css * rect.width) / vb.width) * 10) / 10
        : css;
    fonts.push({ text: text.slice(0, 80), px });
  }
  const list = fig.querySelector('ol[aria-label="Forklaring til tallene i figuren"]');
  if (list && opacityOf(list) > 0.05) {
    const px = Number.parseFloat(getComputedStyle(list).fontSize);
    if (px > 0) fonts.push({ text: "(liste under figuren)", px: Math.round(px * 10) / 10 });
  }
  return { missing: false, fonts };
}

async function scanLabels(browser, opts) {
  const figures = [];
  const fonts = [];
  for (const width of opts.widths) {
    const page = await openPage(browser, { url: opts.url, width, motion: "reduce" });
    const headings = await page.evaluate(() =>
      [...document.querySelectorAll("figure")]
        .map((fig) => (fig.querySelector(":scope > div p, :scope > p")?.textContent || "").trim())
        .filter(Boolean),
    );
    process.stderr.write(`\n${width}px etiketter\n`);
    for (const heading of headings) {
      if (!keepHeading(heading, opts.only)) continue;
      process.stderr.write(`  ${heading}\n`);
      const hit = await page.evaluate(scanFigureInPage, heading);
      figures.push({ ...hit, width, page: PAGE_PATH });
      const fig = page.locator("figure").filter({ hasText: heading }).first();
      let minFontPx = null;
      const smallest = [];
      await walkSteps(page, fig, "reduce", async (state) => {
        const reading = await page.evaluate(readFontsInPage, heading);
        for (const font of reading.fonts || []) {
          if (minFontPx == null || font.px < minFontPx) minFontPx = font.px;
        }
        for (const font of reading.fonts || []) {
          if (minFontPx != null && font.px <= minFontPx + 0.05) {
            smallest.push({ ...font, state });
          }
        }
      });
      const unique = [];
      for (const font of smallest.filter(
        (font) => minFontPx == null || font.px <= minFontPx + 0.05,
      )) {
        if (!unique.some((item) => item.text === font.text && item.px === font.px))
          unique.push(font);
      }
      fonts.push({ width, heading, minFontPx, smallest: unique.slice(0, 8) });
      process.stderr.write(
        `    min skrift ${minFontPx ?? "–"} px, treff ${(hit.issues || []).length}\n`,
      );
    }
    await page.close();
  }
  const issues = figures.flatMap((figure) =>
    (figure.issues || []).map((issue) => ({
      width: figure.width,
      heading: figure.heading,
      kind: issue.kind,
      texts: issue.texts,
      detail: issue.detail,
      state: issue.state,
    })),
  );
  return { widths: opts.widths, figures, fonts, issues, commit: gitHead() };
}

function summarizeFonts(fonts) {
  const lines = [];
  for (const row of fonts) {
    const mark =
      row.width === 390 && row.minFontPx != null && row.minFontPx < MIN_FONT_PX - 0.05
        ? " UNDER 12"
        : "";
    lines.push(`${row.width}px ${row.heading}: min ${row.minFontPx ?? "–"} px${mark}`);
    if (mark) {
      for (const font of row.smallest || [])
        lines.push(`  «${font.text}» ${font.px} px [${font.state}]`);
    }
  }
  return lines.join("\n");
}

async function runAxe(browser, opts) {
  const axePath = require.resolve("axe-core/axe.min.js");
  const violations = [];
  const selected = opts.widths.filter((width) => width === 390 || width === 1280);
  const axeWidths = selected.length ? selected : [390, 1280];
  for (const width of axeWidths) {
    const page = await openPage(browser, { url: opts.url, width, motion: "reduce" });
    await page.addScriptTag({ path: axePath });
    const result = await page.evaluate(async () =>
      window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      }),
    );
    for (const violation of result.violations) {
      violations.push({
        width,
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          html: (node.html || "").slice(0, 300),
        })),
      });
    }
    await page.close();
  }
  const novel = violations.filter((violation) => !isKnownAxe(violation));
  const known = violations.filter((violation) => isKnownAxe(violation));
  return { violations, novel, known };
}

function formatAxe(report) {
  const lines = [
    `axe WCAG 2.2 AA: ${report.violations.length} funn, ${report.known.length} kjente, ${report.novel.length} nye`,
  ];
  for (const violation of report.known) {
    lines.push(`  kjent ${violation.width}px ${violation.id} (${violation.nodes.length} noder)`);
  }
  for (const violation of report.novel) {
    lines.push(
      `  NYTT ${violation.width}px ${violation.id} ${violation.impact}: ${violation.help}`,
    );
    for (const node of violation.nodes.slice(0, 3))
      lines.push(`    ${node.target?.join(" ")} ${node.html}`);
  }
  return lines.join("\n");
}

async function sampleRaf(page, ms = 1000) {
  const start = await page.evaluate(() => window.__qcRaf?.n ?? 0);
  await page.waitForTimeout(ms);
  const end = await page.evaluate(() => window.__qcRaf?.n ?? 0);
  return end - start;
}

async function playButton(fig) {
  return fig.evaluate((root) => {
    const button = [...root.querySelectorAll("button")].find((item) => {
      const label = item.getAttribute("aria-label") || "";
      return label.startsWith("Start animasjon") || label.startsWith("Pause animasjon");
    });
    return button ? button.getAttribute("aria-label") : null;
  });
}

async function readLive(fig) {
  return fig.evaluate(
    (root) => root.querySelector("[aria-live]")?.getAttribute("aria-live") ?? null,
  );
}

async function readStep(fig) {
  return fig.evaluate(
    (root) => root.querySelector("[data-step]")?.getAttribute("data-step") ?? null,
  );
}

async function runMotionAndPerf(browser, opts) {
  const page = await openPage(browser, {
    url: opts.url,
    width: 390,
    motion: "reduce",
    rafProbe: true,
  });
  const idleRaf = await sampleRaf(page, 1000);
  const headings = await page.evaluate(() =>
    [...document.querySelectorAll("figure")].map((fig) =>
      (fig.querySelector(":scope > div p, :scope > p")?.textContent || "")
        .trim()
        .replace(/\s+/g, " "),
    ),
  );
  const motion = [];
  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    if (!keepHeading(heading, opts.only)) continue;
    const fig = page.locator("figure").nth(index);
    const label = await playButton(fig);
    if (!label) continue;
    process.stderr.write(`bevegelse ${heading}\n`);
    await fig.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const startedPaused = (await playButton(fig)).startsWith("Start animasjon");
    await fig.locator('button[aria-label^="Start animasjon"]').click();
    await page.waitForTimeout(250);
    const liveWhilePlaying = await readLive(fig);
    const playingRaf = await sampleRaf(page, 1000);
    const stepBefore = await readStep(fig);
    await fig.evaluate((el) => {
      const bottom = el.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo(0, bottom + 220);
    });
    await page.waitForTimeout(350);
    const offscreen = await fig.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.bottom < -120 || rect.top > window.innerHeight + 120;
    });
    const offscreenRaf = await sampleRaf(page, 1000);
    await page.waitForTimeout(5500);
    const stepAfter = await readStep(fig);
    await fig.scrollIntoViewIfNeeded();
    const choice = fig.locator('[role="group"] button[aria-pressed="false"]').first();
    await choice.click();
    await page.waitForTimeout(200);
    const liveAfterChoice = await readLive(fig);
    const pausedAfterChoice = (await playButton(fig)).startsWith("Start animasjon");
    const sample = {
      heading,
      idleRaf,
      playingRaf,
      offscreenRaf,
      offscreen,
      startedPaused,
      stepChangedOffscreen: stepBefore !== stepAfter,
      liveWhilePlaying,
      liveAfterChoice,
      pausedAfterChoice,
    };
    const failures = judgeMotion(sample);
    if (!offscreen) failures.push("figuren ble ikke flyttet utenfor skjermen");
    motion.push({ ...sample, failures });
    process.stderr.write(
      `  rAF hvile ${idleRaf} spill ${playingRaf} ute ${offscreenRaf} feil ${failures.length}\n`,
    );
  }

  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Performance.enable");
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const perf = [];
  try {
    for (let index = 0; index < headings.length; index += 1) {
      const heading = headings[index];
      if (!keepHeading(heading, opts.only)) continue;
      const fig = page.locator("figure").nth(index);
      if (!(await playButton(fig))) continue;
      process.stderr.write(`cpu ${heading}\n`);
      await fig.scrollIntoViewIfNeeded();
      const toggle = await playButton(fig);
      if (toggle.startsWith("Start animasjon")) {
        await fig.locator('button[aria-label^="Start animasjon"]').click();
      }
      await page.waitForTimeout(400);
      const sample = await measurePlayback(page, cdp, PERF_WINDOW_MS);
      perf.push({ heading, ...sample });
      process.stderr.write(
        `  task ${sample.taskMs} ms, script ${sample.scriptMs} ms, long ${sample.longTaskCount} (maks ${sample.longTaskMaxMs}), p95 ${sample.frameP95Ms} ms, script/frame ${sample.scriptPerFrameMs}\n`,
      );
      if ((await playButton(fig)).startsWith("Pause animasjon")) {
        await fig.locator('button[aria-label^="Pause animasjon"]').click();
      }
    }
  } finally {
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    await page.close();
  }
  return { idleRaf, motion, perf, windowMs: PERF_WINDOW_MS, throttle: 4, viewport: 390 };
}

async function measurePlayback(page, cdp, ms) {
  await page.evaluate(() => {
    window.__qcPerf = { longtasks: [], frames: [] };
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__qcPerf.longtasks.push(entry.duration);
    });
    observer.observe({ type: "longtask" });
    window.__qcPerf.observer = observer;
    let last = performance.now();
    const loop = (now) => {
      window.__qcPerf.frames.push(now - last);
      last = now;
      window.__qcPerf.raf = requestAnimationFrame(loop);
    };
    window.__qcPerf.raf = requestAnimationFrame(loop);
  });
  const before = Object.fromEntries(
    (await cdp.send("Performance.getMetrics")).metrics.map((item) => [item.name, item.value]),
  );
  await page.waitForTimeout(ms);
  const after = Object.fromEntries(
    (await cdp.send("Performance.getMetrics")).metrics.map((item) => [item.name, item.value]),
  );
  const data = await page.evaluate(() => {
    cancelAnimationFrame(window.__qcPerf.raf);
    window.__qcPerf.observer.disconnect();
    return { longtasks: window.__qcPerf.longtasks, frames: window.__qcPerf.frames.slice(1) };
  });
  const taskMs = Math.round(((after.TaskDuration || 0) - (before.TaskDuration || 0)) * 1000);
  const scriptMs = Math.round(((after.ScriptDuration || 0) - (before.ScriptDuration || 0)) * 1000);
  const frames = data.frames.filter((value) => value >= 0 && value < 2000);
  const frameP95Ms = Math.round(percentile(frames, 0.95) * 10) / 10;
  return {
    taskMs,
    scriptMs,
    longTaskCount: data.longtasks.length,
    longTaskMaxMs: Math.round(Math.max(0, ...data.longtasks)),
    frameP95Ms,
    frameCount: frames.length,
    scriptPerFrameMs: frames.length ? Math.round((scriptMs / frames.length) * 10) / 10 : 0,
  };
}

function formatPerf(report, budget) {
  const lines = [
    `CPU 4× throttle, 390 px, ${report.windowMs} ms avspilling per figur. Hvile-rAF ${report.idleRaf}/s.`,
  ];
  for (const row of report.perf) {
    const limits = budget?.figures?.[row.heading];
    const fails = !budget ? [] : limits ? overBudget(row, limits) : ["ingen budsjett for figuren"];
    lines.push(
      `${fails.length ? "OVER" : "ok"} ${row.heading}: task ${row.taskMs} ms, script ${row.scriptMs} ms, long tasks ${row.longTaskCount} (maks ${row.longTaskMaxMs} ms), frame p95 ${row.frameP95Ms} ms, script/frame ${row.scriptPerFrameMs} ms`,
    );
    for (const fail of fails) lines.push(`  ${fail}`);
  }
  lines.push("Bevegelse og aria-live:");
  for (const row of report.motion) {
    lines.push(
      `${row.failures.length ? "FEIL" : "ok"} ${row.heading}: rAF ${row.playingRaf}/s i visning, ${row.offscreenRaf}/s utenfor, aria ${row.liveWhilePlaying} → ${row.liveAfterChoice}`,
    );
    for (const failure of row.failures) lines.push(`  ${failure}`);
  }
  return lines.join("\n");
}

function helpText() {
  return [
    "node scripts/qc-bergarter.mjs compare [--baseline dir] [--out dir] [--diff dir]",
    "node scripts/qc-bergarter.mjs capture --out docs/qc/bergarter-baseline",
    "node scripts/qc-bergarter.mjs labels [--write-baseline] [--strict]",
    "node scripts/qc-bergarter.mjs axe",
    "node scripts/qc-bergarter.mjs perf [--write-budget]",
    "node scripts/qc-bergarter.mjs all",
    "Felles: --url http://127.0.0.1:8080 --widths 390,768,1024,1280 --only Diagenese",
  ].join("\n");
}

async function commandCompare(opts) {
  if (!existsSync(opts.baseline)) {
    throw new Error(`Mangler grunnlag i ${opts.baseline}. Kjør capture først.`);
  }
  const browser = await launchBrowser();
  try {
    await captureMatrix(browser, { ...opts, out: opts.out });
  } finally {
    await browser.close();
  }
  const result = await compareShots(opts.baseline, opts.out, opts.diff);
  console.log(result.text);
  return result.ok;
}

async function commandCapture(opts) {
  const browser = await launchBrowser();
  try {
    const manifest = await captureMatrix(browser, opts);
    console.log(`skrev ${manifest.files.length} bilder til ${opts.out}`);
    return manifest.pageErrors.length === 0;
  } finally {
    await browser.close();
  }
}

async function commandLabels(opts) {
  const browser = await launchBrowser();
  let report;
  try {
    report = await scanLabels(browser, opts);
  } finally {
    await browser.close();
  }
  const hitSummary = summarizeLabelHit({
    widths: opts.widths,
    figures: report.figures,
    consoleErrors: [],
    pageErrors: [],
  });
  const fontSummary = summarizeFonts(report.fonts);
  console.log(hitSummary);
  console.log(fontSummary);
  const under = fontsUnderLimit(report.fonts);
  if (opts.writeBaseline) {
    await mkdir(dirname(opts.labelBaseline), { recursive: true });
    await writeFile(
      opts.labelBaseline,
      JSON.stringify(
        {
          commit: report.commit,
          minFontPx: MIN_FONT_PX,
          issues: report.issues.map(({ width, heading, kind, texts }) => ({
            width,
            heading,
            kind,
            texts,
          })),
          fonts: report.fonts,
        },
        null,
        2,
      ),
    );
    console.log(`skrev ${opts.labelBaseline}`);
  }
  if (!existsSync(opts.labelBaseline)) {
    console.error("Mangler etikettsgrunnlag. Kjør labels --write-baseline");
    return false;
  }
  const baseline = JSON.parse(await readFile(opts.labelBaseline, "utf8"));
  const regression = labelRegression({ issues: report.issues, fonts: report.fonts }, baseline);
  if (regression.novel.length) {
    console.log(`nye etikettfunn: ${regression.novel.length}`);
    for (const issue of regression.novel.slice(0, 30)) {
      console.log(
        `  ${issue.width}px ${issue.kind}: «${issue.texts.join("» / «")}» (${issue.heading})`,
      );
    }
  } else console.log("ingen nye etikettfunn mot grunnlaget");
  if (regression.smaller.length) {
    console.log("skrift har blitt mindre:");
    for (const row of regression.smaller) {
      console.log(`  ${row.width}px ${row.heading}: ${row.minFontPx} px, var ${row.previous}`);
    }
  }
  if (under.length) {
    console.log(
      `under 12 px ved 390 px: ${under.length} figurer (kjent på grunnlaget til de er rettet)`,
    );
  }
  const strictFail = opts.strict && under.length > 0;
  return regression.novel.length === 0 && regression.smaller.length === 0 && !strictFail;
}

async function commandAxe(opts) {
  const browser = await launchBrowser();
  let report;
  try {
    report = await runAxe(browser, opts);
  } finally {
    await browser.close();
  }
  await mkdir(opts.out, { recursive: true });
  await writeFile(join(opts.out, "axe.json"), JSON.stringify(report, null, 2));
  console.log(formatAxe(report));
  return report.novel.length === 0;
}

async function commandPerf(opts) {
  const browser = await launchBrowser();
  let report;
  try {
    report = await runMotionAndPerf(browser, opts);
  } finally {
    await browser.close();
  }
  let budget = null;
  if (opts.writeBudget) {
    budget = {
      commit: gitHead(),
      throttle: 4,
      viewport: 390,
      windowMs: PERF_WINDOW_MS,
      headroom: 1.5,
      note: "Grenser er målingen fra grunnlaget ganger 1,5, rundet opp. script/frame inkluderer målesløyfen.",
      figures: Object.fromEntries(report.perf.map((row) => [row.heading, proposeBudget(row)])),
    };
    await mkdir(dirname(opts.budgetFile), { recursive: true });
    await writeFile(opts.budgetFile, JSON.stringify(budget, null, 2));
    console.log(`skrev ${opts.budgetFile}`);
  } else if (existsSync(opts.budgetFile)) {
    budget = JSON.parse(await readFile(opts.budgetFile, "utf8"));
  }
  console.log(formatPerf(report, budget));
  await mkdir(opts.out, { recursive: true });
  await writeFile(join(opts.out, "perf.json"), JSON.stringify(report, null, 2));
  const motionFail = report.motion.some((row) => row.failures.length);
  const budgetFail =
    budget &&
    report.perf.some((row) => {
      const limits = budget.figures?.[row.heading];
      return !limits || overBudget(row, limits).length > 0;
    });
  if (!budget) console.log("ingen budsjettfil. Kjør perf --write-budget for å lagre grenser.");
  return !motionFail && !budgetFail;
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(2);
  }
  if (opts.error) {
    console.error(opts.error);
    console.error(helpText());
    process.exit(2);
  }
  if (opts.command === "help") {
    console.log(helpText());
    return;
  }
  const commands = {
    compare: commandCompare,
    capture: commandCapture,
    labels: commandLabels,
    axe: commandAxe,
    perf: commandPerf,
  };
  if (opts.command === "all") {
    let ok = true;
    for (const name of ["compare", "labels", "axe", "perf"]) {
      process.stderr.write(`\n== ${name} ==\n`);
      const passed = await commands[name](opts);
      console.log(`${name}: ${passed ? "OK" : "FEIL"}`);
      if (!passed) ok = false;
    }
    process.exit(ok ? 0 : 1);
  }
  const passed = await commands[opts.command](opts);
  process.exit(passed ? 0 : 1);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    process.exit(1);
  });
}
