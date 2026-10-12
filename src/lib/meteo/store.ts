import { create } from "zustand";
import { DEFAULT_PRESET, type Preset } from "@/lib/meteo/presets";
import {
  cloneJets,
  climateModes,
  type ClimateModes,
  type JetId,
  type JetParams,
  type Jets,
} from "@/lib/meteo/physics";

export type Layers = {
  anomaly: boolean;
  precip: boolean;
  systems: boolean;
  highs: boolean;
  normal: boolean;
  arrows: boolean;
  rivers: boolean;
};

export type Focus = {
  name: string;
  lat: number;
  lon: number;
  jet: JetId;
  role: string;
};

type JetStore = {
  month: number;
  jets: Jets;
  selected: JetId;
  playing: boolean;
  landTick: number;
  layers: Layers;
  probe: { lat: number; lon: number };
  focus: Focus | null;
  mapZoom: number;
  mapCenter: { lon: number; lat: number };
  mapLarge: boolean;
  /** «Flere kontroller» åpent. Lagres i sessionStorage (geofag:jet:moreOpen). */
  moreOpen: boolean;
  /** ONI, −2 … +2. */
  oni: number;
  /** DMI, −1,5 … +1,5. */
  dmi: number;
  setMonth: (month: number) => void;
  setSelected: (id: JetId) => void;
  patchJet: (id: JetId, partial: Partial<JetParams>) => void;
  setOffsets: (id: JetId, offsets: number[]) => void;
  applyPreset: (preset: Preset) => void;
  clearBend: (id: JetId) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  toggleLayer: (key: keyof Layers) => void;
  setProbe: (probe: { lat: number; lon: number }) => void;
  setFocus: (focus: Focus | null) => void;
  setMapZoom: (zoom: number) => void;
  setMapCenter: (center: { lon: number; lat: number }) => void;
  toggleMapLarge: () => void;
  setMoreOpen: (open: boolean) => void;
  resetMap: () => void;
  markLand: () => void;
  setOni: (oni: number) => void;
  setDmi: (dmi: number) => void;
  setClimate: (oni: number, dmi: number, month: number | null) => void;
};

export const MORE_KEY = "geofag:jet:moreOpen";

export function readMoreOpen(): boolean {
  try {
    return window.sessionStorage.getItem(MORE_KEY) === "1";
  } catch {
    return false;
  }
}

const cleared = (jet: JetParams): JetParams => ({ ...jet, offsets: jet.offsets.map(() => 0) });

export const useJetStore = create<JetStore>((set) => ({
  month: DEFAULT_PRESET.month,
  jets: cloneJets(DEFAULT_PRESET.jets),
  selected: DEFAULT_PRESET.select,
  playing: false,
  landTick: 0,
  layers: { anomaly: true, precip: true, systems: true, highs: false, normal: true, arrows: true, rivers: true },
  probe: { lat: 58.97, lon: 5.73 },
  focus: null,
  mapZoom: 1,
  mapCenter: { lon: 10, lat: 20 },
  mapLarge: false,
  moreOpen: false,
  oni: 0,
  dmi: 0,
  setMonth: (month) => set({ month }),
  setSelected: (selected) => set({ selected }),
  patchJet: (id, partial) =>
    set((state) => ({
      jets: { ...state.jets, [id]: { ...state.jets[id], ...partial } },
    })),
  setOffsets: (id, offsets) =>
    set((state) => ({
      jets: { ...state.jets, [id]: { ...state.jets[id], offsets } },
    })),
  applyPreset: (preset) =>
    set({
      month: preset.month,
      jets: cloneJets(preset.jets),
      selected: preset.select,
    }),
  clearBend: (id) =>
    set((state) => ({
      jets: { ...state.jets, [id]: cleared(state.jets[id]) },
    })),
  togglePlay: () => set((state) => ({ playing: !state.playing })),
  setPlaying: (playing) => set({ playing }),
  toggleLayer: (key) => set((state) => ({ layers: { ...state.layers, [key]: !state.layers[key] } })),
  setProbe: (probe) => set({ probe }),
  setFocus: (focus) => set({ focus }),
  setMapZoom: (mapZoom) => set({ mapZoom: Math.max(1, Math.min(8, mapZoom)) }),
  setMapCenter: (mapCenter) => set({ mapCenter }),
  toggleMapLarge: () => set((state) => ({ mapLarge: !state.mapLarge })),
  setMoreOpen: (moreOpen) => {
    try {
      window.sessionStorage.setItem(MORE_KEY, moreOpen ? "1" : "0");
    } catch {
      /* privat modus e.l. */
    }
    set({ moreOpen });
  },
  resetMap: () => set({ mapZoom: 1, mapCenter: { lon: 10, lat: 20 } }),
  markLand: () => set((state) => ({ landTick: state.landTick + 1 })),
  setOni: (oni) => set({ oni: round1(oni) }),
  setDmi: (dmi) => set({ dmi: round1(dmi) }),
  setClimate: (oni, dmi, month) => set(month === null ? { oni, dmi } : { oni, dmi, month }),
}));

const round1 = (v: number) => Math.round(v * 10) / 10;

const modeCache = { oni: Number.NaN, dmi: Number.NaN, modes: climateModes(0, 0) };
/** Stabil ClimateModes for gitt ONI/DMI (samme objekt så lenge verdiene er like). */
export function modesFor(oni: number, dmi: number): ClimateModes {
  if (modeCache.oni !== oni || modeCache.dmi !== dmi) {
    modeCache.oni = oni;
    modeCache.dmi = dmi;
    modeCache.modes = climateModes(oni, dmi);
  }
  return modeCache.modes;
}

export function useClimateModes(): ClimateModes {
  const oni = useJetStore((s) => s.oni);
  const dmi = useJetStore((s) => s.dmi);
  return modesFor(oni, dmi);
}
