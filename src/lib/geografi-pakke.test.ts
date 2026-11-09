import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import { parsePosterMarkdown } from "./poster-markdown.ts";
import { beregnGeografiMassebalanse } from "./geografi-massebalanse.ts";
import { KLIMANORMAL_STASJON, OSLO_BLINDERN_NORMALER } from "./geografi-klimanormaler.ts";

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
      if (!["geo-verktoy", "geo-feltarbeid", "geo-naturfare", "geo-baerekraft", "geo-indre-krefter", "geo-landskap", "geo-klima", "geo-ressurser"].includes(c.slug)) assert.match(md, /under arbeid/i);
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
    assert.equal((kapitler.match(/tekstKlar: true/g) ?? []).length, 8);
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
    const registry = read("../components/poster-widget-renderer.tsx");
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
    const registry = read("../components/poster-widget-renderer.tsx");
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
    assert.match(read("../components/poster-widget-renderer.tsx"), /GeoBaerekraftTre:.*BaerekraftTreFigur geografi/);
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

describe("Geografi kapittel 3: indre krefter (PR F)", () => {
  const md = read("posts/geo-indre-krefter.md");
  const sources = read("kilder-geografi.ts").split('"geo-indre-krefter": [')[1].split('"geo-landskap"')[0];
  const widgets = ["GeoJordasLag", "GeoPlateGrenser", "GeoPlateModell", "GeoJordskjelvBrudd", "GeoVulkanModell", "GeoBergartssyklus"];
  it("dekker ni underkapitler, kompetansemål og hele kapittelmalen", () => {
    for (const title of ["Geologisk tid", "Jordas oppbygning", "Platetektonikk", "Jordskjelv", "Vulkaner", "Tsunamier", "Bergarter", "Norges berggrunn", "Ressurser i aktive områder", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"])
      assert.ok(md.includes(`## ${title}\n`), title);
    assert.match(md, /Hovedmål, KM480/);assert.match(md, /KM483/);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## Da bakken åpnet seg"));
    assert.ok(md.indexOf("I dette kapitlet skal vi") < md.indexOf("## Læringsmål"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 7);assert.equal((md.match(/^c\. /gm) ?? []).length, 7);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler|under arbeid/i);
  });
  it("har ingen skjulte markører og femten registrerte Vg1-figurer", () => {
    assert.deepEqual([...md.matchAll(/^\[figur-3-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])).sort((a, b) => a - b), []);
    for (const widget of widgets) {
      assert.ok(md.includes(`\`\`\`widget\n${widget}\n\`\`\``), widget);
      assert.match(read("../components/poster-widget-renderer.tsx"), new RegExp(`${widget}: \\(\\) => <[^\\n]+geografi`));
    }
    assert.deepEqual(parsePosterMarkdown(md).filter((part) => part.type === "widget").map((part) => part.id), ["GeoIndrePlateKart", "GeoIndreSkjelvVulkan", "GeoIndreTidsskala", "GeoJordasLag", "GeoIndreRiftHav", "GeoPlateGrenser", "GeoPlateModell", "GeoJordskjelvBrudd", "GeoIndreTyrkiaKart", "GeoVulkanModell", "GeoIndreVarmeflekker", "GeoIndreReykjanes", "GeoIndreTsunami", "GeoBergartssyklus", "GeoIndreBerggrunn"]);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap3-redaksjon|figur-3-/);
    assert.doesNotMatch(md, /[Ss]e figur 3\.(?:0|1|3|5|9|11|12|13)\b/);
  });
  it("har 32 verifiserte kilder uten lærebok- eller bibliotekhenvisninger", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 32);
    for (const domain of ["ngu.no", "usgs.gov", "noaa.gov", "norskpetroleum.no", "udir.no", "vedur.is"]) assert.ok(sources.includes(domain), domain);
    assert.doesNotMatch(sources + md, /Terra Nova|bibliotek|Aunivers/);
    for (const suffix of ["a", "b", "c", "d", "e", "f", "g", "h", "i"]) assert.ok(md.includes(`u.å.-${suffix}`), suffix);
    for (const citation of ["Wald, u.å.", "USGS, 2020", "USGS, 2023", "Veðurstofa Íslands, 2023", "Norskpetroleum.no, 2024", "NOAA, u.å.-a", "NOAA, u.å.-b"]) assert.ok(md.includes(citation), citation);
  });
  it("daterer caser og skiller prinsipper fra målinger, skade og varsling", () => {
    for (const phrase of ["4,54 milliarder", "6. februar 2023", "magnitude 7,8 og 7,5", "18. desember og sluttet 21. desember 2023", "ikke informasjon om hvilke områder som er trygge", "ikke 32 ganger større skade", "øvingstall, ikke en måling", "Omdanningen skjer i fast tilstand", "alle bergarter følger ikke samme rute"]) assert.ok(md.includes(phrase), phrase);
    assert.doesNotMatch(md, /mantelen er flytende|forutsi nøyaktig når/);
  });
  it("gjenbruker modellene med Vg1-modus og bevarer G1 som standard", () => {
    const plate = read("../components/models/plate-tectonics-model.tsx");const volcano = read("../components/models/volcano-model.tsx");
    assert.match(plate, /geografi = false/);assert.match(plate, /geografi \? <GeografiPlateTectonicsModel \/> : <AdvancedPlateTectonicsModel \/>/);
    assert.match(plate, /onClick=\{\(\) => setBoundary\(item.id\)\}/);assert.match(volcano, /geografi \? <GeografiVolcanoModel \/> : <AdvancedVolcanoModel/);
    assert.match(volcano, /<VolcanoTypesDiagram geografi selected=\{scenario\}/);
    assert.match(read("../components/diagrams/quake-motion.tsx"), /geografi \? 3 : 5/);
    assert.match(read("../components/diagrams/bergartssyklus-figur.tsx"), /geografi \? RUTER.slice\(0, 1\) : RUTER/);
    assert.match(read("../components/poster-widget-renderer.tsx"), /RockCycle: \(\) => <BergartssyklusFigurLat \/>/);
    assert.match(read("../components/poster-widget-renderer.tsx"), /GeoBergartssyklus: \(\) => <BergartssyklusFigurLat geografi/);
  });
  it("har eget reseed og tekststatus for kapittel 3", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-indre-krefter-kap3-2026-11-06",\s+slug: "geo-indre-krefter"/);
    assert.match(read("geografi-kapitler.ts"), /path: "indre-krefter",\s+tekstKlar: true/);
  });
});


