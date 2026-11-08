import { readFileSync } from "node:fs";
import {
  advanceFjordPlayback,
  fjordPlaybackTick,
  FJORD_SECONDS_PER_UNIT,
  FJORD_LEFT_SHORE,
  nextFjordStep,
  FJORD_FRAMES_PER_UNIT,
  FJORD_END,
  fjordWaveParts,
  fjordSurface,
  fjordSlideLabel,
  townGlyphLayout,
  townWaterLayers,
  TOWN_NORMAL_SEA_LEVEL,
  fjordStatus,
  riskStatus,
  warningStatus,
  townView,
  townScreenX,
  townSiteX,
} from "./sim/fjord";
import { filterOceanContourFragments, oceanPanelLayout } from "./sim/oceanmap";
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
import { ModelWarning, WARNING_STAGES, SKRED_WARNING_STAGES } from "./m6-warning";
import { ModelRisk, TOWN_SITES } from "./m7-risk";
import { nb } from "./util";
import {
  marchingContours,
  oceanStatus,
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
import { ModelOcean } from "./m5-ocean";
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
      paths: filterOceanContourFragments(smoothOceanContours(o, marchingContours(o, level)), oceanPanelLayout(o, 332).aspect),
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
      assert.ok(calls <= FJORD_END * FJORD_FRAMES_PER_UNIT, "production playback must terminate");
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
      paths: filterOceanContourFragments(smoothOceanContours(o, marchingContours(o, level)), oceanPanelLayout(o, 332).aspect),
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
          assert.equal(g.x, townScreenX(physical.x, width));
          assert.equal(g.y, ph * 0.7 - townHeight(physical.x) * ph);
          assert.ok(g.box.y + g.box.height <= ph - 4, `${width} ${g.name} within land panel`);
          for (let i = 0; i <= 30; i++) {
            const px = g.box.x + (g.box.width * i) / 30,
              z = townHeight(townSiteX(px, width)), terrain = ph * 0.7 - z * ph;
            assert.ok(g.box.y >= terrain + 4, `${width} ${g.name} label must be on land below terrain, not in sea`);
            if (z <= level) assert.ok(g.box.y > Math.max(g.waterY, terrain) + 3);
          }
          for (const h of glyphs)
            assert.ok(
              !boxesOverlap(
                g.box,
                {
                  x: h.symbolX - h.half - 0.6,
                  y: h.symbolY - h.height - 0.6,
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
            const iconBox = (g: typeof glyphs[number]) => ({
              x: g.symbolX - g.half - 0.6, y: g.symbolY - g.height - 0.6,
              width: 2 * g.half + 1.2, height: g.height + 1.2,
            });
            assert.ok(!boxesOverlap(iconBox(glyphs[i]), iconBox(glyphs[j]), 2.99), `${width}px symbols need a visible gap`);
          }
      }
});


