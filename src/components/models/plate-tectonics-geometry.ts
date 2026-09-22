export type BoundaryType =
  | "ridge"
  | "subduction_continent"
  | "subduction_island"
  | "collision"
  | "rift"
  | "transform"
  | "hotspot"
  | "paleomag";

/** 0 km sits at the top of the crust. Topography above this line is exaggerated. */
export const SEA_Y = 118;
export const PX_PER_KM = 1.55;
export const DEPTH_MAX_KM = 200;
export const TOPO_EXAG = 8;

export const AMPHIBOLE_KM = 90;
export const SERPENTINE_KM = 160;
export const FLUX_MELT_KM = 115;
export const CRUSTAL_ROOT_KM = 75;

export const JARAMILLO = { startMa: 0.988, endMa: 1.072 } as const;

export const MAG_CHRONS = [
  { name: "Gilbert", startMa: 3.596, endMa: 6.033, polarity: "reversed" },
  { name: "Gauss", startMa: 2.581, endMa: 3.596, polarity: "normal" },
  { name: "Matuyama", startMa: 0.781, endMa: 2.581, polarity: "reversed" },
  { name: "Brunhes", startMa: 0, endMa: 0.781, polarity: "normal" },
] as const;

export const HOTSPOT_STATIONS = [
  { ageMa: 0, label: "0 Ma · aktiv" },
  { ageMa: 1, label: "1 Ma" },
  { ageMa: 3, label: "3 Ma" },
  { ageMa: 5, label: "5 Ma" },
] as const;

const CROSS_SECTIONS: BoundaryType[] = [
  "ridge",
  "subduction_continent",
  "subduction_island",
  "collision",
  "rift",
  "hotspot",
];

const FORCE_LAYERS: BoundaryType[] = [
  "ridge",
  "subduction_continent",
  "subduction_island",
  "collision",
  "rift",
];

export function yDepth(km: number): number {
  return SEA_Y + km * PX_PER_KM;
}

export function showsDepthScale(boundary: BoundaryType): boolean {
  return CROSS_SECTIONS.includes(boundary);
}

export function layerAvailability(boundary: BoundaryType): {
  melting: boolean;
  quakes: boolean;
  forces: boolean;
} {
  return {
    melting: boundary !== "transform",
    quakes: true,
    forces: FORCE_LAYERS.includes(boundary),
  };
}

/** Full spreading rate at or below 4 cm/yr: Atlantic-type rift valley. */
export function isSlowSpreading(fullRateCmYr: number): boolean {
  return fullRateCmYr <= 4;
}

/** Full spreading rate at or above 8 cm/yr: East Pacific axial high. */
export function isFastSpreading(fullRateCmYr: number): boolean {
  return fullRateCmYr >= 8;
}

export function halfRateCmYr(fullRateCmYr: number): number {
  return fullRateCmYr / 2;
}

/** 1 cm/yr over 1 million years is 10 km. */
export function distanceKm(rateCmYr: number, ageMa: number): number {
  return rateCmYr * ageMa * 10;
}

export function ageMaAtDistance(distanceKmFromAxis: number, fullRateCmYr: number): number {
  const half = Math.max(halfRateCmYr(fullRateCmYr), 0.1);
  return Math.abs(distanceKmFromAxis) / (half * 10);
}

/** Thermal lithosphere thickness in km. About 11 km × √(age in Ma), at least the crust. */
export function lithosphereThicknessKm(ageMa: number): number {
  const age = Math.max(ageMa, 0.04);
  return Math.min(120, Math.max(8, 11 * Math.sqrt(age)));
}

export function ridgeAxisLabel(fullRateCmYr: number): string {
  if (isFastSpreading(fullRateCmYr)) return "Aksial høyde";
  if (isSlowSpreading(fullRateCmYr)) return "Sentral riftdal";
  return "Grunn aksial dal";
}

/**
 * Water depth in km. Slow ridges have a rift valley. Fast ridges have an axial high.
 * Shoulders of a slow ridge stay shallower than the valley floor.
 */
export function ridgeBathymetryKm(distanceFromAxisKm: number, fullRateCmYr: number): number {
  const age = ageMaAtDistance(distanceFromAxisKm, fullRateCmYr);
  const subsidence = 2.5 + 0.35 * Math.sqrt(age);
  const dist = Math.abs(distanceFromAxisKm);
  if (isFastSpreading(fullRateCmYr)) {
    return subsidence - 0.55 * Math.exp(-(dist * dist) / 500);
  }
  if (isSlowSpreading(fullRateCmYr)) {
    const valley = 1.7 * Math.exp(-(dist * dist) / 160);
    const shoulder = -0.7 * Math.exp(-((dist - 20) ** 2) / 220);
    return subsidence + valley + shoulder;
  }
  return subsidence + 0.55 * Math.exp(-(dist * dist) / 240);
}

export function rateCaption(boundary: BoundaryType, rate: number): string {
  switch (boundary) {
    case "ridge":
      if (isSlowSpreading(rate)) {
        return "Treg spredning med riftdal (Atlanterhavet, ca. 2,5 cm/år)";
      }
      if (isFastSpreading(rate)) {
        return "Rask spredning med aksial høyde (Øst-Stillehavet, ca. 10–15 cm/år)";
      }
      return "Middels spredning, mellom riftdal og aksial høyde";
    case "paleomag":
      return `Halvrate ${halfRateCmYr(rate).toFixed(1)} cm/år. Stripebredde = halvrate × alder`;
    case "subduction_continent":
      return "Relativ konvergens hav–kontinent (Nazca–Sør-Amerika, ca. 7 cm/år)";
    case "subduction_island":
      return "Relativ konvergens hav–hav (ofte 6–12 cm/år)";
    case "collision":
      return "Relativ konvergens kontinent–kontinent (Himalaya, ca. 4 cm/år)";
    case "rift":
      return "Strekkhastighet (Øst-Afrika, ca. 0,5–1 cm/år)";
    case "transform":
      return "Sidelengs relativ fart (San Andreas, ca. 3,5–5 cm/år)";
    case "hotspot":
      return "Platens fart over plymen (Hawaii, ca. 7–10 cm/år)";
  }
}

const BRUNHES_END_MA = 0.781;
const MATUYAMA_END_MA = 2.581;
const GAUSS_END_MA = 3.596;
const GILBERT_END_MA = 6.033;

export function polarityAtAge(ageMa: number, axial: "normal" | "reversed"): "normal" | "reversed" {
  if (ageMa < 0.06) return axial;
  if (ageMa >= JARAMILLO.startMa && ageMa <= JARAMILLO.endMa) return "normal";
  if (ageMa <= BRUNHES_END_MA) return "normal";
  if (ageMa <= MATUYAMA_END_MA) return "reversed";
  if (ageMa <= GAUSS_END_MA) return "normal";
  if (ageMa <= GILBERT_END_MA) return "reversed";
  return "normal";
}
