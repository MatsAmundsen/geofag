import { createFileRoute, Navigate } from "@tanstack/react-router";

/**
 * Gammel klima-URL for undervisningsmodellen.
 * Modellen er flyttet inn i jetstrømmer-kapitlet.
 */
export const Route = createFileRoute("/tema/klima/jetstrommer-atmosfaeriske-elver")({
  component: JetAtmosfaeriskElvRedirect,
});

function JetAtmosfaeriskElvRedirect() {
  return <Navigate to="/tema/jetstrommer" />;
}
