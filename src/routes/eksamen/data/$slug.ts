import { createFileRoute } from "@tanstack/react-router";

/** JSON for ett eksamenssett. Ligger under /eksamen/* og er beskyttet av Cloudflare Access. */
export const Route = createFileRoute("/eksamen/data/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { examPayload } = await import("@/lib/eksamen/server-data");
        const payload = examPayload(params.slug);
        return new Response(JSON.stringify(payload ?? { error: "Ukjent sett." }), {
          status: payload ? 200 : 404,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "private, no-store",
            "x-robots-tag": "noindex, nofollow",
          },
        });
      },
    },
  },
});
