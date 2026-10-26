import { test } from "node:test";
import assert from "node:assert/strict";
import { isEditorPath, isRoutePlaceholderPath } from "./seo-robots.ts";

test("redigeringssider gjenkjennes", () => {
  assert.equal(isEditorPath("/poster/platetektonikk/rediger"), true);
  assert.equal(isEditorPath("/poster/platetektonikk/rediger/"), true);
  assert.equal(isEditorPath("/poster/platetektonikk"), false);
  assert.equal(isEditorPath("/poster"), false);
});

test("bokstavelige rutemaler gjenkjennes", () => {
  for (const p of ["/eksamen/$slug", "/eksamen/%24slug", "/poster/$slug/rediger", "/poster/%24slug/rediger", "/geofag-1/$slug"]) {
    assert.equal(isRoutePlaceholderPath(p), true, p);
  }
  for (const p of ["/eksamen/v2026", "/poster/platetektonikk", "/", "/tema/klima"]) {
    assert.equal(isRoutePlaceholderPath(p), false, p);
  }
});
