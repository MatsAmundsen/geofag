import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "En numerisk modell regner været fram fra observasjoner. ECMWF lager globale varsler fire ganger i døgnet, og et ensemble viser hvor sannsynlige ulike værforløp er.";

export const Route = createFileRoute("/tema/numeriske-modeller")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("numeriske-modeller") };
  },
  head: () =>
    topicHead({
      title: "Numeriske modeller · Geofag 2",
      description: LEAD,
      path: "/tema/numeriske-modeller",
    }),
  component: ModellerPage,
});

function ModellerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Modeller"
      title="Numeriske modeller"
      lead={LEAD}
      banner="/images/fig-klimasystem.jpg"
      bannerAlt="Jorda fra verdensrommet med atmosfære, hav og is"
      prev={{ to: "/tema/kryosfaeren", label: "Forrige: Kryosfæren" }}
      next={{ to: "/tema/paleoklima", label: "Neste: Paleoklima" }}
      kilder={KILDER.modeller}
      posterSlug="numeriske-modeller"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
