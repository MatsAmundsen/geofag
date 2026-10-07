import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/havstrommer")!;

const LEAD =
  "Havstrømmer drives av tidevann, vind og tetthetsforskjeller. Overflaten samles i store havvirvler. I dypet synker kaldt og salt vann og inngår i et langsomt transportbånd.";

export const Route = createFileRoute("/tema/havstrommer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("havstrommer") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/havstrommer",
    }),
  component: HavstrommerPage,
});

function HavstrommerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Havet"
      title="Havstrømmer"
      lead={LEAD}
      banner="/images/banner-hav.jpg"
      bannerAlt="Havoverflate i Nord-Atlanteren med bølger og strømninger"
      prev={{ to: "/tema/coriolis", label: "Forrige: Coriolis" }}
      next={{ to: "/tema/klima", label: "Neste: Klima" }}
      kilder={KILDER.havstrommer}
      posterSlug="havstrommer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
