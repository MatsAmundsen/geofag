import { createFileRoute, notFound } from "@tanstack/react-router";
import { GeografiKapittelSide } from "@/components/geografi/kapittel-side";
import { GEOGRAFI_KAPITLER, geografiKapittel } from "@/lib/geografi-kapitler";
import { GEOGRAFI_UNDER_BESKRIVELSE } from "@/lib/geografi-generert";
import { geografiUnderkapittel } from "@/lib/geografi-seksjon";
import { topicHead } from "@/lib/seo";

/** `/geografi/<kapittel>/<underkapittel>`: én H2-blokk fra kapittelteksten (utsatt i PR #293). */
export const Route = createFileRoute("/geografi/$kapittel_/$under")({
  head: ({ params }) => {
    const kap = geografiKapittel(params.kapittel);
    const under = kap ? geografiUnderkapittel(kap, params.under) : undefined;
    if (!kap || !under) {
      return topicHead({
        title: "Underkapittel ikke funnet · Geografi",
        description: "Ukjent underkapittel i Geografi.",
        path: `/geografi/${params.kapittel}/${params.under}`,
        robots: "noindex",
      });
    }
    const nr = GEOGRAFI_KAPITLER.findIndex((k) => k.path === kap.path) + 1;
    return topicHead({
      title: `${under.title} · ${kap.title} · Geografi`,
      description:
        GEOGRAFI_UNDER_BESKRIVELSE[`${kap.path}/${under.id}`] ??
        `${under.title}: del ${nr} av Geografi Vg1, kapitlet «${kap.title}».`,
      path: `/geografi/${kap.path}/${under.id}`,
    });
  },
  component: GeografiUnderkapittelRoute,
});

function GeografiUnderkapittelRoute() {
  const { kapittel, under } = Route.useParams();
  const kap = geografiKapittel(kapittel);
  const u = kap ? geografiUnderkapittel(kap, under) : undefined;
  if (!kap || !u) throw notFound();
  return <GeografiKapittelSide kapittel={kap} underkapittel={u} />;
}
