import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  G_MS2,
  M5_CELL_M,
  M5_DEPTH_M,
  M5_RECEIVER,
  M5_SOURCE,
  constantDepthTimeS,
  greenHeightRatio,
  initialLiftM,
  alongTrackAtTime,
  m2Segments,
  townReadout,
  integrateDistanceM,
  msToKmh,
  playhead,
  routeThroughWater,
  slideSketch,
  straightCrossesLand,
  travelTimeS,
  waveSpeedMs,
  wavelengthM,
} from "./tsunami-fysikk.ts";

describe("tsunami-fysikk", () => {
  it("regner fart fra g ≈ 9,8 og gjør om m/s til km/t", () => {
    assert.equal(G_MS2, 9.8);
    const speed = waveSpeedMs(4000);
    assert.ok(Math.abs(speed - Math.sqrt(9.8 * 4000)) < 1e-9);
    assert.ok(Math.abs(msToKmh(speed) - speed * 3.6) < 1e-9);
    assert.ok(Math.abs(msToKmh(waveSpeedMs(4600)) - 764) < 2);
  });

  it("øker farten monotont med dypet og stopper på land", () => {
    assert.equal(waveSpeedMs(0), 0);
    assert.equal(waveSpeedMs(-5), 0);
    assert.ok(waveSpeedMs(40) < waveSpeedMs(400) && waveSpeedMs(400) < waveSpeedMs(4000));
  });

  it("holder λ = v T og gangtid som sum av delstrekninger", () => {
    const speed = waveSpeedMs(4000);
    assert.equal(wavelengthM(speed, 1200), speed * 1200);
    const parts = [
      { lengthM: 200_000, depthM: 4000 },
      { lengthM: 50_000, depthM: 40 },
    ];
    const expected = 200_000 / waveSpeedMs(4000) + 50_000 / waveSpeedMs(40);
    assert.ok(Math.abs(travelTimeS(parts) - expected) < 1e-6);
  });

  it("integrerer strekning deterministisk", () => {
    const speed = waveSpeedMs(1000);
    const distance = integrateDistanceM(speed, 0.25, 40);
    assert.ok(Math.abs(distance - speed * 10) < 1e-6);
    assert.equal(integrateDistanceM(speed, 0.25, 40), integrateDistanceM(speed, 0.25, 40));
    assert.equal(playhead(25, 10), playhead(5, 10));
  });

  it("merker Green-forholdet som en tilnærming av dyp, ikke et faresoneprodukt", () => {
    const ratio = greenHeightRatio(4000, 40);
    assert.ok(ratio > 1);
    assert.ok(Math.abs(ratio - (4000 / 40) ** 0.25) < 1e-9);
    assert.equal(initialLiftM("sidelengs", 6), 0);
    assert.equal(initialLiftM("loddrett", 6), 6);
  });

  it("lar ikke M5-ruten krysse land, og skiller den fra konstant-dyp-sirkelen", () => {
    assert.equal(straightCrossesLand(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER), true);
    const route = routeThroughWater(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER);
    assert.ok(route);
    for (const cell of route.cells) {
      assert.ok(M5_DEPTH_M[cell.row]![cell.col]! > 0);
    }
    const naive = constantDepthTimeS(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER, 4000);
    assert.ok(route.seconds > naive);
    assert.equal(route.seconds, routeThroughWater(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER)?.seconds);
    assert.equal(M5_CELL_M, 200_000);
  });

  it("avviser dyp på 0 i gangtid og lar markøren ligge langt inne etter halv gangtid", () => {
    assert.equal(travelTimeS([{ lengthM: 100_000, depthM: 0 }]), Number.POSITIVE_INFINITY);
    assert.equal(travelTimeS([{ lengthM: 100_000, depthM: -10 }]), Number.POSITIVE_INFINITY);
    assert.equal(travelTimeS([{ lengthM: 0, depthM: 0 }]), 0);
    const shallow = m2Segments(4000, "grunnere");
    const early = alongTrackAtTime(shallow, 0.172);
    assert.ok(early);
    assert.ok(Math.abs(early.fractionOfLength - 0.5) < 0.05);
    const mid = alongTrackAtTime(shallow, 0.5);
    assert.ok(mid);
    assert.ok(mid.fractionOfLength > 0.7);
    assert.ok(mid.speedMs < waveSpeedMs(4000) / 4);
    const start = alongTrackAtTime(shallow, 0);
    assert.ok(start);
    assert.ok(start.distanceM < 1);
  });

  it("stanser ett planlagt bygg når utbygging stoppes", () => {
    const open = townReadout("stor", "ingen");
    const stopped = townReadout("stor", "ikke-bygg");
    assert.equal(stopped.exposed, open.exposed);
    assert.ok(stopped.futureExposed < open.futureExposed);
    assert.equal(stopped.futureBlocked, true);
    assert.equal(stopped.changed, "eksponering");
  });

  it("gir ulikt skredforløp for samme volum og ulikt tempo", () => {
    const slow = slideSketch({ above: true, volume: "stor", tempo: "langsom" });
    const fast = slideSketch({ above: true, volume: "stor", tempo: "rask" });
    assert.ok(fast.near > slow.near);
    assert.equal(fast.near <= 1 && slow.near <= 1, true);
  });
});
