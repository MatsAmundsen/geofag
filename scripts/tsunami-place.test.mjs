// Etikettplassering i tsunamimodellene: ledelinjer skal ikke krysse streker som er
// meldt inn med avoidLine, for eksempel glidepilene i M1.
import assert from "node:assert/strict";
import test from "node:test";
import { tsunamiDir as dir } from "./tsunami-ts-hooks.mjs";

const { LabelLayout } = await import(new URL("place.ts", dir).href);

/** Lerret uten tegning: måler tekst som 8 px per tegn og logger ledelinjene. */
function fakeCtx() {
  const lines = [];
  let from = null;
  const ctx = new Proxy(
    {
      measureText: (t) => ({
        width: t.length * 8,
        actualBoundingBoxAscent: 11,
        actualBoundingBoxDescent: 3,
      }),
      moveTo: (x, y) => (from = { x, y }),
      lineTo: (x, y) => lines.push({ ...from, x1: x, y1: y }),
    },
    { get: (o, k) => (k in o ? o[k] : () => {}), set: () => true },
  );
  return { ctx, lines };
}

const frame = { x0: 0, y0: 0, x1: 400, y1: 300 };
const target = { x: 100, y: 200 };
const spots = [
  // Etikett oppe til høyre med ledelinje ned til punktet.
  { x: 160, y: 140, to: target },
  // Etikett rett ved punktet, uten ledelinje.
  { x: 130, y: 215 },
];

test("uten hindringer brukes første plass med ledelinje", () => {
  const { ctx, lines } = fakeCtx();
  const lay = new LabelLayout(ctx, frame);
  const box = lay.place("bruddflate", spots);
  assert.equal(Math.round(box.x0), 158);
  assert.equal(lines.length, 1);
  assert.deepEqual([lines[0].x1, lines[0].y1], [100, 200]);
});

test("en pil som ledelinja ville krysset, gir neste plass uten ledelinje", () => {
  const { ctx, lines } = fakeCtx();
  const lay = new LabelLayout(ctx, frame);
  // Pil på skrå mellom etiketten og punktet.
  lay.avoidLine(110, 170, 130, 200);
  const box = lay.place("bruddflate", spots);
  assert.equal(Math.round(box.x0), 128);
  assert.equal(lines.length, 0);
});

test("en pil som bare går tett inntil ledelinja (under 3 px), regnes også som kryssing", () => {
  const { ctx, lines } = fakeCtx();
  const lay = new LabelLayout(ctx, frame);
  // Ledelinja går fra (158, 141) til (100, 200). Punktet (129, 172) ligger på den; flytt 2 px til siden.
  lay.avoidLine(131, 172, 140, 160);
  lay.place("bruddflate", spots);
  assert.equal(lines.length, 0);
});

test("en pil langt unna endrer ikke valget", () => {
  const { ctx, lines } = fakeCtx();
  const lay = new LabelLayout(ctx, frame);
  lay.avoidLine(300, 20, 320, 40);
  lay.place("bruddflate", spots);
  assert.equal(lines.length, 1);
});
