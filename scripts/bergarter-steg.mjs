/**
 * Steg mot bilde på /geofag-1/bergarter.
 *
 * Kjør (dev-server må svare, standard http://127.0.0.1:8080):
 *   npm run test:bergarter-steg
 *
 * Sjekker alle figurer med stegknapper. For hver figur, med og uten
 * prefers-reduced-motion: klikk på hvert steg, og avspilling der figuren
 * har Start/Pause. Valgt knapp skal stemme med det som er tegnet (synlige
 * SVG-lag og tekster), ikke bare med data-step. data-step følger samme
 * variabel som knappen, så det alene fanger ikke en forskyvning der steg N
 * tegner et annet stegs bilde.
 *
 * aria-live skal være off mens animasjonen spiller, og polite etter et
 * brukervalg. Et brukervalg skal pause avspillingen.
 *
 * Kjent feil på f38ac70. Fjern linjen i KJENT_FEIL når PR #170 er merget.
 */
const KJENT_FEIL = new Set([
  "ionbytte", // Fjern denne linjen når PR #170 er merget. IonBytte på f38ac70 viser feil bilde for valgt steg.
]);

import { existsSync } from "node:fs";
import { chromium } from "playwright";

const PAGE = "/geofag-1/bergarter";
const BASE_URL = (process.env.BASE_URL || "http://127.0.0.1:8080").replace(/\/$/, "");

const MODES = [
  { id: "reduced", label: "prefers-reduced-motion", reducedMotion: "reduce" },
  { id: "vanlig", label: "uten reduced motion", reducedMotion: "no-preference" },
];

function hasText(scene, text) {
  return scene.texts.includes(text);
}

function startsText(scene, prefix) {
  return scene.texts.some((text) => text.startsWith(prefix));
}

function near(point, x, y, radius = 36) {
  if (!point) return false;
  return Math.hypot(point.x - x, point.y - y) < radius;
}

function station(scene, name) {
  return scene.stations.find((item) => item.t === name);
}

function stationOn(scene, name) {
  const item = station(scene, name);
  return item != null && Number(item.op ?? 1) > 0.9;
}

