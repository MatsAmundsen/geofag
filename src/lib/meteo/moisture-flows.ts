import { ensoSeasonWeight, iodSeasonWeight } from "@/lib/meteo/physics";
import { FLOW_TEXT } from "@/lib/meteo/fagtekst";

/**
 * Fukt-piler på kartet. Grunnlag: GeoBOT2, /workspace/jet-ar-modell/grunnlag.md §3.
 * Koordinatene er SKJEMATISKE og bare til tegning, ikke målte baner.
 *
 * - "ar": atmosfærisk elv (AMS-definisjonen): smalt, langt bånd, fiolett, stiplet kant, knyttet til front.
 * - "tropisk": fuktig luft fra havet / monsunstrøm: bred, kort pil uten front, egen farge.
 */
export type FlowKind = "ar" | "tropisk";

export type MoistureFlow = {
  id: keyof typeof FLOW_TEXT;
  kind: FlowKind;
  /** Senterlinje [lon, lat] fra kilde til landfall, gitt ENSO- og IOD-styrke (−1,4…1,4). */
  path: (enso: number, iod: number) => [number, number][];
  /** Relativ styrke 0–1 (bredde/opasitet). Ikke data. */
  strength: (enso: number, iod: number, month: number) => number;
};

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const MOISTURE_FLOWS: MoistureFlow[] = [
  {
    // Godt dokumentert AR. El Niño flytter treffpunktet litt sørover (mot 34° N, 118° V) og gjør
    // båndet litt bredere. Hyppigheten øker ikke tydelig, og La Niña gir aldri null.
    id: "california",
    kind: "ar",
    path: (enso) => {
      const t = clamp(enso, 0, 1);
      const end: [number, number] = [lerp(-122, -118, t), lerp(38, 34, t)];
      return [
        [-155, 20],
        [lerp(-146, -145, t), lerp(26, 25, t)],
        [lerp(-136, -134, t), lerp(32, 30, t)],
        [lerp(-127, -124, t), lerp(36, 33, t)],
        end,
      ];
    },
    strength: (enso) => clamp(0.7 + 0.1 * clamp(enso, 0, 1.4)),
  },
  {
    // AR i nordvestlig skybånd over Australia. Litt oftere ved negativ IOD og La Niña. Svak sammenheng,
    // så bare liten endring.
    id: "australia",
    kind: "ar",
    path: () => [
      [100, -10],
      [112, -16],
      [124, -23],
      [135, -29],
      [145, -35],
    ],
    strength: (enso, iod, month) => clamp(0.55 - 0.08 * iod * iodSeasonWeight(month) - 0.05 * enso * ensoSeasonWeight(month), 0.35),
  },
  {
    // Tropisk fukttransport, ikke AR. Svakere ved positiv IOD og El Niño, sterkere ved negativ IOD og La Niña.
    id: "sumatra",
    kind: "tropisk",
    path: () => [
      [85, -5],
      [92, -3],
      [100, 0],
    ],
    strength: (enso, iod, month) =>
      clamp(0.5 - 0.3 * iod * iodSeasonWeight(month) - 0.2 * enso * ensoSeasonWeight(month), 0.15),
  },
  {
    // Tropisk fukttransport fra Indiahavet (østavind i den korte regntiden, oktober–desember).
    // Sterkere ved positiv IOD, ofte også ved El Niño.
    id: "ostAfrika",
    kind: "tropisk",
    path: () => [
      [65, -5],
      [54, -3.5],
      [42, -2],
    ],
    strength: (enso, iod, month) =>
      clamp(0.3 + 0.4 * iod * iodSeasonWeight(month) + 0.15 * enso * ensoSeasonWeight(month), 0.12),
  },
];

/** Minste styrke som tegnes. Svakere piler utelates (ikke grå). */
export const MOISTURE_MIN = 0.12;

export function activeFlows(enso: number, iod: number, month: number) {
  return MOISTURE_FLOWS.map((flow) => ({ flow, s: flow.strength(enso, iod, month), path: flow.path(enso, iod) })).filter(
    (f) => f.s >= MOISTURE_MIN,
  );
}
