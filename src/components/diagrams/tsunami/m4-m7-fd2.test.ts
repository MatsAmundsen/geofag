import { readFileSync } from "node:fs";
import {
  advanceFjordPlayback,
  nextFjordStep,
  FJORD_FRAMES_PER_UNIT,
  FJORD_END,
  fjordWaveParts,
  townGlyphLayout,
} from "./sim/fjord";
import { oceanPanelLayout } from "./sim/oceanmap";
import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  connectedWet,
  fjordBed,
  fjordStage,
  fjordWave,
  slideOutline,
  townHeight,
  townScenario,
  TOWN_N,
} from "./sim/fjord";
import {
  cellGeo,
  covered,
  geoCell,
  greatCircle,
  IDEAL_DEPTH,
  landMask,
  makeOcean,
  travelTimes,
  waterNeighbours,
  type GeoGrid,
} from "./sim/oceanmap";
import { WARNING_STAGES } from "./m6-warning";
import { TOWN_SITES } from "./m7-risk";
import { nb } from "./util";
import {
  marchingContours,
  smoothOceanContours,
  oceanSegment,
  contourLabels,
  boxesOverlap,
} from "./sim/oceanmap";
import { formatLongitude } from "./sim/oceanmap";
import {
  FJORD_CONTACT,
  FJORD_RIGHT_SHORE,
  FJORD_PULSE_HALF_SUPPORT,
  fjordPulseCenter,
} from "./sim/fjord";
import { ModelFjord } from "./m4-fjord";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const grid: GeoGrid = { nx: 9, ny: 7, lon0: 0, lon1: 9, lat0: 0, lat1: 7 };
test("spherical metres and speed units, including date line", () => {
  assert.ok(Math.abs(greatCircle([0, 0], [1, 0]) - 111195.08) < 1);
  assert.ok(Math.abs(greatCircle([0, 60], [1, 60]) - 55597) < 5);
  assert.ok(Math.abs(greatCircle([179, 0], [-179, 0]) - 222390.16) < 1);
  const land = new Uint8Array(63),
    source = 3 * 9 + 3;
  const t = travelTimes(grid, land, [source]);
  const expected =
    greatCircle(cellGeo(grid, source), cellGeo(grid, source + 1)) / Math.sqrt(9.81 * IDEAL_DEPTH);
  assert.ok(Math.abs(t[source + 1] - expected) < 1e-9);
  const deep = travelTimes(grid, land, [source], IDEAL_DEPTH * 4);
  assert.ok(Math.abs(deep[source + 1] * 2 - t[source + 1]) < 1e-9);
});
test("grid cell centres round trip and invalid source is not snapped over land", () => {
  for (let k = 0; k < 63; k++) assert.equal(geoCell(grid, ...cellGeo(grid, k)), k);
  const land = new Uint8Array(63);
  land[10] = 1;
  assert.throws(() => travelTimes(grid, land, [10]), /ocean/);
  assert.throws(() => travelTimes(grid, land, [-1]), /ocean/);
  assert.equal(geoCell(grid, -1, 0), -1);
});
test("continuous land wall blocks travel, an opening allows a detour", () => {
  const land = new Uint8Array(63);
  for (let j = 0; j < 7; j++) land[j * 9 + 4] = 1;
  const source = 3 * 9 + 2,
    target = 3 * 9 + 6;
  assert.equal(travelTimes(grid, land, [source])[target], Infinity);
  land[4] = 0;
  const t = travelTimes(grid, land, [source]);
  assert.ok(Number.isFinite(t[target]));
  assert.ok(
    t[target] >
      greatCircle(cellGeo(grid, source), cellGeo(grid, target)) / Math.sqrt(9.81 * IDEAL_DEPTH),
  );
});
test("no diagonal corner-cutting, no grid wrap, no polygon XOR holes", () => {
  const land = new Uint8Array(9);
  land[1] = 1;
  land[3] = 1;
  assert.deepEqual(waterNeighbours(0, 3, 3, land), []);
  assert.ok(!waterNeighbours(2, 3, 3, new Uint8Array(9)).includes(3));
  const ring = [
    [1, 1],
    [3, 1],
    [3, 3],
    [1, 3],
  ] as const;
  assert.equal(covered([ring, ring], 2, 2), true);
});
test("thin land barriers survive coastal rasterization", () => {
  const ring = [
    [4.1, -1],
    [4.12, -1],
    [4.12, 8],
    [4.1, 8],
  ] as const;
  const land = landMask(grid, [ring]);
  for (let j = 0; j < 7; j++) assert.equal(land[j * 9 + 4], 1);
  assert.equal(travelTimes(grid, land, [3 * 9 + 2])[3 * 9 + 6], Infinity);
});
test("both basin sources and controls are water, times do not exist on land", () => {
  for (const id of ["india", "tohoku"] as const) {
    const o = makeOcean(id);
    assert.equal(o.land[o.source], 0);
    assert.equal(o.times[o.source], 0);
    assert.equal(o.depth, 4000);
    for (const p of o.points) {
      assert.equal(o.land[p.k], 0);
      assert.ok(Number.isFinite(o.times[p.k]) && o.times[p.k] > 0);
    }
    for (let k = 0; k < o.land.length; k++) if (o.land[k]) assert.equal(o.times[k], Infinity);
  }
});
test("4-connected sea fill does not seed isolated low hollows or diagonal contacts", () => {
  const h = [-1, 2, 0, -1, 2, 0, -1, 2, 0];
  const wet = connectedWet(h, 3, 3, 1, [0]);
  assert.deepEqual([...wet], [1, 0, 0, 1, 0, 0, 1, 0, 0]);
  const open = connectedWet(h, 3, 3, 2, [0]);
  assert.ok([...open].every(Boolean));
  const diagonal = connectedWet([-1, 2, 2, 0], 2, 2, 1, [0]);
  assert.equal(diagonal[3], 0);
  assert.throws(() => connectedWet([1], 2, 2, 0, [0]), /grid/);
});
test("same town scenario before and after relocation, no offshore amplitude coupling", () => {
  const s = townScenario(0.27),
    before = s.wet.slice();
  const school = TOWN_SITES.find((s) => s.name === "Skole")!;
  assert.equal(s.wet[Math.round(school.x * (TOWN_N - 1))], 1);
  assert.equal(s.wet[Math.round(0.73 * (TOWN_N - 1))], 0);
  assert.deepEqual(s.wet, before);
  assert.equal(s.heights.length, TOWN_N);
  for (const b of TOWN_SITES) assert.ok(townHeight(b.x) >= 0);
  for (let i = 1; i < TOWN_N; i++) if (s.wet[i]) assert.ok(s.wet[i - 1]);
});
test("fjord geometry is smooth and process timing is qualitative", () => {
  assert.ok(fjordBed(0) < 0 && fjordBed(1) < 0 && fjordBed(0.5) > 0);
  for (let i = 1; i <= 1000; i++)
    assert.ok(Math.abs(fjordBed(i / 1000) - fjordBed((i - 1) / 1000)) < 0.01);
  assert.equal(fjordStage(0.5), "Vannforskyvning");
  assert.equal(fjordStage(1), "Bølgeutbredelse");
  assert.equal(fjordStage(2), "Refleksjon");
  assert.equal(fjordWave(0.2, 0), 0);
  assert.equal(slideOutline(0).length, 7);
  const peak = (t: number) =>
    Array.from({ length: 101 }, (_, i) => ({ x: i / 100, v: fjordWave(i / 100, t) })).sort(
      (a, b) => b.v - a.v,
    )[0].x;
  assert.ok(peak(1.7) > peak(1));
  assert.ok(peak(2.7) < peak(2));
});
test("first warning never requires a water measurement, Norwegian number format", () => {
  assert.equal(WARNING_STAGES[0].requiresWater, false);
  assert.equal(WARNING_STAGES[1].requiresWater, false);
  assert.equal(WARNING_STAGES[2].mayUseWater, true);
  assert.equal(WARNING_STAGES[3].requiresWater, false);
  assert.equal(nb(-1.5, 1), "−1,5");
});

