/**
 * Genererer src/lib/geografi-md-historikk.ts: textHash av alle tidligere versjoner av
 * src/lib/posts/geo-*.md i git-historikken til HEAD (inkludert origin/main), delt i
 * skjelettstubber og tidligere md-tekst. Reseed regner en rad som er tegn for tegn lik en av
 * disse som urørt (tekst vi selv har seedet), og oppdaterer den fra dagens md.
 *
 * Seedingen skriver md-fila uendret (import.meta.glob ?raw → bodyMarkdown → DO/D1), så hashen
 * tas av blob-innholdet slik det ligger i git.
 *
 * Kjør: node --experimental-strip-types scripts/geografi-md-hashes.mts
 */
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { textHash } from "../src/lib/geografi-reseed.ts";

const STUBBMERKER = ["## Planlagte underkapitler", "Innholdet er under arbeid"];
const git = (...a: string[]) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 64 << 20 });
const slugs = readdirSync("src/lib/posts")
  .filter((f) => /^geo-.+\.md$/.test(f))
  .map((f) => f.replace(/\.md$/, ""))
  .sort();

const stubber: Record<string, string[]> = {};
const tidligere: Record<string, string[]> = {};
let antall = 0;
for (const slug of slugs) {
  const sti = `src/lib/posts/${slug}.md`;
  const commits = git("rev-list", "--full-history", "HEAD", "--", sti).trim().split("\n").filter(Boolean);
  const blobs = new Set<string>();
  for (const c of commits) {
    try {
      blobs.add(git("rev-parse", `${c}:${sti}`).trim());
    } catch {
      /* fila er slettet i denne commiten */
    }
  }
  const s = new Set<string>();
  const t = new Set<string>();
  for (const blob of blobs) {
    const tekst = git("cat-file", "blob", blob);
    antall++;
    (STUBBMERKER.some((m) => tekst.includes(m)) ? s : t).add(textHash(tekst));
  }
  stubber[slug] = [...s].sort();
  tidligere[slug] = [...t].sort();
}
const linjer = (r: Record<string, string[]>) =>
  Object.entries(r)
    .map(([k, v]) => `  "${k}": [\n${v.map((h) => `    "${h}",`).join("\n")}\n  ],`)
    .join("\n");
writeFileSync(
  "src/lib/geografi-md-historikk.ts",
  `// GENERERT av scripts/geografi-md-hashes.mts – ikke rediger for hånd.
// ${antall} versjoner av src/lib/posts/geo-*.md fra git-historikken til HEAD.

/** Skjelettstubber (ddf9482): versjoner med «## Planlagte underkapitler» / «Innholdet er under arbeid». */
export const GEO_STUB_HASHES: Readonly<Record<string, readonly string[]>> = {
${linjer(stubber)}
};

/**
 * Alle andre tidligere md-versjoner (også den på origin/main 52ae17a). En rad som er tegn for
 * tegn lik en av disse, er tekst vi selv har seedet, ikke en CMS-redigering.
 */
export const GEO_TIDLIGERE_MD_HASHES: Readonly<Record<string, readonly string[]>> = {
${linjer(tidligere)}
};
`,
);
console.log(`skrev src/lib/geografi-md-historikk.ts: ${antall} versjoner, ${slugs.length} kapitler`);
