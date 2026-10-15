// Samme kriterier som scripts/bergarter-steg.mjs (PR #173), tilpasset ny Diagenese (#174) og KontaktRegional v2 med faner.
// Bilde-sjekken leser data-tilstand / data-p (sluttbildet for valgt steg) og synlige etiketter.
import { chromium } from "playwright";
const BASE = (process.env.BASE_URL || "http://127.0.0.1:8094").replace(/\/$/, "");
const MODES = [{ id: "reduced", rm: "reduce" }, { id: "vanlig", rm: "no-preference" }];
const K = [
  { mag: 1, aur: 0, heat: 0, rc: 0, hf: 0, tekst: "Magma trenger inn", ikke: ["Kontaktaureole", "Hornfels"] },
  { mag: 1, aur: 1, rc: 0, hf: 0, tekst: "Kontaktaureole", ikke: ["Hornfels", "Lagene ligger flate"] },
  { mag: 1, aur: 1, rc: 0.7, hf: 0, tekst: "Ny bergart i fast tilstand", ikke: ["Hornfels"] },
  { mag: 1, aur: 1, rc: 1, hf: 1, tekst: "Hornfels", ikke: ["Ny bergart i fast tilstand"] },
];
const R = [
  { pr: 1, d: 0, f: 0.12, fol: 0, prod: 0, tekst: "Rettet trykk", ikke: ["Bergflak skyves over", "Lagene foldes"] },
  { pr: 1, d: 1, f: 0.25, fol: 0, prod: 0, tekst: "Bergflak skyves over", ikke: ["Lagene foldes"] },
  { pr: 1, d: 1, f: 1, fol: 0, prod: 0, tekst: "Lagene foldes", ikke: ["Foliasjon på tvers av trykket"] },
  { pr: 1, d: 1, f: 1, fol: 1, prod: 0, tekst: "Foliasjon på tvers av trykket", ikke: ["Fyllitt: små korn, tydelig skifrighet"] },
  { pr: 1, d: 1, f: 1, fol: 1, prod: 1, tekst: "Fyllitt: små korn, tydelig skifrighet", ikke: ["Glimmer"] },
];
const D = [
  { nuc: 0, sink: 0, cum: 0, rest: 0, tekst: "Smelte", ikke: ["Olivin og pyroksen krystalliserer først", "Mørk kumulasjon"] },
  { nuc: 1, sink: 0, cum: 0, rest: 0, tekst: "Olivin og pyroksen krystalliserer først", ikke: ["Krystallene synker", "Mørk kumulasjon"] },
  { nuc: 1, sink: 0.55, cum: 0.1, rest: 0.1, tekst: "Krystallene synker", ikke: ["Mørk kumulasjon", "Lysere restsmelte"] },
  { nuc: 1, sink: 1, cum: 1, rest: 0.35, tekst: "Mørk kumulasjon", ikke: ["Lysere restsmelte", "Krystallene synker"] },
  { nuc: 1, sink: 1, cum: 1, rest: 1, tekst: "Lysere restsmelte", ikke: ["Krystallene synker", "Olivin og pyroksen krystalliserer først"] },
];
const I = [
  { ut: 0, inn: 0, bort: 0, fler: 0, byttet: 0, tekst: "Fast gitter: rader av atomer", ikke: ["Ion hopper ut", "Et annet ion tar plassen"] },
  { ut: 1, inn: 0, bort: 0, fler: 0, byttet: 0, tekst: "Ion hopper ut", ikke: ["Et annet ion tar plassen"] },
  { ut: 1, inn: 1, bort: 0.15, fler: 0, byttet: 1, tekst: "Et annet ion tar plassen", ikke: ["Ion hopper ut", "Væsken frakter ionet bort"] },
  { ut: 1, inn: 1, bort: 1, fler: 0.35, tekst: "Væsken frakter ionet bort", ikke: ["Et annet ion tar plassen", "Ny sammensetning"] },
  { ut: 1, inn: 1, bort: 1, fler: 1, byttet: 11, tekst: "Ny sammensetning", ikke: ["Væsken frakter ionet bort"] },
];
const IU = [
  { ut: 0, inn: 0, byttet: 0, vaeske: 0, tekst: "Korngrense uten væske", ikke: ["Ion hopper ut"] },
  { ut: 0, inn: 0, byttet: 0, vaeske: 0, tekst: "Ionet blir sittende", ikke: ["Ion hopper ut"] },
  { ut: 0, inn: 0, byttet: 0, vaeske: 0, tekst: "Ionet blir sittende", ikke: ["Et annet ion tar plassen"] },
  { ut: 0, inn: 0, byttet: 0, vaeske: 0, tekst: "Ionet blir sittende", ikke: ["Væsken frakter ionet bort"] },
  { ut: 0, inn: 0, byttet: 0, vaeske: 0, tekst: "Korngrense uten væske", ikke: ["Ny sammensetning"] },
];
const MODELS = [
  { navn: "differensiering (ny)", id: "differensiering", steps: ["Smelte", "Første krystaller", "Krystallene synker", "Mørkt bunnlag", "Lysere restsmelte"], bilder: D },
  { navn: "ionbytte (ny)", id: "ionbytte", steps: ["Fast gitter og væskefilm", "Ion hopper ut", "Nytt ion tar plassen", "Væsken frakter ionet bort", "Ny sammensetning"], bilder: I },
  { navn: "ionbytte uten væske", id: "ionbytte", bryter: ["Væske", 1], steps: ["Fast gitter og væskefilm", "Ion hopper ut", "Nytt ion tar plassen", "Væsken frakter ionet bort", "Ny sammensetning"], bilder: IU },
  { navn: "kontakt-regional / kontakt", id: "kontakt-regional", fane: "Kontaktmetamorfose", steps: ["Magma trenger inn", "Varmen sprer seg", "Omdanning i fast tilstand", "Hornfels"], bilder: K },
  { navn: "kontakt-regional / regional", id: "kontakt-regional", fane: "Regional metamorfose", steps: ["Platene presses sammen", "Presses dypt ned", "Bergartene foldes", "Glimmer legger seg på tvers", "Fyllitt og gneis"], bilder: R },
  { navn: "diagenese (#174)", id: "diagenese", steps: ["Løs sand", "Nye lag oppå", "Kompaksjon", "Varm væske sirkulerer", "Cementering"] },
];
function scene(id) {
  const root = document.querySelector(`[data-figur="${id}"]`);
  const fig = root.closest("figure");
  const play = [...fig.querySelectorAll("button")].find((b) => (b.getAttribute("aria-label") || "").includes("animasjon"));
  const narrow = [...fig.querySelectorAll("li, p, span")].map((n) => n.textContent.trim());
  return {
    step: root.getAttribute("data-step"),
    p: Number(root.getAttribute("data-p")),
    tilstand: root.getAttribute("data-tilstand"),
    live: fig.querySelector("[aria-live]")?.getAttribute("aria-live"),
    status: fig.querySelector("[aria-live]")?.textContent.trim(),
    playing: (play?.getAttribute("aria-label") || "").startsWith("Pause"),
    pressed: [...fig.querySelectorAll('[role=group][aria-label^="Velg steg"] button[aria-pressed="true"]')].map((b) => b.textContent.trim()),
    texts: [...root.closest("svg").querySelectorAll("text")].map((t) => t.textContent.replace(/\s+/g, " ").trim()).concat(narrow),
  };
}
function bilde(model, idx, s) {
  if (Math.abs(s.p - (idx + 1)) > 0.01 && !s.playing) return `p=${s.p}, ventet ${idx + 1}`;
  if (!model.bilder) return null;
  const want = model.bilder[idx];
  const got = Object.fromEntries(s.tilstand.split(" ").map((kv) => kv.split("=")).map(([k, v]) => [k, Number(v)]));
  for (const [k, v] of Object.entries(want)) if (typeof v === "number" && Math.abs(got[k] - v) > 0.02) return `${k}=${got[k]}, ventet ${v}`;
  if (!s.texts.some((t) => t.startsWith(want.tekst))) return `mangler «${want.tekst}»`;
  const feil = want.ikke.find((t) => s.texts.some((x) => x === t));
  if (feil) return `viser «${feil}» som hører til et annet steg`;
  return null;
}
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
const issues = [];
for (const mode of MODES) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: mode.rm });
  await page.goto(`${BASE}/geofag-1/bergarter`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector('[data-figur="kontakt-regional"]');
  await page.waitForTimeout(1500);
  for (const model of MODELS) {
    const add = (kind, detail) => issues.push({ model: model.navn, mode: mode.id, kind, detail });
    const fig = page.locator(`figure:has([data-figur="${model.id}"])`).first();
    await fig.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const bryter = fig.locator('[role=group][aria-label^="Væske"] button');
    if (model.id === "ionbytte") {
      await bryter.nth(model.bryter ? model.bryter[1] : 0).click();
      await page.waitForTimeout(200);
    }
    if (model.fane) {
      await fig.locator('[role=group][aria-label^="Velg prosess"] button', { hasText: model.fane }).click();
      await page.waitForTimeout(300);
    }
    const init = await page.evaluate(scene, model.id);
    if (mode.rm === "reduce" && (init.playing || init.live !== "polite")) add("reduced", `starter playing=${init.playing} live=${init.live}`);
    // samme figur som forrige modell (delt side): startsjekken gjelder bare første besøk
    if (!model.bryter && mode.rm !== "reduce" && (!init.playing || init.live !== "off")) add("avspilling", `starter playing=${init.playing} live=${init.live}`);
    const steps = fig.locator('[role=group][aria-label^="Velg steg"] button');
    for (let i = 0; i < model.steps.length; i++) {
      await steps.nth(i).click();
      await page.waitForTimeout(250);
      const s = await page.evaluate(scene, model.id);
      if (!s.pressed.includes(model.steps[i])) add("knapp", `${model.steps[i]}: aria-pressed mangler`);
      if (s.step !== String(i + 1)) add("knapp", `${model.steps[i]}: data-step ${s.step}`);
      if (s.playing) add("pause", `${model.steps[i]}: spiller fortsatt`);
      if (s.live !== "polite") add("live", `${model.steps[i]}: live=${s.live}`);
      const b = bilde(model, i, s);
      if (b) add("bilde", `${model.steps[i]}: ${b}`);
    }
    // avspilling
    await steps.nth(0).click();
    await page.waitForTimeout(200);
    await fig.locator('button[aria-label^="Start animasjon"]').first().click();
    await page.waitForTimeout(300);
    const pl = await page.evaluate(scene, model.id);
    if (!pl.playing) add("avspilling", "Start satte ikke i gang");
    if (pl.live !== "off") add("live", `under avspilling live=${pl.live}`);
    if (!pl.pressed.includes(model.steps[0])) add("avspilling", `byttet steg med en gang (${pl.pressed})`);
    await steps.nth(model.steps.length - 1).click();
    await page.waitForTimeout(250);
    const pa = await page.evaluate(scene, model.id);
    if (pa.playing) add("pause", "brukervalg pauset ikke");
    if (pa.live !== "polite") add("live", `etter brukervalg live=${pa.live}`);
    const b = bilde(model, model.steps.length - 1, pa);
    if (b) add("bilde", `siste steg etter brukervalg: ${b}`);
    // la figuren stå som før for neste modus
  }
  await page.close();
}
await browser.close();
const lines = ["Stegtest (kriterier fra #173) for nye figurer:", ""];
for (const model of MODELS)
  lines.push(`${model.navn.padEnd(30)} ${MODES.map((m) => (issues.some((x) => x.model === model.navn && x.mode === m.id) ? `${m.id}: FEIL` : `${m.id}: bestått`)).join("   ")}`);
for (const x of issues) lines.push(`- ${x.model} / ${x.mode} / ${x.kind}: ${x.detail}`);
console.log(lines.join("\n"));
process.exit(issues.length ? 1 : 0);
