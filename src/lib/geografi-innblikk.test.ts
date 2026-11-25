import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { GEOGRAFI_KAPITLER } from "./geografi-kapitler.ts";
import { splitInnblikk } from "./geografi-innblikk.ts";

const md = (slug: string) => readFileSync(new URL(`./posts/${slug}.md`, import.meta.url), "utf8");

describe("Geografi: Innblikk-bokser", () => {
  it("avgrenser boksen til neste overskrift på samme eller høyere nivå", () => {
    const s = splitInnblikk(
      "## A\n\nTekst.\n\n### Innblikk: Sak\n\nInne.\n\n#### Under\n\nOgså inne.\n\n```widget\nX\n```\n\n### Neste\n\nUte.",
    );
    assert.deepEqual(
      s.map((x) => x.type),
      ["tekst", "innblikk", "tekst"],
    );
    assert.equal(s[1]!.type === "innblikk" && s[1]!.tittel, "Sak");
    assert.match(s[1]!.value, /Også inne\.\n\n```widget\nX\n```$/);
    assert.match(s[2]!.value, /^\n### Neste/);
  });

  it("legger avsluttende «Tenk over» og «Undersøk casen» etter boksen", () => {
    const s = splitInnblikk(
      "### Innblikk: Sak\n\nInne.\n\n> **Undersøk casen:** Spørsmål?\n\n**Tenk over:** Mer?\n\n## Neste",
    );
    assert.equal(s[0]!.value, "### Innblikk: Sak\n\nInne.\n");
    assert.match(
      s[1]!.value,
      /^> \*\*Undersøk casen:\*\* Spørsmål\?\n\n\*\*Tenk over:\*\* Mer\?\n/,
    );
  });

  it("bevarer teksten ordrett og finner alle Innblikk i de elleve kapitlene", () => {
    let antall = 0;
    for (const kap of GEOGRAFI_KAPITLER) {
      const tekst = md(kap.slug);
      const s = splitInnblikk(tekst);
      assert.equal(s.map((x) => x.value).join("\n"), tekst, kap.slug);
      for (const x of s) {
        if (x.type !== "innblikk") continue;
        antall += 1;
        assert.doesNotMatch(x.value, /\*\*(Tenk over|Undersøk casen)/, `${kap.slug}: ${x.tittel}`);
      }
    }
    assert.equal(
      antall,
      (
        GEOGRAFI_KAPITLER.map((k) => md(k.slug))
          .join("\n")
          .match(/^### Innblikk:/gm) ?? []
      ).length,
    );
  });

  it("virker også når mellomtitlene er flyttet opp (undersider)", () => {
    const s = splitInnblikk(
      "Innledning.\n\n## Innblikk: Sak\n\nInne.\n\n### Under\n\nInne.\n\n## Neste",
    );
    assert.deepEqual(
      s.map((x) => x.type),
      ["tekst", "innblikk", "tekst"],
    );
  });
});
