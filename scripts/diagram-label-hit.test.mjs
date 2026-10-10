import assert from "node:assert/strict";
import test from "node:test";
import { rangeValues, scanDiagramLabels, summarize } from "./diagram-label-hit.mjs";

test("rangeValues follows min, max and step", () => {
  assert.deepEqual(rangeValues(0, 100, 1).length, 101);
  assert.equal(rangeValues(0, 100, 1)[0], 0);
  assert.equal(rangeValues(0, 100, 1).at(-1), 100);
  assert.deepEqual(rangeValues(1, 12, 0.5), [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
  ]);
  assert.equal(rangeValues(0, 6, 0.1).length, 61);
  assert.equal(rangeValues(0, 6, 0.1).at(-1), 6);
});

test(
  "svg-etiketter er udekket, uten overlapp, uten strek gjennom teksten og innenfor viewBox",
  { skip: process.env.DIAGRAM_LABEL_HIT ? false : "sett DIAGRAM_LABEL_HIT=1 for å kjøre mot lokal server" },
  async () => {
    const report = await scanDiagramLabels({
      baseURL: process.env.DIAGRAM_LABEL_HIT_URL || "http://127.0.0.1:8080",
    });
    const text = summarize(report);
    assert.equal(report.figures.some((figure) => figure.missing), false, text);
    const issues = report.figures.flatMap((figure) => figure.issues || []);
    assert.deepEqual(issues, [], text);
    assert.deepEqual(report.pageErrors, [], text);
  },
);
