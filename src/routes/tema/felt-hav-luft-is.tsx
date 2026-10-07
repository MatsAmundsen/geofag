import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Feltarbeid i geofag 2 er å planlegge, samle inn, bearbeide, tolke og presentere data fra hav, luft eller is. Varselet er et hjelpemiddel, og egne vurderinger hører med.";

export const Route = createFileRoute("/tema/felt-hav-luft-is")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("felt-hav-luft-is") };
  },
  head: () =>
    topicHead({
      title: "Feltarbeid i hav, luft og is · Geofag 2",
      description: LEAD,
      path: "/tema/felt-hav-luft-is",
    }),
  component: FeltHavPage,
});

function FeltHavPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Metode"
      title="Feltarbeid i hav, luft og is"
      lead={LEAD}
      banner="/images/fig-hoytrykk-fjell.jpg"
      bannerAlt="Norsk fjell under klarvær"
      prev={{ to: "/tema/energi-hav-luft", label: "Forrige: Energi fra hav og luft" }}
      next={{ to: "/eksamen", label: "Neste: Eksamen" }}
      kilder={KILDER_G2.feltG2}
      posterSlug="felt-hav-luft-is"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
