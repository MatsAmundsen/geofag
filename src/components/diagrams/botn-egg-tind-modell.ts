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
  { id: "so", vinkel: 290 },
  { id: "no", vinkel: 350 },
  { id: "nv", vinkel: 135 },
];
const RETNING = BREER.map((b) => {
  const a = (b.vinkel * Math.PI) / 180;
  return [Math.cos(a), Math.sin(a)] as [number, number];
});

/** `vann` (0 … 1): et lite vann i bunnen av botnene når isen er borte (fase 5). */
export type BotnTilstand = { grav: number[]; is: number[]; sno: number; vann: number };

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

/** Den glatte fjellsiden (uten støy) i avstand r fra toppen; brukes til botnbunnens høyde. */
function grunnform(r: number) {
  return 26 + 300 / (1 + (r / 188) ** 2.3) - 24 * Math.exp(-(((r - 175) / 70) ** 2));
}

/**
 * Formen på botn k ved fremdrift a: midten (`midt`) flytter seg innover mot toppen og skålen vokser.
 * `bak` er bakkanten (ρ = 1 inn mot toppen), `B` halv bredde.
 */
export function botnForm(a: number) {
  const sa = smooth(a);
  const midt = lerp(190, 116, sa);
  const rInn = lerp(52, 84, sa);
  const rUt = lerp(56, 74, sa);
  const B = lerp(50, 80, sa);
  return { sa, midt, rInn, rUt, B, bak: midt - rInn, gulv: grunnform(midt) - lerp(8, 92, sa) };
}

/**
 * Skålen til bre k: en glatt flate T = gulv + H·ρ², der ρ er normalisert avstand fra skålmidten.
 * H er stor inn mot toppen (bakveggen krummer bratt bakover og oppover), middels mot sidene og liten
 * mot munningen, så skålen får en lav terskel og går mykt over i fjellsiden nedenfor (der T blir
 * høyere enn fjellsiden). Gulvet heller svakt utover.
 */
function skaal(k: number, x: number, y: number, a: number) {
  const { langs, tvers } = lokal(k, x, y);
  const f = botnForm(a);
  const dl = (langs - f.midt) / (langs < f.midt ? f.rInn : f.rUt);
  const dt = tvers / f.B;
  const rho2 = dl * dl + dt * dt;
  const andel = rho2 > 1e-6 ? (dl * dl) / rho2 : 0;
  const Hside = lerp(46, 84, f.sa);
  const H = dl < 0 ? lerp(Hside, lerp(70, 140, f.sa), andel) : lerp(Hside, lerp(22, 44, f.sa), andel);
  const gulv = f.gulv - 0.16 * (langs - f.midt);
  return { e: rho2, dl, langs, tvers, bak: f.bak, midt: f.midt, B: f.B, gulv, flate: gulv + H * rho2 };
}

/** Myk minimum (k = rundingsbredde). */
function smin(a: number, b: number, k: number) {
  return Math.min(a, b) - k * Math.log1p(Math.exp(-Math.abs(a - b) / k));
}

/**
 * Bergoverflaten (uten is). Skålene skjærer inn i høydefeltet: først hard minimum mellom skålene (der
 * to skåler møtes blir ryggen skarp: egg, og der flere møtes blir toppen spiss: tind), så myk minimum
 * mot fjellsiden, så kanten mot det urørte fjellet blir avrundet.
 */
export function bergHoyde(x: number, y: number, grav: number[]) {
  const h = massiv(x, y);
  let skaaler = Infinity;
  for (let k = 0; k < 4; k++) {
    const a = grav[k];
    if (a <= 0.001) continue;
    const s = skaal(k, x, y, a);
    // en ny bre begynner med en grunn forsenkning; skålen tones inn
    skaaler = Math.min(skaaler, s.flate + (1 - smooth(a / 0.25)) * 260);
  }
  if (skaaler >= h + 40) return h;
  return smin(h, skaaler, 9);
}

/**
 * Istykkelse fra bre k. Isen følger skålbunnen med en jevn, svakt hvelvet overflate som stiger litt
 * opp mot bakveggen, og flyter ut over terskelen som en kort tunge nedover fjellsiden.
 */
