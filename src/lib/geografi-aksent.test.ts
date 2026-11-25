import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GEOGRAFI_AKSENT, aksentFor, aksentStil } from "./geografi-aksent.ts";
import { GEOGRAFI_KAPITLER } from "./geografi-kapitler.ts";

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const kontrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
// Fra styles.css: lyst tema (.kapittel-lys) og mørkt tema.
const LYS = { bakgrunn: "#f2f8f4", kort: "#ffffff", muted: "#e3efe7" };
const MORK = { bakgrunn: "#0b1014", kort: "#141c22", muted: "#1b262e" };

describe("Geografi: aksentfarge per kapittel", () => {
  it("alle 11 kapitler har egen aksent, og ingen to er like", () => {
    assert.equal(GEOGRAFI_KAPITLER.length, 11);
    const lys = new Set<string>();
    const mork = new Set<string>();
    for (const kap of GEOGRAFI_KAPITLER) {
      assert.ok(kap.path in GEOGRAFI_AKSENT, `mangler aksent for ${kap.path}`);
      const a = aksentFor(kap.path);
      lys.add(a.lys);
      mork.add(a.mork);
    }
    assert.equal(lys.size, 11);
    assert.equal(mork.size, 11);
  });

  it("lys tone gir minst 4,5:1 mot bakgrunn, kort og muted i lyst tema", () => {
    for (const [path, a] of Object.entries(GEOGRAFI_AKSENT)) {
      for (const [navn, bg] of Object.entries(LYS)) {
        const k = kontrast(a.lys, bg);
        assert.ok(k >= 4.5, `${path} lys mot ${navn}: ${k.toFixed(2)}`);
      }
    }
  });

  it("mørk tone gir minst 4,5:1 mot bakgrunn, kort og muted i mørkt tema", () => {
    for (const [path, a] of Object.entries(GEOGRAFI_AKSENT)) {
      for (const [navn, bg] of Object.entries(MORK)) {
        const k = kontrast(a.mork, bg);
        assert.ok(k >= 4.5, `${path} mørk mot ${navn}: ${k.toFixed(2)}`);
      }
    }
  });

  it("aksentStil setter begge CSS-variablene", () => {
    const s = aksentStil("klima") as Record<string, string>;
    assert.equal(s["--kap-lys"], GEOGRAFI_AKSENT.klima.lys);
    assert.equal(s["--kap-mork"], GEOGRAFI_AKSENT.klima.mork);
  });
});
