import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/geofag-1/vann-flom-og-skred")({
  component: VannFlomOgSkredRedirect,
});

function VannFlomOgSkredRedirect() {
  return <Navigate to="/geofag-1/vann-og-flom" />;
}
