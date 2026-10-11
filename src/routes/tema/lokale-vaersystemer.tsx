import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/lokale-vaersystemer")!;

export const Route = createFileRoute("/tema/lokale-vaersystemer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("lokale-vaersystemer") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/lokale-vaersystemer",
    }),
  component: LokalePage,
});

function LokalePage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Lokale og regionale værsystemer"
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      prev={{ to: "/tema/vaerkart", label: "Forrige: Værkart" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.lokale}
      lead={CHAPTER_INGRESS["lokale-vaersystemer"]}
      posterSlug="lokale-vaersystemer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
