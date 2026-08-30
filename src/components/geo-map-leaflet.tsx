/**
 * The actual Leaflet-backed map. Kept in its own module so it can be
 * `React.lazy`-loaded from `geo-map.tsx` — Leaflet runs browser
 * feature-detection at import time (`window`/`document`), so this file must
 * never be evaluated during SSR. Only import it via `React.lazy(() =>
 * import("./geo-map-leaflet"))`, gated behind `ClientOnly`.
 */
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { GeoMapMarker } from "./geo-map";

const defaultMarkerIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LeafletMap({
  center,
  zoom,
  markers = [],
  className,
}: {
  center: [number, number];
  zoom: number;
  markers?: GeoMapMarker[];
  className: string;
}) {
  return (
    <MapContainer center={center} zoom={zoom} className={className}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bidragsytere'
      />
      {markers.map((m) => (
        <Marker key={`${m.lat},${m.lng},${m.label}`} position={[m.lat, m.lng]} icon={defaultMarkerIcon}>
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
