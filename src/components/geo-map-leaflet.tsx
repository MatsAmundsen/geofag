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
import { useEffect, useState } from "react";
import { AttributionControl, MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
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

/** Default pin box relative to the geographic point (anchor is the bottom tip). */
const PIN = { dx: -12, dy: -41, w: 25, h: 41 };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pinBox(point: L.Point) {
  return { x: point.x + PIN.dx, y: point.y + PIN.dy, w: PIN.w, h: PIN.h };
}

function boxesHit(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
  gap: number,
) {
  return a.x - gap < b.x + b.w && a.x + a.w + gap > b.x && a.y - gap < b.y + b.h && a.y + a.h + gap > b.y;
}

/**
 * fitBounds zooms out until every pin fits, which piles neighbouring places
 * on top of each other. Step in until the 25×41 pins no longer overlap.
 */
function zoomUntilPinsSeparate(map: L.Map, markers: GeoMapMarker[]) {
  if (markers.length < 2) return;
  const latlngs = markers.map((marker) => L.latLng(marker.lat, marker.lng));
  let zoom = map.getZoom();
  const maxZoom = Math.min(map.getMaxZoom(), 8);
  const separated = (candidate: number) => {
    const boxes = latlngs.map((latlng) => pinBox(map.project(latlng, candidate)));
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        if (boxesHit(boxes[i], boxes[j], 1)) return false;
      }
    }
    return true;
  };
  while (zoom < maxZoom && !separated(zoom)) zoom += 1;
  if (zoom !== map.getZoom()) {
    map.setZoom(zoom, { animate: false });
  }
}

function MapA11y({ markerCount }: { markerCount: number }) {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    container.setAttribute("role", "region");
    container.setAttribute(
      "aria-label",
      markerCount > 0
        ? "Interaktivt kart med steder. Hold Ctrl og rull for å zoome."
        : "Interaktivt kart. Hold Ctrl og rull for å zoome.",
    );

    map.scrollWheelZoom.disable();
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const animate = !prefersReducedMotion();
      if (event.deltaY > 0) map.zoomOut(1, { animate });
      else if (event.deltaY < 0) map.zoomIn(1, { animate });
    };
    container.addEventListener("wheel", onWheel, { passive: false });

    const labelCloseButton = () => {
      container.querySelectorAll(".leaflet-popup-close-button").forEach((button) => {
        button.setAttribute("aria-label", "Lukk popup");
        button.setAttribute("title", "Lukk popup");
      });
    };
    map.on("popupopen", labelCloseButton);

    return () => {
      container.removeEventListener("wheel", onWheel);
      map.off("popupopen", labelCloseButton);
    };
  }, [map, markerCount]);
  return null;
}

function rectsHit(a: DOMRect, b: DOMRect, gap: number) {
  return a.left - gap < b.right && a.right + gap > b.left && a.top - gap < b.bottom && a.bottom + gap > b.top;
}

/**
 * A pin that is cut off by the map edge or covered by a control is not a 24×24
 * target. Keep the place name, but drop it from the tab order so it is an image.
 */
function releaseObscuredPins(map: L.Map) {
  const container = map.getContainer();
  const mapRect = container.getBoundingClientRect();
  const obstacles = [...container.querySelectorAll(".leaflet-control")].map((el) => el.getBoundingClientRect());
  container.querySelectorAll<HTMLElement>(".leaflet-marker-icon").forEach((el) => {
    const pin = el.getBoundingClientRect();
    const name = el.getAttribute("alt") || el.getAttribute("title") || "";
    el.setAttribute("alt", name);
    el.setAttribute("title", name);
    el.setAttribute("aria-label", name);
    const inside =
      pin.left >= mapRect.left - 0.5 &&
      pin.top >= mapRect.top - 0.5 &&
      pin.right <= mapRect.right + 0.5 &&
      pin.bottom <= mapRect.bottom + 0.5;
    const hitsControl = obstacles.some((obstacle) => rectsHit(pin, obstacle, 2));
    if (inside && !hitsControl && pin.width >= 24 && pin.height >= 24) {
      el.setAttribute("role", "button");
      el.tabIndex = 0;
      el.style.pointerEvents = "";
      return;
    }
    el.setAttribute("role", "img");
    el.removeAttribute("tabindex");
    el.style.pointerEvents = "none";
  });
}

function SeparatePins({ markers }: { markers: GeoMapMarker[] }) {
  const map = useMap();
  useEffect(() => {
    let zoomed = false;
    let frame = 0;
    const apply = () => {
      if (!zoomed) {
        zoomUntilPinsSeparate(map, markers);
        zoomed = true;
      }
      releaseObscuredPins(map);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    map.whenReady(schedule);
    map.on("layeradd zoomend moveend", schedule);
    return () => {
      cancelAnimationFrame(frame);
      map.off("layeradd zoomend moveend", schedule);
    };
  }, [map, markers]);
  return null;
}

export default function LeafletMap({
  center,
  zoom,
  markers = [],
  className,
  fitMarkers,
}: {
  center: [number, number];
  zoom: number;
  markers?: GeoMapMarker[];
  className: string;
  fitMarkers?: boolean;
}) {
  const [reduceMotion] = useState(() => prefersReducedMotion());
  const bounds =
    fitMarkers && markers.length > 1 ? L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number])) : undefined;
  return (
    <>
    <MapContainer
      // react-leaflet bruker center/zoom foran bounds, så de må utelates når kartet skal tilpasses markørene.
      center={bounds ? undefined : center}
      zoom={bounds ? undefined : zoom}
      bounds={bounds}
      // Ekstra luft i toppen, så markørnålen (41 px høy) ikke kuttes.
      boundsOptions={bounds ? { paddingTopLeft: [24, 52], paddingBottomRight: [24, 16], animate: false } : undefined}
      className={className}
      zoomControl={false}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomAnimation={!reduceMotion}
      fadeAnimation={!reduceMotion}
      markerZoomAnimation={!reduceMotion}
    >
      <AttributionControl prefix='<a href="https://leafletjs.com" title="JavaScript-bibliotek for interaktive kart">Leaflet</a>' />
      <ZoomControl position="topright" zoomInTitle="Zoom inn" zoomOutTitle="Zoom ut" />
      <MapA11y markerCount={markers.length} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bidragsytere'
      />
      {markers.map((m) => (
        <Marker
          key={`${m.lat},${m.lng},${m.label}`}
          position={[m.lat, m.lng]}
          icon={defaultMarkerIcon}
          alt={m.label}
          title={m.label}
        >
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
      <SeparatePins markers={markers} />
    </MapContainer>
    {markers.length > 0 ? (
      <ol aria-hidden="true" className="m-0 list-none space-y-1 border-t border-border px-4 py-3 text-sm leading-snug text-foreground">
        {markers.map((marker) => (
          <li key={`${marker.lat},${marker.lng},${marker.label}`}>{marker.label}</li>
        ))}
      </ol>
    ) : null}
    </>
  );
}
