// Tilgjengelighet i tsunamimodellene M1–M3: navn på figur og kontroller, én statusregion
// som leses opp ved faseskifte og trinn, og ingen tidslinje som leses opp for hvert bilde.
// Komponentene oversettes med TypeScript og gjengis med react-dom/server, uten nettleser.
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { tsunamiDir as dir } from "./tsunami-ts-hooks.mjs";

const { ModelSource } = await import(new URL("m1-source.tsx", dir).href);
const { ModelShoal } = await import(new URL("m2-shoal.tsx", dir).href);
const { ModelRunup } = await import(new URL("m3-runup.tsx", dir).href);
const { sourceStatus, shoalStatus, runupStatus } = await import(new URL("a11y.ts", dir).href);

const models = [
  { id: "m1", Component: ModelSource, title: "Havbunnen flytter vannet", sliders: 4, groups: 1 },
  { id: "m2", Component: ModelShoal, title: "Fra dypt hav inn på sokkelen", sliders: 3, groups: 0 },
  { id: "m3", Component: ModelRunup, title: "Fire mål for samme bølge", sliders: 1, groups: 3 },
];

const attrs = (tag) =>
  Object.fromEntries([...tag.matchAll(/([a-zA-Z-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((m) => attrs(m[0]));
const textOf = (html, id) => {
  const m = html.match(new RegExp(`<([a-z0-9]+)[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)</\\1>`));
  return m
    ? m[2]
        .replace(/<[^>]+>/g, "")
        .replace(/&#x27;/g, "'")
        .trim()
    : null;
};
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
// Norsk tekst uten utropstegn og uten «&» i stedet for «og».
const tidy = (label, s) => {
  assert.doesNotMatch(s, /!/, `${label}: utropstegn i «${s}»`);
  assert.doesNotMatch(s, /&/, `${label}: «&» i «${s}»`);
};

for (const m of models) {
  const html = renderToStaticMarkup(createElement(m.Component));

  test(`${m.id}: seksjonen har overskrift som navn`, () => {
    const section = tags(html, "section")[0];
    assert.equal(section.id, m.id);
    assert.equal(textOf(html, section["aria-labelledby"]), m.title);
  });

  test(`${m.id}: figuren er et bilde med norsk navn og beskrivelse`, () => {
    const canvases = tags(html, "canvas");
    assert.equal(canvases.length, 1);
    const c = canvases[0];
    assert.equal(c.role, "img");
    const label = decode(c["aria-label"] ?? "");
    assert.match(label, /^Snitt fra /);
    assert.ok(label.length > 60, "navnet skal si hva figuren viser");
    tidy(`${m.id} figurnavn`, label);
    const desc = textOf(html, c["aria-describedby"]);
    assert.ok(
      desc && /Snitt på/.test(desc),
      "aria-describedby skal peke på merknaden under figuren",
    );
  });

  test(`${m.id}: skyverne har et fast navn, verdi med enhet og eventuell merknad som beskrivelse`, () => {
    const ranges = tags(html, "input").filter((a) => a.type === "range");
    assert.equal(ranges.length, m.sliders);
    for (const r of ranges) {
      const name = textOf(html, r["aria-labelledby"]);
      assert.ok(name, "skyveren mangler navn");
      assert.doesNotMatch(name, /\d/, `navnet «${name}» skal ikke inneholde verdien`);
      assert.match(
        decode(r["aria-valuetext"]),
        /^[−\d][\d ,]*\s\S/,
        "aria-valuetext skal ha tall og enhet",
      );
      assert.equal(Number(r.value) >= Number(r.min) && Number(r.value) <= Number(r.max), true);
      if (r["aria-describedby"])
        assert.ok(textOf(html, r["aria-describedby"]), "beskrivelsen finnes ikke");
      tidy(`${m.id} skyver`, name);
    }
  });

  test(`${m.id}: knappegrupper har navn, og valgt knapp er merket`, () => {
    const groups = tags(html, "div").filter((a) => a.role === "group");
    assert.equal(groups.length, m.groups);
    for (const g of groups) assert.ok(g["aria-label"], "gruppen mangler navn");
    const groupBlocks = [...html.matchAll(/<div[^>]*role="group"[^>]*>([\s\S]*?)<\/div>/g)].map(
      (x) => x[1],
    );
    for (const b of groupBlocks) assert.equal((b.match(/aria-pressed="true"/g) ?? []).length, 1);
  });

  test(`${m.id}: alle knapper er ekte knapper med synlig tekst, og Start er ikke en av/på-knapp`, () => {
    const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
    assert.ok(buttons.length >= 3);
    for (const [, a, inner] of buttons) {
      assert.match(a, /type="button"/);
      const text = inner.replace(/<[^>]+>/g, "").trim();
      assert.ok(text, "knapp uten tekst");
      tidy(`${m.id} knapp`, text);
      if (text === "Start" || text === "Pause") assert.doesNotMatch(a, /aria-pressed/);
    }
    assert.ok(buttons.some(([, , t]) => t.trim() === "Nullstill"));
  });

  test(`${m.id}: én statusregion, og tidslinja er ikke en live-region`, () => {
    const live = [...html.matchAll(/<[a-z]+\b[^>]*(aria-live|role="status")[^>]*>/g)].map((x) =>
      attrs(x[0]),
    );
    assert.equal(live.length, 1, "bare statusregionen skal leses opp av seg selv");
    const s = live[0];
    assert.equal(s.role, "status");
    assert.equal(s["aria-live"], "polite");
    assert.equal(s["aria-atomic"], "true");
    const text = textOf(html, s.id);
    assert.ok(text && text.endsWith("."), "statusen skal være en hel setning");
    tidy(`${m.id} status`, text);
  });
}

test("M1-status endres ved hvert faseskifte og tar med tid bare når avspillingen står", () => {
  const base = {
    stage: "etter",
    playing: false,
    time: 0,
    end: 3000,
    up: 1.8,
    down: -1.3,
    first: 0,
  };
  const steps = [
    { ...base, stage: "før" },
    { ...base, time: 0 },
    { ...base, time: 120 },
    { ...base, time: 600, first: -1 },
    { ...base, time: 600, first: 1 },
    { ...base, time: 3000, first: -1 },
  ].map(sourceStatus);
  assert.equal(new Set(steps).size, steps.length, steps.join("\n"));
  assert.equal(steps[0], "Før skjelvet. Havet er i ro.");
  assert.match(steps[1], /løftet opptil 1,8 m og senket opptil 1,3 m/);
  assert.match(steps[2], /Simulert tid 2,0 min\.$/);
  assert.match(steps[3], /Dalen har nådd kysten først/);
  assert.match(steps[5], /Avspillingen er ferdig/);
  // Under avspilling endres teksten ikke fra bilde til bilde.
  assert.equal(
    sourceStatus({ ...base, playing: true, time: 200 }),
    sourceStatus({ ...base, playing: true, time: 260 }),
  );
  assert.match(sourceStatus({ ...base, up: 0.02, down: -0.01 }), /nesten ikke løftet/);
  steps.forEach((s) => tidy("M1-status", s));
});

test("M2-status følger bølgen fra dyphavet til kysten", () => {
  const base = { playing: false, end: 18000, atCoast: false };
  const steps = [
    { ...base, time: 0, crestDepth: 4000 },
    { ...base, time: 600, crestDepth: 3900 },
    { ...base, time: 3600, crestDepth: 600 },
    { ...base, time: 5400, crestDepth: 90 },
    { ...base, time: 7200, crestDepth: 20, atCoast: true },
  ].map(shoalStatus);
  assert.equal(new Set(steps).size, steps.length, steps.join("\n"));
  assert.match(steps[0], /står klar ute på dypt hav, 4000 m dyp/);
  assert.match(steps[2], /kontinentalskråningen/);
  assert.match(steps[3], /sokkelen/);
  assert.match(steps[4], /^Bølgen har nådd kysten\. Simulert tid 2,0 t\.$/);
  assert.equal(
    shoalStatus({ ...base, playing: true, time: 700, crestDepth: 3800 }),
    shoalStatus({ ...base, playing: true, time: 900, crestDepth: 3700 }),
  );
  steps.forEach((s) => tidy("M2-status", s));
});

test("M3-status skiller tilbaketrekning, oppskylling, huset og slutten", () => {
  const base = {
    playing: false,
    end: 1200,
    reached: false,
    first: 0,
    runup: 0,
    reach: 0,
    house: 0,
  };
  const steps = [
    { ...base, time: 0 },
    { ...base, time: 60, first: -1 },
    { ...base, time: 60, first: 1 },
    { ...base, time: 300, reached: true, runup: 1.2, reach: 40 },
    { ...base, time: 400, reached: true, runup: 2.4, reach: 150, house: 0.6 },
    { ...base, time: 1200, reached: true, runup: 2.4, reach: 150, house: 0.6 },
  ].map(runupStatus);
  assert.equal(new Set(steps).size, steps.length, steps.join("\n"));
  assert.match(steps[1], /trekker seg tilbake/);
  assert.match(steps[3], /Oppskylling 1,2 m, inntrenging 40 m, vanndyp ved huset 0 m\./);
  assert.match(steps[4], /Vannet har nådd huset/);
  assert.match(steps[5], /Avspillingen er ferdig/);
  // Under avspilling leses ikke tall som endrer seg hele tiden.
  const playing = runupStatus({
    ...base,
    playing: true,
    time: 320,
    reached: true,
    runup: 1.5,
    reach: 60,
  });
  assert.doesNotMatch(playing, /\d/);
  steps.forEach((s) => tidy("M3-status", s));
});
