import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/jetstrommer")!;

const LEAD =
  "Jetstrømmen er et smalt belte med sterk vestavind høyt oppe, der varm og kald luft møtes. Den slynger seg, er sterkest om vinteren, og flytter på stormbanen.";

export const Route = createFileRoute("/tema/jetstrommer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("jetstrommer") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/jetstrommer",
    }),
  component: JetstrommerPage,
});

function JetstrommerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Atmosfæren · jetstrøm og stormbane"
      title="Jetstrømmer og stormbaner"
      lead={LEAD}
      banner="/images/fig-jet.jpg"
      bannerAlt="Tynn, rask skyelv høyt over havet mot jordas krumning"
      prev={{ to: "/tema/lokale-vaersystemer", label: "Forrige: Lokale værsystemer" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
      kilder={KILDER.jetstrommer}
      posterSlug="jetstrommer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
