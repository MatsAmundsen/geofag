import { createFileRoute, Navigate } from "@tanstack/react-router";

/** Gammel URL med skrivefeil. Beholdes som alias. */
export const Route = createFileRoute("/tema/kryosfare")({
  component: KryosfareRedirect,
});

function KryosfareRedirect() {
  return <Navigate to="/tema/kryosfaeren" />;
}
