/**
 * Gamle vidder, unge fjorder og strandflaten: høydemodellen (ingen React).
 *
 * Blokken går fra havet i vest (x = 0) til innlandet i øst (x = LS_W), og y går innover (bort fra
 * kameraet). Høyden z er i figurenheter (overdrevet), 0 = havnivå.
 *
 * Klassisk modell (md l. 143): et gammelt, lavt, nesten flatt landskap (den paleiske flaten) heves mest
 * i vest (`hev`). Elvene får mer fall og graver V-daler (`elv`). Breene graver dalen ut til en U-dal med
 * bunn under havnivå (`bre`), og isen (`is`) fyller dalen og smelter bort igjen, så havet fyller fjorden.
 * Langs kysten slites landet ned til strandflaten (`strand`, md l. 147): en lav, flat brem som skrår svakt,
 * med øyer og holmer innerst og grunt hav ytterst, og fjordveggene innenfor (GeoBot1, 16.10).
 *
 * Annen modell (md l. 145): fjellene er høye og taggete fra starten (`fjell`), og istidene sliper ned
 * toppene mot snøgrensen (`slip`), uten mekanisme og uten høyde på snøgrensen (GeoBot1). `slutt` blander
 * inn det felles sluttbildet (vidde, fjord og strandflate). Alt regnes ut lat, ved første bruk.
 */
import { clamp, lerp, smooth } from "./isbre-kit";
import { lat } from "./prosess-kit";
import { blandRgb, lagStoy, type Rgb } from "./terreng-kit";

export const LS_W = 640;
export const LS_D = 360;
/** Snøgrensen i annen modell (figurenheter). Ingen høyde i figuren, bare linjen. */
export const SNOGRENSE = 196;

export type LandskapTilstand = {
  hev: number;
  elv: number;
  bre: number;
  is: number;
  strand: number;
  /** Annen modell: høye, taggete fjell (1) og nedsliping mot snøgrensen. */
  fjell: number;
  slip: number;
  /** Is ved og over snøgrensen (annen modell, fase 2). */
  isTopp: number;
  /** Blanding mot det felles sluttbildet (annen modell, fase 3). */
  slutt: number;
};

const stoy = lat(() => lagStoy(5281));

/** Fjordaksen (dalens midtlinje) som funksjon av x. */
export const fjordY = (x: number) => 182 + 16 * Math.sin(x / 118 + 0.3) + 6 * Math.sin(x / 41);
/** Den opprinnelige kystlinjen (der den paleiske flaten møter havet). */
const kyst = (y: number) => 104 + 10 * Math.sin(y / 53 + 1.1);
/** Dalhodet: elva og breen begynner her. */
const HODE = 560;

/** Den paleiske flaten: lav og nesten flat, svakt stigende innover; havbunn utenfor kysten. */
function paleisk(x: number, y: number) {
  const { fbm } = stoy();
  const land =
    12 + 12 * smooth((x - 110) / 420) + 4 * fbm(x / 80, y / 80, 3) + 1.5 * fbm(x / 22, y / 22, 2);
  const hav = -44 + 30 * smooth((x - 8) / 90);
  return lerp(hav, land, smooth((x - kyst(y) + 22) / 44));
}

/** Hevingen per x: null ved kysten, størst i vest (rett innenfor kysten) og avtakende østover. */
export const hevAndel = (x: number) =>
  smooth((x - 92) / 210) * (1 - 0.38 * smooth((x - 300) / 340));
const HEVING = 176;

/** Landet etter (delvis) heving, uten daler. */
function hevet(x: number, y: number, hev: number) {
  const { fbm } = stoy();
  return paleisk(x, y) + hev * (HEVING * hevAndel(x) + 9 * fbm(x / 46, y / 46, 2) * hevAndel(x));
}

/**
 * Hevet høyde langs en linje y = g(x), husket per x for gjeldende heving (nettet bruker de samme
 * x-verdiene i hver rad, så dalaksen og dalkanten regnes bare én gang per kolonne).
 */
