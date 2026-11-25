// Bygger src/lib/geografi-generert.ts fra Geografi-md. Kjør:
//   node --experimental-strip-types scripts/geografi-generer.mts
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GEOGRAFI_KAPITLER } from "../src/lib/geografi-kapitler.ts";
import { byggGeografiData, renderGeografiData } from "../src/lib/geografi-generert-bygg.ts";

const lib = join(dirname(fileURLToPath(import.meta.url)), "../src/lib");
const data = byggGeografiData(GEOGRAFI_KAPITLER, (slug) =>
  readFileSync(join(lib, `posts/${slug}.md`), "utf8"),
);
writeFileSync(join(lib, "geografi-generert.ts"), renderGeografiData(data));
console.log(
  `${data.begreper.length} begreper, ${Object.keys(data.beskrivelser).length} underkapitler`,
);
