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

test("loggrad har TollBit-feltene (flatt, som offisiell snippet)", () => {
  const line = JSON.parse(buildTollbitLogLine(req(), new Response("hei", { status: 200, statusText: "OK", headers: { "content-length": "3" } })));
  assert.equal(line.ip_address, "1.2.3.4");
  assert.equal(line.geo_country, "NO");
  assert.equal(line.geo_city, "Oslo");
  assert.equal(line.host, "geofag.com");
  assert.equal(line.url, "/geofag-2?x=1");
  assert.equal(line.request_method, "GET");
  assert.equal(line.request_protocol, "HTTP/2");
  assert.equal(line.request_user_agent, "GPTBot");
  assert.equal(line.request_referer, "https://a.no/");
  assert.equal(line.response_status, 200);
  assert.equal(line.response_reason, "OK");
  assert.equal(line.response_body_size, 3);
  assert.equal(line.geo, undefined);
  assert.equal(line.response, undefined);
  assert.deepEqual(Object.keys(line).sort(), ["geo_city","geo_country","geo_latitude","geo_longitude","geo_postal_code","host","ip_address","request_latency","request_method","request_protocol","request_referer","request_user_agent","response_body_size","response_reason","response_state","response_status","timestamp","url"]);
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