function isTykkelse(k: number, x: number, y: number, tilstand: BotnTilstand, berg: number) {
  const g = tilstand.is[k];
  if (g <= 0.001) return 0;
  const s = skaal(k, x, y, tilstand.grav[k]);
  const dt = s.tvers / s.B;
  if (s.dl < -1.2 || s.dl > 2.2 || Math.abs(dt) > 1.25) return 0;
  // overflaten: litt over gulvet, høyere mot bakveggen, og den faller raskere utenfor terskelen
  const niva =
    s.gulv + g * (12 + 22 * Math.max(0, -s.dl) ** 1.5) - 6 * dt * dt - 60 * Math.max(0, s.dl - 0.55) ** 2 * (1 + dt * dt);
  const maske = (1 - smooth((Math.abs(dt) - 0.9) / 0.35)) * (1 - smooth((s.dl - 1.3) / 0.4)) * (1 - smooth((-s.dl - 0.95) / 0.3));
  // en ny, liten bre ligger som et tynt lag i forsenkningen før den har gravd ut en skål
  const tynn = g * 15 * (1 - smooth((s.e - 0.25) / 0.65));
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
    if (skaal(k, x, y, t.grav[k]).e < 1.6) sn = Math.max(sn, 1 - smooth(t.is[k] * 2.2));
  }
  return sn;
}

/**
 * Vannflaten i bunnen av en botn (eller −∞): når isen er borte, kan det samle seg vann i forsenkningen
 * bak terskelen. Flaten ligger litt over det laveste punktet i skålbunnen.
 */
function vannNiva(x: number, y: number, t: BotnTilstand, berg: number) {
  if (t.vann <= 0.001) return -Infinity;
  for (let k = 0; k < 4; k++) {
    if (t.grav[k] < 0.6) continue;
    const s = skaal(k, x, y, t.grav[k]);
    if (s.e > 0.7 || s.dl < -0.7 || s.dl > 0.45) continue;
    const f = botnForm(t.grav[k]);
    const niva = f.gulv + 5 * t.vann;
    if (berg < niva) return niva;
  }
  return -Infinity;
}

/** Overflaten som tegnes: berg + is (eller vann). */
export function overflate(x: number, y: number, t: BotnTilstand) {
  const b = bergHoyde(x, y, t.grav);
  return Math.max(b + isHoyde(x, y, t, b), vannNiva(x, y, t, b));
}

/* ---------- farger ---------- */

const BERG: Rgb = [132, 129, 120];
const BERG_LYS: Rgb = [164, 159, 146];
const BERG_MORK: Rgb = [82, 78, 73];
/** Lav og mose på slakt berg: grønngrå. */
const LAV: Rgb = [120, 122, 100];
const LYNG: Rgb = [80, 98, 66];
const LYNG_LYS: Rgb = [112, 122, 82];
/** Ur: løse blokker under bratte vegger, lysere og flekkete. */
const UR: Rgb = [150, 144, 132];
const SNO: Rgb = [238, 243, 247];
const FIRN: Rgb = [232, 239, 244];
const IS: Rgb = [184, 213, 231];
const IS_BLA: Rgb = [132, 178, 210];
const IS_KANT: Rgb = [150, 186, 208];
const SPREKK: Rgb = [84, 126, 160];
const SKITT: Rgb = [126, 124, 116];

const VANN: Rgb = [58, 104, 132];

/** Breen som ligger nærmest punktet (minst normalisert avstand i skålen), eller null. */
function naermesteBre(x: number, y: number, t: BotnTilstand) {
  let best: ReturnType<typeof skaal> | null = null;
  for (let k = 0; k < 4; k++) {
    if (t.is[k] <= 0.001) continue;
    const s = skaal(k, x, y, t.grav[k]);
    if (!best || s.e < best.e) best = s;
  }
  return best;
}

