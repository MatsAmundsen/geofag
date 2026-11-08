import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { NOKKEL, STEG, TV5_BILDETEKST } from "../components/diagrams/termisk-vind-v5/data.ts";

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
    assert.doesNotMatch(svg, /data-tv="merker"/);
    assert.doesNotMatch(motor, /settBadge|MERK|"merker"/);
    assert.match(idx, /data-tv="etiketter" className="desk" fontSize="18"/);
    assert.match(css, /@container tv5 \(max-width:779px\)\{[\s\S]*?\.tv5 \.desk\{display:none\}/);
    // Sør/Nord på mobil er HTML (15 px) under tegneflaten
    assert.match(idx, /className="mob-akse"/);
    assert.match(css, /\.tv5 \.mob-akse\{display:flex;[^}]*font-size:15px/);
    // desktop urørt
    assert.match(idx, /<text x="66" y="518">Sør \(mot ekvator\)<\/text>/);
  });
});