function linjeHusk() {
  let hev = NaN;
  const m = new Map<number, number>();
  return (x: number, y: number, h: number) => {
    if (h !== hev) {
      hev = h;
      m.clear();
    }
    let v = m.get(x);
    if (v === undefined) {
      v = hevet(x, y, h);
      if (m.size > 4096) m.clear();
      m.set(x, v);
    }
    return v;
  };
}
const aksHoyde = linjeHusk();
const kantHoyde = linjeHusk();

/** Myk minimum (k = rundingsbredde), så dalkantene blir avrundet og uten trappetrinn. */
function smin(a: number, b: number, k: number) {
  return Math.min(a, b) - k * Math.log1p(Math.exp(-Math.abs(a - b) / k));
}

/** Hvor langt inn dalen går (1 i dalen, 0 forbi hodet). */
const dalMaske = (x: number, hode = HODE) => 1 - smooth((x - hode + 30) / 70);

/** V-dalens bunn når elva har gravd ferdig: lav ved kysten, stigende innover (mer fall nær kysten). */
const vBunn = (x: number) => 3 + 0.3 * Math.max(0, x - 96);
/** U-dalens bunn: grunnere ved munningen, dypest et stykke inne, over havnivå innerst (U-dal på land). */
function uBunn(x: number) {
  const inn = smooth((x - 92) / 70);
  const dyp = lerp(-22, -78, inn);
  return lerp(dyp, 96, smooth((x - 360) / 220));
}

/** Bergoverflaten i klassisk modell. */
function klassiskBerg(x: number, y: number, t: LandskapTilstand) {
  let h = hevet(x, y, t.hev);
  const d = Math.abs(y - fjordY(x));
  if (t.elv > 0.001) {
    // V-dal: bunnen senkes mot vBunn, sidene heller jevnt opp til flaten
    const aks = aksHoyde(x, fjordY(x), t.hev);
    const bunn = lerp(aks, Math.min(aks, vBunn(x)), t.elv * dalMaske(x));
    h = smin(h, bunn + d * 2.6, 5);
  }
  if (t.bre > 0.001) {
    // U-dal: bred, avrundet bunn og bratte sider; graver ned under havnivå
    const zU = uBunn(x) + 62 * (d / 48) ** 2;
    h = smin(h, lerp(h, zU, t.bre * dalMaske(x, HODE + 30)), 7);
  }
  if (t.strand > 0.001) h = strandflate(x, y, h, t.strand);
  return h;
}

/** Strandflatens indre kant (mot fjellsiden). */
export const bremIndre = (y: number) => 214 + 10 * Math.sin(y / 47);
/** Strandflatens ytre kant, der bremmen går over i havbunnen. */
const BREM_YTRE = 52;
/** Bremmen uten øyer: nesten flat, stiger jevnt og rett innover og krysser havnivå midt på. */
const bremSkraa = (x: number, y: number) =>
  lerp(-13, 13, clamp((x - BREM_YTRE) / (bremIndre(y) - BREM_YTRE)));

/** Strandflaten: kystlandet slites ned til en lav brem som skrår svakt utover, med øyer og holmer. */
function strandflate(x: number, y: number, h: number, s: number) {
  const { fbm } = stoy();
  const oyer = 24 * Math.max(0, fbm(x / 30 + 3.1, y / 26 - 1.7, 3) + 0.12) - 5;
  // øyene og skjærene ligger mest ytterst; innerst er bremmen jevnere, så den flate bremmen synes
  const mal = bremSkraa(x, y) + oyer * (1 - 0.6 * smooth((x - 90) / 100));
  const maske = 1 - smooth((x - bremIndre(y) + 8) / 30);
  return Math.min(h, lerp(h, mal, s * maske));
}

/**
 * Strandflaten i snittet (uten øyer): bremmen skrår svakt fra litt over til litt under havnivå og går
 * ytterst over i havbunnen. `s` = hvor langt strandflaten er dannet; `h` gis uendret utenfor bremmen.
 */
