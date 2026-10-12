import { CLIMATE_NOTE, CLIMATE_SUMMARY, STORY } from "@/lib/meteo/fagtekst";
import { continentalityAt } from "@/lib/meteo/land";
import {
  anomalyAt,
  couplings,
  evaluate,
  formatLat,
  formatLon,
  jetHem,
  jetKind,
  ensoSeasonWeight,
  ensoAmp,
  iodAmp,
  isDjf,
  ensoTemperature,
  iodSeasonWeight,
  iodTemperature,
  OVER_DEG,
  monthName,
  modePrecip,
  nb,
  phaseSpeed,
  precipAt,
  ribbonAscent,
  ribbonCurv,
  ribbonLat,
  riverHit,
  polarId,
  scenarioJets,
  subId,
  type PassMode,
  stationaryWave,
  temperatureAt,
  weatherKind,
  windAt,
  type Atmosphere,
  type ClimateModes,
  type JetId,
  type Jets,
  type SkyKind,
  CLIMATE_OFF,
} from "@/lib/meteo/physics";

export type Report = {
  title: string;
  coords: string;
  temp: number;
  anomaly: number;
  precip: number;
  weather: string;
  windLine: string;
  story: string;
  range?: string;
};

type Region = { name: string; lat0: number; lat1: number; lon0: number; lon1: number };

const REGIONS: Region[] = [
  { name: "Rogaland", lat0: 58.2, lat1: 59.9, lon0: 4.4, lon1: 7.2 },
  { name: "Sør-Norge", lat0: 58, lat1: 63.5, lon0: 4, lon1: 12 },
  { name: "Vestlandet", lat0: 59, lat1: 63, lon0: 4, lon1: 8 },
  { name: "Østlandet", lat0: 59, lat1: 63, lon0: 8, lon1: 13 },
  { name: "Trøndelag", lat0: 63, lat1: 65.2, lon0: 8, lon1: 14 },
  { name: "Nord-Norge", lat0: 65, lat1: 71.5, lon0: 12, lon1: 32 },
  { name: "Storbritannia", lat0: 50, lat1: 59, lon0: -8, lon1: 2 },
  { name: "Island", lat0: 63, lat1: 67, lon0: -25, lon1: -13 },
  { name: "Irland", lat0: 51.3, lat1: 55.5, lon0: -11, lon1: -5 },
  { name: "Den iberiske halvøy", lat0: 36, lat1: 44, lon0: -10, lon1: 3 },
  { name: "Frankrike", lat0: 43, lat1: 51, lon0: -5, lon1: 8 },
  { name: "Alpene", lat0: 44, lat1: 48, lon0: 5, lon1: 16 },
  { name: "Middelhavet", lat0: 30, lat1: 44, lon0: -5, lon1: 36 },
  { name: "Tyskland og Polen", lat0: 48, lat1: 55, lon0: 6, lon1: 24 },
  { name: "Baltikum", lat0: 54, lat1: 60, lon0: 20, lon1: 30 },
  { name: "Grønland", lat0: 60, lat1: 84, lon0: -75, lon1: -15 },
  { name: "Østlige USA", lat0: 30, lat1: 47, lon0: -90, lon1: -70 },
  { name: "Midtvesten", lat0: 36, lat1: 49, lon0: -104, lon1: -86 },
  { name: "Vestkysten av USA", lat0: 32, lat1: 49, lon0: -125, lon1: -116 },
  { name: "Alaska", lat0: 54, lat1: 72, lon0: -170, lon1: -140 },
  { name: "Mexico", lat0: 15, lat1: 32, lon0: -118, lon1: -86 },
  { name: "Amazonas", lat0: -10, lat1: 5, lon0: -75, lon1: -48 },
  { name: "Patagonia", lat0: -55, lat1: -38, lon0: -75, lon1: -62 },
  { name: "Chile", lat0: -45, lat1: -18, lon0: -76, lon1: -68 },
  { name: "Japan", lat0: 31, lat1: 45, lon0: 130, lon1: 146 },
  { name: "Øst-Kina", lat0: 22, lat1: 40, lon0: 105, lon1: 122 },
  { name: "Sibir", lat0: 50, lat1: 72, lon0: 60, lon1: 140 },
  { name: "India", lat0: 8, lat1: 30, lon0: 70, lon1: 90 },
  { name: "Sahara", lat0: 16, lat1: 30, lon0: -15, lon1: 35 },
  { name: "Sør-Afrika", lat0: -35, lat1: -22, lon0: 15, lon1: 33 },
  { name: "Sørøst-Australia", lat0: -40, lat1: -28, lon0: 140, lon1: 154 },
  { name: "New Zealand", lat0: -47, lat1: -34, lon0: 166, lon1: 179 },
];

