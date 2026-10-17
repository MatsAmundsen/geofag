/**
 * Botn, egg og tind: høydemodellen (ingen React). Tilstanden er hvor langt hver bre har gravd
 * (`grav`, 0 … 1) og hvor mye is som ligger i hver botn (`is`, 0 … 1).
 *
 * Fjellet er et avrundet massiv med fire grunne forsenkninger i sidene (før breene). Hver bre graver
 * en skål med bratt bakvegg som arbeider seg innover mot toppen. Der to skåler møtes, står en smal
 * rygg igjen (egg), og der flere møtes, står en spiss topp igjen (tind). Ingen plukking ved
 * bakveggen og ikke vann i botnene (GeoBot1, 16.10). Alt regnes ut lat, ved første bruk.
 */
import { clamp, lerp, smooth } from "./isbre-kit";
import { lat } from "./prosess-kit";
import { blandRgb, lagStoy, type Rgb } from "./terreng-kit";

export const BT_W = 600;
export const BT_D = 440;
export const TOPP: [number, number] = [300, 248];

/** Breene, i rekkefølgen de begynner å grave: sørvest (foran til venstre), sørøst, nordøst, nordvest. */
export type BreId = "sv" | "so" | "no" | "nv";
export const BREER: { id: BreId; vinkel: number }[] = [
  { id: "sv", vinkel: 225 },
  { id: "so", vinkel: 315 },
  { id: "no", vinkel: 45 },
  { id: "nv", vinkel: 135 },
];
const RETNING = BREER.map((b) => {
  const a = (b.vinkel * Math.PI) / 180;
  return [Math.cos(a), Math.sin(a)] as [number, number];
});

export type BotnTilstand = { grav: number[]; is: number[]; sno: number };

const stoy = lat(() => lagStoy(7151));

/** Massivet før breene: avrundet, med skuldre, svake rygger og fire grunne forsenkninger. */
function massiv(x: number, y: number) {
  const { fbm } = stoy();
  const dx = x - TOPP[0];
  const dy = (y - TOPP[1]) * 1.06;
  const r = Math.hypot(dx, dy);
  let z = 26 + 300 / (1 + (r / 188) ** 2.3);
  z += 14 * fbm(x / 110, y / 110, 3) + 5 * fbm(x / 30, y / 30, 2);
  // grunne søkk i fjellsidene der breene senere ligger
  for (let k = 0; k < 4; k++) {
    const [ux, uy] = RETNING[k];
    const cx = TOPP[0] + ux * 175;
    const cy = TOPP[1] + uy * 175;
    const d2 = ((x - cx) ** 2 + (y - cy) ** 2) / (70 * 70);
    z -= 24 * Math.exp(-d2);
  }
  return z;
}

/** Lokale koordinater for bre k: langs (ut fra toppen) og på tvers. */
function lokal(k: number, x: number, y: number) {
  const [ux, uy] = RETNING[k];
  const rx = x - TOPP[0];
  const ry = y - TOPP[1];
  return { langs: rx * ux + ry * uy, tvers: -rx * uy + ry * ux };
}

/**
 * Skålen til bre k ved fremdrift a. Bakveggen arbeider seg innover mot toppen, og skålen er åpen
 * nedover (ingen vegg på utsiden). e < 1 er inne i skålen.
 */
function skaal(k: number, x: number, y: number, a: number) {
  const { langs, tvers } = lokal(k, x, y);
  const sa = smooth(a);
  const bak = lerp(136, 56, sa);
  const midt = bak + 64;
  const B = lerp(54, 70, sa);
  const Lin = midt - bak;
  const Lut = 84;
  const u = (langs - midt) / (langs < midt ? Lin : Lut);
  const e = u * u + (tvers / B) ** 2;
  return { e, langs, tvers, bak, midt, B };
}

/** Skålbunnen: heller svakt utover, og stiger mot sidene (skålform). */
function bunnHoyde(langs: number, tvers: number, bak: number, B: number) {
  return 150 - 0.42 * (langs - bak) + 34 * (tvers / B) ** 2;
}

