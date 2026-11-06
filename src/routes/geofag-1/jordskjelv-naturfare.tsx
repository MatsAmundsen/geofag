import { createFileRoute, redirect } from "@tanstack/react-router";
import { tsunamiRedirectHref, TSUNAMI_REDIRECT_STATUS } from "@/lib/tsunami-redirect";

export const Route = createFileRoute("/geofag-1/jordskjelv-naturfare")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: tsunamiRedirectHref(location.searchStr),
      statusCode: TSUNAMI_REDIRECT_STATUS,
    });
  },
});
