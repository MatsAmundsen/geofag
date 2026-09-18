import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { passwordCookieValue, sha256Hex, timingSafeEqual } from "./cms-crypto.ts";

describe("cms-crypto", () => {
  it("hashes deterministically", async () => {
    const a = await sha256Hex("hello");
    const b = await sha256Hex("hello");
    assert.equal(a, b);
    assert.equal(a.length, 64);
  });

  it("compares hashes in constant time", () => {
    assert.equal(timingSafeEqual("aa", "aa"), true);
    assert.equal(timingSafeEqual("aa", "ab"), false);
    assert.equal(timingSafeEqual("aa", "aaa"), false);
  });

  it("derives a cookie value from a password", async () => {
    const cookie = await passwordCookieValue("hemmelig");
    assert.equal(cookie, await passwordCookieValue("hemmelig"));
    assert.notEqual(cookie, await passwordCookieValue("annet"));
  });
});