test("M4 real elapsed playback keeps source for 6.4 s, contact at 12 s and end at 24 s independently of refresh rate", () => {
  assert.equal(FJORD_SECONDS_PER_UNIT, 8);
  for (const stepMs of [1000 / 30, 1000 / 60, 1000 / 120, 1000 / 144, 500]) {
    let position = 0, previous: number | null = null, contactAt = 0, sourceUntil = 0, endAt = 0;
    const phases: string[] = [];
    for (let frame = 0; frame <= Math.ceil(25000 / stepMs); frame++) {
      const now = frame * stepMs;
      const next = fjordPlaybackTick(position, previous, now);
      previous = next.timestamp;
      position = next.position;
      const phase = fjordStage(position);
      if (phases.at(-1) !== phase) phases.push(phase);
      if (phase === "Vannforskyvning") sourceUntil = now;
      if (phase === "Refleksjon" && !contactAt) contactAt = now;
      if (now >= 3000 && now <= 5000) assert.equal(phase, "Vannforskyvning");
      if (!next.more) { endAt = now; break; }
    }
    assert.deepEqual(phases, ["Vannforskyvning", "Bølgeutbredelse", "Refleksjon"]);
    assert.ok(sourceUntil >= 6400 - stepMs - 1e-6 && sourceUntil < 6400);
    assert.ok(Math.abs(contactAt - 12000) <= stepMs + 1e-6);
    assert.ok(Math.abs(endAt - 24000) <= stepMs + 1e-6);
    assert.ok(endAt - contactAt >= 12000 - stepMs - 1e-6);
    assert.equal(position, FJORD_END);
    assert.equal(fjordPlaybackTick(position, previous, endAt + 500).more, false);
  }
  // A paused/offscreen interval is not simulation time, and a stalled tab cannot skip phases.
  assert.equal(fjordPlaybackTick(0.3, null, 100000).position, 0.3);
  assert.equal(fjordPlaybackTick(0, 0, 100000).position, 0.5 / FJORD_SECONDS_PER_UNIT);
  const component = readFileSync(new URL("./m4-fjord.tsx", import.meta.url), "utf8");
  assert.match(component, /useState\(false\)/); // Source starts paused.
  assert.match(component, /fjordPlaybackTick\(progress.current, previousTick.current, performance.now\(\)\)/);
  assert.match(component, /previousTick.current = null;[\s\S]*?\[playing, playback.inView, playback.reduce\]/);
});

test("M4 wave clip intersects the actual wet interval and above-bed geometry, not the dry shoulders", () => {
  assert.ok(Math.abs(fjordBed(FJORD_LEFT_SHORE)) < 1e-10);
  assert.ok(Math.abs(fjordBed(FJORD_RIGHT_SHORE)) < 1e-10);
  for (let i = 0; i <= 10000; i++) {
    const x = i / 10000;
    assert.equal(x > FJORD_LEFT_SHORE && x < FJORD_RIGHT_SHORE, fjordBed(x) > 0);
  }
  // The production drawing uses both intersections. A positive crest cannot extend the
  // wet interval up a shoulder; the existing bed-shaped clip still excludes rock below it.
  const component = readFileSync(new URL("./m4-fjord.tsx", import.meta.url), "utf8");
  assert.match(component, /ctx.rect\(xOf\(FJORD_LEFT_SHORE\), 0, xOf\(FJORD_RIGHT_SHORE - FJORD_LEFT_SHORE\), h\);\s*ctx.clip\(\)/);
  assert.match(component, /smoothPath\(ctx, bed.slice\(\).reverse\(\), false\);\s*ctx.closePath\(\);\s*ctx.clip\(\)/);
});

test("M5 display filter removes detached Bengal fragments without changing or joining surviving geometry or travel times", () => {
  const o = makeOcean("india"), times = o.times.slice(), land = o.land.slice();
  const aspect = oceanPanelLayout(o, 992).aspect;
  const paths = smoothOceanContours(o, marchingContours(o, 10800));
  const before = structuredClone(paths);
  assert.ok(paths.some((p) => p.every((v) => v.y < 0.05)), "real Bengal regression fixture must exist");
  const visible = filterOceanContourFragments(paths, aspect);
  assert.ok(visible.length > 0);
  assert.ok(!visible.some((p) => p.every((v) => v.y < 0.05)), "detached north-coast stubs must not be displayed");
  assert.deepEqual(paths, before);
  assert.deepEqual(o.times, times);
  assert.deepEqual(o.land, land);
  for (const path of visible) {
    assert.ok(paths.includes(path), "surviving paths must be identical, not extended or joined");
    for (let i = 1; i < path.length; i++) assert.ok(oceanSegment(o, o.land, path[i-1], path[i]));
  }
  const short = [{x: 0.2, y: 0.2}, {x: 0.21, y: 0.2}];
  const long = [{x: 0.3, y: 0.2}, {x: 0.5, y: 0.2}];
  assert.deepEqual(filterOceanContourFragments([short, long], aspect), [long]);
  // All essential hour labels on both actual basins are covered by the width-driven panel test,
  // now using this same production display filter at 250/328/992 px.
});

