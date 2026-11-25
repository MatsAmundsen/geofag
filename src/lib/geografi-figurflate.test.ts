import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { LYSE_FIGURER, kontrast, luminans } from "./geografi-figurflate.ts";

const DIR = new URL("../components/geografi/", import.meta.url);
const les = (f: string) => readFileSync(new URL(f, DIR), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const MORK_FLATE = "#0f171c"; // svg-kit C.bg, den mørke figurflaten
const LYS_FLATE = "#ffffff";

/** Deler en komponentfil i figurblokker: fra én figurramme til den neste. */
function figurblokker(kilde: string) {
  const starter = [...kilde.matchAll(/<(figure|GeoFigur|Diagram|FigureFrame)\b/g)].map((m) => m.index ?? 0);
  return starter.map((start, i) => {
    const slutt = starter[i + 1] ?? kilde.length;
    const tekst = kilde.slice(start, slutt);
    return { start, slutt, tekst, lys: /geo-lys-flate|flate="lys"/.test(tekst.slice(0, 400)) };
  });
}

/** Hardkodede tekstfarger i en blokk: <text fill="#…"> og <L fill="#…">, med teksten de gjelder. */
function tekstfarger(blokk: string) {
  return [...blokk.matchAll(/<(?:text|L)\b[^>]*?\bfill=(?:"(#[0-9a-fA-F]{6})"|\{"(#[0-9a-fA-F]{6})"\})[^>]*>([^<{]*)/g)].map((m) => ({
    farge: (m[1] ?? m[2]).toLowerCase(),
    tekst: m[3].trim(),
  }));
}

// Tekst som står på en egen etikett eller form i figuren, ikke rett på figurflaten.
const EGEN_BUNN = new Set(["kap1-figurer.tsx|#ffffff|Kart 1: Møteplasser", "kap1-figurer.tsx|#ffffff|Kart 2: Veier vi vil undersøke"]);

test("figurene i lista over lyse figurer har hvit flate i lyst tema", () => {
  assert.match(css, /:root:not\(\[data-tema="mork"\]\):has\(\.kapittel-lys\) figure\.geo-lys-flate \{[^}]*--color-foreground: inherit;[^}]*background-color: #ffffff;/);
  for (const f of LYSE_FIGURER) {
    const kilde = les(f.kilde);
    const i = kilde.indexOf(f.merke);
    assert.ok(i >= 0, `${f.figur}: fant ikke «${f.merke}» i ${f.kilde}`);
    const blokk = figurblokker(kilde).find((b) => b.start <= i && i < b.slutt);
    assert.ok(blokk?.lys, `${f.figur} mangler geo-lys-flate`);
  }
});

test("ingen mørk tekst på mørk figurflate og ingen lys tekst på hvit figurflate", () => {
  const feil: string[] = [];
  for (const fil of readdirSync(DIR).filter((f) => f.endsWith(".tsx"))) {
    for (const blokk of figurblokker(les(fil))) {
      const flate = blokk.lys ? LYS_FLATE : MORK_FLATE;
      for (const { farge, tekst } of tekstfarger(blokk.tekst)) {
        if (EGEN_BUNN.has(`${fil}|${farge}|${tekst}`)) continue;
        const k = kontrast(farge, flate);
        if (k < 4.5) feil.push(`${fil}: «${tekst}» ${farge} på ${blokk.lys ? "hvit" : "mørk"} flate = ${k.toFixed(2)}:1`);
      }
    }
  }
  assert.deepEqual(feil, []);
});

test("testen fanger mørk tekst på mørk flate (slik 5.0 var) og lys tekst på hvit flate", () => {
  const mork = figurblokker('<figure className="my-8"><svg><text fill="#334155">1880</text></svg></figure>');
  assert.equal(mork[0].lys, false);
  assert.ok(kontrast(tekstfarger(mork[0].tekst)[0].farge, MORK_FLATE) < 4.5);
  const lys = figurblokker('<figure className="geo-lys-flate my-8"><svg><text fill="#e8eef2">Kontinent</text></svg></figure>');
  assert.equal(lys[0].lys, true);
  assert.ok(kontrast(tekstfarger(lys[0].tekst)[0].farge, LYS_FLATE) < 4.5);
});

test("grafikk i de endrede figurene holder minst 3:1 mot flaten", () => {
  // 8.7: seriefargene står på den mørke svg-kit-flaten
  const serie = les("baerekraft-skjulte.tsx").match(/const SERIE = \[([\s\S]*?)\] as const/)?.[1] ?? "";
  const farger = [...serie.matchAll(/farge: "(#[0-9a-f]{6})"/g)].map((m) => m[1]);
  assert.equal(farger.length, 3);
  for (const c of farger) assert.ok(kontrast(c, MORK_FLATE) >= 3, `8.7 ${c}`);
  // 3.0b og 6.1: skjelvsirklene har mørk kontur mot det lyse havet og landet
  const skjelv = les("skjelv-verdenskart.tsx");
  const kontur = skjelv.match(/fillOpacity="0\.85"\s+stroke="(#[0-9a-f]{6})"/)?.[1];
  assert.ok(kontur);
  for (const bunn of ["#eef6fb", "#e7e5e4"]) assert.ok(kontrast(kontur!, bunn) >= 3, `kontur mot ${bunn}`);
  // koropletkartene: landegrensene skiller seg fra flaten og fra alle klassefarger
  const kart = les("verdenskart.tsx");
  const grense = kart.match(/stroke=\{valgt===l\.iso3\?"#be123c":"(#[0-9a-f]{6})"\}/)?.[1];
  assert.ok(grense);
  assert.ok(kontrast(grense!, "#f8fafc") >= 3);
  for (const fil of ["baerekraft-skjulte.tsx", "naering-skjulte.tsx", "naering-valg.tsx", "befolkning-kart.tsx", "migrasjon-skjulte.tsx", "migrasjon-kart.tsx"]) {
    for (const [, c] of les(fil).matchAll(/"(#[0-9a-f]{6})"/g)) {
      if (luminans(c) > 0.35) assert.ok(kontrast(grense!, c) >= 3, `${fil}: grense mot ${c}`);
    }
  }
  // 5.0: grafikken har egen hvit bunn i begge tema, slik 11.6 har
  assert.match(les("klima-skjulte.tsx"), /className="min-w-\[560px\] w-full rounded bg-white"\s+role="img"\s+aria-label="Linjediagram over global/);
});