/** @returns {string | null} feilmelding, eller null når bildet stemmer */
function expectScene(id, label, scene) {
  const checks = {
    silikater: {
      Nesosilikat: () => (scene.activePanel === "Isolert" ? null : `uthevet panel er «${scene.activePanel}», ventet Isolert`),
      Inosilikat: () => (scene.activePanel === "Kjeder" ? null : `uthevet panel er «${scene.activePanel}», ventet Kjeder`),
      Fyllosilikat: () => (scene.activePanel === "Sjikt" ? null : `uthevet panel er «${scene.activePanel}», ventet Sjikt`),
      Tektosilikat: () => (scene.activePanel === "Rammeverk" ? null : `uthevet panel er «${scene.activePanel}», ventet Rammeverk`),
    },
    avkjoling: {
      Dagbergart: () =>
        exclusive(scene, "Finkornet", ["Grovkornet", "Store krystaller", "Vulkansk glass"]),
      Dypbergart: () =>
        exclusive(scene, "Grovkornet", ["Finkornet", "Store krystaller", "Vulkansk glass"]),
      Rombeporfyr: () => {
        if (!hasText(scene, "Store krystaller") || !hasText(scene, "i finkornet grunnmasse"))
          return "linsen viser ikke store krystaller i finkornet grunnmasse";
        if (hasText(scene, "Finkornet") || hasText(scene, "Vulkansk glass") || hasText(scene, "Grovkornet"))
          return "linsen viser et annet kornbilde";
        return null;
      },
      Obsidian: () => exclusive(scene, "Vulkansk glass", ["Finkornet", "Grovkornet", "Store krystaller"]),
    },
    oslograben: {
      "1 Skorpa strekkes": () =>
        exclusive(scene, "Strekk", ["Graben (Oslo-graben)", "Sprekkevulkaner", "Larvikitt i dagen"]),
      "2 Graben synker inn": () =>
        exclusive(scene, "Graben (Oslo-graben)", ["Strekk", "Sprekkevulkaner", "Larvikitt i dagen"]),
      "3 Lava og magma": () =>
        exclusive(scene, "Sprekkevulkaner", ["Strekk", "Graben (Oslo-graben)", "Larvikitt i dagen"]),
      "4 I dag": () =>
        exclusive(scene, "Larvikitt i dagen", ["Strekk", "Graben (Oslo-graben)", "Sprekkevulkaner"]),
    },
    differensiering: {
      "Homogen smelte": () => diffStep(scene, { crystals: false, cum: "tom", melt: "homogen" }),
      "Første krystaller": () => diffStep(scene, { crystals: true, cum: "svak", melt: "homogen" }),
      "Krystallene synker": () => diffStep(scene, { crystals: true, cum: "tydelig", melt: "homogen" }),
      Restsmelte: () => diffStep(scene, { crystals: true, cum: "full", melt: "rest" }),
    },
    diagenese: {
      "Porer fulle av væske": () => diaStep(scene, { packed: false, cement: false, flow: false, kit: false }),
      Kompaksjon: () => diaStep(scene, { packed: true, cement: false, flow: false, kit: false }),
      "Væsken sirkulerer": () => diaStep(scene, { packed: true, cement: true, flow: true, kit: false }),
      Cementering: () => diaStep(scene, { packed: true, cement: true, flow: true, kit: true }),
    },
    "kontakt-regional": {
      "Magma trenger inn": () => kontaktStep(scene, { heat: false, hornfels: false, arrows: false, folio: false, fold: "flat", caption: "før" }),
      "Varme i aureolen": () => kontaktStep(scene, { heat: true, hornfels: true, arrows: false, folio: false, fold: "flat", aureole: "smal", caption: "før" }),
      "Hornfels uten foliasjon": () => kontaktStep(scene, { heat: true, hornfels: true, arrows: false, folio: false, fold: "flat", aureole: "bred", caption: "før" }),
      "Platene møtes": () => kontaktStep(scene, { heat: false, hornfels: false, arrows: true, folio: false, fold: "møtes", caption: "trykk" }),
      "Skorpa foldes": () => kontaktStep(scene, { heat: false, hornfels: false, arrows: true, folio: true, fold: "fold", caption: "trykk" }),
      Foliasjon: () => kontaktStep(scene, { heat: false, hornfels: false, arrows: true, folio: true, fold: "foliasjon", caption: "folio" }),
    },
    ionbytte: {
      "Fast gitter og væske": () => {
        if (!near(scene.orange, 200, 150)) return "oransje ion har forlatt gitteret";
        if (scene.hole) return "hullet vises før ionet skal hoppe ut";
        if (near(scene.blue, 200, 150)) return "blått ion sitter allerede i gitteret";
        if (!hasText(scene, "Opprinnelig sammensetning") || hasText(scene, "Ny sammensetning"))
          return "gitteret er merket som ny sammensetning";
        return null;
      },
      "Ion hopper ut": () => {
        if (near(scene.orange, 200, 150)) return "oransje ion sitter fortsatt i gitteret";
        if (!scene.hole) return "hullet etter ionet som hoppet ut mangler";
        if (near(scene.blue, 200, 150)) return "nytt ion har allerede tatt plassen";
        if (hasText(scene, "Ny sammensetning")) return "figuren sier ny sammensetning før ionet er inne";
        return null;
      },
      "Nytt ion går inn": () => {
        if (!near(scene.blue, 200, 150)) return "blått ion er ikke i gitteret";
        if (scene.hole) return "hullet er fortsatt åpent etter at ionet har gått inn";
        if (near(scene.orange, 200, 150)) return "oransje ion sitter fortsatt i gitteret";
        return null;
      },
      "Ny sammensetning": () => {
        if (!near(scene.blue, 200, 150)) return "blått ion er ikke i gitteret";
        if (scene.hole) return "hullet er fortsatt åpent";
        if (!hasText(scene, "Ny sammensetning")) return "figuren sier ikke ny sammensetning";
        return null;
      },
    },
    metamorfose: {
      Leirskifer: () => metaStep(scene, 0, "Sedimentære lag", ["Skifrighet", "Lav metamorfose", "Striper (bånd)"]),
      Fyllitt: () => metaStep(scene, 1, "Lav metamorfose", ["Sedimentære lag", "Striper (bånd)"]),
      Glimmerskifer: () => metaStep(scene, 2, "Skifrighet", ["Sedimentære lag", "Lav metamorfose", "Striper (bånd)"]),
      Gneis: () => metaStep(scene, 3, "Striper (bånd)", ["Sedimentære lag", "Skifrighet", "Lav metamorfose"]),
    },
    bergartssyklus: {
      Størkning: () => syklusStep(scene, { grov: true, weather: false, grains: false, compact: false, meta: false, melt: false }),
      "Heving og forvitring": () => syklusStep(scene, { grov: false, weather: true, grains: false, compact: false, meta: false, melt: false }),
      "Erosjon gir sediment": () => syklusStep(scene, { grov: false, weather: false, grains: true, compact: false, meta: false, melt: false }),
      Forsteining: () => syklusStep(scene, { grov: false, weather: false, grains: false, compact: true, meta: false, melt: false }),
      Omdanning: () => syklusStep(scene, { grov: false, weather: false, grains: false, compact: false, meta: true, melt: false }),
      Smelting: () => syklusStep(scene, { grov: false, weather: false, grains: false, compact: false, meta: false, melt: true }),
    },
    "folg-bergart": {
      "Alle veier": () => folgStep(scene, { her: null, warm: 0, dash: 0, on: ["Magma", "Magmatisk bergart", "Sediment", "Sedimentær bergart", "Metamorf bergart"], off: [] }),
      Larvikitt: () => folgStep(scene, { her: "Magmatisk bergart", warm: 1, dash: 0, on: ["Magma", "Magmatisk bergart"], off: ["Sediment", "Sedimentær bergart", "Metamorf bergart"] }),
      Rombeporfyr: () => folgStep(scene, { her: "Magmatisk bergart", warm: 1, dash: 0, on: ["Magma", "Magmatisk bergart"], off: ["Sediment", "Sedimentær bergart", "Metamorf bergart"] }),
      Grønnstein: () => folgStep(scene, { her: "Metamorf bergart", warm: 2, dash: 0, on: ["Magma", "Magmatisk bergart", "Metamorf bergart"], off: ["Sediment", "Sedimentær bergart"] }),
      Sandstein: () => folgStep(scene, { her: "Sedimentær bergart", warm: 1, dash: 0, on: ["Sediment", "Sedimentær bergart"], off: ["Magma", "Magmatisk bergart", "Metamorf bergart"] }),
      Kalkstein: () => folgStep(scene, { her: "Sedimentær bergart", warm: 1, dash: 1, on: ["Sediment", "Sedimentær bergart"], off: ["Magma", "Magmatisk bergart", "Metamorf bergart"] }),
      Fyllitt: () => folgStep(scene, { her: "Metamorf bergart", warm: 2, dash: 0, on: ["Sediment", "Leirskifer", "Metamorf bergart"], off: ["Magma", "Magmatisk bergart", "Sedimentær bergart"] }),
      Gneis: () => folgStep(scene, { her: "Metamorf bergart", warm: 2, dash: 0, on: ["Magmatisk bergart", "Sedimentær bergart", "Metamorf bergart"], off: ["Magma", "Sediment", "Leirskifer"] }),
    },
    steinlab: {
      Granitt: () => (hasText(scene, "Granitt") ? null : "håndprøven er ikke merket Granitt"),
      Basalt: () => (hasText(scene, "Basalt") ? null : "håndprøven er ikke merket Basalt"),
      Sandstein: () => (hasText(scene, "Sandstein") ? null : "håndprøven er ikke merket Sandstein"),
      Kalkstein: () => (hasText(scene, "Kalkstein") ? null : "håndprøven er ikke merket Kalkstein"),
      Marmor: () => (hasText(scene, "Marmor") ? null : "håndprøven er ikke merket Marmor"),
      Kvartsitt: () => (hasText(scene, "Kvartsitt") ? null : "håndprøven er ikke merket Kvartsitt"),
      Gneis: () => (hasText(scene, "Gneis") ? null : "håndprøven er ikke merket Gneis"),
    },
  };
  const check = checks[id]?.[label];
  if (!check) return `mangler forventning for ${id} / ${label}`;
  return check();
}