describe("Geografi kapittel 4: ytre krefter og landskap", () => {
  const md = read("posts/geo-landskap.md");
  const sources = read("kilder-geografi.ts").split('"geo-landskap": [')[1].split('"geo-klima"')[0];
  const widgets = ["GeoLandskapFrost", "GeoLandskapMassebalanse", "GeoLandskapBrelandskap", "GeoLandskapBotn", "GeoLandskapMarinGrense", "GeoLandskapKvikkleire"];

  it("dekker sju underkapitler, kompetansemål og hele kapittelmalen", () => {
    for (const title of ["Ytre krefter", "Istider og isbreer", "Landformer fra is", "Landhevning og marin grense", "Elver og landformer", "Kystlandskapet", "Landskap og mennesker", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"])
      assert.ok(md.includes(`## ${title}\n`), title);
    assert.match(md, /Hovedmål, KM480/);assert.match(md, /støtter KM483/);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## En fjord med flere historier"));
    assert.ok(md.indexOf("I dette kapitlet skal vi") < md.indexOf("## Læringsmål"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 7);
    assert.equal((md.match(/^c\. /gm) ?? []).length, 7);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler|under arbeid|[!<]/i);
  });

  it("har tretten widgets, modellfoto og ingen skjulte markører", () => {
    assert.deepEqual([...md.matchAll(/^\[figur-4-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])).sort((a, b) => a - b), []);
    for (const widget of widgets) {
      assert.ok(md.includes(`\`\`\`widget\n${widget}\n\`\`\``), widget);
      if (widget !== "GeoLandskapBrelandskap") assert.match(read("../components/poster-widget-renderer.tsx"), new RegExp(`${widget}: \\(\\) => <[^\\n]+geografi`));
    }
    assert.deepEqual(parsePosterMarkdown(md).filter((part) => part.type === "widget").map((part) => part.id), ["GeoLandskapIstidskart", "GeoLandskapFrost", "GeoLandskapMassebalanse", "GeoLandskapBrekart", "GeoLandskapBrelandskap", "GeoLandskapBotn", "GeoLandskapMarinGrense", "GeoLandskapKvikkleire", "GeoLandskapElv", "GeoLandskapKyst", "GeoLandskapFjordLokator", "GeoLandskapGeirangerFoto", "GeoLandskapLeirslette"]);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap4-redaksjon|figur-4-/);
    assert.doesNotMatch(md, /[Ss]e figur 4\.(?:0|7|8|9|10|11)\b/);
  });

  it("har 39 verifiserte kilder uten elevrettede bibliotek- eller lærebokhenvisninger", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 39);
    for (const domain of ["ngu.no", "nve.no", "nibio.no", "snl.no", "unesco.org", "udir.no"]) assert.ok(sources.includes(domain), domain);
    assert.doesNotMatch(sources + md, /Terra Nova|bibliotek|Aunivers/);
    for (const citation of ["Bryhni & Fossen, 2024", "Bryhni & Røthe, 2025", "Sørbel, 2024", "Røthe & Mangerud, u.å.", "Spjeldnæs, u.å.", "NVE, 2024", "NVE, 2026a", "NVE, 2026b", "bioøkonomi [NIBIO], 2022", "NIBIO, 2023", "NIBIO, u.å.", "UNESCO, u.å.", "Udir, u.å."]) assert.ok(md.includes(citation), citation);
    for (const suffix of ["a", "b", "c", "d", "e"]) assert.ok(md.includes(`u.å.-${suffix}`), suffix);
  });

  it("har alle 18 avtalte begreper med forklaring", () => {
    for (const term of ["Forvitring", "Erosjon", "Avsetning", "Løsmasser", "Isbre", "Innlandsis", "U-dal", "Fjord", "Botn", "Morene", "Esker", "Marin grense", "Landhevning", "Kvikkleire", "Meander", "Delta", "Elveterrasse", "Strandflate"])
      assert.ok(md.includes(`| ${term} |`), term);
  });

  it("skiller kartspørsmål, daterer Åknes-kilden og unngår ferske scenarioverdier", () => {
    for (const phrase of ["ikke inne i selve Geirangerfjorden", "19. juni 2026", "ikke på et sanntidsvarsel", "ikke en måling av en navngitt norsk bre", "ikke en dato for hver enkelt landform", "som en erstatning", "automatisk blir kvikkleire", "ikke er det samme som kvikkleireskredfare"])
      assert.ok(md.includes(phrase), phrase);
    assert.doesNotMatch(md, /millioner kubikkmeter|meter høye bølger|prosent sannsynlighet|NVE-målinger viser 2,5/);
    assert.ok(md.includes("høstpløying uten erosjonstiltak"));
  });

  it("gjenbruker avgrensede Vg1-modeller og bevarer avansert standard som standard", () => {
    const ice = read("../components/diagrams/isbreer.tsx");
    const mass = read("../components/models/glacier-mass-balance-model.tsx");
    assert.match(ice, /useStepClock\(geografi \? 3 : 4/);
    assert.match(ice, /const suck = frozen && !geografi/);
    assert.match(ice, /!geografi && <Skyver/);
    assert.match(mass, /geografi = false/);
    assert.match(mass, /geografi \? <GeografiGlacierMassBalanceModel \/> : <AdvancedGlacierMassBalanceModel \/>/);
    const simple = mass.split("function GeografiGlacierMassBalanceModel()")[1].split("function AdvancedGlacierMassBalanceModel()")[0];
    assert.doesNotMatch(simple, /baseEla|elaShift|summerTempAnomaly|aarPercent|permafrost/);
    assert.match(simple, /ikke NVE-målinger eller en prognose/);
    assert.match(read("../components/diagrams/botn-egg-tind-figur.tsx"), /below=\{geografi \? undefined/);
    assert.match(read("../components/diagrams/skred.tsx"), /if \(geografi\) return <GeografiKvikkleireDiagram/);
    assert.match(read("../components/poster-widget-renderer.tsx"), /GlacierMassBalanceModel: \(\) => <GlacierMassBalanceModel \/>/);
  });

  it("regner bare forskjell i valgte øvingstall, også ved negativ og lik null balanse", () => {
    for (const [gain, loss, expected] of [[2.5, 3, -0.5], [4, 3, 1], [3, 3, 0], [0, 6, -6], [6, 0, 6], [1.2, 1.3, -0.1], [0, 0, 0]])
      assert.equal(beregnGeografiMassebalanse(gain, loss), expected);
  });

  it("har eget reseed og tekststatus for kapittel 4", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-landskap-kap4-2026-11-06",\s+slug: "geo-landskap"/);
    assert.match(read("geografi-kapitler.ts"), /path: "landskap",\s+tekstKlar: true/);
  });
});