export const PLACES: { name: string; lat: number; lon: number }[] = [
  { name: "Stavanger", lat: 58.97, lon: 5.73 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "Chicago", lat: 41.88, lon: -87.63 },
  { name: "Los Angeles", lat: 34.05, lon: -118.24 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Buenos Aires", lat: -34.6, lon: -58.38 },
];

function inLon(lon: number, a: number, b: number): boolean {
  return lon >= a && lon <= b;
}

export function regionName(lat: number, lon: number): string {
  for (const place of PLACES) {
    if (Math.hypot(lat - place.lat, lon - place.lon) < 1.4) return place.name;
  }
  for (const region of REGIONS) {
    if (lat >= region.lat0 && lat <= region.lat1 && inLon(lon, region.lon0, region.lon1)) {
      return region.name;
    }
  }
  if (lat > 66) return lon > -20 && lon < 50 ? "Barentshavet" : "Arktis";
  if (lat < -60) return "Sørishavet";
  if (Math.abs(lat) < 12) {
    if (lon > -20 && lon < 50) return "det tropiske Atlanterhavet";
    if (lon > 50 && lon < 110) return "det tropiske Indiahavet";
    return "det tropiske Stillehavet";
  }
  if (lat > 0 && lon > -70 && lon < 20) return "Nord-Atlanteren";
  if (lat > 0 && lon >= 20 && lon < 120) return "Eurasia";
  if (lat > 0 && (lon >= 120 || lon < -100)) return "Nord-Stillehavet";
  if (lat > 0) return "Nord-Amerika";
  if (lon > -60 && lon < 20) return "Sør-Atlanteren";
  if (lon >= 20 && lon < 120) return "Det indiske hav";
  return "Sør-Stillehavet";
}

function weatherWord(temp: number, precip: number): string {
  if (precip < 1.6) return "stort sett opphold";
  if (temp <= 0.5 && precip >= 2) return precip > 10 ? "kraftig snø" : "snø";
  if (precip > 16) return "kraftig regn";
  if (precip > 6) return "regn";
  return "skyer og lett nedbør";
}

export function reportAt(
  lat: number,
  lon: number,
  jets: Jets,
  month: number,
  atm?: Atmosphere,
  modes: ClimateModes = CLIMATE_OFF,
): Report {
  const sky = atm ?? evaluate(jets, month, modes);
  const cont = continentalityAt(lat, lon);
  const temp = temperatureAt(lat, lon, sky, month, cont);
  const anomaly = anomalyAt(lat, lon, sky, month, cont);
  const rain = precipAt(lat, lon, sky, month, cont);
  const wind = windAt(lat, lon, sky);
  const hem = lat >= 0 ? "N" : "S";
  const id = polarId(hem);
  const jet = jets[id];
  const rb = sky.ribbons[id];
  const jLat = ribbonLat(rb, lon);
  const distDeg = Math.abs(lat - jLat);
  const distKm = Math.round(distDeg * 111);
  const poleward = hem === "N" ? lat - jLat : jLat - lat;
  const curv = ribbonCurv(rb, lon);
  const climb = ribbonAscent(rb, lon);
  const side =
    poleward > OVER_DEG
      ? "på den kalde siden av polarjeten"
      : poleward < -OVER_DEG
        ? "på den varme siden av polarjeten"
        : "inne i polarfronten, med mild luft på ekvatorsiden og kald luft på polsiden";
  const jetCardinal = hem === "N" ? (jLat < lat ? "sør" : "nord") : jLat > lat ? "nord" : "sør";

  let pattern: string;
  if (jet.amp < 2.4 && Math.max(...jet.offsets.map(Math.abs)) < 3) {
    pattern =
      "Banen er nesten rett. Lavtrykkene løper raskt østover langs fronten, og samme vær blir sjelden liggende.";
  } else if (curv > 0.012) {
    pattern =
      "Her bøyer jetstrømmen mot ekvator, et tråg. Øst for tråget stiger luften, og nedbøren samler seg der.";
  } else if (curv < -0.012) {
    pattern =
      "Her bøyer jetstrømmen mot polen, en rygg. Luften synker, så det blir roligere og ofte tørrere.";
  } else if (climb > 0.28) {
    pattern = "Stedet ligger nedstrøms for et tråg. Stigende luft gir skyer og nedbør langs stormbanen.";
  } else if (climb < -0.28) {
    pattern = "Stedet ligger under nedgående luft nær en rygg, så bygene dempes.";
  } else {
    pattern = "Bølgen er moderat på denne lengdegraden, mellom tråg og rygg.";
  }

  const anomalyLine =
    anomaly <= -4
      ? STORY.colder
      : anomaly >= 4
        ? STORY.milder
        : STORY.near;

  const block =
    jet.amp >= 12 && jet.wave <= 4 && Math.abs(rb.phaseMs) < 12 && curv < -0.01
      ? STORY.block
      : "";

  const hill = rain.range
    ? STORY.hill(rain.range)
    : "";

  const sub = sky.ribbons[subId(hem)];
  const gap = Math.abs(jLat - ribbonLat(sub, lon));
  const meet =
    gap < 8
      ? STORY.meet
      : "";
  const river = riverHit(lat, lon, sky);
  const plume =
    river > 0.35
      ? STORY.plume
      : "";

  const where = STORY.where(jetCardinal, side);
  const story = `${where} ${pattern} ${anomalyLine}${block}${hill}${meet}${plume}${climateNote(lat, lon, sky.modes, month)}`;

  const jetBit = wind.jet
    ? ` I ${wind.jetName} over deg er det om lag ${nb(wind.jet, 0)} m/s (${nb(wind.jet * 3.6, 0)} km/t).`
    : "";
  const windLine = `${wind.from.charAt(0).toUpperCase()}${wind.from.slice(1)}lig vind, ${nb(wind.surface, 0)} m/s nær bakken.${jetBit}`;

  return {
    title: regionName(lat, lon),
    coords: `${formatLat(lat)}, ${formatLon(lon)}`,
    temp,
    anomaly,
    precip: rain.rate,
    weather: weatherWord(temp, rain.rate),
    windLine,
    story,
    range: rain.range,
  };
}

function climateNote(lat: number, lon: number, modes: ClimateModes, month: number): string {
  const bits: string[] = [];
  const ensoT = ensoSeasonWeight(month) * ensoTemperature(lat, lon, ensoAmp(modes));
  if (Math.abs(ensoT) >= 0.35 && modes.enso !== "off") {
    const name = modes.enso === "nino" ? "El Niño" : "La Niña";
    bits.push(ensoT > 0 ? CLIMATE_NOTE.warmer(name) : CLIMATE_NOTE.colder(name));
  }
  const iodT = iodSeasonWeight(month) * iodTemperature(lat, lon, iodAmp(modes));
  if (Math.abs(iodT) >= 0.35 && modes.iod !== "off") {
    const name = modes.iod === "positive" ? "Positiv IOD" : "Negativ IOD";
    bits.push(iodT > 0 ? CLIMATE_NOTE.warmer(name) : CLIMATE_NOTE.colder(name));
  }
  const rain = modePrecip(lat, lon, modes, month);
  if (Math.abs(rain) >= 2) bits.push(rain > 0 ? CLIMATE_NOTE.wetter : CLIMATE_NOTE.drier);
  return bits.length ? ` ${bits.join(" ")}` : "";
}

export function climateSummary(modes: ClimateModes, month?: number): string {
  const bits: string[] = [];
  if (modes.enso === "nino") bits.push(CLIMATE_SUMMARY.nino);
  else if (modes.enso === "nina") bits.push(CLIMATE_SUMMARY.nina);
  if (modes.iod === "positive") bits.push(CLIMATE_SUMMARY.iodPositive);
  else if (modes.iod === "negative") bits.push(CLIMATE_SUMMARY.iodNegative);
  if (modes.iod !== "off" && month !== undefined && isDjf(month)) bits.push(CLIMATE_SUMMARY.iodOffSeason);
  return bits.join(" ");
}

export function worldHeadline(jets: Jets, month: number, modes: ClimateModes = CLIMATE_OFF): { title: string; detail: string } {
  const id: JetId = "npj";
  const jet = jets[id];
  const c = phaseSpeed(jet, id, month);
  const shape =
    jet.amp < 2 ? "nesten rett" : jet.amp < 7 ? "svakt bølgete" : jet.amp < 13 ? "bølgete" : "sterkt svingete";
  const motion =
    Math.abs(c) < 4
      ? "mønsteret ligger nesten i ro"
      : c > 0
        ? `mønsteret driver østover med ${nb(c, 0)} m/s`
        : `mønsteret driver vestover med ${nb(Math.abs(c), 0)} m/s`;
  const blocking = jet.amp >= 12 && jet.wave <= 4 && Math.abs(c) < 12;
  const south = month >= 5 && month <= 7 ? " Sør for ekvator er det vinter, og polarjeten der er på det sterkeste." : "";
  const meet = couplings(evaluate(jets, month, modes));
  const climate = climateSummary(modes, month);
  const cross = meet.length
    ? ` ${meet.map((item) => (item.crossed ? "Jetstrømmene krysser" : "Jetstrømmene nærmer seg") + (item.hem === "N" ? " på den nordlige halvkule" : " på den sørlige halvkule")).join(". ")}. Der de møtes blir løftet sterkere, og lavtrykkene samler seg i venstre utgang.`
    : "";
  return {
    title: `${monthName(month)} · polarjeten i nord er ${shape}`,
    detail: blocking
      ? `${motion}. Lang bølge og liten fasefart gir blokkeringsfare, så været kan bli liggende.${south}${cross}${climate ? ` ${climate}` : ""}`
      : `${motion}. Bølgetall ${jet.wave}.${south}${cross}${climate ? ` ${climate}` : ""}`,
  };
}

export function phaseCaption(jets: Jets, id: JetId, month: number): string {
  const c = phaseSpeed(jets[id], id, month);
  const nStar = stationaryWave(jets[id], id, month);
  const lat = jetHem(id) === "N" ? 50 : -50;
  const circ = 2 * Math.PI * 6_371_000 * Math.cos((Math.abs(lat) * Math.PI) / 180);
  if (Math.abs(c) < 3) {
    return `Fasefarten er nesten null. En bølge med bølgetall nær ${nb(nStar, 1)} blir stående, og været låser seg.`;
  }
  const days = circ / Math.abs(c) / 86_400;
  const way = c > 0 ? "østover" : "vestover";
  return `Fasefart ${nb(c, 0)} m/s ${way}. Mønsteret bruker om lag ${nb(days, 0)} døgn på en runde. Stående bølge ved bølgetall ${nb(nStar, 1)}.`;
}

export function jetLabel(id: JetId): string {
  const hem = jetHem(id) === "N" ? "nord" : "sør";
  return jetKind(id) === "polar" ? `Polarjet, ${hem}` : `Subtropisk jet, ${hem}`;
}

export type FocusSite = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  jet: JetId;
  role: string;
  kind: SkyKind;
  temp: number;
  tag: string;
};

