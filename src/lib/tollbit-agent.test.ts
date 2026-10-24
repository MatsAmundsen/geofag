import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchFromAgentSite, isTollbitBot, tollbitAgentUrl } from "./tollbit-agent.ts";

test("kjenner AI-agenter, ikke søkemotorer/nettlesere", () => {
  assert.ok(isTollbitBot("Mozilla/5.0; compatible; ChatGPT-User/1.0"));
  assert.ok(isTollbitBot("gptbot/1.1"));
  assert.ok(isTollbitBot("PerplexityBot/1.0"));
  assert.equal(isTollbitBot("Mozilla/5.0 (compatible; Googlebot/2.1)"), false);
  assert.equal(isTollbitBot("Mozilla/5.0 (compatible; bingbot/2.0)"), false);
  assert.equal(isTollbitBot("Mozilla/5.0 (Windows NT 10.0) Chrome/130 Safari/537.36"), false);
  assert.equal(isTollbitBot(null), false);
});

test("bygger tollbit-URL uten www", () => {
  assert.equal(tollbitAgentUrl("https://www.geofag.com/geofag-2?x=1"), "https://tollbit.geofag.com/geofag-2?x=1");
});

test("faller tilbake ved 5xx for GET, ellers no-store", async () => {
  const orig = globalThis.fetch;
  try {
    globalThis.fetch = (async () => new Response("x", { status: 503 })) as typeof fetch;
    assert.equal(await fetchFromAgentSite(new Request("https://geofag.com/")), null);
    globalThis.fetch = (async () => new Response("pay", { status: 402 })) as typeof fetch;
    const r = await fetchFromAgentSite(new Request("https://geofag.com/"));
    assert.equal(r?.status, 402);
    assert.equal(r?.headers.get("cache-control"), "no-store");
  } finally { globalThis.fetch = orig; }
});