describe("Geografi kapittel 5: vær, klima og klimaendringer", () => {
  const md = read("posts/geo-klima.md");
  const sources = read("kilder-geografi.ts").split('"geo-klima": [')[1].split('"geo-naturfare"')[0];
  const widgets = ["GeoKlimaDiagram", "GeoKlimaVindceller", "GeoKlimaCoriolis", "GeoKlimaHav", "GeoKlimaSoner", "GeoKlimaFon", "GeoKlimaStraling", "GeoKlimaKarbon", "GeoKlimaScenario"];

  it("dekker ni underkapitler og hele den pedagogiske malen", () => {
    for (const title of ["Vær og klima", "Globale sirkulasjoner", "Klimasoner", "Norges klima", "Drivhuseffekten", "Klimaendringer nå", "Klimaendringer i Norge", "Klimaendringer globalt", "Kutt og tilpasning", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"])
      assert.ok(md.includes(`## ${title}\n`), title);
    assert.match(md, /Hovedmål, KM482/);assert.match(md, /støtter KM483/);assert.match(md, /støtter KM485/);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## Et bilde fra en våt august"));
    assert.ok(md.indexOf("I dette kapitlet skal vi") < md.indexOf("## Læringsmål"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 7);
    assert.equal((md.match(/^c\. /gm) ?? []).length, 7);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler|under arbeid|[!<]/i);
  });

  it("har tolv figurposisjoner, tolv registrerte figurer og ingen skjulte markører", () => {
    assert.deepEqual([...md.matchAll(/^\[figur-5-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])).sort((a, b) => a - b), []);
    for (const id of widgets) {
      assert.ok(md.includes(["```widget", id, "```"].join("\n")), id);
      assert.ok(read("../components/poster-widget-renderer.tsx").includes(`${id}: () =>`), id);
    }
    assert.deepEqual(parsePosterMarkdown(md).filter((part) => part.type === "widget").map((part) => part.id), ["GeoKlimaTemperaturserie", ...widgets, "GeoKlimaNesbyenLokator", "GeoKlimaBangladeshLokator"]);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap5-redaksjon|figur-5-/);
    assert.doesNotMatch(md, /[Ss]e figur 5\.(?:0|10|11)\b/);
  });

  it("registrerer 33 eksterne kilder uten bibliotek eller lærebok i elevteksten", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 33);
    for (const domain of ["ipcc.ch", "met.no", "nve.no", "snl.no", "science.nasa.gov", "scied.ucar.edu", "metoffice.gov.uk", "noaa.gov", "kartverket.no", "worldbank.org", "regjeringen.no", "ec.europa.eu", "miljodirektoratet.no", "udir.no"])
      assert.ok(sources.includes(domain), domain);
    assert.doesNotMatch(sources + md, /Terra Nova|bibliotek|Aunivers/);
    for (const citation of ["IPCC, 2023", "NASA, u.å.-a", "NASA, u.å.-b", "UCAR, u.å.-a", "UCAR, u.å.-b", "Met Office, u.å.", "Meteorologisk institutt, 2021b", "Meteorologisk institutt, 2021a, 2024", "Tveito, 2021", "Norsk klimaservicesenter, 2025", "Dannevig & Harstveit, 2026", "Harstveit, 2024", "Barthel, u.å.", "Mamen, u.å.", "Riebeek, 2011", "Lindsey, 2009", "Verdensbanken, 2022", "Sanna, 2023", "Sanna & Holte, 2023", "NVE, 2025", "Kartverket, 2024", "Klima- og miljødepartementet, 2025", "Europakommisjonen, u.å.", "Miljødirektoratet, 2026"])
      assert.ok(md.includes(citation), citation);
  });

  it("forklarer alle 18 avtalte begreper i brødtekst og begrepsliste", () => {
    for (const term of ["Vær", "Klima", "Klimadiagram", "Høytrykk", "Lavtrykk", "Passatvind", "Vestavindsbeltet", "Havstrøm", "Klimasone", "Fønvind", "Drivhuseffekt", "Drivhusgass", "Karbonkretsløp", "Tilbakekopling", "Utslippsscenario", "Klimatilpasning", "Utslippskutt", "Klimakvote"])
      assert.ok(md.includes(`| ${term} |`), term);
    for (const term of ["vær", "klima", "klimadiagram", "høytrykk", "lavtrykk", "passatvind", "vestavindsbeltet", "havstrøm", "klimasone", "fønvind", "drivhuseffekten", "drivhusgass", "karbonkretsløpet", "tilbakekopling", "utslippsscenario", "klimatilpasning", "utslippskutt", "klimakvote"])
      assert.ok(md.toLowerCase().includes(`**${term}**`), term);
  });

  it("daterer klimatall og caser og skiller observasjoner fra framskrivning", () => {
    for (const phrase of ["1,1 °C", "2011–2020", "1850–1900", "ikke temperaturstatus for 2026", "1. september", "august 2023", "31. oktober 2022", "ikke en påstått ny katastrofe i 2026", "ikke en tallfestet", "ikke en sikker værmelding", "ikke et nødvendig vilkår", "ikke to navn", "ikke lik overalt"])
      assert.ok(md.includes(phrase), phrase);
    assert.doesNotMatch(md, /13 millioner|9 prosent av|1\.1 °C|hele august skyldtes bare/);
  });

  it("gjenbruker sju komponenter bare gjennom uttrykkelig Vg1-valg", () => {
    for (const [file, names] of [
      ["wind", ["WindCellsDiagram", "GlobalClimateZonesDiagram"]], ["coriolis", ["CoriolisDiagram"]], ["ocean", ["AmocDiagram"]],
      ["weather", ["FoehnAdiabaticDiagram"]], ["climate-radiation", ["EarthRadiationBudgetDiagram"]], ["spheres", ["CarbonCycleDiagram"]],
    ] as const) for (const name of names) {
      assert.ok(read(`../components/diagrams/${file}.tsx`).includes(`export function ${name}({ geografi = false }`), name);
      assert.ok(read("../components/poster-widget-renderer.tsx").includes(`<${name} geografi />`), name);
    }
  });

  it("viser en dokumentert stasjonsnormal med tabell, periode og datakreditering", () => {
    const figure = read("../components/geografi/klima-diagrammer.tsx");
    const chartOnly = figure.split("export function GeografiKlimaScenario")[0];
    for (const expected of ["Oslo – Blindern", "18700", "1991–2020", "<table", "<caption", 'scope="col"', 'scope="row"', "Data fra Meteorologisk institutt", "CC BY 4.0", "2021a, 2024", "Tveito, 2021"]) assert.ok(chartOnly.includes(expected), expected);
    assert.doesNotMatch(chartOnly, /konstruert|Øvingsdata|Øvingstall|øvingsdatasett|fetch\(/);
    assert.doesNotMatch(md, /øvingsdiagrammet|øvingsåret|konstruert øvingsdatasett/);
    assert.match(md, /normalperioden 1991–2020/);
    assert.match(md, /én stasjonsnormal ikke beskriver alle steder i Oslo/);
    assert.match(figure, /ikke temperaturkurver eller beregnede IPCC-baner/);
  });

  it("bevarer de tolv publiserte TAM- og RR-normalene, ikke eldre eller syntetiske tall", () => {
    assert.deepEqual(OSLO_BLINDERN_NORMALER, [
      ["Jan", -2.3, 58], ["Feb", -2.0, 46], ["Mar", 1.3, 41], ["Apr", 6.2, 48],
      ["Mai", 11.4, 60], ["Jun", 15.3, 80], ["Jul", 17.7, 87], ["Aug", 16.5, 103],
      ["Sep", 12.2, 82], ["Okt", 6.6, 93], ["Nov", 2.2, 85], ["Des", -1.4, 54],
    ]);
    assert.equal(OSLO_BLINDERN_NORMALER.reduce((sum, row) => sum + row[2], 0), 837);
    assert.equal(KLIMANORMAL_STASJON.arsnormalNedbor, 837);
    assert.equal(KLIMANORMAL_STASJON.id, 18700);
    assert.equal(KLIMANORMAL_STASJON.periode, "1991–2020");
    assert.equal(KLIMANORMAL_STASJON.hoydeMeter, 94);
    assert.equal(KLIMANORMAL_STASJON.temperaturKode, "TAM");
    assert.equal(KLIMANORMAL_STASJON.nedborKode, "RR");
  });

  it("kobler normalene til originalfilene, datalisensen og et nytt reseed", () => {
    assert.match(KLIMANORMAL_STASJON.temperaturKilde, /^https:\/\/www\.met\.no\/kss\/.*StNormaler_mnd_middeltemp_1991-2020\.txt$/);
    assert.match(KLIMANORMAL_STASJON.nedborKilde, /^https:\/\/www\.met\.no\/kss\/.*StNormaler_mnd_nedbor_1991-2020_rettet\.txt$/);
    assert.equal(KLIMANORMAL_STASJON.lisens, "https://creativecommons.org/licenses/by/4.0/");
    assert.ok(sources.includes(KLIMANORMAL_STASJON.temperaturKilde));
    assert.ok(sources.includes(KLIMANORMAL_STASJON.nedborKilde));
    for (const checksum of [KLIMANORMAL_STASJON.temperaturSha256, KLIMANORMAL_STASJON.nedborSha256]) assert.match(checksum, /^[a-f0-9]{64}$/);
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-klima-normaler-blindern-1991-2020-2026-11-06",\s+slug: "geo-klima"/);
  });

  it("viser kildekritikk, tiltaksskiller og trygg oppgaveløsning", () => {
    for (const phrase of ["månedens nedbør", "klimafordeling", "ikke et sanntidsvarsel", "bare fordi noen betaler", "ikke automatisk det samme", "Vi skal ikke oppsøke flomvann", "Ikke send notatet", "Fleip eller fakta?", "En skal ut", "Svar med begrunnelse"])
      assert.ok(md.includes(phrase) || md.includes(phrase.replace("månedens", "måneds")), phrase);
    assert.match(md, /kort, tenkt kommunalt beslutningsnotat/);
  });

  it("har eget reseed og tekststatus mens kapittel 9 fortsatt er skjelett", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-klima-kap5-2026-11-06",\s+slug: "geo-klima"/);
    assert.match(read("geografi-kapitler.ts"), /path: "klima",\s+tekstKlar: true/);
    assert.doesNotMatch(read("geografi-kapitler.ts"), /path: "naering",\s+tekstKlar: true/);
    assert.match(read("posts/geo-naering.md"), /under arbeid/i);
  });
});

