import { createFileRoute, notFound } from "@tanstack/react-router";
import { GeografiKapittelSide } from "@/components/geografi/kapittel-side";
import { geografiKapittel } from "@/lib/geografi-kapitler";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/geografi/$kapittel")({
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
  const kap = geografiKapittel(kapittel);
  if (!kap) throw notFound();
  return <GeografiKapittelSide kapittel={kap} />;
}
