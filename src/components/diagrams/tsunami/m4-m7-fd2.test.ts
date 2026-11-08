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
});
