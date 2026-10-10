import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

export const WIDTHS = [390, 640, 768, 1024, 1280];

/** Figurer som er definert i plates.tsx, og siden de rendres på. */
export const PLATE_FIGURES = [
  { page: "/geofag-1/platetektonikk", heading: "Jordens skall:" },
  { page: "/geofag-1/platetektonikk", heading: "Hva beveger platene?" },
  { page: "/geofag-1/platetektonikk", heading: "Jordas tektoniske puslespill:" },
  { page: "/geofag-1/platetektonikk", heading: "Smeltefysikk i mantelen:" },
  { page: "/geofag-1/platetektonikk", heading: "Trykkfall som drivstoff:" },
  { page: "/geofag-1/platetektonikk", heading: "Tre relative bevegelser," },
  { page: "/geofag-1/platetektonikk", heading: "Midthavsryggen:" },
  { page: "/geofag-1/platetektonikk", heading: "Kontinental rift:" },
  { page: "/geofag-1/platetektonikk", heading: "Subduksjon:" },
  { page: "/geofag-1/platetektonikk", heading: "Hav mot hav:" },
  { page: "/geofag-1/platetektonikk", heading: "Kontinent mot kontinent:" },
  { page: "/geofag-1/platetektonikk", heading: "Transformgrenser:" },
  { page: "/geofag-1/vulkaner", heading: "En varm sone under platen" },
  { page: "/geofag-1/platetektonikk", heading: "Wilsonsyklusen:" },
  { page: "/geofag-1/norges-geologi", heading: "Norges geologiske reise:" },
  { page: "/geofag-1/norges-geologi", heading: "Norges geologiske nasjonalmonument:" },
];

export function rangeValues(min, max, step) {
  const safeStep = step > 0 ? step : 1;
  const n = Math.round((max - min) / safeStep);
  const values = [];
  for (let i = 0; i <= n; i += 1) values.push(Math.round((min + i * safeStep) * 1e6) / 1e6);
  return values;
}

/**
 * Måler etiketter i én figur. Kjører i nettleseren.
 * Dekning: elementFromPoint på flere punkt i tekstens bounding box.
 * Punktet ligger i glyffbåndet inne i boksen, så tom descender-kant mot et lag
 * under ikke alene teller som dekning. Hele etiketten bak et fyll blir fanget.
 * Overlapp: skjæringsflate etter at tom em-kant (20 % av bokshøyden) er tatt vekk,
 * og restskjæringen er større enn 2 px i begge retninger.
 * Kutt: boksen stikker mer enn 1,5 px utenfor svg-elementet (viewBox).
 */
