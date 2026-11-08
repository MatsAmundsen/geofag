import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { MERKE_FONT, MERKE_R, NOKKEL, STEG, TV5_BILDETEKST } from "../components/diagrams/termisk-vind-v5/data.ts";

const lib = dirname(fileURLToPath(import.meta.url));
const les = (...p: string[]) => readFileSync(join(lib, ...p), "utf8");

describe("Termisk vind v5 på /tema/jetstrommer", () => {
  it("ThermalWind står rett etter JetProfile i kapittelet", () => {
    const md = les("posts", "jetstrommer.md");
    assert.match(md, /```widget\nJetProfile\n```\n\n```widget\nThermalWind\n```/);
    assert.equal(md.match(/```widget\nThermalWind\n```/g)?.length, 1);
  });
  it("ThermalWind rendres av den native v5-komponenten", () => {
    const r = les("..", "components", "poster-widget-renderer.tsx");
    assert.match(r, /ThermalWind: \(\) => <TermiskVindV5 \/>/);
    assert.match(r, /import \{ TermiskVindV5 \} from "@\/components\/diagrams\/termisk-vind-v5";/);
  });
  it("har fem steg med godkjent fagtekst", () => {
    assert.equal(STEG.length, 5);
    assert.ok(STEG[0].x.includes("og trykket ved bakken er likt"));
    assert.ok(STEG[1].x.startsWith("Ved samme trykk har varm luft lavere tetthet"));
    assert.ok(STEG[1].x.includes("og i troposfæren mer jo høyere vi kommer"));
    assert.ok(STEG[3].x.includes("på tvers av den vannrette trykkforskjellen") && STEG[3].x.includes("friksjonslaget"));
    assert.ok(STEG[4].x.includes("Her er vestavinden sterkere på det øvre trykknivået enn på det nedre. Den termiske vindvektoren peker derfor mot øst."));
    assert.ok(STEG[4].x.includes("I denne modellen ligger vindmaksimum nær tropopausen. Over maksimumet snur den vannrette temperaturgradienten, slik at vestavinden avtar med høyden."));
    assert.ok(TV5_BILDETEKST.includes("vinden på det øvre nivået minus vinden på det nedre (AMS, u.å.-a)"));
  });
  it("sier ikke at termisk vind er selve vinden eller økningen", () => {
    const alt = [...STEG.flatMap((s) => [s.n, s.t, s.x]), TV5_BILDETEKST, ...NOKKEL.flat().map((r) => r[2])].join(" | ");
    assert.doesNotMatch(alt, /Her er den en vestavind|kalles termisk vind|Vestavind som øker med høyden, er bare ett eksempel|under tropopausen/);
    assert.doesNotMatch(alt, /!|&/);
  });

  it("mobil: beregnet SVG-font og klaring ved 300/320/360 px vindu", () => {
    // Målt av DS2 (r5): SVG-bredde = vindu − 88 px i appens ramme (320 → 232, 360 → 272).
    const svg = (v: number) => v - 88;
    const motor = les("..", "components", "diagrams", "termisk-vind-v5", "motor.ts");
    const xC = Number(motor.match(/settBadge\(2,s\.h,XC\+(\d+),/)?.[1]);
    const xD = Number(motor.match(/settBadge\(3,s\.c,XC-(\d+),/)?.[1]);
    for (const v of [300, 320, 360]) {
      const k = svg(v) / 960;
      assert.ok(MERKE_FONT * k >= 12, `merkefont ${(MERKE_FONT * k).toFixed(2)} px ved ${v}`);
      // pilspiss: trykkraft ender i XC+130 med tupp 6 forbi; corioliskraft speilet. Krav ≥ 8 px fri luft.
      assert.ok((xC - MERKE_R - 136) * k >= 8, `C–pilspiss ${((xC - MERKE_R - 136) * k).toFixed(2)} px ved ${v}`);
      assert.ok((xD - MERKE_R - 136) * k >= 8, `D–pilspiss ${((xD - MERKE_R - 136) * k).toFixed(2)} px ved ${v}`);
    }
    const idx = les("..", "components", "diagrams", "termisk-vind-v5", "index.tsx");
    const css = les("..", "components", "diagrams", "termisk-vind-v5", "termisk-vind-v5.css");
    // Sør/Nord på mobil er HTML (15 px) under tegneflaten, ikke skalert SVG-tekst nær bakkefeltet
    assert.doesNotMatch(idx, /className="mob"[^>]*>\s*<text/);
    assert.match(idx, /className="mob-akse"/);
    assert.match(css, /\.tv5 \.mob-akse\{display:flex;[^}]*font-size:15px/);
    // desktop urørt: desktop Sør/Nord og 18 enheter etiketter
    assert.match(idx, /<text x="66" y="518">Sør \(mot ekvator\)<\/text>/);
    assert.match(idx, /data-tv="etiketter" className="desk" fontSize="18"/);
  });
});
