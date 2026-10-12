import {
  emptyOffsets,
  neutralJet,
  type JetId,
  type JetParams,
  type Jets,
} from "@/lib/meteo/physics";

export type Preset = {
  id: string;
  name: string;
  blurb: string;
  month: number;
  select: JetId;
  jets: Jets;
};

function jets(patch: Partial<Record<JetId, Partial<JetParams>>>): Jets {
  const base: Jets = {
    npj: neutralJet(8, 5, 0.6),
    nstj: neutralJet(3, 5, 0.2),
    spj: neutralJet(7, 5, 1.1),
    sstj: neutralJet(2.5, 5, 0.4),
  };
  for (const id of Object.keys(patch) as JetId[]) {
    base[id] = { ...base[id], ...patch[id], offsets: emptyOffsets() };
  }
  return base;
}

export const PRESETS: Preset[] = [
  {
    id: "vinter",
    name: "Vinterbølger",
    blurb: "Januar med fem bølger. Polarjeten og den subtropiske jetstrømmen møtes i trågene.",
    month: 0,
    select: "npj",
    jets: jets({
      npj: { amp: 9, wave: 5, phase: 5.4105, latShift: 0, speedMul: 1 },
      nstj: { amp: 3, wave: 5, phase: 2.13, latShift: 4, speedMul: 1.35 },
      spj: { amp: 8, wave: 5, phase: 1.1, latShift: 0, speedMul: 1.15 },
      sstj: { amp: 2.5, wave: 5, phase: 0.6, latShift: 0, speedMul: 1.2 },
    }),
  },
  {
    id: "rett",
    name: "Rett jet",
    blurb: "Sonal vinter. Fronten ligger jevnt, og lavtrykkene fyker østover.",
    month: 0,
    select: "npj",
    jets: jets({
      npj: { amp: 1.2, wave: 6, phase: 0.2, latShift: 4, speedMul: 1.12 },
      nstj: { amp: 1, wave: 4, phase: 0, speedMul: 1 },
    }),
  },
  {
    id: "nao-pluss",
    name: "NAO+",
    blurb: "Sterk, nordlig atlanterhavsjet. Mildt og vått i Norge og på De britiske øyer.",
    month: 0,
    select: "npj",
    jets: jets({
      npj: { amp: 2.4, wave: 5, phase: 0.3, latShift: 8, speedMul: 1.28 },
      nstj: { amp: 1.5, wave: 4, phase: 0.2, speedMul: 1 },
    }),
  },
  {
    id: "nao-minus",
    name: "NAO−",
    blurb: "Rygg ved Grønland, tråg ned mot Middelhavet. Kaldt i Nord-Europa.",
    month: 0,
    select: "npj",
    jets: jets({
      npj: { amp: 14, wave: 4, phase: 4.3633, latShift: -2, speedMul: 0.92 },
      nstj: { amp: 3, wave: 4, phase: 1, speedMul: 1 },
    }),
  },
  {
    id: "usa",
    name: "Kulde i USA",
    blurb: "Dypt tråg over det østlige Nord-Amerika. Mild rygg i vest.",
    month: 0,
    select: "npj",
    jets: jets({
      npj: { amp: 14, wave: 5, phase: 5.4105, latShift: -1, speedMul: 1.05 },
    }),
  },
  {
    id: "juli",
    name: "Juli i nord",
    blurb: "Polarjeten ligger langt nord og er svak. Den subtropiske jetstrømmen i nord er nesten borte.",
    month: 6,
    select: "npj",
    jets: jets({
      npj: { amp: 4, wave: 5, phase: 0.8, latShift: 0, speedMul: 1 },
      nstj: { amp: 1.2, wave: 3, phase: 0.2, speedMul: 0.8 },
      spj: { amp: 6, wave: 4, phase: 1.2, latShift: -1, speedMul: 1.12 },
      sstj: { amp: 2.5, wave: 3, phase: 0.4, speedMul: 1.05 },
    }),
  },
  {
    id: "sor",
    name: "Sørvinter",
    blurb: "Juli sør for ekvator. Sterk og ganske rett polarjet rundt Sørishavet.",
    month: 6,
    select: "spj",
    jets: jets({
      spj: { amp: 6, wave: 4, phase: 1.4, latShift: -2, speedMul: 1.15 },
      sstj: { amp: 2.4, wave: 3, phase: 0.5, speedMul: 1.05 },
      npj: { amp: 4, wave: 5, phase: 0.5, speedMul: 1 },
    }),
  },
];

export const DEFAULT_PRESET = PRESETS[0]!;
