import assert from "node:assert/strict";
import { test } from "node:test";
import {
  KEEL_KM,
  MELT_ONSET_KM,
  PLATE_MAX_KM,
  PLATE_MIN_KM,
  mantleTempAt,
  meltAmountFor,
  solidusAt,
} from "./mantle-melting.ts";

test("solidus stiger med trykk (dyp)", () => {
  for (let z = 0; z < 200; z += 10) {
    assert.ok(solidusAt(z + 10) > solidusAt(z), `solidus skal øke fra ${z} km`);
  }
});

test("ved overflaten ville mantelen ha smeltet, dypt nede er den fast", () => {
  assert.ok(mantleTempAt(0) > solidusAt(0));
  assert.ok(mantleTempAt(150) < solidusAt(150));
  assert.ok(mantleTempAt(200) < solidusAt(200));
});

test("mantelens temperatur holder seg innenfor 1300–1400 °C i astenosfæren (100–200 km)", () => {
  for (const z of [100, 150, 200]) {
    const t = mantleTempAt(z);
    assert.ok(t >= 1300 && t <= 1400, `${t} °C ved ${z} km`);
  }
});

test("smelting starter grunt, godt under en tykk plate sin bunn", () => {
  assert.ok(MELT_ONSET_KM > 40 && MELT_ONSET_KM < 70, `onset ${MELT_ONSET_KM}`);
  assert.ok(MELT_ONSET_KM < KEEL_KM);
});

test("tykk plate gir ingen smelte, tynnere plate gir mer", () => {
  assert.equal(meltAmountFor(PLATE_MAX_KM), 0);
  assert.equal(meltAmountFor(KEEL_KM), 0);
  assert.equal(meltAmountFor(PLATE_MIN_KM), 1);
  assert.ok(meltAmountFor(30) > meltAmountFor(45));
  assert.ok(meltAmountFor(45) > 0);
});
