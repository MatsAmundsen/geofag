import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { byggSokIndeks, kapittelTekst, sokIndeksVersjon } from "./indeks.ts";
import { delISetninger, inlineTilTekst, markdownTilBlokker } from "./markdown-tekst.ts";
import { finnTreff, lagSporring, normaliser, stamme } from "./normaliser.ts";

test("normaliser beholder lengden og æøå, fjerner aksenter", () => {
  const inn = "Isbreen ÆØÅ idé — Þ\u00a0x\nX";
  const ut = normaliser(inn);
  assert.equal(ut.length, inn.length);
  assert.equal(ut, "isbreen æøå ide - þ x x");
});

test("stamme fjerner vanlige endelser, men ikke for korte ord", () => {
  assert.equal(stamme("isbreer"), "isbre");
  assert.equal(stamme("bergartene"), "bergart");
  assert.equal(stamme("vulkaner"), "vulkan");
  assert.equal(stamme("magma"), "magma");
  assert.equal(stamme("breer"), "breer");
});

test("søket treffer ordstart, prefiks og bøyde former, ikke midt i ord", () => {
  const q = lagSporring("Magma")!;
  const tekst = normaliser("Magmaen stiger. Magmatisk bergart. Ikke primagma.");
  assert.deepEqual(
    finnTreff(tekst, q).map(([a, b]) => tekst.slice(a, b)),
    ["magmaen", "magmatisk"],
  );
  const q2 = lagSporring("isbreer")!;
  const t2 = normaliser("Isbreen og isbreene, men ikke dalisbre.");
  assert.deepEqual(
    finnTreff(t2, q2).map(([a, b]) => t2.slice(a, b)),
    ["isbreen", "isbreene"],
  );
});

test("flere ord må stå etter hverandre, og tegnsetting bryter", () => {
  const q = lagSporring("magmatisk bergart")!;
  const t = normaliser("En magmatisk  bergarter. Magmatisk. Bergart.");
  assert.equal(finnTreff(t, q).length, 1);
  assert.equal(lagSporring("a"), null);
  assert.equal(lagSporring("  "), null);
});

test("inline markdown blir ren tekst", () => {
  assert.equal(
    inlineTilTekst(
      "**Magma** er [smeltet stein](https://x.no) i `kappen` &gt; 1000 °C ![bilde](/a.jpg)",
    ),
    "Magma er smeltet stein i kappen > 1000 °C",
  );
  assert.equal(
    inlineTilTekst("magma*tisk* og _kursiv_ men snake_case"),
    "magmatisk og kursiv men snake_case",
  );
});

test("blokker: overskrifter, lister, tabeller og kodeblokker", () => {
  const md = [
    "## Magma",
    "",
    "Første linje",
    "andre linje.",
    "",
    "- punkt én",
    "- punkt to",
    "",
    "| A | B |",
    "|---|---|",
    "| c | d |",
    "",
    "```widget",
    "RockCycle",
    "```",
    "",
    "> Sitat",
  ].join("\n");
  assert.deepEqual(markdownTilBlokker(md), [
    { overskrift: true, tekst: "Magma" },
    { overskrift: false, tekst: "Første linje andre linje." },
    { overskrift: false, tekst: "punkt én" },
    { overskrift: false, tekst: "punkt to" },
    { overskrift: false, tekst: "A" },
    { overskrift: false, tekst: "B" },
    { overskrift: false, tekst: "c" },
    { overskrift: false, tekst: "d" },
    { overskrift: false, tekst: "Sitat" },
  ]);
});

test("setninger deles ved punktum + stor bokstav, ikke ved forkortelser og tall", () => {
  assert.deepEqual(
    delISetninger("Dette er ca. 95 % av skorpa. Neste setning! «Sitat» her f.eks. ikke delt."),
    ["Dette er ca. 95 % av skorpa.", "Neste setning!", "«Sitat» her f.eks. ikke delt."],
  );
});

test("indeksen bruker bare publiserte kapitler og får ny versjon ved endring", () => {
  const post = (slug: string, body: string, published = 1, updatedAt = "1") => ({
    slug,
    title: slug,
    bodyMarkdown: body,
    published,
    updatedAt,
  });
  const posts = [
    post("bergarter", "## Magma\n\nMagma størkner."),
    post("vulkaner", "Lava.", 0),
    post("ukjent", "x"),
  ];
  const idx = byggSokIndeks(posts);
  assert.deepEqual(
    idx.k.map((k) => [k.s, k.p, k.g]),
    [["bergarter", "/geofag-1/bergarter", 1]],
  );
  assert.deepEqual(idx.k[0]!.x, ["Magma", "Magma størkner."]);
  assert.deepEqual(idx.k[0]!.o, [0]);
  const v2 = sokIndeksVersjon([post("bergarter", "## Magma\n\nMagma størkner.", 1, "2")]);
  assert.notEqual(idx.v, v2);
});

test("kapitteltekst fra ekte md-fil: widget-blokker er borte og teksten er der", () => {
  const md = readFileSync(new URL("../posts/bergarter.md", import.meta.url), "utf8");
  const { x } = kapittelTekst(md);
  assert.ok(x.length > 100);
  assert.ok(!x.some((s) => s.includes("```")));
  assert.ok(x.some((s) => /magma/i.test(s)));
});
