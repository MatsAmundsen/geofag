import assert from "node:assert/strict";
import test from "node:test";
import { encodePng, diffPng, isEdgeSlop } from "./qc-bergarter-png.mjs";
import {
  fontsUnderLimit,
  isKnownAxe,
  judgeMotion,
  labelIssueKey,
  labelRegression,
  overBudget,
  parseArgs,
  percentile,
  resolveChromeExecutable,
  proposeBudget,
  renderedFontPx,
  slug,
  summarizeCompare,
} from "./qc-bergarter.mjs";

test("slug folds norwegian letters", () => {
  assert.equal(slug("Avkjøling styrer kornstørrelsen"), "avkjoling-styrer-kornstorrelsen");
  assert.equal(slug("Følg en norsk bergart"), "folg-en-norsk-bergart");
});

test("system Chrome is used when CHROME_PATH is unset", () => {
  assert.equal(
    resolveChromeExecutable({}, (candidate) => candidate === "/usr/bin/google-chrome-stable"),
    "/usr/bin/google-chrome-stable",
  );
  assert.equal(
    resolveChromeExecutable({ CHROME_PATH: "/opt/chrome" }, () => false),
    "/opt/chrome",
  );
});

test("parseArgs defaults to compare and rejects unknown flags", () => {
  const opts = parseArgs([]);
  assert.equal(opts.command, "compare");
  assert.deepEqual(opts.widths, [390, 768, 1024, 1280]);
  assert.equal(parseArgs(["labels", "--strict"]).strict, true);
  assert.equal(parseArgs(["nope"]).error.includes("ukjent kommando"), true);
  assert.equal(parseArgs(["capture", "--widths", "390,abc"]).error.includes("widths"), true);
});

test("rendered font size follows viewBox scale", () => {
  assert.equal(renderedFontPx(16, 340, 700), 7.8);
  assert.equal(renderedFontPx(18.4, 340, 520), 12);
  assert.equal(renderedFontPx(14, 0, 700), 14);
});

test("png diff is zero for the same pixels and counts changes", () => {
  const solid = Buffer.alloc(2 * 2 * 4, 0);
  for (let i = 0; i < solid.length; i += 4) {
    solid[i] = 10;
    solid[i + 1] = 20;
    solid[i + 2] = 30;
    solid[i + 3] = 255;
  }
  const png = encodePng({ width: 2, height: 2, data: solid });
  assert.equal(diffPng(png, png).changed, 0);
  const edited = Buffer.from(solid);
  edited[4] = 200;
  const other = encodePng({ width: 2, height: 2, data: edited });
  const diff = diffPng(png, other);
  assert.equal(diff.changed, 1);
  assert.ok(diff.png.length > 8);
  const faint = Buffer.from(solid);
  faint[4] = 18;
  assert.equal(diffPng(png, encodePng({ width: 2, height: 2, data: faint })).changed, 0);
  const resized = encodePng({ width: 1, height: 1, data: solid.subarray(0, 4) });
  assert.equal(diffPng(png, resized).reason, "ulik størrelse");
  assert.equal(isEdgeSlop({ changed: 8, maxDelta: 25 }), true);
  assert.equal(isEdgeSlop({ changed: 8, maxDelta: 200 }), false);
  assert.equal(isEdgeSlop({ changed: 400, maxDelta: 20 }), false);
  assert.equal(isEdgeSlop({ changed: null }), false);
});

