import { createFileRoute, notFound } from "@tanstack/react-router";
import { GeografiKapittelSide } from "@/components/geografi/kapittel-side";
import { geografiKapittel } from "@/lib/geografi-kapitler";
import { getPost } from "@/lib/posts";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/geografi/$kapittel")({
  // SSR: fagteksten skal stå i HTML-en (SEO, underkapittel-URL-ene). Ukjent kapittel → null.
  loader: async ({ params }) => {
    const kap = geografiKapittel(params.kapittel);
    return { post: kap ? await getPost({ data: kap.slug }) : null };
  },
  head: ({ params }) => {
    const kap = geografiKapittel(params.kapittel);
    if (!kap) {
      return topicHead({
        title: "Kapittel ikke funnet · Geografi",
        description: "Ukjent Geografi-kapittel.",
        path: `/geografi/${params.kapittel}`,
      });
    }
    return topicHead({
      title: `${kap.title} · Geografi`,
      description: kap.blurb,
      path: `/geografi/${kap.path}`,
    });
  },
  component: GeografiKapittelRoute,
});

function GeografiKapittelRoute() {
  const { kapittel } = Route.useParams();
  const { post } = Route.useLoaderData();
  const kap = geografiKapittel(kapittel);
  if (!kap) throw notFound();
  return <GeografiKapittelSide kapittel={kap} initialPost={post} />;
}
