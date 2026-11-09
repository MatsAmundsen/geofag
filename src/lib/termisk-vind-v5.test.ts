import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { BAND_H, MERKE_FONT, MERKER, NOKKEL, STEG, TV5_BILDETEKST } from "../components/diagrams/termisk-vind-v5/data.ts";

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

  it("mobil: ingen SVG-tekst som kan treffe trykkbaner eller høydelinjen (300/320/360)", () => {
    const idx = les("..", "components", "diagrams", "termisk-vind-v5", "index.tsx");
    const motor = les("..", "components", "diagrams", "termisk-vind-v5", "motor.ts");
    const css = les("..", "components", "diagrams", "termisk-vind-v5", "termisk-vind-v5.css");
    // all SVG-tekst ligger i desktopgrupper (skjult under 780 px container); motoren lager bare tekst i «etiketter» (desk)
    const svg = idx.slice(idx.indexOf("<svg"), idx.indexOf("</svg>"));
    const grupper = [...svg.matchAll(/<g [^>]*>\s*<text/g)].map((m) => m[0]);
    assert.ok(grupper.length > 0 && grupper.every((g) => /className="desk"/.test(g)), "statisk SVG-tekst bare i .desk");
    // r7: A–E i egne bånd utenfor tegneflaten; faktisk avstand regnet fra MERKER-geometrien
    assert.match(idx, /data-tv="bandTopp"/); assert.match(idx, /data-tv="bandBunn"/); assert.match(motor, /settMerker\(s\)/);
    for (const v of [300, 320, 360]) {
      const k = (v - 88) / 960;
      assert.ok(MERKE_FONT * k >= 11, `font ${v}`);
      const bokser = MERKER.map((m) => { const off = m.band === "topp" ? -BAND_H : 560, y = BAND_H / 2 + MERKE_FONT * 0.35 + off, w = MERKE_FONT * 0.62;
        return { m, x0: m.bx - w / 2, x1: m.bx + w / 2, y0: y - MERKE_FONT * 0.95, y1: y + MERKE_FONT * 0.3 }; });
      for (const b of bokser) {
        // alle trykkbaner, høydelinje, piler og bakke ligger i tegneflaten y 0–560 (bakke 470)
        const tilFlate = b.m.band === "topp" ? 0 - b.y1 : b.y0 - 560;
        assert.ok(tilFlate * k >= 8, `${b.m.b} ${v}: ${(tilFlate * k).toFixed(1)} px til tegneflaten`);
        for (const o of bokser) if (o !== b) {
          const by = o.m.band === "topp" ? BAND_H / 2 - BAND_H : 560 + BAND_H / 2, [tx, ty] = o.m.mal;
          let min = 1e9; for (let i = 0; i <= 400; i++) { const t = i / 400, x = o.m.bx + (tx - o.m.bx) * t, y = by + (ty - by) * t;
            min = Math.min(min, Math.hypot(Math.max(b.x0 - x, 0, x - b.x1), Math.max(b.y0 - y, 0, y - b.y1))); }
          assert.ok((min - 1) * k >= 8, `${b.m.b} mot leder ${o.m.b} ${v}: ${((min - 1) * k).toFixed(1)} px`);
        }
      }
    }
    assert.match(idx, /data-tv="etiketter" className="desk" fontSize="18"/);
    assert.match(css, /@container tv5 \(max-width:779px\)\{[\s\S]*?\.tv5 \.desk\{display:none\}/);
    // Sør/Nord på mobil er HTML (15 px) under tegneflaten
    assert.match(idx, /className="mob-akse"/);
    assert.match(css, /\.tv5 \.mob-akse\{display:flex;[^}]*font-size:15px/);
    // desktop urørt
    assert.match(idx, /<text x="66" y="518">Sør \(mot ekvator\)<\/text>/);
  });
});