export function bremISnitt(x: number, y: number, h: number, s: number) {
  if (s <= 0.001) return h;
  const skraa = bremSkraa(x, y);
  const mal = x < BREM_YTRE ? Math.min(skraa, lerp(-44, -13, smooth((x + 30) / 60))) : skraa;
  // skarp knekk ved fjordkanten: bremmen stiger rett helt inn, så går snittet bratt ned i fjorden
  const maske = 1 - clamp((x - bremIndre(y)) / 4);
  return lerp(h, mal, s * maske);
}

/** Der bremmen krysser havnivå (x), langs linjen y. */
export const bremKryss = (y: number) => (BREM_YTRE + bremIndre(y)) / 2;

/** Annen modell: høye, taggete fjell over samme grunnform, nedslipt mot snøgrensen. */
function annenBerg(x: number, y: number, t: LandskapTilstand) {
  const { fbm } = stoy();
  const grunn = hevet(x, y, 1);
  const r = 1 - Math.abs(fbm(x / 92 + 7.3, y / 84 + 2.2, 3));
  const tagger = (r * r * 170 - 60 + 8 * fbm(x / 34, y / 34, 2)) * hevAndel(x);
  let h = grunn + t.fjell * Math.max(-30, tagger);
  if (t.slip > 0.001 && h > SNOGRENSE - 8) {
    const over = h - (SNOGRENSE - 8);
    h = lerp(h, SNOGRENSE - 8 + over * 0.12 + 3 * fbm(x / 30, y / 30, 2), smooth(t.slip));
  }
  if (t.slutt > 0.001) h = lerp(h, klassiskBerg(x, y, SLUTT), t.slutt);
  return h;
}

const SLUTT: LandskapTilstand = {
  hev: 1,
  elv: 1,
  bre: 1,
  is: 0,
  strand: 1,
  fjell: 0,
  slip: 0,
  isTopp: 0,
  slutt: 0,
};

export function bergHoyde(x: number, y: number, t: LandskapTilstand, b: boolean) {
  return b ? annenBerg(x, y, t) : klassiskBerg(x, y, t);
}

/** Istykkelse i dalen (klassisk modell, fase 4): breen fyller dalen og når ut til havet. */
export function isTykkelse(x: number, y: number, t: LandskapTilstand, berg: number) {
  if (t.is <= 0.001) return 0;
  const d = Math.abs(y - fjordY(x));
  // isoverflaten stiger innover, men holder seg under dalkanten og ender i dalhodet
  const kant = kantHoyde(x, fjordY(x) + 70, t.hev);
  const topp = Math.min(lerp(18, 200, smooth((x - 96) / 440)), kant - 14);
  const bredde = 50 + 14 * smooth((x - 300) / 200);
  const maske =
    (1 - smooth((d - bredde) / 18)) * smooth((x - 92) / 18) * (1 - smooth((x - HODE + 20) / 50));
  return Math.max(0, (topp - berg) * maske) * t.is;
}

/** Is ved og over snøgrensen (annen modell, fase 2). */
function isToppTykkelse(berg: number, t: LandskapTilstand) {
  if (t.isTopp <= 0.001) return 0;
  return 4 * t.isTopp * smooth((berg - (SNOGRENSE - 22)) / 18);
}

export type Felt = { berg: number; is: number; topp: number };

/** Berg og is i ett punkt. `b` = annen modell. */
export function felt(x: number, y: number, t: LandskapTilstand, b: boolean): Felt {
  const berg = bergHoyde(x, y, t, b);
  const is = b ? 0 : isTykkelse(x, y, t, berg);
  const topp = b ? isToppTykkelse(berg, t) : 0;
  return { berg, is, topp };
}

/** Overflaten som tegnes: berg + is, og havflaten der berget ligger under havnivå. */
export function overflate(x: number, y: number, t: LandskapTilstand, b: boolean) {
  const f = felt(x, y, t, b);
  return Math.max(f.berg + f.is + f.topp, 0);
}