test("label regression ignores known issues and flags new text or smaller type", () => {
  const baseline = {
    issues: [{ width: 390, heading: "Ion", kind: "overlap", texts: ["B", "A"] }],
    fonts: [{ width: 390, heading: "Ion", minFontPx: 6.8 }],
  };
  const same = labelRegression(
    {
      issues: [{ width: 390, heading: "Ion", kind: "overlap", texts: ["A", "B"] }],
      fonts: [{ width: 390, heading: "Ion", minFontPx: 6.7 }],
    },
    baseline,
  );
  assert.equal(same.novel.length, 0);
  assert.equal(same.smaller.length, 0);
  const worse = labelRegression(
    {
      issues: [{ width: 390, heading: "Ion", kind: "covered", texts: ["Ny"] }],
      fonts: [{ width: 390, heading: "Ion", minFontPx: 4 }],
    },
    baseline,
  );
  assert.equal(worse.novel.length, 1);
  assert.equal(worse.smaller.length, 1);
  assert.equal(
    labelIssueKey(baseline.issues[0]),
    labelIssueKey({ ...baseline.issues[0], texts: ["A", "B"] }),
  );
});

test("12 px gate lists only 390 px labels under the limit", () => {
  const rows = fontsUnderLimit([
    { width: 390, heading: "Diagenese", minFontPx: 5.8 },
    { width: 390, heading: "Silikat", minFontPx: 12 },
    { width: 768, heading: "Diagenese", minFontPx: 8 },
    { width: 390, heading: "Foto", minFontPx: null },
  ]);
  assert.deepEqual(
    rows.map((row) => row.heading),
    ["Diagenese"],
  );
});

test("known axe findings are only the logo mismatch and quiz list items", () => {
  assert.equal(
    isKnownAxe({
      id: "label-content-name-mismatch",
      nodes: [{ html: '<a aria-label="Gå til hovedforsiden">Geofag</a>', target: ["a"] }],
    }),
    true,
  );
  assert.equal(
    isKnownAxe({
      id: "label-content-name-mismatch",
      nodes: [{ html: '<button aria-label="Lukk">X</button>', target: ["button"] }],
    }),
    false,
  );
  assert.equal(
    isKnownAxe({
      id: "listitem",
      nodes: [{ html: '<li><button role="radio">Basalt</button></li>', target: ["li"] }],
    }),
    true,
  );
  assert.equal(
    isKnownAxe({
      id: "listitem",
      nodes: [
        {
          html: "<li>",
          target: ['ul[aria-labelledby="_r_6_-q0-prompt"] > li:nth-child(2)'],
        },
      ],
    }),
    true,
  );
  assert.equal(
    isKnownAxe({
      id: "listitem",
      nodes: [{ html: "<li>løs tekst</li>", target: ["div > li"] }],
    }),
    false,
  );
  assert.equal(isKnownAxe({ id: "color-contrast", nodes: [{ html: "<p>Tekst</p>" }] }), false);
});

test("motion judge requires pause, off-screen stop, and aria-live", () => {
  const good = {
    startedPaused: true,
    idleRaf: 4,
    playingRaf: 70,
    offscreenRaf: 6,
    stepChangedOffscreen: false,
    liveWhilePlaying: "off",
    liveAfterChoice: "polite",
    pausedAfterChoice: true,
  };
  assert.deepEqual(judgeMotion(good), []);
  const bad = judgeMotion({
    ...good,
    liveWhilePlaying: "polite",
    offscreenRaf: 68,
    pausedAfterChoice: false,
  });
  assert.equal(bad.length, 3);
});

test("budget headroom stays above the sample", () => {
  const sample = {
    taskMs: 400,
    scriptMs: 220,
    longTaskCount: 2,
    longTaskMaxMs: 80,
    frameP95Ms: 32,
    scriptPerFrameMs: 1.4,
  };
  const budget = proposeBudget(sample);
  assert.deepEqual(overBudget(sample, budget), []);
  assert.ok(budget.taskMs >= sample.taskMs * 1.5);
  assert.equal(percentile([10, 20, 30, 40], 0.95), 40);
});

test("compare summary counts a clean run as all equal", () => {
  const text = summarizeCompare([
    { file: "a.png", status: "lik", changed: 0 },
    { file: "b.png", status: "avvik", changed: 12 },
  ]);
  assert.match(text, /like: 1/);
  assert.match(text, /avvik: 1/);
  assert.match(text, /b\.png/);
});