/** Fixed places a jet can sweep. The pin never follows the wave. */
export const FIXED_AREAS: Omit<FocusSite, "role" | "kind" | "temp" | "tag">[] = [
  { id: "stavanger", name: "Stavanger", lat: 58.97, lon: 5.73, jet: "npj" },
  { id: "london", name: "London", lat: 51.5, lon: -0.12, jet: "npj" },
  { id: "reykjavik", name: "Reykjavík", lat: 64.15, lon: -21.94, jet: "npj" },
  { id: "newfoundland", name: "Newfoundland", lat: 47.6, lon: -52.7, jet: "npj" },
  { id: "newyork", name: "New York", lat: 40.71, lon: -74.0, jet: "npj" },
  { id: "chicago", name: "Chicago", lat: 41.88, lon: -87.63, jet: "npj" },
  { id: "seattle", name: "Seattle", lat: 47.6, lon: -122.33, jet: "npj" },
  { id: "anchorage", name: "Anchorage", lat: 61.2, lon: -149.9, jet: "npj" },
  { id: "tokyo", name: "Tokyo", lat: 35.68, lon: 139.69, jet: "nstj" },
  { id: "kamchatka", name: "Kamtsjatka", lat: 53.0, lon: 158.65, jet: "npj" },
  { id: "novosibirsk", name: "Novosibirsk", lat: 55.0, lon: 82.9, jet: "npj" },
  { id: "roma", name: "Roma", lat: 41.9, lon: 12.5, jet: "nstj" },
  { id: "lisboa", name: "Lisboa", lat: 38.72, lon: -9.14, jet: "nstj" },
  { id: "azores", name: "Azorene", lat: 37.74, lon: -25.67, jet: "nstj" },
  { id: "buenos", name: "Buenos Aires", lat: -34.6, lon: -58.38, jet: "sstj" },
  { id: "patagonia", name: "Patagonia", lat: -46.5, lon: -71.0, jet: "spj" },
  { id: "cape", name: "Cape Town", lat: -33.9, lon: 18.42, jet: "sstj" },
  { id: "melbourne", name: "Melbourne", lat: -37.81, lon: 144.96, jet: "spj" },
  { id: "christchurch", name: "Christchurch", lat: -43.53, lon: 172.64, jet: "spj" },
  { id: "falklands", name: "Falklandsøyene", lat: -51.7, lon: -57.85, jet: "spj" },
];

