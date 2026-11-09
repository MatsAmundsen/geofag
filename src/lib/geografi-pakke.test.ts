import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import { parsePosterMarkdown } from "./poster-markdown.ts";

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
      if (!["geo-verktoy", "geo-feltarbeid", "geo-naturfare", "geo-baerekraft"].includes(c.slug)) assert.match(md, /under arbeid/i);
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
      [],
    );
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap1-redaksjon|figur-1-/);
    assert.match(html, /John Snows kolerakart/);
    // Teksten må kunne leses også før de planlagte figurene er levert.
    assert.doesNotMatch(md, /[Ss]e figur 1\.|[Ss]om figur 1\./);
  });

  it("har kilder, hypotetiske eksempler og korrekt avgrenset Snow-case", () => {
    const sources = read("kilder-geografi.ts").split('"geo-feltarbeid"')[0];
    assert.equal((sources.match(/href: /g) ?? []).length, 22);
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
    assert.equal((kapitler.match(/tekstKlar: true/g) ?? []).length, 4);
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
      [],
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


describe("Geografi kapittel 6: naturfare (PR D)", () => {
  const md = read("posts/geo-naturfare.md");
  const sources = read("kilder-geografi.ts").split('"geo-naturfare": [')[1].split("] as const")[0];

  it("dekker åtte underkapitler og hele kapittelmalen", () => {
    for (const title of ["Risiko og sårbarhet", "Skred i Norge", "Flom og overvann", "Stormer, orkaner og tornadoer", "Tørke og skogbrann", "Miljøkatastrofer", "Forebygging og varsling", "Undersøk en katastrofe", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"])
      assert.ok(md.includes(`## ${title}\n`), title);
    for (const km of ["KM483", "KM482", "KM487"]) assert.ok(md.includes(km));
    assert.match(md, /I dette kapitlet skal vi/);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler/);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## En bekk"));
    assert.ok(md.indexOf("## En bekk") < md.indexOf("## Læringsmål"));
  });

  it("bevarer ti figurplasser: ti figurer og ingen skjulte markører", () => {
    assert.deepEqual([...md.matchAll(/^\[figur-6-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])), []);
    const parts = parsePosterMarkdown(md);
    const names = parts.filter((part) => part.type === "widget").map((part) => part.id);
    assert.equal(names.length, 10);
    assert.equal(new Set(names).size, 10);
    const registry = read("../components/poster-body.tsx");
    for (const name of names) assert.ok(registry.includes(`${name}:`), name);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap6-redaksjon|figur-6-/);
    assert.match(html, /En aktuell farekjede i Nepal i 2026/);
  });

  it("har 31 verifiserte kilder, ingen bibliotekskilder og eksplisitt usikkerhet", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 37);
    assert.doesNotMatch(sources, /Terra Nova|bibliotek|Aunivers/);
    for (const domain of ["undrr.org", "nve.no", "varsom.no", "usgs.gov", "regjeringen.no", "wmo.int", "unep.org", "ipcc.ch", "met.no", "snl.no", "udir.no", "dsb.no", "metoffice.gov.uk", "bjerknes.uib.no"])
      assert.ok(sources.includes(domain), domain);
    assert.match(md, /ikke en formel/);
    assert.match(md, /foreløpige opplysninger/);
    assert.match(md, /ikke et løfte/);
    assert.match(md, /ikke en påstand om endelig skadeomfang/);
    assert.match(md, /ikke grav etter kvikkleire/i);
  });

  it("begrenser modellene til Vg1 uten å koble inn udokumenterte returperioder", () => {
    const registry = read("../components/poster-body.tsx");
    assert.match(registry, /GeoNaturfareHydrogram:.*HydrographCatchmentModel geografi/);
    assert.doesNotMatch(md, /HydrographCatchmentModel/);
    assert.match(md, /beregner verken flomstørrelse/);
    const weather = read("../components/diagrams/vaerkatastrofer-figurer.tsx");
    assert.match(weather, /export const OrkanSnittFigur = lagFigur\(orkanSnitt\)/);
    assert.match(weather, /export const StormfloFigur = lagFigur\(stormflo\)/);
    assert.match(weather, /export const GeografiOrkanSnittFigur/);
    assert.match(weather, /export const GeografiStormfloFigur/);
    assert.match(weather, /bryter: undefined/);
    assert.match(read("../components/diagrams/volcanoes.tsx"), /geografi \? GEOGRAFI_HAZARDS : HAZARDS/);
  });

  it("registrerer engangsreseed og tekstklar side", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-naturfare-kap6-2026-11-06"/);
    assert.match(read("geografi-kapitler.ts"), /path: "naturfare",\s+tekstKlar: true/);
  });
});