test("text palette meets 4.5:1 on direct figure backgrounds", () => {
  const lum = (hex: string) => {
    const c = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  };
  const contrast = (a: string, b: string) => {
    const x = lum(a),
      y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  for (const background of ["#efe6d6", "#f7f3ea", "#d5ebf1", "#c9b495", "#c5d4dc"])
    assert.ok(contrast("#1c2430", background) >= 4.5);
  for (const background of ["#efe6d6", "#f7f3ea"])
    assert.ok(contrast("#4f5963", background) >= 4.5);
  assert.ok(contrast("#ffffff", "#143e52") >= 4.5);
});

test("M4 moves and spreads the source after the first phase, and reflection matches contact", () => {
  const initial = slideOutline(0),
    later = slideOutline(1.5),
    middle = slideOutline(0.75);
  const width = (p: { x: number }[]) =>
    Math.max(...p.map((p) => p.x)) - Math.min(...p.map((p) => p.x));
  assert.ok(later[0].x > middle[0].x && middle[0].x > initial[0].x);
  assert.ok(width(later) > width(initial) * 1.8);
  assert.equal(fjordStage(FJORD_CONTACT - 0.001), "Bølgeutbredelse");
  assert.equal(fjordStage(FJORD_CONTACT), "Refleksjon");
  assert.ok(fjordPulseCenter(2.7) < fjordPulseCenter(2));
  assert.ok(
    Math.abs(fjordPulseCenter(FJORD_CONTACT) + FJORD_PULSE_HALF_SUPPORT - FJORD_RIGHT_SHORE) <
      1e-10,
  );
  const epsilon = 1e-5;
  assert.ok(
    Math.abs(
      fjordWave(FJORD_RIGHT_SHORE - epsilon, 2) - fjordWave(FJORD_RIGHT_SHORE + epsilon, 2),
    ) < 1e-10,
  );
  const html = renderToStaticMarkup(createElement(ModelFjord));
  assert.equal((html.match(/aria-current="step"/g) ?? []).length, 1);
  assert.match(html, /Aktiv fase/);
});
test("longitude is labelled east or west, not a negative anonymous length", () => {
  assert.equal(formatLongitude(180.25), "179,8° V");
  assert.equal(formatLongitude(220.25), "139,8° V");
  assert.equal(formatLongitude(85.1), "85,1° Ø");
  assert.equal(formatLongitude(-139.75), "139,8° V");
});
test("smoothed marching contours never cross the land mask and do not change numerical times", () => {
  for (const id of ["india", "tohoku"] as const) {
    const o = makeOcean(id),
      before = o.times.slice(),
      levels = id === "india" ? [3600, 7200, 10800] : [7200, 14400, 28800, 43200];
    for (const level of levels) {
      const raw = marchingContours(o, level),
        smooth = smoothOceanContours(o, raw);
      assert.ok(raw.length > 0 && smooth.length > 0);
      for (const path of smooth)
        for (let i = 1; i < path.length; i++)
          assert.ok(oceanSegment(o, o.land, path[i - 1], path[i]));
      // Display-only smoothing stays close to the unsmoothed isoline, not a new circular solution.
      const segments = raw.flatMap((path) => path.slice(1).map((p, i) => [path[i], p] as const));
      for (const path of smooth)
        for (let i = 0; i < path.length; i += 8) {
          const p = path[i];
          let nearest = Infinity;
          for (const [a, b] of segments) {
            const vx = b.x - a.x,
              vy = b.y - a.y,
              len = vx * vx + vy * vy;
            const f = len
              ? Math.max(0, Math.min(1, ((p.x - a.x) * vx + (p.y - a.y) * vy) / len))
              : 0;
            nearest = Math.min(nearest, Math.hypot(p.x - a.x - vx * f, p.y - a.y - vy * f));
          }
          assert.ok(nearest < 0.04);
        }
    }
    assert.deepEqual(o.times, before);
  }
});
test("smoothed display is clipped at a thin barrier, not merely hidden by a land overpaint", () => {
  const g = { nx: 10, ny: 10 },
    land = new Uint8Array(100);
  for (let j = 0; j < 10; j++) land[j * 10 + 5] = 1;
  assert.equal(oceanSegment(g, land, { x: 0.45, y: 0.25 }, { x: 0.65, y: 0.25 }), false);
  assert.equal(oceanSegment(g, land, { x: 0.2, y: 0.2 }, { x: 0.4, y: 0.4 }), true);
  const smoothed = smoothOceanContours({ ...g, land }, [
    [
      { x: 0.2, y: 0.2 },
      { x: 0.4, y: 0.4 },
      { x: 0.8, y: 0.6 },
    ],
  ]);
  for (const path of smoothed)
    for (let i = 1; i < path.length; i++) assert.ok(oceanSegment(g, land, path[i - 1], path[i]));
});
test("all essential times including Pacific 12 h have collision-free 14 px label boxes", () => {
  for (const id of ["india", "tohoku"] as const) {
    const o = makeOcean(id),
      levels = id === "india" ? [3600, 7200, 10800] : [7200, 14400, 28800, 43200];
    const contours = levels.map((level) => ({
      level,
      paths: smoothOceanContours(o, marchingContours(o, level)),
    }));
    for (const size of [
      { w: 220, h: 320 },
      { w: 250, h: 320 },
      { w: 332, h: 320 },
      { w: 944, h: 440 },
    ]) {
      const aspect =
        ((o.lon1 - o.lon0) * Math.cos((((o.lat0 + o.lat1) / 2) * Math.PI) / 180)) /
        (o.lat1 - o.lat0);
      const width = Math.min(size.w - 28, (size.h - 100) * aspect),
        height = width / aspect;
      const obstacles = [{ k: o.source }, ...o.points].map((p) => {
        const [lon, lat] = cellGeo(o, p.k);
        return {
          x: ((lon - o.lon0) / (o.lon1 - o.lon0)) * width - 12,
          y: ((o.lat1 - lat) / (o.lat1 - o.lat0)) * height - 12,
          width: 24,
          height: 24,
        };
      });
      const water = (p: { x: number; y: number }) => {
        const i = Math.floor(p.x * o.nx),
          j = Math.floor(p.y * o.ny);
        return i >= 0 && i < o.nx && j >= 0 && j < o.ny && !o.land[j * o.nx + i];
      };
      const labels = contourLabels(contours, width, height, obstacles, water);
      assert.equal(labels.length, levels.length, `${id} ${size.w}px`);
      for (let i = 0; i < labels.length; i++) {
        assert.ok(labels[i].box.height >= 14);
        assert.ok(labels[i].box.x >= 0 && labels[i].box.x + labels[i].box.width <= width);
        for (const b of [...obstacles, ...labels.slice(i + 1).map((p) => p.box)])
          assert.ok(!boxesOverlap(labels[i].box, b, 5));
        if (labels[i].anchor) assert.ok(water(labels[i].anchor!));
      }
    }
  }
});

test("M4 full production playback reaches and holds visible reflection in ordinary and reduced motion", () => {
  for (const framesPerCallback of [1, 30]) {
    let position = 0,
      calls = 0,
      reflectionFrames = 0,
      seenReflectedPart = false;
    const phases: string[] = [];
    while (true) {
      const next = advanceFjordPlayback(position, framesPerCallback);
      position = next.position;
      calls++;
      const stage = fjordStage(position);
      if (phases.at(-1) !== stage) phases.push(stage);
      if (stage === "Refleksjon") {
        reflectionFrames += framesPerCallback;
        for (let i = 1; i < 100; i++) {
          const x = i / 100;
          if (fjordBed(x) <= 0) continue;
          const wave = fjordWaveParts(x, position);
          if (wave.reflected > 0.05) seenReflectedPart = true;
        }
      }
      if (!next.more) break;
      assert.ok(calls < 1000, "production playback must terminate");
    }
    assert.deepEqual(phases, ["Vannforskyvning", "Bølgeutbredelse", "Refleksjon"]);
    assert.equal(position, FJORD_END);
    assert.equal(calls * framesPerCallback, FJORD_END * FJORD_FRAMES_PER_UNIT);
    assert.ok(
      reflectionFrames >= FJORD_FRAMES_PER_UNIT,
      "reflection must occupy a substantial visible playback interval",
    );
    assert.ok(seenReflectedPart, "the reflected part must actually be in wet cells before stop");
    const held = advanceFjordPlayback(position, framesPerCallback);
    assert.equal(held.position, FJORD_END);
    assert.equal(held.more, false);
    assert.equal(fjordStage(held.position), "Refleksjon");
  }
  let position = 0;
  const stages: string[] = [];
  for (let i = 0; i < 5; i++) {
    position = nextFjordStep(position);
    stages.push(fjordStage(position));
  }
  assert.ok(stages.includes("Bølgeutbredelse") && stages.includes("Refleksjon"));
  assert.equal(position, FJORD_END);
  // Checked against the actual shared implementation rather than assuming elapsed seconds.
  const source = readFileSync(new URL("./draw.ts", import.meta.url), "utf8");
  assert.match(source, /frameRef\.current\(reduce \? 30 : 1\)/);
});

test("M5 width-driven panel fills mobile and desktop while keeping the geographic aspect and labels", () => {
  for (const id of ["india", "tohoku"] as const) {
    const o = makeOcean(id),
      levels = id === "india" ? [3600, 7200, 10800] : [7200, 14400, 28800, 43200];
    const contours = levels.map((level) => ({
      level,
      paths: smoothOceanContours(o, marchingContours(o, level)),
    }));
    for (const width of [250, 328, 992]) {
      const layout = oceanPanelLayout(o, width);
      assert.equal(layout.mapWidth, width - 24);
      assert.ok(Math.abs(layout.mapWidth / layout.mapHeight - layout.aspect) < 1e-12);
      assert.equal(layout.canvasHeight, layout.mapHeight + 40);
      const obstacles = [{ k: o.source }, ...o.points].map((p) => {
        const [lon, lat] = cellGeo(o, p.k);
        return {
          x: ((lon - o.lon0) / (o.lon1 - o.lon0)) * layout.mapWidth - 12,
          y: ((o.lat1 - lat) / (o.lat1 - o.lat0)) * layout.mapHeight - 12,
          width: 24,
          height: 24,
        };
      });
      const water = (p: { x: number; y: number }) => {
        const i = Math.floor(p.x * o.nx),
          j = Math.floor(p.y * o.ny);
        return i >= 0 && i < o.nx && j >= 0 && j < o.ny && !o.land[j * o.nx + i];
      };
      const labels = contourLabels(contours, layout.mapWidth, layout.mapHeight, obstacles, water);
      assert.equal(labels.length, levels.length);
      for (const label of labels) assert.ok(label.box.y + label.box.height <= layout.canvasHeight);
    }
  }
});

test("M7 text fields avoid water, terrain and all building symbols without moving physical sites", () => {
  for (const width of [250, 328, 992])
    for (const level of [0.16, 0.27])
      for (const moved of [false, true]) {
        const sites = TOWN_SITES.map((b) => ({
          ...b,
          x: moved && b.name === "Skole" ? 0.73 : b.x,
        }));
        const ph = 221;
        const glyphs = townGlyphLayout(width, ph, level, sites, {
          Hus: 26,
          "Nytt bygg": 66,
          Skole: 38,
        });
        for (const g of glyphs) {
          const physical = sites.find((b) => b.name === g.name)!;
          assert.equal(g.x, 12 + physical.x * (width - 24));
          assert.equal(g.y, ph * 0.7 - townHeight(physical.x) * ph);
          assert.ok(
            g.box.y + g.box.height <= g.waterY - 5 || g.box.y >= g.waterY + 5,
            `${width} ${level} ${g.name} water`,
          );
          for (let i = 0; i <= 20; i++) {
            const px = g.box.x + (g.box.width * i) / 20,
              terrain = ph * 0.7 - townHeight((px - 12) / (width - 24)) * ph;
            assert.ok(g.box.y + g.box.height <= terrain - 3, `${width} ${g.name} terrain`);
          }
          for (const h of glyphs)
            assert.ok(
              !boxesOverlap(
                g.box,
                {
                  x: h.x - h.half - 0.6,
                  y: h.y - h.height - 0.6,
                  width: 2 * h.half + 1.2,
                  height: h.height + 1.2,
                },
                1,
              ),
              `${g.name} against ${h.name}`,
            );
        }
        for (let i = 0; i < glyphs.length; i++)
          for (let j = i + 1; j < glyphs.length; j++) {
            assert.ok(!boxesOverlap(glyphs[i].box, glyphs[j].box, 3));
            const gap = Math.abs(glyphs[i].x - glyphs[j].x) - glyphs[i].half - glyphs[j].half - 1.2;
            assert.ok(gap >= 2.99, `${width}px symbols need a visible gap`);
          }
      }
});
