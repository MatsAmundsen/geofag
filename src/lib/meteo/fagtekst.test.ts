// Kjør: node --experimental-strip-types --test src/lib/meteo/fagtekst.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./fagtekst.ts", import.meta.url), "utf8");
const body = src.replace(/\/\*\*[\s\S]*?\*\//g, "");

test("ingen plassholdere eller [USIKKER] i fagteksten", () => {
  assert.doesNotMatch(body, /\{\{GEOBOT2|TODO-GEOBOT2|USIKKER/);
});

test("ingen forfatternavn (mfl.) i fagteksten", () => {
  assert.doesNotMatch(body, /mfl\.|et al\./);
});