test("M7 building glyphs keep their screen-space aspect and physical footpoints at every canvas size", () => {
  for (const width of [250, 328, 600, 992, 1500]) {
    const layout = townGlyphLayout(width, 221, 0.27, TOWN_SITES, {Hus: 26, "Nytt bygg": 66, Skole: 38});
    for (const g of layout) {
      assert.ok(Math.abs(g.height / (2 * g.half) - 18 / 14) < 1e-12);
      assert.ok(g.half * 2 >= 14 && g.height >= 18, "recognizable house symbols may not shrink to letter-sized specks");
      const physical = TOWN_SITES.find((b) => b.name === g.name)!;
      assert.equal(g.x, townScreenX(physical.x, width));
      assert.equal(g.y, 221 * 0.7 - townHeight(physical.x) * 221);
    }
  }
});


test("M4 displayed surface returns smoothly to the real shore rather than leaving a clipped half crest", () => {
  for (let t = 0; t <= 3.0001; t += 0.01) {
    const surface = fjordSurface(t, 1001);
    assert.equal(surface[0].x, FJORD_LEFT_SHORE);
    assert.ok(Math.abs(surface.at(-1)!.x - FJORD_RIGHT_SHORE) < 1e-15);
    assert.ok(Math.abs(surface[0].y) < 1e-15 && Math.abs(surface.at(-1)!.y) < 1e-15);
    for (const p of surface) {
      assert.ok(p.x >= FJORD_LEFT_SHORE - 1e-15 && p.x <= FJORD_RIGHT_SHORE + 1e-15);
      assert.ok(fjordBed(p.x) > -1e-10);
      if (p.x > FJORD_LEFT_SHORE + 0.035 && p.x < FJORD_RIGHT_SHORE - 0.035)
        assert.ok(Math.abs(p.y + fjordWave(p.x, t)) < 1e-15, "interior pulse must be unchanged");
    }
    for (const [a, b] of [[surface[0], surface[1]], [surface.at(-2)!, surface.at(-1)!]])
      assert.ok(Math.abs((b.y - a.y) / (b.x - a.x)) < 0.2, "shore endpoint should approach a flat tangent, not an aerial cut");
  }
  const component = readFileSync(new URL("./m4-fjord.tsx", import.meta.url), "utf8");
  assert.match(component, /const surf = fjordSurface\(t\)/);
});

test("M4 source and deposit labels clear the waterline at six seconds and every playback/manual position", () => {
  for (const width of [250, 328, 992])
    for (const height of [340, 400])
      for (let step = 0; step <= 300; step++) {
        const t = step / 100, sea = height * 0.42;
        const note = fjordSlideLabel(t, width, height, t < 0.8 ? 42 : 94);
        assert.ok(note.box.y + note.box.height <= sea - 10 || note.box.y >= sea + 10, `${t} waterline collision`);
        assert.ok(note.box.x >= 0 && note.box.x + note.box.width <= width);
        assert.ok(note.box.y >= 0 && note.box.y + note.box.height <= height);
      }
  const sixSeconds = fjordSlideLabel(6 / FJORD_SECONDS_PER_UNIT, 992, 400, 42);
  assert.ok(sixSeconds.box.y + sixSeconds.box.height < 400 * 0.42 - 10);
});

