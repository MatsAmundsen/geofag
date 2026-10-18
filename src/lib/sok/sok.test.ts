import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { byggSokIndeks, kapittelTekst, sokIndeksVersjon } from "./indeks.ts";
import { delISetninger, inlineTilTekst, markdownTilBlokker } from "./markdown-tekst.ts";
import { finnTreff, lagSporring, MIN_INNI_ORD_LENGDE, normaliser, stamme } from "./normaliser.ts";

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

test("søket treffer hele ord, ordstart, bøyde former og inne i sammensatte ord", () => {
  const q = lagSporring("Magma")!;
  const tekst = normaliser("Magmaen stiger. Magmatisk bergart. Også primagma. Magma.");
  assert.deepEqual(
    finnTreff(tekst, q).map(([a, b, k]) => [tekst.slice(a, b), k]),
    [
      ["magmaen", 1],
      ["magmatisk", 1],
      ["primagma", 2],
      ["magma", 0],
    ],
  );
  const q2 = lagSporring("isbreer")!;
  const t2 = normaliser("Isbreen og isbreene, og dalisbre.");
  assert.deepEqual(
    finnTreff(t2, q2).map(([a, b]) => t2.slice(a, b)),
    ["isbreen", "isbreene", "dalisbre"],
  );
});

test("«bre» (3+ bokstaver) finner «dalbre» og «isbreer», og ett ord gir bare ett treff", () => {
  const q = lagSporring("bre")!;
  const t = normaliser("En dalbre og flere isbreer. Bre! Breelva. Brebre.");
  assert.deepEqual(
    finnTreff(t, q).map(([a, b, k]) => [t.slice(a, b), k]),
    [
      ["dalbre", 2],
      ["isbreer", 2],
      ["bre", 0],
      ["breelva", 1],
      ["brebre", 1],
    ],
  );
  // æøå teller som bokstaver: «fjø» inne i «strandfjøra» er ett treff i hele ordet.
  const q2 = lagSporring("FJØ")!;
  const t2 = normaliser("Strandfjøra og Fjøra.");
  assert.deepEqual(
    finnTreff(t2, q2).map(([a, b, k]) => [t2.slice(a, b), k]),
    [
      ["strandfjøra", 2],
      ["fjøra", 1],
    ],
  );
});

test("CO2 finner CO₂ og km2 finner km² (senket/hevet skrift), lengden er lik", () => {
  const t = normaliser("Utslipp av CO₂ per km².");
  assert.equal(t.length, "Utslipp av CO₂ per km².".length);
  assert.deepEqual(
    finnTreff(t, lagSporring("CO2")!).map(([a, b]) => t.slice(a, b)),
    ["co2"],
  );
  assert.deepEqual(
    finnTreff(t, lagSporring("co₂")!).map(([a, b]) => t.slice(a, b)),
    ["co2"],
  );
  assert.deepEqual(
    finnTreff(t, lagSporring("km2")!).map(([a, b]) => t.slice(a, b)),
    ["km2"],
  );
});

test("MIN_INNI_ORD_LENGDE = 3: ord på 2 bokstaver treffer bare helt ord og ordstart", () => {
  assert.equal(MIN_INNI_ORD_LENGDE, 3);
  const t = normaliser("Gradvis is og isbre i et mineral.");
  assert.deepEqual(
    finnTreff(t, lagSporring("is")!).map(([a, b]) => t.slice(a, b)),
    ["is", "isbre"],
  );
  // «bre» (3 bokstaver) finner fortsatt «dalbre» og «isbreen».
  const t2 = normaliser("En dalbre, isbreen og breen.");
  assert.deepEqual(
    finnTreff(t2, lagSporring("bre")!).map(([a, b]) => t2.slice(a, b)),
    ["dalbre", "isbreen", "breen"],
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