const TOPP_HOYDE = 316;

/** Myk minimum (k = rundingsbredde). */
function smin(a: number, b: number, k: number) {
  return Math.min(a, b) - k * Math.log1p(Math.exp(-Math.abs(a - b) / k));
}

/** Bergoverflaten (uten is). */
export function bergHoyde(x: number, y: number, grav: number[]) {
  let h = massiv(x, y);
  for (let k = 0; k < 4; k++) {
    const a = grav[k];
    if (a <= 0.001) continue;
    const { e, langs, tvers, bak, midt, B } = skaal(k, x, y, a);
    if (e > 2.2) continue;
    const bunn = bunnHoyde(langs, tvers, bak, B);
    // bratt vegg rundt skålen, brattest inn mot toppen (bakveggen)
    let mal = e < 1 ? bunn : bunn + (e - 1) * (langs < midt ? 135 : 85);
    // utenfor terskelen blir skålen grunnere, så den åpner seg nedover fjellsiden (ingen renne)
    const dybde = 120 * (1 - smooth((langs - bak - 110) / 60));
    mal = Math.max(mal, h - dybde);
    if (mal >= h + 8) continue;
    // myk minimum: kanten blir skarp, men uten trappetrinn i rutenettet
    h = lerp(h, smin(h, mal, 7), smooth(a * 1.2));
  }
  // Bakveggen når opp mot toppen: hver bre som har gravd langt inn, flater ut fjellsiden mot toppen.
  // Fra fire sider står toppen igjen som en spiss med fire flater og skarpe rygger mellom dem (tind).
  for (let k = 0; k < 4; k++) {
    const a = smooth((grav[k] - 0.55) / 0.45);
    if (a <= 0.001) continue;
    const { langs, tvers } = lokal(k, x, y);
    if (langs < -30 || langs > 55 || Math.abs(tvers) > langs + 60) continue;
    const flate = TOPP_HOYDE - 1.55 * langs;
    if (flate >= h + 8) continue;
    // bare øverst mot toppen; lenger ned er det bakveggen til skålen som gjelder
    const nar = 1 - smooth((langs - 22) / 30);
    h = lerp(h, smin(h, flate, 5), a * nar);
  }
  return h;
}

/**
 * Istykkelse fra bre k. Isen fyller skålen med en jevn, svakt hvelvet overflate (som en ekte botnbre),
 * så kanten følger en høydekote langs veggene. Overflaten stiger litt opp mot bakveggen.
 */
function isTykkelse(k: number, x: number, y: number, tilstand: BotnTilstand, berg: number) {
  const g = tilstand.is[k];
  if (g <= 0.001) return 0;
  const { e, langs, tvers, bak, midt, B } = skaal(k, x, y, tilstand.grav[k]);
  if (e > 1.3) return 0;
  const ut = 1 - smooth((langs - midt - 20) / 90);
  const niva =
    bunnHoyde(langs, 0, bak, B) + g * (10 + 22 * ut) + 26 * g * (1 - smooth((langs - bak) / 55)) - 5 * (tvers / B) ** 2;
  const maske = 1 - smooth((e - 0.95) / 0.3);
  // en ny, liten bre ligger som et tynt lag i forsenkningen før den har gravd ut en skål
  const tynn = g * 15 * (1 - smooth((e - 0.25) / 0.65)) * smooth((langs - bak + 6) / 46);
  return Math.max(Math.max(0, niva - berg) * maske, tynn);
}

let husk: { t: BotnTilstand | null; m: Map<number, number> } = { t: null, m: new Map() };

/** Istykkelsen (største av breene). Huskes per tilstand, siden farge og overflate spør om samme punkt. */
export function isHoyde(x: number, y: number, t: BotnTilstand, berg?: number) {
  if (husk.t !== t) husk = { t, m: new Map() };
  const nokkel = Math.round(x * 8) * 100000 + Math.round(y * 8);
  const lagret = husk.m.get(nokkel);
  if (lagret !== undefined) return lagret;
  const b = berg ?? bergHoyde(x, y, t.grav);
  let T = 0;
  for (let k = 0; k < 4; k++) T = Math.max(T, isTykkelse(k, x, y, t, b));
  husk.m.set(nokkel, T);
  return T;
}