function exclusive(scene, required, forbidden) {
  if (!hasText(scene, required)) return `bildet mangler «${required}»`;
  const hit = forbidden.find((text) => hasText(scene, text));
  if (hit) return `bildet viser «${hit}», som hører til et annet steg`;
  return null;
}

function diffStep(scene, expect) {
  const crystals = scene.crystalCount > 0;
  if (crystals !== expect.crystals) return expect.crystals ? "krystallene vises ikke" : "krystaller vises i homogen smelte";
  const cum = scene.cumOpacity;
  if (expect.cum === "tom" && cum > 0.05) return `bunnlaget er synlig (opacity ${cum})`;
  if (expect.cum === "svak" && !(cum < 0.25)) return `bunnlaget er for tydelig for første krystaller (opacity ${cum})`;
  if (expect.cum === "tydelig" && !(cum > 0.25 && cum < 0.85)) return `bunnlaget har feil styrke mens krystallene synker (opacity ${cum})`;
  if (expect.cum === "full" && !(cum > 0.85)) return `bunnlaget er ikke fullt (opacity ${cum})`;
  const rest = hasText(scene, "Restsmelte, mer silisium");
  const homogen = hasText(scene, "Homogen smelte");
  if (expect.melt === "rest" && !rest) return "smelten er ikke merket som restsmelte";
  if (expect.melt === "homogen" && (!homogen || rest)) return "smelten er merket som restsmelte";
  return null;
}

function diaStep(scene, expect) {
  if (expect.packed ? !(scene.grainMean < 220) : !(scene.grainMean > 225))
    return expect.packed ? "kornene er ikke pakket tettere" : "kornene er allerede pakket";
  if ((scene.cementLines > 0) !== expect.cement) return expect.cement ? "kittstreker mangler" : "kittstreker vises for tidlig";
  if (scene.flow !== expect.flow) return expect.flow ? "sirkulasjonspilen mangler" : "sirkulasjonspilen vises for tidlig";
  const kit = hasText(scene, "Kitt fra porevæsken limer kornene");
  const pore = hasText(scene, "Blått mellom kornene er porevæske");
  if (expect.kit && !kit) return "bildet sier ikke at kittet limer kornene";
  if (!expect.kit && (kit || !pore)) return "bildet viser kitt før cementering";
  const burden = scene.burdenOpacity;
  if (!expect.packed && burden > 0.05) return "nye lag vises før kompaksjon";
  if (expect.packed && burden < 0.9) return "nye lag som presser ned mangler";
  return null;
}