export async function scanFigureInPage(headingPrefix) {
  const fig = [...document.querySelectorAll("figure")].find((candidate) => {
    const heading = candidate.querySelector(":scope > div p");
    return (heading?.textContent || "").trim().startsWith(headingPrefix);
  });
  if (!fig) return { heading: headingPrefix, missing: true, states: [], issues: [] };

  const heading = fig.querySelector(":scope > div p").textContent.trim();

  const valuesOf = (min, max, step) => {
    const safeStep = step > 0 ? step : 1;
    const n = Math.round((max - min) / safeStep);
    const values = [];
    for (let i = 0; i <= n; i += 1) values.push(Math.round((min + i * safeStep) * 1e6) / 1e6);
    return values;
  };

  const setRange = (input, value) => {
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    set.call(input, String(value));
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const buttonBy = (prefix) =>
    [...fig.querySelectorAll("button")].find((button) => (button.getAttribute("aria-label") || "").startsWith(prefix));

  const pause = () => buttonBy("Pause")?.click();
  const play = () => buttonBy("Start")?.click();

  const freeze = () => {
    for (const el of fig.querySelectorAll("svg *")) {
      el.style.setProperty("animation", "none", "important");
      el.style.setProperty("transition", "none", "important");
    }
  };

  const opacityOf = (el) => {
    let opacity = 1;
    for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") return 0;
      const value = Number(style.opacity);
      if (Number.isFinite(value)) opacity *= value;
      if (opacity <= 0.05) return opacity;
    }
    return opacity;
  };

  const boxOf = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  };

  const reveal = (el) => {
    document.documentElement.style.scrollBehavior = "auto";
    const scrolling = document.scrollingElement;
    let rect = el.getBoundingClientRect();
    scrolling.scrollTop += rect.top + rect.height / 2 - window.innerHeight * 0.55;
    const scroller = el.closest("[data-axis]");
    if (scroller) {
      rect = el.getBoundingClientRect();
      const frame = scroller.getBoundingClientRect();
      scroller.scrollLeft += rect.left + rect.width / 2 - (frame.left + frame.width / 2);
    }
  };

  const glyphBox = (rect) => {
    const inset = rect.height * 0.2;
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top + inset,
      bottom: rect.bottom - inset,
    };
  };

  const describe = (el) => {
    if (!el || el === document.documentElement || el === document.body) return el ? el.tagName.toLowerCase() : "ingen";
    const tag = el.tagName.toLowerCase();
    const own = (el.childNodes.length === 1 ? el.textContent : "") || "";
    const text = own.trim().replace(/\s+/g, " ").slice(0, 48);
    const fill = el.getAttribute?.("fill");
    const id = el.id ? `#${el.id}` : "";
    return [tag + id, fill, text].filter(Boolean).join(" ");
  };

  const measure = (state) => {
    freeze();
    const texts = [...fig.querySelectorAll("svg text")].filter((el) => {
      const value = el.textContent.trim();
      return value && opacityOf(el) > 0.05;
    });
    const boxes = texts.map((el) => {
      const svg = el.closest("svg");
      return {
        el,
        text: el.textContent.trim().replace(/\s+/g, " "),
        rect: boxOf(el),
        svg,
        svgRect: boxOf(svg),
      };
    });
    const issues = [];

    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        if (boxes[i].svg !== boxes[j].svg) continue;
        const a = glyphBox(boxes[i].rect);
        const b = glyphBox(boxes[j].rect);
        const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (width > 2 && height > 2) {
          issues.push({
            kind: "overlap",
            texts: [boxes[i].text, boxes[j].text],
            detail: `${width.toFixed(1)}×${height.toFixed(1)} px`,
            state,
          });
        }
      }
    }

    for (const item of boxes) {
      const svgBox = item.svgRect;
      const rect = item.rect;
      const tol = 1.5;
      const sides = [];
      if (rect.left < svgBox.left - tol) sides.push("venstre");
      if (rect.right > svgBox.right + tol) sides.push("høyre");
      if (rect.top < svgBox.top - tol) sides.push("topp");
      if (rect.bottom > svgBox.bottom + tol) sides.push("bunn");
      if (sides.length) {
        issues.push({ kind: "clip", texts: [item.text], detail: sides.join(", "), state });
      }

      reveal(item.el);
      const live = boxOf(item.el);
      const frame = item.el.closest("[data-axis]");
      const frameBox = frame
        ? {
            left: frame.getBoundingClientRect().left,
            top: frame.getBoundingClientRect().top,
            right: frame.getBoundingClientRect().left + frame.clientWidth,
            bottom: frame.getBoundingClientRect().top + frame.clientHeight,
          }
        : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
      const svgNow = boxOf(item.svg);
      const points = [];
      if (live.width >= 2 && live.height >= 2) {
        const cols = [0.15, 0.32, 0.5, 0.68, 0.85];
        const rows = [0.32, 0.5, 0.68];
        for (const row of rows) {
          for (const col of cols) {
            points.push({ x: live.left + live.width * col, y: live.top + live.height * row });
          }
        }
      } else {
        points.push({ x: live.left + live.width / 2, y: live.top + live.height / 2 });
      }

      const usable = points.filter(
        (point) =>
          point.x >= 1 &&
          point.y >= 1 &&
          point.x <= window.innerWidth - 1 &&
          point.y <= window.innerHeight - 1 &&
          point.x >= frameBox.left + 1 &&
          point.x <= frameBox.right - 1 &&
          point.y >= frameBox.top + 1 &&
          point.y <= frameBox.bottom - 1 &&
          point.x >= svgNow.left - 0.5 &&
          point.x <= svgNow.right + 0.5 &&
          point.y >= svgNow.top - 0.5 &&
          point.y <= svgNow.bottom + 0.5,
      );

      if (!usable.length) {
        issues.push({
          kind: "unhittable",
          texts: [item.text],
          detail: "ingen prøvepunkt i visningen etter sveip",
          state,
        });
        continue;
      }

      let covered = 0;
      let clear = 0;
      const tops = new Map();
      for (const point of usable) {
        const stack = document.elementsFromPoint(point.x, point.y).filter((el) => opacityOf(el) > 0.05);
        const top = stack[0];
        if (top === item.el || item.el.contains(top)) {
          clear += 1;
          continue;
        }
        const seen = stack.some((el) => el === item.el || item.el.contains(el));
        if (seen) {
          covered += 1;
          const name = describe(top);
          tops.set(name, (tops.get(name) || 0) + 1);
        }
      }

      if (covered >= 3 || covered / usable.length > 0.34) {
        const top = [...tops.entries()].sort((a, b) => b[1] - a[1])[0];
        issues.push({
          kind: "covered",
          texts: [item.text],
          detail: `${covered}/${usable.length} punkt, øverst: ${top ? top[0] : "ukjent"}`,
          state,
        });
      } else if (clear === 0) {
        issues.push({
          kind: "unhittable",
          texts: [item.text],
          detail: `${usable.length} punkt traff ikke teksten`,
          state,
        });
      }
    }

    return { state, textCount: boxes.length, issues };
  };

  const product = (lists) => lists.reduce((acc, list) => acc.flatMap((row) => list.map((item) => [...row, item])), [[]]);

  const stateName = (parts) => parts.filter(Boolean).join("; ") || "standard";

  pause();
  const ranges = [...fig.querySelectorAll('input[type="range"]')].map((input) => ({
    label: input.getAttribute("aria-label") || "verdi",
    input,
    values: valuesOf(Number(input.min), Number(input.max), Number(input.step) || 1),
  }));
  const groups = [...fig.querySelectorAll('[role="group"]')].map((group) => ({
    label: group.getAttribute("aria-label") || "gruppe",
    buttons: [...group.querySelectorAll("button")].map((button) => ({
      button,
      name: button.textContent.trim().replace(/\s+/g, " "),
    })),
  }));
  const phases = [...fig.querySelectorAll("button")].filter((button) => /^Fase \d/.test(button.textContent.trim()));
  const rangeCombos = ranges.length
    ? product(ranges.map((range) => range.values.map((value) => ({ label: range.label, input: range.input, value }))))
    : [[]];
  const groupCombos = groups.length
    ? product(groups.map((group) => group.buttons.map((button) => ({ label: group.label, ...button }))))
    : [[]];

  const states = [];
  for (const rangeCombo of rangeCombos) {
    for (const groupCombo of groupCombos) {
      for (const range of rangeCombo) setRange(range.input, range.value);
      for (const group of groupCombo) group.button.click();
      const name = stateName([
        "pause",
        ...rangeCombo.map((range) => `${range.label}=${range.value}`),
        ...groupCombo.map((group) => `${group.label}=${group.name}`),
      ]);
      states.push(measure(name));
    }
  }

  const stepGroup = groups.find((group) => group.label === "Trinn");
  if (stepGroup && buttonBy("Start")) {
    play();
    const others = groups.filter((group) => group !== stepGroup);
    const otherCombos = others.length
      ? product(others.map((group) => group.buttons.map((button) => ({ label: group.label, ...button }))))
      : [[]];
    for (const rangeCombo of rangeCombos) {
      for (const otherCombo of otherCombos) {
        for (const step of stepGroup.buttons) {
          for (const range of rangeCombo) setRange(range.input, range.value);
          for (const group of otherCombo) group.button.click();
          step.button.click();
          const name = stateName([
            "playing",
            ...rangeCombo.map((range) => `${range.label}=${range.value}`),
            ...otherCombo.map((group) => `${group.label}=${group.name}`),
            `Trinn=${step.name}`,
          ]);
          states.push(measure(name));
        }
      }
    }
    pause();
  } else if (heading.startsWith("Hva beveger platene?") && buttonBy("Start")) {
    play();
    const seen = new Set();
    const deadline = Date.now() + 12000;
    while (seen.size < 3 && Date.now() < deadline) {
      const match = fig.textContent.match(/Uthevet nå:\s*(\d)/);
      if (match && !seen.has(match[1])) {
        seen.add(match[1]);
        states.push(measure(`playing uthevet ${match[1]}`));
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (seen.size < 3) {
      states.push({
        state: "playing",
        textCount: 0,
        issues: [
          {
            kind: "unhittable",
            texts: ["(konveksjonssyklus)"],
            detail: `så bare utheving ${[...seen].join(", ") || "ingen"}`,
            state: "playing",
          },
        ],
      });
    }
    pause();
  } else if (buttonBy("Start") || buttonBy("Pause")) {
    play();
    states.push(measure("playing"));
    pause();
  }

  for (const phase of phases) {
    phase.click();
    states.push(measure(phase.textContent.trim().replace(/\s+/g, " ")));
  }

  return {
    heading,
    missing: false,
    states: states.map((entry) => ({ state: entry.state, textCount: entry.textCount })),
    issues: states.flatMap((entry) => entry.issues),
  };
}

function slug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function shootFigure(page, headingPrefix, file) {
  const figure = page.locator("figure").filter({ hasText: headingPrefix }).first();
  const svg = figure.locator("svg").first();
  if (await svg.count()) await svg.screenshot({ path: file });
  else await figure.screenshot({ path: file });
}

async function applyRange(page, headingPrefix, label, value) {
  await page.evaluate(
    ({ headingPrefix: prefix, label: rangeLabel, value: next }) => {
      const fig = [...document.querySelectorAll("figure")].find((candidate) =>
        (candidate.querySelector(":scope > div p")?.textContent || "").trim().startsWith(prefix),
      );
      const pause = [...fig.querySelectorAll("button")].find((button) =>
        (button.getAttribute("aria-label") || "").startsWith("Pause"),
      );
      pause?.click();
      const input = [...fig.querySelectorAll('input[type="range"]')].find(
        (candidate) => candidate.getAttribute("aria-label") === rangeLabel,
      );
      const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      set.call(input, String(next));
      input.dispatchEvent(new Event("input", { bubbles: true }));
      for (const el of fig.querySelectorAll("svg *")) el.style.setProperty("animation", "none", "important");
    },
    { headingPrefix, label, value },
  );
}

export async function scanDiagramLabels({
  baseURL = "http://127.0.0.1:8080",
  widths = WIDTHS,
  outDir,
  shots = false,
} = {}) {
  if (outDir) await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: "/usr/local/bin/google-chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const consoleErrors = [];
  const pageErrors = [];
  const figures = [];
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 1100 }, deviceScaleFactor: 1 });
      page.setDefaultTimeout(240000);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push({ width, text: message.text() });
      });
      page.on("pageerror", (error) => pageErrors.push({ width, text: String(error) }));

      const pages = [...new Set(PLATE_FIGURES.map((figure) => figure.page))];
      for (const route of pages) {
        process.stderr.write(`\n${width}px ${route}\n`);
        await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" });
        const onRoute = PLATE_FIGURES.filter((figure) => figure.page === route);
        await page.getByText(onRoute[0].heading, { exact: false }).first().waitFor();
        await page.getByText(onRoute[onRoute.length - 1].heading, { exact: false }).first().waitFor();
        for (const figure of PLATE_FIGURES.filter((item) => item.page === route)) {
          process.stderr.write(`  ${figure.heading}\n`);
          const result = await page.evaluate(scanFigureInPage, figure.heading);
          figures.push({ ...result, width, page: route });
          process.stderr.write(
            `    tilstander ${result.states?.length ?? 0}, feil ${result.issues?.length ?? 0}\n`,
          );
        }

        if (shots && outDir && route === "/geofag-1/platetektonikk") {
          for (const extension of [0, 40, 100]) {
            await applyRange(page, "Kontinental rift:", "Strekk", extension);
            await shootFigure(page, "Kontinental rift:", `${outDir}/rift-${width}-ext${extension}.png`);
          }
          if (width === 390) {
            await applyRange(page, "Kontinental rift:", "Strekk", 40);
            for (const label of ["Stiv kontinentallitosfære", "Riftsjø", "NORSK EKSEMPEL: OSLOFELTET"]) {
              await page.evaluate((text) => {
                const el = [...document.querySelectorAll("svg text")].find((node) => node.textContent.includes(text));
                if (!el) return;
                const scrolling = document.scrollingElement;
                const rect = el.getBoundingClientRect();
                scrolling.scrollTop += rect.top + rect.height / 2 - window.innerHeight * 0.55;
                const scroller = el.closest("[data-axis]");
                if (scroller) {
                  const again = el.getBoundingClientRect();
                  const frame = scroller.getBoundingClientRect();
                  scroller.scrollLeft += again.left + again.width / 2 - (frame.left + frame.width / 2);
                }
              }, label);
              await page.screenshot({ path: `${outDir}/rift-390-sveip-${slug(label)}.png` });
            }
          }
        }
        if (shots && outDir && route === "/geofag-1/norges-geologi" && (width === 390 || width === 1280)) {
          await shootFigure(page, "Norges geologiske nasjonalmonument:", `${outDir}/ofiolitt-${width}.png`);
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const report = { widths, figures, consoleErrors, pageErrors };
  if (outDir) await writeFile(`${outDir}/report.json`, JSON.stringify(report, null, 2));
  return report;
}

export function issueKey(issue) {
  return `${issue.kind}|${issue.texts.join(" | ")}`;
}

export function summarize(report) {
  const lines = [];
  for (const width of report.widths) {
    const rows = report.figures.filter((figure) => figure.width === width);
    for (const figure of rows) {
      const issues = figure.issues || [];
      if (figure.missing) {
        lines.push(`${width}px ${figure.heading}: FIGUR MANGLER`);
        continue;
      }
      const states = figure.states?.length ?? 0;
      const texts = Math.max(0, ...figure.states.map((state) => state.textCount));
      if (!issues.length) {
        lines.push(`${width}px ${figure.heading}: ${states} tilstander, maks ${texts} etiketter, ingen feil`);
        continue;
      }
      const grouped = new Map();
      for (const issue of issues) {
        const key = issueKey(issue);
        const current = grouped.get(key) || { issue, states: [] };
        current.states.push(issue.state);
        grouped.set(key, current);
      }
      lines.push(`${width}px ${figure.heading}: ${issues.length} feil i ${grouped.size} typer`);
      for (const { issue, states: where } of grouped.values()) {
        const sample = where.length > 4 ? `${where.slice(0, 3).join(" · ")} · +${where.length - 3}` : where.join(" · ");
        lines.push(`  ${issue.kind}: «${issue.texts.join("» / «")}» (${issue.detail}) [${sample}]`);
      }
    }
  }
  if (report.consoleErrors.length) lines.push(`konsollfeil: ${report.consoleErrors.length}`);
  if (report.pageErrors.length) lines.push(`sidefeil: ${report.pageErrors.length}`);
  return lines.join("\n");
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf("--out");
  const outDir = outIndex >= 0 ? args[outIndex + 1] : "";
  const shots = args.includes("--shots");
  const widthIndex = args.indexOf("--widths");
  const widths = widthIndex >= 0 ? args[widthIndex + 1].split(",").map(Number) : WIDTHS;
  const headingIndex = args.indexOf("--heading");
  if (headingIndex >= 0) {
    const needle = args[headingIndex + 1];
    for (let i = PLATE_FIGURES.length - 1; i >= 0; i -= 1) {
      if (!PLATE_FIGURES[i].heading.includes(needle)) PLATE_FIGURES.splice(i, 1);
    }
  }
  const report = await scanDiagramLabels({ outDir: outDir || undefined, shots, widths });
  const text = summarize(report);
  console.log(text);
  if (outDir) await writeFile(`${outDir}/summary.txt`, text);
  const failed = report.figures.some((figure) => figure.missing || (figure.issues || []).length);
  process.exit(failed ? 1 : 0);
}
