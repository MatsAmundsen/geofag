import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Hver «figur N.M» i geografikapitlene skal peke på en figur som faktisk finnes,
// og figurnumrene i hvert kapittel skal være sammenhengende fra N.0 eller N.1.
const ROOT = new URL("../", import.meta.url).pathname;
const KAPITLER: Record<number, string> = {
  1: "geo-verktoy", 2: "geo-feltarbeid", 3: "geo-indre-krefter", 4: "geo-landskap", 5: "geo-klima", 6: "geo-naturfare",
  7: "geo-ressurser", 8: "geo-baerekraft", 9: "geo-naering", 10: "geo-befolkning", 11: "geo-migrasjon",
};
const NUM = String.raw`\d{1,2}\.\d{1,2}[a-z]?`;
const DEF = new RegExp(String.raw`Figur (${NUM})(?:\.|:| –|,) ?(?:kartdel|stedsdel|[A-ZÆØÅ0-9«{])`, "g");
const REF = new RegExp(String.raw`[Ff]igur(?:en|ene)? (${NUM}(?:(?:, (?:kartdel|stedsdel),)?(?:, | og | – |–| eller )${NUM})*)`, "g");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : path.endsWith(".tsx") ? [path] : [];
  });
}

/** Figurdefinisjoner som hører til geografi: alt i geografi-mappa, Geo-widgeter og Geografi-varianter av delte figurer. */
function geografiDefinisjoner(): Set<string> {
  const defs = new Set<string>();
  for (const path of files(join(ROOT, "components"))) {
    const geografiMappe = path.includes("/components/geografi/");
    let eier = "";
    for (const line of readFileSync(path, "utf8").split("\n")) {
      // Eieren er nærmeste funksjon, konstant eller widget-registrering over linja.
      const owner = line.match(/^(?:export )?(?:function|const) \w+.*/) ?? line.match(/^\s+\w+: \(\) =>.*/);
      if (owner) eier = owner[0];
      if (!(geografiMappe || /^(?:export )?(?:function|const) Geo|^\s+Geo\w*:|geografi/.test(eier) || /geografi/.test(line))) continue;
      for (const m of line.matchAll(DEF)) defs.add(m[1]);
    }
  }
  return defs;
}

const nokkel = (n: string) => {
  const [, a, b, c] = n.match(/(\d+)\.(\d+)([a-z]?)/)!;
  return [Number(a), Number(b), c] as const;
};

describe("Geografi: figurnumre og figurhenvisninger", () => {
  const defs = geografiDefinisjoner();
  const komponenttekst = files(join(ROOT, "components/geografi")).map((p) => readFileSync(p, "utf8")).join("\n");

  for (const [kap, slug] of Object.entries(KAPITLER)) {
    it(`kapittel ${kap}: hver henvisning finnes som figur, og numrene er uten hull`, () => {
      const md = readFileSync(join(ROOT, `lib/posts/${slug}.md`), "utf8");
      const egne = [...defs].filter((d) => nokkel(d)[0] === Number(kap));
      assert.ok(egne.length > 0, `ingen figurer funnet i kapittel ${kap}`);
      const heltall = [...new Set(egne.map((d) => nokkel(d)[1]))].sort((a, b) => a - b);
      const start = heltall[0];
      assert.ok(start === 0 || start === 1, `kapittel ${kap} starter på ${kap}.${start}`);
      assert.deepEqual(heltall, heltall.map((_, i) => start + i), `hull i kapittel ${kap}: ${heltall.join(", ")}`);
      for (const tekst of [md, komponenttekst]) {
        for (const m of tekst.matchAll(REF)) {
          for (const n of m[1].match(new RegExp(NUM, "g")) ?? []) {
            if (nokkel(n)[0] !== Number(kap) && tekst === komponenttekst) continue;
            assert.ok(defs.has(n), `«figur ${n}» i ${tekst === md ? slug : "geografikomponentene"} peker ikke på noen figur`);
          }
        }
      }
    });
  }
});
