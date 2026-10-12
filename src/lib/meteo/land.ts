import { geoEquirectangular, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countriesJson from "world-atlas/countries-110m.json";
import landJson from "world-atlas/land-110m.json";

let grid: Float32Array | null = null;

const landTopology = landJson as unknown as Topology<{ land: GeometryCollection }>;
const countryTopology = countriesJson as unknown as Topology<{ countries: GeometryCollection }>;

export const landGeometry = feature(landTopology, landTopology.objects.land) as GeoPermissibleObjects;
export const borderGeometry = mesh(
  countryTopology,
  countryTopology.objects.countries,
  (a, b) => a !== b,
) as GeoPermissibleObjects;

export function continentalityAt(lat: number, lon: number): number {
  if (!grid) return 0;
  const w = 360;
  const h = 180;
  const wrapped = (((lon + 180) % 360) + 360) % 360;
  const x = Math.max(0, Math.min(w - 1, Math.floor((wrapped / 360) * w)));
  const y = Math.max(0, Math.min(h - 1, Math.floor(((90 - lat) / 180) * h)));
  return grid[y * w + x] ?? 0;
}

/** Raster Natural Earth once. Returns false on the server. */
export function ensureLandGrid(): boolean {
  if (grid) return true;
  if (typeof document === "undefined") return false;
  const w = 360;
  const h = 180;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  const projection = geoEquirectangular().fitExtent(
    [
      [0, 0],
      [w, h],
    ],
    { type: "Sphere" },
  );
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.beginPath();
  geoPath(projection, ctx)(landGeometry);
  ctx.fillStyle = "#fff";
  ctx.fill();
  const pixels = ctx.getImageData(0, 0, w, h).data;
  const landMask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) landMask[i] = pixels[i * 4]! > 128 ? 1 : 0;
  const cont = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const lat = 90 - (y + 0.5);
    const base = Math.max(0, Math.min(1, (Math.abs(lat) - 18) / 42));
    for (let x = 0; x < w; x++) {
      if (!landMask[y * w + x]) continue;
      const west = landMask[y * w + ((x - 2 + w) % w)] === 0;
      cont[y * w + x] = west ? base * 0.35 : base;
    }
  }
  grid = cont;
  return true;
}
