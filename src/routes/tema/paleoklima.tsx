import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Direkte målinger av CO₂ startet på Mauna Loa i 1958. I istidssyklusene det siste millionåret kom CO₂ ikke over 300 ppm. Før midten av 1700-tallet lå den på 280 ppm eller lavere.";

export const Route = createFileRoute("/tema/paleoklima")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("paleoklima") };
  },
  head: () =>
    topicHead({
      title: "Paleoklima · Geofag 2",
      description: LEAD,
      path: "/tema/paleoklima",
    }),
  component: PaleoklimaPage,
});

function PaleoklimaPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Arkiv"
      title="Paleoklima"
      lead={LEAD}
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/milankovitch", label: "Neste: Istider" }}
      kilder={KILDER.paleoklima}
      posterSlug="paleoklima"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
