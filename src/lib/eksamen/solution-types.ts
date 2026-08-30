export type FigureId =
  | "wind-low-nh"
  | "pressure-gradient"
  | "ekman-surface"
  | "jet-blocking"
  | "amoc-nadw"
  | "ts-density"
  | "water-masses"
  | "ctd-seasons"
  | "ice-albedo"
  | "monster-wave"
  | "perihelion"
  | "positive-feedback"
  | "coriolis-lat"
  | "gulf-nac"
  | "atmo-river"
  | "foehn"
  | "katabatic"
  | "radiation-balance"
  | "el-nino"
  | "hurricane-sst"
  | "nao"
  | "chlorophyll"
  | "hurricane-eye"
  | "spectrum"
  | "inland-climate"
  | "land-sea-breeze"
  | "convection"
  | "coriolis-deflect"
  | "wave-anatomy"
  | "earth-tilt"
  | "thermohaline"
  | "carbon-cycle"
  | "westerlies"
  | "hadley"
  | "paleo-proxy"
  | "density-mix"
  | "marine-heatwave"
  | "orographic-rain"
  | "wind-low-sh"
  | "wind-low-center"
  | "eccentricity"
  | "tree-ring"
  | "front-rain"
  | "snow-crystal"
  | "ozone-profile"
  | "jet-flight";

export type WhyNot = {
  option: string;
  text: string;
};

export type Solution = {
  kind: "mc" | "write";
  /** Kort fasit: bokstav eller 1–2 setninger. */
  fasit: string;
  /** Utfyllende pedagogisk forklaring, ett avsnitt per punkt. */
  why: string[];
  whyNot?: WhyNot[];
  steps?: string[];
  figures?: FigureId[];
  tip?: string;
  official: boolean;
};

type Extras = Partial<Pick<Solution, "whyNot" | "steps" | "figures" | "tip" | "official">>;

export function mc(fasit: string, why: string[], extras: Extras = {}): Solution {
  const { official, ...rest } = extras;
  return { kind: "mc", fasit, why, official: official ?? true, ...rest };
}

export function write(fasit: string, why: string[], extras: Extras = {}): Solution {
  const { official, ...rest } = extras;
  return { kind: "write", fasit, why, official: official ?? true, ...rest };
}
