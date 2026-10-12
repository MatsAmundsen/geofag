import { create } from "zustand";
import { DEFAULT_PRESET, type Preset } from "@/lib/meteo/presets";
import {
  cloneJets,
  type EnsoPhase,
  type IodPhase,
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
  enso: EnsoPhase;
  iod: IodPhase;
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
  resetMap: () => void;
  markLand: () => void;
  setEnso: (enso: EnsoPhase) => void;
  setIod: (iod: IodPhase) => void;
};

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
  enso: "off",
  iod: "off",
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
  resetMap: () => set({ mapZoom: 1, mapCenter: { lon: 10, lat: 20 } }),
  markLand: () => set((state) => ({ landTick: state.landTick + 1 })),
  setEnso: (enso) => set({ enso }),
  setIod: (iod) => set({ iod }),
}));
