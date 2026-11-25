import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  MARKOR_FONT,
  MARKOR_R,
  MIN_BREDDE_PX,
  VIEWBOX_BREDDE,
  korridorGeometri,
  type Korridor,
} from "./geografi-korridorer.ts";

const data = JSON.parse(
  readFileSync(new URL("./geografi-migrantkorridorer-2024.json", import.meta.url), "utf8"),
) as { korridorer: Korridor[] };

describe("figur 11.6: markører", () => {
  const g = data.korridorer.map((k) => ({ nr: k.nr, ...korridorGeometri(k, data.korridorer) }));
  it("ingen markører overlapper (minst 2 enheter luft)", () => {
    for (const a of g)
      for (const b of g) {
        if (a.nr >= b.nr) continue;
        const d = Math.hypot(a.cx - b.cx, a.cy - b.cy);
        assert.ok(d >= 2 * MARKOR_R + 2, `markør ${a.nr} og ${b.nr}: ${d.toFixed(1)}`);
      }
  });
  it("ingen markør ligger oppå en annen pil, og flyttede markører ikke på sin egen", () => {
    const punkter = (d: string) => {
      const m = d.match(/M([\d.]+) ([\d.]+) Q([\d.-]+) ([\d.-]+) ([\d.]+) ([\d.]+)/)!.slice(1).map(Number);
      const ut: [number, number][] = [];
      for (let t = 0; t <= 1.0001; t += 0.005)
        ut.push([
          (1 - t) ** 2 * m[0]! + 2 * (1 - t) * t * m[2]! + t * t * m[4]!,
          (1 - t) ** 2 * m[1]! + 2 * (1 - t) * t * m[3]! + t * t * m[5]!,
        ]);
      return ut;
    };
    for (const a of g)
      for (const b of g) {
        // Flyttede markører (med ledestrek) skal heller ikke ligge på sin egen pil.
        if (a.nr === b.nr && a.lx === undefined) continue;
        const min = Math.min(...punkter(b.d).map(([x, y]) => Math.hypot(x - a.cx, y - a.cy)));
        assert.ok(min >= MARKOR_R + 1.5, `markør ${a.nr} på pil ${b.nr}: ${min.toFixed(1)}`);
      }
  });
  it("tur og retur (4 og 8) har ulike kurver", () => {
    const a = g.find((x) => x.nr === 4)!;
    const b = g.find((x) => x.nr === 8)!;
    assert.notEqual(a.d.split("Q")[1].split(" ").slice(0, 2).join(), b.d.split("Q")[1].split(" ").slice(0, 2).join());
  });
  it("tallene er minst 12 CSS-px ved 390 (rulleramme min. 560 px)", () => {
    assert.ok((MARKOR_FONT * MIN_BREDDE_PX) / VIEWBOX_BREDDE >= 12);
  });
  it("komponenten bruker konstantene", () => {
    const s = readFileSync(new URL("../components/geografi/migrasjon-skjulte.tsx", import.meta.url), "utf8");
    assert.ok(s.includes("korridorGeometri(k, korr.korridorer)"));
    assert.ok(s.includes('viewBox="150 20 600 280"') && s.includes("min-w-[560px]"));
    assert.ok(s.includes("fontSize={MARKOR_FONT}"));
  });
});
