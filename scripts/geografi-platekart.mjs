// Bygger src/lib/geografi-platekart.json for figur 3.0 og 3.9 (Geografi, indre krefter).
// Kilder (alle Public Domain):
//  - Plategrenser: USGS-karttjenesten Tectonic Plate Boundaries, lag 1 «Plates» (1 175 linjer, Bird 2003),
//    og fra lag 0 bare «East African Rift System» (grensen Nubia/Somalia, som i USGS sitt forenklede platekart).
//  - Land: Natural Earth 1:110m Admin 0 – Countries, versjon 5.1.1.
//  - Varmeflekker: src/lib/geografi-varmeflekker-1996.json (avlest fra Kious & Tilling 1996).
// Projeksjon: Millers sylindriske, sentrert på Stillehavet. Lengdegrad 90° Ø til 110° Ø (380°, som USGS-kartet
// som overlapper litt i Asia). Kjør: node scripts/geografi-platekart.mjs
import { writeFileSync, readFileSync } from "node:fs";

const USGS = "https://earthquake.usgs.gov/arcgis/rest/services/eq/map_plateboundaries/MapServer";
const NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.1/geojson/ne_110m_admin_0_countries.geojson";
const hent = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`${r.status} ${u}`); return r.json(); };

const B = 1000, L0 = 90, SPENN = 380, NORD = 80, SOR = -72;
const k = B / ((SPENN * Math.PI) / 180);
const miller = (lat) => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * ((lat * Math.PI) / 180)));
const Y0 = k * miller(NORD);
const H = Math.round(Y0 - k * miller(SOR));
const px = (u) => ((u - L0) * Math.PI) / 180 * k;
const py = (lat) => Y0 - k * miller(Math.max(-85, Math.min(85, lat)));
const r1 = (v) => Math.round(v * 10) / 10;

/** Én linje eller ring i to kopier (lengdegrad og lengdegrad + 360), bare kopier som treffer utsnittet. */
function kopier(punkter, lukk) {
  const ut = [];
  for (const s of [0, 360]) {
    const xs = punkter.map(([lon]) => px(lon + s));
    if (Math.max(...xs) < -5 || Math.min(...xs) > B + 5) continue;
    // Hele piksler holder i et 1000 px bredt kart; like etterfølgende punkter slås sammen.
    let forrige = "";
    const deler = [];
    punkter.forEach(([, lat], i) => {
      const p = `${Math.round(xs[i])} ${Math.round(py(lat))}`;
      if (p !== forrige) deler.push(`${deler.length ? "L" : "M"}${p}`);
      forrige = p;
    });
    if (deler.length > 1) ut.push(deler.join("") + (lukk ? "Z" : ""));
  }
  return ut.join("");
}
const linjer = (g) => (g.type === "LineString" ? [g.coordinates] : g.type === "MultiLineString" ? g.coordinates : []);
const ringer = (g) => (g.type === "Polygon" ? g.coordinates : g.type === "MultiPolygon" ? g.coordinates.flat() : []);
/** Grenselinjer som krysser 180° deles opp i datasettet; lengdegrad over 180 justeres ikke. */
const tilHundreÅtti = (l) => l.map(([lon, lat]) => [lon > 180 ? lon - 360 : lon, lat]);

/** Deler en linje der den hopper over 180° (fra +180 til -180), så hoppet ikke tegnes tvers over kartet. */
function delVed180(l) {
  const deler = [[l[0]]];
  for (let i = 1; i < l.length; i++) {
    if (Math.abs(l[i][0] - l[i - 1][0]) > 180) deler.push([]);
    deler.at(-1).push(l[i]);
  }
  return deler.filter((d) => d.length > 1);
}

const plater = [];
for (const off of [0, 1000]) {
  const d = await hent(`${USGS}/1/query?where=1%3D1&outFields=NAME,LABEL&outSR=4326&f=geojson&resultOffset=${off}&resultRecordCount=1000&orderByFields=OBJECTID`);
  plater.push(...d.features);
}
if (plater.length !== 1175) throw new Error(`ventet 1175 grenselinjer, fikk ${plater.length}`);
const rift = await hent(`${USGS}/0/query?where=NAME%3D%27East%20African%20Rift%20System%27&outFields=NAME,LABEL&outSR=4326&f=geojson`);
const land = await hent(NE);

const grenser = { "Divergent Boundary": "", "Convergent Boundary": "", "Transform Boundary": "", Other: "" };
for (const f of [...plater, ...rift.features]) {
  const kl = f.properties.LABEL in grenser ? f.properties.LABEL : "Other";
  for (const l of linjer(f.geometry)) for (const del of delVed180(tilHundreÅtti(l))) grenser[kl] += kopier(del, false);
}
let landD = "";
for (const f of land.features) for (const r of ringer(f.geometry)) landD += kopier(r, true);

const u = (lon) => (lon < L0 - 0.001 ? lon + 360 : lon);
const pkt = (lon, lat) => ({ x: r1(px(u(lon))), y: r1(py(lat)) });
// Platenavn som i USGS (2026) Simplified Plate Tectonic Map, oversatt. Plassering valgt for lesbarhet.
const NAVN = [
  ["Den eurasiske platen", 128, 63], ["Den eurasiske platen", 62, 56], ["Den nordamerikanske platen", -102, 54],
  ["Stillehavsplaten", -158, 28], ["Stillehavsplaten", -128, -38], ["Den søramerikanske platen", -48, -14],
  ["Nazcaplaten", -93, -22], ["Kokosplaten", -98, 5, "liten"], ["Den karibiske platen", -73, 15, "liten"],
  ["Den filippinske platen", 133, 19, "liten"], ["Scotiaplaten", -45, -58, "liten"], ["Antarktisplaten", -110, -64],
  ["Antarktisplaten", 55, -62], ["Nubiaplaten", 8, 14], ["Somaliaplaten", 58, -12], ["Den arabiske platen", 46, 24, "liten"],
  ["Den indiske platen", 72, 2], ["Den australske platen", 133, -27],
].map(([navn, lon, lat, liten]) => ({ navn, ...pkt(lon, lat), liten: Boolean(liten) }));
const vf = JSON.parse(readFileSync(new URL("../src/lib/geografi-varmeflekker-1996.json", import.meta.url), "utf8"));
const varmeflekker = vf.varmeflekker.map((v) => ({ navn: v.navn, ...pkt(v.lon, v.lat) }));
// Rute for ekvator og datolinjen hjelper lesingen; tegnes i komponenten.
const ekvator = r1(py(0));

const ut = {
  kilde: "USGS Tectonic Plate Boundaries (Bird 2003), lag 1 og East African Rift System fra lag 0; Natural Earth 1:110m Admin 0 v5.1.1; varmeflekker avlest fra Kious & Tilling (1996). Alle Public Domain. Millers sylindriske projeksjon, 90° Ø–110° Ø (380°).",
  bredde: B, hoyde: H, ekvator, land: landD,
  grenser, plater: NAVN, varmeflekker,
};
writeFileSync(new URL("../src/lib/geografi-platekart.json", import.meta.url), JSON.stringify(ut));
console.log("skrev geografi-platekart.json", { H, landKB: Math.round(landD.length / 1024), grenseKB: Math.round(Object.values(grenser).join("").length / 1024) });