function kontaktStep(scene, expect) {
  if ((scene.heatRays > 0) !== expect.heat) return expect.heat ? "varmepilene i aureolen mangler" : "varmepiler vises utenfor aureol-stegene";
  const hornfels = hasText(scene, "Hornfels · ingen foliasjon");
  if (hornfels !== expect.hornfels) return expect.hornfels ? "hornfels-teksten mangler" : "hornfels vises i feil steg";
  if ((scene.stressArrows > 0) !== expect.arrows) return expect.arrows ? "trykkpilene mangler" : "trykkpiler vises før platene møtes";
  if ((scene.folioLines > 0) !== expect.folio) return expect.folio ? "foliasjonsstrekene mangler" : "foliasjonsstreker vises for tidlig";
  const y = scene.foldY;
  const foldOk =
    (expect.fold === "flat" && y > 155 && y < 170) ||
    (expect.fold === "møtes" && y > 135 && y < 150) ||
    (expect.fold === "fold" && y > 105 && y < 120) ||
    (expect.fold === "foliasjon" && y > 90 && y < 105);
  if (!foldOk) return `folden har feil høyde for steget (y=${y})`;
  if (expect.aureole === "smal" && !(scene.aureole > 20 && scene.aureole < 40))
    return `aureolen er ikke den smale sonen (stroke ${scene.aureole})`;
  if (expect.aureole === "bred" && !(scene.aureole > 40)) return `aureolen er ikke full (stroke ${scene.aureole})`;
  if (expect.caption === "før" && !hasText(scene, "Før kollisjonen")) return "høyre panel sier ikke «Før kollisjonen»";
  if (expect.caption === "trykk" && !hasText(scene, "Rettet trykk fra kollisjonen")) return "høyre panel viser ikke rettet trykk";
  if (expect.caption === "folio" && !startsText(scene, "Foliasjon")) return "høyre panel viser ikke foliasjon";
  if (expect.caption !== "folio" && startsText(scene, "Foliasjon")) return "foliasjonsteksten vises for tidlig";
  return null;
}

function metaStep(scene, index, required, forbidden) {
  const layers = [scene.layerLeir, scene.layerFyll, scene.layerGlim, scene.layerGneis].map(Number);
  if (layers[index] !== 1) return `prøvelag ${index + 1} er ikke det synlige (opacity ${layers.join(", ")})`;
  if (layers.some((value, i) => i !== index && value !== 0)) return `flere prøvelag er synlige samtidig (${layers.join(", ")})`;
  return exclusive(scene, required, forbidden);
}

function syklusStep(scene, expect) {
  if (hasText(scene, "Grovkornet") !== expect.grov) return expect.grov ? "grovkornet/finkornet-linsene mangler" : "størkningslinsene vises i et senere steg";
  if (scene.weather !== expect.weather) return expect.weather ? "forvitringen på fjellet mangler" : "forvitringspilene vises i feil steg";
  if ((scene.grains > 0) !== expect.grains) return expect.grains ? "sedimentkornene i elva mangler" : "sedimentkorn vises i feil steg";
  if (scene.compact !== expect.compact) return expect.compact ? "sammenpressingen av sedimentet mangler" : "sammenpressingspilene vises i feil steg";
  if (scene.metaArrows !== expect.meta) return expect.meta ? "omdanningspilene mangler" : "omdanningspilene vises i feil steg";
  if (hasText(scene, "Berget smelter") !== expect.melt) return expect.melt ? "smeltingen mangler" : "smeltingen vises før siste steg";
  return null;
}

function folgStep(scene, expect) {
  if (scene.her !== expect.her) return `sluttstasjonen er «${scene.her ?? "ingen"}», ventet «${expect.her ?? "ingen"}»`;
  if (scene.warmEdges !== expect.warm) return `${scene.warmEdges} uthevede veier, ventet ${expect.warm}`;
  if (scene.dashedEdges !== expect.dash) return `${scene.dashedEdges} stiplede veier, ventet ${expect.dash}`;
  for (const name of expect.on) if (!stationOn(scene, name)) return `stasjonen «${name}» er ikke med på ruten`;
  for (const name of expect.off) if (stationOn(scene, name)) return `stasjonen «${name}» er med på ruten`;
  return null;
}

function stepAttr(id, index) {
  if (id === "folg-bergart") return String(index - 1);
  if (id === "steinlab") return `${index}-1-1`;
  return String(index);
}

