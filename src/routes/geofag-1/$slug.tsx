import { createFileRoute, notFound } from "@tanstack/react-router";

/** Catch-all for ukjente G1-slugs. Kjente tema har egne ruter og vinner over denne. */
export const Route = createFileRoute("/geofag-1/$slug")({
  component: Gf1UnknownSlug,
});

function Gf1UnknownSlug() {
  throw notFound();
}
