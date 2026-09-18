import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { canUseMemorySeedFallback, choosePostBackend } from "./post-backend.ts";

describe("choosePostBackend", () => {
  it("prefers D1 when the Worker has POSTS_DB", () => {
    assert.equal(choosePostBackend(true, true), "d1");
    assert.equal(choosePostBackend(true, false), "d1");
  });

  it("uses a Durable Object on Workers without D1", () => {
    assert.equal(choosePostBackend(false, true, true), "do");
  });

  it("never boots PGLite on a Worker without D1 or DO", () => {
    assert.equal(choosePostBackend(false, true), "memory");
  });

  it("uses Postgres (PGLite locally) off the Worker", () => {
    assert.equal(choosePostBackend(false, false), "postgres");
  });
});

describe("canUseMemorySeedFallback", () => {
  it("is false when a Durable Object is bound so live edits cannot be hidden", () => {
    assert.equal(canUseMemorySeedFallback(false, true), false);
    assert.equal(canUseMemorySeedFallback(true, false), false);
    assert.equal(canUseMemorySeedFallback(false, false), true);
  });
});
