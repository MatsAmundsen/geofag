import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/geofag-1/vulkaner-og-jordskjelv")({
  component: VulkanerOgJordskjelvRedirect,
});

function VulkanerOgJordskjelvRedirect() {
  return <Navigate to="/geofag-1/vulkaner" />;
}