/* ---------- farger ---------- */

const LYNG: Rgb = [118, 116, 86];
const GRONN: Rgb = [86, 104, 70];
const BERG: Rgb = [124, 124, 116];
const BERG_MORK: Rgb = [88, 86, 80];
const IS: Rgb = [206, 226, 238];
const IS_KANT: Rgb = [160, 192, 212];
const HAV_GRUNT: Rgb = [70, 140, 168];
const HAV_DYPT: Rgb = [30, 74, 102];
const STRAND: Rgb = [178, 168, 120];

export function farge(
  x: number,
  y: number,
  z: number,
  helning: number,
  t: LandskapTilstand,
  b: boolean,
): Rgb {
  return fargeFraFelt(x, y, helning, felt(x, y, t, b), t, b);
}

/** Som `farge`, men med berg og is ferdig regnet (figuren gjenbruker høydene fra nettet). */
export function fargeFraFelt(
  x: number,
  y: number,
  helning: number,
  f: Felt,
  t: LandskapTilstand,
  b: boolean,
): Rgb {
  const { fbm } = stoy();
  const v = fbm(x / 16, y / 16, 2);
  if (f.berg < 0 && f.is < 0.5) {
    // havet: grunt (lyst) nær land, dypt (mørkt) lenger ute og i fjorden
    return blandRgb(HAV_GRUNT, HAV_DYPT, smooth(-f.berg / 46) + v * 0.05);
  }
  let c = blandRgb(GRONN, LYNG, smooth((f.berg - 40) / 80) + v * 0.1);
  c = blandRgb(
    c,
    blandRgb(BERG, BERG_MORK, smooth((helning - 1.6) / 1.5)),
    smooth((helning - 0.75) / 0.6),
  );
  // strandflaten: lav, slitt brem (litt grå)
  const strand = b ? t.slutt : t.strand;
  if (strand > 0.05 && f.berg < 24 && x < 250)
    c = blandRgb(c, STRAND, strand * 0.75 * (1 - smooth((f.berg - 14) / 10)));
  if (f.is > 0.3) c = blandRgb(blandRgb(IS_KANT, IS, smooth(f.is / 30)), c, 1 - smooth(f.is / 4));
  if (f.topp > 0.05) c = blandRgb(c, IS, clamp(f.topp / 4) * 0.9);
  return c;
}

/* ---------- tilstand langs tidslinjene ---------- */

const steg = (fra: number, til: number, q: number) => clamp((q - fra) / (til - fra));

/** Klassisk modell, p = 0 … 5. */
export function klassiskVed(p: number): LandskapTilstand {
  const hev = smooth(steg(1, 2, p));
  const elv = smooth(steg(2, 3, p));
  const bre = smooth(steg(3.15, 3.85, p));
  const is = smooth(steg(3, 3.2, p)) * (1 - smooth(steg(3.82, 4, p)));
  const strand = smooth(steg(4, 5, p));
  return { hev, elv, bre, is, strand, fjell: 0, slip: 0, isTopp: 0, slutt: 0 };
}

/** Annen modell, p = 0 … 3. */
export function annenVed(p: number): LandskapTilstand {
  const fjell = 1;
  const slip = smooth(steg(1.1, 2, p));
  // isen ligger ved og over snøgrensen; den tynnes ut mot slutten av fasen, så de nedslipte toppene synes
  const isTopp =
    smooth(steg(1, 1.15, p)) *
    (1 - 0.6 * smooth(steg(1.6, 2, p))) *
    (1 - smooth(steg(2.05, 2.3, p)));
  const slutt = smooth(steg(2.1, 3, p));
  return { hev: 1, elv: 0, bre: 0, is: 0, strand: 0, fjell, slip, isTopp, slutt };
}

/** Til måleren «Høyde over havet»: et fast punkt på vidda (0 = lavt, 1 = høyt). */
export function viddeHoyde(t: LandskapTilstand, b: boolean) {
  return clamp(bergHoyde(470, 300, t, b) / 280);
}
