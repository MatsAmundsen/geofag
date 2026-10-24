import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTollbitLogLine, queueTollbitLog, sendTollbitLog } from "./tollbit-log.ts";

const req = () => {
  const r = new Request("https://geofag.com/geofag-2?x=1", {
    headers: { "cf-connecting-ip": "1.2.3.4", "user-agent": "GPTBot", referer: "https://a.no/" },
  });
  Object.defineProperty(r, "cf", { value: { country: "NO", city: "Oslo", httpProtocol: "HTTP/2" } });
  return r;
};

test("loggrad har TollBit-feltene", () => {
  const line = JSON.parse(buildTollbitLogLine(req(), new Response("hei", { status: 200, statusText: "OK", headers: { "content-length": "3" } })));
  assert.equal(line.ip, "1.2.3.4");
  assert.equal(line.geo.country, "NO");
  assert.equal(line.host, "geofag.com");
  assert.equal(line.url, "/geofag-2?x=1");
  assert.equal(line.protocol, "HTTP/2");
  assert.equal(line.userAgent, "GPTBot");
  assert.deepEqual(line.response, { status: 200, statusText: "OK", size: "3" });
});

test("hopper over uten nøkkel", () => {
  let called = false;
  queueTollbitLog(undefined, () => { called = true; }, req(), new Response(""));
  assert.equal(called, false);
});

test("sender riktige headere og backoff etter 429", async () => {
  const calls: RequestInit[] = [];
  const orig = globalThis.fetch;
  globalThis.fetch = (async (_u: string, init: RequestInit) => { calls.push(init); return new Response("", { status: 429 }); }) as typeof fetch;
  try {
    await sendTollbitLog("k", ["{}"]);
    assert.equal((calls[0].headers as Record<string, string>).TollbitKey, "k");
    await sendTollbitLog("k", ["{}"]);
    assert.equal(calls.length, 1);
  } finally { globalThis.fetch = orig; }
});