export function farge(x: number, y: number, z: number, helning: number, t: BotnTilstand): Rgb {
  const { fbm } = stoy();
  if (t.vann > 0.001) {
    const b = bergHoyde(x, y, t.grav);
    if (vannNiva(x, y, t, b) > b + 0.4) return blandRgb(VANN, [92, 140, 168], smooth((z - b) / 6) * 0.3);
  }
  const T = isHoyde(x, y, t);
  const v = fbm(x / 18, y / 18, 2);
  // fin tekstur (sprekker og flekker i berget) og strøk nedover bratte flater
  const fin = fbm(x / 11, y / 11, 3);
  const strok = fbm(x / 7, y / 26, 2);
  const bratt = smooth((helning - 0.8) / 1.0);
  let c = blandRgb(BERG, BERG_MORK, bratt * 0.72 + v * 0.14 + strok * 0.2 * bratt);
  c = fin > 0 ? blandRgb(c, BERG_LYS, fin * 0.6 * (1 - bratt * 0.4)) : blandRgb(c, BERG_MORK, -fin * 0.45);
  // benker og lag i bratte vegger: mørkere bånd som følger høyden
  const benk = smooth((Math.sin(z * 0.32 + v * 4 + strok * 2) - 0.55) / 0.4);
  c = blandRgb(c, BERG_MORK, benk * bratt * 0.45);
  // lav på slakt berg i midtre høyder
  c = blandRgb(c, LAV, (1 - bratt) * smooth((210 - z) / 70) * 0.32);
  // ur ved foten av bakveggene, der løse blokker samler seg
  for (let k = 0; k < 4; k++) {
    const a = t.grav[k];
    if (a < 0.35) continue;
    const s = skaal(k, x, y, a);
    if (s.dl >= -0.15 || s.e < 0.5 || s.e > 1.12) continue;
    const ur = (1 - Math.abs(s.e - 0.82) / 0.3) * smooth((a - 0.35) / 0.3) * (1 - bratt * 0.75);
    if (ur > 0) c = blandRgb(c, blandRgb(UR, BERG_MORK, clamp(0.35 - fin * 0.9)), ur * 0.8);
  }
  // lyng og gras lavt, i flekker, ikke på bratte flater
  const veg = smooth((135 - z) / 60 + v * 0.6) * (1 - smooth((helning - 0.6) / 0.45));
  c = blandRgb(c, blandRgb(LYNG, LYNG_LYS, fin * 0.5 + 0.5), veg * 0.88);
  // snø på slake, høye flater (glir av bratte vegger), i flekker
  const snoAndel = smooth((z - 206) / 34) * (1 - smooth((helning - 0.48) / 0.38)) * t.sno * smooth(0.55 + v * 1.5 + fin * 0.5);
  c = blandRgb(c, SNO, snoAndel * (0.86 + fin * 0.12));
  if (T > 0.05) {
    // ny bre: snøflekk først, så is: firn øverst, blåere nedover, sprekker ved terskelen og skitten kant
    let isF = blandRgb(IS_KANT, IS, smooth(T / 14));
    const s = naermesteBre(x, y, t);
    if (s) {
      isF = blandRgb(isF, FIRN, smooth((-s.dl - 0.05) / 0.6) * 0.85);
      isF = blandRgb(isF, IS_BLA, smooth((s.dl - 0.15) / 0.7) * 0.55);
      const band = smooth((s.dl - 0.3) / 0.15) * (1 - smooth((s.dl - 1.05) / 0.2));
      const sprekk = smooth((Math.sin(s.langs * 0.55) - 0.8) / 0.15) * band * smooth((T - 10) / 8);
      isF = blandRgb(isF, SPREKK, sprekk * 0.75);
    }
    isF = blandRgb(isF, SKITT, (1 - smooth(T / 5)) * 0.45);
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
    smooth(steg(3.1, 4, pg)),
  ];
  const smelt = 1 - smooth(steg(4.0, 4.35, p));
  const is = [
    smooth(steg(0.05, 0.9, p)) * smelt,
    smooth(steg(2.0, 2.35, p)) * smelt,
    smooth(steg(3.0, 3.3, p)) * smelt,
    smooth(steg(3.05, 3.35, p)) * smelt,
  ];
  const vann = smooth(steg(4.3, 4.8, p));
  return { grav, is, sno: 1, vann };
}

/** Hvor skarp ryggen mellom sv og so er (0 = bred, 1 = skarp), til måleren. */
export function ryggSkarphet(grav: number[]) {
  return clamp(Math.min(grav[0], grav[1]) * 1.25);
}
