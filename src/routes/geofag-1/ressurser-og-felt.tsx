import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/geofag-1/ressurser-og-felt")({
  component: RessurserOgFeltRedirect,
});

function RessurserOgFeltRedirect() {
  return <Navigate to="/geofag-1/geologiske-ressurser" />;
}
