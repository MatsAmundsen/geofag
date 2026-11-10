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
import { FLYTTING_REGIONER, LANDSDEL_FLYTTING_RA, LANDSDELER, INNVANDRING_GRUNN_RA, INNVANDRING_GRUNN_SERIER, MIGRASJON_HISTORIE, MIGRASJON_KILDER, NORD_SOR, UNHCR_FAKTA } from "./geografi-migrasjonsdata.ts";
import { ALDERSGRUPPER, BEFOLKNING_KILDER, NORGE_RA, NORGE_PYRAMIDER, LAND_RA, LAND_PYRAMIDER, NORGE_SFT, VERDENSBEFOLKNING, NORGE_ENDRING, NORGE_MIDDELFOLK, NORGE_NATURLIG, NORGE_NETTOFLYTTING, NORGE_REGISTERAVVIK } from "./geografi-befolkningsdata.ts";
import { NAERING_AR, NAERING_KILDE, NAERING_RASERIER, NAERING_STRUKTUR } from "./geografi-naeringsdata.ts";

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
      if (!["geo-verktoy", "geo-feltarbeid", "geo-naturfare", "geo-baerekraft", "geo-indre-krefter", "geo-landskap", "geo-klima", "geo-ressurser", "geo-naering", "geo-befolkning", "geo-migrasjon"].includes(c.slug)) assert.match(md, /under arbeid/i);
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

  it("har elleve figurer som widgets og ingen synlige redaktørnotater", () => {
    const placeholders = [...md.matchAll(/^\[figur-1-(\d+)\]: # \(FIGURPLASSHOLDER/gm)];
    assert.deepEqual(placeholders, []);
    const widgets = [...md.matchAll(/^```widget\n(GeoVerktoy\w+)\n```$/gm)].map((m) => m[1]);
    assert.deepEqual(widgets, [
      "GeoVerktoyMonster",
      "GeoVerktoyMercator",
      "GeoVerktoyGallPeters",
      "GeoVerktoyGradnett",
      "GeoVerktoyTopokart",
      "GeoVerktoyKartSammenlikning",
      "GeoVerktoyMentalt",
      "GeoVerktoyBlueMarble",
      "GeoVerktoyGisLag",
      "GeoVerktoySnow",
      "GeoVerktoyTemaValg",
    ]);
    // Én implementasjon per plass: ni fra kap1-figurer, Topokart (1.4) og Kartverket-sammenlikningen (1.5) fra main.
    const renderer = read("../components/poster-widget-renderer.tsx");
    const kap1 = read("../components/geografi/kap1-figurer.tsx");
    for (const id of widgets.filter((id) => id !== "GeoVerktoyTopokart" && id !== "GeoVerktoyKartSammenlikning")) {
      assert.ok(renderer.includes(`"${id}"`), id);
      assert.ok(kap1.includes(`  ${id}: `), id);
    }
    assert.match(renderer, /GeoVerktoyTopokart: \(\) => <GeografiTopokart \/>/);
    assert.match(renderer, /lazy\(\(\) => import\("@\/components\/geografi\/kap1-figurer"\)/);
    assert.match(renderer, /GeoVerktoyKartSammenlikning: \(\) => <Suspense fallback=\{<p>Laster figur\.<\/p>\}><GeografiKartSammenlikningSkjultLat \/><\/Suspense>/);
    assert.doesNotMatch(kap1, /GeoVerktoyKartSammenlikning/);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|geografi-kap1-redaksjon|figur-1-/);
    assert.match(html, /John Snows kolerakart/);
    // Teksten må kunne leses også før de planlagte figurene er levert.
    assert.doesNotMatch(md, /[Ss]e figur 1\.|[Ss]om figur 1\./);
  });

  it("har kilder, hypotetiske eksempler og korrekt avgrenset Snow-case", () => {
    const sources = read("kilder-geografi.ts").split('"geo-feltarbeid"')[0];
    // Figur 1.7 bruker globusbildet som NASA (2011)-kilden beskriver.
    assert.match(sources, /science\.nasa\.gov\/resource\/blue-marble/);
    assert.match(read("../components/geografi/kap1-figurer.tsx"), /blue-marble-2002\.webp/);
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
    assert.equal((kapitler.match(/tekstKlar: true/g) ?? []).length, 11);
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

  it("har ti figurer som widgets og ingen synlige redaktørnotater", () => {
    const placeholders = [...md.matchAll(/^\[figur-2-(\d+)\]: # \(FIGURPLASSHOLDER/gm)];
    assert.deepEqual(placeholders, []);
    const widgets = [...md.matchAll(/^```widget\n(GeoFelt\w+)\n```$/gm)].map((m) => m[1]);
    assert.deepEqual(widgets, [
      "GeoFeltUtvalg",
      "GeoFeltProsess",
      "GeoFeltPlanmal",
      "GeoFeltMetodevalg",
      "GeoFeltloggVg1",
      "GeoFeltMaalepunkter",
      "GeoFeltEtikk",
      "GeoFeltBearbeiding",
      "GeoFeltFeilkilder",
      "GeoFeltMikroklimaEget",
    ]);
    // Én implementasjon per plass: ni fra kap2-figurer, Vg1-feltloggen fra feltlogg-vg1.
    const renderer = read("../components/poster-widget-renderer.tsx");
    const kap2 = read("../components/geografi/kap2-figurer.tsx");
    for (const id of widgets.filter((id) => id !== "GeoFeltloggVg1")) {
      assert.ok(renderer.includes(`"${id}"`), id);
      assert.ok(kap2.includes(`  ${id}: `), id);
    }
    assert.match(renderer, /GeoFeltloggVg1: \(\) => <GeografiFeltlogg \/>/);
    assert.match(renderer, /lazy\(\(\) => import\("@\/components\/geografi\/kap2-figurer"\)/);
    assert.doesNotMatch(renderer, /feltarbeid-skjulte/);
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

  it("har én skjult figurplass (8.5, lisens) og sju registrerte Vg1-figurer", () => {
    const numbers = [...md.matchAll(/^\[figur-8-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => Number(m[1])).sort((a, b) => a - b);
    assert.deepEqual(numbers, [5]);
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
    assert.doesNotMatch(md, /[Ss]e figur 3\.(?:0|1|3|7|9|10|11|13)\b/);
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
    assert.doesNotMatch(md, /[Ss]e figur 4\.(?:0|3|8|9|10b|11)\b/);
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

  it("bevarer klima-reseed og tekststatus når alle kapitler har tekst", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-klima-kap5-2026-11-06",\s+slug: "geo-klima"/);
    assert.match(read("geografi-kapitler.ts"), /path: "klima",\s+tekstKlar: true/);
    assert.match(read("geografi-kapitler.ts"), /path: "migrasjon",\s+tekstKlar: true/);
    assert.doesNotMatch(read("posts/geo-migrasjon.md"), /under arbeid/i);
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
    assert.doesNotMatch(md, /[Ss]e figur 7\.(?:2|5|7|8|9)\b/);
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


describe("Geografi kapittel 9: næringsliv og globalisering", () => {
  const md = read("posts/geo-naering.md");
  const sources = read("kilder-geografi.ts").split('"geo-naering": [')[1].split('"geo-befolkning"')[0];
  const widgets = ["GeoNaeringTjenesteKart", "GeoNaeringStruktur", "GeoNaeringLokalisering", "GeoNaeringRjukanLokator", "GeoNaeringRingvirkninger", "GeoNaeringFiskEksport", "GeoNaeringVerdikjede", "GeoNaeringTelefonSteder"];

  it("dekker sju underkapitler, kompetansemål og tre oppgavelag", () => {
    for (const title of ["Næringsstruktur", "Lokalisering", "Ringvirkninger", "Globalisering", "Internasjonal arbeidsdeling", "Verdikjeder", "Forbruk og ansvar", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"]) assert.ok(md.includes(`## ${title}\n`), title);
    for (const code of ["KM485", "KM481", "KM484"]) assert.ok(md.includes(code));
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## En fabrikk"));
    assert.ok(md.indexOf("I dette kapitlet skal vi") < md.indexOf("## Læringsmål"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 6);
    assert.equal((md.match(/^c\. /gm) ?? []).length, 6);
    assert.doesNotMatch(md, /## Status|## Planlagte underkapitler|under arbeid|[!<]/i);
  });

  it("har åtte widgets og ingen skjulte kartmarkører", () => {
    assert.deepEqual([...md.matchAll(/^\[figur-9-([\w-]+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => m[1]).sort(), []);
    assert.deepEqual(parsePosterMarkdown(md).filter((part) => part.type === "widget").map((part) => part.id), widgets);
    for (const id of widgets) assert.ok(read("../components/poster-widget-renderer.tsx").includes(`${id}: () =>`));
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|figur-9-/);
    assert.doesNotMatch(md, /[Ss]e figur 9\.(?:1|4|6)\b/);
  });

  it("har 28 kontrollerte eksterne kilder og henvisninger til alle fagkildene", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 28);
    for (const domain of ["ssb.no", "snl.no", "unep.org", "unesco.org", "ilo.org", "worldbank.org", "forbrukertilsynet.no", "udir.no"]) assert.ok(sources.includes(domain), domain);
    for (const citation of ["Udir, u.å.", "UNESCO, u.å.", "Moe & Thorsnæs, 2026", "Langseth & Munthe, 2025", "SSB, 2026a", "SSB, 2026b", "Isaksen, 2025", "Onshuus & Idsø, 2025", "Seland, 2024", "Grindheim, 2024", "Onshuus, 2026", "Munthe, 2025", "Vikøren & Pihl, 2025", "Rolstadås, 2024", "UNEP], 2019, 2023", "UNEP, 2020", "Klepp, 2026", "Forbrukertilsynet, 2026", "Vaughan-Whitehead & Pinedo Caro, 2017", "Verdensbanken, 2020"]) assert.ok(md.includes(citation), citation);
    assert.doesNotMatch(sources + md, /Terra Nova|Aunivers|bibliotek/);
  });

  it("definerer planens tolv begreper og tre støttebegreper med norsk term først", () => {
    for (const term of ["Primærnæring", "Sekundærnæring", "Tertiærnæring", "Næringsstruktur", "Lokaliseringsfaktor", "Ringvirkning", "Globalisering", "Internasjonal arbeidsdeling", "Verdikjede", "Flernasjonalt selskap", "Utkontraktering (outsourcing)", "Frihandel", "Eksterne virkninger", "Forsyningskjede", "Aktsomhetsvurderinger"]) assert.ok(md.includes(`| ${term} |`), term);
    assert.match(md, /\*\*Utkontraktering\*\* \(outsourcing\)/);
    for (const term of ["næringsstruktur", "primærnæring", "sekundærnæring", "tertiærnæring", "lokaliseringsfaktor", "ringvirkning", "globalisering", "frihandel", "internasjonal arbeidsdeling", "flernasjonalt selskap", "verdikjede"]) assert.ok(md.toLowerCase().includes(`**${term}**`), term);
  });

  it("bevarer SSB-variabel, sju år og alle 49 opprinnelige kildeverdier", () => {
    assert.deepEqual(NAERING_AR, [1970, 1980, 1990, 2000, 2010, 2020, 2023]);
    assert.equal(NAERING_KILDE.tabell, "09174");assert.equal(NAERING_KILDE.variabel, "Sysselsatte");assert.equal(NAERING_KILDE.enhet, "1000 personer");assert.equal(NAERING_KILDE.oppdatert, "2026-05-28");
    assert.deepEqual(NAERING_RASERIER.map((s) => [...s.tall]), [
      [1622.5, 1934.6, 2046.3, 2313.7, 2555.3, 2799, 2973.3],
      [357.4, 349.5, 267.9, 273.4, 231.8, 219.4, 227.6],
      [14, 17.4, 20.2, 17.3, 14.4, 16.6, 18.2],
      [4.3, 5.6, 6.3, 9.2, 14, 17.6, 19.2],
      [113.3, 125.1, 123.6, 133.6, 182.8, 247.5, 260.6],
      [212.9, 164.6, 128.4, 96.3, 65.7, 66.1, 68.3],
      [9.3, 19, 27, 29.7, 59, 63.6, 67.9],
    ]);
    assert.match(NAERING_KILDE.sha256, /^[a-f0-9]{64}$/);
  });

  it("aggregerer uten dobbeltelling og skiller antall fra andel", () => {
    assert.deepEqual(NAERING_STRUKTUR.map((d) => d.sekundaer), [498.3, 516.6, 445, 463.2, 502, 564.7, 593.5]);
    assert.deepEqual(NAERING_STRUKTUR.map((d) => d.tertiaer), [911.3, 1253.4, 1472.9, 1754.2, 1987.6, 2168.2, 2311.5]);
    for (const d of NAERING_STRUKTUR) {
      assert.ok(Math.abs(d.primaer + d.sekundaer + d.tertiaer - d.total) < 1e-8);
      assert.ok(Math.abs(d.andeler.reduce((a, b) => a + b, 0) - 100) < 1e-8);
      assert.ok(d.andeler.every((v) => v >= 0 && v <= 100));
    }
    assert.ok(NAERING_STRUKTUR[6].sekundaer > NAERING_STRUKTUR[0].sekundaer);
    assert.ok(NAERING_STRUKTUR[6].andeler[1] < NAERING_STRUKTUR[0].andeler[1]);
  });

  it("tilbyr et korrekt CSV-uttrekk og en reproduserbar offentlig spørring", () => {
    const rows = read("../../public/downloads/geografi-naering-ssb09174.csv").replace(/^\uFEFF/, "").trim().split(/\r?\n/).map((l) => l.split(";"));
    assert.equal(rows.length, 8);assert.equal(rows[0].length, 8);
    for (const [i, cells] of rows.slice(1).entries()) {
      assert.equal(Number(cells[0]), NAERING_AR[i]);
      assert.deepEqual(cells.slice(1).map((v) => Number(v.replace(",", "."))), NAERING_RASERIER.map((serie) => serie.tall[i]));
    }
    const query = JSON.parse(read("../../docs/geografi-kap9-ssb09174-query.json"));
    assert.deepEqual(query.query.find((q: { code: string }) => q.code === "ContentsCode").selection.values, ["Sysselsatte"]);
    assert.deepEqual(query.query.find((q: { code: string }) => q.code === "Tid").selection.values, NAERING_AR.map(String));
    assert.equal(query.query.find((q: { code: string }) => q.code === "NACE").selection.values.length, 7);
    assert.equal(query.response.format, "json-stat2");
  });

  it("daterer caser og markerer modellbegrensninger, rettigheter og ukjent opprinnelse", () => {
    for (const phrase of ["1970 til 2023", "28. mai 2026", "etter 2023 er foreløpige", "161 900", "ikke en garanti", "kunne vende seg mot andre markeder", "1991", "2015", "ikke en komplett leverandørliste", "ikke en generell rett til komplette leverandørlister", "ikke en påstand om dagens antall", "begynte først med internett", "Ikke send spørsmålet", "datert forskningsgrunnlag"]) assert.ok(md.toLowerCase().includes(phrase.toLowerCase()), phrase);
    assert.doesNotMatch(md, /20 000 liter|alle land følger samme utvikling\./);
  });

  it("gir datadiagrammet tilgjengelig tabell, kreditering og presise forbehold", () => {
    const figure = read("../components/geografi/naering-diagrammer.tsx");
    for (const expected of ["<table", "<caption", 'scope="col"', 'scope="row"', "CC BY 4.0", "beregnet rest", "99,9", "observerte mellomår", "minimumFractionDigits", "Last ned kildeuttrekket"]) {
      assert.ok(figure.includes(expected), expected);
    }
    assert.doesNotMatch(figure, /fetch\(|setInterval|Math\.random|konstruerte øvingsdata/);
    assert.match(figure, /Forenklet, ikke komplett leverandørliste/);
  });

  it("bevarer kapittel 9 sitt reseed når siste kapittel har tekst", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-naering-kap9-2026-11-06",\s+slug: "geo-naering"/);
    assert.match(read("geografi-kapitler.ts"), /path: "naering",\s+tekstKlar: true/);
    for (const slug of ["migrasjon"]) {
      assert.match(read("geografi-kapitler.ts"), new RegExp(`path: "${slug}",\\s+tekstKlar: true`));
      assert.doesNotMatch(read(`posts/geo-${slug}.md`), /under arbeid/i);
    }
  });
});

describe("Geografi kapittel 10: befolkning og levekår", () => {
  const md = read("posts/geo-befolkning.md");
  const sources = read("kilder-geografi.ts").split('"geo-befolkning": [')[1].split('"geo-migrasjon"')[0];
  const widgets = ["GeoBefolkningFruktbarhetKart", "GeoBefolkningVerden", "GeoBefolkningGrunnformel", "GeoBefolkningNorgePyramider", "GeoBefolkningLandPyramider", "GeoBefolkningOvergang", "GeoBefolkningLevekarKart", "GeoBefolkningNorgeFruktbarhet"];

  it("dekker alle åtte underkapitler og oppgaver uten synlige redaktørnotater", () => {
    for (const title of ["Befolkningsvekst", "Demografiske mål", "Fruktbarhet og dødelighet", "Befolkningspyramider", "Demografisk overgang", "Befolkningsteorier", "Levekår i verden", "Befolkning i Norge", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"]) assert.ok(md.includes(`## ${title}\n`), title);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## To land"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 6);
    assert.equal((md.match(/^c\. /gm) ?? []).length, 6);
    assert.match(md, /KM484/);assert.match(md, /KM485/);
    assert.doesNotMatch(md, /under arbeid|## Status|## Planlagte underkapitler|[!<]/i);
  });

  it("har åtte registrerte widgets og ingen skjulte kartmarkører", () => {
    assert.deepEqual(parsePosterMarkdown(md).filter((part) => part.type === "widget").map((part) => part.id), widgets);
    for (const id of widgets) assert.ok(read("../components/poster-widget-renderer.tsx").includes(`${id}: () =>`));
    assert.deepEqual([...md.matchAll(/^\[figur-10-(\d+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => m[1]), []);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { children: md }));
    assert.doesNotMatch(html, /FIGURPLASSHOLDER|figur-10-/);
    assert.doesNotMatch(md, /[Ss]e figur 10\.(?:1|7)\b/);
  });

  it("registrerer 19 kontrollerte kilder og henviser til fagkildene", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 19);
    for (const domain of ["ssb.no", "worldbank.org", "ourworldindata.org", "who.int", "undp.org", "snl.no", "udir.no"]) assert.ok(sources.includes(domain), domain);
    for (const citation of ["SSB, 2026a", "SSB, 2026b", "SSB, 2026c", "2026d", "Tømmerås et al., 2026", "Tønnessen, 2024", "Solerød & Tønnessen, 2026", "Nylenna et al., 2025", "Mæhlum, 2023", "Stoltz, 2026", "WHO, 2025", "UNDP, u.å.", "Verdensbanken, 2026", "Our World in Data, 2024"]) assert.ok(md.includes(citation), citation);
    assert.doesNotMatch(md + sources, /Terra Nova|Aunivers|bibliotek/);
    for (const term of ["Demografi", "Fødselsrate", "Dødsrate", "Fruktbarhet", "Samlet fruktbarhetstall (SFT)", "Spedbarnsdødelighet", "Forventet levealder", "Befolkningspyramide", "Demografisk overgang", "Forsørgerbyrde", "Eldrebølge", "Levekår", "Ulikhet"]) assert.ok(md.includes(`| ${term} |`), term);
  });

  it("bevarer alle 848 originale ettårstall i kildeuttrekket", () => {
    assert.deepEqual(NORGE_RA.map((d) => d.ar), [1986, 2006, 2026, 2050]);
    const rows = read("../../public/downloads/geografi-befolkning-ssb.csv").trim().split(/\r?\n/).slice(1).map((l) => l.split(";"));
    assert.equal(rows.length, 848);
    for (const d of NORGE_RA) for (const kjonn of ["menn", "kvinner"] as const) {
      assert.equal(d[kjonn].length, 106);
      assert.deepEqual(rows.filter((r) => Number(r[1]) === d.ar && r[2] === kjonn).map((r) => Number(r[4])), d[kjonn]);
      assert.ok(d[kjonn].every((v) => Number.isInteger(v) && v >= 0));
    }
    assert.deepEqual(NORGE_PYRAMIDER.map((d) => d.total), [4159187, 4640219, 5627400, 6214071]);
    assert.deepEqual(NORGE_PYRAMIDER.map((d) => d.fra65), [659716, 682469, 1083060, 1567190]);
  });

  it("summerer norske grupper uten overlapp eller bortfall, og åpner 80+ riktig", () => {
    assert.equal(ALDERSGRUPPER.length, 17);assert.equal(ALDERSGRUPPER[16], "80+");
    for (const [i, d] of NORGE_PYRAMIDER.entries()) {
      assert.equal(d.grupper.reduce((a, g) => a + g.menn + g.kvinner, 0), d.total);
      assert.ok(Math.abs(d.grupper.reduce((a, g) => a + g.mennProsent + g.kvinnerProsent, 0) - 100) < 1e-10);
      assert.equal(d.grupper[16].menn, NORGE_RA[i].menn.slice(80).reduce((a, b) => a + b, 0));
      assert.equal(d.grupper[16].kvinner, NORGE_RA[i].kvinner.slice(80).reduce((a, b) => a + b, 0));
      const work = NORGE_RA[i].menn.slice(15, 65).reduce((a, b) => a + b, 0) + NORGE_RA[i].kvinner.slice(15, 65).reduce((a, b) => a + b, 0);
      assert.equal(d.eldreForhold, d.fra65 / work * 100);
    }
  });

  it("bevarer 80 WDI-verdier og omregner kjønnsspesifikke andeler til hele befolkningen", () => {
    const rows = read("../../public/downloads/geografi-befolkning-worldbank.csv").trim().split(/\r?\n/).slice(1).map((l) => l.split(";"));
    assert.equal(rows.length, 80);
    for (const [i, d] of LAND_RA.entries()) {
      const subset = rows.filter((r) => r[0] === d.kode);
      assert.equal(subset.length, 40);assert.ok(subset.every((r) => r[1] === "2023"));
      for (const [sex, ra] of [["MA", d.mennRa], ["FE", d.kvinnerRa]] as const) {
        assert.deepEqual(subset.filter((r) => r[2].includes(`.${sex}.5Y`)).map((r) => Number(r[3].replace(",", "."))), ra);
      }
      assert.ok(Math.abs(d.mennAndel + d.kvinnerAndel - 100) < 1e-10);
      const grupper = LAND_PYRAMIDER[i].grupper;
      assert.equal(grupper[0].mennProsent, d.mennRa[0] * d.mennAndel / 100);
      assert.ok(Math.abs(grupper.reduce((a, g) => a + g.mennProsent + g.kvinnerProsent, 0) - 100) < 1e-8);
      assert.ok(Math.abs(grupper.slice(0, 3).reduce((a, g) => a + g.mennProsent + g.kvinnerProsent, 0) - d.under15) < 1e-8);
      assert.ok(Math.abs(grupper.slice(13).reduce((a, g) => a + g.mennProsent + g.kvinnerProsent, 0) - d.fra65) < 1e-7);
      assert.ok(grupper.every((g) => g.mennProsent >= 0 && g.mennProsent <= 10 && g.kvinnerProsent >= 0 && g.kvinnerProsent <= 10));
    }
  });

  it("bevarer verdensserien og SFT med år, enheter og kildeuttrekk", () => {
    assert.deepEqual(VERDENSBEFOLKNING.map((d) => d.ar), [1750, 1800, 1850, 1900, 1950, 2000, 2023]);
    assert.deepEqual(VERDENSBEFOLKNING.map((d) => d.personer), [753279296, 983104755, 1275602897, 1627273655, 2493092852, 6171702992, 8091734933]);
    assert.deepEqual(NORGE_SFT.map((d) => d.sft), [2.5, 1.72, 1.93, 1.85, 1.95, 1.48, 1.4, 1.44, 1.48]);
    const rows = read("../../public/downloads/geografi-befolkning-serier.csv").trim().split(/\r?\n/).slice(1).map((l) => l.split(";"));
    assert.equal(rows.length, 23);
    assert.deepEqual(rows.filter((r) => r[0] === "OWID").map((r) => Number(r[3])), VERDENSBEFOLKNING.map((d) => d.personer));
    assert.deepEqual(rows.filter((r) => r[0] === "SSB04232").map((r) => Number(r[3].replace(",", "."))), NORGE_SFT.map((d) => d.sft));
  });

  it("bruker riktig middelfolkemengde og viser registeravvik i stedet for falsk likhet", () => {
    assert.equal(NORGE_MIDDELFOLK, 5610870);assert.equal(NORGE_NATURLIG, 10361);assert.equal(NORGE_NETTOFLYTTING, 22324);assert.equal(NORGE_REGISTERAVVIK, 375);
    assert.equal(NORGE_ENDRING.Personer2026 - NORGE_ENDRING.Personer2025, NORGE_ENDRING.AbsTilvekst2025);
    assert.equal(NORGE_NATURLIG + NORGE_NETTOFLYTTING + NORGE_REGISTERAVVIK, 33060);
    assert.equal((NORGE_ENDRING.Levendefodte2025 / NORGE_MIDDELFOLK * 1000).toFixed(2), "9.87");
    for (const phrase of ["registeravvik", "375", "32 685", "33 060", "promille", "aldersspesifikke", "1. januar", "midtårsestimater", "ikke en registrert framtid", "periodemål", "ikke et sikkert sluttpunkt", "ikke anslå forbipasserendes alder"]) assert.ok(md.includes(phrase), phrase);
  });

  it("lagrer eksakte lesespørringer, versjoner og SHA-256 uten kontaktmetadata", () => {
    for (const id of ["07459", "14740", "04232", "05803"] as const) {
      const query = JSON.parse(read(`../../docs/geografi-kap10-ssb${id}-query.json`));
      assert.equal(query.response.format, "json-stat2");assert.match(BEFOLKNING_KILDER[id].sha256, /^[a-f0-9]{64}$/);
      assert.doesNotMatch(JSON.stringify(query), /contact|@ssb\.no|phone/);
    }
    const q = JSON.parse(read("../../docs/geografi-kap10-ssb14740-query.json"));
    assert.deepEqual(q.query.find((v: { code: string }) => v.code === "Framskriv").selection.values, ["MMM"]);
    assert.deepEqual(q.query.find((v: { code: string }) => v.code === "InnvandrLandbakgr").selection.values, ["00"]);
    assert.equal(BEFOLKNING_KILDER["14740"].oppdatert, "2026-06-12");
    const ext = JSON.parse(read("../../docs/geografi-kap10-eksterne-data.json"));
    assert.ok(ext.worldbank.url.includes("date=2023"));assert.equal(ext.worldbank.method, "GET");
  });

  it("gir datadiagrammer tekst, tabeller, kilde og lisens uten levende API-avhengighet", () => {
    const figure = read("../components/geografi/befolkning-diagrammer.tsx");
    for (const text of ["<table", "<caption", 'scope="col"', 'scope="row"', "CC BY 4.0", "80+", "hele befolkningen", "MMM 2026", "mid", "stiplede", "ikke observerte mellomår", "ikke et mål på faktiske skattebetalere"]) assert.ok(figure.includes(text), text);
    assert.doesNotMatch(figure, /fetch\(|setInterval|Math\.random/);
    assert.match(figure, /title=/);assert.match(figure, /caption=/);
  });

  it("bevarer kapittel 10 sitt reseed når siste kapittel har tekst", () => {
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-befolkning-kap10-2026-11-06",\s+slug: "geo-befolkning"/);
    assert.match(read("geografi-kapitler.ts"), /path: "befolkning",\s+tekstKlar: true/);
    assert.match(read("geografi-kapitler.ts"), /path: "migrasjon",\s+tekstKlar: true/);
    assert.doesNotMatch(read("posts/geo-migrasjon.md"), /under arbeid/i);
  });
});

describe("Geografi kapittel 11: migrasjon", () => {
  const md = read("posts/geo-migrasjon.md");
  const sources = read("kilder-geografi.ts").split('"geo-migrasjon": [')[1];
  const csv = (id: string) => {
    const lines = read(`../../public/downloads/geografi-migrasjon-ssb${id}.csv`).trim().split(/\r?\n/).map((l) => l.split(";"));
    return lines.slice(1).map((cells) => Object.fromEntries(lines[0].map((k, i) => [k, cells[i]])));
  };
  const verdi = (r: Record<string, string>) => Number(r.verdi.replace(",", "."));

  it("dekker sju underkapitler, sårbare tema og alle oppgavelag", () => {
    for (const title of ["Hva er migrasjon?", "Hvorfor folk flytter", "Flytting i Norge", "Utvandring og innvandring", "Global migrasjon", "Flyktninger", "Menneskehandel", "Læringsmål", "Oppsummering", "Begreper", "Spørsmål", "Hva tror du?", "Oppgaver", "Quiz"]) assert.ok(md.includes(`## ${title}\n`), title);
    assert.ok(md.indexOf("Kompetansemål") < md.indexOf("## Flytting går"));
    assert.equal((md.match(/^### \d\. /gm) ?? []).length, 6);assert.equal((md.match(/^c\. /gm) ?? []).length, 6);
    for (const code of ["KM484", "KM481"]) assert.ok(md.includes(code));
    assert.doesNotMatch(md, /under arbeid|## Status|## Planlagte underkapitler|[!<]/i);
    assert.match(md, /ikke spørre medelever om flukt, oppholdsstatus/);
  });

  it("registrerer ni widgets og ingen skjulte kartmarkører", () => {
    const widgets = ["GeoMigrasjonNettoKart", "GeoMigrasjonSkyveTrekk", "GeoMigrasjonNorge", "GeoMigrasjonKommunekart", "GeoMigrasjonHistorie", "GeoMigrasjonInnvandringsgrunn", "GeoMigrasjonKorridorer", "GeoMigrasjonFlyktninger", "GeoMigrasjonVertslandKart"];
    assert.deepEqual(parsePosterMarkdown(md).filter((p) => p.type === "widget").map((p) => p.id), widgets);
    for (const id of widgets) assert.ok(read("../components/poster-widget-renderer.tsx").includes(`${id}: () =>`));
    assert.deepEqual([...md.matchAll(/^\[figur-11-([\w-]+)\]: # \(FIGURPLASSHOLDER/gm)].map((m) => m[1]).sort(), []);
    assert.doesNotMatch(renderToStaticMarkup(createElement(ReactMarkdown, { children: md })), /FIGURPLASSHOLDER|figur-11-/);
  });

  it("har 25 kontrollerte kilder og planens femten begreper", () => {
    assert.equal((sources.match(/href: /g) ?? []).length, 25);
    for (const domain of ["ssb.no", "snl.no", "iom.int", "unhcr.org", "unodc.org", "udi.no", "worldbank.org", "udir.no"]) assert.ok(sources.includes(domain), domain);
    for (const citation of ["SSB, 2026a", "SSB, 2026b", "SSB, 2026c", "SSB, 2026d", "IOM, u.å.", "UNHCR, 2026a", "UNHCR, u.å.-a", "UNHCR, u.å.-b", "UNHCR, u.å.-c", "UNODC, u.å.", "[UDI], u.å.", "Bore, 2005", "Gursli-Berg et al., 2026", "Hansen & Tjernshaugen, 2026", "Butenschøn, 2020", "Verdensbanken, 2023"]) assert.ok(md.includes(citation), citation);
    for (const term of ["Migrasjon", "Emigrasjon", "Immigrasjon", "Intern migrasjon", "Skyvefaktor", "Trekkfaktor", "Sentralisering", "Urbanisering", "Arbeidsinnvandring", "Flyktning", "Asylsøker", "Internt fordrevet", "Menneskesmugling", "Menneskehandel", "Pengeoverføring"]) assert.ok(md.includes(`| ${term} |`), term);
    assert.doesNotMatch(md + sources, /Terra Nova|Aunivers|bibliotek/);
  });

  it("bevarer alle 63 regionverdier og skiller kommune fra fylke", () => {
    const rows = csv("09588");assert.equal(rows.length, 63);assert.equal(FLYTTING_REGIONER.length, 9);
    for (const r of FLYTTING_REGIONER) {
      const subset = rows.filter((v) => v.Region === r.kode);assert.equal(subset.length, 7);
      for (const row of subset) assert.equal(verdi(row), r[row.ContentsCode as keyof typeof r]);
      assert.equal(r.InnflyttingInnland - r.UtflyttingInnland, r.NettoInnland);
      assert.equal(r.Innvandring - r.Utvandring, r.Nettoinnvandring);
      assert.equal(r.type, r.kode.length === 2 ? "Fylke" : "Kommune");
    }
    assert.equal(FLYTTING_REGIONER.find((r) => r.kode === "0301")!.NettoInnland, -3444);
    assert.equal(FLYTTING_REGIONER.find((r) => r.kode === "3209")!.FlyttInnlandPer1000, 12.8);
  });

  it("bevarer hele 36-cellers fra–til-matrisen uten overlappende regioner", () => {
    const rows = csv("14753");assert.equal(rows.length, 36);assert.equal(LANDSDELER.length, 6);
    for (const r of LANDSDEL_FLYTTING_RA) {
      const found = rows.filter((v) => v.Fraflyttingsregion === r.fra && v.TilflyttRegion === r.til);
      assert.equal(found.length, 1);assert.equal(found[0].Tid, "2025");assert.equal(verdi(found[0]), r.flyttinger);
      assert.ok(Number.isInteger(r.flyttinger) && r.flyttinger >= 0);
    }
    assert.ok(LANDSDEL_FLYTTING_RA.some((r) => r.fra === r.til && r.flyttinger > 0));
    assert.doesNotMatch(JSON.stringify(LANDSDEL_FLYTTING_RA), /FF-0|FT-0/);
  });

  it("beregner faktiske nord–sør-retninger og kontrollerer mot fylkenes netto", () => {
    assert.deepEqual(NORD_SOR, { fraNord: 11751, tilNord: 8864, nordTilOsloAkershus: 3441, osloAkershusTilNord: 2545 });
    assert.equal(NORD_SOR.fraNord - NORD_SOR.tilNord, 2887);
    assert.equal(NORD_SOR.nordTilOsloAkershus - NORD_SOR.osloAkershusTilNord, 896);
    assert.equal(FLYTTING_REGIONER.filter((r) => ["18", "55", "56"].includes(r.kode)).reduce((a, r) => a + r.NettoInnland, 0), NORD_SOR.tilNord - NORD_SOR.fraNord);
    for (const phrase of ["faktisk fra–til-sammenlikning", "ikke en antatt retning", "unike personer", "ikke riktig å si at alle flytter sørover", "ikke alene om total befolkningsvekst"]) assert.ok(md.includes(phrase), phrase);
  });

  it("bevarer alle 112 grunnverdier og summerer seks kategorier mot separat total", () => {
    const rows = csv("07113");assert.equal(rows.length, 112);assert.equal(INNVANDRING_GRUNN_RA.length, 112);
    for (const r of INNVANDRING_GRUNN_RA) {
      const found = rows.find((v) => v.Innvandringsgrunn === r.grunn && v.Lanbakgrunn === r.landbakgrunn && Number(v.Tid) === r.ar)!;
      assert.equal(verdi(found), r.personer);
    }
    assert.deepEqual(INNVANDRING_GRUNN_SERIER.map((s) => s.total), [49341, 40982]);
    assert.deepEqual(INNVANDRING_GRUNN_SERIER.map((s) => s.grupper.map((g) => g.personer)), [[18111, 16728, 9282, 4963, 251, 6], [10545, 12995, 13870, 2882, 504, 186]]);
    for (const s of INNVANDRING_GRUNN_SERIER) assert.equal(s.grupper.reduce((a, g) => a + g.personer, 0), s.total);
    assert.ok(md.includes("førstegangsinnvandringer blant innvandrere med ikke-nordisk statsborgerskap"));
    assert.ok(md.includes("ikke automatisk antallet nordiske statsborgere"));
  });

  it("bevarer 16 historiske strømverdier og unngår et manglende 1950-tall", () => {
    const rows = csv("05803");assert.equal(rows.length, 16);
    assert.deepEqual(MIGRASJON_HISTORIE.map((d) => d.ar), [1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025]);
    assert.deepEqual(MIGRASJON_HISTORIE.map((d) => [d.innvandring, d.utvandring]), [[13536, 18681], [17383, 18352], [18776, 14705], [25494, 23784], [36542, 26854], [73852, 31506], [38071, 26744], [55243, 32919]]);
    for (const d of MIGRASJON_HISTORIE) {
      assert.equal(verdi(rows.find((r) => r.Tid === String(d.ar) && r.ContentsCode === "Innflyttinger")!), d.innvandring);
      assert.equal(verdi(rows.find((r) => r.Tid === String(d.ar) && r.ContentsCode === "Utflyttinger")!), d.utvandring);
    }
  });

  it("daterer UNHCR-fakta og unngår både dobbeltelling og feil 65-prosentnevner", () => {
    assert.equal(UNHCR_FAKTA.referansedato, "2025-12-31");assert.equal(UNHCR_FAKTA.publisert, "2026-06-11");
    assert.deepEqual([UNHCR_FAKTA.tvungetFordrevneMillioner, UNHCR_FAKTA.flyktningerBredMillioner, UNHCR_FAKTA.asylsokereMillioner, UNHCR_FAKTA.interntFordrevneKonfliktMillioner, UNHCR_FAKTA.nabolandProsent], [117.8, 41.6, 9, 68.7, 65]);
    assert.deepEqual(JSON.parse(read("../../docs/geografi-kap11-unhcr-faktatall.json")), UNHCR_FAKTA);
    for (const phrase of ["skal ikke summeres direkte", "overlapp", "ikke med i nevneren", "ikke alle de 117,8 millionene", "et sanntidstall for november 2026", "ikke alle mennesker fordrevet av naturkatastrofer"]) {
      assert.ok(md.includes(phrase), phrase);
    }
    assert.ok(100 - UNHCR_FAKTA.nabolandProsent === 35);
  });

  it("skiller rettslige kategorier, barn og oppdagede ofre uten å stigmatisere", () => {
    for (const phrase of ["Konvensjonen fra 1951 og protokollen fra 1967", "non-refoulement", "gruppevurdering", "økonomisk eller annen materiell fordel", "kreves ikke bevis for slike midler", "ikke nødvendigvis et fullstendig mål", "nasjonalitet, yrke eller utseende", "som arbeidsdefinisjoner", "ikke en stopp for all innvandring"]) assert.ok(md.includes(phrase), phrase);
    assert.doesNotMatch(md, /alle migranter er flyktninger|alle flyktninger er asylsøkere\./i);
  });

  it("lagrer eksakte offentlige spørringer og kildeversjoner uten kontaktmetadata", () => {
    for (const id of ["09588", "14753", "07113", "05803"] as const) {
      const q = JSON.parse(read(`../../docs/geografi-kap11-ssb${id}-query.json`));
      assert.equal(q.response.format, "json-stat2");assert.match(MIGRASJON_KILDER[id].sha256, /^[a-f0-9]{64}$/);
      assert.doesNotMatch(JSON.stringify(q), /contact|phone|@ssb\.no/);
    }
    assert.equal(MIGRASJON_KILDER["07113"].oppdatert, "2026-08-28");
    const q = JSON.parse(read("../../docs/geografi-kap11-ssb14753-query.json"));
    for (const code of ["TilflyttRegion", "Fraflyttingsregion"]) assert.deepEqual(q.query.find((r: { code: string }) => r.code === code).selection.values, LANDSDELER.map((l) => l.kode));
  });

  it("har datatabeller og kreditering uten levende API-kall og aktiverer siste kapittel", () => {
    const figure = read("../components/geografi/migrasjon-diagrammer.tsx");
    for (const phrase of ["<table", "<caption", 'scope="col"', 'scope="row"', "CC BY 4.0", "førstegangsinnvandringer", "ikke en regionfordeling", "beregnet rest", "ikke nødvendigvis", "title="]) assert.ok(figure.toLowerCase().includes(phrase.toLowerCase()), phrase);
    assert.doesNotMatch(figure, /fetch\(|setInterval|Math\.random/);
    assert.match(read("copy-reseeds-b.ts"), /flag: "geo-migrasjon-kap11-2026-11-06",\s+slug: "geo-migrasjon"/);
    assert.match(read("geografi-kapitler.ts"), /path: "migrasjon",\s+tekstKlar: true/);
    assert.equal((read("geografi-kapitler.ts").match(/tekstKlar: true/g) ?? []).length, 11);
  });
});
