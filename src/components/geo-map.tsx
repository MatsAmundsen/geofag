/**
 * Supplementary Leaflet map for place context. It does not replace the SVG
 * diagrams used elsewhere in the app. The map mounts only in the browser via
 * `ClientOnly` (Leaflet touches `window`/`document` and cannot run during SSR),
 * uses OpenStreetMap tiles, and never tracks live location — center, zoom and
 * markers come from props only.
 */
import { ClientOnly } from "@tanstack/react-router";
import type { JSX } from "react";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { cn } from "@/lib/utils";

const defaultMarkerIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const mapFrameClassName = "h-80 w-full sm:h-96";

export type GeoMapMarker = {
  lat: number;
  lng: number;
  /** Shown in the marker's popup, e.g. a place name. */
  label: string;
};

function LeafletMap({
  center,
  zoom,
  markers = [],
}: {
  center: [number, number];
  zoom: number;
  markers?: GeoMapMarker[];
}) {
  return (
    <MapContainer center={center} zoom={zoom} className={mapFrameClassName}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bidragsytere'
      />
      {markers.map((m) => (
        <Marker
          key={`${m.lat},${m.lng},${m.label}`}
          position={[m.lat, m.lng]}
          icon={defaultMarkerIcon}
        >
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export function GeoMap({
  center,
  zoom,
  markers,
  caption,
  heading,
  className,
}: {
  center: [number, number];
  zoom: number;
  markers?: GeoMapMarker[];
  /** Always-visible caption text under the map (not just Leaflet's own attribution). */
  caption: string;
  /** Optional heading shown above the map, matching other figure components' style. */
  heading?: string;
  className?: string;
}): JSX.Element {
  return (
    <figure
      className={cn(
        "my-8 overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      {heading ? (
        <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
          {heading}
        </p>
      ) : null}
      <ClientOnly fallback={<div className={cn("bg-muted", mapFrameClassName)} />}>
        <LeafletMap center={center} zoom={zoom} markers={markers} />
      </ClientOnly>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
