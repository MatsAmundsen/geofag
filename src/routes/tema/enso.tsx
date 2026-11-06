import { createFileRoute, redirect } from "@tanstack/react-router";
import { ensoRedirectHref, ENSO_REDIRECT_STATUS } from "@/lib/tsunami-redirect";

export const Route = createFileRoute("/tema/enso")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: ensoRedirectHref(location.searchStr),
      statusCode: ENSO_REDIRECT_STATUS,
    });
  },
});