const MODELS = [
  { id: "silikater", group: "Velg gruppe", play: false, steps: ["Nesosilikat", "Inosilikat", "Fyllosilikat", "Tektosilikat"] },
  { id: "steinlab", group: "Velg håndprøve", play: true, steps: ["Granitt", "Basalt", "Sandstein", "Kalkstein", "Marmor", "Kvartsitt", "Gneis"] },
  { id: "avkjoling", group: "Velg bergart", play: true, steps: ["Dagbergart", "Dypbergart", "Rombeporfyr", "Obsidian"] },
  { id: "oslograben", group: "Velg steg", play: true, steps: ["1 Skorpa strekkes", "2 Graben synker inn", "3 Lava og magma", "4 I dag"] },
  { id: "differensiering", group: "Velg steg", play: true, steps: ["Homogen smelte", "Første krystaller", "Krystallene synker", "Restsmelte"] },
  { id: "diagenese", group: "Velg steg", play: true, steps: ["Porer fulle av væske", "Kompaksjon", "Væsken sirkulerer", "Cementering"] },
  {
    id: "kontakt-regional",
    group: "Velg prosess",
    play: true,
    steps: ["Magma trenger inn", "Varme i aureolen", "Hornfels uten foliasjon", "Platene møtes", "Skorpa foldes", "Foliasjon"],
  },
  { id: "ionbytte", group: "Velg steg", play: true, steps: ["Fast gitter og væske", "Ion hopper ut", "Nytt ion går inn", "Ny sammensetning"] },
  { id: "metamorfose", group: "Velg bergart", play: true, steps: ["Leirskifer", "Fyllitt", "Glimmerskifer", "Gneis"] },
  {
    id: "bergartssyklus",
    group: "Velg prosess",
    play: true,
    steps: ["Størkning", "Heving og forvitring", "Erosjon gir sediment", "Forsteining", "Omdanning", "Smelting"],
  },
  {
    id: "folg-bergart",
    group: "Velg bergart",
    play: true,
    steps: ["Alle veier", "Larvikitt", "Rombeporfyr", "Grønnstein", "Sandstein", "Kalkstein", "Fyllitt", "Gneis"],
  },
];

