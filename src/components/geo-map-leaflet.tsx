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

type Box = { x: number; y: number; w: number; h: number };

/**
 * Lowest zoom whose 25×41 pins neither overlap nor touch the controls, with
 * every pin fully inside the frame. Pans so that placement is the view.
 * Returns false when the frame is too small for that zoom.
 */
function layoutPins(map: L.Map, markers: GeoMapMarker[]) {
  const size = map.getSize();
  if (size.x < 50 || size.y < 50 || markers.length === 0) return false;
  const container = map.getContainer();
  const origin = container.getBoundingClientRect();
  const obstacles: Box[] = [...container.querySelectorAll(".leaflet-control")]
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left - origin.left, y: rect.top - origin.top, w: rect.width, h: rect.height };
    })
    .filter((box) => box.w > 0 && box.h > 0);

  const latlngs = markers.map((marker) => L.latLng(marker.lat, marker.lng));
  const maxZoom = Math.min(map.getMaxZoom(), 8);
  const minZoom = map.getMinZoom();
  const margin = 4;

  const boxesAt = (zoom: number): Box[] =>
    latlngs.map((latlng) => pinBox(map.project(latlng, zoom)));

  const separated = (boxes: Box[]) => {
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        if (boxesHit(boxes[i], boxes[j], 1)) return false;
      }
    }
    return true;
  };

  const spanOf = (boxes: Box[]) => {
    const minX = Math.min(...boxes.map((box) => box.x));
    const minY = Math.min(...boxes.map((box) => box.y));
    const maxX = Math.max(...boxes.map((box) => box.x + box.w));
    const maxY = Math.max(...boxes.map((box) => box.y + box.h));
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  };

  const place = (zoom: number) => {
    const boxes = boxesAt(zoom);
    if (!separated(boxes)) return null;
    const span = spanOf(boxes);
    const minTx = margin;
    const minTy = margin;
    const maxTx = size.x - margin - span.w;
    const maxTy = size.y - margin - span.h;
    if (maxTx < minTx || maxTy < minTy) return null;

    const fits = (tx: number, ty: number) => {
      const rects = boxes.map((box) => ({
        x: tx + (box.x - span.minX),
        y: ty + (box.y - span.minY),
        w: box.w,
        h: box.h,
      }));
      const inside = rects.every(
        (rect) => rect.x >= margin - 0.5 && rect.y >= margin - 0.5 && rect.x + rect.w <= size.x - margin + 0.5 && rect.y + rect.h <= size.y - margin + 0.5,
      );
      const clear = rects.every((rect) => obstacles.every((obstacle) => !boxesHit(rect, obstacle, 2)));
      return inside && clear;
    };

    const cx = (minTx + maxTx) / 2;
    const cy = (minTy + maxTy) / 2;
    const candidates: { tx: number; ty: number }[] = [];
    for (let iy = 0; iy <= 8; iy += 1) {
      for (let ix = 0; ix <= 8; ix += 1) {
        candidates.push({
          tx: minTx + ((maxTx - minTx) * ix) / 8,
          ty: minTy + ((maxTy - minTy) * iy) / 8,
        });
      }
    }
    candidates.sort((a, b) => (a.tx - cx) ** 2 + (a.ty - cy) ** 2 - ((b.tx - cx) ** 2 + (b.ty - cy) ** 2));
    const found = candidates.find((candidate) => fits(candidate.tx, candidate.ty));
    if (!found) return null;
    return { zoom, tx: found.tx, ty: found.ty, span };
  };

  let placement: ReturnType<typeof place> = null;
  for (let zoom = minZoom; zoom <= maxZoom; zoom += 1) {
    placement = place(zoom);
    if (placement) break;
  }
  if (!placement) return false;

  // Layer point that should sit at the container centre so the pin box lands on (tx, ty).
  const layerAtCenter = L.point(
    placement.span.minX + size.x / 2 - placement.tx,
    placement.span.minY + size.y / 2 - placement.ty,
  );
  const sameView =
    map.getZoom() === placement.zoom && map.project(map.getCenter(), placement.zoom).distanceTo(layerAtCenter) < 1;
  if (!sameView) {
    map.setView(map.unproject(layerAtCenter, placement.zoom), placement.zoom, { animate: false });
  }
  return true;
}

function nameMarkers(map: L.Map) {
  map.getContainer().querySelectorAll<HTMLElement>(".leaflet-marker-icon").forEach((el) => {
    const name = el.getAttribute("alt") || el.getAttribute("title") || "";
    if (!name) return;
    el.setAttribute("alt", name);
    el.setAttribute("title", name);
    el.setAttribute("aria-label", name);
  });
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

function FramePins({ markers, fitMarkers }: { markers: GeoMapMarker[]; fitMarkers?: boolean }) {
  const map = useMap();
  useEffect(() => {
    let frame = 0;
    let restoreTimer = 0;
    let applying = false;
    const apply = () => {
      if (applying || map.getContainer().querySelector(".leaflet-popup")) return;
      applying = true;
      try {
        if (fitMarkers && markers.length > 1) layoutPins(map, markers);
        nameMarkers(map);
      } finally {
        applying = false;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    // The popup node stays in the DOM for the 200 ms fade, so wait until it is gone
    // before fitting the pins back inside the frame.
    const restoreAfterPopup = () => {
      window.clearTimeout(restoreTimer);
      restoreTimer = window.setTimeout(schedule, 280);
    };
    map.whenReady(schedule);
    map.on("popupclose", restoreAfterPopup);
    const observer = new ResizeObserver(schedule);
    observer.observe(map.getContainer());
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(restoreTimer);
      map.off("popupclose", restoreAfterPopup);
      observer.disconnect();
    };
  }, [map, markers, fitMarkers]);
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
  return (
    <MapContainer
      center={center}
      zoom={zoom}
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
      <FramePins markers={markers} fitMarkers={fitMarkers} />
    </MapContainer>
  );
}