export function focusSites(
  jets: Jets,
  month: number,
  atm?: Atmosphere,
  modes: ClimateModes = CLIMATE_OFF,
): FocusSite[] {
  const sky = atm ?? evaluate(jets, month, modes);
  return FIXED_AREAS.map((area) => {
    const cont = continentalityAt(area.lat, area.lon);
    const temp = temperatureAt(area.lat, area.lon, sky, month, cont);
    const rain = precipAt(area.lat, area.lon, sky, month, cont).rate;
    const wind = windAt(area.lat, area.lon, sky).surface;
    const hem = area.lat >= 0 ? "N" : "S";
    const polarDist = Math.abs(area.lat - ribbonLat(sky.ribbons[polarId(hem)], area.lon));
    const subDist = Math.abs(area.lat - ribbonLat(sky.ribbons[subId(hem)], area.lon));
    const polarOver = polarDist < OVER_DEG;
    const subOver = subDist < OVER_DEG;
    const tag = polarOver && subOver ? "begge over" : polarOver ? "polarjet" : subOver ? "subtropisk" : "ingen over";
    const role =
      polarOver && subOver
        ? "Polarjeten og den subtropiske jetstrømmen møtes over området"
        : polarOver
          ? "Polarjeten ligger over området"
          : subOver
            ? "Den subtropiske jetstrømmen ligger over området"
            : `Nærmeste jetstrøm er om lag ${nb(Math.min(polarDist, subDist) * 111, 0)} km unna`;
    return { ...area, role, kind: weatherKind(temp, rain, wind), temp, tag };
  });
}

