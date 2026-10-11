import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/vaerkart")!;

export const Route = createFileRoute("/tema/vaerkart")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("vaerkart") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vaerkart",
    }),
  component: VaerkartPage,
});

function VaerkartPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Værkart og værutvikling"
      banner="/images/banner-trykk.jpg"
      bannerAlt="Synoptisk værkart over Nord-Atlanteren og Skandinavia med isobarer, lavtrykkssentre og fronter"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/lokale-vaersystemer", label: "Neste: Lokale værsystemer" }}
      kilder={KILDER_G2.vaerkart}
      lead={CHAPTER_INGRESS["vaerkart"]}
      posterSlug="vaerkart"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
