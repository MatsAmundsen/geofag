import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { needsCmsSetup, nonEmptyMeta } from "./cms-password.ts";

describe("nonEmptyMeta", () => {
  it("treats empty and whitespace as missing", () => {
    assert.equal(nonEmptyMeta(null), null);
    assert.equal(nonEmptyMeta(""), null);
    assert.equal(nonEmptyMeta("   "), null);
    assert.equal(nonEmptyMeta("abc"), "abc");
  });
});

describe("needsCmsSetup", () => {
  it("is false when CMS_PASSWORD is configured", () => {
    assert.equal(needsCmsSetup("secret", null, null), false);
  });

  it("is false only when both salt and hash exist", () => {
    assert.equal(needsCmsSetup(undefined, "salt", "hash"), false);
  });

  it("is true when salt or hash is missing (the contradictory-message case)", () => {
    assert.equal(needsCmsSetup(undefined, null, null), true);
    assert.equal(needsCmsSetup(undefined, "", ""), true);
    assert.equal(needsCmsSetup(undefined, "salt", null), true);
    assert.equal(needsCmsSetup(undefined, null, "hash"), true);
    assert.equal(needsCmsSetup(undefined, "salt", ""), true);
  });
});
