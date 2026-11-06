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
      if (!["geo-verktoy", "geo-feltarbeid"].includes(c.slug)) assert.match(md, /under arbeid/i);
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
    assert.equal((kapitler.match(/tekstKlar: true/g) ?? []).length, 2);
    assert.match(read("../components/geografi/kapittel-side.tsx"), /!kapittel.tekstKlar/);
    const header = read("../components/site-header.tsx");
    assert.match(header, /to: "\/geografi\/\$kapittel" as const/);
    assert.match(header, /params: \{ kapittel: item.to.slice/);
  });
});


describe("Geografi kapittel 2: feltarbeid (PR C)", () => {
  const md = read("posts/geo-feltarbeid.md");
  const sources = read("kilder-geografi.ts")
    .split('"geo-feltarbeid": [')[1]
    .split('"geo-indre-krefter"')[0];

  it("dekker seks underkapitler, mål og oppgaver på tre nivåer", () => {
    for (const title of [
      "Hva er feltarbeid",
      "Problemstilling og plan",
      "Metoder i felt",
      "Sikkerhet og etikk",
      "Bearbeide data",
      "Presentere feltarbeid",
      "Læringsmål",
      "Oppsummering",
      "Begreper",
      "Spørsmål",
      "Hva tror du?",
      "Oppgaver",
      "Quiz",
    ]) assert.ok(md.includes(`## ${title}\n`), title);
    assert.match(md, /Hovedmål, KM486/);
    assert.match(md, /KM487/);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## Er skolegården"));
    assert.ok(md.indexOf("## Er skolegården") < md.indexOf("## Læringsmål"));
    assert.match(md, /I dette kapitlet skal vi/);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler|Tekst, figurer og oppgaver kommer/i);
  });

  it("bevarer ti skjulte figurplasser uten avhengighet av manglende figurer", () => {
    const placeholders = [...md.matchAll(/^\[figur-2-(\d+)\]: # \(FIGURPLASSHOLDER/gm)];
    assert.deepEqual(
      placeholders.map((m) => Number(m[1])).sort((a, b) => a - b),
      [0, 1, 2, 3, 5, 6, 7, 8, 9],
    );
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap2-redaksjon|figur-2-/);
    assert.match(html, /Mikroklima som skoleundersøkelse/);
    assert.doesNotMatch(md, /[Ss]e figur 2\.|[Ss]om figur 2\./);
    assert.doesNotMatch(md, /\[\[FieldworkObservationModel\]\]/);
  });

  it("har 17 kildeoppføringer og bruker henvisninger til alle kildegruppene", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 17);
    for (const domain of ["udir.no", "snl.no", "kartverket.no", "nibio.no", "rgs.org", "datatilsynet.no", "forskningsetikk.no", "yr.no"])
      assert.ok(sources.includes(domain), domain);
    assert.doesNotMatch(sources, /Terra Nova|bibliotek|Aunivers/);
    for (const citation of ["Udir, u.å.", "Johannessen & Grønmo, 2026", "Grønmo, 2024", "Grønmo, 2025", "Grønmo et al., u.å.", "Svartdal, 2025", "Tranøy, 2025", "Kartverket, 2023", "Kartverket, 2026", "NIBIO, u.å.", "Pedersen, 2012", "FEK, 2019", "Datatilsynet, 2020", "RGS, u.å.-a", "RGS, u.å.-b", "RGS, u.å.-c", "RGS, u.å.-d"])
      assert.ok(md.includes(citation), citation);
  });

  it("merker øvingstall tydelig og skiller gyldighet fra pålitelighet", () => {
    assert.match(md, /tallene er konstruert til regneøving/);
    assert.match(md, /kommer ikke fra en skole/);
    assert.match(md, /30,6 delt på tre/);
    assert.match(md, /33,6 delt på tre/);
    assert.match(md, /0,4 grader ved begge punkter/);
    assert.match(md, /\*\*Reliabilitet\*\*/);
    assert.match(md, /\*\*Validitet\*\*/);
    assert.match(md, /ikke automatisk at vi har undersøkt/);
    assert.match(md, /Stanser den delen av arbeidet, kontakter ansvarlig lærer/);
    assert.match(md, /ikke offisielle nasjonale karakterkriterier/);
  });

  it("tilbyr tomme, semikolondelte arbeidsmaler uten person- eller posisjonsdata", () => {
    const prefix = "geografi-feltarbeid-";
    for (const filename of [`${prefix}plan.csv`, `${prefix}feltlogg.csv`]) {
      assert.ok(md.includes(`/downloads/${filename}`), filename);
      const csv = read(`../../public/downloads/${filename}`).replace(/^\uFEFF/, "");
      assert.doesNotMatch(csv, /[<>]/);
      const rows = csv.trim().split(/\r?\n/);
      if (filename.endsWith("plan.csv")) {
        assert.equal(rows[0], "Del av planen;Vår plan");
        assert.ok(rows.length > 10);
        for (const row of rows.slice(1)) assert.equal(row.split(";")[1], "");
      } else {
        assert.equal(rows.length, 1, "feltloggen skal bare ha overskrifter");
        assert.ok(rows[0].includes("Tidssone"));
        assert.ok(rows[0].includes("Koordinatsystem"));
        assert.ok(rows[0].includes("UTM-sone hvis relevant"));
        assert.ok(rows[0].includes("Usikkerhet"));
      }
    }
  });

  it("registrerer kapittel 2-reseed og bruker fagtekstvisning", () => {
    const reseeds = read("copy-reseeds-b.ts");
    assert.match(reseeds, /flag: "geo-feltarbeid-kap2-2026-11-06",\s+slug: "geo-feltarbeid"/);
    assert.match(read("geografi-kapitler.ts"), /path: "feltarbeid",\s+tekstKlar: true/);
    assert.match(read("post-store.server.ts"), /COPY_RESEEDS.push\(\.\.\.COPY_RESEEDS_B\)/);
    assert.match(read("../components/geografi/kapittel-side.tsx"), /Kildeliste kilder=\{kilder\}/);
  });
});
