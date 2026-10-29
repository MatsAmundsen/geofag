import assert from "node:assert/strict";
import { test } from "node:test";
import { NAV_GF2, NAV_GF2_GROUPS, NAV_GF2_ROWS } from "./nav.ts";

test("mobilmenyen for Geofag 2 har hver lenke i nøyaktig én gruppe, med uendrede navn", () => {
  const alle = NAV_GF2_GROUPS.flatMap((g) => g.items);
  assert.equal(alle.length, NAV_GF2.length);
  for (const n of NAV_GF2) {
    const treff = alle.filter((i) => i.to === n.to);
    assert.equal(treff.length, 1, `${n.to} står ${treff.length} ganger`);
    assert.equal(treff[0].label, n.label);
  }
});

test("gruppene følger temaene atmosfære, hav, kryosfære og klima", () => {
  assert.deepEqual(
    NAV_GF2_GROUPS.map((g) => g.label),
    ["Start", "Atmosfære", "Hav", "Kryosfære", "Klima", "Energi", "Annet"],
  );
});

test("desktopmenyen deler NAV_GF2 i to rader på 13", () => {
  assert.equal(NAV_GF2_ROWS.length, 2);
  assert.equal(NAV_GF2_ROWS[0].length, 13);
  assert.equal(NAV_GF2_ROWS[1].length, 13);
  assert.deepEqual(NAV_GF2_ROWS.flat(), [...NAV_GF2]);
});
