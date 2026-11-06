import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";

const here = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(join(here, p), "utf8");

const CHAPTERS = [
  { path: "verktoy", slug: "geo-verktoy" },
  { path: "feltarbeid", slug: "geo-feltarbeid" },
  { path: "indre-krefter", slug: "geo-indre-krefter" },
  { path: "landskap", slug: "geo-landskap" },
  { path: "klima", slug: "geo-klima" },
  { path: "naturfare", slug: "geo-naturfare" },
  { path: "ressurser", slug: "geo-ressurser" },
  { path: "baerekraft", slug: "geo-baerekraft" },
  { path: "naering", slug: "geo-naering" },
  { path: "befolkning", slug: "geo-befolkning" },
  { path: "migrasjon", slug: "geo-migrasjon" },
] as const;

describe("Geografi skjelett (PR A)", () => {
  it("har elleve kapitler i GEOGRAFI_KAPITLER og GEO_THEMES", () => {
    const kapitler = read("geografi-kapitler.ts");
    const nav = read("nav.ts");
    assert.match(kapitler, /export const GEOGRAFI_KAPITLER/);
    assert.match(nav, /export const GEO_THEMES/);
    assert.match(nav, /export const NAV_GEO/);
    assert.match(nav, /to: "\/geografi"/);
    for (const c of CHAPTERS) {
      assert.match(kapitler, new RegExp(`path: "${c.path}"`));
      assert.match(kapitler, new RegExp(`slug: "${c.slug}"`));
      assert.match(nav, new RegExp(`to: "/geografi/${c.path}"`));
      assert.match(nav, new RegExp(`slug: "${c.slug}"`));
    }
  });

  it("er registrert i hub, sitemap, ingress, kilder og ruter", () => {
    const nav = read("nav.ts");
    const sitemap = read("../../public/sitemap.xml");
    const ingress = read("chapter-ingress.ts");
    const kilder = read("kilder-geografi.ts");
    const chapterPosts = read("chapter-posts.ts");
    const indexRoute = read("../routes/geografi/index.tsx");
    const kapittelRoute = read("../routes/geografi/$kapittel.tsx");
    const hub = read("../routes/index.tsx");
    const seo = read("seo.ts");

    assert.match(nav, /\{ to: "\/geografi", label: "Geografi" \}/);
    assert.match(hub, /to="\/geografi"/);
    assert.match(sitemap, /https:\/\/geofag\.com\/geografi</);
    assert.match(indexRoute, /createFileRoute\("\/geografi\/"\)/);
    assert.match(kapittelRoute, /createFileRoute\("\/geografi\/\$kapittel"\)/);
    assert.match(chapterPosts, /GEO_THEMES/);
    assert.match(seo, /path\.startsWith\("\/geografi\/"\)/);

    for (const c of CHAPTERS) {
      assert.match(sitemap, new RegExp(`/geografi/${c.path}<`));
      assert.match(ingress, new RegExp(`"${c.slug}":`));
      assert.match(kilder, new RegExp(`"${c.slug}":`));
    }
  });

  for (const c of CHAPTERS) {
    it(`${c.slug}: md uten utropstegn eller vinkelparenteser`, () => {
      const md = read(`posts/${c.slug}.md`);
      assert.ok(md.length > 80, "md mangler");
      assert.equal(md.includes("!"), false);
      assert.equal(md.includes("<"), false);
      assert.match(md, /Kompetansemål i Geografi/);
      if (c.slug !== "geo-verktoy") assert.match(md, /under arbeid/i);
    });
  }

  it("md-filer geo-* er nøyaktig de elleve kapitlene", () => {
    const files = readdirSync(join(here, "posts"))
      .filter((f) => f.startsWith("geo-") && f.endsWith(".md"))
      .sort();
    assert.deepEqual(
      files,
      CHAPTERS.map((c) => `${c.slug}.md`)
        .slice()
        .sort(),
    );
  });
});

describe("Geografi kapittel 1: fagtekst (PR B)", () => {
  const md = read("posts/geo-verktoy.md");

  it("dekker alle åtte underkapitler og kapittelmalens avslutning", () => {
    for (const title of [
      "Hva er geografi",
      "Geografiske begreper",
      "Kart og projeksjoner",
      "Koordinater og målestokk",
      "Lese topografisk kart",
      "Temakart og mentale kart",
      "Fjernmåling og GIS",
      "Kildekritikk",
      "Læringsmål",
      "Oppsummering",
      "Begreper",
      "Spørsmål",
      "Hva tror du?",
      "Oppgaver",
      "Quiz",
    ])
      assert.ok(md.includes(`## ${title}\n`), title);
    assert.match(md, /KM487/);
    assert.match(md, /KM486/);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler/);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## To kart"));
    assert.ok(md.indexOf("## To kart") < md.indexOf("## Læringsmål"));
  });

  it("bevarer resterende figurplasser uten synlige redaktørnotater", () => {
    const placeholders = [...md.matchAll(/^\[figur-1-(\d+)\]: # \(FIGURPLASSHOLDER/gm)];
    assert.deepEqual(
      placeholders.map((m) => Number(m[1])).sort((a, b) => a - b),
      [0, 1, 3, 5, 6, 7, 8, 9, 10],
    );
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap1-redaksjon|figur-1-/);
    assert.match(html, /John Snows kolerakart/);
    // Teksten må kunne leses også før de planlagte figurene er levert.
    assert.doesNotMatch(md, /[Ss]e figur 1\.|[Ss]om figur 1\./);
  });

  it("har kilder, hypotetiske eksempler og korrekt avgrenset Snow-case", () => {
    const sources = read("kilder-geografi.ts").split('"geo-feltarbeid"')[0];
    assert.equal((sources.match(/href: /g) ?? []).length, 19);
    for (const domain of [
      "udir.no",
      "kartverket.no",
      "snl.no",
      "nibio.no",
      "usgs.gov",
      "spektrum.de",
      "esri.com",
      "nationalgeographic.org",
    ])
      assert.ok(sources.includes(domain), domain);
    assert.doesNotMatch(sources, /Terra Nova|bibliotek|Aunivers/);
    assert.match(md, /konstruert regneeksempel/);
    assert.match(md, /ikke første gang/);
    assert.match(md, /30 meters romlig oppløsning/);
    assert.match(md, /1 500 meter, eller 1,5 kilometer/);
  });

  it("registrerer reseed og erstatter skjelettvisningen bare for kapitler med fagtekst", () => {
    const reseeds = read("copy-reseeds-b.ts");
    assert.match(reseeds, /flag: "geo-verktoy-kap1-2026-11-06"/);
    assert.match(reseeds, /slug: "geo-verktoy"/);
    assert.match(reseeds, /## Planlagte underkapitler/);
    assert.match(read("post-store.server.ts"), /COPY_RESEEDS.push\(\.\.\.COPY_RESEEDS_B\)/);
    const kapitler = read("geografi-kapitler.ts");
    assert.match(kapitler, /path: "verktoy",\s+tekstKlar: true/);
    assert.equal((kapitler.match(/tekstKlar: true/g) ?? []).length, 1);
    assert.match(read("../components/geografi/kapittel-side.tsx"), /!kapittel.tekstKlar/);
    const header = read("../components/site-header.tsx");
    assert.match(header, /to: "\/geografi\/\$kapittel" as const/);
    assert.match(header, /params: \{ kapittel: item.to.slice/);
  });
});