/** Hvilke breer som ligger over punktet (for snøfargen på nye breer). */
function breerVed(x: number, y: number, t: BotnTilstand, T: number) {
  if (T <= 0.05) return 0;
  let sn = 0;
  for (let k = 0; k < 4; k++) {
    if (t.is[k] <= 0.001) continue;
    if (skaal(k, x, y, t.grav[k]).e < 1.3) sn = Math.max(sn, 1 - smooth(t.is[k] * 2.2));
  }
  return sn;
}

/** Overflaten som tegnes: berg + is. */
export function overflate(x: number, y: number, t: BotnTilstand) {
  const b = bergHoyde(x, y, t.grav);
  return b + isHoyde(x, y, t, b);
}

/* ---------- farger ---------- */

const BERG: Rgb = [128, 128, 118];
const BERG_MORK: Rgb = [92, 86, 80];
const LYNG: Rgb = [92, 106, 80];
const SNO: Rgb = [236, 242, 246];
const IS: Rgb = [188, 216, 232];
const IS_KANT: Rgb = [150, 186, 208];

export function farge(x: number, y: number, z: number, helning: number, t: BotnTilstand): Rgb {
  const { fbm } = stoy();
  const T = isHoyde(x, y, t);
  const v = fbm(x / 18, y / 18, 2);
  let c = blandRgb(BERG, BERG_MORK, smooth((helning - 0.9) / 1.2) * 0.85 + v * 0.12);
  c = blandRgb(LYNG, c, smooth((z - 70) / 70) * 0.85 + 0.15);
  // snø på slake, høye flater (glir av bratte vegger)
  const snoAndel = smooth((z - 214) / 30) * (1 - smooth((helning - 0.45) / 0.35)) * t.sno;
  c = blandRgb(c, SNO, snoAndel * (0.85 + v * 0.15));
  if (T > 0.05) {
    // ny bre: snøflekk først, så is (blåhvit) med mørkere kant
    let isF = blandRgb(IS_KANT, IS, smooth(T / 14));
    isF = blandRgb(isF, SNO, breerVed(x, y, t, T));
    c = blandRgb(c, isF, smooth(T / 6));
  }
  return c;
}

/* ---------- tilstand langs tidslinjen ---------- */

/**
 * Fase 1: snø blir til en liten bre (sv). Fase 2: sv graver en botn. Fase 3: so graver samtidig
 * (egg mellom sv og so). Fase 4: no og nv graver også (tind). Fase 5: isen smelter, formene står.
 * `frys` = tidslinjeposisjonen der gravingen stoppet (bryteren «isen står stille»).
 */
export function tilstandVed(p: number, frys = Infinity): BotnTilstand {
  const pg = Math.min(p, frys);
  const steg = (fra: number, til: number, q: number) => clamp((q - fra) / (til - fra));
  const grav = [
    smooth(steg(1, 2.4, pg)) * 0.8 + smooth(steg(2.4, 4, pg)) * 0.2,
    smooth(steg(2, 3.3, pg)) * 0.85 + smooth(steg(3.3, 4, pg)) * 0.15,
    smooth(steg(3, 4, pg)),
    smooth(steg(3.25, 4, pg)),
  ];
  const smelt = 1 - smooth(steg(4.05, 4.85, p));
  const is = [
    smooth(steg(0.05, 0.9, p)) * smelt,
    smooth(steg(2, 2.45, p)) * smelt,
    smooth(steg(3, 3.35, p)) * smelt,
    smooth(steg(3.2, 3.55, p)) * smelt,
  ];
  return { grav, is, sno: 1 };
}

/** Hvor skarp ryggen mellom sv og so er (0 = bred, 1 = skarp), til måleren. */
export function ryggSkarphet(grav: number[]) {
  return clamp(Math.min(grav[0], grav[1]) * 1.05);
}
