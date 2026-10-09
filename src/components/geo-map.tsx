/**
 * Supplementary Leaflet map for place context. It does not replace the SVG
 * diagrams used elsewhere in the app. The Leaflet implementation
 * (`geo-map-leaflet.tsx`) is loaded with `React.lazy` and only rendered
 * inside `ClientOnly`, because Leaflet runs browser feature-detection at
 * module-import time (`window`/`document`) and would crash SSR on the
 * Cloudflare Worker otherwise — a plain runtime render-gate is not enough,
 * the *import itself* has to be deferred to the client. Uses OpenStreetMap
 * tiles and never tracks live location — center, zoom and markers come from
 * props only.
 */
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

const LeafletMap = lazy(() => import("./geo-map-leaflet"));

// 26rem (416px) under sm: zoom 4 skiller de 25×41 store pinnene, og den
// pakken er 350 px høy. h-80 (320px) klippet Oslo og la Jotunheimen ligge
// oppå attribusjonen. Fra sm holder h-96 (384px), der bredden gir plass.
const mapFrameClassName = "h-[26rem] w-full sm:h-96";

export type GeoMapMarker = {
  lat: number;
  lng: number;
  /** Shown in the marker's popup, e.g. a place name. */
  label: string;
};

export function GeoMap({
  center,
  zoom,
  markers,
  caption,
  heading,
  className,
  fitMarkers,
}: {
  center: [number, number];
  zoom: number;
  markers?: GeoMapMarker[];
  /** Always-visible caption text under the map (not just Leaflet's own attribution). */
  caption: string;
  /** Optional heading shown above the map, matching other figure components' style. */
  heading?: string;
  className?: string;
  /** Zoom so every marker (including its pin) is visible, instead of using center/zoom. */
  fitMarkers?: boolean;
}): JSX.Element {
  const placeholder = <div className={cn("bg-muted", mapFrameClassName)} />;

  return (
    <figure className={cn("my-8 overflow-hidden rounded-xl border border-border bg-card", className)}>
      {heading ? (
        <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
          {heading}
        </p>
      ) : null}
      <ClientOnly fallback={placeholder}>
        <Suspense fallback={placeholder}>
          <LeafletMap center={center} zoom={zoom} markers={markers} className={mapFrameClassName} fitMarkers={fitMarkers} />
        </Suspense>
      </ClientOnly>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