test("M4–M7 static SSR accessibility: native keyboard semantics, focus classes, linked names/descriptions and live status", () => {
  const models = [
    { n: 4, component: ModelFjord, names: ["Start", "Neste prosesstrinn", "Nullstill"] },
    { n: 5, component: ModelOcean, names: ["Indiahavet", "Stillehavet", "Start", "Fram 30 modellminutter", "Nullstill"] },
    { n: 6, component: ModelWarning, names: ["Jordskjelv", "Skred", "Start", "Neste ledd", "Nullstill"] },
    { n: 7, component: ModelRisk, names: ["Lavere nivå", "Høyere nivå", "Ingen", "Flytt skolen", "Stans nytt bygg", "Overvåking", "Nullstill sammenligning"] },
  ];
  for (const { n, component, names } of models) {
    const html = renderToStaticMarkup(createElement(component));
    const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
    assert.deepEqual(buttons.map((b) => b[2].replace(/<[^>]*>/g, "").trim()), names, `M${n} native DOM tab order`);
    for (const button of buttons) {
      assert.match(button[1], /type="button"/);
      assert.match(button[1], /focus-visible:outline-2/);
      assert.doesNotMatch(button[1], /tabindex=|disabled|role="(?!button)/);
    }
    assert.match(html, new RegExp(`aria-labelledby="m${n}-tittel"`));
    assert.match(html, new RegExp(`<h3 id="m${n}-tittel"`));
    const canvas = html.match(/<canvas\b([^>]*)>/)![1];
    assert.match(canvas, /role="img"/);
    assert.match(canvas, /aria-label="[^"]{20,}"/);
    for (const id of canvas.match(/aria-describedby="([^"]+)"/)![1].split(" "))
      assert.ok(html.includes(`id="${id}"`), `M${n} description target ${id}`);
    assert.match(html, /aria-live="polite"/);
    if (n !== 4) assert.match(html, /aria-pressed="(true|false)"/);
    assert.doesNotMatch(html, /role="button"|tabindex="[1-9]/);
    const file = ["m4-fjord", "m5-ocean", "m6-warning", "m7-risk"][n - 4];
    const source = readFileSync(new URL(`./${file}.tsx`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /onKeyDown|onKeyUp|preventDefault|addEventListener\(["']key/, "native Tab/Enter/Space must not be intercepted");
    const live = [...html.matchAll(/<[a-z]+\b[^>]*(?:aria-live|role="status")[^>]*>/g)].map((m) => m[0]);
    assert.equal(live.length, 1, `M${n} must have exactly one live region, not clock plus conclusion plus status`);
    assert.match(live[0], /role="status" aria-live="polite" aria-atomic="true"/);
    assert.ok(live[0].includes(`id="m${n}-status"`));
    for (const button of buttons)
      if (["Start", "Pause"].includes(button[2])) assert.doesNotMatch(button[1], /aria-pressed/);
  }
  // This verifies markup/contracts, NOT execution of Tab, Enter or Space in a browser.
  const shared = readFileSync(new URL("./lab.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(shared, /onKeyDown|onKeyUp|preventDefault/);
});

test("FD2 tests are automatically included by npm test using only repository-local support", () => {
  const packageJson = JSON.parse(readFileSync(new URL("../../../../package.json", import.meta.url), "utf8"));
  assert.match(packageJson.scripts.test, /scripts\/\*\*\/\*.test.mjs/);
  const runner = readFileSync(new URL("../../../../scripts/tsunami-fd2.test.mjs", import.meta.url), "utf8");
  const loader = readFileSync(new URL("../../../../scripts/tsunami-fd2-loader.mjs", import.meta.url), "utf8");
  assert.match(runner, /register\(".\/tsunami-fd2-loader.mjs", import.meta.url\)/);
  assert.match(runner, /import\("..\/src\/components\/diagrams\/tsunami\/m4-m7-fd2.test.ts"\)/);
  assert.doesNotMatch(runner + loader, /\/workspace\/|ts-loader.mjs/);
  assert.match(loader, /from "typescript"/);
});


test("M7 responsive viewport preserves exact terrain/site mapping and puts recognizable icons on their actual land sites", () => {
  for (const width of [250, 328, 360, 600, 992]) {
    const view = townView(width);
    assert.ok(view.from >= 0 && view.to <= 1);
    if (width <= 360) assert.ok(view.span < 1);
    for (const siteX of [view.from, 0.46, 0.49, 0.55, 0.73, view.to])
      assert.ok(Math.abs(townSiteX(townScreenX(siteX, width), width) - siteX) < 1e-12);
    for (const level of [0.16, 0.27]) for (const moved of [false, true]) for (const stopped of [false, true]) {
      const sites = TOWN_SITES.filter((b) => !stopped || b.name !== "Nytt bygg").map((b) => ({...b, x: moved && b.name === "Skole" ? 0.73 : b.x}));
      const glyphs = townGlyphLayout(width, 221, level, sites, {Hus: 26, "Nytt bygg": 66, Skole: 38});
      for (const g of glyphs) {
        assert.equal(g.symbolX, g.x, "no horizontal proxy/displacement");
        assert.equal(g.symbolY, g.y, "no raised/floating proxy/displacement");
        assert.ok(Math.abs(townSiteX(g.x, width) - g.siteX) < 1e-12);
        assert.equal(g.y, 221 * 0.7 - townHeight(g.siteX) * 221);
        assert.ok(g.x - g.half >= 0 && g.x + g.half <= width);
        assert.ok(g.half * 2 >= 14 && g.height >= 18);
        for (const h of glyphs) if (h !== g)
          assert.ok(!boxesOverlap({x:g.x-g.half-.6,y:g.y-g.height-.6,width:2*g.half+1.2,height:g.height+1.2},
            {x:h.x-h.half-.6,y:h.y-h.height-.6,width:2*h.half+1.2,height:h.height+1.2}, 3));
        // Each leader runs straight down into land at its true site, not through another label.
        for (const h of glyphs) if (h !== g)
          assert.ok(!(g.x > h.box.x - 1 && g.x < h.box.x + h.box.width + 1 &&
            g.y < h.box.y + h.box.height + 1 && g.box.y > h.box.y - 1));
      }
      const seaX = townSiteX(18, width);
      assert.ok(townHeight(seaX) < TOWN_NORMAL_SEA_LEVEL, "Sjø anchor must identify the normal sea, not the scenario surface");
    }
  }
});

test("M4–M7 status change semantics announce phases/manual steps/pause, never each clock tick", () => {
  assert.equal(fjordStatus(0.2, true), fjordStatus(0.7, true));
  assert.notEqual(fjordStatus(0.2, true), fjordStatus(1.1, true));
  assert.notEqual(fjordStatus(1.1, true), fjordStatus(1.8, true));
  const manual = [0, 0.6, 1.1, 1.8, 2.6, 3].map((t) => fjordStatus(t, false));
  assert.equal(new Set(manual).size, manual.length);
  assert.notEqual(fjordStatus(1.8, true), fjordStatus(1.8, false));
  for (const id of ["india", "tohoku"] as const) {
    assert.equal(oceanStatus(id, 100, true), oceanStatus(id, 1000, true));
    assert.equal(oceanStatus(id, 5400, true), oceanStatus(id, 6000, true));
    assert.doesNotMatch(oceanStatus(id, 5400, true), /1,5|modellklokke/);
    assert.notEqual(oceanStatus(id, 5400, false), oceanStatus(id, 6000, false));
    assert.notEqual(oceanStatus(id, 100, true), oceanStatus(id, 100, false));
    const levels = id === "india" ? [3600,7200,10800] : [7200,14400,28800,43200];
    for (const t of levels) assert.notEqual(oceanStatus(id, t - 1, true), oceanStatus(id, t, true));
  }
  assert.notEqual(warningStatus("skjelv", 0, WARNING_STAGES[0].title), warningStatus("skjelv", 1, WARNING_STAGES[1].title));
  assert.equal(warningStatus("skjelv", 1, WARNING_STAGES[1].title), warningStatus("skjelv", 1, WARNING_STAGES[1].title), "M6 phase text is independent of pause/play");
  assert.notEqual(warningStatus("skjelv", 0, WARNING_STAGES[0].title), warningStatus("skred", 0, SKRED_WARNING_STAGES[0].title));
  assert.equal(riskStatus("hoy", "ingen", 3, 3), riskStatus("hoy", "ingen", 3, 3));
  assert.notEqual(riskStatus("hoy", "ingen", 3, 3), riskStatus("hoy", "overvak", 3, 3));
  assert.notEqual(riskStatus("hoy", "ingen", 3, 3), riskStatus("lav", "ingen", 0, 0));
});

test("M5 Myanmar stub is omitted only in display; closing the 1 h Sumatra ring would cross land", () => {
  const o = makeOcean("india"), times = o.times.slice(), land = o.land.slice(), aspect = oceanPanelLayout(o, 992).aspect;
  const raw = smoothOceanContours(o, marchingContours(o, 7200));
  const stub = raw.find((p) => p.every((v) => v.x > 0.75 && v.y < 0.3));
  assert.ok(stub, "real Myanmar fragment fixture exists");
  const visible = filterOceanContourFragments(raw, aspect);
  assert.ok(!visible.includes(stub));
  for (const p of visible) assert.ok(raw.includes(p), "filter never creates an across-land bridge");
  const ring = smoothOceanContours(o, marchingContours(o, 3600))[0];
  assert.ok(!oceanSegment(o, o.land, ring[0], ring.at(-1)!), "do not close the 1 h ring across Sumatra");
  assert.deepEqual(o.times, times); assert.deepEqual(o.land, land);
  const note = fjordSlideLabel(2.6, 992, 400, 94);
  assert.ok(note.anchor.y - 3 - (note.baseline + 4) >= 12, "deposit leader must be visibly longer than a small tick");
});


test("M7 normal sea is fixed and separate from sea-connected hypothetical water at both selected levels", () => {
  const low = townWaterLayers(0.16), high = townWaterLayers(0.27);
  assert.equal(TOWN_NORMAL_SEA_LEVEL, 0);
  assert.equal(low.normal.surface, TOWN_NORMAL_SEA_LEVEL);
  assert.equal(high.normal.surface, TOWN_NORMAL_SEA_LEVEL);
  assert.deepEqual(low.normal.wet, high.normal.wet);
  assert.deepEqual(low.normal.runs, high.normal.runs);
  assert.deepEqual(low.scenario.wet, townScenario(0.16).wet);
  assert.deepEqual(high.scenario.wet, townScenario(0.27).wet);
  assert.ok(high.scenario.wet.reduce((a, b) => a + b, 0) > low.scenario.wet.reduce((a, b) => a + b, 0));
  for (const layers of [low, high]) {
    for (const layer of [layers.normal, layers.scenario]) for (const run of layer.runs) {
      assert.ok(run.from >= 0 && run.to <= 1 && run.from < run.to);
      for (let k = run.first; k <= run.last; k++) {
        assert.equal(layer.wet[k], 1);
        assert.ok(layers.heights[k] <= layer.surface);
      }
      const interpolate = (x: number) => {
        const q = x * (TOWN_N - 1), k = Math.min(TOWN_N - 2, Math.floor(q));
        return layers.heights[k] + (layers.heights[k + 1] - layers.heights[k]) * (q - k);
      };
      if (run.to < 1) assert.ok(Math.abs(interpolate(run.to) - layer.surface) < 1e-12, "line must end naturally on the terrain");
    }
    for (const site of [...TOWN_SITES, {name: "Skole", x: 0.73}]) {
      const k = Math.round(site.x * (TOWN_N - 1));
      assert.ok(townHeight(site.x) > TOWN_NORMAL_SEA_LEVEL, "every physical building site starts on normal dry land");
      assert.equal(layers.normal.wet[k], 0, "buildings must never be in the permanent blue sea");
      const hypotheticalContact = layers.scenario.runs.some((run) => site.x >= run.from && site.x <= run.to) && townHeight(site.x) <= layers.scenario.surface;
      assert.equal(hypotheticalContact, Boolean(layers.scenario.wet[k]));
    }
  }
  const component = readFileSync(new URL("./m7-risk.tsx", import.meta.url), "utf8");
  assert.match(component, /for \(const run of water.normal.runs\)/);
  assert.match(component, /for \(const run of water.scenario.runs\)/);
  assert.match(component, /normalY = yOf\(TOWN_NORMAL_SEA_LEVEL\)/);
  assert.match(component, /ctx.rect\(left, scenarioY, right - left, normalY - scenarioY\);\s*ctx.clip\(\)/);
  assert.match(component, /smoothPath\(ctx, bed.slice\(\).reverse\(\), false\);\s*ctx.closePath\(\);\s*ctx.clip\(\)/);
  assert.match(component, /ctx.setLineDash\(\[6, 4\]\)/);
  assert.match(component, /label\(ctx, "Tenkt vannivå"/);
});

test("M7 neither normal nor hypothetical layer seeds an isolated landward pool", () => {
  const heights = [-0.4, -0.1, 0.5, -0.2, -0.3, 0.6];
  const blocked = townWaterLayers(0.3, heights);
  for (const layer of [blocked.normal, blocked.scenario]) {
    assert.deepEqual([...layer.wet], [1, 1, 0, 0, 0, 0]);
    for (const k of [3, 4]) {
      assert.ok(heights[k] < layer.surface, "fixture has low but disconnected terrain");
      assert.ok(!layer.runs.some((r) => k / (heights.length - 1) >= r.from && k / (heights.length - 1) <= r.to));
    }
  }
  const overtopped = townWaterLayers(0.55, heights);
  assert.equal(overtopped.scenario.wet[3], 1, "pool may fill only after a continuous connection exists");
  assert.equal(overtopped.normal.wet[3], 0, "normal sea must not change with the chosen scenario");
  const zero = townWaterLayers(TOWN_NORMAL_SEA_LEVEL, heights);
  assert.deepEqual(zero.normal.wet, zero.scenario.wet);
});

test("M6 caveat is a once-described static text, and landslide phases have distinct accurate explanations", () => {
  const html = renderToStaticMarkup(createElement(ModelWarning));
  assert.equal((html.match(/Ingen trygghetsgaranti\./g) ?? []).length, 1);
  assert.match(html, /id="m6-beskrivelse"/);
  assert.match(html, /aria-describedby="m6-beskrivelse m6-naturlige-tegn"/);
  const live = html.match(/<p[^>]*id="m6-status"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
  assert.doesNotMatch(live, /Ingen trygghetsgaranti/);
  const stages = SKRED_WARNING_STAGES.map((stage, step) =>
    warningStatus("skred", step, `${stage.title}. ${stage.detail}`));
  assert.equal(new Set(stages).size, 4);
  assert.match(stages[0], /Skred setter vann i bevegelse/);
  assert.match(stages[0], /Kan mangle seismisk varsel/);
  assert.match(stages[1], /Mulig lokalt varsel/);
  assert.match(stages[1], /Lokalt varsel er ikke garantert/);
  for (const source of ["skjelv", "skred"] as const)
    for (const [step, stage] of (source === "skred" ? SKRED_WARNING_STAGES : WARNING_STAGES).entries())
      assert.doesNotMatch(warningStatus(source, step, `${stage.title}. ${stage.detail}`), /Ingen trygghetsgaranti/);
  const component = readFileSync(new URL("./m6-warning.tsx", import.meta.url), "utf8");
  assert.match(component, /warningStatus\(source, step, `\$\{stages\[step\].title\}. \$\{stages\[step\].detail\}`\)/);
});
