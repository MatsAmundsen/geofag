import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isCloudflareWorker } from "./runtime.ts";

type WorkerGlobals = typeof globalThis & {
  WebSocketPair?: unknown;
  EdgeRuntime?: unknown;
};

describe("isCloudflareWorker", () => {
  it("is false in Node (even though Node 22 exposes navigator)", () => {
    assert.equal(typeof navigator, "object");
    assert.equal(isCloudflareWorker(), false);
  });

  it("is true when WebSocketPair exists (Cloudflare Workers)", () => {
    const g = globalThis as WorkerGlobals;
    const prev = g.WebSocketPair;
    g.WebSocketPair = class {};
    try {
      assert.equal(isCloudflareWorker(), true);
    } finally {
      if (prev === undefined) delete g.WebSocketPair;
      else g.WebSocketPair = prev;
    }
    assert.equal(isCloudflareWorker(), false);
  });

  it("is true when EdgeRuntime exists", () => {
    const g = globalThis as WorkerGlobals;
    const prev = g.EdgeRuntime;
    g.EdgeRuntime = "edge";
    try {
      assert.equal(isCloudflareWorker(), true);
    } finally {
      if (prev === undefined) delete g.EdgeRuntime;
      else g.EdgeRuntime = prev;
    }
    assert.equal(isCloudflareWorker(), false);
  });
});