describe("Geografi kapittel 7: naturressurser og arealbruk", () => {
  const md = read("posts/geo-ressurser.md");
  const sources = read("kilder-geografi.ts").split('"geo-ressurser": [')[1].split('"geo-baerekraft"')[0];
  const widgets = ["GeoRessursFornyelse", "GeoRessursKobber", "GeoRessursBergartBrudd", "GeoRessursPetroleum", "GeoRessursKraftproduksjon", "GeoRessursVindAvveining", "GeoRessursFosenKart", "GeoRessursHavsoner", "GeoRessursSysselNord"];

  it("dekker åtte underkapitler og lærings- og oppgavemalen", () => {
    for (const title of ["Hva er ressurser", "Fornybare ressurser", "Ressurser i berggrunnen", "Olje og gass", "Energi", "Arealbruk og konflikter", "Sápmi og reindrift", "Nordområdene", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz", "KILDER"])
      assert.ok(md.includes(`## ${title}\n`), title);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## En vindpark og et vinterbeite"));
    assert.match(md, /Hovedmål, KM481/);assert.match(md, /KM480/);assert.match(md, /KM485/);
    assert.ok(md.indexOf("I dette kapitlet skal vi") < md.indexOf("## Læringsmål"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 6);
    assert.equal((md.match(/^c\) /gm) ?? []).length, 6);
    assert.doesNotMatch(md, /under arbeid|Planlagte underkapitler|[!<]/i);
  });

  it("fordeler ni figurposisjoner på ni figurer uten skjulte markører", () => {
    assert.deepEqual([...md.matchAll(/^\[figur-7-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])).sort((a, b) => a - b), []);
    for (const id of widgets) assert.ok(read("../components/poster-widget-renderer.tsx").includes(`${id}: () =>`), id);
    assert.deepEqual(parsePosterMarkdown(md).filter((part) => part.type === "widget").map((part) => part.id), widgets);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|figur-7-/);
    assert.doesNotMatch(md, /[Ss]e figur 7\.(?:1|5|6|7|9)\b/);
  });

  it("registrerer 43 eksterne kilder uten bibliotek eller lærebok", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 43);
    for (const domain of ["snl.no", "ngu.no", "nibio.no", "nve.no", "domstol.no", "regjeringen.no", "landbruksdirektoratet.no", "sametinget.no", "norskpetroleum.no", "nbim.no", "ec.europa.eu", "ipcc.ch", "udir.no"])
      assert.ok(sources.includes(domain), domain);
    assert.doesNotMatch(sources + md, /Terra Nova|bibliotek|Aunivers/);
  });

  it("definerer alle de 17 avtalte begrepene og gjentar dem i begrepslisten", () => {
    for (const term of ["Naturressurs", "Fornybar", "Betinget fornybar", "Ikke-fornybar", "Ressursknapphet", "Malm", "Kritiske mineraler", "Petroleum", "Vannkraft", "Arealbruk", "Arealkonflikt", "Interessekonflikt", "Allmenningens tragedie", "Reindrift", "Urfolksrettigheter", "Nordområdene", "Forvaltning"]) {
      assert.ok(md.includes(`| ${term} |`), term);
      assert.ok(md.toLowerCase().includes(`**${term.toLowerCase()}**`), term);
    }
  });

  it("skiller ressurs, produksjonsgrunnlag, kraftproduksjon og energibruk", () => {
    for (const phrase of ["selve jordsmonnet", "ikke en naturlov", "hvor den bearbeides", "ikke automatisk", "ikke det første oljefunnet", "ikke i store underjordiske innsjøer", "ikke et fullstendig energiregnskap", "1996", "1969", "1971"])
      assert.ok(md.includes(phrase), phrase);
  });

  it("avgrenser Fosen-kildene og beskytter mot en rettighetsbasert poenghandel", () => {
    for (const phrase of ["11. oktober 2021", "18. desember 2023", "6. mars 2024", "dommen fastsatte ikke at turbinene skulle rives", "ikke alene at det senere er gjennomført", "ikke en generell", "samlet belastning", "ikke gi menneskerettigheter en poengsum"])
      assert.ok(md.toLowerCase().includes(phrase.toLowerCase()), phrase);
    assert.match(md, /De fleste samer arbeider ikke med reindrift/);
    assert.match(md, /god tro/);
  });

  it("gjenbruker tre modeller gjennom et uttrykkelig vg1-valg uten nye kvantitative påstander", () => {
    const registry = read("../components/poster-widget-renderer.tsx");
    for (const name of ["FraBergartTilBruddDiagram", "PetroleumTrapModel", "WindPowerTradeoffDiagram"])
      assert.ok(registry.includes(`<${name} geografi />`), name);
    const petroleum = read("../components/models/resource-ore-petroleum-model.tsx").split("const PETROLEUM_STEG =")[1];
    for (const phrase of ["aria-pressed", "aria-live", "Les alle fem trinn", "ikke en full geologisk tidslinje", "ingen mengder"])
      assert.ok(petroleum.toLowerCase().includes(phrase.toLowerCase()), phrase);
    assert.doesNotMatch(petroleum, /type="range"|sealIntegrity|oilColumnMeters|gasFraction/);
  });

  it("gir nøktern nordområdeavgrensning, havrett og et datert LoVeSe-case", () => {
    for (const phrase of ["mellom polarsirkelen og Nordpolen", "ikke en egen stat", "fiskevernsone", "ikke det samme som full suverenitet", "ikke i en påstand om siste politiske vedtak", "uten at betegnelsen i seg selv betyr juridisk vern", "ikke send innspillet"])
      assert.ok(md.toLowerCase().includes(phrase.toLowerCase()), phrase);
    assert.match(md, /ikke send innspillet/i);
  });

  it("har eget reseed, tekststatus og begrunnede quizsvar", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-ressurser-kap7-2026-11-06",\s+slug: "geo-ressurser"/);
    assert.match(read("geografi-kapitler.ts"), /path: "ressurser",\s+tekstKlar: true/);
    for (const title of ["Fleip eller fakta?", "En skal ut", "Svar med begrunnelse"]) assert.ok(md.includes(title), title);
    assert.doesNotMatch(read("posts/geo-naering.md"), /## Hva er ressurser/);
  });
});