describe("Geografi kapittel 8: bærekraftig utvikling (PR E)", () => {
  const md = read("posts/geo-baerekraft.md");
  const sources = read("kilder-geografi.ts").split('"geo-baerekraft": [')[1].split("] as const")[0];

  it("dekker åtte underkapitler, kompetansemål og hele kapittelmalen", () => {
    for (const title of ["Hva er utvikling", "Mål på utvikling", "Bærekraftbegrepet", "Planetære grenser", "Ditt fotavtrykk", "Norges ressursbruk", "Dilemmaer", "Veien videre", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"])
      assert.ok(md.includes(`## ${title}\n`), title);
    for (const km of ["KM485", "KM484", "KM481"]) assert.ok(md.includes(km));
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## Datoen som mangler"));
    assert.ok(md.indexOf("## Datoen som mangler") < md.indexOf("## Læringsmål"));
    assert.match(md, /I dette kapitlet skal vi/);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler/);
    assert.match(md, /### 7. Vurder et tiltak/);
  });

  it("har én skjult figurplass (8.6, lisens) og sju registrerte Vg1-figurer", () => {
    const numbers = [...md.matchAll(/^\[figur-8-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])).sort((a, b) => a - b);
    assert.deepEqual(numbers, [6]);
    const widgets = parsePosterMarkdown(md).filter((part) => part.type === "widget");
    assert.deepEqual(widgets.map((part) => part.id), ["GeoBaerekraftFattigdomKart", "GeoHdiBnp", "GeoBaerekraftTre", "GeoBaerekraftPlanetaere", "GeoLokalFotavtrykk", "GeoBaerekraftCo2Kart", "GeoBaerekraftCo2Serie"]);
    assert.match(read("../components/poster-body.tsx"), /GeoBaerekraftTre:.*BaerekraftTreFigur geografi/);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap8-redaksjon|figur-8-/);
    assert.match(html, /Datoen som mangler/);
    assert.doesNotMatch(md, /[Ss]e figur 8\.[124567]/);
  });

  it("har 28 eksterne kildeoppføringer og ingen bibliotekskilder", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 28);
    assert.doesNotMatch(sources, /Terra Nova|bibliotek|Aunivers/);
    for (const domain of ["udir.no", "ssb.no", "undp.org", "worldbank.org", "footprintnetwork.org", "footprintcalculator.org", "wwf.no", "pik-potsdam.de", "ipcc.ch", "unep.org", "sdgs.un.org", "miljodirektoratet.no", "regjeringen.no", "stratigraphy.org", "ourworldindata.org", "fn.no"])
      assert.ok(sources.includes(domain), domain);
  });

  it("daterer funn og skiller manglende data fra gode resultater", () => {
    assert.match(md, /16. april for Norge i 2025/);
    assert.match(md, /Norge har ingen publisert nasjonal overforbruksdag i 2026 på grunn av datakvaliteten/);
    assert.match(md, /21. september 2026.*sju av ni/);
    assert.match(md, /grensen oppdatert til 3,00.*2021/);
    assert.match(md, /ikke uten videre framstilles som en formelt vedtatt epoke/);
    assert.match(md, /ikke bare det aktuelle landets egen biokapasitet/);
  });

  it("avgrenser indikatorer og kalkulator slik at tall ikke blir en falsk fasit", () => {
    assert.match(md, /bruttonasjonalinntekt \(BNI\).*ikke BNP/);
    assert.match(md, /Den inkluderer ikke arealbruksendringer/);
    assert.match(md, /oppdiktet profil/);
    assert.match(md, /ikke opprett konto/);
    assert.match(md, /ikke rangere medelever/);
    assert.match(md, /ikke omtale en annen landprofil som norsk/);
    const figure = read("../components/diagrams/g2a-sol-salt.tsx");
    assert.match(figure, /geografi \? GEOGRAFI_DIM : DIM/);
    assert.match(figure, /geografi = false/);
    assert.match(figure, /Figur 8.3/);
  });

  it("registrerer tekstklar side og engangsreseed", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-baerekraft-kap8-2026-11-06"/);
    assert.match(read("geografi-kapitler.ts"), /path: "baerekraft",\s+tekstKlar: true/);
  });
});
