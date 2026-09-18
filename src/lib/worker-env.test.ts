import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pickWorkerEnv, preventPosterCaching } from "./worker-env.ts";

describe("pickWorkerEnv", () => {
  it("prefers the candidate that has POSTS_DO over a stub env", () => {
    const stub = { ASSETS: {} };
    const real = { POSTS_DO: { get: () => null }, ASSETS: {} };
    assert.equal(pickWorkerEnv([stub, real]), real);
    assert.equal(pickWorkerEnv([real, stub]), real);
  });

  it("falls back to global env when the request env has no CMS bindings", () => {
    const globalEnv = { POSTS_DO: { idFromName: () => "x" } };
    assert.equal(pickWorkerEnv([{}, globalEnv]), globalEnv);
  });

  it("returns null when nothing is present", () => {
    assert.equal(pickWorkerEnv([null, undefined]), null);
  });
});

describe("preventPosterCaching", () => {
  it("sets Cloudflare and browser no-store headers", () => {
    const headers: Record<string, string> = {};
    preventPosterCaching((name, value) => {
      headers[name] = value;
    });
    assert.equal(headers["cache-control"], "private, no-store, no-cache, must-revalidate");
    assert.equal(headers["cdn-cache-control"], "no-store");
    assert.equal(headers["cloudflare-cdn-cache-control"], "no-store");
  });
});