export type PlaceWeather = {
  now: Report;
  polar: Report;
  sub: Report;
  meet: Report;
  line: string;
};

function situationAt(
  site: { lat: number; lon: number },
  jets: Jets,
  month: number,
  modes: ClimateModes,
  mode: PassMode,
): Report {
  const shaped = scenarioJets(jets, month, site, mode);
  return reportAt(site.lat, site.lon, shaped, month, evaluate(shaped, month, modes));
}

export function placeWeather(
  site: { lat: number; lon: number; name: string; role: string },
  jets: Jets,
  month: number,
  modes: ClimateModes = CLIMATE_OFF,
): PlaceWeather {
  const now = situationAt(site, jets, month, modes, "now");
  const polar = situationAt(site, jets, month, modes, "polar");
  const sub = situationAt(site, jets, month, modes, "sub");
  const meet = situationAt(site, jets, month, modes, "meet");
  const alone = Math.max(polar.precip, sub.precip);
  const extra = meet.precip - alone;
  const rainBit =
    extra > 2
      ? `${nb(extra, 0)} mm mer nedbør i døgnet enn den våteste av dem alene`
      : "nedbøren omtrent som når den våteste av dem ligger alene over stedet";
  const line = `Banen du tegnet: ${nb(now.temp, 0)}° og ${now.weather}. Hvis banen bøyes slik at polarjeten ligger over: ${nb(polar.temp, 0)}° og ${polar.weather}. Hvis den subtropiske ligger over: ${nb(sub.temp, 0)}° og ${sub.weather}. Hvis begge møtes over stedet: ${nb(meet.temp, 0)}° og ${meet.weather}, med ${rainBit}. ${site.role}`;
  return { now, polar, sub, meet, line };
}