function readScene(figur) {
  const root = document.querySelector(`[data-figur="${figur}"]`);
  if (!root) return null;
  const svg = root.closest("svg");
  const figure = root.closest("figure");
  const texts = [...svg.querySelectorAll("text")]
    .map((node) => node.textContent.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const play = [...figure.querySelectorAll("button")].find((button) =>
    (button.getAttribute("aria-label") || "").includes("animasjon"),
  );
  const live = figure.querySelector("[aria-live]");
  const pressed = [...figure.querySelectorAll("button[aria-pressed='true']")].map((button) =>
    button.textContent.trim(),
  );
  const polys = [...svg.querySelectorAll("polygon")];
  const cum = [...svg.querySelectorAll("path")].find((path) => (path.getAttribute("fill") || "").toLowerCase() === "#3e4a43");
  const circles = [...svg.querySelectorAll("circle")];
  const grainCircles = circles.filter((circle) => (circle.getAttribute("fill") || "").toLowerCase() !== "#e8a04a" && (circle.getAttribute("fill") || "").toLowerCase() !== "#6ea4bc");
  const grainMean = grainCircles.length
    ? grainCircles.reduce((sum, circle) => sum + Number(circle.getAttribute("cx")), 0) / grainCircles.length
    : null;
  const burden = [...svg.querySelectorAll("text")].find((node) => node.textContent.includes("Nye lag"));
  const ion = (fill) =>
    circles
      .filter((circle) => (circle.getAttribute("fill") || "").toLowerCase() === fill && Number(circle.getAttribute("r")) > 12)
      .map((circle) => ({ x: Number(circle.getAttribute("cx")), y: Number(circle.getAttribute("cy")) }))[0] || null;
  const hole = circles.some(
    (circle) => (circle.getAttribute("stroke") || "").toLowerCase() === "#e8a04a" && (circle.getAttribute("fill") || "none") === "none",
  );
  const layerOp = (fill) => {
    const rect = [...svg.querySelectorAll("rect")].find((node) => (node.getAttribute("fill") || "").toLowerCase() === fill);
    const raw = rect?.parentElement?.getAttribute("opacity");
    return raw == null || raw === "" ? null : Number(raw);
  };
  const gneis = [...svg.querySelectorAll("rect")].find((node) => (node.getAttribute("fill") || "").toLowerCase() === "#6f6c60")
    ?.parentElement?.nextElementSibling;
  const fold = [...svg.querySelectorAll("path")].map((path) => path.getAttribute("d") || "").find((d) => d.includes("264 "));
  const foldMatch = fold ? fold.match(/264 (\d+\.?\d*)/) : null;
  const aureole = [...svg.querySelectorAll("path")].find((path) => (path.getAttribute("stroke") || "").toLowerCase() === "#a35a32");
  const activeRect = [...svg.querySelectorAll("rect")].find((node) => (node.getAttribute("stroke") || "").toLowerCase() === "#e0b48a" && Number(node.getAttribute("stroke-width")) >= 2.5);
  const activePanel = activeRect
    ? [...activeRect.parentElement.querySelectorAll("text")].map((node) => node.textContent.trim()).find(Boolean)
    : null;
  const her = svg.querySelector("[data-stasjon='her']");
  return {
    step: root.getAttribute("data-step"),
    live: live ? live.getAttribute("aria-live") : null,
    playing: play ? (play.getAttribute("aria-label") || "").startsWith("Pause") : false,
    hasPlay: Boolean(play),
    pressed,
    texts,
    activePanel: activePanel || null,
    crystalCount: polys.filter((node) => Number(node.getAttribute("opacity") || "1") > 0.5).length,
    cumOpacity: cum ? Number(cum.getAttribute("opacity") || "1") : 0,
    grainMean,
    cementLines: [...svg.querySelectorAll("line")].filter((line) => (line.getAttribute("stroke") || "").toLowerCase() === "#b8862f").length,
    flow: [...svg.querySelectorAll("path")].some((path) => path.getAttribute("stroke-dasharray") === "8 8"),
    burdenOpacity: burden ? Number(burden.getAttribute("opacity") ?? "1") : 0,
    orange: ion("#e8a04a"),
    blue: ion("#6ea4bc"),
    hole,
    heatRays: [...svg.querySelectorAll("path")].filter((path) => (path.getAttribute("d") || "").includes("M290 185")).length,
    stressArrows: [...svg.querySelectorAll("path")].filter(
      (path) => (path.getAttribute("stroke") || "").toLowerCase() === "#5fa6c8" && (path.getAttribute("d") || "").includes("220"),
    ).length,
    folioLines: [...svg.querySelectorAll("line")].filter((line) => (line.getAttribute("stroke") || "").toLowerCase() === "#9b8aa0").length,
    aureole: aureole ? Number(aureole.getAttribute("stroke-width")) : 0,
    foldY: foldMatch ? Number(foldMatch[1]) : null,
    layerLeir: layerOp("#56535a"),
    layerFyll: layerOp("#4d525d"),
    layerGlim: layerOp("#6f6c60"),
    layerGneis: gneis ? Number(gneis.getAttribute("opacity") ?? "1") : null,
    grains: circles.filter((circle) => (circle.getAttribute("fill") || "").toLowerCase() === "#d8c79c").length,
    weather: [...svg.querySelectorAll("path")].some((path) => (path.getAttribute("d") || "").includes("M210 470")),
    compact: [...svg.querySelectorAll("path")].some((path) => (path.getAttribute("d") || "").includes("M600 250")),
    metaArrows: [...svg.querySelectorAll("path")].some((path) => (path.getAttribute("d") || "") === "M300 300 L300 360"),
    her: her?.querySelector("text")?.textContent?.trim() || null,
    warmEdges: [...svg.querySelectorAll("path")].filter(
      (path) => Number(path.getAttribute("stroke-width")) > 4 && (path.getAttribute("stroke") || "").toLowerCase() === "#e0b48a",
    ).length,
    dashedEdges: [...svg.querySelectorAll("path")].filter((path) => path.getAttribute("stroke-dasharray") === "8 7").length,
    stations: [...svg.querySelectorAll("text[data-label]")].map((node) => ({
      t: node.textContent.trim(),
      op: node.parentElement.getAttribute("opacity"),
    })),
  };
}

function chromeExecutable() {
  const fromEnv = process.env.CHROME_PATH?.trim() || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?.trim();
  if (fromEnv) return fromEnv;
  if (existsSync("/usr/bin/google-chrome")) return "/usr/bin/google-chrome";
  return undefined;
}

function push(issues, issue) {
  issues.push(issue);
}

async function settle(page, figur, label, step) {
  await page.waitForFunction(
    ({ figur: id, label: name, step: wanted }) => {
      const root = document.querySelector(`[data-figur="${id}"]`);
      if (!root || root.getAttribute("data-step") !== wanted) return false;
      const figure = root.closest("figure");
      return [...figure.querySelectorAll("button")].some(
        (button) => button.textContent.trim() === name && button.getAttribute("aria-pressed") === "true",
      );
    },
    { figur, label, step },
    { timeout: 5000 },
  );
}

async function clickLabel(page, figur, group, label) {
  const button = page
    .locator(`figure:has([data-figur="${figur}"]) [role="group"][aria-label^="${group}"]`)
    .getByRole("button", { name: label, exact: true });
  await button.scrollIntoViewIfNeeded();
  await button.click();
}

async function read(page, figur) {
  return page.evaluate(readScene, figur);
}

async function checkClick(page, model, label, index, mode, issues) {
  await clickLabel(page, model.id, model.group, label);
  const wanted = stepAttr(model.id, index);
  await settle(page, model.id, label, wanted);
  const scene = await read(page, model.id);
  if (!scene.pressed.includes(label)) {
    push(issues, { model: model.id, mode, kind: "knapp", detail: `${label}: aria-pressed mangler` });
  }
  if (scene.step !== wanted) {
    push(issues, { model: model.id, mode, kind: "knapp", detail: `${label}: data-step er ${scene.step}, ventet ${wanted}` });
  }
  if (model.play) {
    if (scene.playing) push(issues, { model: model.id, mode, kind: "pause", detail: `${label}: avspillingen fortsatte etter brukervalg` });
    if (scene.live !== "polite") push(issues, { model: model.id, mode, kind: "live", detail: `${label}: aria-live er «${scene.live}», ventet polite` });
  }
  const image = expectScene(model.id, label, scene);
  if (image) push(issues, { model: model.id, mode, kind: "bilde", detail: `${label}: ${image}` });
}

async function checkPlayback(page, model, mode, issues) {
  if (!model.play) return;
  const first = model.steps[0];
  const last = model.steps[model.steps.length - 1];
  await clickLabel(page, model.id, model.group, first);
  await settle(page, model.id, first, stepAttr(model.id, 1));
  const play = page.locator(`figure:has([data-figur="${model.id}"]) button[aria-label^="Start animasjon"]`).first();
  await play.scrollIntoViewIfNeeded();
  await play.click();
  await page.waitForFunction(
    (id) => {
      const root = document.querySelector(`[data-figur="${id}"]`);
      const figure = root?.closest("figure");
      const button = [...(figure?.querySelectorAll("button") || [])].find((item) =>
        (item.getAttribute("aria-label") || "").startsWith("Pause"),
      );
      const live = figure?.querySelector("[aria-live]")?.getAttribute("aria-live");
      return Boolean(button) && live === "off";
    },
    model.id,
    { timeout: 5000 },
  );
  const playing = await read(page, model.id);
  if (!playing.playing) push(issues, { model: model.id, mode, kind: "avspilling", detail: "Start satte ikke figuren i avspilling" });
  if (playing.live !== "off") push(issues, { model: model.id, mode, kind: "live", detail: `aria-live er «${playing.live}» under avspilling, ventet off` });
  if (!playing.pressed.includes(first)) {
    push(issues, { model: model.id, mode, kind: "avspilling", detail: `avspillingen byttet steg med en gang (valgt ${playing.pressed.join(", ")})` });
  }
  const during = expectScene(model.id, first, playing);
  if (during) push(issues, { model: model.id, mode, kind: "bilde", detail: `${first} under avspilling: ${during}` });

  await clickLabel(page, model.id, model.group, last);
  await settle(page, model.id, last, stepAttr(model.id, model.steps.length));
  const paused = await read(page, model.id);
  if (paused.playing) push(issues, { model: model.id, mode, kind: "pause", detail: `${last}: brukervalg pauset ikke avspillingen` });
  if (paused.live !== "polite") push(issues, { model: model.id, mode, kind: "live", detail: `${last}: aria-live er «${paused.live}» etter brukervalg, ventet polite` });
  const after = expectScene(model.id, last, paused);
  if (after) push(issues, { model: model.id, mode, kind: "bilde", detail: `${last} etter brukervalg: ${after}` });
}

async function checkSteinlabTools(page, mode, issues) {
  const model = { id: "steinlab" };
  await clickLabel(page, "steinlab", "Velg håndprøve", "Kalkstein");
  await clickLabel(page, "steinlab", "Velg test", "Lupe");
  await settle(page, "steinlab", "Kalkstein", "4-1-1");
  let scene = await read(page, "steinlab");
  if (!hasText(scene, "Lupe, 6–10 ganger")) {
    push(issues, { model: model.id, mode, kind: "bilde", detail: "Lupe: nærbildet er ikke merket som lupe" });
  }
  await clickLabel(page, "steinlab", "Velg test", "Syretest");
  await page.waitForFunction(
    () => document.querySelector('[data-figur="steinlab"]')?.getAttribute("data-step") === "4-3-1",
    null,
    { timeout: 5000 },
  );
  scene = await read(page, "steinlab");
  if (!hasText(scene, "Bruser") || !hasText(scene, "Fortynnet saltsyre")) {
    push(issues, { model: model.id, mode, kind: "bilde", detail: "Syretest på kalkstein viser ikke brusing" });
  }
  if (scene.playing) push(issues, { model: model.id, mode, kind: "pause", detail: "Syretest: brukervalg pauset ikke" });
  if (scene.live !== "polite") push(issues, { model: model.id, mode, kind: "live", detail: "Syretest: aria-live er ikke polite" });
  await clickLabel(page, "steinlab", "Velg håndprøve", "Granitt");
  await page.waitForFunction(
    () => document.querySelector('[data-figur="steinlab"]')?.getAttribute("data-step") === "1-3-1",
    null,
    { timeout: 5000 },
  );
  scene = await read(page, "steinlab");
  if (!hasText(scene, "Ingen reaksjon") || !hasText(scene, "Granitt")) {
    push(issues, { model: model.id, mode, kind: "bilde", detail: "Syretest på granitt viser ikke «Ingen reaksjon»" });
  }
  await clickLabel(page, "steinlab", "Velg test", "Lupe");
}

async function runMode(browser, mode) {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: mode.reducedMotion,
  });
  page.setDefaultTimeout(20000);
  const issues = [];
  try {
    await page.goto(`${BASE_URL}${PAGE}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(
      (count) => document.querySelectorAll("[data-figur]").length >= count,
      MODELS.length,
      { timeout: 30000 },
    );
    if (mode.reducedMotion === "reduce") {
      await page.waitForFunction(
        () => [...document.querySelectorAll("button")].some((button) => (button.getAttribute("aria-label") || "").startsWith("Start animasjon")),
        null,
        { timeout: 15000 },
      );
    }
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        const position = getComputedStyle(el).position;
        if (position === "sticky" || position === "fixed") el.style.setProperty("display", "none", "important");
      }
    });
    const present = await page.evaluate(() => [...document.querySelectorAll("[data-figur]")].map((node) => node.getAttribute("data-figur")));
    for (const model of MODELS) {
      if (!present.includes(model.id)) {
        push(issues, { model: model.id, mode: mode.id, kind: "mangler", detail: "figuren er ikke på siden" });
      }
    }
    for (const model of MODELS) {
      if (!present.includes(model.id)) continue;
      const root = page.locator(`[data-figur="${model.id}"]`).first();
      await root.scrollIntoViewIfNeeded();
      const initial = await read(page, model.id);
      if (model.play) {
        if (mode.reducedMotion === "reduce") {
          if (initial.playing) push(issues, { model: model.id, mode: mode.id, kind: "reduced", detail: "starter i avspilling selv om bevegelse er redusert" });
          if (initial.live !== "polite") push(issues, { model: model.id, mode: mode.id, kind: "live", detail: `aria-live er «${initial.live}» når figuren starter pauset` });
        } else if (!initial.playing) {
          push(issues, { model: model.id, mode: mode.id, kind: "avspilling", detail: "starter pauset uten reduced motion" });
        } else if (initial.live !== "off") {
          push(issues, { model: model.id, mode: mode.id, kind: "live", detail: `aria-live er «${initial.live}» mens figuren spiller ved start` });
        }
      } else if (initial.hasPlay) {
        push(issues, { model: model.id, mode: mode.id, kind: "avspilling", detail: "ventet ingen avspilling" });
      } else if (initial.live !== "polite") {
        push(issues, { model: model.id, mode: mode.id, kind: "live", detail: `aria-live er «${initial.live}» uten avspilling` });
      }
      for (let i = 0; i < model.steps.length; i += 1) {
        await checkClick(page, model, model.steps[i], i + 1, mode.id, issues);
      }
      await checkPlayback(page, model, mode.id, issues);
      if (model.id === "steinlab") await checkSteinlabTools(page, mode.id, issues);
    }
  } finally {
    await page.close();
  }
  return issues;
}

function outcome(modelId, issues) {
  const mine = issues.filter((issue) => issue.model === modelId);
  const other = mine.filter((issue) => issue.kind !== "bilde");
  const images = mine.filter((issue) => issue.kind === "bilde");
  if (other.length) return "feil";
  if (images.length && KJENT_FEIL.has(modelId)) return "kjent feil";
  if (images.length) return "feil";
  return "bestått";
}

function report(issues) {
  const lines = [];
  lines.push(`Steg mot bilde: ${BASE_URL}${PAGE}`);
  lines.push("Modeller med stegknapper. Bilde = synlige SVG-lag/tekster for valgt steg. Avspilling der figuren har Start/Pause.");
  lines.push("");
  const header = `${"modell".padEnd(20)} ${"reduced".padEnd(16)} vanlig`;
  lines.push(header);
  for (const model of MODELS) {
    const reduced = outcome(model.id, issues.filter((issue) => issue.mode === "reduced"));
    const vanlig = outcome(model.id, issues.filter((issue) => issue.mode === "vanlig"));
    const note = model.play ? "" : " (ingen avspilling)";
    lines.push(`${model.id.padEnd(20)} ${reduced.padEnd(16)} ${vanlig}${note}`);
  }
  const details = issues.filter((issue) => outcome(issue.model, issues) !== "bestått");
  if (details.length) {
    lines.push("");
    lines.push("Detaljer");
    for (const issue of details) {
      const tag = KJENT_FEIL.has(issue.model) && issue.kind === "bilde" ? "kjent feil" : "feil";
      lines.push(`- [${tag}] ${issue.model} / ${issue.mode} / ${issue.kind}: ${issue.detail}`);
    }
  }
  if (KJENT_FEIL.size) {
    lines.push("");
    lines.push("Kjent feil som skal fjernes når PR #170 er merget: " + [...KJENT_FEIL].join(", "));
  }
  return lines.join("\n");
}

async function main() {
  const executablePath = chromeExecutable();
  const browser = await chromium.launch({
    ...(executablePath ? { executablePath } : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const issues = [];
  try {
    for (const mode of MODES) {
      process.stderr.write(`\n${mode.label}\n`);
      const found = await runMode(browser, mode);
      issues.push(...found);
      process.stderr.write(`  avvik ${found.length}\n`);
    }
  } finally {
    await browser.close();
  }
  const text = report(issues);
  console.log(`\n${text}\n`);
  const failed = MODELS.some((model) => outcome(model.id, issues) === "feil");
  if (failed) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
