import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CHUNK_RELOAD_KEY,
  RELOAD_WINDOW_MS,
  canReloadAt,
  canReloadForChunkError,
  clearChunkReloadMark,
  isChunkLoadError,
  reloadOnceForChunkError,
  type StorageLike,
} from "./chunk-reload.ts";

function lager(start: Record<string, string> = {}): StorageLike & { data: Record<string, string> } {
  const data = { ...start };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = String(v);
    },
    removeItem: (k) => {
      delete data[k];
    },
  };
}

describe("isChunkLoadError", () => {
  it("kjenner igjen meldingene fra Chromium, Safari, Firefox og Vite", () => {
    for (const msg of [
      "Failed to fetch dynamically imported module: https://geofag.com/assets/bergartssyklus-figur-WUZ6lfCL.js",
      "Importing a module script failed.",
      "error loading dynamically imported module: https://geofag.com/assets/x.js",
      "Unable to preload CSS for /assets/x.css",
      "Loading chunk 123 failed.",
      "Loading CSS chunk abc failed",
    ]) {
      assert.equal(isChunkLoadError(new TypeError(msg)), true, msg);
      assert.equal(isChunkLoadError(msg), true, msg);
    }
  });

  it("kjenner igjen ChunkLoadError på navn, cause og Vite-payload", () => {
    const e = new Error("x");
    e.name = "ChunkLoadError";
    assert.equal(isChunkLoadError(e), true);
    assert.equal(isChunkLoadError(new Error("wrap", { cause: new TypeError("Importing a module script failed.") })), true);
    assert.equal(isChunkLoadError({ payload: new Error("Failed to fetch dynamically imported module: /a.js") }), true);
  });

  it("lar vanlige feil være", () => {
    assert.equal(isChunkLoadError(new Error("Cannot read properties of undefined (reading 'x')")), false);
    assert.equal(isChunkLoadError(new TypeError("Failed to fetch")), false);
    assert.equal(isChunkLoadError(null), false);
    assert.equal(isChunkLoadError(undefined), false);
    assert.equal(isChunkLoadError(42), false);
    assert.equal(isChunkLoadError({}), false);
  });

  it("tåler sirkulær cause", () => {
    const e = new Error("a") as Error & { cause?: unknown };
    e.cause = e;
    assert.equal(isChunkLoadError(e), false);
  });
});

describe("canReloadAt", () => {
  it("tillater når ingenting er lagret eller verdien er ugyldig", () => {
    assert.equal(canReloadAt(null, 1000), true);
    assert.equal(canReloadAt("tull", 1000), true);
  });
  it("stopper innenfor vinduet og tillater etterpå", () => {
    const t = 1_000_000;
    assert.equal(canReloadAt(String(t), t), false);
    assert.equal(canReloadAt(String(t), t + RELOAD_WINDOW_MS), false);
    assert.equal(canReloadAt(String(t), t + RELOAD_WINDOW_MS + 1), true);
  });
  it("regner et tidspunkt i framtiden som gammelt", () => {
    assert.equal(canReloadAt("5000", 1000), true);
  });
});

describe("reloadOnceForChunkError", () => {
  it("laster på nytt første gang og lagrer tidspunktet", () => {
    const storage = lager();
    let ganger = 0;
    const ok = reloadOnceForChunkError({ storage, now: () => 1234, reload: () => ganger++ });
    assert.equal(ok, true);
    assert.equal(ganger, 1);
    assert.equal(storage.data[CHUNK_RELOAD_KEY], "1234");
  });

  it("laster ikke på nytt igjen innenfor vinduet (ingen løkke)", () => {
    const storage = lager();
    let ganger = 0;
    const reload = () => ganger++;
    assert.equal(reloadOnceForChunkError({ storage, now: () => 1000, reload }), true);
    assert.equal(reloadOnceForChunkError({ storage, now: () => 1000 + 3000, reload }), false);
    assert.equal(canReloadForChunkError({ storage, now: () => 1000 + 3000 }), false);
    assert.equal(ganger, 1);
    // etter vinduet er det lov igjen (ny deploy senere)
    assert.equal(reloadOnceForChunkError({ storage, now: () => 1000 + RELOAD_WINDOW_MS + 1, reload }), true);
    assert.equal(ganger, 2);
  });

  it("gjør ingenting uten lagring (server)", () => {
    let ganger = 0;
    assert.equal(reloadOnceForChunkError({ storage: null, reload: () => ganger++ }), false);
    assert.equal(canReloadForChunkError({ storage: null }), false);
    assert.equal(ganger, 0);
  });

  it("rører ikke window på serveren når ingen avhengigheter er gitt", () => {
    assert.equal(typeof (globalThis as { window?: unknown }).window, "undefined");
    assert.equal(reloadOnceForChunkError(), false);
    assert.equal(canReloadForChunkError(), false);
    clearChunkReloadMark();
  });

  it("laster ikke på nytt hvis vernet ikke kan lagres", () => {
    const storage = lager();
    storage.setItem = () => {
      throw new Error("QuotaExceededError");
    };
    let ganger = 0;
    assert.equal(reloadOnceForChunkError({ storage, now: () => 1, reload: () => ganger++ }), false);
    assert.equal(ganger, 0);
  });
});

describe("clearChunkReloadMark", () => {
  it("beholder merket innenfor vinduet og fjerner det etterpå", () => {
    const storage = lager({ [CHUNK_RELOAD_KEY]: "1000" });
    clearChunkReloadMark({ storage, now: () => 1000 + 500 });
    assert.equal(storage.data[CHUNK_RELOAD_KEY], "1000");
    clearChunkReloadMark({ storage, now: () => 1000 + RELOAD_WINDOW_MS + 1 });
    assert.equal(CHUNK_RELOAD_KEY in storage.data, false);
  });
});
